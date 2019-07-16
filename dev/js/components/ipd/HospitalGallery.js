import React from 'react'
// import Lightbox from '../../helpers/lightbox';
import Lightbox from 'react-image-lightbox';

class HospitalGalleryView extends React.Component {

	constructor(props){
		super(props)
		this.state = {
		  photoIndex: 0,
		  isOpen: false,
		}
	}

	render(){
		let { hospital_data } = this.props
		let { photoIndex, isOpen } = this.state
		return(
			<div className="hs-card">
	           <div className="card-head"><h2 className="dsply-ipd-hdng">Photos of {hospital_data.name}</h2></div>   
	           <div className="card-body clearfix">
	             <ul className="hs-accordian hs-image-gallery">

	             	{
	             		hospital_data.images.map((image, i)=>{
	             			return <li key={i} style = {{ backgroundImage: `url(${image.original})` }} onClick={() => this.setState({ isOpen: true, photoIndex: i })}></li>
	             		})
	             	}
	             	{isOpen && (
                        <Lightbox
                            mainSrc={hospital_data.images[photoIndex].original}
                            nextSrc={hospital_data.images[(photoIndex + 1) % hospital_data.images.length].original}
                            prevSrc={hospital_data.images[(photoIndex + hospital_data.images.length - 1) % hospital_data.images.length].original}
                            onCloseRequest={() => this.setState({ isOpen: false })}
                            onMovePrevRequest={() =>
                                this.setState({
                                    photoIndex: (photoIndex + hospital_data.images.length - 1) % hospital_data.images.length,
                                })
                            }
                            onMoveNextRequest={() =>
                                this.setState({
                                    photoIndex: (photoIndex + 1) % hospital_data.images.length,
                                })
                            }
                        />
                    )}
	             </ul>
	           </div>   
	         </div>
			)
	}
}

export default HospitalGalleryView