import React from 'react';
import { connect } from 'react-redux';

class AboutDoctor extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            lessAbout: "",
            requiredReadMore: false,
            readMore: false
        }
    }

    componentDidMount() {
        this.renderAbout(this.props)
    }

    componentWillReceiveProps(props) {
        this.renderAbout(props)
    }

    renderAbout(props) {
        let { about } = props.details
        if (about) {
            if (about.length > 100) {
                this.setState({
                    readMore: true,
                    requiredReadMore: true
                })
            }
            this.setState({
                lessAbout: about.slice(0, 100) + "..."
            })
        }
    }

    render() {

        let { about, name } = this.props.details
        let button = ""

        if (this.state.requiredReadMore) {
            button = <a className="fw-700 text-primary" style={{ cursor: 'pointer' }} onClick={() => {
                this.setState({ readMore: false, lessAbout: about })
            }}> READ MORE &#9660;</a>

            if (!this.state.readMore) {
                button = <a className="fw-700 text-primary" style={{ cursor: 'pointer' }} onClick={() => {
                    this.setState({ readMore: true, lessAbout: about.slice(0, 100) + "..." })
                }}> SHOW LESS &#9650;</a>
            }
        }

        return (
            <div className="widget-panel">
                <h4 className="panel-title">About {name}</h4>
                <div className="panel-content">
                    <p className="fw-10000 text-md">{this.state.lessAbout}
                        {button}
                    </p>
                </div>
            </div>
        );
    }
}


export default AboutDoctor
