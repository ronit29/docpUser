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
            intervalFlag: false,
            intervalId:''
        }
    }

    componentDidMount() {
        let totalOffers = ''
        let filteredBanners = this.getFilteredBanners();
        if (this.props.sliderLocation && filteredBanners) {
            totalOffers = filteredBanners.length;
            let intervalId = setInterval(() => {
                let curr_index = this.state.index
                if (this.state.intervalFlag) {
                    curr_index = curr_index + 1
                    if (curr_index >= totalOffers) {
                        curr_index = 0
                    }
                }
                this.setState({ index: curr_index, intervalFlag: true })
            }, 5000)
            this.setState({ intervalId })
        }
    }

    componentWillUnmount(){
        try{
          clearInterval(this.state.intervalId)
        }catch(e){

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
        
        }else if(offer.id) {
            let data = {
                'Category': 'ConsumerApp', 'Action': offer.event_name, 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': offer.event_name, 'clickedOn': offer.slider_location
            }
            GTM.sendEvent({ data: data })
            this.props.history.push(`terms-conditions/${offer.id}`);
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
        let filteredBanners = this.getFilteredBanners();
        if (elapsedTime <= 400) {
            if (Math.abs(this.state.distX) >= 50 && Math.abs(this.state.distY) <= 100) {
                if (this.state.distX < 0) {
                    if (this.props.sliderLocation && filteredBanners) {
                        totalOffers = filteredBanners.length;
                        curr_index = this.state.index
                        curr_index = curr_index + 1
                        if (curr_index >= totalOffers) {
                            curr_index = 0
                        }
                        this.setState({ index: curr_index, intervalFlag: false })
                    }
                } else {
                    if (this.props.sliderLocation && filteredBanners) {
                        totalOffers = filteredBanners.length;
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

    getFilteredBanners() {
        let filteredOffers = []
        if (this.props.offerList) {
            filteredOffers = this.props.offerList.filter(x => x.slider_location === this.props.sliderLocation);
            filteredOffers = filteredOffers.filter(offer => {
                let show_banner = false
                let filter_show_banner = true
                if (offer.url_params_included && Object.values(offer.url_params_included).length) {

                    //Check for filtered values

                    this.props.commonSelectedCriterias && this.props.commonSelectedCriterias.map((data) => {
                        if (offer.url_params_included['specializations'] && offer.url_params_included['specializations'].length) {
                            offer.url_params_included['specializations'].map((speciality) => {
                                if (speciality == data.id) {
                                    show_banner = true
                                }
                            })
                        }
                    })

                    this.props.currentSearchedCriterias && this.props.currentSearchedCriterias.map((data) => {
                        if (offer.url_params_included['test_ids'] && offer.url_params_included['test_ids'].length) {
                            offer.url_params_included['test_ids'].map((test) => {
                                if (test == data.id) {
                                    show_banner = true
                                }
                            })
                        }
                    })

                    //Check Banners for filters

                    this.props.filterCriteria && Object.entries(this.props.filterCriteria).map((data, key) => {
                        let type = data[0]
                        if (type == 'priceRange') {
                            if (offer.url_params_included['min_fees'] && offer.url_params_included['min_fees'] < data[1][0]) {
                                filter_show_banner = false
                            }
                            if (offer.url_params_included['max_fees'] && offer.url_params_included['max_fees'] > data[1][1]) {
                                filter_show_banner = false
                            }
                        } else if (type == 'distanceRange') {
                            if (offer.url_params_included['min_distance'] && offer.url_params_included['min_distance'] < data[1][0]) {
                                filter_show_banner = false
                            }
                            if (offer.url_params_included['max_distance'] && offer.url_params_included['max_distance'] > data[1][1]) {
                                filter_show_banner = false
                            }
                        } else if (type == 'sort_on') {
                            if (offer.url_params_included['sort_on'] && offer.url_params_included['sort_on'].includes(data[1])) {
                                filter_show_banner = true
                            }
                        } else if (type = 'lab_name') {
                            if (offer.url_params_included['lab_name'] && offer.url_params_included['lab_name'].includes(data[1])) {
                                filter_show_banner = true
                            }
                        } else if (type = 'network_id') {
                            if (offer.url_params_included['network_id'] && offer.url_params_included['network_id'] != data[1]) {
                                filter_show_banner = false
                            }
                        } else if (type = 'is_available') {
                            if (offer.url_params_included['is_available'] && offer.url_params_included['is_available'] == true) {
                                filter_show_banner = true
                            }
                        } else if (type = 'is_female') {
                            if (offer.url_params_included['is_female'] && offer.url_params_included['is_female'] == true) {
                                filter_show_banner = true
                            }
                        }
                    })
                }

                else if (offer.url_params_excluded && Object.values(offer.url_params_excluded).length) {
                    this.props.commonSelectedCriterias && this.props.commonSelectedCriterias.map((data) => {
                        if (offer.url_params_excluded['specializations'] && offer.url_params_excluded['specializations'].length) {
                            offer.url_params_excluded['specializations'].map((speciality) => {
                                if (speciality == data.id) {
                                    show_banner = false
                                } else {
                                    show_banner = true
                                }
                            })
                        }
                    })
                    this.props.currentSearchedCriterias && this.props.currentSearchedCriterias.map((data) => {
                        if (offer.url_params_excluded['test_ids'] && offer.url_params_excluded['test_ids'].length) {
                            offer.url_params_excluded['test_ids'].map((test) => {
                                if (test == data.id) {
                                    show_banner = false
                                } else {
                                    show_banner = true
                                }
                            })
                        }
                    })
                    this.props.filterCriteria && Object.entries(this.props.filterCriteria).map((data, key) => {
                        let type = data[0]
                        if (type == 'priceRange') {
                            if (offer.url_params_excluded['min_fees'] && offer.url_params_excluded['min_fees'] >= data[1][0]) {
                                filter_show_banner = false
                            }
                            if (offer.url_params_excluded['max_fees'] && offer.url_params_excluded['max_fees'] <= data[1][1]) {
                                filter_show_banner = false
                            }
                        } else if (type == 'distanceRange') {
                            if (offer.url_params_excluded['min_distance'] && offer.url_params_excluded['min_distance'] >= data[1][0]) {
                                filter_show_banner = false
                            }
                            if (offer.url_params_excluded['max_distance'] && offer.url_params_excluded['max_distance'] <= data[1][1]) {
                                filter_show_banner = false
                            }
                        } else if (type == 'sort_on') {
                            if (offer.url_params_excluded['sort_on'] && offer.url_params_excluded['sort_on'].includes(data[1])) {
                                filter_show_banner = false
                            }
                        } else if (type = 'lab_name') {
                            if (offer.url_params_excluded['lab_name'] && offer.url_params_excluded['lab_name'].includes(data[1])) {
                                filter_show_banner = false
                            }
                        } else if (type = 'network_id') {
                            if (offer.url_params_excluded['network_id'] && offer.url_params_excluded['network_id'] == data[1]) {
                                filter_show_banner = false
                            }
                        } else if (type = 'is_available') {
                            if (offer.url_params_excluded['is_available'] && offer.url_params_excluded['is_available'] == true) {
                                filter_show_banner = false
                            }
                        } else if (type = 'is_female') {
                            if (offer.url_params_excluded['is_female'] && offer.url_params_excluded['is_female'] == true) {
                                filter_show_banner = false
                            }
                        }
                    })
                }

                else {
                    show_banner = true
                    filter_show_banner = true
                }
                return show_banner && filter_show_banner
            })
        }
        return filteredOffers
    }
    render() {

        let filteredBanners = this.getFilteredBanners();
        let offerVisible = filteredBanners[this.state.index]

        return (
            <div className={this.props.sliderLocation == 'home_page' || this.props.sliderLocation == 'online_consultation' || this.props.sliderLocation == 'medicine_detail_page' || (filteredBanners && filteredBanners.length == 1) || !filteredBanners ? '' : 'banner-margin-tap'}>
                {
                    this.props.sliderLocation === "medicine_detail_page"
                        ?<div className="medic-img-slider">
                            {
                                filteredBanners && filteredBanners.length ?
                                    filteredBanners.map((offer, i) => {
                                        return <img key={i} src={offer.image} onClick={() => this.navigateTo(offer)} style={{ cursor: 'pointer'}} />
                                    }) : ''
                            }
                        </div>
                        :this.props.sliderLocation=='home_page'?
                            <div className="slider-container bnnrForCovivd">
                                {
                                    filteredBanners && filteredBanners.length ?
                                        filteredBanners.map((offer, i) => {
                                            return <a key={offer.id}>
                                                        <img key={i} src={offer.image} onClick={() => this.navigateTo(offer)} style={{ cursor: 'pointer'}} alt="bannerLogoDocprime"/>
                                                    </a>
                                        }) : ''
                                }

                            </div>
                        :<div>
                            {/* code for banner carousel (visible only on desktop) */}
                            <div className={this.props.hideClass ? `banner-carousel-div  mrb-10 d-none ${this.props.hideClass}` : `banner-carousel-div mrb-10 d-none d-md-block new-home-banner`}>
                                {
                                    offerVisible && Object.values(offerVisible).length ?
                                        <img src={offerVisible.image} onTouchStart={this.onTouchStart.bind(this)} onTouchMove={this.onTouchMove.bind(this)} onTouchEnd={this.onTouchEnd.bind(this)} onClick={() => this.navigateTo(offerVisible)} style={{ cursor: 'pointer'}} />
                                        : ''
                                }
                                {
                                    filteredBanners && filteredBanners.length > 1 ?
                                        <div className="carousel-indicators mrt-10">
                                            {
                                                filteredBanners && filteredBanners.map((offer, i) => {
                                                    return <span key={i} onClick={() => this.setState({ index: i })} className={this.state.index == i ? "indicator-selected" : ''} ></span>
                                                })
                                            }
                                        </div> : ''
                                }
                            </div>
                            {/* code for banner slider (visible only on mobile screen) */}
                            {
                                this.props.chatPage ?
                                    '' :
                                    <div className="d-md-none">
                                        {
                                            filteredBanners && filteredBanners.length ?
                                                <div className={`${this.props.ipd ? 'ipd-banner-mbl' : this.props.sliderLocation == 'home_page' || this.props.sliderLocation == 'online_consultation' ?'home-banner-pos': 'inner-banner-pos'} ${filteredBanners.length == 1 ? `banner-home-scrollable mrt-20 mrb-20 ${this.props.sliderLocation == 'home_page'?'single-banner-div':''}` : `banner-home-scrollable mrt-20 mrb-20 pd-lt-15`}`} >
                                                    {
                                                        filteredBanners.map((banner, index) => {
                                                            return <img key={index} src={banner.image} onClick={() => this.navigateTo(banner)} style={{ cursor: 'pointer'}} className={filteredBanners.length == 1 ? `sngl-banner` : `mltpl-banner`} loading="lazy" />
                                                        })
                                                    }
                                                </div>
                                                : ''
                                        }
                                    </div>
                            }
                        </div>
                }
            </div>
        );
    }
}

export default BannerCarousel