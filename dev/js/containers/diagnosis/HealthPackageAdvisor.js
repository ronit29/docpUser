import React from 'react';
import { connect } from 'react-redux';

import { } from '../../actions/index.js'
import HealthPackageAdvisorView from '../../components/diagnosis/HealthPackageAdvisorView.js';

class HealthPackageAdvisor extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        return (
            <HealthPackageAdvisorView {...this.props} />
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

export default connect(mapStateToProps, mapDispatchToProps)(HealthPackageAdvisor);