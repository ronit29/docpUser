import React from 'react';
import { Helmet } from "react-helmet";

class HelmetTags extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div>
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>HOME TITLE</title>
                    <link rel="canonical" href="http://mysite.com/example" />
                </Helmet>
            </div>
        )
    }
}

export default HelmetTags