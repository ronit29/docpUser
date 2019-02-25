import React from 'react';
import { connect } from 'react-redux';


import { setCorporateCoupon, editUserProfileImage, getAppointmentReports, selectPickupAddress, editUserProfile, getUserProfile, getProfileAppointments, selectProfile, getUserAddress, addUserAddress, updateUserAddress, logout, getUserPrescription, getCoupons, applyCoupons, clearExtraTests, getUserReviews, getRatingCompliments, updateAppointmentRating, OTTLogin, getCartItems } from '../../actions/index.js'

import STORAGE from '../../helpers/storage'

import UserProfileView from '../../components/commons/userProfile/index.js'
const queryString = require('query-string');


class UserProfile extends React.Component {
    constructor(props) {
        super(props)
        if (!STORAGE.checkAuth()) {
            const parsed = queryString.parse(window.location.search)
            if (parsed && parsed.ref) {
                this.props.history.replace(`/login?callback=/&ref=home`)
            } else {
                this.props.history.replace(`/login?callback=/`)
            }

        }
    }

    static loadData(store) {
        return store.dispatch(getUserProfile())
    }

    static contextTypes = {
        router: () => null
    }

    componentDidMount() {
        if (STORAGE.checkAuth()) {
            this.props.getUserProfile()
            this.props.getUserAddress()
            this.props.getCoupons({})
            this.props.getCartItems()
        }

    }

    render() {
        if (!STORAGE.checkAuth()) {
            return <div></div>

        }
        return (
            <UserProfileView {...this.props} />
        );
    }
}

const mapStateToProps = (state) => {
    const USER = state.USER

    const {
        applicableCoupons
    } = state.USER

    return {
        USER,
        applicableCoupons
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logout: (roomId) => dispatch(logout(roomId)),
        getUserProfile: () => dispatch(getUserProfile()),
        getProfileAppointments: (profile_id) => dispatch(getProfileAppointments(profile_id)),
        selectProfile: (profile_id) => dispatch(selectProfile(profile_id)),
        getUserAddress: () => dispatch(getUserAddress()),
        addUserAddress: (postData, cb) => dispatch(addUserAddress(postData, cb)),
        updateUserAddress: (postData, cb) => dispatch(updateUserAddress(postData, cb)),
        editUserProfile: (profileData, profileId, cb) => dispatch(editUserProfile(profileData, profileId, cb)),
        editUserProfileImage: (profileData, profileId, cb) => dispatch(editUserProfileImage(profileData, profileId, cb)),
        selectPickupAddress: (address) => dispatch(selectPickupAddress(address)),
        getAppointmentReports: (appointmentId, type, cb) => dispatch(getAppointmentReports(appointmentId, type, cb)),
        getUserPrescription: (mobileNo) => dispatch(getUserPrescription(mobileNo)),
        getCoupons: (productId) => dispatch(getCoupons(productId)),
        getUserReviews: (cb) => dispatch(getUserReviews(cb)),
        getRatingCompliments: (callback) => dispatch(getRatingCompliments(callback)),
        updateAppointmentRating: (ratingData, callback) => dispatch(updateAppointmentRating(ratingData, callback)),
        OTTLogin: (ott) => dispatch(OTTLogin(ott)),
        setCorporateCoupon: (coupon) => dispatch(setCorporateCoupon(coupon)),
        clearExtraTests: () => dispatch(clearExtraTests()),
        getCartItems: () => dispatch(getCartItems()),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
