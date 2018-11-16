import React from 'react';

class ProcedureView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {

        return (
            <div className="d-flex jc-spaceb">
                <h4 className="title" style={{ fontSize: 14 }}><span><img src={ASSETS_BASE_URL + "/img/customer-icons/teeth.svg"} className="visit-time-icon" style={{ width: 17, marginRight: 8 }} /></span>Treatment(s) Selected</h4>
                
            </div>
        );
    }
}


export default ProcedureView
