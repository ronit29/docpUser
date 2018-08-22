import React from 'react';
import { connect } from 'react-redux';
const queryString = require('query-string');

import { agentLogin } from '../../actions/index.js'
import Loader from '../../components/commons/Loader'

class AgentLogin extends React.Component {
    constructor(props) {
        super(props)
    }

    static contextTypes = {
        router: () => null
    }

    componentDidMount() {
        const parsed = queryString.parse(this.props.location.search)
        if (parsed.token) {
            this.props.agentLogin(parsed.token, () => {
                setTimeout(() => {
                    this.props.history.push('/')
                }, 100)
            })
        } else {
            this.props.history.push('/')
        }
    }

    render() {

        return (
            <Loader />
        );
    }
}

const mapStateToProps = (state) => {
    let {

    } = state.AUTH

    return {

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        agentLogin: (token, cb) => dispatch(agentLogin(token, cb))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(AgentLogin);
