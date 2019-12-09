import React from 'react'
import SnackBar from 'node-snackbar'
import Calendar from 'rc-calendar'
import InsuranceProofs from './insuranceProofs.js'
import VerifyEmail from './verifyEmail.js'
import VipLoginPopup from './vipClubPopup.js'
const moment = require('moment')

class VipProposer extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			name: '',
			last_name: '',
			email: '',
			gender: '',
			dob: '',
			title: '',
			id: this.props.member_id,
			relation: 'SELF',
			profile_flag: true,
			profile_id: null,
			is_change: false,
			year: '',
			mnth: '',
			day: '',
			profile:'',
			relation_key:'SELF',
			member_form_id:this.props.member_form_id,
			userProfiles:{},
			showPopup:false,
			isUserSelectedProfile:this.props.isUserSelectedProfile,
			phone_number:'',
			disableTitle:false,
			disableFName: false,
			disableLName: false,
			disableEmail: false,
			disablePhoneNo:false,
			disableDob: false,
			is_tobe_dummy_user:false
		}
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleTitle = this.handleTitle.bind(this);
		this.handleEmail = this.handleEmail.bind(this);
	}
	componentDidMount() {
		let profile
		let isDummyUser
		let profileLength = Object.keys(this.props.USER.profiles).length;
		if (profileLength > 0 && this.props.vipClubMemberDetails[this.props.member_id] && !this.props.is_from_payment) {
			if (!isDummyUser) {
				profile = Object.assign({}, this.props.vipClubMemberDetails[this.props.member_id])
			} else {
				profile = Object.assign({}, this.props.vipClubMemberDetails[this.props.member_id])
			}
			if(Object.keys(profile).length > 0){
				isDummyUser = this.props.USER.profiles[this.props.USER.defaultProfile].isDummyUser
				if(profile.isDummyUser){
					profile.id = 0
					this.setState({id:0},()=>{
						this.populateDates()
	    				this.getUserDetails(profile)	
	    			})
				}else{
					this.setState({id:profile.id},()=>{
						this.populateDates()
	    				this.getUserDetails(profile)	
	    			})
				}
			}
		}
	}
	componentWillReceiveProps(props) {
		let self = this
		let profileLength = Object.keys(props.USER.profiles).length;
		if (profileLength > 0 && this.state.profile_flag && !props.is_from_payment) {
			let isDummyUser = props.USER.profiles[props.USER.defaultProfile].isDummyUser
			if (Object.keys(props.vipClubMemberDetails).length > 0) {
				let profile
				if (!isDummyUser) {
					profile = Object.assign({}, props.vipClubMemberDetails[props.member_id])
				} else {
					profile = Object.assign({}, props.vipClubMemberDetails[props.member_id])
				}				
				if(profile && Object.keys(profile).length){
					this.setState({id:profile.id,profile_flag:false},()=>{
						this.populateDates()
			    		this.getUserDetails(profile)	
			    	})
			    }
			}else if (props.USER.profiles[props.USER.defaultProfile]) {
				let profile
				if(props.savedMemberData && props.savedMemberData.length > 0){
					profile = props.savedMemberData.filter((x=>x.id == props.member_id))

					if(profile && profile.length > 0){
						profile = profile[0]
						this.setState({id:profile.id,profile_flag:false},()=>{
							this.populateDates()
			    			this.getUserDetails(profile)	
			    		})
					}
				}else{
					profile = Object.assign({}, props.USER.profiles[props.USER.defaultProfile])
					if (profile && Object.keys(profile).length) {
						if(profile.isDummyUser){
							profile.id = 0
							this.setState({id:0,profile_flag:false},()=>{
								this.populateDates()
			    				this.getUserDetails(profile)	
			    			})
						}else{
							this.setState({id:profile.id,profile_flag:false},()=>{
								this.populateDates()
			    				this.getUserDetails(profile)	
			    			})
						}
					}
				}
			}
		}
		// else if(props.is_from_payment && this.state.profile_flag && Object.keys(props.vip_club_db_data).length >0){
		// 	let profile ={}
		// 	let newProfile = {}
		// 	if(props.vip_club_db_data && Object.keys(props.vip_club_db_data.data).length >0 && props.vip_club_db_data.data.user && Object.keys(props.vip_club_db_data.data.user).length > 0 && props.vip_club_db_data.data.user.plus_members && props.vip_club_db_data.data.user.plus_members.length > 0){
		// 		if(props.vipClubMemberDetails && Object.keys(props.vipClubMemberDetails).length > 0){
		// 			props.currentSelectedVipMembersId.map((val,key) => {
		//     			newProfile =props.vipClubMemberDetails[val[key]]
		//     			if(newProfile && newProfile.relation == 'SELF'){
		//     				profile = props.vipClubMemberDetails[val[key]]
		//     			}
		// 	    	})
		// 	    	if (profile && Object.keys(profile).length) {
		// 	    		this.setState({id:profile.profile,profile_flag:false},()=>{
		// 	    			this.populateDates()
		// 	    			this.getUserDetails(profile)	
		// 	    		})
		// 			}
		// 		}else{
		// 	    	props.vip_club_db_data.data.user.plus_members.map((val,key) => {
		// 				if(val.relation == 'SELF'){
		// 					profile = Object.assign({}, val)
		// 				}
		// 			})
		// 	    	if (profile && Object.keys(profile).length) {
		// 	    		this.setState({id:profile.profile,profile_flag:false},()=>{
		// 	    			this.populateDates()
		// 	    			this.getUserDetails(profile)	
		// 	    		})
		// 			}
		// 		}
		// 	}
		// }
	}

	togglePopup(newProfileid, member_id, newProfile) {
		let oldDate
		let finalDate
		if(newProfileid !== ''){
			this.setState({...newProfile,relation:null,relation_key:null,profile_flag:true})
			if (newProfile.gender == 'm') {
				this.setState({ title: 'mr.' })
			} else if (newProfile.gender == 'f') {
				this.setState({ title: 'miss' })
			}
			if(newProfile && newProfile.dob){
				oldDate= newProfile.dob.split('-')
				this.setState({year:oldDate[0],mnth:oldDate[1],day:oldDate[2]},()=>{
	    			this.populateDates(newProfileid,false)
	    			finalDate = this.state.year + '-'+ this.state.mnth + '-'+this.state.day 
	    			this.setState({dob:finalDate})
	    		})
			}else{
				this.populateDates(newProfileid,false)
			}
			newProfile.isUserSelectedProfile=true
			newProfile.is_tobe_dummy_user = false
			// this.props.selectInsuranceProfile(newProfileid, member_id, newProfile, this.props.param_id)
			this.props.selectVipUserProfile(newProfileid, member_id, newProfile, 0)
			this.setState({
				showPopup: !this.state.showPopup,
				profile_id: newProfileid,
				id:newProfileid
			},() =>{
				this.handleSubmit(false);
			})
		}else{
			this.setState({showPopup: !this.state.showPopup})
		}
	}

	hideSelectProfilePopup() {
        this.setState({
            showPopup: false
        });
    }

	getUserDetails(profile) {
		let newName = []
		let oldDate
		let tempArray
		// this.populateDates()
		let empty_state ={}
		if(profile.is_tobe_dummy_user){
			this.setState({...empty_state,phone_number:''})
		}

		if(Object.keys(profile).length > 0){
			if(this.props.is_from_payment){
				if(profile.first_name){
					this.setState({name:profile.first_name?profile.first_name:profile.name?profile.name:''})
				}
			}
			if(profile.gender == 'm'){
				this.setState({gender:profile.gender?profile.gender:'',title: 'mr.'})
			}else if(profile.gender == 'f'){
				this.setState({gender:profile.gender?profile.gender:'',title: 'miss'})
			}
			if (profile.isDummyUser && profile.dob) {
				this.setState({ day: null, year: null, mnth: null })
				this.populateDates()
			} else if (Object.keys(profile).length > 0 && profile.dob) {
				oldDate = profile.dob.split('-')
				this.setState({ year: oldDate[0], mnth: oldDate[1], day: oldDate[2] }, () => {
					this.populateDates()
				})
			} else {
				this.populateDates()
			}
			if(profile.id){
				this.setState({profile_id:profile.id?profile.id:''})
			}
			if(profile.profile){
				this.setState({profile_id:profile.profile?profile.profile:''})
			}
			this.setState({
				email: profile.email ? profile.email :'',
				dob: profile.dob ? profile.dob :''
			})
			this.setState({...profile},()=>{
				if(profile.name){
					if(profile.name == 'User' || profile.name == 'user'){
						profile.name = ''
						this.setState({ name:profile.name})
					}else{
						if(profile.name){
							newName = profile.name.split(" ")
							if (newName.length == 2) {
								this.setState({name: newName[0],last_name: newName[1],disableFName:!profile.isDummyUser?true:false,disableLName:!profile.isDummyUser?true:false})
							}  else if (newName.length > 2) {
								tempArray = newName.slice(1, newName.length)
								this.setState({disableLName:true,name: newName[0],last_name: tempArray.join(' '),disableFName:!profile.isDummyUser?true:false})
							} else {
								this.setState({ name:profile.name?profile.name:'', disableFName:!profile.isDummyUser?true:false })
							}
						}
					}
				}
				this.handleSubmit(false,false)
			})
			if(!profile.isDummyUser && profile.name != '' && (profile.email != null || profile.email !='') && (profile.dob != null || profile.dob !='')){
				this.setState({disableTitle:true})
			}
			this.setState({
				disableEmail: !profile.isDummyUser && profile.email !== '' ? true : false,
				disableDob: !profile.isDummyUser && profile.dob != null ? true : false,
				disableDob: !profile.isDummyUser && profile.dob !== '' ? true : false,
				disablePhoneNo: !profile.isDummyUser && profile.phone_number !== '' ? true: false	
			})
			if(profile.is_tobe_dummy_user){
				this.setState({disableFName:false,disableEmail:false,disableDob:false,disablePhoneNo:false,disableLName:false,disableName:false,phone_number:'',disableTitle:false,is_tobe_dummy_user:profile.is_tobe_dummy_user})
			}
		}
	}

	handleChange(field, event) {
		this.setState({
			[event.target.getAttribute('data-param')]: event.target.value
		})
	}

	handleTitle(field, event) {
		let title_value = event.target.value
		if (title_value == 'mr.') {
			this.setState({ gender: 'm' })
		} else if (title_value == 'miss' || title_value == 'mrs.') {
			this.setState({ gender: 'f' })
		}
		this.setState({ title: event.target.value }, () => {
			var self_data = this.state
			self_data.is_change = true
			// this.props.userData('self_data', self_data)
			this.props.userDetails('self_data', self_data)
		})
	}

	handleSubmit(is_endoresment,is_endorse_email) {
		let profile = Object.assign({}, this.props.USER.profiles[this.props.USER.defaultProfile])
		if (!profile.isDummyUser && this.props.member_id > 0) {
			this.setState({ profile_id: this.props.member_id })
		} else {
			this.setState({ profile_id: null })
		}
		var self_data = this.state
		if (!is_endoresment && !is_endorse_email) {
			self_data.is_change = true
			self_data.first_name = self_data.name
		}
		this.props.userDetails('self_data', self_data)
	}

	handleNameCharacters(field, event) {
		if (field == 'name') {
			if (this.state.name.length == 50) {
				event.preventDefault();
			}
		} else if (field == 'last_name') {
			if (this.state.last_name.length == 50) {
				event.preventDefault();
			}
		}
	}

	handleEmail() {
		let formIsValid = true;
		if (this.state.email != '') {
			let validEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			validEmail = validEmail.test(this.state.email);
			if (validEmail) {
				this.handleSubmit(false,false);
			} else {
				SnackBar.show({ pos: 'bottom-center', text: "Please Enter valid Email" });
			}
		}
	}

	populateDates() {
		let self = this
		let default_months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']
		var daydropdown = document.getElementById("daydropdown_" + this.props.member_id),
			monthdropdown = document.getElementById("monthdropdown_" + this.props.member_id),
			yeardropdown = document.getElementById("yeardropdown_" + this.props.member_id);
		let age_threshold = 150
		var today = new Date(),
			day = today.getUTCDate(),
			month = today.getUTCMonth(),
			year = today.getUTCFullYear() - age_threshold,
			currentYear = today.getUTCFullYear(),
			daysInCurrMonth = 31;

		daydropdown.innerHTML = ''
		monthdropdown.innerHTML = ''
		yeardropdown.innerHTML = ''

		var opt_dd = document.createElement('option');
		opt_dd.value = 'DD'
		opt_dd.text = 'DD'
		opt_dd.hidden = true
		daydropdown.appendChild(opt_dd);
		var opt_mm = document.createElement('option');
		opt_mm.value = 'MM'
		opt_mm.text = 'MM'
		opt_mm.hidden = true
		monthdropdown.appendChild(opt_mm);
		var opt_yy = document.createElement('option');
		opt_yy.value = 'YYYY'
		opt_yy.text = 'YYYY'
		opt_yy.hidden = true
		yeardropdown.appendChild(opt_yy);

		// Day
		for (var i = 1; i <= daysInCurrMonth; i++) {
			var opt = document.createElement('option');
			if (i <= 9) {
				opt.value = '0' + i;
				opt.text = '0' + i;
			} else {
				opt.value = i;
				opt.text = i;
			}

			daydropdown.appendChild(opt);
		}
		// Month
		for (var i = 0; i < 12; i++) {
			var opt = document.createElement('option');
			opt.value = 'MM'
			opt.text = 'MM'
			opt.value = default_months[i]
			opt.text = default_months[i]
			monthdropdown.appendChild(opt);
		}

		// Year
		for (var i = 0; i <= age_threshold; i++) {
			var opt = document.createElement('option');
			opt.value = 'YYYY'
			opt.text = 'YYYY'
			opt.value = i + year;
			opt.text = i + year;
			yeardropdown.appendChild(opt);
		}

		// change handler for day
		daydropdown.onchange = function () {
			var NewSelecteddays = daydropdown.value;
			self.setState({ day: NewSelecteddays }, () => {
				self.submitDob()
			})
		}

		// Change handler for months
		monthdropdown.onchange = function () {

			var newMonth = monthdropdown.value
			self.setState({ mnth: newMonth }, () => {
				self.submitDob()
			})
		}

		// change handler for year
		yeardropdown.onchange = function () {
			var newYear = yeardropdown.value;
			self.setState({ year: newYear }, () => {
				self.submitDob()
			})
		}
	}

	submitDob() {
		let self = this
		if (self.state.day && self.state.mnth && self.state.year) {
			let finalDate = self.state.year + '-' + self.state.mnth + '-' + self.state.day
			self.setState({
				dob: finalDate
			}, () => {
				self.handleSubmit()
			})
		}
	}

	render() {
		console.log(this.props.member_id)
		let self = this
		let show_createApi_keys = []
		let city_opt = []
		let districts_opt = []
		let Uploaded_image_data
		let commonMsgSpan = <span className="fill-error-span">*This is a mandatory field</span>
		let isDummyUser
		if (this.props.USER.profiles && Object.keys(this.props.USER.profiles).length && this.props.USER.profiles[this.props.USER.defaultProfile]) {
			isDummyUser = this.props.USER.profiles[this.props.USER.defaultProfile].isDummyUser
		}
		return (
			<React.Fragment>
				<div className="row no-gutters" id={isDummyUser ? 'member_0' : `member_${this.props.member_id}`}>
						{
							this.props.validateErrors.indexOf('title') > -1 ?
								commonMsgSpan : ''
						}
					{this.state.is_tobe_dummy_user && !this.props.is_from_payment?
						<div className={`col-12 ${this.state.disableTitle? 'disable-all':''}`}>
							<React.Fragment>
								<button className={`label-names-buttons ${this.state.title == 'mr.' ? 'btn-active' : ''}`} name="title" value='mr.' data-param='title' onClick={this.handleTitle.bind(this, 'mr.')} >Mr.</button>
								<button className={`label-names-buttons ${this.state.title == 'miss' ? 'btn-active' : ''}`} name="title" value='miss' data-param='title' onClick={this.handleTitle.bind(this, 'miss')} >Ms.</button>
								<button className={`label-names-buttons ${this.state.title == 'mrs.' ? 'btn-active' : ''}`} value='mrs.' name="title" data-param='title' onClick={this.handleTitle.bind(this, 'mrs.')} >Mrs.</button>
							</React.Fragment>
						</div>
					:''}
					<div className="col-6">
						<div className="ins-form-group inp-margin-right ">
							<input 
								style={{ 'textTransform': 'capitalize' }} 
								type="text" 
								id={`name_${this.props.member_id}`} 
								className={`form-control ins-form-control ${this.props.validateErrors.indexOf('name') > -1 ? 'fill-error' : ''}`} required 
								autoComplete="first_name" 
								name="name" 
								value={this.state.name} 
								data-param='name' 
								onChange={this.handleChange.bind(this, 'name')} 
								onBlur={this.handleSubmit.bind(this, false,false)} 
								disabled={this.props.is_from_payment || this.state.disableFName ? 'disabled' : ''} 
								onKeyPress={this.handleNameCharacters.bind(this, 'name')} 
							/>
							<label className={this.props.is_from_payment || this.state.disableFName ? 'form-control-placeholder datePickerLabel' : 'form-control-placeholder'} htmlFor={`name_${this.props.member_id}`}><span className="labelDot"></span>First Name</label>
							<img src={ASSETS_BASE_URL + "/img/user-01.svg"} />
						</div>
						{
							this.props.validateErrors.indexOf('name') > -1 ?
								commonMsgSpan : ''
						}
					</div>
					<div className="col-6">
						<div className="ins-form-group ins-form-group inp-margin-right">
							<input 
								style={{ 'textTransform': 'capitalize' }} 
								type="text" 
								id={`last_name_${this.props.member_id}`} 
								className={`form-control ins-form-control ${this.props.validateErrors.indexOf('last_name') > -1 ? 'fill-error' : ''}`} required 
								autoComplete="last_name" 
								name="last_name" 
								value={this.state.last_name} 
								data-param='last_name' 
								onChange={this.handleChange.bind(this, 'last_name')} 
								onBlur={this.handleSubmit.bind(this, false,false)} 
								disabled={this.props.is_from_payment || this.state.disableLName ? 'disabled' : ''} 
								onKeyPress={this.handleNameCharacters.bind(this, 'last_name')} 
							/>
							<label className={this.props.is_from_payment || this.state.disableLName ? 'form-control-placeholder datePickerLabel' : 'form-control-placeholder'} htmlFor={`last_name_${this.props.member_id}`}><span className="labelDot"></span>Last Name</label>
							<img src={ASSETS_BASE_URL + "/img/user-01.svg"} />
						</div>
						{
							this.props.validateErrors.indexOf('last_name') > -1 ?
								commonMsgSpan : ''
						}
					</div>
					{
						!this.props.is_from_payment?
						<div className="col-12">
							<div className="ins-form-group">
								<input 
									type="text" id={`emails_${this.props.member_id}`} 
									className={`form-control ins-form-control ${this.props.validateErrors.indexOf('email') > -1 ? 'fill-error' : ''}`} required 
									autoComplete="email" 
									name="email" 
									value={this.state.email} 
									data-param='email' 
									onChange={this.handleChange.bind(this, 'email')} 
									onBlur={this.handleEmail} 
									disabled={this.props.is_from_payment || this.state.disableEmail ? 'disabled' : ''}  
								/>
								<label className={this.props.is_from_payment || this.state.disableEmail ? 'form-control-placeholder datePickerLabel' : 'form-control-placeholder'} htmlFor={`emails_${this.props.member_id}`}><span className="labelDot"></span>Email</label>
								<img src={ASSETS_BASE_URL + "/img/mail-01.svg"} />
							</div>
							{
								this.props.validateErrors.indexOf('email') > -1 ?
									commonMsgSpan : ''
							}
						</div>
						:''
					}
					{
						this.props.show_extra_fields && !this.props.is_from_payment?
						<div className="col-12">
							<div className="ins-form-group">
								<input 
									type="number" id={`phone_${this.props.member_id}`} 
									className={`form-control ins-form-control ${this.props.validateErrors.indexOf('phone_number') > -1 ? 'fill-error' : ''}`} required 
									autoComplete="phone_number" 
									name="phone_number" 
									value={this.state.phone_number} 
									data-param='phone_number' 
									onChange={this.handleChange.bind(this, 'phone_number')} 
									onBlur={this.handleSubmit.bind(this, false,false)}
									disabled={this.props.is_from_payment || this.state.disablePhoneNo ? 'disabled' : ''}  
								/>
								<label className={this.props.is_from_payment || this.state.disablePhoneNo ? 'form-control-placeholder datePickerLabel' : 'form-control-placeholder'} htmlFor={`phone_${this.props.member_id}`}><span className="labelDot"></span>Phone Numer</label>
								<img src={ASSETS_BASE_URL + "/img/mail-01.svg"} />
							</div>
							{
								this.props.validateErrors.indexOf('phone_number') > -1 ?
									commonMsgSpan : ''
							}
						</div>
						:''
					}
					<div className="col-12">
						<div className={`ins-form-group ${this.props.is_from_payment || this.state.disableDob ?'click-disable':''}`} >
							<label className="form-control-placeholder datePickerLabel" htmlFor="ins-date">Date of birth</label>
							<img src={ASSETS_BASE_URL + "/img/calendar-01.svg"} />
							<div className="dob-select-div d-flex align-items-center">
								<div className="dob-select d-flex align-items-center">
									<select id={`daydropdown_${this.props.member_id}`} value={this.state.day}>
										<option hidden>DD</option>
									</select>
									<img className="dob-down-icon" style={{ right: '4px' }} src="/assets/img/customer-icons/dropdown-arrow.svg" />
								</div>
								<div className="dob-select d-flex align-items-center">
									<select id={`monthdropdown_${this.props.member_id}`} value={this.state.mnth}>
										<option hidden>MM</option>
									</select>
									<img className="dob-down-icon" style={{ right: '4px' }} src="/assets/img/customer-icons/dropdown-arrow.svg" />
								</div>
								<div className="dob-select d-flex align-items-center">
									<select id={`yeardropdown_${this.props.member_id}`} value={this.state.year}>
										<option hidden>YYYY</option>
									</select>
									<img className="dob-down-icon" style={{ right: '3px' }} src="/assets/img/customer-icons/dropdown-arrow.svg" />
								</div>
							</div>
						</div>
						{
							this.props.validateErrors.indexOf('dob') > -1 ?
								commonMsgSpan : ''
						}
					</div>
					{!isDummyUser?<div className="sub-form-hed-click" onClick={() => this.setState({
							showPopup: true, profile_flag:true})}>
							Select from profile
							<img src={ASSETS_BASE_URL + "/img/rgt-arw.svg"} />
					</div>:''}
				</div>
				{
					this.props.is_from_payment?
						<InsuranceProofs {...this.props} />
						: ''
				}
				{this.state.showPopup?
					<VipLoginPopup  {...this.props} 
						currentSelectedVipMembersId={this.props.currentSelectedVipMembersId} 
						member_id={this.props.member_id} 
						closePopup={this.togglePopup.bind(this)} 
						isSelectprofile = {true} 
						vipClubMemberDetails ={this.props.vipClubMemberDetails[this.props.member_id]}
						hideSelectProfilePopup={this.hideSelectProfilePopup.bind(this)} 
						is_child_only = {this.props.is_child_only}
					/> : ''
				}
			</React.Fragment>
		)
	}

}

export default VipProposer