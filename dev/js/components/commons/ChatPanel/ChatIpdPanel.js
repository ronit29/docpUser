import React from 'react'
import ChatPanel from '../ChatPanel'

class IpdChatPanel extends React.Component {

	render(){

		let params = ''
		if(this.props.ipd_form){
			params = JSON.stringify(this.state)
			params = `product=IPD&params=${params}&source=${this.props.hospital_id?this.props.hospital_id:''}`

		}else {
			params = `product=IPD&source=${this.props.hospital_id?this.props.hospital_id:''}`
		}
	
		return(

			<div className="ipd-chat-render">
				<ChatPanel {...this.props} mobilechatview={true} showHalfScreenChat={true} ipdFormParams={params}/>
			</div>
			)
	}
}

export default IpdChatPanel