import React from 'react';
import { connect } from 'react-redux';

import LocationSelector from '../../commons/locationSelector/index.js'
import CriteriaSelector from '../commons/criteriaSelector/index.js'
import CommonlySearched from '../commons/commonlySearched/index.js'

class SearchCriteriaView extends React.Component {
    constructor(props) {
        super(props)
    }

    searchProceed(){
        let searchData = {
            selectedTests : this.props.selectedTests,
            selectedLocation : this.props.selectedLocation,
            selectedDiagnosisCriteria : this.props.selectedDiagnosisCriteria
        }
        searchData = encodeURIComponent(JSON.stringify(searchData))
        this.context.router.history.push(`/dx/searchresults?search=${searchData}`)
    }

    static contextTypes = {
        router: () => null
    }

    render() {

        return (
            <div className="searchCriteria">
                <LocationSelector
                    selectedLocation={this.props.selectedLocation}
                />
                <CriteriaSelector
                    commonlySearchedTests={this.props.commonlySearchedTests}
                    selectedTests={this.props.selectedTests}
                    toggleTest={this.props.toggleTest.bind(this)}
                    selectedDiagnosisCriteria={this.props.selectedDiagnosisCriteria}
                    toggleDiagnosisCriteria={this.props.toggleDiagnosisCriteria.bind(this)}
                />

                <CommonlySearched
                    heading="Commonly searched tests"
                    data={this.props.commonlySearchedTests}
                    selected={this.props.selectedTests}
                    toggleRow={this.props.toggleTest.bind(this)}
                />

                <button onClick={this.searchProceed.bind(this)} className="proceedBtn"> Proceed </button>
            </div>
        );
    }
}

export default SearchCriteriaView
