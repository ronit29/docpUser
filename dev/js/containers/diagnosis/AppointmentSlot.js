import React from 'react';
import { connect } from 'react-redux';

import { getLabById, getLabTimeSlots, selectLabTimeSLot, preBooking} from '../../actions/index.js'

import AppointmentSlotView from '../../components/diagnosis/appointmentSlot'
const queryString = require('query-string');

class AppointmentSlot extends React.Component {
    constructor(props) {
        super(props)
    }

    // static loadData(store, match) {
    //     return store.dispatch(getLabById(match.params.id))
    // }

    static contextTypes = {
        router: () => null
    }

    fetchData(props) {
        const parsed = queryString.parse(props.location.search)

        let lab_id = props.selectedLab || props.match.params.id || parsed.lab_id
        let test_ids = []
        if (window) {
            window.scrollTo(0, 0)
        }
        if(parsed.test_ids) {
            test_ids = parsed.test_ids.split(',')
        }
        if (lab_id) {
            props.getLabById(lab_id, test_ids)
        }
    }

    componentWillReceiveProps(props) {
        if (props.selectedLab != this.props.selectedLab) {
            this.fetchData(props)
        }
    }

    componentDidMount() {
        this.fetchData(this.props)
    }

    render() {

        const parsed = queryString.parse(this.props.location.search)
        let lab_id = this.props.selectedLab || this.props.match.params.id || parsed.lab_id

        return (
            <AppointmentSlotView {...this.props} selectedLab={lab_id} />
        );
    }
}

const mapStateToProps = (state) => {

    let LABS = state.LABS
    let { pincode, selectedCriterias } = state.SEARCH_CRITERIA_LABS
    let { selectedSlot, selectedDateFormat } = state.LAB_SEARCH
    const { selectedProfile, profiles } = state.USER

    return {
        LABS, selectedSlot, pincode, selectedProfile, profiles, selectedCriterias, selectedDateFormat
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getLabById: (labId, tests) => dispatch(getLabById(labId, tests)),
        getLabTimeSlots: (labId, pickup, pincode, date, extraParams, callback) => dispatch(getLabTimeSlots(labId, pickup, pincode, date, extraParams, callback)),
        selectLabTimeSLot: (slot, reschedule, dateParam) => dispatch(selectLabTimeSLot(slot, reschedule, dateParam)),
        preBooking:(slot) => dispatch(preBooking(slot))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(AppointmentSlot);
