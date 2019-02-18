import React from 'react';
import InitialsPicture from '../../../commons/initialsPicture'
import GTM from '../../../../helpers/gtm.js'

import { buildOpenBanner } from '../../../../helpers/utils.js'
import STORAGE from '../../../../helpers/storage'
import { X_OK } from 'constants';

class LabProfileCard extends React.Component {
    constructor(props) {
        super(props)
    }

    openLab(id, url, test_id, test_name, e) {
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
    testInfo(test_id, event) {
        let lab_id = this.props.details.lab.id
        // let selected_test_ids = this.props.lab_test_data[this.props.selectedLab] || []
        // selected_test_ids = selected_test_ids.map(x => x.id)
        let selected_test_ids = test_id
        this.props.history.push('/search/testinfo?test_ids=' + test_id + '&selected_test_ids=' + selected_test_ids + '&lab_id=' + lab_id + '&from=searchbooknow')
        event.stopPropagation()
        let data = {
            'Category': 'ConsumerApp', 'Action': 'testInfoClick', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'test-info-click', 'pageSource': 'lab-test-page'
        }
        GTM.sendEvent({ data: data })
    }
    render() {

        let { discounted_price, price, lab, distance, pickup_available, lab_timing, lab_timing_data, mrp, next_lab_timing, next_lab_timing_data, distance_related_charges, pickup_charges, name, id, number_of_tests, show_details, categories } = this.props.details;
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

        // let hide_price = false
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
        return (
            <div className="filter-card-dl mb-3">
                <div className="fltr-crd-top-container">
                    <div className="fltr-lctn-dtls">
                        <p>
                            <img className="fltr-loc-ico" style={{ width: 12, height: 18 }} src={ASSETS_BASE_URL + "/img/customer-icons/map-marker-blue.svg"} />
                            <span className="fltr-loc-txt">{lab.locality} {lab.city} </span> |
                            <span> {distance} Km</span>
                        </p>
                    </div>
                    <div className="row no-gutters" style={{ cursor: 'pointer' }} onClick={this.openLab.bind(this, this.props.details.lab.id, this.props.details.lab.url, id, name)}>
                        <div className="col-12 mrt-10">
                            <a>
                                <h2 className="lab-fltr-dc-name fw-500" style={{ fontSize: '16px', paddingLeft: '8px', paddingRight: '110px' }}>{name} {show_details ?
                                    <span style={{ 'marginLeft': '5px', marginTop: '4px', display: 'inline-block' }} onClick={this.testInfo.bind(this, id)}>
                                        <img src="https://cdn.docprime.com/cp/assets/img/icons/info.svg" />
                                    </span> : ''}
                                </h2>
                                <h3 className="lab-fltr-dc-name fw-500 pkg-include">{number_of_tests ? `${number_of_tests} Tests Included` : ''} </h3>
                                {/*<h2 className="lab-fltr-dc-name fw-500" style={{ fontSize: '16px', paddingLeft: '8px', paddingRight: '110px' }}>{lab.name}</h2>*/}
                            </a>
                            {
                                offPercent && offPercent > 0 ?
                                    <span className="filtr-offer ofr-ribbon fw-700">{offPercent}% OFF</span> : ''
                            }
                        </div>
                        <div className="col-7 mrt-10">
                            <div className="img-nd-dtls" style={{ alignItems: 'flex-start' }}>
                                <div className="fltr-crd-img text-center" style={{ width: '60px' }}>

                                    <InitialsPicture name={lab.name} has_image={!!lab.lab_thumbnail} className="initialsPicture-ls">
                                        <img className="fltr-usr-image-lab" src={lab.lab_thumbnail} />
                                    </InitialsPicture>
                                    {/*<span className="fltr-rtng">Verified</span>*/}
                                </div>
                                {/*<div className="crd-dctr-dtls">
                                        <h3 className="fw-500">General Physician</h3>
                                        <h3 className="fw-500">15 Years of Experience</h3>
                                    </div>*/}
                            </div>
                            {categories.length > 0 ?
                                <ul style={{ marginTop: '5px' }}>
                                    {
                                        categories.map((category, k) => {
                                            return <li className="pkg-listing-tick" key={k} id={category.id}>
                                                <img className="fltr-loc-ico" src={ASSETS_BASE_URL + "/img/checks.svg"} style={{ width: '12px', marginTop: '6px' }} />
                                                {category.name}
                                            </li>
                                        })
                                    }
                                </ul>
                                : ''}
                        </div>
                        <div className="col-5 mrt-10 text-right" style={{ paddingLeft: '8px' }}>
                            {
                                discounted_price ? <p className="fltr-prices" style={{ marginTop: '4px' }}>₹ {parseInt(discounted_price)}
                                    <span className="fltr-cut-price">₹ {parseInt(mrp)}</span></p> : ''
                            }
                            {
                                discounted_price != price ? <div className="signup-off-container">
                                    <span className="signup-off-doc-green" style={{ fontSize: 12 }} >Includes coupon discount</span>
                                </div> : ""
                            }
                            <button className="fltr-bkng-btn" style={{ width: '100%' }}>Book Now</button>
                        </div>
                    </div>
                    {
                        this.props.details.tests && this.props.details.tests.length >= 2 ?
                            <div>
                                <ul className="fltr-labs-test-selected mrt-10">
                                    <span className="fltr-prv-selected-test">Tests Selected</span>
                                    {
                                        this.props.details.tests.map((test, i) => {
                                            return <li className="fltr-slected-test" key={i}>
                                                <label style={{ fontWeight: 400 }}>{test.name}</label>
                                                <p style={{ fontWeight: 400 }}>&#x20B9; {test.price} <span>&#x20B9; {test.mrp}</span></p>
                                            </li>
                                        })
                                    }
                                </ul>
                            </div> : ''
                    }
                </div>
                <div className="filtr-card-footer">
                    <div><img src="https://qacdn.docprime.com/cp/assets/img/customer-icons/home.svg" />
                        {pickup_text ? <h3 className="mrb-0">{pickup_text}</h3> : ""}
                    </div>
                    <div className="text-right"><img src="https://qacdn.docprime.com/cp/assets/img/customer-icons/clock-black.svg" />
                        <p>
                            <span>{buildOpenBanner(lab_timing, lab_timing_data, next_lab_timing, next_lab_timing_data)}</span>
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}


export default LabProfileCard
