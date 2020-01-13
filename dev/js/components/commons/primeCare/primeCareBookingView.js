import React from 'react';
import LeftBar from '../LeftBar'
import RightBar from '../RightBar'
import ProfileHeader from '../DesktopProfileHeader'
import SnackBar from 'node-snackbar'
import GTM from '../../../helpers/gtm.js'
import PaymentForm from '../paymentForm'
import Disclaimer from '../Home/staticDisclaimer.js'

const queryString = require('query-string');

class PrimeCareBookingView extends React.Component {
    constructor(props) {
        super(props)
        this.state={
            name: '',
            phoneNumber: '',
            gender: '',
            email:'',
            profileDataFilled: true,
            paymentData: null
        }
    }

    componentDidMount(){
        if (window) {
            window.scrollTo(0, 0)
        }
    }
    proceed(){
        const parsed = queryString.parse(this.props.location.search)
        let member_profile = null
        let selectedPlan ={}
        let self = this
        selectedPlan.plan= parseInt(parsed.plan_id)
        if (this.props.USER.profiles[this.props.USER.defaultProfile]) {
            member_profile = this.props.USER.profiles[this.props.USER.defaultProfile]
        }
        if(member_profile && member_profile.isDummyUser){
            let data = this.state
            if (data.name == '' || data.gender == '' || data.phoneNumber == '' || data.email == '') {
                this.setState({ profileDataFilled: false })
                SnackBar.show({ pos: 'bottom-center', text: "Please fill the info" });
                return
            }else{
                this.setState({ profileDataFilled: true })
            }
            let profileData={}
            profileData.name = this.state.name
            profileData.phoneNumber = this.state.phoneNumber
            profileData.gender = this.state.gender
            profileData.email = this.state.email
            this.props.createProfile(profileData, (err, res) => {
                self.props.getUserProfile()
            })
            self.props.createCareBooking(selectedPlan,(resp)=>{ //proceed to payment gate way
                if(resp.payment_required){
                    // this.props.history.push(`/payment/${resp.data.orderId}?refs=care`)
                    this.processPayment(resp)
                }else{
                    this.props.history.push('/prime/success?user_plan='+resp.data.id)
                }        
            })
        }else{
            this.props.createCareBooking(selectedPlan,(resp)=>{//proceed to payment gate way
                if(resp.payment_required){
                    // this.props.history.push(`/payment/${resp.data.orderId}?refs=care`)
                    this.processPayment(resp)
                }else{
                    this.props.history.push('/prime/success?user_plan='+resp.data.id)
                    
                }        
            })
        }    
    }

    processPayment(data) {
        if (data && data.status) {
            this.setState({ paymentData: data.data }, () => {
                setTimeout(()=>{
                    if (document.getElementById('paymentForm') && Object.keys(this.state.paymentData).length > 0) {
                        let form = document.getElementById('paymentForm')
                        form.submit()
                    }
                },500)
            })
        }
    }

    inputHandler(e) {
        if (e.target.name == 'phoneNumber') {
            e.target.value.length <= 10
                ? e.target.value.length == 10
                    ? this.setState({
                        [e.target.name]: e.target.value,
                    })
                    : this.setState({
                        [e.target.name]: e.target.value
                    })
                : ''
        } else {
            this.setState({ [e.target.name]: e.target.value })
        }
    }

    render() {
        let member_profile = null
        if (this.props.USER.profiles[this.props.USER.defaultProfile]) {
            member_profile = this.props.USER.profiles[this.props.USER.defaultProfile]
        }
        let self = this
        return (
            <div className="profile-body-wrap" style={{ paddingBottom: 54 }}>
                <ProfileHeader />
                <section className="container container-top-margin">
                    <div className="row main-row parent-section-row">
                        <LeftBar />
                        <div className="col-12 center-column">
                            <div className="container-fluid">
                                <div className="widget mrng-top-12 mrb-60">
                                    <div className="widget-content mrng-top-12 care-widget">
                                        <div className="careMemberContainer">
                                            <div className="careMembrLogo">
                                                <img src={ASSETS_BASE_URL + "/img/logoornage.png"} />
                                            </div>
                                            <div className="careMembrtxt">
                                                <h5>Docprime Care </h5>
                                                <p>membership</p>
                                            </div>
                                        </div>
                                        {
                                        member_profile && member_profile.isDummyUser?
                                            <div className="widget-content">
                                                <div className="lab-visit-time d-flex jc-spaceb">
                                                    <h4 className="title d-flex"><span>
                                                        <img style={{ width: '20px', marginRight: '8px' }} src={ASSETS_BASE_URL + "/img/nw-usr.svg"} />
                                                    </span>Member Detail</h4>
                                                </div>
                                                <div className="select-pt-form">
                                                    <div className="slt-nw-input">
                                                        <label className="slt-label" htmlFor="male"><sup className="requiredAst">*</sup>Name:</label>
                                                        <input className="slt-text-input" style={{'textTransform': 'capitalize'}} autoComplete="none" type="text" name="name" value={this.state.name} onChange={this.inputHandler.bind(this)}placeholder="" />
                                                    </div>
                                                    <div className="slt-nw-input radio-mbl">
                                                        <label className="slt-label" htmlFor="male" ><sup className="requiredAst">*</sup>Gender:</label>
                                                        <div className="slt-label-radio">
                                                            <div className="dtl-radio">
                                                                <label className="container-radio">Male
                                                        <input type="radio" name="gender" name="gender" onClick={() => this.setState({ 'gender': 'm' })} />
                                                                    <span className="doc-checkmark"></span>
                                                                </label>
                                                            </div>
                                                            <div className="dtl-radio">
                                                                <label className="container-radio">Female
                                                        <input type="radio" name="gender" value="m" name="gender" onClick={() => this.setState({ 'gender': 'f' })} />
                                                                    <span className="doc-checkmark"></span>
                                                                </label>
                                                            </div>
                                                            <div className="dtl-radio">
                                                                <label className="container-radio">Other
                                                        <input type="radio" name="gender" name="gender" onClick={() => this.setState({ 'gender': 'o' })} />
                                                                    <span className="doc-checkmark"></span>
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="slt-nw-input">
                                                        <label className="slt-label" htmlFor="male"><sup className="requiredAst">*</sup>Email:</label>
                                                        <input className="slt-text-input" style={{'textTransform': 'capitalize'}} autoComplete="none" type="text" name="email" value={this.state.email} onChange={this.inputHandler.bind(this)}placeholder="" />
                                                    </div>
                                                    <div className="slt-nw-input">
                                                        <label className="slt-label" htmlFor="male"><sup className="requiredAst">*</sup>Mobile:</label>
                                                        <input className="slt-text-input" autoComplete="none" type="number" placeholder="" value={this.state.phoneNumber} onChange={this.inputHandler.bind(this)} name="phoneNumber" />
                                                    </div>
                                                </div>
                                            </div>
                                            :member_profile?
                                            <div className="row no-gutters">
                                                <div className="col-7">
                                                    <p className="carePara"><img src={ASSETS_BASE_URL + "/img/memsecur.png"} />Valid for :</p>
                                                </div>
                                                <div className="col-5 text-right">
                                                    <p className="careSUbpara">1 year</p>
                                                </div>
                                                <div className="col-7">
                                                    <p className="carePara"><img src={ASSETS_BASE_URL + "/img/memuser.png"} />Member Name :</p>
                                                </div>
                                                <div className="col-5 text-right">
                                                    <p className="careSUbpara" style={{'textTransform': 'capitalize'}}>{member_profile.name}</p>
                                                </div>
                                                <div className="col-7">
                                                    <p className="carePara"><img src={ASSETS_BASE_URL + "/img/memcall.png"} />Mobile no: </p>
                                                </div>
                                                <div className="col-5 text-right">
                                                    <p className="careSUbpara">{member_profile.phone_number}</p>
                                                </div>
                                            </div>:''
                                        }
                                        <div className="careListingWithSideline">
                                            <ul className="UlcareListingWithSide">
                                                {
                                                    this.props.data && this.props.data.length>0 && this.props.data[0].unlimited_online_consultation?
                                                        <li className="careListiLi"><p className="careListin">Free Unlimited Online Consultation </p>
                                                            <span>Our online consultation timings are from 8:00 AM to 5:00 PM</span>
                                                        </li>
                                                    :''
                                                }

                                                {
                                                    this.props.data && this.props.data.length>0 && this.props.data[0].priority_queue?
                                                        <li className="careListiLi"><p className="careListin">Priority Queue </p>
                                                            <span>No waiting time!</span>
                                                        </li>
                                                    :''
                                                }
                                                
                                                {
                                                    this.props.data && this.props.data.length>0 && this.props.data[0].features.length > 0?
                                                    Object.entries(this.props.data[0].features).map(function ([key, value]) {
                                                        if(value.count != null){
                                                            return <li key={value.id} className="careListiLi">
                                                                    <p className="careListin">{self.props.data[0].feature_details[0].name} </p>
                                                                    <span>{`Memeber can avail this offer ${value.count ==2?'twice':'once'} in a year`}</span>
                                                                     
                                                                    </li>
                                                        }   
                                                    })
                                                    :''
                                                }                                                    
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button onClick={this.proceed.bind(this)} className="p-3 v-btn v-btn-primary btn-lg fixed horizontal bottom no-round text-lg sticky-btn">Pay Now
                                <span>{this.props.data?`(₹ ${parseInt(this.props.data[0].deal_price)})`:''}</span>
                            </button>
                        </div>
                        {/*<RightBar className="col-md-5 mb-3" />*/}
                    </div>
                </section>
                <Disclaimer />
                {
                    this.state.paymentData ? <PaymentForm paymentData={this.state.paymentData} refs='care' /> : ""
                }
            </div>
        );
    }
}


export default PrimeCareBookingView
