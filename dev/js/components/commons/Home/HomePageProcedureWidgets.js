import React from 'react'

class TopProcedureWidgets extends React.Component {

    navigateTo(data) {
        let selectedCriteria = {
            type: 'ipd',
            id: data.id,
            name: data.name
        }
        
        this.props.toggleIPDCriteria(selectedCriteria, true)
        
        if(data.url){
            this.props.history.push(`/${data.url}?showPopup=true&get_feedback=1`)
        }else{
            this.props.history.push(`/ipdInfo?ipd_id=${data.id}&showPopup=true&get_feedback=1`)
        }
    }
	
	render(){

		return(
		     <div className="pakg-slider-container mt-10">
                <div className="pkgSliderHeading">
                    <h5>Top Procedures</h5>
                    {/*<span>View All</span>*/}
                </div>
                <div className="pkgSliderContainer">
                    <div className='pkgCardsList d-inline-block sub-wd-cards'>
                    	{
                    		this.props.top_data.map((data) => {
                    			return <div className="pkgcustCards" onClick={this.navigateTo.bind(this, data)}>
				                            <div className="pkgcardImgCont">
				                                <img className="img-fluid" src={data.icon} />
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

export default TopProcedureWidgets