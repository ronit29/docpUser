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
                            <InitialsPicture style={{'marginRight': 0, 'width': 90, 'height': 60}} name={lab.name} has_image={!!lab.lab_thumbnail} className="initialsPicture-ls">
                                <img src={lab.lab_thumbnail} className="img-fluid" />
                            </InitialsPicture>
                        </span>
                        <p className='fw-500' style={{fontSize: 10, color: '#757575', marginTop: 2}} >FREE HOME PICKUP</p>
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
                        <p className="lab-locality">
                            {/* Blood Test, Pathology Ultrasound, MRI, CTI */}
                            {lab.locality} {lab.city} | <span><img src="/assets/img/icons/location-orange.svg" style={{marginRight: 4}} /></span><span className="text-primary fw-500">{distance / 1000} KM</span>
                        </p>
                        <p style={{color: '#f78316', fontSize: 12}} >02:00 AM to 02:00 PM | <span style={{color: '#d82907'}} >Now Closed</span></p>
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
