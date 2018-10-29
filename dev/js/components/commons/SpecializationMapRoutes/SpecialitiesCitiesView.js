import React from 'react'
const queryString = require('query-string');


class SpecialitiesCitiesMap extends React.Component{

	constructor(props){
		super(props)

		let page = 1;
		const parsed = queryString.parse(this.props.location.search)
		if(parsed){
			page = parsed.page || 1
		}

		var title = this.props.match.url.toLowerCase();
		title = title.substring(1, title.length)


		this.state = {
			page: parseInt(page),
			title: title
		}
	}
	componentDidMount(){

		let speciality = this.props.match.params.speciality
		this.props.getSpecialitiesMap(speciality, this.state.page)
	}

	goToSpeciality( url, e){
        this.props.history.push(`/${url}`)
	}

	render(){

		let totalPages = this.props.specialitiesMapCities?parseInt(this.props.specialitiesMapCities.pages):0
		let pageCount = []
		if(totalPages){
			if(this.state.page == 1 && this.state.page < totalPages){
				pageCount.push(<a key={1} className= "anch-page-cnt" href={`/${this.state.title}?page=${this.state.page + 1}`} >{ this.state.page + 1}</a>
	                    )

            }else if(this.state.page != 1 && this.state.page+1 <= totalPages){
            	pageCount.push(
            		<div>
            	<a key={1} className= "anch-page-cnt" href={`/${this.state.title}?page=${this.state.page - 1}`} >{ this.state.page - 1}</a>

				<a key={2} className= "anch-page-cnt" href={`/${this.state.title}?page=${this.state.page}`} >{ this.state.page }</a>

				<a key={3} className= "anch-page-cnt" href={`/${this.state.title}?page=${this.state.page+1}`} >{ this.state.page + 1 }</a>
                </div>
                )

            }else if(this.state.page == totalPages && totalPages >1){

				pageCount.push(
					<div>
						<a key={1} className= "anch-page-cnt" href={`/${this.state.title}?page=${this.state.page-1}`} >{ this.state.page - 1 }</a>

						<a key={2} className= "anch-page-cnt" href={`/${this.state.title}?page=${this.state.page}`} >{ this.state.page }</a>
					</div>
				)

			}

		}

		return(
			<div className="row sitemap-row">
			{
				this.props.specialitiesMapCities.paginated_specialists && this.props.specialitiesMapCities.paginated_specialists.length?
					this.props.specialitiesMapCities.paginated_specialists.map((city, i) => {
						return(<div className="col-12 col-md-6">
							<p className="fw-500 sitemap-title">{city.city_title}</p>
							
							{
								city.speciality_url_title.map((speciality, i) => {
								 return <div key= {i} className="anchor-data-style" onClick={this.goToSpeciality.bind(this,speciality.url)} ><a href={`/${speciality.url}`} onClick={(e)=>{e.preventDefault()}} >{`${speciality.title}`}</a></div>
								})
							}
							
						</div>)							
					})
				:''
			}	


				{ pageCount }
			</div>
			)
	}
}

export default SpecialitiesCitiesMap