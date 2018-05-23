import React from 'react';
import { connect } from 'react-redux';

class AboutDoctor extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            lessAbout: "",
            readMore: false
        }
    }

    componentDidMount() {
        let { about } = this.props.details

        if (about && about.length > 100) {
            this.setState({
                readMore: true
            })
        }

        this.setState({
            lessAbout: about.slice(0, 100)
        })
    }

    render() {

        let { about, name } = this.props.details

        return (
            <div className="widget-panel">
                <h4 className="panel-title">About {name}</h4>
                <div className="panel-content">
                    <p className="fw-500 text-md">{this.state.lessAbout}
                        {
                            this.state.readMore ? <a className="fw-700 text-primary" onClick={() => {
                                this.setState({ readMore: false, lessAbout: about })
                            }}>READ MORE</a> : ""
                        }
                    </p>
                </div>
            </div>
        );
    }
}


export default AboutDoctor
