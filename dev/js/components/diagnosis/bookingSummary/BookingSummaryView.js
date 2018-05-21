import React from 'react';
import { connect } from 'react-redux'

import Loader from '../../commons/Loader'
import VisitTime from './visitTime'
import PickupAddress from './pickupAddress'
import ChoosePatient from './choosePatient'

class BookingSummaryView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedLab: this.props.match.params.id,
            pickupType: "lab"
        }
    }

    componentDidMount() {
        this.props.getLabById(this.state.selectedLab)
    }

    openTests() {
        this.props.history.push(`/lab/${this.state.selectedLab}/tests`)
    }

    handlePickupType(e) {
        this.setState({ pickupType: e.target.value })
    }

    getSelectors() {
        switch (this.state.pickupType) {
            case "lab": {
                return <div>
                    <VisitTime type="lab"/>
                    <ChoosePatient />
                </div>
            }

            case "home": {
                return <div>
                    <VisitTime type="home"/>
                    <ChoosePatient />
                    <PickupAddress />
                </div>
            }
        }
    }


    render() {

        let tests = []
        let finalPrice = 0
        let labDetail = {}

        if (this.props.LABS[this.state.selectedLab]) {
            labDetail = this.props.LABS[this.state.selectedLab].lab
            tests = this.props.selectedCriterias.filter(x => x.type == 'test').map((test, i) => {
                let price = 0
                this.props.LABS[this.state.selectedLab].tests.map((twp) => {
                    if (twp.test_id == test.id) {
                        price = twp.mrp
                    }
                })
                finalPrice += price
                return <p key={i} className="test-list">{test.name}<span className="float-right fw-700">Rs. {price}</span></p>
            })
        }

        return (
            <div>
                <header className="skin-white fixed horizontal top bdr-1 bottom light">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-2">
                                <ul className="inline-list">
                                    <li onClick={() => {
                                        this.props.history.go(-1)
                                    }}><span className="icon icon-sm text-middle back-icon-white"><img src="/assets/img/customer-icons/back-icon.png" className="img-fluid" /></span></li>
                                </ul>
                            </div>
                            <div className="col-8">
                                <div className="header-title fw-700 capitalize text-center">Booking Confirmation</div>
                            </div>
                            <div className="col-2">
                                {/* <ul class="inline-list float-right user-notification-action">
						<li><span class="icon icon-md text-middle"><img src="/assets/img/customer-icons/user.svg" class="img-fluid"></span></li>
						<li><span class="icon icon-md text-middle notification-icon"><img src="/assets/img/customer-icons/notification.svg" class="img-fluid"> <span class="notification-alert"></span></span></li>
					</ul> */}
                            </div>
                        </div>
                    </div>
                </header>

                {
                    this.props.LABS[this.state.selectedLab] ?
                        <div>
                            <section className="wrap booking-confirm-screen">
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="widget mrt-10">
                                                <div className="widget-header bdr-1 bottom light text-center">
                                                    <ul className="inline-list booking-type">
                                                        <li><label className="radio-inline text-md fw-700 text-primary"><input type="radio" name="optradio" onChange={this.handlePickupType.bind(this)} value="home" checked={this.state.pickupType == 'home'} /> Home Pick-up</label></li>
                                                        <li><label className="radio-inline text-md fw-700 text-primary"><input type="radio" name="optradio" onChange={this.handlePickupType.bind(this)} value="lab" checked={this.state.pickupType == 'lab'} /> Lab Visit</label></li>
                                                    </ul>
                                                </div>
                                                <div className="widget-content">
                                                    <div className="lab-details">
                                                        <img src="/assets/img/customer-icons/lab1.png" className="img-fluid" />
                                                        <div className="lab-title">
                                                            <h4 className="fw-700 text-md title">{labDetail.name}</h4>
                                                            <p className="fw-500 text-sm text-light">{labDetail.address}</p>
                                                        </div>
                                                    </div>

                                                    {this.getSelectors()}

                                                    <div className="lab-visit-time test-report">
                                                        <h4 className="title"><span><img src="/assets/img/customer-icons/test.svg" /></span>Tests <span className="float-right"><a onClick={this.openTests.bind(this)} className="text-primary fw-700 text-sm">Change Tests</a></span></h4>
                                                        {tests}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <button className="v-btn v-btn-primary btn-lg fixed horizontal bottom no-round btn-lg text-lg">Proceed to Pay Rs. {finalPrice}</button>

                        </div> : <Loader />
                }

            </div>
        );
    }
}


export default BookingSummaryView
