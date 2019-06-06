import React from 'react'

class TopChatWidget extends React.Component {

	constructor(props) {
		super(props)
	}

	render() {
		return (
			<div className="d-md-none widget mrb-10 d-flex cursor-pntr" style={{ padding: '4px 10px', borderBottom: '5px solid #4289fe', alignItems: 'baseline' }} onClick={() => this.props.history.push('/mobileviewchat')} >
				<div className="doc-avatar">
					<img src={ASSETS_BASE_URL + '/img/customer-icons/chat-icon.png'} />
				</div>
				<div style={{ flex: 1 }} >
					<p className="fw-500" style={{ fontSize: 13 }}>Free Online Doctor Consultation!</p>
				</div>
				<div className="chat-now-btn text-center">
					<p className="fw-500">Chat Now</p>
				</div>
			</div>
		)
	}
}

export default TopChatWidget