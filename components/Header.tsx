import React from 'react';

const Header = () => {
    return (
        <nav id="navbar-main" className="navbar navbar-main navbar-expand-lg bg-white navbar-light position-sticky top-0 shadow py-2">
            <div className="container">
                <a className="navbar-brand mr-lg-5" href="./index.html">
                    <img src="/img/brand/blue.png"></img>
                </a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar_global" aria-controls="navbar_global" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="navbar-collapse collapse" id="navbar_global">
                    <div className="navbar-collapse-header">
                        <div className="row">
                            <div className="col-6 collapse-brand">
                                <a href="./index.html">
                                    <img src="/img/brand/blue.png"></img>
                                </a>
                            </div>
                            <div className="col-6 collapse-close">
                                <button type="button" className="navbar-toggler" data-toggle="collapse" data-target="#navbar_global" aria-controls="navbar_global" aria-expanded="false" aria-label="Toggle navigation">
                                    <span></span>
                                    <span></span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <ul className="navbar-nav navbar-nav-hover align-items-lg-center">
                        <li className="nav-item dropdown">
                            <a href="#" className="nav-link" data-toggle="dropdown" role="button">
                                <i className="ni ni-ui-04 d-lg-none"></i>
                                <span className="nav-link-inner--text">Components</span>
                            </a>
                            <div className="dropdown-menu dropdown-menu-xl">
                                <div className="dropdown-menu-inner">
                                    <a href="https://demos.creative-tim.com/argon-design-system/docs/getting-started/overview.html" className="media d-flex align-items-center">
                                        <div className="icon icon-shape bg-gradient-primary rounded-circle text-white">
                                            <i className="ni ni-spaceship"></i>
                                        </div>
                                        <div className="media-body ml-3">
                                            <h6 className="heading text-primary mb-md-1">Getting started</h6>
                                            <p className="description d-none d-md-inline-block mb-0">Learn how to use compiling Scss, change brand colors and more.</p>
                                        </div>
                                    </a>
                                    <a href="https://demos.creative-tim.com/argon-design-system/docs/foundation/colors.html" className="media d-flex align-items-center">
                                        <div className="icon icon-shape bg-gradient-success rounded-circle text-white">
                                            <i className="ni ni-palette"></i>
                                        </div>
                                        <div className="media-body ml-3">
                                            <h6 className="heading text-primary mb-md-1">Foundation</h6>
                                            <p className="description d-none d-md-inline-block mb-0">Learn more about colors, typography, icons and the grid system we used for .</p>
                                        </div>
                                    </a>
                                    <a href="https://demos.creative-tim.com/argon-design-system/docs/components/alerts.html" className="media d-flex align-items-center">
                                        <div className="icon icon-shape bg-gradient-warning rounded-circle text-white">
                                            <i className="ni ni-ui-04"></i>
                                        </div>
                                        <div className="media-body ml-3">
                                            <h5 className="heading text-warning mb-md-1">Components</h5>
                                            <p className="description d-none d-md-inline-block mb-0">Browse our 50 beautiful handcrafted components offered in the Free version.</p>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </li>
                        <li className="nav-item dropdown">
                            <a href="#" className="nav-link" data-toggle="dropdown" role="button">
                                <i className="ni ni-collection d-lg-none"></i>
                                <span className="nav-link-inner--text">Examples</span>
                            </a>
                            <div className="dropdown-menu">
                                <a href="./examples/landing.html" className="dropdown-item">Landing</a>
                                <a href="./examples/profile.html" className="dropdown-item">Profile</a>
                                <a href="./examples/login.html" className="dropdown-item">Login</a>
                                <a href="./examples/register.html" className="dropdown-item">Register</a>
                            </div>
                        </li>
                    </ul>
                    <ul className="navbar-nav align-items-lg-center ml-lg-auto">
                        <li className="nav-item">
                            <a className="nav-link nav-link-icon" href="https://www.facebook.com/CreativeTim/" target="_blank" data-toggle="tooltip" title="Like us on Facebook">
                                <i className="fa fa-facebook-square"></i>
                                <span className="nav-link-inner--text d-lg-none">Facebook</span>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link nav-link-icon" href="https://www.instagram.com/creativetimofficial" target="_blank" data-toggle="tooltip" title="Follow us on Instagram">
                                <i className="fa fa-instagram"></i>
                                <span className="nav-link-inner--text d-lg-none">Instagram</span>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link nav-link-icon" href="https://twitter.com/creativetim" target="_blank" data-toggle="tooltip" title="Follow us on Twitter">
                                <i className="fa fa-twitter-square"></i>
                                <span className="nav-link-inner--text d-lg-none">Twitter</span>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link nav-link-icon" href="https://github.com/creativetimofficial/argon-design-system" target="_blank" data-toggle="tooltip" title="Star us on Github">
                                <i className="fa fa-github"></i>
                                <span className="nav-link-inner--text d-lg-none">Github</span>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="btn btn-outline-primary" href="https://www.creative-tim.com/builder/argon" target="_blank">
                                <span className="nav-link-inner--text">Online Builder</span>
                            </a>
                        </li>
                        <li className="nav-item d-none d-lg-block">
                            <a href="https://www.creative-tim.com/product/argon-design-system-pro?ref=ads-upgrade-pro" target="_blank" className="btn btn-primary btn-icon">
                                  <span className="btn-inner--icon">
                                    <i className="fa fa-shopping-cart"></i>
                                  </span>
                                <span className="nav-link-inner--text">Upgrade to PRO</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Header;