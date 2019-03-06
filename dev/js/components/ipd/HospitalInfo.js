import React from 'react'

class HospitalInfoView extends React.Component{

	render(){
		let { hospital_data } = this.props
		return(
			<div className="hs-card">  
              {
                hospital_data.images && hospital_data.images.length?
                <div className="banner mt-21">
                  <img src={hospital_data.images[0].original} className="img-fluid" alt="" />  
                </div>
                :''
              }  
              
              <div className="hospital-details">
                {
                  hospital_data.logo?
                  <div className="hs-nme">
                     <img src={hospital_data.logo} alt="" className="" />  
                  </div> 
                  :'' 
                }
                
                  <h4 className="section-heading">{hospital_data.name}</h4>
                <div className="hsptl-info">
                  {
                    hospital_data.bed_count?
                    <div className="hos-certified"><img src={ASSETS_BASE_URL+"/images/bed.png"} alt="" className="img-bed" />{`${hospital_data.bed_count} beds`}</div> 
                    :'' 
                  }
                  {
                    hospital_data.multi_speciality?
                    <div className="hos-certified"><img src={ASSETS_BASE_URL+"/images/multi-speciality.png"} alt="" className="img-splty" />Multi Speciality</div>
                    :''  
                  }
                  
                </div>
                {
                  hospital_data.opd_timings?
                  <div className="opd-timing">
                    <span><b>OPD Timing:</b> {hospital_data.opd_timings} </span>
                    {/*<span className="opd-status"> Open Today</span>*/}
                  </div>
                  :''  
                }
                
                 <hr />
                <ul className="hsptl-contact text-left">
                  {
                    hospital_data.images && hospital_data.images.length?
                    <li>
                      <div className="hsptl-title hs-tle hsptl-photo">Photo</div>
                      <div className="hsptl-img">
                        {
                          hospital_data.images.map((image)=> {
                            return <span><img src={image.original} alt="" /></span>
                          })
                        }
                        {
                          hospital_data.images.length>5?
                          <span className="btn-more-img">+25<br /> more</span>
                          :''  
                        }
                        
                      </div>
                    </li>
                    :''  
                  }
                  
                  {
                    hospital_data.address?
                    <li className="li-address">
                      <div className="hsptl-title hs-tle">Address:</div>
                      <div className="hsptl-title hsptl-add">{hospital_data.address}</div>
                      <div className="hsptl-title"><img src="https://cdn.docprime.com/cp/assets/img/customer-icons/map-icon.png" alt="" className="img-fluid img-map" /></div>
                      
                    </li>
                    :''  
                  }
                  {
                    hospital_data.contact_number?
                    <li>
                      <div className="hsptl-title hsptl-cntc hs-tle">Contact</div>
                      <div className="hsptl-title hsptl-add"> {hospital_data.contact_number}</div>
                      <div className="hsptl-title"><img src="https://cdn.docprime.com/cp/assets/img/customer-icons/map-icon.png" alt="" className="img-fluid img-map" style={{width: '20px'}} /></div>
                    </li>
                    :''  
                  }
                  
                </ul>
              </div>
             </div>
			)
	}
}

export default HospitalInfoView