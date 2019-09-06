import React from 'react'

class ChatRefundView extends React.Component {

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
					<img className="rfnd-cls-btn" src={ASSETS_BASE_URL + '/img/icons/close.png'} />
					<div className="refund-chat-hdng">
						<p className="rfnd-mn-hdng">Are you sure?</p>
						<p className="rfnd-sub-hdng">Once you proceed further, consultation will end and refund will be initiated.</p>
					</div>
					<div className="rfnd-lst-cont">
						<p className="rfnd-lst-hdng">*Please provide your reason for refund:</p>
						<p className="rfnd-lstsub-hdng">Select reason for refund</p>
						<ul>
							<li>
								<div className="dtl-radio">
									<label className="container-radio mb-0 hpa-container-radio">Query not addressed properly
									<input type="radio" name="radio" /><span className="doc-checkmark hpa-radio hpa-radio-gender"></span>
									</label>
								</div>
							</li>
							<li>
								<div className="dtl-radio">
									<label className="container-radio mb-0 hpa-container-radio">Treatment/Prescription not provided
									<input type="radio" name="radio" /><span className="doc-checkmark hpa-radio hpa-radio-gender"></span>
									</label>
								</div>
							</li>
							<li>
								<div className="dtl-radio">
									<label className="container-radio mb-0 hpa-container-radio">Doctor takes too long to respond
									<input type="radio" name="radio" /><span className="doc-checkmark hpa-radio hpa-radio-gender"></span>
									</label>
								</div>
							</li>
							<li>
								<div className="dtl-radio">
									<label className="container-radio mb-0 hpa-container-radio">Not happy with overall service
									<input type="radio" name="radio" /><span className="doc-checkmark hpa-radio hpa-radio-gender"></span>
									</label>
								</div>
							</li>
							<li>
								<div className="dtl-radio">
									<label className="container-radio mb-0 hpa-container-radio">Others
									<input type="radio" name="radio" /><span className="doc-checkmark hpa-radio hpa-radio-gender"></span>
									</label>
								</div>
							</li>
						</ul>
					</div>
					<button className="rfnd-btn">Initiate Refund</button>
				</div>
			</React.Fragment>

		)
	}
}

export default ChatRefundView;