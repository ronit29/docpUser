import React from 'react';
import { connect } from 'react-redux';

import { } from '../../actions/index.js'

import NotFoundView from '../../components/commons/notFound'

class NotFound extends React.Component {
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
            <NotFoundView {...this.props} />
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


export default connect(mapStateToProps, mapDispatchToProps)(NotFound);
