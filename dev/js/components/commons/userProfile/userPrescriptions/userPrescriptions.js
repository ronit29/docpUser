import React from 'react'
import PrescriptionCard from './PrescriptionCard'

class UserPrescriptionList extends React.Component{

	componentDidMount(){
		if(this.props.USER.primaryMobile){
			this.props.getUserPrescription(this.props.USER.primaryMobile);
		}
	}

	render(){console.log('aaaaaaaaaaaaaaaaaaaaaa');console.log(this.props)
		
		return(
			<div>
			{
				this.props.USER.userPrescriptions.length?
					this.props.USER.userPrescriptions.map((prescription,index)=>{		
						<PrescriptionCard {...prescription} />		
					})	
					:<PrescriptionCard/>
			}
			</div>
			)
	}
}
export default UserPrescriptionList