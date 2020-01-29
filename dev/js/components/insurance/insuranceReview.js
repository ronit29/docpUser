import React from 'react'
import ChatPanel from '../commons/ChatPanel'
import InsurCommon from './insuranceCommonSection.js'
import ProfileHeader from '../commons/DesktopProfileHeader'
import STORAGE from '../../helpers/storage'
import Loader from '../commons/Loader'
import SnackBar from 'node-snackbar'
import PaymentForm from '../commons/paymentForm'

class InsuranceReview extends React.Component{
	constructor(props) {
        super(props)
        this.state = {
        	selectedProfile:'',
        	selected_plan_price:'',
        	is_edit:false,
        	gst: 'inclusive of 18% GST',
            paymentData: null
        }
    }
    componentDidMount(){
    	if(window){
    		window.scrollTo(0,0)
    	}
    	let self = this
    	this.setState({selectedProfile:this.props.USER.defaultProfile, selected_plan_price:this.props.selected_plan.amount, ...self.props.self_data_values[this.props.USER.defaultProfile]})  
    }
    proceedPlan(){
    	let success_id
    	var insurance_pay={}
    	// insurance_pay.profile=1
    	let isDummyUser
    	insurance_pay.insurance_plan=this.props.selected_plan.id
    	insurance_pay.insurer= this.props.insurnaceData['insurance'][0].id
    	insurance_pay.members=[]
    	let selectedUser = this.props.USER.defaultProfile
    	let address=''
    	let email=''
    	let pincode = ''
    	let town = ''
    	let district = ''
    	let state = ''
    	let state_code = ''
    	let city_code = ''
    	let district_code = ''
    	let endorsedSelf
    	let is_change
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
    	}else if(this.props.self_data_values && this.props.is_endorsement){
    		Object.entries(this.props.self_data_values).map(function([key, value]) {
    			if(value.relation == 'self'){
    				endorsedSelf = value
    			}
    		})
    		address = endorsedSelf.address
    		district = endorsedSelf.district
    		district_code = endorsedSelf.district_code
    		pincode = endorsedSelf.pincode
    		email = endorsedSelf.email
    		town = endorsedSelf.town
    		city_code = endorsedSelf.town_code
    		state = endorsedSelf.state
    		state_code = endorsedSelf.state_code

    		// show_lname_flag = this.props.self_data_values[0].show_lname_flag
    	}


    	var members={}
    	let currentSelectedProfiles = []
    	this.props.currentSelectedInsuredMembersId.map((val,key) => {
    		currentSelectedProfiles.push(val[key])
    	})
    	let is_member_updated = []
    	let image_ids = []
    	{Object.entries(this.props.currentSelectedInsuredMembersId).map(function([key, value]) {
    		image_ids=[]
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
				if(this.props.is_endorsement){
					if(this.props.members_proofs && this.props.members_proofs.length>0){
						is_member_updated = this.props.members_proofs.filter((x=>x.id == param.id))
						if(is_member_updated && is_member_updated.length > 0){
							members.is_change=true
							if(is_member_updated[0].img_path_ids.length > 0){
								is_member_updated[0].img_path_ids.map((imgId,i)=>{
									image_ids.push({'document_image':imgId.id})
								})
							}
							members.image_ids = image_ids
						}else{
							members.is_change=false
						}
					}
					members.id=param.id
				}
		    	members.member = param.id
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
		if(this.props.is_endorsement){
			this.props.createEndorsementData(insurance_pay,(resp)=>{ // submit endoresment data
				if(resp && resp.success){
					SnackBar.show({ pos: 'bottom-center', text: resp.success})
					this.props.history.push('/insurance/certificate')
				}else if(resp.error){
					SnackBar.show({ pos: 'bottom-center', text: resp.error })
				}
			})
		}else{
			this.props.resetSelectedInsuranceMembers() // filter only visible forms objexts in the store
			this.props.insurancePay(insurance_pay,(resp)=>{ // // to request payment
				if(resp.members && resp.members.length >0){
					this.props.history.push('/insurance/insurance-user-details')
				}else{
					if(resp.certificate){
						this.props.history.push('/insurance/certificate')
					}else{
						if(resp.payment_required){
							// this.props.history.push(`/payment/${resp.data.orderId}?refs=opd`)
                            this.processPayment(resp)
						}else{
							success_id = '/insurance/complete?payment_success=true&id='+resp.data.id
							this.props.history.push(success_id)
						}
					}
				}			
			})
		}
    }
    sendAgentBookingURL() {
    	let sms_type = 'insurance'
    	if(this.props.is_endorsement && this.props.isAgent && this.props.isAgent == 'true'){
    		sms_type = 'endorsement'
		}
		let extraParams = {}
        this.props.sendAgentBookingURL(null, 'sms', sms_type,null,extraParams, (err, res) => { //send payment link in sms to user by agaent
            if (err) {
                SnackBar.show({ pos: 'bottom-center', text: "SMS SEND ERROR" })
            } else {
                SnackBar.show({ pos: 'bottom-center', text: "SMS SENT SUCCESSFULY" })
            }
        })
    }
    
    processPayment(data) {
        if (data && data.status) {
            this.setState({ paymentData: data.data }, () => {
            	setTimeout(()=>{
            		if (document.getElementById('paymentForm') && Object.keys(this.state.paymentData).length > 0) {
	                    let form = document.getElementById('paymentForm')
	                    form.submit()
	                }
            	},500)
            })
        }
    }

	render(){	
		if(this.props.data){	
			let self = this
			let isDummyUser
			if(Object.keys(this.props.data.members).length>0){
	    		// if(this.props.USER.profiles && Object.keys(this.props.USER.profiles).length && this.props.USER.profiles[this.props.USER.defaultProfile]){
	    		// 	isDummyUser = this.props.USER.profiles[this.props.USER.defaultProfile].isDummyUser
	    		// }

	    		let self_profile = this.props.data.members.filter(x=> x.relation == 'self')[0]
	    		let family_profile = this.props.data.members.filter(x=> x.relation != 'self')
	    		// if(!isDummyUser){
	    		// 	self_profile  = Object.assign({}, this.props.self_data_values[this.props.USER.defaultProfile])		
	    		// }else{
	    		// 	self_profile  = Object.assign({}, this.props.self_data_values[0])		
	    		// }
			// let currentSelectedProfiles = []
	    	//  this.props.currentSelectedInsuredMembersId.map((val,key) => {
	    	//		currentSelectedProfiles.push(val[key])
	    	//  })
	    	let self_edited_fields = []
	    	if(this.props.data && this.props.data.edited_fields){
	    		Object.entries(this.props.data.edited_fields).map(function([key, value]) {
	    			if(key == self_profile.id){
	    				self_edited_fields=value
	    			}	
	    		})
			}
			return(
				<div className="profile-body-wrap">
				<ProfileHeader showPackageStrip={true}/>
				<section className="container container-top-margin cardMainPaddingRmv">
					<div className="row no-gutters dsktp-row-gutter">
					<div className="col-12 col-md-7 col-lg-7 ins-main-padding">
					<section className="profile-book-screen">
					<div>
						{this.props.is_endorsement?
						<p className="rev-ins-header" style={{color:'#000000'}}> Review your details 
							{
							this.props.isAgent && this.props.isAgent == 'true'?''
							:<a style={{color:`var(--text--dark--all)`,float:'right'}} onClick={()=>this.props.history.push('/insurance/insurance-endorsement-details')}>
								<img src={ASSETS_BASE_URL + "/img/customer-icons/edit.svg"}/> Edit
							</a>
							}
						</p>
						:<InsurCommon {...this.props} is_edit={this.state.is_edit} is_edit_endorsment={this.props.is_endorsement}/>
						}
					<div className="widget mrt-10" style={{padding:'10px 4px'}}>
						<div className="insurance-member-container" style={{padding:'0 8px 0'}}>
							<div className="ins-user-details-lisitng">
								<p className="sub-form-hed">Proposer</p>
								<ul className="ins-usr-img-para pl-0">
									<li>
										<div className="img-list-width">
											<img className="ins-input-img"  src={ASSETS_BASE_URL + "/img/user-01.svg"} />
										</div>
										{
											self_profile.no_lname?
											<p style={{'textTransform': 'capitalize'}}>{self_profile.name} | {self_profile.gender=='m'?'Male':self_profile.gender=='f'?'Female':self_profile.gender=='o'?'Others':''}
											{this.props.is_endorsement && self_edited_fields.length > 0 && 
												(self_edited_fields.indexOf('first_name') != -1 || self_edited_fields.indexOf('middle_name') != -1 || 
													self_edited_fields.indexOf('last_name') != -1 ||
													self_edited_fields.indexOf('gender') != -1 ||
													self_edited_fields.indexOf('title') != -1)?
												<span style={{color:'#757575','textTransform': 'none'}}> (edited)</span>
											:''}
											</p>:
											<p style={{'textTransform': 'capitalize'}}>{self_profile.name} {self_profile.middle_name} {self_profile.last_name} | {self_profile.gender=='m'?'Male':self_profile.gender=='f'?'Female':self_profile.gender=='o'?'Others':''} 
											{this.props.is_endorsement && self_edited_fields.length > 0 && 
												(self_edited_fields.indexOf('first_name') != -1 || self_edited_fields.indexOf('middle_name') != -1 || 
													self_edited_fields.indexOf('last_name') != -1 ||
													self_edited_fields.indexOf('gender') != -1 ||
													self_edited_fields.indexOf('title') != -1)?
												<span style={{color:'#757575','textTransform': 'none'}}> (edited)</span>
											:''}
											</p>
										}
									</li>
									<li>
										<div className="img-list-width">
											<img className="ins-input-img" src={ASSETS_BASE_URL + "/img/calendar-01.svg"} />
										</div>
										<p>{self_profile.dob} 
										{this.props.is_endorsement && self_edited_fields.length > 0 && self_edited_fields.indexOf('dob') != -1 ?
											<span style={{color:'#757575','textTransform': 'none'}}> (edited)</span>
										:''}
										</p>
									</li>
									<li>
										<div className="img-list-width">
											<img className="ins-input-img" src={ASSETS_BASE_URL + "/img/mail-01.svg"} />
										</div>
										<p>{self_profile.email}
										{this.props.is_endorsement && self_edited_fields.length > 0 && self_edited_fields.indexOf('email') != -1 ?
											<span style={{color:'#757575','textTransform': 'none'}}> (edited)</span>
										:''}
										</p>
									</li>
									<li>
										<div className="img-list-width">
											<img className="ins-input-img"  src={ASSETS_BASE_URL + "/img/location-01.svg"} />
										</div>
										<p style={{'textTransform': 'capitalize'}}>{`${self_profile.address}, ${self_profile.town}, ${self_profile.district}, ${self_profile.state} - ${self_profile.pincode}`}
										{this.props.is_endorsement && self_edited_fields.length > 0 && (self_edited_fields.indexOf('address') != -1 || self_edited_fields.indexOf('town') != -1 || self_edited_fields.indexOf('district') != -1 || self_edited_fields.indexOf('state') != -1|| self_edited_fields.indexOf('pincode') != -1)?
												<span style={{color:'#757575','textTransform': 'none'}}> (edited)</span>
										:''}
										</p>
									</li>
								</ul>
							</div>
							{
								family_profile.map((val,key) => {
									return <div key={key} className="ins-sub-forms sub-input-forms-containers">
										<hr className="ins-internal-hr" />
										<div className="ins-user-details-lisitng">
											<p className="sub-form-hed">Member {key+1} </p>
											<div className="members-container-padding pl-0">
												<div className="row">
													<div className="col-6">
														<div className="members-listings">
															<div className="member-list-width">
																<img className="ins-input-img" src={ASSETS_BASE_URL + "/img/hands-01.svg"} />
															</div>
															<p style={{'textTransform': 'capitalize'}}>{val.relation}</p>
														</div>
													</div>
													<div className="col-6">
														<div className="members-listings">
															<div className="member-list-width">
																<img style={{ width: '19px' }} className="ins-input-img" src={ASSETS_BASE_URL + "/img/user-01.svg"} />
															</div>
															{
																val.no_lname?
															<p style={{'textTransform': 'capitalize'}}>{val.name} | {val.gender=='m'?'Male':val.gender=='f'?'Female':val.gender=='o'?'Others':''}
															{this.props.is_endorsement && this.props.data.edited_fields[val.id] && 
																(this.props.data.edited_fields[val.id].indexOf('first_name') > -1 || 
																this.props.data.edited_fields[val.id].indexOf('middle_name') > -1 || 
																this.props.data.edited_fields[val.id].indexOf('last_name') > -1 || 
																this.props.data.edited_fields[val.id].indexOf('gender') > -1 ||
																this.props.data.edited_fields[val.id].indexOf('title') > -1)?
																<span style={{color:'#757575','textTransform': 'none'}}> (edited)</span>
																:''
															}
															</p>
															:<p style={{'textTransform': 'capitalize'}}>{val.name} {val.middle_name} {val.last_name} | {val.gender=='m'?'Male':val.gender=='f'?'Female':val.gender=='o'?'Others':''}
															{this.props.is_endorsement && this.props.data.edited_fields[val.id] && 
																(this.props.data.edited_fields[val.id].indexOf('first_name') > -1 || 
																this.props.data.edited_fields[val.id].indexOf('middle_name') > -1 || 
																this.props.data.edited_fields[val.id].indexOf('last_name') > -1 || 
																this.props.data.edited_fields[val.id].indexOf('gender') > -1 ||
																this.props.data.edited_fields[val.id].indexOf('title') > -1)?
																<span style={{color:'#757575','textTransform': 'none'}}> (edited)</span>
																:''
															}
															</p>
															}
														</div>
													</div>
													<div className="col-6">
														<div className="members-listings">
															<div className="member-list-width">
																<img className="ins-input-img" src={ASSETS_BASE_URL + "/img/calendar-01.svg"} />
															</div>
															<p>{val.dob}
															{this.props.is_endorsement && this.props.data.edited_fields[val.id] && (this.props.data.edited_fields[val.id].indexOf('dob') > -1)?
																<span style={{color:'#757575','textTransform': 'none'}}> (edited)</span>
																:''
															}
															</p>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								})
							}				
						</div>
					</div>
					</div>
				</section>
				{
					STORAGE.isAgent()?<button className="v-btn p-3 v-btn-primary btn-lg fixed horizontal bottom no-round btn-lg text-lg sticky-btn" onClick={this.sendAgentBookingURL.bind(this)}>Send SMS (₹ {this.state.selected_plan_price}) 
				<span className="foot-btn-sub-span">{this.state.gst}</span>
				</button>
				:<button className="v-btn p-3 v-btn-primary btn-lg fixed horizontal bottom no-round btn-lg text-lg sticky-btn" onClick={this.proceedPlan.bind(this)}>{this.props.is_endorsement?'Submit':`Pay Now (₹${this.state.selected_plan_price})` }
				{
					this.props.is_endorsement?'':<span className="foot-btn-sub-span">{this.state.gst}</span>
				}
				</button>
				}
				</div>
				<ChatPanel />
				</div>
				</section>
                {
                    this.state.paymentData ? <PaymentForm paymentData={this.state.paymentData} refs='opd' /> : ""
                }
				</div>

				)
			}else{
				return <div></div>
			}
		}
	}


}

export default InsuranceReview