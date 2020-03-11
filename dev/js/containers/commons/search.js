import React from 'react';
import { connect } from 'react-redux';

import { mergeOPDState, resetFilters, getOPDCriteriaResults, toggleOPDCriteria, loadOPDCommonCriteria, cloneCommonSelectedCriterias, mergeLABState, clearAllTests, loadLabCommonCriterias, toggleDiagnosisCriteria, getDiagnosisCriteriaResults, clearExtraTests, selectSearchType, filterSelectedCriteria, getElasticCriteriaResults, setPackageId, toggleSearchPackages, toggleIPDCriteria, loadOPDInsurance } from '../../actions/index.js'

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
        let locality = ''
        let selectedLocation = null
        if(this.props.OPD_STATE && this.props.OPD_STATE.selectedLocation){
            locality = this.props.OPD_STATE.selectedLocation.locality||''
            selectedLocation = this.props.OPD_STATE.selectedLocation
        }
        this.props.loadOPDCommonCriteria(selectedLocation)
        this.props.resetFilters()
        // lab
        this.props.loadLabCommonCriterias()
        // this.props.loadOPDInsurance(selectedLocation)
        // this.props.clearExtraTests()
    }

    static contextTypes = {
        router: () => null
    }

    render() {

        if (CONFIG.SEARCH_ELASTIC_VIEW) {
            let dataState = ''
            
            if(this.props.selectedSearchType == 'opd' || this.props.selectedSearchType == 'procedures') {
                dataState = this.props.OPD_STATE
            
            }else if(this.props.selectedSearchType == 'ipd') {
                dataState = this.props.IPD_STATE
            
            }else{
                dataState = this.props.LAB_STATE
            } 

            return (
                <SearchElasticView {...this.props} dataState={dataState} selected={this.props.selectedSearchType} changeSelection={this.changeSelection.bind(this)} elasticSearchString={this.state.elasticSearchString} common_settings={this.props.OPD_STATE.common_settings}/>
            )

        } else {

            if (this.props.selectedSearchType == 'opd') {
                return (
                    <SearchView {...this.props} {...this.props.OPD_STATE} selected={this.props.selectedSearchType} changeSelection={this.changeSelection.bind(this)} common_settings={this.props.OPD_STATE.common_settings} />
                );
            }

            if (this.props.selectedSearchType == 'lab') {
                return (
                    <SearchView {...this.props} {...this.props.LAB_STATE} selected={this.props.selectedSearchType} changeSelection={this.changeSelection.bind(this)} common_settings={this.props.OPD_STATE.common_settings} />
                );
            }

            if (this.props.selectedSearchType == 'procedures') {
                return (
                    <SearchView {...this.props} {...this.props.OPD_STATE} selected={this.props.selectedSearchType} changeSelection={this.changeSelection.bind(this)} common_settings={this.props.OPD_STATE.common_settings}/>
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
            procedures,
            common_settings
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
            procedures,
            common_settings
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
            filterCriteriaPackages,
            selectedPackages
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
            filterCriteriaPackages,
            selectedPackages
        }
    })()

    let IPD_STATE = (() => {
        const {
            LOADED_SEARCH_CRITERIA_OPD,
            ipd_procedures,
            selectedLocation,
            locationType

        } = state.SEARCH_CRITERIA_OPD

        const {
            selectedCriterias
        } = state.SEARCH_CRITERIA_IPD

        return{
            LOADED_SEARCH_CRITERIA_OPD,
            ipd_procedures,
            selectedLocation,
            locationType,
            selectedCriterias
        }

    })()

    let { selectedSearchType, is_login_user_insured, profiles, defaultProfile } = state.USER

    return { OPD_STATE, LAB_STATE, selectedSearchType, IPD_STATE, is_login_user_insured, profiles, defaultProfile }

}

const mapDispatchToProps = (dispatch) => {
    return {
        // opd
        loadOPDCommonCriteria: (selectedLocation) => dispatch(loadOPDCommonCriteria(selectedLocation)),
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
        setPackageId: (package_id, isHomePage) => dispatch(setPackageId(package_id, isHomePage)),
        toggleSearchPackages: (healthPackage) => dispatch(toggleSearchPackages(healthPackage)),
        toggleIPDCriteria: (criteria, forceAdd) => dispatch(toggleIPDCriteria(criteria, forceAdd)),
        loadOPDInsurance: (city) => dispatch(loadOPDInsurance(city))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Search);
