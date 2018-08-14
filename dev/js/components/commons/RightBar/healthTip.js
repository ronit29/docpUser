import React from 'react';

class HealthTip extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selected: 0
        }
    }

    changeTip(back = false) {
        if (back && this.state.selected > 0) {
            this.setState({ selected: this.state.selected - 1 })
        } else if (!back && this.state.selected < this.props.healthTips.length - 1) {
            this.setState({ selected: this.state.selected + 1 })
        }
    }

    render() {

        let { selected } = this.state
        let { healthTips } = this.props
        
        return (
            <div className={`right-div-widget health-widget mrb-10 ${this.props.customClass}`}>
                <div className="appointment-head-div">
                    <img src={ASSETS_BASE_URL + "/img/customer-icons/health-tip.jpg"} />
                    <span className="appointment-head">Health Tip of the Day</span>
                </div>
                <div className="tip-desc-div tip-desc-height">
                    <p className="tip-desc">{(healthTips && healthTips[selected]) ? healthTips[selected].text : ""}</p>
                </div>
                <div className="tip-indicators-div mrt-20">
                    <img onClick={this.changeTip.bind(this, true)} src={ASSETS_BASE_URL + "/img/icons/forma-1-copy-3.svg"} />
                    <div className="circleIndicators">
                        {
                            this.props.healthTips.map((ht, i) => {
                                return <span key={i} className={"ci" + (i == selected ? "selected" : "")}></span>
                            })
                        }
                    </div>
                    <img onClick={this.changeTip.bind(this, false)} src={ASSETS_BASE_URL + "/img/icons/forma-1-copy-7.svg"} />
                </div>
            </div>
        );
    }
}

export default HealthTip
