import React from 'react'
import ChatPanel from '../commons/ChatPanel'
import InsurCommon from './insuranceCommonHeader.js'
import ProfileHeader from '../commons/DesktopProfileHeader'

class InsuranceReview extends React.Component{
	constructor(props) {
        super(props)
        this.state = {
        	selectedProfile:'',
        	selected_plan_price:'',
        	is_edit:false,
        	gst: 'inclusive of 18% GST'
        }
    }
    componentDidMount(){
    	if(window){
    		window.scrollTo(0,0)
    	}
    	let self = this
    	this.setState({selectedProfile:this.props.USER.selectedProfile, selected_plan_price:this.props.selected_plan.amount, ...self.props.self_data_values[this.props.USER.selectedProfile]})  
    }
    proceedPlan(){
    	let success_id
    	var insurance_pay={}
    	// insurance_pay.profile=1
    	let isDummyUser
    	insurance_pay.insurance_plan=this.props.selected_plan.id
    	insurance_pay.insurer= this.props.selected_plan.insurer
    	insurance_pay.members=[]
    	let selectedUser = this.props.USER.selectedProfile
    	let address=''
    	let email=''
    	let pincode = ''
    	let town = ''
    	let district = ''
    	let state = ''
    	let state_code = ''
    	let city_code = ''
    	let district_code = ''
    	// let show_lname_flag = ''
    	// let isDefaultUser
    		if(this.props.USER.profiles && Object.keys(this.props.USER.profiles).length && this.props.USER.profiles[this.props.USER.defaultProfile]){
    			// isDefaultUser = this.props.USER.profiles[this.props.USER.defaultProfile].is_default_user
    			isDummyUser = this.props.USER.profiles[this.props.USER.defaultProfile].isDummyUser
    		}
    	if(this.props.self_data_values && this.props.self_data_values[selectedUser] && !isDummyUser){
    		address = this.props.self_data_values[selectedUser].address
    		district = this.props.self_data_values[selectedUser].district
    		pincode = this.props.self_data_values[selectedUser].pincode
    		email = this.props.self_data_values[selectedUser].email
    		town = this.props.self_data_values[selectedUser].town
    		state = this.props.self_data_values[selectedUser].state
    		state_code = this.props.self_data_values[selectedUser].state_code
    		city_code = this.props.self_data_values[selectedUser].town_code
    		district_code = this.props.self_data_values[selectedUser].district_code
    		// show_lname_flag = this.props.self_data_values[selectedUser].show_lname_flag
    	}else if(this.props.self_data_values && this.props.self_data_values[0] && isDummyUser){
    		address = this.props.self_data_values[0].address
    		district = this.props.self_data_values[0].district
    		pincode = this.props.self_data_values[0].pincode
    		email = this.props.self_data_values[0].email
    		town = this.props.self_data_values[0].town
    		state = this.props.self_data_values[0].state
    		state_code = this.props.self_data_values[0].state_code
    		city_code = this.props.self_data_values[0].town_code
    		district_code = this.props.self_data_values[0].district_code
    		// show_lname_flag = this.props.self_data_values[0].show_lname_flag
    	}

    	var members={}
    	let currentSelectedProfiles = []
    	this.props.currentSelectedInsuredMembersId.map((val,key) => {
    		currentSelectedProfiles.push(val[key])
    	})
    		
    	{Object.entries(this.props.currentSelectedInsuredMembersId).map(function([key, value]) {
    		let param =this.props.self_data_values[value[key]]
				members={}
				members.title=param.title
				if(param.no_lname){
					members.middle_name=''
		    		members.last_name=''	
				}else{
					members.middle_name=param.middle_name
		    		members.last_name=param.last_name
				}
		    	
		    	members.first_name=param.name
		    	members.address=address
		    	members.email=email
		    	members.pincode=pincode
		    	members.town=town
		    	members.district=district
		    	members.state=state
		    	members.state_code=state_code
		    	members.city_code=city_code
		    	members.district_code=district_code
		    	members.dob=param.dob
		    	members.member_type=param.member_type
		    	members.gender=param.gender
		    	members.profile=param.profile_id
		    	members.relation=param.relation
		    	members.user_form_id=param.id
				return 	insurance_pay.members.push(members)
		    
		},this)}
		console.log(insurance_pay)
		this.props.resetSelectedInsuranceMembers()
		this.props.insurancePay('insurance_pay', insurance_pay,'a',(resp)=>{
			if(resp.members && resp.members.length >0){
				this.props.history.push('/insurancedetails')
			}else{
				if(resp.certificate){
					this.props.history.push('/insurance/certificate')
				}else{
					if(resp.payment_required){
						this.props.history.push(`/payment/${resp.data.orderId}?refs=opd`)
					}else{
						success_id = 'insurance/complete?id='+resp.data.id
						this.props.history.push(success_id)
					}
				}
			}			
		})
    }
	render(){		
		let self = this
		let isDummyUser
		if(Object.keys(this.props.self_data_values).length>0){
    		if(this.props.USER.profiles && Object.keys(this.props.USER.profiles).length && this.props.USER.profiles[this.props.USER.defaultProfile]){
    			isDummyUser = this.props.USER.profiles[this.props.USER.defaultProfile].isDummyUser
    		}
    		let self_profile
    		if(!isDummyUser){
    			self_profile  = Object.assign({}, this.props.self_data_values[this.props.USER.selectedProfile])		
    		}else{
    			self_profile  = Object.assign({}, this.props.self_data_values[0])		
    		}
		let currentSelectedProfiles = []
    	this.props.currentSelectedInsuredMembersId.map((val,key) => {
    		currentSelectedProfiles.push(val[key])
    	})
		return(
			<div className="profile-body-wrap">
			{/*<ProfileHeader /> */}
			<section className="container">
				<div className="row main-row parent-section-row">
				<div className="col-12 col-md-7 col-lg-7 ins-main-padding">
				<section>
				<div className="widget">
					<InsurCommon {...this.props} is_edit={this.state.is_edit}/>
				<div className="insurance-member-container">
		 			<div className="ins-user-details-lisitng">
						<p className="sub-form-hed">Proposer</p>
						<ul className="ins-usr-img-para">
							<li>
								<div className="img-list-width">
									<img className="ins-input-img" style={{ width: '19px' }} src={ASSETS_BASE_URL + "/img/ins-usr.svg"} />
								</div>
								{
									self_profile.no_lname?<p style={{'textTransform': 'capitalize'}}>{self_profile.name} | {self_profile.gender=='m'?'Male':self_profile.gender=='f'?'Female':self_profile.gender=='o'?'Others':''}</p>:
									<p style={{'textTransform': 'capitalize'}}>{self_profile.name} {self_profile.middle_name} {self_profile.last_name} | {self_profile.gender=='m'?'Male':self_profile.gender=='f'?'Female':self_profile.gender=='o'?'Others':''}</p>
								}
							</li>
							<li>
								<div className="img-list-width">
									<img className="ins-input-img" src={ASSETS_BASE_URL + "/img/cal.svg"} />
								</div>
								<p>{self_profile.dob}</p>
							</li>
							<li>
								<div className="img-list-width">
									<img className="ins-input-img" src={ASSETS_BASE_URL + "/img/email.svg"} />
								</div>
								<p>{self_profile.email}</p>
							</li>
							<li>
								<div className="img-list-width">
									<img className="ins-input-img" style={{ width: '18px' }} src={ASSETS_BASE_URL + "/img/ins-loc.svg"} />
								</div>
								<p style={{'textTransform': 'capitalize'}}>{`${self_profile.address}, ${self_profile.town}, ${self_profile.district}, ${self_profile.state} - ${self_profile.pincode}`}</p>
							</li>
						</ul>
					</div>
					{
						this.props.currentSelectedInsuredMembersId.map((val,key) => {
							if(parseInt(val[key]) != self.props.USER.selectedProfile){
								if(this.props.self_data_values[val[key]].relation != 'self'){
								return <div key={key} className="ins-sub-forms sub-input-forms-containers">
									<hr className="ins-internal-hr" />
									<div className="ins-user-details-lisitng">
										<p className="sub-form-hed">Member {key+1} </p>
										<div className="members-container-padding">
											<div className="row">
												<div className="col-6">
													<div className="members-listings">
														<div className="member-list-width">
															<img className="ins-input-img" src={ASSETS_BASE_URL + "/img/rel.svg"} />
														</div>
														<p style={{'textTransform': 'capitalize'}}>{this.props.self_data_values[val[key]].relation}</p>
													</div>
												</div>
												<div className="col-6">
													<div className="members-listings">
														<div className="member-list-width">
															<img style={{ width: '19px' }} className="ins-input-img" src={ASSETS_BASE_URL + "/img/ins-usr.svg"} />
														</div>
														{
															this.props.self_data_values[val[key]].no_lname?
														<p style={{'textTransform': 'capitalize'}}>{this.props.self_data_values[val[key]].name} | {this.props.self_data_values[val[key]].gender=='m'?'Male':this.props.self_data_values[val[key]].gender=='f'?'Female':this.props.self_data_values[val[key]].gender=='o'?'Others':''}</p>:
														<p style={{'textTransform': 'capitalize'}}>{this.props.self_data_values[val[key]].name} {this.props.self_data_values[val[key]].middle_name} {this.props.self_data_values[val[key]].last_name} | {this.props.self_data_values[val[key]].gender=='m'?'Male':this.props.self_data_values[val[key]].gender=='f'?'Female':this.props.self_data_values[val[key]].gender=='o'?'Others':''}</p>
														}
													</div>
												</div>
												<div className="col-6">
													<div className="members-listings">
														<div className="member-list-width">
															<img className="ins-input-img" src={ASSETS_BASE_URL + "/img/cal.svg"} />
														</div>
														<p>{this.props.self_data_values[val[key]].dob}</p>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
								}else{
									return <div></div>
								}
							}							
						})
					}				
				</div>
				</div>
			</section>
			<button className="v-btn p-3 v-btn-primary btn-lg fixed horizontal bottom no-round btn-lg text-lg static-btn" onClick={this.proceedPlan.bind(this)}>Pay now (₹ {this.state.selected_plan_price}) 
			<span className="foot-btn-sub-span">{this.state.gst}</span>
			</button>
			</div>
			<ChatPanel />
			</div>
			</section>
			</div>

			)
		}else{
			return <div></div>
		}
	}


}

export default InsuranceReview