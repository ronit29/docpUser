import React from 'react';

export default ({ toggle, content }) => {
    let name = ""
    let pre_test_info = ""
    let why = ""
    if (content) {
        name = content.test.name
        pre_test_info = content.test.pre_test_info
        why = content.test.why
    }
    return <div>
        <div className="cancel-overlay" onClick={toggle}></div>
        <div className="widget cancel-appointment-div cancel-popup">
            <div className="widget-header text-center action-screen-header">
                <p className="fw-500 cancel-appointment-head">Package Info</p>
                <img src={ASSETS_BASE_URL + "/img/icons/close.png"} className="close-modal" onClick={toggle} />
                <hr />
            </div>
            <div className="" style={{ padding: '0px 15px' }}>
                <div className="qa-container">
                    <h4 className="pkg-qus">What is this test?</h4>
                    <p className="pkg-ans" dangerouslySetInnerHTML={{ __html: why }}></p>
                </div>
                <div className="qa-container">
                    <h4 className="pkg-qus">What is the preparation needed for doing this test?</h4>
                    <p className="pkg-ans">{pre_test_info}</p>
                </div>
            </div>
        </div>
    </div>
}