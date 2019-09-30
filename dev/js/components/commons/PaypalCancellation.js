import React from 'react'
import ProfileHeader from './DesktopProfileHeader'
import LeftBar from './LeftBar'
import Footer from './Home/footer'

export default ({})=>{
   return (
            <div className="profile-body-wrap sitemap-body">
                <ProfileHeader />
                <section className="container parent-section book-appointment-section">
                    <div className="row main-row parent-section-row">
                        <LeftBar />

                        <div className="col-12">
                        	

                       	</div>
                    </div>
                </section>
                <Footer />
            </div>
        )
}