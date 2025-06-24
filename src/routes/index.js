import express from 'express';
import playerRoute from './player.route.js';
import leaderBoardRoute from './leaderBoard.route.js';

const router = express.Router();

router.use('/players', playerRoute);

router.use('/leaderboard', leaderBoardRoute);




export default router;