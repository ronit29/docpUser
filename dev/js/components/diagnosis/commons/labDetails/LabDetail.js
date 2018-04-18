import React from 'react';
import { connect } from 'react-redux';

import LabProfileCard from '../labProfileCard/index.js'

class LabDetails extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {

        return (
            <LabProfileCard 
                details={this.props.data}
                hideBottom={true}
                hideBookNow={true}
            />
        );
    }
}


export default LabDetails
