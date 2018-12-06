import React from 'react';
import { connect } from 'react-redux';
import GTM from '../../../../helpers/gtm.js'
import PackageTest from './packageTest.js'
import PackageInfo from './packageInfo.js'
import STORAGE from '../../../../helpers/storage'
const queryString = require('query-string');


class LabTests extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            showPackageInfo: false,
            packageInfoTest: null
        }
    }

    openTests() {
        let data = {
            'Category': 'ConsumerApp', 'Action': 'UserSelectingAddRemoveLabTests', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'user-selecting-add-remove-lab-tests'
        }
        GTM.sendEvent({ data: data })

        this.props.history.push(`/lab/${this.props.data.lab.id}/tests`)
    }

    toggle(which, data = null) {
        this.setState({ [which]: !this.state[which], packageInfoTest: data })
    }

    toggleTest(test_to_toggle) {
        let test = Object.assign({}, test_to_toggle)
        test.mrp = test_to_toggle.mrp
        test.deal_price = test_to_toggle.deal_price
        test.extra_test = true
        test.lab_id = this.props.data.lab.id
        test.id = test_to_toggle.test.id
        test.name = test_to_toggle.test.name
        test.pre_test_info = test_to_toggle.test.pre_test_info
        test.why = test_to_toggle.test.why
        test.add_to_common = true

        this.props.toggleDiagnosisCriteria('test', test)
    }

    render() {
        let tests = []
        let is_package = false
        let number_of_tests = 0
        let defaultTests = []
        let showDefaultTests = false
        let hide_price = false
        let selectedTestIds = []

        if (this.props.currentLabSelectedTests && this.props.currentLabSelectedTests.length) {
            tests = this.props.currentLabSelectedTests.map((test, i) => {
                if (test.hide_price) {
                    hide_price = true
                }

                if (test.is_package) {
                    is_package = true
                    number_of_tests = test.number_of_tests
                }

                if (test.is_package) {
                    return <PackageTest i={i} test={test} toggle={this.toggle.bind(this)} />
                } else {
                    return test.hide_price
                            ?<li className="clearfix" key={i}>
                               <span className="test-price">Free</span> 
                             </li>
                            :<li key={i + "srt"}>
                                <label className="ck-bx" style={{ fontWeight: 400, fontSize: 14 }}>
                                    {test.test.name}
                                    <input type="checkbox" checked={true} onChange={this.toggleTest.bind(this, test)} />
                                    <span className="checkmark" />
                                </label>
                                <span className="test-price text-sm">&#8377; {test.deal_price}<span className="test-mrp">&#8377; {test.mrp.split('.')[0]}</span></span>
                            </li>

/*
                    <li className="clearfix" key={i}>
                        {
                            test.hide_price ? <span className="test-price">Free</span> : <span className="test-price">&#8377; {test.deal_price}<span className="test-mrp">&#8377; {test.mrp.split('.')[0]}</span></span>
                        }
                        <span className="fw-500 text-md test-name-item ">{test.test.name}</span></li>*/
                }
            })
            selectedTestIds = this.props.currentLabSelectedTests.map(x => x.test_id)
            
        }

        const parsed = queryString.parse(this.props.location.search)
        if (parsed && parsed.price_list && parsed.price_list == 'true') {
            showDefaultTests = true
        }

        let totalAmount = 0;
        if (this.props.currentLabSelectedTests && this.props.currentLabSelectedTests.length) {
            for (var i = 0; i < this.props.currentLabSelectedTests.length; i++) {
                totalAmount = totalAmount + this.props.currentLabSelectedTests[i].deal_price;
            }
        }

        let defaultUnselectedTests = []
        if (this.props.data.lab_tests && this.props.data.lab_tests.length) {
            
            this.props.data.lab_tests.map((test, i) => {

                if(selectedTestIds.indexOf(test.test_id)==-1 && defaultUnselectedTests.length<5){

                defaultUnselectedTests.push(<li key={i + "srt"}>
                            <label className="ck-bx" style={{ fontWeight: 400, fontSize: 14 }}>
                                {test.test.name}
                                <input type="checkbox" onChange={this.toggleTest.bind(this, test)} />
                                <span className="checkmark" />
                            </label>
                            <span className="test-price text-sm">&#8377; {test.deal_price}<span className="test-mrp">&#8377; {test.mrp.split('.')[0]}</span></span>
                        </li>)
                }
            })
        }

        if (this.props.data.lab_tests && this.props.data.lab_tests.length && showDefaultTests) {
            defaultTests = this.props.data.lab_tests.map((test, i) => {
                return <li className="clearfix" key={i}>
                    <span className="test-price">&#8377; {test.deal_price}<span className="test-mrp">&#8377; {test.mrp.split('.')[0]}</span></span><span className="fw-400 text-md test-name-item /*lb-tst-cstm-pdng*/">{test.test.name}</span></li>
            })
        }

        let is_home_collection_enabled = false
        let distance_related_charges = 0
        let home_pickup_charges = false
        if (this.props.data && this.props.data.lab) {
            is_home_collection_enabled = this.props.data.lab.is_home_collection_enabled
            distance_related_charges = this.props.data.distance_related_charges
            home_pickup_charges = this.props.data.lab.home_pickup_charges
        }

        let pickup_text = ""
        let extra_price = ""
        let showPriceTag = 0

        if (is_home_collection_enabled && distance_related_charges == 1 && !hide_price) {
            pickup_text = "Home pickup charges applicable"
        }

        if (is_home_collection_enabled && !distance_related_charges && !hide_price) {
            pickup_text = "Home visit charges"
            showPriceTag = 1
            extra_price = this.props.data.lab.home_pickup_charges
        }

        return (
            <div>
                <div className="widget-content pb-details pb-test">
                    {
                        is_package && number_of_tests ? <h4 className="wc-title text-md fw-700">{number_of_tests} Test Included</h4> : <h4 className="wc-title text-md fw-700">Selected Tests</h4>
                    }

                    <ul className="list pb-list pb-test-list">
                        {tests}
                        {defaultUnselectedTests}
                    </ul>
                    {
                        /*let selected_tests = labData.tests.map((test, i) => {
                            if (selectedTestIds.indexOf(test.test.id) > -1) {
                                return <li key={i + "st"}>
                                    <label className="ck-bx" style={{ fontWeight: 400, fontSize: 14 }}>
                                        {test.test.name}
                                        <input type="checkbox" checked={true} onChange={this.toggleTest.bind(this, test)} />
                                        <span className="checkmark" />
                                    </label>
                                    <span className="test-price text-sm">&#8377; {test.deal_price}<span className="test-mrp">&#8377; {test.mrp ? test.mrp.split('.')[0] : ""}</span></span>
                                </li>
                            }
                        })*/
                    }
                    {
                        pickup_text ? <div className="clearfix">

                            <p className="health-visit-charge">{pickup_text}</p>

                            {
                                showPriceTag ? <p className="prc-tstcoin"> &#8377;{extra_price == "" ? '0' : extra_price}</p> : ''

                            }
                            {
                                !showPriceTag && extra_price >= 0 && extra_price ? <p className="prc-tstcoin"> &#8377;{extra_price}</p> : ""
                            }
                        </div> : ""
                    }
                    {
                        STORAGE.checkAuth() || totalAmount < 100 ?
                            ''
                            : <div className="signup-off-container lab-signup-offr">
                                <span className="signup-off-doc">+ &#8377; 100 OFF <b>on Signup</b> </span>
                            </div>
                    }
                    {
                        hide_price ? "" : <div className="pb-view text-right">
                            <a href="javascript:;" className="link-text text-md fw-700" onClick={this.openTests.bind(this)}>View more tests</a>
                        </div>
                    }
                    {
                        this.state.showPackageInfo ? <PackageInfo content={this.state.packageInfoTest} toggle={this.toggle.bind(this, 'showPackageInfo')} /> : ""
                    }
                </div>

                {showDefaultTests ?
                    <div className="widget-content pb-details pb-test">
                        <h4 className="wc-title text-md fw-700">Price List</h4>

                        <ul className="list pb-list pb-test-list">
                            {defaultTests}
                        </ul>
                        <div className="pb-view text-right">
                            <a href="javascript:;" className="link-text text-md fw-700" onClick={this.openTests.bind(this)}>View More & Select Tests</a>
                        </div>
                    </div>
                    : ''
                }
            </div>
        );
    }
}


export default LabTests
