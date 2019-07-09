import React from 'react'
import { connect } from 'react-redux'
import ChatFeedBackView from '../../components/commons/SinglePageChatFeedBackView'
import { saveChatFeedBack, submitChatFeedback, saveChatFeedbackRoomId } from '../../actions/index.js'

class SinglePageChatFeedBack extends React.Component {

	render(){
		return(
			<ChatFeedBackView {...this.props} />
			)
	}
}

const mapStateToProps = (state) =>{

	const{
		chat_feedback,
		chat_feedback_roomId
	} = state.USER

	return{
		chat_feedback,
		chat_feedback_roomId
	}
}

const mapDispatchToProps = ( dispatch) => {

	return{
		submitChatFeedback: (postData) => dispatch(submitChatFeedback(postData)),
		saveChatFeedbackRoomId: (rid) => dispatch(saveChatFeedbackRoomId(rid))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(SinglePageChatFeedBack)