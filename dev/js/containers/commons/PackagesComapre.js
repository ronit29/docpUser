import React from 'react'
import LeftBar from '../../components/commons/LeftBar'
import RightBar from '../../components/commons/RightBar'
import ProfileHeader from '../../components/commons/DesktopProfileHeader'
import Footer from '../../components/commons/Home/footer'


class PackageCompare extends React.Component {
  constructor(){
    super()
    this.state={
      checked:false
    }
  }

render() {

  return (
      <div className="profile-body-wrap" style={{ paddingBottom: 54 }}>
          <ProfileHeader />
           <section className="pkgComapre container">
               <div className="row main-row parent-section-row">
                  <LeftBar />
                  <div className="col-12 col-md-7 col-lg-8 center-column">

                      <div className="filter-row sticky-header mbl-stick">
                         <section className="scroll-shadow-bar">
                            <div className="top-filter-tab-container">
                               <div className="top-filter-tabs-select"><img src={ASSETS_BASE_URL + "/images/PackageCompare/comapre.png"} alt="" /> Category </div>
                               <div className="top-filter-tabs-select"><img className="sort-filter" src={ASSETS_BASE_URL + "/images/PackageCompare/filtersort.png"} alt="" /><span>Sort / Filter</span> </div>
                            </div>
                         </section>
                      </div>

                         <div className="container-fluid" id="filter-scroll">
                            <div className="row">
                               <div className="col-12">
                                  <div className="filter-pdng">
                                     <div className="action-filter alignShareBtn">
                                        <ul className="inline-list">
                                           <li className="d-none d-md-inline-block">
                                              <span style={{ cursor: 'pointer' }} >
                                                 <img src="https://cdn.docprime.com/cp/assets/img/customer-icons/url-short.svg" style={{ width: 80 }} />
                                              </span>
                                            </li>
                                        </ul>
                                     </div>
                                     <div className="filter-title">
                                        1 Results found for
                                        <h1 className="search-result-heading"><span className="fw-700"> selected categories</span></h1>
                                        <span className="search-result-span"><span className="location-edit"> in Sector 44, Gurugram</span>
                                        <img src="https://cdn.docprime.com/cp/assets/img/customer-icons/edit.svg" className="edit-loc-icon" /></span>
                                     </div>
                                  </div>
                               </div>
                            </div>
                         </div>

                           {/*Package card*/}

                           <div className="container-fluid">
                               <div className="row">
                                  <div className="col-12">
                                     <div>
                                        <div className="pkg-card-container mb-3">
                                           <div className={this.state.checked ? 'pkg-crd-header pkg-crd-green':'pkg-crd-header'}>
                                            <label className="ck-bx">{this.state.checked ? 'Added':'Add to compare'}
                                               <input type="checkbox" onClick={()=>this.setState({checked:!this.state.checked})} checked={this.state.checked} />
                                                 <span className="checkmark"></span>
                                            </label>
                                           </div> 
                                           <div className="pkg-content-section">
                                              <span className="pkg-ofr-ribbon fw-700">50% OFF</span>
                                              <div className="pkg-card-location p-relative">
                                                 <p><img className="fltr-loc-ico" src="/assets/img/new-loc-ico.svg" style={{ width: '12px' , height: '18px' }} /> DLF Phase 4 Gurgaon | 3 Km</p>
                                              </div>
                                              <div className="pkg-card-content">
                                                 <div className="row no-gutters">
                                                    <div className="col-8">
                                                       <div className="pkg-cardleft-img">
                                                          <div><img className="fltr-usr-image-lab" src="https://cdn.docprime.com/media/lab/images/90x60/311bed248054cf976b20f4fde953c845.jpg" /></div>
                                                       </div>
                                                       <a href="thyrocare-aarogyam-17-special-tpp">
                                                          <h2 className="pkg-labDoc-Name">Thyocare Aarogyam B Package
                                                             {/*<span className="lab-doc-span"><img src="https://cdn.docprime.com/cp/assets/img/icons/info.svg" /></span>*/}
                                                          </h2>
                                                       </a>
                                                       <h3 className="lab-fltr-dc-name fw-500 pkg-include">40 Tests Included</h3>
                                                    </div>
                                                    <div className="col-4">
                                                       <div className="pkg-card-price">
                                                          <p className="fw-500">₹ 1340 <span className="pkg-cut-price">₹ 2700</span></p>
                                                       </div>
                                                       <a href="thyrocare-dlf-phase-4-in-sector-27-gurgaon-lpp"><button className="pkg-btn-nw" style={{ width: '100%' }}>Book Now</button></a>
                                                       <p className="pkg-discountCpn">Includes coupon discount</p>
                                                    </div>
                                                 </div>
                                              </div>
                                              <div className="pkg-card-content">
                                                 <div className="test-included">
                                                    <span className="">Includes:</span>
                                                    <ul>
                                                        <li><img src={ASSETS_BASE_URL + "/images/PackageCompare/heart.png"} alt="" /> Heart (23) </li>
                                                    </ul>
                                                 </div>
                                                 <div className="test-included also-included-test">
                                                    <span className="">Also includes:</span>
                                                    <ul>
                                                        <li><img src={ASSETS_BASE_URL + "/images/PackageCompare/kidney.png"} alt="" /> Kidney (12) </li>
                                                        <li><img src={ASSETS_BASE_URL + "/images/PackageCompare/liver.png"} alt="" /> Liver (11) </li>

                                                    </ul>
                                                 </div>
                                              </div>
                                           </div>
                                           <div className="pkg-crd-footer">
                                              <div className="pkg-crd-foot-img-text">
                                                 <img src="https://cdn.docprime.com/cp/assets/img/infoerror.svg" style={{ width: 15 }} />
                                                 <p>Home Sample Pickup Not Available</p>
                                              </div>
                                              <div className="pkg-crd-foot-img-text">
                                                 <img src="https://cdn.docprime.com/cp/assets/img/watch-date.svg" style={{ width: 15 }} />
                                                 <p>
                                                 <p style={{ fontSize: 12 }}>8:00 AM - 5:00 PM</p>
                                                 </p>
                                              </div>
                                           </div>
                                        </div>
                                     </div>
                                  </div>
                               </div>
                            </div>
                            <div className="container-fluid">
                               <div className="row">
                                  <div className="col-12">
                                     <div>
                                        <div className="pkg-card-container mb-3">
                                           <div className="pkg-crd-header">
                                            <label className="ck-bx">Add to comapre
                                               <input type="checkbox" onClick={()=>this.setState({checked:!this.state.checked})} checked={this.state.checked} />
                                                 <span className="checkmark"></span>
                                            </label>
                                           </div> 
                                           <div className="pkg-content-section">
                                              <span className="pkg-ofr-ribbon fw-700">50% OFF</span>
                                              <div className="pkg-card-location p-relative">
                                                 <p><img className="fltr-loc-ico" src="/assets/img/new-loc-ico.svg" style={{ width: '12px' , height: '18px' }} /> DLF Phase 4 Gurgaon | 3 Km</p>
                                              </div>
                                              <div className="pkg-card-content">
                                                 <div className="row no-gutters">
                                                    <div className="col-8">
                                                       <div className="pkg-cardleft-img">
                                                          <div><img className="fltr-usr-image-lab" src="https://cdn.docprime.com/media/lab/images/90x60/311bed248054cf976b20f4fde953c845.jpg" /></div>
                                                       </div>
                                                       <a href="thyrocare-aarogyam-17-special-tpp">
                                                          <h2 className="pkg-labDoc-Name">Thyocare Aarogyam B Package
                                                             {/*<span className="lab-doc-span"><img src="https://cdn.docprime.com/cp/assets/img/icons/info.svg" /></span>*/}
                                                          </h2>
                                                       </a>
                                                       <h3 className="lab-fltr-dc-name fw-500 pkg-include">40 Tests Included</h3>
                                                    </div>
                                                    <div className="col-4">
                                                       <div className="pkg-card-price">
                                                          <p className="fw-500">₹ 1340 <span className="pkg-cut-price">₹ 2700</span></p>
                                                       </div>
                                                       <a href="thyrocare-dlf-phase-4-in-sector-27-gurgaon-lpp"><button className="pkg-btn-nw" style={{ width: '100%' }}>Book Now</button></a>
                                                       <p className="pkg-discountCpn">Includes coupon discount</p>
                                                    </div>
                                                 </div>
                                              </div>
                                              <div className="pkg-card-content">
                                                 <div className="test-included">
                                                    <span className="">Includes:</span>
                                                    <ul>
                                                        <li><img src={ASSETS_BASE_URL + "/images/PackageCompare/heart.png"} alt="" /> Heart (23) </li>
                                                    </ul>
                                                 </div>
                                                 <div className="test-included also-included-test">
                                                    <span className="">Also includes:</span>
                                                    <ul>
                                                        <li><img src={ASSETS_BASE_URL + "/images/PackageCompare/kidney.png"} alt="" /> Kidney (12) </li>
                                                        <li><img src={ASSETS_BASE_URL + "/images/PackageCompare/liver.png"} alt="" /> Liver (11) </li>

                                                    </ul>
                                                 </div>
                                              </div>
                                           </div>
                                           <div className="pkg-crd-footer">
                                              <div className="pkg-crd-foot-img-text">
                                                 <img src="https://cdn.docprime.com/cp/assets/img/infoerror.svg" style={{ width: 15 }} />
                                                 <p>Home Sample Pickup Not Available</p>
                                              </div>
                                              <div className="pkg-crd-foot-img-text">
                                                 <img src="https://cdn.docprime.com/cp/assets/img/watch-date.svg" style={{ width: 15 }} />
                                                 <p>
                                                 <p style={{ fontSize: 12 }}>8:00 AM - 5:00 PM</p>
                                                 </p>
                                              </div>
                                           </div>
                                        </div>
                                     </div>
                                  </div>
                               </div>
                            </div>

                           {/*Package card*/}

                            <div className="compare-package-footer">
                               <div className="compare-packages">
                                  <ul>
                                   <li>
                                     <img className="fltr-usr-image-lab" src="https://cdn.docprime.com/media/lab/images/90x60/311bed248054cf976b20f4fde953c845.jpg" />
                                     <br/>
                                     Thyocare Aarogyam B Package
                                   </li>
                                   <li>
                                     <img className="fltr-usr-image-lab" src="https://cdn.docprime.com/media/lab/images/90x60/311bed248054cf976b20f4fde953c845.jpg" />
                                     <br/>
                                     Thyocare Aarogyam B Package
                                   </li>
                                   <li>
                                     <img className="fltr-usr-image-lab" src="https://cdn.docprime.com/media/lab/images/90x60/311bed248054cf976b20f4fde953c845.jpg" />
                                     <br/>
                                     Thyocare Aarogyam B Package
                                   </li>
                                   <li>
                                     <img className="fltr-usr-image-lab" src="https://cdn.docprime.com/media/lab/images/90x60/311bed248054cf976b20f4fde953c845.jpg" />
                                     <br/>
                                     Thyocare Aarogyam B Package
                                   </li>
                                 </ul>
                                <div className="add-more-package">
                                  Add one more package to compare
                                </div>
                                  <a className="add-more-package compare-package-now" href="javascript:void(0);">Compare Now (4)</a>
                               </div>
                            </div>

                            <div className="container-fluid">
                              <div className="tgle-btn">
                                   <label className="switch">
                                      <input type="checkbox"  />
                                      <span className="slider round"></span>
                                    </label>
                                </div>
                            </div>

                        </div>{/*center-column*/}
                        <RightBar colClass="col-lg-4" />
                    </div>
                 </section>
                <Footer />
            </div>
        )
    }
}

export default PackageCompare