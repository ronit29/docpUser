import React from 'react'
import SnackBar from 'node-snackbar'
import Calendar from 'rc-calendar'
const moment = require('moment')

class InsuranceSelf extends React.Component{
	constructor(props) {
        super(props)
        this.state = {
        	name:'',
        	middle_name:'',
        	last_name:'',
        	email:'',
        	gender:'',
        	dob:'',
        	pincode:'',
        	address:'',
        	title:'',
        	id:'',
        	relation:'self',
        	member_type:'adult',
           	state:'',
           	town:'',
           	district:'',
        	profile_flag:true,
        	// show_lname: this.props.no_lname,
        	// show_lname_flag:this.props.no_lname,
        	profile_id: null,
    	    dateModal:false,
    	    state_code:'',
    	    district_code:'',
    	    town_code:'',
    	    selectedDateSpan:new Date(),
    	    no_lname:false,
    	    isDisable:false

        }
    	this.handleSubmit = this.handleSubmit.bind(this);
    	this.handleTitle = this.handleTitle.bind(this);
    	this.handleEmail = this.handleEmail.bind(this);
    }
    componentDidMount(){
    	let profile 
    	if(this.props.self_data_values[this.props.USER.defaultProfile]){
    		profile= Object.assign({}, this.props.self_data_values[this.props.USER.defaultProfile])
    		this.getUserDetails(profile)
 			//this.setState({...this.props.self_data_values[this.props.USER.defaultProfile]},()=>{
	    		//if(this.state.gender == 'm'){
				// 	this.setState({title:'mr.'},()=>{
				// 		 this.handleSubmit()
				// 	})
				// }else if(this.state.gender == 'f'){
				// 	this.setState({title:'mrs.'},()=>{
				// 		 this.handleSubmit()
				// 	})
				// }
			//})
    	}
    }
    componentWillReceiveProps(props) {
    	let newName=[]
    	let self = this
    	let profileLength = Object.keys(props.USER.profiles).length;
    	if(profileLength > 0 && this.state.profile_flag){
	    	if(Object.keys(props.self_data_values).length>0){
	    		let isDummyUser = props.USER.profiles[props.USER.defaultProfile].isDummyUser
	    		let profile
	    		if(!isDummyUser){
	    			profile= Object.assign({}, props.self_data_values[props.USER.defaultProfile])
	    		}else{
	    			profile= Object.assign({}, props.self_data_values[0])
	    		} 
		    	if(Object.keys(profile).length){
		    		this.setState({...profile,isDisable:true},() =>{
		    			if(profile.gender == 'm'){
							this.setState({title:'mr.'},()=>{
								 this.handleSubmit()
							})
						}else if(profile.gender == 'f'){
							this.setState({title:'mrs.'},()=>{
								 this.handleSubmit()
							})
						}
		    		})	
		    	}else{
		    		this.setState({profile_flag:false})
		    		let new_profile = props.USER.profiles[props.USER.defaultProfile]
					this.getUserDetails(new_profile)
		    	}
	    	}else if(props.USER.profiles[props.USER.defaultProfile]){
		    	this.setState({profile_flag:false})
		    	let profile  = Object.assign({}, props.USER.profiles[props.USER.defaultProfile])
					newName =  profile.name.split(" ")
					this.getUserDetails(profile)
    		}	    	
    	}
    }
    getUserDetails(profile){
		let newName=[]
	    newName =  profile.name.split(" ")
	    if(newName.length == 2){
	    	this.setState({
			name:profile.isDummyUser?'':newName[0],
			last_name:profile.isDummyUser?'':newName[1]})
	    }else if(newName.length ==3){
	    	this.setState({name:profile.isDummyUser?'':newName[0],
			last_name:profile.isDummyUser?'':newName[2],
			middle_name:profile.isDummyUser?'':newName[1]})
	    }else{
	    	this.setState({name:profile.isDummyUser?'':profile.name})
	    }

	    this.setState({
	    	isDisable: profile.isDummyUser?false:true,
			gender:profile.isDummyUser?'':profile.gender,
			email:profile.isDummyUser?'':profile.email,
			dob:profile.isDummyUser?'':profile.dob,
			id:profile.isDummyUser?0:profile.id},() =>{
			if(profile.gender == 'm'){
				this.setState({title:'mr.'})
			}else if(profile.gender == 'f'){
				if(this.props.selected_plan.adult_count== 2){
					this.setState({title:'mrs.'})	
				}else{
					this.setState({title:'miss'})
				}	
			}
			this.handleSubmit()
		})

	}
    handleChange(field,event) { 
    	this.setState({
    		[event.target.getAttribute('data-param')] : event.target.value
    	})
  	}
  	handleOnFocus(field,event){
  		// if(event.target.nextElementSibling.nextElementSibling){
  		// 	event.target.nextElementSibling.nextElementSibling.classList.add('field-icon')
  		// }
  	}
  	handleTitle(field,event){
  		let title_value = event.target.value
  		if(title_value == 'mr.'){
  			this.setState({gender:'m'})	
  		}else if(title_value == 'miss' || title_value == 'mrs.'){
  			this.setState({gender:'f'})	
  		}
        this.setState({title:event.target.value},()=>{
    		var self_data=this.state
  			this.props.userData('self_data', self_data)
    	})
  	}
	handleSubmit() {
		let profile  = Object.assign({}, this.props.USER.profiles[this.props.USER.defaultProfile])
    	if(!profile.isDummyUser){
    		this.setState({profile_id:this.props.member_id})
    	}else{
    		this.setState({profile_id:null})
    	}
	    var self_data=this.state
	    if(self_data.name !== ''){
	    	if(self_data.name.length > 50){
				self_data.name = self_data.name.slice(0, 50)
			}	
	    }
	    if(self_data.middle_name !== ''){
	    	if(self_data.middle_name.length > 50){
				self_data.middle_name = self_data.middle_name.slice(0, 50)
			}	
	    }
	    if(self_data.last_name !== ''){
	    	if(self_data.last_name.length > 50){
				self_data.last_name = self_data.last_name.slice(0, 50)
			}	
	    }
	    this.props.userData('self_data', self_data)
	}
	handlekey(event){
		if(this.state.pincode.length == 6){
			event.preventDefault();
        }
	}
	handleNameCharacters(field,event){
		if(field == 'name'){
			if(this.state.name.length == 50){
				event.preventDefault();
	        }
    	}else if(field == 'last_name'){
			if(this.state.last_name.length == 50){
				event.preventDefault();
	        }
    	}else if(field == 'middle_name'){
			if(this.state.middle_name.length == 50){
				event.preventDefault();
	        }
    	}

	}
	handleEmail(){
	let formIsValid = true;
		if(this.state.email !=''){
		let validEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  			validEmail = validEmail.test(this.state.email);
		if(validEmail){
			this.handleSubmit();
		}else{
			SnackBar.show({ pos: 'bottom-center', text: "Please Enter valid Email" });
		}
       }
	}
	handleGender(field, event) {
		let gender_value = event.target.value
  		if(gender_value == 'm'){
  			this.setState({title:'mr.'})	
  		}else if(gender_value == 'f'){
  			this.setState({title:'mrs.'})	
  		}
		this.setState({
			gender: event.target.value
		},() =>{
			this.handleSubmit(event)
		})
	}
	openDateModal() {
	        this.setState({ dateModal: !this.state.dateModal })
	}
	selectDateFromCalendar(date) {
        if (date) {
            date = date.toDate()
            var date = new Date(date)
		    let mnth = ("0" + (date.getMonth()+1)).slice(-2)
		    let day  = ("0" + date.getDate()).slice(-2);
		    let actual_date =  [ date.getFullYear(), mnth, day ].join("-");
            this.setState({ selectedDateSpan: actual_date, dateModal: false, currentDate: new Date(date).getDate(),dob: actual_date }, () => {
                this.handleSubmit()
            })
        } else {
            this.setState({ dateModal: false })
        }
    }
    handleState(event) {
		var event = document.getElementById("state_dropdown")
		this.setState({state: event.options[event.selectedIndex].value, state_code: event.options[event.selectedIndex].id},() =>{
			this.handleSubmit(event)
			
		})
	}
	handleDistrict(event) {
		var event = document.getElementById("district_dropdown")
		this.setState({district: event.options[event.selectedIndex].value, district_code: event.options[event.selectedIndex].id},() =>{
			this.handleSubmit(event)
			
		})
	}
	handleTown(event) {
		var event = document.getElementById("town_dropdown")
		this.setState({town: event.options[event.selectedIndex].value, town_code: event.options[event.selectedIndex].id},() =>{
			this.handleSubmit(event)
			
		})
	}
	handleLastname(event){
		this.setState({no_lname:!this.state.no_lname},() =>{
			this.handleSubmit(event)
		})
	}
	showAlert(){
		SnackBar.show({ pos: 'bottom-center', text: "Please select state first" });
	}
	render(){
		let self = this
		let show_createApi_keys = []
		let city_opt =[]
		let districts_opt=[]
		let commonMsgSpan = <span className="fill-error-span">{this.props.errorMessages['common_message']}</span>		
		if(Object.keys(this.props.createApiErrors).length > 0){
			Object.entries(this.props.createApiErrors).map(function([key, value]) {
					show_createApi_keys.push(key)
			})
		}
		let isDummyUser
		if(this.props.USER.profiles && Object.keys(this.props.USER.profiles).length && this.props.USER.profiles[this.props.USER.defaultProfile]){
			isDummyUser = this.props.USER.profiles[this.props.USER.defaultProfile].isDummyUser
		}
		{Object.entries(self.props.insurnaceData['state']).map(function([key, value]) {	
			if(self.state.state_code && self.state.state_code !='' && self.state.state !='' && self.state.state_code == value.gst_code){
				Object.entries(value.district).map(function([k, districts]) {
					districts_opt.push( <option key={k} data-param="district" id={districts.district_code} value={districts.district_name}>{districts.district_name}</option>)
				})
				Object.entries(value.cities).map(function([k, city]) {
					city_opt.push( <option key={k} data-param="town" id={city.city_code} value={city.city_name}>{city.city_name}</option>)
				})
			}
		})}
		let isDisable = false
		if(!isDummyUser && this.state.isDisable){
			if(this.state.name !='' && this.state.dob !='' && this.state.email !=''){
				isDisable = true
			}

		}
		return(
				<div>
				{/*
					isDisable?
						<span>Change details</span>
					:''
				*/}
				<div className="member-dtls-chk">
					<span>Proposer</span>
					<label className="ck-bx" onChange={this.handleLastname.bind(this)} style={{'fontWeight': '400', 'fontSize': '14'}}>I dont have last name<input type="checkbox" checked={this.state.no_lname} value="on"/>
					<span className="checkmark"></span></label>
				</div>
				<div className="row no-gutters" id={isDummyUser?'member_0':`member_${this.props.USER.defaultProfile}`}>
					<div className="col-12">
						{
							this.props.selected_plan.adult_count== 2?
							<div>
								<button className={`label-names-buttons ${this.state.title == 'mr.'?'btn-active':''}`} name="title" value='mr.' data-param='title' onClick={this.handleTitle.bind(this,'mr.')} >Mr.</button>
								<button className={`label-names-buttons ${this.state.title == 'mrs.'?'btn-active':''}`} value='mrs.' name="title"  data-param='title' onClick={this.handleTitle.bind(this,'mrs.')} >Mrs.</button>
							</div>
							:
							<div>
								<button className={`label-names-buttons ${this.state.title == 'mr.'?'btn-active':''}`} name="title" value='mr.' data-param='title' onClick={this.handleTitle.bind(this,'mr.')} >Mr.</button>
								<button className= {`label-names-buttons ${this.state.title == 'miss'?'btn-active':''}`} name="title" value='miss'  data-param='title' onClick={this.handleTitle.bind(this,'miss')} >Ms.</button>
								<button className={`label-names-buttons ${this.state.title == 'mrs.'?'btn-active':''}`} value='mrs.' name="title"  data-param='title' onClick={this.handleTitle.bind(this,'mrs.')} >Mrs.</button>		

							</div>
						}
						
					</div>
					<div className="col-6">
						<div className="ins-form-group inp-margin-right ">
							<input style={{'textTransform': 'capitalize'}} type="text" id={`name_${this.props.member_id}`} className={`form-control ins-form-control ${this.props.validateErrors.indexOf('name')> -1?'fill-error':''}`} required autoComplete="nope" name="name" value={this.state.name} data-param='name' onChange={this.handleChange.bind(this,'name')} onBlur={this.handleSubmit} onFocus={this.handleOnFocus.bind(this,'name')} disabled={isDisable?'disabled':''} onKeyPress={this.handleNameCharacters.bind(this,'name')}/>
							<label className={isDisable?'form-control-placeholder datePickerLabel':'form-control-placeholder'} htmlFor={`name_${this.props.member_id}`}><span className="labelDot">*</span>First Name</label>
							<img src={ASSETS_BASE_URL + "/img/user-01.svg"} />
						</div>
						{
							this.props.validateErrors.indexOf('name')> -1?
							commonMsgSpan:''
						}
						{
							show_createApi_keys.indexOf('first_name')> -1?
							<span className="fill-error-span">{this.props.errorMessages['max_character']}</span>:''	
						}
					</div>
					<div className="col-6">
						<div className="ins-form-group inp-margin-right ">
							<input style={{'textTransform': 'capitalize'}} type="text" id={`middle_name_${this.props.member_id}`} className={`form-control ins-form-control ${this.props.validateErrors.indexOf('middle_name')> -1?'fill-error':''}`} required autoComplete="none" name="middle_name" value={this.state.no_lname?'':this.state.middle_name}  data-param='middle_name' onChange={this.handleChange.bind(this,'middle_name')} onBlur={this.handleSubmit} onFocus={this.handleOnFocus.bind(this,'middle_name')} onKeyPress={this.handleNameCharacters.bind(this,'middle_name')} disabled={this.state.no_lname?'disabled':""} disabled={isDisable?'disabled':''}/>
							<label className={isDisable?'form-control-placeholder datePickerLabel':'form-control-placeholder'} htmlFor={`middle_name_${this.props.member_id}`}>Middle Name</label>
							<img src={ASSETS_BASE_URL + "/img/user-01.svg"} />
						</div>
						{
							show_createApi_keys.indexOf('middle_name')> -1?
							<span className="fill-error-span">{this.props.errorMessages['max_character']}</span>:''	
						}
					</div>
					<div className="col-6">
						<div className="ins-form-group ins-form-group inp-margin-right  ">
							<input style={{'textTransform': 'capitalize'}} type="text" id={`last_name_${this.props.member_id}`} className={`form-control ins-form-control ${this.props.validateErrors.indexOf('last_name')> -1?'fill-error':''}`} required autoComplete="none" name="last_name" value={this.state.no_lname?'':this.state.last_name} data-param='last_name' onChange={this.handleChange.bind(this,'last_name')} onBlur={this.handleSubmit} onFocus={this.handleOnFocus.bind(this,'last_name')} disabled={this.state.no_lname?'disabled':""} onKeyPress={this.handleNameCharacters.bind(this,'last_name')} disabled={isDisable?'disabled':''}/>
							<label className={isDisable?'form-control-placeholder datePickerLabel':'form-control-placeholder'} htmlFor={`last_name_${this.props.member_id}`}><span className="labelDot">*</span>Last Name</label>
							<img src={ASSETS_BASE_URL + "/img/user-01.svg"} />
						</div>
						{
							this.props.validateErrors.indexOf('last_name')> -1?
							commonMsgSpan:''
						}
						{
							show_createApi_keys.indexOf('last_name')> -1?
							<span className="fill-error-span">{this.props.errorMessages['max_character']}</span>:''	
						}
					</div>
					<div className="col-12">
						<div className="ins-form-radio">
							<div className="dtl-radio">
								<label className="container-radio">
									Male
							 <input type="radio"  name="gender" value='m' data-param='gender' checked={this.state.gender === 'm'} onChange={this.handleGender.bind(this,'m')}/>
									<span className="doc-checkmark"></span>
								</label>
							</div>
							<div className="dtl-radio">
								<label className="container-radio">
									Female
							 <input type="radio"  name="gender" value='f' data-param='gender' checked={this.state.gender === 'f'} onChange={this.handleGender.bind(this,'f')} />
									<span className="doc-checkmark"></span>
								</label>
							</div>
							<div className="dtl-radio">
								<label className="container-radio">
									Others
							 <input type="radio"  name="gender" value='o' data-param='gender' checked={this.state.gender === 'o'} onChange={this.handleGender.bind(this,'o')} />
									<span className="doc-checkmark"></span>
								</label>
							</div>
						</div>
						{
							this.props.validateErrors.indexOf('gender')> -1?
							commonMsgSpan:''
						}
						{
							show_createApi_keys.indexOf('gender')> -1?
							<span className="fill-error-span">{this.props.createApiErrors.gender[0]}</span>:''	
						}
					</div>
					<div className="col-12">
						<div className="ins-form-group">
							<input type="text" id={`emails_${this.props.member_id}`} className={`form-control ins-form-control ${this.props.validateErrors.indexOf('email')> -1?'fill-error':''}`} required autoComplete="none" name="email" value={this.state.email} data-param='email' onChange={this.handleChange.bind(this,'email')} onBlur={this.handleEmail} onFocus={this.handleOnFocus.bind(this,'email')} disabled={isDisable?'disabled':''}/>
							<label className={isDisable?'form-control-placeholder datePickerLabel':'form-control-placeholder'} htmlFor={`emails_${this.props.member_id}`}><span className="labelDot">*</span>Email</label>
							<img src={ASSETS_BASE_URL + "/img/mail-01.svg"} />
						</div>
						{
							this.props.validateErrors.indexOf('email')> -1?
							<span className="fill-error-span">{this.props.errorMessages['valid_email']}</span>:''
						}
					</div>
					<div className="col-12">
						<div className="ins-form-group">
						 	<input type="button"  id={`isn-date_${this.props.member_id}`} className={`form-control ins-form-control text-left ${this.props.validateErrors.indexOf('dob')> -1?'fill-error':''}`} required autoComplete="none" name="dob" value={this.state.dob?this.state.dob:'yyyy/mm/dd'} data-param='dob' onClick={this.openDateModal.bind(this)} />
							<label className="form-control-placeholder datePickerLabel" htmlFor="ins-date">*Date of birth</label>
    						<img src={ASSETS_BASE_URL + "/img/calendar-01.svg"} />
							{
                                    this.state.dateModal ? <div className="calendar-overlay"><div className="date-picker-modal">
                                        <Calendar
                                            showWeekNumber={false}
                                            defaultValue={moment(this.state.selectedDateSpan)}
                                            disabledDate={(date) => {
                                                return date.diff(moment((new Date)), 'days')  > 0 || date.diff(moment((new Date)), 'days') > 40
                                            }}
                                            showToday = {false}
                                            onSelect={this.selectDateFromCalendar.bind(this)}
                                        />
                                    </div></div> : ""
                                }
						</div>
						{
							this.props.validateErrors.indexOf('dob')> -1?
							<span className="fill-error-span">{this.props.errorMessages['adult_age']}</span>:''
						}
						{
								show_createApi_keys.indexOf('dob')> -1?
								<span className="fill-error-span">{this.props.createApiErrors.dob[0]}</span>:''	
						}
					</div>
					<div className="col-12">
						<div className="ins-form-group">
							<select className={`ins-select-drop ${this.props.validateErrors.indexOf('state')> -1?'fill-error':''}`} id="state_dropdown" onChange={this.handleState.bind(this)} value={this.state.state}>
								<option data-param="state"  hidden id={0} value="select_state" value="state">Select State</option>
								{Object.entries(this.props.insurnaceData['state']).map(function([key, value]) {
									return <option key={key} data-param="state" id={value.gst_code} value={value.state_name}>{value.state_name}</option>
								})}
							</select>
							{/*<input style={{'textTransform': 'capitalize'}} type="text" id={`isnstate_${this.props.member_id}`} className={`form-control ins-form-control ${this.props.validateErrors.indexOf('state')> -1?'fill-error':''}`} required autoComplete="none" name="state" value={this.state.state} data-param='state' onChange={this.handleChange.bind(this,'state')} onBlur={this.handleSubmit} onFocus={this.handleOnFocus.bind(this,'state')}/>*/}
							<label className="form-control-placeholder datePickerLabel" htmlFor={`isnstate_${this.props.member_id}`}>*State</label>
							<img src={ASSETS_BASE_URL + "/img/location-01.svg"} />
						</div>
						{
							this.props.validateErrors.indexOf('state')> -1?
							commonMsgSpan:''
						}
						{
							show_createApi_keys.indexOf('state')> -1?
							<span className="fill-error-span">{this.props.createApiErrors.state[0]}</span>:''	
						}
					</div>
					<div className="col-12">
						<div className="ins-form-group">
							{
								this.state.state == ''?
									<div onClick={this.showAlert.bind(this)}> 
										<input style={{'textTransform': 'capitalize',fontWeight: '100',    color: 'gray'}} type="text" id={`isndistrict_${this.props.member_id}`} className={`form-control ins-form-control ${this.props.validateErrors.indexOf('district')> -1?'fill-error':''}`} required autoComplete="none" name="district" value="Select District" disabled data-param='district'/>
											<label className="form-control-placeholder datePickerLabel" htmlFor={`isndistrict_${this.props.member_id}`}>*District</label>
											<img src={ASSETS_BASE_URL + "/img/location-01.svg"} />

									</div>
								:
								<div>
								<select className={`ins-select-drop ${this.props.validateErrors.indexOf('district')> -1?'fill-error':''}`} id="district_dropdown" onChange={this.handleDistrict.bind(this)} value={this.state.district}>
								<option data-param="district"  hidden id={0} value="select_district" value="district">Select District</option>
								{districts_opt}
								</select>
								<label className="form-control-placeholder datePickerLabel" htmlFor={`isndistrict_${this.props.member_id}`}>*District</label>
								<img src={ASSETS_BASE_URL + "/img/location-01.svg"} />
								</div>
							}


							{/*<input style={{'textTransform': 'capitalize'}} type="text" id={`isndistrict_${this.props.member_id}`} className={`form-control ins-form-control ${this.props.validateErrors.indexOf('district')> -1?'fill-error':''}`} required autoComplete="none" name="district" value={this.state.district} data-param='district' onChange={this.handleChange.bind(this,'district')} onBlur={this.handleSubmit} onFocus={this.handleOnFocus.bind(this,'district')} />
							<label className="form-control-placeholder" htmlFor={`isndistrict_${this.props.member_id}`}>District</label>
							<img src={ASSETS_BASE_URL + "/img/location-01.svg"} />*/}
						</div>
						{	
							this.props.validateErrors.indexOf('district')> -1?
							commonMsgSpan:''
						}
						{
								show_createApi_keys.indexOf('district')> -1?
								<span className="fill-error-span">{this.props.createApiErrors.district[0]}</span>:''	
						}
					</div>
					<div className="col-12">
						<div className="ins-form-group">
							{
								this.state.state == ''?<div onClick={this.showAlert.bind(this)}> 
										<input style={{'textTransform': 'capitalize',fontWeight: '100',    color: 'gray'}} type="text" id={`isndistrict_${this.props.member_id}`} className={`form-control ins-form-control ${this.props.validateErrors.indexOf('town')> -1?'fill-error':''}`} required autoComplete="none" name="town" value="Select Town" disabled data-param='town'/>
											<label className="form-control-placeholder datePickerLabel" htmlFor={`isndistrict_${this.props.member_id}`}>*Town</label>
											<img src={ASSETS_BASE_URL + "/img/location-01.svg"} />
									</div>
								:<div>	
									<select className={`ins-select-drop ${this.props.validateErrors.indexOf('town')> -1?'fill-error':''}`} id="town_dropdown" onChange={this.handleTown.bind(this)} value={this.state.town} disabled={this.state.state ==''?true:false}>
										<option data-param="town"  hidden id={0} value="select_town" value="town">Select Town</option>
										{city_opt}
									</select>
									<label className="form-control-placeholder datePickerLabel" htmlFor={`isntown_${this.props.member_id}`}>*Town</label>
									<img src={ASSETS_BASE_URL + "/img/location-01.svg"} />
								</div>
							}

							{/*<input style={{'textTransform': 'capitalize'}} type="text" id={`isntown${this.props.member_id}`} className={`form-control ins-form-control ${this.props.validateErrors.indexOf('town')> -1?'fill-error':''}`} required autoComplete="none" name="town" value={this.state.town} data-param='town' onChange={this.handleChange.bind(this,'town')} onBlur={this.handleSubmit} onFocus={this.handleOnFocus.bind(this,'town')}/>
							<label className="form-control-placeholder" htmlFor={`isntown${this.props.member_id}`}>Town</label>
							<img src={ASSETS_BASE_URL + "/img/location-01.svg"} />*/}
						</div>
						{
							this.props.validateErrors.indexOf('town')> -1?
							commonMsgSpan:''
						}
						{
								show_createApi_keys.indexOf('town')> -1?
								<span className="fill-error-span">{this.props.createApiErrors.town[0]}</span>:''	
						}
					</div>
					<div className="col-12">
						<div className="ins-form-group">
							<input style={{'textTransform': 'capitalize'}} type="text" id={`insaddress${this.props.member_id}`} className={`form-control ins-form-control ${this.props.validateErrors.indexOf('address')> -1?'fill-error':''}`} required autoComplete="none" name="address" value={this.state.address} data-param='address' onChange={this.handleChange.bind(this,'address')} onBlur={this.handleSubmit} onFocus={this.handleOnFocus.bind(this,'address')} />
							<label className="form-control-placeholder" htmlFor={`insaddress${this.props.member_id}`}><span className="labelDot">*</span>Full Address</label>
							<img src={ASSETS_BASE_URL + "/img/location-01.svg"} />
						</div>
						{
							this.props.validateErrors.indexOf('address')> -1?
							commonMsgSpan:''
						}
						{
							show_createApi_keys.indexOf('address')> -1?
							<span className="fill-error-span">{this.props.createApiErrors.address[0]}</span>:''	
						}
					</div>
					<div className="col-12">
						<div className="ins-form-group">
							<input type="number" id={`isnpin_${this.props.member_id}`} className={`form-control ins-form-control ${this.props.validateErrors.indexOf('pincode')> -1?'fill-error':''}`} required autoComplete="none" name="pincode" value={this.state.pincode} data-param='pincode' onKeyPress={this.handlekey.bind(this)} onChange={this.handleChange.bind(this,'pincode')} onBlur={this.handleSubmit} onFocus={this.handleOnFocus.bind(this,'pincode')}/>
							<label className="form-control-placeholder" htmlFor={`isnpin_${this.props.member_id}`}><span className="labelDot">*</span>Pincode</label>
							<img src={ASSETS_BASE_URL + "/img/location-01.svg"} />
						</div>
						{
							this.props.validateErrors.indexOf('pincode')> -1?
							commonMsgSpan:''
						}
						{
							this.props.validateOtherErrors.indexOf('pincode')> -1?
							<span className="fill-error-span">*Please Enter Valid Pincode</span>:''	
						}
						{
							show_createApi_keys.indexOf('pincode')> -1?
							<span className="fill-error-span">{this.props.createApiErrors.pincode[0]}</span>:''	
						}
					</div>
					<div>
					</div>
				</div>
				</div>
			)
	}

}

export default InsuranceSelf