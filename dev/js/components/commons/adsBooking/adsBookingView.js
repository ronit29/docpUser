import React from 'react'
import ProfileHeader from '../../commons/DesktopProfileHeader'
import ChatPanel from '../../commons/ChatPanel'
import SnackBar from 'node-snackbar'

class AdsBookingView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            gender: '',
            name: '',
            message: '',
            phonenumber: '',
            bookingsGA:false
        }
    }
    handleChange(feild, event) {
        let gender_value = event.target.value
        this.setState({ [event.target.getAttribute('data-param')]: event.target.value })
    }

    handleSubmit() {
        let member_data = {}
        if(this.state.gender != '' && this.state.name != '' && this.state.message != '' && this.state.phonenumber != ''){
            if(this.state.phonenumber.length < 10){
               SnackBar.show({ pos: 'bottom-center', text: "Enter Valid phone number" }); 
            }else{
                member_data.gender = this.state.gender
                member_data.name = this.state.name
                member_data.message = this.state.message
                member_data.phone_number = this.state.phonenumber
                this.props.userCreate(member_data,(resp)=>{
                    if(resp.status){
                        this.props.history.push('/mobileviewchat?botagent=true&force_start=true');
                        let data = {
                            'Category': 'Chat', 'Action': 'getHelpBtnClick', 'CustomerID': GTM.getUserId(), 'leadid': 0, 'event': 'chat-button-clicked-leadform', "url": window.location.pathname
                        }
                        GTM.sendEvent({ data: data })    
                    }
                })
            }
        }else{
            SnackBar.show({ pos: 'bottom-center', text: "All fields are manadtory" });
        }
    }
    handlekey(event){
        if(this.state.phonenumber.length == 10){
            event.preventDefault();
        }
    }
    render() {
        return <div>
            <div className="profile-body-wrap">
                <ProfileHeader />

                <section className="container container-top-margin">
                    <div className="row main-row parent-section-row">
                        <div className="col-12 col-md-7 col-lg-7 ins-main-padding">
                            <div className="wedget mb-3">
                                <div className="ins-card-head">
                                    <div className="ins-name-head">
                                        <p className="m-0">
                                            Get exclusive discounts on best medical services near you 
                                        </p>
                                    </div>

                                </div>
                            </div>
                            <section className="section-margin-bottom">
                                <div className="widget">
                                    <div className="insurance-member-container">
                                        <div className="insurance-member-details">
                                            <h4>Let us know what you are looking for?</h4>
                                            <div className="fkd-textarea">
                                                <textarea placeholder="" value={this.state.message} data-param="message" onChange={this.handleChange.bind(this, 'message')}>
                                                </textarea>
                                            </div>
                                            <h3 className="tell-hedng">Tell us about yourself</h3>
                                            <div className="row no-gutters">
                                                <div className="col-12">
                                                    <div className="ins-form-radio">
                                                        <div className="dtl-radio">
                                                            <label className="container-radio">
                                                                Male
                                                              <input type="radio" name="gender" value='m' data-param='gender' checked={this.state.gender === 'm'} onChange={this.handleChange.bind(this, 'm')} />
                                                                <span className="doc-checkmark"></span>
                                                            </label>
                                                        </div>
                                                        <div className="dtl-radio">
                                                            <label className="container-radio">
                                                                Female
                                                              <input type="radio" name="gender" value='f' data-param='gender' checked={this.state.gender === 'f'} onChange={this.handleChange.bind(this, 'f')} />
                                                                <span className="doc-checkmark"></span>
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-12">
                                                    <div className="ins-form-group inp-margin-right ">
                                                        <input type="text" id="name" className="form-control ins-form-control" data-param="name" required autoComplete="off" onChange={this.handleChange.bind(this, 'name')} value={this.state.name} />
                                                        <label className="form-control-placeholder" htmlFor="name">Name</label>
                                                        <img className="ins-input-img" style={{ width: '19px' }} src={ASSETS_BASE_URL + "/img/ins-usr.svg"} />
                                                    </div>
                                                </div>
                                                <div className="col-12">
                                                    <div className="ins-form-group">
                                                        <input type="number" id="number" className="form-control ins-form-control" required autoComplete="off" data-param="phonenumber" onChange={this.handleChange.bind(this, 'phonenumber')} value={this.state.phonenumber} onKeyPress={this.handlekey.bind(this)}/>
                                                        <label className="form-control-placeholder" htmlFor="number">Phone Number</label>
                                                        <span className="number-nine">+91</span>
                                                    </div>
                                                </div>
                                                <div className="text-center col-12">
                                                    <button className="adsBookingBtn" onClick={this.handleSubmit.bind(this)}>Submit
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                        <div className="col-md-5 mb-3" onClick={this.handleSubmit.bind(this)}>
                            <ChatPanel newChatBtnAds={true} />
                        </div>
                    </div>
                </section>
            </div>
        </div>
    }
}

export default AdsBookingView