import React from 'react';

class Accordian extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            accordianShow: false
        }
    }

    toggleAccordian() {
        this.setState(prevState => ({ accordianShow: !prevState.accordianShow }));
    }

    render() {
        return (
            <div className="container-fluid p-0">
                <div className="row">
                    <div className="col-12">
                        <div className="dp-accordian">
                            <div className="acdn-title" onClick={() => this.toggleAccordian()}>
                                <h2 className="fw-500">Know more about Docprime</h2>
                                <img className={this.state.accordianShow ? "acdn-arrow-up" : "acdn-arrow"} src={ASSETS_BASE_URL + "/img/customer-icons/dropdown-arrow.svg"} />
                            </div>
                            <div className={this.state.accordianShow ? "acdn-body mrt-10 acdn-block" : "acdn-body mrt-10 acdn-none"}>
                                <hr className="acdn-hr" />
                                {/* <h3 className="fw-500 mrb-10 acdn-heading">Free Family Doctor for Life</h3> */}
                                <p className="text-sm mrb-10">
                                    The enormously low ratio of doctors to patients is one of the biggest challenges for the country’s healthcare system. And that’s why docprime endeavors to bridge the gap between doctors and patients with our cutting-edge technology powered platform to deliver high-quality healthcare anytime anywhere.
                                    </p>
                                <p className="text-sm mrb-10">
                                    A group company of Policybazaar, docprime gives you access to highly skilled registered medical practitioner so that you can avail hospital-quality healthcare right from the comfort of your home. The company aims to bring back the concept of a family doctor with its ever-so-growing network of healthcare professionals to make high-quality medical assistance available right at your fingertips.
                                    </p>
                                <p className="text-sm mrb-10">
                                    With a team of highly-skilled doctors, AI-enabled Chatbot technology and, an easy-to-navigate, user-friendly interface, docprime is all set to beat arduous health challenges and ensure easy access to qualified doctors for billions of people, creating an experience that’s truly delightful for both end-users and healthcare experts.
                                    </p>
                                <p className="fw-500 mrb-10 acdn-heading">Docprime for Patients</p>
                                <h2 className="acdn-subheading">Free Online Doctor Consultation</h2>
                                <p className="text-sm mrb-10">
                                    Ask a Doctor & get answers for your health queries for free or indulge in a one-on-one online consultation, at any time and from anywhere. Simply visit our website and start interacting with best-in-class healthcare experts from various specialties.
                                    </p>
                                <h2 className="acdn-subheading">Book Doctor Appointments Online (upto 50% off)</h2>
                                <p className="text-sm mrb-10">
                                    Why wait in long queues to book an appointment with the doctor of your choice, when you can easily do it online and that too at a much lower price?Find some of the best doctors near you; check their doctor profiles, and book an appointment online with the doctor of your choice get 50% off on booking fees, all with just a few clicks and in a matter of a few minutes.
                                    </p>
                                <h2 className="acdn-subheading">Book Tests at Diagnostic Centres & Labs (upto 50% off)</h2>
                                <p className="text-sm mrb-10">
                                    Discover the best diagnostic centres near you from our huge inventory and book appointments at the diagnostic centre of your choice, in just a few clicks. So book diagnostic tests today and get up to 50% off.
                                    </p>
                                <p className="fw-500 mrb-10 acdn-heading">Docprime for Doctors</p>
                                <h2 className="acdn-subheading">Widen Your Reach</h2>
                                <p className="text-sm mrb-10">
                                    Are you a doctor or a healthcare expert? Use docprime to increase your visibility manifold, reach out to a wider range of patients and grow your practice without having to run from pillar to post.
                                    </p>
                                <h2 className="acdn-subheading">Simplify Your Practice</h2>
                                <p className="text-sm mrb-10">
                                    Take the hassle out of your practice and focus better on your patients. Automate everything right from appointment management to payment tracking and just focus on providing the highest quality of treatment to their patients.
                                    </p>
                                <p className="fw-500 mrb-10 acdn-heading">Docprime Services</p>
                                <h2 className="acdn-subheading">Book Lab Test</h2>
                                <p className="text-sm mrb-10">
                                    Book lab test right from the comfort of your home. Get amazing discounts on lab tests and get samples collected and report delivered, right at your doorsteps.
                                    </p>
                                <h2 className="acdn-subheading">Health Feed</h2>
                                <p className="text-sm mrb-10">
                                    Our aim to ensure a healthy lifestyle for everyone and in order to do that our knowledge-packed health feed offers information on various diseases, symptoms, and medicines.
                                    </p>
                                <h2 className="fw-500 mrb-10 acdn-heading">Questions You May have:</h2>
                                <h3 className="fw-500 acdn-ques">Question 1: I have a medical question. Can I ask it for free?</h3>
                                <p className="text-sm mrb-10">
                                    <strong>Answer:</strong> Yes! You can ask your medical questions for free. Alternatively, you may also download docprime App, available at Google Play Store and App Store, for free and ask a free health question to our doctors. Typically, our doctors will answer your query within 24 working hours after receiving your query.
                                    </p>
                                <h3 className="fw-500 acdn-ques">Question 2: Can doctors at docprime help me with my medical issues?</h3>
                                <p className="text-sm mrb-10">
                                    <strong>Answer:</strong> Our team of doctors is dedicated to helping you understand your medical issues and identify the next steps that may include lab tests, medications, or tips to improve medical conditions. No matter what your medical questions are, our doctors will be able to point you in the right direction towards the improvement of your health.
                                    </p>
                                <h3 className="fw-500 acdn-ques">Question 3: What if docprime doctors don’t get me a response?</h3>
                                <p className="text-sm mrb-10">
                                    <strong>Answer:</strong> Rest assured, our team of doctors will never miss out on responding to your medical questions. If you, still, don’t get a response, do leave us a message at our social media pages or call us up at our toll-free number and our team of experts will love to assist you.
                                    </p>
                                <h3 className="fw-500 acdn-ques">Question 4: Are doctors on your team qualified?</h3>
                                <p className="text-sm mrb-10">
                                    <strong>Answer:</strong> We have a hand-picked highly-qualified team of doctors across various specialties. Rest assured, any doctor that you will be consulting at docprime will be a verified, highly-skilled healthcare practitioner.
                                    </p>
                                <h3 className="fw-500 acdn-ques">Question 5: Is my personal information safe and is the consultation on docprime private?</h3>
                                <p className="text-sm mrb-10">
                                    <strong>Answer:</strong> Yes! We respect the privacy of every individual. That’s why we make sure that all your private and personal information is not shared with any third-party. In addition, every consultation on docprime is private and confidential.
                                    </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Accordian