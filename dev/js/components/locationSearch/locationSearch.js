import React from 'react';
import { connect } from 'react-redux';

import { } from '../../actions/index.js'

class LocationSearch extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {

        let input = document.getElementById('topLocationSearch')
        let options = {
            types: ['establishment']
        }
        let autocomplete = new google.maps.places.Autocomplete(input, options)

        google.maps.event.addListener(autocomplete, 'place_changed', function () {
            let place = autocomplete.getPlace()
            this.props.selectLocation(place)
            this.context.router.history.goBack()
        }.bind(this))

        input.focus()
    }

    static contextTypes = {
        router: () => null
    }

    render() {

        return (
            <div className="locationSearch">
                <div className="locationSearchBox">
                    <input className="topSearch" id="topLocationSearch" />
                </div>
            </div>
        );
    }
}


export default LocationSearch
