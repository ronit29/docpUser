import React from 'react';
import InitialsPicture from '../../../commons/initialsPicture'
import GTM from '../../../../helpers/gtm.js'

import { buildOpenBanner } from '../../../../helpers/utils.js'

class LabProfileCard extends React.Component {
    constructor(props) {
        super(props)
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

        return (
            <div className="lab-rslt-card-link mrb-20" onClick={this.openLab.bind(this, this.props.details.lab.id, this.props.details.lab.url)}>
                <div className="widget card lab-rslt-card">
                    <div className="widget-content card-content book-card" style={{ paddingBottom: 0 }} >
                        <div className="logo-ratting">
                            <span className="ct-img lab-icon">
                                <InitialsPicture name={lab.name} has_image={!!lab.lab_thumbnail} className="initialsPicture-ls">
                                    <img src={lab.lab_thumbnail} className="img-fluid" style={{ maxWidth: 90, maxHeight: 60 }} />
                                </InitialsPicture>
                            </span>

                            {
                                pickup_available == 0 ? "" : <p className='fw-500' style={{ fontSize: 10, color: '#757575', marginTop: 2 }} >FREE HOME PICKUP</p>
                            }
                        </div>
                        <div className="book-card-content">
                            <a href={this.props.details.lab.url ? `/${this.props.details.lab.url}` : `/lab/${this.props.details.lab.id}`}>
                                <h2 className="book-cart-title">{lab.name}</h2>
                            </a>
                            <p className="fw-500" style={{ color: '#343434', fontSize: 14, marginBottom: 8 }} >Radiology | Pathology</p>
                            <div style={{ display: 'flex', flexWrap: 'wrap', minWidth: 0 }} >
                                <p className="lab-locality">

                                    {lab.locality} {lab.city}&nbsp;|
                                </p>
                                <div style={{ width: 60, marginLeft: 4, marginBottom: 8, alignSelf: 'center' }}>
                                    <span><img src={ASSETS_BASE_URL + "/img/icons/location-orange.svg"} style={{ marginRight: 4, verticalAlign: '-1px' }} /></span><span className="text-primary fw-500">{distance} KM</span>
                                </div>
                            </div>
                            {buildOpenBanner(lab_timing, lab_timing_data, next_lab_timing, next_lab_timing_data)}
                        </div>
                    </div>

                    <div className="widget-footer card-footer lab-search-card-footer">
                        <div className="row">
                            <div className="col-12 text-right">
                                {
                                    price ? <p className="lab-price mrb-10"><span className="dp-dr-old-price fw-500" style={{ display: 'inline-block' }}>&#8377; {mrp}</span> &#8377; {price}</p> : ""
                                }
                                {/* <div className="signup-off-container float-left">
                                    <span className="signup-off-doc">+ &#8377; 100 OFF <b>on Signup</b> </span>
                                </div> */}
                                {
                                    pickup_text ? <p className="features-dtls"><sup className="str-symbol">*</sup>{pickup_text}</p> : ""
                                }
                                <button className="v-btn v-btn-primary btn-md">Book Lab</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


export default LabProfileCard
