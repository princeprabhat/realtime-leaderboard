import Player from "../models/player.model.js";

const getTopScores = async (limit, region, gameMode) => {
    let query = {};

    if (region) {
        query.region = region;
    }

    if (gameMode) {
        query.gameMode = gameMode;
    }

    const players = await Player.find(query)
        .sort({ score: -1 })
        .limit(Number(limit) || 10);

    return players;
}

export default { getTopScores }