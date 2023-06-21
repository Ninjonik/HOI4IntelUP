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
                <script src="../assets/js/core/jquery.min.js" type="text/javascript"></script>
                <script src="../assets/js/core/popper.min.js" type="text/javascript"></script>
                <script src="../assets/js/core/bootstrap.min.js" type="text/javascript"></script>
                <script src="../assets/js/plugins/perfect-scrollbar.jquery.min.js"></script>
                <script src="../assets/js/plugins/bootstrap-switch.js"></script>
                <script src="../assets/js/plugins/nouislider.min.js" type="text/javascript"></script>
                <script src="../assets/js/plugins/moment.min.js"></script>
                <script src="../assets/js/plugins/datetimepicker.js" type="text/javascript"></script>
                <script src="../assets/js/plugins/bootstrap-datepicker.min.js"></script>
                <script src="../assets/js/argon-design-system.min.js?v=1.2.2" type="text/javascript"></script>
                <script src="https://cdn.trackjs.com/agent/v3/latest/t.js"></script>
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
