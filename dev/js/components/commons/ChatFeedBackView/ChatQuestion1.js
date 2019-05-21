import React from 'react'

class ChatQuestion1 extends React.Component {
	constructor(props){
		super(props)
		this.state={
			feedback:'Yes'
		}
	}

	componentDidMount(){
		/*if(this.props.chat_feedback){
			let feedback = this.props.chat_feedback.filter(x=>x.type.includes('ques1'))
			if(feedback.length){
				this.setState({feedback: feedback[0].data})
			}
		}*/
	}

	saveFeedBack(){
		this.props.saveChatFeedBack('ques1', this.state.feedback)
		this.props.history.push('/chat/feedback/ques2')
	}

	render() {

		return(
			<div className="customer-feedback cf-hght">
				<div className="cf-card">
		            <div className="cf-body">
		              <p className="cf-prgh">Have you taken your prescribed medicines, regularly?*</p>  
		              <a href="javascript:void(0);" onClick={()=>this.setState({feedback: 'Yes'})} className={`cf-ans ${this.state.feedback=='Yes'?'active':''}`}>YES</a>
		              <a href="javascript:void(0);" onClick={()=>this.setState({feedback: 'No'})} className={`cf-ans ${this.state.feedback=='No'?'active':''}`}>NO</a>
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
			)
	}
}

export default ChatQuestion1