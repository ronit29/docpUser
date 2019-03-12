import React from 'react'

class InsuranceCommon extends React.Component{
	constructor(props) {
        super(props)
        this.state = {
        	selectedProfile:'',
        	selected_plan_price:''
        }
    }
    componentDidMount(){
    	let self = this
    	this.setState({selectedProfile:this.props.USER.selectedProfile, selected_plan_price:this.props.selected_plan.amount, ...self.props.self_data_values[this.props.USER.selectedProfile]})
    }
	render(){
		return (
		<div> 
			<div className="ins-card-head">
				<div className="ins-name-head">
					<img width="140" src={this.props.selected_plan.logo} />
					{/*<p>
						OPD Insurance by <span>{this.props.selected_plan.plan_name}</span>
					</p>*/}
					<p>
						Group Out-patient Insurance
					</p>
				</div>
				<div className="ins-pdf-dwnload">
					<a href={this.props.selected_plan.insurer_document} target="_blank">
					<img src={ASSETS_BASE_URL + "/img/pdf-dwn.png"} />
					</a>
					<span>
						Policy Details
					</span>
				</div>
			</div>
			<div className="insurance-form-page">
				<table className="table table-bordered insurance-tbl insurance-checkboxes">
					<thead>
						<tr>
							<th className="tbl-first-head"><p>Coverage (1 Year)</p></th>
							<th className="tbl-second-head"><p>Annual Premium</p></th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td><p className="ins-dtls-members-edit">{this.props.is_edit?'Change Insured Plan':'Insured Member Details'}   
							<span style={{ 'cursor': 'pointer' }} onClick={()=>{this.props.is_edit?this.props.history.push('/insurance'):this.props.history.push('/insurancedetails')}}>EDIT
							</span></p></td>
							<td></td>
						</tr>
						<tr>
							<td>
								<label className="ck-bx" htmlform="test11" style={{'fontWeight': '400', 'fontSsize': '14'}}>{this.props.selected_plan.name}
								<input type="checkbox" defaultChecked className="ins-chk-bx" value="" id="test11" name="fruit-1" />
								<span className="checkmark"></span></label>
							</td>
							
							<td><span>₹ {this.props.selected_plan.amount}</span></td>
						</tr>
					</tbody>
				</table>
			</div>
			{/*<div className="ins-gst-ribbon-section">
				<p className="ins-gst">inclusive of 18% GST</p>
			</div>*/}
			<div className="ins-status-container">
				<div className="navigation_menu" id="">
					<ul className="navigation_tabs" id="">
						<li className="tab_inactive">
							<a href="#">Select Premium</a>
						</li>
						<li className="tab_inactive">
							<a href="#">Fill Details</a>
						</li>
						<li className="tab_disabled">
							<a href="#">Payment</a>
						</li>
					</ul>
				</div>
			</div>
		</div>)	
			}
}
export default InsuranceCommon