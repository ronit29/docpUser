import React from 'react'
import ProfileHeader from '../DesktopProfileHeader'
import LeftBar from '../LeftBar'
import CitiesMapView from './CitiesMapView'
import CitiesSpecialities from './CitiesSpecialities'
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
                <section className="container parent-section book-appointment-section">
                    <div className="row main-row parent-section-row">
                        <LeftBar />

                        <div className="col-12">
                        	
                            {
                                this.props.match.params.city?
                                <CitiesSpecialities {...this.props} />
                                :<CitiesMapView {...this.props} />
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