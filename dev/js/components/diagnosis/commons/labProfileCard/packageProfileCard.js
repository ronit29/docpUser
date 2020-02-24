import React from 'react';
import InitialsPicture from '../../../commons/initialsPicture'
import GTM from '../../../../helpers/gtm.js'

import { buildOpenBanner } from '../../../../helpers/utils.js'
import STORAGE from '../../../../helpers/storage'
import { X_OK } from 'constants';
import SnackBar from 'node-snackbar'
import CommonVipGoldBadge from '../../../commons/commonVipGoldBadge.js'
import CommonVipGoldNonLoginBadge from '../../../commons/commonVipGoldNonLoginBadge.js'

class LabProfileCard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            checked: false
        }
    }

    openLab(id, url, test_id, test_name, e) {
        this.props.clearExtraTests()
        let testIds = test_id
        // let dedupe_ids = {}
        // let testIds = this.props.selectedCriterias
        //     .reduce((final, x) => {
        //         final = final || []
        //         if (x.test && x.type == "condition") {
        //             x.test = x.test || []
        //             final = [...final, ...x.test]
        //         } else if (x.type == "test") {
        //             final.push(x)
        //         }
        //         return final
        //     }, [])
        //     .filter((x) => {
        //         if (dedupe_ids[x.id]) {
        //             return false
        //         } else {
        //             dedupe_ids[x.id] = true
        //             return true
        //         }
        //     }).map((test) => {
        //         let new_test = Object.assign({}, test)
        //         new_test.extra_test = true
        //         new_test.lab_id = id
        //         this.props.toggleDiagnosisCriteria('test', new_test, true)
        //     })
        let new_test = {}
        new_test.extra_test = true
        new_test.lab_id = id
        new_test.type = 'test'
        new_test.name = test_name
        new_test.id = test_id
        this.props.toggleDiagnosisCriteria('test', new_test, true)
        let data = {
            'Category': 'ConsumerApp', 'Action': 'RankOfLabClicked', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'rank-lab-clicked', 'Rank': this.props.rank + 1
        }
        GTM.sendEvent({ data: data })

        data = {
            'Category': 'ConsumerApp', 'Action': 'LabSelectedByUser', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'lab-selected-by-user', 'LabId': id
        }
        GTM.sendEvent({ data: data })
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

    bookNowClicked(id, url, test_id, test_name, e) {
        let slot = { time: {} }
        this.props.clearExtraTests()
        this.props.selectLabTimeSLot(slot, false)
        let selectedType = {
            r_pickup: 'home',
            p_pickup: 'home'
        }
        this.props.selectLabAppointmentType(selectedType)

        let new_test = {}
        new_test.extra_test = true
        new_test.lab_id = id
        new_test.type = 'test'
        new_test.name = test_name
        new_test.id = test_id
        this.props.toggleDiagnosisCriteria('test', new_test, true)
        let data = {
            'Category': 'ConsumerApp', 'Action': 'RankOfLabClicked', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'rank-lab-clicked', 'Rank': this.props.rank + 1
        }
        GTM.sendEvent({ data: data })

        data = {
            'Category': 'ConsumerApp', 'Action': 'LabSelectedByUser', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'lab-selected-by-user', 'LabId': id
        }
        GTM.sendEvent({ data: data })
        this.props.clearVipSelectedPlan()
        this.props.history.push(`/lab/${id}/book`)
    }


    testInfo(test_id, lab_id, test_url, isCategory, event) {
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
            this.props.history.push('/' + test_url + '?test_ids=' + test_id + '&selected_test_ids=' + selected_test_ids + '&search_id=' + search_id + '&lab_id=' + lab_id + '&lat=' + lat + '&long=' + long + '&isCategory=' + isCategory)
        } else {
            this.props.history.push('/search/testinfo?test_ids=' + test_id + '&selected_test_ids=' + selected_test_ids + '&search_id=' + search_id + '&lab_id=' + lab_id + '&lat=' + lat + '&long=' + long + '&isCategory=' + isCategory)
        }
        event.preventDefault()
        event.stopPropagation()
        let data = {
            'Category': 'ConsumerApp', 'Action': 'testInfoClick', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'test-info-click', 'pageSource': 'lab-test-page'
        }
        GTM.sendEvent({ data: data })
    }

    toggleCompare(id, lab_id, lab_thumbnail, name) {
        let selectedPkgCompareIds = []
        if (this.props.compare_packages) {
            this.props.compare_packages.map((packages, i) => {
                selectedPkgCompareIds.push(packages.id)
            })
        }
        if (selectedPkgCompareIds.indexOf(id) == -1 && selectedPkgCompareIds.length >= 5) {
            SnackBar.show({ pos: 'bottom-center', text: "Max 5 packages can be compared" });
        } else {
            let data = {
                'Category': 'ConsumerApp', 'Action': 'AddedToCompare', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'added-to-compare', 'LabId': lab_id, 'testId': id
            }
            GTM.sendEvent({ data: data })
            this.props.toggleComparePackages(id, lab_id, lab_thumbnail, name)
        }
    }

    goldClicked() {
        let data = {
            'Category': 'ConsumerApp', 'Action': 'VipGoldClicked', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'vip-package-gold-clicked'
        }
        GTM.sendEvent({ data: data })
        this.props.history.push('/vip-gold-details?is_gold=true&source=packagegoldlisting&lead_source=Docprime')
    }

    render() {
        let { discounted_price, price, lab, distance, pickup_available, lab_timing, lab_timing_data, mrp, next_lab_timing, next_lab_timing_data, distance_related_charges, pickup_charges, name, id, number_of_tests, show_details, categories, category_details, address, included_in_user_plan, insurance, vip } = this.props.details;
        distance = Math.ceil(distance / 1000);
        var openingTime = ''
        if (this.props.details.lab_timing) {
            openingTime = this.props.details.lab_timing.split('-')[0];
        }

        let pickup_text = ""
        if (pickup_available == 1 && distance_related_charges == 1) {
            pickup_text = "Home pickup charges applicable"
        }

        if (pickup_available == 1 && !distance_related_charges) {
            pickup_text = "Inclusive of home visit charges"
            discounted_price = parseInt(discounted_price) + parseInt(pickup_charges)
        }

        if (pickup_available == 0) {
            pickup_text = "Center visit required"
        }

        let hide_price = false
        // if (this.props.selectedCriterias && this.props.selectedCriterias.length) {
        //     this.props.selectedCriterias.map((x) => {
        //         if (x.hide_price) {
        //             hide_price = true
        //         }
        //     })
        // }
        let offPercent = ''
        if (mrp && discounted_price && (discounted_price < mrp)) {
            offPercent = parseInt(((mrp - discounted_price) / mrp) * 100);
        }

        if (included_in_user_plan) {
            hide_price = true
        }
        let selectedPkgCompareIds = []
        if (this.props.compare_packages) {
            this.props.compare_packages.map((packages, i) => {
                selectedPkgCompareIds.push(packages.id, packages.lab_id)
            })
        }
        let is_insurance_applicable = false
        if (insurance && insurance.is_insurance_covered && insurance.is_user_insured) {
            is_insurance_applicable = true
        }
        // let is_vip_applicable = vip.is_vip_member && vip.covered_under_vip
        // let vip_amount = vip.vip_amount

        let is_vip_applicable = false
        let vip_amount
        let is_enable_for_vip = false
        let is_vip_gold = false

        if (vip && Object.keys(vip).length > 0) {
            is_vip_applicable = vip.is_vip_member && vip.covered_under_vip
            vip_amount = vip.vip_amount
            is_vip_gold = vip.is_gold_member
        }


        let is_labopd_enable_for_vip = vip.is_enable_for_vip
        let is_labopd_enable_for_gold = vip.is_gold
        let is_vip_member = vip.is_vip_member
        let is_gold_member = vip.is_gold_member
        let covered_under_vip = vip.covered_under_vip

        let show_common_prices = !is_labopd_enable_for_vip || ((is_gold_member || is_vip_member) && !covered_under_vip)

        return (
            <div className="pkg-card-container mb-3">
                {!this.props.isCompared && (this.props.isCompare || this.props.compare_packages.length > 0) ?
                    <div className={selectedPkgCompareIds.indexOf(id) > -1 && selectedPkgCompareIds.indexOf(lab.id) > -1 ? 'pkg-crd-header pkg-crd-green ' : 'pkg-crd-header '} style={{ padding: '5px' }}>
                        <label className="ck-bx">{selectedPkgCompareIds.indexOf(id) > -1 && selectedPkgCompareIds.indexOf(lab.id) > -1 ? 'Added' : 'Add to compare'}
                            <input type="checkbox" onClick={this.toggleCompare.bind(this, id, lab.id, lab.lab_thumbnail, name)} checked={selectedPkgCompareIds.indexOf(id) > -1 && selectedPkgCompareIds.indexOf(lab.id) > -1 ? true : false} />
                            <span className="checkmark"></span>
                        </label>
                    </div>
                    : ''
                }
                <div className="pkg-content-section">
                    {/* {
                        !is_insurance_applicable && !hide_price && offPercent && offPercent > 0 ?
                            <span className="pkg-ofr-ribbon fw-700">{offPercent}% OFF</span> : ''
                    } */}
                    {/* <div className="pkg-card-location p-relative">
                        <p><img className="fltr-loc-ico" src={ASSETS_BASE_URL + "/img/new-loc-ico.svg"} style={{ width: '12px', height: '18px' }} /> {lab.locality} {lab.city} </p><span className="kmTrunate"> | {distance} Km</span>
                    </div> */}
                    <div className="pkg-card-content m-0" style={{ paddingBottom: 10 }}>
                        <div className="row no-gutters" >
                            <div className="col-8">
                                <div className="pkg-cardleft-img nw-pkg-crd-img">
                                    <InitialsPicture name={lab.name} has_image={!!lab.lab_thumbnail} className="initialsPicture-ls">
                                        <img className="fltr-usr-image-lab" src={lab.lab_thumbnail} />
                                    </InitialsPicture>
                                    <div className="thy-sub-icon">
                                        {pickup_available == 1 && distance_related_charges == 0 && lab.is_home_collection_enabled && lab.home_pickup_charges == 0 ?
                                            <div className="test-pkup">
                                                <img src={ASSETS_BASE_URL + "/img/laby1.svg"} />
                                                <p>Free Sample <span className="tstblk">Collection</span></p>
                                            </div>
                                            : ''
                                        }
                                        {lab && lab.is_thyrocare ?
                                            <div className="test-pkup">
                                                <img src={ASSETS_BASE_URL + "/img/laby3.svg"} />
                                                <p>Integrated <span className="tstblk">Lab</span></p>
                                            </div>
                                            : ''}
                                    </div>
                                </div>
                                <a href={`/${this.props.details.url || ''}`} onClick={this.testInfo.bind(this, id, this.props.details.lab.id, this.props.details.url ? this.props.details.url : '', false)}>
                                    <h2 className="pkg-labDoc-Name">{name} {show_details ?
                                        <span style={{ 'marginLeft': '5px', marginTop: '2px', display: 'inline-block', cursor: 'pointer' }} onClick={
                                            this.testInfo.bind(this, id, this.props.details.lab.id, this.props.details.url ? this.props.details.url : '', false)
                                            // this.props.history.push(`/${this.props.details.url || ''}`)
                                        }>
                                            <img src="https://cdn.docprime.com/cp/assets/img/icons/Info.svg" style={{ width: '15px' }} />
                                        </span> : ''}
                                    </h2>
                                </a>
                                {
                                    number_of_tests > 0 ?
                                        <h3 className="lab-fltr-dc-name fw-500 pkg-include" style={{ fontSize: '12px' }}>{number_of_tests ? `${number_of_tests} Tests Included` : ''}
                                        </h3>
                                        : ''
                                }
                            </div>
                            <div className="col-4 booking-column">
                                <div className="pkg-card-price text-right">
                                    {
                                        (!is_vip_applicable || !vip.is_gold_member) && false ?
                                            <p className="dc-prc">Docprime Price</p>
                                            : ''
                                    }
                                    {(!is_insurance_applicable && !show_common_prices) ?
                                        <CommonVipGoldBadge is_labopd_enable_for_vip={is_labopd_enable_for_vip} is_labopd_enable_for_gold={is_labopd_enable_for_gold} is_vip_member={is_vip_member} is_gold_member={is_gold_member} covered_under_vip={covered_under_vip} vip_data={vip} {...this.props} mrp={mrp} discounted_price={discounted_price} goldClicked={this.goldClicked.bind(this)} is_package={true} />
                                        : ''
                                    }
                                    {
                                        /*    is_vip_applicable && !vip.is_gold_member?
                                            <div className="text-right mb-2">
                                                <img className="vip-main-ico img-fluid" src={ASSETS_BASE_URL + '/img/viplog.png'} />
                                            </div>
                                        :''*/
                                    }
                                    {
                                        /*vip.is_gold_member?
                                            <div className="text-right mb-2">
                                                <img className="vip-main-ico img-fluid" src={ASSETS_BASE_URL + '/img/gold-sm.png'} />
                                            </div>
                                            : ''*/
                                    }
                                    {
                                        /*vip.is_gold_member?
                                            <p className="fw-500">₹ {parseInt(vip.vip_convenience_amount+vip.vip_amount)}
                                                <span className="pkg-cut-price">₹ {parseInt(mrp)}</span>
                                            </p>
                                        :''*/
                                    }
                                    {
                                        /*is_vip_applicable && !vip.is_gold_member?
                                            <p className="fw-500">₹ {parseInt(vip_amount)}
                                                <span className="pkg-cut-price">₹ {parseInt(mrp)}</span>
                                            </p>
                                        :''*/
                                    }

                                    {
                                        !is_insurance_applicable && !hide_price && discounted_price && show_common_prices ?
                                            parseInt(discounted_price) != parseInt(mrp) ?
                                                <p className="fw-500">₹ {parseInt(discounted_price)}
                                                    <span className="pkg-cut-price">₹ {parseInt(mrp)}</span></p>
                                                : <p className="fw-500">₹ {parseInt(discounted_price)}</p>
                                            : ''
                                    }

                                    {
                                        hide_price ? <p className="fw-500">₹ 0</p> : ""
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
                                        !is_insurance_applicable && !hide_price && offPercent && offPercent > 0 && show_common_prices ?
                                            <p className="dc-cpn-include">{offPercent}% Off
                                                {!is_insurance_applicable && !included_in_user_plan && discounted_price != price ?
                                                    <span>(includes Coupon)</span>
                                                    : ''}
                                            </p>
                                            : ''
                                    }

                                    {
                                        /*!is_insurance_applicable && !is_vip_applicable && discounted_price>(vip.vip_convenience_amount||0 + vip.vip_gold_price||0) && !vip.is_gold_member ? <div className="d-flex align-items-center justify-content-end goldCard" onClick={() => this.goldClicked()}>
                                           
                                            <img className="gld-cd-icon" src={ASSETS_BASE_URL + '/img/gold-sm.png'}/> 
                                            <p className="gld-p-rc">Price</p> <span className="gld-rate-lf">₹ {vip.vip_convenience_amount+ vip.vip_gold_price}</span><img style={{transform: 'rotate(-90deg)', width: '10px'}} src={ASSETS_BASE_URL + '/img/customer-icons/dropdown-arrow.svg'}/>
                                            
                                        </div>
                                        :''*/
                                    }
                                </div>
                                {(!is_insurance_applicable && !show_common_prices) ?
                                    <CommonVipGoldNonLoginBadge is_labopd_enable_for_vip={is_labopd_enable_for_vip} is_labopd_enable_for_gold={is_labopd_enable_for_gold} is_vip_member={is_vip_member} is_gold_member={is_gold_member} covered_under_vip={covered_under_vip} vip_data={vip} {...this.props} mrp={mrp} discounted_price={discounted_price} goldClicked={this.goldClicked.bind(this)} is_package={true} />
                                    : ''
                                }
                                <a href={`/${this.props.details.lab.url}`} onClick={(e) => e.preventDefault()}>
                                    <button className="pkg-btn-nw" style={{ width: '100%', marginBottom: 0 }} onClick={this.bookNowClicked.bind(this, this.props.details.lab.id, this.props.details.lab.url, id, name)}>Book Now</button>
                                </a>
                                {/*
                                    !is_insurance_applicable && !included_in_user_plan && discounted_price != price ? <p className="pkg-discountCpn">Includes coupon</p>
                                        : ""
                                */}
                                {
                                    included_in_user_plan && !is_insurance_applicable ?
                                        <p className="pkg-discountCpn">Docprime Care Benefit</p>
                                        : ''
                                }
                            </div>
                        </div>
                    </div>

                    <div className="pkg-includes-container">
                        {category_details && category_details.length > 0 ?
                            <ul>
                                {
                                    category_details.map((category_detail, k) => {
                                        return <li className="pkgIncludeList" key={k} id={k} style={{ cursor: 'pointer' }} onClick={this.testInfo.bind(this, id, this.props.details.lab.id, this.props.details.url ? this.props.details.url : '', true)}>
                                            {category_detail.icon ?
                                                <img style={{ width: '20px', marginRight: '5px' }} src={category_detail.icon} />
                                                : ''}
                                            <span className="fw-500">{category_detail.name} {category_detail.parameter_count > 1 ? `(${category_detail.parameter_count})` : ''} </span>
                                        </li>
                                    })
                                }
                            </ul>
                            : ''}
                    </div>
                    <div className="pkg-crd-foot-img-text pkg-new-time-sl">
                        <img src={ASSETS_BASE_URL + "/img/watch-date.svg"} style={{ marginTop: '0px', width: '15px' }} />
                        <p>{buildOpenBanner(lab_timing, lab_timing_data, next_lab_timing, next_lab_timing_data)}</p>
                    </div>
                </div>
                <div className="cstmCardFooter">
                    <div className="pkg-crd-foot-img-text">
                        <img src={ASSETS_BASE_URL + "/img/new-loc-ico.svg"} style={{ width: '10px' }} />
                        <p>{lab.locality} {lab.city}</p>
                    </div>
                    {/*<div className="pkg-crd-foot-img-text">
                        <img src={ASSETS_BASE_URL + "/img/infoerror.svg"} style={{ marginTop: '2px', width: '15px' }} />
                        {pickup_text ? <p>{pickup_text}</p> : ""}
                    </div>*/}
                    {/* <div className="pkg-crd-foot-img-text">
                        <img src={ASSETS_BASE_URL + "/img/watch-date.svg"} style={{ marginTop: '2px', width: '15px' }} />
                        <p>{buildOpenBanner(lab_timing, lab_timing_data, next_lab_timing, next_lab_timing_data)}</p>
                    </div> */}
                    <div className="cstmDocLoc"><p className=""><img src={ASSETS_BASE_URL + "/img/cstmdist.svg"} />{distance} km</p></div>
                </div>
            </div>
        );
    }
}


export default LabProfileCard
