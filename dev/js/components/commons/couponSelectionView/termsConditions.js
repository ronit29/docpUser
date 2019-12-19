import React from 'react';

export default class Terms extends React.Component {

    render() {

        return (
            <div>
                <div className="cancel-overlay" onClick={this.props.toggle}></div>
                <div className="widget cancel-appointment-div cancel-popup">
                    <div className="widget-header text-center action-screen-header">
                        <p className="fw-500 cancel-appointment-head">Terms & Conditions</p>
                        <hr />
                    </div>
                    <div className="terms-condition-div paypal-dtls-cont">
                        <p className="terms-condition" dangerouslySetInnerHTML={{ __html: this.props.tnc }} ></p>
                    </div>

                    <div className="payment-content-btn text-center">
                        <button className="fw-500" onClick={this.props.toggle}>Done</button>
                    </div>
                </div>
            </div>
        )
    }
}