import {useEffect, useState} from 'react';
import axios from 'axios';
import {useRouter} from 'next/router';
import {NextPage} from 'next';
import {redirect} from "next/navigation";

interface ProfilePageProps {
    bodyClass: string;
}

const ProfilePage: NextPage<ProfilePageProps> & { bodyClass?: string } = () => {
    const router = useRouter();
    const { id } = router.query;
    const [user, setUser] = useState(null);

    const fetchUserData = async () => {
        try {
            const response = await axios.get(`/api/player/${id}`);
            setUser(response.data);
            console.log("Data fetched successfully");
        } catch (error) {
            console.error('Error fetching user data:', error);
            router.push('/404');
        }
    };


    useEffect(() => {
        if (id) {
            fetchUserData();
        }
    }, [id]);

    return (
        <div className="wrapper">
            <section className="section-profile-cover section-shaped my-0">
                {/* Circles background */}
                <img className="bg-image" src="/img/pages/mohamed.jpg" style={{ width: '100%' }} />
                {/* SVG separator */}
                <div className="separator separator-bottom separator-skew">
                    <svg x="0" y="0" viewBox="0 0 2560 100" preserveAspectRatio="none" version="1.1" xmlns="http://www.w3.org/2000/svg">
                        <polygon className="fill-secondary" points="2560 0 2560 100 0 100"></polygon>
                    </svg>
                </div>
            </section>
            {user && (
            <section className="section bg-secondary">
                <div className="container">
                    <div className="card card-profile shadow mt--300">
                        <div className="px-4">
                            <div className="row justify-content-center">
                                <div className="col-lg-3 order-lg-2">
                                    <div className="card-profile-image">
                                        <a href="javascript:;">
                                            <img src={user.avatar} className="rounded-circle" />
                                        </a>
                                    </div>
                                </div>
                                <div className="col-lg-4 order-lg-3 text-lg-right align-self-lg-center">
                                    <div className="card-profile-actions py-4 mt-lg-0">

                                    </div>
                                </div>
                                <div className="col-lg-4 order-lg-1">
                                    <div className="card-profile-stats d-flex justify-content-center">
                                        <div>
                                            <span className="heading">{user.stats}</span>
                                            <span className="description">Games</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="text-center mt-5">
                                <h3>{user.discord_name}<span className="font-weight-light"> {user.rating*100}%</span></h3>
                                <div className="h6 font-weight-300"><i className="ni location_pin mr-2"></i>{user.discord_id}</div>
                            </div>
                            <div className="mt-5 py-5 border-top text-center">
                                <div className="row justify-content-center">
                                    <table className="table">
                                        <thead>
                                        <tr>
                                            <th className="text-center">#</th>
                                            <th>Rating</th>
                                            <th>Country</th>
                                            <th>Host</th>
                                            <th>Server</th>
                                            <th>Date</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {user.games && user.games.map((game, index) => (
                                            <tr key={index}>
                                                <td>{game["id"]}</td>
                                                <td>{game["rating"]}</td>
                                                <td>{game["country"]}</td>
                                                <td>{game["discord_name"]}</td>
                                                <td>{game["guild_name"]}</td>
                                                <td>{game["updated_at"]}</td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            )}
        </div>
    );
};

ProfilePage.bodyClass = 'profile-page';

export default ProfilePage;
