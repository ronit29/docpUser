import React from 'react';
import { connect } from 'react-redux';

import { getLabById } from '../../actions/index.js'

import LabView from '../../components/diagnosis/lab/index.js'

class Lab extends React.Component {
    constructor(props) {
        super(props)
    }

    // static loadData(store, match){
    //     return store.dispatch(getLabById(match.params.id))
    // }

    static contextTypes = {
        router: () => null
    }

    componentDidMount() {
        let tests = this.props.selectedCriterias.filter(x => x.type == "test").map(x => x.id)
        this.props.getLabById(this.props.match.params.id, tests)
    }

    render() {

        return (
            <LabView {...this.props} />
        );
    }
}

const mapStateToProps = (state) => {

    const {
        selectedLocation,
        selectedCriterias,
        filterCriteria,
        LOADED_SEARCH_CRITERIA_LAB
    } = state.SEARCH_CRITERIA_LABS

    let LABS = state.LABS

    return {
        selectedCriterias,
        LABS
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getLabById: (labId, testIds) => dispatch(getLabById(labId, testIds))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Lab);
