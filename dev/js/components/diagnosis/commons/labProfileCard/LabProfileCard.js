import React from 'react';

class LabProfileCard extends React.Component {
    constructor(props) {
        super(props)
    }

    openLab(id){
        this.props.history.push(`/lab/${id}/book`)
    }

    render() {

        let { price, lab } = this.props.details

        return (
            <div className="widget card" onClick={this.openLab.bind(this,this.props.details.lab.id)}>
                <div className="widget-content card-content book-card">
                    <div className="logo-ratting">
                        <span className="ct-img lab-icon"><img src="/assets/img/customer-icons/lab1.png" className="img-fluid" /></span>
                        <ul className="inline-list ratting">
                            <li><span className="ct-img ct-img-xs star-icon"><img src="/assets/img/customer-icons/star.svg" className="img-fluid" /></span></li>
                            <li><span className="ct-img ct-img-xs star-icon"><img src="/assets/img/customer-icons/star.svg" className="img-fluid" /></span></li>
                            <li><span className="ct-img ct-img-xs star-icon"><img src="/assets/img/customer-icons/star.svg" className="img-fluid" /></span></li>
                            <li><span className="ct-img ct-img-xs star-icon"><img src="/assets/img/customer-icons/star.svg" className="img-fluid" /></span></li>
                            <li><span className="ct-img ct-img-xs star-icon"><img src="/assets/img/customer-icons/half-star.svg" className="img-fluid" /></span></li>
                        </ul>
                        <button className="v-btn v-btn-primary pickup-btn">Pickup Available</button>
                    </div>
                    <div className="book-card-content">
                        <h4 className="book-cart-title">{lab.name}</h4>
                        <p className="desc">Blood Test, Pathology Ultrasound, MRI, CTI Sector 52 Gurgaon | <span className="text-primary fw-700">1.5 KM</span></p>
                    </div>
                </div>
                <div className="widget-footer card-footer">
                    <div className="row">
                        <div className="col-6">
                            <p className="lab-price">Total Rs {price}</p>
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
