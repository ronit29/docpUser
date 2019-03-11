import React from 'react'
import HospitalList from './HospitalList.js'

class IPDAboutUs extends React.Component {

	constructor(props){
		super(props)
		this.state = {
			toggleReadMore: false
		}
	}
	render(){
		let { ipd_info } = this.props

		let aboutText =''
		if(ipd_info  && ipd_info.about && ipd_info.about.details ){

			if(this.state.toggleReadMore){
				aboutText = ipd_info.about.details
			}else{
				aboutText = ipd_info.about.details.substring(0,13)
			}	
		}
		
		return(
             <div className="tab-pane fade show active" id="nav-overview">
                <h4 className="section-heading top-sc-head"> <span className="about-head"> {ipd_info.about.name} </span>
                   {/*<img src="https://cdn.docprime.com/cp/assets/img/icons/info.svg" alt="" className="info-img" />*/}
                </h4>
                <ul>
                	{
                		ipd_info.about && ipd_info.about.features?
                		ipd_info.about.features.map((ipd, i) =>{
                			return <li key={i} className="widget pat-info">
				                      <img src={ipd.icon} alt="" className="img-list" />
				                      <div>{ipd.name} : <span>{ipd.value}</span></div>
				                   </li>
                		})
                		:''
                	}
                </ul>
                <h4 className="section-heading">Procedure </h4>
            	<div className="widget" dangerouslySetInnerHTML={{ __html: aboutText}}>
	            </div>
                	{
                		this.state.toggleReadMore?
                		<a href="javascript:void(0);" className="read-more-btn" onClick={()=>this.setState({toggleReadMore: !this.state.toggleReadMore})} >Read Less</a>
		                :<a href="javascript:void(0);" className="read-more-btn" onClick={()=>this.setState({toggleReadMore: !this.state.toggleReadMore})} >Read More</a>
                	}
                  
             </div>
			)
	}
}

export default IPDAboutUs