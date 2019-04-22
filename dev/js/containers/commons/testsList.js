import React from 'react'
import { connect } from 'react-redux'
import TestsListView from '../../components/commons/testsList/testsListView';

class TestsList extends React.Component {

    componentDidMount() {

    }

    render() {

        return (
            <TestsListView {...this.props} />
        )
    }
}

const mapStateToProps = (state) => {
    const {

    } = state

    return {

    }
}


const mapDispatchToProps = (dispatch) => {

    return {

    }

}

export default connect(mapStateToProps, mapDispatchToProps)(TestsList)