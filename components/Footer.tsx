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
                        <button rel="nofollow"
                                className="btn btn-icon-only btn-twitter rounded-circle" data-toggle="tooltip"
                                data-original-title="Follow us">
                            <span className="btn-inner--icon"><i className="fa fa-twitter"></i></span>
                        </button>
                        <button rel="nofollow"
                                className="btn-icon-only rounded-circle btn btn-facebook" data-toggle="tooltip"
                                data-original-title="Like us">
                            <span className="btn-inner--icon"><i className="fab fa-facebook"></i></span>
                        </button>
                        <button rel="nofollow"
                                className="btn btn-icon-only btn-dribbble rounded-circle" data-toggle="tooltip"
                                data-original-title="Follow us">
                            <span className="btn-inner--icon"><i className="fa fa-dribbble"></i></span>
                        </button>
                        <button rel="nofollow"
                                className="btn btn-icon-only btn-github rounded-circle" data-toggle="tooltip"
                                data-original-title="Star on Github">
                            <span className="btn-inner--icon"><i className="fa fa-github"></i></span>
                        </button>
                    </div>
                </div>
                <div>
                    <div className="row align-items-center justify-content-md-between">
                        <div className="col-md-6">
                            <div className="copyright">
                                &copy; 2020 <a href="" target="_blank">Creative Tim</a>.
                            </div>
                        </div>
                        <div className="col-md-6">
                            <ul className="nav nav-footer justify-content-end">
                                <li className="nav-item">
                                    <a href="" className="nav-link" target="_blank">Creative Tim</a>
                                </li>
                                <li className="nav-item">
                                    <a href="" className="nav-link" target="_blank">About Us</a>
                                </li>
                                <li className="nav-item">
                                    <a href="" className="nav-link" target="_blank">Blog</a>
                                </li>
                                <li className="nav-item">
                                    <a href="" className="nav-link" target="_blank">License</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;