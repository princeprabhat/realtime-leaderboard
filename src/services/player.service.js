import Player from "../models/player.model.js";
import ApiError from "../utils/ApiError.js";
import httpStatus from 'http-status'

const createPlayer = async (playerData) => {
    const userExist = await Player.findOne({ playerId: playerData.playerId });

    if (userExist) {
        throw new ApiError(httpStatus.BAD_REQUEST, `Player already exists for Id: ${userExist.playerId}`);
    }

    const newPlayer = await Player.create(playerData);
    return newPlayer;

}

const updateScore = async (playerId, newScore) => {
    await Player.findOneAndUpdate({ playerId }, { score: newScore },
        { new: true }
    )

}

const getPlayerById = async (playerId) => {
    const player = Player.findOne({ playerId });
    return player;
}


export default {
    createPlayer,
    updateScore,
    getPlayerById
}