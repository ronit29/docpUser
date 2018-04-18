import React from 'react';

import LabDetails from '../commons/labDetails/index.js'
import OrderDetails from '../commons/orderDetails/index.js'

class LabProfileView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedLab : null
        }
    }

    componentDidMount() {
        let labId = this.props.match.params.id
        if (labId) {
            this.setState({selectedLab : labId})
            this.props.getLabById(labId)
        }
    }

    render() {

        return (
            <div className="doctorProfile">

                {
                    this.props.LABS[this.state.selectedLab] ?
                        <div>
                            <LabDetails data={this.props.LABS[this.state.selectedLab]} />
                            <OrderDetails data={this.props.LABS[this.state.selectedLab]} />
                        </div> : ""
                }

            </div>
        );
    }
}

export default LabProfileView
