import React from 'react'
export default ({ isVip }) => {
	return (<div className={`dsclmer-ftr ${isVip?'margin-bottom-55':''}`}>
                <p className="fw-500 mrt-20" style={{ color: '#8a8a8a', fontSize: 10 }} >The Website is not intended to be used in case of a medical emergency and/ or critical care and the user should directly contact his/ her medical service provider for Physical Examination. Docprime is solely a technology partner.</p>
                <div className="col-12 footer-new-copyrght" style={{ paddingBottom: 5 }} >
                    <p>Docprime.com Copyright &copy; 2020.</p>
                    <p>All rights reserved.</p>
                    <p>DOCPRIME TECHNOLOGIES PRIVATE LIMITED</p>
                    <p>CIN : U74999HR2016PTC064312</p>
                </div>
            </div>)
}