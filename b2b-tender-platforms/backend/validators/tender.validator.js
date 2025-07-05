// validators/tender.validator.js
const Joi = require('joi');

exports.tenderSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  budget: Joi.number().required(),
  deadline: Joi.date().iso().required(),
});
