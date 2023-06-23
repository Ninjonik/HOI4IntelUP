import connection from  '../../../libs/db';
import axios from "axios";
/* global BigInt */

export async function getUserById(id) {
    return new Promise((resolve, reject) => {
        const query = 'SELECT *, CAST(discord_id AS CHAR) AS discord_id FROM players WHERE id = ?';
        connection.query(query, [id], (error, results) => {
            if (error) {
                reject(error);
                console.log(error);
            } else {
                resolve(results[0]);
            }
        });
    });
}

export async function getUserStats(id) {
    return new Promise((resolve, reject) => {
        const query = 'SELECT COUNT(id) AS count FROM player_records WHERE player_id = ?';
        connection.query(query, [id], (error, results) => {
            if (error) {
                reject(error);
                console.log(error);
            } else {
                if (Array.isArray(results) && results.length > 0) {
                    resolve(results[0]);
                } else {
                    resolve([]); // Return empty array when no results are found
                }
            }
        });
    });
}

export async function getUserGames(id) {
    return new Promise((resolve, reject) => {
        const query = 'SELECT r.*, s.guild_name, p.discord_name FROM player_records as r INNER JOIN settings as s on r.guild_id=s.guild_id INNER JOIN players as p on r.host_id=p.discord_id WHERE player_id = ? ORDER BY id DESC';
        connection.query(query, [id], (error, results) => {
            if (error) {
                reject(error);
                console.log(error);
            } else {
                if (Array.isArray(results) && results.length > 0) {
                    resolve(results);
                } else {
                    resolve([]); // Return empty array when no results are found
                }
            }
        });
    });
}


export default async function handler(req, res) {
    const { id } = req.query;

    try {
        // Perform the necessary database query or data retrieval to fetch the user by ID
        const user = await getUserById(id);

        const discordId = user["discord_id"];

        const fetchAvatar = async (discordId) => {
            try {
                const response = await axios.get(`https://discord.com/api/users/${discordId}`, {
                    headers: {
                        Authorization: `Bot ${process.env.BOT_TOKEN}`,
                    },
                });

                return response.data;
            } catch (error) {
                console.error('Error fetching avatar:');
                return null;
            }
        };

        console.log(discordId, "nice");
        const data = await fetchAvatar(discordId);
        const stats = await getUserStats(discordId);
        const games = await getUserGames(discordId);
        user["avatar"] = `https://cdn.discordapp.com/avatars/${discordId}/${data.avatar}.png`;
        user["discord_name"] = data["username"];
        user["stats"] = stats ? stats["count"] : 0;
        user["games"] = games ? games : [];
        console.log(user);

        // Return the user data as a JSON response
        return res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching user data:');
        console.log(id);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

