import React from 'react'
import { connect } from 'react-redux'
import { getIpdInfo, submitIPDForm, getUserProfile, getOfferList, ipdPopupFired } from '../../actions/index.js'
import IPDFormView from '../../components/ipd/IPDFormView.js'
import STORAGE from '../../helpers/storage';

class IPDForm extends React.Component {

	componentDidMount() {
		if (window) {
			window.scrollTo(0, 0)
		}
		if (!this.props.defaultProfile && STORAGE.checkAuth()) {
			this.props.getUserProfile()
		}
		if (this.props.match.params.id && this.props.match.params.id!='price') {
			this.props.getIpdInfo(this.props.match.params.id)
		}

	}
	render() {

		return (
			<IPDFormView {...this.props} />
		)
	}
}

const mapStateToProps = (state, passedProps) => {

	const {
		selectedCriterias,
		ipd_info,
		IPD_INFO_LOADED,
		commonSelectedCriterias
	} = state.SEARCH_CRITERIA_IPD

	const {
        selectedLocation
    } = state.SEARCH_CRITERIA_OPD

	const {
		defaultProfile,
		profiles,
		offerList
	} = state.USER

	return {
		selectedCriterias,
		ipd_info,
		IPD_INFO_LOADED,
		defaultProfile,
		profiles,
		offerList,
		selectedLocation,
		commonSelectedCriterias
	}
}

const mapDispatchToProps = (dispatch) => {

	return {
		getIpdInfo: (ipd_id) => dispatch(getIpdInfo(ipd_id)),
		submitIPDForm: (formData, selectedLocation, cb) => dispatch(submitIPDForm(formData, selectedLocation, cb)),
		getUserProfile: () => dispatch(getUserProfile()),
		getOfferList: (lat, long) => dispatch(getOfferList(lat, long)),
		ipdPopupFired: () => dispatch(ipdPopupFired())
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(IPDForm)