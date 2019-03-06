import React from 'react'

class HospitalTreatmentView extends React.Component {

	render(){
    let { hospital_data } = this.props
		return(
			<div className="hs-card">
               <div className="card-head">Treatments</div>   
               <div className="card-body clearfix">
                 <ul className="hs-accordian"> 
                     <li>
                       <div className="accordian-head">Uro Oncology (3)
                           <img className="" src="assets/images/up-arrow.png" />
                       </div>
                       <p className="accordian-dtl">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                     </li>
                     <li>
                       <div className="accordian-head">Uro Oncology (3)
                           <img className="" src="assets/images/down-arrow.png" />
                       </div>
                       <p className="accordian-dtl d-none">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                     </li>
                     <li>
                       <div className="accordian-head">Uro Oncology (3)
                           <img className="" src="assets/images/down-arrow.png" />
                       </div>
                       <p className="accordian-dtl d-none">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                     </li>
                     <li>
                       <div className="accordian-head">Uro Oncology (3)
                           <img className="" src="assets/images/down-arrow.png" />
                       </div>
                       <p className="accordian-dtl d-none">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                     </li>
                 </ul>
                 <a href="javascript:void(0);" className="btn-view-hospital btn-more">+24 more</a>
               </div>   
             </div>
			)
	}
}

export default HospitalTreatmentView