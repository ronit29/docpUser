import React from 'react';
import InitialsPicture from '../initialsPicture'

export default ({ doctor_name, lab_name, hospital_name, openBookingSummary, doctor_thumbnail, lab_thumbnail, test_ids }) => {
    return <a href="javascript:;">
        <div className="right-div-widget health-widget" onClick={() => {
            openBookingSummary()
        }} style={{ marginBottom: 10 }}>
            <div className="appointment-head-div">
                <span className="appointment-head">Continue Booking {lab_name ? "Lab" : "Doctor"}</span>
            </div>
            <div className="booking-details-div">
                <div className="doc-img-div">
                    <InitialsPicture name={(lab_name || doctor_name)} has_image={!!(doctor_thumbnail || lab_thumbnail)} className="initialsPicture-cb">
                        <img src={doctor_thumbnail || lab_thumbnail} style={{ width: 30, height: 30, borderRadius: '100%' }} className="doc-img" />
                    </InitialsPicture>
                </div>
                <div className="doc-desc-div">
                    <p className="doc-name">{doctor_name || lab_name}</p>
                    {
                        hospital_name ? <p className="hospital-name">{hospital_name}</p> : ""
                    }
                    {
                        (test_ids && test_ids.length) ? test_ids.reduce((str, t, i) => {
                            str += `${t.name}, `
                            return str
                        }, "") : ""
                    }
                    {/* <p className="booking-time">18th April | 3:30 PM</p> */}
                </div>
            </div>
            <div className="continue-div">
                <span className="continue-text">Continue</span>
                <img src={ASSETS_BASE_URL + "/img/customer-icons/right-arrow.svg"} className="rt-arrow-icon" />
            </div>
        </div>
    </a>
}