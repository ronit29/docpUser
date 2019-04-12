import React from 'react'
import LeftBar from '../../../commons/LeftBar'
import RightBar from '../../../commons/RightBar'
import ProfileHeader from '../../../commons/DesktopProfileHeader'
import Footer from '../../../commons/Home/footer'

const queryString = require('query-string');

  class PackageCompareView extends React.Component {
      
    constructor(){
      super()
        this.state={
          checked:false,
          tabsValue:[],
          viewAll:true,
          isDiffChecked:false,
          isDiffTest:''
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
      if (window) {
          window.scrollTo(0, 0)
      }
      let ids = []
      if(this.props.data.packages){
        this.props.data.packages.map((packages, i) => {
            ids.push('hide_'+ packages.id)
        })
      }

      if (ids.length > 0) {
        window.onscroll = function() {
          let abc
            ids.map((id,i)=>{
              abc = document.getElementById(id)
              if (abc.offsetTop == 45) {
                document.getElementById(id).classList.add("d-none")
              } else {
                document.getElementById(id).classList.remove("d-none")
              }
            })
        }
      }

    }

    bookNow(package_id){
      this.props.setPackageId(package_id, true)

      setTimeout(() => {
        this.props.history.push('/searchpackages')
      }, 100)
    }

    ButtonHandler(field, event) {
      let tabs = [].concat(this.state.tabsValue)
      let self = this
      let found = false
      tabs = tabs.filter((x) => {
          if (x == field) {
              found = true
              return false
          }
          return true
      })
      if (!found) {
          tabs.push(field)
      }

      self.setState({ tabsValue: tabs })
    }

    toggleComparePackages(packageId,labId,pckImg,pckName){
      let packages={}
      packages.id=packageId
      packages.lab_id=labId
      packages.img=pckImg
      packages.name=pckName
      let newUrl = queryString.parse(this.props.location.search)
      let ids= newUrl.package_ids
      ids=ids.split(',')
      ids = ids.filter(x=> parseInt(x) != packageId)
      this.props.togglecompareCriteria(packages)
      this.props.history.push('/package/compare?package_ids='+ids)
      window.location.reload()
    }

    viewAll(){
      let ids =[]
        if(this.state.viewAll){
        this.props.data.category_info.map((catIds,i) =>{
            ids.push(catIds.id)
        })
        }
        this.setState({tabsValue : ids, viewAll:!this.state.viewAll})
    }

    toggleShowDiff(){
      let ids=[]
      let info=[]
      let info_first=''
      let catId = ''
      this.props.data.category_info.map((cat_info, i) => {
        console.log(cat_info.id)
        info = []
        info_first = ''
        cat_info.test_ids.map((test_id, k) => {
            this.props.data.packages.map((pkg_test, n) => {
              info=info.concat(pkg_test.tests_included.filter(x=> x.test_id == test_id))
              info[n].package_id = pkg_test.id
          })                                                               
            info.map((info,k) =>{
              if(k == 0){
                info_first = info.available
                catId = cat_info.id
              }
              // if(info_first === info.available){
              //   ids.push(catId)
              // }
              if(info_first !== info.available){
                ids.push(info.test_id) 
              }
            })
        })
      })
      // console.log('ids')
      // console.log(ids)
      if(this.state.isDiffChecked){
        this.setState({isDiffTest:[],isDiffChecked:!this.state.isDiffChecked})
      }else{
        this.setState({isDiffTest:ids,isDiffChecked:!this.state.isDiffChecked})
      }
      
    }

    addMore(){
      this.props.selectSearchType('lab')
      this.props.history.push('/search?from=header')
    }

    render() {
      let self=this
      let availableTest= []
      let testData= []
      let cat_info_data=[]
      // console.log(this.state.isDiffTest)
     return (
          <div className="profile-body-wrap" style={{ paddingBottom: 54 }}>
              <ProfileHeader />
                <section className="pkgComapre container" style={{marginTop: 44}}>
                  <div className="row main-row parent-section-row">
                    <LeftBar />
                    {/*compare screen*/}
                    <div className="container-fluid pad-all-0">
                      
                      <div className="sticky-multiple-pkgs">
                        <div className="multi-pkg-cmpre">
                          <div className="tgle-btn">
                            <label className="switch">
                              <span className="tgle-btn-txt"> Show Difference</span>
                              <input type="checkbox" checked={this.state.isDiffChecked} onClick={this.toggleShowDiff.bind(this)} />
                              <span className="slider round"></span>
                            </label>
                          </div>
                          {
                            this.props.data.packages && this.props.data.packages.length != 1?
                          <div className="">
                            <a onClick={()=> this.props.history.go(-1)} className="add-more-packages"> + Add More </a>
                          </div>
                          :''}
                        </div>
                        <div className={"multiple-pkgs"+ (this.props.data.packages.length <= 2?' pkbclsTwo':this.props.data.packages.length <= 3?' pkbclsThree':'')}>
                          <ul className="pkgCls pkbcls">  
                          {
                            this.props.data.packages?
                              this.props.data.packages.map((packages, i) => {
                                return <li key={i}>
                                     <img src={ASSETS_BASE_URL + "/images/packageCompare/red-cut.png"} alt="" className="end-div" onClick={this.toggleComparePackages.bind(this,packages.id,'','','')}/>
                                    
                                      <div className="pkg-hd">{packages.name}</div>
                                      <div className="pkg-hd-by">Available in {packages.total_labs_available} Labs</div>
                                      <h3 className="lab-fltr-dc-name fw-500 pkg-include" id={"hide_" + packages.id}>{packages.total_parameters_count} Tests Included</h3>
                                      <div className="pkg-card-price">
                                      <p className="st-form">Starts from <span className="fw-500">₹ {packages.minimum_price}</span></p>
                                      </div>
                                      <p className="pkg-discountCpn">Includes coupon</p>
                                      <a onClick={this.bookNow.bind(this,packages.id)}><button className="pkg-btn-nw">Book Now </button></a>
                                </li>
                              })  
                            :''
                          }
                          {
                            this.props.data.packages && this.props.data.packages.length == 1?
                                <li onClick={this.addMore.bind(this)} style={{paddingTop:30, paddingBottom:30}}>
                                      <div className="addnewpkg"><span className="add-plus">+</span></div>
                                      <p className="addnewpkg-txt">Add one more <br />to compare</p>
                                </li>
                            :''
                          }
                          </ul>
                        </div>
                      </div>
                      <div className="pkg-cmpre-list">
                        <div className="hide-div">
                          <a className="hide-all" onClick={this.viewAll.bind(this)}>{this.state.viewAll?'Hide All':'View All'} <img className={this.state.viewAll?'acrd-arw-rotate' : 'acrd-show'} src={ASSETS_BASE_URL + "/images/down-arrow-o.png"} alt="" /></a>
                        </div>
                        {
                          this.props.data.category_info?
                              this.props.data.category_info.map((cat_info, i) => {
                                return (
                                    <div className={"pkg-card-container mb-3" + (this.state.isDiffChecked && this.state.isDiffTest.indexOf(cat_info.id) == -1?'d-none':'')} key={i} id={'cat_'+cat_info.id}>
                                      <div className="pkg-crd-header light-orng-header">
                                        <span className="text-left">{cat_info.name}</span>
                                        <span className={this.state.tabsValue.indexOf(cat_info.id) > -1 ? 'acrd-arw-rotate span-img' : 'acrd-show span-img'} onClick={this.ButtonHandler.bind(this,cat_info.id)}><img src={ASSETS_BASE_URL + "/images/up-arrow.png"} alt="" /></span>
                                      </div>
                                      <div className={this.state.tabsValue.indexOf(cat_info.id) > -1 ? 'd-none' : ''}>
                                        <div className={"top-head-info multiple-pkgs parent-info category-done" + (this.props.data.packages.length <= 2?' pkbclsTwo':this.props.data.packages.length <= 3?' pkbclsThree':'')}>
                                          <ul className="pkgCls">
                                            {
                                              this.props.data.packages.map((cat_count, j) => {
                                                cat_info_data = cat_count.category_parameter_count.filter(x=> x.id==cat_info.id)
                                                  return(
                                                    <li id={cat_info_data[0].id} key={j}>{cat_info_data[0].count}</li>)
                                            })}
                                          </ul>
                                        </div>
                                        {
                                          cat_info.test_ids.map((test_id, k) => {
                                              testData= self.props.data.test_info.filter(x=> x.id == test_id)
                                               return <div key={k} id= {testData[0].id} className={this.state.isDiffChecked && this.state.isDiffTest.indexOf(testData[0].id) == -1?'d-none':''}>
                                                        <div className="pkg-crd-header light-orng-header grey-head test-done">
                                                          <span>{testData[0].name}</span>
                                                          <span className={this.state.tabsValue.indexOf(testData[0].id) > -1 ? 'acrd-arw-rotate span-img' : 'acrd-show span-img'} onClick={this.ButtonHandler.bind(this,testData[0].id)}><img src={ASSETS_BASE_URL + "/images/up-arrow.png"} alt="" /></span>
                                                        </div>
                                                        <div key={k+1} className={this.state.tabsValue.indexOf(testData[0].id) > -1 ? 'd-none' : ''}> 
                                                          {/*<div className="top-head-info multiple-pkgs ms-info">
                                                            <ul className="pkgCls">
                                                              {    
                                                              self.props.data.packages.map((pkg_test, l) => {
                                                                availableTest=pkg_test.tests_included.filter(x=> x.test_id == test_id)
                                                                return availableTest[0].available?
                                                                        <li key={l}>{testData[0].parameter_count}</li>
                                                                        :<li>rishab</li>
                                                                      
                                                                })
                                                              }
                                                            </ul>
                                                          </div>*/}
                                                              <div className={"top-head-info multiple-pkgs multiple-pkgs-details" + (this.props.data.packages.length <= 2?' pkbclsTwo':this.props.data.packages.length <= 3?' pkbclsThree':'')}>
                                                                <ul className="pkgCls">
                                                                {    
                                                                  self.props.data.packages.map((pkg_test, n) => {
                                                                    availableTest=pkg_test.tests_included.filter(x=> x.test_id == test_id)
                                                                    return availableTest[0].available?
                                                                      <li key={n}>
                                                                        { 
                                                                          testData[0].parameters.length > 0?testData[0].parameters.map((test_param,o) =>{ 
                                                                           return <span key={o}>{test_param}</span> 
                                                                          })
                                                                          : <span>
                                                                          <img src={ASSETS_BASE_URL + "/images/packageCompare/check-01.svg"} style={{width:'14px'}}/>
                                                                          </span>
                                                                        }
                                                                      </li>
                                                                    :<li><span>
                                                                          <img src={ASSETS_BASE_URL + "/images/packageCompare/cross-01.svg"} style={{width:'14px'}}/>
                                                                          </span></li>
                                                                  })
                                                                }
                                                                </ul>
                                                              </div>
                                                        </div> 
                                                </div>
                                          })
                                        }
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