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
                    <div className="title" onClick={this.toggleOpen.bind(this)} style={{ marginBottom: 0 }} >
                        {heading}
                        {
                            this.state.open ? <img className="titlearrow-up" src="/assets/img/customer-icons/dropdown-arrow.svg" /> : <img className="titlearrow" src="/assets/img/customer-icons/dropdown-arrow.svg" />
                        }
                    </div>
                    {
                        this.state.open ? <div className="more-content">
                            {
                                this.props.qulification ? contentList.map((cont, i) => {
                                    return <div className="form-group expansion-label-div" key={i} style={{ marginTop: 10 }} >
                                        <label className="fw-700 text-sm text-primary">Qualification
                                            <span>| &nbsp;</span>
                                        </label>
                                        <label className="fw-700 text-sm text-primary">Specialization
                                            <span>| &nbsp;</span>
                                        </label>
                                        <label className="fw-700 text-sm text-primary">College</label>
                                        <div>
                                            <p className="fw-700 text-md text-light" style={{ display: 'inline-block', verticalAlign:'middle' }}>{cont.qualification}</p>
                                            <span className="fw-700 text-md text-light" style={{ verticalAlign: 'middle' }}>&nbsp;&nbsp;|&nbsp;&nbsp;</span>
                                            <p className="fw-700 text-md text-light" style={{ display: 'inline-block', verticalAlign:'middle' }}>{cont.specialization}</p>
                                            <span className="fw-700 text-md text-light" style={{ verticalAlign: 'middle' }}>&nbsp;&nbsp;|&nbsp;&nbsp;</span>
                                            <p className="fw-700 text-md text-light" style={{ display: 'inline-block', verticalAlign:'middle' }}>{cont.college}</p>
                                        </div>
                                    </div>
                                }) : contentList.map((cont, i) => {
                                    return <div className="expansion-label-div" key={i}>
                                        {
                                            cont.heading ? <label className="fw-700 text-sm text-primary">{cont.heading}
                                                {/* <span>
                                            {i < contentList.length - 1 ? "|" : ""}
                                        </span> */}
                                            </label> : ""
                                        }

                                        <p className="fw-700 text-md text-light" style={{ lineHeight: '20px' }} >{cont.content}
                                            {/* <span>
                                                {i < contentList.length - 1 ? "|" : ""}
                                            </span> */}
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
