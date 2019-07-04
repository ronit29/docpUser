import React from 'react'
import GTM from '../../../helpers/gtm.js'
import SnackBar from 'node-snackbar'

class ChatQuestion2 extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			feedback: null
		}
	}

	componentDidMount() {
		let data = {

			'Category': 'Chat', 'Action': 'ChatQuestion2PageLanded', 'CustomerID': GTM.getUserId(), 'leadid': 0, 'event': 'chat-question-2-page-landed', "url": window.location.pathname
		}
		GTM.sendEvent({ data: data })
		/*if(this.props.chat_feedback){
			let feedback = this.props.chat_feedback.filter(x=>x.type.includes('ques2'))
			if(feedback.length){
				this.setState({feedback: feedback[0].data})
			}
		}*/
	}

	saveFeedBack(data) {
		if (!this.state.feedback) {
			SnackBar.show({ pos: 'bottom-center', text: "Please answer the Question" })
			return
		}
		data = {
			feedback: this.state.feedback,
			question: 'How have your symptoms improved with our treatment?'
		}
		this.props.saveChatFeedBack('ques2', data)
		let gtmData = {

			'Category': 'Chat', 'Action': 'ChatQuestion2Submitted', 'CustomerID': GTM.getUserId(), 'leadid': 0, 'event': 'chat-question-2-submitted', "url": window.location.pathname
		}
		GTM.sendEvent({ data: gtmData })
		this.props.history.push('/chat/feedback/ques3')
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
										<input type="checkbox" />
										<span className="checkmark" />
									</label>
								</li>
								<li>
									<label className="ck-bx">
										<span className="rate-feed-text">The doctor could have explained the treatment better</span>
										<input type="checkbox" />
										<span className="checkmark" />
									</label>
								</li>
								<li>
									<label className="ck-bx">
										<span className="rate-feed-text">Too many questions/ Irrelevant questions</span>
										<input type="checkbox" />
										<span className="checkmark" />
									</label>
								</li>
								<li>
									<label className="ck-bx">
										<span className="rate-feed-text">Everything was perfect</span>
										<input type="checkbox" />
										<span className="checkmark" />
									</label>
								</li>
							</ul>
							<h4>Q 2: What did you like about the service?</h4>
							<ul className="chat-qa-listing">
								<li>
									<label className="ck-bx">
										<span className="rate-feed-text">Quick consultation time</span>
										<input type="checkbox" />
										<span className="checkmark" />
									</label>
								</li>
								<li>
									<label className="ck-bx">
										<span className="rate-feed-text">Right advice/treatment</span>
										<input type="checkbox" />
										<span className="checkmark" />
									</label>
								</li>
								<li>
									<label className="ck-bx">
										<span className="rate-feed-text">Easy to understand interface</span>
										<input type="checkbox" />
										<span className="checkmark" />
									</label>
								</li>
								<li>
									<label className="ck-bx">
										<span className="rate-feed-text">Did not like anything</span>
										<input type="checkbox" />
										<span className="checkmark" />
									</label>
								</li>
							</ul>
							<h4>Q 3: Any Comments?</h4>
							<textarea></textarea>
						</div>
						{/* <p className="cf-prgh">How have your symptoms improved with our treatment?*</p>  
		              <span className="cf-light-txt">Rate on a scale from 1 - 5, where 5 is perfectly recovered/healthy</span>
		              <ul className="cf-rating cursor-pntr">
		                <li onClick={()=>this.setState({feedback: 1})}>
		                	{
		                		this.state.feedback>=1?
		                		<img src="/assets/images/star-orange.png" alt="star" className="cf-rating-img"/>
		                    	:<img src="/assets/images/star-grey.png" alt="star" className="cf-rating-img"/>	
		                	}
		                    <span className="cf-rating-val">1</span>
		                    <div className="rating-txt">Worse</div>
		                </li>
		                <li onClick={()=>this.setState({feedback: 2})}>
		                    {
		                		this.state.feedback>=2?
		                		<img src="/assets/images/star-orange.png" alt="star" className="cf-rating-img"/>
		                    	:<img src="/assets/images/star-grey.png" alt="star" className="cf-rating-img"/>	
		                	}
		                    <span className="cf-rating-val">2</span>
		                </li>
		                <li onClick={()=>this.setState({feedback: 3})}>
		                    {
		                		this.state.feedback>=3?
		                		<img src="/assets/images/star-orange.png" alt="star" className="cf-rating-img"/>
		                    	:<img src="/assets/images/star-grey.png" alt="star" className="cf-rating-img"/>	
		                	}
		                	<span className="cf-rating-val">3</span>
		                </li>
		                <li onClick={()=>this.setState({feedback: 4})}>
		                    {
		                		this.state.feedback>=4?
		                		<img src="/assets/images/star-orange.png" alt="star" className="cf-rating-img"/>
		                    	:<img src="/assets/images/star-grey.png" alt="star" className="cf-rating-img"/>	
		                	}
		                	<span className="cf-rating-val">4</span>
		                </li>
		                <li onClick={()=>this.setState({feedback: 5})}>
		                    {
		                		this.state.feedback>=5?
		                		<img src="/assets/images/star-orange.png" alt="star" className="cf-rating-img"/>
		                    	:<img src="/assets/images/star-grey.png" alt="star" className="cf-rating-img"/>	
		                	}
		                	<span className="cf-rating-val">5</span>
		                    <div className="rating-txt">Fantastic</div>
		                </li>
		             </ul> */}
					</div>
					<div className="cf-footer">
						<a href="javascript:void(0);" onClick={() => this.props.history.push('/chat/feedback')} className="cf-btn cf-prev">
							<img src="/assets/images/right_arrow.png" alt="r-arrow" className="cf-img cf-rotate" />
							PREVIOUS
		               </a>
						<a href="javascript:void(0);" onClick={this.saveFeedBack.bind(this)} className="cf-btn cf-next">NEXT
		                   <img src="/assets/images/right_arrow.png" alt="r-arrow" className="cf-img" />
						</a>
					</div>
				</div>
			</div>
		)
	}
}

export default ChatQuestion2