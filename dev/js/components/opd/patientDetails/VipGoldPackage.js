import React from 'react'

class VipGoldPackagePriceView extends React.PureComponent {

	render() {

		return (
			<div className="search-el-popup-overlay cancel-overlay-zindex" onClick={(e) => {
				e.preventDefault()
				e.stopPropagation()
				this.props.toggleGoldPricePopup()
			}}>
				<div className="search-el-popup" onClick={(e) => {
					e.preventDefault()
					e.stopPropagation()
				
					}}>
					<div className="widget p-12">
						<div className="p-relative">
							<span className="ipd-pop-ild" onClick={(e) => {
								e.stopPropagation()
								e.preventDefault()
								this.props.toggleGoldPricePopup()
							}}><img src={ASSETS_BASE_URL + "/img/icons/close.png"} />
							</span>
						</div>
						<h4 className="gold-pop-hdng">Select Plan</h4>
						<div className="gold-offer-cont gold-pop-pading">
							<h4 className="gold-ofr-hdng">LIMITED PERIOD OFFER</h4>
							<div className="gold-list-container">
								{
									this.props.vipGoldPlans && this.props.vipGoldPlans.length > 0 ?
										this.props.vipGoldPlans.map((value, key) => {
											return <div key={key} className={`gold-ofr-lising addpdng-popup ${value.id == (this.props.selected_vip_plan && this.props.selected_vip_plan.id) ? 'gold-select' : ''}`} onClick={() => this.props.toggleGoldPlans(value)}>
												<div className="gold-mnthplan">
													<p className="mnth-plan-gld">
														Coverage: {value.total_allowed_members} {parseInt(value.total_allowed_members) > 1 ? 'Members' : 'Member'}
													</p>
													<p className="gld-cvr-txt">Valid for {value.tenure} Months {value.is_selected ? <span>POPULAR</span> : ''}</p>
												</div>
												<div className="gold-price">
													<p className="gld-prc"><span className="gold-prc-cut">₹{value.mrp}</span> ₹{value.deal_price}</p>
													<div className="gold-pln-slct-radio">
														<div className="gd-rdio-gray"></div>
														<img className="gd-rdio-chk" src={ASSETS_BASE_URL + '/img/vip-chk.svg'} />
													</div>
												</div>
											</div>
										})
										: ''}

							</div>

							{
								false && this.props.selected_plan_data && Object.keys(this.props.selected_plan_data).length > 0 && this.props.is_vip_gold && this.props.vipClubList && this.props.vipClubList.gold_plans && this.props.vipClubList.gold_plans.length > 0 && this.props.selected_plan_data.show_consultation_text ?
									<p className="gld-lst-foot-txt">Includes Unlimited Online Consultation <span>(General
                                        Physician)</span></p>
									: ''
							}
						</div>
						<p className="gol-pop-custom-btn" onClick={this.props.goToGoldPage}>View Details</p>
					</div>
				</div>
			</div>
		)
	}
}

export default VipGoldPackagePriceView