import React from 'react'
import ProfileHeader from '../commons/DesktopProfileHeader'
import ChatPanel from '../commons/ChatPanel'
import SnackBar from 'node-snackbar'
import InsurPopup from './insurancePopup.js'
import InsurCommon from './insuranceCommonSection.js'
import STORAGE from '../../helpers/storage'
import Loader from '../commons/Loader'

class Insurance extends React.Component{
	constructor(props) {
        super(props)
        this.state = {
			//insuranceResults:this.props.insurnaceData,
			toggle: 'one',
            is_checked:this.props.selected_plan?this.props.selected_plan.id:'',
            selected_plan_price:this.props.selected_plan?this.props.selected_plan.amount:'',
            gst:'Inclusive of 18% GST',
            selected_plan_data:this.props.selected_plan?this.props.selected_plan:'',
            showPopup:false
        }
    }
    componentDidMount(){
    	// if (STORAGE.checkAuth()) {
    	// 	this.props.getUserProfile()
    	// }
		let selectedId = this.props.selected_plan?this.props.selected_plan.id:''
			if(selectedId){
				this.selectPlan(this.props.selected_plan)
			}
			else{
				if(this.textInput){
					this.textInput.click()
				}
			}
    }
    componentWillReceiveProps(props) {
    	// let self = this
    	// let selectedId = this.props.selected_plan?this.props.selected_plan.id:''
    	// let newSelectedId = props.selected_plan?props.selected_plan.id:''
			// if(selectedId){
			// 	this.setState({ selected_plan_data: props.selected_plan , selected_plan_price: `(₹ ${props.selected_plan.amount})`, is_checked: selectedId })
			// }
			// if(!newSelectedId){
			// 	if(this.textInput){
			// 		this.textInput.click()
			// 	}
			// }
    }
    selectPlan(plan_to_toggle) {
    	let plan = plan_to_toggle
    	plan_to_toggle.is_selected = true
    	// plan_to_toggle.plan_name = this.props.insurnaceData['insurance'][0].name
    	// plan_to_toggle.logo = this.props.insurnaceData['insurance'][0].logo 
    	// plan_to_toggle.insurer_document = this.props.insurnaceData['insurance'][0].insurer_document
    	// plan_to_toggle.insurer = this.props.insurnaceData['insurance'][0].id
    	// plan_to_toggle.stateData = this.props.insurnaceData['state'] 
    	this.props.selectInsurancePlan('plan', plan)
    	this.setState({ is_checked: plan_to_toggle.id, selected_plan_data: plan_to_toggle, selected_plan_price: `(₹ ${plan_to_toggle.amount})`,toggle:this.state.toggle == 'two'?'one':'one' })
    }
    proceedPlan(){
    	let self = this
    	let plan = Object.assign({}, this.state.selected_plan_data)
    	let profileLength
    	let memberStoreDataLength
    	let membersArray = []
    	let profilesArray = []
    	// plan.plan_name = this.props.insurnaceData['insurance'][0].name
    	// plan.logo = this.props.insurnaceData['insurance'][0].logo 
    	// plan.insurer_document = this.props.insurnaceData['insurance'][0].insurer_document   	
    	// plan.insurer = this.props.insurnaceData['insurance'][0].id
    	// plan.stateData = this.props.insurnaceData['state']
     	// this.props.selectInsurancePlan('plan', plan)
        this.props.resetSelectedPlans()
        if (STORAGE.checkAuth()) {
        	if(Object.keys(plan).length > 0){
        		this.props.generateInsuranceLead(plan.id,()=>{
        		})
        	}
        	profileLength = Object.keys(this.props.USER.profiles).length
        	memberStoreDataLength = Object.keys(this.props.self_data_values).length
        	if(profileLength >0 && memberStoreDataLength > 0){
        		Object.entries(this.props.self_data_values).map(function([key, self_data_values]) {
        			Object.entries(self.props.USER.profiles).map(function([k, profiles]) {
        				if(self_data_values.id == profiles.id){
        					membersArray.push(self_data_values)
        					profilesArray.push(profiles)
        				}
					})
				})
				if(membersArray.length == profilesArray.length){
					Object.entries(membersArray).map(function([key, values]) {
						if(membersArray[key].id == profilesArray[key].id){
							let memberNewdata = values
		    				let newName =  profilesArray[key].name.split(" ")
		    				if(newName.length == 3){
		    					memberNewdata.name = newName[0]
		    					memberNewdata.middle_name = newName[1]
		    					memberNewdata.last_name = newName[2]	
		    				}else if(newName.length == 2){
		    					memberNewdata.name = newName[0]
		    					memberNewdata.last_name = newName[1]	
		    				}else{
		    					memberNewdata.name = newName[0]
		    				}
							memberNewdata.email = profilesArray[key].email
							memberNewdata.dob = profilesArray[key].dob
							memberNewdata.gender = profilesArray[key].gender
							self.props.userData('memberNewdata', memberNewdata)
						}
					})
					this.props.history.push('/insurance/insurance-user-details')
				}else{
					this.props.history.push('/insurance/insurance-user-details')
				}
        	}else{	
        		this.props.history.push('/insurance/insurance-user-details')
        	}
   		}else{
   			this.setState({showPopup: true})
   		}
    }

    hideLoginPopup() {
        this.setState({
            showPopup: false
        });
    }

	render(){
		if(this.props.LOAD_INSURANCE){
			return(
				<div className="profile-body-wrap">
	                <ProfileHeader />
				<section className="container container-top-margin">
					<div className="row main-row parent-section-row">
						<div className="col-12 col-md-7 col-lg-7 ins-main-padding">
							<section className="profile-book-screen">
								<div className="widget">
									<InsurCommon {...this.props} isSelectPlan={true} is_checked={this.state.is_checked}/>
									{/* coverage listing */}
									<div className="coverage-list-container border-bg-transprant">
										<table className="table table-bordered insurance-tbl insurance-checkboxes">
											<thead>
												<tr>
													<th className="tbl-first-head"><p>Coverage (1 Year)</p></th>
													<th className="tbl-second-head"><p>Annual Premium</p></th>
												</tr>
											</thead>
											<tbody>
												{
                                                    this.props.insurnaceData['insurance'][0].plans.map((result, i) => {
                                                        return <tr id={result.id} key={i} onClick={this.selectPlan.bind(this, result)} ref={result.adult_count == 2 && result.child_count == 2?(input) => { this.textInput = input }:'ref_0'}>
                                                        	<td>
                                                        	<label className="container-radio" htmlform={i} >{result.name}
															 <input type="radio" name="gender" id={i} value={i} checked={this.state.is_checked?this.state.is_checked=== result.id:result.is_selected}/>
															 <span className="doc-checkmark"></span>
															 </label>
                                                        	</td>
															<td><span>₹ {result.amount}</span></td>
                                                        </tr>
                                                    })
                                                }
											</tbody>
										</table>
									</div>
									{/* coverage listing */}
								</div>
							</section>
							{this.state.showPopup ?
								<InsurPopup {...this.props} selected_plan={this.state.selected_plan_data} hideLoginPopup={this.hideLoginPopup.bind(this)}/> : ''
							}
							<button className="v-btn p-3 v-btn-primary btn-lg fixed horizontal bottom no-round btn-lg text-lg sticky-btn" onClick={this.proceedPlan.bind(this)}>Proceeed {this.state.selected_plan_price} <span className="foot-btn-sub-span">{this.state.gst}</span>
							</button>
						</div>

						<ChatPanel />
					</div>
				</section>
				</div>
			)
		}
		// else{
		// 	if(this.props.insurnaceData.certificate){
		// 		this.props.history.push('/insurance/certificate')
		// 	}
		// 	return(
		// 	<div className="profile-body-wrap">
	    //        <ProfileHeader />
		// 		<Loader />
		// 	</div>
		// 	)
		// }
	}
}

export default Insurance