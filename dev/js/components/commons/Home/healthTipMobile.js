import React from 'react';

class HealthTip extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selected: 0
        }
    }

    render() {

        let { selected } = this.state
        let { healthTips } = this.props

        return (
            <div className="tip-card-div d-lg-none">
                {
                    healthTips.map((ht, i) => {
                        return <div className={"tip-card" + (i == (healthTips.length - 2) ? " rotate-card" : "")} id={"tip-card-" + (i + 1)} key={i + 1} style={{ zIndex: (i + 1) }}>
                            <div className="tip-card-header">
                                <img src={ASSETS_BASE_URL + "/img/customer-icons/tip-card-icon.png"} />
                                <p className="fw-500">Health Tips of the Day</p>
                            </div>
                            <div className="tip-card-content">
                                <p className="fw-500">{ht.text}</p>
                            </div>
                        </div>
                    })
                }
                {/* <div className="tip-card" id="tip-card-1">
                    <div className="tip-card-header">
                        <img src={ASSETS_BASE_URL + "/img/customer-icons/tip-card-icon.png" } />
                        <p className="fw-500">Health Tips of the Day</p>
                    </div>
                    <div className="tip-card-content">
                        <p className="fw-500">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution.</p>
                    </div>
                </div>
                <div className="tip-card" id="tip-card-2">
                    <div className="tip-card-header">
                        <img src={ASSETS_BASE_URL + "/img/customer-icons/tip-card-icon.png" } />
                        <p className="fw-500">Health Tips of the Day</p>
                    </div>
                    <div className="tip-card-content">
                        <p className="fw-500">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution.</p>
                    </div>
                </div>
                <div className="tip-card" id="tip-card-3">
                    <div className="tip-card-header">
                        <img src={ASSETS_BASE_URL + "/img/customer-icons/tip-card-icon.png" } />
                        <p className="fw-500">Health Tips of the Day</p>
                    </div>
                    <div className="tip-card-content">
                        <p className="fw-500">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution.</p>
                    </div>
                </div>
                <div className="tip-card rotate-card" id="tip-card-4">
                    <div className="tip-card-header">
                        <img src={ASSETS_BASE_URL + "/img/customer-icons/tip-card-icon.png" } />
                        <p className="fw-500">Health Tips of the Day</p>
                    </div>
                    <div className="tip-card-content">
                        <p className="fw-500">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution.</p>
                    </div>
                </div>
                <div className="tip-card" id="tip-card-5">
                    <div className="tip-card-header">
                        <img src={ASSETS_BASE_URL + "/img/customer-icons/tip-card-icon.png" } />
                        <p className="fw-500">Health Tips of the Day</p>
                    </div>
                    <div className="tip-card-content">
                        <p className="fw-500">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution.</p>
                    </div>
                </div> */}
            </div>
        );
    }
}

export default HealthTip
