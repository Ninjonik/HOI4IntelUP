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

        console.log(user);

        // Return the user data as a JSON response
        return res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching user data:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

