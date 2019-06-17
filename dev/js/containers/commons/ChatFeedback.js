import React from 'react'
import { connect } from 'react-redux'
import ChatFeedBackView from '../../components/commons/ChatFeedBackView'
import { saveChatFeedBack, submitChatFeedback, saveChatFeedbackRoomId } from '../../actions/index.js'
const queryString = require('query-string');

class ChatFeedBack extends React.Component {

	componentDidMount(){
		const parsed = queryString.parse(this.props.location.search)
		if(parsed.rid){
			let rid = parsed.rid
			try{
				if(window && window.atob(rid) ){
					rid = window.atob(rid)
				}
			}catch(e){
				
			}
			
			this.props.saveChatFeedbackRoomId(rid)
		}
	}

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
		saveChatFeedBack: (type, data) => dispatch(saveChatFeedBack(type, data)),
		submitChatFeedback: (postData) => dispatch(submitChatFeedback(postData)),
		saveChatFeedbackRoomId: (rid) => dispatch(saveChatFeedbackRoomId(rid))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatFeedBack)