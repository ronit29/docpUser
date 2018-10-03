import React from 'react';
import { Helmet } from "react-helmet";

class HelmetTags extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        let { tagsData, setDefault, seoFriendly } = this.props
        let title = (tagsData && tagsData.title) ? tagsData.title : ""
        let description = (tagsData && tagsData.description) ? tagsData.description : ""
        let keywords = (tagsData && tagsData.keywords) ? tagsData.keywords : ""
        let canonicalUrl = (tagsData && tagsData.canonicalUrl) ? tagsData.canonicalUrl : ""

        if (setDefault) {
            title = "Free Online Doctor Consultation | Up To 50% off on Doctor Appointment"
            description = "Consult Doctors Online for free or Book Appointment at docprime & get 50% off. &#10003 Ask a doctor for medical assistance, find & &#10003 Book best Labs, and &#10003 Hospitals."
        }

        if (canonicalUrl) {
            canonicalUrl = canonicalUrl.toLowerCase()
        }

        return (
            <Helmet>
                <title>{title}</title>
                <meta name="title" content={title} />
                <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
                <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                <meta name="mobile-web-app-capable" content="yes" />
                <meta name="theme-color" content="#ec720e" />
                <meta name="viewport" content="width=device-width, shrink-to-fit=no, initial-scale=1, user-scalable=no" />
                <meta name="description" content={description} />
                <meta name="keywords" content={keywords} />
                {
                    canonicalUrl ?
                        <link rel="canonical" href={canonicalUrl} />
                        : ''
                }
                {
                    seoFriendly === false ? <meta name="robots" content="noindex, notfollow" /> : ""
                }
            </Helmet>
        )
    }
}

export default HelmetTags