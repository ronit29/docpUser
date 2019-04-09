import React from 'react';
import { connect } from 'react-redux';

import { getLabByUrl, getLabById, selectLabTimeSLot, toggleDiagnosisCriteria, getRatingCompliments, createAppointmentRating, updateAppointmentRating, closeAppointmentRating, closeAppointmentPopUp, getFooterData , getLabTests, savePincode, getAllRatings } from '../../actions/index.js'

import LabView from '../../components/diagnosis/lab/index.js'

class Lab extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedLab: this.props.match.params.id || null,
            defaultTest: []
        }
    }

    static loadData(store, match) {
        if (match.params.id) {
            return store.dispatch(getLabById(match.params.id))
        } else {
            let url = match.url
            if (url) {
                url = url.split("/")[1]
            }
            return new Promise((resolve, reject) => {
                store.dispatch(getLabByUrl(url, [], (labId, url) => {
                    if (labId) {
                        if (match.url.includes('-lpp')) {
                            getFooterData(match.url.split("/")[1])().then((footerData) => {
                                footerData = footerData || null
                                resolve({ labId, footerData })
                            }).catch((e) => {
                                resolve({ labId })
                            })
                        } else {
                            resolve({ labId })
                        }
                    } else {
                        reject({
                            url: url
                        })
                    }
                }))
            })
        }
    }

    static contextTypes = {
        router: () => null
    }

    componentDidMount() {
        let lab_id;
        if (this.props.match.params.id) {
            let testIds = this.props.lab_test_data[this.props.match.params.id] || []
            lab_id = this.props.match.params.id
            let tests = testIds.map(x => x.id)
            this.props.getLabById(lab_id, tests)
        } else {
            let url = this.props.match.url
            if (url) {
                url = url.split("/")[1]
            }
            this.props.getLabByUrl(url, [], (labId) => {
                if (labId) {
                    lab_id = labId
                    this.setState({ selectedLab: labId })
                    let testIds = this.props.lab_test_data[labId] || []
                    let tests = testIds.map(x => x.id)
                    this.props.getLabById(labId, tests)
                }
            })
        }


        //always clear selected time at lab profile
        let slot = { time: {} }
        this.props.selectLabTimeSLot(slot, false)
    }

    render() {
        return (
            <LabView {...this.props} selectedLab={this.state.selectedLab} />
        );
    }
}

const mapStateToProps = (state, passedProps) => {
    /**
     * initialServerData is server rendered async data required build html on server. 
     */
    let initialServerData = null
    let { staticContext } = passedProps
    if (staticContext && staticContext.data) {
        initialServerData = staticContext.data
    }

    const {
        lab_test_data,
        selectedLocation,
        selectedCriterias,
        filterCriteria,
        LOADED_SEARCH_CRITERIA_LAB,
        currentLabSelectedTests
    } = state.SEARCH_CRITERIA_LABS

    let LABS = state.LABS
    let { rated_appoinments, profiles, selectedProfile, defaultProfile } = state.USER

    return {
        lab_test_data,
        selectedCriterias,
        LABS, initialServerData,
        rated_appoinments,
        profiles,
        selectedProfile,
        currentLabSelectedTests,
        selectedLocation,
        defaultProfile
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getLabByUrl: (url, testIds, cb) => dispatch(getLabByUrl(url, testIds, cb)),
        getLabById: (labId, testIds) => dispatch(getLabById(labId, testIds)),
        selectLabTimeSLot: (slot, reschedule) => dispatch(selectLabTimeSLot(slot, reschedule)),
        toggleDiagnosisCriteria: (type, criteria, forceAdd) => dispatch(toggleDiagnosisCriteria(type, criteria, forceAdd)),
        getRatingCompliments: (callback) => dispatch(getRatingCompliments(callback)),
        createAppointmentRating: (appointmentData, callback) => dispatch(createAppointmentRating(appointmentData, callback)),
        updateAppointmentRating: (ratingData, callback) => dispatch(updateAppointmentRating(ratingData, callback)),
        closeAppointmentRating: (doctorId, callback) => dispatch(closeAppointmentRating(doctorId, callback)),
        closeAppointmentPopUp: (id, callback) => dispatch(closeAppointmentPopUp(id, callback)),
        getFooterData: (url) => dispatch(getFooterData(url)),
        getLabTests: (labId, testName) => dispatch(getLabTests(labId, testName)),
        savePincode: (pincode) => dispatch(savePincode(pincode)),
        getAllRatings: (content_type, object_id, page, cb) => dispatch(getAllRatings(content_type, object_id, page, cb))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Lab);
