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

    radioClick = (cat_id, test) => {
        this.props.selectCategory(cat_id, test)
    }

    componentWillReceiveProps() {
        if (this.props.locationSearch) {
            this.props.contentList.map((cont, i) => {
                if (this.props.defaultTest.includes(cont.id)) {
                    this.setState({ open: true });
                }
            })
        }
    }

    render() {
        let categoryId = ''
        let { heading, contentList } = this.props
        if (contentList && contentList.length && !this.props.locationSearch) {
            heading += `  (includes ${contentList.length} tests)`
        }
        if (this.props.locationSearch) {
            categoryId = this.props.categoryId
        }
        return (
            <li className="expansion-panel-list-item" style={this.props.locationSearch ? { listStyle: 'none', cursor: 'auto' } : {}} >
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
                                    <span className="pkg-content" dangerouslySetInnerHTML={{ __html: this.props.content }}></span>
                                    : ''
                            }
                            {
                                this.props.locationSearch ?
                                    <ul className='lc-test-list mrt-10'>
                                        {
                                            contentList.map((cont, i) => {
                                                return <li key={i} onClick={() => this.radioClick(categoryId, cont)}>
                                                    <input className="lc-test-radio" type='radio' value={cont.id} checked={this.props.radioChecked === cont.id || this.props.defaultTest.includes(cont.id)} name='test' />
                                                    <span className="doc-checkmark"></span>
                                                    {cont.name}
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
