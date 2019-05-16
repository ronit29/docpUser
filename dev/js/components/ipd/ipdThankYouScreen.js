import React from 'react'
import STORAGE from '../../helpers/storage';

class IpdThankYouScreen extends React.Component{
	
	signUpClicked(){
		this.props.history.push('/login')
	}	
	render(){
		let userLogin = STORAGE.checkAuth() || false
		return(
			<div>
			<div className="custom-overlay" onClick={()=>this.props.tabView?this.props.togglePopup(false):this.props.history.push('/')}></div>
			<div className={`custom-popup thanks-popup text-center ${userLogin?'login-cls':''}`}>
			   <div className="thumb-icon"><img src={ASSETS_BASE_URL + "/images/thumbsup.png"} alt="" /></div>
	           <div className="cross-btn"><img src="https://cdn.docprime.com/cp/assets/img/icons/close.png" alt="" onClick={()=>this.props.tabView?this.props.togglePopup(false):this.props.history.push('/')}/></div>
	           <div className="pop-head text-center">Your request has been received.</div>
	           <p>Our medical expert will call you shortly and help you with the following:</p>
	           <ul className="med-help">
	             <li><img src={ASSETS_BASE_URL + "/images/tick.png"} alt="" />Find the right Doctor and Hospital </li>
	             <li><img src={ASSETS_BASE_URL + "/images/tick.png"} alt="" />Comparing Surgery/Procedure cost</li>
	             <li><img src={ASSETS_BASE_URL + "/images/tick.png"} alt="" />Managing Hospital Process</li>
	           </ul>
	           	{
	           		userLogin?''
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