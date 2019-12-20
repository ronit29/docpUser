import React from 'react';
import { connect } from 'react-redux';

import { toggle404, mergeLABState, urlShortner, getLabs, toggleDiagnosisCriteria, getDiagnosisCriteriaResults, clearExtraTests, getFooterData, setLabSearchId, getLabSearchIdResults, selectSearchType, selectLabTimeSLot, getOfferList, toggleOPDCriteria, selectLabAppointmentType, resetPkgCompare, loadOPDInsurance, getTestCategoryList } from '../../actions/index.js'
import { opdSearchStateBuilder, labSearchStateBuilder } from '../../helpers/urltoState'
import SearchResultsView from '../../components/diagnosis/categoryTestResults/categoryTestResultsView.js'
import NotFoundView from '../../components/commons/notFound'
import Loader from '../../components/commons/Loader'
import ProfileHeader from '../../components/commons/DesktopProfileHeader'

class categoryTestResults extends React.Component {
    constructor(props) {
        super(props)
        this.state = {            
            data:null
        }
    }

    componentDidMount() {
        // this.props.loadOPDInsurance(this.props.selectedLocation)
        let searchUrl = null
        if (this.props.match.url.includes('-tpcp')) {
            searchUrl = this.props.match.url.toLowerCase()
        }
        let page = 1
        this.props.getTestCategoryList(null,page,false,searchUrl,(resp)=>{
            if(resp){
                this.setState({data:resp})
            }
        })
    }

    render() {

        if(this.state.data){
            return (
                <SearchResultsView {...this.props} labList={this.state.data} />
            );
        }else{
            return (
                <div className="profile-body-wrap">
                <ProfileHeader showPackageStrip={true}/>
                <Loader />
            </div>
                )
        }
    }
}

const mapStateToProps = (state, passedProps) => {
    /**
     * initialServerData is server rendered async data required build html on server. 
     */
    let initialServerData = null
    let { staticContext } = passedProps
    if (staticContext && staticContext.data) {
        initialServerData = staticContext.data
    }

    const {
        selectedLocation,
        selectedCriterias,
        filterCriteria,
        LOADED_SEARCH_CRITERIA_LAB,
        locationType,
        fetchNewResults,
        corporateCoupon,
        page,
        search_id_data,
        nextSelectedCriterias,
        currentSearchedCriterias,
        nextFilterCriteria,
        compare_packages,
    } = state.SEARCH_CRITERIA_LABS

    const {
        offerList
    } = state.USER

    const LABS = state.LAB_SEARCH_DATA
    const { show404, labList, LOADED_LABS_SEARCH, count, SET_FROM_SERVER, curr_page, seoData, test_data } = state.LAB_SEARCH
    const { mergeUrlState, common_settings } = state.SEARCH_CRITERIA_OPD

    const {
        is_login_user_insured,
        insurance_status,
        device_info
    } = state.USER

    return {
        selectedLocation,
        selectedCriterias,
        filterCriteria,
        LOADED_SEARCH_CRITERIA_LAB,
        LABS,
        labList, LOADED_LABS_SEARCH,
        count,
        SET_FROM_SERVER,
        initialServerData,
        locationType,
        fetchNewResults,
        corporateCoupon,
        page,
        curr_page,
        search_id_data,
        nextSelectedCriterias,
        currentSearchedCriterias,
        nextFilterCriteria,
        seoData,
        mergeUrlState,
        test_data,
        show404,
        offerList,
        is_login_user_insured,
        compare_packages,
        insurance_status,
        device_info,
        common_settings
    }

}

const mapDispatchToProps = (dispatch) => {
    return {
        urlShortner: (url, cb) => dispatch(urlShortner(url, cb)),
        getTestCategoryList: (state, page, from_server, searchByUrl, cb) => dispatch(getTestCategoryList(state, page, from_server, searchByUrl, cb)),
        toggleDiagnosisCriteria: (type, criteria, forceAdd) => dispatch(toggleDiagnosisCriteria(type, criteria, forceAdd)),
        getDiagnosisCriteriaResults: (searchString, callback) => dispatch(getDiagnosisCriteriaResults(searchString, callback)),
        clearExtraTests: () => dispatch(clearExtraTests()),
        mergeLABState: (state, fetchNewResults) => dispatch(mergeLABState(state, fetchNewResults)),
        getFooterData: (url) => dispatch(getFooterData(url)),
        setLabSearchId: (searchId, filters, setDefault) => dispatch(setLabSearchId(searchId, filters, setDefault)),
        getLabSearchIdResults: (searchId, searchResults) => dispatch(getLabSearchIdResults(searchId, searchResults)),
        selectSearchType: (type) => dispatch(selectSearchType(type)),
        toggle404: (status) => dispatch(toggle404(status)),
        selectLabTimeSLot: (slot, reschedule) => dispatch(selectLabTimeSLot(slot, reschedule)),
        getOfferList: (lat,long) => dispatch(getOfferList(lat,long)),
        toggleOPDCriteria: (type, criteria, forceAdd, filter) => dispatch(toggleOPDCriteria(type, criteria, forceAdd, filter)),
        selectLabAppointmentType: (type) => dispatch(selectLabAppointmentType(type)),
        resetPkgCompare:() => dispatch(resetPkgCompare()),
        loadOPDInsurance: (city) => dispatch(loadOPDInsurance(city))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(categoryTestResults);
