import React from 'react';

class NotFound extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {

        return (
            <div className="profile-body-wrap">
                <header className="profile-header" style={{ display: 'block' }}>
                    <div className="smiley-img-div">
                        <img src={ASSETS_BASE_URL + "/img/customer-icons/smiley.png"} />
                    </div>
                    <div className="container">
                        <div className="row header-row">
                            <div className="col-12 text-center logo-icon-div">
                                <a href="javascript:;" onClick={() => {
                                    this.props.history.push('/')
                                }}><img src={ASSETS_BASE_URL + "/img/doc-prime-logo.png"} className="logo-icon" /></a>
                            </div>
                        </div>
                    </div>
                </header>
                <div className="subheader" />
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-md-10 offset-md-1">
                            <div className="error-widget text-center">
                                <p className="error-head fw-500">404</p>
                                <img src={ASSETS_BASE_URL + "/img/icons/error.png"} />
                                <p className="error-text fw-500">Page not found !</p>
                                <p className="error-link">Go to <a href="javascript:;" onClick={() => {
                                    this.props.history.push('/')
                                }}>docprime homepage</a></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


export default NotFound
