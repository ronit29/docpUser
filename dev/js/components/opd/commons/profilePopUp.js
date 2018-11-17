import React from 'react'

export default class PopUpView extends React.Component {

    constructor(props){
        super(props)
        this.state = { errorMsg: false}
    }

    toggleProcedure(procedure_to_toggle, doctor_id, hospital_id) {

        this.setState({ errorMsg: false })
        let selectedProcedureIds = []
        Object.values(this.props.selectedDoctorProcedure[doctor_id][hospital_id].categories).map((procedure) => {

            selectedProcedureIds = procedure.filter(x => x.is_selected).map(x => x.procedure_id)
        })

        selectedProcedureIds = selectedProcedureIds.concat(this.props.profileCommonProcedures)

        let found  = false
        
        if(selectedProcedureIds.length > 1 || selectedProcedureIds.length < 1 || (selectedProcedureIds.length == 1 && selectedProcedureIds.indexOf(procedure_to_toggle.procedure_id) == -1 ) ){
            found = true
        }

        if(found){
            this.props.toggleProfileProcedures(procedure_to_toggle, doctor_id, hospital_id)
        }else{
            this.setState({errorMsg: true})
        }
    }

    render() {

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
                                                            <input type="checkbox" checked={procedure.is_selected} className="ins-chk-bx" id={`${procedure.procedure_id}_`} name="fruit-2" value="" onChange={this.toggleProcedure.bind(this, procedure, this.props.doctor_id, this.props.hospital_id)} /><label htmlFor={`${procedure.procedure_id}_`}>{procedure.procedure_name}</label>
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
                        this.state.errorMsg?
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