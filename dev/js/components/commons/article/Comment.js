import React from 'react'
import CommentBox from './ArticleCommentBox.js'
import InitialsPicture from '../initialsPicture'

class Comment extends React.Component{

	authorClick(data, e) {
        e.preventDefault()
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
  		let self = this
        let parentName = ''
        let comment = this.props.childData
        if(this.props.parentComment.author){
            parentName = "Dr. "+this.props.parentComment.author.name
        }else{
            parentName = this.props.parentComment.user_name
        }
        return(
        	<div key={comment.id}>
        	<div className="reply-comments-container" key={comment.id}>
                <div className="sub-comments-section">
                    <div className="dr-qucik-info doc-gold-">
                        <div className="fltr-crd-img text-center">
                            <div>
                                <InitialsPicture  name={comment.author?comment.author.name:comment.user_name} has_image={comment.author && comment.author.profile_img?comment.author.profile_img:comment.profile_img} className="initialsPicture-ds fltr-initialPicture-ds"><img style={{ width: '40px' }} className="img-fluid img-round" src={comment.author && comment.author.profile_img?comment.author.profile_img:comment.profile_img} alt={comment.author?comment.author.name:comment.user_name} title={comment.author?comment.author.name:comment.user_name} /></InitialsPicture>
                            </div>
                        </div>
                        <div className="dr-profile">
                            {
                                comment.author?
                                <a className="dr-name" href={comment.author && comment.author.url?`/${comment.author.url}`:`/opd/doctor/${comment.author.id}`} onClick={(e) => this.authorClick(comment, e) }><h1 className={`dr-name ${comment.author?'comments-rply':''}`} >{comment.author?`Dr. ${comment.author.name}`:comment.user_name }<div className="cmnt-rply-txt" onClick={(e)=>e.stopPropagation()}><span onClick={(e)=>e.preventDefault()} className="rply-spn">{comment.author?'(author)':''}</span><img onClick={(e)=>e.preventDefault()} className="img-rply" src={ASSETS_BASE_URL + "/img/reply.svg"} /><span onClick={(e)=>e.preventDefault()} className="rply-sndr">{ parentName}</span></div></h1></a>
                                :<h1 className="dr-name" onClick={(e) => this.authorClick(comment, e)}>{comment.user_name }<div className="cmnt-rply-txt" onClick={(e)=>e.stopPropagation()}><img className="img-rply" src={ASSETS_BASE_URL + "/img/reply.svg"} /><span className="rply-sndr">{ parentName}</span></div></h1>   
                            }
                            <h2 className="add-details">{comment.submit_date?new Date(comment.submit_date).toDateString():'No Date Available'}</h2>
                        </div>
                    </div>
                    <p className="usr-comments-para">{comment.comment}
                    </p>
                    {
                        this.props.replyOpenFor == comment.id?''
                        :<div className="text-right" onClick = {this.replyClicked.bind(this,comment)}>
                            <span className="comments-rply">Reply</span>
                        </div>
                    }
                    
                    {
                        this.props.replyOpenFor == comment.id?
                        this.props.isUserLogin?
                            <div className="comments-post-input">
                                <input type="text" onChange={this.props.handleInputComment.bind(this)} />
                                <button className="comments-post-btns" onClick={this.props.postReply.bind(this)}>Post</button>
                            </div>
                            :<CommentBox {...this.props} {...this.state} parentCommentId = {comment.id} getArticleData={this.props.hospitalPage?()=>{}:this.props.getArticleData.bind(this)}/>
                        :''   
                    }
                    
                </div>                
            </div>
        	{
				comment.children && comment.children.length?
					comment.children.map((child, key) =>{
						return <Comment key={child.id} {...self.props} childData = {child} parentComment={comment}/>
					})
					:''
			}
    	</div>
            )
    }

}

export default Comment