import React from 'react';

class ReportList extends React.Component {
    constructor(props) {
        super(props)
    }


    render() {

        let { name, sub_name, abbreviation, category, slot  } = this.props.data
        slot = slot || {
            start: 0,
            end: 0
        }
        let date = new Date(slot.start).toDateString()

        return (
            <div className="appointment">
                <div className="details">
                    <p>
                        {name + " , " + sub_name}
                    </p>
                    <p>
                        {category + " , " + abbreviation}
                    </p>
                    <p>
                        {date}
                    </p>
                </div>
                <div className="book">
                    <span className="viewreport">View Report</span>
                </div>
            </div>
        );
    }
}


export default ReportList
