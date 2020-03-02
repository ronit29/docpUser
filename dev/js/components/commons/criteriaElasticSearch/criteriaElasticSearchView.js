import React from 'react';
import Loader from '../../commons/Loader'

import LeftBar from '../LeftBar'
import RightBar from '../RightBar'
import ProfileHeader from '../DesktopProfileHeader'
import GTM from '../../../helpers/gtm.js'
import LocationElements from '../../../containers/commons/locationElements'
import InitialsPicture from '../initialsPicture'
import PrescriptionUpload from '../../../containers/commons/PrescriptionUpload.js'

const debouncer = (fn, delay) => {
    let timer = null
    return function () {
        clearTimeout(timer)
        timer = setTimeout(() => {
            fn.call(this)
        }, delay)
    }
}


class CriteriaElasticSearchView extends React.Component {
    constructor(props) {
        super(props)
        
        this.state = {
            searchValue: '',
            searchResults: [],
            loading: false,
            searchCities: [],
            currentTestType: {},
            type: '',
            visibleType: '',
            is_user_insurance_active: false,
            showPrescriptionInsuranceError: false
        }
    }

    componentDidMount() {
        this.getSearchResults = debouncer(this.getSearchResults.bind(this), 200)
        let input = document.getElementById('topCriteriaSearch')
        if (window) {
            window.scroll(0, 0)
        }

        let user_insurance_status = null
        if (this.props.defaultProfile && this.props.profiles && this.props.profiles[this.props.defaultProfile]) {
            user_insurance_status = this.props.profiles[this.props.defaultProfile].insurance_status
        }
        user_insurance_status = (user_insurance_status==1 || user_insurance_status==5 || user_insurance_status==4 || user_insurance_status==7)
        this.setState({is_user_insurance_active: user_insurance_status})

        // if coming back or refresh focus on search bar
        if (this.props.history.action === 'POP' && !this.props.location.search.includes('search')) {
            // input.focus()
        }
        if (document.getElementById('topCriteriaSearch')) {
            document.getElementById('topCriteriaSearch').addEventListener('focusin', () => { this.setState({ searchCities: '' }) })

        }

        if (document.getElementById('search_results_view') && document.getElementById('search_bar')) {
            document.getElementById('search_bar').addEventListener('focusin', () => {
                document.getElementById('search_results_view').scrollIntoView()
            })
        }
        this.selectSearchType(this.props.type)
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.type != nextProps.type) {

            if (nextProps.elasticSearchString) {
                this.setState({ searchValue: nextProps.elasticSearchString, searchResults: [] })
                this.getSearchResults()
            } else {
                this.setState({ searchValue: '', searchResults: [] })
            }
        }
    }

    inputHandler(e) {
        this.setState({ searchValue: e.target.value })
        let searchString = e.target.value.trim()
        if (searchString.length) {
            this.getSearchResults()
            this.props.toggleFixedMobileFooter(false)
        } else {
            this.setState({ searchResults: [] })
            this.props.toggleFixedMobileFooter(true)
        }
    }

    selectSearchType(type){
        if (this.textInput) {
            this.textInput.focus()
        }
        if (this.textInput_desktop) {
            this.textInput_desktop.focus()
        }
        
        this.props.changeSelection(type,'')
    }

    getSearchResults() {
        this.setState({ loading: true })
        let lat = 28.644800
        let long = 77.216721
        let place_id = ""

        if (this.props.dataState.selectedLocation) {
            place_id = this.props.dataState.selectedLocation.place_id || ""
            lat = this.props.dataState.selectedLocation.geometry.location.lat
            long = this.props.dataState.selectedLocation.geometry.location.lng
            if (typeof lat === 'function') lat = lat()
            if (typeof long === 'function') long = long()

            lat = parseFloat(parseFloat(lat).toFixed(6))
            long = parseFloat(parseFloat(long).toFixed(6))
        }

        let location = { lat: lat, long: long }

        let LAB_TYPES = ['lab_test_synonym', 'lab_test', 'lab']

        let OPD_TYPES = ['visit_reason', 'practice_specialization', 'doctor', 'hospital', 'practice_specialization_synonym']

        let PROCEDURE_TYPES = ['procedure_category', 'procedure']

        let IPD_TYPES = ['ipd']

        let type = ''
        let visibleType = ''
        let filterResults = this.props.getElasticCriteriaResults(this.state.searchValue.trim(), this.props.type.includes('package') ? 'test' : this.props.type, location)

        let allSearchResults = this.props.getElasticCriteriaResults(this.state.searchValue.trim(), '', location)

        Promise.all([filterResults, allSearchResults]).then(([filterSearchResults, searchResults]) => {

            if (searchResults && searchResults.suggestion && searchResults.suggestion.length) {

                if (LAB_TYPES.indexOf(searchResults.suggestion[0].type) > -1 && this.props.type != 'lab') {

                    type = 'lab'
                    visibleType = searchResults.suggestion[0]
                } else if (OPD_TYPES.indexOf(searchResults.suggestion[0].type) > -1 && this.props.type != 'opd') {

                    type = 'opd'
                    visibleType = searchResults.suggestion[0]
                } else if (IPD_TYPES.indexOf(searchResults.suggestion[0].type) > -1 && this.props.type != 'ipd') {
                    type = 'ipd'
                    visibleType = searchResults.suggestion[0]
                }

                /*else if(PROCEDURE_TYPES.indexOf(searchResults.suggestion[0].type)>-1 && this.props.type !='procedures'){

                    type = 'procedures'
                    visibleType = searchResults.suggestion[0]
                }*/

            }
            if (filterSearchResults) {

                let filterResultsName = filterSearchResults.suggestion.map(x => x.name).join(',') || ''
                let gtmData = {
                    'Category': 'ConsumerApp', 'Action': 'searchquery', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'search-query', 'searchString': this.state.searchValue,
                    'searchType': this.props.type, 'results': filterResultsName
                }
                GTM.sendEvent({ data: gtmData })
                let filterData = filterSearchResults.suggestion
                // if (this.props.type.includes('package')) {
                //     filterData = filterSearchResults.suggestion.filter((x) => {
                //         if (x.is_package && x.is_package.length && x.is_package[0]) {
                //             return true
                //         }
                //         return false
                //     })
                // } else if (this.props.type.includes('lab')) {
                //     filterData = filterSearchResults.suggestion.filter((x) => {
                //         if (x.is_package && x.is_package.length && !x.is_package[0]) {
                //             return true
                //         }
                //         return false
                //     })
                // }
                this.setState({ searchResults: filterData, searchedCategories: filterSearchResults.suggestedCategories, loading: false, type: type, visibleType: visibleType })
            }

        })
    }

    addCriteria(criteria) {

        criteria = Object.assign({}, criteria)

        if (this.props.type == 'opd' || this.props.type == 'procedures') {

            let action = '', event = ''

            if (criteria.type.includes('visit_reason')) {

                let data = {
                    'Category': 'ConsumerApp', 'Action': 'VisitReasonSearched', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'visit-reason-searched', 'SelectedId': criteria.id || '', 'searched': 'autosuggest', 'searchString': this.state.searchValue
                }
                GTM.sendEvent({ data: data })

                criteria.id = criteria.action.value.join(',')
                criteria.type = 'speciality'

            }

            else if (criteria.action.param.includes('hospital_name')) {
                let data = {
                    'Category': 'ConsumerApp', 'Action': 'HospitalNameSearched', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'hospital-name-searched', 'hospitalId': criteria.action.id || '', 'searched': 'autosuggest', 'searchString': this.state.searchValue || ''
                }
                GTM.sendEvent({ data: data })

                this.props.searchProceed("", "", criteria.action.id)
                return

            } else if (criteria.action.param.includes('procedure_category_ids')) {

                criteria.id = criteria.action.value[0]
                criteria.type = 'procedures_category'

            } else if (criteria.action.param.includes('procedure_ids')) {
                let data = {
                    'Category': 'ConsumerApp', 'Action': 'CommonProceduresSelected', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'common-procedures-selected', 'selected': criteria.name || '', 'selectedId': criteria.action.value ? criteria.action.value[0] : '', 'searched': 'autosuggest', 'searchString': this.state.searchValue
                }
                GTM.sendEvent({ data: data })

                criteria.id = criteria.action.value[0]
                criteria.type = 'procedures'

            } else if (criteria.action.param.includes('specializations')) {
                let data = {
                    'Category': 'ConsumerApp', 'Action': 'CommonSpecializationsSelected', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'common-specializations-selected', 'selected': criteria.name || '', 'selectedId': criteria.action.value ? criteria.action.value[0] : '', 'searched': 'autosuggest', 'searchString': this.state.searchValue
                }
                GTM.sendEvent({ data: data })

                criteria.id = criteria.action.value[0]
                criteria.type = 'speciality'

            } else if (criteria.action.param.includes('doctor_name')) {

                let data = {
                    'Category': 'ConsumerApp', 'Action': 'DoctorNameSearched', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'doctor-name-searched', 'selectedId': criteria.action.value[0] || '', 'searched': 'autosuggest', 'searchString': this.state.searchValue || ''
                }
                GTM.sendEvent({ data: data })

                this.props.history.push(`/opd/doctor/${criteria.action.value[0]}?hide_search_data=true`)

                //this.props.searchProceed(criteria.action.value[0],"")
                return

            }


            this.props.cloneCommonSelectedCriterias(criteria)
            this.setState({ searchValue: "" })
            this.props.showResults('opd')

        } else if (this.props.type.includes('ipd')) {
            let data = {
                'Category': 'ConsumerApp', 'Action': 'IPDNameSearched', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'ipd-name-searched', 'selectedId': criteria.action.value[0] || '', 'searched': 'autosuggest', 'searchString': this.state.searchValue || ''
            }
            GTM.sendEvent({ data: data })
            let ipdData = Object.assign({}, criteria)
            ipdData.id = criteria.action.value[0]
            ipdData.url = null
            this.props.toggleIpd('ipd', ipdData, this.state.searchValue)

        } else {

            if (criteria.type == "lab") {
                this.props.clearExtraTests()
                let data = {
                    'Category': 'ConsumerApp', 'Action': 'LabNameSearched', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'lab-name-searched', 'selectedId': criteria.action.value[0] || '', 'searched': 'autosuggest', 'searchString': this.state.searchValue || ''
                }
                GTM.sendEvent({ data: data })

                this.props.history.push(`/lab/${criteria.action.value[0]}`)
                return
            } else if (criteria.type == "lab_test") {
                criteria.type = 'test'
                criteria.url = ''
                criteria.id = criteria.action.value[0]
                if (criteria.action.test_type && criteria.action.test_type.length) {
                    criteria.test_type = criteria.action.test_type[0]
                } else {
                    criteria.test_type = ''
                }
                this.setState({ searchValue: "" })

                if(criteria.is_package && criteria.is_package[0]){
                    this.props.togglePackages('test', criteria, this.state.searchValue)
                }else{
                    this.props.toggleLabTests('test', criteria, this.state.searchValue)
                }
                
                // if (!criteria.is_package[0]) {

                // }

                // else {
                //     criteria.type = 'package'//package
                //     criteria.id = criteria.action.value[0]
                //     this.setState({ searchValue: "" })
                //     this.props.toggleSearchPackages(criteria)
                // }

                /*let data = {
                    'Category': 'ConsumerApp', 'Action': 'TestSelected', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'test-selected', 'selected': criteria.name || '', 'selectedId': criteria.action.value || '', 'searched': 'autosuggest', 'searchString': this.state.searchValue
                }
                GTM.sendEvent({ data: data })

                let selectedTestIds = []
                this.props.dataState.selectedCriterias.map((x) => {
                    if (x.test_type) {
                        selectedTestIds.push(x.test_type)
                    }
                })
                if (selectedTestIds.length && criteria.action.test_type && criteria.action.test_type.length) {
                    if (selectedTestIds.indexOf(criteria.action.test_type[0]) == -1) {
                        this.setState({ currentTestType: criteria, searchValue: "" })
                        let data = {
                            'Category': 'ConsumerApp', 'Action': 'PopUpOpenLabTestError', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'popup-open-lab-test-error', 'selected': criteria.name || '', 'selectedId': criteria.action.value || '', 'searched': 'autosuggest', 'searchString': this.state.searchValue
                        }
                        GTM.sendEvent({ data: data })
                        return
                    }
                }
            }
            if (document.getElementById('search_results_view')) {
                document.getElementById('search_results_view').scrollIntoView()
            }
            this.props.toggleDiagnosisCriteria('test', criteria)*/
            }
        }
    }

    getCityListLayout(searchResults = []) {
        if (searchResults.length) {
            this.setState({ searchCities: searchResults })
        } else {
            this.setState({ searchCities: [], searchValue: '' })
        }
    }

    selectLocation(city) {
        this.child.selectLocation((city), () => {
            this.setState({ searchCities: [] })
        })
    }

    focusOut() {
        let data = {
            'Category': 'ConsumerApp', 'Action': 'searchInputFocusOut', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'search-string-on-blur', 'searched': '', 'searchString': this.state.searchValue, 'type': this.props.type
        }
        GTM.sendEvent({ data: data })
    }

    afterUserLogin = ()=>{
        let is_user_insurance_active = false;
        let user_insurance_status = null;
        if (this.props.defaultProfile && this.props.profiles && this.props.profiles[this.props.defaultProfile]) {
            user_insurance_status = this.props.profiles[this.props.defaultProfile].insurance_status
        }
        is_user_insurance_active = (user_insurance_status==1 || user_insurance_status==5 || user_insurance_status==4 || user_insurance_status==7)
        //this.setState({is_user_insurance_active: true, showPrescriptionInsuranceError: true})
        if(is_user_insurance_active){
            this.setState({is_user_insurance_active: true, showPrescriptionInsuranceError: true})
        }
    }

    render() {
        //Check user for insurance 
        let user_insurance_status = null
        if (this.props.defaultProfile && this.props.profiles && this.props.profiles[this.props.defaultProfile]) {
            user_insurance_status = this.props.profiles[this.props.defaultProfile].insurance_status
        }

        return (
            <div className="profile-body-wrap">
                {
                    this.props.hideHeaderOnMobile ? <div className="hide-762"><ProfileHeader showSearch={true} /></div> : <ProfileHeader showSearch={true} />
                }

                <section className={"container parent-section book-appointment-section" + (this.props.hideHeaderOnMobile ? " mp0" : "")}>
                    <div className="row main-row parent-section-row">
                        <LeftBar />

                        <div className="vip-new-container center-column pt-0">
                            <img className="search-back-main-ico" src={ASSETS_BASE_URL + "/img/customer-icons/back-icon.png"} onClick={()=> this.props.history.goBack()}/>
                            {
                                // goback decides if search bar will be shown
                                this.props.goBack ? "" :
                                    <div className="widget mb-3">
                                        <div className="search-top-container">
                                            {/* <p className="srch-heading">Search</p> */}
                                            <div className="serch-nw-inputs-container">

                                                {
                                                    this.props.selected == 'lab' && this.state.showPrescriptionInsuranceError?
                                                    <div className="health-advisor-col d-flex align-items-start mb-2">
                                                        <img width="17" className="info-detail-icon" src={ASSETS_BASE_URL + "/img/info-icon.svg"} />
                                                        <p className="ml-2"> For insured customers, prescription upload is required at the time of booking</p>
                                                        <img className="cursor-pntr" width="15" src={ASSETS_BASE_URL + "/img/red-times-icon.svg"} onClick={ ()=>this.setState({showPrescriptionInsuranceError: false}) } />
                                                    </div>:''

                                                }

                                                <LocationElements {...this.props} onRef={ref => (this.child = ref)} getCityListLayout={this.getCityListLayout.bind(this)} resultType='search' fromCriteria={true} commonSearchPage={true} />
                                                {
                                                    this.state.searchCities.length > 0 ? "" : <div>
                                                        <div className="srch-radio-btns ipd-srch-radio-btn" id="search_results_view">
                                                            <div className="dtl-radio">
                                                                <label className="container-radio">Doctor
                                                                <input type="radio" onChange={this.selectSearchType.bind(this, 'opd')} checked={this.props.selected == 'opd'} name="radio" />
                                                                    <span className="doc-checkmark"></span>
                                                                </label>
                                                            </div>
                                                            <div className="dtl-radio">
                                                                <label className="container-radio">Lab Test
                                                                <input type="radio" onChange={this.selectSearchType.bind(this, 'lab')} checked={this.props.selected == 'lab'} name="radio" />
                                                                    <span className="doc-checkmark"></span>
                                                                </label>
                                                            </div>
                                                            {/* 
                                                            <div className="dtl-radio">
                                                                <label className="container-radio">Health Packages
                                                                <input type="radio" onChange={this.props.changeSelection.bind(this, 'package', '')} checked={this.props.selected == 'package'} name="radio" />
                                                                    <span className="doc-checkmark"></span>
                                                                </label>
                                                            </div>
                                                            */}
                                                            {/* 
                                                            <div className="dtl-radio">
                                                                <label className="container-radio">Surgery
                                                                <input type="radio" onChange={this.selectSearchType.bind(this, 'ipd')} checked={this.props.selected == 'ipd'} name="radio" />
                                                                    <span className="doc-checkmark"></span>
                                                                </label>
                                                            </div> 
                                                            */}
                                                        </div>
                                                        <div className="serch-nw-inputs mb-0">
                                                            <input type="text" autoComplete="off" className="d-block d-lg-none new-srch-doc-lab" id="search_bar" onChange={this.inputHandler.bind(this)} value={this.state.searchValue} placeholder={this.props.title} onClick={() => {
                                                                if (this.props.goBack) {
                                                                    this.props.history.go(-1)
                                                                }
                                                            }} onBlur={() => this.focusOut()} 
                                                            ref={(input) => {this.textInput = input }}/>
                                                            <input type="text" autoComplete="off" className="d-none d-lg-block new-srch-doc-lab" id="search_bar_desktop" onChange={this.inputHandler.bind(this)} value={this.state.searchValue} placeholder={this.props.title} onClick={() => {
                                                                if (this.props.goBack) {
                                                                    this.props.history.go(-1)
                                                                }
                                                            }} onBlur={() => this.focusOut()} 
                                                            />
                                                            <img style={{ width: '15px' }} className="srch-inp-img" src={ASSETS_BASE_URL + "/img/shape-srch.svg"} />
                                                        </div>
                                                    </div>
                                                }
                                            </div>
                                        </div>
                                    </div>
                            }
                            {
                                this.props.selected == 'lab' && !(this.state.is_user_insurance_active)?
                                <PrescriptionUpload historyObj={this.props.history} search_lab={true} locationObj = {this.props.location} profiles={this.props.profiles} afterUserLogin={this.afterUserLogin} />
                                :''
                            }
                            {
                                this.state.searchCities.length > 0 ?
                                    <section>
                                        <div className="widget searchMargin">
                                            <div className="common-search-container pt-0">
                                                {/* <p className="srch-heading">Location Search</p> */}
                                                <div className="common-listing-cont">
                                                    <ul>
                                                        {
                                                            this.state.searchCities.map((result, i) => {
                                                                return <li key={i} onClick={this.selectLocation.bind(this, result)}>
                                                                    <p className="" >{result.description}</p>
                                                                </li>
                                                            })
                                                        }
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </section> : ''
                            }
                            {
                                this.state.searchCities.length > 0 ? "" : <div>
                                    {
                                        this.state.searchValue || Object.values(this.state.currentTestType).length ?

                                            <section>
                                                {
                                                    this.state.searchResults.length || this.state.searchValue ?
                                                        <div className="widget searchMargin" >
                                                            <div className="common-search-container">
                                                                {/* <p className="srch-heading">Search Results</p> */}
                                                                {
                                                                    !this.state.searchCities.length && this.state.type && (this.state.searchValue || Object.values(this.state.currentTestType).length) ?
                                                                        <div style={{ cursor: 'pointer' }} onClick={() => {

                                                                            let data = {
                                                                                'Category': 'ConsumerApp', 'Action': 'ChangeTypeClicked', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'change-type-clicked', 'hospitalId': '', 'searched': '', 'searchString': this.state.searchValue || ''
                                                                            }
                                                                            GTM.sendEvent({ data: data })

                                                                            this.props.changeSelection(this.state.type, this.state.visibleType.name || '')
                                                                        }}>
                                                                            <p className="p-0 srch-prnsl-txt" >Did you mean: <span className="search-prnsl-rslts">{this.state.visibleType.name || ''}</span> in <span className="fw-700">{this.state.visibleType.visible_name}</span></p>
                                                                        </div>
                                                                        : ''
                                                                }
                                                                {/*<p className="srch-heading">{cat.name}</p>*/}
                                                                <div className="common-listing-cont">
                                                                    <ul>

                                                                        {
                                                                            this.state.searchResults.map((cat, j) => {
                                                                                return <li key={j} onClick={this.addCriteria.bind(this, cat)}>
                                                                                    <div className="serach-rslt-with-img">
                                                                                        {
                                                                                            cat.type && cat.type.includes('doctor') ?
                                                                                                /*<span className="srch-rslt-wd-span usr-srch-img">
                                                                                                    <img style={{ width: '35px', borderRadius: '50%' }} className="" src={`https://cdn.docprime.com/media/${cat.image_path}`} />
                                                                                                </span>*/
                                                                                                <InitialsPicture name={cat.name} has_image={!!cat.image_path} className="elasticInitalPic initialsPicture-ds fltr-initialPicture-ds">
                                                                                                    <span className="srch-rslt-wd-span usr-srch-img">
                                                                                                        <img style={{ width: '35px', height: '35px', borderRadius: '50%' }} className="" src={`https://cdn.docprime.com/media/${cat.image_path}`} alt={cat.name} title={cat.name} />
                                                                                                    </span>

                                                                                                </InitialsPicture>
                                                                                                : <span className="srch-rslt-wd-span text-center srch-img">
                                                                                                    <img style={{ width: '22px', margin: '0px 10px' }} className="" src={ASSETS_BASE_URL + "/img/shape-srch.svg"} />
                                                                                                </span>
                                                                                        }


                                                                                        <p style={{ padding: '0 50px 0 0' }} >
                                                                                            {cat.name}
                                                                                            {
                                                                                                this.props.type.includes('ipd')
                                                                                                    ? <span className="search-span-sub">IPD Procedures</span>
                                                                                                    : cat.is_package && cat.is_package.length && cat.is_package[0] ?
                                                                                                        <span className="search-span-sub">Health Package {cat.number_of_tests && cat.number_of_tests.length && cat.number_of_tests[0] ? ` | ${cat.number_of_tests[0]} Test Included` : ''}</span>
                                                                                                        : cat.type == "hospital"
                                                                                                            ? <span className="search-span-sub">{cat.locality && Array.isArray(cat.locality) ? cat.locality.join(', ') : cat.visible_name}</span>
                                                                                                            : <span className="search-span-sub">{cat.type.includes('doctor') && cat.primary_name && Array.isArray(cat.primary_name) ? cat.primary_name.slice(0, 2).join(', ') : cat.visible_name}</span>
                                                                                            }
                                                                                        </p>
                                                                                    </div>
                                                                                    {
                                                                                        cat.popularity && cat.popularity >= 5000 ?
                                                                                            <div className="popular-txt">
                                                                                                <span className="fw-500">Popular</span>
                                                                                            </div> : ''
                                                                                    }
                                                                                    {
                                                                                        cat.name && cat.name.includes('Aarogyam C') ?
                                                                                            <div className="popular-txt">
                                                                                                <span className="fw-500">Popular</span>
                                                                                            </div> : ''
                                                                                    }
                                                                                </li>
                                                                            })
                                                                        }
                                                                        {
                                                                            (this.state.searchValue.length > 2 && (this.props.type == 'opd' || this.props.type == 'procedures'))
                                                                                ? <li onClick={() => {

                                                                                    let data = {
                                                                                        'Category': 'ConsumerApp', 'Action': 'DoctorNameSearched', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'doctor-name-searched', 'selectedId': '', 'searched': '', 'searchString': this.state.searchValue || ''
                                                                                    }
                                                                                    GTM.sendEvent({ data: data })

                                                                                    this.props.searchProceed(this.state.searchValue, "")
                                                                                }}>
                                                                                    <div className="serach-rslt-with-img">
                                                                                        <span className="srch-rslt-wd-span text-center srch-img">
                                                                                            <img style={{ width: '20px', margin: '0px 10px' }} className="" src={ASSETS_BASE_URL + "/img/shape-srch.svg"} />
                                                                                        </span>
                                                                                        <p className="p-0" >Search all Doctors with name :<span className="search-el-code-bold">{this.state.searchValue}</span></p>
                                                                                    </div>
                                                                                </li>
                                                                                : (this.state.searchValue.length > 2 && this.props.type.includes('lab'))
                                                                                    ? <li onClick={() => {

                                                                                        let data = {
                                                                                            'Category': 'ConsumerApp', 'Action': 'LabNameSearched', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'lab-name-searched', 'selectedId': '', 'searched': '', 'searchString': this.state.searchValue || ''
                                                                                        }
                                                                                        GTM.sendEvent({ data: data })

                                                                                        this.props.searchProceed(this.state.searchValue)
                                                                                    }}>
                                                                                        <div className="serach-rslt-with-img">
                                                                                            <span className="srch-rslt-wd-span text-center srch-img">
                                                                                                <img style={{ width: '22px', margin: '0px 10px' }} className="" src={ASSETS_BASE_URL + "/img/shape-srch.svg"} />
                                                                                            </span>
                                                                                            <p className="p-0" >Search all Labs with name :<span className="search-el-code-bold">{this.state.searchValue}</span></p>
                                                                                        </div>
                                                                                    </li>
                                                                                    : (this.state.searchValue.length > 2 && (this.props.type == 'package'))
                                                                                        ? <li onClick={() => {

                                                                                            let data = {
                                                                                                'Category': 'ConsumerApp', 'Action': 'PackageNameSearched', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'package-name-searched', 'selectedId': '', 'searched': '', 'searchString': this.state.searchValue || ''
                                                                                            }
                                                                                            GTM.sendEvent({ data: data })

                                                                                            this.props.searchProceed(this.state.searchValue)
                                                                                        }}>
                                                                                            <div className="serach-rslt-with-img">
                                                                                                <span className="srch-rslt-wd-span text-center srch-img">
                                                                                                    <img style={{ width: '22px', margin: '0px 10px' }} className="" src={ASSETS_BASE_URL + "/img/shape-srch.svg"} />
                                                                                                </span>
                                                                                                <p className="p-0" >Search all Packages with name :<span className="search-el-code-bold">{this.state.searchValue}</span></p>
                                                                                            </div>
                                                                                        </li> : ''
                                                                        }
                                                                        {
                                                                            (this.state.searchValue.length > 2 && (this.props.type == 'opd' || this.props.type == 'procedures'))
                                                                                ? <li onClick={() => {

                                                                                    let data = {
                                                                                        'Category': 'ConsumerApp', 'Action': 'HospitalNameSearched', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'hospital-name-searched', 'hospitalId': '', 'searched': '', 'searchString': this.state.searchValue || ''
                                                                                    }
                                                                                    GTM.sendEvent({ data: data })

                                                                                    this.props.searchProceed("", this.state.searchValue)
                                                                                }}>
                                                                                    <div className="serach-rslt-with-img">
                                                                                        <span className="srch-rslt-wd-span text-center srch-img">
                                                                                            <img style={{ width: '20px', margin: '0px 10px' }} className="" src={ASSETS_BASE_URL + "/img/shape-srch.svg"} />
                                                                                        </span>
                                                                                        <p className="p-0" >Search all Hospitals with name :<span className="search-el-code-bold">{this.state.searchValue}</span></p>
                                                                                    </div>
                                                                                </li> : ''
                                                                        }
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        : ''
                                                }

                                            </section>
                                            : (this.props.checkForLoad ? this.props.children : <Loader />)
                                    }
                                </div>
                            }


                        </div>
                        {
                            this.props.clinic_card || this.props.lab_card || this.props.searchElasticView ? '' : <RightBar extraClass=" chat-float-btn-2" newChatBtn={this.props.newChatBtn} msgTemplate="gold_general_template"/>
                        }
                    </div>
                </section>
            </div>
        );
    }
}


export default CriteriaElasticSearchView
