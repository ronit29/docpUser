import React from 'react';
import { connect } from 'react-redux';

import { getLabById } from '../../actions/index.js'

import LabProfileView from '../../components/diagnosis/labProfile/index.js'

class LabProfile extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {

        return (
            <LabProfileView {...this.props} />
        );
    }
}

const mapStateToProps = (state) => {

    let LABS = state.LABS

    return {
        LABS
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getLabById : (labId) => dispatch(getLabById(labId))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(LabProfile);
