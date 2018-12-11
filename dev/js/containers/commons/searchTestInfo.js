import React from 'react';
import { connect } from 'react-redux';

import { searchTestData,selectedCriterias,searchTestInfoData} from '../../actions/index.js'

import SearchTestView from '../../components/commons/search/searchTestInfo.js'

class searchTestInfo extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return(
            <SearchTestView {...this.props}/>
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
        searchTestData: (test_ids) => dispatch(searchTestData(test_ids)),
        
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(searchTestInfo);
