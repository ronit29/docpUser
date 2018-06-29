import React from 'react';

import Loader from '../../Loader'
import ReportList from './reportList/index.js'

class UserReportsView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            type: this.props.match.params.type,
            id: this.props.match.params.id,
            reports: []
        }
    }

    componentDidMount() {
        this.setState({ loading: true })
        this.props.getAppointmentReports(this.state.id, this.state.type, (err, data) => {
            if (!err) {
                this.setState({ reports: data, loading: false })
            } else {
                this.setState({ loading: false })
            }
        })
    }

    render() {

        return (
            <div className="widget-content">
            {
                !this.state.loading ? (
                    this.state.reports.map((report,i) => {
                        return <img src={report.file} key={i} className="imageReports"/>
                    })
                 ) : <Loader />
            }
            </div>
        );
    }
}


export default UserReportsView
