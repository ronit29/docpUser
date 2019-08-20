import React from 'react';
import { connect } from 'react-redux';

import { fetchArticle, getSpecialityFooterData, postComment, getOfferList, toggleOPDCriteria, toggleDiagnosisCriteria, cloneCommonSelectedCriterias, selectSearchType, mergeLABState, mergeOPDState ,setPackageId} from '../../actions/index.js'

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
                store.dispatch(fetchArticle(articleId, false, (err, data) => {
                    if (!err) {
                        getSpecialityFooterData((footerData) => {
                            resolve({ footerData: (footerData || null), articleData: data })
                        })()
                    } else {
                        reject(null)
                    }
                }))
            })

        } else {
            return Promise.resolve(null)
        }
    }

    componentDidMount() {

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
    let {
        profiles, defaultProfile, offerList, articleData
    } = state.USER

    let {
        selectedLocation
    } = state.SEARCH_CRITERIA_OPD

    let OPD_STATE = (()=> {

        const {
        selectedLocation,
        filterCriteria

        } = state.SEARCH_CRITERIA_OPD

    return {
        selectedLocation,
        filterCriteria
        }

    })()

    let LAB_STATE = (()=>{

        const {
        selectedLocation,
        filterCriteria,
        selectedCriterias

        } = state.SEARCH_CRITERIA_LABS

    return {
        selectedLocation,
        filterCriteria,
        selectedCriterias
        }

    })()
    return {
        initialServerData,
        profiles, defaultProfile, offerList, selectedLocation, articleData, OPD_STATE, LAB_STATE
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchArticle: (id, preview, cb) => dispatch(fetchArticle(id, preview, cb)),
        getSpecialityFooterData: (cb) => dispatch(getSpecialityFooterData(cb)),
        postComment: (comment, cb) => dispatch(postComment(comment, cb)),
        getOfferList: (lat, long) => dispatch(getOfferList(lat, long)),
        toggleOPDCriteria: (type, criteria, forceAdd, filter) => dispatch(toggleOPDCriteria(type, criteria, forceAdd, filter)),
        toggleDiagnosisCriteria: (type, criteria, forceAdd, filter) => dispatch(toggleDiagnosisCriteria(type, criteria, forceAdd, filter)),
        cloneCommonSelectedCriterias: (selectedCriterias) => dispatch(cloneCommonSelectedCriterias(selectedCriterias)),
        selectSearchType: (type) => dispatch(selectSearchType(type)),
        mergeLABState: (state, fetchNewResults) => dispatch(mergeLABState(state, fetchNewResults)),
        mergeOPDState: (state, fetchNewResults) => dispatch(mergeOPDState(state, fetchNewResults)),
        setPackageId: (package_id, isHomePage) => dispatch(setPackageId(package_id, isHomePage)),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Article);
