import zod from 'zod';

const AccountSignUpSchema = zod.object({
  name: zod.string(),
  email: zod.string().email(),
  phone: zod.string(),
  address: zod.string(),
  username: zod.string(),
  password: zod.string(),
  role: zod.enum(['admin', 'member']),
});

const AccountSignInSchema = zod.object({
  username: zod.string(),
  password: zod.string(),
});

export { AccountSignUpSchema, AccountSignInSchema };
