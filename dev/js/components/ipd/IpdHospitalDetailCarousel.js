import React from 'react'
import GTM from '../../helpers/gtm.js'

class IpdHospitalCarousel extends React.Component {

    viewMoreHospital() {

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
                <h3 className="othr-cntr">Other Centers
                    <span onClick={this.viewMoreHospital.bind(this)}>View all</span>
                </h3>

                <div className="ipd-carousel-slider">
                    <div className="d-inline-flex">
                        {
                            hospital_data.other_network_hospitals.map((hospital, key)=>{
                                return <div className="ipd-carousel-card" onClick={this.navigateTo.bind(this, hospital)}>
                                            <div className="ipd-crsl-img-cont">
                                                <div className="ipd-crsl-img">
                                                    <img src='https://cdn.docprime.com/media/hospital/documents/medanta-the-medicity.jpg' />
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