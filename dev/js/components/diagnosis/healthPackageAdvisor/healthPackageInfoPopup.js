import React from 'react';

class InfoPopup extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    render(){
        return(
            <div>
                <div className="cancel-overlay" onClick={() => {this.props.closeInfo()}}></div>
                <div className="widget cancel-appointment-div payment-popup">
                    <div className="widget-header text-center">
                        <p className="fw-500 cancel-appointment-head">{this.props.infoTextId == 1?this.props.package_information.screening:this.props.package_information.physical}</p>
                    </div>
                </div>
            </div>
            )
        }
    }
export default InfoPopup
