import Player from "../models/player.model.js";

import redis from "../config/redis.js";

const getTopScores = async (limit, region, gameMode) => {
    const cacheKey = `leaderboard:${region || 'all'}:${gameMode || 'all'}:${limit || 10}`;

    const cached = await redis.get(cacheKey);
    if (cached) return JSON.parse(cached);


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

    await redis.set(cacheKey, JSON.stringify(players), 'EX', 86400);

    return players;
}

export default { getTopScores }