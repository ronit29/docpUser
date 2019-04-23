import React from 'react'
import { connect } from 'react-redux'
import TestsListView from '../../components/commons/testsList/testsListView';
import { getTestsAlphabetically } from '../../actions/index.js'

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
        alphabeticalTests,
        selectedAlphabet
    } = state.SITE_MAP

    return {
        alphabeticalTests,
        selectedAlphabet
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        getTestsAlphabetically: (character) => dispatch(getTestsAlphabetically(character))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TestsList)