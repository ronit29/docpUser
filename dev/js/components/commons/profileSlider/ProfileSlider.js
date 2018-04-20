import React from 'react';
import EmotiIcon from 'material-ui-icons/AccountCircle';

class ProfileSlider extends React.Component {
    constructor(props) {
        super(props)
    }

    switchUser(profileId) {
        this.context.router.history.push(`/user/${profileId}`)

    }

    static contextTypes = {
        router: () => null
    }

    render() {

        let profiles = []

        profiles = Object.keys(this.props.profiles).map((profileId, i) => {
            let src = this.props.profiles[profileId].profileImage || "https://www.atomix.com.au/media/2015/06/atomix_user31.png"
            return <div key={i} className="slideTile" onClick={this.switchUser.bind(this, profileId)}>
                <img className="profileCardImage" src={src}/>
            </div>
        })


        return (
            <div className="profileSlider">
                {profiles}
            </div>
        );
    }
}


export default ProfileSlider
