import React from 'react'
import CouponSelectionView from '../../components/commons/couponSelectionView'
import { connect } from 'react-redux'
import { getCoupons, applyCoupons, pushMembersData } from '../../actions/index.js'


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

	let {  selected_vip_plan, vipClubMemberDetails, currentSelectedVipMembersId, vipCoupons } = state.VIPCLUB

	return {
		applicableCoupons,
		selectedSlot,
		selectedProfile, profiles,
		 selected_vip_plan, vipClubMemberDetails, currentSelectedVipMembersId, vipCoupons
	}
}

const mapDispatchToProps = (dispatch) => {

	return {
		getCoupons: (data) => dispatch(getCoupons(data)),
		applyCoupons: (productId, couponData, couponId, hospitalId, callback) => dispatch(applyCoupons(productId, couponData, couponId, hospitalId, callback)),
		pushMembersData:(criteria) =>dispatch(pushMembersData(criteria)),

	}
}
export default connect(mapStateToProps, mapDispatchToProps)(Coupons)