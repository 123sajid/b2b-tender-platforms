const Joi = require('joi');

const companySchema = Joi.object({
  name: Joi.string().min(2).required(),
  industry: Joi.string().required(),
  description: Joi.string().allow('', null),
  logoUrl: Joi.string().uri().optional(),
  services: Joi.string().allow('', null),
});

module.exports = {
  companySchema
};
