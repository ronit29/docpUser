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

        let { heading, contentList } = this.props

        return (
            <li className="expansion-panel-list-item" >
                <div>
                    <div className="title" onClick={this.toggleOpen.bind(this)}>
                        {heading}
                        {
                            this.state.open ? <img className="titlearrow-up" src="/assets/img/customer-icons/dropdown-arrow.svg" /> : <img className="titlearrow" src="/assets/img/customer-icons/dropdown-arrow.svg" />
                        }

                    </div>
                    {
                        this.state.open ? <div className="more-content">
                            {
                                contentList.map((cont, i) => {
                                    return <div className="form-group expansion-label-div" key={i}>
                                        <label className="fw-700 text-sm text-primary">{cont.heading}
                                            <span>
                                                {i < contentList.length - 1 ? "|" : ""}
                                            </span>
                                        </label>
                                        <p className="fw-700 text-md text-light">{cont.content}
                                            <span>
                                                {i < contentList.length - 1 ? "|" : ""}
                                            </span>
                                        </p>
                                    </div>
                                })
                            }
                        </div> : ""
                    }
                </div>
            </li>
        );
    }
}


export default ExpansionPanel
