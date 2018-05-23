import React from 'react';

class SelectedClinic extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {

        // let { selectedDoctor, selectedClinic } = this.props

        // let clinicData = selectedDoctor.availability.filter((clinic) => {
        //     return clinic.id == selectedClinic
        // })[0]

        return (
            <div className="widget mrt-10 ct-profile skin-white">
                <div className="widget-header dr-qucik-info">
                    <img src="/assets/img/customer-icons/user.png" className="img-fluid" />
                    <div className="dr-profile">
                        <h4 className="dr-name">Dr. Stephny Ray</h4>
                        <p className="desg">MBBS, MD - Genral Medicine General Physician</p>
                        <h4 className="dr-name clinic-name mrt-10 text-sm">Apollo Clinic</h4>
                    </div>
                </div>
            </div>
        );
    }
}


export default SelectedClinic
