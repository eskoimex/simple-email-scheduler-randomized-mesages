const Joi = require('joi');

const RegistrationSchema = Joi.object({
   fullname: Joi.string().min(2).max(40).required(),
   email: Joi.string().email().required(),
});


const validateRegistrationData = async (data) => {
  let { error, value } = await RegistrationSchema.validateAsync(data);
   return { err: error, value };
};


module.exports = { validateRegistrationData }