import React from 'react';

class ProcedureView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {

        return (
            <div className="widget mrb-15">
                <div className="widget-content">
                    <div className="d-flex jc-spaceb">
                        <h4 className="title" style={{ fontSize: 14 }}><span><img src={ASSETS_BASE_URL + "/img/hand.svg"} className="visit-time-icon" style={{ width: 24, marginRight: 8 }} /></span>Services Included</h4>
                    </div>
                    
                    <div className="clearfix pb-list proc-padding-list"><span className="test-price txt-ornage">₹ {parseInt(this.props.priceData.deal_price)}<span className="test-mrp">₹ {parseInt(this.props.priceData.mrp)}</span></span><span className="fw-500 test-name-item">Doctor consultation </span></div>
                    
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
            </div>
        );
    }
}


export default ProcedureView
