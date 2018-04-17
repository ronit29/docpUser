import React from 'react';

import LabProfileCard from '../../commons/labProfileCard/index.js'

class LabsList extends React.Component {
    constructor(props) {
        super(props)
    }

    static contextTypes = {
        router: () => null
    }

    render() {

        let { LABS, labList } = this.props
        
        return (
            <div className="doctorsList">
                {
                    labList.map((labId, i) => {
                        return <LabProfileCard details={LABS[labId]} key={i}/>
                    })
                }
            </div>
        );
    }
}


export default LabsList
