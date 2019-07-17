import React from 'react'

const MONTHS = ['Jan', 'Feb', 'Mar', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
const WEEK_DAYS = ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat']

class DateSelector extends React.Component {

	render(){

		return(
			<div className="ipd-db-selects">
				<select>
					<option value="" disabled selected>Date</option>
					<option value="">1</option>
				</select>
				<select>
					<option value="" disabled selected>Month</option>
					<option value="">Jan</option>
				</select>
				<select>
					<option value="" disabled selected>Year</option>
					<option value="">1990</option>
				</select>
			</div>
			)
	}
}

export default DateSelector