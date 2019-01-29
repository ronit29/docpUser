import React from 'react'
import CommentBox from './ArticleCommentBox.js'
import InitialsPicture from '../initialsPicture'

class CommentDialogView extends React.Component{

	getAllComments(childComment, parentComment){
        let self = this
        if(childComment && childComment.length>0){
            return childComment.map((subChild, key) => {
                if(subChild && subChild.children){
                    return self.getAllComments(subChild.children, subChild)
                }else{
                    return this.getCommentView(subChild, parentComment)        
                }  
            })
        }
	}

    authorClick(data) {
        if (data.author) {
        
            if(data.author.url){
                this.props.history.push(data.author.url)    
            }else{
                this.props.history.push(`/opd/doctor/${data.author.id}`)    
            }
            
        }
    }

    replyClicked(comment){
        this.props.commentReplyClicked(comment.author?comment.author.id:comment.id)
    }

    getCommentView(comment, parentComment){
        let parentName = ''
        if(parentComment.author){
            parentName = parentComment.name
        }else{
            parentName = parentComment.user_name
        }
        return(<div className="reply-comments-container" key={comment.id}>
                <div className="sub-comments-section">
                    <div className="dr-qucik-info doc-gold-">
                        <div className="fltr-crd-img text-center">
                            <div>
                                <InitialsPicture  name={comment.author?comment.author.name:comment.user_name} has_image={comment.author?comment.author.profile_img:comment.profile_img} className="initialsPicture-ds fltr-initialPicture-ds"><img style={{ width: '40px' }} className="img-fluid img-round" src={comment.author?comment.author.profile_img:comment.profile_img} alt={comment.author?comment.author.name:comment.user_name} title={comment.author?comment.author.name:comment.user_name} /></InitialsPicture>
                            </div>
                        </div>
                        <div className="dr-profile">
                            <h1 className={`dr-name ${comment.author?'comments-rply':''}`} onClick={(e) => this.authorClick(comment)}>{comment.author?comment.author.name:comment.user_name }<span className="rply-spn">(author)</span><img className="img-rply" src={ASSETS_BASE_URL + "/img/reply.svg"} /><span className="rply-sndr">{ parentName}</span></h1>
                            <h2 className="add-details">{comment.submit_date?new Date(comment.submit_date).toDateString():'No Date Available'}</h2>
                        </div>
                    </div>
                    <p className="usr-comments-para">{comment.comment}
                    </p>
                    <div className="text-right" onClick = {this.replyClicked.bind(this,comment)}>
                        <span className="comments-rply">Reply</span>
                    </div>
                    {
                        this.props.parentCommentId == (comment.author?comment.author.id:comment.id)?
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
                                <InitialsPicture  name={this.props.commentData.author?this.props.commentData.author.name:this.props.commentData.user_name} has_image={this.props.commentData.author?this.props.commentData.author.profile_img:this.props.commentData.profile_img} className="initialsPicture-ds fltr-initialPicture-ds"><img style={{ width: '50px' }} className="img-fluid img-round" src={this.props.commentData.author?this.props.commentData.author.profile_img:this.props.commentData.profile_img} alt={this.props.commentData.author?this.props.commentData.author.name:this.props.commentData.user_name} title={this.props.commentData.author?this.props.commentData.author.name:this.props.commentData.user_name} /></InitialsPicture>
                            </div>
                        </div>
                        <div className="dr-profile">
                            <h1 className={`dr-name ${this.props.commentData.author?'comments-rply':''}`} onClick={(e) => this.authorClick(this.props.commentData)}>{this.props.commentData.author?this.props.commentData.author.name:this.props.commentData.user_name}</h1>
                            <h2 className="add-details">{this.props.commentData.submit_date?new Date(this.props.commentData.submit_date).toDateString():""}</h2>
                        </div>
                    </div>
                    <p className="usr-comments-para">
                    {this.props.commentData.comment}
                    </p>
                    <div className="text-right" onClick = {this.replyClicked.bind(this,this.props.commentData)}>
                        <span className="comments-rply">Reply</span>
                    </div>
                    {
                        this.props.parentCommentId == (this.props.commentData.author?this.props.commentData.author.id:this.props.commentData.id)?
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
                        this.getAllComments(this.props.commentData.children, this.props.commentData):''
    				}
                </div>
			</div>
			
		)
	}
}

export default CommentDialogView
	