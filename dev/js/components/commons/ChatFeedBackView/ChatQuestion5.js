import React from 'react'

class ChatQuestion5 extends React.Component {
	constructor(props){
		super(props)
		this.state={
			feedback:''
		}
	}

	componentDidMount(){
		/*if(this.props.chat_feedback){
			let feedback = this.props.chat_feedback.filter(x=>x.type.includes('ques5'))
			if(feedback.length){
				this.setState({feedback: feedback[0].data})
			}
		}*/
	}


	submit(){
		let feedback = this.props.chat_feedback.filter(x=>!x.type.includes('ques5'))
		feedback.push({type: 'ques5', data: this.state.feedback})
		this.props.saveChatFeedBack('ques5', this.state.feedback)
		let roomId = this.props.chat_feedback_roomId
		let postData = {
			rid: roomId,
			data: feedback
		}

		this.props.submitChatFeedback(postData)
		this.props.history.push('/chat/feedback/thanks')
		
	}

	render() {

		return(
			<div className="customer-feedback cf-hght">
				<div className="cf-card">
		            <div className="cf-body">
		              <p className="cf-prgh">Any Comments?</p> 
		              <textarea className="cf-textarea" value={this.state.feedback} placeholder="Type here..." onChange={(e)=>this.setState({feedback: e.target.value})}></textarea>
		            </div>
		            <div className="cf-footer">
		               <a href="javascript:void(0);" className="cf-btn cf-prev" onClick={()=>this.props.history.push('/chat/feedback/ques4')}> 
		                   <img src="/assets/images/right_arrow.png" alt="r-arrow" className="cf-img cf-rotate" />
		                   PREVIOUS
		               </a>
		               <a href="javascript:void(0);" onClick={this.submit.bind(this)} className="cf-btn cf-next cf-submit">SUBMIT 
		               </a>
		            </div>
		         </div>
	         </div>
			)
	}
}

export default ChatQuestion5