import React from 'react'
import LeftBar from '../../commons/LeftBar'
import RightBar from '../../commons/RightBar'
import ProfileHeader from '../../commons/DesktopProfileHeader'
import GTM from '../../../helpers/gtm.js'
import STORAGE from '../../../helpers/storage'

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

        if (STORAGE.checkAuth() && false) {
            this.props.fetchOrderSummary(5).then((res) => {
                if (res.data && res.data.length) {
                    this.setState({ items: res.data })

                }
            }).catch((e) => {

            })
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
                            <div className="container-fluid cardMainPaddingRmv">
                                <div className="row mrb-20">
                                    <div className="col-12">
                                        <div className="widget mrb-15 mrng-top-12">
                                            <div className="widget-content">
                                                <h1 className="cod-id">Order id : DP1234566</h1>
                                                <div className="cod-content">
                                                    <p className="cod-prc-bkng">Appointment with Dr. Rajesh Kumar</p>
                                                    <p className="cod-prd">₹ 1170.00</p>
                                                    <button className="cod-btn">Proceed to Pay</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <RightBar extraClass=" chat-float-btn-2" noChatButton={true} />
                    </div>
                </section>
            </div>
        )
    }
}

export default CodPaymentView