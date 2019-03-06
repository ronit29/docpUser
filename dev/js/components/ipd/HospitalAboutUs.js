import React from 'react'

class HospitalAboutUsView extends React.Component {

	render(){
		let { hospital_data } = this.props
		return(
			<div className="hs-card">
               <div className="card-head">About</div>   
               <div className="card-body clearfix">
                {hospital_data.about}
               </div>   
             </div>
			)
	}
}

export default HospitalAboutUsView