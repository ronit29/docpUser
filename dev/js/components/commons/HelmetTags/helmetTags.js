import React from 'react';
import { Helmet } from "react-helmet";

class HelmetTags extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        let { tagsData } = this.props
        let title = (tagsData && tagsData.title) ? tagsData.title : ""
        let description = (tagsData && tagsData.description) ? tagsData.description : ""
        let keywords = (tagsData && tagsData.keywords) ? tagsData.keywords : ""

        return (
            <div>
                <Helmet>
                    <title>{title}</title>
                    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
                    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                    <meta name="mobile-web-app-capable" content="yes" />
                    <meta name="theme-color" content="#ec720e" />
                    <meta name="viewport" content="width=device-width, shrink-to-fit=no, initial-scale=1, user-scalable=no" />
                    <meta name="description" content={description} />
                    <meta name="keywords" content={keywords} />
                </Helmet>
            </div>
        )
    }
}

export default HelmetTags