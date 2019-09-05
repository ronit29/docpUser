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
            // selected_plan_plan:'',
            // no_lname:false,
            is_edit:true,
            // gst: 'inclusive of 18% GST', // to be deleted
            // enable_proceed:false,// to be deleted
            // profiles_selected:[], // to be deleted
            saveMembers:false,
            // is_adult_only: false,
            // is_disable: [],
            // isValidated: false,
            validateErrors:{},
            validateOtherErrors:{},
            validatingNames:[],
            CreateApiErrors:{},
            show_selected_profiles:[],
            validateDobErrors:[],
           	errorMessages:[],
           	endorsementError:[],
           	paymentData: null
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
						
						// if(param.relation == ""){ //common validation
						// 	is_disable = true
						// 	fields.push('relation')
						// }

						if(param.title == ""){
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

						if(param.relation =='SELF'){
							if(param.state == "" || param.state_code == ""){  
								is_disable = true
								fields.push('state')
							}
							if(param.address == ""){  
								is_disable = true
								fields.push('address')
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
	    		if(this.props.is_from_payment){
	    			console.log('yes')
	    			{Object.entries(this.props.currentSelectedVipMembersId).map(function([key, value]) {
			    		let param =this.props.vipClubMemberDetails[value[key]]
				    		if(param.relation == 'SELF'){
			    				self_profile = this.props.vipClubMemberDetails[value[key]]
			    			}

							members={}
							members.relation=param.relation
							members.title=param.title							
					    	members.member = param.id
					    	members.first_name=param.name
					    	members.dob=param.dob
					    	members.gender=param.gender
					    	members.profile=param.profile_id
					    	members.city = self_profile.state 
				    		members.city_code = self_profile.state_code
				    		members.address = self_profile.address
				    		members.pincode = self_profile.pincode
				    		members.email = self_profile.email
							return 	data.members.push(members)
					},this)}
					console.log(data)
	    			// this.props.addVipMembersData()
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
											<VipProposer {...this.props} 
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
									
									{child}
								</div>
							</div>
							{this.props.is_from_payment && this.props.currentSelectedVipMembersId && this.props.currentSelectedVipMembersId.length <= 3?
								<button className="add-mem-blk" onClick={this.addMembers.bind(this)}> <img className="vip-add-img" src={ASSETS_BASE_URL + '/img/vip-mem.svg'} />{`Add ${this.props.currentSelectedVipMembersId.length == 2?'3rd':this.props.currentSelectedVipMembersId.length == 3?'4th':''} Member `}</button>
							:''
							}
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
				{
                    this.state.paymentData ? <PaymentForm paymentData={this.state.paymentData} refs='opd' /> : ""
                }
			</div>
			)
	}
	
}


export default VipClubMemberDetailsView