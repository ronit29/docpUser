import React from 'react'
import GTM from '../../../helpers/gtm.js'

class ChatQuestion5 extends React.Component {
	constructor(props){
		super(props)
		this.state={
			feedback:''
		}
	}

	componentDidMount(){
		let data = {

            'Category': 'Chat', 'Action': 'ChatQuestion5PageLanded', 'CustomerID': GTM.getUserId(), 'leadid': 0, 'event': 'chat-question-5-page-landed', "url": window.location.pathname
        }
        GTM.sendEvent({ data: data })
		/*if(this.props.chat_feedback){
			let feedback = this.props.chat_feedback.filter(x=>x.type.includes('ques5'))
			if(feedback.length){
				this.setState({feedback: feedback[0].data})
			}
		}*/
	}


	submit(){
		let data = {
			feedback: this.state.feedback,
			question:'Any Comments?'
		}
		let feedback = this.props.chat_feedback && this.props.chat_feedback.length?this.props.chat_feedback.filter(x=>!x.type.includes('ques5')):[]
		feedback.push({type: 'ques5', data: data})
		feedback.push({createdOn: new Date()})
		this.props.saveChatFeedBack('ques5', data)
		let roomId = this.props.chat_feedback_roomId

		let postData = {
			rid: roomId,
			data: feedback
		}
		let gtmData = {

            'Category': 'Chat', 'Action': 'ChatQuestion5Submitted', 'CustomerID': GTM.getUserId(), 'leadid': 0, 'event': 'chat-question-5-submitted', "url": window.location.pathname
        }
        GTM.sendEvent({ data: gtmData })

		this.props.submitChatFeedback(postData)
		setTimeout(()=>{
			this.props.history.push('/chat/feedback/thanks')	
		},1000)
		
		
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