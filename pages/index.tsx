import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { NextPage } from 'next';

interface IndexPageProps {
    bodyClass: string;
}

const IndexPage: NextPage<IndexPageProps> & { bodyClass?: string } = () => {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // Make a POST request to the API route with the entered username
            console.log("posting")
            const response = await axios.post('/api/search/player', { username });
            if (response.status !== 200){
                throw new Error("User not found.");
            }
            const { data } = response;
            await router.push(data.redirectUrl);
        } catch (error) {
            console.error(error);
            console.log("hello");
            setError("Error: User with this discord username does not exist in the database.");
        }
    };

    return (
        <div className="wrapper">
            <div className="section section-hero section-shaped">
                <div className="shape shape-style-3 shape-default">
                    <span className="span-150"></span>
                    <span className="span-50"></span>
                    <span className="span-50"></span>
                    <span className="span-75"></span>
                    <span className="span-100"></span>
                    <span className="span-75"></span>
                    <span className="span-50"></span>
                    <span className="span-100"></span>
                    <span className="span-50"></span>
                    <span className="span-100"></span>
                </div>
                <div className="page-header">
                    <div className="container shape-container d-flex align-items-center py-lg">
                        <div className="col px-0">
                            <div className="row align-items-center justify-content-center">
                                <div className="col-lg-6 text-center">
                                    <h1 className="text-white display-2">HOI4Intel Database</h1>
                                    <h2 className="display-4 font-weight-normal text-white">People create stories. Unfold them now!</h2>
                                    <div className="btn-wrapper mt-4">
                                        <div className="card bg-secondary shadow border-0">
                                            <div className="card-body px-lg-5 py-lg-5">
                                                <div className="text-center text-muted mb-4">
                                                    <small>{ error }</small>
                                                </div>
                                                <div>
                                                    <form onSubmit={handleSubmit} id='form'>
                                                        <div className="input-group input-group-alternative">
                                                            <div className="input-group-prepend">
                                                              <span className="input-group-text">
                                                                <i className="ni ni-circle-08"></i>
                                                              </span>
                                                            </div>
                                                            <input
                                                                className="form-control"
                                                                placeholder="Username"
                                                                type="text"
                                                                value={username}
                                                                onChange={(e) => setUsername(e.target.value)}
                                                            />
                                                        </div>
                                                        <div className="text-center">
                                                            <button className="btn btn-primary my-4" type='submit'>
                                                                Search
                                                            </button>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="separator separator-bottom separator-skew zindex-100">
                    <svg x="0" y="0" viewBox="0 0 2560 100" preserveAspectRatio="none" version="1.1"
                         xmlns="http://www.w3.org/2000/svg">
                        <polygon className="fill-white" points="2560 0 2560 100 0 100"></polygon>
                    </svg>
                </div>
            </div>
            <div className="section features-1">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 mx-auto text-center">
                            <span className="badge badge-primary badge-pill mb-3">FEATURES</span>
                            <h3 className="display-3">HOI4Intel Database</h3>
                            <p className="lead">The time is now for history to be unfolded.</p>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-md-4 text-center">
                            <div className="info">
                                <div className="icon icon-lg icon-shape icon-shape-primary shadow rounded-circle">
                                    <i className="ni ni-settings-gear-65"></i>
                                </div>
                                <h6 className="info-title text-uppercase text-primary">Player Profiles</h6>
                                <p className="description opacity-8">Player profiles give insights to hosts and other players about their skills and personalities.</p>
                            </div>
                        </div>
                        <div className="col-md-4 text-center">
                            <div className="info">
                                <div className="icon icon-lg icon-shape icon-shape-success shadow rounded-circle">
                                    <i className="ni ni-atom"></i>
                                </div>
                                <h6 className="info-title text-uppercase text-success">Analyze Performance</h6>
                                <p className="description opacity-8">Analyzing player's performance has never been easier with detailed reports for each game!</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

IndexPage.bodyClass = 'profile-page';

export default IndexPage;
