import React from 'react'
import { connect } from 'react-redux'
import { } from '../../actions/index.js'
import STORAGE from '../../helpers/storage';
import HelmetTags from '../../components/commons/HelmetTags'
const queryString = require('query-string');
import Disclaimer from '../../components/commons/Home/staticDisclaimer.js'

class cancelPolicyApp extends React.Component {

	componentDidMount() {
		

	}
	render() {

		let is_insurance_applicable
		const parsed = queryString.parse(this.props.location.search)
		if(parsed.is_user_insured){
			is_insurance_applicable = parsed.is_user_insured
		}
		return ( 
			<div className="container about-container">
                <HelmetTags tagsData={{
                    title: ('Cancel Policy | docprime'),
                    description: ('docprime: docprime is one stop health care solution for patients and doctors. Patients can book doctors online and doctors can manage patients online.')
                }} />
                <div className="row">
                    <div className="col-12">
                        <div className="cancel-policy-text" style={{paddingTop: 0}}>
                            <ul className="booking-cancel">
			                    {
			                        is_insurance_applicable == 'true'?
			                            <React.Fragment>
			                                <li>
			                                    <strong>For Online Paid Appointments -</strong> You can cancel your scheduled appointment at any time rishab.
			                                </li>
			                                <li>
			                                    <strong>In Case of A No Show (Patient Unavailable) -</strong> In the event, the services are not availed at the appointed date and time. We will automatically cancel your appointment at 12:00 midnight of the date followed by the appointment date.
			                                </li>
			                                <li>
			                                    <strong>Third Party Cancellation (Provider Unavailable) - </strong>Occasionally, appointments may be canceled or postponed due to unavailability of the service provider. Should this occur, we will contact or inform you and you may reschedule your appointment as per your convenience.
			                                </li>
			                            </React.Fragment>
			                        :
			                            <React.Fragment>
			                                <li>
			                                    <strong>For Online Paid Appointments -</strong> You can cancel your scheduled appointment and initiate the immediate refund at any time. Immediate refund shall be subject to terms and conditions as described under this section mentioned below.
			                                </li>
			                                <li>
			                                    <strong>In Case of A No Show (Patient Unavailable) -</strong> In the event, the services are not availed at the appointed date and time. We will automatically cancel your appointment at 12:00 midnight of the date followed by the appointment date.
			                                </li>
			                                <li>
			                                    <strong>Third Party Cancellation (Provider Unavailable) -</strong> Occasionally, appointments may be canceled or postponed due to unavailability of the service provider. Should this occur, we will contact or inform you and you may reschedule your appointment as per your convenience.
			                                </li>
			                                <li>
			                                    <strong>24 Hours Cancellation -</strong> Cancellation is allowed for all the appointments. In such cases, we will initiate the immediate refund of your money as per the process defined under Refund, Rescheduling, and Cancellation section of the  <u style={{color: `var(--text--primary--color)` ,cursor:'pointer',display:'inline-block'}} onClick={() =>this.props.history.push('/terms?forBookingScroll=true')}>End User Agreement.</u>
			                                </li>
			                            </React.Fragment>
			                    }
               			 	</ul>
                        </div>
                    </div>
                </div>
                <Disclaimer />
            </div>
		)
	}
}

const mapStateToProps = (state, passedProps) => {

	return {
	}
}

const mapDispatchToProps = (dispatch) => {

	return {
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(cancelPolicyApp)