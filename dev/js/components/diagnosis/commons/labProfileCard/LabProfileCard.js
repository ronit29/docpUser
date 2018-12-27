import React from 'react';
import InitialsPicture from '../../../commons/initialsPicture'
import GTM from '../../../../helpers/gtm.js'

import { buildOpenBanner } from '../../../../helpers/utils.js'
import STORAGE from '../../../../helpers/storage'
import { X_OK } from 'constants';

class LabProfileCard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            openViewMore: false
        }
    }

    toggleViewMore() {
        this.setState({ openViewMore: !this.state.openViewMore })
    }

    openLab(id, url, e) {
        let dedupe_ids = {}
        let testIds = this.props.selectedCriterias
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

    render() {

        let { price, lab, distance, is_home_collection_enabled, lab_timing, lab_timing_data, mrp, next_lab_timing, next_lab_timing_data, distance_related_charges, pickup_charges, address, name, lab_thumbnail, other_labs, id, url } = this.props.details;

        distance = Math.ceil(distance / 1000);

        let pickup_text = ""
        if (is_home_collection_enabled && distance_related_charges == 1) {
            pickup_text = "Home pickup charges applicable"
        }

        if (is_home_collection_enabled && !distance_related_charges) {
            pickup_text = "Inclusive of home visit charges"
            price = price + pickup_charges
        }

        let offPercent = ''
        if (mrp && price && (price < mrp)) {
            offPercent = parseInt(((mrp - price) / mrp) * 100);
        }

        return (

            <div className="col-12">
                <div className="filter-card-dl mb-3">
                    <div className="fltr-crd-top-container">
                        <div className="fltr-lctn-dtls">
                            <p><img className="fltr-loc-ico" src="/assets/img/customer-icons/map-marker-blue.svg" style={{ width: '12px', height: '18px' }} /><span className="fltr-loc-txt">{address}</span><span>&nbsp;|&nbsp;{distance} Km</span></p>
                        </div>
                        <div className="row no-gutters mrt-10">
                            <div className="col-12">
                                <a href="/dr-gaurav-gupta-dentist-implantologist-general-physician-in-sector-11-gurgaon-dpp">
                                    <h2 className="lab-fltr-dc-name fw-500 text-md">{name}</h2>
                                </a>
                                {
                                    offPercent && offPercent > 0 ?
                                        <span className="filtr-offer ofr-ribbon fw-700">{offPercent}% OFF</span> : ''
                                }
                            </div>
                            <div className="col-7 mrt-10">
                                <div className="img-nd-dtls">
                                    <div className="text-center">
                                        <InitialsPicture name={name} has_image={!!lab_thumbnail} className="initialsPicture-ls">
                                            <img className="fltr-usr-image-lab" src={lab_thumbnail} />
                                        </InitialsPicture>
                                    </div>
                                    <div style={{ marginLeft: '8px' }}></div>
                                </div>
                            </div>
                            <div className="col-5 mrt-10 text-right" style={{ paddingleft: '8px' }}>
                                {
                                    price ? <p className="text-primary fw-500 text-lg mrb-10">₹ {price}<span className="fltr-cut-price" style={{ verticalAlign: '1px' }}>₹ {mrp}</span></p> : ""
                                }

                                {
                                    STORAGE.checkAuth() || price < 100 ? "" : <div className="signup-off-container"><span className="signup-off-doc" style={{ fontSize: '12px' }}>+ ₹ 100 OFF <b>on Signup</b> </span></div>
                                }
                                <button className="fltr-bkng-btn" style={{ width: '100%' }} onClick={this.openLab.bind(this, id, url)}>Book Now</button>
                            </div>
                        </div>
                        {
                            this.props.details.tests && this.props.details.tests.length >= 1 ?
                                <div>
                                    <ul className="fltr-labs-test-selected mrt-10">
                                        <span className="fltr-prv-selected-test">Tests Selected</span>
                                        {
                                            this.props.details.tests.map((test, i) => {
                                                return <li className="fltr-slected-test" key={i}>
                                                    <label style={{ fontWeight: 400 }}>{test.name}</label>
                                                    <p style={{ fontWeight: 400 }}>&#x20B9; {test.deal_price} <span>&#x20B9; {test.mrp}</span></p>
                                                </li>
                                            })
                                        }
                                    </ul>
                                </div> : ''
                        }

                    </div>
                    <div className="filtr-card-footer" style={{ background: 'white' }}>
                        <div style={{ paddingRight: "8px" }}>
                            {
                                pickup_text ? <p style={{ marginLeft: '0px;' }}>* {pickup_text}</p>
                                    : ""
                            }
                        </div>

                        <div className="text-right" style={{ marginLeft: 'auto;' }}>
                            <img src="/assets/img/customer-icons/clock-black.svg" />
                            <p style={{ fontSize: '12px' }}>{buildOpenBanner(lab_timing, lab_timing_data, next_lab_timing, next_lab_timing_data)}</p>
                        </div>
                    </div>
                    <div className="showBookTestListContainer">
                        {
                            other_labs && other_labs.length && this.state.openViewMore ? <div className="showBookTestList">
                                <ul>
                                    {
                                        other_labs.map((olab, x) => {
                                            return <li key={x}>
                                                <p className="showBookTestListImg"> <img src="/assets/img/new-loc-ico.svg" style={{ marginRight: '8px', width: "12px" }} />{olab.address} | {Math.ceil(olab.distance / 1000)} km </p>
                                                <button className="showBookTestListBtn" onClick={this.openLab.bind(this, olab.id, olab.url)}>Book Now</button>
                                            </li>
                                        })
                                    }
                                </ul>
                            </div> : ""
                        }

                        {
                            other_labs && other_labs.length ? <div className="filtr-card-footer" onClick={this.toggleViewMore.bind(this)}>
                                {
                                    this.state.openViewMore ? <div style={{ paddingRight: "8px" }}>
                                        <p style={{ marginLeft: '0px;' }}>Show less</p>
                                    </div> : <div style={{ paddingRight: "8px" }}>
                                            <p style={{ marginLeft: '0px;' }}>View {other_labs.length} more locations</p>
                                        </div>
                                }

                                <div className="text-right" style={{ marginLeft: 'auto;' }}>
                                    {
                                        this.state.openViewMore ? <img class="acrd-show" src="/assets/img/customer-icons/dropdown-arrow.svg" /> : <img class="" src="/assets/img/customer-icons/dropdown-arrow.svg" />
                                    }
                                </div>
                            </div> : ""
                        }

                    </div>
                </div>
            </div>

        );
    }
}

export default LabProfileCard