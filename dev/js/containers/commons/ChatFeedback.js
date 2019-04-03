import React from 'react'
import { connect } from 'react-redux'
import ChatFeedBackView from '../../components/commons/ChatFeedBackView'
import { saveChatFeedBack, submitChatFeedback } from '../../actions/index.js'

class ChatFeedBack extends React.Component {

	render(){
		return(
			<ChatFeedBackView {...this.props} />
			)
	}
}

const mapStateToProps = (state) =>{

	const{
		chat_feedback
	} = state.USER

	return{
		chat_feedback
	}
}

const mapDispatchToProps = ( dispatch) => {

	return{
		saveChatFeedBack: (type, data) => dispatch(saveChatFeedBack(type, data)),
		submitChatFeedback: (postData) => dispatch(submitChatFeedback(postData))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatFeedBack)