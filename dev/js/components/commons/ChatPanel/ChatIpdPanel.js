import React from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router'
import ChatPanel from '../ChatPanel'
import {  ipdChatView } from '../../../actions/index.js'

class IpdChatPanel extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			minimize: this.props.ipd_chat?
				this.props.ipd_chat.showMinimize?false:this.props.ipd_chat.showIpdChat?true:false:false,
			maximize: false
		}
		
		if(this.props.ipd_chat && this.props.ipd_chat.showMinimize){
			let ipdView = {...this.props.ipd_chat}
			ipdView.showMinimize= false
			this.props.ipdChatView(ipdView)	
		}
	}

    closeChat() {
    	this.props.ipdChatView(null)
    	if(this.child.closeChat){
    		this.child.closeChat()
    	}
    }

    componentWillReceiveProps(props) {
    	if(props.ipd_chat != this.props.ipd_chat) {
    		this.setState({minimize: props.ipd_chat?
    			props.ipd_chat.showMinimize?false:props.ipd_chat.showIpdChat?true:false
    			:true})
    	}
    }

	render(){
	
		return(

			<section className={`${this.props.ipd_chat?`ipd-chat-pop ${this.props.bookingPage && !this.state.maximize?'ipd-chat-btn-width':''} ${this.state.maximize?'ipd-chat-pop-full':this.state.minimize?'ipd-chat-pop-minimize':''}`:'d-none'} `} >
				<div className="ipd-chat-header">
					<p onClick={()=>this.setState({maximize: true, minimize: false})}>{this.props.bookingPage?'Need help?':'Need help in booking doctor appointment/surgery?'}</p>
					<div className="cht-head-rqst-btn" >
						{
							this.state.minimize?
							<span  onClick={()=>this.closeChat()}>
								<img className="close-chat" src={ASSETS_BASE_URL +'/img/customer-icons/close-black.svg'} style={{ width: '13px',display:'block', lineHeight:'0' }} />
							</span>:
							<span  onClick={()=>this.setState({minimize: true, maximize: false})}>
								<img className="close-chat" src={ASSETS_BASE_URL +'/img/chatminimize.svg'} style={{ width: '20px' }} /> 
							</span>	
						}
						
					</div>
				</div>
				<div className="ipd-chat-render">
					<ChatPanel {...this.props} mobilechatview={true} showHalfScreenChat={true} onRefIpd={ref => (this.child = ref)}/>
				</div>
			</section>
			)
	}
}

const mapStateToProps = (state, passedProps = {}) => {
    const {
    	ipd_chat
    } = state.USER

    return {
        ipd_chat
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
    	ipdChatView: (data) => dispatch(ipdChatView(data))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(IpdChatPanel))
