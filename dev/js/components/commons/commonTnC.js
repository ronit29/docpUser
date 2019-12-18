import React from 'react'
import { connect } from 'react-redux';
import { getBannerInfo } from '../../actions/index.js'
import Loader from '../commons/Loader'

import ProfileHeader from './DesktopProfileHeader'
import LeftBar from './LeftBar'
import Footer from './Home/footer'

class CommonTnC extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            data: []
        }
    }
    componentDidMount(){
        let dataParams = {
            id: this.props.match.params.id
        }
        this.props.getBannerInfo(dataParams, (err, resp)=>{
            if(resp && resp.length){
                resp = resp.filter(x=>x.id == dataParams.id);
                this.setState({data: resp});
            }
        });
    }

    render(){

        return (
            <div className="profile-body-wrap sitemap-body">
                <ProfileHeader />
                <div className="sub-header d-none d-lg-block" />
                <section className="container about-container">
                    <div className="row">
                        <div className="col-12 paypal-dtls-cont">
                            {
                                this.state.data && this.state.data.length?
                                <div dangerouslySetInnerHTML={{ __html: this.state.data[0].body }}></div>
                                :<Loader/>
                            }

                        </div>
                    </div>
                </section>
                <Footer />
            </div>
        )
    }
}

const mapStateToProps = (state)=>{
    return {

    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        getBannerInfo: (dataParams, cb) => dispatch(getBannerInfo(dataParams, cb))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CommonTnC);


