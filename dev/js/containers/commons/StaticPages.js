import React from 'react';
import { connect } from 'react-redux';

import { submitCareerProfile, submitContactMessage, signupDoctor, getCities } from '../../actions/index.js'

import StaticPagesView from '../../components/commons/staticPages'

class StaticPages extends React.Component {
    constructor(props) {
        super(props)
    }

    static contextTypes = {
        router: () => null
    }

    componentDidMount() {

    }

    render() {

        return (
            <StaticPagesView {...this.props} />
        );
    }
}

const mapStateToProps = (state) => {

    let {
        citiesName,
        utm_tags
    } = state.USER
    return {
        citiesName,
        utm_tags
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        submitCareerProfile: (postCareerData, cb) => dispatch(submitCareerProfile(postCareerData, cb)),
        submitContactMessage: (postContactData, cb) => dispatch(submitContactMessage(postContactData, cb)),
        signupDoctor: (signupDoctorData, cb) => dispatch(signupDoctor(signupDoctorData, cb)),
        getCities: (filterText) => dispatch(getCities(filterText))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(StaticPages);
