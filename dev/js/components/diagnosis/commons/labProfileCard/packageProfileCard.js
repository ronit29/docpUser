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
    testInfo(test_id) {
        let lab_id = this.props.details.lab.id
        // let selected_test_ids = this.props.lab_test_data[this.props.selectedLab] || []
        // selected_test_ids = selected_test_ids.map(x => x.id)
        let selected_test_ids = test_id
        this.props.history.push('/search/testinfo?test_ids=' + test_id + '&selected_test_ids=' + selected_test_ids + '&lab_id=' + lab_id + '&from=searchbooknow')
        let data = {
            'Category': 'ConsumerApp', 'Action': 'testInfoClick', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'test-info-click', 'pageSource': 'lab-test-page'
        }
        GTM.sendEvent({ data: data })
    }
    render() {
        let { discounted_price, price, lab, distance, pickup_available, lab_timing, lab_timing_data, mrp, next_lab_timing, next_lab_timing_data, distance_related_charges, pickup_charges, name, id, number_of_tests, show_details, categories, category_details, address } = this.props.details;
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
            <div className="pkg-card-container mb-3">
                <div className="pkg-content-section">
                    {
                        offPercent && offPercent > 0 ?
                            <span className="pkg-ofr-ribbon fw-700">{offPercent}% OFF</span> : ''
                    }
                    <div className="pkg-card-location p-relative">
                        <p><img className="fltr-loc-ico" src="/assets/img/new-loc-ico.svg" style={{ width: '12px', height: '18px' }} /> {lab.locality} {lab.city} </p><span className="kmTrunate"> | {distance} Km</span>
                    </div>
                    <div className="pkg-card-content">
                        <div className="row no-gutters" onClick={this.openLab.bind(this, this.props.details.lab.id, this.props.details.lab.url, id, name)}>
                            <div className="col-8">
                                <div className="pkg-cardleft-img">
                                    <InitialsPicture name={lab.name} has_image={!!lab.lab_thumbnail} className="initialsPicture-ls">
                                        <img className="fltr-usr-image-lab" src={lab.lab_thumbnail} />
                                    </InitialsPicture>
                                </div>
                                <a href={this.props.details.url || ''} onClick={(e) => {
                                    e.preventDefault()
                                    e.stopPropagation()
                                    this.props.history.push(`/${this.props.details.url || ''}`)
                                }}>
                                    <h2 className="pkg-labDoc-Name">{name} {show_details ?
                                        <span style={{ 'marginLeft': '5px', marginTop: '2px', display: 'inline-block', cursor: 'pointer' }} onClick={(e) => {
                                            e.preventDefault()
                                            e.stopPropagation()
                                            // this.testInfo(id)
                                            this.props.history.push(`/${this.props.details.url || ''}`)
                                        }}>
                                            <img src="https://cdn.docprime.com/cp/assets/img/icons/info.svg" />
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
                            <div className="col-4">
                                <div className="pkg-card-price">
                                    {
                                        discounted_price ? <p className="fw-500">₹ {parseInt(discounted_price)}
                                            <span className="pkg-cut-price">₹ {parseInt(mrp)}</span></p> : ''
                                    }
                                </div>
                                <a href={this.props.details.lab.url} onClick={(e) => e.preventDefault()}>
                                    <button className="pkg-btn-nw" style={{ width: '100%' }}>Book Now</button>
                                </a>
                                {
                                    discounted_price != price ? <p className="pkg-discountCpn">Includes coupon</p>
                                        : ""
                                }
                            </div>
                        </div>
                    </div>
                    <div className="pkg-includes-container">
                        {category_details && category_details.length > 0 ?
                            <ul>
                                {
                                    category_details.map((category_detail, k) => {
                                        return <li className="pkgIncludeList" key={k} id={k} onClick={this.openLab.bind(this, this.props.details.lab.id, this.props.details.lab.url, id, name)}>
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
                </div>
                <div className="pkg-crd-footer">
                    <div className="pkg-crd-foot-img-text">
                        <img src={ASSETS_BASE_URL + "/img/infoerror.svg"} style={{ marginTop: '2px', width: '15px' }} />
                        {pickup_text ? <p>{pickup_text}</p> : ""}
                    </div>
                    <div className="pkg-crd-foot-img-text">
                        <img src={ASSETS_BASE_URL + "/img/watch-date.svg"} style={{ marginTop: '2px', width: '15px' }} />
                        <p>{buildOpenBanner(lab_timing, lab_timing_data, next_lab_timing, next_lab_timing_data)}</p>
                    </div>
                </div>
            </div>
        );
    }
}


export default LabProfileCard
