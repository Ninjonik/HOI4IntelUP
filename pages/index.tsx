import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { NextPage } from 'next';
import Autosuggest, { SuggestionsFetchRequestedParams, SuggestionSelectedEventData } from 'react-autosuggest';
import Link from "next/link";

interface IndexPageProps {
    bodyClass: string;
}

interface Suggestion {
    id: string;
    discord_id?: string;
    discord_name: string;
    redirectUrl: string;
    avatarUrl: string;
    rating: number;
}

const IndexPage: NextPage<IndexPageProps> & { bodyClass?: string } = () => {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [error, setError] = useState('');
    const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
    const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSuggestionSelected = (
        _: React.FormEvent<any>,
        { suggestion }: SuggestionSelectedEventData<Suggestion>
    ) => {
        router.push(suggestion.redirectUrl);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // Make a POST request to the API route with the entered username
            const response = await axios.post('/api/search/player', { username });
            if (response.status !== 200) {
                throw new Error('User not found.');
            }
            const { data } = response;
            await router.push(data.redirectUrl);
        } catch (error) {
            console.error(error);
            setError('Error: User with this Discord username does not exist in the database.');
        }
    };

    const fetchSuggestions = async (value: string) => {
        try {
            const response = await axios.get(`/api/search/suggestions?query=${value}`);
            if (response.status === 200) {
                const { data } = response;
                setSuggestions(data);
            }
        } catch (error) {
            console.error(error);
        }
        setIsLoading(false); // Set loading state to false after fetching suggestions
    };


    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        return () => {
            setIsMounted(false);
        };
    }, []);

    const renderSuggestion = (suggestion: Suggestion) => {
        const suggestionClass = isMounted ? 'jump-animation' : '';

        return (
            <div className={`card suggestion-card ${suggestionClass}`}>
                <Link href={suggestion.redirectUrl}>
                    <div className="card-body d-flex align-items-center">
                        {console.log(suggestion.avatarUrl)}
                        <img src={suggestion.avatarUrl} alt="Avatar" className="avatar" />
                        <div className="ml-3">
                            <h5 className="card-title mb-1 text-left">{suggestion.discord_name}</h5>
                            <p className="card-text mb-0 text-left">Rating: {suggestion.rating * 100}%</p>
                        </div>
                    </div>
                </Link>
            </div>
        );
    };

    const shouldRenderSuggestions = (value: string) => value.trim().length > 0;

    const handleInputChange = (e: React.FormEvent<HTMLInputElement>, { newValue }: Autosuggest.ChangeEvent) => {
        setUsername(newValue);
        if (typingTimeout) {
            clearTimeout(typingTimeout);
        }

        setIsLoading(true); // Set loading state to true immediately

        setTypingTimeout(setTimeout(() => {
            fetchSuggestions(newValue);
        }, 200));
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
                                                    <small>{error}</small>
                                                </div>
                                                <div>
                                                    <form onSubmit={handleSubmit} id='form'>
                                                        <div className="input-group input-group-alternative">
                                                            <table className="table">
                                                                <thead>
                                                                <tr>
                                                                    <th className="text-center">Search in HOI4Intel's Database</th>
                                                                </tr>
                                                                </thead>
                                                                <tbody>
                                                                <tr>
                                                                    <td>
                                                                        <Autosuggest
                                                                            suggestions={suggestions}
                                                                            onSuggestionsFetchRequested={({ value }) => {}} // Don't fetch suggestions here
                                                                            onSuggestionsClearRequested={() => setSuggestions([])}
                                                                            getSuggestionValue={(suggestion) => suggestion.discord_name}
                                                                            renderSuggestion={renderSuggestion}
                                                                            inputProps={{
                                                                                placeholder: 'Username',
                                                                                value: username,
                                                                                onChange: handleInputChange, // Use the custom input change handler
                                                                                className: 'form-control',
                                                                                style: { marginBottom: '10px' }
                                                                            }}
                                                                            shouldRenderSuggestions={shouldRenderSuggestions}
                                                                        />
                                                                        {isLoading && (
                                                                            <div className="spinner-border text-primary" role="status">
                                                                                <span className="sr-only">Searching...</span>
                                                                            </div>
                                                                        )}
                                                                    </td>
                                                                </tr>
                                                                </tbody>
                                                            </table>
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
