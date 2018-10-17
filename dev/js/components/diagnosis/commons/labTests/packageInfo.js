import React from 'react';

export default ({ toggle, content }) => {
    let name = ""
    let pre_test_info = ""
    let why = ""
    if (content) {
        name = content.test.name
        pre_test_info = content.test.pre_test_info
        why = content.test.name
    }
    return <div>
        <div className="cancel-overlay" onClick={toggle}></div>
        <div className="widget cancel-appointment-div cancel-popup">
            <div className="widget-header text-center action-screen-header">
                <p className="fw-500 cancel-appointment-head">Package Info</p>
                <img src={ASSETS_BASE_URL + "/img/icons/close.png"} className="close-modal" onClick={toggle} />
                <hr />
            </div>
            <div className="cancel-policy-text" style={{ paddingTop: 0 }}>

            </div>
        </div>
    </div>
}