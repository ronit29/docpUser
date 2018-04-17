import React from 'react';
import { connect } from 'react-redux';

import CommonlySearched from '../commons/commonlySearched/index.js'
import LocationSelector from '../../commons/locationSelector/index.js'
import CriteriaSelector from '../commons/criteriaSelector/index.js'

class SearchCriteriaView extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount(){
        this.props.loadSearchCriteria()
    }

    searchProceed(){
        // let searchData = {
        //     selectedSpecialities : this.props.selectedSpecialities,
        //     selectedConditions : this.props.selectedConditions,
        //     selectedLocation : this.props.selectedLocation,
        //     selectedCriteria : this.props.selectedCriteria
        // }
        // searchData = encodeURIComponent(JSON.stringify(searchData))
        this.context.router.history.push(`/searchresults`)
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
                    commonlySearchedConditions={this.props.commonlySearchedConditions}
                    selectedConditions={this.props.selectedConditions}
                    commonlySearchedSpecialities={this.props.commonlySearchedSpecialities}
                    selectedSpecialities={this.props.selectedSpecialities}
                    selectedCriteria={this.props.selectedCriteria}
                    toggleCondition={this.props.toggleCondition.bind(this)}
                    toggleSpeciality={this.props.toggleSpeciality.bind(this)}
                    toggleCriteria={this.props.toggleCriteria.bind(this)}
                />
                <CommonlySearched
                    heading="Commonly searched conditions"
                    data={this.props.commonlySearchedConditions}
                    selected={this.props.selectedConditions}
                    togglePill={this.props.toggleCondition.bind(this)}
                />
                <CommonlySearched
                    heading="Commonly searched specialities"
                    data={this.props.commonlySearchedSpecialities}
                    selected={this.props.selectedSpecialities}
                    togglePill={this.props.toggleSpeciality.bind(this)}
                />
                <button onClick={this.searchProceed.bind(this)} className="proceedBtn"> Proceed </button>
            </div>
        );
    }
}

export default SearchCriteriaView
