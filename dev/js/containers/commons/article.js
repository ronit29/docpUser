import React from 'react';
import { connect } from 'react-redux';

import { fetchArticle, getSpecialityFooterData } from '../../actions/index.js'

import ArticleView from '../../components/commons/article'

class Article extends React.Component {
    constructor(props) {
        super(props)
    }

    static loadData(store, match) {
        let articleId = match.url
        if (articleId) {
            return new Promise((resolve, reject) => {
                articleId = articleId.toLowerCase().substring(1, articleId.length)
                fetchArticle(articleId, false, (err, data) => {
                    if (!err) {
                        getSpecialityFooterData((footerData) => {
                            resolve({ footerData: (footerData || null), articleData: data })
                        })()
                    } else {
                        resolve(null)
                    }
                })(null)
            })

        } else {
            return Promise.resolve(null)
        }
    }

    static contextTypes = {
        router: () => null
    }

    render() {

        return (
            <ArticleView {...this.props} />
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
    return {
        initialServerData
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchArticle: (id, preview, cb) => dispatch(fetchArticle(id, preview, cb)),
        getSpecialityFooterData: (cb) => dispatch(getSpecialityFooterData(cb))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Article);
