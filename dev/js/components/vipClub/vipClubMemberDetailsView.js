import React from 'react'
import ProfileHeader from '../commons/DesktopProfileHeader'
import ChatPanel from '../commons/ChatPanel'
import VipProposer from './vipClubSelf.js'
import VipProposerFamily from './vipClubFamilyMembers.js'
import SnackBar from 'node-snackbar'
import PaymentForm from '../commons/paymentForm'
import GTM from '../../helpers/gtm'
import STORAGE from '../../helpers/storage'
const queryString = require('query-string');
import Disclaimer from '../commons/Home/staticDisclaimer.js'
import VipClubActivatedMemberDetails from './vipClubActivatedMemeberDetailsView.js'

class VipClubMemberDetailsView extends React.Component {
	constructor(props) {
        super(props)
        this.state = {
            saveMembers:false,
            validateErrors:{},
            show_selected_profiles:[],
           	paymentData: null,
           	show_popup:false,
           	proceed:false,
           	popupMemData:{},
           	coupon_code:null,
           	coupon_id:null,
           	is_payment_coupon_applied:false,
           	coupon_discount:null
        }
    }
    componentDidMount(){
    	if(window){
    		window.scrollTo(0,0)
    	}
    	if (this.props.selected_vip_plan && Object.keys(this.props.selected_vip_plan).length > 0 && !this.props.is_from_payment && this.props.vipCoupons.length >0) {
	    		this.props.applyCouponDiscount({ productId : this.props.selected_vip_plan.is_gold?8:11,couponCode:this.props.vipCoupons[0].code,couponId:this.props.vipCoupons[0].coupon_id,plan_id:this.props.selected_vip_plan.id,deal_price:this.props.selected_vip_plan.deal_price,
	    		cb: (resp) => {
	    			if(resp){
	    				this.setState({coupon_discount:resp.discount})
	    			}
	    		} 
	    	})
	    	this.setState({is_payment_coupon_applied:true,coupon_code:this.props.vipCoupons[0].code, coupon_id:this.props.vipCoupons[0].coupon_id })
	    }
    }

    addMembers(isFromDefaultUser){
    	let member_dummy_data={
    		name: '',
			last_name: '',
			dob: '',
			// id: '',
			relation: null,
			relation_key: null,
			title: '',
			profile:null,
			profile_id:null,
			phone_number:'',
			isUserSelectedProfile:true,
			day:null,
			mnth:null,
			year:null,
			email:'',
			first_name:'',
			age:''
    	}
    	let card
    	let membersId = []
    	if(isFromDefaultUser && !this.props.is_from_payment){
    		this.props.clearVipMemeberData()
			membersId.push({'0':0, type:'self',member_form_id:0,isUserSelectedProfile:true})
			member_dummy_data.id=0
			member_dummy_data.is_tobe_dummy_user = true
			this.props.saveCurrentSelectedVipMembers(membersId,(resp)=>{
    			this.props.userDetails('self_data', member_dummy_data)
    		})
    	}else{
    		if(this.props.vip_club_db_data && this.props.vip_club_db_data.data && Object.keys(this.props.vip_club_db_data.data).length &&  this.props.vip_club_db_data.data.plan && this.props.vip_club_db_data.data.plan.length >0){
    			// this.props.vip_club_db_data.data.plan[0].total_allowed_members	
    				if(this.props.currentSelectedVipMembersId && this.props.currentSelectedVipMembersId.length > 0 && this.props.currentSelectedVipMembersId.length  < this.props.vip_club_db_data.data.plan[0].total_allowed_members){
			    		membersId = [].concat(this.props.currentSelectedVipMembersId)
			    		let currentFormIdsCount = this.props.currentSelectedVipMembersId.length
			    		let total_allowed_members = this.props.vip_club_db_data.data.plan[0].total_allowed_members
			    		if(currentFormIdsCount <= total_allowed_members){
							membersId.push({[currentFormIdsCount]: currentFormIdsCount, type:'adult',member_form_id:currentFormIdsCount,isUserSelectedProfile:true})
							member_dummy_data.id=currentFormIdsCount
							member_dummy_data.is_tobe_dummy_user = false
			    		}
			    		this.props.saveCurrentSelectedVipMembers(membersId,(resp)=>{
			    			this.props.userDetails('self_data', member_dummy_data)
			    		})
			    	}
    		}
	    }
    }

    componentWillReceiveProps(props){
    	let card
    	let self = this
    	let isDummyUser
    	let membersId = []
    	if(!this.state.saveMembers && Object.keys(props.selected_vip_plan).length >0 && !props.currentSelectedVipMembersId.length && !props.is_from_payment){
    		let loginUser
    		let isDefaultUser
    		if(props.USER){
    			loginUser = props.USER.defaultProfile
    		}
    		if(this.props.savedMemberData && this.props.savedMemberData.length >0){
    			Object.entries(props.savedMemberData).map(function([key, value]) {
    				membersId.push({[key]: value.id, type:'self', member_form_id:0,isUserSelectedProfile:true})
    			})
    			props.saveCurrentSelectedVipMembers(membersId)
				this.setState({ saveMembers: true})
    		}else{
	    		if(props.USER.profiles && Object.keys(props.USER.profiles).length && props.USER.profiles[props.USER.defaultProfile]){
	    			isDefaultUser = props.USER.profiles[props.USER.defaultProfile].is_default_user
	    			isDummyUser = props.USER.profiles[props.USER.defaultProfile].isDummyUser
	    		}
	    		if(!isDummyUser){
		    		membersId.push({'0':loginUser, type: 'self',member_form_id:0,isUserSelectedProfile:false})
				}else{
					membersId.push({'0':0, type:'self',member_form_id:0,isUserSelectedProfile:false})
				}
				props.saveCurrentSelectedVipMembers(membersId)
				this.setState({ saveMembers: true })
			}
		} else if (!this.state.saveMembers && Object.keys(props.selected_vip_plan).length > 0 && props.is_from_payment && Object.keys(props.vip_club_db_data).length > 0) {
			if (props.vip_club_db_data.data.user && Object.keys(props.vip_club_db_data.data.user).length > 0 && props.vip_club_db_data.data.user.plus_members && props.vip_club_db_data.data.user.plus_members.length > 0) {
				if (!Object.keys(props.vipClubMemberDetails).length) {
					membersId.push({ [0]: 0, type: 'adult', member_form_id: 0, isUserSelectedProfile: false })
					this.setState({ saveMembers: true})
				} else {
					props.currentSelectedVipMembersId.map((val, key) => {
					if (Object.keys(props.vipClubMemberDetails).length > 0) {
							membersId.push({ [key]: props.vipClubMemberDetails[val[key]].id, type: 'adult', member_form_id: props.vipClubMemberDetails[val[key]].id, isUserSelectedProfile: false })
						}
					})
				}
				
				props.saveCurrentSelectedVipMembers(membersId)
				this.setState({ saveMembers: true })
			}
		}
		let profileLength = Object.keys(props.USER.profiles).length;
		let currentSelectedProfiles = []
		let show_selected_profile = []
		this.props.currentSelectedVipMembersId.map((val, key) => {
			currentSelectedProfiles.push(val[key])
		})
		let already_users_ids = []
        if(this.props.vip_club_db_data && Object.keys(this.props.vip_club_db_data).length > 0 && this.props.vip_club_db_data.data.user && Object.keys(this.props.vip_club_db_data.data).length > 0 && Object.keys(this.props.vip_club_db_data.data.user).length > 0 && this.props.vip_club_db_data.data.user.plus_members && this.props.vip_club_db_data.data.user.plus_members.length > 0){
                this.props.vip_club_db_data.data.user.plus_members.map((val,key) => {
                    already_users_ids.push(val.profile)
                })
        }
		if (profileLength > 0) {
			if (!props.USER.profiles[props.USER.defaultProfile].isDummyUser) {
				{
					Object.entries(props.USER.profiles).map(function ([key, value]) {

						if (currentSelectedProfiles.indexOf(parseInt(key)) == -1 && key !== props.USER.defaultProfile && already_users_ids.indexOf(parseInt(key)) == -1) {
							show_selected_profile.push(key)
						}
					})
				}
				self.setState({ show_selected_profiles: show_selected_profile })
			}
		}
	}

	processPayment(data) {
		if (data && data.status) {
			this.setState({ paymentData: data.data }, () => {
				setTimeout(() => {
					if (document.getElementById('paymentForm') && Object.keys(this.state.paymentData).length > 0) {
						let form = document.getElementById('paymentForm')
						form.submit()
					}
				}, 500)
			})
		}
	}

	proceedPlan(isSms) { //new
		let success_id
		let data = {}
		let pushData = {}
		let isDummyUser
		let self_profile = {}
		let is_disable = false
		let member_ref = ''
		let validatingErrors = {}
		let param
		let parsed = queryString.parse(this.props.location.search)
		if (this.props.selected_vip_plan && Object.keys(this.props.selected_vip_plan).length > 0 && this.props.vipClubMemberDetails && Object.keys(this.props.vipClubMemberDetails).length > 0) {
			data.plan_id = this.props.selected_vip_plan.id
			data.members = []
			data.utm_spo_tags = parsed
			pushData.utm_spo_tags = parsed
			pushData.plan = this.props.selected_vip_plan
			pushData.dummy_data_type = 'PLAN_PURCHASE'
			pushData.members = []
			pushData.coupon_data = this.props.vipCoupons
			if (isSms) {
				pushData.is_agent = true
			} else {
				pushData.is_agent = false
			}
			let fields = []
			this.props.currentSelectedVipMembersId.map((val, key) => {
				if (Object.keys(this.props.vipClubMemberDetails).length > 0) {
					fields = []
					param = this.props.vipClubMemberDetails[val[key]]
					if (param && Object.keys(param).length > 0) {
						//common validation starts
						if (param.title == "") {
							is_disable = true
							fields.push('title')
						}

						if (param.name == "") {
							is_disable = true
							fields.push('name')
						}

						if (param.dob == null || param.dob == "") {
							is_disable = true
							fields.push('dob')
						}

						if(param.dob != null && !param.isDobValidated){
							is_disable = true
							fields.push('dob')
						}

						// if (param.year == null || param.year == "") {
						// 	is_disable = true
						// 	fields.push('dob')
						// }

						// if (param.mnth == null || param.mnth == "") {
						// 	is_disable = true
						// 	fields.push('dob')
						// }

						// if (param.day == null || param.day == "") {
						// 	is_disable = true
						// 	fields.push('dob')
						// }
						// if(param.is_tobe_dummy_user){
						// 	if (param.title == "") {
						// 		is_disable = true
						// 		fields.push('title')
						// 	}
						// }
						//common validation ends 

						if(this.props.is_from_payment){
							if(param.relation == "" || param.relation == null){
								is_disable = true
								fields.push('relation')
							}
						}

						if (!this.props.is_from_payment) {
							if(!param.phone_number && !param.isDummyUser){
								is_disable = true
								fields.push('phone_number')
							}
							if(!param.isDummyUser && param.phone_number && param.phone_number.length <10){
								is_disable = true
								fields.push('phone_number')
							}
							if(param.email == ""){  
								is_disable = true
								fields.push('email')
							}
							if (param.email != '' && param.relation == 'self') {
								let validEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
								validEmail = validEmail.test(param.email)
								if (!validEmail) {
									is_disable = true
									fields.push('email')
								}
							}
						}
					}
					validatingErrors[param.id] = fields
				}
			})
			console.log(validatingErrors)
			Object.keys(validatingErrors).forEach(function (key) {
				if (validatingErrors[key].length > 0) {
					is_disable = true
					member_ref = `member_${key}`
				}
			});
			this.setState({ validateErrors: validatingErrors })
			if (is_disable && document.getElementById(member_ref)) {
				document.getElementById(member_ref).scrollIntoView();
			} else {
				let city
				let city_code
				let address
				let pincode
				var members = {}
				let primary_user = {}
				if (this.props.is_from_payment) {
					let is_member_updated = []
					let image_ids = []
					if(this.props.vip_club_db_data.data.user && Object.keys(this.props.vip_club_db_data.data.user).length > 0 && this.props.vip_club_db_data.data.user.plus_members && this.props.vip_club_db_data.data.user.plus_members.length > 0){
			            primary_user = this.props.vip_club_db_data.data.user.plus_members.filter((x=>x.is_primary_user))[0]
			        }
					if(this.props.members_proofs && this.props.members_proofs.length>0 && Object.keys(primary_user).length >0){ //for self member_proofs
						param = primary_user
						members = {}
						members.profile = param.profile
						members.id = param.profile
						members.is_primary_user = param.is_primary_user
						members.title = primary_user.title
						members.first_name = primary_user.first_name
						members.last_name = primary_user.last_name
						members.email = primary_user.email
						members.dob = primary_user.dob
						is_member_updated = this.props.members_proofs.filter((x=>x.id == param.profile))
						if(is_member_updated && is_member_updated.length > 0){
							if(is_member_updated[0].img_path_ids.length > 0){
								image_ids = []
								is_member_updated[0].img_path_ids.map((imgId,i)=>{
									image_ids.push({'proof_file':imgId.id})
								})
							}
							members.document_ids = image_ids
						}
						data.members.push(members)
					}
					this.props.currentSelectedVipMembersId.map((val, key) => {
						if (Object.keys(this.props.vipClubMemberDetails).length > 0) {
							param = this.props.vipClubMemberDetails[val[key]]
							members = {}
							members.title = param.title
							members.relation = param.relation_key
							members.first_name = param.name
							members.last_name = param.last_name
							members.email = null
							members.dob = param.dob
							members.gender = param.gender
							members.profile = param.profile_id
							members.is_primary_user = false
							// data.members.push(members)
							if(this.props.members_proofs && this.props.members_proofs.length>0){
								is_member_updated = this.props.members_proofs.filter((x=>x.id == param.id))
								if(is_member_updated && is_member_updated.length > 0){
									if(is_member_updated[0].img_path_ids.length > 0){
										image_ids = []
										is_member_updated[0].img_path_ids.map((imgId,i)=>{
											image_ids.push({'proof_file':imgId.id})
										})
									}
									members.document_ids = image_ids
								}
								// members.id=param.id
							}
							// pushData.members.push(members)
				    		return data.members.push(members)
						}
					})
					console.log(data)
					let popupMemData
						popupMemData = data.members
						this.setState({popupMemData:popupMemData})
						if(!this.state.proceed && this.props.currentSelectedVipMembersId && this.props.currentSelectedVipMembersId.length <this.props.selected_vip_plan.total_allowed_members){
						  		this.setState({show_popup:true})
						  		return
						   }
						   console.log(data)
							this.props.addVipMembersData(data,(resp)=>{
								if(resp.success){
									this.props.history.push('vip-club-activated-details')
								}
							})
				} else {
					this.props.currentSelectedVipMembersId.map((val, key) => {
						if (Object.keys(this.props.vipClubMemberDetails).length > 0) {
							param = this.props.vipClubMemberDetails[val[key]]
							members = {}
							members.title = param.title
							members.relation = param.relation_key
							members.first_name = param.name
							members.last_name = param.last_name
							members.email = param.email
							members.dob = param.dob
							members.gender = param.gender
							members.profile = param.profile_id
							members.id = param.id
							members.is_primary_user = true
							data.members.push(members)
							data['coupon_code'] = this.state.coupon_code && this.state.is_payment_coupon_applied ? [this.state.coupon_code] : []
							data['coupon_type'] = this.props.selected_vip_plan.is_gold?'gold':'vip'
							pushData['coupon_code'] = this.state.coupon_code && this.state.is_payment_coupon_applied ? [this.state.coupon_code] : []
							pushData['coupon_type'] = this.props.selected_vip_plan.is_gold?'gold':'vip'
							pushData.members.push(param)
							console.log(data)
							this.pushUserData(pushData)

							if(STORAGE && STORAGE.getAnyCookie('sbi_utm') && this.props.common_utm_tags && this.props.common_utm_tags.length && this.props.common_utm_tags.filter(x=>x.type=='sbi_utm').length) {

								let tags = this.props.common_utm_tags.filter(x=>x.type=='sbi_utm')[0]
								if(tags.utm_tags){
									
									data['utm_sbi_tags'] = tags.utm_tags
								}
							}else if(document && document.location && document.location.host &&  document.location.host.includes('sbi')){
								data['utm_sbi_tags'] = {
									utm_tags: {
										utm_source: 'sbi_utm',
										utm_term: '',
										utm_medium: '',
										utm_campaign: ''
									},
									time: new Date().getTime(),
								}
							}


							if (isSms) {
								this.sendSMS()
							} else {
								this.props.vipClubPay(data, (resp) => {

									if (resp && resp.error) {
										SnackBar.show({ pos: 'bottom-center', text: resp.error })
										return
									}
									if (resp && resp.payment_required) {
										this.processPayment(resp)
									} else {
										success_id = '/vip-club-activated-details?payment_success=true&id=' + resp.data.id
										this.props.history.push(success_id)
									}
								})
							}
						}
					})
				}

				// old logic
				// if(this.props.is_from_payment){
				//   	let is_member_updated = []
				// 			let image_ids = []
				// 	{Object.entries(this.props.currentSelectedVipMembersId).map(function([key, value]) {
				//   		let param =this.props.vipClubMemberDetails[value[key]]
				//    		if(param.relation == 'SELF'){
				//   				self_profile = this.props.vipClubMemberDetails[value[key]]
				//   			}
				// 		members={}
				// 			members.relation=param.relation_key
				// 			members.title=param.title							
				// 	    	members.member = param.id
				// 	    	members.first_name=param.name
				// 	    	members.last_name=param.last_name
				// 	    	members.dob=param.dob
				// 	    	members.gender=param.gender
				// 	    	members.profile=param.profile_id
				// 	    	// members.city = self_profile.city
				//     		// members.city_code = self_profile.city_code
				//     		// members.address = self_profile.address
				//     		// members.pincode = self_profile.pincode
				//     		members.is_already_user = param.is_already_user
				//     		if(param.is_already_user){
				//     			members.id = param.id
				//     		}
				//     		members.email = self_profile.email
				// 	    	if(this.props.members_proofs && this.props.members_proofs.length>0){
				// 				is_member_updated = this.props.members_proofs.filter((x=>x.id == param.id))
				// 				if(is_member_updated && is_member_updated.length > 0){
				// 					if(is_member_updated[0].img_path_ids.length > 0){
				// 						image_ids = []
				// 						is_member_updated[0].img_path_ids.map((imgId,i)=>{
				// 							image_ids.push({'proof_file':imgId.id})
				// 						})
				// 					}
				// 					members.document_ids = image_ids
				// 				}
				// 				// members.id=param.id
				// 			}
				// 			pushData.members.push(members)
				//     		return data.members.push(members)
				// 	},this)}
				// 	let popupMemData
				// 	popupMemData = data.members
				// 	this.setState({popupMemData:popupMemData})
				// 	if(!this.state.proceed && this.props.currentSelectedVipMembersId && this.props.currentSelectedVipMembersId.length <4){
				// 	  		this.setState({show_popup:true})
				// 	  		return
				// 	   }
				// 	   console.log(data)
				// 				this.props.addVipMembersData(data,(resp)=>{
				// 					if(resp.success){
				// 						this.props.history.push('vip-club-activated-details')
				// 					}
				// 				})
				// }else{
				// 	var members = {}
				// 		members.title = self_profile.title
				// 		members.first_name = self_profile.name 
				// 		members.last_name = self_profile.last_name 
				// 		members.email = self_profile.email 
				// 		members.dob = self_profile.dob 
				// 		// members.city = self_profile.state 
				// 		// members.city_code = self_profile.state_code
				// 		// members.address = self_profile.address
				// 		// members.pincode = self_profile.pincode
				// 		members.profile = self_profile.profile_id
				// 		members.gender = self_profile.gender
				// 		members.relation = self_profile.relation
				// 		members.id = self_profile.id
				// 		data.members.push(members)
				// 		pushData.members.push(self_profile)
				// 		console.log(data)
				// 	this.pushUserData(pushData)
				// 	if(isSms){
				// 		this.sendSMS()
				// 	}else{
				// 	this.props.vipClubPay(data,(resp)=>{

				// 		if(resp && resp.error){
				// 			SnackBar.show({ pos: 'bottom-center', text: resp.error})
				// 			return
				// 		}
				// 		if(resp && resp.payment_required){
				// 	            this.processPayment(resp)
				// 	}else{
				// 		success_id = '/vip-club-activated-details?payment_success=true&id='+resp.data.id
				// 		this.props.history.push(success_id)
				// 	}
				// 	})
				// 	}
				// }
				// this.props.history.push('/vip-club-activated-details')
			}

		}
	}

	pushUserData(data) {
		this.props.pushMembersData(data)
	}

	sendSMS() {
		let parsed = queryString.parse(this.props.location.search)
		let extraParams = {}
		this.props.sendAgentBookingURL(null, 'sms', 'vip_purchase', parsed, extraParams, (err, res) => {
			if (err) {
				SnackBar.show({ pos: 'bottom-center', text: "SMS SEND ERROR" })
			} else {
				SnackBar.show({ pos: 'bottom-center', text: "SMS SENT SUCCESSFULY" })
			}
		})
	}

	proceedMembers(is_wait) {
		this.setState({ show_popup: false, proceed: is_wait ? true : false }, () => {
			if (document.getElementById('submit_buy')) {
				document.getElementById('submit_buy').click()
			}
		})
	}

	proceedMembersNo(is_wait) {
		this.setState({ show_popup: false, proceed: false, popupMemData: {} })
	}

	applyCoupons(){
		let selected_plan_id = null
		if (this.props.selected_vip_plan && Object.keys(this.props.selected_vip_plan).length > 0 && !this.props.is_from_payment) {
            // this.props.getCoupons({productId:this.state.is_gold?8:11,gold_plan_id:this.props.selected_vip_plan.id})
            selected_plan_id = this.props.selected_vip_plan.id
		this.props.history.push(`/coupon/vip/${selected_plan_id}/${this.props.selected_vip_plan.is_gold?8:11}?deal_price=${this.props.selected_vip_plan.deal_price}&cart_item=`)
		}
	}

	removeCoupon(){
		const parsed = queryString.parse(this.props.location.search)
        let gold_push_data={}
        let param
        gold_push_data.plan = this.props.selected_vip_plan
        gold_push_data.dummy_data_type = 'PLAN_PURCHASE'
        gold_push_data.members = []
        gold_push_data.coupon_data = []
        gold_push_data.utm_spo_tags = parsed
        gold_push_data.coupon_type = this.props.selected_vip_plan.is_gold?'gold':'vip'
        this.props.currentSelectedVipMembersId.map((val, key) => {
        if (Object.keys(this.props.vipClubMemberDetails).length > 0) {
            param = this.props.vipClubMemberDetails[val[key]]
            gold_push_data.members.push(param)
            }
        })
        if(STORAGE.isAgent()){
            gold_push_data.is_agent = true
        }else{
            gold_push_data.is_agent = false
        }
        this.props.pushMembersData(gold_push_data)
		this.props.removeVipCoupons()
	}
	render() {
		let child
		let adult
		let userProfile
		let proposer_id = 0
		// let selectedProfileId = parseInt(this.props.USER.defaultProfile) // to be deleted
		if (this.props.USER && this.props.USER.defaultProfile) {
			if (this.props.USER.defaultProfile == 999999) {
				proposer_id = 0
			} else {
				proposer_id = this.props.USER.defaultProfile
			}
		}
		let show_extra_fields = false
		
		if (this.props.currentSelectedVipMembersId && this.props.currentSelectedVipMembersId.length > 0) {
			this.props.currentSelectedVipMembersId.filter(x => x.isUserSelectedProfile).map((data, i) => {
				proposer_id = data[i]
				show_extra_fields = true
			})
		}
		// let selectedProfileId = parseInt(this.props.USER.defaultProfile) // to be deleted
		let selectedMembersId = 0
		
		if (this.props.is_from_payment && Object.keys(this.props.selected_vip_plan).length > 0) {

			userProfile = Object.assign({}, this.props.USER.profiles[this.props.USER.defaultProfile])

			var n = (this.props.selected_vip_plan.total_allowed_members - 1)
			if (n !== 0) {
				child = this.props.currentSelectedVipMembersId.filter(x => x.type === 'adult').map((data, i) => {
					
					// selectedMembersId++
						return <VipProposerFamily {...this.props} 
									key={i} 
									member_id={data[i]} 
									id={`member_${i}`} 
									param_id = {i} 
									member_view_id= {i} 
									validateErrors={this.state.validateErrors[data[i]] || []} 
									show_selected_profiles={this.state.show_selected_profiles} 
									member_type = 'child'
									member_form_id = {i}
									isUserSelectedProfile = {false}
									show_extra_fields = {show_extra_fields}
								/>
				})
			}
		}
		return (
			<div className="profile-body-wrap">
				{
					this.props.isSalesAgent && this.props.isAgent ? ''
						: <ProfileHeader showPackageStrip={true} />
				}
				<section className="container container-top-margin cardMainPaddingRmv">
					<div className="row no-gutters dsktp-row-gutter">
						<div className="col-12 col-md-7 col-lg-7 ins-main-padding">
							{
								this.state.show_popup ?
									<div className="search-el-popup-overlay " >
										<div className="search-el-popup">
											<div className="widget">
												<div className="widget-content padiing-srch-el pb-0">
													<p style={{ fontSize: '14px' }} className="srch-el-conent"> {this.props.currentSelectedVipMembersId.length} Members Added</p>
													<div className="vip-pop-table">
														{
															this.state.popupMemData && Object.keys(this.state.popupMemData).length > 0 ?
																Object.entries(this.state.popupMemData).map(function ([key, val]) {
																	return val.relation == 'SELF' || val.is_already_user ?
																		''
																		: <div className="vip-sn-tbl m-0" key={key}>
																			<p className="vip-pop-tbl-hd">{val.first_name} {val.last_name}</p>
																			<table className="vip-acrd-content text-left">
																				<tbody>
																					<tr>
																						<th>Relationship</th>
																						<th>Gender</th>
																						<th>DOB</th>
																					</tr>
																					<tr>
																						<td>{val.relation == "SPOUSE_FATHER" ? 'Father-in-law' : val.relation == 'SPOUSE_MOTHER' ? 'Mother-in-law' : val.relation}</td>
																						{
																							val.title?
																								<td style={{ 'textTransform': 'capitalize' }} >{val.title == 'mr.' ? 'm' : 'f'}</td>
																							:val.gender?
																								<td style={{ 'textTransform': 'capitalize' }} >{val.gender}</td>
																							:''
																						}
																						<td>{val.dob}</td>
																					</tr>
																				</tbody>
																			</table>
																		</div>
																})
																: ''}
													</div>

													<div className="search-el-btn-container">
														<button style={{ fontSize: '14px' }} onClick={this.proceedMembersNo.bind(this, 0)}>No Wait</button>
														{/* <span className="src-el-btn-border"></span> */}
														<button style={{ fontSize: '14px' }} onClick={this.proceedMembers.bind(this, 1)}>Submit</button>
													</div>
												</div>
											</div>

										</div>
									</div>
									: ''
							}
							<section className="profile-book-screen">
								<div>
									<div className="insurance-member-container" style={{ padding: 0 }}>
										<h4 className="mb-0" style={{ padding: '2px 0px 6px' }}>Enter Primary Member Details</h4>
										{this.props.is_from_payment ? <div className="vip-wrng-mssg">
											<span>
												You can fill the details of all members only once. Member details once
												submitted cannot be added or edited.</span>
										</div> : ''}
										<div className="widget" style={{ padding: '10px' }}>
											<div className={` insurance-member-details ${this.props.is_from_payment ? '' : 'mrt-20'}`}>
												{!this.props.is_from_payment ? <VipProposer {...this.props}
													id={`member_${proposer_id}`}
													member_id={proposer_id}
													validateErrors={this.state.validateErrors[proposer_id] || []}
													member_form_id={0}
													show_selected_profiles={this.state.show_selected_profiles}
													isUserSelectedProfile={false}
													addMembers={this.addMembers.bind(this)}
													show_extra_fields = {show_extra_fields}
												/>
													: <VipClubActivatedMemberDetails {...this.props} />
												}
											</div>
										</div>
										{!this.props.is_from_payment ?
											this.props.vipCoupons && this.props.vipCoupons.length > 0?
											<div className="widget cpn-blur mrb-15 cursor-pointer">
												<div className="widget-content d-flex jc-spaceb mt-10" >
                                                    <h4 className="title coupon-text d-flex align-item-center m-0" style={{ color: 'green' }}>
                                                    	<img src={ASSETS_BASE_URL + "/img/customer-icons/coupon-applied.svg"} className="visit-time-icon mr-10" />
                                                        <span>Coupon Applied</span>
                                                    </h4>
                                                    <h4 className="title m-0 d-flex align-item-center" style={{ color: 'green', marginRight: 13, fontSize: '12px', marginTop: '6px' }}>
                                                        <span className="mr-10">{this.props.vipCoupons[0].code}</span>
                                                        <img style={{width:17}} onClick={(e) => {
                                                            this.removeCoupon()
                                                            this.setState({  is_payment_coupon_applied: false, coupon_discount:null })
                                                        }} src={ASSETS_BASE_URL + "/img/customer-icons/cross.svg"} />
                                                    </h4>
	                                            </div>
	                                        </div>
                                            :
											<div className="widget cpn-blur mrb-15 cursor-pointer" onClick={this.applyCoupons.bind(this)}>
												<div className="widget-content d-flex jc-spaceb mt-10">
													<h4 className="title coupon-text d-flex align-item-center m-0">
														<img style={{ width: '24px' }} src={ASSETS_BASE_URL + "/img/ofr-cpn.svg"} className="visit-time-icon mr-10" />
														<span>HAVE A COUPON?</span>   
													</h4>
			                                        <div className="visit-time-icon coupon-icon-arrow">
			                                            <img src={ASSETS_BASE_URL + "/img/customer-icons/right-arrow.svg"} />
			                                        </div>
			                                    </div>
	                                        </div>
                                    	:''}
										{child}
									</div>
								</div>
								{this.props.is_from_payment && this.props.currentSelectedVipMembersId && this.props.currentSelectedVipMembersId.length > 0 && this.props.vip_club_db_data && this.props.vip_club_db_data.data && Object.keys(this.props.vip_club_db_data.data).length && this.props.vip_club_db_data.data.plan && this.props.vip_club_db_data.data.plan.length > 0 &&
									this.props.currentSelectedVipMembersId.length < this.props.vip_club_db_data.data.plan[0].total_allowed_members ?
									<button className="add-mem-blk" onClick={this.addMembers.bind(this, false)}> <img className="vip-add-img" src={ASSETS_BASE_URL + '/img/vip-mem.svg'} />{`Add ${this.props.vip_club_db_data.data.user.plus_members.length + this.props.currentSelectedVipMembersId.length == 2 ? '3rd' : this.props.vip_club_db_data.data.user.plus_members.length + this.props.currentSelectedVipMembersId.length == 3 ? '4th' : this.props.vip_club_db_data.data.user.plus_members.length + this.props.currentSelectedVipMembersId.length == 4 ? 'Another' : ''} Member `}</button>
									: ''
								}
							</section>
							{
								!STORAGE.isAgent() && this.props.selected_vip_plan && Object.keys(this.props.selected_vip_plan).length > 0 && !this.props.is_from_payment && !this.props.isAgent ?
									<button className="v-btn p-3 v-btn-primary btn-lg fixed horizontal bottom no-round btn-lg text-lg sticky-btn" onClick={this.proceedPlan.bind(this, false)}>Continue to Pay ₹{this.props.selected_vip_plan.deal_price - this.state.coupon_discount}
										<span className="foot-btn-sub-span"></span>
									</button>
									: !STORAGE.isAgent() && this.props.selected_vip_plan && Object.keys(this.props.selected_vip_plan).length > 0 && !this.props.is_from_payment && this.props.isAgent === 'false' ?
										<button className="v-btn p-3 v-btn-primary btn-lg fixed horizontal bottom no-round btn-lg text-lg sticky-btn" onClick={this.proceedPlan.bind(this, false)}>Continue to Pay ₹{this.props.selected_vip_plan.deal_price- this.state.coupon_discount}
											<span className="foot-btn-sub-span"></span>
										</button>
										: ''
							}

							{
								!STORAGE.isAgent() && this.props.selected_vip_plan && Object.keys(this.props.selected_vip_plan).length > 0 && <div className="v-btn-primary d-flex align-flex-sp-bt fixed horizontal bottom no-round text-lg sticky-btn">
									{
										this.props.isAgent === 'true' && this.props.isSalesAgent ?
											<React.Fragment>
												<div className="fixed sticky-btn p-0 v-btn  btn-lg horizontal bottom no-round text-lg buttons-addcart-container ">
													<button className="add-shpng-cart-btn" data-disabled="true" onClick={this.proceedPlan.bind(this, true)}>Send SMS
												<span className="foot-btn-sub-span"></span>
													</button>
													<button className="v-btn-primary book-btn-mrgn-adjust" onClick={this.proceedPlan.bind(this, false)}>Continue to Pay ₹{this.props.selected_vip_plan.deal_price- this.state.coupon_discount}
														<span className="foot-btn-sub-span"></span>
													</button>
												</div>
											</React.Fragment>
											: !this.props.isAgent && this.props.isAgent === 'false' ?
												<button className="v-btn p-3 v-btn-primary" onClick={this.proceedPlan.bind(this, false)}>Continue to Pay ₹{this.props.selected_vip_plan.deal_price- this.state.coupon_discount}
													<span className="foot-btn-sub-span"></span>
												</button>
												: ''
									}
								</div>
							}
							{
								!STORAGE.isAgent() && this.props.selected_vip_plan && Object.keys(this.props.selected_vip_plan).length > 0 && this.props.is_from_payment && !this.props.isSalesAgent && !this.props.isAgent ?
									<button id="submit_buy" className="v-btn p-3 v-btn-primary btn-lg fixed horizontal bottom no-round btn-lg text-lg sticky-btn" onClick={this.proceedPlan.bind(this, false)}>Submit
										<span className="foot-btn-sub-span"></span>
									</button>
									: ''
							}

							{
								STORAGE.isAgent() && this.props.selected_vip_plan && Object.keys(this.props.selected_vip_plan).length > 0 && this.props.is_from_payment && !this.props.isSalesAgent && !this.props.isAgent ?
									<button className="v-btn p-3 v-btn-primary btn-lg fixed horizontal bottom no-round btn-lg text-lg sticky-btn" onClick={this.proceedPlan.bind(this, true)}>Send SMS
										<span className="foot-btn-sub-span"></span>
									</button>
									: STORAGE.isAgent() && this.props.selected_vip_plan && Object.keys(this.props.selected_vip_plan).length > 0 && !this.props.is_from_payment && !this.props.isSalesAgent && !this.props.isAgent ?
										<button className="v-btn p-3 v-btn-primary btn-lg fixed horizontal bottom no-round btn-lg text-lg sticky-btn" onClick={this.proceedPlan.bind(this, true)}>Send SMS
										<span className="foot-btn-sub-span"></span>
										</button>
										: ''

							}
						</div>
						<ChatPanel />
					</div>
				</section>
				<Disclaimer isVip={true} />
				{
					this.state.paymentData ? <PaymentForm paymentData={this.state.paymentData} refs='opd' /> : ""
				}
			</div>
		)
	}

}


export default VipClubMemberDetailsView