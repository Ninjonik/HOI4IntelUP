import { NextApiRequest, NextApiResponse } from 'next';
import connection from "../../../libs/db";
import axios from "axios";

const fetchAvatar = async (discordId) => {
    try {
        const response = await axios.get(`https://discord.com/api/users/${discordId}`, {
            headers: {
                Authorization: `Bot ${process.env.BOT_TOKEN}`,
            },
        });

        return response.data;
    } catch (error) {
        console.error('Error fetching avatar: ', error);
        return null;
    }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { query } = req.query;

    try {
        // Query the database to retrieve suggestions based on the query
        const selectQuery = 'SELECT id, discord_id, discord_name, rating FROM players WHERE discord_name LIKE ?';
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
                    // const avatarUrl = await fetchAvatar(suggestion.discord_id);
                    const avatarUrl = "";
                    return {
                        ...suggestion,
                        redirectUrl: `${process.env.NEXT_PUBLIC_APP_URL}/profile/${suggestion.id}`,
                        avatarUrl,
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
