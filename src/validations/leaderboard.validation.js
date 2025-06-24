import Joi from 'joi';

const validateTopPlayers = {
    query: Joi.object().keys({
        limit: Joi.number().integer().min(1).default(10),
        region: Joi.string().trim(),
        gameMode: Joi.string().valid('solo', 'duo', 'squad'),
    }),
};

export default {
    validateTopPlayers,
};