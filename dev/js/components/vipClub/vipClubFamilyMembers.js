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
			relation: '',
			title: '',
			member_type:'',
			userProfiles: {},
			showPopup: false,
			setDefault: false,
			profile_id:null,
			only_adult:false,
			no_lname:false,
    	    is_change:false,
    	    year:'',
    	    mnth:'',
    	    day:'',
    	    relation_key:'',
    	    is_disable:false,
    	    member_form_id:this.props.member_form_id,
    	    is_already_user:false,
    	    isUserSelectedProfile:this.props.isUserSelectedProfile,
    	    isDobValidated:false,
            is_dob_error:false
		}
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount(){
		let profile
		// if(!this.state.year && !this.state.mnth && !this.state.mnth){
		// 	this.populateDates(this.props.member_id,true)
		// }
	}

	componentWillReceiveProps(props) {
		let self = this
		let adult_title
		let adult_gender
		let profile ={}
		let oldDate
		if(props.is_from_payment){
			if(props.vipClubMemberDetails[props.member_id]){
				let profile = Object.assign({}, this.props.vipClubMemberDetails[this.props.member_id])
				let nextProfile = Object.assign({}, props.vipClubMemberDetails[props.member_id])
				if (JSON.stringify(this.state) != JSON.stringify(nextProfile)) {
					this.setState({ ...nextProfile })
					// if(!self.state.year && !self.state.mnth && !self.state.mnth){
					//     self.populateDates(props.member_id,true)
					// }
				}
			}else if(props.member_id >=0 && !this.state.setDefault){ 
				this.setState({id: props.member_id, setDefault:true}, () => {
					// self.populateDates(self.props.member_id,true)
					// if(!self.state.year && !self.state.mnth && !self.state.mnth){
					//     self.populateDates(self.props.member_id,true)
					// }
					this.setState({member_type:this.props.member_type,is_disable:false},() =>{
						self.handleSubmit()
					})
				})
			}
		}
	}

	handleTitle(field, event) {
		let title_value = event.target.value
			if(title_value == 'mr.'){
  				this.setState({gender:'m'})	
	  		}else{
	  			this.setState({gender:'f'})	
	  		}
		this.setState({ title: event.target.value, id:this.props.member_id }, () => {
			var self_data = this.state
			self_data.is_change = true
			this.props.userDetails('self_data', self_data) // to save user form details in store
		})
	}

	handleChange(field, event) {
		this.setState({
			[event.target.getAttribute('data-param')]: event.target.value , id:this.props.member_id
		});
	}

	handleRelation(id,event) {
		var relation_id = document.getElementById(id);
		this.setState({id:this.props.member_id,'relation':event.target.value,'relation_key':relation_id.options[relation_id.selectedIndex].getAttribute('data-param')},()=>{
			this.handleSubmit(true,event)
		})
	}

	handleSubmit(is_endoresment) {
		var self_data = this.state
		if(self_data.name !== ''){
	    	if(self_data.name.length > 50){
				self_data.name = self_data.name.slice(0, 50)
			}	
	    }
	    if(self_data.last_name !== ''){
	    	if(self_data.last_name.length > 50){
				self_data.last_name = self_data.last_name.slice(0, 50)
			}	
	    }
	    if(!is_endoresment){
	    	self_data.is_change = true
	    }
		this.props.userDetails('self_data', self_data) // to save user form details in store
	}

	togglePopup(newProfileid, member_id, newProfile) {
		let oldDate
		let finalDate
		if(newProfileid !== ''){
			if (newProfile.gender == 'm') {
				this.setState({ title: 'mr.' })
			} else if (newProfile.gender == 'f') {
				this.setState({ title: 'mrs.' })
			}
			if(newProfile && newProfile.dob){
				this.setState({dob:newProfile.dob,isDobValidated:true})
			}
			// if(newProfile && newProfile.dob){
			// 	oldDate= newProfile.dob.split('-')
			// 	this.setState({year:oldDate[0],mnth:oldDate[1],day:oldDate[2]},()=>{
	  //   			this.populateDates(newProfileid,false)
	  //   			finalDate = this.state.year + '-'+ this.state.mnth + '-'+this.state.day 
	  //   			this.setState({dob:finalDate})
	  //   		})
			// }else{
			// 	this.populateDates(newProfileid,false)
			// }
	    	newProfile.isUserSelectedProfile = true
			// this.props.selectInsuranceProfile(newProfileid, member_id, newProfile, this.props.param_id)
			this.props.selectVipUserProfile(newProfileid, member_id, newProfile, this.props.param_id) // select profile from option
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

    handleNameCharacters(field,event){
		if(field == 'name'){
			if(this.state.name.length == 50){
				event.preventDefault();
	        }
    	}else if(field == 'last_name'){
			if(this.state.last_name.length == 50){
				event.preventDefault();
	        }
    	}
	}

	hideSelectProfilePopup() {
        this.setState({
            showPopup: false
        });
    }

    populateDates(member_id,toCreateOptions){
    	let age_threshold = 150
    	let default_months=['01','02','03','04','05','06','07','08','09','10','11','12']
    	let self =this
    	var daydropdown = document.getElementById('daydropdown_'+member_id),
          monthdropdown = document.getElementById('monthdropdown_'+member_id),
          yeardropdown = document.getElementById('yeardropdown_'+member_id);
          	
        var today = new Date(),
            day = today.getUTCDate(),
            month = today.getUTCMonth(),
            year= today.getUTCFullYear()-age_threshold,
            currentYear = today.getUTCFullYear(),
            daysInCurrMonth = 31;
		if(daydropdown && monthdropdown && yeardropdown){
			
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
		        for(var i = 1; i <= daysInCurrMonth; i++){
		          var opt = document.createElement('option');
		          if(i<=9){
		          	opt.value = '0' + i;
		          	opt.text = '0' + i;
		          }else{
		          	opt.value = i;
		          	opt.text = i;
		          }
		          daydropdown.appendChild(opt);
		        }

		        // Month
		        for(var i = 0; i < 12; i++){
		          var opt = document.createElement('option');
		          opt.value = default_months[i]
		          opt.text = default_months[i]
		          monthdropdown.appendChild(opt);
		        }

		        // Year
		        for(var i = 0; i <= age_threshold; i++){
		          var opt = document.createElement('option');
		          opt.value = i + year;
		          opt.text = i + year;
		          yeardropdown.appendChild(opt);
		        }

			// change handler for day
			daydropdown.onchange = function(){
				var NewSelecteddays = daydropdown.value;
				self.setState({day:NewSelecteddays},()=>{
				self.submitDob()
				})
			}

			// Change handler for months
			monthdropdown.onchange = function(){
				var newMonth = monthdropdown.value
				self.setState({mnth:newMonth},()=>{
				self.submitDob()
				})
			}

			// change handler for year
			yeardropdown.onchange = function(){
				var newYear = yeardropdown.value;
				self.setState({year:newYear},()=>{
				self.submitDob()
				})
			}
	    }
  	}

  	submitDob(){
	let self =  this
      if(self.state.day && self.state.mnth && self.state.year){
      	let finalDate = self.state.year + '-'+ self.state.mnth + '-'+self.state.day 
      	self.setState({
    		dob : finalDate
    	},()=>{
    		self.handleSubmit() 
    	})
      }
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
					<div className="col-12" style={{padding:0}}>
						{this.props.vip_club_db_data && Object.keys(this.props.vip_club_db_data.data).length>0 && this.props.vip_club_db_data.data.relation_master && Object.keys(this.props.vip_club_db_data.data.relation_master).length > 0?
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
						:''}
					{
						this.props.validateErrors && this.props.validateErrors.indexOf('relation')> -1?commonMsgSpan:''
					}
					</div>

					<div className= {this.state.is_disable ? 'click-disable' : ''}> 
						<button className={`label-names-buttons ${this.state.title == 'mr.' ? 'btn-active' : ''}`} name="title" value='mr.' data-param='title' onClick={this.handleTitle.bind(this, 'mr.')} >Mr.</button>
						<button className={`label-names-buttons ${this.state.title == 'miss' ? 'btn-active' : ''}`} name="title" value='miss' data-param='title' onClick={this.handleTitle.bind(this, 'miss')} >Ms.</button>
						<button className={`label-names-buttons ${this.state.title == 'mrs.' ? 'btn-active' : ''}`} value='mrs.' name="title" data-param='title' onClick={this.handleTitle.bind(this, 'mrs.')} >Mrs.</button>
					</div>					
						{
							this.props.validateErrors.indexOf('title') > -1 ?
								<div style={{marginTop:10}}>
									{commonMsgSpan}
								</div>
								: ''
						}
					<div className="row no-gutters">				
						<div className="col-6">
							<div className="ins-form-group inp-margin-right ">
								<input type="text" style={{'textTransform': 'capitalize'}} 
									id={`name_${this.props.member_id}`} 
									className={`form-control ins-form-control ${this.props.validateErrors.indexOf('name')> -1 ?'fill-error':''}`} required 
									autoComplete="first_name" 
									name="name" data-param='name' 
									value={this.state.name} 
									onChange={this.handleChange.bind(this, 'name')} 
									onBlur={this.handleSubmit.bind(this,false)} 
									onKeyPress={this.handleNameCharacters.bind(this,'name')}
									disabled={this.state.is_disable ? 'disabled' : ''}
								/>
								<label className={this.state.is_disable ? 'form-control-placeholder datePickerLabel' : 'form-control-placeholder'}
								htmlFor={`name_${this.props.member_id}`}><span className="labelDot"></span>First Name</label>
								<img src={ASSETS_BASE_URL + "/img/user-01.svg"} />
							</div>
							{
								this.props.validateErrors.indexOf('name')> -1?
								commonMsgSpan:''
							}
						</div>
						<div className="col-6">
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
						</div>
						{/*<div className= {this.state.is_disable ? 'click-disable' : 'col-12'}>
							<div className="ins-form-group mb-0">
								<label className="form-control-placeholder datePickerLabel" htmlFor="ins-date">*Date of birth</label>
								<img src={ASSETS_BASE_URL + "/img/calendar-01.svg"} />
								<div className="dob-select-div d-flex align-items-center">
									<div className="dob-select d-flex align-items-center">
										<select id={`daydropdown_${this.props.member_id}`} value={this.state.day}>
											<option hidden>DD</option>
										</select>
										<img className="dob-down-icon" style={{right : '4px'}} src="/assets/img/customer-icons/dropdown-arrow.svg"/>
									</div>
									<div className="dob-select d-flex align-items-center">
										<select id={`monthdropdown_${this.props.member_id}`} value={this.state.mnth}>
											<option hidden>MM</option>
										</select>
										<img className="dob-down-icon" style={{right : '4px'}} src="/assets/img/customer-icons/dropdown-arrow.svg"/>
									</div>
									<div className="dob-select d-flex align-items-center">
										<select id={`yeardropdown_${this.props.member_id}`} value={this.state.year}>
											<option hidden>YYYY</option>
										</select>
										<img className="dob-down-icon" style={{right : '3px'}} src="/assets/img/customer-icons/dropdown-arrow.svg"/>
									</div>
								</div>
							</div>
							{
								this.props.validateErrors && this.props.validateErrors.indexOf('dob')> -1?<span className="fill-error-span" style={{marginTop:'1px'}}>*This is a mandatory field</span>:''
							}
						</div>*/}
						<div className="col-12"> <form><NewDateSelector {...this.props} getNewDate={this.submitNewDob.bind(this)} is_dob_error={this.state.is_dob_error}  old_dob={this.state.dob} user_form_id ={this.props.member_id} is_gold={true}/></form>
						</div>
					</div>
					{this.props.is_from_payment && !this.state.is_disable?
						<InsuranceProofs {...this.props} is_primary_user = {false}/>
					:''
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