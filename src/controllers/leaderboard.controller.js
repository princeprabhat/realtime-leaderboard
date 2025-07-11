import { leaderboardService } from "../services/index.js"
import catchAsync from "../utils/catchAsync.js"
import httpStatus from 'http-status'


const getTopPlayers = catchAsync(async (req, res) => {
    const { limit, region, gameMode } = req.query;
    const topScores = await leaderboardService.getTopScores(limit, region, gameMode);
    res.status(httpStatus.OK).json(topScores);
})

const renderLeaderBoard = catchAsync(async (req, res) => {
    const { limit, region, gameMode } = req.query;

    const topScores = await leaderboardService.getTopScores(limit, region, gameMode);

    return res.render('leaderboard', {
        players: topScores,
        filters: { limit, region, gameMode }
    });
})

export default {
    getTopPlayers,
    renderLeaderBoard
}