import React from 'react'

class DigitStaticDataView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            toggle: 'one'
        }
    }

    render() {
        let dwnlUrl = 'https://drive.google.com/file/d/1furIUXTcmwgA6zQ1ipfydFDcEGleq2RE/view';
        return (
                        <div className="widget mrb-10">
                            <div className="ins-card-head">
                                <div className="ins-name-head-div d-flex align-items-start digit-logo">
                                    <img className="img-fluid " width="60" src="https://www.reinsurancene.ws/wp-content/uploads/2019/03/digit-insurance-logo.jpg" />
                                    <p className="fw-500 mrt-10">
                                    Protect Against Coronavirus under Digit group Illness policy</p>
                                </div>
                                <div className="ins-pdf-dwnload-div d-flex align-items-center">
                                    <a href="https://drive.google.com/file/d/1furIUXTcmwgA6zQ1ipfydFDcEGleq2RE/view" target="_blank" download >
                                        <img src={ASSETS_BASE_URL + "/img/pdf-dwn.png"} />
                                    </a>
                                    <span className="fw-500">
                                        Policy Details</span>
                                </div>
                            </div>
                            <div className="ins-swich-tabs-container">
                                <div className="ins-tabs">
                                    <ul>
                                        <li onClick={()=> this.setState({toggle:'one'})}>
                                            <p className={this.state.toggle == "one"?'active':'ins-tab-inactive'}>Features</p>
                                        </li>
                                        <li onClick={()=> this.setState({toggle:'two'})}>
                                            <p className={this.state.toggle == "two"?'active':'ins-tab-inactive'} >What's not Covered?</p></li>
                                    </ul>
                                </div>
                                <div className="ins-tabs-content widget-content">
                                    {
                                        this.state.toggle == "one"?
                                        <ul>
                                            <li>Sum Insured Type : Individual for each member covered</li>
                                            <li>Room rent restriction : No Restriction</li>
                                            <li>ICU limit : No Restriction</li>
                                            <li>Pre and Post hospitalization days : 30 days and 60 days respectively</li>
                                            <li>Road Ambulance : 1% of the SI (up to INR 5,000)</li>
                                            <li>Second medical opinion : Covered</li>
                                            <li>Types of hospitals covered : All</li>
                                        </ul>
                                        :<ul>
                                            <li>Hospitalisation expenses not in lieu of treatment for Coronavirus disease (COVID-19) will not be covered.</li>
                                            <li>Insured members already treated for or quarantined for Coronavirus disease (COVID-19) before the policy issuance will not be covered.</li>
                                            <li>Treatment taken outside India will not be covered.</li>
                                            <li>Home hospitalisation (Domiciliary hospitalisation) expenses will not be covered.</li>
                                            <li>Hospitalisation expenses for patients only under investigation with inconclusive medical report will not be covered.</li>
                                        </ul>
                                    }
                                </div>
                            </div>
                        </div>
                );
            }
        }

export default DigitStaticDataView