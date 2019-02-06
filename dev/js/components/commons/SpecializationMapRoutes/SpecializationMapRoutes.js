import React from 'react'
import ProfileHeader from '../DesktopProfileHeader'
import LeftBar from '../LeftBar'
import SpecialitiesView from './SpecialitiesView'
import SpecialitiesCitiesView from './SpecialitiesCitiesView'
import Footer from '../Home/footer'


class CitiesRoutes extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    componentDidMount() {
        if (window) {
            window.scrollTo(0, 0)
        }
    }

    render() {

        return (
            <div className="profile-body-wrap sitemap-body">
                <ProfileHeader />
                <section className="container dp-container-div">
                    <div className="row main-row parent-section-row">
                        <LeftBar />

                        <div className="col-12">

                        {
                            this.props.match.params.speciality?
                            <SpecialitiesCitiesView {...this.props} />
                            :<SpecialitiesView {...this.props} />
                        }

                       	</div>
                    </div>
                </section>
                <Footer />
            </div>
        )
    }

}

export default CitiesRoutes  