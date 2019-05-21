import React from 'react'

class ChatThanksView extends React.Component {

	render(){

		return(
		   <div className="cf-hght">
	    	<div className="thanks-div">
              <img src="/assets/images/tick.png" className="cf-tick-img" alt="tick-img" />
              <div className="cf-thanks-text">Thank You !</div>
              <p className="cf-tnanks-prgh">Feedback submitted successfully. Please follow-up as per our doctor's advice.</p>
          	</div>
          </div>

			)
	}
}

export default ChatThanksView