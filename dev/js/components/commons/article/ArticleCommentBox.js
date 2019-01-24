import React from 'react'
import STORAGE from '../../../helpers/storage';


class CommmentView extends React.Component{

	render(){

		return(
			<form>
				<div className="comments-section-form">
					<div className="row no-gutters">
					{
						this.props.profiles.length?
						
					}
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
			)
	}
}

export default CommmentView