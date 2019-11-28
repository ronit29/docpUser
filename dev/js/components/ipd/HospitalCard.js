import React from 'react'
import InitialsPicture from '../commons/initialsPicture'
//import HospitalCard from './HospitalCard.js'

class HospitalCard extends React.Component {

   toggleProviderPopup(data) {
      this.props.toggleProviderFilter(data)
   }

   render() {
      let { data } = this.props
      let distance = data && data.distance ? (Math.round(data.distance) / 1000).toFixed(1) : null
      return (
         <div>
            <li className="cstm-docCard mb-3">
               <div className="cstm-docCard-content">
                  <div className="row no-gutters" style={{paddingBottom:10}}>
                     <div className="col-7">
                        <a href={`${data.url ? data.url : `/ipd/hospital/${data.id}`}`} onClick={(e) => {
                        e.preventDefault()
                        this.props.getHospitalDetailPage(data.id, data.url || null)
                     }}><h2 className="nw-hsp-crd-heading">{data.name}</h2></a>
                        {
                           data.certifications && data.certifications.length ?
                              <div className="nw-hsp-crd-subheading"><img src={ASSETS_BASE_URL + '/img/customer-icons/Award-01.svg'} /> <p>{data.certifications.length ? data.certifications.join(' | ') : ''}</p></div>
                              : ''
                        }
                        
                        <div className="nw-hsp-crd-logohs">
                           <InitialsPicture name={data.name} has_image={!!data.logo} className="initialsPicture-ds fltr-initialPicture-ds" >
                              <img style={{width:'100px'}} src={data.logo} className="img-fluid " alt={data.name} title={data.name} />
                           </InitialsPicture>
                        </div>
                       {/* <div className="cstm-doc-rtng">
                           <img  src={ASSETS_BASE_URL + '/img/customer-icons/rating-star-filled.svg'} className="img-cstm-docrating" style={{ width: '12px', marginRight: 2, height: '12px' }} />
                           <img  src={ASSETS_BASE_URL + '/img/customer-icons/rating-star-filled.svg'} className="img-cstm-docrating" style={{ width: '12px', marginRight: 2, height: '12px' }} />
                           <img  src={ASSETS_BASE_URL + '/img/customer-icons/rating-star-filled.svg'} className="img-cstm-docrating" style={{ width: '12px', marginRight: 2, height: '12px' }} />
                           <img  src={ASSETS_BASE_URL + '/img/customer-icons/rating-star-filled.svg'} className="img-cstm-docrating" style={{ width: '12px', marginRight: 2, height: '12px' }} />
                           <img  src={ASSETS_BASE_URL + '/img/customer-icons/rating-star-filled.svg'} className="img-cstm-docrating" style={{ width: '12px', marginRight: 2, height: '12px' }} />
                           <span>(5)</span>
                        </div>*/}
                     </div>
                     <div className="col-5">
                        <div className="nw-hsptl-rgt-content">
                           <div className="nw-hsp-crd-beds">
                              {
                                 data.multi_speciality?
                                 <p><img src={ASSETS_BASE_URL + "/images/multi-speciality.png"} alt="" className="img-splty" /> Multi Speciality</p>
                                 :''   
                              }
                              
                              {
                                 data.bed_count?
                                 <p><img src={ASSETS_BASE_URL + "/images/bed.png"} alt="" className="img-bed" />{`${data.bed_count} beds`}</p>
                                 :''
                              }
                              
                           </div>
                           <div className="nw-hsp-crd-crd-btn">
                              {
                                 false && data.count_of_insurance_provider?
                                 <p className="nw-hsp-crd-green" /*style={{cursor:'pointer'}} onClick={this.toggleProviderPopup.bind(this, data.insurance_provider)}*/><img src={ASSETS_BASE_URL + '/img/chk-green.svg'} />{`${data.count_of_insurance_provider} Insurance Providers`}</p>
                                 :''
                              }
                              {
                                 data.is_ipd_hospital && false?<a href="javascript:void(0);" onClick={() => this.props.getCostEstimateClicked(data.id)}><button className="cstm-book-btn">Get Cost Estimate</button></a>
                                 :<a href="javascript:void(0);" onClick={(e) => {
                                    e.preventDefault()
                                    this.props.getHospitalDetailPage(data.id, data.url || null)
                                 }}><button className="cstm-book-btn">View details</button></a>
                              }
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
               {
                  data.locality_url ?
                  <div className="cstmCardFooter">
                     <div className="cstmfooterContent">
                        <a href={`${data.locality_url}`} onClick={(e) => {
                           e.preventDefault()
                           this.props.history.push(`/${data.locality_url}`)
                        }}><h3 className="mb-rmv">
                           <img style={{width:'10px',marginLeft:'3px'}} src={ASSETS_BASE_URL + '/img/new-loc-ico.svg'} />
                          {data.short_address || ''}
                        </h3>
                        </a>
                     </div>
                     {
                        distance?
                        <div className="cstmDocLoc">
                           <p>
                              <img src={ASSETS_BASE_URL + '/img/cstmdist.svg'} />
                              {`${distance} Km`}</p>
                        </div>
                        :''   
                     }
                     
                  </div>
                  :<div className="cstmCardFooter">
                     <div className="cstmfooterContent">
                        <h3 className="mb-rmv">
                           <img style={{width:'10px',marginLeft:'3px'}} src={ASSETS_BASE_URL + '/img/new-loc-ico.svg'} />
                          {data.short_address || ''}
                        </h3>
                     </div>
                     {
                        distance?
                        <div className="cstmDocLoc">
                           <p>
                              <img src={ASSETS_BASE_URL + '/img/cstmdist.svg'} />
                              {`${distance} Km`}</p>
                        </div>
                        :''
                     }
                  </div>   
               }
               
            </li>
         </div>
      )
   }
}

export default HospitalCard