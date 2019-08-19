import React from 'react';

class NonBookableDoctor extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            
        }
    }
    render(){
    	return (
    		<div className="search-el-popup-overlay  cancel-overlay-zindex">
			<div className="search-el-popup">
				<div className="widget">
					<div className="widget-content padiing-srch-el">
						<p className="srch-el-conent">Do you wish to continue?</p>
						<div className="search-el-btn-container">
						</div>
					</div>
				</div>

			</div>
		</div>
    		)
    }
}

export default NonBookableDoctor