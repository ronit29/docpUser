import React from 'react';
import { connect } from 'react-redux';

import ArticleListView from '../../components/commons/articleList'
import { getArticleList } from '../../actions/index.js'
const queryString = require('query-string');


class ArticleList extends React.Component {
    constructor(props) {
        super(props)
    }

    static contextTypes = {
        router: () => null
    }

    componentDidMount() {
        let title = this.props.match.url
        title = title.substring(1,title.length)
        const parsed = queryString.parse(this.props.location.search)
        if(parsed){
            this.props.getArticleList(title,parsed.page)
        }else{
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
        ARTICLE_LOADED
    } = state.USER
    return {
        articleList,
        ARTICLE_LOADED
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getArticleList: (title, page, callback) => dispatch(getArticleList(title, page, callback))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleList);