import React from 'react';
import { connect } from 'react-redux';

import {retrieveCareDetails } from '../../actions/index.js'

import PrimeCareSuccessView from '../../components/commons/primeCare/primeCareSuccessView.js'

const queryString = require('query-string');

class primeCareSuccess extends React.Component {
    constructor(props) {
        super(props)
        this.state={
            data:''
        }
    }

    componentDidMount() {
        const parsed = queryString.parse(this.props.location.search)

        this.props.retrieveCareDetails(parsed.user_plan,(resp)=>{
            this.setState({data:resp})
        })
        if (window) {
            window.scrollTo(0, 0)
        }
    }

    render() {

        return (
            <PrimeCareSuccessView {...this.props} data={this.state.data}/>
        );
    }
}

const mapStateToProps = (state) => {
    return {

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        retrieveCareDetails:(selectedPlan, cb) => dispatch(retrieveCareDetails(selectedPlan,cb))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(primeCareSuccess);
