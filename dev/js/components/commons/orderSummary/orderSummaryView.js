import React from 'react';

import LeftBar from '../../commons/LeftBar'
import RightBar from '../../commons/RightBar'
import ProfileHeader from '../../commons/DesktopProfileHeader'
import GTM from '../../../helpers/gtm.js'
import STORAGE from '../../../helpers/storage'
import InitialsPicture from '../../commons/initialsPicture'

class OrderSummaryView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            items: []
        }
    }

    componentDidMount() {
        if (window) {
            window.scrollTo(0, 0)
        }

        if (STORAGE.checkAuth()) {
            this.props.fetchOrderSummary(this.props.match.params.id).then((res) => {
                if (res.data && res.data.length) {
                    this.setState({ items: res.data })
                }
            }).catch((e) => {

            })
        }
    }

    viewDetail(item) {
        if (item.booking_id) {
            if (item.data.doctor) {
                this.props.history.push(`/opd/appointment/${item.booking_id}`)
            } else {
                this.props.history.push(`/lab/appointment/${item.booking_id}`)
            }
        } else {
            this.props.history.push('/cart')
        }
    }

    render() {

        return (
            <div className="profile-body-wrap">
                <ProfileHeader />
                <section className="container container-top-margin">
                    <div className="row main-row parent-section-row">
                        <LeftBar />

                        <div className="col-12 col-md-7 col-lg-7 center-column">

                            <section className="booking-confirm-screen">
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="col-12">

                                            <h4 className="shoping-cart-main-heading">Your Appointments</h4>

                                            {
                                                this.state.items.map((item, i) => {
                                                    return <div className="widget mrb-15 mrng-top-12 p-relative pb-5">
                                                        <div>
                                                            {
                                                                item.booking_id ? <p className="cart-appntmnt">Transaction success </p> : <p className="cart-appntmnt-failed">Transaction Failed </p>
                                                            }
                                                            {
                                                                item.booking_id ? <p className="cartBooking">Booking ID : {item.booking_id}</p> : ""
                                                            }
                                                        </div>
                                                        <div className={item.booking_id ? "" : "cart-card-blur-opacity"}>
                                                            <div className="shopng-cart-price">
                                                                <p><img src="/assets/img/rupee-icon.svg" alt="rupee-icon" className="icon-rupee" /> {item.deal_price} <span className="shopng-cart-price-cut"><img src="/assets/img/rupee-icon.svg" alt="rupee-icon" className="icon-rupee" />{item.mrp}</span>
                                                                </p>
                                                            </div>
                                                            <div className="widget-header dr-qucik-info">
                                                                <div>
                                                                    <div>
                                                                        <InitialsPicture name={item.data.doctor ? item.data.doctor.name : item.data.lab.name} has_image={!!item.data.thumbnail} className="initialsPicture-dbd mt-0">
                                                                            <img src={item.data.thumbnail} style={{ width: 50 }} className="img-fluid img-round" />
                                                                        </InitialsPicture>
                                                                    </div>
                                                                </div>
                                                                <div className="dr-profile mrt-10">
                                                                    {
                                                                        item.data.doctor ? <h1 className="dr-name">{item.data.doctor.name}</h1> : <h1 className="dr-name">{item.data.lab.name}</h1>
                                                                    }

                                                                    {
                                                                        item.data.hospital ? <p className="clinic-name text-sm">{item.data.hospital.name}</p> : ""
                                                                    }
                                                                </div>
                                                            </div>
                                                            <div className="shopping-card-details-list">
                                                                <ul>
                                                                    <li className="cart-viewdtls-container"><p><span className="shpng-dtls-ico"><img src="/assets/img/watch-date.svg" style={{ marginTop: '2px', width: '15px' }} /></span>{(new Date(item.time_slot_start)).toLocaleDateString()} | {(new Date(item.time_slot_start)).toLocaleTimeString()}</p>
                                                                        <span onClick={this.viewDetail.bind(this, item)} className="float-right cart-viewdtls-btn">{item.booking_id ? "View Detail" : "View in Cart"}</span>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                })
                                            }

                                        </div>
                                    </div>
                                </div>
                            </section>

                        </div>

                        <RightBar extraClass=" chat-float-btn-2" noChatButton={true} />
                    </div>
                </section>
            </div>
        );
    }
}


export default OrderSummaryView
