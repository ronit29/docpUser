import React from "react";
import STORAGE from '../../../helpers/storage'
import RatingsPopUp from './RatingsPopUp.js'


class HospitalPopUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            displayRatingBlock: 0,
            selectedHospital: null
        }
    }

    componentDidMount() {
        // if (STORAGE.checkAuth()) {
        //     this.props.getUnratedAppointment((err, data) => {
        //         if (!err && data) {
        //             this.setState({ data })
        //         }
        //     })
        // }
    }

    getunverifiedData = () => {
        let obj = {}
        if(this.props.doctor_details){
            obj = {
                    "doctor": this.props.doctor_details,
                    "hospital": this.props.doctor_details.hospitals,
                    "doctor_thumbnail": this.props.doctor_details.thumbnail,
                    "display_name": this.props.doctor_details.display_name,
                    "type": 'doctor',
                    "id": this.props.doctor_details.id,
                    "lab": null
                }
        }
        return obj
    }

    selectRatingHospital(id){
        this.setState({ displayRatingBlock: 1 })
        let selectedHospital = this.props.doctor_details.hospitals.filter(x => x.hospital_id == id)
        selectedHospital = selectedHospital ? selectedHospital[0] : null 
        this.setState({ selectedHospital })
    }

    declineRating()
    {
        this.props.popUpState()
    }   
     render() {
        if (this.state.displayRatingBlock) {
            return (<RatingsPopUp {...this.props} unverified={true} unverifiedData={this.getunverifiedData()} selectedHospital={this.state.selectedHospital} />)
        }
        else {
            return (<div className="raiting-popup">
                <div className="home-rating-card">
                    <div className="rate-card-header">
                    {/* <span className="rate-pop-back"><img src={ASSETS_BASE_URL + "/img/customer-icons/back-icon.png"} className="img-fluid" /></span> */}
                        Choose Clinic to rate Doctor
                        <span><img onClick={this.declineRating.bind(this)} src={ASSETS_BASE_URL + "/img/customer-icons/rt-close.svg"} className="img-fluid" /></span>
                    </div>
                    <div className="rate-seceltion-cont">
                        {
                            this.props.doctor_details.hospitals && this.props.doctor_details.hospitals.length ? this.props.doctor_details.hospitals.map((hosp, i)=> {
                                return <p key={i} onClick={this.selectRatingHospital.bind(this, hosp.hospital_id)}> {hosp.hospital_name} </p>
                            }) : ""
                        }
                        {/*<p class="rt-par-select">Thu - 2:00 PM to 6:00 PM</p> */}
                        
                    </div>
                </div>
            </div>)
        }
            
    }
}

export default HospitalPopUp;
