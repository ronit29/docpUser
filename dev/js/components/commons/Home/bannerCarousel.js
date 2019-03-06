import React from 'react';
import GTM from '../../../helpers/gtm.js'

class BannerCarousel extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            index: 0,
            startX: 0,
            startY: 0,
            distX: 0,
            distY: 0,
            intervalFlag: false
        }
    }

    componentDidMount() {
        let totalOffers = ''
        if (this.props.offerList && this.props.sliderLocation) {
            totalOffers = this.props.offerList.filter(x => x.slider_location == this.props.sliderLocation).length;
            setInterval(() => {
                let curr_index = this.state.index
                if (this.state.intervalFlag) {
                    curr_index = curr_index + 1
                    if (curr_index >= totalOffers) {
                        curr_index = 0
                    }
                }
                this.setState({ index: curr_index, intervalFlag: !this.state.intervalFlag })
            }, 5000)
        }
    }

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

        else if (offer.url_details && offer.url_details.hospital_id && offer.url_details.hospital_id != '') {
            let speciality = {}

            let filters = { 'priceRange': [offer.url_details.min_fees, offer.url_details.max_fees], 'distanceRange': [offer.url_details.min_distance, offer.url_details.max_distance], 'sort_on': offer.url_details.sort_on || '', 'is_female': offer.url_details.is_female || false, 'is_available': offer.url_details.is_available || false, 'doctor_name': offer.url_details.doctor_name || '', 'hospital_name': offer.url_details.hospital_name || '', 'hospital_id': offer.url_details.hospital_id || '' }

            speciality.type = 'speciality'
            speciality.id = []

            this.props.toggleOPDCriteria('speciality', speciality, true, filters)
            setTimeout(() => {
                this.props.history.push('/opd/searchresults')
            }, 100)

            let data = {
                'Category': 'ConsumerApp', 'Action': offer.event_name, 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': offer.event_name, 'clickedOn': offer.slider_location
            }
            GTM.sendEvent({ data: data })
        }

        else if (offer.url) {
            this.props.history.push(offer.url)

            let data = {
                'Category': 'ConsumerApp', 'Action': offer.event_name, 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': offer.event_name, 'clickedOn': offer.slider_location
            }
            GTM.sendEvent({ data: data })
        }
    }
    onTouchStart(event) {
        let touchobj = event.changedTouches[0];
        this.state.startX = touchobj.pageX;
        this.state.startY = touchobj.pageY;
        let startTime = new Date().getTime()
    }
    onTouchMove(event) {
        let touchobj = event.changedTouches[0];
        this.state.distX = touchobj.pageX - this.state.startX;
        this.state.distY = touchobj.pageY - this.state.startY;
        if (this.state.startX - touchobj.pageX > 5 || touchobj.pageX - this.state.startX > 5) {
            if (event.preventDefault)
                event.preventDefault();
            event.returnValue = false;
        }
    }
    onTouchEnd(event) {
        let startTime = new Date().getTime()
        let touchobj = event.changedTouches[0]
        let totalOffers = ''
        let curr_index
        this.state.distX = touchobj.pageX - this.state.startX
        this.state.distY = touchobj.pageY - this.state.startY
        let elapsedTime = new Date().getTime() - startTime
        if (elapsedTime <= 400) {
            if (Math.abs(this.state.distX) >= 50 && Math.abs(this.state.distY) <= 100) {
                if (this.state.distX < 0) {
                    if (this.props.offerList) {
                        totalOffers = this.props.offerList.filter(x => x.slider_location === 'home_page').length;
                        curr_index = this.state.index
                        curr_index = curr_index + 1
                        if (curr_index >= totalOffers) {
                            curr_index = 0
                        }
                        this.setState({ index: curr_index, intervalFlag: false })
                    }
                } else {
                    if (this.props.offerList) {
                        totalOffers = this.props.offerList.filter(x => x.slider_location === 'home_page').length;
                        curr_index = this.state.index
                        curr_index = curr_index - 1
                        if (curr_index < 0) {
                            curr_index = totalOffers - 1
                        }
                        this.setState({ index: curr_index, intervalFlag: false })
                    }
                }
            }
        }
    }
    render() {

        let offerVisible = {}
        if (this.props.offerList) {
            offerVisible = this.props.offerList.filter(x => x.slider_location === this.props.sliderLocation)[this.state.index];
        }

        return (
            <div className={this.props.hideClass ? `banner-carousel-div mrt-20 mrb-20 ${this.props.hideClass}` : `banner-carousel-div mrt-10 mrb-20`}>
                {
                    this.props.offerList && this.props.offerList.filter(x => x.slider_location === this.props.sliderLocation).length ?
                        <img src={offerVisible.image} onTouchStart={this.onTouchStart.bind(this)} onTouchMove={this.onTouchMove.bind(this)} onTouchEnd={this.onTouchEnd.bind(this)} onClick={() => this.navigateTo(offerVisible)} style={offerVisible.url ? { cursor: 'pointer' } : {}} />
                        : ''
                }
                {
                    this.props.offerList && this.props.offerList.filter(x => x.slider_location === this.props.sliderLocation).length > 1 ?
                        <div className="carousel-indicators mrt-10">
                            {
                                this.props.offerList && this.props.offerList.filter(x => x.slider_location === this.props.sliderLocation).map((offer, i) => {
                                    return <span key={i} onClick={() => this.setState({ index: i })} className={this.state.index == i ? "indicator-selected" : ''} ></span>
                                })
                            }
                        </div> : ''
                }
            </div>
        );
    }
}

export default BannerCarousel