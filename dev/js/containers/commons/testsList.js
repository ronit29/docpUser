import React from 'react'
import { connect } from 'react-redux'
import TestsListView from '../../components/commons/testsList/testsListView';
import { getTestsAlphabetically } from '../../actions/index.js'

class TestsList extends React.Component {

    static loadData(store, match) {
        return store.dispatch(getTestsAlphabetically('a'))
    }

    static contextTypes = {
        router: () => null
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
        selectedAlphabet,
        testIndexLoading
    } = state.SITE_MAP

    return {
        alphabeticalTests,
        selectedAlphabet,
        testIndexLoading
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        getTestsAlphabetically: (character) => dispatch(getTestsAlphabetically(character))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TestsList)