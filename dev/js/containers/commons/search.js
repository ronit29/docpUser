import React from 'react';
import { connect } from 'react-redux';

import { mergeOPDState, resetFilters, getOPDCriteriaResults, toggleOPDCriteria, loadOPDCommonCriteria, cloneCommonSelectedCriterias, mergeLABState, clearAllTests, loadLabCommonCriterias, toggleDiagnosisCriteria, getDiagnosisCriteriaResults, clearExtraTests, selectSearchType, filterSelectedCriteria, getElasticCriteriaResults, setPackageId } from '../../actions/index.js'

import SearchView from '../../components/commons/search'
import SearchElasticView from '../../components/commons/searchElastic'
import CONFIG from '../../config'
import GTM from '../../helpers/gtm.js'

class Search extends React.Component {
    constructor(props) {
        super(props)
        this.state = { elasticSearchString: '' }
    }

    changeSelection(which, searchString = '') {
        let data = {
            'Category': 'ConsumerApp', 'Action': 'ToggleSearchType', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'toogle-search-type', 'type': which || ''
        }

        this.setState({ elasticSearchString: searchString })
        GTM.sendEvent({ data: data })
        this.props.selectSearchType(which)
    }

    componentDidMount() {
        if (window) {
            window.scroll(0, 0)
        }
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

        if (CONFIG.SEARCH_ELASTIC_VIEW) {
            return (
                <SearchElasticView {...this.props} dataState={this.props.selectedSearchType == 'opd' || this.props.selectedSearchType == 'procedures' ? this.props.OPD_STATE : this.props.LAB_STATE} selected={this.props.selectedSearchType} changeSelection={this.changeSelection.bind(this)} elasticSearchString={this.state.elasticSearchString} />
            )

        } else {

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
            procedure_categories,
            procedures
        } = state.SEARCH_CRITERIA_OPD

        return {
            LOADED_SEARCH_CRITERIA_OPD,
            specializations,
            conditions,
            selectedCriterias,
            selectedLocation,
            filterCriteria,
            locationType,
            procedure_categories,
            procedures
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
            locationType,
            common_package,
            filterCriteriaPackages
        } = state.SEARCH_CRITERIA_LABS

        return {
            LOADED_SEARCH_CRITERIA_LAB,
            common_tests,
            common_conditions,
            preferred_labs,
            selectedCriterias,
            selectedLocation,
            filterCriteria,
            locationType,
            common_package,
            filterCriteriaPackages
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
        toggleDiagnosisCriteria: (type, criteria, forceAdd) => dispatch(toggleDiagnosisCriteria(type, criteria, forceAdd)),
        getDiagnosisCriteriaResults: (searchString, callback) => dispatch(getDiagnosisCriteriaResults(searchString, callback)),
        clearExtraTests: () => dispatch(clearExtraTests()),
        clearAllTests: () => dispatch(clearAllTests()),
        mergeLABState: (state, fetchNewResults) => dispatch(mergeLABState(state, fetchNewResults)),
        selectSearchType: (type) => dispatch(selectSearchType(type)),
        getElasticCriteriaResults: (searchString, type, location, callback) => dispatch(getElasticCriteriaResults(searchString, type, location, callback)),
        // package
        setPackageId: (package_id) => dispatch(setPackageId(package_id))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Search);
