import React from 'react';
import ProfileHeader from '../DesktopProfileHeader';
import RightBar from '../RightBar';
import Footer from '../Home/footer'
import { API_GET } from '../../../api/api';

class OffersView extends React.Component {

    navigateTo(id) {
        if (id === 1) {
            let test = {}
            test.type = 'test'
            test.id = 12227
            this.props.toggleDiagnosisCriteria('test', test, true)
            setTimeout(() => {
                this.props.history.push('/lab/searchresults')
            }, 100)
        } else if (id === 2) {
            let test = {}
            test.type = 'test'
            test.id = 11554
            this.props.toggleDiagnosisCriteria('test', test, true)
            setTimeout(() => {
                this.props.history.push('/lab/searchresults')
            }, 100)
        } else if (id === 3) {
            let speciality = {}
            speciality.type = 'procedures_category'
            speciality.id = 2
            let filters = { 'sort_on': 'fees' }
            this.props.toggleOPDCriteria('procedures_category', speciality, true, filters)
            setTimeout(() => {
                this.props.history.push('/opd/searchresults')
            }, 100)
        }
    }

    componentDidMount() {
        API_GET(`/api/v1/banner/list`);
    }

    render() {
        return (
            <div className="profile-body-wrap" style={{ background: '#fff' }}>
                <ProfileHeader showSearch={true} />
                <section className="container parent-section book-appointment-section">
                    <div className="row main-row parent-section-row">
                        <div className="col-12 col-md-7 center-column">
                            <div className="container">
                                <div className="row">
                                    <div className="col-12">
                                        <p className="fw-700 offer-heading mrt-20">Offers</p>
                                    </div>
                                    <div className="col-12">
                                        <div className="offer-div">
                                            <img src={ASSETS_BASE_URL + '/img/banners/banner_paytm.png'} style={{ cursor: 'unset' }} />
                                        </div>
                                        <div className="offer-div" onClick={() => this.navigateTo(1)}>
                                            <img src={ASSETS_BASE_URL + '/img/banners/banner_aarogyam_new.png'} />
                                        </div>
                                        <div className="offer-div" onClick={() => this.navigateTo(2)}>
                                            <img src={ASSETS_BASE_URL + '/img/banners/banner_ultrasound.png'} />
                                        </div>
                                        <div className="offer-div" onClick={() => this.navigateTo(3)}>
                                            <img src={ASSETS_BASE_URL + '/img/banners/banner_teeth.png'} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <RightBar />
                    </div>
                </section>
                <Footer />
            </div>
        )
    }
}

export default OffersView