import React from 'react'
import SnackBar from 'node-snackbar'
import InsuranceProofs from './insuranceProofs.js'
import VipLoginPopup from './vipClubPopup.js'
import NewDateSelector from '../commons/newDateSelector.js'

class VipProposer extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			name: '',
			email: this.props.user_email,
			gender: '',
			dob: '',
			id: this.props.member_id,
			profile_flag: true,
			profile_id: null,
			profile:'',
			member_form_id:this.props.member_form_id,
			userProfiles:{},
			showPopup:false,
			isUserSelectedProfile:this.props.isUserSelectedProfile,
			phone_number:this.props.user_phone_number,
			isDobValidated:false,
            is_tobe_dummy_user:false,
            isForceUpdateDob:false
		}
	}
	componentDidMount() {
		let profile
		let isDummyUser
		if (this.props.USER && this.props.USER.profiles && Object.keys(this.props.USER.profiles).length > 0 && this.props.vipClubMemberDetails[this.props.member_id] && !this.props.is_from_payment) {
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
	    				this.getUserDetails(profile) // fill user details in form
	    			})
				}else{
					this.setState({id:profile.id},()=>{
	    				this.getUserDetails(profile) // fill user details in form
	    			})
				}
			}
		}
	}
	componentWillReceiveProps(props) {
		let self = this
		if (props.USER && props.USER.profiles && Object.keys(props.USER.profiles).length > 0 && this.state.profile_flag && !props.is_from_payment) {
			let isDummyUser = props.USER.profiles[props.USER.defaultProfile].isDummyUser
			if (Object.keys(props.vipClubMemberDetails).length > 0) { // retrieve already member details from user store
				let profile
				if (!isDummyUser) {
					profile = Object.assign({}, props.vipClubMemberDetails[props.member_id])
				} else {
					profile = Object.assign({}, props.vipClubMemberDetails[props.member_id])
				}				
				if(profile && Object.keys(profile).length){
					this.setState({id:profile.id,profile_flag:false},()=>{
			    		this.getUserDetails(profile) // fill user details in form	
			    	})
			    }
			}else if (props.USER && props.USER.profiles && Object.keys(props.USER.profiles).length > 0  && props.USER.profiles[props.USER.defaultProfile]) {
				let profile
				let exitsting_user_profile
				if(props.savedMemberData && props.savedMemberData.length > 0){ // retrieve already member details from user dummy table in case of agent
					if(props.USER && Object.keys(props.USER).length && props.USER.profiles && Object.keys(props.USER.profiles).length){
						exitsting_user_profile = Object.assign({}, props.USER.profiles[props.member_id])
					}
					
					if(props.savedMemberData.length == 1 && props.savedMemberData[0] == null){
						profile = {...this.state}
						profile.id = this.props.member_id
						if(profile && Object.keys(profile).length > 0){
							this.setState({profile_flag:false})
			    			this.handleSubmit()
						}
					}else{
						profile = props.savedMemberData.filter((x=>x.id == props.member_id))
					}
					if(profile && profile.length > 0){
						profile = profile[0]
						if(exitsting_user_profile && Object.keys(exitsting_user_profile).length){
							profile.name = exitsting_user_profile.name
							profile.dob = exitsting_user_profile.dob
						}
						this.setState({id:profile.id,profile_flag:false},()=>{
			    			this.getUserDetails(profile)	// fill user details in form
			    		})
					}
				}else{ // retrieve already member details from user profiles
					profile = Object.assign({}, props.USER.profiles[props.USER.defaultProfile])
					if (profile && Object.keys(profile).length) {
						if(profile.isDummyUser){
							profile.id = 0
							this.setState({id:0,profile_flag:false},()=>{
			    				this.getUserDetails(profile)// fill user details in form	
			    			})
						}else{
							this.setState({id:profile.id,profile_flag:false},()=>{
			    				this.getUserDetails(profile)	// fill user details in form
			    			})
						}
					}
				}
			}
		}
	}

	togglePopup(newProfileid, member_id, newProfile) { //select from profile
		if(newProfileid !== ''){
			this.setState({...newProfile,profile_flag:true})
			newProfile.isUserSelectedProfile=true
			newProfile.is_tobe_dummy_user = false
			this.props.selectVipUserProfile(newProfileid, member_id, newProfile, 0) // select profile from option
			this.setState({
				showPopup: !this.state.showPopup,
				profile_id: newProfileid,
				id:newProfileid,
				isForceUpdateDob:true
			},() =>{
				this.handleSubmit();
			})
		}else{
			this.setState({showPopup: !this.state.showPopup,isForceUpdateDob:false})
		}
	}

	hideSelectProfilePopup() {
        this.setState({
            showPopup: false
        });
    }

	getUserDetails(profile) {
		let empty_state ={}
		if(profile.is_tobe_dummy_user){
			this.setState({...empty_state,name:''},()=>{
				this.handleSubmit()
			})
		}
		if(Object.keys(profile).length > 0){
			if(profile.id){
				this.setState({profile_id:profile.id?profile.id:''})
			}
			if(profile.profile){
				this.setState({profile_id:profile.profile?profile.profile:''})
			}
			if(profile.gender == 'm'){
				this.setState({gender:profile.gender?profile.gender:'',title: 'mr.'})
			}else if(profile.gender == 'f'){
				this.setState({gender:profile.gender?profile.gender:'',title: 'miss'})
			}

			if(profile.name == 'User' || profile.name == 'user'){
				this.setState({ name:''})
			}else if(profile.name){
				this.setState({ name:profile.name?profile.name:''})
			}
			if(this.props.is_from_payment){
				if(profile.first_name){
					this.setState({name:profile.first_name?profile.first_name:profile.name?profile.name:''})
				}
			}
			if(profile.is_tobe_dummy_user){
				this.setState({is_tobe_dummy_user:profile.is_tobe_dummy_user})
			}
			if(this.props.user_email){
				this.setState({email:this.props.user_email})
			}
			if(profile.email){
				this.setState({email:profile.email})
			}
			this.setState({
				dob: profile.dob ? profile.dob :''
			},()=>{
				this.handleSubmit()
			})
		}
	}

	handleChange(field, event) {
		this.setState({
			[event.target.getAttribute('data-param')]: event.target.value
		})
	}

	handleSubmit() {
		let profile = Object.assign({}, this.props.USER.profiles[this.props.USER.defaultProfile])
		if (!profile.isDummyUser && this.props.member_id > 0) {
			this.setState({ profile_id: this.props.member_id })
		} else {
			this.setState({ profile_id: null })
		}
		var self_data = this.state
		this.props.userDetails('self_data', self_data)
	}

	handleNameCharacters(field, event) {
		if (field == 'name') {
			if (this.state.name.length == 50) {
				event.preventDefault();
			}
		} 
		// else if (field == 'last_name') {
		// 	if (this.state.last_name.length == 50) {
		// 		event.preventDefault();
		// 	}
		// }
	}

	handleEmail() {
		let formIsValid = true;
		if (this.state.email != '') {
			let validEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			validEmail = validEmail.test(this.state.email);
			if (validEmail) {
				this.handleSubmit();
			} else {
				SnackBar.show({ pos: 'bottom-center', text: "Please Enter valid Email" });
			}
		}
	}

	submitNewDob(type,newDate,isValidDob) {
		let self = this
		self.setState({
			dob: newDate, isDobValidated:isValidDob
		}, () => {
			self.handleSubmit()
		})
	}

	unSetForceUpdateDob(){
		this.setState({isForceUpdateDob:false})
	}

	render() {
		console.log(this.props.member_id)
		let self = this
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
					<div className="d-flex">
                        <p className={`label-names-buttons ${this.state.gender == 'm'?'btn-active':''}`} name="gender" checked={this.state.gender == 'm'} onClick={() => this.setState({ 'gender': 'm' },()=>{this.handleSubmit() })} onBlur={this.handleChange.bind(this)}>Male</p>
                        <p className={`label-names-buttons ${this.state.gender == 'f'?'btn-active':''}`} name="gender" checked={this.state.gender == 'f'} onClick={() => this.setState({ 'gender': 'f' },()=>{this.handleSubmit() })} onBlur={this.handleChange.bind(this)}>Female</p>
                    </div>
					<div className="col-12">
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
								onBlur={this.handleSubmit.bind(this)} 
								// disabled={this.props.is_from_payment || this.state.disableFName ? 'disabled' : ''} 
								onKeyPress={this.handleNameCharacters.bind(this, 'name')} 
							/>
							<label className={this.props.is_from_payment /*|| this.state.disableFName*/ ? 'form-control-placeholder datePickerLabel' : 'form-control-placeholder'} htmlFor={`name_${this.props.member_id}`}><span className="labelDot"></span>Name</label>
							<img src={ASSETS_BASE_URL + "/img/user-01.svg"} />
						</div>
						{
							this.props.validateErrors.indexOf('name') > -1 ?
								commonMsgSpan : ''
						}
					</div>
					{/*<div className="col-6">
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
					</div>*/}
					{
						!this.props.is_from_payment && !this.props.user_email?
						<div className="col-12">
							<div className="ins-form-group">
								<input 
									type="text" id={`emails_${this.props.member_id}`} 
									className={`form-control ins-form-control ${this.props.validateErrors.indexOf('email') > -1 ? 'fill-error' : ''}`} required 
									autoComplete="email" 
									name="email" 
									value={this.props.user_email?this.props.user_email:this.state.email} 
									data-param='email' 
									onChange={this.handleChange.bind(this,'email')} 
									onBlur={this.handleEmail.bind(this)} 
									// disabled={this.props.is_from_payment || this.state.disableEmail ? 'disabled' : ''}  
								/>
								<label className={this.props.is_from_payment /*|| this.state.disableEmail*/ ? 'form-control-placeholder datePickerLabel' : 'form-control-placeholder'} htmlFor={`emails_${this.props.member_id}`}><span className="labelDot"></span>Email</label>
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
						/*this.props.show_extra_fields && !this.props.is_from_payment?
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
						:''*/
					}
					<div className="col-12">
					<form>
					<NewDateSelector {...this.props} getNewDate={this.submitNewDob.bind(this)} is_dob_error={this.props.is_dob_error}  old_dob={this.state.dob} is_gold={true} user_form_id ={this.props.member_id} isForceUpdateDob ={this.state.isForceUpdateDob} unSetForceUpdateDob={this.unSetForceUpdateDob.bind(this)} />
					{
						this.props.validateErrors.indexOf('dob') > -1 ?
							commonMsgSpan : ''
					}
					</form> 
					</div>
					{/*<div className="col-12">
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
					</div>*/}
					{!isDummyUser?<div className="col-12">
						<div className="orSeparator">
							<span>or</span>
						</div>
						<div className="sub-form-hed-click" style={{justifyContent: 'space-between'}} onClick={() => this.setState({
							showPopup: true, profile_flag:true,isForceUpdateDob:false})}>
							Select Profile/Add New Profile
							<img src={ASSETS_BASE_URL + "/img/rgt-arw.svg"} />
					</div>
					</div>:''}
				</div>
				{
					// this.props.is_from_payment?
					// 	<InsuranceProofs {...this.props} />
					// 	: ''
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
						is_see_more={false}
					/> : ''
				}
			</React.Fragment>
		)
	}

}

export default VipProposer