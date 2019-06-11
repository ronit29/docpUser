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
            <li className="widget">
               <div className="loc-info">
                  <img src="https://cdn.docprime.com/cp/assets/img/new-loc-ico.svg" alt="loc" className="img-loc" />
                  {
                     data.locality_url ?
                        <a href={`${data.locality_url}`} onClick={(e) => {
                           e.preventDefault()
                           this.props.history.push(`/${data.locality_url}`)
                        }}><p>{`${data.short_address || ''} ${distance ? ` | ${distance} Km` : ''}`}</p></a>
                        : <p>{`${data.short_address || ''} ${distance ? ` | ${distance} Km` : ''}`}</p>
                  }

               </div>
               <div className="hospital-info" style={{ cursor: 'pointer' }} onClick={() => this.props.getHospitalDetailPage(data.id, data.url || null)}>
                  <div className="left-side-info">
                     <a href={`${data.url ? data.url : `/ipd/hospital/${data.id}`}`} onClick={(e) => {
                        e.preventDefault()
                        this.props.getHospitalDetailPage(data.id, data.url || null)
                     }}><h2 className="section-heading">{data.name}</h2></a>
                     {
                        data.certifications && data.certifications.length ?
                           <div className="hos-certified"><img src={ASSETS_BASE_URL + "/images/certified.png"} className="img-certified" />{data.certifications.length ? data.certifications.join(' | ') : ''}</div>
                           : ''
                     }

                     {/*  <div className="hos-popularity">
                        <span className="pop-txt">Popular</span> 
                        <span className="pop-star">4.5</span> 
                        <img src="assets/images/star.png" alt="star" className="img-star" />
                     </div>*/}
                  </div>
                  <div className="right-side-info">
                     <InitialsPicture name={data.name} has_image={!!data.logo} className="initialsPicture-ds fltr-initialPicture-ds" >
                        <img src={data.logo} className="img-fluid img-hospital" alt={data.name} title={data.name} />
                     </InitialsPicture>
                  </div>
               </div>

               <div className="hospital-info hsptl-info">
                  <div className="left-side-info">
                     {
                        data.bed_count ?
                           <div className="hos-certified hs-certified"><img src={ASSETS_BASE_URL + "/images/bed.png"} alt="" className="img-bed" /><h3 className="dsply-inline">{data.bed_count} beds</h3></div>
                           : ''
                     }
                     {
                        data.multi_speciality ?
                           <div className="hos-certified"><img src={ASSETS_BASE_URL + "/images/multi-speciality.png"} alt="" className="img-splty" /><h3 className="dsply-inline">Multi Speciality</h3></div>
                           : ''
                     }

                  </div>
                  <div className="right-side-info">
                     {
                        data.count_of_insurance_provider ?
                           <p className="ins-provider" /*style={{cursor:'pointer'}} onClick={this.toggleProviderPopup.bind(this, data.insurance_provider)}*/><img src={ASSETS_BASE_URL + "/images/green-tick.png"} alt="" className="img-tick" />{data.count_of_insurance_provider} Health Insurance Providers</p>
                           : ''
                     }
                     <a href="javascript:void(0);" onClick={() => this.props.getCostEstimateClicked(data.id)} className="btn-estimate">{this.props.noIpd ? 'Know More' : 'Get Cost Estimate'}</a>
                  </div>
               </div>
            </li>
            <li className="cstm-docCard mb-3">
               <div className="cstm-docCard-content">
                  <div className="row no-gutters">
                     <div className="col-8">
                        <h2 className="nw-hsp-crd-heading">Ck Birla Hospital for Women</h2>
                        <div className="nw-hsp-crd-subheading"><img src={ASSETS_BASE_URL + '/img/customer-icons/Award-01.svg'} /> <p>CAP | ISO Certified | Estd 2012</p></div>
                        <div className="nw-hsp-crd-logohs">
                           <InitialsPicture name={data.name} has_image={!!data.logo} className="initialsPicture-ds fltr-initialPicture-ds" >
                              <img style={{width:'100px'}} src={data.logo} className="img-fluid " alt={data.name} title={data.name} />
                           </InitialsPicture>
                        </div>
                        <div className="cstm-doc-rtng">
                           <img  src={ASSETS_BASE_URL + '/img/customer-icons/rating-star-filled.svg'} className="img-cstm-docrating" style={{ width: '12px', marginRight: 2, height: '12px' }} />
                           <img  src={ASSETS_BASE_URL + '/img/customer-icons/rating-star-filled.svg'} className="img-cstm-docrating" style={{ width: '12px', marginRight: 2, height: '12px' }} />
                           <img  src={ASSETS_BASE_URL + '/img/customer-icons/rating-star-filled.svg'} className="img-cstm-docrating" style={{ width: '12px', marginRight: 2, height: '12px' }} />
                           <img  src={ASSETS_BASE_URL + '/img/customer-icons/rating-star-filled.svg'} className="img-cstm-docrating" style={{ width: '12px', marginRight: 2, height: '12px' }} />
                           <img  src={ASSETS_BASE_URL + '/img/customer-icons/rating-star-filled.svg'} className="img-cstm-docrating" style={{ width: '12px', marginRight: 2, height: '12px' }} />
                           <span>(5)</span>
                        </div>
                     </div>
                     <div className="col-4">
                        <div className="nw-hsptl-rgt-content">
                           <div className="nw-hsp-crd-beds">
                              <p><img src={ASSETS_BASE_URL + "/images/multi-speciality.png"} alt="" className="img-splty" /> Multi Speciality</p>
                              <p><img src={ASSETS_BASE_URL + "/images/bed.png"} alt="" className="img-bed" /> 700 beds </p>
                           </div>
                           <div className="nw-hsp-crd-crd-btn">
                              <p className="nw-hsp-crd-green"><img src={ASSETS_BASE_URL + '/img/chk-green.svg'} />Insurance Providers</p>
                              <button className="cstm-book-btn">View Details</button>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
               <div className="cstmCardFooter">
                  <div className="cstmfooterContent">
                     <h3 className="mb-rmv">
                        <img style={{width:'10px',marginLeft:'3px'}} src={ASSETS_BASE_URL + '/img/new-loc-ico.svg'} />
                        Huda City Centre Mall Sector 52 Gurgaon
                     </h3>
                  </div>
                  <div className="cstmDocLoc">
                     <p>
                        <img src={ASSETS_BASE_URL + '/img/cstmdist.svg'} />
                        1.5 Km</p>
                  </div>
               </div>
            </li>
         </div>
      )
   }
}

export default HospitalCard