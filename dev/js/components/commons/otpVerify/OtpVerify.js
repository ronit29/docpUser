import React from 'react';

class OtpVerifyView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }

        console.log(this.props)
        debugger
    }

    inputHandler(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    render() {

        return (
            <div>
            </div>
        );
    }
}


export default OtpVerifyView
