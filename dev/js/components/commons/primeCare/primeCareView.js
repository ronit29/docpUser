import React from 'react';
import LeftBar from '../LeftBar'
import RightBar from '../RightBar'
import ProfileHeader from '../DesktopProfileHeader'
import Loader from '../../commons/Loader'
import InfoPopup from './careInfoPopup.js'
import GTM from '../../../helpers/gtm.js'

class PrimeCareView extends React.Component {
    constructor(props) {
        super(props)
        this.state={
            showInfo:false,
            infoData:''
        }
    }

    buyNow(plan_id){
        let url = '/prime/booking?plan_id='+plan_id
        this.props.history.push(url)
    }

    testInfo(data){
        this.setState({infoData:data,showInfo:true})
    }

    closeInfo(){
        this.setState({infoData:'',showInfo:false})   
    }

    searchLab(test) {
        if (test.is_package) {
            this.props.setPackageId(test.id, true)
            setTimeout(() => {
                this.props.history.push('/searchpackages')
            }, 100)
        }else{
            this.testInfo(test)
        }
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
            this.props.history.push('/' + test.url + '?test_ids=' + test.id + '&selected_test_ids=' + selected_test_ids + '&lat=' + lat + '&long=' + long + '&from=search')
        } else if(test.is_package) {
            this.props.history.push('/search/testinfo?test_ids=' + test.id + '&selected_test_ids=' + selected_test_ids + '&lat=' + lat + '&long=' + long + '&from=search')
        }
    }

    render() {
        if(this.props.data && Object.keys(this.props.data).length > 0){
        let self = this
        return (
            <div className="profile-body-wrap" style={{ paddingBottom: 54 }}>
                {/* <ProfileHeader /> */}
                <div className="careHeaderBar">
                    <div className="container">
                        <div className="care-logo-container">
                            <img className="careBackIco" src={ASSETS_BASE_URL + "/img/careleft-arrow.svg"} onClick={()=> this.props.history.push('/')}/>
                            <img className="careLogiImg" src={ASSETS_BASE_URL + "/img/logo-care-white.png"} />
                        </div>
                    </div>
                </div>
                <div className="careSubHeader">
                    <img className="careSubImg" src={ASSETS_BASE_URL + "/img/subhead.svg"} />
                    <div className="container">
                        <div className="careTextContSc">
                            <img className="caresubTxt" src={ASSETS_BASE_URL + "/img/careText.png"} />
                            <img className="caresubsmile" src={ASSETS_BASE_URL + "/img/dpsmile.png"} />
                        </div>
                    </div>
                </div>
                <section className="container container-top-margin" style={{ marginTop: '120px' }}>
                    <div className="row main-row parent-section-row">
                        <LeftBar />
                        <div className="col-12 col-md-7 col-lg-7 center-column">
                            <div className="container-fluid">
                                <div className="careMainContainer mrb-15">
                                    <h5 className="carePlanHeading">Choose a plan that’s right for your loved ones.</h5>
                                    <div className="row no-gutters">
                                        {
                                          this.props.data && this.props.data.plans && this.props.data.plans.length>0?
                                            Object.entries(this.props.data.plans).map(function ([key, value]) {
                                                // console.log(value)
                                                return( <div className="col-4" key={key}>
                                                            <p className="carePlans">{value.name}</p>
                                                            <div className="careComparePanel">
                                                                <p className="carePlanPrice">₹ {value.deal_price}/Yr.</p>
                                                                <p className="carePlanPriceCut">{value.mrp}/Yr.</p>
                                                                <div className="btn-bgwhite"><button onClick={self.buyNow.bind(self,value.id)}>Buy Now</button></div>
                                                            </div>
                                                        </div>)
                                            })
                                          :''  
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
                                                            value.unlimited_online_consultation?
                                                            <div className="col-4" key={key}> <img className="checkcrdImg" src={ASSETS_BASE_URL + "/img/checkedgreen.svg"} /></div>:
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
                                                            value.priority_queue?
                                                            <div className="col-4" key={key}> <img className="checkcrdImg" src={ASSETS_BASE_URL + "/img/checkedgreen.svg"} /></div>:
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
                                                        <h4 className="carechkHeading">{feature_detail[0].name} {feature_detail[0].test.show_detail_in_plan?
                                                            <span style={{ marginLeft: '5px', marginTop: '1px', display: 'inline-block' }} onClick={self.testInfo.bind(self, feature_detail[0].test)}>
                                                                <img src="https://cdn.docprime.com/cp/assets/img/icons/info.svg" />
                                                            </span>:''}
                                                        </h4>
                                                        <div className="checkCrdcont">
                                                            <div className="checkCrdimgcont no-gutters row" style={{ borderBottom: 'none' }}>
                                                            {Object.entries(value).map(function ([k, val]) {
                                                                return (<div className="col-4" key={k}>
                                                                            {val.count?
                                                                                <div> <span className="careTestYear"> {`${val.count} Test/Yr.`}</span></div>
                                                                                :<div> <img className="crosscheckcrdImg" src={ASSETS_BASE_URL + "/img/wrongcopy.svg"} /></div>
                                                                            }
                                                                        </div>)
                                                            })}
                                                            </div>
                                                        </div>
                                                    </div>)
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                        <RightBar className="col-md-5 mb-3" />
                    </div>
                </section>
                {this.state.showInfo?
                    <InfoPopup infoData={this.state.infoData} closeInfo={this.closeInfo.bind(this)}/>
                :''}
            </div>
        )
        }else{
            return (
                <div className="profile-body-wrap" style={{ paddingBottom: 54 }}>
                    <div className="careHeaderBar">
                        <div className="container">
                            <div className="care-logo-container">
                                <img className="careBackIco" src={ASSETS_BASE_URL + "/img/careleft-arrow.svg"} onClick={()=> this.props.history.push('/')} />
                                <img className="careLogiImg" src={ASSETS_BASE_URL + "/img/logo-care-white.png"} />
                            </div>
                        </div>
                    </div>
                    <div className="careSubHeader">
                        <img className="careSubImg" src={ASSETS_BASE_URL + "/img/subhead.svg"} />
                        <div className="container">
                            <div className="careTextContSc">
                                <img className="caresubTxt" src={ASSETS_BASE_URL + "/img/careText.png"} />
                                <img className="caresubsmile" src={ASSETS_BASE_URL + "/img/dpsmile.png"} />
                            </div>
                        </div>
                    </div>
                    <Loader />
                </div>
                )
        }

    }
}


export default PrimeCareView
