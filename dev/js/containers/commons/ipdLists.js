import React from 'react'
import { connect } from 'react-redux'
import IpdListView from '../../components/commons/IpdList/IpdListView';
import { getIPDAlphabetically } from '../../actions/index.js'

class TestsList extends React.Component {

    static loadData(store, match) {
        return store.dispatch(getIPDAlphabetically('a'))
    }

    static contextTypes = {
        router: () => null
    }

    render() {

        return (
            <IpdListView {...this.props} />
        )
    }
}

const mapStateToProps = (state) => {
    const {
        alphabeticalIpdTests,
        selectedIpdListAlphabet,
        ipdIndexLoading
    } = state.SITE_MAP

    return {
        alphabeticalIpdTests,
        selectedIpdListAlphabet,
        ipdIndexLoading
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        getIPDAlphabetically: (character) => dispatch(getIPDAlphabetically(character))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TestsList)