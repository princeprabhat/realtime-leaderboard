import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { errorHandler } from "./middlewares/error.js";
import ApiError from "./utils/ApiError.js";
import httpStatus from 'http-status';
import routes from './routes/index.js'


import path from 'path';
import { fileURLToPath } from 'url';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));
app.use(express.static(path.join(__dirname, '../public')));

app.use(helmet());
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.options('*', cors());

app.use('/v1', routes)

app.use((req, res, next) => {
    if (req.originalUrl.startsWith('/.well-known')) {
        return res.sendStatus(204);
    }
    next(new ApiError(httpStatus.NOT_FOUND, "Not a valid request"))
})

app.use(errorHandler);
export default app;