import React from 'react';
import { Motion, spring, presets } from "react-motion";

class ChatSymptoms extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            scrollLeft: 0,
            symptoms: [
                "Fever",
                "Cough",
                "Headache",
                "Vomiting",
                "Diarrhoea",
                "Breathlessness",
                "Pain/Burning during urination",
                "Chest Pain",
                "Limb Numbness",
                "Ear Infection",
                "Eye Infection",
                "Sore Throat",
                "Acne"
            ],
            selectedSymptoms: [

            ]
        }
    }

    componentDidMount() {
        this._ismounted = true
        this.txtAnimation();
    }

    componentWillUnmount() {
        this._ismounted = false;
    }

    slideLeft() {
        this.slide("left");
    }

    slideRight() {
        this.slide("right");
    }

    slide(direction) {
        let containerWidth = this.refs.container.offsetWidth;
        let currentScroll = this.refs.container.scrollLeft;
        let scrollLeft =
            direction == "left"
                ? currentScroll + containerWidth
                : currentScroll - containerWidth;

        let scrollWidth = this.refs.container.getElementsByClassName(
            "symptoms-list"
        )[0].scrollWidth;

        scrollLeft = Math.max(0, scrollLeft);
        scrollLeft = Math.min(scrollLeft, scrollWidth - containerWidth);

        this.setState({ scrollLeft: scrollLeft });
    }

    getAnimation() {
        let scrollLeft = this.state.scrollLeft;
        let animation = (
            <Motion ref="motion" style={{ scrollLeft: spring(scrollLeft) }}>
                {({ scrollLeft }) => (
                    <Scroller
                        element={this.refs.container}
                        scrollLeft={scrollLeft}
                    />
                )}
            </Motion>
        );
        return animation;
    }

    delay() {
        return new Promise((resolve) => {
            setTimeout(resolve, 200)
        })
    }

    toggleSymptom(name) {
        if (this.state.selectedSymptoms.indexOf(name) > -1) {
            this.state.selectedSymptoms.splice(this.state.selectedSymptoms.indexOf(name), 1)
        } else {
            this.state.selectedSymptoms.push(name)
        }

        this.setState(this.state)
    }

    async txtAnimation() {
        while (true) {
            let sentence = "I am suffering from "
            if (document.getElementById('animation-input')) {
                document.getElementById('animation-input').placeholder = sentence
            }

            let txt = this.state.symptoms[Math.floor(Math.random() * this.state.symptoms.length)]
            for (let chr of txt) {
                if (!this._ismounted) {
                    break
                }
                await this.delay()
                if (document.getElementById('animation-input')) {
                    document.getElementById('animation-input').placeholder += chr
                }
            }
            for (let chr of txt) {
                if (!this._ismounted) {
                    break
                }
                await this.delay()
                txt = txt.substring(0, txt.length - 1)
                if (document.getElementById('animation-input')) {
                    document.getElementById('animation-input').placeholder = sentence + txt
                }
            }
            if (!this._ismounted) {
                break
            }
        }
        return
    }

    render() {

        let selectedSympsStr = this.state.selectedSymptoms.reduce((final, x) => {
            final += x + ', '
            return final
        }, "")

        if (selectedSympsStr) {
            selectedSympsStr = selectedSympsStr.slice(0, -2)
        }

        return (
            <div className="book-widget">
                <ul className="book-list">
                    <a href="javascript:;"><li className="book-list-last-item">
                        <div className="book-list-img-div">
                            <img src="/assets/img/customer-icons/consultation.svg" className="book-list-img" />
                        </div>
                        <div className="book-list-label-div">
                            <p className="book-list-label">Get instant Consultation right now for <span>FREE</span></p>
                        </div>
                        <div className="book-list-arrow">
                            <img src="/assets/img/customer-icons/right-arrow.svg" className="list-arrow-rt" />
                        </div>
                    </li></a>
                </ul>
                <div className="symptoms-div">
                    <div className="scroll-arrow-div-rt symptoms-rt" onClick={() => {
                        this.slideLeft();
                    }}>
                        <img src="/assets/img/customer-icons/right-arrow.svg" className="scroll-arrow" />
                    </div>
                    <div className="scroll-arrow-div-lt symptoms-lt" onClick={() => {
                        this.slideRight();
                    }}>
                        <img src="/assets/img/customer-icons/right-arrow.svg" className="scroll-arrow" />
                    </div>
                    <p className="symptoms-label">Select Symptom</p>
                    <div ref="container" className="symptoms-list-div">
                        <ul className="symptoms-list">
                            {
                                this.state.symptoms.map((symp, i) => {
                                    return <li className={this.state.selectedSymptoms.indexOf(symp) > -1 ? "selectedSymp" : ""} key={i} onClick={this.toggleSymptom.bind(this, symp)}>
                                        <p className={this.state.selectedSymptoms.indexOf(symp) > -1 ? "selectedSympP symptoms-list-item" : "symptoms-list-item"}>{symp}</p>
                                    </li>
                                })
                            }
                        </ul>
                        {this.getAnimation()}
                    </div>
                </div>
                <div className="input-symptom-div" onClick={() => {
                    this.props.navigateTo('/chat')
                }}>
                    <div className="send-btn">
                        {
                            selectedSympsStr ? <img src="/assets/img/icons/send-orange.svg" /> : ""
                        }
                    </div>

                    {
                        selectedSympsStr ? <input style={{ backgroundColor: 'white' }} disabled type="text" className="input-symptom" placeholder={selectedSympsStr} /> : <input style={{ backgroundColor: 'white' }} disabled type="text" id="animation-input" className="input-symptom" placeholder="" />
                    }

                </div>
            </div>
        );
    }
}

class Scroller extends React.Component {
    render() {
        if (this.props.element)
            this.props.element.scrollLeft = this.props.scrollLeft;
        return null;
    }
}

export default ChatSymptoms