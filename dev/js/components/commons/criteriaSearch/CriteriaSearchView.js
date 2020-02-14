import React from 'react';
import Loader from '../../commons/Loader'

import LeftBar from '../LeftBar'
import RightBar from '../RightBar'
import ProfileHeader from '../DesktopProfileHeader'
import GTM from '../../../helpers/gtm.js'
import LocationElements from '../../../containers/commons/locationElements'
import FixedMobileFooter from '../Home/FixedMobileFooter';
import PackageCompareStrip from '../../diagnosis/searchPackages/packageCompare/packageCompareStrip.js'
import ScrollWidget from '../../../helpers/scrollHelper.js'


const debouncer = (fn, delay) => {
    let timer = null
    return function () {
        clearTimeout(timer)
        timer = setTimeout(() => {
            fn.call(this)
        }, delay)
    }
}


class CriteriaSearchView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            searchValue: '',
            searchResults: [],
            loading: false,
            searchCities: [],
            swipeDirection: ''
        }
    }

    componentDidMount() {

        this.getSearchResults = debouncer(this.getSearchResults.bind(this), 500)
        let input = document.getElementById('topCriteriaSearch')
        // if coming back or refresh focus on search bar
        if (this.props.history.action === 'POP' && !this.props.location.search.includes('search')) {
            // input.focus()
        }
        if (document.getElementById('topCriteriaSearch')) {
            document.getElementById('topCriteriaSearch').addEventListener('focusin', () => { this.setState({ searchCities: '' }) })
        }
    }

    getScrollView(scrollView){
        if(scrollView && scrollView.swipe) {
            //alert(scrollView.swipe)
            this.setState({swipeDirection:scrollView.swipe})
        }
    }

    inputHandler(e) {
        this.setState({ searchValue: e.target.value })
        this.getSearchResults()
    }

    getSearchResults() {
        this.setState({ loading: true })

        if (this.props.type == 'opd') {
            this.props.getOPDCriteriaResults(this.state.searchValue, (searchResults) => {
                if (searchResults) {
                    searchResults.conditions = searchResults.conditions.map(x => { return { ...x, type: 'condition' } })
                    searchResults.specializations = searchResults.specializations.map(x => { return { ...x, type: 'speciality' } })
                    searchResults.procedures = searchResults.procedures.map(x => { return { ...x, type: 'procedures' } }) || []

                    let results = []
                    if (this.props.selected == 'opd') {
                        results = [
                            {
                                title: 'Conditions',
                                values: searchResults.conditions
                            },
                            {
                                title: 'Specializations',
                                values: searchResults.specializations
                            }
                        ]
                    } else {
                        results = [
                            {
                                title: 'Procedures',
                                values: searchResults.procedures
                            }
                        ]
                    }
                    this.setState({ searchResults: [...results], loading: false })
                }
            })
        } else {
            this.props.getDiagnosisCriteriaResults(this.state.searchValue, (searchResults) => {
                if (searchResults) {
                    let tests = searchResults.tests.map(x => { return { ...x, type: 'test' } })
                    let results = [
                        {
                            title: 'Tests',
                            values: tests
                        }
                    ]
                    this.setState({ searchResults: results, loading: false })
                }
            })
        }
    }

    addCriteria(criteria, docType) {

        if (this.props.type == 'opd') {

            if (docType == 'Conditions') {
                let data = {
                    'Category': 'ConsumerApp', 'Action': 'CommonConditionSearched', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'common-condition-searched', 'selected': criteria.name || '', 'selectedId': criteria.id || ''
                }
                GTM.sendEvent({ data: data })
            } else if (docType == 'Specializations') {
                let data = {
                    'Category': 'ConsumerApp', 'Action': 'CommonSpecializationsSearched', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'common-specializations-searched', 'selected': criteria.name || '', 'selectedId': criteria.id || ''
                }
                GTM.sendEvent({ data: data })
            }
            else if (docType == 'Procedures') {
                let data = {
                    'Category': 'ConsumerApp', 'Action': 'CommonProceduresSearched', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'common-procedures-searched', 'selected': criteria.name || '', 'selectedId': criteria.id || ''
                }
                GTM.sendEvent({ data: data })
            }
            this.props.toggleOPDCriteria(criteria.type, criteria)
            this.setState({ searchValue: "" })
        } else {
            if (docType == 'Tests') {
                let data = {
                    'Category': 'ConsumerApp', 'Action': 'TestSearched', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'test-searched', 'selected': criteria.name || '', 'selectedId': criteria.id || ''
                }
                GTM.sendEvent({ data: data })
            }
            this.props.toggleDiagnosisCriteria(criteria.type, criteria)
            this.setState({ searchValue: "" })
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
    
    render() {
        let location = "Delhi"
        if (this.props.selectedLocation) {
            location = this.props.selectedLocation.formatted_address.slice(0, 25)
        }

        let rating = ''
        if (this.props.ratings) {
            rating = (Math.ceil(this.props.ratings * 2)) / 2;
        }

        let ratingArray = []
        for (let i = 0; i < Math.floor(rating); i++) {
            ratingArray.push(<img src={ASSETS_BASE_URL + '/img/customer-icons/rating-star-filled.svg'} className="rating-star" />)
        }

        if (rating != Math.floor(rating)) {
            ratingArray.push(<img src={ASSETS_BASE_URL + '/img/customer-icons/halfstar.svg'} className="rating-star" />)
        }

        let emptyStars = Math.floor(5 - rating);
        if (emptyStars) {
            for (let i = 0; i < emptyStars; i++) {
                ratingArray.push(<img src={ASSETS_BASE_URL + '/img/customer-icons/rating-star-empty.svg'} className="rating-star" />)
            }
        }

        let showPackageStrip = this.props.compare_packages && this.props.compare_packages.length > 0
        let showSearch = true
        // if(this.props.location &&  this.props.location.search && (this.props.location.search.includes('fromVip') || this.props.location.search.includes('fromGoldVip'))){
        //     showSearch = false
        // }
        return (
            <div className="profile-body-wrap">
                {
                    this.props.hideHeaderOnMobile ? <div className="hide-762"><ProfileHeader showSearch={showSearch} showPackageStrip={showPackageStrip || this.props.isPackage} new_fixed_header={1} isSearchList={true}/></div> : <ProfileHeader showSearch={showSearch} showPackageStrip={showPackageStrip || this.props.isPackage} new_fixed_header={1} isSearchList={true}/>
                }
                <section ref="scrollTarget" className={`${!showSearch?'container container-top-margin':'container parent-section book-appointment-section hospital-view-section'} ${this.props.hideHeaderOnMobile ? " mp0" : ""}  ${this.props.isPackage ?"pkgComapre":""} `}>
                    {
                        typeof navigator == 'object' && navigator && navigator.userAgent && navigator.userAgent.includes('iPhone')?''
                        :<ScrollWidget getScrollView={this.getScrollView.bind(this)} target={this.refs && this.refs['scrollTarget']?this.refs['scrollTarget']:''}/>    
                    }
                    
                    <div className="row main-row parent-section-row">
                        <LeftBar />

                        <div className="col-12 col-md-7 col-lg-7 center-column pt-0">

                            {
                                // goback decides if search bar will be shown
                                this.props.goBack ? "" : <div className="widget mb-10 mrng-top-20">
                                    <div className="search-top-container">
                                        <p className="srch-heading">Search</p>
                                        <div className="serch-nw-inputs-container">

                                            <LocationElements {...this.props} onRef={ref => (this.child = ref)} getCityListLayout={this.getCityListLayout.bind(this)} resultType='search' fromCriteria={true} commonSearchPage={true} />
                                            {
                                                this.state.searchCities.length > 0 ? "" : <div>
                                                    <div className="srch-radio-btns">
                                                        <div className="dtl-radio">
                                                            <label className="container-radio">Doctor
                                                            <input type="radio" onChange={this.props.changeSelection.bind(this, 'opd')} checked={this.props.selected == 'opd'} name="radio" />
                                                                <span className="doc-checkmark"></span>
                                                            </label>
                                                        </div>
                                                        <div className="dtl-radio">
                                                            <label className="container-radio">Test
                                                            <input type="radio" onChange={this.props.changeSelection.bind(this, 'lab')} checked={this.props.selected == 'lab'} name="radio" />
                                                                <span className="doc-checkmark"></span>
                                                            </label>
                                                        </div>
                                                        <div className="dtl-radio">
                                                            <label className="container-radio">Dental Treatments
                                                            <input type="radio" onChange={this.props.changeSelection.bind(this, 'procedures')} checked={this.props.selected == 'procedures'} name="radio" />
                                                                <span className="doc-checkmark"></span>
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <div className="serch-nw-inputs">
                                                        <input className="new-srch-doc-lab" autoComplete="off" placeholder="Search Doctors, Labs and Tests" onChange={this.inputHandler.bind(this)} value={this.state.searchValue} placeholder={this.props.title} onClick={() => {
                                                            if (this.props.goBack) {
                                                                this.props.history.go(-1)
                                                            }
                                                        }} />
                                                        <img style={{ width: '15px' }} className="srch-inp-img" src={ASSETS_BASE_URL + "/img/shape-srch.svg"} />
                                                    </div>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                </div>
                            }

                            {
                                this.state.searchCities.length > 0 ?
                                    <section>
                                        <div className="widget mb-10">
                                            <div className="common-search-container">
                                                <p className="srch-heading">Location Search</p>
                                                <div className="common-listing-cont">
                                                    <ul>
                                                        {
                                                            this.state.searchCities.map((result, i) => {
                                                                return <li key={i}>
                                                                    <p className="" onClick={this.selectLocation.bind(this, result)}>{result.description}</p>
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
                                        this.state.searchValue ?

                                            <section>
                                                {
                                                    this.state.searchResults.map((cat, j) => {
                                                        if (cat.values && cat.values.length) {
                                                            return <div className="widget mb-10" key={j}>
                                                                <div className="common-search-container">
                                                                    <p className="srch-heading">{cat.title}</p>
                                                                    <div className="common-listing-cont">
                                                                        <ul>
                                                                            {
                                                                                cat.values.length < 1 ? <li>
                                                                                    <p className="">No Results Found ...</p>
                                                                                </li> : ""
                                                                            }
                                                                            {
                                                                                cat.values.map((curr, i) => {
                                                                                    return <li key={i}>
                                                                                        <p className="" onClick={this.addCriteria.bind(this, curr, cat.title)}>{curr.name}</p>
                                                                                    </li>
                                                                                })
                                                                            }
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        } else {
                                                            return ""
                                                        }
                                                    })
                                                }
                                                {
                                                    this.state.searchValue.length > 2 ? <div>
                                                        {
                                                            this.props.type == 'opd' ?
                                                                <div className="widget mb-10">
                                                                    <div className="common-search-container">
                                                                        <div className="common-listing-cont mt-0">
                                                                            <ul>
                                                                                <li>
                                                                                    <p className="" onClick={() => {

                                                                                        let data = {
                                                                                            'Category': 'ConsumerApp', 'Action': 'DoctorNameSearched', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'doctor-name-searched', 'DoctorNameSearched': this.state.searchValue || ''
                                                                                        }
                                                                                        GTM.sendEvent({ data: data })

                                                                                        this.props.searchProceed(this.state.searchValue, "")
                                                                                    }}>Search Doctors by name : <span style={{ color: '#000', fontWeight: 500 }}>{this.state.searchValue}</span></p>
                                                                                </li>
                                                                                <li>
                                                                                    <p className="" onClick={() => {

                                                                                        let data = {
                                                                                            'Category': 'ConsumerApp', 'Action': 'HospitalNameSearched', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'hospital-name-searched', 'HospitalNameSearched': this.state.searchValue || ''
                                                                                        }
                                                                                        GTM.sendEvent({ data: data })

                                                                                        this.props.searchProceed("", this.state.searchValue)
                                                                                    }}>Search Hospitals by name : <span style={{ color: '#000', fontWeight: 500 }}>{this.state.searchValue}</span></p>
                                                                                </li>
                                                                            </ul>
                                                                        </div>
                                                                    </div>
                                                                </div> : <div className="widget mb-10">
                                                                    <div className="common-search-container">
                                                                        <div className="common-listing-cont mt-0">
                                                                            <ul>
                                                                                <li>
                                                                                    <p className="" onClick={() => {

                                                                                        let data = {
                                                                                            'Category': 'ConsumerApp', 'Action': 'LabNameSearched', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'lab-name-searched', 'SearchString': this.state.searchValue || ''
                                                                                        }
                                                                                        GTM.sendEvent({ data: data })

                                                                                        this.props.searchProceed(this.state.searchValue)
                                                                                    }}>Search Labs by name : <span style={{ color: '#000', fontWeight: 500 }}>{this.state.searchValue}</span></p>
                                                                                </li>
                                                                            </ul>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                        }
                                                    </div> : ""
                                                }
                                            </section>
                                            : (this.props.checkForLoad ? this.props.children : <Loader />)
                                    }
                                </div>
                            }
                        </div>
                        {
                            this.props.clinic_card || this.props.lab_card ? '' : <RightBar extraClass=" chat-float-btn-2" newChatBtn={this.props.newChatBtn} type={this.props.type} noChatButton={this.props.searchPackages || this.props.searchDoctors || this.props.searchLabs} msgTemplate="gold_general_template"/>
                        }
                        {
                            this.props.bottom_content && this.props.bottom_content.length && parseInt(this.props.page) == 1 ?
                                <div className="col-12 mrt-20">
                                    <div className="search-result-card-collpase" dangerouslySetInnerHTML={{ __html: this.props.bottom_content }}>
                                    </div>
                                </div>
                                : ''
                        }
                        {
                            this.props.ratings_title && this.props.ratings && this.props.reviews ?
                                <div className="col-12 avg-rating mrt-20">
                                    <p className="fw-500">{`${this.props.ratings_title} - Ratings & Reviews`}</p>
                                    <p className="fw-500">Average rating {ratingArray}<span>&nbsp;{this.props.ratings} </span><span>({this.props.reviews} reviews)</span>
                                    </p>
                                </div>
                                : ''
                        }
                    </div>
                </section>
                {
                    showPackageStrip && !this.props.isPackage?
                        <PackageCompareStrip {...this.props} />
                    :''
                }
                <div className={`shw-srch-ftr d-md-none ${this.state.swipeDirection && this.state.swipeDirection!='up' || !showSearch?'smth-ftr-hide':''}`}>
                {
                    this.props.searchPackages && this.props.compare_packages && this.props.compare_packages.length == 0?
                        <FixedMobileFooter searchPackagePage={true} {...this.props} />
                        :
                        this.props.compare_packages && this.props.compare_packages.length == 0 && (this.props.searchDoctors || this.props.searchLabs) ?
                            <FixedMobileFooter {...this.props} /> : ''
                }
                </div>
            </div>
        );
    }
}

export default CriteriaSearchView