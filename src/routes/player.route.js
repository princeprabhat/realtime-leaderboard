import express from 'express';
import validate from "../middlewares/validate.js";
import { playerValidation } from '../validations/index.js';
import playerController from "../controllers/player.controller.js";


const router = express.Router();

const validatePlayer = validate(playerValidation.validatePlayer);


router.post('/create', validatePlayer, playerController.createPlayer);

const validateScore = validate(playerValidation.validateScore);

router.patch('/updateScore/:playerId', validateScore, playerController.updateScore);


export default router;