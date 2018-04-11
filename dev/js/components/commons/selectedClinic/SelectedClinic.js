import React from 'react';

class SelectedClinic extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    static contextTypes = {
        router: () => null
    }

    render() {

        let { selectedDoctor, selectedClinic } = this.props

        let clinicData = selectedDoctor.availability.filter((clinic) => {
            return clinic.id == selectedClinic
        })[0]

        return (
            <div className="selectedClinic">
                <h5>Selected Clinic</h5>
                <span className="clinicName">{ clinicData.name + ", " + clinicData.address }</span>
                <span className="fee">Fee: Rs.{clinicData.nextAvailable[0].fee.amount}</span>
            </div>
        );
    }
}


export default SelectedClinic
