import React from 'react';
import SnackBar from 'node-snackbar'

class WhatsAppOptinView extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            whatsapp_optin_View:true
        }
    }

    toggleWhatsap(status,e) {       
        if(this.props.isAppointment){      
            let profileData = {...this.props.profile}
            if(status){
                profileData.whatsapp_optin = true
                SnackBar.show({ pos: 'bottom-center', text: "You whatsApp notifications has been enabled."})   
            }else{
                profileData.whatsapp_is_declined = true
                SnackBar.show({ pos: 'bottom-center', text: "your whatsApp notifications has been disabled."})
            }
            this.props.editUserProfile(profileData, profileData.id ,()=>{
                document.getElementsByClassName('whatsappCardContainer')[0].classList.add('d-none')
            })
        }else{
            this.setState({ whatsapp_optin_View: status },() =>{
                this.props.toggleWhatsap(status)            
            })
        }    
    }

    render() {
        return (
            <div>
            {this.props.isAppointment?
                <div className="whatsappCardContainer">
                    <div className="wa-logo-content">
                        <div className="wa-container">
                            <img src={ASSETS_BASE_URL + "/img/wa-logo.svg"} />
                        </div>
                        <p>Docprime would like to send you updates through whatsapp</p>
                    </div>
                    <div className="allowDeclineContainer">
                        <p className="allowBtns" onClick={this.toggleWhatsap.bind(this,true)}>Allow</p>
                        <p className="declineBtns" style={{color:'#757575'}}onClick={this.toggleWhatsap.bind(this,false)}>Decline</p>
                    </div>
                </div>
                :<div className="widget mrb-15">
                        <div className="widget-content">
                            <div>
                                <label className="ck-bx" style={{ fontWeight: '600', fontSize: '14px' }}>Enable <span className="sm-wtsp-img"><img src={ASSETS_BASE_URL + "/img/wa-logo-sm.png"} />WhatsApp</span> notification<input type="checkbox" onClick={this.toggleWhatsap.bind(this,!this.state.whatsapp_optin_View)} checked={this.state.whatsapp_optin_View} /><span className="checkmark"></span></label>
                            </div>
                        </div>
                </div>
            }
            </div>
        );
    }
}


export default WhatsAppOptinView
