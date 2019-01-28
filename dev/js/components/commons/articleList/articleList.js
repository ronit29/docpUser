import React from 'react';

import LeftBar from '../../commons/LeftBar'
import RightBar from '../../commons/RightBar'
import ProfileHeader from '../../commons/DesktopProfileHeader'
import InfiniteScroll from 'react-infinite-scroller'
import Loader from '../../commons/Loader'
import HelmetTags from '../../commons/HelmetTags'
import CONFIG from '../../../config'
import Footer from '../Home/footer'

class ArticleList extends React.Component {
	constructor(props) {
		super(props)

		var page = 1;
		if (this.props.location.search.length) {
			page = this.props.location.search.split('=')[1];
		}

		var title = this.props.match.url.toLowerCase();
		title = title.substring(1, title.length)


		this.state = {
			hasMore: true,
			page: page,
			searchVal: '',
			noArticleFound: false,
			title: title,
			buttonsVisible: true
		}
	}

	componentDidMount() {
		window.scrollTo(0, 0);

		this.props.getArticleList(this.state.title, this.state.page, true)

		if (this.props.location.search == '?page=1') {
			var newHref = window.location.href.replace('?page=1', '');
			window.location.href = newHref;
		}

	}

	loadMore() {
		let page = parseInt(this.state.page) + 1
		this.props.getArticleList(this.state.title, page, false, this.state.searchVal, (resp) => {
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
		});
	}

	changeVal(e) {
		this.setState({
			searchVal: e.target.value
		});
	}

	searchArticle() {
		this.props.getArticleList(this.state.title, 1, true, this.state.searchVal, (resp) => {
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
	}

	handleKeyUp(e) {
		if (e.key === 'Enter') {
			this.searchArticle();
		}
	}

	render() {
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

									prev: `${(pageNo != 1 && pageNo <= Math.ceil(this.props.articleListData.total_articles / 10)) ? `${CONFIG.API_BASE_URL}${this.props.location.pathname}${(pageNo > 2 && pageNo <= Math.ceil(this.props.articleListData.total_articles / 10)) ? '?page=' + (pageNo - 1) : ''}` : ''}`,

									next: `${(pageNo != Math.ceil(this.props.articleListData.total_articles / 10) && pageNo <= Math.ceil(this.props.articleListData.total_articles / 10)) ? `${CONFIG.API_BASE_URL}${this.props.location.pathname}?page=${(pageNo >= 1 && pageNo < Math.ceil(this.props.articleListData.total_articles / 10)) ? pageNo + 1 : ''}` : ''}`
								}} /> : null
							}
							<div className="container-fluid main-container">
								<div className="row art-search-row">
									<div className="col-12 mrng-top-12">
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
												<InfiniteScroll
													loadMore={this.loadMore.bind(this)}
													hasMore={this.state.hasMore}
												>
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
																		<p className="disease-list-content fw-500" dangerouslySetInnerHTML={{ __html: property.articleTeaser }}></p>
																	</div>
																</div>
															}) : <p className="fw-500 text-center" style={{ fontSize: 20 }} >No Article Found !!</p>
													}
												</InfiniteScroll>
												{
													this.props.articleList.length && !this.state.noArticleFound && this.state.buttonsVisible ?
														<div className="col-12">
															{
																pageNo == 1 ?
																	<div className="art-pagination-div">
																		{currentPage}
																		<a href={`${this.state.title}?page=${pageNo + 1}`} >
																			<div className="art-pagination-btn">
																				<span className="fw-500">{pageNo + 1}</span>
																			</div>
																		</a>
																	</div>
																	: (pageNo == Math.ceil(this.props.articleListData.total_articles / 10)) ?
																		<div className="art-pagination-div">
																			<a href={`${this.state.title}?page=${pageNo - 1}`} >
																				<div className="art-pagination-btn">
																					<span className="fw-500">{pageNo - 1}</span>
																				</div>
																			</a>
																			{currentPage}
																		</div>
																		: <div className="art-pagination-div">
																			<a href={`${pageNo == 2 ? `${this.state.title}` : `${this.state.title}?page=${pageNo - 1}`}`} >
																				<div className="art-pagination-btn">
																					<span className="fw-500">{pageNo - 1}</span>
																				</div>
																			</a>
																			{currentPage}
																			<a href={`${this.state.title}?page=${pageNo + 1}`} >
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
								{/* ============================comments section================================== 
								<div className="row">
									<div className="col-12">
										<h4 className="comments-main-heading">User Comments (212)</h4>
										<div className="widget mrb-15 mrng-top-12">
											<div className="widget-content">
												<div className="dr-qucik-info doc-gold-">
													<div className="fltr-crd-img text-center">
														<div>
															<img style={{ width: '50px' }} src="https://cdn.docprime.com/media/doctor/images/80x80/528763db88e24caa2af9d6e38047e285.jpg" className="img-fluid img-round" />
														</div>
													</div>
													<div className="dr-profile">
														<h1 className="dr-name">User_name  here</h1>
														<h2 className="add-details">23th January 2019</h2>
													</div>
												</div>
												<p className="usr-comments-para">
													Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.
												</p>
												<div className="text-right">
													<span className="comments-rply">Reply</span>
												</div>
											</div>
										</div>
										<div className="widget mrb-15 mrng-top-12">
											<div className="widget-content">
												<div className="dr-qucik-info doc-gold-">
													<div className="fltr-crd-img text-center">
														<div>
															<img style={{ width: '50px' }} src="https://cdn.docprime.com/media/doctor/images/80x80/528763db88e24caa2af9d6e38047e285.jpg" className="img-fluid img-round" />
														</div>
													</div>
													<div className="dr-profile">
														<h1 className="dr-name">Anonymous</h1>
														<h2 className="add-details">23th January 2019</h2>
													</div>
												</div>
												<p className="usr-comments-para">
													Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.
												</p>
												<div className="text-right">
													<span className="comments-rply">Reply</span>
												</div>
												<form>
													<div className="comments-section-form">
														<div className="row no-gutters">
															<div className="col-12">
																<div className="labelWrap">
																	<input id="fname" className="fc-input" name="fname" type="text" required />
																	<label htmlFor="fname">Name</label>
																</div>
															</div>
															<div className="col-12">
																<div className="labelWrap">
																	<input id="fmail" className="fc-input" name="fname" type="text" required />
																	<label htmlFor="fmail">Email</label>
																</div>
															</div>
															<div className="col-12">
																<div className="labelWrap">
																	<div className="labelWrap">
																		<textarea style={{ height: '100px' }} id="ftext" className="fc-input" name="fname" type="text" required></textarea>
																		<label htmlFor="ftext">Your Comment</label>
																	</div>
																</div>
															</div>
														</div>
														<div className="commnets-sbmt-btn">
															<button className="cmnts-btn">Reply</button>
														</div>
													</div>
												</form>
												<div className="reply-comments-container">
													<div className="sub-comments-section">
														<div className="dr-qucik-info doc-gold-">
															<div className="fltr-crd-img text-center">
																<div>
																	<img style={{ width: '40px' }} src="https://cdn.docprime.com/media/doctor/images/80x80/528763db88e24caa2af9d6e38047e285.jpg" className="img-fluid img-round" />
																</div>
															</div>
															<div className="dr-profile">
																<h1 className="dr-name">Brijesh Singh </h1>
																<h2 className="add-details">23th January 2019</h2>
															</div>
														</div>
														<p className="usr-comments-para">Cool, Awesome</p>
														<div className="text-right">
															<span className="comments-rply">Reply</span>
														</div>
													</div>
												</div>
												<div className="reply-comments-container">
													<div className="sub-comments-section">
														<div className="dr-qucik-info doc-gold-">
															<div className="fltr-crd-img text-center">
																<div>
																	<img style={{ width: '40px' }} src="https://cdn.docprime.com/media/doctor/images/80x80/528763db88e24caa2af9d6e38047e285.jpg" className="img-fluid img-round" />
																</div>
															</div>
															<div className="dr-profile">
																<h1 className="dr-name">Brijesh Singh </h1>
																<h2 className="add-details">23th January 2019</h2>
															</div>
														</div>
														<p className="usr-comments-para">Great to see this</p>
														<div className="text-right">
															<span className="comments-rply">Reply</span>
														</div>
													</div>
													<div className="sub-comments-section">
														<div className="dr-qucik-info doc-gold-">
															<div className="fltr-crd-img text-center">
																<div>
																	<img style={{ width: '40px' }} src="https://cdn.docprime.com/media/doctor/images/80x80/528763db88e24caa2af9d6e38047e285.jpg" className="img-fluid img-round" />
																</div>
															</div>
															<div className="dr-profile">
																<h1 className="dr-name">Brijesh Singh </h1>
																<h2 className="add-details">23th January 2019</h2>
															</div>
														</div>
														<p className="usr-comments-para">Cool, Awesome</p>
														<div className="text-right">
															<span className="comments-rply">Reply</span>
														</div>
														<div className="sub-comments-section">
															<div className="dr-qucik-info doc-gold-">
																<div className="fltr-crd-img text-center">
																	<div>
																		<img style={{ width: '40px' }} src="https://cdn.docprime.com/media/doctor/images/80x80/528763db88e24caa2af9d6e38047e285.jpg" className="img-fluid img-round" />
																	</div>
																</div>
																<div className="dr-profile">
																	<h1 className="dr-name">Brijesh Singh </h1>
																	<h2 className="add-details">23th January 2019</h2>
																</div>
															</div>
															<p className="usr-comments-para">Cool, Awesome</p>
															<div className="text-right">
																<span className="comments-rply">Reply</span>
															</div>
															<div className="comments-post-input">
																<input type="text"/>
																<button className="comments-post-btns">Post</button>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>

									</div>

								</div>
								{/* ============================comments section================================== */}
							</div>

						</div>
						<RightBar noChatButton={true} />
					</div>
				</section>
				<Footer />
			</div>
		);
	}
}

export default ArticleList