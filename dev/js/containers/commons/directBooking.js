import React from 'react';
import { connect } from 'react-redux';
const queryString = require('query-string');
import SnackBar from 'node-snackbar'

import { OTTLogin, fetchOrderById, getUpcomingAppointments, fetchHeatlhTip, fetchOrderHistory, toggleDiagnosisCriteria, selectProfile, selectLabTimeSLot, selectOpdTimeSLot, clearAllTests, selectPickupAddress, selectLabAppointmentType, saveProfileProcedures, setCommonUtmTags } from '../../actions/index.js'
import Loader from '../../components/commons/Loader'

class DirectBooking extends React.Component {
    constructor(props) {
        super(props)
    }

    static contextTypes = {
        router: () => null
    }

    componentDidMount() {
        const parsed = queryString.parse(this.props.location.search)
        let OTT = parsed.token
        let user_id = parsed.user_id
        let callbackurl = parsed.callbackurl 
        //Add UTM tags for building url
        try{
            if(parsed.utm_source && parsed.utm_source=='OfflineAffiliate'){
                let sessionId = Math.floor(Math.random() * 103)*21 + 1050
                if(sessionStorage) {
                    sessionStorage.setItem('sessionIdVal',sessionId)   
                }
                let spo_tags = {
                    utm_tags: {
                        utm_source: parsed.utm_source||'',
                        utm_term: parsed.utm_term||'',
                        utm_medium: parsed.utm_medium||'',
                        utm_campaign: parsed.utm_campaign||''
                    },
                    time: new Date().getTime(),
                    currentSessionId: sessionId
                }
                this.props.setCommonUtmTags('spo', spo_tags)
            }
        }catch(e) {

        }

        if (OTT) {
            this.props.OTTLogin(OTT,user_id).then((resp) => {
                if(callbackurl){
                    if(callbackurl == 'lab' || callbackurl == 'opd'){
                        window.location.href = '/#' + callbackurl
                    }else{
                        if(parsed.test_ids){
                            callbackurl+='&test_ids='+parsed.test_ids
                            this.props.history.push('/'+callbackurl)
                        }else{
                            callbackurl = callbackurl.replace(/\*/g,'&');
                            window.location.href = window.location.origin+'/'+callbackurl+`?${parsed.queryParams}`
                        }
                        
                    }
                }else{
                    this.props.history.push('/cart?is_agent_booking=true')
                }
            }).catch(() => {
                SnackBar.show({ pos: 'bottom-center', text: "Token Expired." });
                this.props.history.push('/')
            })

        } else {
            this.props.history.push('/')
        }

    }

    buildOPDTimeSlot(data) {
        let timeObject = {}
        timeObject.time = data.time
        timeObject.date = new Date(data.date)
        timeObject.selectedClinic = data.hospital
        timeObject.selectedDoctor = data.doctor

        return timeObject
    }


    buildLabTimeSlot(data) {
        let timeObject = {}
        timeObject.time = data.time
        timeObject.date = new Date(data.date)

        return timeObject
    }

    setLabBooking(data) {
        this.props.clearAllTests()
        for (let curr_test of data.test_ids) {
            curr_test.extra_test = true
            curr_test.lab_id = data.lab
            this.props.toggleDiagnosisCriteria('test', curr_test, true)
        }

        this.props.selectProfile(data.profile)
        let time_slot = this.buildLabTimeSlot(data)
        this.props.selectLabTimeSLot(time_slot, false)
        this.props.history.push(`/lab/${data.lab}/book`)
    }

    setOpdBooking(data) {
        this.props.selectProfile(data.profile)
        let time_slot = this.buildOPDTimeSlot(data)
        this.props.selectOpdTimeSLot(time_slot, false)
        if (data.procedure_ids && data.procedure_ids.length) {
            this.props.saveProfileProcedures('', '', data.procedure_ids, true)
        }
        this.props.history.push(`/opd/doctor/${data.doctor}/${data.hospital}/bookdetails`)
    }

    render() {

        return (
            <Loader />
        );
    }
}

const mapStateToProps = (state) => {
    let { profiles, selectedProfile } = state.USER
    let { selectedAddress } = state.LAB_SEARCH

    return {
        profiles, selectedProfile, selectedAddress
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        OTTLogin: (ott,user_id) => dispatch(OTTLogin(ott,user_id)),
        fetchOrderById: (order_id) => dispatch(fetchOrderById(order_id)),
        clearAllTests: () => dispatch(clearAllTests()),
        selectOpdTimeSLot: (slot, reschedule, appointmentId) => dispatch(selectOpdTimeSLot(slot, reschedule, appointmentId)),
        selectLabTimeSLot: (slot, reschedule) => dispatch(selectLabTimeSLot(slot, reschedule)),
        selectProfile: (profile_id) => dispatch(selectProfile(profile_id)),
        toggleDiagnosisCriteria: (type, criteria, forceAdd) => dispatch(toggleDiagnosisCriteria(type, criteria, forceAdd)),
        selectPickupAddress: (address) => dispatch(selectPickupAddress(address)),
        selectLabAppointmentType: (type) => dispatch(selectLabAppointmentType(type)),
        saveProfileProcedures: (doctor_id, clinic_id, selectedProcedures, forceAdd) => dispatch(saveProfileProcedures(doctor_id, clinic_id, selectedProcedures, forceAdd)),
        setCommonUtmTags: (type, tag) => dispatch(setCommonUtmTags(type, tag))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(DirectBooking);
