import React from 'react';

import LeftBar from '../../commons/LeftBar'
import RightBar from '../../commons/RightBar'
import ProfileHeader from '../../commons/DesktopProfileHeader'
import InfiniteScroll from 'react-infinite-scroller';
import Loader from '../../commons/Loader'
const queryString = require('query-string');



class ArticleList extends React.Component {
	constructor(props) {
		super(props)
		let page = 0;
		const parsed = queryString.parse(this.props.location.search)
		if (parsed) {
			page = parseInt(parsed.page)
		}
		this.state = {
			hasMore: true,
			page: page || 1,
			searchVal: '',
			noArticleFound: false
		}
	}

	loadMore() {
		let page = this.state.page + 1;
		this.setState({ page: page, hasMore: false })
		let title = this.props.match.url
		title = title.substring(1, title.length)
		this.props.getArticleList(title, page, this.state.searchVal, (resp) => {
			if (resp.length) {
				this.setState({
					hasMore: true,
				});
			}
		});
	}

	changeVal(e) {
		this.setState({
			searchVal: e.target.value
		});
	}

	searchArticle() {
		let title = this.props.match.url
		title = title.substring(1, title.length);
		this.setState({ page: 1, hasMore: true })
		this.props.getArticleList(title, 1, this.state.searchVal, (resp) => {
			if (resp.length == 0) {
				console.log("resp length : " + resp.length);
				this.setState({
					hasMore: false,
					noArticleFound: true
				});
				console.log("noarticleFound state : " + this.state.noArticleFound);
			}
			else {
				this.setState({
					hasMore: true,
					noArticleFound: false
				});
			}
		});
	}

	render() {
		let url = window.location.href + `?page=${this.state.page}`
		return (
			<div className="profile-body-wrap">
				<ProfileHeader />
				<section className="container parent-section book-appointment-section">
					<div className="row main-row parent-section-row">
						<LeftBar />
						<div className="col-12 col-md-7 col-lg-7 center-column">
							<div className="container-fluid main-container">
								<div className="row art-search-row">
									<div className="col-12">
										<input type="text" id="disease-search" value={this.state.searchVal} className="art-searchbar" placeholder="Search any Disease" onChange={(e) => this.changeVal(e)} />
										<button className="art-search-btn" onClick={() => this.searchArticle()}>
											<img src={ASSETS_BASE_URL + "/images/search.svg"} />
										</button>
									</div>
								</div>
								<div className="row mrt-20">
									{
										this.props.ARTICLE_LOADED ?
											<div style={{ width: '100%' }}>
												<InfiniteScroll
													loadMore={this.loadMore.bind(this)}
													hasMore={this.state.hasMore}
												>
													{
														this.props.articleList && !this.state.noArticleFound ?
															this.props.articleList.map((property, index) => {
																return <div className="col-12" key={index}>
																	<div className="widget disease-widget" onClick={() => this.props.history.push(`/${property.url}`)}>
																		{
																			property.header_image ?
																				<img className="disease-list-img" src={property.header_image} alt={property.header_image_alt} /> : ''
																		}
																		<a href={`/${property.url}`} onClick={(e) => e.preventDefault()}><p className="disease-list-name fw-500">{property.title}</p></a>
																		<p className="disease-list-content fw-500" dangerouslySetInnerHTML={{ __html: property.articleTeaser }}></p>
																	</div>
																</div>
															}) : <p className="fw-500 text-center" style={{ fontSize: 20 }} >No Article Found !!</p>
													}
												</InfiniteScroll>
												{
													this.state.hasMore ?
														<div>
															<a href={url} className="btn btn-info" style={{ display: 'block', width: 120, margin: '10px auto' }}>Load More</a>
														</div>
														: ''
												}

											</div> : <Loader />

									}
								</div>
							</div>

						</div>
						<RightBar />
					</div>
				</section>
			</div>
		);
	}
}


export default ArticleList
