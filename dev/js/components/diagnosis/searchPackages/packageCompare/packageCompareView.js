import React from 'react'
import LeftBar from '../../../commons/LeftBar'
import RightBar from '../../../commons/RightBar'
import ProfileHeader from '../../../commons/DesktopProfileHeader'
import Footer from '../../../commons/Home/footer'
import GTM from '../../../../helpers/gtm.js'

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
            ids.push('hide_av_'+ packages.id)
            ids.push('hide_strt_'+ packages.id)
            // ids.push('hide_coupon_'+ packages.id)
        })
      }

      if (ids.length > 0) {
          window.onscroll = function() {
            if(document.getElementsByClassName('sticky-multiple-pkgs') && document.getElementsByClassName('sticky-multiple-pkgs')[0]){
              let scrollHeight = document.getElementsByClassName('sticky-multiple-pkgs')[0].offsetTop
              ids.map((id,i)=>{
                if (scrollHeight >0 && window.screen.width < 768) {
                  document.getElementById(id).classList.add("d-none")
                } else {
                  document.getElementById(id).classList.remove("d-none")
                }
              }) 
            }
          }
      }

    }

    bookNow(id, url, test_id, test_name, e){
      this.props.clearExtraTests()
        let testIds = test_id
        let new_test = {}
        new_test.extra_test = true
        new_test.lab_id = id
        new_test.type = 'test'
        new_test.name = test_name
        new_test.id = test_id
        this.props.toggleDiagnosisCriteria('test', new_test, true)
        let data = {
            'Category': 'ConsumerApp', 'Action': 'CompareBookNowClick', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'compare-booknow-click', 'LabId': id , 'testId':test_id
        }
        GTM.sendEvent({ data: data })

        if (e.ctrlKey || e.metaKey) {

        } else {
            e.preventDefault();

            if (url) {
                this.props.history.push(`/${url}`)
            } else {
                this.props.history.push(`/lab/${id}`)
            }
        }
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
      // if(document.getElementById('pkg_'+packageId)){
      //   document.getElementById('pkg_'+packageId).classList.add('d-none')
      // }
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
      let data = {
            'Category': 'ConsumerApp', 'Action': 'ShoWDifferenceClick', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'show-difference-click'
        }
        GTM.sendEvent({ data: data })
      let testIds=[]
      let catIds = []
      let test_info=[]
      let category_info_data = []
      let info_first=''
      let cat_first = []
      let catId = ''
      let testId = ''
      let finalIds = []

      this.props.data.category_info.map((cat_info, i) => {
        test_info = []
        info_first = ''
        let count = 0
        cat_info.test_ids.map((test_id, k) => {
          test_info = []
            this.props.data.packages.map((pkg_test, n) => {
              test_info=test_info.concat(pkg_test.tests_included.filter(x=> x.test_id == test_id))
            })
        })
        test_info.map((info,k) =>{
          if(k==0){
            testId = info.test_id
            info_first = info.available  
          }
          
          if(k !==0 && info_first === info.available){
            count++
          } 
          if(count == (test_info.length - 1)){
            testIds.push(testId)
          }
        })
      })

      this.props.data.category_info.map((cat_info, i) => {
        category_info_data = []
        let count  = 0
        cat_info.test_ids.map((test_id, k) => {
            this.props.data.packages.map((pkg_test, n) => {
              category_info_data = category_info_data.concat(pkg_test.tests_included.filter(x=> x.test_id == test_id))
              category_info_data[n].package_id = pkg_test.id
              category_info_data[n].cat_id = cat_info.id
            })
        })
        category_info_data.map((info,k) =>{
          if(k==0){
            catId = info.cat_id

            info_first = info.available  
          }
          
          if(k !==0 && info_first === info.available){
            count++
          }
          if(count == (category_info_data.length - 1)){
            catIds.push(catId)
          }          
        })
      })

      finalIds = [...catIds, ...testIds]
      console.log(finalIds)
      if(this.state.isDiffChecked){
        this.setState({isDiffTest:[],isDiffChecked:!this.state.isDiffChecked})
      }else{
        this.setState({isDiffTest:finalIds,isDiffChecked:!this.state.isDiffChecked})
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
                            <a onClick={()=> this.props.history.push('/searchpackages')} className="add-more-packages"> + Add More </a>
                          </div>
                          :''}
                        </div>
                        <div className={"multiple-pkgs"+ (this.props.data.packages.length <= 2?' pkbclsTwo':this.props.data.packages.length <= 3?' pkbclsThree':this.props.data.packages.length <= 4?' pkbclsFour':'')}>
                          <ul className="pkgCls pkbcls">  
                          {
                            this.props.data.packages?
                              this.props.data.packages.map((packages, i) => {
                                return <li key={i} id={'pkg_'+packages.id}>
                                     <img src={ASSETS_BASE_URL + "/images/packageCompare/red-cut.png"} alt="" className="end-div" onClick={this.toggleComparePackages.bind(this,packages.id,'','','')}/>
                                    
                                      <div className="pkg-hd">{packages.name}</div>
                                      {/*<div className="pkg-hd-by" id={"hide_av_" + packages.id}>Available in {packages.total_labs_available} Labs</div>*/}
                                      <div className="pkg-hd-by" id={"hide_av_" + packages.id}>{packages.lab.name}</div>
                                      
                                      <h3 className="lab-fltr-dc-name fw-500 pkg-include">{packages.total_parameters_count} Tests Included</h3>
                                      <div className="pkg-card-price">
                                      <p className="fw-500" id={"hide_strt_" + packages.id}>₹ {parseInt(packages.price)}
                                          <span className="pkg-cut-price">₹ {parseInt(packages.mrp)}</span>
                                      </p>
                                      
                                      </div>
                                      {/*<p className="pkg-discountCpn" id={"hide_coupon_"+ packages.id}>Includes coupon</p>*/}
                                      <a onClick={this.bookNow.bind(this,packages.lab.id,'',packages.id,packages.lab.name)}><button className="pkg-btn-nw">Book Now </button></a>
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
                                    <div className={"pkg-card-container mb-3" + (this.state.isDiffChecked && this.state.isDiffTest.indexOf(cat_info.id) != -1 ?' d-none':'')} key={i} id={'cat_'+cat_info.id}>
                                      <div className="pkg-crd-header light-orng-header" onClick={this.ButtonHandler.bind(this,cat_info.id)}>
                                        <span>{cat_info.name}</span>
                                        <span className={this.state.tabsValue.indexOf(cat_info.id) > -1 ? 'acrd-arw-rotate span-img' : 'acrd-show span-img'}><img src={ASSETS_BASE_URL + "/images/up-arrow.png"} alt="" /></span>
                                      </div>
                                      <div className={this.state.tabsValue.indexOf(cat_info.id) > -1 ? 'd-none' : ''}>
                                        <div className={"top-head-info multiple-pkgs parent-info category-done" + (this.props.data.packages.length <= 2?' pkbclsTwo':this.props.data.packages.length <= 3?' pkbclsThree':this.props.data.packages.length <= 4?' pkbclsFour':'')}>
                                          <ul className="pkgCls">
                                            {
                                              this.props.data.packages.map((cat_count, j) => {
                                                cat_info_data = cat_count.category_parameter_count.filter(x=> x.id==cat_info.id)
                                                  return(
                                                    <li id={cat_info_data[0].id} key={j}>{cat_info_data[0].count} Test</li>)
                                            })}
                                          </ul>
                                        </div>
                                        {
                                          cat_info.test_ids.map((test_id, k) => {
                                              testData= self.props.data.test_info.filter(x=> x.id == test_id)
                                               return <div key={k} id= {testData[0].id} className={this.state.isDiffChecked && this.state.isDiffTest.indexOf(testData[0].id) != -1?' d-none':''}>
                                                        <div className="pkg-crd-header light-orng-header grey-head test-done" onClick={this.ButtonHandler.bind(this,testData[0].id)}>
                                                          <span>{testData[0].name}</span>
                                                          {
                                                            testData[0].parameters.length > 0?
                                                          <span className={this.state.tabsValue.indexOf(testData[0].id) > -1 ? 'acrd-arw-rotate span-img' : 'acrd-show span-img'}><img src={ASSETS_BASE_URL + "/images/up-arrow.png"} alt="" /></span>
                                                          :''
                                                          }
                                                        </div>
                                                        <div className={"top-head-info multiple-pkgs multiple-pkgs-details" + (this.props.data.packages.length <= 2?' pkbclsTwo':this.props.data.packages.length <= 3?' pkbclsThree':this.props.data.packages.length <= 4?' pkbclsFour':'')}>
                                                                <ul className="pkgCls testParam new">
                                                                {    
                                                                  self.props.data.packages.map((pkg_test, n) => {
                                                                    availableTest=pkg_test.tests_included.filter(x=> x.test_id == test_id)
                                                                    return availableTest[0].available?
                                                                      <li key={n}> 
                                                                          <span><img src={ASSETS_BASE_URL + "/images/packageCompare/check-01.svg"} style={{width:'14px'}}/>
                                                                          </span>
                                                                      </li>
                                                                    :<li>
                                                                      <span><img src={ASSETS_BASE_URL + "/images/packageCompare/cross-01.svg"} style={{width:'14px'}}/>
                                                                          </span>
                                                                    </li>
                                                                  })
                                                                }
                                                                </ul>
                                                        </div>
                                                        <div key={k+1} className={this.state.tabsValue.indexOf(testData[0].id) > -1 ? '' : 'd-none'}>
                                                              <div className={"top-head-info multiple-pkgs multiple-pkgs-details" + (this.props.data.packages.length <= 2?' pkbclsTwo':this.props.data.packages.length <= 3?' pkbclsThree':this.props.data.packages.length <= 4?' pkbclsFour':'')}>
                                                                <ul className="pkgCls testParam">
                                                                {    
                                                                  self.props.data.packages.map((pkg_test, n) => {
                                                                    availableTest=pkg_test.tests_included.filter(x=> x.test_id == test_id)
                                                                    return availableTest[0].available?
                                                                      <li key={n}>
                                                                        { 
                                                                          testData[0].parameters.length > 0?testData[0].parameters.map((test_param,o) =>{ 
                                                                           return <span key={o}>{test_param}</span> 
                                                                          })
                                                                          : ''
                                                                        }
                                                                      </li>
                                                                    :<li>
                                                                        { 
                                                                          testData[0].parameters.length > 0?testData[0].parameters.map((test_param,o) =>{ 
                                                                           return <span key={o}><img className="x-img" src={ASSETS_BASE_URL + "/images/packageCompare/cross-01.svg"} style={{width:'14px'}}/></span> 
                                                                          })
                                                                          : ''
                                                                        }

                                                                    </li>
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