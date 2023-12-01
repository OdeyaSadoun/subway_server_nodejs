const Joi = require("joi");

exports.travelSchemaValidate = (_reqBody) => {
  let travelValidate = Joi.object({
    train_name: Joi.string().max(3).required(),
    payment_type: Joi.string().max(50).required(),
  });

  return travelValidate.validate(_reqBody);
};
