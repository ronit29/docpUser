import React from 'react';
import HelmetTags from '../HelmetTags'

class Disclaimer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        let mainClass
        let headingClass
        if(this.props.fromApp){
            mainClass = "container about-container appUrlPadding"
            headingClass = "col-12 text-center d-none d-md-block"
        }else{
            mainClass = 'container about-container'
            headingClass = "col-12 text-center"
        }
        return (
            <div className={mainClass}>
                <HelmetTags tagsData={{
                    title: ('Disclaimer | docprime'),
                    description: ('Disclaimer: Read Disclaimer document of docprime.')
                }} />
                <div className="row">
                    <div className={headingClass}>
                        <p className="fw-500 about-heading" style={{ marginBottom: 20 }}>Disclaimer</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 privacy-desc-div">
                        <p className="privacy-desc">
                            The information contained on Docprime Technologies Private Limited website www.docprime.com
                            (“Website”) is solely provided for informational purposes only and is not meant to substitute for the
                            advice provided by your personal doctor and/or other person(s) specializing in healthcare/medical
                            care. Information and statements regarding various tests offered by labs/hospitals or consultancy
                            programs, treatments, is solely for general reading and is a compilation from open source that was
                            available to us and/or the information supplied to us from third party labs/hospitals/doctors.
                            Anyconsultation and various test(s) are intended for general purpose only and are not meant to be
                            used in emergencies/serious illnesses requiring physical/face to face consultation. In case of any
                            negligence on the part of the User of website in acting on the same and the condition of the User
                            deteriorates, Docprime shall not be liable for any consequences arising out of, in relation or in
                            connection, or as a result of the same.
            </p>
                        <p className="privacy-desc">
                            Any interactions and associated issues with the labs/hospitals/doctors on the Website, is strictly
                            between User and the labs/hospitals/doctors. User shall not hold Docprime responsible for any and all
                            such interactions and associated issues. If the User decides to engage with a lab/hospital/doctor to
                            provide diagnostic services, the User will do so at his/her own risk.
            </p>
                        <p className="privacy-desc">
                            Be it noted, the information provided here is not medical advice hence is not intended to replace
                            consultation with a medical practitioner, and should not be treated as an alternative to medical
                            diagnosis or treatment from your doctor, or any other licensed healthcare professional. Docprime is not
                            a medical service provider or a clinical establishment, nor it is involved in providing any healthcare or
                            medical advice or diagnosis service, it shall hence not be responsible and owns no liability to Users for
                            any outcome from the consultation and or the various test offered by lab(s)s on the website.
            </p>
                        <p className="privacy-desc">
                            Do not self-diagnose or treat yourself based on the information provided on this Website. We further
                            assert, please seek medical advice and do not disregard medical advice, or discontinue medical
                            treatment by relying upon the information provided on this Website. External links to videos and other
                            websites provided here are purely for information purposes and Docprime does not warrant or
                            guarantee the accuracy, genuineness, reliability of such links/websites. We do not guarantee the
                            correctness of the information, please exercise discretion while applying the information to use. The
                            information provided hereunder is not intended to be a substitute for getting in touch with emergency
                            healthcare. If you (or the person you intend to provide information to) are facing a medical emergency,
                            please contact an ambulance service or hospital directly.
            </p>
                        <p className="privacy-desc mrt-20">
                            <strong>Copyright 2020. docprime.com. All rights reserved.</strong>
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}


export default Disclaimer
