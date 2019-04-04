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

      bookNow(package_id){
        console.log(package_id)
      }

      render() {
        let self=this
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
                            {
                              this.props.data.packages?
                                this.props.data.packages.map((packages, i) => {
                                  return <li key={i}>
                                       <img src={ASSETS_BASE_URL + "/images/packageCompare/grey-cross.png"} alt="" className="end-div" />
                                      
                                        <div className="pkg-hd">{packages.name}</div>
                                        <div className="pkg-hd-by">Available in {packages.total_labs_available} Labs</div>
                                        <h3 className="lab-fltr-dc-name fw-500 pkg-include">{packages.total_parameters_count} Tests Included</h3>
                                        <div className="pkg-card-price">
                                        <p className="st-form">Start from <span className="fw-500">₹ {packages.minimum_price}</span></p>
                                        </div>
                                        <p className="pkg-discountCpn">Includes coupon</p>
                                        <a onClick={this.bookNow.bind(this,packages.id)}><button className="pkg-btn-nw">Book Now </button></a>
                                  </li>
                                })  
                              :''
                            }
                            </ul>
                          </div>
                        </div>
                        <div className="pkg-cmpre-list">
                          <div className="hide-div">
                            <a href="javascript:void(0);" className="hide-all">View All <img src={ASSETS_BASE_URL + "/images/down-arrow-o.png"} alt="" /></a>
                          </div>
                          {
                            this.props.data.category_info?
                                this.props.data.category_info.map((cat_info, i) => {
                                  return (
                                      <div className="pkg-card-container mb-3" key={i}>
                                        <div className="pkg-crd-header light-orng-header">
                                          <span className="text-left">{cat_info.name}</span>
                                          <span className="span-img"><img src={ASSETS_BASE_URL + "/images/up-arrow.png"} alt="" /></span>
                                        </div>
                                        <div>
                                          <div className="top-head-info multiple-pkgs parent-info category-done">
                                            <ul className="pkgCls">
                                              {
                                                this.props.data.packages.map((cat_count, j) => {
                                                    return(
                                                      <li key={j}>{cat_count.category_parameter_count[i].count}</li>)
                                              })}
                                            </ul>
                                          </div>
                                          {
                                            cat_info.test_ids.map((test_id, k) => {
                                                 console.log(test_id) 
                                                 self.props.data.packages.map((pkg_test, j) => {
                                                 console.log(pkg_test.tests_included.filter(x=> x.available))
                                                 })  
                                            })
                                          }
                                          <div className="pkg-crd-header light-orng-header grey-head test-done">
                                                  <span>LIPID</span>
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
                                    )
                                })
                          :''}
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