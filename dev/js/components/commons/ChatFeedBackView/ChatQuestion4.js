import React from 'react'
import GTM from '../../../helpers/gtm.js'
import SnackBar from 'node-snackbar'

class ChatQuestion4 extends React.Component {
	constructor(props){
		super(props)
		this.state={
			feedback:'',
			text:''
		}
	}

	componentDidMount(){
		let data = {

            'Category': 'Chat', 'Action': 'ChatQuestion4PageLanded', 'CustomerID': GTM.getUserId(), 'leadid': 0, 'event': 'chat-question-4-page-landed', "url": window.location.pathname
        }
        GTM.sendEvent({ data: data })
		/*if(this.props.chat_feedback){
			let feedback = this.props.chat_feedback.filter(x=>x.type.includes('ques4'))
			if(feedback.length){
				this.setState({feedback: feedback[0].data})
			}
		}*/
	}

	saveFeedBack(){
		if(!this.state.feedback) {
			SnackBar.show({ pos: 'bottom-center', text: "Please answer the Question" })
			return
		}
		let data = {
			feedback: this.state.feedback,
			question:'What do you think can be improved?',
			feedbackText: this.state.text
		}
		this.props.saveChatFeedBack('ques4', data)
		let gtmData = {

            'Category': 'Chat', 'Action': 'ChatQuestion4Submitted', 'CustomerID': GTM.getUserId(), 'leadid': 0, 'event': 'chat-question-4-submitted', "url": window.location.pathname
        }
        GTM.sendEvent({ data: gtmData })
		this.props.history.push('/chat/feedback/ques5')
	}

	render() {

		return(
			<div className="customer-feedback cf-hght">
				<div className="cf-card">
		            <div className="cf-body">
		              <p className="cf-prgh">What do you think can be improved?*</p> 
		              <ul className="cf-radio chat-radio-align">
		                <li className={`${this.state.feedback.includes('0')?'active':''}`}>
		                    <label className="custom-radio">
		                        <span className="cf-radio-text">Better treatment</span>
		                        <input onChange={()=>this.setState({feedback: '0', text: 'Better treatment'})} type="radio"  name="h-imp" checked={this.state.feedback.includes('0')}/>
		                        <span className="checkmark radio-checkmark"></span>
		                    </label>
		                </li>
		                <li  className={`${this.state.feedback.includes('1')?'active':''}`}>
		                    <label className="custom-radio">
		                        <span className="cf-radio-text">The doctor could have explained the treatment better</span>
		                        <input type="radio" onChange={()=>this.setState({feedback: '1', text: 'The doctor could have explained the treatment better'})} name="h-imp" checked={this.state.feedback.includes('1')}/>
		                        <span className="checkmark radio-checkmark"></span>
		                    </label>
		                </li>
		                <li className={`${this.state.feedback.includes('2')?'active':''}`}>
		                    <label className="custom-radio">
		                        <span className="cf-radio-text">Wait Time</span>
		                        <input type="radio" onChange={()=>this.setState({feedback: '2', text:'Wait Time'})}  name="h-imp" checked={this.state.feedback.includes('2')}/>
		                        <span className="checkmark radio-checkmark"></span>
		                    </label>
		                </li>
		                <li className={`${this.state.feedback.includes('3')?'active':''}`}>
		                    <label className="custom-radio">
		                        <span className="cf-radio-text">Everything was perfect</span>
		                        <input type="radio" onChange={()=>this.setState({feedback: '3', text:'Everything was perfect' })}  name="h-imp" checked={this.state.feedback.includes('3')}/>
		                        <span className="checkmark radio-checkmark"></span>
		                    </label>
		                </li>
		             </ul>
		            </div>
		            <div className="cf-footer">
		               <a href="javascript:void(0);" onClick={()=>this.props.history.push('/chat/feedback/ques3')} className="cf-btn cf-prev"> 
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

export default ChatQuestion4