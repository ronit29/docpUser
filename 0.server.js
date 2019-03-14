exports.ids = [0];
exports.modules = {

/***/ "./dev/js/components/commons/DoctorsNearMe/DoctorsNearMeView.js":
/*!**********************************************************************!*\
  !*** ./dev/js/components/commons/DoctorsNearMe/DoctorsNearMeView.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(/*! react */ "react");

var _react2 = _interopRequireDefault(_react);

var _DesktopProfileHeader = __webpack_require__(/*! ../DesktopProfileHeader */ "./dev/js/components/commons/DesktopProfileHeader/index.js");

var _DesktopProfileHeader2 = _interopRequireDefault(_DesktopProfileHeader);

var _footer = __webpack_require__(/*! ../Home/footer */ "./dev/js/components/commons/Home/footer.js");

var _footer2 = _interopRequireDefault(_footer);

var _HelmetTags = __webpack_require__(/*! ../../commons/HelmetTags */ "./dev/js/components/commons/HelmetTags/index.js");

var _HelmetTags2 = _interopRequireDefault(_HelmetTags);

var _config = __webpack_require__(/*! ../../../config */ "./dev/js/config/index.js");

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class DoctorsNearMeView extends _react2.default.Component {

    constructor(props) {
        super(props);

        var title = this.props.match.url.toLowerCase();
        title = title.substring(1, title.length);

        this.state = {
            title: title,
            readMore: 'search-details-data-less'
        };
    }

    componentDidMount() {
        if (window) {
            window.scrollTo(0, 0);
        }
        this.props.getArticleList(this.state.title, 1, true);
    }

    toggleScroll() {
        if (window) {
            window.scrollTo(0, 0);
        }
        this.setState({ readMore: 'search-details-data-less' });
    }

    render() {

        return _react2.default.createElement(
            'div',
            { className: 'profile-body-wrap sitemap-body' },
            _react2.default.createElement(_DesktopProfileHeader2.default, null),
            _react2.default.createElement(
                'section',
                { className: 'container dp-container-div' },
                _react2.default.createElement(
                    'div',
                    { className: 'row main-row parent-section-row' },
                    this.props.ARTICLE_LOADED ? _react2.default.createElement(_HelmetTags2.default, { tagsData: {
                            title: this.props.articleListData.seo ? this.props.articleListData.seo.title : "",
                            description: this.props.articleListData.seo ? this.props.articleListData.seo.description : "",
                            canonicalUrl: `${_config2.default.API_BASE_URL}${this.props.location.pathname}${this.props.location.search}`
                        } }) : null,
                    _react2.default.createElement(
                        'div',
                        { className: 'col-12 mrng-top-12' },
                        _react2.default.createElement(
                            'ul',
                            { className: 'mrb-10 breadcrumb-list', style: { wordBreak: 'break-word' } },
                            _react2.default.createElement(
                                'li',
                                { className: 'breadcrumb-list-item' },
                                _react2.default.createElement(
                                    'a',
                                    { href: '/', onClick: e => this.onHomeClick(e, "/") },
                                    _react2.default.createElement(
                                        'span',
                                        { className: 'fw-500 breadcrumb-title breadcrumb-colored-title' },
                                        'Home'
                                    )
                                )
                            ),
                            _react2.default.createElement(
                                'span',
                                { className: 'breadcrumb-arrow' },
                                '>'
                            ),
                            _react2.default.createElement(
                                'li',
                                { className: 'breadcrumb-list-item' },
                                _react2.default.createElement(
                                    'span',
                                    { className: 'fw-500 breadcrumb-title' },
                                    this.props.articleListData.category
                                )
                            )
                        )
                    ),
                    this.props.articleListData.search_content && this.props.articleListData.search_content != '' ? _react2.default.createElement(
                        'div',
                        { className: 'col-12 mrt-10' },
                        _react2.default.createElement(
                            'div',
                            { className: 'search-result-card-collpase' },
                            _react2.default.createElement('div', { className: this.state.readMore, dangerouslySetInnerHTML: { __html: this.props.articleListData.search_content } }),
                            this.state.readMore && this.state.readMore != '' ? _react2.default.createElement(
                                'span',
                                { className: 'rd-more', onClick: () => this.setState({ readMore: '' }) },
                                'Read More'
                            ) : '',
                            this.state.readMore == '' ? _react2.default.createElement(
                                'span',
                                { className: 'rd-more', onClick: this.toggleScroll.bind(this) },
                                'Read Less'
                            ) : ''
                        )
                    ) : '',
                    _react2.default.createElement(
                        'div',
                        { className: 'col-12' },
                        _react2.default.createElement(
                            'div',
                            null,
                            _react2.default.createElement(
                                'h1',
                                { className: 'fw-500 sitemap-title' },
                                this.props.articleListData.category
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'row sitemap-row' },
                            this.props.articleList.length ? this.props.articleList.map((property, index) => {
                                return _react2.default.createElement(
                                    'div',
                                    { className: 'col-12 col-md-6 col-lg-4', key: index },
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'anchor-data-style' },
                                        _react2.default.createElement(
                                            'a',
                                            { href: `/${property.url}`, onClick: e => {
                                                    e.preventDefault();
                                                    this.props.history.push(`/${property.url}`);
                                                } },
                                            _react2.default.createElement(
                                                'h2',
                                                { style: { fontSize: 14 } },
                                                property.title.split('|')[0]
                                            )
                                        ),
                                        _react2.default.createElement(
                                            'span',
                                            { className: 'sitemap-right-arrow' },
                                            _react2.default.createElement('img', { src: "/assets" + "/img/customer-icons/arrow-forward-right.svg" })
                                        )
                                    )
                                );
                            }) : _react2.default.createElement(
                                'p',
                                { className: 'fw-500 text-center', style: { fontSize: 20 } },
                                'No Article Found !!'
                            )
                        )
                    ),
                    this.props.articleListData.bottom_content && this.props.articleListData.bottom_content != '' ? _react2.default.createElement(
                        'div',
                        { className: 'col-12 mrt-10' },
                        _react2.default.createElement('div', { className: 'search-result-card-collpase', dangerouslySetInnerHTML: { __html: this.props.articleListData.bottom_content } })
                    ) : ''
                )
            ),
            _react2.default.createElement(_footer2.default, null)
        );
    }
}

exports.default = DoctorsNearMeView;

/***/ }),

/***/ "./dev/js/components/commons/articleList/articleList.js":
/*!**************************************************************!*\
  !*** ./dev/js/components/commons/articleList/articleList.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = __webpack_require__(/*! react */ "react");

var _react2 = _interopRequireDefault(_react);

var _LeftBar = __webpack_require__(/*! ../../commons/LeftBar */ "./dev/js/components/commons/LeftBar/index.js");

var _LeftBar2 = _interopRequireDefault(_LeftBar);

var _RightBar = __webpack_require__(/*! ../../commons/RightBar */ "./dev/js/components/commons/RightBar/index.js");

var _RightBar2 = _interopRequireDefault(_RightBar);

var _DesktopProfileHeader = __webpack_require__(/*! ../../commons/DesktopProfileHeader */ "./dev/js/components/commons/DesktopProfileHeader/index.js");

var _DesktopProfileHeader2 = _interopRequireDefault(_DesktopProfileHeader);

var _reactInfiniteScroller = __webpack_require__(/*! react-infinite-scroller */ "react-infinite-scroller");

var _reactInfiniteScroller2 = _interopRequireDefault(_reactInfiniteScroller);

var _Loader = __webpack_require__(/*! ../../commons/Loader */ "./dev/js/components/commons/Loader/index.js");

var _Loader2 = _interopRequireDefault(_Loader);

var _HelmetTags = __webpack_require__(/*! ../../commons/HelmetTags */ "./dev/js/components/commons/HelmetTags/index.js");

var _HelmetTags2 = _interopRequireDefault(_HelmetTags);

var _config = __webpack_require__(/*! ../../../config */ "./dev/js/config/index.js");

var _config2 = _interopRequireDefault(_config);

var _footer = __webpack_require__(/*! ../Home/footer */ "./dev/js/components/commons/Home/footer.js");

var _footer2 = _interopRequireDefault(_footer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const queryString = __webpack_require__(/*! query-string */ "query-string");

class ArticleList extends _react2.default.Component {
	constructor(props) {
		super(props);
		const parsed = queryString.parse(this.props.location.search);

		var page = 1;
		if (parsed && parsed.page) {
			page = parsed.page;
		}

		var title = this.props.match.url.toLowerCase();
		title = title.substring(1, title.length);

		this.state = {
			hasMore: true,
			page: page,
			searchVal: '',
			noArticleFound: false,
			title: title,
			buttonsVisible: true,
			start_page: page
		};
	}

	componentDidMount() {
		window.scrollTo(0, 0);

		this.props.getArticleList(this.state.title, this.state.page, true);
		const parsed = queryString.parse(this.props.location.search);

		if (parsed.page && parsed.page == 1) {
			var newHref = window.location.href.replace('?page=1', '');
			newHref = newHref.replace('&page=1', '');
			window.location.href = newHref;
		}
	}

	loadMore(delta) {
		this.setState({
			hasMore: false
		}, () => {
			let page = parseInt(this.state.page) + delta;
			this.props.getArticleList(this.state.title, page, true, this.state.searchVal, resp => {
				if (resp.length) {
					this.setState({
						hasMore: true,
						page
					});
				} else {
					this.setState({
						hasMore: false
					});
				}
			});
		});
	}

	changeVal(e) {
		this.setState({
			searchVal: e.target.value
		});
	}

	searchArticle() {
		let page = 1;
		if (!this.state.searchVal) {
			page = this.state.start_page;
		}

		this.setState({ page: page }, () => {
			this.props.getArticleList(this.state.title, this.state.page, true, this.state.searchVal, resp => {
				if (resp.length == 0) {
					this.setState({
						hasMore: false,
						noArticleFound: true
					});
				} else {
					this.setState({
						hasMore: true,
						noArticleFound: false
					});
				}

				if (this.state.searchVal) {
					this.setState({
						buttonsVisible: false
					});
				} else {
					this.setState({
						buttonsVisible: true
					});
				}
			});
		});
	}

	handleKeyUp(e) {
		if (e.key === 'Enter') {
			this.searchArticle();
		}
	}

	navigate(delta = 0, e) {
		// e.preventDefault()
		// e.stopPropagation()
		// this.loadMore(delta)
	}

	render() {
		var page_size = 50;
		var pageNo = parseInt(this.state.page);
		let currentPage = [];
		currentPage.push(_react2.default.createElement(
			'div',
			{ className: 'art-pagination-btn' },
			_react2.default.createElement(
				'span',
				{ className: 'fw-500', style: { color: '#000' } },
				pageNo
			)
		));

		let placeHolder = 'Search any ';
		if (this.props.articleListData && this.props.articleListData.category) {
			placeHolder = placeHolder + this.props.articleListData.category.split(' ')[0];
		}

		let heading = "";
		let url = this.props.match.url.toLowerCase();
		if (url == '/all-diseases') {
			heading = "All Diseases";
		} else if (url == '/all-medicines') {
			heading = "All Medicines";
		} else {
			heading = "All Articles";
		}

		return _react2.default.createElement(
			'div',
			{ className: 'profile-body-wrap' },
			_react2.default.createElement(_DesktopProfileHeader2.default, null),
			_react2.default.createElement(
				'section',
				{ className: 'container container-top-margin' },
				_react2.default.createElement(
					'div',
					{ className: 'row main-row parent-section-row' },
					_react2.default.createElement(_LeftBar2.default, null),
					_react2.default.createElement(
						'div',
						{ className: 'col-12 col-md-7 col-lg-7 center-column' },
						this.props.ARTICLE_LOADED ? _react2.default.createElement(_HelmetTags2.default, { tagsData: {
								title: this.props.articleListData.seo ? this.props.articleListData.seo.title : "",
								description: this.props.articleListData.seo ? this.props.articleListData.seo.description : "",
								canonicalUrl: `${_config2.default.API_BASE_URL}${this.props.location.pathname}${this.props.location.search}`,

								prev: `${pageNo != 1 && pageNo <= Math.ceil(this.props.articleListData.total_articles / page_size) ? `${_config2.default.API_BASE_URL}${this.props.location.pathname}${pageNo > 2 && pageNo <= Math.ceil(this.props.articleListData.total_articles / page_size) ? '?page=' + (pageNo - 1) : ''}` : ''}`,

								next: `${pageNo != Math.ceil(this.props.articleListData.total_articles / page_size) && pageNo <= Math.ceil(this.props.articleListData.total_articles / page_size) ? `${_config2.default.API_BASE_URL}${this.props.location.pathname}?page=${pageNo >= 1 && pageNo < Math.ceil(this.props.articleListData.total_articles / page_size) ? pageNo + 1 : ''}` : ''}`
							} }) : null,
						_react2.default.createElement(
							'div',
							{ className: 'container-fluid main-container' },
							_react2.default.createElement(
								'div',
								{ className: 'row art-search-row' },
								_react2.default.createElement(
									'div',
									{ className: 'col-12 mrng-top-12' },
									_react2.default.createElement(
										'ul',
										{ className: 'mrb-10 breadcrumb-list', style: { wordBreak: 'break-word' } },
										_react2.default.createElement(
											'li',
											{ className: 'breadcrumb-list-item' },
											_react2.default.createElement(
												'a',
												{ href: '/', onClick: e => this.onHomeClick(e, "/") },
												_react2.default.createElement(
													'span',
													{ className: 'fw-500 breadcrumb-title breadcrumb-colored-title' },
													'Home'
												)
											)
										),
										_react2.default.createElement(
											'span',
											{ className: 'breadcrumb-arrow' },
											'>'
										),
										_react2.default.createElement(
											'li',
											{ className: 'breadcrumb-list-item' },
											_react2.default.createElement(
												'span',
												{ className: 'fw-500 breadcrumb-title' },
												this.props.articleListData.category
											)
										)
									)
								),
								_react2.default.createElement(
									'div',
									{ className: 'col-12' },
									_react2.default.createElement('input', { type: 'text', id: 'disease-search', value: this.state.searchVal, className: 'art-searchbar', placeholder: placeHolder, onChange: e => this.changeVal(e), onKeyUp: e => this.handleKeyUp(e) }),
									_react2.default.createElement(
										'button',
										{ className: 'art-search-btn', onClick: () => this.searchArticle() },
										_react2.default.createElement('img', { src: "/assets" + "/images/search.svg" })
									)
								),
								_react2.default.createElement(
									'div',
									{ className: 'col-12' },
									_react2.default.createElement(
										'h1',
										{ className: 'fw-500 mrt-20', style: { fontSize: 22 } },
										heading
									)
								)
							),
							_react2.default.createElement(
								'div',
								{ className: 'row mrt-20' },
								this.props.ARTICLE_LOADED ? _react2.default.createElement(
									'div',
									{ style: { width: '100%' } },
									this.props.articleList.length && !this.state.noArticleFound ? this.props.articleList.map((property, index) => {
										return _react2.default.createElement(
											'div',
											{ className: 'col-12', key: index },
											_react2.default.createElement(
												'div',
												{ className: 'widget disease-widget', onClick: () => this.props.history.push(`/${property.url}`) },
												property.header_image ? _react2.default.createElement('img', { className: 'disease-list-img', src: property.header_image, alt: property.header_image_alt }) : '',
												_react2.default.createElement(
													'a',
													{ href: `/${property.url}`, onClick: e => e.preventDefault() },
													_react2.default.createElement(
														'h2',
														{ className: 'disease-list-name fw-500' },
														property.title
													)
												),
												_react2.default.createElement('p', { className: 'fw-500', dangerouslySetInnerHTML: { __html: property.articleTeaser } })
											)
										);
									}) : _react2.default.createElement(
										'p',
										{ className: 'fw-500 text-center', style: { fontSize: 20 } },
										'No Article Found !!'
									),
									this.props.articleList.length && !this.state.noArticleFound && this.state.buttonsVisible ? _react2.default.createElement(
										'div',
										{ className: 'col-12' },
										pageNo == 1 ? _react2.default.createElement(
											'div',
											{ className: 'art-pagination-div' },
											currentPage,
											_react2.default.createElement(
												'a',
												{ onClick: this.navigate.bind(this, 1), href: `${this.state.title}?page=${pageNo + 1}` },
												_react2.default.createElement(
													'div',
													{ className: 'art-pagination-btn' },
													_react2.default.createElement(
														'span',
														{ className: 'fw-500' },
														pageNo + 1
													)
												)
											)
										) : pageNo == Math.ceil(this.props.articleListData.total_articles / page_size) ? _react2.default.createElement(
											'div',
											{ className: 'art-pagination-div' },
											_react2.default.createElement(
												'a',
												{ href: `${this.state.title}?page=${pageNo - 1}`, onClick: this.navigate.bind(this, -1) },
												_react2.default.createElement(
													'div',
													{ className: 'art-pagination-btn' },
													_react2.default.createElement(
														'span',
														{ className: 'fw-500' },
														pageNo - 1
													)
												)
											),
											currentPage
										) : _react2.default.createElement(
											'div',
											{ className: 'art-pagination-div' },
											_react2.default.createElement(
												'a',
												{ onClick: this.navigate.bind(this, pageNo == 2 ? -1 : -1), href: `${pageNo == 2 ? `${this.state.title}` : `${this.state.title}?page=${pageNo - 1}`}` },
												_react2.default.createElement(
													'div',
													{ className: 'art-pagination-btn' },
													_react2.default.createElement(
														'span',
														{ className: 'fw-500' },
														pageNo - 1
													)
												)
											),
											currentPage,
											_react2.default.createElement(
												'a',
												{ href: `${this.state.title}?page=${pageNo + 1}`, onClick: this.navigate.bind(this, 1) },
												_react2.default.createElement(
													'div',
													{ className: 'art-pagination-btn' },
													_react2.default.createElement(
														'span',
														{ className: 'fw-500' },
														pageNo + 1
													)
												)
											)
										)
									) : ""
								) : _react2.default.createElement(_Loader2.default, null)
							)
						)
					),
					_react2.default.createElement(_RightBar2.default, { noChatButton: true })
				)
			),
			_react2.default.createElement(_footer2.default, null)
		);
	}
}

exports.default = ArticleList;

/***/ }),

/***/ "./dev/js/components/commons/articleList/index.js":
/*!********************************************************!*\
  !*** ./dev/js/components/commons/articleList/index.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _articleList = __webpack_require__(/*! ./articleList */ "./dev/js/components/commons/articleList/articleList.js");

var _articleList2 = _interopRequireDefault(_articleList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _articleList2.default;

/***/ }),

/***/ "./dev/js/containers/commons/articleList.js":
/*!**************************************************!*\
  !*** ./dev/js/containers/commons/articleList.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(/*! react */ "react");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(/*! react-redux */ "react-redux");

var _articleList = __webpack_require__(/*! ../../components/commons/articleList */ "./dev/js/components/commons/articleList/index.js");

var _articleList2 = _interopRequireDefault(_articleList);

var _index = __webpack_require__(/*! ../../actions/index.js */ "./dev/js/actions/index.js");

var _DoctorsNearMeView = __webpack_require__(/*! ../../components/commons/DoctorsNearMe/DoctorsNearMeView */ "./dev/js/components/commons/DoctorsNearMe/DoctorsNearMeView.js");

var _DoctorsNearMeView2 = _interopRequireDefault(_DoctorsNearMeView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const queryString = __webpack_require__(/*! query-string */ "query-string");

class ArticleList extends _react2.default.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageNo: 1
        };
    }

    static loadData(store, match, query) {
        let title = match.url;
        title = title.substring(1, title.length).toLowerCase();
        if (query.page) {
            query = query.page;
        } else {
            query = 1;
        }
        return new Promise((resolve, reject) => {
            Promise.all([store.dispatch((0, _index.getArticleList)(title, query))]).then(result => {
                result = result[0];
                if (!result) {
                    reject({});
                    return;
                }
                if (result && result.length == 0 && query) {
                    reject({});
                    return;
                }
                (0, _index.getSpecialityFooterData)(footerData => {
                    resolve({ footerData: footerData || null });
                })();
            }).catch(e => {
                reject();
            });
        });
    }

    render() {
        return _react2.default.createElement(
            'div',
            null,
            this.props.match.url === "/doctors-near-me" ? _react2.default.createElement(_DoctorsNearMeView2.default, this.props) : _react2.default.createElement(_articleList2.default, this.props)
        );
    }
}

ArticleList.contextTypes = {
    router: () => null
};
const mapStateToProps = (state, passedProps) => {
    /**
     * initialServerData is server rendered async data required build html on server. 
     */
    let initialServerData = null;
    let { staticContext } = passedProps;
    if (staticContext && staticContext.data) {
        initialServerData = staticContext.data;
    }

    let {
        articleList,
        articleListData,
        ARTICLE_LOADED,
        pageButtonCount,
        articlePageCount
    } = state.USER;
    return {
        articleList,
        articleListData,
        ARTICLE_LOADED,
        pageButtonCount,
        articlePageCount,
        initialServerData
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getArticleList: (title, page, replaceList, searchString, callback) => dispatch((0, _index.getArticleList)(title, page, replaceList, searchString, callback)),
        getSpecialityFooterData: cb => dispatch((0, _index.getSpecialityFooterData)(cb))
    };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(ArticleList);

/***/ })

};;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9jb21tb25zL0RvY3RvcnNOZWFyTWUvRG9jdG9yc05lYXJNZVZpZXcuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvY29tbW9ucy9hcnRpY2xlTGlzdC9hcnRpY2xlTGlzdC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9jb21tb25zL2FydGljbGVMaXN0L2luZGV4LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb250YWluZXJzL2NvbW1vbnMvYXJ0aWNsZUxpc3QuanMiXSwibmFtZXMiOlsiRG9jdG9yc05lYXJNZVZpZXciLCJDb21wb25lbnQiLCJjb25zdHJ1Y3RvciIsInByb3BzIiwidGl0bGUiLCJtYXRjaCIsInVybCIsInRvTG93ZXJDYXNlIiwic3Vic3RyaW5nIiwibGVuZ3RoIiwic3RhdGUiLCJyZWFkTW9yZSIsImNvbXBvbmVudERpZE1vdW50Iiwid2luZG93Iiwic2Nyb2xsVG8iLCJnZXRBcnRpY2xlTGlzdCIsInRvZ2dsZVNjcm9sbCIsInNldFN0YXRlIiwicmVuZGVyIiwiQVJUSUNMRV9MT0FERUQiLCJhcnRpY2xlTGlzdERhdGEiLCJzZW8iLCJkZXNjcmlwdGlvbiIsImNhbm9uaWNhbFVybCIsIkFQSV9CQVNFX1VSTCIsImxvY2F0aW9uIiwicGF0aG5hbWUiLCJzZWFyY2giLCJ3b3JkQnJlYWsiLCJlIiwib25Ib21lQ2xpY2siLCJjYXRlZ29yeSIsInNlYXJjaF9jb250ZW50IiwiX19odG1sIiwiYmluZCIsImFydGljbGVMaXN0IiwibWFwIiwicHJvcGVydHkiLCJpbmRleCIsInByZXZlbnREZWZhdWx0IiwiaGlzdG9yeSIsInB1c2giLCJmb250U2l6ZSIsInNwbGl0IiwiQVNTRVRTX0JBU0VfVVJMIiwiYm90dG9tX2NvbnRlbnQiLCJxdWVyeVN0cmluZyIsInJlcXVpcmUiLCJBcnRpY2xlTGlzdCIsInBhcnNlZCIsInBhcnNlIiwicGFnZSIsImhhc01vcmUiLCJzZWFyY2hWYWwiLCJub0FydGljbGVGb3VuZCIsImJ1dHRvbnNWaXNpYmxlIiwic3RhcnRfcGFnZSIsIm5ld0hyZWYiLCJocmVmIiwicmVwbGFjZSIsImxvYWRNb3JlIiwiZGVsdGEiLCJwYXJzZUludCIsInJlc3AiLCJjaGFuZ2VWYWwiLCJ0YXJnZXQiLCJ2YWx1ZSIsInNlYXJjaEFydGljbGUiLCJoYW5kbGVLZXlVcCIsImtleSIsIm5hdmlnYXRlIiwicGFnZV9zaXplIiwicGFnZU5vIiwiY3VycmVudFBhZ2UiLCJjb2xvciIsInBsYWNlSG9sZGVyIiwiaGVhZGluZyIsInByZXYiLCJNYXRoIiwiY2VpbCIsInRvdGFsX2FydGljbGVzIiwibmV4dCIsIndpZHRoIiwiaGVhZGVyX2ltYWdlIiwiaGVhZGVyX2ltYWdlX2FsdCIsImFydGljbGVUZWFzZXIiLCJsb2FkRGF0YSIsInN0b3JlIiwicXVlcnkiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsImFsbCIsImRpc3BhdGNoIiwidGhlbiIsInJlc3VsdCIsImZvb3RlckRhdGEiLCJjYXRjaCIsImNvbnRleHRUeXBlcyIsInJvdXRlciIsIm1hcFN0YXRlVG9Qcm9wcyIsInBhc3NlZFByb3BzIiwiaW5pdGlhbFNlcnZlckRhdGEiLCJzdGF0aWNDb250ZXh0IiwiZGF0YSIsInBhZ2VCdXR0b25Db3VudCIsImFydGljbGVQYWdlQ291bnQiLCJVU0VSIiwibWFwRGlzcGF0Y2hUb1Byb3BzIiwicmVwbGFjZUxpc3QiLCJzZWFyY2hTdHJpbmciLCJjYWxsYmFjayIsImdldFNwZWNpYWxpdHlGb290ZXJEYXRhIiwiY2IiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRUEsTUFBTUEsaUJBQU4sU0FBZ0MsZ0JBQU1DLFNBQXRDLENBQWdEOztBQUU1Q0MsZ0JBQVlDLEtBQVosRUFBbUI7QUFDZixjQUFNQSxLQUFOOztBQUVBLFlBQUlDLFFBQVEsS0FBS0Qs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LG9CQUFvQixJQUF4QjtBQUNBLFFBQUksRUFBRUMsYUFBRixLQUFvQkYsV0FBeEI7QUFDQSxRQUFJRSxpQkFBaUJBLGNBQWNDLElBQW5DLEVBQXlDO0FBQ3JDRiw0QkFBb0JDLGNBQWNDLElBQWxDO0FBQ0g7O0FBRUQsUUFBSTtBQUNBckUsbUJBREE7QUFFQWYsdUJBRkE7QUFHQUQsc0JBSEE7QUFJQXNGLHVCQUpBO0FBS0FDO0FBTEEsUUFNQWhHLE1BQU1pRyxJQU5WO0FBT0EsV0FBTztBQUNIeEUsbUJBREc7QUFFSGYsdUJBRkc7QUFHSEQsc0JBSEc7QUFJSHNGLHVCQUpHO0FBS0hDLHdCQUxHO0FBTUhKO0FBTkcsS0FBUDtBQVFILENBekJEOztBQTJCQSxNQUFNTSxxQkFBc0JmLFFBQUQsSUFBYztBQUNyQyxXQUFPO0FBQ0g5RSx3QkFBZ0IsQ0FBQ1gsS0FBRCxFQUFRK0MsSUFBUixFQUFjMEQsV0FBZCxFQUEyQkMsWUFBM0IsRUFBeUNDLFFBQXpDLEtBQXNEbEIsU0FBUywyQkFBZXpGLEtBQWYsRUFBc0IrQyxJQUF0QixFQUE0QjBELFdBQTVCLEVBQXlDQyxZQUF6QyxFQUF1REMsUUFBdkQsQ0FBVCxDQURuRTtBQUVIQyxpQ0FBMEJDLEVBQUQsSUFBUXBCLFNBQVMsb0NBQXdCb0IsRUFBeEIsQ0FBVDtBQUY5QixLQUFQO0FBSUgsQ0FMRDs7a0JBT2UseUJBQVFiLGVBQVIsRUFBeUJRLGtCQUF6QixFQUE2QzVELFdBQTdDLEMiLCJmaWxlIjoiMC5zZXJ2ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQgUHJvZmlsZUhlYWRlciBmcm9tICcuLi9EZXNrdG9wUHJvZmlsZUhlYWRlcic7XG5pbXBvcnQgRm9vdGVyIGZyb20gJy4uL0hvbWUvZm9vdGVyJztcbmltcG9ydCBIZWxtZXRUYWdzIGZyb20gJy4uLy4uL2NvbW1vbnMvSGVsbWV0VGFncydcbmltcG9ydCBDT05GSUcgZnJvbSAnLi4vLi4vLi4vY29uZmlnJ1xuXG5jbGFzcyBEb2N0b3JzTmVhck1lVmlldyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcblxuICAgICAgICB2YXIgdGl0bGUgPSB0aGlzLnByb3BzLm1hdGNoLnVybC50b0xvd2VyQ2FzZSgpO1xuICAgICAgICB0aXRsZSA9IHRpdGxlLnN1YnN0cmluZygxLCB0aXRsZS5sZW5ndGgpXG5cbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIHRpdGxlOiB0aXRsZSxcbiAgICAgICAgICAgIHJlYWRNb3JlOiAnc2VhcmNoLWRldGFpbHMtZGF0YS1sZXNzJ1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIGlmICh3aW5kb3cpIHtcbiAgICAgICAgICAgIHdpbmRvdy5zY3JvbGxUbygwLCAwKVxuICAgICAgICB9XG4gICAgICAgIHRoaXMucHJvcHMuZ2V0QXJ0aWNsZUxpc3QodGhpcy5zdGF0ZS50aXRsZSwgMSwgdHJ1ZSk7XG4gICAgfVxuXG4gICAgdG9nZ2xlU2Nyb2xsKCkge1xuICAgICAgICBpZiAod2luZG93KSB7XG4gICAgICAgICAgICB3aW5kb3cuc2Nyb2xsVG8oMCwgMClcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNldFN0YXRlKHsgcmVhZE1vcmU6ICdzZWFyY2gtZGV0YWlscy1kYXRhLWxlc3MnIH0pXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInByb2ZpbGUtYm9keS13cmFwIHNpdGVtYXAtYm9keVwiPlxuICAgICAgICAgICAgICAgIDxQcm9maWxlSGVhZGVyIC8+XG4gICAgICAgICAgICAgICAgPHNlY3Rpb24gY2xhc3NOYW1lPVwiY29udGFpbmVyIGRwLWNvbnRhaW5lci1kaXZcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3cgbWFpbi1yb3cgcGFyZW50LXNlY3Rpb24tcm93XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5BUlRJQ0xFX0xPQURFRCA/IDxIZWxtZXRUYWdzIHRhZ3NEYXRhPXt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiAodGhpcy5wcm9wcy5hcnRpY2xlTGlzdERhdGEuc2VvID8gdGhpcy5wcm9wcy5hcnRpY2xlTGlzdERhdGEuc2VvLnRpdGxlIDogXCJcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAodGhpcy5wcm9wcy5hcnRpY2xlTGlzdERhdGEuc2VvID8gdGhpcy5wcm9wcy5hcnRpY2xlTGlzdERhdGEuc2VvLmRlc2NyaXB0aW9uIDogXCJcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbm9uaWNhbFVybDogYCR7Q09ORklHLkFQSV9CQVNFX1VSTH0ke3RoaXMucHJvcHMubG9jYXRpb24ucGF0aG5hbWV9JHt0aGlzLnByb3BzLmxvY2F0aW9uLnNlYXJjaH1gXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfX0gLz4gOiBudWxsXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC0xMiBtcm5nLXRvcC0xMlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx1bCBjbGFzc05hbWU9XCJtcmItMTAgYnJlYWRjcnVtYi1saXN0XCIgc3R5bGU9e3sgd29yZEJyZWFrOiAnYnJlYWstd29yZCcgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaSBjbGFzc05hbWU9XCJicmVhZGNydW1iLWxpc3QtaXRlbVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGEgaHJlZj1cIi9cIiBvbkNsaWNrPXsoZSkgPT4gdGhpcy5vbkhvbWVDbGljayhlLCBcIi9cIil9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZ3LTUwMCBicmVhZGNydW1iLXRpdGxlIGJyZWFkY3J1bWItY29sb3JlZC10aXRsZVwiPkhvbWU8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImJyZWFkY3J1bWItYXJyb3dcIj4mZ3Q7PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGkgY2xhc3NOYW1lPVwiYnJlYWRjcnVtYi1saXN0LWl0ZW1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZ3LTUwMCBicmVhZGNydW1iLXRpdGxlXCI+e3RoaXMucHJvcHMuYXJ0aWNsZUxpc3REYXRhLmNhdGVnb3J5fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnByb3BzLmFydGljbGVMaXN0RGF0YS5zZWFyY2hfY29udGVudCAmJiB0aGlzLnByb3BzLmFydGljbGVMaXN0RGF0YS5zZWFyY2hfY29udGVudCAhPSAnJyA/XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLTEyIG1ydC0xMFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzZWFyY2gtcmVzdWx0LWNhcmQtY29sbHBhc2VcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17dGhpcy5zdGF0ZS5yZWFkTW9yZX0gZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUw9e3sgX19odG1sOiB0aGlzLnByb3BzLmFydGljbGVMaXN0RGF0YS5zZWFyY2hfY29udGVudCB9fSA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUucmVhZE1vcmUgJiYgdGhpcy5zdGF0ZS5yZWFkTW9yZSAhPSAnJyA/XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJyZC1tb3JlXCIgb25DbGljaz17KCkgPT4gdGhpcy5zZXRTdGF0ZSh7IHJlYWRNb3JlOiAnJyB9KX0+UmVhZCBNb3JlPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiAnJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZS5yZWFkTW9yZSA9PSAnJyA/XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJyZC1tb3JlXCIgb25DbGljaz17dGhpcy50b2dnbGVTY3JvbGwuYmluZCh0aGlzKX0+UmVhZCBMZXNzPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiAnJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6ICcnXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLTEyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGgxIGNsYXNzTmFtZT1cImZ3LTUwMCBzaXRlbWFwLXRpdGxlXCI+e3RoaXMucHJvcHMuYXJ0aWNsZUxpc3REYXRhLmNhdGVnb3J5fTwvaDE+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3cgc2l0ZW1hcC1yb3dcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5hcnRpY2xlTGlzdC5sZW5ndGggP1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuYXJ0aWNsZUxpc3QubWFwKChwcm9wZXJ0eSwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPVwiY29sLTEyIGNvbC1tZC02IGNvbC1sZy00XCIga2V5PXtpbmRleH0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFuY2hvci1kYXRhLXN0eWxlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGEgaHJlZj17YC8ke3Byb3BlcnR5LnVybH1gfSBvbkNsaWNrPXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuaGlzdG9yeS5wdXNoKGAvJHtwcm9wZXJ0eS51cmx9YCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDIgc3R5bGU9e3sgZm9udFNpemU6IDE0IH19Pntwcm9wZXJ0eS50aXRsZS5zcGxpdCgnfCcpWzBdfTwvaDI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInNpdGVtYXAtcmlnaHQtYXJyb3dcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGltZyBzcmM9e0FTU0VUU19CQVNFX1VSTCArIFwiL2ltZy9jdXN0b21lci1pY29ucy9hcnJvdy1mb3J3YXJkLXJpZ2h0LnN2Z1wifSAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogPHAgY2xhc3NOYW1lPVwiZnctNTAwIHRleHQtY2VudGVyXCIgc3R5bGU9e3sgZm9udFNpemU6IDIwIH19ID5ObyBBcnRpY2xlIEZvdW5kICEhPC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuYXJ0aWNsZUxpc3REYXRhLmJvdHRvbV9jb250ZW50ICYmIHRoaXMucHJvcHMuYXJ0aWNsZUxpc3REYXRhLmJvdHRvbV9jb250ZW50ICE9ICcnID9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtMTIgbXJ0LTEwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNlYXJjaC1yZXN1bHQtY2FyZC1jb2xscGFzZVwiIGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MPXt7IF9faHRtbDogdGhpcy5wcm9wcy5hcnRpY2xlTGlzdERhdGEuYm90dG9tX2NvbnRlbnQgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogJydcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L3NlY3Rpb24+XG4gICAgICAgICAgICAgICAgPEZvb3RlciAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIClcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IERvY3RvcnNOZWFyTWVWaWV3IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IExlZnRCYXIgZnJvbSAnLi4vLi4vY29tbW9ucy9MZWZ0QmFyJ1xuaW1wb3J0IFJpZ2h0QmFyIGZyb20gJy4uLy4uL2NvbW1vbnMvUmlnaHRCYXInXG5pbXBvcnQgUHJvZmlsZUhlYWRlciBmcm9tICcuLi8uLi9jb21tb25zL0Rlc2t0b3BQcm9maWxlSGVhZGVyJ1xuaW1wb3J0IEluZmluaXRlU2Nyb2xsIGZyb20gJ3JlYWN0LWluZmluaXRlLXNjcm9sbGVyJ1xuaW1wb3J0IExvYWRlciBmcm9tICcuLi8uLi9jb21tb25zL0xvYWRlcidcbmltcG9ydCBIZWxtZXRUYWdzIGZyb20gJy4uLy4uL2NvbW1vbnMvSGVsbWV0VGFncydcbmltcG9ydCBDT05GSUcgZnJvbSAnLi4vLi4vLi4vY29uZmlnJ1xuaW1wb3J0IEZvb3RlciBmcm9tICcuLi9Ib21lL2Zvb3RlcidcbmNvbnN0IHF1ZXJ5U3RyaW5nID0gcmVxdWlyZSgncXVlcnktc3RyaW5nJylcblxuY2xhc3MgQXJ0aWNsZUxpc3QgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuXHRjb25zdHJ1Y3Rvcihwcm9wcykge1xuXHRcdHN1cGVyKHByb3BzKVxuXHRcdGNvbnN0IHBhcnNlZCA9IHF1ZXJ5U3RyaW5nLnBhcnNlKHRoaXMucHJvcHMubG9jYXRpb24uc2VhcmNoKVxuXG5cdFx0dmFyIHBhZ2UgPSAxO1xuXHRcdGlmIChwYXJzZWQgJiYgcGFyc2VkLnBhZ2UpIHtcblx0XHRcdHBhZ2UgPSBwYXJzZWQucGFnZVxuXHRcdH1cblxuXHRcdHZhciB0aXRsZSA9IHRoaXMucHJvcHMubWF0Y2gudXJsLnRvTG93ZXJDYXNlKCk7XG5cdFx0dGl0bGUgPSB0aXRsZS5zdWJzdHJpbmcoMSwgdGl0bGUubGVuZ3RoKVxuXG5cblx0XHR0aGlzLnN0YXRlID0ge1xuXHRcdFx0aGFzTW9yZTogdHJ1ZSxcblx0XHRcdHBhZ2U6IHBhZ2UsXG5cdFx0XHRzZWFyY2hWYWw6ICcnLFxuXHRcdFx0bm9BcnRpY2xlRm91bmQ6IGZhbHNlLFxuXHRcdFx0dGl0bGU6IHRpdGxlLFxuXHRcdFx0YnV0dG9uc1Zpc2libGU6IHRydWUsXG5cdFx0XHRzdGFydF9wYWdlOiBwYWdlXG5cdFx0fVxuXHR9XG5cblx0Y29tcG9uZW50RGlkTW91bnQoKSB7XG5cdFx0d2luZG93LnNjcm9sbFRvKDAsIDApO1xuXG5cdFx0dGhpcy5wcm9wcy5nZXRBcnRpY2xlTGlzdCh0aGlzLnN0YXRlLnRpdGxlLCB0aGlzLnN0YXRlLnBhZ2UsIHRydWUpXG5cdFx0Y29uc3QgcGFyc2VkID0gcXVlcnlTdHJpbmcucGFyc2UodGhpcy5wcm9wcy5sb2NhdGlvbi5zZWFyY2gpXG5cblx0XHRpZiAocGFyc2VkLnBhZ2UgJiYgcGFyc2VkLnBhZ2UgPT0gMSkge1xuXHRcdFx0dmFyIG5ld0hyZWYgPSB3aW5kb3cubG9jYXRpb24uaHJlZi5yZXBsYWNlKCc/cGFnZT0xJywgJycpO1xuXHRcdFx0bmV3SHJlZiA9IG5ld0hyZWYucmVwbGFjZSgnJnBhZ2U9MScsICcnKTtcblx0XHRcdHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gbmV3SHJlZjtcblx0XHR9XG5cblx0fVxuXG5cdGxvYWRNb3JlKGRlbHRhKSB7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRoYXNNb3JlOiBmYWxzZVxuXHRcdH0sICgpID0+IHtcblx0XHRcdGxldCBwYWdlID0gcGFyc2VJbnQodGhpcy5zdGF0ZS5wYWdlKSArIGRlbHRhXG5cdFx0XHR0aGlzLnByb3BzLmdldEFydGljbGVMaXN0KHRoaXMuc3RhdGUudGl0bGUsIHBhZ2UsIHRydWUsIHRoaXMuc3RhdGUuc2VhcmNoVmFsLCAocmVzcCkgPT4ge1xuXHRcdFx0XHRpZiAocmVzcC5sZW5ndGgpIHtcblx0XHRcdFx0XHR0aGlzLnNldFN0YXRlKHtcblx0XHRcdFx0XHRcdGhhc01vcmU6IHRydWUsXG5cdFx0XHRcdFx0XHRwYWdlXG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRcdFx0XHRoYXNNb3JlOiBmYWxzZVxuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9KVxuXHRcdH0pXG5cblx0fVxuXG5cdGNoYW5nZVZhbChlKSB7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRzZWFyY2hWYWw6IGUudGFyZ2V0LnZhbHVlXG5cdFx0fSk7XG5cdH1cblxuXHRzZWFyY2hBcnRpY2xlKCkge1xuXHRcdGxldCBwYWdlID0gMVxuXHRcdGlmICghdGhpcy5zdGF0ZS5zZWFyY2hWYWwpIHtcblx0XHRcdHBhZ2UgPSB0aGlzLnN0YXRlLnN0YXJ0X3BhZ2Vcblx0XHR9XG5cblx0XHR0aGlzLnNldFN0YXRlKHsgcGFnZTogcGFnZSB9LCAoKSA9PiB7XG5cdFx0XHR0aGlzLnByb3BzLmdldEFydGljbGVMaXN0KHRoaXMuc3RhdGUudGl0bGUsIHRoaXMuc3RhdGUucGFnZSwgdHJ1ZSwgdGhpcy5zdGF0ZS5zZWFyY2hWYWwsIChyZXNwKSA9PiB7XG5cdFx0XHRcdGlmIChyZXNwLmxlbmd0aCA9PSAwKSB7XG5cdFx0XHRcdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRcdFx0XHRoYXNNb3JlOiBmYWxzZSxcblx0XHRcdFx0XHRcdG5vQXJ0aWNsZUZvdW5kOiB0cnVlXG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRcdFx0XHRoYXNNb3JlOiB0cnVlLFxuXHRcdFx0XHRcdFx0bm9BcnRpY2xlRm91bmQ6IGZhbHNlXG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAodGhpcy5zdGF0ZS5zZWFyY2hWYWwpIHtcblx0XHRcdFx0XHR0aGlzLnNldFN0YXRlKHtcblx0XHRcdFx0XHRcdGJ1dHRvbnNWaXNpYmxlOiBmYWxzZVxuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0XHRcdFx0YnV0dG9uc1Zpc2libGU6IHRydWVcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fSlcblx0fVxuXG5cdGhhbmRsZUtleVVwKGUpIHtcblx0XHRpZiAoZS5rZXkgPT09ICdFbnRlcicpIHtcblx0XHRcdHRoaXMuc2VhcmNoQXJ0aWNsZSgpO1xuXHRcdH1cblx0fVxuXG5cdG5hdmlnYXRlKGRlbHRhID0gMCwgZSkge1xuXHRcdC8vIGUucHJldmVudERlZmF1bHQoKVxuXHRcdC8vIGUuc3RvcFByb3BhZ2F0aW9uKClcblx0XHQvLyB0aGlzLmxvYWRNb3JlKGRlbHRhKVxuXHR9XG5cblx0cmVuZGVyKCkge1xuXHRcdHZhciBwYWdlX3NpemUgPSA1MFxuXHRcdHZhciBwYWdlTm8gPSBwYXJzZUludCh0aGlzLnN0YXRlLnBhZ2UpO1xuXHRcdGxldCBjdXJyZW50UGFnZSA9IFtdXG5cdFx0Y3VycmVudFBhZ2UucHVzaCg8ZGl2IGNsYXNzTmFtZT1cImFydC1wYWdpbmF0aW9uLWJ0blwiPlxuXHRcdFx0PHNwYW4gY2xhc3NOYW1lPVwiZnctNTAwXCIgc3R5bGU9e3sgY29sb3I6ICcjMDAwJyB9fT57cGFnZU5vfTwvc3Bhbj5cblx0XHQ8L2Rpdj4pXG5cblx0XHRsZXQgcGxhY2VIb2xkZXIgPSAnU2VhcmNoIGFueSAnXG5cdFx0aWYgKHRoaXMucHJvcHMuYXJ0aWNsZUxpc3REYXRhICYmIHRoaXMucHJvcHMuYXJ0aWNsZUxpc3REYXRhLmNhdGVnb3J5KSB7XG5cdFx0XHRwbGFjZUhvbGRlciA9IHBsYWNlSG9sZGVyICsgdGhpcy5wcm9wcy5hcnRpY2xlTGlzdERhdGEuY2F0ZWdvcnkuc3BsaXQoJyAnKVswXVxuXHRcdH1cblxuXHRcdGxldCBoZWFkaW5nID0gXCJcIlxuXHRcdGxldCB1cmwgPSB0aGlzLnByb3BzLm1hdGNoLnVybC50b0xvd2VyQ2FzZSgpXG5cdFx0aWYgKHVybCA9PSAnL2FsbC1kaXNlYXNlcycpIHtcblx0XHRcdGhlYWRpbmcgPSBcIkFsbCBEaXNlYXNlc1wiXG5cdFx0fSBlbHNlIGlmICh1cmwgPT0gJy9hbGwtbWVkaWNpbmVzJykge1xuXHRcdFx0aGVhZGluZyA9IFwiQWxsIE1lZGljaW5lc1wiXG5cdFx0fSBlbHNlIHtcblx0XHRcdGhlYWRpbmcgPSBcIkFsbCBBcnRpY2xlc1wiXG5cdFx0fVxuXG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwicHJvZmlsZS1ib2R5LXdyYXBcIj5cblx0XHRcdFx0PFByb2ZpbGVIZWFkZXIgLz5cblx0XHRcdFx0PHNlY3Rpb24gY2xhc3NOYW1lPVwiY29udGFpbmVyIGNvbnRhaW5lci10b3AtbWFyZ2luXCI+XG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJyb3cgbWFpbi1yb3cgcGFyZW50LXNlY3Rpb24tcm93XCI+XG5cdFx0XHRcdFx0XHQ8TGVmdEJhciAvPlxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjb2wtMTIgY29sLW1kLTcgY29sLWxnLTcgY2VudGVyLWNvbHVtblwiPlxuXHRcdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdFx0dGhpcy5wcm9wcy5BUlRJQ0xFX0xPQURFRCA/IDxIZWxtZXRUYWdzIHRhZ3NEYXRhPXt7XG5cdFx0XHRcdFx0XHRcdFx0XHR0aXRsZTogKHRoaXMucHJvcHMuYXJ0aWNsZUxpc3REYXRhLnNlbyA/IHRoaXMucHJvcHMuYXJ0aWNsZUxpc3REYXRhLnNlby50aXRsZSA6IFwiXCIpLFxuXHRcdFx0XHRcdFx0XHRcdFx0ZGVzY3JpcHRpb246ICh0aGlzLnByb3BzLmFydGljbGVMaXN0RGF0YS5zZW8gPyB0aGlzLnByb3BzLmFydGljbGVMaXN0RGF0YS5zZW8uZGVzY3JpcHRpb24gOiBcIlwiKSxcblx0XHRcdFx0XHRcdFx0XHRcdGNhbm9uaWNhbFVybDogYCR7Q09ORklHLkFQSV9CQVNFX1VSTH0ke3RoaXMucHJvcHMubG9jYXRpb24ucGF0aG5hbWV9JHt0aGlzLnByb3BzLmxvY2F0aW9uLnNlYXJjaH1gLFxuXG5cdFx0XHRcdFx0XHRcdFx0XHRwcmV2OiBgJHsocGFnZU5vICE9IDEgJiYgcGFnZU5vIDw9IE1hdGguY2VpbCh0aGlzLnByb3BzLmFydGljbGVMaXN0RGF0YS50b3RhbF9hcnRpY2xlcyAvIHBhZ2Vfc2l6ZSkpID8gYCR7Q09ORklHLkFQSV9CQVNFX1VSTH0ke3RoaXMucHJvcHMubG9jYXRpb24ucGF0aG5hbWV9JHsocGFnZU5vID4gMiAmJiBwYWdlTm8gPD0gTWF0aC5jZWlsKHRoaXMucHJvcHMuYXJ0aWNsZUxpc3REYXRhLnRvdGFsX2FydGljbGVzIC8gcGFnZV9zaXplKSkgPyAnP3BhZ2U9JyArIChwYWdlTm8gLSAxKSA6ICcnfWAgOiAnJ31gLFxuXG5cdFx0XHRcdFx0XHRcdFx0XHRuZXh0OiBgJHsocGFnZU5vICE9IE1hdGguY2VpbCh0aGlzLnByb3BzLmFydGljbGVMaXN0RGF0YS50b3RhbF9hcnRpY2xlcyAvIHBhZ2Vfc2l6ZSkgJiYgcGFnZU5vIDw9IE1hdGguY2VpbCh0aGlzLnByb3BzLmFydGljbGVMaXN0RGF0YS50b3RhbF9hcnRpY2xlcyAvIHBhZ2Vfc2l6ZSkpID8gYCR7Q09ORklHLkFQSV9CQVNFX1VSTH0ke3RoaXMucHJvcHMubG9jYXRpb24ucGF0aG5hbWV9P3BhZ2U9JHsocGFnZU5vID49IDEgJiYgcGFnZU5vIDwgTWF0aC5jZWlsKHRoaXMucHJvcHMuYXJ0aWNsZUxpc3REYXRhLnRvdGFsX2FydGljbGVzIC8gcGFnZV9zaXplKSkgPyBwYWdlTm8gKyAxIDogJyd9YCA6ICcnfWBcblx0XHRcdFx0XHRcdFx0XHR9fSAvPiA6IG51bGxcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lci1mbHVpZCBtYWluLWNvbnRhaW5lclwiPlxuXHRcdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwicm93IGFydC1zZWFyY2gtcm93XCI+XG5cdFx0XHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNvbC0xMiBtcm5nLXRvcC0xMlwiPlxuXHRcdFx0XHRcdFx0XHRcdFx0XHQ8dWwgY2xhc3NOYW1lPVwibXJiLTEwIGJyZWFkY3J1bWItbGlzdFwiIHN0eWxlPXt7IHdvcmRCcmVhazogJ2JyZWFrLXdvcmQnIH19PlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdDxsaSBjbGFzc05hbWU9XCJicmVhZGNydW1iLWxpc3QtaXRlbVwiPlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PGEgaHJlZj1cIi9cIiBvbkNsaWNrPXsoZSkgPT4gdGhpcy5vbkhvbWVDbGljayhlLCBcIi9cIil9PlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8c3BhbiBjbGFzc05hbWU9XCJmdy01MDAgYnJlYWRjcnVtYi10aXRsZSBicmVhZGNydW1iLWNvbG9yZWQtdGl0bGVcIj5Ib21lPC9zcGFuPlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PC9hPlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdDwvbGk+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0PHNwYW4gY2xhc3NOYW1lPVwiYnJlYWRjcnVtYi1hcnJvd1wiPiZndDs8L3NwYW4+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0PGxpIGNsYXNzTmFtZT1cImJyZWFkY3J1bWItbGlzdC1pdGVtXCI+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8c3BhbiBjbGFzc05hbWU9XCJmdy01MDAgYnJlYWRjcnVtYi10aXRsZVwiPnt0aGlzLnByb3BzLmFydGljbGVMaXN0RGF0YS5jYXRlZ29yeX08L3NwYW4+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0PC9saT5cblx0XHRcdFx0XHRcdFx0XHRcdFx0PC91bD5cblx0XHRcdFx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjb2wtMTJcIj5cblx0XHRcdFx0XHRcdFx0XHRcdFx0PGlucHV0IHR5cGU9XCJ0ZXh0XCIgaWQ9XCJkaXNlYXNlLXNlYXJjaFwiIHZhbHVlPXt0aGlzLnN0YXRlLnNlYXJjaFZhbH0gY2xhc3NOYW1lPVwiYXJ0LXNlYXJjaGJhclwiIHBsYWNlaG9sZGVyPXtwbGFjZUhvbGRlcn0gb25DaGFuZ2U9eyhlKSA9PiB0aGlzLmNoYW5nZVZhbChlKX0gb25LZXlVcD17KGUpID0+IHRoaXMuaGFuZGxlS2V5VXAoZSl9IC8+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdDxidXR0b24gY2xhc3NOYW1lPVwiYXJ0LXNlYXJjaC1idG5cIiBvbkNsaWNrPXsoKSA9PiB0aGlzLnNlYXJjaEFydGljbGUoKX0+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0PGltZyBzcmM9e0FTU0VUU19CQVNFX1VSTCArIFwiL2ltYWdlcy9zZWFyY2guc3ZnXCJ9IC8+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdDwvYnV0dG9uPlxuXHRcdFx0XHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNvbC0xMlwiPlxuXHRcdFx0XHRcdFx0XHRcdFx0XHQ8aDEgY2xhc3NOYW1lPVwiZnctNTAwIG1ydC0yMFwiIHN0eWxlPXt7IGZvbnRTaXplOiAyMiB9fSA+e2hlYWRpbmd9PC9oMT5cblx0XHRcdFx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwicm93IG1ydC0yMFwiPlxuXHRcdFx0XHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR0aGlzLnByb3BzLkFSVElDTEVfTE9BREVEID9cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8ZGl2IHN0eWxlPXt7IHdpZHRoOiAnMTAwJScgfX0+XG5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0dGhpcy5wcm9wcy5hcnRpY2xlTGlzdC5sZW5ndGggJiYgIXRoaXMuc3RhdGUubm9BcnRpY2xlRm91bmQgP1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHRoaXMucHJvcHMuYXJ0aWNsZUxpc3QubWFwKChwcm9wZXJ0eSwgaW5kZXgpID0+IHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiA8ZGl2IGNsYXNzTmFtZT1cImNvbC0xMlwiIGtleT17aW5kZXh9PlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIndpZGdldCBkaXNlYXNlLXdpZGdldFwiIG9uQ2xpY2s9eygpID0+IHRoaXMucHJvcHMuaGlzdG9yeS5wdXNoKGAvJHtwcm9wZXJ0eS51cmx9YCl9PlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHByb3BlcnR5LmhlYWRlcl9pbWFnZSA/XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDxpbWcgY2xhc3NOYW1lPVwiZGlzZWFzZS1saXN0LWltZ1wiIHNyYz17cHJvcGVydHkuaGVhZGVyX2ltYWdlfSBhbHQ9e3Byb3BlcnR5LmhlYWRlcl9pbWFnZV9hbHR9IC8+IDogJydcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PGEgaHJlZj17YC8ke3Byb3BlcnR5LnVybH1gfSBvbkNsaWNrPXsoZSkgPT4gZS5wcmV2ZW50RGVmYXVsdCgpfT48aDIgY2xhc3NOYW1lPVwiZGlzZWFzZS1saXN0LW5hbWUgZnctNTAwXCI+e3Byb3BlcnR5LnRpdGxlfTwvaDI+PC9hPlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDxwIGNsYXNzTmFtZT1cImZ3LTUwMFwiIGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MPXt7IF9faHRtbDogcHJvcGVydHkuYXJ0aWNsZVRlYXNlciB9fT48L3A+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0fSkgOiA8cCBjbGFzc05hbWU9XCJmdy01MDAgdGV4dC1jZW50ZXJcIiBzdHlsZT17eyBmb250U2l6ZTogMjAgfX0gPk5vIEFydGljbGUgRm91bmQgISE8L3A+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0dGhpcy5wcm9wcy5hcnRpY2xlTGlzdC5sZW5ndGggJiYgIXRoaXMuc3RhdGUubm9BcnRpY2xlRm91bmQgJiYgdGhpcy5zdGF0ZS5idXR0b25zVmlzaWJsZSA/XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjb2wtMTJcIj5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0cGFnZU5vID09IDEgP1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiYXJ0LXBhZ2luYXRpb24tZGl2XCI+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR7Y3VycmVudFBhZ2V9XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8YSBvbkNsaWNrPXt0aGlzLm5hdmlnYXRlLmJpbmQodGhpcywgMSl9IGhyZWY9e2Ake3RoaXMuc3RhdGUudGl0bGV9P3BhZ2U9JHtwYWdlTm8gKyAxfWB9ID5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJhcnQtcGFnaW5hdGlvbi1idG5cIj5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8c3BhbiBjbGFzc05hbWU9XCJmdy01MDBcIj57cGFnZU5vICsgMX08L3NwYW4+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PC9hPlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDogKHBhZ2VObyA9PSBNYXRoLmNlaWwodGhpcy5wcm9wcy5hcnRpY2xlTGlzdERhdGEudG90YWxfYXJ0aWNsZXMgLyBwYWdlX3NpemUpKSA/XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImFydC1wYWdpbmF0aW9uLWRpdlwiPlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8YSBocmVmPXtgJHt0aGlzLnN0YXRlLnRpdGxlfT9wYWdlPSR7cGFnZU5vIC0gMX1gfSBvbkNsaWNrPXt0aGlzLm5hdmlnYXRlLmJpbmQodGhpcywgLTEpfT5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImFydC1wYWdpbmF0aW9uLWJ0blwiPlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PHNwYW4gY2xhc3NOYW1lPVwiZnctNTAwXCI+e3BhZ2VObyAtIDF9PC9zcGFuPlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8L2E+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHtjdXJyZW50UGFnZX1cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0OiA8ZGl2IGNsYXNzTmFtZT1cImFydC1wYWdpbmF0aW9uLWRpdlwiPlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8YSBvbkNsaWNrPXt0aGlzLm5hdmlnYXRlLmJpbmQodGhpcywgcGFnZU5vID09IDIgPyAtMSA6IC0xKX0gaHJlZj17YCR7cGFnZU5vID09IDIgPyBgJHt0aGlzLnN0YXRlLnRpdGxlfWAgOiBgJHt0aGlzLnN0YXRlLnRpdGxlfT9wYWdlPSR7cGFnZU5vIC0gMX1gfWB9ID5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImFydC1wYWdpbmF0aW9uLWJ0blwiPlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PHNwYW4gY2xhc3NOYW1lPVwiZnctNTAwXCI+e3BhZ2VObyAtIDF9PC9zcGFuPlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8L2E+XG5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0e2N1cnJlbnRQYWdlfVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8YSBocmVmPXtgJHt0aGlzLnN0YXRlLnRpdGxlfT9wYWdlPSR7cGFnZU5vICsgMX1gfSBvbkNsaWNrPXt0aGlzLm5hdmlnYXRlLmJpbmQodGhpcywgMSl9ID5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImFydC1wYWdpbmF0aW9uLWJ0blwiPlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PHNwYW4gY2xhc3NOYW1lPVwiZnctNTAwXCI+e3BhZ2VObyArIDF9PC9zcGFuPlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8L2E+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8L2Rpdj4gOiBcIlwiXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0PC9kaXY+IDogPExvYWRlciAvPlxuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0XHQ8L2Rpdj5cblxuXHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHQ8UmlnaHRCYXIgbm9DaGF0QnV0dG9uPXt0cnVlfSAvPlxuXHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8L3NlY3Rpb24+XG5cdFx0XHRcdDxGb290ZXIgLz5cblx0XHRcdDwvZGl2ID5cblx0XHQpO1xuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEFydGljbGVMaXN0IiwiaW1wb3J0IEFydGljbGVMaXN0VmlldyBmcm9tICcuL2FydGljbGVMaXN0J1xuXG5leHBvcnQgZGVmYXVsdCBBcnRpY2xlTGlzdFZpZXciLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcblxuaW1wb3J0IEFydGljbGVMaXN0VmlldyBmcm9tICcuLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvYXJ0aWNsZUxpc3QnXG5pbXBvcnQgeyBnZXRBcnRpY2xlTGlzdCwgZ2V0U3BlY2lhbGl0eUZvb3RlckRhdGEgfSBmcm9tICcuLi8uLi9hY3Rpb25zL2luZGV4LmpzJ1xuaW1wb3J0IERvY3RvcnNOZWFyTWVWaWV3IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9Eb2N0b3JzTmVhck1lL0RvY3RvcnNOZWFyTWVWaWV3JztcbmNvbnN0IHF1ZXJ5U3RyaW5nID0gcmVxdWlyZSgncXVlcnktc3RyaW5nJyk7XG5cblxuY2xhc3MgQXJ0aWNsZUxpc3QgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgcGFnZU5vOiAxXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdGF0aWMgbG9hZERhdGEoc3RvcmUsIG1hdGNoLCBxdWVyeSkge1xuICAgICAgICBsZXQgdGl0bGUgPSBtYXRjaC51cmxcbiAgICAgICAgdGl0bGUgPSB0aXRsZS5zdWJzdHJpbmcoMSwgdGl0bGUubGVuZ3RoKS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICBpZiAocXVlcnkucGFnZSkge1xuICAgICAgICAgICAgcXVlcnkgPSBxdWVyeS5wYWdlXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBxdWVyeSA9IDFcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgUHJvbWlzZS5hbGwoW3N0b3JlLmRpc3BhdGNoKGdldEFydGljbGVMaXN0KHRpdGxlLCBxdWVyeSkpXSkudGhlbigocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gcmVzdWx0WzBdXG4gICAgICAgICAgICAgICAgaWYgKCFyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KHt9KVxuICAgICAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdCAmJiByZXN1bHQubGVuZ3RoID09IDAgJiYgcXVlcnkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KHt9KVxuICAgICAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZ2V0U3BlY2lhbGl0eUZvb3RlckRhdGEoKGZvb3RlckRhdGEpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh7IGZvb3RlckRhdGE6IChmb290ZXJEYXRhIHx8IG51bGwpIH0pXG4gICAgICAgICAgICAgICAgfSkoKVxuICAgICAgICAgICAgfSkuY2F0Y2goKGUpID0+IHtcbiAgICAgICAgICAgICAgICByZWplY3QoKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBzdGF0aWMgY29udGV4dFR5cGVzID0ge1xuICAgICAgICByb3V0ZXI6ICgpID0+IG51bGxcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5tYXRjaC51cmwgPT09IFwiL2RvY3RvcnMtbmVhci1tZVwiID9cbiAgICAgICAgICAgICAgICAgICAgICAgIDxEb2N0b3JzTmVhck1lVmlldyB7Li4udGhpcy5wcm9wc30gLz4gOiA8QXJ0aWNsZUxpc3RWaWV3IHsuLi50aGlzLnByb3BzfSAvPlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHN0YXRlLCBwYXNzZWRQcm9wcykgPT4ge1xuICAgIC8qKlxuICAgICAqIGluaXRpYWxTZXJ2ZXJEYXRhIGlzIHNlcnZlciByZW5kZXJlZCBhc3luYyBkYXRhIHJlcXVpcmVkIGJ1aWxkIGh0bWwgb24gc2VydmVyLiBcbiAgICAgKi9cbiAgICBsZXQgaW5pdGlhbFNlcnZlckRhdGEgPSBudWxsXG4gICAgbGV0IHsgc3RhdGljQ29udGV4dCB9ID0gcGFzc2VkUHJvcHNcbiAgICBpZiAoc3RhdGljQ29udGV4dCAmJiBzdGF0aWNDb250ZXh0LmRhdGEpIHtcbiAgICAgICAgaW5pdGlhbFNlcnZlckRhdGEgPSBzdGF0aWNDb250ZXh0LmRhdGFcbiAgICB9XG5cbiAgICBsZXQge1xuICAgICAgICBhcnRpY2xlTGlzdCxcbiAgICAgICAgYXJ0aWNsZUxpc3REYXRhLFxuICAgICAgICBBUlRJQ0xFX0xPQURFRCxcbiAgICAgICAgcGFnZUJ1dHRvbkNvdW50LFxuICAgICAgICBhcnRpY2xlUGFnZUNvdW50XG4gICAgfSA9IHN0YXRlLlVTRVJcbiAgICByZXR1cm4ge1xuICAgICAgICBhcnRpY2xlTGlzdCxcbiAgICAgICAgYXJ0aWNsZUxpc3REYXRhLFxuICAgICAgICBBUlRJQ0xFX0xPQURFRCxcbiAgICAgICAgcGFnZUJ1dHRvbkNvdW50LFxuICAgICAgICBhcnRpY2xlUGFnZUNvdW50LFxuICAgICAgICBpbml0aWFsU2VydmVyRGF0YVxuICAgIH1cbn1cblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gKGRpc3BhdGNoKSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgZ2V0QXJ0aWNsZUxpc3Q6ICh0aXRsZSwgcGFnZSwgcmVwbGFjZUxpc3QsIHNlYXJjaFN0cmluZywgY2FsbGJhY2spID0+IGRpc3BhdGNoKGdldEFydGljbGVMaXN0KHRpdGxlLCBwYWdlLCByZXBsYWNlTGlzdCwgc2VhcmNoU3RyaW5nLCBjYWxsYmFjaykpLFxuICAgICAgICBnZXRTcGVjaWFsaXR5Rm9vdGVyRGF0YTogKGNiKSA9PiBkaXNwYXRjaChnZXRTcGVjaWFsaXR5Rm9vdGVyRGF0YShjYikpXG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbWFwRGlzcGF0Y2hUb1Byb3BzKShBcnRpY2xlTGlzdCk7Il0sInNvdXJjZVJvb3QiOiIifQ==