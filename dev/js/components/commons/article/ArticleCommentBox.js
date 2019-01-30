import React from 'react'
import STORAGE from '../../../helpers/storage';
import SnackBar from 'node-snackbar'

class CommmentView extends React.Component{
	
	constructor(props){
		super(props)
		this.state = {
			name: '',
			email: '',
			comment: ''
		}
	}

	inputHandler(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

	postReply(e){
		e.preventDefault()
		if(!this.state.comment){
            setTimeout(() => {
                    SnackBar.show({ pos: 'bottom-center', text: "Please write valid comment" })
                }, 500)
            return
        }
		let postData = {
			article: this.props.articleData.id,
			comment: this.state.comment,
			name: Object.values(this.props.profiles).length && this.props.profiles[this.props.defaultProfile]?this.props.profiles[this.props.defaultProfile].name:this.state.name,
			email: Object.values(this.props.profiles).length && this.props.profiles[this.props.defaultProfile]?this.props.profiles[this.props.defaultProfile].email:this.state.email,
			parent: this.props.parentCommentId 
		}
		this.props.postComment(postData, (error, data)=> {
			if(data){
				this.setState({comment:'', name:'',email: '' })
				this.props.getArticleData()
				setTimeout(() => {
                    SnackBar.show({ pos: 'bottom-center', text: "Comment Posted Sucessfully, Awaiting moderation" })
                }, 500)
			}else{
				setTimeout(() => {
	                SnackBar.show({ pos: 'bottom-center', text: "Could not post your comment, Try again!" })
	            }, 500)
			}
		})
		return
	}

	render(){

		return(
			<form>
				<div className="comments-section-form">
					{
						Object.values(this.props.profiles).length || STORAGE.checkAuth()?
						<div className="row no-gutters">
							<div className="col-12">
								{
									this.props.commentsExists?''
									:<h1 className="cmnt-static"><img src = {ASSETS_BASE_URL+"/img/chatComment.svg"} />Leave a Comment</h1>	
								}
								<div className="labelWrap">
									<div className="labelWrap">
										<textarea style={{ height: '100px' }} id="ftext" className="fc-input" name="comment" type="text" required value = {this.state.comment} onChange={this.inputHandler.bind(this)}></textarea>
										<label htmlFor="ftext">Your Comment</label>
									</div>
								</div>
							</div>
						</div>
						:<div className="row no-gutters">
							<div className="col-12">
								{
									this.props.commentsExists?''
									:<h1 className="cmnt-static"><img src = {ASSETS_BASE_URL+"/img/chatComment.svg"} />Leave a Comment</h1>	
								}
								
								<div className="labelWrap">
									<div className="labelWrap">
										<textarea style={{ height: '100px' }} id="ftext" className="fc-input" name="comment" type="text" value = {this.state.comment} required  onChange={this.inputHandler.bind(this)}></textarea>
										<label htmlFor="ftext">Your Comment</label>
									</div>
								</div>
							</div>
							<div className="col-12">
								<div className="labelWrap">
									<input id="fname" className="fc-input" name="name" value = {this.state.name} type="text" required onChange={this.inputHandler.bind(this)}/>
									<label htmlFor="fname">Name</label>
								</div>
							</div>
							<div className="col-12">
								<div className="labelWrap">
									<input id="fmail" className="fc-input" name="email" value = {this.state.email} type="text" required onChange={this.inputHandler.bind(this)}/>
									<label htmlFor="fmail">Email</label>
								</div>
							</div>
						</div>	
					}
					<div className="commnets-sbmt-btn">
						<button className="cmnts-btn" onClick= {this.postReply.bind(this)}>{this.props.commentsExists?'Reply':'Post Comment'}</button>
					</div>
				</div>
			</form>
			)
	}
}

export default CommmentView