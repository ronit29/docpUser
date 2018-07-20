import React from 'react';
import InitialsPicture from '../../../commons/initialsPicture'

class LabProfileCard extends React.Component {
    constructor(props) {
        super(props)
    }

    openLab(id) {
        this.props.history.push(`/lab/${id}`)
    }

    render() {

        let { price, lab, distance, pickup_available } = this.props.details

        return (
            <div className="widget card lab-rslt-card" onClick={this.openLab.bind(this, this.props.details.lab.id)}>
                <div className="widget-content card-content book-card">
                    <div className="logo-ratting">
                        <span className="ct-img lab-icon">
                            <InitialsPicture name={lab.name} has_image={!!lab.lab_thumbnail} className="initialsPicture-ls">
                                <img src={lab.lab_thumbnail} className="img-fluid" />
                            </InitialsPicture>
                        </span>
                        {/* <ul className="inline-list ratting">
                            <li><span className="ct-img ct-img-xs star-icon"><img src="/assets/img/customer-icons/star.svg" className="img-fluid" /></span></li>
                            <li><span className="ct-img ct-img-xs star-icon"><img src="/assets/img/customer-icons/star.svg" className="img-fluid" /></span></li>
                            <li><span className="ct-img ct-img-xs star-icon"><img src="/assets/img/customer-icons/star.svg" className="img-fluid" /></span></li>
                            <li><span className="ct-img ct-img-xs star-icon"><img src="/assets/img/customer-icons/star.svg" className="img-fluid" /></span></li>
                            <li><span className="ct-img ct-img-xs star-icon"><img src="/assets/img/customer-icons/half-star.svg" className="img-fluid" /></span></li>
                        </ul> */}
                        {
                            pickup_available == 0 ? "" : <button className="v-btn v-btn-primary pickup-btn">Pickup Available</button>
                        }
                    </div>
                    <div className="book-card-content">
                        <h4 className="book-cart-title">{lab.name}</h4>
                        <p className="fw-500" style={{color: '#343434', fontSize: 13, marginBottom: 4}} >Radiology | Pathology</p>
                        <p style={{color: '#626262', fontSize: 13, marginBottom: 4}}>
                            {/* Blood Test, Pathology Ultrasound, MRI, CTI */}
                            {lab.locality} {lab.city} | <span><img src="/assets/img/icons/location-orange.svg" /></span><span className="text-primary fw-500">{distance / 1000} KM</span>
                        </p>
                    </div>
                </div>
                <div className="widget-footer card-footer">
                    <div className="row">
                        <div className="col-6">
                            <p className="lab-price">{price ? `Total Rs ${price}` : ""}</p>
                        </div>
                        <div className="col-6 text-right">
                            <button className="v-btn v-btn-primary btn-md">Book Lab</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


export default LabProfileCard
