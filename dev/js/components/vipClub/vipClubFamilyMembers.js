import React from 'react'
import VipLoginPopup from './vipClubPopup.js'
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
            gender:'m',
            isForceUpdateDob:false
		}
	}

	componentWillReceiveProps(props) {
		let self = this
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
				id:newProfileid,
				isForceUpdateDob:true
			},() =>{
				this.handleSubmit()
			})
		}else{
			this.setState({showPopup: !this.state.showPopup,isForceUpdateDob:false})
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

	unSetForceUpdateDob(){
		this.setState({isForceUpdateDob:false})
	}

	render() {
		console.log(this.props.validateErrors)
		let commonMsgSpan = <span className="fill-error-span">*This is a mandatory field</span>

		return (
			<div className="ins-sub-forms mrt-10" id={`member_${this.props.member_id}`}>

				<div className='widget goldUserAddon' style={{padding:'10px'}} >
					<div className="sub-form-input-data" style={{marginBottom:10}} >
						<div>
							{
								this.props.vip_club_db_data.data.user && Object.keys(this.props.vip_club_db_data.data.user).length > 0 && this.props.vip_club_db_data.data.user.plus_members && this.props.vip_club_db_data.data.user.plus_members.length > 0?<p className="sub-form-hed">{`Member ${this.props.vip_club_db_data.data.user.plus_members.length + this.props.member_view_id+1}`}</p>:''
							}
						</div>
						<div>
							{this.props.is_tobe_remove_option?
								<div className="sub-form-hed-click" onClick={this.props.removeMemberForm.bind(this,this.props.member_id)}>Remove
								</div>
							:''}
						</div> 
					</div>
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
						<div className="col-12"> 
							<form>
								<NewDateSelector {...this.props} getNewDate={this.submitNewDob.bind(this)} is_dob_error={this.props.is_dob_error}  old_dob={this.state.dob} user_form_id ={this.props.member_id} is_gold={true} unSetForceUpdateDob={this.unSetForceUpdateDob.bind(this)} isForceUpdateDob={this.state.isForceUpdateDob}/>
								{
									this.props.validateErrors.indexOf('dob') > -1 ?
										commonMsgSpan : ''
								}
							</form>
						</div>
					</div>
					{
						this.props.show_selected_profiles.length>0 && !this.state.is_disable?
						<div className="sub-form-hed-click" onClick={() => this.setState({
						showPopup: true,isForceUpdateDob:false})}>
						Select from profile
						<img src={ASSETS_BASE_URL + "/img/rgt-arw.svg"} />
					</div>:''
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