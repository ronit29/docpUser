import React from 'react'
import STORAGE from '../../helpers/storage';

class IpdThankYouScreen extends React.Component{
	
	signUpClicked(){
		this.props.history.push('/login')
	}	
	render(){

		return(
			<div>
			<div className="custom-overlay" onClick={()=>this.props.history.push('/')}></div>
			<div className="custom-popup thanks-popup text-center">
	           <div className="cross-btn"><img src="https://cdn.docprime.com/cp/assets/img/icons/close.png" alt="" onClick={()=>this.props.history.push('/')}/></div>
	           <div className="pop-head text-center">Thank you for using Docprime!</div>
	           <p>Our medical expert will call you shortly and help you with the following:</p>
	           <ul className="med-help">
	             <li><img src="assets/images/tick.png" alt="" />Find the right Doctor and Hospital </li>
	             <li><img src="assets/images/tick.png" alt="" />Comparing Surgery/Procedure cost</li>
	             <li><img src="assets/images/tick.png" alt="" />Managing Hospital Process</li>
	           </ul>
	           	{
	           		STORAGE.checkAuth()?''
	           		:<div>
	           			<a href="javascript:void(0);" className="btn-search btn-singup" onClick={this.signUpClicked.bind(this)}>Signup on Docprime</a>
			            <a href="javascript:void(0);" className="btn-coupan">&amp; Get coupons worth ₹300 </a>
	           		</div>	
	           	}
	            
	            
	        </div>
	       </div>
		)
	}
}

export default IpdThankYouScreen