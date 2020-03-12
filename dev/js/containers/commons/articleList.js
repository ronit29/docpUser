import React from 'react';
import { connect } from 'react-redux';

import ArticleListView from '../../components/commons/articleList'
import { getArticleList, getSpecialityFooterData } from '../../actions/index.js'
import DoctorsNearMeView from '../../components/commons/DoctorsNearMe/DoctorsNearMeView';
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
            Promise.all([store.dispatch(getArticleList(title, query))]).then((result) => {
                result = result[0]
                if (!result) {
                    reject({})
                    return
                }
                if (result && result.length == 0 && query) {
                    reject({})
                    return
                }
                // getSpecialityFooterData((footerData) => {
                //     resolve({ footerData: (footerData || null) })
                // })()
                resolve({});
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
            <div>
                {
                    this.props.match.url === "/doctors-near-me" ?
                        <DoctorsNearMeView {...this.props} /> : <ArticleListView {...this.props} />
                }
            </div>
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

    let {
        static_footer_data
    } = state.DOCTOR_SEARCH


    return {
        articleList,
        articleListData,
        ARTICLE_LOADED,
        pageButtonCount,
        articlePageCount,
        initialServerData,
        static_footer_data

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getArticleList: (title, page, replaceList, searchString, callback) => dispatch(getArticleList(title, page, replaceList, searchString, callback)),
        getSpecialityFooterData: (cb) => dispatch(getSpecialityFooterData(cb))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleList);