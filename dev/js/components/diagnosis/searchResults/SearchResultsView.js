import React from 'react';

import LabsList from '../searchResults/labsList/index.js'
import TopBar from '../searchResults/topBar/index.js'
import CriteriaSelector from '../commons/criteriaSelector/index.js'

class SearchResultsView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    componentDidMount() {
        try {
            let searchState = this.getLocationParam('search')
            // let filterState = this.getLocationParam('filter')
            // if(filterState){
            //     filterState = JSON.parse(filterState)
            // }
            searchState = JSON.parse(searchState)
            this.getLabList(searchState)
        } catch (e) {
            this.getLabList()
        }
    }

    getLocationParam(tag) {
        // this API assumes the context of react-router-4
        const paramString = this.props.location.search
        const params = new URLSearchParams(paramString)
        return params.get(tag)
    }

    getLabList(searchState) {
        this.props.getLabs(searchState);
    }

    render() {

        return (
            <div className="searchResults">
                {
                    this.props.LOADING ? "" :
                        <div>
                            <CriteriaSelector
                                commonlySearchedTests={this.props.commonlySearchedTests}
                                selectedTests={this.props.selectedTests}
                                toggleTest={this.props.toggleTest.bind(this)}
                                selectedDiagnosisCriteria={this.props.selectedDiagnosisCriteria}
                                toggleDiagnosisCriteria={this.props.toggleDiagnosisCriteria.bind(this)}
                            />
                            <TopBar />
                            <LabsList {...this.props} />
                        </div>
                }
            </div>
        );
    }
}

export default SearchResultsView
