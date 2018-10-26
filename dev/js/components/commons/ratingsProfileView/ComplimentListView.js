import React from "react";

class ComplimentListView extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="">
                <div className="user-satisfaction-images">
                    <img className="img-fluid" src={this.props.details.icon} />
                    <p>{this.props.details.message}</p>
                    <span>{this.props.details.count}</span>
                </div>
            </div>
        );
    }
}

export default ComplimentListView;
