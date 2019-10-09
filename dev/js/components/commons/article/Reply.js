import React from 'react'
import CommentBox from './ArticleCommentBox.js'
import InitialsPicture from '../initialsPicture'
import Comment from './Comment.js'

class ReplyView extends React.Component{

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
        this.props.commentReplyClicked(comment.id)
    }

	render(){
		let comment = this.props.commentData
		let self = this
		return(
			<div className="widget mrb-15 mrng-top-12">
                <div className="widget-content">
                    <div className="dr-qucik-info doc-gold-" key={this.props.commentData.id}>
                        <div className="fltr-crd-img text-center">
                            <div>
                                <InitialsPicture  name={this.props.commentData.author?this.props.commentData.author.name:this.props.commentData.user_name} has_image={this.props.commentData.author && this.props.commentData.author.profile_img?this.props.commentData.author.profile_img:this.props.commentData.profile_img} className="initialsPicture-ds fltr-initialPicture-ds"><img style={{ width: '50px' }} className="img-fluid img-round" src={this.props.commentData.author && this.props.commentData.author.profile_img?this.props.commentData.author.profile_img:this.props.commentData.profile_img} alt={this.props.commentData.author?this.props.commentData.author.name:this.props.commentData.user_name} title={this.props.commentData.author?this.props.commentData.author.name:this.props.commentData.user_name} /></InitialsPicture>
                            </div>
                        </div>
                        <div className="dr-profile">
                            <p className={`dr-name ${this.props.commentData.author && !this.props.notArticle?'comments-rply':''}`} onClick={(e) => this.props.notArticle?{}:this.authorClick(this.props.commentData)}>{this.props.commentData.author?this.props.commentData.author.name:this.props.commentData.user_name}</p>
                            <p className="add-details">{this.props.commentData.submit_date?new Date(this.props.commentData.submit_date).toDateString():""}</p>
                        </div>
                    </div>
                    <p className="usr-comments-para">
                    {this.props.commentData.comment}
                    </p>
                    {
                        this.props.replyOpenFor == this.props.commentData.id?''
                        :<div className="text-right" onClick = {this.replyClicked.bind(this,this.props.commentData)}>
                            <span className="comments-rply">Reply</span>
                        </div>      
                    }
                    {
                        this.props.replyOpenFor == this.props.commentData.id?
                        this.props.isUserLogin?
                            <div className="comments-post-input">
                                <input type="text" onChange={this.props.handleInputComment.bind(this)} />
                                <button className="comments-post-btns" onClick={this.props.postReply.bind(this)}>Post</button>
                            </div>
                            :<CommentBox {...this.props} {...this.state} getArticleData={this.props.hospitalPage?()=>{}:this.props.getArticleData.bind(this)} parentCommentId = {this.props.commentData.id}/>
                        :''   
                    }
    				{
    					this.props.commentData.children && this.props.commentData.children.length?
    						this.props.commentData.children.map((child, key) =>{
    							return <Comment key={child.id} {...self.props} childData = {child} parentComment={this.props.commentData}/>
    						})
    						:''
    				}
                </div>
			</div>
			
		)
	}
}
export default ReplyView