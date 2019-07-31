import React from 'react'
import GTM from '../../../helpers/gtm.js'
import InitialsPicture from '../initialsPicture'
import { _getlocationFromLatLong } from '../../../helpers/mapHelpers.js'

const debouncer = (fn, delay) => {
    let timer = null
    return function () {
        clearTimeout(timer)
        timer = setTimeout(() => {
            fn.call(this)
        }, delay)
    }
}

class CommonSearch extends React.Component {

	constructor(props){
		super(props)
		this.state = {
			searchResults: [],
			searchValue: '',
			loading: ''
		}
	}

	componentDidMount(){

        if(this.props.hospital_id_search) {
            let data = {
                'Category': 'ConsumerApp', 'Action': 'IpdHospitalSearch', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'ipd-hospital-search', 'searched': '', 'searchString': this.state.searchValue, hospital_id: this.props.hospital_id_search, 'page':this.props.hospital_id_search?'hospitalSearch':''
            }
            
            GTM.sendEvent({ data: data })
                
        }
        this.getSearchResults = debouncer(this.getSearchResults.bind(this), 200)
	}

	inputHandler(e) {
        this.setState({ searchValue: e.target.value })
        let searchString = e.target.value.trim()
        if (searchString.length) {
            this.getSearchResults()
        } else {
            this.setState({ searchResults: [] })
        }
    }

    focusOut() {
        let data = {
            'Category': 'ConsumerApp', 'Action': 'searchInputFocusOut', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'search-string-on-blur', 'searched': '', 'searchString': this.state.searchValue, 'type': '', 'from': 'article', 'page':this.props.hospital_id_search?'hospitalSearch':''
        }
        GTM.sendEvent({ data: data })
    }

	getSearchResults() {
        this.setState({ loading: true })
        let lat = 28.644800
        let long = 77.216721
        let place_id = ""

        if (this.props.OPD_STATE && this.props.OPD_STATE.selectedLocation) {
            place_id = this.props.OPD_STATE.selectedLocation.place_id || ""
            lat = this.props.OPD_STATE.selectedLocation.geometry.location.lat
            long = this.props.OPD_STATE.selectedLocation.geometry.location.lng
            if (typeof lat === 'function') lat = lat()
            if (typeof long === 'function') long = long()

            lat = parseFloat(parseFloat(lat).toFixed(6))
            long = parseFloat(parseFloat(long).toFixed(6))
        }

        let location = { lat: lat, long: long }
        let searchType = ''
        let extraSearchParams = {}
        if(this.props.hospital_id_search) {
            extraSearchParams.hospital_id = this.props.hospital_id_search
            searchType = 'opd'
            location.lat = this.props.hospital_lat || location.lat
            location.long = this.props.hospital_long || location.long
        }


        this.props.getElasticCriteriaResults(this.state.searchValue.trim(),searchType, location, extraSearchParams).then((filterSearchResults)=> {

            if (filterSearchResults && filterSearchResults.suggestion) {

                let filterResultsName = filterSearchResults.suggestion.map(x => x.name).join(',') || ''
                let gtmData = {
                    'Category': 'ConsumerApp', 'Action': 'searchquery', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'search-query', 'searchString': this.state.searchValue,
                    'searchType': '', 'results': filterResultsName, 'from':'article', 'page':this.props.hospital_id_search?'hospitalSearch':''
                }
                GTM.sendEvent({ data: gtmData })
                let filterData = filterSearchResults.suggestion

                this.setState({ searchResults: filterData, loading: false, type: '' })
            }

        })
    }

    addCriteria(criteria) {

    	let LAB_TYPES = ['lab_test_synonym', 'lab_test', 'lab']

        let OPD_TYPES = ['visit_reason', 'practice_specialization', 'doctor', 'hospital', 'practice_specialization_synonym']

        let PROCEDURE_TYPES = ['procedure_category', 'procedure']

        let IPD_TYPES = ['ipd']

        if (this.props.latitude && this.props.longitude) {
            _getlocationFromLatLong(this.props.latitude, this.props.longitude, 'city', (locationData) => {
                if (locationData) {
                    this.props.selectLocation(locationData, 'geoip', true)
                }
            })
        }

        criteria = Object.assign({}, criteria)

        if (criteria.type) {

        	let type = ''

            let action = '', event = ''

            if (criteria.type.includes('visit_reason')) {
            	type = 'opd'

                let data = {
                    'Category': 'ConsumerApp', 'Action': 'VisitReasonSearched', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'visit-reason-searched', 'SelectedId': criteria.id || '', 'searched': 'autosuggest', 'searchString': this.state.searchValue, 'page':this.props.hospital_id_search?'hospitalSearch':''
                }
                GTM.sendEvent({ data: data })

                criteria.id = criteria.action.value.join(',')
                criteria.type = 'speciality'

            }

            else if (criteria.action.param.includes('hospital_name')) {
            	type = 'opd'
                let data = {
                    'Category': 'ConsumerApp', 'Action': 'HospitalNameSearched', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'hospital-name-searched', 'hospitalId': criteria.action.id || '', 'searched': 'autosuggest', 'searchString': this.state.searchValue || '', 'page':this.props.hospital_id_search?'hospitalSearch':''
                }
                GTM.sendEvent({ data: data })

                this.searchProceedOPD("", "", criteria.action.id)
                return

            } else if (criteria.action.param.includes('procedure_category_ids')) {
            	type = 'opd'
                criteria.id = criteria.action.value[0]
                criteria.type = 'procedures_category'

            } else if (criteria.action.param.includes('procedure_ids')) {
            	type = 'opd'
                let data = {
                    'Category': 'ConsumerApp', 'Action': 'CommonProceduresSelected', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'common-procedures-selected', 'selected': criteria.name || '', 'selectedId': criteria.action.value ? criteria.action.value[0] : '', 'searched': 'autosuggest', 'searchString': this.state.searchValue, 'page':this.props.hospital_id_search?'hospitalSearch':''
                }
                GTM.sendEvent({ data: data })

                criteria.id = criteria.action.value[0]
                criteria.type = 'procedures'

            } else if (criteria.action.param.includes('specializations')) {
            	type = 'opd'
                let data = {
                    'Category': 'ConsumerApp', 'Action': 'CommonSpecializationsSelected', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'common-specializations-selected', 'selected': criteria.name || '', 'selectedId': criteria.action.value ? criteria.action.value[0] : '', 'searched': 'autosuggest', 'searchString': this.state.searchValue, 'page':this.props.hospital_id_search?'hospitalSearch':''
                }
                GTM.sendEvent({ data: data })

                criteria.id = criteria.action.value[0]
                criteria.type = 'speciality'

            } else if (criteria.action.param.includes('doctor_name')) {
            	type = 'opd'

                let data = {
                    'Category': 'ConsumerApp', 'Action': 'DoctorNameSearched', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'doctor-name-searched', 'selectedId': criteria.action.value[0] || '', 'searched': 'autosuggest', 'searchString': this.state.searchValue || '', 'page':this.props.hospital_id_search?'hospitalSearch':''
                }
                GTM.sendEvent({ data: data })

                this.props.history.push(`/opd/doctor/${criteria.action.value[0]}?hide_search_data=true`)

                return

            }else if (criteria.type == "lab") {
                this.props.clearExtraTests()
                let data = {
                    'Category': 'ConsumerApp', 'Action': 'LabNameSearched', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'lab-name-searched', 'selectedId': criteria.action.value[0] || '', 'searched': 'autosuggest', 'searchString': this.state.searchValue || '', 'page':this.props.hospital_id_search?'hospitalSearch':''
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
                
                this.props.toggleDiagnosisCriteria('test', criteria, true)
		        setTimeout(() => {
		           	this.searchProceedLAB("", false)
		        }, 100)

            }else if (criteria.type.includes('ipd')) {
	            let data = {
	                'Category': 'ConsumerApp', 'Action': 'IPDNameSearched', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'ipd-name-searched', 'selectedId': criteria.action.value[0] || '', 'searched': 'autosuggest', 'searchString': this.state.searchValue || '', 'page':this.props.hospital_id_search?'hospitalSearch':''
	            }
	            GTM.sendEvent({ data: data })
	            let ipdData = Object.assign({}, criteria)
	            ipdData.id = criteria.action.value[0]
	            ipdData.type = 'ipd'
        		this.props.toggleIPDCriteria(ipdData, true)

        		setTimeout(()=>{
        			this.props.history.push(`/ipdInfo?ipd_id=${ipdData.id}`)
        		}, 100)
	        }            


            if(type=='opd'){
            	this.props.cloneCommonSelectedCriterias(criteria)
    	        this.setState({ searchValue: "" })
	            this.searchProceedOPD('', '', this.props.hospital_id_search||'')

            }
        }
    }

    searchProceedOPD(doctor_name = "", hospital_name = "", hospital_id = "") {
        // handle doctor name, hospital name
        let state = {
            filterCriteria: {
                ...this.props.OPD_STATE.filterCriteria,
                doctor_name, hospital_name, hospital_id
            },
            nextFilterCriteria: {
                ...this.props.OPD_STATE.filterCriteria,
                doctor_name, hospital_name, hospital_id
            }
        }


        if (doctor_name || hospital_name || hospital_id) {
            state.selectedCriterias = []
            state.commonSelectedCriterias = []
        }

        this.props.mergeOPDState(state, true)

        this.props.history.push('/opd/searchresults')
    }

    searchProceedLAB(lab_name = "", show_all_labs) {
        // handle doctor name, hospital name
        this.props.mergeLABState({
            filterCriteria: {
                ...this.props.LAB_STATE.filterCriteria,
                lab_name
            },
            nextFilterCriteria: {
                ...this.props.LAB_STATE.filterCriteria,
                lab_name
            },
            currentSearchedCriterias: show_all_labs ? [] : this.props.LAB_STATE.selectedCriterias,
            nextSelectedCriterias: show_all_labs ? [] : this.props.LAB_STATE.selectedCriterias
        }, true)

        let selectedTestIds = this.props.LAB_STATE.selectedCriterias.map(test => test.id)
        let selectedTestsName = this.props.LAB_STATE.selectedCriterias.map(test => test.name)
        let data = {
            'Category': 'ConsumerApp', 'Action': 'ShowLabClicked', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'show-lab-clicked', 'SelectedTestIds': selectedTestIds.join(',') || '', 'SelectedTestName': selectedTestsName.join(','), 'TestCount': selectedTestIds.length || 0
        }
        GTM.sendEvent({ data: data })

        this.props.history.push('/lab/searchresults')
    }

    onFocusIn() {
        if(this.props.getInputFocus){
            this.props.getInputFocus()
        }
    }

    render(){

    	return(

		<div>

			<div className="articleSearchWidget">
                <div className="articleInputContainer">
                    <input className="artc-inp" type="text" onChange={this.inputHandler.bind(this)} value={this.state.searchValue} placeholder={this.props.hospital_id_search?`Search for Doctor, Speciality within Hospital`:"Search Doctors & Tests"}  onBlur={() => this.focusOut()} onFocus ={this.onFocusIn.bind(this)}/>
                    <img className="artc-img" src={ASSETS_BASE_URL + "/images/vall.png"} />
                    {
                        this.props.commonSearch?''
                        :<button className="artc-btn artc-disable"><img src={ASSETS_BASE_URL + "/img/new-loc-ico.svg"} />{this.props.location}</button>
                    }
                </div>
            </div>

            <section>
            {
                this.state.searchResults.length || this.state.searchValue ?
                    <div className="widget searchMargin" >
                        <div className="common-search-container">
                            <p className="srch-heading">Search Results</p>
                            <div className="common-listing-cont">
                                <ul>

                                    {
                                        this.state.searchResults.map((cat, j) => {
                                            return <li key={j} onClick={this.addCriteria.bind(this, cat)}>
                                                <div className="serach-rslt-with-img">
                                                    {
                                                        cat.type && cat.type.includes('doctor') ?
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
                                                            cat.type && cat.type.includes('ipd')
                                                                ? <span className="search-span-sub">IPD Procedures</span>
                                                                : cat.is_package && cat.is_package.length && cat.is_package[0] ?
                                                                    <span className="search-span-sub">Health Package {cat.number_of_tests && cat.number_of_tests.length && cat.number_of_tests[0] ? ` | ${cat.number_of_tests[0]} Test Included` : ''}</span>
                                                                    : cat.type && cat.type.includes("hospital")
                                                                        ? <span className="search-span-sub">{cat.locality && Array.isArray(cat.locality) ? cat.locality.join(', ') : cat.visible_name}</span>
                                                                        : <span className="search-span-sub">{cat.type && cat.type.includes('doctor') && cat.primary_name && Array.isArray(cat.primary_name) ? cat.primary_name.slice(0, 2).join(', ') : cat.visible_name}</span>
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
                                        this.state.searchValue.length > 2 
                                            ? <li onClick={() => {

                                                let data = {
                                                    'Category': 'ConsumerApp', 'Action': 'DoctorNameSearched', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'doctor-name-searched', 'selectedId': '', 'searched': '', 'searchString': this.state.searchValue || '', 'page':this.props.hospital_id_search?'hospitalSearch':''
                                                }
                                                GTM.sendEvent({ data: data })

                                                this.searchProceedOPD(this.state.searchValue, "", this.props.hospital_id_search||'')
                                            }}>
                                                <div className="serach-rslt-with-img">
                                                    <span className="srch-rslt-wd-span text-center srch-img">
                                                        <img style={{ width: '20px', margin: '0px 10px' }} className="" src={ASSETS_BASE_URL + "/img/shape-srch.svg"} />
                                                    </span>
                                                    <p className="p-0" >Search all Doctors with name :<span className="search-el-code-bold">{this.state.searchValue}</span></p>
                                                </div>
                                            </li>
                                            : ''
                                    }
                                    {
                                    	this.state.searchValue.length > 2  && !this.props.hospital_id_search?
                                    	<li onClick={() => {

                                            let data = {
                                                'Category': 'ConsumerApp', 'Action': 'LabNameSearched', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'lab-name-searched', 'selectedId': '', 'searched': '', 'searchString': this.state.searchValue || '', 'page':this.props.hospital_id_search?'hospitalSearch':''
                                            }
                                            GTM.sendEvent({ data: data })

                                            this.searchProceedLAB(this.state.searchValue)
                                        }}>
                                            <div className="serach-rslt-with-img">
                                                <span className="srch-rslt-wd-span text-center srch-img">
                                                    <img style={{ width: '22px', margin: '0px 10px' }} className="" src={ASSETS_BASE_URL + "/img/shape-srch.svg"} />
                                                </span>
                                                <p className="p-0" >Search all Labs with name :<span className="search-el-code-bold">{this.state.searchValue}</span></p>
                                            </div>
                                        </li>
                                                :''
                                    }
                                    {
                                        this.state.searchValue.length > 2? 
                                        <li onClick={() => {

                                            let data = {
                                                'Category': 'ConsumerApp', 'Action': 'HospitalNameSearched', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'hospital-name-searched', 'hospitalId': '', 'searched': '', 'searchString': this.state.searchValue || '', 'page':this.props.hospital_id_search?'hospitalSearch':''
                                            }
                                            GTM.sendEvent({ data: data })

                                            this.searchProceedOPD("", this.state.searchValue, this.props.hospital_id_search || '')
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
		</div>
		)
    }
	
}

export default CommonSearch