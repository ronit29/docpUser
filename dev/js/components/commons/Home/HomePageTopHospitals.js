import React from 'react'

class TopHospitalWidgets extends React.Component {

	navigateTo(data) {
        if(data.url) {
            this.props.history.push(`/${data.url}?showPopup=true&get_feedback=1`)
        }else {
            this.props.history.push(`/ipd/hospital/${data.id}?showPopup=true&get_feedback=1`)
        }
    }
	
	render(){

		return(
		     <div className="pakg-slider-container">
                <div className="pkgSliderHeading">
                    <h5>Top Hospitals</h5>
                    {/*<span>View All</span>*/}
                </div>
                <div className="pkgSliderContainer">
                    <div className='pkgCardsList d-inline-block sub-wd-cards'>
                    	{
                    		this.props.top_data.map((data) => {
                    			return <div className="pkgcustCards" onClick={this.navigateTo.bind(this, data)}>
				                            <div className="pkgcardImgCont">
				                                <img style={{width:82}} className="img-fluid" src={data.logo} />
				                            </div>
				                            <p className="pkgtstName">
				                                {data.name}
				                        	</p>
				                        </div>		
                    		})
                    	}
                    </div>
                </div>
            </div>
		)
	}
}

export default TopHospitalWidgets