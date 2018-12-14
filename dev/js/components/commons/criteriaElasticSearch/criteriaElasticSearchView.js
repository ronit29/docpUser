import React from 'react';
import Loader from '../../commons/Loader'

import LeftBar from '../LeftBar'
import RightBar from '../RightBar'
import ProfileHeader from '../DesktopProfileHeader'
import GTM from '../../../helpers/gtm.js'
import LocationElements from '../../../containers/commons/locationElements'
import InitialsPicture from '../initialsPicture'


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
            currentTestType:0
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

    componentWillReceiveProps(nextProps){
        if(this.props.type != nextProps.type){
            this.setState({searchValue:'', searchResults:[]})
        }
    }

    inputHandler(e) {
        this.setState({ searchValue: e.target.value })
        this.getSearchResults()
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

        let location = {lat: lat, long: long}

            this.props.getElasticCriteriaResults(this.state.searchValue, this.props.type, location, (searchResults) => {
                if (searchResults && searchResults.suggestion.length) {

                this.setState({ searchResults: searchResults.suggestion, loading: false })

            }
        })
    }

    addCriteria(criteria) {

        criteria = Object.assign({},criteria)
        
        if (this.props.type == 'opd' || this.props.type=='procedures') {

            let action = '', event = ''

            if (criteria.action.param.includes('hospital_name')) {

                this.props.searchProceed("", criteria.action.value[0])
                return

            }else if(criteria.action.param.includes('procedure_category_ids')){

                criteria.id = criteria.action.value
                criteria.type = 'procedures_category'
            
            }else if(criteria.action.param.includes('procedure_ids')){

                criteria.id = criteria.action.value
                criteria.type = 'procedures'

            }else if(criteria.action.param.includes('specializations')){

                criteria.id = criteria.action.value
                criteria.type = 'speciality'

            }else if(criteria.action.param.includes('doctor_name')){
                
                this.props.history.push(`/opd/doctor/${criteria.action.value[0]}?hide_search_data=true`)

                //this.props.searchProceed(criteria.action.value[0],"")
                return
            
            }


            this.props.cloneCommonSelectedCriterias(criteria)
            this.setState({ searchValue: "" })
            this.props.showResults('opd')

        } else {

            if(criteria.type =="lab"){
                this.props.history.push(`/lab/${criteria.action.value[0]}`)
                return
            }else if(criteria.type =="lab_test"){
                let selectedTestIds = []
                this.props.dataState.selectedCriterias.map((x) => {
                    if(x.action && x.action.test_type){
                        selectedTestIds.concat(x.action.test_type)
                    }
                })
                if(selectedTestIds.indexOf(criteria.action.test_type[0]) >-1){
                    this.setState({currentTestType:1})
                }
            }
            criteria.type = 'test'
            criteria.id = criteria.action.value
            this.props.toggleDiagnosisCriteria('test', criteria)
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
                                                            <input type="radio" onChange={this.props.changeSelection.bind(this, 'opd', this.state.searchValue)} checked={this.props.selected == 'opd'} name="radio" />
                                                                <span className="doc-checkmark"></span>
                                                            </label>
                                                        </div>
                                                        <div className="dtl-radio">
                                                            <label className="container-radio">Test
                                                            <input type="radio" onChange={this.props.changeSelection.bind(this, 'lab', this.state.searchValue)} checked={this.props.selected == 'lab'} name="radio" />
                                                                <span className="doc-checkmark"></span>
                                                            </label>
                                                        </div>
                                                        <div className="dtl-radio">
                                                            <label className="container-radio">Dental Treatments
                                                            <input type="radio" onChange={this.props.changeSelection.bind(this, 'procedures', this.state.searchValue)} checked={this.props.selected == 'procedures'} name="radio" />
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
                                        this.state.searchValue ?

                                            <section>
                                                {this.state.searchResults.length?
                                                 <div className="widget mb-10" >
                                                    <div className="common-search-container">
                                                        {/*<p className="srch-heading">{cat.name}</p>*/}
                                                        <div className="common-listing-cont">
                                                            <ul>
                                                                {
                                                                    this.state.searchResults.map((cat, j) => {
                                                                        return <li key={j}>
                                                                            <div className="serach-rslt-with-img">
                                                                                {
                                                                                    cat.type.includes('doctor')?
                                                                                    /*<span className="srch-rslt-wd-span usr-srch-img">
                                                                                        <img style={{ width: '35px', borderRadius: '50%' }} className="" src={`https://cdn.docprime.com/media/${cat.image_path}`} />
                                                                                    </span>*/
                                                                                    <InitialsPicture name={cat.name} has_image={!!cat.image_path} className="elasticInitalPic initialsPicture-ds fltr-initialPicture-ds"><img style={{ width: '35px', borderRadius: '50%' }} className="" src={`https://cdn.docprime.com/media/${cat.image_path}`} alt={cat.name} title={cat.name} /></InitialsPicture>
                                                                                    :<span className="srch-rslt-wd-span text-center srch-img">
                                                                                        <img style={{ width: '22px' }} className="" src={ASSETS_BASE_URL + "/img/shape-srch.svg"} />
                                                                                    </span>
                                                                                }
                                                                                
                                                                                
                                                                                <p className="p-0" onClick={this.addCriteria.bind(this, cat)}>
                                                                                    {cat.name}
                                                                                    <span className="search-span-sub">{cat.type.includes('doctor') && cat.primary_name && Array.isArray(cat.primary_name)?cat.primary_name.slice(0,2).join(', '):cat.visible_name}</span>
                                                                                </p>

                                                                            </div>
                                                                        </li>
                                                                    })
                                                                }
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                                :''
                                                }
                                                
                                                {
                                                    this.state.searchValue.length > 2 /*||  || this.state.searchResults.suggestedCategories.indexOf("doctor") > -1)*/? <div>
                                                        {
                                                            (this.props.type == 'opd') /*&& this.state.searchResults && this.state.searchResults.suggestedCategories.indexOf("doctor") > -1) */?
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
                                                                </div> : (this.state.searchResults) /*&& this.state.searchResults.suggestedCategories.indexOf("lab") > -1)*/
                                                                    ?<div className="widget mb-10">
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
                                                                    :''
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
                            this.props.clinic_card || this.props.lab_card ? '' : <RightBar extraClass=" chat-float-btn-2" newChatBtn={this.props.newChatBtn} />
                        }
                    </div>
                </section>
            </div>
        );
    }
}


export default CriteriaElasticSearchView
