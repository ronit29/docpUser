import React from 'react'

class HomePageWidgets extends React.PureComponent {

	constructor(props) {
        super(props);
        this.state = {

        }
    }

    navigateTo = (where, e) =>{
        if (e) {
            e.preventDefault()
            e.stopPropagation()
        }

        if (this.props.type) {
            this.props.selectSearchType(this.props.type)
        }
        this.props.historyObj.push(where)
    }

    scroll(type) {
        let dataType = this.props.dataType
        let dataList = `${this.props.dataType}_list`
        var elmnt = document.getElementById(dataType)
        let outerDivWidth = elmnt.offsetWidth
        let childDivWidth = document.getElementsByClassName(dataList)[0].offsetWidth
        let cardCount = document.getElementsByClassName(dataList)[0].childElementCount
        let cardWidth = Math.ceil(childDivWidth / cardCount)

        let leftScroll = document.getElementById(dataType).scrollLeft
        let scrollVal = Math.floor(outerDivWidth / cardWidth) * cardWidth
        let cardEnd = cardCount * cardWidth

        if (type == 'right') {
            elmnt.scroll({ left: leftScroll + scrollVal, behavior: 'smooth' })
            if (cardEnd <= leftScroll + scrollVal + outerDivWidth) {
                document.getElementById(`${dataType}_leftArrow_hsptl`).classList.add("d-none")
            }
            document.getElementById(`${dataType}_RightArrow_hsptl`).classList.remove("d-none")
        } else {
            elmnt.scroll({ left: leftScroll - scrollVal, behavior: 'smooth' })
            if (leftScroll - scrollVal <= 0) {
                document.getElementById(`${dataType}_RightArrow_hsptl`).classList.add("d-none")
            }
            document.getElementById(`${dataType}_leftArrow_hsptl`).classList.remove("d-none")
        }
    }

	render(){

		let { dataType, heading, rightText, discount } = this.props
		return (
			<React.Fragment>
				<section className="card-block-row">
                    <div className="top-card-row">
                        <h6 style={{marginTop: 15}}>{heading}</h6>
                        {
                        	rightText?
                        	<a className="d-flex align-item-center" href="/" onClick={(e)=>{
                        		e.preventDefault();
                        		this.rightButtonClicked();
                        	}}>
	                            <span>{rightText}</span>
	                            <img className="ml-2" height="12" src={ASSETS_BASE_URL + "/img/right-arrow.svg"} alt="arrow"/>
	                        </a>
	                        :''
                        }
                    </div>
                    {
                    	discount?
                    	<div className="discount-badge">
                            <h6>{`Upto ${discount} OFF`}</h6>
                        </div>
                        :''
                    }
                    {/* card slider */}
                    <div className={`card-slider-container ${dataType}_list`} id={dataType}>
                    	{
                    		this.props.list.slice(0,9).map((listItem, i) => {

                			return <div className="slider-card-column" key={`${i}_dataType`}>
			                            <div className="slide-img-col d-flex justify-content-center align-item-center">
			                                <img className="img-fluid" src={listItem.svg_icon?listItem.svg_icon:listItem.icon?listItem.icon:listItem.logo} alt="Partners"/>
			                            </div>
			                            <h5 className="card-name">{listItem.name}</h5>
			                            {/* <h5 className="off-txt">30% OFF</h5>*/}
			                        </div>

                    		})
                    	}
                    </div>

                    {/* slider buttons */}
                    <a className="pkg-btnlft" id={`${dataType}_RightArrow_hsptl`} onClick={this.scroll.bind(this, 'left')}> 
                        <img height="12" src={ASSETS_BASE_URL + "/img/color-chev.svg"} alt="chev-left"/>
                    </a>
                    <a className="pkg-btnrgt" id={`${dataType}_leftArrow_hsptl`} onClick={this.scroll.bind(this, 'right')}> 
                        <img height="12" src={ASSETS_BASE_URL + "/img/color-chev.svg"} alt="chev-right"/>
                    </a>
                </section>
			</React.Fragment>
			)
	}
}

export default HomePageWidgets