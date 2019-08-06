import React from 'react'
import GTM from '../../../helpers/gtm.js'
import SnackBar from 'node-snackbar'
const queryString = require('query-string');

class ChatQuestion2 extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			feedback: {}
		}
	}

	componentDidMount() {
		let data = {

			'Category': 'Chat', 'Action': 'ChatNewFeedbackPageLanded', 'CustomerID': GTM.getUserId(), 'leadid': 0, 'event': 'chat-new-feedback-page-landed', "url": window.location.pathname
		}
		GTM.sendEvent({ data: data })
	}

	saveFeedBack(data) {
		let ques1=[]
		let ques2= []
		let length = document.querySelectorAll('input:checked').length
		for(var i = 0;i<length;i++){
			let x = document.querySelectorAll('input:checked')[i]
			if(x && x.classList && x.classList.contains('QUES1') ){
				ques1.push(x.getAttribute('val'))
			}

			if(x && x.classList && x.classList.contains('QUES2') ){
				ques2.push(x.getAttribute('val'))
			}

		}

		if (!ques1.length) {
			SnackBar.show({ pos: 'bottom-center', text: "Please answer the First Question " })
			return
		}

		if (!ques2.length) {
			SnackBar.show({ pos: 'bottom-center', text: "Please answer the Second Question " })
			return
		}

		if (!this.state.comments) {
			SnackBar.show({ pos: 'bottom-center', text: "Please add some Comments" })
			return
		}

		const parsed = queryString.parse(this.props.location.search)
		let rid = parsed.rid || ''
		if(rid){
			try{
				if(window && window.atob(rid) ){
					rid = window.atob(rid)
				}
			}catch(e){
				
			}
		}

		let postData = {
			rid: rid,
			data: [
				{type:'ques1', data: {question: 'What do you think can be improved?', feedback:ques1} },
				{type:'ques2', data: {question:'What did you like about the service?', feedback:ques2} },
				{type:'ques3', data: {question:'Any Comments?', feedback:[this.state.comments]} },
				{createdOn: new Date()},
				{type: 'SinglePageFeedback'}
			]
		}

		this.props.submitChatFeedback(postData)
		let gtmData = {

			'Category': 'Chat', 'Action': 'ChatNewFeedbackSubmitted', 'CustomerID': GTM.getUserId(), 'leadid': 0, 'event': 'chat-new-feedback-submitted', "url": window.location.pathname
		}
		GTM.sendEvent({ data: gtmData })
		setTimeout(()=>{
			this.props.history.push('/chat/feedback/thanks')	
		},1000)
	}

	render() {

		return (
			<div className="customer-feedback cf-hght">
				<div className="cf-card">
					<div className="cf-body">
						<h3 className="nechatheding">Online consultation <br></br>feedback</h3>
						<div className="chat-qa-cont">
							<h4>Q 1: What do you think can be improved?</h4>
							<ul className="chat-qa-listing">
								<li>
									<label className="ck-bx">
										<span className="rate-feed-text">Better treatment</span>
										<input type="checkbox" className="QUES1" val ='Better treatment' ques='1'/>
										<span className="checkmark" />
									</label>
								</li>
								<li>
									<label className="ck-bx">
										<span className="rate-feed-text">The doctor could have explained the treatment better</span>
										<input type="checkbox" className="QUES1" val ='The doctor could have explained the treatment better' ques='2'/>
										<span className="checkmark" />
									</label>
								</li>
								<li>
									<label className="ck-bx">
										<span className="rate-feed-text">Too many questions/ Irrelevant questions</span>
										<input type="checkbox" className="QUES1" val='Too many questions/ Irrelevant questions' ques='1'/>
										<span className="checkmark" />
									</label>
								</li>
								<li>
									<label className="ck-bx">
										<span className="rate-feed-text">Everything was perfect</span>
										<input type="checkbox" className="QUES1" val='Everything was perfect' ques='1'/>
										<span className="checkmark" />
									</label>
								</li>
							</ul>
							<h4>Q 2: What did you like about the service?</h4>
							<ul className="chat-qa-listing">
								<li>
									<label className="ck-bx">
										<span className="rate-feed-text">Quick consultation time</span>
										<input type="checkbox" className="QUES2" val='Quick consultation time' ques='2'/>
										<span className="checkmark" />
									</label>
								</li>
								<li>
									<label className="ck-bx">
										<span className="rate-feed-text">Right advice/treatment</span>
										<input type="checkbox" className="QUES2" val='Right advice/treatment' ques='2'/>
										<span className="checkmark" />
									</label>
								</li>
								<li>
									<label className="ck-bx">
										<span className="rate-feed-text">Easy to understand interface</span>
										<input type="checkbox" className="QUES2" val='Easy to understand interface' ques='2'/>
										<span className="checkmark" />
									</label>
								</li>
								<li>
									<label className="ck-bx">
										<span className="rate-feed-text">Did not like anything</span>
										<input type="checkbox" className="QUES2" val='Did not like anything' ques ='2'/>
										<span className="checkmark" />
									</label>
								</li>
							</ul>
							<h4>Q 3: Any Comments?</h4>
							<textarea onChange={(e)=>{this.setState({comments: e.target.value})}} >{this.state.comments}</textarea>
						</div>
					</div>
					<div className="cf-footer">
						<a style={{margin:'auto'}} href="javascript:void(0);" onClick={this.saveFeedBack.bind(this)} className="cf-btn">SUBMIT
		                   <img src="/assets/images/right_arrow.png" alt="r-arrow" className="cf-img" />
						</a>
					</div>
				</div>
			</div>
		)
	}
}

export default ChatQuestion2