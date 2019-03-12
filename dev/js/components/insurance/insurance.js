import React from 'react'
import ProfileHeader from '../commons/DesktopProfileHeader'
import ChatPanel from '../commons/ChatPanel'
import SnackBar from 'node-snackbar'
import InsurPopup from './insurance_popup.js'
import STORAGE from '../../helpers/storage'

class Insurance extends React.Component{
	constructor(props) {
        super(props)
        this.state = {
			//insuranceResults:this.props.insurnaceData,
			toggle: 'one',
            is_checked:'',
            selected_plan_price:'',
            gst:'',
            selected_plan_data:'',
            showPopup:false
        }
    }
    componentDidMount(){
    	if (STORAGE.checkAuth()) {
    		this.props.getUserProfile()
    	}
		let selectedId = this.props.selected_plan?this.props.selected_plan.id:''
			if(selectedId){
				this.setState({ selected_plan_data: this.props.selected_plan , selected_plan_price: `(₹ ${this.props.selected_plan.amount})`, gst: 'Inclusive of 18% GST', is_checked: selectedId })
			}else{
				if(this.textInput){
					this.textInput.click()
				}
			}
    }
    componentWillReceiveProps(props) {
    	let self = this
    	let selectedId = this.props.selected_plan?this.props.selected_plan.id:''
    	let newSelectedId = props.selected_plan?props.selected_plan.id:''
			if(selectedId && selectedId != newSelectedId){
				this.setState({ selected_plan_data: props.selected_plan , selected_plan_price: `(₹ ${props.selected_plan.amount})`, gst: 'Inclusive of 18% GST', is_checked: selectedId })
			}
			if(!newSelectedId){
				if(this.textInput){
					this.textInput.click()
				}
			}
    }
    selectPlan(plan_to_toggle) {
    	this.setState({ is_checked: plan_to_toggle.id, selected_plan_data: plan_to_toggle, selected_plan_price: `(₹ ${plan_to_toggle.amount})`, gst: 'Inclusive of 18% GST',toggle:this.state.plan_to_toggle == 'two'?'one':'one' })
    }
    proceedPlan(){
    	let self = this
    	let plan = Object.assign({}, this.state.selected_plan_data)
    	let profileLength
    	let memberStoreDataLength
    	let membersArray = []
    	let profilesArray = []
    	plan.plan_name = this.props.insurnaceData['insurance'][0].name
    	plan.logo = this.props.insurnaceData['insurance'][0].logo 
    	plan.insurer_document = this.props.insurnaceData['insurance'][0].insurer_document   	
    	plan.insurer = this.props.insurnaceData['insurance'][0].id
    	plan.stateData = this.props.insurnaceData['state']
        this.props.selectInsurancePlan('plan', plan)
        this.props.resetSelectedPlans()
        if (STORAGE.checkAuth()) {
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
					this.props.history.push('/insurancedetails')
				}else{
					this.props.history.push('/insurancedetails')
				}
        	}else{	
        		this.props.history.push('/insurancedetails')
        	}
   		}else{
   			this.setState({showPopup: true})
   		}
    }
	render(){
		if(this.props.LOAD_INSURANCE){
			return(
				<div className="profile-body-wrap">
	                {/*<ProfileHeader /> */}
				<section className="container">
							<div className="row main-row parent-section-row">
								<div className="col-12 col-md-7 col-lg-7 ins-main-padding">
									<section className="profile-book-screen">
										<div className="widget">
											<div className="ins-card-head">
												<div className="ins-name-head">
													<img width="140" src={this.props.insurnaceData['insurance'][0].logo} />
													{/*<p>
														OPD Insurance by <span>{this.props.insurnaceData['insurance'][0].name}</span>
													</p>*/}
													<p>
														Group Out-patient Insurance
													</p>
												</div>
												<div className="ins-pdf-dwnload">
													<a href={this.props.insurnaceData['insurance'][0].insurer_document} target="_blank">
													<img src={ASSETS_BASE_URL + "/img/pdf-dwn.png"} />
													</a>
													<span>												
														Policy Details
													</span>
												</div>
											</div>
											{/* tab section */}
											<div className="ins-swich-tabs-container">
												<div className="ins-tabs">
													<ul>
														<li onClick={()=> this.setState({toggle:'one'})}>
															<p className={this.state.toggle == "one"?'active':'ins-tab-inactive'} >Salient Features</p>
														</li>
														<li onClick={()=> this.setState({toggle:'two'})}>
															<p className={this.state.toggle == "two"?'active ':'ins-tab-inactive'} >What's not Covered?</p></li>
													</ul>
												</div>
												<div className="ins-tabs-content">
													<div>													
														{
															this.state.toggle == "one"?
															Object.values(this.props.insurnaceData['insurance'][0].plans).filter(x=>x.id==this.state.is_checked).map((selected_plan,i) => {
																return (<ul key={i}>
																{selected_plan.content['salient_features'].map((result, i) => { 
																		return <li key={i}>
																		<p>{result}</p>
																		</li>})
																}
																</ul>)					
															})
															:Object.values(this.props.insurnaceData['insurance'][0].plans).filter(x=>x.id==this.state.is_checked).map((selected_plan,i) => {
																return (<ul key={i}>
																{selected_plan.content['whats_not_covered'].map((result, i) => { 
																			return <li key={i}>
																			<p>{result}</p>
																			</li>})
																}	
																</ul>)					
															}) 
												        }
												        {this.state.toggle == 'one'?
												        <div><a style={{paddingLeft: '12px',fontWeight: '500',fontSize: '12px',color:'#f78631',textDecoration: 'underline',cursor: 'pointer'}} onClick={()=> this.setState({toggle:'two'})}>T&C apply</a>
												        </div>
												        :''
												        }	
													</div>												
												</div>

											</div>
											<div className="ins-status-container">
												<div className="navigation_menu" id="">
													<ul className="navigation_tabs" id="">
														<li className="tab_inactive">
															<a href="#">Select Premium</a>
														</li>
														<li className="tab_active">
															<a href="#">Fill Details</a>
														</li>
														<li className="tab_disabled">
															<a href="#">Payment</a>
														</li>
													</ul>
												</div>
											</div>
											{/* tab section */}
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
																	 <input type="radio" name="gender" id={i} value={i} checked={this.state.is_checked=== result.id}/>
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
										<InsurPopup {...this.props} sendOTP={this.props.sendOTP.bind(this)} submitOTP={this.props.submitOTP.bind(this)} resetAuth={this.props.resetAuth.bind(this)}/> : ''
									}
									<button className="v-btn p-3 v-btn-primary btn-lg fixed horizontal bottom no-round btn-lg text-lg sticky-btn" onClick={this.proceedPlan.bind(this)}>Proceeed {this.state.selected_plan_price} <span className="foot-btn-sub-span">{this.state.gst}</span>
									</button>
								</div>

								<ChatPanel />
							</div>
						</section>
				</div>
			)
		}else{
			if(this.props.insurnaceData.certificate){
				this.props.history.push('/insurance/certificate')
			}
			return(
			<div></div>
			)
		}
	}
}

export default Insurance