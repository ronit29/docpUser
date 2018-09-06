import React from 'react';

class Loader extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {

        return (
            <div className={this.props.classType || "loaderCircular"} >
                <div className="dp-loader"></div>
            </div>
        );
    }
}

export default Loader
