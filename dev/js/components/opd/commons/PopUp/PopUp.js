import React from 'react'

export default class PopUpView extends React.Component{

	constructor(props){
		super(props)
		this.state = {
			errorMessage: false,
			procedure: [],
			selectedProcedures: [],
			currentProcedures: []

		}
	}

	componentDidMount(){

		let selectedProcedures = [], procedures = []
		this.props.data.procedure_categories.map((category) => {
            procedures = category.procedures.filter( x=>x.is_selected ).map(x=>x.procedure.id)
        	selectedProcedures = selectedProcedures.concat(procedures)
        })

        let pids = this.props.details.commonProcedurers.filter((x) => {
            if(selectedProcedures.indexOf(x.id) == -1){
                return true
            }
            return false
	    }).map(x => x.id)

	    selectedProcedures =  selectedProcedures.concat(pids)

        this.setState({selectedProcedures: selectedProcedures, procedure: [].concat(selectedProcedures)})
	}

	toggle(procedure){
		/*let procedure_ids = this.state.procedures
		if(procedure_ids.indexOf(procedure.procedure.id) != -1){
			procedure_ids.splice(procedure_ids.indexOf(procedure.procedure.id), 1)
		}else{
			let procedure = {
				id: procedure.procedure.id,
				name: procedure.procedure.name
			}
			procedure_ids.push()
		}

		let procedure = {
			id: procedure.procedure.id,
			name: procedure.procedure.name
		}
		procedure_ids.push()*/
		let commonIds = this.props.details.commonProcedurers.map(x=>x.id)
		let selectedCount = this.props.details.opd_procedure[this.props.doctor_id]?this.props.details.opd_procedure[this.props.doctor_id].selected:0
		if(commonIds.indexOf(procedure.procedure.id) == -1){

		}else if(commonIds.length<=1){
			this.setState({errorMessage:true})
			return null
		}
		let criteria = {
			id: procedure.procedure.id,
			name: procedure.procedure.name
		}
		
		let procedure_ids = this.state.procedure
		if(procedure_ids.indexOf(procedure.procedure.id) == -1){
			procedure_ids.splice(procedure_ids.indexOf(procedure.procedure.id), 1)
		}else{
			procedure_ids.push(procedure.procedure.id)
		}

		this.setState({procedure: procedure_ids})


		this.props.getCommonProcedures('procedures', criteria)
		this.props.toggleData(procedure, this.props.data.hospital_id, false, false)
	}

	toggleLayout(){

/*		let commonIds = this.props.details.commonProcedurers.map(x=>x.id)
		let selectedProcedureIds = this.state.procedure
		let fetchResults = false

		if(commonIds.length === selectedProcedureIds.length && commonIds.sort().every(function(value, index) { return value === selectedProcedureIds.sort()[index]})){
			fetchResults = true
		}

		this.props.toggle(fetchResults)

*/

		let fetchResults = false
		let selectedProcedures = this.state.selectedProcedures
		let procedure = this.state.procedure
		if(selectedProcedures.length === procedure.length && selectedProcedures.sort().every(function(value, index) { return value === procedure.sort()[index]}) ){

		}else{
			fetchResults = true
		}
		selectedProcedures = selectedProcedures
		this.props.toggle(fetchResults, this.state.selectedProcedures)

	}

	toggleD(procedure){
		let selectedProcedures = this.state.selectedProcedures
		let currentProcedures = this.state.currentProcedures
		if(selectedProcedures.length > 1 || (selectedProcedures.length == 1 && selectedProcedures.indexOf(procedure.procedure.id) == -1 ) ){

			if(selectedProcedures.indexOf(procedure.procedure.id) != -1){
				selectedProcedures.splice(selectedProcedures.indexOf(procedure.procedure.id), 1)
				currentProcedures.splice(currentProcedures.indexOf(procedure.procedure.id), 1)
			}else{
				selectedProcedures.push(procedure.procedure.id)
				currentProcedures.push(procedure.procedure.id)
			}
			this.setState({selectedProcedures: selectedProcedures, currentProcedures: currentProcedures})


		}else{
			this.setState({errorMessage:true})
			return null
		}
	}

	render(){

		let procedure_ids = []
		console.log(this.state)
	/*	let selectedCount = this.props.details.opd_procedure[this.props.doctor_id]?this.props.details.opd_procedure[this.props.doctor_id].selected:0
		if(this.props.details.opd_procedure[this.props.doctor_id]){
			if(this.props.details.opd_procedure[this.props.doctor_id][this.props.data.hospital_id]){
				procedure_ids = this.props.details.opd_procedure[this.props.doctor_id][this.props.data.hospital_id].map(x=>x.procedure.id)
			}
		}
*/
		return(
			<div>
	            <div className="cancel-overlay" onClick={this.toggleLayout.bind(this)}></div>
	            <div className="widget cancel-appointment-div cancel-popup">
				<div className="pop-top-heading">
                        All Treatment
                </div>
	                <div className="widget-header action-screen-header pop-padding">
	                    <p className="fw-500 cancel-appointment-head">{this.props.heading}</p>
	                </div>           
	                <div className="terms-condition-div">
	                    {
                            this.props.data.procedure_categories.map((category, key) => {

                            return(<div className="pop-underline" key={key}><h4>{category.name}</h4>

								{
								  	category.procedures.map((procedure, i) => {

		                                return <li key = {`${i}_a`}>
		                                        <div>
		                                            <input type="checkbox" className="ins-chk-bx" checked = {this.state.selectedProcedures.indexOf(procedure.procedure.id)==-1?false:true} id={`${procedure.procedure.id}_`} name="fruit-2" value=""  
		                                            onChange= {this.toggleD.bind(this,procedure)}
		                                            /><label htmlFor={`${procedure.procedure.id}_`}>{procedure.procedure.name}</label>
		                                        </div>
		                                        <p className="pr-prices">₹ {procedure.deal_price}<span className="pr-cut-price">₹ {procedure.mrp}</span></p>
		                                    </li>

		                            })
		                        }
	                          </div>)
                            })
                        }
	                </div>
	                {
	                	this.state.errorMessage?
	                	<p>Please Select at least one Procedure</p>
	                	:''
	                }
	                <div className="procedures-btn-pop">
	                    <button className="fw-500" onClick={this.toggleLayout.bind(this)}>Done</button>
	                </div>
	            </div>
	        </div>
			)
	}
}
