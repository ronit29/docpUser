import React from 'react';
import { connect } from 'react-redux';

import { getUserProfile, getCartItems, removeFromCart, processCartItems, selectProfile } from '../../actions/index.js'

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
        cart
    } = state.USER

    return {
        cart
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getUserProfile: () => dispatch(getUserProfile()),
        getCartItems: () => dispatch(getCartItems()),
        removeFromCart: (id) => dispatch(removeFromCart(id)),
        processCartItems: () => dispatch(processCartItems()),
        selectProfile: (id) => dispatch(selectProfile(id))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Cart);
