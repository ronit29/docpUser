import React from 'react'
import ProfileHeader from '../commons/DesktopProfileHeader'
import ChatPanel from '../commons/ChatPanel'
import InsurSelf from './insuranceSelf.js'
import InsurOthers from './insuranceFamily.js'
import InsurCommon from './insuranceCommonSection.js'
import SnackBar from 'node-snackbar'

class InsuranceInputView extends React.Component{
	constructor(props) {
        super(props)
        this.state = {
            // selected_plan_plan:'',
            no_lname:false,
            is_edit:true,
            gst: 'inclusive of 18% GST',
            enable_proceed:false,
            profiles_selected:[],
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
           	errorMessages:[]
        }
    }
    componentDidMount(){
    	let self = this
    	if(window){
    		window.scrollTo(0,0)
    	}
    	this.setState({...self.props.self_data_values, selected_plan_price:this.props.selected_plan.amount})
    	if(this.props.create_payment_resp){
    		if(this.props.create_payment_resp.members && this.props.create_payment_resp.members.length >0){
    			this.setState({CreateApiErrors:self.props.create_payment_resp})	
    		}
    		
    	}
    }

    componentWillReceiveProps(props){
    	let card
    	let self = this
    	let isDummyUser
    	if(!this.state.saveMembers && Object.keys(props.selected_plan).length >0 && props.USER.defaultProfile && !props.currentSelectedInsuredMembersId.length){
    		// let loginUser = props.USER.selectedProfile
    		let loginUser = props.USER.defaultProfile
    		let membersId = []
    		let isDefaultUser
    		if(props.USER.profiles && Object.keys(props.USER.profiles).length && props.USER.profiles[props.USER.defaultProfile]){
    			isDefaultUser = props.USER.profiles[props.USER.defaultProfile].is_default_user
    		}
    		isDummyUser = props.USER.profiles[props.USER.defaultProfile].isDummyUser
    		if(!isDummyUser){
	    		membersId.push({'0':loginUser})
	    		var n = (props.selected_plan.adult_count + props.selected_plan.child_count) - 1;
				if(n !== 0){
					card = [...Array(n)].map((e, i) => {
						membersId.push({[i+1]: i+1})
					})
				}
			}else{
				membersId.push({'0':0})
				var n = (props.selected_plan.adult_count + props.selected_plan.child_count) - 1;
				if(n !== 0){
					card = [...Array(n)].map((e, i) => {
						membersId.push({[i+1]: i+1})
					})
				}
			}
			props.saveCurrentSelectedMembers(membersId)
			this.setState({ saveMembers: true})
    	}
    	let profileLength = Object.keys(props.USER.profiles).length;
		let currentSelectedProfiles = []
		let show_selected_profile = []
        this.props.currentSelectedInsuredMembersId.map((val,key) => {
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

    checkForValidation(profile_data, member_id){
    	let profiles = this.state.profiles_selected
    	if(profiles.length){
    		profiles = this.state.profiles_selected.filter((x => x.id != member_id))
    	}
    	profiles.push(profile_data)

    	let is_enable = profiles.filter(x=> !x.isformCompleted)
    	is_enable = is_enable.length?false:true
    	this.setState({enable_proceed: is_enable, profiles_selected: profiles})
    }

    proceedPlan(){
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
    	this.props.currentSelectedInsuredMembersId.map((val,key) => {
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
    	this.props.currentSelectedInsuredMembersId.map((val,key) => {
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
					if(param.town == ""){
						is_disable = true
						fields.push('town')
					}
					if(param.district == ""){
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

				if(fields.length > 0 || empty_feilds.length > 0 || dobError.length > 0){	
					is_disable = true
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
					member_ref = `member_${param.id}`
				}
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
				validatingErrors[key] = fields
				validatingDobErrors[key] = dobError
				if(param.member_type == 'adult'){
					validatingOtherErrors[key] = empty_feilds
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
		this.setState({validateErrors: validatingErrors,validateOtherErrors: validatingOtherErrors,validatingNames:invalidname,validateDobErrors:validatingDobErrors,errorMessages:errorMessagesObj})
    	if(is_disable && document.getElementById(member_ref)){    		
    		document.getElementById(member_ref).scrollIntoView();
    	}else{
    		this.SaveUserData(this.props)
			this.props.history.push('/insurance/insurance-user-details-review')
    	}
    }

    SaveUserData(props){
    	let self = this
    	var insuranceUserData={}
    	var members={}
    	// insuranceUserData.insurnaceData = props.insurnaceData
    	insuranceUserData.selected_plan_id=props.selected_plan.id
    	// insuranceUserData.insurer= props.insurnaceData['insurance'][0].id
    	insuranceUserData.members= []
    	// insuranceUserData.selected_plan = []
    	insuranceUserData.currentSelectedInsuredMembersId = this.props.currentSelectedInsuredMembersId

    	Object.entries(this.props.currentSelectedInsuredMembersId).map(function([key, value]) {
    		members={}
			members={...self.props.self_data_values[value[key]]}
			return 	insuranceUserData.members.push(members)
		})
    	console.log(insuranceUserData)
		this.props.pushUserData(insuranceUserData)
    }
    
	render(){
		let child
		let adult
		let userProfile
		let selectedProfileId = parseInt(this.props.USER.defaultProfile)
		if(Object.keys(this.props.selected_plan).length >0){
		
			userProfile = Object.assign({}, this.props.USER.profiles[this.props.USER.defaultProfile])
			
			if(this.props.selected_plan.adult_count == 2 && this.props.currentSelectedInsuredMembersId.length>1){
			
				adult = <InsurOthers {...this.props} 
							self_gender={userProfile.gender} 
							param_id = {'1'} 
							member_id={this.props.currentSelectedInsuredMembersId[1]['1']} 
							checkForValidation ={this.checkForValidation.bind(this)} 
							id={`member_${0}`} 
							validateErrors={this.state.validateErrors['1'] || []} 
							validateOtherErrors={this.state.validateOtherErrors['1'] || []} 
							createApiErrors={this.state.CreateApiErrors.members?this.state.CreateApiErrors.members[1]:[]}
							show_selected_profiles={this.state.show_selected_profiles} 
							validateDobErrors={[]} 
							errorMessages={this.state.errorMessages} 
							validatingNames={this.state.validatingNames||[]}
						/>
			}
		
			var n = (this.props.selected_plan.child_count);
		
			if(n !== 0){
				child =this.props.currentSelectedInsuredMembersId.map((data, i) =>{
					if(i!=0 && i!=1){
			
						return <InsurOthers {...this.props} 
									key={i} 
									member_id={data[i]} 
									checkForValidation ={this.checkForValidation.bind(this)} 
									is_child_only={true} 
									id={`member_${i+1}`} 
									param_id = {i} 
									member_view_id= {i} 
									validateErrors={this.state.validateErrors[i] || []} 
									validateOtherErrors={[]} 
									createApiErrorsChild={this.state.CreateApiErrors.members?this.state.CreateApiErrors.members:[]} 
									show_selected_profiles={this.state.show_selected_profiles} 
									validateDobErrors={this.state.validateDobErrors[i] || []} 
									errorMessages={this.state.errorMessages} 
									validatingNames={this.state.validatingNames||[]}
								/>
					}
				})
			}

		}
		return(
			<div className="profile-body-wrap">
	            <ProfileHeader /> 
				<section className="container container-top-margin">
					<div className="row main-row parent-section-row">
						<div className="col-12 col-md-7 col-lg-7 ins-main-padding">
						<section className="profile-book-screen">
							<div className="widget">
								<InsurCommon {...this.props} is_edit={this.state.is_edit}/>
								<div className="insurance-member-container">
									<h4>Insured Member Details</h4>
									<p className="fill-error-span fw-500 text-right d-block" style={{marginTop:'0px'}}>*All fields are mandatory
									</p>
									<div className="insurance-member-details">
										<InsurSelf {...this.props} checkForValidation ={this.checkForValidation.bind(this)} id={`member_${this.props.USER.defaultProfile}`} member_id={this.props.USER.defaultProfile} validateErrors={this.state.validateErrors['0'] || []} validateOtherErrors={this.state.validateOtherErrors['0'] || []} createApiErrors={this.state.CreateApiErrors.members?this.state.CreateApiErrors.members[0]:[]} errorMessages={this.state.errorMessages}/>
										{adult}
										{child}
									</div>
								</div>
							</div>
						</section>		
							<button className="v-btn p-3 v-btn-primary btn-lg fixed horizontal bottom no-round btn-lg text-lg sticky-btn" onClick={this.proceedPlan.bind(this)}>Confirm (₹ {this.state.selected_plan_price})
								<span className="foot-btn-sub-span">{this.state.gst}</span>
							</button>
						</div>
					<ChatPanel />
					</div>
				</section>
			</div>
			)
	}
	
}


export default InsuranceInputView