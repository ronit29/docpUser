import React from 'react';
import ProfileHeader from '../DesktopProfileHeader';
import RightBar from '../RightBar';
import Footer from '../Home/footer'

class OffersView extends React.Component {

    navigateTo(offer) {
        if (offer.url_details && offer.url_details.test_ids) {
            let test = {}

            let filters = { 'priceRange': [offer.url_details.min_fees, offer.url_details.max_fees], 'distanceRange': [offer.url_details.min_distance, offer.url_details.max_distance], 'sort_on': offer.url_details.sort_on || '', 'lab_name': offer.url_details.lab_name || '', 'network_id': offer.url_details.network_id || '' }

            test.type = 'test'
            test.id = parseInt(offer.url_details.test_ids)
            this.props.toggleDiagnosisCriteria('test', test, true, filters)
            setTimeout(() => {
                this.props.history.push('/lab/searchresults')
            }, 100)
        }

        else if (offer.url_details && offer.url_details.specializations && offer.url_details.specializations != '') {
            let speciality = {}

            let filters = { 'priceRange': [offer.url_details.min_fees, offer.url_details.max_fees], 'distanceRange': [offer.url_details.min_distance, offer.url_details.max_distance], 'sort_on': offer.url_details.sort_on || '', 'is_female': offer.url_details.is_female || false, 'is_available': offer.url_details.is_available || false, 'doctor_name': offer.url_details.doctor_name || '', 'hospital_name': offer.url_details.hospital_name || '', 'hospital_id': offer.url_details.hospital_id || '' }

            speciality.type = 'speciality'
            speciality.id = parseInt(offer.url_details.specializations)
            this.props.toggleOPDCriteria('speciality', speciality, true, filters)
            setTimeout(() => {
                this.props.history.push('/opd/searchresults')
            }, 100)
        }

        else if (offer.url_details && offer.url_details.procedure_ids && offer.url_details.procedure_ids != '') {
            let speciality = {}

            let filters = { 'priceRange': [offer.url_details.min_fees, offer.url_details.max_fees], 'distanceRange': [offer.url_details.min_distance, offer.url_details.max_distance], 'sort_on': offer.url_details.sort_on || '', 'is_female': offer.url_details.is_female || false, 'is_available': offer.url_details.is_available || false, 'doctor_name': offer.url_details.doctor_name || '', 'hospital_name': offer.url_details.hospital_name || '', 'hospital_id': offer.url_details.hospital_id || '' }

            speciality.type = 'procedures'
            speciality.id = parseInt(offer.url_details.procedure_ids)
            this.props.toggleOPDCriteria('procedures', speciality, true, filters)
            setTimeout(() => {
                this.props.history.push('/opd/searchresults')
            }, 100)
        }

        else if (offer.url_details && offer.url_details.procedure_category_ids && offer.url_details.procedure_category_ids != '') {
            let speciality = {}

            let filters = { 'priceRange': [offer.url_details.min_fees, offer.url_details.max_fees], 'distanceRange': [offer.url_details.min_distance, offer.url_details.max_distance], 'sort_on': offer.url_details.sort_on || '', 'is_female': offer.url_details.is_female || false, 'is_available': offer.url_details.is_available || false, 'doctor_name': offer.url_details.doctor_name || '', 'hospital_name': offer.url_details.hospital_name || '', 'hospital_id': offer.url_details.hospital_id || '' }

            speciality.type = 'procedures_category'
            speciality.id = parseInt(offer.url_details.procedure_category_ids)
            this.props.toggleOPDCriteria('procedures_category', speciality, true, filters)
            setTimeout(() => {
                this.props.history.push('/opd/searchresults')
            }, 100)
        }

        else if (offer.url_details && offer.url_details.conditions && offer.url_details.conditions != '') {
            let speciality = {}

            let filters = { 'priceRange': [offer.url_details.min_fees, offer.url_details.max_fees], 'distanceRange': [offer.url_details.min_distance, offer.url_details.max_distance], 'sort_on': offer.url_details.sort_on || '', 'is_female': offer.url_details.is_female || false, 'is_available': offer.url_details.is_available || false, 'doctor_name': offer.url_details.doctor_name || '', 'hospital_name': offer.url_details.hospital_name || '', 'hospital_id': offer.url_details.hospital_id || '' }

            speciality.type = 'condition'
            speciality.id = parseInt(offer.url_details.conditions)
            this.props.toggleOPDCriteria('condition', speciality, true, filters)
            setTimeout(() => {
                this.props.history.push('/opd/searchresults')
            }, 100)
        }

        else if (offer.url) {
            this.props.history.push(offer.url)
        }

        // if (id === 1) {
        //     let test = {}
        //     test.type = 'test'
        //     test.id = 12227
        //     this.props.toggleDiagnosisCriteria('test', test, true)
        //     setTimeout(() => {
        //         this.props.history.push('/lab/searchresults')
        //     }, 100)
        // } else if (id === 2) {
        //     let test = {}
        //     test.type = 'test'
        //     test.id = 11554
        //     this.props.toggleDiagnosisCriteria('test', test, true)
        //     setTimeout(() => {
        //         this.props.history.push('/lab/searchresults')
        //     }, 100)
        // } else if (id === 3) {
        //     let speciality = {}
        //     speciality.type = 'procedures_category'
        //     speciality.id = 2
        //     let filters = { 'sort_on': 'fees' }
        //     this.props.toggleOPDCriteria('procedures_category', speciality, true, filters)
        //     setTimeout(() => {
        //         this.props.history.push('/opd/searchresults')
        //     }, 100)
        // }
    }

    componentDidMount() {
        this.props.getOfferList();
    }

    render() {
        console.log('gsgusdg')
        console.log(this.props.offerList)
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


                                        {
                                            this.props.offerList ?
                                                this.props.offerList.map((offer, i) => {
                                                    if (offer.slider_location === 'offers_page') {
                                                        return <div className="offer-div" key={i} onClick={() => this.navigateTo(offer)} >
                                                            <img src={offer.image} />
                                                        </div>
                                                    }
                                                }) : ''
                                        }


                                        {/* <div className="offer-div">
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
                                        </div> */}
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