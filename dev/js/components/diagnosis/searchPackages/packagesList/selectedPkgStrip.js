import React from 'react';
import InitialsPicture from '../../../commons/initialsPicture'
import GTM from '../../../../helpers/gtm.js'

import { buildOpenBanner } from '../../../../helpers/utils.js'
import STORAGE from '../../../../helpers/storage'
import { X_OK } from 'constants';
import SnackBar from 'node-snackbar'

class SelectedPkgStrip extends React.Component {
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
                  selectedPkgCompareIds.push(packages.id)
              })
          }
        this.props.history.push('/package/compare?package_ids='+selectedPkgCompareIds)      
      }
    }

    render() {
        return (
            <div className="compare-package-footer">
                    <div className="compare-packages">
                    {
                      this.props.compare_packages && this.props.compare_packages.length > 0?
                        <ul>
                        {
                          this.props.compare_packages.map((packages, i) => {
                            return(<li key={i}>
                                    <img src={ASSETS_BASE_URL + "/images/packageCompare/red-cut.png"} alt="" className="end-div" onClick={this.props.toggleComparePackages.bind(this,packages.id,packages.lab_id,packages.img,packages.name)}/>  
                                    <img className="fltr-usr-image-lab" src={packages.img} />
                                    <br/>
                                    {packages.name}
                                  </li>
                              )
                          })
                        }
                        </ul>
                      :''
                    }
                    {
                      this.props.compare_packages && this.props.compare_packages.length == 1?
                      <div className="add-more-package">
                        Add one more package to compare
                      </div>
                      :
                      <div className={`add-more-package ${this.props.compare_packages.length >=2 ?'compare-package-now':''}`} onClick={this.props.compare_packages.length >=1?this.comparePackages.bind(this):''}>
                        <a>Compare Now {this.props.compare_packages && this.props.compare_packages.length>0?`(${this.props.compare_packages.length})`:''}</a>
                      </div>
                    }
                    </div>
            </div>
        )
    }
}


export default SelectedPkgStrip
