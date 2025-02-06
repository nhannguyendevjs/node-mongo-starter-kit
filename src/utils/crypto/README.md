# NodeJS Encrypting and Hashing

🚨 Why NOT Use crypto.createCipher() for Passwords?

- **crypto.createCipher()** is for encryption, NOT hashing.
  - Encryption is reversible (you can decrypt it back).
  - Hashing is one-way (you can't reverse a hash, only verify it).
- If someone steals the encryption key, they can decrypt all stored passwords!
- **bcrypt** (or **Argon2**) is designed for password security, with built-in salting and iteration count to slow down brute-force attacks.

## Use bcrypt for Password Storage (Recommended)

```javascript
const bcrypt = require('bcrypt');

const saltRounds = 10; // Recommended cost factor

async function hashPassword(password) {
  return await bcrypt.hash(password, saltRounds);
}

async function verifyPassword(inputPassword, storedHash) {
  return await bcrypt.compare(inputPassword, storedHash);
}
```

## When Should You Use crypto.createCipher()?

### If you need to encrypt/decrypt sensitive data, like

- Encrypting credit card numbers before storing in a database.
- Encrypting API keys or JWT tokens.

### Example of AES-256 Encryption

```javascript
const crypto = require('crypto');

const algorithm = 'aes-256-cbc';
const key = crypto.randomBytes(32); // Secret key
const iv = crypto.randomBytes(16); // Initialization vector

function encrypt(text) {
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return { encrypted, iv: iv.toString('hex') };
}

function decrypt(encryptedText, ivHex) {
  const decipher = crypto.createDecipheriv(algorithm, key, Buffer.from(ivHex, 'hex'));
  let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}
```

👉 Use this for encrypting sensitive data, NOT passwords.
