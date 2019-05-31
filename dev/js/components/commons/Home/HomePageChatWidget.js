import React from 'react'

class TopChatWidget extends React.Component {

	constructor(props){
		super(props)
	}

	render() {
		return (
			<div className="d-md-none widget mrb-10 d-flex align-items-center cursor-pntr" style={{ paddingLeft: 10 }} onClick={() => this.props.history.push('/mobileviewchat')} >
				<div className="doc-avatar">
					<img src={ASSETS_BASE_URL + '/img/customer-icons/doc-avatar.png'} />
				</div>
				<div style={{ flex: 1 }} >
					<p className="fw-500">Free Online Doctor Consultation!</p>
				</div>
				<div className="chat-now-btn d-flex">
					<p className="fw-500">Chat</p>
					<p className="fw-500">Now</p>
				</div>
			</div>
		)
	}
}

export default TopChatWidget