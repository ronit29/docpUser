import React from 'react';
import { connect } from 'react-redux';

import { searchTestData,selectedCriterias,searchTestInfoData,toggleDiagnosisCriteria} from '../../actions/index.js'

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
    let { selectedCriterias,searchTestInfoData } = state.SEARCH_CRITERIA_LABS
    return {
        selectedCriterias,searchTestInfoData

    }

}

const mapDispatchToProps = (dispatch) => {
    return {
        searchTestData: (test_ids,callback) => dispatch(searchTestData(test_ids,callback)),
        toggleDiagnosisCriteria: (type, criteria, forceAdd) => dispatch(toggleDiagnosisCriteria(type, criteria, forceAdd)),
        
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(searchTestInfo);
