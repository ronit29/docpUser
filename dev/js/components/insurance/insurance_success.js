import React from 'react'
import ProfileHeader from '../../components/commons/DesktopProfileHeader'
import ChatPanel from '../../components/commons/ChatPanel'
import SnackBar from 'node-snackbar'


class InsuranceFaq extends React.Component{
	constructor(props) {
        super(props)
        this.state = {
        	// selectedProfile:'',
        	// selected_plan_price:'',
        	// is_edit:false,
        	// gst: 'inclusive of 18% GST',
        	no_disease:false,
        	disease_selected:{

        	}
        }
    }
    componentDidMount(){
    	var url_string = window.location.href;
		var url = new URL(url_string);
		var member_list_id = url.searchParams.get("id");
		if(member_list_id !== null){
			this.props.getInsuranceMemberList(member_list_id)
		}	
    }
    handleChange(member_id,disease_id,event) {
    	let disease_selected = this.state.disease_selected
    	if(disease_selected[member_id]){
    		if(disease_selected[member_id].indexOf(disease_id)>-1){
    			disease_selected[member_id] = disease_selected[member_id].filter(x=>x!=disease_id)	
    		}else{
    			disease_selected[member_id].push(disease_id)	
    		}
    	}else{
    		disease_selected[member_id] = []
    		disease_selected[member_id].push(disease_id)
    	}

    	this.setState({disease_selected: disease_selected})
  	}
  	toggleDiease() {
  		if(this.state.no_disease){
  			this.setState({no_disease:false})
  		}else{
  			this.setState({no_disease:true})
  		}
  	}
  	submitPlan(){
  	var member_list =[]
  	var member_list_new =[]
  	let member = {}
  	let member_new = {}
  	let abc = Object.entries(this.props.insured_member_list.members).map(function([key, value]) {	
  			let mem = {}
  			mem.id = value.id
  			mem.disease = []
  			this.props.insured_member_list.disease.map((val)=>{
  				mem.disease.push({id:val.id, response: false})
  				
  			})
  			member_list.push(mem)
		},this)
  	if(Object.keys(this.state.disease_selected).length > 0){
  		{Object.entries(this.state.disease_selected).map(function([disease_key, value]) {
  			member_new = {}
  			member_new.disease = []
  			{Object.entries(member_list).map(function([k, val]) {
  			if(val.id == disease_key){
  				member_new.id = disease_key
  				Object.entries(val.disease).map(function([keys, diseases]) {
  					let disea = diseases.id
  					if(value.indexOf(disea) !=-1){
  						member_new.disease.push({id:disea, response: true})
  					}else{
  						member_new.disease.push({id:disea, response: false})
  					}
  				})
  			}
  			})}
  			member_list_new.push(member_new)
		},this)}
		this.props.updateMemberList({"members":member_list_new},(resp) =>{
			this.props.history.push('/insurance/certificate')
		})
	}else if(this.state.no_disease){
		this.props.updateMemberList({"members":member_list},(resp) =>{
			this.props.history.push('/insurance/certificate')
		})
	}else{
		SnackBar.show({ pos: 'bottom-center', text: "Please provide input wherever applicable or select 'None for all' if none of the above is applicable." });
	}
  	}
    render(){
    	let self =  this
    	if(Object.keys(this.props.insured_member_list).length>0){
    	return <div className="profile-body-wrap">
            {/*<ProfileHeader /> */}
            <section className="container parent-section book-appointment-section text-center">
			<section className="section-margin-bottom congrats-space">
				<div className="widget cong-margin-btm">
					<div className="congratulation-section pb-0">
						<div className="cong-img">
							<img className="ins-input-img" src={ASSETS_BASE_URL + "/img/cong.png"} />
						</div>
						<div className="cong-content">
							<p className="cong-orng-para">Congratulations!</p>
							<p className="cong-blk-text">Group Out-patient Insurance policy has been issued. </p>
						</div>
					</div>
					<div className="ins-card-head pt-0" style={{justifyContent:'center'}}>
						<div className="ins-name-head certificate-width">
							<p>
								Covered by:
							</p>
							<img className="border-remove" width="140" src={this.props.insured_member_list.insurer_logo} />
						</div>
					</div>
				</div>
				<div className="widget">
					<div className="fnl-radio">
						<div className="ins-radio-table-container">
							<p className="ins-rd-fist">All set to go! Your policy has being issued. Just answer some important questions regarding the insured member(s) and you can download the COI</p>
							{/*<p className="ins-rd-second">Did anyone ever diagnose with the following disease?</p>*/}
						</div>
						<div className="ins-radio-main-table">
							<table className="table">
								<thead>
									<tr align="center">
										<th className="insurance-checkboxes text-left">
										<input type="checkbox" className="ins-chk-bx" checked={this.state.no_disease} id="test21" name="fruit-1" value="" /><label onClick={this.toggleDiease.bind(this)} htmlFor="test21" style={{'margin':0 ,'paddingLeft': 0}}>None for all</label>
										</th>
										{Object.entries(this.props.insured_member_list.members).map(function([key, value]) {
										return <th className="text-center" key={key} style={{'textTransform': 'capitalize'}}><p data-id={value.id}>{value.relation}</p></th>
										},this)}	
									</tr>
								</thead>
								<tbody>
									{Object.entries(this.props.insured_member_list.disease).map(function([key, disease_val]) {
										return <tr key={key}>
											<td><p>{disease_val.disease}</p></td>
											{Object.entries(this.props.insured_member_list.members).map(function([key, member_value]) {
											return <td key={key}>
											<label className="container-radio">

												<div className="insurance-checkboxes text-center">
													<input type="checkbox" className="ins-chk-bx" checked={this.state.disease} id={key} data-param='disease_selected' name={`disease_${member_value.id}_${disease_val.id}`} value="" 
													checked={this.state.disease_selected[member_value.id] && this.state.disease_selected[member_value.id].indexOf(disease_val.id)>-1?true:false}/><label 
													onClick={this.handleChange.bind(this,member_value.id,disease_val.id)} htmlFor="test21"></label>
											</div>

												
											</label>
											</td>
											},this)}
										</tr>
										},this)}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</section>
			<button className="congrats-btn v-btn p-3 v-btn-primary btn-lg fixed horizontal bottom no-round btn-lg text-lg static-btn" onClick={this.submitPlan.bind(this)}><p style={{fontWeight:'500', fontSize:'15px'}}>Submit & Download Certficate of Insurance</p>
			</button>
			</section>
			</div>
		}else{
			return <div></div>
		}
    }
}

export default InsuranceFaq