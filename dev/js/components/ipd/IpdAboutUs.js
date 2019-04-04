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
		
		return(
             <div className="tab-pane fade show active" id="nav-overview">
             	{
             		ipd_info && ipd_info.about && ipd_info.about.all_details && ipd_info.about.all_details.length?
             		<h4 className="section-heading">{`About ${ipd_info.about?ipd_info.about.name:'Treatment'}`} </h4>
					:''		
             	}
             	
                {
					ipd_info && ipd_info.about && ipd_info.about.all_details && ipd_info.about.all_details.length?
					<ul className="widget">
					{
						ipd_info.about.all_details.map((ipdInfo, key)=> {

							return <ExpansionPanelIpd data={ipdInfo} key={key} {...this.props} id={key}/>
						})
					}
					</ul>
					:''
                }
                  
             </div>
			)
	}
}

export default IPDAboutUsView