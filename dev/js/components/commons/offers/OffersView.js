import React from 'react';
import ProfileHeader from '../DesktopProfileHeader';
import RightBar from '../RightBar';
import Footer from '../Home/footer'
import GTM from '../../../helpers/gtm';
import FixedMobileFooter from '../Home/FixedMobileFooter';

class OffersView extends React.Component {

    navigateTo(offer) {
        if (offer.url_details && offer.url_details.test_ids) {
            let test = {}

            let filters = { 'priceRange': [offer.url_details.min_fees, offer.url_details.max_fees], 'distanceRange': [offer.url_details.min_distance, offer.url_details.max_distance], 'sort_on': offer.url_details.sort_on || '', 'lab_name': offer.url_details.lab_name || '', 'network_id': offer.url_details.network_id || '' }

            test.type = 'test'
            test.id = []

            let testIdArray = offer.url_details.test_ids.split(',');
            for (let id in testIdArray) {
                test.id.push(parseInt(testIdArray[id]))
            }

            this.props.toggleDiagnosisCriteria('test', test, true, filters)
            setTimeout(() => {
                this.props.history.push('/lab/searchresults')
            }, 100)

            let data = {
                'Category': 'ConsumerApp', 'Action': offer.event_name, 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': offer.event_name, 'clickedOn': offer.slider_location
            }
            GTM.sendEvent({ data: data })
        }

        else if (offer.url_details && offer.url_details.specializations && offer.url_details.specializations != '') {
            let speciality = {}

            let filters = { 'priceRange': [offer.url_details.min_fees, offer.url_details.max_fees], 'distanceRange': [offer.url_details.min_distance, offer.url_details.max_distance], 'sort_on': offer.url_details.sort_on || '', 'is_female': offer.url_details.is_female || false, 'is_available': offer.url_details.is_available || false, 'doctor_name': offer.url_details.doctor_name || '', 'hospital_name': offer.url_details.hospital_name || '', 'hospital_id': offer.url_details.hospital_id || '' }

            speciality.type = 'speciality'
            speciality.id = []

            let specialityIdArray = offer.url_details.specializations.split(',');
            for (let id in specialityIdArray) {
                speciality.id.push(parseInt(specialityIdArray[id]))
            }

            this.props.toggleOPDCriteria('speciality', speciality, true, filters)
            setTimeout(() => {
                this.props.history.push('/opd/searchresults')
            }, 100)

            let data = {
                'Category': 'ConsumerApp', 'Action': offer.event_name, 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': offer.event_name, 'clickedOn': offer.slider_location
            }
            GTM.sendEvent({ data: data })
        }

        else if (offer.url_details && offer.url_details.procedure_ids && offer.url_details.procedure_ids != '') {
            let speciality = {}

            let filters = { 'priceRange': [offer.url_details.min_fees, offer.url_details.max_fees], 'distanceRange': [offer.url_details.min_distance, offer.url_details.max_distance], 'sort_on': offer.url_details.sort_on || '', 'is_female': offer.url_details.is_female || false, 'is_available': offer.url_details.is_available || false, 'doctor_name': offer.url_details.doctor_name || '', 'hospital_name': offer.url_details.hospital_name || '', 'hospital_id': offer.url_details.hospital_id || '' }

            speciality.type = 'procedures'
            speciality.id = []

            let specialityIdArray = offer.url_details.procedure_ids.split(',');
            for (let id in specialityIdArray) {
                speciality.id.push(parseInt(specialityIdArray[id]))
            }

            this.props.toggleOPDCriteria('procedures', speciality, true, filters)
            setTimeout(() => {
                this.props.history.push('/opd/searchresults')
            }, 100)

            let data = {
                'Category': 'ConsumerApp', 'Action': offer.event_name, 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': offer.event_name, 'clickedOn': offer.slider_location
            }
            GTM.sendEvent({ data: data })
        }

        else if (offer.url_details && offer.url_details.procedure_category_ids && offer.url_details.procedure_category_ids != '') {
            let speciality = {}

            let filters = { 'priceRange': [offer.url_details.min_fees, offer.url_details.max_fees], 'distanceRange': [offer.url_details.min_distance, offer.url_details.max_distance], 'sort_on': offer.url_details.sort_on || '', 'is_female': offer.url_details.is_female || false, 'is_available': offer.url_details.is_available || false, 'doctor_name': offer.url_details.doctor_name || '', 'hospital_name': offer.url_details.hospital_name || '', 'hospital_id': offer.url_details.hospital_id || '' }

            speciality.type = 'procedures_category'
            speciality.id = []

            let specialityIdArray = offer.url_details.procedure_category_ids.split(',');
            for (let id in specialityIdArray) {
                speciality.id.push(parseInt(specialityIdArray[id]))
            }

            this.props.toggleOPDCriteria('procedures_category', speciality, true, filters)
            setTimeout(() => {
                this.props.history.push('/opd/searchresults')
            }, 100)

            let data = {
                'Category': 'ConsumerApp', 'Action': offer.event_name, 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': offer.event_name, 'clickedOn': offer.slider_location
            }
            GTM.sendEvent({ data: data })
        }

        else if (offer.url_details && offer.url_details.conditions && offer.url_details.conditions != '') {
            let speciality = {}

            let filters = { 'priceRange': [offer.url_details.min_fees, offer.url_details.max_fees], 'distanceRange': [offer.url_details.min_distance, offer.url_details.max_distance], 'sort_on': offer.url_details.sort_on || '', 'is_female': offer.url_details.is_female || false, 'is_available': offer.url_details.is_available || false, 'doctor_name': offer.url_details.doctor_name || '', 'hospital_name': offer.url_details.hospital_name || '', 'hospital_id': offer.url_details.hospital_id || '' }

            speciality.type = 'condition'
            speciality.id = []

            let specialityIdArray = offer.url_details.conditions.split(',');
            for (let id in specialityIdArray) {
                speciality.id.push(parseInt(specialityIdArray[id]))
            }

            this.props.toggleOPDCriteria('condition', speciality, true, filters)
            setTimeout(() => {
                this.props.history.push('/opd/searchresults')
            }, 100)

            let data = {
                'Category': 'ConsumerApp', 'Action': offer.event_name, 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': offer.event_name, 'clickedOn': offer.slider_location
            }
            GTM.sendEvent({ data: data })
        }

        else if (offer.url) {
            if (offer.url.startsWith('http')) {
                window.open(offer.url, '_blank')
            }
            else {
                this.props.history.push(offer.url)
            }

            let data = {
                'Category': 'ConsumerApp', 'Action': offer.event_name, 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': offer.event_name, 'clickedOn': offer.slider_location
            }
            GTM.sendEvent({ data: data })
        }
    }

    componentDidMount() {
        window.scrollTo(0, 0);

        let selectedLocation = ''
        let lat = 28.644800
        let long = 77.216721
        if (this.props.selectedLocation) {
            selectedLocation = this.props.selectedLocation;
            lat = selectedLocation.geometry.location.lat
            long = selectedLocation.geometry.location.lng
            if (typeof lat === 'function') lat = lat()
            if (typeof long === 'function') long = long()
        }

        this.props.getOfferList(lat, long);
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
                                        {
                                            this.props.offerList && this.props.offerList.filter(x => x.slider_location === 'offers_page').length ?
                                                <p className="fw-700 offer-heading mrt-20">Offers</p>
                                                :
                                                <p className="fw-700 offer-heading mrt-20">No offers available</p>
                                        }

                                    </div>
                                    <div className="col-12">
                                        {
                                            this.props.offerList && this.props.offerList.filter(x => x.slider_location === 'offers_page').length ?
                                                this.props.offerList.filter(x => x.slider_location === 'offers_page').map((offer, i) => {
                                                    return <div className="offer-div" key={i} onClick={() => this.navigateTo(offer)} >
                                                        <img src={offer.image} />
                                                    </div>
                                                }) : ''
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <RightBar noChatButton={true} msgTemplate="gold_general_template"/>
                    </div>
                </section>
                <Footer />
                <FixedMobileFooter offersPage={true} {...this.props} />
            </div>
        )
    }
}

export default OffersView