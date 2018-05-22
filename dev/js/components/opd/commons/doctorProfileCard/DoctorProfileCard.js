import React from 'react';
import { connect } from 'react-redux';

class DoctorProfileCard extends React.Component {
    constructor(props) {
        super(props)
    }

    cardClick(id, e) {
        // this.props.history.push(`/doctorprofile/${id}`)
    }

    bookNow(id, e) {
        e.stopPropagation()
        // this.props.history.push(`/doctorprofile/${id}/availability`)
    }

    getQualificationStr(qualificationSpecialization) {
        return qualificationSpecialization.reduce((str, curr, i) => {
            str += `${curr.qualification}`
            if (curr.specialization) {
                str += ` - ${curr.specialization}`
            }
            if (i < qualificationSpecialization.length - 1) str += `, `;
            return str
        }, "")
    }

    getTime(unix_timestamp) {
        var date = new Date(unix_timestamp * 1000);
        var hours = date.getHours();
        var minutes = "0" + date.getMinutes();
        return hours + ':' + minutes.substr(-2)
    }

    getAvailability(availability) {
        if (availability) {
            let { nextAvailable } = availability
            if (nextAvailable[0]) {
                let date = new Date(nextAvailable[0].from).toDateString()
                let timeStart = this.getTime(nextAvailable[0].from)
                let timeEnd = this.getTime(nextAvailable[0].to)
                return {
                    date, timeStart, timeEnd, fee: nextAvailable[0].fee
                }
            }
        }

        return { date: '', timeStart: '', timeEnd: '', fee: { amount: '' } }
    }

    render() {

        let {experience_years, gender, hospital, hospital_count, name, qualifications} = this.props.details

        return (
            <div className="widget card search-dr-list">
                <div className="widget-header dr-info">
                    <div className="rating-address beta">
                        <ul className="inline-list ratting">
                            <li><span className="ct-img ct-img-xs star-icon"><img src="/assets/img/customer-icons/star.svg" className="img-fluid" /></span></li>
                            <li><span className="ct-img ct-img-xs star-icon"><img src="/assets/img/customer-icons/star.svg" className="img-fluid" /></span></li>
                            <li><span className="ct-img ct-img-xs star-icon"><img src="/assets/img/customer-icons/star.svg" className="img-fluid" /></span></li>
                            <li><span className="ct-img ct-img-xs star-icon"><img src="/assets/img/customer-icons/star.svg" className="img-fluid" /></span></li>
                            <li><span className="ct-img ct-img-xs star-icon"><img src="/assets/img/customer-icons/half-star.svg" className="img-fluid" /></span></li>
                        </ul>
                        <p><span className="ct-img ct-img-xs"><img src="/assets/img/customer-icons/map-marker-blue.svg" className="img-fluid" /></span>{hospital.address}</p>
                    </div>
                    <div className="alpha dr-name">
                        <img src="/assets/img/customer-icons/user.png" className="img-fluid" /> {name}
                    </div>
                </div>
                <div className="widget-content">
                    <div className="beta other-info text-right">
                        <button className="v-btn v-btn-primary btn-sm">Book Now</button>
                        <div className="pricing">
                            <p className="text-primary fw-700 new-price">Rs {hospital.discounted_fees} <span className="old-price">Rs {hospital.fees}</span></p>
                        </div>
                    </div>
                    <div className="alpha dr-exp-details">
                        <p className="dr-desg text-md">{this.getQualificationStr(qualifications)}</p>
                        <p className="text-sm fw-500 text-light">{experience_years} Years of Experince</p>
                        <p className="text-sm fw-500 text-light">Ex - AIIMS,  Ex- Fortis</p>
                    </div>
                </div>
                <div className="widget-footer card-footer">
                    <div className="row">
                        <div className="col-6">
                            <p><img src="/assets/img/customer-icons/home.svg" className="img-fluid" /><span className="Clinc-name">{hospital.hospital_name} <br />&amp; {hospital_count-1} More</span></p>
                        </div>
                        <div className="col-6">
                            <p><img src="/assets/img/customer-icons/clock-black.svg" className="img-fluid" /><span className="time-availability">8:00 AM to 12:00 PM <br />2:00 PM to 7:00 PM</span></p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


export default DoctorProfileCard
