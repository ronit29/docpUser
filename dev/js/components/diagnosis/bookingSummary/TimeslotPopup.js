import React from 'react';

class TimeslotPopup extends React.Component {
    render() {
        return (
            <section className="error-msg-pop">
                <div className="cancel-overlay"></div>
                <div className="popup-error popup-timeslot">
                    <div className="error-head">Check time slot !</div>
                    <div className="cross-btn">
                        <img src="/assets/img/icons/close.png" alt="close" />
                    </div>
                    <div className="checking-loc">
                        <p className="error-msg">Please enter your pincode, so that we can find the best available time slot </p>
                        <div className="InputField">
                            <input type="text" className="form-in" placeholder="Enter your pincode" />
                        </div>
                    </div>
                    <div className ="wait-for-loc">
                         <img src="/assets/img/loader_orange.gif" alt="loader" />
                         <p className="error-msg">Please wait, while we are finding best available time for you</p>
                    </div>
                    <a href="Javascript:void(0);" className="btn-chk-avl">Check Availability</a>
                </div>
            </section>
        )
    }
}

export default TimeslotPopup