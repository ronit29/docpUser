import React from 'react';
import { connect } from 'react-redux';

import ArticleListView from '../../components/commons/articleList'
import { getArticleList, getSpecialityFooterData } from '../../actions/index.js'
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
        title = title.substring(1, title.length).toLowerCase();
        if (query.page) {
            query = query.page
        } else {
            query = 1
        }
        return new Promise((resolve, reject) => {
            Promise.all([store.dispatch(getArticleList(title, query))]).then(() => {
                getSpecialityFooterData((footerData) => {
                    resolve({ footerData: (footerData || null) })
                })()
            }).catch((e) => {
                reject()
            })
        })
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

const mapStateToProps = (state, passedProps) => {
    /**
     * initialServerData is server rendered async data required build html on server. 
     */
    let initialServerData = null
    let { staticContext } = passedProps
    if (staticContext && staticContext.data) {
        initialServerData = staticContext.data
    }

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
        articlePageCount,
        initialServerData
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getArticleList: (title, page, replaceList, searchString, callback) => dispatch(getArticleList(title, page, replaceList, searchString, callback)),
        getSpecialityFooterData: (cb) => dispatch(getSpecialityFooterData(cb))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleList);