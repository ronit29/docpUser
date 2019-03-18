import React from 'react'

class HospitalServicesView extends React.Component  {

	render(){
		let { hospital_data } = this.props
		return(
			<div className="hs-card">
	           <div className="card-head">Services</div>   
	           <div className="card-body clearfix">
	             <ul className="hs-services">
	             	{
	             		hospital_data.services.map((service, i) => {
	             			return <li key={i}><img src={service.icon} alt="" /> {service.name} </li>  
	               		
	             		})
	             	}
	             </ul>
	             {/*<a href="javascript:void(0);" className="btn-view-hospital btn-more">+12 more</a>*/}
	           </div>   
	         </div>
			)
	}
}

export default HospitalServicesView