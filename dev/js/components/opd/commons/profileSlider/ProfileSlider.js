import React from 'react';
import EmotiIcon from 'material-ui-icons/AccountCircle';

class ProfileSlider extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount(){
        
    }

    render() {

        return (
            <div className="profileSlider">
                <div className="slideTile">
                    <EmotiIcon className="profileCardImage"/>
                </div>
            </div>
        );
    }
}


export default ProfileSlider
