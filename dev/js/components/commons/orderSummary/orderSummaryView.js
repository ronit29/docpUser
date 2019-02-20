import React from 'react';

import LeftBar from '../../commons/LeftBar'
import RightBar from '../../commons/RightBar'
import ProfileHeader from '../../commons/DesktopProfileHeader'
import GTM from '../../../helpers/gtm.js'
import STORAGE from '../../../helpers/storage'
import InitialsPicture from '../../commons/initialsPicture'
import CRITEO from '../../../helpers/criteo.js'

class OrderSummaryView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            items: [],
            payment_success: this.props.location.search.includes('payment_success')
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

                    let orderId = this.props.match.params.id
                    let deal_price = 0
                    let info = {}
                    info[orderId] = []
                    res.data.map((data) => {
                        info[orderId].push({ 'booking_id': data.booking_id, 'mrp': data.mrp, 'deal_price': data.deal_price })
                        deal_price += parseInt(data.deal_price)
                    })
                    info = JSON.stringify(info)

                    STORAGE.setAppointmentDetails(info).then((setCookie) => {

                        if (this.state.payment_success) {

                            let analyticData = {
                                'Category': 'ConsumerApp', 'Action': 'OrderPlaced', 'CustomerID': GTM.getUserId(), 'leadid': orderId, 'event': 'order-booked'
                            }
                            GTM.sendEvent({ data: analyticData })
                            this.props.history.replace(this.props.location.pathname + "?hide_button=true")

                            let criteo_data =
                                {
                                    'event': "trackTransaction", 'id': orderId, 'item': [
                                        { 'id': "1", 'price': deal_price, 'quantity': 1 }
                                    ]
                                }

                            CRITEO.sendData(criteo_data)
                        }
                    })

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
                                                    return <div key={i} className="widget mrb-15 mrng-top-12 p-relative pb-5">
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
                                                                {
                                                                    item.payment_type == 1 ? <p>
                                                                        <img src="/assets/img/rupee-icon.svg" alt="rupee-icon" className="icon-rupee" />
                                                                        {" " + item.effective_price}
                                                                    </p> : <p>
                                                                            <img src="/assets/img/rupee-icon.svg" alt="rupee-icon" className="icon-rupee" />
                                                                            {" " + item.mrp}
                                                                        </p>
                                                                }
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
