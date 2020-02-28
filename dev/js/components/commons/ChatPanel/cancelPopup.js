import React from 'react';

export default ({ toggle, closeChat, homePage }) => {
    return <div>
        <div className={`cancel-overlay ${homePage?'cancl-homepg-popup':''}`} onClick={toggle}></div>
        <div className="widget cancel-appointment-div payment-popup">
            <div className="widget-header text-center">
                <p className="fw-500 cancel-appointment-head">Are you sure you want to close this chat?</p>
            </div>
            <hr />
            <a href="javascript:;">
                <div className="widget-content cancel-content-div" onClick={() => {
                    closeChat()
                }}>
                    <p className="fw-500 cancel-appointment-head">Yes</p>
                    <p className="fw-500 cancel-content">
                        {/* (Your chat will be saved is chat history) */}
                    </p>
                    <div className="cancel-right-arrow">
                        <img src={ASSETS_BASE_URL + "/img/customer-icons/arrow-forward-right.svg"} />
                    </div>
                </div>
            </a>
            <hr />
            <a href="javascript:;">
                <div className="widget-content cancel-content-div" onClick={toggle}>
                    <p className="fw-500 cancel-appointment-head">No</p>
                    <p className="fw-500 cancel-content"></p>
                    <div className="cancel-right-arrow">
                        <img src={ASSETS_BASE_URL + "/img/customer-icons/arrow-forward-right.svg"} />
                    </div>
                </div>
            </a>
            <hr style={{ display: 'none' }} />
        </div>
    </div>
}