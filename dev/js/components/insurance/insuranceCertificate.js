import React from 'react'
import ProfileHeader from '../../components/commons/DesktopProfileHeader'
import ChatPanel from '../../components/commons/ChatPanel'
import Loader from '../commons/Loader'

class InsuranceCertificateView extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			showCancelPopup:false
		}
	}

	getGetOrdinal(n) {
   	var s=["th","st","nd","rd"],
       	v=n%100;
   		return n+(s[(v-20)%10]||s[v]||s[0]);
	}

	cancelPolicy(){
		if(this.props.get_insured_profile && this.props.get_insured_profile.is_cancel_allowed){
			this.props.history.push('/insurance/cancelpolicy')
		}else{
			this.setState({showCancelPopup:true})
		}
	}

	hideCancelPolicyPopup(){
		this.setState({showCancelPopup:false})
	}

	render() {
		if (Object.keys(this.props.get_insured_profile).length > 0) {
			let primaryMember
			let FamilyMembers
			{
				primaryMember = this.props.get_insured_profile.insured_members.filter(x=>x.relation=='self')
				FamilyMembers = this.props.get_insured_profile.insured_members.filter(x=>x.relation !='self')
				
			}
			var purchase_date = new Date(this.props.get_insured_profile.purchase_date)
			let purchase_time = purchase_date.toTimeString()
			let purchaseTime = purchase_time.split(" ")
			purchase_date = purchase_date.toDateString()
			let purchaseDate = purchase_date.split(" ")
			let expiry_date = new Date(this.props.get_insured_profile.expiry_date)
			let expiry_time = expiry_date.toTimeString()
			let expiryTime = expiry_time.split(" ")
			expiry_date = expiry_date.toDateString()
			let expiryDate = expiry_date.split(" ")
			return <div className="profile-body-wrap" style={{ paddingBottom: 80 }} >
				<ProfileHeader />
				{this.state.showCancelPopup?
					<section className="error-msg-pop">
		                <div className="cancel-overlay"></div>
		                <div className="popup-error" style={{ width: '300px' }}>
		                    <div className="error-head"><img className="errorInfoImg" src={ASSETS_BASE_URL + "/img/infoerror.svg"} />{"Alert"}</div>
		                    <div className="cross-btn">
		                        <img src={ASSETS_BASE_URL + "/img/icons/close.png"} alt="close" onClick={this.hideCancelPolicyPopup.bind(this)} />
		                    </div>
		                    <p className="error-msg">Your policy cannot be cancelled as you have already completed atleast 1 claim under your policy</p>
		                    <p className="error-msg subAlertins">for any other query you can call us at <span>
		                    	1800-123-9419
		                    </span></p>
		                </div>
		            </section>
                :''
				}
				<section className="container parent-section book-appointment-section container-top-margin">
					<div className="row main-row parent-section-row">
						<div className="col-12 col-md-7 col-lg-7">
							<section className="profile-book-screen">
								{/*<section className="section-margin-bottom">
									<div className="widget cong-margin-btm">
										<div className="ins-final-screen-continer">
											<div className="ins-card-head">
												<div className="ins-name-head certificate-width">
													<img width="140" src={this.props.get_insured_profile.insurer_img} />
													<p>
														OPD Insurance by <span>Apollo Munich</span>
														<span className="ins-active-container">
															<p>Active <img src={ASSETS_BASE_URL + "/img/chk-green.svg"} /></p>
														</span>
													</p> 
													<p>Group Out-patient Insurance<span className="ins-active-container">
														<p>Active <img src={ASSETS_BASE_URL + "/img/chk-green.svg"} /></p>
													</span>
													</p>
												</div>
											</div>
											<div className="ins-policy-date">
												<div className="details-flex-cont">
													<div className="ins-policy-details">
														<p>Policy Purchase Date</p>
														<span>{`${purchaseDate[2]}th ${purchaseDate[1]} ${purchaseDate[3]}`}</span>
													</div>
													<div className="ins-policy-details">
														<p>Valid Upto</p>
														<span>{`${expiryDate[2]}th ${expiryDate[1]} ${expiryDate[3]}`}</span>
													</div>
												</div>
												<div className="ins-policy-members-details">
													<p><span>Premium</span> : Rs {this.props.get_insured_profile.premium_amount}</p>
													<p style={{ 'textTransform': 'capitalize' }}><span>Proposer Name </span> : {this.props.get_insured_profile.proposer_name[0].first_name} {this.props.get_insured_profile.proposer_name[0].middle_name} {this.props.get_insured_profile.proposer_name[0].last_name}</p>
													<p><span>Policy Number</span> : {this.props.get_insured_profile.policy_number}</p>
													<p><span>Cover</span> : {this.props.get_insured_profile.insured_members.length} {this.props.get_insured_profile.insured_members.length == 1 ? 'Member' : 'Members'}</p>
													<ul>{Object.entries(this.props.get_insured_profile.insured_members).map(function ([key, value]) {
														return <li key={key} style={{ 'textTransform': 'capitalize' }}>
															<span className="insa-tbl-names"> {value.relation} : </span>
															<span className="insa-sub-tbl-names"> {value.first_name} {value.middle_name} {value.last_name} </span>
														</li>
													}, this)}
													</ul>
												</div>
											</div>
										</div>
									</div>
								</section>*/}
								<div className="widget">
									<div className="widget-content">
										{this.props.get_insured_profile?
										<div>
											<p className="fw-500 ins-congo-text text-primary text-center mrb-10">Congratulations !</p>
											<p className="fw-500 text-center mrb-10">Your Group Out-patient Insurance has been issued</p>
										</div>
										:''}
										<div className="ins-flex mrb-20">
											<img width="100" src="https://qacdn.docprime.com/media/insurer/images/apllogo.png" />
											{/*<p className="fw-500">OPD Insurance <br />by <span className="fw-700">Apollo Munich</span></p>*/}
											<p className="fw-500">Group Out-patient Insurance</p>
											{this.props.get_insured_profile?
												<div style={{flexGrow:'0',flexShrink: '0'}}>
													<img width="30" src={ASSETS_BASE_URL + "/img/chk-green.svg"} style={{ verticalAlign: '-31px' }} />
													<span className="fw-500" style={{ color: '#4fc243', verticalAlign: '-21px' }} >Active</span>
												</div>
												:''
											}
										</div>
										{/*this.props.get_insured_profile && this.props.get_insured_profile.insurance_status == 4?
												<p className="fw-500 text-center mrb-10">Your insurance policy is onhold</p>	
												:this.props.get_insured_profile && this.props.get_insured_profile.insurance_status == 5?
												<p className="fw-500 text-center mrb-10">Your cancellation request has been initiated</p>
										:''
										*/}
										{/*<div className="ins-flex mrb-10">
											<img src={ASSETS_BASE_URL + '/img/customer-icons/pdf.png'} />
											<p className="fw-500 mr-0">Please find attached the certificate of insurance for the issued policy</p>
										</div>*/}
										<div style={{display:'flex',alignItems:'center',justifyContent:'flex-end'}}>
											<a style={{fontWeight: '500',fontSize: '12px',color:'#f78631',textDecoration: 'underline',cursor: 'pointer'}} href='/insurance/network' onClick={(e)=>{
												e.preventDefault();
												this.props.history.push('/insurance/network')
											}}>View Network</a>
										</div>
									</div>
									<div className="ins-flex justify-content-between ins-date-row mrb-0">
										<div className="ins-date text-center">
											<p className="fw-500 mrb-5">Policy issue Date</p>
											<p className="fw-700">{`${this.getGetOrdinal(purchaseDate[2])} ${purchaseDate[1]} ${purchaseDate[3]}`}</p>
										</div>
										<div className="ins-date text-center">
											<p className="fw-500 mrb-5">Policy expiry Date</p>
											<p className="fw-700">{`${this.getGetOrdinal(expiryDate[2])} ${expiryDate[1]} ${expiryDate[3]}`}</p>
										</div>
										<div className="ins-date text-center">
											<p className="fw-500 mrb-5">Policy Number</p>
											<p className="fw-700">{this.props.get_insured_profile.policy_number}</p>
										</div>
									</div>
									<div className="widget-content ins-bg-grey">
										<div className="container ins-details-container">
											<div className="row ins-details-row no-gutters">
												<div className="col-6 ins-details-div">
													<p className="ins-gr-text fw-500">Annual Premium Paid:</p>
												</div>
												<div className="col-6 ins-details-div">
													<p className="ins-bl-text fw-500">&#8377; {this.props.get_insured_profile.premium_amount}</p>
												</div>
											</div>
											<div className="row ins-details-row no-gutters">
												<div className="col-6 ins-details-div">
													<p className="ins-gr-text fw-500">Proposer Name:</p>
												</div>
												<div className="col-6 ins-details-div">
													<p className="ins-bl-text fw-500" style={{ 'textTransform': 'capitalize' }}>{this.props.get_insured_profile.proposer_name[0].first_name} {this.props.get_insured_profile.proposer_name[0].middle_name} {this.props.get_insured_profile.proposer_name[0].last_name}</p>
												</div>
											</div>
											<div className="row ins-details-row no-gutters">
												<div className="col-6 ins-details-div">
													<p className="ins-gr-text fw-500">Covered Members:</p>
												</div>
												<div className="col-6 ins-details-div">
													{
														primaryMember && primaryMember.length > 0?
															<p key={0} style={{ 'textTransform': 'capitalize' }} className="ins-bl-text fw-500">
																<span className="fw-400">{primaryMember[0].relation} : - </span>
																{primaryMember[0].first_name} {primaryMember[0].middle_name} {primaryMember[0].last_name}
																</p>
														:''
													}
													
														{Object.entries(FamilyMembers).map(function ([key, value]) {
															return  <p key={key} style={{ 'textTransform': 'capitalize' }} className="ins-bl-text fw-500">
																<span className="fw-400">{value.relation} : - </span>
																{value.first_name} {value.middle_name} {value.last_name}
																</p>
														})}
												</div>
											</div>
										</div>
									</div>
								</div>
							</section>
							{
								this.props.get_insured_profile && this.props.get_insured_profile.insurance_status == 1?
									<div className="sticky-btn fixed insuBtnsContainer">
										<button className="insu-left-white-btn" onClick={this.cancelPolicy.bind(this)} style={{color:this.props.get_insured_profile.is_cancel_allowed?'#f78631':'#757575' }}>Cancel Policy
										</button>
										<a className="insu-right-orng-btn foot-btn-Anchr" href={this.props.get_insured_profile.coi_url} download target="_blank">Download Certificate of Insurance <span className="foot-btn-sub-span">(Policy Document)</span>
										</a>
									</div>
							:''}
								{/*<a onClick={this.cancelPolicy.bind(this)}>
									cancel policy
								</a>
								<a className={"v-btn p-3 v-btn-primary btn-lg fixed horizontal bottom no-round btn-lg text-lg sticky-btn text-center" +(this.props.showBtn?'ins-no-download':'')} style={{ color: "#ffffff" }} href={this.props.get_insured_profile.coi_url} download target="_blank">
									Download Certificate of Insurance<span className="foot-btn-sub-span">(Policy Document)</span>
													</a>*/}
						</div>
						<ChatPanel />
					</div>
				</section>
				{
					this.props.get_insured_profile.is_endorsement_allowed?
					<a onClick={()=>this.props.history.push('/insurance/insurance-endorsement-details')}>
						click here for Endoresment
					</a>
					:''
				}
			</div>
		} else {
			return <div className="profile-body-wrap" style={{ paddingBottom: 80 }} >
				<ProfileHeader />
				<Loader/>
			</div>
		}

	}
}

export default InsuranceCertificateView    