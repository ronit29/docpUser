import React from 'react'
import ProfileHeader from '../commons/DesktopProfileHeader'
import ChatPanel from '../commons/ChatPanel'
import VipProposer from './vipClubSelf.js'
import VipProposerFamily from './vipClubFamilyMembers.js'
import SnackBar from 'node-snackbar'
import PaymentForm from '../commons/paymentForm'

class VipClubMemberDetailsView extends React.Component{
	constructor(props) {
        super(props)
        this.state = {
            saveMembers:false,
            validateErrors:{},
            validateOtherErrors:{},
            validatingNames:[],
            CreateApiErrors:{},
            show_selected_profiles:[],
            validateDobErrors:[],
           	errorMessages:[],
           	endorsementError:[],
           	paymentData: null,
           	show_popup:false,
           	proceed:false
        }
    }
    componentDidMount(){
    	if(window){
    		window.scrollTo(0,0)
    	}
    }

    addMembers(){
    	let member_dummy_data={
    		name: '',
			last_name: '',
			dob: '',
			// id: '',
			relation: '',
			title: '',
			profile:null
    	}
    	let card
    	let membersId = []
    	if(this.props.currentSelectedVipMembersId && this.props.currentSelectedVipMembersId.length > 0){
    		membersId = [].concat(this.props.currentSelectedVipMembersId)
    		if(this.props.currentSelectedVipMembersId.length == 2){
				membersId.push({[2]: 2, type:'adult'})
				member_dummy_data.id=2
    		}
    		if(this.props.currentSelectedVipMembersId.length == 3){
				membersId.push({[3]: 3, type:'adult'})
				member_dummy_data.id=3
    		}	
    		// console.log(member_dummy_data)
    		// this.props.saveCurrentSelectedVipMembers(membersId)
    		this.props.saveCurrentSelectedVipMembers(membersId,(resp)=>{
    			console.log(member_dummy_data)
    			this.props.userDetails('self_data', member_dummy_data)
    		})
    	}
    }

    componentWillReceiveProps(props){
    	let card
    	let self = this
    	let isDummyUser
    	let membersId = []
    	if(!this.state.saveMembers && Object.keys(props.selected_vip_plan).length >0 && props.USER.defaultProfile && !props.currentSelectedVipMembersId.length && !props.is_from_payment){
    		let loginUser = props.USER.defaultProfile
    		let isDefaultUser
    		if(props.USER.profiles && Object.keys(props.USER.profiles).length && props.USER.profiles[props.USER.defaultProfile]){
    			isDefaultUser = props.USER.profiles[props.USER.defaultProfile].is_default_user
    		}
    		isDummyUser = props.USER.profiles[props.USER.defaultProfile].isDummyUser

    		if(!isDummyUser){
	    		membersId.push({'0':loginUser, type: 'self'})
	    		if(props.is_from_payment){
		    		// var n = props.selected_vip_plan.total_allowed_members - 1;
		    		membersId.push({[1]: 1, type:'adult'})
		    // 		card = [...Array(props.selected_vip_plan.total_allowed_members -3)].map((e, i) => {
						// 	membersId.push({[i+1]: i+1, type:'adult'})
						// })
		    	}
			}else{
				membersId.push({'0':0, type:'self'})
				if(props.is_from_payment){
		    		membersId.push({[1]: 1, type:'adult'})
		    	}
			}
			// props.saveCurrentSelectedMembers(membersId)
			props.saveCurrentSelectedVipMembers(membersId)
			this.setState({ saveMembers: true})
    	}else if(!this.state.saveMembers && Object.keys(props.selected_vip_plan).length >0 && !props.currentSelectedVipMembersId.length && props.is_from_payment && Object.keys(props.vip_club_db_data).length >0){
    			if(props.vip_club_db_data.data.user && Object.keys(props.vip_club_db_data.data.user).length > 0 && props.vip_club_db_data.data.user.plus_members && props.vip_club_db_data.data.user.plus_members.length > 0){
    				console.log(props.vip_club_db_data.data.user.plus_members[0].profile)
    				
    				membersId.push({'0':props.vip_club_db_data.data.user.plus_members[0].profile, type: 'self'})
		    		membersId.push({[1]: 1, type:'adult'})
		    		console.log(membersId)
					props.saveCurrentSelectedVipMembers(membersId)
					this.setState({ saveMembers: true})
    			}
    	}
    	let profileLength = Object.keys(props.USER.profiles).length;
		let currentSelectedProfiles = []
		let show_selected_profile = []
        this.props.currentSelectedVipMembersId.map((val,key) => {
            currentSelectedProfiles.push(val[key])
        })
	    if(profileLength > 0){
	    	if(!props.USER.profiles[props.USER.defaultProfile].isDummyUser){
				{Object.entries(props.USER.profiles).map(function([key, value]) {

					if(currentSelectedProfiles.indexOf(parseInt(key)) == -1 && key !== props.USER.defaultProfile){
						show_selected_profile.push(key)
					}
				})}
				self.setState({show_selected_profiles : show_selected_profile})
			}
		}
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
    
    proceedPlan(){ //new
    	let success_id
    	let data = {}
    	let isDummyUser
    	let self_profile={}
    	let is_disable  = false
    	let member_ref = ''
    	let validatingErrors = {}
    	let param
    	if(this.props.selected_vip_plan && Object.keys(this.props.selected_vip_plan).length > 0 && this.props.vipClubMemberDetails && Object.keys(this.props.vipClubMemberDetails).length>0){
    		data.plan_id = 	this.props.selected_vip_plan.id
    		data.members = []
    		isDummyUser = this.props.USER.profiles[this.props.USER.defaultProfile].isDummyUser
    		if(!isDummyUser){
    			self_profile = this.props.vipClubMemberDetails[this.props.USER.defaultProfile]	
    		}else{
    			self_profile = this.props.vipClubMemberDetails[0]	
    		}	
    		let fields = []
    		this.props.currentSelectedVipMembersId.map((val,key) => {
	    		if(Object.keys(this.props.vipClubMemberDetails).length > 0){
	    			fields = []
	    			param =this.props.vipClubMemberDetails[val[key]]
						
						if(param.relation == ""){ //common validation
							is_disable = true
							fields.push('relation')
						}

						if(param.title == ""){
							is_disable = true
							fields.push('title')
						}

						if(param.name == ""){
							is_disable = true
							fields.push('name')
						}

						if(param.dob == null || param.dob == ""){
							is_disable = true
							fields.push('dob')
						}

						if(param.relation =='SELF'){
							if(param.state == "" || param.state_code == ""){  
								is_disable = true
								fields.push('state')
							}
							if(param.address == ""){  
								is_disable = true
								fields.push('address')
							}
							if(param.email == ""){  
								is_disable = true
								fields.push('email')
							}
							if(param.pincode == ""){  
								is_disable = true
								fields.push('pincode')
							}
							if(param.email !='' && param.relation == 'self'){
								let validEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
					  			validEmail = validEmail.test(param.email)
					  			if(!validEmail){
					  				is_disable = true
									fields.push('email')		
					  			}
							}
						}
	    		}
	    		validatingErrors[param.id] = fields
	    	})
	    	console.log(validatingErrors)
			Object.keys(validatingErrors).forEach(function(key) {
    			if(validatingErrors[key].length > 0){
    				is_disable = true
    				member_ref = `member_${key}`	
    			}
			});
			this.setState({validateErrors: validatingErrors})
			if(is_disable && document.getElementById(member_ref)){    		
		    		document.getElementById(member_ref).scrollIntoView();
	    	}else{
	    		let city
	    		let city_code
	    		let address
	    		let pincode
	    		if(this.props.is_from_payment){
	    			if(!this.state.proceed && this.props.vipClubMemberDetails && Object.keys(this.props.vipClubMemberDetails).length <4){
			    		this.setState({show_popup:true})
			    		return
			    	}
	    			{Object.entries(this.props.currentSelectedVipMembersId).map(function([key, value]) {
			    		let param =this.props.vipClubMemberDetails[value[key]]
				    		if(param.relation == 'SELF'){
			    				self_profile = this.props.vipClubMemberDetails[value[key]]
			    			}

							members={}
							if(param.relation !== 'SELF'){
								members.relation=param.relation
								members.title=param.title							
						    	members.member = param.id
						    	members.first_name=param.name
						    	members.last_name=param.last_name
						    	members.dob=param.dob
						    	members.gender=param.gender
						    	members.profile=param.profile_id
						    	members.city = self_profile.city
					    		members.city_code = self_profile.city
					    		members.address = self_profile.address
					    		members.pincode = self_profile.pincode
					    		members.email = null
					    		return data.members.push(members)
					    	}
					},this)}
					console.log(data)
	    			this.props.addVipMembersData(data,(resp)=>{
	    				if(resp.success){
	    					this.props.history.push('vip-club-activated-details')
	    				}
	    			})
	    		}else{
	    			// console.log(self_profile)
	    			var members = {}
		    		members.title = self_profile.title
		    		// members.relation = "SELF" 
		    		members.first_name = self_profile.name 
		    		members.last_name = self_profile.last_name 
		    		members.email = self_profile.email 
		    		members.dob = self_profile.dob 
		    		members.city = self_profile.state 
		    		members.city_code = self_profile.state_code
		    		members.address = self_profile.address
		    		members.pincode = self_profile.pincode
		    		members.profile = self_profile.profile_id
		    		members.gender = self_profile.gender
		    		members.relation = self_profile.relation
		    		data.members.push(members)
		    		console.log(data)
		    		this.props.vipClubPay(data,(resp)=>{
		    			if(resp && resp.payment_required){
                            this.processPayment(resp)
						}else{
							success_id = '/vip-club-activated-details?payment_success=true&id='+resp.data.id
							this.props.history.push(success_id)
						}
		    		})
	    		}
	    		// this.props.history.push('/vip-club-activated-details')
	    	}
    		
    	}
    }
    proceedMembers(is_wait){
    	this.setState({proceed:is_wait?true:false,show_popup:false},()=>{
    		if (document.getElementById('submit_buy')) {
                document.getElementById('submit_buy').click()
            }
    	})
    }
	render(){
		let child
		let adult
		let userProfile
		// let selectedProfileId = parseInt(this.props.USER.defaultProfile) // to be deleted
		let selectedMembersId =0
		if(this.props.is_from_payment && Object.keys(this.props.selected_vip_plan).length >0){
		
			userProfile = Object.assign({}, this.props.USER.profiles[this.props.USER.defaultProfile])

			var n = (this.props.selected_vip_plan.total_allowed_members - 1)
		
			if(n !== 0){
				child =this.props.currentSelectedVipMembersId.filter(x=>x.type ==='adult').map((data, i) =>{
					selectedMembersId++
						return <VipProposerFamily {...this.props} 
									key={i} 
									member_id={data[selectedMembersId]} 
									// checkForValidation ={this.checkForValidation.bind(this)} 
									is_child_only={true} 
									id={`member_${selectedMembersId}`} 
									param_id = {selectedMembersId} 
									member_view_id= {selectedMembersId} 
									validateErrors={this.state.validateErrors[data[selectedMembersId]] || []} 
									validateOtherErrors={[]} 
									createApiErrorsChild={this.state.CreateApiErrors.members?this.state.CreateApiErrors.members:[]} 
									show_selected_profiles={this.state.show_selected_profiles} 
									validateDobErrors={this.state.validateDobErrors[data[selectedMembersId]] || []} 
									errorMessages={this.state.errorMessages} 
									validatingNames={this.state.validatingNames||[]}
									is_endorsement = {false}
									endorsementError={this.state.endorsementError}
									member_type = 'child'
								/>
				})
			}
		}
		return(
			<div className="profile-body-wrap">
	            <ProfileHeader showPackageStrip={true}/> 
				<section className="container container-top-margin cardMainPaddingRmv">
					<div className="row no-gutters dsktp-row-gutter">
						<div className="col-12 col-md-7 col-lg-7 ins-main-padding">
						{
							this.state.show_popup?
							<div className="search-el-popup-overlay " >
								<div className="search-el-popup">
									<div className="widget">
										<div className="widget-content padiing-srch-el">
											<p className="srch-el-conent"> 2 Members Added</p>
											<p className="srch-el-conent">
												Are you sure you want to submit? 
												Member details once submited cannot be added or edited later.</p>
											<div className="search-el-btn-container">
												<button onClick={this.proceedMembers.bind(this, 0)}>No Wait</button>
												{/* <span className="src-el-btn-border"></span> */}
												<button onClick={this.proceedMembers.bind(this, 1)}>Submit</button>
											</div>
										</div>
									</div>

								</div>
							</div>
							:''
						}
						<section className="profile-book-screen">
							<div>
								<div className="insurance-member-container" style={{padding:0}}>
									<h4 className="mb-0" style={{padding:'2px 0px 6px'}}>Enter Proposer Details</h4>
									<div className="widget" style={{padding:'10px'}}>
										{/*<div className="plcy-cancel-div"> // to be deleted
											<p className="plcy-cancel mb-0 fw-500">*Incorrect member details may lead to policy cancellation</p>
										</div>
										<p className="fw-500 d-block" style={{fontSize: 11, color:'#F44336', marginTop:5, paddingLeft:8}}>*All fields are mandatory</p>*/}
										<div className="insurance-member-details mrt-20">
											<VipProposer {...this.props} 
												// checkForValidation ={this.checkForValidation.bind(this)}  // to be deleted
												id={`member_${this.props.USER.defaultProfile}`} 
												member_id={this.props.USER.defaultProfile} 
												validateErrors={this.state.validateErrors[this.props.USER.defaultProfile == 999999?0:this.props.USER.defaultProfile] || []}
												validateOtherErrors={this.state.validateOtherErrors[this.props.USER.defaultProfile] || []} 
												createApiErrors={this.state.CreateApiErrors.members?this.state.CreateApiErrors.members[0]:[]} 
												errorMessages={this.state.errorMessages} 
												is_endorsement = {false} 
												endorsementError={this.state.endorsementError}
												// checkIsEmailVerfied = {this.checkIsEmailVerfied.bind(this)} // to be deleted
												member_type='adult'
												/>
										</div>
									</div>
									
									{child}
								</div>
							</div>
							{this.props.is_from_payment && this.props.currentSelectedVipMembersId && this.props.currentSelectedVipMembersId.length <= 3?
								<button className="add-mem-blk" onClick={this.addMembers.bind(this)}> <img className="vip-add-img" src={ASSETS_BASE_URL + '/img/vip-mem.svg'} />{`Add ${this.props.currentSelectedVipMembersId.length == 2?'3rd':this.props.currentSelectedVipMembersId.length == 3?'4th':''} Member `}</button>
							:''
							}
						</section>
							{
								this.props.selected_vip_plan && Object.keys(this.props.selected_vip_plan).length >0 && !this.props.is_from_payment?
									<button className="v-btn p-3 v-btn-primary btn-lg fixed horizontal bottom no-round btn-lg text-lg sticky-btn" onClick={this.proceedPlan.bind(this)}>Continue to Pay ₹{this.props.selected_vip_plan.deal_price}
										<span className="foot-btn-sub-span"></span>
									</button>
								:''
							}
							{
								this.props.selected_vip_plan && Object.keys(this.props.selected_vip_plan).length >0 && this.props.is_from_payment?
									<button id="submit_buy" className="v-btn p-3 v-btn-primary btn-lg fixed horizontal bottom no-round btn-lg text-lg sticky-btn" onClick={this.proceedPlan.bind(this)}>Submit
										<span className="foot-btn-sub-span"></span>
									</button>
								:''
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
	}
	
}


export default VipClubMemberDetailsView