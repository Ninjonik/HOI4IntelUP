import React from 'react';

const Header = () => {
    return (
            <nav id="navbar-main" className="navbar navbar-main navbar-expand-lg navbar-transparent navbar-light py-2">
                <div className="container">
                    <a className="navbar-brand mr-lg-5" href="/">
                        <h5 className="text-white">HOI4Intel</h5>
                    </a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar_global" aria-controls="navbar_global" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                </div>
            </nav>
    );
};

export default Header;