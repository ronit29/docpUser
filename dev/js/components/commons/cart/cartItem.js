import React from 'react';
import InitialsPicture from '../../commons/initialsPicture'

class CartItem extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    removeFromCart(id) {
        this.props.removeFromCart(id)
    }

    edit(item) {
        let { valid, product_id, mrp, deal_price, id } = this.props
        let { lab, test_ids, doctor, hospital, coupon_code, profile, procedure_ids, is_home_pickup, address, start_date, start_time } = this.props.actual_data

        // doctor
        if (product_id == 1) {
            return
        }

        // lab
        if (product_id == 2) {
            return
        }

    }

    applyCoupon() {

    }

    render() {

        let { valid, product_id, mrp, deal_price, id } = this.props
        let { lab, tests, doctor, hospital, coupons, profile, date, thumbnail } = this.props.data
        if (date) {
            date = new Date(date)
        }

        return (
            <div>
                {/* ===================== start shopping card static html ===================== */}

                <div className="widget mrb-15 mrng-top-12 p-relative">
                    <div className="shopng-cart-price">
                        {
                            mrp ? <p><img src={ASSETS_BASE_URL + "/img/rupee-icon.svg"} alt="rupee-icon" className="icon-rupee" /> {deal_price} <span className="shopng-cart-price-cut"><img src={ASSETS_BASE_URL + "/img/rupee-icon.svg"} alt="rupee-icon" className="icon-rupee" />{mrp}</span></p> : ""
                        }

                    </div>
                    <div className="widget-header dr-qucik-info">
                        <div>
                            <div>
                                <InitialsPicture name={doctor ? doctor.name : lab.name} has_image={!!thumbnail} className="initialsPicture-dbd mt-0">
                                    <img src={thumbnail} style={{ width: 50 }} className="img-fluid img-round" />
                                </InitialsPicture>
                            </div>
                        </div>
                        {
                            doctor ? <div className="dr-profile mrt-10">
                                <h1 className="dr-name">Dr. {doctor.name}</h1>
                                <p className="clinic-name text-sm">{hospital.name}</p>
                            </div> : <div className="dr-profile mrt-10">
                                    <h1 className="dr-name">{lab.name}</h1>
                                </div>
                        }

                    </div>
                    <div className="shopping-card-details-list">
                        <ul>
                            {
                                date ? <li>
                                    <p>
                                        <span className="shpng-dtls-ico"><img style={{ marginTop: '2px', width: '15px' }} src={ASSETS_BASE_URL + "/img/watch-date.svg"} /></span>{date.toDateString()} | {date.toLocaleTimeString()}
                                    </p>
                                </li> : ""
                            }

                            {
                                profile ? <li>
                                    <p>
                                        <span className="shpng-dtls-ico"><img src={ASSETS_BASE_URL + "/img/nw-usr.svg"} /></span>{profile.name}
                                    </p>
                                </li> : ""
                            }

                            {
                                coupons && coupons.length ? <li>
                                    <p>
                                        <span className="shpng-dtls-ico"><img src={ASSETS_BASE_URL + "/img/ofr-cpn.svg"} /></span>
                                        Coupon Applied: <span className="coupon-applies-shpngcard">{coupons[0]}</span>
                                    </p>
                                </li> : ""
                            }

                        </ul>
                    </div>
                    {
                        tests && tests.length ? <div className="widget-content">
                            <div className="shoping-cart-test-list">
                                <div className="p-relative">
                                    <img className="shpng-cart-tst-lst-img" src={ASSETS_BASE_URL + "/img/flask.svg"} />
                                    {
                                        tests.map((test, i) => {
                                            return <p className="test-list test-list-label clearfix new-lab-test-list">

                                                <span className="float-right fw-700">₹ {test.deal_price}<span className="test-mrp">₹ {test.mrp}</span>
                                                </span>
                                                <span className="test-name-item">{test.test_name}</span>
                                            </p>
                                        })
                                    }
                                </div>
                            </div>
                        </div> : ""
                    }

                    <div className="shpng-card-btns">
                        <button onClick={this.removeFromCart.bind(this, id)}>Remove</button>
                        <button onClick={this.edit.bind(this)}>Edit</button>
                    </div>
                </div>

            </div>
        );
    }
}


export default CartItem
