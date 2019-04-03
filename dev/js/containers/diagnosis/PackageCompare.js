import React from 'react'
import LeftBar from '../../components/commons/LeftBar'
import RightBar from '../../components/commons/RightBar'
import ProfileHeader from '../../components/commons/DesktopProfileHeader'
import Footer from '../../components/commons/Home/footer'

import PackageCompareView from '../../components/diagnosis/searchPackages/packageCompare/packageCompareView.js'
  class packageCompare extends React.Component {
    constructor(){
      super()
        this.state={
          checked:false
        }
      }
      componentDidMount(){
        
      }  
render() {

return (
      <PackageCompareView />
          )
      }
    }
  export default packageCompare