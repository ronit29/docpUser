import React from 'react'
import CouponSelectionView from '../../components/commons/couponSelectionView'
import { connect } from 'react-redux'
import { getCoupons , applyCoupons } from '../../actions/index.js'


class Coupons extends React.Component{

	render(){

		return(
				<CouponSelectionView {...this.props}/>
			)
	}
}

const mapStateToProps = (state) =>{
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

const mapDispatchToProps = (dispatch) =>{

	return{
		getCoupons: (productId) => dispatch(getCoupons(productId)),
		applyCoupons: (productId, couponCode, couponId, hospitalId ) => dispatch(applyCoupons(productId, couponCode, couponId, hospitalId ))

	}
}
export default connect(mapStateToProps, mapDispatchToProps)(Coupons)