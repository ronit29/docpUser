import React from 'react';

class MedicalDetails extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {

        return (
            <section className="myProfile profile-details">
                <div className="widget-panel">
                    <h4 className="panel-title">Medical History</h4>
                    <div className="panel-content pd-0">
                        {/* <table className="table">
                            <thead>
                                <tr>
                                    <th>Disease</th>
                                    <th>Status</th>
                                    <th>Tenure</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Diabetes</td>
                                    <td><label className="radio-inline"><input type="radio" name="optradio" /> Yes</label></td>
                                    <td>
                                        <select className="fc-input input-xs">
                                            <option>2 Years</option>
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Hypertension</td>
                                    <td><label className="radio-inline"><input type="radio" name="optradio" /> Yes</label></td>
                                    <td>
                                        <select className="fc-input input-sm">
                                            <option>2 Years</option>
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Asthma</td>
                                    <td><label className="radio-inline"><input type="radio" name="optradio" /> Yes</label></td>
                                    <td>
                                        <select className="fc-input input-sm">
                                            <option>2 Years</option>
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Heart</td>
                                    <td><label className="radio-inline"><input type="radio" name="optradio" /> Yes</label></td>
                                    <td>
                                        <select className="fc-input input-sm">
                                            <option>2 Years</option>
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Ailment</td>
                                    <td><label className="radio-inline"><input type="radio" name="optradio" /> Yes</label></td>
                                    <td>
                                        <select className="fc-input input-sm">
                                            <option>2 Years</option>
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Anaemia</td>
                                    <td><label className="radio-inline"><input type="radio" name="optradio" /> Yes</label></td>
                                    <td>
                                        <select className="fc-input input-sm">
                                            <option>2 Years</option>
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Depression</td>
                                    <td><label className="radio-inline"><input type="radio" name="optradio" /> Yes</label></td>
                                    <td>
                                        <select className="fc-input input-sm">
                                            <option>2 Years</option>
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Allergies</td>
                                    <td><label className="radio-inline"><input type="radio" name="optradio" /> Yes</label></td>
                                    <td>
                                        <select className="fc-input input-sm">
                                            <option>2 Years</option>
                                        </select>
                                    </td>
                                </tr>
                            </tbody>
                        </table> */}
                    </div>
                </div>
            </section>
        );
    }
}


export default MedicalDetails
