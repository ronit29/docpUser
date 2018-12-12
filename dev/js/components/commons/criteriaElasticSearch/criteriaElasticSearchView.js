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


class CriteriaElasticSearchView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            searchValue: '',
            searchResults: [],
            loading: false,
            searchCities: []
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

    inputHandler(e) {
        this.setState({ searchValue: e.target.value })
        this.getSearchResults()
    }

    getSearchResults() {
        this.setState({ loading: true })

            this.props.getElasticCriteriaResults(this.state.searchValue, (searchResults) => {
                if (searchResults && searchResults.suggestion.length) {
                    

                    this.setState({ searchResults: searchResults.suggestion, loading: false })
                    
                }
            })
    }

    addCriteria(criteria) {

        if (this.props.type == 'opd') {

            let action = '', event = ''
            /*if (criteria.type == 'practice_specialization') {
                action = 'CommonSpecializationSearched'
            }else if(criteria.type == 'procedure_category'){

            }else if(criteria.type == 'procedure'){
                
            }else if(criteria.type == 'doctor'){
                
            }else if(criteria.type == 'hospital'){
                
            }else if(criteria.type == 'hospital'){

            }*/

            this.props.toggleOPDCriteria(criteria.type, criteria)
            this.setState({ searchValue: "" })
        
        } else {
            
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

        return (
            <div className="profile-body-wrap">
                {
                    this.props.hideHeaderOnMobile ? <div className="hide-762"><ProfileHeader showSearch={true} /></div> : <ProfileHeader showSearch={true} />
                }

                <section className={"container parent-section book-appointment-section" + (this.props.hideHeaderOnMobile ? " mp0" : "")}>
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
                                                        <input className="new-srch-doc-lab" placeholder="Search Doctors, Labs and Tests" onChange={this.inputHandler.bind(this)} value={this.state.searchValue} placeholder={this.props.title} onClick={() => {
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
                                                    this.state.searchValue.length > 2  && this.props.type !='elastic'? <div>
                                                        {
                                                            this.props.type == 'opd' ?
                                                                <div className="widget mb-10">
                                                                    <div className="common-search-container">
                                                                        <p className="srch-heading">Name Search</p>
                                                                        <div className="common-listing-cont">
                                                                            <ul>
                                                                                <li>
                                                                                    <p className="" onClick={() => {

                                                                                        let data = {
                                                                                            'Category': 'ConsumerApp', 'Action': 'DoctorNameSearched', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'doctor-name-searched', 'DoctorNameSearched': this.state.searchValue || ''
                                                                                        }
                                                                                        GTM.sendEvent({ data: data })

                                                                                        this.props.searchProceed(this.state.searchValue, "")
                                                                                    }}>Search Doctors with name {this.state.searchValue}</p>
                                                                                </li>
                                                                                <li>
                                                                                    <p className="" onClick={() => {

                                                                                        let data = {
                                                                                            'Category': 'ConsumerApp', 'Action': 'HospitalNameSearched', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'hospital-name-searched', 'HospitalNameSearched': this.state.searchValue || ''
                                                                                        }
                                                                                        GTM.sendEvent({ data: data })

                                                                                        this.props.searchProceed("", this.state.searchValue)
                                                                                    }}>Search Hospitals with name {this.state.searchValue}</p>
                                                                                </li>
                                                                            </ul>
                                                                        </div>
                                                                    </div>
                                                                </div> : <div className="widget mb-10">
                                                                    <div className="common-search-container">
                                                                        <p className="srch-heading">Name Search</p>
                                                                        <div className="common-listing-cont">
                                                                            <ul>
                                                                                <li>
                                                                                    <p className="" onClick={() => {

                                                                                        let data = {
                                                                                            'Category': 'ConsumerApp', 'Action': 'LabNameSearched', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'lab-name-searched', 'SearchString': this.state.searchValue || ''
                                                                                        }
                                                                                        GTM.sendEvent({ data: data })

                                                                                        this.props.searchProceed(this.state.searchValue)
                                                                                    }}>Search Labs with name {this.state.searchValue}</p>
                                                                                </li>
                                                                            </ul>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                        }
                                                    </div> : ""
                                                }


                                                {
                                                    this.state.searchResults.map((cat, j) => {
                                                        return <div className="widget mb-10" key={j}>
                                                            <div className="common-search-container">
                                                                {/*<p className="srch-heading">{cat.name}</p>*/}
                                                                <div className="common-listing-cont">
                                                                    <ul>
                                                                        <li key={j}>
                                                                            <p className="" onClick={this.addCriteria.bind(this, cat)}>{cat.name}</p>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    })
                                                }


                                            </section>
                                            : (this.props.checkForLoad ? this.props.children : <Loader />)
                                    }
                                </div>
                            }


                        </div>
                        {
                            this.props.clinic_card || this.props.lab_card ? '' : <RightBar extraClass=" chat-float-btn-2" newChatBtn={this.props.newChatBtn} />
                        }
                    </div>
                </section>
            </div>
        );
    }
}


export default CriteriaElasticSearchView
