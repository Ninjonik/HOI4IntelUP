import connection from  '../../../libs/db';

export async function getUserById(id) {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM users WHERE id = ?';
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
                        Authorization: 'Bot MTA2Mzc2NjU5ODE5Nzk4MTIxNQ.GXa8q4.9TUdG0XSLXAqIaqG7DKRBjQcwuYU5DJLCmscEE',
                    },
                });

                return `https://cdn.discordapp.com/avatars/${discordId}/${response.data.avatar}.png`;
            } catch (error) {
                console.error('Error fetching avatar:', error);
                return null;
            }
        };

        user["avatar"] = await fetchAvatar(discordId);

        // Return the user data as a JSON response
        return res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching user data:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

