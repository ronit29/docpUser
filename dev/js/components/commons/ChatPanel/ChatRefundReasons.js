import React from 'react'

class ChatRefundView extends React.Component {

	render(){

		return(
			<div className="search-el-popup-overlay cancel-overlay-zindex" onClick={(e) => {
				e.preventDefault()
				e.stopPropagation()
				this.props.toggleRefund()
			}}>

			</div>
			)
	}
}

export default ChatRefundView;