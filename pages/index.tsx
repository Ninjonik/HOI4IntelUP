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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // Make a POST request to the API route with the entered username
            console.log("posting")
            const response = await axios.post('/api/search/player', { username });
            const { data } = response;
            console.log(response);

            router.push(data);
        } catch (error) {
            console.error(error);
            // TODO: Handle error scenario, e.g., show an error message to the user
        }
    };

    return (
        <section className="section section-shaped section-lg">
            <div className="shape shape-style-1 bg-gradient-default">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
            <div className="container pt-lg-7">
                <div className="row justify-content-center">
                    <div className="col-lg-5">
                        <div className="card bg-secondary shadow border-0">
                            <div className="card-body px-lg-5 py-lg-5">
                                <div className="text-center text-muted mb-4">
                                    <small>Search for user in the HOI4Intel Database</small>
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
        </section>
    );
};

IndexPage.bodyClass = 'login-page';

export default IndexPage;
