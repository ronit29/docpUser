import React from 'react';
import { Motion, spring, presets } from 'react-motion';

const GENDER = {
    "m": "Male",
    "f": "Female",
    "o": "Other"
}

const ZOOM = 1.5
let IMAGE_WIDTH = 85

class ProfileSlider extends React.Component {
    constructor(props) {
        super(props)
        this.state = { scrollLeft: null, selected: null, prev: null }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return true
    }

    getAge(birthday) {
        birthday = new Date(birthday)
        var ageDifMs = Date.now() - birthday.getTime();
        var ageDate = new Date(ageDifMs); // miliseconds from epoch
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    }

    getAnimation() {
        let animation = null
        if (this.state.selected != null) {
            let selected = this.refs['profileElement' + this.state.selected].getElementsByClassName('avtar')[0]
            let prev = this.state.prev != null ? this.refs['profileElement' + this.state.prev].getElementsByClassName('avtar')[0] : null
            let scrollLeft = this.state.scrollLeft
            animation = <Motion ref='motion' defaultStyle={{ scrollLeft: 0, zoom: ZOOM, prevZoom: 1 }} style={{ scrollLeft: spring(scrollLeft, presets.noWobble), zoom: spring(ZOOM), prevZoom: spring(1) }}>
                {({ scrollLeft, zoom, prevZoom }) =>

                    <Scroller element={this.refs.profileTop} selected={selected}
                        prev={prev} zoom={zoom} prevZoom={prevZoom} scrollLeft={scrollLeft} />
                }
            </Motion>
        }
        return animation
    }

    onSelect(id, selected) {
        this.props.selectProfile(id)
        if (this.state.selected == selected)
            return
        let prev = null
        if (this.state.selected != null)
            prev = this.state.selected
        let containerWidth = this.refs.profileTop.offsetWidth
        let width = this.refs['profileElement' + selected].offsetWidth
        let imageWidth = IMAGE_WIDTH
        let scrollLeft = (selected + .5) * width - containerWidth / 2 + imageWidth * (ZOOM - 1) / 2
        this.setState({ scrollLeft: scrollLeft, selected: selected, prev: prev })
    }

    render() {

        let { profiles, selectedProfile } = this.props.USER
        let animation = this.getAnimation()

        return (

            <div ref='profileTop' className="widget profile-info hidden-md-up text-center mrt-10 clearfix">
                {
                    Object.keys(profiles).map((id, key) => {

                        return <div className="widget-content profile-slider " ref={'profileElement' + key} index={key} key={key} onClick={() => {
                            this.onSelect(id, key)

                        }}>
                            <div className="avtar avtar-md consumer-icon">
                                <img src={profiles[id].profile_image || "/assets/img/icons/drIcon.jpg"} className="img-fluid img-round " />
                            </div>
                            <div style={{ width: 85 }}>
                                <h4 className="title">{profiles[id].name}</h4>
                                <p className="fw-500 text-light mrb-5">{this.getAge(profiles[id].dob)} Years | {GENDER[profiles[id].gender]}</p>
                                <p className="fw-500 text-light">{profiles[id].name}</p>
                            </div>
                        </div>
                    })
                }

                {animation}

            </div>

        );
    }
}

class Scroller extends React.Component {
    render() {
        if (this.props.element)
            this.props.element.scrollLeft = this.props.scrollLeft
        if (this.props.selected)
            this.props.selected.style.zoom = this.props.zoom
        if (this.props.prev)
            this.props.prev.style.zoom = this.props.prevZoom

        return null
    }
}


export default ProfileSlider
