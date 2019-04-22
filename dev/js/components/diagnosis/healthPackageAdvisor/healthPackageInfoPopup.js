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
               <div className="widget cancel-appointment-div cancel-popup">
                  <div className="widget-header text-center action-screen-header">
                     <p className="fw-500 cancel-appointment-head">{information_text[0].info_title}</p>
                     <img src={ASSETS_BASE_URL + "/img/icons/close.png"} className="close-modal" onClick={() => {this.props.closeInfo()}} />
                     <hr/>
                  </div>
                  <div className="cancel-policy-text" style={{paddingTop: 0}}>
                     {information_text[0].information}
                  </div>
               </div>
            </div>
            )
        }
    }
export default InfoPopup
