const Joi = require("joi");

exports.userSchemaValidate = (_reqBody) => {
  let userValidate = Joi.object({
    first_name: Joi.string().min(2).max(50).required(),
    last_name: Joi.string().min(2).max(50).required(),
    username: Joi.string().min(3).max(30).alphanum().required(),
    id_card: Joi.string().min(9).max(9).id().required(),
    phone: Joi.string().min(3).max(15).required(),
    birth_date: Joi.date().greater('1-1-1900').required(),
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }).required(),
    password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
    repeat_password: Joi.ref("password").required(),
    card_number: Joi.string().creditCard().required(),
    card_validity: Joi.string().min(5).max(5).required(),
    cvc: Joi.number().min(0).max(999).required(),
    country: Joi.string().min(2).max(50).required(),
    city: Joi.string().min(2).max(50).required(),
    street: Joi.string().min(2).max(100).required(),
    num_house: Joi.string().min(1).max(10).required(),
  })
    .with("username", "birth_year")
    .xor("password", "access_token")
    .with("password", "repeat_password");

  return userValidate.validate(_reqBody);
};

exports.userLoginValidate = (_reqBody) => {
    let userValidate = Joi.object({
      username: Joi.string().min(3).max(30).alphanum().required(),
      password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
    })

    return userValidate.validate(_reqBody);
  };
  