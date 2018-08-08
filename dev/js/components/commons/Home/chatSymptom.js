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
        // this.txtAnimation();
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
            if (document.getElementById('input-symptom-para')) {
                document.getElementById('input-symptom-para').innerHTML = sentence
            }

            let txt = this.state.symptoms[Math.floor(Math.random() * this.state.symptoms.length)]
            for (let chr of txt) {
                if (!this._ismounted) {
                    break
                }
                await this.delay()
                if (document.getElementById('input-symptom-para')) {
                    document.getElementById('input-symptom-para').innerHTML += chr
                }
            }
            for (let chr of txt) {
                if (!this._ismounted) {
                    break
                }
                await this.delay()
                txt = txt.substring(0, txt.length - 1)
                if (document.getElementById('input-symptom-para')) {
                    document.getElementById('input-symptom-para').innerHTML = sentence + txt
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
                    <a href="javascript:;" onClick={() => {
                        this.props.navigateTo('/chat', {
                            symptoms: this.state.selectedSymptoms
                        })
                    }}><li className="book-list-last-item">
                            <div className="book-list-img-div">
                                <img src={ASSETS_BASE_URL + "/img/customer-icons/consultation.svg"} className="book-list-img" />
                            </div>
                            <div className="book-list-label-div">
                                <p className="book-list-label">Get Instant Doctor Consultation for <span>FREE</span></p>
                            </div>
                            <div className="book-list-arrow">
                                <img src={ASSETS_BASE_URL + "/img/customer-icons/right-arrow.svg"} className="list-arrow-rt" />
                            </div>
                        </li></a>
                </ul>
                <div className="symptoms-div">
                    <div className="scroll-arrow-div-rt symptoms-rt" onClick={() => {
                        this.slideLeft();
                    }}>
                        <img src={ASSETS_BASE_URL + "/img/customer-icons/right-arrow.svg"} className="scroll-arrow" />
                    </div>
                    <div className="scroll-arrow-div-lt symptoms-lt" onClick={() => {
                        this.slideRight();
                    }}>
                        <img src={ASSETS_BASE_URL + "/img/customer-icons/right-arrow.svg"} className="scroll-arrow" />
                    </div>
                    <p className="symptoms-label">Select From Common Symptoms</p>
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

                <div className="start-consult-div">
                    {
                        (this.state.selectedSymptoms && this.state.selectedSymptoms.length) ? <p className="fw-500">{this.state.selectedSymptoms.length} Symptoms Selected, click below</p> : <p className="fw-500">or simply click below to start</p>
                    }

                    <img className="start-consult-icon" src={ASSETS_BASE_URL + "/img/customer-icons/start-consult.png"} />
                    <button className="text-center" onClick={() => {
                        this.props.navigateTo('/chat', {
                            symptoms: this.state.selectedSymptoms
                        })
                    }}>Start Online Consultation</button>
                </div>

                {/* <div className="input-symptom-div" style={{height: 39}} onClick={() => {
                    this.props.navigateTo('/chat', {
                        symptoms: this.state.selectedSymptoms
                    })
                }}>
                    <div className="send-btn">
                        {
                            selectedSympsStr ? <img src={ASSETS_BASE_URL + "/img/icons/send-orange.svg"} /> : ""
                        }
                    </div>

                    {
                        selectedSympsStr ? <div className="input-symptom" style={{ border: 'none' }}>
                            <p > {selectedSympsStr} </p> </div> : <div className="input-symptom" style={{ height: 29, border: 'none' }}>
                                <p id="input-symptom-para">  </p> </div>
                    }

                </div> */}
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
