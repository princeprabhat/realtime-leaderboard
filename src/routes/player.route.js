import express from 'express';
import validate from "../middlewares/validate.js";
import { playerValidation } from '../validations/index.js';
import playerController from "../controllers/player.controller.js";
import blockWrites from "../middlewares/blockWrites.js";

const router = express.Router();

const validatePlayer = validate(playerValidation.validatePlayer);


router.post('/create', blockWrites, validatePlayer, playerController.createPlayer);

const validateScore = validate(playerValidation.validateScore);

router.patch('/updateScore/:playerId', blockWrites, validateScore, playerController.updateScore);


export default router;