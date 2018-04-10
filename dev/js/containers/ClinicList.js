import React from 'react';
import { connect } from 'react-redux';

import { } from '../actions/index.js'

import ClinicListView from '../components/clinicList/index.js'

class ClinicList extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {

        return (
            <ClinicListView />
        );
    }
}

const mapStateToProps = (state) => {

    return {
        
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ClinicList);
