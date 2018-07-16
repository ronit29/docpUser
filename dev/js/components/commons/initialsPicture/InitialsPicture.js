import React from 'react';

const COLOR_CODES = [
    '#F44336',
    '#E91E63',
    '#9C27B0',
    '#EF5350',
    '#EC407A',
    '#AB47BC',
    '#FF5252',
    '#FF4081',
    '#673AB7',
    '#3F51B5',
    '#2196F3',
    '#9575CD',
    '#7986CB',
    '#039BE5',
    '#0097A7',
    '#00897B',
    '#43A047',
    '#EF6C00',
    '#8D6E63',
    '#E64A19',
    '#3E2723',
    '#212121',
    '#607D8B'
]

class InitialsPicture extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            bgColor: COLOR_CODES[Math.floor(Math.random() * COLOR_CODES.length)]
        }
    }

    render() {
        let style = this.props.style || {}
        style['backgroundColor'] = this.state.bgColor
        let initial = "U"
        let name = this.props.name
        if (name && name.length) {
            name = name.split(' ')
            if (name[0]) {
                initial = name[0][0]
            }
            if (name[1]) {
                initial += name[1][0]
            }
        }
        if (this.props.has_image) {
            return <div>
                {this.props.children}
            </div>
        } else {
            return (
                <div className={this.props.className} style={style}>
                    <span>{initial.toUpperCase()}</span>
                </div>
            )
        }
    }
}

export default InitialsPicture
