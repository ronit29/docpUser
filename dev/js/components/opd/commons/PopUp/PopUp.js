import React from 'react'
import SnackBar from 'node-snackbar'


export default class PopUpView extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			errorMessage: false,
			procedure: [],
			selectedProcedures: []
		}
	}

	componentDidMount() {

		let selectedProcedures = [], procedures = []
		this.props.data.procedure_categories.map((category) => {
			procedures = category.procedures.filter(x => x.is_selected).map(x => x.procedure.id)
			selectedProcedures = selectedProcedures.concat(procedures)
		})

		let pids = this.props.details.commonSelectedCriterias.filter(x => x.type == 'procedures' && selectedProcedures.indexOf(x.id) == -1).map(x => x.id)

		selectedProcedures = selectedProcedures.concat(pids)

		this.setState({ selectedProcedures: selectedProcedures, procedure: [].concat(selectedProcedures) })
	}


	toggleLayout() {

		let fetchResults = false
		let selectedProcedures = this.state.selectedProcedures
		let procedure = this.state.procedure
		if (selectedProcedures.length === procedure.length && selectedProcedures.sort().every(function (value, index) { return value === procedure.sort()[index] })) {

		} else {
			fetchResults = true
		}
		//selectedProcedures = selectedProcedures
		this.props.toggle(fetchResults, this.state.selectedProcedures)

	}

	toggleData(procedure) {
		let selectedProcedures = this.state.selectedProcedures
		if (selectedProcedures.length > 1 || (selectedProcedures.length == 1 && selectedProcedures.indexOf(procedure.procedure.id) == -1)) {

			if (selectedProcedures.indexOf(procedure.procedure.id) != -1) {
				selectedProcedures.splice(selectedProcedures.indexOf(procedure.procedure.id), 1)
			} else {
				selectedProcedures.push(procedure.procedure.id)
			}
			this.setState({ selectedProcedures: selectedProcedures })


		} else {
			setTimeout(() => {
				SnackBar.show({ pos: 'bottom-center', text: "Please Select at least one Procedure" })
			}, 500)
			return null
		}
	}

	render() {

		return (
			<div>
				<div className="cancel-overlay" onClick={this.props.toggle}></div>
				<div className="widget cancel-appointment-div cancel-popup">
					<div className="pop-top-heading">
						Select Treatment(s)
						<img src={ASSETS_BASE_URL + "/img/customer-icons/close-black.svg"} onClick={this.props.toggle} />
					</div>
					<div className="widget-header action-screen-header pop-padding">
						<p className="fw-500 cancel-appointment-head">{this.props.heading}</p>
					</div>
					<div className="terms-condition-div onscreen-scroll">
						{
							this.props.data.procedure_categories.map((category, key) => {

								return (<div className="pop-underline" key={key}><h4>{category.name}</h4>

									{
										category.procedures.map((procedure, i) => {

											return <li key={`${i}_a`}>
												<label className="procedure-check ck-bx" htmlFor={`${procedure.procedure.id}_`}>{procedure.procedure.name}
													<input type="checkbox" checked={this.state.selectedProcedures.indexOf(procedure.procedure.id) == -1 ? false : true} id={`${procedure.procedure.id}_`} name="fruit-2" value=""
														onChange={this.toggleData.bind(this, procedure)} />
													<span className="checkmark">
													</span>
												</label>
												{/* <div>
													<input type="checkbox" className="ins-chk-bx" checked={this.state.selectedProcedures.indexOf(procedure.procedure.id) == -1 ? false : true} id={`${procedure.procedure.id}_`} name="fruit-2" value=""
														onChange={this.toggleData.bind(this, procedure)}
													/><label htmlFor={`${procedure.procedure.id}_`}>{procedure.procedure.name}</label>
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
								</div>)
							})
						}
					</div>
					{
						this.state.errorMessage ?
							<p>Please Select at least one Procedure</p>
							: ''
					}
					<div className="procedures-btn-pop">
						<button className="fw-500" onClick={this.toggleLayout.bind(this)}>Done</button>
					</div>
				</div>
			</div>
		)
	}
}
