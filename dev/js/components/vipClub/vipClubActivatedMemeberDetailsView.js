import React from 'react';
import InsuranceProofs from './insuranceProofs.js'

class VipClubActivatedMemberDetails extends React.Component { // already activated members view

	constructor(props) {
		super(props)
		this.state = {
			toggleTabType: false,
			tabsValue: []
		}
	}

	render() {
		return <section className="vip-user-details-container">
					{this.props.vip_club_db_data.data.user && Object.keys(this.props.vip_club_db_data.data.user).length > 0 && this.props.vip_club_db_data.data.user.plus_members && this.props.vip_club_db_data.data.user.plus_members.length > 0?
						this.props.vip_club_db_data.data.user.plus_members.map((val,key) => {
						return <div key={key}className="ins-user-details-lisitng" id={val.id}>
							<p className="sub-form-hed">{val.is_primary_user? 'Proposer':val.relation?val.relation:''}</p>
							<ul className="ins-usr-img-para pl-0">
								<li>
									<div className="img-list-width">
										<img className="ins-input-img" src={ASSETS_BASE_URL + "/img/user-01.svg"} />
									</div>
									<p style={{ 'textTransform': 'capitalize' }}>{val.first_name} {val.last_name} | {val.title == 'mr.'?'Male':val.gender == 'm' ? 'Male':'Female'}</p>
								</li>
								{val.dob?
									<li>
										<div className="img-list-width">
											<img className="ins-input-img" src={ASSETS_BASE_URL + "/img/calendar-01.svg"} />
										</div>
										<p>{val.dob}</p>
									</li>
								:''}
								{
									val.email?
									<li>
										<div className="img-list-width">
											<img className="ins-input-img" src={ASSETS_BASE_URL + "/img/mail-01.svg"} />
										</div>
										<p>{val.email}</p>
									</li>
								:''}
							</ul>
							{/*val.is_primary_user && val.document_ids == null?
								<InsuranceProofs {...this.props} member_id = {val.profile} is_primary_user = {true}/>
								: ''*/
							}
						</div>
						})
					:""}
				</section>

	}

}

export default VipClubActivatedMemberDetails