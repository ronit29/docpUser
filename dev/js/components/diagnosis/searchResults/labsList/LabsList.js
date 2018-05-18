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
            <section className="wrap search-book-result">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            {
                                labList.map((labId, i) => {
                                    return <LabProfileCard {...this.props} details={LABS[labId]} key={i} />
                                })
                            }
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}


export default LabsList
