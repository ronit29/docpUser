import React from 'react'

class InsuranceCommon extends React.Component{
	constructor(props) {
        super(props)
        this.state = {
        	selectedProfile:'',
        	selected_plan_price:'',
        	toggle: 'one'

        }
    }
    componentDidMount(){
    	let self = this
    	this.setState({selectedProfile:this.props.USER.defaultProfile, selected_plan_price:this.props.selected_plan.amount, ...self.props.self_data_values[this.props.USER.defaultProfile]})
    }
	render(){
			return (
			<div> 
				<div className="ins-card-head">
					<div className="ins-name-head">
						<img width="120" src={this.props.insurnaceData['insurance'][0].logo} />
						{/*<p>
							OPD Insurance by <span>{this.props.insurnaceData['insurance'][0].name}</span>
						</p>*/}
						<p>
							Group Out-patient Insurance
						</p>
					</div>
					<div className="ins-pdf-dwnload">
						<a href={this.props.insurnaceData['insurance'][0].insurer_document} download target="_blank" >
						<img src={ASSETS_BASE_URL + "/img/pdf-dwn.png"} />
						</a>
						<span>
							Policy Details
						</span>
					</div>
				</div>
				{
					this.props.isSelectPlan?
					<div className="ins-swich-tabs-container">
						<div className="ins-tabs">
							<ul>
								<li onClick={()=> this.setState({toggle:'one'})}>
									<p className={this.state.toggle == "one"?'active':'ins-tab-inactive'} >Salient Features</p>
								</li>
								<li onClick={()=> this.setState({toggle:'two'})}>
									<p className={this.state.toggle == "two"?'active ':'ins-tab-inactive'} >What's not Covered?</p></li>
							</ul>
						</div>
						<div className="ins-tabs-content">
							<div>													
								{
									this.state.toggle == "one"?
									Object.values(this.props.insurnaceData['insurance'][0].plans).filter(x=>x.id==this.props.is_checked).map((selected_plan,i) => {
										return (<ul key={i}>
										{selected_plan.content['salient_features'].map((result, i) => { 
												return <li key={i}>
												<p>{result}</p>
												</li>})
										}
										</ul>)					
									})
									:Object.values(this.props.insurnaceData['insurance'][0].plans).filter(x=>x.id==this.props.is_checked).map((selected_plan,i) => {
										return (<ul key={i}>
										{selected_plan.content['whats_not_covered'].map((result, i) => { 
													return <li key={i}>
													<p>{result}</p>
													</li>})
										}	
										</ul>)					
									}) 
						        }
						        {this.state.toggle == 'one'?
						        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
									<a style={{paddingLeft: '12px',fontWeight: '500',fontSize: '12px',color:'#f78631',textDecoration: 'underline',cursor: 'pointer'}} href={this.props.insurnaceData['insurance'][0].insurer_document} download target="_blank" id="terms_condition">T&C apply</a>
									<a style={{paddingRight: '12px',fontWeight: '500',fontSize: '12px',color:'#f78631',textDecoration: 'underline',cursor: 'pointer'}} href='/insurance/network' onClick={(e)=>{
										e.preventDefault();
										this.props.history.push('/insurance/network')
									}}>View Network</a>
						        </div>
						        :''
						        }	
							</div>												
						</div>
					</div>
				:''
				}
				{
					!this.props.isSelectPlan?
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
									<span style={{ 'cursor': 'pointer' }} onClick={()=>{this.props.is_edit?this.props.history.push('/insurance/insurance-plans'):this.props.history.push('/insurance/insurance-user-details')}}>EDIT
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
				:''
				}
				<div className="ins-status-container">
					<div className="navigation_menu" id="">
						<ul className="navigation_tabs" id="">
							<li className="tab_inactive">
								<a href="#">Select Premium</a>
							</li>
							<li className={this.props.isSelectPlan?'':'tab_inactive'}>
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