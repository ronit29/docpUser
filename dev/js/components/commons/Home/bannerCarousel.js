import React from 'react';

class BannerCarousel extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            index: 0
        }
    }

    componentDidMount() {
        setInterval(() => {
            let curr_index = this.state.index
            curr_index = curr_index + 1
            if (curr_index > 3) {
                curr_index = 0
            }
            this.setState({ index: curr_index })
        }, 5000)
    }

    navigate() {

        if (this.state.index === 1) {
            let test = {}
            test.type = 'test'
            test.id = 12227
            this.props.toggleDiagnosisCriteria('test', test, true)
            setTimeout(() => {
                this.props.history.push('/lab/searchresults')
            }, 100)
        }
        else if (this.state.index === 2) {
            let test = {}
            test.type = 'test'
            test.id = 11554
            this.props.toggleDiagnosisCriteria('test', test, true)
            setTimeout(() => {
                this.props.history.push('/lab/searchresults')
            }, 100)
        }
        else if (this.state.index === 3) {
            let speciality = {}
            speciality.type = 'procedures_category'
            speciality.id = 2
            let filters = { 'sort_on': 'fees' }
            this.props.toggleOPDCriteria('procedures_category', speciality, true, filters)
            setTimeout(() => {
                this.props.history.push('/opd/searchresults')
            }, 100)
        }


    }

    render() {

        var imgData = [
            {
                'src': "/img/banners/banner_paytm.png",
                'href': ''
            },
            {
                'src': "/img/banners/banner_aarogyam.png",
                'href': "/lab/searchresults?test_ids=12227&min_distance=0&lat=28.459131&long=77.072561&min_price=0&max_price=20000&sort_on=&max_distance=15&lab_name=&network_id="
            },
            {
                'src': "/img/banners/banner_ultrasound.png",
                'href': "/lab/searchresults?test_ids=11554"
            },
            {
                'src': "/img/banners/banner_teeth.png",
                'href': "/opd/searchresults?specializations=&conditions=&lat=28.459131&long=77.072561&min_fees=0&max_fees=1500&min_distance=0&max_distance=15&sort_on=fees&is_available=false&is_female=false&doctor_name=&hospital_name=&procedure_ids=&procedure_category_ids=2"
            }
        ]

        return (
            <div className="banner-carousel-div mrt-20">
                <img src={ASSETS_BASE_URL + imgData[this.state.index].src} onClick={imgData[this.state.index].href != '' ? () => this.navigate() : ''} className={imgData[this.state.index].href != '' ? 'clickable-banner' : ''} />
                <div className="carousel-indicators mrt-10">
                    {
                        imgData.map((img, i) => {
                            return <span key={i} onClick={() => this.setState({ index: i })} className={this.state.index == i ? "indicator-selected" : ''}></span>
                        })
                    }
                </div>
            </div>
        );
    }
}

export default BannerCarousel