import React from 'react'
import CommentBox from './ArticleCommentBox.js'
import InitialsPicture from '../initialsPicture'

class CommentDialogView extends React.Component{

	getAllComments(childComment){
        let self = this
        if(childComment && childComment.length>0){
            return childComment.map((subChild, key) => {
                if(subChild && subChild.children){
                    return self.getAllComments(subChild.children)
                }else{
                    return this.getCommentView(subChild)        
                }  
            })
        }
	}

    getCommentView(comment){
        return(<div className="reply-comments-container" key={comment.id}>
                <div className="sub-comments-section">
                    <div className="dr-qucik-info doc-gold-">
                        <div className="fltr-crd-img text-center">
                            <div>
                                <InitialsPicture  name={comment.user_name} has_image={!!comment.image} className="initialsPicture-ds fltr-initialPicture-ds"><img style={{ width: '50px' }} className="img-fluid img-round" src={comment.image} alt={comment.user_name} title={comment.user_name} /></InitialsPicture>
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
                    <div className="dr-qucik-info doc-gold-" key={this.props.commentData.id}>
                        <div className="fltr-crd-img text-center">
                            <div>
                                <InitialsPicture  name={this.props.commentData.user_name} has_image={!!this.props.commentData.image} className="initialsPicture-ds fltr-initialPicture-ds"><img style={{ width: '50px' }} className="img-fluid img-round" src={this.props.commentData.image} alt={this.props.commentData.user_name} title={this.props.commentData.user_name} /></InitialsPicture>
                            </div>
                        </div>
                        <div className="dr-profile">
                            <h1 className="dr-name">{this.props.commentData.user_name||""}</h1>
                            <h2 className="add-details">{this.props.commentData.submit_date?new Date(this.props.commentData.submit_date).toDateString():""}</h2>
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
                                <button className="comments-post-btns" onClick={this.props.postReply.bind(this)}>Post</button>
                            </div>
                            :<CommentBox {...this.props} {...this.state} getArticleData={this.props.getArticleData.bind(this)} />
                        :''   
                    }
    				{
    					this.props.commentData.children && this.props.commentData.children.length?
                        this.getAllComments(this.props.commentData.children):''
    				}
                </div>
			</div>
			
		)
	}
}

export default CommentDialogView
	