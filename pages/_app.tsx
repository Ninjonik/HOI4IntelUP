import React from 'react';
import { AppProps } from 'next/app';
import { useRouter } from 'next/router';

import '../styles/index.css';

function App({ Component, pageProps }: AppProps) {
    const router = useRouter();

    const renderPage = () => {
        if (router.pathname === '/about') {
            return <Component {...pageProps} />;
        }

        return <Component {...pageProps} />;
    };

    return renderPage();
}

export default App;
