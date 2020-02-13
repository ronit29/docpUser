import React from 'react'
import LeftBar from '../../commons/LeftBar'
import RightBar from '../../commons/RightBar'
import ProfileHeader from '../../commons/DesktopProfileHeader'
import GTM from '../../../helpers/gtm.js'
import STORAGE from '../../../helpers/storage'
const queryString = require('query-string');
import Disclaimer from '../../commons/Home/staticDisclaimer.js'

class CodPaymentView extends React.Component {

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

        const parsed = queryString.parse(this.props.location.search)

        if (STORAGE.checkAuth() && parsed.order_id) {
            this.props.fetchOrderSummary(parsed.order_id).then((res) => {
                if (res.data && res.data.length) {
                    this.setState({ items: res.data })

                }
            }).catch((e) => {

            })
        }else {
            this.props.history.push('/')
        }
    }

    proceed(order_id){

        this.props.history.push(`/payment/${order_id}`)
    }

    render() {

        const parsed = queryString.parse(this.props.location.search)
        let amount_payable = 0
        let doctor_name = ''
        if(this.state.items && this.state.items.length) {
            this.state.items.map((order, i)=> {
                if(i==0 && order.data && order.data.doctor && order.data.doctor.name) {
                    doctor_name = order.data.doctor.name
                }
                amount_payable+= parseInt(order.deal_price)
            })
        }

        return (
            <div className="profile-body-wrap">
                <ProfileHeader />
                <section className="container container-top-margin">
                    <div className="row main-row parent-section-row">
                        <LeftBar />

                        <div className="col-12 col-md-7 col-lg-7 center-column">
                            <div className="container-fluid cardMainPaddingRmv">
                                <div className="row mrb-20">
                                    {
                                        parsed.order_id && this.state.items && this.state.items.length?
                                        <div className="col-12">
                                            <div className="widget mrb-15 mrng-top-12">
                                                <div className="widget-content">
                                                    <h1 className="cod-id">Order id : {parsed.order_id}</h1>
                                                    <div className="cod-content">
                                                        {
                                                            doctor_name?
                                                            <p className="cod-prc-bkng">{`Appointment with ${doctor_name}`}</p>
                                                            :''    
                                                        }
                                                        
                                                        <p className="cod-prd">₹ {amount_payable}</p>
                                                        <button className="cod-btn" onClick={this.proceed.bind(this, parsed.order_id)}>Proceed to Pay</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        :<div className="col-12">
                                            <div className="widget mrb-15 mrng-top-12">
                                                <div className="widget-content">
                                                    <div className="cod-content">
                                                        <p className="cod-prc-bkng">No Appointment Found for this Order Id</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>    
                                    }
                                    
                                </div>
                            </div>
                        </div>

                        <RightBar extraClass=" chat-float-btn-2" noChatButton={true} msgTemplate="gold_general_template"/>
                    </div>
                </section>
                <Disclaimer />
            </div>
        )
    }
}

export default CodPaymentView