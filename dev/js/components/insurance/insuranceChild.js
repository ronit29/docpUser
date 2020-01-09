import React from 'react'
import InsurPopup from './insurancePopup.js'

class InsuranceChild extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			name: '',
			last_name: '',
			middle_name:'',
			gender: '',
			dob: '',
			id: '',
			relation: '',
			title: '',
			flag: true,
			userProfiles: {},
			showPopup: false
		}
		// this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);

	}
	componentDidMount() {
		let self = this
		this.setState({ id: this.props.member_id })
		this.setState({ ...self.props.self_data_values[this.props.member_id] }, () => {
			self.handleValidation()
		})

	}
	componentWillReceiveProps(props) {
		let self = this
		let profileLength = Object.keys(props.self_data_values).length;
		if (profileLength > 0) {
			let profile = Object.assign({}, this.props.self_data_values[this.props.member_id])
			let nextProfile = Object.assign({}, props.self_data_values[props.member_id])
			if (JSON.stringify(profile) != JSON.stringify(nextProfile)) {
				this.setState({ ...nextProfile }, () => {
					self.handleValidation()
				})
			}
		}
	}
	handleTitle(field, event) {
		this.setState({ title: event.target.value }, () => {
			var self_data = this.state
			this.props.userData('self_data', self_data)
			event.preventDefault();
		})
	}
	handleValidation() {
		let formIsValid = true
		if (this.state.relation == '') {
			formIsValid = false
		}
		if (this.state.name == '') {
			formIsValid = false
		}
		if (this.state.last_name == '') {
			formIsValid = false
		}
		if (this.state.gender == '') {
			formIsValid = false
		}
		if (this.state.dob == '') {
			formIsValid = false
		}
		let member_profile = {
			id: this.props.member_id,
			isformCompleted: formIsValid
		}
		this.props.checkForValidation(member_profile, this.props.member_id)
		return formIsValid;
	}
	handleChange(field, event) {
		this.setState({
			[event.target.getAttribute('data-param')]: event.target.value
		});
	}
	handleRelation(event) {
		var event = document.getElementById("relation_dropdown");
		this.setState({relation: event.options[event.selectedIndex].value},() =>{
			var self_data = this.state
			this.props.userData('self_data', self_data)
		})
	}
	handleSubmit(event) {
		var self_data = this.state
		let formIsValid = true;
		this.props.userData('self_data', self_data)
		event.preventDefault();
	}
	togglePopup(newProfileid, member_id, newProfile) {
		this.props.selectInsuranceProfile(newProfileid, member_id, newProfile) // select from profile option
		this.setState({
			showPopup: !this.state.showPopup
		});

	}
	render() {
		return (
			<div className="ins-sub-forms pading-hr-devider">
			<hr className="ins-internal-hr"/>
				<div className="sub-form-input-data">
					<div>
						<p className="sub-form-hed">{this.props.selected_plan.adult_count == 2? `Adult ${this.props.member_id + 1}`:`Child ${this.props.member_id + 1}`}</p>
					</div>
					<div className="sub-form-hed-click" onClick={() => this.setState({
						showPopup: true, userProfiles: this.props.USER
					})}>
						Select from profile
						<img src={ASSETS_BASE_URL + "/img/rgt-arw.svg"} />
					</div>
				</div>
				<div className="col-12">
					<button className={`label-names-buttons ${this.state.title == 'mr.' ? 'btn-active' : ''}`} name="title" value='mr.' data-param='title' onClick={this.handleTitle.bind(this, 'mr.')} >Mr.</button>
					<button className={`label-names-buttons ${this.state.title == 'miss.' ? 'btn-active' : ''}`} name="title" value='miss.' data-param='title' onClick={this.handleTitle.bind(this, 'miss.')} >Ms.</button>
					<button className={`label-names-buttons ${this.state.title == 'mrs.' ? 'btn-active' : ''}`} value='mrs.' name="title" data-param='title' onClick={this.handleTitle.bind(this, 'mrs.')} >Mrs.</button>
				</div>
				<div className="row no-gutters">
					<div className="col-12">
						<div className="ins-form-group">
							<select className="ins-select-drop" id="relation_dropdown" onClick={this.handleRelation.bind(this)}>
								<option data-param="relation" disabled selected hidden value="relation">RELATION</option>
								<option data-param="relation" value="spouse">SPOUSE</option>
								<option data-param="relation" value="son">SON</option>
								<option data-param="relation" value="daughter">DAUGHTER</option>
							</select>
							<img src={ASSETS_BASE_URL + "/img/ins-usr.svg"} />
						</div>
					</div>
					<div className="col-6">
						<div className="ins-form-group inp-margin-right ">
							<input type="text" id="name" className="form-control ins-form-control" required autoComplete="off" name="name" data-param='name' value={this.state.name} onChange={this.handleChange.bind(this, 'name')} onBlur={this.handleSubmit} />
							<label className="form-control-placeholder" htmlform="name">First Name</label>
							<img src={ASSETS_BASE_URL + "/img/ins-usr.svg"} />
						</div>

					</div>
					<div className="col-6">
						<div className="ins-form-group inp-margin-right ">
							<input type="text" id="name" className="form-control ins-form-control" required autoComplete="off" name="middle_name" value={this.state.middle_name}  data-param='middle_name' onChange={this.handleChange.bind(this,'middle_name')} onBlur={this.handleSubmit} />
							<label className="form-control-placeholder" htmlform="name">Middle Name</label>
							<img src={ASSETS_BASE_URL + "/img/ins-usr.svg"} />
						</div>
					</div>
					<div className="col-6">
						<div className="ins-form-group inp-margin-left">
							<input type="text" id="last name" className="form-control ins-form-control" required autoComplete="off" name="last_name" data-param='last_name' value={this.state.last_name} onChange={this.handleChange.bind(this, 'last_name')} onBlur={this.handleSubmit} />
							<label className="form-control-placeholder" htmlform="last name">Last Name</label>
							<img src={ASSETS_BASE_URL + "/img/ins-usr.svg"} />
						</div>
					</div>
					<div className="col-12">
						<div className="ins-form-radio">
							<div className="dtl-radio">
								<label className="container-radio">Male
							 		<input type="radio" name={`gender_${this.props.member_id}`} data-param='gender' value='m' checked={this.state.gender === 'm'} onChange={this.handleChange.bind(this, 'm')} />
									<span className="doc-checkmark"></span>
								</label>
							</div>
							<div className="dtl-radio">
								<label className="container-radio">Female
							 		<input type="radio" data-param='gender' checked name={`gender_${this.props.member_id}`} value='f' checked={this.state.gender === 'f'} onChange={this.handleChange.bind(this, 'f')} />
									<span className="doc-checkmark"></span>
								</label>
							</div>
							<div className="dtl-radio">
								<label className="container-radio">Others
							 		<input type="radio" data-param='gender' checked name={`gender_${this.props.member_id}`} value='o' checked={this.state.gender === 'o'} onChange={this.handleChange.bind(this, 'o')} />
									<span className="doc-checkmark"></span>
								</label>
							</div>
						</div>
					</div>
					<div className="col-12">
						<div className="ins-form-group">
							<input type="date" id="isn-date" className="form-control ins-form-control ins-date-picker-style" required autoComplete="off" name="dob" data-param='dob' value={this.state.dob} onChange={this.handleChange.bind(this, 'dob')} onBlur={this.handleSubmit} />
							<label className="form-control-placeholder" htmlform="ins-date">Date of birth</label>
							<img src={ASSETS_BASE_URL + "/img/ins-usr.svg"} />
						</div>
					</div>
				</div>
				{this.state.showPopup ?
					<InsurPopup {...this.state.userProfiles} member_id={this.props.member_id} closePopup={this.togglePopup.bind(this)}
					/> : ''
				}
			</div>
		)
	}

}

export default InsuranceChild