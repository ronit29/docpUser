import React from 'react'

class HospitalLocationView extends React.Component {

	render(){
    let { hospital_data } = this.props 
		return(
			<div className="hs-card">
         <div className="card-head">Hospital in other locations</div>   
         <div className="card-body clearfix">
           <ul className="hs-accordian"> 
              {
                hospital_data.other_network_hospitals.map((location, i)=> {
                  return <li key={i}>
                         <div className="accordian-head">{location.name}
                             {/*<img className="img-map" src="https://cdn.docprime.com/cp/assets/img/customer-icons/map-icon.png" />*/}
                         </div>
                         <p className="accordian-dtl">{location.address}</p>
                       </li>
                })
              }
           </ul>
{/*                 <a href="javascript:void(0);" className="btn-view-hospital btn-more">+5 more</a>*/}
         </div>   
      </div>
			)
	}
}

export default HospitalLocationView