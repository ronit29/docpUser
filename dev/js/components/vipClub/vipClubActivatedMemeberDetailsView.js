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
		if (this.props.vip_club_db_data.data.user && Object.keys(this.props.vip_club_db_data.data.user).length > 0 && this.props.vip_club_db_data.data.user.plus_members && this.props.vip_club_db_data.data.user.plus_members.length > 0) {
			// console.log(this.props.vip_club_db_data.data.user.plus_members)
		}
		return <section className="vip-user-details-container">
			<div className="ins-user-details-lisitng">
				<p className="sub-form-hed">Proposer</p>
				<ul className="ins-usr-img-para pl-0">
					<li>
						<div className="img-list-width">
							<img className="ins-input-img" src={ASSETS_BASE_URL + "/img/user-01.svg"} />
						</div>
						<p style={{ 'textTransform': 'capitalize' }}>rishab | Male</p>
					</li>
					<li>
						<div className="img-list-width">
							<img className="ins-input-img" src={ASSETS_BASE_URL + "/img/calendar-01.svg"} />
						</div>
						<p>25/07/1993</p>
					</li>
					<li>
						<div className="img-list-width">
							<img className="ins-input-img" src={ASSETS_BASE_URL + "/img/mail-01.svg"} />
						</div>
						<p>rishabh@docprime.com</p>
					</li>
				</ul>
			</div>
		</section>

	}

}

export default VipClubActivatedMemberDetails