import React from 'react'
import { connect } from 'react-redux';

import LeftBar from '../../components/commons/LeftBar'
import RightBar from '../../components/commons/RightBar'
import ProfileHeader from '../../components/commons/DesktopProfileHeader'
import Footer from '../../components/commons/Home/footer'
import Loader from '../../components/commons/Loader'

const queryString = require('query-string');

import { getCompareList, togglecompareCriteria, setPackageId, selectSearchType, toggleDiagnosisCriteria, clearExtraTests, sendAgentWhatsupPageURL } from '../../actions/index.js'
import { } from '../../helpers/urltoState'
import PackageCompareView from '../../components/diagnosis/searchPackages/packageCompare/packageCompareView.js'

  class packageCompare extends React.Component {
    constructor(props){
      super(props)
        this.state={
          showCompare:false,
          data:null,
          is_category:false
        }
      }
      componentDidMount(){
        if (window) {
            window.scrollTo(0, 0)
        }
        let parsed = queryString.parse(this.props.location.search)
        let resetCompareData=[]
        let data = []
        let package_ids
        let package_url = ''
        let category_ids =  null
        if(parsed.package_ids){
          package_ids = parsed.package_ids.split(',')  
        }
        if(this.props.location.pathname.includes("-hpcp")){
          package_url = this.props.location.pathname.split('/')
          package_url = package_url[1]
        }
        if(parsed.category_ids){
          category_ids = parsed.category_ids
          this.setState({is_category:true})
        }
        let ids = ''
        if(package_ids || package_url || category_ids){
          if(package_ids && package_ids.length > 0 && package_ids !=""){
            Object.entries(package_ids).map(function ([key, pkg]) {
              ids = pkg.split('-')
              data.push({package_id:ids[0], lab_id: ids[1]})
            })
          }
          this.props.getCompareList(data,this.props.selectedLocation,package_url,category_ids,(resp)=>{ // comparision results for selected packages
            if(resp){
              let test = {}
                resp.packages.map((pkg,i) =>{
                  test = {}
                  test.id=pkg.id
                  test.lab_id=pkg.lab.id
                  test.name=pkg.name
                  test.img = pkg.lab.thumbnail
                  resetCompareData.push(test)
                })
              if(!category_ids){
                this.props.togglecompareCriteria(resetCompareData,true)
              }
              this.setState({'showCompare':true,'data':resp})
            }
          })
        }else{
          this.props.history.push('/searchpackages')
        }
      }  
      render() {
        if(this.state.showCompare){
        return ( <PackageCompareView {...this.props} data={this.state.data} showCompare={this.state.showCompare} is_category={this.state.is_category}/>  
          )
        }else{
          return( <div className="profile-body-wrap" style={{ paddingBottom: 54 }}>
                <ProfileHeader showPackageStrip={true}/>
                  <section className="pkgComapre container">
                    <Loader />        
                  </section>
          </div>)
        }
      }
    }
    const mapStateToProps = (state, passedProps) => {

        const {
            compare_packages,
            selectedLocation

        } = state.SEARCH_CRITERIA_LABS

        return {
            compare_packages,
            selectedLocation
        }

    }

    const mapDispatchToProps = (dispatch) => {
        return {
            getCompareList:(selectedIds,selectedLocation,searchByUrl,cat_id,cb) => dispatch(getCompareList(selectedIds,selectedLocation,searchByUrl,cat_id,cb)),
            togglecompareCriteria: (criteria,reset) => dispatch(togglecompareCriteria(criteria,reset)),
            setPackageId: (package_id, isHomePage) => dispatch(setPackageId(package_id, isHomePage)),
            selectSearchType: (type) => dispatch(selectSearchType(type)),
            toggleDiagnosisCriteria: (type, criteria, forceAdd, filter) => dispatch(toggleDiagnosisCriteria(type, criteria, forceAdd, filter)),
            clearExtraTests: () => dispatch(clearExtraTests()),
            sendAgentWhatsupPageURL: (extraParams, cb) => dispatch(sendAgentWhatsupPageURL(extraParams, cb))

        }
    }
export default connect(mapStateToProps, mapDispatchToProps)(packageCompare);