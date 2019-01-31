import React from 'react';
import { connect } from 'react-redux';

import { searchTestData,selectedCriterias,searchTestInfoData,toggleDiagnosisCriteria, setLabSearchId} from '../../actions/index.js'

import SearchTestView from '../../components/commons/search/searchTestInfo.js'

class searchTestInfo extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return(
            <SearchTestView {...this.props} hideHeaderOnMobile={true}/>
            )
    }
}

const mapStateToProps = (state) => {
    let { selectedCriterias,searchTestInfoData,search_id_data,selectedLocation,locationType } = state.SEARCH_CRITERIA_LABS
    return {
        selectedCriterias,searchTestInfoData,search_id_data,selectedLocation,locationType

    }

}

const mapDispatchToProps = (dispatch) => {
    return {
        searchTestData: (test_ids,lab_id,callback) => dispatch(searchTestData(test_ids,lab_id,callback)),
        toggleDiagnosisCriteria: (type, criteria, forceAdd) => dispatch(toggleDiagnosisCriteria(type, criteria, forceAdd)),
        setLabSearchId: (searchId, filters, setDefault) => dispatch(setLabSearchId(searchId, filters, setDefault))
        
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(searchTestInfo);
