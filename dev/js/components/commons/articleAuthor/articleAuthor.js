import React from 'react';
import InitialsPicture from '../initialsPicture';

class ArticleAuthor extends React.Component {
	constructor(props) {
		super(props)
		this.state = {

		}
	}

	authorClick(e) {
		e.preventDefault()
		if (this.props.url) {
			this.props.history.push(this.props.url)
		} else {
			this.props.history.push(`/opd/doctor/${this.props.id}`)
		}
	}

	render() {
		return (
			<div className="article-author-div mrb-20">
				<InitialsPicture className="initialsPicture-ds initialsPicture-author" name={this.props.name} has_image={!!this.props.profileImage} >
					<img className="fltr-usr-image img-round" style={{ width: 60, height: 60, marginRight: 8, fontSize: 10 }} src={this.props.profileImage} alt={`Dr. ${this.props.name}`} title={`Dr. ${this.props.name}`} />
				</InitialsPicture>
				<div className="author-dtls">
					<div className="author-name-div">
						<span style={{ margin: '0 6px 0 0' }}>Written By :</span>
						{
							this.props.url ?
								<a href={`/${this.props.url}`} onClick={(e) => this.authorClick(e)}>
									<h3 className="fw-500 text-primary">{`Dr. ${this.props.name}`}</h3>
								</a> :
								<a href={`/opd/doctor/${this.props.id}`} onClick={(e) => this.authorClick(e)}>
									<h3 className="fw-500 text-primary">{`Dr. ${this.props.name}`}</h3>
								</a>
						}
					</div>
					<div className="author-exp-div">
						<span>{this.props.speciality} | {this.props.experience} years of experience</span>
					</div>
					{
						this.props.publishedDate ?
							<div className="article-date">
								<span>Published Date : {this.props.publishedDate}</span>
							</div> : ''
					}
				</div>
			</div>
		)
	}
}

export default ArticleAuthor