import crypto from 'node:crypto';

/**
 * @memberof Encrypting
 */
const algorithm = 'aes-256-ctr';
/**
 * @memberof Encrypting
 */
const secretKey = '3cab543a844956f13dda3b4a8df2492a';
/**
 * @memberof Encrypting
 */
const iv = crypto.randomBytes(16);

/**
 * @memberof Encrypting
 */
const encrypt = (text) => {
  const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
  const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);

  return {
    success: true,
    data: {
      iv: iv.toString('hex'),
      content: encrypted.toString('hex'),
    },
  };
};

/**
 * @memberof Encrypting
 */
const decrypt = (hash) => {
  const decipher = crypto.createDecipheriv(algorithm, secretKey, Buffer.from(hash.iv, 'hex'));
  const decrypted = Buffer.concat([decipher.update(Buffer.from(hash.content, 'h')), decipher.final()]);
  return {
    success: true,
    data: decrypted.toString(),
  };
};

/**
 * @memberof Hashing
 * @example
 * const password = 'my_secure_password';
 * const hashedData = hashPassword(password);
 * console.log('Hashed Password:', hashedData);
 */
const hashPassword = (password) => {
  const salt = crypto.randomBytes(16).toString('hex'); // Generate a random salt
  const hash = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex');

  return { salt, hash };
};

/**
 * @memberof Hashing
 * @example
 * const isValid = verifyPassword(password, hashedData.salt, hashedData.hash);
 * console.log('Password valid:', isValid);
 */
const verifyPassword = (password, salt, originalHash) => {
  const hash = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex');
  return hash === originalHash;
};

export { encrypt, decrypt, hashPassword, verifyPassword };
