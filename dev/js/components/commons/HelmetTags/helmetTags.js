import React from 'react';
import { Helmet } from "react-helmet";

class HelmetTags extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        let { tagsData, setDefault, noIndex } = this.props
        let title = (tagsData && tagsData.title) ? tagsData.title : ""
        let description = (tagsData && tagsData.description) ? tagsData.description : ""
        let keywords = (tagsData && tagsData.keywords) ? tagsData.keywords : ""
        let canonicalUrl = (tagsData && tagsData.canonicalUrl) ? tagsData.canonicalUrl : ""
        let prev = (tagsData && tagsData.prev) ? tagsData.prev : ""
        let next = (tagsData && tagsData.next) ? tagsData.next : ""
        let schema = (tagsData && tagsData.schema) ? tagsData.schema : null
        let ogUrl = (tagsData && tagsData.ogUrl) ? tagsData.ogUrl : null
        let ogType = (tagsData && tagsData.ogType) ? tagsData.ogType : null
        let ogSiteName = (tagsData && tagsData.ogSiteName) ? tagsData.ogSiteName : null
        let ogTitle = (tagsData && tagsData.ogTitle) ? tagsData.ogTitle : null
        let ogDescription = (tagsData && tagsData.ogDescription) ? tagsData.ogDescription : null
        let ogImage = (tagsData && tagsData.ogImage) ? tagsData.ogImage : null

        try {
            if (schema) {
                schema = JSON.stringify(schema)
            }
        } catch (e) {
            schema = ""
        }

        if (setDefault) {
            title = "Book Doctor Online | 50% off on Doctor Appointment & Lab Tests"
            description = "Book Doctor Appointment at docprime & get 50% off. &#10003 Find & Book Doctor online, find & &#10003 Book best Labs, and &#10003 Hospitals."
        }

        if (canonicalUrl) {
            canonicalUrl = canonicalUrl.toLowerCase()
        }
        let theme_color = "#ec720e"
        if(document &&  typeof document =="object" && document.location && document.location.host && document.location.host.includes('sbi')){
            theme_color = "#178ddd"
        }
        return (
            <Helmet>
                {
                    title ? <title>{title}</title> : ""
                }
                <meta name="title" content={title} />
                <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
                <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                <meta name="mobile-web-app-capable" content="yes" />
                <meta name="theme-color" content={theme_color} />
                <meta name="viewport" content="width=device-width, shrink-to-fit=no, initial-scale=1, user-scalable=no" />
                <meta name="description" content={description} />
                <meta name="keywords" content={keywords} />
                {
                    canonicalUrl ?
                        <link rel="canonical" href={canonicalUrl} />
                        : ''
                }
                {
                    noIndex ? <meta name="robots" content="noindex, nofollow" /> : ""
                }
                {
                    prev ?
                        <link rel="prev" href={prev} />
                        : ''
                }
                {
                    next ?
                        <link rel="next" href={next} />
                        : ''
                }
                {
                    schema ? <script type="application/ld+json">
                        {`${schema}`}
                    </script> : ""
                }
                {
                    ogUrl ?
                        <meta property="og:url" content={ogUrl} /> : ''
                }
                {
                    ogType ?
                        <meta property="og:type" content={ogType} /> : ''
                }
                {
                    ogSiteName ?
                        <meta property="og:site_name" content={ogSiteName} /> : ''
                }
                {
                    ogTitle ?
                        <meta property="og:title" content={ogTitle} /> : ''
                }
                {
                    ogDescription ?
                        <meta property="og:description" content={ogDescription} /> : ''
                }
                {
                    ogImage ?
                        <meta property="og:image" content={ogImage} /> : ''
                }
            </Helmet>
        )
    }
}

export default HelmetTags