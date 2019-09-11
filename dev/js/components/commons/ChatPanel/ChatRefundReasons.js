import React from 'react'

class ChatRefundView extends React.Component {

	constructor(props){
		super(props)
		this.state = {
			refundReason:'',
			showError: false
		}
	}

	selectReason(reason){
		this.setState({refundReason: reason, showError: false})
	}

	submit(){
		if(!this.state.refundReason){
			this.setState({showError: true})
		}else{
			this.props.submitRefund(this.state.refundReason)
		}
	}

	render() {

		return (
			<React.Fragment>
				<div className="cancel-overlay cancel-overlay-zindex" onClick={(e) => {
					e.preventDefault()
					e.stopPropagation()
					this.props.toggleRefund()
				}}>

				</div>
				<div className="widget cancel-appointment-div cancel-popup overflow-hidden refund-pop font-analyze " style={{padding:'12px'}}>
					<img className="rfnd-cls-btn" src={ASSETS_BASE_URL + '/img/icons/close.png'} onClick={(e) => {
						e.preventDefault()
						e.stopPropagation()
						this.props.toggleRefund()
					}}/>
					<div className="refund-chat-hdng">
						<p className="rfnd-mn-hdng">Are you sure?</p>
						<p className="rfnd-sub-hdng">Once you proceed further, consultation will end and refund will be initiated.</p>
					</div>
					<div className="rfnd-lst-cont">
						<p className="rfnd-lst-hdng">*Please provide your reason for refund:</p>
						{
							this.state.showError && <p className="rfnd-lstsub-hdng">Select reason for refund</p>
						}
						<ul>
							<li>
								<div className="dtl-radio">
									<label className="container-radio mb-0 hpa-container-radio">Query not addressed properly
									<input type="radio" name="radio" onChange={()=>this.selectReason('Query not addressed properly')} /><span className="doc-checkmark hpa-radio hpa-radio-gender" ></span>
									</label>
								</div>
							</li>
							<li>
								<div className="dtl-radio">
									<label className="container-radio mb-0 hpa-container-radio">Treatment/Prescription not provided
									<input type="radio" name="radio" onChange={()=>this.selectReason('Treatment/Prescription not provided')} /><span className="doc-checkmark hpa-radio hpa-radio-gender" ></span>
									</label>
								</div>
							</li>
							<li>
								<div className="dtl-radio">
									<label className="container-radio mb-0 hpa-container-radio">Doctor takes too long to respond
									<input type="radio" name="radio" onChange={()=>this.selectReason('Doctor takes too long to respond')} /><span className="doc-checkmark hpa-radio hpa-radio-gender"></span>
									</label>
								</div>
							</li>
							<li>
								<div className="dtl-radio">
									<label className="container-radio mb-0 hpa-container-radio">Not happy with overall service
									<input type="radio" name="radio" onChange={()=>this.selectReason('Not happy with overall service')} /><span className="doc-checkmark hpa-radio hpa-radio-gender"></span>
									</label>
								</div>
							</li>
							<li>
								<div className="dtl-radio">
									<label className="container-radio mb-0 hpa-container-radio">Others
									<input type="radio" name="radio" onChange={()=>{
										this.selectReason('Others')}}/><span className="doc-checkmark hpa-radio hpa-radio-gender"></span>
									</label>
								</div>
							</li>
						</ul>
					</div>
					<button className="rfnd-btn" onClick={()=>this.submit()}>Initiate Refund</button>
				</div>
			</React.Fragment>

		)
	}
}

export default ChatRefundView;