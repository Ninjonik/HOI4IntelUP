import {NextApiRequest, NextApiResponse} from 'next';
import connection from "../../../libs/db";
import axios from "axios";
import NodeCache from 'node-cache';

const cache = new NodeCache({ stdTTL: 900 }) // Cache expires after 1 hour (3600 seconds)

const fetchAvatar = async (discordId) => {
    try {
        const response = await axios.get(`https://discord.com/api/users/${discordId}`, {
            headers: {
                Authorization: `Bot ${process.env.BOT_TOKEN}`,
            },
        });
        return response.data.avatar;
    } catch (error) {
        console.error('Error fetching avatar, DiscordId: ', discordId);
        return null;
    }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { query } = req.query;

    try {
        // Query the database to retrieve suggestions based on the query
        const selectQuery = 'SELECT id, CAST(discord_id AS CHAR) AS discord_id, discord_name, rating FROM players WHERE discord_name LIKE ? LIMIT 10';
        let suggestions: any = [];
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
                    const cacheKey = `avatar_${discordId}`;
                    const cachedResult = cache.get<string>(cacheKey);
                    let avatar: string;
                    if (cachedResult) {
                        avatar = cachedResult;
                        console.log("cached");
                    } else {
                        avatar = await fetchAvatar(discordId);
                        cache.set(cacheKey, avatar);
                        console.log("cache set");
                    }
                    return {
                        ...suggestion,
                        redirectUrl: `${process.env.NEXT_PUBLIC_APP_URL}/profile/${suggestion.id}`,
                        avatarUrl: `https://cdn.discordapp.com/avatars/${discordId}/${avatar}.png`,
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
