import React from 'react'
import DoctorCarouselList from './DoctorCarouselList.js'

class ExpansionPanelIPD extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            open: this.props.id==0?true:false
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
                    <div className='title' onClick={this.toggleOpen.bind(this)} style={{ marginBottom: 0, fontSize: 15, fontWeight: 500, paddingRight: 30, position: 'relative' }} >
                        {data.name}
                        {
                            this.state.open ? <img className="titlearrow-up" src={ASSETS_BASE_URL + "/img/customer-icons/dropdown-arrow.svg"} /> : <img className="titlearrow" src={ASSETS_BASE_URL + "/img/customer-icons/dropdown-arrow.svg"} />
                        }
                    </div>
                    {
                        this.state.open ? 
                        <div className="more-content mr-content">
                            {
                                data.value ?
                                    <span className="pkg-content ulListing-stl" dangerouslySetInnerHTML={{ __html: data.value }}></span>
                                    : ''
                            }
                            {
                                data.show_doctors && data.doctors && data.doctors.result?
                                <DoctorCarouselList doctorCardData = {data.doctors.result} {...this.props}/>
                                :''
                            }
                        </div> : ""
                    }
                </div>
            </li>
        );
    }
}


export default ExpansionPanelIPD
