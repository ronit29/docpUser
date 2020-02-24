import React from 'react';

import BasicDetails from './basic'
import MedialDetails from './medical'
import Loader from '../../Loader'
import WhatsAppOptinView from '../../WhatsAppOptin/WhatsAppOptinView.js'
import SnackBar from 'node-snackbar'


class EditProfile extends React.Component {
    constructor(props) {
        super(props)
        let { profiles } = this.props.USER
        let currentProfile = null
        currentProfile = {...profiles[this.props.match.params.id]}
        this.state = {
            selectedTab: 0,
            profileData: currentProfile,
            loading: false,
            openCrop: false,
            errors: {

            },
            whatsapp_optin:false,
            isEmailVerified:false,
            isEmailUpdated:false,
            isEmailError:false,
            isDobValidated:false,
            is_dob_error:false,
            add_to_gold:this.props.location.search.includes('add_to_gold=true')?true:false,
            from_booking:this.props.location.search.includes('from_booking=true')?true:false
        }
    }

    componentDidMount(){
        let currentProfile = null
        if(this.props.USER && this.props.USER.profiles && Object.keys(this.props.USER.profiles).length){
            currentProfile = {...this.props.USER.profiles[this.props.match.params.id]}
            this.setState({profileData:currentProfile,isDobValidated:currentProfile.dob?true:false,whatsapp_optin:currentProfile.whatsapp_optin})   
        }
        
    }


    toggleOpenCrop() {
        this.setState({ openCrop: !this.state.openCrop })
    }

    manageAddress() {
        this.props.history.push('/user/address')
    }

    toggleWhatsap(status,e) {
        this.setState({ whatsapp_optin: status })
    }

    getComp() {
        if (this.state.loading) {
            return <Loader />
        }
        let self = this
        let show_default_checkBox= true
        let is_profile_editable = true
        let gold_user_profile = {}
        let default_profile = {}
        if(this.props.USER && this.props.USER.profiles){
            if(Object.keys(this.props.USER.profiles).length > 0){
               Object.entries(this.props.USER.profiles).map(function([key, value]) {
                    if(show_default_checkBox && value.is_insured){
                        show_default_checkBox = false
                    }
                    if(value.is_default_user){
                        default_profile = value
                    }
                    if(self.state.profileData){
                        if(value.id == self.state.profileData.id && value.is_insured){
                            is_profile_editable = false
                        }
                    } 
                    if(value.is_vip_gold_member){
                        gold_user_profile = value
                    } 
                })
            }
        }

        switch (this.state.selectedTab) {
            case 0: {
                return <div style={{marginBottom:'60px'}}>
                            <BasicDetails {...this.props} 
                                manageAddress={this.manageAddress.bind(this)}
                                profileData={this.state.profileData} 
                                updateProfile={this.updateProfile.bind(this)} 
                                proceedUpdate={this.proceedUpdate.bind(this)} 
                                errors={this.state.errors} 
                                toggleOpenCrop={this.toggleOpenCrop.bind(this)} 
                                show_default_checkBox={show_default_checkBox} 
                                isEmailError={this.state.isEmailError} 
                                verifyEndorsementEmail={this.verifyEndorsementEmail.bind(this)}
                                is_profile_editable={is_profile_editable}
                                is_dob_error = {this.state.is_dob_error}
                                gold_user_profile = {gold_user_profile}
                                add_to_gold = {this.state.add_to_gold}
                                addToGold = {this.addToGold.bind(this)}
                                default_profile = {default_profile}
                            />
                            <WhatsAppOptinView {...this.props} 
                                toggleWhatsap={this.toggleWhatsap.bind(this)} 
                                profiles={this.state.profileData}
                            />
                        </div>

            }
            case 1: {
                return <MedialDetails />
            }
        }
    }

    addToGold(value){
        this.setState({add_to_gold:value})
    }

    updateProfile(key, value,isDobValidated) {
        this.state.profileData[key] = value
        if(key == 'dob'){
            this.setState({isDobValidated:isDobValidated})
        }
        this.setState({ profileData: this.state.profileData})
    }

    verifyEndorsementEmail(newemail,verified,is_email_changed){        
        this.state.profileData['email'] = newemail
        this.setState({ profileData: this.state.profileData })
        if(verified){
           this.setState({isEmailUpdated:verified,isEmailVerified:is_email_changed})
        }else{
            this.setState({isEmailUpdated:verified,isEmailVerified:is_email_changed})
        }
    }

    proceedUpdate(e) { // update profile
        e.stopPropagation()
        e.preventDefault()

        let errors = {}
        let vals = ['email', 'phone_number','dob']
        vals.map((field) => {
            let validated = true
            if(this.state.profileData.dob == null && !this.state.isDobValidated){
                validated = true
                errors['dob'] = !validated
                return
            }
            switch (field) {
                case "phone_number": {
                    if (!this.state.profileData[field]) {
                        validated = true
                        errors[field] = !validated
                        return
                    } else {
                        validated = this.state.profileData[field].toString().match(/^[56789]{1}[0-9]{9}$/)
                        errors[field] = !validated
                    }
                    break
                }
                case "email": {
                    // if (!this.state.profileData[field]) {
                    //     validated = false
                    //     errors[field] = !validated
                    //     return
                    // } else {
                    //     validated = this.state.profileData[field].match(/\S+@\S+\.\S+/)
                    //     errors[field] = !validated
                    // }
                    // break
                }
                default: {
                    validated = true
                    errors[field] = !validated
                    break
                }
            }
        })

        this.setState({ errors }, () => {
            let validated = true
            for (let key in this.state.errors) {
                if (this.state.errors[key]) {
                    validated = false
                }
            }
            if(!this.state.isEmailUpdated && this.state.isEmailVerified){
                this.setState({isEmailError:true})
                return
            }

            if(!this.state.isDobValidated){
                this.setState({is_dob_error:true})
                validated = false
                return
            }
            if(!this.state.profileData.gender){
                SnackBar.show({ pos: 'bottom-center', text: 'Please select gender' })
                validated = false
                return
            }
            if (validated) {
                this.setState({ loading: true })
                this.state.profileData.whatsapp_optin = this.state.whatsapp_optin == null ?true: this.state.whatsapp_optin
                this.state.profileData.add_to_gold = this.state.add_to_gold
                this.props.editUserProfile(this.state.profileData, this.state.profileData.id, (err, data) => { // update profile
                    this.setState({ loading: false })
                    if(err){
                        if(err.message){
                            setTimeout(() => {
                                SnackBar.show({ pos: 'bottom-center', text: err.message })
                            }, 500)   
                            return  
                        }
                    }
                    this.props.resetVipData()
                    if(this.state.from_booking){
                        this.props.history.go(-2)    
                    }else{
                        this.props.history.go(-1)    
                    }
                    
                    
                })
            }
        })

    }

    render() {
        return (
            <div>

                {/* <header className="skin-white fixed horizontal top bdr-1 bottom light sticky-header" style={{ zIndex: 8 }}>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-2">
                                <ul className="inline-list">
                                    <li onClick={() => {
                                        this.props.history.go(-1)
                                    }}><span className="icon icon-sm text-middle back-icon-white"><img src={ASSETS_BASE_URL + "/img/customer-icons/back-icon.png"} className="img-fluid" /></span></li>
                                </ul>
                            </div>
                            <div className="col-8">
                                <div className="header-title fw-700 capitalize text-center">Edit Profile</div>
                            </div>
                            <div className="col-2">
                            </div>
                        </div>
                    </div>
                </header> */}

                {/* <section className="consumer-profile-update sticky-header-3" style={{ zIndex: 8 }}>
                    <div className="nav-tab">
                        <ul className="inline-list tab-items">
                            <li style={{ marginLeft: 0, marginRight: 0 }} onClick={() => {
                                this.setState({ selectedTab: 0 })
                            }} className={this.state.selectedTab === 0 ? "active" : ""}><a className="link-text text-xs uppercase">Basic Profile</a></li>
                            <li style={{marginLeft: 0, marginRight: 0}} onClick={() => {
                                this.setState({ selectedTab: 1 })
                            }} className={this.state.selectedTab === 1 ? "active" : ""}><a className="link-text text-xs uppercase">Medical</a></li>
                        </ul>
                    </div>
                </section> */}

                {this.getComp()}

                {
                    this.state.openCrop ? "" : <button onClick={this.proceedUpdate.bind(this)} className="fixed p-3 horizontal bottom v-btn v-btn-primary no-round btn-lg text-center static-btn">{`${this.state.from_booking?'Continue Booking':'Update Profile'}`}</button>
                }

            </div>
        );
    }
}


export default EditProfile
