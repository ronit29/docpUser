import React from 'react'
import HospitalList from './HospitalList.js'
import GTM from '../../helpers/gtm.js'


class IPDAboutUs extends React.Component {

	constructor(props){
		super(props)
		this.state = {
			toggleReadMore: false
		}
	}
	render(){
		let { ipd_info } = this.props

		let aboutText =null
		if(ipd_info  && ipd_info.about&& ipd_info.about.show_about){
			
			aboutText = ipd_info.about.about
		}
		
		return(
             <div className="tab-pane fade show active" id="nav-overview">
                
                {<ul>
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
                </ul>}
                {
                	aboutText?
                	<div>
                		<h4 className="section-heading">{`About ${ipd_info.about?ipd_info.about.name:''}`} </h4>
		            	<div className="widget custom-li-style pb-30" style={{textAlign:'justify'}} dangerouslySetInnerHTML={{ __html: aboutText}}>
			            </div>
                	</div>
                	:''
                }
                
                	{	aboutText?
	                		this.state.toggleReadMore?
	                		<a href="javascript:void(0);" className="read-more-btn" onClick={()=>{
	                			let gtmData = {
						            'Category': 'ConsumerApp', 'Action': 'IpdInfoReadLessClicked', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'ipd-info-read-less-clicked', selectedId: this.props.ipd_id || ''
						        }
						        GTM.sendEvent({ data: gtmData })
	                			this.setState({toggleReadMore: !this.state.toggleReadMore})
	                		}} >Read Less</a>
			                :<a href="javascript:void(0);" className="read-more-btn" onClick={()=>{
			                	let gtmData = {
						            'Category': 'ConsumerApp', 'Action': 'IpdInfoReadMoreClicked', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'ipd-info-read-more-clicked', selectedId: this.props.ipd_id || ''
						        }
						        GTM.sendEvent({ data: gtmData })
						        this.props.readMoreClicked()
			                	//this.props.history.push(`/ipd/${this.props.ipd_id}/detail`)
			                }} >Read More</a>
                		:''
                	}
                  
             </div>
			)
	}
}

export default IPDAboutUs