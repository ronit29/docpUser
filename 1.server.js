exports.ids = [1];
exports.modules = {

/***/ "./dev/js/components/commons/staticPages/StaticPages.js":
/*!**************************************************************!*\
  !*** ./dev/js/components/commons/staticPages/StaticPages.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__(/*! react */ "react");

var _react2 = _interopRequireDefault(_react);

var _aboutUs = __webpack_require__(/*! ./aboutUs.js */ "./dev/js/components/commons/staticPages/aboutUs.js");

var _aboutUs2 = _interopRequireDefault(_aboutUs);

var _contactUs = __webpack_require__(/*! ./contactUs */ "./dev/js/components/commons/staticPages/contactUs.js");

var _contactUs2 = _interopRequireDefault(_contactUs);

var _privacy = __webpack_require__(/*! ./privacy */ "./dev/js/components/commons/staticPages/privacy.js");

var _privacy2 = _interopRequireDefault(_privacy);

var _howitWorks = __webpack_require__(/*! ./howitWorks */ "./dev/js/components/commons/staticPages/howitWorks.js");

var _howitWorks2 = _interopRequireDefault(_howitWorks);

var _disclaimer = __webpack_require__(/*! ./disclaimer */ "./dev/js/components/commons/staticPages/disclaimer.js");

var _disclaimer2 = _interopRequireDefault(_disclaimer);

var _terms = __webpack_require__(/*! ./terms */ "./dev/js/components/commons/staticPages/terms.js");

var _terms2 = _interopRequireDefault(_terms);

var _careers = __webpack_require__(/*! ./careers */ "./dev/js/components/commons/staticPages/careers.js");

var _careers2 = _interopRequireDefault(_careers);

var _media = __webpack_require__(/*! ./media */ "./dev/js/components/commons/staticPages/media.js");

var _media2 = _interopRequireDefault(_media);

var _doctorsignup = __webpack_require__(/*! ./doctorsignup */ "./dev/js/components/commons/staticPages/doctorsignup.js");

var _doctorsignup2 = _interopRequireDefault(_doctorsignup);

var _cancelPolicy = __webpack_require__(/*! ./cancelPolicy.js */ "./dev/js/components/commons/staticPages/cancelPolicy.js");

var _cancelPolicy2 = _interopRequireDefault(_cancelPolicy);

var _footer = __webpack_require__(/*! ../../commons/Home/footer */ "./dev/js/components/commons/Home/footer.js");

var _footer2 = _interopRequireDefault(_footer);

var _DesktopProfileHeader = __webpack_require__(/*! ../../commons/DesktopProfileHeader */ "./dev/js/components/commons/DesktopProfileHeader/index.js");

var _DesktopProfileHeader2 = _interopRequireDefault(_DesktopProfileHeader);

var _Loader = __webpack_require__(/*! ../../commons/Loader */ "./dev/js/components/commons/Loader/index.js");

var _Loader2 = _interopRequireDefault(_Loader);

var _reactRouterDom = __webpack_require__(/*! react-router-dom */ "react-router-dom");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const queryString = __webpack_require__(/*! query-string */ "query-string");

class StaticPagesView extends _react2.default.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        if (window) {
            window.scrollTo(0, 0);
        }
    }

    render() {
        //const parsed = queryString.parse(window.location.search)
        const parsed = queryString.parse(this.props.location.search);

        return _react2.default.createElement(
            'div',
            { className: 'profile-body-wrap' },
            parsed.fromApp ? '' : _react2.default.createElement(_DesktopProfileHeader2.default, null),
            _react2.default.createElement('div', { className: 'sub-header d-none d-lg-block' }),
            _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: '/about', render: props => {
                    return _react2.default.createElement(_aboutUs2.default, _extends({}, this.props, props, { fromApp: parsed.fromApp ? parsed.fromApp : false }));
                } }),
            _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: '/contact', render: props => {
                    return _react2.default.createElement(_contactUs2.default, _extends({}, this.props, props, { fromApp: parsed.fromApp ? parsed.fromApp : false }));
                } }),
            _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: '/privacy', render: props => {
                    return _react2.default.createElement(_privacy2.default, _extends({}, this.props, props));
                } }),
            _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: '/howitworks', render: props => {
                    return _react2.default.createElement(_howitWorks2.default, _extends({}, this.props, props));
                } }),
            _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: '/disclaimer', render: props => {
                    return _react2.default.createElement(_disclaimer2.default, _extends({}, this.props, props, { fromApp: parsed.fromApp ? parsed.fromApp : false }));
                } }),
            _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: '/terms', render: props => {
                    return _react2.default.createElement(_terms2.default, _extends({}, this.props, props, { fromApp: parsed.fromApp ? parsed.fromApp : false, forScroll: parsed.forBookingScroll ? parsed.forBookingScroll : false }));
                } }),
            _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: '/careers', render: props => {
                    return _react2.default.createElement(_careers2.default, _extends({}, this.props, props));
                } }),
            _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: '/media', render: props => {
                    return _react2.default.createElement(_media2.default, _extends({}, this.props, props));
                } }),
            _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: '/doctorsignup', render: props => {
                    return _react2.default.createElement(_doctorsignup2.default, _extends({}, this.props, props));
                } }),
            _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: '/cancelpolicy', render: props => {
                    return _react2.default.createElement(_cancelPolicy2.default, _extends({}, this.props, props, { fromApp: parsed.fromApp ? parsed.fromApp : false }));
                } }),
            parsed.fromApp ? '' : _react2.default.createElement(_footer2.default, null)
        );
    }
}

exports.default = StaticPagesView;

/***/ }),

/***/ "./dev/js/components/commons/staticPages/aboutUs.js":
/*!**********************************************************!*\
  !*** ./dev/js/components/commons/staticPages/aboutUs.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(/*! react */ "react");

var _react2 = _interopRequireDefault(_react);

var _HelmetTags = __webpack_require__(/*! ../HelmetTags */ "./dev/js/components/commons/HelmetTags/index.js");

var _HelmetTags2 = _interopRequireDefault(_HelmetTags);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class AboutUs extends _react2.default.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    navigateTo(where) {
        this.props.history.push(where);
    }

    render() {
        let mainClass;
        let headingClass;
        if (this.props.fromApp) {
            mainClass = "container about-container appUrlPadding";
            headingClass = "col-12 text-center d-none d-md-block";
        } else {
            mainClass = 'container about-container';
            headingClass = "col-12 text-center";
        }

        return _react2.default.createElement(
            'div',
            { className: mainClass },
            _react2.default.createElement(_HelmetTags2.default, { tagsData: {
                    title: 'About Us | docprime',
                    description: 'docprime: docprime is one stop health care solution for patients and doctors. Patients can book doctors online and doctors can manage patients online.'
                } }),
            _react2.default.createElement(
                'div',
                { className: 'row' },
                _react2.default.createElement(
                    'div',
                    { className: headingClass },
                    _react2.default.createElement(
                        'p',
                        { className: 'fw-500 about-heading' },
                        'About Us'
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'col-12' },
                    this.props.fromApp ? _react2.default.createElement(
                        'span',
                        null,
                        'This Mobile App is managed and operated by Docprime Technologies Private Limited. '
                    ) : '',
                    _react2.default.createElement(
                        'p',
                        { className: 'fw-500 about-content' },
                        'Docprime, a PolicyBazaar group company, is a young online medical services provider. Started with a team of young, experienced and vibrant professionals, the company has a humanitarian approach towards providing easy access to health care services.'
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'col-12 col-md-4 feature-col' },
                    _react2.default.createElement(
                        'div',
                        { className: 'feature-img-div text-center' },
                        _react2.default.createElement('img', { src: "/assets" + "/img/customer-icons/about-1.png", className: 'feature-img' })
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'feature-div text-center' },
                        _react2.default.createElement(
                            'p',
                            { className: 'fw-500 feature-heading' },
                            'Affordable'
                        ),
                        _react2.default.createElement(
                            'p',
                            { className: 'feature-content' },
                            'We offer our multiple services at an affordable price. We aim at making health care services easily accessible and affordable to ensure that patients do not hesitate while consulting doctors online.'
                        )
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'col-12 col-md-4 feature-col' },
                    _react2.default.createElement(
                        'div',
                        { className: 'feature-img-div text-center' },
                        _react2.default.createElement('img', { src: "/assets" + "/img/customer-icons/about-2.png", className: 'feature-img' })
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'feature-div text-center' },
                        _react2.default.createElement(
                            'p',
                            { className: 'fw-500 feature-heading' },
                            'Safe'
                        ),
                        _react2.default.createElement(
                            'p',
                            { className: 'feature-content' },
                            'We work round the clock to ensure highest levels of data security. With our platform, the records of both, the patients and the doctors are safe. Our separate infrastructure ensures that the provider\u2019s data and the consumer\u2019s data are isolated from each other.'
                        )
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'col-12 col-md-4 feature-col' },
                    _react2.default.createElement(
                        'div',
                        { className: 'feature-img-div text-center' },
                        _react2.default.createElement('img', { src: "/assets" + "/img/customer-icons/about-3.png", className: 'feature-img' })
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'feature-div text-center' },
                        _react2.default.createElement(
                            'p',
                            { className: 'fw-500 feature-heading' },
                            'Straight Forward'
                        ),
                        _react2.default.createElement(
                            'p',
                            { className: 'feature-content' },
                            'The docprime platform is easy to navigate and has a straightforward approach. The minimalist design of the website ensures that the consumers can find the information for their reference swiftly and effortlessly.'
                        )
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'col-12 about-content-div' },
                    _react2.default.createElement(
                        'p',
                        { className: 'fw-500 about-content' },
                        'docprime is dedicated towards the welfare of the people and to make a closely knit community of doctors and patients.'
                    ),
                    _react2.default.createElement(
                        'p',
                        { className: 'fw-500 about-content' },
                        'Today, the average lifestyle of a human being is fast-paced. In this fast-paced lifestyle, people ignore their health that leads to several health complications. At docprime, we aim to be the guide and the helping hand to ensure better health for everyone and help them at each step towards health improvement.'
                    ),
                    _react2.default.createElement(
                        'p',
                        { className: 'fw-500 about-content' },
                        'docprime aims at connecting people by providing them with every piece of information they need to secure themselves and their family\u2019s well-being. Assessing health issues, consulting experienced medical practitioners and storing health records are few services offered by the company.'
                    ),
                    _react2.default.createElement(
                        'p',
                        { className: 'fw-500 about-content' },
                        'Not only are we dedicated to providing a better health to people, we also ensure that they get easy access to country\u2019s best doctors in the most convenient and affordable ways. On our way to creating an experience truly prime for users and healthcare experts, we overcome multitudinous challenges almost every day.'
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'col-12 col-md-4 about-steps-div' },
                    _react2.default.createElement(
                        'div',
                        { className: 'about-steps' },
                        _react2.default.createElement(
                            'div',
                            { className: 'step-icon-div' },
                            _react2.default.createElement('img', { src: "/assets" + "/img/customer-icons/step-calendar.svg" })
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'step-heading-div text-center' },
                            _react2.default.createElement(
                                'p',
                                { className: 'fw-500 step-heading' },
                                'Book Appointments'
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'step-content-div' },
                            _react2.default.createElement(
                                'div',
                                { className: 'step-content' },
                                _react2.default.createElement('div', { className: 'step-circle' }),
                                _react2.default.createElement(
                                    'p',
                                    { className: 'step-data fw-500' },
                                    '10,000+ Verified Doctors'
                                )
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'step-content' },
                                _react2.default.createElement('div', { className: 'step-circle' }),
                                _react2.default.createElement(
                                    'p',
                                    { className: 'step-data fw-500' },
                                    'Book Appointments 24*7'
                                )
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'step-content' },
                                _react2.default.createElement('div', { className: 'step-circle' }),
                                _react2.default.createElement(
                                    'p',
                                    { className: 'step-data fw-500' },
                                    'Find Doctors Easily'
                                )
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'step-content' },
                                _react2.default.createElement('div', { className: 'step-circle' }),
                                _react2.default.createElement(
                                    'p',
                                    { className: 'step-data fw-500' },
                                    'Efficient Patient Administration'
                                )
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'step-content' },
                                _react2.default.createElement('div', { className: 'step-circle' }),
                                _react2.default.createElement(
                                    'p',
                                    { className: 'step-data fw-500' },
                                    'Swift Appointment Confirmation'
                                )
                            )
                        )
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'col-12 col-md-4 about-steps-div' },
                    _react2.default.createElement(
                        'div',
                        { className: 'about-steps' },
                        _react2.default.createElement(
                            'div',
                            { className: 'step-icon-div' },
                            _react2.default.createElement('img', { src: "/assets" + "/img/customer-icons/step-chat.svg" })
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'step-heading-div text-center' },
                            _react2.default.createElement(
                                'p',
                                { className: 'fw-500 step-heading' },
                                'Online Chat Consultation'
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'step-content-div' },
                            _react2.default.createElement(
                                'div',
                                { className: 'step-content' },
                                _react2.default.createElement('div', { className: 'step-circle' }),
                                _react2.default.createElement(
                                    'p',
                                    { className: 'step-data fw-500' },
                                    'Get docprime app for seamless online chat consultation'
                                )
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'step-content' },
                                _react2.default.createElement('div', { className: 'step-circle' }),
                                _react2.default.createElement(
                                    'p',
                                    { className: 'step-data fw-500' },
                                    'Low Response Time'
                                )
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'step-content' },
                                _react2.default.createElement('div', { className: 'step-circle' }),
                                _react2.default.createElement(
                                    'p',
                                    { className: 'step-data fw-500' },
                                    'Verified Doctors Available at your Disposal'
                                )
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'step-content' },
                                _react2.default.createElement('div', { className: 'step-circle' }),
                                _react2.default.createElement(
                                    'p',
                                    { className: 'step-data fw-500' },
                                    '100% Confidential and Private'
                                )
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'step-content' },
                                _react2.default.createElement('div', { className: 'step-circle' }),
                                _react2.default.createElement(
                                    'p',
                                    { className: 'step-data fw-500' },
                                    'On-Demand Consultation Available Anytime and Anywhere'
                                )
                            )
                        )
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'col-12 col-md-4 about-steps-div' },
                    _react2.default.createElement(
                        'div',
                        { className: 'about-steps' },
                        _react2.default.createElement(
                            'div',
                            { className: 'step-icon-div' },
                            _react2.default.createElement('img', { src: "/assets" + "/img/customer-icons/step-partner.svg" })
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'step-heading-div text-center' },
                            _react2.default.createElement(
                                'p',
                                { className: 'fw-500 step-heading' },
                                'Become a Partner with docprime'
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'step-content-div' },
                            _react2.default.createElement(
                                'div',
                                { className: 'step-content' },
                                _react2.default.createElement('div', { className: 'step-circle' }),
                                _react2.default.createElement(
                                    'p',
                                    { className: 'step-data fw-500' },
                                    'Reach New Patients'
                                )
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'step-content' },
                                _react2.default.createElement('div', { className: 'step-circle' }),
                                _react2.default.createElement(
                                    'p',
                                    { className: 'step-data fw-500' },
                                    'Maximize your Earnings'
                                )
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'step-content' },
                                _react2.default.createElement('div', { className: 'step-circle' }),
                                _react2.default.createElement(
                                    'p',
                                    { className: 'step-data fw-500' },
                                    'Keep Track of Patients and their Feedback'
                                )
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'step-content' },
                                _react2.default.createElement('div', { className: 'step-circle' }),
                                _react2.default.createElement(
                                    'p',
                                    { className: 'step-data fw-500' },
                                    'Edit your Profile Effortlessly'
                                )
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'step-content' },
                                _react2.default.createElement('div', { className: 'step-circle' }),
                                _react2.default.createElement(
                                    'p',
                                    { className: 'step-data fw-500' },
                                    'Chat With Patients without Giving your Personal Contact Details'
                                )
                            )
                        )
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'col-12 about-content-div' },
                    _react2.default.createElement(
                        'p',
                        { className: 'fw-500 about-content' },
                        'docprime ensures that you get the right solution and treatment, and that is why we have hired country\u2019s best and most experienced doctors who are knowledgeable, skilled and the best in their areas of expertise. They are available to solve your health related queries and provide on-demand healthcare solutions, 24X7X365.'
                    ),
                    _react2.default.createElement(
                        'p',
                        { className: 'fw-500 about-content' },
                        'At docprime, we understand the value of your time and that\u2019s why we want to offer you the best healthcare right from the comfort of your home. We provide doctors, physiotherapists and nurses for home visits to ensure that you don\u2019t need to step out when the need arises.'
                    ),
                    _react2.default.createElement(
                        'p',
                        { className: 'fw-500 about-content' },
                        'We aim to tap the latest technology to find solutions to various issues in order to disrupt the global healthcare delivery system. Our innovative healthcare solutions are a step towards bridging the gap between healthcare experts and the patients.'
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'col-12' },
                    _react2.default.createElement(
                        'button',
                        { onClick: () => {
                                this.props.fromApp ? this.navigateTo("/contact?fromApp=true") : this.navigateTo("/contact");
                            }, className: 'contact-btn' },
                        'Contact Us'
                    )
                )
            )
        );
    }
}

exports.default = AboutUs;

/***/ }),

/***/ "./dev/js/components/commons/staticPages/cancelPolicy.js":
/*!***************************************************************!*\
  !*** ./dev/js/components/commons/staticPages/cancelPolicy.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(/*! react */ "react");

var _react2 = _interopRequireDefault(_react);

var _HelmetTags = __webpack_require__(/*! ../HelmetTags */ "./dev/js/components/commons/HelmetTags/index.js");

var _HelmetTags2 = _interopRequireDefault(_HelmetTags);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class CancelPolicy extends _react2.default.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        let mainClass;
        let headingClass;
        if (this.props.fromApp) {
            mainClass = "container about-container appUrlPadding";
            headingClass = "col-12 text-center d-none d-md-block";
        } else {
            mainClass = 'container about-container';
            headingClass = 'col-12 text-center';
        }
        return _react2.default.createElement(
            'div',
            { className: mainClass },
            _react2.default.createElement(_HelmetTags2.default, { tagsData: {
                    title: 'Cancel Policy | docprime',
                    description: 'docprime: docprime is one stop health care solution for patients and doctors. Patients can book doctors online and doctors can manage patients online.'
                } }),
            _react2.default.createElement(
                'div',
                { className: 'row' },
                _react2.default.createElement(
                    'div',
                    { className: headingClass },
                    _react2.default.createElement(
                        'p',
                        { className: 'fw-500 about-heading' },
                        'Cancel Policy'
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'col-12' },
                    _react2.default.createElement(
                        'div',
                        { className: 'cancel-policy-text', style: { paddingTop: 0 } },
                        _react2.default.createElement(
                            'ul',
                            { style: { listStyle: 'disc', paddingLeft: 10 } },
                            _react2.default.createElement(
                                'li',
                                { className: 'fw-500 mrb-10' },
                                'For any online paid appointments, you can cancel your scheduled or re-booked appointment and initiate immediate refund at any time. An immediate refund shall be subject to terms and conditions as described under this section mentioned below.'
                            ),
                            _react2.default.createElement(
                                'li',
                                { className: 'fw-500 mrb-10' },
                                'In the event, the services are not availed at the appointed date and time and our systems do not validate the URN generated on your registered mobile number, we will automatically cancel your appointment at 12:00 midnight of next date of your appointment date.'
                            ),
                            _react2.default.createElement(
                                'li',
                                { className: 'fw-500 mrb-10' },
                                'Occasionally, appointments may be cancelled or postponed by the Third Party Service Provider. Should this occur, we will attempt to contact or inform you and you may re-schedule your appointment as per your convenience or visit www.docprime.com for fresh/re-booking on the Website.'
                            ),
                            _react2.default.createElement(
                                'li',
                                { className: 'fw-500 mrb-10' },
                                'Cancellation through mail or call center is allowed for all the bookings until the time of appointment or 12:00 midnight of next date of your appointment date. In such cases, we will initiate an immediate refund of your money as per the process defined under Refund, Rescheduling and Cancellation section under the End User Agreement. ',
                                _react2.default.createElement(
                                    'u',
                                    { style: { color: '#f78631', cursor: 'pointer', display: 'inline-block' }, onClick: () => this.props.history.push(this.props.fromApp ? '/terms?forBookingScroll=true&fromApp=true' : '/terms?forBookingScroll=true') },
                                    'click here'
                                )
                            )
                        )
                    )
                )
            )
        );
    }
}

exports.default = CancelPolicy;

/***/ }),

/***/ "./dev/js/components/commons/staticPages/careers.js":
/*!**********************************************************!*\
  !*** ./dev/js/components/commons/staticPages/careers.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = __webpack_require__(/*! react */ "react");

var _react2 = _interopRequireDefault(_react);

var _nodeSnackbar = __webpack_require__(/*! node-snackbar */ "node-snackbar");

var _nodeSnackbar2 = _interopRequireDefault(_nodeSnackbar);

var _HelmetTags = __webpack_require__(/*! ../HelmetTags */ "./dev/js/components/commons/HelmetTags/index.js");

var _HelmetTags2 = _interopRequireDefault(_HelmetTags);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Careers extends _react2.default.Component {
	constructor(props) {
		super(props);

		this.changeHandler = (event, key) => {
			this.setState({
				[key]: event.target.value
			});
		};

		this.filePicker = e => {
			this.setState({
				'resume': e.target.files[0]
			});
		};

		this.state = {
			resume: null,
			name: "",
			mobile: "",
			email: "",
			profile_type: ""
		};
	}

	onSubmitProfile(e) {
		e.preventDefault();
		let form_data = new FormData();
		form_data.append("resume", this.state.resume, "resume.pdf");
		form_data.append('name', this.state.name);
		form_data.append('mobile', this.state.mobile);
		form_data.append('email', this.state.email);
		form_data.append('profile_type', this.state.profile_type);
		this.props.submitCareerProfile(form_data, (error, res) => {
			this.setState({
				resume: null,
				name: "",
				mobile: "",
				email: "",
				profile_type: ""
			});
			_nodeSnackbar2.default.show({ pos: 'bottom-center', text: "Your job application submitted successfully." });
		});
	}

	render() {
		return _react2.default.createElement(
			'div',
			null,
			_react2.default.createElement(_HelmetTags2.default, { tagsData: {
					title: 'Career at docprime',
					description: "Fine career opportunity at docprime, India's one stop health care solution."
				} }),
			_react2.default.createElement(
				'div',
				{ className: 'laptop-img-div absolute-images' },
				_react2.default.createElement('img', { src: '/assets/img/career/laptop.png' })
			),
			_react2.default.createElement(
				'div',
				{ className: 'pages-img-div absolute-images' },
				_react2.default.createElement('img', { src: '/assets/img/career/pages.png' })
			),
			_react2.default.createElement(
				'div',
				{ className: 'container careers-container' },
				_react2.default.createElement(
					'div',
					{ className: 'row' },
					_react2.default.createElement(
						'div',
						{ className: 'col-12 col-md-6 hiring-col' },
						_react2.default.createElement(
							'div',
							{ className: 'hiring-heading-div' },
							_react2.default.createElement('img', { src: '/assets/img/career/hiring.png', className: 'hiring-img' }),
							_react2.default.createElement(
								'h1',
								{ className: 'hiring-heading' },
								'We Are Hiring !'
							)
						),
						_react2.default.createElement(
							'div',
							{ className: 'hiring-desc-div' },
							_react2.default.createElement(
								'h3',
								{ className: 'hiring-desc' },
								'We are hiring for multiple positions.'
							)
						),
						_react2.default.createElement('img', { src: '/assets/img/career/arrow.svg', className: 'careers-arrow-img absolute-images' })
					),
					_react2.default.createElement(
						'div',
						{ className: 'col-12 col-md-6 hiring-col' },
						_react2.default.createElement(
							'div',
							{ className: 'hiring-form-div' },
							_react2.default.createElement(
								'form',
								{ onSubmit: e => this.onSubmitProfile(e) },
								_react2.default.createElement(
									'div',
									{ className: 'form-group' },
									_react2.default.createElement(
										'select',
										{ className: 'form-control', value: this.state.profile_type, onChange: event => this.changeHandler(event, 'profile_type'), required: true },
										_react2.default.createElement(
											'option',
											{ value: '' },
											'Select Function'
										),
										_react2.default.createElement(
											'option',
											{ value: '1' },
											'Product'
										),
										_react2.default.createElement(
											'option',
											{ value: '2' },
											'Technology'
										),
										_react2.default.createElement(
											'option',
											{ value: '3' },
											'Sales'
										),
										_react2.default.createElement(
											'option',
											{ value: '4' },
											'Content'
										),
										_react2.default.createElement(
											'option',
											{ value: '5' },
											'Marketing'
										),
										_react2.default.createElement(
											'option',
											{ value: '6' },
											'QC'
										),
										_react2.default.createElement(
											'option',
											{ value: '7' },
											'Service & Support'
										),
										_react2.default.createElement(
											'option',
											{ value: '8' },
											'Doctors'
										)
									)
								),
								_react2.default.createElement(
									'div',
									{ className: 'form-group' },
									_react2.default.createElement('input', { type: 'text', id: 'name', className: 'form-control', placeholder: 'Your Name', value: this.state.name, onChange: event => this.changeHandler(event, 'name'), required: true })
								),
								_react2.default.createElement(
									'div',
									{ className: 'form-group' },
									_react2.default.createElement('input', { type: 'number', id: 'mobile', className: 'form-control', min: 5000000000, max: 9999999999, placeholder: 'Mobile Number', value: this.state.mobile, onChange: event => this.changeHandler(event, 'mobile'), required: true })
								),
								_react2.default.createElement(
									'div',
									{ className: 'form-group' },
									_react2.default.createElement('input', { type: 'email', id: 'email', className: 'form-control', placeholder: 'Email', value: this.state.email, onChange: event => this.changeHandler(event, 'email'), required: true })
								),
								_react2.default.createElement(
									'div',
									{ className: 'upload-resume-div' },
									_react2.default.createElement(
										'label',
										{ className: 'resume-label', htmlFor: 'upload-resume' },
										'Upload Resume'
									),
									_react2.default.createElement(
										'div',
										{ className: 'careers-upload-btn' },
										_react2.default.createElement('img', { src: '/assets/img/career/upload.svg', className: 'upload-icon' }),
										_react2.default.createElement(
											'p',
											{ className: 'careers-upload-text' },
											'Upload'
										)
									),
									_react2.default.createElement(
										'div',
										{ className: 'careers-input-file' },
										_react2.default.createElement('input', { type: 'file', name: 'resume', id: 'upload-resume', onChange: e => this.filePicker(e), required: true })
									)
								),
								_react2.default.createElement(
									'div',
									{ className: 'careers-submit-btn-div' },
									_react2.default.createElement(
										'button',
										{ type: 'submit', className: 'btn btn-primary careers-send-btn' },
										'Submit'
									)
								)
							)
						),
						_react2.default.createElement(
							'div',
							{ className: 'coffee-img-div absolute-images' },
							_react2.default.createElement('img', { src: '/assets/img/career/coffee.png', className: 'coffee-img' })
						)
					)
				)
			),
			_react2.default.createElement(
				'div',
				{ className: 'container-fluid absolute-images' },
				_react2.default.createElement(
					'div',
					{ className: 'row career-img-row' },
					_react2.default.createElement(
						'div',
						{ className: 'bag-img career-img-div' },
						_react2.default.createElement('img', { src: '/assets/img/career/bag.png', className: 'career-img' })
					),
					_react2.default.createElement(
						'div',
						{ className: 'specs-img career-img-div' },
						_react2.default.createElement('img', { src: '/assets/img/career/specs.png', className: 'career-img' })
					),
					_react2.default.createElement(
						'div',
						{ className: 'pen-img career-img-div' },
						_react2.default.createElement('img', { src: '/assets/img/career/pen.png', className: 'career-img' })
					),
					_react2.default.createElement(
						'div',
						{ className: 'cv-img career-img-div' },
						_react2.default.createElement('img', { src: '/assets/img/career/cv.png', className: 'career-img' })
					),
					_react2.default.createElement(
						'div',
						{ className: 'exam-img career-img-div' },
						_react2.default.createElement('img', { src: '/assets/img/career/exam.png', className: 'career-img' })
					)
				)
			)
		);
	}
}

exports.default = Careers;

/***/ }),

/***/ "./dev/js/components/commons/staticPages/contactUs.js":
/*!************************************************************!*\
  !*** ./dev/js/components/commons/staticPages/contactUs.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(/*! react */ "react");

var _react2 = _interopRequireDefault(_react);

var _nodeSnackbar = __webpack_require__(/*! node-snackbar */ "node-snackbar");

var _nodeSnackbar2 = _interopRequireDefault(_nodeSnackbar);

var _HelmetTags = __webpack_require__(/*! ../HelmetTags */ "./dev/js/components/commons/HelmetTags/index.js");

var _HelmetTags2 = _interopRequireDefault(_HelmetTags);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ContactUs extends _react2.default.Component {
    constructor(props) {
        super(props);

        this.changeHandler = (event, key) => {
            this.setState({
                [key]: event.target.value
            });
        };

        this.state = {
            name: "",
            mobile: "",
            email: "",
            message: ""
        };
    }

    onSubmitData(e) {
        e.preventDefault();
        this.props.submitContactMessage(this.state, (error, res) => {
            this.setState({
                name: "",
                mobile: "",
                email: "",
                message: ""
            });
            _nodeSnackbar2.default.show({ pos: 'bottom-center', text: "Contact Request taken successfully." });
        });
    }

    render() {
        let mainClass;
        if (this.props.fromApp) {
            mainClass = "container about-container appUrlPadding";
        } else {
            mainClass = 'container about-container';
        }
        return _react2.default.createElement(
            'div',
            { className: mainClass },
            _react2.default.createElement(_HelmetTags2.default, { tagsData: {
                    title: 'Contact Us | docprime',
                    description: 'Contact Us: Contact docprime for query related to booking, signup and more.'
                } }),
            _react2.default.createElement(
                'div',
                { className: 'row' },
                _react2.default.createElement(
                    'div',
                    { className: 'col-12 text-center' },
                    _react2.default.createElement(
                        'p',
                        { className: 'fw-500 about-heading', style: { fontSize: 20 } },
                        'Contact Us'
                    )
                )
            ),
            _react2.default.createElement(
                'div',
                { className: 'row' },
                _react2.default.createElement(
                    'div',
                    { className: 'col-12' },
                    _react2.default.createElement(
                        'div',
                        { className: 'contact-text' },
                        _react2.default.createElement(
                            'p',
                            { className: 'fw-500' },
                            'Feel like contacting us? Submit your queries here and we will get back to you as soon as possible.'
                        )
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'col-12 col-md-6 mrt-20' },
                    _react2.default.createElement(
                        'div',
                        { className: 'shadow' },
                        _react2.default.createElement(
                            'div',
                            { className: 'form-title', style: { fontSize: 16 } },
                            'Send Us a Message'
                        ),
                        _react2.default.createElement(
                            'form',
                            { onSubmit: this.onSubmitData.bind(this) },
                            _react2.default.createElement(
                                'div',
                                { className: 'contact-fields' },
                                _react2.default.createElement('input', { type: 'text', className: 'form-control', placeholder: 'Name', value: this.state.name, onChange: e => {
                                        this.changeHandler(e, 'name');
                                    }, required: true })
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'contact-fields' },
                                _react2.default.createElement('input', { type: 'email', className: 'form-control', placeholder: 'Email', value: this.state.email, onChange: e => {
                                        this.changeHandler(e, 'email');
                                    }, required: true })
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'contact-fields' },
                                _react2.default.createElement('input', { type: 'number', className: 'form-control', placeholder: 'Mobile Number', max: 9999999999, min: 5000000000, value: this.state.mobile, onChange: e => {
                                        this.changeHandler(e, 'mobile');
                                    }, required: true })
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'contact-fields' },
                                _react2.default.createElement('textarea', { className: 'form-control', placeholder: 'Message', rows: 3, value: this.state.message, onChange: e => {
                                        this.changeHandler(e, 'message');
                                    }, required: true })
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'submit' },
                                _react2.default.createElement(
                                    'button',
                                    { type: 'submit', className: 'btn submit-btn mrt-20' },
                                    'Submit'
                                )
                            )
                        )
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'col-12 offset-md-1 col-md-5 mrt-20' },
                    _react2.default.createElement(
                        'div',
                        { className: 'contact-text' },
                        _react2.default.createElement(
                            'p',
                            { className: 'fw-500 mrb-10' },
                            'You can also contact us via :'
                        ),
                        _react2.default.createElement(
                            'p',
                            { className: 'fw-500 mrb-10' },
                            _react2.default.createElement(
                                'span',
                                { className: 'fw-700' },
                                'E-mail :'
                            ),
                            ' customercare@docprime.com'
                        ),
                        _react2.default.createElement(
                            'p',
                            { className: 'fw-500' },
                            _react2.default.createElement(
                                'span',
                                { className: 'fw-700' },
                                'Phone :'
                            ),
                            ' 1800-123-9419'
                        )
                    )
                )
            )
        );
    }
}

exports.default = ContactUs;

/***/ }),

/***/ "./dev/js/components/commons/staticPages/disclaimer.js":
/*!*************************************************************!*\
  !*** ./dev/js/components/commons/staticPages/disclaimer.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(/*! react */ "react");

var _react2 = _interopRequireDefault(_react);

var _HelmetTags = __webpack_require__(/*! ../HelmetTags */ "./dev/js/components/commons/HelmetTags/index.js");

var _HelmetTags2 = _interopRequireDefault(_HelmetTags);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Disclaimer extends _react2.default.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        let mainClass;
        let headingClass;
        if (this.props.fromApp) {
            mainClass = "container about-container appUrlPadding";
            headingClass = "col-12 text-center d-none d-md-block";
        } else {
            mainClass = 'container about-container';
            headingClass = "col-12 text-center";
        }
        return _react2.default.createElement(
            'div',
            { className: mainClass },
            _react2.default.createElement(_HelmetTags2.default, { tagsData: {
                    title: 'Disclaimer | docprime',
                    description: 'Disclaimer: Read Disclaimer document of docprime.'
                } }),
            _react2.default.createElement(
                'div',
                { className: 'row' },
                _react2.default.createElement(
                    'div',
                    { className: headingClass },
                    _react2.default.createElement(
                        'p',
                        { className: 'fw-500 about-heading', style: { marginBottom: 20 } },
                        'Disclaimer'
                    )
                )
            ),
            _react2.default.createElement(
                'div',
                { className: 'row' },
                _react2.default.createElement(
                    'div',
                    { className: 'col-12 privacy-desc-div' },
                    _react2.default.createElement(
                        'p',
                        { className: 'privacy-desc' },
                        'The information contained on Docprime Technologies Private Limited website www.docprime.com (\u201CWebsite\u201D) is solely provided for informational purposes only and is not meant to substitute for the advice provided by your personal doctor and/or other person(s) specializing in healthcare/medical care. Information and statements regarding various tests offered by labs/hospitals or consultancy programs, treatments, is solely for general reading and is a compilation from open source that was available to us and/or the information supplied to us from third party labs/hospitals/doctors. Anyconsultation and various test(s) are intended for general purpose only and are not meant to be used in emergencies/serious illnesses requiring physical/face to face consultation. In case of any negligence on the part of the User of website in acting on the same and the condition of the User deteriorates, Docprime shall not be liable for any consequences arising out of, in relation or in connection, or as a result of the same.'
                    ),
                    _react2.default.createElement(
                        'p',
                        { className: 'privacy-desc' },
                        'Any interactions and associated issues with the labs/hospitals/doctors on the Website, is strictly between User and the labs/hospitals/doctors. User shall not hold Docprime responsible for any and all such interactions and associated issues. If the User decides to engage with a lab/hospital/doctor to provide diagnostic services, the User will do so at his/her own risk.'
                    ),
                    _react2.default.createElement(
                        'p',
                        { className: 'privacy-desc' },
                        'Be it noted, the information provided here is not medical advice hence is not intended to replace consultation with a medical practitioner, and should not be treated as an alternative to medical diagnosis or treatment from your doctor, or any other licensed healthcare professional. Docprime is not a medical service provider or a clinical establishment, nor it is involved in providing any healthcare or medical advice or diagnosis service, it shall hence not be responsible and owns no liability to Users for any outcome from the consultation and or the various test offered by lab(s)s on the website.'
                    ),
                    _react2.default.createElement(
                        'p',
                        { className: 'privacy-desc' },
                        'Do not self-diagnose or treat yourself based on the information provided on this Website. We further assert, please seek medical advice and do not disregard medical advice, or discontinue medical treatment by relying upon the information provided on this Website. External links to videos and other websites provided here are purely for information purposes and Docprime does not warrant or guarantee the accuracy, genuineness, reliability of such links/websites. We do not guarantee the correctness of the information, please exercise discretion while applying the information to use. The information provided hereunder is not intended to be a substitute for getting in touch with emergency healthcare. If you (or the person you intend to provide information to) are facing a medical emergency, please contact an ambulance service or hospital directly.'
                    ),
                    _react2.default.createElement(
                        'p',
                        { className: 'privacy-desc mrt-20' },
                        _react2.default.createElement(
                            'strong',
                            null,
                            'Copyright 2018. docprime.com. All rights reserved.'
                        )
                    )
                )
            )
        );
    }
}

exports.default = Disclaimer;

/***/ }),

/***/ "./dev/js/components/commons/staticPages/doctorsignup.js":
/*!***************************************************************!*\
  !*** ./dev/js/components/commons/staticPages/doctorsignup.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = __webpack_require__(/*! react */ "react");

var _react2 = _interopRequireDefault(_react);

var _nodeSnackbar = __webpack_require__(/*! node-snackbar */ "node-snackbar");

var _nodeSnackbar2 = _interopRequireDefault(_nodeSnackbar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Doctorsignup extends _react2.default.Component {
	constructor(props) {
		super(props);

		this.changeHandler = (event, key) => {
			this.setState({
				[key]: event.target.value
			});

			if (key === 'city') {
				if (event.target.value === "") {
					this.setState({ cityDropdownVisible: false });
				} else {
					this.setState({ cityDropdownVisible: true });
					this.props.getCities(event.target.value);
				}
			}
		};

		this.setCity = (cityName, cityId) => {
			this.setState({
				city: cityName,
				city_name: cityId,
				cityDropdownVisible: false
			});
		};

		this.state = {
			name: "",
			mobile: "",
			email: "",
			city: "",
			member_type: "",
			cityDropdownVisible: false,
			city_name: "",
			utm_params: props.utm_tags || {},
			source: 'Consumer',
			showSuccessBox: false
		};
	}

	componentWillReceiveProps(props) {
		if (this.state.utm_params != props.utm_tags) {
			this.setState({ utm_params: props.utm_tags });
		}
	}

	componentDidMount() {
		this.setState({ showSuccessBox: false });
	}

	onSubmitData(e) {
		e.preventDefault();
		this.props.signupDoctor(this.state, (error, res) => {
			this.setState({
				name: "",
				mobile: "",
				email: "",
				city: "",
				member_type: "",
				city_name: "",
				showSuccessBox: true
			});
			_nodeSnackbar2.default.show({ pos: 'bottom-center', text: "Sign Up was successful." });
		});
	}

	render() {
		return _react2.default.createElement(
			'div',
			{ className: 'container about-container' },
			_react2.default.createElement(
				'div',
				{ className: 'row' },
				this.state.showSuccessBox ? _react2.default.createElement(
					'div',
					{ className: 'col-12' },
					_react2.default.createElement(
						'div',
						{ className: 'submit-alert alert-success', role: 'alert' },
						_react2.default.createElement(
							'strong',
							null,
							'Thank you '
						),
						'for choosing ',
						_react2.default.createElement(
							'a',
							{ href: '/', onClick: e => {
									e.preventDefault();
									this.props.history.push('/');
								} },
							'docprime.com'
						),
						'. Our team will get in touch with you shortly.'
					)
				) : '',
				_react2.default.createElement(
					'div',
					{ className: 'col-12 dsp-main-info-div' },
					_react2.default.createElement(
						'div',
						{ className: 'dsp-phone-img-div' },
						_react2.default.createElement('img', { src: 'https://cdn.docprime.com/static/web/images/phone_doc.c1fe8649711f.png', className: 'dsp-phone-img' })
					),
					_react2.default.createElement(
						'div',
						{ className: 'dsp-img-info-div' },
						_react2.default.createElement(
							'div',
							{ className: 'dsp-logo-div' },
							_react2.default.createElement('img', { src: 'https://cdn.docprime.com/static/web/images/logo.9ea116657a60.png', className: 'dsp-logo', style: { width: 160 } })
						),
						_react2.default.createElement(
							'div',
							{ className: 'dsp-detail-text-div mrt-20' },
							_react2.default.createElement(
								'p',
								{ className: 'dsp-detail-text' },
								'Become our partner & help us serve millions of patients across India'
							)
						),
						_react2.default.createElement(
							'div',
							{ className: 'dsp-signup-div mrt-20' },
							_react2.default.createElement(
								'p',
								{ className: 'dsp-signup-label' },
								'SignUp as'
							)
						),
						_react2.default.createElement(
							'form',
							{ onSubmit: e => this.onSubmitData(e), autoComplete: 'off', autoCorrect: 'off', spellCheck: 'off' },
							_react2.default.createElement(
								'div',
								{ className: 'form-group' },
								_react2.default.createElement(
									'select',
									{ name: 'member_type', className: 'form-control', value: this.state.member_type, required: true, id: 'dsp-select-profession', onChange: event => this.changeHandler(event, 'member_type') },
									_react2.default.createElement(
										'option',
										{ value: '' },
										'Select'
									),
									_react2.default.createElement(
										'option',
										{ value: 1 },
										'Doctor'
									),
									_react2.default.createElement(
										'option',
										{ value: 2 },
										'Diagnostic Center'
									),
									_react2.default.createElement(
										'option',
										{ value: 3 },
										'Hospital/Clinic'
									)
								)
							),
							_react2.default.createElement(
								'div',
								{ className: 'form-group' },
								_react2.default.createElement('input', { type: 'text', name: 'name', placeholder: 'Name', maxLength: 255, className: 'form-control', required: true, id: 'dsp-name', value: this.state.name, onChange: event => this.changeHandler(event, 'name') })
							),
							_react2.default.createElement(
								'div',
								{ className: 'form-group dsp-city-mobile-div' },
								_react2.default.createElement(
									'div',
									{ className: 'dsp-mobile-div' },
									_react2.default.createElement('input', { type: 'number', name: 'mobile', max: 9999999999, id: 'dsp-mobile', placeholder: 'Mobile Number', className: 'form-control', required: true, min: 5000000000, value: this.state.mobile, onChange: event => this.changeHandler(event, 'mobile') })
								),
								_react2.default.createElement(
									'div',
									{ className: 'dsp-city-div' },
									_react2.default.createElement('input', { type: 'text', name: 'city_name', placeholder: 'City', maxLength: 255, className: 'form-control', required: true, id: 'dsp-city', value: this.state.city, onChange: event => this.changeHandler(event, 'city') }),
									this.state.cityDropdownVisible ? _react2.default.createElement(
										'div',
										{ className: 'dsp-city-dropdown' },
										_react2.default.createElement(
											'ul',
											{ className: 'dsp-city-list' },
											this.props.citiesName.map(city => {
												return _react2.default.createElement(
													'li',
													{ onClick: () => this.setCity(city.name, city.value), className: 'dsp-city-list-item', key: city.value },
													city.name
												);
											})
										)
									) : ""
								)
							),
							_react2.default.createElement(
								'div',
								{ className: 'form-group' },
								_react2.default.createElement('input', { type: 'email', name: 'email', pattern: '[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}$', placeholder: 'Email', value: this.state.email, className: 'form-control', required: true, maxLength: 254, id: 'dsp-email', onChange: event => this.changeHandler(event, 'email') })
							),
							_react2.default.createElement(
								'button',
								{ type: 'submit', className: 'btn btn-primary dsp-send-btn' },
								'Submit'
							)
						)
					)
				)
			)
		);
	}
}

exports.default = Doctorsignup;

/***/ }),

/***/ "./dev/js/components/commons/staticPages/howitWorks.js":
/*!*************************************************************!*\
  !*** ./dev/js/components/commons/staticPages/howitWorks.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(/*! react */ "react");

var _react2 = _interopRequireDefault(_react);

var _HelmetTags = __webpack_require__(/*! ../HelmetTags */ "./dev/js/components/commons/HelmetTags/index.js");

var _HelmetTags2 = _interopRequireDefault(_HelmetTags);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class HowitWorks extends _react2.default.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {

        return _react2.default.createElement(
            'div',
            { className: 'container about-container' },
            _react2.default.createElement(_HelmetTags2.default, { tagsData: {
                    title: 'How docprime Works | docprime',
                    description: 'how does docprime works for the patients and doctors.'
                } }),
            _react2.default.createElement(
                'div',
                { className: 'row' },
                _react2.default.createElement(
                    'div',
                    { className: 'col-12 text-center' },
                    _react2.default.createElement(
                        'p',
                        { className: 'fw-500 about-heading' },
                        'How it Works'
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'col-12' },
                    _react2.default.createElement(
                        'p',
                        { className: 'fw-500 about-content' },
                        'docprime.com aims to redefine how Indians seek healthcare services. It connects patients with medical consultants in real time and bridges the gap between need and fulfilment using state-of-the-art technology and a robust offline network. It also facilitates booking of doctor appointments and lab tests at discounted rates.'
                    ),
                    _react2.default.createElement(
                        'p',
                        { className: 'fw-500 about-content' },
                        'Our Key Services are:'
                    )
                )
            ),
            _react2.default.createElement(
                'div',
                { className: 'row working-row' },
                _react2.default.createElement(
                    'div',
                    { className: 'working-content-div col-12 col-lg-8' },
                    _react2.default.createElement(
                        'div',
                        { className: 'doctor-consultation' },
                        _react2.default.createElement(
                            'div',
                            { className: 'working-count text-center' },
                            _react2.default.createElement(
                                'p',
                                { className: 'fw-500' },
                                '1'
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'consultation-text' },
                            _react2.default.createElement(
                                'p',
                                { className: 'fw-500' },
                                'Free for Life-Doctor consultation'
                            )
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'doctext' },
                        _react2.default.createElement(
                            'ul',
                            { style: { listStyleType: 'disc' } },
                            _react2.default.createElement(
                                'li',
                                { className: 'fw-500' },
                                'Free medical consultation over chat and phone from experienced medical consultants'
                            ),
                            _react2.default.createElement(
                                'li',
                                { className: 'fw-500' },
                                'Instant and real-time interaction with medical consultants to help identify the root cause of the problem'
                            ),
                            _react2.default.createElement(
                                'li',
                                { className: 'fw-500' },
                                'Users can anonymously, or otherwise, communicate with doctors with various areas of expertise directly from their smartphones or desktops'
                            )
                        )
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'col-lg-4 d-none d-lg-block' },
                    _react2.default.createElement('img', { className: 'consultation-image', src: "/assets" + "/img/doctorConslutation.png" })
                )
            ),
            _react2.default.createElement(
                'div',
                { className: 'row working-row lab' },
                _react2.default.createElement(
                    'div',
                    { className: 'working-content-div col-12 col-lg-8' },
                    _react2.default.createElement(
                        'div',
                        { className: 'doctor-consultation' },
                        _react2.default.createElement(
                            'div',
                            { className: 'working-count text-center' },
                            _react2.default.createElement(
                                'p',
                                { className: 'fw-500' },
                                '2'
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'consultation-text' },
                            _react2.default.createElement(
                                'p',
                                { className: 'fw-500' },
                                'Doctor Search and Online Appointment Booking'
                            )
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'doctext' },
                        _react2.default.createElement(
                            'ul',
                            { style: { listStyleType: 'disc' } },
                            _react2.default.createElement(
                                'li',
                                { className: 'fw-500' },
                                'Search the best doctors nearby your area and book your next doctor visit conveniently through us'
                            ),
                            _react2.default.createElement(
                                'li',
                                { className: 'fw-500' },
                                'Avail discount upto 50% on booking doctor services'
                            ),
                            _react2.default.createElement(
                                'li',
                                { className: 'fw-500' },
                                '14000+doctors from reputed and leading clinics and hospitals on board to provide best healthcare services'
                            )
                        )
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'col-lg-4 d-none d-lg-block' },
                    _react2.default.createElement('img', { className: 'lab-image', src: "/assets" + "/img/phone.png" })
                )
            ),
            _react2.default.createElement(
                'div',
                { className: 'row working-row lab' },
                _react2.default.createElement(
                    'div',
                    { className: 'working-content-div col-12 col-lg-8' },
                    _react2.default.createElement(
                        'div',
                        { className: 'doctor-consultation' },
                        _react2.default.createElement(
                            'div',
                            { className: 'working-count text-center' },
                            _react2.default.createElement(
                                'p',
                                { className: 'fw-500' },
                                '3'
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'consultation-text' },
                            _react2.default.createElement(
                                'p',
                                { className: 'fw-500' },
                                'Search and Book Lab Tests at Discounted Rates'
                            )
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'doctext' },
                        _react2.default.createElement(
                            'ul',
                            { style: { listStyleType: 'disc' } },
                            _react2.default.createElement(
                                'li',
                                { className: 'fw-500' },
                                'Search the best diagnostic lab nearby your area'
                            ),
                            _react2.default.createElement(
                                'li',
                                { className: 'fw-500' },
                                'Avail discount upto 60% on lab tests'
                            ),
                            _react2.default.createElement(
                                'li',
                                { className: 'fw-500' },
                                'Comprehensive network of reputed 4000+ diagnostic labs'
                            ),
                            _react2.default.createElement(
                                'li',
                                { className: 'fw-500' },
                                'Detailed information about procedures of the tests, prices, and relevant preparations are easily accessible on the platform'
                            ),
                            _react2.default.createElement(
                                'li',
                                { className: 'fw-500' },
                                'Home collection facility available'
                            )
                        )
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'col-lg-4 d-none d-lg-block' },
                    _react2.default.createElement('img', { className: 'consultation-image', src: "/assets" + "/img/stayinghealthy.png" })
                )
            ),
            _react2.default.createElement(
                'div',
                { className: 'row working-row lab' },
                _react2.default.createElement(
                    'div',
                    { className: 'working-content-div col-12 col-lg-8' },
                    _react2.default.createElement(
                        'div',
                        { className: 'doctor-consultation' },
                        _react2.default.createElement(
                            'div',
                            { className: 'working-count text-center' },
                            _react2.default.createElement(
                                'p',
                                { className: 'fw-500' },
                                '4'
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'consultation-text' },
                            _react2.default.createElement(
                                'p',
                                { className: 'fw-500' },
                                'Health feed'
                            )
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'doctext' },
                        _react2.default.createElement(
                            'ul',
                            { style: { listStyleType: 'disc' } },
                            _react2.default.createElement(
                                'li',
                                { className: 'fw-500' },
                                'Important facts and knowledge about various diseases and medicines, and how to manage the condition'
                            ),
                            _react2.default.createElement(
                                'li',
                                { className: 'fw-500' },
                                'Information on useful lifestyle changes for overall well-being'
                            )
                        )
                    )
                )
            ),
            _react2.default.createElement(
                'div',
                { className: 'row lab' },
                _react2.default.createElement(
                    'div',
                    { className: 'working-content-div col-12 col-lg-8' },
                    _react2.default.createElement(
                        'p',
                        { className: 'fw-500 text-xl' },
                        'Our Upcoming Services :'
                    )
                )
            ),
            _react2.default.createElement(
                'div',
                { className: 'row working-row lab', style: { marginTop: 40 } },
                _react2.default.createElement(
                    'div',
                    { className: 'working-content-div col-12 col-lg-8' },
                    _react2.default.createElement(
                        'div',
                        { className: 'doctor-consultation' },
                        _react2.default.createElement(
                            'div',
                            { className: 'working-count text-center' },
                            _react2.default.createElement(
                                'p',
                                { className: 'fw-500' },
                                '1'
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'consultation-text' },
                            _react2.default.createElement(
                                'p',
                                { className: 'fw-500' },
                                'Subscription based OPD product'
                            )
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'doctext' },
                        _react2.default.createElement(
                            'ul',
                            { style: { listStyleType: 'disc' } },
                            _react2.default.createElement(
                                'li',
                                { className: 'fw-500' },
                                'Unlimited consultations and diagnostic test to make regular OPD visits convenient, accessible, and affordable'
                            ),
                            _react2.default.createElement(
                                'li',
                                { className: 'fw-500' },
                                'Ease of cashless transactions for OPD services'
                            ),
                            _react2.default.createElement(
                                'li',
                                { className: 'fw-500' },
                                'Online appointment booking'
                            )
                        )
                    )
                )
            ),
            _react2.default.createElement(
                'div',
                { className: 'row working-row lab' },
                _react2.default.createElement(
                    'div',
                    { className: 'working-content-div col-12 col-lg-8' },
                    _react2.default.createElement(
                        'div',
                        { className: 'doctor-consultation' },
                        _react2.default.createElement(
                            'div',
                            { className: 'working-count text-center' },
                            _react2.default.createElement(
                                'p',
                                { className: 'fw-500' },
                                '2'
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'consultation-text' },
                            _react2.default.createElement(
                                'p',
                                { className: 'fw-500' },
                                'ePharmacy'
                            )
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'doctext' },
                        _react2.default.createElement(
                            'ul',
                            { style: { listStyleType: 'disc' } },
                            _react2.default.createElement(
                                'li',
                                { className: 'fw-500' },
                                'Comprehensive network of pharmacies'
                            ),
                            _react2.default.createElement(
                                'li',
                                { className: 'fw-500' },
                                'Doorstep delivery of medicines at discounted rates'
                            )
                        )
                    )
                )
            )
        );
    }
}

exports.default = HowitWorks;

/***/ }),

/***/ "./dev/js/components/commons/staticPages/index.js":
/*!********************************************************!*\
  !*** ./dev/js/components/commons/staticPages/index.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _StaticPages = __webpack_require__(/*! ./StaticPages.js */ "./dev/js/components/commons/staticPages/StaticPages.js");

var _StaticPages2 = _interopRequireDefault(_StaticPages);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _StaticPages2.default;

/***/ }),

/***/ "./dev/js/components/commons/staticPages/media.js":
/*!********************************************************!*\
  !*** ./dev/js/components/commons/staticPages/media.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = __webpack_require__(/*! react */ "react");

var _react2 = _interopRequireDefault(_react);

var _HelmetTags = __webpack_require__(/*! ../HelmetTags */ "./dev/js/components/commons/HelmetTags/index.js");

var _HelmetTags2 = _interopRequireDefault(_HelmetTags);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Media extends _react2.default.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {

		return _react2.default.createElement(
			'div',
			{ className: 'container media-container' },
			_react2.default.createElement(_HelmetTags2.default, { tagsData: {
					title: 'Media Coverages And Press Releases | docprime',
					description: 'Read about media coverages, press releases and news related to docprime.'
				} }),
			_react2.default.createElement(
				'div',
				{ className: 'row media-row' },
				_react2.default.createElement(
					'div',
					{ className: 'col-12 col-lg-3' },
					_react2.default.createElement(
						'div',
						{ className: 'media-media-sticky-div' },
						_react2.default.createElement(
							'div',
							{ className: 'media-list-div d-none d-lg-block' },
							_react2.default.createElement(
								'ul',
								{ className: 'media-list-options' },
								_react2.default.createElement(
									'li',
									null,
									_react2.default.createElement(
										'p',
										{ className: 'media-list-options-item media-selected-option' },
										'All Media'
									)
								)
							)
						),
						_react2.default.createElement(
							'div',
							{ className: 'media-contact-div d-none d-lg-block' },
							_react2.default.createElement(
								'div',
								{ className: 'media-contact-label-div' },
								_react2.default.createElement(
									'p',
									{ className: 'media-contact-label' },
									'Contact Us'
								)
							),
							_react2.default.createElement(
								'div',
								{ className: 'media-contact-items-div' },
								_react2.default.createElement(
									'div',
									{ className: 'media-contact-item' },
									_react2.default.createElement(
										'div',
										{ className: 'media-contact-subitem' },
										_react2.default.createElement('img', { src: '/assets/img/media/email-icon.svg', style: { verticalAlign: 'middle' }, className: 'media-contact-icon' })
									),
									_react2.default.createElement(
										'div',
										{ className: 'media-contact-subitem' },
										_react2.default.createElement(
											'p',
											{ className: 'media-contact-text' },
											'media@docprime.com'
										)
									)
								),
								_react2.default.createElement(
									'div',
									{ className: 'media-contact-item media-location-item' },
									_react2.default.createElement(
										'div',
										{ className: 'media-contact-subitem media-location-subitem' },
										_react2.default.createElement('img', { src: '/assets/img/media/media-loc.svg', className: 'media-contact-icon' })
									),
									_react2.default.createElement(
										'div',
										{ className: 'media-contact-subitem' },
										_react2.default.createElement(
											'p',
											{ className: 'media-contact-text' },
											'Plot no'
										),
										_react2.default.createElement(
											'p',
											{ className: 'media-contact-text' },
											'119, Sector 44'
										),
										_react2.default.createElement(
											'p',
											{ className: 'media-contact-text' },
											'Gurugram - 122001'
										)
									)
								)
							)
						)
					)
				),
				_react2.default.createElement(
					'div',
					{ className: 'col-12 col-lg-6' },
					_react2.default.createElement(
						'div',
						{ className: 'media-div-head' },
						_react2.default.createElement('img', { src: '/assets/img/media/newspaper.png' }),
						_react2.default.createElement(
							'span',
							null,
							'Press Releases'
						)
					),
					_react2.default.createElement(
						'div',
						{ className: 'media-div-card' },
						_react2.default.createElement(
							'p',
							{ className: 'media-card-heading' },
							'Policybazaar.com to foray into healthcare and tech services'
						),
						_react2.default.createElement(
							'p',
							{ className: 'media-card-date' },
							'30 March, 2018'
						),
						_react2.default.createElement(
							'p',
							{ className: 'media-card-content' },
							'Policybazaar.com, India\'s largest insurance website and comparison portal, is planning to foray into the healthcare technology and services space'
						),
						_react2.default.createElement(
							'p',
							{ className: 'media-card-content' },
							'The new platform will provide consumers with easy, online and free access to PolicyBazaar\'s empanelled top-notch doctors and medical consultants.To begin with, the company intends to partner with 100 hospitals and 20,000 doctors, diagnostic centres, and clinics by the end of March 2019.The healthcare vertical also plans to offer a huge array of healthcare services, which includes in-hospital concierge services for its health insurance customers.By doing this, Policybazaar.com wants to be with its customers at the moment of truth, which is at the time of claims. "Our foray into the healthcare services space is in sync with the vision of expanding the social security net of India. With this venture, we seek to fulfill the need of providing quality and affordable healthcare of the burgeoning population at large by connecting the consumers with our in-house medical practitioners. The new portal will facilitate the creation of an inclusive healthcare system, which will eventually offer customised options for in-patient department insurance based on detailed analysis undertaken after studying consumer healthcare habits and patient\'s interactions with the doctors," said Yashish Dahiya, co-founder and CEO, Policybazaar.com.In the long run, PolicyBazaar.com wants to offer its customers a better and personalised claim and in-hospital experience.Policybazaar is also going to work with insurers to create a new category of health insurance for Out-patient expenses (OPD) and provide free online medical consultation to consumers over phone and chat. Policybazaar.com is in discussions with insurance companies to offer a first of its kind OPD insurance product. The company aims to offer 5 million OPD consultations by next FY.'
						),
						_react2.default.createElement(
							'div',
							{ className: 'media-icons-div' },
							_react2.default.createElement(
								'a',
								{ href: 'http://www.india.com/news/agencies/policybazaar-com-to-foray-into-healthcare-tech-service-space-3108739/', rel: 'nofollow', target: '_blank' },
								_react2.default.createElement('img', { src: '/assets/img/media/ind-blwh.png', onmouseover: 'this.src=\'/assets/img/media/ind-color.png\'', onmouseout: 'this.src=\'/assets/img/media/ind-blwh.png\'' })
							),
							_react2.default.createElement(
								'a',
								{ href: 'http://www.abplive.in/business/policybazaar-com-to-foray-into-healthcare-and-tech-services-676864', rel: 'nofollow', target: '_blank' },
								_react2.default.createElement('img', { src: '/assets/img/media/abp-blwh.png', onmouseover: 'this.src=\'/assets/img/media/abp-color.png\'', onmouseout: 'this.src=\'/assets/img/media/abp-blwh.png\'' })
							),
							_react2.default.createElement(
								'a',
								{ href: 'https://health.economictimes.indiatimes.com/news/health-it/policybazaar-com-to-foray-into-healthcare-tech/63577983', rel: 'nofollow', target: '_blank' },
								_react2.default.createElement('img', { src: '/assets/img/media/et-blwh.png', onmouseover: 'this.src=\'/assets/img/media/et-color.png\'', onmouseout: 'this.src=\'/assets/img/media/et-blwh.png\'' })
							),
							_react2.default.createElement(
								'a',
								{ href: 'https://www.outlookindia.com/newsscroll/policybazaarcom-to-foray-into-healthcare-tech-service-space/1329181', rel: 'nofollow', target: '_blank' },
								_react2.default.createElement('img', { src: '/assets/img/media/out-blwh.png', onmouseover: 'this.src=\'/assets/img/media/out-color.png\'', onmouseout: 'this.src=\'/assets/img/media/out-blwh.png\'' })
							),
							_react2.default.createElement(
								'a',
								{ href: 'https://www.deccanchronicle.com/business/companies/020418/policybazaarcom-to-foray-into-healthcare-technology.html', rel: 'nofollow', target: '_blank' },
								_react2.default.createElement('img', { src: '/assets/img/media/dc-blwh.png', onmouseover: 'this.src=\'/assets/img/media/dc-color.png\'', onmouseout: 'this.src=\'/assets/img/media/dc-blwh.png\'' })
							),
							_react2.default.createElement(
								'a',
								{ href: 'https://www.gadgetsnow.com/tech-news/policybazaar-to-enter-healthcare-tech-and-services-space/articleshow/63265798.cms', rel: 'nofollow', target: '_blank' },
								_react2.default.createElement('img', { src: '/assets/img/media/gn-blwh.png', onmouseover: 'this.src=\'/assets/img/media/gn-color.png\'', onmouseout: 'this.src=\'/assets/img/media/gn-blwh.png\'' })
							)
						)
					),
					_react2.default.createElement(
						'div',
						{ className: 'media-div-card' },
						_react2.default.createElement(
							'p',
							{ className: 'media-card-heading' },
							'New venture promoted to offer free online & over phone medical consultations'
						),
						_react2.default.createElement(
							'p',
							{ className: 'media-card-date' },
							'13 June, 2018'
						),
						_react2.default.createElement(
							'p',
							{ className: 'media-card-content content-shown' },
							'Yashish Dahiya, Co-founder & CEO, PolicyBazaar Group of Companies said: "We will be building a team of certified and quality medical professionals to give free online consultations to customers. This shall be supported by a robust offline network'
						),
						_react2.default.createElement(
							'p',
							{ className: 'media-card-content content-hidden' },
							'AI will play a key role in helping us build this in scale and efficiency.ETechAces Marketing & Consulting Pvt. (ETechAces\u201D), which owns India\u2019s leading insurtech brand, PolicyBazaar.com(\u201CPolicyBazaar\u201D) and India\u2019s leading lending marketplace, PaisaBazaar.com (\u201CPaisaBazaar\u201D), has floated another farm `docprime\' for foraying into the healthcare tech and service space.As part of its plans to capture the out of pocket healthcare market in India estimated at nearly $100+bn, the new venture  will provide free online and over phone medical consultations, to begin with. It aims to provide 1 million free medical consultations by March 2019 and reach the scale of 5 million by March 2020. Speaking on the latest venture, Yashish Dahiya, Co-founder & CEO, PolicyBazaar Group of Companies said: "We will be building a team of certified and quality medical professionals to give free online consultations to customers. This shall be supported by a robust offline network. AI will play a key role in helping us build this in scale and efficiency. Our vision is to change customer behavior in the healthcare space by making the consumer shift to online medical consultation from offline by building an easy to use, convenient and trustworthy solution. We believe that healthcare space has huge potential to disrupt, and can follow the same growth trajectory as the digital insurance space which initially faced a similar kind of consumer inertia that this space faces." India has one of the lowest ratios for a doctor per 1,000 people amongst the developing countries. Having a physical interaction with a medical practitioner is not only a time-consuming process but also an expensive one, especially in the private sector. Even though government hospitals and state-run health centers offer consultations either free of cost or at subsidized pricing, it\'s not easy to get an access to these services.'
						),
						_react2.default.createElement(
							'div',
							{ className: 'media-icons-div' },
							_react2.default.createElement(
								'a',
								{ href: 'http://www.asiainsurancepost.com/health/policybazaars-promoter-offer-free-online-medical-consultations', rel: 'nofollow', target: '_blank' },
								_react2.default.createElement('img', { src: '/assets/img/media/asinsurance-blwh.png', onmouseover: 'this.src=\'/assets/img/media/asinsurance-color.png\'', onmouseout: 'this.src=\'/assets/img/media/asinsurance-blwh.png\'' })
							)
						)
					),
					_react2.default.createElement(
						'div',
						{ className: 'media-div-card' },
						_react2.default.createElement(
							'p',
							{ className: 'media-card-heading' },
							'docprime.com\xA0gets internal fund infusion\xA0worth $50 million from Policybazaar Group'
						),
						_react2.default.createElement(
							'p',
							{ className: 'media-card-content' },
							_react2.default.createElement(
								'span',
								{ className: 'media-card-heading' },
								'Gurugram,\xA0September 17, 2018:'
							),
							'\xA0',
							_react2.default.createElement(
								'a',
								{ href: 'https://docprime.com', rel: 'nofollow', target: '_blank' },
								'docprime.com'
							),
							', the latest healthcare venture by EtechAces Marketing and Consulting Private Limited (\u201CPolicybazaar Group\u201D), announced that it has received initial internal funding of $50 million from the parent company. The Policybazaar Group also owns India\u2019s leading insurtech brand PolicyBazaar.com and leading lending marketplace, Paisabazaar.com.'
						),
						_react2.default.createElement(
							'p',
							{ className: 'media-card-content' },
							_react2.default.createElement(
								'span',
								{ className: 'media-card-heading' },
								'According to Yashish Dahiya, CEO and Co-founder, Policybazaar Group of Companies,'
							),
							' \u201CHealthcare sector has a lot of untapped potential and currently, the services are not affordable and accessible for all. With rising out-of-pocket expenses, there\u2019s a need to provide quality healthcare at competitive prices that can be accessed by anyone, anywhere. As a Group, we wholeheartedly support\xA0docprime.com\u2019s vision to provide a customized experience and maximize health benefits for everyone.\u201D'
						),
						_react2.default.createElement(
							'p',
							{ className: 'media-card-content' },
							_react2.default.createElement(
								'span',
								{ className: 'media-card-heading' },
								'Excited about the investment,\xA0Ashish Gupta, CEO,\xA0docprime.com\xA0said,'
							),
							'  \u201CWe intend to use the capital in providing seamless user experience and bringing innovation in the healthcare space. Our focus is to make the services more customer-friendly driven by transparency, trust and sustainability.\xA0We are bringing innovation through use of various technology tools like AI, data science and deep analytics.\u201D'
						),
						_react2.default.createElement(
							'p',
							{ className: 'media-card-content' },
							_react2.default.createElement(
								'span',
								{ className: 'media-card-heading' },
								'He further added,'
							),
							'"Our core offerings include free consultation services through chat and phone from our in-house doctors, and discounted\xA0doctor and lab appointment bookings\xA0to encourage consumers in seeking expert medical advice and getting right solutions in a timely manner.\xA0Soon, we will also bring a unique OPD subscription-based product, which will cover unlimited consultations and diagnostic tests."'
						),
						_react2.default.createElement(
							'p',
							{ className: 'media-card-content' },
							'docprime.com\xA0has tied-up with 14,000 doctors and 5,000 diagnostic labs at present and aims to expand its network to 1,50,000 doctors and 20,000 labs across 100+ cities. Currently, appointments can be booked with doctors and labs based in Delhi-NCR but from next month onwards, the facility will be made available across all major cities including Mumbai, Bangalore, Hyderabad & Chennai\xA0'
						),
						_react2.default.createElement(
							'p',
							{ className: 'media-card-content' },
							_react2.default.createElement(
								'span',
								{ className: 'media-card-heading' },
								'About\xA0docprime.com'
							)
						),
						_react2.default.createElement(
							'p',
							{ className: 'media-card-content' },
							'docprime.com\xA0is the latest venture by the Policybazaar Group with an aim to redefine how Indians seek healthcare services. It connects patients with doctors in real time and bridges the gap between need and fulfillment using state-of-the-art technology and a robust offline network. Besides providing free consultation on chat and phone by in-house team of health experts, it also facilitates booking of doctor appointments and lab tests at discounted rates and will soon be giving the option of OPD subscription packages with unlimited consultations and tests. The company is targeting 1 million free medical consultations by March 2019 and up to 5 million by March 2020.'
						),
						_react2.default.createElement(
							'p',
							{ className: 'media-card-content' },
							_react2.default.createElement(
								'span',
								{ className: 'media-card-heading' },
								'About ETechAces\xA0Marketing & Consulting Pvt. Ltd.'
							)
						),
						_react2.default.createElement(
							'p',
							{ className: 'media-card-content' },
							'ETechAces is the parent company that holds India\u2019s leading insurtech brand, Policybazaar.com and leading lending marketplace, Paisabazaar.com. The company has backing from a host of investors including the likes of Softbank, Temasek, Tiger Global Management, True North, InfoEdge (Naukri.com), Premji Invest, besides investments from other PE funds and family offices.'
						),
						_react2.default.createElement(
							'p',
							{ className: 'media-card-content' },
							'ETechAces started Policybazaar.com with a purpose to educate people on insurance products and has transformed the way how insurance is bought in the country. From receiving traffic of 180,000 visitors in 2008, Policybazaar.com has come a long way and today, hosts over 100 million visitors yearly and records sale of nearly 300,000 transactions a month. Currently, Policybazaar.com accounts for nearly 25% of India\u2019s life cover.'
						),
						_react2.default.createElement(
							'p',
							{ className: 'media-card-content' },
							'In 2014, ETechAces started Paisabazaar.com, an online financial marketplace for investment and lending products. Today, Paisabazaar.com is India\u2019s largest online financial marketplace for loans and credit cards. It has collaborated with more than 75 partners across lending and investment categories with 300+ products on offer.\xA0\xA0'
						)
					)
				),
				_react2.default.createElement(
					'div',
					{ className: 'col-lg-3 col-12' },
					_react2.default.createElement(
						'div',
						{ className: 'media-sticky-div' },
						_react2.default.createElement(
							'div',
							{ className: 'twitter-feed' },
							_react2.default.createElement(
								'a',
								{ 'class': 'twitter-timeline', rel: 'nofollow', href: 'https://twitter.com/DocPrimeIndia?ref_src=twsrc%5Etfw' },
								'Tweets by docprimeIndia'
							),
							' ',
							_react2.default.createElement('script', { async: true, src: 'https://platform.twitter.com/widgets.js', charset: 'utf-8' })
						),
						_react2.default.createElement(
							'div',
							{ className: 'facebook-feed' },
							_react2.default.createElement('iframe', { src: 'https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FDocPrimeIndia&tabs=timeline&width=340&height=500&small_header=true&adapt_container_width=true&hide_cover=true&show_facepile=true&appId', width: 340, height: 500, style: { border: 'none', overflow: 'hidden' }, scrolling: 'no', frameBorder: 0, allowTransparency: 'true', allow: 'encrypted-media' })
						)
					)
				),
				_react2.default.createElement(
					'div',
					{ className: 'col-12 col-lg-3 d-lg-none' },
					_react2.default.createElement(
						'div',
						{ className: 'media-sticky-div' },
						_react2.default.createElement(
							'div',
							{ className: 'media-contact-div' },
							_react2.default.createElement(
								'div',
								{ className: 'media-contact-label-div' },
								_react2.default.createElement(
									'p',
									{ className: 'media-contact-label' },
									'Contact Us'
								)
							),
							_react2.default.createElement(
								'div',
								{ className: 'media-contact-items-div' },
								_react2.default.createElement(
									'div',
									{ className: 'media-contact-item' },
									_react2.default.createElement(
										'div',
										{ className: 'media-contact-subitem' },
										_react2.default.createElement('img', { src: '/assets/img/media/email-icon.svg', style: { verticalAlign: 'middle' }, className: 'media-contact-icon' })
									),
									_react2.default.createElement(
										'div',
										{ className: 'media-contact-subitem' },
										_react2.default.createElement(
											'p',
											{ className: 'media-contact-text' },
											'media@docprime.com'
										)
									)
								),
								_react2.default.createElement(
									'div',
									{ className: 'media-contact-item media-location-item' },
									_react2.default.createElement(
										'div',
										{ className: 'media-contact-subitem media-location-subitem' },
										_react2.default.createElement('img', { src: '/assets/img/media/media-loc.svg', className: 'media-contact-icon' })
									),
									_react2.default.createElement(
										'div',
										{ className: 'media-contact-subitem' },
										_react2.default.createElement(
											'p',
											{ className: 'media-contact-text' },
											'Plot no'
										),
										_react2.default.createElement(
											'p',
											{ className: 'media-contact-text' },
											'119, Sector 44'
										),
										_react2.default.createElement(
											'p',
											{ className: 'media-contact-text' },
											'Gurugram - 122001'
										)
									)
								)
							)
						)
					)
				)
			)
		);
	}
}

exports.default = Media;

/***/ }),

/***/ "./dev/js/components/commons/staticPages/privacy.js":
/*!**********************************************************!*\
  !*** ./dev/js/components/commons/staticPages/privacy.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(/*! react */ "react");

var _react2 = _interopRequireDefault(_react);

var _HelmetTags = __webpack_require__(/*! ../HelmetTags */ "./dev/js/components/commons/HelmetTags/index.js");

var _HelmetTags2 = _interopRequireDefault(_HelmetTags);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Privacy extends _react2.default.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {

        return _react2.default.createElement(
            'div',
            { className: 'container about-container' },
            _react2.default.createElement(_HelmetTags2.default, { tagsData: {
                    title: 'Privacy Policy | docprime',
                    description: 'The policy is effective from the date and time a user registers with docprime by filling up the Registration form and accepting the terms and conditions.'
                } }),
            _react2.default.createElement(
                'div',
                { className: 'row' },
                _react2.default.createElement(
                    'div',
                    { className: 'col-12 text-center' },
                    _react2.default.createElement(
                        'p',
                        { className: 'fw-500 about-heading', style: { marginBottom: 20 } },
                        'Privacy Policy'
                    )
                )
            ),
            _react2.default.createElement(
                'div',
                { className: 'row' },
                _react2.default.createElement(
                    'div',
                    { className: 'col-12 privacy-desc-div' },
                    _react2.default.createElement(
                        'p',
                        { className: 'privacy-desc' },
                        'docprime.com (\u201CWebsite/Mobile Application\u201D) operated by docprime Technologies Private Limited (\u201CCompany/we/us\u201D) recognizes the importance of maintaining your privacy. The Company is committed to maintain the confidentiality, integrity and security of all information of our users. This Privacy Policy explains how we collect, use, share, disclose and protect Personal information about the Users of the Services, including and the visitors of Website (jointly and severally referred to as \u201Cyou\u201D or \u201CUsers\u201D in this Privacy Policy).'
                    ),
                    _react2.default.createElement(
                        'p',
                        { className: 'privacy-desc' },
                        'This Privacy Policy is published in compliance of the (Indian) Information Technology Act, 2000 and the rules, regulations, guidelines and clarifications framed thereunder, including the (Indian) Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Information) Rules, 2011 (SPI Rules).'
                    ),
                    _react2.default.createElement(
                        'p',
                        { className: 'privacy-desc' },
                        'Please read this privacy policy carefully and see below for details on what type of information we may collect from you, how that information is used in connection with the services offered through our Website and shared with our business partners. This Privacy Policy applies to current and former visitors and customers to the Website.'
                    ),
                    _react2.default.createElement(
                        'p',
                        { className: 'privacy-desc' },
                        'By visiting and/or accessing the Website, you agree to this Privacy Policy.'
                    ),
                    _react2.default.createElement(
                        'p',
                        { className: 'privacy-desc-subheading' },
                        '1.\xA0\xA0\xA0\xA0COLLECTION OF PERSONAL INFORMATION'
                    ),
                    _react2.default.createElement(
                        'p',
                        { className: 'privacy-desc' },
                        'When you access the Services, or through any interaction with us via emails, telephone calls or other correspondence, we may ask you to voluntarily provide us with certain information that personally identifies you or could be used to personally identify you. You hereby consent to the collection of such information by the Company. Without prejudice to the generality of the above, information collected by us from you may include (but is not limited to) the following:'
                    ),
                    _react2.default.createElement(
                        'ol',
                        { className: 'sub-list' },
                        _react2.default.createElement(
                            'li',
                            null,
                            'contact data (such as your full name, email address and phone number);'
                        ),
                        _react2.default.createElement(
                            'li',
                            null,
                            'demographic data (such as your gender, your date of birth and your pin code);'
                        ),
                        _react2.default.createElement(
                            'li',
                            null,
                            'data regarding your usage of the services and history of the appointments made by or with you through the use of Services;'
                        ),
                        _react2.default.createElement(
                            'li',
                            null,
                            'data regarding your medical records history; and insurance data;'
                        ),
                        _react2.default.createElement(
                            'li',
                            null,
                            'other information that you voluntarily choose to provide to us (such as information shared by you with us through emails or letters).'
                        )
                    ),
                    _react2.default.createElement(
                        'p',
                        { className: 'privacy-desc' },
                        'The information collected from you by the Company may constitute \u2018personal information\u2019 or \u2018sensitive personal data or information\u2019 under the SPI Rules.'
                    ),
                    _react2.default.createElement(
                        'p',
                        { className: 'privacy-desc' },
                        _react2.default.createElement(
                            'span',
                            null,
                            '\u201CPersonal Information\u201D'
                        ),
                        ' is defined under the SPI Rules to mean any information that relates to a natural person, which, either directly or indirectly, in combination with other information available or likely to be available to a body corporate, is capable of identifying such person.'
                    ),
                    _react2.default.createElement(
                        'p',
                        { className: 'privacy-desc' },
                        'The SPI Rules further define \u201CSensitive Personal Data or Information\u201D of a person to mean personal information about that person relating to:'
                    ),
                    _react2.default.createElement(
                        'ol',
                        { className: 'sub-list' },
                        _react2.default.createElement(
                            'li',
                            null,
                            'passwords;'
                        ),
                        _react2.default.createElement(
                            'li',
                            null,
                            'financial information such as bank accounts, credit and debit card details or other payment instrument details;'
                        ),
                        _react2.default.createElement(
                            'li',
                            null,
                            'physical, physiological and mental health condition;'
                        ),
                        _react2.default.createElement(
                            'li',
                            null,
                            'sexual orientation;'
                        ),
                        _react2.default.createElement(
                            'li',
                            null,
                            'medical records and history;'
                        ),
                        _react2.default.createElement(
                            'li',
                            null,
                            'biometric information;'
                        ),
                        _react2.default.createElement(
                            'li',
                            null,
                            'information received by body corporate under lawful contract or otherwise;'
                        ),
                        _react2.default.createElement(
                            'li',
                            null,
                            'visitor details as provided at the time of registration or thereafter; and'
                        ),
                        _react2.default.createElement(
                            'li',
                            null,
                            'call data records.'
                        )
                    ),
                    _react2.default.createElement(
                        'p',
                        { className: 'privacy-desc' },
                        'To the extent necessary to provide Users with the Services, offers and promotions through the Website, Company may provide your Personal Information to third party(ies) who work on behalf of or with Company to provide the Users with such Services, offers and promotions, to help Company communicate with Users or to maintain the Website. In such circumstances, you consent to us disclosing your Personal Information to such third parties and contractors, solely for the intended purposes only.'
                    ),
                    _react2.default.createElement(
                        'p',
                        { className: 'privacy-desc' },
                        'However, Company will be free to use, collect and disclose information that is freely available about you in the public domain without your consent.'
                    ),
                    _react2.default.createElement(
                        'p',
                        { className: 'privacy-desc-subheading' },
                        '2.\xA0\xA0\xA0\xA0CONTROLLERS OF PERSONAL INFORMATION'
                    ),
                    _react2.default.createElement(
                        'p',
                        { className: 'privacy-desc' },
                        'Your personal data will be stored and collected by docprime Technologies Private Limited and with its parent company Etechaces Marketing and Consulting Private Limited.'
                    ),
                    _react2.default.createElement(
                        'p',
                        { className: 'privacy-desc-subheading' },
                        '3.\xA0\xA0\xA0\xA0PURPOSES OF COLLECTION OF YOUR DATA'
                    ),
                    _react2.default.createElement(
                        'p',
                        { className: 'privacy-desc' },
                        'Company collects your information when you register for an account, when you use its products or services, visit its Website\'s pages, and when you enter your details for receiving promotions or offers as featured on or offered by the Website. When you register with the Website, you are asked for your first name, last name, state and city of residence, email address, date of birth, and sex etc. Once you register at the Website and sign in you are not anonymous to us. Also, you are asked for your contact number during registration and may be sent SMS(s), notifications about our services. Further, some features of this Website or our Services will require you to furnish your personal information as provided by you under your account section on our Website.'
                    ),
                    _react2.default.createElement(
                        'p',
                        { className: 'privacy-desc' },
                        'Hence, by registering you authorize the Company to send texts and email alerts to you with your login details and any other service requirements, including promotional mails and SMSs.'
                    ),
                    _react2.default.createElement(
                        'p',
                        { className: 'privacy-desc' },
                        'Further, In order to avail some of the Services, the Users may be required to upload copies of their prescriptions, on the Website and/ or e-mail the same to Company in accordance with the Terms of Use and the prescriptions will be stored/ disclosed by Company only in the manner specified in this Privacy Policy and the Terms of Use. The term personal information/data shall also include any such prescriptions uploaded or otherwise provided by Users.'
                    ),
                    _react2.default.createElement(
                        'p',
                        { className: 'privacy-desc' },
                        'Furthermore, Company may keep records of telephone calls received and made for making inquiries, orders, or other purposes for the purpose of administration of Services.'
                    ),
                    _react2.default.createElement(
                        'p',
                        { className: 'privacy-desc' },
                        'We use your information in order to:'
                    ),
                    _react2.default.createElement(
                        'ul',
                        { className: 'mrt-10', style: { listStyle: 'disc', paddingLeft: 40, textAlign: 'left' } },
                        _react2.default.createElement(
                            'li',
                            { className: 'mrb-10' },
                            'Register you as customer/user on the Website;'
                        ),
                        _react2.default.createElement(
                            'li',
                            { className: 'mrb-10' },
                            'Dealing with requests, enquiries or complaints and other customer care related activities; and all other general administrative and business purposes.'
                        ),
                        _react2.default.createElement(
                            'li',
                            { className: 'mrb-10' },
                            'Process your orders or applications and provision of products and services.'
                        ),
                        _react2.default.createElement(
                            'li',
                            { className: 'mrb-10' },
                            'Administer or otherwise carry out our obligations in relation to any agreement with our business partners/contractors;'
                        ),
                        _react2.default.createElement(
                            'li',
                            { className: 'mrb-10' },
                            'Research and development and for User administration (including conducting User surveys);'
                        ),
                        _react2.default.createElement(
                            'li',
                            { className: 'mrb-10' },
                            'Technical administration and customization of Website;'
                        ),
                        _react2.default.createElement(
                            'li',
                            { className: 'mrb-10' },
                            'To send you information about special promotions or offers (either offered by the Company or by its business partners). We might also tell you about new features or products. These might be our own offers or products, or third-party offers or products with whom Company has a tie-up;'
                        ),
                        _react2.default.createElement(
                            'li',
                            { className: 'mrb-10' },
                            'Improvement of Services and features on the Website. In this regard, we may combine information we get from you with information about you we get from third parties.'
                        ),
                        _react2.default.createElement(
                            'li',
                            { className: 'mrb-10' },
                            'to send you notices, communications, offer alerts relevant to your use of the Services offered on this Website.'
                        ),
                        _react2.default.createElement(
                            'li',
                            { className: 'mrb-10' },
                            'as otherwise provided in this Privacy Policy.'
                        )
                    ),
                    _react2.default.createElement(
                        'p',
                        { className: 'privacy-desc-subheading' },
                        '4.\xA0\xA0\xA0\xA0INFORMATION SHARING, TRANSFER AND DISCLOSURE'
                    ),
                    _react2.default.createElement(
                        'ol',
                        { className: 'privacy-order-list' },
                        _react2.default.createElement(
                            'li',
                            { className: 'privacy-order-item' },
                            'We may need to disclose/ transfer your personal information to the following third parties for the purposes mentioned in this Privacy Policy and the Terms of Use:',
                            _react2.default.createElement(
                                'ol',
                                { className: 'sub-list' },
                                _react2.default.createElement(
                                    'li',
                                    null,
                                    'To business partners and other service providers appointed by us for the purpose of carrying out services on our behalf under a contract. Generally these parties do not have any independent right to share this information, however certain parties who provide services on the Website, including but not limited to the providers of online communications services, will have rights to use and disclose the personal information collected in connection with the provision of these services in accordance with their own privacy policies.'
                                ),
                                _react2.default.createElement(
                                    'li',
                                    null,
                                    'To our affiliates in India or in other countries who may use and disclose your information for the same purposes as us.'
                                ),
                                _react2.default.createElement(
                                    'li',
                                    null,
                                    'We may also share, sell, and/or transfer your personal information to any successor-in-interest as a result of a sale of any part of our business or upon the merger, reorganization, or consolidation of it with another entity on a basis that it is not the surviving entity. We may also disclose or transfer your Information, to another third party as part of reorganization or a sale of the assets of a Company\u2019s corporation division or company. Any third party to which we transfer or sell our assets, will have the right to continue to use the personal data and/ or other information that you have provided to us.'
                                ),
                                _react2.default.createElement(
                                    'li',
                                    null,
                                    'To government institutions/ authorities to the extent required a) under the laws, rules, and regulations and or under orders of any relevant judicial or quasi-judicial authority; b) to protect and defend the rights or property of the Company; c) to fight fraud and credit risk; d) to enforce our Terms of Use (to which this Privacy Policy is also a part) ; or e) when Company, in its sole discretion, deems it necessary in order to protect its rights or the rights of others.'
                                ),
                                _react2.default.createElement(
                                    'li',
                                    null,
                                    'If otherwise required by an order under any law for the time being in force including in response to enquiries by Government agencies for the purpose of verification of identity, or for prevention, detection, investigation including cyber incidents, prosecution, and punishment of offences.'
                                ),
                                _react2.default.createElement(
                                    'li',
                                    null,
                                    'In case of any contests or surveys conducted by the Company in which the you participate, your information may be disclosed to third parties, also be disclosed to third parties to the extent necessary for fulfilment of any offer/vouchers etc. and other aspects of such contest or similar offering.'
                                )
                            )
                        ),
                        _react2.default.createElement(
                            'li',
                            { className: 'privacy-order-item' },
                            'We make all your personal Information accessible to our employees and data processors only on a need-to-know basis. All our employees and data processors, who have access to, and are associated with the processing of your Information, are obliged to respect its confidentiality.'
                        ),
                        _react2.default.createElement(
                            'li',
                            { className: 'privacy-order-item' },
                            'Non-personally identifiable information may be disclosed to third party ad servers, ad agencies, technology vendors and research firms to serve advertisements to the Users. Company may also share its aggregate findings (not specific information) based on information relating to your internet use to prospective, investors, strategic partners, sponsors and others in order to help growth of our business. These companies may use information (excluding your name, address, email address, or telephone number) about your visits to this Website in order to provide advertisements on this Website and other third party websites about goods and services that may be of interest to you. We use third-party service providers to serve ads on our behalf across the internet and sometimes on this Website. They may collect anonymous information about your visits to Website, and your interaction with our products and services. They may also use information about your visits to this and other websites for targeted advertisements for goods and services. This anonymous information is collected through the use of a pixel tag, which is industry standard technology used by most major websites. No personally identifiable information is collected or used in this process.'
                        ),
                        _react2.default.createElement(
                            'li',
                            { className: 'privacy-order-item' },
                            'We may make anonymous or aggregate personal information and disclose such data only in a non-personally identifiable manner. Such information does not identify you individually.'
                        ),
                        _react2.default.createElement(
                            'li',
                            { className: 'privacy-order-item' },
                            'Access to your account information and any other personal identifiable information is strictly restricted and used only in accordance with specific internal procedures, in order to operate, develop or improve our Services. We may use third party service providers to enable you to provide with our services and we require such third parties to maintain the confidentiality of the information we provide to them under our contracts with them.'
                        ),
                        _react2.default.createElement(
                            'li',
                            { className: 'privacy-order-item' },
                            'There are number of Products and/or Services, offered by third Parties on the Website. If you choose to avail for these separate Products or Services, disclose information to these service providers, then their use of your information is governed by their privacy policies. Company is not responsible for their privacy policies.'
                        )
                    ),
                    _react2.default.createElement(
                        'p',
                        { className: 'privacy-desc-subheading' },
                        '5.\xA0\xA0\xA0\xA0WE COLLECT COOKIES'
                    ),
                    _react2.default.createElement(
                        'p',
                        { className: 'privacy-desc' },
                        'We may also receive and/or hold information about the User\u2019s browsing history including the URL of the site that the User visited prior to visiting the website as well as the Internet Protocol (IP) address of each User\'s computer (or the proxy server a User used to access the World Wide Web), User\'s computer operating system and type of web browser the User is using as well as the name of User\'s ISP.'
                    ),
                    _react2.default.createElement(
                        'p',
                        { className: 'privacy-desc' },
                        'The Website uses temporary cookies to store certain data (that is not sensitive personal data or information) that is used by the Company and its service providers for the technical administration of the Website, research and development, and for User administration. A cookie is a piece of data stored on the user\'s computer tied to information about the user. We may use both session ID cookies and persistent cookies. For session ID cookies, once you close your browser or log out, the cookie terminates and is erased. A persistent cookie is a small text file stored on your computer\u2019s hard drive for an extended period of time. Session ID cookies may be used by PRP to track user preferences while the user is visiting the website. They also help to minimize load times and save on server processing. Persistent cookies may be used by PRP to store whether, for example, you want your password remembered or not, and other information. Cookies used on the PRP website do not contain personally identifiable information.'
                    ),
                    _react2.default.createElement(
                        'p',
                        { className: 'privacy-desc-subheading' },
                        '6.\xA0\xA0\xA0\xA0LOG FILES'
                    ),
                    _react2.default.createElement(
                        'p',
                        { className: 'privacy-desc' },
                        'Like most standard websites, we use log files. This information may include internet protocol (IP) addresses, browser type, internet service provider (ISP), referring/exit pages, platform type, date/time stamp, and number of clicks to analyse trends, administer the site, track user\'s movement in the aggregate, and gather broad demographic information for aggregate use. We may combine this automatically collected log information with other information we collect about you. We do this to improve services we offer to you, to improve marketing, analytics or site functionality.'
                    ),
                    _react2.default.createElement(
                        'p',
                        { className: 'privacy-desc-subheading' },
                        '7.\xA0\xA0\xA0\xA0Email- Opt out'
                    ),
                    _react2.default.createElement(
                        'p',
                        { className: 'privacy-desc' },
                        'If you are no longer interested in receiving e-mail announcements and other kinds marketing information/communications from us, please e-mail your request at: care@docprime.com. Please note that it may take about 7 (seven) working days to process your request.'
                    ),
                    _react2.default.createElement(
                        'p',
                        { className: 'privacy-desc-subheading' },
                        '8.\xA0\xA0\xA0\xA0SECURITY'
                    ),
                    _react2.default.createElement(
                        'p',
                        { className: 'privacy-desc' },
                        'We employ appropriate technical and organizational security measures at all times to protect the information we collect from you. We use multiple electronic, procedural, and physical security measures to protect against unauthorized or unlawful use or alteration of information, and against any accidental loss, destruction, or damage to information. However, no method of transmission over the Internet, or method of electronic storage, is 100% secure. Therefore, we cannot guarantee its absolute security. Further, you are responsible for maintaining the confidentiality and security of your login id and password, and may not provide these credentials to any third party.'
                    ),
                    _react2.default.createElement(
                        'p',
                        { className: 'privacy-desc-subheading' },
                        '9.\xA0\xA0\xA0\xA0THIRD PARTY ADVERTISING'
                    ),
                    _react2.default.createElement(
                        'p',
                        { className: 'privacy-desc' },
                        'We may use third-party advertising companies and/or ad agencies to serve ads when you visit our Website. These companies may use information (excluding your name, address, email address, or telephone number) about your visits to this Website in order to provide advertisements on this Website and other third party websites about goods and services that may be of interest to you. We use third-party service providers to serve ads on our behalf across the internet and sometimes on this Website. They may collect anonymous information about your visits to Website, and your interaction with our products and services. They may also use information about your visits to this and other Websites for targeted advertisements for goods and services. This anonymous information is collected through the use of a pixel tag, which is industry standard technology used by most major Websites. No personally identifiable information is collected or used in this process.'
                    ),
                    _react2.default.createElement(
                        'p',
                        { className: 'privacy-desc-subheading' },
                        '10.\xA0\xA0\xA0LINKS TO OTHER WEBSITES'
                    ),
                    _react2.default.createElement(
                        'p',
                        { className: 'privacy-desc' },
                        'There might be affiliates or other sites linked to the Website. Personal information that you provide to those sites are not our property. These affiliated sites may have different privacy practices and we encourage you to read their privacy policies of these websites, when you visit them.'
                    ),
                    _react2.default.createElement(
                        'p',
                        { className: 'privacy-desc-subheading' },
                        '11.\xA0\xA0\xA0CHANGES IN THIS PRIVACY POLICY'
                    ),
                    _react2.default.createElement(
                        'p',
                        { className: 'privacy-desc' },
                        'Company reserves the right to change this policy from time to time, with or without advance notice, at its sole discretion. We may update this privacy policy to reflect changes to our information practices. We encourage you to periodically visit this webpage.'
                    ),
                    _react2.default.createElement(
                        'p',
                        { className: 'privacy-desc-subheading' },
                        '12.\xA0\xA0\xA0ADDITIONAL NOTES TO THE USER'
                    ),
                    _react2.default.createElement(
                        'ol',
                        { className: 'privacy-order-list' },
                        _react2.default.createElement(
                            'li',
                            { className: 'privacy-order-item' },
                            'Company does not exercise control over the sites displayed as search results or links from within its Services. These other sites may place their own cookies or other files on the Users\' computer, collect data or solicit personal information from the Users, for which Company is not responsible or liable. Accordingly, Company does not make any representations concerning the privacy practices or policies of such third parties or terms of use of such websites, nor does Company guarantee the accuracy, integrity, or quality of the information, data, text, software, sound, photographs, graphics, videos, messages or other materials available on such websites. Company encourages the User to read the privacy policies of that website.'
                        ),
                        _react2.default.createElement(
                            'li',
                            { className: 'privacy-order-item' },
                            'Company shall not be responsible in any manner for the authenticity of the personal information or sensitive personal data or information supplied by the User to the Company or any of its business partners. If a User provides any information that is untrue, inaccurate, not current or incomplete (or becomes untrue, inaccurate, not current or incomplete), or Company has reasonable grounds to suspect that such information is untrue, inaccurate, not current or incomplete, Company has the right to suspend or terminate such account at its sole discretion.'
                        ),
                        _react2.default.createElement(
                            'li',
                            { className: 'privacy-order-item' },
                            'Company shall not be responsible for any breach of security or for any actions of any third parties that receive Users\' personal data or events that are beyond the reasonable control of Company including, acts of government, computer hacking, unauthorized access to computer data and storage device, computer crashes, breach of security and encryption, etc.'
                        ),
                        _react2.default.createElement(
                            'li',
                            { className: 'privacy-order-item' },
                            'The User is responsible for maintaining the confidentiality of the User\'s account access information and password. The User shall be responsible for all uses of the User\'s account and password, whether or not authorized by the User. The User shall immediately notify Company of any actual or suspected unauthorized use of the User\'s account or password.'
                        )
                    ),
                    _react2.default.createElement(
                        'p',
                        { className: 'privacy-desc-subheading' },
                        '13.\xA0\xA0\xA0GRIEVANCE OFFICER'
                    ),
                    _react2.default.createElement(
                        'p',
                        { className: 'privacy-desc' },
                        'In case you have any grievances with respect to in accordance with applicable law on Information Technology and rules made there under, the name and contact details of the Grievance Officer are provided below:'
                    ),
                    _react2.default.createElement('br', null),
                    _react2.default.createElement(
                        'p',
                        { className: 'privacy-desc' },
                        'Mr. Rajendra Prasad'
                    ),
                    _react2.default.createElement('br', null),
                    _react2.default.createElement(
                        'p',
                        { className: 'privacy-desc', style: { marginTop: 0, marginBottom: 0 } },
                        'docprime.com'
                    ),
                    _react2.default.createElement(
                        'p',
                        { className: 'privacy-desc', style: { marginTop: 0, marginBottom: 0 } },
                        'Plot No. 123,'
                    ),
                    _react2.default.createElement(
                        'p',
                        { className: 'privacy-desc', style: { marginTop: 0, marginBottom: 0 } },
                        'Sector-44, Gurugram-122001,'
                    ),
                    _react2.default.createElement(
                        'p',
                        { className: 'privacy-desc', style: { marginTop: 0, marginBottom: 10 } },
                        'Haryana'
                    ),
                    _react2.default.createElement('br', null),
                    _react2.default.createElement(
                        'p',
                        { className: 'privacy-desc' },
                        'Email : care@docprime.com'
                    ),
                    _react2.default.createElement('br', null),
                    _react2.default.createElement(
                        'p',
                        { className: 'privacy-desc' },
                        'If you have questions, concerns, or suggestions regarding our Privacy Policy, we can be reached using the contact information on our Contact Us page or at care@docprime.com.'
                    )
                )
            )
        );
    }
}

exports.default = Privacy;

/***/ }),

/***/ "./dev/js/components/commons/staticPages/terms.js":
/*!********************************************************!*\
  !*** ./dev/js/components/commons/staticPages/terms.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(/*! react */ "react");

var _react2 = _interopRequireDefault(_react);

var _HelmetTags = __webpack_require__(/*! ../HelmetTags */ "./dev/js/components/commons/HelmetTags/index.js");

var _HelmetTags2 = _interopRequireDefault(_HelmetTags);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Terms extends _react2.default.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: 0,
            scrollPosition: 0
        };
    }

    setTab(val) {
        this.setState({ selected: val });
    }

    render() {
        if (this.props.forScroll) {
            if (document.getElementById('rescheduling_9')) {
                var elementTop = document.getElementById('rescheduling_9').getBoundingClientRect().top;
                var elementHeight = document.getElementById('rescheduling_9').clientHeight;
                var scrollPosition = elementTop - elementHeight;
                window.scrollTo(0, parseInt(scrollPosition));
            }
        }

        let mainClass;
        let headingClass;
        if (this.props.fromApp) {
            mainClass = "container about-container appUrlPadding";
            headingClass = "col-12 text-center d-none d-md-block";
        } else {
            mainClass = 'container about-container';
            headingClass = "col-12 text-center";
        }
        return _react2.default.createElement(
            'div',
            { className: mainClass },
            _react2.default.createElement(_HelmetTags2.default, { tagsData: {
                    title: 'Terms & Conditions - Submission, Listings & Payment Terms',
                    description: 'docprime: Read Terms & Conditions, details on Submission and Administration of Listings, Payment Terms.'
                } }),
            _react2.default.createElement(
                'div',
                { className: 'row' },
                _react2.default.createElement(
                    'div',
                    { className: headingClass },
                    _react2.default.createElement(
                        'p',
                        { className: 'fw-500 about-heading', style: { marginBottom: 20 } },
                        'Terms & Conditions'
                    )
                )
            ),
            _react2.default.createElement(
                'div',
                { className: 'row' },
                _react2.default.createElement(
                    'div',
                    { className: 'col-12' },
                    _react2.default.createElement(
                        'div',
                        { className: 'privacy-tab-div' },
                        _react2.default.createElement(
                            'div',
                            { className: "privacy-tab" + (this.state.selected == 0 ? " privacy-tab-active" : ""), onClick: this.setTab.bind(this, 0) },
                            _react2.default.createElement(
                                'p',
                                { className: 'fw-500' },
                                'End User Agreement'
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: "privacy-tab" + (this.state.selected == 1 ? " privacy-tab-active" : ""), onClick: this.setTab.bind(this, 1) },
                            _react2.default.createElement(
                                'p',
                                { className: 'fw-500' },
                                'Provider Terms and Conditions'
                            )
                        )
                    )
                )
            ),
            _react2.default.createElement(
                'div',
                { className: 'row customer-terms-row', hidden: this.state.selected == 1 },
                _react2.default.createElement(
                    'div',
                    { className: 'col-12 privacy-desc-div' },
                    _react2.default.createElement(
                        'p',
                        { className: 'privacy-desc' },
                        'These Terms of Use sets forth the terms and conditions that apply to the access and use of the site "www.docprime.com" and its Mobile Application (collectively be referred to as \u201CWebsite\u201D), which is owned and operated by docprime Technologies Private Limited, a company duly incorporated under the provisions of the Companies Act, 2013, (hereinafter collectively be referred to as "Company" or \u201Cdocprime\u201D).'
                    ),
                    _react2.default.createElement(
                        'p',
                        { className: 'privacy-desc' },
                        'PLEASE READ THESE TERMS OF USE CAREFULLY BY ACCESSING OR USING THIS INTERNET BASED PLATFORM, YOU AGREE TO BE BOUND BY THE TERMS DESCRIBED HEREIN AND ALL TERMS INCORPORATED BY REFERENCE. IF YOU DO NOT AGREE TO ALL OF THESE TERMS, DO NOT USE THIS INTERNET BASED PLATFORM.'
                    ),
                    _react2.default.createElement(
                        'p',
                        { className: 'privacy-desc-subheading' },
                        '1.\xA0\xA0\xA0\xA0NATURE AND APPLICABILITY OF TERMS'
                    ),
                    _react2.default.createElement(
                        'ol',
                        { className: 'privacy-list-group' },
                        _react2.default.createElement(
                            'li',
                            { className: 'privacy-list-item' },
                            'This document/agreement is an electronic record in terms of Information Technology Act, 2000 and generated by a computer system and does not require any physical or digital signatures. This document is published in accordance with the provisions of Rule 3 of the Information Technology (Intermediaries guidelines) 2011, that provides for the due diligence to be exercised for the access or usage of this Website.'
                        ),
                        _react2.default.createElement(
                            'li',
                            { className: 'privacy-list-item' },
                            'Your access or use of the Website, transaction on the Website and use of Services (as defined herein below) hosted or managed remotely through the Website, are governed by the following terms and conditions (hereinafter referred to as the "Terms of Use\u201D), including the applicable policies which are incorporated herein by way of reference, as may be posted elsewhere on the Website. These Terms of Use constitutes a legal and binding contract between you (hereinafter referred to as \u201CYou\u201D or \u201CYour\u201D or the \u201CUser\u201D) on one part and Company on the other Part.'
                        ),
                        _react2.default.createElement(
                            'li',
                            { className: 'privacy-list-item' },
                            'By accessing, browsing or in any way transacting on the Website, or availing any Services, You signify Your agreement to be bound by these Terms of Use. Further, by impliedly or expressly accepting these Terms of Use, you also accept and agree to be bound by Our policies, including the Privacy Policy, any disclaimers and such other rules, guidelines, policies, terms and conditions as are relevant under the applicable law(s) in India for the purposes of accessing, browsing or transacting on the Website, or availing any of the Services, shall be deemed to be incorporated into, and considered as part and parcel of these Terms of Use. However, if You navigate away from the Website to a third party website, You may be subject to alternative terms and conditions of use and privacy policy, as may be specified on such website. In such event, the terms and conditions of use and privacy policy applicable to that website will govern Your use of that website.'
                        ),
                        _react2.default.createElement(
                            'li',
                            { className: 'privacy-list-item' },
                            'Be sure to return to this page periodically to review the most current version of the TOU. We reserve the right at any time, at our sole discretion, to change or otherwise modify the TOU without prior notice, and your continued access or use of this Website signifies your acceptance of the updated or modified TOU.'
                        ),
                        _react2.default.createElement(
                            'li',
                            { className: 'privacy-list-item' },
                            'These Terms of Use are a binding contract and applies to you whether you are a patient, his/her representatives or affiliates, searching for Medical Experts or Third Party health care service providers (such as doctors, hospitals, diagnostic centres or clinics, laboratories, etc) through the Website(\u201CEnd-User\u201D, \u201Cyou\u201D or \u201CUser\u201D); or otherwise a user/visitor of the Website(\u201Cyou\u201D or \u201CUser\u201D).'
                        )
                    ),
                    _react2.default.createElement(
                        'p',
                        { className: 'privacy-desc-subheading' },
                        '2.\xA0\xA0\xA0\xA0SERVICES'
                    ),
                    _react2.default.createElement(
                        'p',
                        { className: 'privacy-desc' },
                        'The Website is a platform that facilitates (i) diagnostic services being offered by various third party diagnostic centres or other health care service providers (such as doctors, hospitals, diagnostic centres or clinics, laboratories, etc) (\u201CThird Party Labs/ Third Party service providers\u201D); (ii) online medical consultancy services/ second opinion being offered by third party independent doctors (\u201CMedical Experts\u201D); and (iii) online advertisements of various sponsors advertising and marketing their own good and services (\u201CThird Party Advertisers\u201D). Third Party Labs, Medical Experts and the Third Party Advertisers are collectively referred to as the \u201CThird Party Service Providers\u201D. Further the Website also serves as an information platform providing health and wellness related information to the Users accessing the Website (The services of Third Party Services Provider and the information services provided through our Website is collectively referred to as the \u201CServices\u201D).'
                    ),
                    _react2.default.createElement(
                        'p',
                        { className: 'privacy-desc' },
                        'The arrangement between the Third Party Service Providers, You and Us shall be governed in accordance with these Terms of Use. The Services would be made available to such natural persons who have agreed to use the Website after obtaining due registration, in accordance with the procedure as determined by Us, from time to time, (referred to as \u201CYou\u201D or \u201CYour\u201D or \u201CYourself\u201D or \u201CUser\u201D, which terms shall also include natural persons who are accessing the Website merely as visitors). The Services are offered to You through various modes which shall include issue of discount coupons and vouchers that can be redeemed for various goods/ services offered for sale by relevant Third Party Service Providers. To facilitate the relation between You and the Third Party Service Providers through the Website, docprime shall send to You (promotional content including but not limited to e-mailers, notifications and messages). You agree and acknowledge that the Website is a platform that You and Third Party Service Providers utilize to meet and interact with another for their transactions. docprime is not and cannot be a party to or save as except as may be provided in these Terms of Use, control in any manner, any transaction between You and the Third Party Service Providers. As a condition of Your use of and access to the diagnostic services provided through the Website and Your acceptance of these Terms of Use, You are subject to the following rules/guidelines:'
                    ),
                    _react2.default.createElement(
                        'ol',
                        { className: 'privacy-list-group' },
                        _react2.default.createElement(
                            'li',
                            { className: 'privacy-list-item' },
                            'docprime provides Services through the Website as a marketplace and facilitates the Users to avail diagnostic test/ packages facilities offered by Third Party Labs through the Website. docprime is not and shall not be responsible for any sample collected, tests conducted and reports generated by the Third Party Labs and does not deal with any of Third Party Labs\u2019 client or patient managed by such Third Party Labs through the Website and only provides facilitation Services to the Users through the Website. Use of the Website may require the Third Party Labs to use software and the Third Party health care service providers have to ensure the procurement of such software from the concerned providers. User and the Third Party Labs agree to use the Website and the materials provided therein only for purposes that are permitted by: (a) these Terms of Use; and (b) any applicable law(s), regulation or generally accepted practices or guidelines in the relevant jurisdictions.'
                        ),
                        _react2.default.createElement(
                            'li',
                            { className: 'privacy-list-item' },
                            _react2.default.createElement(
                                'span',
                                null,
                                'NO DOCTOR-PATIENT RELATIONSHIP:'
                            ),
                            ' docprime does not replace Your relationship with physician or healthcare provider. The information interpretedSHOULD NOT be relied upon as a substitute for sound professional medical advice, evaluation or care from Your physician or other qualified healthcare provider.'
                        ),
                        _react2.default.createElement(
                            'li',
                            { className: 'privacy-list-item' },
                            'You acknowledge that the Medical Experts empaneled with Us are independent contractors and thereby docprime has an independent contractor relationship with such Medical Experts and therefore in no event docprime will be directly or vicariously liable for any advice or medical consultancy or any loss arising therefrom that the Medical Experts may provide to You or You may avail as part of the Services.'
                        ),
                        _react2.default.createElement(
                            'li',
                            { className: 'privacy-list-item' },
                            'You acknowledge that the e-prescription which may be issued by the Medical Expert(s) will be a valid prescription under applicable law(s) of India and may be used for dispensation of medicines by any pharmacist in India. You further agree and acknowledge that if any e- prescription which is processed through the Website (whether original or scanned copy of the original prescription) for procuring medicines is only by the Medical Experts, and docprime will only act as an aggregator and assume no responsibility and/ or liability in relation to such e-prescription.'
                        ),
                        _react2.default.createElement(
                            'li',
                            { className: 'privacy-list-item' },
                            'docprime is designed to support the health decisions and choices that You make. These decisions and choices are Yours, and We believe that You, in connection with the advice You receive from Your doctor or other professional healthcare provider, are the best decision maker about Your health. We cannot make decisions for you. However, what We can do is help You find good health information and connect with doctors for in-person information. On docprime You can ask and find informational questions and related educational answers by Medical Experts. The Website is not a place for the practice of medicine, but Medical Experts on the Website can be a resource for reliable, relevant general health information.'
                        ),
                        _react2.default.createElement(
                            'li',
                            { className: 'privacy-list-item' },
                            'The Services should not be depended upon and should not be treated as a replacement for obtaining consultation for diseases as the consultation provided through the Website is generic in the approach and shall not and cannot act as a substitute for physical consultation with a doctor. Also the Consultations provided through the Website may not be diagnostic in nature.'
                        ),
                        _react2.default.createElement(
                            'li',
                            { className: 'privacy-list-item' },
                            'We do not recommend or endorse any specific Medical Expert(s), tests, products, procedures, opinions, or other information that may be mentioned on the Website. Reliance on any information provided on the Website is solely at Your own risk. In case of any medical emergency, kindly contact Your nearest doctor/hospital or any related helpline.'
                        ),
                        _react2.default.createElement(
                            'li',
                            { className: 'privacy-list-item' },
                            'The Services are not for use in medical emergencies or for critical health situations requiring prompt medical attention. The Services are not intended to be real-time and may not be the best solution when a face-to-face consultation is a must and therefore We strongly discourage any delay in seeking advice from Your doctor on account of something that You may have heard/viewed on the Website. You take full responsibility for ensuring that the information submitted is accurate and docprime shall not make any effort to validate any information provided by You for using the Services with respect to content, correctness or usability. We, with an intention to provide the best services possible could ask You to share more information as and when needed. The Services should not be used for emergency appointment purposes.'
                        ),
                        _react2.default.createElement(
                            'li',
                            { className: 'privacy-list-item' },
                            'The opinions, statements, answers and tele-consultations (collectively \u201CConsultation\u201D) provided by the Medical Experts through the Website are solely the individual and independent opinions and statements of such Medical Experts and do not reflect the opinions of docprime, including but not limited to its officers, directors, representatives and its affiliates. docprime does not recommend or endorse any specific tests, physicians, products, procedures, opinions, or other information that may be mentioned on the Website.'
                        ),
                        _react2.default.createElement(
                            'li',
                            { className: 'privacy-list-item' },
                            'The inclusion of professionals, specialists and/ or Medical Experts on the Website or in any professional directory on the Website does not imply recommendation or endorsement of such specialists and/ or Medical Experts nor is such information intended as a tool for verifying the credentials, qualifications, or abilities of any specialists and/ or Medical Experts contained therein. Such information is provided on an \u2018as-is\u2019 basis and docprime disclaims all warranties, either express or implied, including but not limited to the implied warranties of merchantability and fitness for particular purpose. docprime disclaims any legal or financial events or outcomes related to the Services availed through the use of the Website.'
                        ),
                        _react2.default.createElement(
                            'li',
                            { className: 'privacy-list-item' },
                            'docprime makes no warranty that the Services will meet Your requirements, or that the Service(s) will be uninterrupted, timely, secure, or error free. This includes loss of data or any service interruption caused by docprime employees or representatives. docprime is not responsible for transmission errors, corruption of data.'
                        ),
                        _react2.default.createElement(
                            'li',
                            { className: 'privacy-list-item' },
                            'docprime is for personal use and the Services are for individuals to use for supporting their personal health decisions. You may use the Website for personal, but not for commercial, purposes.'
                        ),
                        _react2.default.createElement(
                            'li',
                            { className: 'privacy-list-item' },
                            'Your right to use the Services is not transferable.'
                        ),
                        _react2.default.createElement(
                            'li',
                            { className: 'privacy-list-item' },
                            'Notwithstanding anything to the contrary contained herein, You alone shall be liable for Your dealings and interaction with patients or Medical Experts (as the case may be) contacted or managed through the Website and docprime shall have no liability or responsibility in this regard. docprime does not guarantee or make any representation with respect to the correctness, completeness or accuracy of the information or detail provided by such client, patient, User, Medical Experts or any third party through the Website.'
                        ),
                        _react2.default.createElement(
                            'li',
                            { className: 'privacy-list-item' },
                            'The exchanges between the Medical Experts and the patient through the chat window or over telephone (as the case maybe) and the e-prescription would be accessible to docprime for the purposes of monitoring the quality of the consultation.'
                        ),
                        _react2.default.createElement(
                            'li',
                            { className: 'privacy-list-item' },
                            'docprime may, at its sole discretion, suspend User\u2019s or Medical Expert\u2019s ability to use or access the Website at any time while docprime investigates complaints or alleged violations of these Terms of Use, or for any other reason. docprime has the right to edit profiles of Medical Experts to make them more suitable for patient/ Users searches on the Website.'
                        ),
                        _react2.default.createElement(
                            'li',
                            { className: 'privacy-list-item' },
                            'Notwithstanding anything to the contrary contained herein, Users alone shall be liable for dealings and interaction with Third Party Labs and Medical Experts contacted or managed through the Website and docprime shall have no liability or responsibility in this regard. docprime does not guarantee or make any representation with respect to the correctness, completeness or accuracy of the tests conducted and reports generated by the Third Party Labs or e-prescription prescribed by Medical Experts.'
                        ),
                        _react2.default.createElement(
                            'li',
                            { className: 'privacy-list-item' },
                            'docprime may, at its sole discretion, suspend Third Party Labs or Users ability to use or access the Website at any time while docprime investigates complaints or alleged violations of these Terms of Use, or for any other reason. docprime has the right to edit profiles of Third Party Labs to make them more suitable for package searches on the Website. If Third Party Labs and/ or Users find any wrong information on the Website in relation to such Third Party Labs and/ or User, they can correct it themselves or contact docprime immediately for such corrections. docprime shall have no liability or responsibility in this regard.'
                        )
                    ),
                    _react2.default.createElement(
                        'p',
                        { className: 'privacy-desc-subheading' },
                        '3.\xA0\xA0\xA0\xA0ELIGIBILITY'
                    ),
                    _react2.default.createElement(
                        'ol',
                        { className: 'privacy-list-group' },
                        _react2.default.createElement(
                            'li',
                            { className: 'privacy-list-item' },
                            'As a condition to Your use of the Website, You must be 18 (eighteen) years of age or older to use or visit the Website in any manner. By visiting the Website or accepting these Terms of Use, You represent and warrant to docprime that You are 18 (eighteen) years of age or older, and that You have the right, authority and capacity to use the Website and agree to and abide by these Terms of Use.'
                        ),
                        _react2.default.createElement(
                            'li',
                            { className: 'privacy-list-item' },
                            'For the purposes of availing the Services and/or transacting with the Third Party Service Providers through the Website, You are required to obtain registration, in accordance with the procedure established by docprime in this regard. As part of the registration process, docprime may collect the following personal information from You:',
                            _react2.default.createElement(
                                'ol',
                                { className: 'sub-list' },
                                _react2.default.createElement(
                                    'li',
                                    null,
                                    'Name;'
                                ),
                                _react2.default.createElement(
                                    'li',
                                    null,
                                    'User ID;'
                                ),
                                _react2.default.createElement(
                                    'li',
                                    null,
                                    'Email address;'
                                ),
                                _react2.default.createElement(
                                    'li',
                                    null,
                                    'Address (including country and ZIP/ postal code);'
                                ),
                                _react2.default.createElement(
                                    'li',
                                    null,
                                    'Gender;'
                                ),
                                _react2.default.createElement(
                                    'li',
                                    null,
                                    'Age;'
                                ),
                                _react2.default.createElement(
                                    'li',
                                    null,
                                    'Phone number;'
                                ),
                                _react2.default.createElement(
                                    'li',
                                    null,
                                    'Your and Your family\u2019 medical history;'
                                ),
                                _react2.default.createElement(
                                    'li',
                                    null,
                                    'Any other information'
                                )
                            )
                        ),
                        _react2.default.createElement(
                            'li',
                            { className: 'privacy-list-item' },
                            'The registration on or use/ access of the Website is only available to natural persons, other than those who are \u2018incompetent to contract\u2019 under the Contract Act. That is, persons including minors, un-discharged insolvents etc. are not eligible to register on, or use/ access the Website. By registering, accessing or using the Website, You accept the terms of these Terms of Use and represent and warrant to docprime that you are \u2018competent to contract\u2019 under the Contract Act and have the right, authority and capacity to use the Website and agree to and abide by these Terms of Use.'
                        ),
                        _react2.default.createElement(
                            'li',
                            { className: 'privacy-list-item' },
                            'A registered id can only be utilized by the person whose details have been provided and docprime does not permit multiple persons to share a single log in/ registration id. However, a registered user, being also a parent or legal guardian of a person \u2018incompetent to contract\u2019 such as minors or persons with unsound mind, would be permitted to access and use the Website for the purposes of procuring the Services, on behalf of such persons.'
                        ),
                        _react2.default.createElement(
                            'li',
                            { className: 'privacy-list-item' },
                            'Organizations, companies, and businesses may not become registered members on the Website or use the Website as individual members.'
                        )
                    ),
                    _react2.default.createElement(
                        'p',
                        { className: 'privacy-desc-subheading' },
                        '4.\xA0\xA0\xA0\xA0YOUR ACCOUNT'
                    ),
                    _react2.default.createElement(
                        'p',
                        { className: 'privacy-desc' },
                        'You agree and acknowledge that You would'
                    ),
                    _react2.default.createElement(
                        'ol',
                        { className: 'privacy-list-group' },
                        _react2.default.createElement(
                            'li',
                            { className: 'privacy-list-item' },
                            'provide accurate, truthful, current and complete information when creating Your account and in all Your dealings through the Website;'
                        ),
                        _react2.default.createElement(
                            'li',
                            { className: 'privacy-list-item' },
                            'maintain and promptly update Your account information;'
                        ),
                        _react2.default.createElement(
                            'li',
                            { className: 'privacy-list-item' },
                            'maintain the security of Your account by not sharing Your password with others and restricting access to Your account and Your computer;'
                        ),
                        _react2.default.createElement(
                            'li',
                            { className: 'privacy-list-item' },
                            'promptly notify docprime if You discover or otherwise suspect any security breaches relating to the Website; and'
                        ),
                        _react2.default.createElement(
                            'li',
                            { className: 'privacy-list-item' },
                            'take responsibility for all the activities that occur under Your account and accept all risk of unauthorized access.'
                        )
                    ),
                    _react2.default.createElement(
                        'p',
                        { className: 'privacy-desc-subheading' },
                        '5.\xA0\xA0\xA0\xA0CONTENT AND INFORMATION ON THE WEBSITE'
                    ),
                    _react2.default.createElement(
                        'p',
                        { className: 'privacy-desc' },
                        'docprime authorizes You to view and access the content available on the Website solely for the purposes of availing the Services, such as visiting, using, ordering, receiving, delivering and communicating only as per these Terms of Use. The contents on the Website including information, text, graphics, images, logos, button icons, software code, design, and the collection, arrangement and assembly of content (\u201CContent\u201D), contains the following:'
                    ),
                    _react2.default.createElement(
                        'ol',
                        { className: 'privacy-list-group' },
                        _react2.default.createElement(
                            'li',
                            { className: 'privacy-list-item' },
                            'Third Party Service Providers\u2019 content including any content which may be developed on behalf of and published in the name of a Third Services Provider (\u201CThird Party Content\u201D)'
                        ),
                        _react2.default.createElement(
                            'li',
                            { className: 'privacy-list-item' },
                            'in-house content provided by docprime including without limitation, text, copy, audio, video, photographs, illustrations, graphics and other visuals (\u201Cdocprime Content\u201D)'
                        ),
                        _react2.default.createElement(
                            'li',
                            { className: 'privacy-list-item' },
                            'Any content submitted by You;'
                        )
                    ),
                    _react2.default.createElement(
                        'p',
                        { className: 'privacy-desc' },
                        'The docprime content is the property of docprime and is protected under copyright, trademark and other applicable law(s). You shall not modify the docprime Content or reproduce, display, publicly perform, distribute, or otherwise use the docprime Content in any way for any public or commercial purpose or for personal gain.'
                    ),
                    _react2.default.createElement(
                        'p',
                        { className: 'privacy-desc' },
                        'With respect to such Content that you submit or make available on this Websit, you grant docprime a perpetual, irrevocable, non-terminable, worldwide, royalty-free and non-exclusive license to use, copy, distribute, publicly display, modify, create derivative works, and sublicense such materials or any part of such materials/Content (as well as use the name that you submit in connection with such submitted content). We take no responsibility and assume no liability for any Content posted or submitted by you. We have no obligation to post your comments; we reserve the right in our absolute discretion to determine which comments are published on the Website. If you do not agree to these terms and conditions, please do not provide us with any submitted Content. You agree that you are fully responsible for the content you submit.'
                    ),
                    _react2.default.createElement(
                        'p',
                        { className: 'privacy-desc' },
                        _react2.default.createElement(
                            'span',
                            null,
                            'Prohibited Content:'
                        ),
                        ' You agree that any Content submitted by You shall not infringe the intellectual property, privacy, publicity, copyright, or other legal rights of any person or entity. The Content must not be false, misleading, fraudulent, defamatory, or deceptive. The following Content is prohibited on the Website:'
                    ),
                    _react2.default.createElement(
                        'ol',
                        { className: 'sub-list' },
                        _react2.default.createElement(
                            'li',
                            null,
                            'content that demeans, degrades, or shows hate toward a particular race, gender, culture, country, belief, or toward any member of a protected class;'
                        ),
                        _react2.default.createElement(
                            'li',
                            null,
                            'content depicting nudity, sexual behaviour, or obscene gestures;'
                        ),
                        _react2.default.createElement(
                            'li',
                            null,
                            'content depicting drug use;'
                        ),
                        _react2.default.createElement(
                            'li',
                            null,
                            'content depicting excessive violence, including the harming of animals;'
                        ),
                        _react2.default.createElement(
                            'li',
                            null,
                            'shocking, sensational, or disrespectful content;'
                        ),
                        _react2.default.createElement(
                            'li',
                            null,
                            'deceptive, false or misleading content, including deceptive claims, offers, or business practices;'
                        ),
                        _react2.default.createElement(
                            'li',
                            null,
                            'content that directs users to phishing links, malware, or similarly harmful codes or sites; and'
                        ),
                        _react2.default.createElement(
                            'li',
                            null,
                            'content that deceives other Users in any manner for providing their personal information without their knowledge, under false pretences, or to companies that resell, trade, or otherwise misuse that personal information'
                        )
                    ),
                    _react2.default.createElement(
                        'p',
                        { className: 'privacy-desc' },
                        'If docprime determines that you have provided fraudulent, inaccurate, or incomplete information, including through feedback, docprime reserves the right to immediately suspend your access to the Website or any of your accounts with docprime and makes such declaration on the website alongside your name/your clinic\u2019s name as determined by docprime for the protection of its business and in the interests of Users. You shall be liable to indemnify docprime for any losses incurred as a result of your misrepresentations or fraudulent feedback that has adversely affected docprime or its Users.'
                    ),
                    _react2.default.createElement(
                        'p',
                        { className: 'privacy-desc' },
                        'You acknowledge that although some of the content, text, data, graphics, images, information, suggestions, guidance, and other material (collectively, \u201CInformation\u201D) that is provided to You on the Website (including Information provided in direct response to Your questions or postings) may be provided by individuals in the medical profession, the provision of such Information does not create a doctor/medical professional-patient relationship, but is provided to inform You on various medical conditions, medical diagnosis and treatment and it does not constitute a direct medical diagnosis, treatment or prescription. Everything on the Website should be used for information purposes only.'
                    ),
                    _react2.default.createElement(
                        'p',
                        { className: 'privacy-desc-subheading' },
                        '6.\xA0\xA0\xA0\xA0DISCLAIMER'
                    ),
                    _react2.default.createElement(
                        'p',
                        { className: 'privacy-desc' },
                        'As with any medical procedure, there are potential risks associated with using the Services offered by the Website. By using the Services, You agree to abide by these Terms of Use, Privacy Policy and risks described below. These risks include, but may not be limited to:'
                    ),
                    _react2.default.createElement(
                        'ol',
                        { className: 'privacy-list-group' },
                        _react2.default.createElement(
                            'li',
                            { className: 'privacy-list-item' },
                            'While the Website is an honest attempt to provide access to the best possible medical information to the Users, the Medical Experts will not be examining You physically. The Medical Experts may not have access to all or some of Your medical history that might be critical to consult You. The Medical Experts will not have the benefit of information that would be obtained by examining You in person, observing Your physical condition and by going through Your medical records. This means that the Services provided is different from the diagnostic and treatment services typically decided by a physician. Therefore, the Medical Experts may not be aware of facts or information that would affect his or her opinion of Your diagnosis. To reduce the risk of this limitation, docprime strongly encourages You to be in touch with an on-ground physician and share the docprime\u2019s opinion with him/her.'
                        ),
                        _react2.default.createElement(
                            'li',
                            { className: 'privacy-list-item' },
                            'By requesting a medical opinion through the Website, You acknowledge and agree that:',
                            _react2.default.createElement(
                                'ol',
                                { className: 'sub-list' },
                                _react2.default.createElement(
                                    'li',
                                    null,
                                    'the advice/information/opinion on diagnosis You may receive could be limited and provisional;'
                                ),
                                _react2.default.createElement(
                                    'li',
                                    null,
                                    'the medical opinion is not intended to replace a face-to-face visit with a physician and it does replace an actual doctor-patient relationship;'
                                ),
                                _react2.default.createElement(
                                    'li',
                                    null,
                                    'in case of a second opinion where there is a difference of opinion among Our Medical Experts and Your personal physician, You would bear the responsibility to decide on online or offline consultation, or procedure, and/or treatment;'
                                ),
                                _react2.default.createElement(
                                    'li',
                                    null,
                                    'the Medical Expert is reliant on information provided by You and hence any information demonstrated to have been falsified, misleading or incomplete will immediately render the opinion and all details therein null and void;'
                                ),
                                _react2.default.createElement(
                                    'li',
                                    null,
                                    'Ain some cases, the Medical Expert may determine that the transmitted information is of inadequate quality and may ask for more information, without which he/she may refuse to answer the query;'
                                ),
                                _react2.default.createElement(
                                    'li',
                                    null,
                                    'in rare cases, the Medical Experts may feel that the query may not be answerable without physically examining the patient/ Users and the Consultation may be refused forthwith;'
                                ),
                                _react2.default.createElement(
                                    'li',
                                    null,
                                    'in very rare instances, security protocols could fail, causing a breach of privacy of personal medical information; and'
                                ),
                                _react2.default.createElement(
                                    'li',
                                    null,
                                    'delays in medical evaluation and answers could occur due to deficiencies or failures of the service as per those mentioned in these Terms of Use.'
                                )
                            )
                        )
                    ),
                    _react2.default.createElement(
                        'p',
                        { className: 'privacy-desc-subheading' },
                        '7.\xA0\xA0\xA0\xA0BOOK APPOINTMENT AND CALL FACILITY'
                    ),
                    _react2.default.createElement(
                        'ol',
                        { className: 'privacy-list-group' },
                        _react2.default.createElement(
                            'li',
                            { className: 'privacy-list-item' },
                            'docprime enables Users to connect with Medical Experts and Third Party Labs through two methods: a) Book facility that allows Users book an appointment through the Website; b) online or tele-consultation services which connect Users directly to the Medical Experts engaged by docprime.'
                        ),
                        _react2.default.createElement(
                            'li',
                            { className: 'privacy-list-item' },
                            'docprime will ensure Users are provided confirmed appointment on the Book facility. However, docprime has no liability if such an appointment is later cancelled by the Medical Expert or Third Party Labs, or they are not available for appointment.'
                        ),
                        _react2.default.createElement(
                            'li',
                            { className: 'privacy-list-item' },
                            'If a User has utilized the online consultation/telephonic services, docprime reserves the right to share the information provided by the User with the Medical Experts and Third Party Labs and store such information and/or conversation of the User with the Medical Experts and Third Party Labs, in accordance with our Privacy Policy .'
                        ),
                        _react2.default.createElement(
                            'li',
                            { className: 'privacy-list-item' },
                            'The results of any search Users perform on the Website for Medical Experts and Third Party Labs should not be construed as an endorsement by docprime of any such particular Medical Experts and Third Party Labs. If the User decides to engage with a Medical Experts and Third Party Labs to seek medical services, the User shall be doing so at his/her own risk.'
                        ),
                        _react2.default.createElement(
                            'li',
                            { className: 'privacy-list-item' },
                            'Without prejudice to the generality of the above, docprime is acting as a mere facilitator and is not involved in providing any healthcare or medical advice or diagnosis and hence is not responsible for any interactions between User and Medical Experts and Third Party Labs. User understands and agrees that docprime will not be liable for:',
                            _react2.default.createElement(
                                'ol',
                                { className: 'sub-list' },
                                _react2.default.createElement(
                                    'li',
                                    null,
                                    'User interactions and associated issues User has with the Medical Experts and Third Party Labs;'
                                ),
                                _react2.default.createElement(
                                    'li',
                                    null,
                                    'the ability or intent of the Medical Experts and Third Party Labs or the lack of it, in fulfilling their obligations towards Users;'
                                ),
                                _react2.default.createElement(
                                    'li',
                                    null,
                                    'any wrong medication or quality of treatment being given by the Medical Experts and Third Party Labs, or any medical negligence on part of the Medical Experts and Third Party Labs;'
                                ),
                                _react2.default.createElement(
                                    'li',
                                    null,
                                    'inappropriate treatment, or similar difficulties or any type of inconvenience suffered by the User due to a failure on the part of the Medical Experts and Third Party Labs to provide agreed Services;'
                                ),
                                _react2.default.createElement(
                                    'li',
                                    null,
                                    'any misconduct or inappropriate behaviour by the Medical Experts and Third Party Labs or their respective staff;'
                                ),
                                _react2.default.createElement(
                                    'li',
                                    null,
                                    'cancellation or no show by the Medical Experts and Third Party Labs or rescheduling of booked appointment.'
                                )
                            )
                        ),
                        _react2.default.createElement(
                            'li',
                            { className: 'privacy-list-item' },
                            'Users are allowed to provide feedback about their experiences with the Practitioner, however, the User shall ensure that, the same is provided in accordance with applicable law. User however understands that, docprime shall not be obliged to act in such manner as may be required to give effect to the content of Users feedback, such as suggestions for delisting of a particular Medical Experts and Third Party Labs from the Website.'
                        )
                    ),
                    _react2.default.createElement(
                        'p',
                        { className: 'privacy-desc-subheading' },
                        '8.\xA0\xA0\xA0\xA0COMMUNICATIONS TO YOU'
                    ),
                    _react2.default.createElement(
                        'p',
                        { className: 'privacy-desc' },
                        'You agree and authorize docprime to share your information with its group companies and other third parties, in so far as required for joint marketing purposes/offering various services or various value added services, in association with the Services of the Website or otherwise. You agree to receive communications through emails, telephone and/or sms, from docprime or its group companies or its third party vendors/business partners or Third Party Service Providers regarding the Services/services updates, transactional and promotional emails and/or any announcements. In this context, you agree and consent to receive all communications at the mobile number provided, even if this mobile number is registered under DND/NCPR list under Telecom Regulatory Authority of India (TRAI) laws, rules and regulations. And for that purpose, you further authorize Company to share/disclose the information to any third party service provider or any affiliates, group companies, their authorized agents or third party service providers. You agree that in accordance with the applicable TRAI regulations specifically The Telecom Commercial Communications Customer Regulations, 2014 :'
                    ),
                    _react2.default.createElement(
                        'ol',
                        { className: 'privacy-list-group' },
                        _react2.default.createElement(
                            'li',
                            { className: 'privacy-list-item' },
                            'Each time You do visit/transact or login in your account on the Website, it shall be regarded as a verifiable request from you pertaining to receipt of our Services and activities;'
                        ),
                        _react2.default.createElement(
                            'li',
                            { className: 'privacy-list-item' },
                            'You should visit your account at least once in six months otherwise docprime reservs the right to deactivate your account for inaction, and in this regard docprime will send you SMS and email communications prior to the expiry of six months from the date of last visit/transaction/login into your account on the Website;'
                        ),
                        _react2.default.createElement(
                            'li',
                            { className: 'privacy-list-item' },
                            'Each time you visit/login/transact on the Website it will be deemed to be as a fresh request from you for continuing to receive communication from docprime'
                        ),
                        _react2.default.createElement(
                            'li',
                            { className: 'privacy-list-item' },
                            'In case you do not wish to receive any communication from us or provide your feedback about the services, you can mail us at care@docprime.com'
                        )
                    ),
                    _react2.default.createElement(
                        'p',
                        { className: 'privacy-desc' },
                        'docprime will retain and use your information as necessary to comply with our legal obligations, resolve disputes and enforce our agreements entered into for providing Services and ancillary services.'
                    ),
                    _react2.default.createElement(
                        'p',
                        { className: 'privacy-desc-subheading', id: 'rescheduling_9' },
                        '9.\xA0\xA0\xA0\xA0RESCHEDULING, REFUND & CANCELLATION POLICY'
                    ),
                    _react2.default.createElement(
                        'ol',
                        { className: 'privacy-list-group' },
                        _react2.default.createElement(
                            'li',
                            { className: 'privacy-list-item' },
                            'Cancellations:',
                            _react2.default.createElement(
                                'ol',
                                { className: 'sub-list' },
                                _react2.default.createElement(
                                    'li',
                                    null,
                                    'For any online paid appointments, you can cancel your scheduled or re-booked appointment and initiate immediate refund at any time. Immediate refund shall be subject to terms and conditions as described under this section mentioned below.'
                                ),
                                _react2.default.createElement(
                                    'li',
                                    null,
                                    'In the event the services are not availed at the appointed date and time and our systems do not validate the URN generated on your registered mobile number, we will automatically cancel your appointment at 12:00 midnight of next date of your appointment date.'
                                ),
                                _react2.default.createElement(
                                    'li',
                                    null,
                                    'aOccasionally, appointments may be cancelled or postponed by the Third Party Service Provider. Should this occur, we will attempt to contact or inform you and you may re- schedule your appointment as per your convenience or visit www.docprime.com for fresh/re-booking on the Website.'
                                ),
                                _react2.default.createElement(
                                    'li',
                                    null,
                                    'Cancellation through mail or call centre is allowed for all the bookings until the time of appointment or 12:00 midnight of next date of your appointment date. In such cases, we will initiate immediate refund of your money as per the process defined below.'
                                )
                            )
                        ),
                        _react2.default.createElement(
                            'li',
                            { className: 'privacy-list-item' },
                            'Rescheduling:',
                            _react2.default.createElement(
                                'ol',
                                { className: 'sub-list' },
                                _react2.default.createElement(
                                    'li',
                                    null,
                                    'Re-scheduling of all appointments can be done only until the auto-cancellation is done from our systems. Once the auto cancellation is generated, cancellation, and refund process as mentioned under this section should be followed and re-process for a fresh/re-booking, if need be.'
                                ),
                                _react2.default.createElement(
                                    'li',
                                    null,
                                    'You can re-schedule your appointment i.e. book your appointment for a different date and time; with the same Third party Health Service Provider for the same type of healthcare service.'
                                ),
                                _react2.default.createElement(
                                    'li',
                                    null,
                                    'In case of re-scheduling, if there is any difference in the charges for re-scheduled appointment, we will either collect the differential amount or refund the same, as the case may be.'
                                )
                            )
                        ),
                        _react2.default.createElement(
                            'li',
                            { className: 'privacy-list-item' },
                            'Re-booking:',
                            _react2.default.createElement(
                                'ol',
                                { className: 'sub-list' },
                                _react2.default.createElement(
                                    'li',
                                    null,
                                    'You can re-book your appointment by changing the particulars of your appointment i.e. provider, type of service, date and time etc.'
                                ),
                                _react2.default.createElement(
                                    'li',
                                    null,
                                    'Re-booking of all appointments can be done at the choice of the Customer and in such cases customer has to click on \u201CCancellation and rebook\u201D option displayed in my account section of the customer.'
                                ),
                                _react2.default.createElement(
                                    'li',
                                    null,
                                    'For all appointments which are re-booked cases, the amount paid by the customer for the previous booking can be utilized within 24(twenty four) hours from the date on which cancellation is initiated by the customer and before instruction to refund is initiated from our end & processed by the payment gateway integrated on our Website.'
                                ),
                                _react2.default.createElement(
                                    'li',
                                    null,
                                    'Your previous booking amount will be reflected by way of credits in your account. 1 credit = 1 rupee.'
                                ),
                                _react2.default.createElement(
                                    'li',
                                    null,
                                    'In case money for your re-booked appointment is adjusted against the money paid for previous booking, following may be applicable, as the case may be:',
                                    _react2.default.createElement(
                                        'ul',
                                        { className: 'mrt-10', style: { listStyle: 'disc', paddingLeft: 40, textAlign: 'left' } },
                                        _react2.default.createElement(
                                            'li',
                                            { className: 'mrb-10' },
                                            'If the charges for re-booking appointment are more than the amount paid for previous booking, you will be required to pay the shortfall amount for completing the re-booked appointment.'
                                        ),
                                        _react2.default.createElement(
                                            'li',
                                            { className: 'mrb-10' },
                                            'If the charges for re-booking appointment are less than the amount paid for previous booking, we will initiate immediate refund for the differential amount.'
                                        )
                                    )
                                )
                            )
                        ),
                        _react2.default.createElement(
                            'li',
                            { className: 'privacy-list-item' },
                            'Refunds:',
                            _react2.default.createElement(
                                'ol',
                                { className: 'sub-list' },
                                _react2.default.createElement(
                                    'li',
                                    null,
                                    'Upon receipt a valid cancellation, we will initiate refund of your money in the same manner as the money was received.'
                                ),
                                _react2.default.createElement(
                                    'li',
                                    null,
                                    'In case you fail to utilize previous booking money for any re-booking cases, we will initiate immediate refund within expiry of 24(twenty four) hours from the date of cancellation.'
                                ),
                                _react2.default.createElement(
                                    'li',
                                    null,
                                    'Typically, all refunds are processed with 14(fourteen) working days from the date immediate refund is initiated at our end.'
                                ),
                                _react2.default.createElement(
                                    'li',
                                    null,
                                    'Pease note that we shall not be responsible for any delays in credit to the Cardholder\'s credit card account/ accountholder\u2019s bank account due to any reasons cited by the Payment Gateway or Cardholder\'s issuing bank.'
                                ),
                                _react2.default.createElement(
                                    'li',
                                    null,
                                    'You will be provided with refund reference number for further communication with your bank.'
                                ),
                                _react2.default.createElement(
                                    'li',
                                    null,
                                    'No refunds / cancellation requests shall be entertained in case of payment against bills / Services received.'
                                ),
                                _react2.default.createElement(
                                    'li',
                                    null,
                                    'Under no circumstances, cash will be refunded against any cancellation.'
                                )
                            )
                        )
                    ),
                    _react2.default.createElement(
                        'p',
                        { className: 'privacy-desc-subheading' },
                        '10.\xA0\xA0\xA0PAYMENT, FEES AND TAXES'
                    ),
                    _react2.default.createElement(
                        'ol',
                        { className: 'privacy-list-group' },
                        _react2.default.createElement(
                            'li',
                            { className: 'privacy-list-item' },
                            'Registration on the Website and the access to the information provided on the Website is free. docprime does not charge any fee for accessing, and browsing through the Website. However, docprime may collect payments (which shall include applicable taxes and service fee/commission of docprime) from You on behalf of Third Party Service Providers through RBI authorized payment collectors or gateways. You agree and acknowledge that You shall not hold docprime responsible for any loss or damage caused to You during the process of collection of payments from You, or due to any acts or omission on the part of third parties viz. payment collectors or for any actions/ omissions which are beyond the control of docprime.'
                        ),
                        _react2.default.createElement(
                            'li',
                            { className: 'privacy-list-item' },
                            'All fees displayed on the Website are inclusive of applicable taxes.'
                        ),
                        _react2.default.createElement(
                            'li',
                            { className: 'privacy-list-item' },
                            'docprime reserves the right to modify the fee structure by providing on the Website which shall be considered as valid and agreed communication.'
                        ),
                        _react2.default.createElement(
                            'li',
                            { className: 'privacy-list-item' },
                            'In order to process the payments, docprime might require details of User\u2019s/ Third Party Service Providers\u2019 bank account, credit card number etc. Please check Our Privacy Policy on how docprime uses the confidential information provided by Users.'
                        )
                    ),
                    _react2.default.createElement(
                        'p',
                        { className: 'privacy-desc-subheading' },
                        '11.\xA0\xA0\xA0RESTRICTIONS ON USE OF THE WEBSITE'
                    ),
                    _react2.default.createElement(
                        'ol',
                        { className: 'privacy-list-group' },
                        _react2.default.createElement(
                            'li',
                            { className: 'privacy-list-item' },
                            'You agree and undertake that You shall not do any act or post, display, upload, modify, publish, transmit, update or share any information that -',
                            _react2.default.createElement(
                                'ol',
                                { className: 'sub-list' },
                                _react2.default.createElement(
                                    'li',
                                    null,
                                    'belongs to another person and to which You does not belong to You or do not have any right;'
                                ),
                                _react2.default.createElement(
                                    'li',
                                    null,
                                    'is grossly harmful, harassing, defamatory, obscene, pornographic, libelous, invasive of another\'s privacy, hateful, or objectionable, relating or encouraging money laundering or gambling, or otherwise unlawful in any manner whatever;'
                                ),
                                _react2.default.createElement(
                                    'li',
                                    null,
                                    'infringes any patent, trademark, copyright or other intellectual proprietary rights of any third party;'
                                ),
                                _react2.default.createElement(
                                    'li',
                                    null,
                                    'violates any law for the time being in force;'
                                ),
                                _react2.default.createElement(
                                    'li',
                                    null,
                                    'impersonates another person;'
                                ),
                                _react2.default.createElement(
                                    'li',
                                    null,
                                    'contains software viruses or any other computer code, files or programs designed to interrupt, destroy or limit the functionality of any computer resource;'
                                ),
                                _react2.default.createElement(
                                    'li',
                                    null,
                                    'is prohibited under applicable law(s) for the time being in force and rules made there under; and'
                                ),
                                _react2.default.createElement(
                                    'li',
                                    null,
                                    'threatens the unity, integrity, defense, security or sovereignty of India, friendly relations with foreign states, or public order or causes incitement to the commission of any cognizable offence or prevents investigation of any offence or is insulting any other nation.'
                                )
                            )
                        ),
                        _react2.default.createElement(
                            'li',
                            { className: 'privacy-list-item' },
                            'You are also prohibited from:',
                            _react2.default.createElement(
                                'ol',
                                { className: 'sub-list' },
                                _react2.default.createElement(
                                    'li',
                                    null,
                                    'violating or attempting to violate the integrity or security of the Website or any docprime Content;'
                                ),
                                _react2.default.createElement(
                                    'li',
                                    null,
                                    'transmitting any information (including job posts, messages and hyperlinks) on or through the Website that is disruptive or competitive to the provision of Services by docprime;'
                                ),
                                _react2.default.createElement(
                                    'li',
                                    null,
                                    'intentionally submitting on the Website any incomplete, false or inaccurate information;'
                                ),
                                _react2.default.createElement(
                                    'li',
                                    null,
                                    'making any unsolicited communications to other Covenanters;'
                                ),
                                _react2.default.createElement(
                                    'li',
                                    null,
                                    'using any engine, software, tool, agent or other device or mechanism (such as spiders, robots, avatars or intelligent agents) to navigate or search the Website;'
                                ),
                                _react2.default.createElement(
                                    'li',
                                    null,
                                    'attempting to decipher, decompile, disassemble or reverse engineer any part of the Website;'
                                ),
                                _react2.default.createElement(
                                    'li',
                                    null,
                                    'copying or duplicating in any manner any of the docprime Content or other information available from the Website; and'
                                )
                            )
                        )
                    ),
                    _react2.default.createElement(
                        'p',
                        { className: 'privacy-desc' },
                        'The Website shall not be used for illegal purposes. The information and Services shall not be used for any illegal purpose. You may not access our networks, computers, or the Information and Services in any manner that could damage, disable, overburden, or impair them, or interfere with any other person\'s use and enjoyment. You shall not attempt to gain unauthorized access to any Information or Services, other accounts, computer systems, or networks connected with the Website, the Information, or Services. You shall not use any automated means (such as a scraper) to access the Website, the Information, or Services for any purpose. Such unauthorized access includes, but is not limited to, using another person\u2019s login credentials to access his or her docprime profile/ account. Any attempt by any individual or entity to solicit login information of any other user to access any such account is an express and direct violation of these Terms of Use and of applicable law(s), including relevant privacy and security laws and laws prohibiting unfair or unethical business practices.'
                    ),
                    _react2.default.createElement(
                        'p',
                        { className: 'privacy-desc-subheading' },
                        '12.\xA0\xA0\xA0NO WARRANTIES'
                    ),
                    _react2.default.createElement(
                        'p',
                        { className: 'privacy-desc' },
                        'Users accept and acknowledges that the Services offered by docprime through the Website (or any of its licensors or providers or Third Party Service Providers) are provided \u2018as is\u2019, as available, and without any warranties or representations or conditions (express or implied, including the implied warranties or representations of merchantability, accuracy, fitness for a particular purpose, title and non-infringement, arising by statute or otherwise in law or from a course of dealing or usage or trade). docprime does not provide or make any representations, warranties or guarantees express or implied about the Website or the Services. docprime does not verify any content or information provided by the Users or any Third Party Service Providers (collectively referred to as the \u201COther Parties\u201D) on the Website and to the fullest extent permitted by applicable law(s), disclaims all liability arising out of the Other Parties\u2019 use or reliance upon the Website, the Services, the docprime Content, Third Party Contents, representations and warranties made by the Other Parties on the Website or any loss arising out of the manner in which the Services have been rendered.'
                    ),
                    _react2.default.createElement(
                        'p',
                        { className: 'privacy-desc' },
                        'docprime also does not provide any representation or give any guarantee or warranty (whether express or implied) about the Website or any of the Services offered or services offered or provided by the Third Party Service Providers.'
                    ),
                    _react2.default.createElement(
                        'p',
                        { className: 'privacy-desc-subheading' },
                        '13.\xA0\xA0\xA0LIABILITY'
                    ),
                    _react2.default.createElement(
                        'ol',
                        { className: 'sub-list' },
                        _react2.default.createElement(
                            'li',
                            null,
                            'docprime shall not be responsible or liable in any manner to the Users or any Third Party Service Providers (collectively referred to as the \u201COther Parties\u201D) for any losses, damage, injuries or expenses incurred by as a result of any disclosures made by docprime, where Other Parties have consented to the making of such disclosures by docprime. The Other Parties shall not hold docprime responsible or liable in any way for any disclosures by docprime for collection, use, storage and transfer of personal information under the Privacy Policy. docprime shall not be responsible for the mishaps/missed services due to no service/no show from the Other Parties; docprime shall not be responsible for any error in any of the services being provided by the Third Party Service Providers.'
                        ),
                        _react2.default.createElement(
                            'li',
                            null,
                            'docprime assumes no responsibility, and shall not be liable for, any damages to, or viruses that may infect Other Parties\u2019 equipment on account of the Other Parties\u2019 access to, use of, or browsing the Website or the downloading of any material, data, text, images, video content, or audio content from the Website. If any of the Other Party is dissatisfied with the Website, the sole remedy of such Other Party(s) is to discontinue using the Website.'
                        ),
                        _react2.default.createElement(
                            'li',
                            null,
                            'To the maximum extent permitted by applicable law(s), docprime, its affiliates, independent contractors, service providers, consultants, licensors, agents, and representatives, affiliates, group companies and each of their respective directors, officers or employees (\u201CProtected Entities\u201D), shall not be liable for any direct, indirect, special, incidental, punitive, exemplary or consequential damages, or any other damages of any kind, arising from, or in connect with or directly or indirectly related to, the use of, or the inability to use, the Website or the content, materials and functions related thereto; even if Protected Entities has been advised of the possibility of such damages.'
                        ),
                        _react2.default.createElement(
                            'li',
                            null,
                            'In (iv), all or any products or service by a Third Party Service Provider to any User; or (ii) any comments or feedback given by any of the Users in relation to the goods or services provided by any Third Party Service Providers; or (ii) any content posted, transmitted, exchanged or received by or on behalf of any User, Third Party Service Providers or other person on or through the Website.'
                        ),
                        _react2.default.createElement(
                            'li',
                            null,
                            'In no event shall the Protected Entities be liable for failure on the part of the Users or Third Party Service Providers to provide agreed services or to make himself/herself available at the appointed time, cancellation or rescheduling of appointments. In no event shall the Protected Entities be liable for any comments or feedback given by any of the Users in relation to the services provided by a Third Party Service Providers'
                        ),
                        _react2.default.createElement(
                            'li',
                            null,
                            'docprime disclaims any liability in relation to the validity of the medical advice provided by the Medical Experts and the validity and legality of the e-prescription for dispensation of medicines and conduct of diagnostic tests. All liabilities arising out of any wrong diagnosis of medical condition by the Medical Experts and/ or arising from the e-prescription will be of the concerned Medical Expert. Further, all liabilities arising out of any wrong diagnosis report by the Third Party Labs and/ or arising from the wrong dispensation of the Pharmaceutical Goods and Services will be of the concerned Third Party Service Providers as the case may be.'
                        ),
                        _react2.default.createElement(
                            'li',
                            null,
                            'The Users may share their previous medical history during interaction with the Medical Experts. The Users undertake to share such information at their own risk. docprime reserves the right to retain such information for the purpose of providing Services to the Users.'
                        ),
                        _react2.default.createElement(
                            'li',
                            null,
                            'The Users acknowledge that the Protected Entities merely act in the capacity of facilitators between the Other Parties by providing a platform for them to interact and transact. In no event shall the Protected Entities be held liable for any of the losses attributable to Services offered through the Website.'
                        ),
                        _react2.default.createElement(
                            'li',
                            null,
                            'In no event shall the total aggregate liability of the Protected Entities to any Other Parties for all damages, losses, and causes of action (whether in contract or tort, including, but not limited to negligence, strict liability, product liability or otherwise) arising from these Terms of Use or any Other Parties\u2019 use of the Website exceed an aggregate amount of INR 1000/- (Indian Rupees Thousand only).'
                        ),
                        _react2.default.createElement(
                            'li',
                            null,
                            'docprime accepts no liability for any errors or omissions on behalf of the Other Parties.'
                        )
                    ),
                    _react2.default.createElement(
                        'p',
                        { className: 'privacy-desc-subheading' },
                        '14.\xA0\xA0\xA0INDEMNITY'
                    ),
                    _react2.default.createElement(
                        'p',
                        { className: 'privacy-desc' },
                        'You agree to defend, indemnify and hold harmless docprime, the Protected Entities, independent contractors, service providers, consultants, licensors, agents, and representatives, and each of their respective directors, officers and employees, from and against any and all claims, losses, liability, damages, and/or costs (including, but not limited to, reasonable attorney fees and costs) arising from or related to (a) access to or use of Website; (b) violation of these Terms of Use or any applicable law(s); (c) violation of any rights of another person/ entity, including infringement of their intellectual property rights; or (d) conduct in connection with the Website.'
                    ),
                    _react2.default.createElement(
                        'p',
                        { className: 'privacy-desc-subheading' },
                        '15.\xA0\xA0\xA0GENERAL TERMS'
                    ),
                    _react2.default.createElement(
                        'ol',
                        { className: 'sub-list' },
                        _react2.default.createElement(
                            'li',
                            null,
                            _react2.default.createElement(
                                'span',
                                null,
                                'Links to Third Party Websites:'
                            ),
                            ' The Website may be linked to the website of third parties, affiliates and business partners. docprime has no control over, and not liable or responsible for content, accuracy, validity, reliability, quality of such websites or made available by/through the Website. Inclusion of any link on the Website does not imply that docprime endorses the linked website. Other Parties may use the links and these services at their own risk.'
                        ),
                        _react2.default.createElement(
                            'li',
                            null,
                            _react2.default.createElement(
                                'span',
                                null,
                                'Modifications:'
                            ),
                            ' docprime reserves the right to change or modify these Terms of Use or any policy or guideline of the Website including the Privacy Policy, at any time and in its sole discretion. Any changes or modifications will be effective immediately upon posting the revisions on the Website and You waive any right You may have to receive specific notice of such changes or modifications. Your continued use of the Website will confirm Your acceptance of such changes or modifications; therefore, You should frequently review these Terms of Use and applicable policies to understand the terms and conditions that apply to Your use of the Website. Further, docprime also reserves the right to modify or discontinue, temporarily or permanently, the Website or any features or portions thereof without prior notice. You agree that docprime will not be liable for any modification, suspension or discontinuance of the Website or any other part thereof.'
                        ),
                        _react2.default.createElement(
                            'li',
                            null,
                            _react2.default.createElement(
                                'span',
                                null,
                                'Cookies:'
                            ),
                            ' The Website uses temporary cookies to store certain data (that is not sensitive personal data or information) that is used by docprime for the technical administration of the Website, research and development, and for User administration. In the course of serving or optimizing services to You, docprime may allow authorized third parties to place or recognize a unique cookie on the Your browser. docprime does not store personally identifiable information in the cookies.'
                        ),
                        _react2.default.createElement(
                            'li',
                            null,
                            _react2.default.createElement(
                                'span',
                                null,
                                'Intellectual property rights:'
                            ),
                            ' All the intellectual property used on the Website except those which have been identified as the intellectual properties of the Other Parties(as defined above) shall remain the exclusive property of the Company. The Other Parties agree not to circumvent, disable or otherwise interfere with security related features of the Website or features that prevent or restrict use or copying of any materials or enforce limitations on use of the Website or the materials therein. The materials on the Website or otherwise may not be modified, copied, reproduced, distributed, republished, downloaded, displayed, sold, compiled, posted or transmitted in any form or by any means, including but not limited to, electronic, mechanical, photocopying, recording or other means.'
                        ),
                        _react2.default.createElement(
                            'li',
                            null,
                            _react2.default.createElement(
                                'span',
                                null,
                                'Compliance of Applicable Law:'
                            ),
                            ' While communicating/ transacting with each other through the Website, Third Party Service Providers shall at all times ensure full compliance with the applicable provisions of the Contract Act, IT Act, Drugs Act read with the Drug Rules, Drugs and Magic Act, The Indian Medical Council Act, 1956 read with the Indian Medical Council Rules, 1957, Pharmacy Act, Consumer Protection Act, 1986, IT law (including rules for sensitive personal information as enshrined under IT law), etc. ',
                            _react2.default.createElement(
                                'strong',
                                null,
                                '(\u201CCaptioned Laws\u201D)'
                            ),
                            ' as well as all other laws for the time being in force.'
                        ),
                        _react2.default.createElement(
                            'li',
                            null,
                            _react2.default.createElement(
                                'span',
                                null,
                                'Termination:'
                            ),
                            ' docprime reserves the right to, at any time, and with or without notice, terminate these Terms of Use against the User(s), if there is:',
                            _react2.default.createElement(
                                'ol',
                                { className: 'privacy-order-list' },
                                _react2.default.createElement(
                                    'li',
                                    { className: 'privacy-order-item' },
                                    'Breach of any of applicable law(s), including but not limited to the Captioned Laws or the provisions of these Terms of Use or the terms of the Privacy Policy or any other terms, conditions, or policies that may be applicable to the Services from time to time (or have acted in a manner that clearly shows that Other Party(s) do not intend to, or are unable to, comply with the same); or'
                                ),
                                _react2.default.createElement(
                                    'li',
                                    { className: 'privacy-order-item' },
                                    'Breach of any terms and conditions of these Terms of Use;'
                                ),
                                _react2.default.createElement(
                                    'li',
                                    { className: 'privacy-order-item' },
                                    'docprime is unable to verify or authenticate any information provided to docprime; or'
                                ),
                                _react2.default.createElement(
                                    'li',
                                    { className: 'privacy-order-item' },
                                    'A third party reports violation of any of its right as a result of your use of the Services;'
                                ),
                                _react2.default.createElement(
                                    'li',
                                    { className: 'privacy-order-item' },
                                    'docprime has reasonable grounds for suspecting any illegal, fraudulent or abusive activity on part of such User; or'
                                ),
                                _react2.default.createElement(
                                    'li',
                                    { className: 'privacy-order-item' },
                                    'docprime believes, in its sole discretion, that Other Parties actions may cause legal liability for docprime (or any of its affiliates, independent contractors, service providers, consultants, licensors, agents, and representatives) or are contrary to the interests of the Website; or'
                                ),
                                _react2.default.createElement(
                                    'li',
                                    { className: 'privacy-order-item' },
                                    'docprime is required to do so by law; or'
                                ),
                                _react2.default.createElement(
                                    'li',
                                    { className: 'privacy-order-item' },
                                    'The provision of the Services to the general public, is in docprime\u2019s opinion, no longer commercially viable; or'
                                ),
                                _react2.default.createElement(
                                    'li',
                                    { className: 'privacy-order-item' },
                                    'docprime has elected to discontinue, with or without reason, access to the Website or the Services (or any part thereof).'
                                ),
                                _react2.default.createElement(
                                    'li',
                                    { className: 'privacy-order-item' },
                                    'docprime believes in its sole discretion that User\u2019s actions may cause legal liability for such User, other Users or for docprime or are contrary to the interests of the Website.'
                                ),
                                _react2.default.createElement(
                                    'li',
                                    { className: 'privacy-order-item' },
                                    'Once temporarily suspended, indefinitely suspended or terminated, the User may not continue to use the Website under the same account, a different account or re-register under a new account. On termination of an account due to the reasons mentioned herein, such User shall no longer have access to data, messages, files and other material kept on the Website by such User. The User shall ensure that he/she/it has continuous backup of any medical services the User has rendered in order to comply with the User\u2019s record keeping process and practices'
                                ),
                                _react2.default.createElement(
                                    'li',
                                    { className: 'privacy-order-item' },
                                    'The right to terminate/ suspend the account is in addition to, and without prejudice to, docprime\u2019s right to initiate action against a User (or Other Parties), in accordance with applicable law.'
                                )
                            )
                        ),
                        _react2.default.createElement(
                            'li',
                            null,
                            _react2.default.createElement(
                                'span',
                                null,
                                'Force Majeure:'
                            ),
                            ' Other Parties accept and acknowledge that docprime shall not be liable for any loss or damage caused to the User as a result of delay or default or deficiency or failure in the Services as a result of any natural disasters, fire, riots, civil disturbances, actions or decrees of governmental bodies, communication line failures (which are not caused due to the fault of docprime or the Third Party Service Providers), or any other delay or default or deficiency or failure which arises from causes beyond docprime\u2019s reasonable control (\u201CForce Majeure Event\u201D). In the event of any Force Majeure Event arising, docprime, depending on whose performance has been impacted under the Terms of Use, shall immediately give notice to the Other Party(s) of the facts which constitute the Force Majeure Event.'
                        ),
                        _react2.default.createElement(
                            'li',
                            null,
                            _react2.default.createElement(
                                'span',
                                null,
                                'Governing Law and Dispute Resolution:'
                            ),
                            ' These Terms of Use and any contractual obligation between the Parties will be governed by the laws of India, without reference to the conflict of laws principles. Any legal action or proceeding related to Other Party(s) access to, or use of, the Website or these Terms of Use shall be subject to the exclusive jurisdiction of the courts at Gurugram.'
                        ),
                        _react2.default.createElement(
                            'li',
                            null,
                            _react2.default.createElement(
                                'span',
                                null,
                                'Survival:'
                            ),
                            ' Even after termination, certain terms/obligations mentioned under these Terms of Use such as Liability, Indemnity, Intellectual Property, Dispute Resolution shall continue and survive termination.'
                        ),
                        _react2.default.createElement(
                            'li',
                            null,
                            _react2.default.createElement(
                                'span',
                                null,
                                'Severability:'
                            ),
                            ' If any provision of these Terms of Use is deemed invalid, unlawful, void or for any other reason unenforceable, then that provision shall be deemed severable from these Terms of Use and shall not affect the validity and enforceability of any of the remaining provisions.'
                        ),
                        _react2.default.createElement(
                            'li',
                            null,
                            _react2.default.createElement(
                                'span',
                                null,
                                'Waiver:'
                            ),
                            ' No provision of these Terms of Use shall be deemed to be waived and no breach excused, unless such waiver or consent shall be in writing and signed by docprime. Any consent by docprime to, or a waiver by docprime of any breach by Other Parties, whether expressed or implied, shall not constitute consent to, waiver of, or excuse for any other different or subsequent breach.'
                        ),
                        _react2.default.createElement(
                            'li',
                            null,
                            _react2.default.createElement(
                                'span',
                                null,
                                'Headings:'
                            ),
                            ' The headings and subheadings herein are included for convenience and identification only and are not intended to describe, interpret, define or limit the scope, extent or intent of these Terms of Use.'
                        ),
                        _react2.default.createElement(
                            'li',
                            null,
                            _react2.default.createElement(
                                'span',
                                null,
                                'Grievance Officer and Contact us'
                            ),
                            'If any User/You have any grievance, comment, question or suggestion regarding any of our Services or the Website or anything related to any of the forgoing, please contact us at In accordance with the Information Technology Act, 2000, and the rules made there under, if you have any grievance with respect to the Website or the service, including any discrepancies and grievances with respect to processing of information, you can contact our Grievance Officer at:',
                            _react2.default.createElement(
                                'p',
                                null,
                                'Name: Rajendra Prasad'
                            ),
                            _react2.default.createElement(
                                'p',
                                null,
                                'Designation: Senior Manager'
                            ),
                            _react2.default.createElement(
                                'p',
                                null,
                                'Email: rajendra@docprime.com'
                            )
                        )
                    )
                )
            ),
            _react2.default.createElement(
                'div',
                { className: 'row doctor-terms-row', hidden: this.state.selected == 0 },
                _react2.default.createElement(
                    'div',
                    { className: 'col-12 privacy-desc-div' },
                    _react2.default.createElement(
                        'p',
                        { className: 'privacy-desc-heading mrb-20' },
                        'TERMS AND CONDITIONS FOR EMPANELMENT OF HOSPITALS/DIAGNOSTIC CENTERS/CLINICS/DOCTORS'
                    ),
                    _react2.default.createElement(
                        'p',
                        { className: 'privacy-desc' },
                        'This agreement sets forth the terms and conditions that apply to the empanelment of Hospitals/Diagnostic centers/Clinics/Doctors (\u201CHealth Service provider/HSB\u201D) to provide access to health care services by disseminating healthcare information and data in an unbiased manner under its scope of licensure or accreditation (Services) to the users/customers of this Website and its Mobile Application (collectively be referred to as \u201CWebsite\u201D), which is managed and operated by Panacea Techno Services Private Limited (\u201CCompany\u201D). You understand and agree that Company reserves the right to enroll/ appoint other health service providers for similar services as envisaged herein and you shall have no objection for the same and vice-versa.'
                    ),
                    _react2.default.createElement(
                        'p',
                        { className: 'privacy-desc' },
                        'This document/agreement is an electronic record in terms of Information Technology Act, 2000 and generated by a computer system and does not require any physical or digital signatures. This document is published in accordance with the provisions of Rule 3 of the Information Technology (Intermediaries guidelines) 2011, that provides for the due diligence to be exercised for the access or usage of this Website.'
                    ),
                    _react2.default.createElement(
                        'p',
                        { className: 'privacy-desc' },
                        'PLEASE READ THESE TERMS AND CONDITIONS CAREFULLY. YOUR ACCEPTANCE OF TERMS CONTAINED HEREIN CONSTITUTES THE AGREEMENT BETWEEN YOU AND COMPANY FOR THE PURPOSE AS DEFINDED HEREUNDER.'
                    ),
                    _react2.default.createElement(
                        'p',
                        { className: 'privacy-desc-subheading' },
                        '1.\xA0\xA0\xA0\xA0SCOPE AND PURPOSE'
                    ),
                    _react2.default.createElement(
                        'ol',
                        { className: 'privacy-list-group' },
                        _react2.default.createElement(
                            'li',
                            { className: 'privacy-list-item' },
                            'Health Service Provider is desirous and had approached the Company to display/list the information pertaining to the Health Service Provider on the Website to disseminate information regarding the availability of medical/health facilities with the Health Service Provider to the prospective users/customers of the Website and to render medical/health care services to the customers of the Company who are desirous of availing such medical benefits through the Website.'
                        ),
                        _react2.default.createElement(
                            'li',
                            { className: 'privacy-list-item' },
                            'Parties agree that Company shall provide the customer details of such customers who have expressed to avail the services of the Health Service Provider such as by booking an online consultation, through the designated website of the Company.'
                        ),
                        _react2.default.createElement(
                            'li',
                            { className: 'privacy-list-item' },
                            'For all customers referred by the Company, Company shall be entitled to send information through SMS or E-Mail to the SPOC of Service Provider.'
                        ),
                        _react2.default.createElement(
                            'li',
                            { className: 'privacy-list-item' },
                            'If any services, functions or responsibilities not specifically described herein or in any related documents but are inherent, necessary or customary part of the services or are reasonably required for proper performance of the Services in accordance with the Agreement, they shall be deemed to be included within the Scope of Services as if such services, functions or responsibilities were specifically described in this Agreement.'
                        )
                    ),
                    _react2.default.createElement(
                        'p',
                        { className: 'privacy-desc-subheading' },
                        '2.\xA0\xA0\xA0\xA0OBLIGATIONS OF THE SERVICE PROVIDER'
                    ),
                    _react2.default.createElement(
                        'ol',
                        { className: 'privacy-list-group' },
                        _react2.default.createElement(
                            'li',
                            { className: 'privacy-list-item' },
                            'This Agreement is between the Health Service Provider and the Company. However, it would be applicable to all specialties offered by ',
                            _react2.default.createElement(
                                'span',
                                null,
                                'Service Provider Group of Hospitals/ diagnostic centers/Clinics,'
                            ),
                            ' as may be applicable, and as provided by the Health Service Provider from time to time.'
                        ),
                        _react2.default.createElement(
                            'li',
                            { className: 'privacy-list-item' },
                            'The empanelled Health Service Provider is expected to provide its Services as per the industry standards and in a professional & ethical manner.'
                        ),
                        _react2.default.createElement(
                            'li',
                            { className: 'privacy-list-item' },
                            'Health Service Provider may set-up a separate Company\u2019s \u201CCo-ordination Desk\u201D round the clock in the Health Service Provider Premises, as may be mutually agreed with the Company.'
                        ),
                        _react2.default.createElement(
                            'li',
                            { className: 'privacy-list-item' },
                            'Health Service Provider shall notify and share with the Company the cost/rate list detailing the costs of each medical treatment and procedures, which can be suitably displayed on the website of the Company. In case of any changes/modification to such costs/rates the Service Provider shall notify the same within 2(two) days prior to such changes are to be made effective.'
                        ),
                        _react2.default.createElement(
                            'li',
                            { className: 'privacy-list-item' },
                            'Health Service Provider agrees to provide the Services to the customers of the Company with the same degree of care and skill as customarily provided to its own patients who are not customers of the Company, i.e. according to generally accepted standards of practice including medical profession in India.'
                        ),
                        _react2.default.createElement(
                            'li',
                            { className: 'privacy-list-item' },
                            'Health Service Provider agrees not to discriminate against customers of the Company on the basis of race, ethnicity, gender, creed, ancestry, lawful occupation, age, religion, marital status, sexual orientation, mental or physical disability, medical history, color, national origin, place of residence, health status, or any other grounds prohibited by law.'
                        ),
                        _react2.default.createElement(
                            'li',
                            { className: 'privacy-list-item' },
                            'Health Service Provider also agrees to allow Company to audit the relevant bills/ documents pertaining to this Agreement; as and when requested by the Company. Such auditing shall be scheduled mutually between the parties.'
                        ),
                        _react2.default.createElement(
                            'li',
                            { className: 'privacy-list-item' },
                            'Health Service Provider shall ensure that the information provided to the Company for display on its Website shall be up to dated, true and correct. In this context, health Service Provider will not hold the Company (including its affiliated companies/group companies and related websites) liable for any information relied upon by Company as provided by the Health Service Provider.'
                        ),
                        _react2.default.createElement(
                            'li',
                            { className: 'privacy-list-item' },
                            'Health Service Provider authorizes Company to collect and receive monies towards the amounts payable by the customer for the services availed, on behalf of the Service Provider. Further, settlement of monies to the Service Provider shall be in accordance with the terms as mutually agreed between the parties. All settlements for the preceding month shall be made within 60(sixty) days from the succeeding month during which the invoice is raised by the Service Provider. In this regard, the Service Provider shall raise the invoice on or before the 7th day of the successive month for the settlement of preceding month.'
                        ),
                        _react2.default.createElement(
                            'li',
                            { className: 'privacy-list-item' },
                            'The Health Service Provider shall be solely responsible for any misconduct, damage, willfull commission or omission of any services which are not listed under these Terms & Conditions or anything which goes against the spirit of free, fair and ethical practice of patient care.'
                        ),
                        _react2.default.createElement(
                            'li',
                            { className: 'privacy-list-item' },
                            _react2.default.createElement(
                                'span',
                                null,
                                'Confidentiality :'
                            ),
                            ' The Health Service Provider undertakes to maintain in absolute confidence and not to reveal to any person or body, any information or data which it receives through and subsequent for providing the Services pursuant to this agreement and which pertains; directly or indirectly; to the Company or its customers, including the and without derogating from the generality of the aforesaid names, addresses, details and medical background of the Company\u2019s customers, information which pertains to the Company\u2019s business  or any other data which is proprietary to the Company and its customers. It is further agreed that the contents of this sub-section cannot derogate from the duty of the Health Service Provider in reporting the Company of any data, information or medical background which may be relevant to the Company in determination of its scope of work.  The transfer of information shall be in accordance to the procedures established by the Company. The Health Service Provider acknowledges that its undertakings given in this Agreement with regard to the confidentiality shall be valid throughout the Term of this Agreement and it shall abide by the same even after the expiry of this Agreement.'
                        )
                    ),
                    _react2.default.createElement(
                        'p',
                        { className: 'privacy-desc-subheading' },
                        '3.\xA0\xA0\xA0\xA0REPRESENTATIONS AND DECLARATIONS BY THE SERVICE PROVIDER'
                    ),
                    _react2.default.createElement(
                        'ol',
                        { className: 'privacy-list-group' },
                        _react2.default.createElement(
                            'li',
                            { className: 'privacy-list-item' },
                            'The Health Service Provider declares and undertakes that it has all the necessary registrations/ licenses/ approvals/ authorizations required by the law in order to provide the medical services pursuant to this agreement and that it has adequate ability, knowledge, experience and equipment\u2019s required in order to provide the said service as required in this agreement.'
                        ),
                        _react2.default.createElement(
                            'li',
                            { className: 'privacy-list-item' },
                            'The Health Service Provider undertakes to uphold all of the requirements of the law as applicable to it from time to time and shall keep updated the Company, in case of any significant change in the present status of the Provider. The Service Provider also undertakes that it shall provide the said services in accordance with the provisions of the law and the regulations, which are enacted, from time to time, by the central or the state government or the local administration/ bodies.'
                        ),
                        _react2.default.createElement(
                            'li',
                            { className: 'privacy-list-item' },
                            'The Health Service Provider has and will continue to have its facilities covered by proper indemnity policy, including error, omission and professional indemnity and agrees to keep such policies in force during the currency of this Agreement.'
                        ),
                        _react2.default.createElement(
                            'li',
                            { className: 'privacy-list-item' },
                            'The Health Service Provider declares that it has not been prevented from practicing medicines and that no criminal charge of any kind has ever been filed against it due to medical malpractice, medical negligence and/ or no civil claim has ever been filed against it due to damage inflicted during a medical treatment.'
                        ),
                        _react2.default.createElement(
                            'li',
                            { className: 'privacy-list-item' },
                            'The Health Service Provider also undertakes to inform the Company in the event of any complaint of medical malpractice is filed against it during the currency of this Agreement.'
                        ),
                        _react2.default.createElement(
                            'li',
                            { className: 'privacy-list-item' },
                            'It has been duly constituted under the applicable laws and has complied with and shall continue to comply with the applicable laws.'
                        ),
                        _react2.default.createElement(
                            'li',
                            { className: 'privacy-list-item' },
                            'It has the requisite licenses, permissions, authorizations, consents, approvals and registrations under the applicable laws and the authority to execute this Agreement avail the required Services and perform its obligations hereunder.'
                        ),
                        _react2.default.createElement(
                            'li',
                            { className: 'privacy-list-item' },
                            'Neither the execution and delivery of this Agreement, the consummation of the transactions contemplated hereby, or the fulfillment of or compliance with the terms and conditions of this Agreement, conflict with or result in a breach of or a default under any of the terms, conditions or provisions of any legal restriction (including, without limitation, any judgment, order, injunction, decree or ruling of any court or governmental authority, or any central, state, local or other law, statute, rule or regulation) or any covenant or agreement or instrument to which it is a Party, or by which it is bound, nor does such execution, delivery, consummation or compliance violate or result in the violation of its constitutional documents.'
                        )
                    ),
                    _react2.default.createElement(
                        'p',
                        { className: 'privacy-desc-subheading' },
                        '4.\xA0\xA0\xA0\xA0INTELLECTUAL PROPERTY RIGHTS'
                    ),
                    _react2.default.createElement(
                        'ol',
                        { className: 'privacy-list-group' },
                        _react2.default.createElement(
                            'li',
                            { className: 'privacy-list-item' },
                            'The Parties hereby acknowledge that each Party is the legal and beneficial owner of and has exclusive right, title and interest over its own Intellectual Property and all other proprietary information in relation to its business. Nothing in this Agreement shall be deemed in any way to constitute a transfer or assignment of any Intellectual Property by either Party. It is further agreed and understood between the Parties that the data and information of users/customers produced through this agreement shall jointly owned by the Health Service Provider and the Company.'
                        ),
                        _react2.default.createElement(
                            'li',
                            { className: 'privacy-list-item' },
                            'The Health Service Provider hereby grants to the Company a limited, non-exclusive, non-transferable right, only for the Term of this Agreement, to use the Service Provider\u2019s Intellectual Property, including its marks, logos and brand/trade names, solely for in relation to the Services to be rendered by the Service Provider in accordance with the terms of this Agreement. Subject to the confidentiality clause herein, the Company may display on its web portals, at all times during the Term of this Agreement, the Health Service Provider\u2019s marks, logo and brand/trade names, as mutually determined in writing by the Parties solely for purposes specified in this Agreement.'
                        ),
                        _react2.default.createElement(
                            'li',
                            { className: 'privacy-list-item' },
                            'Information and data of the Health Service Provider shall be published by the Company either by relying on the information provided by the Service Provider\u2019s or if taken from Health Service Provider\u2019s website then by seeking prior written approval from the Health Service Provider.'
                        )
                    ),
                    _react2.default.createElement(
                        'p',
                        { className: 'privacy-desc-subheading' },
                        '5.\xA0\xA0\xA0\xA0INDEMNITY'
                    ),
                    _react2.default.createElement(
                        'p',
                        { className: 'privacy-desc' },
                        'The Service Provider hereby covenants to indemnify and hold harmless Company, its employees, servants and agents from and against all actions, claims, demands, losses, damages, costs and expenses for which  Company shall or may be or become liable in respect of and to the extent that they arise from:'
                    ),
                    _react2.default.createElement(
                        'ol',
                        { className: 'privacy-list-group' },
                        _react2.default.createElement(
                            'li',
                            { className: 'privacy-list-item' },
                            'The Health Service Provider committing any breach or contravention of the terms and conditions of this Agreement, its obligations under this Agreement, applicable Laws, applicable permits, codes, ordinances or regulations, bye laws;'
                        ),
                        _react2.default.createElement(
                            'li',
                            { className: 'privacy-list-item' },
                            'any act of commission or omission, or default on the part of the Service Provider and/or its personnel, representatives, officers, agents, affiliates;'
                        ),
                        _react2.default.createElement(
                            'li',
                            { className: 'privacy-list-item' },
                            'the negligent use, misuse, by the health Service Provider or any of its employee, servant, agent, with respect to the medical services provided to the Customer(s) of the Company;'
                        ),
                        _react2.default.createElement(
                            'li',
                            { className: 'privacy-list-item' },
                            'The Health Service Provider also agrees to indemnify and hold harmless Company from time to time and at all times hereafter, from and against, all notices, claims, demands, action, suits or proceedings given, made or initiated against Company on account of the Service Provider, as also against all costs, charges and expenses suffered or incurred by Company as a result of any proceeding or legal action filed by the customer or any third party.'
                        )
                    ),
                    _react2.default.createElement(
                        'p',
                        { className: 'privacy-desc-subheading' },
                        '6.\xA0\xA0\xA0\xA0GENERAL PROVISIONS'
                    ),
                    _react2.default.createElement(
                        'ol',
                        { className: 'privacy-order-list' },
                        _react2.default.createElement(
                            'li',
                            { className: 'privacy-order-item' },
                            _react2.default.createElement(
                                'span',
                                null,
                                'Governing Law; Dispute Resolution:'
                            ),
                            ' This Agreement shall be governed by, and construed in accordance with, the laws of India, without regard to the principles of conflict of laws of any other jurisdiction. The courts of Gurugram, India which shall have exclusive jurisdiction, for remedies available at law to such Party.'
                        ),
                        _react2.default.createElement(
                            'li',
                            { className: 'privacy-order-item' },
                            _react2.default.createElement(
                                'span',
                                null,
                                'Relationship of Parties:'
                            ),
                            ' The Parties are independent contracting parties and will have no power or authority to assume or create any obligation or responsibility on behalf of each other. This Agreement will not be construed to create or imply any partnership, agency, or joint venture, or employer-employee relationship.'
                        ),
                        _react2.default.createElement(
                            'li',
                            { className: 'privacy-order-item' },
                            _react2.default.createElement(
                                'span',
                                null,
                                'Binding Effect; Severability'
                            ),
                            _react2.default.createElement(
                                'ol',
                                { className: 'sub-list' },
                                _react2.default.createElement(
                                    'li',
                                    null,
                                    'All terms and conditions of this Agreement shall be binding upon, inure to the benefit of, and be enforceable by the legal representatives, successors and assigns of the Parties.'
                                ),
                                _react2.default.createElement(
                                    'li',
                                    null,
                                    'Any term or provision of this Agreement that is invalid or unenforceable in any jurisdiction will, as to that jurisdiction, be ineffective to the extent of such invalidity or unenforceability without rendering invalid or unenforceable the remaining terms and provisions of this Agreement or affecting the validity or enforceability of any of the terms or provisions of this Agreement in any other jurisdiction.  If any provision of this Agreement is so broad as to be unenforceable, the provision will be interpreted to be only so broad as is enforceable.'
                                )
                            )
                        ),
                        _react2.default.createElement(
                            'li',
                            { className: 'privacy-order-item' },
                            _react2.default.createElement(
                                'span',
                                null,
                                'Entire Agreement:'
                            ),
                            _react2.default.createElement(
                                'p',
                                { className: 'privacy-desc' },
                                'This Agreement constitutes the entire agreement between the Parties relating to the subject matter of this Agreement and supersedes any previous written or oral understanding, negotiations, communications and agreement between the Parties in relation to the matters dealt with in this Agreement.'
                            )
                        )
                    ),
                    _react2.default.createElement(
                        'p',
                        { className: 'privacy-desc-heading mrt-20' },
                        'CODE OF CONDUCT'
                    ),
                    _react2.default.createElement(
                        'p',
                        { className: 'privacy-desc' },
                        'Health Service Provider:'
                    ),
                    _react2.default.createElement(
                        'ol',
                        { className: 'sub-list' },
                        _react2.default.createElement(
                            'li',
                            null,
                            'shall abide by the Indian Medical Council (Professional conduct, Etiquette and Ethics) Regulations, 2002 and other applicable laws to medical profession I India'
                        ),
                        _react2.default.createElement(
                            'li',
                            null,
                            'shall ensure that it has the requisite \u200Bqualification recognized by Medical Council of India and registered with Medical Council of India/State Medical Council (s) is allowed to practice as per the applicable laws in India'
                        ),
                        _react2.default.createElement(
                            'li',
                            null,
                            'shall be liable to protect patient/customers privacy and confidentiality including any medical information or data provided by the Company\u2019s customers.'
                        ),
                        _react2.default.createElement(
                            'li',
                            null,
                            'who participate in telemedicine/online consultation shall ensure and maintain an ethical responsibility to uphold fundamental fiduciary obligations by disclosing any financial or other interests it has in the telemedicine/online consultation application or service and shall immediately disclose it to the Company so that Company can appropriate steps to manage or eliminate conflicts of interests'
                        ),
                        _react2.default.createElement(
                            'li',
                            null,
                            'who provide clinical services and/or underwriting decision for health and other insurances, through telemedicine must uphold the standards of professionalism as are applicable in in-person interactions and follow appropriate ethical guidelines and practices as per medical laws applicable in India'
                        ),
                        _react2.default.createElement(
                            'li',
                            null,
                            'should be responsible in understanding the \u200Bcurrent medical condition, the past-history, the social history, severity of existing diseases, complications and current management line of prospective and current customers for health and other insurances.'
                        ),
                        _react2.default.createElement(
                            'li',
                            null,
                            'shall be prudent in carrying out a diagnostic evaluation or prescribing medication by:',
                            _react2.default.createElement(
                                'ul',
                                null,
                                _react2.default.createElement(
                                    'li',
                                    null,
                                    'Establishing the patient\u2019s identity'
                                ),
                                _react2.default.createElement(
                                    'li',
                                    null,
                                    'Confirming that telemedicine services are appropriate for that patient\u2019s individual situation and medical needs'
                                ),
                                _react2.default.createElement(
                                    'li',
                                    null,
                                    'Evaluating the indication, appropriateness and safety of any prescription in keeping with best'
                                ),
                                _react2.default.createElement(
                                    'li',
                                    null,
                                    'practice guidelines and any formulary limitations that apply to the electronic interaction'
                                ),
                                _react2.default.createElement(
                                    'li',
                                    null,
                                    'Documenting the clinical evaluation and prescription'
                                )
                            )
                        ),
                        _react2.default.createElement(
                            'li',
                            null,
                            'shall attend mandatory in-house training programs that may be conducted by the Company from time to time. This may require the Health Service Provider to undergo web-based and other training programs. Company shall have the right to regularly and monitor and the quality of work/service performed by the Health Service Provide.'
                        ),
                        _react2.default.createElement(
                            'li',
                            null,
                            'shall maintain all patient related records in an electronic manner in accordance with provisions laid down by the Medical Council of India and in addition, in the form and manner as instructed by the Company.'
                        ),
                        _react2.default.createElement(
                            'li',
                            null,
                            'shall keep itself up to date with the developments in medical profession and studies,new drugs, treatments and medications, including complementary medicine etc.'
                        ),
                        _react2.default.createElement(
                            'li',
                            null,
                            'shall at all times maintain a professional appearance and attitude while rendeing medical and health care services.'
                        ),
                        _react2.default.createElement(
                            'li',
                            null,
                            'shall ensure clear and prompt communication in its dealing with Company\u2019s customers.'
                        ),
                        _react2.default.createElement(
                            'li',
                            null,
                            'shall act in utmost good faith and exercise due care, diligence and personal and professional integrity in the performance of their duties and responsibilities as medical practitioner and shall in no event compromise with their independence of judgment'
                        ),
                        _react2.default.createElement(
                            'li',
                            null,
                            'shall not exploit for their own personal gain, opportunities that are discovered through use of corporate property information'
                        )
                    ),
                    _react2.default.createElement(
                        'p',
                        { className: 'privacy-desc-subheading' },
                        'Declaration:'
                    ),
                    _react2.default.createElement(
                        'p',
                        { className: 'privacy-desc' },
                        'This is to confirm that we have understood the contents of Company\u2019s Code of Conduct for Health Service Provider and the same has been explained and understood by us.  We agree and undertake that in performance of our obligations under this agreement with  Company we shall including but not limited to our officers, directors, employees, agents, consultants or representatives, etc., shall be required to adhere to the requirements of this acknowledgement.'
                    )
                )
            )
        );
    }
}

exports.default = Terms;

/***/ }),

/***/ "./dev/js/containers/commons/StaticPages.js":
/*!**************************************************!*\
  !*** ./dev/js/containers/commons/StaticPages.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(/*! react */ "react");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(/*! react-redux */ "react-redux");

var _index = __webpack_require__(/*! ../../actions/index.js */ "./dev/js/actions/index.js");

var _staticPages = __webpack_require__(/*! ../../components/commons/staticPages */ "./dev/js/components/commons/staticPages/index.js");

var _staticPages2 = _interopRequireDefault(_staticPages);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class StaticPages extends _react2.default.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {}

    render() {

        return _react2.default.createElement(_staticPages2.default, this.props);
    }
}

StaticPages.contextTypes = {
    router: () => null
};
const mapStateToProps = state => {

    let {
        citiesName,
        utm_tags
    } = state.USER;
    return {
        citiesName,
        utm_tags
    };
};

const mapDispatchToProps = dispatch => {
    return {
        submitCareerProfile: (postCareerData, cb) => dispatch((0, _index.submitCareerProfile)(postCareerData, cb)),
        submitContactMessage: (postContactData, cb) => dispatch((0, _index.submitContactMessage)(postContactData, cb)),
        signupDoctor: (signupDoctorData, cb) => dispatch((0, _index.signupDoctor)(signupDoctorData, cb)),
        getCities: filterText => dispatch((0, _index.getCities)(filterText))
    };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(StaticPages);

/***/ })

};;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9jb21tb25zL3N0YXRpY1BhZ2VzL1N0YXRpY1BhZ2VzLmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL2NvbW1vbnMvc3RhdGljUGFnZXMvYWJvdXRVcy5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9jb21tb25zL3N0YXRpY1BhZ2VzL2NhbmNlbFBvbGljeS5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9jb21tb25zL3N0YXRpY1BhZ2VzL2NhcmVlcnMuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvY29tbW9ucy9zdGF0aWNQYWdlcy9jb250YWN0VXMuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvY29tbW9ucy9zdGF0aWNQYWdlcy9kaXNjbGFpbWVyLmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL2NvbW1vbnMvc3RhdGljUGFnZXMvZG9jdG9yc2lnbnVwLmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL2NvbW1vbnMvc3RhdGljUGFnZXMvaG93aXRXb3Jrcy5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9jb21tb25zL3N0YXRpY1BhZ2VzL2luZGV4LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL2NvbW1vbnMvc3RhdGljUGFnZXMvbWVkaWEuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvY29tbW9ucy9zdGF0aWNQYWdlcy9wcml2YWN5LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL2NvbW1vbnMvc3RhdGljUGFnZXMvdGVybXMuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbnRhaW5lcnMvY29tbW9ucy9TdGF0aWNQYWdlcy5qcyJdLCJuYW1lcyI6WyJxdWVyeVN0cmluZyIsInJlcXVpcmUiLCJTdGF0aWNQYWdlc1ZpZXciLCJDb21wb25lbnQiLCJjb25zdHJ1Y3RvciIsInByb3BzIiwic3RhdGUiLCJjb21wb25lbnREaWRNb3VudCIsIndpbmRvdyIsInNjcm9sbFRvIiwicmVuZGVyIiwicGFyc2VkIiwicGFyc2UiLCJsb2NhdGlvbiIsInNlYXJjaCIsImZyb21BcHAiLCJmb3JCb29raW5nU2Nyb2xsIiwiQWJvdXRVcyIsIm5hdmlnYXRlVG8iLCJ3aGVyZSIsImhpc3RvcnkiLCJwdXNoIiwibWFpbkNsYXNzIiwiaGVhZGluZ0NsYXNzIiwidGl0bGUiLCJkZXNjcmlwdGlvbiIsIkFTU0VUU19CQVNFX1VSTCIsIkNhbmNlbFBvbGljeSIsInBhZGRpbmdUb3AiLCJsaXN0U3R5bGUiLCJwYWRkaW5nTGVmdCIsImNvbG9yIiwiY3Vyc29yIiwiZGlzcGxheSIsIkNhcmVlcnMiLCJjaGFuZ2VIYW5kbGVyIiwiZXZlbnQiLCJrZXkiLCJzZXRTdGF0ZSIsInRhcmdldCIsInZhbHVlIiwiZmlsZVBpY2tlciIsImUiLCJmaWxlcyIsInJlc3VtZSIsIm5hbWUiLCJtb2JpbGUiLCJlbWFpbCIsInByb2ZpbGVfdHlwZSIsIm9uU3VibWl0UHJvZmlsZSIsInByZXZlbnREZWZhdWx0IiwiZm9ybV9kYXRhIiwiRm9ybURhdGEiLCJhcHBlbmQiLCJzdWJtaXRDYXJlZXJQcm9maWxlIiwiZXJyb3IiLCJyZXMiLCJzaG93IiwicG9zIiwidGV4dCIsIkNvbnRhY3RVcyIsIm1lc3NhZ2UiLCJvblN1Ym1pdERhdGEiLCJzdWJtaXRDb250YWN0TWVzc2FnZSIsImZvbnRTaXplIiwiYmluZCIsIkRpc2NsYWltZXIiLCJtYXJnaW5Cb3R0b20iLCJEb2N0b3JzaWdudXAiLCJjaXR5RHJvcGRvd25WaXNpYmxlIiwiZ2V0Q2l0aWVzIiwic2V0Q2l0eSIsImNpdHlOYW1lIiwiY2l0eUlkIiwiY2l0eSIsImNpdHlfbmFtZSIsIm1lbWJlcl90eXBlIiwidXRtX3BhcmFtcyIsInV0bV90YWdzIiwic291cmNlIiwic2hvd1N1Y2Nlc3NCb3giLCJjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzIiwic2lnbnVwRG9jdG9yIiwid2lkdGgiLCJjaXRpZXNOYW1lIiwibWFwIiwiSG93aXRXb3JrcyIsImxpc3RTdHlsZVR5cGUiLCJtYXJnaW5Ub3AiLCJNZWRpYSIsInZlcnRpY2FsQWxpZ24iLCJib3JkZXIiLCJvdmVyZmxvdyIsIlByaXZhY3kiLCJ0ZXh0QWxpZ24iLCJUZXJtcyIsInNlbGVjdGVkIiwic2Nyb2xsUG9zaXRpb24iLCJzZXRUYWIiLCJ2YWwiLCJmb3JTY3JvbGwiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiZWxlbWVudFRvcCIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsInRvcCIsImVsZW1lbnRIZWlnaHQiLCJjbGllbnRIZWlnaHQiLCJwYXJzZUludCIsIlN0YXRpY1BhZ2VzIiwiY29udGV4dFR5cGVzIiwicm91dGVyIiwibWFwU3RhdGVUb1Byb3BzIiwiVVNFUiIsIm1hcERpc3BhdGNoVG9Qcm9wcyIsImRpc3BhdGNoIiwicG9zdENhcmVlckRhdGEiLCJjYiIsInBvc3RDb250YWN0RGF0YSIsInNpZ251cERvY3RvckRhdGEiLCJmaWx0ZXJUZXh0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUEsTUFBTUEsY0FBYyxtQkFBQUMsQ0FBUSxrQ0FBUixDQUFwQjs7QUFLQSxNQUFNQyxlQUFOLFNBQThCLGdCQUFNQyxTQUFwQyxDQUE4QztBQUMxQ0MsZ0JBQVlDLEtBQVosRUFBbUI7QUFDZixjQUFNQSxLQUFOO0FBQ0EsYUFBS0MsS0FBTCxHQUFhLEVBQWI7QUFFSDs7QUFFREMsd0JBQW9CO0FBQ2hCLFlBQUlDLE1BQUosRUFBWTtBQUNSQSxtQkFBT0MsUUFBUCxDQUFnQixDQUFoQixFQUFtQixD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a0JBREE7QUFFQU47QUFGQSxRQUdBeEUsTUFBTTJHLElBSFY7QUFJQSxXQUFPO0FBQ0g3QixrQkFERztBQUVITjtBQUZHLEtBQVA7QUFJSCxDQVZEOztBQVlBLE1BQU1vQyxxQkFBc0JDLFFBQUQsSUFBYztBQUNyQyxXQUFPO0FBQ0g3RCw2QkFBcUIsQ0FBQzhELGNBQUQsRUFBaUJDLEVBQWpCLEtBQXdCRixTQUFTLGdDQUFvQkMsY0FBcEIsRUFBb0NDLEVBQXBDLENBQVQsQ0FEMUM7QUFFSHRELDhCQUFzQixDQUFDdUQsZUFBRCxFQUFrQkQsRUFBbEIsS0FBeUJGLFNBQVMsaUNBQXFCRyxlQUFyQixFQUFzQ0QsRUFBdEMsQ0FBVCxDQUY1QztBQUdIbkMsc0JBQWMsQ0FBQ3FDLGdCQUFELEVBQW1CRixFQUFuQixLQUEwQkYsU0FBUyx5QkFBYUksZ0JBQWIsRUFBK0JGLEVBQS9CLENBQVQsQ0FIckM7QUFJSC9DLG1CQUFZa0QsVUFBRCxJQUFnQkwsU0FBUyxzQkFBVUssVUFBVixDQUFUO0FBSnhCLEtBQVA7QUFNSCxDQVBEOztrQkFVZSx5QkFBUVIsZUFBUixFQUF5QkUsa0JBQXpCLEVBQTZDTCxXQUE3QyxDIiwiZmlsZSI6IjEuc2VydmVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IEFib3V0VXMgZnJvbSAnLi9hYm91dFVzLmpzJ1xuaW1wb3J0IENvbnRhY3RVcyBmcm9tICcuL2NvbnRhY3RVcydcbmltcG9ydCBQcml2YWN5IGZyb20gJy4vcHJpdmFjeSdcbmltcG9ydCBIb3dpdFdvcmtzIGZyb20gJy4vaG93aXRXb3JrcydcbmltcG9ydCBEaXNjbGFpbWVyIGZyb20gJy4vZGlzY2xhaW1lcidcbmltcG9ydCBUZXJtcyBmcm9tICcuL3Rlcm1zJ1xuaW1wb3J0IENhcmVlcnMgZnJvbSAnLi9jYXJlZXJzJ1xuaW1wb3J0IE1lZGlhIGZyb20gJy4vbWVkaWEnXG5pbXBvcnQgRG9jdG9yc2lnbnVwIGZyb20gJy4vZG9jdG9yc2lnbnVwJ1xuaW1wb3J0IENhbmNlbFBvbGljeSBmcm9tICcuL2NhbmNlbFBvbGljeS5qcydcblxuaW1wb3J0IEZvb3RlciBmcm9tICcuLi8uLi9jb21tb25zL0hvbWUvZm9vdGVyJ1xuaW1wb3J0IFByb2ZpbGVIZWFkZXIgZnJvbSAnLi4vLi4vY29tbW9ucy9EZXNrdG9wUHJvZmlsZUhlYWRlcidcbmltcG9ydCBMb2FkZXIgZnJvbSAnLi4vLi4vY29tbW9ucy9Mb2FkZXInXG5pbXBvcnQgeyBSb3V0ZSB9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nXG5cbmNvbnN0IHF1ZXJ5U3RyaW5nID0gcmVxdWlyZSgncXVlcnktc3RyaW5nJyk7XG5cblxuXG5cbmNsYXNzIFN0YXRpY1BhZ2VzVmlldyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgaWYgKHdpbmRvdykge1xuICAgICAgICAgICAgd2luZG93LnNjcm9sbFRvKDAsIDApXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIC8vY29uc3QgcGFyc2VkID0gcXVlcnlTdHJpbmcucGFyc2Uod2luZG93LmxvY2F0aW9uLnNlYXJjaClcbiAgICAgICAgY29uc3QgcGFyc2VkID0gcXVlcnlTdHJpbmcucGFyc2UodGhpcy5wcm9wcy5sb2NhdGlvbi5zZWFyY2gpXG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicHJvZmlsZS1ib2R5LXdyYXBcIj5cbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHBhcnNlZC5mcm9tQXBwPycnOjxQcm9maWxlSGVhZGVyIC8+XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3ViLWhlYWRlciBkLW5vbmUgZC1sZy1ibG9ja1wiIC8+XG5cbiAgICAgICAgICAgICAgICB7LyogPGRpdiBjbGFzc05hbWU9XCJkLWxnLW5vbmVcIj5cbiAgICAgICAgICAgICAgICAgICAgPGhlYWRlciBjbGFzc05hbWU9XCJ3YWxsZXQtaGVhZGVyIHN0aWNreS1oZWFkZXIgY2hhdC1oZWFkZXJcIiBzdHlsZT17eyBoZWlnaHQ6IDUwIH19ID5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGFpbmVyLWZsdWlkIGhlYWRlci1jb250YWluZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvdyBoZWFkZXItcm93XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLTJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbWcgc3JjPXtBU1NFVFNfQkFTRV9VUkwgKyBcIi9pbWcvY3VzdG9tZXItaWNvbnMvbGVmdC1hcnJvdy5zdmdcIn0gY2xhc3NOYW1lPVwiYmFjay1pY29uLW9yYW5nZVwiIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnByb3BzLmhpc3RvcnkuZ28oLTEpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fSAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtOCBsb2dvLWNvbCB0ZXh0LWNlbnRlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGltZyBzcmM9XCIvYXNzZXRzL2ltZy9kb2MtcHJpbWUtbG9nby5wbmdcIiBzdHlsZT17eyB3aWR0aDogNjAgfX0gb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuaGlzdG9yeS5wdXNoKCcvJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19IC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvaGVhZGVyPlxuICAgICAgICAgICAgICAgIDwvZGl2PiAqL31cblxuICAgICAgICAgICAgICAgIDxSb3V0ZSBleGFjdCBwYXRoPXsnL2Fib3V0J30gcmVuZGVyPXsocHJvcHMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDxBYm91dFVzIHsuLi50aGlzLnByb3BzfSB7Li4ucHJvcHN9IGZyb21BcHA9e3BhcnNlZC5mcm9tQXBwP3BhcnNlZC5mcm9tQXBwOmZhbHNlfS8+XG4gICAgICAgICAgICAgICAgfX0gLz5cblxuICAgICAgICAgICAgICAgIDxSb3V0ZSBleGFjdCBwYXRoPXsnL2NvbnRhY3QnfSByZW5kZXI9eyhwcm9wcykgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gPENvbnRhY3RVcyB7Li4udGhpcy5wcm9wc30gey4uLnByb3BzfSBmcm9tQXBwPXtwYXJzZWQuZnJvbUFwcD9wYXJzZWQuZnJvbUFwcDpmYWxzZX0gLz5cbiAgICAgICAgICAgICAgICB9fSAvPlxuXG4gICAgICAgICAgICAgICAgPFJvdXRlIGV4YWN0IHBhdGg9eycvcHJpdmFjeSd9IHJlbmRlcj17KHByb3BzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiA8UHJpdmFjeSB7Li4udGhpcy5wcm9wc30gey4uLnByb3BzfSAvPlxuICAgICAgICAgICAgICAgIH19IC8+XG5cbiAgICAgICAgICAgICAgICA8Um91dGUgZXhhY3QgcGF0aD17Jy9ob3dpdHdvcmtzJ30gcmVuZGVyPXsocHJvcHMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDxIb3dpdFdvcmtzIHsuLi50aGlzLnByb3BzfSB7Li4ucHJvcHN9IC8+XG4gICAgICAgICAgICAgICAgfX0gLz5cblxuICAgICAgICAgICAgICAgIDxSb3V0ZSBleGFjdCBwYXRoPXsnL2Rpc2NsYWltZXInfSByZW5kZXI9eyhwcm9wcykgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gPERpc2NsYWltZXIgey4uLnRoaXMucHJvcHN9IHsuLi5wcm9wc30gZnJvbUFwcD17cGFyc2VkLmZyb21BcHA/cGFyc2VkLmZyb21BcHA6ZmFsc2V9Lz5cbiAgICAgICAgICAgICAgICB9fSAvPlxuXG4gICAgICAgICAgICAgICAgPFJvdXRlIGV4YWN0IHBhdGg9eycvdGVybXMnfSByZW5kZXI9eyhwcm9wcykgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gPFRlcm1zIHsuLi50aGlzLnByb3BzfSB7Li4ucHJvcHN9IGZyb21BcHA9e3BhcnNlZC5mcm9tQXBwP3BhcnNlZC5mcm9tQXBwOmZhbHNlfSBmb3JTY3JvbGw9e3BhcnNlZC5mb3JCb29raW5nU2Nyb2xsP3BhcnNlZC5mb3JCb29raW5nU2Nyb2xsOmZhbHNlfS8+XG4gICAgICAgICAgICAgICAgfX0gLz5cblxuICAgICAgICAgICAgICAgIDxSb3V0ZSBleGFjdCBwYXRoPXsnL2NhcmVlcnMnfSByZW5kZXI9eyhwcm9wcykgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gPENhcmVlcnMgey4uLnRoaXMucHJvcHN9IHsuLi5wcm9wc30gLz5cbiAgICAgICAgICAgICAgICB9fSAvPlxuXG4gICAgICAgICAgICAgICAgPFJvdXRlIGV4YWN0IHBhdGg9eycvbWVkaWEnfSByZW5kZXI9eyhwcm9wcykgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gPE1lZGlhIHsuLi50aGlzLnByb3BzfSB7Li4ucHJvcHN9IC8+XG4gICAgICAgICAgICAgICAgfX0gLz5cblxuICAgICAgICAgICAgICAgIDxSb3V0ZSBleGFjdCBwYXRoPXsnL2RvY3RvcnNpZ251cCd9IHJlbmRlcj17KHByb3BzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiA8RG9jdG9yc2lnbnVwIHsuLi50aGlzLnByb3BzfSB7Li4ucHJvcHN9IC8+XG4gICAgICAgICAgICAgICAgfX0gLz5cblxuICAgICAgICAgICAgICAgIDxSb3V0ZSBleGFjdCBwYXRoPXsnL2NhbmNlbHBvbGljeSd9IHJlbmRlcj17KHByb3BzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiA8Q2FuY2VsUG9saWN5IHsuLi50aGlzLnByb3BzfSB7Li4ucHJvcHN9IGZyb21BcHA9e3BhcnNlZC5mcm9tQXBwP3BhcnNlZC5mcm9tQXBwOmZhbHNlfS8+XG4gICAgICAgICAgICAgICAgfX0gLz5cblxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgcGFyc2VkLmZyb21BcHA/Jyc6PEZvb3RlciAvPlxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IFN0YXRpY1BhZ2VzVmlld1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBIZWxtZXRUYWdzIGZyb20gJy4uL0hlbG1ldFRhZ3MnXG5cbmNsYXNzIEFib3V0VXMgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgICAgICB0aGlzLnN0YXRlID0ge1xuXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuYXZpZ2F0ZVRvKHdoZXJlKSB7XG4gICAgICAgIHRoaXMucHJvcHMuaGlzdG9yeS5wdXNoKHdoZXJlKVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgbGV0IG1haW5DbGFzc1xuICAgICAgICBsZXQgaGVhZGluZ0NsYXNzXG4gICAgICAgIGlmKHRoaXMucHJvcHMuZnJvbUFwcCl7XG4gICAgICAgICAgICBtYWluQ2xhc3MgPSBcImNvbnRhaW5lciBhYm91dC1jb250YWluZXIgYXBwVXJsUGFkZGluZ1wiXG4gICAgICAgICAgICBoZWFkaW5nQ2xhc3MgPSBcImNvbC0xMiB0ZXh0LWNlbnRlciBkLW5vbmUgZC1tZC1ibG9ja1wiXG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgbWFpbkNsYXNzID0gJ2NvbnRhaW5lciBhYm91dC1jb250YWluZXInXG4gICAgICAgICAgICBoZWFkaW5nQ2xhc3MgPSBcImNvbC0xMiB0ZXh0LWNlbnRlclwiXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e21haW5DbGFzc30+XG4gICAgICAgICAgICAgICAgPEhlbG1ldFRhZ3MgdGFnc0RhdGE9e3tcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICgnQWJvdXQgVXMgfCBkb2NwcmltZScpLFxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogKCdkb2NwcmltZTogZG9jcHJpbWUgaXMgb25lIHN0b3AgaGVhbHRoIGNhcmUgc29sdXRpb24gZm9yIHBhdGllbnRzIGFuZCBkb2N0b3JzLiBQYXRpZW50cyBjYW4gYm9vayBkb2N0b3JzIG9ubGluZSBhbmQgZG9jdG9ycyBjYW4gbWFuYWdlIHBhdGllbnRzIG9ubGluZS4nKVxuICAgICAgICAgICAgICAgIH19IC8+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2hlYWRpbmdDbGFzc30+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJmdy01MDAgYWJvdXQtaGVhZGluZ1wiPkFib3V0IFVzPC9wPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtMTJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnByb3BzLmZyb21BcHA/IDxzcGFuPlRoaXMgTW9iaWxlIEFwcCBpcyBtYW5hZ2VkIGFuZCBvcGVyYXRlZCBieSBEb2NwcmltZSBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkLiA8L3NwYW4+OicnXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJmdy01MDAgYWJvdXQtY29udGVudFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgRG9jcHJpbWUsIGEgUG9saWN5QmF6YWFyIGdyb3VwIGNvbXBhbnksIGlzIGEgeW91bmcgb25saW5lIG1lZGljYWwgc2VydmljZXMgcHJvdmlkZXIuIFN0YXJ0ZWQgd2l0aCBhIHRlYW0gb2YgeW91bmcsIGV4cGVyaWVuY2VkIGFuZCB2aWJyYW50IHByb2Zlc3Npb25hbHMsIHRoZSBjb21wYW55IGhhcyBhIGh1bWFuaXRhcmlhbiBhcHByb2FjaCB0b3dhcmRzIHByb3ZpZGluZyBlYXN5IGFjY2VzcyB0byBoZWFsdGggY2FyZSBzZXJ2aWNlcy48L3A+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC0xMiBjb2wtbWQtNCBmZWF0dXJlLWNvbFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmZWF0dXJlLWltZy1kaXYgdGV4dC1jZW50ZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW1nIHNyYz17QVNTRVRTX0JBU0VfVVJMICsgXCIvaW1nL2N1c3RvbWVyLWljb25zL2Fib3V0LTEucG5nXCJ9IGNsYXNzTmFtZT1cImZlYXR1cmUtaW1nXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmZWF0dXJlLWRpdiB0ZXh0LWNlbnRlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cImZ3LTUwMCBmZWF0dXJlLWhlYWRpbmdcIj5BZmZvcmRhYmxlPC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cImZlYXR1cmUtY29udGVudFwiPldlIG9mZmVyIG91ciBtdWx0aXBsZSBzZXJ2aWNlcyBhdCBhbiBhZmZvcmRhYmxlIHByaWNlLiBXZSBhaW0gYXQgbWFraW5nIGhlYWx0aCBjYXJlIHNlcnZpY2VzIGVhc2lseSBhY2Nlc3NpYmxlIGFuZCBhZmZvcmRhYmxlIHRvIGVuc3VyZSB0aGF0IHBhdGllbnRzIGRvIG5vdCBoZXNpdGF0ZSB3aGlsZSBjb25zdWx0aW5nIGRvY3RvcnMgb25saW5lLjwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtMTIgY29sLW1kLTQgZmVhdHVyZS1jb2xcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmVhdHVyZS1pbWctZGl2IHRleHQtY2VudGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGltZyBzcmM9e0FTU0VUU19CQVNFX1VSTCArIFwiL2ltZy9jdXN0b21lci1pY29ucy9hYm91dC0yLnBuZ1wifSBjbGFzc05hbWU9XCJmZWF0dXJlLWltZ1wiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmVhdHVyZS1kaXYgdGV4dC1jZW50ZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJmdy01MDAgZmVhdHVyZS1oZWFkaW5nXCI+U2FmZTwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJmZWF0dXJlLWNvbnRlbnRcIj5XZSB3b3JrIHJvdW5kIHRoZSBjbG9jayB0byBlbnN1cmUgaGlnaGVzdCBsZXZlbHMgb2YgZGF0YSBzZWN1cml0eS4gV2l0aCBvdXIgcGxhdGZvcm0sIHRoZSByZWNvcmRzIG9mIGJvdGgsIHRoZSBwYXRpZW50cyBhbmQgdGhlIGRvY3RvcnMgYXJlIHNhZmUuIE91ciBzZXBhcmF0ZSBpbmZyYXN0cnVjdHVyZSBlbnN1cmVzIHRoYXQgdGhlIHByb3ZpZGVy4oCZcyBkYXRhIGFuZCB0aGUgY29uc3VtZXLigJlzIGRhdGEgYXJlIGlzb2xhdGVkIGZyb20gZWFjaCBvdGhlci48L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLTEyIGNvbC1tZC00IGZlYXR1cmUtY29sXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZlYXR1cmUtaW1nLWRpdiB0ZXh0LWNlbnRlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbWcgc3JjPXtBU1NFVFNfQkFTRV9VUkwgKyBcIi9pbWcvY3VzdG9tZXItaWNvbnMvYWJvdXQtMy5wbmdcIn0gY2xhc3NOYW1lPVwiZmVhdHVyZS1pbWdcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZlYXR1cmUtZGl2IHRleHQtY2VudGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwiZnctNTAwIGZlYXR1cmUtaGVhZGluZ1wiPlN0cmFpZ2h0IEZvcndhcmQ8L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwiZmVhdHVyZS1jb250ZW50XCI+VGhlIGRvY3ByaW1lIHBsYXRmb3JtIGlzIGVhc3kgdG8gbmF2aWdhdGUgYW5kIGhhcyBhIHN0cmFpZ2h0Zm9yd2FyZCBhcHByb2FjaC4gVGhlIG1pbmltYWxpc3QgZGVzaWduIG9mIHRoZSB3ZWJzaXRlIGVuc3VyZXMgdGhhdCB0aGUgY29uc3VtZXJzIGNhbiBmaW5kIHRoZSBpbmZvcm1hdGlvbiBmb3IgdGhlaXIgcmVmZXJlbmNlIHN3aWZ0bHkgYW5kIGVmZm9ydGxlc3NseS48L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLTEyIGFib3V0LWNvbnRlbnQtZGl2XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJmdy01MDAgYWJvdXQtY29udGVudFwiPmRvY3ByaW1lIGlzIGRlZGljYXRlZCB0b3dhcmRzIHRoZSB3ZWxmYXJlIG9mIHRoZSBwZW9wbGUgYW5kIHRvIG1ha2UgYSBjbG9zZWx5IGtuaXQgY29tbXVuaXR5IG9mIGRvY3RvcnMgYW5kIHBhdGllbnRzLjwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cImZ3LTUwMCBhYm91dC1jb250ZW50XCI+VG9kYXksIHRoZSBhdmVyYWdlIGxpZmVzdHlsZSBvZiBhIGh1bWFuIGJlaW5nIGlzIGZhc3QtcGFjZWQuIEluIHRoaXMgZmFzdC1wYWNlZCBsaWZlc3R5bGUsIHBlb3BsZSBpZ25vcmUgdGhlaXIgaGVhbHRoIHRoYXQgbGVhZHMgdG8gc2V2ZXJhbCBoZWFsdGggY29tcGxpY2F0aW9ucy4gQXQgZG9jcHJpbWUsIHdlIGFpbSB0byBiZSB0aGUgZ3VpZGUgYW5kIHRoZSBoZWxwaW5nIGhhbmQgdG8gZW5zdXJlIGJldHRlciBoZWFsdGggZm9yIGV2ZXJ5b25lIGFuZCBoZWxwIHRoZW0gYXQgZWFjaCBzdGVwIHRvd2FyZHMgaGVhbHRoIGltcHJvdmVtZW50LjwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cImZ3LTUwMCBhYm91dC1jb250ZW50XCI+ZG9jcHJpbWUgYWltcyBhdCBjb25uZWN0aW5nIHBlb3BsZSBieSBwcm92aWRpbmcgdGhlbSB3aXRoIGV2ZXJ5IHBpZWNlIG9mIGluZm9ybWF0aW9uIHRoZXkgbmVlZCB0byBzZWN1cmUgdGhlbXNlbHZlcyBhbmQgdGhlaXIgZmFtaWx54oCZcyB3ZWxsLWJlaW5nLiBBc3Nlc3NpbmcgaGVhbHRoIGlzc3VlcywgY29uc3VsdGluZyBleHBlcmllbmNlZCBtZWRpY2FsIHByYWN0aXRpb25lcnMgYW5kIHN0b3JpbmcgaGVhbHRoIHJlY29yZHMgYXJlIGZldyBzZXJ2aWNlcyBvZmZlcmVkIGJ5IHRoZSBjb21wYW55LjwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cImZ3LTUwMCBhYm91dC1jb250ZW50XCI+Tm90IG9ubHkgYXJlIHdlIGRlZGljYXRlZCB0byBwcm92aWRpbmcgYSBiZXR0ZXIgaGVhbHRoIHRvIHBlb3BsZSwgd2UgYWxzbyBlbnN1cmUgdGhhdCB0aGV5IGdldCBlYXN5IGFjY2VzcyB0byBjb3VudHJ54oCZcyBiZXN0IGRvY3RvcnMgaW4gdGhlIG1vc3QgY29udmVuaWVudCBhbmQgYWZmb3JkYWJsZSB3YXlzLiBPbiBvdXIgd2F5IHRvIGNyZWF0aW5nIGFuIGV4cGVyaWVuY2UgdHJ1bHkgcHJpbWUgZm9yIHVzZXJzIGFuZCBoZWFsdGhjYXJlIGV4cGVydHMsIHdlIG92ZXJjb21lIG11bHRpdHVkaW5vdXMgY2hhbGxlbmdlcyBhbG1vc3QgZXZlcnkgZGF5LjwvcD5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLTEyIGNvbC1tZC00IGFib3V0LXN0ZXBzLWRpdlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYm91dC1zdGVwc1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3RlcC1pY29uLWRpdlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW1nIHNyYz17QVNTRVRTX0JBU0VfVVJMICsgXCIvaW1nL2N1c3RvbWVyLWljb25zL3N0ZXAtY2FsZW5kYXIuc3ZnXCJ9IC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdGVwLWhlYWRpbmctZGl2IHRleHQtY2VudGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cImZ3LTUwMCBzdGVwLWhlYWRpbmdcIj5Cb29rIEFwcG9pbnRtZW50czwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN0ZXAtY29udGVudC1kaXZcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdGVwLWNvbnRlbnRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3RlcC1jaXJjbGVcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwic3RlcC1kYXRhIGZ3LTUwMFwiPjEwLDAwMCsgVmVyaWZpZWQgRG9jdG9yczwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3RlcC1jb250ZW50XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN0ZXAtY2lyY2xlXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInN0ZXAtZGF0YSBmdy01MDBcIj5Cb29rIEFwcG9pbnRtZW50cyAyNCo3PC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdGVwLWNvbnRlbnRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3RlcC1jaXJjbGVcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwic3RlcC1kYXRhIGZ3LTUwMFwiPkZpbmQgRG9jdG9ycyBFYXNpbHk8L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN0ZXAtY29udGVudFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdGVwLWNpcmNsZVwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJzdGVwLWRhdGEgZnctNTAwXCI+RWZmaWNpZW50IFBhdGllbnQgQWRtaW5pc3RyYXRpb248L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN0ZXAtY29udGVudFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdGVwLWNpcmNsZVwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJzdGVwLWRhdGEgZnctNTAwXCI+U3dpZnQgQXBwb2ludG1lbnQgQ29uZmlybWF0aW9uPC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtMTIgY29sLW1kLTQgYWJvdXQtc3RlcHMtZGl2XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFib3V0LXN0ZXBzXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdGVwLWljb24tZGl2XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbWcgc3JjPXtBU1NFVFNfQkFTRV9VUkwgKyBcIi9pbWcvY3VzdG9tZXItaWNvbnMvc3RlcC1jaGF0LnN2Z1wifSAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3RlcC1oZWFkaW5nLWRpdiB0ZXh0LWNlbnRlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJmdy01MDAgc3RlcC1oZWFkaW5nXCI+T25saW5lIENoYXQgQ29uc3VsdGF0aW9uPC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3RlcC1jb250ZW50LWRpdlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN0ZXAtY29udGVudFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdGVwLWNpcmNsZVwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJzdGVwLWRhdGEgZnctNTAwXCI+R2V0IGRvY3ByaW1lIGFwcCBmb3Igc2VhbWxlc3Mgb25saW5lIGNoYXQgY29uc3VsdGF0aW9uPC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdGVwLWNvbnRlbnRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3RlcC1jaXJjbGVcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwic3RlcC1kYXRhIGZ3LTUwMFwiPkxvdyBSZXNwb25zZSBUaW1lPC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdGVwLWNvbnRlbnRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3RlcC1jaXJjbGVcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwic3RlcC1kYXRhIGZ3LTUwMFwiPlZlcmlmaWVkIERvY3RvcnMgQXZhaWxhYmxlIGF0IHlvdXIgRGlzcG9zYWw8L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN0ZXAtY29udGVudFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdGVwLWNpcmNsZVwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJzdGVwLWRhdGEgZnctNTAwXCI+MTAwJSBDb25maWRlbnRpYWwgYW5kIFByaXZhdGU8L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN0ZXAtY29udGVudFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdGVwLWNpcmNsZVwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJzdGVwLWRhdGEgZnctNTAwXCI+T24tRGVtYW5kIENvbnN1bHRhdGlvbiBBdmFpbGFibGUgQW55dGltZSBhbmQgQW55d2hlcmU8L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC0xMiBjb2wtbWQtNCBhYm91dC1zdGVwcy1kaXZcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJvdXQtc3RlcHNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN0ZXAtaWNvbi1kaXZcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGltZyBzcmM9e0FTU0VUU19CQVNFX1VSTCArIFwiL2ltZy9jdXN0b21lci1pY29ucy9zdGVwLXBhcnRuZXIuc3ZnXCJ9IC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdGVwLWhlYWRpbmctZGl2IHRleHQtY2VudGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cImZ3LTUwMCBzdGVwLWhlYWRpbmdcIj5CZWNvbWUgYSBQYXJ0bmVyIHdpdGggZG9jcHJpbWU8L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdGVwLWNvbnRlbnQtZGl2XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3RlcC1jb250ZW50XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN0ZXAtY2lyY2xlXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInN0ZXAtZGF0YSBmdy01MDBcIj5SZWFjaCBOZXcgUGF0aWVudHM8L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN0ZXAtY29udGVudFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdGVwLWNpcmNsZVwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJzdGVwLWRhdGEgZnctNTAwXCI+TWF4aW1pemUgeW91ciBFYXJuaW5nczwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3RlcC1jb250ZW50XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN0ZXAtY2lyY2xlXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInN0ZXAtZGF0YSBmdy01MDBcIj5LZWVwIFRyYWNrIG9mIFBhdGllbnRzIGFuZCB0aGVpciBGZWVkYmFjazwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3RlcC1jb250ZW50XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN0ZXAtY2lyY2xlXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInN0ZXAtZGF0YSBmdy01MDBcIj5FZGl0IHlvdXIgUHJvZmlsZSBFZmZvcnRsZXNzbHk8L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN0ZXAtY29udGVudFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdGVwLWNpcmNsZVwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJzdGVwLWRhdGEgZnctNTAwXCI+Q2hhdCBXaXRoIFBhdGllbnRzIHdpdGhvdXQgR2l2aW5nIHlvdXIgUGVyc29uYWwgQ29udGFjdCBEZXRhaWxzPC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtMTIgYWJvdXQtY29udGVudC1kaXZcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cImZ3LTUwMCBhYm91dC1jb250ZW50XCI+ZG9jcHJpbWUgZW5zdXJlcyB0aGF0IHlvdSBnZXQgdGhlIHJpZ2h0IHNvbHV0aW9uIGFuZCB0cmVhdG1lbnQsIGFuZCB0aGF0IGlzIHdoeSB3ZSBoYXZlIGhpcmVkIGNvdW50cnnigJlzIGJlc3QgYW5kIG1vc3QgZXhwZXJpZW5jZWQgZG9jdG9ycyB3aG8gYXJlIGtub3dsZWRnZWFibGUsIHNraWxsZWQgYW5kIHRoZSBiZXN0IGluIHRoZWlyIGFyZWFzIG9mIGV4cGVydGlzZS4gVGhleSBhcmUgYXZhaWxhYmxlIHRvIHNvbHZlIHlvdXIgaGVhbHRoIHJlbGF0ZWQgcXVlcmllcyBhbmQgcHJvdmlkZSBvbi1kZW1hbmQgaGVhbHRoY2FyZSBzb2x1dGlvbnMsIDI0WDdYMzY1LjwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cImZ3LTUwMCBhYm91dC1jb250ZW50XCI+QXQgZG9jcHJpbWUsIHdlIHVuZGVyc3RhbmQgdGhlIHZhbHVlIG9mIHlvdXIgdGltZSBhbmQgdGhhdOKAmXMgd2h5IHdlIHdhbnQgdG8gb2ZmZXIgeW91IHRoZSBiZXN0IGhlYWx0aGNhcmUgcmlnaHQgZnJvbSB0aGUgY29tZm9ydCBvZiB5b3VyIGhvbWUuIFdlIHByb3ZpZGUgZG9jdG9ycywgcGh5c2lvdGhlcmFwaXN0cyBhbmQgbnVyc2VzIGZvciBob21lIHZpc2l0cyB0byBlbnN1cmUgdGhhdCB5b3UgZG9u4oCZdCBuZWVkIHRvIHN0ZXAgb3V0IHdoZW4gdGhlIG5lZWQgYXJpc2VzLjwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cImZ3LTUwMCBhYm91dC1jb250ZW50XCI+V2UgYWltIHRvIHRhcCB0aGUgbGF0ZXN0IHRlY2hub2xvZ3kgdG8gZmluZCBzb2x1dGlvbnMgdG8gdmFyaW91cyBpc3N1ZXMgaW4gb3JkZXIgdG8gZGlzcnVwdCB0aGUgZ2xvYmFsIGhlYWx0aGNhcmUgZGVsaXZlcnkgc3lzdGVtLiBPdXIgaW5ub3ZhdGl2ZSBoZWFsdGhjYXJlIHNvbHV0aW9ucyBhcmUgYSBzdGVwIHRvd2FyZHMgYnJpZGdpbmcgdGhlIGdhcCBiZXR3ZWVuIGhlYWx0aGNhcmUgZXhwZXJ0cyBhbmQgdGhlIHBhdGllbnRzLjwvcD5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLTEyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9eygpID0+IHsgdGhpcy5wcm9wcy5mcm9tQXBwP3RoaXMubmF2aWdhdGVUbyhcIi9jb250YWN0P2Zyb21BcHA9dHJ1ZVwiKTp0aGlzLm5hdmlnYXRlVG8oXCIvY29udGFjdFwiKSB9fSBjbGFzc05hbWU9XCJjb250YWN0LWJ0blwiPkNvbnRhY3QgVXM8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgQWJvdXRVc1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBIZWxtZXRUYWdzIGZyb20gJy4uL0hlbG1ldFRhZ3MnXG5cbmNsYXNzIENhbmNlbFBvbGljeSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG5cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgbGV0IG1haW5DbGFzc1xuICAgICAgICBsZXQgaGVhZGluZ0NsYXNzXG4gICAgICAgIGlmKHRoaXMucHJvcHMuZnJvbUFwcCl7XG4gICAgICAgICAgICBtYWluQ2xhc3MgPSBcImNvbnRhaW5lciBhYm91dC1jb250YWluZXIgYXBwVXJsUGFkZGluZ1wiXG4gICAgICAgICAgICBoZWFkaW5nQ2xhc3MgPSBcImNvbC0xMiB0ZXh0LWNlbnRlciBkLW5vbmUgZC1tZC1ibG9ja1wiXG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgbWFpbkNsYXNzID0gJ2NvbnRhaW5lciBhYm91dC1jb250YWluZXInXG4gICAgICAgICAgICBoZWFkaW5nQ2xhc3MgPSAnY29sLTEyIHRleHQtY2VudGVyJ1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17bWFpbkNsYXNzfT5cbiAgICAgICAgICAgICAgICA8SGVsbWV0VGFncyB0YWdzRGF0YT17e1xuICAgICAgICAgICAgICAgICAgICB0aXRsZTogKCdDYW5jZWwgUG9saWN5IHwgZG9jcHJpbWUnKSxcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246ICgnZG9jcHJpbWU6IGRvY3ByaW1lIGlzIG9uZSBzdG9wIGhlYWx0aCBjYXJlIHNvbHV0aW9uIGZvciBwYXRpZW50cyBhbmQgZG9jdG9ycy4gUGF0aWVudHMgY2FuIGJvb2sgZG9jdG9ycyBvbmxpbmUgYW5kIGRvY3RvcnMgY2FuIG1hbmFnZSBwYXRpZW50cyBvbmxpbmUuJylcbiAgICAgICAgICAgICAgICB9fSAvPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtoZWFkaW5nQ2xhc3N9PlxuICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwiZnctNTAwIGFib3V0LWhlYWRpbmdcIj5DYW5jZWwgUG9saWN5PC9wPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtMTJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2FuY2VsLXBvbGljeS10ZXh0XCIgc3R5bGU9e3twYWRkaW5nVG9wOiAwfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHVsIHN0eWxlPXt7bGlzdFN0eWxlOiAnZGlzYycsIHBhZGRpbmdMZWZ0OiAxMH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGkgY2xhc3NOYW1lPVwiZnctNTAwIG1yYi0xMFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRm9yIGFueSBvbmxpbmUgcGFpZCBhcHBvaW50bWVudHMsIHlvdSBjYW4gY2FuY2VsIHlvdXIgc2NoZWR1bGVkIG9yIHJlLWJvb2tlZCBhcHBvaW50bWVudCBhbmQgaW5pdGlhdGUgaW1tZWRpYXRlIHJlZnVuZCBhdCBhbnkgdGltZS4gQW4gaW1tZWRpYXRlIHJlZnVuZCBzaGFsbCBiZSBzdWJqZWN0IHRvIHRlcm1zIGFuZCBjb25kaXRpb25zIGFzIGRlc2NyaWJlZCB1bmRlciB0aGlzIHNlY3Rpb24gbWVudGlvbmVkIGJlbG93LlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGkgY2xhc3NOYW1lPVwiZnctNTAwIG1yYi0xMFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSW4gdGhlIGV2ZW50LCB0aGUgc2VydmljZXMgYXJlIG5vdCBhdmFpbGVkIGF0IHRoZSBhcHBvaW50ZWQgZGF0ZSBhbmQgdGltZSBhbmQgb3VyIHN5c3RlbXMgZG8gbm90IHZhbGlkYXRlIHRoZSBVUk4gZ2VuZXJhdGVkIG9uIHlvdXIgcmVnaXN0ZXJlZCBtb2JpbGUgbnVtYmVyLCB3ZSB3aWxsIGF1dG9tYXRpY2FsbHkgY2FuY2VsIHlvdXIgYXBwb2ludG1lbnQgYXQgMTI6MDAgbWlkbmlnaHQgb2YgbmV4dCBkYXRlIG9mIHlvdXIgYXBwb2ludG1lbnQgZGF0ZS5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpIGNsYXNzTmFtZT1cImZ3LTUwMCBtcmItMTBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE9jY2FzaW9uYWxseSwgYXBwb2ludG1lbnRzIG1heSBiZSBjYW5jZWxsZWQgb3IgcG9zdHBvbmVkIGJ5IHRoZSBUaGlyZCBQYXJ0eSBTZXJ2aWNlIFByb3ZpZGVyLiBTaG91bGQgdGhpcyBvY2N1ciwgd2Ugd2lsbCBhdHRlbXB0IHRvIGNvbnRhY3Qgb3IgaW5mb3JtIHlvdSBhbmQgeW91IG1heSByZS1zY2hlZHVsZSB5b3VyIGFwcG9pbnRtZW50IGFzIHBlciB5b3VyIGNvbnZlbmllbmNlIG9yIHZpc2l0IHd3dy5kb2NwcmltZS5jb20gZm9yIGZyZXNoL3JlLWJvb2tpbmcgb24gdGhlIFdlYnNpdGUuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaSBjbGFzc05hbWU9XCJmdy01MDAgbXJiLTEwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBDYW5jZWxsYXRpb24gdGhyb3VnaCBtYWlsIG9yIGNhbGwgY2VudGVyIGlzIGFsbG93ZWQgZm9yIGFsbCB0aGUgYm9va2luZ3MgdW50aWwgdGhlIHRpbWUgb2YgYXBwb2ludG1lbnQgb3IgMTI6MDAgbWlkbmlnaHQgb2YgbmV4dCBkYXRlIG9mIHlvdXIgYXBwb2ludG1lbnQgZGF0ZS4gSW4gc3VjaCBjYXNlcywgd2Ugd2lsbCBpbml0aWF0ZSBhbiBpbW1lZGlhdGUgcmVmdW5kIG9mIHlvdXIgbW9uZXkgYXMgcGVyIHRoZSBwcm9jZXNzIGRlZmluZWQgdW5kZXIgUmVmdW5kLCBSZXNjaGVkdWxpbmcgYW5kIENhbmNlbGxhdGlvbiBzZWN0aW9uIHVuZGVyIHRoZSBFbmQgVXNlciBBZ3JlZW1lbnQuIDx1IHN0eWxlPXt7Y29sb3I6ICcjZjc4NjMxJyxjdXJzb3I6J3BvaW50ZXInLGRpc3BsYXk6J2lubGluZS1ibG9jayd9fSBvbkNsaWNrPXsoKSA9PnRoaXMucHJvcHMuaGlzdG9yeS5wdXNoKHRoaXMucHJvcHMuZnJvbUFwcD8nL3Rlcm1zP2ZvckJvb2tpbmdTY3JvbGw9dHJ1ZSZmcm9tQXBwPXRydWUnOicvdGVybXM/Zm9yQm9va2luZ1Njcm9sbD10cnVlJyl9PmNsaWNrIGhlcmU8L3U+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBDYW5jZWxQb2xpY3lcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgU25hY2tCYXIgZnJvbSAnbm9kZS1zbmFja2JhcidcbmltcG9ydCBIZWxtZXRUYWdzIGZyb20gJy4uL0hlbG1ldFRhZ3MnXG5cbmNsYXNzIENhcmVlcnMgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuXHRjb25zdHJ1Y3Rvcihwcm9wcykge1xuXHRcdHN1cGVyKHByb3BzKVxuXHRcdHRoaXMuc3RhdGUgPSB7XG5cdFx0XHRyZXN1bWU6IG51bGwsXG5cdFx0XHRuYW1lOiBcIlwiLFxuXHRcdFx0bW9iaWxlOiBcIlwiLFxuXHRcdFx0ZW1haWw6IFwiXCIsXG5cdFx0XHRwcm9maWxlX3R5cGU6IFwiXCJcblx0XHR9XG5cdH1cblxuXHRjaGFuZ2VIYW5kbGVyID0gKGV2ZW50LCBrZXkpID0+IHtcblx0XHR0aGlzLnNldFN0YXRlKHtcblx0XHRcdFtrZXldOiBldmVudC50YXJnZXQudmFsdWVcblx0XHR9KTtcblx0fVxuXG5cdGZpbGVQaWNrZXIgPSAoZSkgPT4ge1xuXHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0J3Jlc3VtZSc6IGUudGFyZ2V0LmZpbGVzWzBdXG5cdFx0fSk7XG5cdH1cblxuXHRvblN1Ym1pdFByb2ZpbGUoZSkge1xuXHRcdGUucHJldmVudERlZmF1bHQoKVxuXHRcdGxldCBmb3JtX2RhdGEgPSBuZXcgRm9ybURhdGEoKVxuXHRcdGZvcm1fZGF0YS5hcHBlbmQoXCJyZXN1bWVcIiwgdGhpcy5zdGF0ZS5yZXN1bWUsIFwicmVzdW1lLnBkZlwiKVxuXHRcdGZvcm1fZGF0YS5hcHBlbmQoJ25hbWUnLCB0aGlzLnN0YXRlLm5hbWUpXG5cdFx0Zm9ybV9kYXRhLmFwcGVuZCgnbW9iaWxlJywgdGhpcy5zdGF0ZS5tb2JpbGUpXG5cdFx0Zm9ybV9kYXRhLmFwcGVuZCgnZW1haWwnLCB0aGlzLnN0YXRlLmVtYWlsKVxuXHRcdGZvcm1fZGF0YS5hcHBlbmQoJ3Byb2ZpbGVfdHlwZScsIHRoaXMuc3RhdGUucHJvZmlsZV90eXBlKVxuXHRcdHRoaXMucHJvcHMuc3VibWl0Q2FyZWVyUHJvZmlsZShmb3JtX2RhdGEsIChlcnJvciwgcmVzKSA9PiB7XG5cdFx0XHR0aGlzLnNldFN0YXRlKHtcblx0XHRcdFx0cmVzdW1lOiBudWxsLFxuXHRcdFx0XHRuYW1lOiBcIlwiLFxuXHRcdFx0XHRtb2JpbGU6IFwiXCIsXG5cdFx0XHRcdGVtYWlsOiBcIlwiLFxuXHRcdFx0XHRwcm9maWxlX3R5cGU6IFwiXCJcblx0XHRcdH0pO1xuXHRcdFx0U25hY2tCYXIuc2hvdyh7IHBvczogJ2JvdHRvbS1jZW50ZXInLCB0ZXh0OiBcIllvdXIgam9iIGFwcGxpY2F0aW9uIHN1Ym1pdHRlZCBzdWNjZXNzZnVsbHkuXCIgfSk7XG5cdFx0fSk7XG5cdH1cblxuXHRyZW5kZXIoKSB7XG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXY+XG5cdFx0XHRcdDxIZWxtZXRUYWdzIHRhZ3NEYXRhPXt7XG5cdFx0XHRcdFx0dGl0bGU6ICgnQ2FyZWVyIGF0IGRvY3ByaW1lJyksXG5cdFx0XHRcdFx0ZGVzY3JpcHRpb246IChcIkZpbmUgY2FyZWVyIG9wcG9ydHVuaXR5IGF0IGRvY3ByaW1lLCBJbmRpYSdzIG9uZSBzdG9wIGhlYWx0aCBjYXJlIHNvbHV0aW9uLlwiKVxuXHRcdFx0XHR9fSAvPlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImxhcHRvcC1pbWctZGl2IGFic29sdXRlLWltYWdlc1wiPlxuXHRcdFx0XHRcdDxpbWcgc3JjPVwiL2Fzc2V0cy9pbWcvY2FyZWVyL2xhcHRvcC5wbmdcIiAvPlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJwYWdlcy1pbWctZGl2IGFic29sdXRlLWltYWdlc1wiPlxuXHRcdFx0XHRcdDxpbWcgc3JjPVwiL2Fzc2V0cy9pbWcvY2FyZWVyL3BhZ2VzLnBuZ1wiIC8+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lciBjYXJlZXJzLWNvbnRhaW5lclwiPlxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNvbC0xMiBjb2wtbWQtNiBoaXJpbmctY29sXCI+XG5cdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiaGlyaW5nLWhlYWRpbmctZGl2XCI+XG5cdFx0XHRcdFx0XHRcdFx0PGltZyBzcmM9XCIvYXNzZXRzL2ltZy9jYXJlZXIvaGlyaW5nLnBuZ1wiIGNsYXNzTmFtZT1cImhpcmluZy1pbWdcIiAvPlxuXHRcdFx0XHRcdFx0XHRcdDxoMSBjbGFzc05hbWU9XCJoaXJpbmctaGVhZGluZ1wiPldlIEFyZSBIaXJpbmcgITwvaDE+XG5cdFx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImhpcmluZy1kZXNjLWRpdlwiPlxuXHRcdFx0XHRcdFx0XHRcdDxoMyBjbGFzc05hbWU9XCJoaXJpbmctZGVzY1wiPldlIGFyZSBoaXJpbmcgZm9yIG11bHRpcGxlIHBvc2l0aW9ucy48L2gzPlxuXHRcdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdFx0PGltZyBzcmM9XCIvYXNzZXRzL2ltZy9jYXJlZXIvYXJyb3cuc3ZnXCIgY2xhc3NOYW1lPVwiY2FyZWVycy1hcnJvdy1pbWcgYWJzb2x1dGUtaW1hZ2VzXCIgLz5cblx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjb2wtMTIgY29sLW1kLTYgaGlyaW5nLWNvbFwiPlxuXHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImhpcmluZy1mb3JtLWRpdlwiPlxuXHRcdFx0XHRcdFx0XHRcdDxmb3JtIG9uU3VibWl0PXsoZSkgPT4gdGhpcy5vblN1Ym1pdFByb2ZpbGUoZSl9ID5cblx0XHRcdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cFwiPlxuXHRcdFx0XHRcdFx0XHRcdFx0XHQ8c2VsZWN0IGNsYXNzTmFtZT1cImZvcm0tY29udHJvbFwiIHZhbHVlPXt0aGlzLnN0YXRlLnByb2ZpbGVfdHlwZX0gb25DaGFuZ2U9eyhldmVudCkgPT4gdGhpcy5jaGFuZ2VIYW5kbGVyKGV2ZW50LCAncHJvZmlsZV90eXBlJyl9IHJlcXVpcmVkPlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdDxvcHRpb24gdmFsdWU9XCJcIj5TZWxlY3QgRnVuY3Rpb248L29wdGlvbj5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8b3B0aW9uIHZhbHVlPVwiMVwiPlByb2R1Y3Q8L29wdGlvbj5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8b3B0aW9uIHZhbHVlPVwiMlwiPlRlY2hub2xvZ3k8L29wdGlvbj5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8b3B0aW9uIHZhbHVlPVwiM1wiPlNhbGVzPC9vcHRpb24+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0PG9wdGlvbiB2YWx1ZT1cIjRcIj5Db250ZW50PC9vcHRpb24+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0PG9wdGlvbiB2YWx1ZT1cIjVcIj5NYXJrZXRpbmc8L29wdGlvbj5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8b3B0aW9uIHZhbHVlPVwiNlwiPlFDPC9vcHRpb24+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0PG9wdGlvbiB2YWx1ZT1cIjdcIj5TZXJ2aWNlICZhbXA7IFN1cHBvcnQ8L29wdGlvbj5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8b3B0aW9uIHZhbHVlPVwiOFwiPkRvY3RvcnM8L29wdGlvbj5cblx0XHRcdFx0XHRcdFx0XHRcdFx0PC9zZWxlY3Q+XG5cdFx0XHRcdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cFwiPlxuXHRcdFx0XHRcdFx0XHRcdFx0XHQ8aW5wdXQgdHlwZT1cInRleHRcIiBpZD1cIm5hbWVcIiBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2xcIiBwbGFjZWhvbGRlcj1cIllvdXIgTmFtZVwiIHZhbHVlPXt0aGlzLnN0YXRlLm5hbWV9IG9uQ2hhbmdlPXsoZXZlbnQpID0+IHRoaXMuY2hhbmdlSGFuZGxlcihldmVudCwgJ25hbWUnKX0gcmVxdWlyZWQgLz5cblx0XHRcdFx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwXCI+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdDxpbnB1dCB0eXBlPVwibnVtYmVyXCIgaWQ9XCJtb2JpbGVcIiBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2xcIiBtaW49ezUwMDAwMDAwMDB9IG1heD17OTk5OTk5OTk5OX0gcGxhY2Vob2xkZXI9XCJNb2JpbGUgTnVtYmVyXCIgdmFsdWU9e3RoaXMuc3RhdGUubW9iaWxlfSBvbkNoYW5nZT17KGV2ZW50KSA9PiB0aGlzLmNoYW5nZUhhbmRsZXIoZXZlbnQsICdtb2JpbGUnKX0gcmVxdWlyZWQgLz5cblx0XHRcdFx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwXCI+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdDxpbnB1dCB0eXBlPVwiZW1haWxcIiBpZD1cImVtYWlsXCIgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sXCIgcGxhY2Vob2xkZXI9XCJFbWFpbFwiIHZhbHVlPXt0aGlzLnN0YXRlLmVtYWlsfSBvbkNoYW5nZT17KGV2ZW50KSA9PiB0aGlzLmNoYW5nZUhhbmRsZXIoZXZlbnQsICdlbWFpbCcpfSByZXF1aXJlZCAvPlxuXHRcdFx0XHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInVwbG9hZC1yZXN1bWUtZGl2XCI+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdDxsYWJlbCBjbGFzc05hbWU9XCJyZXN1bWUtbGFiZWxcIiBodG1sRm9yPVwidXBsb2FkLXJlc3VtZVwiPlVwbG9hZCBSZXN1bWU8L2xhYmVsPlxuXHRcdFx0XHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNhcmVlcnMtdXBsb2FkLWJ0blwiPlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdDxpbWcgc3JjPVwiL2Fzc2V0cy9pbWcvY2FyZWVyL3VwbG9hZC5zdmdcIiBjbGFzc05hbWU9XCJ1cGxvYWQtaWNvblwiIC8+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0PHAgY2xhc3NOYW1lPVwiY2FyZWVycy11cGxvYWQtdGV4dFwiPlVwbG9hZDwvcD5cblx0XHRcdFx0XHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY2FyZWVycy1pbnB1dC1maWxlXCI+PGlucHV0IHR5cGU9XCJmaWxlXCIgbmFtZT1cInJlc3VtZVwiIGlkPVwidXBsb2FkLXJlc3VtZVwiIG9uQ2hhbmdlPXsoZSkgPT4gdGhpcy5maWxlUGlja2VyKGUpfSByZXF1aXJlZCAvPjwvZGl2PlxuXHRcdFx0XHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNhcmVlcnMtc3VibWl0LWJ0bi1kaXZcIj5cblx0XHRcdFx0XHRcdFx0XHRcdFx0PGJ1dHRvbiB0eXBlPVwic3VibWl0XCIgY2xhc3NOYW1lPVwiYnRuIGJ0bi1wcmltYXJ5IGNhcmVlcnMtc2VuZC1idG5cIj5TdWJtaXQ8L2J1dHRvbj5cblx0XHRcdFx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0XHRcdDwvZm9ybT5cblx0XHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY29mZmVlLWltZy1kaXYgYWJzb2x1dGUtaW1hZ2VzXCI+XG5cdFx0XHRcdFx0XHRcdFx0PGltZyBzcmM9XCIvYXNzZXRzL2ltZy9jYXJlZXIvY29mZmVlLnBuZ1wiIGNsYXNzTmFtZT1cImNvZmZlZS1pbWdcIiAvPlxuXHRcdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjb250YWluZXItZmx1aWQgYWJzb2x1dGUtaW1hZ2VzXCI+XG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJyb3cgY2FyZWVyLWltZy1yb3dcIj5cblx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiYmFnLWltZyBjYXJlZXItaW1nLWRpdlwiPlxuXHRcdFx0XHRcdFx0XHQ8aW1nIHNyYz1cIi9hc3NldHMvaW1nL2NhcmVlci9iYWcucG5nXCIgY2xhc3NOYW1lPVwiY2FyZWVyLWltZ1wiIC8+XG5cdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwic3BlY3MtaW1nIGNhcmVlci1pbWctZGl2XCI+XG5cdFx0XHRcdFx0XHRcdDxpbWcgc3JjPVwiL2Fzc2V0cy9pbWcvY2FyZWVyL3NwZWNzLnBuZ1wiIGNsYXNzTmFtZT1cImNhcmVlci1pbWdcIiAvPlxuXHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInBlbi1pbWcgY2FyZWVyLWltZy1kaXZcIj5cblx0XHRcdFx0XHRcdFx0PGltZyBzcmM9XCIvYXNzZXRzL2ltZy9jYXJlZXIvcGVuLnBuZ1wiIGNsYXNzTmFtZT1cImNhcmVlci1pbWdcIiAvPlxuXHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImN2LWltZyBjYXJlZXItaW1nLWRpdlwiPlxuXHRcdFx0XHRcdFx0XHQ8aW1nIHNyYz1cIi9hc3NldHMvaW1nL2NhcmVlci9jdi5wbmdcIiBjbGFzc05hbWU9XCJjYXJlZXItaW1nXCIgLz5cblx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJleGFtLWltZyBjYXJlZXItaW1nLWRpdlwiPlxuXHRcdFx0XHRcdFx0XHQ8aW1nIHNyYz1cIi9hc3NldHMvaW1nL2NhcmVlci9leGFtLnBuZ1wiIGNsYXNzTmFtZT1cImNhcmVlci1pbWdcIiAvPlxuXHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IENhcmVlcnNcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgU25hY2tCYXIgZnJvbSAnbm9kZS1zbmFja2JhcidcbmltcG9ydCBIZWxtZXRUYWdzIGZyb20gJy4uL0hlbG1ldFRhZ3MnXG5cbmNsYXNzIENvbnRhY3RVcyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgICBuYW1lOiBcIlwiLFxuICAgICAgICAgICAgbW9iaWxlOiBcIlwiLFxuICAgICAgICAgICAgZW1haWw6IFwiXCIsXG4gICAgICAgICAgICBtZXNzYWdlOiBcIlwiXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjaGFuZ2VIYW5kbGVyID0gKGV2ZW50LCBrZXkpID0+IHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBba2V5XTogZXZlbnQudGFyZ2V0LnZhbHVlXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG9uU3VibWl0RGF0YShlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgdGhpcy5wcm9wcy5zdWJtaXRDb250YWN0TWVzc2FnZSh0aGlzLnN0YXRlLCAoZXJyb3IsIHJlcykgPT4ge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgbmFtZTogXCJcIixcbiAgICAgICAgICAgICAgICBtb2JpbGU6IFwiXCIsXG4gICAgICAgICAgICAgICAgZW1haWw6IFwiXCIsXG4gICAgICAgICAgICAgICAgbWVzc2FnZTogXCJcIlxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBTbmFja0Jhci5zaG93KHsgcG9zOiAnYm90dG9tLWNlbnRlcicsIHRleHQ6IFwiQ29udGFjdCBSZXF1ZXN0IHRha2VuIHN1Y2Nlc3NmdWxseS5cIiB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICBsZXQgbWFpbkNsYXNzXG4gICAgICAgIGlmICh0aGlzLnByb3BzLmZyb21BcHApIHtcbiAgICAgICAgICAgIG1haW5DbGFzcyA9IFwiY29udGFpbmVyIGFib3V0LWNvbnRhaW5lciBhcHBVcmxQYWRkaW5nXCJcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG1haW5DbGFzcyA9ICdjb250YWluZXIgYWJvdXQtY29udGFpbmVyJ1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17bWFpbkNsYXNzfT5cbiAgICAgICAgICAgICAgICA8SGVsbWV0VGFncyB0YWdzRGF0YT17e1xuICAgICAgICAgICAgICAgICAgICB0aXRsZTogKCdDb250YWN0IFVzIHwgZG9jcHJpbWUnKSxcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246ICgnQ29udGFjdCBVczogQ29udGFjdCBkb2NwcmltZSBmb3IgcXVlcnkgcmVsYXRlZCB0byBib29raW5nLCBzaWdudXAgYW5kIG1vcmUuJylcbiAgICAgICAgICAgICAgICB9fSAvPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLTEyIHRleHQtY2VudGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJmdy01MDAgYWJvdXQtaGVhZGluZ1wiIHN0eWxlPXt7IGZvbnRTaXplOiAyMCB9fSA+Q29udGFjdCBVczwvcD5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtMTJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGFjdC10ZXh0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwiZnctNTAwXCI+RmVlbCBsaWtlIGNvbnRhY3RpbmcgdXM/IFN1Ym1pdCB5b3VyIHF1ZXJpZXMgaGVyZSBhbmQgd2Ugd2lsbCBnZXQgYmFjayB0byB5b3UgYXMgc29vbiBhcyBwb3NzaWJsZS48L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHsvKiA8ZGl2IGNsYXNzTmFtZT1cImdwc1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGFjdC1sb2NhdGlvblwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBQbG90IE5vLiAxMTksIFNlY3Rvci00NCwgR3VydWdyYW1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLSAxMjIwMDEsIEhhcnlhbmEgKEluZGlhKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYXJyb3ctZG93blwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaW1hZ2UtbG9jYXRpb25cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGltZyBzcmM9e0FTU0VUU19CQVNFX1VSTCArIFwiL2ltZy9jdXN0b21lci1pY29ucy9sb2NhdGlvbi5wbmdcIn0gLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PiAqL31cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLTEyIGNvbC1tZC02IG1ydC0yMFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzaGFkb3dcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvcm0tdGl0bGVcIiBzdHlsZT17eyBmb250U2l6ZTogMTYgfX0gPlNlbmQgVXMgYSBNZXNzYWdlPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGZvcm0gb25TdWJtaXQ9e3RoaXMub25TdWJtaXREYXRhLmJpbmQodGhpcyl9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRhY3QtZmllbGRzXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2xcIiBwbGFjZWhvbGRlcj1cIk5hbWVcIiB2YWx1ZT17dGhpcy5zdGF0ZS5uYW1lfSBvbkNoYW5nZT17KGUpID0+IHsgdGhpcy5jaGFuZ2VIYW5kbGVyKGUsICduYW1lJykgfX0gcmVxdWlyZWQgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGFjdC1maWVsZHNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiZW1haWxcIiBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2xcIiBwbGFjZWhvbGRlcj1cIkVtYWlsXCIgdmFsdWU9e3RoaXMuc3RhdGUuZW1haWx9IG9uQ2hhbmdlPXsoZSkgPT4geyB0aGlzLmNoYW5nZUhhbmRsZXIoZSwgJ2VtYWlsJykgfX0gcmVxdWlyZWQgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGFjdC1maWVsZHNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwibnVtYmVyXCIgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sXCIgcGxhY2Vob2xkZXI9XCJNb2JpbGUgTnVtYmVyXCIgbWF4PXs5OTk5OTk5OTk5fSBtaW49ezUwMDAwMDAwMDB9IHZhbHVlPXt0aGlzLnN0YXRlLm1vYmlsZX0gb25DaGFuZ2U9eyhlKSA9PiB7IHRoaXMuY2hhbmdlSGFuZGxlcihlLCAnbW9iaWxlJykgfX0gcmVxdWlyZWQgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGFjdC1maWVsZHNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZXh0YXJlYSBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2xcIiBwbGFjZWhvbGRlcj1cIk1lc3NhZ2VcIiByb3dzPXszfSB2YWx1ZT17dGhpcy5zdGF0ZS5tZXNzYWdlfSBvbkNoYW5nZT17KGUpID0+IHsgdGhpcy5jaGFuZ2VIYW5kbGVyKGUsICdtZXNzYWdlJykgfX0gcmVxdWlyZWQgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3VibWl0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJzdWJtaXRcIiBjbGFzc05hbWU9XCJidG4gc3VibWl0LWJ0biBtcnQtMjBcIj5TdWJtaXQ8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9mb3JtPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC0xMiBvZmZzZXQtbWQtMSBjb2wtbWQtNSBtcnQtMjBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGFjdC10ZXh0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwiZnctNTAwIG1yYi0xMFwiPllvdSBjYW4gYWxzbyBjb250YWN0IHVzIHZpYSA6PC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cImZ3LTUwMCBtcmItMTBcIj48c3BhbiBjbGFzc05hbWU9XCJmdy03MDBcIj5FLW1haWwgOjwvc3Bhbj4gY3VzdG9tZXJjYXJlQGRvY3ByaW1lLmNvbTwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJmdy01MDBcIj48c3BhbiBjbGFzc05hbWU9XCJmdy03MDBcIj5QaG9uZSA6PC9zcGFuPiAxODAwLTEyMy05NDE5PC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IENvbnRhY3RVc1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBIZWxtZXRUYWdzIGZyb20gJy4uL0hlbG1ldFRhZ3MnXG5cbmNsYXNzIERpc2NsYWltZXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgICAgICB0aGlzLnN0YXRlID0ge1xuXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGxldCBtYWluQ2xhc3NcbiAgICAgICAgbGV0IGhlYWRpbmdDbGFzc1xuICAgICAgICBpZih0aGlzLnByb3BzLmZyb21BcHApe1xuICAgICAgICAgICAgbWFpbkNsYXNzID0gXCJjb250YWluZXIgYWJvdXQtY29udGFpbmVyIGFwcFVybFBhZGRpbmdcIlxuICAgICAgICAgICAgaGVhZGluZ0NsYXNzID0gXCJjb2wtMTIgdGV4dC1jZW50ZXIgZC1ub25lIGQtbWQtYmxvY2tcIlxuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIG1haW5DbGFzcyA9ICdjb250YWluZXIgYWJvdXQtY29udGFpbmVyJ1xuICAgICAgICAgICAgaGVhZGluZ0NsYXNzID0gXCJjb2wtMTIgdGV4dC1jZW50ZXJcIlxuICAgICAgICB9XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17bWFpbkNsYXNzfT5cbiAgICAgICAgICAgICAgICA8SGVsbWV0VGFncyB0YWdzRGF0YT17e1xuICAgICAgICAgICAgICAgICAgICB0aXRsZTogKCdEaXNjbGFpbWVyIHwgZG9jcHJpbWUnKSxcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246ICgnRGlzY2xhaW1lcjogUmVhZCBEaXNjbGFpbWVyIGRvY3VtZW50IG9mIGRvY3ByaW1lLicpXG4gICAgICAgICAgICAgICAgfX0gLz5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17aGVhZGluZ0NsYXNzfT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cImZ3LTUwMCBhYm91dC1oZWFkaW5nXCIgc3R5bGU9e3sgbWFyZ2luQm90dG9tOiAyMCB9fT5EaXNjbGFpbWVyPC9wPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC0xMiBwcml2YWN5LWRlc2MtZGl2XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJwcml2YWN5LWRlc2NcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBUaGUgaW5mb3JtYXRpb24gY29udGFpbmVkIG9uIERvY3ByaW1lIFRlY2hub2xvZ2llcyBQcml2YXRlIExpbWl0ZWQgd2Vic2l0ZSB3d3cuZG9jcHJpbWUuY29tXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKOKAnFdlYnNpdGXigJ0pIGlzIHNvbGVseSBwcm92aWRlZCBmb3IgaW5mb3JtYXRpb25hbCBwdXJwb3NlcyBvbmx5IGFuZCBpcyBub3QgbWVhbnQgdG8gc3Vic3RpdHV0ZSBmb3IgdGhlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWR2aWNlIHByb3ZpZGVkIGJ5IHlvdXIgcGVyc29uYWwgZG9jdG9yIGFuZC9vciBvdGhlciBwZXJzb24ocykgc3BlY2lhbGl6aW5nIGluIGhlYWx0aGNhcmUvbWVkaWNhbFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcmUuIEluZm9ybWF0aW9uIGFuZCBzdGF0ZW1lbnRzIHJlZ2FyZGluZyB2YXJpb3VzIHRlc3RzIG9mZmVyZWQgYnkgbGFicy9ob3NwaXRhbHMgb3IgY29uc3VsdGFuY3lcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9ncmFtcywgdHJlYXRtZW50cywgaXMgc29sZWx5IGZvciBnZW5lcmFsIHJlYWRpbmcgYW5kIGlzIGEgY29tcGlsYXRpb24gZnJvbSBvcGVuIHNvdXJjZSB0aGF0IHdhc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF2YWlsYWJsZSB0byB1cyBhbmQvb3IgdGhlIGluZm9ybWF0aW9uIHN1cHBsaWVkIHRvIHVzIGZyb20gdGhpcmQgcGFydHkgbGFicy9ob3NwaXRhbHMvZG9jdG9ycy5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBBbnljb25zdWx0YXRpb24gYW5kIHZhcmlvdXMgdGVzdChzKSBhcmUgaW50ZW5kZWQgZm9yIGdlbmVyYWwgcHVycG9zZSBvbmx5IGFuZCBhcmUgbm90IG1lYW50IHRvIGJlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXNlZCBpbiBlbWVyZ2VuY2llcy9zZXJpb3VzIGlsbG5lc3NlcyByZXF1aXJpbmcgcGh5c2ljYWwvZmFjZSB0byBmYWNlIGNvbnN1bHRhdGlvbi4gSW4gY2FzZSBvZiBhbnlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZWdsaWdlbmNlIG9uIHRoZSBwYXJ0IG9mIHRoZSBVc2VyIG9mIHdlYnNpdGUgaW4gYWN0aW5nIG9uIHRoZSBzYW1lIGFuZCB0aGUgY29uZGl0aW9uIG9mIHRoZSBVc2VyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGV0ZXJpb3JhdGVzLCBEb2NwcmltZSBzaGFsbCBub3QgYmUgbGlhYmxlIGZvciBhbnkgY29uc2VxdWVuY2VzIGFyaXNpbmcgb3V0IG9mLCBpbiByZWxhdGlvbiBvciBpblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24sIG9yIGFzIGEgcmVzdWx0IG9mIHRoZSBzYW1lLlxuICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwicHJpdmFjeS1kZXNjXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgQW55IGludGVyYWN0aW9ucyBhbmQgYXNzb2NpYXRlZCBpc3N1ZXMgd2l0aCB0aGUgbGFicy9ob3NwaXRhbHMvZG9jdG9ycyBvbiB0aGUgV2Vic2l0ZSwgaXMgc3RyaWN0bHlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBiZXR3ZWVuIFVzZXIgYW5kIHRoZSBsYWJzL2hvc3BpdGFscy9kb2N0b3JzLiBVc2VyIHNoYWxsIG5vdCBob2xkIERvY3ByaW1lIHJlc3BvbnNpYmxlIGZvciBhbnkgYW5kIGFsbFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2ggaW50ZXJhY3Rpb25zIGFuZCBhc3NvY2lhdGVkIGlzc3Vlcy4gSWYgdGhlIFVzZXIgZGVjaWRlcyB0byBlbmdhZ2Ugd2l0aCBhIGxhYi9ob3NwaXRhbC9kb2N0b3IgdG9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm92aWRlIGRpYWdub3N0aWMgc2VydmljZXMsIHRoZSBVc2VyIHdpbGwgZG8gc28gYXQgaGlzL2hlciBvd24gcmlzay5cbiAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInByaXZhY3ktZGVzY1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEJlIGl0IG5vdGVkLCB0aGUgaW5mb3JtYXRpb24gcHJvdmlkZWQgaGVyZSBpcyBub3QgbWVkaWNhbCBhZHZpY2UgaGVuY2UgaXMgbm90IGludGVuZGVkIHRvIHJlcGxhY2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdWx0YXRpb24gd2l0aCBhIG1lZGljYWwgcHJhY3RpdGlvbmVyLCBhbmQgc2hvdWxkIG5vdCBiZSB0cmVhdGVkIGFzIGFuIGFsdGVybmF0aXZlIHRvIG1lZGljYWxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaWFnbm9zaXMgb3IgdHJlYXRtZW50IGZyb20geW91ciBkb2N0b3IsIG9yIGFueSBvdGhlciBsaWNlbnNlZCBoZWFsdGhjYXJlIHByb2Zlc3Npb25hbC4gRG9jcHJpbWUgaXMgbm90XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYSBtZWRpY2FsIHNlcnZpY2UgcHJvdmlkZXIgb3IgYSBjbGluaWNhbCBlc3RhYmxpc2htZW50LCBub3IgaXQgaXMgaW52b2x2ZWQgaW4gcHJvdmlkaW5nIGFueSBoZWFsdGhjYXJlIG9yXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVkaWNhbCBhZHZpY2Ugb3IgZGlhZ25vc2lzIHNlcnZpY2UsIGl0IHNoYWxsIGhlbmNlIG5vdCBiZSByZXNwb25zaWJsZSBhbmQgb3ducyBubyBsaWFiaWxpdHkgdG8gVXNlcnMgZm9yXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYW55IG91dGNvbWUgZnJvbSB0aGUgY29uc3VsdGF0aW9uIGFuZCBvciB0aGUgdmFyaW91cyB0ZXN0IG9mZmVyZWQgYnkgbGFiKHMpcyBvbiB0aGUgd2Vic2l0ZS5cbiAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInByaXZhY3ktZGVzY1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIERvIG5vdCBzZWxmLWRpYWdub3NlIG9yIHRyZWF0IHlvdXJzZWxmIGJhc2VkIG9uIHRoZSBpbmZvcm1hdGlvbiBwcm92aWRlZCBvbiB0aGlzIFdlYnNpdGUuIFdlIGZ1cnRoZXJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc3NlcnQsIHBsZWFzZSBzZWVrIG1lZGljYWwgYWR2aWNlIGFuZCBkbyBub3QgZGlzcmVnYXJkIG1lZGljYWwgYWR2aWNlLCBvciBkaXNjb250aW51ZSBtZWRpY2FsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJlYXRtZW50IGJ5IHJlbHlpbmcgdXBvbiB0aGUgaW5mb3JtYXRpb24gcHJvdmlkZWQgb24gdGhpcyBXZWJzaXRlLiBFeHRlcm5hbCBsaW5rcyB0byB2aWRlb3MgYW5kIG90aGVyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2Vic2l0ZXMgcHJvdmlkZWQgaGVyZSBhcmUgcHVyZWx5IGZvciBpbmZvcm1hdGlvbiBwdXJwb3NlcyBhbmQgRG9jcHJpbWUgZG9lcyBub3Qgd2FycmFudCBvclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGd1YXJhbnRlZSB0aGUgYWNjdXJhY3ksIGdlbnVpbmVuZXNzLCByZWxpYWJpbGl0eSBvZiBzdWNoIGxpbmtzL3dlYnNpdGVzLiBXZSBkbyBub3QgZ3VhcmFudGVlIHRoZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvcnJlY3RuZXNzIG9mIHRoZSBpbmZvcm1hdGlvbiwgcGxlYXNlIGV4ZXJjaXNlIGRpc2NyZXRpb24gd2hpbGUgYXBwbHlpbmcgdGhlIGluZm9ybWF0aW9uIHRvIHVzZS4gVGhlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5mb3JtYXRpb24gcHJvdmlkZWQgaGVyZXVuZGVyIGlzIG5vdCBpbnRlbmRlZCB0byBiZSBhIHN1YnN0aXR1dGUgZm9yIGdldHRpbmcgaW4gdG91Y2ggd2l0aCBlbWVyZ2VuY3lcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWFsdGhjYXJlLiBJZiB5b3UgKG9yIHRoZSBwZXJzb24geW91IGludGVuZCB0byBwcm92aWRlIGluZm9ybWF0aW9uIHRvKSBhcmUgZmFjaW5nIGEgbWVkaWNhbCBlbWVyZ2VuY3ksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxlYXNlIGNvbnRhY3QgYW4gYW1idWxhbmNlIHNlcnZpY2Ugb3IgaG9zcGl0YWwgZGlyZWN0bHkuXG4gICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJwcml2YWN5LWRlc2MgbXJ0LTIwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHN0cm9uZz5Db3B5cmlnaHQgMjAxOC4gZG9jcHJpbWUuY29tLiBBbGwgcmlnaHRzIHJlc2VydmVkLjwvc3Ryb25nPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBEaXNjbGFpbWVyXG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFNuYWNrQmFyIGZyb20gJ25vZGUtc25hY2tiYXInXG5cbmNsYXNzIERvY3RvcnNpZ251cCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG5cdGNvbnN0cnVjdG9yKHByb3BzKSB7XG5cdFx0c3VwZXIocHJvcHMpXG5cdFx0dGhpcy5zdGF0ZSA9IHtcblx0XHRcdG5hbWU6IFwiXCIsXG5cdFx0XHRtb2JpbGU6IFwiXCIsXG5cdFx0XHRlbWFpbDogXCJcIixcblx0XHRcdGNpdHk6IFwiXCIsXG5cdFx0XHRtZW1iZXJfdHlwZTogXCJcIixcblx0XHRcdGNpdHlEcm9wZG93blZpc2libGU6IGZhbHNlLFxuXHRcdFx0Y2l0eV9uYW1lOiBcIlwiLFxuXHRcdFx0dXRtX3BhcmFtczogcHJvcHMudXRtX3RhZ3MgfHwge30sXG5cdFx0XHRzb3VyY2U6ICdDb25zdW1lcicsXG5cdFx0XHRzaG93U3VjY2Vzc0JveDogZmFsc2Vcblx0XHR9XG5cdH1cblxuXHRjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKHByb3BzKSB7XG5cdFx0aWYgKHRoaXMuc3RhdGUudXRtX3BhcmFtcyAhPSBwcm9wcy51dG1fdGFncykge1xuXHRcdFx0dGhpcy5zZXRTdGF0ZSh7IHV0bV9wYXJhbXM6IHByb3BzLnV0bV90YWdzIH0pXG5cdFx0fVxuXHR9XG5cblx0Y29tcG9uZW50RGlkTW91bnQoKSB7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7IHNob3dTdWNjZXNzQm94OiBmYWxzZSB9KTtcblx0fVxuXG5cdGNoYW5nZUhhbmRsZXIgPSAoZXZlbnQsIGtleSkgPT4ge1xuXHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0W2tleV06IGV2ZW50LnRhcmdldC52YWx1ZVxuXHRcdH0pO1xuXG5cdFx0aWYgKGtleSA9PT0gJ2NpdHknKSB7XG5cdFx0XHRpZiAoZXZlbnQudGFyZ2V0LnZhbHVlID09PSBcIlwiKSB7XG5cdFx0XHRcdHRoaXMuc2V0U3RhdGUoeyBjaXR5RHJvcGRvd25WaXNpYmxlOiBmYWxzZSB9KTtcblx0XHRcdH1cblx0XHRcdGVsc2Uge1xuXHRcdFx0XHR0aGlzLnNldFN0YXRlKHsgY2l0eURyb3Bkb3duVmlzaWJsZTogdHJ1ZSB9KTtcblx0XHRcdFx0dGhpcy5wcm9wcy5nZXRDaXRpZXMoZXZlbnQudGFyZ2V0LnZhbHVlKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRzZXRDaXR5ID0gKGNpdHlOYW1lLCBjaXR5SWQpID0+IHtcblx0XHR0aGlzLnNldFN0YXRlKHtcblx0XHRcdGNpdHk6IGNpdHlOYW1lLFxuXHRcdFx0Y2l0eV9uYW1lOiBjaXR5SWQsXG5cdFx0XHRjaXR5RHJvcGRvd25WaXNpYmxlOiBmYWxzZVxuXHRcdH0pO1xuXHR9XG5cblx0b25TdWJtaXREYXRhKGUpIHtcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0dGhpcy5wcm9wcy5zaWdudXBEb2N0b3IodGhpcy5zdGF0ZSwgKGVycm9yLCByZXMpID0+IHtcblx0XHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0XHRuYW1lOiBcIlwiLFxuXHRcdFx0XHRtb2JpbGU6IFwiXCIsXG5cdFx0XHRcdGVtYWlsOiBcIlwiLFxuXHRcdFx0XHRjaXR5OiBcIlwiLFxuXHRcdFx0XHRtZW1iZXJfdHlwZTogXCJcIixcblx0XHRcdFx0Y2l0eV9uYW1lOiBcIlwiLFxuXHRcdFx0XHRzaG93U3VjY2Vzc0JveDogdHJ1ZVxuXHRcdFx0fSk7XG5cdFx0XHRTbmFja0Jhci5zaG93KHsgcG9zOiAnYm90dG9tLWNlbnRlcicsIHRleHQ6IFwiU2lnbiBVcCB3YXMgc3VjY2Vzc2Z1bC5cIiB9KTtcblx0XHR9KTtcblx0fVxuXG5cdHJlbmRlcigpIHtcblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjb250YWluZXIgYWJvdXQtY29udGFpbmVyXCI+XG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XG5cdFx0XHRcdFx0ey8qIDxkaXYgY2xhc3NOYW1lPVwiY29sLTEyIHRleHQtY2VudGVyXCI+XG5cdFx0XHRcdFx0XHQ8cCBjbGFzc05hbWU9XCJmdy01MDAgYWJvdXQtaGVhZGluZ1wiPlNpZ24gVXA8L3A+XG5cdFx0XHRcdFx0PC9kaXY+ICovfVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdHRoaXMuc3RhdGUuc2hvd1N1Y2Nlc3NCb3ggP1xuXHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNvbC0xMlwiPlxuXHRcdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwic3VibWl0LWFsZXJ0IGFsZXJ0LXN1Y2Nlc3NcIiByb2xlPVwiYWxlcnRcIj5cblx0XHRcdFx0XHRcdFx0XHRcdDxzdHJvbmc+VGhhbmsgeW91IDwvc3Ryb25nPmZvciBjaG9vc2luZyA8YSBocmVmPVwiL1wiIG9uQ2xpY2s9eyhlKSA9PiB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0dGhpcy5wcm9wcy5oaXN0b3J5LnB1c2goJy8nKVxuXHRcdFx0XHRcdFx0XHRcdFx0fX0+ZG9jcHJpbWUuY29tPC9hPi4gT3VyIHRlYW0gd2lsbCBnZXQgaW4gdG91Y2ggd2l0aCB5b3Ugc2hvcnRseS5cblx0XHRcdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdFx0PC9kaXY+IDogJydcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjb2wtMTIgZHNwLW1haW4taW5mby1kaXZcIj5cblx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiZHNwLXBob25lLWltZy1kaXZcIj5cblx0XHRcdFx0XHRcdFx0PGltZyBzcmM9XCJodHRwczovL2Nkbi5kb2NwcmltZS5jb20vc3RhdGljL3dlYi9pbWFnZXMvcGhvbmVfZG9jLmMxZmU4NjQ5NzExZi5wbmdcIiBjbGFzc05hbWU9XCJkc3AtcGhvbmUtaW1nXCIgLz5cblx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJkc3AtaW1nLWluZm8tZGl2XCI+XG5cdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiZHNwLWxvZ28tZGl2XCI+XG5cdFx0XHRcdFx0XHRcdFx0PGltZyBzcmM9XCJodHRwczovL2Nkbi5kb2NwcmltZS5jb20vc3RhdGljL3dlYi9pbWFnZXMvbG9nby45ZWExMTY2NTdhNjAucG5nXCIgY2xhc3NOYW1lPVwiZHNwLWxvZ29cIiBzdHlsZT17eyB3aWR0aDogMTYwIH19IC8+XG5cdFx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0XHR7LyogPGRpdiBjbGFzc05hbWU9XCJjb21pbmctc29vbi1kaXZcIj5cblx0XHRcdFx0XHRcdFx0XHQ8cCBjbGFzc05hbWU9XCJjb21pbmctc29vbi10ZXh0XCI+Q09NSU5HIFNPT048L3A+XG5cdFx0XHRcdFx0XHRcdDwvZGl2PiAqL31cblx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJkc3AtZGV0YWlsLXRleHQtZGl2IG1ydC0yMFwiPlxuXHRcdFx0XHRcdFx0XHRcdDxwIGNsYXNzTmFtZT1cImRzcC1kZXRhaWwtdGV4dFwiPkJlY29tZSBvdXIgcGFydG5lciAmYW1wOyBoZWxwIHVzIHNlcnZlIG1pbGxpb25zIG9mIHBhdGllbnRzIGFjcm9zcyBJbmRpYTwvcD5cblx0XHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiZHNwLXNpZ251cC1kaXYgbXJ0LTIwXCI+XG5cdFx0XHRcdFx0XHRcdFx0PHAgY2xhc3NOYW1lPVwiZHNwLXNpZ251cC1sYWJlbFwiPlNpZ25VcCBhczwvcD5cblx0XHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHRcdDxmb3JtIG9uU3VibWl0PXsoZSkgPT4gdGhpcy5vblN1Ym1pdERhdGEoZSl9IGF1dG9Db21wbGV0ZT1cIm9mZlwiIGF1dG9Db3JyZWN0PVwib2ZmXCIgc3BlbGxDaGVjaz1cIm9mZlwiPlxuXHRcdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cFwiPlxuXHRcdFx0XHRcdFx0XHRcdFx0PHNlbGVjdCBuYW1lPVwibWVtYmVyX3R5cGVcIiBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2xcIiB2YWx1ZT17dGhpcy5zdGF0ZS5tZW1iZXJfdHlwZX0gcmVxdWlyZWQgaWQ9XCJkc3Atc2VsZWN0LXByb2Zlc3Npb25cIiBvbkNoYW5nZT17KGV2ZW50KSA9PiB0aGlzLmNoYW5nZUhhbmRsZXIoZXZlbnQsICdtZW1iZXJfdHlwZScpfT5cblx0XHRcdFx0XHRcdFx0XHRcdFx0PG9wdGlvbiB2YWx1ZT1cIlwiPlNlbGVjdDwvb3B0aW9uPlxuXHRcdFx0XHRcdFx0XHRcdFx0XHQ8b3B0aW9uIHZhbHVlPXsxfT5Eb2N0b3I8L29wdGlvbj5cblx0XHRcdFx0XHRcdFx0XHRcdFx0PG9wdGlvbiB2YWx1ZT17Mn0+RGlhZ25vc3RpYyBDZW50ZXI8L29wdGlvbj5cblx0XHRcdFx0XHRcdFx0XHRcdFx0PG9wdGlvbiB2YWx1ZT17M30+SG9zcGl0YWwvQ2xpbmljPC9vcHRpb24+XG5cdFx0XHRcdFx0XHRcdFx0XHQ8L3NlbGVjdD5cblx0XHRcdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXBcIj5cblx0XHRcdFx0XHRcdFx0XHRcdDxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJuYW1lXCIgcGxhY2Vob2xkZXI9XCJOYW1lXCIgbWF4TGVuZ3RoPXsyNTV9IGNsYXNzTmFtZT1cImZvcm0tY29udHJvbFwiIHJlcXVpcmVkIGlkPVwiZHNwLW5hbWVcIiB2YWx1ZT17dGhpcy5zdGF0ZS5uYW1lfSBvbkNoYW5nZT17KGV2ZW50KSA9PiB0aGlzLmNoYW5nZUhhbmRsZXIoZXZlbnQsICduYW1lJyl9IC8+XG5cdFx0XHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwIGRzcC1jaXR5LW1vYmlsZS1kaXZcIj5cblx0XHRcdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiZHNwLW1vYmlsZS1kaXZcIj5cblx0XHRcdFx0XHRcdFx0XHRcdFx0PGlucHV0IHR5cGU9XCJudW1iZXJcIiBuYW1lPVwibW9iaWxlXCIgbWF4PXs5OTk5OTk5OTk5fSBpZD1cImRzcC1tb2JpbGVcIiBwbGFjZWhvbGRlcj1cIk1vYmlsZSBOdW1iZXJcIiBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2xcIiByZXF1aXJlZCBtaW49ezUwMDAwMDAwMDB9IHZhbHVlPXt0aGlzLnN0YXRlLm1vYmlsZX0gb25DaGFuZ2U9eyhldmVudCkgPT4gdGhpcy5jaGFuZ2VIYW5kbGVyKGV2ZW50LCAnbW9iaWxlJyl9IC8+XG5cdFx0XHRcdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiZHNwLWNpdHktZGl2XCI+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdDxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJjaXR5X25hbWVcIiBwbGFjZWhvbGRlcj1cIkNpdHlcIiBtYXhMZW5ndGg9ezI1NX0gY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sXCIgcmVxdWlyZWQgaWQ9XCJkc3AtY2l0eVwiIHZhbHVlPXt0aGlzLnN0YXRlLmNpdHl9IG9uQ2hhbmdlPXsoZXZlbnQpID0+IHRoaXMuY2hhbmdlSGFuZGxlcihldmVudCwgJ2NpdHknKX0gLz5cblx0XHRcdFx0XHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHRoaXMuc3RhdGUuY2l0eURyb3Bkb3duVmlzaWJsZSA/XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImRzcC1jaXR5LWRyb3Bkb3duXCI+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDx1bCBjbGFzc05hbWU9XCJkc3AtY2l0eS1saXN0XCI+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0dGhpcy5wcm9wcy5jaXRpZXNOYW1lLm1hcChjaXR5ID0+IHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuIDxsaSBvbkNsaWNrPXsoKSA9PiB0aGlzLnNldENpdHkoY2l0eS5uYW1lLCBjaXR5LnZhbHVlKX0gY2xhc3NOYW1lPVwiZHNwLWNpdHktbGlzdC1pdGVtXCIga2V5PXtjaXR5LnZhbHVlfT57Y2l0eS5uYW1lfTwvbGk+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR9KVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PC91bD5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDwvZGl2PiA6IFwiXCJcblx0XHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwXCI+XG5cdFx0XHRcdFx0XHRcdFx0XHQ8aW5wdXQgdHlwZT1cImVtYWlsXCIgbmFtZT1cImVtYWlsXCIgcGF0dGVybj1cIlthLXowLTkuXyUrLV0rQFthLXowLTkuLV0rXFwuW2Etel17MiwzfSRcIiBwbGFjZWhvbGRlcj1cIkVtYWlsXCIgdmFsdWU9e3RoaXMuc3RhdGUuZW1haWx9IGNsYXNzTmFtZT1cImZvcm0tY29udHJvbFwiIHJlcXVpcmVkIG1heExlbmd0aD17MjU0fSBpZD1cImRzcC1lbWFpbFwiIG9uQ2hhbmdlPXsoZXZlbnQpID0+IHRoaXMuY2hhbmdlSGFuZGxlcihldmVudCwgJ2VtYWlsJyl9IC8+XG5cdFx0XHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHRcdFx0PGJ1dHRvbiB0eXBlPVwic3VibWl0XCIgY2xhc3NOYW1lPVwiYnRuIGJ0bi1wcmltYXJ5IGRzcC1zZW5kLWJ0blwiPlN1Ym1pdDwvYnV0dG9uPlxuXHRcdFx0XHRcdFx0XHQ8L2Zvcm0+XG5cdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IERvY3RvcnNpZ251cCIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgSGVsbWV0VGFncyBmcm9tICcuLi9IZWxtZXRUYWdzJ1xuXG5jbGFzcyBIb3dpdFdvcmtzIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcblxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lciBhYm91dC1jb250YWluZXJcIj5cbiAgICAgICAgICAgICAgICA8SGVsbWV0VGFncyB0YWdzRGF0YT17e1xuICAgICAgICAgICAgICAgICAgICB0aXRsZTogKCdIb3cgZG9jcHJpbWUgV29ya3MgfCBkb2NwcmltZScpLFxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogKCdob3cgZG9lcyBkb2NwcmltZSB3b3JrcyBmb3IgdGhlIHBhdGllbnRzIGFuZCBkb2N0b3JzLicpXG4gICAgICAgICAgICAgICAgfX0gLz5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC0xMiB0ZXh0LWNlbnRlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwiZnctNTAwIGFib3V0LWhlYWRpbmdcIj5Ib3cgaXQgV29ya3M8L3A+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC0xMlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwiZnctNTAwIGFib3V0LWNvbnRlbnRcIj5kb2NwcmltZS5jb20gYWltcyB0byByZWRlZmluZSBob3cgSW5kaWFucyBzZWVrIGhlYWx0aGNhcmUgc2VydmljZXMuIEl0IGNvbm5lY3RzIHBhdGllbnRzIHdpdGggbWVkaWNhbCBjb25zdWx0YW50cyBpbiByZWFsIHRpbWUgYW5kIGJyaWRnZXMgdGhlIGdhcCBiZXR3ZWVuIG5lZWQgYW5kIGZ1bGZpbG1lbnQgdXNpbmcgc3RhdGUtb2YtdGhlLWFydCB0ZWNobm9sb2d5IGFuZCBhIHJvYnVzdCBvZmZsaW5lIG5ldHdvcmsuIEl0IGFsc28gZmFjaWxpdGF0ZXMgYm9va2luZyBvZiBkb2N0b3IgYXBwb2ludG1lbnRzIGFuZCBsYWIgdGVzdHMgYXQgZGlzY291bnRlZCByYXRlcy48L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJmdy01MDAgYWJvdXQtY29udGVudFwiPk91ciBLZXkgU2VydmljZXMgYXJlOjwvcD5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3cgd29ya2luZy1yb3dcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3b3JraW5nLWNvbnRlbnQtZGl2IGNvbC0xMiBjb2wtbGctOFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJkb2N0b3ItY29uc3VsdGF0aW9uXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3b3JraW5nLWNvdW50IHRleHQtY2VudGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cImZ3LTUwMFwiPjE8L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb25zdWx0YXRpb24tdGV4dFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJmdy01MDBcIj5GcmVlIGZvciBMaWZlLURvY3RvciBjb25zdWx0YXRpb248L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZG9jdGV4dFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx1bCBzdHlsZT17eyBsaXN0U3R5bGVUeXBlOiAnZGlzYycgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaSBjbGFzc05hbWU9XCJmdy01MDBcIj5GcmVlIG1lZGljYWwgY29uc3VsdGF0aW9uIG92ZXIgY2hhdCBhbmQgcGhvbmUgZnJvbSBleHBlcmllbmNlZCBtZWRpY2FsIGNvbnN1bHRhbnRzPC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpIGNsYXNzTmFtZT1cImZ3LTUwMFwiPkluc3RhbnQgYW5kIHJlYWwtdGltZSBpbnRlcmFjdGlvbiB3aXRoIG1lZGljYWwgY29uc3VsdGFudHMgdG8gaGVscCBpZGVudGlmeSB0aGUgcm9vdCBjYXVzZSBvZiB0aGUgcHJvYmxlbTwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaSBjbGFzc05hbWU9XCJmdy01MDBcIj5Vc2VycyBjYW4gYW5vbnltb3VzbHksIG9yIG90aGVyd2lzZSwgY29tbXVuaWNhdGUgd2l0aCBkb2N0b3JzIHdpdGggdmFyaW91cyBhcmVhcyBvZiBleHBlcnRpc2UgZGlyZWN0bHkgZnJvbSB0aGVpciBzbWFydHBob25lcyBvciBkZXNrdG9wczwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtbGctNCBkLW5vbmUgZC1sZy1ibG9ja1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGltZyBjbGFzc05hbWU9XCJjb25zdWx0YXRpb24taW1hZ2VcIiBzcmM9e0FTU0VUU19CQVNFX1VSTCArIFwiL2ltZy9kb2N0b3JDb25zbHV0YXRpb24ucG5nXCJ9IC8+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93IHdvcmtpbmctcm93IGxhYlwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIndvcmtpbmctY29udGVudC1kaXYgY29sLTEyIGNvbC1sZy04XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImRvY3Rvci1jb25zdWx0YXRpb25cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIndvcmtpbmctY291bnQgdGV4dC1jZW50ZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwiZnctNTAwXCI+MjwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnN1bHRhdGlvbi10ZXh0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cImZ3LTUwMFwiPkRvY3RvciBTZWFyY2ggYW5kIE9ubGluZSBBcHBvaW50bWVudCBCb29raW5nPC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImRvY3RleHRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dWwgc3R5bGU9e3sgbGlzdFN0eWxlVHlwZTogJ2Rpc2MnIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGkgY2xhc3NOYW1lPVwiZnctNTAwXCI+U2VhcmNoIHRoZSBiZXN0IGRvY3RvcnMgbmVhcmJ5IHlvdXIgYXJlYSBhbmQgYm9vayB5b3VyIG5leHQgZG9jdG9yIHZpc2l0IGNvbnZlbmllbnRseSB0aHJvdWdoIHVzPC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpIGNsYXNzTmFtZT1cImZ3LTUwMFwiPkF2YWlsIGRpc2NvdW50IHVwdG8gNTAlIG9uIGJvb2tpbmcgZG9jdG9yIHNlcnZpY2VzPC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpIGNsYXNzTmFtZT1cImZ3LTUwMFwiPjE0MDAwK2RvY3RvcnMgZnJvbSByZXB1dGVkIGFuZCBsZWFkaW5nIGNsaW5pY3MgYW5kIGhvc3BpdGFscyBvbiBib2FyZCB0byBwcm92aWRlIGJlc3QgaGVhbHRoY2FyZSBzZXJ2aWNlczwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtbGctNCBkLW5vbmUgZC1sZy1ibG9ja1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGltZyBjbGFzc05hbWU9XCJsYWItaW1hZ2VcIiBzcmM9e0FTU0VUU19CQVNFX1VSTCArIFwiL2ltZy9waG9uZS5wbmdcIn0gLz5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3cgd29ya2luZy1yb3cgbGFiXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwid29ya2luZy1jb250ZW50LWRpdiBjb2wtMTIgY29sLWxnLThcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZG9jdG9yLWNvbnN1bHRhdGlvblwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwid29ya2luZy1jb3VudCB0ZXh0LWNlbnRlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJmdy01MDBcIj4zPC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29uc3VsdGF0aW9uLXRleHRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwiZnctNTAwXCI+U2VhcmNoIGFuZCBCb29rIExhYiBUZXN0cyBhdCBEaXNjb3VudGVkIFJhdGVzPC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImRvY3RleHRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dWwgc3R5bGU9e3sgbGlzdFN0eWxlVHlwZTogJ2Rpc2MnIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGkgY2xhc3NOYW1lPVwiZnctNTAwXCI+U2VhcmNoIHRoZSBiZXN0IGRpYWdub3N0aWMgbGFiIG5lYXJieSB5b3VyIGFyZWE8L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGkgY2xhc3NOYW1lPVwiZnctNTAwXCI+QXZhaWwgZGlzY291bnQgdXB0byA2MCUgb24gbGFiIHRlc3RzPC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpIGNsYXNzTmFtZT1cImZ3LTUwMFwiPkNvbXByZWhlbnNpdmUgbmV0d29yayBvZiByZXB1dGVkIDQwMDArIGRpYWdub3N0aWMgbGFiczwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaSBjbGFzc05hbWU9XCJmdy01MDBcIj5EZXRhaWxlZCBpbmZvcm1hdGlvbiBhYm91dCBwcm9jZWR1cmVzIG9mIHRoZSB0ZXN0cywgcHJpY2VzLCBhbmQgcmVsZXZhbnQgcHJlcGFyYXRpb25zIGFyZSBlYXNpbHkgYWNjZXNzaWJsZSBvbiB0aGUgcGxhdGZvcm08L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGkgY2xhc3NOYW1lPVwiZnctNTAwXCI+SG9tZSBjb2xsZWN0aW9uIGZhY2lsaXR5IGF2YWlsYWJsZTwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtbGctNCBkLW5vbmUgZC1sZy1ibG9ja1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGltZyBjbGFzc05hbWU9XCJjb25zdWx0YXRpb24taW1hZ2VcIiBzcmM9e0FTU0VUU19CQVNFX1VSTCArIFwiL2ltZy9zdGF5aW5naGVhbHRoeS5wbmdcIn0gLz5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3cgd29ya2luZy1yb3cgbGFiXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwid29ya2luZy1jb250ZW50LWRpdiBjb2wtMTIgY29sLWxnLThcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZG9jdG9yLWNvbnN1bHRhdGlvblwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwid29ya2luZy1jb3VudCB0ZXh0LWNlbnRlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJmdy01MDBcIj40PC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29uc3VsdGF0aW9uLXRleHRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwiZnctNTAwXCI+SGVhbHRoIGZlZWQ8L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZG9jdGV4dFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx1bCBzdHlsZT17eyBsaXN0U3R5bGVUeXBlOiAnZGlzYycgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaSBjbGFzc05hbWU9XCJmdy01MDBcIj5JbXBvcnRhbnQgZmFjdHMgYW5kIGtub3dsZWRnZSBhYm91dCB2YXJpb3VzIGRpc2Vhc2VzIGFuZCBtZWRpY2luZXMsIGFuZCBob3cgdG8gbWFuYWdlIHRoZSBjb25kaXRpb248L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGkgY2xhc3NOYW1lPVwiZnctNTAwXCI+SW5mb3JtYXRpb24gb24gdXNlZnVsIGxpZmVzdHlsZSBjaGFuZ2VzIGZvciBvdmVyYWxsIHdlbGwtYmVpbmc8L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3cgbGFiXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwid29ya2luZy1jb250ZW50LWRpdiBjb2wtMTIgY29sLWxnLThcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cImZ3LTUwMCB0ZXh0LXhsXCI+T3VyIFVwY29taW5nIFNlcnZpY2VzIDo8L3A+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93IHdvcmtpbmctcm93IGxhYlwiIHN0eWxlPXt7IG1hcmdpblRvcDogNDAgfX0gPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIndvcmtpbmctY29udGVudC1kaXYgY29sLTEyIGNvbC1sZy04XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImRvY3Rvci1jb25zdWx0YXRpb25cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIndvcmtpbmctY291bnQgdGV4dC1jZW50ZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwiZnctNTAwXCI+MTwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnN1bHRhdGlvbi10ZXh0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cImZ3LTUwMFwiPlN1YnNjcmlwdGlvbiBiYXNlZCBPUEQgcHJvZHVjdDwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJkb2N0ZXh0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHVsIHN0eWxlPXt7IGxpc3RTdHlsZVR5cGU6ICdkaXNjJyB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpIGNsYXNzTmFtZT1cImZ3LTUwMFwiPlVubGltaXRlZCBjb25zdWx0YXRpb25zIGFuZCBkaWFnbm9zdGljIHRlc3QgdG8gbWFrZSByZWd1bGFyIE9QRCB2aXNpdHMgY29udmVuaWVudCwgYWNjZXNzaWJsZSwgYW5kIGFmZm9yZGFibGU8L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGkgY2xhc3NOYW1lPVwiZnctNTAwXCI+RWFzZSBvZiBjYXNobGVzcyB0cmFuc2FjdGlvbnMgZm9yIE9QRCBzZXJ2aWNlczwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaSBjbGFzc05hbWU9XCJmdy01MDBcIj5PbmxpbmUgYXBwb2ludG1lbnQgYm9va2luZzwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvdyB3b3JraW5nLXJvdyBsYWJcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3b3JraW5nLWNvbnRlbnQtZGl2IGNvbC0xMiBjb2wtbGctOFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJkb2N0b3ItY29uc3VsdGF0aW9uXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3b3JraW5nLWNvdW50IHRleHQtY2VudGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cImZ3LTUwMFwiPjI8L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb25zdWx0YXRpb24tdGV4dFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJmdy01MDBcIj5lUGhhcm1hY3k8L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZG9jdGV4dFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx1bCBzdHlsZT17eyBsaXN0U3R5bGVUeXBlOiAnZGlzYycgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaSBjbGFzc05hbWU9XCJmdy01MDBcIj5Db21wcmVoZW5zaXZlIG5ldHdvcmsgb2YgcGhhcm1hY2llczwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaSBjbGFzc05hbWU9XCJmdy01MDBcIj5Eb29yc3RlcCBkZWxpdmVyeSBvZiBtZWRpY2luZXMgYXQgZGlzY291bnRlZCByYXRlczwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBIb3dpdFdvcmtzXG4iLCJpbXBvcnQgU3RhdGljUGFnZXMgZnJvbSAnLi9TdGF0aWNQYWdlcy5qcydcblxuZXhwb3J0IGRlZmF1bHQgU3RhdGljUGFnZXMiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IEhlbG1ldFRhZ3MgZnJvbSAnLi4vSGVsbWV0VGFncydcblxuY2xhc3MgTWVkaWEgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuXHRjb25zdHJ1Y3Rvcihwcm9wcykge1xuXHRcdHN1cGVyKHByb3BzKVxuXHRcdHRoaXMuc3RhdGUgPSB7XG5cblx0XHR9XG5cdH1cblxuXHRyZW5kZXIoKSB7XG5cblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjb250YWluZXIgbWVkaWEtY29udGFpbmVyXCI+XG5cdFx0XHRcdDxIZWxtZXRUYWdzIHRhZ3NEYXRhPXt7XG5cdFx0XHRcdFx0dGl0bGU6ICgnTWVkaWEgQ292ZXJhZ2VzIEFuZCBQcmVzcyBSZWxlYXNlcyB8IGRvY3ByaW1lJyksXG5cdFx0XHRcdFx0ZGVzY3JpcHRpb246ICgnUmVhZCBhYm91dCBtZWRpYSBjb3ZlcmFnZXMsIHByZXNzIHJlbGVhc2VzIGFuZCBuZXdzIHJlbGF0ZWQgdG8gZG9jcHJpbWUuJylcblx0XHRcdFx0fX0gLz5cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJyb3cgbWVkaWEtcm93XCI+XG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjb2wtMTIgY29sLWxnLTNcIj5cblx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwibWVkaWEtbWVkaWEtc3RpY2t5LWRpdlwiPlxuXHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIm1lZGlhLWxpc3QtZGl2IGQtbm9uZSBkLWxnLWJsb2NrXCI+XG5cdFx0XHRcdFx0XHRcdFx0PHVsIGNsYXNzTmFtZT1cIm1lZGlhLWxpc3Qtb3B0aW9uc1wiPlxuXHRcdFx0XHRcdFx0XHRcdFx0PGxpPlxuXHRcdFx0XHRcdFx0XHRcdFx0XHQ8cCBjbGFzc05hbWU9XCJtZWRpYS1saXN0LW9wdGlvbnMtaXRlbSBtZWRpYS1zZWxlY3RlZC1vcHRpb25cIj5BbGwgTWVkaWE8L3A+XG5cdFx0XHRcdFx0XHRcdFx0XHQ8L2xpPlxuXHRcdFx0XHRcdFx0XHRcdFx0ey8qIDxsaT5cblx0XHRcdFx0XHRcdFx0XHRcdFx0PHAgY2xhc3M9XCJtZWRpYS1saXN0LW9wdGlvbnMtaXRlbVwiPk5ld3MgZnJvbSBNZWRpYTwvcD5cblx0XHRcdFx0XHRcdFx0XHRcdDwvbGk+XG5cdFx0XHRcdFx0XHRcdFx0XHQ8bGk+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdDxwIGNsYXNzPVwibWVkaWEtbGlzdC1vcHRpb25zLWl0ZW1cIj5QcmVzcyBSZWxlYXNlczwvcD5cblx0XHRcdFx0XHRcdFx0XHRcdDwvbGk+XG5cdFx0XHRcdFx0XHRcdFx0XHQ8bGk+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdDxwIGNsYXNzPVwibWVkaWEtbGlzdC1vcHRpb25zLWl0ZW1cIj5UViBDb21tZXJjaWFsczwvcD5cblx0XHRcdFx0XHRcdFx0XHRcdDwvbGk+XG5cdFx0XHRcdFx0XHRcdFx0XHQ8bGk+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdDxwIGNsYXNzPVwibWVkaWEtbGlzdC1vcHRpb25zLWl0ZW1cIj5OZXdzIGluIEdlbmVyYWxzPC9wPlxuXHRcdFx0XHRcdFx0XHRcdFx0PC9saT4gKi99XG5cdFx0XHRcdFx0XHRcdFx0PC91bD5cblx0XHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwibWVkaWEtY29udGFjdC1kaXYgZC1ub25lIGQtbGctYmxvY2tcIj5cblx0XHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIm1lZGlhLWNvbnRhY3QtbGFiZWwtZGl2XCI+XG5cdFx0XHRcdFx0XHRcdFx0XHQ8cCBjbGFzc05hbWU9XCJtZWRpYS1jb250YWN0LWxhYmVsXCI+Q29udGFjdCBVczwvcD5cblx0XHRcdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIm1lZGlhLWNvbnRhY3QtaXRlbXMtZGl2XCI+XG5cdFx0XHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIm1lZGlhLWNvbnRhY3QtaXRlbVwiPlxuXHRcdFx0XHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIm1lZGlhLWNvbnRhY3Qtc3ViaXRlbVwiPlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdDxpbWcgc3JjPVwiL2Fzc2V0cy9pbWcvbWVkaWEvZW1haWwtaWNvbi5zdmdcIiBzdHlsZT17eyB2ZXJ0aWNhbEFsaWduOiAnbWlkZGxlJyB9fSBjbGFzc05hbWU9XCJtZWRpYS1jb250YWN0LWljb25cIiAvPlxuXHRcdFx0XHRcdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJtZWRpYS1jb250YWN0LXN1Yml0ZW1cIj5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8cCBjbGFzc05hbWU9XCJtZWRpYS1jb250YWN0LXRleHRcIj5tZWRpYUBkb2NwcmltZS5jb208L3A+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIm1lZGlhLWNvbnRhY3QtaXRlbSBtZWRpYS1sb2NhdGlvbi1pdGVtXCI+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwibWVkaWEtY29udGFjdC1zdWJpdGVtIG1lZGlhLWxvY2F0aW9uLXN1Yml0ZW1cIj5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8aW1nIHNyYz1cIi9hc3NldHMvaW1nL21lZGlhL21lZGlhLWxvYy5zdmdcIiBjbGFzc05hbWU9XCJtZWRpYS1jb250YWN0LWljb25cIiAvPlxuXHRcdFx0XHRcdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJtZWRpYS1jb250YWN0LXN1Yml0ZW1cIj5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8cCBjbGFzc05hbWU9XCJtZWRpYS1jb250YWN0LXRleHRcIj5QbG90IG5vPC9wPlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdDxwIGNsYXNzTmFtZT1cIm1lZGlhLWNvbnRhY3QtdGV4dFwiPjExOSwgU2VjdG9yIDQ0PC9wPlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdDxwIGNsYXNzTmFtZT1cIm1lZGlhLWNvbnRhY3QtdGV4dFwiPkd1cnVncmFtIC0gMTIyMDAxPC9wPlxuXHRcdFx0XHRcdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY29sLTEyIGNvbC1sZy02XCI+XG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIm1lZGlhLWRpdi1oZWFkXCI+XG5cdFx0XHRcdFx0XHRcdDxpbWcgc3JjPVwiL2Fzc2V0cy9pbWcvbWVkaWEvbmV3c3BhcGVyLnBuZ1wiIC8+XG5cdFx0XHRcdFx0XHRcdDxzcGFuPlByZXNzIFJlbGVhc2VzPC9zcGFuPlxuXHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIm1lZGlhLWRpdi1jYXJkXCI+XG5cdFx0XHRcdFx0XHRcdDxwIGNsYXNzTmFtZT1cIm1lZGlhLWNhcmQtaGVhZGluZ1wiPlBvbGljeWJhemFhci5jb20gdG8gZm9yYXkgaW50byBoZWFsdGhjYXJlIGFuZCB0ZWNoIHNlcnZpY2VzPC9wPlxuXHRcdFx0XHRcdFx0XHQ8cCBjbGFzc05hbWU9XCJtZWRpYS1jYXJkLWRhdGVcIj4zMCBNYXJjaCwgMjAxODwvcD5cblx0XHRcdFx0XHRcdFx0PHAgY2xhc3NOYW1lPVwibWVkaWEtY2FyZC1jb250ZW50XCI+UG9saWN5YmF6YWFyLmNvbSwgSW5kaWEncyBsYXJnZXN0IGluc3VyYW5jZSB3ZWJzaXRlIGFuZCBjb21wYXJpc29uIHBvcnRhbCwgaXMgcGxhbm5pbmcgdG8gZm9yYXkgaW50byB0aGUgaGVhbHRoY2FyZSB0ZWNobm9sb2d5IGFuZCBzZXJ2aWNlcyBzcGFjZTwvcD5cblx0XHRcdFx0XHRcdFx0PHAgY2xhc3NOYW1lPVwibWVkaWEtY2FyZC1jb250ZW50XCI+VGhlIG5ldyBwbGF0Zm9ybSB3aWxsIHByb3ZpZGUgY29uc3VtZXJzIHdpdGggZWFzeSwgb25saW5lIGFuZCBmcmVlIGFjY2VzcyB0byBQb2xpY3lCYXphYXIncyBlbXBhbmVsbGVkIHRvcC1ub3RjaCBkb2N0b3JzIGFuZCBtZWRpY2FsIGNvbnN1bHRhbnRzLlRvIGJlZ2luIHdpdGgsIHRoZSBjb21wYW55IGludGVuZHMgdG8gcGFydG5lciB3aXRoIDEwMCBob3NwaXRhbHMgYW5kIDIwLDAwMCBkb2N0b3JzLCBkaWFnbm9zdGljIGNlbnRyZXMsIGFuZCBjbGluaWNzIGJ5IHRoZSBlbmQgb2YgTWFyY2ggMjAxOS5UaGUgaGVhbHRoY2FyZSB2ZXJ0aWNhbCBhbHNvIHBsYW5zIHRvIG9mZmVyIGEgaHVnZSBhcnJheSBvZiBoZWFsdGhjYXJlIHNlcnZpY2VzLCB3aGljaCBpbmNsdWRlcyBpbi1ob3NwaXRhbCBjb25jaWVyZ2Ugc2VydmljZXMgZm9yIGl0cyBoZWFsdGggaW5zdXJhbmNlIGN1c3RvbWVycy5CeSBkb2luZyB0aGlzLCBQb2xpY3liYXphYXIuY29tIHdhbnRzIHRvIGJlIHdpdGggaXRzIGN1c3RvbWVycyBhdCB0aGUgbW9tZW50IG9mIHRydXRoLCB3aGljaCBpcyBhdCB0aGUgdGltZSBvZiBjbGFpbXMuXG5cdFx0XHRcdFx0XHRcdCAgXCJPdXIgZm9yYXkgaW50byB0aGUgaGVhbHRoY2FyZSBzZXJ2aWNlcyBzcGFjZSBpcyBpbiBzeW5jIHdpdGggdGhlIHZpc2lvbiBvZiBleHBhbmRpbmcgdGhlIHNvY2lhbCBzZWN1cml0eSBuZXQgb2YgSW5kaWEuIFdpdGggdGhpcyB2ZW50dXJlLCB3ZSBzZWVrIHRvIGZ1bGZpbGwgdGhlIG5lZWQgb2YgcHJvdmlkaW5nIHF1YWxpdHkgYW5kIGFmZm9yZGFibGUgaGVhbHRoY2FyZSBvZiB0aGUgYnVyZ2VvbmluZyBwb3B1bGF0aW9uIGF0IGxhcmdlIGJ5IGNvbm5lY3RpbmcgdGhlIGNvbnN1bWVycyB3aXRoIG91ciBpbi1ob3VzZSBtZWRpY2FsIHByYWN0aXRpb25lcnMuIFRoZSBuZXcgcG9ydGFsIHdpbGwgZmFjaWxpdGF0ZSB0aGUgY3JlYXRpb24gb2YgYW4gaW5jbHVzaXZlIGhlYWx0aGNhcmUgc3lzdGVtLCB3aGljaCB3aWxsIGV2ZW50dWFsbHkgb2ZmZXIgY3VzdG9taXNlZCBvcHRpb25zIGZvciBpbi1wYXRpZW50IGRlcGFydG1lbnQgaW5zdXJhbmNlIGJhc2VkIG9uIGRldGFpbGVkIGFuYWx5c2lzIHVuZGVydGFrZW4gYWZ0ZXIgc3R1ZHlpbmcgY29uc3VtZXIgaGVhbHRoY2FyZSBoYWJpdHMgYW5kIHBhdGllbnQncyBpbnRlcmFjdGlvbnMgd2l0aCB0aGUgZG9jdG9ycyxcIiBzYWlkIFlhc2hpc2ggRGFoaXlhLCBjby1mb3VuZGVyIGFuZCBDRU8sIFBvbGljeWJhemFhci5jb20uSW4gdGhlIGxvbmcgcnVuLCBQb2xpY3lCYXphYXIuY29tIHdhbnRzIHRvIG9mZmVyIGl0cyBjdXN0b21lcnMgYSBiZXR0ZXIgYW5kIHBlcnNvbmFsaXNlZCBjbGFpbSBhbmQgaW4taG9zcGl0YWwgZXhwZXJpZW5jZS5Qb2xpY3liYXphYXIgaXMgYWxzbyBnb2luZyB0byB3b3JrIHdpdGggaW5zdXJlcnMgdG8gY3JlYXRlIGEgbmV3IGNhdGVnb3J5IG9mIGhlYWx0aCBpbnN1cmFuY2UgZm9yIE91dC1wYXRpZW50IGV4cGVuc2VzIChPUEQpIGFuZCBwcm92aWRlIGZyZWUgb25saW5lIG1lZGljYWwgY29uc3VsdGF0aW9uIHRvIGNvbnN1bWVycyBvdmVyIHBob25lIGFuZCBjaGF0LlxuXHRcdFx0XHRcdFx0XHQgIFBvbGljeWJhemFhci5jb20gaXMgaW4gZGlzY3Vzc2lvbnMgd2l0aCBpbnN1cmFuY2UgY29tcGFuaWVzIHRvIG9mZmVyIGEgZmlyc3Qgb2YgaXRzIGtpbmQgT1BEIGluc3VyYW5jZSBwcm9kdWN0LlxuICAgICAgICAgICAgICAgIFRoZSBjb21wYW55IGFpbXMgdG8gb2ZmZXIgNSBtaWxsaW9uIE9QRCBjb25zdWx0YXRpb25zIGJ5IG5leHQgRlkuPC9wPlxuXHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIm1lZGlhLWljb25zLWRpdlwiPlxuXHRcdFx0XHRcdFx0XHRcdDxhIGhyZWY9XCJodHRwOi8vd3d3LmluZGlhLmNvbS9uZXdzL2FnZW5jaWVzL3BvbGljeWJhemFhci1jb20tdG8tZm9yYXktaW50by1oZWFsdGhjYXJlLXRlY2gtc2VydmljZS1zcGFjZS0zMTA4NzM5L1wiIHJlbD1cIm5vZm9sbG93XCIgdGFyZ2V0PVwiX2JsYW5rXCI+PGltZyBzcmM9XCIvYXNzZXRzL2ltZy9tZWRpYS9pbmQtYmx3aC5wbmdcIiBvbm1vdXNlb3Zlcj1cInRoaXMuc3JjPScvYXNzZXRzL2ltZy9tZWRpYS9pbmQtY29sb3IucG5nJ1wiIG9ubW91c2VvdXQ9XCJ0aGlzLnNyYz0nL2Fzc2V0cy9pbWcvbWVkaWEvaW5kLWJsd2gucG5nJ1wiIC8+PC9hPlxuXHRcdFx0XHRcdFx0XHRcdDxhIGhyZWY9XCJodHRwOi8vd3d3LmFicGxpdmUuaW4vYnVzaW5lc3MvcG9saWN5YmF6YWFyLWNvbS10by1mb3JheS1pbnRvLWhlYWx0aGNhcmUtYW5kLXRlY2gtc2VydmljZXMtNjc2ODY0XCIgcmVsPVwibm9mb2xsb3dcIiB0YXJnZXQ9XCJfYmxhbmtcIj48aW1nIHNyYz1cIi9hc3NldHMvaW1nL21lZGlhL2FicC1ibHdoLnBuZ1wiIG9ubW91c2VvdmVyPVwidGhpcy5zcmM9Jy9hc3NldHMvaW1nL21lZGlhL2FicC1jb2xvci5wbmcnXCIgb25tb3VzZW91dD1cInRoaXMuc3JjPScvYXNzZXRzL2ltZy9tZWRpYS9hYnAtYmx3aC5wbmcnXCIgLz48L2E+XG5cdFx0XHRcdFx0XHRcdFx0PGEgaHJlZj1cImh0dHBzOi8vaGVhbHRoLmVjb25vbWljdGltZXMuaW5kaWF0aW1lcy5jb20vbmV3cy9oZWFsdGgtaXQvcG9saWN5YmF6YWFyLWNvbS10by1mb3JheS1pbnRvLWhlYWx0aGNhcmUtdGVjaC82MzU3Nzk4M1wiIHJlbD1cIm5vZm9sbG93XCIgdGFyZ2V0PVwiX2JsYW5rXCI+PGltZyBzcmM9XCIvYXNzZXRzL2ltZy9tZWRpYS9ldC1ibHdoLnBuZ1wiIG9ubW91c2VvdmVyPVwidGhpcy5zcmM9Jy9hc3NldHMvaW1nL21lZGlhL2V0LWNvbG9yLnBuZydcIiBvbm1vdXNlb3V0PVwidGhpcy5zcmM9Jy9hc3NldHMvaW1nL21lZGlhL2V0LWJsd2gucG5nJ1wiIC8+PC9hPlxuXHRcdFx0XHRcdFx0XHRcdDxhIGhyZWY9XCJodHRwczovL3d3dy5vdXRsb29raW5kaWEuY29tL25ld3NzY3JvbGwvcG9saWN5YmF6YWFyY29tLXRvLWZvcmF5LWludG8taGVhbHRoY2FyZS10ZWNoLXNlcnZpY2Utc3BhY2UvMTMyOTE4MVwiIHJlbD1cIm5vZm9sbG93XCIgdGFyZ2V0PVwiX2JsYW5rXCI+PGltZyBzcmM9XCIvYXNzZXRzL2ltZy9tZWRpYS9vdXQtYmx3aC5wbmdcIiBvbm1vdXNlb3Zlcj1cInRoaXMuc3JjPScvYXNzZXRzL2ltZy9tZWRpYS9vdXQtY29sb3IucG5nJ1wiIG9ubW91c2VvdXQ9XCJ0aGlzLnNyYz0nL2Fzc2V0cy9pbWcvbWVkaWEvb3V0LWJsd2gucG5nJ1wiIC8+PC9hPlxuXHRcdFx0XHRcdFx0XHRcdDxhIGhyZWY9XCJodHRwczovL3d3dy5kZWNjYW5jaHJvbmljbGUuY29tL2J1c2luZXNzL2NvbXBhbmllcy8wMjA0MTgvcG9saWN5YmF6YWFyY29tLXRvLWZvcmF5LWludG8taGVhbHRoY2FyZS10ZWNobm9sb2d5Lmh0bWxcIiByZWw9XCJub2ZvbGxvd1wiIHRhcmdldD1cIl9ibGFua1wiPjxpbWcgc3JjPVwiL2Fzc2V0cy9pbWcvbWVkaWEvZGMtYmx3aC5wbmdcIiBvbm1vdXNlb3Zlcj1cInRoaXMuc3JjPScvYXNzZXRzL2ltZy9tZWRpYS9kYy1jb2xvci5wbmcnXCIgb25tb3VzZW91dD1cInRoaXMuc3JjPScvYXNzZXRzL2ltZy9tZWRpYS9kYy1ibHdoLnBuZydcIiAvPjwvYT5cblx0XHRcdFx0XHRcdFx0XHQ8YSBocmVmPVwiaHR0cHM6Ly93d3cuZ2FkZ2V0c25vdy5jb20vdGVjaC1uZXdzL3BvbGljeWJhemFhci10by1lbnRlci1oZWFsdGhjYXJlLXRlY2gtYW5kLXNlcnZpY2VzLXNwYWNlL2FydGljbGVzaG93LzYzMjY1Nzk4LmNtc1wiIHJlbD1cIm5vZm9sbG93XCIgdGFyZ2V0PVwiX2JsYW5rXCI+PGltZyBzcmM9XCIvYXNzZXRzL2ltZy9tZWRpYS9nbi1ibHdoLnBuZ1wiIG9ubW91c2VvdmVyPVwidGhpcy5zcmM9Jy9hc3NldHMvaW1nL21lZGlhL2duLWNvbG9yLnBuZydcIiBvbm1vdXNlb3V0PVwidGhpcy5zcmM9Jy9hc3NldHMvaW1nL21lZGlhL2duLWJsd2gucG5nJ1wiIC8+PC9hPlxuXHRcdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJtZWRpYS1kaXYtY2FyZFwiPlxuXHRcdFx0XHRcdFx0XHQ8cCBjbGFzc05hbWU9XCJtZWRpYS1jYXJkLWhlYWRpbmdcIj5OZXcgdmVudHVyZSBwcm9tb3RlZCB0byBvZmZlciBmcmVlIG9ubGluZSAmYW1wOyBvdmVyIHBob25lIG1lZGljYWwgY29uc3VsdGF0aW9uczwvcD5cblx0XHRcdFx0XHRcdFx0PHAgY2xhc3NOYW1lPVwibWVkaWEtY2FyZC1kYXRlXCI+MTMgSnVuZSwgMjAxODwvcD5cblx0XHRcdFx0XHRcdFx0PHAgY2xhc3NOYW1lPVwibWVkaWEtY2FyZC1jb250ZW50IGNvbnRlbnQtc2hvd25cIj5ZYXNoaXNoIERhaGl5YSwgQ28tZm91bmRlciAmYW1wOyBDRU8sIFBvbGljeUJhemFhciBHcm91cCBvZiBDb21wYW5pZXMgc2FpZDogXCJXZSB3aWxsIGJlIGJ1aWxkaW5nIGEgdGVhbSBvZiBjZXJ0aWZpZWQgYW5kIHF1YWxpdHkgbWVkaWNhbCBwcm9mZXNzaW9uYWxzIHRvIGdpdmUgZnJlZSBvbmxpbmUgY29uc3VsdGF0aW9ucyB0byBjdXN0b21lcnMuIFRoaXMgc2hhbGwgYmUgc3VwcG9ydGVkIGJ5IGEgcm9idXN0IG9mZmxpbmUgbmV0d29yazwvcD5cblx0XHRcdFx0XHRcdFx0PHAgY2xhc3NOYW1lPVwibWVkaWEtY2FyZC1jb250ZW50IGNvbnRlbnQtaGlkZGVuXCI+QUkgd2lsbCBwbGF5IGEga2V5IHJvbGUgaW4gaGVscGluZyB1cyBidWlsZCB0aGlzIGluIHNjYWxlIGFuZCBlZmZpY2llbmN5LkVUZWNoQWNlcyBNYXJrZXRpbmcgJmFtcDsgQ29uc3VsdGluZyBQdnQuIChFVGVjaEFjZXPigJ0pLCB3aGljaCBvd25zIEluZGlh4oCZcyBsZWFkaW5nIGluc3VydGVjaCBicmFuZCwgUG9saWN5QmF6YWFyLmNvbSjigJxQb2xpY3lCYXphYXLigJ0pIGFuZCBJbmRpYeKAmXMgbGVhZGluZyBsZW5kaW5nIG1hcmtldHBsYWNlLCBQYWlzYUJhemFhci5jb20gKOKAnFBhaXNhQmF6YWFy4oCdKSwgaGFzIGZsb2F0ZWQgYW5vdGhlciBmYXJtIGBkb2NwcmltZScgZm9yIGZvcmF5aW5nIGludG8gdGhlIGhlYWx0aGNhcmUgdGVjaCBhbmQgc2VydmljZSBzcGFjZS5BcyBwYXJ0IG9mIGl0cyBwbGFucyB0byBjYXB0dXJlIHRoZSBvdXQgb2YgcG9ja2V0IGhlYWx0aGNhcmUgbWFya2V0IGluIEluZGlhIGVzdGltYXRlZCBhdCBuZWFybHkgJDEwMCtibiwgdGhlIG5ldyB2ZW50dXJlICB3aWxsIHByb3ZpZGUgZnJlZSBvbmxpbmUgYW5kIG92ZXIgcGhvbmUgbWVkaWNhbCBjb25zdWx0YXRpb25zLCB0byBiZWdpbiB3aXRoLiBJdCBhaW1zIHRvIHByb3ZpZGUgMSBtaWxsaW9uIGZyZWUgbWVkaWNhbCBjb25zdWx0YXRpb25zIGJ5IE1hcmNoIDIwMTkgYW5kIHJlYWNoIHRoZSBzY2FsZSBvZiA1IG1pbGxpb24gYnkgTWFyY2ggMjAyMC5cblx0XHRcdFx0XHRcdFx0ICBTcGVha2luZyBvbiB0aGUgbGF0ZXN0IHZlbnR1cmUsIFlhc2hpc2ggRGFoaXlhLCBDby1mb3VuZGVyICZhbXA7IENFTywgUG9saWN5QmF6YWFyIEdyb3VwIG9mIENvbXBhbmllcyBzYWlkOiBcIldlIHdpbGwgYmUgYnVpbGRpbmcgYSB0ZWFtIG9mIGNlcnRpZmllZCBhbmQgcXVhbGl0eSBtZWRpY2FsIHByb2Zlc3Npb25hbHMgdG8gZ2l2ZSBmcmVlIG9ubGluZSBjb25zdWx0YXRpb25zIHRvIGN1c3RvbWVycy4gVGhpcyBzaGFsbCBiZSBzdXBwb3J0ZWQgYnkgYSByb2J1c3Qgb2ZmbGluZSBuZXR3b3JrLiBBSSB3aWxsIHBsYXkgYSBrZXkgcm9sZSBpbiBoZWxwaW5nIHVzIGJ1aWxkIHRoaXMgaW4gc2NhbGUgYW5kIGVmZmljaWVuY3kuIE91ciB2aXNpb24gaXMgdG8gY2hhbmdlIGN1c3RvbWVyIGJlaGF2aW9yIGluIHRoZSBoZWFsdGhjYXJlIHNwYWNlIGJ5IG1ha2luZyB0aGUgY29uc3VtZXIgc2hpZnQgdG8gb25saW5lIG1lZGljYWwgY29uc3VsdGF0aW9uIGZyb20gb2ZmbGluZSBieSBidWlsZGluZyBhbiBlYXN5IHRvIHVzZSwgY29udmVuaWVudCBhbmQgdHJ1c3R3b3J0aHkgc29sdXRpb24uIFdlIGJlbGlldmUgdGhhdCBoZWFsdGhjYXJlIHNwYWNlIGhhcyBodWdlIHBvdGVudGlhbCB0byBkaXNydXB0LCBhbmQgY2FuIGZvbGxvdyB0aGUgc2FtZSBncm93dGggdHJhamVjdG9yeSBhcyB0aGUgZGlnaXRhbCBpbnN1cmFuY2Ugc3BhY2Ugd2hpY2ggaW5pdGlhbGx5IGZhY2VkIGEgc2ltaWxhciBraW5kIG9mIGNvbnN1bWVyIGluZXJ0aWEgdGhhdCB0aGlzIHNwYWNlIGZhY2VzLlwiXG4gICAgICAgICAgICAgICAgSW5kaWEgaGFzIG9uZSBvZiB0aGUgbG93ZXN0IHJhdGlvcyBmb3IgYSBkb2N0b3IgcGVyIDEsMDAwIHBlb3BsZSBhbW9uZ3N0IHRoZSBkZXZlbG9waW5nIGNvdW50cmllcy4gSGF2aW5nIGEgcGh5c2ljYWwgaW50ZXJhY3Rpb24gd2l0aCBhIG1lZGljYWwgcHJhY3RpdGlvbmVyIGlzIG5vdCBvbmx5IGEgdGltZS1jb25zdW1pbmcgcHJvY2VzcyBidXQgYWxzbyBhbiBleHBlbnNpdmUgb25lLCBlc3BlY2lhbGx5IGluIHRoZSBwcml2YXRlIHNlY3Rvci4gRXZlbiB0aG91Z2ggZ292ZXJubWVudCBob3NwaXRhbHMgYW5kIHN0YXRlLXJ1biBoZWFsdGggY2VudGVycyBvZmZlciBjb25zdWx0YXRpb25zIGVpdGhlciBmcmVlIG9mIGNvc3Qgb3IgYXQgc3Vic2lkaXplZCBwcmljaW5nLCBpdCdzIG5vdCBlYXN5IHRvIGdldCBhbiBhY2Nlc3MgdG8gdGhlc2Ugc2VydmljZXMuPC9wPlxuXHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIm1lZGlhLWljb25zLWRpdlwiPlxuXHRcdFx0XHRcdFx0XHRcdDxhIGhyZWY9XCJodHRwOi8vd3d3LmFzaWFpbnN1cmFuY2Vwb3N0LmNvbS9oZWFsdGgvcG9saWN5YmF6YWFycy1wcm9tb3Rlci1vZmZlci1mcmVlLW9ubGluZS1tZWRpY2FsLWNvbnN1bHRhdGlvbnNcIiByZWw9XCJub2ZvbGxvd1wiIHRhcmdldD1cIl9ibGFua1wiPjxpbWcgc3JjPVwiL2Fzc2V0cy9pbWcvbWVkaWEvYXNpbnN1cmFuY2UtYmx3aC5wbmdcIiBvbm1vdXNlb3Zlcj1cInRoaXMuc3JjPScvYXNzZXRzL2ltZy9tZWRpYS9hc2luc3VyYW5jZS1jb2xvci5wbmcnXCIgb25tb3VzZW91dD1cInRoaXMuc3JjPScvYXNzZXRzL2ltZy9tZWRpYS9hc2luc3VyYW5jZS1ibHdoLnBuZydcIiAvPjwvYT5cblx0XHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwibWVkaWEtZGl2LWNhcmRcIj5cblx0XHRcdFx0XHRcdFx0PHAgY2xhc3NOYW1lPVwibWVkaWEtY2FyZC1oZWFkaW5nXCI+ZG9jcHJpbWUuY29twqBnZXRzIGludGVybmFsIGZ1bmQgaW5mdXNpb27CoHdvcnRoICQ1MCBtaWxsaW9uIGZyb20gUG9saWN5YmF6YWFyIEdyb3VwPC9wPlxuXG5cdFx0XHRcdFx0XHRcdDxwIGNsYXNzTmFtZT1cIm1lZGlhLWNhcmQtY29udGVudFwiPjxzcGFuIGNsYXNzTmFtZT1cIm1lZGlhLWNhcmQtaGVhZGluZ1wiPkd1cnVncmFtLMKgU2VwdGVtYmVyIDE3LCAyMDE4Ojwvc3Bhbj4mbmJzcDs8YSBocmVmPVwiaHR0cHM6Ly9kb2NwcmltZS5jb21cIiByZWw9XCJub2ZvbGxvd1wiIHRhcmdldD1cIl9ibGFua1wiPmRvY3ByaW1lLmNvbTwvYT4sIHRoZSBsYXRlc3QgaGVhbHRoY2FyZSB2ZW50dXJlIGJ5IEV0ZWNoQWNlcyBNYXJrZXRpbmcgYW5kIENvbnN1bHRpbmcgUHJpdmF0ZSBMaW1pdGVkICjigJxQb2xpY3liYXphYXIgR3JvdXDigJ0pLCBhbm5vdW5jZWQgdGhhdCBpdCBoYXMgcmVjZWl2ZWQgaW5pdGlhbCBpbnRlcm5hbCBmdW5kaW5nIG9mICQ1MCBtaWxsaW9uIGZyb20gdGhlIHBhcmVudCBjb21wYW55LiBUaGUgUG9saWN5YmF6YWFyIEdyb3VwIGFsc28gb3ducyBJbmRpYeKAmXMgbGVhZGluZyBpbnN1cnRlY2ggYnJhbmQgUG9saWN5QmF6YWFyLmNvbSBhbmQgbGVhZGluZyBsZW5kaW5nIG1hcmtldHBsYWNlLCBQYWlzYWJhemFhci5jb20uPC9wPlxuXHRcdFx0XHRcdFx0XHQ8cCBjbGFzc05hbWU9XCJtZWRpYS1jYXJkLWNvbnRlbnRcIj48c3BhbiBjbGFzc05hbWU9XCJtZWRpYS1jYXJkLWhlYWRpbmdcIj5BY2NvcmRpbmcgdG8gWWFzaGlzaCBEYWhpeWEsIENFTyBhbmQgQ28tZm91bmRlciwgUG9saWN5YmF6YWFyIEdyb3VwIG9mIENvbXBhbmllcyw8L3NwYW4+IOKAnEhlYWx0aGNhcmUgc2VjdG9yIGhhcyBhIGxvdCBvZiB1bnRhcHBlZCBwb3RlbnRpYWwgYW5kIGN1cnJlbnRseSwgdGhlIHNlcnZpY2VzIGFyZSBub3QgYWZmb3JkYWJsZSBhbmQgYWNjZXNzaWJsZSBmb3IgYWxsLiBXaXRoIHJpc2luZyBvdXQtb2YtcG9ja2V0IGV4cGVuc2VzLCB0aGVyZeKAmXMgYSBuZWVkIHRvIHByb3ZpZGUgcXVhbGl0eSBoZWFsdGhjYXJlIGF0IGNvbXBldGl0aXZlIHByaWNlcyB0aGF0IGNhbiBiZSBhY2Nlc3NlZCBieSBhbnlvbmUsIGFueXdoZXJlLiBBcyBhIEdyb3VwLCB3ZSB3aG9sZWhlYXJ0ZWRseSBzdXBwb3J0wqBkb2NwcmltZS5jb23igJlzIHZpc2lvbiB0byBwcm92aWRlIGEgY3VzdG9taXplZCBleHBlcmllbmNlIGFuZCBtYXhpbWl6ZSBoZWFsdGggYmVuZWZpdHMgZm9yIGV2ZXJ5b25lLuKAnTwvcD5cblx0XHRcdFx0XHRcdFx0PHAgY2xhc3NOYW1lPVwibWVkaWEtY2FyZC1jb250ZW50XCI+PHNwYW4gY2xhc3NOYW1lPVwibWVkaWEtY2FyZC1oZWFkaW5nXCI+RXhjaXRlZCBhYm91dCB0aGUgaW52ZXN0bWVudCzCoEFzaGlzaCBHdXB0YSwgQ0VPLMKgZG9jcHJpbWUuY29twqBzYWlkLDwvc3Bhbj4gIOKAnFdlIGludGVuZCB0byB1c2UgdGhlIGNhcGl0YWwgaW4gcHJvdmlkaW5nIHNlYW1sZXNzIHVzZXIgZXhwZXJpZW5jZSBhbmQgYnJpbmdpbmcgaW5ub3ZhdGlvbiBpbiB0aGUgaGVhbHRoY2FyZSBzcGFjZS4gT3VyIGZvY3VzIGlzIHRvIG1ha2UgdGhlIHNlcnZpY2VzIG1vcmUgY3VzdG9tZXItZnJpZW5kbHkgZHJpdmVuIGJ5IHRyYW5zcGFyZW5jeSwgdHJ1c3QgYW5kIHN1c3RhaW5hYmlsaXR5LsKgV2UgYXJlIGJyaW5naW5nIGlubm92YXRpb24gdGhyb3VnaCB1c2Ugb2YgdmFyaW91cyB0ZWNobm9sb2d5IHRvb2xzIGxpa2UgQUksIGRhdGEgc2NpZW5jZSBhbmQgZGVlcCBhbmFseXRpY3Mu4oCdPC9wPlxuXHRcdFx0XHRcdFx0XHQ8cCBjbGFzc05hbWU9XCJtZWRpYS1jYXJkLWNvbnRlbnRcIj48c3BhbiBjbGFzc05hbWU9XCJtZWRpYS1jYXJkLWhlYWRpbmdcIj5IZSBmdXJ0aGVyIGFkZGVkLDwvc3Bhbj5cIk91ciBjb3JlIG9mZmVyaW5ncyBpbmNsdWRlIGZyZWUgY29uc3VsdGF0aW9uIHNlcnZpY2VzIHRocm91Z2ggY2hhdCBhbmQgcGhvbmUgZnJvbSBvdXIgaW4taG91c2UgZG9jdG9ycywgYW5kIGRpc2NvdW50ZWTCoGRvY3RvciBhbmQgbGFiIGFwcG9pbnRtZW50IGJvb2tpbmdzwqB0byBlbmNvdXJhZ2UgY29uc3VtZXJzIGluIHNlZWtpbmcgZXhwZXJ0IG1lZGljYWwgYWR2aWNlIGFuZCBnZXR0aW5nIHJpZ2h0IHNvbHV0aW9ucyBpbiBhIHRpbWVseSBtYW5uZXIuwqBTb29uLCB3ZSB3aWxsIGFsc28gYnJpbmcgYSB1bmlxdWUgT1BEIHN1YnNjcmlwdGlvbi1iYXNlZCBwcm9kdWN0LCB3aGljaCB3aWxsIGNvdmVyIHVubGltaXRlZCBjb25zdWx0YXRpb25zIGFuZCBkaWFnbm9zdGljIHRlc3RzLlwiPC9wPlxuXHRcdFx0XHRcdFx0XHQ8cCBjbGFzc05hbWU9XCJtZWRpYS1jYXJkLWNvbnRlbnRcIj5kb2NwcmltZS5jb23CoGhhcyB0aWVkLXVwIHdpdGggMTQsMDAwIGRvY3RvcnMgYW5kIDUsMDAwIGRpYWdub3N0aWMgbGFicyBhdCBwcmVzZW50IGFuZCBhaW1zIHRvIGV4cGFuZCBpdHMgbmV0d29yayB0byAxLDUwLDAwMCBkb2N0b3JzIGFuZCAyMCwwMDAgbGFicyBhY3Jvc3MgMTAwKyBjaXRpZXMuIEN1cnJlbnRseSwgYXBwb2ludG1lbnRzIGNhbiBiZSBib29rZWQgd2l0aCBkb2N0b3JzIGFuZCBsYWJzIGJhc2VkIGluIERlbGhpLU5DUiBidXQgZnJvbSBuZXh0IG1vbnRoIG9ud2FyZHMsIHRoZSBmYWNpbGl0eSB3aWxsIGJlIG1hZGUgYXZhaWxhYmxlIGFjcm9zcyBhbGwgbWFqb3IgY2l0aWVzIGluY2x1ZGluZyBNdW1iYWksIEJhbmdhbG9yZSwgSHlkZXJhYmFkICYgQ2hlbm5hacKgPC9wPlxuXHRcdFx0XHRcdFx0XHQ8cCBjbGFzc05hbWU9XCJtZWRpYS1jYXJkLWNvbnRlbnRcIj48c3BhbiBjbGFzc05hbWU9XCJtZWRpYS1jYXJkLWhlYWRpbmdcIj5BYm91dMKgZG9jcHJpbWUuY29tPC9zcGFuPjwvcD5cblx0XHRcdFx0XHRcdFx0PHAgY2xhc3NOYW1lPVwibWVkaWEtY2FyZC1jb250ZW50XCI+ZG9jcHJpbWUuY29twqBpcyB0aGUgbGF0ZXN0IHZlbnR1cmUgYnkgdGhlIFBvbGljeWJhemFhciBHcm91cCB3aXRoIGFuIGFpbSB0byByZWRlZmluZSBob3cgSW5kaWFucyBzZWVrIGhlYWx0aGNhcmUgc2VydmljZXMuIEl0IGNvbm5lY3RzIHBhdGllbnRzIHdpdGggZG9jdG9ycyBpbiByZWFsIHRpbWUgYW5kIGJyaWRnZXMgdGhlIGdhcCBiZXR3ZWVuIG5lZWQgYW5kIGZ1bGZpbGxtZW50IHVzaW5nIHN0YXRlLW9mLXRoZS1hcnQgdGVjaG5vbG9neSBhbmQgYSByb2J1c3Qgb2ZmbGluZSBuZXR3b3JrLiBCZXNpZGVzIHByb3ZpZGluZyBmcmVlIGNvbnN1bHRhdGlvbiBvbiBjaGF0IGFuZCBwaG9uZSBieSBpbi1ob3VzZSB0ZWFtIG9mIGhlYWx0aCBleHBlcnRzLCBpdCBhbHNvIGZhY2lsaXRhdGVzIGJvb2tpbmcgb2YgZG9jdG9yIGFwcG9pbnRtZW50cyBhbmQgbGFiIHRlc3RzIGF0IGRpc2NvdW50ZWQgcmF0ZXMgYW5kIHdpbGwgc29vbiBiZSBnaXZpbmcgdGhlIG9wdGlvbiBvZiBPUEQgc3Vic2NyaXB0aW9uIHBhY2thZ2VzIHdpdGggdW5saW1pdGVkIGNvbnN1bHRhdGlvbnMgYW5kIHRlc3RzLiBUaGUgY29tcGFueSBpcyB0YXJnZXRpbmcgMSBtaWxsaW9uIGZyZWUgbWVkaWNhbCBjb25zdWx0YXRpb25zIGJ5IE1hcmNoIDIwMTkgYW5kIHVwIHRvIDUgbWlsbGlvbiBieSBNYXJjaCAyMDIwLjwvcD5cblx0XHRcdFx0XHRcdFx0PHAgY2xhc3NOYW1lPVwibWVkaWEtY2FyZC1jb250ZW50XCI+PHNwYW4gY2xhc3NOYW1lPVwibWVkaWEtY2FyZC1oZWFkaW5nXCI+QWJvdXQgRVRlY2hBY2VzwqBNYXJrZXRpbmcgJiBDb25zdWx0aW5nIFB2dC4gTHRkLjwvc3Bhbj48L3A+XG5cdFx0XHRcdFx0XHRcdDxwIGNsYXNzTmFtZT1cIm1lZGlhLWNhcmQtY29udGVudFwiPkVUZWNoQWNlcyBpcyB0aGUgcGFyZW50IGNvbXBhbnkgdGhhdCBob2xkcyBJbmRpYeKAmXMgbGVhZGluZyBpbnN1cnRlY2ggYnJhbmQsIFBvbGljeWJhemFhci5jb20gYW5kIGxlYWRpbmcgbGVuZGluZyBtYXJrZXRwbGFjZSwgUGFpc2FiYXphYXIuY29tLiBUaGUgY29tcGFueSBoYXMgYmFja2luZyBmcm9tIGEgaG9zdCBvZiBpbnZlc3RvcnMgaW5jbHVkaW5nIHRoZSBsaWtlcyBvZiBTb2Z0YmFuaywgVGVtYXNlaywgVGlnZXIgR2xvYmFsIE1hbmFnZW1lbnQsIFRydWUgTm9ydGgsIEluZm9FZGdlIChOYXVrcmkuY29tKSwgUHJlbWppIEludmVzdCwgYmVzaWRlcyBpbnZlc3RtZW50cyBmcm9tIG90aGVyIFBFIGZ1bmRzIGFuZCBmYW1pbHkgb2ZmaWNlcy48L3A+XG5cdFx0XHRcdFx0XHRcdDxwIGNsYXNzTmFtZT1cIm1lZGlhLWNhcmQtY29udGVudFwiPkVUZWNoQWNlcyBzdGFydGVkIFBvbGljeWJhemFhci5jb20gd2l0aCBhIHB1cnBvc2UgdG8gZWR1Y2F0ZSBwZW9wbGUgb24gaW5zdXJhbmNlIHByb2R1Y3RzIGFuZCBoYXMgdHJhbnNmb3JtZWQgdGhlIHdheSBob3cgaW5zdXJhbmNlIGlzIGJvdWdodCBpbiB0aGUgY291bnRyeS4gRnJvbSByZWNlaXZpbmcgdHJhZmZpYyBvZiAxODAsMDAwIHZpc2l0b3JzIGluIDIwMDgsIFBvbGljeWJhemFhci5jb20gaGFzIGNvbWUgYSBsb25nIHdheSBhbmQgdG9kYXksIGhvc3RzIG92ZXIgMTAwIG1pbGxpb24gdmlzaXRvcnMgeWVhcmx5IGFuZCByZWNvcmRzIHNhbGUgb2YgbmVhcmx5IDMwMCwwMDAgdHJhbnNhY3Rpb25zIGEgbW9udGguIEN1cnJlbnRseSwgUG9saWN5YmF6YWFyLmNvbSBhY2NvdW50cyBmb3IgbmVhcmx5IDI1JSBvZiBJbmRpYeKAmXMgbGlmZSBjb3Zlci48L3A+XG5cdFx0XHRcdFx0XHRcdDxwIGNsYXNzTmFtZT1cIm1lZGlhLWNhcmQtY29udGVudFwiPkluIDIwMTQsIEVUZWNoQWNlcyBzdGFydGVkIFBhaXNhYmF6YWFyLmNvbSwgYW4gb25saW5lIGZpbmFuY2lhbCBtYXJrZXRwbGFjZSBmb3IgaW52ZXN0bWVudCBhbmQgbGVuZGluZyBwcm9kdWN0cy4gVG9kYXksIFBhaXNhYmF6YWFyLmNvbSBpcyBJbmRpYeKAmXMgbGFyZ2VzdCBvbmxpbmUgZmluYW5jaWFsIG1hcmtldHBsYWNlIGZvciBsb2FucyBhbmQgY3JlZGl0IGNhcmRzLiBJdCBoYXMgY29sbGFib3JhdGVkIHdpdGggbW9yZSB0aGFuIDc1IHBhcnRuZXJzIGFjcm9zcyBsZW5kaW5nIGFuZCBpbnZlc3RtZW50IGNhdGVnb3JpZXMgd2l0aCAzMDArIHByb2R1Y3RzIG9uIG9mZmVyLsKgwqA8L3A+XG5cdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNvbC1sZy0zIGNvbC0xMlwiPlxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJtZWRpYS1zdGlja3ktZGl2XCI+XG5cdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwidHdpdHRlci1mZWVkXCI+XG5cdFx0XHRcdFx0XHRcdFx0PGEgY2xhc3M9XCJ0d2l0dGVyLXRpbWVsaW5lXCIgcmVsPVwibm9mb2xsb3dcIiBocmVmPVwiaHR0cHM6Ly90d2l0dGVyLmNvbS9Eb2NQcmltZUluZGlhP3JlZl9zcmM9dHdzcmMlNUV0ZndcIj5Ud2VldHMgYnkgZG9jcHJpbWVJbmRpYTwvYT4gPHNjcmlwdCBhc3luYyBzcmM9XCJodHRwczovL3BsYXRmb3JtLnR3aXR0ZXIuY29tL3dpZGdldHMuanNcIiBjaGFyc2V0PVwidXRmLThcIj48L3NjcmlwdD5cblx0XHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiZmFjZWJvb2stZmVlZFwiPlxuXHRcdFx0XHRcdFx0XHRcdDxpZnJhbWUgc3JjPVwiaHR0cHM6Ly93d3cuZmFjZWJvb2suY29tL3BsdWdpbnMvcGFnZS5waHA/aHJlZj1odHRwcyUzQSUyRiUyRnd3dy5mYWNlYm9vay5jb20lMkZEb2NQcmltZUluZGlhJnRhYnM9dGltZWxpbmUmd2lkdGg9MzQwJmhlaWdodD01MDAmc21hbGxfaGVhZGVyPXRydWUmYWRhcHRfY29udGFpbmVyX3dpZHRoPXRydWUmaGlkZV9jb3Zlcj10cnVlJnNob3dfZmFjZXBpbGU9dHJ1ZSZhcHBJZFwiIHdpZHRoPXszNDB9IGhlaWdodD17NTAwfSBzdHlsZT17eyBib3JkZXI6ICdub25lJywgb3ZlcmZsb3c6ICdoaWRkZW4nIH19IHNjcm9sbGluZz1cIm5vXCIgZnJhbWVCb3JkZXI9ezB9IGFsbG93VHJhbnNwYXJlbmN5PVwidHJ1ZVwiIGFsbG93PVwiZW5jcnlwdGVkLW1lZGlhXCIgLz5cblx0XHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNvbC0xMiBjb2wtbGctMyBkLWxnLW5vbmVcIj5cblx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwibWVkaWEtc3RpY2t5LWRpdlwiPlxuXHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIm1lZGlhLWNvbnRhY3QtZGl2XCI+XG5cdFx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJtZWRpYS1jb250YWN0LWxhYmVsLWRpdlwiPlxuXHRcdFx0XHRcdFx0XHRcdFx0PHAgY2xhc3NOYW1lPVwibWVkaWEtY29udGFjdC1sYWJlbFwiPkNvbnRhY3QgVXM8L3A+XG5cdFx0XHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJtZWRpYS1jb250YWN0LWl0ZW1zLWRpdlwiPlxuXHRcdFx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJtZWRpYS1jb250YWN0LWl0ZW1cIj5cblx0XHRcdFx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJtZWRpYS1jb250YWN0LXN1Yml0ZW1cIj5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8aW1nIHNyYz1cIi9hc3NldHMvaW1nL21lZGlhL2VtYWlsLWljb24uc3ZnXCIgc3R5bGU9e3sgdmVydGljYWxBbGlnbjogJ21pZGRsZScgfX0gY2xhc3NOYW1lPVwibWVkaWEtY29udGFjdC1pY29uXCIgLz5cblx0XHRcdFx0XHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwibWVkaWEtY29udGFjdC1zdWJpdGVtXCI+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0PHAgY2xhc3NOYW1lPVwibWVkaWEtY29udGFjdC10ZXh0XCI+bWVkaWFAZG9jcHJpbWUuY29tPC9wPlxuXHRcdFx0XHRcdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJtZWRpYS1jb250YWN0LWl0ZW0gbWVkaWEtbG9jYXRpb24taXRlbVwiPlxuXHRcdFx0XHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIm1lZGlhLWNvbnRhY3Qtc3ViaXRlbSBtZWRpYS1sb2NhdGlvbi1zdWJpdGVtXCI+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0PGltZyBzcmM9XCIvYXNzZXRzL2ltZy9tZWRpYS9tZWRpYS1sb2Muc3ZnXCIgY2xhc3NOYW1lPVwibWVkaWEtY29udGFjdC1pY29uXCIgLz5cblx0XHRcdFx0XHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwibWVkaWEtY29udGFjdC1zdWJpdGVtXCI+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0PHAgY2xhc3NOYW1lPVwibWVkaWEtY29udGFjdC10ZXh0XCI+UGxvdCBubzwvcD5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8cCBjbGFzc05hbWU9XCJtZWRpYS1jb250YWN0LXRleHRcIj4xMTksIFNlY3RvciA0NDwvcD5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8cCBjbGFzc05hbWU9XCJtZWRpYS1jb250YWN0LXRleHRcIj5HdXJ1Z3JhbSAtIDEyMjAwMTwvcD5cblx0XHRcdFx0XHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgTWVkaWFcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgSGVsbWV0VGFncyBmcm9tICcuLi9IZWxtZXRUYWdzJ1xuXG5jbGFzcyBQcml2YWN5IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcblxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lciBhYm91dC1jb250YWluZXJcIj5cbiAgICAgICAgICAgICAgICA8SGVsbWV0VGFncyB0YWdzRGF0YT17e1xuICAgICAgICAgICAgICAgICAgICB0aXRsZTogKCdQcml2YWN5IFBvbGljeSB8IGRvY3ByaW1lJyksXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAoJ1RoZSBwb2xpY3kgaXMgZWZmZWN0aXZlIGZyb20gdGhlIGRhdGUgYW5kIHRpbWUgYSB1c2VyIHJlZ2lzdGVycyB3aXRoIGRvY3ByaW1lIGJ5IGZpbGxpbmcgdXAgdGhlIFJlZ2lzdHJhdGlvbiBmb3JtIGFuZCBhY2NlcHRpbmcgdGhlIHRlcm1zIGFuZCBjb25kaXRpb25zLicpXG4gICAgICAgICAgICAgICAgfX0gLz5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC0xMiB0ZXh0LWNlbnRlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwiZnctNTAwIGFib3V0LWhlYWRpbmdcIiBzdHlsZT17eyBtYXJnaW5Cb3R0b206IDIwIH19PlByaXZhY3kgUG9saWN5PC9wPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC0xMiBwcml2YWN5LWRlc2MtZGl2XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJwcml2YWN5LWRlc2NcIj5kb2NwcmltZS5jb20gKOKAnFdlYnNpdGUvTW9iaWxlIEFwcGxpY2F0aW9u4oCdKSBvcGVyYXRlZCBieSBkb2NwcmltZSBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICjigJxDb21wYW55L3dlL3Vz4oCdKSByZWNvZ25pemVzIHRoZSBpbXBvcnRhbmNlIG9mIG1haW50YWluaW5nIHlvdXIgcHJpdmFjeS4gVGhlIENvbXBhbnkgaXNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY29tbWl0dGVkIHRvIG1haW50YWluIHRoZSBjb25maWRlbnRpYWxpdHksIGludGVncml0eSBhbmQgc2VjdXJpdHkgb2YgYWxsIGluZm9ybWF0aW9uIG9mIG91ciB1c2Vycy5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgVGhpcyBQcml2YWN5IFBvbGljeSBleHBsYWlucyBob3cgd2UgY29sbGVjdCwgdXNlLCBzaGFyZSwgZGlzY2xvc2UgYW5kIHByb3RlY3QgUGVyc29uYWwgaW5mb3JtYXRpb25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgYWJvdXQgdGhlIFVzZXJzIG9mIHRoZSBTZXJ2aWNlcywgaW5jbHVkaW5nIGFuZCB0aGUgdmlzaXRvcnMgb2YgV2Vic2l0ZSAoam9pbnRseSBhbmQgc2V2ZXJhbGx5IHJlZmVycmVkXG4gICAgICAgICAgICAgIHRvIGFzIOKAnHlvdeKAnSBvciDigJxVc2Vyc+KAnSBpbiB0aGlzIFByaXZhY3kgUG9saWN5KS48L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJwcml2YWN5LWRlc2NcIj5UaGlzIFByaXZhY3kgUG9saWN5IGlzIHB1Ymxpc2hlZCBpbiBjb21wbGlhbmNlIG9mIHRoZSAoSW5kaWFuKSBJbmZvcm1hdGlvbiBUZWNobm9sb2d5IEFjdCwgMjAwMCBhbmRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdGhlIHJ1bGVzLCByZWd1bGF0aW9ucywgZ3VpZGVsaW5lcyBhbmQgY2xhcmlmaWNhdGlvbnMgZnJhbWVkIHRoZXJldW5kZXIsIGluY2x1ZGluZyB0aGUgKEluZGlhbilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgSW5mb3JtYXRpb24gVGVjaG5vbG9neSAoUmVhc29uYWJsZSBTZWN1cml0eSBQcmFjdGljZXMgYW5kIFByb2NlZHVyZXMgYW5kIFNlbnNpdGl2ZSBQZXJzb25hbFxuICAgICAgICAgICAgICBJbmZvcm1hdGlvbikgUnVsZXMsIDIwMTEgKFNQSSBSdWxlcykuPC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwicHJpdmFjeS1kZXNjXCI+UGxlYXNlIHJlYWQgdGhpcyBwcml2YWN5IHBvbGljeSBjYXJlZnVsbHkgYW5kIHNlZSBiZWxvdyBmb3IgZGV0YWlscyBvbiB3aGF0IHR5cGUgb2YgaW5mb3JtYXRpb24gd2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbWF5IGNvbGxlY3QgZnJvbSB5b3UsIGhvdyB0aGF0IGluZm9ybWF0aW9uIGlzIHVzZWQgaW4gY29ubmVjdGlvbiB3aXRoIHRoZSBzZXJ2aWNlcyBvZmZlcmVkIHRocm91Z2hcbiAgICAgICAgICAgICAgICAgICAgICAgICAgb3VyIFdlYnNpdGUgYW5kIHNoYXJlZCB3aXRoIG91ciBidXNpbmVzcyBwYXJ0bmVycy4gVGhpcyBQcml2YWN5IFBvbGljeSBhcHBsaWVzIHRvIGN1cnJlbnQgYW5kXG4gICAgICAgICAgICAgIGZvcm1lciB2aXNpdG9ycyBhbmQgY3VzdG9tZXJzIHRvIHRoZSBXZWJzaXRlLjwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInByaXZhY3ktZGVzY1wiPkJ5IHZpc2l0aW5nIGFuZC9vciBhY2Nlc3NpbmcgdGhlIFdlYnNpdGUsIHlvdSBhZ3JlZSB0byB0aGlzIFByaXZhY3kgUG9saWN5LjwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInByaXZhY3ktZGVzYy1zdWJoZWFkaW5nXCI+MS4mbmJzcDsmbmJzcDsmbmJzcDsmbmJzcDtDT0xMRUNUSU9OIE9GIFBFUlNPTkFMIElORk9STUFUSU9OPC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwicHJpdmFjeS1kZXNjXCI+V2hlbiB5b3UgYWNjZXNzIHRoZSBTZXJ2aWNlcywgb3IgdGhyb3VnaCBhbnkgaW50ZXJhY3Rpb24gd2l0aCB1cyB2aWEgZW1haWxzLCB0ZWxlcGhvbmVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2FsbHMgb3Igb3RoZXIgY29ycmVzcG9uZGVuY2UsIHdlIG1heSBhc2sgeW91IHRvIHZvbHVudGFyaWx5IHByb3ZpZGUgdXMgd2l0aCBjZXJ0YWluXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGluZm9ybWF0aW9uIHRoYXQgcGVyc29uYWxseSBpZGVudGlmaWVzIHlvdSBvciBjb3VsZCBiZSB1c2VkIHRvIHBlcnNvbmFsbHkgaWRlbnRpZnkgeW91LiBZb3VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgaGVyZWJ5IGNvbnNlbnQgdG8gdGhlIGNvbGxlY3Rpb24gb2Ygc3VjaCBpbmZvcm1hdGlvbiBieSB0aGUgQ29tcGFueS4gV2l0aG91dCBwcmVqdWRpY2UgdG9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgdGhlIGdlbmVyYWxpdHkgb2YgdGhlIGFib3ZlLCBpbmZvcm1hdGlvbiBjb2xsZWN0ZWQgYnkgdXMgZnJvbSB5b3UgbWF5IGluY2x1ZGUgKGJ1dCBpcyBub3RcbiAgICAgICAgICAgICAgbGltaXRlZCB0bykgdGhlIGZvbGxvd2luZzo8L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICA8b2wgY2xhc3NOYW1lPVwic3ViLWxpc3RcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGk+Y29udGFjdCBkYXRhIChzdWNoIGFzIHlvdXIgZnVsbCBuYW1lLCBlbWFpbCBhZGRyZXNzIGFuZCBwaG9uZSBudW1iZXIpOzwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpPmRlbW9ncmFwaGljIGRhdGEgKHN1Y2ggYXMgeW91ciBnZW5kZXIsIHlvdXIgZGF0ZSBvZiBiaXJ0aCBhbmQgeW91ciBwaW4gY29kZSk7PC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGk+ZGF0YSByZWdhcmRpbmcgeW91ciB1c2FnZSBvZiB0aGUgc2VydmljZXMgYW5kIGhpc3Rvcnkgb2YgdGhlIGFwcG9pbnRtZW50cyBtYWRlIGJ5IG9yIHdpdGhcbiAgICAgICAgICAgICAgICB5b3UgdGhyb3VnaCB0aGUgdXNlIG9mIFNlcnZpY2VzOzwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpPmRhdGEgcmVnYXJkaW5nIHlvdXIgbWVkaWNhbCByZWNvcmRzIGhpc3Rvcnk7IGFuZCBpbnN1cmFuY2UgZGF0YTs8L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaT5vdGhlciBpbmZvcm1hdGlvbiB0aGF0IHlvdSB2b2x1bnRhcmlseSBjaG9vc2UgdG8gcHJvdmlkZSB0byB1cyAoc3VjaCBhcyBpbmZvcm1hdGlvbiBzaGFyZWRcbiAgICAgICAgICAgICAgICBieSB5b3Ugd2l0aCB1cyB0aHJvdWdoIGVtYWlscyBvciBsZXR0ZXJzKS48L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9vbD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInByaXZhY3ktZGVzY1wiPlRoZSBpbmZvcm1hdGlvbiBjb2xsZWN0ZWQgZnJvbSB5b3UgYnkgdGhlIENvbXBhbnkgbWF5IGNvbnN0aXR1dGUg4oCYcGVyc29uYWwgaW5mb3JtYXRpb27igJlcbiAgICAgICAgICAgICAgb3Ig4oCYc2Vuc2l0aXZlIHBlcnNvbmFsIGRhdGEgb3IgaW5mb3JtYXRpb27igJkgdW5kZXIgdGhlIFNQSSBSdWxlcy48L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJwcml2YWN5LWRlc2NcIj48c3Bhbj7igJxQZXJzb25hbCBJbmZvcm1hdGlvbuKAnTwvc3Bhbj4gaXMgZGVmaW5lZCB1bmRlciB0aGUgU1BJIFJ1bGVzIHRvIG1lYW4gYW55IGluZm9ybWF0aW9uIHRoYXRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcmVsYXRlcyB0byBhIG5hdHVyYWwgcGVyc29uLCB3aGljaCwgZWl0aGVyIGRpcmVjdGx5IG9yIGluZGlyZWN0bHksIGluIGNvbWJpbmF0aW9uIHdpdGggb3RoZXJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgaW5mb3JtYXRpb24gYXZhaWxhYmxlIG9yIGxpa2VseSB0byBiZSBhdmFpbGFibGUgdG8gYSBib2R5IGNvcnBvcmF0ZSwgaXMgY2FwYWJsZSBvZiBpZGVudGlmeWluZ1xuICAgICAgICAgICAgICBzdWNoIHBlcnNvbi48L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJwcml2YWN5LWRlc2NcIj5UaGUgU1BJIFJ1bGVzIGZ1cnRoZXIgZGVmaW5lIOKAnFNlbnNpdGl2ZSBQZXJzb25hbCBEYXRhIG9yIEluZm9ybWF0aW9u4oCdIG9mIGEgcGVyc29uIHRvIG1lYW5cbiAgICAgICAgICAgICAgcGVyc29uYWwgaW5mb3JtYXRpb24gYWJvdXQgdGhhdCBwZXJzb24gcmVsYXRpbmcgdG86PC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgPG9sIGNsYXNzTmFtZT1cInN1Yi1saXN0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpPnBhc3N3b3Jkczs8L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaT5maW5hbmNpYWwgaW5mb3JtYXRpb24gc3VjaCBhcyBiYW5rIGFjY291bnRzLCBjcmVkaXQgYW5kIGRlYml0IGNhcmQgZGV0YWlscyBvciBvdGhlclxuICAgICAgICAgICAgICAgIHBheW1lbnQgaW5zdHJ1bWVudCBkZXRhaWxzOzwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpPnBoeXNpY2FsLCBwaHlzaW9sb2dpY2FsIGFuZCBtZW50YWwgaGVhbHRoIGNvbmRpdGlvbjs8L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaT5zZXh1YWwgb3JpZW50YXRpb247PC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGk+bWVkaWNhbCByZWNvcmRzIGFuZCBoaXN0b3J5OzwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpPmJpb21ldHJpYyBpbmZvcm1hdGlvbjs8L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaT5pbmZvcm1hdGlvbiByZWNlaXZlZCBieSBib2R5IGNvcnBvcmF0ZSB1bmRlciBsYXdmdWwgY29udHJhY3Qgb3Igb3RoZXJ3aXNlOzwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpPnZpc2l0b3IgZGV0YWlscyBhcyBwcm92aWRlZCBhdCB0aGUgdGltZSBvZiByZWdpc3RyYXRpb24gb3IgdGhlcmVhZnRlcjsgYW5kPC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGk+Y2FsbCBkYXRhIHJlY29yZHMuPC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvb2w+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJwcml2YWN5LWRlc2NcIj5UbyB0aGUgZXh0ZW50IG5lY2Vzc2FyeSB0byBwcm92aWRlIFVzZXJzIHdpdGggdGhlIFNlcnZpY2VzLCBvZmZlcnMgYW5kIHByb21vdGlvbnMgdGhyb3VnaFxuICAgICAgICAgICAgICAgICAgICAgICAgICB0aGUgV2Vic2l0ZSwgQ29tcGFueSBtYXkgcHJvdmlkZSB5b3VyIFBlcnNvbmFsIEluZm9ybWF0aW9uIHRvIHRoaXJkIHBhcnR5KGllcykgd2hvIHdvcmtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgb24gYmVoYWxmIG9mIG9yIHdpdGggQ29tcGFueSB0byBwcm92aWRlIHRoZSBVc2VycyB3aXRoIHN1Y2ggU2VydmljZXMsIG9mZmVycyBhbmRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvbW90aW9ucywgdG8gaGVscCBDb21wYW55IGNvbW11bmljYXRlIHdpdGggVXNlcnMgb3IgdG8gbWFpbnRhaW4gdGhlIFdlYnNpdGUuIEluIHN1Y2hcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2lyY3Vtc3RhbmNlcywgeW91IGNvbnNlbnQgdG8gdXMgZGlzY2xvc2luZyB5b3VyIFBlcnNvbmFsIEluZm9ybWF0aW9uIHRvIHN1Y2ggdGhpcmQgcGFydGllc1xuICAgICAgICAgICAgICBhbmQgY29udHJhY3RvcnMsIHNvbGVseSBmb3IgdGhlIGludGVuZGVkIHB1cnBvc2VzIG9ubHkuPC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwicHJpdmFjeS1kZXNjXCI+SG93ZXZlciwgQ29tcGFueSB3aWxsIGJlIGZyZWUgdG8gdXNlLCBjb2xsZWN0IGFuZCBkaXNjbG9zZSBpbmZvcm1hdGlvbiB0aGF0IGlzIGZyZWVseVxuICAgICAgICAgICAgICBhdmFpbGFibGUgYWJvdXQgeW91IGluIHRoZSBwdWJsaWMgZG9tYWluIHdpdGhvdXQgeW91ciBjb25zZW50LjwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInByaXZhY3ktZGVzYy1zdWJoZWFkaW5nXCI+Mi4mbmJzcDsmbmJzcDsmbmJzcDsmbmJzcDtDT05UUk9MTEVSUyBPRiBQRVJTT05BTCBJTkZPUk1BVElPTjwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInByaXZhY3ktZGVzY1wiPllvdXIgcGVyc29uYWwgZGF0YSB3aWxsIGJlIHN0b3JlZCBhbmQgY29sbGVjdGVkIGJ5IGRvY3ByaW1lIFRlY2hub2xvZ2llcyBQcml2YXRlIExpbWl0ZWQgYW5kIHdpdGggaXRzIHBhcmVudCBjb21wYW55IEV0ZWNoYWNlcyBNYXJrZXRpbmcgYW5kIENvbnN1bHRpbmcgUHJpdmF0ZSBMaW1pdGVkLjwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInByaXZhY3ktZGVzYy1zdWJoZWFkaW5nXCI+My4mbmJzcDsmbmJzcDsmbmJzcDsmbmJzcDtQVVJQT1NFUyBPRiBDT0xMRUNUSU9OIE9GIFlPVVIgREFUQTwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInByaXZhY3ktZGVzY1wiPkNvbXBhbnkgY29sbGVjdHMgeW91ciBpbmZvcm1hdGlvbiB3aGVuIHlvdSByZWdpc3RlciBmb3IgYW4gYWNjb3VudCwgd2hlbiB5b3UgdXNlIGl0c1xuICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9kdWN0cyBvciBzZXJ2aWNlcywgdmlzaXQgaXRzIFdlYnNpdGUncyBwYWdlcywgYW5kIHdoZW4geW91IGVudGVyIHlvdXIgZGV0YWlscyBmb3IgcmVjZWl2aW5nXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHByb21vdGlvbnMgb3Igb2ZmZXJzIGFzIGZlYXR1cmVkIG9uIG9yIG9mZmVyZWQgYnkgdGhlIFdlYnNpdGUuIFdoZW4geW91IHJlZ2lzdGVyIHdpdGggdGhlXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFdlYnNpdGUsIHlvdSBhcmUgYXNrZWQgZm9yIHlvdXIgZmlyc3QgbmFtZSwgbGFzdCBuYW1lLCBzdGF0ZSBhbmQgY2l0eSBvZiByZXNpZGVuY2UsIGVtYWlsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGFkZHJlc3MsIGRhdGUgb2YgYmlydGgsIGFuZCBzZXggZXRjLiBPbmNlIHlvdSByZWdpc3RlciBhdCB0aGUgV2Vic2l0ZSBhbmQgc2lnbiBpbiB5b3UgYXJlXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG5vdCBhbm9ueW1vdXMgdG8gdXMuIEFsc28sIHlvdSBhcmUgYXNrZWQgZm9yIHlvdXIgY29udGFjdCBudW1iZXIgZHVyaW5nIHJlZ2lzdHJhdGlvbiBhbmRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbWF5IGJlIHNlbnQgU01TKHMpLCBub3RpZmljYXRpb25zIGFib3V0IG91ciBzZXJ2aWNlcy4gRnVydGhlciwgc29tZSBmZWF0dXJlcyBvZiB0aGlzIFdlYnNpdGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgb3Igb3VyIFNlcnZpY2VzIHdpbGwgcmVxdWlyZSB5b3UgdG8gZnVybmlzaCB5b3VyIHBlcnNvbmFsIGluZm9ybWF0aW9uIGFzIHByb3ZpZGVkIGJ5IHlvdVxuICAgICAgICAgICAgICB1bmRlciB5b3VyIGFjY291bnQgc2VjdGlvbiBvbiBvdXIgV2Vic2l0ZS48L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJwcml2YWN5LWRlc2NcIj5IZW5jZSwgYnkgcmVnaXN0ZXJpbmcgeW91IGF1dGhvcml6ZSB0aGUgQ29tcGFueSB0byBzZW5kIHRleHRzIGFuZCBlbWFpbCBhbGVydHMgdG8geW91IHdpdGhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgeW91ciBsb2dpbiBkZXRhaWxzIGFuZCBhbnkgb3RoZXIgc2VydmljZSByZXF1aXJlbWVudHMsIGluY2x1ZGluZyBwcm9tb3Rpb25hbCBtYWlscyBhbmRcbiAgICAgICAgICAgICAgU01Tcy48L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJwcml2YWN5LWRlc2NcIj5GdXJ0aGVyLCBJbiBvcmRlciB0byBhdmFpbCBzb21lIG9mIHRoZSBTZXJ2aWNlcywgdGhlIFVzZXJzIG1heSBiZSByZXF1aXJlZCB0byB1cGxvYWQgY29waWVzXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG9mIHRoZWlyIHByZXNjcmlwdGlvbnMsIG9uIHRoZSBXZWJzaXRlIGFuZC8gb3IgZS1tYWlsIHRoZSBzYW1lIHRvIENvbXBhbnkgaW4gYWNjb3JkYW5jZVxuICAgICAgICAgICAgICAgICAgICAgICAgICB3aXRoIHRoZSBUZXJtcyBvZiBVc2UgYW5kIHRoZSBwcmVzY3JpcHRpb25zIHdpbGwgYmUgc3RvcmVkLyBkaXNjbG9zZWQgYnkgQ29tcGFueSBvbmx5IGluXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRoZSBtYW5uZXIgc3BlY2lmaWVkIGluIHRoaXMgUHJpdmFjeSBQb2xpY3kgYW5kIHRoZSBUZXJtcyBvZiBVc2UuIFRoZSB0ZXJtIHBlcnNvbmFsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGluZm9ybWF0aW9uL2RhdGEgc2hhbGwgYWxzbyBpbmNsdWRlIGFueSBzdWNoIHByZXNjcmlwdGlvbnMgdXBsb2FkZWQgb3Igb3RoZXJ3aXNlIHByb3ZpZGVkXG4gICAgICAgICAgICAgIGJ5IFVzZXJzLjwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInByaXZhY3ktZGVzY1wiPkZ1cnRoZXJtb3JlLCBDb21wYW55IG1heSBrZWVwIHJlY29yZHMgb2YgdGVsZXBob25lIGNhbGxzIHJlY2VpdmVkIGFuZCBtYWRlIGZvciBtYWtpbmdcbiAgICAgICAgICAgICAgaW5xdWlyaWVzLCBvcmRlcnMsIG9yIG90aGVyIHB1cnBvc2VzIGZvciB0aGUgcHVycG9zZSBvZiBhZG1pbmlzdHJhdGlvbiBvZiBTZXJ2aWNlcy48L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJwcml2YWN5LWRlc2NcIj5XZSB1c2UgeW91ciBpbmZvcm1hdGlvbiBpbiBvcmRlciB0bzo8L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dWwgY2xhc3NOYW1lPVwibXJ0LTEwXCIgc3R5bGU9e3sgbGlzdFN0eWxlOiAnZGlzYycsIHBhZGRpbmdMZWZ0OiA0MCwgdGV4dEFsaWduOiAnbGVmdCcgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpIGNsYXNzTmFtZT1cIm1yYi0xMFwiPlJlZ2lzdGVyIHlvdSBhcyBjdXN0b21lci91c2VyIG9uIHRoZSBXZWJzaXRlOzwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpIGNsYXNzTmFtZT1cIm1yYi0xMFwiPkRlYWxpbmcgd2l0aCByZXF1ZXN0cywgZW5xdWlyaWVzIG9yIGNvbXBsYWludHMgYW5kIG90aGVyIGN1c3RvbWVyIGNhcmUgcmVsYXRlZCBhY3Rpdml0aWVzOyBhbmQgYWxsIG90aGVyIGdlbmVyYWwgYWRtaW5pc3RyYXRpdmUgYW5kIGJ1c2luZXNzIHB1cnBvc2VzLjwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpIGNsYXNzTmFtZT1cIm1yYi0xMFwiPlByb2Nlc3MgeW91ciBvcmRlcnMgb3IgYXBwbGljYXRpb25zIGFuZCBwcm92aXNpb24gb2YgcHJvZHVjdHMgYW5kIHNlcnZpY2VzLjwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpIGNsYXNzTmFtZT1cIm1yYi0xMFwiPkFkbWluaXN0ZXIgb3Igb3RoZXJ3aXNlIGNhcnJ5IG91dCBvdXIgb2JsaWdhdGlvbnMgaW4gcmVsYXRpb24gdG8gYW55IGFncmVlbWVudCB3aXRoXG4gICAgICAgICAgICAgICAgb3VyIGJ1c2luZXNzIHBhcnRuZXJzL2NvbnRyYWN0b3JzOzwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpIGNsYXNzTmFtZT1cIm1yYi0xMFwiPlJlc2VhcmNoIGFuZCBkZXZlbG9wbWVudCBhbmQgZm9yIFVzZXIgYWRtaW5pc3RyYXRpb24gKGluY2x1ZGluZyBjb25kdWN0aW5nIFVzZXJcbiAgICAgICAgICAgICAgICBzdXJ2ZXlzKTs8L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaSBjbGFzc05hbWU9XCJtcmItMTBcIj5UZWNobmljYWwgYWRtaW5pc3RyYXRpb24gYW5kIGN1c3RvbWl6YXRpb24gb2YgV2Vic2l0ZTs8L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaSBjbGFzc05hbWU9XCJtcmItMTBcIj5UbyBzZW5kIHlvdSBpbmZvcm1hdGlvbiBhYm91dCBzcGVjaWFsIHByb21vdGlvbnMgb3Igb2ZmZXJzIChlaXRoZXIgb2ZmZXJlZCBieSB0aGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIENvbXBhbnkgb3IgYnkgaXRzIGJ1c2luZXNzIHBhcnRuZXJzKS4gV2UgbWlnaHQgYWxzbyB0ZWxsIHlvdSBhYm91dCBuZXcgZmVhdHVyZXMgb3JcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb2R1Y3RzLiBUaGVzZSBtaWdodCBiZSBvdXIgb3duIG9mZmVycyBvciBwcm9kdWN0cywgb3IgdGhpcmQtcGFydHkgb2ZmZXJzIG9yXG4gICAgICAgICAgICAgICAgcHJvZHVjdHMgd2l0aCB3aG9tIENvbXBhbnkgaGFzIGEgdGllLXVwOzwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpIGNsYXNzTmFtZT1cIm1yYi0xMFwiPkltcHJvdmVtZW50IG9mIFNlcnZpY2VzIGFuZCBmZWF0dXJlcyBvbiB0aGUgV2Vic2l0ZS4gSW4gdGhpcyByZWdhcmQsIHdlIG1heVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tYmluZSBpbmZvcm1hdGlvbiB3ZSBnZXQgZnJvbSB5b3Ugd2l0aCBpbmZvcm1hdGlvbiBhYm91dCB5b3Ugd2UgZ2V0IGZyb20gdGhpcmRcbiAgICAgICAgICAgICAgICBwYXJ0aWVzLjwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpIGNsYXNzTmFtZT1cIm1yYi0xMFwiPnRvIHNlbmQgeW91IG5vdGljZXMsIGNvbW11bmljYXRpb25zLCBvZmZlciBhbGVydHMgcmVsZXZhbnQgdG8geW91ciB1c2Ugb2YgdGhlXG4gICAgICAgICAgICAgICAgU2VydmljZXMgb2ZmZXJlZCBvbiB0aGlzIFdlYnNpdGUuPC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGkgY2xhc3NOYW1lPVwibXJiLTEwXCI+YXMgb3RoZXJ3aXNlIHByb3ZpZGVkIGluIHRoaXMgUHJpdmFjeSBQb2xpY3kuPC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJwcml2YWN5LWRlc2Mtc3ViaGVhZGluZ1wiPjQuJm5ic3A7Jm5ic3A7Jm5ic3A7Jm5ic3A7SU5GT1JNQVRJT04gU0hBUklORywgVFJBTlNGRVIgQU5EIERJU0NMT1NVUkU8L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICA8b2wgY2xhc3NOYW1lPVwicHJpdmFjeS1vcmRlci1saXN0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpIGNsYXNzTmFtZT1cInByaXZhY3ktb3JkZXItaXRlbVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBXZSBtYXkgbmVlZCB0byBkaXNjbG9zZS8gdHJhbnNmZXIgeW91ciBwZXJzb25hbCBpbmZvcm1hdGlvbiB0byB0aGUgZm9sbG93aW5nIHRoaXJkIHBhcnRpZXNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIHRoZSBwdXJwb3NlcyBtZW50aW9uZWQgaW4gdGhpcyBQcml2YWN5IFBvbGljeSBhbmQgdGhlIFRlcm1zIG9mIFVzZTpcbiAgICAgICAgICAgICAgICA8b2wgY2xhc3NOYW1lPVwic3ViLWxpc3RcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaT5UbyBidXNpbmVzcyBwYXJ0bmVycyBhbmQgb3RoZXIgc2VydmljZSBwcm92aWRlcnMgYXBwb2ludGVkIGJ5IHVzIGZvciB0aGUgcHVycG9zZSBvZlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXJyeWluZyBvdXQgc2VydmljZXMgb24gb3VyIGJlaGFsZiB1bmRlciBhIGNvbnRyYWN0LiBHZW5lcmFsbHkgdGhlc2UgcGFydGllcyBkbyBub3QgaGF2ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbnkgaW5kZXBlbmRlbnQgcmlnaHQgdG8gc2hhcmUgdGhpcyBpbmZvcm1hdGlvbiwgaG93ZXZlciBjZXJ0YWluIHBhcnRpZXMgd2hvIHByb3ZpZGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VydmljZXMgb24gdGhlIFdlYnNpdGUsIGluY2x1ZGluZyBidXQgbm90IGxpbWl0ZWQgdG8gdGhlIHByb3ZpZGVycyBvZiBvbmxpbmVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tbXVuaWNhdGlvbnMgc2VydmljZXMsIHdpbGwgaGF2ZSByaWdodHMgdG8gdXNlIGFuZCBkaXNjbG9zZSB0aGUgcGVyc29uYWwgaW5mb3JtYXRpb25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sbGVjdGVkIGluIGNvbm5lY3Rpb24gd2l0aCB0aGUgcHJvdmlzaW9uIG9mIHRoZXNlIHNlcnZpY2VzIGluIGFjY29yZGFuY2Ugd2l0aCB0aGVpciBvd25cbiAgICAgICAgICAgICAgICAgICAgcHJpdmFjeSBwb2xpY2llcy48L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpPlRvIG91ciBhZmZpbGlhdGVzIGluIEluZGlhIG9yIGluIG90aGVyIGNvdW50cmllcyB3aG8gbWF5IHVzZSBhbmQgZGlzY2xvc2UgeW91clxuICAgICAgICAgICAgICAgICAgICBpbmZvcm1hdGlvbiBmb3IgdGhlIHNhbWUgcHVycG9zZXMgYXMgdXMuPC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaT5XZSBtYXkgYWxzbyBzaGFyZSwgc2VsbCwgYW5kL29yIHRyYW5zZmVyIHlvdXIgcGVyc29uYWwgaW5mb3JtYXRpb24gdG8gYW55XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3Nvci1pbi1pbnRlcmVzdCBhcyBhIHJlc3VsdCBvZiBhIHNhbGUgb2YgYW55IHBhcnQgb2Ygb3VyIGJ1c2luZXNzIG9yIHVwb24gdGhlIG1lcmdlcixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVvcmdhbml6YXRpb24sIG9yIGNvbnNvbGlkYXRpb24gb2YgaXQgd2l0aCBhbm90aGVyIGVudGl0eSBvbiBhIGJhc2lzIHRoYXQgaXQgaXMgbm90IHRoZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdXJ2aXZpbmcgZW50aXR5LiBXZSBtYXkgYWxzbyBkaXNjbG9zZSBvciB0cmFuc2ZlciB5b3VyIEluZm9ybWF0aW9uLCB0byBhbm90aGVyIHRoaXJkIHBhcnR5XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzIHBhcnQgb2YgcmVvcmdhbml6YXRpb24gb3IgYSBzYWxlIG9mIHRoZSBhc3NldHMgb2YgYSBDb21wYW554oCZcyBjb3Jwb3JhdGlvbiBkaXZpc2lvbiBvclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21wYW55LiBBbnkgdGhpcmQgcGFydHkgdG8gd2hpY2ggd2UgdHJhbnNmZXIgb3Igc2VsbCBvdXIgYXNzZXRzLCB3aWxsIGhhdmUgdGhlIHJpZ2h0IHRvXG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlIHRvIHVzZSB0aGUgcGVyc29uYWwgZGF0YSBhbmQvIG9yIG90aGVyIGluZm9ybWF0aW9uIHRoYXQgeW91IGhhdmUgcHJvdmlkZWQgdG8gdXMuPC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaT5UbyBnb3Zlcm5tZW50IGluc3RpdHV0aW9ucy8gYXV0aG9yaXRpZXMgdG8gdGhlIGV4dGVudCByZXF1aXJlZCBhKSB1bmRlciB0aGUgbGF3cyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcnVsZXMsIGFuZCByZWd1bGF0aW9ucyBhbmQgb3IgdW5kZXIgb3JkZXJzIG9mIGFueSByZWxldmFudCBqdWRpY2lhbCBvciBxdWFzaS1qdWRpY2lhbFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdXRob3JpdHk7IGIpIHRvIHByb3RlY3QgYW5kIGRlZmVuZCB0aGUgcmlnaHRzIG9yIHByb3BlcnR5IG9mIHRoZSBDb21wYW55OyBjKSB0byBmaWdodFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmcmF1ZCBhbmQgY3JlZGl0IHJpc2s7IGQpIHRvIGVuZm9yY2Ugb3VyIFRlcm1zIG9mIFVzZSAodG8gd2hpY2ggdGhpcyBQcml2YWN5IFBvbGljeSBpcyBhbHNvIGFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFydCkgOyBvciBlKSB3aGVuIENvbXBhbnksIGluIGl0cyBzb2xlIGRpc2NyZXRpb24sIGRlZW1zIGl0IG5lY2Vzc2FyeSBpbiBvcmRlciB0byBwcm90ZWN0XG4gICAgICAgICAgICAgICAgICAgIGl0cyByaWdodHMgb3IgdGhlIHJpZ2h0cyBvZiBvdGhlcnMuPC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaT5JZiBvdGhlcndpc2UgcmVxdWlyZWQgYnkgYW4gb3JkZXIgdW5kZXIgYW55IGxhdyBmb3IgdGhlIHRpbWUgYmVpbmcgaW4gZm9yY2UgaW5jbHVkaW5nIGluXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlIHRvIGVucXVpcmllcyBieSBHb3Zlcm5tZW50IGFnZW5jaWVzIGZvciB0aGUgcHVycG9zZSBvZiB2ZXJpZmljYXRpb24gb2YgaWRlbnRpdHksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9yIGZvciBwcmV2ZW50aW9uLCBkZXRlY3Rpb24sIGludmVzdGlnYXRpb24gaW5jbHVkaW5nIGN5YmVyIGluY2lkZW50cywgcHJvc2VjdXRpb24sIGFuZFxuICAgICAgICAgICAgICAgICAgICBwdW5pc2htZW50IG9mIG9mZmVuY2VzLjwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGk+SW4gY2FzZSBvZiBhbnkgY29udGVzdHMgb3Igc3VydmV5cyBjb25kdWN0ZWQgYnkgdGhlIENvbXBhbnkgaW4gd2hpY2ggdGhlIHlvdVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJ0aWNpcGF0ZSwgeW91ciBpbmZvcm1hdGlvbiBtYXkgYmUgZGlzY2xvc2VkIHRvIHRoaXJkIHBhcnRpZXMsIGFsc28gYmUgZGlzY2xvc2VkIHRvIHRoaXJkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcnRpZXMgdG8gdGhlIGV4dGVudCBuZWNlc3NhcnkgZm9yIGZ1bGZpbG1lbnQgb2YgYW55IG9mZmVyL3ZvdWNoZXJzIGV0Yy4gYW5kIG90aGVyXG4gICAgICAgICAgICAgICAgICAgIGFzcGVjdHMgb2Ygc3VjaCBjb250ZXN0IG9yIHNpbWlsYXIgb2ZmZXJpbmcuPC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9vbD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaSBjbGFzc05hbWU9XCJwcml2YWN5LW9yZGVyLWl0ZW1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgV2UgbWFrZSBhbGwgeW91ciBwZXJzb25hbCBJbmZvcm1hdGlvbiBhY2Nlc3NpYmxlIHRvIG91ciBlbXBsb3llZXMgYW5kIGRhdGEgcHJvY2Vzc29yc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbmx5IG9uIGEgbmVlZC10by1rbm93IGJhc2lzLiBBbGwgb3VyIGVtcGxveWVlcyBhbmQgZGF0YSBwcm9jZXNzb3JzLCB3aG8gaGF2ZSBhY2Nlc3MgdG8sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFuZCBhcmUgYXNzb2NpYXRlZCB3aXRoIHRoZSBwcm9jZXNzaW5nIG9mIHlvdXIgSW5mb3JtYXRpb24sIGFyZSBvYmxpZ2VkIHRvIHJlc3BlY3QgaXRzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbmZpZGVudGlhbGl0eS5cbiAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGkgY2xhc3NOYW1lPVwicHJpdmFjeS1vcmRlci1pdGVtXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE5vbi1wZXJzb25hbGx5IGlkZW50aWZpYWJsZSBpbmZvcm1hdGlvbiBtYXkgYmUgZGlzY2xvc2VkIHRvIHRoaXJkIHBhcnR5IGFkIHNlcnZlcnMsIGFkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFnZW5jaWVzLCB0ZWNobm9sb2d5IHZlbmRvcnMgYW5kIHJlc2VhcmNoIGZpcm1zIHRvIHNlcnZlIGFkdmVydGlzZW1lbnRzIHRvIHRoZSBVc2Vycy5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQ29tcGFueSBtYXkgYWxzbyBzaGFyZSBpdHMgYWdncmVnYXRlIGZpbmRpbmdzIChub3Qgc3BlY2lmaWMgaW5mb3JtYXRpb24pIGJhc2VkIG9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluZm9ybWF0aW9uIHJlbGF0aW5nIHRvIHlvdXIgaW50ZXJuZXQgdXNlIHRvIHByb3NwZWN0aXZlLCBpbnZlc3RvcnMsIHN0cmF0ZWdpYyBwYXJ0bmVycyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3BvbnNvcnMgYW5kIG90aGVycyBpbiBvcmRlciB0byBoZWxwIGdyb3d0aCBvZiBvdXIgYnVzaW5lc3MuIFRoZXNlIGNvbXBhbmllcyBtYXkgdXNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluZm9ybWF0aW9uIChleGNsdWRpbmcgeW91ciBuYW1lLCBhZGRyZXNzLCBlbWFpbCBhZGRyZXNzLCBvciB0ZWxlcGhvbmUgbnVtYmVyKSBhYm91dFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB5b3VyIHZpc2l0cyB0byB0aGlzIFdlYnNpdGUgaW4gb3JkZXIgdG8gcHJvdmlkZSBhZHZlcnRpc2VtZW50cyBvbiB0aGlzIFdlYnNpdGUgYW5kIG90aGVyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXJkIHBhcnR5IHdlYnNpdGVzIGFib3V0IGdvb2RzIGFuZCBzZXJ2aWNlcyB0aGF0IG1heSBiZSBvZiBpbnRlcmVzdCB0byB5b3UuIFdlIHVzZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlyZC1wYXJ0eSBzZXJ2aWNlIHByb3ZpZGVycyB0byBzZXJ2ZSBhZHMgb24gb3VyIGJlaGFsZiBhY3Jvc3MgdGhlIGludGVybmV0IGFuZCBzb21ldGltZXNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb24gdGhpcyBXZWJzaXRlLiBUaGV5IG1heSBjb2xsZWN0IGFub255bW91cyBpbmZvcm1hdGlvbiBhYm91dCB5b3VyIHZpc2l0cyB0byBXZWJzaXRlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbmQgeW91ciBpbnRlcmFjdGlvbiB3aXRoIG91ciBwcm9kdWN0cyBhbmQgc2VydmljZXMuIFRoZXkgbWF5IGFsc28gdXNlIGluZm9ybWF0aW9uIGFib3V0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHlvdXIgdmlzaXRzIHRvIHRoaXMgYW5kIG90aGVyIHdlYnNpdGVzIGZvciB0YXJnZXRlZCBhZHZlcnRpc2VtZW50cyBmb3IgZ29vZHMgYW5kIHNlcnZpY2VzLlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBUaGlzIGFub255bW91cyBpbmZvcm1hdGlvbiBpcyBjb2xsZWN0ZWQgdGhyb3VnaCB0aGUgdXNlIG9mIGEgcGl4ZWwgdGFnLCB3aGljaCBpcyBpbmR1c3RyeVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFuZGFyZCB0ZWNobm9sb2d5IHVzZWQgYnkgbW9zdCBtYWpvciB3ZWJzaXRlcy4gTm8gcGVyc29uYWxseSBpZGVudGlmaWFibGUgaW5mb3JtYXRpb25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXMgY29sbGVjdGVkIG9yIHVzZWQgaW4gdGhpcyBwcm9jZXNzLlxuICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaSBjbGFzc05hbWU9XCJwcml2YWN5LW9yZGVyLWl0ZW1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgV2UgbWF5IG1ha2UgYW5vbnltb3VzIG9yIGFnZ3JlZ2F0ZSBwZXJzb25hbCBpbmZvcm1hdGlvbiBhbmQgZGlzY2xvc2Ugc3VjaCBkYXRhIG9ubHlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW4gYSBub24tcGVyc29uYWxseSBpZGVudGlmaWFibGUgbWFubmVyLiBTdWNoIGluZm9ybWF0aW9uIGRvZXMgbm90IGlkZW50aWZ5IHlvdVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmRpdmlkdWFsbHkuXG4gICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpIGNsYXNzTmFtZT1cInByaXZhY3ktb3JkZXItaXRlbVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBBY2Nlc3MgdG8geW91ciBhY2NvdW50IGluZm9ybWF0aW9uIGFuZCBhbnkgb3RoZXIgcGVyc29uYWwgaWRlbnRpZmlhYmxlIGluZm9ybWF0aW9uIGlzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0cmljdGx5IHJlc3RyaWN0ZWQgYW5kIHVzZWQgb25seSBpbiBhY2NvcmRhbmNlIHdpdGggc3BlY2lmaWMgaW50ZXJuYWwgcHJvY2VkdXJlcywgaW4gb3JkZXJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdG8gb3BlcmF0ZSwgZGV2ZWxvcCBvciBpbXByb3ZlIG91ciBTZXJ2aWNlcy4gV2UgbWF5IHVzZSB0aGlyZCBwYXJ0eSBzZXJ2aWNlIHByb3ZpZGVycyB0b1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbmFibGUgeW91IHRvIHByb3ZpZGUgd2l0aCBvdXIgc2VydmljZXMgYW5kIHdlIHJlcXVpcmUgc3VjaCB0aGlyZCBwYXJ0aWVzIHRvIG1haW50YWluIHRoZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25maWRlbnRpYWxpdHkgb2YgdGhlIGluZm9ybWF0aW9uIHdlIHByb3ZpZGUgdG8gdGhlbSB1bmRlciBvdXIgY29udHJhY3RzIHdpdGggdGhlbS5cbiAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGkgY2xhc3NOYW1lPVwicHJpdmFjeS1vcmRlci1pdGVtXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFRoZXJlIGFyZSBudW1iZXIgb2YgUHJvZHVjdHMgYW5kL29yIFNlcnZpY2VzLCBvZmZlcmVkIGJ5IHRoaXJkIFBhcnRpZXMgb24gdGhlIFdlYnNpdGUuIElmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHlvdSBjaG9vc2UgdG8gYXZhaWwgZm9yIHRoZXNlIHNlcGFyYXRlIFByb2R1Y3RzIG9yIFNlcnZpY2VzLCBkaXNjbG9zZSBpbmZvcm1hdGlvbiB0byB0aGVzZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXJ2aWNlIHByb3ZpZGVycywgdGhlbiB0aGVpciB1c2Ugb2YgeW91ciBpbmZvcm1hdGlvbiBpcyBnb3Zlcm5lZCBieSB0aGVpciBwcml2YWN5IHBvbGljaWVzLlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBDb21wYW55IGlzIG5vdCByZXNwb25zaWJsZSBmb3IgdGhlaXIgcHJpdmFjeSBwb2xpY2llcy5cbiAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvb2w+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJwcml2YWN5LWRlc2Mtc3ViaGVhZGluZ1wiPjUuJm5ic3A7Jm5ic3A7Jm5ic3A7Jm5ic3A7V0UgQ09MTEVDVCBDT09LSUVTPC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwicHJpdmFjeS1kZXNjXCI+V2UgbWF5IGFsc28gcmVjZWl2ZSBhbmQvb3IgaG9sZCBpbmZvcm1hdGlvbiBhYm91dCB0aGUgVXNlcuKAmXMgYnJvd3NpbmcgaGlzdG9yeSBpbmNsdWRpbmdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdGhlIFVSTCBvZiB0aGUgc2l0ZSB0aGF0IHRoZSBVc2VyIHZpc2l0ZWQgcHJpb3IgdG8gdmlzaXRpbmcgdGhlIHdlYnNpdGUgYXMgd2VsbCBhcyB0aGUgSW50ZXJuZXRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgUHJvdG9jb2wgKElQKSBhZGRyZXNzIG9mIGVhY2ggVXNlcidzIGNvbXB1dGVyIChvciB0aGUgcHJveHkgc2VydmVyIGEgVXNlciB1c2VkIHRvIGFjY2VzcyB0aGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgV29ybGQgV2lkZSBXZWIpLCBVc2VyJ3MgY29tcHV0ZXIgb3BlcmF0aW5nIHN5c3RlbSBhbmQgdHlwZSBvZiB3ZWIgYnJvd3NlciB0aGUgVXNlciBpc1xuICAgICAgICAgICAgICB1c2luZyBhcyB3ZWxsIGFzIHRoZSBuYW1lIG9mIFVzZXIncyBJU1AuPC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwicHJpdmFjeS1kZXNjXCI+VGhlIFdlYnNpdGUgdXNlcyB0ZW1wb3JhcnkgY29va2llcyB0byBzdG9yZSBjZXJ0YWluIGRhdGEgKHRoYXQgaXMgbm90IHNlbnNpdGl2ZSBwZXJzb25hbFxuICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhIG9yIGluZm9ybWF0aW9uKSB0aGF0IGlzIHVzZWQgYnkgdGhlIENvbXBhbnkgYW5kIGl0cyBzZXJ2aWNlIHByb3ZpZGVycyBmb3IgdGhlIHRlY2huaWNhbFxuICAgICAgICAgICAgICAgICAgICAgICAgICBhZG1pbmlzdHJhdGlvbiBvZiB0aGUgV2Vic2l0ZSwgcmVzZWFyY2ggYW5kIGRldmVsb3BtZW50LCBhbmQgZm9yIFVzZXIgYWRtaW5pc3RyYXRpb24uIEFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY29va2llIGlzIGEgcGllY2Ugb2YgZGF0YSBzdG9yZWQgb24gdGhlIHVzZXIncyBjb21wdXRlciB0aWVkIHRvIGluZm9ybWF0aW9uIGFib3V0IHRoZSB1c2VyLlxuICAgICAgICAgICAgICAgICAgICAgICAgICBXZSBtYXkgdXNlIGJvdGggc2Vzc2lvbiBJRCBjb29raWVzIGFuZCBwZXJzaXN0ZW50IGNvb2tpZXMuIEZvciBzZXNzaW9uIElEIGNvb2tpZXMsIG9uY2UgeW91XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNsb3NlIHlvdXIgYnJvd3NlciBvciBsb2cgb3V0LCB0aGUgY29va2llIHRlcm1pbmF0ZXMgYW5kIGlzIGVyYXNlZC4gQSBwZXJzaXN0ZW50IGNvb2tpZSBpcyBhXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHNtYWxsIHRleHQgZmlsZSBzdG9yZWQgb24geW91ciBjb21wdXRlcuKAmXMgaGFyZCBkcml2ZSBmb3IgYW4gZXh0ZW5kZWQgcGVyaW9kIG9mIHRpbWUuIFNlc3Npb25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgSUQgY29va2llcyBtYXkgYmUgdXNlZCBieSBQUlAgdG8gdHJhY2sgdXNlciBwcmVmZXJlbmNlcyB3aGlsZSB0aGUgdXNlciBpcyB2aXNpdGluZyB0aGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgd2Vic2l0ZS4gVGhleSBhbHNvIGhlbHAgdG8gbWluaW1pemUgbG9hZCB0aW1lcyBhbmQgc2F2ZSBvbiBzZXJ2ZXIgcHJvY2Vzc2luZy4gUGVyc2lzdGVudFxuICAgICAgICAgICAgICAgICAgICAgICAgICBjb29raWVzIG1heSBiZSB1c2VkIGJ5IFBSUCB0byBzdG9yZSB3aGV0aGVyLCBmb3IgZXhhbXBsZSwgeW91IHdhbnQgeW91ciBwYXNzd29yZFxuICAgICAgICAgICAgICAgICAgICAgICAgICByZW1lbWJlcmVkIG9yIG5vdCwgYW5kIG90aGVyIGluZm9ybWF0aW9uLiBDb29raWVzIHVzZWQgb24gdGhlIFBSUCB3ZWJzaXRlIGRvIG5vdCBjb250YWluXG4gICAgICAgICAgICAgIHBlcnNvbmFsbHkgaWRlbnRpZmlhYmxlIGluZm9ybWF0aW9uLjwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInByaXZhY3ktZGVzYy1zdWJoZWFkaW5nXCI+Ni4mbmJzcDsmbmJzcDsmbmJzcDsmbmJzcDtMT0cgRklMRVM8L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJwcml2YWN5LWRlc2NcIj5MaWtlIG1vc3Qgc3RhbmRhcmQgd2Vic2l0ZXMsIHdlIHVzZSBsb2cgZmlsZXMuIFRoaXMgaW5mb3JtYXRpb24gbWF5IGluY2x1ZGUgaW50ZXJuZXRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvdG9jb2wgKElQKSBhZGRyZXNzZXMsIGJyb3dzZXIgdHlwZSwgaW50ZXJuZXQgc2VydmljZSBwcm92aWRlciAoSVNQKSwgcmVmZXJyaW5nL2V4aXQgcGFnZXMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHBsYXRmb3JtIHR5cGUsIGRhdGUvdGltZSBzdGFtcCwgYW5kIG51bWJlciBvZiBjbGlja3MgdG8gYW5hbHlzZSB0cmVuZHMsIGFkbWluaXN0ZXIgdGhlXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHNpdGUsIHRyYWNrIHVzZXIncyBtb3ZlbWVudCBpbiB0aGUgYWdncmVnYXRlLCBhbmQgZ2F0aGVyIGJyb2FkIGRlbW9ncmFwaGljIGluZm9ybWF0aW9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGZvciBhZ2dyZWdhdGUgdXNlLiBXZSBtYXkgY29tYmluZSB0aGlzIGF1dG9tYXRpY2FsbHkgY29sbGVjdGVkIGxvZyBpbmZvcm1hdGlvbiB3aXRoIG90aGVyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGluZm9ybWF0aW9uIHdlIGNvbGxlY3QgYWJvdXQgeW91LiBXZSBkbyB0aGlzIHRvIGltcHJvdmUgc2VydmljZXMgd2Ugb2ZmZXIgdG8geW91LCB0b1xuICAgICAgICAgICAgICBpbXByb3ZlIG1hcmtldGluZywgYW5hbHl0aWNzIG9yIHNpdGUgZnVuY3Rpb25hbGl0eS48L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJwcml2YWN5LWRlc2Mtc3ViaGVhZGluZ1wiPjcuJm5ic3A7Jm5ic3A7Jm5ic3A7Jm5ic3A7RW1haWwtIE9wdCBvdXQ8L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJwcml2YWN5LWRlc2NcIj5JZiB5b3UgYXJlIG5vIGxvbmdlciBpbnRlcmVzdGVkIGluIHJlY2VpdmluZyBlLW1haWwgYW5ub3VuY2VtZW50cyBhbmQgb3RoZXIga2luZHNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbWFya2V0aW5nIGluZm9ybWF0aW9uL2NvbW11bmljYXRpb25zIGZyb20gdXMsIHBsZWFzZSBlLW1haWwgeW91ciByZXF1ZXN0IGF0OlxuICAgICAgICAgICAgICAgICAgICAgICAgICBjYXJlQGRvY3ByaW1lLmNvbS4gUGxlYXNlIG5vdGUgdGhhdCBpdCBtYXkgdGFrZSBhYm91dCA3IChzZXZlbikgd29ya2luZyBkYXlzIHRvIHByb2Nlc3NcbiAgICAgICAgICAgICAgeW91ciByZXF1ZXN0LjwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInByaXZhY3ktZGVzYy1zdWJoZWFkaW5nXCI+OC4mbmJzcDsmbmJzcDsmbmJzcDsmbmJzcDtTRUNVUklUWTwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInByaXZhY3ktZGVzY1wiPldlIGVtcGxveSBhcHByb3ByaWF0ZSB0ZWNobmljYWwgYW5kIG9yZ2FuaXphdGlvbmFsIHNlY3VyaXR5IG1lYXN1cmVzIGF0IGFsbCB0aW1lcyB0b1xuICAgICAgICAgICAgICAgICAgICAgICAgICBwcm90ZWN0IHRoZSBpbmZvcm1hdGlvbiB3ZSBjb2xsZWN0IGZyb20geW91LiBXZSB1c2UgbXVsdGlwbGUgZWxlY3Ryb25pYywgcHJvY2VkdXJhbCwgYW5kXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHBoeXNpY2FsIHNlY3VyaXR5IG1lYXN1cmVzIHRvIHByb3RlY3QgYWdhaW5zdCB1bmF1dGhvcml6ZWQgb3IgdW5sYXdmdWwgdXNlIG9yIGFsdGVyYXRpb24gb2ZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgaW5mb3JtYXRpb24sIGFuZCBhZ2FpbnN0IGFueSBhY2NpZGVudGFsIGxvc3MsIGRlc3RydWN0aW9uLCBvciBkYW1hZ2UgdG8gaW5mb3JtYXRpb24uXG4gICAgICAgICAgICAgICAgICAgICAgICAgIEhvd2V2ZXIsIG5vIG1ldGhvZCBvZiB0cmFuc21pc3Npb24gb3ZlciB0aGUgSW50ZXJuZXQsIG9yIG1ldGhvZCBvZiBlbGVjdHJvbmljIHN0b3JhZ2UsIGlzXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDEwMCUgc2VjdXJlLiBUaGVyZWZvcmUsIHdlIGNhbm5vdCBndWFyYW50ZWUgaXRzIGFic29sdXRlIHNlY3VyaXR5LiBGdXJ0aGVyLCB5b3UgYXJlXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNpYmxlIGZvciBtYWludGFpbmluZyB0aGUgY29uZmlkZW50aWFsaXR5IGFuZCBzZWN1cml0eSBvZiB5b3VyIGxvZ2luIGlkIGFuZCBwYXNzd29yZCxcbiAgICAgICAgICAgICAgYW5kIG1heSBub3QgcHJvdmlkZSB0aGVzZSBjcmVkZW50aWFscyB0byBhbnkgdGhpcmQgcGFydHkuPC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwicHJpdmFjeS1kZXNjLXN1YmhlYWRpbmdcIj45LiZuYnNwOyZuYnNwOyZuYnNwOyZuYnNwO1RISVJEIFBBUlRZIEFEVkVSVElTSU5HPC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwicHJpdmFjeS1kZXNjXCI+V2UgbWF5IHVzZSB0aGlyZC1wYXJ0eSBhZHZlcnRpc2luZyBjb21wYW5pZXMgYW5kL29yIGFkIGFnZW5jaWVzIHRvIHNlcnZlIGFkcyB3aGVuIHlvdVxuICAgICAgICAgICAgICAgICAgICAgICAgICB2aXNpdCBvdXIgV2Vic2l0ZS4gVGhlc2UgY29tcGFuaWVzIG1heSB1c2UgaW5mb3JtYXRpb24gKGV4Y2x1ZGluZyB5b3VyIG5hbWUsIGFkZHJlc3MsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGVtYWlsIGFkZHJlc3MsIG9yIHRlbGVwaG9uZSBudW1iZXIpIGFib3V0IHlvdXIgdmlzaXRzIHRvIHRoaXMgV2Vic2l0ZSBpbiBvcmRlciB0byBwcm92aWRlXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGFkdmVydGlzZW1lbnRzIG9uIHRoaXMgV2Vic2l0ZSBhbmQgb3RoZXIgdGhpcmQgcGFydHkgd2Vic2l0ZXMgYWJvdXQgZ29vZHMgYW5kIHNlcnZpY2VzXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQgbWF5IGJlIG9mIGludGVyZXN0IHRvIHlvdS4gV2UgdXNlIHRoaXJkLXBhcnR5IHNlcnZpY2UgcHJvdmlkZXJzIHRvIHNlcnZlIGFkcyBvbiBvdXJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgYmVoYWxmIGFjcm9zcyB0aGUgaW50ZXJuZXQgYW5kIHNvbWV0aW1lcyBvbiB0aGlzIFdlYnNpdGUuIFRoZXkgbWF5IGNvbGxlY3QgYW5vbnltb3VzXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGluZm9ybWF0aW9uIGFib3V0IHlvdXIgdmlzaXRzIHRvIFdlYnNpdGUsIGFuZCB5b3VyIGludGVyYWN0aW9uIHdpdGggb3VyIHByb2R1Y3RzIGFuZFxuICAgICAgICAgICAgICAgICAgICAgICAgICBzZXJ2aWNlcy4gVGhleSBtYXkgYWxzbyB1c2UgaW5mb3JtYXRpb24gYWJvdXQgeW91ciB2aXNpdHMgdG8gdGhpcyBhbmQgb3RoZXIgV2Vic2l0ZXMgZm9yXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldGVkIGFkdmVydGlzZW1lbnRzIGZvciBnb29kcyBhbmQgc2VydmljZXMuIFRoaXMgYW5vbnltb3VzIGluZm9ybWF0aW9uIGlzIGNvbGxlY3RlZFxuICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdWdoIHRoZSB1c2Ugb2YgYSBwaXhlbCB0YWcsIHdoaWNoIGlzIGluZHVzdHJ5IHN0YW5kYXJkIHRlY2hub2xvZ3kgdXNlZCBieSBtb3N0IG1ham9yXG4gICAgICAgICAgICAgIFdlYnNpdGVzLiBObyBwZXJzb25hbGx5IGlkZW50aWZpYWJsZSBpbmZvcm1hdGlvbiBpcyBjb2xsZWN0ZWQgb3IgdXNlZCBpbiB0aGlzIHByb2Nlc3MuPC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwicHJpdmFjeS1kZXNjLXN1YmhlYWRpbmdcIj4xMC4mbmJzcDsmbmJzcDsmbmJzcDtMSU5LUyBUTyBPVEhFUiBXRUJTSVRFUzwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInByaXZhY3ktZGVzY1wiPlRoZXJlIG1pZ2h0IGJlIGFmZmlsaWF0ZXMgb3Igb3RoZXIgc2l0ZXMgbGlua2VkIHRvIHRoZSBXZWJzaXRlLiBQZXJzb25hbCBpbmZvcm1hdGlvbiB0aGF0XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHlvdSBwcm92aWRlIHRvIHRob3NlIHNpdGVzIGFyZSBub3Qgb3VyIHByb3BlcnR5LiBUaGVzZSBhZmZpbGlhdGVkIHNpdGVzIG1heSBoYXZlIGRpZmZlcmVudFxuICAgICAgICAgICAgICAgICAgICAgICAgICBwcml2YWN5IHByYWN0aWNlcyBhbmQgd2UgZW5jb3VyYWdlIHlvdSB0byByZWFkIHRoZWlyIHByaXZhY3kgcG9saWNpZXMgb2YgdGhlc2Ugd2Vic2l0ZXMsXG4gICAgICAgICAgICAgIHdoZW4geW91IHZpc2l0IHRoZW0uPC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwicHJpdmFjeS1kZXNjLXN1YmhlYWRpbmdcIj4xMS4mbmJzcDsmbmJzcDsmbmJzcDtDSEFOR0VTIElOIFRISVMgUFJJVkFDWSBQT0xJQ1k8L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJwcml2YWN5LWRlc2NcIj5Db21wYW55IHJlc2VydmVzIHRoZSByaWdodCB0byBjaGFuZ2UgdGhpcyBwb2xpY3kgZnJvbSB0aW1lIHRvIHRpbWUsIHdpdGggb3Igd2l0aG91dFxuICAgICAgICAgICAgICAgICAgICAgICAgICBhZHZhbmNlIG5vdGljZSwgYXQgaXRzIHNvbGUgZGlzY3JldGlvbi4gV2UgbWF5IHVwZGF0ZSB0aGlzIHByaXZhY3kgcG9saWN5IHRvIHJlZmxlY3QgY2hhbmdlc1xuICAgICAgICAgICAgICB0byBvdXIgaW5mb3JtYXRpb24gcHJhY3RpY2VzLiBXZSBlbmNvdXJhZ2UgeW91IHRvIHBlcmlvZGljYWxseSB2aXNpdCB0aGlzIHdlYnBhZ2UuPC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwicHJpdmFjeS1kZXNjLXN1YmhlYWRpbmdcIj4xMi4mbmJzcDsmbmJzcDsmbmJzcDtBRERJVElPTkFMIE5PVEVTIFRPIFRIRSBVU0VSPC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgPG9sIGNsYXNzTmFtZT1cInByaXZhY3ktb3JkZXItbGlzdFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaSBjbGFzc05hbWU9XCJwcml2YWN5LW9yZGVyLWl0ZW1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQ29tcGFueSBkb2VzIG5vdCBleGVyY2lzZSBjb250cm9sIG92ZXIgdGhlIHNpdGVzIGRpc3BsYXllZCBhcyBzZWFyY2ggcmVzdWx0cyBvciBsaW5rc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmcm9tIHdpdGhpbiBpdHMgU2VydmljZXMuIFRoZXNlIG90aGVyIHNpdGVzIG1heSBwbGFjZSB0aGVpciBvd24gY29va2llcyBvciBvdGhlciBmaWxlc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbiB0aGUgVXNlcnMnIGNvbXB1dGVyLCBjb2xsZWN0IGRhdGEgb3Igc29saWNpdCBwZXJzb25hbCBpbmZvcm1hdGlvbiBmcm9tIHRoZSBVc2VycywgZm9yXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdoaWNoIENvbXBhbnkgaXMgbm90IHJlc3BvbnNpYmxlIG9yIGxpYWJsZS4gQWNjb3JkaW5nbHksIENvbXBhbnkgZG9lcyBub3QgbWFrZSBhbnlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVwcmVzZW50YXRpb25zIGNvbmNlcm5pbmcgdGhlIHByaXZhY3kgcHJhY3RpY2VzIG9yIHBvbGljaWVzIG9mIHN1Y2ggdGhpcmQgcGFydGllcyBvclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXJtcyBvZiB1c2Ugb2Ygc3VjaCB3ZWJzaXRlcywgbm9yIGRvZXMgQ29tcGFueSBndWFyYW50ZWUgdGhlIGFjY3VyYWN5LCBpbnRlZ3JpdHksIG9yXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHF1YWxpdHkgb2YgdGhlIGluZm9ybWF0aW9uLCBkYXRhLCB0ZXh0LCBzb2Z0d2FyZSwgc291bmQsIHBob3RvZ3JhcGhzLCBncmFwaGljcywgdmlkZW9zLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlcyBvciBvdGhlciBtYXRlcmlhbHMgYXZhaWxhYmxlIG9uIHN1Y2ggd2Vic2l0ZXMuIENvbXBhbnkgZW5jb3VyYWdlcyB0aGUgVXNlclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0byByZWFkIHRoZSBwcml2YWN5IHBvbGljaWVzIG9mIHRoYXQgd2Vic2l0ZS5cbiAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGkgY2xhc3NOYW1lPVwicHJpdmFjeS1vcmRlci1pdGVtXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIENvbXBhbnkgc2hhbGwgbm90IGJlIHJlc3BvbnNpYmxlIGluIGFueSBtYW5uZXIgZm9yIHRoZSBhdXRoZW50aWNpdHkgb2YgdGhlIHBlcnNvbmFsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluZm9ybWF0aW9uIG9yIHNlbnNpdGl2ZSBwZXJzb25hbCBkYXRhIG9yIGluZm9ybWF0aW9uIHN1cHBsaWVkIGJ5IHRoZSBVc2VyIHRvIHRoZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBDb21wYW55IG9yIGFueSBvZiBpdHMgYnVzaW5lc3MgcGFydG5lcnMuIElmIGEgVXNlciBwcm92aWRlcyBhbnkgaW5mb3JtYXRpb24gdGhhdCBpc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1bnRydWUsIGluYWNjdXJhdGUsIG5vdCBjdXJyZW50IG9yIGluY29tcGxldGUgKG9yIGJlY29tZXMgdW50cnVlLCBpbmFjY3VyYXRlLCBub3RcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudCBvciBpbmNvbXBsZXRlKSwgb3IgQ29tcGFueSBoYXMgcmVhc29uYWJsZSBncm91bmRzIHRvIHN1c3BlY3QgdGhhdCBzdWNoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluZm9ybWF0aW9uIGlzIHVudHJ1ZSwgaW5hY2N1cmF0ZSwgbm90IGN1cnJlbnQgb3IgaW5jb21wbGV0ZSwgQ29tcGFueSBoYXMgdGhlIHJpZ2h0IHRvXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1c3BlbmQgb3IgdGVybWluYXRlIHN1Y2ggYWNjb3VudCBhdCBpdHMgc29sZSBkaXNjcmV0aW9uLlxuICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaSBjbGFzc05hbWU9XCJwcml2YWN5LW9yZGVyLWl0ZW1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQ29tcGFueSBzaGFsbCBub3QgYmUgcmVzcG9uc2libGUgZm9yIGFueSBicmVhY2ggb2Ygc2VjdXJpdHkgb3IgZm9yIGFueSBhY3Rpb25zIG9mIGFueVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlyZCBwYXJ0aWVzIHRoYXQgcmVjZWl2ZSBVc2VycycgcGVyc29uYWwgZGF0YSBvciBldmVudHMgdGhhdCBhcmUgYmV5b25kIHRoZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFzb25hYmxlIGNvbnRyb2wgb2YgQ29tcGFueSBpbmNsdWRpbmcsIGFjdHMgb2YgZ292ZXJubWVudCwgY29tcHV0ZXIgaGFja2luZyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdW5hdXRob3JpemVkIGFjY2VzcyB0byBjb21wdXRlciBkYXRhIGFuZCBzdG9yYWdlIGRldmljZSwgY29tcHV0ZXIgY3Jhc2hlcywgYnJlYWNoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9mIHNlY3VyaXR5IGFuZCBlbmNyeXB0aW9uLCBldGMuXG4gICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpIGNsYXNzTmFtZT1cInByaXZhY3ktb3JkZXItaXRlbVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBUaGUgVXNlciBpcyByZXNwb25zaWJsZSBmb3IgbWFpbnRhaW5pbmcgdGhlIGNvbmZpZGVudGlhbGl0eSBvZiB0aGUgVXNlcidzIGFjY291bnQgYWNjZXNzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluZm9ybWF0aW9uIGFuZCBwYXNzd29yZC4gVGhlIFVzZXIgc2hhbGwgYmUgcmVzcG9uc2libGUgZm9yIGFsbCB1c2VzIG9mIHRoZSBVc2VyJ3NcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWNjb3VudCBhbmQgcGFzc3dvcmQsIHdoZXRoZXIgb3Igbm90IGF1dGhvcml6ZWQgYnkgdGhlIFVzZXIuIFRoZSBVc2VyIHNoYWxsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGltbWVkaWF0ZWx5IG5vdGlmeSBDb21wYW55IG9mIGFueSBhY3R1YWwgb3Igc3VzcGVjdGVkIHVuYXV0aG9yaXplZCB1c2Ugb2YgdGhlIFVzZXInc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY2NvdW50IG9yIHBhc3N3b3JkLlxuICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9vbD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInByaXZhY3ktZGVzYy1zdWJoZWFkaW5nXCI+MTMuJm5ic3A7Jm5ic3A7Jm5ic3A7R1JJRVZBTkNFIE9GRklDRVI8L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJwcml2YWN5LWRlc2NcIj5JbiBjYXNlIHlvdSBoYXZlIGFueSBncmlldmFuY2VzIHdpdGggcmVzcGVjdCB0byBpbiBhY2NvcmRhbmNlIHdpdGggYXBwbGljYWJsZSBsYXcgb25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgSW5mb3JtYXRpb24gVGVjaG5vbG9neSBhbmQgcnVsZXMgbWFkZSB0aGVyZSB1bmRlciwgdGhlIG5hbWUgYW5kIGNvbnRhY3QgZGV0YWlscyBvZiB0aGVcbiAgICAgICAgICAgICAgR3JpZXZhbmNlIE9mZmljZXIgYXJlIHByb3ZpZGVkIGJlbG93OjwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxiciAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwicHJpdmFjeS1kZXNjXCI+TXIuIFJhamVuZHJhIFByYXNhZDwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxiciAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwicHJpdmFjeS1kZXNjXCIgc3R5bGU9e3sgbWFyZ2luVG9wOiAwLCBtYXJnaW5Cb3R0b206IDAgfX0+ZG9jcHJpbWUuY29tPC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwicHJpdmFjeS1kZXNjXCIgc3R5bGU9e3sgbWFyZ2luVG9wOiAwLCBtYXJnaW5Cb3R0b206IDAgfX0+UGxvdCBOby4gMTIzLDwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInByaXZhY3ktZGVzY1wiIHN0eWxlPXt7IG1hcmdpblRvcDogMCwgbWFyZ2luQm90dG9tOiAwIH19PlNlY3Rvci00NCwgR3VydWdyYW0tMTIyMDAxLDwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInByaXZhY3ktZGVzY1wiIHN0eWxlPXt7IG1hcmdpblRvcDogMCwgbWFyZ2luQm90dG9tOiAxMCB9fT5IYXJ5YW5hPC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGJyIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJwcml2YWN5LWRlc2NcIj5FbWFpbCA6IGNhcmVAZG9jcHJpbWUuY29tPC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGJyIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJwcml2YWN5LWRlc2NcIj5JZiB5b3UgaGF2ZSBxdWVzdGlvbnMsIGNvbmNlcm5zLCBvciBzdWdnZXN0aW9ucyByZWdhcmRpbmcgb3VyIFByaXZhY3kgUG9saWN5LCB3ZSBjYW4gYmVcbiAgICAgICAgICAgICAgcmVhY2hlZCB1c2luZyB0aGUgY29udGFjdCBpbmZvcm1hdGlvbiBvbiBvdXIgQ29udGFjdCBVcyBwYWdlIG9yIGF0IGNhcmVAZG9jcHJpbWUuY29tLjwvcD5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgUHJpdmFjeVxuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBIZWxtZXRUYWdzIGZyb20gJy4uL0hlbG1ldFRhZ3MnXG5cbmNsYXNzIFRlcm1zIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIHNlbGVjdGVkOiAwLFxuICAgICAgICAgICAgc2Nyb2xsUG9zaXRpb246MFxuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2V0VGFiKHZhbCkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHsgc2VsZWN0ZWQ6IHZhbCB9KVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgaWYodGhpcy5wcm9wcy5mb3JTY3JvbGwpe1xuICAgICAgICAgICAgIGlmIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVzY2hlZHVsaW5nXzknKSkge1xuICAgICAgICAgICAgICAgIHZhciBlbGVtZW50VG9wID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jlc2NoZWR1bGluZ185JykuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wO1xuICAgICAgICAgICAgICAgIHZhciBlbGVtZW50SGVpZ2h0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jlc2NoZWR1bGluZ185JykuY2xpZW50SGVpZ2h0O1xuICAgICAgICAgICAgICAgIHZhciBzY3JvbGxQb3NpdGlvbiA9IGVsZW1lbnRUb3AgLSBlbGVtZW50SGVpZ2h0O1xuICAgICAgICAgICAgICAgIHdpbmRvdy5zY3JvbGxUbygwLCBwYXJzZUludChzY3JvbGxQb3NpdGlvbikpXG4gICAgICAgICAgICB9ICBcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgbGV0IG1haW5DbGFzc1xuICAgICAgICBsZXQgaGVhZGluZ0NsYXNzXG4gICAgICAgIGlmKHRoaXMucHJvcHMuZnJvbUFwcCl7XG4gICAgICAgICAgICBtYWluQ2xhc3MgPSBcImNvbnRhaW5lciBhYm91dC1jb250YWluZXIgYXBwVXJsUGFkZGluZ1wiXG4gICAgICAgICAgICBoZWFkaW5nQ2xhc3MgPSBcImNvbC0xMiB0ZXh0LWNlbnRlciBkLW5vbmUgZC1tZC1ibG9ja1wiXG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgbWFpbkNsYXNzID0gJ2NvbnRhaW5lciBhYm91dC1jb250YWluZXInXG4gICAgICAgICAgICBoZWFkaW5nQ2xhc3MgPSBcImNvbC0xMiB0ZXh0LWNlbnRlclwiXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXttYWluQ2xhc3N9PlxuICAgICAgICAgICAgICAgIDxIZWxtZXRUYWdzIHRhZ3NEYXRhPXt7XG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiAoJ1Rlcm1zICYgQ29uZGl0aW9ucyAtIFN1Ym1pc3Npb24sIExpc3RpbmdzICYgUGF5bWVudCBUZXJtcycpLFxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogKCdkb2NwcmltZTogUmVhZCBUZXJtcyAmIENvbmRpdGlvbnMsIGRldGFpbHMgb24gU3VibWlzc2lvbiBhbmQgQWRtaW5pc3RyYXRpb24gb2YgTGlzdGluZ3MsIFBheW1lbnQgVGVybXMuJylcbiAgICAgICAgICAgICAgICB9fSAvPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtoZWFkaW5nQ2xhc3N9PlxuICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwiZnctNTAwIGFib3V0LWhlYWRpbmdcIiBzdHlsZT17eyBtYXJnaW5Cb3R0b206IDIwIH19PlRlcm1zICZhbXA7IENvbmRpdGlvbnM8L3A+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLTEyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInByaXZhY3ktdGFiLWRpdlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtcInByaXZhY3ktdGFiXCIgKyAodGhpcy5zdGF0ZS5zZWxlY3RlZCA9PSAwID8gXCIgcHJpdmFjeS10YWItYWN0aXZlXCIgOiBcIlwiKX0gb25DbGljaz17dGhpcy5zZXRUYWIuYmluZCh0aGlzLCAwKX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cImZ3LTUwMFwiPkVuZCBVc2VyIEFncmVlbWVudDwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17XCJwcml2YWN5LXRhYlwiICsgKHRoaXMuc3RhdGUuc2VsZWN0ZWQgPT0gMSA/IFwiIHByaXZhY3ktdGFiLWFjdGl2ZVwiIDogXCJcIil9IG9uQ2xpY2s9e3RoaXMuc2V0VGFiLmJpbmQodGhpcywgMSl9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJmdy01MDBcIj5Qcm92aWRlciBUZXJtcyBhbmQgQ29uZGl0aW9uczwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvdyBjdXN0b21lci10ZXJtcy1yb3dcIiBoaWRkZW49e3RoaXMuc3RhdGUuc2VsZWN0ZWQgPT0gMX0+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLTEyIHByaXZhY3ktZGVzYy1kaXZcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInByaXZhY3ktZGVzY1wiPlRoZXNlIFRlcm1zIG9mIFVzZSBzZXRzIGZvcnRoIHRoZSB0ZXJtcyBhbmQgY29uZGl0aW9ucyB0aGF0IGFwcGx5IHRvIHRoZSBhY2Nlc3MgYW5kIHVzZSBvZiB0aGUgc2l0ZSBcInd3dy5kb2NwcmltZS5jb21cIiBhbmQgaXRzIE1vYmlsZSBBcHBsaWNhdGlvbiAoY29sbGVjdGl2ZWx5IGJlIHJlZmVycmVkIHRvIGFzIOKAnFdlYnNpdGXigJ0pLCB3aGljaCBpcyBvd25lZCBhbmQgb3BlcmF0ZWQgYnkgZG9jcHJpbWUgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCwgYSBjb21wYW55IGR1bHkgaW5jb3Jwb3JhdGVkIHVuZGVyIHRoZSBwcm92aXNpb25zIG9mIHRoZSBDb21wYW5pZXMgQWN0LCAyMDEzLCAoaGVyZWluYWZ0ZXIgY29sbGVjdGl2ZWx5IGJlIHJlZmVycmVkIHRvIGFzIFwiQ29tcGFueVwiIG9yIOKAnGRvY3ByaW1l4oCdKS48L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJwcml2YWN5LWRlc2NcIj5QTEVBU0UgUkVBRCBUSEVTRSBURVJNUyBPRiBVU0UgQ0FSRUZVTExZIEJZIEFDQ0VTU0lORyBPUiBVU0lORyBUSElTIElOVEVSTkVUIEJBU0VEIFBMQVRGT1JNLCBZT1UgQUdSRUUgVE8gQkUgQk9VTkQgQlkgVEhFIFRFUk1TIERFU0NSSUJFRCBIRVJFSU4gQU5EIEFMTCBURVJNUyBJTkNPUlBPUkFURUQgQlkgUkVGRVJFTkNFLiBJRiBZT1UgRE8gTk9UIEFHUkVFIFRPIEFMTCBPRiBUSEVTRSBURVJNUywgRE8gTk9UIFVTRSBUSElTIElOVEVSTkVUIEJBU0VEIFBMQVRGT1JNLjwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInByaXZhY3ktZGVzYy1zdWJoZWFkaW5nXCI+MS4mbmJzcDsmbmJzcDsmbmJzcDsmbmJzcDtOQVRVUkUgQU5EIEFQUExJQ0FCSUxJVFkgT0YgVEVSTVM8L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICA8b2wgY2xhc3NOYW1lPVwicHJpdmFjeS1saXN0LWdyb3VwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpIGNsYXNzTmFtZT1cInByaXZhY3ktbGlzdC1pdGVtXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFRoaXMgZG9jdW1lbnQvYWdyZWVtZW50IGlzIGFuIGVsZWN0cm9uaWMgcmVjb3JkIGluIHRlcm1zIG9mIEluZm9ybWF0aW9uIFRlY2hub2xvZ3kgQWN0LCAyMDAwIGFuZCBnZW5lcmF0ZWQgYnkgYSBjb21wdXRlciBzeXN0ZW0gYW5kIGRvZXMgbm90IHJlcXVpcmUgYW55IHBoeXNpY2FsIG9yIGRpZ2l0YWwgc2lnbmF0dXJlcy4gVGhpcyBkb2N1bWVudCBpcyBwdWJsaXNoZWQgaW4gYWNjb3JkYW5jZSB3aXRoIHRoZSBwcm92aXNpb25zIG9mIFJ1bGUgMyBvZiB0aGUgSW5mb3JtYXRpb24gVGVjaG5vbG9neSAoSW50ZXJtZWRpYXJpZXMgZ3VpZGVsaW5lcykgMjAxMSwgdGhhdCBwcm92aWRlcyBmb3IgdGhlIGR1ZSBkaWxpZ2VuY2UgdG8gYmUgZXhlcmNpc2VkIGZvciB0aGUgYWNjZXNzIG9yIHVzYWdlIG9mIHRoaXMgV2Vic2l0ZS5cbiAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpIGNsYXNzTmFtZT1cInByaXZhY3ktbGlzdC1pdGVtXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFlvdXIgYWNjZXNzIG9yIHVzZSBvZiB0aGUgV2Vic2l0ZSwgdHJhbnNhY3Rpb24gb24gdGhlIFdlYnNpdGUgYW5kIHVzZSBvZiBTZXJ2aWNlcyAoYXMgZGVmaW5lZCBoZXJlaW4gYmVsb3cpIGhvc3RlZCBvciBtYW5hZ2VkIHJlbW90ZWx5IHRocm91Z2ggdGhlIFdlYnNpdGUsIGFyZSBnb3Zlcm5lZCBieSB0aGUgZm9sbG93aW5nIHRlcm1zIGFuZCBjb25kaXRpb25zIChoZXJlaW5hZnRlciByZWZlcnJlZCB0byBhcyB0aGUgXCJUZXJtcyBvZiBVc2XigJ0pLCBpbmNsdWRpbmcgdGhlIGFwcGxpY2FibGUgcG9saWNpZXMgd2hpY2ggYXJlIGluY29ycG9yYXRlZCBoZXJlaW4gYnkgd2F5IG9mIHJlZmVyZW5jZSwgYXMgbWF5IGJlIHBvc3RlZCBlbHNld2hlcmUgb24gdGhlIFdlYnNpdGUuIFRoZXNlIFRlcm1zIG9mIFVzZSBjb25zdGl0dXRlcyBhIGxlZ2FsIGFuZCBiaW5kaW5nIGNvbnRyYWN0IGJldHdlZW4geW91IChoZXJlaW5hZnRlciByZWZlcnJlZCB0byBhcyDigJxZb3XigJ0gb3Ig4oCcWW91cuKAnSBvciB0aGUg4oCcVXNlcuKAnSkgb24gb25lIHBhcnQgYW5kIENvbXBhbnkgb24gdGhlIG90aGVyIFBhcnQuXG4gICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaSBjbGFzc05hbWU9XCJwcml2YWN5LWxpc3QtaXRlbVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBCeSBhY2Nlc3NpbmcsIGJyb3dzaW5nIG9yIGluIGFueSB3YXkgdHJhbnNhY3Rpbmcgb24gdGhlIFdlYnNpdGUsIG9yIGF2YWlsaW5nIGFueSBTZXJ2aWNlcywgWW91XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNpZ25pZnkgWW91ciBhZ3JlZW1lbnQgdG8gYmUgYm91bmQgYnkgdGhlc2UgVGVybXMgb2YgVXNlLiBGdXJ0aGVyLCBieSBpbXBsaWVkbHkgb3IgZXhwcmVzc2x5XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjY2VwdGluZyB0aGVzZSBUZXJtcyBvZiBVc2UsIHlvdSBhbHNvIGFjY2VwdCBhbmQgYWdyZWUgdG8gYmUgYm91bmQgYnkgT3VyIHBvbGljaWVzLCBpbmNsdWRpbmdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhlIFByaXZhY3kgUG9saWN5LCBhbnkgZGlzY2xhaW1lcnMgYW5kIHN1Y2ggb3RoZXIgcnVsZXMsIGd1aWRlbGluZXMsIHBvbGljaWVzLCB0ZXJtcyBhbmRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uZGl0aW9ucyBhcyBhcmUgcmVsZXZhbnQgdW5kZXIgdGhlIGFwcGxpY2FibGUgbGF3KHMpIGluIEluZGlhIGZvciB0aGUgcHVycG9zZXMgb2YgYWNjZXNzaW5nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicm93c2luZyBvciB0cmFuc2FjdGluZyBvbiB0aGUgV2Vic2l0ZSwgb3IgYXZhaWxpbmcgYW55IG9mIHRoZSBTZXJ2aWNlcywgc2hhbGwgYmUgZGVlbWVkIHRvIGJlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluY29ycG9yYXRlZCBpbnRvLCBhbmQgY29uc2lkZXJlZCBhcyBwYXJ0IGFuZCBwYXJjZWwgb2YgdGhlc2UgVGVybXMgb2YgVXNlLiBIb3dldmVyLCBpZiBZb3VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmF2aWdhdGUgYXdheSBmcm9tIHRoZSBXZWJzaXRlIHRvIGEgdGhpcmQgcGFydHkgd2Vic2l0ZSwgWW91IG1heSBiZSBzdWJqZWN0IHRvIGFsdGVybmF0aXZlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlcm1zIGFuZCBjb25kaXRpb25zIG9mIHVzZSBhbmQgcHJpdmFjeSBwb2xpY3ksIGFzIG1heSBiZSBzcGVjaWZpZWQgb24gc3VjaCB3ZWJzaXRlLiBJbiBzdWNoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50LCB0aGUgdGVybXMgYW5kIGNvbmRpdGlvbnMgb2YgdXNlIGFuZCBwcml2YWN5IHBvbGljeSBhcHBsaWNhYmxlIHRvIHRoYXQgd2Vic2l0ZSB3aWxsIGdvdmVyblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBZb3VyIHVzZSBvZiB0aGF0IHdlYnNpdGUuXG4gICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaSBjbGFzc05hbWU9XCJwcml2YWN5LWxpc3QtaXRlbVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBCZSBzdXJlIHRvIHJldHVybiB0byB0aGlzIHBhZ2UgcGVyaW9kaWNhbGx5IHRvIHJldmlldyB0aGUgbW9zdCBjdXJyZW50IHZlcnNpb24gb2YgdGhlIFRPVS4gV2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzZXJ2ZSB0aGUgcmlnaHQgYXQgYW55IHRpbWUsIGF0IG91ciBzb2xlIGRpc2NyZXRpb24sIHRvIGNoYW5nZSBvciBvdGhlcndpc2UgbW9kaWZ5IHRoZSBUT1VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2l0aG91dCBwcmlvciBub3RpY2UsIGFuZCB5b3VyIGNvbnRpbnVlZCBhY2Nlc3Mgb3IgdXNlIG9mIHRoaXMgV2Vic2l0ZSBzaWduaWZpZXMgeW91ciBhY2NlcHRhbmNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9mIHRoZSB1cGRhdGVkIG9yIG1vZGlmaWVkIFRPVS5cbiAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpIGNsYXNzTmFtZT1cInByaXZhY3ktbGlzdC1pdGVtXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFRoZXNlIFRlcm1zIG9mIFVzZSBhcmUgYSBiaW5kaW5nIGNvbnRyYWN0IGFuZCBhcHBsaWVzIHRvIHlvdSB3aGV0aGVyIHlvdSBhcmUgYSBwYXRpZW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoaXMvaGVyIHJlcHJlc2VudGF0aXZlcyBvciBhZmZpbGlhdGVzLCBzZWFyY2hpbmcgZm9yIE1lZGljYWwgRXhwZXJ0cyBvciBUaGlyZCBQYXJ0eSBoZWFsdGggY2FyZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXJ2aWNlIHByb3ZpZGVycyAoc3VjaCBhcyBkb2N0b3JzLCBob3NwaXRhbHMsIGRpYWdub3N0aWMgY2VudHJlcyBvciBjbGluaWNzLCBsYWJvcmF0b3JpZXMsIGV0YylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3VnaCB0aGUgV2Vic2l0ZSjigJxFbmQtVXNlcuKAnSwg4oCceW914oCdIG9yIOKAnFVzZXLigJ0pOyBvciBvdGhlcndpc2UgYSB1c2VyL3Zpc2l0b3Igb2YgdGhlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFdlYnNpdGUo4oCceW914oCdIG9yIOKAnFVzZXLigJ0pLlxuICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvb2w+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJwcml2YWN5LWRlc2Mtc3ViaGVhZGluZ1wiPjIuJm5ic3A7Jm5ic3A7Jm5ic3A7Jm5ic3A7U0VSVklDRVM8L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJwcml2YWN5LWRlc2NcIj5UaGUgV2Vic2l0ZSBpcyBhIHBsYXRmb3JtIHRoYXQgZmFjaWxpdGF0ZXMgKGkpIGRpYWdub3N0aWMgc2VydmljZXMgYmVpbmcgb2ZmZXJlZCBieSB2YXJpb3VzIHRoaXJkIHBhcnR5IGRpYWdub3N0aWMgY2VudHJlcyBvciBvdGhlciBoZWFsdGggY2FyZSBzZXJ2aWNlIHByb3ZpZGVycyAoc3VjaCBhcyBkb2N0b3JzLCBob3NwaXRhbHMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBkaWFnbm9zdGljIGNlbnRyZXMgb3IgY2xpbmljcywgbGFib3JhdG9yaWVzLCBldGMpICjigJxUaGlyZCBQYXJ0eSBMYWJzLyBUaGlyZCBQYXJ0eSBzZXJ2aWNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBwcm92aWRlcnPigJ0pOyAoaWkpIG9ubGluZSBtZWRpY2FsIGNvbnN1bHRhbmN5IHNlcnZpY2VzLyBzZWNvbmQgb3BpbmlvbiBiZWluZyBvZmZlcmVkIGJ5IHRoaXJkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJ0eSBpbmRlcGVuZGVudCBkb2N0b3JzICjigJxNZWRpY2FsIEV4cGVydHPigJ0pOyBhbmQgKGlpaSkgb25saW5lIGFkdmVydGlzZW1lbnRzIG9mIHZhcmlvdXNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwb25zb3JzIGFkdmVydGlzaW5nIGFuZCBtYXJrZXRpbmcgdGhlaXIgb3duIGdvb2QgYW5kIHNlcnZpY2VzICjigJxUaGlyZCBQYXJ0eSBBZHZlcnRpc2Vyc+KAnSkuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBUaGlyZCBQYXJ0eSBMYWJzLCBNZWRpY2FsIEV4cGVydHMgYW5kIHRoZSBUaGlyZCBQYXJ0eSBBZHZlcnRpc2VycyBhcmUgY29sbGVjdGl2ZWx5IHJlZmVycmVkIHRvIGFzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICB0aGUg4oCcVGhpcmQgUGFydHkgU2VydmljZSBQcm92aWRlcnPigJ0uIEZ1cnRoZXIgdGhlIFdlYnNpdGUgYWxzbyBzZXJ2ZXMgYXMgYW4gaW5mb3JtYXRpb25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYXRmb3JtIHByb3ZpZGluZyBoZWFsdGggYW5kIHdlbGxuZXNzIHJlbGF0ZWQgaW5mb3JtYXRpb24gdG8gdGhlIFVzZXJzIGFjY2Vzc2luZyB0aGUgV2Vic2l0ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgKFRoZSBzZXJ2aWNlcyBvZiBUaGlyZCBQYXJ0eSBTZXJ2aWNlcyBQcm92aWRlciBhbmQgdGhlIGluZm9ybWF0aW9uIHNlcnZpY2VzIHByb3ZpZGVkIHRocm91Z2ggb3VyIFdlYnNpdGUgaXMgY29sbGVjdGl2ZWx5IHJlZmVycmVkIHRvIGFzIHRoZSDigJxTZXJ2aWNlc+KAnSkuXG4gICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJwcml2YWN5LWRlc2NcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBUaGUgYXJyYW5nZW1lbnQgYmV0d2VlbiB0aGUgVGhpcmQgUGFydHkgU2VydmljZSBQcm92aWRlcnMsIFlvdSBhbmQgVXMgc2hhbGwgYmUgZ292ZXJuZWQgaW5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY2NvcmRhbmNlIHdpdGggdGhlc2UgVGVybXMgb2YgVXNlLiBUaGUgU2VydmljZXMgd291bGQgYmUgbWFkZSBhdmFpbGFibGUgdG8gc3VjaCBuYXR1cmFsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGVyc29ucyB3aG8gaGF2ZSBhZ3JlZWQgdG8gdXNlIHRoZSBXZWJzaXRlIGFmdGVyIG9idGFpbmluZyBkdWUgcmVnaXN0cmF0aW9uLCBpbiBhY2NvcmRhbmNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2l0aCB0aGUgcHJvY2VkdXJlIGFzIGRldGVybWluZWQgYnkgVXMsIGZyb20gdGltZSB0byB0aW1lLCAocmVmZXJyZWQgdG8gYXMg4oCcWW914oCdIG9yIOKAnFlvdXLigJ0gb3JcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICDigJxZb3Vyc2VsZuKAnSBvciDigJxVc2Vy4oCdLCB3aGljaCB0ZXJtcyBzaGFsbCBhbHNvIGluY2x1ZGUgbmF0dXJhbCBwZXJzb25zIHdobyBhcmUgYWNjZXNzaW5nIHRoZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFdlYnNpdGUgbWVyZWx5IGFzIHZpc2l0b3JzKS4gVGhlIFNlcnZpY2VzIGFyZSBvZmZlcmVkIHRvIFlvdSB0aHJvdWdoIHZhcmlvdXMgbW9kZXMgd2hpY2ggc2hhbGxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmNsdWRlIGlzc3VlIG9mIGRpc2NvdW50IGNvdXBvbnMgYW5kIHZvdWNoZXJzIHRoYXQgY2FuIGJlIHJlZGVlbWVkIGZvciB2YXJpb3VzIGdvb2RzL1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlcnZpY2VzIG9mZmVyZWQgZm9yIHNhbGUgYnkgcmVsZXZhbnQgVGhpcmQgUGFydHkgU2VydmljZSBQcm92aWRlcnMuIFRvIGZhY2lsaXRhdGUgdGhlIHJlbGF0aW9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmV0d2VlbiBZb3UgYW5kIHRoZSBUaGlyZCBQYXJ0eSBTZXJ2aWNlIFByb3ZpZGVycyB0aHJvdWdoIHRoZSBXZWJzaXRlLCBkb2NwcmltZSBzaGFsbCBzZW5kIHRvXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgWW91IChwcm9tb3Rpb25hbCBjb250ZW50IGluY2x1ZGluZyBidXQgbm90IGxpbWl0ZWQgdG8gZS1tYWlsZXJzLCBub3RpZmljYXRpb25zIGFuZCBtZXNzYWdlcykuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgWW91IGFncmVlIGFuZCBhY2tub3dsZWRnZSB0aGF0IHRoZSBXZWJzaXRlIGlzIGEgcGxhdGZvcm0gdGhhdCBZb3UgYW5kIFRoaXJkIFBhcnR5IFNlcnZpY2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBQcm92aWRlcnMgdXRpbGl6ZSB0byBtZWV0IGFuZCBpbnRlcmFjdCB3aXRoIGFub3RoZXIgZm9yIHRoZWlyIHRyYW5zYWN0aW9ucy4gZG9jcHJpbWUgaXMgbm90IGFuZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbm5vdCBiZSBhIHBhcnR5IHRvIG9yIHNhdmUgYXMgZXhjZXB0IGFzIG1heSBiZSBwcm92aWRlZCBpbiB0aGVzZSBUZXJtcyBvZiBVc2UsIGNvbnRyb2wgaW4gYW55XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFubmVyLCBhbnkgdHJhbnNhY3Rpb24gYmV0d2VlbiBZb3UgYW5kIHRoZSBUaGlyZCBQYXJ0eSBTZXJ2aWNlIFByb3ZpZGVycy4gQXMgYSBjb25kaXRpb24gb2YgWW91ciB1c2Ugb2YgYW5kIGFjY2VzcyB0byB0aGUgZGlhZ25vc3RpYyBzZXJ2aWNlcyBwcm92aWRlZCB0aHJvdWdoIHRoZSBXZWJzaXRlIGFuZCBZb3VyIGFjY2VwdGFuY2Ugb2YgdGhlc2UgVGVybXMgb2YgVXNlLCBZb3UgYXJlIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBydWxlcy9ndWlkZWxpbmVzOlxuICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgPG9sIGNsYXNzTmFtZT1cInByaXZhY3ktbGlzdC1ncm91cFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaSBjbGFzc05hbWU9XCJwcml2YWN5LWxpc3QtaXRlbVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb2NwcmltZSBwcm92aWRlcyBTZXJ2aWNlcyB0aHJvdWdoIHRoZSBXZWJzaXRlIGFzIGEgbWFya2V0cGxhY2UgYW5kIGZhY2lsaXRhdGVzIHRoZSBVc2Vyc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0byBhdmFpbCBkaWFnbm9zdGljIHRlc3QvIHBhY2thZ2VzIGZhY2lsaXRpZXMgb2ZmZXJlZCBieSBUaGlyZCBQYXJ0eSBMYWJzIHRocm91Z2ggdGhlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFdlYnNpdGUuIGRvY3ByaW1lIGlzIG5vdCBhbmQgc2hhbGwgbm90IGJlIHJlc3BvbnNpYmxlIGZvciBhbnkgc2FtcGxlIGNvbGxlY3RlZCwgdGVzdHNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uZHVjdGVkIGFuZCByZXBvcnRzIGdlbmVyYXRlZCBieSB0aGUgVGhpcmQgUGFydHkgTGFicyBhbmQgZG9lcyBub3QgZGVhbCB3aXRoIGFueSBvZlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBUaGlyZCBQYXJ0eSBMYWJz4oCZIGNsaWVudCBvciBwYXRpZW50IG1hbmFnZWQgYnkgc3VjaCBUaGlyZCBQYXJ0eSBMYWJzIHRocm91Z2ggdGhlIFdlYnNpdGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYW5kIG9ubHkgcHJvdmlkZXMgZmFjaWxpdGF0aW9uIFNlcnZpY2VzIHRvIHRoZSBVc2VycyB0aHJvdWdoIHRoZSBXZWJzaXRlLiBVc2Ugb2YgdGhlIFdlYnNpdGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF5IHJlcXVpcmUgdGhlIFRoaXJkIFBhcnR5IExhYnMgdG8gdXNlIHNvZnR3YXJlIGFuZCB0aGUgVGhpcmQgUGFydHkgaGVhbHRoIGNhcmUgc2VydmljZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm92aWRlcnMgaGF2ZSB0byBlbnN1cmUgdGhlIHByb2N1cmVtZW50IG9mIHN1Y2ggc29mdHdhcmUgZnJvbSB0aGUgY29uY2VybmVkIHByb3ZpZGVycy5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgVXNlciBhbmQgdGhlIFRoaXJkIFBhcnR5IExhYnMgYWdyZWUgdG8gdXNlIHRoZSBXZWJzaXRlIGFuZCB0aGUgbWF0ZXJpYWxzIHByb3ZpZGVkIHRoZXJlaW5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25seSBmb3IgcHVycG9zZXMgdGhhdCBhcmUgcGVybWl0dGVkIGJ5OiAoYSkgdGhlc2UgVGVybXMgb2YgVXNlOyBhbmQgKGIpIGFueSBhcHBsaWNhYmxlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhdyhzKSwgcmVndWxhdGlvbiBvciBnZW5lcmFsbHkgYWNjZXB0ZWQgcHJhY3RpY2VzIG9yIGd1aWRlbGluZXMgaW4gdGhlIHJlbGV2YW50XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGp1cmlzZGljdGlvbnMuXG4gICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaSBjbGFzc05hbWU9XCJwcml2YWN5LWxpc3QtaXRlbVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj5OTyBET0NUT1ItUEFUSUVOVCBSRUxBVElPTlNISVA6PC9zcGFuPiBkb2NwcmltZSBkb2VzIG5vdCByZXBsYWNlIFlvdXIgcmVsYXRpb25zaGlwIHdpdGhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGh5c2ljaWFuIG9yIGhlYWx0aGNhcmUgcHJvdmlkZXIuIFRoZSBpbmZvcm1hdGlvbiBpbnRlcnByZXRlZFNIT1VMRCBOT1QgYmUgcmVsaWVkIHVwb25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXMgYSBzdWJzdGl0dXRlIGZvciBzb3VuZCBwcm9mZXNzaW9uYWwgbWVkaWNhbCBhZHZpY2UsIGV2YWx1YXRpb24gb3IgY2FyZSBmcm9tIFlvdXJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGh5c2ljaWFuIG9yIG90aGVyIHF1YWxpZmllZCBoZWFsdGhjYXJlIHByb3ZpZGVyLlxuICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGkgY2xhc3NOYW1lPVwicHJpdmFjeS1saXN0LWl0ZW1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgWW91IGFja25vd2xlZGdlIHRoYXQgdGhlIE1lZGljYWwgRXhwZXJ0cyBlbXBhbmVsZWQgd2l0aCBVcyBhcmUgaW5kZXBlbmRlbnQgY29udHJhY3RvcnNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYW5kIHRoZXJlYnkgZG9jcHJpbWUgaGFzIGFuIGluZGVwZW5kZW50IGNvbnRyYWN0b3IgcmVsYXRpb25zaGlwIHdpdGggc3VjaCBNZWRpY2FsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEV4cGVydHMgYW5kIHRoZXJlZm9yZSBpbiBubyBldmVudCBkb2NwcmltZSB3aWxsIGJlIGRpcmVjdGx5IG9yIHZpY2FyaW91c2x5IGxpYWJsZSBmb3IgYW55XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFkdmljZSBvciBtZWRpY2FsIGNvbnN1bHRhbmN5IG9yIGFueSBsb3NzIGFyaXNpbmcgdGhlcmVmcm9tIHRoYXQgdGhlIE1lZGljYWwgRXhwZXJ0cyBtYXlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvdmlkZSB0byBZb3Ugb3IgWW91IG1heSBhdmFpbCBhcyBwYXJ0IG9mIHRoZSBTZXJ2aWNlcy5cbiAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpIGNsYXNzTmFtZT1cInByaXZhY3ktbGlzdC1pdGVtXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFlvdSBhY2tub3dsZWRnZSB0aGF0IHRoZSBlLXByZXNjcmlwdGlvbiB3aGljaCBtYXkgYmUgaXNzdWVkIGJ5IHRoZSBNZWRpY2FsIEV4cGVydChzKSB3aWxsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJlIGEgdmFsaWQgcHJlc2NyaXB0aW9uIHVuZGVyIGFwcGxpY2FibGUgbGF3KHMpIG9mIEluZGlhIGFuZCBtYXkgYmUgdXNlZCBmb3IgZGlzcGVuc2F0aW9uIG9mXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lZGljaW5lcyBieSBhbnkgcGhhcm1hY2lzdCBpbiBJbmRpYS4gWW91IGZ1cnRoZXIgYWdyZWUgYW5kIGFja25vd2xlZGdlIHRoYXQgaWYgYW55IGUtXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByZXNjcmlwdGlvbiB3aGljaCBpcyBwcm9jZXNzZWQgdGhyb3VnaCB0aGUgV2Vic2l0ZSAod2hldGhlciBvcmlnaW5hbCBvciBzY2FubmVkIGNvcHkgb2ZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhlIG9yaWdpbmFsIHByZXNjcmlwdGlvbikgZm9yIHByb2N1cmluZyBtZWRpY2luZXMgaXMgb25seSBieSB0aGUgTWVkaWNhbCBFeHBlcnRzLCBhbmRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZG9jcHJpbWUgd2lsbCBvbmx5IGFjdCBhcyBhbiBhZ2dyZWdhdG9yIGFuZCBhc3N1bWUgbm8gcmVzcG9uc2liaWxpdHkgYW5kLyBvciBsaWFiaWxpdHkgaW5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVsYXRpb24gdG8gc3VjaCBlLXByZXNjcmlwdGlvbi5cbiAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpIGNsYXNzTmFtZT1cInByaXZhY3ktbGlzdC1pdGVtXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvY3ByaW1lIGlzIGRlc2lnbmVkIHRvIHN1cHBvcnQgdGhlIGhlYWx0aCBkZWNpc2lvbnMgYW5kIGNob2ljZXMgdGhhdCBZb3UgbWFrZS4gVGhlc2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVjaXNpb25zIGFuZCBjaG9pY2VzIGFyZSBZb3VycywgYW5kIFdlIGJlbGlldmUgdGhhdCBZb3UsIGluIGNvbm5lY3Rpb24gd2l0aCB0aGUgYWR2aWNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFlvdSByZWNlaXZlIGZyb20gWW91ciBkb2N0b3Igb3Igb3RoZXIgcHJvZmVzc2lvbmFsIGhlYWx0aGNhcmUgcHJvdmlkZXIsIGFyZSB0aGUgYmVzdFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWNpc2lvbiBtYWtlciBhYm91dCBZb3VyIGhlYWx0aC4gV2UgY2Fubm90IG1ha2UgZGVjaXNpb25zIGZvciB5b3UuIEhvd2V2ZXIsIHdoYXQgV2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FuIGRvIGlzIGhlbHAgWW91IGZpbmQgZ29vZCBoZWFsdGggaW5mb3JtYXRpb24gYW5kIGNvbm5lY3Qgd2l0aCBkb2N0b3JzIGZvciBpbi1wZXJzb25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5mb3JtYXRpb24uIE9uIGRvY3ByaW1lIFlvdSBjYW4gYXNrIGFuZCBmaW5kIGluZm9ybWF0aW9uYWwgcXVlc3Rpb25zIGFuZCByZWxhdGVkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVkdWNhdGlvbmFsIGFuc3dlcnMgYnkgTWVkaWNhbCBFeHBlcnRzLiBUaGUgV2Vic2l0ZSBpcyBub3QgYSBwbGFjZSBmb3IgdGhlIHByYWN0aWNlIG9mXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lZGljaW5lLCBidXQgTWVkaWNhbCBFeHBlcnRzIG9uIHRoZSBXZWJzaXRlIGNhbiBiZSBhIHJlc291cmNlIGZvciByZWxpYWJsZSwgcmVsZXZhbnRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2VuZXJhbCBoZWFsdGggaW5mb3JtYXRpb24uXG4gICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaSBjbGFzc05hbWU9XCJwcml2YWN5LWxpc3QtaXRlbVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBUaGUgU2VydmljZXMgc2hvdWxkIG5vdCBiZSBkZXBlbmRlZCB1cG9uIGFuZCBzaG91bGQgbm90IGJlIHRyZWF0ZWQgYXMgYSByZXBsYWNlbWVudCBmb3JcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb2J0YWluaW5nIGNvbnN1bHRhdGlvbiBmb3IgZGlzZWFzZXMgYXMgdGhlIGNvbnN1bHRhdGlvbiBwcm92aWRlZCB0aHJvdWdoIHRoZSBXZWJzaXRlIGlzIGdlbmVyaWMgaW4gdGhlIGFwcHJvYWNoIGFuZCBzaGFsbCBub3QgYW5kIGNhbm5vdCBhY3QgYXMgYSBzdWJzdGl0dXRlIGZvciBwaHlzaWNhbCBjb25zdWx0YXRpb24gd2l0aCBhIGRvY3Rvci4gQWxzbyB0aGUgQ29uc3VsdGF0aW9ucyBwcm92aWRlZCB0aHJvdWdoIHRoZSBXZWJzaXRlIG1heSBub3QgYmVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlhZ25vc3RpYyBpbiBuYXR1cmUuXG4gICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaSBjbGFzc05hbWU9XCJwcml2YWN5LWxpc3QtaXRlbVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBXZSBkbyBub3QgcmVjb21tZW5kIG9yIGVuZG9yc2UgYW55IHNwZWNpZmljIE1lZGljYWwgRXhwZXJ0KHMpLCB0ZXN0cywgcHJvZHVjdHMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb2NlZHVyZXMsIG9waW5pb25zLCBvciBvdGhlciBpbmZvcm1hdGlvbiB0aGF0IG1heSBiZSBtZW50aW9uZWQgb24gdGhlIFdlYnNpdGUuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlbGlhbmNlIG9uIGFueSBpbmZvcm1hdGlvbiBwcm92aWRlZCBvbiB0aGUgV2Vic2l0ZSBpcyBzb2xlbHkgYXQgWW91ciBvd24gcmlzay4gSW4gY2FzZSBvZlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbnkgbWVkaWNhbCBlbWVyZ2VuY3ksIGtpbmRseSBjb250YWN0IFlvdXIgbmVhcmVzdCBkb2N0b3IvaG9zcGl0YWwgb3IgYW55IHJlbGF0ZWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVscGxpbmUuXG4gICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaSBjbGFzc05hbWU9XCJwcml2YWN5LWxpc3QtaXRlbVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBUaGUgU2VydmljZXMgYXJlIG5vdCBmb3IgdXNlIGluIG1lZGljYWwgZW1lcmdlbmNpZXMgb3IgZm9yIGNyaXRpY2FsIGhlYWx0aCBzaXR1YXRpb25zXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcXVpcmluZyBwcm9tcHQgbWVkaWNhbCBhdHRlbnRpb24uIFRoZSBTZXJ2aWNlcyBhcmUgbm90IGludGVuZGVkIHRvIGJlIHJlYWwtdGltZSBhbmQgbWF5XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vdCBiZSB0aGUgYmVzdCBzb2x1dGlvbiB3aGVuIGEgZmFjZS10by1mYWNlIGNvbnN1bHRhdGlvbiBpcyBhIG11c3QgYW5kIHRoZXJlZm9yZSBXZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHJvbmdseSBkaXNjb3VyYWdlIGFueSBkZWxheSBpbiBzZWVraW5nIGFkdmljZSBmcm9tIFlvdXIgZG9jdG9yIG9uIGFjY291bnQgb2Ygc29tZXRoaW5nXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQgWW91IG1heSBoYXZlIGhlYXJkL3ZpZXdlZCBvbiB0aGUgV2Vic2l0ZS4gWW91IHRha2UgZnVsbCByZXNwb25zaWJpbGl0eSBmb3IgZW5zdXJpbmdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdCB0aGUgaW5mb3JtYXRpb24gc3VibWl0dGVkIGlzIGFjY3VyYXRlIGFuZCBkb2NwcmltZSBzaGFsbCBub3QgbWFrZSBhbnkgZWZmb3J0IHRvXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRlIGFueSBpbmZvcm1hdGlvbiBwcm92aWRlZCBieSBZb3UgZm9yIHVzaW5nIHRoZSBTZXJ2aWNlcyB3aXRoIHJlc3BlY3QgdG8gY29udGVudCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29ycmVjdG5lc3Mgb3IgdXNhYmlsaXR5LiBXZSwgd2l0aCBhbiBpbnRlbnRpb24gdG8gcHJvdmlkZSB0aGUgYmVzdCBzZXJ2aWNlcyBwb3NzaWJsZSBjb3VsZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc2sgWW91IHRvIHNoYXJlIG1vcmUgaW5mb3JtYXRpb24gYXMgYW5kIHdoZW4gbmVlZGVkLiBUaGUgU2VydmljZXMgc2hvdWxkIG5vdCBiZSB1c2VkIGZvclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbWVyZ2VuY3kgYXBwb2ludG1lbnQgcHVycG9zZXMuXG4gICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaSBjbGFzc05hbWU9XCJwcml2YWN5LWxpc3QtaXRlbVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBUaGUgb3BpbmlvbnMsIHN0YXRlbWVudHMsIGFuc3dlcnMgYW5kIHRlbGUtY29uc3VsdGF0aW9ucyAoY29sbGVjdGl2ZWx5IOKAnENvbnN1bHRhdGlvbuKAnSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvdmlkZWQgYnkgdGhlIE1lZGljYWwgRXhwZXJ0cyB0aHJvdWdoIHRoZSBXZWJzaXRlIGFyZSBzb2xlbHkgdGhlIGluZGl2aWR1YWwgYW5kXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluZGVwZW5kZW50IG9waW5pb25zIGFuZCBzdGF0ZW1lbnRzIG9mIHN1Y2ggTWVkaWNhbCBFeHBlcnRzIGFuZCBkbyBub3QgcmVmbGVjdCB0aGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3BpbmlvbnMgb2YgZG9jcHJpbWUsIGluY2x1ZGluZyBidXQgbm90IGxpbWl0ZWQgdG8gaXRzIG9mZmljZXJzLCBkaXJlY3RvcnMsIHJlcHJlc2VudGF0aXZlc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbmQgaXRzIGFmZmlsaWF0ZXMuIGRvY3ByaW1lIGRvZXMgbm90IHJlY29tbWVuZCBvciBlbmRvcnNlIGFueSBzcGVjaWZpYyB0ZXN0cywgcGh5c2ljaWFucyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvZHVjdHMsIHByb2NlZHVyZXMsIG9waW5pb25zLCBvciBvdGhlciBpbmZvcm1hdGlvbiB0aGF0IG1heSBiZSBtZW50aW9uZWQgb24gdGhlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFdlYnNpdGUuXG4gICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaSBjbGFzc05hbWU9XCJwcml2YWN5LWxpc3QtaXRlbVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBUaGUgaW5jbHVzaW9uIG9mIHByb2Zlc3Npb25hbHMsIHNwZWNpYWxpc3RzIGFuZC8gb3IgTWVkaWNhbCBFeHBlcnRzIG9uIHRoZSBXZWJzaXRlIG9yIGluIGFueVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9mZXNzaW9uYWwgZGlyZWN0b3J5IG9uIHRoZSBXZWJzaXRlIGRvZXMgbm90IGltcGx5IHJlY29tbWVuZGF0aW9uIG9yIGVuZG9yc2VtZW50IG9mXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2ggc3BlY2lhbGlzdHMgYW5kLyBvciBNZWRpY2FsIEV4cGVydHMgbm9yIGlzIHN1Y2ggaW5mb3JtYXRpb24gaW50ZW5kZWQgYXMgYSB0b29sIGZvclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2ZXJpZnlpbmcgdGhlIGNyZWRlbnRpYWxzLCBxdWFsaWZpY2F0aW9ucywgb3IgYWJpbGl0aWVzIG9mIGFueSBzcGVjaWFsaXN0cyBhbmQvIG9yIE1lZGljYWxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRXhwZXJ0cyBjb250YWluZWQgdGhlcmVpbi4gU3VjaCBpbmZvcm1hdGlvbiBpcyBwcm92aWRlZCBvbiBhbiDigJhhcy1pc+KAmSBiYXNpcyBhbmQgZG9jcHJpbWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzY2xhaW1zIGFsbCB3YXJyYW50aWVzLCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLCBpbmNsdWRpbmcgYnV0IG5vdCBsaW1pdGVkIHRvIHRoZSBpbXBsaWVkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdhcnJhbnRpZXMgb2YgbWVyY2hhbnRhYmlsaXR5IGFuZCBmaXRuZXNzIGZvciBwYXJ0aWN1bGFyIHB1cnBvc2UuIGRvY3ByaW1lIGRpc2NsYWltcyBhbnlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVnYWwgb3IgZmluYW5jaWFsIGV2ZW50cyBvciBvdXRjb21lcyByZWxhdGVkIHRvIHRoZSBTZXJ2aWNlcyBhdmFpbGVkIHRocm91Z2ggdGhlIHVzZSBvZiB0aGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgV2Vic2l0ZS5cbiAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpIGNsYXNzTmFtZT1cInByaXZhY3ktbGlzdC1pdGVtXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvY3ByaW1lIG1ha2VzIG5vIHdhcnJhbnR5IHRoYXQgdGhlIFNlcnZpY2VzIHdpbGwgbWVldCBZb3VyIHJlcXVpcmVtZW50cywgb3IgdGhhdCB0aGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgU2VydmljZShzKSB3aWxsIGJlIHVuaW50ZXJydXB0ZWQsIHRpbWVseSwgc2VjdXJlLCBvciBlcnJvciBmcmVlLiBUaGlzIGluY2x1ZGVzIGxvc3Mgb2YgZGF0YSBvclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbnkgc2VydmljZSBpbnRlcnJ1cHRpb24gY2F1c2VkIGJ5IGRvY3ByaW1lIGVtcGxveWVlcyBvciByZXByZXNlbnRhdGl2ZXMuIGRvY3ByaW1lIGlzIG5vdFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zaWJsZSBmb3IgdHJhbnNtaXNzaW9uIGVycm9ycywgY29ycnVwdGlvbiBvZiBkYXRhLlxuICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGkgY2xhc3NOYW1lPVwicHJpdmFjeS1saXN0LWl0ZW1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZG9jcHJpbWUgaXMgZm9yIHBlcnNvbmFsIHVzZSBhbmQgdGhlIFNlcnZpY2VzIGFyZSBmb3IgaW5kaXZpZHVhbHMgdG8gdXNlIGZvciBzdXBwb3J0aW5nIHRoZWlyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBlcnNvbmFsIGhlYWx0aCBkZWNpc2lvbnMuIFlvdSBtYXkgdXNlIHRoZSBXZWJzaXRlIGZvciBwZXJzb25hbCwgYnV0IG5vdCBmb3IgY29tbWVyY2lhbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHVycG9zZXMuXG4gICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaSBjbGFzc05hbWU9XCJwcml2YWN5LWxpc3QtaXRlbVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBZb3VyIHJpZ2h0IHRvIHVzZSB0aGUgU2VydmljZXMgaXMgbm90IHRyYW5zZmVyYWJsZS5cbiAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpIGNsYXNzTmFtZT1cInByaXZhY3ktbGlzdC1pdGVtXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE5vdHdpdGhzdGFuZGluZyBhbnl0aGluZyB0byB0aGUgY29udHJhcnkgY29udGFpbmVkIGhlcmVpbiwgWW91IGFsb25lIHNoYWxsIGJlIGxpYWJsZSBmb3JcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgWW91ciBkZWFsaW5ncyBhbmQgaW50ZXJhY3Rpb24gd2l0aCBwYXRpZW50cyBvciBNZWRpY2FsIEV4cGVydHMgKGFzIHRoZSBjYXNlIG1heSBiZSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGFjdGVkIG9yIG1hbmFnZWQgdGhyb3VnaCB0aGUgV2Vic2l0ZSBhbmQgZG9jcHJpbWUgc2hhbGwgaGF2ZSBubyBsaWFiaWxpdHkgb3JcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2liaWxpdHkgaW4gdGhpcyByZWdhcmQuIGRvY3ByaW1lIGRvZXMgbm90IGd1YXJhbnRlZSBvciBtYWtlIGFueSByZXByZXNlbnRhdGlvbiB3aXRoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BlY3QgdG8gdGhlIGNvcnJlY3RuZXNzLCBjb21wbGV0ZW5lc3Mgb3IgYWNjdXJhY3kgb2YgdGhlIGluZm9ybWF0aW9uIG9yIGRldGFpbCBwcm92aWRlZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBieSBzdWNoIGNsaWVudCwgcGF0aWVudCwgVXNlciwgTWVkaWNhbCBFeHBlcnRzIG9yIGFueSB0aGlyZCBwYXJ0eSB0aHJvdWdoIHRoZSBXZWJzaXRlLlxuICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGkgY2xhc3NOYW1lPVwicHJpdmFjeS1saXN0LWl0ZW1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgVGhlIGV4Y2hhbmdlcyBiZXR3ZWVuIHRoZSBNZWRpY2FsIEV4cGVydHMgYW5kIHRoZSBwYXRpZW50IHRocm91Z2ggdGhlIGNoYXQgd2luZG93IG9yXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG92ZXIgdGVsZXBob25lIChhcyB0aGUgY2FzZSBtYXliZSkgYW5kIHRoZSBlLXByZXNjcmlwdGlvbiB3b3VsZCBiZSBhY2Nlc3NpYmxlIHRvIGRvY3ByaW1lXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciB0aGUgcHVycG9zZXMgb2YgbW9uaXRvcmluZyB0aGUgcXVhbGl0eSBvZiB0aGUgY29uc3VsdGF0aW9uLlxuICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGkgY2xhc3NOYW1lPVwicHJpdmFjeS1saXN0LWl0ZW1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZG9jcHJpbWUgbWF5LCBhdCBpdHMgc29sZSBkaXNjcmV0aW9uLCBzdXNwZW5kIFVzZXLigJlzIG9yIE1lZGljYWwgRXhwZXJ04oCZcyBhYmlsaXR5IHRvIHVzZSBvclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY2Nlc3MgdGhlIFdlYnNpdGUgYXQgYW55IHRpbWUgd2hpbGUgZG9jcHJpbWUgaW52ZXN0aWdhdGVzIGNvbXBsYWludHMgb3IgYWxsZWdlZCB2aW9sYXRpb25zXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9mIHRoZXNlIFRlcm1zIG9mIFVzZSwgb3IgZm9yIGFueSBvdGhlciByZWFzb24uIGRvY3ByaW1lIGhhcyB0aGUgcmlnaHQgdG8gZWRpdCBwcm9maWxlcyBvZlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBNZWRpY2FsIEV4cGVydHMgdG8gbWFrZSB0aGVtIG1vcmUgc3VpdGFibGUgZm9yIHBhdGllbnQvIFVzZXJzIHNlYXJjaGVzIG9uIHRoZSBXZWJzaXRlLlxuICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGkgY2xhc3NOYW1lPVwicHJpdmFjeS1saXN0LWl0ZW1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTm90d2l0aHN0YW5kaW5nIGFueXRoaW5nIHRvIHRoZSBjb250cmFyeSBjb250YWluZWQgaGVyZWluLCBVc2VycyBhbG9uZSBzaGFsbCBiZSBsaWFibGUgZm9yXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlYWxpbmdzIGFuZCBpbnRlcmFjdGlvbiB3aXRoIFRoaXJkIFBhcnR5IExhYnMgYW5kIE1lZGljYWwgRXhwZXJ0cyBjb250YWN0ZWQgb3IgbWFuYWdlZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdWdoIHRoZSBXZWJzaXRlIGFuZCBkb2NwcmltZSBzaGFsbCBoYXZlIG5vIGxpYWJpbGl0eSBvciByZXNwb25zaWJpbGl0eSBpbiB0aGlzIHJlZ2FyZC5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZG9jcHJpbWUgZG9lcyBub3QgZ3VhcmFudGVlIG9yIG1ha2UgYW55IHJlcHJlc2VudGF0aW9uIHdpdGggcmVzcGVjdCB0byB0aGUgY29ycmVjdG5lc3MsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBsZXRlbmVzcyBvciBhY2N1cmFjeSBvZiB0aGUgdGVzdHMgY29uZHVjdGVkIGFuZCByZXBvcnRzIGdlbmVyYXRlZCBieSB0aGUgVGhpcmQgUGFydHlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTGFicyBvciBlLXByZXNjcmlwdGlvbiBwcmVzY3JpYmVkIGJ5IE1lZGljYWwgRXhwZXJ0cy5cbiAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpIGNsYXNzTmFtZT1cInByaXZhY3ktbGlzdC1pdGVtXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvY3ByaW1lIG1heSwgYXQgaXRzIHNvbGUgZGlzY3JldGlvbiwgc3VzcGVuZCBUaGlyZCBQYXJ0eSBMYWJzIG9yIFVzZXJzIGFiaWxpdHkgdG8gdXNlIG9yXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjY2VzcyB0aGUgV2Vic2l0ZSBhdCBhbnkgdGltZSB3aGlsZSBkb2NwcmltZSBpbnZlc3RpZ2F0ZXMgY29tcGxhaW50cyBvciBhbGxlZ2VkIHZpb2xhdGlvbnNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb2YgdGhlc2UgVGVybXMgb2YgVXNlLCBvciBmb3IgYW55IG90aGVyIHJlYXNvbi4gZG9jcHJpbWUgaGFzIHRoZSByaWdodCB0byBlZGl0IHByb2ZpbGVzIG9mXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFRoaXJkIFBhcnR5IExhYnMgdG8gbWFrZSB0aGVtIG1vcmUgc3VpdGFibGUgZm9yIHBhY2thZ2Ugc2VhcmNoZXMgb24gdGhlIFdlYnNpdGUuIElmIFRoaXJkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFBhcnR5IExhYnMgYW5kLyBvciBVc2VycyBmaW5kIGFueSB3cm9uZyBpbmZvcm1hdGlvbiBvbiB0aGUgV2Vic2l0ZSBpbiByZWxhdGlvbiB0byBzdWNoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFRoaXJkIFBhcnR5IExhYnMgYW5kLyBvciBVc2VyLCB0aGV5IGNhbiBjb3JyZWN0IGl0IHRoZW1zZWx2ZXMgb3IgY29udGFjdCBkb2NwcmltZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbW1lZGlhdGVseSBmb3Igc3VjaCBjb3JyZWN0aW9ucy4gZG9jcHJpbWUgc2hhbGwgaGF2ZSBubyBsaWFiaWxpdHkgb3IgcmVzcG9uc2liaWxpdHkgaW4gdGhpc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWdhcmQuXG4gICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9vbD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInByaXZhY3ktZGVzYy1zdWJoZWFkaW5nXCI+My4mbmJzcDsmbmJzcDsmbmJzcDsmbmJzcDtFTElHSUJJTElUWTwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxvbCBjbGFzc05hbWU9XCJwcml2YWN5LWxpc3QtZ3JvdXBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGkgY2xhc3NOYW1lPVwicHJpdmFjeS1saXN0LWl0ZW1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQXMgYSBjb25kaXRpb24gdG8gWW91ciB1c2Ugb2YgdGhlIFdlYnNpdGUsIFlvdSBtdXN0IGJlIDE4IChlaWdodGVlbikgeWVhcnMgb2YgYWdlIG9yIG9sZGVyIHRvXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVzZSBvciB2aXNpdCB0aGUgV2Vic2l0ZSBpbiBhbnkgbWFubmVyLiBCeSB2aXNpdGluZyB0aGUgV2Vic2l0ZSBvciBhY2NlcHRpbmcgdGhlc2UgVGVybXMgb2YgVXNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBZb3UgcmVwcmVzZW50IGFuZCB3YXJyYW50IHRvIGRvY3ByaW1lIHRoYXQgWW91IGFyZSAxOCAoZWlnaHRlZW4pIHllYXJzIG9mIGFnZSBvciBvbGRlciwgYW5kXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQgWW91IGhhdmUgdGhlIHJpZ2h0LCBhdXRob3JpdHkgYW5kIGNhcGFjaXR5IHRvIHVzZSB0aGUgV2Vic2l0ZSBhbmQgYWdyZWUgdG8gYW5kIGFiaWRlIGJ5XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoZXNlIFRlcm1zIG9mIFVzZS5cbiAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpIGNsYXNzTmFtZT1cInByaXZhY3ktbGlzdC1pdGVtXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEZvciB0aGUgcHVycG9zZXMgb2YgYXZhaWxpbmcgdGhlIFNlcnZpY2VzIGFuZC9vciB0cmFuc2FjdGluZyB3aXRoIHRoZSBUaGlyZCBQYXJ0eSBTZXJ2aWNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFByb3ZpZGVycyB0aHJvdWdoIHRoZSBXZWJzaXRlLCBZb3UgYXJlIHJlcXVpcmVkIHRvIG9idGFpbiByZWdpc3RyYXRpb24sIGluIGFjY29yZGFuY2Ugd2l0aCB0aGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvY2VkdXJlIGVzdGFibGlzaGVkIGJ5IGRvY3ByaW1lIGluIHRoaXMgcmVnYXJkLiBBcyBwYXJ0IG9mIHRoZSByZWdpc3RyYXRpb24gcHJvY2VzcywgZG9jcHJpbWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF5IGNvbGxlY3QgdGhlIGZvbGxvd2luZyBwZXJzb25hbCBpbmZvcm1hdGlvbiBmcm9tIFlvdTpcbiAgICAgICAgICAgICAgIDxvbCBjbGFzc05hbWU9XCJzdWItbGlzdFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE5hbWU7XG4gICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFVzZXIgSUQ7XG4gICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEVtYWlsIGFkZHJlc3M7XG4gICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEFkZHJlc3MgKGluY2x1ZGluZyBjb3VudHJ5IGFuZCBaSVAvIHBvc3RhbCBjb2RlKTtcbiAgICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgR2VuZGVyO1xuICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBBZ2U7XG4gICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFBob25lIG51bWJlcjtcbiAgICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgWW91ciBhbmQgWW91ciBmYW1pbHnigJkgbWVkaWNhbCBoaXN0b3J5O1xuICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBBbnkgb3RoZXIgaW5mb3JtYXRpb25cbiAgICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvb2w+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGkgY2xhc3NOYW1lPVwicHJpdmFjeS1saXN0LWl0ZW1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgVGhlIHJlZ2lzdHJhdGlvbiBvbiBvciB1c2UvIGFjY2VzcyBvZiB0aGUgV2Vic2l0ZSBpcyBvbmx5IGF2YWlsYWJsZSB0byBuYXR1cmFsIHBlcnNvbnMsIG90aGVyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYW4gdGhvc2Ugd2hvIGFyZSDigJhpbmNvbXBldGVudCB0byBjb250cmFjdOKAmSB1bmRlciB0aGUgQ29udHJhY3QgQWN0LiBUaGF0IGlzLCBwZXJzb25zXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluY2x1ZGluZyBtaW5vcnMsIHVuLWRpc2NoYXJnZWQgaW5zb2x2ZW50cyBldGMuIGFyZSBub3QgZWxpZ2libGUgdG8gcmVnaXN0ZXIgb24sIG9yIHVzZS8gYWNjZXNzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoZSBXZWJzaXRlLiBCeSByZWdpc3RlcmluZywgYWNjZXNzaW5nIG9yIHVzaW5nIHRoZSBXZWJzaXRlLCBZb3UgYWNjZXB0IHRoZSB0ZXJtcyBvZiB0aGVzZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBUZXJtcyBvZiBVc2UgYW5kIHJlcHJlc2VudCBhbmQgd2FycmFudCB0byBkb2NwcmltZSB0aGF0IHlvdSBhcmUg4oCYY29tcGV0ZW50IHRvIGNvbnRyYWN04oCZXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVuZGVyIHRoZSBDb250cmFjdCBBY3QgYW5kIGhhdmUgdGhlIHJpZ2h0LCBhdXRob3JpdHkgYW5kIGNhcGFjaXR5IHRvIHVzZSB0aGUgV2Vic2l0ZSBhbmQgYWdyZWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdG8gYW5kIGFiaWRlIGJ5IHRoZXNlIFRlcm1zIG9mIFVzZS5cbiAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpIGNsYXNzTmFtZT1cInByaXZhY3ktbGlzdC1pdGVtXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEEgcmVnaXN0ZXJlZCBpZCBjYW4gb25seSBiZSB1dGlsaXplZCBieSB0aGUgcGVyc29uIHdob3NlIGRldGFpbHMgaGF2ZSBiZWVuIHByb3ZpZGVkIGFuZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb2NwcmltZSBkb2VzIG5vdCBwZXJtaXQgbXVsdGlwbGUgcGVyc29ucyB0byBzaGFyZSBhIHNpbmdsZSBsb2cgaW4vIHJlZ2lzdHJhdGlvbiBpZC4gSG93ZXZlciwgYVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWdpc3RlcmVkIHVzZXIsIGJlaW5nIGFsc28gYSBwYXJlbnQgb3IgbGVnYWwgZ3VhcmRpYW4gb2YgYSBwZXJzb24g4oCYaW5jb21wZXRlbnQgdG8gY29udHJhY3TigJlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VjaCBhcyBtaW5vcnMgb3IgcGVyc29ucyB3aXRoIHVuc291bmQgbWluZCwgd291bGQgYmUgcGVybWl0dGVkIHRvIGFjY2VzcyBhbmQgdXNlIHRoZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBXZWJzaXRlIGZvciB0aGUgcHVycG9zZXMgb2YgcHJvY3VyaW5nIHRoZSBTZXJ2aWNlcywgb24gYmVoYWxmIG9mIHN1Y2ggcGVyc29ucy5cbiAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpIGNsYXNzTmFtZT1cInByaXZhY3ktbGlzdC1pdGVtXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE9yZ2FuaXphdGlvbnMsIGNvbXBhbmllcywgYW5kIGJ1c2luZXNzZXMgbWF5IG5vdCBiZWNvbWUgcmVnaXN0ZXJlZCBtZW1iZXJzIG9uIHRoZSBXZWJzaXRlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9yIHVzZSB0aGUgV2Vic2l0ZSBhcyBpbmRpdmlkdWFsIG1lbWJlcnMuXG4gICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9vbD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInByaXZhY3ktZGVzYy1zdWJoZWFkaW5nXCI+NC4mbmJzcDsmbmJzcDsmbmJzcDsmbmJzcDtZT1VSIEFDQ09VTlQ8L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJwcml2YWN5LWRlc2NcIj5Zb3UgYWdyZWUgYW5kIGFja25vd2xlZGdlIHRoYXQgWW91IHdvdWxkPC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgPG9sIGNsYXNzTmFtZT1cInByaXZhY3ktbGlzdC1ncm91cFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaSBjbGFzc05hbWU9XCJwcml2YWN5LWxpc3QtaXRlbVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm92aWRlIGFjY3VyYXRlLCB0cnV0aGZ1bCwgY3VycmVudCBhbmRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tcGxldGUgaW5mb3JtYXRpb24gd2hlbiBjcmVhdGluZyBZb3VyIGFjY291bnQgYW5kIGluIGFsbCBZb3VyIGRlYWxpbmdzIHRocm91Z2ggdGhlIFdlYnNpdGU7XG4gICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaSBjbGFzc05hbWU9XCJwcml2YWN5LWxpc3QtaXRlbVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYWludGFpbiBhbmQgcHJvbXB0bHkgdXBkYXRlIFlvdXIgYWNjb3VudCBpbmZvcm1hdGlvbjtcbiAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpIGNsYXNzTmFtZT1cInByaXZhY3ktbGlzdC1pdGVtXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1haW50YWluIHRoZSBzZWN1cml0eSBvZiBZb3VyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjY291bnQgYnkgbm90IHNoYXJpbmcgWW91ciBwYXNzd29yZCB3aXRoIG90aGVycyBhbmQgcmVzdHJpY3RpbmcgYWNjZXNzIHRvIFlvdXIgYWNjb3VudCBhbmRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgWW91ciBjb21wdXRlcjtcbiAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpIGNsYXNzTmFtZT1cInByaXZhY3ktbGlzdC1pdGVtXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb21wdGx5IG5vdGlmeSBkb2NwcmltZSBpZiBZb3UgZGlzY292ZXIgb3Igb3RoZXJ3aXNlIHN1c3BlY3QgYW55IHNlY3VyaXR5XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFjaGVzIHJlbGF0aW5nIHRvIHRoZSBXZWJzaXRlOyBhbmRcbiAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpIGNsYXNzTmFtZT1cInByaXZhY3ktbGlzdC1pdGVtXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRha2UgcmVzcG9uc2liaWxpdHkgZm9yIGFsbCB0aGUgYWN0aXZpdGllcyB0aGF0IG9jY3VyIHVuZGVyIFlvdXIgYWNjb3VudCBhbmQgYWNjZXB0IGFsbCByaXNrIG9mIHVuYXV0aG9yaXplZCBhY2Nlc3MuXG4gICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9vbD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInByaXZhY3ktZGVzYy1zdWJoZWFkaW5nXCI+NS4mbmJzcDsmbmJzcDsmbmJzcDsmbmJzcDtDT05URU5UIEFORCBJTkZPUk1BVElPTiBPTiBUSEUgV0VCU0lURTwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInByaXZhY3ktZGVzY1wiPmRvY3ByaW1lIGF1dGhvcml6ZXMgWW91IHRvIHZpZXcgYW5kIGFjY2VzcyB0aGUgY29udGVudCBhdmFpbGFibGUgb24gdGhlIFdlYnNpdGUgc29sZWx5IGZvciB0aGUgcHVycG9zZXMgb2YgYXZhaWxpbmcgdGhlIFNlcnZpY2VzLCBzdWNoIGFzIHZpc2l0aW5nLCB1c2luZywgb3JkZXJpbmcsIHJlY2VpdmluZywgZGVsaXZlcmluZyBhbmQgY29tbXVuaWNhdGluZyBvbmx5IGFzIHBlciB0aGVzZSBUZXJtcyBvZiBVc2UuIFRoZSBjb250ZW50cyBvbiB0aGUgV2Vic2l0ZSBpbmNsdWRpbmcgaW5mb3JtYXRpb24sIHRleHQsIGdyYXBoaWNzLCBpbWFnZXMsIGxvZ29zLCBidXR0b24gaWNvbnMsIHNvZnR3YXJlIGNvZGUsIGRlc2lnbiwgYW5kIHRoZSBjb2xsZWN0aW9uLCBhcnJhbmdlbWVudCBhbmQgYXNzZW1ibHkgb2YgY29udGVudCAo4oCcQ29udGVudOKAnSksIGNvbnRhaW5zIHRoZSBmb2xsb3dpbmc6PC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgPG9sIGNsYXNzTmFtZT1cInByaXZhY3ktbGlzdC1ncm91cFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaSBjbGFzc05hbWU9XCJwcml2YWN5LWxpc3QtaXRlbVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBUaGlyZCBQYXJ0eSBTZXJ2aWNlIFByb3ZpZGVyc+KAmSBjb250ZW50IGluY2x1ZGluZyBhbnkgY29udGVudCB3aGljaCBtYXkgYmVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGV2ZWxvcGVkIG9uIGJlaGFsZiBvZiBhbmQgcHVibGlzaGVkIGluIHRoZSBuYW1lIG9mIGEgVGhpcmQgU2VydmljZXMgUHJvdmlkZXJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKOKAnFRoaXJkIFBhcnR5IENvbnRlbnTigJ0pXG4gICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaSBjbGFzc05hbWU9XCJwcml2YWN5LWxpc3QtaXRlbVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbi1ob3VzZSBjb250ZW50IHByb3ZpZGVkIGJ5IGRvY3ByaW1lIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24sIHRleHQsIGNvcHksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF1ZGlvLCB2aWRlbywgcGhvdG9ncmFwaHMsIGlsbHVzdHJhdGlvbnMsIGdyYXBoaWNzIGFuZCBvdGhlciB2aXN1YWxzICjigJxkb2NwcmltZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBDb250ZW504oCdKVxuICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGkgY2xhc3NOYW1lPVwicHJpdmFjeS1saXN0LWl0ZW1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQW55IGNvbnRlbnQgc3VibWl0dGVkIGJ5IFlvdTtcbiAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L29sPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwicHJpdmFjeS1kZXNjXCI+VGhlIGRvY3ByaW1lIGNvbnRlbnQgaXMgdGhlIHByb3BlcnR5IG9mIGRvY3ByaW1lIGFuZCBpcyBwcm90ZWN0ZWQgdW5kZXIgY29weXJpZ2h0LCB0cmFkZW1hcmsgYW5kIG90aGVyIGFwcGxpY2FibGUgbGF3KHMpLiBZb3Ugc2hhbGwgbm90IG1vZGlmeSB0aGUgZG9jcHJpbWUgQ29udGVudCBvciByZXByb2R1Y2UsIGRpc3BsYXksIHB1YmxpY2x5IHBlcmZvcm0sIGRpc3RyaWJ1dGUsIG9yIG90aGVyd2lzZSB1c2UgdGhlIGRvY3ByaW1lIENvbnRlbnQgaW4gYW55IHdheSBmb3IgYW55IHB1YmxpYyBvciBjb21tZXJjaWFsIHB1cnBvc2Ugb3IgZm9yIHBlcnNvbmFsIGdhaW4uPC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwicHJpdmFjeS1kZXNjXCI+V2l0aCByZXNwZWN0IHRvIHN1Y2ggQ29udGVudCB0aGF0IHlvdSBzdWJtaXQgb3IgbWFrZSBhdmFpbGFibGUgb24gdGhpcyBXZWJzaXQsIHlvdSBncmFudCBkb2NwcmltZSBhIHBlcnBldHVhbCwgaXJyZXZvY2FibGUsIG5vbi10ZXJtaW5hYmxlLCB3b3JsZHdpZGUsIHJveWFsdHktZnJlZSBhbmQgbm9uLWV4Y2x1c2l2ZSBsaWNlbnNlIHRvIHVzZSwgY29weSwgZGlzdHJpYnV0ZSwgcHVibGljbHkgZGlzcGxheSwgbW9kaWZ5LCBjcmVhdGUgZGVyaXZhdGl2ZSB3b3JrcywgYW5kIHN1YmxpY2Vuc2Ugc3VjaCBtYXRlcmlhbHMgb3IgYW55IHBhcnQgb2Ygc3VjaCBtYXRlcmlhbHMvQ29udGVudCAoYXMgd2VsbCBhcyB1c2UgdGhlIG5hbWUgdGhhdCB5b3Ugc3VibWl0IGluIGNvbm5lY3Rpb24gd2l0aCBzdWNoIHN1Ym1pdHRlZCBjb250ZW50KS4gV2UgdGFrZSBubyByZXNwb25zaWJpbGl0eSBhbmQgYXNzdW1lIG5vIGxpYWJpbGl0eSBmb3IgYW55IENvbnRlbnQgcG9zdGVkIG9yIHN1Ym1pdHRlZCBieSB5b3UuIFdlIGhhdmUgbm8gb2JsaWdhdGlvbiB0byBwb3N0IHlvdXIgY29tbWVudHM7IHdlIHJlc2VydmUgdGhlIHJpZ2h0IGluIG91ciBhYnNvbHV0ZSBkaXNjcmV0aW9uIHRvIGRldGVybWluZSB3aGljaCBjb21tZW50cyBhcmUgcHVibGlzaGVkIG9uIHRoZSBXZWJzaXRlLiBJZiB5b3UgZG8gbm90IGFncmVlIHRvIHRoZXNlIHRlcm1zIGFuZCBjb25kaXRpb25zLCBwbGVhc2UgZG8gbm90IHByb3ZpZGUgdXMgd2l0aCBhbnkgc3VibWl0dGVkIENvbnRlbnQuIFlvdSBhZ3JlZSB0aGF0IHlvdSBhcmUgZnVsbHkgcmVzcG9uc2libGUgZm9yIHRoZSBjb250ZW50XG4gICAgICAgICAgICAgICAgICAgICAgICAgICB5b3Ugc3VibWl0LlxuICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwicHJpdmFjeS1kZXNjXCI+PHNwYW4+UHJvaGliaXRlZCBDb250ZW50Ojwvc3Bhbj4gWW91IGFncmVlIHRoYXQgYW55IENvbnRlbnQgc3VibWl0dGVkIGJ5IFlvdSBzaGFsbCBub3QgaW5mcmluZ2UgdGhlIGludGVsbGVjdHVhbCBwcm9wZXJ0eSwgcHJpdmFjeSwgcHVibGljaXR5LCBjb3B5cmlnaHQsIG9yIG90aGVyIGxlZ2FsIHJpZ2h0cyBvZiBhbnkgcGVyc29uIG9yIGVudGl0eS4gVGhlIENvbnRlbnQgbXVzdCBub3QgYmUgZmFsc2UsIG1pc2xlYWRpbmcsIGZyYXVkdWxlbnQsIGRlZmFtYXRvcnksIG9yIGRlY2VwdGl2ZS4gVGhlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBmb2xsb3dpbmcgQ29udGVudCBpcyBwcm9oaWJpdGVkIG9uIHRoZSBXZWJzaXRlOlxuICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgPG9sIGNsYXNzTmFtZT1cInN1Yi1saXN0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50IHRoYXQgZGVtZWFucywgZGVncmFkZXMsIG9yIHNob3dzIGhhdGUgdG93YXJkIGEgcGFydGljdWxhciByYWNlLCBnZW5kZXIsIGN1bHR1cmUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvdW50cnksIGJlbGllZiwgb3IgdG93YXJkIGFueSBtZW1iZXIgb2YgYSBwcm90ZWN0ZWQgY2xhc3M7XG4gICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudCBkZXBpY3RpbmcgbnVkaXR5LCBzZXh1YWwgYmVoYXZpb3VyLCBvciBvYnNjZW5lIGdlc3R1cmVzO1xuICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQgZGVwaWN0aW5nIGRydWcgdXNlO1xuICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQgZGVwaWN0aW5nIGV4Y2Vzc2l2ZSB2aW9sZW5jZSwgaW5jbHVkaW5nIHRoZSBoYXJtaW5nIG9mIGFuaW1hbHM7XG4gICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2hvY2tpbmcsIHNlbnNhdGlvbmFsLCBvciBkaXNyZXNwZWN0ZnVsIGNvbnRlbnQ7XG4gICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVjZXB0aXZlLCBmYWxzZSBvciBtaXNsZWFkaW5nIGNvbnRlbnQsIGluY2x1ZGluZyBkZWNlcHRpdmUgY2xhaW1zLCBvZmZlcnMsIG9yIGJ1c2luZXNzIHByYWN0aWNlcztcbiAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50IHRoYXQgZGlyZWN0cyB1c2VycyB0byBwaGlzaGluZyBsaW5rcywgbWFsd2FyZSwgb3Igc2ltaWxhcmx5IGhhcm1mdWwgY29kZXMgb3Igc2l0ZXM7IGFuZFxuICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQgdGhhdCBkZWNlaXZlcyBvdGhlciBVc2VycyBpbiBhbnkgbWFubmVyIGZvciBwcm92aWRpbmcgdGhlaXIgcGVyc29uYWwgaW5mb3JtYXRpb25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2l0aG91dCB0aGVpciBrbm93bGVkZ2UsIHVuZGVyIGZhbHNlIHByZXRlbmNlcywgb3IgdG8gY29tcGFuaWVzIHRoYXQgcmVzZWxsLCB0cmFkZSwgb3JcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3RoZXJ3aXNlIG1pc3VzZSB0aGF0IHBlcnNvbmFsIGluZm9ybWF0aW9uXG4gICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9vbD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInByaXZhY3ktZGVzY1wiPklmIGRvY3ByaW1lIGRldGVybWluZXMgdGhhdCB5b3UgaGF2ZSBwcm92aWRlZCBmcmF1ZHVsZW50LCBpbmFjY3VyYXRlLCBvciBpbmNvbXBsZXRlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBpbmZvcm1hdGlvbiwgaW5jbHVkaW5nIHRocm91Z2ggZmVlZGJhY2ssIGRvY3ByaW1lIHJlc2VydmVzIHRoZSByaWdodCB0byBpbW1lZGlhdGVseSBzdXNwZW5kXG4gICAgICAgICAgICAgICAgICAgICAgICAgICB5b3VyIGFjY2VzcyB0byB0aGUgV2Vic2l0ZSBvciBhbnkgb2YgeW91ciBhY2NvdW50cyB3aXRoIGRvY3ByaW1lIGFuZCBtYWtlcyBzdWNoIGRlY2xhcmF0aW9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBvbiB0aGUgd2Vic2l0ZSBhbG9uZ3NpZGUgeW91ciBuYW1lL3lvdXIgY2xpbmlj4oCZcyBuYW1lIGFzIGRldGVybWluZWQgYnkgZG9jcHJpbWUgZm9yIHRoZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvdGVjdGlvbiBvZiBpdHMgYnVzaW5lc3MgYW5kIGluIHRoZSBpbnRlcmVzdHMgb2YgVXNlcnMuIFlvdSBzaGFsbCBiZSBsaWFibGUgdG8gaW5kZW1uaWZ5XG4gICAgICAgICAgICAgICAgICAgICAgICAgICBkb2NwcmltZSBmb3IgYW55IGxvc3NlcyBpbmN1cnJlZCBhcyBhIHJlc3VsdCBvZiB5b3VyIG1pc3JlcHJlc2VudGF0aW9ucyBvciBmcmF1ZHVsZW50IGZlZWRiYWNrXG4gICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0IGhhcyBhZHZlcnNlbHkgYWZmZWN0ZWQgZG9jcHJpbWUgb3IgaXRzIFVzZXJzLlxuICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwicHJpdmFjeS1kZXNjXCI+WW91IGFja25vd2xlZGdlIHRoYXQgYWx0aG91Z2ggc29tZSBvZiB0aGUgY29udGVudCwgdGV4dCwgZGF0YSwgZ3JhcGhpY3MsIGltYWdlcywgaW5mb3JtYXRpb24sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBzdWdnZXN0aW9ucywgZ3VpZGFuY2UsIGFuZCBvdGhlciBtYXRlcmlhbCAoY29sbGVjdGl2ZWx5LCDigJxJbmZvcm1hdGlvbuKAnSkgdGhhdCBpcyBwcm92aWRlZCB0byBZb3VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uIHRoZSBXZWJzaXRlIChpbmNsdWRpbmcgSW5mb3JtYXRpb24gcHJvdmlkZWQgaW4gZGlyZWN0IHJlc3BvbnNlIHRvIFlvdXIgcXVlc3Rpb25zIG9yIHBvc3RpbmdzKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF5IGJlIHByb3ZpZGVkIGJ5IGluZGl2aWR1YWxzIGluIHRoZSBtZWRpY2FsIHByb2Zlc3Npb24sIHRoZSBwcm92aXNpb24gb2Ygc3VjaCBJbmZvcm1hdGlvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgZG9lcyBub3QgY3JlYXRlIGEgZG9jdG9yL21lZGljYWwgcHJvZmVzc2lvbmFsLXBhdGllbnQgcmVsYXRpb25zaGlwLCBidXQgaXMgcHJvdmlkZWQgdG8gaW5mb3JtXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBZb3Ugb24gdmFyaW91cyBtZWRpY2FsIGNvbmRpdGlvbnMsIG1lZGljYWwgZGlhZ25vc2lzIGFuZCB0cmVhdG1lbnQgYW5kIGl0IGRvZXMgbm90IGNvbnN0aXR1dGUgYVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlyZWN0IG1lZGljYWwgZGlhZ25vc2lzLCB0cmVhdG1lbnQgb3IgcHJlc2NyaXB0aW9uLiBFdmVyeXRoaW5nIG9uIHRoZSBXZWJzaXRlIHNob3VsZCBiZSB1c2VkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgaW5mb3JtYXRpb24gcHVycG9zZXMgb25seS5cbiAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInByaXZhY3ktZGVzYy1zdWJoZWFkaW5nXCI+Ni4mbmJzcDsmbmJzcDsmbmJzcDsmbmJzcDtESVNDTEFJTUVSPC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwicHJpdmFjeS1kZXNjXCI+QXMgd2l0aCBhbnkgbWVkaWNhbCBwcm9jZWR1cmUsIHRoZXJlIGFyZSBwb3RlbnRpYWwgcmlza3MgYXNzb2NpYXRlZCB3aXRoIHVzaW5nIHRoZSBTZXJ2aWNlcyBvZmZlcmVkIGJ5IHRoZSBXZWJzaXRlLiBCeSB1c2luZyB0aGUgU2VydmljZXMsIFlvdSBhZ3JlZSB0byBhYmlkZSBieSB0aGVzZSBUZXJtcyBvZiBVc2UsIFByaXZhY3kgUG9saWN5IGFuZCByaXNrcyBkZXNjcmliZWQgYmVsb3cuIFRoZXNlIHJpc2tzIGluY2x1ZGUsIGJ1dCBtYXkgbm90IGJlIGxpbWl0ZWQgdG86PC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgPG9sIGNsYXNzTmFtZT1cInByaXZhY3ktbGlzdC1ncm91cFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaSBjbGFzc05hbWU9XCJwcml2YWN5LWxpc3QtaXRlbVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBXaGlsZSB0aGUgV2Vic2l0ZSBpcyBhbiBob25lc3QgYXR0ZW1wdCB0byBwcm92aWRlIGFjY2VzcyB0byB0aGUgYmVzdCBwb3NzaWJsZSBtZWRpY2FsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluZm9ybWF0aW9uIHRvIHRoZSBVc2VycywgdGhlIE1lZGljYWwgRXhwZXJ0cyB3aWxsIG5vdCBiZSBleGFtaW5pbmcgWW91IHBoeXNpY2FsbHkuIFRoZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBNZWRpY2FsIEV4cGVydHMgbWF5IG5vdCBoYXZlIGFjY2VzcyB0byBhbGwgb3Igc29tZSBvZiBZb3VyIG1lZGljYWwgaGlzdG9yeSB0aGF0IG1pZ2h0IGJlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNyaXRpY2FsIHRvIGNvbnN1bHQgWW91LiBUaGUgTWVkaWNhbCBFeHBlcnRzIHdpbGwgbm90IGhhdmUgdGhlIGJlbmVmaXQgb2YgaW5mb3JtYXRpb24gdGhhdFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3b3VsZCBiZSBvYnRhaW5lZCBieSBleGFtaW5pbmcgWW91IGluIHBlcnNvbiwgb2JzZXJ2aW5nIFlvdXIgcGh5c2ljYWwgY29uZGl0aW9uIGFuZCBieVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnb2luZyB0aHJvdWdoIFlvdXIgbWVkaWNhbCByZWNvcmRzLiBUaGlzIG1lYW5zIHRoYXQgdGhlIFNlcnZpY2VzIHByb3ZpZGVkIGlzIGRpZmZlcmVudCBmcm9tXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoZSBkaWFnbm9zdGljIGFuZCB0cmVhdG1lbnQgc2VydmljZXMgdHlwaWNhbGx5IGRlY2lkZWQgYnkgYSBwaHlzaWNpYW4uIFRoZXJlZm9yZSwgdGhlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE1lZGljYWwgRXhwZXJ0cyBtYXkgbm90IGJlIGF3YXJlIG9mIGZhY3RzIG9yIGluZm9ybWF0aW9uIHRoYXQgd291bGQgYWZmZWN0IGhpcyBvciBoZXJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3BpbmlvbiBvZiBZb3VyIGRpYWdub3Npcy4gVG8gcmVkdWNlIHRoZSByaXNrIG9mIHRoaXMgbGltaXRhdGlvbiwgZG9jcHJpbWUgc3Ryb25nbHlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZW5jb3VyYWdlcyBZb3UgdG8gYmUgaW4gdG91Y2ggd2l0aCBhbiBvbi1ncm91bmQgcGh5c2ljaWFuIGFuZCBzaGFyZSB0aGUgZG9jcHJpbWXigJlzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9waW5pb24gd2l0aCBoaW0vaGVyLlxuICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGkgY2xhc3NOYW1lPVwicHJpdmFjeS1saXN0LWl0ZW1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQnkgcmVxdWVzdGluZyBhIG1lZGljYWwgb3BpbmlvbiB0aHJvdWdoIHRoZSBXZWJzaXRlLCBZb3UgYWNrbm93bGVkZ2UgYW5kIGFncmVlIHRoYXQ6XG4gICAgICAgICAgICAgICA8b2wgY2xhc3NOYW1lPVwic3ViLWxpc3RcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGUgYWR2aWNlL2luZm9ybWF0aW9uL29waW5pb24gb24gZGlhZ25vc2lzIFlvdSBtYXkgcmVjZWl2ZSBjb3VsZCBiZSBsaW1pdGVkIGFuZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3Zpc2lvbmFsO1xuICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGUgbWVkaWNhbCBvcGluaW9uIGlzIG5vdCBpbnRlbmRlZCB0byByZXBsYWNlIGEgZmFjZS10by1mYWNlIHZpc2l0IHdpdGggYSBwaHlzaWNpYW4gYW5kXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXQgZG9lcyByZXBsYWNlIGFuIGFjdHVhbCBkb2N0b3ItcGF0aWVudCByZWxhdGlvbnNoaXA7XG4gICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluIGNhc2Ugb2YgYSBzZWNvbmQgb3BpbmlvbiB3aGVyZSB0aGVyZSBpcyBhIGRpZmZlcmVuY2Ugb2Ygb3BpbmlvbiBhbW9uZyBPdXIgTWVkaWNhbFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEV4cGVydHMgYW5kIFlvdXIgcGVyc29uYWwgcGh5c2ljaWFuLCBZb3Ugd291bGQgYmVhciB0aGUgcmVzcG9uc2liaWxpdHkgdG8gZGVjaWRlIG9uIG9ubGluZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9yIG9mZmxpbmUgY29uc3VsdGF0aW9uLCBvciBwcm9jZWR1cmUsIGFuZC9vciB0cmVhdG1lbnQ7XG4gICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoZSBNZWRpY2FsIEV4cGVydCBpcyByZWxpYW50IG9uIGluZm9ybWF0aW9uIHByb3ZpZGVkIGJ5IFlvdSBhbmQgaGVuY2UgYW55IGluZm9ybWF0aW9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVtb25zdHJhdGVkIHRvIGhhdmUgYmVlbiBmYWxzaWZpZWQsIG1pc2xlYWRpbmcgb3IgaW5jb21wbGV0ZSB3aWxsIGltbWVkaWF0ZWx5IHJlbmRlciB0aGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcGluaW9uIGFuZCBhbGwgZGV0YWlscyB0aGVyZWluIG51bGwgYW5kIHZvaWQ7XG4gICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEFpbiBzb21lIGNhc2VzLCB0aGUgTWVkaWNhbCBFeHBlcnQgbWF5IGRldGVybWluZSB0aGF0IHRoZSB0cmFuc21pdHRlZCBpbmZvcm1hdGlvbiBpcyBvZlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluYWRlcXVhdGUgcXVhbGl0eSBhbmQgbWF5IGFzayBmb3IgbW9yZSBpbmZvcm1hdGlvbiwgd2l0aG91dCB3aGljaCBoZS9zaGUgbWF5IHJlZnVzZSB0b1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFuc3dlciB0aGUgcXVlcnk7XG4gICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluIHJhcmUgY2FzZXMsIHRoZSBNZWRpY2FsIEV4cGVydHMgbWF5IGZlZWwgdGhhdCB0aGUgcXVlcnkgbWF5IG5vdCBiZSBhbnN3ZXJhYmxlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2l0aG91dCBwaHlzaWNhbGx5IGV4YW1pbmluZyB0aGUgcGF0aWVudC8gVXNlcnMgYW5kIHRoZSBDb25zdWx0YXRpb24gbWF5IGJlIHJlZnVzZWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3J0aHdpdGg7XG4gICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluIHZlcnkgcmFyZSBpbnN0YW5jZXMsIHNlY3VyaXR5IHByb3RvY29scyBjb3VsZCBmYWlsLCBjYXVzaW5nIGEgYnJlYWNoIG9mIHByaXZhY3kgb2ZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwZXJzb25hbCBtZWRpY2FsIGluZm9ybWF0aW9uOyBhbmRcbiAgICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVsYXlzIGluIG1lZGljYWwgZXZhbHVhdGlvbiBhbmQgYW5zd2VycyBjb3VsZCBvY2N1ciBkdWUgdG8gZGVmaWNpZW5jaWVzIG9yIGZhaWx1cmVzIG9mXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhlIHNlcnZpY2UgYXMgcGVyIHRob3NlIG1lbnRpb25lZCBpbiB0aGVzZSBUZXJtcyBvZiBVc2UuXG4gICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L29sPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L29sPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwicHJpdmFjeS1kZXNjLXN1YmhlYWRpbmdcIj43LiZuYnNwOyZuYnNwOyZuYnNwOyZuYnNwO0JPT0sgQVBQT0lOVE1FTlQgQU5EIENBTEwgRkFDSUxJVFk8L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICA8b2wgY2xhc3NOYW1lPVwicHJpdmFjeS1saXN0LWdyb3VwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpIGNsYXNzTmFtZT1cInByaXZhY3ktbGlzdC1pdGVtXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvY3ByaW1lIGVuYWJsZXMgVXNlcnMgdG8gY29ubmVjdCB3aXRoIE1lZGljYWwgRXhwZXJ0cyBhbmQgVGhpcmQgUGFydHkgTGFicyB0aHJvdWdoIHR3b1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXRob2RzOiBhKSBCb29rIGZhY2lsaXR5IHRoYXQgYWxsb3dzIFVzZXJzIGJvb2sgYW4gYXBwb2ludG1lbnQgdGhyb3VnaCB0aGUgV2Vic2l0ZTsgYikgb25saW5lXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9yIHRlbGUtY29uc3VsdGF0aW9uIHNlcnZpY2VzIHdoaWNoIGNvbm5lY3QgVXNlcnMgZGlyZWN0bHkgdG8gdGhlIE1lZGljYWwgRXhwZXJ0cyBlbmdhZ2VkIGJ5XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvY3ByaW1lLlxuICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGkgY2xhc3NOYW1lPVwicHJpdmFjeS1saXN0LWl0ZW1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZG9jcHJpbWUgd2lsbCBlbnN1cmUgVXNlcnMgYXJlIHByb3ZpZGVkIGNvbmZpcm1lZCBhcHBvaW50bWVudCBvbiB0aGUgQm9vayBmYWNpbGl0eS4gSG93ZXZlcixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZG9jcHJpbWUgaGFzIG5vIGxpYWJpbGl0eSBpZiBzdWNoIGFuIGFwcG9pbnRtZW50IGlzIGxhdGVyIGNhbmNlbGxlZCBieSB0aGUgTWVkaWNhbCBFeHBlcnQgb3JcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgVGhpcmQgUGFydHkgTGFicywgb3IgdGhleSBhcmUgbm90IGF2YWlsYWJsZSBmb3IgYXBwb2ludG1lbnQuXG4gICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaSBjbGFzc05hbWU9XCJwcml2YWN5LWxpc3QtaXRlbVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBJZiBhIFVzZXIgaGFzIHV0aWxpemVkIHRoZSBvbmxpbmUgY29uc3VsdGF0aW9uL3RlbGVwaG9uaWMgc2VydmljZXMsIGRvY3ByaW1lIHJlc2VydmVzIHRoZSByaWdodCB0b1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaGFyZSB0aGUgaW5mb3JtYXRpb24gcHJvdmlkZWQgYnkgdGhlIFVzZXIgd2l0aCB0aGUgTWVkaWNhbCBFeHBlcnRzIGFuZCBUaGlyZCBQYXJ0eSBMYWJzIGFuZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdG9yZSBzdWNoIGluZm9ybWF0aW9uIGFuZC9vciBjb252ZXJzYXRpb24gb2YgdGhlIFVzZXIgd2l0aCB0aGUgTWVkaWNhbCBFeHBlcnRzIGFuZCBUaGlyZCBQYXJ0eVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBMYWJzLCBpbiBhY2NvcmRhbmNlIHdpdGggb3VyIFByaXZhY3kgUG9saWN5IC5cbiAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpIGNsYXNzTmFtZT1cInByaXZhY3ktbGlzdC1pdGVtXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFRoZSByZXN1bHRzIG9mIGFueSBzZWFyY2ggVXNlcnMgcGVyZm9ybSBvbiB0aGUgV2Vic2l0ZSBmb3IgTWVkaWNhbCBFeHBlcnRzIGFuZCBUaGlyZCBQYXJ0eSBMYWJzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNob3VsZCBub3QgYmUgY29uc3RydWVkIGFzIGFuIGVuZG9yc2VtZW50IGJ5IGRvY3ByaW1lIG9mIGFueSBzdWNoIHBhcnRpY3VsYXIgTWVkaWNhbCBFeHBlcnRzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFuZCBUaGlyZCBQYXJ0eSBMYWJzLiBJZiB0aGUgVXNlciBkZWNpZGVzIHRvIGVuZ2FnZSB3aXRoIGEgTWVkaWNhbCBFeHBlcnRzIGFuZCBUaGlyZCBQYXJ0eSBMYWJzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvIHNlZWsgbWVkaWNhbCBzZXJ2aWNlcywgdGhlIFVzZXIgc2hhbGwgYmUgZG9pbmcgc28gYXQgaGlzL2hlciBvd24gcmlzay5cbiAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpIGNsYXNzTmFtZT1cInByaXZhY3ktbGlzdC1pdGVtXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFdpdGhvdXQgcHJlanVkaWNlIHRvIHRoZSBnZW5lcmFsaXR5IG9mIHRoZSBhYm92ZSwgZG9jcHJpbWUgaXMgYWN0aW5nIGFzIGEgbWVyZSBmYWNpbGl0YXRvciBhbmQgaXNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbm90IGludm9sdmVkIGluIHByb3ZpZGluZyBhbnkgaGVhbHRoY2FyZSBvciBtZWRpY2FsIGFkdmljZSBvciBkaWFnbm9zaXMgYW5kIGhlbmNlIGlzIG5vdFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zaWJsZSBmb3IgYW55IGludGVyYWN0aW9ucyBiZXR3ZWVuIFVzZXIgYW5kIE1lZGljYWwgRXhwZXJ0cyBhbmQgVGhpcmQgUGFydHkgTGFicy4gVXNlclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1bmRlcnN0YW5kcyBhbmQgYWdyZWVzIHRoYXQgZG9jcHJpbWUgd2lsbCBub3QgYmUgbGlhYmxlIGZvcjpcbiAgICAgICAgICAgICAgIDxvbCBjbGFzc05hbWU9XCJzdWItbGlzdFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFVzZXIgaW50ZXJhY3Rpb25zIGFuZCBhc3NvY2lhdGVkIGlzc3VlcyBVc2VyIGhhcyB3aXRoIHRoZSBNZWRpY2FsIEV4cGVydHMgYW5kIFRoaXJkIFBhcnR5XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTGFicztcbiAgICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhlIGFiaWxpdHkgb3IgaW50ZW50IG9mIHRoZSBNZWRpY2FsIEV4cGVydHMgYW5kIFRoaXJkIFBhcnR5IExhYnMgb3IgdGhlIGxhY2sgb2YgaXQsIGluXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnVsZmlsbGluZyB0aGVpciBvYmxpZ2F0aW9ucyB0b3dhcmRzIFVzZXJzO1xuICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbnkgd3JvbmcgbWVkaWNhdGlvbiBvciBxdWFsaXR5IG9mIHRyZWF0bWVudCBiZWluZyBnaXZlbiBieSB0aGUgTWVkaWNhbCBFeHBlcnRzIGFuZCBUaGlyZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFBhcnR5IExhYnMsIG9yIGFueSBtZWRpY2FsIG5lZ2xpZ2VuY2Ugb24gcGFydCBvZiB0aGUgTWVkaWNhbCBFeHBlcnRzIGFuZCBUaGlyZCBQYXJ0eSBMYWJzO1xuICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmFwcHJvcHJpYXRlIHRyZWF0bWVudCwgb3Igc2ltaWxhciBkaWZmaWN1bHRpZXMgb3IgYW55IHR5cGUgb2YgaW5jb252ZW5pZW5jZSBzdWZmZXJlZCBieSB0aGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBVc2VyIGR1ZSB0byBhIGZhaWx1cmUgb24gdGhlIHBhcnQgb2YgdGhlIE1lZGljYWwgRXhwZXJ0cyBhbmQgVGhpcmQgUGFydHkgTGFicyB0byBwcm92aWRlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWdyZWVkIFNlcnZpY2VzO1xuICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbnkgbWlzY29uZHVjdCBvciBpbmFwcHJvcHJpYXRlIGJlaGF2aW91ciBieSB0aGUgTWVkaWNhbCBFeHBlcnRzIGFuZCBUaGlyZCBQYXJ0eSBMYWJzIG9yXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhlaXIgcmVzcGVjdGl2ZSBzdGFmZjtcbiAgICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FuY2VsbGF0aW9uIG9yIG5vIHNob3cgYnkgdGhlIE1lZGljYWwgRXhwZXJ0cyBhbmQgVGhpcmQgUGFydHkgTGFicyBvciByZXNjaGVkdWxpbmcgb2ZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBib29rZWQgYXBwb2ludG1lbnQuXG4gICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L29sPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpIGNsYXNzTmFtZT1cInByaXZhY3ktbGlzdC1pdGVtXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFVzZXJzIGFyZSBhbGxvd2VkIHRvIHByb3ZpZGUgZmVlZGJhY2sgYWJvdXQgdGhlaXIgZXhwZXJpZW5jZXMgd2l0aCB0aGUgUHJhY3RpdGlvbmVyLCBob3dldmVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGUgVXNlciBzaGFsbCBlbnN1cmUgdGhhdCwgdGhlIHNhbWUgaXMgcHJvdmlkZWQgaW4gYWNjb3JkYW5jZSB3aXRoIGFwcGxpY2FibGUgbGF3LiBVc2VyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhvd2V2ZXIgdW5kZXJzdGFuZHMgdGhhdCwgZG9jcHJpbWUgc2hhbGwgbm90IGJlIG9ibGlnZWQgdG8gYWN0IGluIHN1Y2ggbWFubmVyIGFzIG1heSBiZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXF1aXJlZCB0byBnaXZlIGVmZmVjdCB0byB0aGUgY29udGVudCBvZiBVc2VycyBmZWVkYmFjaywgc3VjaCBhcyBzdWdnZXN0aW9ucyBmb3IgZGVsaXN0aW5nIG9mIGFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFydGljdWxhciBNZWRpY2FsIEV4cGVydHMgYW5kIFRoaXJkIFBhcnR5IExhYnMgZnJvbSB0aGUgV2Vic2l0ZS5cbiAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L29sPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwicHJpdmFjeS1kZXNjLXN1YmhlYWRpbmdcIj44LiZuYnNwOyZuYnNwOyZuYnNwOyZuYnNwO0NPTU1VTklDQVRJT05TIFRPIFlPVTwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInByaXZhY3ktZGVzY1wiPllvdSBhZ3JlZSBhbmQgYXV0aG9yaXplIGRvY3ByaW1lIHRvIHNoYXJlIHlvdXIgaW5mb3JtYXRpb24gd2l0aCBpdHMgZ3JvdXAgY29tcGFuaWVzIGFuZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgb3RoZXIgdGhpcmQgcGFydGllcywgaW4gc28gZmFyIGFzIHJlcXVpcmVkIGZvciBqb2ludCBtYXJrZXRpbmcgcHVycG9zZXMvb2ZmZXJpbmcgdmFyaW91cyBzZXJ2aWNlc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgb3IgdmFyaW91cyB2YWx1ZSBhZGRlZCBzZXJ2aWNlcywgaW4gYXNzb2NpYXRpb24gd2l0aCB0aGUgU2VydmljZXMgb2YgdGhlIFdlYnNpdGUgb3Igb3RoZXJ3aXNlLlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgWW91IGFncmVlIHRvIHJlY2VpdmUgY29tbXVuaWNhdGlvbnMgdGhyb3VnaCBlbWFpbHMsIHRlbGVwaG9uZSBhbmQvb3Igc21zLCBmcm9tIGRvY3ByaW1lIG9yXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBpdHMgZ3JvdXAgY29tcGFuaWVzIG9yIGl0cyB0aGlyZCBwYXJ0eSB2ZW5kb3JzL2J1c2luZXNzIHBhcnRuZXJzIG9yIFRoaXJkIFBhcnR5IFNlcnZpY2UgUHJvdmlkZXJzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICByZWdhcmRpbmcgdGhlIFNlcnZpY2VzL3NlcnZpY2VzIHVwZGF0ZXMsIHRyYW5zYWN0aW9uYWwgYW5kIHByb21vdGlvbmFsIGVtYWlscyBhbmQvb3IgYW55XG4gICAgICAgICAgICAgICAgICAgICAgICAgICBhbm5vdW5jZW1lbnRzLiBJbiB0aGlzIGNvbnRleHQsIHlvdSBhZ3JlZSBhbmQgY29uc2VudCB0byByZWNlaXZlIGFsbCBjb21tdW5pY2F0aW9ucyBhdCB0aGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vYmlsZSBudW1iZXIgcHJvdmlkZWQsIGV2ZW4gaWYgdGhpcyBtb2JpbGUgbnVtYmVyIGlzIHJlZ2lzdGVyZWQgdW5kZXIgRE5EL05DUFIgbGlzdCB1bmRlclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgVGVsZWNvbSBSZWd1bGF0b3J5IEF1dGhvcml0eSBvZiBJbmRpYSAoVFJBSSkgbGF3cywgcnVsZXMgYW5kIHJlZ3VsYXRpb25zLiBBbmQgZm9yIHRoYXQgcHVycG9zZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHlvdSBmdXJ0aGVyIGF1dGhvcml6ZSBDb21wYW55IHRvIHNoYXJlL2Rpc2Nsb3NlIHRoZSBpbmZvcm1hdGlvbiB0byBhbnkgdGhpcmQgcGFydHkgc2VydmljZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvdmlkZXIgb3IgYW55IGFmZmlsaWF0ZXMsIGdyb3VwIGNvbXBhbmllcywgdGhlaXIgYXV0aG9yaXplZCBhZ2VudHMgb3IgdGhpcmQgcGFydHkgc2VydmljZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvdmlkZXJzLiBZb3UgYWdyZWUgdGhhdCBpbiBhY2NvcmRhbmNlIHdpdGggdGhlIGFwcGxpY2FibGUgVFJBSSByZWd1bGF0aW9ucyBzcGVjaWZpY2FsbHkgVGhlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBUZWxlY29tIENvbW1lcmNpYWwgQ29tbXVuaWNhdGlvbnMgQ3VzdG9tZXIgUmVndWxhdGlvbnMsIDIwMTQgOlxuICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgPG9sIGNsYXNzTmFtZT1cInByaXZhY3ktbGlzdC1ncm91cFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaSBjbGFzc05hbWU9XCJwcml2YWN5LWxpc3QtaXRlbVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBFYWNoIHRpbWUgWW91IGRvIHZpc2l0L3RyYW5zYWN0IG9yIGxvZ2luIGluIHlvdXIgYWNjb3VudCBvbiB0aGUgV2Vic2l0ZSwgaXQgc2hhbGwgYmVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVnYXJkZWQgYXMgYSB2ZXJpZmlhYmxlIHJlcXVlc3QgZnJvbSB5b3UgcGVydGFpbmluZyB0byByZWNlaXB0IG9mIG91ciBTZXJ2aWNlcyBhbmRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aXZpdGllcztcbiAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpIGNsYXNzTmFtZT1cInByaXZhY3ktbGlzdC1pdGVtXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFlvdSBzaG91bGQgdmlzaXQgeW91ciBhY2NvdW50IGF0IGxlYXN0IG9uY2UgaW4gc2l4IG1vbnRocyBvdGhlcndpc2UgZG9jcHJpbWUgcmVzZXJ2cyB0aGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmlnaHQgdG8gZGVhY3RpdmF0ZSB5b3VyIGFjY291bnQgZm9yIGluYWN0aW9uLCBhbmQgaW4gdGhpcyByZWdhcmQgZG9jcHJpbWUgd2lsbCBzZW5kIHlvdSBTTVNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYW5kIGVtYWlsIGNvbW11bmljYXRpb25zIHByaW9yIHRvIHRoZSBleHBpcnkgb2Ygc2l4IG1vbnRocyBmcm9tIHRoZSBkYXRlIG9mIGxhc3RcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmlzaXQvdHJhbnNhY3Rpb24vbG9naW4gaW50byB5b3VyIGFjY291bnQgb24gdGhlIFdlYnNpdGU7XG4gICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaSBjbGFzc05hbWU9XCJwcml2YWN5LWxpc3QtaXRlbVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBFYWNoIHRpbWUgeW91IHZpc2l0L2xvZ2luL3RyYW5zYWN0IG9uIHRoZSBXZWJzaXRlIGl0IHdpbGwgYmUgZGVlbWVkIHRvIGJlIGFzIGEgZnJlc2hcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVxdWVzdCBmcm9tIHlvdSBmb3IgY29udGludWluZyB0byByZWNlaXZlIGNvbW11bmljYXRpb24gZnJvbSBkb2NwcmltZVxuICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGkgY2xhc3NOYW1lPVwicHJpdmFjeS1saXN0LWl0ZW1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSW4gY2FzZSB5b3UgZG8gbm90IHdpc2ggdG8gcmVjZWl2ZSBhbnkgY29tbXVuaWNhdGlvbiBmcm9tIHVzIG9yIHByb3ZpZGUgeW91ciBmZWVkYmFja1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhYm91dCB0aGUgc2VydmljZXMsIHlvdSBjYW4gbWFpbCB1cyBhdCBjYXJlQGRvY3ByaW1lLmNvbVxuICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvb2w+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJwcml2YWN5LWRlc2NcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb2NwcmltZSB3aWxsIHJldGFpbiBhbmQgdXNlIHlvdXIgaW5mb3JtYXRpb24gYXMgbmVjZXNzYXJ5IHRvIGNvbXBseSB3aXRoIG91ciBsZWdhbFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9ibGlnYXRpb25zLCByZXNvbHZlIGRpc3B1dGVzIGFuZCBlbmZvcmNlIG91ciBhZ3JlZW1lbnRzIGVudGVyZWQgaW50byBmb3IgcHJvdmlkaW5nIFNlcnZpY2VzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYW5kIGFuY2lsbGFyeSBzZXJ2aWNlcy5cbiAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInByaXZhY3ktZGVzYy1zdWJoZWFkaW5nXCIgaWQ9XCJyZXNjaGVkdWxpbmdfOVwiPjkuJm5ic3A7Jm5ic3A7Jm5ic3A7Jm5ic3A7UkVTQ0hFRFVMSU5HLCBSRUZVTkQgJmFtcDsgQ0FOQ0VMTEFUSU9OIFBPTElDWTwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxvbCBjbGFzc05hbWU9XCJwcml2YWN5LWxpc3QtZ3JvdXBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGkgY2xhc3NOYW1lPVwicHJpdmFjeS1saXN0LWl0ZW1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQ2FuY2VsbGF0aW9uczpcbiAgICAgICAgICAgICAgIDxvbCBjbGFzc05hbWU9XCJzdWItbGlzdFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEZvciBhbnkgb25saW5lIHBhaWQgYXBwb2ludG1lbnRzLCB5b3UgY2FuIGNhbmNlbCB5b3VyIHNjaGVkdWxlZCBvciByZS1ib29rZWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcHBvaW50bWVudCBhbmQgaW5pdGlhdGUgaW1tZWRpYXRlIHJlZnVuZCBhdCBhbnkgdGltZS4gSW1tZWRpYXRlIHJlZnVuZCBzaGFsbCBiZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1YmplY3QgdG8gdGVybXMgYW5kIGNvbmRpdGlvbnMgYXMgZGVzY3JpYmVkIHVuZGVyIHRoaXMgc2VjdGlvbiBtZW50aW9uZWQgYmVsb3cuXG4gICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEluIHRoZSBldmVudCB0aGUgc2VydmljZXMgYXJlIG5vdCBhdmFpbGVkIGF0IHRoZSBhcHBvaW50ZWQgZGF0ZSBhbmQgdGltZSBhbmQgb3VyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3lzdGVtcyBkbyBub3QgdmFsaWRhdGUgdGhlIFVSTiBnZW5lcmF0ZWQgb24geW91ciByZWdpc3RlcmVkIG1vYmlsZSBudW1iZXIsIHdlIHdpbGxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdXRvbWF0aWNhbGx5IGNhbmNlbCB5b3VyIGFwcG9pbnRtZW50IGF0IDEyOjAwIG1pZG5pZ2h0IG9mIG5leHQgZGF0ZSBvZiB5b3VyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXBwb2ludG1lbnQgZGF0ZS5cbiAgICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYU9jY2FzaW9uYWxseSwgYXBwb2ludG1lbnRzIG1heSBiZSBjYW5jZWxsZWQgb3IgcG9zdHBvbmVkIGJ5IHRoZSBUaGlyZCBQYXJ0eSBTZXJ2aWNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUHJvdmlkZXIuIFNob3VsZCB0aGlzIG9jY3VyLCB3ZSB3aWxsIGF0dGVtcHQgdG8gY29udGFjdCBvciBpbmZvcm0geW91IGFuZCB5b3UgbWF5IHJlLVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjaGVkdWxlIHlvdXIgYXBwb2ludG1lbnQgYXMgcGVyIHlvdXIgY29udmVuaWVuY2Ugb3IgdmlzaXQgd3d3LmRvY3ByaW1lLmNvbSBmb3JcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmcmVzaC9yZS1ib29raW5nIG9uIHRoZSBXZWJzaXRlLlxuICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBDYW5jZWxsYXRpb24gdGhyb3VnaCBtYWlsIG9yIGNhbGwgY2VudHJlIGlzIGFsbG93ZWQgZm9yIGFsbCB0aGUgYm9va2luZ3MgdW50aWwgdGhlIHRpbWUgb2ZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcHBvaW50bWVudCBvciAxMjowMCBtaWRuaWdodCBvZiBuZXh0IGRhdGUgb2YgeW91ciBhcHBvaW50bWVudCBkYXRlLiBJbiBzdWNoIGNhc2VzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdlIHdpbGwgaW5pdGlhdGUgaW1tZWRpYXRlIHJlZnVuZCBvZiB5b3VyIG1vbmV5IGFzIHBlciB0aGUgcHJvY2VzcyBkZWZpbmVkIGJlbG93LlxuICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9vbD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaSBjbGFzc05hbWU9XCJwcml2YWN5LWxpc3QtaXRlbVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZXNjaGVkdWxpbmc6XG4gICAgICAgICAgICAgICA8b2wgY2xhc3NOYW1lPVwic3ViLWxpc3RcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZS1zY2hlZHVsaW5nIG9mIGFsbCBhcHBvaW50bWVudHMgY2FuIGJlIGRvbmUgb25seSB1bnRpbCB0aGUgYXV0by1jYW5jZWxsYXRpb24gaXMgZG9uZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZyb20gb3VyIHN5c3RlbXMuIE9uY2UgdGhlIGF1dG8gY2FuY2VsbGF0aW9uIGlzIGdlbmVyYXRlZCwgY2FuY2VsbGF0aW9uLCBhbmQgcmVmdW5kXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvY2VzcyBhcyBtZW50aW9uZWQgdW5kZXIgdGhpcyBzZWN0aW9uIHNob3VsZCBiZSBmb2xsb3dlZCBhbmQgcmUtcHJvY2VzcyBmb3IgYVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZyZXNoL3JlLWJvb2tpbmcsIGlmIG5lZWQgYmUuXG4gICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFlvdSBjYW4gcmUtc2NoZWR1bGUgeW91ciBhcHBvaW50bWVudCBpLmUuIGJvb2sgeW91ciBhcHBvaW50bWVudCBmb3IgYSBkaWZmZXJlbnQgZGF0ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFuZCB0aW1lOyB3aXRoIHRoZSBzYW1lIFRoaXJkIHBhcnR5IEhlYWx0aCBTZXJ2aWNlIFByb3ZpZGVyIGZvciB0aGUgc2FtZSB0eXBlIG9mXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhbHRoY2FyZSBzZXJ2aWNlLlxuICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBJbiBjYXNlIG9mIHJlLXNjaGVkdWxpbmcsIGlmIHRoZXJlIGlzIGFueSBkaWZmZXJlbmNlIGluIHRoZSBjaGFyZ2VzIGZvciByZS1zY2hlZHVsZWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcHBvaW50bWVudCwgd2Ugd2lsbCBlaXRoZXIgY29sbGVjdCB0aGUgZGlmZmVyZW50aWFsIGFtb3VudCBvciByZWZ1bmQgdGhlIHNhbWUsIGFzIHRoZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgbWF5IGJlLlxuICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9vbD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaSBjbGFzc05hbWU9XCJwcml2YWN5LWxpc3QtaXRlbVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZS1ib29raW5nOlxuICAgICAgICAgICAgICAgPG9sIGNsYXNzTmFtZT1cInN1Yi1saXN0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgWW91IGNhbiByZS1ib29rIHlvdXIgYXBwb2ludG1lbnQgYnkgY2hhbmdpbmcgdGhlIHBhcnRpY3VsYXJzIG9mIHlvdXIgYXBwb2ludG1lbnQgaS5lLlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3ZpZGVyLCB0eXBlIG9mIHNlcnZpY2UsIGRhdGUgYW5kIHRpbWUgZXRjLlxuICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZS1ib29raW5nIG9mIGFsbCBhcHBvaW50bWVudHMgY2FuIGJlIGRvbmUgYXQgdGhlIGNob2ljZSBvZiB0aGUgQ3VzdG9tZXIgYW5kIGluIHN1Y2hcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlcyBjdXN0b21lciBoYXMgdG8gY2xpY2sgb24g4oCcQ2FuY2VsbGF0aW9uIGFuZCByZWJvb2vigJ0gb3B0aW9uIGRpc3BsYXllZCBpbiBteVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjY291bnQgc2VjdGlvbiBvZiB0aGUgY3VzdG9tZXIuXG4gICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEZvciBhbGwgYXBwb2ludG1lbnRzIHdoaWNoIGFyZSByZS1ib29rZWQgY2FzZXMsIHRoZSBhbW91bnQgcGFpZCBieSB0aGUgY3VzdG9tZXIgZm9yXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhlIHByZXZpb3VzIGJvb2tpbmcgY2FuIGJlIHV0aWxpemVkIHdpdGhpbiAyNCh0d2VudHkgZm91cikgaG91cnMgZnJvbSB0aGUgZGF0ZSBvbiB3aGljaCBjYW5jZWxsYXRpb24gaXMgaW5pdGlhdGVkIGJ5IHRoZSBjdXN0b21lciBhbmQgYmVmb3JlIGluc3RydWN0aW9uIHRvIHJlZnVuZCBpc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluaXRpYXRlZCBmcm9tIG91ciBlbmQgJmFtcDsgcHJvY2Vzc2VkIGJ5IHRoZSBwYXltZW50IGdhdGV3YXkgaW50ZWdyYXRlZCBvbiBvdXIgV2Vic2l0ZS5cbiAgICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgWW91ciBwcmV2aW91cyBib29raW5nIGFtb3VudCB3aWxsIGJlIHJlZmxlY3RlZCBieSB3YXkgb2YgY3JlZGl0cyBpbiB5b3VyIGFjY291bnQuIDFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjcmVkaXQgPSAxIHJ1cGVlLlxuICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBJbiBjYXNlIG1vbmV5IGZvciB5b3VyIHJlLWJvb2tlZCBhcHBvaW50bWVudCBpcyBhZGp1c3RlZCBhZ2FpbnN0IHRoZSBtb25leSBwYWlkIGZvclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByZXZpb3VzIGJvb2tpbmcsIGZvbGxvd2luZyBtYXkgYmUgYXBwbGljYWJsZSwgYXMgdGhlIGNhc2UgbWF5IGJlOlxuICAgICAgICAgICAgICAgICAgICAgPHVsIGNsYXNzTmFtZT1cIm1ydC0xMFwiIHN0eWxlPXt7IGxpc3RTdHlsZTogJ2Rpc2MnLCBwYWRkaW5nTGVmdDogNDAsIHRleHRBbGlnbjogJ2xlZnQnIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGkgY2xhc3NOYW1lPVwibXJiLTEwXCI+SWYgdGhlIGNoYXJnZXMgZm9yIHJlLWJvb2tpbmcgYXBwb2ludG1lbnQgYXJlIG1vcmUgdGhhbiB0aGUgYW1vdW50IHBhaWQgZm9yXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByZXZpb3VzIGJvb2tpbmcsIHlvdSB3aWxsIGJlIHJlcXVpcmVkIHRvIHBheSB0aGUgc2hvcnRmYWxsIGFtb3VudCBmb3JcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tcGxldGluZyB0aGUgcmUtYm9va2VkIGFwcG9pbnRtZW50LlxuICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpIGNsYXNzTmFtZT1cIm1yYi0xMFwiPklmIHRoZSBjaGFyZ2VzIGZvciByZS1ib29raW5nIGFwcG9pbnRtZW50IGFyZSBsZXNzIHRoYW4gdGhlIGFtb3VudCBwYWlkIGZvclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcmV2aW91cyBib29raW5nLCB3ZSB3aWxsIGluaXRpYXRlIGltbWVkaWF0ZSByZWZ1bmQgZm9yIHRoZSBkaWZmZXJlbnRpYWxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYW1vdW50LlxuICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9vbD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaSBjbGFzc05hbWU9XCJwcml2YWN5LWxpc3QtaXRlbVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWZ1bmRzOlxuICAgICAgICAgICAgICAgPG9sIGNsYXNzTmFtZT1cInN1Yi1saXN0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgVXBvbiByZWNlaXB0IGEgdmFsaWQgY2FuY2VsbGF0aW9uLCB3ZSB3aWxsIGluaXRpYXRlIHJlZnVuZCBvZiB5b3VyIG1vbmV5IGluIHRoZSBzYW1lXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFubmVyIGFzIHRoZSBtb25leSB3YXMgcmVjZWl2ZWQuXG4gICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEluIGNhc2UgeW91IGZhaWwgdG8gdXRpbGl6ZSBwcmV2aW91cyBib29raW5nIG1vbmV5IGZvciBhbnkgcmUtYm9va2luZyBjYXNlcywgd2Ugd2lsbFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluaXRpYXRlIGltbWVkaWF0ZSByZWZ1bmQgd2l0aGluIGV4cGlyeSBvZiAyNCh0d2VudHkgZm91cikgaG91cnMgZnJvbSB0aGUgZGF0ZSBvZlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbmNlbGxhdGlvbi5cbiAgICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgVHlwaWNhbGx5LCBhbGwgcmVmdW5kcyBhcmUgcHJvY2Vzc2VkIHdpdGggMTQoZm91cnRlZW4pIHdvcmtpbmcgZGF5cyBmcm9tIHRoZSBkYXRlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW1tZWRpYXRlIHJlZnVuZCBpcyBpbml0aWF0ZWQgYXQgb3VyIGVuZC5cbiAgICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUGVhc2Ugbm90ZSB0aGF0IHdlIHNoYWxsIG5vdCBiZSByZXNwb25zaWJsZSBmb3IgYW55IGRlbGF5cyBpbiBjcmVkaXQgdG8gdGhlIENhcmRob2xkZXInc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNyZWRpdCBjYXJkIGFjY291bnQvIGFjY291bnRob2xkZXLigJlzIGJhbmsgYWNjb3VudCBkdWUgdG8gYW55IHJlYXNvbnMgY2l0ZWQgYnkgdGhlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUGF5bWVudCBHYXRld2F5IG9yIENhcmRob2xkZXIncyBpc3N1aW5nIGJhbmsuXG4gICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFlvdSB3aWxsIGJlIHByb3ZpZGVkIHdpdGggcmVmdW5kIHJlZmVyZW5jZSBudW1iZXIgZm9yIGZ1cnRoZXIgY29tbXVuaWNhdGlvbiB3aXRoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeW91ciBiYW5rLlxuICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBObyByZWZ1bmRzIC8gY2FuY2VsbGF0aW9uIHJlcXVlc3RzIHNoYWxsIGJlIGVudGVydGFpbmVkIGluIGNhc2Ugb2YgcGF5bWVudCBhZ2FpbnN0IGJpbGxzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLyBTZXJ2aWNlcyByZWNlaXZlZC5cbiAgICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgVW5kZXIgbm8gY2lyY3Vtc3RhbmNlcywgY2FzaCB3aWxsIGJlIHJlZnVuZGVkIGFnYWluc3QgYW55IGNhbmNlbGxhdGlvbi5cbiAgICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvb2w+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvb2w+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJwcml2YWN5LWRlc2Mtc3ViaGVhZGluZ1wiPjEwLiZuYnNwOyZuYnNwOyZuYnNwO1BBWU1FTlQsIEZFRVMgQU5EIFRBWEVTPC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgPG9sIGNsYXNzTmFtZT1cInByaXZhY3ktbGlzdC1ncm91cFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaSBjbGFzc05hbWU9XCJwcml2YWN5LWxpc3QtaXRlbVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWdpc3RyYXRpb24gb24gdGhlIFdlYnNpdGUgYW5kIHRoZSBhY2Nlc3MgdG8gdGhlIGluZm9ybWF0aW9uIHByb3ZpZGVkIG9uIHRoZSBXZWJzaXRlIGlzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZyZWUuIGRvY3ByaW1lIGRvZXMgbm90IGNoYXJnZSBhbnkgZmVlIGZvciBhY2Nlc3NpbmcsIGFuZCBicm93c2luZyB0aHJvdWdoIHRoZSBXZWJzaXRlLlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBIb3dldmVyLCBkb2NwcmltZSBtYXkgY29sbGVjdCBwYXltZW50cyAod2hpY2ggc2hhbGwgaW5jbHVkZSBhcHBsaWNhYmxlIHRheGVzIGFuZCBzZXJ2aWNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZlZS9jb21taXNzaW9uIG9mIGRvY3ByaW1lKSBmcm9tIFlvdSBvbiBiZWhhbGYgb2YgVGhpcmQgUGFydHkgU2VydmljZSBQcm92aWRlcnMgdGhyb3VnaFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBSQkkgYXV0aG9yaXplZCBwYXltZW50IGNvbGxlY3RvcnMgb3IgZ2F0ZXdheXMuIFlvdSBhZ3JlZSBhbmQgYWNrbm93bGVkZ2UgdGhhdCBZb3Ugc2hhbGxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbm90IGhvbGQgZG9jcHJpbWUgcmVzcG9uc2libGUgZm9yIGFueSBsb3NzIG9yIGRhbWFnZSBjYXVzZWQgdG8gWW91IGR1cmluZyB0aGUgcHJvY2VzcyBvZlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xsZWN0aW9uIG9mIHBheW1lbnRzIGZyb20gWW91LCBvciBkdWUgdG8gYW55IGFjdHMgb3Igb21pc3Npb24gb24gdGhlIHBhcnQgb2YgdGhpcmQgcGFydGllc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2aXouIHBheW1lbnQgY29sbGVjdG9ycyBvciBmb3IgYW55IGFjdGlvbnMvIG9taXNzaW9ucyB3aGljaCBhcmUgYmV5b25kIHRoZSBjb250cm9sIG9mXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvY3ByaW1lLlxuICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGkgY2xhc3NOYW1lPVwicHJpdmFjeS1saXN0LWl0ZW1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQWxsIGZlZXMgZGlzcGxheWVkIG9uIHRoZSBXZWJzaXRlIGFyZSBpbmNsdXNpdmUgb2YgYXBwbGljYWJsZSB0YXhlcy5cbiAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpIGNsYXNzTmFtZT1cInByaXZhY3ktbGlzdC1pdGVtXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvY3ByaW1lIHJlc2VydmVzIHRoZSByaWdodCB0byBtb2RpZnkgdGhlIGZlZSBzdHJ1Y3R1cmUgYnkgcHJvdmlkaW5nIG9uIHRoZSBXZWJzaXRlIHdoaWNoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNoYWxsIGJlIGNvbnNpZGVyZWQgYXMgdmFsaWQgYW5kIGFncmVlZCBjb21tdW5pY2F0aW9uLlxuICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGkgY2xhc3NOYW1lPVwicHJpdmFjeS1saXN0LWl0ZW1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSW4gb3JkZXIgdG8gcHJvY2VzcyB0aGUgcGF5bWVudHMsIGRvY3ByaW1lIG1pZ2h0IHJlcXVpcmUgZGV0YWlscyBvZiBVc2Vy4oCZcy8gVGhpcmQgUGFydHlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgU2VydmljZSBQcm92aWRlcnPigJkgYmFuayBhY2NvdW50LCBjcmVkaXQgY2FyZCBudW1iZXIgZXRjLiBQbGVhc2UgY2hlY2sgT3VyIFByaXZhY3kgUG9saWN5XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uIGhvdyBkb2NwcmltZSB1c2VzIHRoZSBjb25maWRlbnRpYWwgaW5mb3JtYXRpb24gcHJvdmlkZWQgYnkgVXNlcnMuXG4gICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9vbD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInByaXZhY3ktZGVzYy1zdWJoZWFkaW5nXCI+MTEuJm5ic3A7Jm5ic3A7Jm5ic3A7UkVTVFJJQ1RJT05TIE9OIFVTRSBPRiBUSEUgV0VCU0lURTwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxvbCBjbGFzc05hbWU9XCJwcml2YWN5LWxpc3QtZ3JvdXBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGkgY2xhc3NOYW1lPVwicHJpdmFjeS1saXN0LWl0ZW1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgWW91IGFncmVlIGFuZCB1bmRlcnRha2UgdGhhdCBZb3Ugc2hhbGwgbm90IGRvIGFueSBhY3Qgb3IgcG9zdCwgZGlzcGxheSwgdXBsb2FkLCBtb2RpZnksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHB1Ymxpc2gsIHRyYW5zbWl0LCB1cGRhdGUgb3Igc2hhcmUgYW55IGluZm9ybWF0aW9uIHRoYXQgLVxuICAgICAgICAgICAgICAgPG9sIGNsYXNzTmFtZT1cInN1Yi1saXN0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmVsb25ncyB0byBhbm90aGVyIHBlcnNvbiBhbmQgdG8gd2hpY2ggWW91IGRvZXMgbm90IGJlbG9uZyB0byBZb3Ugb3IgZG8gbm90IGhhdmUgYW55XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmlnaHQ7XG4gICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzIGdyb3NzbHkgaGFybWZ1bCwgaGFyYXNzaW5nLCBkZWZhbWF0b3J5LCBvYnNjZW5lLCBwb3Jub2dyYXBoaWMsIGxpYmVsb3VzLCBpbnZhc2l2ZSBvZlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFub3RoZXIncyBwcml2YWN5LCBoYXRlZnVsLCBvciBvYmplY3Rpb25hYmxlLCByZWxhdGluZyBvciBlbmNvdXJhZ2luZyBtb25leSBsYXVuZGVyaW5nXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3IgZ2FtYmxpbmcsIG9yIG90aGVyd2lzZSB1bmxhd2Z1bCBpbiBhbnkgbWFubmVyIHdoYXRldmVyO1xuICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmZyaW5nZXMgYW55IHBhdGVudCwgdHJhZGVtYXJrLCBjb3B5cmlnaHQgb3Igb3RoZXIgaW50ZWxsZWN0dWFsIHByb3ByaWV0YXJ5IHJpZ2h0cyBvZlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFueSB0aGlyZCBwYXJ0eTtcbiAgICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmlvbGF0ZXMgYW55IGxhdyBmb3IgdGhlIHRpbWUgYmVpbmcgaW4gZm9yY2U7XG4gICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGltcGVyc29uYXRlcyBhbm90aGVyIHBlcnNvbjtcbiAgICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGFpbnMgc29mdHdhcmUgdmlydXNlcyBvciBhbnkgb3RoZXIgY29tcHV0ZXIgY29kZSwgZmlsZXMgb3IgcHJvZ3JhbXMgZGVzaWduZWQgdG9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnRlcnJ1cHQsIGRlc3Ryb3kgb3IgbGltaXQgdGhlIGZ1bmN0aW9uYWxpdHkgb2YgYW55IGNvbXB1dGVyIHJlc291cmNlO1xuICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpcyBwcm9oaWJpdGVkIHVuZGVyIGFwcGxpY2FibGUgbGF3KHMpIGZvciB0aGUgdGltZSBiZWluZyBpbiBmb3JjZSBhbmQgcnVsZXMgbWFkZSB0aGVyZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVuZGVyOyBhbmRcbiAgICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyZWF0ZW5zIHRoZSB1bml0eSwgaW50ZWdyaXR5LCBkZWZlbnNlLCBzZWN1cml0eSBvciBzb3ZlcmVpZ250eSBvZiBJbmRpYSwgZnJpZW5kbHlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWxhdGlvbnMgd2l0aCBmb3JlaWduIHN0YXRlcywgb3IgcHVibGljIG9yZGVyIG9yIGNhdXNlcyBpbmNpdGVtZW50IHRvIHRoZSBjb21taXNzaW9uIG9mXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYW55IGNvZ25pemFibGUgb2ZmZW5jZSBvciBwcmV2ZW50cyBpbnZlc3RpZ2F0aW9uIG9mIGFueSBvZmZlbmNlIG9yIGlzIGluc3VsdGluZyBhbnkgb3RoZXJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYXRpb24uXG4gICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L29sPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpIGNsYXNzTmFtZT1cInByaXZhY3ktbGlzdC1pdGVtXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFlvdSBhcmUgYWxzbyBwcm9oaWJpdGVkIGZyb206XG4gICAgICAgICAgICAgICA8b2wgY2xhc3NOYW1lPVwic3ViLWxpc3RcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2aW9sYXRpbmcgb3IgYXR0ZW1wdGluZyB0byB2aW9sYXRlIHRoZSBpbnRlZ3JpdHkgb3Igc2VjdXJpdHkgb2YgdGhlIFdlYnNpdGUgb3IgYW55XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZG9jcHJpbWUgQ29udGVudDtcbiAgICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNtaXR0aW5nIGFueSBpbmZvcm1hdGlvbiAoaW5jbHVkaW5nIGpvYiBwb3N0cywgbWVzc2FnZXMgYW5kIGh5cGVybGlua3MpIG9uIG9yXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3VnaCB0aGUgV2Vic2l0ZSB0aGF0IGlzIGRpc3J1cHRpdmUgb3IgY29tcGV0aXRpdmUgdG8gdGhlIHByb3Zpc2lvbiBvZiBTZXJ2aWNlcyBieVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvY3ByaW1lO1xuICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnRlbnRpb25hbGx5IHN1Ym1pdHRpbmcgb24gdGhlIFdlYnNpdGUgYW55IGluY29tcGxldGUsIGZhbHNlIG9yIGluYWNjdXJhdGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmZvcm1hdGlvbjtcbiAgICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFraW5nIGFueSB1bnNvbGljaXRlZCBjb21tdW5pY2F0aW9ucyB0byBvdGhlciBDb3ZlbmFudGVycztcbiAgICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXNpbmcgYW55IGVuZ2luZSwgc29mdHdhcmUsIHRvb2wsIGFnZW50IG9yIG90aGVyIGRldmljZSBvciBtZWNoYW5pc20gKHN1Y2ggYXMgc3BpZGVycyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb2JvdHMsIGF2YXRhcnMgb3IgaW50ZWxsaWdlbnQgYWdlbnRzKSB0byBuYXZpZ2F0ZSBvciBzZWFyY2ggdGhlIFdlYnNpdGU7XG4gICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dGVtcHRpbmcgdG8gZGVjaXBoZXIsIGRlY29tcGlsZSwgZGlzYXNzZW1ibGUgb3IgcmV2ZXJzZSBlbmdpbmVlciBhbnkgcGFydCBvZiB0aGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBXZWJzaXRlO1xuICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb3B5aW5nIG9yIGR1cGxpY2F0aW5nIGluIGFueSBtYW5uZXIgYW55IG9mIHRoZSBkb2NwcmltZSBDb250ZW50IG9yIG90aGVyIGluZm9ybWF0aW9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXZhaWxhYmxlIGZyb20gdGhlIFdlYnNpdGU7IGFuZFxuICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9vbD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9vbD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInByaXZhY3ktZGVzY1wiPlRoZSBXZWJzaXRlIHNoYWxsIG5vdCBiZSB1c2VkIGZvciBpbGxlZ2FsIHB1cnBvc2VzLiBUaGUgaW5mb3JtYXRpb24gYW5kIFNlcnZpY2VzIHNoYWxsIG5vdFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgYmUgdXNlZCBmb3IgYW55IGlsbGVnYWwgcHVycG9zZS4gWW91IG1heSBub3QgYWNjZXNzIG91ciBuZXR3b3JrcywgY29tcHV0ZXJzLCBvciB0aGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIEluZm9ybWF0aW9uIGFuZCBTZXJ2aWNlcyBpbiBhbnkgbWFubmVyIHRoYXQgY291bGQgZGFtYWdlLCBkaXNhYmxlLCBvdmVyYnVyZGVuLCBvciBpbXBhaXJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoZW0sIG9yIGludGVyZmVyZSB3aXRoIGFueSBvdGhlciBwZXJzb24ncyB1c2UgYW5kIGVuam95bWVudC4gWW91IHNoYWxsIG5vdCBhdHRlbXB0IHRvXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBnYWluIHVuYXV0aG9yaXplZCBhY2Nlc3MgdG8gYW55IEluZm9ybWF0aW9uIG9yIFNlcnZpY2VzLCBvdGhlciBhY2NvdW50cywgY29tcHV0ZXIgc3lzdGVtcyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIG9yIG5ldHdvcmtzIGNvbm5lY3RlZCB3aXRoIHRoZSBXZWJzaXRlLCB0aGUgSW5mb3JtYXRpb24sIG9yIFNlcnZpY2VzLiBZb3Ugc2hhbGwgbm90IHVzZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgYW55IGF1dG9tYXRlZCBtZWFucyAoc3VjaCBhcyBhIHNjcmFwZXIpIHRvIGFjY2VzcyB0aGUgV2Vic2l0ZSwgdGhlIEluZm9ybWF0aW9uLCBvclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgU2VydmljZXMgZm9yIGFueSBwdXJwb3NlLiBTdWNoIHVuYXV0aG9yaXplZCBhY2Nlc3MgaW5jbHVkZXMsIGJ1dCBpcyBub3QgbGltaXRlZCB0bywgdXNpbmdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIGFub3RoZXIgcGVyc29u4oCZcyBsb2dpbiBjcmVkZW50aWFscyB0byBhY2Nlc3MgaGlzIG9yIGhlciBkb2NwcmltZSBwcm9maWxlLyBhY2NvdW50LiBBbnlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dGVtcHQgYnkgYW55IGluZGl2aWR1YWwgb3IgZW50aXR5IHRvIHNvbGljaXQgbG9naW4gaW5mb3JtYXRpb24gb2YgYW55IG90aGVyIHVzZXIgdG8gYWNjZXNzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBhbnkgc3VjaCBhY2NvdW50IGlzIGFuIGV4cHJlc3MgYW5kIGRpcmVjdCB2aW9sYXRpb24gb2YgdGhlc2UgVGVybXMgb2YgVXNlIGFuZCBvZiBhcHBsaWNhYmxlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBsYXcocyksIGluY2x1ZGluZyByZWxldmFudCBwcml2YWN5IGFuZCBzZWN1cml0eSBsYXdzIGFuZCBsYXdzIHByb2hpYml0aW5nIHVuZmFpciBvciB1bmV0aGljYWxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1c2luZXNzIHByYWN0aWNlcy5cbiAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInByaXZhY3ktZGVzYy1zdWJoZWFkaW5nXCI+MTIuJm5ic3A7Jm5ic3A7Jm5ic3A7Tk8gV0FSUkFOVElFUzwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInByaXZhY3ktZGVzY1wiPlVzZXJzIGFjY2VwdCBhbmQgYWNrbm93bGVkZ2VzIHRoYXQgdGhlIFNlcnZpY2VzIG9mZmVyZWQgYnkgZG9jcHJpbWUgdGhyb3VnaCB0aGUgV2Vic2l0ZSAob3JcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIGFueSBvZiBpdHMgbGljZW5zb3JzIG9yIHByb3ZpZGVycyBvciBUaGlyZCBQYXJ0eSBTZXJ2aWNlIFByb3ZpZGVycykgYXJlIHByb3ZpZGVkIOKAmGFzIGlz4oCZLCBhc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgYXZhaWxhYmxlLCBhbmQgd2l0aG91dCBhbnkgd2FycmFudGllcyBvciByZXByZXNlbnRhdGlvbnMgb3IgY29uZGl0aW9ucyAoZXhwcmVzcyBvciBpbXBsaWVkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5jbHVkaW5nIHRoZSBpbXBsaWVkIHdhcnJhbnRpZXMgb3IgcmVwcmVzZW50YXRpb25zIG9mIG1lcmNoYW50YWJpbGl0eSwgYWNjdXJhY3ksIGZpdG5lc3MgZm9yIGFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcnRpY3VsYXIgcHVycG9zZSwgdGl0bGUgYW5kIG5vbi1pbmZyaW5nZW1lbnQsIGFyaXNpbmcgYnkgc3RhdHV0ZSBvciBvdGhlcndpc2UgaW4gbGF3IG9yIGZyb20gYVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgY291cnNlIG9mIGRlYWxpbmcgb3IgdXNhZ2Ugb3IgdHJhZGUpLiBkb2NwcmltZSBkb2VzIG5vdCBwcm92aWRlIG9yIG1ha2UgYW55IHJlcHJlc2VudGF0aW9ucyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHdhcnJhbnRpZXMgb3IgZ3VhcmFudGVlcyBleHByZXNzIG9yIGltcGxpZWQgYWJvdXQgdGhlIFdlYnNpdGUgb3IgdGhlIFNlcnZpY2VzLiBkb2NwcmltZSBkb2VzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBub3QgdmVyaWZ5IGFueSBjb250ZW50IG9yIGluZm9ybWF0aW9uIHByb3ZpZGVkIGJ5IHRoZSBVc2VycyBvciBhbnkgVGhpcmQgUGFydHkgU2VydmljZSBQcm92aWRlcnNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIChjb2xsZWN0aXZlbHkgcmVmZXJyZWQgdG8gYXMgdGhlIOKAnE90aGVyIFBhcnRpZXPigJ0pIG9uIHRoZSBXZWJzaXRlIGFuZCB0byB0aGUgZnVsbGVzdCBleHRlbnRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHBlcm1pdHRlZCBieSBhcHBsaWNhYmxlIGxhdyhzKSwgZGlzY2xhaW1zIGFsbCBsaWFiaWxpdHkgYXJpc2luZyBvdXQgb2YgdGhlIE90aGVyIFBhcnRpZXPigJkgdXNlIG9yXG4gICAgICAgICAgICAgICAgICAgICAgICAgICByZWxpYW5jZSB1cG9uIHRoZSBXZWJzaXRlLCB0aGUgU2VydmljZXMsIHRoZSBkb2NwcmltZSBDb250ZW50LCBUaGlyZCBQYXJ0eSBDb250ZW50cyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcHJlc2VudGF0aW9ucyBhbmQgd2FycmFudGllcyBtYWRlIGJ5IHRoZSBPdGhlciBQYXJ0aWVzIG9uIHRoZSBXZWJzaXRlIG9yIGFueSBsb3NzIGFyaXNpbmcgb3V0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICBvZiB0aGUgbWFubmVyIGluIHdoaWNoIHRoZSBTZXJ2aWNlcyBoYXZlIGJlZW4gcmVuZGVyZWQuXG4gICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJwcml2YWN5LWRlc2NcIj5kb2NwcmltZSBhbHNvIGRvZXMgbm90IHByb3ZpZGUgYW55IHJlcHJlc2VudGF0aW9uIG9yIGdpdmUgYW55IGd1YXJhbnRlZSBvciB3YXJyYW50eSAod2hldGhlclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgZXhwcmVzcyBvciBpbXBsaWVkKSBhYm91dCB0aGUgV2Vic2l0ZSBvciBhbnkgb2YgdGhlIFNlcnZpY2VzIG9mZmVyZWQgb3Igc2VydmljZXMgb2ZmZXJlZCBvclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvdmlkZWQgYnkgdGhlIFRoaXJkIFBhcnR5IFNlcnZpY2UgUHJvdmlkZXJzLlxuICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwicHJpdmFjeS1kZXNjLXN1YmhlYWRpbmdcIj4xMy4mbmJzcDsmbmJzcDsmbmJzcDtMSUFCSUxJVFk8L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICA8b2wgY2xhc3NOYW1lPVwic3ViLWxpc3RcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGk+ZG9jcHJpbWUgc2hhbGwgbm90IGJlIHJlc3BvbnNpYmxlIG9yIGxpYWJsZSBpbiBhbnkgbWFubmVyIHRvIHRoZSBVc2VycyBvciBhbnkgVGhpcmQgUGFydHlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBTZXJ2aWNlIFByb3ZpZGVycyAoY29sbGVjdGl2ZWx5IHJlZmVycmVkIHRvIGFzIHRoZSDigJxPdGhlciBQYXJ0aWVz4oCdKSBmb3IgYW55IGxvc3NlcywgZGFtYWdlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluanVyaWVzIG9yIGV4cGVuc2VzIGluY3VycmVkIGJ5IGFzIGEgcmVzdWx0IG9mIGFueSBkaXNjbG9zdXJlcyBtYWRlIGJ5IGRvY3ByaW1lLCB3aGVyZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE90aGVyIFBhcnRpZXMgaGF2ZSBjb25zZW50ZWQgdG8gdGhlIG1ha2luZyBvZiBzdWNoIGRpc2Nsb3N1cmVzIGJ5IGRvY3ByaW1lLiBUaGUgT3RoZXJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBQYXJ0aWVzIHNoYWxsIG5vdCBob2xkIGRvY3ByaW1lIHJlc3BvbnNpYmxlIG9yIGxpYWJsZSBpbiBhbnkgd2F5IGZvciBhbnkgZGlzY2xvc3VyZXMgYnlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb2NwcmltZSBmb3IgY29sbGVjdGlvbiwgdXNlLCBzdG9yYWdlIGFuZCB0cmFuc2ZlciBvZiBwZXJzb25hbCBpbmZvcm1hdGlvbiB1bmRlciB0aGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBQcml2YWN5IFBvbGljeS4gZG9jcHJpbWUgc2hhbGwgbm90IGJlIHJlc3BvbnNpYmxlIGZvciB0aGUgbWlzaGFwcy9taXNzZWQgc2VydmljZXMgZHVlIHRvIG5vXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VydmljZS9ubyBzaG93IGZyb20gdGhlIE90aGVyIFBhcnRpZXM7IGRvY3ByaW1lIHNoYWxsIG5vdCBiZSByZXNwb25zaWJsZSBmb3IgYW55IGVycm9yIGluXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYW55IG9mIHRoZSBzZXJ2aWNlcyBiZWluZyBwcm92aWRlZCBieSB0aGUgVGhpcmQgUGFydHkgU2VydmljZSBQcm92aWRlcnMuXG4gICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaT5kb2NwcmltZSBhc3N1bWVzIG5vIHJlc3BvbnNpYmlsaXR5LCBhbmQgc2hhbGwgbm90IGJlIGxpYWJsZSBmb3IsIGFueSBkYW1hZ2VzIHRvLCBvciB2aXJ1c2VzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdCBtYXkgaW5mZWN0IE90aGVyIFBhcnRpZXPigJkgZXF1aXBtZW50IG9uIGFjY291bnQgb2YgdGhlIE90aGVyIFBhcnRpZXPigJkgYWNjZXNzIHRvLCB1c2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvZiwgb3IgYnJvd3NpbmcgdGhlIFdlYnNpdGUgb3IgdGhlIGRvd25sb2FkaW5nIG9mIGFueSBtYXRlcmlhbCwgZGF0YSwgdGV4dCwgaW1hZ2VzLCB2aWRlb1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQsIG9yIGF1ZGlvIGNvbnRlbnQgZnJvbSB0aGUgV2Vic2l0ZS4gSWYgYW55IG9mIHRoZSBPdGhlciBQYXJ0eSBpcyBkaXNzYXRpc2ZpZWQgd2l0aFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoZSBXZWJzaXRlLCB0aGUgc29sZSByZW1lZHkgb2Ygc3VjaCBPdGhlciBQYXJ0eShzKSBpcyB0byBkaXNjb250aW51ZSB1c2luZyB0aGUgV2Vic2l0ZS5cbiAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpPlRvIHRoZSBtYXhpbXVtIGV4dGVudCBwZXJtaXR0ZWQgYnkgYXBwbGljYWJsZSBsYXcocyksIGRvY3ByaW1lLCBpdHMgYWZmaWxpYXRlcyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmRlcGVuZGVudCBjb250cmFjdG9ycywgc2VydmljZSBwcm92aWRlcnMsIGNvbnN1bHRhbnRzLCBsaWNlbnNvcnMsIGFnZW50cywgYW5kXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVwcmVzZW50YXRpdmVzLCBhZmZpbGlhdGVzLCBncm91cCBjb21wYW5pZXMgYW5kIGVhY2ggb2YgdGhlaXIgcmVzcGVjdGl2ZSBkaXJlY3RvcnMsIG9mZmljZXJzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3IgZW1wbG95ZWVzICjigJxQcm90ZWN0ZWQgRW50aXRpZXPigJ0pLCBzaGFsbCBub3QgYmUgbGlhYmxlIGZvciBhbnkgZGlyZWN0LCBpbmRpcmVjdCwgc3BlY2lhbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmNpZGVudGFsLCBwdW5pdGl2ZSwgZXhlbXBsYXJ5IG9yIGNvbnNlcXVlbnRpYWwgZGFtYWdlcywgb3IgYW55IG90aGVyIGRhbWFnZXMgb2YgYW55XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2luZCwgYXJpc2luZyBmcm9tLCBvciBpbiBjb25uZWN0IHdpdGggb3IgZGlyZWN0bHkgb3IgaW5kaXJlY3RseSByZWxhdGVkIHRvLCB0aGUgdXNlIG9mLCBvciB0aGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmFiaWxpdHkgdG8gdXNlLCB0aGUgV2Vic2l0ZSBvciB0aGUgY29udGVudCwgbWF0ZXJpYWxzIGFuZCBmdW5jdGlvbnMgcmVsYXRlZCB0aGVyZXRvOyBldmVuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgUHJvdGVjdGVkIEVudGl0aWVzIGhhcyBiZWVuIGFkdmlzZWQgb2YgdGhlIHBvc3NpYmlsaXR5IG9mIHN1Y2ggZGFtYWdlcy5cbiAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpPkluIChpdiksIGFsbCBvciBhbnkgcHJvZHVjdHMgb3Igc2VydmljZSBieSBhIFRoaXJkIFBhcnR5IFNlcnZpY2UgUHJvdmlkZXIgdG8gYW55IFVzZXI7IG9yIChpaSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbnkgY29tbWVudHMgb3IgZmVlZGJhY2sgZ2l2ZW4gYnkgYW55IG9mIHRoZSBVc2VycyBpbiByZWxhdGlvbiB0byB0aGUgZ29vZHMgb3Igc2VydmljZXNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm92aWRlZCBieSBhbnkgVGhpcmQgUGFydHkgU2VydmljZSBQcm92aWRlcnM7IG9yIChpaSkgYW55IGNvbnRlbnQgcG9zdGVkLCB0cmFuc21pdHRlZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBleGNoYW5nZWQgb3IgcmVjZWl2ZWQgYnkgb3Igb24gYmVoYWxmIG9mIGFueSBVc2VyLCBUaGlyZCBQYXJ0eSBTZXJ2aWNlIFByb3ZpZGVycyBvciBvdGhlclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBlcnNvbiBvbiBvciB0aHJvdWdoIHRoZSBXZWJzaXRlLlxuICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGk+SW4gbm8gZXZlbnQgc2hhbGwgdGhlIFByb3RlY3RlZCBFbnRpdGllcyBiZSBsaWFibGUgZm9yIGZhaWx1cmUgb24gdGhlIHBhcnQgb2YgdGhlIFVzZXJzIG9yXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgVGhpcmQgUGFydHkgU2VydmljZSBQcm92aWRlcnMgdG8gcHJvdmlkZSBhZ3JlZWQgc2VydmljZXMgb3IgdG8gbWFrZSBoaW1zZWxmL2hlcnNlbGZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdmFpbGFibGUgYXQgdGhlIGFwcG9pbnRlZCB0aW1lLCBjYW5jZWxsYXRpb24gb3IgcmVzY2hlZHVsaW5nIG9mIGFwcG9pbnRtZW50cy4gSW4gbm8gZXZlbnRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaGFsbCB0aGUgUHJvdGVjdGVkIEVudGl0aWVzIGJlIGxpYWJsZSBmb3IgYW55IGNvbW1lbnRzIG9yIGZlZWRiYWNrIGdpdmVuIGJ5IGFueSBvZiB0aGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBVc2VycyBpbiByZWxhdGlvbiB0byB0aGUgc2VydmljZXMgcHJvdmlkZWQgYnkgYSBUaGlyZCBQYXJ0eSBTZXJ2aWNlIFByb3ZpZGVyc1xuICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGk+ZG9jcHJpbWUgZGlzY2xhaW1zIGFueSBsaWFiaWxpdHkgaW4gcmVsYXRpb24gdG8gdGhlIHZhbGlkaXR5IG9mIHRoZSBtZWRpY2FsIGFkdmljZSBwcm92aWRlZCBieVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoZSBNZWRpY2FsIEV4cGVydHMgYW5kIHRoZSB2YWxpZGl0eSBhbmQgbGVnYWxpdHkgb2YgdGhlIGUtcHJlc2NyaXB0aW9uIGZvciBkaXNwZW5zYXRpb24gb2ZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZWRpY2luZXMgYW5kIGNvbmR1Y3Qgb2YgZGlhZ25vc3RpYyB0ZXN0cy4gQWxsIGxpYWJpbGl0aWVzIGFyaXNpbmcgb3V0IG9mIGFueSB3cm9uZyBkaWFnbm9zaXNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvZiBtZWRpY2FsIGNvbmRpdGlvbiBieSB0aGUgTWVkaWNhbCBFeHBlcnRzIGFuZC8gb3IgYXJpc2luZyBmcm9tIHRoZSBlLXByZXNjcmlwdGlvbiB3aWxsIGJlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb2YgdGhlIGNvbmNlcm5lZCBNZWRpY2FsIEV4cGVydC4gRnVydGhlciwgYWxsIGxpYWJpbGl0aWVzIGFyaXNpbmcgb3V0IG9mIGFueSB3cm9uZyBkaWFnbm9zaXNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXBvcnQgYnkgdGhlIFRoaXJkIFBhcnR5IExhYnMgYW5kLyBvciBhcmlzaW5nIGZyb20gdGhlIHdyb25nIGRpc3BlbnNhdGlvbiBvZiB0aGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBQaGFybWFjZXV0aWNhbCBHb29kcyBhbmQgU2VydmljZXMgd2lsbCBiZSBvZiB0aGUgY29uY2VybmVkIFRoaXJkIFBhcnR5IFNlcnZpY2UgUHJvdmlkZXJzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXMgdGhlIGNhc2UgbWF5IGJlLlxuICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGk+VGhlIFVzZXJzIG1heSBzaGFyZSB0aGVpciBwcmV2aW91cyBtZWRpY2FsIGhpc3RvcnkgZHVyaW5nIGludGVyYWN0aW9uIHdpdGggdGhlIE1lZGljYWxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBFeHBlcnRzLiBUaGUgVXNlcnMgdW5kZXJ0YWtlIHRvIHNoYXJlIHN1Y2ggaW5mb3JtYXRpb24gYXQgdGhlaXIgb3duIHJpc2suIGRvY3ByaW1lXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzZXJ2ZXMgdGhlIHJpZ2h0IHRvIHJldGFpbiBzdWNoIGluZm9ybWF0aW9uIGZvciB0aGUgcHVycG9zZSBvZiBwcm92aWRpbmcgU2VydmljZXMgdG8gdGhlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgVXNlcnMuXG4gICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaT5UaGUgVXNlcnMgYWNrbm93bGVkZ2UgdGhhdCB0aGUgUHJvdGVjdGVkIEVudGl0aWVzIG1lcmVseSBhY3QgaW4gdGhlIGNhcGFjaXR5IG9mIGZhY2lsaXRhdG9yc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJldHdlZW4gdGhlIE90aGVyIFBhcnRpZXMgYnkgcHJvdmlkaW5nIGEgcGxhdGZvcm0gZm9yIHRoZW0gdG8gaW50ZXJhY3QgYW5kIHRyYW5zYWN0LiBJbiBub1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50IHNoYWxsIHRoZSBQcm90ZWN0ZWQgRW50aXRpZXMgYmUgaGVsZCBsaWFibGUgZm9yIGFueSBvZiB0aGUgbG9zc2VzIGF0dHJpYnV0YWJsZSB0b1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFNlcnZpY2VzIG9mZmVyZWQgdGhyb3VnaCB0aGUgV2Vic2l0ZS5cbiAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpPkluIG5vIGV2ZW50IHNoYWxsIHRoZSB0b3RhbCBhZ2dyZWdhdGUgbGlhYmlsaXR5IG9mIHRoZSBQcm90ZWN0ZWQgRW50aXRpZXMgdG8gYW55IE90aGVyIFBhcnRpZXNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgYWxsIGRhbWFnZXMsIGxvc3NlcywgYW5kIGNhdXNlcyBvZiBhY3Rpb24gKHdoZXRoZXIgaW4gY29udHJhY3Qgb3IgdG9ydCwgaW5jbHVkaW5nLCBidXQgbm90XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGltaXRlZCB0byBuZWdsaWdlbmNlLCBzdHJpY3QgbGlhYmlsaXR5LCBwcm9kdWN0IGxpYWJpbGl0eSBvciBvdGhlcndpc2UpIGFyaXNpbmcgZnJvbSB0aGVzZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFRlcm1zIG9mIFVzZSBvciBhbnkgT3RoZXIgUGFydGllc+KAmSB1c2Ugb2YgdGhlIFdlYnNpdGUgZXhjZWVkIGFuIGFnZ3JlZ2F0ZSBhbW91bnQgb2YgSU5SXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMTAwMC8tIChJbmRpYW4gUnVwZWVzIFRob3VzYW5kIG9ubHkpLlxuICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGk+ZG9jcHJpbWUgYWNjZXB0cyBubyBsaWFiaWxpdHkgZm9yIGFueSBlcnJvcnMgb3Igb21pc3Npb25zIG9uIGJlaGFsZiBvZiB0aGUgT3RoZXIgUGFydGllcy48L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9vbD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInByaXZhY3ktZGVzYy1zdWJoZWFkaW5nXCI+MTQuJm5ic3A7Jm5ic3A7Jm5ic3A7SU5ERU1OSVRZPC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwicHJpdmFjeS1kZXNjXCI+WW91IGFncmVlIHRvIGRlZmVuZCwgaW5kZW1uaWZ5IGFuZCBob2xkIGhhcm1sZXNzIGRvY3ByaW1lLCB0aGUgUHJvdGVjdGVkIEVudGl0aWVzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXBlbmRlbnQgY29udHJhY3RvcnMsIHNlcnZpY2UgcHJvdmlkZXJzLCBjb25zdWx0YW50cywgbGljZW5zb3JzLCBhZ2VudHMsIGFuZCByZXByZXNlbnRhdGl2ZXMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBhbmQgZWFjaCBvZiB0aGVpciByZXNwZWN0aXZlIGRpcmVjdG9ycywgb2ZmaWNlcnMgYW5kIGVtcGxveWVlcywgZnJvbSBhbmQgYWdhaW5zdCBhbnkgYW5kIGFsbFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhaW1zLCBsb3NzZXMsIGxpYWJpbGl0eSwgZGFtYWdlcywgYW5kL29yIGNvc3RzIChpbmNsdWRpbmcsIGJ1dCBub3QgbGltaXRlZCB0bywgcmVhc29uYWJsZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0b3JuZXkgZmVlcyBhbmQgY29zdHMpIGFyaXNpbmcgZnJvbSBvciByZWxhdGVkIHRvIChhKSBhY2Nlc3MgdG8gb3IgdXNlIG9mIFdlYnNpdGU7IChiKSB2aW9sYXRpb25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgIG9mIHRoZXNlIFRlcm1zIG9mIFVzZSBvciBhbnkgYXBwbGljYWJsZSBsYXcocyk7IChjKSB2aW9sYXRpb24gb2YgYW55IHJpZ2h0cyBvZiBhbm90aGVyIHBlcnNvbi9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgIGVudGl0eSwgaW5jbHVkaW5nIGluZnJpbmdlbWVudCBvZiB0aGVpciBpbnRlbGxlY3R1YWwgcHJvcGVydHkgcmlnaHRzOyBvciAoZCkgY29uZHVjdCBpbiBjb25uZWN0aW9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICB3aXRoIHRoZSBXZWJzaXRlLlxuICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwicHJpdmFjeS1kZXNjLXN1YmhlYWRpbmdcIj4xNS4mbmJzcDsmbmJzcDsmbmJzcDtHRU5FUkFMIFRFUk1TPC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgPG9sIGNsYXNzTmFtZT1cInN1Yi1saXN0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj5MaW5rcyB0byBUaGlyZCBQYXJ0eSBXZWJzaXRlczo8L3NwYW4+IFRoZSBXZWJzaXRlIG1heSBiZSBsaW5rZWQgdG8gdGhlIHdlYnNpdGUgb2YgdGhpcmRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFydGllcywgYWZmaWxpYXRlcyBhbmQgYnVzaW5lc3MgcGFydG5lcnMuIGRvY3ByaW1lIGhhcyBubyBjb250cm9sIG92ZXIsIGFuZCBub3QgbGlhYmxlIG9yXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNpYmxlIGZvciBjb250ZW50LCBhY2N1cmFjeSwgdmFsaWRpdHksIHJlbGlhYmlsaXR5LCBxdWFsaXR5IG9mIHN1Y2ggd2Vic2l0ZXMgb3IgbWFkZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdmFpbGFibGUgYnkvdGhyb3VnaCB0aGUgV2Vic2l0ZS4gSW5jbHVzaW9uIG9mIGFueSBsaW5rIG9uIHRoZSBXZWJzaXRlIGRvZXMgbm90IGltcGx5XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQgZG9jcHJpbWUgZW5kb3JzZXMgdGhlIGxpbmtlZCB3ZWJzaXRlLiBPdGhlciBQYXJ0aWVzIG1heSB1c2UgdGhlIGxpbmtzIGFuZCB0aGVzZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXJ2aWNlcyBhdCB0aGVpciBvd24gcmlzay5cbiAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj5Nb2RpZmljYXRpb25zOjwvc3Bhbj4gZG9jcHJpbWUgcmVzZXJ2ZXMgdGhlIHJpZ2h0IHRvIGNoYW5nZSBvciBtb2RpZnkgdGhlc2UgVGVybXMgb2YgVXNlIG9yXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFueSBwb2xpY3kgb3IgZ3VpZGVsaW5lIG9mIHRoZSBXZWJzaXRlIGluY2x1ZGluZyB0aGUgUHJpdmFjeSBQb2xpY3ksIGF0IGFueSB0aW1lIGFuZCBpblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdHMgc29sZSBkaXNjcmV0aW9uLiBBbnkgY2hhbmdlcyBvciBtb2RpZmljYXRpb25zIHdpbGwgYmUgZWZmZWN0aXZlIGltbWVkaWF0ZWx5IHVwb25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zdGluZyB0aGUgcmV2aXNpb25zIG9uIHRoZSBXZWJzaXRlIGFuZCBZb3Ugd2FpdmUgYW55IHJpZ2h0IFlvdSBtYXkgaGF2ZSB0byByZWNlaXZlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwZWNpZmljIG5vdGljZSBvZiBzdWNoIGNoYW5nZXMgb3IgbW9kaWZpY2F0aW9ucy4gWW91ciBjb250aW51ZWQgdXNlIG9mIHRoZSBXZWJzaXRlIHdpbGxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uZmlybSBZb3VyIGFjY2VwdGFuY2Ugb2Ygc3VjaCBjaGFuZ2VzIG9yIG1vZGlmaWNhdGlvbnM7IHRoZXJlZm9yZSwgWW91IHNob3VsZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmcmVxdWVudGx5IHJldmlldyB0aGVzZSBUZXJtcyBvZiBVc2UgYW5kIGFwcGxpY2FibGUgcG9saWNpZXMgdG8gdW5kZXJzdGFuZCB0aGUgdGVybXNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYW5kIGNvbmRpdGlvbnMgdGhhdCBhcHBseSB0byBZb3VyIHVzZSBvZiB0aGUgV2Vic2l0ZS4gRnVydGhlciwgZG9jcHJpbWUgYWxzbyByZXNlcnZlc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGUgcmlnaHQgdG8gbW9kaWZ5IG9yIGRpc2NvbnRpbnVlLCB0ZW1wb3JhcmlseSBvciBwZXJtYW5lbnRseSwgdGhlIFdlYnNpdGUgb3IgYW55XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZlYXR1cmVzIG9yIHBvcnRpb25zIHRoZXJlb2Ygd2l0aG91dCBwcmlvciBub3RpY2UuIFlvdSBhZ3JlZSB0aGF0IGRvY3ByaW1lIHdpbGwgbm90IGJlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpYWJsZSBmb3IgYW55IG1vZGlmaWNhdGlvbiwgc3VzcGVuc2lvbiBvciBkaXNjb250aW51YW5jZSBvZiB0aGUgV2Vic2l0ZSBvciBhbnkgb3RoZXJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFydCB0aGVyZW9mLlxuICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPkNvb2tpZXM6PC9zcGFuPiBUaGUgV2Vic2l0ZSB1c2VzIHRlbXBvcmFyeSBjb29raWVzIHRvIHN0b3JlIGNlcnRhaW4gZGF0YSAodGhhdCBpcyBub3Qgc2Vuc2l0aXZlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBlcnNvbmFsIGRhdGEgb3IgaW5mb3JtYXRpb24pIHRoYXQgaXMgdXNlZCBieSBkb2NwcmltZSBmb3IgdGhlIHRlY2huaWNhbCBhZG1pbmlzdHJhdGlvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvZiB0aGUgV2Vic2l0ZSwgcmVzZWFyY2ggYW5kIGRldmVsb3BtZW50LCBhbmQgZm9yIFVzZXIgYWRtaW5pc3RyYXRpb24uIEluIHRoZSBjb3Vyc2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb2Ygc2VydmluZyBvciBvcHRpbWl6aW5nIHNlcnZpY2VzIHRvIFlvdSwgZG9jcHJpbWUgbWF5IGFsbG93IGF1dGhvcml6ZWQgdGhpcmQgcGFydGllcyB0b1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGFjZSBvciByZWNvZ25pemUgYSB1bmlxdWUgY29va2llIG9uIHRoZSBZb3VyIGJyb3dzZXIuIGRvY3ByaW1lIGRvZXMgbm90IHN0b3JlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBlcnNvbmFsbHkgaWRlbnRpZmlhYmxlIGluZm9ybWF0aW9uIGluIHRoZSBjb29raWVzLlxuICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPkludGVsbGVjdHVhbCBwcm9wZXJ0eSByaWdodHM6PC9zcGFuPiBBbGwgdGhlIGludGVsbGVjdHVhbCBwcm9wZXJ0eSB1c2VkIG9uIHRoZSBXZWJzaXRlIGV4Y2VwdFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aG9zZSB3aGljaCBoYXZlIGJlZW4gaWRlbnRpZmllZCBhcyB0aGUgaW50ZWxsZWN0dWFsIHByb3BlcnRpZXMgb2YgdGhlIE90aGVyIFBhcnRpZXMoYXNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmaW5lZCBhYm92ZSkgc2hhbGwgcmVtYWluIHRoZSBleGNsdXNpdmUgcHJvcGVydHkgb2YgdGhlIENvbXBhbnkuIFRoZSBPdGhlciBQYXJ0aWVzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFncmVlIG5vdCB0byBjaXJjdW12ZW50LCBkaXNhYmxlIG9yIG90aGVyd2lzZSBpbnRlcmZlcmUgd2l0aCBzZWN1cml0eSByZWxhdGVkIGZlYXR1cmVzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9mIHRoZSBXZWJzaXRlIG9yIGZlYXR1cmVzIHRoYXQgcHJldmVudCBvciByZXN0cmljdCB1c2Ugb3IgY29weWluZyBvZiBhbnkgbWF0ZXJpYWxzIG9yXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVuZm9yY2UgbGltaXRhdGlvbnMgb24gdXNlIG9mIHRoZSBXZWJzaXRlIG9yIHRoZSBtYXRlcmlhbHMgdGhlcmVpbi4gVGhlIG1hdGVyaWFscyBvbiB0aGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgV2Vic2l0ZSBvciBvdGhlcndpc2UgbWF5IG5vdCBiZSBtb2RpZmllZCwgY29waWVkLCByZXByb2R1Y2VkLCBkaXN0cmlidXRlZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVwdWJsaXNoZWQsIGRvd25sb2FkZWQsIGRpc3BsYXllZCwgc29sZCwgY29tcGlsZWQsIHBvc3RlZCBvciB0cmFuc21pdHRlZCBpbiBhbnkgZm9ybVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvciBieSBhbnkgbWVhbnMsIGluY2x1ZGluZyBidXQgbm90IGxpbWl0ZWQgdG8sIGVsZWN0cm9uaWMsIG1lY2hhbmljYWwsIHBob3RvY29weWluZyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVjb3JkaW5nIG9yIG90aGVyIG1lYW5zLlxuICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPkNvbXBsaWFuY2Ugb2YgQXBwbGljYWJsZSBMYXc6PC9zcGFuPiBXaGlsZSBjb21tdW5pY2F0aW5nLyB0cmFuc2FjdGluZyB3aXRoIGVhY2ggb3RoZXJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3VnaCB0aGUgV2Vic2l0ZSwgVGhpcmQgUGFydHkgU2VydmljZSBQcm92aWRlcnMgc2hhbGwgYXQgYWxsIHRpbWVzIGVuc3VyZSBmdWxsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBsaWFuY2Ugd2l0aCB0aGUgYXBwbGljYWJsZSBwcm92aXNpb25zIG9mIHRoZSBDb250cmFjdCBBY3QsIElUIEFjdCwgRHJ1Z3MgQWN0IHJlYWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2l0aCB0aGUgRHJ1ZyBSdWxlcywgRHJ1Z3MgYW5kIE1hZ2ljIEFjdCwgVGhlIEluZGlhbiBNZWRpY2FsIENvdW5jaWwgQWN0LCAxOTU2IHJlYWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2l0aCB0aGUgSW5kaWFuIE1lZGljYWwgQ291bmNpbCBSdWxlcywgMTk1NywgUGhhcm1hY3kgQWN0LCBDb25zdW1lciBQcm90ZWN0aW9uIEFjdCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMTk4NiwgSVQgbGF3IChpbmNsdWRpbmcgcnVsZXMgZm9yIHNlbnNpdGl2ZSBwZXJzb25hbCBpbmZvcm1hdGlvbiBhcyBlbnNocmluZWQgdW5kZXIgSVRcbiAgICAgICAgICAgICAgIGxhdyksIGV0Yy4gPHN0cm9uZz4o4oCcQ2FwdGlvbmVkIExhd3PigJ0pPC9zdHJvbmc+IGFzIHdlbGwgYXMgYWxsIG90aGVyIGxhd3MgZm9yIHRoZSB0aW1lIGJlaW5nIGluIGZvcmNlLlxuICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPlRlcm1pbmF0aW9uOjwvc3Bhbj4gZG9jcHJpbWUgcmVzZXJ2ZXMgdGhlIHJpZ2h0IHRvLCBhdCBhbnkgdGltZSwgYW5kIHdpdGggb3Igd2l0aG91dCBub3RpY2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlcm1pbmF0ZSB0aGVzZSBUZXJtcyBvZiBVc2UgYWdhaW5zdCB0aGUgVXNlcihzKSwgaWYgdGhlcmUgaXM6XG4gICAgICAgICAgICAgICA8b2wgY2xhc3NOYW1lPVwicHJpdmFjeS1vcmRlci1saXN0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGkgY2xhc3NOYW1lPVwicHJpdmFjeS1vcmRlci1pdGVtXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQnJlYWNoIG9mIGFueSBvZiBhcHBsaWNhYmxlIGxhdyhzKSwgaW5jbHVkaW5nIGJ1dCBub3QgbGltaXRlZCB0byB0aGUgQ2FwdGlvbmVkIExhd3NcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvciB0aGUgcHJvdmlzaW9ucyBvZiB0aGVzZSBUZXJtcyBvZiBVc2Ugb3IgdGhlIHRlcm1zIG9mIHRoZSBQcml2YWN5IFBvbGljeSBvciBhbnlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdGhlciB0ZXJtcywgY29uZGl0aW9ucywgb3IgcG9saWNpZXMgdGhhdCBtYXkgYmUgYXBwbGljYWJsZSB0byB0aGUgU2VydmljZXMgZnJvbVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpbWUgdG8gdGltZSAob3IgaGF2ZSBhY3RlZCBpbiBhIG1hbm5lciB0aGF0IGNsZWFybHkgc2hvd3MgdGhhdCBPdGhlciBQYXJ0eShzKSBkb1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vdCBpbnRlbmQgdG8sIG9yIGFyZSB1bmFibGUgdG8sIGNvbXBseSB3aXRoIHRoZSBzYW1lKTsgb3JcbiAgICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGkgY2xhc3NOYW1lPVwicHJpdmFjeS1vcmRlci1pdGVtXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQnJlYWNoIG9mIGFueSB0ZXJtcyBhbmQgY29uZGl0aW9ucyBvZiB0aGVzZSBUZXJtcyBvZiBVc2U7XG4gICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpIGNsYXNzTmFtZT1cInByaXZhY3ktb3JkZXItaXRlbVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvY3ByaW1lIGlzIHVuYWJsZSB0byB2ZXJpZnkgb3IgYXV0aGVudGljYXRlIGFueSBpbmZvcm1hdGlvbiBwcm92aWRlZCB0b1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvY3ByaW1lOyBvclxuICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaSBjbGFzc05hbWU9XCJwcml2YWN5LW9yZGVyLWl0ZW1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBBIHRoaXJkIHBhcnR5IHJlcG9ydHMgdmlvbGF0aW9uIG9mIGFueSBvZiBpdHMgcmlnaHQgYXMgYSByZXN1bHQgb2YgeW91ciB1c2Ugb2YgdGhlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgU2VydmljZXM7XG4gICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpIGNsYXNzTmFtZT1cInByaXZhY3ktb3JkZXItaXRlbVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvY3ByaW1lIGhhcyByZWFzb25hYmxlIGdyb3VuZHMgZm9yIHN1c3BlY3RpbmcgYW55IGlsbGVnYWwsIGZyYXVkdWxlbnQgb3IgYWJ1c2l2ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGl2aXR5IG9uIHBhcnQgb2Ygc3VjaCBVc2VyOyBvclxuICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaSBjbGFzc05hbWU9XCJwcml2YWN5LW9yZGVyLWl0ZW1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb2NwcmltZSBiZWxpZXZlcywgaW4gaXRzIHNvbGUgZGlzY3JldGlvbiwgdGhhdCBPdGhlciBQYXJ0aWVzIGFjdGlvbnMgbWF5IGNhdXNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVnYWwgbGlhYmlsaXR5IGZvciBkb2NwcmltZSAob3IgYW55IG9mIGl0cyBhZmZpbGlhdGVzLCBpbmRlcGVuZGVudCBjb250cmFjdG9ycyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXJ2aWNlIHByb3ZpZGVycywgY29uc3VsdGFudHMsIGxpY2Vuc29ycywgYWdlbnRzLCBhbmQgcmVwcmVzZW50YXRpdmVzKSBvciBhcmVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250cmFyeSB0byB0aGUgaW50ZXJlc3RzIG9mIHRoZSBXZWJzaXRlOyBvclxuICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaSBjbGFzc05hbWU9XCJwcml2YWN5LW9yZGVyLWl0ZW1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb2NwcmltZSBpcyByZXF1aXJlZCB0byBkbyBzbyBieSBsYXc7IG9yXG4gICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpIGNsYXNzTmFtZT1cInByaXZhY3ktb3JkZXItaXRlbVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFRoZSBwcm92aXNpb24gb2YgdGhlIFNlcnZpY2VzIHRvIHRoZSBnZW5lcmFsIHB1YmxpYywgaXMgaW4gZG9jcHJpbWXigJlzIG9waW5pb24sIG5vXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9uZ2VyIGNvbW1lcmNpYWxseSB2aWFibGU7IG9yXG4gICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpIGNsYXNzTmFtZT1cInByaXZhY3ktb3JkZXItaXRlbVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvY3ByaW1lIGhhcyBlbGVjdGVkIHRvIGRpc2NvbnRpbnVlLCB3aXRoIG9yIHdpdGhvdXQgcmVhc29uLCBhY2Nlc3MgdG8gdGhlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgV2Vic2l0ZSBvciB0aGUgU2VydmljZXMgKG9yIGFueSBwYXJ0IHRoZXJlb2YpLlxuICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaSBjbGFzc05hbWU9XCJwcml2YWN5LW9yZGVyLWl0ZW1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb2NwcmltZSBiZWxpZXZlcyBpbiBpdHMgc29sZSBkaXNjcmV0aW9uIHRoYXQgVXNlcuKAmXMgYWN0aW9ucyBtYXkgY2F1c2UgbGVnYWwgbGlhYmlsaXR5XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIHN1Y2ggVXNlciwgb3RoZXIgVXNlcnMgb3IgZm9yIGRvY3ByaW1lIG9yIGFyZSBjb250cmFyeSB0byB0aGUgaW50ZXJlc3RzIG9mIHRoZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFdlYnNpdGUuXG4gICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpIGNsYXNzTmFtZT1cInByaXZhY3ktb3JkZXItaXRlbVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE9uY2UgdGVtcG9yYXJpbHkgc3VzcGVuZGVkLCBpbmRlZmluaXRlbHkgc3VzcGVuZGVkIG9yIHRlcm1pbmF0ZWQsIHRoZSBVc2VyIG1heVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vdCBjb250aW51ZSB0byB1c2UgdGhlIFdlYnNpdGUgdW5kZXIgdGhlIHNhbWUgYWNjb3VudCwgYSBkaWZmZXJlbnQgYWNjb3VudCBvclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlLXJlZ2lzdGVyIHVuZGVyIGEgbmV3IGFjY291bnQuIE9uIHRlcm1pbmF0aW9uIG9mIGFuIGFjY291bnQgZHVlIHRvIHRoZSByZWFzb25zXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVudGlvbmVkIGhlcmVpbiwgc3VjaCBVc2VyIHNoYWxsIG5vIGxvbmdlciBoYXZlIGFjY2VzcyB0byBkYXRhLCBtZXNzYWdlcywgZmlsZXNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbmQgb3RoZXIgbWF0ZXJpYWwga2VwdCBvbiB0aGUgV2Vic2l0ZSBieSBzdWNoIFVzZXIuIFRoZSBVc2VyIHNoYWxsIGVuc3VyZSB0aGF0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGUvc2hlL2l0IGhhcyBjb250aW51b3VzIGJhY2t1cCBvZiBhbnkgbWVkaWNhbCBzZXJ2aWNlcyB0aGUgVXNlciBoYXMgcmVuZGVyZWQgaW5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcmRlciB0byBjb21wbHkgd2l0aCB0aGUgVXNlcuKAmXMgcmVjb3JkIGtlZXBpbmcgcHJvY2VzcyBhbmQgcHJhY3RpY2VzXG4gICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpIGNsYXNzTmFtZT1cInByaXZhY3ktb3JkZXItaXRlbVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFRoZSByaWdodCB0byB0ZXJtaW5hdGUvIHN1c3BlbmQgdGhlIGFjY291bnQgaXMgaW4gYWRkaXRpb24gdG8sIGFuZCB3aXRob3V0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJlanVkaWNlIHRvLCBkb2NwcmltZeKAmXMgcmlnaHQgdG8gaW5pdGlhdGUgYWN0aW9uIGFnYWluc3QgYSBVc2VyIChvciBPdGhlciBQYXJ0aWVzKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbiBhY2NvcmRhbmNlIHdpdGggYXBwbGljYWJsZSBsYXcuXG4gICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L29sPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj5Gb3JjZSBNYWpldXJlOjwvc3Bhbj4gT3RoZXIgUGFydGllcyBhY2NlcHQgYW5kIGFja25vd2xlZGdlIHRoYXQgZG9jcHJpbWUgc2hhbGwgbm90IGJlIGxpYWJsZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgYW55IGxvc3Mgb3IgZGFtYWdlIGNhdXNlZCB0byB0aGUgVXNlciBhcyBhIHJlc3VsdCBvZiBkZWxheSBvciBkZWZhdWx0IG9yIGRlZmljaWVuY3lcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3IgZmFpbHVyZSBpbiB0aGUgU2VydmljZXMgYXMgYSByZXN1bHQgb2YgYW55IG5hdHVyYWwgZGlzYXN0ZXJzLCBmaXJlLCByaW90cywgY2l2aWxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzdHVyYmFuY2VzLCBhY3Rpb25zIG9yIGRlY3JlZXMgb2YgZ292ZXJubWVudGFsIGJvZGllcywgY29tbXVuaWNhdGlvbiBsaW5lIGZhaWx1cmVzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICh3aGljaCBhcmUgbm90IGNhdXNlZCBkdWUgdG8gdGhlIGZhdWx0IG9mIGRvY3ByaW1lIG9yIHRoZSBUaGlyZCBQYXJ0eSBTZXJ2aWNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFByb3ZpZGVycyksIG9yIGFueSBvdGhlciBkZWxheSBvciBkZWZhdWx0IG9yIGRlZmljaWVuY3kgb3IgZmFpbHVyZSB3aGljaCBhcmlzZXMgZnJvbVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXVzZXMgYmV5b25kIGRvY3ByaW1l4oCZcyByZWFzb25hYmxlIGNvbnRyb2wgKOKAnEZvcmNlIE1hamV1cmUgRXZlbnTigJ0pLiBJbiB0aGUgZXZlbnQgb2ZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYW55IEZvcmNlIE1hamV1cmUgRXZlbnQgYXJpc2luZywgZG9jcHJpbWUsIGRlcGVuZGluZyBvbiB3aG9zZSBwZXJmb3JtYW5jZSBoYXMgYmVlblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbXBhY3RlZCB1bmRlciB0aGUgVGVybXMgb2YgVXNlLCBzaGFsbCBpbW1lZGlhdGVseSBnaXZlIG5vdGljZSB0byB0aGUgT3RoZXIgUGFydHkocylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb2YgdGhlIGZhY3RzIHdoaWNoIGNvbnN0aXR1dGUgdGhlIEZvcmNlIE1hamV1cmUgRXZlbnQuXG4gICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+R292ZXJuaW5nIExhdyBhbmQgRGlzcHV0ZSBSZXNvbHV0aW9uOjwvc3Bhbj4gVGhlc2UgVGVybXMgb2YgVXNlIGFuZCBhbnkgY29udHJhY3R1YWxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JsaWdhdGlvbiBiZXR3ZWVuIHRoZSBQYXJ0aWVzIHdpbGwgYmUgZ292ZXJuZWQgYnkgdGhlIGxhd3Mgb2YgSW5kaWEsIHdpdGhvdXQgcmVmZXJlbmNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvIHRoZSBjb25mbGljdCBvZiBsYXdzIHByaW5jaXBsZXMuIEFueSBsZWdhbCBhY3Rpb24gb3IgcHJvY2VlZGluZyByZWxhdGVkIHRvIE90aGVyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFBhcnR5KHMpIGFjY2VzcyB0bywgb3IgdXNlIG9mLCB0aGUgV2Vic2l0ZSBvciB0aGVzZSBUZXJtcyBvZiBVc2Ugc2hhbGwgYmUgc3ViamVjdCB0byB0aGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXhjbHVzaXZlIGp1cmlzZGljdGlvbiBvZiB0aGUgY291cnRzIGF0IEd1cnVncmFtLlxuICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPlN1cnZpdmFsOjwvc3Bhbj4gRXZlbiBhZnRlciB0ZXJtaW5hdGlvbiwgY2VydGFpbiB0ZXJtcy9vYmxpZ2F0aW9ucyBtZW50aW9uZWQgdW5kZXIgdGhlc2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgVGVybXMgb2YgVXNlIHN1Y2ggYXMgTGlhYmlsaXR5LCBJbmRlbW5pdHksIEludGVsbGVjdHVhbCBQcm9wZXJ0eSwgRGlzcHV0ZSBSZXNvbHV0aW9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNoYWxsIGNvbnRpbnVlIGFuZCBzdXJ2aXZlIHRlcm1pbmF0aW9uLlxuICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPlNldmVyYWJpbGl0eTo8L3NwYW4+IElmIGFueSBwcm92aXNpb24gb2YgdGhlc2UgVGVybXMgb2YgVXNlIGlzIGRlZW1lZCBpbnZhbGlkLCB1bmxhd2Z1bCwgdm9pZCBvclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgYW55IG90aGVyIHJlYXNvbiB1bmVuZm9yY2VhYmxlLCB0aGVuIHRoYXQgcHJvdmlzaW9uIHNoYWxsIGJlIGRlZW1lZCBzZXZlcmFibGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnJvbSB0aGVzZSBUZXJtcyBvZiBVc2UgYW5kIHNoYWxsIG5vdCBhZmZlY3QgdGhlIHZhbGlkaXR5IGFuZCBlbmZvcmNlYWJpbGl0eSBvZiBhbnkgb2ZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhlIHJlbWFpbmluZyBwcm92aXNpb25zLlxuICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPldhaXZlcjo8L3NwYW4+IE5vIHByb3Zpc2lvbiBvZiB0aGVzZSBUZXJtcyBvZiBVc2Ugc2hhbGwgYmUgZGVlbWVkIHRvIGJlIHdhaXZlZCBhbmQgbm9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWNoIGV4Y3VzZWQsIHVubGVzcyBzdWNoIHdhaXZlciBvciBjb25zZW50IHNoYWxsIGJlIGluIHdyaXRpbmcgYW5kIHNpZ25lZCBieVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb2NwcmltZS4gQW55IGNvbnNlbnQgYnkgZG9jcHJpbWUgdG8sIG9yIGEgd2FpdmVyIGJ5IGRvY3ByaW1lIG9mIGFueSBicmVhY2ggYnkgT3RoZXJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUGFydGllcywgd2hldGhlciBleHByZXNzZWQgb3IgaW1wbGllZCwgc2hhbGwgbm90IGNvbnN0aXR1dGUgY29uc2VudCB0bywgd2FpdmVyIG9mLCBvclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBleGN1c2UgZm9yIGFueSBvdGhlciBkaWZmZXJlbnQgb3Igc3Vic2VxdWVudCBicmVhY2guXG4gICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+SGVhZGluZ3M6PC9zcGFuPiBUaGUgaGVhZGluZ3MgYW5kIHN1YmhlYWRpbmdzIGhlcmVpbiBhcmUgaW5jbHVkZWQgZm9yIGNvbnZlbmllbmNlIGFuZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZGVudGlmaWNhdGlvbiBvbmx5IGFuZCBhcmUgbm90IGludGVuZGVkIHRvIGRlc2NyaWJlLCBpbnRlcnByZXQsIGRlZmluZSBvciBsaW1pdCB0aGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2NvcGUsIGV4dGVudCBvciBpbnRlbnQgb2YgdGhlc2UgVGVybXMgb2YgVXNlLlxuICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPkdyaWV2YW5jZSBPZmZpY2VyIGFuZCBDb250YWN0IHVzPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBJZiBhbnkgVXNlci9Zb3UgaGF2ZSBhbnkgZ3JpZXZhbmNlLCBjb21tZW50LCBxdWVzdGlvbiBvciBzdWdnZXN0aW9uIHJlZ2FyZGluZyBhbnkgb2ZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3VyIFNlcnZpY2VzIG9yIHRoZSBXZWJzaXRlIG9yIGFueXRoaW5nIHJlbGF0ZWQgdG8gYW55IG9mIHRoZSBmb3Jnb2luZywgcGxlYXNlIGNvbnRhY3RcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXMgYXRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSW4gYWNjb3JkYW5jZSB3aXRoIHRoZSBJbmZvcm1hdGlvbiBUZWNobm9sb2d5IEFjdCwgMjAwMCwgYW5kIHRoZSBydWxlcyBtYWRlIHRoZXJlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVuZGVyLCBpZiB5b3UgaGF2ZSBhbnkgZ3JpZXZhbmNlIHdpdGggcmVzcGVjdCB0byB0aGUgV2Vic2l0ZSBvciB0aGUgc2VydmljZSwgaW5jbHVkaW5nXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFueSBkaXNjcmVwYW5jaWVzIGFuZCBncmlldmFuY2VzIHdpdGggcmVzcGVjdCB0byBwcm9jZXNzaW5nIG9mIGluZm9ybWF0aW9uLCB5b3UgY2FuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRhY3Qgb3VyIEdyaWV2YW5jZSBPZmZpY2VyIGF0OlxuICAgICAgICAgICAgICAgPHA+TmFtZTogUmFqZW5kcmEgUHJhc2FkPC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cD5EZXNpZ25hdGlvbjogU2VuaW9yIE1hbmFnZXI8L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwPkVtYWlsOiByYWplbmRyYUBkb2NwcmltZS5jb208L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvb2w+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93IGRvY3Rvci10ZXJtcy1yb3dcIiBoaWRkZW49e3RoaXMuc3RhdGUuc2VsZWN0ZWQgPT0gMH0+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLTEyIHByaXZhY3ktZGVzYy1kaXZcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInByaXZhY3ktZGVzYy1oZWFkaW5nIG1yYi0yMFwiPlRFUk1TIEFORCBDT05ESVRJT05TIEZPUiBFTVBBTkVMTUVOVCBPRiBIT1NQSVRBTFMvRElBR05PU1RJQyBDRU5URVJTL0NMSU5JQ1MvRE9DVE9SUzwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInByaXZhY3ktZGVzY1wiPlRoaXMgYWdyZWVtZW50IHNldHMgZm9ydGggdGhlIHRlcm1zIGFuZCBjb25kaXRpb25zIHRoYXQgYXBwbHkgdG8gdGhlIGVtcGFuZWxtZW50IG9mIEhvc3BpdGFscy9EaWFnbm9zdGljIGNlbnRlcnMvQ2xpbmljcy9Eb2N0b3JzICjigJxIZWFsdGggU2VydmljZSBwcm92aWRlci9IU0LigJ0pIHRvIHByb3ZpZGUgYWNjZXNzIHRvIGhlYWx0aCBjYXJlIHNlcnZpY2VzIGJ5IGRpc3NlbWluYXRpbmcgaGVhbHRoY2FyZSBpbmZvcm1hdGlvbiBhbmQgZGF0YSBpbiBhbiB1bmJpYXNlZCBtYW5uZXIgdW5kZXIgaXRzIHNjb3BlIG9mIGxpY2Vuc3VyZSBvciBhY2NyZWRpdGF0aW9uIChTZXJ2aWNlcykgdG8gdGhlIHVzZXJzL2N1c3RvbWVycyBvZiB0aGlzIFdlYnNpdGUgYW5kIGl0cyBNb2JpbGUgQXBwbGljYXRpb24gKGNvbGxlY3RpdmVseSBiZSByZWZlcnJlZCB0byBhcyDigJxXZWJzaXRl4oCdKSwgd2hpY2ggaXMgbWFuYWdlZCBhbmQgb3BlcmF0ZWQgYnkgUGFuYWNlYSBUZWNobm8gU2VydmljZXMgUHJpdmF0ZSBMaW1pdGVkICjigJxDb21wYW554oCdKS4gWW91IHVuZGVyc3RhbmQgYW5kIGFncmVlIHRoYXQgQ29tcGFueSByZXNlcnZlcyB0aGUgcmlnaHQgdG8gZW5yb2xsLyBhcHBvaW50IG90aGVyIGhlYWx0aCBzZXJ2aWNlIHByb3ZpZGVycyBmb3Igc2ltaWxhciBzZXJ2aWNlcyBhcyBlbnZpc2FnZWQgaGVyZWluIGFuZCB5b3Ugc2hhbGwgaGF2ZSBubyBvYmplY3Rpb24gZm9yIHRoZSBzYW1lIGFuZCB2aWNlLXZlcnNhLjwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInByaXZhY3ktZGVzY1wiPlRoaXMgZG9jdW1lbnQvYWdyZWVtZW50IGlzIGFuIGVsZWN0cm9uaWMgcmVjb3JkIGluIHRlcm1zIG9mIEluZm9ybWF0aW9uIFRlY2hub2xvZ3kgQWN0LCAyMDAwIGFuZCBnZW5lcmF0ZWQgYnkgYSBjb21wdXRlciBzeXN0ZW0gYW5kIGRvZXMgbm90IHJlcXVpcmUgYW55IHBoeXNpY2FsIG9yIGRpZ2l0YWwgc2lnbmF0dXJlcy4gVGhpcyBkb2N1bWVudCBpcyBwdWJsaXNoZWQgaW4gYWNjb3JkYW5jZSB3aXRoIHRoZSBwcm92aXNpb25zIG9mIFJ1bGUgMyBvZiB0aGUgSW5mb3JtYXRpb24gVGVjaG5vbG9neSAoSW50ZXJtZWRpYXJpZXMgZ3VpZGVsaW5lcykgMjAxMSwgdGhhdCBwcm92aWRlcyBmb3IgdGhlIGR1ZSBkaWxpZ2VuY2UgdG8gYmUgZXhlcmNpc2VkIGZvciB0aGUgYWNjZXNzIG9yIHVzYWdlIG9mIHRoaXMgV2Vic2l0ZS48L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJwcml2YWN5LWRlc2NcIj5QTEVBU0UgUkVBRCBUSEVTRSBURVJNUyBBTkQgQ09ORElUSU9OUyBDQVJFRlVMTFkuIFlPVVIgQUNDRVBUQU5DRSBPRiBURVJNUyBDT05UQUlORUQgSEVSRUlOIENPTlNUSVRVVEVTIFRIRSBBR1JFRU1FTlQgQkVUV0VFTiBZT1UgQU5EIENPTVBBTlkgRk9SIFRIRSBQVVJQT1NFIEFTIERFRklOREVEIEhFUkVVTkRFUi48L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJwcml2YWN5LWRlc2Mtc3ViaGVhZGluZ1wiPjEuJm5ic3A7Jm5ic3A7Jm5ic3A7Jm5ic3A7U0NPUEUgQU5EIFBVUlBPU0U8L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICA8b2wgY2xhc3NOYW1lPVwicHJpdmFjeS1saXN0LWdyb3VwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpIGNsYXNzTmFtZT1cInByaXZhY3ktbGlzdC1pdGVtXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEhlYWx0aCBTZXJ2aWNlIFByb3ZpZGVyIGlzIGRlc2lyb3VzIGFuZCBoYWQgYXBwcm9hY2hlZCB0aGUgQ29tcGFueSB0byBkaXNwbGF5L2xpc3QgdGhlIGluZm9ybWF0aW9uIHBlcnRhaW5pbmcgdG8gdGhlIEhlYWx0aCBTZXJ2aWNlIFByb3ZpZGVyIG9uIHRoZSBXZWJzaXRlIHRvIGRpc3NlbWluYXRlIGluZm9ybWF0aW9uIHJlZ2FyZGluZyB0aGUgYXZhaWxhYmlsaXR5IG9mIG1lZGljYWwvaGVhbHRoIGZhY2lsaXRpZXMgd2l0aCB0aGUgSGVhbHRoIFNlcnZpY2UgUHJvdmlkZXIgdG8gdGhlIHByb3NwZWN0aXZlIHVzZXJzL2N1c3RvbWVycyBvZiB0aGUgV2Vic2l0ZSBhbmQgdG8gcmVuZGVyIG1lZGljYWwvaGVhbHRoIGNhcmUgc2VydmljZXMgdG8gdGhlIGN1c3RvbWVycyBvZiB0aGUgQ29tcGFueSB3aG8gYXJlIGRlc2lyb3VzIG9mIGF2YWlsaW5nIHN1Y2ggbWVkaWNhbCBiZW5lZml0cyB0aHJvdWdoIHRoZSBXZWJzaXRlLlxuICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGkgY2xhc3NOYW1lPVwicHJpdmFjeS1saXN0LWl0ZW1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUGFydGllcyBhZ3JlZSB0aGF0IENvbXBhbnkgc2hhbGwgcHJvdmlkZSB0aGUgY3VzdG9tZXIgZGV0YWlscyBvZiBzdWNoIGN1c3RvbWVycyB3aG8gaGF2ZSBleHByZXNzZWQgdG8gYXZhaWwgdGhlIHNlcnZpY2VzIG9mIHRoZSBIZWFsdGggU2VydmljZSBQcm92aWRlciBzdWNoIGFzIGJ5IGJvb2tpbmcgYW4gb25saW5lIGNvbnN1bHRhdGlvbiwgdGhyb3VnaCB0aGUgZGVzaWduYXRlZCB3ZWJzaXRlIG9mIHRoZSBDb21wYW55LlxuICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGkgY2xhc3NOYW1lPVwicHJpdmFjeS1saXN0LWl0ZW1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRm9yIGFsbCBjdXN0b21lcnMgcmVmZXJyZWQgYnkgdGhlIENvbXBhbnksIENvbXBhbnkgc2hhbGwgYmUgZW50aXRsZWQgdG8gc2VuZCBpbmZvcm1hdGlvbiB0aHJvdWdoIFNNUyBvciBFLU1haWwgdG8gdGhlIFNQT0Mgb2YgU2VydmljZSBQcm92aWRlci5cbiAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpIGNsYXNzTmFtZT1cInByaXZhY3ktbGlzdC1pdGVtXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIElmIGFueSBzZXJ2aWNlcywgZnVuY3Rpb25zIG9yIHJlc3BvbnNpYmlsaXRpZXMgbm90IHNwZWNpZmljYWxseSBkZXNjcmliZWQgaGVyZWluIG9yIGluIGFueSByZWxhdGVkIGRvY3VtZW50cyBidXQgYXJlIGluaGVyZW50LCBuZWNlc3Nhcnkgb3IgY3VzdG9tYXJ5IHBhcnQgb2YgdGhlIHNlcnZpY2VzIG9yIGFyZSByZWFzb25hYmx5IHJlcXVpcmVkIGZvciBwcm9wZXIgcGVyZm9ybWFuY2Ugb2YgdGhlIFNlcnZpY2VzIGluIGFjY29yZGFuY2Ugd2l0aCB0aGUgQWdyZWVtZW50LCB0aGV5IHNoYWxsIGJlIGRlZW1lZCB0byBiZSBpbmNsdWRlZCB3aXRoaW4gdGhlIFNjb3BlIG9mIFNlcnZpY2VzIGFzIGlmIHN1Y2ggc2VydmljZXMsIGZ1bmN0aW9ucyBvciByZXNwb25zaWJpbGl0aWVzIHdlcmUgc3BlY2lmaWNhbGx5IGRlc2NyaWJlZCBpbiB0aGlzIEFncmVlbWVudC5cbiAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L29sPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwicHJpdmFjeS1kZXNjLXN1YmhlYWRpbmdcIj4yLiZuYnNwOyZuYnNwOyZuYnNwOyZuYnNwO09CTElHQVRJT05TIE9GIFRIRSBTRVJWSUNFIFBST1ZJREVSPC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgPG9sIGNsYXNzTmFtZT1cInByaXZhY3ktbGlzdC1ncm91cFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaSBjbGFzc05hbWU9XCJwcml2YWN5LWxpc3QtaXRlbVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBUaGlzIEFncmVlbWVudCBpcyBiZXR3ZWVuIHRoZSBIZWFsdGggU2VydmljZSBQcm92aWRlciBhbmQgdGhlIENvbXBhbnkuIEhvd2V2ZXIsIGl0IHdvdWxkIGJlIGFwcGxpY2FibGUgdG8gYWxsIHNwZWNpYWx0aWVzIG9mZmVyZWQgYnkgPHNwYW4+U2VydmljZSBQcm92aWRlciBHcm91cCBvZiBIb3NwaXRhbHMvIGRpYWdub3N0aWMgY2VudGVycy9DbGluaWNzLDwvc3Bhbj4gYXMgbWF5IGJlIGFwcGxpY2FibGUsIGFuZCBhcyBwcm92aWRlZCBieSB0aGUgSGVhbHRoIFNlcnZpY2UgUHJvdmlkZXIgZnJvbSB0aW1lIHRvIHRpbWUuXG4gICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaSBjbGFzc05hbWU9XCJwcml2YWN5LWxpc3QtaXRlbVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBUaGUgZW1wYW5lbGxlZCBIZWFsdGggU2VydmljZSBQcm92aWRlciBpcyBleHBlY3RlZCB0byBwcm92aWRlIGl0cyBTZXJ2aWNlcyBhcyBwZXIgdGhlIGluZHVzdHJ5IHN0YW5kYXJkcyBhbmQgaW4gYSBwcm9mZXNzaW9uYWwgJmFtcDsgZXRoaWNhbCBtYW5uZXIuXG4gICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaSBjbGFzc05hbWU9XCJwcml2YWN5LWxpc3QtaXRlbVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBIZWFsdGggU2VydmljZSBQcm92aWRlciBtYXkgc2V0LXVwIGEgc2VwYXJhdGUgQ29tcGFueeKAmXMg4oCcQ28tb3JkaW5hdGlvbiBEZXNr4oCdIHJvdW5kIHRoZSBjbG9jayBpbiB0aGUgSGVhbHRoIFNlcnZpY2UgUHJvdmlkZXIgUHJlbWlzZXMsIGFzIG1heSBiZSBtdXR1YWxseSBhZ3JlZWQgd2l0aCB0aGUgQ29tcGFueS5cbiAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpIGNsYXNzTmFtZT1cInByaXZhY3ktbGlzdC1pdGVtXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEhlYWx0aCBTZXJ2aWNlIFByb3ZpZGVyIHNoYWxsIG5vdGlmeSBhbmQgc2hhcmUgd2l0aCB0aGUgQ29tcGFueSB0aGUgY29zdC9yYXRlIGxpc3QgZGV0YWlsaW5nIHRoZSBjb3N0cyBvZiBlYWNoIG1lZGljYWwgdHJlYXRtZW50IGFuZCBwcm9jZWR1cmVzLCB3aGljaCBjYW4gYmUgc3VpdGFibHkgZGlzcGxheWVkIG9uIHRoZSB3ZWJzaXRlIG9mIHRoZSBDb21wYW55LiBJbiBjYXNlIG9mIGFueSBjaGFuZ2VzL21vZGlmaWNhdGlvbiB0byBzdWNoIGNvc3RzL3JhdGVzIHRoZSBTZXJ2aWNlIFByb3ZpZGVyIHNoYWxsIG5vdGlmeSB0aGUgc2FtZSB3aXRoaW4gMih0d28pIGRheXMgcHJpb3IgdG8gc3VjaCBjaGFuZ2VzIGFyZSB0byBiZSBtYWRlIGVmZmVjdGl2ZS5cbiAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpIGNsYXNzTmFtZT1cInByaXZhY3ktbGlzdC1pdGVtXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEhlYWx0aCBTZXJ2aWNlIFByb3ZpZGVyIGFncmVlcyB0byBwcm92aWRlIHRoZSBTZXJ2aWNlcyB0byB0aGUgY3VzdG9tZXJzIG9mIHRoZSBDb21wYW55IHdpdGggdGhlIHNhbWUgZGVncmVlIG9mIGNhcmUgYW5kIHNraWxsIGFzIGN1c3RvbWFyaWx5IHByb3ZpZGVkIHRvIGl0cyBvd24gcGF0aWVudHMgd2hvIGFyZSBub3QgY3VzdG9tZXJzIG9mIHRoZSBDb21wYW55LCBpLmUuIGFjY29yZGluZyB0byBnZW5lcmFsbHkgYWNjZXB0ZWQgc3RhbmRhcmRzIG9mIHByYWN0aWNlIGluY2x1ZGluZyBtZWRpY2FsIHByb2Zlc3Npb24gaW4gSW5kaWEuXG4gICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaSBjbGFzc05hbWU9XCJwcml2YWN5LWxpc3QtaXRlbVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBIZWFsdGggU2VydmljZSBQcm92aWRlciBhZ3JlZXMgbm90IHRvIGRpc2NyaW1pbmF0ZSBhZ2FpbnN0IGN1c3RvbWVycyBvZiB0aGUgQ29tcGFueSBvbiB0aGUgYmFzaXMgb2YgcmFjZSwgZXRobmljaXR5LCBnZW5kZXIsIGNyZWVkLCBhbmNlc3RyeSwgbGF3ZnVsIG9jY3VwYXRpb24sIGFnZSwgcmVsaWdpb24sIG1hcml0YWwgc3RhdHVzLCBzZXh1YWwgb3JpZW50YXRpb24sIG1lbnRhbCBvciBwaHlzaWNhbCBkaXNhYmlsaXR5LCBtZWRpY2FsIGhpc3RvcnksIGNvbG9yLCBuYXRpb25hbCBvcmlnaW4sIHBsYWNlIG9mIHJlc2lkZW5jZSwgaGVhbHRoIHN0YXR1cywgb3IgYW55IG90aGVyIGdyb3VuZHMgcHJvaGliaXRlZCBieSBsYXcuXG4gICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaSBjbGFzc05hbWU9XCJwcml2YWN5LWxpc3QtaXRlbVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBIZWFsdGggU2VydmljZSBQcm92aWRlciBhbHNvIGFncmVlcyB0byBhbGxvdyBDb21wYW55IHRvIGF1ZGl0IHRoZSByZWxldmFudCBiaWxscy8gZG9jdW1lbnRzIHBlcnRhaW5pbmcgdG8gdGhpcyBBZ3JlZW1lbnQ7IGFzIGFuZCB3aGVuIHJlcXVlc3RlZCBieSB0aGUgQ29tcGFueS4gU3VjaCBhdWRpdGluZyBzaGFsbCBiZSBzY2hlZHVsZWQgbXV0dWFsbHkgYmV0d2VlbiB0aGUgcGFydGllcy5cbiAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpIGNsYXNzTmFtZT1cInByaXZhY3ktbGlzdC1pdGVtXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEhlYWx0aCBTZXJ2aWNlIFByb3ZpZGVyIHNoYWxsIGVuc3VyZSB0aGF0IHRoZSBpbmZvcm1hdGlvbiBwcm92aWRlZCB0byB0aGUgQ29tcGFueSBmb3IgZGlzcGxheSBvbiBpdHMgV2Vic2l0ZSBzaGFsbCBiZSB1cCB0byBkYXRlZCwgdHJ1ZSBhbmQgY29ycmVjdC4gSW4gdGhpcyBjb250ZXh0LCBoZWFsdGggU2VydmljZSBQcm92aWRlciB3aWxsIG5vdCBob2xkIHRoZSBDb21wYW55IChpbmNsdWRpbmcgaXRzIGFmZmlsaWF0ZWQgY29tcGFuaWVzL2dyb3VwIGNvbXBhbmllcyBhbmQgcmVsYXRlZCB3ZWJzaXRlcykgbGlhYmxlIGZvciBhbnkgaW5mb3JtYXRpb24gcmVsaWVkIHVwb24gYnkgQ29tcGFueSBhcyBwcm92aWRlZCBieSB0aGUgSGVhbHRoIFNlcnZpY2UgUHJvdmlkZXIuXG4gICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaSBjbGFzc05hbWU9XCJwcml2YWN5LWxpc3QtaXRlbVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBIZWFsdGggU2VydmljZSBQcm92aWRlciBhdXRob3JpemVzIENvbXBhbnkgdG8gY29sbGVjdCBhbmQgcmVjZWl2ZSBtb25pZXMgdG93YXJkcyB0aGUgYW1vdW50cyBwYXlhYmxlIGJ5IHRoZSBjdXN0b21lciBmb3IgdGhlIHNlcnZpY2VzIGF2YWlsZWQsIG9uIGJlaGFsZiBvZiB0aGUgU2VydmljZSBQcm92aWRlci4gRnVydGhlciwgc2V0dGxlbWVudCBvZiBtb25pZXMgdG8gdGhlIFNlcnZpY2UgUHJvdmlkZXIgc2hhbGwgYmUgaW4gYWNjb3JkYW5jZSB3aXRoIHRoZSB0ZXJtcyBhcyBtdXR1YWxseSBhZ3JlZWQgYmV0d2VlbiB0aGUgcGFydGllcy4gQWxsIHNldHRsZW1lbnRzIGZvciB0aGUgcHJlY2VkaW5nIG1vbnRoIHNoYWxsIGJlIG1hZGUgd2l0aGluIDYwKHNpeHR5KSBkYXlzIGZyb20gdGhlIHN1Y2NlZWRpbmcgbW9udGggZHVyaW5nIHdoaWNoIHRoZSBpbnZvaWNlIGlzIHJhaXNlZCBieSB0aGUgU2VydmljZSBQcm92aWRlci4gSW4gdGhpcyByZWdhcmQsIHRoZSBTZXJ2aWNlIFByb3ZpZGVyIHNoYWxsIHJhaXNlIHRoZSBpbnZvaWNlIG9uIG9yIGJlZm9yZSB0aGUgN3RoIGRheSBvZiB0aGUgc3VjY2Vzc2l2ZSBtb250aCBmb3IgdGhlIHNldHRsZW1lbnQgb2YgcHJlY2VkaW5nIG1vbnRoLlxuICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGkgY2xhc3NOYW1lPVwicHJpdmFjeS1saXN0LWl0ZW1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgVGhlIEhlYWx0aCBTZXJ2aWNlIFByb3ZpZGVyIHNoYWxsIGJlIHNvbGVseSByZXNwb25zaWJsZSBmb3IgYW55IG1pc2NvbmR1Y3QsIGRhbWFnZSwgd2lsbGZ1bGwgY29tbWlzc2lvbiBvciBvbWlzc2lvbiBvZiBhbnkgc2VydmljZXMgd2hpY2ggYXJlIG5vdCBsaXN0ZWQgdW5kZXIgdGhlc2UgVGVybXMgJmFtcDsgQ29uZGl0aW9ucyBvciBhbnl0aGluZyB3aGljaCBnb2VzIGFnYWluc3QgdGhlIHNwaXJpdCBvZiBmcmVlLCBmYWlyIGFuZCBldGhpY2FsIHByYWN0aWNlIG9mIHBhdGllbnQgY2FyZS5cbiAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpIGNsYXNzTmFtZT1cInByaXZhY3ktbGlzdC1pdGVtXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPkNvbmZpZGVudGlhbGl0eSA6PC9zcGFuPiBUaGUgSGVhbHRoIFNlcnZpY2UgUHJvdmlkZXIgdW5kZXJ0YWtlcyB0byBtYWludGFpbiBpbiBhYnNvbHV0ZSBjb25maWRlbmNlIGFuZCBub3QgdG8gcmV2ZWFsIHRvIGFueSBwZXJzb24gb3IgYm9keSwgYW55IGluZm9ybWF0aW9uIG9yIGRhdGEgd2hpY2ggaXQgcmVjZWl2ZXMgdGhyb3VnaCBhbmQgc3Vic2VxdWVudCBmb3IgcHJvdmlkaW5nIHRoZSBTZXJ2aWNlcyBwdXJzdWFudCB0byB0aGlzIGFncmVlbWVudCBhbmQgd2hpY2ggcGVydGFpbnM7IGRpcmVjdGx5IG9yIGluZGlyZWN0bHk7IHRvIHRoZSBDb21wYW55IG9yIGl0cyBjdXN0b21lcnMsIGluY2x1ZGluZyB0aGUgYW5kIHdpdGhvdXQgZGVyb2dhdGluZyBmcm9tIHRoZSBnZW5lcmFsaXR5IG9mIHRoZSBhZm9yZXNhaWQgbmFtZXMsIGFkZHJlc3NlcywgZGV0YWlscyBhbmQgbWVkaWNhbCBiYWNrZ3JvdW5kIG9mIHRoZSBDb21wYW554oCZcyBjdXN0b21lcnMsIGluZm9ybWF0aW9uIHdoaWNoIHBlcnRhaW5zIHRvIHRoZSBDb21wYW554oCZcyBidXNpbmVzcyAgb3IgYW55IG90aGVyIGRhdGEgd2hpY2ggaXMgcHJvcHJpZXRhcnkgdG8gdGhlIENvbXBhbnkgYW5kIGl0cyBjdXN0b21lcnMuIEl0IGlzIGZ1cnRoZXIgYWdyZWVkIHRoYXQgdGhlIGNvbnRlbnRzIG9mIHRoaXMgc3ViLXNlY3Rpb24gY2Fubm90IGRlcm9nYXRlIGZyb20gdGhlIGR1dHkgb2YgdGhlIEhlYWx0aCBTZXJ2aWNlIFByb3ZpZGVyIGluIHJlcG9ydGluZyB0aGUgQ29tcGFueSBvZiBhbnkgZGF0YSwgaW5mb3JtYXRpb24gb3IgbWVkaWNhbCBiYWNrZ3JvdW5kIHdoaWNoIG1heSBiZSByZWxldmFudCB0byB0aGUgQ29tcGFueSBpbiBkZXRlcm1pbmF0aW9uIG9mIGl0cyBzY29wZSBvZiB3b3JrLiAgVGhlIHRyYW5zZmVyIG9mIGluZm9ybWF0aW9uIHNoYWxsIGJlIGluIGFjY29yZGFuY2UgdG8gdGhlIHByb2NlZHVyZXMgZXN0YWJsaXNoZWQgYnkgdGhlIENvbXBhbnkuIFRoZSBIZWFsdGggU2VydmljZSBQcm92aWRlciBhY2tub3dsZWRnZXMgdGhhdCBpdHMgdW5kZXJ0YWtpbmdzIGdpdmVuIGluIHRoaXMgQWdyZWVtZW50IHdpdGggcmVnYXJkIHRvIHRoZSBjb25maWRlbnRpYWxpdHkgc2hhbGwgYmUgdmFsaWQgdGhyb3VnaG91dCB0aGUgVGVybSBvZiB0aGlzIEFncmVlbWVudCBhbmQgaXQgc2hhbGwgYWJpZGUgYnkgdGhlIHNhbWUgZXZlbiBhZnRlciB0aGUgZXhwaXJ5IG9mIHRoaXMgQWdyZWVtZW50LlxuICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvb2w+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJwcml2YWN5LWRlc2Mtc3ViaGVhZGluZ1wiPjMuJm5ic3A7Jm5ic3A7Jm5ic3A7Jm5ic3A7UkVQUkVTRU5UQVRJT05TIEFORCBERUNMQVJBVElPTlMgQlkgVEhFIFNFUlZJQ0UgUFJPVklERVI8L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICA8b2wgY2xhc3NOYW1lPVwicHJpdmFjeS1saXN0LWdyb3VwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpIGNsYXNzTmFtZT1cInByaXZhY3ktbGlzdC1pdGVtXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFRoZSBIZWFsdGggU2VydmljZSBQcm92aWRlciBkZWNsYXJlcyBhbmQgdW5kZXJ0YWtlcyB0aGF0IGl0IGhhcyBhbGwgdGhlIG5lY2Vzc2FyeSByZWdpc3RyYXRpb25zLyBsaWNlbnNlcy8gYXBwcm92YWxzLyBhdXRob3JpemF0aW9ucyByZXF1aXJlZCBieSB0aGUgbGF3IGluIG9yZGVyIHRvIHByb3ZpZGUgdGhlIG1lZGljYWwgc2VydmljZXMgcHVyc3VhbnQgdG8gdGhpcyBhZ3JlZW1lbnQgYW5kIHRoYXQgaXQgaGFzIGFkZXF1YXRlIGFiaWxpdHksIGtub3dsZWRnZSwgZXhwZXJpZW5jZSBhbmQgZXF1aXBtZW504oCZcyByZXF1aXJlZCBpbiBvcmRlciB0byBwcm92aWRlIHRoZSBzYWlkIHNlcnZpY2UgYXMgcmVxdWlyZWQgaW4gdGhpcyBhZ3JlZW1lbnQuXG4gICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaSBjbGFzc05hbWU9XCJwcml2YWN5LWxpc3QtaXRlbVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBUaGUgSGVhbHRoIFNlcnZpY2UgUHJvdmlkZXIgdW5kZXJ0YWtlcyB0byB1cGhvbGQgYWxsIG9mIHRoZSByZXF1aXJlbWVudHMgb2YgdGhlIGxhdyBhcyBhcHBsaWNhYmxlIHRvIGl0IGZyb20gdGltZSB0byB0aW1lIGFuZCBzaGFsbCBrZWVwIHVwZGF0ZWQgdGhlIENvbXBhbnksIGluIGNhc2Ugb2YgYW55IHNpZ25pZmljYW50IGNoYW5nZSBpbiB0aGUgcHJlc2VudCBzdGF0dXMgb2YgdGhlIFByb3ZpZGVyLiBUaGUgU2VydmljZSBQcm92aWRlciBhbHNvIHVuZGVydGFrZXMgdGhhdCBpdCBzaGFsbCBwcm92aWRlIHRoZSBzYWlkIHNlcnZpY2VzIGluIGFjY29yZGFuY2Ugd2l0aCB0aGUgcHJvdmlzaW9ucyBvZiB0aGUgbGF3IGFuZCB0aGUgcmVndWxhdGlvbnMsIHdoaWNoIGFyZSBlbmFjdGVkLCBmcm9tIHRpbWUgdG8gdGltZSwgYnkgdGhlIGNlbnRyYWwgb3IgdGhlIHN0YXRlIGdvdmVybm1lbnQgb3IgdGhlIGxvY2FsIGFkbWluaXN0cmF0aW9uLyBib2RpZXMuXG4gICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaSBjbGFzc05hbWU9XCJwcml2YWN5LWxpc3QtaXRlbVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBUaGUgSGVhbHRoIFNlcnZpY2UgUHJvdmlkZXIgaGFzIGFuZCB3aWxsIGNvbnRpbnVlIHRvIGhhdmUgaXRzIGZhY2lsaXRpZXMgY292ZXJlZCBieSBwcm9wZXIgaW5kZW1uaXR5IHBvbGljeSwgaW5jbHVkaW5nIGVycm9yLCBvbWlzc2lvbiBhbmQgcHJvZmVzc2lvbmFsIGluZGVtbml0eSBhbmQgYWdyZWVzIHRvIGtlZXAgc3VjaCBwb2xpY2llcyBpbiBmb3JjZSBkdXJpbmcgdGhlIGN1cnJlbmN5IG9mIHRoaXMgQWdyZWVtZW50LlxuICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGkgY2xhc3NOYW1lPVwicHJpdmFjeS1saXN0LWl0ZW1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgVGhlIEhlYWx0aCBTZXJ2aWNlIFByb3ZpZGVyIGRlY2xhcmVzIHRoYXQgaXQgaGFzIG5vdCBiZWVuIHByZXZlbnRlZCBmcm9tIHByYWN0aWNpbmcgbWVkaWNpbmVzIGFuZCB0aGF0IG5vIGNyaW1pbmFsIGNoYXJnZSBvZiBhbnkga2luZCBoYXMgZXZlciBiZWVuIGZpbGVkIGFnYWluc3QgaXQgZHVlIHRvIG1lZGljYWwgbWFscHJhY3RpY2UsIG1lZGljYWwgbmVnbGlnZW5jZSBhbmQvIG9yIG5vIGNpdmlsIGNsYWltIGhhcyBldmVyIGJlZW4gZmlsZWQgYWdhaW5zdCBpdCBkdWUgdG8gZGFtYWdlIGluZmxpY3RlZCBkdXJpbmcgYSBtZWRpY2FsIHRyZWF0bWVudC5cbiAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpIGNsYXNzTmFtZT1cInByaXZhY3ktbGlzdC1pdGVtXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFRoZSBIZWFsdGggU2VydmljZSBQcm92aWRlciBhbHNvIHVuZGVydGFrZXMgdG8gaW5mb3JtIHRoZSBDb21wYW55IGluIHRoZSBldmVudCBvZiBhbnkgY29tcGxhaW50IG9mIG1lZGljYWwgbWFscHJhY3RpY2UgaXMgZmlsZWQgYWdhaW5zdCBpdCBkdXJpbmcgdGhlIGN1cnJlbmN5IG9mIHRoaXMgQWdyZWVtZW50LlxuICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGkgY2xhc3NOYW1lPVwicHJpdmFjeS1saXN0LWl0ZW1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSXQgaGFzIGJlZW4gZHVseSBjb25zdGl0dXRlZCB1bmRlciB0aGUgYXBwbGljYWJsZSBsYXdzIGFuZCBoYXMgY29tcGxpZWQgd2l0aCBhbmQgc2hhbGwgY29udGludWUgdG8gY29tcGx5IHdpdGggdGhlIGFwcGxpY2FibGUgbGF3cy5cbiAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpIGNsYXNzTmFtZT1cInByaXZhY3ktbGlzdC1pdGVtXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEl0IGhhcyB0aGUgcmVxdWlzaXRlIGxpY2Vuc2VzLCBwZXJtaXNzaW9ucywgYXV0aG9yaXphdGlvbnMsIGNvbnNlbnRzLCBhcHByb3ZhbHMgYW5kIHJlZ2lzdHJhdGlvbnMgdW5kZXIgdGhlIGFwcGxpY2FibGUgbGF3cyBhbmQgdGhlIGF1dGhvcml0eSB0byBleGVjdXRlIHRoaXMgQWdyZWVtZW50IGF2YWlsIHRoZSByZXF1aXJlZCBTZXJ2aWNlcyBhbmQgcGVyZm9ybSBpdHMgb2JsaWdhdGlvbnMgaGVyZXVuZGVyLlxuICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGkgY2xhc3NOYW1lPVwicHJpdmFjeS1saXN0LWl0ZW1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTmVpdGhlciB0aGUgZXhlY3V0aW9uIGFuZCBkZWxpdmVyeSBvZiB0aGlzIEFncmVlbWVudCwgdGhlIGNvbnN1bW1hdGlvbiBvZiB0aGUgdHJhbnNhY3Rpb25zIGNvbnRlbXBsYXRlZCBoZXJlYnksIG9yIHRoZSBmdWxmaWxsbWVudCBvZiBvciBjb21wbGlhbmNlIHdpdGggdGhlIHRlcm1zIGFuZCBjb25kaXRpb25zIG9mIHRoaXMgQWdyZWVtZW50LCBjb25mbGljdCB3aXRoIG9yIHJlc3VsdCBpbiBhIGJyZWFjaCBvZiBvciBhIGRlZmF1bHQgdW5kZXIgYW55IG9mIHRoZSB0ZXJtcywgY29uZGl0aW9ucyBvciBwcm92aXNpb25zIG9mIGFueSBsZWdhbCByZXN0cmljdGlvbiAoaW5jbHVkaW5nLCB3aXRob3V0IGxpbWl0YXRpb24sIGFueSBqdWRnbWVudCwgb3JkZXIsIGluanVuY3Rpb24sIGRlY3JlZSBvciBydWxpbmcgb2YgYW55IGNvdXJ0IG9yIGdvdmVybm1lbnRhbCBhdXRob3JpdHksIG9yIGFueSBjZW50cmFsLCBzdGF0ZSwgbG9jYWwgb3Igb3RoZXIgbGF3LCBzdGF0dXRlLCBydWxlIG9yIHJlZ3VsYXRpb24pIG9yIGFueSBjb3ZlbmFudCBvciBhZ3JlZW1lbnQgb3IgaW5zdHJ1bWVudCB0byB3aGljaCBpdCBpcyBhIFBhcnR5LCBvciBieSB3aGljaCBpdCBpcyBib3VuZCwgbm9yIGRvZXMgc3VjaCBleGVjdXRpb24sIGRlbGl2ZXJ5LCBjb25zdW1tYXRpb24gb3IgY29tcGxpYW5jZSB2aW9sYXRlIG9yIHJlc3VsdCBpbiB0aGUgdmlvbGF0aW9uIG9mIGl0cyBjb25zdGl0dXRpb25hbCBkb2N1bWVudHMuXG4gICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9vbD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInByaXZhY3ktZGVzYy1zdWJoZWFkaW5nXCI+NC4mbmJzcDsmbmJzcDsmbmJzcDsmbmJzcDtJTlRFTExFQ1RVQUwgUFJPUEVSVFkgUklHSFRTPC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgPG9sIGNsYXNzTmFtZT1cInByaXZhY3ktbGlzdC1ncm91cFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaSBjbGFzc05hbWU9XCJwcml2YWN5LWxpc3QtaXRlbVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBUaGUgUGFydGllcyBoZXJlYnkgYWNrbm93bGVkZ2UgdGhhdCBlYWNoIFBhcnR5IGlzIHRoZSBsZWdhbCBhbmQgYmVuZWZpY2lhbCBvd25lciBvZiBhbmQgaGFzIGV4Y2x1c2l2ZSByaWdodCwgdGl0bGUgYW5kIGludGVyZXN0IG92ZXIgaXRzIG93biBJbnRlbGxlY3R1YWwgUHJvcGVydHkgYW5kIGFsbCBvdGhlciBwcm9wcmlldGFyeSBpbmZvcm1hdGlvbiBpbiByZWxhdGlvbiB0byBpdHMgYnVzaW5lc3MuIE5vdGhpbmcgaW4gdGhpcyBBZ3JlZW1lbnQgc2hhbGwgYmUgZGVlbWVkIGluIGFueSB3YXkgdG8gY29uc3RpdHV0ZSBhIHRyYW5zZmVyIG9yIGFzc2lnbm1lbnQgb2YgYW55IEludGVsbGVjdHVhbCBQcm9wZXJ0eSBieSBlaXRoZXIgUGFydHkuIEl0IGlzIGZ1cnRoZXIgYWdyZWVkIGFuZCB1bmRlcnN0b29kIGJldHdlZW4gdGhlIFBhcnRpZXMgdGhhdCB0aGUgZGF0YSBhbmQgaW5mb3JtYXRpb24gb2YgdXNlcnMvY3VzdG9tZXJzIHByb2R1Y2VkIHRocm91Z2ggdGhpcyBhZ3JlZW1lbnQgc2hhbGwgam9pbnRseSBvd25lZCBieSB0aGUgSGVhbHRoIFNlcnZpY2UgUHJvdmlkZXIgYW5kIHRoZSBDb21wYW55LlxuICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGkgY2xhc3NOYW1lPVwicHJpdmFjeS1saXN0LWl0ZW1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgVGhlIEhlYWx0aCBTZXJ2aWNlIFByb3ZpZGVyIGhlcmVieSBncmFudHMgdG8gdGhlIENvbXBhbnkgYSBsaW1pdGVkLCBub24tZXhjbHVzaXZlLCBub24tdHJhbnNmZXJhYmxlIHJpZ2h0LCBvbmx5IGZvciB0aGUgVGVybSBvZiB0aGlzIEFncmVlbWVudCwgdG8gdXNlIHRoZSBTZXJ2aWNlIFByb3ZpZGVy4oCZcyBJbnRlbGxlY3R1YWwgUHJvcGVydHksIGluY2x1ZGluZyBpdHMgbWFya3MsIGxvZ29zIGFuZCBicmFuZC90cmFkZSBuYW1lcywgc29sZWx5IGZvciBpbiByZWxhdGlvbiB0byB0aGUgU2VydmljZXMgdG8gYmUgcmVuZGVyZWQgYnkgdGhlIFNlcnZpY2UgUHJvdmlkZXIgaW4gYWNjb3JkYW5jZSB3aXRoIHRoZSB0ZXJtcyBvZiB0aGlzIEFncmVlbWVudC4gU3ViamVjdCB0byB0aGUgY29uZmlkZW50aWFsaXR5IGNsYXVzZSBoZXJlaW4sIHRoZSBDb21wYW55IG1heSBkaXNwbGF5IG9uIGl0cyB3ZWIgcG9ydGFscywgYXQgYWxsIHRpbWVzIGR1cmluZyB0aGUgVGVybSBvZiB0aGlzIEFncmVlbWVudCwgdGhlIEhlYWx0aCBTZXJ2aWNlIFByb3ZpZGVy4oCZcyBtYXJrcywgbG9nbyBhbmQgYnJhbmQvdHJhZGUgbmFtZXMsIGFzIG11dHVhbGx5IGRldGVybWluZWQgaW4gd3JpdGluZyBieSB0aGUgUGFydGllcyBzb2xlbHkgZm9yIHB1cnBvc2VzIHNwZWNpZmllZCBpbiB0aGlzIEFncmVlbWVudC5cbiAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpIGNsYXNzTmFtZT1cInByaXZhY3ktbGlzdC1pdGVtXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEluZm9ybWF0aW9uIGFuZCBkYXRhIG9mIHRoZSBIZWFsdGggU2VydmljZSBQcm92aWRlciBzaGFsbCBiZSBwdWJsaXNoZWQgYnkgdGhlIENvbXBhbnkgZWl0aGVyIGJ5IHJlbHlpbmcgb24gdGhlIGluZm9ybWF0aW9uIHByb3ZpZGVkIGJ5IHRoZSBTZXJ2aWNlIFByb3ZpZGVy4oCZcyBvciBpZiB0YWtlbiBmcm9tIEhlYWx0aCBTZXJ2aWNlIFByb3ZpZGVy4oCZcyB3ZWJzaXRlIHRoZW4gYnkgc2Vla2luZyBwcmlvciB3cml0dGVuIGFwcHJvdmFsIGZyb20gdGhlIEhlYWx0aCBTZXJ2aWNlIFByb3ZpZGVyLlxuICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvb2w+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJwcml2YWN5LWRlc2Mtc3ViaGVhZGluZ1wiPjUuJm5ic3A7Jm5ic3A7Jm5ic3A7Jm5ic3A7SU5ERU1OSVRZPC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwicHJpdmFjeS1kZXNjXCI+VGhlIFNlcnZpY2UgUHJvdmlkZXIgaGVyZWJ5IGNvdmVuYW50cyB0byBpbmRlbW5pZnkgYW5kIGhvbGQgaGFybWxlc3MgQ29tcGFueSwgaXRzIGVtcGxveWVlcywgc2VydmFudHMgYW5kIGFnZW50cyBmcm9tIGFuZCBhZ2FpbnN0IGFsbCBhY3Rpb25zLCBjbGFpbXMsIGRlbWFuZHMsIGxvc3NlcywgZGFtYWdlcywgY29zdHMgYW5kIGV4cGVuc2VzIGZvciB3aGljaCAgQ29tcGFueSBzaGFsbCBvciBtYXkgYmUgb3IgYmVjb21lIGxpYWJsZSBpbiByZXNwZWN0IG9mIGFuZCB0byB0aGUgZXh0ZW50IHRoYXQgdGhleSBhcmlzZSBmcm9tOjwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxvbCBjbGFzc05hbWU9XCJwcml2YWN5LWxpc3QtZ3JvdXBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGkgY2xhc3NOYW1lPVwicHJpdmFjeS1saXN0LWl0ZW1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgVGhlIEhlYWx0aCBTZXJ2aWNlIFByb3ZpZGVyIGNvbW1pdHRpbmcgYW55IGJyZWFjaCBvciBjb250cmF2ZW50aW9uIG9mIHRoZSB0ZXJtcyBhbmQgY29uZGl0aW9ucyBvZiB0aGlzIEFncmVlbWVudCwgaXRzIG9ibGlnYXRpb25zIHVuZGVyIHRoaXMgQWdyZWVtZW50LCBhcHBsaWNhYmxlIExhd3MsIGFwcGxpY2FibGUgcGVybWl0cywgY29kZXMsIG9yZGluYW5jZXMgb3IgcmVndWxhdGlvbnMsIGJ5ZSBsYXdzO1xuICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGkgY2xhc3NOYW1lPVwicHJpdmFjeS1saXN0LWl0ZW1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYW55IGFjdCBvZiBjb21taXNzaW9uIG9yIG9taXNzaW9uLCBvciBkZWZhdWx0IG9uIHRoZSBwYXJ0IG9mIHRoZSBTZXJ2aWNlIFByb3ZpZGVyIGFuZC9vciBpdHMgcGVyc29ubmVsLCByZXByZXNlbnRhdGl2ZXMsIG9mZmljZXJzLCBhZ2VudHMsIGFmZmlsaWF0ZXM7XG4gICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaSBjbGFzc05hbWU9XCJwcml2YWN5LWxpc3QtaXRlbVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGUgbmVnbGlnZW50IHVzZSwgbWlzdXNlLCBieSB0aGUgaGVhbHRoIFNlcnZpY2UgUHJvdmlkZXIgb3IgYW55IG9mIGl0cyBlbXBsb3llZSwgc2VydmFudCwgYWdlbnQsIHdpdGggcmVzcGVjdCB0byB0aGUgbWVkaWNhbCBzZXJ2aWNlcyBwcm92aWRlZCB0byB0aGUgQ3VzdG9tZXIocykgb2YgdGhlIENvbXBhbnk7XG4gICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaSBjbGFzc05hbWU9XCJwcml2YWN5LWxpc3QtaXRlbVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBUaGUgSGVhbHRoIFNlcnZpY2UgUHJvdmlkZXIgYWxzbyBhZ3JlZXMgdG8gaW5kZW1uaWZ5IGFuZCBob2xkIGhhcm1sZXNzIENvbXBhbnkgZnJvbSB0aW1lIHRvIHRpbWUgYW5kIGF0IGFsbCB0aW1lcyBoZXJlYWZ0ZXIsIGZyb20gYW5kIGFnYWluc3QsIGFsbCBub3RpY2VzLCBjbGFpbXMsIGRlbWFuZHMsIGFjdGlvbiwgc3VpdHMgb3IgcHJvY2VlZGluZ3MgZ2l2ZW4sIG1hZGUgb3IgaW5pdGlhdGVkIGFnYWluc3QgQ29tcGFueSBvbiBhY2NvdW50IG9mIHRoZSBTZXJ2aWNlIFByb3ZpZGVyLCBhcyBhbHNvIGFnYWluc3QgYWxsIGNvc3RzLCBjaGFyZ2VzIGFuZCBleHBlbnNlcyBzdWZmZXJlZCBvciBpbmN1cnJlZCBieSBDb21wYW55IGFzIGEgcmVzdWx0IG9mIGFueSBwcm9jZWVkaW5nIG9yIGxlZ2FsIGFjdGlvbiBmaWxlZCBieSB0aGUgY3VzdG9tZXIgb3IgYW55IHRoaXJkIHBhcnR5LlxuICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvb2w+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJwcml2YWN5LWRlc2Mtc3ViaGVhZGluZ1wiPjYuJm5ic3A7Jm5ic3A7Jm5ic3A7Jm5ic3A7R0VORVJBTCBQUk9WSVNJT05TPC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgPG9sIGNsYXNzTmFtZT1cInByaXZhY3ktb3JkZXItbGlzdFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaSBjbGFzc05hbWU9XCJwcml2YWN5LW9yZGVyLWl0ZW1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+R292ZXJuaW5nIExhdzsgRGlzcHV0ZSBSZXNvbHV0aW9uOjwvc3Bhbj4gVGhpcyBBZ3JlZW1lbnQgc2hhbGwgYmUgZ292ZXJuZWQgYnksIGFuZCBjb25zdHJ1ZWQgaW4gYWNjb3JkYW5jZSB3aXRoLCB0aGUgbGF3cyBvZiBJbmRpYSwgd2l0aG91dCByZWdhcmQgdG8gdGhlIHByaW5jaXBsZXMgb2YgY29uZmxpY3Qgb2YgbGF3cyBvZiBhbnkgb3RoZXIganVyaXNkaWN0aW9uLiBUaGUgY291cnRzIG9mIEd1cnVncmFtLCBJbmRpYSB3aGljaCBzaGFsbCBoYXZlIGV4Y2x1c2l2ZSBqdXJpc2RpY3Rpb24sIGZvciByZW1lZGllcyBhdmFpbGFibGUgYXQgbGF3IHRvIHN1Y2ggUGFydHkuXG4gICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaSBjbGFzc05hbWU9XCJwcml2YWN5LW9yZGVyLWl0ZW1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+UmVsYXRpb25zaGlwIG9mIFBhcnRpZXM6PC9zcGFuPiBUaGUgUGFydGllcyBhcmUgaW5kZXBlbmRlbnQgY29udHJhY3RpbmcgcGFydGllcyBhbmQgd2lsbCBoYXZlIG5vIHBvd2VyIG9yIGF1dGhvcml0eSB0byBhc3N1bWUgb3IgY3JlYXRlIGFueSBvYmxpZ2F0aW9uIG9yIHJlc3BvbnNpYmlsaXR5IG9uIGJlaGFsZiBvZiBlYWNoIG90aGVyLiBUaGlzIEFncmVlbWVudCB3aWxsIG5vdCBiZSBjb25zdHJ1ZWQgdG8gY3JlYXRlIG9yIGltcGx5IGFueSBwYXJ0bmVyc2hpcCwgYWdlbmN5LCBvciBqb2ludCB2ZW50dXJlLCBvciBlbXBsb3llci1lbXBsb3llZSByZWxhdGlvbnNoaXAuXG4gICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaSBjbGFzc05hbWU9XCJwcml2YWN5LW9yZGVyLWl0ZW1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+QmluZGluZyBFZmZlY3Q7IFNldmVyYWJpbGl0eTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG9sIGNsYXNzTmFtZT1cInN1Yi1saXN0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQWxsIHRlcm1zIGFuZCBjb25kaXRpb25zIG9mIHRoaXMgQWdyZWVtZW50IHNoYWxsIGJlIGJpbmRpbmcgdXBvbiwgaW51cmUgdG8gdGhlIGJlbmVmaXQgb2YsIGFuZCBiZSBlbmZvcmNlYWJsZSBieSB0aGUgbGVnYWwgcmVwcmVzZW50YXRpdmVzLCBzdWNjZXNzb3JzIGFuZCBhc3NpZ25zIG9mIHRoZSBQYXJ0aWVzLlxuICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBBbnkgdGVybSBvciBwcm92aXNpb24gb2YgdGhpcyBBZ3JlZW1lbnQgdGhhdCBpcyBpbnZhbGlkIG9yIHVuZW5mb3JjZWFibGUgaW4gYW55IGp1cmlzZGljdGlvbiB3aWxsLCBhcyB0byB0aGF0IGp1cmlzZGljdGlvbiwgYmUgaW5lZmZlY3RpdmUgdG8gdGhlIGV4dGVudCBvZiBzdWNoIGludmFsaWRpdHkgb3IgdW5lbmZvcmNlYWJpbGl0eSB3aXRob3V0IHJlbmRlcmluZyBpbnZhbGlkIG9yIHVuZW5mb3JjZWFibGUgdGhlIHJlbWFpbmluZyB0ZXJtcyBhbmQgcHJvdmlzaW9ucyBvZiB0aGlzIEFncmVlbWVudCBvciBhZmZlY3RpbmcgdGhlIHZhbGlkaXR5IG9yIGVuZm9yY2VhYmlsaXR5IG9mIGFueSBvZiB0aGUgdGVybXMgb3IgcHJvdmlzaW9ucyBvZiB0aGlzIEFncmVlbWVudCBpbiBhbnkgb3RoZXIganVyaXNkaWN0aW9uLiAgSWYgYW55IHByb3Zpc2lvbiBvZiB0aGlzIEFncmVlbWVudCBpcyBzbyBicm9hZCBhcyB0byBiZSB1bmVuZm9yY2VhYmxlLCB0aGUgcHJvdmlzaW9uIHdpbGwgYmUgaW50ZXJwcmV0ZWQgdG8gYmUgb25seSBzbyBicm9hZCBhcyBpcyBlbmZvcmNlYWJsZS5cbiAgICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvb2w+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGkgY2xhc3NOYW1lPVwicHJpdmFjeS1vcmRlci1pdGVtXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPkVudGlyZSBBZ3JlZW1lbnQ6PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJwcml2YWN5LWRlc2NcIj5UaGlzIEFncmVlbWVudCBjb25zdGl0dXRlcyB0aGUgZW50aXJlIGFncmVlbWVudCBiZXR3ZWVuIHRoZSBQYXJ0aWVzIHJlbGF0aW5nIHRvIHRoZSBzdWJqZWN0IG1hdHRlciBvZiB0aGlzIEFncmVlbWVudCBhbmQgc3VwZXJzZWRlcyBhbnkgcHJldmlvdXMgd3JpdHRlbiBvciBvcmFsIHVuZGVyc3RhbmRpbmcsIG5lZ290aWF0aW9ucywgY29tbXVuaWNhdGlvbnMgYW5kIGFncmVlbWVudCBiZXR3ZWVuIHRoZSBQYXJ0aWVzIGluIHJlbGF0aW9uIHRvIHRoZSBtYXR0ZXJzIGRlYWx0IHdpdGggaW4gdGhpcyBBZ3JlZW1lbnQuPC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L29sPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwicHJpdmFjeS1kZXNjLWhlYWRpbmcgbXJ0LTIwXCI+Q09ERSBPRiBDT05EVUNUPC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwicHJpdmFjeS1kZXNjXCI+SGVhbHRoIFNlcnZpY2UgUHJvdmlkZXI6PC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgPG9sIGNsYXNzTmFtZT1cInN1Yi1saXN0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaGFsbCBhYmlkZSBieSB0aGUgSW5kaWFuIE1lZGljYWwgQ291bmNpbCAoUHJvZmVzc2lvbmFsIGNvbmR1Y3QsIEV0aXF1ZXR0ZSBhbmQgRXRoaWNzKSBSZWd1bGF0aW9ucywgMjAwMiBhbmQgb3RoZXIgYXBwbGljYWJsZSBsYXdzIHRvIG1lZGljYWwgcHJvZmVzc2lvbiBJIEluZGlhXG4gICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2hhbGwgZW5zdXJlIHRoYXQgaXQgaGFzIHRoZSByZXF1aXNpdGUg4oCLcXVhbGlmaWNhdGlvbiByZWNvZ25pemVkIGJ5IE1lZGljYWwgQ291bmNpbCBvZiBJbmRpYSBhbmQgcmVnaXN0ZXJlZCB3aXRoIE1lZGljYWwgQ291bmNpbCBvZiBJbmRpYS9TdGF0ZSBNZWRpY2FsIENvdW5jaWwgKHMpIGlzIGFsbG93ZWQgdG8gcHJhY3RpY2UgYXMgcGVyIHRoZSBhcHBsaWNhYmxlIGxhd3MgaW4gSW5kaWFcbiAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaGFsbCBiZSBsaWFibGUgdG8gcHJvdGVjdCBwYXRpZW50L2N1c3RvbWVycyBwcml2YWN5IGFuZCBjb25maWRlbnRpYWxpdHkgaW5jbHVkaW5nIGFueSBtZWRpY2FsIGluZm9ybWF0aW9uIG9yIGRhdGEgcHJvdmlkZWQgYnkgdGhlIENvbXBhbnnigJlzIGN1c3RvbWVycy5cbiAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aG8gcGFydGljaXBhdGUgaW4gdGVsZW1lZGljaW5lL29ubGluZSBjb25zdWx0YXRpb24gc2hhbGwgZW5zdXJlIGFuZCBtYWludGFpbiBhbiBldGhpY2FsIHJlc3BvbnNpYmlsaXR5IHRvIHVwaG9sZCBmdW5kYW1lbnRhbCBmaWR1Y2lhcnkgb2JsaWdhdGlvbnMgYnkgZGlzY2xvc2luZyBhbnkgZmluYW5jaWFsIG9yIG90aGVyIGludGVyZXN0cyBpdCBoYXMgaW4gdGhlIHRlbGVtZWRpY2luZS9vbmxpbmUgY29uc3VsdGF0aW9uIGFwcGxpY2F0aW9uIG9yIHNlcnZpY2UgYW5kIHNoYWxsIGltbWVkaWF0ZWx5IGRpc2Nsb3NlIGl0IHRvIHRoZSBDb21wYW55IHNvIHRoYXQgQ29tcGFueSBjYW4gYXBwcm9wcmlhdGUgc3RlcHMgdG8gbWFuYWdlIG9yIGVsaW1pbmF0ZSBjb25mbGljdHMgb2YgaW50ZXJlc3RzXG4gICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2hvIHByb3ZpZGUgY2xpbmljYWwgc2VydmljZXMgYW5kL29yIHVuZGVyd3JpdGluZyBkZWNpc2lvbiBmb3IgaGVhbHRoIGFuZCBvdGhlciBpbnN1cmFuY2VzLCB0aHJvdWdoIHRlbGVtZWRpY2luZSBtdXN0IHVwaG9sZCB0aGUgc3RhbmRhcmRzIG9mIHByb2Zlc3Npb25hbGlzbSBhcyBhcmUgYXBwbGljYWJsZSBpbiBpbi1wZXJzb24gaW50ZXJhY3Rpb25zIGFuZCBmb2xsb3cgYXBwcm9wcmlhdGUgZXRoaWNhbCBndWlkZWxpbmVzIGFuZCBwcmFjdGljZXMgYXMgcGVyIG1lZGljYWwgbGF3cyBhcHBsaWNhYmxlIGluIEluZGlhXG4gICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2hvdWxkIGJlIHJlc3BvbnNpYmxlIGluIHVuZGVyc3RhbmRpbmcgdGhlIOKAi2N1cnJlbnQgbWVkaWNhbCBjb25kaXRpb24sIHRoZSBwYXN0LWhpc3RvcnksIHRoZSBzb2NpYWwgaGlzdG9yeSwgc2V2ZXJpdHkgb2YgZXhpc3RpbmcgZGlzZWFzZXMsIGNvbXBsaWNhdGlvbnMgYW5kIGN1cnJlbnQgbWFuYWdlbWVudCBsaW5lIG9mIHByb3NwZWN0aXZlIGFuZCBjdXJyZW50IGN1c3RvbWVycyBmb3IgaGVhbHRoIGFuZCBvdGhlciBpbnN1cmFuY2VzLlxuICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNoYWxsIGJlIHBydWRlbnQgaW4gY2Fycnlpbmcgb3V0IGEgZGlhZ25vc3RpYyBldmFsdWF0aW9uIG9yIHByZXNjcmliaW5nIG1lZGljYXRpb24gYnk6XG4gICAgICAgICAgICAgICA8dWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRXN0YWJsaXNoaW5nIHRoZSBwYXRpZW504oCZcyBpZGVudGl0eVxuICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBDb25maXJtaW5nIHRoYXQgdGVsZW1lZGljaW5lIHNlcnZpY2VzIGFyZSBhcHByb3ByaWF0ZSBmb3IgdGhhdCBwYXRpZW504oCZcyBpbmRpdmlkdWFsIHNpdHVhdGlvbiBhbmQgbWVkaWNhbCBuZWVkc1xuICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBFdmFsdWF0aW5nIHRoZSBpbmRpY2F0aW9uLCBhcHByb3ByaWF0ZW5lc3MgYW5kIHNhZmV0eSBvZiBhbnkgcHJlc2NyaXB0aW9uIGluIGtlZXBpbmcgd2l0aCBiZXN0XG4gICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByYWN0aWNlIGd1aWRlbGluZXMgYW5kIGFueSBmb3JtdWxhcnkgbGltaXRhdGlvbnMgdGhhdCBhcHBseSB0byB0aGUgZWxlY3Ryb25pYyBpbnRlcmFjdGlvblxuICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBEb2N1bWVudGluZyB0aGUgY2xpbmljYWwgZXZhbHVhdGlvbiBhbmQgcHJlc2NyaXB0aW9uXG4gICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaGFsbCBhdHRlbmQgbWFuZGF0b3J5IGluLWhvdXNlIHRyYWluaW5nIHByb2dyYW1zIHRoYXQgbWF5IGJlIGNvbmR1Y3RlZCBieSB0aGUgQ29tcGFueSBmcm9tIHRpbWUgdG8gdGltZS4gVGhpcyBtYXkgcmVxdWlyZSB0aGUgSGVhbHRoIFNlcnZpY2UgUHJvdmlkZXIgdG8gdW5kZXJnbyB3ZWItYmFzZWQgYW5kIG90aGVyIHRyYWluaW5nIHByb2dyYW1zLiBDb21wYW55IHNoYWxsIGhhdmUgdGhlIHJpZ2h0IHRvIHJlZ3VsYXJseSBhbmQgbW9uaXRvciBhbmQgdGhlIHF1YWxpdHkgb2Ygd29yay9zZXJ2aWNlIHBlcmZvcm1lZCBieSB0aGUgSGVhbHRoIFNlcnZpY2UgUHJvdmlkZS5cbiAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaGFsbCBtYWludGFpbiBhbGwgcGF0aWVudCByZWxhdGVkIHJlY29yZHMgaW4gYW4gZWxlY3Ryb25pYyBtYW5uZXIgaW4gYWNjb3JkYW5jZSB3aXRoIHByb3Zpc2lvbnMgbGFpZCBkb3duIGJ5IHRoZSBNZWRpY2FsIENvdW5jaWwgb2YgSW5kaWEgYW5kIGluIGFkZGl0aW9uLCBpbiB0aGUgZm9ybSBhbmQgbWFubmVyIGFzIGluc3RydWN0ZWQgYnkgdGhlIENvbXBhbnkuXG4gICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2hhbGwga2VlcCBpdHNlbGYgdXAgdG8gZGF0ZSB3aXRoIHRoZSBkZXZlbG9wbWVudHMgaW4gbWVkaWNhbCBwcm9mZXNzaW9uIGFuZCBzdHVkaWVzLG5ldyBkcnVncywgdHJlYXRtZW50cyBhbmQgbWVkaWNhdGlvbnMsIGluY2x1ZGluZyBjb21wbGVtZW50YXJ5IG1lZGljaW5lIGV0Yy5cbiAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaGFsbCBhdCBhbGwgdGltZXMgbWFpbnRhaW4gYSBwcm9mZXNzaW9uYWwgYXBwZWFyYW5jZSBhbmQgYXR0aXR1ZGUgd2hpbGUgcmVuZGVpbmcgbWVkaWNhbCBhbmQgaGVhbHRoIGNhcmUgc2VydmljZXMuXG4gICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2hhbGwgZW5zdXJlIGNsZWFyIGFuZCBwcm9tcHQgY29tbXVuaWNhdGlvbiBpbiBpdHMgZGVhbGluZyB3aXRoIENvbXBhbnnigJlzIGN1c3RvbWVycy5cbiAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaGFsbCBhY3QgaW4gdXRtb3N0IGdvb2QgZmFpdGggYW5kIGV4ZXJjaXNlIGR1ZSBjYXJlLCBkaWxpZ2VuY2UgYW5kIHBlcnNvbmFsIGFuZCBwcm9mZXNzaW9uYWwgaW50ZWdyaXR5IGluIHRoZSBwZXJmb3JtYW5jZSBvZiB0aGVpciBkdXRpZXMgYW5kIHJlc3BvbnNpYmlsaXRpZXMgYXMgbWVkaWNhbCBwcmFjdGl0aW9uZXIgYW5kIHNoYWxsIGluIG5vIGV2ZW50IGNvbXByb21pc2Ugd2l0aCB0aGVpciBpbmRlcGVuZGVuY2Ugb2YganVkZ21lbnRcbiAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaGFsbCBub3QgZXhwbG9pdCBmb3IgdGhlaXIgb3duIHBlcnNvbmFsIGdhaW4sIG9wcG9ydHVuaXRpZXMgdGhhdCBhcmUgZGlzY292ZXJlZCB0aHJvdWdoIHVzZSBvZiBjb3Jwb3JhdGUgcHJvcGVydHkgaW5mb3JtYXRpb25cbiAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L29sPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwicHJpdmFjeS1kZXNjLXN1YmhlYWRpbmdcIj5EZWNsYXJhdGlvbjo8L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJwcml2YWN5LWRlc2NcIj5UaGlzIGlzIHRvIGNvbmZpcm0gdGhhdCB3ZSBoYXZlIHVuZGVyc3Rvb2QgdGhlIGNvbnRlbnRzIG9mIENvbXBhbnnigJlzIENvZGUgb2YgQ29uZHVjdCBmb3IgSGVhbHRoIFNlcnZpY2UgUHJvdmlkZXIgYW5kIHRoZSBzYW1lIGhhcyBiZWVuIGV4cGxhaW5lZCBhbmQgdW5kZXJzdG9vZCBieSB1cy4gIFdlIGFncmVlIGFuZCB1bmRlcnRha2UgdGhhdCBpbiBwZXJmb3JtYW5jZSBvZiBvdXIgb2JsaWdhdGlvbnMgdW5kZXIgdGhpcyBhZ3JlZW1lbnQgd2l0aCAgQ29tcGFueSB3ZSBzaGFsbCBpbmNsdWRpbmcgYnV0IG5vdCBsaW1pdGVkIHRvIG91ciBvZmZpY2VycywgZGlyZWN0b3JzLCBlbXBsb3llZXMsIGFnZW50cywgY29uc3VsdGFudHMgb3IgcmVwcmVzZW50YXRpdmVzLCBldGMuLCBzaGFsbCBiZSByZXF1aXJlZCB0byBhZGhlcmUgdG8gdGhlIHJlcXVpcmVtZW50cyBvZiB0aGlzIGFja25vd2xlZGdlbWVudC48L3A+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IFRlcm1zXG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcblxuaW1wb3J0IHsgc3VibWl0Q2FyZWVyUHJvZmlsZSwgc3VibWl0Q29udGFjdE1lc3NhZ2UsIHNpZ251cERvY3RvciwgZ2V0Q2l0aWVzIH0gZnJvbSAnLi4vLi4vYWN0aW9ucy9pbmRleC5qcydcblxuaW1wb3J0IFN0YXRpY1BhZ2VzVmlldyBmcm9tICcuLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvc3RhdGljUGFnZXMnXG5cbmNsYXNzIFN0YXRpY1BhZ2VzIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICB9XG5cbiAgICBzdGF0aWMgY29udGV4dFR5cGVzID0ge1xuICAgICAgICByb3V0ZXI6ICgpID0+IG51bGxcbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcblxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPFN0YXRpY1BhZ2VzVmlldyB7Li4udGhpcy5wcm9wc30gLz5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9IChzdGF0ZSkgPT4ge1xuXG4gICAgbGV0IHtcbiAgICAgICAgY2l0aWVzTmFtZSxcbiAgICAgICAgdXRtX3RhZ3NcbiAgICB9ID0gc3RhdGUuVVNFUlxuICAgIHJldHVybiB7XG4gICAgICAgIGNpdGllc05hbWUsXG4gICAgICAgIHV0bV90YWdzXG4gICAgfVxufVxuXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSAoZGlzcGF0Y2gpID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgICBzdWJtaXRDYXJlZXJQcm9maWxlOiAocG9zdENhcmVlckRhdGEsIGNiKSA9PiBkaXNwYXRjaChzdWJtaXRDYXJlZXJQcm9maWxlKHBvc3RDYXJlZXJEYXRhLCBjYikpLFxuICAgICAgICBzdWJtaXRDb250YWN0TWVzc2FnZTogKHBvc3RDb250YWN0RGF0YSwgY2IpID0+IGRpc3BhdGNoKHN1Ym1pdENvbnRhY3RNZXNzYWdlKHBvc3RDb250YWN0RGF0YSwgY2IpKSxcbiAgICAgICAgc2lnbnVwRG9jdG9yOiAoc2lnbnVwRG9jdG9yRGF0YSwgY2IpID0+IGRpc3BhdGNoKHNpZ251cERvY3RvcihzaWdudXBEb2N0b3JEYXRhLCBjYikpLFxuICAgICAgICBnZXRDaXRpZXM6IChmaWx0ZXJUZXh0KSA9PiBkaXNwYXRjaChnZXRDaXRpZXMoZmlsdGVyVGV4dCkpXG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpKFN0YXRpY1BhZ2VzKTtcbiJdLCJzb3VyY2VSb290IjoiIn0=