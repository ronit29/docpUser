import React from 'react'
import GTM from '../../../helpers/gtm';

class TopChatWidget extends React.Component {

	constructor(props) {
		super(props)
	}

	widgetClick(knowMore = false) {
		let gtmData = {
			'Category': 'ConsumerApp', 'Action': 'HomeVipWidgetClick', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'home-vip-widget-click'
		}
		GTM.sendEvent({ data: gtmData })

		// this.props.history.push('/mobileviewchat')
		if(knowMore) {
			this.props.history.push('/vip-club-details?source=mobile-home-knowmore-vip-clicked&lead_source=Docprime')
		}else{
			this.props.history.push('/mobileviewchat')
		}
		
	}

	render() {
		return (
			<div className="d-md-none home-duo-widget">
				<div className=" widget mrb-10 cursor-pntr" style={{ padding: '4px 6px', borderBottom: '5px solid #ffb601', alignItems: 'center', justifyContent: 'space-between' }} onClick={() => this.widgetClick(true)}>
					<div className="home-vip-cont">
						<div className="doc-avatar">
							<img src={ASSETS_BASE_URL + '/img/viplog.png'} />
						</div>
						<div style={{ flex: 1 }} >
							<p className="fw-700" style={{ fontSize: 12 }}>Become a Docprime VIP member <span className="vip-tp-sub-txt">Save 70% on your family's medical bills</span></p>
						</div>
					</div>
					<div className="chat-now-btn text-right">
						<p className="fw-500">Know More</p>
					</div>
				</div>
				<div className=" widget mrb-10 cursor-pntr" style={{ padding: '4px 6px', borderBottom: '5px solid #4289fe', alignItems: 'center', justifyContent: 'space-between' }} onClick={() => this.widgetClick()}>
					<div className="home-vip-cont">
						<div className="doc-avatar">
							<img src={ASSETS_BASE_URL + '/img/customer-icons/chat-icon.png'} />
						</div>
						<div style={{ flex: 1 }} >
							<p className="fw-700" style={{ fontSize: 12 }}>Online Doctor Consultation<span className="vip-tp-sub-txt">Talk to top doctors without any wait times</span></p>
						</div>
					</div>
					<div className="chat-now-btn text-right">
						<p className="fw-500">Consult Now</p>
					</div>
				</div>

			</div>
		)
	}
}

export default TopChatWidget