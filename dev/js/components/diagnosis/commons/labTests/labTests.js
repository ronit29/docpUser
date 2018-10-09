import React from 'react';
import { connect } from 'react-redux';
import GTM from '../../../../helpers/gtm.js'

class LabTests extends React.Component {

    constructor(props) {
        super(props)
    }

    openTests() {
        let data = {
        'Category':'ConsumerApp','Action':'UserSelectingAddRemoveLabTests','CustomerID':GTM.getUserId()||'','leadid':0,'event':'user-selecting-add-remove-lab-tests'}
        GTM.sendEvent({ data: data })

        this.props.history.push(`/lab/${this.props.data.lab.id}/tests`)
    }

    render() {
        let tests = []
        if (this.props.data.tests && this.props.data.tests.length) {
    
            tests = this.props.data.tests.map((test, i) => {
                    
                return <li className="clearfix" key={i}>
                <span className="test-price"><span className="test-mrp">&#8377; {test.mrp.split('.')[0]}</span>&#8377; {test.deal_price}</span><span className="test-name-item /*lb-tst-cstm-pdng*/">{test.test.name}</span></li>
            })
        }
        return (
            <div className="widget-content pb-details pb-test">
                <h4 className="wc-title text-md fw-700">Tests</h4>
                <ul className="list pb-list pb-test-list">
                    {tests}
                </ul>
                <div className="pb-view text-right">
                    <a href="javascript:;" className="link-text text-md fw-700" onClick={this.openTests.bind(this)}>View Tests</a>
                </div>
            </div>
        );
    }
}


export default LabTests
