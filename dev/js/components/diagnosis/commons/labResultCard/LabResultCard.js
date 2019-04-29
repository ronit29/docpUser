import React from 'react';
import GTM from '../../../../helpers/gtm.js'
import STORAGE from '../../../../helpers/storage'
import InitialsPicture from '../../../commons/initialsPicture'
import { buildOpenBanner } from '../../../../helpers/utils.js'

class LabResultCard extends React.Component {
    constructor(props) {
        super(props)
    }

    openLab(id, url, e) {
        let dedupe_ids = {}
        this.props.clearExtraTests()
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

        let { price, lab, distance, pickup_available, lab_timing, lab_timing_data, mrp, next_lab_timing, next_lab_timing_data, distance_related_charges, pickup_charges } = this.props.details;

        distance = Math.ceil(distance / 1000);

        var openingTime = ''
        if (this.props.details.lab_timing) {
            openingTime = this.props.details.lab_timing.split('-')[0];
        }

        let pickup_text = ""
        if (lab.is_home_collection_enabled && distance_related_charges == 1) {
            pickup_text = "Home pickup charges applicable"
        }

        if (lab.is_home_collection_enabled && !distance_related_charges) {
            pickup_text = "Inclusive of home visit charges"
            price = price + pickup_charges
        }

        let offPercent = ''
        if (mrp && price && (price < mrp)) {
            offPercent = parseInt(((mrp - price) / mrp) * 100);
        }
        let hide_price = false
        if(this.props.test_data){
            this.props.test_data.map((test) => {
                if(test.hide_price){
                    hide_price = true
                }
            })
        }
        return (
            <div className="filter-card-dl mb-3">
                <div className="fltr-crd-top-container">
                    <div className="fltr-lctn-dtls">
                        <p>
                            <img className="fltr-loc-ico" style={{ width: 12, height: 18 }} src={ASSETS_BASE_URL + "/img/customer-icons/map-marker-blue.svg"} />
                            <span className="fltr-loc-txt">{lab.locality}{lab.locality ? "," : ""} {lab.city}</span>
                            <span>&nbsp;|&nbsp;{distance} Km</span>
                        </p>
                    </div>
                    <div className="row no-gutters mrt-10" onClick={this.openLab.bind(this, this.props.details.lab.id, this.props.details.lab.url)}>
                        <div className="col-12">
                            <a>
                                <h2 className="lab-fltr-dc-name fw-500 text-md" style={{ color: '#000' }}>{lab.name}</h2>
                            </a>
                            {
                                !hide_price && offPercent && offPercent > 0 ?
                                    <span className="filtr-offer ofr-ribbon fw-700">{offPercent}% OFF</span> : ''
                            }
                        </div>
                        <div className="col-7 mrt-10">
                            <div className="img-nd-dtls">
                                <div className="text-center">
                                    <InitialsPicture name={lab.name} has_image={!!lab.lab_thumbnail} className="initialsPicture-ls">
                                        <img className="fltr-usr-image-lab" src={lab.lab_thumbnail} />
                                    </InitialsPicture>
                                </div>
                                <div style={{ marginLeft: '8px',marginRight: '8px' }}>
                                    {
                                        this.props.details.tests && this.props.details.tests.length == 1 ?
                                            <p style={{ color: '#000', fontSize: 14, fontWeight: 400 }}>{this.props.details.tests[0].name}</p> : ''
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="col-5 mrt-10 text-right" style={{ paddingLeft: 8 }} >
                            {
                                price && !hide_price? <p className="text-primary fw-500 text-lg mrb-10">&#8377; {price}<span className="fltr-cut-price" style={{ verticalAlign: '1px' }} >&#8377; {mrp}</span></p> : ''
                            }
                            {
                               hide_price? <p className="text-primary fw-500 text-lg mrb-10">Free</p>:''
                            }
                            {
                                STORAGE.checkAuth() || price < 100 ?
                                    ''
                                    : <div className="signup-off-container">
                                        <span className="signup-off-doc" style={{ fontSize: 12 }} >+ ₹ 100 OFF <b>on Signup</b> </span>
                                    </div>
                            }
                            <button className="fltr-bkng-btn" style={{ width: '100%' }} >Book Now</button>
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
                                                {
                                                    hide_price?
                                                    <p style={{ fontWeight: 400 }}>Free</p>
                                                    :<p style={{ fontWeight: 400 }}>&#x20B9; {test.deal_price} <span>&#x20B9; {test.mrp}</span></p>
                                                }
                                            </li>
                                        })
                                    }
                                </ul>
                            </div> : ''
                    }
                </div>
                <div className="filtr-card-footer">
                    {
                        pickup_text ? <div style={{ paddingRight: 8 }}>
                            <p style={{ marginLeft: 0 }}>* {pickup_text}</p>
                        </div> : ""
                    }
                    <div className="text-right" style={{ marginLeft: 'auto' }}>
                        <img src={ASSETS_BASE_URL + "/img/customer-icons/clock-black.svg"} />
                        {buildOpenBanner(lab_timing, lab_timing_data, next_lab_timing, next_lab_timing_data)}
                    </div>
                </div>
            </div>
        );
    }
}

export default LabResultCard