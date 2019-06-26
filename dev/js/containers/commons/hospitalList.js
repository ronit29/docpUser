import React from 'react'
import { connect } from 'react-redux'
import HospitalListView from '../../components/commons/hospitalList/hospitalListView';
import { getHospitalList } from '../../actions/index.js'

class HospitalList extends React.Component {

    static loadData(store, match) {
        return store.dispatch(getHospitalList())
    }

    static contextTypes = {
        router: () => null
    }

    render() {
        if(1){
            return <h1>Hospital Listing</h1>
        }
        return (
            <HospitalListView {...this.props} />
        )
    }
}

const mapStateToProps = (state) => {
    const {
        hospitalIndexLoading,
        selectedHospitalList
    } = state.SITE_MAP

    const {
        selectedLocation
    } = state.SEARCH_CRITERIA_OPD

    return {
        hospitalIndexLoading,
        selectedHospitalList,
        selectedLocation
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        getHospitalList: (selectedLocation, page) => dispatch(getHospitalList(selectedLocation, page))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HospitalList)