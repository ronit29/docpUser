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
        if(!this.props.noClearTest){
            this.props.clearExtraTests()
        }
        if(this.props.noClearTest){
            let test={} 
            let data = this.props.details
            test.type = 'test'
            test.name = data.tests[0].name
            test.id = data.tests[0].id
            test.deal_price = data.tests[0].deal_price
            test.mrp = data.tests[0].mrp
            test.url = data.tests[0].url
            test.lab_id = data.id
            test.extra_test = true
            this.props.toggleDiagnosisCriteria('test', test, true)
        }
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
    testInfo(test_id, lab_id, test_url,event) {
        let selected_test_ids = []
        Object.entries(this.props.currentSearchedCriterias).map(function ([key, value]) {
            selected_test_ids.push(value.id)
        })
        var url_string = window.location.href;
        var url = new URL(url_string);
        var search_id = url.searchParams.get("search_id");
        if(test_url && test_url !=''){
            this.props.history.push('/'+test_url+'?test_ids=' + test_id + '&selected_test_ids=' + selected_test_ids + '&search_id=' + search_id + '&lab_id=' + lab_id + '&from=searchresults&isSeo=false')
        }else{
            this.props.history.push('/search/testinfo?test_ids=' + test_id + '&selected_test_ids=' + selected_test_ids + '&search_id=' + search_id + '&lab_id=' + lab_id + '&from=searchresults&isSeo=false&searchById=true')
        }
        event.stopPropagation()
        let data = {
            'Category': 'ConsumerApp', 'Action': 'testInfoClick', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'test-info-click', 'pageSource': 'lab-result-page'
        }
        GTM.sendEvent({ data: data })
    }

    render() {
        let self = this
        let { discounted_price, price, lab, distance, is_home_collection_enabled, lab_timing, lab_timing_data, mrp, next_lab_timing, next_lab_timing_data, distance_related_charges, pickup_charges, address, name, lab_thumbnail, other_labs, id, url } = this.props.details;

        distance = Math.ceil(distance / 1000);

        let pickup_text = ""
        if (is_home_collection_enabled && distance_related_charges == 1) {
            pickup_text = "Home pickup charges applicable"
        }

        if (is_home_collection_enabled && !distance_related_charges) {
            pickup_text = "Inclusive of home visit charges"
            discounted_price = discounted_price + pickup_charges
        }

        let offPercent = ''
        if (mrp && discounted_price && (discounted_price < mrp)) {
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
        if(!this.props.isTestInfo){
            {
                Object.entries(this.props.currentSearchedCriterias).map(function ([key, value]) {
                    if (value.show_details) {
                        show_detailsIds.push(value.id)
                    }
                })
            }
        }
        return (

            <div className="">
                <div className="filter-card-dl mb-3">
                    <div className="fltr-crd-top-container">
                        <div className="fltr-lctn-dtls" onClick={this.openLab.bind(this, id, url)} style={{ cursor: 'pointer' }}>
                            <p><img className="fltr-loc-ico" src="/assets/img/new-loc-ico.svg" style={{ width: '12px', height: '18px' }} /><span className="fltr-loc-txt">{address}</span><span>&nbsp;|&nbsp;{distance} Km</span></p>
                        </div>
                        <div style={{ cursor: 'pointer' }} className="row no-gutters mrt-10" onClick={this.openLab.bind(this, id, url)}>
                            <div className="col-12">
                                <a>
                                    <h2 className="lab-fltr-dc-name fw-500 text-md">{name}</h2>
                                </a>
                                {
                                    !hide_price && offPercent && offPercent > 0 ?
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
                                    <div style={{ marginLeft: '8px' }}>
                                        {
                                            this.props.details.tests && this.props.details.tests.length == 1 ? <p style={{ color: "rgb(0, 0, 0)", fontSize: "14px", fontWeight: 400 }}>{this.props.details.tests[0].name}
                                                {
                                                    show_detailsIds.indexOf(this.props.details.tests[0].id) > -1 ? <span style={{ 'marginLeft': '5px', marginTop: '1px', display: 'inline-block' }} onClick={this.testInfo.bind(this, this.props.details.tests[0].id, id,this.props.details.tests[0].url)}>
                                                        <img src="https://cdn.docprime.com/cp/assets/img/icons/info.svg" />
                                                    </span> : ''
                                                }
                                            </p> : ""
                                        }

                                    </div>
                                </div>
                            </div>
                            <div className="col-5 mrt-10 text-right" style={{ paddingleft: '8px' }}>
                                {
                                    discounted_price && !hide_price ? <p className="text-primary fw-500 text-lg mrb-10">₹ {discounted_price}<span className="fltr-cut-price" style={{ verticalAlign: '1px' }}>₹ {mrp}</span></p> : ""
                                }
                                {
                                    hide_price ? <p className="text-primary fw-500 text-lg mrb-10">Free</p> : ""
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
                                                    <label style={{ fontWeight: 400 }}>{test.name}
                                                        {

                                                            show_detailsIds.indexOf(test.id) > -1 ?
                                                                <span style={{ 'marginLeft': '5px', marginTop: '1px', display: 'inline-block' }} onClick={this.testInfo.bind(this, test.id, id,test.url)}>
                                                                    <img src="https://cdn.docprime.com/cp/assets/img/icons/info.svg" />
                                                                </span> : ''
                                                        }
                                                    </label>
                                                    {
                                                        hide_price ?
                                                            <p style={{ fontWeight: 400 }}>Free</p>
                                                            : <p style={{ fontWeight: 400 }}>&#x20B9; {test.deal_price} <span>&#x20B9; {test.mrp}</span></p>
                                                    }
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
                                pickup_text ? <p style={{ marginLeft: '0px' }}>* {pickup_text}</p>
                                    : ""
                            }
                        </div>

                        <div className="text-right" style={{ marginLeft: 'auto' }}>
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
                            other_labs && other_labs.length ? <div className="filtr-card-footer" onClick={this.toggleViewMore.bind(this)} style={{ cursor: 'pointer', borderTop: '1px solid #e8e8e8' }}>
                                {
                                    this.state.openViewMore ? <div style={{ paddingRight: "8px" }}>
                                        <p className="appBaseColor" style={{ marginLeft: '0px' }}>Show less</p>
                                    </div> : <div style={{ paddingRight: "8px" }}>
                                            <p className="appBaseColor" style={{ marginLeft: '0px' }}>View {other_labs.length} more locations</p>
                                        </div>
                                }

                                <div className="text-right" style={{ marginLeft: 'auto' }}>
                                    {
                                        this.state.openViewMore ? <img style={{ margin: '5px' }} className="acrd-show" src="/assets/img/customer-icons/dropdown-arrow.svg" /> : <img style={{ margin: '5px' }} className="" src="/assets/img/customer-icons/dropdown-arrow.svg" />
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