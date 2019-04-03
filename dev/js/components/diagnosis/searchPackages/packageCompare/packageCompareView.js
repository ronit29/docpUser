import React from 'react'
import LeftBar from '../../../commons/LeftBar'
import RightBar from '../../../commons/RightBar'
import ProfileHeader from '../../../commons/DesktopProfileHeader'
import Footer from '../../../commons/Home/footer'
  class PackageCompareView extends React.Component {
    constructor(){
      super()
        this.state={
          checked:false
        }
      }
      componentDidMount(){
        // let pkgCls = document.getElementsByClassName('pkgCls');
        //  if(pkgCls && pkgCls.length){
        //   for(var i=0;i<pkgCls.length;i++){
        //     pkgCls[i].addEventListener('scroll', (e)=>{
        //       let leftScrolledVal = e.target.scrollLeft;
        //         for(var j=0;j<pkgCls.length;j++){
        //           pkgCls[j].scrollLeft = leftScrolledVal
        //         }
        //      });
        //   }
        // }
      }  
render() {

return (

          <div className="profile-body-wrap" style={{ paddingBottom: 54 }}>
            <ProfileHeader />
              <section className="pkgComapre container">
                <div className="row main-row parent-section-row">
                  <LeftBar />
                  {/*compare screen*/}
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
            </section>
            <Footer />
            </div>
          )
      }
    }
  export default PackageCompareView