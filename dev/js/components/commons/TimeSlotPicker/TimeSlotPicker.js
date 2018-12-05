import React from 'react';
import { connect } from 'react-redux';

import DateTimeSelector from './DateTimeSelector.js'

class TimeSlot extends React.Component {
    constructor(props) {
        super(props)
    }

    static loadData(store, match) {
       // return store.dispatch(getDoctorById(match.params.id, match.params.clinicId))
    }

    static contextTypes = {
        router: () => null
    }

    componentDidMount() {
        
      //  this.props.getDoctorById(this.props.match.params.id, this.props.match.params.clinicId, this.props.commonProfileSelectedProcedures)
    }

    render() {

        return (
            <DateTimeSelector {...this.props} />
        );
    }
}

export default TimeSlot
