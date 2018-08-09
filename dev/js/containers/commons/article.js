import React from 'react';
import { connect } from 'react-redux';

import { fetchArticle } from '../../actions/index.js'

import ArticleView from '../../components/commons/article'

class Article extends React.Component {
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
            <ArticleView {...this.props} />
        );
    }
}

const mapStateToProps = (state) => {
    return {

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchArticle: (id, preview, cb) => dispatch(fetchArticle(id, preview, cb))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Article);
