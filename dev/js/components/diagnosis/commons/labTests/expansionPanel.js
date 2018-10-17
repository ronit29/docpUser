import React from 'react';
import { connect } from 'react-redux';

class ExpansionPanel extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            open: true
        }
    }

    toggleOpen() {
        this.setState({ open: !this.state.open })
    }

    render() {

        let { heading, contentList, image } = this.props

        return (
            <li className="expansion-panel-list-item" >
                <div>
                    <div className="title" onClick={this.toggleOpen.bind(this)} style={{ marginBottom: 0 }} >
                        {heading}
                        {
                            this.state.open ? <img className="titlearrow-up" src={ASSETS_BASE_URL + "/img/customer-icons/dropdown-arrow.svg"} /> : <img className="titlearrow" src={ASSETS_BASE_URL + "/img/customer-icons/dropdown-arrow.svg"} />
                        }
                    </div>
                    {
                        this.state.open ? <div className="more-content">
                            {
                                contentList.map((cont, i) => {
                                    return <div className="expansion-label-div" key={i}>
                                        {cont}
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
