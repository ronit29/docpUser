import React from 'react';
import { connect } from 'react-redux';

class ExpansionPanel extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            open: false
        }
    }

    toggleOpen() {
        this.setState({ open: !this.state.open })
    }

    render() {

        let { heading, contentList, image, content } = this.props
        if (contentList && contentList.length) {
            heading += `  (includes ${contentList.length}) tests`
        }
        return (
            <li className="expansion-panel-list-item" >
                <div>
                    <div className="title" onClick={this.toggleOpen.bind(this)} style={{ marginBottom: 0, fontSize: 15 }} >
                        {heading}
                        {
                            contentList.length ? (this.state.open ? <img className="titlearrow-up" src={ASSETS_BASE_URL + "/img/customer-icons/dropdown-arrow.svg"} /> : <img className="titlearrow" src={ASSETS_BASE_URL + "/img/customer-icons/dropdown-arrow.svg"} />) : ""
                        }
                    </div>
                    {
                        this.state.open ? <div className="more-content">
                            <span className="pkg-content">{content}</span>
                            <ul className="pkgs-drp-listing">
                                {
                                    contentList.map((cont, i) => {
                                        return <li key={i}>
                                            {cont}
                                        </li>

                                    })
                                }
                            </ul>
                        </div> : ""
                    }
                </div>
            </li>
        );
    }
}


export default ExpansionPanel
