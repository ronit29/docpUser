import React from 'react';
import { connect } from 'react-redux';

class AboutDoctor extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {

        return (
            <div className="aboutDoctor">
                <h5>About Dr. Steve Ray</h5>
                <p>Lorem ipsum dolor sit amet, dolor ut vestibulum blandit, turpis fusce. Labore potenti vivamus odio arcu vestibulum. Hendrerit nulla consectetuer tristique ante leo, ullamcorper cursus rutrum </p>
            </div>
        );
    }
}


export default AboutDoctor
