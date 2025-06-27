import Player from "../models/player.model.js";
import ApiError from "../utils/ApiError.js";
import httpStatus from 'http-status';
import { getIo } from '../socket.js';
import redis from "../config/redis.js";

const createPlayer = async (playerData) => {
    const userExist = await Player.findOne({ playerId: playerData.playerId });

    if (userExist) {
        throw new ApiError(httpStatus.BAD_REQUEST, `Player already exists for Id: ${userExist.playerId}`);
    }

    const newPlayer = await Player.create(playerData);

    await redis.flushall();

    const io = getIo();
    io.emit('scoreUpdated', {
        playerId: newPlayer.playerId,
        score: newPlayer.score
    });

    return newPlayer;

}

const updateScore = async (playerId, newScore) => {
    const updatedPlayer = await Player.findOneAndUpdate(
        { playerId },
        { score: newScore },
        { new: true }
    );

    if (updatedPlayer) {
        await redis.flushall();

        const io = getIo();
        io.emit('scoreUpdated', {
            playerId: updatedPlayer.playerId,
            score: updatedPlayer.score
        });
    }

    return updatedPlayer;
};


const getPlayerById = async (playerId) => {
    const player = Player.findOne({ playerId });
    return player;
}


export default {
    createPlayer,
    updateScore,
    getPlayerById
}