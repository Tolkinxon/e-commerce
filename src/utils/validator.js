const Joi = require('joi');

const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const username = Joi.string().max(100).min(3).required().messages({
    'string.base': 'User must be a string.',
    'string.empty': 'Username can not be a empty.',
    'string.min': 'Username must be at least 3 characters long.',
    'string.max': 'Username must be no longer than 100 characters.',
    'any.required': 'Username is rquired' 
});

const email = Joi.string().email().pattern(emailPattern).required().messages({
    'string.base': 'Email must be a string.',
    'string.empty': 'Email can not be a empty.',
    'string.email': 'Please enter a valid email address.',
    'string.pattern.base': 'Email does not match the required pattern.',
    'any.required': 'Email is rquired' 
});

const password = Joi.string().max(50).min(3).required().messages({
    'string.base': 'Password must be a string.',
    'string.empty': 'Password can not be a empty.',
    'string.min': 'Password must be at least 3 characters long.',
    'string.max': 'Password must be no longer than 50 characters.',
    'any.required': 'Password is rquired' 
});


const userValidator = Joi.object({ username, email, password });
const loginValidator = Joi.object({ email, password });
module.exports = { userValidator, loginValidator };



