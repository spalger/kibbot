import Joi from 'joi'

export const clientIdentitySchema = Joi.object().keys({
  network: Joi.string().required(),
  nick: Joi.string().required(),
  realName: Joi.string().required(),
  channels: Joi.array().items(Joi.string()).single().required(),
  password: Joi.string().required(),
  email: Joi.string().required(),
}).required()
