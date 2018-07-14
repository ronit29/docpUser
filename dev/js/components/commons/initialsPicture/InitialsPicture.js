import React from 'react';

const COLOR_CODES = [
    
]

class InitialsPicture extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        let initial = "US"
        let name = this.props.name
        if (name && name.length) {
            name = name.split(' ')
            if (name[0]) {
                initial = name[0][0]
            }
            if (name[1]) {
                initial += name[1][0]
            }
        }
        return (
            <div className="initialsPicture">
                <span>{initial.toUpperCase()}</span>
            </div>

        );
    }
}

export default InitialsPicture
