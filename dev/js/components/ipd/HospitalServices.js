import React from 'react'

class HospitalServicesView extends React.Component  {

	render(){
		let { hospital_data } = this.props
		return(
			<div className="hs-card">
	           <div className="card-head"><h2 className="dsply-ipd-hdng">Facilities in {hospital_data.name}</h2></div>   
	           <div className="card-body clearfix">
	             <ul className="hs-services">
	             	{
	             		hospital_data.services.map((service, i) => {
	             			return <li key={i}><h3><img src={service.icon} alt="" /> {service.name} </h3></li>  
	               		
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