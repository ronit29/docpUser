import React from 'react'
import GTM from '../../../helpers/gtm';

class TopChatWidget extends React.Component {

	constructor(props) {
		super(props)
	}

	widgetClick() {
		let gtmData = {
			'Category': 'ConsumerApp', 'Action': 'HomeChatWidgetClick', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'home-chat-widget-click'
		}
		GTM.sendEvent({ data: gtmData })

		this.props.history.push('/mobileviewchat')
	}

	render() {
		return (
			<div className="d-md-none widget mrb-10 d-flex cursor-pntr" style={{ padding: '4px 10px', borderBottom: '5px solid #4289fe', alignItems: 'center' }} onClick={() => this.widgetClick()}>
				<div className="home-vip-cont">
					<div className="doc-avatar">
						<img src={ASSETS_BASE_URL + '/img/viplog.png'} />
					</div>
					<div style={{ flex: 1 }} >
						<p className="fw-500" style={{ fontSize: 11 }}>Become a <span className="fw-700">Docprime VIP</span> member and Save 70% on your family medical bills</p>
					</div>
				</div>
				<div className="chat-now-btn text-center">
					<p className="fw-500">Chat Now</p>
				</div>
			</div>
		)
	}
}

export default TopChatWidget