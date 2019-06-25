import React from 'react'
import { connect } from 'react-redux'
import IpdListView from '../../components/commons/IpdList/IpdListView';
import { getHospitalListAlphabetically } from '../../actions/index.js'

class HospitalList extends React.Component {

    static loadData(store, match) {
        return store.dispatch(getHospitalListAlphabetically('a'))
    }

    static contextTypes = {
        router: () => null
    }

    render() {

        return (
            <IpdListView {...this.props} />
        )
    }
}

const mapStateToProps = (state) => {
    const {
        alphabeticalIpdTests,
        selectedIpdListAlphabet,
        ipdIndexLoading
    } = state.SITE_MAP

    const {
        selectedLocation
    } = state.SEARCH_CRITERIA_OPD

    return {
        alphabeticalIpdTests,
        selectedIpdListAlphabet,
        ipdIndexLoading,
        selectedLocation
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        getHospitalListAlphabetically: (character, selectedLocation) => dispatch(getHospitalListAlphabetically(character, selectedLocation))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HospitalList)