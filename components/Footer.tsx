import React from 'react';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="row row-grid align-items-center mb-5">
                    <div className="col-lg-6">
                        <h3 className="text-primary font-weight-light mb-2">Thank you for supporting us!</h3>
                        <h4 className="mb-0 font-weight-light">Let's get in touch on any of these platforms.</h4>
                    </div>
                    <div className="col-lg-6 text-lg-center btn-wrapper">
                        <a rel="nofollow" href="https://hoi.theorganization.eu/" target="_blank"
                                className="btn btn-icon-only btn-dribbble rounded-circle" data-toggle="tooltip"
                                data-original-title="Check the main page">
                            <span className="btn-inner--icon"><i className="fa fa-dribbble"></i></span>
                        </a>
                        <a rel="nofollow" href="https://github.com/NinjonikSVK/HOI4IntelUP" target="_blank"
                                className="btn btn-icon-only btn-github rounded-circle" data-toggle="tooltip"
                                data-original-title="Star on Github">
                            <span className="btn-inner--icon"><i className="fa fa-github"></i></span>
                        </a>
                        <a rel="nofollow" href="https://discord.gg/world-war-community-820918304176340992" target="_blank"
                           className="btn btn-icon-only btn-github rounded-circle" data-toggle="tooltip"
                           data-original-title="Join Discord">
                            <span className="btn-inner--icon"><i className="fa fa-phone"></i></span>
                        </a>
                    </div>
                </div>
                <div>
                    <div className="row align-items-center justify-content-md-between">
                        <div className="col-md-6">
                            <div className="copyright">
                                &copy; 2023 <a href="" target="_blank">HOI4Intel</a>, Design by: Creative Tim.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;