import React from 'react';
import { connect } from 'react-redux';

import { } from '../../actions/index.js'

import HealthPackageView from '../../components/diagnosis/healthPackage/index'

class HealthPackage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        return (
            <HealthPackageView {...this.props} />
        );
    }
}

const mapStateToProps = (state, passedProps) => {


    return {

    }
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}


export default connect(mapStateToProps, mapDispatchToProps)(HealthPackage);
