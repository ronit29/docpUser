import React from 'react';
import InitialsPicture from '../../../commons/initialsPicture'
import GTM from '../../../../helpers/gtm.js'

import { buildOpenBanner } from '../../../../helpers/utils.js'
import STORAGE from '../../../../helpers/storage'
import { X_OK } from 'constants';
import RatingStars from '../../../commons/ratingsProfileView/RatingStars';
import CommonVipGoldBadge from '../../../commons/commonVipGoldBadge.js'
import CommonVipGoldNonLoginBadge from '../../../commons/commonVipGoldNonLoginBadge.js'

class LabProfileCard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            openViewMore: false,
            ssrFlag: false
        }
    }

    componentDidMount() {
        this.setState({ ssrFlag: true })
    }

    toggleViewMore() {
        this.setState({ openViewMore: !this.state.openViewMore })
    }


    openLab(id, url, e) {
        this.props.clearExtraTests()
        if (this.props.noClearTest) {
            //package conditions for seo page
            let lab_id
            let test = {}
            let data = this.props.details
            if (data.id != id) {
                lab_id = id
            } else {
                lab_id = data.id
            }
            test.type = 'test'
            test.name = data.tests[0].name
            test.id = data.tests[0].id
            test.deal_price = data.tests[0].deal_price
            test.mrp = data.tests[0].mrp
            test.url = data.tests[0].url

            test.lab_id = lab_id
            test.extra_test = true
            this.props.toggleDiagnosisCriteria('test', test, true)
        } else {
            //for tests
            this.mergeTests(id)
        }
        let data = {
            'Category': 'ConsumerApp', 'Action': 'RankOfLabClicked', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'rank-lab-clicked', 'Rank': this.props.rank + 1
        }
        GTM.sendEvent({ data: data })

        data = {
            'Category': 'ConsumerApp', 'Action': 'LabSelectedByUser', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'lab-selected-by-user', 'LabId': id
        }
        GTM.sendEvent({ data: data })
        this.props.clearVipSelectedPlan()
        if (e.ctrlKey || e.metaKey) {

        } else {
            e.preventDefault();

            if (url) {
                this.props.history.push(`/${url}`)
            } else {
                this.props.history.push(`/lab/${id}`)
            }
        }
    }

    mergeTests(id) {
        let dedupe_ids = {}
        let testIds = this.props.currentSearchedCriterias
            .reduce((final, x) => {
                final = final || []
                if (x.test && x.type == "condition") {
                    x.test = x.test || []
                    final = [...final, ...x.test]
                } else if (x.type == "test") {
                    final.push(x)
                }
                return final
            }, [])
            .filter((x) => {
                if (dedupe_ids[x.id]) {
                    return false
                } else {
                    dedupe_ids[x.id] = true
                    return true
                }
            }).map((test) => {
                let new_test = Object.assign({}, test)
                new_test.extra_test = true
                new_test.lab_id = id
                this.props.toggleDiagnosisCriteria('test', new_test, true)
            })
    }

    bookNowClicked(id, url = '') {
        this.props.clearExtraTests()
        let slot = { time: {} }
        this.props.clearExtraTests()
        this.props.selectLabTimeSLot(slot, false)
        let selectedType = {
            r_pickup: 'home',
            p_pickup: 'home'
        }
        this.props.selectLabAppointmentType(selectedType)
        this.mergeTests(id)

        if (url) {
            this.props.history.push(`/${url}/booking?lab_id=${id}`)
        } else {
            this.props.history.push(`/lab/${id}/book`)
        }

    }

    testInfo(test_id, lab_id, test_url, event) {
        let selected_test_ids = []
        Object.entries(this.props.currentSearchedCriterias).map(function ([key, value]) {
            selected_test_ids.push(value.id)
        })
        var url_string = window.location.href;
        var url = new URL(url_string);
        var search_id = url.searchParams.get("search_id");
        let lat = 28.644800
        let long = 77.216721
        if (this.props.selectedLocation !== null) {
            lat = this.props.selectedLocation.geometry.location.lat
            long = this.props.selectedLocation.geometry.location.lng

            if (typeof lat === 'function') lat = lat()
            if (typeof long === 'function') long = long()
        }
        if (test_url && test_url != '') {
            this.props.history.push('/' + test_url + '?test_ids=' + test_id + '&selected_test_ids=' + selected_test_ids + '&search_id=' + search_id + '&lab_id=' + lab_id + '&lat=' + lat + '&long=' + long)
        } else {
            this.props.history.push('/search/testinfo?test_ids=' + test_id + '&selected_test_ids=' + selected_test_ids + '&search_id=' + search_id + '&lab_id=' + lab_id + '&lat=' + lat + '&long=' + long)
        }
        event.stopPropagation()
        let data = {
            'Category': 'ConsumerApp', 'Action': 'testInfoClick', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'test-info-click', 'pageSource': 'lab-result-page'
        }
        GTM.sendEvent({ data: data })
    }

    goldClicked() {
        let data = {
            'Category': 'ConsumerApp', 'Action': 'VipGoldClicked', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'vip-gold-clicked', 'selectedId': this.props.details.id
        }
        GTM.sendEvent({ data: data })
        this.props.history.push('/vip-gold-details?is_gold=true&source=labgoldlisting&lead_source=Docprime')
    }

    render() {
        let self = this
        let { price, lab, distance, is_home_collection_enabled, lab_timing, lab_timing_data, mrp, next_lab_timing, next_lab_timing_data, distance_related_charges, pickup_charges, address, name, lab_thumbnail, other_labs, id, url, home_pickup_charges, discounted_price, avg_rating, rating_count, insurance, vip, is_vip_enabled, is_gold } = this.props.details;
        distance = Math.ceil(distance / 1000);

        let pickup_text = ""
        if (is_home_collection_enabled && distance_related_charges == 1) {
            pickup_text = "Home pickup charges applicable"
        }

        if (is_home_collection_enabled && !distance_related_charges) {
            if (home_pickup_charges == 0) {
                pickup_text = "Free home visit"
            }
            else {
                pickup_text = "Inclusive of home visit charges"
            }
            price = price + pickup_charges
            discounted_price = discounted_price + pickup_charges
            mrp = mrp + pickup_charges
        }

        let offPercent = ''
        if (mrp && (discounted_price || discounted_price == 0) && (discounted_price < mrp)) {
            offPercent = parseInt(((mrp - discounted_price) / mrp) * 100);
        }
        let hide_price = false
        if (this.props.test_data) {
            this.props.test_data.map((test) => {
                if (test.hide_price) {
                    hide_price = true
                }
            })
        }
        let show_detailsIds = []
        if (!this.props.isTestInfo) {
            {
                Object.entries(this.props.currentSearchedCriterias).map(function ([key, value]) {
                    if (value.show_details) {
                        show_detailsIds.push(value.id)
                    }
                })
            }
        }
        let is_insurance_applicable = false
        let is_insurance_buy_able = false
        if (insurance && insurance.is_insurance_covered && insurance.is_user_insured) {
            is_insurance_applicable = true
            pickup_text = ""
        }

        if (insurance && insurance.is_insurance_covered && !insurance.is_user_insured) {
            is_insurance_buy_able = true
        }
        let is_labopd_enable_for_vip = is_vip_enabled
        let is_labopd_enable_for_gold = is_gold
        let is_vip_member = false
        let is_gold_member = false
        let covered_under_vip = false
        if (vip && Object.keys(vip).length > 0) {
            is_vip_member = vip.is_vip_member
            is_gold_member = vip.is_gold_member
            covered_under_vip = vip.covered_under_vip
        }

        let show_common_prices = !is_labopd_enable_for_vip || ((is_gold_member || is_vip_member) && !covered_under_vip)
        return (

            <div className="cstm-docCard mb-3">
                <div className="cstm-docCard-content" style={{ cursor: 'pointer' }} >
                    <div className="row no-gutters" style={{ paddingBottom: 10 }}>
                        <div className="col-8">
                            <div className="cstm-doc-details-container labCardUiresponsive">
                                <div className="cstm-doc-img-container">
                                    <div className="text-center">
                                        <a href={`/${url}`} onClick={(e) => {
                                            e.preventDefault();
                                            this.bookNowClicked(id, url);
                                        }}>
                                            <InitialsPicture name={name} has_image={!!lab_thumbnail} className="initialsPicture-ls">
                                                <img alt={name} className="fltr-usr-image-lab hpl-logo-name" src={lab_thumbnail} />
                                            </InitialsPicture>
                                        </a>
                                    </div>
                                    {
                                        avg_rating ?
                                            <div style={{ marginTop: 4 }} className="rating-star-container">
                                                <RatingStars average_rating={avg_rating} rating_count={rating_count || ''} width="10px" height="10px" />
                                            </div> : ''
                                    }
                                </div>

                                <div className="cstm-doc-content-container">
                                    <a href={`/${url}`} onClick={(e) => {
                                        e.preventDefault();
                                        this.bookNowClicked(id, url);
                                    }}>
                                        <h2 className="cstmDocName">{name}</h2>
                                    </a>
                                    {
                                        this.props.details.tests && this.props.details.tests.length ?
                                            this.props.details.tests.map((test, index) => {
                                                return show_detailsIds.indexOf(this.props.details.tests[0].id) > -1 ?
                                                    <p key={index} onClick={this.testInfo.bind(this, this.props.details.tests[0].id, id, this.props.details.tests[0].url)}>{test.name}
                                                        <span style={{ 'marginLeft': '5px', marginTop: '1px', display: 'inline-block' }}>
                                                            <img src={ASSETS_BASE_URL + '/img/icons/Info.svg'} style={{ width: '15px' }} />
                                                        </span>
                                                    </p>
                                                    : <p key={index}>{test.name}</p>
                                            }) : ''
                                    }
                                    <div className="cstm-lab-time-container">
                                        <img className="cstmTimeImg" src={ASSETS_BASE_URL + "/img/watch-date.svg"} />
                                        {buildOpenBanner(lab_timing, lab_timing_data, next_lab_timing, next_lab_timing_data)}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-4 booking-column">

                            {
                                false && !is_insurance_applicable && this.state.ssrFlag && (discounted_price || discounted_price == 0) && !hide_price && !((is_vip_member || is_gold_member) && covered_under_vip) ?
                                    <p className="cstm-doc-price">Docprime Price</p> : ''
                            }
                            {
                                (!is_insurance_applicable && !show_common_prices) && <CommonVipGoldBadge is_labopd_enable_for_vip={is_labopd_enable_for_vip} is_labopd_enable_for_gold={is_labopd_enable_for_gold} is_vip_member={is_vip_member} is_gold_member={is_gold_member} covered_under_vip={covered_under_vip} vip_data={vip} {...this.props} mrp={mrp} discounted_price={discounted_price} goldClicked={() => this.goldClicked()} />
                            }
                            {
                                !is_insurance_applicable && (discounted_price || discounted_price == 0) && !hide_price && show_common_prices
                                    ? discounted_price != mrp
                                        ? <p className="cst-doc-price">₹ {discounted_price}<span className="cstm-doc-cut-price">₹ {mrp} </span> </p>
                                        : <p className="cst-doc-price">₹ {discounted_price}</p>
                                    : ''
                            }
                            {
                                !is_insurance_applicable && discounted_price != price && !hide_price && offPercent && offPercent > 0 && show_common_prices ?
                                    <p className="cstm-cpn">{offPercent}% Off <span><br />(includes Coupon)</span></p> : ''
                            }
                            {
                                // is_vip_applicable && !vip.is_gold_member ?
                                //     <div className="text-right mb-2">
                                //         <img className="vip-main-ico img-fluid" src={ASSETS_BASE_URL + '/img/viplog.png'} />
                                //     </div>
                                // : ''
                            }
                            {
                                //     vip.is_gold_member?
                                //         <div className="text-right mb-2">
                                //             <img className="vip-main-ico img-fluid" src={ASSETS_BASE_URL + '/img/gold-sm.png'} />
                                //         </div>
                                //         : ''
                            }
                            {
                                is_insurance_applicable ?
                                    <div>
                                        <p className="cst-doc-price">₹ {0}</p>
                                        <div className="ins-val-bx">Covered Under Insurance</div>
                                    </div>
                                    : ''
                            }
                            {
                                //        !is_insurance_applicable && is_vip_applicable ?
                                //             <p className="cst-doc-price">₹ {vip.is_gold_member?vip.vip_gold_price+vip.vip_convenience_amount:vip_amount} <span className="cstm-doc-cut-price">₹ {mrp} </span></p>
                                //             : ''
                            }
                            {
                                /*                                    !is_insurance_applicable && is_enable_for_vip && !is_vip_applicable?
                                                                        <div className="d-flex align-items-center justify-content-end" style={{ cursor: 'pointer', marginTop: 5, marginBottom: 5, position: 'relative', zIndex: 1 }} onClick={(e) => {
                                                                            this.props.clearVipSelectedPlan()
                                                                            this.props.history.push('/vip-club-details?source=lablisting&lead_source=Docprime')
                                                                            let data = {
                                                                                'Category': 'ConsumerApp', 'Action': 'LabCardVIPClicked', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'lab-card-vip-clicked'
                                                                            }
                                                                            GTM.sendEvent({ data: data })
                                                                        }}>
                                                                            <p className="fw-500 grn-txt-vip">Save 25% with</p>
                                                                            <img src={ASSETS_BASE_URL + '/img/viplog.png'} style={{ width: 18, marginLeft: 4, marginRight: 2 }} />
                                                                            <img src={ASSETS_BASE_URL + '/img/customer-icons/dropdown-arrow.svg'} style={{ transform: 'rotate(-90deg)' }} />
                                                                        </div>
                                                                        : ''*/
                            }
                            {
                                // !is_insurance_applicable && is_vip_gold && !is_vip_applicable && discounted_price>(vip.vip_convenience_amount||0 + vip.vip_gold_price||0) && !vip.is_gold_member && <div className="d-flex align-items-center justify-content-end goldCard" onClick={() => this.goldClicked()}>

                                //     <img className="gld-cd-icon" src={ASSETS_BASE_URL + '/img/gold-sm.png'}/> 
                                //     <p className="gld-p-rc">Price</p> <span className="gld-rate-lf">₹ {vip.vip_convenience_amount||0 + vip.vip_gold_price||0}</span><img style={{transform: 'rotate(-90deg)', width: '10px'}} src={ASSETS_BASE_URL + '/img/customer-icons/dropdown-arrow.svg'}/>

                                // </div>
                            }
                            {
                                (!is_insurance_applicable && !show_common_prices) && <CommonVipGoldNonLoginBadge is_labopd_enable_for_vip={is_labopd_enable_for_vip} is_labopd_enable_for_gold={is_labopd_enable_for_gold} is_vip_member={is_vip_member} is_gold_member={is_gold_member} covered_under_vip={covered_under_vip} vip_data={vip} {...this.props} mrp={mrp} discounted_price={discounted_price} goldClicked={() => this.goldClicked()} />
                            }
                            <button className="cstm-book-btn" onClick={this.bookNowClicked.bind(this, id, url)}>Book Now</button>
                        </div>
                    </div>

                    {/*
                        is_insurance_buy_able && this.props.common_settings && this.props.common_settings.insurance_availability?
                        <div className="ins-buyable">
                            <p>Book this Lab for ₹0 with OPD Insurance</p>
                            <span style={{cursor:'pointer'}} onClick={(e)=>{
                                e.stopPropagation()
                                let data = {
                                    'Category': 'ConsumerApp', 'Action': 'KnowMoreLabClicked', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'know-more-lab-clicked'
                                }
                                GTM.sendEvent({ data: data })
                                this.props.history.push('/insurance/insurance-plans?source=lab-listing&show_button=true')
                            }}>Know more</span>
                        </div>
                        :''
                    */}
                </div>
                <div className="cstmCardFooter">
                    <div className="cstmfooterContent">
                        {
                            pickup_text ?
                                <p><img style={{ width: '16px' }} src={ASSETS_BASE_URL + "/img/cstmhome.svg"} />{pickup_text}</p> : ''
                        }
                        <p className="mb-rmv"><img style={{ width: '10px', marginLeft: '3px' }} src={ASSETS_BASE_URL + "/img/new-loc-ico.svg"} />{address}</p>
                    </div>
                    <div className="cstmDocLoc">
                        <p className=""><img src={ASSETS_BASE_URL + "/img/cstmdist.svg"} /> {distance}Km</p>
                    </div>
                </div>
                <div className="showBookTestListContainer mt-rmv">
                    {
                        other_labs && other_labs.length && this.state.openViewMore ?
                            <div className="showBookTestList bg-white-main">
                                <ul>
                                    {
                                        other_labs.map((olab, x) => {
                                            return <li key={x}>
                                                <p className="showBookTestListImg"><img src={ASSETS_BASE_URL + "/img/new-loc-ico.svg"} style={{ marginRight: '8px', width: "12px" }} />{olab.address} | {Math.ceil(olab.distance / 1000)} km</p>
                                                <button className="showBookTestListBtn" onClick={this.bookNowClicked.bind(this, olab.id, olab.url)}>Book Now</button>
                                            </li>
                                        })
                                    }
                                </ul>
                            </div> : ''
                    }
                    {
                        other_labs && other_labs.length ?
                            <div className="filtr-card-footer bg-white-main" onClick={this.toggleViewMore.bind(this)} style={{ cursor: 'pointer', borderTop: '1px solid #e8e8e8' }}>
                                {
                                    this.state.openViewMore ?
                                        <div style={{ paddingRight: "8px" }}>
                                            <p className="appBaseColor" style={{ marginLeft: '0px' }}>Show less</p>
                                        </div>
                                        :
                                        <div style={{ paddingRight: "8px" }}>
                                            <p className="appBaseColor" style={{ marginLeft: '0px' }}>View {other_labs.length} more locations</p>
                                        </div>
                                }
                                {
                                    this.state.openViewMore ?
                                        <div className="text-right" style={{ marginLeft: 'auto' }}>
                                            <img style={{ margin: '5px' }} className="acrd-show" src={ASSETS_BASE_URL + "/img/customer-icons/dropdown-arrow.svg"} />
                                        </div>
                                        :
                                        <div className="text-right" style={{ marginLeft: 'auto' }}>
                                            <img style={{ margin: '5px' }} src={ASSETS_BASE_URL + "/img/customer-icons/dropdown-arrow.svg"} />
                                        </div>
                                }
                            </div> : ''
                    }
                </div>
            </div>


            // <div className="">
            //     <div className="filter-card-dl mb-3">
            //         <div className="fltr-crd-top-container">
            //             <div className="fltr-lctn-dtls" onClick={this.bookNowClicked.bind(this, id, url)} style={{ cursor: 'pointer' }}>
            //                 <p><img className="fltr-loc-ico" src="/assets/img/new-loc-ico.svg" style={{ width: '12px', height: '18px' }} /><span className="fltr-loc-txt">{address}</span><span>&nbsp;|&nbsp;{distance} Km</span></p>
            //             </div>
            //             <div className="row no-gutters mrt-10" onClick={this.bookNowClicked.bind(this, id, url)} style={{ cursor: 'pointer' }}>
            //                 <div className="col-12">
            //                     <a href={url} onClick={(e) => e.preventDefault()}>
            //                         <h2 className="lab-fltr-dc-name fw-500 text-md">{name}</h2>
            //                     </a>
            //                     {
            //                         !hide_price && offPercent && offPercent > 0 ?
            //                             <span className="filtr-offer ofr-ribbon fw-700">{offPercent}% OFF</span> : ''
            //                     }
            //                 </div>
            //                 <div className="col-7 mrt-10">
            //                     <div className="img-nd-dtls">
            //                         <div className="text-center">
            //                             <InitialsPicture name={name} has_image={!!lab_thumbnail} className="initialsPicture-ls">
            //                                 <img className="fltr-usr-image-lab" src={lab_thumbnail} />
            //                             </InitialsPicture>
            //                         </div>
            //                         <div style={{ marginLeft: '8px', marginRight: '8px' }}>
            //                             {
            //                                 this.props.details.tests && this.props.details.tests.length == 1 ? <p style={{ color: "rgb(0, 0, 0)", fontSize: "14px", fontWeight: 400 }}>{this.props.details.tests[0].name}
            //                                     {
            //                                         show_detailsIds.indexOf(this.props.details.tests[0].id) > -1 ? <span style={{ 'marginLeft': '5px', marginTop: '1px', display: 'inline-block' }} onClick={this.testInfo.bind(this, this.props.details.tests[0].id, id, this.props.details.tests[0].url)}>
            //                                             <img src="https://cdn.docprime.com/cp/assets/img/icons/info.svg" />
            //                                         </span> : ''
            //                                     }
            //                                 </p> : ""
            //                             }
            //                         </div>
            //                     </div>
            //                     {this.props.details.tests && this.props.details.tests.length == 1 && this.props.details.tests[0].number_of_tests && this.props.details.tests[0].number_of_tests != null ? <div style={{ marginTop: '10px' }}><h3 className="lab-fltr-dc-name fw-500 pkg-include">{this.props.details.tests[0].number_of_tests} Tests Included</h3></div>
            //                         : ''}
            //                     {this.props.details.tests && this.props.details.tests.length == 1 && this.props.details.tests[0].category_details && this.props.details.tests[0].category_details.length > 0 ?
            //                         <ul style={{ marginTop: '5px' }}>
            //                             {
            //                                 this.props.details.tests[0].category_details.map((category_detail, k) => {
            //                                     return <li className="pkg-listing-tick" key={k} id={k}>
            //                                         <img className="fltr-loc-ico" src={ASSETS_BASE_URL + "/img/checks.svg"} style={{ width: '12px', marginTop: '6px' }} />
            //                                         {category_detail.category} ({category_detail.count})
            //                                 </li>
            //                                 })
            //                             }
            //                         </ul>
            //                         : ''}
            //                 </div>
            //                 <div className="col-5 mrt-10 text-right" style={{ paddingleft: '8px' }}>
            //                     {
            //                         discounted_price && !hide_price ? <p className="text-primary fw-500 text-lg mrb-10">₹ {discounted_price}<span className="fltr-cut-price" style={{ verticalAlign: '1px' }}>₹ {mrp}</span></p> : ""
            //                     }
            //                     {
            //                         hide_price ? <p className="text-primary fw-500 text-lg mrb-10">Free</p> : ""
            //                     }

            //                     {
            //                         discounted_price != price ? <div className="signup-off-container">
            //                             <span className="signup-off-doc-green" style={{ fontSize: 12 }} >Includes coupon discount</span>
            //                         </div> : ""
            //                     }
            //                 </div>
            //                 <div className="col-12 mrt-10">
            //                     <div className="row">
            //                         <div className="col-6">
            //                             {/*<button className="fltr-cntct-btn btn-pdng"  onClick={this.openLab.bind(this, id, url)} >View Profile</button>*/}
            //                         </div>
            //                         <div className="col-6">
            //                             <button className="fltr-bkng-btn btn-pdng">Book Now</button>
            //                         </div>
            //                     </div>
            //                 </div>
            //             </div>
            //             {
            //                 this.props.details.tests && this.props.details.tests.length >= 2 ?
            //                     <div>
            //                         <ul className="fltr-labs-test-selected mrt-10">
            //                             <span className="fltr-prv-selected-test">Tests Selected</span>
            //                             {
            //                                 this.props.details.tests.map((test, i) => {
            //                                     return <li className="fltr-slected-test" key={i}>
            //                                         <label style={{ fontWeight: 400 }}>{test.name}
            //                                             {

            //                                                 show_detailsIds.indexOf(test.id) > -1 ?
            //                                                     <span style={{ 'marginLeft': '5px', marginTop: '1px', display: 'inline-block' }} onClick={this.testInfo.bind(this, test.id, id, test.url)}>
            //                                                         <img src="https://cdn.docprime.com/cp/assets/img/icons/info.svg" />
            //                                                     </span> : ''
            //                                             }
            //                                         </label>
            //                                         {
            //                                             hide_price ?
            //                                                 <p style={{ fontWeight: 400 }}>Free</p>
            //                                                 : <p style={{ fontWeight: 400 }}>&#x20B9; {test.deal_price} <span>&#x20B9; {test.mrp}</span></p>
            //                                         }
            //                                     </li>
            //                                 })
            //                             }
            //                         </ul>
            //                     </div> : ''
            //             }

            //         </div>
            //         <div className="filtr-card-footer" style={{ background: 'white' }}>
            //             <div style={{ paddingRight: "8px" }}>
            //                 {
            //                     pickup_text ? <p style={{ marginLeft: '0px' }}>* {pickup_text}</p>
            //                         : ""
            //                 }
            //             </div>

            //             <div className="text-right" style={{ marginLeft: 'auto' }}>
            //                 <img src="/assets/img/customer-icons/clock-black.svg" />
            //                 <p style={{ fontSize: '12px' }}>{buildOpenBanner(lab_timing, lab_timing_data, next_lab_timing, next_lab_timing_data)}</p>
            //             </div>
            //         </div>
            //         <div className="showBookTestListContainer">
            //             {
            //                 other_labs && other_labs.length && this.state.openViewMore ? <div className="showBookTestList">
            //                     <ul>
            //                         {
            //                             other_labs.map((olab, x) => {
            //                                 return <li key={x}>
            //                                     <p className="showBookTestListImg"> <img src="/assets/img/new-loc-ico.svg" style={{ marginRight: '8px', width: "12px" }} />{olab.address} | {Math.ceil(olab.distance / 1000)} km </p>
            //                                     <button className="showBookTestListBtn" onClick={this.bookNowClicked.bind(this, olab.id, olab.url)}>Book Now</button>
            //                                 </li>
            //                             })
            //                         }
            //                     </ul>
            //                 </div> : ""
            //             }

            //             {
            //                 other_labs && other_labs.length ? <div className="filtr-card-footer" onClick={this.toggleViewMore.bind(this)} style={{ cursor: 'pointer', borderTop: '1px solid #e8e8e8' }}>
            //                     {
            //                         this.state.openViewMore ? <div style={{ paddingRight: "8px" }}>
            //                             <p className="appBaseColor" style={{ marginLeft: '0px' }}>Show less</p>
            //                         </div> : <div style={{ paddingRight: "8px" }}>
            //                                 <p className="appBaseColor" style={{ marginLeft: '0px' }}>View {other_labs.length} more locations</p>
            //                             </div>
            //                     }

            //                     <div className="text-right" style={{ marginLeft: 'auto' }}>
            //                         {
            //                             this.state.openViewMore ? <img style={{ margin: '5px' }} className="acrd-show" src="/assets/img/customer-icons/dropdown-arrow.svg" /> : <img style={{ margin: '5px' }} className="" src="/assets/img/customer-icons/dropdown-arrow.svg" />
            //                         }
            //                     </div>
            //                 </div> : ""
            //             }

            //         </div>
            //     </div>
            // </div>
        );
    }
}

export default LabProfileCard