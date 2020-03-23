import React from 'react';


import LeftBar from '../commons/LeftBar'
import ProfileHeader from '../commons/DesktopProfileHeader'
import CONFIG from '../../config'
import HelmetTags from '../commons/HelmetTags'
import GTM from '../../helpers/gtm'
import STORAGE from '../../helpers/storage';
import SnackBar from 'node-snackbar'
import Disclaimer from '../commons/Home/staticDisclaimer.js'
import VipTnC from './vipTncView.js'
// import LocationElements from '../../../containers/commons/locationElements'
// import CommonSearch from '../../../containers/commons/CommonSearch.js'


class VipClub extends React.Component { // dashboard view
    constructor(props) {
        super(props)
        this.state = {
            toggleTabType: false,
            tabsValue: [],
            openMedlifeTnC: false
        }
    }

    componentDidMount() {
        let self = this
        if (window && document) {
            window.onscroll = function () {
                var scrollPosition = document.documentElement.scrollTop || document.body.scrollTop

                if (self.refs['vipHeaderBar']) {

                    if (scrollPosition > 10) {
                        self.setState({ toggleTabType: true })
                    } else {
                        self.setState({ toggleTabType: false })
                    }
                }
            }
        }
        let initialTabs = []
        this.props.data.user.plus_members.map((val, key) =>
            initialTabs.push(key)
        )
        this.setState({ tabsValue: initialTabs })
    }

    AddMemberDetails() {
        this.props.history.push('/vip-club-member-details?is_from_payment=true')
    }

    ButtonHandler(field, event) {
        let tabs = [].concat(this.state.tabsValue)
        let self = this
        let found = false
        tabs = tabs.filter((x) => {
            if (x == field) {
                found = true
                return false
            }
            return true
        })
        if (!found) {
            tabs.push(field)
        }

        self.setState({ tabsValue: tabs })
    }

    closeTncPopup() {
        this.setState({ openMedlifeTnC: false })
    }

    toggle() {
        this.setState({ openMedlifeTnC: true })
    }

    copyText(e) {
        e.preventDefault();
        var copyText = document.getElementById("myInput");
        copyText.select();
        document.execCommand("copy");
    }

    navigateTo(where, type, data, e) {
		if (e) {
			e.preventDefault()
			e.stopPropagation()
		}
		if (type) {
			this.props.selectSearchType(type)
		}
		this.props.history.push(where)
	}

    navigateToSBI(){
        window.open('http://13.235.199.36/webcore/docprimecallback', '_blank')
    }

    render() {
        let expiry_date = new Date(this.props.data.user.expire_date)
        expiry_date = expiry_date.toDateString()
        let expiryDate = expiry_date.split(" ")
        let primary_user = {}
        if (this.props.vip_club_db_data.data.user && Object.keys(this.props.vip_club_db_data.data.user).length > 0 && this.props.vip_club_db_data.data.user.plus_members && this.props.vip_club_db_data.data.user.plus_members.length > 0) {
            primary_user = this.props.vip_club_db_data.data.user.plus_members.filter((x => x.is_primary_user))[0]
        }
        let is_corporate = false
        if(!this.props.is_gold && this.props.data.plan && this.props.data.plan.length > 0){
            is_corporate = this.props.data.plan[0].is_corporate
        }

        return (
            <div className="profile-body-wrap" style={{ background: "" }}>
                <div className="d-none d-lg-block">
                    <ProfileHeader />
                </div>
                <div className= {`d-lg-none d-block ${!this.props.is_gold?'d-none':''}`}>
                    <div className="vip-new-sub-header" onClick={() => this.props.history.push('/')} >
                            <svg xmlns="http://www.w3.org/2000/svg" width="15pt" height="18pt" viewBox="0 0 25 24" version="1.1">
                                <g id="surface1">
                                    <path fill="#f78631" fill-rule="evenodd" d="M 24.566406 12.925781 C 24.296875 13.203125 23.933594 13.359375 23.554688 13.359375 C 23.175781 13.359375 22.808594 13.203125 22.542969 12.925781 L 13.070312 3.15625 C 12.761719 2.839844 12.21875 2.839844 11.910156 3.15625 L 2.441406 12.925781 C 1.878906 13.503906 0.976562 13.503906 0.414062 12.925781 C 0.148438 12.652344 -0.00390625 12.273438 -0.00390625 11.882812 C -0.00390625 11.488281 0.148438 11.113281 0.414062 10.835938 L 9.886719 1.066406 C 11.277344 -0.371094 13.699219 -0.371094 15.09375 1.066406 L 17.914062 3.972656 L 20.78125 6.929688 L 24.566406 10.835938 C 24.835938 11.113281 24.988281 11.488281 24.988281 11.882812 C 24.988281 12.273438 24.835938 12.652344 24.566406 12.925781 Z M 11.992188 5.960938 C 12.269531 5.679688 12.714844 5.679688 12.988281 5.960938 L 21.316406 14.554688 C 21.449219 14.6875 21.523438 14.875 21.523438 15.066406 L 21.523438 21.332031 C 21.523438 22.804688 20.367188 23.996094 18.941406 23.996094 L 14.820312 23.996094 L 14.820312 17.40625 L 10.164062 17.40625 L 10.164062 23.996094 L 6.039062 23.996094 C 4.613281 23.996094 3.457031 22.804688 3.457031 21.332031 L 3.457031 15.066406 C 3.457031 14.875 3.53125 14.6875 3.664062 14.554688 Z M 11.992188 5.960938 " />
                                </g>
                            </svg>
                    </div>
                </div>

                {this.props.is_gold?'':
                    <div className={`vipHeaderBar ${this.state.toggleTabType ? 'hed-curv-rmove' : ''}`} ref="vipHeaderBar">
                        <div className="vipBackIco" onClick={() => this.props.history.push('/')} style={{background:'#f78631'}}>
                            <img src={ASSETS_BASE_URL + "/img/vip-home.svg"} />
                        </div>
                            <div className={`vip-logo-cont ${this.state.toggleTabType ? 'header-scroll-change' : ''}`} ref="">
                                <img className="vipLogiImg" src={ASSETS_BASE_URL + "/img/vip-logo.png"} />
                                <p className="scrl-cont-dat">{is_corporate?"Your a Docprime VIP Member":"Save 70% on your family's medical bills"}</p>
                                    <p>Valid till {expiryDate[1] + ' ' + expiryDate[2] + ',' + ' '+ expiryDate[3]}</p>
                            </div>
                    </div>
                }
                {/* last screen design */}
                <section className= {`container container-top-margin ${this.props.is_gold?'md-top-mrgn-rmv':'sub-pdng-add'}`} style={{ marginTop: '' }}>
                    <div className="row main-row parent-section-row">
                        <LeftBar />
                        <div className="col-12 center-column">
                            <div className="container-fluid ">
                                <div className="care-new-container font-analyze">
                                    {this.props.is_gold && this.props.vip_club_db_data.data.user.plus_members && this.props.vip_club_db_data.data.user.plus_members.length > 0 && primary_user && Object.keys(primary_user).length > 0 ?
                                        <div className="gold-white-bg-container card-container" >
                                            <div className="gold-card-section">
                                                {/* <img src="assets/img/whitebg.png" alt="Gold Customer" className="shadow-img"/> */}
                                                <img className="vipLogiImg-2 pd-12" style={{ paddingBottom: 7 }} src="/assets/img/docgold.png" width="80px" />
                                                <div className="gold-card-user text-right text-white pd-12" style={{ paddingTop: 0 }}>
                                                    <h5>{primary_user.first_name} {primary_user.last_name}</h5>
                                                    <h6>(Primary)</h6>
                                                </div>
                                                <div className="membership-validity-column pd-12 text-black text-center">
                                                    <h4>Docprime Gold Member</h4>
                                                    <h6>Valid till <strong>{expiryDate[1] + ' ' + expiryDate[2] + ',' + ' ' + expiryDate[3]} </strong></h6>
                                                </div>
                                            </div>
                                        </div>
                                        : ''}
                                    {this.props.data.is_member_allowed && !is_corporate?
                                        <div className= {`${this.props.is_gold?'gold-white-bg-container mb-24':''}`} style={{ paddingTop: 0, paddingBottom: 20 }}>
                                            <div className="vip-act-pop text-right" style={{ display: 'block' }}>
                                                <div className="vip-wrn-img text-left">
                                                    <img src={ASSETS_BASE_URL + "/img/tickicon.png"} />
                                                    <div className="vip-wrn-content">
                                                        <h5>Your subscription is now active</h5>
                                                        {
                                                            this.props.vip_club_db_data.data.user.plus_members && this.props.vip_club_db_data.data.user.plus_members.length > 0 && this.props.vip_club_db_data.data.plan && this.props.vip_club_db_data.data.plan.length > 0 ?
                                                                <p> {`You can add the remaining ${this.props.vip_club_db_data.data.plan[0].total_allowed_members - this.props.vip_club_db_data.data.user.plus_members.length} members anytime until the expiry date.`}</p>

                                                                : ''
                                                        }
                                                    </div>
                                                </div>
                                                <button onClick={this.AddMemberDetails.bind(this)}>Add member</button>
                                            </div>
                                        </div>
                                        : ''
                                    }
                                    {!this.props.is_gold && this.props.data && Object.keys(this.props.data).length > 0  && is_corporate?
                                        <div>
                                                <div className="vip-acnt-heading">
                                                        <h5>VIP Benefits</h5>
                                                    </div>
                                                <div className="vip-offer-cards p-12 mb-24 pd-r-0 pd-l-0">
                                                <div className="gold-benifi-cards-cont vip-club">
                                                    <div className="gold-benifi-cards mr-b-0">
                                                        <a href="/search" onClick={(e) => {
                                                            e.preventDefault();
                                                            this.navigateTo("/search", 'opd')
                                                        }}><img src={ASSETS_BASE_URL + '/img/gl1.png'} /></a>
                                                        <p className="mr-t-5">Book <br/> Doctors</p>
                                                    </div>
                                                    <div className="gold-benifi-cards mr-b-0">
                                                    <a href="/search" onClick={(e) => {
                                                        e.preventDefault();
                                                        this.navigateTo("/search", 'lab')
                                                    }}><img src={ASSETS_BASE_URL + '/img/gl2.png'} /></a>
                                                        <p className="mr-t-5">Book Lab <br/> Test</p>
                                                    </div>
                                                    <div className="gold-benifi-cards mr-b-0">
                                                        <a target="_blank" href="https://www.medlife.com/app/?banner_url=https://media.medlife.com/PTR/docprime.jpg#/root/login/LoginLandingOld" >
                                                            <img src={ASSETS_BASE_URL + '/img/medlife-med.png'} />
                                                        </a>
                                                        <p className="mr-t-5">Order <br/> Medicines</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        : ''}
                                    {
                                        !this.props.is_gold && this.props.data.plan && this.props.data.plan.length > 0 && this.props.data.plan[0].utilize && Object.keys(this.props.data.plan[0].utilize).length > 0 ?
                                            <React.Fragment>
                                                <div className="vip-dsh-main-cont mb-3">
                                                    <div className="vip-acnt-heading">
                                                        <h5>Your Account</h5>
                                                        <span onClick={() => this.props.history.push('/user/appointments')}>View Appointments</span>
                                                    </div>
                                                    <div className="doc-onln-cnslt">
                                                        <div className="vip-cnslt-card">
                                                            <h5 className="vip-brder-hdng">In-Clinic Consultation</h5>
                                                            <ul>
                                                                <li><p>Total Limit: <span>₹{this.props.data.plan[0].utilize.doctor_consult_amount >= 99999?'Unlimited':this.props.data.plan[0].utilize.doctor_consult_amount}  </span></p></li>
                                                                <li><p>Utilized: <span>₹{this.props.data.plan[0].utilize.doctor_amount_utilized} </span></p></li>
                                                                {this.props.data.plan[0].utilize.doctor_amount_available <=99999?
                                                                    <li><p>Available: <span className="vip-crd-avl-grn">₹{this.props.data.plan[0].utilize.doctor_amount_available}</span></p></li>
                                                                :''}
                                                            </ul>
                                                        </div>
                                                        {is_corporate?
                                                            <div className="vip-cnslt-card">
                                                                <h5 className="vip-brder-hdng">Lab Tests</h5>
                                                                <ul>
                                                                    <li><p>Total Limit: <span>₹{this.props.data.plan[0].utilize.available_labtest_amount >= 99999?'Unlimited':this.props.data.plan[0].utilize.available_labtest_amount}  </span></p></li>
                                                                    <li><p>Utilized: <span>₹{this.props.data.plan[0].utilize.lab_amount_utilized} </span></p></li>
                                                                    {this.props.data.plan[0].utilize.available_labtest_amount <=99999?
                                                                        <li><p>Available: <span className="vip-crd-avl-grn">₹{this.props.data.plan[0].utilize.available_labtest_amount}</span></p></li>
                                                                    :''}
                                                                </ul>
                                                            </div>
                                                        :
                                                            <div className="vip-cnslt-card">
                                                                <h5 className="vip-brder-hdng">Docprime Care</h5>
                                                                <p className="vip-un-mem">Unlimited online consult for 8 members</p>
                                                                <p className="vip-cnsl-act"><img src={ASSETS_BASE_URL + '/img/vip-chk.svg'} />Activated </p>
                                                                {/*<div className="text-right">
                                                                    <button className="vip-crd-btn">Chat Now</button>
                                                                </div>*/}
                                                            </div>
                                                        }
                                                    </div>
                                                </div>
                                                {is_corporate?'':
                                                <div className="vip-offer-cards mb-3">
                                                    <div className="vip-sbs-crd">
                                                        <h5 className="vip-brder-hdng">Full Body Health Package</h5>
                                                        <div className="vip-sbs-crd-content">
                                                            <div className="vip-sbs-crd-lft">
                                                                <p>Includes {this.props.data.plan[0].worth.total_test_covered_in_package} Tests, can be used by {this.props.data.plan[0].worth.members_covered_in_package} members</p>
                                                            </div>
                                                            <div className="vip-sbs-crd-rgt">
                                                                <p className="rmng-pnt">{this.props.data.plan[0].utilize.available_package_count} <span>remaining </span></p>
                                                                <button className="vip-btn-sbs" onClick={() => {
                                                                    this.props.history.push('/searchpackages');

                                                                    let data = {
                                                                        'Category': 'ConsumerApp', 'Action': 'vipPackageClick', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'vip-package-click'
                                                                    }
                                                                    GTM.sendEvent({ data: data });

                                                                }}>Book Now</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>}
                                            </React.Fragment>
                                            : ''
                                    }
                                    {!this.props.is_gold && !is_corporate?
                                        <div className="vip-offer-cards mb-3">
                                            <div className="vip-sbs-crd">
                                                <h5 className="vip-brder-hdng">Tax Benefit</h5>
                                                <div className="vip-sbs-crd-content">
                                                    <div className="vip-sbs-crd-lft">
                                                        <p>Under Section 80D</p>
                                                    </div>
                                                    {/*<div className="vip-sbs-crd-rgt">
                                                    <button className="vip-btn-sbs">Download Invoice</button>
                                                </div>*/}
                                                </div>
                                            </div>
                                        </div>
                                        : ''}
                                    {this.props.is_gold && this.props.data && Object.keys(this.props.data).length > 0 ?
                                        <div className="mb-24">
                                            <div className="vip-offer-cards p-12 text-center">
                                                <p className="gold-cmplt-frst">You Saved <span>₹{this.props.data.total_vip_amount}</span> till now</p>
                                                <p className="gold-cmplt-second">Total Gold appointments till now </p>
                                                <div className="gld-cmplt-lst">
                                                    <p className="gold-cmplt-frst"><span>{this.props.data.lab_appointment_count}</span> Lab</p>
                                                    <p className="gold-cmplt-frst"><span>{this.props.data.opd_appointment_count}</span> Doctor</p>
                                                </div>
                                            </div>
                                        </div>
                                        : ''
                                    }
                                    {/* ================== gold benifits  ================== */}
                                    {this.props.is_gold && this.props.data && Object.keys(this.props.data).length > 0 ?
                                        <div className="vip-offer-cards p-12 mb-24 pd-r-0 pd-l-0">
                                            <div className="gold-benifi-cards-cont vip-club">
                                                <div className="gold-benifi-cards mr-b-0">
                                                    <a href="/search" onClick={(e) => {
                                                        e.preventDefault();
                                                        this.navigateTo("/search", 'opd')
                                                    }}><img src={ASSETS_BASE_URL + '/img/gl1.png'} /></a>
                                                    <p className="mr-t-5">Book <br/> Doctors</p>
                                                </div>
                                                <div className="gold-benifi-cards mr-b-0">
                                                <a href="/search" onClick={(e) => {
                                                    e.preventDefault();
                                                    this.navigateTo("/search", 'lab')
                                                }}><img src={ASSETS_BASE_URL + '/img/gl2.png'} /></a>
                                                    <p className="mr-t-5">Book Lab <br/> Test</p>
                                                </div>
                                                <div className="gold-benifi-cards mr-b-0">
                                                    <a target="_blank" href="https://www.medlife.com/app/?banner_url=https://media.medlife.com/PTR/docprime.jpg#/root/login/LoginLandingOld" >
                                                        <img src={ASSETS_BASE_URL + '/img/medlife-med.png'} />
                                                    </a>
                                                    <p className="mr-t-5">Order <br/> Medicines</p>
                                                </div>
                                            </div>
                                        </div>
                                        : ''}
                                    {/**vip discount dashboard**/}
                                    <div className="vip-discount-col p-12 mb-24 no-overflow">
                                        <img className="bg-circle-img" src="/assets/img/circle-bg.png" alt="circle" />
                                        <div className="offer-col">
                                            <p>Flat 23% OFF <br /> <span>on medicines</span></p>
                                            <p className="mb-12"><img src="https://cdn.docprime.com/media/diagnostic/common_package_icons/medlife_hDQxilJ.png" alt="Medlife" /></p>
                                            <a className="tc-apply pd-r-0" onClick={this.toggle.bind(this)}>T&amp;C Apply</a>
                                        </div>
                                        <div className="discount-coupan-col">
                                            <div className="coupan-col">
                                                <h4>Use coupon: <span>DOCPRIME</span></h4>
                                                <p className="d-none" onClick={this.copyText.bind(this)}>
                                                    {/* <a><img src="" alt="copy" /></a> */}
                                                    <img src="/assets/img/copy.svg" alt="copy" height="18px" />
                                                    <span>Tap to copy</span>
                                                    <input style={{ opacity: 0 }} id="myInput" type="text" value="DOCPRIME" />
                                                </p>
                                            </div>
                                            <a href="http://bit.ly/2vHLpmW" target="_blank" className="order-now">
                                                <span>Order medicine now</span>
                                                <img src="/assets/img/customer-icons/dropdown-arrow.svg"></img>
                                            </a>
                                        </div>
                                        {/* <div className="border-circle">
                                            &nbsp;
                                        </div> */}
                                    </div>
                                    {
                                        this.props.data.user && Object.keys(this.props.data.user).length > 0 && this.props.data.user.plus_members && this.props.data.user.plus_members.length > 0 ?
                                            <div className="vip-offer-cards mb-3">
                                                <div className="vip-sbs-crd">
                                                    <h5 className="vip-brder-hdng">Members</h5>
                                                    <div className="vip-accord-container">
                                                        <ul className="vip-acr-lst">
                                                            {
                                                                this.props.data.user.plus_members.map((val, key) => {
                                                                    return <li key={key}>
                                                                        <h4 onClick={this.ButtonHandler.bind(this, key)} className="vip-acrd-hdng"><span>{val.first_name} {val.last_name} <br />
                                                                            {val.relation == 'SELF' ? <b>(Primary)</b> : ''}
                                                                        </span><img className=
                                                                            {`acdn-arrow  ${this.state.tabsValue.indexOf(key) > -1 ? '' : 'acdn-arrow-up'}`} src={ASSETS_BASE_URL + '/img/customer-icons/dropdown-arrow.svg'} />
                                                                        </h4>
                                                                        <div className={`vip-sn-tbl ${this.state.tabsValue.indexOf(key) > -1 ? 'd-none' : ''}`}>
                                                                            <table className="vip-acrd-content">
                                                                                <tbody>
                                                                                    <tr>
                                                                                        <th>Relationship</th>
                                                                                        <th>Gender</th>
                                                                                        <th>DOB</th>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td>{val.relation}</td>
                                                                                        <td style={{ 'textTransform': 'capitalize' }} >{val.title == 'mr.' ? 'm' : val.gender == 'm'?'m': 'f'}</td>
                                                                                        <td>{val.dob}</td>
                                                                                    </tr>
                                                                                </tbody>
                                                                            </table>
                                                                        </div>
                                                                    </li>
                                                                })
                                                            }
                                                            {
                                                                this.props.data.is_member_allowed && !is_corporate?
                                                                    <li onClick={this.AddMemberDetails.bind(this)}>
                                                                        <h4 className="vip-acrd-add-member"><img className="vip-add-img" src={ASSETS_BASE_URL + '/img/vip-mem.svg'} />Add Members</h4>
                                                                    </li>
                                                                    : ''}
                                                        </ul>

                                                    </div>
                                                </div>
                                            </div>
                                            : ''}
                                    <div className="vip-contact mb-3">
                                        <div className="vip-sbs-crd">
                                            <h5 className="vip-brder-hdng">Contact Support</h5>
                                            <div className="vip-coct-content">
                                                <p>Need help with booking? <span>Call us at 1800-123-9419</span></p>
                                                <p>Have a query? <span>Email us at customercare@docprime.com</span></p>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                        {
                            this.props.data && this.props.data.plus_via_sbi?
                           
                                    <div className="fixed sticky-btn p-0 v-btn  btn-lg horizontal bottom no-round text-lg buttons-addcart-container ">
                                        <button className="v-btn-primary book-btn-mrgn-adjust " onClick={()=>{this.navigateToSBI()}}>
                                                    Go Back To SBIG Home
                                            </button>
                                    </div>
                                
                            :''
                        }
                        {
                        this.state.openMedlifeTnC ? <VipTnC props={this.props} toggle={this.closeTncPopup.bind(this)} is_insurance_applicable={false}/> : ""
                        }
                    </div>
                </section>
                <Disclaimer isVip={true} />
            </div>
        );
    }
}

export default VipClub