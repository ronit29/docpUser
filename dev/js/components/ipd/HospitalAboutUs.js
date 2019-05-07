import React from 'react'

class HospitalAboutUsView extends React.Component {

	render(){
		let { hospital_data } = this.props
		return(
			<div className="hs-card">
               <div className="card-head"><h2 className="dsply-ipd-hdng">About</h2></div>   
               <div className="card-body clearfix custom-li-style" dangerouslySetInnerHTML={{ __html: hospital_data.about }}>
               </div>   
             </div>
			)
	}
}

export default HospitalAboutUsView