import React from 'react';

import LabProfileCard from '../../commons/labProfileCard/index.js'
import InfiniteScroll from 'react-infinite-scroller';
import Loader from '../../../commons/Loader'
import GTM from '../../../../helpers/gtm'
import LabResultCard from '../../commons/labResultCard'

class LabsList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            hasMore: false,
            loading: false,
            renderBlock: false,
            page: 0
        }
    }

    componentDidMount() {
        /**
         * Below code ensures smooth back page transitions in case of huge data sets, and maintains scroll position.
         * renderBlock = true (by default) will block render until the page transition is completed, and once its done, it will then render and set scroll position accordingly
         
        setTimeout(() => {
            if (this.refs.checkIfExists) {
                this.setState({ renderBlock: false })
            }
            setTimeout(() => {
                if (window) {
                    let scroll_pos = window.LAB_SCROLL_POS ? (window.LAB_SCROLL_POS) : 0
                    // TODO: improve scroll back logic
                    window.scrollTo(0, scroll_pos || 0)
                    window.LAB_SCROLL_POS = 0

                    window.onscroll = function () {
                        window.LAB_SCROLL_POS = window.pageYOffset
                    }
                }
            }, 100)
        }, 100)
        
        */
        setTimeout(() => {
            this.setState({ hasMore: true })
        }, 0)

    }

    componentWillUnmount() {
        let data = {
            'Category': 'ConsumerApp', 'Action': 'LabSearchPagination', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'lab-search-pagination', 'Pages': this.state.page
        }
        GTM.sendEvent({ data: data })
        // if (window) {
        //     window.onscroll = null
        // }
    }

    getLocationParam(tag) {
        // this API assumes the context of react-router-4
        const paramString = this.props.location.search
        const params = new URLSearchParams(paramString)
        return params.get(tag)
    }

    loadMore(page) {
        this.setState({ hasMore: false, loading: true, page: page })

        this.props.getLabList(null, page + 1, (hasMore) => {
            this.setState({ loading: false })
            setTimeout(() => {
                this.setState({ hasMore })
            }, 1000)
        })
    }
    testInfo() {
        var url_string = window.location.href;
        var url = new URL(url_string);
        var test_ids = url.searchParams.get("test_ids");
        this.props.history.push('/search/testinfo?test_ids=' + test_ids + '&from=searchresults')
    }
    render() {
        console.log(this.props.searchPackagesData)
        let { LABS, labList } = this.props
        return (
            <section className="wrap search-book-result variable-content-section" style={{ paddingTop: 10 }} ref="checkIfExists">
                {
                    this.state.renderBlock ? <Loader /> :
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-12">
                                <div className="filter-card-dl mb-3">
                                                        <div className="fltr-crd-top-container">
                                                            <div className="fltr-lctn-dtls">
                                                                <p><img className="fltr-loc-ico" width="12px" height="18px" src="https://qacdn.docprime.com/cp/assets/img/customer-icons/map-marker-blue.svg" />
                                                                    <span className="fltr-loc-txt">Near Saitn Angel Public School, Senior Wing, Sector 45</span>  | <span>0.8 Km</span>
                                                                </p>
                                                            </div>
                                                            <div className="row no-gutters" style={{ cursor: 'pointer' }}>
                                                                <div className="col-12 mrt-10">
                                                                    <a href="/dr-satvender-singh-general-physician-in-sector-45-gurgaon-dpp">
                                                                        <h2 className="lab-fltr-dc-name fw-500" style={{ fontSize: '16px', paddingLeft: '8px', paddingRight: '110px' }}>Dr. Satvender Singh</h2>
                                                                    </a><span className="filtr-offer ofr-ribbon fw-700">25% Off</span>
                                                                </div>
                                                                <div className="col-7 mrt-10">
                                                                    <div className="img-nd-dtls" style={{ alignItems: 'flex-start;' }}>
                                                                        <div className="fltr-crd-img text-center" style={{ width: '60px' }}>
                                                                            <div className="initialsPicture-ds fltr-initialPicture-ds" style={{ backgroundColor: 'rgb(244, 143, 177)' }}>
                                                                                <span>SS</span>
                                                                            </div>
                                                                            <span className="fltr-rtng">Verified</span>
                                                                        </div>
                                                                        <div className="crd-dctr-dtls">
                                                                            <h3 className="fw-500">General Physician</h3>
                                                                            <h3 className="fw-500">15 Years of Experience</h3>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-5 mrt-10 text-right" style={{ paddingLeft: '8px' }}>
                                                                    <p className="fltr-prices" style={{ marginTop: '4px' }}>₹ 300<span className="fltr-cut-price">₹ 400</span></p>
                                                                    <div className="signup-off-container">
                                                                        <span className="signup-off-doc">+ ₹ 100 OFF <b>on Signup</b> </span>
                                                                    </div><button className="fltr-bkng-btn" style={{ width: '100%' }}>Book Now</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="filtr-card-footer">
                                                            <div><img src="https://qacdn.docprime.com/cp/assets/img/customer-icons/home.svg" />
                                                                <h3 className="mrb-0">Dr. Satvender Singh Clinic</h3></div><div className="text-right"><img src="https://qacdn.docprime.com/cp/assets/img/customer-icons/clock-black.svg" /><p>
                                                                    <span>5:30 PM to 7:30 PM</span>
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                    <InfiniteScroll
                                        pageStart={0}
                                        loadMore={this.loadMore.bind(this)}
                                        hasMore={this.state.hasMore}
                                        useWindow={true}
                                    >
                                        {
                                            this.props.searchPackagesData.map((packages, i) => {
                                                console.log(packages)
                                                return <div>

                                                    



                                                    <LabResultCard {...this.props} details={packages} key={i} rank={i} />
                                                    <LabProfileCard {...this.props} details={packages} key={i} rank={i} />
                                                </div>
                                            })
                                        }

                                        {/*{
                                            labList.map((labId, i) => {
                                                if (i == 1 && LABS[labId]) {

                                                    return <div key={i}>
                                                        <div className="no-risk-container mt-3">
                                                            <div className="no-rsk">
                                                                <div className="rsk-image">
                                                                    <img className="" src={ASSETS_BASE_URL + "/img/customer-icons/group-98.png"} />
                                                                </div>
                                                                <div className="rsk-content">
                                                                    <h4 className="rsk-hdng">Amazing Savings... No Risks!</h4>
                                                                    <ul className="rsk-lstng ff">
                                                                        <li className="lst-bfr">Upto 50% Off on doctor and lab bookings</li>
                                                                        <li className="lst-bfr">100% money back guarantee -  No questions!</li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {
                                                            this.props.lab_card ?
                                                                <LabResultCard {...this.props} details={LABS[labId]} key={i} rank={i} />
                                                                : <LabProfileCard {...this.props} details={LABS[labId]} key={i} rank={i} />
                                                        }
                                                    </div>

                                                } else {
                                                    if (LABS[labId]) {
                                                        return <div key={i}>
                                                            {
                                                                this.props.lab_card ?
                                                                    <LabResultCard {...this.props} details={LABS[labId]} key={i} rank={i} />
                                                                    : <LabProfileCard {...this.props} details={LABS[labId]} key={i} rank={i} />
                                                            }
                                                        </div>
                                                    } else {
                                                        return ""
                                                    }
                                                }
                                            })
                                        }*/}
                                    </InfiniteScroll>
                                </div>
                            </div>
                            {this.state.loading ? <Loader classType="loaderPagination" /> : ""}
                        </div>
                }
            </section>
        );
    }
}


export default LabsList
