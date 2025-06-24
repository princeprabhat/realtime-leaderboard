import express from 'express';
import validate from "../middlewares/validate.js";
import { leaderboardValidation } from "../validations/index.js";
import leaderboardController from "../controllers/leaderboard.controller.js";

const router = express.Router();

router.get('/top', validate(leaderboardValidation.validateTopPlayers),
    leaderboardController.getTopPlayers)

router.get('/view/data', leaderboardController.getTopPlayers)
router.get('/view', leaderboardController.renderLeaderBoard)

export default router;