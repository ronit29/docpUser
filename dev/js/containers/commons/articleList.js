import React from 'react';
import { connect } from 'react-redux';

import ArticleListView from '../../components/commons/articleList'
import { getArticleList } from '../../actions/index.js'
const queryString = require('query-string');


class ArticleList extends React.Component {
    constructor(props) {
        super(props)
    }

    static loadData(store, match,query) {
        let title = match.url
        title = title.substring(1, title.length)
        return store.dispatch(getArticleList(title,query))
    }

    static contextTypes = {
        router: () => null
    }

    componentDidMount() {
        let title = this.props.match.url
        title = title.substring(1, title.length)
        const parsed = queryString.parse(this.props.location.search)
        if (parsed) {
            this.props.getArticleList(title, parsed.page)
        } else {
            this.props.getArticleList(title)
        }

    }

    render() {

        return (
            <ArticleListView {...this.props} />
        );
    }
}

const mapStateToProps = (state) => {
    let {
        articleList,
        articleListData,
        ARTICLE_LOADED
    } = state.USER
    return {
        articleList,
        articleListData,
        ARTICLE_LOADED
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getArticleList: (title, page, searchString, callback) => dispatch(getArticleList(title, page, searchString, callback))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleList);