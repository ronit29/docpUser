import React from 'react'
// import Lightbox from '../../helpers/lightbox';
import GTM from '../../helpers/gtm.js'
import Lightbox from 'react-image-lightbox';
import RatingStars from '../commons/ratingsProfileView/RatingStars';

class HospitalInfoView extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      photoIndex: 0,
      isOpen: false,
    }
  }

  render() {
    let { hospital_data } = this.props
    let { photoIndex, isOpen } = this.state

    let name = ''
    if(hospital_data) {

      if(hospital_data.seo_title){
        name = hospital_data.seo_title
      }else if(hospital_data.seo && hospital_data.seo.h1_title) {
        name = hospital_data.seo.h1_title
      }else {
        name = hospital_data.name_city
      }

    }
    return (
      <div className="hs-card">
        {
          hospital_data.images && hospital_data.images.length ?
            <div className="banner" style={{ backgroundImage: `url(${hospital_data.images[0].original})` }}>
              {/*<div className="total-img"><a href="javascript:void(0);"><img src={ASSETS_BASE_URL+"/images/camera.png"} alt="" className="" /> 54</a></div>*/}
            </div>
            : ''
        }

        <div className="hospital-details">
          {
            hospital_data.logo ?
              <div className="hosNme">
                <div className={`hs-nme hsptName hsptWidget ${this.props.showPopup ? 'popupTopChange' : ''}`}>
                  <img src={hospital_data.logo} alt={name} className="img-fluid" />
                </div>
              </div>
              : ''
          }

          {/* If anyone is un-commenting the code below, please also remove the inline 'style'(paddingTop:0) tag from h1 present just below the code (class of h1 - section-heading pb-10) */}
          {/* <div className="ipd-st-rating">
            {
              hospital_data.rating_graph && hospital_data.rating_graph.avg_rating ?
                <RatingStars average_rating={hospital_data.rating_graph.avg_rating} rating_count={''} width="12px" height="12px" /> : ''
            }
          </div> */}
          <h1 className="section-heading pb-10" style={{ paddingTop: 0 }} >{name}</h1>
          {
            hospital_data.address ?
              <div className="opd-timing opd-mapico">
                <h2><span className="ipd-adrs-tb">Address: </span>{hospital_data.address} </h2>
                <a href={`https://www.google.com/maps/search/?api=1&query=${hospital_data.lat},${hospital_data.long}`} style={{ float: 'right', cursor: 'pointer' }} target="_blank">
                  <img style={{ width: '25px', height: '25px' }} src={ASSETS_BASE_URL + '/img/customer-icons/map-icon.png'} />
                </a>
              </div>
              : ''
          }
          
          <div className="hsptl-info">
            {
              hospital_data.bed_count ?
                <div className="hos-certified"><img src={ASSETS_BASE_URL + "/images/bed.png"} alt="" className="img-bed" />{`${hospital_data.bed_count} beds`}</div>
                : ''
            }
            {
              hospital_data.multi_speciality ?
                <div className="hos-certified"><img style={{ marginTop: '4px' }} src={ASSETS_BASE_URL + "/images/multi-speciality.png"} alt="" className="img-splty" />Multi Speciality</div>
                : ''
            }

          </div>
          {/* {
            hospital_data && hospital_data.id==3240 && this.props.isSeo?
            <div className="reg-fee-cont">
              <p>Docprime offer - No Registration Fee</p>
            </div>
            :''
          } */}
          <hr />
          <ul className="hsptl-contact text-left">
            {
              hospital_data.images && hospital_data.images.length ?
                <li>
                  <div className="hsptl-title hs-tle hsptl-photo">Gallery</div>
                  <div className="hsptl-img">
                    {
                      hospital_data.images.slice(0, 4).map((image, i) => {
                        return <span key={i}><a href={image.original} onClick={(e)=>{
                          e.preventDefault();
                          e.stopPropagation();} }>
                          <img className="bg-img-box img-fluid" alt={`${hospital_data.name}: Photo${i+1}`} src={image.original}  onClick={() => this.setState({ isOpen: true, photoIndex: i })}/>
                          </a></span>
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
                      hospital_data.images.length > 4 ?
                        <span className="btn-more-img" onClick={() => this.setState({ isOpen: true, photoIndex: 4 })}>{`+${hospital_data.images.length - 4}`}<br /> more</span>
                        : ''
                    }

                  </div>
                </li>
                : ''
            }

            {
              hospital_data.opd_timings ?
                <li className="li-address">
                  <div className="hsptl-title hs-tle">OPD Timings:</div>
                  <div className="hsptl-title hsptl-add">{hospital_data.opd_timings}
                  {
                    hospital_data.open_today ?
                      <span className="opd-status"> Open Today</span>
                      : ''
                  }
                  </div>
                  
                  {/*<div className="hsptl-title">
                        <a href={`https://www.google.com/maps/search/?api=1&query=${hospital_data.lat},${hospital_data.long}`} target="_blank">
                          <img src={ASSETS_BASE_URL + "/images/white-map.png"} alt="" className="img-fluid img-map" />
                        </a>
                      </div>*/}

                </li>
                : ''
            }
            {
              hospital_data.contact_number ?
                <li>
                  <div className="hsptl-title hsptl-cntc hs-tle">Contact:</div>
                  <div className="hsptl-title hsptl-add"> {hospital_data.contact_number}</div>
                  <div className="hsptl-title">
                    <a style={{ borderRadius: '25px' }} href={`tel:${hospital_data.contact_number}`} className="dpp-btn-book d-lg-none d-flex"><img src={ASSETS_BASE_URL + "/images/call-round.png"} alt="" className="img-fluid img-map" style={{ width: '20px' }} onClick={() => {
                      let gtmData = {
                        'Category': 'ConsumerApp', 'Action': 'IpdHospitalContactClicked', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'ipd-hospital-contact-clicked'
                      }
                      GTM.sendEvent({ data: gtmData })
                    }} />
                    </a>
                  </div>
                </li>
                : ''
            }

          </ul>
        </div>
      </div>
    )
  }
}

export default HospitalInfoView