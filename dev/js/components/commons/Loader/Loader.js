import React from 'react';

import { CircularProgress } from 'material-ui/Progress';

class Loader extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {

        return (
            <div className={this.props.classType || "loaderCircular"} >
                <CircularProgress className={"loaderactual"} size={50} thickness={3} />
            </div>

        );
    }
}

export default Loader
