import React from "react";

class ThankYouPopUp extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let profileData = this.props.profiles[this.props.selectedProfile]
        let name = ""
        if (profileData && profileData.name) {
            name = profileData.name
        }

        return (
            <div className="raiting-popup">
                <div className="home-rating-card">
                    <div className="thankyou-popup-head">
                        <img src={ASSETS_BASE_URL + "/img/dpsmile.png"} />
                        <p>Thanks {name}</p>
                    </div>
                    <p className="thnks-content">
                        Your feedback matters!
                    </p>
                    <p className="thanks-sub-content">
                        It helps our thousands / millions of users find the right healthcare solutions.
                    </p>
                    <button className="rate-submit-btn thnks-btn" onClick={this.props.submit}>Done</button>
                </div>
            </div>
        )
    }
}

export default ThankYouPopUp;
