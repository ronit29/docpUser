import React from 'react';
import LeftBar from '../LeftBar'
import RightBar from '../RightBar'
import ProfileHeader from '../DesktopProfileHeader'
import Loader from '../../commons/Loader'
import InfoPopup from './careInfoPopup.js'
import GTM from '../../../helpers/gtm.js'
import STORAGE from '../../../helpers/storage'
import CareLoginPopup from './careLoginPopup.js'

class PrimeCareView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showInfo: false,
            infoData: '',
            showLoginPopup: false,
            selectedPlanId: ''
        }
    }

    buyNow(plan_id) {
        let url = '/prime/booking?plan_id=' + plan_id
        if (!STORAGE.checkAuth()) {
            // this.props.history.replace(`/login?callback=`+url)
            this.setState({ 'selectedPlanId': plan_id, 'showLoginPopup': true })
        } else {
            this.props.getIsCareDetails((resp) => { // get user subscription plan details
                if (resp && resp.has_active_plan) {
                    this.props.history.push('/prime/success?user_plan=' + resp.user_plan_id)
                } else {
                    this.props.history.push(url)
                }
            })
        }
    }

    closeInfo() {
        this.setState({ infoData: '', showInfo: false })
    }

    hideLoginPopup() {
        this.setState({ showLoginPopup: false })
    }

    testInfo(test) {
        let lat = 28.644800
        let long = 77.216721
        if (this.props.selectedLocation !== null) {
            lat = this.props.selectedLocation.geometry.location.lat
            long = this.props.selectedLocation.geometry.location.lng

            if (typeof lat === 'function') lat = lat()
            if (typeof long === 'function') long = long()
        }
        let selected_test_ids = []
        // this.props.data.map((row, i) => {
        //     selected_test_ids.push(row.id)
        // })

        if (test.is_package && test.url && test.url != '') {
            this.props.history.push('/' + test.url + '?test_ids=' + test.id + '&selected_test_ids=' + selected_test_ids + '&lat=' + lat + '&long=' + long)
        } else if (test.is_package) {
            this.props.history.push('/search/testinfo?test_ids=' + test.id + '&selected_test_ids=' + selected_test_ids + '&lat=' + lat + '&long=' + long)
        }

        // this.setState({infoData:data,showInfo:true})
    }

    navigateTo(where, type, data, e) {
        if (e) {
            e.preventDefault()
            e.stopPropagation()
        }
        if (type) {
            this.props.selectSearchType(type)
        }
        if (where == '/chat') {
            this.props.history.push(where, data)
        } else {
            this.props.history.push(where)
        }
    }

    render() {
        if (this.props.data && Object.keys(this.props.data).length > 0) {
            let self = this
            return (
                <React.Fragment>
                    <ProfileHeader homePage={true} showSearch={true} />
                                        <div className="profile-body-wrap care-new-backgroud">
                        {/* <ProfileHeader /> */}
                        {/* <div className="careHeaderBar">
                        <div className="container">
                            <div className="care-logo-container">
                                <div>
                                <img className="careBackIco" src={ASSETS_BASE_URL + "/img/careleft-arrow.svg"} onClick={() => this.props.history.push('/')} />
                                </div>
                                <img className="careLogiImg" src={ASSETS_BASE_URL + "/img/logo-care-white.png"} />
                            </div>
                        </div>
                    </div>
                    <div className="careSubHeader">
                        <img className="careSubImg" src={ASSETS_BASE_URL + "/img/shape.png"} />
                        <div className="container">
                            <div className="careTextContSc">
                                <img className="caresubTxt" src={ASSETS_BASE_URL + "/img/careText.png"} />
                            </div>
                        </div>
                    </div> */}

                        <section className="chat-main-container" style={{ marginTop: '' }}>
                            <div className="row main-row parent-section-row">
                                <LeftBar />
                                <div className="col-12 center-column">
                                    <div className="container-fluid">
                                        {/*<div className="careMainContainer mrb-15">
                                        <div className="row no-gutters">
                                            {
                                                this.props.data && this.props.data.plans && this.props.data.plans.length > 0 ?
                                                    Object.entries(this.props.data.plans).map(function ([key, value]) {
                                                        return (<div className="col-4" key={key}>
                                                            <p className="carePlans">{value.name}</p>
                                                            <div className="careComparePanel">
                                                                <p className="carePlanPrice">₹ {parseInt(value.deal_price)}/Yr</p>
                                                                <p className="carePlanPriceCut">₹ {parseInt(value.mrp)}/Yr</p>
                                                                <div className="btn-bgwhite"><button onClick={self.buyNow.bind(self, value.id)}>Buy Now</button></div>
                                                            </div>
                                                        </div>)
                                                    })
                                                    : ''
                                            }
                                        </div>
                                        <div className="careCheckContainers">
                                            <h4 className="carechkHeading">Free Unlimited Online Consultation </h4>
                                            <p className="carechksubHeading">Anytime, Anywhere!</p>
                                            <div className="checkCrdcont">
                                                <div className="checkCrdimgcont no-gutters row">
                                                    {
                                                        Object.entries(this.props.data.plans).map(function ([key, value]) {
                                                            return (
                                                                value.unlimited_online_consultation ?
                                                                    <div className="col-4" key={key}> <img className="checkcrdImg" src={ASSETS_BASE_URL + "/img/checkedgreen.svg"} /></div> :
                                                                    <div className="col-4" key={key}> <img className="crosscheckcrdImg" src={ASSETS_BASE_URL + "/img/wrongcopy.svg"} /></div>

                                                            )
                                                        })
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                        <div className="careCheckContainers">
                                            <h4 className="carechkHeading">Priority Queue </h4>
                                            <p className="carechksubHeading">No waiting time!</p>
                                            <div className="checkCrdcont">
                                                <div className="checkCrdimgcont no-gutters row">
                                                    {
                                                        Object.entries(this.props.data.plans).map(function ([key, value]) {
                                                            return (
                                                                value.priority_queue ?
                                                                    <div className="col-4" key={key}> <img className="checkcrdImg" src={ASSETS_BASE_URL + "/img/checkedgreen.svg"} /></div> :
                                                                    <div className="col-4" key={key}> <img className="crosscheckcrdImg" src={ASSETS_BASE_URL + "/img/wrongcopy.svg"} /></div>

                                                            )
                                                        })
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                        {
                                            Object.entries(this.props.feature_data).map(function ([key, value]) {
                                                let feature_detail = self.props.data.feature_details.filter(x => x.id == key)
                                                return (<div className="careCheckContainers" key={key}>
                                                    <h4 className="carechkHeading">{feature_detail[0].name} {feature_detail[0].test.show_details ?
                                                        <span style={{ marginTop: '4px', display: 'inline-block', cursor: 'pointer' }} onClick={self.testInfo.bind(self, feature_detail[0].test)}>
                                                            <img src="https://cdn.docprime.com/cp/assets/img/icons/info.svg" />
                                                        </span> : ''}
                                                    </h4>
                                                    <div className="checkCrdcont">
                                                        <div className="checkCrdimgcont no-gutters row" style={{ borderBottom: 'none' }}>
                                                            {Object.entries(value).map(function ([k, val]) {
                                                                return (<div className="col-4" key={k}>
                                                                    {val.count ?
                                                                        <div> <span className="careTestYear"> {`${val.count} Test/Yr`}</span></div>
                                                                        : <div> <img className="crosscheckcrdImg" src={ASSETS_BASE_URL + "/img/wrongcopy.svg"} /></div>
                                                                    }
                                                                </div>)
                                                            })}
                                                        </div>
                                                    </div>
                                                </div>)
                                            })
                                        }
                                    </div>
                                    */}
                                        {/* {
                                            this.props.data && this.props.data.plans && this.props.data.plans.length > 0 ?
                                                <div className="care-new-container">
                                                    <h1 className="care-nw-heading">Choose a plan that’s right for your loved ones.</h1>
                                                    {Object.entries(this.props.data.plans).map(function ([key, value]) {
                                                        return <div className="widget mrb-15" key={key}>
                                                            <div className="widget-content">
                                                                <div className="care-card-catg">
                                                                    <div className="row no-gutters d-flex align-items-center">
                                                                        <div className="col-4">
                                                                            <img className="care-prd-icon" src={value.icon} />
                                                                        </div>
                                                                        <div className="col-8">
                                                                            <p className="care-price-cd">₹ {parseInt(value.deal_price)}/Yr
                                                                                <span>₹ {parseInt(value.mrp)}/Yr</span>
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="row no-gutters">
                                                                    <div className="col-9">
                                                                        <div className="care-dtls-list">
                                                                            <div>
                                                                                {
                                                                                    value.unlimited_online_consultation ?
                                                                                        <img className="care-prd-icon" src={ASSETS_BASE_URL + '/img/carechk.svg'} /> : ''
                                                                                }
                                                                                <p>Free Unlimited Online Consultation <span className="gp-spn">(General Physician)</span>
                                                                                </p>
                                                                            </div>
                                                                            <div>
                                                                                {value.priority_queue ?
                                                                                    <img className="care-prd-icon" src={ASSETS_BASE_URL + '/img/carechk.svg'} />
                                                                                    : ''
                                                                                }
                                                                                <p>Priority Queue</p>
                                                                            </div>
                                                                            {Object.entries(value.features).map(function ([k, v]) {
                                                                                let feature_detail = self.props.data.feature_details.filter(x => x.id == v.id)
                                                                                return v.count ?
                                                                                    <div key={k}>
                                                                                        <img className="care-prd-icon" src={ASSETS_BASE_URL + '/img/carechk.svg'} />
                                                                                        <p>{feature_detail[0].name} each

                                                                                        <span className="rpd-icon" onClick={self.testInfo.bind(self, feature_detail[0].test)}>
                                                                                                {feature_detail[0].test.show_details ?
                                                                                                    <img style={{ marginLeft: '5px' }} src={ASSETS_BASE_URL + '/img/icons/info.svg'} /> : ''}
                                                                                            </span> <span className="care-cnt">{v.count} Test/Yr.</span>
                                                                                        </p>
                                                                                    </div>
                                                                                    : ''
                                                                            })
                                                                            }

                                                                        </div>
                                                                    </div>
                                                                    <div className="col-3">
                                                                        <div className="care-nw-bookbtn">
                                                                            <button onClick={self.buyNow.bind(self, value.id)}>Buy Now</button>
                                                                        </div>

                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    })}

                                                </div>
                                                : ''} */}
                                        <div className="care-new-main-contianer">
                                            {
                                                this.props.data && this.props.data.plans && this.props.data.plans.length > 0 ?
                                                    <div className="care-new-container">
                                                        <p className="care-intro">Introducing</p>
                                                        <img className="nw-careLogo" src={ASSETS_BASE_URL + "/img/logo-care-white.png"} />
                                                        <img className="nw-care-subheading" src={ASSETS_BASE_URL + "/img/CARE-sb.png"} />
                                                        {Object.entries(this.props.data.plans).map(function ([key, value]) {
                                                            return <div className="nw-care-content" key={key}>
                                                                <div className="">

                                                                    <div className="row no-gutters">
                                                                        <div className="col-12">
                                                                            <div className="care-dtls-list nw-care-paragraph">
                                                                                <div>
                                                                                    {
                                                                                        value.unlimited_online_consultation ?
                                                                                            <img className="care-prd-icon" src={ASSETS_BASE_URL + '/img/nw-chk.png'} /> : ''
                                                                                    }
                                                                                    <p>Free Unlimited Online Consultation <span className="gp-spn">(General Physician)</span>
                                                                                    </p>
                                                                                </div>
                                                                                <div>
                                                                                    {value.priority_queue ?
                                                                                        <img className="care-prd-icon" src={ASSETS_BASE_URL + '/img/nw-chk.png'} />
                                                                                        : ''
                                                                                    }
                                                                                    <p>Priority Queue</p>
                                                                                </div>
                                                                                {Object.entries(value.features).map(function ([k, v]) {
                                                                                    let feature_detail = self.props.data.feature_details.filter(x => x.id == v.id)
                                                                                    return v.count ?
                                                                                        <div key={k}>
                                                                                            <img className="care-prd-icon" src={ASSETS_BASE_URL + '/img/nw-chk.png'} />
                                                                                            <p>{feature_detail[0].name} each

                                                                                        <span className="rpd-icon" onClick={self.testInfo.bind(self, feature_detail[0].test)}>
                                                                                                    {feature_detail[0].test.show_details ?
                                                                                                        <img style={{ marginLeft: '5px' }} src={ASSETS_BASE_URL + '/img/icons/info.svg'} /> : ''}
                                                                                                </span> <span className="care-cnt">{v.count} Test/Yr.</span>
                                                                                            </p>
                                                                                        </div>
                                                                                        : ''
                                                                                })
                                                                                }

                                                                            </div>
                                                                        </div>

                                                                    </div>
                                                                    <div className="new-care-btn">
                                                                        <button onClick={self.buyNow.bind(self, value.id)}>Show Care Info
                                                                           {/*} <span>{self.props.data && self.props.data.plans && self.props.data.plans.length?`(₹ ${parseInt(self.props.data.plans[0].deal_price)})`:''}</span>*/}
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        })}

                                                    </div>
                                                    : ''}
                                        </div>
                                    </div>
                                </div>
                                {/*<RightBar className="col-md-5 mb-3" />*/}
                            </div>
                        </section>
                        {this.state.showInfo ?
                            <InfoPopup infoData={this.state.infoData} closeInfo={this.closeInfo.bind(this)} />
                            : ''}
                        {
                            this.state.showLoginPopup ?
                                <CareLoginPopup {...this.props} hideLoginPopup={this.hideLoginPopup.bind(this)} selectedPlanId={this.state.selectedPlanId} />
                                : ''
                        }
                    </div>
                </React.Fragment>
            )
        } else {
            return (
                <React.Fragment>
                    <ProfileHeader homePage={true} showSearch={true} />
                    <div className="headerSubLinkContainer d-none">
                        <div className="container">
                            <div className="head_text_container">
                                {this.props.common_settings && this.props.common_settings.insurance_availability ?
                                    <a href="/insurance/insurance-plans" onClick={(e) => {
                                        let data = {
                                            'Category': 'ConsumerApp', 'Action': 'MobileFooterBookTestClicked', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'desktop-navbar-insurance-clicked'
                                        }
                                        GTM.sendEvent({ data: data })
                                        e.preventDefault();
                                        this.navigateTo("/insurance/insurance-plans?source=desktop-navbar-insurance-clicked")
                                    }}>OPD Insurance
                                    <span className="opdNewHeaderOfr">New</span>
                                    </a>
                                    : ''}
                                <a href="/search" onClick={(e) => {
                                    e.preventDefault();
                                    this.navigateTo("/search", 'opd')
                                }}>Find a Doctor</a>
                                <a href="/search" onClick={(e) => {
                                    e.preventDefault();
                                    this.navigateTo("/search", 'lab')
                                }}>Lab Tests</a>
                                <a href="/full-body-checkup-health-packages" onClick={(e) => {
                                    e.preventDefault();
                                    this.navigateTo('/full-body-checkup-health-packages')
                                }}>Health Packages</a>
                                <a href="/online-consultation" onClick={(e) => {
                                    e.preventDefault();
                                    this.navigateTo('/online-consultation')
                                }}>Online Doctor Consultation</a>
                                {/* <p onClick={(e) => {
                                    e.preventDefault();
                                    this.navigateTo('/contact')
                                }}>Contact us</p> */}
                            </div>
                        </div>
                    </div>
                    <Loader />
                </React.Fragment>
            )
        }

    }
}


export default PrimeCareView
