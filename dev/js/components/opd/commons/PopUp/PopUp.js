import React from 'react'

export default class PopUpView extends React.Component{

	render(){

		let procedure_ids = this.props.selectedCriterias.filter(x => x.type == 'procedures').map(x => x.id)
		
		if(this.props.opd_procedure[this.props.doctor_id]){

			let pids = this.props.opd_procedure[this.props.doctor_id].filter((x) => {
	            if(procedure_ids.indexOf(x.procedure.id) == -1){
	                return true
	            }
	            return false
		    }).map(x => x.procedure.id)
		    procedure_ids =  procedure_ids.concat(pids)

		}
		return(
			<div>
	            <div className="cancel-overlay" onClick={this.props.toggle}></div>
	            <div className="widget cancel-appointment-div cancel-popup">
	                <div className="widget-header text-center action-screen-header">
	                    <p className="fw-500 cancel-appointment-head">{this.props.heading}</p>
	                    <hr />
	                </div>           
	                <div className="terms-condition-div">
	                    {
                            this.props.data.map((category, key) => {

                            return(<div key={key}><h4>{category.name}</h4>

								{
								  	category.procedures.map((procedure, i) => {

		                                return <li key = {i}>
		                                        <div>
		                                            <input type="checkbox" className="ins-chk-bx" checked = {procedure_ids.indexOf(procedure.procedure.id)==-1?false:true} id={procedure.procedure.id} name="fruit-1" value="" onChange={()=>this.props.toggleProcedures(procedure)} /><label htmlFor={procedure.procedure.id}>{procedure.procedure.name}</label>
		                                        </div>
		                                        <p className="pr-prices">₹ {procedure.mrp}<span className="pr-cut-price">₹ {procedure.deal_price}</span></p>
		                                    </li>

		                            })
		                        }
	                          </div>)
                            })
                        }
	                </div>
	                
	                <div className="payment-content-btn text-center">
	                    <button className="fw-500" onClick={()=>this.props.toggleProcedures('',true)}>Done</button>
	                </div>
	            </div>
	        </div>
			)
	}
}
