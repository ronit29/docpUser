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
        if (contentList && contentList.length && !this.props.locationSearch) {
            heading += `  (includes ${contentList.length} tests)`
        }
        return (
            <li className="expansion-panel-list-item" style={this.props.locationSearch ? { listStyle: 'none', cursor: 'auto' } : ''} >
                <div>
                    <div className={this.props.locationSearch ? 'title lc-test-heading' : 'title'} onClick={this.toggleOpen.bind(this)} style={{ marginBottom: 0, fontSize: 15, fontWeight: 400, paddingRight: 30, position: 'relative' }} >
                        {heading}
                        {
                            this.state.open ? <img className="titlearrow-up" src={ASSETS_BASE_URL + "/img/customer-icons/dropdown-arrow.svg"} /> : <img className="titlearrow" src={ASSETS_BASE_URL + "/img/customer-icons/dropdown-arrow.svg"} />
                        }
                    </div>
                    {
                        this.state.open ? <div className="more-content">
                            {
                                this.props.content ?
                                    <span className="pkg-content">{this.props.content}</span>
                                    : ''
                            }
                            {
                                this.props.locationSearch ?
                                    <ul className='lc-test-list'>
                                        {
                                            contentList.map((cont, i) => {
                                                return <li key={i}>
                                                    <input className="lc-test-radio" type='radio' name='radio' />
                                                    <span className="doc-checkmark"></span>
                                                    {cont}
                                                </li>
                                            })
                                        }
                                    </ul>
                                    :
                                    <ul className='pkgs-drp-listing'>
                                        {
                                            contentList.map((cont, i) => {
                                                return <li key={i}>
                                                    {cont}
                                                </li>
                                            })
                                        }
                                    </ul>
                            }
                        </div> : ""
                    }
                </div>
            </li>
        );
    }
}


export default ExpansionPanel
