import React from 'react';

class ProcedureView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {

        return (
            <div>
                <div className="d-flex jc-spaceb">
                    <h4 className="title" style={{ fontSize: 14 }}><span><img src={ASSETS_BASE_URL + "/img/customer-icons/teeth.svg"} className="visit-time-icon" style={{ width: 17, marginRight: 8 }} /></span>Services Included</h4>
                </div>
                
                <div className="clearfix pb-list proc-padding-list"><span className="test-price txt-ornage">₹ {this.props.priceData.deal_price}<span className="test-mrp">₹ {this.props.priceData.mrp}</span></span><span className="fw-500 test-name-item">Doctor consultation fee</span></div>
                
                {
                    this.props.selectedProcedures ?
                    
                        Object.values(this.props.selectedProcedures).map((procedure) => {

                            return procedure.filter(x => x.is_selected).map((category, i) => {

                                return <div className="clearfix pb-list proc-padding-list"><span className="test-price txt-ornage">₹ {category.deal_price}<span className="test-mrp">₹ {category.mrp}</span></span><span className="fw-500 test-name-item">{category.procedure_name}</span>
                                </div>

                            })

                        })
                        : ''
                }
            </div>
        );
    }
}


export default ProcedureView
