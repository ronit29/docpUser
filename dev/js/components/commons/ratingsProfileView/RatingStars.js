import React from 'react';

class RatingStars extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    render() {
        let { average_rating, rating_count } = this.props

        let rating = ''
        if (average_rating) {
            rating = (Math.ceil(average_rating * 2)) / 2;
        }

        let ratingArray = []
        for (let i = 0; i < Math.floor(rating); i++) {
            ratingArray.push(<img key={i} src={ASSETS_BASE_URL + '/img/customer-icons/rating-star-filled.svg'} className="img-cstm-docrating" style={{ width: this.props.width, marginRight: 2, height: this.props.height }} />)
        }

        if (rating != Math.floor(rating)) {
            ratingArray.push(<img key='half' src={ASSETS_BASE_URL + '/img/customer-icons/halfstar_new.svg'} className="img-cstm-docrating" style={{ width: this.props.width, marginRight: 2, height: this.props.height }} />)
        }

        let emptyStars = Math.floor(5 - rating);
        if (emptyStars) {
            for (let i = 0; i < emptyStars; i++) {
                ratingArray.push(<img key={i + 'empty'} src={ASSETS_BASE_URL + '/img/customer-icons/rating-star-empty.svg'} className="img-cstm-docrating" style={{ width: this.props.width, marginRight: 2, height: this.props.height }} />)
            }
        }
        return (
            <div className="cstm-doc-rtng" style={this.props.justifyCenter ? { justifyContent: 'center' } : {}}>
                {ratingArray}
                {
                    rating_count ?
                        <span>({rating_count})</span> : ''
                }
            </div>
        )
    }
}

export default RatingStars