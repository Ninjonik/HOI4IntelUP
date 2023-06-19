import { NextApiRequest, NextApiResponse } from 'next';
import connection from '../../libs/db';

export default async function getUsers(req: NextApiRequest, res: NextApiResponse) {
    try {
        const [rows] = await connection.promise().query('SELECT * FROM users');
        res.status(200).json(rows);
    } catch (error) {
        console.log("hello");
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}