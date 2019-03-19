import React from 'react'
import Lightbox from '../../helpers/lightbox';

class HospitalInfoView extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      photoIndex: 0,
      isOpen: false,
    }
  }

	render(){
		let { hospital_data } = this.props
    let { photoIndex, isOpen } = this.state
		return(
			<div className="hs-card">  
              {
                hospital_data.images && hospital_data.images.length?
                <div className="banner" style={{backgroundImage : `url(${hospital_data.images[0].original})` }}>
                  {/*<div className="total-img"><a href="javascript:void(0);"><img src={ASSETS_BASE_URL+"/images/camera.png"} alt="" className="" /> 54</a></div>*/}  
                </div>
                :''
              }  
              
              <div className="hospital-details">
                {
                  hospital_data.logo?
                  <div className="hosNme">
                    <div className="hs-nme hsptName">
                       <img src={hospital_data.logo} alt="" className="img-fluid" />  
                    </div> 
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
                    {
                      hospital_data.open_today?
                      <span className="opd-status"> Open Today</span>
                      :''
                    }
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
                          hospital_data.images.slice(0,4).map((image, i)=> {
                            return <span key={i}><div className="bg-img-box" style = {{backgroundImage : `url(${image.original})`}}   onClick={() => this.setState({ isOpen: true, photoIndex: i })}></div></span>
                          })
                        }
                        {isOpen && (
                            <Lightbox
                                mainSrc={hospital_data.images[photoIndex].original}
                                nextSrc={hospital_data.images[(photoIndex + 1) % hospital_data.images.length].original}
                                prevSrc={hospital_data.images[(photoIndex + hospital_data.images.length - 1) % hospital_data.images.length].original}
                                onCloseRequest={() => this.setState({ isOpen: false })}
                                onMovePrevRequest={() =>
                                    this.setState({
                                        photoIndex: (photoIndex + hospital_data.images.length - 1) % hospital_data.images.length,
                                    })
                                }
                                onMoveNextRequest={() =>
                                    this.setState({
                                        photoIndex: (photoIndex + 1) % hospital_data.images.length,
                                    })
                                }
                            />
                        )}
                        {
                          hospital_data.images.length>4?
                          <span className="btn-more-img" onClick={() => this.setState({ isOpen: true, photoIndex: 4 })}>{`+${hospital_data.images.length - 4}`}<br /> more</span>
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
                      <div className="hsptl-title">
                        <a href={`https://www.google.com/maps/search/?api=1&query=${hospital_data.lat},${hospital_data.long}`} target="_blank">
                          <img src={ASSETS_BASE_URL + "/images/white-map.png"} alt="" className="img-fluid img-map" />
                        </a>
                      </div>
                      
                    </li>
                    :''  
                  }
                  {
                    hospital_data.contact_number?
                    <li>
                      <div className="hsptl-title hsptl-cntc hs-tle">Contact:</div>
                      <div className="hsptl-title hsptl-add"> {hospital_data.contact_number}</div>
                      <div className="hsptl-title"> 
                        <a style={{borderRadius: '25px'}} href={`tel:${hospital_data.contact_number}`} className="dpp-btn-book d-lg-none d-flex"><img src={ASSETS_BASE_URL + "/images/call-round.png"} alt="" className="img-fluid img-map" style={{width: '20px'}} />
                        </a>
                      </div>
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