import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";

import Radio, { RadioGroup } from 'material-ui/Radio';
import { FormLabel, FormControl, FormControlLabel, FormHelperText } from 'material-ui/Form';


class SearchResultsFilter extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount(){
        console.log(this.props)
        // debugger
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
                        <FormControlLabel value="Less than 300" control={<Radio />} label="Less than 300" />
                        <FormControlLabel value="300 to 500" control={<Radio />} label="300 to 500" />
                        <FormControlLabel value="500 to 1000" control={<Radio />} label="500 to 1000" />
                        <FormControlLabel value="1000+" control={<Radio />} label="1000+" />
                    </RadioGroup>
                </div>
                
            </div>
        );
    }
}


export default withRouter(SearchResultsFilter)
