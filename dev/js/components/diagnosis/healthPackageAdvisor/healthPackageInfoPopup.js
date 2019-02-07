import React from 'react';

class InfoPopup extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    render(){
        let information_text = []
        information_text = this.props.package_information.filter(x => parseInt(x.id) == parseInt(this.props.infoTextId))
        return(
            <div>
                <div className="cancel-overlay" onClick={() => {this.props.closeInfo()}}></div>
                <div className="widget cancel-appointment-div payment-popup">
                    <div className="widget-header text-center">
                        <p className="fw-500 cancel-appointment-head">{information_text[0].information}</p>
                    </div>
                </div>
            </div>
            )
        }
    }
export default InfoPopup
