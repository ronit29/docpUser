import React from 'react'

class ExpansionPanelIPD extends React.Component {

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

        let { data } = this.props
        
        return (
            <li className="expansion-panel-list-item" style={{ listStyle: 'none', cursor: 'pointer' }} >
                <div>
                    <div className='title' onClick={this.toggleOpen.bind(this)} style={{ marginBottom: 0, fontSize: 15, fontWeight: 400, paddingRight: 30, position: 'relative' }} >
                        {data.name}
                        {
                            this.state.open ? <img className="titlearrow-up" src={ASSETS_BASE_URL + "/img/customer-icons/dropdown-arrow.svg"} /> : <img className="titlearrow" src={ASSETS_BASE_URL + "/img/customer-icons/dropdown-arrow.svg"} />
                        }
                    </div>
                    {
                        this.state.open ? 
                        <div className="more-content">
                            {
                                data.value ?
                                    <span className="pkg-content" dangerouslySetInnerHTML={{ __html: data.value }}></span>
                                    : ''
                            }
                        </div> : ""
                    }
                </div>
            </li>
        );
    }
}


export default ExpansionPanelIPD
