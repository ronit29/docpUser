import React from 'react';

class Loader extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {

        return (
            <div className={this.props.classType || "loaderCircular"} >
                <div className="dp-loader"></div>
                {
                    this.props.iFramePopup ?
                        <p className="fw-500 mrt-10">Redirecting you to Pharmeasy website...</p> : ''
                }
            </div>
        );
    }
}

export default Loader
