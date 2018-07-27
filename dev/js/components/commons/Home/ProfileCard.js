import React from 'react';

export default ({ data }) => {
    return <div className="row">
        <div className="col-12">
            <div className="widget mrt-10 ct-profile">
                <div className="widget-content ct-profile-info">

                    <div className="ct-img ct-img-md ct-profile-icon">
                        <img src={ASSETS_BASE_URL + "/img/customer-icons/user.svg"} className="img-fluid" />
                    </div>
                    <div className="ct-content root-map-field">
                        <p className="fw-500 text-md">Welcome ! </p>
                        <h4 className="widget-title rm-title">{data.name}</h4>
                        <p className="fw-500 text-md dr-with">{data.gender == 'm' ? "Male" : "Female"}, {data.dob ? getAge(data.dob) : ""} Years</p>
                    </div>

                </div>
            </div>
        </div>
    </div>
}


function getAge(birthday) {
    birthday = new Date(birthday)
    var ageDifMs = Date.now() - birthday.getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}