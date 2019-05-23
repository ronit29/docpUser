import React from 'react'
import ChatPanel from '../ChatPanel'

class IpdChatPanel extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			minimize: false,
			maximize: false
		}
	}

    closeChat() {
    	if(this.child.closeChat){
    		this.child.closeChat()
    	}
    }

	render(){

		let params = ''
		if(this.props.ipdFormParams){
			params = JSON.stringify(this.props.ipdFormParams)
			params = `product=IPD&params=${params}&source=${this.props.hospital_id?this.props.hospital_id:''}`

		}else {
			params = `product=IPD&source=${this.props.hospital_id?this.props.hospital_id:''}`
		}
	
		return(

			<div className={`ipd-chat-pop ${this.state.maximize?'ipd-chat-pop-full':this.state.minimize?'ipd-chat-pop-minimize':''}`} >
				<div className="ipd-chat-header">
					<p onClick={()=>this.setState({maximize: true, minimize: false})}>Need help in bookin doctor appointment/surgery?</p>
					<div className="cht-head-rqst-btn" >
						{
							this.state.minimize?
							<span  onClick={()=>this.closeChat()}>
								<img className="close-chat" src={ASSETS_BASE_URL +'/img/customer-icons/close-black.svg'} style={{ width: '11px',display:'block', lineHeight:'0' }} />
							</span>:
							<span  onClick={()=>this.setState({minimize: true, maximize: false})}>
								<img className="close-chat" src={ASSETS_BASE_URL +'/img/chatminimize.svg'} style={{ width: '20px' }} /> 
							</span>	
						}
						
					</div>
				</div>
				<div className="ipd-chat-render">
					<ChatPanel {...this.props} mobilechatview={true} showHalfScreenChat={true} ipdFormParams={params} onRefIpd={ref => (this.child = ref)}/>
				</div>
			</div>
			)
	}
}

export default IpdChatPanel