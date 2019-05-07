import React from 'react'
const queryString = require('query-string');
import HelmetTags from '../HelmetTags'
import CONFIG from '../../../config'


class SpecialitiesCitiesMap extends React.Component {

	constructor(props) {
		super(props)

		let page = 1;
		const parsed = queryString.parse(this.props.location.search)
		if (parsed) {
			page = parsed.page || 1
		}

		var title = this.props.match.url.toLowerCase();
		title = title.substring(1, title.length)


		this.state = {
			page: parseInt(page),
			title: title
		}
	}
	componentDidMount() {
		if (window) {
            window.scrollTo(0, 0)
        }
        if (this.props.location.search == '?page=1') {
			var newHref = window.location.href.replace('?page=1', '');
			window.location.href = newHref;
		}
		let speciality = this.props.match.params.speciality
		this.props.getSpecialitiesMap(speciality, this.state.page)
	}

	goToSpeciality(url, e) {
		this.props.history.push(`/${url}`)
	}

	render() {

		let totalPages = this.props.specialitiesMapCities ? parseInt(this.props.specialitiesMapCities.pages) : 0
		let pageCount = []
		let prev = '', next = ''
		if (totalPages) {
			if (this.state.page == 1 && this.state.page < totalPages) {
				next = this.state.page + 1
				pageCount.push(<span key={1} className="anch-page-cnt active">{this.state.page}</span>
				)
				for(var i =2; i<=totalPages; i++){
					pageCount.push(<a key={i} className="anch-page-cnt" href={`/${this.state.title}?page=${i}`} >{i}</a>)
				}

			} else if (this.state.page != 1 && this.state.page + 1 <= totalPages) {
				next = this.state.page + 1
				prev = this.state.page - 1
				pageCount.push(
						<a key={1} className="anch-page-cnt" href={`/${this.state.title}?page=${this.state.page - 1}`} >{this.state.page - 1}</a>)

				pageCount.push(<span key={this.state.page} className="anch-page-cnt" >{this.state.page}</span>)

				for(var i = this.state.page + 1; i<=totalPages; i++){
					pageCount.push(<a key={i} className="anch-page-cnt" href={`/${this.state.title}?page=${i}`} >{i}</a>)
				}

			} else if (this.state.page == totalPages && totalPages > 1) {
				prev = this.state.page - 1
				pageCount.push(
						<a key={1} className="anch-page-cnt" href={`/${this.state.title}?page=${this.state.page - 1}`} >{this.state.page - 1}</a>)

				pageCount.push(<span key={this.state.page} className="anch-page-cnt" >{this.state.page}</span>)
					

			}

		}

		return (
			<div className="row sitemap-row">
				{
					this.props.specialitiesMapCities.paginated_specialists && this.props.specialitiesMapCities.paginated_specialists.length ?

							<div>
							<HelmetTags tagsData={{
									
									canonicalUrl: `${CONFIG.API_BASE_URL}${this.props.location.pathname}${this.props.location.search}`,

									prev: `${prev?`${CONFIG.API_BASE_URL}${this.props.location.pathname}${prev != 1?`?page=${prev}`:''}`:''}`,

									next: `${next?`${CONFIG.API_BASE_URL}${this.props.location.pathname}?page=${next}`:''}`
								}} />
						
						{
							this.props.specialitiesMapCities.paginated_specialists.map((city, i) => {
								return (
									<div style={{marginBottom: '15px'}} className="col-12 col-md-12" key={i}>
										<p className="fw-500 sitemap-title">{city.city_title}</p>
										<div className="row">
										{
											city.speciality_url_title.map((speciality, i) => {
												return <div key={i} className="col-md-6 tests-brdr-btm" onClick={this.goToSpeciality.bind(this, speciality.url)} >
												<div className="anchor-data-style">
													<a href={`/${speciality.url}`} onClick={(e) => { e.preventDefault() }} >{`${speciality.title}`}</a>
													<span className="sitemap-right-arrow">
														<img src={ASSETS_BASE_URL + "/img/customer-icons/arrow-forward-right.svg"} />
													</span>
													</div>
												</div>
											})
										}
										</div>
									</div>
								)
							})
						}
						</div>
						: ''
				}
				<div className="pagination-style">
				{pageCount}
				</div>
			</div>
		)
	}
}

export default SpecialitiesCitiesMap