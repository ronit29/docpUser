import React from 'react';

class VipClubActivatedMemberDetails extends React.Component {

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
							<p className="sub-form-hed">Proposer</p>
							<ul className="ins-usr-img-para pl-0">
								<li>
									<div className="img-list-width">
										<img className="ins-input-img" src={ASSETS_BASE_URL + "/img/user-01.svg"} />
									</div>
									<p style={{ 'textTransform': 'capitalize' }}>{val.first_name +  val.last_name} | {val.title == 'mr.'?'Male':'Female'}</p>
								</li>
								<li>
									<div className="img-list-width">
										<img className="ins-input-img" src={ASSETS_BASE_URL + "/img/calendar-01.svg"} />
									</div>
									<p>{val.dob}</p>
								</li>
								<li>
									<div className="img-list-width">
										<img className="ins-input-img" src={ASSETS_BASE_URL + "/img/mail-01.svg"} />
									</div>
									<p>{val.email}</p>
								</li>
							</ul>
						</div>
						})
					:""}
				</section>

	}

}

export default VipClubActivatedMemberDetails