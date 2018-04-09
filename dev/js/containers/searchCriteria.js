import React from 'react';
import { connect } from 'react-redux';

import { toggleCondition, toggleSpeciality } from '../actions/index.js'
import CommonlySearched from '../components/commons/commonlySearched/index.js'
import LocationSelector from '../components/commons/locationSelector/index.js'
import CriteriaSelector from '../components/commons/criteriaSelector/index.js'

class SearchCriteria extends React.Component {
    constructor(props) {
        super(props)
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
                    toggleCondition={this.props.toggleCondition.bind(this)}
                    toggleSpeciality={this.props.toggleSpeciality.bind(this)}
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
                <button onClick={() => {
                    this.context.router.history.push('/searchresults')
                }} className="proceedBtn"> Proceed </button>
            </div>
        );
    }
}

const mapStateToProps = (state) => {

    const {
        commonlySearchedConditions,
        selectedConditions,
        commonlySearchedSpecialities,
        selectedSpecialities,
        selectedLocation
    } = state.SEARCH_CRITERIA

    return {
        commonlySearchedConditions,
        selectedConditions,
        commonlySearchedSpecialities,
        selectedSpecialities,
        selectedLocation
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        toggleCondition: (id) => dispatch(toggleCondition(id)),
        toggleSpeciality: (id) => dispatch(toggleSpeciality(id))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(SearchCriteria);
