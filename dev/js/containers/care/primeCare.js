import React from 'react';
import { connect } from 'react-redux';

import {getCareDetails, setPackageId } from '../../actions/index.js'

import STORAGE from '../../helpers/storage'

import PrimeCareView from '../../components/commons/primeCare/primeCareView.js'

class primeCare extends React.Component {
    constructor(props) {
        super(props)
        if (!STORAGE.checkAuth()) {
            this.props.history.replace(`/login?callback=/prime/plans`)
        }
        this.state = {
            data: '',
            feature_data:{}
        }
    }

    
    componentDidMount() {
        this.props.getCareDetails((resp)=>{
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

    }

    render() {
        return (
            <PrimeCareView {...this.props} data={this.state.data} feature_data={this.state.feature_data}/>
        );
    }
}

const mapStateToProps = (state) => {
    return {

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getCareDetails: (callback) => dispatch(getCareDetails(callback)),
        setPackageId: (package_id, isHomePage) => dispatch(setPackageId(package_id, isHomePage)),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(primeCare);
