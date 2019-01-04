import React from "react";
import STORAGE from '../../../helpers/storage'
import ReviewPopUp from './ReviewPopUp'
import ThankYouPopUp from './ThankYouPopUp'


class RatingProfileCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            selectedRating: 0,
            rating_id: null,
            compliments: [],
            rating_done: false,
            appointmentData:null
        }
    }

    componentDidMount() {
        this.setState({ data: this.props.details })
        if (STORAGE.checkAuth()) {
            this.props.getRatingCompliments((err, compliments) => {
                if (!err && compliments) {
                    this.setState({ compliments })
                }
            })
        }
    }

    selectRating(x) {
        this.setState({ selectedRating: x })
        let type = this.getAppointmentType();
        let post_data = { 'rating': x, 'appointment_id': this.props.details.id, 'appointment_type': type };
        this.props.createAppointmentRating(post_data, (err, data) => {
            if (!err && data) {
                this.setState({ rating_id: data.id })
            }
        })
    }

    declineRating(type, id) {
        let post_data = { 'appointment_id': id, 'appointment_type': type };
        this.props.closeAppointmentRating(post_data, (err, data) => {
            if (!err && data) {
                console.log('Popup Closed');
            }
        })

        this.setState({ data: null })
    }

    getAppointmentType = () => {
        let type = this.props.details.type && this.props.details.type == "lab" ? 1 : 2;
        return type;
    }


    thanYouButton = () => {
        this.setState({ rating_done: false })
    }

    submitRating = (post_data, flag) => {
        this.setState({ data: null })
        if (!flag) {
            this.props.updateAppointmentRating(post_data, (err, data) => {
                if (!err && data) {
                    this.setState({ appointmentData:this.state.data, data: null, rating_done: true })
                }
            })
        }
    }

    render() {
        if (this.state.rating_done && ((this.state.data == null) || (this.state.data && this.state.data.length == 0))) {
            return (<ThankYouPopUp {...this.props} submit={this.thanYouButton} selectedRating={this.state.selectedRating} appointmentData={this.state.appointmentData}/>);
        }
        let app_id = this.props.details.id
        let submitted_flag = !!this.props.rated_appoinments[app_id];
        if (!submitted_flag && this.state.data) {
            let qualification_object = this.props.details.doctor ? this.props.details.doctor.qualifications : null;
            let pipe = ''
            let data_obj = {
                'name': (this.props.details.doctor) ? this.props.details.doctor.name : this.props.details.lab_name,
                'qualification': qualification_object && qualification_object.length ? qualification_object[0].qualification : '',
                'specialization': qualification_object && qualification_object.length ? qualification_object[0].specialization : '',
                'type': this.getAppointmentType(),
                'thumbnail': this.props.details.doctor ? this.props.details.doctor_thumbnail : this.props.details.lab_thumbnail,
                'pipe': pipe
            }
            if (data_obj.type !== 1) {
                data_obj.pipe = ' | ';
            }
            let entity = (data_obj.type == 1) ? 'lab' : 'doctor';
            if (!this.state.rating_id) {
                return (
                    <div className="rating-upside-container mt-0">
                        <div className="sub-upside-star">
                            <p>Rate your recent visit with the {entity}</p>
                            {
                                [1, 2, 3, 4, 5].map((x, i) => {
                                    return <img key={i} onClick={this.selectRating.bind(this, x)} className="img-fluid" src={"/assets/img/customer-icons/" + (this.state.selectedRating > 0 && this.state.selectedRating >= x ? "" : "un") + "selected-star.svg"} />
                                })
                            }
                        </div>
                    </div>
                );
            }
            else {
                return (<ReviewPopUp {...this.props} details={this.state.data} submit={this.submitRating} obj={data_obj} rating_id={this.state.rating_id} selected_rating={this.state.selectedRating} compliments={this.state.compliments} />)
            }
        }
        else {
            return ("");
        }
    }
}

export default RatingProfileCard;



