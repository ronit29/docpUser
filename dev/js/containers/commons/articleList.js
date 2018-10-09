import React from 'react';
import { connect } from 'react-redux';

import ArticleListView from '../../components/commons/articleList'
import { getArticleList } from '../../actions/index.js'
const queryString = require('query-string');


class ArticleList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            pageNo: 1
        }
    }

    static loadData(store, match, query) {
        let title = match.url
        title = title.substring(1, title.length)
        if (query.page) {
            query = query.page
        } else {
            query = 1
        }
        return store.dispatch(getArticleList(title, query))
    }

    static contextTypes = {
        router: () => null
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
        ARTICLE_LOADED,
        pageButtonCount,
        articlePageCount
    } = state.USER
    return {
        articleList,
        articleListData,
        ARTICLE_LOADED,
        pageButtonCount,
        articlePageCount
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getArticleList: (title, page, searchString, callback) => dispatch(getArticleList(title, page, searchString, callback))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleList);