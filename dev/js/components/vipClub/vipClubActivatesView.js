import React from 'react';


import LeftBar from '../commons/LeftBar'
import ProfileHeader from '../commons/DesktopProfileHeader'
import CONFIG from '../../config'
import HelmetTags from '../commons/HelmetTags'
import GTM from '../../helpers/gtm'
import STORAGE from '../../helpers/storage';
import SnackBar from 'node-snackbar'
import Disclaimer from '../commons/Home/staticDisclaimer.js'
// import LocationElements from '../../../containers/commons/locationElements'
// import CommonSearch from '../../../containers/commons/CommonSearch.js'


class VipClub extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
           toggleTabType: false,
           tabsValue:[]
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
        let initialTabs=[]
        this.props.data.user.plus_members.map((val,key) => 
            initialTabs.push(key)
        )
        this.setState({tabsValue:initialTabs})
    }

    AddMemberDetails(){
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
    render() {
        let expiry_date = new Date(this.props.data.user.expire_date)
        expiry_date = expiry_date.toDateString()
        let expiryDate = expiry_date.split(" ")
        return (
            <div className="profile-body-wrap" style={{ background: "" }}>
                {/* <ProfileHeader /> */}
                <div className={`vipHeaderBar ${this.state.toggleTabType ? 'hed-curv-rmove' : ''}`} ref="vipHeaderBar">
                        <div className="vipBackIco" onClick={() => this.props.history.push('/')}>
                            <img src={ASSETS_BASE_URL + "/img/vip-home.svg"} />
                        </div>
                        <div className={`vip-logo-cont ${this.state.toggleTabType ? 'header-scroll-change' : ''}`} ref="">
                            <img className="vipLogiImg" src={ASSETS_BASE_URL + "/img/vip-logo.png"} />
                            <p className="scrl-cont-dat">Save 70% on your family's medical bills</p>
                            {/*<h1>in Just <span className="vip-prc-cut">₹{this.props.data.plan[0].mrp}</span> <span className="vip-main-price">₹{this.props.data.plan[0].deal_price}</span>  </h1>*/}
                                <p>Valid till {expiryDate[1] + ' ' + expiryDate[2] + ',' + ' '+ expiryDate[3]}</p>
                            {/*<p>{`${this.state.selected_plan_data.tenure} year upto ${this.state.selected_plan_data.total_allowed_members} members`}</p>*/}
                        </div>
                    </div>
                {/* last screen design */}
                <section className="container container-top-margin sub-pdng-add" style={{ marginTop: '' }}>
                    <div className="row main-row parent-section-row">
                        <LeftBar />
                        <div className="col-12 center-column">
                            <div className="container-fluid ">
                                <div className="care-new-container font-analyze">
                                    {this.props.data.is_member_allowed?
                                        <div className="vip-act-pop mb-3">
                                            <div className="vip-wrn-img">
                                                <img src={ASSETS_BASE_URL + "/img/vip-warning.svg"} />
                                                <div className="vip-wrn-content">
                                                    <h5>Activate your subscription now</h5>
                                                    {
                                                        this.props.vip_club_db_data.data.user.plus_members && this.props.vip_club_db_data.data.user.plus_members.length > 0 && this.props.vip_club_db_data.data.plan && this.props.vip_club_db_data.data.plan.length > 0?
                                                        <p> {`Add remaining ${this.props.vip_club_db_data.data.plan[0].total_allowed_members - this.props.vip_club_db_data.data.user.plus_members.length} members details to activate your subscription`}</p>

                                                        :''
                                                    }
                                                </div>
                                            </div>
                                                <button onClick={this.AddMemberDetails.bind(this)}>Click here</button>
                                        </div>
                                    :''
                                    }
                                    {
                                        this.props.data.plan && this.props.data.plan.length > 0 && this.props.data.plan[0].utilize && Object.keys(this.props.data.plan[0].utilize).length > 0 ?
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
                                                                <li><p>Total Limit: <span>₹{this.props.data.plan[0].utilize.doctor_consult_amount}  </span></p></li>
                                                                <li><p>Utilized: <span>₹{this.props.data.plan[0].utilize.doctor_amount_utilized} </span></p></li>
                                                                <li><p>Available: <span className="vip-crd-avl-grn">₹{this.props.data.plan[0].utilize.doctor_amount_available}</span></p></li>
                                                            </ul>
                                                        </div>
                                                        <div className="vip-cnslt-card">
                                                            <h5 className="vip-brder-hdng">Docprime Care</h5>
                                                            <p className="vip-un-mem">Unlimited online consult for 8 members</p>
                                                            <p className="vip-cnsl-act"><img src={ASSETS_BASE_URL + '/img/vip-chk.svg'} />Activated </p>
                                                            {/*<div className="text-right">
                                                                <button className="vip-crd-btn">Chat Now</button>
                                                            </div>*/}
                                                        </div>
                                                    </div>
                                                </div>
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
                                                </div>
                                            </React.Fragment>
                                        :''
                                    }
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
                                    {
                                        this.props.data.user && Object.keys(this.props.data.user).length >0 && this.props.data.user.plus_members && this.props.data.user.plus_members.length > 0?
                                            <div className="vip-offer-cards mb-3">
                                                <div className="vip-sbs-crd">
                                                    <h5 className="vip-brder-hdng">Members</h5>
                                                    <div className="vip-accord-container">
                                                        <ul className="vip-acr-lst">
                                                            {
                                                                this.props.data.user.plus_members.map((val,key) => {
                                                                    return <li key={key}>
                                                                        <h4 onClick={this.ButtonHandler.bind(this,key)} className="vip-acrd-hdng"><span>{val.first_name} {val.last_name} <br />
                                                                            {val.relation == 'SELF'?<b>(Primary)</b>:''}
                                                                            </span><img className=
                                                                            {`acdn-arrow  ${this.state.tabsValue.indexOf(key)>-1?'':'acdn-arrow-up'}`} src={ASSETS_BASE_URL + '/img/customer-icons/dropdown-arrow.svg'} />
                                                                        </h4>
                                                                        <div className={`vip-sn-tbl ${this.state.tabsValue.indexOf(key)>-1?'d-none':''}`}>
                                                                            <table className="vip-acrd-content">
                                                                                <tbody>
                                                                                <tr>
                                                                                        <th>Relationship</th>
                                                                                        <th>Gender</th>
                                                                                        <th>DOB</th>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>{val.relation}</td>
                                                                                    <td style={{ 'textTransform': 'capitalize' }} >{val.title == 'mr.'?'m':'f'}</td>
                                                                                    <td>{val.dob}</td>
                                                                                </tr>
                                                                                </tbody>
                                                                            </table>
                                                                        </div>
                                                                    </li>
                                                                })
                                                            }
                                                            {
                                                                this.props.data.is_member_allowed?
                                                                <li onClick={this.AddMemberDetails.bind(this)}>
                                                                    <h4 className="vip-acrd-add-member"><img className="vip-add-img" src={ASSETS_BASE_URL + '/img/vip-mem.svg'} />Add Members</h4>
                                                                </li>
                                                            :''}
                                                        </ul>

                                                    </div>
                                                </div>
                                            </div>
                                    :''}
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
                    </div>
                </section>
                <Disclaimer isVip={true}/>
            </div>
        );
    }
}

export default VipClub