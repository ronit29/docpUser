import React from 'react'
import CommentBox from './ArticleCommentBox.js'

class CommentDialogView extends React.Component{

	getAllComments(comment){
        let self = this
        if(comment.children && comment.children.length>0){
            return comment.children.map((childComment, key) => {
                return self.getAllComments(childComment)  
            })
        }else{
            return this.getCommentView(comment)
        }
	}

    getCommentView(comment){
        return(<div className="reply-comments-container">
                <div className="sub-comments-section">
                    <div className="dr-qucik-info doc-gold-">
                        <div className="fltr-crd-img text-center">
                            <div>
                                <img style={{ width: '50px' }} src="https://cdn.docprime.com/media/doctor/images/80x80/528763db88e24caa2af9d6e38047e285.jpg" className="img-fluid img-round" />
                            </div>
                        </div>
                        <div className="dr-profile">
                            <h1 className="dr-name">{comment.user_name?comment.user_name:'User_name  here'}</h1>
                            <h2 className="add-details">{comment.submit_date?new Date(comment.submit_date).toDateString():'No Date Available'}</h2>
                        </div>
                    </div>
                    <p className="usr-comments-para">{comment.comment}
                    </p>
                    <div className="text-right" onClick = {this.props.commentReplyClicked.bind(this,comment.id)}>
                        <span className="comments-rply">Reply</span>
                    </div>
                    {
                        this.props.parentCommentId == comment.id?
                        this.props.isUserLogin?
                            <div className="comments-post-input">
                                <input type="text" onChange={this.props.handleInputComment.bind(this)} />
                                <button className="comments-post-btns" onClick={this.props.postReply.bind(this)}>Post</button>
                            </div>
                            :<CommentBox {...this.props} {...this.state} getArticleData={this.props.getArticleData.bind(this)} />
                        :''   
                    }
                    
                </div>
            </div>)
    }
	render(){
		let self = this
		return(
			<div className="widget mrb-15 mrng-top-12">
                <div className="widget-content">
                    <div className="dr-qucik-info doc-gold-">
                        <div className="fltr-crd-img text-center">
                            <div>
                                <img style={{ width: '50px' }} src="https://cdn.docprime.com/media/doctor/images/80x80/528763db88e24caa2af9d6e38047e285.jpg" className="img-fluid img-round" />
                            </div>
                        </div>
                        <div className="dr-profile">
                            <h1 className="dr-name">{this.props.commentData.user_name||""}</h1>
                            <h2 className="add-details">{this.props.commentData.submit_date||""}</h2>
                        </div>
                    </div>
                    <p className="usr-comments-para">
                    {this.props.commentData.comment}
                    </p>
                    <div className="text-right" onClick = {this.props.commentReplyClicked.bind(this,this.props.commentData.id)}>
                        <span className="comments-rply">Reply</span>
                    </div>
                    {
                        this.props.parentCommentId == this.props.commentData.id?
                        this.props.isUserLogin?
                            <div className="comments-post-input">
                                <input type="text" onChange={this.props.handleInputComment.bind(this)} />
                                <button classNsame="comments-post-btns" onClick={this.props.postReply.bind(this)}>Post</button>
                            </div>
                            :<CommentBox {...this.props} {...this.state} getArticleData={this.props.getArticleData.bind(this)} />
                        :''   
                    }
    				{
    					this.getAllComments(this.props.commentData)
    				}
                </div>
			</div>
			
		)
	}
}

export default CommentDialogView
	