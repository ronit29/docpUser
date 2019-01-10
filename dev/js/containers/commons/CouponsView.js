import React from 'react'
import CouponSelectionView from '../../components/commons/couponSelectionView'
import { connect } from 'react-redux'
import { getCoupons, applyCoupons } from '../../actions/index.js'


class Coupons extends React.Component {

	render() {

		return (
			<CouponSelectionView {...this.props} />
		)
	}
}

const mapStateToProps = (state) => {
	const {
		applicableCoupons, selectedProfile, profiles
	} = state.USER

	let {
		selectedSlot
	} = state.DOCTOR_SEARCH



	return {
		applicableCoupons,
		selectedSlot,
		selectedProfile, profiles
	}
}

const mapDispatchToProps = (dispatch) => {

	return {
		getCoupons: (data) => dispatch(getCoupons(data)),
		applyCoupons: (productId, couponData, couponId, hospitalId) => dispatch(applyCoupons(productId, couponData, couponId, hospitalId))

	}
}
export default connect(mapStateToProps, mapDispatchToProps)(Coupons)