import React from 'react'
import { connect } from 'react-redux'
import { getIpdInfo, submitIPDForm, getUserProfile, getOfferList } from '../../actions/index.js'
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
		if (this.props.match.params.id) {
			this.props.getIpdInfo(this.props.match.params.id)
		}

	}
	render() {

		return (
			<IPDFormView {...this.props} />
		)
	}
}

const mapStateToProps = (state) => {

	const {
		selectedCriterias,
		ipd_info,
		IPD_INFO_LOADED
	} = state.SEARCH_CRITERIA_IPD

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
		offerList
	}
}

const mapDispatchToProps = (dispatch) => {

	return {
		getIpdInfo: (ipd_id) => dispatch(getIpdInfo(ipd_id)),
		submitIPDForm: (formData, cb) => dispatch(submitIPDForm(formData, cb)),
		getUserProfile: () => dispatch(getUserProfile()),
		getOfferList: (lat, long) => dispatch(getOfferList(lat, long))
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(IPDForm)