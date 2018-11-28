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
		applicableCoupons
	} = state.USER

	let {
		selectedSlot
	} = state.DOCTOR_SEARCH



	return {
		applicableCoupons,
		selectedSlot
	}
}

const mapDispatchToProps = (dispatch) => {

	return {
		getCoupons: (productId, deal_price, cb, lab_id, test_ids, coupon_code, save_in_store) => dispatch(getCoupons(productId, deal_price, cb, lab_id, test_ids, coupon_code, save_in_store)),
		applyCoupons: (productId, couponData, couponId, hospitalId) => dispatch(applyCoupons(productId, couponData, couponId, hospitalId))

	}
}
export default connect(mapStateToProps, mapDispatchToProps)(Coupons)