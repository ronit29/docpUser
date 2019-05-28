import React from 'react'
import InitialsPicture from '../commons/initialsPicture'
//import HospitalCard from './HospitalCard.js'

class HospitalCard extends React.Component {

   toggleProviderPopup(data){
      this.props.toggleProviderFilter(data)
   }

	render(){
		let { data } = this.props
		let distance = data && data.distance?(Math.round(data.distance) / 1000).toFixed(1):null
		return(
			<li className="widget">
               <div className="loc-info">
                  <img src="https://cdn.docprime.com/cp/assets/img/new-loc-ico.svg" alt="loc" className="img-loc" />
                  {
                     data.locality_url?
                     <a href={`${data.locality_url}`} onClick={(e) => {
                        e.preventDefault()
                        this.props.history.push(`/${data.locality_url}`)
                     }}><p>{`${data.short_address ||''} ${distance?` | ${distance} Km`:''}` }</p></a>
                     :<p>{`${data.short_address ||''} ${distance?` | ${distance} Km`:''}` }</p>
                  }
                  
               </div>
               <div className="hospital-info" style={{cursor:'pointer'}} onClick={()=>this.props.getHospitalDetailPage(data.id, data.url||null)}>
                  <div className="left-side-info">
                     <a href={`${data.url?data.url:`/ipd/hospital/${data.id}`}`} onClick={(e) => {
                        e.preventDefault()
                        this.props.getHospitalDetailPage(data.id, data.url||null)
                     }}><h2 className="section-heading">{data.name}</h2></a>
                     {
                     	data.certifications && data.certifications.length?
                     	<div className="hos-certified"><img src={ASSETS_BASE_URL + "/images/certified.png"} className="img-certified" />{data.certifications.length?data.certifications.join(' | '):''}</div>
                     	:''
                     }
                     
                   {/*  <div className="hos-popularity">
                        <span className="pop-txt">Popular</span> 
                        <span className="pop-star">4.5</span> 
                        <img src="assets/images/star.png" alt="star" className="img-star" />
                     </div>*/}
                  </div>
                  <div className="right-side-info">
                     <InitialsPicture name={data.name} has_image={!!data.logo} className="initialsPicture-ds fltr-initialPicture-ds" >
                         <img src={data.logo} className="img-fluid img-hospital" alt={data.name} title={data.name}/>
                     </InitialsPicture>
                  </div>
               </div>

               <div className="hospital-info hsptl-info">
                  <div className="left-side-info">
                     {
                     	data.bed_count?
                     	<div className="hos-certified hs-certified"><img src={ASSETS_BASE_URL + "/images/bed.png"} alt="" className="img-bed" /><h3 className="dsply-inline">{data.bed_count} beds</h3></div>
                     	:''	
                     }
                     {
                     	data.multi_speciality?
                     	<div className="hos-certified"><img src={ASSETS_BASE_URL + "/images/multi-speciality.png"} alt="" className="img-splty" /><h3 className="dsply-inline">Multi Speciality</h3></div>
                     	:''	
                     }
                     
                  </div>
                  <div className="right-side-info">
                     {
                        data.count_of_insurance_provider?
                        <p className="ins-provider" /*style={{cursor:'pointer'}} onClick={this.toggleProviderPopup.bind(this, data.insurance_provider)}*/><img src={ASSETS_BASE_URL + "/images/green-tick.png"} alt="" className="img-tick" />{data.count_of_insurance_provider} Health Insurance Providers</p>
                        :''
                     }
                     <a href="javascript:void(0);" onClick={()=>this.props.getCostEstimateClicked(data.id)} className="btn-estimate">{this.props.noIpd?'Know More':'Get Cost Estimate'}</a>
                  </div>
               </div>
            </li>
			)
	}
}

export default HospitalCard