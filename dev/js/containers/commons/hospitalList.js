import React from 'react'
import { connect } from 'react-redux'
import HospitalListView from '../../components/commons/hospitalList/hospitalListView';
import HospitalInventoryView from '../../components/commons/hospitalList/hospitalInventoryView';
import { getHospitalList, getHospitalInventoryList } from '../../actions/index.js'

class HospitalList extends React.Component {

    static loadData(store, match, queryParams = {}) {
        if (match.url === "/hospitals/inventory") {
            return store.dispatch(getHospitalInventoryList(queryParams && queryParams.city ? queryParams.city : 'Delhi'))
        }
        else {
            return store.dispatch(getHospitalList())
        }
    }

    static contextTypes = {
        router: () => null
    }

    render() {
        return (
            <React.Fragment>
                {
                    this.props.match.url === "/hospitals/inventory" ?
                        <HospitalInventoryView {...this.props} /> :
                        <HospitalListView {...this.props} />
                }
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    const {
        hospitalIndexLoading,
        selectedHospitalList,
        hospitalLocalityList,
        hospitalListLoading
    } = state.SITE_MAP

    const {
        selectedLocation
    } = state.SEARCH_CRITERIA_OPD

    return {
        hospitalIndexLoading,
        selectedHospitalList,
        selectedLocation,
        hospitalLocalityList,
        hospitalListLoading
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        getHospitalList: (selectedLocation, page) => dispatch(getHospitalList(selectedLocation, page)),
        getHospitalInventoryList: (city) => dispatch(getHospitalInventoryList(city))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HospitalList)