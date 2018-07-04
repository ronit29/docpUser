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
                        <img src="/assets/img/customer-icons/smiley.png" />
                    </div>
                    <div className="container">
                        <div className="row header-row">
                            <div className="col-12 text-center logo-icon-div">
                                <a href="javascript:;" onClick={() => {
                                    this.props.history.push('/')
                                }}><img src="/assets/img/doc-prime-logo.png" className="logo-icon" /></a>
                            </div>
                        </div>
                    </div>
                </header>
                <div className="subheader" />
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-md-10 offset-md-1">
                            <div className="error-widget text-center">
                                <div className="error-server-div">
                                    <img src="/assets/img/icons/error-2.png" />
                                    <p className="error-text fw-500">Its look like something is not right !</p>
                                    <p className="error-text fw-500">We are diagnosing the problem</p>
                                    <p className="error-text-2 fw-500">Please try again after sometime</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


export default NotFound
