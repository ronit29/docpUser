import React from "react";

class StarView extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="rate-star-icon">
                {
                    [1, 2, 3, 4, 5].map((x, i) => {
                        console.log(this.props);
                        let selected_star = "/assets/img/customer-icons/selected-star.svg";
                        let unselected_star = "/assets/img/customer-icons/unselected-star.svg";
                        let src_url = this.props.selectedRating > 0 && this.props.selectedRating >= x ? selected_star : unselected_star;
                        return <img key={i} onClick={this.props.handleSelect} className="img-fluid" src={src_url} />
                    })
                }
            </div>
        );
    }
}

export default StarView;
