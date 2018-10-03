import React from 'react';

import LeftBar from '../../commons/LeftBar'
import RightBar from '../../commons/RightBar'
import ProfileHeader from '../../commons/DesktopProfileHeader'
import InfiniteScroll from 'react-infinite-scroller'
import Loader from '../../commons/Loader'
import HelmetTags from '../../commons/HelmetTags'
const queryString = require('query-string');
import CONFIG from '../../../config'

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
					hasMore: true
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
				this.setState({
					hasMore: false,
					noArticleFound: true
				});
			}
			else {
				this.setState({
					hasMore: true,
					noArticleFound: false
				});
			}
		});
	}

	handleKeyUp(e) {
		if (e.key === 'Enter') {
			this.searchArticle();
		}
	}

	componentDidMount() {
		window.scrollTo(0, 0);
	}

	render() {
		return (
			<div className="profile-body-wrap">
				<ProfileHeader />
				<section className="container parent-section book-appointment-section">
					<div className="row main-row parent-section-row">
						<LeftBar />
						<div className="col-12 col-md-7 col-lg-7 center-column">
							{
								this.props.ARTICLE_LOADED ? <HelmetTags tagsData={{
									title: (this.props.articleListData.seo ? this.props.articleListData.seo.title : ""),
									description: (this.props.articleListData.seo ? this.props.articleListData.seo.description : ""),
									canonicalUrl: `${CONFIG.API_BASE_URL}${this.props.location.pathname}`,
									setDefault: true
								}} /> : null
							}
							<div className="container-fluid main-container">
								<div className="row art-search-row">
									<div className="col-12">
										<ul itemScope itemType="http://schema.org/BreadcrumbList" className="mrb-10 breadcrumb-list" style={{ wordBreak: 'break-word' }}>
											<li itemProp="itemListElement" itemScope
												itemType="http://schema.org/ListItem" className="breadcrumb-list-item">
												<a itemProp="item" href="/" onClick={(e) => this.onHomeClick(e, "/")}>
													<span itemProp="name" className="fw-500 breadcrumb-title breadcrumb-colored-title">Ask a Doctor</span>
												</a>
												<meta itemProp="position" content="1" />
											</li>
											<span className="breadcrumb-arrow">&gt;</span>
											<li itemProp="itemListElement" itemScope
												itemType="http://schema.org/ListItem" className="breadcrumb-list-item">
												<span itemProp="name" className="fw-500 breadcrumb-title">{this.props.articleListData.category}</span>
												<meta itemProp="position" content="2" />
											</li>
										</ul>
									</div>
									<div className="col-12">
										<input type="text" id="disease-search" value={this.state.searchVal} className="art-searchbar" placeholder="Search any Disease" onChange={(e) => this.changeVal(e)} onKeyUp={(e) => this.handleKeyUp(e)} />
										<button className="art-search-btn" onClick={() => this.searchArticle()}>
											<img src={ASSETS_BASE_URL + "/images/search.svg"} />
										</button>
									</div>
									<div className="col-12">
										{
											this.props.match.url === '/all-diseases' ? <h1 className="fw-500 mrt-20" style={{ fontSize: 22 }} >All Diseases</h1> : <h1 className="fw-500 mrt-20" style={{ fontSize: 22 }} >All Medicines</h1>
										}
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
																		<a href={`/${property.url}`} onClick={(e) => e.preventDefault()}><h2 className="disease-list-name fw-500">{property.title}</h2></a>
																		<p className="disease-list-content fw-500" dangerouslySetInnerHTML={{ __html: property.articleTeaser }}></p>
																	</div>
																</div>
															}) : <p className="fw-500 text-center" style={{ fontSize: 20 }} >No Article Found !!</p>
													}
												</InfiniteScroll>
												{
													this.state.hasMore ?
														<div>
															<a href={`${CONFIG.API_BASE_URL}${this.props.match.url}?page=${this.state.page}`} className="btn btn-info" style={{ display: 'block', width: 120, margin: '10px auto' }}>Load More</a>
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
