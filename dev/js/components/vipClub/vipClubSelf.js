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
			// pincode: '',
			// address: '',
			title: '',
			id: this.props.member_id,
			relation: 'SELF',
			// member_type: 'adult',
			// state: '',
			// town: '',
			// district: '',
			profile_flag: true,
			// show_lname: this.props.no_lname, // to be deleted
			// show_lname_flag:this.props.no_lname, // to be deleted
			profile_id: null,
			// dateModal: false, // to be deleted
			// state_code: '',
			// district_code: '',
			// town_code: '',
			// selectedDateSpan: new Date(), // to be deleted
			// no_lname: false,
			disableFName: false,
			disableLName: false,
			disableEmail: false,
			disableDob: false,
			is_change: false,
			year: null,
			mnth: null,
			day: null,
			emailVerified:false,
			profile:'',
			relation_key:'SELF',
			member_form_id:this.props.member_form_id,
			userProfiles:{},
			showPopup:false,
			isUserSelectedProfile:this.props.isUserSelectedProfile,
			phone_number:null

		}
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleTitle = this.handleTitle.bind(this);
		this.handleEmail = this.handleEmail.bind(this);
	}
	componentDidMount() {
		let profile
		let isDummyUser
		let profileLength = Object.keys(this.props.USER.profiles).length;
		// if (this.props.vipClubMemberDetails[this.props.USER.defaultProfile] && !this.props.is_from_payment) { profile = Object.assign({}, this.props.vipClubMemberDetails[this.props.USER.defaultProfile])
		if (profileLength > 0 && this.props.vipClubMemberDetails[this.props.member_id] && !this.props.is_from_payment) {
			// console.log('11')
			if (!isDummyUser) {
				// console.log('12')
				profile = Object.assign({}, this.props.vipClubMemberDetails[this.props.member_id])
			} else {
				// console.log('13')
				profile = Object.assign({}, this.props.vipClubMemberDetails[this.props.member_id])
			}
			if(Object.keys(profile).length > 0){
				// console.log('14')
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
				// this.setState({...profile},()=>{
				// 	this.getUserDetails(profile)
				// 	this.populateDates()
				// 	this.handleSubmit(false,false)
				// })
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
					// console.log('16')
					profile = Object.assign({}, props.vipClubMemberDetails[props.member_id])
				} else {
					// console.log('17')
					profile = Object.assign({}, props.vipClubMemberDetails[props.member_id])
				}
				// if(profile && Object.keys(profile).length == 0 && props.USER.profiles[props.USER.defaultProfile]){
				// 	// console.log('18')
				// 	profile = props.USER.profiles[props.USER.defaultProfile]
				// }
				if(profile && Object.keys(profile).length){
					// console.log(profile)
					// console.log('19')
					this.setState({id:profile.id,profile_flag:false},()=>{
						this.populateDates()
			    		this.getUserDetails(profile)	
			    	})
			    }
			}else if (props.USER.profiles[props.USER.defaultProfile]) {
				// console.log('20')
				let profile
				if(props.savedMemberData && props.savedMemberData.length > 0){
					console.log('21')
					profile = props.savedMemberData.filter((x=>x.id == props.member_id))

					if(profile && profile.length > 0){
						profile = profile[0]
						// console.log(profile)
						// console.log('profile21')
						this.setState({id:profile.id,profile_flag:false},()=>{
							this.populateDates()
			    			this.getUserDetails(profile)	
			    		})
					}
				}else{
					// console.log('22')
					profile = Object.assign({}, props.USER.profiles[props.USER.defaultProfile])
					// console.log(profile)
					// console.log('profile23')
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
		}else if(props.is_from_payment && this.state.profile_flag && Object.keys(props.vip_club_db_data).length >0){
			let profile ={}
			let newProfile = {}
			if(props.vip_club_db_data && Object.keys(props.vip_club_db_data.data).length >0 && props.vip_club_db_data.data.user && Object.keys(props.vip_club_db_data.data.user).length > 0 && props.vip_club_db_data.data.user.plus_members && props.vip_club_db_data.data.user.plus_members.length > 0){
				if(props.vipClubMemberDetails && Object.keys(props.vipClubMemberDetails).length > 0){
					props.currentSelectedVipMembersId.map((val,key) => {
		    			newProfile =props.vipClubMemberDetails[val[key]]
		    			if(newProfile && newProfile.relation == 'SELF'){
		    				profile = props.vipClubMemberDetails[val[key]]
		    			}
			    	})
			    	if (profile && Object.keys(profile).length) {
			    		this.setState({id:profile.profile,profile_flag:false},()=>{
			    			this.populateDates()
			    			this.getUserDetails(profile)	
			    		})
					}
				}else{
			    	props.vip_club_db_data.data.user.plus_members.map((val,key) => {
						if(val.relation == 'SELF'){
							profile = Object.assign({}, val)
						}
					})
			    	if (profile && Object.keys(profile).length) {
			    		this.setState({id:profile.profile,profile_flag:false},()=>{
			    			this.populateDates()
			    			this.getUserDetails(profile)	
			    		})
					}
				}
			}
		}
	}

	togglePopup(newProfileid, member_id, newProfile) {
		let oldDate
		let finalDate
		if(newProfileid !== ''){
			this.setState({...newProfile,relation:'',relation_key:''})
			if (newProfile.gender == 'm') {
				this.setState({ title: 'mr.' })
			} else if (newProfile.gender == 'f') {
				this.setState({ title: 'mrs.' })
			}
			console.log(newProfile)
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
		if(Object.keys(profile).length > 0){
			if(this.props.is_from_payment){
				if(profile.first_name){
					this.setState({name:profile.first_name?profile.first_name:profile.name?profile.name:''})
				}
			}
			if(profile.gender == 'm'){
				this.setState({gender:profile.gender?profile.gender:'',title: 'mr.'})
			}else if(profile.gender == 'f'){
				this.setState({gender:profile.gender?profile.gender:'',title: 'mrs.'})
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
				// email: profile.isDummyUser ? '' : profile.email,
				// dob: profile.isDummyUser ? '' : profile.dob
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
								this.setState({name: newName[0],last_name: newName[1],disableFName:true,disableLName:true})
							}  else if (newName.length > 2) {
								tempArray = newName.slice(1, newName.length)
								this.setState({name: newName[0],last_name: tempArray.join(' '),disableFName:true})
							} else {
								this.setState({ name:profile.name?profile.name:'', disableFName:true })
							}
						}
					}
				}
				this.handleSubmit(false,false)
			})

			this.setState({
				disableEmail: !profile.isDummyUser && profile.email != '' ? true : false,
				disableDob: !profile.isDummyUser && profile.dob != null ? true : false,	
			})
			// this.setState({
			// 	// disableEmail: !profile.isDummyUser && profile.email != '' ? true : false,
			// 	// disableDob: !profile.isDummyUser && profile.dob != null ? true : false,
			// 	// disableName: !profile.isDummyUser && profile.name != '' ? true : false,
			// 	// gender: profile.isDummyUser ? '' : profile.gender,
			// 	email: profile.isDummyUser ? '' : profile.email,
			// 	dob: profile.isDummyUser ? '' : profile.dob,
			// 	id: profile.isDummyUser ? 0 : profile.id
			// }, () => {
			// 	if (profile.gender == 'm') {
			// 		this.setState({ title: 'mr.' })
			// 	} else if (profile.gender == 'f') {
			// 			this.setState({ title: 'mrs.' })
			// 	}
			// 	this.handleSubmit(false,false)
			// })
		}
	}
	handleChange(field, event) {
		this.setState({
			[event.target.getAttribute('data-param')]: event.target.value
		})
	}
	handleOnFocus(field, event) {
		// if(event.target.nextElementSibling.nextElementSibling){
		// 	event.target.nextElementSibling.nextElementSibling.classList.add('field-icon')
		// }
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
		if (!profile.isDummyUser) {
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
	handlekey(event) {
		if (this.state.pincode.length == 6) {
			event.preventDefault();
		}
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

	autocomplete(inp, arr, type) {
		let self = this
		var currentFocus;

		inp.addEventListener("input", function (e) {
			var parentDiv, childDiv, i, val = this.value;

			self.closeAllLists(type);
			if (!val) { return false; }
			currentFocus = -1;

			parentDiv = document.createElement("DIV")
			parentDiv.setAttribute("id", this.id + "autocomplete-list")
			parentDiv.setAttribute("class", "autocomplete-items")
			parentDiv.setAttribute("style", "cursor: pointer;")
			this.parentNode.appendChild(parentDiv)

			for (i = 0; i < arr.length; i++) {
				/*check if the item starts with the same letters as the text field value:*/
				if (arr[i].name.substr(0, val.length).toUpperCase() == val.toUpperCase()) {
					childDiv = document.createElement("DIV");
					childDiv.innerHTML = "<strong>" + arr[i].name.substr(0, val.length) + "</strong>";
					childDiv.innerHTML += arr[i].name.substr(val.length);
					childDiv.innerHTML += "<input type='hidden' value='" + arr[i].name + "' id='" + arr[i].code + "'>";

					childDiv.addEventListener("click", function (e) {
						inp.value = this.getElementsByTagName("input")[0].value;
						if (type == 'isState') {
							self.setState({ state: inp.value, state_code: this.getElementsByTagName("input")[0].id })
						}
						// } else if (type == 'isDistrict') {
						// 	self.setState({ district: inp.value, district_code: this.getElementsByTagName("input")[0].id })
						// } else if (type == 'isTown') {
						// 	self.setState({ town: inp.value, town_code: this.getElementsByTagName("input")[0].id })
						// }

						self.handleSubmit()
						self.closeAllLists(type)
					})
					parentDiv.appendChild(childDiv);
				}
			}
		})
		/*execute a function on key presses:*/
		inp.addEventListener("keydown", function (e) {
			var x = document.getElementById(this.id + "autocomplete-list");
			if (x) x = x.getElementsByTagName("div");
			if (e.keyCode == 40) {
				currentFocus++;
				self.addActive(x, currentFocus);
			} else if (e.keyCode == 38) {
				currentFocus--;
				self.addActive(x, currentFocus);
			} else if (e.keyCode == 13) {
				e.preventDefault();
				if (currentFocus > -1) {
					if (x) x[currentFocus].click();
				}
			}
		})
	}

	addActive(x, currentFocus) {
		if (!x) return false;
		this.removeActive(x);
		if (currentFocus >= x.length) currentFocus = 0;
		if (currentFocus < 0) currentFocus = (x.length - 1);
		if(x[currentFocus].classList){
			x[currentFocus].classList.add("autocomplete-active");
		}
	}

	removeActive(x) {
		for (var i = 0; i < x.length; i++) {
			if(x[i].classList){
				x[i].classList.remove("autocomplete-active");
			}
		}
	}

	closeAllLists(elmnt, type) {
		let inp
		if (type == 'isState') {
			inp = document.getElementsByClassName('userState')[0]
		} 
		// else if (type == 'isDistrict') {
		// 	inp = document.getElementsByClassName('userDistrict')[0]
		// } else if (type == 'isTown') {
		// 	inp = document.getElementsByClassName('userTown')[0]
		// }
		var x = document.getElementsByClassName("autocomplete-items");
		for (var i = 0; i < x.length; i++) {
			if (elmnt != x[i] && elmnt != inp) {
				x[i].parentNode.removeChild(x[i]);
			}
		}
	}

	daysInMonth(month, year) {
		return new Date(year, month, 31).getDate();
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

	verifyEndorsementEmail(newemail){
		this.setState({emailVerified:true,email:newemail},()=>{
			this.props.checkIsEmailVerfied()
			this.handleSubmit(true,true)
		})
	}

	render() {
		console.log(this.props.member_id)
		let self = this
		let show_createApi_keys = []
		let city_opt = []
		let districts_opt = []
		let Uploaded_image_data
		let commonMsgSpan = <span className="fill-error-span">*This is a mandatory field</span>
		if (Object.keys(this.props.createApiErrors).length > 0) {
			Object.entries(this.props.createApiErrors).map(function ([key, value]) {
				show_createApi_keys.push(key)
			})
		}
		let isDummyUser
		if (this.props.USER.profiles && Object.keys(this.props.USER.profiles).length && this.props.USER.profiles[this.props.USER.defaultProfile]) {
			isDummyUser = this.props.USER.profiles[this.props.USER.defaultProfile].isDummyUser
		}
		return (
			<div>
				<div className="row no-gutters" id={isDummyUser ? 'member_0' : this.props.is_endorsement ? `member_${this.props.member_id}` : `member_${this.props.USER.defaultProfile}`}>
					{!isDummyUser?<div className="sub-form-hed-click" onClick={() => this.setState({
							showPopup: true, userProfiles: this.props.USER})}>
							Select from profile
							<img src={ASSETS_BASE_URL + "/img/rgt-arw.svg"} />
					</div>:''}
					<div className="col-12">
						<React.Fragment>
							<button className={`label-names-buttons ${this.state.title == 'mr.' ? 'btn-active' : ''}`} name="title" value='mr.' data-param='title' onClick={this.handleTitle.bind(this, 'mr.')} >Mr.</button>
							<button className={`label-names-buttons ${this.state.title == 'miss' ? 'btn-active' : ''}`} name="title" value='miss' data-param='title' onClick={this.handleTitle.bind(this, 'miss')} >Ms.</button>
							<button className={`label-names-buttons ${this.state.title == 'mrs.' ? 'btn-active' : ''}`} value='mrs.' name="title" data-param='title' onClick={this.handleTitle.bind(this, 'mrs.')} >Mrs.</button>
						</React.Fragment>
					</div>
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
								onFocus={this.handleOnFocus.bind(this, 'name')} 
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
						{
							show_createApi_keys.indexOf('first_name') > -1 ?
								<span className="fill-error-span">{this.props.errorMessages['max_character']}</span> : ''
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
								onFocus={this.handleOnFocus.bind(this, 'last_name')} 
								disabled={this.props.is_from_payment || this.state.disableLName ? 'disabled' : ""} 
								onKeyPress={this.handleNameCharacters.bind(this, 'last_name')} 
							/>
							<label className={this.props.is_from_payment || this.state.disableLName ? 'form-control-placeholder datePickerLabel' : 'form-control-placeholder'} htmlFor={`last_name_${this.props.member_id}`}><span className="labelDot"></span>Last Name</label>
							<img src={ASSETS_BASE_URL + "/img/user-01.svg"} />
						</div>
						{
							this.props.validateErrors.indexOf('last_name') > -1 ?
								commonMsgSpan : ''
						}
						{
							show_createApi_keys.indexOf('last_name') > -1 ?
								<span className="fill-error-span">{this.props.errorMessages['max_character']}</span> : ''
						}
					</div>
					{
						!this.props.is_endorsement?
						<div className="col-12 mrt-10">
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
									onFocus={this.handleOnFocus.bind(this, 'email')}
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
						:<React.Fragment>
							<VerifyEmail {...this.props} is_endorsement={true} member_id={this.props.member_id} validateErrors ={this.props.validateErrors} email={this.state.email} handleSubmit={this.handleSubmit.bind(this)} verifyEndorsementEmail={this.verifyEndorsementEmail.bind(this)}/>
							{
								this.props.validateErrors.indexOf('email') > -1 ?
									<span className="fill-error-span">{this.props.errorMessages['valid_email']}</span> : ''
							}
						</React.Fragment>
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
						{
							show_createApi_keys.indexOf('dob') > -1 ?
								<span className="fill-error-span">{this.props.createApiErrors.dob[0]}</span> : ''
						}
					</div>
					{/*<div className="col-12">
						<div className="ins-form-group autocomplete">
							<input 
								style={{ 'textTransform': 'capitalize' }} 
								type="text" 
								id={`isnstate_${this.props.member_id}`} 
								className={`form-control ins-form-control ${this.props.validateErrors.indexOf('state') > -1 ? 'fill-error' : ''} userState`} required 
								autoComplete="state" 
								name="state" 
								value={this.state.state} 
								data-param='state' 
								onChange={this.handleState.bind(this, 'state')} 
								onBlur={this.handleSubmit.bind(this, false,false)} 
								onFocus={this.handleOnFocus.bind(this, 'state')} 
								data-state-code={this.state.state_code} 
								disabled={this.props.is_from_payment ? 'disabled' : ''} 
							/>
							<label className={this.props.is_from_payment ? 'form-control-placeholder datePickerLabel' : 'form-control-placeholder'} htmlFor={`isnstate_${this.props.member_id}`}>City</label>
							<img src={ASSETS_BASE_URL + "/img/location-01.svg"} />
						</div>
						{
							this.props.validateErrors.indexOf('state') > -1 ?
								commonMsgSpan : ''
						}
						{
							show_createApi_keys.indexOf('state') > -1 ?
								<span className="fill-error-span">{this.props.createApiErrors.state[0]}</span> : ''
						}
					</div>*/}
					{/*<div className="col-12">
						{this.state.state_code != '' ?
							<div className="ins-form-group autocomplete">
								<input 
									style={{ 'textTransform': 'capitalize' }} 
									type="text" 
									id={`isndistrict_${this.props.member_id}`} 
									className={`form-control ins-form-control ${this.props.validateErrors.indexOf('state') > -1 ? 'fill-error' : ''} userDistrict`} required 
									autoComplete="district" 
									name="district" 
									value={this.state.district} 
									data-param='district' 
									onChange={this.handleDistrict.bind(this, 'district')} 
									onBlur={this.handleSubmit.bind(this, false,false)} 
									onFocus={this.handleOnFocus.bind(this, 'district')} 
									data-state-code={this.state.district_code} 
								/>
								<label className="form-control-placeholder" htmlFor={`isndistrict_${this.props.member_id}`}>District</label>
								<img src={ASSETS_BASE_URL + "/img/location-01.svg"} />
							</div>
							: <div className="ins-form-group" onClick={this.showAlert.bind(this,' state ')}>
								<input 
									style={{ 'textTransform': 'capitalize', fontWeight: '100', color: 'gray' }} 
									type="text" 
									id={`isndistrict_${this.props.member_id}`} 
									className={`form-control ins-form-control ${this.props.validateErrors.indexOf('district') > -1 ? 'fill-error' : ''}`} required 
									autoComplete="district" 
									name="district" 
									value="Select District" disabled 
									data-param='district' 
								/>
								<label className="form-control-placeholder datePickerLabel" htmlFor={`isndistrict_${this.props.member_id}`}>District</label>
								<img src={ASSETS_BASE_URL + "/img/location-01.svg"} />

							</div>
						}
						{
							this.props.validateErrors.indexOf('district') > -1 ?
								commonMsgSpan : ''
						}
						{
							show_createApi_keys.indexOf('district') > -1 ?
								<span className="fill-error-span">{this.props.createApiErrors.district[0]}</span> : ''
						}
					</div>
					<div className="col-12">
						{this.state.district_code != '' ?
							<div className="ins-form-group autocomplete">
								<input style={{ 'textTransform': 'capitalize' }}
									type="text"
									id={`isnTown_${this.props.member_id}`}
									className={`form-control ins-form-control ${this.props.validateErrors.indexOf('state') > -1 ? 'fill-error' : ''} userTown`} required
									autoComplete="town"
									name="town"
									value={this.state.town}
									data-param='town'
									onChange={this.handleTown.bind(this, 'town')}
									onBlur={this.handleSubmit.bind(this, false,false)}
									onFocus={this.handleOnFocus.bind(this, 'town')}
									data-state-code={this.state.town_code} 
								/>
								<label className="form-control-placeholder" htmlFor={`isnTown_${this.props.member_id}`}>Town</label>
								<img src={ASSETS_BASE_URL + "/img/location-01.svg"} />
							</div>
							: <div className="ins-form-group" onClick={this.showAlert.bind(this,' district ')}>
								<input 
									style={{ 'textTransform': 'capitalize', fontWeight: '100', color: 'gray' }} 
									type="text" 
									id={`isndistrict_${this.props.member_id}`} 
									className={`form-control ins-form-control ${this.props.validateErrors.indexOf('town') > -1 ? 'fill-error' : ''}`} required 
									autoComplete="town" 
									name="town" 
									value="Select Town" disabled 
									data-param='town' 
								/>
								<label className="form-control-placeholder datePickerLabel" htmlFor={`isndistrict_${this.props.member_id}`}>Town</label>
								<img src={ASSETS_BASE_URL + "/img/location-01.svg"} />

							</div>
						}
						{
							this.props.validateErrors.indexOf('town') > -1 ?
								commonMsgSpan : ''
						}
						{
							show_createApi_keys.indexOf('town') > -1 ?
								<span className="fill-error-span">{this.props.createApiErrors.town[0]}</span> : ''
						}
					</div>*/}
					{/*<div className="col-12">
						<div className="ins-form-group">
							<input 
								style={{ 'textTransform': 'capitalize' }} 
								type="text" 
								id={`insaddress${this.props.member_id}`} 
								className={`form-control ins-form-control ${this.props.validateErrors.indexOf('address') > -1 ? 'fill-error' : ''}`} required 
								autoComplete="address" 
								name="address" 
								value={this.state.address} 
								data-param='address' 
								onChange={this.handleChange.bind(this, 'address')} 
								onBlur={this.handleSubmit.bind(this, false,false)} 
								onFocus={this.handleOnFocus.bind(this, 'address')} 
								disabled={this.props.is_from_payment ? 'disabled' : ''} 
							/>
							<label className={this.props.is_from_payment ? 'form-control-placeholder datePickerLabel' : 'form-control-placeholder'} htmlFor={`insaddress${this.props.member_id}`}><span className="labelDot"></span>Full Address</label>
							<img src={ASSETS_BASE_URL + "/img/location-01.svg"} />
						</div>
						{
							this.props.validateErrors.indexOf('address') > -1 ?
								commonMsgSpan : ''
						}
						{
							show_createApi_keys.indexOf('address') > -1 ?
								<span className="fill-error-span">{this.props.createApiErrors.address[0]}</span> : ''
						}
					</div>*/}
					{/*<div className="col-12">
						<div className="ins-form-group mb-0">
							<input 
								type="number" 
								id={`isnpin_${this.props.member_id}`} 
								className={`form-control ins-form-control ${this.props.validateErrors.indexOf('pincode') > -1 ? 'fill-error' : ''}`} required 
								autoComplete="pincode" 
								name="pincode" 
								value={this.state.pincode} 
								data-param='pincode' 
								onKeyPress={this.handlekey.bind(this)} 
								onChange={this.handleChange.bind(this, 'pincode')} 
								onBlur={this.handleSubmit.bind(this, false,false)} 
								onFocus={this.handleOnFocus.bind(this, 'pincode')} 
								disabled={this.props.is_from_payment ? 'disabled' : ''} 
							/>
							<label className={this.props.is_from_payment ? 'form-control-placeholder datePickerLabel' : 'form-control-placeholder'} htmlFor={`isnpin_${this.props.member_id}`}><span className="labelDot"></span>Pincode</label>
							<img src={ASSETS_BASE_URL + "/img/location-01.svg"} />
						</div>
						{
								this.props.validateErrors && this.props.validateErrors.indexOf('pincode')> -1?<span className="fill-error-span" style={{marginTop:'1px'}}>*This is a mandatory field</span>:''
							}
						{
							this.props.validateOtherErrors.indexOf('pincode') > -1 ?
								<span className="fill-error-span">Please Enter Valid Pincode</span> : ''
						}
						{
							show_createApi_keys.indexOf('pincode') > -1 ?
								<span className="fill-error-span">{this.props.createApiErrors.pincode[0]}</span> : ''
						}
					</div>*/}
					<div>
					</div>
				</div>
				{
					/*this.props.is_endorsement && this.state.is_change ?
						<InsuranceProofs {...this.props} />
						: ''*/
				}
				{
					this.props.is_from_payment?
						<InsuranceProofs {...this.props} />
						: ''
				}
				{this.state.showPopup?
					<VipLoginPopup {...this.state.userProfiles} {...this.props} 
						currentSelectedVipMembersId={this.props.currentSelectedVipMembersId} 
						member_id={this.props.member_id} 
						closePopup={this.togglePopup.bind(this)} 
						isSelectprofile = {true} 
						vipClubMemberDetails ={this.props.vipClubMemberDetails[this.props.member_id]}
						hideSelectProfilePopup={this.hideSelectProfilePopup.bind(this)} 
						is_child_only = {this.props.is_child_only}
					/> : ''
				}
			</div>
		)
	}

}

export default VipProposer