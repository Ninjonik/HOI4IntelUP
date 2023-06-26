import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import connection from "../../../libs/db";
import {type} from "os";

export async function getUserByName(name) {
    return new Promise((resolve, reject) => {
        const query = 'SELECT id FROM players WHERE discord_name = ?';
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

            if (player && player['id']) {
                // If a matching player is found, construct the redirect URL
                const redirectUrl = `${process.env.NEXT_PUBLIC_APP_URL}/profile/${player['id']}`;

                // Return a JSON response with the redirect URL
                res.status(200).json({ redirectUrl });
            } else {
                // If no matching player is found, return a JSON response with the error URL
                res.status(404).json({ redirectUrl: '/profile/error' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}

