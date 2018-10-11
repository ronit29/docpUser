import React from 'react'
import CouponSelectionView from '../../components/commons/couponSelectionView'
import { connect } from 'react-redux'
import { getCoupons } from '../../actions/index.js'


class Coupons extends React.Component{

	render(){

		return(
				<CouponSelectionView />
			)
	}
}

const mapStateToProps = (state) =>{
	const {
		applicableCoupons
	} = state.USER

	return {
		applicableCoupons
	}
}

const mapDispatchToProps = (dispatch) =>{

	return{
		getCoupons: () => dispatch(getCoupons())
	}
}
export default Coupons