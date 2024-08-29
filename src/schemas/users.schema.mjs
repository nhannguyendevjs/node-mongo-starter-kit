import zod from 'zod';

const UserSchema = zod.object({
  _id: zod.string(),
  name: zod.string(),
  email: zod.string().email(),
  phone: zod.string(),
  address: zod.string(),
  role: zod.string(),
  avatar: zod.string(),
});

const UserUpdatedSchema = zod.object({
  name: zod.string().optional(),
  email: zod.string().email().optional(),
  phone: zod.string().optional(),
  address: zod.string().optional(),
  role: zod.string().optional(),
  avatar: zod.string().optional(),
});

export { UserSchema, UserUpdatedSchema };
