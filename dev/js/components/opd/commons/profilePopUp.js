import React from 'react'

export default class PopUpView extends React.Component{

	constructor(props){
		super(props)
		this.state = {
			errorMessage: false
		}
	}


	render(){console.log('aaaaaaaaaaaaaaaa');console.log(this.props)

		return(
			<div>
	            <div className="cancel-overlay" onClick={this.props.toggle}></div>
	            <div className="widget cancel-appointment-div cancel-popup">
	            {
	            	this.props.data.map((category, i) => {

	            		return  <div key = {i}>
		                <div className="widget-header text-center action-screen-header">
			                    <p className="fw-500 cancel-appointment-head">{category.category_name}</p>
			                    <hr />
			                </div>           
			                <div className="terms-condition-div">
			                    <ul className="procedure-list">
		                          
                                    <li key={i}>
                                        <div>
                                            <input type="checkbox" checked={category.is_selected} className="ins-chk-bx" id={`${category.procedure_id}_`} name="fruit-2" value="" onChange={()=>this.props.toggleProcedures(category, this.props.doctor_id , this.props.hospital_id)} /><label htmlFor={`${category.procedure_id}_`}>{category.procedure_name}</label>
                                        </div>
                                        <p className="pr-prices">₹ {category.deal_price}<span className="pr-cut-price">₹ {category.mrp}</span></p>
                                    </li>

		                    	</ul>            
			        		</div>
			        		
			        	</div>


	            	})
		      
		        }
	        	{
                	this.state.errorMessage?
                	<p>Please Select at least one Procedure</p>
                	:''
                }
                <div className="payment-content-btn text-center">
                    <button className="fw-500" onClick={this.props.toggle}>Done</button>
                </div>
                </div>
	        </div>
			)
	}
}