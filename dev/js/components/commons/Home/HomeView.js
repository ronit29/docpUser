import React from 'react';

import ProfieCard from './ProfileCard'

class HomeView extends React.Component {
    constructor(props) {
        super(props)
    }

    navigateTo(where) {
        this.props.history.push(where)
    }

    render() {

        return (
            <div>
                <header className="skin-primary fixed horizontal top">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-4">
                                <div className="header-title fw-700 capitalize text-white">ICON</div>
                            </div>
                            <div className="col-4">
                            </div>
                            <div className="col-4">
                                <ul className="inline-list float-right user-notification-action">
                                    <li onClick={this.navigateTo.bind(this, '/user')}><span className="icon icon-md text-middle"><img src="/assets/img/customer-icons/user.svg" className="img-fluid" /></span></li>
                                    <li><span className="icon icon-md text-middle notification-icon"><img src="/assets/img/customer-icons/notification.svg" className="img-fluid" /> <span className="notification-alert" /></span></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </header>
                <section className="wrap ct-home-screen">
                    <div className="container-fluid">

                        {
                            this.props.profiles[this.props.selectedProfile] ? <ProfieCard data={this.props.profiles[this.props.selectedProfile]} /> : ""
                        }

                        <div className="row">
                            <div className="col-6" onClick={this.navigateTo.bind(this, '/opd')}>
                                <div className="widget">
                                    <div className="widget-content text-center booked-dr">
                                        <div className="ct-img ct-img-lg stath-img">
                                            <img src="/assets/img/customer-icons/steth.svg" className="img-fluid stath-img" />
                                        </div>
                                        <h4 className="text-md fw-500">Book and Visit a Doctor</h4>
                                    </div>
                                </div>
                            </div>
                            <div className="col-6" onClick={this.navigateTo.bind(this, '/dx')}>
                                <div className="widget">
                                    <div className="widget-content text-center booked-dr">
                                        <div className="ct-img ct-img-lg stath-img">
                                            <img src="/assets/img/customer-icons/medical-test.svg" className="img-fluid stath-img" />
                                        </div>
                                        <h4 className="text-md fw-500">Book medical test</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <div className="widget consultant-quick">
                                    <div className="widget-header">
                                        <h4 className="widget-title fw-700 text-lg text-center">Get instant Consultation right now for <a href="#" className="link-text">FREE</a></h4>
                                    </div>
                                    <div className="widget-content text-center">
                                        <div className="row">
                                            <div className="col-6">
                                                <span className="ct-img ct-img-sm"><img src="/assets/img/customer-icons/message.svg" className="img-fluid" /></span>
                                            </div>
                                            <div className="col-6">
                                                <span className="ct-img ct-img-sm"><img src="/assets/img/customer-icons/call.svg" className="img-fluid" /></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="widget-footer">
                                        <div className="enq-suggestion">
                                            <ul className="inline-list">
                                                <li><a href="#" className="v-btn v-btn-primary outline round-tag">Headache</a></li>
                                                <li><a href="#" className="v-btn v-btn-primary outline round-tag">Headache</a></li>
                                                <li><a href="#" className="v-btn v-btn-primary outline round-tag">Headache</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <div className="widget">
                                    <div className="widget-content">
                                        <input type="text" className="fc-input input-line" placeholder="I am suffering form headache" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

export default HomeView
