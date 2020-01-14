import React from 'react'
import SnackBar from 'node-snackbar'
import Calendar from 'rc-calendar'
import StateCityAutoComplete from './stateCityAutoComplete.js'
import InsuranceProofs from './insuranceProofs.js'
import VerifyEmail from './verifyEmail.js'
const moment = require('moment')

class InsuranceSelf extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			name: '',
			middle_name: '',
			last_name: '',
			email: '',
			gender: '',
			dob: '',
			pincode: '',
			address: '',
			title: '',
			id: '',
			relation: 'self',
			member_type: 'adult',
			state: '',
			town: '',
			district: '',
			profile_flag: true,
			// show_lname: this.props.no_lname,
			// show_lname_flag:this.props.no_lname,
			profile_id: null,
			dateModal: false,
			state_code: '',
			district_code: '',
			town_code: '',
			selectedDateSpan: new Date(),
			no_lname: false,
			disableName: false,
			disableEmail: false,
			disableDob: false,
			is_change: false,
			year: null,
			mnth: null,
			day: null,
			emailVerified:false,
			profile:''

		}
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleTitle = this.handleTitle.bind(this);
		this.handleEmail = this.handleEmail.bind(this);
	}
	componentDidMount() {
		let profile
		if (this.props.self_data_values[this.props.USER.defaultProfile] && !this.props.is_endorsement) {
			profile = Object.assign({}, this.props.self_data_values[this.props.USER.defaultProfile])
			this.getUserDetails(profile) // fill user details in form
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
		} else if (this.props.is_endorsement) {
			let oldDate
			if (Object.keys(this.props.self_data_values).length > 0) {
				profile = Object.assign({}, this.props.self_data_values[this.props.user_data[0].id])
				if (Object.keys(profile).length > 0 && profile.dob) {
					oldDate = profile.dob.split('-')
					this.setState({ year: oldDate[0], mnth: oldDate[2], day: oldDate[1] }, () => {
						this.populateDates()
					})
				}
				this.setState({ ...profile }, () => {
					this.handleSubmit(true,false)
				})
			} else {
				if (this.props.user_data && this.props.user_data.length > 0) {
					if (this.props.user_data[0].dob) {
						oldDate = this.props.user_data[0].dob.split('-')
						this.setState({ year: oldDate[0], mnth: oldDate[2], day: oldDate[1] }, () => {
							this.populateDates()
						})
					}
					this.setState({ ...this.props.user_data[0], name: this.props.user_data[0].first_name, member_type: this.props.member_type, profile_id: this.props.user_data[0].profile, is_change: false, town_code: this.props.user_data[0].city_code,profile:this.props.user_data[0].profile }, () => {
						this.handleSubmit(true,false)
					})
				}
			}

		}
	}
	componentWillReceiveProps(props) {
		let newName = []
		let self = this
		let profileLength = Object.keys(props.USER.profiles).length;
		if (profileLength > 0 && this.state.profile_flag && !props.is_endorsement) {
			let isDummyUser = props.USER.profiles[props.USER.defaultProfile].isDummyUser
			if (Object.keys(props.self_data_values).length > 0) {
				let profile
				if (!isDummyUser) {
					profile = Object.assign({}, props.self_data_values[props.USER.defaultProfile])
				} else {
					profile = Object.assign({}, props.self_data_values[0])
				}
				this.getUserDetails(profile) // fill user details in form
				if (Object.keys(profile).length) {
					this.setState({ ...profile, disableEmail: profile.email != '' ? true : false, disableDob: profile.dob != null ? true : false, disableName: profile.name != '' ? true : false }, () => {
						if (profile.gender == 'm') {
							this.setState({ title: 'mr.' }, () => {
								this.handleSubmit(false,false)
							})
						} else if (profile.gender == 'f') {
							this.setState({ title: 'mrs.' }, () => {
								this.handleSubmit(false,false)
							})
						}
					})
				} else {
					this.setState({ profile_flag: false })
					let new_profile = props.USER.profiles[props.USER.defaultProfile]
					this.getUserDetails(new_profile) // fill user details in form
				}
			} else if (props.USER.profiles[props.USER.defaultProfile]) {
				this.setState({ profile_flag: false })
				let profile = Object.assign({}, props.USER.profiles[props.USER.defaultProfile])
				newName = profile.name.split(" ")
				this.getUserDetails(profile) // fill user details in form
				this.populateDates()
			}
		} else if (props.is_endorsement) {
			this.populateDates()
		}
	}

	getUserDetails(profile) { // fill user details in store
		let newName = []
		let oldDate
		let tempArray
		if(Object.keys(profile).length > 0){
			newName = profile.name.split(" ")
			if (newName.length == 2) {
				this.setState({
					name: profile.isDummyUser ? '' : newName[0],
					last_name: profile.isDummyUser ? '' : newName[1]
				})
			} else if (newName.length == 3) {
				this.setState({
					name: profile.isDummyUser ? '' : newName[0],
					last_name: profile.isDummyUser ? '' : newName[2],
					middle_name: profile.isDummyUser ? '' : newName[1]
				})
			} else if (newName.length > 3) {
				tempArray = newName.slice(2, newName.length)
				this.setState({
					name: profile.isDummyUser ? '' : newName[0],
					last_name: profile.isDummyUser ? '' : tempArray.join(' '),
					middle_name: profile.isDummyUser ? '' : newName[1]
				})
			} else {
				this.setState({ name: profile.isDummyUser ? '' : profile.name })
			}
			if (profile.isDummyUser && profile.dob) {
				this.setState({ day: null, year: null, mnth: null })
			} else if (Object.keys(profile).length > 0 && profile.dob) {
				oldDate = profile.dob.split('-')
				this.setState({ year: oldDate[0], mnth: oldDate[1], day: oldDate[2] }, () => {
					this.populateDates()
				})
			} else {
				this.populateDates()
			}
			this.setState({
				disableEmail: !profile.isDummyUser && profile.email != '' ? true : false,
				disableDob: !profile.isDummyUser && profile.dob != null ? true : false,
				disableName: !profile.isDummyUser && profile.name != '' ? true : false,
				gender: profile.isDummyUser ? '' : profile.gender,
				email: profile.isDummyUser ? '' : profile.email,
				dob: profile.isDummyUser ? '' : profile.dob,
				id: profile.isDummyUser ? 0 : profile.id
			}, () => {
				if (profile.gender == 'm') {
					this.setState({ title: 'mr.' })
				} else if (profile.gender == 'f') {
					if (this.props.selected_plan.adult_count == 2) {
						this.setState({ title: 'mrs.' })
					} else {
						this.setState({ title: 'miss' })
					}
				}
				this.handleSubmit(false,false)
			})
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
			this.props.userData('self_data', self_data) // to save entered data in store
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
		if (self_data.name !== '') {
			if (self_data.name.length > 50) {
				self_data.name = self_data.name.slice(0, 50)
			}
		}
		if (self_data.middle_name !== '') {
			if (self_data.middle_name.length > 50) {
				self_data.middle_name = self_data.middle_name.slice(0, 50)
			}
		}
		if (self_data.last_name !== '') {
			if (self_data.last_name.length > 50) {
				self_data.last_name = self_data.last_name.slice(0, 50)
			}
		}
		if (!is_endoresment && !is_endorse_email) {
			self_data.is_change = true
			self_data.first_name = self_data.name
		}
		this.props.userData('self_data', self_data)
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
		} else if (field == 'middle_name') {
			if (this.state.middle_name.length == 50) {
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
	handleGender(field, event) {
		let gender_value = event.target.value
		if (gender_value == 'm') {
			this.setState({ title: 'mr.' })
		} else if (gender_value == 'f') {
			this.setState({ title: 'mrs.' })
		}
		this.setState({
			gender: event.target.value
		}, () => {
			this.handleSubmit(false,false)
		})
	}
	openDateModal() {
		this.setState({ dateModal: !this.state.dateModal })
	}
	selectDateFromCalendar(date) {
		if (date) {
			date = date.toDate()
			var date = new Date(date)
			let mnth = ("0" + (date.getMonth() + 1)).slice(-2)
			let day = ("0" + date.getDate()).slice(-2);
			let actual_date = [date.getFullYear(), mnth, day].join("-");
			this.setState({ selectedDateSpan: actual_date, dateModal: false, currentDate: new Date(date).getDate(), dob: actual_date }, () => {
				this.handleSubmit(false,false)
			})
		} else {
			this.setState({ dateModal: false })
		}
	}
	// handleState(event) {
	// 	var event = document.getElementById("state_dropdown")
	// 	this.setState({state: event.options[event.selectedIndex].value, state_code: event.options[event.selectedIndex].id},() =>{
	// 		this.handleSubmit(event)

	// 	})
	// }
	// handleDistrict(event) {
	// 	var event = document.getElementById("district_dropdown")
	// 	this.setState({district: event.options[event.selectedIndex].value, district_code: event.options[event.selectedIndex].id},() =>{
	// 		this.handleSubmit(event)

	// 	})
	// }
	// handleTown(event) {
	// 	var event = document.getElementById("town_dropdown")
	// 	this.setState({town: event.options[event.selectedIndex].value, town_code: event.options[event.selectedIndex].id},() =>{
	// 		this.handleSubmit(event)

	// 	})
	// }
	handleLastname(event) {
		this.setState({ no_lname: !this.state.no_lname }, () => {
			this.handleSubmit(false,false)
		})
	}
	showAlert(type) {
		SnackBar.show({ pos: 'bottom-center', text: "Please select" + type + "first" });
	}

	handleState(feild, event) {
		this.setState({
			[event.target.getAttribute('data-param')]: event.target.value
		})
		let states = []
		Object.entries(this.props.insurnaceData['state']).map(function ([key, value]) {
			states.push({ 'code': value.gst_code, 'name': value.state_name })
			// states.push([value.gst_code=value.state_name])
			// states.push(value.state_name)
		})
		this.autocomplete(document.getElementsByClassName('userState')[0], states, 'isState');
	}

	handleDistrict(feild, event) {
		let self = this
		this.setState({
			[event.target.getAttribute('data-param')]: event.target.value
		})
		let districts_opt = []
		Object.entries(this.props.insurnaceData['state']).map(function ([key, value]) {
			if (self.state.state_code && self.state.state_code != '' && self.state.state != '' && self.state.state_code == value.gst_code) {
				Object.entries(value.district).map(function ([k, districts]) {
					districts_opt.push({ 'code': districts.district_code, 'name': districts.district_name })
				})
			}
		})
		this.autocomplete(document.getElementsByClassName('userDistrict')[0], districts_opt, 'isDistrict');
	}

	handleTown(feild, event) {
		let self = this
		this.setState({
			[event.target.getAttribute('data-param')]: event.target.value
		})
		let city_opt = []
		Object.entries(this.props.insurnaceData['state']).map(function ([key, value]) {
			if (self.state.state_code && self.state.state_code != '' && self.state.state != '' && self.state.state_code == value.gst_code) {
				Object.entries(value.cities).map(function ([k, city]) {
					city_opt.push({ 'code': city.city_code, 'name': city.city_name })
				})
			}
		})
		this.autocomplete(document.getElementsByClassName('userTown')[0], city_opt, 'isTown');
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
						} else if (type == 'isDistrict') {
							self.setState({ district: inp.value, district_code: this.getElementsByTagName("input")[0].id })
						} else if (type == 'isTown') {
							self.setState({ town: inp.value, town_code: this.getElementsByTagName("input")[0].id })
						}

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
		} else if (type == 'isDistrict') {
			inp = document.getElementsByClassName('userDistrict')[0]
		} else if (type == 'isTown') {
			inp = document.getElementsByClassName('userTown')[0]
		}
		var x = document.getElementsByClassName("autocomplete-items");
		for (var i = 0; i < x.length; i++) {
			if (elmnt != x[i] && elmnt != inp) {
				x[i].parentNode.removeChild(x[i]);
			}
		}
	}

	daysInMonth(month, year) {
		return new Date(year, month, 0).getDate();
	}

	populateDates() {
		let self = this
		let default_months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']
		var daydropdown = document.getElementById("daydropdown_" + this.props.member_id),
			monthdropdown = document.getElementById("monthdropdown_" + this.props.member_id),
			yeardropdown = document.getElementById("yeardropdown_" + this.props.member_id);
		let age_threshold = this.props.selected_plan && this.props.selected_plan.threshold ? this.props.selected_plan.threshold[0].max_age : 65
		var today = new Date(),
			day = today.getUTCDate(),
			month = today.getUTCMonth(),
			year = today.getUTCFullYear() - age_threshold,
			currentYear = today.getUTCFullYear(),
			daysInCurrMonth = this.daysInMonth(month, year);

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
		let self = this
		let show_createApi_keys = []
		let city_opt = []
		let districts_opt = []
		let Uploaded_image_data
		let commonMsgSpan = <span className="fill-error-span">{this.props.errorMessages['common_message']}</span>
		if (Object.keys(this.props.createApiErrors).length > 0) {
			Object.entries(this.props.createApiErrors).map(function ([key, value]) {
				show_createApi_keys.push(key)
			})
		}
		let isDummyUser
		if (this.props.USER.profiles && Object.keys(this.props.USER.profiles).length && this.props.USER.profiles[this.props.USER.defaultProfile]) {
			isDummyUser = this.props.USER.profiles[this.props.USER.defaultProfile].isDummyUser
		}
		{
			Object.entries(self.props.insurnaceData['state']).map(function ([key, value]) {
				if (self.state.state_code && self.state.state_code != '' && self.state.state != '' && self.state.state_code == value.gst_code) {
					Object.entries(value.district).map(function ([k, districts]) {
						districts_opt.push(<option key={k} data-param="district" id={districts.district_code} value={districts.district_name}>{districts.district_name}</option>)
					})
					Object.entries(value.cities).map(function ([k, city]) {
						city_opt.push(<option key={k} data-param="town" id={city.city_code} value={city.city_name}>{city.city_name}</option>)
					})
				}
			})
		}
		// let isDisable = false
		// if(!isDummyUser && this.state.isDisable){
		// 	if(this.state.name !='' && this.state.dob !='' && this.state.email !=''){
		// 		isDisable = true
		// 	}

		// }
		return (
			<div>
				{/*
					isDisable?
						<span>Change details</span>
					:''
				*/}
				<div className="row no-gutters" id={isDummyUser ? 'member_0' : this.props.is_endorsement ? `member_${this.props.member_id}` : `member_${this.props.USER.defaultProfile}`}>
					<div className="col-12">
						{
							this.props.selected_plan.adult_count == 2 ?
								<div>
									<button className={`label-names-buttons ${this.state.title == 'mr.' ? 'btn-active' : ''}`} name="title" value='mr.' data-param='title' onClick={this.handleTitle.bind(this, 'mr.')} >Mr.</button>
									<button className={`label-names-buttons ${this.state.title == 'mrs.' ? 'btn-active' : ''}`} value='mrs.' name="title" data-param='title' onClick={this.handleTitle.bind(this, 'mrs.')} >Mrs.</button>
								</div>
								:
								<div>
									<button className={`label-names-buttons ${this.state.title == 'mr.' ? 'btn-active' : ''}`} name="title" value='mr.' data-param='title' onClick={this.handleTitle.bind(this, 'mr.')} >Mr.</button>
									<button className={`label-names-buttons ${this.state.title == 'miss' ? 'btn-active' : ''}`} name="title" value='miss' data-param='title' onClick={this.handleTitle.bind(this, 'miss')} >Ms.</button>
									<button className={`label-names-buttons ${this.state.title == 'mrs.' ? 'btn-active' : ''}`} value='mrs.' name="title" data-param='title' onClick={this.handleTitle.bind(this, 'mrs.')} >Mrs.</button>

								</div>
						}

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
								disabled={this.state.disableName ? 'disabled' : ''} 
								onKeyPress={this.handleNameCharacters.bind(this, 'name')} 
							/>
							<label className={this.state.disableName ? 'form-control-placeholder datePickerLabel' : 'form-control-placeholder'} htmlFor={`name_${this.props.member_id}`}><span className="labelDot"></span>First Name</label>
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
						<div className="ins-form-group inp-margin-right ">
							<input 
								style={{ 'textTransform': 'capitalize' }} 
								type="text" 
								id={`middle_name_${this.props.member_id}`} 
								className={`form-control ins-form-control ${this.props.validateErrors.indexOf('middle_name') > -1 ? 'fill-error' : ''}`} required 
								autoComplete="middle_name" 
								name="middle_name" 
								value={this.state.no_lname ? '' : this.state.middle_name} 
								data-param='middle_name' 
								onChange={this.handleChange.bind(this, 'middle_name')} 
								onBlur={this.handleSubmit.bind(this, false,false)} 
								onFocus={this.handleOnFocus.bind(this, 'middle_name')} 
								onKeyPress={this.handleNameCharacters.bind(this, 'middle_name')} 
								disabled={this.state.no_lname || this.state.disableName? 'disabled' : ""}
							/>
							<label className={this.state.disableName ? 'form-control-placeholder datePickerLabel' : 'form-control-placeholder'} htmlFor={`middle_name_${this.props.member_id}`}>Middle Name</label>
							<img src={ASSETS_BASE_URL + "/img/user-01.svg"} />
						</div>
						{
							show_createApi_keys.indexOf('middle_name') > -1 ?
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
								value={this.state.no_lname ? '' : this.state.last_name} 
								data-param='last_name' 
								onChange={this.handleChange.bind(this, 'last_name')} 
								onBlur={this.handleSubmit.bind(this, false,false)} 
								onFocus={this.handleOnFocus.bind(this, 'last_name')} 
								disabled={this.state.no_lname || this.state.disableName ? 'disabled' : ""} 
								onKeyPress={this.handleNameCharacters.bind(this, 'last_name')} 
							/>
							<label className={this.state.disableName ? 'form-control-placeholder datePickerLabel' : 'form-control-placeholder'} htmlFor={`last_name_${this.props.member_id}`}><span className="labelDot"></span>Last Name</label>
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
					<div className="col-12" style={{ marginTop: '-10px' }} >
						<div className="member-dtls-chk">
							<label className="ck-bx fw-500" onChange={this.handleLastname.bind(this)} style={{ fontSize: 12, paddingLeft: 24, lineHeight: '16px' }}>I dont have a last name<input type="checkbox" checked={this.state.no_lname} value="on" />
								<span className="checkmark small-checkmark"></span></label>
						</div>
					</div>
					<div className="col-12 mrt-10">
						<div className="ins-form-radio">
							<div className="dtl-radio">
								<label className="container-radio">
									Male
							 <input type="radio" name="gender" value='m' data-param='gender' checked={this.state.gender === 'm'} onChange={this.handleGender.bind(this, 'm')} />
									<span className="doc-checkmark"></span>
								</label>
							</div>
							<div className="dtl-radio">
								<label className="container-radio">
									Female
							 <input type="radio" name="gender" value='f' data-param='gender' checked={this.state.gender === 'f'} onChange={this.handleGender.bind(this, 'f')} />
									<span className="doc-checkmark"></span>
								</label>
							</div>
							<div className="dtl-radio">
								<label className="container-radio">
									Others
							 <input type="radio" name="gender" value='o' data-param='gender' checked={this.state.gender === 'o'} onChange={this.handleGender.bind(this, 'o')} />
									<span className="doc-checkmark"></span>
								</label>
							</div>
						</div>
						{
							this.props.validateErrors.indexOf('gender') > -1 ?
								commonMsgSpan : ''
						}
						{
							show_createApi_keys.indexOf('gender') > -1 ?
								<span className="fill-error-span">{this.props.createApiErrors.gender[0]}</span> : ''
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
								/>
								<label className={this.state.disableEmail ? 'form-control-placeholder datePickerLabel' : 'form-control-placeholder'} htmlFor={`emails_${this.props.member_id}`}><span className="labelDot"></span>Email</label>
								<img src={ASSETS_BASE_URL + "/img/mail-01.svg"} />
							</div>
							{
								this.props.validateErrors.indexOf('email') > -1 ?
									<span className="fill-error-span">{this.props.errorMessages['valid_email']}</span> : ''
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
						<div className="ins-form-group">
							{/* <input type="button"  id={`isn-date_${this.props.member_id}`} className={`form-control ins-form-control text-left ${this.props.validateErrors.indexOf('dob')> -1?'fill-error':''}`} required autoComplete="dob" name="dob" value={this.state.dob?this.state.dob:'yyyy/mm/dd'} data-param='dob' onClick={this.openDateModal.bind(this)}/> */}
							<label className="form-control-placeholder datePickerLabel" htmlFor="ins-date">Date of birth</label>
							<img src={ASSETS_BASE_URL + "/img/calendar-01.svg"} />
							{/*
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
                               */}
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
								<span className="fill-error-span">{this.props.errorMessages['adult_age']}</span> : ''
						}
						{
							show_createApi_keys.indexOf('dob') > -1 ?
								<span className="fill-error-span">{this.props.createApiErrors.dob[0]}</span> : ''
						}
					</div>
					<div className="col-12">
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
							/>
							<label className="form-control-placeholder" htmlFor={`isnstate_${this.props.member_id}`}>State</label>
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
					</div>
					<div className="col-12">
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
					</div>
					{/*<div className="col-12">
						<div className="ins-form-group">
							<select className={`ins-select-drop ${this.props.validateErrors.indexOf('state')> -1?'fill-error':''}`} id="state_dropdown" onChange={this.handleState.bind(this)} value={this.state.state}>
								<option data-param="state"  hidden id={0} value="select_state" value="state">Select State</option>
								{Object.entries(this.props.insurnaceData['state']).map(function([key, value]) {
									return <option key={key} data-param="state" id={value.gst_code} value={value.state_name}>{value.state_name}</option>
								})}
							</select>
							{/*<input style={{'textTransform': 'capitalize'}} type="text" id={`isnstate_${this.props.member_id}`} className={`form-control ins-form-control ${this.props.validateErrors.indexOf('state')> -1?'fill-error':''}`} required autoComplete="none" name="state" value={this.state.state} data-param='state' onChange={this.handleChange.bind(this,'state')} onBlur={this.handleSubmit} onFocus={this.handleOnFocus.bind(this,'state')}/>
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
					</div>*/}
					{/*<div className="col-12">
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
							<img src={ASSETS_BASE_URL + "/img/location-01.svg"} />
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
					*/}
					{/*<div className="col-12">
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
							<img src={ASSETS_BASE_URL + "/img/location-01.svg"} />
						</div>
						{
							this.props.validateErrors.indexOf('town')> -1?
							commonMsgSpan:''
						}
						{
								show_createApi_keys.indexOf('town')> -1?
								<span className="fill-error-span">{this.props.createApiErrors.town[0]}</span>:''	
						}
					</div>*/}
					<div className="col-12">
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
							/>
							<label className="form-control-placeholder" htmlFor={`insaddress${this.props.member_id}`}><span className="labelDot"></span>Full Address</label>
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
					</div>
					<div className="col-12">
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
							/>
							<label className="form-control-placeholder" htmlFor={`isnpin_${this.props.member_id}`}><span className="labelDot"></span>Pincode</label>
							<img src={ASSETS_BASE_URL + "/img/location-01.svg"} />
						</div>
						{
							this.props.validateErrors.indexOf('pincode') > -1 ?
								commonMsgSpan : ''
						}
						{
							this.props.validateOtherErrors.indexOf('pincode') > -1 ?
								<span className="fill-error-span">Please Enter Valid Pincode</span> : ''
						}
						{
							show_createApi_keys.indexOf('pincode') > -1 ?
								<span className="fill-error-span">{this.props.createApiErrors.pincode[0]}</span> : ''
						}
					</div>
					<div>
					</div>
				</div>
				{
					this.props.is_endorsement && this.state.is_change ?
						<InsuranceProofs {...this.props} />
						: ''
				}
			</div>
		)
	}

}

export default InsuranceSelf