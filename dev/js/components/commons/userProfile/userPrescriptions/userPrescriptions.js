import React from 'react'
import PrescriptionCard from './PrescriptionCard'

class UserPrescriptionList extends React.Component{

	componentDidMount(){
		if(this.props.USER.primaryMobile){
			this.props.getUserPrescription(this.props.USER.primaryMobile);
		}
	}

	render(){
		
		return(
			<div>
			{
				(this.props.USER.userPrescriptions && this.props.USER.userPrescriptions.data)?
					this.props.USER.userPrescriptions.data.prescriptions.map((prescription,index)=>{		
						return <PrescriptionCard {...prescription} />		
					})	
					:''
			}
			</div>
			)
	}
}
export default UserPrescriptionList