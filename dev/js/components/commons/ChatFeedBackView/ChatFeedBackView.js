import React from 'react'

class ChatFeedBackView extends React.Component {

	render(){

		return(
		      <div className="customer-feedback cf-hght">
		         <div className="cf-card">
		            <div className="cf-body">
		              <h2 className="cf-title">Online consultation feedback</h2>
		              <p className="cf-prgh">Your feedback will help us improve services for the thousands of patients visiting us everyday.</p>  
		            </div>
		            <div className="cf-footer">
		               <a href="javascript:void(0);" className="cf-btn cf-only-btn">NEXT 
		                   <img src="images/right-arrow.png" alt="r-arrow" className="cf-img" />
		               </a>
		            </div>
		         </div> 
		      </div>

			)
	}
}

export default ChatFeedBackView