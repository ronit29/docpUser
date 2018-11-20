import React from 'react';
import TermsConditions from '../../couponSelectionView/termsConditions.js'

class UserCoupons extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            openTermsConditions: false,
            selectedCoupon: null
        }
    }

    toggleTandC(selectedCoupon = null) {
        this.setState({ openTermsConditions: !this.state.openTermsConditions, selectedCoupon });
    }


    render() {

        return (
            <div className="widget-content">
                <div className="col-md-12 mt-21">
                    <h5 className="all-offers">All offers</h5>
                    <div className="widget no-round no-shadow skin-transparent profile-nav">
                        <div className="widget-content padding-remove">
                            {
                                this.props.applicableCoupons && this.props.applicableCoupons.length ?
                                    <div className="coupon-listing dp-user-list bg-lst">
                                        {
                                            this.props.applicableCoupons.map((coupon, i) => {
                                                return <div className="coupons-container">
                                                    <h5 className="avl-cpn-hdng">Available Coupons</h5>
                                                    <div className="coupan-name">
                                                        <span className="coupon-desing">{coupon.code}</span>
                                                        <span className="coupon-avail">Avail Now   <img src={ASSETS_BASE_URL + "/img/customer-icons/rgt-arw.svg"} className="img-fluid" /> </span>
                                                    </div>
                                                    <div className="couon-details">
                                                        <span className="coupon-ins">{coupon.heading}</span>
                                                        <p className="coupon-dtls-p">{coupon.desc}</p>
                                                        <span onClick={this.toggleTandC.bind(this, coupon)} className="coupon-terms">Terms & Conditions</span>
                                                    </div>
                                                </div>
                                            })
                                        }

                                    </div> : ""
                            }

                        </div>
                    </div>
                </div>
                {
                    this.state.openTermsConditions && this.state.selectedCoupon ?
                        <TermsConditions toggle={() => this.toggleTandC()} tnc={this.state.selectedCoupon.tnc} /> : ''
                }
            </div>
        );
    }
}


export default UserCoupons
