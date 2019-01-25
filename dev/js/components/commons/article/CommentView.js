import React from 'react'
import CommentBox from './ArticleCommentBox.js'

class CommentDialogView extends React.Component{

	getAllComments(){
		return (<div className="widget mrb-15 mrng-top-12">
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
                    <div className="text-right" onClick = {this.props.commentReplyClicked.bind(this,'id')}>
                        <span className="comments-rply">Reply</span>
                    </div>
                    {
                        this.props.parentCommentId == 'id1'?
                        this.props.isUserLogin?
                            <CommentBox {...this.props} {...this.state} getArticleData={this.props.getArticleData.bind(this)}/>
                            :<div className="comments-post-input">
                                <input type="text" onChange={this.props.handleInputComment.bind(this)} />
                                <button className="comments-post-btns" onClick={this.props.postReply.bind(this)}>Post</button>
                            </div>
                        :''   
                    }
                    
                </div>
            </div>)
	}
	render(){
		let self = this
		return(
			<div>
				{
					this.props.commentData.children.map((comment,key)=> {
						self.getAllComments()
					})
					//this.getAllComments()
				}
			</div>
		)
	}
}

export default CommentDialogView
	