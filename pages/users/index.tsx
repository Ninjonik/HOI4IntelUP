import { GetStaticProps } from 'next'
import Link from 'next/link'

import { User } from '../../interfaces'
import Layout from '../../components/Layout'
import List from '../../components/List'
import process from "process";

type Props = {
    items: User[]
}

const WithStaticProps = ({ items }: Props) => (
    <Layout title="Users List | Next.js + TypeScript Example">
        <h1>Users List</h1>
        <p>
            Example fetching data from inside <code>getStaticProps()</code>.
        </p>
        <p>You are currently on: /users</p>
        <List items={items} />
        <p>
            <Link href="/">Go home</Link>
        </p>
    </Layout>
)

export const getStaticProps: GetStaticProps = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/users`)
    const data: User[] = await res.json()

    return {
        props: {
            items: data
        }
    }
}

export default WithStaticProps
