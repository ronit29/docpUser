import React from 'react';

const debouncer = (fn,delay) => {
    let timer = null
    return function(){
        if(!timer){
            timer = setTimeout(() => {
                fn()
                timer = null
            },delay)
        }
    }
}


class CriteriaSearchView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            searchValue : '',
            searchResults : []
        }
    }

    componentDidMount() {
        this.getSearchResults = debouncer(this.getSearchResults.bind(this),1000)
        let input = document.getElementById('topCriteriaSearch')
        input.focus()
    }

    inputHandler(e){
        this.setState({searchValue : e.target.value})
        this.getSearchResults()
    }

    getSearchResults(){
        console.log('API')
    }

    static contextTypes = {
        router: () => null
    }

    render() {

        return (
            <div className="locationSearch">
                <div className="locationSearchBox">
                    <input className="topSearch" id="topCriteriaSearch" onChange={this.inputHandler.bind(this)} value={this.state.searchValue}/>
                </div>
            </div>
        );
    }
}


export default CriteriaSearchView
