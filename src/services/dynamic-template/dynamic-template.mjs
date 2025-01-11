import Handlebars from 'handlebars';
import { datetimeFormat } from './helpers/datetime-format.mjs';
import { numberFormat } from './helpers/number-format.mjs';

Handlebars.registerHelper('datetimeFormat', datetimeFormat);
Handlebars.registerHelper('numberFormat', numberFormat);

const compile = (template, context) => Handlebars.compile(template)(context);

export { compile };
