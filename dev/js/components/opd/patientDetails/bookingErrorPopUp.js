import React from 'react';

class BookingError extends React.Component {
    render() {
        return (
            <section className="error-msg-pop">
                <div className="cancel-overlay"></div>
                <div className="popup-error">
                    <div className="error-head">Booking limit reached !</div>
                    <div className="cross-btn">
                        <img src="/assets/img/icons/close.png" alt="close" onClick={this.props.closeErrorPopup} />
                    </div>
                    <p className="error-msg">{this.props.message}</p>
                </div>
            </section>
        )
    }
}

export default BookingError