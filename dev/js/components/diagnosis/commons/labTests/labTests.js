import React from 'react';
import { connect } from 'react-redux';

class LabTests extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {

        return (
            <div className="widget-content pb-details pb-test">
                <h4 className="wc-title text-md fw-700">Tests (28)</h4>
                <ul className="list pb-list pb-test-list">
                    <li>ACID PHOSPHATASE TOTAL <span className="test-price">Rs 200</span></li>
                    <li>ACID PHOSPHATASE TOTAL <span className="test-price">Rs 200</span></li>
                    <li>ACID PHOSPHATASE TOTAL <span className="test-price">Rs 200</span></li>
                </ul>
                <div className="pb-view text-right">
                    <a href="#" className="link-text text-md fw-700">View All</a>
                </div>
            </div>
        );
    }
}


export default LabTests
