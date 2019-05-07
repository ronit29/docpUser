import React from 'react';
import InitialsPicture from '../../../commons/initialsPicture'
import GTM from '../../../../helpers/gtm.js'

import { buildOpenBanner } from '../../../../helpers/utils.js'
import STORAGE from '../../../../helpers/storage'
import { X_OK } from 'constants';
import SnackBar from 'node-snackbar'

class PackageCompareStrip extends React.Component {
    constructor(props) {
        super(props)
        this.state={
            checked:false
        }
    }

    comparePackages(){
      if(this.props.compare_packages.length > 5){
            SnackBar.show({ pos: 'bottom-center', text: "Max 5 packages can be compared" });
      }else{
        let selectedPkgCompareIds=[]
          if(this.props.compare_packages){
              this.props.compare_packages.map((packages, i) => {
                  selectedPkgCompareIds.push(packages.id+'-'+packages.lab_id)
              })
          }
        this.props.history.push('/package/compare?package_ids='+selectedPkgCompareIds)      
      }
    }

    clearPackage(){
      this.props.resetPkgCompare()
    }

    render() {
        return (
            <section className="compare-package-footer cm-footer">
              <ul className="compare-packages-home">
                <li className="hlth-txt">{this.props.compare_packages.length} Health Package Selected</li>
                <li className="li-btn-compare">
                  <a className="pkg-btn-nw" onClick={this.comparePackages.bind(this)}>Compare</a>
                  <span className=""><img src="https://cdn.docprime.com/cp/assets/img/icons/close.png" alt=""  onClick={this.clearPackage.bind(this)}/></span>
                </li>
              </ul>
            </section>  
        )
    }
}


export default PackageCompareStrip
