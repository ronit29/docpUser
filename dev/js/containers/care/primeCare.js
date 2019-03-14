import React from 'react';
import { connect } from 'react-redux';

import {getCareDetails } from '../../actions/index.js'

import PrimeCareView from '../../components/commons/primeCare/primeCareView.js'

class primeCare extends React.Component {
    constructor(props) {
        super(props)
    }

    
    componentDidMount() {
        this.props.getCareDetails((resp)=>{
            console.log(resp)
            console.log('response=container')
        })

    }

    render() {

        return (
            <PrimeCareView {...this.props} />
        );
    }
}

const mapStateToProps = (state) => {
    return {

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getCareDetails: (callback) => dispatch(getCareDetails(callback))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(primeCare);
