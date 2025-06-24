import Joi from 'joi';


const validatePlayer = {
    body: Joi.object().keys({
        playerId: Joi.string().required().min(5).regex(/^\S+$/).messages({
            'string.pattern.base': 'Player ID should not contain spaces',
            'string.min': 'Player ID should be at least 5 characters'
        }),
        name: Joi.string().required(),
        region: Joi.string().valid('Asia', 'Europe', 'NA', 'SA', 'Africa').required(),
        gameMode: Joi.string().valid('solo', 'duo', 'squad').required(),
        score: Joi.number().optional(),
    }),
};

const validateScore = {
    body: Joi.object().keys({
        score: Joi.number().required(),
    }),
    params: Joi.object().keys({
        playerId: Joi.string().required(),
    }),
};

export default {
    validateScore,
    validatePlayer,
};
