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

	render(){

		let totalPages = this.props.specialitiesMapCities?parseInt(this.props.specialitiesMapCities.pages):0
		let pageCount = []
		if(totalPages){
			if(this.state.page == 1 && this.state.page < totalPages){
				pageCount.push(<a key={1} className= "anch-page-cnt" href={`/${this.state.title}?page=${this.state.page + 1}`} /*onClick={(e) => {
	                    e.preventDefault();
	                    this.props.history.push(`?page=${this.state.page}`) }} */>{ this.state.page + 1}</a>
	                    )

            }else if(this.state.page != 1 && this.state.page+1 <= totalPages){
            	pageCount.push(
            		<div>
            	<a key={1} className= "anch-page-cnt" href={`/${this.state.title}?page=${this.state.page - 1}`} /*onClick={(e) => {
                e.preventDefault();
                this.props.history.push(`?page=${this.state.page}`) }} */>{ this.state.page - 1}</a>

				<a key={2} className= "anch-page-cnt" href={`/${this.state.title}?page=${this.state.page}`} /*onClick={(e) => {
                e.preventDefault();
                this.props.history.push(`?page=${this.state.page+1}`) }}*/>{ this.state.page }</a>

				<a key={3} className= "anch-page-cnt" href={`/${this.state.title}?page=${this.state.page+1}`} /*onClick={(e) => {
                e.preventDefault();
                this.props.history.push(`?page=${this.state.page+2}`) }}*/>{ this.state.page + 1 }</a>
                </div>
                )

            }else if(this.state.page == totalPages && totalPages >1){

				pageCount.push(
					<div>
						<a key={1} className= "anch-page-cnt" href={`/${this.state.title}?page=${this.state.page-1}`} /*onClick={(e) => {
	                    e.preventDefault();
	                    this.props.history.push(`?page=${this.state.page}`) }}*/>{ this.state.page - 1 }</a>

						<a key={2} className= "anch-page-cnt" href={`/${this.state.title}?page=${this.state.page}`} /*onClick={(e) => {
	                    e.preventDefault();
	                    this.props.history.push(`?page=${this.state.page+1}`) }}*/>{ this.state.page }</a>
					</div>
				)

			}

		}

		return(
			<div className="col-12 col-md-7 col-lg-7 center-column">
				{
					this.props.specialitiesMapCities.paginated_specialists && this.props.specialitiesMapCities.paginated_specialists.length?
					this.props.specialitiesMapCities.paginated_specialists[0].speciality_urls.map((city, i) => {
						return <a key= {i} className= "anchor-data-style" href={`/${city.url}`} onClick={(e) => {
	                    e.preventDefault();
	                    this.props.history.push(`/${city.url}`) }} >{`${city.title}`}</a>
					})
					:''
				}
				{ pageCount }
			</div>
			)
	}
}

export default SpecialitiesCitiesMap