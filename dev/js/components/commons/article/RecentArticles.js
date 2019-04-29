import React from 'react';

class RecentArticles extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="related-article-sub">
                <div className="related-article">
                    <p className="fw-500 mrb-10">{this.props.recentArticleTitle}</p>
                    <ul className="related-articles-list">
                        {
                            this.props.recentArticlesItems.map((article, i) => {
                                if (article.url.startsWith("http") || article.url.startsWith("/")) {
                                    return <a href={article.url} key={i}>
                                        <li className="mrb-5">{article.title}</li>
                                    </a>
                                }
                                else {
                                    return <a href={'/' + article.url} key={i}>
                                        <li className="mrb-5">{article.title}</li>
                                    </a>
                                }
                            })
                        }
                    </ul>
                </div>
            </div>
        )
    }
}

export default RecentArticles