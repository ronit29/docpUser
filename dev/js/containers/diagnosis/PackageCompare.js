import React from 'react'
import { connect } from 'react-redux';

import LeftBar from '../../components/commons/LeftBar'
import RightBar from '../../components/commons/RightBar'
import ProfileHeader from '../../components/commons/DesktopProfileHeader'
import Footer from '../../components/commons/Home/footer'
import Loader from '../../components/commons/Loader'
const queryString = require('query-string');

import { getCompareList, togglecompareCriteria, setPackageId, selectSearchType, toggleDiagnosisCriteria, clearExtraTests } from '../../actions/index.js'
import { } from '../../helpers/urltoState'
import PackageCompareView from '../../components/diagnosis/searchPackages/packageCompare/packageCompareView.js'

  class packageCompare extends React.Component {
    constructor(props){
      super(props)
        this.state={
          showCompare:false,
          data:''
        }
      }
      componentDidMount(){
        if (window) {
            window.scrollTo(0, 0)
        }
        let parsed = queryString.parse(this.props.location.search)
        let resetCompareData=[]
        let data = []
        let package_ids = parsed.package_ids.split(',')
        let ids = ''
        if(package_ids.length > 0){
          Object.entries(package_ids).map(function ([key, pkg]) {
            ids = pkg.split('-')
            data.push({package_id:ids[0], lab_id: ids[1]})
          })
        }
        this.props.getCompareList(data,(resp)=>{
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
            this.props.togglecompareCriteria(resetCompareData,true)
            this.setState({'showCompare':true,'data':resp})
          }
        })
      }  
      render() {
          if(this.state.showCompare){
            return (
              <PackageCompareView {...this.props} data={this.state.data}/>
                  )
          }else{
            return(
            <div className="profile-body-wrap" style={{ paddingBottom: 54 }}>
                <ProfileHeader />
                  <section className="pkgComapre container">
                    <Loader />        
                  </section>
                <Footer />
            </div>
            )
          }  
      }
    }
    const mapStateToProps = (state, passedProps) => {

        const {
            compare_packages

        } = state.SEARCH_CRITERIA_LABS

        return {
            compare_packages
        }

    }

    const mapDispatchToProps = (dispatch) => {
        return {
            getCompareList:(selectedIds,cb) => dispatch(getCompareList(selectedIds,cb)),
            togglecompareCriteria: (criteria,reset) => dispatch(togglecompareCriteria(criteria,reset)),
            setPackageId: (package_id, isHomePage) => dispatch(setPackageId(package_id, isHomePage)),
            selectSearchType: (type) => dispatch(selectSearchType(type)),
            toggleDiagnosisCriteria: (type, criteria, forceAdd, filter) => dispatch(toggleDiagnosisCriteria(type, criteria, forceAdd, filter)),
            clearExtraTests: () => dispatch(clearExtraTests()),
        }
    }
export default connect(mapStateToProps, mapDispatchToProps)(packageCompare);