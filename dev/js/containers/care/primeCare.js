import React from 'react';
import { connect } from 'react-redux';

import {getCareDetails, setPackageId, sendOTP, submitOTP, resetAuth, getIsCareDetails, selectSearchType } from '../../actions/index.js'

import STORAGE from '../../helpers/storage'

import PrimeCareView from '../../components/commons/primeCare/primeCareView.js'

class primeCare extends React.Component {
    constructor(props) {
        super(props)
        // if (!STORAGE.checkAuth()) {
        //     this.props.history.replace(`/login?callback=/prime/plans`)
        // }
        this.state = {
            data: '',
            feature_data:{}
        }
    }

    
    componentDidMount() {
        this.props.getCareDetails((resp)=>{ // get care plans
            if(resp){
                let feature_data = {}
                resp.plans.map(function (plans) {
                     plans.features.map(function (feature) {
                        if(feature_data[feature.id]){
                           feature_data[feature.id] = [].concat(feature_data[feature.id])
                        }else{
                            feature_data[feature.id] = []
                            
                        }
                        feature_data[feature.id].push({planId: plans.id, count: feature.count, id: feature.id})                                                 
                     })
                 })
                this.setState({data:resp,feature_data:feature_data})
            }
        })
        if (window) {
            window.scrollTo(0, 0)
        }

    }

    render() {
        return (
            <PrimeCareView {...this.props} data={this.state.data} feature_data={this.state.feature_data}/>
        );
    }
}

const mapStateToProps = (state) => {

    const {
        selectedLocation
    } = state.SEARCH_CRITERIA_LABS

    return {
        selectedLocation
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getCareDetails: (callback) => dispatch(getCareDetails(callback)),
        setPackageId: (package_id, isHomePage) => dispatch(setPackageId(package_id, isHomePage)),
        sendOTP: (number,viaSms,viaWhatsapp,message_type, cb) => dispatch(sendOTP(number,viaSms,viaWhatsapp,message_type, cb)),
        submitOTP: (number, otp, extraParamsData, cb) => dispatch(submitOTP(number, otp, extraParamsData, cb)),
        resetAuth: () => dispatch(resetAuth()),
        getIsCareDetails: (cb) => dispatch(getIsCareDetails(cb)),
        selectSearchType: (type) => dispatch(selectSearchType(type)),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(primeCare);
