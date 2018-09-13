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
		let page=0;
		const parsed = queryString.parse(this.props.location.search)
		if(parsed){
            page = parseInt(parsed.page)
        }
		this.state = {
			hasMore: true,
			page: page || 1
		}
	}

	loadMore() {
		let page = this.state.page + 1;
		this.setState({ page: page, hasMore: false })
		let title = this.props.match.url
		title = title.substring(1, title.length)
		this.props.getArticleList(title, page, (resp) => {
			if (resp.length) {
				this.setState({ hasMore: true });
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
								<div className="row mrt-20">
									{
										this.props.ARTICLE_LOADED ?
											<div>
												<InfiniteScroll
													loadMore={this.loadMore.bind(this)}
													hasMore={this.state.hasMore}
												>
													{
														this.props.articleList ?
															this.props.articleList.map((property, index) => {
																return <div className="col-12" key={index}>
																	<div className="widget disease-widget" onClick={() => this.props.history.push(`/${property.url}`)}>
																		<img className="disease-list-img" src={property.header_image} alt={property.header_image_alt} />
																		<a href={`/${property.url}`} onClick={(e) => e.preventDefault()}><p className="disease-list-name fw-500">{property.title}</p></a>
																		<p className="disease-list-content fw-500" dangerouslySetInnerHTML={{__html:property.articleTeaser }} ></p>
																	</div>
																</div>
															}) : ""
													}
												</InfiniteScroll>
												{
													this.state.hasMore?	
													<div>
														<a href={url} className="btn btn-info" style={{display: 'block', width: 120, margin: '10px auto'}}>Load More</a>
													</div>
													:''
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
