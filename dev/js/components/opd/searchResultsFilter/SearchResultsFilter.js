import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";

import Radio, { RadioGroup } from 'material-ui/Radio';
import Checkbox from 'material-ui/Checkbox';
import { FormLabel, FormControl, FormControlLabel, FormHelperText } from 'material-ui/Form';


class SearchResultsFilter extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            fee_0: false,
            fee_1: false,
            fee_2: false,
            fee_3: false,
            gender: 'any',
            clinic_personal: false,
            clinic_hospital: false,
            clinic_multi: false,
            available_today: false,
            distance: '30km'
        }
    }

    componentDidMount() {
        this.setState({ ...this.props.filterCriteria })
    }

    applyFilter() {
        this.props.setOPDFilters(this.state)
        this.props.history.go(-1)
    }

    handleCheckbox(name, e) {
        this.setState({ [name]: e.target.checked })
    }

    handleChangeRadio(name, e) {
        this.setState({ [name]: e.target.value })
    }

    render() {

        return (
            <div className="searchResultsFilter">
                <div className="subFilter">
                    <p className="subHeading">Fee</p>
                    <RadioGroup
                        aria-label="fee"
                        name="fee1"
                    >
                        <FormControlLabel control={<Checkbox
                            checked={this.state.fee_0}
                            onChange={this.handleCheckbox.bind(this, 'fee_0')}
                        />} label="Less than 300" />
                        <FormControlLabel control={<Checkbox
                            checked={this.state.fee_1}
                            onChange={this.handleCheckbox.bind(this, 'fee_1')}
                        />} label="300 to 500" />
                        <FormControlLabel control={<Checkbox
                            checked={this.state.fee_2}
                            onChange={this.handleCheckbox.bind(this, 'fee_2')}
                        />} label="500 to 1000" />
                        <FormControlLabel control={<Checkbox
                            checked={this.state.fee_3}
                            onChange={this.handleCheckbox.bind(this, 'fee_3')}
                        />} label="1000+" />
                    </RadioGroup>
                </div>

                <div className="subFilter">
                    <p className="subHeading">Distance</p>
                    <RadioGroup
                        aria-label="Distance"
                        name="Distance2"
                        value={this.state.distance}
                        onChange={this.handleChangeRadio.bind(this, 'distance')}
                    >
                        <FormControlLabel value="30km" control={<Radio color="primary" />} label="Under 30 KM" />
                        <FormControlLabel value="20km" control={<Radio color="primary" />} label="Under 20 KM" />
                        <FormControlLabel value="10km" control={<Radio color="primary" />} label="Under 10 KM" />
                        <FormControlLabel value="5km" control={<Radio color="primary" />} label="Under 5 KM" />

                    </RadioGroup>
                </div>

                <div className="subFilter">
                    <p className="subHeading">Type Of Clinic</p>
                    <RadioGroup
                        aria-label="clinicType"
                        name="clinicType"
                    >
                        <FormControlLabel control={<Checkbox
                            checked={this.state.clinic_personal}
                            onChange={this.handleCheckbox.bind(this, 'clinic_personal')}
                        />} label="Personal" />
                        <FormControlLabel control={<Checkbox
                            checked={this.state.clinic_hospital}
                            onChange={this.handleCheckbox.bind(this, 'clinic_hospital')}
                        />} label="Hospital" />
                        <FormControlLabel control={<Checkbox
                            checked={this.state.clinic_multi}
                            onChange={this.handleCheckbox.bind(this, 'clinic_multi')}
                        />} label="Multi-doctor clinic" />
                    </RadioGroup>
                </div>

                <div className="subFilter">
                    <p className="subHeading">Gender</p>
                    <RadioGroup
                        aria-label="gender"
                        name="gender2"
                        value={this.state.gender}
                        onChange={this.handleChangeRadio.bind(this, 'gender')}
                    >
                        <FormControlLabel value="any" control={<Radio color="primary" />} label="Any" />
                        <FormControlLabel value="male" control={<Radio color="primary" />} label="Male" />
                        <FormControlLabel value="female" control={<Radio color="primary" />} label="Female" />

                    </RadioGroup>
                </div>

                <div className="subFilter">
                    <p className="subHeading">Availability</p>
                    <RadioGroup
                        aria-label="availability"
                        name="availability"
                    >
                        <FormControlLabel control={<Checkbox
                            checked={this.state.available_today}
                            onChange={this.handleCheckbox.bind(this, 'available_today')}
                        />} label="Avialable Today" />label="Multi-doctor clinic" />
                    </RadioGroup>
                </div>

                <button className="applyFilter" onClick={this.applyFilter.bind(this)}>Apply</button>

            </div>
        );
    }
}


export default withRouter(SearchResultsFilter)
