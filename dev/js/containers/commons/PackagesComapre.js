import React from 'react'
import LeftBar from '../../components/commons/LeftBar'
import RightBar from '../../components/commons/RightBar'
import ProfileHeader from '../../components/commons/DesktopProfileHeader'
import Footer from '../../components/commons/Home/footer'
  class packageCompare extends React.Component {
    constructor(){
      super()
        this.state={
          checked:false
        }
      }
      componentDidMount(){
        let pkgCls = document.getElementsByClassName('pkgCls');
         if(pkgCls && pkgCls.length){
          for(var i=0;i<pkgCls.length;i++){
            pkgCls[i].addEventListener('scroll', (e)=>{
              let leftScrolledVal = e.target.scrollLeft;
                for(var j=0;j<pkgCls.length;j++){
                  pkgCls[j].scrollLeft = leftScrolledVal
                }
             });
          }
        }
      }  
render() {

return (

          <div className="profile-body-wrap" style={{ paddingBottom: 54 }}>
            <ProfileHeader />
              <section className="pkgComapre container">
                <div className="row main-row parent-section-row">
                  <LeftBar />
                  <div className="col-12 center-column">
                    <div className="filter-row sticky-header mbl-stick">
                      <section className="scroll-shadow-bar">
                        <div className="top-filter-tab-container">
                          <div className="top-filter-tabs-select"><img src={ASSETS_BASE_URL + "/images/packageCompare/comapre.png"} alt="" /> Category </div>
                          <div className="top-filter-tabs-select"><img className="sort-filter" src={ASSETS_BASE_URL + "/images/packageCompare/filtersort.png"} alt="" /><span>Sort / Filter</span> </div>
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
                            <div className={this.state.checked ? 'pkg-crd-header pkg-crd-green pkg-hd':'pkg-crd-header pkg-hd'}>
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
                                    <p className="pkg-discountCpn">Includes coupon</p>
                                  </div>
                                </div>
                              </div>
                              <div className="pkg-card-content">
                                <div className="test-included">
                                  <span className="">Includes:</span>
                                  <ul>
                                    <li><img src={ASSETS_BASE_URL + "/images/packageCompare/heart.png"} alt="" /> Heart (23) </li>
                                  </ul>
                                </div>
                                <div className="test-included also-included-test">
                                  <span className="">Also includes:</span>
                                  <ul>
                                    <li><img src={ASSETS_BASE_URL + "/images/packageCompare/kidney.png"} alt="" /> Kidney (12) </li>
                                    <li><img src={ASSETS_BASE_URL + "/images/packageCompare/liver.png"} alt="" /> Liver (11) </li>
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
                                <div>
                                  <p style={{ fontSize: 12 }}>8:00 AM - 5:00 PM</p>
                                </div>
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
                            <div className="pkg-crd-header pkg-hd">
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
                                    <li><img src={ASSETS_BASE_URL + "/images/packageCompare/heart.png"} alt="" /> Heart (23) </li>
                                  </ul>
                                </div>
                                <div className="test-included also-included-test">
                                  <span className="">Also includes:</span>
                                  <ul>
                                    <li><img src={ASSETS_BASE_URL + "/images/packageCompare/kidney.png"} alt="" /> Kidney (12) </li>
                                    <li><img src={ASSETS_BASE_URL + "/images/packageCompare/liver.png"} alt="" /> Liver (11) </li>
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
                                <div>
                                  <p style={{ fontSize: 12 }}>8:00 AM - 5:00 PM
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/*Package card*/}
                  {/* <div className="compare-package-footer">
                    <div className="compare-packages">
                      <ul>
                        <li>
                          <img src={ASSETS_BASE_URL + "/images/packageCompare/red-cut.png"} alt="" className="end-div" />  
                          <img className="fltr-usr-image-lab" src="https://cdn.docprime.com/media/lab/images/90x60/311bed248054cf976b20f4fde953c845.jpg" />
                          <br/>
                          Thyocare Aarogyam B Package
                        </li>
                        <li>
                          <img src={ASSETS_BASE_URL + "/images/packageCompare/red-cut.png"} alt="" className="end-div" />
                          <img className="fltr-usr-image-lab" src="https://cdn.docprime.com/media/lab/images/90x60/311bed248054cf976b20f4fde953c845.jpg" />
                          <br/>
                          Thyocare Aarogyam B Package
                        </li>
                        <li>
                          <img src={ASSETS_BASE_URL + "/images/packageCompare/red-cut.png"} alt="" className="end-div" />
                          <img className="fltr-usr-image-lab" src="https://cdn.docprime.com/media/lab/images/90x60/311bed248054cf976b20f4fde953c845.jpg" />
                          <br/>
                          Thyocare Aarogyam B Package
                        </li>
                        <li>
                          <img src={ASSETS_BASE_URL + "/images/packageCompare/red-cut.png"} alt="" className="end-div" />
                          <img className="fltr-usr-image-lab" src="https://cdn.docprime.com/media/lab/images/90x60/311bed248054cf976b20f4fde953c845.jpg" />
                          <br/>
                          Thyocare Aarogyam B Package
                        </li>
                        <li>
                          <img src={ASSETS_BASE_URL + "/images/packageCompare/red-cut.png"} alt="" className="end-div" />
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
                  </div> */}
                  {/*compare screen*/}
                  <div className="compare-package-footer">
                    <ul className="compare-packages-home">
                      <li className="hlth-txt">2 Health Package Selected</li>
                      <li className="li-btn-compare">
                        <a href="javascript:void(0);" className="pkg-btn-nw">Compare</a>
                        <span className=""><img src="https://cdn.docprime.com/cp/assets/img/icons/close.png" alt="" /></span>
                      </li>
                    </ul>
                  </div>
                  <div className="container-fluid pad-all-0">
                    
                    <div className="sticky-multiple-pkgs">
                      <div className="multi-pkg-cmpre">
                        <div className="tgle-btn">
                          <label className="switch">
                            <span className="tgle-btn-txt"> Show Difference</span>
                            <input type="checkbox"  />
                            <span className="slider round"></span>
                          </label>
                        </div>
                        <div className="">
                          <a href="javascript:void(0);" className="add-more-packages"> + Add More </a>
                        </div>
                      </div>
                      <div className="multiple-pkgs">
                        <ul className="pkgCls pkmkb">
                          <li>
                          <img src={ASSETS_BASE_URL + "/images/packageCompare/grey-cross.png"} alt="" className="end-div" />
                          
                            <div className="pkg-hd">Aarogyam B</div>
                            <div className="pkg-hd-by">Available in 5 Labs</div>
                            <h3 className="lab-fltr-dc-name fw-500 pkg-include">40 Tests Included</h3>
                            <div className="pkg-card-price">
                            <p className="st-form">Start from <span className="fw-500">₹ 1340</span></p>
                            </div>
                            <p className="pkg-discountCpn">Includes coupon</p>
                            <a href="javascript:void(0);"><button className="pkg-btn-nw">Book Now </button></a>
                          </li>
                          <li>
                          <img src={ASSETS_BASE_URL + "/images/packageCompare/grey-cross.png"} alt="" className="end-div" />
                            
                            <div className="pkg-hd">Aarogyam B</div>
                            <div className="pkg-hd-by">Available in 5 Labs</div>
                            <h3 className="lab-fltr-dc-name fw-500 pkg-include">40 Tests Included</h3>
                            <div className="pkg-card-price">
                            <p className="st-form">Start from <span className="fw-500">₹ 1340</span></p>
                            </div>
                            <p className="pkg-discountCpn">Includes coupon</p>
                            <a href="javascript:void(0);"><button className="pkg-btn-nw">Book Now </button></a>
                          </li>
                          <li>
                          <img src={ASSETS_BASE_URL + "/images/packageCompare/grey-cross.png"} alt="" className="end-div" />
                            
                            <div className="pkg-hd">Aarogyam B</div>
                            <div className="pkg-hd-by">Available in 5 Labs</div>
                            <h3 className="lab-fltr-dc-name fw-500 pkg-include">40 Tests Included</h3>
                            <div className="pkg-card-price">
                            <p className="st-form">Start from <span className="fw-500">₹ 1340</span></p>
                            </div>
                            <p className="pkg-discountCpn">Includes coupon</p>
                            <a href="javascript:void(0);"><button className="pkg-btn-nw">Book Now </button></a>
                          </li>
                          <li>
                          <img src={ASSETS_BASE_URL + "/images/packageCompare/grey-cross.png"} alt="" className="end-div" />
                            
                            <div className="pkg-hd">Aarogyam B</div>
                            <div className="pkg-hd-by">Available in 5 Labs</div>
                            <h3 className="lab-fltr-dc-name fw-500 pkg-include">40 Tests Included</h3>
                            <div className="pkg-card-price">
                            <p className="st-form">Start from <span className="fw-500">₹ 1340</span></p>
                            </div>
                            <p className="pkg-discountCpn">Includes coupon</p>
                            <a href="javascript:void(0);"><button className="pkg-btn-nw">Book Now </button></a>
                          </li>
                          <li>
                          <img src={ASSETS_BASE_URL + "/images/packageCompare/grey-cross.png"} alt="" className="end-div" />
                            
                            <div className="pkg-hd">Aarogyam B</div>
                            <div className="pkg-hd-by">Available in 5 Labs</div>
                            <h3 className="lab-fltr-dc-name fw-500 pkg-include">40 Tests Included</h3>
                            <div className="pkg-card-price">
                            <p className="st-form">Start from <span className="fw-500">₹ 1340</span></p>
                            </div>
                            <p className="pkg-discountCpn">Includes coupon</p>
                            <a href="javascript:void(0);"><button className="pkg-btn-nw">Book Now </button></a>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="pkg-cmpre-list">
                      <div className="hide-div">
                        <a href="javascript:void(0);" className="hide-all">View All <img src={ASSETS_BASE_URL + "/images/down-arrow-o.png"} alt="" /></a>
                      </div>
                      <div className="pkg-card-container mb-3">
                        <div className="pkg-crd-header light-orng-header">
                          <span className="text-left">Heart</span>
                          <span className="span-img"><img src={ASSETS_BASE_URL + "/images/up-arrow.png"} alt="" /></span>
                        </div>
                        <div>
                          <div className="top-head-info multiple-pkgs parent-info">
                            <ul className="pkgCls">
                              <li>2</li>
                              <li>3</li>
                              <li>4</li>
                              <li>5</li>
                              <li>5</li>
                            </ul>
                          </div>
                          <div className="pkg-crd-header light-orng-header grey-head">
                            <span>Lipid Profile</span>
                            <span className="span-img"><img src={ASSETS_BASE_URL + "/images/up-arrow.png"} alt="" /></span>
                          </div>
                          <div className="top-head-info multiple-pkgs ms-info">
                            <ul className="pkgCls">
                              <li>2</li>
                              <li>3</li>
                              <li>4</li>
                              <li>5</li>
                              <li>5</li>
                            </ul>
                          </div>
                          <div className="top-head-info multiple-pkgs multiple-pkgs-details">
                            <ul className="pkgCls">
                              <li>
                                <span>LDL Cholestrol</span>
                                <span>Total Cholesterol</span>
                                <span>HDL Cholestrol</span>
                                <span>Triglycerides</span>
                                <span>VLDL Cholesterol</span>
                                <span>LDL/HdL Ratio</span>
                                <span>TC/HDL Cholesterol Ratio</span>
                              </li>
                              <li>
                                <span>LDL Cholestrol</span>
                                <span>Total Cholesterol</span>
                                <span><img src={ASSETS_BASE_URL + "/images/packageCompare/x.png"} alt="" className="x-img" /></span>
                                <span>Triglycerides</span>
                                <span>VLDL Cholesterol</span>
                                <span>LDL/HdL Ratio</span>
                                <span>TC/HDL Cholesterol Ratio</span>
                              </li>
                              <li>
                                <span>LDL Cholestrol</span>
                                <span>Total Cholesterol</span>
                                <span>HDL Cholestrol</span>
                                <span>Triglycerides</span>
                                <span>VLDL Cholesterol</span>
                                <span>LDL/HdL Ratio</span>
                                <span>TC/HDL Cholesterol Ratio</span>
                              </li>
                              <li>
                                <span>LDL Cholestrol</span>
                                <span>Total Cholesterol</span>
                                <span>HDL Cholestrol</span>
                                <span>Triglycerides</span>
                                <span>VLDL Cholesterol</span>
                                <span>LDL/HdL Ratio</span>
                                <span>TC/HDL Cholesterol Ratio</span>
                              </li>
                              <li>
                                <span>LDL Cholestrol</span>
                                <span>Total Cholesterol</span>
                                <span>HDL Cholestrol</span>
                                <span>Triglycerides</span>
                                <span>VLDL Cholesterol</span>
                                <span>LDL/HdL Ratio</span>
                                <span>TC/HDL Cholesterol Ratio</span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className="pkg-card-container mb-3">
                        <div className="pkg-crd-header light-orng-header">
                          <span className="text-left">Thyroid</span>
                          <span className="span-img"><img src={ASSETS_BASE_URL + "/images/up-arrow.png"} alt="" /></span>
                        </div>
                        <div>
                          <div className="top-head-info multiple-pkgs parent-info">
                            <ul className="pkgCls">
                              <li>2</li>
                              <li>3</li>
                              <li>4</li>
                              <li>5</li>
                              <li>5</li>
                            </ul>
                          </div>
                          <div className="pkg-crd-header light-orng-header grey-head">
                            <span>Thyroid Panel 1, Total</span>
                            <span className="span-img"><img src={ASSETS_BASE_URL + "/images/up-arrow.png"} alt="" /></span>
                          </div>
                          <div className="top-head-info multiple-pkgs ms-info">
                            <ul className="pkgCls">
                              <li>2</li>
                              <li>3</li>
                              <li>4</li>
                              <li>5</li>
                              <li>5</li>
                            </ul>
                          </div>
                          <div className="top-head-info multiple-pkgs multiple-pkgs-details">
                            <ul className="pkgCls">
                              <li>
                                <span>TriIodothyronine (T3)</span>
                                <span>Thyroxine - T4 Total</span>
                                <span>TSH - Thyroid Stimulating Hormone</span>
                              </li>
                              <li>
                                <span>TriIodothyronine (T3)</span>
                                <span><img src={ASSETS_BASE_URL + "/images/packageCompare/x.png"} alt="" className="x-img xm-img" /></span>
                                <span>TSH - Thyroid Stimulating Hormone</span>
                              </li>
                              <li>
                                <span>TriIodothyronine (T3)</span>
                                <span>Thyroxine - T4 Total</span>
                                <span>TSH - Thyroid Stimulating Hormone</span>
                              </li>
                              <li>
                                <span>TriIodothyronine (T3)</span>
                                <span>Thyroxine - T4 Total</span>
                                <span>TSH - Thyroid Stimulating Hormone</span>
                              </li>
                              <li>
                                <span>TriIodothyronine (T3)</span>
                                <span>Thyroxine - T4 Total</span>
                                <span>TSH - Thyroid Stimulating Hormone</span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className="pkg-card-container mb-3">
                        <div className="pkg-crd-header light-orng-header">
                          <span className="text-left">Vitamin</span>
                          <span className="span-img"><img src={ASSETS_BASE_URL + "/images/up-arrow.png"} alt="" /></span>
                        </div>
                        <div>
                          <div className="top-head-info multiple-pkgs parent-info">
                            <ul className="pkgCls">
                              <li>2</li>
                              <li><img src={ASSETS_BASE_URL + "/images/packageCompare/x.png"} alt="" className="x-img" /></li>
                              <li><img src={ASSETS_BASE_URL + "/images/packageCompare/x.png"} alt="" className="x-img" /></li>
                              <li>5</li>
                              <li>5</li>
                            </ul>
                          </div>
                          <div className="pkg-crd-header light-orng-header grey-head">
                            <span>Vitamin D Total-25 Hydroxy</span>
                            <span className="span-img"><img src={ASSETS_BASE_URL + "/images/up-arrow.png"} alt="" /></span>
                          </div>
                          <div className="top-head-info multiple-pkgs ms-info">
                            <ul className="pkgCls">
                              <li>2</li>
                              <li>0</li>
                              <li>0</li>
                              <li>5</li>
                              <li>5</li>
                            </ul>
                          </div>
                          <div className="top-head-info multiple-pkgs multiple-pkgs-details">
                            <ul className="pkgCls">
                              <li>
                                <span>Yes</span>
                              </li>
                              <li>
                                <span><img src={ASSETS_BASE_URL + "/images/packageCompare/x.png"} alt="" className="x-img" /></span>
                              </li>
                              <li>
                                <span><img src={ASSETS_BASE_URL + "/images/packageCompare/x.png"} alt="" className="x-img" /></span>
                              </li>
                              <li>
                                 <span><img src={ASSETS_BASE_URL + "/images/packageCompare/x.png"} alt="" className="x-img" /></span>
                              </li>
                              <li>
                                 <span><img src={ASSETS_BASE_URL + "/images/packageCompare/x.png"} alt="" className="x-img" /></span>
                              </li>
                            </ul>
                          </div>
                          <div className="pkg-crd-header light-orng-header grey-head">
                            <span>Vitamin B12, active Holo Transcobalamin</span>
                            <span className="span-img"><img src={ASSETS_BASE_URL + "/images/up-arrow.png"} alt="" /></span>
                          </div>
                          <div className="top-head-info multiple-pkgs ms-info">
                            <ul className="pkgCls">
                              <li>2</li>
                              <li>0</li>
                              <li>0</li>
                              <li>5</li>
                              <li>5</li>
                            </ul>
                          </div>
                          <div className="top-head-info multiple-pkgs multiple-pkgs-details">
                            <ul className="pkgCls">
                              <li>
                                <span>Yes</span>
                              </li>
                              <li>
                                <span><img src={ASSETS_BASE_URL + "/images/packageCompare/x.png"} alt="" className="x-img" /></span>
                              </li>
                              <li>
                                <span><img src={ASSETS_BASE_URL + "/images/packageCompare/x.png"} alt="" className="x-img" /></span>
                              </li>
                              <li>
                                 <span><img src={ASSETS_BASE_URL + "/images/packageCompare/x.png"} alt="" className="x-img" /></span>
                              </li>
                              <li>
                                 <span><img src={ASSETS_BASE_URL + "/images/packageCompare/x.png"} alt="" className="x-img" /></span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className="pkg-card-container mb-3">
                        <div className="pkg-crd-header light-orng-header">
                          <span className="text-left">Kidney</span>
                          <span className="span-img"><img src={ASSETS_BASE_URL + "/images/up-arrow.png"} alt="" /></span>
                        </div>
                        <div>
                          <div className="top-head-info multiple-pkgs parent-info">
                            <ul className="pkgCls">
                              <li>2</li>
                              <li>3</li>
                              <li>4</li>
                              <li>5</li>
                              <li>5</li>
                            </ul>
                          </div>
                          <div className="pkg-crd-header light-orng-header grey-head">
                            <span>Kidney Function Test</span>
                            <span className="span-img"><img src={ASSETS_BASE_URL + "/images/up-arrow.png"} alt="" /></span>
                          </div>
                          <div className="top-head-info multiple-pkgs ms-info">
                            <ul className="pkgCls">
                              <li>2</li>
                              <li>3</li>
                              <li>4</li>
                              <li>5</li>
                              <li>5</li>
                            </ul>
                          </div>
                          <div className="top-head-info multiple-pkgs multiple-pkgs-details">
                            <ul className="pkgCls">
                              <li>
                                <span>Blood Urea Nitrogen (BUN)</span>
                                <span>Uric Acid</span>
                                <span>Creatinine</span>
                                <span className="last-span">BUN / Creatinine Ratio<span className="span-img"><img src={ASSETS_BASE_URL + "/images/up-arrow.png"} alt="" /></span></span>
                                <div className="sub-dropDown">
                                  <ul className="ul-mrg"> 
                                    <li>Creatinine</li>
                                    <li>Uric Acid (UA)</li>
                                    <li>Blood Urea Nitrogen (BUN)</li>
                                    <li>BUN/ Serum Creatinine Ratio</li>
                                    <li>Calcium</li>
                                  </ul>
                                </div>
                              </li>
                              <li>
                                <span>Blood Urea Nitrogen (BUN)</span>
                                <span><img src={ASSETS_BASE_URL + "/images/packageCompare/x.png"} alt="" className="x-img" /></span>
                                <span>Creatinine</span>
                                <span className="last-span">BUN / Creatinine Ratio<span className="span-img"><img src={ASSETS_BASE_URL + "/images/up-arrow.png"} alt="" /></span></span>
                                <div className="sub-dropDown">
                                  <ul>
                                    <li>Creatinine</li>
                                    <li>Uric Acid (UA)</li>
                                    <li>Blood Urea Nitrogen (BUN)</li>
                                    <li>BUN/ Serum Creatinine Ratio</li>
                                    <li>Calcium</li>
                                  </ul>
                                </div>
                              </li>
                              <li>
                                <span>Blood Urea Nitrogen (BUN)</span>
                                <span>Uric Acid</span>
                                <span>Creatinine</span>
                                <span className="last-span">BUN / Creatinine Ratio<span className="span-img"><img src={ASSETS_BASE_URL + "/images/up-arrow.png"} alt="" /></span></span>
                                <div className="sub-dropDown">
                                  <ul>
                                    <li>Creatinine</li>
                                    <li>Uric Acid (UA)</li>
                                    <li>Blood Urea Nitrogen (BUN)</li>
                                    <li>BUN/ Serum Creatinine Ratio</li>
                                    <li>Calcium</li>
                                  </ul>
                                </div>
                              </li>
                              <li>
                                <span>Blood Urea Nitrogen (BUN)</span>
                                <span>Uric Acid</span>
                                <span>Creatinine</span>
                                <span className="last-span">BUN / Creatinine Ratio<span className="span-img"><img src={ASSETS_BASE_URL + "/images/up-arrow.png"} alt="" /></span></span>
                                <div className="sub-dropDown">
                                  <ul>
                                    <li>Creatinine</li>
                                    <li>Uric Acid (UA)</li>
                                    <li>Blood Urea Nitrogen (BUN)</li>
                                    <li>BUN/ Serum Creatinine Ratio</li>
                                    <li>Calcium</li>
                                  </ul>
                                </div>
                              </li>
                              <li>
                                <span>Blood Urea Nitrogen (BUN)</span>
                                <span>Uric Acid</span>
                                <span>Creatinine</span>
                                <span className="last-span">BUN / Creatinine Ratio<span className="span-img"><img src={ASSETS_BASE_URL + "/images/up-arrow.png"} alt="" /></span></span>
                                <div className="sub-dropDown">
                                  <ul>
                                    <li>Creatinine</li>
                                    <li>Uric Acid (UA)</li>
                                    <li>Blood Urea Nitrogen (BUN)</li>
                                    <li>BUN/ Serum Creatinine Ratio</li>
                                    <li>Calcium</li>
                                  </ul>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className="pkg-crd-header light-orng-header grey-head">
                            <span>Pancreatic (Acute) Profile</span>
                            <span className="span-img"><img src={ASSETS_BASE_URL + "/images/up-arrow.png"} alt="" /></span>
                          </div>
                          <div className="top-head-info multiple-pkgs ms-info">
                            <ul className="pkgCls">
                              <li>2</li>
                              <li>0</li>
                              <li>0</li>
                              <li>5</li>
                              <li>5</li>
                            </ul>
                          </div>
                          <div className="top-head-info multiple-pkgs multiple-pkgs-details">
                            <ul className="pkgCls">
                              <li>
                                <span>Amylase</span>
                                <span>LIipase</span>
                              </li>
                              <li>
                                <span><img src={ASSETS_BASE_URL + "/images/packageCompare/x.png"} alt="" className="x-img" /></span>
                                <span><img src={ASSETS_BASE_URL + "/images/packageCompare/x.png"} alt="" className="x-img" /></span>
                              </li>
                              <li>
                                <span><img src={ASSETS_BASE_URL + "/images/packageCompare/x.png"} alt="" className="x-img" /></span>
                                <span><img src={ASSETS_BASE_URL + "/images/packageCompare/x.png"} alt="" className="x-img" /></span>
                              </li>
                              <li>
                                 <span><img src={ASSETS_BASE_URL + "/images/packageCompare/x.png"} alt="" className="x-img" /></span>
                                 <span><img src={ASSETS_BASE_URL + "/images/packageCompare/x.png"} alt="" className="x-img" /></span>
                              </li>
                              <li>
                                 <span><img src={ASSETS_BASE_URL + "/images/packageCompare/x.png"} alt="" className="x-img" /></span>
                                 <span><img src={ASSETS_BASE_URL + "/images/packageCompare/x.png"} alt="" className="x-img" /></span>
                              </li>
                            </ul>
                          </div>
                          
                      </div>
                      <div className="pkg-card-container mb-3">
                        <div className="pkg-crd-header light-orng-header">
                          <span className="text-left">Hemoglobin</span>
                          <span className="span-img"><img src={ASSETS_BASE_URL + "/images/up-arrow.png"} alt="" /></span>
                        </div>
                        <div>
                          <div className="top-head-info multiple-pkgs parent-info">
                            <ul className="pkgCls">
                              <li>2</li>
                              <li>0</li>
                              <li>0</li>
                              <li>5</li>
                              <li>5</li>
                            </ul>
                          </div>
                          <div className="pkg-crd-header light-orng-header grey-head">
                            <span>Electrolytes</span>
                            <span className="span-img"><img src={ASSETS_BASE_URL + "/images/up-arrow.png"} alt="" /></span>
                          </div>
                          <div className="top-head-info multiple-pkgs ms-info">
                            <ul className="pkgCls">
                              <li>2</li>
                              <li>0</li>
                              <li>0</li>
                              <li>5</li>
                              <li>5</li>
                            </ul>
                          </div>
                          <div className="top-head-info multiple-pkgs multiple-pkgs-details">
                            <ul className="pkgCls">
                              <li>
                                <span>Sodium</span>
                                <span>Chloride</span>
                              </li>
                              <li>
                                <span><img src={ASSETS_BASE_URL + "/images/packageCompare/x.png"} alt="" className="x-img" /></span>
                                <span><img src={ASSETS_BASE_URL + "/images/packageCompare/x.png"} alt="" className="x-img" /></span>
                              </li>
                              <li>
                                <span><img src={ASSETS_BASE_URL + "/images/packageCompare/x.png"} alt="" className="x-img" /></span>
                                <span><img src={ASSETS_BASE_URL + "/images/packageCompare/x.png"} alt="" className="x-img" /></span>
                              </li>
                              <li>
                                 <span><img src={ASSETS_BASE_URL + "/images/packageCompare/x.png"} alt="" className="x-img" /></span>
                                 <span><img src={ASSETS_BASE_URL + "/images/packageCompare/x.png"} alt="" className="x-img" /></span>
                              </li>
                              <li>
                                 <span><img src={ASSETS_BASE_URL + "/images/packageCompare/x.png"} alt="" className="x-img" /></span>
                                 <span><img src={ASSETS_BASE_URL + "/images/packageCompare/x.png"} alt="" className="x-img" /></span>
                              </li>
                            </ul>
                          </div>
                          <div className="pkg-crd-header light-orng-header grey-head">
                            <span>Testosterone Total</span>
                            <span className="span-img"><img src={ASSETS_BASE_URL + "/images/up-arrow.png"} alt="" /></span>
                          </div>
                          <div className="top-head-info multiple-pkgs ms-info">
                            <ul className="pkgCls">
                              <li>2</li>
                              <li>0</li>
                              <li>0</li>
                              <li>5</li>
                              <li>5</li>
                            </ul>
                          </div>
                          <div className="top-head-info multiple-pkgs multiple-pkgs-details">
                            <ul className="pkgCls">
                              <li>
                                <span>Yes</span>
                              </li>
                              <li>
                                <span><img src={ASSETS_BASE_URL + "/images/packageCompare/x.png"} alt="" className="x-img" /></span>
                              </li>
                              <li>
                                <span><img src={ASSETS_BASE_URL + "/images/packageCompare/x.png"} alt="" className="x-img" /></span>
                              </li>
                              <li>
                                 <span><img src={ASSETS_BASE_URL + "/images/packageCompare/x.png"} alt="" className="x-img" /></span>
                              </li>
                              <li>
                                 <span><img src={ASSETS_BASE_URL + "/images/packageCompare/x.png"} alt="" className="x-img" /></span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/*center-column*/}
                {/* <RightBar colClass="col-lg-4" /> */}
              </div>
            </section>
            <Footer />
            </div>
          )
      }
    }
  export default packageCompare