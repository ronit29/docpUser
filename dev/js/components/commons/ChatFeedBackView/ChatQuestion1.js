import React from 'react'
import GTM from '../../../helpers/gtm.js'
import SnackBar from 'node-snackbar'

class ChatQuestion1 extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			feedback: ''
		}
	}

	componentDidMount() {
		let data = {

			'Category': 'Chat', 'Action': 'ChatQuestion1PageLanded', 'CustomerID': GTM.getUserId(), 'leadid': 0, 'event': 'chat-question-1-page-landed', "url": window.location.pathname
		}
		GTM.sendEvent({ data: data })
		/*if(this.props.chat_feedback){
			let feedback = this.props.chat_feedback.filter(x=>x.type.includes('ques1'))
			if(feedback.length){
				this.setState({feedback: feedback[0].data})
			}
		}*/
	}

	saveFeedBack() {
		if (!this.state.feedback) {
			SnackBar.show({ pos: 'bottom-center', text: "Please answer the Question" })
			return
		}
		let data = {
			feedback: this.state.feedback,
			question: 'Have you taken your prescribed medicines, regularly?'
		}
		this.props.saveChatFeedBack('ques1', data)
		let gtmData = {

			'Category': 'Chat', 'Action': 'ChatQuestion1Submitted', 'CustomerID': GTM.getUserId(), 'leadid': 0, 'event': 'chat-question-1-submitted', "url": window.location.pathname
		}
		GTM.sendEvent({ data: gtmData })
		this.props.history.push('/chat/feedback/ques2')
	}

	render() {

		return (
		<div>
			<div className="chat-pop-heading">
				<h3>Online consultation feedback</h3>
				<p>Your feedback will help us improve services for the thousands of patients visiting us everyday.</p>
			</div>
			<div className="customer-feedback cf-hght">
				<div className="cf-card">
					<div className="cf-body">
						<p className="cf-prgh">Have you taken your prescribed medicines, regularly?*</p>
						<a href="javascript:void(0);" onClick={() => this.setState({ feedback: 'Yes' })} className={`cf-ans ${this.state.feedback == 'Yes' ? 'active' : ''}`}>YES</a>
						<a href="javascript:void(0);" onClick={() => this.setState({ feedback: 'No' })} className={`cf-ans ${this.state.feedback == 'No' ? 'active' : ''}`}>NO</a>
					</div>
					<div className="cf-footer">
						{/*
		               <a href="javascript:void(0);" className="cf-btn cf-prev"> 
		                   <img src="images/left-arrow.png" alt="r-arrow" className="cf-img" />
		                   PREVIOUS
		               </a>
		*/}
						<a href="javascript:void(0);" onClick={this.saveFeedBack.bind(this)} className="cf-btn cf-next">NEXT
		                   <img src="/assets/images/right_arrow.png" alt="r-arrow" className="cf-img" />
						</a>
					</div>
				</div>
			</div>
		</div>
			)
	}
}

export default ChatQuestion1