import React from 'react'
import GTM from '../../../helpers/gtm'
import SnackBar from 'node-snackbar'

class FooterWidgetView extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			name: '',
			phone_number:'',
			show_form:false,
			leadType:'',
			clickedData:null,
			city_id:null,
			city_name:'',
			search_city:'',
			showCitySearchPopup:false,
			filtered_city_list: []
		}
	}
	componentDidMount() {
		let data = {
			'Category': 'ConsumerApp', 'Action': 'FooterWidgetDisplayed', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'footer-widget-displayed', type: this.props.footerWidget && this.props.footerWidget.widget_type ? this.props.footerWidget.widget_type : ''
		}
		GTM.sendEvent({ data: data })

	}

	selectDoctorSpecialization(data) {
		if(!this.state.show_form){
			this.setState({show_form:true, leadType:1,clickedData:data})
			return
		}
		let criteria = {}
		criteria.id = data[1] || ''
		criteria.name = data[0] || ''
		criteria.type = 'speciality'
		this.props.cloneCommonSelectedCriterias(criteria)

		let doctor_name = '', hospital_name = '', hospital_id = ''
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

		let gtmData = {
			'Category': 'ConsumerApp', 'Action': 'FooterSpecializationsSelected', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'footer-specializations-selected', 'selected': criteria.name || '', 'selectedId': criteria.id || '', 'searched': '', 'searchString': '', 'from': 'footerWidget'
		}
		GTM.sendEvent({ data: gtmData })


		this.props.mergeOPDState(state, true)

		this.props.history.push({
			pathname: '/opd/searchresults',
			state: { search_back: true }
		})
	}

	selectTest(data) {
		if(!this.state.show_form){
			this.setState({show_form:true, leadType:2,clickedData:data})
			return
		}
		let criteria = {}
		criteria.id = data[1] || ''
		criteria.name = data[0] || ''
		criteria.type = 'test'
		criteria.url = ''
		criteria.test_type = ''
		this.props.toggleDiagnosisCriteria('test', criteria, true)
		setTimeout(() => {
			this.showLabs()
		}, 100)
	}

	showLabs() {
		let lab_name = ''
		this.props.mergeLABState({
			filterCriteria: {
				...this.props.LAB_STATE.filterCriteria,
				lab_name
			},
			nextFilterCriteria: {
				...this.props.LAB_STATE.filterCriteria,
				lab_name
			},
			currentSearchedCriterias: this.props.LAB_STATE.selectedCriterias,
			nextSelectedCriterias: this.props.LAB_STATE.selectedCriterias
		}, true)

		let selectedTestIds = this.props.LAB_STATE.selectedCriterias.map(test => test.id)
		let selectedTestsName = this.props.LAB_STATE.selectedCriterias.map(test => test.name)
		let data = {
			'Category': 'ConsumerApp', 'Action': 'FooterTestClicked', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'footer-lab-clicked', 'SelectedTestIds': selectedTestIds.join(',') || '', 'SelectedTestName': selectedTestsName.join(','), 'TestCount': selectedTestIds.length || 0, 'from': 'footerWidget'
		}
		GTM.sendEvent({ data: data })

		this.props.history.push({
			pathname: '/lab/searchresults',
			state: { search_back: true }
		})
	}

	openSearchMore() {
		if(!this.state.show_form){
			this.setState({show_form:true, leadType:3})
			return
		}
		let which = 'opd'
		if (this.props.footerWidget && this.props.footerWidget.widget_type == 'LabTest') {
			which = 'lab'
		}
		this.props.selectSearchType(which)
		this.props.history.push('/search')
	}

	goToPackage() {
		if(!this.state.show_form){
			this.setState({show_form:true, leadType:4})
			return
		}
		let data = {
			'Category': 'ConsumerApp', 'Action': 'ShowPackageClicked', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'show-package-clicked', 'from': 'footerWidget'
		}
		GTM.sendEvent({ data: data })
		this.props.setPackageId(12227, true)
		setTimeout(() => {
			this.props.history.push('/searchpackages')
		}, 100)
		// this.props.history.push('/thyrocare-aarogyam-packages')
	}

	closeLeadForm(isProceed){
		let proceed = false
		let data={}
		if(isProceed){
			if(this.state.name == ''){
				SnackBar.show({ pos: 'bottom-center', text: "Please enter name" })
				return	
			}
			if(this.state.phone_number == ''){
				SnackBar.show({ pos: 'bottom-center', text: "Please enter phone number" })
				return	
			}
			if(!this.state.city_id){
				return	
			}
			if(this.state.city_name == ''){
				SnackBar.show({ pos: 'bottom-center', text: "Please select city" })
				return	
			}
			if(this.state.phone_number.length < 10 || this.state.phone_number.length > 10){
				SnackBar.show({ pos: 'bottom-center', text: "Please enter valid number" })
				return
			}
			if(this.state.name !='' && this.state.phone_number !='' && this.state.city_id && this.state.city_name !=''){
				data.name = this.state.name
				data.phone_number = this.state.phone_number
				data.city_id = this.state.city_id
				data.city_name = this.state.city_name
				if(this.state.leadType  == 1){
					data.lead_source = 'med_doc'
				}else if(this.state.leadType  == 2){
					data.lead_source = 'med_test'
				}else if(this.state.leadType  == 3){
					data.lead_source = 'med_searchmore'
				}else if(this.state.leadType  == 4){
					data.lead_source = 'med_package'
				}
				
				this.props.submitMedicineLead(data,(resp)=>{
					if(resp){
						if(this.state.leadType == 1){
							this.selectDoctorSpecialization(this.state.clickedData)
						}else if(this.state.leadType == 2){
							this.selectTest(this.state.clickedData)
						}else if(this.state.leadType == 3){
							this.openSearchMore()
						}else if(this.state.leadType == 4){
							this.goToPackage()
						}
					}
				})
			}
		}else{
			let data = {
			'Category': 'ConsumerApp', 'Action': 'SkipMedLeadClick', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'skip-med-lead-click', 'from': 'footerWidget'
			}
			GTM.sendEvent({ data: data })
			if(this.state.leadType == 1){
				this.selectDoctorSpecialization(this.state.clickedData)
			}else if(this.state.leadType == 2){
				this.selectTest(this.state.clickedData)
			}else if(this.state.leadType == 3){
				this.openSearchMore()
			}else if(this.state.leadType == 4){
				this.goToPackage()
			}
		}
	}

	handleChange(event){
		this.setState({
			[event.target.getAttribute('data-param')]: event.target.value
		})		
	}

	handleInut(type, event) {
    	try{
	    	let search_string = event.target.value.toLowerCase()
	    	let filtered_city_list = []
	    	this.props.user_cities.map((city)=>{
	    		let city_name = (city.name).toLowerCase()
	    		if(city_name.includes(search_string)){
	    			let index = city_name.indexOf(search_string)
	    			filtered_city_list.push({id: city.id, name: city.name, rank: index})
	    		}
	    	})
	    	filtered_city_list = filtered_city_list.sort((x,y)=>{
	    		return x.rank-y.rank
	    	})
	    	this.setState({[type]: event.target.value, filtered_city_list: filtered_city_list})
	    }catch(e) {

	    }
    }

    onFocusIn(){
    	this.setState({ search_city:'', showCitySearchPopup: true })
    }

    onFocusOut(){
    	setTimeout(()=>{
    		this.setState({ search_city: this.state.selectedDoctor, showCitySearchPopup: false })	
    	},500)
    	
    }

    clickDoctorList(name,id) {
    	this.setState({'city_name': name, 'city_id':id, filtered_city_list:[], search_city: name, showCitySearchPopup: false}) 
    }

	render() {
		let { footerWidget } = this.props
		let filtered_doctor = this.state.filtered_city_list
		return (
			<React.Fragment>
				{
					footerWidget && footerWidget.widget_type ?
						<div className="doc-wdgt-med-container">
							{
								footerWidget.widget_type == 'LabTest' ?
									<div className="doc-wdgt-book-doc">
										<img className="docClosBtn" src="https://cdn.docprime.com/cp/assets/img/icons/close.png" onClick={() => this.props.handleClose()} />
										<h3 className="doc-wdgt-hdng">{`${footerWidget.title} @`}<span>{footerWidget.discount}</span></h3>
										<div className="doc-wdgt-chips">
											{
												Object.entries(footerWidget.test).map((data, key) => {
													return <span key={key} onClick={this.selectTest.bind(this, data)}>{data[0]}</span>
												})
											}
											<span className="src-spn-chps" onClick={this.openSearchMore.bind(this)}><img className="srh-img-chps" src={ASSETS_BASE_URL + '/img/shape-srch1.svg'} />Search more</span>
										</div>
									</div>
									: ''
							}

							{
								footerWidget.widget_type == 'DoctorAppointment' ?
									<div className="doc-wdgt-book-doc">
										<img className="docClosBtn" src="https://cdn.docprime.com/cp/assets/img/icons/close.png" onClick={() => this.props.handleClose()} />
										<h3 className="doc-wdgt-hdng">{`${footerWidget.title} @`}<span>{footerWidget.discount}</span></h3>
										<div className="doc-wdgt-chips">
											{
												Object.entries(footerWidget.specializations).map((data, key) => {
													return <span key={key} onClick={this.selectDoctorSpecialization.bind(this, data)}>{data[0]}</span>
												})
											}
											<span className="src-spn-chps" onClick={this.openSearchMore.bind(this)}><img className="srh-img-chps" src={ASSETS_BASE_URL + '/img/shape-srch1.svg'} />Search more</span>
										</div>
									</div>
									: ''
							}

							{/* third banner */}
							{/* {
								footerWidget.widget_type == 'HealthPackage' ?
									<div className="doc-wdgt-bodychk-cont">
										<img className="docClosBtn" src="https://cdn.docprime.com/cp/assets/img/icons/close.png" onClick={()=>this.props.handleClose()}/>

										<div className="row cursor-pntr" onClick={this.goToPackage.bind(this)}>
											<div className="col-7">
												<h3 className="wdgt-bodychk-heding">{footerWidget.title_first}</h3>
												<p className="bodychk-prc">@ <span className="bdy-pr">{footerWidget.price}</span> <span className="bdy-only">only</span> </p>
												<p className="bdychk-dtls">{footerWidget.title_last}</p>
											</div>
											<div className="col-5 d-flex align-item-center">
												<img className="bdychk-img img-fluid" src={ASSETS_BASE_URL + '/img/doc-wd.png'} />
											</div>
										</div>
									</div>
									: ''
							} */}
							{
								footerWidget.widget_type == 'HealthPackage' ?
									<div className="doc-wdgt-bodychk-cont">
										<img className="docClosBtn" src="https://cdn.docprime.com/cp/assets/img/icons/close.png" onClick={() => this.props.handleClose()} />
										<div className="doc-bdy-chk-hdng">
											<h4>{footerWidget.title_first}</h4>
										</div>
										<div className="row cursor-pntr no-gutters" onClick={this.goToPackage.bind(this)}>
											<div className="col-8">
												<div className="doc-wdgt-prck">
													{/*<span className="doc-wd-cut">₹799</span>*/}
													<span className="doc-wd-nw">{footerWidget.price}</span>
												</div>
												{/*<p className="dc-wd-tst">
													60 tests
													</p>*/}
												<p className="dc-wd-tst-nm">{footerWidget.title_last}</p>
											</div>
											<div className="col-4 d-flex align-item-center justyfy-center">
												<button className="dc-wd-bdy-btn">Know More</button>
											</div>
										</div>
									</div>
									: ''
							}
						</div>
						: ''
				}

				{this.state.show_form?<div className="search-el-popup-overlay cancel-overlay-zindex">
					   <div className="search-el-popup ipd-pop-width">
					      <div className="widget p-12">
					         <div className="p-relative">
					            <p className="ipd-needHelp">Talk to medical expert and get help with your booking</p>
					            <div className="ipd-pop-scrl">
					               <div className="ipd-inp-section">
					                  <div className="nm-lst-inputcnt">
					                  	<input type="text" value="" name="name" placeholder="*Name" autoComplete={null} onChange={this.handleChange.bind(this)} data-param='name' value={this.state.name}/>
					                  </div>
					                  <input type="number" value="" name="phone_number" autoComplete="none" placeholder="*Mobile Number" onChange={this.handleChange.bind(this)} data-param="phone_number" value={this.state.phone_number}/>
					                  <div className="ipd-slects-doc">
									  <input type="text" autoComplete="none" placeholder='Search City' onChange={this.handleInut.bind(this, 'search_city')} onFocus = {this.onFocusIn.bind(this)} onBlur={this.onFocusOut.bind(this)} value={this.state.search_city}/>
											{
												this.state.showCitySearchPopup?
												<div className="doc-srch-fltr" onClick={(e)=>e.preventDefault()}>
												{
													
													this.state.filtered_city_list && this.state.filtered_city_list.length?
														this.state.filtered_city_list.map((data, key)=>{
															return <p className="cursor-pntr" key={key} id={data.id} onClick={(e)=>{
																e.preventDefault();
																e.stopPropagation();
																this.clickDoctorList(data.name,data.id)} }>
																{data.name}</p>
														})
														:this.state.search_city != '' ?<p>No result found</p>:''
												}
												</div>
												:''
											}
									  </div>
					                  <div className="skip-btn-sgn">
					                     <button className="ipd-inp-sbmt" onClick={this.closeLeadForm.bind(this,true)}>Submit</button>
					                     <p onClick={this.closeLeadForm.bind(this,false)}>Skip</p>
					                  </div>
					               </div>
					            </div>
					         </div>
					      </div>
					   </div>
				</div>:""}
			</React.Fragment>
		)
	}
}

export default FooterWidgetView;