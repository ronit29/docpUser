import React from 'react';
import { connect } from 'react-redux';
import { } from '../../../actions/index.js'

import LeftBarView from './LeftBar'

class LeftBar extends React.Component {
    constructor(props) {
        super(props)
    }

    static contextTypes = {
        router: () => null
    }

    render() {

        return (
            <LeftBarView {...this.props} />
        );
    }
}

const mapStateToProps = (state) => {
    let { profile } = state.USER
    return {

    }
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LeftBar);
