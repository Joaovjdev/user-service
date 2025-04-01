import Joi from 'joi';

export const registerSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'O email deve ser válido',
    'string.empty': 'O email não pode estar vazio',
    'any.required': 'O email é obrigatório',
  }),
  password: Joi.string()
    .min(6)
    .required()
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .messages({
      'string.min': 'A senha deve ter no mínimo 6 caracteres',
      'string.pattern.base': 'A senha deve conter pelo menos uma letra maiúscula, uma minúscula e um número',
      'string.empty': 'A senha não pode estar vazia',
      'any.required': 'A senha é obrigatória',
    }),
  name: Joi.string().min(3).required().messages({
    'string.min': 'O nome deve ter no mínimo 3 caracteres',
    'string.empty': 'O nome não pode estar vazio',
    'any.required': 'O nome é obrigatório',
  }),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'O email deve ser válido',
    'string.empty': 'O email não pode estar vazio',
    'any.required': 'O email é obrigatório',
  }),
  password: Joi.string().required().messages({
    'string.empty': 'A senha não pode estar vazia',
    'any.required': 'A senha é obrigatória',
  }),
});

export const refreshTokenSchema = Joi.object({
  refreshToken: Joi.string().required().messages({
    'string.empty': 'O refresh token não pode estar vazio',
    'any.required': 'O refresh token é obrigatório',
  }),
}); 