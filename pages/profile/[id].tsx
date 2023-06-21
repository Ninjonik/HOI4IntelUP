import {useEffect, useState} from 'react';
import axios from 'axios';
import {useRouter} from 'next/router';
import {NextPage} from 'next';

interface ProfilePageProps {
    bodyClass: string;
}

const ProfilePage: NextPage<ProfilePageProps> & { bodyClass?: string } = () => {
    const router = useRouter();
    const { id } = router.query;
    const [user, setUser] = useState(null);



    useEffect(() => {
        // Fetch user data from the API based on the ID

        const fetchUserData = async () => {
            try {
                const response = await axios.get(`/api/user/${id}`);
                setUser(response.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

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
                                        <a href="#" className="btn btn-sm btn-info mr-4">Connect</a>
                                        <a href="#" className="btn btn-sm btn-default float-right">Message</a>
                                    </div>
                                </div>
                                <div className="col-lg-4 order-lg-1">
                                    <div className="card-profile-stats d-flex justify-content-center">
                                        <div>
                                            <span className="heading">22</span>
                                            <span className="description">Friends</span>
                                        </div>
                                        <div>
                                            <span className="heading">10</span>
                                            <span className="description">Photos</span>
                                        </div>
                                        <div>
                                            <span className="heading">89</span>
                                            <span className="description">Comments</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="text-center mt-5">
                                <h3>{user.name}<span className="font-weight-light">, 27</span></h3>
                                <div className="h6 font-weight-300"><i className="ni location_pin mr-2"></i>{user.discord_id}</div>
                                <div className="h6 mt-4"><i className="ni business_briefcase-24 mr-2"></i>Solution Manager - Creative Tim Officer</div>
                                <div><i className="ni education_hat mr-2"></i>University of Computer Science</div>
                            </div>
                            <div className="mt-5 py-5 border-top text-center">
                                <div className="row justify-content-center">
                                    <div className="col-lg-9">
                                        <p>An artist of considerable range, Ryan — the name taken by Melbourne-raised, Brooklyn-based Nick Murphy — writes, performs and records all of his own music, giving it a warm, intimate feel with a solid groove structure. An artist of considerable range.</p>
                                        <a href="javascript:;">Show more</a>
                                    </div>
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
