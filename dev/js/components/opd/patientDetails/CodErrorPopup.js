import React from 'react'

class CodErrorPopup extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			
		}
	}

	render() {
		return (
		<div className="search-el-popup-overlay " onClick={()=>this.props.codErrorClicked()}>
			<div className="search-el-popup">
				<div className="widget">
					<div className="widget-content padiing-srch-el">
						<p className="srch-el-conent">{this.props.codMsg}</p>
						<div className="search-el-btn-container">
							<button onClick={()=>this.props.codErrorClicked()}>Okay</button>
						</div>
					</div>
				</div>

			</div>
		</div>)
	}
}

export default CodErrorPopup    