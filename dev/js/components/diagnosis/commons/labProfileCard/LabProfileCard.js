import React from 'react';
import InitialsPicture from '../../../commons/initialsPicture'
import GTM from '../../../../helpers/gtm.js'

class LabProfileCard extends React.Component {
    constructor(props) {
        super(props)
    }

    openLab(id, url) {
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
        'Category':'ConsumerApp','Action':'RankOfLabClicked','CustomerID':GTM.getUserId()||'','leadid':0,'event':'rank-lab-clicked','Rank':this.props.rank+1}
        GTM.sendEvent({ data: data })

        data = {
            'Category': 'ConsumerApp', 'Action': 'LabSelectedByUser', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'lab-selected-by-user', 'LabId': id
        }
        GTM.sendEvent({ data: data })
        if (url) {
            this.props.history.push(`/${url}`)
        } else {
            this.props.history.push(`/lab/${id}`)
        }
    }

    isOpenToday(lab_timing_data = []) {
        let is_open = false
        let time_now = new Date().getHours() + 0.5
        for (let ltd of lab_timing_data) {
            if (time_now <= ltd.end && time_now >= ltd.start) {
                is_open = true
            }
        }
        return is_open
    }

    render() {

        let { price, lab, distance, pickup_available, lab_timing, lab_timing_data, mrp } = this.props.details

        distance = Math.ceil(distance / 1000)

        return (
            <div className="widget card lab-rslt-card" onClick={this.openLab.bind(this, this.props.details.lab.id, this.props.details.lab.url)}>
                <div className="widget-content card-content book-card">
                    <div className="logo-ratting">
                        <span className="ct-img lab-icon">
                            <InitialsPicture name={lab.name} has_image={!!lab.lab_thumbnail} className="initialsPicture-ls">
                                <img src={lab.lab_thumbnail} className="img-fluid" style={{ maxWidth: 90, maxHeight: 60 }} />
                            </InitialsPicture>
                        </span>

                        {
                            pickup_available == 0 ? "" : <p className='fw-500' style={{ fontSize: 10, color: '#757575', marginTop: 2 }} >FREE HOME PICKUP</p>
                        }

                        {/* <ul className="inline-list ratting">
                            <li><span className="ct-img ct-img-xs star-icon"><img src={ASSETS_BASE_URL + "/img/customer-icons/star.svg"} className="img-fluid" /></span></li>
                            <li><span className="ct-img ct-img-xs star-icon"><img src={ASSETS_BASE_URL + "/img/customer-icons/star.svg"} className="img-fluid" /></span></li>
                            <li><span className="ct-img ct-img-xs star-icon"><img src={ASSETS_BASE_URL + "/img/customer-icons/star.svg"} className="img-fluid" /></span></li>
                            <li><span className="ct-img ct-img-xs star-icon"><img src={ASSETS_BASE_URL + "/img/customer-icons/star.svg"} className="img-fluid" /></span></li>
                            <li><span className="ct-img ct-img-xs star-icon"><img src={ASSETS_BASE_URL + "/img/customer-icons/half-star.svg"} className="img-fluid" /></span></li>
                        </ul> */}

                    </div>
                    <div className="book-card-content">
                        <h4 className="book-cart-title">{lab.name}</h4>
                        <p className="fw-500" style={{ color: '#343434', fontSize: 14, marginBottom: 8 }} >Radiology | Pathology</p>
                        <div style={{ display: 'flex', flexWrap: 'wrap', minWidth: 0 }} >
                            <p className="lab-locality">
                                {/* Blood Test, Pathology Ultrasound, MRI, CTI */}
                                {lab.locality} {lab.city}&nbsp;|
                            </p>
                            <div style={{ width: 60, marginLeft: 4, marginBottom: 8, alignSelf: 'center' }}>
                                <span><img src={ASSETS_BASE_URL + "/img/icons/location-orange.svg"} style={{ marginRight: 4, verticalAlign: '-1px' }} /></span><span className="text-primary fw-500">{distance} KM</span>
                            </div>
                        </div>
                        <p style={{ color: '#f78316', fontSize: 14 }} >{lab_timing} |
                            {
                                this.isOpenToday(lab_timing_data) ? <span style={{ color: 'green' }}> Open Today</span> : <span style={{ color: '#d82907' }} > Now Closed</span>
                            }
                        </p>
                    </div>
                </div>
                <div className="widget-footer card-footer">
                    <div className="row">
                        <div className="col-6">
                            <p className="lab-price">

                                {
                                    price ? <span>Total <span className="dp-dr-old-price" style={{ display: 'inline-block', marginTop: 3 }}>&#8377; {mrp}</span> &#8377; {price}</span> : ""
                                }
                            </p>
                        </div>
                        <div className="col-6 text-right">
                            <button className="v-btn v-btn-primary btn-md">Book Lab</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


export default LabProfileCard
