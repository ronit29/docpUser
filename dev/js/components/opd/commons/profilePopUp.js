import React from 'react'

export default class PopUpView extends React.Component {

    toggleProcedure(procedure_to_toggle, doctor_id, hospital_id) {/*
        let test = Object.assign({}, test_to_toggle.test)
        test.mrp = test_to_toggle.mrp
        test.deal_price = test_to_toggle.deal_price
        test.extra_test = true
        test.lab_id = this.state.selectedLab

        this.props.toggleDiagnosisCriteria('test', test)*/
        this.setState({ errorMsg: false })
        let selectedProcedureIds = []
        this.props.selectedDoctorProcedure[doctor_id][hospital_id].categories.map((procedure) => {

            selectedProcedureIds = procedure.filter(x => x.is_selected).map(x => x.procedure_id)
        })


        if (selectedProcedureIds.indexOf(procedure_to_toggle.procedure_id) == -1) {

        } else if (selectedProcedureIds.length <= 1) {
            this.setState({
                errorMsg: true
            })
            return null
        }

        this.props.toggleProfileProcedures(procedure_to_toggle, doctor_id, hospital_id)

    }

    render() {
        console.log('aaaaaaaaaaaaaa'); console.log(this.props);

        return (
            <div>
                <div className="cancel-overlay" onClick={this.props.toggle}></div>
                <div className="widget cancel-appointment-div cancel-popup">
                    <div className="pop-top-heading">
                        All Treatment
                </div>
                    {
                        Object.values(this.props.data).map((category, i) => {

                            return <div className="pop-underline" key={i}>
                                <div className="widget-header action-screen-header pop-padding">
                                    <p className="fw-500 cancel-appointment-head">{category[0].category_name}</p>
                                    
                                </div>
                                <div>
                                    {
                                        category.map((procedure, key) => {
                                            return <div className="terms-condition-div" key={key}>
                                                <ul className="procedure-list">

                                                    <li key={i}>
                                                        <div>
                                                            <input type="checkbox" checked={procedure.is_selected} className="ins-chk-bx" id={`${procedure.procedure_id}_`} name="fruit-2" value="" onChange={() => this.props.toggleProcedures(procedure, this.props.doctor_id, this.props.hospital_id)} /><label htmlFor={`${procedure.procedure_id}_`}>{procedure.procedure_name}</label>
                                                        </div>
                                                        <p className="pr-prices">₹ {procedure.deal_price}<span className="pr-cut-price">₹ {procedure.mrp}</span></p>
                                                    </li>

                                                </ul>
                                            </div>
                                        })
                                    }
                                </div>

                            </div>


                        })

                    }
                    {
                        this.props.errorMsg ?
                            <p>Please Select at least one Procedure</p>
                            : ''
                    }
                    <div className="procedures-btn-pop">
                        <button className="fw-500" onClick={this.props.toggle}>Done</button>
                    </div>
                </div>
            </div>
        )
    }
}