import React from 'react'
import { connect } from 'react-redux';

import LeftBar from '../../components/commons/LeftBar'
import RightBar from '../../components/commons/RightBar'
import ProfileHeader from '../../components/commons/DesktopProfileHeader'
import Footer from '../../components/commons/Home/footer'
import Loader from '../../components/commons/Loader'
const queryString = require('query-string');

import { getCompareList, togglecompareCriteria, setPackageId } from '../../actions/index.js'
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
        this.props.getCompareList(parsed.package_ids,(resp)=>{
          if(resp){
            let test = {}
              resp.packages.map((pkg,i) =>{
                test = {}
                test.id=pkg.id
                test.name=pkg.name
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
            setPackageId: (package_id, isHomePage) => dispatch(setPackageId(package_id, isHomePage))
        }
    }
export default connect(mapStateToProps, mapDispatchToProps)(packageCompare);