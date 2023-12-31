import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import connection from "../../../libs/db";
import NodeCache from 'node-cache';

const cache = new NodeCache({ stdTTL: 900 }); // Cache expires after 15 minutes

export async function getUserByName(name) {
    return new Promise((resolve, reject) => {
        const query = 'SELECT discord_id FROM players WHERE discord_name = ?';
        connection.query(query, [name], (error, results) => {
            if (error) {
                reject(error);
                console.log(error);
            } else {
                resolve(results[0]);
            }
        });
    });
}

export default async function searchUser(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            const { username } = req.body;

            // Perform the search in the players table using the `discord_name` field
            // Replace this code with your actual database query
            const player = await getUserByName(username);
            console.log(player);

            if (player && player['discord_id']) {
                // Check if the result is already cached
                const cacheKey = `searchUser_${username}`;
                const cachedResult = cache.get(cacheKey);
                if (cachedResult) {
                    // Return the cached result
                    return res.status(200).json(cachedResult);
                }

                // If a matching player is found, construct the redirect URL
                const redirectUrl = `${process.env.NEXT_PUBLIC_APP_URL}/profile/${player['discord_id']}`;

                // Cache the result
                const result = { redirectUrl };
                cache.set(cacheKey, result);

                // Return a JSON response with the redirect URL
                return res.status(200).json(result);
            } else {
                // If no matching player is found, return a JSON response with the error URL
                return res.status(404).json({ redirectUrl: '/profile/error' });
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    } else {
        return res.status(405).json({ error: 'Method not allowed' });
    }
}
