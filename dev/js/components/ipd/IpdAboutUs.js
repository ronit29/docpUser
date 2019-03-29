import React from 'react'
import GTM from '../../helpers/gtm.js'
import ExpansionPanelIpd from './ExpansionPanelIpd.js'


class IPDAboutUsView extends React.Component {

	constructor(props){
		super(props)
		this.state = {
			toggleReadMore: false
		}
	}
	render(){
		let { ipd_info } = this.props

		let aboutText =''
		if(ipd_info  && ipd_info.about && ipd_info.about.all_details && ipd_info.about.all_details.length ){


		}
		
		return(
             <div className="tab-pane fade show active" id="nav-overview">
                
                <ul>
                	{
                		ipd_info.about && ipd_info.about.features?
                		ipd_info.about.features.map((ipd, i) =>{
                			return <li key={i} className="widget pat-info">
				                      <img src={ipd.icon} alt="" className="img-list" />
				                      <div>{`${ipd.name}:`}  <span>{ipd.value}</span></div>
				                   </li>
                		})
                		:''
                	}
                </ul>

                {
					ipd_info  && ipd_info.about && ipd_info.about.all_details?
					ipd_info.about.all_details.map((ipdInfo, key)=> {

						return <ExpansionPanelIpd data={ipdInfo}/>
					})
					:''
                }
                  
             </div>
			)
	}
}

export default IPDAboutUsView