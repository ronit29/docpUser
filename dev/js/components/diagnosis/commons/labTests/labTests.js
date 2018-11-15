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

    open

    render() {
        let tests = []
        let is_package = false
        let number_of_tests = 0
        let defaultTests = []
        let showDefaultTests = false
        if (this.props.data.tests && this.props.data.tests.length) {

            tests = this.props.data.tests.map((test, i) => {
                if (test.is_package) {
                    is_package = true
                    number_of_tests = test.number_of_tests
                }

                if (test.is_package) {
                    return <PackageTest i={i} test={test} toggle={this.toggle.bind(this)} />
                } else {
                    return <li className="clearfix" key={i}>
                        <span className="test-price">&#8377; {test.deal_price}<span className="test-mrp">&#8377; {test.mrp.split('.')[0]}</span></span><span className="fw-500 text-md test-name-item /*lb-tst-cstm-pdng*/">{test.test.name}</span></li>
                }
            })
        }

        const parsed = queryString.parse(this.props.location.search)
        if (parsed && parsed.price_list && parsed.price_list == 'true') {
            showDefaultTests = true
        }

        let totalAmount = 0;
        if (this.props.data.tests && this.props.data.tests.length) {
            for (var i = 0; i < this.props.data.tests.length; i++) {
                totalAmount = totalAmount + this.props.data.tests[i].deal_price;
            }
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
        if (is_home_collection_enabled && distance_related_charges == 1) {
            pickup_text = "Home pickup charges applicable"
        }

        if (is_home_collection_enabled && !distance_related_charges) {
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
                    </ul>
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
                    <div className="pb-view text-right">
                        <a href="javascript:;" className="link-text text-md fw-700" onClick={this.openTests.bind(this)}>View more tests</a>
                    </div>

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
