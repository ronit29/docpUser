import React from 'react'

class HospitalGalleryView extends React.Component {

	render(){
		let { hospital_data } = this.props
		return(
			<div className="hs-card">
	           <div className="card-head">Photo Gallery</div>   
	           <div className="card-body clearfix">
	             <ul className="hs-accordian hs-image-gallery">
	             	{
	             		hospital_data.images.map((image)=>{
	             			return <li><img src={image.original} /></li>
	             		})
	             	}
	             </ul>
	           </div>   
	         </div>
			)
	}
}

export default HospitalGalleryView