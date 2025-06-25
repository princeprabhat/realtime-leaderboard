import dotenv from 'dotenv';
import path from 'path';
import Joi from 'joi';
import { fileURLToPath } from 'url'
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../../.env') });

const envSchema = Joi.object({
    NODE_ENV: Joi.string().valid('development', 'production').default('development'),
    PORT: Joi.number().default(3000),
    MONGO_URI: Joi.string().required().description('MongoDB connection string'),
})
    .unknown()
    .required();

const { value: envVars, error } = envSchema.validate(process.env);

if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

const config = {
    env: envVars.NODE_ENV,
    port: envVars.PORT,
    mongo: {
        uri: envVars.MONGO_URI,
    },
    redis: {
        url: envVars.UPSTASH_REDIS_REST_URL
    }
};

export default config;