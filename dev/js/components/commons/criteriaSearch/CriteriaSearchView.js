import React from 'react';
import Loader from '../../commons/Loader'

import LeftBar from '../LeftBar'
import RightBar from '../RightBar'
import ProfileHeader from '../DesktopProfileHeader'
import GTM from '../../../helpers/gtm.js'
import LocationElements from '../../../containers/commons/locationElements'


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
            loading: false
        }
    }

    componentDidMount() {
        this.getSearchResults = debouncer(this.getSearchResults.bind(this), 500)
        let input = document.getElementById('topCriteriaSearch')
        // if coming back or refresh focus on search bar
        if (this.props.history.action === 'POP' && !this.props.location.search.includes('search')) {
            // input.focus()
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
                    let results = [
                        {
                            title: 'Conditions',
                            values: searchResults.conditions
                        },
                        {
                            title: 'Specializations',
                            values: searchResults.specializations
                        }
                    ]
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

    addCriteria(criteria,docType) {
        
        if (this.props.type == 'opd') {

            if(docType=='Conditions'){
                let data = {
                'Category':'ConsumerApp','Action':'CommonConditionSearched','CustomerID':GTM.getUserId()||'','leadid':0,'event':'common-condition-searched' ,'selected':criteria.name||''}
                GTM.sendEvent({ data: data })
            }else if(docType == 'Specializations'){
                let data = {
                'Category':'ConsumerApp','Action':'CommonSpecializationsSearched','CustomerID':GTM.getUserId()||'','leadid':0,'event':'common-specializations-searched' ,'selected':criteria.name||''}
                GTM.sendEvent({ data: data })
            }
            this.props.toggleOPDCriteria(criteria.type, criteria)
            this.setState({ searchValue: "" })
        } else {
            if(docType=='Tests'){
                let data = {
                'Category':'ConsumerApp','Action':'TestSearched','CustomerID':GTM.getUserId()||'','leadid':0,'event':'test-searched' ,'selected':criteria.name||''}
                GTM.sendEvent({ data: data })
            }            
            this.props.toggleDiagnosisCriteria(criteria.type, criteria)
            this.setState({ searchValue: "" })
        }
    }


    render() {

        let location = "Delhi"
        if (this.props.selectedLocation) {
            location = this.props.selectedLocation.formatted_address.slice(0, 25)
        }

        return (
            <div className="profile-body-wrap">
                <ProfileHeader />
                <section className="container parent-section condition-search-section">
                    <div className="row main-row parent-section-row">
                        <LeftBar />

                        <div className="col-12 col-md-7 col-lg-7 center-column criteria-search-header">
                            <header className="skin-primary fixed horizontal top search-book-header sticky-header">
                                <div className="container-fluid">
                                    {/* <div className="row">
                                        <div className="col-12">
                                            <div className="navigate-row">
                                                <ul className="inline-list top-nav alpha-bx text-white"
                                                    onClick={() => {
                                                        this.props.history.go(-1)
                                                    }}
                                                >
                                                    <li><span className="ct-img ct-img-sm arrow-img"><img src={ASSETS_BASE_URL + "/img/customer-icons/left-arrow.svg"} className="img-fluid" /></span></li>
                                                    <li>
                                                        <div className="screen-title">
                                                            {this.props.goBack ? "Search" : ""}
                                                        </div>
                                                    </li>
                                                </ul>
                                                <ul className="inline-list top-nav beta-bx float-right text-right text-white"
                                                    onClick={() => {
                                                        this.props.history.push('/locationsearch')
                                                    }}
                                                >
                                                    <li><div className="screen-title select-location-div"><span className="ct-img ct-img-sm map-marker-img"><img src={ASSETS_BASE_URL + "/img/customer-icons/map-marker.svg"} className="img-fluid" /></span> {location} <span><img src={ASSETS_BASE_URL + "/img/customer-icons/edit-loc.svg"} className="img-fluid" style={{width: 14, verticalAlign: '-2px', marginLeft: 4}} /></span></div></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div> */}
                                    {
                                        // goback decides if search bar will be shown
                                        this.props.goBack ? "" : <div className="row" style={{ paddingTop: 10 }}>
                                            <div className="col-12">
                                                <div className="search-row">
                                                    <div className="adon-group">
                                                        <input type="text" className="form-control inp-with-loc input-md search-input" id="topCriteriaSearch" onChange={this.inputHandler.bind(this)} value={this.state.searchValue} placeholder={this.props.title} onClick={() => {
                                                            if (this.props.goBack) {
                                                                this.props.history.go(-1)
                                                            }
                                                        }} />
                                                        <span className="ct-img ct-img-sm search-icon"><img src={ASSETS_BASE_URL + "/img/customer-icons/search-icon.svg"} /></span>
                                                        <div className="head-links location-item inner-location" onClick={() => {
                                                            this.props.history.push('/locationsearch')
                                                        }}>
                                                            <img width="10px" className="m-0" src={ASSETS_BASE_URL + "/images/srch-loc.svg"} />
                                                            <span className="loc-text-search mr-0">{location}</span>
                                                            <img width="15px" src={ASSETS_BASE_URL + "/images/location.svg"} />
                                                        </div>
                                                    </div>
                                                </div>
                                                <LocationElements {...this.props}/>
                                            </div>
                                        </div>
                                    }

                                </div>
                            </header>

                            {
                                this.state.searchValue ?

                                    <section>
                                        {
                                            this.state.searchResults.map((cat, j) => {
                                                if (cat.values && cat.values.length) {
                                                    return <div className="widget-panel" key={j}>
                                                        <h4 className="panel-title">{cat.title}</h4>
                                                        <div className="panel-content">
                                                            <ul className="list search-result-list">
                                                                {
                                                                    cat.values.length < 1 ? <li><a>No Results Found ...</a></li> : ""
                                                                }
                                                                {
                                                                    cat.values.map((curr, i) => {
                                                                        return <li onClick={this.addCriteria.bind(this, curr,cat.title)} key={i}><a>{curr.name}</a>
                                                                            {i < cat.values.length - 1 ? <hr className="search-list-hr" /> : ""}
                                                                        </li>
                                                                    })
                                                                }
                                                            </ul>
                                                        </div>
                                                    </div>
                                                } else {
                                                    return ""
                                                }
                                            })
                                        }
                                        {
                                            this.props.type == 'opd' ? <div className="widget-panel">
                                                <h4 className="panel-title">Name Search</h4>
                                                <div className="panel-content">
                                                    <ul className="list search-result-list">
                                                        <li onClick={() => {

                                                            let data = {
                                                            'Category':'ConsumerApp','Action':'DoctorNameSearched','CustomerID':GTM.getUserId()||'','leadid':0,'event':'doctor-name-searched' ,'DoctorNameSearched':this.state.searchValue||''}
                                                            GTM.sendEvent({ data: data })

                                                            this.props.searchProceed(this.state.searchValue, "")
                                                        }}><a>Search Doctors with name {this.state.searchValue}</a></li>
                                                    </ul>
                                                </div>
                                                <div className="panel-content">
                                                    <ul className="list search-result-list">
                                                        <li onClick={() => {
                                                            
                                                            let data = {
                                                            'Category':'ConsumerApp','Action':'HospitalNameSearched','CustomerID':GTM.getUserId()||'','leadid':0,'event':'hospital-name-searched', 'HospitalNameSearched':this.state.searchValue||''}
                                                            GTM.sendEvent({ data: data })

                                                            this.props.searchProceed("", this.state.searchValue)
                                                        }}><a>Search Hospitals with name {this.state.searchValue}</a></li>
                                                    </ul>
                                                </div>
                                            </div> : <div className="widget-panel">
                                                    <h4 className="panel-title">Name Search</h4>
                                                    <div className="panel-content">
                                                        <ul className="list search-result-list">
                                                            <li onClick={() => {

                                                                let data = {
                                                                'Category':'ConsumerApp','Action':'LabNameSearched','CustomerID':GTM.getUserId()||'','leadid':0,'event':'lab-name-searched', 'SearchString':this.state.searchValue||''}
                                                                GTM.sendEvent({ data: data })

                                                                this.props.searchProceed(this.state.searchValue)
                                                            }}><a>Search Labs with name {this.state.searchValue}</a></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                        }
                                    </section>
                                    : (this.props.checkForLoad ? this.props.children : <Loader />)
                            }
                        </div>

                        <RightBar extraClass=" chat-float-btn-2" />
                    </div>
                </section>
            </div>
        );
    }
}


export default CriteriaSearchView
