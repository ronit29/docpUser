import React from 'react';
import { connect } from 'react-redux';

import { getCartItems, getOPDBookingSummary, updateOPDAppointment, selectOpdTimeSLot, retryPaymentOPD, getRatingCompliments, createAppointmentRating, updateAppointmentRating, closeAppointmentPopUp,OTTLogin } from '../../actions/index.js'
import STORAGE from '../../helpers/storage'
import BookingView from '../../components/opd/booking/BookingView.js'
import Loader from '../../components/commons/Loader'
import SnackBar from 'node-snackbar'
const queryString = require('query-string');

class Booking extends React.Component {
    constructor(props) {
        super(props)
        const parsed = queryString.parse(this.props.location.search)
            this.state = {
                isLoggedIn: false, 
                isCompleted: false,
                hasComplete: parsed.complete || false
            }
    }

    static contextTypes = {
        router: () => null
    }

    componentDidMount() {
        const parsed = queryString.parse(this.props.location.search)
        let OTT = parsed.token
        
        if(OTT){
            if (STORAGE.checkAuth()) {
                this.setToken(this.props) 
                this.props.getCartItems()
            }else{
                this.setToken(this.props)  
            }
        }else{
            if (STORAGE.checkAuth()) {
                this.props.getCartItems()
                this.setState({isLoggedIn: true})
            }else{
                this.props.history.push('/')
            }
        }    
    }

    setToken(props) {
        const parsed = queryString.parse(props.location.search)
        let OTT = parsed.token

        if (OTT) {
            props.OTTLogin(OTT).then(() => {
                this.setState({isLoggedIn: true})
                if(this.state.hasComplete){
                    this.setCompleted(this.props)
                }
            }).catch(() => {
                SnackBar.show({ pos: 'bottom-center', text: "Token Expired." });
                props.history.push('/')
            })
        } 
    }
    
    setCompleted(props) {
        const appointmentId = props.match.params.refId
        if (this.state.hasComplete) {
            if (!this.state.isCompleted) {
                this.props.getOPDBookingSummary(this.props.match.params.refId, (err, data) => {
                    if (!err) {
                        data[0].status == 7 && this.setState({isCompleted: true})
                        this.getAppointment(props)
                    }
                    else {}
                })
            }
        }
    }
    
    getAppointment(props) {
        const appointmentId = props.match.params.refId
         if (!this.state.isCompleted) {
            let appointmentData = { id: appointmentId, status: 7 }
            props.updateOPDAppointment(appointmentData, (err, data) => {
                if (data) {
                    this.setState({ isCompleted: true })
                } else {
                    SnackBar.show({ pos: 'bottom-center', text: "Something went wrong." });
                }
            })                           
        } 
        else {
            SnackBar.show({ pos: 'bottom-center', text: "Your appointment is already completed." });
        }
    }

    render() {

        return (
            <div>
                {
                    this.state.isLoggedIn?<BookingView {...this.props} isCompleted={this.state.isCompleted/>: <Loader />
                }
            </div>
            
        )
    }
}

const mapStateToProps = (state) => {
    let { rescheduleSlot } = state.DOCTOR_SEARCH

    let {
        summary_utm, summary_utm_validity, newNotification, notifications, rated_appoinments, profiles, selectedProfile
    } = state.USER

    return {
        rescheduleSlot, newNotification, notifications, rated_appoinments, profiles, selectedProfile, summary_utm, summary_utm_validity
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
         OTTLogin: (ott) => dispatch(OTTLogin(ott)),
        getOPDBookingSummary: (appointmentID, callback) => dispatch(getOPDBookingSummary(appointmentID, callback)),
        updateOPDAppointment: (appointmentData, callback) => dispatch(updateOPDAppointment(appointmentData, callback)),
        selectOpdTimeSLot: (slot, reschedule, appointmentId) => dispatch(selectOpdTimeSLot(slot, reschedule, appointmentId)),
        retryPaymentOPD: (appointmentId, callback) => dispatch(retryPaymentOPD(appointmentId, callback)),
        getRatingCompliments: (callback) => dispatch(getRatingCompliments(callback)),
        createAppointmentRating: (appointmentData, callback) => dispatch(createAppointmentRating(appointmentData, callback)),
        updateAppointmentRating: (ratingData, callback) => dispatch(updateAppointmentRating(ratingData, callback)),
        closeAppointmentPopUp: (id, callback) => dispatch(closeAppointmentPopUp(id, callback)),
        getCartItems: () => dispatch(getCartItems()),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Booking);
