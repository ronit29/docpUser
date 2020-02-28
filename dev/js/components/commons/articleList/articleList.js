import React from 'react';

import LeftBar from '../../commons/LeftBar'
import RightBar from '../../commons/RightBar'
import ProfileHeader from '../../commons/DesktopProfileHeader'
import InfiniteScroll from 'react-infinite-scroller'
import Loader from '../../commons/Loader'
import HelmetTags from '../../commons/HelmetTags'
import CONFIG from '../../../config'
import Footer from '../Home/footer'
const queryString = require('query-string')

class ArticleList extends React.Component {
	constructor(props) {
		super(props)
		const parsed = queryString.parse(this.props.location.search)

		var page = 1;
		if (parsed && parsed.page) {
			page = parsed.page
		}

		var title = this.props.match.url.toLowerCase();
		title = title.substring(1, title.length)


		this.state = {
			hasMore: true,
			page: page,
			searchVal: '',
			noArticleFound: false,
			title: title,
			buttonsVisible: true,
			start_page: page
		}
	}

	componentDidMount() {
		window.scrollTo(0, 0);

		this.props.getArticleList(this.state.title, this.state.page, true)
		const parsed = queryString.parse(this.props.location.search)

		if (parsed.page && parsed.page == 1) {
			var newHref = window.location.href.replace('?page=1', '');
			newHref = newHref.replace('&page=1', '');
			window.location.href = newHref;
		}

	}

	loadMore(delta) {
		this.setState({
			hasMore: false
		}, () => {
			let page = parseInt(this.state.page) + delta
			this.props.getArticleList(this.state.title, page, true, this.state.searchVal, (resp) => {
				if (resp.length) {
					this.setState({
						hasMore: true,
						page
					});
				} else {
					this.setState({
						hasMore: false
					});
				}
			})
		})

	}

	changeVal(e) {
		this.setState({
			searchVal: e.target.value
		});
	}

	searchArticle() {
		let page = 1
		if (!this.state.searchVal) {
			page = this.state.start_page
		}

		this.setState({ page: page }, () => {
			this.props.getArticleList(this.state.title, this.state.page, true, this.state.searchVal, (resp) => {
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

				if (this.state.searchVal) {
					this.setState({
						buttonsVisible: false
					});
				}
				else {
					this.setState({
						buttonsVisible: true
					});
				}
			});
		})
	}

	handleKeyUp(e) {
		if (e.key === 'Enter') {
			this.searchArticle();
		}
	}

	navigate(delta = 0, e) {
		// e.preventDefault()
		// e.stopPropagation()
		// this.loadMore(delta)
	}

	render() {
		var page_size = 50
		var pageNo = parseInt(this.state.page);
		let currentPage = []
		currentPage.push(<div className="art-pagination-btn">
			<span className="fw-500" style={{ color: '#000' }}>{pageNo}</span>
		</div>)

		let placeHolder = 'Search any '
		if (this.props.articleListData && this.props.articleListData.category) {
			placeHolder = placeHolder + this.props.articleListData.category.split(' ')[0]
		}

		let heading = ""
		let url = this.props.match.url.toLowerCase()
		if (url == '/all-diseases') {
			heading = "All Diseases"
		} else if (url == '/all-medicines') {
			heading = "All Medicines"
		} else {
			heading = "All Articles"
		}

		return (
			<div className="profile-body-wrap">
				<ProfileHeader />
				<section className="container container-top-margin">
					<div className="row main-row parent-section-row">
						<LeftBar />
						<div className="col-12 col-md-7 col-lg-7 center-column">
							{
								this.props.ARTICLE_LOADED ? <HelmetTags tagsData={{
									title: (this.props.articleListData.seo ? this.props.articleListData.seo.title : ""),
									description: (this.props.articleListData.seo ? this.props.articleListData.seo.description : ""),
									canonicalUrl: `${CONFIG.API_BASE_URL}${this.props.location.pathname}${this.props.location.search}`,

									prev: `${(pageNo != 1 && pageNo <= Math.ceil(this.props.articleListData.total_articles / page_size)) ? `${CONFIG.API_BASE_URL}${this.props.location.pathname}${(pageNo > 2 && pageNo <= Math.ceil(this.props.articleListData.total_articles / page_size)) ? '?page=' + (pageNo - 1) : ''}` : ''}`,

									next: `${(pageNo != Math.ceil(this.props.articleListData.total_articles / page_size) && pageNo <= Math.ceil(this.props.articleListData.total_articles / page_size)) ? `${CONFIG.API_BASE_URL}${this.props.location.pathname}?page=${(pageNo >= 1 && pageNo < Math.ceil(this.props.articleListData.total_articles / page_size)) ? pageNo + 1 : ''}` : ''}`
								}} /> : null
							}
							<div className="container-fluid main-container">
								<div className="row">
									<div className="col-12">
										<ul className="mrb-10 breadcrumb-list" style={{ wordBreak: 'break-word' }}>
											<li className="breadcrumb-list-item">
												<a href="/" onClick={(e) => this.onHomeClick(e, "/")}>
													<span className="fw-500 breadcrumb-title breadcrumb-colored-title">Home</span>
												</a>
											</li>
											<span className="breadcrumb-arrow">&gt;</span>
											<li className="breadcrumb-list-item">
												<span className="fw-500 breadcrumb-title">{this.props.articleListData.category}</span>
											</li>
										</ul>
									</div>
									<div className="col-12">
										<input type="text" id="disease-search" value={this.state.searchVal} className="art-searchbar" placeholder={placeHolder} onChange={(e) => this.changeVal(e)} onKeyUp={(e) => this.handleKeyUp(e)} />
										<button className="art-search-btn" onClick={() => this.searchArticle()}>
											<img src={ASSETS_BASE_URL + "/images/search.svg"} />
										</button>
									</div>
									<div className="col-12">
										<h1 className="fw-500 mrt-20" style={{ fontSize: 22 }} >{heading}</h1>
									</div>
								</div>
								<div className="row mrt-20">
									{
										this.props.ARTICLE_LOADED ?
											<div style={{ width: '100%' }}>

												{
													this.props.articleList.length && !this.state.noArticleFound ?
														this.props.articleList.map((property, index) => {
															return <div className="col-12" key={index}>
																<div className="widget disease-widget" onClick={() => this.props.history.push(`/${property.url}`)}>
																	{
																		property.header_image ?
																			<img className="disease-list-img" src={property.header_image} alt={property.header_image_alt} /> : ''
																	}
																	<a href={`/${property.url}`} onClick={(e) => e.preventDefault()}><h2 className="disease-list-name fw-500">{property.title}</h2></a>
																	<p className="fw-500" dangerouslySetInnerHTML={{ __html: property.articleTeaser }}></p>
																</div>
															</div>
														}) : <p className="fw-500 text-center" style={{ fontSize: 20 }} >No Article Found !!</p>
												}

												{
													this.props.articleList.length && !this.state.noArticleFound && this.state.buttonsVisible ?
														<div className="col-12">
															{
																pageNo == 1 ?
																	<div className="art-pagination-div">
																		{currentPage}
																		<a onClick={this.navigate.bind(this, 1)} href={`${this.state.title}?page=${pageNo + 1}`} >
																			<div className="art-pagination-btn">
																				<span className="fw-500">{pageNo + 1}</span>
																			</div>
																		</a>
																	</div>
																	: (pageNo == Math.ceil(this.props.articleListData.total_articles / page_size)) ?
																		<div className="art-pagination-div">
																			<a href={`${this.state.title}?page=${pageNo - 1}`} onClick={this.navigate.bind(this, -1)}>
																				<div className="art-pagination-btn">
																					<span className="fw-500">{pageNo - 1}</span>
																				</div>
																			</a>
																			{currentPage}
																		</div>
																		: <div className="art-pagination-div">
																			<a onClick={this.navigate.bind(this, pageNo == 2 ? -1 : -1)} href={`${pageNo == 2 ? `${this.state.title}` : `${this.state.title}?page=${pageNo - 1}`}`} >
																				<div className="art-pagination-btn">
																					<span className="fw-500">{pageNo - 1}</span>
																				</div>
																			</a>

																			{currentPage}
																			<a href={`${this.state.title}?page=${pageNo + 1}`} onClick={this.navigate.bind(this, 1)} >
																				<div className="art-pagination-btn">
																					<span className="fw-500">{pageNo + 1}</span>
																				</div>
																			</a>
																		</div>
															}
														</div> : ""
												}
											</div> : <Loader />
									}
								</div>
							</div>

						</div>
						<RightBar noChatButton={true} msgTemplate="gold_template_1"/>
					</div>
				</section>
				<Footer />
			</div >
		);
	}
}

export default ArticleList