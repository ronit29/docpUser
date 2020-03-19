import React from 'react';

class GoldHomePageView extends React.PureComponent {

    render() {

        return (

            <div className="gold-banner-container d-lg-none d-none mb-10">
                <div className="gold-banner-card">
                    <div className="gld-home-icon">
                        <p>Docprime <img className="img-fluid" src={ASSETS_BASE_URL + '/img/gold-lg.png'} /></p>
                    </div>
                    <div className="gld-home-content">
                        <h3>The Healthcare Membership <br />You Can’t Do Without</h3>
                        <p>Save More Than ₹6,000/yr With Special Prices on OPD Consultations, Lab Tests and Medicines</p>
                    </div>
                    <div className="gld-home-ico">
                        <div className="gld-ico-card">
                            <img className="img-fluid" src={ASSETS_BASE_URL + '/img/dicicon1.svg'} />
                            <p>Exclusive Prices<br />
                            On Doctors & Labs
                            </p>
                        </div>
                        <div className="gld-ico-card">
                            <img className="img-fluid" src={ASSETS_BASE_URL + '/img/dicicon2.svg'} />
                            <p>Flat 23% OFF <br />
                            on Medicines
                            </p>
                        </div>
                        <div className="gld-ico-card">
                            <img className="img-fluid" src={ASSETS_BASE_URL + '/img/dicicon3.svg'} />
                            <p>Unlimited Tele<br />
                            Consultations
                            </p>
                        </div>
                    </div>
                    <div className="gold-home-price">
                        <p>Starting at just <strong>₹199</strong>/yr </p>
                        <button onClick={this.props.clickedGoldBanner}>View Plans</button>
                    </div>
                </div>
            </div>

        )
    }
}

export default GoldHomePageView;
