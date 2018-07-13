import React from 'react';

export default ({ healthTips }) => {
    return <div className="right-div-widget health-widget">
        <div className="appointment-head-div">
            <img src="/assets/img/customer-icons/health-tip.jpg" />
            <span className="appointment-head">Health Tip for the Day</span>
        </div>
        <div className="tip-desc-div">
            <p className="tip-desc">{healthTips.length ? healthTips[0].text : ""}</p>
        </div>
    </div>
}