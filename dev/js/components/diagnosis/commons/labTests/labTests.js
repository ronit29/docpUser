import React from 'react';
import { connect } from 'react-redux';
import GTM from '../../../../helpers/gtm.js'
import PackageTest from './packageTest.js'
import PackageInfo from './packageInfo.js'

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
                        <span className="test-price"><span className="test-mrp">&#8377; {test.mrp.split('.')[0]}</span>&#8377; {test.deal_price}</span><span className="test-name-item /*lb-tst-cstm-pdng*/">{test.test.name}</span></li>
                }
            })
        }
        return (
            <div className="widget-content pb-details pb-test">
                {
                    is_package && number_of_tests ? <h4 className="wc-title text-md fw-700">{number_of_tests} Test Included</h4> : <h4 className="wc-title text-md fw-700">Tests</h4>
                }

                <ul className="list pb-list pb-test-list">
                    {tests}
                </ul>
                {
                    is_package ? "" : <div className="pb-view text-right">
                        <a href="javascript:;" className="link-text text-md fw-700" onClick={this.openTests.bind(this)}>View more tests</a>
                    </div>
                }
                {
                    this.state.showPackageInfo ? <PackageInfo content={this.state.packageInfoTest} toggle={this.toggle.bind(this, 'showPackageInfo')} /> : ""
                }
            </div>
        );
    }
}


export default LabTests
