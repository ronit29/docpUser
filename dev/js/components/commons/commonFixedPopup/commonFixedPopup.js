import React from 'react'


class CommonPopup extends React.PureComponent {

	render(){

		return(
			<React.Fragment>
				<div className="cancel-overlay cancel-overlay-zindex" onClick={()=>this.props.cancelOverlay(1)}></div>
                <div className="widget cancel-appointment-div cancel-popup">
                    {/* <div className="widget-header action-screen-header pop-padding">
                        <p className="fw-500 cancel-appointment-head"></p>
                    </div>
                    <div className="terms-condition-div onscreen-scroll">
                    </div> */}
                    {
	            		this.props.children
	            	}
            	</div>
	        </React.Fragment>
			)
	}
}

export default CommonPopup