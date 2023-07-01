import {NextApiRequest, NextApiResponse} from 'next';
import connection from "../../../libs/db";
import axios from "axios";
import NodeCache from 'node-cache';

const cache = new NodeCache({ stdTTL: 900 }) // Cache expires after 15 minutes

interface Suggestion {
    id: number;
    discord_id: string;
    discord_name: string;
    rating: number;
    redirectUrl: string;
    avatarUrl: string;
}

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
        const selectQuery = 'SELECT id, CAST(discord_id AS CHAR) AS discord_id, discord_name, rating FROM players WHERE discord_name LIKE ? LIMIT 5';
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
                    const cacheKey = `suggestion_${discordId}`; // Use a different cache key for the entire suggestion
                    const cachedResult = cache.get<Suggestion>(cacheKey); // Retrieve the cached suggestion
                    let formattedSuggestion: Suggestion;

                    if (cachedResult) {
                        formattedSuggestion = cachedResult;
                        console.log("Cached");
                    } else {
                        const avatar = await fetchAvatar(discordId);
                        formattedSuggestion = {
                            ...suggestion,
                            redirectUrl: `${process.env.NEXT_PUBLIC_APP_URL}/profile/${suggestion.id}`,
                            avatarUrl: `https://cdn.discordapp.com/avatars/${discordId}/${avatar}.png`,
                        };

                        cache.set(cacheKey, formattedSuggestion); // Cache the entire suggestion
                        console.log("Cache set");
                    }

                    return formattedSuggestion;
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
