import connection from  '../../../libs/db';

export async function getUserById(id) {
    return new Promise((resolve, reject) => {
        const query = 'SELECT *, CAST(discord_id AS CHAR) AS discord_id FROM users WHERE id = ?';
        connection.query(query, [id], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results[0]); // Assuming the query returns a single user
            }
        });
    });
}

export default async function handler(req, res) {
    const { id } = req.query;

    try {
        // Perform the necessary database query or data retrieval to fetch the user by ID
        const user = await getUserById(id);

        let discordId = user["discord_id"];

        const fetchAvatar = async (discordId) => {
            try {
                const response = await axios.get(`https://discord.com/api/users/${discordId}`, {
                    headers: {
                        Authorization: `Bot ${process.env.BOT_TOKEN}`,
                    },
                });

                return response.data;
            } catch (error) {
                console.error('Error fetching avatar:', error);
                return null;
            }
        };

        const data = await fetchAvatar(discordId);
        user["avatar"] = `https://cdn.discordapp.com/avatars/${discordId}/${data.avatar}.png`
        user["discord_name"] = data.username

        // Return the user data as a JSON response
        return res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching user data:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

