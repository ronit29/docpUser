import React from 'react';
import { connect } from 'react-redux';

import { } from '../../actions/index.js'

import PrimeCareView from '../../components/commons/primeCare/primeCareView.js'

class primeCare extends React.Component {
    constructor(props) {
        super(props)
    }

    static contextTypes = {
        router: () => null
    }

    componentDidMount() {

    }

    render() {

        return (
            <PrimeCareView {...this.props} />
        );
    }
}

const mapStateToProps = (state) => {
    return {

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(primeCare);
