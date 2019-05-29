import React from 'react'

class TopHospitalWidgets extends React.Component {

	navigateTo(data) {
        if(data.url) {
            this.props.history.push(`/${data.url}`)
        }else {
            this.props.history.push(`/ipd/hospital/${data.id}`)
        }
    }
	
	render(){

		return(
		     <div className="pakg-slider-container mt-20">
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
				                                <img className="img-fluid" src={data.logo} />
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