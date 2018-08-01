import React from 'react';
import { connect } from 'react-redux';

import { } from '../../actions/index.js'

import StaticPagesView from '../../components/commons/staticPages'

class StaticPages extends React.Component {
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
            <StaticPagesView {...this.props} />
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


export default connect(mapStateToProps, mapDispatchToProps)(StaticPages);
