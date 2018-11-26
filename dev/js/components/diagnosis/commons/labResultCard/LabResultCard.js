import React from 'react';
import GTM from '../../../../helpers/gtm.js'
import STORAGE from '../../../../helpers/storage'

class LabResultCard extends React.Component {
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


    buildLabTimingData(lab_timing, lab_timing_data = [], next_lab_timing, next_lab_timing_data = null) {
        let is_open_now = false
        let open_next_today = false

        let time_now = new Date().getHours() + 0.5
        for (let ltd of lab_timing_data) {
            if (time_now <= ltd.end && time_now >= ltd.start) {
                is_open_now = true
                return <p style={{ fontSize: 12 }} >{lab_timing}</p>
            }
            if (time_now < ltd.start) {
                open_next_today = ltd.start
                open_next_today = this.decimalToTime(open_next_today)
                break
            }
        }

        if (open_next_today) {
            return <p style={{ fontSize: 12 }} >Opens next at {open_next_today}, today</p>
        }

        const WEEK_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
        let next_open = false
        let next_open_today = ""
        if (next_lab_timing_data) {
            let today = new Date()
            let weekDayNumber = today.getDay()
            weekDayNumber = weekDayNumber == 0 ? 6 : weekDayNumber - 1
            for (let i in next_lab_timing_data) {
                next_open = next_lab_timing_data[i][0].start
                next_open = this.decimalToTime(next_open)
                if (i - weekDayNumber == 1) {
                    next_open_today = 'tomorrow'
                } else {
                    next_open_today = WEEK_DAYS[i]
                }
                break
            }
        }
        if (next_open && next_open_today) {
            return <p style={{ fontSize: 12 }} >Opens next at {next_open}, {next_open_today}</p>
        }

        return "Closed"

    }


    decimalToTime(time) {
        time = time.toString()
        let hours = time.split('.')[0]
        let minutes = time.split('.')[1]
        hours = parseInt(hours)
        if (minutes == '5') {
            minutes = ':30'
        } else {
            minutes = ""
        }
        let day_time = "AM"
        if (hours >= 12) {
            day_time = "PM"
        }
        hours = hours % 12
        return `${hours}${minutes} ${day_time}`
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
            // <div className="lab-rslt-card-link mrb-20" onClick={this.openLab.bind(this, this.props.details.lab.id, this.props.details.lab.url)}>
            //     <div className="widget card lab-rslt-card">
            //         <div className="widget-content card-content book-card" style={{ paddingBottom: 0 }} >
            //             <div className="logo-ratting">
            //                 <span className="ct-img lab-icon">
            //                     <InitialsPicture name={lab.name} has_image={!!lab.lab_thumbnail} className="initialsPicture-ls">
            //                         <img src={lab.lab_thumbnail} className="img-fluid" style={{ maxWidth: 90, maxHeight: 60 }} />
            //                     </InitialsPicture>
            //                 </span>

            //                 {
            //                     pickup_available == 0 ? "" : <p className='fw-500' style={{ fontSize: 10, color: '#757575', marginTop: 2 }} >FREE HOME PICKUP</p>
            //                 }
            //             </div>
            //             <div className="book-card-content">
            //                 <a href={this.props.details.lab.url ? `/${this.props.details.lab.url}` : `/lab/${this.props.details.lab.id}`}>
            //                     <h2 className="book-cart-title">{lab.name}</h2>
            //                 </a>
            //                 <p className="fw-500" style={{ color: '#343434', fontSize: 14, marginBottom: 8 }} >Radiology | Pathology</p>
            //                 <div style={{ display: 'flex', flexWrap: 'wrap', minWidth: 0 }} >
            //                     <p className="lab-locality">

            //                         {lab.locality} {lab.city}&nbsp;|
            //                     </p>
            //                     <div style={{ width: 60, marginLeft: 4, marginBottom: 8, alignSelf: 'center' }}>
            //                         <span><img src={ASSETS_BASE_URL + "/img/icons/location-orange.svg"} style={{ marginRight: 4, verticalAlign: '-1px' }} /></span><span className="text-primary fw-500">{distance} KM</span>
            //                     </div>
            //                 </div>
            //                 {buildOpenBanner(lab_timing, lab_timing_data, next_lab_timing, next_lab_timing_data)}
            //             </div>
            //         </div>

            //         <div className="widget-footer card-footer lab-search-card-footer">
            //             <div className="row">
            //                 <div className="col-12 text-right">
            //                     {
            //                         price ? <p className="lab-price mrb-10"> &#8377; {price} <span className="dp-dr-old-price fw-500" style={{ display: 'inline-block' }}>&#8377; {mrp}</span></p> : ""
            //                     }
            //                     {
            //                         STORAGE.checkAuth() || price < 100 ?
            //                             ''
            //                             : <div className="signup-off-container lab-signup-offr">
            //                                 <span className="signup-off-doc">+ &#8377; 100 OFF <b>on Signup</b> </span>
            //                             </div>
            //                     }
            //                     {
            //                         pickup_text ? <p className="features-dtls"><sup className="str-symbol">*</sup>{pickup_text}</p> : ""
            //                     }
            //                     <button className="v-btn v-btn-primary btn-md">Book Lab</button>
            //                 </div>
            //             </div>
            //         </div>
            //     </div>
            // </div>
            <div className="filter-card-dl mb-3" onClick={this.openLab.bind(this, this.props.details.lab.id, this.props.details.lab.url)}>
                <div className="fltr-crd-top-container">
                    <div className="fltr-lctn-dtls">
                        <p><img className="fltr-loc-ico" width="12px" height="18px" src="/assets/img/customer-icons/map-marker-blue.svg" /><span className="fltr-loc-txt">{lab.locality} {lab.city}</span> | <span>{distance} Km</span></p>
                    </div>
                    <div className="row no-gutters">
                        <div className="col-8 fltr-crd-col">
                            <div className="fltr-crd-img text-center">
                                <div>
                                    <img className="fltr-usr-image img-round" src={lab.lab_thumbnail} />
                                </div>
                                {/* <span className="fltr-rtng">Verified</span> */}
                            </div>
                            <div className="fltr-name-dtls">
                                <a href="/dr-gaurav-gupta-dentist-implantologist-general-physician-in-sector-11-gurgaon-dpp">
                                    <h2 className="fltr-dc-name text-md">{lab.name}</h2>
                                </a>
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="fltr-bkng-section">
                                {/* <span className="filtr-offer ofr-ribbon fw-700">30% OFF</span> */}
                                {
                                    price ? <p className="fltr-prices">&#8377; {price}<span className="fltr-cut-price">&#8377; {mrp}</span></p> : ''
                                }

                                {
                                    STORAGE.checkAuth() || price < 100 ?
                                        ''
                                        : <div className="signup-off-container lab-signup-offr">
                                            <span className="signup-off-doc">+ &#8377; 100 OFF <b>on Signup</b> </span>
                                        </div>
                                }

                                <button className="fltr-bkng-btn">Book Lab</button>
                            </div>
                        </div>
                    </div>
                    {/* <div>
                        <ul className="fltr-labs-test-selected">
                            <span className="fltr-prv-selected-test">Tests Selected</span>
                            <li className="fltr-slected-test">
                                <label>Liver Function </label>
                                <p>&#x20B9; 299 <span>&#x20B9; 399</span></p>
                            </li>
                            <li className="fltr-slected-test">
                                <label>MRI Brain </label>
                                <p>&#x20B9; 299 <span>&#x20B9; 399</span></p>
                            </li>
                        </ul>
                    </div> */}
                </div>
                <div className="filtr-card-footer">
                    {
                        pickup_text ? <div style={{ paddingRight: 8 }}>
                            <p style={{ marginLeft: 0 }}>* {pickup_text}</p>
                        </div> : ""
                    }
                    <div className="text-right">
                        <img src="/assets/img/customer-icons/clock-black.svg" />
                        {
                            this.buildLabTimingData(lab_timing, lab_timing_data, next_lab_timing, next_lab_timing_data)
                        }
                    </div>
                </div>
            </div>
        );
    }
}


export default LabResultCard
