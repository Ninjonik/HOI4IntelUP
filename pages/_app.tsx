import React from 'react';
import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { NextPage } from 'next';

import Header from "../components/Header";
import Footer from "../components/Footer"; // Import your global CSS file here

import '../styles/assets/css/nucleo-icons.css';
import '../styles/assets/css/nucleo-svg.css';
import '../styles/assets/css/font-awesome.css';
import '../styles/assets/css/argon-design-system.css';

interface CustomAppProps extends AppProps {
    Component: NextPage & {
        bodyClass?: string;
    };
}

function MyApp({ Component, pageProps }: CustomAppProps) {
    const router = useRouter();
    const bodyClass = Component.bodyClass || '';

    return (
        <>
            <Head>
                <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700" rel="stylesheet" />
                <link href="https://use.fontawesome.com/releases/v5.0.6/css/all.css" rel="stylesheet" />
            </Head>
            <div className={bodyClass}>
                <Header />
                <Component {...pageProps} />
                <Footer />
            </div>
        </>
    );
}

export default MyApp;
