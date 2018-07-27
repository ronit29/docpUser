import React from 'react';

export default ({ }) => {
    return <div className="row">
        <div className="col-12">
            <div className="widget mrt-10 ct-profile">
                <div className="widget-content ct-profile-info">

                    <div className="ct-img ct-img-md ct-profile-icon">
                        <img src={ASSETS_BASE_URL + "/img/customer-icons/calander.svg"} className="img-fluid" />
                    </div>
                    <div className="ct-content root-map-field">
                        <p className="fw-500 text-md">Appointment for Arun Kumar </p>
                        <h4 className="widget-title rm-title">Rishabh Mehrotra</h4>
                        <p className="fw-500 text-md dr-with">With Dr. Angela Smith</p>
                        <div className="root-map">
                            <img src={ASSETS_BASE_URL + "/img/customer-icons/map-root.svg"} className="img-fluid" />
                            <span>Navigate</span>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    </div>
}