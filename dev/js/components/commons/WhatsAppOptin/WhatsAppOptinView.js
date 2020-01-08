import React from 'react';
import SnackBar from 'node-snackbar'
import GTM from '../../../helpers/gtm.js'

class WhatsAppOptinView extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            whatsapp_optin_View:true
        }
    }

    shouldRender(){
        if(this.props.profiles){
            if (this.props.profiles.whatsapp_optin !=null){
                if(this.props.isAppointment && !this.props.profiles.whatsapp_optin && !this.props.profiles.whatsapp_is_declined){
                    return true
                }else{
                    return false
                }
            }else{
                return true
            }
        }else if(this.props.isUserProfile){
            return true
        }else{
            return false
        }    
    }

    toggleWhatsap(status,e) {       
        if(this.props.isAppointment){      
            let profileData = {...this.props.profiles}
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
                let data = {
                'Category': 'ConsumerApp', 'Action': 'Whatsaptoggled', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'Whatsap-toggled'
                }
                GTM.sendEvent({ data: data })
                this.props.toggleWhatsap(status)            
            })
        }    
    }

    render() {

        if (!this.shouldRender())
            return (<div></div>)

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
                                <label className="ck-bx" style={{ fontWeight: '600', fontSize: '14px' }}>Enable <span className="sm-wtsp-img"><img src={ASSETS_BASE_URL + "/img/wa-logo-sm.png"} />WhatsApp</span> notification<input type="checkbox" onChange={this.toggleWhatsap.bind(this,!this.state.whatsapp_optin_View)} checked={this.state.whatsapp_optin_View} /><span className="checkmark"></span></label>
                            </div>
                        </div>
                </div>
            }
            </div>
        );
    }
}


export default WhatsAppOptinView
