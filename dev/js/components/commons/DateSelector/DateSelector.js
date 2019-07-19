import React from 'react'

const MONTHS = ['Jan', 'Feb', 'Mar', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
const WEEK_DAYS = ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat']

class DateSelector extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			selectedYear: 1940,
			selectedMonth:'Jan',
			selectedDate:'1',
			noOfDaysInMonth: 31
		}
	}

	componentDidMount(){
		if(this.props.onRef){
			this.props.onRef(this)
		}
	}

	selectOptions(type, val){
		this.setState({[type]: val}, ()=>{

			if(type.includes('selectedMonth') || type.includes('selectedYear')) {
				let days = this.daysInMonth()
				this.setState({ noOfDaysInMonth: days, selectedDate: this.state.selectedDate>days?1:this.state.selectedDate})

			}
		})
	}

	daysInMonth(){
		if(this.state.selectedYear && this.state.selectedMonth){
			let month = MONTHS.indexOf(this.state.selectedMonth)
			return new Date(this.state.selectedYear,month+1 , 0).getDate()
		}else {
			return 30;
		}
	}

	getSelectedDate(){
		let data = {
			year: this.state.selectedYear,
			month: MONTHS.indexOf(this.state.selectedMonth)+1,
			day: this.state.selectedDate
		}
		this.props.getSelectedDate(data)
	}

	render(){
		let currentYear = new Date().getFullYear()
		return(
			<div className="ipd-db-selects">
				<select style={{textIndent:'12px'}} defaultValue={this.state.selectedDate.toString()} onChange={ (e)=> this.selectOptions('selectedDate', e.target.value)}>
					<option defaultValue="" disabled >Date</option>
					{
						[...Array(this.state.noOfDaysInMonth).keys()].map((year, key)=>{
							return <option key={key} defaultValue="">{key+1}</option>
						})
					}
				</select>
				<select style={{textIndent:'4px'}} defaultValue={this.state.selectedMonth} onChange={ (e)=> this.selectOptions('selectedMonth', e.target.value)}>
					{
						MONTHS.map((month, i)=>{
							return <option defaultValue="" key={i} >{month}</option>
						})
					}
					
				</select>
				<select defaultValue={this.state.selectedYear} onChange={ (e)=> this.selectOptions('selectedYear', e.target.value)}>
					<option defaultValue="" disabled >Year</option>
					{
						[...Array(80).keys()].map((year, key)=>{
							return <option key={key} defaultValue="">{currentYear-80+key+1}</option>
						})
					}
				</select>
			</div>
			)
	}
}

export default DateSelector