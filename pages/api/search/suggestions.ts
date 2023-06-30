import { NextApiRequest, NextApiResponse } from 'next';
import connection from "../../../libs/db";
import axios from "axios";
import NodeCache from 'node-cache';

const cache = new NodeCache({ stdTTL: 3600 }); // Cache expires after 1 hour (3600 seconds)

const fetchAvatar = async (discordId) => {
    // TODO: Make cache work
    const cacheKey = `avatar_${discordId}`;
    const cachedResult = cache.get<string>(cacheKey);
    if (cachedResult) {
        console.log("Cached result ", cachedResult);
        return cachedResult;
    }
    try {
        const response = await axios.get(`https://discord.com/api/users/${discordId}`, {
            headers: {
                Authorization: `Bot ${process.env.BOT_TOKEN}`,
            },
        });

        const avatarUrl = response.data.avatarUrl;

        // Cache the avatar URL
        cache.set(cacheKey, avatarUrl);

        console.log(response.data);

        return response.data;
    } catch (error) {
        console.error('Error fetching avatar, DiscordId: ', discordId);
        // console.log(error);
        return null;
    }
};


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { query } = req.query;

    try {
        // Query the database to retrieve suggestions based on the query
        const selectQuery = 'SELECT id, CAST(discord_id AS CHAR) AS discord_id, discord_name, rating FROM players WHERE discord_name LIKE ? LIMIT 5';
        let suggestions : any = [];
        suggestions = await new Promise((resolve, reject) => {
            connection.query(selectQuery, [`%${query}%`], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });

        if (suggestions.length !== 0) {
            // Add redirectUrl and avatarUrl to each suggestion based on the current player
            const formattedSuggestions = await Promise.all(
                suggestions.map(async (suggestion) => {
                    const discordId = String(suggestion.discord_id);
                    const avatarUrl = await fetchAvatar(discordId);
                    return {
                        ...suggestion,
                        redirectUrl: `${process.env.NEXT_PUBLIC_APP_URL}/profile/${suggestion.id}`,
                        avatarUrl: `https://cdn.discordapp.com/avatars/${discordId}/${avatarUrl.avatar}.png`,
                    };
                })
            );

            res.status(200).json(formattedSuggestions);
        } else {
            res.status(200).json([]); // Return an empty array if no suggestions found
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
