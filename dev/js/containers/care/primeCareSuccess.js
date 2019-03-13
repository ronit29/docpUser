import React from 'react';
import { connect } from 'react-redux';

import { } from '../../actions/index.js'

import PrimeCareSuccessView from '../../components/commons/primeCare/primeCareBookingView.js'

class primeCareSuccess extends React.Component {
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
            <PrimeCareSuccessView {...this.props} />
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


export default connect(mapStateToProps, mapDispatchToProps)(PrimeCareSuccessView);
