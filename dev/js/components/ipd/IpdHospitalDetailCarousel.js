import React from 'react'
import GTM from '../../helpers/gtm.js'

class IpdHospitalCarousel extends React.Component {

    viewMoreHospital() {
        let filterCriteria = {
            distance: [0, 20],
            provider_ids: [],
            network_id:this.props.hospital_data.network_id || ''
        }
        this.props.mergeIpdCriteria({
            filterCriteria: filterCriteria,
            nextFilterCriteria: filterCriteria,
            commonSelectedCriterias: this.props.commonSelectedCriterias,
            nextSelectedCriterias: this.props.commonSelectedCriterias
        })
        this.props.history.push(`/ipd/searchHospitals`)
    }

    navigateTo(data, e) {
        e.preventDefault()
        e.stopPropagation()
        let gtmData = {
            'Category': 'ConsumerApp', 'Action': 'OtherLocationHospitalClicked', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'other-location-hospital-clicked', 'selected': '', 'selectedId': data.id || ''
        }
        GTM.sendEvent({ data: gtmData })

        let redirectUrl = ''

        if(data.url) {
            redirectUrl = `/${data.url}?showPopup=true`
        }else {
            redirectUrl = `/ipd/hospital/${data.id}?showPopup=true`
        }

        this.props.history.push(redirectUrl)
    }

    render() {
        let { hospital_data } = this.props

        return (
            <div className="ipd-carousel-container">
                <h3 className="othr-cntr">{`Other Locations of ${hospital_data.name_city}`}
                    <span className ="cursor-pntr" onClick={this.viewMoreHospital.bind(this)}>View all</span>
                </h3>

                <div className="ipd-carousel-slider">
                    <div className="d-inline-flex">
                        {
                            hospital_data.other_network_hospitals.slice(0,10).map((hospital, key)=>{
                                return <div key={key} className="ipd-carousel-card" onClick={this.navigateTo.bind(this, hospital)}>
                                            <div className="ipd-crsl-img-cont">
                                                <div className="ipd-crsl-img">
                                                    <img src={hospital.icon||''} />
                                                </div>
                                                <p>{hospital.name}</p>
                                            </div>
                                            <div className="ipd-cd-content">
                                                <p>{hospital.address}</p>
                                            </div>
                                        </div>
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default IpdHospitalCarousel;