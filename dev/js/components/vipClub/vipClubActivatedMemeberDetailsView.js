import React from 'react';

class VipClubActivatedMemberDetails extends React.Component {

	constructor(props) {
        super(props)
        this.state = {
           toggleTabType: false,
           tabsValue:[]
        }
    }

    render(){
    	if(this.props.vip_club_db_data.data.user && Object.keys(this.props.vip_club_db_data.data.user).length > 0 && this.props.vip_club_db_data.data.user.plus_members && this.props.vip_club_db_data.data.user.plus_members.length > 0){
    		// console.log(this.props.vip_club_db_data.data.user.plus_members)
    	}
    	return <section className="container container-top-margin cardMainPaddingRmv">
				<div className="row no-gutters dsktp-row-gutter">
					<div className="col-12 col-md-7 col-lg-7 ins-main-padding">
						<section className="profile-book-screen">
							<div className="widget mrt-10" style={{padding:'10px 4px'}}>
								<div className="insurance-member-container" style={{padding:'0 8px 0'}}>
									<div className="ins-user-details-lisitng">
										<p className="sub-form-hed">Proposer</p>
										<ul className="ins-usr-img-para pl-0">
											<li>
												<div className="img-list-width">
													<img className="ins-input-img"  src={ASSETS_BASE_URL + "/img/user-01.svg"} />
												</div>
												<p style={{'textTransform': 'capitalize'}}>rishab | Male</p>
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
								</div>
							</div>
						</section>
					</div>
				</div>
			</section>
    }

}

export default VipClubActivatedMemberDetails