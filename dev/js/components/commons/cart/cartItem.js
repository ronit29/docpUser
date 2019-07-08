import React from 'react';
import InitialsPicture from '../../commons/initialsPicture'

class CartItem extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    removeFromCart(id) {
        this.props.removeFromCart(id)
    }

    edit(item) {
        let { valid, product_id, mrp, deal_price, id, data } = this.props
        let { lab, test_ids, doctor, hospital, coupon_code, profile, procedure_ids, is_home_pickup, address, start_date, start_time } = this.props.actual_data

        // doctor
        if (product_id == 1) {
            this.setOpdBooking(this.props)
            return
        }

        // lab
        if (product_id == 2) {
            this.setLabBooking(this.props)
            return
        }

    }

    buildOpdTimeSlot(data) {

        let time = {
            text: new Date(data.data.date).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }).split(' ')[0],
            deal_price: data.consultation.deal_price,
            is_available: true,
            mrp: data.consultation.mrp,
            price: data.consultation.deal_price,
            title: new Date(data.data.date).getHours() >= 12 ? 'PM' : 'AM',
            value: new Date(data.data.date).getHours() + new Date(data.data.date).getMinutes() / 60
        }

        return time

    }

    buildLabTimeSlot(data) {

        let time = {
            text: new Date(data.data.date).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }).split(' ')[0],
            deal_price: data.deal_price,
            is_available: true,
            mrp: data.mrp,
            price: data.deal_price,
            title: new Date(data.data.date).getHours() >= 12 ? 'PM' : 'AM',
            value: new Date(data.data.date).getHours() + new Date(data.data.date).getMinutes() / 60
        }

        return time

    }

    getFormattedDate(date){
        var dd = date.getDate();

        var mm = date.getMonth()+1; 
        var yyyy = date.getFullYear();
        if(dd<10) 
        {
            dd='0'+dd;
        } 

        if(mm<10) 
        {
            mm='0'+mm;
        }

        var today = yyyy+'-'+mm+'-'+dd
        return today
    }

    setOpdBooking(data) {

        if (data.valid) {

            let time_slot = this.buildOpdTimeSlot(data)
            let timeSlot = {
                date: new Date(data.data.date),
                slot: '',
                time: time_slot,
                selectedDoctor: data.actual_data.doctor,
                selectedClinic: data.actual_data.hospital
            }
            let extraTimeParams = null
            if(timeSlot.date) {
                extraTimeParams = this.getFormattedDate(timeSlot.date)
            }
            this.props.selectOpdTimeSLot(timeSlot, false, null, extraTimeParams)

            if (data.actual_data.coupon_code) {
                let coupon_id = ''
                let is_cashback = false
                let coupon_code = data.actual_data.coupon_code.length ? data.actual_data.coupon_code[0] : ''
                if (data.data.coupons && data.data.coupons.length) {
                    coupon_id = data.data.coupons[0].id
                    is_cashback = data.data.coupons[0].is_cashback

                }
                if (coupon_code) {
                    this.props.applyCoupons('1', { code: coupon_code, coupon_id: coupon_id, is_cashback: is_cashback }, coupon_id, data.actual_data.doctor)
                }

            }

            if (data.actual_data.payment_type >= 0 && data.actual_data.payment_type <= 2) {
                this.props.select_opd_payment_type(data.actual_data.payment_type)
            }
        }

        this.props.selectProfile(data.actual_data.profile)
        if (data.actual_data.procedure_ids && data.actual_data.procedure_ids.length) {
            this.props.saveProfileProcedures('', '', data.actual_data.procedure_ids, true)
        }
        if (data.data.doctor && data.data.doctor.url) {
            this.props.history.push(`/${data.data.doctor.url}/booking?doctor_id=${data.actual_data.doctor}&hospital_id=${data.actual_data.hospital}&cart_item=${this.props.id}`)
        } else {
            this.props.history.push(`/opd/doctor/${data.actual_data.doctor}/${data.actual_data.hospital}/bookdetails?cart_item=${this.props.id}`)
        }
    }

    setLabBooking(data) {
        this.props.clearAllTests()
        for (let curr_test of data.actual_data.test_ids) {
            let curr = {}
            curr.id = curr_test
            curr.extra_test = true
            curr.lab_id = data.actual_data.lab
            this.props.toggleDiagnosisCriteria('test', curr, true)
        }

        if (data.actual_data && data.actual_data.pincode) {
            this.props.savePincode(data.actual_data.pincode)
        }

        this.props.selectProfile(data.actual_data.profile)
        if (data.valid) {
            let time_slot = this.buildLabTimeSlot(data)
            let timeSlot = {
                date: new Date(data.data.date),
                time: time_slot
            }
            let extraTimeParams = null
            if(timeSlot.date){
                extraTimeParams = this.getFormattedDate(timeSlot.date)
            }
            this.props.selectLabTimeSLot(timeSlot, false, extraTimeParams)
            if (data.actual_data.coupon_code) {

                let coupon_id = ''
                let is_cashback = false
                let coupon_code = data.actual_data.coupon_code.length ? data.actual_data.coupon_code[0] : ''
                if (data.data.coupons && data.data.coupons.length) {
                    coupon_id = data.data.coupons[0].id
                    is_cashback = data.data.coupons[0].is_cashback

                }

                if (coupon_code) {
                    this.props.applyCoupons('2', { code: coupon_code, coupon_id: coupon_id, is_cashback: is_cashback }, coupon_id, data.actual_data.lab)
                }

            }
            if (data.actual_data.is_home_pickup) {
                this.props.selectLabAppointmentType('home')
            } else {
                this.props.selectLabAppointmentType('lab')
            }

        }

        if (data.data.lab && data.data.lab.url) {
            this.props.history.push(`/${data.data.lab.url}/booking?lab_id=${data.actual_data.lab}&cart_item=${this.props.id}`)
        } else {
            this.props.history.push(`/lab/${data.actual_data.lab}/book?cart_item=${this.props.id}`)
        }

    }

    is_item_old(date) {
        return (new Date()) > (new Date(date))
    }

    render() {

        let { valid, product_id, mrp, deal_price, id } = this.props
        let { lab, tests, doctor, hospital, coupons, profile, date, thumbnail, procedures } = this.props.data
        let { is_home_pickup, payment_type, insurance_message, is_appointment_insured, included_in_user_plan } = this.props.actual_data

        if (date) {
            date = new Date(date)
        }
        return (
            <div>
                <div className="widget mrb-15 mrng-top-12 p-relative">

                    <div className={valid ? "" : "cart-card-blur-opacity"}>

                        {/* {
                            !valid ? <p className="appointmentPassed">Your appointment date and time has passed.</p> : ""
                        } */}

                        {
                            is_appointment_insured ?
                                <div className="shopng-cart-price ins-val-bx">Covered Under Insurance</div>
                                :
                                included_in_user_plan ?
                                    <div className="shopng-cart-price ins-val-bx pkg-discountCpn">Docprime Care Benefit</div>
                                    : payment_type == 1 ? <div className="shopng-cart-price">
                                        {
                                            mrp ? <p>₹ {deal_price} <span className="shopng-cart-price-cut">₹ {mrp}</span></p> : ""
                                        }
                                    </div> : <div className="shopng-cart-price">
                                            {
                                                mrp ? <p>₹ {mrp}</p> : ""
                                            }
                                        </div>
                        }
                        <div className="widget-header dr-qucik-info widgetHeaderPaddingTop">
                            <div>
                                <div>
                                    {
                                        doctor ? <InitialsPicture name={doctor.name} has_image={!!thumbnail} className="initialsPicture-dbd cart-initialspic">
                                            <img src={thumbnail} style={{ width: '50px', height: '50px', marginTop: '8px' }} className="img-fluid img-round" />
                                        </InitialsPicture> : <InitialsPicture name={lab.name} has_image={!!thumbnail} className="initialsPicture-xs-cart">
                                                <img style={{ height: 'auto', width: 'auto', marginTop: '15px' }} src={thumbnail} className="fltr-usr-image-lab" />
                                            </InitialsPicture>
                                    }
                                </div>
                            </div>
                            {
                                doctor ? <div className="dr-profile mrt-10">
                                    <h1 className="dr-name">Dr. {doctor.name}</h1>
                                    {
                                        payment_type == 2 ? <span className="pay-at-clinic">Pay at Clinic</span> : ""
                                    }
                                    <p className="clinic-name text-sm">{hospital.name}</p>
                                </div> : <div className="dr-profile mrt-10">
                                        <h1 className="dr-name">{lab.name}</h1>
                                    </div>
                            }

                        </div>
                        <div className="shopping-card-details-list">
                            <ul>
                                {
                                    date ? <li>
                                        <p>
                                            <span className="shpng-dtls-ico"><img style={{ marginTop: '2px', width: '15px' }} src={ASSETS_BASE_URL + "/img/watch-date.svg"} /></span>{date.toDateString()} | {date.toLocaleTimeString()}
                                            {
                                                doctor ? "" : <span>
                                                    {is_home_pickup ? " | Home pickup" : " | Center visit"}
                                                </span>
                                            }
                                        </p>
                                    </li> : ""
                                }

                                {
                                    profile ? <li>
                                        {
                                            doctor ? <p>
                                                <span className="shpng-dtls-ico"><img src={ASSETS_BASE_URL + "/img/nw-usr.svg"} /></span>{profile.name}
                                            </p> : <p>
                                                    <span className="shpng-dtls-ico"><img src={ASSETS_BASE_URL + "/img/nw-usr.svg"} /></span>{profile.name}
                                                </p>
                                        }
                                    </li> : ""
                                }

                                {
                                    coupons && coupons.length ? <li>
                                        <p>
                                            <span className="shpng-dtls-ico"><img src={ASSETS_BASE_URL + "/img/ofr-cpn.svg"} /></span>
                                            Coupon Applied: <span className="coupon-applies-shpngcard">{coupons[0].code}</span>
                                        </p>
                                    </li> : ""
                                }

                            </ul>
                        </div>
                        {
                            tests && tests.length ? <div className="widget-content pt-0">
                                <div className="shoping-cart-test-list">
                                    <div className="p-relative">
                                        <img className="shpng-cart-tst-lst-img" src={ASSETS_BASE_URL + "/img/flask.svg"} />
                                        {
                                            tests.map((test, i) => {
                                                return <p key={i} className="test-list test-list-label clearfix new-lab-test-list">

                                                    {
                                                        is_appointment_insured || included_in_user_plan ?
                                                            <span className="float-right fw-700">₹ 0 </span>
                                                            : <span className="float-right fw-700">₹ {test.deal_price}<span className="test-mrp">₹ {test.mrp}</span>
                                                            </span>
                                                    }

                                                    <span className="test-name-item">{test.test_name}</span>
                                                </p>
                                            })
                                        }
                                    </div>
                                </div>
                            </div> : ""
                        }

                        {
                            procedures && procedures.length ? <div className="widget-content pt-0">
                                <div className="shoping-cart-test-list">
                                    <div className="p-relative">
                                        <img className="shpng-cart-tst-lst-img" src={ASSETS_BASE_URL + "/img/hand.svg"} />
                                        {
                                            procedures.map((proc, i) => {
                                                return <p key={i} className="test-list test-list-label clearfix new-lab-test-list">

                                                    <span className="float-right fw-700">₹ {proc.deal_price}<span className="test-mrp">₹ {proc.mrp}</span>
                                                    </span>
                                                    <span className="test-name-item">{proc.name}</span>
                                                </p>
                                            })
                                        }
                                    </div>
                                </div>
                            </div> : ""
                        }
                    </div>

                    <div className="shpng-card-btns">
                        <button onClick={this.removeFromCart.bind(this, id)}>Remove</button>
                        <button onClick={this.edit.bind(this)}>Edit</button>
                    </div>
                </div>

            </div>
        );
    }
}


export default CartItem
