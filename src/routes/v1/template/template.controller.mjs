import express from 'express';
import { ZodError } from 'zod';
import { resJSON } from '../../../utils/request/request.mjs';
import { compileTemplate } from './template.model.mjs';

const router = express.Router();

/**
 * @openapi
 * /template:
 *  get:
 *    description: Template API to check if server is online.
 *    tags:
 *      - Template
 *    responses:
 *      200:
 *        description: Server is online and returns a server status object.
 *      400:
 *        description: Bad request.
 *      404:
 *        description: Not found.
 *      500:
 *        description: Internal Server Error.
 */
router.get('/compile', async (req, res) => {
  const result = await compileTemplate(req);

  if (result.error instanceof Error || result.error instanceof ZodError) {
    resJSON(req, res, 400, result.error);
  } else {
    resJSON(req, res, 200, result);
  }
});

export { router as TemplateRouter };

