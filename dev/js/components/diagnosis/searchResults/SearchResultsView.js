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
        this.getLabs()
    }

    getLabs() {
        let {
            selectedTests,
            selectedLocation,
            selectedDiagnosisCriteria,
            CRITERIA_LOADED
        } = this.props

        if (CRITERIA_LOADED) {
            let searchState = {
                selectedTests,
                selectedLocation,
                selectedDiagnosisCriteria
            }
            let filterState = this.props.filterCriteria
            this.getLabList(searchState, filterState, false)
        } else {
            try {
                let searchState = this.getLocationParam('search')
                let filterState = this.getLocationParam('filter')
                if (filterState) {
                    filterState = JSON.parse(filterState)
                } else {
                    filterState = {}
                }
                searchState = JSON.parse(searchState)
                this.getLabList(searchState, filterState, true)
            } catch (e) {
                console.error(e)
            }
        }
    }

    getLocationParam(tag) {
        // this API assumes the context of react-router-4
        const paramString = this.props.location.search
        const params = new URLSearchParams(paramString)
        return params.get(tag)
    }

    getLabList(searchState, filterState, mergeState) {
        this.props.getLabs(searchState, filterState, mergeState);
    }

    updateLabs(fn){
        return (...args) => {
            fn(...args)
            setTimeout(this.getLabs.bind(this) ,0)
        }
    }

    render() {

        return (
            <div className="searchResults">
                {
                    this.props.LOADING ? "" :
                        <div>
                            <CriteriaSelector
                                heading={"Add More test"}
                                selectedLocation={this.props.selectedLocation}
                                commonlySearchedTests={this.props.commonlySearchedTests}
                                selectedTests={this.props.selectedTests}
                                toggleTest={ this.updateLabs.call(this,this.props.toggleTest.bind(this)) }
                                selectedDiagnosisCriteria={this.props.selectedDiagnosisCriteria}
                                toggleDiagnosisCriteria={ this.updateLabs.call(this,this.props.toggleDiagnosisCriteria.bind(this)) }
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
