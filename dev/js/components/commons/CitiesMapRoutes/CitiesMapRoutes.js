import React from 'react'
import ProfileHeader from '../DesktopProfileHeader'
import LeftBar from '../LeftBar'
import CitiesMapView from './CitiesMapView'
import CitiesSpecialities from './CitiesSpecialities'

import { Route } from 'react-router-dom'

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

                        <div className="col-12 col-md-7 col-lg-7 center-column" >
                        	<Route exact path = {`${this.props.match.url}/`} render={(props) => {
                                return <CitiesMapView {...this.props} {...props} /> 
                            }} />

                            <Route path = {`${this.props.match.url}/:city`} render={(props) => {
                                return <CitiesSpecialities {...this.props} {...props} /> 
                            }} />

                       	</div>
                    </div>
                </section>
            </div>
        )
    }

}

export default CitiesRoutes  