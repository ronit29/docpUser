import React from 'react';

class RelatedArticles extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="related-article">
                <p className="fw-500 mrb-10">{this.props.linkedArticle.content_box_title}</p>
                <ul className="related-articles-list">
                    {
                        this.props.linkedArticle.urls.map((article, i) => {
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
        )
    }
}

export default RelatedArticles