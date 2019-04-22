import React from 'react';

class BookingError extends React.Component {
    render() {
        return (
            <section className="error-msg-pop">
                <div className="cancel-overlay"></div>
                <div className="popup-error" style={{ width: '300px' }}>
                    <div className="error-head"><img className="errorInfoImg" src={ASSETS_BASE_URL + "/img/infoerror.svg"} />{"Alert"}</div>
                    <div className="cross-btn">
                        <img src={ASSETS_BASE_URL + "/img/icons/close.png"} alt="close" onClick={this.props.closeErrorPopup} />
                    </div>
                    <p className="error-msg">{this.props.message}</p>
                </div>
            </section>
        )
    }
}

export default BookingError