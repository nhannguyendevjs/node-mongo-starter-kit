import zod from 'zod';

const CompileSchema = zod.object({
  template: zod.string(),
  context: zod.object({}),
});

export { CompileSchema };
