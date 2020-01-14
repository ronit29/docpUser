import React from 'react'
import ProfileHeader from '../commons/DesktopProfileHeader'
import ChatPanel from '../commons/ChatPanel'
import InsurSelf from './insuranceSelf.js'
import InsurOthers from './insuranceFamily.js'
import InsurCommon from './insuranceCommonSection.js'
import SnackBar from 'node-snackbar'
import STORAGE from '../../helpers/storage'

class InsuranceEndoresmentInputView extends React.Component{
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
           	errorMessages:[],
           	endorsementError:[],
           	emailVerified:false
        }
    }
    componentDidMount(){
    	let self = this
    	if(window){
    		window.scrollTo(0,0)
    	}
    	let card
    	let membersId = []
    	if(this.props.endorseData && this.props.endorseData.members.length>0){
    		card = this.props.endorseData.members.map((member, i) => {
						membersId.push({[i]: member.id})
					})
    		this.props.saveCurrentSelectedMembers(membersId) // to save current selected members data in store
			this.setState({ saveMembers: true})

    	}
    	this.setState({...self.props.self_data_values, selected_plan_price:this.props.selected_plan.amount})
    	if(this.props.create_payment_resp){
    		if(this.props.create_payment_resp.members && this.props.create_payment_resp.members.length >0){
    			this.setState({CreateApiErrors:self.props.create_payment_resp})	
    		}
    		
    	}
    }

    componentWillReceiveProps(props){
    	// let card
    	// let self = this
    	// let isDummyUser
    	// let membersId = []
  //   	if(!this.state.saveMembers && Object.keys(props.selected_plan).length >0 && props.USER.defaultProfile && !props.currentSelectedInsuredMembersId.length){
  //   		// let loginUser = props.USER.selectedProfile
  //   		let loginUser = props.USER.defaultProfile
  //   		let membersId = []
  //   		let isDefaultUser
  //   		if(props.USER.profiles && Object.keys(props.USER.profiles).length && props.USER.profiles[props.USER.defaultProfile]){
  //   			isDefaultUser = props.USER.profiles[props.USER.defaultProfile].is_default_user
  //   		}
  //   		isDummyUser = props.USER.profiles[props.USER.defaultProfile].isDummyUser
  //   		if(!isDummyUser){
	 //    		membersId.push({'0':loginUser})
	 //    		var n = (props.selected_plan.adult_count + props.selected_plan.child_count) - 1;
		// 		if(n !== 0){
		// 			card = [...Array(n)].map((e, i) => {
		// 				membersId.push({[i+1]: i+1})
		// 			})
		// 		}
		// 	}else{
		// 		membersId.push({'0':0})
		// 		var n = (props.selected_plan.adult_count + props.selected_plan.child_count) - 1;
		// 		if(n !== 0){
		// 			card = [...Array(n)].map((e, i) => {
		// 				membersId.push({[i+1]: i+1})
		// 			})
		// 		}
		// 	}
		// 	props.saveCurrentSelectedMembers(membersId)
		// 	this.setState({ saveMembers: true})
  //   	}
  //   	let profileLength = Object.keys(props.USER.profiles).length;
		// let currentSelectedProfiles = []
		// let show_selected_profile = []
  //       this.props.currentSelectedInsuredMembersId.map((val,key) => {
  //           currentSelectedProfiles.push(val[key])
  //       })
	 //    if(profileLength > 0){
	 //    	if(!props.USER.profiles[props.USER.defaultProfile].isDummyUser){
		// 		{Object.entries(props.USER.profiles).map(function([key, value]) {

		// 			if(currentSelectedProfiles.indexOf(parseInt(key)) == -1 && key !== props.USER.defaultProfile){
		// 				show_selected_profile.push(key)
		// 			}
		// 		})}
		// 		self.setState({show_selected_profiles : show_selected_profile})
		// 	}
		// }
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

    checkIsEmailVerfied(){
    	this.setState({emailVerified:true})
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
    	let all_id_proofs = []
    	let is_fields_edited = []
    	let edited_fields ={}
    	let member_proof=[]
    	let newIdProofs
    	let isAgent=false
    	if(Object.keys(this.props.self_data_values).length > 0){
    		// isDummyUser = this.props.USER.profiles[this.props.USER.defaultProfile].isDummyUser
    		// if(!isDummyUser){
    		// 	self_profile  = Object.assign({}, this.props.self_data_values[this.props.USER.defaultProfile])	
    		// }else{
    		// 	self_profile  = Object.assign({}, this.props.self_data_values[0])
    		// }
    		// self_profile  = Object.assign({}, this.props.self_data_values[0])
    		this.props.currentSelectedInsuredMembersId.map((val,key) => {
    			if(this.props.self_data_values[val[key]].relation == 'self'){
    				self_profile  = Object.assign({}, this.props.self_data_values[val[key]])
    			}
    		})
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

				if(!param.no_lname){
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
			// validating is user had changed anything	
			if(this.props.endorsed_member_data.members.length == Object.keys(this.props.self_data_values).length){
				for(var i =0;i < this.props.endorsed_member_data.members.length;i++) {
					let id = this.props.endorsed_member_data.members[i].id
					if(this.props.self_data_values[id]) {
						let selectedProfile = this.props.self_data_values[id]
						let selectedApiProfile = this.props.endorsed_member_data.members[i]
						for(let j in  selectedApiProfile ) {							
							if(j=='first_name') {
								if(selectedProfile['name'] !=selectedApiProfile['first_name']){
									is_fields_edited.push(id)
									if(edited_fields[id]) {

									}else {
										edited_fields[id] = []
									}
									edited_fields[id].push(j)
								}
							}
							if(j!='email') {
								if(selectedProfile[j] != selectedApiProfile[j]) {
									is_fields_edited.push(id)
									if(edited_fields[id]) {

									}else {
										edited_fields[id] = []
									}
									edited_fields[id].push(j)
								}
							}
						} 
					}
					if(this.props.members_proofs && this.props.members_proofs.length>0 && is_fields_edited.indexOf(id) != -1){
						member_proof = this.props.members_proofs.filter((x=>x.id == id))
						if(member_proof && member_proof.length>0 && member_proof[0].img_path_ids.length > 0){
							all_id_proofs.push(member_proof[0].id)
						}
					}
				}
				if(all_id_proofs && all_id_proofs.length > 0){
					newIdProofs = is_fields_edited.filter(function(x) { 
				  		return all_id_proofs.indexOf(x) < 0;
					})
				}else{
					newIdProofs = is_fields_edited
				}
				console.log(newIdProofs)
				if(newIdProofs && newIdProofs.length>0){
					newIdProofs.map((mem_id, i) => {
						is_disable = true
						member_ref = `member_${mem_id}_upload`
					})	
				}
			}
			console.log(member_ref)
		this.setState({validateErrors: validatingErrors,validateOtherErrors: validatingOtherErrors,validatingNames:invalidname,validateDobErrors:validatingDobErrors,errorMessages:errorMessagesObj,endorsementError:newIdProofs})
		if(Object.keys(edited_fields).length >0 || this.state.emailVerified){
	    	if(is_disable && document.getElementById(member_ref)){    		
	    		document.getElementById(member_ref).scrollIntoView();
	    	}else{
	    		this.SaveUserData(this.props,edited_fields)
	    		if(STORAGE.isAgent()){
	    			isAgent = true
	    		}
				this.props.history.push(`/insurance/insurance-user-details-review?is_endorsement=true&isAgent=${isAgent}`)
	    	}
	    }else{
	    	SnackBar.show({ pos: 'bottom-center', text: "Please update the required fields to proceed" });
	    }
    }

    SaveUserData(props,edited_fields){
    	let self = this
    	var insuranceUserData={}
    	var members={}
    	insuranceUserData.members= []
    	insuranceUserData.edited_fields = edited_fields
    	Object.entries(this.props.currentSelectedInsuredMembersId).map(function([key, value]) {
    		members={}
			members={...self.props.self_data_values[value[key]]}
			return 	insuranceUserData.members.push(members)
		})
		this.props.pushUserEndorsedData(insuranceUserData) // to save user entered details in dummy table
    }

	render(){
		let child
		let adult
		let userProfile
		let spouse_data
		let child_data =[]
		let self_data
		let findChild
		if(this.props.endorseData && this.props.endorseData.members.length>0 && this.props.currentSelectedInsuredMembersId.length >0){
			self_data = this.props.endorsed_member_data.members.filter(x=>x.relation =='self')
			if(this.props.selected_plan.adult_count == 2 && this.props.currentSelectedInsuredMembersId.length>1){
				spouse_data = this.props.endorsed_member_data.members.filter(x=>x.relation =='spouse')
				adult = <InsurOthers {...this.props} 
							// self_gender={userProfile.gender} 
							self_gender='m'
							param_id = {'1'} 
							member_id={spouse_data[0].id} 
							checkForValidation ={this.checkForValidation.bind(this)} 
							id={`member_${0}`} 
							validateErrors={this.state.validateErrors[spouse_data[0].id] || []} 
							validateOtherErrors={this.state.validateOtherErrors[spouse_data[0].id] || []} 
							createApiErrors={this.state.CreateApiErrors.members?this.state.CreateApiErrors.members[1]:[]}
							show_selected_profiles={this.state.show_selected_profiles} 
							validateDobErrors={[]} 
							errorMessages={this.state.errorMessages} 
							validatingNames={this.state.validatingNames||[]}
							is_endorsement = {true}
							user_data={this.props.endorsed_member_data.members.filter(x=>x.relation == 'spouse')}
							member_type={'adult'}
							endorsementError={this.state.endorsementError}
						/>
			}
			var n = (this.props.selected_plan.child_count);
			let findChild = this.props.currentSelectedInsuredMembersId.map((data, i) =>{
					child_data = this.props.endorsed_member_data.members.filter(x=>x.relation != 'self' && x.relation !='spouse')
				})
			if(n !== 0){	
				if(child_data && child_data.length>0){
				child = child_data.map((data, i) =>{
					return <InsurOthers {...this.props} 
								key={i} 
								member_id={child_data[i].id} 
								checkForValidation ={this.checkForValidation.bind(this)} 
								is_child_only={true} 
								id={`member_${i+1}`} 
								param_id = {i} 
								member_view_id= {i+1} 
								validateErrors={this.state.validateErrors[child_data[i].id] || []} 
								validateOtherErrors={[]} 
								createApiErrorsChild={this.state.CreateApiErrors.members?this.state.CreateApiErrors.members:[]} 
								show_selected_profiles={this.state.show_selected_profiles} 
								validateDobErrors={this.state.validateDobErrors[i] || []} 
								errorMessages={this.state.errorMessages} 
								validatingNames={this.state.validatingNames||[]}
								is_endorsement = {true}
								user_data={[child_data[i]]}
								member_type={'child'}
								endorsementError={this.state.endorsementError}
							/>
					})
				}
			}

			return(
			<div className="profile-body-wrap">
	            <ProfileHeader showPackageStrip={true}/> 
				<section className="container container-top-margin">
					<div className="row main-row parent-section-row">
						<div className="col-12 col-md-7 col-lg-7 ins-main-padding">
						<section className="profile-book-screen">
							<div className="widget">
								{/*<InsurCommon {...this.props} is_edit={this.state.is_edit}/>*/}
								<div className="ins-card-head" style={{'justifyContent': 'end','alignItems': 'end'}}>
									<div className="ins-name-head">
										<img width="120" src={this.props.insurnaceData['insurance'][0].logo} />
									</div>
									<div className="ins-pdf-dwnload" style={{'marginLeft':'12px'}}>
										<span>
											OPD Insurance by 
											<p>
												<strong>Apollo Munich</strong>
											</p>
										</span>
									</div>
								</div>
								<div className="insurance-member-container" style={{padding: '10px'}}>
									<p className="plcy-cancel">*Incorrect member details may lead to policy cancellation</p>
									<h4 className="mb-0">Insured Member Details</h4>
									<p className="fill-error-span fw-500 text-right d-block" style={{marginTop:'0px', fontSize: '11px'}}>*All fields are mandatory
									</p>
									<div className="insurance-member-details">
										<InsurSelf {...this.props} 
											checkForValidation ={this.checkForValidation.bind(this)} 
											id={`member_${this.props.currentSelectedInsuredMembersId[0]['0']}`} 
											member_id={self_data[0].id}
											validateErrors={this.state.validateErrors[self_data[0].id] || []} 
											validateOtherErrors={this.state.validateOtherErrors[self_data[0].id] || []}
											createApiErrors={this.state.CreateApiErrors.members?this.state.CreateApiErrors.members[0]:[]} 
											errorMessages={this.state.errorMessages} 
											is_endorsement = {true} 
											user_data={this.props.endorsed_member_data.members.filter(x=>x.relation == 'self')} 
											member_type={'adult'}
											endorsementError={this.state.endorsementError}
											checkIsEmailVerfied = {this.checkIsEmailVerfied.bind(this)}
										/>
									</div>
								</div>
							</div>
							{adult}
							{child}
						</section>		
							<button className="v-btn p-3 v-btn-primary btn-lg fixed horizontal bottom no-round btn-lg text-lg sticky-btn" onClick={this.proceedPlan.bind(this)}>Update
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


export default InsuranceEndoresmentInputView