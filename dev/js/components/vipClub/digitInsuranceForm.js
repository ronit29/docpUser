import React from 'react'

class DigitInsuranceForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {

        return (

                    <div className="widget mrb-10 digit-input-container">
                            <div className="widget-content">
                                <div className="ins-sub-forms">
                                    {/* <hr className="ins-internal-hr" /> */}
                                    <div className="sub-form-input-data">
                                        <div>
                                            <p className="sub-form-hed">Details</p>
                                        </div>
                                        <div className="sub-form-hed-click" >
                                            Add More <img src={ASSETS_BASE_URL + "/img/rgt-arw.svg"} />
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <button className='label-names-buttons btn-active ' name="title" value='mr.' data-param='title' >Mr.</button>
                                        <button className='label-names-buttons' name="title" value='miss.' data-param='title' >Ms.</button>
                                        <button className='label-names-buttons' value='mrs.' name="title" data-param='title'  >Mrs.</button>
                                    </div>
                                    <div className="row no-gutters">

                                        <div className="col-6">
                                            <div className="ins-form-group inp-margin-right ">
                                                <input type="text" id="name1" className="form-control ins-form-control" required autoComplete="off" name="name" data-param='name' />
                                                <label className="form-control-placeholder" htmlFor="name1">First Name</label>
                                                <img src={ASSETS_BASE_URL + "/img/nw-usr.svg"} />
                                            </div>

                                        </div>
                                        <div className="col-6">
                                            <div className="ins-form-group inp-margin-right ">
                                                <input type="text" id="middle_name" className="form-control ins-form-control" required autoComplete="off" name="middle_name" value="" data-param='middle_name' />
                                                <label className="form-control-placeholder" htmlFor="middle_name">Middle Name</label>
                                                <img src={ASSETS_BASE_URL + "/img/nw-usr.svg"} />
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="ins-form-group inp-margin-left">
                                                <input type="text" id="last_name" className="form-control ins-form-control" required autoComplete="off" name="last_name" data-param='last_name' />
                                                <label className="form-control-placeholder" htmlFor="last_name">Last Name</label>
                                                <img src={ASSETS_BASE_URL + "/img/nw-usr.svg"} />
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="ins-form-group">
                                                <input type="date" id="isn-date" className="form-control ins-form-control ins-date-picker-style" required autoComplete="off" name="dob" data-param='dob' value='date' />
                                                <label className="form-control-placeholder datePickerLabel" htmlFor="ins-date">Date of birth</label>
                                                <img src={ASSETS_BASE_URL + "/img/calendar-01.svg"} />
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="ins-form-group">
                                                <input type="text" className='form-control ins-form-control' required id="mil" />
                                                <label className='form-control-placeholder ' htmlFor="mil">Email</label>
                                                <img src={ASSETS_BASE_URL + "/img/mail-01.svg"} />
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="ins-form-group">
                                                <input type="text" id="mbl" className="form-control ins-form-control ins-date-picker-style" required autoComplete="off" name="dob" data-param='dob' value='' />
                                                <label className="form-control-placeholder" htmlFor="mbl">Mobile</label>
                                                <img src={ASSETS_BASE_URL + "/img/customer-icons/call.svg"} />
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="ins-form-group">
                                                <input type="text" id="pin" className="form-control ins-form-control ins-date-picker-style" required autoComplete="off" name="dob" data-param='dob' value='' />
                                                <label className="form-control-placeholder" htmlFor="pin">Pin Code</label>
                                                <img src={ASSETS_BASE_URL + "/img/location-01.svg"} />
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="ins-form-group">
                                                <input type="text" id="adr" className="form-control ins-form-control ins-date-picker-style" required autoComplete="off" name="dob" data-param='dob' value='' />
                                                <label className="form-control-placeholder" htmlFor="adr">Address</label>
                                                <img src={ASSETS_BASE_URL + "/img/location-01.svg"} />
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="ins-form-group inp-margin-right ">
                                                <input type="text" id="nomName" className="form-control ins-form-control" required autoComplete="off" name="name" data-param='name' />
                                                <label className="form-control-placeholder" htmlFor="nomName">Nominee Name</label>
                                                <img src={ASSETS_BASE_URL + "/img/nw-usr.svg"} />
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="ins-form-group">
                                                <select className="ins-select-drop" id="relation_dropdown" >
                                                    <option data-param="relation" disabled selected hidden value="relation">Nominee Relation</option>
                                                    <option data-param="relation" value="spouse">SPOUSE</option>
                                                    <option data-param="relation" value="son">SON</option>
                                                    <option data-param="relation" value="daughter">DAUGHTER</option>
                                                </select>
                                                <img src={ASSETS_BASE_URL + "/img/nw-usr.svg"} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                }
            }

export default DigitInsuranceForm;