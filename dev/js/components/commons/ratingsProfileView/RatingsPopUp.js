import React from "react";
import STORAGE from '../../../helpers/storage'
import ReviewPopUp from './ReviewPopUp'
import ThankYouPopUp from './ThankYouPopUp'
// import StarView from './StarView.js'


class RatingsPopUp extends React.Component {
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

    getAppointmentType = () => {
        let type = this.state.data.type && this.state.data.type == "lab" ? 1 : 2;
        return type;
    }

    componentDidMount() {
        if (STORAGE.checkAuth()) {
            this.props.getUnratedAppointment((err, data) => {
                if (!err && data) {
                    this.setState({ data })
                }
            })
            this.props.getRatingCompliments((err, compliments) => {
                if (!err && compliments) {
                    this.setState({ compliments })
                }
            })
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.token != this.props.token) {
            if (STORAGE.checkAuth()) {
                this.props.getUnratedAppointment((err, data) => {
                    if (!err && data) {
                        this.setState({ data })
                    }
                })
                this.props.getRatingCompliments((err, compliments) => {
                    if (!err && compliments) {
                        this.setState({ compliments })
                    }
                })
            }
        }
    }

    selectRating(x, size) {
        this.setState({ selectedRating: x })
        if (!size) {
            let type = this.getAppointmentType();
            let post_data = { 'rating': x, 'appointment_id': this.state.data.id, 'appointment_type': type };
            this.props.createAppointmentRating(post_data, (err, data) => {
                if (!err && data) {
                    this.setState({ rating_id: data.id })
                }
            })
        }
    }

    declineRating(type, id, size) {

        let post_data = { 'appointment_id': id, 'appointment_type': type };
        this.props.closeAppointmentRating(post_data, (err, data) => {
            if (!err && data) {
                console.log('Popup Closed');
            }
        })
        this.setState({ data: null })
    }

    thanYouButton = () => {
        this.setState({ rating_done: false })
    }

    submitRating = (post_data, flag) => {
        if (flag) {
            this.setState({ data: null })
        }
        else {
            this.props.updateAppointmentRating(post_data, (err, data) => {
                if (!err && data) {
                    this.setState({ appointmentData:this.state.data,data: null, rating_done: true})
                }
            })
        }
    }

    render() {
        console.log(this.state);
        if (this.state.rating_done && ((this.state.data == null) || (this.state.data && this.state.data.length == 0))) {
            return (<ThankYouPopUp {...this.props} submit={this.thanYouButton} selectedRating={this.state.selectedRating} appointmentData={this.state.appointmentData}/>)
        }
        if (typeof (this.state.data) != "undefined" && this.state.data != null && this.state.data.id) {
            let qualification_object = this.state.data.doctor ? this.state.data.doctor.qualifications : null;
            let pipe = ''
            let data_obj = {
                'name': (this.state.data.doctor) ? this.state.data.doctor.name : this.state.data.lab.name,
                'qualification': qualification_object && qualification_object.length ? qualification_object[0].qualification : '',
                'specialization': qualification_object && qualification_object.length ? qualification_object[0].specialization : '',
                'type': this.getAppointmentType(),
                'thumbnail': this.state.data.doctor ? this.state.data.doctor_thumbnail : this.state.data.lab_thumbnail,
                'pipe': pipe
            }
            if (data_obj.type !== 1) {
                data_obj.pipe = ' | ';
            }

            if (this.state.rating_id) {

                return (<ReviewPopUp {...this.props} details={this.state.data} submit={this.submitRating} obj={data_obj} rating_id={this.state.rating_id} selected_rating={this.state.selectedRating} compliments={this.state.compliments} />)
            }
            else {
                return (
                    <div className="raiting-popup">
                        <div className="home-rating-card">
                            <div className="rate-card-header">
                                Rate your Experience
                        <span><img onClick={this.declineRating.bind(this, data_obj.type, this.state.data.id)} src="/assets/img/customer-icons/rt-close.svg" className="img-fluid" /></span>
                            </div>
                            <div className="rate-card-doc-dtls">
                                <img src={data_obj.thumbnail} className="img-fluid img-round " />
                                <div className="rate-doc-dtl">
                                    <p className="rt-doc-nm">{data_obj.name}</p>
                                    <span>{data_obj.qualification} {data_obj.pipe} {data_obj.specialization}</span>
                                </div>
                            </div>
                            <div className="rate-star-icon">
                                {
                                    [1, 2, 3, 4, 5].map((x, i) => {
                                        return <img key={i} onClick={this.selectRating.bind(this, x, 0)} className="img-fluid" src={"/assets/img/customer-icons/" + (this.state.selectedRating > 0 && this.state.selectedRating >= x ? "" : "un") + "selected-star.svg"} />
                                    })
                                }
                            </div>
                        </div>
                    </div>
                );
            }
        }
        return ("");
    }
}

export default RatingsPopUp;
