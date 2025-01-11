import { CompileSchema } from '../../../schemas/template.schema.mjs';
import { compile } from '../../../services/dynamic-template/dynamic-template.mjs';

const compileTemplate = async (req) => {
  try {
    const { data } = req.body;
    const { success, error } = CompileSchema.safeParse(data);

    if (success) {
      const templateComplied = compile(data.template, data.context);

      return templateComplied;
    } else {
      throw error;
    }
  } catch (error) {
    return {
      success: false,
      error,
    };
  }
};

export { compileTemplate };
