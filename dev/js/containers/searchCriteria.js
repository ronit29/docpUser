import React from 'react';
import { connect } from 'react-redux';

import { toggleCondition, toggleSpeciality } from '../actions/index.js'
import CommonlySearched from '../components/commons/commonlySearched/index.js'

class SearchCriteria extends React.Component {
    constructor(props) {
        super(props)
    }
    
    render() {

        return (
            <div className="searchCriteria">
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
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    
    const {
        commonlySearchedConditions,
        selectedConditions,
        commonlySearchedSpecialities,
        selectedSpecialities
    } = state.SEARCH_CRITERIA

    return {
        commonlySearchedConditions,
        selectedConditions,
        commonlySearchedSpecialities,
        selectedSpecialities
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        toggleCondition : (id) => dispatch(toggleCondition(id)),
        toggleSpeciality : (id) => dispatch(toggleSpeciality(id))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(SearchCriteria);
