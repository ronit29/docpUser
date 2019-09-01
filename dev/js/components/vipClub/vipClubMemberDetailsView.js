import React from 'react'
import ProfileHeader from '../commons/DesktopProfileHeader'
import ChatPanel from '../commons/ChatPanel'
import InsurSelf from './vipClubSelf.js'
import InsurOthers from './vipClubFamilyMembers.js'
import SnackBar from 'node-snackbar'

class InsuranceInputView extends React.Component{
	constructor(props) {
        super(props)
        this.state = {
            // selected_plan_plan:'',
            no_lname:false,
            is_edit:true,
            // gst: 'inclusive of 18% GST', // to be deleted
            // enable_proceed:false,// to be deleted
            // profiles_selected:[], // to be deleted
            saveMembers:false,
            // is_adult_only: false,
            is_disable: [],
            // isValidated: false,
            validateErrors:{},
            validateOtherErrors:{},
            validatingNames:[],
            CreateApiErrors:{},
            show_selected_profiles:[],
            validateDobErrors:[],
           	errorMessages:[],
           	endorsementError:[]
        }
    }
    componentDidMount(){
    	let self = this
    	if(window){
    		window.scrollTo(0,0)
    	}
    	// to be deleted
    	/*this.setState({...self.props.self_data_values, selected_plan_price:this.props.selected_plan.amount})
    	if(this.props.create_payment_resp){
    		if(this.props.create_payment_resp.members && this.props.create_payment_resp.members.length >0){
    			this.setState({CreateApiErrors:self.props.create_payment_resp})	
    		}
    		
    	}*/
    }

    componentWillReceiveProps(props){
    	let card
    	let self = this
    	let isDummyUser
    	// console.log(this.state.saveMembers)
    	// console.log(Object.keys(props.selected_vip_plan).length)
    	// console.log(props.USER.defaultProfile)
    	// console.log(!props.currentSelectedVipMembersId.length)
    	if(!this.state.saveMembers && Object.keys(props.selected_vip_plan).length >0 && props.USER.defaultProfile && !props.currentSelectedVipMembersId.length){
    		let loginUser = props.USER.defaultProfile
    		let membersId = []
    		let isDefaultUser
    		if(props.USER.profiles && Object.keys(props.USER.profiles).length && props.USER.profiles[props.USER.defaultProfile]){
    			isDefaultUser = props.USER.profiles[props.USER.defaultProfile].is_default_user
    		}
    		isDummyUser = props.USER.profiles[props.USER.defaultProfile].isDummyUser

    		if(!isDummyUser){
	    		membersId.push({'0':loginUser, type: 'self'})
	    		if(props.is_from_payment){
		    		var n = props.selected_vip_plan.total_allowed_members - 1;
		    		card = [...Array(props.selected_vip_plan.total_allowed_members -1)].map((e, i) => {
							membersId.push({[i+1]: i+1, type:'adult'})
						})
		    	}
			}else{
				membersId.push({'0':0, type:'self'})
				if(props.is_from_payment){
		    		var n = props.selected_vip_plan.total_allowed_members - 1;
		    		card = [...Array(props.selected_vip_plan.total_allowed_members -1)].map((e, i) => {
							membersId.push({[i+1]: i+1, type:'adult'})
						})
		    	}
			}
			// props.saveCurrentSelectedMembers(membersId)
			props.saveCurrentSelectedVipMembers(membersId)
			this.setState({ saveMembers: true})
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

    /*checkForValidation(profile_data, member_id){ // to be deleted
    	let profiles = this.state.profiles_selected
    	if(profiles.length){
    		profiles = this.state.profiles_selected.filter((x => x.id != member_id))
    	}
    	profiles.push(profile_data)

    	let is_enable = profiles.filter(x=> !x.isformCompleted)
    	is_enable = is_enable.length?false:true
    	this.setState({enable_proceed: is_enable, profiles_selected: profiles})
    }*/

    /*proceedPlan(){
    	let is_disable  = false
    	let member_ref = ''
    	let empty_feilds = []
    	let currentSelectedProfiles = []
    	let fields_name = []
    	let fields_name_obj = {}
    	let errorMessagesObj = {}
    	let self_profile
    	let self_age
    	let adult2age
    	this.props.currentSelectedVipMembersId.map((val,key) => {
    		currentSelectedProfiles.push(val[key])
    	})
    	let validatingErrors = {}
    	let validatingDobErrors = {}
    	let validatingName = {}
    	let validatingOtherErrors = {}
    	let invalidname = []
    	let fullname
    	let fullnameObj={}
    	let isDummyUser
    	if(Object.keys(this.props.self_data_values).length > 0){
    		isDummyUser = this.props.USER.profiles[this.props.USER.defaultProfile].isDummyUser
    		if(!isDummyUser){
    			self_profile  = Object.assign({}, this.props.self_data_values[this.props.USER.defaultProfile])	
    		}else{
    			self_profile  = Object.assign({}, this.props.self_data_values[0])
    		}
    	}
    	this.props.currentSelectedVipMembersId.map((val,key) => {
    		if(Object.keys(this.props.self_data_values).length > 0){
    			let fields = []
    			let dobError = []
    			let param =this.props.self_data_values[val[key]]
				if(param.title == ""){  //common validation
					is_disable = true
					fields.push('title')
				}

				if(param.relation == ""){
					is_disable = true
					fields.push('relation')
				}

				if(param.name == ""){
					is_disable = true
					fields.push('name')
				}

				if(param.gender == ""){
					is_disable = true
					fields.push('gender')
				}

				if(param.dob == null || param.dob == ""){
					is_disable = true
					fields.push('dob')
				}

				if(!param.no_lname && param.relation !== 'self'){
					if(param.last_name ==""){
						is_disable = true
						fields.push('last_name')	
					}
				}

				if(param.relation== 'self'){ //only self validation
					if(param.pincode == ""){
						is_disable = true
						fields.push('pincode')
					}
					if(param.address == ""){
						is_disable = true
						fields.push('address')
					}
					if(param.state == "" || param.state_code == 0){
						is_disable = true
						fields.push('state')
					}
					if(param.town == "" || param.town_code == ''){
						is_disable = true
						fields.push('town')
					}
					if(param.district == "" || param.district == ''){
						is_disable = true
						fields.push('district')
					}
					if(param.email == ""){
						is_disable = true
						fields.push('email')
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

				if(param.member_type == 'adult'){ // only adult validation in case of same gender or title
					if(param.only_adult && param.title !== ""){
						if(self_profile.title == param.title){
							is_disable = true
							empty_feilds.push('title')	
						} 
					}
					if(param.gender != '' && param.title !=''){
						if(param.gender == 'm' && param.title !='mr.'){
							is_disable = true
							empty_feilds.push('gender')	
						}else if(param.gender == 'f' && param.title=='mr'){
							is_disable = true
							empty_feilds.push('gender')	
						}
					}
					if(param.pincode && param.pincode !==''){
						if(param.pincode.length <6){
							is_disable = true
							empty_feilds.push('pincode')		
						}
					}
				}

				if(param.dob != null && param.member_type== 'adult'){ //dob validation
					let today = new Date();
				    let birthDate = new Date(param.dob);
				    let age = today.getFullYear() - birthDate.getFullYear();
				    let m = today.getMonth() - birthDate.getMonth();
				    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
				        age--;
				    }
				    if(param.relation== 'self'){
						self_age = age
					}else{
						adult2age = age
					}
				    if(this.props.selected_plan.threshold.length>0){
				    	if(parseInt(age) < parseInt(this.props.selected_plan.threshold[0].min_age) || 
					    	parseInt(age) > parseInt(this.props.selected_plan.threshold[0].max_age)){
				  			fields.push('dob')
				  			is_disable = true			    
						}
					}
				}else if(param.dob != null && param.member_type== 'child'){	
					let childAge				
					let today = new Date();
				    let birthDate = new Date(param.dob);
				    childAge = today.getFullYear() - birthDate.getFullYear();
				    let m = today.getMonth() - birthDate.getMonth();
				    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
				        childAge--;
				    }
					let oneDay = 24*60*60*1000;
					let firstDate = new Date();
					let secondDate = new Date(param.dob);
					let diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime())/(oneDay)));
					if(this.props.selected_plan.threshold.length>0){
						let minAgeOfAdults = Math.min(self_age,adult2age)
						let adultChildAgeDiff = minAgeOfAdults - childAge
						let child_age = this.props.selected_plan.threshold[0].child_min_age
						let child_max_age = this.props.selected_plan.threshold[0].child_max_age
						if(parseInt(diffDays) < parseInt(child_age) || parseInt(childAge) > parseInt(child_max_age)){
				  			fields.push('dob')
				  			is_disable = true			    
						}
						if(adultChildAgeDiff < 18){
							dobError.push('dob')
				  			is_disable = true
						}
					}
				}

				if(this.props.selected_plan.threshold.length>0){
					errorMessagesObj.child_max_age= this.props.selected_plan.threshold[0].child_max_age
					errorMessagesObj.child_min_age= this.props.selected_plan.threshold[0].child_min_age
					errorMessagesObj.max_age= this.props.selected_plan.threshold[0].max_age
					errorMessagesObj.min_age= this.props.selected_plan.threshold[0].min_age
					errorMessagesObj.common_message= '*This is a mandatory field'
					errorMessagesObj.max_character= 'Maximum character limit: 50'
					errorMessagesObj.valid_email= '*Please enter a valid email'
					errorMessagesObj.adult_age = `*Age should be more than ${this.props.selected_plan.threshold[0].min_age} years and less than ${this.props.selected_plan.threshold[0].max_age} years`
					errorMessagesObj.child_age = `*Age should be more than ${this.props.selected_plan.threshold[0].child_min_age} days and less than ${this.props.selected_plan.threshold[0].child_max_age} years`
					errorMessagesObj.sameGenderTitle = "*Both the Adults can't have same Gender and Title"
					errorMessagesObj.shouldGenderTitle = "*Both Gender and Title can't be different"
					errorMessagesObj.childAgeDiff = '*Difference between age of child and adult should be more than 18 years'						
				}
				// if(fields.length > 0 || empty_feilds.length > 0 || dobError.length > 0){	
				// 	is_disable = true
				// 	member_ref = `member_${param.id}`
				// }
				if(param.name != "" && param.middle_name != "" && param.last_name != "" && !param.no_lname){//name validation
					let fullnameObj={}
					fullname = param.name+param.middle_name+param.last_name
					fullnameObj.id=param.id
					fullnameObj.fName=fullname.toLowerCase()
					fields_name.push(fullnameObj)
				}else if(param.name != "" && param.middle_name == "" && param.last_name != "" && !param.no_lname){
					let fullnameObj={}
					fullname = param.name+param.middle_name+param.last_name
					fullnameObj.id=param.id
					fullnameObj.fName=fullname.toLowerCase()
					fields_name.push(fullnameObj)
				}else if(param.name != "" && param.middle_name == "" && param.last_name == "" && !param.no_lname){
					let fullnameObj={}
					fullname = param.name
					fullnameObj.id=param.id
					fullnameObj.fName=fullname.toLowerCase()
					fields_name.push(fullnameObj)
				}else if(param.name != "" && param.no_lname){
					let fullnameObj={}
					fullname = param.name
					fullnameObj.id=param.id
					fullnameObj.fName=fullname.toLowerCase()
					fields_name.push(fullnameObj)
				}
				
				validatingErrors[param.id] = fields
				validatingDobErrors[param.id] = dobError
				if(param.member_type == 'adult'){
					validatingOtherErrors[param.id] = empty_feilds
				}
    		}
    	})		
		validatingName = fields_name
			let newArray=[]
			let ArrayFlag=true
			Object.entries(validatingName).map(function([key, value]) {
				if(ArrayFlag){
					newArray =  validatingName.filter((name=> name.fName == value.fName))
				}
				if(newArray.length>1){
					ArrayFlag = false
				}
			})
			if(newArray.length >1){
				member_ref = `member_${newArray[1].id}`
				let id = 'id=' + newArray[1].id
				if(newArray[1].name != '' && newArray[1].middle_name != '' && newArray[1].last_name !=''){
					invalidname.push(id)
				}else if(newArray[1].name != '' && newArray[1].middle_name == '' && newArray[1].last_name !=''){
					invalidname.push(id)
				}
				is_disable = true
				errorMessagesObj.sameName = '*Name of the members cannot be same'
			}

			Object.keys(validatingErrors).forEach(function(key) {
    			if(validatingErrors[key].length > 0){
    				is_disable = true
    				member_ref = `member_${key}`	
    			}
			});

			Object.keys(validatingOtherErrors).forEach(function(key) {
    			if(validatingOtherErrors[key].length > 0){
    				is_disable = true
    				member_ref = `member_${key}`	
    			}
			});

			Object.keys(validatingDobErrors).forEach(function(key) {
    			if(validatingDobErrors[key].length > 0){
    				is_disable = true
    				member_ref = `member_${key}`	
    			}
			});

			
			console.log('validateErrors')
			console.log(validatingErrors)
			console.log('validateOtherErrors')
			console.log(validatingOtherErrors)
			console.log('validatingNames')
			console.log(invalidname)
			console.log('validatingDobErrors')
			console.log(validatingDobErrors)
			console.log('member_ref')
			console.log(member_ref)
		this.setState({validateErrors: validatingErrors,validateOtherErrors: validatingOtherErrors,validatingNames:invalidname,validateDobErrors:validatingDobErrors,errorMessages:errorMessagesObj})
    	if(is_disable && document.getElementById(member_ref)){    		
    		document.getElementById(member_ref).scrollIntoView();
    	}else{
    		this.SaveUserData(this.props)
			this.props.history.push('/insurance/insurance-user-details-review')
    	}
    }*/

    /*SaveUserData(props){ // to be deleted
    	let self = this
    	var insuranceUserData={}
    	var members={}
    	insuranceUserData.selected_plan_id=props.selected_plan.id
    	insuranceUserData.members= []
    	insuranceUserData.currentSelectedVipMembersId = this.props.currentSelectedVipMembersId

    	Object.entries(this.props.currentSelectedVipMembersId).map(function([key, value]) {
    		members={}
			members={...self.props.self_data_values[value[key]]}
			return 	insuranceUserData.members.push(members)
		})
		this.props.pushUserData(insuranceUserData)
    }*/

    /*checkIsEmailVerfied(){// to be deleted
    	
    }*/
    
    proceedPlan(){ //new
    	let data = {}
    	let isDummyUser
    	let self_profile={}
    	let is_disable  = false
    	let member_ref = ''
    	let empty_feilds = []
    	let currentSelectedProfiles = []
    	let fields_name = []
    	let fields_name_obj = {}
    	let errorMessagesObj = {}
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
    			console.log(param)
					if(param.relation == ""){
						is_disable = true
						fields.push('relation')
					}

					if(param.title == ""){  //common validation
						is_disable = true
						fields.push('title')
					}

					if(param.name == ""){
						is_disable = true
						fields.push('name')
					}

					if(param.last_name == ""){
						is_disable = true
						fields.push('last_name')
					}

					if(param.dob == null || param.dob == ""){
						is_disable = true
						fields.push('dob')
					}
    			}
    			validatingErrors[param.id] = fields
    		})
    		console.log(validatingErrors)
			console.log()
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
	    		this.props.history.push('/vip-club-activated-details')
	    	}

    		/*if(Object.keys(self_profile).length > 0){
    			let fields = []
				if(self_profile.title == ""){  //common validation
					is_disable = true
					fields.push('title')
				}
				if(self_profile.first_name == ""){ 
					is_disable = true
					fields.push('name')
				}
				if(self_profile.last_name == ""){  
					is_disable = true
					fields.push('last_name')
				}
				if(self_profile.email == ""){  
					is_disable = true
					fields.push('email')
				}
				if(self_profile.dob == null){  
					is_disable = true
					fields.push('dob')
				}
				if(self_profile.state == "" || self_profile.state_code == ""){  
					is_disable = true
					fields.push('state')
				}
				if(self_profile.address == ""){  
					is_disable = true
					fields.push('address')
				}
				if(self_profile.pincode == ""){  
					is_disable = true
					fields.push('pincode')
				}

				if(self_profile.email !='' && self_profile.relation == 'self'){
					let validEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		  			validEmail = validEmail.test(self_profile.email)
		  			if(!validEmail){
		  				is_disable = true
						fields.push('email')		
		  			}
				}
				validatingErrors[self_profile.id] = fields
			}
			console.log(validatingErrors)
			console.log()
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
	    		var members = {}
	    		members.title = self_profile.title 
	    		members.first_name = self_profile.name 
	    		members.last_name = self_profile.last_name 
	    		members.email = self_profile.email 
	    		members.dob = self_profile.dob 
	    		members.city = self_profile.state 
	    		members.city_code = self_profile.state_code
	    		members.address = self_profile.address
	    		members.pincode = self_profile.pincode
	    		members.profile = self_profile.profile_id
	    		
	    		// this.SaveUserData(this.props)
	    		data.members.push(members)
	    		console.log(data)
	    		this.props.vipClubPay(data)
				// this.props.history.push('/insurance/insurance-user-details-review')
	    	}*/
    	}
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
						return <InsurOthers {...this.props} 
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
						<section className="profile-book-screen">
							<div>
								{/*<InsurCommon {...this.props} is_edit={this.state.is_edit}/>*/} 
								<div className="insurance-member-container" style={{padding:0}}>
									<h4 className="mb-0" style={{padding:'2px 0px 6px'}}>Enter Proposer Details</h4>
									<div className="widget" style={{padding:'10px'}}>
										{/*<div className="plcy-cancel-div"> // to be deleted
											<p className="plcy-cancel mb-0 fw-500">*Incorrect member details may lead to policy cancellation</p>
										</div>
										<p className="fw-500 d-block" style={{fontSize: 11, color:'#F44336', marginTop:5, paddingLeft:8}}>*All fields are mandatory</p>*/}
										<div className="insurance-member-details mrt-20">
											<InsurSelf {...this.props} 
												// checkForValidation ={this.checkForValidation.bind(this)}  // to be deleted
												id={`member_${this.props.USER.defaultProfile}`} 
												member_id={this.props.USER.defaultProfile} 
												validateErrors={this.state.validateErrors[this.props.USER.defaultProfile] || []}
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
									{adult}
									{child}
								</div>
							</div>
						</section>		
							{
								this.props.selected_vip_plan && Object.keys(this.props.selected_vip_plan).length >0?
									<button className="v-btn p-3 v-btn-primary btn-lg fixed horizontal bottom no-round btn-lg text-lg sticky-btn" onClick={this.proceedPlan.bind(this)}>Continue to Pay ₹{this.props.selected_vip_plan.deal_price}
										<span className="foot-btn-sub-span"></span>
									</button>
								:''
							}
						</div>
					<ChatPanel />
					</div>
				</section>
			</div>
			)
	}
	
}


export default InsuranceInputView