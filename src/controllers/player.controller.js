import { playerService } from "../services/index.js"
import httpStatus from 'http-status'
import ApiError from "../utils/ApiError.js"
import catchAsync from "../utils/catchAsync.js"

import { getIo } from "../socket.js"


const createPlayer = catchAsync(async (req, res) => {
    const newPlayer = await playerService.createPlayer(req.body);
    const io = getIo();
    io.emit('scoreUpdated', { playerId: req.body.playerId, score: req.body.score });
    res.status(httpStatus.CREATED).json({ player: newPlayer })
})

const updateScore = catchAsync(async (req, res) => {
    const player = await playerService.getPlayerById(req.params.playerId);
    if (!player) {
        throw new ApiError(httpStatus.NOT_FOUND, "Player does not exist, please check the playerId")
    }

    const updatedPlayer = await playerService.updateScore(req.params.playerId, req.body.score);

    const io = getIo();
    io.emit('scoreUpdated', { playerId: req.params.playerId, score: req.body.score });

    res.status(httpStatus.OK).json({ message: "Score updated successfully", playerId: updatedPlayer?.playerId, score: updatedPlayer?.score })
})

export default {
    createPlayer,
    updateScore
}