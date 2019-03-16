import React from 'react';
import LeftBar from '../LeftBar'
import RightBar from '../RightBar'
import ProfileHeader from '../DesktopProfileHeader'
import Footer from '../Home/footer'
import SnackBar from 'node-snackbar'
import GTM from '../../../helpers/gtm.js'

const queryString = require('query-string');

class PrimeCareBookingView extends React.Component {
    constructor(props) {
        super(props)
        this.state={
            name: '',
            phoneNumber: '',
            gender: '',
            email:'',
            profileDataFilled: true
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
            let self = this
            let profileData={}
            profileData.name = this.state.name
            profileData.phoneNumber = this.state.phoneNumber
            profileData.gender = this.state.gender
            profileData.email = this.state.email
            this.props.createProfile(profileData, (err, res) => {
                self.props.getUserProfile()
            })
            setTimeout(() => {
                    this.props.history.push('/prime/success')
            }, 100)
        }else{

            this.props.createCareBooking(selectedPlan,(resp)=>{
                console.log(resp)
            })
            // this.props.history.push('/prime/success')
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
                        <div className="col-12 col-md-7 col-lg-7 center-column">
                            <div className="container-fluid">
                                <div className="widget mr-60">
                                    <div className="widget-content mrng-top-12">
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
                                                            <span>Anytime, Anywhere!</span>
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
                                                                        <p className="careListin">{self.props.data[0].feature_details[value.id].name} </p>
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
                        </div>
                        <RightBar className="col-md-5 mb-3" />
                    </div>
                </section>
                <button onClick={this.proceed.bind(this)} className="p-3 v-btn v-btn-primary btn-lg fixed horizontal bottom no-round text-lg sticky-btn">Pay Now</button>
                <Footer />
            </div>
        );
    }
}


export default PrimeCareBookingView
