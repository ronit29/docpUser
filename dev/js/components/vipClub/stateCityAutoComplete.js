import React from 'react';

class StateCityAutoComplete extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }
   

    render() {
        return <div className="autocomplete" style={{width:'300px'}}>
                    <input id="myInput" type="text" name="myCountry" placeholder="Country" onChange={this.handleOnChange.bind(this,this.props.state)}/>
                </div>
            }
}


export default StateCityAutoComplete
