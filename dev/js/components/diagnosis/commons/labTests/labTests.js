import React from 'react';
import { connect } from 'react-redux';

class LabTests extends React.Component {

    constructor(props) {
        super(props)
    }

    openTests() {
        this.props.history.push(`/lab/${this.props.data.lab.id}/tests`)
    }

    render() {

        let tests = []

        if (this.props.data.tests && this.props.data.tests.length) {
            tests = this.props.data.tests.map((test, i) => {
                return <li key={i}>{test.test.name} <span className="test-price">Rs {test.deal_price}</span></li>
            })
        }

        return (
            <div className="widget-content pb-details pb-test">
                <h4 className="wc-title text-md fw-700">Tests ({tests.length} Selected)</h4>
                <ul className="list pb-list pb-test-list">
                    {tests}
                </ul>
                <div className="pb-view text-right">
                    <a href="javascript:;" className="link-text text-md fw-700" onClick={this.openTests.bind(this)}>Add/Remove Tests</a>
                </div>
            </div>
        );
    }
}


export default LabTests
