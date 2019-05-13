import React from 'react'

class PincodePopupError extends React.Component {
	
	render(){

		return(
			<div className="search-el-popup-overlay " onClick={()=>this.props.toggle()}>

	            <div className="search-el-popup">
	                <div className="widget pos-relative">
	                    <div className="widget-content padiing-srch-el pad-srch">
	                    <div className="cross-btn" onClick={()=>this.props.toggle()}>
	                        <img src={ASSETS_BASE_URL + "/img/icons/close.png"} alt="close" />
	                    </div>
	                    	<h4 className="alrt-head">Alert !</h4>
	                        <p className="srch-el-conent">
	                            It looks like pincode and address you have entered are not of the same location.Please change one of them to proceed</p>
	                        <div className="search-el-btn-container">
	                            <button onClick={()=>this.props.clickPopUp(1)}>Change Pincode</button>
	                            {/* <span className="src-el-btn-border"></span> */}
	                            <button onClick={()=>this.props.clickPopUp(2)}>Change Address</button>
	                        </div>
	                    </div>
	                </div>

	            </div>

	        </div>
		)
	}
}

export default PincodePopupError