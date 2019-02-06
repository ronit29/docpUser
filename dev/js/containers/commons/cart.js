import React from 'react';
import { connect } from 'react-redux';

import { getUserProfile, getCartItems, removeFromCart, processCartItems, selectProfile, selectLabTimeSLot, selectOpdTimeSLot, saveProfileProcedures, clearAllTests, applyCoupons, toggleDiagnosisCriteria, fetchTransactions, selectLabAppointmentType } from '../../actions/index.js'

import CartView from '../../components/commons/cart'
import STORAGE from '../../helpers/storage'

class Cart extends React.Component {
    constructor(props) {
        super(props)
        if (!STORAGE.checkAuth()) {
            this.props.history.replace(`/login?callback=/cart`)
        }
    }

    static contextTypes = {
        router: () => null
    }

    componentDidMount() {
        if (STORAGE.checkAuth()) {
            this.props.getUserProfile()
            this.props.getCartItems()
            this.props.fetchTransactions()
        }
    }

    render() {

        return (
            <CartView {...this.props} {...this.state} />
        );
    }
}

const mapStateToProps = (state) => {
    let {
        cart, userWalletBalance, userCashbackBalance
    } = state.USER

    return {
        cart, userWalletBalance, userCashbackBalance
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getUserProfile: () => dispatch(getUserProfile()),
        getCartItems: () => dispatch(getCartItems()),
        removeFromCart: (id) => dispatch(removeFromCart(id)),
        processCartItems: (use_wallet) => dispatch(processCartItems(use_wallet)),
        selectProfile: (id) => dispatch(selectProfile(id)),
        selectOpdTimeSLot: (slot, reschedule, appointmentId) => dispatch(selectOpdTimeSLot(slot, reschedule, appointmentId)),
        selectLabTimeSLot: (slot, reschedule) => dispatch(selectLabTimeSLot(slot, reschedule)),
        saveProfileProcedures: (doctor_id, clinic_id, selectedProcedures, forceAdd) => dispatch(saveProfileProcedures(doctor_id, clinic_id, selectedProcedures, forceAdd)),
        clearAllTests: () => dispatch(clearAllTests()),
        applyCoupons: (productId, couponData, couponId, doctor_id) => dispatch(applyCoupons(productId, couponData, couponId, doctor_id)),
        toggleDiagnosisCriteria: (type, criteria, forceAdd) => dispatch(toggleDiagnosisCriteria(type, criteria, forceAdd)),
        fetchTransactions: () => dispatch(fetchTransactions()),
        selectLabAppointmentType: (type) => dispatch(selectLabAppointmentType(type))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Cart);
