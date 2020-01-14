import React from 'react';
import { connect } from 'react-redux';

import { select_opd_payment_type, sendAgentBookingURL, getUserProfile, getCartItems, removeFromCart, processCartItems, selectProfile, selectLabTimeSLot, selectOpdTimeSLot, saveProfileProcedures, clearAllTests, applyCoupons, toggleDiagnosisCriteria, fetchTransactions, selectLabAppointmentType, savePincode, setCommonUtmTags, unSetCommonUtmTags } from '../../actions/index.js'

import CartView from '../../components/commons/cart'
import STORAGE from '../../helpers/storage'
const queryString = require('query-string')

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
            this.props.getUserProfile() // get loggedIn user profiles
            this.props.getCartItems() // get cart items
            this.props.fetchTransactions() // get already done transaction details
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
        cart, userWalletBalance, userCashbackBalance, profiles, defaultProfile,
        common_utm_tags
    } = state.USER

    return {
        cart, userWalletBalance, userCashbackBalance, profiles, defaultProfile,
        common_utm_tags
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getUserProfile: () => dispatch(getUserProfile()),
        getCartItems: () => dispatch(getCartItems()),
        removeFromCart: (id) => dispatch(removeFromCart(id)),
        processCartItems: (use_wallet, extraParams) => dispatch(processCartItems(use_wallet, extraParams)),
        selectProfile: (id) => dispatch(selectProfile(id)),
        selectOpdTimeSLot: (slot, reschedule, appointmentId, dateParam) => dispatch(selectOpdTimeSLot(slot, reschedule, appointmentId, dateParam)),
        selectLabTimeSLot: (slot, reschedule, dateParam) => dispatch(selectLabTimeSLot(slot, reschedule, dateParam)),
        saveProfileProcedures: (doctor_id, clinic_id, selectedProcedures, forceAdd) => dispatch(saveProfileProcedures(doctor_id, clinic_id, selectedProcedures, forceAdd)),
        clearAllTests: () => dispatch(clearAllTests()),
        applyCoupons: (productId, couponData, couponId, doctor_id) => dispatch(applyCoupons(productId, couponData, couponId, doctor_id)),
        toggleDiagnosisCriteria: (type, criteria, forceAdd) => dispatch(toggleDiagnosisCriteria(type, criteria, forceAdd)),
        fetchTransactions: () => dispatch(fetchTransactions()),
        selectLabAppointmentType: (type) => dispatch(selectLabAppointmentType(type)),
        sendAgentBookingURL: (orderId, type, purchase_type,query_data,extraParams, cb) => dispatch(sendAgentBookingURL(orderId, type,purchase_type,query_data, extraParams, cb)),
        select_opd_payment_type: (type) => dispatch(select_opd_payment_type(type)),
        savePincode: (pincode) => dispatch(savePincode(pincode)),
        setCommonUtmTags: (type, tag) => dispatch(setCommonUtmTags(type, tag)),
        unSetCommonUtmTags: (type, tag)=> dispatch(unSetCommonUtmTags(type, tag))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Cart);
