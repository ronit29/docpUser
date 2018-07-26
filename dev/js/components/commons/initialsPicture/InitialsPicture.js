import React from 'react';

const COLOR_CODES = [
    '#ef9a9a',
    '#f48fb1',
    '#ce93d8',
    '#b39ddb',
    '#e74c3c',
    '#9fa8da',
    '#90caf9',
    '#81d4fa',
    '#80deea',
    '#80cbc4',
    '#a5d6a7',
    '#c5e1a5',
    '#e6ee9c',
    '#ffe082',
    '#ffcc80',
    '#ffab91',
    '#bcaaa4',
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
            return <div style={style} onClick={this.props.onClick || (() => { })}>{this.props.children}</div>
        } else {
            style['backgroundColor'] = this.state.bgColor
            return (
                <div className={this.props.className} style={style} onClick={this.props.onClick || (() => { })}>
                    <span>{initial.toUpperCase()}</span>
                </div>
            )
        }
    }
}

export default InitialsPicture
