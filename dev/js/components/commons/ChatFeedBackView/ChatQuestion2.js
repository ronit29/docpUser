import React from 'react'

class ChatQuestion2 extends React.Component {
	constructor(props){
		super(props)
		this.state={
			feedback:null
		}
	}

	componentDidMount(){
		/*if(this.props.chat_feedback){
			let feedback = this.props.chat_feedback.filter(x=>x.type.includes('ques2'))
			if(feedback.length){
				this.setState({feedback: feedback[0].data})
			}
		}*/
	}

	saveFeedBack(data){
		this.props.saveChatFeedBack('ques2', this.state.feedback)
		this.props.history.push('/chat/feedback/ques3')
	}

	render() {

		return(
			<div className="customer-feedback cf-hght">
				<div className="cf-card">
		            <div className="cf-body">
		              <p className="cf-prgh">How have your symptoms improved with our treatment?*</p>  
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
		             </ul>
		            </div>
		            <div className="cf-footer">
		               <a href="javascript:void(0);" onClick={()=>this.props.history.push('/chat/feedback/ques1')} className="cf-btn cf-prev"> 
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