import React from 'react';
import { connect } from 'react-redux';

import { mergeOPDState, resetFilters, getOPDCriteriaResults, toggleOPDCriteria, loadOPDCommonCriteria, cloneCommonSelectedCriterias, mergeLABState, clearAllTests, loadLabCommonCriterias, toggleDiagnosisCriteria, getDiagnosisCriteriaResults, clearExtraTests, selectSearchType, filterSelectedCriteria, getElasticCriteriaResults } from '../../actions/index.js'

import SearchView from '../../components/commons/search'
import SearchElasticView from '../../components/commons/searchElastic'
import CONFIG from '../../config'

class Search extends React.Component {
    constructor(props) {
        super(props)
    }

    changeSelection(which) {
        this.props.selectSearchType(which)
    }

    componentDidMount() {
        //opd
        this.props.loadOPDCommonCriteria()
        this.props.resetFilters()
        // lab
        this.props.loadLabCommonCriterias()
        // this.props.clearExtraTests()
    }

    static contextTypes = {
        router: () => null
    }

    render() {

        if(CONFIG.SEARCH_ELASTIC_VIEW){
            return (
                <SearchElasticView {...this.props} dataState = {this.props.selectedSearchType == 'opd' || this.props.selectedSearchType == 'procedures' ?this.props.OPD_STATE:this.props.LAB_STATE} selected={this.props.selectedSearchType} changeSelection={this.changeSelection.bind(this)} />
                )

        }else{

            if (this.props.selectedSearchType == 'opd') {
                return (
                    <SearchView {...this.props} {...this.props.OPD_STATE} selected={this.props.selectedSearchType} changeSelection={this.changeSelection.bind(this)} />
                );
            }

            if (this.props.selectedSearchType == 'lab') {
                return (
                    <SearchView {...this.props} {...this.props.LAB_STATE} selected={this.props.selectedSearchType} changeSelection={this.changeSelection.bind(this)} />
                );
            }

            if (this.props.selectedSearchType == 'procedures') {
                return (
                    <SearchView {...this.props} {...this.props.OPD_STATE} selected={this.props.selectedSearchType} changeSelection={this.changeSelection.bind(this)} />
                );
            }

        }

    }
}

const mapStateToProps = (state) => {
    let OPD_STATE = (() => {
        const {
            LOADED_SEARCH_CRITERIA_OPD,
            specializations,
            conditions,
            selectedCriterias,
            selectedLocation,
            filterCriteria,
            locationType,
            procedure_categories
        } = state.SEARCH_CRITERIA_OPD

        return {
            LOADED_SEARCH_CRITERIA_OPD,
            specializations,
            conditions,
            selectedCriterias,
            selectedLocation,
            filterCriteria,
            locationType,
            procedure_categories
        }
    })()

    let LAB_STATE = (() => {
        const {
            LOADED_SEARCH_CRITERIA_LAB,
            common_tests,
            common_conditions,
            preferred_labs,
            selectedCriterias,
            selectedLocation,
            filterCriteria,
            locationType
        } = state.SEARCH_CRITERIA_LABS

        return {
            LOADED_SEARCH_CRITERIA_LAB,
            common_tests,
            common_conditions,
            preferred_labs,
            selectedCriterias,
            selectedLocation,
            filterCriteria,
            locationType
        }
    })()

    let { selectedSearchType } = state.USER

    return { OPD_STATE, LAB_STATE, selectedSearchType }

}

const mapDispatchToProps = (dispatch) => {
    return {
        // opd
        loadOPDCommonCriteria: () => dispatch(loadOPDCommonCriteria()),
        toggleOPDCriteria: (type, criteria) => dispatch(toggleOPDCriteria(type, criteria)),
        getOPDCriteriaResults: (searchString, callback) => dispatch(getOPDCriteriaResults(searchString, callback)),
        resetFilters: () => dispatch(resetFilters()),
        mergeOPDState: (state, fetchNewResults) => dispatch(mergeOPDState(state, fetchNewResults)),
        cloneCommonSelectedCriterias: (selectedCriterias) => dispatch(cloneCommonSelectedCriterias(selectedCriterias)),
        filterSelectedCriteria: (type) => dispatch(filterSelectedCriteria(type)),
        //lab
        loadLabCommonCriterias: () => dispatch(loadLabCommonCriterias()),
        toggleDiagnosisCriteria: (type, criteria) => dispatch(toggleDiagnosisCriteria(type, criteria)),
        getDiagnosisCriteriaResults: (searchString, callback) => dispatch(getDiagnosisCriteriaResults(searchString, callback)),
        clearExtraTests: () => dispatch(clearExtraTests()),
        clearAllTests: () => dispatch(clearAllTests()),
        mergeLABState: (state, fetchNewResults) => dispatch(mergeLABState(state, fetchNewResults)),
        selectSearchType: (type) => dispatch(selectSearchType(type)),
        getElasticCriteriaResults: (searchString, callback) => dispatch(getElasticCriteriaResults(searchString, callback))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Search);
