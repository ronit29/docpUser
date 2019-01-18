import React from 'react'
import SnackBar from 'node-snackbar'

export default class PopUpView extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            selectedProcedureIds: [],
            procedure: []
        }
    }

    componentDidMount() {
        let selectedProcedureIds = []
        Object.values(this.props.data).map((procedure) => {

            selectedProcedureIds = selectedProcedureIds.concat(procedure.filter(x => x.is_selected).map(x => x.procedure_id))
        })
        this.setState({ selectedProcedureIds: selectedProcedureIds, procedure: [].concat(selectedProcedureIds) })
    }

    toggleData(procedure) {
        let selectedProcedures = this.state.selectedProcedureIds
        if (selectedProcedures.length > 1 || (selectedProcedures.length == 1 && selectedProcedures.indexOf(procedure.procedure_id) == -1)) {

            if (selectedProcedures.indexOf(procedure.procedure_id) != -1) {
                selectedProcedures.splice(selectedProcedures.indexOf(procedure.procedure_id), 1)
            } else {
                selectedProcedures.push(procedure.procedure_id)
            }
            this.setState({ selectedProcedureIds: selectedProcedures })

        }
        else if (selectedProcedures.length == 0) {
            selectedProcedures.push(procedure.procedure_id)
            this.setState({ selectedProcedureIds: selectedProcedures })
        }
        else {
            //this.setState({ errorMessage: true })
            setTimeout(() => {
                SnackBar.show({ pos: 'bottom-center', text: "Please Select at least one Procedure" })
            }, 500)
            return null
        }
    }

    toggleFinal(doctor_id, hospital_id) {
        let fetchResults = false
        let selectedProcedures = this.state.selectedProcedureIds
        let procedure = this.state.procedure
        if (selectedProcedures.length === procedure.length && selectedProcedures.sort().every(function (value, index) { return value === procedure.sort()[index] })) {

        } else {
            fetchResults = true
        }
        if (fetchResults) {
            this.props.toggleProfileProcedures(selectedProcedures, doctor_id, hospital_id)

        }
        this.props.toggle()
    }

    toggleProcedure(procedure_to_toggle, doctor_id, hospital_id) {

        let selectedProcedureIds = []
        Object.values(this.props.selectedDoctorProcedure[doctor_id][hospital_id].categories).map((procedure) => {

            selectedProcedureIds = selectedProcedureIds.concat(procedure.filter(x => x.is_selected).map(x => x.procedure_id))
        })

        //selectedProcedureIds = selectedProcedureIds.concat(this.props.profileCommonProcedures)

        let found = false

        if (selectedProcedureIds.length > 1 || selectedProcedureIds.length < 1 || (selectedProcedureIds.length == 1 && selectedProcedureIds.indexOf(procedure_to_toggle.procedure_id) == -1)) {
            found = true
        }

        if (found) {
            this.props.toggleProfileProcedures(procedure_to_toggle, doctor_id, hospital_id)
        } else {
            this.setState({ errorMsg: true })
        }
    }

    render() {
        let procedure_ids = this.state.selectedProcedureIds
        return (
            <div>
                <div className="cancel-overlay" onClick={this.props.toggle}></div>
                <div className="widget cancel-appointment-div cancel-popup">
                    <div className="pop-top-heading">
                        Select Treatment(s)
                        <img src={ASSETS_BASE_URL + "/img/customer-icons/close-black.svg"} onClick={this.props.toggle} />
                    </div>
                    <div className="onscreen-scroll">
                        {
                            Object.values(this.props.data).map((category, i) => {

                                return <div className="pop-underline" key={i}>
                                    <div className="widget-header action-screen-header pop-padding">
                                        <p className="fw-500 cancel-appointment-head">{category[0].category_name}</p>

                                    </div>
                                    <div>
                                        <div className="terms-condition-div">
                                            <ul className="procedure-list">
                                                {
                                                    category.map((procedure, key) => {
                                                        return <li key={key}>
                                                            <label className="procedure-check ck-bx" htmlFor={`${procedure.procedure_id}_`}>{procedure.procedure_name}
                                                                <input type="checkbox" checked={procedure_ids.indexOf(procedure.procedure_id) != -1 ? true : false} id={`${procedure.procedure_id}_`} name="fruit-2" value="" onChange={this.toggleData.bind(this, procedure)}/*{this.toggleProcedure.bind(this, procedure, this.props.doctor_id, this.props.hospital_id)}*/ />
                                                                <span className="checkmark">
                                                                </span>
                                                            </label>
                                                            {/* <div>
                                                                <input type="checkbox" checked={procedure_ids.indexOf(procedure.procedure_id) != -1 ? true : false} className="ins-chk-bx" id={`${procedure.procedure_id}_`} name="fruit-2" value="" onChange={this.toggleData.bind(this, procedure)}{this.toggleProcedure.bind(this, procedure, this.props.doctor_id, this.props.hospital_id)} /><label htmlFor={`${procedure.procedure_id}_`}>{procedure.procedure_name}</label>
                                                            </div> */}
                                                            {
                                                                this.props.hospitalEnable ?
                                                                    <p className="pr-prices">₹ {procedure.deal_price}<span className="pr-cut-price">₹ {procedure.mrp}</span></p>
                                                                    :
                                                                    <p className="pr-prices">₹ {procedure.mrp}</p>
                                                            }
                                                        </li>
                                                    })
                                                }
                                            </ul>
                                        </div>
                                    </div>

                                </div>


                            })

                        }
                    </div>
                    <div className="procedures-btn-pop">
                        <button className="fw-500" onClick={this.toggleFinal.bind(this, this.props.doctor_id, this.props.hospital_id)}>Done</button>
                    </div>
                </div>
            </div>
        )
    }
}