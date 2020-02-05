import React from 'react'
import VipLoginPopup from './vipClubPopup.js'
import Calendar from 'rc-calendar'
import InsuranceProofs from './insuranceProofs.js'
const moment = require('moment')
import NewDateSelector from '../commons/newDateSelector.js'

class VipProposerFamily extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			name: '',
			last_name: '',
			dob: '',
			id: '',
			// relation: '',
			// title: '',
			showPopup: false,
			setDefault: false,
			profile_id:null,
    	    // relation_key:'',
    	    is_disable:false,
    	    member_form_id:this.props.member_form_id,
    	    is_already_user:false,
    	    isUserSelectedProfile:this.props.isUserSelectedProfile,
    	    isDobValidated:false,
            is_dob_error:false,
            gender:''
		}
	}

	componentWillReceiveProps(props) {
		let self = this
		let adult_gender
		let profile ={}
		if(props.is_from_payment){
			if(props.vipClubMemberDetails[props.member_id]){
				let profile = Object.assign({}, this.props.vipClubMemberDetails[this.props.member_id])
				let nextProfile = Object.assign({}, props.vipClubMemberDetails[props.member_id])
				if (JSON.stringify(this.state) != JSON.stringify(nextProfile)) {
					this.setState({ ...nextProfile })
				}
			}else if(props.member_id >=0 && !this.state.setDefault){ 
				this.setState({id: props.member_id, setDefault:true}, () => {
					this.setState({is_disable:false},() =>{
						self.handleSubmit()
					})
				})
			}
		}
	}

	handleChange(field, event) {
		this.setState({
			[event.target.getAttribute('data-param')]: event.target.value , id:this.props.member_id
		});
	}

	handleRelation(id,event) {
		var relation_id = document.getElementById(id);
		this.setState({id:this.props.member_id,'relation':event.target.value,'relation_key':relation_id.options[relation_id.selectedIndex].getAttribute('data-param')},()=>{
			this.handleSubmit()
		})
	}

	handleSubmit() {
		var self_data = this.state
		if(self_data.name !== ''){
	    	if(self_data.name.length > 50){
				self_data.name = self_data.name.slice(0, 50)
			}	
	    }
		this.props.userDetails('self_data', self_data) // to save user form details in store
	}

	togglePopup(newProfileid, member_id, newProfile) {
		if(newProfileid !== ''){
			if(newProfile && newProfile.dob){
				this.setState({dob:newProfile.dob,isDobValidated:true})
			}
	    	newProfile.isUserSelectedProfile = true
			this.props.selectVipUserProfile(newProfileid, member_id, newProfile, this.props.param_id) // select profile from option
			this.setState({
				showPopup: !this.state.showPopup,
				profile_id: newProfileid,
				id:newProfileid
			},() =>{
				this.handleSubmit()
			})
		}else{
			this.setState({showPopup: !this.state.showPopup})
		}
	}

    handleNameCharacters(field,event){
		if(field == 'name'){
			if(this.state.name.length == 50){
				event.preventDefault();
	        }
    	}
	}

	hideSelectProfilePopup() {
        this.setState({showPopup: false})
    }

  	submitNewDob(type,newDate,isValidDob,user_form_id) {
		let self = this
		self.setState({
			dob: newDate, isDobValidated:isValidDob
		}, () => {
			self.handleSubmit()
		})
	}

	render() {
		console.log(this.props.validateErrors)
		let show_createApi_keys_adult = []
		let show_createApi_keys_child = []
		let show_createApi_keys_child2 = []
		let Uploaded_image_data
		let commonMsgSpan = <span className="fill-error-span">*This is a mandatory field</span>

		if(this.props.members_proofs && this.props.members_proofs.length > 0){
			Uploaded_image_data = this.props.members_proofs.filter((x=>x.id == this.props.member_id))
		}
		return (
			<div className="ins-sub-forms mrt-10" id={`member_${this.props.member_id}`}>
				<div className="sub-form-input-data" style={{marginBottom:10}} >
					<div>
						{
							this.props.vip_club_db_data.data.user && Object.keys(this.props.vip_club_db_data.data.user).length > 0 && this.props.vip_club_db_data.data.user.plus_members && this.props.vip_club_db_data.data.user.plus_members.length > 0?<p className="sub-form-hed">{`Member ${this.props.vip_club_db_data.data.user.plus_members.length + this.props.member_view_id+1}`}</p>:''
						}
					</div>
					<div>
					{
						this.props.show_selected_profiles.length>0 && !this.state.is_disable?
						<div className="sub-form-hed-click" onClick={() => this.setState({
						showPopup: true})}>
						Select from profile
						<img src={ASSETS_BASE_URL + "/img/rgt-arw.svg"} />
					</div>:''
					}
					</div> 
				</div>

				<div className='widget' style={{padding:'10px'}} >
					{/*<div className="col-12" style={{padding:0}}>*/}
						{/*this.props.vip_club_db_data && Object.keys(this.props.vip_club_db_data.data).length>0 && this.props.vip_club_db_data.data.relation_master && Object.keys(this.props.vip_club_db_data.data.relation_master).length > 0?
							<div className="ins-form-group mt-1">
								<label className="form-control-placeholder datePickerLabel" htmlFor="ins-date">*Relation</label>
								<img src={ASSETS_BASE_URL + "/img/hands.svg"} />
								<div className="dob-select-div d-flex align-items-center">
									<div style={{flex: 1}} className="dob-select d-flex align-items-center">
										<select style={{width:'100%'}} value={this.state.relation} onChange={this.handleRelation.bind(this,'relation_id_'+this.props.member_id )} id={`relation_id_${this.props.member_id}`} disabled={this.state.is_disable ? 'disabled' : ''}  >
											<option hidden>Select Relation</option>
											{Object.entries(this.props.vip_club_db_data.data.relation_master).map(function([key, value]) {
												return <option data-param={key} key={key}>{value}</option>
											})}
										</select>
										<img className="dob-down-icon" style={{right : '4px'}} src="/assets/img/customer-icons/dropdown-arrow.svg"/>
									</div>
								</div>
								
							</div>
						:''*/}
					{
						/*this.props.validateErrors && this.props.validateErrors.indexOf('relation')> -1?commonMsgSpan:''*/
					}
					{/*</div>*/}
					{
						/*this.props.validateErrors.indexOf('title') > -1 ?
							<div style={{marginTop:10}}>
								{commonMsgSpan}
							</div>
							: ''*/
					}
					<div className="d-flex">
                        <p className={`label-names-buttons ${this.state.gender == 'm'?'btn-active':''}`} name="gender" checked={this.state.gender == 'm'} onClick={() => this.setState({ 'gender': 'm' },()=>{this.handleSubmit() })} onBlur={this.handleChange.bind(this)}>Male</p>
                        <p className={`label-names-buttons ${this.state.gender == 'f'?'btn-active':''}`} name="gender" checked={this.state.gender == 'f'} onClick={() => this.setState({ 'gender': 'f' },()=>{this.handleSubmit() })} onBlur={this.handleChange.bind(this)}>Female</p>
                    </div>
					<div className="row no-gutters">				
						<div className="col-12">
							<div className="ins-form-group inp-margin-right ">
								<input type="text" style={{'textTransform': 'capitalize'}} 
									id={`name_${this.props.member_id}`} 
									className={`form-control ins-form-control ${this.props.validateErrors.indexOf('name')> -1 ?'fill-error':''}`} required 
									autoComplete="first_name" 
									name="name" data-param='name' 
									value={this.state.name} 
									onChange={this.handleChange.bind(this, 'name')} 
									onBlur={this.handleSubmit.bind(this)} 
									onKeyPress={this.handleNameCharacters.bind(this,'name')}
									disabled={this.state.is_disable ? 'disabled' : ''}
								/>
								<label className={this.state.is_disable ? 'form-control-placeholder datePickerLabel' : 'form-control-placeholder'}
								htmlFor={`name_${this.props.member_id}`}><span className="labelDot"></span>Name</label>
								<img src={ASSETS_BASE_URL + "/img/user-01.svg"} />
							</div>
							{
								this.props.validateErrors.indexOf('name')> -1?
								commonMsgSpan:''
							}
						</div>
						{/*<div className="col-6">
							<div className="ins-form-group ins-form-group inp-margin-right  ">
								<input type="text" style={{'textTransform': 'capitalize'}} 
								id={`last_name_${this.props.member_id}`} 
								className={`form-control ins-form-control ${this.props.validateErrors.indexOf('last_name')> -1?'fill-error':''}`} required 
								autoComplete="last_name" 
								name="last_name" 
								data-param='last_name' 
								value={this.state.no_lname?'':this.state.last_name} 
								onChange={this.handleChange.bind(this, 'last_name')} 
								onBlur={this.handleSubmit.bind(this,false)} 
								disabled={this.state.no_lname?'disabled':""} 
								onKeyPress={this.handleNameCharacters.bind(this,'last_name')} 
								disabled={this.state.is_disable ? 'disabled' : ''}
								/>
								<label className={this.state.is_disable ? 'form-control-placeholder datePickerLabel' : 'form-control-placeholder'} htmlFor={`last_name_${this.props.member_id}`}><span className="labelDot"></span>Last Name</label>
								<img src={ASSETS_BASE_URL + "/img/user-01.svg"} />
							</div>
							{
								this.props.validateErrors.indexOf('last_name')> -1?
								commonMsgSpan:''
							}
						</div>*/}
						<div className="col-12"> 
							<form>
								<NewDateSelector {...this.props} getNewDate={this.submitNewDob.bind(this)} is_dob_error={this.state.is_dob_error}  old_dob={this.state.dob} user_form_id ={this.props.member_id} is_gold={true}/>
								{
									this.props.validateErrors.indexOf('dob') > -1 ?
										commonMsgSpan : ''
								}
							</form>
						</div>
					</div>
					{/*this.props.is_from_payment && !this.state.is_disable?
						<InsuranceProofs {...this.props} is_primary_user = {false}/>
					:''*/
					}
				</div>
				
				{this.state.showPopup ?
					<VipLoginPopup {...this.props} 
						currentSelectedVipMembersId={this.props.currentSelectedVipMembersId} 
						member_id={this.props.member_id} 
						closePopup={this.togglePopup.bind(this)} 
						isSelectprofile = {true} 
						vipClubMemberDetails ={this.props.vipClubMemberDetails[this.props.member_id]}
						hideSelectProfilePopup={this.hideSelectProfilePopup.bind(this)} 
						is_see_more={false}
					/> : ''
				}
			</div>
		)
	}

}

export default VipProposerFamily