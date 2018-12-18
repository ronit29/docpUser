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
        let show_details = false
        let { LABS, labList } = this.props

        let start_page = 0
        if (this.props.curr_page) {
            start_page = Math.max(0, this.props.curr_page - 1)
        } else {
            if (this.props.page) {
                start_page = Math.max(0, this.props.page - 1)
            }
        }

        return (
            <section className="wrap search-book-result variable-content-section" style={{ paddingTop: 10 }} ref="checkIfExists">
                {
                    this.state.renderBlock ? <Loader /> :
                        <div className="container-fluid">
                            <div className="row">


                                {/* ====================== start lab view more card ====================== */}

                                <div className="col-12">
                                    <div className="filter-card-dl mb-3">
                                        <div className="fltr-crd-top-container">
                                            <div className="fltr-lctn-dtls">
                                                <p><img className="fltr-loc-ico" src="/assets/img/customer-icons/map-marker-blue.svg" style={{ width: '12px', height: '18px' }} /><span className="fltr-loc-txt">Gurgaon, Gurgaon</span><span>&nbsp;|&nbsp;3 Km</span></p>
                                            </div>
                                            <div className="row no-gutters mrt-10">
                                                <div className="col-12">
                                                    <a href="/dr-gaurav-gupta-dentist-implantologist-general-physician-in-sector-11-gurgaon-dpp">
                                                        <h2 className="lab-fltr-dc-name fw-500 text-md">Metropolis Healthcare Ltd - Gurgaon</h2>
                                                    </a>
                                                    <span className="filtr-offer ofr-ribbon fw-700">41% OFF</span>
                                                </div>
                                                <div className="col-7 mrt-10">
                                                    <div className="img-nd-dtls">
                                                        <div className="text-center">
                                                            <div><img className="fltr-usr-image-lab" src="https://cdn.docprime.com/media/lab/images/90x60/b0dad6f1354821d9af4c5143cc2aeeaa_N5id4Pi.jpg" /></div>
                                                        </div>
                                                        <div style={{ marginLeft: '8px' }}></div>
                                                    </div>
                                                </div>
                                                <div className="col-5 mrt-10 text-right" style={{ paddingleft: '8px' }}>
                                                    <p className="text-primary fw-500 text-lg mrb-10">₹ 559<span className="fltr-cut-price" style={{ verticalAlign: '1px' }}>₹ 950</span></p>
                                                    <div className="signup-off-container"><span className="signup-off-doc" style={{ fontSize: '12px' }}>+ ₹ 100 OFF <b>on Signup</b> </span></div>
                                                    <button className="fltr-bkng-btn" style={{ width: '100%' }}>Book Now</button>
                                                </div>
                                            </div>
                                            <div>
                                                <ul className="fltr-labs-test-selected mrt-10">
                                                    <span className="fltr-prv-selected-test">Tests Selected</span>
                                                    <li className="fltr-slected-test">
                                                        <label style={{ fontWeight: '400' }}>Dengue NS1 antigen detection</label>
                                                        <p style={{ fontWeight: '400' }}>₹ 360 <span>₹ 600</span></p>
                                                    </li>
                                                    <li className="fltr-slected-test">
                                                        <label style={{ fontWeight: '400' }}>CBC Haemogram</label>
                                                        <p style={{ fontWeight: '400' }}>₹ 149 <span>₹ 350</span></p>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="filtr-card-footer" style={{ background: 'white' }}>
                                            <div style={{ paddingRight: "8px" }}>
                                                <p style={{ marginLeft: '0px;' }}>* Inclusive of home visit charges</p>
                                            </div>
                                            <div className="text-right" style={{ marginLeft: 'auto;' }}>
                                                <img src="/assets/img/customer-icons/clock-black.svg" />
                                                <p style={{ fontSize: '12px' }}>8:00 AM - 6:00 PM</p>
                                            </div>
                                        </div>
                                        <div className="showBookTestListContainer">
                                            <div className="showBookTestList">
                                                <ul>
                                                    <li>
                                                        <p className="showBookTestListImg"> <img src="/assets/img/new-loc-ico.svg" style={{ marginRight: '8px', width: "12px" }} />Sector 56 Near Metro Gurgaon | 3.6 km </p>
                                                        <button className="showBookTestListBtn">Book Now</button>
                                                    </li>
                                                    <li>
                                                        <p className="showBookTestListImg"> <img src="/assets/img/new-loc-ico.svg" style={{ marginRight: '8px', width: "12px" }} />Sector 56 Near Metro Gurgaon | 3.6 km </p>
                                                        <button className="showBookTestListBtn">Book Now</button>
                                                    </li>
                                                    <li>
                                                        <p className="showBookTestListImg"> <img src="/assets/img/new-loc-ico.svg" style={{ marginRight: '8px', width: "12px" }} />Sector 56 Near Metro Gurgaon | 3.6 km </p>
                                                        <button className="showBookTestListBtn">Book Now</button>
                                                    </li>
                                                    <li>
                                                        <p className="showBookTestListImg"> <img src="/assets/img/new-loc-ico.svg" style={{ marginRight: '8px', width: "12px" }} />Sector 56 Near Metro Gurgaon | 3.6 km </p>
                                                        <button className="showBookTestListBtn">Book Now</button>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="filtr-card-footer">
                                                <div style={{ paddingRight: "8px" }}>
                                                    <p style={{ marginLeft: '0px;' }}>View 4 more locations</p>
                                                </div>
                                                <div className="text-right" style={{ marginLeft: 'auto;' }}>
                                                    <img class="" src="/assets/img/customer-icons/dropdown-arrow.svg" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* ====================== end lab view more card ====================== */}
                                {Object.entries(this.props.selectedCriterias).map(function ([key, value]) {
                                    if (value.show_details) {
                                        show_details = true
                                    }
                                })}
                                {
                                    show_details ? <div className="col-12">
                                        <span className="srch-heading" style={{ float: 'left', cursor: 'pointer', color: '#e46608' }} onClick={this.testInfo.bind(this)}> Test Info</span></div> : ''
                                }
                                <div className="col-12">
                                    <InfiniteScroll
                                        pageStart={start_page}
                                        loadMore={this.loadMore.bind(this)}
                                        hasMore={this.state.hasMore}
                                        useWindow={true}
                                    >
                                        {
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
                                        }
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
