import React from 'react';
import { connect } from 'react-redux';

class AboutDoctor extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            // lessAbout: "",
            // requiredReadMore: false,
            readMore: true
        }
    }

    componentDidMount() {
        // this.renderAbout(this.props)
    }

    componentWillReceiveProps(props) {
        // this.renderAbout(props)
    }

    // renderAbout(props) {
    //     let { about } = props.details
    //     if (about) {
    //         if (about.length > 100) {
    //             this.setState({
    //                 readMore: true,
    //                 requiredReadMore: true
    //             })
    //         }
    //         this.setState({
    //             lessAbout: about.slice(0, 100) + "..."
    //         })
    //     }
    // }

    render() {

        let { about, name } = this.props.details
        let button = ""

        if (this.state.requiredReadMore) {
            // button = <a className="fw-700 text-primary" style={{ cursor: 'pointer' }} onClick={() => {
            //     this.setState({ readMore: false, lessAbout: about })
            // }}> READ MORE &#9660;</a>

            // if (!this.state.readMore) {
            //     button = <a className="fw-700 text-primary" style={{ cursor: 'pointer' }} onClick={() => {
            //         this.setState({ readMore: true, lessAbout: about.slice(0, 100) + "..." })
            //     }}> SHOW LESS &#9650;</a>
            // }
        }
        let aboutTxt 
        if(this.props.details.about_web){
            if(this.props.details.about_web.length > 100){
                if(this.state.readMore){
                    aboutTxt = this.props.details.about_web.slice(0, 100) + "..."
                    button = <a className="fw-700 text-primary" style={{ cursor: 'pointer' }} onClick={() =>         {this.setState({ readMore: !this.state.readMore}) 
                                }}> READ MORE &#9660;</a>
                }else{
                    aboutTxt = this.props.details.about_web
                    button = <a className="fw-700 text-primary" style={{ cursor: 'pointer' }} onClick={() =>         {this.setState({ readMore: !this.state.readMore}) 
                                }}> SHOW LESS &#9650;</a>
                }
            }else{
                aboutTxt = this.props.details.about_web
            } 
        }
        return (
            <div className="widget-panel">
                <h4 className="panel-title mb-rmv">About Dr. {name}</h4>
                <div className="panel-content">
                    <div className="fw-10000 text-md abt-doc-inlinetext" dangerouslySetInnerHTML={{ __html: aboutTxt }}>
                    </div>
                    {button}
                </div>
            </div>
        );
    }
}


export default AboutDoctor
