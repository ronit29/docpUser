/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading wasm modules
/******/ 	var installedWasmModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// object with all compiled WebAssembly.Modules
/******/ 	__webpack_require__.w = {};
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./dev/js/actions/commons/auth.js":
/*!****************************************!*\
  !*** ./dev/js/actions/commons/auth.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.submitOTP = exports.sendOTP = undefined;

var _types = __webpack_require__(/*! ../../constants/types */ "./dev/js/constants/types.js");

var _api = __webpack_require__(/*! ../../api/api.js */ "./dev/js/api/api.js");

var _storage = __webpack_require__(/*! ../../helpers/storage */ "./dev/js/helpers/storage/index.js");

var _storage2 = _interopRequireDefault(_storage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const sendOTP = exports.sendOTP = (number, cb) => dispatch => {
    dispatch({
        type: _types.SEND_OTP_REQUEST,
        payload: {
            phoneNumber: number
        }
    });

    (0, _api.API_POST)('/api/v1/user/otp/generate', {
        "phone_number": number
    }).then(function (response) {
        dispatch({
            type: _types.SEND_OTP_SUCCESS,
            payload: {}
        });
        if (cb) cb(response.exists);
    }).catch(function (error) {
        let message = "Cannot generate OTP.";
        dispatch({
            type: _types.SEND_OTP_FAIL,
            payload: {
                error_message: message
            }
        });
    });
};

const submitOTP = exports.submitOTP = (number, otp, cb) => dispatch => {
    dispatch({
        type: _types.SUBMIT_OTP_REQUEST,
        payload: {}
    });

    (0, _api.API_POST)('/api/v1/user/doctor/login', {
        "phone_number": number,
        "otp": otp
    }).then(function (response) {
        // set cookie token explicitly, csrf token is set by default
        _storage2.default.setAuthToken(response.token);

        dispatch({
            type: _types.SUBMIT_OTP_SUCCESS,
            payload: { token: response.token }
        });
        if (cb) cb();
    }).catch(function (error) {
        dispatch({
            type: _types.SUBMIT_OTP_FAIL,
            payload: {
                error_message: "Invalid OTP"
            }
        });
    });
};

/***/ }),

/***/ "./dev/js/actions/commons/user.js":
/*!****************************************!*\
  !*** ./dev/js/actions/commons/user.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.getUserProfileWithTests = exports.getUserProfileWithAppointments = exports.getUserProfile = undefined;

var _types = __webpack_require__(/*! ../../constants/types */ "./dev/js/constants/types.js");

var _api = __webpack_require__(/*! ../../api/api.js */ "./dev/js/api/api.js");

const getUserProfile = exports.getUserProfile = () => dispatch => {
	(0, _api.API_GET)('/user.json').then(function (response) {

		dispatch({
			type: _types.APPEND_USER_PROFILES,
			payload: response.profiles
		});
	}).catch(function (error) {});
};

const getUserProfileWithAppointments = exports.getUserProfileWithAppointments = () => dispatch => {
	(0, _api.API_GET)('/user_profile_appointments.json').then(function (response) {

		dispatch({
			type: _types.APPEND_USER_PROFILES,
			payload: response.profiles
		});
	}).catch(function (error) {});
};

const getUserProfileWithTests = exports.getUserProfileWithTests = () => dispatch => {
	(0, _api.API_GET)('/user_profile_tests.json').then(function (response) {

		dispatch({
			type: _types.APPEND_USER_PROFILES,
			payload: response.profiles
		});
	}).catch(function (error) {});
};

/***/ }),

/***/ "./dev/js/actions/diagnosis/labSearch.js":
/*!***********************************************!*\
  !*** ./dev/js/actions/diagnosis/labSearch.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.getLabBookingSummary = exports.getLabTimeSlots = exports.getLabById = exports.getLabs = undefined;

var _types = __webpack_require__(/*! ../../constants/types */ "./dev/js/constants/types.js");

var _api = __webpack_require__(/*! ../../api/api.js */ "./dev/js/api/api.js");

const getLabs = exports.getLabs = (searchState = {}, filterCriteria = {}, mergeState = false) => dispatch => {

	let testIds = searchState.selectedCriterias.filter(x => x.type == 'test').reduce((finalStr, curr, i) => {
		if (i != 0) {
			finalStr += ',';
		}
		finalStr += `${curr.id}`;
		return finalStr;
	}, "");

	let lat = 28.4595;
	let long = 77.0226;
	if (searchState.selectedLocation) {
		lat = searchState.selectedLocation.geometry.location.lat;
		long = searchState.selectedLocation.geometry.location.lng;
	}
	let min_distance = filterCriteria.distanceRange[0];
	let max_distance = filterCriteria.distanceRange[1];
	let min_price = filterCriteria.priceRange[0];
	let max_price = filterCriteria.priceRange[1];
	let order_by = filterCriteria.sortBy;

	let url = `/api/v1/diagnostic/lablist?ids=${testIds}&long=${lat}&lat=${long}&min_distance=${min_distance}&max_distance=${max_distance}&min_price=${min_price}&max_price=${max_price}&order_by=${order_by}`;

	dispatch({
		type: _types.LAB_SEARCH_START,
		payload: null
	});

	return (0, _api.API_GET)(url).then(function (response) {

		dispatch({
			type: _types.APPEND_LABS,
			payload: response
		});

		dispatch({
			type: _types.LAB_SEARCH,
			payload: response
		});

		if (mergeState) {
			dispatch({
				type: _types.MERGE_SEARCH_STATE_LAB,
				payload: {
					searchState,
					filterCriteria
				}
			});
		}
	}).catch(function (error) {});
};

const getLabById = exports.getLabById = labId => dispatch => {
	let url = `/api/v1/diagnostic/lablist/${labId}`;

	return (0, _api.API_GET)(url).then(function (response) {

		dispatch({
			type: _types.APPEND_LABS,
			payload: [response]
		});
	}).catch(function (error) {});
};

const getLabTimeSlots = exports.getLabTimeSlots = (labId, testIds, callback) => dispatch => {
	(0, _api.API_GET)('/availability_labs.json').then(function (response) {

		callback(response);
	}).catch(function (error) {});
};

const getLabBookingSummary = exports.getLabBookingSummary = (bookingId, callback) => dispatch => {
	(0, _api.API_GET)('/lab_booking_summar.json').then(function (response) {

		callback(response);
	}).catch(function (error) {});
};

/***/ }),

/***/ "./dev/js/actions/diagnosis/searchCriteria.js":
/*!****************************************************!*\
  !*** ./dev/js/actions/diagnosis/searchCriteria.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getDiagnosisCriteriaResults = exports.toggleDiagnosisCriteria = exports.loadLabCommonCriterias = undefined;

var _types = __webpack_require__(/*! ../../constants/types */ "./dev/js/constants/types.js");

var _api = __webpack_require__(/*! ../../api/api.js */ "./dev/js/api/api.js");

const loadLabCommonCriterias = exports.loadLabCommonCriterias = () => dispatch => {

    return (0, _api.API_GET)('/api/v1/diagnostic/labsearch').then(function (response) {
        dispatch({
            type: _types.LOAD_SEARCH_CRITERIA_LAB,
            payload: response
        });
    }).catch(function (error) {
        dispatch({
            type: _types.LOAD_SEARCH_CRITERIA_LAB,
            payload: null
        });
    });
};

const toggleDiagnosisCriteria = exports.toggleDiagnosisCriteria = (type, criteria) => dispatch => {
    dispatch({
        type: _types.TOGGLE_DIAGNOSIS_CRITERIA,
        payload: {
            type, criteria
        }
    });
};

const getDiagnosisCriteriaResults = exports.getDiagnosisCriteriaResults = (searchString, callback) => dispatch => {
    (0, _api.API_GET)(`/api/v1/diagnostic/test?name=${searchString}`).then(function (response) {
        callback(response);
    }).catch(function (error) {
        callback(null);
    });
};

/***/ }),

/***/ "./dev/js/actions/index.js":
/*!*********************************!*\
  !*** ./dev/js/actions/index.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _searchCriteria = __webpack_require__(/*! ./opd/searchCriteria.js */ "./dev/js/actions/opd/searchCriteria.js");

var SEARCH_CRITERIA_OPD = _interopRequireWildcard(_searchCriteria);

var _searchCriteria2 = __webpack_require__(/*! ./diagnosis/searchCriteria.js */ "./dev/js/actions/diagnosis/searchCriteria.js");

var SEARCH_CRITERIA_LABS = _interopRequireWildcard(_searchCriteria2);

var _doctorSearch = __webpack_require__(/*! ./opd/doctorSearch.js */ "./dev/js/actions/opd/doctorSearch.js");

var DOCTORS_ACTIONS = _interopRequireWildcard(_doctorSearch);

var _labSearch = __webpack_require__(/*! ./diagnosis/labSearch.js */ "./dev/js/actions/diagnosis/labSearch.js");

var LABS_ACTIONS = _interopRequireWildcard(_labSearch);

var _user = __webpack_require__(/*! ./commons/user.js */ "./dev/js/actions/commons/user.js");

var USER_ACTIONS = _interopRequireWildcard(_user);

var _auth = __webpack_require__(/*! ./commons/auth.js */ "./dev/js/actions/commons/auth.js");

var AUTH_ACTIONS = _interopRequireWildcard(_auth);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

module.exports = Object.assign({}, SEARCH_CRITERIA_OPD, SEARCH_CRITERIA_LABS, DOCTORS_ACTIONS, LABS_ACTIONS, USER_ACTIONS, AUTH_ACTIONS);

/***/ }),

/***/ "./dev/js/actions/opd/doctorSearch.js":
/*!********************************************!*\
  !*** ./dev/js/actions/opd/doctorSearch.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.getTimeSlots = exports.getDoctorById = exports.getDoctors = undefined;

var _types = __webpack_require__(/*! ../../constants/types */ "./dev/js/constants/types.js");

var _api = __webpack_require__(/*! ../../api/api.js */ "./dev/js/api/api.js");

const getDoctors = exports.getDoctors = (searchState = {}, filterCriteria = {}, mergeState = false) => dispatch => {
	// let testIds = searchState.selectedCriterias
	// 	.filter(x => x.type == 'test')
	// 	.reduce((finalStr, curr, i) => {
	// 		if (i != 0) {
	// 			finalStr += ','
	// 		}
	// 		finalStr += `${curr.id}`
	// 		return finalStr
	// 	}, "")

	// let lat = 28.4595
	// let long = 77.0226
	// if (searchState.selectedLocation) {
	// 	lat = searchState.selectedLocation.geometry.location.lat
	// 	long = searchState.selectedLocation.geometry.location.lng
	// }
	// let min_distance = filterCriteria.distanceRange[0]
	// let max_distance = filterCriteria.distanceRange[1]
	// let min_price = filterCriteria.priceRange[0]
	// let max_price = filterCriteria.priceRange[1]
	// let order_by = filterCriteria.sortBy

	// let url = `/api/v1/diagnostic/lablist?ids=${testIds}&long=${lat}&lat=${long}&min_distance=${min_distance}&max_distance=${max_distance}&min_price=${min_price}&max_price=${max_price}&order_by=${order_by}`

	let url = `/api/v1/doctor/doctorsearch`;

	dispatch({
		type: _types.DOCTOR_SEARCH_START,
		payload: null
	});

	return (0, _api.API_GET)(url).then(function (response) {

		dispatch({
			type: _types.APPEND_DOCTORS,
			payload: response
		});

		dispatch({
			type: _types.DOCTOR_SEARCH,
			payload: response
		});

		if (mergeState) {
			dispatch({
				type: _types.MERGE_SEARCH_STATE_OPD,
				payload: {
					searchState,
					filterCriteria
				}
			});
		}
	}).catch(function (error) {});
};

const getDoctorById = exports.getDoctorById = doctorId => dispatch => {
	// this API should return detailed doctor
	(0, _api.API_GET)('/doctors.json').then(function (response) {
		// mocking API , TODO : remove
		response.doctor = response.doctors.filter(doc => doc.id == doctorId)[0];

		dispatch({
			type: _types.APPEND_DOCTORS,
			payload: [response.doctor]
		});
	}).catch(function (error) {});
};

const getTimeSlots = exports.getTimeSlots = (doctorId, clinicId, callback) => dispatch => {
	(0, _api.API_GET)('/availability.json').then(function (response) {

		callback(response);
	}).catch(function (error) {});
};

/***/ }),

/***/ "./dev/js/actions/opd/searchCriteria.js":
/*!**********************************************!*\
  !*** ./dev/js/actions/opd/searchCriteria.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getOPDCriteriaResults = exports.selectLocation = exports.toggleOPDCriteria = exports.loadOPDCommonCriteria = undefined;

var _types = __webpack_require__(/*! ../../constants/types */ "./dev/js/constants/types.js");

var _api = __webpack_require__(/*! ../../api/api.js */ "./dev/js/api/api.js");

const loadOPDCommonCriteria = exports.loadOPDCommonCriteria = () => dispatch => {

    return (0, _api.API_GET)('/api/v1/doctor/searcheditems').then(function (response) {
        dispatch({
            type: _types.LOAD_SEARCH_CRITERIA_OPD,
            payload: response
        });
    }).catch(function (error) {
        dispatch({
            type: _types.LOAD_SEARCH_CRITERIA_OPD,
            payload: null
        });
    });
};

const toggleOPDCriteria = exports.toggleOPDCriteria = (type, criteria) => dispatch => {
    dispatch({
        type: _types.TOGGLE_OPD_CRITERIA,
        payload: {
            type, criteria
        }
    });
};

const selectLocation = exports.selectLocation = location => dispatch => {
    dispatch({
        type: _types.SELECT_LOCATION_OPD,
        payload: location
    });

    dispatch({
        type: _types.SELECT_LOCATION_DIAGNOSIS,
        payload: location
    });
};

const getOPDCriteriaResults = exports.getOPDCriteriaResults = (searchString, callback) => dispatch => {

    (0, _api.API_GET)(`/api/v1/diagnostic/test?name=${searchString}`).then(function (response) {
        callback(response);
    }).catch(function (error) {
        callback(null);
    });
};

/***/ }),

/***/ "./dev/js/api/api.js":
/*!***************************!*\
  !*** ./dev/js/api/api.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.API_DELETE = exports.API_PUT = exports.API_POST = exports.API_GET = undefined;

var _axios = __webpack_require__(/*! axios */ "axios");

var _axios2 = _interopRequireDefault(_axios);

var _storage = __webpack_require__(/*! ../helpers/storage */ "./dev/js/helpers/storage/index.js");

var _storage2 = _interopRequireDefault(_storage);

var _navigate = __webpack_require__(/*! ../helpers/navigate */ "./dev/js/helpers/navigate/index.js");

var _navigate2 = _interopRequireDefault(_navigate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let axiosInstance = _axios2.default.create({
    baseURL: 'http://10.0.32.79:8080',
    header: {}
});

function rejectHandler(response, callback) {
    // if (response && response.response && response.response.status == 401) {
    //     STORAGE.deleteAuth().then(() => {
    //         // send to login page
    //         NAVIGATE.navigateTo('/')
    //     })
    // }

    callback(response);
}

const API_GET = exports.API_GET = url => {
    return _storage2.default.getAuthToken().then(token => {
        return new Promise((resolve, reject) => {
            axiosInstance({
                method: 'get',
                url: url
                // headers: { 'Authorization': `Token ${token}` }
            }).then(res => {
                resolve(res.data);
            }, response => {
                rejectHandler(response, reject);
            });
        });
    });
};
const API_POST = exports.API_POST = (url, data) => {
    return _storage2.default.getAuthToken().then(token => {
        return new Promise((resolve, reject) => {
            axiosInstance({
                method: 'post',
                url: url,
                data: data,
                headers: { 'Authorization': `Token ${token}` }
            }).then(res => {
                resolve(res.data);
            }, response => {
                rejectHandler(response, reject);
            });
        });
    });
};

const API_PUT = exports.API_PUT = (url, data) => {
    return _storage2.default.getAuthToken().then(token => {
        return new Promise((resolve, reject) => {
            axiosInstance({
                method: 'put',
                url: url,
                data: data,
                headers: { 'Authorization': `Token ${token}` }
            }).then(res => {
                resolve(res.data);
            }, response => {
                rejectHandler(response, reject);
            });
        });
    });
};

const API_DELETE = exports.API_DELETE = url => {
    return _storage2.default.getAuthToken().then(token => {
        return new Promise((resolve, reject) => {
            axiosInstance({
                method: 'delete',
                url: url,
                headers: { 'Authorization': `Token ${token}` }
            }).then(res => {
                resolve(res.data);
            }, response => {
                rejectHandler(response, reject);
            });
        });
    });
};

/***/ }),

/***/ "./dev/js/components/commons/Loader/Loader.js":
/*!****************************************************!*\
  !*** ./dev/js/components/commons/Loader/Loader.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(/*! react */ "react");

var _react2 = _interopRequireDefault(_react);

var _Progress = __webpack_require__(/*! material-ui/Progress */ "material-ui/Progress");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Loader extends _react2.default.Component {
    constructor(props) {
        super(props);
    }

    render() {

        return _react2.default.createElement(
            'div',
            { className: 'loaderCircular' },
            _react2.default.createElement(_Progress.CircularProgress, { className: "loaderactual", size: 50, thickness: 3 })
        );
    }
}

exports.default = Loader;

/***/ }),

/***/ "./dev/js/components/commons/Loader/index.js":
/*!***************************************************!*\
  !*** ./dev/js/components/commons/Loader/index.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Loader = __webpack_require__(/*! ./Loader */ "./dev/js/components/commons/Loader/Loader.js");

var _Loader2 = _interopRequireDefault(_Loader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _Loader2.default;

/***/ }),

/***/ "./dev/js/components/commons/UserLogin/UserLogin.js":
/*!**********************************************************!*\
  !*** ./dev/js/components/commons/UserLogin/UserLogin.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(/*! react */ "react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UserLoginView extends _react2.default.Component {
    constructor(props) {
        super(props);
        this.state = {
            phoneNumber: '',
            validationError: ''
        };
    }

    inputHandler(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    submitOTPRequest(number) {

        if (number.match(/^[789]{1}[0-9]{9}$/)) {
            this.setState({ validationError: "" });
            this.props.sendOTP(number, exists => {
                this.props.history.replace('/otp/verify?exists=${!!exists}');
            });
        } else {
            this.setState({ validationError: "Please provide a valid number (10 digits)" });
        }
    }

    render() {

        return _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
                'header',
                { className: 'skin-white fixed horizontal top bdr-1 bottom light' },
                _react2.default.createElement(
                    'div',
                    { className: 'container-fluid' },
                    _react2.default.createElement(
                        'div',
                        { className: 'row' },
                        _react2.default.createElement(
                            'div',
                            { className: 'col-2' },
                            _react2.default.createElement(
                                'ul',
                                { className: 'inline-list' },
                                _react2.default.createElement(
                                    'li',
                                    null,
                                    _react2.default.createElement(
                                        'span',
                                        { className: 'icon icon-sm text-middle back-icon-white' },
                                        _react2.default.createElement('img', { src: '/assets/img/customer-icons/back-icon.png', className: 'img-fluid' })
                                    )
                                )
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'col-8' },
                            _react2.default.createElement(
                                'div',
                                { className: 'header-title fw-700 capitalize text-center' },
                                'Registration/Login'
                            )
                        ),
                        _react2.default.createElement('div', { className: 'col-2' })
                    )
                )
            ),
            _react2.default.createElement(
                'section',
                { className: 'wrap mobile-verification-screen' },
                _react2.default.createElement(
                    'div',
                    { className: 'widget no-shadow no-round' },
                    _react2.default.createElement(
                        'div',
                        { className: 'widget-header text-center mv-header' },
                        _react2.default.createElement(
                            'h4',
                            { className: 'fw-700 text-md' },
                            'Enter your Mobile Number ',
                            _react2.default.createElement('br', null),
                            ' to continue'
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'widget-content text-center' },
                        _react2.default.createElement(
                            'div',
                            { className: 'mobile-verification' },
                            _react2.default.createElement(
                                'div',
                                { className: 'verifi-mob-iocn text-center' },
                                _react2.default.createElement('img', { src: '/assets/img/customer-icons/mob.svg', className: 'img-fluid' })
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'form-group mobile-field' },
                            _react2.default.createElement(
                                'div',
                                { className: 'adon-group enter-mobile-number' },
                                _react2.default.createElement('input', { type: 'text', className: 'fc-input text-center', placeholder: '234XXXXXX', value: this.state.phoneNumber, onChange: this.inputHandler.bind(this), name: 'phoneNumber' })
                            )
                        )
                    ),
                    _react2.default.createElement(
                        'span',
                        { className: 'errorMessage' },
                        this.props.error_message
                    ),
                    _react2.default.createElement(
                        'span',
                        { className: 'errorMessage' },
                        this.state.validationError
                    )
                )
            ),
            _react2.default.createElement(
                'button',
                { onClick: this.submitOTPRequest.bind(this, this.state.phoneNumber), disabled: this.props.otp_request_sent, className: 'v-btn v-btn-primary btn-lg fixed horizontal bottom no-round btn-lg text-lg' },
                'Continue'
            )
        );
    }
}

exports.default = UserLoginView;

/***/ }),

/***/ "./dev/js/components/commons/UserLogin/index.js":
/*!******************************************************!*\
  !*** ./dev/js/components/commons/UserLogin/index.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _UserLogin = __webpack_require__(/*! ./UserLogin */ "./dev/js/components/commons/UserLogin/UserLogin.js");

var _UserLogin2 = _interopRequireDefault(_UserLogin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _UserLogin2.default;

/***/ }),

/***/ "./dev/js/components/commons/chat/ChatView.js":
/*!****************************************************!*\
  !*** ./dev/js/components/commons/chat/ChatView.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(/*! react */ "react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const IframStyle = {
    width: '100%',
    height: 'calc(100vh - 60px)'
};

class ChatView extends _react2.default.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {

        return _react2.default.createElement(
            'div',
            { className: 'locationSelector' },
            _react2.default.createElement('iframe', { src: 'http://chatbot.policybazaar.com/livechat', style: IframStyle })
        );
    }
}

ChatView.contextTypes = {
    router: () => null
};
exports.default = ChatView;

/***/ }),

/***/ "./dev/js/components/commons/chat/index.js":
/*!*************************************************!*\
  !*** ./dev/js/components/commons/chat/index.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ChatView = __webpack_require__(/*! ./ChatView.js */ "./dev/js/components/commons/chat/ChatView.js");

var _ChatView2 = _interopRequireDefault(_ChatView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _ChatView2.default;

/***/ }),

/***/ "./dev/js/components/commons/commonlySearched/CommonlySearched.js":
/*!************************************************************************!*\
  !*** ./dev/js/components/commons/commonlySearched/CommonlySearched.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(/*! react */ "react");

var _react2 = _interopRequireDefault(_react);

var _Chip = __webpack_require__(/*! material-ui/Chip */ "material-ui/Chip");

var _Chip2 = _interopRequireDefault(_Chip);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class CommonlySearched extends _react2.default.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {

        let rows = this.props.data.map((row, i) => {
            if (this.props.type == 'lab') {
                return _react2.default.createElement(
                    'li',
                    { key: i },
                    _react2.default.createElement(
                        'span',
                        {
                            className: 'ct-img lab-img',
                            onClick: () => {}
                        },
                        _react2.default.createElement('img', { src: '/assets/img/customer-icons/lab1.png', className: 'img-fluid' })
                    ),
                    _react2.default.createElement(
                        'p',
                        { className: 'lab-name' },
                        'SLR Dignostics'
                    )
                );
            } else {
                let selected = false;
                this.props.selected.map(curr => {
                    if (curr.id == row.id) {
                        selected = true;
                    }
                });
                return _react2.default.createElement(
                    'li',
                    { key: i },
                    _react2.default.createElement(
                        'a',
                        {
                            className: selected ? "v-btn v-btn-primary tag-sm outline selected" : "v-btn v-btn-primary tag-sm outline",
                            onClick: () => {
                                return this.props.toggle(this.props.type || row.type, row);
                            }
                        },
                        row.name
                    )
                );
            }
        });

        let divClass = `panel-content`;
        let ulClass = `inline-list`;

        if (this.props.type == 'lab') {
            divClass = `panel-content total-labs`;
            ulClass = `inline-list lab-items`;
        }

        return _react2.default.createElement(
            'div',
            { className: 'widget-panel' },
            _react2.default.createElement(
                'h4',
                { className: 'panel-title' },
                this.props.heading
            ),
            _react2.default.createElement(
                'div',
                { className: divClass },
                _react2.default.createElement(
                    'ul',
                    { className: ulClass },
                    rows
                )
            )
        );
    }
}

exports.default = CommonlySearched;

/***/ }),

/***/ "./dev/js/components/commons/commonlySearched/index.js":
/*!*************************************************************!*\
  !*** ./dev/js/components/commons/commonlySearched/index.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _CommonlySearched = __webpack_require__(/*! ./CommonlySearched.js */ "./dev/js/components/commons/commonlySearched/CommonlySearched.js");

var _CommonlySearched2 = _interopRequireDefault(_CommonlySearched);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _CommonlySearched2.default;

/***/ }),

/***/ "./dev/js/components/commons/criteriaSearch/CriteriaSearchView.js":
/*!************************************************************************!*\
  !*** ./dev/js/components/commons/criteriaSearch/CriteriaSearchView.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__(/*! react */ "react");

var _react2 = _interopRequireDefault(_react);

var _styles = __webpack_require__(/*! material-ui/styles */ "material-ui/styles");

var _Loader = __webpack_require__(/*! ../../commons/Loader */ "./dev/js/components/commons/Loader/index.js");

var _Loader2 = _interopRequireDefault(_Loader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const debouncer = (fn, delay) => {
    let timer = null;
    return function () {
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn.call(this);
        }, delay);
    };
};

class CriteriaSearchView extends _react2.default.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchValue: '',
            searchResults: []
        };
    }

    componentDidMount() {
        this.getSearchResults = debouncer(this.getSearchResults.bind(this), 1000);
        let input = document.getElementById('topCriteriaSearch');
        // input.focus()
    }

    inputHandler(e) {
        this.setState({ searchValue: e.target.value });
        this.getSearchResults();
    }

    getSearchResults() {
        if (this.props.type == 'opd') {} else {
            this.props.getDiagnosisCriteriaResults(this.state.searchValue, searchResults => {
                if (searchResults) {
                    let tests = searchResults.tests.map(x => {
                        return _extends({}, x, { type: 'test' });
                    });
                    this.setState({ searchResults: [...tests] });
                }
            });
        }
    }

    addCriteria(criteria) {
        if (this.props.type == 'opd') {} else {
            this.props.toggleDiagnosisCriteria(criteria.type, criteria);
            this.setState({ searchValue: "" });
        }
    }

    render() {

        let location = "Gurgaon";
        if (this.props.selectedLocation) {
            location = this.props.selectedLocation.formatted_address.slice(0, 5);
        }

        return _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
                'header',
                { className: 'skin-primary fixed horizontal top ct-header' },
                _react2.default.createElement(
                    'div',
                    { className: 'container-fluid' },
                    _react2.default.createElement(
                        'div',
                        { className: 'row' },
                        _react2.default.createElement(
                            'div',
                            { className: 'col-12' },
                            _react2.default.createElement(
                                'div',
                                { className: 'navigate-row' },
                                _react2.default.createElement(
                                    'ul',
                                    { className: 'inline-list top-nav alpha-bx text-white',
                                        onClick: () => {
                                            this.props.history.go(-1);
                                        }
                                    },
                                    _react2.default.createElement(
                                        'li',
                                        null,
                                        _react2.default.createElement(
                                            'span',
                                            { className: 'ct-img ct-img-sm arrow-img' },
                                            _react2.default.createElement('img', { src: '/assets/img/customer-icons/left-arrow.svg', className: 'img-fluid' })
                                        )
                                    ),
                                    _react2.default.createElement(
                                        'li',
                                        null,
                                        _react2.default.createElement(
                                            'div',
                                            { className: 'screen-title' },
                                            'Search'
                                        )
                                    )
                                ),
                                _react2.default.createElement(
                                    'ul',
                                    { className: 'inline-list top-nav beta-bx float-right text-right text-white',
                                        onClick: () => {
                                            this.props.history.push('/locationsearch');
                                        }
                                    },
                                    _react2.default.createElement(
                                        'li',
                                        null,
                                        _react2.default.createElement(
                                            'div',
                                            { className: 'screen-title' },
                                            _react2.default.createElement(
                                                'span',
                                                { className: 'ct-img ct-img-sm map-marker-img' },
                                                _react2.default.createElement('img', { src: '/assets/img/customer-icons/map-marker.svg', className: 'img-fluid' })
                                            ),
                                            ' ',
                                            location
                                        )
                                    )
                                )
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
                                { className: 'search-row' },
                                _react2.default.createElement(
                                    'div',
                                    { className: 'adon-group' },
                                    _react2.default.createElement('input', { type: 'text', className: 'form-control input-md search-input', id: 'topCriteriaSearch', onChange: this.inputHandler.bind(this), value: this.state.searchValue, placeholder: this.props.title }),
                                    _react2.default.createElement(
                                        'span',
                                        { className: 'ct-img ct-img-sm search-icon' },
                                        _react2.default.createElement('img', { src: '/assets/img/customer-icons/search-icon.svg' })
                                    )
                                )
                            )
                        )
                    )
                )
            ),
            this.state.searchValue ? _react2.default.createElement(
                'section',
                { className: 'wrap wrap-100' },
                _react2.default.createElement(
                    'div',
                    { className: 'widget-panel' },
                    _react2.default.createElement(
                        'h4',
                        { className: 'panel-title' },
                        'Search Result'
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'panel-content' },
                        _react2.default.createElement(
                            'ul',
                            { className: 'list search-result-list' },
                            this.state.searchResults.map((curr, i) => {
                                return _react2.default.createElement(
                                    'li',
                                    { onClick: this.addCriteria.bind(this, curr), key: i },
                                    _react2.default.createElement(
                                        'a',
                                        null,
                                        curr.name
                                    )
                                );
                            })
                        )
                    )
                )
            ) : this.props.checkForLoad ? this.props.children : _react2.default.createElement(_Loader2.default, null)
        );
    }
}

exports.default = CriteriaSearchView;

/***/ }),

/***/ "./dev/js/components/commons/criteriaSearch/index.js":
/*!***********************************************************!*\
  !*** ./dev/js/components/commons/criteriaSearch/index.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _CriteriaSearchView = __webpack_require__(/*! ./CriteriaSearchView.js */ "./dev/js/components/commons/criteriaSearch/CriteriaSearchView.js");

var _CriteriaSearchView2 = _interopRequireDefault(_CriteriaSearchView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _CriteriaSearchView2.default;

/***/ }),

/***/ "./dev/js/components/commons/otpVerify/OtpVerify.js":
/*!**********************************************************!*\
  !*** ./dev/js/components/commons/otpVerify/OtpVerify.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(/*! react */ "react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class OtpVerifyView extends _react2.default.Component {
    constructor(props) {
        super(props);
        this.state = {};

        console.log(this.props);
        debugger;
    }

    inputHandler(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {

        return _react2.default.createElement('div', null);
    }
}

exports.default = OtpVerifyView;

/***/ }),

/***/ "./dev/js/components/commons/otpVerify/index.js":
/*!******************************************************!*\
  !*** ./dev/js/components/commons/otpVerify/index.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _OtpVerify = __webpack_require__(/*! ./OtpVerify */ "./dev/js/components/commons/otpVerify/OtpVerify.js");

var _OtpVerify2 = _interopRequireDefault(_OtpVerify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _OtpVerify2.default;

/***/ }),

/***/ "./dev/js/components/commons/profileSlider/ProfileSlider.js":
/*!******************************************************************!*\
  !*** ./dev/js/components/commons/profileSlider/ProfileSlider.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(/*! react */ "react");

var _react2 = _interopRequireDefault(_react);

var _AccountCircle = __webpack_require__(/*! material-ui-icons/AccountCircle */ "material-ui-icons/AccountCircle");

var _AccountCircle2 = _interopRequireDefault(_AccountCircle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ProfileSlider extends _react2.default.Component {
    constructor(props) {
        super(props);
    }

    switchUser(profileId) {
        this.context.router.history.push(`/user/${profileId}${this.props.subRoute}`);
    }

    render() {

        let profiles = [];

        profiles = Object.keys(this.props.profiles).map((profileId, i) => {
            let src = this.props.profiles[profileId].profileImage || "https://www.atomix.com.au/media/2015/06/atomix_user31.png";
            return _react2.default.createElement(
                'div',
                { key: i, className: 'slideTile', onClick: this.switchUser.bind(this, profileId) },
                _react2.default.createElement('img', { className: 'profileCardImage', src: src })
            );
        });

        return _react2.default.createElement(
            'div',
            { className: 'profileSlider' },
            profiles
        );
    }
}

ProfileSlider.contextTypes = {
    router: () => null
};
exports.default = ProfileSlider;

/***/ }),

/***/ "./dev/js/components/commons/profileSlider/index.js":
/*!**********************************************************!*\
  !*** ./dev/js/components/commons/profileSlider/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ProfileSlider = __webpack_require__(/*! ./ProfileSlider.js */ "./dev/js/components/commons/profileSlider/ProfileSlider.js");

var _ProfileSlider2 = _interopRequireDefault(_ProfileSlider);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _ProfileSlider2.default;

/***/ }),

/***/ "./dev/js/components/commons/timeSlotSelector/TimeSlotSelector.js":
/*!************************************************************************!*\
  !*** ./dev/js/components/commons/timeSlotSelector/TimeSlotSelector.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(/*! react */ "react");

var _react2 = _interopRequireDefault(_react);

var _dateTimeUtils = __webpack_require__(/*! ../../../utils/dateTimeUtils.js */ "./dev/js/utils/dateTimeUtils.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class TimeSlotSelector extends _react2.default.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedDay: 0,
            selectedInterval: 0,
            selectedTimeSlot: 0

        };
    }
    componentWillMount() {
        let timeSlots = this.props.timeSlots;

        this.setDefaultSelected(timeSlots);
    }
    setDefaultSelected(timeSlots) {
        let days = timeSlots.dates;
        let defaultDayIndex = this.getFirstAvailableDay(days);

        if (defaultDayIndex || defaultDayIndex === 0) {
            this.setState({ selectedDay: defaultDayIndex });
            var defautInterwalIndex = this.getFirstAvailableInterwal(days[defaultDayIndex].intervals);
        }
        if (defautInterwalIndex || defautInterwalIndex === 0) {
            this.setState({ selectedInterval: defautInterwalIndex });
            var defaultTimeSlotIndex = this.getFirstAvailableTimeSlot(days[defaultDayIndex].intervals[defautInterwalIndex].timeSlots);
        }
        if (defaultTimeSlotIndex || defaultTimeSlotIndex === 0) {
            this.setState({ selectedTimeSlot: defaultTimeSlotIndex });
        }
    }

    getFirstAvailableInterwal(intervals) {

        for (let interwalIndex in intervals) {
            let interwal = intervals[interwalIndex];
            if (interwal && interwal.isAvailable) {
                return parseInt(interwalIndex);
            }
        }
    }

    getFirstAvailableTimeSlot(timeSlots) {

        for (let timeSlotIndex in timeSlots) {
            let timeSlot = timeSlots[timeSlotIndex];
            if (timeSlot && timeSlot.isAvailable) {
                // calling parent timeSlot setter
                this.props.selectTimeSlot(timeSlot);
                return parseInt(timeSlotIndex);
            }
        }
    }

    getFirstAvailableDay(days) {

        for (let dayIndex in days) {
            let day = days[dayIndex];
            if (day && day.isAvailable) {
                return parseInt(dayIndex);
            }
        }
    }
    onDateClick(date, selectedIndex, index) {

        if (selectedIndex !== index && date.isAvailable) {
            var availableInterwal = this.getFirstAvailableInterwal(date.intervals);
            if (availableInterwal || availableInterwal === 0) {
                let timeSlots = date.intervals[availableInterwal].timeSlots;
                var availableTimeSlot = this.getFirstAvailableTimeSlot(timeSlots);
            }

            this.setState({ selectedDay: index, selectedInterval: availableInterwal, selectedTimeSlot: availableTimeSlot });
        }
    }
    onIntervalClick(interwal, selectedIndex, index) {

        if (selectedIndex !== index && interwal.isAvailable) {
            let timeSlots = interwal.timeSlots;
            var availableTimeSlot = this.getFirstAvailableTimeSlot(timeSlots);

            this.setState({ selectedInterval: index, selectedTimeSlot: availableTimeSlot });
        }
    }
    onTimeSlotClick(timeSlot, selectedIndex, index) {

        if (selectedIndex !== index && timeSlot.isAvailable) {
            this.setState({ selectedTimeSlot: index });
            // calling parent timeSlot setter
            this.props.selectTimeSlot(timeSlot);
        }
    }

    render() {

        let { dates } = this.props.timeSlots;

        let intervals = [];
        let timeSlots = [];
        let dateList = [];

        dateList = dates.map((date, i) => {
            let dayDate = new Date(date.date).getDate();
            let dayName = (0, _dateTimeUtils.getDayName)(date.date);
            let selected = this.state.selectedDay == i;
            return _react2.default.createElement(
                'div',
                { key: i, onClick: this.onDateClick.bind(this, date, this.state.selectedDay, i), className: date.isAvailable ? selected ? "dateTile selected" : "dateTile" : "dateTile disabled" },
                _react2.default.createElement(
                    'p',
                    { className: 'date' },
                    dayDate
                ),
                _react2.default.createElement(
                    'p',
                    { className: 'day' },
                    dayName
                )
            );
        });
        intervals = dates[this.state.selectedDay].intervals.map((interval, i) => {
            let selected = this.state.selectedInterval == i;
            return _react2.default.createElement(
                'button',
                { key: i, onClick: this.onIntervalClick.bind(this, interval, this.state.selectedInterval, i), className: interval.isAvailable ? selected ? "tsBtn selected" : "tsBtn" : "tsBtn disabled" },
                interval.name
            );
        });

        timeSlots = dates[this.state.selectedDay].intervals[this.state.selectedInterval].timeSlots.map((slot, i) => {
            let selected = this.state.selectedTimeSlot == i;
            let slotText = (0, _dateTimeUtils.getTime)(slot.start);
            if (slot.end) {
                slotText += ` - ${(0, _dateTimeUtils.getTime)(slot.end)}`;
            }
            return _react2.default.createElement(
                'span',
                { key: i, onClick: this.onTimeSlotClick.bind(this, slot, this.state.selectedTimeSlot, i), className: slot.isAvailable ? selected ? "slot selected" : "slot" : "slot disabled" },
                slotText
            );
        });

        return _react2.default.createElement(
            'div',
            { className: 'timeSlotSelector' },
            _react2.default.createElement(
                'h5',
                null,
                'Select preffered time slot'
            ),
            _react2.default.createElement(
                'div',
                { className: 'dateCar' },
                _react2.default.createElement(
                    'div',
                    { className: 'scroller' },
                    dateList
                )
            ),
            _react2.default.createElement(
                'div',
                { className: 'timeSlots' },
                intervals,
                _react2.default.createElement(
                    'div',
                    { className: 'slots' },
                    timeSlots
                )
            )
        );
    }
}

exports.default = TimeSlotSelector;

/***/ }),

/***/ "./dev/js/components/commons/timeSlotSelector/index.js":
/*!*************************************************************!*\
  !*** ./dev/js/components/commons/timeSlotSelector/index.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _TimeSlotSelector = __webpack_require__(/*! ./TimeSlotSelector.js */ "./dev/js/components/commons/timeSlotSelector/TimeSlotSelector.js");

var _TimeSlotSelector2 = _interopRequireDefault(_TimeSlotSelector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _TimeSlotSelector2.default;

/***/ }),

/***/ "./dev/js/components/commons/userAppointments/UserAppointmentsView.js":
/*!****************************************************************************!*\
  !*** ./dev/js/components/commons/userAppointments/UserAppointmentsView.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(/*! react */ "react");

var _react2 = _interopRequireDefault(_react);

var _index = __webpack_require__(/*! ../profileSlider/index.js */ "./dev/js/components/commons/profileSlider/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = __webpack_require__(/*! ./appointmentList/index.js */ "./dev/js/components/commons/userAppointments/appointmentList/index.js");

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UserAppointmentsView extends _react2.default.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.props.getUserProfileWithAppointments();
    }

    compareDateWithToday(date) {
        let today = new Date().getTime();
        date = new Date(date).getTime();
        return today > date;
    }

    render() {

        let selectedUser = null;
        let userProfileId = this.props.match.params.id;

        if (this.props.USER.profiles[userProfileId]) {
            selectedUser = this.props.USER.profiles[userProfileId];
        } else {
            Object.keys(this.props.USER.profiles).map(profileId => {
                if (this.props.USER.profiles[profileId].isDefaultUser) {
                    selectedUser = this.props.USER.profiles[profileId];
                }
            });
        }

        return _react2.default.createElement(
            'div',
            { className: 'userProfile' },
            selectedUser && selectedUser.appointments ? _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(_index2.default, {
                    profiles: this.props.USER.profiles,
                    subRoute: '/appointments'
                }),
                _react2.default.createElement(
                    'p',
                    { className: 'upcomingapp' },
                    'Upcoming OPD Appointments'
                ),
                selectedUser.appointments.filter((appointment, i) => {
                    let date = appointment.slot ? appointment.slot.start : 0;
                    return !this.compareDateWithToday(date);
                }).map((appointment, index) => {
                    return _react2.default.createElement(_index4.default, { key: index, data: appointment });
                }),
                _react2.default.createElement(
                    'p',
                    { className: 'prevapp' },
                    'Previous OPD Appointments'
                ),
                selectedUser.appointments.filter((appointment, i) => {
                    let date = appointment.slot ? appointment.slot.start : 0;
                    return this.compareDateWithToday(date);
                }).map((appointment, index) => {
                    return _react2.default.createElement(_index4.default, { key: index, data: appointment });
                })
            ) : ""
        );
    }
}

UserAppointmentsView.contextTypes = {
    router: () => null
};
exports.default = UserAppointmentsView;

/***/ }),

/***/ "./dev/js/components/commons/userAppointments/appointmentList/AppointmentList.js":
/*!***************************************************************************************!*\
  !*** ./dev/js/components/commons/userAppointments/appointmentList/AppointmentList.js ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(/*! react */ "react");

var _react2 = _interopRequireDefault(_react);

var _KeyboardArrowRight = __webpack_require__(/*! material-ui-icons/KeyboardArrowRight */ "material-ui-icons/KeyboardArrowRight");

var _KeyboardArrowRight2 = _interopRequireDefault(_KeyboardArrowRight);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class AppointmentList extends _react2.default.Component {
    constructor(props) {
        super(props);
    }

    getTime(unix_timestamp) {
        var date = new Date(unix_timestamp * 1000);
        var hours = date.getHours();
        var minutes = "0" + date.getMinutes();
        return hours + ':' + minutes.substr(-2);
    }

    render() {

        let { doctorName, slot } = this.props.data;
        slot = slot || {
            start: 0,
            end: 0
        };
        let date = new Date(slot.start).toDateString();

        return _react2.default.createElement(
            'div',
            { className: 'appointment' },
            _react2.default.createElement('div', { className: 'name' }),
            _react2.default.createElement(
                'div',
                { className: 'details' },
                _react2.default.createElement(
                    'p',
                    null,
                    doctorName
                ),
                _react2.default.createElement(
                    'p',
                    null,
                    date
                ),
                _react2.default.createElement(
                    'p',
                    null,
                    this.getTime(slot.start) + " to " + this.getTime(slot.end)
                )
            ),
            _react2.default.createElement(
                'div',
                { className: 'book' },
                _react2.default.createElement(
                    'span',
                    { className: 'text' },
                    'View Confirmation'
                ),
                _react2.default.createElement(_KeyboardArrowRight2.default, { className: 'bookIcon' })
            )
        );
    }
}

exports.default = AppointmentList;

/***/ }),

/***/ "./dev/js/components/commons/userAppointments/appointmentList/index.js":
/*!*****************************************************************************!*\
  !*** ./dev/js/components/commons/userAppointments/appointmentList/index.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _AppointmentList = __webpack_require__(/*! ./AppointmentList.js */ "./dev/js/components/commons/userAppointments/appointmentList/AppointmentList.js");

var _AppointmentList2 = _interopRequireDefault(_AppointmentList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _AppointmentList2.default;

/***/ }),

/***/ "./dev/js/components/commons/userAppointments/index.js":
/*!*************************************************************!*\
  !*** ./dev/js/components/commons/userAppointments/index.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _UserAppointmentsView = __webpack_require__(/*! ./UserAppointmentsView.js */ "./dev/js/components/commons/userAppointments/UserAppointmentsView.js");

var _UserAppointmentsView2 = _interopRequireDefault(_UserAppointmentsView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _UserAppointmentsView2.default;

/***/ }),

/***/ "./dev/js/components/commons/userProfile/UserProfileView.js":
/*!******************************************************************!*\
  !*** ./dev/js/components/commons/userProfile/UserProfileView.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(/*! react */ "react");

var _react2 = _interopRequireDefault(_react);

var _index = __webpack_require__(/*! ../profileSlider/index.js */ "./dev/js/components/commons/profileSlider/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = __webpack_require__(/*! ./profileData/index.js */ "./dev/js/components/commons/userProfile/profileData/index.js");

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UserProfileView extends _react2.default.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.props.getUserProfile();
    }

    render() {

        let selectedUser = null;
        let userProfileId = this.props.match.params.id;

        if (this.props.USER.profiles[userProfileId]) {
            selectedUser = this.props.USER.profiles[userProfileId];
        } else {
            Object.keys(this.props.USER.profiles).map(profileId => {
                if (this.props.USER.profiles[profileId].isDefaultUser) {
                    selectedUser = this.props.USER.profiles[profileId];
                }
            });
        }

        return _react2.default.createElement(
            'div',
            { className: 'userProfile' },
            selectedUser ? _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(_index2.default, {
                    profiles: this.props.USER.profiles,
                    subRoute: ''
                }),
                _react2.default.createElement(_index4.default, {
                    profileData: selectedUser
                })
            ) : ""
        );
    }
}

UserProfileView.contextTypes = {
    router: () => null
};
exports.default = UserProfileView;

/***/ }),

/***/ "./dev/js/components/commons/userProfile/index.js":
/*!********************************************************!*\
  !*** ./dev/js/components/commons/userProfile/index.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _UserProfileView = __webpack_require__(/*! ./UserProfileView.js */ "./dev/js/components/commons/userProfile/UserProfileView.js");

var _UserProfileView2 = _interopRequireDefault(_UserProfileView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _UserProfileView2.default;

/***/ }),

/***/ "./dev/js/components/commons/userProfile/profileData/ProfileData.js":
/*!**************************************************************************!*\
  !*** ./dev/js/components/commons/userProfile/profileData/ProfileData.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(/*! react */ "react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ProfileData extends _react2.default.Component {
    constructor(props) {
        super(props);
    }

    openAppointments(profileId) {
        this.context.router.history.push(`/user/${profileId}/appointments`);
    }

    openReports(profileId) {
        this.context.router.history.push(`/user/${profileId}/reports`);
    }

    render() {

        let { name, gender, age, mobile, medicalHistoryCount, medicalTestCount, onlineConsultationCount, opdVisitCount, profileId } = this.props.profileData;

        return _react2.default.createElement(
            "div",
            null,
            _react2.default.createElement(
                "div",
                { className: "userDeail" },
                _react2.default.createElement(
                    "p",
                    null,
                    name
                ),
                _react2.default.createElement(
                    "p",
                    null,
                    age,
                    " Years"
                ),
                _react2.default.createElement(
                    "p",
                    null,
                    gender
                ),
                _react2.default.createElement(
                    "p",
                    null,
                    mobile
                )
            ),
            _react2.default.createElement(
                "div",
                { className: "profileBtns" },
                _react2.default.createElement(
                    "button",
                    null,
                    "Profile Not Verified"
                ),
                _react2.default.createElement(
                    "button",
                    null,
                    "No OPD Insurance"
                ),
                _react2.default.createElement(
                    "button",
                    null,
                    "Online Consultations(",
                    onlineConsultationCount,
                    ")"
                ),
                _react2.default.createElement(
                    "button",
                    { onClick: this.openAppointments.bind(this, profileId) },
                    "OPD Visits (",
                    opdVisitCount,
                    ")"
                ),
                _react2.default.createElement(
                    "button",
                    null,
                    "Medical History (",
                    medicalHistoryCount,
                    ")"
                ),
                _react2.default.createElement(
                    "button",
                    { onClick: this.openReports.bind(this, profileId) },
                    "Test Reports (",
                    medicalTestCount,
                    ")"
                )
            )
        );
    }
}

ProfileData.contextTypes = {
    router: () => null
};
exports.default = ProfileData;

/***/ }),

/***/ "./dev/js/components/commons/userProfile/profileData/index.js":
/*!********************************************************************!*\
  !*** ./dev/js/components/commons/userProfile/profileData/index.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ProfileData = __webpack_require__(/*! ./ProfileData.js */ "./dev/js/components/commons/userProfile/profileData/ProfileData.js");

var _ProfileData2 = _interopRequireDefault(_ProfileData);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _ProfileData2.default;

/***/ }),

/***/ "./dev/js/components/commons/userReports/UserReportsView.js":
/*!******************************************************************!*\
  !*** ./dev/js/components/commons/userReports/UserReportsView.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(/*! react */ "react");

var _react2 = _interopRequireDefault(_react);

var _index = __webpack_require__(/*! ../profileSlider/index.js */ "./dev/js/components/commons/profileSlider/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = __webpack_require__(/*! ./reportList/index.js */ "./dev/js/components/commons/userReports/reportList/index.js");

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UserReportsView extends _react2.default.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.props.getUserProfileWithTests();
    }

    render() {

        let selectedUser = null;
        let userProfileId = this.props.match.params.id;

        if (this.props.USER.profiles[userProfileId]) {
            selectedUser = this.props.USER.profiles[userProfileId];
        } else {
            // selecting default user
            Object.keys(this.props.USER.profiles).map(profileId => {
                if (this.props.USER.profiles[profileId].isDefaultUser) {
                    selectedUser = this.props.USER.profiles[profileId];
                }
            });
        }

        return _react2.default.createElement(
            'div',
            { className: 'userProfile' },
            selectedUser && selectedUser.tests ? _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(_index2.default, {
                    profiles: this.props.USER.profiles,
                    subRoute: '/reports'
                }),
                _react2.default.createElement(
                    'p',
                    { className: 'upcomingapp' },
                    'Reports'
                ),
                selectedUser.tests.map((test, i) => {
                    return _react2.default.createElement(_index4.default, {
                        data: test,
                        key: i
                    });
                })
            ) : ""
        );
    }
}

UserReportsView.contextTypes = {
    router: () => null
};
exports.default = UserReportsView;

/***/ }),

/***/ "./dev/js/components/commons/userReports/index.js":
/*!********************************************************!*\
  !*** ./dev/js/components/commons/userReports/index.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _UserReportsView = __webpack_require__(/*! ./UserReportsView.js */ "./dev/js/components/commons/userReports/UserReportsView.js");

var _UserReportsView2 = _interopRequireDefault(_UserReportsView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _UserReportsView2.default;

/***/ }),

/***/ "./dev/js/components/commons/userReports/reportList/ReportList.js":
/*!************************************************************************!*\
  !*** ./dev/js/components/commons/userReports/reportList/ReportList.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(/*! react */ "react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ReportList extends _react2.default.Component {
    constructor(props) {
        super(props);
    }

    render() {

        let { name, sub_name, abbreviation, category, slot } = this.props.data;
        slot = slot || {
            start: 0,
            end: 0
        };
        let date = new Date(slot.start).toDateString();

        return _react2.default.createElement(
            "div",
            { className: "appointment" },
            _react2.default.createElement(
                "div",
                { className: "details" },
                _react2.default.createElement(
                    "p",
                    null,
                    name + " , " + sub_name
                ),
                _react2.default.createElement(
                    "p",
                    null,
                    category + " , " + abbreviation
                ),
                _react2.default.createElement(
                    "p",
                    null,
                    date
                )
            ),
            _react2.default.createElement(
                "div",
                { className: "book" },
                _react2.default.createElement(
                    "span",
                    { className: "viewreport" },
                    "View Report"
                )
            )
        );
    }
}

exports.default = ReportList;

/***/ }),

/***/ "./dev/js/components/commons/userReports/reportList/index.js":
/*!*******************************************************************!*\
  !*** ./dev/js/components/commons/userReports/reportList/index.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ReportList = __webpack_require__(/*! ./ReportList.js */ "./dev/js/components/commons/userReports/reportList/ReportList.js");

var _ReportList2 = _interopRequireDefault(_ReportList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _ReportList2.default;

/***/ }),

/***/ "./dev/js/components/commons/userSignup/UserSignup.js":
/*!************************************************************!*\
  !*** ./dev/js/components/commons/userSignup/UserSignup.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(/*! react */ "react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UserSignupView extends _react2.default.Component {
    constructor(props) {
        super(props);
        this.state = {
            appoinmentFor: 'self',
            patientName: '',
            age: '',
            gender: 'm',
            email: '',
            phoneNumber: ''
        };
    }

    inputHandler(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    submitForm() {}

    render() {

        return _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
                'header',
                { className: 'skin-white fixed horizontal top bdr-1 bottom light' },
                _react2.default.createElement(
                    'div',
                    { className: 'container-fluid' },
                    _react2.default.createElement(
                        'div',
                        { className: 'row' },
                        _react2.default.createElement(
                            'div',
                            { className: 'col-2' },
                            _react2.default.createElement(
                                'ul',
                                { className: 'inline-list' },
                                _react2.default.createElement(
                                    'li',
                                    null,
                                    _react2.default.createElement(
                                        'span',
                                        { className: 'icon icon-sm text-middle back-icon-white' },
                                        _react2.default.createElement('img', { src: '/assets/img/customer-icons/back-icon.png', className: 'img-fluid' })
                                    )
                                )
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'col-8' },
                            _react2.default.createElement(
                                'div',
                                { className: 'header-title fw-700 capitalize text-center' },
                                'Add User Profile'
                            )
                        ),
                        _react2.default.createElement('div', { className: 'col-2' })
                    )
                )
            ),
            _react2.default.createElement(
                'section',
                { className: 'wrap validation-book-screen' },
                _react2.default.createElement(
                    'div',
                    { className: 'widget no-round no-shadow' },
                    _react2.default.createElement(
                        'div',
                        { className: 'widget-header' },
                        _react2.default.createElement(
                            'h4',
                            { className: 'widget-title' },
                            'Contact Details'
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'widget-content' },
                        _react2.default.createElement(
                            'form',
                            { className: 'go-bottom' },
                            _react2.default.createElement(
                                'div',
                                { className: 'form-group input-group' },
                                _react2.default.createElement(
                                    'label',
                                    { className: 'inline input-label' },
                                    'Appointment for'
                                ),
                                _react2.default.createElement(
                                    'div',
                                    { className: 'choose-gender' },
                                    _react2.default.createElement(
                                        'label',
                                        { className: 'radio-inline' },
                                        _react2.default.createElement('input', { value: 'self', onChange: this.inputHandler.bind(this), checked: this.state.appoinmentFor == 'self', type: 'radio', name: 'appoinmentFor' }),
                                        'Self'
                                    ),
                                    _react2.default.createElement(
                                        'label',
                                        { className: 'radio-inline' },
                                        _react2.default.createElement('input', { value: 'else', onChange: this.inputHandler.bind(this), checked: this.state.appoinmentFor == 'else', type: 'radio', name: 'appoinmentFor' }),
                                        'Someone else'
                                    )
                                )
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'labelWrap' },
                                _react2.default.createElement('input', { id: 'fname', name: 'patientName', type: 'text', value: this.state.patientName, onChange: this.inputHandler.bind(this), required: true }),
                                _react2.default.createElement(
                                    'label',
                                    { htmlFor: 'fname' },
                                    'Patient Name'
                                ),
                                _react2.default.createElement(
                                    'span',
                                    { className: 'text-xs text-light' },
                                    '(Appoinment valid only for the provided name)'
                                )
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'labelWrap' },
                                _react2.default.createElement('input', { id: 'age', name: 'age', type: 'text', value: this.state.age, onChange: this.inputHandler.bind(this), required: true }),
                                _react2.default.createElement(
                                    'label',
                                    { htmlFor: 'age' },
                                    'Age'
                                )
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'form-group input-group' },
                                _react2.default.createElement(
                                    'label',
                                    { className: 'inline input-label' },
                                    'Gender'
                                ),
                                _react2.default.createElement(
                                    'div',
                                    { className: 'choose-gender' },
                                    _react2.default.createElement(
                                        'label',
                                        { className: 'radio-inline' },
                                        _react2.default.createElement('input', { value: 'm', onChange: this.inputHandler.bind(this), checked: this.state.gender == 'm', type: 'radio', name: 'gender' }),
                                        'Male'
                                    ),
                                    _react2.default.createElement(
                                        'label',
                                        { className: 'radio-inline' },
                                        _react2.default.createElement('input', { value: 'f', onChange: this.inputHandler.bind(this), checked: this.state.gender == 'f', type: 'radio', name: 'gender' }),
                                        'Female'
                                    ),
                                    _react2.default.createElement(
                                        'label',
                                        { className: 'radio-inline' },
                                        _react2.default.createElement('input', { value: 'o', onChange: this.inputHandler.bind(this), checked: this.state.gender == 'o', type: 'radio', name: 'gender' }),
                                        'Other'
                                    )
                                )
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'labelWrap' },
                                _react2.default.createElement('input', { id: 'email', name: 'email', type: 'text', value: this.state.email, onChange: this.inputHandler.bind(this), required: true }),
                                _react2.default.createElement(
                                    'label',
                                    { htmlFor: 'email' },
                                    'Email'
                                )
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'labelWrap' },
                                _react2.default.createElement('input', { id: 'number', name: 'phoneNumber', type: 'text', value: this.state.phoneNumber, onChange: this.inputHandler.bind(this), required: true }),
                                _react2.default.createElement(
                                    'label',
                                    { htmlFor: 'number' },
                                    'Mobile Number'
                                )
                            )
                        )
                    )
                )
            ),
            _react2.default.createElement(
                'button',
                { className: 'v-btn v-btn-primary btn-lg fixed horizontal bottom no-round btn-lg text-lg', onClick: this.submitForm.bind(this) },
                'Continue'
            )
        );
    }
}

exports.default = UserSignupView;

/***/ }),

/***/ "./dev/js/components/commons/userSignup/index.js":
/*!*******************************************************!*\
  !*** ./dev/js/components/commons/userSignup/index.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _UserSignup = __webpack_require__(/*! ./UserSignup */ "./dev/js/components/commons/userSignup/UserSignup.js");

var _UserSignup2 = _interopRequireDefault(_UserSignup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _UserSignup2.default;

/***/ }),

/***/ "./dev/js/components/diagnosis/bookingSummary/BookingSummaryView.js":
/*!**************************************************************************!*\
  !*** ./dev/js/components/diagnosis/bookingSummary/BookingSummaryView.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(/*! react */ "react");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(/*! react-redux */ "react-redux");

var _Loader = __webpack_require__(/*! ../../commons/Loader */ "./dev/js/components/commons/Loader/index.js");

var _Loader2 = _interopRequireDefault(_Loader);

var _visitTime = __webpack_require__(/*! ./visitTime */ "./dev/js/components/diagnosis/bookingSummary/visitTime.js");

var _visitTime2 = _interopRequireDefault(_visitTime);

var _pickupAddress = __webpack_require__(/*! ./pickupAddress */ "./dev/js/components/diagnosis/bookingSummary/pickupAddress.js");

var _pickupAddress2 = _interopRequireDefault(_pickupAddress);

var _choosePatient = __webpack_require__(/*! ./choosePatient */ "./dev/js/components/diagnosis/bookingSummary/choosePatient.js");

var _choosePatient2 = _interopRequireDefault(_choosePatient);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class BookingSummaryView extends _react2.default.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedLab: this.props.match.params.id,
            pickupType: "lab"
        };
    }

    componentDidMount() {
        this.props.getLabById(this.state.selectedLab);
    }

    openTests() {
        this.props.history.push(`/lab/${this.state.selectedLab}/tests`);
    }

    handlePickupType(e) {
        this.setState({ pickupType: e.target.value });
    }

    getSelectors() {
        switch (this.state.pickupType) {
            case "lab":
                {
                    return _react2.default.createElement(
                        'div',
                        null,
                        _react2.default.createElement(_visitTime2.default, { type: 'lab' }),
                        _react2.default.createElement(_choosePatient2.default, null)
                    );
                }

            case "home":
                {
                    return _react2.default.createElement(
                        'div',
                        null,
                        _react2.default.createElement(_visitTime2.default, { type: 'home' }),
                        _react2.default.createElement(_choosePatient2.default, null),
                        _react2.default.createElement(_pickupAddress2.default, null)
                    );
                }
        }
    }

    render() {

        let tests = [];
        let finalPrice = 0;
        let labDetail = {};

        if (this.props.LABS[this.state.selectedLab]) {
            labDetail = this.props.LABS[this.state.selectedLab].lab;
            tests = this.props.selectedCriterias.filter(x => x.type == 'test').map((test, i) => {
                let price = 0;
                this.props.LABS[this.state.selectedLab].tests.map(twp => {
                    if (twp.test_id == test.id) {
                        price = twp.mrp;
                    }
                });
                finalPrice += price;
                return _react2.default.createElement(
                    'p',
                    { key: i, className: 'test-list' },
                    test.name,
                    _react2.default.createElement(
                        'span',
                        { className: 'float-right fw-700' },
                        'Rs. ',
                        price
                    )
                );
            });
        }

        return _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
                'header',
                { className: 'skin-white fixed horizontal top bdr-1 bottom light' },
                _react2.default.createElement(
                    'div',
                    { className: 'container-fluid' },
                    _react2.default.createElement(
                        'div',
                        { className: 'row' },
                        _react2.default.createElement(
                            'div',
                            { className: 'col-2' },
                            _react2.default.createElement(
                                'ul',
                                { className: 'inline-list' },
                                _react2.default.createElement(
                                    'li',
                                    { onClick: () => {
                                            this.props.history.go(-1);
                                        } },
                                    _react2.default.createElement(
                                        'span',
                                        { className: 'icon icon-sm text-middle back-icon-white' },
                                        _react2.default.createElement('img', { src: '/assets/img/customer-icons/back-icon.png', className: 'img-fluid' })
                                    )
                                )
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'col-8' },
                            _react2.default.createElement(
                                'div',
                                { className: 'header-title fw-700 capitalize text-center' },
                                'Booking Confirmation'
                            )
                        ),
                        _react2.default.createElement('div', { className: 'col-2' })
                    )
                )
            ),
            this.props.LABS[this.state.selectedLab] ? _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'section',
                    { className: 'wrap booking-confirm-screen' },
                    _react2.default.createElement(
                        'div',
                        { className: 'container-fluid' },
                        _react2.default.createElement(
                            'div',
                            { className: 'row' },
                            _react2.default.createElement(
                                'div',
                                { className: 'col-12' },
                                _react2.default.createElement(
                                    'div',
                                    { className: 'widget mrt-10' },
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'widget-header bdr-1 bottom light text-center' },
                                        _react2.default.createElement(
                                            'ul',
                                            { className: 'inline-list booking-type' },
                                            _react2.default.createElement(
                                                'li',
                                                null,
                                                _react2.default.createElement(
                                                    'label',
                                                    { className: 'radio-inline text-md fw-700 text-primary' },
                                                    _react2.default.createElement('input', { type: 'radio', name: 'optradio', onChange: this.handlePickupType.bind(this), value: 'home', checked: this.state.pickupType == 'home' }),
                                                    ' Home Pick-up'
                                                )
                                            ),
                                            _react2.default.createElement(
                                                'li',
                                                null,
                                                _react2.default.createElement(
                                                    'label',
                                                    { className: 'radio-inline text-md fw-700 text-primary' },
                                                    _react2.default.createElement('input', { type: 'radio', name: 'optradio', onChange: this.handlePickupType.bind(this), value: 'lab', checked: this.state.pickupType == 'lab' }),
                                                    ' Lab Visit'
                                                )
                                            )
                                        )
                                    ),
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'widget-content' },
                                        _react2.default.createElement(
                                            'div',
                                            { className: 'lab-details' },
                                            _react2.default.createElement('img', { src: '/assets/img/customer-icons/lab1.png', className: 'img-fluid' }),
                                            _react2.default.createElement(
                                                'div',
                                                { className: 'lab-title' },
                                                _react2.default.createElement(
                                                    'h4',
                                                    { className: 'fw-700 text-md title' },
                                                    labDetail.name
                                                ),
                                                _react2.default.createElement(
                                                    'p',
                                                    { className: 'fw-500 text-sm text-light' },
                                                    labDetail.address
                                                )
                                            )
                                        ),
                                        this.getSelectors(),
                                        _react2.default.createElement(
                                            'div',
                                            { className: 'lab-visit-time test-report' },
                                            _react2.default.createElement(
                                                'h4',
                                                { className: 'title' },
                                                _react2.default.createElement(
                                                    'span',
                                                    null,
                                                    _react2.default.createElement('img', { src: '/assets/img/customer-icons/test.svg' })
                                                ),
                                                'Tests ',
                                                _react2.default.createElement(
                                                    'span',
                                                    { className: 'float-right' },
                                                    _react2.default.createElement(
                                                        'a',
                                                        { onClick: this.openTests.bind(this), className: 'text-primary fw-700 text-sm' },
                                                        'Change Tests'
                                                    )
                                                )
                                            ),
                                            tests
                                        )
                                    )
                                )
                            )
                        )
                    )
                ),
                _react2.default.createElement(
                    'button',
                    { className: 'v-btn v-btn-primary btn-lg fixed horizontal bottom no-round btn-lg text-lg' },
                    'Proceed to Pay Rs. ',
                    finalPrice
                )
            ) : _react2.default.createElement(_Loader2.default, null)
        );
    }
}

exports.default = BookingSummaryView;

/***/ }),

/***/ "./dev/js/components/diagnosis/bookingSummary/choosePatient.js":
/*!*********************************************************************!*\
  !*** ./dev/js/components/diagnosis/bookingSummary/choosePatient.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(/*! react */ "react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ChoosePatient extends _react2.default.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {

        return _react2.default.createElement(
            "div",
            { className: "lab-visit-time" },
            _react2.default.createElement(
                "h4",
                { className: "title" },
                _react2.default.createElement(
                    "span",
                    null,
                    _react2.default.createElement("img", { src: "/assets/img/customer-icons/clock.svg" })
                ),
                "Patient Details ",
                _react2.default.createElement(
                    "span",
                    { className: "float-right" },
                    _react2.default.createElement(
                        "a",
                        { href: "#", className: "text-primary fw-700 text-sm" },
                        "Pick Patient"
                    )
                )
            ),
            _react2.default.createElement(
                "p",
                { className: "date-time" },
                "Dummy User"
            )
        );
    }
}

exports.default = ChoosePatient;

/***/ }),

/***/ "./dev/js/components/diagnosis/bookingSummary/index.js":
/*!*************************************************************!*\
  !*** ./dev/js/components/diagnosis/bookingSummary/index.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _BookingSummaryView = __webpack_require__(/*! ./BookingSummaryView.js */ "./dev/js/components/diagnosis/bookingSummary/BookingSummaryView.js");

var _BookingSummaryView2 = _interopRequireDefault(_BookingSummaryView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _BookingSummaryView2.default;

/***/ }),

/***/ "./dev/js/components/diagnosis/bookingSummary/pickupAddress.js":
/*!*********************************************************************!*\
  !*** ./dev/js/components/diagnosis/bookingSummary/pickupAddress.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(/*! react */ "react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class PickupAddress extends _react2.default.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {

        return _react2.default.createElement(
            "div",
            { className: "lab-visit-time" },
            _react2.default.createElement(
                "h4",
                { className: "title" },
                _react2.default.createElement(
                    "span",
                    null,
                    _react2.default.createElement("img", { src: "/assets/img/customer-icons/clock.svg" })
                ),
                "Pickup Address ",
                _react2.default.createElement(
                    "span",
                    { className: "float-right" },
                    _react2.default.createElement(
                        "a",
                        { href: "#", className: "text-primary fw-700 text-sm" },
                        "Change Address"
                    )
                )
            ),
            _react2.default.createElement(
                "p",
                { className: "date-time" },
                "18th April | 3:30 PM"
            )
        );
    }
}

exports.default = PickupAddress;

/***/ }),

/***/ "./dev/js/components/diagnosis/bookingSummary/visitTime.js":
/*!*****************************************************************!*\
  !*** ./dev/js/components/diagnosis/bookingSummary/visitTime.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(/*! react */ "react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class VisitTime extends _react2.default.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {

        return _react2.default.createElement(
            "div",
            { className: "lab-visit-time" },
            _react2.default.createElement(
                "h4",
                { className: "title" },
                _react2.default.createElement(
                    "span",
                    null,
                    _react2.default.createElement("img", { src: "/assets/img/customer-icons/clock.svg" })
                ),
                "Visit time ",
                _react2.default.createElement(
                    "span",
                    { className: "float-right" },
                    _react2.default.createElement(
                        "a",
                        { href: "#", className: "text-primary fw-700 text-sm" },
                        "Change Time"
                    )
                )
            ),
            _react2.default.createElement(
                "p",
                { className: "date-time" },
                "18th April | 3:30 PM"
            )
        );
    }
}

exports.default = VisitTime;

/***/ }),

/***/ "./dev/js/components/diagnosis/commons/labDetails/LabDetail.js":
/*!*********************************************************************!*\
  !*** ./dev/js/components/diagnosis/commons/labDetails/LabDetail.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(/*! react */ "react");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(/*! react-redux */ "react-redux");

var _labTests = __webpack_require__(/*! ../labTests */ "./dev/js/components/diagnosis/commons/labTests/index.js");

var _labTests2 = _interopRequireDefault(_labTests);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class LabDetails extends _react2.default.Component {

    constructor(props) {
        super(props);
    }

    render() {

        return _react2.default.createElement(
            'section',
            { className: 'wrap profile-book-screen' },
            _react2.default.createElement(
                'div',
                { className: 'container-fluid' },
                _react2.default.createElement(
                    'div',
                    { className: 'row' },
                    _react2.default.createElement(
                        'div',
                        { className: 'col-12' },
                        _react2.default.createElement(
                            'div',
                            { className: 'widget profile-book' },
                            _react2.default.createElement(
                                'div',
                                { className: 'widget-header pb-header text-center' },
                                _react2.default.createElement(
                                    'div',
                                    { className: 'pb-logo' },
                                    _react2.default.createElement('img', { src: '/assets/img/customer-icons/lab1.png', className: 'img-fluid' })
                                ),
                                _react2.default.createElement(
                                    'h4',
                                    { className: 'widget-title pb-title' },
                                    'SRL Dignostics'
                                ),
                                _react2.default.createElement(
                                    'p',
                                    { className: 'location' },
                                    'Sector 52 Gurgaon | ',
                                    _react2.default.createElement(
                                        'span',
                                        { className: 'ct-img ct-img-xs' },
                                        _react2.default.createElement('img', { src: '/assets/img/customer-icons/map-marker.svg', className: 'img-fluid' })
                                    ),
                                    '1.5KM'
                                ),
                                _react2.default.createElement(
                                    'ul',
                                    { className: 'list time-contact' },
                                    _react2.default.createElement(
                                        'li',
                                        null,
                                        _react2.default.createElement(
                                            'span',
                                            { className: 'fw-700 text-sm' },
                                            'Timing: -'
                                        ),
                                        '7:30 AM to 8:30 PM',
                                        _react2.default.createElement(
                                            'span',
                                            { className: 'open-close' },
                                            'Open Today'
                                        )
                                    ),
                                    _react2.default.createElement(
                                        'li',
                                        null,
                                        _react2.default.createElement(
                                            'span',
                                            { className: 'fw-700 text-sm' },
                                            'Contact: -'
                                        ),
                                        '0120 1234567, 0120 7654321',
                                        _react2.default.createElement(
                                            'span',
                                            { className: 'open-close' },
                                            'Call Now'
                                        )
                                    )
                                )
                            ),
                            _react2.default.createElement(_labTests2.default, this.props),
                            _react2.default.createElement(
                                'div',
                                { className: 'widget-content pb-details pb-location' },
                                _react2.default.createElement(
                                    'h4',
                                    { className: 'wc-title text-md fw-700' },
                                    'Location'
                                ),
                                _react2.default.createElement(
                                    'div',
                                    { className: 'address-details' },
                                    _react2.default.createElement('img', { src: '/assets/img/customer-icons/map-icon.png', className: 'img-fluid add-map' }),
                                    _react2.default.createElement(
                                        'p',
                                        { className: 'add-info' },
                                        '196, Huda Plot, Near, Devinder Vihar, Sector 56, Gurugram, Haryana 122011'
                                    )
                                ),
                                _react2.default.createElement(
                                    'div',
                                    { className: 'pb-view text-left' },
                                    _react2.default.createElement(
                                        'a',
                                        { href: '#', className: 'link-text text-md fw-700' },
                                        'View in Google Map'
                                    )
                                )
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'widget-content pb-details pb-facility' },
                                _react2.default.createElement(
                                    'h4',
                                    { className: 'wc-title text-md fw-700' },
                                    'Facility'
                                ),
                                _react2.default.createElement(
                                    'ul',
                                    { className: 'list pb-list facilty-list' },
                                    _react2.default.createElement(
                                        'li',
                                        null,
                                        'Parking Available'
                                    ),
                                    _react2.default.createElement(
                                        'li',
                                        null,
                                        'Card Accepted'
                                    ),
                                    _react2.default.createElement(
                                        'li',
                                        null,
                                        'E Report Available'
                                    ),
                                    _react2.default.createElement(
                                        'li',
                                        null,
                                        'Home Chekup Available'
                                    )
                                )
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'widget-content pb-details pb-about' },
                                _react2.default.createElement(
                                    'h4',
                                    { className: 'wc-title text-md fw-700' },
                                    'About'
                                ),
                                _react2.default.createElement(
                                    'p',
                                    null,
                                    'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi'
                                )
                            )
                        )
                    )
                )
            )
        );
    }
}

exports.default = LabDetails;

/***/ }),

/***/ "./dev/js/components/diagnosis/commons/labDetails/index.js":
/*!*****************************************************************!*\
  !*** ./dev/js/components/diagnosis/commons/labDetails/index.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _LabDetail = __webpack_require__(/*! ./LabDetail.js */ "./dev/js/components/diagnosis/commons/labDetails/LabDetail.js");

var _LabDetail2 = _interopRequireDefault(_LabDetail);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _LabDetail2.default;

/***/ }),

/***/ "./dev/js/components/diagnosis/commons/labProfileCard/LabProfileCard.js":
/*!******************************************************************************!*\
  !*** ./dev/js/components/diagnosis/commons/labProfileCard/LabProfileCard.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(/*! react */ "react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class LabProfileCard extends _react2.default.Component {
    constructor(props) {
        super(props);
    }

    openLab(id) {
        this.props.history.push(`/lab/${id}`);
    }

    render() {

        let { price, lab } = this.props.details;

        return _react2.default.createElement(
            "div",
            { className: "widget card", onClick: this.openLab.bind(this, this.props.details.lab.id) },
            _react2.default.createElement(
                "div",
                { className: "widget-content card-content book-card" },
                _react2.default.createElement(
                    "div",
                    { className: "logo-ratting" },
                    _react2.default.createElement(
                        "span",
                        { className: "ct-img lab-icon" },
                        _react2.default.createElement("img", { src: "/assets/img/customer-icons/lab1.png", className: "img-fluid" })
                    ),
                    _react2.default.createElement(
                        "ul",
                        { className: "inline-list ratting" },
                        _react2.default.createElement(
                            "li",
                            null,
                            _react2.default.createElement(
                                "span",
                                { className: "ct-img ct-img-xs star-icon" },
                                _react2.default.createElement("img", { src: "/assets/img/customer-icons/star.svg", className: "img-fluid" })
                            )
                        ),
                        _react2.default.createElement(
                            "li",
                            null,
                            _react2.default.createElement(
                                "span",
                                { className: "ct-img ct-img-xs star-icon" },
                                _react2.default.createElement("img", { src: "/assets/img/customer-icons/star.svg", className: "img-fluid" })
                            )
                        ),
                        _react2.default.createElement(
                            "li",
                            null,
                            _react2.default.createElement(
                                "span",
                                { className: "ct-img ct-img-xs star-icon" },
                                _react2.default.createElement("img", { src: "/assets/img/customer-icons/star.svg", className: "img-fluid" })
                            )
                        ),
                        _react2.default.createElement(
                            "li",
                            null,
                            _react2.default.createElement(
                                "span",
                                { className: "ct-img ct-img-xs star-icon" },
                                _react2.default.createElement("img", { src: "/assets/img/customer-icons/star.svg", className: "img-fluid" })
                            )
                        ),
                        _react2.default.createElement(
                            "li",
                            null,
                            _react2.default.createElement(
                                "span",
                                { className: "ct-img ct-img-xs star-icon" },
                                _react2.default.createElement("img", { src: "/assets/img/customer-icons/half-star.svg", className: "img-fluid" })
                            )
                        )
                    ),
                    _react2.default.createElement(
                        "button",
                        { className: "v-btn v-btn-primary pickup-btn" },
                        "Pickup Available"
                    )
                ),
                _react2.default.createElement(
                    "div",
                    { className: "book-card-content" },
                    _react2.default.createElement(
                        "h4",
                        { className: "book-cart-title" },
                        lab.name
                    ),
                    _react2.default.createElement(
                        "p",
                        { className: "desc" },
                        "Blood Test, Pathology Ultrasound, MRI, CTI Sector 52 Gurgaon | ",
                        _react2.default.createElement(
                            "span",
                            { className: "text-primary fw-700" },
                            "1.5 KM"
                        )
                    )
                )
            ),
            _react2.default.createElement(
                "div",
                { className: "widget-footer card-footer" },
                _react2.default.createElement(
                    "div",
                    { className: "row" },
                    _react2.default.createElement(
                        "div",
                        { className: "col-6" },
                        _react2.default.createElement(
                            "p",
                            { className: "lab-price" },
                            "Total Rs ",
                            price
                        )
                    ),
                    _react2.default.createElement(
                        "div",
                        { className: "col-6 text-right" },
                        _react2.default.createElement(
                            "button",
                            { className: "v-btn v-btn-primary btn-md" },
                            "Book Lab"
                        )
                    )
                )
            )
        );
    }
}

exports.default = LabProfileCard;

/***/ }),

/***/ "./dev/js/components/diagnosis/commons/labProfileCard/index.js":
/*!*********************************************************************!*\
  !*** ./dev/js/components/diagnosis/commons/labProfileCard/index.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _LabProfileCard = __webpack_require__(/*! ./LabProfileCard.js */ "./dev/js/components/diagnosis/commons/labProfileCard/LabProfileCard.js");

var _LabProfileCard2 = _interopRequireDefault(_LabProfileCard);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _LabProfileCard2.default;

/***/ }),

/***/ "./dev/js/components/diagnosis/commons/labTests/index.js":
/*!***************************************************************!*\
  !*** ./dev/js/components/diagnosis/commons/labTests/index.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _labTests = __webpack_require__(/*! ./labTests */ "./dev/js/components/diagnosis/commons/labTests/labTests.js");

var _labTests2 = _interopRequireDefault(_labTests);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _labTests2.default;

/***/ }),

/***/ "./dev/js/components/diagnosis/commons/labTests/labTests.js":
/*!******************************************************************!*\
  !*** ./dev/js/components/diagnosis/commons/labTests/labTests.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(/*! react */ "react");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(/*! react-redux */ "react-redux");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class LabTests extends _react2.default.Component {

    constructor(props) {
        super(props);
    }

    openTests() {
        this.props.history.push(`/lab/${this.props.data.lab.id}/tests`);
    }

    render() {

        let tests = [];
        if (this.props.data.tests && this.props.data.tests.length) {
            tests = this.props.data.tests.map((test, i) => {
                return _react2.default.createElement(
                    'li',
                    { key: i },
                    test.test.name,
                    ' ',
                    _react2.default.createElement(
                        'span',
                        { className: 'test-price' },
                        'Rs ',
                        test.mrp
                    )
                );
            });
        }

        return _react2.default.createElement(
            'div',
            { className: 'widget-content pb-details pb-test' },
            _react2.default.createElement(
                'h4',
                { className: 'wc-title text-md fw-700' },
                'Tests (',
                tests.length,
                ')'
            ),
            _react2.default.createElement(
                'ul',
                { className: 'list pb-list pb-test-list' },
                tests.slice(0, 3)
            ),
            _react2.default.createElement(
                'div',
                { className: 'pb-view text-right' },
                _react2.default.createElement(
                    'a',
                    { className: 'link-text text-md fw-700', onClick: this.openTests.bind(this) },
                    'View All'
                )
            )
        );
    }
}

exports.default = LabTests;

/***/ }),

/***/ "./dev/js/components/diagnosis/commons/orderDetails/OrderDetails.js":
/*!**************************************************************************!*\
  !*** ./dev/js/components/diagnosis/commons/orderDetails/OrderDetails.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(/*! react */ "react");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(/*! react-redux */ "react-redux");

var _ExpansionPanel = __webpack_require__(/*! material-ui/ExpansionPanel */ "material-ui/ExpansionPanel");

var _ExpansionPanel2 = _interopRequireDefault(_ExpansionPanel);

var _ExpandMore = __webpack_require__(/*! material-ui-icons/ExpandMore */ "material-ui-icons/ExpandMore");

var _ExpandMore2 = _interopRequireDefault(_ExpandMore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class OrderDetails extends _react2.default.Component {

    constructor(props) {
        super(props);
    }

    render() {

        let price_breakup = [];
        let totalPrice = 0;
        let totalTests = 0;
        if (this.props.data.price_breakup && this.props.data.price_breakup.breakup) {
            price_breakup = this.props.data.price_breakup.breakup.map((test, i) => {
                totalPrice += test.amount;
                totalTests++;
                return _react2.default.createElement(
                    'div',
                    { className: 'testPriceRow', key: i },
                    _react2.default.createElement(
                        'span',
                        { className: 'tname' },
                        test.name
                    ),
                    _react2.default.createElement(
                        'span',
                        { className: 'tamount' },
                        'Rs. ',
                        test.amount
                    )
                );
            });
        }

        return _react2.default.createElement(
            'div',
            { className: 'orderDetails' },
            _react2.default.createElement(
                _ExpansionPanel2.default,
                null,
                _react2.default.createElement(
                    _ExpansionPanel.ExpansionPanelSummary,
                    { expandIcon: _react2.default.createElement(_ExpandMore2.default, null) },
                    'Order Details - ',
                    totalTests,
                    ' Tests'
                ),
                _react2.default.createElement(
                    _ExpansionPanel.ExpansionPanelDetails,
                    null,
                    _react2.default.createElement(
                        'div',
                        { className: 'priceCont' },
                        price_breakup,
                        _react2.default.createElement(
                            'div',
                            { className: 'testTotalRow' },
                            _react2.default.createElement(
                                'span',
                                { className: 'tname' },
                                "Total"
                            ),
                            _react2.default.createElement(
                                'span',
                                { className: 'tamount' },
                                'Rs. ',
                                totalPrice
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'testTotalRow' },
                            _react2.default.createElement(
                                'span',
                                { className: 'tname' },
                                "GST"
                            ),
                            _react2.default.createElement(
                                'span',
                                { className: 'tamount' },
                                'Rs. ',
                                totalPrice * 1.18
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'testTotalRow' },
                            _react2.default.createElement(
                                'span',
                                { className: 'tname' },
                                "Payable"
                            ),
                            _react2.default.createElement(
                                'span',
                                { className: 'tamount' },
                                'Rs. ',
                                totalPrice * 1.18
                            )
                        )
                    )
                )
            )
        );
    }
}

exports.default = OrderDetails;

/***/ }),

/***/ "./dev/js/components/diagnosis/commons/orderDetails/index.js":
/*!*******************************************************************!*\
  !*** ./dev/js/components/diagnosis/commons/orderDetails/index.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _OrderDetails = __webpack_require__(/*! ./OrderDetails.js */ "./dev/js/components/diagnosis/commons/orderDetails/OrderDetails.js");

var _OrderDetails2 = _interopRequireDefault(_OrderDetails);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _OrderDetails2.default;

/***/ }),

/***/ "./dev/js/components/diagnosis/lab/LabView.js":
/*!****************************************************!*\
  !*** ./dev/js/components/diagnosis/lab/LabView.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__(/*! react */ "react");

var _react2 = _interopRequireDefault(_react);

var _index = __webpack_require__(/*! ../commons/labDetails/index.js */ "./dev/js/components/diagnosis/commons/labDetails/index.js");

var _index2 = _interopRequireDefault(_index);

var _Loader = __webpack_require__(/*! ../../commons/Loader */ "./dev/js/components/commons/Loader/index.js");

var _Loader2 = _interopRequireDefault(_Loader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class LabView extends _react2.default.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedLab: this.props.match.params.id
        };
    }

    bookLab() {
        this.props.history.push(`/lab/${this.state.selectedLab}/book`);
    }

    render() {

        return _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
                'header',
                { className: 'skin-primary fixed horizontal top profile-book-header' },
                _react2.default.createElement(
                    'div',
                    { className: 'container-fluid' },
                    _react2.default.createElement(
                        'div',
                        { className: 'row' },
                        _react2.default.createElement(
                            'div',
                            { className: 'col-4' },
                            _react2.default.createElement(
                                'div',
                                { className: 'header-title fw-700 capitalize text-white' },
                                'ICON'
                            )
                        ),
                        _react2.default.createElement('div', { className: 'col-4' }),
                        _react2.default.createElement(
                            'div',
                            { className: 'col-4' },
                            _react2.default.createElement(
                                'ul',
                                { className: 'inline-list float-right user-notification-action' },
                                _react2.default.createElement(
                                    'li',
                                    null,
                                    _react2.default.createElement(
                                        'span',
                                        { className: 'icon icon-md text-middle' },
                                        _react2.default.createElement('img', { src: '/assets/img/customer-icons/user.svg', className: 'img-fluid' })
                                    )
                                ),
                                _react2.default.createElement(
                                    'li',
                                    null,
                                    _react2.default.createElement(
                                        'span',
                                        { className: 'icon icon-md text-middle notification-icon' },
                                        _react2.default.createElement('img', { src: '/assets/img/customer-icons/notification.svg', className: 'img-fluid' }),
                                        ' ',
                                        _react2.default.createElement('span', { className: 'notification-alert' })
                                    )
                                )
                            )
                        )
                    )
                )
            ),
            this.props.LABS[this.state.selectedLab] ? _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement('div', { className: 'skin-primary empty-header ' }),
                _react2.default.createElement(_index2.default, _extends({}, this.props, { data: this.props.LABS[this.state.selectedLab] })),
                _react2.default.createElement(
                    'button',
                    { onClick: this.bookLab.bind(this), className: 'v-btn v-btn-primary btn-lg fixed horizontal bottom no-round btn-lg text-lg' },
                    _react2.default.createElement(
                        'span',
                        { className: 'text-xs selected-option' },
                        '(',
                        this.props.selectedCriterias.length,
                        ' Selected) '
                    ),
                    'Book'
                )
            ) : _react2.default.createElement(_Loader2.default, null)
        );
    }
}

exports.default = LabView;

/***/ }),

/***/ "./dev/js/components/diagnosis/lab/index.js":
/*!**************************************************!*\
  !*** ./dev/js/components/diagnosis/lab/index.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _LabView = __webpack_require__(/*! ./LabView.js */ "./dev/js/components/diagnosis/lab/LabView.js");

var _LabView2 = _interopRequireDefault(_LabView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _LabView2.default;

/***/ }),

/***/ "./dev/js/components/diagnosis/patientDetails/PatientDetailsView.js":
/*!**************************************************************************!*\
  !*** ./dev/js/components/diagnosis/patientDetails/PatientDetailsView.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(/*! react */ "react");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(/*! react-redux */ "react-redux");

var _index = __webpack_require__(/*! ../commons/labDetails/index.js */ "./dev/js/components/diagnosis/commons/labDetails/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = __webpack_require__(/*! ../commons/orderDetails/index.js */ "./dev/js/components/diagnosis/commons/orderDetails/index.js");

var _index4 = _interopRequireDefault(_index3);

var _index5 = __webpack_require__(/*! ./detailsForm/index.js */ "./dev/js/components/diagnosis/patientDetails/detailsForm/index.js");

var _index6 = _interopRequireDefault(_index5);

var _index7 = __webpack_require__(/*! ./addressForm/index.js */ "./dev/js/components/diagnosis/patientDetails/addressForm/index.js");

var _index8 = _interopRequireDefault(_index7);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class PatientDetailsView extends _react2.default.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedLab: null,
            selectedTests: "",
            selectedSlot: null,
            selectedSlotStart: null,
            selectedSlotEnd: null
        };
    }

    getLocationParam(tag) {
        // this API assumes the context of react-router-4
        const paramString = this.props.location.search;
        const params = new URLSearchParams(paramString);
        return params.get(tag);
    }

    proceed() {
        this.context.router.history.push('/lab/booking/summary/IUHBUH8787UHB');
    }

    componentDidMount() {
        let labId = this.props.match.params.id;
        let tests = this.getLocationParam('tests');
        let selectedSlotStart = this.getLocationParam('t_start');
        selectedSlotStart = new Date(parseFloat(selectedSlotStart));
        selectedSlotStart = selectedSlotStart.toString();
        let selectedSlotEnd = this.getLocationParam('t_end');
        selectedSlotEnd = new Date(parseFloat(selectedSlotEnd));
        selectedSlotEnd = selectedSlotEnd.toString();
        if (labId) {
            this.setState({ selectedLab: labId, selectedTests: tests, selectedSlotStart, selectedSlotEnd });
            this.props.getLabById(labId);
        }
    }

    render() {

        return _react2.default.createElement(
            'div',
            { className: 'patientDetails' },
            this.props.LABS[this.state.selectedLab] ? _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(_index2.default, { data: this.props.LABS[this.state.selectedLab] }),
                _react2.default.createElement(_index4.default, { data: this.props.LABS[this.state.selectedLab] }),
                _react2.default.createElement(
                    'div',
                    { className: 'selectedAppointmentSlot' },
                    _react2.default.createElement(
                        'h5',
                        null,
                        'Selected Appointment Slot'
                    ),
                    _react2.default.createElement(
                        'span',
                        { className: 'appdate' },
                        'Appointment Date'
                    ),
                    _react2.default.createElement(
                        'span',
                        { className: 'date' },
                        this.state.selectedSlotStart
                    )
                ),
                _react2.default.createElement(_index6.default, null),
                _react2.default.createElement(_index8.default, { city: 'Selected value' }),
                _react2.default.createElement(
                    'button',
                    { className: 'proceedbtn', onClick: this.proceed.bind(this) },
                    'Proceed'
                )
            ) : ""
        );
    }
}

PatientDetailsView.contextTypes = {
    router: () => null
};
exports.default = PatientDetailsView;

/***/ }),

/***/ "./dev/js/components/diagnosis/patientDetails/addressForm/AddressForm.js":
/*!*******************************************************************************!*\
  !*** ./dev/js/components/diagnosis/patientDetails/addressForm/AddressForm.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(/*! react */ "react");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(/*! react-redux */ "react-redux");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class AddressForm extends _react2.default.Component {
    constructor(props) {
        super(props);
        this.state = {
            address: '',
            locality: '',
            landmark: '',
            pincode: '',
            city: props.city

        };
    }

    inputHandler(which, e) {
        this.setState({ [which]: e.target.value });
    }

    render() {

        return _react2.default.createElement(
            'div',
            { className: 'detailsForm' },
            _react2.default.createElement(
                'h5',
                null,
                'Please provide patient details'
            ),
            _react2.default.createElement('input', { value: this.state.address, onChange: this.inputHandler.bind(this, 'address'), className: 'ptname', placeholder: 'Address*' }),
            _react2.default.createElement('input', { value: this.state.locality, onChange: this.inputHandler.bind(this, 'locality'), className: 'ptname', placeholder: 'Locality*' }),
            _react2.default.createElement('input', { value: this.state.landmark, onChange: this.inputHandler.bind(this, 'landmark'), className: 'ptname', placeholder: 'Landmark*' }),
            _react2.default.createElement('input', { value: this.state.pincode, onChange: this.inputHandler.bind(this, 'pincode'), className: 'ptmobile', placeholder: 'Pincode*' })
        );
    }
}

exports.default = AddressForm;

/***/ }),

/***/ "./dev/js/components/diagnosis/patientDetails/addressForm/index.js":
/*!*************************************************************************!*\
  !*** ./dev/js/components/diagnosis/patientDetails/addressForm/index.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _AddressForm = __webpack_require__(/*! ./AddressForm.js */ "./dev/js/components/diagnosis/patientDetails/addressForm/AddressForm.js");

var _AddressForm2 = _interopRequireDefault(_AddressForm);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _AddressForm2.default;

/***/ }),

/***/ "./dev/js/components/diagnosis/patientDetails/detailsForm/DetailsForm.js":
/*!*******************************************************************************!*\
  !*** ./dev/js/components/diagnosis/patientDetails/detailsForm/DetailsForm.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(/*! react */ "react");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(/*! react-redux */ "react-redux");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class DetailsForm extends _react2.default.Component {
    constructor(props) {
        super(props);
        this.state = {
            patientName: '',
            patientEmail: '',
            patientGender: 'male',
            mobile: '',
            otp: '',
            patientMobile: ''

        };
    }

    inputHandler(which, e) {
        this.setState({ [which]: e.target.value });
    }

    render() {

        return _react2.default.createElement(
            'div',
            { className: 'detailsForm' },
            _react2.default.createElement(
                'h5',
                null,
                'Please provide patient details'
            ),
            _react2.default.createElement('input', { value: this.state.patientName, onChange: this.inputHandler.bind(this, 'patientName'), className: 'ptname', placeholder: 'Patient Name*' }),
            _react2.default.createElement('input', { value: this.state.patientEmail, onChange: this.inputHandler.bind(this, 'patientEmail'), className: 'ptemail', placeholder: 'Email*' }),
            _react2.default.createElement(
                'div',
                { className: 'ptgender' },
                _react2.default.createElement(
                    'span',
                    null,
                    'Gender :'
                ),
                _react2.default.createElement('input', { type: 'radio', name: 'gender', value: 'male', checked: this.state.patientGender === "male", onChange: this.inputHandler.bind(this, 'patientGender') }),
                ' Male',
                _react2.default.createElement('input', { type: 'radio', name: 'gender', value: 'female', checked: this.state.patientGender === "female", onChange: this.inputHandler.bind(this, 'patientGender') }),
                ' Female'
            ),
            _react2.default.createElement('input', { value: this.state.mobile, onChange: this.inputHandler.bind(this, 'mobile'), className: 'ptmobile', placeholder: 'Mobile*' }),
            _react2.default.createElement(
                'button',
                { className: 'otpbtn' },
                '(Re)Send OTP'
            ),
            _react2.default.createElement('input', { value: this.state.otp, onChange: this.inputHandler.bind(this, 'otp'), className: 'ptotp', placeholder: 'Enter OTP*' }),
            _react2.default.createElement('input', { value: this.state.patientMobile, onChange: this.inputHandler.bind(this, 'patientMobile'), className: 'ptmobile', placeholder: 'Patient Mobile*' })
        );
    }
}

exports.default = DetailsForm;

/***/ }),

/***/ "./dev/js/components/diagnosis/patientDetails/detailsForm/index.js":
/*!*************************************************************************!*\
  !*** ./dev/js/components/diagnosis/patientDetails/detailsForm/index.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _DetailsForm = __webpack_require__(/*! ./DetailsForm.js */ "./dev/js/components/diagnosis/patientDetails/detailsForm/DetailsForm.js");

var _DetailsForm2 = _interopRequireDefault(_DetailsForm);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _DetailsForm2.default;

/***/ }),

/***/ "./dev/js/components/diagnosis/patientDetails/index.js":
/*!*************************************************************!*\
  !*** ./dev/js/components/diagnosis/patientDetails/index.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _PatientDetailsView = __webpack_require__(/*! ./PatientDetailsView.js */ "./dev/js/components/diagnosis/patientDetails/PatientDetailsView.js");

var _PatientDetailsView2 = _interopRequireDefault(_PatientDetailsView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _PatientDetailsView2.default;

/***/ }),

/***/ "./dev/js/components/diagnosis/searchCriteria/SearchCriteriaView.js":
/*!**************************************************************************!*\
  !*** ./dev/js/components/diagnosis/searchCriteria/SearchCriteriaView.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__(/*! react */ "react");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(/*! react-redux */ "react-redux");

var _index = __webpack_require__(/*! ../../commons/commonlySearched/index.js */ "./dev/js/components/commons/commonlySearched/index.js");

var _index2 = _interopRequireDefault(_index);

var _criteriaSearch = __webpack_require__(/*! ../../commons/criteriaSearch */ "./dev/js/components/commons/criteriaSearch/index.js");

var _criteriaSearch2 = _interopRequireDefault(_criteriaSearch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class SearchCriteriaView extends _react2.default.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    searchProceed() {
        let searchData = {
            selectedCriterias: this.props.selectedCriterias,
            selectedLocation: this.props.selectedLocation
        };
        searchData = encodeURIComponent(JSON.stringify(searchData));
        let filterData = encodeURIComponent(JSON.stringify(this.props.filterCriteria));
        this.props.history.push(`/dx/searchresults?search=${searchData}&filter=${filterData}`);
    }

    render() {

        return _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
                _criteriaSearch2.default,
                _extends({}, this.props, { checkForLoad: this.props.LOADED_SEARCH_CRITERIA_LAB, title: 'Search for Test and Labs.' }),
                _react2.default.createElement(
                    'section',
                    { className: 'wrap wrap-100' },
                    _react2.default.createElement(_index2.default, {
                        heading: 'Selected Criteria',
                        data: this.props.selectedCriterias,
                        selected: [],
                        toggle: this.props.toggleDiagnosisCriteria.bind(this)
                    }),
                    _react2.default.createElement(_index2.default, {
                        heading: 'Common Test',
                        type: 'test',
                        data: this.props.common_tests,
                        selected: this.props.selectedCriterias.filter(x => x.type == 'test'),
                        toggle: this.props.toggleDiagnosisCriteria.bind(this)
                    }),
                    _react2.default.createElement(_index2.default, {
                        heading: 'Common Conditions',
                        type: 'lab',
                        data: this.props.common_conditions,
                        selected: this.props.selectedCriterias.filter(x => x.type == 'lab'),
                        toggle: this.props.toggleDiagnosisCriteria.bind(this)
                    }),
                    _react2.default.createElement(_index2.default, {
                        heading: 'Common Labs',
                        type: 'lab',
                        data: this.props.preferred_labs
                    })
                )
            ),
            _react2.default.createElement(
                'button',
                { onClick: this.searchProceed.bind(this), className: 'v-btn v-btn-primary btn-lg fixed horizontal bottom no-round text-lg' },
                'Show Labs'
            )
        );
    }
}

exports.default = SearchCriteriaView;

/***/ }),

/***/ "./dev/js/components/diagnosis/searchCriteria/index.js":
/*!*************************************************************!*\
  !*** ./dev/js/components/diagnosis/searchCriteria/index.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _SearchCriteriaView = __webpack_require__(/*! ./SearchCriteriaView.js */ "./dev/js/components/diagnosis/searchCriteria/SearchCriteriaView.js");

var _SearchCriteriaView2 = _interopRequireDefault(_SearchCriteriaView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _SearchCriteriaView2.default;

/***/ }),

/***/ "./dev/js/components/diagnosis/searchResults/SearchResultsView.js":
/*!************************************************************************!*\
  !*** ./dev/js/components/diagnosis/searchResults/SearchResultsView.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__(/*! react */ "react");

var _react2 = _interopRequireDefault(_react);

var _index = __webpack_require__(/*! ../searchResults/labsList/index.js */ "./dev/js/components/diagnosis/searchResults/labsList/index.js");

var _index2 = _interopRequireDefault(_index);

var _criteriaSearch = __webpack_require__(/*! ../../commons/criteriaSearch */ "./dev/js/components/commons/criteriaSearch/index.js");

var _criteriaSearch2 = _interopRequireDefault(_criteriaSearch);

var _topBar = __webpack_require__(/*! ./topBar */ "./dev/js/components/diagnosis/searchResults/topBar/index.js");

var _topBar2 = _interopRequireDefault(_topBar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class SearchResultsView extends _react2.default.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.getLabs();
    }

    getLabs() {
        let {
            selectedLocation,
            selectedCriterias,
            filterCriteria
        } = this.props;

        try {
            let searchState = this.getLocationParam('search');
            let filterCriteria = this.getLocationParam('filter');
            if (filterCriteria) {
                filterCriteria = JSON.parse(filterCriteria);
            } else {
                filterCriteria = {};
            }
            searchState = JSON.parse(searchState);
            this.getLabList(searchState, filterCriteria, true);
        } catch (e) {
            console.error(e);
        }
    }

    getLocationParam(tag) {
        // this API assumes the context of react-router-4
        const paramString = this.props.location.search;
        const params = new URLSearchParams(paramString);
        return params.get(tag);
    }

    getLabList(searchState, filterCriteria, mergeState) {
        this.props.getLabs(searchState, filterCriteria, mergeState);
    }

    applyFilters(filterState) {
        let searchState = {
            selectedCriterias: this.props.selectedCriterias,
            selectedLocation: this.props.selectedLocation
        };
        let searchData = encodeURIComponent(JSON.stringify(searchState));
        let filterData = encodeURIComponent(JSON.stringify(filterState));
        this.props.history.replace(`/dx/searchresults?search=${searchData}&filter=${filterData}`);

        this.getLabList(searchState, filterState, true);
    }

    render() {

        return _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
                _criteriaSearch2.default,
                _extends({}, this.props, { checkForLoad: this.props.LOADED_LABS_SEARCH, title: 'Search for Test and Labs.' }),
                _react2.default.createElement(_topBar2.default, _extends({}, this.props, { applyFilters: this.applyFilters.bind(this) })),
                _react2.default.createElement(_index2.default, this.props)
            )
        );
    }
}

exports.default = SearchResultsView;

/***/ }),

/***/ "./dev/js/components/diagnosis/searchResults/index.js":
/*!************************************************************!*\
  !*** ./dev/js/components/diagnosis/searchResults/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _SearchResultsView = __webpack_require__(/*! ./SearchResultsView.js */ "./dev/js/components/diagnosis/searchResults/SearchResultsView.js");

var _SearchResultsView2 = _interopRequireDefault(_SearchResultsView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _SearchResultsView2.default;

/***/ }),

/***/ "./dev/js/components/diagnosis/searchResults/labsList/LabsList.js":
/*!************************************************************************!*\
  !*** ./dev/js/components/diagnosis/searchResults/labsList/LabsList.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__(/*! react */ "react");

var _react2 = _interopRequireDefault(_react);

var _index = __webpack_require__(/*! ../../commons/labProfileCard/index.js */ "./dev/js/components/diagnosis/commons/labProfileCard/index.js");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class LabsList extends _react2.default.Component {
    constructor(props) {
        super(props);
    }

    render() {

        let { LABS, labList } = this.props;

        return _react2.default.createElement(
            'section',
            { className: 'wrap search-book-result' },
            _react2.default.createElement(
                'div',
                { className: 'container-fluid' },
                _react2.default.createElement(
                    'div',
                    { className: 'row' },
                    _react2.default.createElement(
                        'div',
                        { className: 'col-12' },
                        labList.map((labId, i) => {
                            return _react2.default.createElement(_index2.default, _extends({}, this.props, { details: LABS[labId], key: i }));
                        })
                    )
                )
            )
        );
    }
}

exports.default = LabsList;

/***/ }),

/***/ "./dev/js/components/diagnosis/searchResults/labsList/index.js":
/*!*********************************************************************!*\
  !*** ./dev/js/components/diagnosis/searchResults/labsList/index.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _LabsList = __webpack_require__(/*! ./LabsList.js */ "./dev/js/components/diagnosis/searchResults/labsList/LabsList.js");

var _LabsList2 = _interopRequireDefault(_LabsList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _LabsList2.default;

/***/ }),

/***/ "./dev/js/components/diagnosis/searchResults/topBar/TopBar.js":
/*!********************************************************************!*\
  !*** ./dev/js/components/diagnosis/searchResults/topBar/TopBar.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__(/*! react */ "react");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(/*! react-redux */ "react-redux");

var _Menu = __webpack_require__(/*! material-ui/Menu */ "material-ui/Menu");

var _Menu2 = _interopRequireDefault(_Menu);

var _Range = __webpack_require__(/*! rc-slider/lib/Range */ "rc-slider/lib/Range");

var _Range2 = _interopRequireDefault(_Range);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class TopBar extends _react2.default.Component {
    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null,
            openFilter: false,
            priceRange: [100, 1500],
            distanceRange: [1, 35],
            sortBy: null
        };
    }

    componentWillReceiveProps(props) {
        this.setState(_extends({}, props.filterCriteria));
    }

    componentDidMount() {
        this.setState(_extends({}, this.props.filterCriteria));
    }

    applyFilters() {
        let filterState = {
            priceRange: this.state.priceRange,
            distanceRange: this.state.distanceRange,
            sortBy: this.state.sortBy
        };
        this.props.applyFilters(filterState);
        this.setState({ openFilter: false });
    }

    handleOpen(event) {
        this.setState({ anchorEl: event.currentTarget });
    }

    handleClose(type) {
        this.setState({ anchorEl: null, sortBy: type }, () => {
            if (type) {
                this.applyFilters();
            }
        });
    }

    toggleFilter() {
        this.setState({
            openFilter: !this.state.openFilter
        });
    }

    handleRange(type, range) {
        this.setState({
            [type]: range
        });
    }

    getCriteriaString(selectedCriterias) {
        if (selectedCriterias && selectedCriterias.length) {
            return selectedCriterias.reduce((final, curr, i) => {
                if (i != 0) {
                    final += ', ';
                }
                final += `${curr.name}`;
                return final;
            }, "");
        }
    }

    render() {

        let criteriaStr = this.getCriteriaString(this.props.selectedCriterias);

        return _react2.default.createElement(
            'section',
            { className: 'filter-row' },
            _react2.default.createElement(
                'div',
                { className: 'container-fluid' },
                _react2.default.createElement(
                    'div',
                    { className: 'row' },
                    _react2.default.createElement(
                        'div',
                        { className: 'col-12' },
                        _react2.default.createElement(
                            'div',
                            { className: 'filter-item' },
                            _react2.default.createElement(
                                'div',
                                { className: 'action-filter' },
                                _react2.default.createElement(
                                    'ul',
                                    { className: 'inline-list' },
                                    _react2.default.createElement(
                                        'li',
                                        { onClick: this.handleOpen.bind(this) },
                                        _react2.default.createElement(
                                            'span',
                                            { className: 'ct-img ct-img-sm filter-icon text-right' },
                                            _react2.default.createElement('img', { src: '/assets/img/customer-icons/range.svg', className: 'img-fluid' })
                                        )
                                    ),
                                    _react2.default.createElement(
                                        'li',
                                        { onClick: this.toggleFilter.bind(this) },
                                        _react2.default.createElement(
                                            'span',
                                            { className: 'ct-img ct-img-sm filter-icon text-right applied-filter' },
                                            _react2.default.createElement('img', { src: '/assets/img/customer-icons/filter.svg', className: 'img-fluid' })
                                        ),
                                        _react2.default.createElement('span', { className: 'applied-filter-noti' })
                                    )
                                )
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'filter-title' },
                                this.props.labList.length,
                                ' Results found for ',
                                _react2.default.createElement(
                                    'span',
                                    { className: 'fw-700' },
                                    ' ',
                                    criteriaStr
                                )
                            )
                        )
                    )
                )
            ),
            _react2.default.createElement(
                _Menu2.default,
                {
                    id: 'sort-menu',
                    anchorEl: this.state.anchorEl,
                    open: Boolean(this.state.anchorEl),
                    onClose: this.handleClose.bind(this, null)
                },
                _react2.default.createElement(
                    _Menu.MenuItem,
                    { onClick: this.handleClose.bind(this, 'name') },
                    'Relavance'
                ),
                _react2.default.createElement(
                    _Menu.MenuItem,
                    { onClick: this.handleClose.bind(this, 'price') },
                    'Fee'
                ),
                _react2.default.createElement(
                    _Menu.MenuItem,
                    { onClick: this.handleClose.bind(this, 'distance') },
                    'Distance'
                )
            ),
            this.state.openFilter ? _react2.default.createElement(
                'div',
                { onClick: this.toggleFilter.bind(this), className: 'overlay black' },
                _react2.default.createElement(
                    'div',
                    { className: 'widget filter-popup', onClick: e => {
                            e.stopPropagation();
                            e.preventDefault();
                        } },
                    _react2.default.createElement(
                        'div',
                        { className: 'widget-content' },
                        _react2.default.createElement(
                            'div',
                            { className: 'filterRow' },
                            _react2.default.createElement(
                                'span',
                                { className: 'tl' },
                                'Price'
                            ),
                            _react2.default.createElement(
                                'span',
                                { className: 'tr' },
                                'Rs ',
                                this.state.priceRange[0],
                                ' to ',
                                this.state.priceRange[1]
                            ),
                            _react2.default.createElement(
                                'span',
                                { className: 'bl' },
                                'Rs 100'
                            ),
                            _react2.default.createElement(
                                'span',
                                { className: 'br' },
                                'Rs 2000'
                            ),
                            _react2.default.createElement(_Range2.default, {
                                min: 100,
                                max: 2000,
                                value: this.state.priceRange,
                                step: 100,
                                className: 'range',
                                onChange: this.handleRange.bind(this, 'priceRange')
                            })
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'filterRow' },
                            _react2.default.createElement(
                                'span',
                                { className: 'tl' },
                                'Distance'
                            ),
                            _react2.default.createElement(
                                'span',
                                { className: 'tr' },
                                this.state.distanceRange[0],
                                ' to ',
                                this.state.distanceRange[1],
                                ' KM'
                            ),
                            _react2.default.createElement(
                                'span',
                                { className: 'bl' },
                                '1 > KM'
                            ),
                            _react2.default.createElement(
                                'span',
                                { className: 'br' },
                                '50 KM'
                            ),
                            _react2.default.createElement(_Range2.default, {
                                min: 1,
                                max: 50,
                                value: this.state.distanceRange,
                                step: 1,
                                className: 'range',
                                onChange: this.handleRange.bind(this, 'distanceRange')
                            })
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'widget-footer pd-0' },
                        _react2.default.createElement(
                            'button',
                            { className: 'v-btn v-btn-primary btn-block btn-lg', onClick: this.applyFilters.bind(this) },
                            'Apply'
                        )
                    )
                )
            ) : ""
        );
    }
}

exports.default = TopBar;

/***/ }),

/***/ "./dev/js/components/diagnosis/searchResults/topBar/index.js":
/*!*******************************************************************!*\
  !*** ./dev/js/components/diagnosis/searchResults/topBar/index.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _TopBar = __webpack_require__(/*! ./TopBar.js */ "./dev/js/components/diagnosis/searchResults/topBar/TopBar.js");

var _TopBar2 = _interopRequireDefault(_TopBar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _TopBar2.default;

/***/ }),

/***/ "./dev/js/components/diagnosis/testSelector/TestSelector.js":
/*!******************************************************************!*\
  !*** ./dev/js/components/diagnosis/testSelector/TestSelector.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(/*! react */ "react");

var _react2 = _interopRequireDefault(_react);

var _Loader = __webpack_require__(/*! ../../commons/Loader */ "./dev/js/components/commons/Loader/index.js");

var _Loader2 = _interopRequireDefault(_Loader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class TestSelectorView extends _react2.default.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedLab: this.props.match.params.id
        };
    }

    componentDidMount() {
        this.props.getLabById(this.state.selectedLab);
    }

    toggleTest(test) {
        this.props.toggleDiagnosisCriteria('test', test);
    }

    render() {

        let labData = this.props.LABS[this.state.selectedLab];
        let tests = [];
        let selectedTests = [];

        if (this.props.selectedCriterias && this.props.selectedCriterias.length) {
            selectedTests = this.props.selectedCriterias.filter(x => x.type == 'test').map(x => x.id);
        }

        if (labData && labData.tests && labData.tests.length) {
            tests = labData.tests.map((test, i) => {
                return _react2.default.createElement(
                    'li',
                    { key: i },
                    _react2.default.createElement(
                        'label',
                        { className: 'ck-bx' },
                        test.test.name,
                        _react2.default.createElement('input', { type: 'checkbox', checked: selectedTests.indexOf(test.test.id) > -1, onChange: this.toggleTest.bind(this, test.test) }),
                        _react2.default.createElement('span', { className: 'checkmark' })
                    ),
                    _react2.default.createElement(
                        'span',
                        { className: 'test-price text-md fw-500' },
                        test.mrp
                    )
                );
            });
        }

        return _react2.default.createElement(
            'div',
            null,
            labData ? _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'header',
                    { className: 'skin-white fixed horizontal top location-detect-header' },
                    _react2.default.createElement(
                        'div',
                        { className: 'container-fluid' },
                        _react2.default.createElement(
                            'div',
                            { className: 'row' },
                            _react2.default.createElement(
                                'div',
                                { className: 'col-12' },
                                _react2.default.createElement(
                                    'div',
                                    { className: 'select-location-row text-center' },
                                    _react2.default.createElement(
                                        'span',
                                        { onClick: () => {
                                                this.props.history.go(-1);
                                            }, className: 'ct-img ct-img-md close' },
                                        _react2.default.createElement('img', { src: '/assets/img/customer-icons/close-black.svg', className: 'img-fluid' })
                                    ),
                                    _react2.default.createElement(
                                        'h4',
                                        { className: 'fw-700 text-md' },
                                        'All Test'
                                    )
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
                                    { className: 'search-row' },
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'adon-group location-detect-field' },
                                        _react2.default.createElement('input', { type: 'text', className: 'form-control input-md search-input no-shadow', placeholder: 'Search Test' }),
                                        _react2.default.createElement(
                                            'span',
                                            { className: 'ct-img ct-img-sm map-marker-blue' },
                                            _react2.default.createElement('img', { src: '/assets/img/customer-icons/search-icon.svg', className: 'img-fluid' })
                                        )
                                    ),
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'detect-my-locaiton' },
                                        _react2.default.createElement('span', { className: 'ct-img ct-img-xs' }),
                                        selectedTests.length,
                                        ' Selected Item'
                                    )
                                )
                            )
                        )
                    )
                ),
                _react2.default.createElement(
                    'section',
                    { className: 'wrap all-test-screen ' },
                    _react2.default.createElement(
                        'div',
                        { className: 'widget-panel' },
                        _react2.default.createElement(
                            'div',
                            { className: 'panel-content pd-0' },
                            _react2.default.createElement(
                                'ul',
                                { className: 'list all-test-list' },
                                tests
                            )
                        )
                    )
                ),
                _react2.default.createElement(
                    'button',
                    { className: 'v-btn v-btn-primary btn-lg fixed horizontal bottom no-round text-lg', onClick: () => {
                            this.props.history.go(-1);
                        } },
                    'Done'
                )
            ) : _react2.default.createElement(_Loader2.default, null)
        );
    }
}

exports.default = TestSelectorView;

/***/ }),

/***/ "./dev/js/components/diagnosis/testSelector/index.js":
/*!***********************************************************!*\
  !*** ./dev/js/components/diagnosis/testSelector/index.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _TestSelector = __webpack_require__(/*! ./TestSelector */ "./dev/js/components/diagnosis/testSelector/TestSelector.js");

var _TestSelector2 = _interopRequireDefault(_TestSelector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _TestSelector2.default;

/***/ }),

/***/ "./dev/js/components/opd/appointmentSlot/AppointmentSlot.js":
/*!******************************************************************!*\
  !*** ./dev/js/components/opd/appointmentSlot/AppointmentSlot.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(/*! react */ "react");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(/*! react-redux */ "react-redux");

var _index = __webpack_require__(/*! ../commons/doctorProfileCard/index.js */ "./dev/js/components/opd/commons/doctorProfileCard/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = __webpack_require__(/*! ../../commons/timeSlotSelector/index.js */ "./dev/js/components/commons/timeSlotSelector/index.js");

var _index4 = _interopRequireDefault(_index3);

var _index5 = __webpack_require__(/*! ../commons/selectedClinic/index.js */ "./dev/js/components/opd/commons/selectedClinic/index.js");

var _index6 = _interopRequireDefault(_index5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class AppointmentSlot extends _react2.default.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedDoctor: null,
            selectedClinic: null,
            timeSlots: null,
            selectedSlot: null
        };
    }

    proceed() {
        if (this.state.selectedSlot) {
            this.context.router.history.push(`/doctorprofile/${this.state.selectedDoctor}/${this.state.selectedClinic}/bookdetails?t=${this.state.selectedSlot.start}`);
        }
    }

    selectTimeSlot(slot) {
        this.setState({ selectedSlot: slot });
    }

    componentDidMount() {
        let doctorId = this.props.match.params.id;
        let clinicId = this.props.match.params.clinicId;
        if (doctorId && clinicId) {
            this.setState({ selectedDoctor: doctorId, selectedClinic: clinicId });
            this.props.getDoctorById(doctorId);

            this.props.getTimeSlots(doctorId, clinicId, timeSlots => {
                this.setState({ timeSlots });
            });
        }
    }

    render() {

        return _react2.default.createElement(
            'div',
            { className: 'appointmentSlot' },
            this.props.DOCTORS[this.state.selectedDoctor] ? _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(_index2.default, {
                    hideBottom: true,
                    hideBookNow: true,
                    details: this.props.DOCTORS[this.state.selectedDoctor]
                }),
                _react2.default.createElement(_index6.default, {
                    selectedDoctor: this.props.DOCTORS[this.state.selectedDoctor],
                    selectedClinic: this.state.selectedClinic
                }),
                this.state.timeSlots ? _react2.default.createElement(_index4.default, {
                    timeSlots: this.state.timeSlots,
                    selectTimeSlot: this.selectTimeSlot.bind(this)
                }) : '',
                _react2.default.createElement(
                    'button',
                    { className: 'proceedbtn', onClick: this.proceed.bind(this) },
                    'Proceed'
                )
            ) : ""
        );
    }
}

AppointmentSlot.contextTypes = {
    router: () => null
};
exports.default = AppointmentSlot;

/***/ }),

/***/ "./dev/js/components/opd/appointmentSlot/index.js":
/*!********************************************************!*\
  !*** ./dev/js/components/opd/appointmentSlot/index.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _AppointmentSlot = __webpack_require__(/*! ./AppointmentSlot.js */ "./dev/js/components/opd/appointmentSlot/AppointmentSlot.js");

var _AppointmentSlot2 = _interopRequireDefault(_AppointmentSlot);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _AppointmentSlot2.default;

/***/ }),

/***/ "./dev/js/components/opd/booking/BookingView.js":
/*!******************************************************!*\
  !*** ./dev/js/components/opd/booking/BookingView.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(/*! react */ "react");

var _react2 = _interopRequireDefault(_react);

var _Stepper = __webpack_require__(/*! material-ui/Stepper */ "material-ui/Stepper");

var _Stepper2 = _interopRequireDefault(_Stepper);

var _Call = __webpack_require__(/*! material-ui-icons/Call */ "material-ui-icons/Call");

var _Call2 = _interopRequireDefault(_Call);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class BookingView extends _react2.default.Component {
    constructor(props) {
        super(props);
    }

    render() {

        return _react2.default.createElement(
            'div',
            { className: 'booking' },
            _react2.default.createElement(
                _Stepper2.default,
                { activeStep: 0, alternativeLabel: true },
                _react2.default.createElement(
                    _Stepper.Step,
                    { key: 0 },
                    _react2.default.createElement(
                        _Stepper.StepLabel,
                        null,
                        "Appointment Requested"
                    )
                ),
                _react2.default.createElement(
                    _Stepper.Step,
                    { key: 1 },
                    _react2.default.createElement(
                        _Stepper.StepLabel,
                        null,
                        "Appointment Confirmed"
                    )
                ),
                _react2.default.createElement(
                    _Stepper.Step,
                    { key: 2 },
                    _react2.default.createElement(
                        _Stepper.StepLabel,
                        null,
                        "Appointment Complete"
                    )
                )
            ),
            _react2.default.createElement(
                'p',
                { className: 'requestLine' },
                'We have requested Dr.Smith to confirm your appointment'
            ),
            _react2.default.createElement(
                'div',
                { className: 'patientName' },
                _react2.default.createElement(
                    'p',
                    null,
                    'for'
                ),
                _react2.default.createElement(
                    'p',
                    null,
                    'Brijesh Kumar'
                )
            ),
            _react2.default.createElement(
                'div',
                { className: 'details' },
                _react2.default.createElement(
                    'div',
                    null,
                    _react2.default.createElement(
                        'span',
                        { className: 'lbl' },
                        'With'
                    ),
                    _react2.default.createElement(
                        'span',
                        { className: 'cntnt' },
                        'Dr. Steve Smith'
                    )
                ),
                _react2.default.createElement(
                    'div',
                    null,
                    _react2.default.createElement(
                        'span',
                        { className: 'lbl' },
                        'Where'
                    ),
                    _react2.default.createElement(
                        'span',
                        { className: 'cntnt' },
                        'Sarvodaya Clinic, # 361, Sector 50, Gurgaon'
                    )
                ),
                _react2.default.createElement(
                    'div',
                    null,
                    _react2.default.createElement(
                        'span',
                        { className: 'lbl' },
                        'When'
                    ),
                    _react2.default.createElement(
                        'span',
                        { className: 'cntnt' },
                        'Wednesday, June 27, 2018, 11:45AM'
                    )
                ),
                _react2.default.createElement(
                    'div',
                    null,
                    _react2.default.createElement(
                        'span',
                        { className: 'lbl' },
                        'Reference#'
                    ),
                    _react2.default.createElement(
                        'span',
                        { className: 'cntnt' },
                        'HUVHJB87HJBJH'
                    )
                )
            ),
            _react2.default.createElement(
                'button',
                { className: 'request' },
                'Request Re-Schedule/Cancel'
            ),
            _react2.default.createElement(_Call2.default, { className: 'callIcon' })
        );
    }
}

exports.default = BookingView;

/***/ }),

/***/ "./dev/js/components/opd/clinicList/ClinicListView.js":
/*!************************************************************!*\
  !*** ./dev/js/components/opd/clinicList/ClinicListView.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__(/*! react */ "react");

var _react2 = _interopRequireDefault(_react);

var _index = __webpack_require__(/*! ../commons/doctorProfileCard/index.js */ "./dev/js/components/opd/commons/doctorProfileCard/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = __webpack_require__(/*! ../commons/clinicSelector/index.js */ "./dev/js/components/opd/commons/clinicSelector/index.js");

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ClinicListView extends _react2.default.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedDoctor: null
        };
    }

    componentDidMount() {
        let doctorId = this.props.match.params.id;
        if (doctorId) {
            this.setState({ selectedDoctor: doctorId });
            this.props.getDoctorById(doctorId);
        }
    }

    render() {

        return _react2.default.createElement(
            'div',
            { className: 'doctorProfile' },
            this.props.DOCTORS[this.state.selectedDoctor] ? _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(_index2.default, {
                    hideBottom: true,
                    hideBookNow: true,
                    details: this.props.DOCTORS[this.state.selectedDoctor]
                }),
                _react2.default.createElement(_index4.default, _extends({
                    details: this.props.DOCTORS[this.state.selectedDoctor]
                }, this.props))
            ) : ""
        );
    }
}

exports.default = ClinicListView;

/***/ }),

/***/ "./dev/js/components/opd/clinicList/index.js":
/*!***************************************************!*\
  !*** ./dev/js/components/opd/clinicList/index.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ClinicListView = __webpack_require__(/*! ./ClinicListView.js */ "./dev/js/components/opd/clinicList/ClinicListView.js");

var _ClinicListView2 = _interopRequireDefault(_ClinicListView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _ClinicListView2.default;

/***/ }),

/***/ "./dev/js/components/opd/commons/clinicSelector/ClinicSelector.js":
/*!************************************************************************!*\
  !*** ./dev/js/components/opd/commons/clinicSelector/ClinicSelector.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(/*! react */ "react");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(/*! react-redux */ "react-redux");

var _AvTimer = __webpack_require__(/*! material-ui-icons/AvTimer */ "material-ui-icons/AvTimer");

var _AvTimer2 = _interopRequireDefault(_AvTimer);

var _KeyboardArrowRight = __webpack_require__(/*! material-ui-icons/KeyboardArrowRight */ "material-ui-icons/KeyboardArrowRight");

var _KeyboardArrowRight2 = _interopRequireDefault(_KeyboardArrowRight);

var _AttachMoney = __webpack_require__(/*! material-ui-icons/AttachMoney */ "material-ui-icons/AttachMoney");

var _AttachMoney2 = _interopRequireDefault(_AttachMoney);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ClinicSelector extends _react2.default.Component {
    constructor(props) {
        super(props);
    }

    selectClinic(clinicId) {
        let doctorId = this.props.match.params.id;
        this.context.router.history.push(`/doctorprofile/${doctorId}/${clinicId}/book`);
    }

    getTime(unix_timestamp) {
        var date = new Date(unix_timestamp * 1000);
        var hours = date.getHours();
        var minutes = "0" + date.getMinutes();
        return hours + ':' + minutes.substr(-2);
    }

    getAvailability(availability) {
        if (availability) {
            let { nextAvailable } = availability;
            if (nextAvailable[0]) {
                let date = new Date(nextAvailable[0].from).toDateString();
                let timeStart = this.getTime(nextAvailable[0].from);
                let timeEnd = this.getTime(nextAvailable[0].to);
                return {
                    date, timeStart, timeEnd, fee: nextAvailable[0].fee
                };
            }
        }

        return { date: '', timeStart: '', timeEnd: '', fee: { amount: '' } };
    }

    render() {

        let { availability } = this.props.details;

        availability = availability.map(clinic => {
            clinic.timeAvailable = this.getAvailability(clinic);
            return clinic;
        });

        return _react2.default.createElement(
            'div',
            { className: 'clinicSelector' },
            _react2.default.createElement(
                'h5',
                null,
                'Dr. Steve is available at'
            ),
            availability.map((clinic, i) => {
                return _react2.default.createElement(
                    'div',
                    { key: i, className: 'clinic', onClick: this.selectClinic.bind(this, clinic.id) },
                    _react2.default.createElement(
                        'div',
                        { className: 'name' },
                        clinic.name + ", " + clinic.address
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'details' },
                        _react2.default.createElement(_AvTimer2.default, { className: 'clockIcon' }),
                        _react2.default.createElement(_AttachMoney2.default, { className: 'moneyIcon' }),
                        _react2.default.createElement(
                            'p',
                            null,
                            clinic.days.map((day, i) => {
                                return _react2.default.createElement(
                                    'span',
                                    {
                                        key: i,
                                        className: day.isAvailable ? "isAvailable" : "" },
                                    day.day[0]
                                );
                            })
                        ),
                        _react2.default.createElement(
                            'p',
                            null,
                            clinic.timeAvailable.timeStart,
                            ' to ',
                            clinic.timeAvailable.timeEnd
                        ),
                        _react2.default.createElement(
                            'p',
                            null,
                            `Fee: Rs.${clinic.timeAvailable.fee.amount}`
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'book' },
                        _react2.default.createElement(
                            'span',
                            { className: 'text' },
                            'Book'
                        ),
                        _react2.default.createElement(_KeyboardArrowRight2.default, { className: 'bookIcon' })
                    )
                );
            })
        );
    }
}

ClinicSelector.contextTypes = {
    router: () => null
};
exports.default = ClinicSelector;

/***/ }),

/***/ "./dev/js/components/opd/commons/clinicSelector/index.js":
/*!***************************************************************!*\
  !*** ./dev/js/components/opd/commons/clinicSelector/index.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ClinicSelector = __webpack_require__(/*! ./ClinicSelector.js */ "./dev/js/components/opd/commons/clinicSelector/ClinicSelector.js");

var _ClinicSelector2 = _interopRequireDefault(_ClinicSelector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _ClinicSelector2.default;

/***/ }),

/***/ "./dev/js/components/opd/commons/doctorProfileCard/DoctorProfileCard.js":
/*!******************************************************************************!*\
  !*** ./dev/js/components/opd/commons/doctorProfileCard/DoctorProfileCard.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(/*! react */ "react");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(/*! react-redux */ "react-redux");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class DoctorProfileCard extends _react2.default.Component {
    constructor(props) {
        super(props);
    }

    cardClick(id, e) {
        // this.props.history.push(`/doctorprofile/${id}`)
    }

    bookNow(id, e) {
        e.stopPropagation();
        // this.props.history.push(`/doctorprofile/${id}/availability`)
    }

    getQualificationStr(qualificationSpecialization) {
        return qualificationSpecialization.reduce((str, curr, i) => {
            str += `${curr.qualification}`;
            if (curr.specialization) {
                str += ` - ${curr.specialization}`;
            }
            if (i < qualificationSpecialization.length - 1) str += `, `;
            return str;
        }, "");
    }

    getTime(unix_timestamp) {
        var date = new Date(unix_timestamp * 1000);
        var hours = date.getHours();
        var minutes = "0" + date.getMinutes();
        return hours + ':' + minutes.substr(-2);
    }

    getAvailability(availability) {
        if (availability) {
            let { nextAvailable } = availability;
            if (nextAvailable[0]) {
                let date = new Date(nextAvailable[0].from).toDateString();
                let timeStart = this.getTime(nextAvailable[0].from);
                let timeEnd = this.getTime(nextAvailable[0].to);
                return {
                    date, timeStart, timeEnd, fee: nextAvailable[0].fee
                };
            }
        }

        return { date: '', timeStart: '', timeEnd: '', fee: { amount: '' } };
    }

    render() {

        let { experience_years, gender, hospital, hospital_count, name, qualifications } = this.props.details;

        return _react2.default.createElement(
            'div',
            { className: 'widget card search-dr-list' },
            _react2.default.createElement(
                'div',
                { className: 'widget-header dr-info' },
                _react2.default.createElement(
                    'div',
                    { className: 'rating-address beta' },
                    _react2.default.createElement(
                        'ul',
                        { className: 'inline-list ratting' },
                        _react2.default.createElement(
                            'li',
                            null,
                            _react2.default.createElement(
                                'span',
                                { className: 'ct-img ct-img-xs star-icon' },
                                _react2.default.createElement('img', { src: '/assets/img/customer-icons/star.svg', className: 'img-fluid' })
                            )
                        ),
                        _react2.default.createElement(
                            'li',
                            null,
                            _react2.default.createElement(
                                'span',
                                { className: 'ct-img ct-img-xs star-icon' },
                                _react2.default.createElement('img', { src: '/assets/img/customer-icons/star.svg', className: 'img-fluid' })
                            )
                        ),
                        _react2.default.createElement(
                            'li',
                            null,
                            _react2.default.createElement(
                                'span',
                                { className: 'ct-img ct-img-xs star-icon' },
                                _react2.default.createElement('img', { src: '/assets/img/customer-icons/star.svg', className: 'img-fluid' })
                            )
                        ),
                        _react2.default.createElement(
                            'li',
                            null,
                            _react2.default.createElement(
                                'span',
                                { className: 'ct-img ct-img-xs star-icon' },
                                _react2.default.createElement('img', { src: '/assets/img/customer-icons/star.svg', className: 'img-fluid' })
                            )
                        ),
                        _react2.default.createElement(
                            'li',
                            null,
                            _react2.default.createElement(
                                'span',
                                { className: 'ct-img ct-img-xs star-icon' },
                                _react2.default.createElement('img', { src: '/assets/img/customer-icons/half-star.svg', className: 'img-fluid' })
                            )
                        )
                    ),
                    _react2.default.createElement(
                        'p',
                        null,
                        _react2.default.createElement(
                            'span',
                            { className: 'ct-img ct-img-xs' },
                            _react2.default.createElement('img', { src: '/assets/img/customer-icons/map-marker-blue.svg', className: 'img-fluid' })
                        ),
                        hospital.address
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'alpha dr-name' },
                    _react2.default.createElement('img', { src: '/assets/img/customer-icons/user.png', className: 'img-fluid' }),
                    ' ',
                    name
                )
            ),
            _react2.default.createElement(
                'div',
                { className: 'widget-content' },
                _react2.default.createElement(
                    'div',
                    { className: 'beta other-info text-right' },
                    _react2.default.createElement(
                        'button',
                        { className: 'v-btn v-btn-primary btn-sm' },
                        'Book Now'
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'pricing' },
                        _react2.default.createElement(
                            'p',
                            { className: 'text-primary fw-700 new-price' },
                            'Rs ',
                            hospital.discounted_fees,
                            ' ',
                            _react2.default.createElement(
                                'span',
                                { className: 'old-price' },
                                'Rs ',
                                hospital.fees
                            )
                        )
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'alpha dr-exp-details' },
                    _react2.default.createElement(
                        'p',
                        { className: 'dr-desg text-md' },
                        this.getQualificationStr(qualifications)
                    ),
                    _react2.default.createElement(
                        'p',
                        { className: 'text-sm fw-500 text-light' },
                        experience_years,
                        ' Years of Experince'
                    ),
                    _react2.default.createElement(
                        'p',
                        { className: 'text-sm fw-500 text-light' },
                        'Ex - AIIMS,  Ex- Fortis'
                    )
                )
            ),
            _react2.default.createElement(
                'div',
                { className: 'widget-footer card-footer' },
                _react2.default.createElement(
                    'div',
                    { className: 'row' },
                    _react2.default.createElement(
                        'div',
                        { className: 'col-6' },
                        _react2.default.createElement(
                            'p',
                            null,
                            _react2.default.createElement('img', { src: '/assets/img/customer-icons/home.svg', className: 'img-fluid' }),
                            _react2.default.createElement(
                                'span',
                                { className: 'Clinc-name' },
                                hospital.hospital_name,
                                ' ',
                                _react2.default.createElement('br', null),
                                '& ',
                                hospital_count - 1,
                                ' More'
                            )
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'col-6' },
                        _react2.default.createElement(
                            'p',
                            null,
                            _react2.default.createElement('img', { src: '/assets/img/customer-icons/clock-black.svg', className: 'img-fluid' }),
                            _react2.default.createElement(
                                'span',
                                { className: 'time-availability' },
                                '8:00 AM to 12:00 PM ',
                                _react2.default.createElement('br', null),
                                '2:00 PM to 7:00 PM'
                            )
                        )
                    )
                )
            )
        );
    }
}

exports.default = DoctorProfileCard;

/***/ }),

/***/ "./dev/js/components/opd/commons/doctorProfileCard/index.js":
/*!******************************************************************!*\
  !*** ./dev/js/components/opd/commons/doctorProfileCard/index.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _DoctorProfileCard = __webpack_require__(/*! ./DoctorProfileCard.js */ "./dev/js/components/opd/commons/doctorProfileCard/DoctorProfileCard.js");

var _DoctorProfileCard2 = _interopRequireDefault(_DoctorProfileCard);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _DoctorProfileCard2.default;

/***/ }),

/***/ "./dev/js/components/opd/commons/selectedClinic/SelectedClinic.js":
/*!************************************************************************!*\
  !*** ./dev/js/components/opd/commons/selectedClinic/SelectedClinic.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(/*! react */ "react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class SelectedClinic extends _react2.default.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {

        let { selectedDoctor, selectedClinic } = this.props;

        let clinicData = selectedDoctor.availability.filter(clinic => {
            return clinic.id == selectedClinic;
        })[0];

        return _react2.default.createElement(
            "div",
            { className: "selectedClinic" },
            _react2.default.createElement(
                "h5",
                null,
                "Selected Clinic"
            ),
            _react2.default.createElement(
                "span",
                { className: "clinicName" },
                clinicData.name + ", " + clinicData.address
            ),
            _react2.default.createElement(
                "span",
                { className: "fee" },
                "Fee: Rs.",
                clinicData.nextAvailable[0].fee.amount
            )
        );
    }
}

SelectedClinic.contextTypes = {
    router: () => null
};
exports.default = SelectedClinic;

/***/ }),

/***/ "./dev/js/components/opd/commons/selectedClinic/index.js":
/*!***************************************************************!*\
  !*** ./dev/js/components/opd/commons/selectedClinic/index.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _SelectedClinic = __webpack_require__(/*! ./SelectedClinic.js */ "./dev/js/components/opd/commons/selectedClinic/SelectedClinic.js");

var _SelectedClinic2 = _interopRequireDefault(_SelectedClinic);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _SelectedClinic2.default;

/***/ }),

/***/ "./dev/js/components/opd/criteriaSearch/CriteriaSearchView.js":
/*!********************************************************************!*\
  !*** ./dev/js/components/opd/criteriaSearch/CriteriaSearchView.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(/*! react */ "react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const debouncer = (fn, delay) => {
    let timer = null;
    return function () {
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn.call(this);
        }, delay);
    };
};

class CriteriaSearchView extends _react2.default.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchValue: '',
            searchResults: []
        };
    }

    componentDidMount() {
        this.getSearchResults = debouncer(this.getSearchResults.bind(this), 1000);
        let input = document.getElementById('topCriteriaSearch');
        input.focus();
    }

    inputHandler(e) {
        this.setState({ searchValue: e.target.value });
        this.getSearchResults();
    }

    getSearchResults() {
        this.props.getCriteriaResults(this.state.searchValue, searchResults => {
            this.setState({ searchResults: searchResults.result });
        });
    }

    addCriteria(criteria, type) {
        criteria.type = type;
        this.props.toggleCriteria(criteria);
        this.context.router.history.goBack();
    }

    render() {

        return _react2.default.createElement(
            'div',
            { className: 'locationSearch' },
            _react2.default.createElement(
                'div',
                { className: 'locationSearchBox' },
                _react2.default.createElement('input', { className: 'topSearch', id: 'topCriteriaSearch', onChange: this.inputHandler.bind(this), value: this.state.searchValue, placeholder: 'Search for symptoms, Doctos, conditions ..etc' }),
                this.state.searchResults.map((type, i) => {
                    return _react2.default.createElement(
                        'div',
                        { className: 'searchResultType', key: i },
                        _react2.default.createElement(
                            'p',
                            null,
                            type.name
                        ),
                        type.data.map((resultData, j) => {
                            return _react2.default.createElement(
                                'span',
                                { key: j, className: 'pac-item', onClick: this.addCriteria.bind(this, resultData, type.type) },
                                resultData.name
                            );
                        })
                    );
                })
            )
        );
    }
}

CriteriaSearchView.contextTypes = {
    router: () => null
};
exports.default = CriteriaSearchView;

/***/ }),

/***/ "./dev/js/components/opd/criteriaSearch/index.js":
/*!*******************************************************!*\
  !*** ./dev/js/components/opd/criteriaSearch/index.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _CriteriaSearchView = __webpack_require__(/*! ./CriteriaSearchView.js */ "./dev/js/components/opd/criteriaSearch/CriteriaSearchView.js");

var _CriteriaSearchView2 = _interopRequireDefault(_CriteriaSearchView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _CriteriaSearchView2.default;

/***/ }),

/***/ "./dev/js/components/opd/doctorProfile/DoctorProfileView.js":
/*!******************************************************************!*\
  !*** ./dev/js/components/opd/doctorProfile/DoctorProfileView.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__(/*! react */ "react");

var _react2 = _interopRequireDefault(_react);

var _index = __webpack_require__(/*! ../commons/doctorProfileCard/index.js */ "./dev/js/components/opd/commons/doctorProfileCard/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = __webpack_require__(/*! ../doctorProfile/aboutDoctor/index.js */ "./dev/js/components/opd/doctorProfile/aboutDoctor/index.js");

var _index4 = _interopRequireDefault(_index3);

var _index5 = __webpack_require__(/*! ../doctorProfile/professionalGraph/index.js */ "./dev/js/components/opd/doctorProfile/professionalGraph/index.js");

var _index6 = _interopRequireDefault(_index5);

var _index7 = __webpack_require__(/*! ../commons/clinicSelector/index.js */ "./dev/js/components/opd/commons/clinicSelector/index.js");

var _index8 = _interopRequireDefault(_index7);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class DoctorProfileView extends _react2.default.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedDoctor: null
        };
    }

    componentDidMount() {
        let doctorId = this.props.match.params.id;
        if (doctorId) {
            this.setState({ selectedDoctor: doctorId });
            this.props.getDoctorById(doctorId);
        }
    }

    render() {

        return _react2.default.createElement(
            'div',
            { className: 'doctorProfile' },
            this.props.DOCTORS[this.state.selectedDoctor] ? _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(_index2.default, {
                    hideBottom: true,
                    details: this.props.DOCTORS[this.state.selectedDoctor]
                }),
                _react2.default.createElement(_index4.default, null),
                _react2.default.createElement(_index8.default, _extends({
                    details: this.props.DOCTORS[this.state.selectedDoctor]
                }, this.props)),
                _react2.default.createElement(_index6.default, null)
            ) : ""
        );
    }
}

exports.default = DoctorProfileView;

/***/ }),

/***/ "./dev/js/components/opd/doctorProfile/aboutDoctor/AboutDoctor.js":
/*!************************************************************************!*\
  !*** ./dev/js/components/opd/doctorProfile/aboutDoctor/AboutDoctor.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(/*! react */ "react");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(/*! react-redux */ "react-redux");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class AboutDoctor extends _react2.default.Component {

    constructor(props) {
        super(props);
    }

    render() {

        return _react2.default.createElement(
            'div',
            { className: 'aboutDoctor' },
            _react2.default.createElement(
                'h5',
                null,
                'About Dr. Steve Ray'
            ),
            _react2.default.createElement(
                'p',
                null,
                'Lorem ipsum dolor sit amet, dolor ut vestibulum blandit, turpis fusce. Labore potenti vivamus odio arcu vestibulum. Hendrerit nulla consectetuer tristique ante leo, ullamcorper cursus rutrum '
            )
        );
    }
}

exports.default = AboutDoctor;

/***/ }),

/***/ "./dev/js/components/opd/doctorProfile/aboutDoctor/index.js":
/*!******************************************************************!*\
  !*** ./dev/js/components/opd/doctorProfile/aboutDoctor/index.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _AboutDoctor = __webpack_require__(/*! ./AboutDoctor.js */ "./dev/js/components/opd/doctorProfile/aboutDoctor/AboutDoctor.js");

var _AboutDoctor2 = _interopRequireDefault(_AboutDoctor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _AboutDoctor2.default;

/***/ }),

/***/ "./dev/js/components/opd/doctorProfile/index.js":
/*!******************************************************!*\
  !*** ./dev/js/components/opd/doctorProfile/index.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _DoctorProfileView = __webpack_require__(/*! ./DoctorProfileView.js */ "./dev/js/components/opd/doctorProfile/DoctorProfileView.js");

var _DoctorProfileView2 = _interopRequireDefault(_DoctorProfileView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _DoctorProfileView2.default;

/***/ }),

/***/ "./dev/js/components/opd/doctorProfile/professionalGraph/ProfessionalGraph.js":
/*!************************************************************************************!*\
  !*** ./dev/js/components/opd/doctorProfile/professionalGraph/ProfessionalGraph.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(/*! react */ "react");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(/*! react-redux */ "react-redux");

var _ExpansionPanel = __webpack_require__(/*! material-ui/ExpansionPanel */ "material-ui/ExpansionPanel");

var _ExpansionPanel2 = _interopRequireDefault(_ExpansionPanel);

var _ExpandMore = __webpack_require__(/*! material-ui-icons/ExpandMore */ "material-ui-icons/ExpandMore");

var _ExpandMore2 = _interopRequireDefault(_ExpandMore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ProfessionalGraph extends _react2.default.Component {

    constructor(props) {
        super(props);
    }

    render() {

        return _react2.default.createElement(
            'div',
            { className: 'professionalGraph' },
            _react2.default.createElement(
                'h5',
                null,
                'Professional Graph'
            ),
            _react2.default.createElement(
                'div',
                { className: 'epanel' },
                _react2.default.createElement(
                    _ExpansionPanel2.default,
                    null,
                    _react2.default.createElement(
                        _ExpansionPanel.ExpansionPanelSummary,
                        { expandIcon: _react2.default.createElement(_ExpandMore2.default, null) },
                        'Education'
                    ),
                    _react2.default.createElement(_ExpansionPanel.ExpansionPanelDetails, null)
                ),
                _react2.default.createElement(
                    _ExpansionPanel2.default,
                    null,
                    _react2.default.createElement(
                        _ExpansionPanel.ExpansionPanelSummary,
                        { expandIcon: _react2.default.createElement(_ExpandMore2.default, null) },
                        'Memberships'
                    ),
                    _react2.default.createElement(_ExpansionPanel.ExpansionPanelDetails, null)
                ),
                _react2.default.createElement(
                    _ExpansionPanel2.default,
                    null,
                    _react2.default.createElement(
                        _ExpansionPanel.ExpansionPanelSummary,
                        { expandIcon: _react2.default.createElement(_ExpandMore2.default, null) },
                        'Experience'
                    ),
                    _react2.default.createElement(_ExpansionPanel.ExpansionPanelDetails, null)
                ),
                _react2.default.createElement(
                    _ExpansionPanel2.default,
                    null,
                    _react2.default.createElement(
                        _ExpansionPanel.ExpansionPanelSummary,
                        { expandIcon: _react2.default.createElement(_ExpandMore2.default, null) },
                        'Specializations'
                    ),
                    _react2.default.createElement(_ExpansionPanel.ExpansionPanelDetails, null)
                ),
                _react2.default.createElement(
                    _ExpansionPanel2.default,
                    null,
                    _react2.default.createElement(
                        _ExpansionPanel.ExpansionPanelSummary,
                        { expandIcon: _react2.default.createElement(_ExpandMore2.default, null) },
                        'Awards'
                    ),
                    _react2.default.createElement(_ExpansionPanel.ExpansionPanelDetails, null)
                )
            )
        );
    }
}

exports.default = ProfessionalGraph;

/***/ }),

/***/ "./dev/js/components/opd/doctorProfile/professionalGraph/index.js":
/*!************************************************************************!*\
  !*** ./dev/js/components/opd/doctorProfile/professionalGraph/index.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ProfessionalGraph = __webpack_require__(/*! ./ProfessionalGraph.js */ "./dev/js/components/opd/doctorProfile/professionalGraph/ProfessionalGraph.js");

var _ProfessionalGraph2 = _interopRequireDefault(_ProfessionalGraph);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _ProfessionalGraph2.default;

/***/ }),

/***/ "./dev/js/components/opd/locationSearch/LocationSearch.js":
/*!****************************************************************!*\
  !*** ./dev/js/components/opd/locationSearch/LocationSearch.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(/*! react */ "react");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(/*! react-redux */ "react-redux");

var _axios = __webpack_require__(/*! axios */ "axios");

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class LocationSearch extends _react2.default.Component {
    constructor(props) {
        super(props);
        this.state = {
            search: "",
            searchResults: []
        };
    }

    getLocation(location) {
        var auto = new google.maps.places.AutocompleteService();

        var request = {
            input: location,
            types: ['geocode'],
            componentRestrictions: { country: 'in' }
        };
        if (location) {
            auto.getPlacePredictions(request, function (results, status) {
                this.setState({ searchResults: results });
            }.bind(this));
        }
    }

    inputHandler(e) {
        this.setState({
            search: e.target.value
        });
        this.getLocation(e.target.value);
    }

    selectLocation(location) {
        let map = new google.maps.Map(document.getElementById('map'), {
            center: { lat: -33.867, lng: 151.195 },
            zoom: 15
        });
        let service = new google.maps.places.PlacesService(map);
        service.getDetails({
            reference: location.reference
        }, function (place, status) {
            this.props.selectLocation(place);
            this.props.history.go(-1);
        }.bind(this));
    }

    componentDidMount() {
        let input = document.getElementById('topLocationSearch');
        input.focus();
    }

    render() {

        return _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
                'header',
                { className: 'skin-white fixed horizontal top location-detect-header' },
                _react2.default.createElement(
                    'div',
                    { className: 'container-fluid' },
                    _react2.default.createElement(
                        'div',
                        { className: 'row' },
                        _react2.default.createElement(
                            'div',
                            { className: 'col-12' },
                            _react2.default.createElement(
                                'div',
                                { className: 'select-location-row text-center' },
                                _react2.default.createElement(
                                    'span',
                                    { onClick: () => {
                                            this.props.history.go(-1);
                                        }, className: 'ct-img ct-img-md close' },
                                    _react2.default.createElement('img', { src: '/assets/img/customer-icons/close-black.svg', className: 'img-fluid' })
                                ),
                                _react2.default.createElement(
                                    'h4',
                                    { className: 'fw-700 text-md' },
                                    'Select Location'
                                )
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
                                { className: 'search-row' },
                                _react2.default.createElement(
                                    'div',
                                    { className: 'adon-group location-detect-field' },
                                    _react2.default.createElement('input', { type: 'text', value: this.state.search, onChange: this.inputHandler.bind(this), className: 'form-control input-md search-input no-shadow', placeholder: 'Select any city or locality', id: 'topLocationSearch' }),
                                    _react2.default.createElement(
                                        'span',
                                        { className: 'ct-img ct-img-sm map-marker-blue' },
                                        _react2.default.createElement('img', { src: '/assets/img/customer-icons/map-marker-blue.svg', className: 'img-fluid' })
                                    )
                                ),
                                _react2.default.createElement(
                                    'div',
                                    { className: 'detect-my-locaiton' },
                                    _react2.default.createElement(
                                        'span',
                                        { className: 'ct-img ct-img-xs' },
                                        _react2.default.createElement('img', { src: '/assets/img/customer-icons/gps.svg', className: 'img-fluid' })
                                    ),
                                    'Detect My Location'
                                )
                            )
                        )
                    )
                )
            ),
            _react2.default.createElement(
                'section',
                { className: 'wrap locaton-detect-screen' },
                _react2.default.createElement(
                    'div',
                    { className: 'widget-panel' },
                    _react2.default.createElement(
                        'h4',
                        { className: 'panel-title' },
                        'Search Result'
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'panel-content pd-0' },
                        _react2.default.createElement(
                            'ul',
                            { className: 'list city-list' },
                            this.state.searchResults.map((result, i) => {
                                return _react2.default.createElement(
                                    'li',
                                    { key: i, onClick: this.selectLocation.bind(this, result) },
                                    _react2.default.createElement(
                                        'a',
                                        null,
                                        result.description,
                                        _react2.default.createElement(
                                            'span',
                                            { className: 'city-loc' },
                                            'City'
                                        )
                                    )
                                );
                            })
                        )
                    )
                )
            ),
            _react2.default.createElement('div', { id: 'map', style: { display: 'none' } })
        );
    }
}

LocationSearch.contextTypes = {
    router: () => null
};
exports.default = LocationSearch;

/***/ }),

/***/ "./dev/js/components/opd/locationSearch/index.js":
/*!*******************************************************!*\
  !*** ./dev/js/components/opd/locationSearch/index.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _LocationSearch = __webpack_require__(/*! ./LocationSearch.js */ "./dev/js/components/opd/locationSearch/LocationSearch.js");

var _LocationSearch2 = _interopRequireDefault(_LocationSearch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _LocationSearch2.default;

/***/ }),

/***/ "./dev/js/components/opd/patientDetails/PatientDetails.js":
/*!****************************************************************!*\
  !*** ./dev/js/components/opd/patientDetails/PatientDetails.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(/*! react */ "react");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(/*! react-redux */ "react-redux");

var _index = __webpack_require__(/*! ../commons/doctorProfileCard/index.js */ "./dev/js/components/opd/commons/doctorProfileCard/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = __webpack_require__(/*! ./detailsForm/index.js */ "./dev/js/components/opd/patientDetails/detailsForm/index.js");

var _index4 = _interopRequireDefault(_index3);

var _index5 = __webpack_require__(/*! ../commons/selectedClinic/index.js */ "./dev/js/components/opd/commons/selectedClinic/index.js");

var _index6 = _interopRequireDefault(_index5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class PatientDetails extends _react2.default.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedDoctor: null,
            selectedClinic: null,
            selectedSlot: null
        };
    }

    proceed() {
        this.context.router.history.push('/payment');
    }

    getLocationParam(tag) {
        // this API assumes the context of react-router-4
        const paramString = this.props.location.search;
        const params = new URLSearchParams(paramString);
        return params.get(tag);
    }

    componentDidMount() {
        try {
            let doctorId = this.props.match.params.id;
            let clinicId = this.props.match.params.clinicId;
            let selectedSlot = this.getLocationParam('t');
            selectedSlot = new Date(parseFloat(selectedSlot));

            if (doctorId && clinicId && selectedSlot) {
                this.setState({
                    selectedDoctor: doctorId,
                    selectedClinic: clinicId,
                    selectedSlot: selectedSlot.toString()
                });
                this.props.getDoctorById(doctorId);
            }
        } catch (e) {}
    }

    render() {

        return _react2.default.createElement(
            'div',
            { className: 'patientDetails' },
            this.props.DOCTORS[this.state.selectedDoctor] ? _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(_index2.default, {
                    hideBottom: true,
                    hideBookNow: true,
                    details: this.props.DOCTORS[this.state.selectedDoctor]
                }),
                _react2.default.createElement(_index6.default, {
                    selectedDoctor: this.props.DOCTORS[this.state.selectedDoctor],
                    selectedClinic: this.state.selectedClinic
                }),
                _react2.default.createElement(
                    'div',
                    { className: 'selectedAppointmentSlot' },
                    _react2.default.createElement(
                        'h5',
                        null,
                        'Selected Appointment Slot'
                    ),
                    _react2.default.createElement(
                        'span',
                        { className: 'appdate' },
                        'Appointment Date'
                    ),
                    _react2.default.createElement(
                        'span',
                        { className: 'date' },
                        this.state.selectedSlot
                    )
                ),
                _react2.default.createElement(_index4.default, null),
                _react2.default.createElement(
                    'button',
                    { className: 'proceedbtn', onClick: this.proceed.bind(this) },
                    'Confirm Booking'
                )
            ) : ""
        );
    }
}

PatientDetails.contextTypes = {
    router: () => null
};
exports.default = PatientDetails;

/***/ }),

/***/ "./dev/js/components/opd/patientDetails/detailsForm/DetailsForm.js":
/*!*************************************************************************!*\
  !*** ./dev/js/components/opd/patientDetails/detailsForm/DetailsForm.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(/*! react */ "react");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(/*! react-redux */ "react-redux");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class DetailsForm extends _react2.default.Component {
    constructor(props) {
        super(props);
        this.state = {
            patientName: '',
            patientEmail: '',
            patientGender: 'male',
            patientMobile: '',
            otp: ''
        };
    }

    inputHandler(which, e) {
        this.setState({ [which]: e.target.value });
    }

    render() {

        return _react2.default.createElement(
            'div',
            { className: 'detailsForm' },
            _react2.default.createElement(
                'h5',
                null,
                'Please provide patient details'
            ),
            _react2.default.createElement('input', { value: this.state.patientName, onChange: this.inputHandler.bind(this, 'patientName'), className: 'ptname', placeholder: 'Patient Name*' }),
            _react2.default.createElement('input', { value: this.state.patientEmail, onChange: this.inputHandler.bind(this, 'patientEmail'), className: 'ptemail', placeholder: 'Email*' }),
            _react2.default.createElement(
                'div',
                { className: 'ptgender' },
                _react2.default.createElement(
                    'span',
                    null,
                    'Gender :'
                ),
                _react2.default.createElement('input', { type: 'radio', name: 'gender', value: 'male', checked: this.state.patientGender === "male", onChange: this.inputHandler.bind(this, 'patientGender') }),
                ' Male',
                _react2.default.createElement('input', { type: 'radio', name: 'gender', value: 'female', checked: this.state.patientGender === "female", onChange: this.inputHandler.bind(this, 'patientGender') }),
                ' Female'
            ),
            _react2.default.createElement('input', { value: this.state.patientMobile, onChange: this.inputHandler.bind(this, 'patientMobile'), className: 'ptmobile', placeholder: 'Mobile*' }),
            _react2.default.createElement(
                'button',
                { className: 'otpbtn' },
                '(Re)Send OTP'
            ),
            _react2.default.createElement('input', { value: this.state.otp, onChange: this.inputHandler.bind(this, 'otp'), className: 'ptotp', placeholder: 'Enter OTP*' })
        );
    }
}

exports.default = DetailsForm;

/***/ }),

/***/ "./dev/js/components/opd/patientDetails/detailsForm/index.js":
/*!*******************************************************************!*\
  !*** ./dev/js/components/opd/patientDetails/detailsForm/index.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _DetailsForm = __webpack_require__(/*! ./DetailsForm.js */ "./dev/js/components/opd/patientDetails/detailsForm/DetailsForm.js");

var _DetailsForm2 = _interopRequireDefault(_DetailsForm);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _DetailsForm2.default;

/***/ }),

/***/ "./dev/js/components/opd/patientDetails/index.js":
/*!*******************************************************!*\
  !*** ./dev/js/components/opd/patientDetails/index.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _PatientDetails = __webpack_require__(/*! ./PatientDetails.js */ "./dev/js/components/opd/patientDetails/PatientDetails.js");

var _PatientDetails2 = _interopRequireDefault(_PatientDetails);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _PatientDetails2.default;

/***/ }),

/***/ "./dev/js/components/opd/payment/PaymentView.js":
/*!******************************************************!*\
  !*** ./dev/js/components/opd/payment/PaymentView.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(/*! react */ "react");

var _react2 = _interopRequireDefault(_react);

var _Payment = __webpack_require__(/*! material-ui-icons/Payment */ "material-ui-icons/Payment");

var _Payment2 = _interopRequireDefault(_Payment);

var _AttachMoney = __webpack_require__(/*! material-ui-icons/AttachMoney */ "material-ui-icons/AttachMoney");

var _AttachMoney2 = _interopRequireDefault(_AttachMoney);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class PaymentView extends _react2.default.Component {
    constructor(props) {
        super(props);
    }

    proceed() {
        this.context.router.history.push("/booking/:refId");
    }

    render() {

        return _react2.default.createElement(
            'div',
            { className: 'payment' },
            _react2.default.createElement(
                'div',
                { className: 'offerRow' },
                _react2.default.createElement(
                    'span',
                    null,
                    'Get 10% cashback for all online payment, T&C'
                )
            ),
            _react2.default.createElement(
                'div',
                { className: 'paymentRow', onClick: this.proceed.bind(this) },
                _react2.default.createElement(_Payment2.default, { className: 'paymentIcon' }),
                _react2.default.createElement(
                    'span',
                    null,
                    'Paytm Wallet'
                )
            ),
            _react2.default.createElement(
                'div',
                { className: 'paymentRow', onClick: this.proceed.bind(this) },
                _react2.default.createElement(_Payment2.default, { className: 'paymentIcon' }),
                _react2.default.createElement(
                    'span',
                    null,
                    'Credit/Debit/ATM Card'
                )
            ),
            _react2.default.createElement(
                'div',
                { className: 'paymentRow', onClick: this.proceed.bind(this) },
                _react2.default.createElement(_Payment2.default, { className: 'paymentIcon' }),
                _react2.default.createElement(
                    'span',
                    null,
                    'Net Banking'
                )
            ),
            _react2.default.createElement(
                'div',
                { className: 'paymentRow', onClick: this.proceed.bind(this) },
                _react2.default.createElement(_AttachMoney2.default, { className: 'paymentIcon' }),
                _react2.default.createElement(
                    'span',
                    null,
                    'Pay in Cash'
                )
            ),
            _react2.default.createElement(
                'div',
                { className: 'paymentRow', onClick: this.proceed.bind(this) },
                _react2.default.createElement(_Payment2.default, { className: 'paymentIcon' }),
                _react2.default.createElement(
                    'span',
                    null,
                    'OnDoc Pay'
                )
            )
        );
    }
}

PaymentView.contextTypes = {
    router: () => null
};
exports.default = PaymentView;

/***/ }),

/***/ "./dev/js/components/opd/searchCriteria/SearchCriteriaView.js":
/*!********************************************************************!*\
  !*** ./dev/js/components/opd/searchCriteria/SearchCriteriaView.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__(/*! react */ "react");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(/*! react-redux */ "react-redux");

var _index = __webpack_require__(/*! ../../commons/commonlySearched/index.js */ "./dev/js/components/commons/commonlySearched/index.js");

var _index2 = _interopRequireDefault(_index);

var _criteriaSearch = __webpack_require__(/*! ../../commons/criteriaSearch */ "./dev/js/components/commons/criteriaSearch/index.js");

var _criteriaSearch2 = _interopRequireDefault(_criteriaSearch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class SearchCriteriaView extends _react2.default.Component {
    constructor(props) {
        super(props);
    }

    searchProceed() {
        let searchData = {
            selectedCriterias: this.props.selectedCriterias,
            selectedLocation: this.props.selectedLocation
        };
        searchData = encodeURIComponent(JSON.stringify(searchData));
        let filterData = encodeURIComponent(JSON.stringify(this.props.filterCriteria));
        this.props.history.push(`/opd/searchresults?search=${searchData}&filter=${filterData}`);
    }

    render() {
        return _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
                _criteriaSearch2.default,
                _extends({}, this.props, { checkForLoad: this.props.LOADED_SEARCH_CRITERIA_OPD, title: 'Search For Disease or Doctor.', type: 'opd' }),
                _react2.default.createElement(
                    'section',
                    { className: 'wrap wrap-100' },
                    _react2.default.createElement(_index2.default, {
                        heading: 'Selected Criteria',
                        data: this.props.selectedCriterias,
                        selected: [],
                        toggle: this.props.toggleOPDCriteria.bind(this)
                    }),
                    _react2.default.createElement(_index2.default, {
                        heading: 'Common Conditions',
                        type: 'condition',
                        data: this.props.conditions,
                        selected: this.props.selectedCriterias.filter(x => x.type == 'condition'),
                        toggle: this.props.toggleOPDCriteria.bind(this)
                    }),
                    _react2.default.createElement(_index2.default, {
                        heading: 'Common Specialities',
                        type: 'speciality',
                        data: this.props.specializations,
                        selected: this.props.selectedCriterias.filter(x => x.type == 'speciality'),
                        toggle: this.props.toggleOPDCriteria.bind(this)
                    })
                )
            ),
            _react2.default.createElement(
                'button',
                { onClick: this.searchProceed.bind(this), className: 'v-btn v-btn-primary btn-lg fixed horizontal bottom no-round text-lg' },
                'Show Doctors'
            )
        );
    }
}

exports.default = SearchCriteriaView;

/***/ }),

/***/ "./dev/js/components/opd/searchCriteria/index.js":
/*!*******************************************************!*\
  !*** ./dev/js/components/opd/searchCriteria/index.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _SearchCriteriaView = __webpack_require__(/*! ./SearchCriteriaView.js */ "./dev/js/components/opd/searchCriteria/SearchCriteriaView.js");

var _SearchCriteriaView2 = _interopRequireDefault(_SearchCriteriaView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _SearchCriteriaView2.default;

/***/ }),

/***/ "./dev/js/components/opd/searchResults/SearchResultsView.js":
/*!******************************************************************!*\
  !*** ./dev/js/components/opd/searchResults/SearchResultsView.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__(/*! react */ "react");

var _react2 = _interopRequireDefault(_react);

var _index = __webpack_require__(/*! ../searchResults/doctorsList/index.js */ "./dev/js/components/opd/searchResults/doctorsList/index.js");

var _index2 = _interopRequireDefault(_index);

var _criteriaSearch = __webpack_require__(/*! ../../commons/criteriaSearch */ "./dev/js/components/commons/criteriaSearch/index.js");

var _criteriaSearch2 = _interopRequireDefault(_criteriaSearch);

var _topBar = __webpack_require__(/*! ./topBar */ "./dev/js/components/opd/searchResults/topBar/index.js");

var _topBar2 = _interopRequireDefault(_topBar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class SearchResultsView extends _react2.default.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.getDcotors();
    }

    getDcotors() {
        let {
            selectedLocation,
            selectedCriterias,
            filterCriteria
        } = this.props;

        try {
            let searchState = this.getLocationParam('search');
            let filterCriteria = this.getLocationParam('filter');
            if (filterCriteria) {
                filterCriteria = JSON.parse(filterCriteria);
            } else {
                filterCriteria = {};
            }
            searchState = JSON.parse(searchState);
            this.getDoctorList(searchState, filterCriteria, true);
        } catch (e) {
            console.error(e);
        }
    }

    applyFilters(filterState) {
        let searchState = {
            selectedCriterias: this.props.selectedCriterias,
            selectedLocation: this.props.selectedLocation
        };
        let searchData = encodeURIComponent(JSON.stringify(searchState));
        let filterData = encodeURIComponent(JSON.stringify(filterState));
        this.props.history.replace(`/opd/searchresults?search=${searchData}&filter=${filterData}`);

        this.getDoctorList(searchState, filterState, true);
    }

    getLocationParam(tag) {
        // this API assumes the context of react-router-4
        const paramString = this.props.location.search;
        const params = new URLSearchParams(paramString);
        return params.get(tag);
    }

    getDoctorList(searchState, filterCriteria, mergeState) {
        this.props.getDoctors(searchState, filterCriteria, mergeState);
    }

    render() {
        return _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
                _criteriaSearch2.default,
                _extends({}, this.props, { checkForLoad: this.props.LOADED_DOCTOR_SEARCH, title: 'Search For Disease or Doctor.', type: 'opd' }),
                _react2.default.createElement(_topBar2.default, _extends({}, this.props, { applyFilters: this.applyFilters.bind(this) })),
                _react2.default.createElement(_index2.default, this.props)
            )
        );
    }
}

exports.default = SearchResultsView;

/***/ }),

/***/ "./dev/js/components/opd/searchResults/doctorsList/DoctorsList.js":
/*!************************************************************************!*\
  !*** ./dev/js/components/opd/searchResults/doctorsList/DoctorsList.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__(/*! react */ "react");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(/*! react-redux */ "react-redux");

var _index = __webpack_require__(/*! ../../commons/doctorProfileCard/index.js */ "./dev/js/components/opd/commons/doctorProfileCard/index.js");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import InfiniteScroll from 'react-infinite-scroller';


class DoctorsList extends _react2.default.Component {
    constructor(props) {
        super(props);
    }

    render() {

        let { DOCTORS, doctorList } = this.props;

        return _react2.default.createElement(
            'section',
            { className: 'wrap search-result-dr' },
            _react2.default.createElement(
                'div',
                { className: 'container-fluid' },
                _react2.default.createElement(
                    'div',
                    { className: 'row' },
                    _react2.default.createElement(
                        'div',
                        { className: 'col-12' },
                        doctorList.map((docId, i) => {
                            return _react2.default.createElement(_index2.default, _extends({}, this.props, { details: DOCTORS[docId], key: i }));
                        })
                    )
                )
            )
        );
    }
}

exports.default = DoctorsList;

/***/ }),

/***/ "./dev/js/components/opd/searchResults/doctorsList/index.js":
/*!******************************************************************!*\
  !*** ./dev/js/components/opd/searchResults/doctorsList/index.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _DoctorsList = __webpack_require__(/*! ./DoctorsList.js */ "./dev/js/components/opd/searchResults/doctorsList/DoctorsList.js");

var _DoctorsList2 = _interopRequireDefault(_DoctorsList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _DoctorsList2.default;

/***/ }),

/***/ "./dev/js/components/opd/searchResults/index.js":
/*!******************************************************!*\
  !*** ./dev/js/components/opd/searchResults/index.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _SearchResultsView = __webpack_require__(/*! ./SearchResultsView.js */ "./dev/js/components/opd/searchResults/SearchResultsView.js");

var _SearchResultsView2 = _interopRequireDefault(_SearchResultsView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _SearchResultsView2.default;

/***/ }),

/***/ "./dev/js/components/opd/searchResults/topBar/TopBar.js":
/*!**************************************************************!*\
  !*** ./dev/js/components/opd/searchResults/topBar/TopBar.js ***!
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

var _reactRedux = __webpack_require__(/*! react-redux */ "react-redux");

var _Menu = __webpack_require__(/*! material-ui/Menu */ "material-ui/Menu");

var _Menu2 = _interopRequireDefault(_Menu);

var _Range = __webpack_require__(/*! rc-slider/lib/Range */ "rc-slider/lib/Range");

var _Range2 = _interopRequireDefault(_Range);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class TopBar extends _react2.default.Component {
    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null,
            openFilter: false,
            priceRange: [100, 1500],
            sort_on: null,
            sits_at_clinic: false,
            sits_at_hospital: false,
            is_female: false,
            is_available: false
        };
    }

    componentWillReceiveProps(props) {
        this.setState(_extends({}, props.filterCriteria));
    }

    componentDidMount() {
        this.setState(_extends({}, this.props.filterCriteria));
    }

    handleInput(e) {
        let evName = e.target.name;
        let checked = e.target.checked;
        setTimeout(() => {
            this.setState({
                [evName]: checked
            });
        });
    }

    applyFilters() {
        let filterState = {
            priceRange: this.state.priceRange,
            sits_at: this.state.sits_at,
            sort_on: this.state.sort_on,
            is_female: this.state.is_female,
            is_available: this.state.is_available,
            sits_at_clinic: this.state.sits_at_clinic,
            sits_at_hospital: this.state.sits_at_hospital
        };
        this.props.applyFilters(filterState);
        this.setState({ openFilter: false });
    }

    handleOpen(event) {
        this.setState({ anchorEl: event.currentTarget });
    }

    handleClose(type) {
        this.setState({ anchorEl: null, sort_on: type }, () => {
            if (type) {
                this.applyFilters();
            }
        });
    }

    toggleFilter() {
        this.setState({
            openFilter: !this.state.openFilter
        });
    }

    handleRange(type, range) {
        this.setState({
            [type]: range
        });
    }

    getCriteriaString(selectedCriterias) {
        if (selectedCriterias && selectedCriterias.length) {
            return selectedCriterias.reduce((final, curr, i) => {
                if (i != 0) {
                    final += ', ';
                }
                final += `${curr.name}`;
                return final;
            }, "");
        }
    }

    render() {

        let criteriaStr = this.getCriteriaString(this.props.selectedCriterias);

        return _react2.default.createElement(
            'section',
            { className: 'filter-row' },
            _react2.default.createElement(
                'div',
                { className: 'container-fluid' },
                _react2.default.createElement(
                    'div',
                    { className: 'row' },
                    _react2.default.createElement(
                        'div',
                        { className: 'col-12' },
                        _react2.default.createElement(
                            'div',
                            { className: 'filter-item' },
                            _react2.default.createElement(
                                'div',
                                { className: 'action-filter' },
                                _react2.default.createElement(
                                    'ul',
                                    { className: 'inline-list' },
                                    _react2.default.createElement(
                                        'li',
                                        { onClick: this.handleOpen.bind(this) },
                                        _react2.default.createElement(
                                            'span',
                                            { className: 'ct-img ct-img-sm filter-icon text-right' },
                                            _react2.default.createElement('img', { src: '/assets/img/customer-icons/range.svg', className: 'img-fluid' })
                                        )
                                    ),
                                    _react2.default.createElement(
                                        'li',
                                        { onClick: this.toggleFilter.bind(this) },
                                        _react2.default.createElement(
                                            'span',
                                            { className: 'ct-img ct-img-sm filter-icon text-right applied-filter' },
                                            _react2.default.createElement('img', { src: '/assets/img/customer-icons/filter.svg', className: 'img-fluid' })
                                        ),
                                        _react2.default.createElement('span', { className: 'applied-filter-noti' })
                                    )
                                )
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'filter-title' },
                                this.props.doctorList.length,
                                ' Results found for ',
                                _react2.default.createElement(
                                    'span',
                                    { className: 'fw-700' },
                                    ' ',
                                    criteriaStr
                                )
                            )
                        )
                    )
                )
            ),
            _react2.default.createElement(
                _Menu2.default,
                {
                    id: 'sort-menu',
                    anchorEl: this.state.anchorEl,
                    open: Boolean(this.state.anchorEl),
                    onClose: this.handleClose.bind(this, null)
                },
                _react2.default.createElement(
                    _Menu.MenuItem,
                    { onClick: this.handleClose.bind(this, 'name') },
                    'Relavance'
                ),
                _react2.default.createElement(
                    _Menu.MenuItem,
                    { onClick: this.handleClose.bind(this, 'price') },
                    'Fee'
                ),
                _react2.default.createElement(
                    _Menu.MenuItem,
                    { onClick: this.handleClose.bind(this, 'distance') },
                    'Distance'
                ),
                _react2.default.createElement(
                    _Menu.MenuItem,
                    { onClick: this.handleClose.bind(this, 'experience') },
                    'Experience'
                )
            ),
            this.state.openFilter ? _react2.default.createElement(
                'div',
                { onClick: this.toggleFilter.bind(this), className: 'overlay black' },
                _react2.default.createElement(
                    'div',
                    { className: 'widget filter-popup', onClick: e => {
                            e.stopPropagation();
                            e.preventDefault();
                        } },
                    _react2.default.createElement(
                        'div',
                        { className: 'widget-content' },
                        _react2.default.createElement(
                            'div',
                            { className: 'filterRow' },
                            _react2.default.createElement(
                                'span',
                                { className: 'tl' },
                                'Available Today'
                            ),
                            _react2.default.createElement('input', { type: 'checkbox', name: 'is_available', checked: !!this.state.is_available, onChange: this.handleInput.bind(this), className: 'checkFilter' })
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'widget-content' },
                        _react2.default.createElement(
                            'div',
                            { className: 'filterRow' },
                            _react2.default.createElement(
                                'span',
                                { className: 'tl' },
                                'Sits At'
                            ),
                            _react2.default.createElement('input', { type: 'checkbox', name: 'sits_at_clinic', checked: !!this.state.sits_at_clinic, onChange: this.handleInput.bind(this), className: 'checkFilter' }),
                            _react2.default.createElement(
                                'span',
                                { className: 'checkFilterLabel' },
                                'Clinic'
                            ),
                            _react2.default.createElement('input', { type: 'checkbox', name: 'sits_at_hospital', checked: !!this.state.sits_at_hospital, onChange: this.handleInput.bind(this), className: 'checkFilter' }),
                            _react2.default.createElement(
                                'span',
                                { className: 'checkFilterLabel' },
                                'Hospital'
                            )
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'widget-content' },
                        _react2.default.createElement(
                            'div',
                            { className: 'filterRow' },
                            _react2.default.createElement(
                                'span',
                                { className: 'tl' },
                                'Price'
                            ),
                            _react2.default.createElement(
                                'span',
                                { className: 'tr' },
                                'Rs ',
                                this.state.priceRange[0],
                                ' to ',
                                this.state.priceRange[1]
                            ),
                            _react2.default.createElement(
                                'span',
                                { className: 'bl' },
                                'Rs 100'
                            ),
                            _react2.default.createElement(
                                'span',
                                { className: 'br' },
                                'Rs 2000'
                            ),
                            _react2.default.createElement(_Range2.default, {
                                min: 100,
                                max: 2000,
                                value: this.state.priceRange,
                                step: 100,
                                className: 'range',
                                onChange: this.handleRange.bind(this, 'priceRange')
                            })
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'widget-content' },
                        _react2.default.createElement(
                            'div',
                            { className: 'filterRow' },
                            _react2.default.createElement(
                                'span',
                                { className: 'tl' },
                                'Female Doctor'
                            ),
                            _react2.default.createElement('input', { type: 'checkbox', name: 'is_female', checked: !!this.state.is_female, onChange: this.handleInput.bind(this), className: 'checkFilter' })
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'widget-footer pd-0' },
                        _react2.default.createElement(
                            'button',
                            { className: 'v-btn v-btn-primary btn-block btn-lg', onClick: this.applyFilters.bind(this) },
                            'Apply'
                        )
                    )
                )
            ) : ""
        );
    }
}

exports.default = TopBar;

/***/ }),

/***/ "./dev/js/components/opd/searchResults/topBar/index.js":
/*!*************************************************************!*\
  !*** ./dev/js/components/opd/searchResults/topBar/index.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _TopBar = __webpack_require__(/*! ./TopBar.js */ "./dev/js/components/opd/searchResults/topBar/TopBar.js");

var _TopBar2 = _interopRequireDefault(_TopBar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _TopBar2.default;

/***/ }),

/***/ "./dev/js/components/opd/searchResultsFilter/SearchResultsFilter.js":
/*!**************************************************************************!*\
  !*** ./dev/js/components/opd/searchResultsFilter/SearchResultsFilter.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__(/*! react */ "react");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(/*! react-redux */ "react-redux");

var _reactRouterDom = __webpack_require__(/*! react-router-dom */ "react-router-dom");

var _Radio = __webpack_require__(/*! material-ui/Radio */ "material-ui/Radio");

var _Radio2 = _interopRequireDefault(_Radio);

var _Checkbox = __webpack_require__(/*! material-ui/Checkbox */ "material-ui/Checkbox");

var _Checkbox2 = _interopRequireDefault(_Checkbox);

var _Form = __webpack_require__(/*! material-ui/Form */ "material-ui/Form");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class SearchResultsFilter extends _react2.default.Component {
    constructor(props) {
        super(props);
        this.state = {
            fee_0: false,
            fee_1: false,
            fee_2: false,
            fee_3: false,
            gender: 'any',
            clinic_personal: false,
            clinic_hospital: false,
            clinic_multi: false,
            available_today: false,
            distance: '30km'
        };
    }

    componentDidMount() {
        this.setState(_extends({}, this.props.filterCriteria));
    }

    applyFilter() {
        this.props.setOPDFilters(this.state);
        this.props.history.go(-1);
    }

    handleCheckbox(name, e) {
        this.setState({ [name]: e.target.checked });
    }

    handleChangeRadio(name, e) {
        this.setState({ [name]: e.target.value });
    }

    render() {

        return _react2.default.createElement(
            'div',
            { className: 'searchResultsFilter' },
            _react2.default.createElement(
                'div',
                { className: 'subFilter' },
                _react2.default.createElement(
                    'p',
                    { className: 'subHeading' },
                    'Fee'
                ),
                _react2.default.createElement(
                    _Radio.RadioGroup,
                    {
                        'aria-label': 'fee',
                        name: 'fee1'
                    },
                    _react2.default.createElement(_Form.FormControlLabel, { control: _react2.default.createElement(_Checkbox2.default, {
                            checked: this.state.fee_0,
                            onChange: this.handleCheckbox.bind(this, 'fee_0')
                        }), label: 'Less than 300' }),
                    _react2.default.createElement(_Form.FormControlLabel, { control: _react2.default.createElement(_Checkbox2.default, {
                            checked: this.state.fee_1,
                            onChange: this.handleCheckbox.bind(this, 'fee_1')
                        }), label: '300 to 500' }),
                    _react2.default.createElement(_Form.FormControlLabel, { control: _react2.default.createElement(_Checkbox2.default, {
                            checked: this.state.fee_2,
                            onChange: this.handleCheckbox.bind(this, 'fee_2')
                        }), label: '500 to 1000' }),
                    _react2.default.createElement(_Form.FormControlLabel, { control: _react2.default.createElement(_Checkbox2.default, {
                            checked: this.state.fee_3,
                            onChange: this.handleCheckbox.bind(this, 'fee_3')
                        }), label: '1000+' })
                )
            ),
            _react2.default.createElement(
                'div',
                { className: 'subFilter' },
                _react2.default.createElement(
                    'p',
                    { className: 'subHeading' },
                    'Distance'
                ),
                _react2.default.createElement(
                    _Radio.RadioGroup,
                    {
                        'aria-label': 'Distance',
                        name: 'Distance2',
                        value: this.state.distance,
                        onChange: this.handleChangeRadio.bind(this, 'distance')
                    },
                    _react2.default.createElement(_Form.FormControlLabel, { value: '30km', control: _react2.default.createElement(_Radio2.default, { color: 'primary' }), label: 'Under 30 KM' }),
                    _react2.default.createElement(_Form.FormControlLabel, { value: '20km', control: _react2.default.createElement(_Radio2.default, { color: 'primary' }), label: 'Under 20 KM' }),
                    _react2.default.createElement(_Form.FormControlLabel, { value: '10km', control: _react2.default.createElement(_Radio2.default, { color: 'primary' }), label: 'Under 10 KM' }),
                    _react2.default.createElement(_Form.FormControlLabel, { value: '5km', control: _react2.default.createElement(_Radio2.default, { color: 'primary' }), label: 'Under 5 KM' })
                )
            ),
            _react2.default.createElement(
                'div',
                { className: 'subFilter' },
                _react2.default.createElement(
                    'p',
                    { className: 'subHeading' },
                    'Type Of Clinic'
                ),
                _react2.default.createElement(
                    _Radio.RadioGroup,
                    {
                        'aria-label': 'clinicType',
                        name: 'clinicType'
                    },
                    _react2.default.createElement(_Form.FormControlLabel, { control: _react2.default.createElement(_Checkbox2.default, {
                            checked: this.state.clinic_personal,
                            onChange: this.handleCheckbox.bind(this, 'clinic_personal')
                        }), label: 'Personal' }),
                    _react2.default.createElement(_Form.FormControlLabel, { control: _react2.default.createElement(_Checkbox2.default, {
                            checked: this.state.clinic_hospital,
                            onChange: this.handleCheckbox.bind(this, 'clinic_hospital')
                        }), label: 'Hospital' }),
                    _react2.default.createElement(_Form.FormControlLabel, { control: _react2.default.createElement(_Checkbox2.default, {
                            checked: this.state.clinic_multi,
                            onChange: this.handleCheckbox.bind(this, 'clinic_multi')
                        }), label: 'Multi-doctor clinic' })
                )
            ),
            _react2.default.createElement(
                'div',
                { className: 'subFilter' },
                _react2.default.createElement(
                    'p',
                    { className: 'subHeading' },
                    'Gender'
                ),
                _react2.default.createElement(
                    _Radio.RadioGroup,
                    {
                        'aria-label': 'gender',
                        name: 'gender2',
                        value: this.state.gender,
                        onChange: this.handleChangeRadio.bind(this, 'gender')
                    },
                    _react2.default.createElement(_Form.FormControlLabel, { value: 'any', control: _react2.default.createElement(_Radio2.default, { color: 'primary' }), label: 'Any' }),
                    _react2.default.createElement(_Form.FormControlLabel, { value: 'male', control: _react2.default.createElement(_Radio2.default, { color: 'primary' }), label: 'Male' }),
                    _react2.default.createElement(_Form.FormControlLabel, { value: 'female', control: _react2.default.createElement(_Radio2.default, { color: 'primary' }), label: 'Female' })
                )
            ),
            _react2.default.createElement(
                'div',
                { className: 'subFilter' },
                _react2.default.createElement(
                    'p',
                    { className: 'subHeading' },
                    'Availability'
                ),
                _react2.default.createElement(
                    _Radio.RadioGroup,
                    {
                        'aria-label': 'availability',
                        name: 'availability'
                    },
                    _react2.default.createElement(_Form.FormControlLabel, { control: _react2.default.createElement(_Checkbox2.default, {
                            checked: this.state.available_today,
                            onChange: this.handleCheckbox.bind(this, 'available_today')
                        }), label: 'Avialable Today' }),
                    'label="Multi-doctor clinic" />'
                )
            ),
            _react2.default.createElement(
                'button',
                { className: 'applyFilter', onClick: this.applyFilter.bind(this) },
                'Apply'
            )
        );
    }
}

exports.default = (0, _reactRouterDom.withRouter)(SearchResultsFilter);

/***/ }),

/***/ "./dev/js/components/opd/searchResultsFilter/index.js":
/*!************************************************************!*\
  !*** ./dev/js/components/opd/searchResultsFilter/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _SearchResultsFilter = __webpack_require__(/*! ./SearchResultsFilter.js */ "./dev/js/components/opd/searchResultsFilter/SearchResultsFilter.js");

var _SearchResultsFilter2 = _interopRequireDefault(_SearchResultsFilter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _SearchResultsFilter2.default;

/***/ }),

/***/ "./dev/js/constants/types.js":
/*!***********************************!*\
  !*** ./dev/js/constants/types.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
//AUTH ACTIONS
const SEND_OTP_REQUEST = exports.SEND_OTP_REQUEST = 'SEND_OTP_REQUEST';
const SEND_OTP_SUCCESS = exports.SEND_OTP_SUCCESS = 'SEND_OTP_SUCCESS';
const SEND_OTP_FAIL = exports.SEND_OTP_FAIL = 'SEND_OTP_FAIL';
const SUBMIT_OTP_REQUEST = exports.SUBMIT_OTP_REQUEST = 'SUBMIT_OTP_REQUEST';
const SUBMIT_OTP_SUCCESS = exports.SUBMIT_OTP_SUCCESS = 'SUBMIT_OTP_SUCCESS';
const SUBMIT_OTP_FAIL = exports.SUBMIT_OTP_FAIL = 'SUBMIT_OTP_FAIL';

// OPD FLOW
const APPEND_DOCTORS = exports.APPEND_DOCTORS = 'APPEND_DOCTORS';
const DOCTOR_SEARCH = exports.DOCTOR_SEARCH = 'DOCTOR_SEARCH';
const DOCTOR_SEARCH_START = exports.DOCTOR_SEARCH_START = 'DOCTOR_SEARCH_START';
const SELECT_LOCATION_OPD = exports.SELECT_LOCATION_OPD = 'SELECT_LOCATION_OPD';
const MERGE_SEARCH_STATE_OPD = exports.MERGE_SEARCH_STATE_OPD = 'MERGE_SEARCH_STATE_OPD';
const TOGGLE_OPD_CRITERIA = exports.TOGGLE_OPD_CRITERIA = 'TOGGLE_OPD_CRITERIA';
const SET_OPD_FILTERS = exports.SET_OPD_FILTERS = 'SET_OPD_FILTERS';
const LOAD_SEARCH_CRITERIA_OPD = exports.LOAD_SEARCH_CRITERIA_OPD = 'LOAD_SEARCH_CRITERIA_OPD';

// DIAG FLOW
const TOGGLE_DIAGNOSIS_CRITERIA = exports.TOGGLE_DIAGNOSIS_CRITERIA = 'TOGGLE_DIAGNOSIS_CRITERIA';
const MERGE_SEARCH_STATE_LAB = exports.MERGE_SEARCH_STATE_LAB = 'MERGE_SEARCH_STATE_LAB';
const LOAD_SEARCH_CRITERIA_LAB = exports.LOAD_SEARCH_CRITERIA_LAB = 'LOAD_SEARCH_CRITERIA_LAB';
const APPEND_LABS = exports.APPEND_LABS = 'APPEND_LABS';
const LAB_SEARCH = exports.LAB_SEARCH = 'LAB_SEARCH';
const SELECT_LOCATION_DIAGNOSIS = exports.SELECT_LOCATION_DIAGNOSIS = 'SELECT_LOCATION_DIAGNOSIS';
const APPEND_FILTERS_DIAGNOSIS = exports.APPEND_FILTERS_DIAGNOSIS = 'APPEND_FILTERS_DIAGNOSIS';
const LAB_SEARCH_START = exports.LAB_SEARCH_START = 'LAB_SEARCH_START';

// AUTH FLOW
const APPEND_USER_PROFILES = exports.APPEND_USER_PROFILES = 'APPEND_USER_PROFILES';

/***/ }),

/***/ "./dev/js/containers/commons/Chat.js":
/*!*******************************************!*\
  !*** ./dev/js/containers/commons/Chat.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(/*! react */ "react");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(/*! react-redux */ "react-redux");

__webpack_require__(/*! ../../actions/index.js */ "./dev/js/actions/index.js");

var _index = __webpack_require__(/*! ../../components/commons/chat/index.js */ "./dev/js/components/commons/chat/index.js");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Chat extends _react2.default.Component {
    constructor(props) {
        super(props);
    }

    render() {

        return _react2.default.createElement(_index2.default, this.props);
    }
}

const mapStateToProps = state => {
    const USER = state.USER;

    return {
        USER
    };
};

const mapDispatchToProps = dispatch => {
    return {};
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Chat);

/***/ }),

/***/ "./dev/js/containers/commons/OtpVerify.js":
/*!************************************************!*\
  !*** ./dev/js/containers/commons/OtpVerify.js ***!
  \************************************************/
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

var _otpVerify = __webpack_require__(/*! ../../components/commons/otpVerify */ "./dev/js/components/commons/otpVerify/index.js");

var _otpVerify2 = _interopRequireDefault(_otpVerify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class OtpVerify extends _react2.default.Component {
    constructor(props) {
        super(props);
    }

    render() {

        return _react2.default.createElement(_otpVerify2.default, this.props);
    }
}

OtpVerify.contextTypes = {
    router: () => null
};
const mapStateToProps = state => {
    let {
        token,
        error_message,
        success_message,
        phoneNumber,
        submit_otp,
        submit_otp_success,
        submit_otp_fail
    } = state.AUTH;

    return {
        token,
        error_message,
        success_message,
        phoneNumber,
        submit_otp,
        submit_otp_success,
        submit_otp_fail
    };
};

const mapDispatchToProps = dispatch => {
    return {
        submitOTP: (number, otp, cb) => dispatch((0, _index.submitOTP)(number, otp, cb))
    };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(OtpVerify);

/***/ }),

/***/ "./dev/js/containers/commons/UserAppointments.js":
/*!*******************************************************!*\
  !*** ./dev/js/containers/commons/UserAppointments.js ***!
  \*******************************************************/
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

var _index2 = __webpack_require__(/*! ../../components/commons/userAppointments/index.js */ "./dev/js/components/commons/userAppointments/index.js");

var _index3 = _interopRequireDefault(_index2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UserAppointments extends _react2.default.Component {
    constructor(props) {
        super(props);
    }

    render() {

        return _react2.default.createElement(_index3.default, this.props);
    }
}

const mapStateToProps = state => {
    const USER = state.USER;

    return {
        USER
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getUserProfileWithAppointments: () => dispatch((0, _index.getUserProfileWithAppointments)())
    };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(UserAppointments);

/***/ }),

/***/ "./dev/js/containers/commons/UserLogin.js":
/*!************************************************!*\
  !*** ./dev/js/containers/commons/UserLogin.js ***!
  \************************************************/
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

var _UserLogin = __webpack_require__(/*! ../../components/commons/UserLogin */ "./dev/js/components/commons/UserLogin/index.js");

var _UserLogin2 = _interopRequireDefault(_UserLogin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UserLogin extends _react2.default.Component {
    constructor(props) {
        super(props);
    }

    render() {

        return _react2.default.createElement(_UserLogin2.default, this.props);
    }
}

UserLogin.contextTypes = {
    router: () => null
};
const mapStateToProps = state => {
    let {
        token,
        error_message,
        success_message,
        otp_request_sent,
        otp_request_success,
        otp_request_fail,
        phoneNumber
    } = state.AUTH;

    return {
        token,
        error_message,
        success_message,
        otp_request_sent,
        otp_request_success,
        otp_request_fail,
        phoneNumber
    };
};

const mapDispatchToProps = dispatch => {
    return {
        sendOTP: (number, cb) => dispatch((0, _index.sendOTP)(number, cb))
    };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(UserLogin);

/***/ }),

/***/ "./dev/js/containers/commons/UserProfile.js":
/*!**************************************************!*\
  !*** ./dev/js/containers/commons/UserProfile.js ***!
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

var _index2 = __webpack_require__(/*! ../../components/commons/userProfile/index.js */ "./dev/js/components/commons/userProfile/index.js");

var _index3 = _interopRequireDefault(_index2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UserProfile extends _react2.default.Component {
    constructor(props) {
        super(props);
    }

    render() {

        return _react2.default.createElement(_index3.default, this.props);
    }
}

const mapStateToProps = state => {
    const USER = state.USER;

    return {
        USER
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getUserProfile: () => dispatch((0, _index.getUserProfile)())
    };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(UserProfile);

/***/ }),

/***/ "./dev/js/containers/commons/UserReports.js":
/*!**************************************************!*\
  !*** ./dev/js/containers/commons/UserReports.js ***!
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

var _index2 = __webpack_require__(/*! ../../components/commons/userReports/index.js */ "./dev/js/components/commons/userReports/index.js");

var _index3 = _interopRequireDefault(_index2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UserReports extends _react2.default.Component {
    constructor(props) {
        super(props);
    }

    render() {

        return _react2.default.createElement(_index3.default, this.props);
    }
}

const mapStateToProps = state => {
    const USER = state.USER;

    return {
        USER
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getUserProfileWithTests: () => dispatch((0, _index.getUserProfileWithTests)())
    };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(UserReports);

/***/ }),

/***/ "./dev/js/containers/commons/UserSignup.js":
/*!*************************************************!*\
  !*** ./dev/js/containers/commons/UserSignup.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(/*! react */ "react");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(/*! react-redux */ "react-redux");

__webpack_require__(/*! ../../actions/index.js */ "./dev/js/actions/index.js");

var _userSignup = __webpack_require__(/*! ../../components/commons/userSignup */ "./dev/js/components/commons/userSignup/index.js");

var _userSignup2 = _interopRequireDefault(_userSignup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UserSignup extends _react2.default.Component {
    constructor(props) {
        super(props);
    }

    render() {

        return _react2.default.createElement(_userSignup2.default, this.props);
    }
}

UserSignup.contextTypes = {
    router: () => null
};
const mapStateToProps = state => {
    const USER = state.USER;

    return {
        USER
    };
};

const mapDispatchToProps = dispatch => {
    return {};
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(UserSignup);

/***/ }),

/***/ "./dev/js/containers/diagnosis/BookingSummary.js":
/*!*******************************************************!*\
  !*** ./dev/js/containers/diagnosis/BookingSummary.js ***!
  \*******************************************************/
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

var _index2 = __webpack_require__(/*! ../../components/diagnosis/bookingSummary/index.js */ "./dev/js/components/diagnosis/bookingSummary/index.js");

var _index3 = _interopRequireDefault(_index2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class BookingSummary extends _react2.default.Component {
    constructor(props) {
        super(props);
    }

    render() {

        return _react2.default.createElement(_index3.default, this.props);
    }
}

BookingSummary.contextTypes = {
    router: () => null
};
const mapStateToProps = state => {

    const {
        selectedCriterias
    } = state.SEARCH_CRITERIA_LABS;

    let LABS = state.LABS;

    return {
        selectedCriterias,
        LABS
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getLabById: labId => dispatch((0, _index.getLabById)(labId))
    };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(BookingSummary);

/***/ }),

/***/ "./dev/js/containers/diagnosis/Lab.js":
/*!********************************************!*\
  !*** ./dev/js/containers/diagnosis/Lab.js ***!
  \********************************************/
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

var _index2 = __webpack_require__(/*! ../../components/diagnosis/lab/index.js */ "./dev/js/components/diagnosis/lab/index.js");

var _index3 = _interopRequireDefault(_index2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Lab extends _react2.default.Component {
    constructor(props) {
        super(props);
    }

    static loadData(store, match) {
        return store.dispatch((0, _index.getLabById)(match.params.id));
    }

    componentDidMount() {
        this.props.getLabById(this.props.match.params.id);
    }

    render() {

        return _react2.default.createElement(_index3.default, this.props);
    }
}

Lab.contextTypes = {
    router: () => null
};
const mapStateToProps = state => {

    const {
        selectedLocation,
        selectedCriterias,
        filterCriteria,
        LOADED_SEARCH_CRITERIA_LAB
    } = state.SEARCH_CRITERIA_LABS;

    let LABS = state.LABS;

    return {
        selectedCriterias,
        LABS
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getLabById: labId => dispatch((0, _index.getLabById)(labId))
    };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Lab);

/***/ }),

/***/ "./dev/js/containers/diagnosis/PatientDetails.js":
/*!*******************************************************!*\
  !*** ./dev/js/containers/diagnosis/PatientDetails.js ***!
  \*******************************************************/
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

var _index2 = __webpack_require__(/*! ../../components/diagnosis/patientDetails/index.js */ "./dev/js/components/diagnosis/patientDetails/index.js");

var _index3 = _interopRequireDefault(_index2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class PatientDetails extends _react2.default.Component {
    constructor(props) {
        super(props);
    }

    render() {

        return _react2.default.createElement(_index3.default, this.props);
    }
}

const mapStateToProps = state => {

    let LABS = state.LABS;

    return {
        LABS
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getLabById: (labId, testIds) => dispatch((0, _index.getLabById)(labId, testIds))
    };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(PatientDetails);

/***/ }),

/***/ "./dev/js/containers/diagnosis/SearchCriteria.js":
/*!*******************************************************!*\
  !*** ./dev/js/containers/diagnosis/SearchCriteria.js ***!
  \*******************************************************/
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

var _index2 = __webpack_require__(/*! ../../components/diagnosis/searchCriteria/index.js */ "./dev/js/components/diagnosis/searchCriteria/index.js");

var _index3 = _interopRequireDefault(_index2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class SearchCriteria extends _react2.default.Component {
    constructor(props) {
        super(props);
    }

    static loadData(store) {
        return store.dispatch((0, _index.loadLabCommonCriterias)());
    }

    componentDidMount() {
        this.props.loadLabCommonCriterias();
    }

    render() {
        return _react2.default.createElement(_index3.default, this.props);
    }
}

SearchCriteria.contextTypes = {
    router: () => null
};
const mapStateToProps = state => {

    const {
        LOADED_SEARCH_CRITERIA_LAB,
        common_tests,
        common_conditions,
        preferred_labs,
        selectedCriterias,
        selectedLocation,
        filterCriteria
    } = state.SEARCH_CRITERIA_LABS;

    return {
        LOADED_SEARCH_CRITERIA_LAB,
        common_tests,
        common_conditions,
        preferred_labs,
        selectedCriterias,
        selectedLocation,
        filterCriteria
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadLabCommonCriterias: () => dispatch((0, _index.loadLabCommonCriterias)()),
        toggleDiagnosisCriteria: (type, criteria) => dispatch((0, _index.toggleDiagnosisCriteria)(type, criteria)),
        getDiagnosisCriteriaResults: (searchString, callback) => dispatch((0, _index.getDiagnosisCriteriaResults)(searchString, callback))
    };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(SearchCriteria);

/***/ }),

/***/ "./dev/js/containers/diagnosis/SearchResults.js":
/*!******************************************************!*\
  !*** ./dev/js/containers/diagnosis/SearchResults.js ***!
  \******************************************************/
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

var _index2 = __webpack_require__(/*! ../../components/diagnosis/searchResults/index.js */ "./dev/js/components/diagnosis/searchResults/index.js");

var _index3 = _interopRequireDefault(_index2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class SearchResults extends _react2.default.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {

        return _react2.default.createElement(_index3.default, this.props);
    }
}

SearchResults.contextTypes = {
    router: () => null
};
const mapStateToProps = state => {
    const {
        selectedLocation,
        selectedCriterias,
        filterCriteria,
        LOADED_SEARCH_CRITERIA_LAB
    } = state.SEARCH_CRITERIA_LABS;

    const LABS = state.LABS;
    const { labList, LOADED_LABS_SEARCH } = state.LAB_SEARCH;

    return {
        selectedLocation,
        selectedCriterias,
        filterCriteria,
        LOADED_SEARCH_CRITERIA_LAB,
        LABS,
        labList, LOADED_LABS_SEARCH
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getLabs: (searchState, filterCriteria, mergeState) => dispatch((0, _index.getLabs)(searchState, filterCriteria, mergeState)),
        toggleDiagnosisCriteria: (type, criteria) => dispatch((0, _index.toggleDiagnosisCriteria)(type, criteria)),
        getDiagnosisCriteriaResults: (searchString, callback) => dispatch((0, _index.getDiagnosisCriteriaResults)(searchString, callback))
    };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(SearchResults);

/***/ }),

/***/ "./dev/js/containers/diagnosis/TestSelector.js":
/*!*****************************************************!*\
  !*** ./dev/js/containers/diagnosis/TestSelector.js ***!
  \*****************************************************/
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

var _testSelector = __webpack_require__(/*! ../../components/diagnosis/testSelector */ "./dev/js/components/diagnosis/testSelector/index.js");

var _testSelector2 = _interopRequireDefault(_testSelector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class TestSelector extends _react2.default.Component {
    constructor(props) {
        super(props);
    }

    render() {

        return _react2.default.createElement(_testSelector2.default, this.props);
    }
}

TestSelector.contextTypes = {
    router: () => null
};
const mapStateToProps = state => {

    const {
        selectedLocation,
        selectedCriterias,
        filterCriteria,
        LOADED_SEARCH_CRITERIA_LAB
    } = state.SEARCH_CRITERIA_LABS;

    let LABS = state.LABS;

    return {
        selectedCriterias,
        LABS
    };
};

const mapDispatchToProps = dispatch => {
    return {
        toggleDiagnosisCriteria: (type, criteria) => dispatch((0, _index.toggleDiagnosisCriteria)(type, criteria)),
        getLabById: labId => dispatch((0, _index.getLabById)(labId))
    };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(TestSelector);

/***/ }),

/***/ "./dev/js/containers/opd/AppointmentSlot.js":
/*!**************************************************!*\
  !*** ./dev/js/containers/opd/AppointmentSlot.js ***!
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

var _index2 = __webpack_require__(/*! ../../components/opd/appointmentSlot/index.js */ "./dev/js/components/opd/appointmentSlot/index.js");

var _index3 = _interopRequireDefault(_index2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class AppointmentSlot extends _react2.default.Component {
    constructor(props) {
        super(props);
    }

    render() {

        return _react2.default.createElement(_index3.default, this.props);
    }
}

const mapStateToProps = state => {

    let DOCTORS = state.DOCTORS;

    return {
        DOCTORS
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getDoctorById: doctorId => dispatch((0, _index.getDoctorById)(doctorId)),
        getTimeSlots: (doctorId, clinicId, callback) => dispatch((0, _index.getTimeSlots)(doctorId, clinicId, callback))
    };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(AppointmentSlot);

/***/ }),

/***/ "./dev/js/containers/opd/Booking.js":
/*!******************************************!*\
  !*** ./dev/js/containers/opd/Booking.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(/*! react */ "react");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(/*! react-redux */ "react-redux");

__webpack_require__(/*! ../../actions/index.js */ "./dev/js/actions/index.js");

var _BookingView = __webpack_require__(/*! ../../components/opd/booking/BookingView.js */ "./dev/js/components/opd/booking/BookingView.js");

var _BookingView2 = _interopRequireDefault(_BookingView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Booking extends _react2.default.Component {
    constructor(props) {
        super(props);
    }

    render() {

        return _react2.default.createElement(_BookingView2.default, this.props);
    }
}

const mapStateToProps = state => {

    return {};
};

const mapDispatchToProps = dispatch => {
    return {};
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Booking);

/***/ }),

/***/ "./dev/js/containers/opd/ClinicList.js":
/*!*********************************************!*\
  !*** ./dev/js/containers/opd/ClinicList.js ***!
  \*********************************************/
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

var _index2 = __webpack_require__(/*! ../../components/opd/clinicList/index.js */ "./dev/js/components/opd/clinicList/index.js");

var _index3 = _interopRequireDefault(_index2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ClinicList extends _react2.default.Component {
    constructor(props) {
        super(props);
    }

    render() {

        return _react2.default.createElement(_index3.default, this.props);
    }
}

const mapStateToProps = state => {

    let DOCTORS = state.DOCTORS;

    return {
        DOCTORS
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getDoctorById: doctorId => dispatch((0, _index.getDoctorById)(doctorId))
    };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(ClinicList);

/***/ }),

/***/ "./dev/js/containers/opd/CriteriaSearch.js":
/*!*************************************************!*\
  !*** ./dev/js/containers/opd/CriteriaSearch.js ***!
  \*************************************************/
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

var _index2 = __webpack_require__(/*! ../../components/opd/criteriaSearch/index.js */ "./dev/js/components/opd/criteriaSearch/index.js");

var _index3 = _interopRequireDefault(_index2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class CriteriaSearch extends _react2.default.Component {
    constructor(props) {
        super(props);
    }

    render() {

        return _react2.default.createElement(_index3.default, this.props);
    }
}

const mapStateToProps = state => {

    return {};
};

const mapDispatchToProps = dispatch => {
    return {
        getCriteriaResults: (searchString, cb) => dispatch((0, _index.getCriteriaResults)(searchString, cb)),
        toggleCriteria: criteria => dispatch((0, _index.toggleCriteria)(criteria))
    };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(CriteriaSearch);

/***/ }),

/***/ "./dev/js/containers/opd/DoctorProfile.js":
/*!************************************************!*\
  !*** ./dev/js/containers/opd/DoctorProfile.js ***!
  \************************************************/
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

var _index2 = __webpack_require__(/*! ../../components/opd/doctorProfile/index.js */ "./dev/js/components/opd/doctorProfile/index.js");

var _index3 = _interopRequireDefault(_index2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class DoctorProfile extends _react2.default.Component {
    constructor(props) {
        super(props);
    }

    render() {

        return _react2.default.createElement(_index3.default, this.props);
    }
}

const mapStateToProps = state => {

    let DOCTORS = state.DOCTORS;

    return {
        DOCTORS
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getDoctorById: doctorId => dispatch((0, _index.getDoctorById)(doctorId))
    };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(DoctorProfile);

/***/ }),

/***/ "./dev/js/containers/opd/LocationSearch.js":
/*!*************************************************!*\
  !*** ./dev/js/containers/opd/LocationSearch.js ***!
  \*************************************************/
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

var _index2 = __webpack_require__(/*! ../../components/opd/locationSearch/index.js */ "./dev/js/components/opd/locationSearch/index.js");

var _index3 = _interopRequireDefault(_index2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class LocationSearch extends _react2.default.Component {
    constructor(props) {
        super(props);
    }

    render() {

        return _react2.default.createElement(_index3.default, this.props);
    }
}

LocationSearch.contextTypes = {
    router: () => null
};
const mapStateToProps = state => {
    const {
        selectedLocation
    } = state.SEARCH_CRITERIA_OPD;

    return {
        selectedLocation
    };
};

const mapDispatchToProps = dispatch => {
    return {
        selectLocation: location => dispatch((0, _index.selectLocation)(location))
    };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(LocationSearch);

/***/ }),

/***/ "./dev/js/containers/opd/PatientDetails.js":
/*!*************************************************!*\
  !*** ./dev/js/containers/opd/PatientDetails.js ***!
  \*************************************************/
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

var _index2 = __webpack_require__(/*! ../../components/opd/patientDetails/index.js */ "./dev/js/components/opd/patientDetails/index.js");

var _index3 = _interopRequireDefault(_index2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class PatientDetails extends _react2.default.Component {
    constructor(props) {
        super(props);
    }

    render() {

        return _react2.default.createElement(_index3.default, this.props);
    }
}

const mapStateToProps = state => {

    let DOCTORS = state.DOCTORS;

    return {
        DOCTORS
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getDoctorById: doctorId => dispatch((0, _index.getDoctorById)(doctorId))
    };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(PatientDetails);

/***/ }),

/***/ "./dev/js/containers/opd/Payment.js":
/*!******************************************!*\
  !*** ./dev/js/containers/opd/Payment.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(/*! react */ "react");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(/*! react-redux */ "react-redux");

__webpack_require__(/*! ../../actions/index.js */ "./dev/js/actions/index.js");

var _PaymentView = __webpack_require__(/*! ../../components/opd/payment/PaymentView.js */ "./dev/js/components/opd/payment/PaymentView.js");

var _PaymentView2 = _interopRequireDefault(_PaymentView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Payment extends _react2.default.Component {
    constructor(props) {
        super(props);
    }

    render() {

        return _react2.default.createElement(_PaymentView2.default, this.props);
    }
}

const mapStateToProps = state => {

    return {};
};

const mapDispatchToProps = dispatch => {
    return {};
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Payment);

/***/ }),

/***/ "./dev/js/containers/opd/SearchCriteria.js":
/*!*************************************************!*\
  !*** ./dev/js/containers/opd/SearchCriteria.js ***!
  \*************************************************/
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

var _index2 = __webpack_require__(/*! ../../components/opd/searchCriteria/index.js */ "./dev/js/components/opd/searchCriteria/index.js");

var _index3 = _interopRequireDefault(_index2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class SearchCriteria extends _react2.default.Component {
    constructor(props) {
        super(props);
    }

    static loadData(store) {
        return store.dispatch((0, _index.loadOPDCommonCriteria)());
    }

    componentDidMount() {
        this.props.loadOPDCommonCriteria();
    }

    render() {

        return _react2.default.createElement(_index3.default, this.props);
    }
}

SearchCriteria.contextTypes = {
    router: () => null
};
const mapStateToProps = state => {

    const {
        LOADED_SEARCH_CRITERIA_OPD,
        specializations,
        conditions,
        selectedCriterias,
        selectedLocation,
        filterCriteria
    } = state.SEARCH_CRITERIA_OPD;

    return {
        LOADED_SEARCH_CRITERIA_OPD,
        specializations,
        conditions,
        selectedCriterias,
        selectedLocation,
        filterCriteria
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadOPDCommonCriteria: () => dispatch((0, _index.loadOPDCommonCriteria)()),
        toggleOPDCriteria: (type, criteria) => dispatch((0, _index.toggleOPDCriteria)(type, criteria)),
        getOPDCriteriaResults: (searchString, callback) => dispatch((0, _index.getOPDCriteriaResults)(searchString, callback))
    };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(SearchCriteria);

/***/ }),

/***/ "./dev/js/containers/opd/SearchResults.js":
/*!************************************************!*\
  !*** ./dev/js/containers/opd/SearchResults.js ***!
  \************************************************/
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

var _index2 = __webpack_require__(/*! ../../components/opd/searchResults/index.js */ "./dev/js/components/opd/searchResults/index.js");

var _index3 = _interopRequireDefault(_index2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class SearchResults extends _react2.default.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {

        return _react2.default.createElement(_index3.default, this.props);
    }
}

SearchResults.contextTypes = {
    router: () => null
};
const mapStateToProps = state => {

    const {
        LOADED_SEARCH_CRITERIA_OPD,
        selectedCriterias,
        selectedLocation,
        filterCriteria
    } = state.SEARCH_CRITERIA_OPD;

    let DOCTORS = state.DOCTORS;
    let { doctorList, LOADED_DOCTOR_SEARCH } = state.DOCTOR_SEARCH;

    return {
        DOCTORS, doctorList, LOADED_DOCTOR_SEARCH,
        LOADED_SEARCH_CRITERIA_OPD,
        selectedCriterias,
        selectedLocation,
        filterCriteria
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadOPDCommonCriteria: () => dispatch(loadOPDCommonCriteria()),
        toggleOPDCriteria: (type, criteria) => dispatch((0, _index.toggleOPDCriteria)(type, criteria)),
        getDoctors: (searchState, filterCriteria, mergeState) => dispatch((0, _index.getDoctors)(searchState, filterCriteria, mergeState))
    };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(SearchResults);

/***/ }),

/***/ "./dev/js/containers/opd/SearchResultsFilter.js":
/*!******************************************************!*\
  !*** ./dev/js/containers/opd/SearchResultsFilter.js ***!
  \******************************************************/
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

var _index2 = __webpack_require__(/*! ../../components/opd/searchResultsFilter/index.js */ "./dev/js/components/opd/searchResultsFilter/index.js");

var _index3 = _interopRequireDefault(_index2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class SearchResultsFilter extends _react2.default.Component {
    constructor(props) {
        super(props);
    }

    render() {

        return _react2.default.createElement(_index3.default, this.props);
    }
}

const mapStateToProps = state => {

    const {
        filterCriteria
    } = state.SEARCH_CRITERIA_OPD;

    return {
        filterCriteria
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setOPDFilters: filterData => dispatch((0, _index.setOPDFilters)(filterData))
    };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(SearchResultsFilter);

/***/ }),

/***/ "./dev/js/helpers/navigate/index.js":
/*!******************************************!*\
  !*** ./dev/js/helpers/navigate/index.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _navigate = __webpack_require__(/*! ./navigate */ "./dev/js/helpers/navigate/navigate.js");

var _navigate2 = _interopRequireDefault(_navigate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _navigate2.default;

/***/ }),

/***/ "./dev/js/helpers/navigate/navigate.js":
/*!*********************************************!*\
  !*** ./dev/js/helpers/navigate/navigate.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
const NAVIGATE = {
    navigateTo: where => {
        window.location.href = where;
    },

    refreshAppointmentState: props => {
        let noAppointmentFound = props.upcoming.length == 0 && props.previous.length == 0;

        if (props.history.action === 'PUSH' || noAppointmentFound) {
            return true;
        }

        return false;
    }
};

exports.default = NAVIGATE;

/***/ }),

/***/ "./dev/js/helpers/storage/index.js":
/*!*****************************************!*\
  !*** ./dev/js/helpers/storage/index.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _storage = __webpack_require__(/*! ./storage */ "./dev/js/helpers/storage/storage.js");

var _storage2 = _interopRequireDefault(_storage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _storage2.default;

/***/ }),

/***/ "./dev/js/helpers/storage/storage.js":
/*!*******************************************!*\
  !*** ./dev/js/helpers/storage/storage.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _universalCookie = __webpack_require__(/*! universal-cookie */ "universal-cookie");

var _universalCookie2 = _interopRequireDefault(_universalCookie);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const cookies = new _universalCookie2.default();

const STORAGE = {
    setAuthToken: token => {
        cookies.set('token', token);
        return Promise.resolve(true);
    },
    getAuthToken: () => {
        return Promise.resolve(cookies.get('token'));
    },
    checkAuth: () => {
        return !!cookies.get('token');
    },
    deleteAuth: () => {
        return Promise.resolve(cookies.remove('token'));
    }
};

exports.default = STORAGE;

/***/ }),

/***/ "./dev/js/reducers/commons/auth.js":
/*!*****************************************!*\
  !*** ./dev/js/reducers/commons/auth.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = function (state = defaultState, action) {

    switch (action.type) {
        case _types.SEND_OTP_REQUEST:
            {
                let newState = _extends({}, defaultState);

                newState.otp_request_sent = true;
                newState.phoneNumber = action.payload.phoneNumber;

                return newState;
            }

        case _types.SEND_OTP_SUCCESS:
            {
                let newState = _extends({}, state);
                newState.otp_request_sent = false;
                newState.otp_request_success = true;
                newState.otp_request_fail = false;
                newState.success_message = action.payload.success_message;

                return newState;
            }

        case _types.SEND_OTP_FAIL:
            {
                let newState = _extends({}, state);
                newState.otp_request_sent = false;
                newState.otp_request_fail = true;
                newState.otp_request_success = false;
                newState.error_message = action.payload.error_message;

                return newState;
            }

        case _types.SUBMIT_OTP_REQUEST:
            {
                let newState = _extends({}, state);
                newState.submit_otp = true;
                return newState;
            }

        case _types.SUBMIT_OTP_SUCCESS:
            {
                let newState = _extends({}, state);
                newState.submit_otp = false;
                newState.submit_otp_fail = false;
                newState.submit_otp_success = true;
                newState.token = action.payload.token;
                return newState;
            }

        case _types.SUBMIT_OTP_FAIL:
            {
                let newState = _extends({}, state);
                newState.submit_otp = false;
                newState.submit_otp_fail = true;
                newState.submit_otp_success = false;
                newState.error_message = action.payload.error_message;
                return newState;
            }

    }
    return state;
};

var _types = __webpack_require__(/*! ../../constants/types */ "./dev/js/constants/types.js");

const defaultState = {
    token: null,
    error_message: "",
    success_message: "",
    otp_request_sent: false,
    otp_request_success: false,
    otp_request_fail: false,
    phoneNumber: "",
    submit_otp: false,
    submit_otp_success: false,
    submit_otp_fail: false
};

/***/ }),

/***/ "./dev/js/reducers/commons/user.js":
/*!*****************************************!*\
  !*** ./dev/js/reducers/commons/user.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = function (state = defaultState, action) {

    switch (action.type) {
        case _types.APPEND_USER_PROFILES:
            {
                let newState = _extends({}, state, {
                    profiles: _extends({}, state.profiles)
                });

                newState.profiles = action.payload.reduce((profileMap, profile) => {
                    profileMap[profile.profileId] = profile;
                    return profileMap;
                }, newState.profiles);

                return newState;
            }

    }
    return state;
};

var _types = __webpack_require__(/*! ../../constants/types */ "./dev/js/constants/types.js");

const defaultState = {
    profiles: {}
};

/***/ }),

/***/ "./dev/js/reducers/diagnosis/labs.js":
/*!*******************************************!*\
  !*** ./dev/js/reducers/diagnosis/labs.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = function (state = defaultState, action) {

    switch (action.type) {
        case _types.APPEND_LABS:
            {
                let newState = _extends({}, state);

                return action.payload.reduce((lapMap, lab) => {
                    lapMap[lab.lab.id] = lab;
                    return lapMap;
                }, newState);
            }

    }
    return state;
};

var _types = __webpack_require__(/*! ../../constants/types */ "./dev/js/constants/types.js");

const defaultState = {};

/***/ }),

/***/ "./dev/js/reducers/diagnosis/labsSearch.js":
/*!*************************************************!*\
  !*** ./dev/js/reducers/diagnosis/labsSearch.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = function (state = defaultState, action) {

    switch (action.type) {

        case _types.LAB_SEARCH_START:
            {
                let newState = _extends({}, state);

                newState.LOADED_LABS_SEARCH = false;

                return newState;
            }

        case _types.LAB_SEARCH:
            {
                let newState = _extends({}, state);

                newState.labList = action.payload.map(lab => lab.lab.id);
                newState.LOADED_LABS_SEARCH = true;

                return newState;
            }

    }

    return state;
};

var _types = __webpack_require__(/*! ../../constants/types */ "./dev/js/constants/types.js");

const defaultState = {
    labList: [],
    LOADED_LABS_SEARCH: false
};

/***/ }),

/***/ "./dev/js/reducers/diagnosis/searchCriteria.js":
/*!*****************************************************!*\
  !*** ./dev/js/reducers/diagnosis/searchCriteria.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = function (state = defaultState, action) {

    switch (action.type) {
        case _types.LOAD_SEARCH_CRITERIA_LAB:
            {
                let newState = _extends({}, state);
                if (action.payload) {
                    newState = _extends({}, newState, action.payload);
                }
                newState.LOADED_SEARCH_CRITERIA_LAB = true;
                return newState;
            }

        case _types.TOGGLE_DIAGNOSIS_CRITERIA:
            {
                let newState = _extends({}, state, {
                    selectedCriterias: [].concat(state.selectedCriterias)
                });

                let found = false;
                newState.selectedCriterias = newState.selectedCriterias.filter(curr => {
                    if (curr.id == action.payload.criteria.id && curr.type == action.payload.type) {
                        found = true;
                        return false;
                    }
                    return true;
                });

                if (!found) {
                    newState.selectedCriterias.push(_extends({}, action.payload.criteria, {
                        type: action.payload.type
                    }));
                }

                return newState;
            }

        case _types.SELECT_LOCATION_DIAGNOSIS:
            {
                let newState = _extends({}, state);

                newState.selectedLocation = action.payload;
                return newState;
            }

        case _types.MERGE_SEARCH_STATE_LAB:
            {
                let newState = _extends({}, state, action.payload.searchState, { filterCriteria: action.payload.filterCriteria });

                return newState;
            }

    }
    return state;
};

var _types = __webpack_require__(/*! ../../constants/types */ "./dev/js/constants/types.js");

const defaultState = {
    LOADED_SEARCH_CRITERIA_LAB: false,
    common_tests: [],
    common_conditions: [],
    preferred_labs: [],
    selectedCriterias: [],
    selectedLocation: null,
    filterCriteria: {
        priceRange: [100, 1500],
        distanceRange: [1, 35],
        sortBy: null
    }
};

/***/ }),

/***/ "./dev/js/reducers/index.js":
/*!**********************************!*\
  !*** ./dev/js/reducers/index.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _redux = __webpack_require__(/*! redux */ "redux");

var _searchCriteria = __webpack_require__(/*! ./opd/searchCriteria.js */ "./dev/js/reducers/opd/searchCriteria.js");

var _searchCriteria2 = _interopRequireDefault(_searchCriteria);

var _searchCriteria3 = __webpack_require__(/*! ./diagnosis/searchCriteria.js */ "./dev/js/reducers/diagnosis/searchCriteria.js");

var _searchCriteria4 = _interopRequireDefault(_searchCriteria3);

var _doctors = __webpack_require__(/*! ./opd/doctors.js */ "./dev/js/reducers/opd/doctors.js");

var _doctors2 = _interopRequireDefault(_doctors);

var _doctorSearch = __webpack_require__(/*! ./opd/doctorSearch.js */ "./dev/js/reducers/opd/doctorSearch.js");

var _doctorSearch2 = _interopRequireDefault(_doctorSearch);

var _labs = __webpack_require__(/*! ./diagnosis/labs.js */ "./dev/js/reducers/diagnosis/labs.js");

var _labs2 = _interopRequireDefault(_labs);

var _labsSearch = __webpack_require__(/*! ./diagnosis/labsSearch.js */ "./dev/js/reducers/diagnosis/labsSearch.js");

var _labsSearch2 = _interopRequireDefault(_labsSearch);

var _user = __webpack_require__(/*! ./commons/user.js */ "./dev/js/reducers/commons/user.js");

var _user2 = _interopRequireDefault(_user);

var _auth = __webpack_require__(/*! ./commons/auth.js */ "./dev/js/reducers/commons/auth.js");

var _auth2 = _interopRequireDefault(_auth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const allReducers = (0, _redux.combineReducers)({
    SEARCH_CRITERIA_OPD: _searchCriteria2.default,
    SEARCH_CRITERIA_LABS: _searchCriteria4.default,
    DOCTORS: _doctors2.default,
    DOCTOR_SEARCH: _doctorSearch2.default,
    LABS: _labs2.default,
    LAB_SEARCH: _labsSearch2.default,
    USER: _user2.default,
    AUTH: _auth2.default
});

exports.default = allReducers;

/***/ }),

/***/ "./dev/js/reducers/opd/doctorSearch.js":
/*!*********************************************!*\
  !*** ./dev/js/reducers/opd/doctorSearch.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = function (state = defaultState, action) {

    switch (action.type) {

        case _types.DOCTOR_SEARCH_START:
            {
                let newState = _extends({}, state);

                newState.LOADED_DOCTOR_SEARCH = false;

                return newState;
            }

        case _types.DOCTOR_SEARCH:
            {
                let newState = _extends({}, state);

                newState.doctorList = action.payload.map(doc => doc.id);
                newState.LOADED_DOCTOR_SEARCH = true;

                return newState;
            }

    }

    return state;
};

var _types = __webpack_require__(/*! ../../constants/types */ "./dev/js/constants/types.js");

const defaultState = {
    doctorList: [],
    LOADED_DOCTOR_SEARCH: false
};

/***/ }),

/***/ "./dev/js/reducers/opd/doctors.js":
/*!****************************************!*\
  !*** ./dev/js/reducers/opd/doctors.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = function (state = defaultState, action) {

    switch (action.type) {
        case _types.APPEND_DOCTORS:
            {
                let newState = _extends({}, state);

                return action.payload.reduce((doctorMap, doctor) => {
                    doctorMap[doctor.id] = doctor;
                    return doctorMap;
                }, newState);
            }

    }
    return state;
};

var _types = __webpack_require__(/*! ../../constants/types */ "./dev/js/constants/types.js");

const defaultState = {};

/***/ }),

/***/ "./dev/js/reducers/opd/searchCriteria.js":
/*!***********************************************!*\
  !*** ./dev/js/reducers/opd/searchCriteria.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = function (state = defaultState, action) {

    switch (action.type) {
        case _types.LOAD_SEARCH_CRITERIA_OPD:
            {
                let newState = _extends({}, state);
                if (action.payload) {
                    newState = _extends({}, newState, action.payload);
                }
                newState.LOADED_SEARCH_CRITERIA_OPD = true;
                return newState;
            }

        case _types.TOGGLE_OPD_CRITERIA:
            {
                let newState = _extends({}, state, {
                    selectedCriterias: [].concat(state.selectedCriterias)
                });

                let found = false;
                newState.selectedCriterias = newState.selectedCriterias.filter(curr => {
                    if (curr.id == action.payload.criteria.id && curr.type == action.payload.type) {
                        found = true;
                        return false;
                    }
                    return true;
                });

                if (!found) {
                    newState.selectedCriterias.push(_extends({}, action.payload.criteria, {
                        type: action.payload.type
                    }));
                }

                return newState;
            }

        case _types.SELECT_LOCATION_OPD:
            {
                let newState = _extends({}, state);

                newState.selectedLocation = action.payload;
                return newState;
            }

        case _types.MERGE_SEARCH_STATE_OPD:
            {
                let newState = _extends({}, state, action.payload.searchState, { filterCriteria: action.payload.filterCriteria });

                return newState;
            }

    }
    return state;
};

var _types = __webpack_require__(/*! ../../constants/types */ "./dev/js/constants/types.js");

const defaultState = {
    LOADED_SEARCH_CRITERIA_OPD: false,
    specializations: [],
    conditions: [],
    selectedCriterias: [],
    selectedLocation: null,
    filterCriteria: {
        priceRange: [100, 1500],
        sort_on: null,
        sits_at_clinic: false,
        sits_at_hospital: false,
        is_female: false,
        is_available: false
    }
};

/***/ }),

/***/ "./dev/js/routes.js":
/*!**************************!*\
  !*** ./dev/js/routes.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__(/*! react */ "react");

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(/*! react-router-dom */ "react-router-dom");

var _reactTransitionGroup = __webpack_require__(/*! react-transition-group */ "react-transition-group");

var _SearchCriteria = __webpack_require__(/*! ./containers/opd/SearchCriteria.js */ "./dev/js/containers/opd/SearchCriteria.js");

var _SearchCriteria2 = _interopRequireDefault(_SearchCriteria);

var _LocationSearch = __webpack_require__(/*! ./containers/opd/LocationSearch.js */ "./dev/js/containers/opd/LocationSearch.js");

var _LocationSearch2 = _interopRequireDefault(_LocationSearch);

var _SearchResults = __webpack_require__(/*! ./containers/opd/SearchResults.js */ "./dev/js/containers/opd/SearchResults.js");

var _SearchResults2 = _interopRequireDefault(_SearchResults);

var _SearchResultsFilter = __webpack_require__(/*! ./containers/opd/SearchResultsFilter.js */ "./dev/js/containers/opd/SearchResultsFilter.js");

var _SearchResultsFilter2 = _interopRequireDefault(_SearchResultsFilter);

var _DoctorProfile = __webpack_require__(/*! ./containers/opd/DoctorProfile.js */ "./dev/js/containers/opd/DoctorProfile.js");

var _DoctorProfile2 = _interopRequireDefault(_DoctorProfile);

var _ClinicList = __webpack_require__(/*! ./containers/opd/ClinicList.js */ "./dev/js/containers/opd/ClinicList.js");

var _ClinicList2 = _interopRequireDefault(_ClinicList);

var _AppointmentSlot = __webpack_require__(/*! ./containers/opd/AppointmentSlot.js */ "./dev/js/containers/opd/AppointmentSlot.js");

var _AppointmentSlot2 = _interopRequireDefault(_AppointmentSlot);

var _PatientDetails = __webpack_require__(/*! ./containers/opd/PatientDetails.js */ "./dev/js/containers/opd/PatientDetails.js");

var _PatientDetails2 = _interopRequireDefault(_PatientDetails);

var _UserProfile = __webpack_require__(/*! ./containers/commons/UserProfile.js */ "./dev/js/containers/commons/UserProfile.js");

var _UserProfile2 = _interopRequireDefault(_UserProfile);

var _UserAppointments = __webpack_require__(/*! ./containers/commons/UserAppointments.js */ "./dev/js/containers/commons/UserAppointments.js");

var _UserAppointments2 = _interopRequireDefault(_UserAppointments);

var _UserReports = __webpack_require__(/*! ./containers/commons/UserReports.js */ "./dev/js/containers/commons/UserReports.js");

var _UserReports2 = _interopRequireDefault(_UserReports);

var _UserSignup = __webpack_require__(/*! ./containers/commons/UserSignup */ "./dev/js/containers/commons/UserSignup.js");

var _UserSignup2 = _interopRequireDefault(_UserSignup);

var _Payment = __webpack_require__(/*! ./containers/opd/Payment.js */ "./dev/js/containers/opd/Payment.js");

var _Payment2 = _interopRequireDefault(_Payment);

var _Booking = __webpack_require__(/*! ./containers/opd/Booking.js */ "./dev/js/containers/opd/Booking.js");

var _Booking2 = _interopRequireDefault(_Booking);

var _CriteriaSearch = __webpack_require__(/*! ./containers/opd/CriteriaSearch.js */ "./dev/js/containers/opd/CriteriaSearch.js");

var _CriteriaSearch2 = _interopRequireDefault(_CriteriaSearch);

var _SearchCriteria3 = __webpack_require__(/*! ./containers/diagnosis/SearchCriteria.js */ "./dev/js/containers/diagnosis/SearchCriteria.js");

var _SearchCriteria4 = _interopRequireDefault(_SearchCriteria3);

var _SearchResults3 = __webpack_require__(/*! ./containers/diagnosis/SearchResults.js */ "./dev/js/containers/diagnosis/SearchResults.js");

var _SearchResults4 = _interopRequireDefault(_SearchResults3);

var _Lab = __webpack_require__(/*! ./containers/diagnosis/Lab.js */ "./dev/js/containers/diagnosis/Lab.js");

var _Lab2 = _interopRequireDefault(_Lab);

var _PatientDetails3 = __webpack_require__(/*! ./containers/diagnosis/PatientDetails.js */ "./dev/js/containers/diagnosis/PatientDetails.js");

var _PatientDetails4 = _interopRequireDefault(_PatientDetails3);

var _BookingSummary = __webpack_require__(/*! ./containers/diagnosis/BookingSummary.js */ "./dev/js/containers/diagnosis/BookingSummary.js");

var _BookingSummary2 = _interopRequireDefault(_BookingSummary);

var _Chat = __webpack_require__(/*! ./containers/commons/Chat.js */ "./dev/js/containers/commons/Chat.js");

var _Chat2 = _interopRequireDefault(_Chat);

var _TestSelector = __webpack_require__(/*! ./containers/diagnosis/TestSelector */ "./dev/js/containers/diagnosis/TestSelector.js");

var _TestSelector2 = _interopRequireDefault(_TestSelector);

var _UserLogin = __webpack_require__(/*! ./containers/commons/UserLogin */ "./dev/js/containers/commons/UserLogin.js");

var _UserLogin2 = _interopRequireDefault(_UserLogin);

var _OtpVerify = __webpack_require__(/*! ./containers/commons/OtpVerify */ "./dev/js/containers/commons/OtpVerify.js");

var _OtpVerify2 = _interopRequireDefault(_OtpVerify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const routes = [{ path: '/opd', exact: true, component: _SearchCriteria2.default }, { path: '/locationsearch', exact: true, component: _LocationSearch2.default }, { path: '/opd/searchresults', exact: true, component: _SearchResults2.default }, { path: '/doctorprofile/:id', exact: true, component: _DoctorProfile2.default }, { path: '/doctorprofile/:id/availability', exact: true, component: _ClinicList2.default }, { path: '/doctorprofile/:id/:clinicId/book', exact: true, component: _AppointmentSlot2.default }, { path: '/doctorprofile/:id/:clinicId/bookdetails', exact: true, component: _PatientDetails2.default }, { path: '/user/signup', exact: true, component: _UserSignup2.default }, { path: '/user', exact: true, component: _UserProfile2.default }, { path: '/user/:id', exact: true, component: _UserProfile2.default }, { path: '/user/:id/appointments', exact: true, component: _UserAppointments2.default }, { path: '/user/:id/reports', exact: true, component: _UserReports2.default }, { path: '/chat', exact: true, component: _Chat2.default }, { path: '/payment', exact: true, component: _Payment2.default }, { path: '/booking/:refId', exact: true, component: _Booking2.default }, { path: '/login', exact: true, component: _UserLogin2.default }, { path: '/otp/verify', exact: true, component: _OtpVerify2.default }, { path: '/dx', exact: true, component: _SearchCriteria4.default }, { path: '/dx/searchresults', exact: true, component: _SearchResults4.default }, { path: '/lab/:id', exact: true, component: _Lab2.default }, { path: '/lab/:id/tests', exact: true, component: _TestSelector2.default }, { path: '/lab/:id/book', exact: true, component: _BookingSummary2.default }, { path: '/lab/booking/summary/:id', exact: true, component: _BookingSummary2.default }];

class RouterConfig extends _react.Component {

    render() {
        return _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(_reactRouterDom.Route, {
                render: ({ location }) => {
                    return _react2.default.createElement(
                        _reactTransitionGroup.TransitionGroup,
                        null,
                        _react2.default.createElement(
                            _reactTransitionGroup.CSSTransition,
                            {
                                key: location.pathname,
                                classNames: 'fade',
                                timeout: { enter: 300, exit: 0 },
                                exit: false
                            },
                            _react2.default.createElement(
                                _reactRouterDom.Switch,
                                { location: location },
                                routes.map((route, i) => _react2.default.createElement(_reactRouterDom.Route, _extends({}, route, { key: i })))
                            )
                        )
                    );
                }
            })
        );
    }

}

RouterConfig.ROUTES = routes;
exports.default = RouterConfig;

/***/ }),

/***/ "./dev/js/utils/dateTimeUtils.js":
/*!***************************************!*\
  !*** ./dev/js/utils/dateTimeUtils.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const getTime = exports.getTime = timeStamp => {
    var date = new Date(timeStamp);
    var hours = date.getHours();
    var minutes = "0" + date.getMinutes();
    return hours + ':' + minutes.substr(-2);
};
const getDayName = exports.getDayName = timeStamp => {
    return days[new Date(timeStamp).getDay()];
};

/***/ }),

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _react = __webpack_require__(/*! react */ "react");

var _react2 = _interopRequireDefault(_react);

var _server = __webpack_require__(/*! react-dom/server */ "react-dom/server");

var _server2 = _interopRequireDefault(_server);

var _reactRouter = __webpack_require__(/*! react-router */ "react-router");

var _routes = __webpack_require__(/*! ./dev/js/routes.js */ "./dev/js/routes.js");

var _routes2 = _interopRequireDefault(_routes);

var _styles = __webpack_require__(/*! material-ui/styles */ "material-ui/styles");

var _jss = __webpack_require__(/*! react-jss/lib/jss */ "react-jss/lib/jss");

var _JssProvider = __webpack_require__(/*! react-jss/lib/JssProvider */ "react-jss/lib/JssProvider");

var _JssProvider2 = _interopRequireDefault(_JssProvider);

var _reactRedux = __webpack_require__(/*! react-redux */ "react-redux");

var _redux = __webpack_require__(/*! redux */ "redux");

var _reduxThunk = __webpack_require__(/*! redux-thunk */ "redux-thunk");

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _reduxLogger = __webpack_require__(/*! redux-logger */ "redux-logger");

var _index = __webpack_require__(/*! ./dev/js/reducers/index.js */ "./dev/js/reducers/index.js");

var _index2 = _interopRequireDefault(_index);

var _reactRouterDom = __webpack_require__(/*! react-router-dom */ "react-router-dom");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const path = __webpack_require__(/*! path */ "path");
const http = __webpack_require__(/*! http */ "http");
const Express = __webpack_require__(/*! express */ "express");
const app = new Express();
const server = new http.Server(app);

app.use('/assets', Express.static(path.join(__dirname, 'assets')));
app.use('/dist', Express.static(path.join(__dirname, 'dist')));

app.use('/api', Express.static(path.join(__dirname, 'dummy_api')));

app.get('*', function (req, res) {

    const context = {};

    const store = (0, _redux.createStore)(_index2.default, (0, _redux.applyMiddleware)(_reduxThunk2.default));

    const sheetsRegistry = new _jss.SheetsRegistry();
    const theme = (0, _styles.createMuiTheme)({
        palette: {
            primary: {
                main: '#00b7b0'
            },
            secondary: {
                main: '#00b7b0'
            }
        },
        status: {
            danger: 'orange'
        }
    });
    const generateClassName = (0, _styles.createGenerateClassName)();

    if (context.url) {
        res.writeHead(301, {
            Location: context.url
        });
        res.end();
    } else {

        // inside a request
        const promises = [];

        _routes2.default.ROUTES.some(route => {
            // use `matchPath` here
            const match = (0, _reactRouterDom.matchPath)(req.path, route);
            if (match && route.component.loadData) promises.push(route.component.loadData(store, match));
            return match;
        });

        Promise.all(promises).then(data => {
            const storeData = JSON.stringify(store.getState());
            const html = _server2.default.renderToString(_react2.default.createElement(
                _reactRedux.Provider,
                { store: store },
                _react2.default.createElement(
                    _JssProvider2.default,
                    { registry: sheetsRegistry, generateClassName: generateClassName },
                    _react2.default.createElement(
                        _styles.MuiThemeProvider,
                        { theme: theme },
                        _react2.default.createElement(
                            _reactRouter.StaticRouter,
                            {
                                location: req.url,
                                context: context
                            },
                            _react2.default.createElement(_routes2.default, null)
                        )
                    )
                )
            ));
            const css = sheetsRegistry.toString();

            res.render('./index.template.ejs', {
                html, css, storeData
            });
        });
    }
});

app.use(function (req, res) {
    res.sendFile('index.html', { root: './dist/' });
});

server.listen(3000, err => {
    if (err) {
        return console.error(err);
    }
    console.info('Server running on http://localhost:3000');
});

/***/ }),

/***/ "axios":
/*!************************!*\
  !*** external "axios" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("axios");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),

/***/ "material-ui-icons/AccountCircle":
/*!**************************************************!*\
  !*** external "material-ui-icons/AccountCircle" ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("material-ui-icons/AccountCircle");

/***/ }),

/***/ "material-ui-icons/AttachMoney":
/*!************************************************!*\
  !*** external "material-ui-icons/AttachMoney" ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("material-ui-icons/AttachMoney");

/***/ }),

/***/ "material-ui-icons/AvTimer":
/*!********************************************!*\
  !*** external "material-ui-icons/AvTimer" ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("material-ui-icons/AvTimer");

/***/ }),

/***/ "material-ui-icons/Call":
/*!*****************************************!*\
  !*** external "material-ui-icons/Call" ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("material-ui-icons/Call");

/***/ }),

/***/ "material-ui-icons/ExpandMore":
/*!***********************************************!*\
  !*** external "material-ui-icons/ExpandMore" ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("material-ui-icons/ExpandMore");

/***/ }),

/***/ "material-ui-icons/KeyboardArrowRight":
/*!*******************************************************!*\
  !*** external "material-ui-icons/KeyboardArrowRight" ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("material-ui-icons/KeyboardArrowRight");

/***/ }),

/***/ "material-ui-icons/Payment":
/*!********************************************!*\
  !*** external "material-ui-icons/Payment" ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("material-ui-icons/Payment");

/***/ }),

/***/ "material-ui/Checkbox":
/*!***************************************!*\
  !*** external "material-ui/Checkbox" ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("material-ui/Checkbox");

/***/ }),

/***/ "material-ui/Chip":
/*!***********************************!*\
  !*** external "material-ui/Chip" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("material-ui/Chip");

/***/ }),

/***/ "material-ui/ExpansionPanel":
/*!*********************************************!*\
  !*** external "material-ui/ExpansionPanel" ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("material-ui/ExpansionPanel");

/***/ }),

/***/ "material-ui/Form":
/*!***********************************!*\
  !*** external "material-ui/Form" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("material-ui/Form");

/***/ }),

/***/ "material-ui/Menu":
/*!***********************************!*\
  !*** external "material-ui/Menu" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("material-ui/Menu");

/***/ }),

/***/ "material-ui/Progress":
/*!***************************************!*\
  !*** external "material-ui/Progress" ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("material-ui/Progress");

/***/ }),

/***/ "material-ui/Radio":
/*!************************************!*\
  !*** external "material-ui/Radio" ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("material-ui/Radio");

/***/ }),

/***/ "material-ui/Stepper":
/*!**************************************!*\
  !*** external "material-ui/Stepper" ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("material-ui/Stepper");

/***/ }),

/***/ "material-ui/styles":
/*!*************************************!*\
  !*** external "material-ui/styles" ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("material-ui/styles");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),

/***/ "rc-slider/lib/Range":
/*!**************************************!*\
  !*** external "rc-slider/lib/Range" ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("rc-slider/lib/Range");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ "react-dom/server":
/*!***********************************!*\
  !*** external "react-dom/server" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-dom/server");

/***/ }),

/***/ "react-jss/lib/JssProvider":
/*!********************************************!*\
  !*** external "react-jss/lib/JssProvider" ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-jss/lib/JssProvider");

/***/ }),

/***/ "react-jss/lib/jss":
/*!************************************!*\
  !*** external "react-jss/lib/jss" ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-jss/lib/jss");

/***/ }),

/***/ "react-redux":
/*!******************************!*\
  !*** external "react-redux" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-redux");

/***/ }),

/***/ "react-router":
/*!*******************************!*\
  !*** external "react-router" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-router");

/***/ }),

/***/ "react-router-dom":
/*!***********************************!*\
  !*** external "react-router-dom" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-router-dom");

/***/ }),

/***/ "react-transition-group":
/*!*****************************************!*\
  !*** external "react-transition-group" ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-transition-group");

/***/ }),

/***/ "redux":
/*!************************!*\
  !*** external "redux" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("redux");

/***/ }),

/***/ "redux-logger":
/*!*******************************!*\
  !*** external "redux-logger" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("redux-logger");

/***/ }),

/***/ "redux-thunk":
/*!******************************!*\
  !*** external "redux-thunk" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("redux-thunk");

/***/ }),

/***/ "universal-cookie":
/*!***********************************!*\
  !*** external "universal-cookie" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("universal-cookie");

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2FjdGlvbnMvY29tbW9ucy9hdXRoLmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9hY3Rpb25zL2NvbW1vbnMvdXNlci5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvYWN0aW9ucy9kaWFnbm9zaXMvbGFiU2VhcmNoLmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9hY3Rpb25zL2RpYWdub3Npcy9zZWFyY2hDcml0ZXJpYS5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvYWN0aW9ucy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvYWN0aW9ucy9vcGQvZG9jdG9yU2VhcmNoLmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9hY3Rpb25zL29wZC9zZWFyY2hDcml0ZXJpYS5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvYXBpL2FwaS5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9jb21tb25zL0xvYWRlci9Mb2FkZXIuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvY29tbW9ucy9Mb2FkZXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvY29tbW9ucy9Vc2VyTG9naW4vVXNlckxvZ2luLmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL2NvbW1vbnMvVXNlckxvZ2luL2luZGV4LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL2NvbW1vbnMvY2hhdC9DaGF0Vmlldy5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9jb21tb25zL2NoYXQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvY29tbW9ucy9jb21tb25seVNlYXJjaGVkL0NvbW1vbmx5U2VhcmNoZWQuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvY29tbW9ucy9jb21tb25seVNlYXJjaGVkL2luZGV4LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL2NvbW1vbnMvY3JpdGVyaWFTZWFyY2gvQ3JpdGVyaWFTZWFyY2hWaWV3LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL2NvbW1vbnMvY3JpdGVyaWFTZWFyY2gvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvY29tbW9ucy9vdHBWZXJpZnkvT3RwVmVyaWZ5LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL2NvbW1vbnMvb3RwVmVyaWZ5L2luZGV4LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL2NvbW1vbnMvcHJvZmlsZVNsaWRlci9Qcm9maWxlU2xpZGVyLmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL2NvbW1vbnMvcHJvZmlsZVNsaWRlci9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9jb21tb25zL3RpbWVTbG90U2VsZWN0b3IvVGltZVNsb3RTZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9jb21tb25zL3RpbWVTbG90U2VsZWN0b3IvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvY29tbW9ucy91c2VyQXBwb2ludG1lbnRzL1VzZXJBcHBvaW50bWVudHNWaWV3LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL2NvbW1vbnMvdXNlckFwcG9pbnRtZW50cy9hcHBvaW50bWVudExpc3QvQXBwb2ludG1lbnRMaXN0LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL2NvbW1vbnMvdXNlckFwcG9pbnRtZW50cy9hcHBvaW50bWVudExpc3QvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvY29tbW9ucy91c2VyQXBwb2ludG1lbnRzL2luZGV4LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL2NvbW1vbnMvdXNlclByb2ZpbGUvVXNlclByb2ZpbGVWaWV3LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL2NvbW1vbnMvdXNlclByb2ZpbGUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvY29tbW9ucy91c2VyUHJvZmlsZS9wcm9maWxlRGF0YS9Qcm9maWxlRGF0YS5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9jb21tb25zL3VzZXJQcm9maWxlL3Byb2ZpbGVEYXRhL2luZGV4LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL2NvbW1vbnMvdXNlclJlcG9ydHMvVXNlclJlcG9ydHNWaWV3LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL2NvbW1vbnMvdXNlclJlcG9ydHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvY29tbW9ucy91c2VyUmVwb3J0cy9yZXBvcnRMaXN0L1JlcG9ydExpc3QuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvY29tbW9ucy91c2VyUmVwb3J0cy9yZXBvcnRMaXN0L2luZGV4LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL2NvbW1vbnMvdXNlclNpZ251cC9Vc2VyU2lnbnVwLmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL2NvbW1vbnMvdXNlclNpZ251cC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9kaWFnbm9zaXMvYm9va2luZ1N1bW1hcnkvQm9va2luZ1N1bW1hcnlWaWV3LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL2RpYWdub3Npcy9ib29raW5nU3VtbWFyeS9jaG9vc2VQYXRpZW50LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL2RpYWdub3Npcy9ib29raW5nU3VtbWFyeS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9kaWFnbm9zaXMvYm9va2luZ1N1bW1hcnkvcGlja3VwQWRkcmVzcy5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9kaWFnbm9zaXMvYm9va2luZ1N1bW1hcnkvdmlzaXRUaW1lLmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL2RpYWdub3Npcy9jb21tb25zL2xhYkRldGFpbHMvTGFiRGV0YWlsLmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL2RpYWdub3Npcy9jb21tb25zL2xhYkRldGFpbHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvZGlhZ25vc2lzL2NvbW1vbnMvbGFiUHJvZmlsZUNhcmQvTGFiUHJvZmlsZUNhcmQuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvZGlhZ25vc2lzL2NvbW1vbnMvbGFiUHJvZmlsZUNhcmQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvZGlhZ25vc2lzL2NvbW1vbnMvbGFiVGVzdHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvZGlhZ25vc2lzL2NvbW1vbnMvbGFiVGVzdHMvbGFiVGVzdHMuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvZGlhZ25vc2lzL2NvbW1vbnMvb3JkZXJEZXRhaWxzL09yZGVyRGV0YWlscy5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9kaWFnbm9zaXMvY29tbW9ucy9vcmRlckRldGFpbHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvZGlhZ25vc2lzL2xhYi9MYWJWaWV3LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL2RpYWdub3Npcy9sYWIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvZGlhZ25vc2lzL3BhdGllbnREZXRhaWxzL1BhdGllbnREZXRhaWxzVmlldy5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9kaWFnbm9zaXMvcGF0aWVudERldGFpbHMvYWRkcmVzc0Zvcm0vQWRkcmVzc0Zvcm0uanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvZGlhZ25vc2lzL3BhdGllbnREZXRhaWxzL2FkZHJlc3NGb3JtL2luZGV4LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL2RpYWdub3Npcy9wYXRpZW50RGV0YWlscy9kZXRhaWxzRm9ybS9EZXRhaWxzRm9ybS5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9kaWFnbm9zaXMvcGF0aWVudERldGFpbHMvZGV0YWlsc0Zvcm0vaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvZGlhZ25vc2lzL3BhdGllbnREZXRhaWxzL2luZGV4LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL2RpYWdub3Npcy9zZWFyY2hDcml0ZXJpYS9TZWFyY2hDcml0ZXJpYVZpZXcuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvZGlhZ25vc2lzL3NlYXJjaENyaXRlcmlhL2luZGV4LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL2RpYWdub3Npcy9zZWFyY2hSZXN1bHRzL1NlYXJjaFJlc3VsdHNWaWV3LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL2RpYWdub3Npcy9zZWFyY2hSZXN1bHRzL2luZGV4LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL2RpYWdub3Npcy9zZWFyY2hSZXN1bHRzL2xhYnNMaXN0L0xhYnNMaXN0LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL2RpYWdub3Npcy9zZWFyY2hSZXN1bHRzL2xhYnNMaXN0L2luZGV4LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL2RpYWdub3Npcy9zZWFyY2hSZXN1bHRzL3RvcEJhci9Ub3BCYXIuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvZGlhZ25vc2lzL3NlYXJjaFJlc3VsdHMvdG9wQmFyL2luZGV4LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL2RpYWdub3Npcy90ZXN0U2VsZWN0b3IvVGVzdFNlbGVjdG9yLmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL2RpYWdub3Npcy90ZXN0U2VsZWN0b3IvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvb3BkL2FwcG9pbnRtZW50U2xvdC9BcHBvaW50bWVudFNsb3QuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvb3BkL2FwcG9pbnRtZW50U2xvdC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9vcGQvYm9va2luZy9Cb29raW5nVmlldy5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9vcGQvY2xpbmljTGlzdC9DbGluaWNMaXN0Vmlldy5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9vcGQvY2xpbmljTGlzdC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9vcGQvY29tbW9ucy9jbGluaWNTZWxlY3Rvci9DbGluaWNTZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9vcGQvY29tbW9ucy9jbGluaWNTZWxlY3Rvci9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9vcGQvY29tbW9ucy9kb2N0b3JQcm9maWxlQ2FyZC9Eb2N0b3JQcm9maWxlQ2FyZC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9vcGQvY29tbW9ucy9kb2N0b3JQcm9maWxlQ2FyZC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9vcGQvY29tbW9ucy9zZWxlY3RlZENsaW5pYy9TZWxlY3RlZENsaW5pYy5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9vcGQvY29tbW9ucy9zZWxlY3RlZENsaW5pYy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9vcGQvY3JpdGVyaWFTZWFyY2gvQ3JpdGVyaWFTZWFyY2hWaWV3LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL29wZC9jcml0ZXJpYVNlYXJjaC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9vcGQvZG9jdG9yUHJvZmlsZS9Eb2N0b3JQcm9maWxlVmlldy5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9vcGQvZG9jdG9yUHJvZmlsZS9hYm91dERvY3Rvci9BYm91dERvY3Rvci5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9vcGQvZG9jdG9yUHJvZmlsZS9hYm91dERvY3Rvci9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9vcGQvZG9jdG9yUHJvZmlsZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9vcGQvZG9jdG9yUHJvZmlsZS9wcm9mZXNzaW9uYWxHcmFwaC9Qcm9mZXNzaW9uYWxHcmFwaC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9vcGQvZG9jdG9yUHJvZmlsZS9wcm9mZXNzaW9uYWxHcmFwaC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9vcGQvbG9jYXRpb25TZWFyY2gvTG9jYXRpb25TZWFyY2guanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvb3BkL2xvY2F0aW9uU2VhcmNoL2luZGV4LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL29wZC9wYXRpZW50RGV0YWlscy9QYXRpZW50RGV0YWlscy5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9vcGQvcGF0aWVudERldGFpbHMvZGV0YWlsc0Zvcm0vRGV0YWlsc0Zvcm0uanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvb3BkL3BhdGllbnREZXRhaWxzL2RldGFpbHNGb3JtL2luZGV4LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL29wZC9wYXRpZW50RGV0YWlscy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9vcGQvcGF5bWVudC9QYXltZW50Vmlldy5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9vcGQvc2VhcmNoQ3JpdGVyaWEvU2VhcmNoQ3JpdGVyaWFWaWV3LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL29wZC9zZWFyY2hDcml0ZXJpYS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9vcGQvc2VhcmNoUmVzdWx0cy9TZWFyY2hSZXN1bHRzVmlldy5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9vcGQvc2VhcmNoUmVzdWx0cy9kb2N0b3JzTGlzdC9Eb2N0b3JzTGlzdC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9vcGQvc2VhcmNoUmVzdWx0cy9kb2N0b3JzTGlzdC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9vcGQvc2VhcmNoUmVzdWx0cy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9vcGQvc2VhcmNoUmVzdWx0cy90b3BCYXIvVG9wQmFyLmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL29wZC9zZWFyY2hSZXN1bHRzL3RvcEJhci9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9vcGQvc2VhcmNoUmVzdWx0c0ZpbHRlci9TZWFyY2hSZXN1bHRzRmlsdGVyLmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL29wZC9zZWFyY2hSZXN1bHRzRmlsdGVyL2luZGV4LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb25zdGFudHMvdHlwZXMuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbnRhaW5lcnMvY29tbW9ucy9DaGF0LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb250YWluZXJzL2NvbW1vbnMvT3RwVmVyaWZ5LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb250YWluZXJzL2NvbW1vbnMvVXNlckFwcG9pbnRtZW50cy5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29udGFpbmVycy9jb21tb25zL1VzZXJMb2dpbi5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29udGFpbmVycy9jb21tb25zL1VzZXJQcm9maWxlLmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb250YWluZXJzL2NvbW1vbnMvVXNlclJlcG9ydHMuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbnRhaW5lcnMvY29tbW9ucy9Vc2VyU2lnbnVwLmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb250YWluZXJzL2RpYWdub3Npcy9Cb29raW5nU3VtbWFyeS5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29udGFpbmVycy9kaWFnbm9zaXMvTGFiLmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb250YWluZXJzL2RpYWdub3Npcy9QYXRpZW50RGV0YWlscy5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29udGFpbmVycy9kaWFnbm9zaXMvU2VhcmNoQ3JpdGVyaWEuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbnRhaW5lcnMvZGlhZ25vc2lzL1NlYXJjaFJlc3VsdHMuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbnRhaW5lcnMvZGlhZ25vc2lzL1Rlc3RTZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29udGFpbmVycy9vcGQvQXBwb2ludG1lbnRTbG90LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb250YWluZXJzL29wZC9Cb29raW5nLmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb250YWluZXJzL29wZC9DbGluaWNMaXN0LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb250YWluZXJzL29wZC9Dcml0ZXJpYVNlYXJjaC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29udGFpbmVycy9vcGQvRG9jdG9yUHJvZmlsZS5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29udGFpbmVycy9vcGQvTG9jYXRpb25TZWFyY2guanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbnRhaW5lcnMvb3BkL1BhdGllbnREZXRhaWxzLmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb250YWluZXJzL29wZC9QYXltZW50LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb250YWluZXJzL29wZC9TZWFyY2hDcml0ZXJpYS5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29udGFpbmVycy9vcGQvU2VhcmNoUmVzdWx0cy5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29udGFpbmVycy9vcGQvU2VhcmNoUmVzdWx0c0ZpbHRlci5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvaGVscGVycy9uYXZpZ2F0ZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvaGVscGVycy9uYXZpZ2F0ZS9uYXZpZ2F0ZS5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvaGVscGVycy9zdG9yYWdlL2luZGV4LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9oZWxwZXJzL3N0b3JhZ2Uvc3RvcmFnZS5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvcmVkdWNlcnMvY29tbW9ucy9hdXRoLmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9yZWR1Y2Vycy9jb21tb25zL3VzZXIuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL3JlZHVjZXJzL2RpYWdub3Npcy9sYWJzLmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9yZWR1Y2Vycy9kaWFnbm9zaXMvbGFic1NlYXJjaC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvcmVkdWNlcnMvZGlhZ25vc2lzL3NlYXJjaENyaXRlcmlhLmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9yZWR1Y2Vycy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvcmVkdWNlcnMvb3BkL2RvY3RvclNlYXJjaC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvcmVkdWNlcnMvb3BkL2RvY3RvcnMuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL3JlZHVjZXJzL29wZC9zZWFyY2hDcml0ZXJpYS5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvcm91dGVzLmpzIiwid2VicGFjazovLy8uL2Rldi9qcy91dGlscy9kYXRlVGltZVV0aWxzLmpzIiwid2VicGFjazovLy8uL2luZGV4LmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcImF4aW9zXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZXhwcmVzc1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcImh0dHBcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJtYXRlcmlhbC11aS1pY29ucy9BY2NvdW50Q2lyY2xlXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibWF0ZXJpYWwtdWktaWNvbnMvQXR0YWNoTW9uZXlcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJtYXRlcmlhbC11aS1pY29ucy9BdlRpbWVyXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibWF0ZXJpYWwtdWktaWNvbnMvQ2FsbFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIm1hdGVyaWFsLXVpLWljb25zL0V4cGFuZE1vcmVcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJtYXRlcmlhbC11aS1pY29ucy9LZXlib2FyZEFycm93UmlnaHRcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJtYXRlcmlhbC11aS1pY29ucy9QYXltZW50XCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibWF0ZXJpYWwtdWkvQ2hlY2tib3hcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJtYXRlcmlhbC11aS9DaGlwXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibWF0ZXJpYWwtdWkvRXhwYW5zaW9uUGFuZWxcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJtYXRlcmlhbC11aS9Gb3JtXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibWF0ZXJpYWwtdWkvTWVudVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIm1hdGVyaWFsLXVpL1Byb2dyZXNzXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibWF0ZXJpYWwtdWkvUmFkaW9cIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJtYXRlcmlhbC11aS9TdGVwcGVyXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibWF0ZXJpYWwtdWkvc3R5bGVzXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicGF0aFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInJjLXNsaWRlci9saWIvUmFuZ2VcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWFjdFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInJlYWN0LWRvbS9zZXJ2ZXJcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWFjdC1qc3MvbGliL0pzc1Byb3ZpZGVyXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVhY3QtanNzL2xpYi9qc3NcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWFjdC1yZWR1eFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInJlYWN0LXJvdXRlclwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInJlYWN0LXJvdXRlci1kb21cIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWFjdC10cmFuc2l0aW9uLWdyb3VwXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVkdXhcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWR1eC1sb2dnZXJcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWR1eC10aHVua1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcInVuaXZlcnNhbC1jb29raWVcIiJdLCJuYW1lcyI6WyJzZW5kT1RQIiwibnVtYmVyIiwiY2IiLCJkaXNwYXRjaCIsInR5cGUiLCJwYXlsb2FkIiwicGhvbmVOdW1iZXIiLCJ0aGVuIiwicmVzcG9uc2UiLCJleGlzdHMiLCJjYXRjaCIsImVycm9yIiwibWVzc2FnZSIsImVycm9yX21lc3NhZ2UiLCJzdWJtaXRPVFAiLCJvdHAiLCJzZXRBdXRoVG9rZW4iLCJ0b2tlbiIsImdldFVzZXJQcm9maWxlIiwicHJvZmlsZXMiLCJnZXRVc2VyUHJvZmlsZVdpdGhBcHBvaW50bWVudHMiLCJnZXRVc2VyUHJvZmlsZVdpdGhUZXN0cyIsImdldExhYnMiLCJzZWFyY2hTdGF0ZSIsImZpbHRlckNyaXRlcmlhIiwibWVyZ2VTdGF0ZSIsInRlc3RJZHMiLCJzZWxlY3RlZENyaXRlcmlhcyIsImZpbHRlciIsIngiLCJyZWR1Y2UiLCJmaW5hbFN0ciIsImN1cnIiLCJpIiwiaWQiLCJsYXQiLCJsb25nIiwic2VsZWN0ZWRMb2NhdGlvbiIsImdlb21ldHJ5IiwibG9jYXRpb24iLCJsbmciLCJtaW5fZGlzdGFuY2UiLCJkaXN0YW5jZVJhbmdlIiwibWF4X2Rpc3RhbmNlIiwibWluX3ByaWNlIiwicHJpY2VSYW5nZSIsIm1heF9wcmljZSIsIm9yZGVyX2J5Iiwic29ydEJ5IiwidXJsIiwiZ2V0TGFiQnlJZCIsImxhYklkIiwiZ2V0TGFiVGltZVNsb3RzIiwiY2FsbGJhY2siLCJnZXRMYWJCb29raW5nU3VtbWFyeSIsImJvb2tpbmdJZCIsImxvYWRMYWJDb21tb25Dcml0ZXJpYXMiLCJ0b2dnbGVEaWFnbm9zaXNDcml0ZXJpYSIsImNyaXRlcmlhIiwiZ2V0RGlhZ25vc2lzQ3JpdGVyaWFSZXN1bHRzIiwic2VhcmNoU3RyaW5nIiwiU0VBUkNIX0NSSVRFUklBX09QRCIsIlNFQVJDSF9DUklURVJJQV9MQUJTIiwiRE9DVE9SU19BQ1RJT05TIiwiTEFCU19BQ1RJT05TIiwiVVNFUl9BQ1RJT05TIiwiQVVUSF9BQ1RJT05TIiwibW9kdWxlIiwiZXhwb3J0cyIsIk9iamVjdCIsImFzc2lnbiIsImdldERvY3RvcnMiLCJnZXREb2N0b3JCeUlkIiwiZG9jdG9ySWQiLCJkb2N0b3IiLCJkb2N0b3JzIiwiZG9jIiwiZ2V0VGltZVNsb3RzIiwiY2xpbmljSWQiLCJsb2FkT1BEQ29tbW9uQ3JpdGVyaWEiLCJ0b2dnbGVPUERDcml0ZXJpYSIsInNlbGVjdExvY2F0aW9uIiwiZ2V0T1BEQ3JpdGVyaWFSZXN1bHRzIiwiYXhpb3NJbnN0YW5jZSIsImNyZWF0ZSIsImJhc2VVUkwiLCJoZWFkZXIiLCJyZWplY3RIYW5kbGVyIiwiQVBJX0dFVCIsImdldEF1dGhUb2tlbiIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwibWV0aG9kIiwicmVzIiwiZGF0YSIsIkFQSV9QT1NUIiwiaGVhZGVycyIsIkFQSV9QVVQiLCJBUElfREVMRVRFIiwiTG9hZGVyIiwiQ29tcG9uZW50IiwiY29uc3RydWN0b3IiLCJwcm9wcyIsInJlbmRlciIsIlVzZXJMb2dpblZpZXciLCJzdGF0ZSIsInZhbGlkYXRpb25FcnJvciIsImlucHV0SGFuZGxlciIsImUiLCJzZXRTdGF0ZSIsInRhcmdldCIsIm5hbWUiLCJ2YWx1ZSIsInN1Ym1pdE9UUFJlcXVlc3QiLCJtYXRjaCIsImhpc3RvcnkiLCJyZXBsYWNlIiwiYmluZCIsIm90cF9yZXF1ZXN0X3NlbnQiLCJJZnJhbVN0eWxlIiwid2lkdGgiLCJoZWlnaHQiLCJDaGF0VmlldyIsImNvbnRleHRUeXBlcyIsInJvdXRlciIsIkNvbW1vbmx5U2VhcmNoZWQiLCJyb3dzIiwibWFwIiwicm93Iiwic2VsZWN0ZWQiLCJ0b2dnbGUiLCJkaXZDbGFzcyIsInVsQ2xhc3MiLCJoZWFkaW5nIiwiZGVib3VuY2VyIiwiZm4iLCJkZWxheSIsInRpbWVyIiwiY2xlYXJUaW1lb3V0Iiwic2V0VGltZW91dCIsImNhbGwiLCJDcml0ZXJpYVNlYXJjaFZpZXciLCJzZWFyY2hWYWx1ZSIsInNlYXJjaFJlc3VsdHMiLCJjb21wb25lbnREaWRNb3VudCIsImdldFNlYXJjaFJlc3VsdHMiLCJpbnB1dCIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJ0ZXN0cyIsImFkZENyaXRlcmlhIiwiZm9ybWF0dGVkX2FkZHJlc3MiLCJzbGljZSIsImdvIiwicHVzaCIsInRpdGxlIiwiY2hlY2tGb3JMb2FkIiwiY2hpbGRyZW4iLCJPdHBWZXJpZnlWaWV3IiwiY29uc29sZSIsImxvZyIsIlByb2ZpbGVTbGlkZXIiLCJzd2l0Y2hVc2VyIiwicHJvZmlsZUlkIiwiY29udGV4dCIsInN1YlJvdXRlIiwia2V5cyIsInNyYyIsInByb2ZpbGVJbWFnZSIsIlRpbWVTbG90U2VsZWN0b3IiLCJzZWxlY3RlZERheSIsInNlbGVjdGVkSW50ZXJ2YWwiLCJzZWxlY3RlZFRpbWVTbG90IiwiY29tcG9uZW50V2lsbE1vdW50IiwidGltZVNsb3RzIiwic2V0RGVmYXVsdFNlbGVjdGVkIiwiZGF5cyIsImRhdGVzIiwiZGVmYXVsdERheUluZGV4IiwiZ2V0Rmlyc3RBdmFpbGFibGVEYXkiLCJkZWZhdXRJbnRlcndhbEluZGV4IiwiZ2V0Rmlyc3RBdmFpbGFibGVJbnRlcndhbCIsImludGVydmFscyIsImRlZmF1bHRUaW1lU2xvdEluZGV4IiwiZ2V0Rmlyc3RBdmFpbGFibGVUaW1lU2xvdCIsImludGVyd2FsSW5kZXgiLCJpbnRlcndhbCIsImlzQXZhaWxhYmxlIiwicGFyc2VJbnQiLCJ0aW1lU2xvdEluZGV4IiwidGltZVNsb3QiLCJzZWxlY3RUaW1lU2xvdCIsImRheUluZGV4IiwiZGF5Iiwib25EYXRlQ2xpY2siLCJkYXRlIiwic2VsZWN0ZWRJbmRleCIsImluZGV4IiwiYXZhaWxhYmxlSW50ZXJ3YWwiLCJhdmFpbGFibGVUaW1lU2xvdCIsIm9uSW50ZXJ2YWxDbGljayIsIm9uVGltZVNsb3RDbGljayIsImRhdGVMaXN0IiwiZGF5RGF0ZSIsIkRhdGUiLCJnZXREYXRlIiwiZGF5TmFtZSIsImludGVydmFsIiwic2xvdCIsInNsb3RUZXh0Iiwic3RhcnQiLCJlbmQiLCJVc2VyQXBwb2ludG1lbnRzVmlldyIsImNvbXBhcmVEYXRlV2l0aFRvZGF5IiwidG9kYXkiLCJnZXRUaW1lIiwic2VsZWN0ZWRVc2VyIiwidXNlclByb2ZpbGVJZCIsInBhcmFtcyIsIlVTRVIiLCJpc0RlZmF1bHRVc2VyIiwiYXBwb2ludG1lbnRzIiwiYXBwb2ludG1lbnQiLCJBcHBvaW50bWVudExpc3QiLCJ1bml4X3RpbWVzdGFtcCIsImhvdXJzIiwiZ2V0SG91cnMiLCJtaW51dGVzIiwiZ2V0TWludXRlcyIsInN1YnN0ciIsImRvY3Rvck5hbWUiLCJ0b0RhdGVTdHJpbmciLCJVc2VyUHJvZmlsZVZpZXciLCJQcm9maWxlRGF0YSIsIm9wZW5BcHBvaW50bWVudHMiLCJvcGVuUmVwb3J0cyIsImdlbmRlciIsImFnZSIsIm1vYmlsZSIsIm1lZGljYWxIaXN0b3J5Q291bnQiLCJtZWRpY2FsVGVzdENvdW50Iiwib25saW5lQ29uc3VsdGF0aW9uQ291bnQiLCJvcGRWaXNpdENvdW50IiwicHJvZmlsZURhdGEiLCJVc2VyUmVwb3J0c1ZpZXciLCJ0ZXN0IiwiUmVwb3J0TGlzdCIsInN1Yl9uYW1lIiwiYWJicmV2aWF0aW9uIiwiY2F0ZWdvcnkiLCJVc2VyU2lnbnVwVmlldyIsImFwcG9pbm1lbnRGb3IiLCJwYXRpZW50TmFtZSIsImVtYWlsIiwic3VibWl0Rm9ybSIsIkJvb2tpbmdTdW1tYXJ5VmlldyIsInNlbGVjdGVkTGFiIiwicGlja3VwVHlwZSIsIm9wZW5UZXN0cyIsImhhbmRsZVBpY2t1cFR5cGUiLCJnZXRTZWxlY3RvcnMiLCJmaW5hbFByaWNlIiwibGFiRGV0YWlsIiwiTEFCUyIsImxhYiIsInByaWNlIiwidHdwIiwidGVzdF9pZCIsIm1ycCIsImFkZHJlc3MiLCJDaG9vc2VQYXRpZW50IiwiUGlja3VwQWRkcmVzcyIsIlZpc2l0VGltZSIsIkxhYkRldGFpbHMiLCJMYWJQcm9maWxlQ2FyZCIsIm9wZW5MYWIiLCJkZXRhaWxzIiwiTGFiVGVzdHMiLCJsZW5ndGgiLCJPcmRlckRldGFpbHMiLCJwcmljZV9icmVha3VwIiwidG90YWxQcmljZSIsInRvdGFsVGVzdHMiLCJicmVha3VwIiwiYW1vdW50IiwiTGFiVmlldyIsImJvb2tMYWIiLCJQYXRpZW50RGV0YWlsc1ZpZXciLCJzZWxlY3RlZFRlc3RzIiwic2VsZWN0ZWRTbG90Iiwic2VsZWN0ZWRTbG90U3RhcnQiLCJzZWxlY3RlZFNsb3RFbmQiLCJnZXRMb2NhdGlvblBhcmFtIiwidGFnIiwicGFyYW1TdHJpbmciLCJzZWFyY2giLCJVUkxTZWFyY2hQYXJhbXMiLCJnZXQiLCJwcm9jZWVkIiwicGFyc2VGbG9hdCIsInRvU3RyaW5nIiwiQWRkcmVzc0Zvcm0iLCJsb2NhbGl0eSIsImxhbmRtYXJrIiwicGluY29kZSIsImNpdHkiLCJ3aGljaCIsIkRldGFpbHNGb3JtIiwicGF0aWVudEVtYWlsIiwicGF0aWVudEdlbmRlciIsInBhdGllbnRNb2JpbGUiLCJTZWFyY2hDcml0ZXJpYVZpZXciLCJzZWFyY2hQcm9jZWVkIiwic2VhcmNoRGF0YSIsImVuY29kZVVSSUNvbXBvbmVudCIsIkpTT04iLCJzdHJpbmdpZnkiLCJmaWx0ZXJEYXRhIiwiTE9BREVEX1NFQVJDSF9DUklURVJJQV9MQUIiLCJjb21tb25fdGVzdHMiLCJjb21tb25fY29uZGl0aW9ucyIsInByZWZlcnJlZF9sYWJzIiwiU2VhcmNoUmVzdWx0c1ZpZXciLCJwYXJzZSIsImdldExhYkxpc3QiLCJhcHBseUZpbHRlcnMiLCJmaWx0ZXJTdGF0ZSIsIkxPQURFRF9MQUJTX1NFQVJDSCIsIkxhYnNMaXN0IiwibGFiTGlzdCIsIlRvcEJhciIsImFuY2hvckVsIiwib3BlbkZpbHRlciIsImNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMiLCJoYW5kbGVPcGVuIiwiZXZlbnQiLCJjdXJyZW50VGFyZ2V0IiwiaGFuZGxlQ2xvc2UiLCJ0b2dnbGVGaWx0ZXIiLCJoYW5kbGVSYW5nZSIsInJhbmdlIiwiZ2V0Q3JpdGVyaWFTdHJpbmciLCJmaW5hbCIsImNyaXRlcmlhU3RyIiwiQm9vbGVhbiIsInN0b3BQcm9wYWdhdGlvbiIsInByZXZlbnREZWZhdWx0IiwiVGVzdFNlbGVjdG9yVmlldyIsInRvZ2dsZVRlc3QiLCJsYWJEYXRhIiwiaW5kZXhPZiIsIkFwcG9pbnRtZW50U2xvdCIsInNlbGVjdGVkRG9jdG9yIiwic2VsZWN0ZWRDbGluaWMiLCJET0NUT1JTIiwiQm9va2luZ1ZpZXciLCJDbGluaWNMaXN0VmlldyIsIkNsaW5pY1NlbGVjdG9yIiwic2VsZWN0Q2xpbmljIiwiZ2V0QXZhaWxhYmlsaXR5IiwiYXZhaWxhYmlsaXR5IiwibmV4dEF2YWlsYWJsZSIsImZyb20iLCJ0aW1lU3RhcnQiLCJ0aW1lRW5kIiwidG8iLCJmZWUiLCJjbGluaWMiLCJ0aW1lQXZhaWxhYmxlIiwiRG9jdG9yUHJvZmlsZUNhcmQiLCJjYXJkQ2xpY2siLCJib29rTm93IiwiZ2V0UXVhbGlmaWNhdGlvblN0ciIsInF1YWxpZmljYXRpb25TcGVjaWFsaXphdGlvbiIsInN0ciIsInF1YWxpZmljYXRpb24iLCJzcGVjaWFsaXphdGlvbiIsImV4cGVyaWVuY2VfeWVhcnMiLCJob3NwaXRhbCIsImhvc3BpdGFsX2NvdW50IiwicXVhbGlmaWNhdGlvbnMiLCJkaXNjb3VudGVkX2ZlZXMiLCJmZWVzIiwiaG9zcGl0YWxfbmFtZSIsIlNlbGVjdGVkQ2xpbmljIiwiY2xpbmljRGF0YSIsImZvY3VzIiwiZ2V0Q3JpdGVyaWFSZXN1bHRzIiwicmVzdWx0IiwidG9nZ2xlQ3JpdGVyaWEiLCJnb0JhY2siLCJyZXN1bHREYXRhIiwiaiIsIkRvY3RvclByb2ZpbGVWaWV3IiwiQWJvdXREb2N0b3IiLCJQcm9mZXNzaW9uYWxHcmFwaCIsIkxvY2F0aW9uU2VhcmNoIiwiZ2V0TG9jYXRpb24iLCJhdXRvIiwiZ29vZ2xlIiwibWFwcyIsInBsYWNlcyIsIkF1dG9jb21wbGV0ZVNlcnZpY2UiLCJyZXF1ZXN0IiwidHlwZXMiLCJjb21wb25lbnRSZXN0cmljdGlvbnMiLCJjb3VudHJ5IiwiZ2V0UGxhY2VQcmVkaWN0aW9ucyIsInJlc3VsdHMiLCJzdGF0dXMiLCJNYXAiLCJjZW50ZXIiLCJ6b29tIiwic2VydmljZSIsIlBsYWNlc1NlcnZpY2UiLCJnZXREZXRhaWxzIiwicmVmZXJlbmNlIiwicGxhY2UiLCJkZXNjcmlwdGlvbiIsImRpc3BsYXkiLCJQYXRpZW50RGV0YWlscyIsIlBheW1lbnRWaWV3IiwiTE9BREVEX1NFQVJDSF9DUklURVJJQV9PUEQiLCJjb25kaXRpb25zIiwic3BlY2lhbGl6YXRpb25zIiwiZ2V0RGNvdG9ycyIsImdldERvY3Rvckxpc3QiLCJMT0FERURfRE9DVE9SX1NFQVJDSCIsIkRvY3RvcnNMaXN0IiwiZG9jdG9yTGlzdCIsImRvY0lkIiwic29ydF9vbiIsInNpdHNfYXRfY2xpbmljIiwic2l0c19hdF9ob3NwaXRhbCIsImlzX2ZlbWFsZSIsImlzX2F2YWlsYWJsZSIsImhhbmRsZUlucHV0IiwiZXZOYW1lIiwiY2hlY2tlZCIsInNpdHNfYXQiLCJTZWFyY2hSZXN1bHRzRmlsdGVyIiwiZmVlXzAiLCJmZWVfMSIsImZlZV8yIiwiZmVlXzMiLCJjbGluaWNfcGVyc29uYWwiLCJjbGluaWNfaG9zcGl0YWwiLCJjbGluaWNfbXVsdGkiLCJhdmFpbGFibGVfdG9kYXkiLCJkaXN0YW5jZSIsImFwcGx5RmlsdGVyIiwic2V0T1BERmlsdGVycyIsImhhbmRsZUNoZWNrYm94IiwiaGFuZGxlQ2hhbmdlUmFkaW8iLCJTRU5EX09UUF9SRVFVRVNUIiwiU0VORF9PVFBfU1VDQ0VTUyIsIlNFTkRfT1RQX0ZBSUwiLCJTVUJNSVRfT1RQX1JFUVVFU1QiLCJTVUJNSVRfT1RQX1NVQ0NFU1MiLCJTVUJNSVRfT1RQX0ZBSUwiLCJBUFBFTkRfRE9DVE9SUyIsIkRPQ1RPUl9TRUFSQ0giLCJET0NUT1JfU0VBUkNIX1NUQVJUIiwiU0VMRUNUX0xPQ0FUSU9OX09QRCIsIk1FUkdFX1NFQVJDSF9TVEFURV9PUEQiLCJUT0dHTEVfT1BEX0NSSVRFUklBIiwiU0VUX09QRF9GSUxURVJTIiwiTE9BRF9TRUFSQ0hfQ1JJVEVSSUFfT1BEIiwiVE9HR0xFX0RJQUdOT1NJU19DUklURVJJQSIsIk1FUkdFX1NFQVJDSF9TVEFURV9MQUIiLCJMT0FEX1NFQVJDSF9DUklURVJJQV9MQUIiLCJBUFBFTkRfTEFCUyIsIkxBQl9TRUFSQ0giLCJTRUxFQ1RfTE9DQVRJT05fRElBR05PU0lTIiwiQVBQRU5EX0ZJTFRFUlNfRElBR05PU0lTIiwiTEFCX1NFQVJDSF9TVEFSVCIsIkFQUEVORF9VU0VSX1BST0ZJTEVTIiwiQ2hhdCIsIm1hcFN0YXRlVG9Qcm9wcyIsIm1hcERpc3BhdGNoVG9Qcm9wcyIsIk90cFZlcmlmeSIsInN1Y2Nlc3NfbWVzc2FnZSIsInN1Ym1pdF9vdHAiLCJzdWJtaXRfb3RwX3N1Y2Nlc3MiLCJzdWJtaXRfb3RwX2ZhaWwiLCJBVVRIIiwiVXNlckFwcG9pbnRtZW50cyIsIlVzZXJMb2dpbiIsIm90cF9yZXF1ZXN0X3N1Y2Nlc3MiLCJvdHBfcmVxdWVzdF9mYWlsIiwiVXNlclByb2ZpbGUiLCJVc2VyUmVwb3J0cyIsIlVzZXJTaWdudXAiLCJCb29raW5nU3VtbWFyeSIsIkxhYiIsImxvYWREYXRhIiwic3RvcmUiLCJTZWFyY2hDcml0ZXJpYSIsIlNlYXJjaFJlc3VsdHMiLCJUZXN0U2VsZWN0b3IiLCJCb29raW5nIiwiQ2xpbmljTGlzdCIsIkNyaXRlcmlhU2VhcmNoIiwiRG9jdG9yUHJvZmlsZSIsIlBheW1lbnQiLCJOQVZJR0FURSIsIm5hdmlnYXRlVG8iLCJ3aGVyZSIsIndpbmRvdyIsImhyZWYiLCJyZWZyZXNoQXBwb2ludG1lbnRTdGF0ZSIsIm5vQXBwb2ludG1lbnRGb3VuZCIsInVwY29taW5nIiwicHJldmlvdXMiLCJhY3Rpb24iLCJjb29raWVzIiwiU1RPUkFHRSIsInNldCIsImNoZWNrQXV0aCIsImRlbGV0ZUF1dGgiLCJyZW1vdmUiLCJkZWZhdWx0U3RhdGUiLCJuZXdTdGF0ZSIsInByb2ZpbGVNYXAiLCJwcm9maWxlIiwibGFwTWFwIiwiY29uY2F0IiwiZm91bmQiLCJhbGxSZWR1Y2VycyIsImRvY3Rvck1hcCIsInJvdXRlcyIsInBhdGgiLCJleGFjdCIsImNvbXBvbmVudCIsIlJvdXRlckNvbmZpZyIsInBhdGhuYW1lIiwiZW50ZXIiLCJleGl0Iiwicm91dGUiLCJST1VURVMiLCJ0aW1lU3RhbXAiLCJnZXREYXlOYW1lIiwiZ2V0RGF5IiwicmVxdWlyZSIsImh0dHAiLCJFeHByZXNzIiwiYXBwIiwic2VydmVyIiwiU2VydmVyIiwidXNlIiwic3RhdGljIiwiam9pbiIsIl9fZGlybmFtZSIsInJlcSIsInNoZWV0c1JlZ2lzdHJ5IiwidGhlbWUiLCJwYWxldHRlIiwicHJpbWFyeSIsIm1haW4iLCJzZWNvbmRhcnkiLCJkYW5nZXIiLCJnZW5lcmF0ZUNsYXNzTmFtZSIsIndyaXRlSGVhZCIsIkxvY2F0aW9uIiwicHJvbWlzZXMiLCJzb21lIiwiYWxsIiwic3RvcmVEYXRhIiwiZ2V0U3RhdGUiLCJodG1sIiwicmVuZGVyVG9TdHJpbmciLCJjc3MiLCJzZW5kRmlsZSIsInJvb3QiLCJsaXN0ZW4iLCJlcnIiLCJpbmZvIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDekVBOztB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QUlHLEdBQUosQ0FBUSxVQUFVSSxHQUFWLEVBQWU1YyxHQUFmLEVBQW9CO0FBQ3hCQSxRQUFJK2QsUUFBSixDQUFhLFlBQWIsRUFBMkIsRUFBRUMsTUFBTSxTQUFSLEVBQTNCO0FBQ0gsQ0FGRDs7QUFJQTFCLE9BQU8yQixNQUFQLENBQWMsSUFBZCxFQUFxQkMsR0FBRCxJQUFTO0FBQ3pCLFFBQUlBLEdBQUosRUFBUztBQUNMLGVBQU9oYSxRQUFRckosS0FBUixDQUFjcWpCLEdBQWQsQ0FBUDtBQUNIO0FBQ0RoYSxZQUFRaWEsSUFBUixDQUFhLHlDQUFiO0FBQ0gsQ0FMRCxFOzs7Ozs7Ozs7OztBQ3RHQSxrQzs7Ozs7Ozs7Ozs7QUNBQSxvQzs7Ozs7Ozs7Ozs7QUNBQSxpQzs7Ozs7Ozs7Ozs7QUNBQSw0RDs7Ozs7Ozs7Ozs7QUNBQSwwRDs7Ozs7Ozs7Ozs7QUNBQSxzRDs7Ozs7Ozs7Ozs7QUNBQSxtRDs7Ozs7Ozs7Ozs7QUNBQSx5RDs7Ozs7Ozs7Ozs7QUNBQSxpRTs7Ozs7Ozs7Ozs7QUNBQSxzRDs7Ozs7Ozs7Ozs7QUNBQSxpRDs7Ozs7Ozs7Ozs7QUNBQSw2Qzs7Ozs7Ozs7Ozs7QUNBQSx1RDs7Ozs7Ozs7Ozs7QUNBQSw2Qzs7Ozs7Ozs7Ozs7QUNBQSw2Qzs7Ozs7Ozs7Ozs7QUNBQSxpRDs7Ozs7Ozs7Ozs7QUNBQSw4Qzs7Ozs7Ozs7Ozs7QUNBQSxnRDs7Ozs7Ozs7Ozs7QUNBQSwrQzs7Ozs7Ozs7Ozs7QUNBQSxpQzs7Ozs7Ozs7Ozs7QUNBQSxnRDs7Ozs7Ozs7Ozs7QUNBQSxrQzs7Ozs7Ozs7Ozs7QUNBQSw2Qzs7Ozs7Ozs7Ozs7QUNBQSxzRDs7Ozs7Ozs7Ozs7QUNBQSw4Qzs7Ozs7Ozs7Ozs7QUNBQSx3Qzs7Ozs7Ozs7Ozs7QUNBQSx5Qzs7Ozs7Ozs7Ozs7QUNBQSw2Qzs7Ozs7Ozs7Ozs7QUNBQSxtRDs7Ozs7Ozs7Ozs7QUNBQSxrQzs7Ozs7Ozs7Ozs7QUNBQSx5Qzs7Ozs7Ozs7Ozs7QUNBQSx3Qzs7Ozs7Ozs7Ozs7QUNBQSw2QyIsImZpbGUiOiJzZXJ2ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIHdhc20gbW9kdWxlc1xuIFx0dmFyIGluc3RhbGxlZFdhc21Nb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9cIjtcblxuIFx0Ly8gb2JqZWN0IHdpdGggYWxsIGNvbXBpbGVkIFdlYkFzc2VtYmx5Lk1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18udyA9IHt9O1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL2luZGV4LmpzXCIpO1xuIiwiaW1wb3J0IHsgU0VORF9PVFBfUkVRVUVTVCwgU0VORF9PVFBfU1VDQ0VTUywgU0VORF9PVFBfRkFJTCwgU1VCTUlUX09UUF9SRVFVRVNULCBTVUJNSVRfT1RQX1NVQ0NFU1MsIFNVQk1JVF9PVFBfRkFJTCB9IGZyb20gJy4uLy4uL2NvbnN0YW50cy90eXBlcyc7XG5pbXBvcnQgeyBBUElfR0VULCBBUElfUE9TVCB9IGZyb20gJy4uLy4uL2FwaS9hcGkuanMnO1xuaW1wb3J0IFNUT1JBR0UgZnJvbSAnLi4vLi4vaGVscGVycy9zdG9yYWdlJ1xuXG5leHBvcnQgY29uc3Qgc2VuZE9UUCA9IChudW1iZXIsIGNiKSA9PiAoZGlzcGF0Y2gpID0+IHtcbiAgICBkaXNwYXRjaCh7XG4gICAgICAgIHR5cGU6IFNFTkRfT1RQX1JFUVVFU1QsXG4gICAgICAgIHBheWxvYWQ6IHtcbiAgICAgICAgICAgIHBob25lTnVtYmVyOiBudW1iZXJcbiAgICAgICAgfVxuICAgIH0pXG5cbiAgICBBUElfUE9TVCgnL2FwaS92MS91c2VyL290cC9nZW5lcmF0ZScsIHtcbiAgICAgICAgXCJwaG9uZV9udW1iZXJcIjogbnVtYmVyXG4gICAgfSkudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgZGlzcGF0Y2goe1xuICAgICAgICAgICAgdHlwZTogU0VORF9PVFBfU1VDQ0VTUyxcbiAgICAgICAgICAgIHBheWxvYWQ6IHt9XG4gICAgICAgIH0pXG4gICAgICAgIGlmIChjYikgY2IocmVzcG9uc2UuZXhpc3RzKTtcbiAgICB9KS5jYXRjaChmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgICAgbGV0IG1lc3NhZ2UgPSBcIkNhbm5vdCBnZW5lcmF0ZSBPVFAuXCJcbiAgICAgICAgZGlzcGF0Y2goe1xuICAgICAgICAgICAgdHlwZTogU0VORF9PVFBfRkFJTCxcbiAgICAgICAgICAgIHBheWxvYWQ6IHtcbiAgICAgICAgICAgICAgICBlcnJvcl9tZXNzYWdlOiBtZXNzYWdlXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfSlcblxufVxuXG5leHBvcnQgY29uc3Qgc3VibWl0T1RQID0gKG51bWJlciwgb3RwLCBjYikgPT4gKGRpc3BhdGNoKSA9PiB7XG4gICAgZGlzcGF0Y2goe1xuICAgICAgICB0eXBlOiBTVUJNSVRfT1RQX1JFUVVFU1QsXG4gICAgICAgIHBheWxvYWQ6IHt9XG4gICAgfSlcblxuICAgIEFQSV9QT1NUKCcvYXBpL3YxL3VzZXIvZG9jdG9yL2xvZ2luJywge1xuICAgICAgICBcInBob25lX251bWJlclwiOiBudW1iZXIsXG4gICAgICAgIFwib3RwXCI6IG90cFxuICAgIH0pLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgIC8vIHNldCBjb29raWUgdG9rZW4gZXhwbGljaXRseSwgY3NyZiB0b2tlbiBpcyBzZXQgYnkgZGVmYXVsdFxuICAgICAgICBTVE9SQUdFLnNldEF1dGhUb2tlbihyZXNwb25zZS50b2tlbilcblxuICAgICAgICBkaXNwYXRjaCh7XG4gICAgICAgICAgICB0eXBlOiBTVUJNSVRfT1RQX1NVQ0NFU1MsXG4gICAgICAgICAgICBwYXlsb2FkOiB7IHRva2VuOiByZXNwb25zZS50b2tlbiB9XG4gICAgICAgIH0pXG4gICAgICAgIGlmIChjYikgY2IoKTtcbiAgICB9KS5jYXRjaChmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgICAgZGlzcGF0Y2goe1xuICAgICAgICAgICAgdHlwZTogU1VCTUlUX09UUF9GQUlMLFxuICAgICAgICAgICAgcGF5bG9hZDoge1xuICAgICAgICAgICAgICAgIGVycm9yX21lc3NhZ2U6IFwiSW52YWxpZCBPVFBcIlxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH0pXG59XG4iLCJpbXBvcnQgeyBBUFBFTkRfVVNFUl9QUk9GSUxFUyB9IGZyb20gJy4uLy4uL2NvbnN0YW50cy90eXBlcyc7XG5pbXBvcnQgeyBBUElfR0VUIH0gZnJvbSAnLi4vLi4vYXBpL2FwaS5qcyc7XG5cblxuZXhwb3J0IGNvbnN0IGdldFVzZXJQcm9maWxlID0gKCkgPT4gKGRpc3BhdGNoKSA9PiB7XG5cdEFQSV9HRVQoJy91c2VyLmpzb24nKS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuXHRcdFxuXHRcdGRpc3BhdGNoKHtcblx0XHRcdHR5cGU6IEFQUEVORF9VU0VSX1BST0ZJTEVTLFxuXHRcdFx0cGF5bG9hZDogcmVzcG9uc2UucHJvZmlsZXNcblx0XHR9KVxuXG5cdH0pLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xuXG5cdH0pXG59XG5cbmV4cG9ydCBjb25zdCBnZXRVc2VyUHJvZmlsZVdpdGhBcHBvaW50bWVudHMgPSAoKSA9PiAoZGlzcGF0Y2gpID0+IHtcblx0QVBJX0dFVCgnL3VzZXJfcHJvZmlsZV9hcHBvaW50bWVudHMuanNvbicpLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG5cdFx0XG5cdFx0ZGlzcGF0Y2goe1xuXHRcdFx0dHlwZTogQVBQRU5EX1VTRVJfUFJPRklMRVMsXG5cdFx0XHRwYXlsb2FkOiByZXNwb25zZS5wcm9maWxlc1xuXHRcdH0pXG5cblx0fSkuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSB7XG5cblx0fSlcbn1cblxuZXhwb3J0IGNvbnN0IGdldFVzZXJQcm9maWxlV2l0aFRlc3RzID0gKCkgPT4gKGRpc3BhdGNoKSA9PiB7XG5cdEFQSV9HRVQoJy91c2VyX3Byb2ZpbGVfdGVzdHMuanNvbicpLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG5cdFx0XG5cdFx0ZGlzcGF0Y2goe1xuXHRcdFx0dHlwZTogQVBQRU5EX1VTRVJfUFJPRklMRVMsXG5cdFx0XHRwYXlsb2FkOiByZXNwb25zZS5wcm9maWxlc1xuXHRcdH0pXG5cblx0fSkuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSB7XG5cblx0fSlcbn1cblxuIiwiaW1wb3J0IHsgTEFCX1NFQVJDSF9TVEFSVCwgQVBQRU5EX0xBQlMsIExBQl9TRUFSQ0gsIE1FUkdFX1NFQVJDSF9TVEFURV9MQUIgfSBmcm9tICcuLi8uLi9jb25zdGFudHMvdHlwZXMnO1xuaW1wb3J0IHsgQVBJX0dFVCB9IGZyb20gJy4uLy4uL2FwaS9hcGkuanMnO1xuXG5cbmV4cG9ydCBjb25zdCBnZXRMYWJzID0gKHNlYXJjaFN0YXRlID0ge30sIGZpbHRlckNyaXRlcmlhID0ge30sIG1lcmdlU3RhdGUgPSBmYWxzZSkgPT4gKGRpc3BhdGNoKSA9PiB7XG5cblx0bGV0IHRlc3RJZHMgPSBzZWFyY2hTdGF0ZS5zZWxlY3RlZENyaXRlcmlhc1xuXHRcdC5maWx0ZXIoeCA9PiB4LnR5cGUgPT0gJ3Rlc3QnKVxuXHRcdC5yZWR1Y2UoKGZpbmFsU3RyLCBjdXJyLCBpKSA9PiB7XG5cdFx0XHRpZiAoaSAhPSAwKSB7XG5cdFx0XHRcdGZpbmFsU3RyICs9ICcsJ1xuXHRcdFx0fVxuXHRcdFx0ZmluYWxTdHIgKz0gYCR7Y3Vyci5pZH1gXG5cdFx0XHRyZXR1cm4gZmluYWxTdHJcblx0XHR9LCBcIlwiKVxuXG5cdGxldCBsYXQgPSAyOC40NTk1XG5cdGxldCBsb25nID0gNzcuMDIyNlxuXHRpZiAoc2VhcmNoU3RhdGUuc2VsZWN0ZWRMb2NhdGlvbikge1xuXHRcdGxhdCA9IHNlYXJjaFN0YXRlLnNlbGVjdGVkTG9jYXRpb24uZ2VvbWV0cnkubG9jYXRpb24ubGF0XG5cdFx0bG9uZyA9IHNlYXJjaFN0YXRlLnNlbGVjdGVkTG9jYXRpb24uZ2VvbWV0cnkubG9jYXRpb24ubG5nXG5cdH1cblx0bGV0IG1pbl9kaXN0YW5jZSA9IGZpbHRlckNyaXRlcmlhLmRpc3RhbmNlUmFuZ2VbMF1cblx0bGV0IG1heF9kaXN0YW5jZSA9IGZpbHRlckNyaXRlcmlhLmRpc3RhbmNlUmFuZ2VbMV1cblx0bGV0IG1pbl9wcmljZSA9IGZpbHRlckNyaXRlcmlhLnByaWNlUmFuZ2VbMF1cblx0bGV0IG1heF9wcmljZSA9IGZpbHRlckNyaXRlcmlhLnByaWNlUmFuZ2VbMV1cblx0bGV0IG9yZGVyX2J5ID0gZmlsdGVyQ3JpdGVyaWEuc29ydEJ5XG5cblx0bGV0IHVybCA9IGAvYXBpL3YxL2RpYWdub3N0aWMvbGFibGlzdD9pZHM9JHt0ZXN0SWRzfSZsb25nPSR7bGF0fSZsYXQ9JHtsb25nfSZtaW5fZGlzdGFuY2U9JHttaW5fZGlzdGFuY2V9Jm1heF9kaXN0YW5jZT0ke21heF9kaXN0YW5jZX0mbWluX3ByaWNlPSR7bWluX3ByaWNlfSZtYXhfcHJpY2U9JHttYXhfcHJpY2V9Jm9yZGVyX2J5PSR7b3JkZXJfYnl9YFxuXG5cdGRpc3BhdGNoKHtcblx0XHR0eXBlOiBMQUJfU0VBUkNIX1NUQVJULFxuXHRcdHBheWxvYWQ6IG51bGxcblx0fSlcblxuXHRyZXR1cm4gQVBJX0dFVCh1cmwpLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG5cblx0XHRkaXNwYXRjaCh7XG5cdFx0XHR0eXBlOiBBUFBFTkRfTEFCUyxcblx0XHRcdHBheWxvYWQ6IHJlc3BvbnNlXG5cdFx0fSlcblxuXHRcdGRpc3BhdGNoKHtcblx0XHRcdHR5cGU6IExBQl9TRUFSQ0gsXG5cdFx0XHRwYXlsb2FkOiByZXNwb25zZVxuXHRcdH0pXG5cblx0XHRpZiAobWVyZ2VTdGF0ZSkge1xuXHRcdFx0ZGlzcGF0Y2goe1xuXHRcdFx0XHR0eXBlOiBNRVJHRV9TRUFSQ0hfU1RBVEVfTEFCLFxuXHRcdFx0XHRwYXlsb2FkOiB7XG5cdFx0XHRcdFx0c2VhcmNoU3RhdGUsXG5cdFx0XHRcdFx0ZmlsdGVyQ3JpdGVyaWFcblx0XHRcdFx0fVxuXHRcdFx0fSlcblx0XHR9XG5cblx0fSkuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSB7XG5cblx0fSlcbn1cblxuZXhwb3J0IGNvbnN0IGdldExhYkJ5SWQgPSAobGFiSWQpID0+IChkaXNwYXRjaCkgPT4ge1xuXHRsZXQgdXJsID0gYC9hcGkvdjEvZGlhZ25vc3RpYy9sYWJsaXN0LyR7bGFiSWR9YFxuXG5cdHJldHVybiBBUElfR0VUKHVybCkudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcblxuXHRcdGRpc3BhdGNoKHtcblx0XHRcdHR5cGU6IEFQUEVORF9MQUJTLFxuXHRcdFx0cGF5bG9hZDogW3Jlc3BvbnNlXVxuXHRcdH0pXG5cblx0fSkuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSB7XG5cblx0fSlcbn1cblxuZXhwb3J0IGNvbnN0IGdldExhYlRpbWVTbG90cyA9IChsYWJJZCwgdGVzdElkcywgY2FsbGJhY2spID0+IChkaXNwYXRjaCkgPT4ge1xuXHRBUElfR0VUKCcvYXZhaWxhYmlsaXR5X2xhYnMuanNvbicpLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG5cblx0XHRjYWxsYmFjayhyZXNwb25zZSlcblxuXHR9KS5jYXRjaChmdW5jdGlvbiAoZXJyb3IpIHtcblxuXHR9KVxufVxuXG5leHBvcnQgY29uc3QgZ2V0TGFiQm9va2luZ1N1bW1hcnkgPSAoYm9va2luZ0lkLCBjYWxsYmFjaykgPT4gKGRpc3BhdGNoKSA9PiB7XG5cdEFQSV9HRVQoJy9sYWJfYm9va2luZ19zdW1tYXIuanNvbicpLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG5cblx0XHRjYWxsYmFjayhyZXNwb25zZSlcblxuXHR9KS5jYXRjaChmdW5jdGlvbiAoZXJyb3IpIHtcblxuXHR9KVxufVxuIiwiaW1wb3J0IHsgQVBQRU5EX0ZJTFRFUlNfRElBR05PU0lTLCBUT0dHTEVfQ09ORElUSU9OUywgVE9HR0xFX1NQRUNJQUxJVElFUywgU0VMRUNUX0xPQ0FUSU9OLCBNRVJHRV9TRUFSQ0hfU1RBVEUsIFRPR0dMRV9DUklURVJJQSwgVE9HR0xFX1RFU1RTLCBUT0dHTEVfRElBR05PU0lTX0NSSVRFUklBLCBMT0FEX1NFQVJDSF9DUklURVJJQV9MQUIgfSBmcm9tICcuLi8uLi9jb25zdGFudHMvdHlwZXMnO1xuaW1wb3J0IHsgQVBJX0dFVCB9IGZyb20gJy4uLy4uL2FwaS9hcGkuanMnO1xuXG5leHBvcnQgY29uc3QgbG9hZExhYkNvbW1vbkNyaXRlcmlhcyA9ICgpID0+IChkaXNwYXRjaCkgPT4ge1xuXG4gICAgcmV0dXJuIEFQSV9HRVQoJy9hcGkvdjEvZGlhZ25vc3RpYy9sYWJzZWFyY2gnKS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICBkaXNwYXRjaCh7XG4gICAgICAgICAgICB0eXBlOiBMT0FEX1NFQVJDSF9DUklURVJJQV9MQUIsXG4gICAgICAgICAgICBwYXlsb2FkOiByZXNwb25zZVxuICAgICAgICB9KVxuICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICBkaXNwYXRjaCh7XG4gICAgICAgICAgICB0eXBlOiBMT0FEX1NFQVJDSF9DUklURVJJQV9MQUIsXG4gICAgICAgICAgICBwYXlsb2FkOiBudWxsXG4gICAgICAgIH0pXG4gICAgfSlcblxufVxuXG5leHBvcnQgY29uc3QgdG9nZ2xlRGlhZ25vc2lzQ3JpdGVyaWEgPSAodHlwZSwgY3JpdGVyaWEpID0+IChkaXNwYXRjaCkgPT4ge1xuICAgIGRpc3BhdGNoKHtcbiAgICAgICAgdHlwZTogVE9HR0xFX0RJQUdOT1NJU19DUklURVJJQSxcbiAgICAgICAgcGF5bG9hZDoge1xuICAgICAgICAgICAgdHlwZSwgY3JpdGVyaWFcbiAgICAgICAgfVxuICAgIH0pXG5cbn1cblxuZXhwb3J0IGNvbnN0IGdldERpYWdub3Npc0NyaXRlcmlhUmVzdWx0cyA9IChzZWFyY2hTdHJpbmcsIGNhbGxiYWNrKSA9PiAoZGlzcGF0Y2gpID0+IHtcbiAgICBBUElfR0VUKGAvYXBpL3YxL2RpYWdub3N0aWMvdGVzdD9uYW1lPSR7c2VhcmNoU3RyaW5nfWApLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgIGNhbGxiYWNrKHJlc3BvbnNlKVxuICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICBjYWxsYmFjayhudWxsKVxuICAgIH0pXG59XG5cblxuIiwiaW1wb3J0ICogYXMgU0VBUkNIX0NSSVRFUklBX09QRCBmcm9tICcuL29wZC9zZWFyY2hDcml0ZXJpYS5qcydcbmltcG9ydCAqIGFzIFNFQVJDSF9DUklURVJJQV9MQUJTIGZyb20gJy4vZGlhZ25vc2lzL3NlYXJjaENyaXRlcmlhLmpzJ1xuaW1wb3J0ICogYXMgRE9DVE9SU19BQ1RJT05TIGZyb20gJy4vb3BkL2RvY3RvclNlYXJjaC5qcydcbmltcG9ydCAqIGFzIExBQlNfQUNUSU9OUyBmcm9tICcuL2RpYWdub3Npcy9sYWJTZWFyY2guanMnXG5pbXBvcnQgKiBhcyBVU0VSX0FDVElPTlMgZnJvbSAnLi9jb21tb25zL3VzZXIuanMnXG5pbXBvcnQgKiBhcyBBVVRIX0FDVElPTlMgZnJvbSAnLi9jb21tb25zL2F1dGguanMnXG5cbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmFzc2lnbih7fSxcbiAgICBTRUFSQ0hfQ1JJVEVSSUFfT1BELFxuICAgIFNFQVJDSF9DUklURVJJQV9MQUJTLFxuICAgIERPQ1RPUlNfQUNUSU9OUyxcbiAgICBMQUJTX0FDVElPTlMsXG4gICAgVVNFUl9BQ1RJT05TLFxuICAgIEFVVEhfQUNUSU9OU1xuKSIsImltcG9ydCB7IERPQ1RPUl9TRUFSQ0hfU1RBUlQsIEFQUEVORF9ET0NUT1JTLCBET0NUT1JfU0VBUkNILCBNRVJHRV9TRUFSQ0hfU1RBVEVfT1BEIH0gZnJvbSAnLi4vLi4vY29uc3RhbnRzL3R5cGVzJztcbmltcG9ydCB7IEFQSV9HRVQgfSBmcm9tICcuLi8uLi9hcGkvYXBpLmpzJztcblxuXG5leHBvcnQgY29uc3QgZ2V0RG9jdG9ycyA9IChzZWFyY2hTdGF0ZSA9IHt9LCBmaWx0ZXJDcml0ZXJpYSA9IHt9LCBtZXJnZVN0YXRlID0gZmFsc2UpID0+IChkaXNwYXRjaCkgPT4ge1xuXHQvLyBsZXQgdGVzdElkcyA9IHNlYXJjaFN0YXRlLnNlbGVjdGVkQ3JpdGVyaWFzXG5cdC8vIFx0LmZpbHRlcih4ID0+IHgudHlwZSA9PSAndGVzdCcpXG5cdC8vIFx0LnJlZHVjZSgoZmluYWxTdHIsIGN1cnIsIGkpID0+IHtcblx0Ly8gXHRcdGlmIChpICE9IDApIHtcblx0Ly8gXHRcdFx0ZmluYWxTdHIgKz0gJywnXG5cdC8vIFx0XHR9XG5cdC8vIFx0XHRmaW5hbFN0ciArPSBgJHtjdXJyLmlkfWBcblx0Ly8gXHRcdHJldHVybiBmaW5hbFN0clxuXHQvLyBcdH0sIFwiXCIpXG5cblx0Ly8gbGV0IGxhdCA9IDI4LjQ1OTVcblx0Ly8gbGV0IGxvbmcgPSA3Ny4wMjI2XG5cdC8vIGlmIChzZWFyY2hTdGF0ZS5zZWxlY3RlZExvY2F0aW9uKSB7XG5cdC8vIFx0bGF0ID0gc2VhcmNoU3RhdGUuc2VsZWN0ZWRMb2NhdGlvbi5nZW9tZXRyeS5sb2NhdGlvbi5sYXRcblx0Ly8gXHRsb25nID0gc2VhcmNoU3RhdGUuc2VsZWN0ZWRMb2NhdGlvbi5nZW9tZXRyeS5sb2NhdGlvbi5sbmdcblx0Ly8gfVxuXHQvLyBsZXQgbWluX2Rpc3RhbmNlID0gZmlsdGVyQ3JpdGVyaWEuZGlzdGFuY2VSYW5nZVswXVxuXHQvLyBsZXQgbWF4X2Rpc3RhbmNlID0gZmlsdGVyQ3JpdGVyaWEuZGlzdGFuY2VSYW5nZVsxXVxuXHQvLyBsZXQgbWluX3ByaWNlID0gZmlsdGVyQ3JpdGVyaWEucHJpY2VSYW5nZVswXVxuXHQvLyBsZXQgbWF4X3ByaWNlID0gZmlsdGVyQ3JpdGVyaWEucHJpY2VSYW5nZVsxXVxuXHQvLyBsZXQgb3JkZXJfYnkgPSBmaWx0ZXJDcml0ZXJpYS5zb3J0QnlcblxuXHQvLyBsZXQgdXJsID0gYC9hcGkvdjEvZGlhZ25vc3RpYy9sYWJsaXN0P2lkcz0ke3Rlc3RJZHN9Jmxvbmc9JHtsYXR9JmxhdD0ke2xvbmd9Jm1pbl9kaXN0YW5jZT0ke21pbl9kaXN0YW5jZX0mbWF4X2Rpc3RhbmNlPSR7bWF4X2Rpc3RhbmNlfSZtaW5fcHJpY2U9JHttaW5fcHJpY2V9Jm1heF9wcmljZT0ke21heF9wcmljZX0mb3JkZXJfYnk9JHtvcmRlcl9ieX1gXG5cblx0bGV0IHVybCA9IGAvYXBpL3YxL2RvY3Rvci9kb2N0b3JzZWFyY2hgXG5cblx0ZGlzcGF0Y2goe1xuXHRcdHR5cGU6IERPQ1RPUl9TRUFSQ0hfU1RBUlQsXG5cdFx0cGF5bG9hZDogbnVsbFxuXHR9KVxuXG5cdHJldHVybiBBUElfR0VUKHVybCkudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcblxuXHRcdGRpc3BhdGNoKHtcblx0XHRcdHR5cGU6IEFQUEVORF9ET0NUT1JTLFxuXHRcdFx0cGF5bG9hZDogcmVzcG9uc2Vcblx0XHR9KVxuXG5cdFx0ZGlzcGF0Y2goe1xuXHRcdFx0dHlwZTogRE9DVE9SX1NFQVJDSCxcblx0XHRcdHBheWxvYWQ6IHJlc3BvbnNlXG5cdFx0fSlcblxuXHRcdGlmIChtZXJnZVN0YXRlKSB7XG5cdFx0XHRkaXNwYXRjaCh7XG5cdFx0XHRcdHR5cGU6IE1FUkdFX1NFQVJDSF9TVEFURV9PUEQsXG5cdFx0XHRcdHBheWxvYWQ6IHtcblx0XHRcdFx0XHRzZWFyY2hTdGF0ZSxcblx0XHRcdFx0XHRmaWx0ZXJDcml0ZXJpYVxuXHRcdFx0XHR9XG5cdFx0XHR9KVxuXHRcdH1cblxuXHR9KS5jYXRjaChmdW5jdGlvbiAoZXJyb3IpIHtcblxuXHR9KVxufVxuXG5leHBvcnQgY29uc3QgZ2V0RG9jdG9yQnlJZCA9IChkb2N0b3JJZCkgPT4gKGRpc3BhdGNoKSA9PiB7XG5cdC8vIHRoaXMgQVBJIHNob3VsZCByZXR1cm4gZGV0YWlsZWQgZG9jdG9yXG5cdEFQSV9HRVQoJy9kb2N0b3JzLmpzb24nKS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuXHRcdC8vIG1vY2tpbmcgQVBJICwgVE9ETyA6IHJlbW92ZVxuXHRcdHJlc3BvbnNlLmRvY3RvciA9IHJlc3BvbnNlLmRvY3RvcnMuZmlsdGVyKGRvYyA9PiBkb2MuaWQgPT0gZG9jdG9ySWQpWzBdXG5cblx0XHRkaXNwYXRjaCh7XG5cdFx0XHR0eXBlOiBBUFBFTkRfRE9DVE9SUyxcblx0XHRcdHBheWxvYWQ6IFtyZXNwb25zZS5kb2N0b3JdXG5cdFx0fSlcblxuXHR9KS5jYXRjaChmdW5jdGlvbiAoZXJyb3IpIHtcblxuXHR9KVxufVxuXG5leHBvcnQgY29uc3QgZ2V0VGltZVNsb3RzID0gKGRvY3RvcklkLCBjbGluaWNJZCwgY2FsbGJhY2spID0+IChkaXNwYXRjaCkgPT4ge1xuXHRBUElfR0VUKCcvYXZhaWxhYmlsaXR5Lmpzb24nKS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuXG5cdFx0Y2FsbGJhY2socmVzcG9uc2UpXG5cblx0fSkuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSB7XG5cblx0fSlcbn1cbiIsImltcG9ydCB7IFNFTEVDVF9MT0NBVElPTl9PUEQsIE1FUkdFX1NFQVJDSF9TVEFURV9PUEQsIFRPR0dMRV9PUERfQ1JJVEVSSUEsIExPQURfU0VBUkNIX0NSSVRFUklBX09QRCwgU0VMRUNUX0xPQ0FUSU9OX0RJQUdOT1NJUyB9IGZyb20gJy4uLy4uL2NvbnN0YW50cy90eXBlcyc7XG5pbXBvcnQgeyBBUElfR0VUIH0gZnJvbSAnLi4vLi4vYXBpL2FwaS5qcyc7XG5cblxuZXhwb3J0IGNvbnN0IGxvYWRPUERDb21tb25Dcml0ZXJpYSA9ICgpID0+IChkaXNwYXRjaCkgPT4ge1xuXG4gICAgcmV0dXJuIEFQSV9HRVQoJy9hcGkvdjEvZG9jdG9yL3NlYXJjaGVkaXRlbXMnKS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICBkaXNwYXRjaCh7XG4gICAgICAgICAgICB0eXBlOiBMT0FEX1NFQVJDSF9DUklURVJJQV9PUEQsXG4gICAgICAgICAgICBwYXlsb2FkOiByZXNwb25zZVxuICAgICAgICB9KVxuICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICBkaXNwYXRjaCh7XG4gICAgICAgICAgICB0eXBlOiBMT0FEX1NFQVJDSF9DUklURVJJQV9PUEQsXG4gICAgICAgICAgICBwYXlsb2FkOiBudWxsXG4gICAgICAgIH0pXG4gICAgfSlcblxufVxuXG5leHBvcnQgY29uc3QgdG9nZ2xlT1BEQ3JpdGVyaWEgPSAodHlwZSwgY3JpdGVyaWEpID0+IChkaXNwYXRjaCkgPT4ge1xuICAgIGRpc3BhdGNoKHtcbiAgICAgICAgdHlwZTogVE9HR0xFX09QRF9DUklURVJJQSxcbiAgICAgICAgcGF5bG9hZDoge1xuICAgICAgICAgICAgdHlwZSwgY3JpdGVyaWFcbiAgICAgICAgfVxuICAgIH0pXG5cbn1cblxuZXhwb3J0IGNvbnN0IHNlbGVjdExvY2F0aW9uID0gKGxvY2F0aW9uKSA9PiAoZGlzcGF0Y2gpID0+IHtcbiAgICBkaXNwYXRjaCh7XG4gICAgICAgIHR5cGU6IFNFTEVDVF9MT0NBVElPTl9PUEQsXG4gICAgICAgIHBheWxvYWQ6IGxvY2F0aW9uXG4gICAgfSlcblxuICAgIGRpc3BhdGNoKHtcbiAgICAgICAgdHlwZTogU0VMRUNUX0xPQ0FUSU9OX0RJQUdOT1NJUyxcbiAgICAgICAgcGF5bG9hZDogbG9jYXRpb25cbiAgICB9KVxuXG59XG5cbmV4cG9ydCBjb25zdCBnZXRPUERDcml0ZXJpYVJlc3VsdHMgPSAoc2VhcmNoU3RyaW5nLCBjYWxsYmFjaykgPT4gKGRpc3BhdGNoKSA9PiB7XG4gICAgXG4gICAgQVBJX0dFVChgL2FwaS92MS9kaWFnbm9zdGljL3Rlc3Q/bmFtZT0ke3NlYXJjaFN0cmluZ31gKS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICBjYWxsYmFjayhyZXNwb25zZSlcbiAgICB9KS5jYXRjaChmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgICAgY2FsbGJhY2sobnVsbClcbiAgICB9KVxufVxuIiwiaW1wb3J0IEF4aW9zIGZyb20gJ2F4aW9zJ1xuaW1wb3J0IFNUT1JBR0UgZnJvbSAnLi4vaGVscGVycy9zdG9yYWdlJ1xuaW1wb3J0IE5BVklHQVRFIGZyb20gJy4uL2hlbHBlcnMvbmF2aWdhdGUnXG5cbmxldCBheGlvc0luc3RhbmNlID0gQXhpb3MuY3JlYXRlKHtcbiAgICBiYXNlVVJMOiAnaHR0cDovLzEwLjAuMzIuNzk6ODA4MCcsXG4gICAgaGVhZGVyOiB7fVxufSk7XG5cbmZ1bmN0aW9uIHJlamVjdEhhbmRsZXIocmVzcG9uc2UsIGNhbGxiYWNrKSB7XG4gICAgLy8gaWYgKHJlc3BvbnNlICYmIHJlc3BvbnNlLnJlc3BvbnNlICYmIHJlc3BvbnNlLnJlc3BvbnNlLnN0YXR1cyA9PSA0MDEpIHtcbiAgICAvLyAgICAgU1RPUkFHRS5kZWxldGVBdXRoKCkudGhlbigoKSA9PiB7XG4gICAgLy8gICAgICAgICAvLyBzZW5kIHRvIGxvZ2luIHBhZ2VcbiAgICAvLyAgICAgICAgIE5BVklHQVRFLm5hdmlnYXRlVG8oJy8nKVxuICAgIC8vICAgICB9KVxuICAgIC8vIH1cblxuICAgIGNhbGxiYWNrKHJlc3BvbnNlKVxufVxuXG5leHBvcnQgY29uc3QgQVBJX0dFVCA9ICh1cmwpID0+IHtcbiAgICByZXR1cm4gU1RPUkFHRS5nZXRBdXRoVG9rZW4oKS50aGVuKCh0b2tlbikgPT4ge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgYXhpb3NJbnN0YW5jZSh7XG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnZ2V0JyxcbiAgICAgICAgICAgICAgICB1cmw6IHVybCxcbiAgICAgICAgICAgICAgICAvLyBoZWFkZXJzOiB7ICdBdXRob3JpemF0aW9uJzogYFRva2VuICR7dG9rZW59YCB9XG4gICAgICAgICAgICB9KS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgICAgICAgICByZXNvbHZlKHJlcy5kYXRhKVxuICAgICAgICAgICAgfSwgKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgcmVqZWN0SGFuZGxlcihyZXNwb25zZSwgcmVqZWN0KVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICB9KVxuXG5cbn1cbmV4cG9ydCBjb25zdCBBUElfUE9TVCA9ICh1cmwsIGRhdGEpID0+IHtcbiAgICByZXR1cm4gU1RPUkFHRS5nZXRBdXRoVG9rZW4oKS50aGVuKCh0b2tlbikgPT4ge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgYXhpb3NJbnN0YW5jZSh7XG4gICAgICAgICAgICAgICAgbWV0aG9kOiAncG9zdCcsXG4gICAgICAgICAgICAgICAgdXJsOiB1cmwsXG4gICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiB7ICdBdXRob3JpemF0aW9uJzogYFRva2VuICR7dG9rZW59YCB9XG4gICAgICAgICAgICB9KS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgICAgICAgICByZXNvbHZlKHJlcy5kYXRhKVxuICAgICAgICAgICAgfSwgKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgcmVqZWN0SGFuZGxlcihyZXNwb25zZSwgcmVqZWN0KVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICB9KVxuXG5cbn1cblxuZXhwb3J0IGNvbnN0IEFQSV9QVVQgPSAodXJsLCBkYXRhKSA9PiB7XG4gICAgcmV0dXJuIFNUT1JBR0UuZ2V0QXV0aFRva2VuKCkudGhlbigodG9rZW4pID0+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGF4aW9zSW5zdGFuY2Uoe1xuICAgICAgICAgICAgICAgIG1ldGhvZDogJ3B1dCcsXG4gICAgICAgICAgICAgICAgdXJsOiB1cmwsXG4gICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiB7ICdBdXRob3JpemF0aW9uJzogYFRva2VuICR7dG9rZW59YCB9XG4gICAgICAgICAgICB9KS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgICAgICAgICByZXNvbHZlKHJlcy5kYXRhKVxuICAgICAgICAgICAgfSwgKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgcmVqZWN0SGFuZGxlcihyZXNwb25zZSwgcmVqZWN0KVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICB9KVxuXG5cbn1cblxuZXhwb3J0IGNvbnN0IEFQSV9ERUxFVEUgPSAodXJsKSA9PiB7XG4gICAgcmV0dXJuIFNUT1JBR0UuZ2V0QXV0aFRva2VuKCkudGhlbigodG9rZW4pID0+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGF4aW9zSW5zdGFuY2Uoe1xuICAgICAgICAgICAgICAgIG1ldGhvZDogJ2RlbGV0ZScsXG4gICAgICAgICAgICAgICAgdXJsOiB1cmwsXG4gICAgICAgICAgICAgICAgaGVhZGVyczogeyAnQXV0aG9yaXphdGlvbic6IGBUb2tlbiAke3Rva2VufWAgfVxuICAgICAgICAgICAgfSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShyZXMuZGF0YSlcbiAgICAgICAgICAgIH0sIChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgIHJlamVjdEhhbmRsZXIocmVzcG9uc2UsIHJlamVjdClcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgfSlcblxufSIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCB7IENpcmN1bGFyUHJvZ3Jlc3MgfSBmcm9tICdtYXRlcmlhbC11aS9Qcm9ncmVzcyc7XG5cbmNsYXNzIExvYWRlciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxvYWRlckNpcmN1bGFyXCI+XG4gICAgICAgICAgICAgICAgPENpcmN1bGFyUHJvZ3Jlc3MgY2xhc3NOYW1lPXtcImxvYWRlcmFjdHVhbFwifSBzaXplPXs1MH0gdGhpY2tuZXNzPXszfSAvPlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IExvYWRlclxuIiwiaW1wb3J0IExvYWRlciBmcm9tICcuL0xvYWRlcidcblxuZXhwb3J0IGRlZmF1bHQgTG9hZGVyIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuY2xhc3MgVXNlckxvZ2luVmlldyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgICBwaG9uZU51bWJlcjogJycsXG4gICAgICAgICAgICB2YWxpZGF0aW9uRXJyb3I6ICcnXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpbnB1dEhhbmRsZXIoZSkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHsgW2UudGFyZ2V0Lm5hbWVdOiBlLnRhcmdldC52YWx1ZSB9KVxuICAgIH1cblxuICAgIHN1Ym1pdE9UUFJlcXVlc3QobnVtYmVyKSB7XG5cbiAgICAgICAgaWYgKG51bWJlci5tYXRjaCgvXls3ODldezF9WzAtOV17OX0kLykpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyB2YWxpZGF0aW9uRXJyb3I6IFwiXCIgfSlcbiAgICAgICAgICAgIHRoaXMucHJvcHMuc2VuZE9UUChudW1iZXIsIChleGlzdHMpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnByb3BzLmhpc3RvcnkucmVwbGFjZSgnL290cC92ZXJpZnk/ZXhpc3RzPSR7ISFleGlzdHN9JylcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgdmFsaWRhdGlvbkVycm9yOiBcIlBsZWFzZSBwcm92aWRlIGEgdmFsaWQgbnVtYmVyICgxMCBkaWdpdHMpXCIgfSlcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICA8aGVhZGVyIGNsYXNzTmFtZT1cInNraW4td2hpdGUgZml4ZWQgaG9yaXpvbnRhbCB0b3AgYmRyLTEgYm90dG9tIGxpZ2h0XCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGFpbmVyLWZsdWlkXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLTJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHVsIGNsYXNzTmFtZT1cImlubGluZS1saXN0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGk+PHNwYW4gY2xhc3NOYW1lPVwiaWNvbiBpY29uLXNtIHRleHQtbWlkZGxlIGJhY2staWNvbi13aGl0ZVwiPjxpbWcgc3JjPVwiL2Fzc2V0cy9pbWcvY3VzdG9tZXItaWNvbnMvYmFjay1pY29uLnBuZ1wiIGNsYXNzTmFtZT1cImltZy1mbHVpZFwiIC8+PC9zcGFuPjwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtOFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImhlYWRlci10aXRsZSBmdy03MDAgY2FwaXRhbGl6ZSB0ZXh0LWNlbnRlclwiPlJlZ2lzdHJhdGlvbi9Mb2dpbjwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLTJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2hlYWRlcj5cbiAgICAgICAgICAgICAgICA8c2VjdGlvbiBjbGFzc05hbWU9XCJ3cmFwIG1vYmlsZS12ZXJpZmljYXRpb24tc2NyZWVuXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwid2lkZ2V0IG5vLXNoYWRvdyBuby1yb3VuZFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3aWRnZXQtaGVhZGVyIHRleHQtY2VudGVyIG12LWhlYWRlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoNCBjbGFzc05hbWU9XCJmdy03MDAgdGV4dC1tZFwiPkVudGVyIHlvdXIgTW9iaWxlIE51bWJlciA8YnIgLz4gdG8gY29udGludWU8L2g0PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIndpZGdldC1jb250ZW50IHRleHQtY2VudGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2JpbGUtdmVyaWZpY2F0aW9uXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidmVyaWZpLW1vYi1pb2NuIHRleHQtY2VudGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW1nIHNyYz1cIi9hc3NldHMvaW1nL2N1c3RvbWVyLWljb25zL21vYi5zdmdcIiBjbGFzc05hbWU9XCJpbWctZmx1aWRcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXAgbW9iaWxlLWZpZWxkXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRvbi1ncm91cCBlbnRlci1tb2JpbGUtbnVtYmVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBjbGFzc05hbWU9XCJmYy1pbnB1dCB0ZXh0LWNlbnRlclwiIHBsYWNlaG9sZGVyPVwiMjM0WFhYWFhYXCIgdmFsdWU9e3RoaXMuc3RhdGUucGhvbmVOdW1iZXJ9IG9uQ2hhbmdlPXt0aGlzLmlucHV0SGFuZGxlci5iaW5kKHRoaXMpfSBuYW1lPVwicGhvbmVOdW1iZXJcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZXJyb3JNZXNzYWdlXCI+e3RoaXMucHJvcHMuZXJyb3JfbWVzc2FnZX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJlcnJvck1lc3NhZ2VcIj57dGhpcy5zdGF0ZS52YWxpZGF0aW9uRXJyb3J9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L3NlY3Rpb24+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXt0aGlzLnN1Ym1pdE9UUFJlcXVlc3QuYmluZCh0aGlzLHRoaXMuc3RhdGUucGhvbmVOdW1iZXIpfSBkaXNhYmxlZD17dGhpcy5wcm9wcy5vdHBfcmVxdWVzdF9zZW50fSBjbGFzc05hbWU9XCJ2LWJ0biB2LWJ0bi1wcmltYXJ5IGJ0bi1sZyBmaXhlZCBob3Jpem9udGFsIGJvdHRvbSBuby1yb3VuZCBidG4tbGcgdGV4dC1sZ1wiPkNvbnRpbnVlPC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgVXNlckxvZ2luVmlld1xuIiwiaW1wb3J0IFVzZXJMb2dpblZpZXcgZnJvbSAnLi9Vc2VyTG9naW4nXG5cbmV4cG9ydCBkZWZhdWx0IFVzZXJMb2dpblZpZXciLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5jb25zdCBJZnJhbVN0eWxlID0ge1xuICAgIHdpZHRoOiAnMTAwJScsXG4gICAgaGVpZ2h0OiAnY2FsYygxMDB2aCAtIDYwcHgpJ1xufVxuXG5cbmNsYXNzIENoYXRWaWV3IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcblxuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhdGljIGNvbnRleHRUeXBlcyA9IHtcbiAgICAgICAgcm91dGVyOiAoKSA9PiBudWxsXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxvY2F0aW9uU2VsZWN0b3JcIj5cbiAgICAgICAgICAgICAgICA8aWZyYW1lIHNyYz1cImh0dHA6Ly9jaGF0Ym90LnBvbGljeWJhemFhci5jb20vbGl2ZWNoYXRcIiBzdHlsZT17SWZyYW1TdHlsZX0+PC9pZnJhbWU+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgQ2hhdFZpZXdcbiIsImltcG9ydCBDaGF0VmlldyBmcm9tICcuL0NoYXRWaWV3LmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBDaGF0VmlldyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCBDaGlwIGZyb20gJ21hdGVyaWFsLXVpL0NoaXAnO1xuXG5cbmNsYXNzIENvbW1vbmx5U2VhcmNoZWQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgICAgICB0aGlzLnN0YXRlID0ge1xuXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgbGV0IHJvd3MgPSB0aGlzLnByb3BzLmRhdGEubWFwKChyb3csaSkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJvcHMudHlwZSA9PSAnbGFiJykge1xuICAgICAgICAgICAgICAgIHJldHVybiA8bGkga2V5PXtpfT5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImN0LWltZyBsYWItaW1nXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGltZyBzcmM9XCIvYXNzZXRzL2ltZy9jdXN0b21lci1pY29ucy9sYWIxLnBuZ1wiIGNsYXNzTmFtZT1cImltZy1mbHVpZFwiIC8+XG4gICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwibGFiLW5hbWVcIj5TTFIgRGlnbm9zdGljczwvcD5cbiAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBsZXQgc2VsZWN0ZWQgPSBmYWxzZVxuICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuc2VsZWN0ZWQubWFwKChjdXJyKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmKGN1cnIuaWQgPT0gcm93LmlkKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkID0gdHJ1ZVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICByZXR1cm4gPGxpIGtleT17aX0+XG4gICAgICAgICAgICAgICAgICAgIDxhXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e3NlbGVjdGVkID8gXCJ2LWJ0biB2LWJ0bi1wcmltYXJ5IHRhZy1zbSBvdXRsaW5lIHNlbGVjdGVkXCIgOiBcInYtYnRuIHYtYnRuLXByaW1hcnkgdGFnLXNtIG91dGxpbmVcIn1cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy50b2dnbGUoKHRoaXMucHJvcHMudHlwZSB8fCByb3cudHlwZSksIHJvdylcbiAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtyb3cubmFtZX1cbiAgICAgICAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSlcblxuICAgICAgICBsZXQgZGl2Q2xhc3MgPSBgcGFuZWwtY29udGVudGBcbiAgICAgICAgbGV0IHVsQ2xhc3MgPSBgaW5saW5lLWxpc3RgXG5cbiAgICAgICAgaWYgKHRoaXMucHJvcHMudHlwZSA9PSAnbGFiJykge1xuICAgICAgICAgICAgZGl2Q2xhc3MgPSBgcGFuZWwtY29udGVudCB0b3RhbC1sYWJzYFxuICAgICAgICAgICAgdWxDbGFzcyA9IGBpbmxpbmUtbGlzdCBsYWItaXRlbXNgXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIndpZGdldC1wYW5lbFwiPlxuICAgICAgICAgICAgICAgIDxoNCBjbGFzc05hbWU9XCJwYW5lbC10aXRsZVwiPnt0aGlzLnByb3BzLmhlYWRpbmd9PC9oND5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17ZGl2Q2xhc3N9PlxuICAgICAgICAgICAgICAgICAgICA8dWwgY2xhc3NOYW1lPXt1bENsYXNzfT5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtyb3dzfVxuICAgICAgICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IENvbW1vbmx5U2VhcmNoZWRcbiIsImltcG9ydCBDb21tb25seVNlYXJjaGVkIGZyb20gJy4vQ29tbW9ubHlTZWFyY2hlZC5qcydcblxuXG5leHBvcnQgZGVmYXVsdCBDb21tb25seVNlYXJjaGVkIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGxpZ2h0QmFzZVRoZW1lIH0gZnJvbSAnbWF0ZXJpYWwtdWkvc3R5bGVzJztcbmltcG9ydCBMb2FkZXIgZnJvbSAnLi4vLi4vY29tbW9ucy9Mb2FkZXInXG5cbmNvbnN0IGRlYm91bmNlciA9IChmbiwgZGVsYXkpID0+IHtcbiAgICBsZXQgdGltZXIgPSBudWxsXG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVyKVxuICAgICAgICB0aW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgZm4uY2FsbCh0aGlzKVxuICAgICAgICB9LCBkZWxheSlcbiAgICB9XG59XG5cblxuY2xhc3MgQ3JpdGVyaWFTZWFyY2hWaWV3IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIHNlYXJjaFZhbHVlOiAnJyxcbiAgICAgICAgICAgIHNlYXJjaFJlc3VsdHM6IFtdXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgdGhpcy5nZXRTZWFyY2hSZXN1bHRzID0gZGVib3VuY2VyKHRoaXMuZ2V0U2VhcmNoUmVzdWx0cy5iaW5kKHRoaXMpLCAxMDAwKVxuICAgICAgICBsZXQgaW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndG9wQ3JpdGVyaWFTZWFyY2gnKVxuICAgICAgICAvLyBpbnB1dC5mb2N1cygpXG4gICAgfVxuXG4gICAgaW5wdXRIYW5kbGVyKGUpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHNlYXJjaFZhbHVlOiBlLnRhcmdldC52YWx1ZSB9KVxuICAgICAgICB0aGlzLmdldFNlYXJjaFJlc3VsdHMoKVxuICAgIH1cblxuICAgIGdldFNlYXJjaFJlc3VsdHMoKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLnR5cGUgPT0gJ29wZCcpIHtcblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5nZXREaWFnbm9zaXNDcml0ZXJpYVJlc3VsdHModGhpcy5zdGF0ZS5zZWFyY2hWYWx1ZSwgKHNlYXJjaFJlc3VsdHMpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoc2VhcmNoUmVzdWx0cykge1xuICAgICAgICAgICAgICAgICAgICBsZXQgdGVzdHMgPSBzZWFyY2hSZXN1bHRzLnRlc3RzLm1hcCh4ID0+IHsgcmV0dXJuIHsgLi4ueCwgdHlwZTogJ3Rlc3QnIH0gfSlcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHNlYXJjaFJlc3VsdHM6IFsuLi50ZXN0c10gfSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgYWRkQ3JpdGVyaWEoY3JpdGVyaWEpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMudHlwZSA9PSAnb3BkJykge1xuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLnRvZ2dsZURpYWdub3Npc0NyaXRlcmlhKGNyaXRlcmlhLnR5cGUsIGNyaXRlcmlhKVxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHNlYXJjaFZhbHVlOiBcIlwiIH0pXG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICBsZXQgbG9jYXRpb24gPSBcIkd1cmdhb25cIlxuICAgICAgICBpZiAodGhpcy5wcm9wcy5zZWxlY3RlZExvY2F0aW9uKSB7XG4gICAgICAgICAgICBsb2NhdGlvbiA9IHRoaXMucHJvcHMuc2VsZWN0ZWRMb2NhdGlvbi5mb3JtYXR0ZWRfYWRkcmVzcy5zbGljZSgwLCA1KVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgPGhlYWRlciBjbGFzc05hbWU9XCJza2luLXByaW1hcnkgZml4ZWQgaG9yaXpvbnRhbCB0b3AgY3QtaGVhZGVyXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGFpbmVyLWZsdWlkXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLTEyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibmF2aWdhdGUtcm93XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dWwgY2xhc3NOYW1lPVwiaW5saW5lLWxpc3QgdG9wLW5hdiBhbHBoYS1ieCB0ZXh0LXdoaXRlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuaGlzdG9yeS5nbygtMSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaT48c3BhbiBjbGFzc05hbWU9XCJjdC1pbWcgY3QtaW1nLXNtIGFycm93LWltZ1wiPjxpbWcgc3JjPVwiL2Fzc2V0cy9pbWcvY3VzdG9tZXItaWNvbnMvbGVmdC1hcnJvdy5zdmdcIiBjbGFzc05hbWU9XCJpbWctZmx1aWRcIiAvPjwvc3Bhbj48L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaT48ZGl2IGNsYXNzTmFtZT1cInNjcmVlbi10aXRsZVwiPlNlYXJjaDwvZGl2PjwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHVsIGNsYXNzTmFtZT1cImlubGluZS1saXN0IHRvcC1uYXYgYmV0YS1ieCBmbG9hdC1yaWdodCB0ZXh0LXJpZ2h0IHRleHQtd2hpdGVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5oaXN0b3J5LnB1c2goJy9sb2NhdGlvbnNlYXJjaCcpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGk+PGRpdiBjbGFzc05hbWU9XCJzY3JlZW4tdGl0bGVcIj48c3BhbiBjbGFzc05hbWU9XCJjdC1pbWcgY3QtaW1nLXNtIG1hcC1tYXJrZXItaW1nXCI+PGltZyBzcmM9XCIvYXNzZXRzL2ltZy9jdXN0b21lci1pY29ucy9tYXAtbWFya2VyLnN2Z1wiIGNsYXNzTmFtZT1cImltZy1mbHVpZFwiIC8+PC9zcGFuPiB7bG9jYXRpb259PC9kaXY+PC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLTEyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic2VhcmNoLXJvd1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG9uLWdyb3VwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sIGlucHV0LW1kIHNlYXJjaC1pbnB1dFwiIGlkPVwidG9wQ3JpdGVyaWFTZWFyY2hcIiBvbkNoYW5nZT17dGhpcy5pbnB1dEhhbmRsZXIuYmluZCh0aGlzKX0gdmFsdWU9e3RoaXMuc3RhdGUuc2VhcmNoVmFsdWV9IHBsYWNlaG9sZGVyPXt0aGlzLnByb3BzLnRpdGxlfSAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImN0LWltZyBjdC1pbWctc20gc2VhcmNoLWljb25cIj48aW1nIHNyYz1cIi9hc3NldHMvaW1nL2N1c3RvbWVyLWljb25zL3NlYXJjaC1pY29uLnN2Z1wiIC8+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvaGVhZGVyPlxuXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlLnNlYXJjaFZhbHVlID9cblxuICAgICAgICAgICAgICAgICAgICAgICAgPHNlY3Rpb24gY2xhc3NOYW1lPVwid3JhcCB3cmFwLTEwMFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwid2lkZ2V0LXBhbmVsXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoNCBjbGFzc05hbWU9XCJwYW5lbC10aXRsZVwiPlNlYXJjaCBSZXN1bHQ8L2g0PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBhbmVsLWNvbnRlbnRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx1bCBjbGFzc05hbWU9XCJsaXN0IHNlYXJjaC1yZXN1bHQtbGlzdFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZS5zZWFyY2hSZXN1bHRzLm1hcCgoY3VyciwgaSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDxsaSBvbkNsaWNrPXt0aGlzLmFkZENyaXRlcmlhLmJpbmQodGhpcywgY3Vycil9IGtleT17aX0+PGE+e2N1cnIubmFtZX08L2E+PC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvc2VjdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDogKHRoaXMucHJvcHMuY2hlY2tGb3JMb2FkID8gdGhpcy5wcm9wcy5jaGlsZHJlbiA6IDxMb2FkZXIgLz4pXG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgQ3JpdGVyaWFTZWFyY2hWaWV3XG4iLCJpbXBvcnQgQ3JpdGVyaWFTZWFyY2hWaWV3IGZyb20gJy4vQ3JpdGVyaWFTZWFyY2hWaWV3LmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBDcml0ZXJpYVNlYXJjaFZpZXciLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5jbGFzcyBPdHBWZXJpZnlWaWV3IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcblxuICAgICAgICB9XG5cbiAgICAgICAgY29uc29sZS5sb2codGhpcy5wcm9wcylcbiAgICAgICAgZGVidWdnZXJcbiAgICB9XG5cbiAgICBpbnB1dEhhbmRsZXIoZSkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHsgW2UudGFyZ2V0Lm5hbWVdOiBlLnRhcmdldC52YWx1ZSB9KVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBPdHBWZXJpZnlWaWV3XG4iLCJpbXBvcnQgT3RwVmVyaWZ5IGZyb20gJy4vT3RwVmVyaWZ5J1xuXG5leHBvcnQgZGVmYXVsdCBPdHBWZXJpZnkiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IEVtb3RpSWNvbiBmcm9tICdtYXRlcmlhbC11aS1pY29ucy9BY2NvdW50Q2lyY2xlJztcblxuY2xhc3MgUHJvZmlsZVNsaWRlciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgfVxuXG4gICAgc3dpdGNoVXNlcihwcm9maWxlSWQpIHtcbiAgICAgICAgdGhpcy5jb250ZXh0LnJvdXRlci5oaXN0b3J5LnB1c2goYC91c2VyLyR7cHJvZmlsZUlkfSR7dGhpcy5wcm9wcy5zdWJSb3V0ZX1gKVxuXG4gICAgfVxuXG4gICAgc3RhdGljIGNvbnRleHRUeXBlcyA9IHtcbiAgICAgICAgcm91dGVyOiAoKSA9PiBudWxsXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIGxldCBwcm9maWxlcyA9IFtdXG5cbiAgICAgICAgcHJvZmlsZXMgPSBPYmplY3Qua2V5cyh0aGlzLnByb3BzLnByb2ZpbGVzKS5tYXAoKHByb2ZpbGVJZCwgaSkgPT4ge1xuICAgICAgICAgICAgbGV0IHNyYyA9IHRoaXMucHJvcHMucHJvZmlsZXNbcHJvZmlsZUlkXS5wcm9maWxlSW1hZ2UgfHwgXCJodHRwczovL3d3dy5hdG9taXguY29tLmF1L21lZGlhLzIwMTUvMDYvYXRvbWl4X3VzZXIzMS5wbmdcIlxuICAgICAgICAgICAgcmV0dXJuIDxkaXYga2V5PXtpfSBjbGFzc05hbWU9XCJzbGlkZVRpbGVcIiBvbkNsaWNrPXt0aGlzLnN3aXRjaFVzZXIuYmluZCh0aGlzLCBwcm9maWxlSWQpfT5cbiAgICAgICAgICAgICAgICA8aW1nIGNsYXNzTmFtZT1cInByb2ZpbGVDYXJkSW1hZ2VcIiBzcmM9e3NyY30vPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIH0pXG5cblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwcm9maWxlU2xpZGVyXCI+XG4gICAgICAgICAgICAgICAge3Byb2ZpbGVzfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IFByb2ZpbGVTbGlkZXJcbiIsImltcG9ydCBQcm9maWxlU2xpZGVyIGZyb20gJy4vUHJvZmlsZVNsaWRlci5qcydcblxuZXhwb3J0IGRlZmF1bHQgUHJvZmlsZVNsaWRlciIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCB7IGdldFRpbWUsIGdldERheU5hbWUgfSBmcm9tICcuLi8uLi8uLi91dGlscy9kYXRlVGltZVV0aWxzLmpzJ1xuXG5jbGFzcyBUaW1lU2xvdFNlbGVjdG9yIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIHNlbGVjdGVkRGF5OiAwLFxuICAgICAgICAgICAgc2VsZWN0ZWRJbnRlcnZhbDogMCxcbiAgICAgICAgICAgIHNlbGVjdGVkVGltZVNsb3Q6IDBcblxuICAgICAgICB9XG4gICAgfVxuICAgIGNvbXBvbmVudFdpbGxNb3VudCgpIHtcbiAgICAgICAgbGV0IHRpbWVTbG90cyA9IHRoaXMucHJvcHMudGltZVNsb3RzO1xuXG4gICAgICAgIHRoaXMuc2V0RGVmYXVsdFNlbGVjdGVkKHRpbWVTbG90cyk7XG5cbiAgICB9XG4gICAgc2V0RGVmYXVsdFNlbGVjdGVkKHRpbWVTbG90cykge1xuICAgICAgICBsZXQgZGF5cyA9IHRpbWVTbG90cy5kYXRlcztcbiAgICAgICAgbGV0IGRlZmF1bHREYXlJbmRleCA9IHRoaXMuZ2V0Rmlyc3RBdmFpbGFibGVEYXkoZGF5cyk7XG4gICAgICAgIFxuICAgICAgICBpZiAoZGVmYXVsdERheUluZGV4IHx8IGRlZmF1bHREYXlJbmRleCA9PT0gMCkge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHNlbGVjdGVkRGF5OiBkZWZhdWx0RGF5SW5kZXggfSk7XG4gICAgICAgICAgICB2YXIgZGVmYXV0SW50ZXJ3YWxJbmRleCA9IHRoaXMuZ2V0Rmlyc3RBdmFpbGFibGVJbnRlcndhbChkYXlzW2RlZmF1bHREYXlJbmRleF0uaW50ZXJ2YWxzKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZGVmYXV0SW50ZXJ3YWxJbmRleCB8fCBkZWZhdXRJbnRlcndhbEluZGV4ID09PSAwKSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgc2VsZWN0ZWRJbnRlcnZhbDogZGVmYXV0SW50ZXJ3YWxJbmRleCB9KTtcbiAgICAgICAgICAgIHZhciBkZWZhdWx0VGltZVNsb3RJbmRleCA9IHRoaXMuZ2V0Rmlyc3RBdmFpbGFibGVUaW1lU2xvdChkYXlzW2RlZmF1bHREYXlJbmRleF0uaW50ZXJ2YWxzW2RlZmF1dEludGVyd2FsSW5kZXhdLnRpbWVTbG90cyk7XG5cbiAgICAgICAgfVxuICAgICAgICBpZiAoZGVmYXVsdFRpbWVTbG90SW5kZXggfHwgZGVmYXVsdFRpbWVTbG90SW5kZXggPT09IDApIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBzZWxlY3RlZFRpbWVTbG90OiBkZWZhdWx0VGltZVNsb3RJbmRleCB9KTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgZ2V0Rmlyc3RBdmFpbGFibGVJbnRlcndhbChpbnRlcnZhbHMpIHtcblxuICAgICAgICBmb3IgKGxldCBpbnRlcndhbEluZGV4IGluIGludGVydmFscykge1xuICAgICAgICAgICAgbGV0IGludGVyd2FsID0gaW50ZXJ2YWxzW2ludGVyd2FsSW5kZXhdO1xuICAgICAgICAgICAgaWYgKGludGVyd2FsICYmIGludGVyd2FsLmlzQXZhaWxhYmxlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBhcnNlSW50KGludGVyd2FsSW5kZXgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0Rmlyc3RBdmFpbGFibGVUaW1lU2xvdCh0aW1lU2xvdHMpIHtcblxuICAgICAgICBmb3IgKGxldCB0aW1lU2xvdEluZGV4IGluIHRpbWVTbG90cykge1xuICAgICAgICAgICAgbGV0IHRpbWVTbG90ID0gdGltZVNsb3RzW3RpbWVTbG90SW5kZXhdO1xuICAgICAgICAgICAgaWYgKHRpbWVTbG90ICYmIHRpbWVTbG90LmlzQXZhaWxhYmxlKSB7XG4gICAgICAgICAgICAgICAgLy8gY2FsbGluZyBwYXJlbnQgdGltZVNsb3Qgc2V0dGVyXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5zZWxlY3RUaW1lU2xvdCh0aW1lU2xvdClcbiAgICAgICAgICAgICAgICByZXR1cm4gcGFyc2VJbnQodGltZVNsb3RJbmRleCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBcblxuICAgIH1cblxuICAgIGdldEZpcnN0QXZhaWxhYmxlRGF5KGRheXMpIHtcblxuICAgICAgICBmb3IgKGxldCBkYXlJbmRleCBpbiBkYXlzKSB7XG4gICAgICAgICAgICBsZXQgZGF5ID0gZGF5c1tkYXlJbmRleF07XG4gICAgICAgICAgICBpZiAoZGF5ICYmIGRheS5pc0F2YWlsYWJsZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBwYXJzZUludChkYXlJbmRleCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgb25EYXRlQ2xpY2soZGF0ZSwgc2VsZWN0ZWRJbmRleCwgaW5kZXgpIHtcblxuICAgICAgICBpZiAoc2VsZWN0ZWRJbmRleCAhPT0gaW5kZXggJiYgZGF0ZS5pc0F2YWlsYWJsZSkge1xuICAgICAgICAgICAgdmFyIGF2YWlsYWJsZUludGVyd2FsID0gdGhpcy5nZXRGaXJzdEF2YWlsYWJsZUludGVyd2FsKGRhdGUuaW50ZXJ2YWxzKVxuICAgICAgICAgICAgaWYgKGF2YWlsYWJsZUludGVyd2FsIHx8IGF2YWlsYWJsZUludGVyd2FsID09PSAwKSB7XG4gICAgICAgICAgICAgICAgbGV0IHRpbWVTbG90cyA9IGRhdGUuaW50ZXJ2YWxzW2F2YWlsYWJsZUludGVyd2FsXS50aW1lU2xvdHM7XG4gICAgICAgICAgICAgICAgdmFyIGF2YWlsYWJsZVRpbWVTbG90ID0gdGhpcy5nZXRGaXJzdEF2YWlsYWJsZVRpbWVTbG90KHRpbWVTbG90cyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBzZWxlY3RlZERheTogaW5kZXgsIHNlbGVjdGVkSW50ZXJ2YWw6IGF2YWlsYWJsZUludGVyd2FsLCBzZWxlY3RlZFRpbWVTbG90OiBhdmFpbGFibGVUaW1lU2xvdCB9KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBvbkludGVydmFsQ2xpY2soaW50ZXJ3YWwsIHNlbGVjdGVkSW5kZXgsIGluZGV4KSB7XG5cblxuXG4gICAgICAgIGlmIChzZWxlY3RlZEluZGV4ICE9PSBpbmRleCAmJiBpbnRlcndhbC5pc0F2YWlsYWJsZSkge1xuICAgICAgICAgICAgbGV0IHRpbWVTbG90cyA9IGludGVyd2FsLnRpbWVTbG90cztcbiAgICAgICAgICAgIHZhciBhdmFpbGFibGVUaW1lU2xvdCA9IHRoaXMuZ2V0Rmlyc3RBdmFpbGFibGVUaW1lU2xvdCh0aW1lU2xvdHMpO1xuXG5cbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBzZWxlY3RlZEludGVydmFsOiBpbmRleCwgc2VsZWN0ZWRUaW1lU2xvdDogYXZhaWxhYmxlVGltZVNsb3QgfSk7XG4gICAgICAgIH1cblxuICAgIH1cbiAgICBvblRpbWVTbG90Q2xpY2sodGltZVNsb3QsIHNlbGVjdGVkSW5kZXgsIGluZGV4KSB7XG5cbiAgICAgICAgaWYgKHNlbGVjdGVkSW5kZXggIT09IGluZGV4ICYmIHRpbWVTbG90LmlzQXZhaWxhYmxlKSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgc2VsZWN0ZWRUaW1lU2xvdDogaW5kZXggfSk7XG4gICAgICAgICAgICAvLyBjYWxsaW5nIHBhcmVudCB0aW1lU2xvdCBzZXR0ZXJcbiAgICAgICAgICAgIHRoaXMucHJvcHMuc2VsZWN0VGltZVNsb3QodGltZVNsb3QpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgbGV0IHsgZGF0ZXMgfSA9IHRoaXMucHJvcHMudGltZVNsb3RzXG5cbiAgICAgICAgbGV0IGludGVydmFscyA9IFtdXG4gICAgICAgIGxldCB0aW1lU2xvdHMgPSBbXVxuICAgICAgICBsZXQgZGF0ZUxpc3QgPSBbXVxuXG5cbiAgICAgICAgZGF0ZUxpc3QgPSBkYXRlcy5tYXAoKGRhdGUsIGkpID0+IHtcbiAgICAgICAgICAgIGxldCBkYXlEYXRlID0gbmV3IERhdGUoZGF0ZS5kYXRlKS5nZXREYXRlKClcbiAgICAgICAgICAgIGxldCBkYXlOYW1lID0gZ2V0RGF5TmFtZShkYXRlLmRhdGUpO1xuICAgICAgICAgICAgbGV0IHNlbGVjdGVkID0gdGhpcy5zdGF0ZS5zZWxlY3RlZERheSA9PSBpXG4gICAgICAgICAgICByZXR1cm4gPGRpdiBrZXk9e2l9IG9uQ2xpY2s9e3RoaXMub25EYXRlQ2xpY2suYmluZCh0aGlzLCBkYXRlLCB0aGlzLnN0YXRlLnNlbGVjdGVkRGF5LCBpKX0gY2xhc3NOYW1lPXtkYXRlLmlzQXZhaWxhYmxlID8gKHNlbGVjdGVkID8gXCJkYXRlVGlsZSBzZWxlY3RlZFwiIDogXCJkYXRlVGlsZVwiKSA6IFwiZGF0ZVRpbGUgZGlzYWJsZWRcIn0+XG4gICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwiZGF0ZVwiPntkYXlEYXRlfTwvcD5cbiAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJkYXlcIj57ZGF5TmFtZX08L3A+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgfSlcbiAgICAgICAgaW50ZXJ2YWxzID0gZGF0ZXNbdGhpcy5zdGF0ZS5zZWxlY3RlZERheV0uaW50ZXJ2YWxzLm1hcCgoaW50ZXJ2YWwsIGkpID0+IHtcbiAgICAgICAgICAgIGxldCBzZWxlY3RlZCA9IHRoaXMuc3RhdGUuc2VsZWN0ZWRJbnRlcnZhbCA9PSBpXG4gICAgICAgICAgICByZXR1cm4gPGJ1dHRvbiBrZXk9e2l9IG9uQ2xpY2s9e3RoaXMub25JbnRlcnZhbENsaWNrLmJpbmQodGhpcywgaW50ZXJ2YWwsIHRoaXMuc3RhdGUuc2VsZWN0ZWRJbnRlcnZhbCwgaSl9IGNsYXNzTmFtZT17aW50ZXJ2YWwuaXNBdmFpbGFibGUgPyAoc2VsZWN0ZWQgPyBcInRzQnRuIHNlbGVjdGVkXCIgOiBcInRzQnRuXCIpIDogXCJ0c0J0biBkaXNhYmxlZFwifT57aW50ZXJ2YWwubmFtZX08L2J1dHRvbj5cbiAgICAgICAgfSlcblxuICAgICAgICB0aW1lU2xvdHMgPSBkYXRlc1t0aGlzLnN0YXRlLnNlbGVjdGVkRGF5XS5pbnRlcnZhbHNbdGhpcy5zdGF0ZS5zZWxlY3RlZEludGVydmFsXS50aW1lU2xvdHMubWFwKChzbG90LCBpKSA9PiB7XG4gICAgICAgICAgICBsZXQgc2VsZWN0ZWQgPSB0aGlzLnN0YXRlLnNlbGVjdGVkVGltZVNsb3QgPT0gaVxuICAgICAgICAgICAgbGV0IHNsb3RUZXh0ID0gZ2V0VGltZShzbG90LnN0YXJ0KVxuICAgICAgICAgICAgaWYoc2xvdC5lbmQpe1xuICAgICAgICAgICAgICAgIHNsb3RUZXh0ICs9IGAgLSAke2dldFRpbWUoc2xvdC5lbmQpfWBcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiA8c3BhbiBrZXk9e2l9IG9uQ2xpY2s9e3RoaXMub25UaW1lU2xvdENsaWNrLmJpbmQodGhpcywgc2xvdCwgdGhpcy5zdGF0ZS5zZWxlY3RlZFRpbWVTbG90LCBpKX0gY2xhc3NOYW1lPXtzbG90LmlzQXZhaWxhYmxlID8gKHNlbGVjdGVkID8gXCJzbG90IHNlbGVjdGVkXCIgOiBcInNsb3RcIikgOiBcInNsb3QgZGlzYWJsZWRcIn0+e3Nsb3RUZXh0fTwvc3Bhbj5cbiAgICAgICAgfSlcblxuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRpbWVTbG90U2VsZWN0b3JcIj5cbiAgICAgICAgICAgICAgICA8aDU+U2VsZWN0IHByZWZmZXJlZCB0aW1lIHNsb3Q8L2g1PlxuXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJkYXRlQ2FyXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic2Nyb2xsZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtkYXRlTGlzdH1cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRpbWVTbG90c1wiPlxuICAgICAgICAgICAgICAgICAgICB7aW50ZXJ2YWxzfVxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNsb3RzXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICB7dGltZVNsb3RzfVxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBUaW1lU2xvdFNlbGVjdG9yXG4iLCJpbXBvcnQgVGltZVNsb3RTZWxlY3RvciBmcm9tICcuL1RpbWVTbG90U2VsZWN0b3IuanMnXG5cbmV4cG9ydCBkZWZhdWx0IFRpbWVTbG90U2VsZWN0b3IiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgUHJvZmlsZVNsaWRlciBmcm9tICcuLi9wcm9maWxlU2xpZGVyL2luZGV4LmpzJ1xuaW1wb3J0IEFwcG9pbnRtZW50TGlzdCBmcm9tICcuL2FwcG9pbnRtZW50TGlzdC9pbmRleC5qcydcblxuY2xhc3MgVXNlckFwcG9pbnRtZW50c1ZpZXcgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgICAgICB0aGlzLnN0YXRlID0ge1xuXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgdGhpcy5wcm9wcy5nZXRVc2VyUHJvZmlsZVdpdGhBcHBvaW50bWVudHMoKVxuICAgIH1cblxuICAgIHN0YXRpYyBjb250ZXh0VHlwZXMgPSB7XG4gICAgICAgIHJvdXRlcjogKCkgPT4gbnVsbFxuICAgIH1cblxuICAgIGNvbXBhcmVEYXRlV2l0aFRvZGF5KGRhdGUpe1xuICAgICAgICBsZXQgdG9kYXkgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKVxuICAgICAgICBkYXRlID0gbmV3IERhdGUoZGF0ZSkuZ2V0VGltZSgpXG4gICAgICAgIHJldHVybiB0b2RheSA+IGRhdGVcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgbGV0IHNlbGVjdGVkVXNlciA9IG51bGxcbiAgICAgICAgbGV0IHVzZXJQcm9maWxlSWQgPSB0aGlzLnByb3BzLm1hdGNoLnBhcmFtcy5pZFxuXG4gICAgICAgIGlmICh0aGlzLnByb3BzLlVTRVIucHJvZmlsZXNbdXNlclByb2ZpbGVJZF0pIHtcbiAgICAgICAgICAgIHNlbGVjdGVkVXNlciA9IHRoaXMucHJvcHMuVVNFUi5wcm9maWxlc1t1c2VyUHJvZmlsZUlkXVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgT2JqZWN0LmtleXModGhpcy5wcm9wcy5VU0VSLnByb2ZpbGVzKS5tYXAoKHByb2ZpbGVJZCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnByb3BzLlVTRVIucHJvZmlsZXNbcHJvZmlsZUlkXS5pc0RlZmF1bHRVc2VyKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkVXNlciA9IHRoaXMucHJvcHMuVVNFUi5wcm9maWxlc1twcm9maWxlSWRdXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInVzZXJQcm9maWxlXCI+XG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAoIHNlbGVjdGVkVXNlciAmJiBzZWxlY3RlZFVzZXIuYXBwb2ludG1lbnRzICkgPyA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPFByb2ZpbGVTbGlkZXJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9maWxlcz17dGhpcy5wcm9wcy5VU0VSLnByb2ZpbGVzfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1YlJvdXRlPVwiL2FwcG9pbnRtZW50c1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidXBjb21pbmdhcHBcIj5VcGNvbWluZyBPUEQgQXBwb2ludG1lbnRzPC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkVXNlci5hcHBvaW50bWVudHMuZmlsdGVyKChhcHBvaW50bWVudCxpKSA9PntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGRhdGUgPSBhcHBvaW50bWVudC5zbG90ID8gYXBwb2ludG1lbnQuc2xvdC5zdGFydCA6IDBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICF0aGlzLmNvbXBhcmVEYXRlV2l0aFRvZGF5KGRhdGUpIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLm1hcCgoYXBwb2ludG1lbnQsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiA8QXBwb2ludG1lbnRMaXN0IGtleT17aW5kZXh9IGRhdGE9e2FwcG9pbnRtZW50fSAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJwcmV2YXBwXCI+UHJldmlvdXMgT1BEIEFwcG9pbnRtZW50czwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZFVzZXIuYXBwb2ludG1lbnRzLmZpbHRlcigoYXBwb2ludG1lbnQsaSkgPT57XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkYXRlID0gYXBwb2ludG1lbnQuc2xvdCA/IGFwcG9pbnRtZW50LnNsb3Quc3RhcnQgOiAwXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNvbXBhcmVEYXRlV2l0aFRvZGF5KGRhdGUpIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLm1hcCgoYXBwb2ludG1lbnQsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiA8QXBwb2ludG1lbnRMaXN0IGtleT17aW5kZXh9IGRhdGE9e2FwcG9pbnRtZW50fSAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PiA6IFwiXCJcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBVc2VyQXBwb2ludG1lbnRzVmlld1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBSaWdodEFycm93SWNvbiBmcm9tICdtYXRlcmlhbC11aS1pY29ucy9LZXlib2FyZEFycm93UmlnaHQnO1xuXG5jbGFzcyBBcHBvaW50bWVudExpc3QgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgIH1cblxuICAgIGdldFRpbWUodW5peF90aW1lc3RhbXApIHtcbiAgICAgICAgdmFyIGRhdGUgPSBuZXcgRGF0ZSh1bml4X3RpbWVzdGFtcCAqIDEwMDApO1xuICAgICAgICB2YXIgaG91cnMgPSBkYXRlLmdldEhvdXJzKCk7XG4gICAgICAgIHZhciBtaW51dGVzID0gXCIwXCIgKyBkYXRlLmdldE1pbnV0ZXMoKTtcbiAgICAgICAgcmV0dXJuIGhvdXJzICsgJzonICsgbWludXRlcy5zdWJzdHIoLTIpXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIGxldCB7IGRvY3Rvck5hbWUsIHNsb3QgfSA9IHRoaXMucHJvcHMuZGF0YVxuICAgICAgICBzbG90ID0gc2xvdCB8fCB7XG4gICAgICAgICAgICBzdGFydDogMCxcbiAgICAgICAgICAgIGVuZDogMFxuICAgICAgICB9XG4gICAgICAgIGxldCBkYXRlID0gbmV3IERhdGUoc2xvdC5zdGFydCkudG9EYXRlU3RyaW5nKClcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhcHBvaW50bWVudFwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibmFtZVwiPlxuXG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJkZXRhaWxzXCI+XG4gICAgICAgICAgICAgICAgICAgIDxwPlxuICAgICAgICAgICAgICAgICAgICAgICAge2RvY3Rvck5hbWV9XG4gICAgICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICAgICAgPHA+XG4gICAgICAgICAgICAgICAgICAgICAgICB7ZGF0ZX1cbiAgICAgICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgICAgICAgICAgIHt0aGlzLmdldFRpbWUoc2xvdC5zdGFydCkgKyBcIiB0byBcIiArIHRoaXMuZ2V0VGltZShzbG90LmVuZCl9XG4gICAgICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJvb2tcIj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dFwiPlZpZXcgQ29uZmlybWF0aW9uPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8UmlnaHRBcnJvd0ljb24gY2xhc3NOYW1lPVwiYm9va0ljb25cIiAvPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IEFwcG9pbnRtZW50TGlzdFxuIiwiaW1wb3J0IEFwcG9pbnRtZW50TGlzdCBmcm9tICcuL0FwcG9pbnRtZW50TGlzdC5qcydcblxuZXhwb3J0IGRlZmF1bHQgQXBwb2ludG1lbnRMaXN0IiwiaW1wb3J0IFVzZXJBcHBvaW50bWVudHNWaWV3IGZyb20gJy4vVXNlckFwcG9pbnRtZW50c1ZpZXcuanMnXG5cbmV4cG9ydCBkZWZhdWx0IFVzZXJBcHBvaW50bWVudHNWaWV3IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IFByb2ZpbGVTbGlkZXIgZnJvbSAnLi4vcHJvZmlsZVNsaWRlci9pbmRleC5qcydcbmltcG9ydCBQcm9maWxlRGF0YSBmcm9tICcuL3Byb2ZpbGVEYXRhL2luZGV4LmpzJ1xuXG5jbGFzcyBVc2VyUHJvZmlsZVZpZXcgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgICAgICB0aGlzLnN0YXRlID0ge1xuXG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIHRoaXMucHJvcHMuZ2V0VXNlclByb2ZpbGUoKVxuICAgIH1cblxuICAgIHN0YXRpYyBjb250ZXh0VHlwZXMgPSB7XG4gICAgICAgIHJvdXRlcjogKCkgPT4gbnVsbFxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICBsZXQgc2VsZWN0ZWRVc2VyID0gbnVsbFxuICAgICAgICBsZXQgdXNlclByb2ZpbGVJZCA9IHRoaXMucHJvcHMubWF0Y2gucGFyYW1zLmlkXG5cbiAgICAgICAgaWYgKHRoaXMucHJvcHMuVVNFUi5wcm9maWxlc1t1c2VyUHJvZmlsZUlkXSkge1xuICAgICAgICAgICAgc2VsZWN0ZWRVc2VyID0gdGhpcy5wcm9wcy5VU0VSLnByb2ZpbGVzW3VzZXJQcm9maWxlSWRdXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBPYmplY3Qua2V5cyh0aGlzLnByb3BzLlVTRVIucHJvZmlsZXMpLm1hcCgocHJvZmlsZUlkKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucHJvcHMuVVNFUi5wcm9maWxlc1twcm9maWxlSWRdLmlzRGVmYXVsdFVzZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRVc2VyID0gdGhpcy5wcm9wcy5VU0VSLnByb2ZpbGVzW3Byb2ZpbGVJZF1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ1c2VyUHJvZmlsZVwiPlxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRVc2VyID8gPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxQcm9maWxlU2xpZGVyIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb2ZpbGVzPXt0aGlzLnByb3BzLlVTRVIucHJvZmlsZXN9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3ViUm91dGU9XCJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxQcm9maWxlRGF0YSBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9maWxlRGF0YT17c2VsZWN0ZWRVc2VyfVxuICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+IDogXCJcIlxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IFVzZXJQcm9maWxlVmlld1xuIiwiaW1wb3J0IFVzZXJQcm9maWxlVmlldyBmcm9tICcuL1VzZXJQcm9maWxlVmlldy5qcydcblxuZXhwb3J0IGRlZmF1bHQgVXNlclByb2ZpbGVWaWV3IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuY2xhc3MgUHJvZmlsZURhdGEgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgIH1cblxuICAgIG9wZW5BcHBvaW50bWVudHMocHJvZmlsZUlkKSB7XG4gICAgICAgIHRoaXMuY29udGV4dC5yb3V0ZXIuaGlzdG9yeS5wdXNoKGAvdXNlci8ke3Byb2ZpbGVJZH0vYXBwb2ludG1lbnRzYClcblxuICAgIH1cblxuICAgIG9wZW5SZXBvcnRzKHByb2ZpbGVJZCkge1xuICAgICAgICB0aGlzLmNvbnRleHQucm91dGVyLmhpc3RvcnkucHVzaChgL3VzZXIvJHtwcm9maWxlSWR9L3JlcG9ydHNgKVxuXG4gICAgfVxuXG4gICAgc3RhdGljIGNvbnRleHRUeXBlcyA9IHtcbiAgICAgICAgcm91dGVyOiAoKSA9PiBudWxsXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIGxldCB7bmFtZSwgZ2VuZGVyLCBhZ2UsIG1vYmlsZSwgbWVkaWNhbEhpc3RvcnlDb3VudCwgbWVkaWNhbFRlc3RDb3VudCwgb25saW5lQ29uc3VsdGF0aW9uQ291bnQsIG9wZFZpc2l0Q291bnQsIHByb2ZpbGVJZH0gPSB0aGlzLnByb3BzLnByb2ZpbGVEYXRhXG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXY+ICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidXNlckRlYWlsXCI+XG4gICAgICAgICAgICAgICAgICAgIDxwPntuYW1lfTwvcD5cbiAgICAgICAgICAgICAgICAgICAgPHA+e2FnZX0gWWVhcnM8L3A+XG4gICAgICAgICAgICAgICAgICAgIDxwPntnZW5kZXJ9PC9wPlxuICAgICAgICAgICAgICAgICAgICA8cD57bW9iaWxlfTwvcD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInByb2ZpbGVCdG5zXCI+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24+UHJvZmlsZSBOb3QgVmVyaWZpZWQ8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbj5ObyBPUEQgSW5zdXJhbmNlPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24+T25saW5lIENvbnN1bHRhdGlvbnMoe29ubGluZUNvbnN1bHRhdGlvbkNvdW50fSk8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXt0aGlzLm9wZW5BcHBvaW50bWVudHMuYmluZCh0aGlzLHByb2ZpbGVJZCl9Pk9QRCBWaXNpdHMgKHtvcGRWaXNpdENvdW50fSk8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbj5NZWRpY2FsIEhpc3RvcnkgKHttZWRpY2FsSGlzdG9yeUNvdW50fSk8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXt0aGlzLm9wZW5SZXBvcnRzLmJpbmQodGhpcyxwcm9maWxlSWQpfT5UZXN0IFJlcG9ydHMgKHttZWRpY2FsVGVzdENvdW50fSk8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBQcm9maWxlRGF0YVxuIiwiaW1wb3J0IFByb2ZpbGVEYXRhIGZyb20gJy4vUHJvZmlsZURhdGEuanMnXG5cbmV4cG9ydCBkZWZhdWx0IFByb2ZpbGVEYXRhIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IFByb2ZpbGVTbGlkZXIgZnJvbSAnLi4vcHJvZmlsZVNsaWRlci9pbmRleC5qcydcbmltcG9ydCBSZXBvcnRMaXN0IGZyb20gJy4vcmVwb3J0TGlzdC9pbmRleC5qcydcblxuY2xhc3MgVXNlclJlcG9ydHNWaWV3IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcblxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIHRoaXMucHJvcHMuZ2V0VXNlclByb2ZpbGVXaXRoVGVzdHMoKVxuICAgIH1cblxuICAgIHN0YXRpYyBjb250ZXh0VHlwZXMgPSB7XG4gICAgICAgIHJvdXRlcjogKCkgPT4gbnVsbFxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICBsZXQgc2VsZWN0ZWRVc2VyID0gbnVsbFxuICAgICAgICBsZXQgdXNlclByb2ZpbGVJZCA9IHRoaXMucHJvcHMubWF0Y2gucGFyYW1zLmlkXG5cbiAgICAgICAgaWYgKHRoaXMucHJvcHMuVVNFUi5wcm9maWxlc1t1c2VyUHJvZmlsZUlkXSkge1xuICAgICAgICAgICAgc2VsZWN0ZWRVc2VyID0gdGhpcy5wcm9wcy5VU0VSLnByb2ZpbGVzW3VzZXJQcm9maWxlSWRdXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBzZWxlY3RpbmcgZGVmYXVsdCB1c2VyXG4gICAgICAgICAgICBPYmplY3Qua2V5cyh0aGlzLnByb3BzLlVTRVIucHJvZmlsZXMpLm1hcCgocHJvZmlsZUlkKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucHJvcHMuVVNFUi5wcm9maWxlc1twcm9maWxlSWRdLmlzRGVmYXVsdFVzZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRVc2VyID0gdGhpcy5wcm9wcy5VU0VSLnByb2ZpbGVzW3Byb2ZpbGVJZF1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidXNlclByb2ZpbGVcIj5cbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIChzZWxlY3RlZFVzZXIgJiYgc2VsZWN0ZWRVc2VyLnRlc3RzKSA/IDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8UHJvZmlsZVNsaWRlclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb2ZpbGVzPXt0aGlzLnByb3BzLlVTRVIucHJvZmlsZXN9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3ViUm91dGU9XCIvcmVwb3J0c1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidXBjb21pbmdhcHBcIj5SZXBvcnRzPC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkVXNlci50ZXN0cy5tYXAoKHRlc3QsIGkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDxSZXBvcnRMaXN0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhPXt0ZXN0fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5PXtpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+IDogXCJcIlxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IFVzZXJSZXBvcnRzVmlld1xuIiwiaW1wb3J0IFVzZXJSZXBvcnRzVmlldyBmcm9tICcuL1VzZXJSZXBvcnRzVmlldy5qcydcblxuZXhwb3J0IGRlZmF1bHQgVXNlclJlcG9ydHNWaWV3IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuY2xhc3MgUmVwb3J0TGlzdCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgfVxuXG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgbGV0IHsgbmFtZSwgc3ViX25hbWUsIGFiYnJldmlhdGlvbiwgY2F0ZWdvcnksIHNsb3QgIH0gPSB0aGlzLnByb3BzLmRhdGFcbiAgICAgICAgc2xvdCA9IHNsb3QgfHwge1xuICAgICAgICAgICAgc3RhcnQ6IDAsXG4gICAgICAgICAgICBlbmQ6IDBcbiAgICAgICAgfVxuICAgICAgICBsZXQgZGF0ZSA9IG5ldyBEYXRlKHNsb3Quc3RhcnQpLnRvRGF0ZVN0cmluZygpXG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYXBwb2ludG1lbnRcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImRldGFpbHNcIj5cbiAgICAgICAgICAgICAgICAgICAgPHA+XG4gICAgICAgICAgICAgICAgICAgICAgICB7bmFtZSArIFwiICwgXCIgKyBzdWJfbmFtZX1cbiAgICAgICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtjYXRlZ29yeSArIFwiICwgXCIgKyBhYmJyZXZpYXRpb259XG4gICAgICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICAgICAgPHA+XG4gICAgICAgICAgICAgICAgICAgICAgICB7ZGF0ZX1cbiAgICAgICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYm9va1wiPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ2aWV3cmVwb3J0XCI+VmlldyBSZXBvcnQ8L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgUmVwb3J0TGlzdFxuIiwiaW1wb3J0IFJlcG9ydExpc3QgZnJvbSAnLi9SZXBvcnRMaXN0LmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBSZXBvcnRMaXN0IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuY2xhc3MgVXNlclNpZ251cFZpZXcgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgYXBwb2lubWVudEZvcjogJ3NlbGYnLFxuICAgICAgICAgICAgcGF0aWVudE5hbWU6ICcnLFxuICAgICAgICAgICAgYWdlOiAnJyxcbiAgICAgICAgICAgIGdlbmRlcjogJ20nLFxuICAgICAgICAgICAgZW1haWw6ICcnLFxuICAgICAgICAgICAgcGhvbmVOdW1iZXI6ICcnXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpbnB1dEhhbmRsZXIoZSkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHsgW2UudGFyZ2V0Lm5hbWVdOiBlLnRhcmdldC52YWx1ZSB9KVxuICAgIH1cblxuICAgIHN1Ym1pdEZvcm0oKSB7XG5cbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgPGhlYWRlciBjbGFzc05hbWU9XCJza2luLXdoaXRlIGZpeGVkIGhvcml6b250YWwgdG9wIGJkci0xIGJvdHRvbSBsaWdodFwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lci1mbHVpZFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC0yXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx1bCBjbGFzc05hbWU9XCJpbmxpbmUtbGlzdFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpPjxzcGFuIGNsYXNzTmFtZT1cImljb24gaWNvbi1zbSB0ZXh0LW1pZGRsZSBiYWNrLWljb24td2hpdGVcIj48aW1nIHNyYz1cIi9hc3NldHMvaW1nL2N1c3RvbWVyLWljb25zL2JhY2staWNvbi5wbmdcIiBjbGFzc05hbWU9XCJpbWctZmx1aWRcIiAvPjwvc3Bhbj48L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLThcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJoZWFkZXItdGl0bGUgZnctNzAwIGNhcGl0YWxpemUgdGV4dC1jZW50ZXJcIj5BZGQgVXNlciBQcm9maWxlPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtMlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvaGVhZGVyPlxuXG4gICAgICAgICAgICAgICAgPHNlY3Rpb24gY2xhc3NOYW1lPVwid3JhcCB2YWxpZGF0aW9uLWJvb2stc2NyZWVuXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwid2lkZ2V0IG5vLXJvdW5kIG5vLXNoYWRvd1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3aWRnZXQtaGVhZGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGg0IGNsYXNzTmFtZT1cIndpZGdldC10aXRsZVwiPkNvbnRhY3QgRGV0YWlsczwvaDQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwid2lkZ2V0LWNvbnRlbnRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Zm9ybSBjbGFzc05hbWU9XCJnby1ib3R0b21cIiA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cCBpbnB1dC1ncm91cFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImlubGluZSBpbnB1dC1sYWJlbFwiPkFwcG9pbnRtZW50IGZvcjwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNob29zZS1nZW5kZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwicmFkaW8taW5saW5lXCI+PGlucHV0IHZhbHVlPXsnc2VsZid9IG9uQ2hhbmdlPXt0aGlzLmlucHV0SGFuZGxlci5iaW5kKHRoaXMpfSBjaGVja2VkPXt0aGlzLnN0YXRlLmFwcG9pbm1lbnRGb3IgPT0gJ3NlbGYnfSB0eXBlPVwicmFkaW9cIiBuYW1lPVwiYXBwb2lubWVudEZvclwiIC8+U2VsZjwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cInJhZGlvLWlubGluZVwiPjxpbnB1dCB2YWx1ZT17J2Vsc2UnfSBvbkNoYW5nZT17dGhpcy5pbnB1dEhhbmRsZXIuYmluZCh0aGlzKX0gY2hlY2tlZD17dGhpcy5zdGF0ZS5hcHBvaW5tZW50Rm9yID09ICdlbHNlJ30gdHlwZT1cInJhZGlvXCIgbmFtZT1cImFwcG9pbm1lbnRGb3JcIiAvPlNvbWVvbmUgZWxzZTwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibGFiZWxXcmFwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgaWQ9XCJmbmFtZVwiIG5hbWU9XCJwYXRpZW50TmFtZVwiIHR5cGU9XCJ0ZXh0XCIgdmFsdWU9e3RoaXMuc3RhdGUucGF0aWVudE5hbWV9IG9uQ2hhbmdlPXt0aGlzLmlucHV0SGFuZGxlci5iaW5kKHRoaXMpfSByZXF1aXJlZCAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGh0bWxGb3I9XCJmbmFtZVwiPlBhdGllbnQgTmFtZTwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXhzIHRleHQtbGlnaHRcIj4oQXBwb2lubWVudCB2YWxpZCBvbmx5IGZvciB0aGUgcHJvdmlkZWQgbmFtZSk8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxhYmVsV3JhcFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IGlkPVwiYWdlXCIgbmFtZT1cImFnZVwiIHR5cGU9XCJ0ZXh0XCIgdmFsdWU9e3RoaXMuc3RhdGUuYWdlfSBvbkNoYW5nZT17dGhpcy5pbnB1dEhhbmRsZXIuYmluZCh0aGlzKX0gcmVxdWlyZWQgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBodG1sRm9yPVwiYWdlXCI+QWdlPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cCBpbnB1dC1ncm91cFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImlubGluZSBpbnB1dC1sYWJlbFwiPkdlbmRlcjwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNob29zZS1nZW5kZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwicmFkaW8taW5saW5lXCI+PGlucHV0IHZhbHVlPXsnbSd9IG9uQ2hhbmdlPXt0aGlzLmlucHV0SGFuZGxlci5iaW5kKHRoaXMpfSBjaGVja2VkPXt0aGlzLnN0YXRlLmdlbmRlciA9PSAnbSd9IHR5cGU9XCJyYWRpb1wiIG5hbWU9XCJnZW5kZXJcIiAvPk1hbGU8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJyYWRpby1pbmxpbmVcIj48aW5wdXQgdmFsdWU9eydmJ30gb25DaGFuZ2U9e3RoaXMuaW5wdXRIYW5kbGVyLmJpbmQodGhpcyl9IGNoZWNrZWQ9e3RoaXMuc3RhdGUuZ2VuZGVyID09ICdmJ30gdHlwZT1cInJhZGlvXCIgbmFtZT1cImdlbmRlclwiIC8+RmVtYWxlPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwicmFkaW8taW5saW5lXCI+PGlucHV0IHZhbHVlPXsnbyd9IG9uQ2hhbmdlPXt0aGlzLmlucHV0SGFuZGxlci5iaW5kKHRoaXMpfSBjaGVja2VkPXt0aGlzLnN0YXRlLmdlbmRlciA9PSAnbyd9IHR5cGU9XCJyYWRpb1wiIG5hbWU9XCJnZW5kZXJcIiAvPk90aGVyPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsYWJlbFdyYXBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCBpZD1cImVtYWlsXCIgbmFtZT1cImVtYWlsXCIgdHlwZT1cInRleHRcIiB2YWx1ZT17dGhpcy5zdGF0ZS5lbWFpbH0gb25DaGFuZ2U9e3RoaXMuaW5wdXRIYW5kbGVyLmJpbmQodGhpcyl9IHJlcXVpcmVkIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgaHRtbEZvcj1cImVtYWlsXCI+RW1haWw8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsYWJlbFdyYXBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCBpZD1cIm51bWJlclwiIG5hbWU9XCJwaG9uZU51bWJlclwiIHR5cGU9XCJ0ZXh0XCIgdmFsdWU9e3RoaXMuc3RhdGUucGhvbmVOdW1iZXJ9IG9uQ2hhbmdlPXt0aGlzLmlucHV0SGFuZGxlci5iaW5kKHRoaXMpfSByZXF1aXJlZCAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGh0bWxGb3I9XCJudW1iZXJcIj5Nb2JpbGUgTnVtYmVyPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9mb3JtPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvc2VjdGlvbj5cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cInYtYnRuIHYtYnRuLXByaW1hcnkgYnRuLWxnIGZpeGVkIGhvcml6b250YWwgYm90dG9tIG5vLXJvdW5kIGJ0bi1sZyB0ZXh0LWxnXCIgb25DbGljaz17dGhpcy5zdWJtaXRGb3JtLmJpbmQodGhpcyl9PkNvbnRpbnVlPC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgVXNlclNpZ251cFZpZXdcbiIsImltcG9ydCBVc2VyU2lnbnVwVmlldyBmcm9tICcuL1VzZXJTaWdudXAnXG5cbmV4cG9ydCBkZWZhdWx0IFVzZXJTaWdudXBWaWV3IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCdcblxuaW1wb3J0IExvYWRlciBmcm9tICcuLi8uLi9jb21tb25zL0xvYWRlcidcbmltcG9ydCBWaXNpdFRpbWUgZnJvbSAnLi92aXNpdFRpbWUnXG5pbXBvcnQgUGlja3VwQWRkcmVzcyBmcm9tICcuL3BpY2t1cEFkZHJlc3MnXG5pbXBvcnQgQ2hvb3NlUGF0aWVudCBmcm9tICcuL2Nob29zZVBhdGllbnQnXG5cbmNsYXNzIEJvb2tpbmdTdW1tYXJ5VmlldyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgICBzZWxlY3RlZExhYjogdGhpcy5wcm9wcy5tYXRjaC5wYXJhbXMuaWQsXG4gICAgICAgICAgICBwaWNrdXBUeXBlOiBcImxhYlwiXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgdGhpcy5wcm9wcy5nZXRMYWJCeUlkKHRoaXMuc3RhdGUuc2VsZWN0ZWRMYWIpXG4gICAgfVxuXG4gICAgb3BlblRlc3RzKCkge1xuICAgICAgICB0aGlzLnByb3BzLmhpc3RvcnkucHVzaChgL2xhYi8ke3RoaXMuc3RhdGUuc2VsZWN0ZWRMYWJ9L3Rlc3RzYClcbiAgICB9XG5cbiAgICBoYW5kbGVQaWNrdXBUeXBlKGUpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHBpY2t1cFR5cGU6IGUudGFyZ2V0LnZhbHVlIH0pXG4gICAgfVxuXG4gICAgZ2V0U2VsZWN0b3JzKCkge1xuICAgICAgICBzd2l0Y2ggKHRoaXMuc3RhdGUucGlja3VwVHlwZSkge1xuICAgICAgICAgICAgY2FzZSBcImxhYlwiOiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgIDxWaXNpdFRpbWUgdHlwZT1cImxhYlwiLz5cbiAgICAgICAgICAgICAgICAgICAgPENob29zZVBhdGllbnQgLz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY2FzZSBcImhvbWVcIjoge1xuICAgICAgICAgICAgICAgIHJldHVybiA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICA8VmlzaXRUaW1lIHR5cGU9XCJob21lXCIvPlxuICAgICAgICAgICAgICAgICAgICA8Q2hvb3NlUGF0aWVudCAvPlxuICAgICAgICAgICAgICAgICAgICA8UGlja3VwQWRkcmVzcyAvPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgbGV0IHRlc3RzID0gW11cbiAgICAgICAgbGV0IGZpbmFsUHJpY2UgPSAwXG4gICAgICAgIGxldCBsYWJEZXRhaWwgPSB7fVxuXG4gICAgICAgIGlmICh0aGlzLnByb3BzLkxBQlNbdGhpcy5zdGF0ZS5zZWxlY3RlZExhYl0pIHtcbiAgICAgICAgICAgIGxhYkRldGFpbCA9IHRoaXMucHJvcHMuTEFCU1t0aGlzLnN0YXRlLnNlbGVjdGVkTGFiXS5sYWJcbiAgICAgICAgICAgIHRlc3RzID0gdGhpcy5wcm9wcy5zZWxlY3RlZENyaXRlcmlhcy5maWx0ZXIoeCA9PiB4LnR5cGUgPT0gJ3Rlc3QnKS5tYXAoKHRlc3QsIGkpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgcHJpY2UgPSAwXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5MQUJTW3RoaXMuc3RhdGUuc2VsZWN0ZWRMYWJdLnRlc3RzLm1hcCgodHdwKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0d3AudGVzdF9pZCA9PSB0ZXN0LmlkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwcmljZSA9IHR3cC5tcnBcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgZmluYWxQcmljZSArPSBwcmljZVxuICAgICAgICAgICAgICAgIHJldHVybiA8cCBrZXk9e2l9IGNsYXNzTmFtZT1cInRlc3QtbGlzdFwiPnt0ZXN0Lm5hbWV9PHNwYW4gY2xhc3NOYW1lPVwiZmxvYXQtcmlnaHQgZnctNzAwXCI+UnMuIHtwcmljZX08L3NwYW4+PC9wPlxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIDxoZWFkZXIgY2xhc3NOYW1lPVwic2tpbi13aGl0ZSBmaXhlZCBob3Jpem9udGFsIHRvcCBiZHItMSBib3R0b20gbGlnaHRcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250YWluZXItZmx1aWRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtMlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dWwgY2xhc3NOYW1lPVwiaW5saW5lLWxpc3RcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaSBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5oaXN0b3J5LmdvKC0xKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfX0+PHNwYW4gY2xhc3NOYW1lPVwiaWNvbiBpY29uLXNtIHRleHQtbWlkZGxlIGJhY2staWNvbi13aGl0ZVwiPjxpbWcgc3JjPVwiL2Fzc2V0cy9pbWcvY3VzdG9tZXItaWNvbnMvYmFjay1pY29uLnBuZ1wiIGNsYXNzTmFtZT1cImltZy1mbHVpZFwiIC8+PC9zcGFuPjwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtOFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImhlYWRlci10aXRsZSBmdy03MDAgY2FwaXRhbGl6ZSB0ZXh0LWNlbnRlclwiPkJvb2tpbmcgQ29uZmlybWF0aW9uPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtMlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7LyogPHVsIGNsYXNzPVwiaW5saW5lLWxpc3QgZmxvYXQtcmlnaHQgdXNlci1ub3RpZmljYXRpb24tYWN0aW9uXCI+XG5cdFx0XHRcdFx0XHQ8bGk+PHNwYW4gY2xhc3M9XCJpY29uIGljb24tbWQgdGV4dC1taWRkbGVcIj48aW1nIHNyYz1cIi9hc3NldHMvaW1nL2N1c3RvbWVyLWljb25zL3VzZXIuc3ZnXCIgY2xhc3M9XCJpbWctZmx1aWRcIj48L3NwYW4+PC9saT5cblx0XHRcdFx0XHRcdDxsaT48c3BhbiBjbGFzcz1cImljb24gaWNvbi1tZCB0ZXh0LW1pZGRsZSBub3RpZmljYXRpb24taWNvblwiPjxpbWcgc3JjPVwiL2Fzc2V0cy9pbWcvY3VzdG9tZXItaWNvbnMvbm90aWZpY2F0aW9uLnN2Z1wiIGNsYXNzPVwiaW1nLWZsdWlkXCI+IDxzcGFuIGNsYXNzPVwibm90aWZpY2F0aW9uLWFsZXJ0XCI+PC9zcGFuPjwvc3Bhbj48L2xpPlxuXHRcdFx0XHRcdDwvdWw+ICovfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvaGVhZGVyPlxuXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnByb3BzLkxBQlNbdGhpcy5zdGF0ZS5zZWxlY3RlZExhYl0gP1xuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c2VjdGlvbiBjbGFzc05hbWU9XCJ3cmFwIGJvb2tpbmctY29uZmlybS1zY3JlZW5cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250YWluZXItZmx1aWRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtMTJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3aWRnZXQgbXJ0LTEwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIndpZGdldC1oZWFkZXIgYmRyLTEgYm90dG9tIGxpZ2h0IHRleHQtY2VudGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHVsIGNsYXNzTmFtZT1cImlubGluZS1saXN0IGJvb2tpbmctdHlwZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGk+PGxhYmVsIGNsYXNzTmFtZT1cInJhZGlvLWlubGluZSB0ZXh0LW1kIGZ3LTcwMCB0ZXh0LXByaW1hcnlcIj48aW5wdXQgdHlwZT1cInJhZGlvXCIgbmFtZT1cIm9wdHJhZGlvXCIgb25DaGFuZ2U9e3RoaXMuaGFuZGxlUGlja3VwVHlwZS5iaW5kKHRoaXMpfSB2YWx1ZT1cImhvbWVcIiBjaGVja2VkPXt0aGlzLnN0YXRlLnBpY2t1cFR5cGUgPT0gJ2hvbWUnfSAvPiBIb21lIFBpY2stdXA8L2xhYmVsPjwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaT48bGFiZWwgY2xhc3NOYW1lPVwicmFkaW8taW5saW5lIHRleHQtbWQgZnctNzAwIHRleHQtcHJpbWFyeVwiPjxpbnB1dCB0eXBlPVwicmFkaW9cIiBuYW1lPVwib3B0cmFkaW9cIiBvbkNoYW5nZT17dGhpcy5oYW5kbGVQaWNrdXBUeXBlLmJpbmQodGhpcyl9IHZhbHVlPVwibGFiXCIgY2hlY2tlZD17dGhpcy5zdGF0ZS5waWNrdXBUeXBlID09ICdsYWInfSAvPiBMYWIgVmlzaXQ8L2xhYmVsPjwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3aWRnZXQtY29udGVudFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibGFiLWRldGFpbHNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGltZyBzcmM9XCIvYXNzZXRzL2ltZy9jdXN0b21lci1pY29ucy9sYWIxLnBuZ1wiIGNsYXNzTmFtZT1cImltZy1mbHVpZFwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibGFiLXRpdGxlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDQgY2xhc3NOYW1lPVwiZnctNzAwIHRleHQtbWQgdGl0bGVcIj57bGFiRGV0YWlsLm5hbWV9PC9oND5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cImZ3LTUwMCB0ZXh0LXNtIHRleHQtbGlnaHRcIj57bGFiRGV0YWlsLmFkZHJlc3N9PC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt0aGlzLmdldFNlbGVjdG9ycygpfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsYWItdmlzaXQtdGltZSB0ZXN0LXJlcG9ydFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDQgY2xhc3NOYW1lPVwidGl0bGVcIj48c3Bhbj48aW1nIHNyYz1cIi9hc3NldHMvaW1nL2N1c3RvbWVyLWljb25zL3Rlc3Quc3ZnXCIgLz48L3NwYW4+VGVzdHMgPHNwYW4gY2xhc3NOYW1lPVwiZmxvYXQtcmlnaHRcIj48YSBvbkNsaWNrPXt0aGlzLm9wZW5UZXN0cy5iaW5kKHRoaXMpfSBjbGFzc05hbWU9XCJ0ZXh0LXByaW1hcnkgZnctNzAwIHRleHQtc21cIj5DaGFuZ2UgVGVzdHM8L2E+PC9zcGFuPjwvaDQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt0ZXN0c31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NlY3Rpb24+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cInYtYnRuIHYtYnRuLXByaW1hcnkgYnRuLWxnIGZpeGVkIGhvcml6b250YWwgYm90dG9tIG5vLXJvdW5kIGJ0bi1sZyB0ZXh0LWxnXCI+UHJvY2VlZCB0byBQYXkgUnMuIHtmaW5hbFByaWNlfTwvYnV0dG9uPlxuXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj4gOiA8TG9hZGVyIC8+XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgQm9va2luZ1N1bW1hcnlWaWV3XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5jbGFzcyBDaG9vc2VQYXRpZW50IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcblxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxhYi12aXNpdC10aW1lXCI+XG4gICAgICAgICAgICAgICAgPGg0IGNsYXNzTmFtZT1cInRpdGxlXCI+PHNwYW4+PGltZyBzcmM9XCIvYXNzZXRzL2ltZy9jdXN0b21lci1pY29ucy9jbG9jay5zdmdcIiAvPjwvc3Bhbj5QYXRpZW50IERldGFpbHMgPHNwYW4gY2xhc3NOYW1lPVwiZmxvYXQtcmlnaHRcIj48YSBocmVmPVwiI1wiIGNsYXNzTmFtZT1cInRleHQtcHJpbWFyeSBmdy03MDAgdGV4dC1zbVwiPlBpY2sgUGF0aWVudDwvYT48L3NwYW4+PC9oND5cbiAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJkYXRlLXRpbWVcIj5EdW1teSBVc2VyPC9wPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IENob29zZVBhdGllbnRcbiIsImltcG9ydCBCb29raW5nU3VtbWFyeVZpZXcgZnJvbSAnLi9Cb29raW5nU3VtbWFyeVZpZXcuanMnXG5cbmV4cG9ydCBkZWZhdWx0IEJvb2tpbmdTdW1tYXJ5VmlldyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmNsYXNzIFBpY2t1cEFkZHJlc3MgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgICAgICB0aGlzLnN0YXRlID0ge1xuXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibGFiLXZpc2l0LXRpbWVcIj5cbiAgICAgICAgICAgICAgICA8aDQgY2xhc3NOYW1lPVwidGl0bGVcIj48c3Bhbj48aW1nIHNyYz1cIi9hc3NldHMvaW1nL2N1c3RvbWVyLWljb25zL2Nsb2NrLnN2Z1wiIC8+PC9zcGFuPlBpY2t1cCBBZGRyZXNzIDxzcGFuIGNsYXNzTmFtZT1cImZsb2F0LXJpZ2h0XCI+PGEgaHJlZj1cIiNcIiBjbGFzc05hbWU9XCJ0ZXh0LXByaW1hcnkgZnctNzAwIHRleHQtc21cIj5DaGFuZ2UgQWRkcmVzczwvYT48L3NwYW4+PC9oND5cbiAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJkYXRlLXRpbWVcIj4xOHRoIEFwcmlsIHwgMzozMCBQTTwvcD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBQaWNrdXBBZGRyZXNzXG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5jbGFzcyBWaXNpdFRpbWUgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgICAgICB0aGlzLnN0YXRlID0ge1xuXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibGFiLXZpc2l0LXRpbWVcIj5cbiAgICAgICAgICAgICAgICA8aDQgY2xhc3NOYW1lPVwidGl0bGVcIj48c3Bhbj48aW1nIHNyYz1cIi9hc3NldHMvaW1nL2N1c3RvbWVyLWljb25zL2Nsb2NrLnN2Z1wiIC8+PC9zcGFuPlZpc2l0IHRpbWUgPHNwYW4gY2xhc3NOYW1lPVwiZmxvYXQtcmlnaHRcIj48YSBocmVmPVwiI1wiIGNsYXNzTmFtZT1cInRleHQtcHJpbWFyeSBmdy03MDAgdGV4dC1zbVwiPkNoYW5nZSBUaW1lPC9hPjwvc3Bhbj48L2g0PlxuICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cImRhdGUtdGltZVwiPjE4dGggQXByaWwgfCAzOjMwIFBNPC9wPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IFZpc2l0VGltZVxuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cbmltcG9ydCBMYWJUZXN0cyBmcm9tICcuLi9sYWJUZXN0cydcblxuY2xhc3MgTGFiRGV0YWlscyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxzZWN0aW9uIGNsYXNzTmFtZT1cIndyYXAgcHJvZmlsZS1ib29rLXNjcmVlblwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGFpbmVyLWZsdWlkXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC0xMlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwid2lkZ2V0IHByb2ZpbGUtYm9va1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIndpZGdldC1oZWFkZXIgcGItaGVhZGVyIHRleHQtY2VudGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBiLWxvZ29cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW1nIHNyYz1cIi9hc3NldHMvaW1nL2N1c3RvbWVyLWljb25zL2xhYjEucG5nXCIgY2xhc3NOYW1lPVwiaW1nLWZsdWlkXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGg0IGNsYXNzTmFtZT1cIndpZGdldC10aXRsZSBwYi10aXRsZVwiPlNSTCBEaWdub3N0aWNzPC9oND5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cImxvY2F0aW9uXCI+U2VjdG9yIDUyIEd1cmdhb24gfCA8c3BhbiBjbGFzc05hbWU9XCJjdC1pbWcgY3QtaW1nLXhzXCI+PGltZyBzcmM9XCIvYXNzZXRzL2ltZy9jdXN0b21lci1pY29ucy9tYXAtbWFya2VyLnN2Z1wiIGNsYXNzTmFtZT1cImltZy1mbHVpZFwiIC8+PC9zcGFuPjEuNUtNPC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHVsIGNsYXNzTmFtZT1cImxpc3QgdGltZS1jb250YWN0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmdy03MDAgdGV4dC1zbVwiPlRpbWluZzogLTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgNzozMCBBTSB0byA4OjMwIFBNXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cIm9wZW4tY2xvc2VcIj5PcGVuIFRvZGF5PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmdy03MDAgdGV4dC1zbVwiPkNvbnRhY3Q6IC08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDAxMjAgMTIzNDU2NywgMDEyMCA3NjU0MzIxXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cIm9wZW4tY2xvc2VcIj5DYWxsIE5vdzwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPExhYlRlc3RzIHsuLi50aGlzLnByb3BzfSAvPlxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwid2lkZ2V0LWNvbnRlbnQgcGItZGV0YWlscyBwYi1sb2NhdGlvblwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGg0IGNsYXNzTmFtZT1cIndjLXRpdGxlIHRleHQtbWQgZnctNzAwXCI+TG9jYXRpb248L2g0PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZGRyZXNzLWRldGFpbHNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW1nIHNyYz1cIi9hc3NldHMvaW1nL2N1c3RvbWVyLWljb25zL21hcC1pY29uLnBuZ1wiIGNsYXNzTmFtZT1cImltZy1mbHVpZCBhZGQtbWFwXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJhZGQtaW5mb1wiPjE5NiwgSHVkYSBQbG90LCBOZWFyLCBEZXZpbmRlciBWaWhhciwgU2VjdG9yIDU2LCBHdXJ1Z3JhbSwgSGFyeWFuYSAxMjIwMTE8L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGItdmlldyB0ZXh0LWxlZnRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YSBocmVmPVwiI1wiIGNsYXNzTmFtZT1cImxpbmstdGV4dCB0ZXh0LW1kIGZ3LTcwMFwiPlZpZXcgaW4gR29vZ2xlIE1hcDwvYT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3aWRnZXQtY29udGVudCBwYi1kZXRhaWxzIHBiLWZhY2lsaXR5XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDQgY2xhc3NOYW1lPVwid2MtdGl0bGUgdGV4dC1tZCBmdy03MDBcIj5GYWNpbGl0eTwvaDQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dWwgY2xhc3NOYW1lPVwibGlzdCBwYi1saXN0IGZhY2lsdHktbGlzdFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaT5QYXJraW5nIEF2YWlsYWJsZTwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpPkNhcmQgQWNjZXB0ZWQ8L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaT5FIFJlcG9ydCBBdmFpbGFibGU8L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaT5Ib21lIENoZWt1cCBBdmFpbGFibGU8L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwid2lkZ2V0LWNvbnRlbnQgcGItZGV0YWlscyBwYi1hYm91dFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGg0IGNsYXNzTmFtZT1cIndjLXRpdGxlIHRleHQtbWQgZnctNzAwXCI+QWJvdXQ8L2g0PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHA+TG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFtZXQsIGNvbnNlY3RldHVyIGFkaXBpc2ljaW5nIGVsaXQsIHNlZCBkbyBlaXVzbW9kXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBvciBpbmNpZGlkdW50IHV0IGxhYm9yZSBldCBkb2xvcmUgbWFnbmEgYWxpcXVhLiBVdCBlbmltIGFkIG1pbmltIHZlbmlhbSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHF1aXMgbm9zdHJ1ZCBleGVyY2l0YXRpb24gdWxsYW1jbyBsYWJvcmlzIG5pc2lcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L3NlY3Rpb24+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IExhYkRldGFpbHNcbiIsImltcG9ydCBMYWJEZXRhaWxzIGZyb20gJy4vTGFiRGV0YWlsLmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBMYWJEZXRhaWxzIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuY2xhc3MgTGFiUHJvZmlsZUNhcmQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgIH1cblxuICAgIG9wZW5MYWIoaWQpe1xuICAgICAgICB0aGlzLnByb3BzLmhpc3RvcnkucHVzaChgL2xhYi8ke2lkfWApXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIGxldCB7IHByaWNlLCBsYWIgfSA9IHRoaXMucHJvcHMuZGV0YWlsc1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIndpZGdldCBjYXJkXCIgb25DbGljaz17dGhpcy5vcGVuTGFiLmJpbmQodGhpcyx0aGlzLnByb3BzLmRldGFpbHMubGFiLmlkKX0+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3aWRnZXQtY29udGVudCBjYXJkLWNvbnRlbnQgYm9vay1jYXJkXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibG9nby1yYXR0aW5nXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJjdC1pbWcgbGFiLWljb25cIj48aW1nIHNyYz1cIi9hc3NldHMvaW1nL2N1c3RvbWVyLWljb25zL2xhYjEucG5nXCIgY2xhc3NOYW1lPVwiaW1nLWZsdWlkXCIgLz48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dWwgY2xhc3NOYW1lPVwiaW5saW5lLWxpc3QgcmF0dGluZ1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaT48c3BhbiBjbGFzc05hbWU9XCJjdC1pbWcgY3QtaW1nLXhzIHN0YXItaWNvblwiPjxpbWcgc3JjPVwiL2Fzc2V0cy9pbWcvY3VzdG9tZXItaWNvbnMvc3Rhci5zdmdcIiBjbGFzc05hbWU9XCJpbWctZmx1aWRcIiAvPjwvc3Bhbj48L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaT48c3BhbiBjbGFzc05hbWU9XCJjdC1pbWcgY3QtaW1nLXhzIHN0YXItaWNvblwiPjxpbWcgc3JjPVwiL2Fzc2V0cy9pbWcvY3VzdG9tZXItaWNvbnMvc3Rhci5zdmdcIiBjbGFzc05hbWU9XCJpbWctZmx1aWRcIiAvPjwvc3Bhbj48L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaT48c3BhbiBjbGFzc05hbWU9XCJjdC1pbWcgY3QtaW1nLXhzIHN0YXItaWNvblwiPjxpbWcgc3JjPVwiL2Fzc2V0cy9pbWcvY3VzdG9tZXItaWNvbnMvc3Rhci5zdmdcIiBjbGFzc05hbWU9XCJpbWctZmx1aWRcIiAvPjwvc3Bhbj48L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaT48c3BhbiBjbGFzc05hbWU9XCJjdC1pbWcgY3QtaW1nLXhzIHN0YXItaWNvblwiPjxpbWcgc3JjPVwiL2Fzc2V0cy9pbWcvY3VzdG9tZXItaWNvbnMvc3Rhci5zdmdcIiBjbGFzc05hbWU9XCJpbWctZmx1aWRcIiAvPjwvc3Bhbj48L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaT48c3BhbiBjbGFzc05hbWU9XCJjdC1pbWcgY3QtaW1nLXhzIHN0YXItaWNvblwiPjxpbWcgc3JjPVwiL2Fzc2V0cy9pbWcvY3VzdG9tZXItaWNvbnMvaGFsZi1zdGFyLnN2Z1wiIGNsYXNzTmFtZT1cImltZy1mbHVpZFwiIC8+PC9zcGFuPjwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJ2LWJ0biB2LWJ0bi1wcmltYXJ5IHBpY2t1cC1idG5cIj5QaWNrdXAgQXZhaWxhYmxlPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJvb2stY2FyZC1jb250ZW50XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aDQgY2xhc3NOYW1lPVwiYm9vay1jYXJ0LXRpdGxlXCI+e2xhYi5uYW1lfTwvaDQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJkZXNjXCI+Qmxvb2QgVGVzdCwgUGF0aG9sb2d5IFVsdHJhc291bmQsIE1SSSwgQ1RJIFNlY3RvciA1MiBHdXJnYW9uIHwgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1wcmltYXJ5IGZ3LTcwMFwiPjEuNSBLTTwvc3Bhbj48L3A+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwid2lkZ2V0LWZvb3RlciBjYXJkLWZvb3RlclwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtNlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cImxhYi1wcmljZVwiPlRvdGFsIFJzIHtwcmljZX08L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLTYgdGV4dC1yaWdodFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwidi1idG4gdi1idG4tcHJpbWFyeSBidG4tbWRcIj5Cb29rIExhYjwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IExhYlByb2ZpbGVDYXJkXG4iLCJpbXBvcnQgTGFiUHJvZmlsZUNhcmQgZnJvbSAnLi9MYWJQcm9maWxlQ2FyZC5qcydcblxuZXhwb3J0IGRlZmF1bHQgTGFiUHJvZmlsZUNhcmQiLCJpbXBvcnQgTGFiVGVzdHMgZnJvbSAnLi9sYWJUZXN0cydcblxuZXhwb3J0IGRlZmF1bHQgTGFiVGVzdHMiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcblxuY2xhc3MgTGFiVGVzdHMgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgfVxuXG4gICAgb3BlblRlc3RzKCkge1xuICAgICAgICB0aGlzLnByb3BzLmhpc3RvcnkucHVzaChgL2xhYi8ke3RoaXMucHJvcHMuZGF0YS5sYWIuaWR9L3Rlc3RzYClcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgbGV0IHRlc3RzID0gW11cbiAgICAgICAgaWYgKHRoaXMucHJvcHMuZGF0YS50ZXN0cyAmJiB0aGlzLnByb3BzLmRhdGEudGVzdHMubGVuZ3RoKSB7XG4gICAgICAgICAgICB0ZXN0cyA9IHRoaXMucHJvcHMuZGF0YS50ZXN0cy5tYXAoKHRlc3QsIGkpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gPGxpIGtleT17aX0+e3Rlc3QudGVzdC5uYW1lfSA8c3BhbiBjbGFzc05hbWU9XCJ0ZXN0LXByaWNlXCI+UnMge3Rlc3QubXJwfTwvc3Bhbj48L2xpPlxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIndpZGdldC1jb250ZW50IHBiLWRldGFpbHMgcGItdGVzdFwiPlxuICAgICAgICAgICAgICAgIDxoNCBjbGFzc05hbWU9XCJ3Yy10aXRsZSB0ZXh0LW1kIGZ3LTcwMFwiPlRlc3RzICh7dGVzdHMubGVuZ3RofSk8L2g0PlxuICAgICAgICAgICAgICAgIDx1bCBjbGFzc05hbWU9XCJsaXN0IHBiLWxpc3QgcGItdGVzdC1saXN0XCI+XG4gICAgICAgICAgICAgICAgICAgIHt0ZXN0cy5zbGljZSgwLDMpfVxuICAgICAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwYi12aWV3IHRleHQtcmlnaHRcIj5cbiAgICAgICAgICAgICAgICAgICAgPGEgY2xhc3NOYW1lPVwibGluay10ZXh0IHRleHQtbWQgZnctNzAwXCIgb25DbGljaz17dGhpcy5vcGVuVGVzdHMuYmluZCh0aGlzKX0+VmlldyBBbGw8L2E+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgTGFiVGVzdHNcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG5pbXBvcnQgRXhwYW5zaW9uUGFuZWwsIHtcbiAgICBFeHBhbnNpb25QYW5lbFN1bW1hcnksXG4gICAgRXhwYW5zaW9uUGFuZWxEZXRhaWxzLFxufSBmcm9tICdtYXRlcmlhbC11aS9FeHBhbnNpb25QYW5lbCc7XG5pbXBvcnQgRXhwYW5kTW9yZUljb24gZnJvbSAnbWF0ZXJpYWwtdWktaWNvbnMvRXhwYW5kTW9yZSc7XG5cblxuY2xhc3MgT3JkZXJEZXRhaWxzIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcblxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICBsZXQgcHJpY2VfYnJlYWt1cCA9IFtdXG4gICAgICAgIGxldCB0b3RhbFByaWNlID0gMFxuICAgICAgICBsZXQgdG90YWxUZXN0cyA9IDBcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuZGF0YS5wcmljZV9icmVha3VwICYmIHRoaXMucHJvcHMuZGF0YS5wcmljZV9icmVha3VwLmJyZWFrdXApIHtcbiAgICAgICAgICAgIHByaWNlX2JyZWFrdXAgPSB0aGlzLnByb3BzLmRhdGEucHJpY2VfYnJlYWt1cC5icmVha3VwLm1hcCgodGVzdCwgaSkgPT4ge1xuICAgICAgICAgICAgICAgIHRvdGFsUHJpY2UgKz0gdGVzdC5hbW91bnRcbiAgICAgICAgICAgICAgICB0b3RhbFRlc3RzKytcbiAgICAgICAgICAgICAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9XCJ0ZXN0UHJpY2VSb3dcIiBrZXk9e2l9PlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0bmFtZVwiPnt0ZXN0Lm5hbWV9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0YW1vdW50XCI+UnMuIHt0ZXN0LmFtb3VudH08L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwib3JkZXJEZXRhaWxzXCI+XG4gICAgICAgICAgICAgICAgPEV4cGFuc2lvblBhbmVsPlxuICAgICAgICAgICAgICAgICAgICA8RXhwYW5zaW9uUGFuZWxTdW1tYXJ5IGV4cGFuZEljb249ezxFeHBhbmRNb3JlSWNvbiAvPn0+XG4gICAgICAgICAgICAgICAgICAgICAgICBPcmRlciBEZXRhaWxzIC0ge3RvdGFsVGVzdHN9IFRlc3RzXG4gICAgICAgICAgICAgICAgICAgIDwvRXhwYW5zaW9uUGFuZWxTdW1tYXJ5PlxuICAgICAgICAgICAgICAgICAgICA8RXhwYW5zaW9uUGFuZWxEZXRhaWxzPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwcmljZUNvbnRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7cHJpY2VfYnJlYWt1cH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRlc3RUb3RhbFJvd1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0bmFtZVwiPntcIlRvdGFsXCJ9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0YW1vdW50XCI+UnMuIHt0b3RhbFByaWNlfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRlc3RUb3RhbFJvd1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0bmFtZVwiPntcIkdTVFwifTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGFtb3VudFwiPlJzLiB7dG90YWxQcmljZSoxLjE4fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRlc3RUb3RhbFJvd1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0bmFtZVwiPntcIlBheWFibGVcIn08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRhbW91bnRcIj5Scy4ge3RvdGFsUHJpY2UqMS4xOH08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9FeHBhbnNpb25QYW5lbERldGFpbHM+XG4gICAgICAgICAgICAgICAgPC9FeHBhbnNpb25QYW5lbD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBPcmRlckRldGFpbHNcbiIsImltcG9ydCBPcmRlckRldGFpbHMgZnJvbSAnLi9PcmRlckRldGFpbHMuanMnXG5cbmV4cG9ydCBkZWZhdWx0IE9yZGVyRGV0YWlscyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCBMYWJEZXRhaWxzIGZyb20gJy4uL2NvbW1vbnMvbGFiRGV0YWlscy9pbmRleC5qcydcbmltcG9ydCBMb2FkZXIgZnJvbSAnLi4vLi4vY29tbW9ucy9Mb2FkZXInXG5cbmNsYXNzIExhYlZpZXcgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgc2VsZWN0ZWRMYWI6IHRoaXMucHJvcHMubWF0Y2gucGFyYW1zLmlkXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBib29rTGFiKCkge1xuICAgICAgICB0aGlzLnByb3BzLmhpc3RvcnkucHVzaChgL2xhYi8ke3RoaXMuc3RhdGUuc2VsZWN0ZWRMYWJ9L2Jvb2tgKVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICA8aGVhZGVyIGNsYXNzTmFtZT1cInNraW4tcHJpbWFyeSBmaXhlZCBob3Jpem9udGFsIHRvcCBwcm9maWxlLWJvb2staGVhZGVyXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGFpbmVyLWZsdWlkXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLTRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJoZWFkZXItdGl0bGUgZnctNzAwIGNhcGl0YWxpemUgdGV4dC13aGl0ZVwiPklDT048L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC00XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtNFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dWwgY2xhc3NOYW1lPVwiaW5saW5lLWxpc3QgZmxvYXQtcmlnaHQgdXNlci1ub3RpZmljYXRpb24tYWN0aW9uXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGk+PHNwYW4gY2xhc3NOYW1lPVwiaWNvbiBpY29uLW1kIHRleHQtbWlkZGxlXCI+PGltZyBzcmM9XCIvYXNzZXRzL2ltZy9jdXN0b21lci1pY29ucy91c2VyLnN2Z1wiIGNsYXNzTmFtZT1cImltZy1mbHVpZFwiIC8+PC9zcGFuPjwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGk+PHNwYW4gY2xhc3NOYW1lPVwiaWNvbiBpY29uLW1kIHRleHQtbWlkZGxlIG5vdGlmaWNhdGlvbi1pY29uXCI+PGltZyBzcmM9XCIvYXNzZXRzL2ltZy9jdXN0b21lci1pY29ucy9ub3RpZmljYXRpb24uc3ZnXCIgY2xhc3NOYW1lPVwiaW1nLWZsdWlkXCIgLz4gPHNwYW4gY2xhc3NOYW1lPVwibm90aWZpY2F0aW9uLWFsZXJ0XCIgLz48L3NwYW4+PC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2hlYWRlcj5cblxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5MQUJTW3RoaXMuc3RhdGUuc2VsZWN0ZWRMYWJdID9cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJza2luLXByaW1hcnkgZW1wdHktaGVhZGVyIFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPExhYkRldGFpbHMgey4uLnRoaXMucHJvcHN9IGRhdGE9e3RoaXMucHJvcHMuTEFCU1t0aGlzLnN0YXRlLnNlbGVjdGVkTGFiXX0gLz5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gb25DbGljaz17dGhpcy5ib29rTGFiLmJpbmQodGhpcyl9IGNsYXNzTmFtZT1cInYtYnRuIHYtYnRuLXByaW1hcnkgYnRuLWxnIGZpeGVkIGhvcml6b250YWwgYm90dG9tIG5vLXJvdW5kIGJ0bi1sZyB0ZXh0LWxnXCI+PHNwYW4gY2xhc3NOYW1lPVwidGV4dC14cyBzZWxlY3RlZC1vcHRpb25cIj4oe3RoaXMucHJvcHMuc2VsZWN0ZWRDcml0ZXJpYXMubGVuZ3RofSBTZWxlY3RlZCkgPC9zcGFuPkJvb2tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cblxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+IDogPExvYWRlciAvPlxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBMYWJWaWV3XG4iLCJpbXBvcnQgTGFiVmlldyBmcm9tICcuL0xhYlZpZXcuanMnXG5cbmV4cG9ydCBkZWZhdWx0IExhYlZpZXciLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcblxuaW1wb3J0IExhYkRldGFpbHMgZnJvbSAnLi4vY29tbW9ucy9sYWJEZXRhaWxzL2luZGV4LmpzJ1xuaW1wb3J0IE9yZGVyRGV0YWlscyBmcm9tICcuLi9jb21tb25zL29yZGVyRGV0YWlscy9pbmRleC5qcydcbmltcG9ydCBEZXRhaWxzRm9ybSBmcm9tICcuL2RldGFpbHNGb3JtL2luZGV4LmpzJ1xuaW1wb3J0IEFkZHJlc3NGb3JtIGZyb20gJy4vYWRkcmVzc0Zvcm0vaW5kZXguanMnO1xuXG5jbGFzcyBQYXRpZW50RGV0YWlsc1ZpZXcgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgc2VsZWN0ZWRMYWI6IG51bGwsXG4gICAgICAgICAgICBzZWxlY3RlZFRlc3RzOiBcIlwiLFxuICAgICAgICAgICAgc2VsZWN0ZWRTbG90OiBudWxsLFxuICAgICAgICAgICAgc2VsZWN0ZWRTbG90U3RhcnQgOiBudWxsLFxuICAgICAgICAgICAgc2VsZWN0ZWRTbG90RW5kIDogbnVsbFxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0TG9jYXRpb25QYXJhbSh0YWcpIHtcbiAgICAgICAgLy8gdGhpcyBBUEkgYXNzdW1lcyB0aGUgY29udGV4dCBvZiByZWFjdC1yb3V0ZXItNFxuICAgICAgICBjb25zdCBwYXJhbVN0cmluZyA9IHRoaXMucHJvcHMubG9jYXRpb24uc2VhcmNoXG4gICAgICAgIGNvbnN0IHBhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXMocGFyYW1TdHJpbmcpXG4gICAgICAgIHJldHVybiBwYXJhbXMuZ2V0KHRhZylcbiAgICB9XG5cbiAgICBwcm9jZWVkKCl7XG4gICAgICAgIHRoaXMuY29udGV4dC5yb3V0ZXIuaGlzdG9yeS5wdXNoKCcvbGFiL2Jvb2tpbmcvc3VtbWFyeS9JVUhCVUg4Nzg3VUhCJylcbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgbGV0IGxhYklkID0gdGhpcy5wcm9wcy5tYXRjaC5wYXJhbXMuaWRcbiAgICAgICAgbGV0IHRlc3RzID0gdGhpcy5nZXRMb2NhdGlvblBhcmFtKCd0ZXN0cycpXG4gICAgICAgIGxldCBzZWxlY3RlZFNsb3RTdGFydCA9IHRoaXMuZ2V0TG9jYXRpb25QYXJhbSgndF9zdGFydCcpXG4gICAgICAgIHNlbGVjdGVkU2xvdFN0YXJ0ID0gbmV3IERhdGUocGFyc2VGbG9hdChzZWxlY3RlZFNsb3RTdGFydCkpXG4gICAgICAgIHNlbGVjdGVkU2xvdFN0YXJ0ID0gc2VsZWN0ZWRTbG90U3RhcnQudG9TdHJpbmcoKVxuICAgICAgICBsZXQgc2VsZWN0ZWRTbG90RW5kID0gdGhpcy5nZXRMb2NhdGlvblBhcmFtKCd0X2VuZCcpXG4gICAgICAgIHNlbGVjdGVkU2xvdEVuZCA9IG5ldyBEYXRlKHBhcnNlRmxvYXQoc2VsZWN0ZWRTbG90RW5kKSlcbiAgICAgICAgc2VsZWN0ZWRTbG90RW5kID0gc2VsZWN0ZWRTbG90RW5kLnRvU3RyaW5nKClcbiAgICAgICAgaWYgKGxhYklkKSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgc2VsZWN0ZWRMYWI6IGxhYklkLCBzZWxlY3RlZFRlc3RzOiB0ZXN0cywgc2VsZWN0ZWRTbG90U3RhcnQsIHNlbGVjdGVkU2xvdEVuZCB9KVxuICAgICAgICAgICAgdGhpcy5wcm9wcy5nZXRMYWJCeUlkKGxhYklkKVxuXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdGF0aWMgY29udGV4dFR5cGVzID0ge1xuICAgICAgICByb3V0ZXI6ICgpID0+IG51bGxcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGF0aWVudERldGFpbHNcIj5cblxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5MQUJTW3RoaXMuc3RhdGUuc2VsZWN0ZWRMYWJdID9cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPExhYkRldGFpbHMgZGF0YT17dGhpcy5wcm9wcy5MQUJTW3RoaXMuc3RhdGUuc2VsZWN0ZWRMYWJdfSAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxPcmRlckRldGFpbHMgZGF0YT17dGhpcy5wcm9wcy5MQUJTW3RoaXMuc3RhdGUuc2VsZWN0ZWRMYWJdfSAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic2VsZWN0ZWRBcHBvaW50bWVudFNsb3RcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGg1PlNlbGVjdGVkIEFwcG9pbnRtZW50IFNsb3Q8L2g1PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJhcHBkYXRlXCI+QXBwb2ludG1lbnQgRGF0ZTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZGF0ZVwiPnsgdGhpcy5zdGF0ZS5zZWxlY3RlZFNsb3RTdGFydCB9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxEZXRhaWxzRm9ybSAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxBZGRyZXNzRm9ybSBjaXR5PVwiU2VsZWN0ZWQgdmFsdWVcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwicHJvY2VlZGJ0blwiIG9uQ2xpY2s9e3RoaXMucHJvY2VlZC5iaW5kKHRoaXMpfT5Qcm9jZWVkPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj4gOiBcIlwiXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgUGF0aWVudERldGFpbHNWaWV3XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcblxuY2xhc3MgQWRkcmVzc0Zvcm0gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgYWRkcmVzczonJyxcbiAgICAgICAgICAgIGxvY2FsaXR5OicnLFxuICAgICAgICAgICAgbGFuZG1hcms6JycsXG4gICAgICAgICAgICBwaW5jb2RlOicnLFxuICAgICAgICAgICAgY2l0eTpwcm9wcy5jaXR5XG5cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlucHV0SGFuZGxlcih3aGljaCwgZSl7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBbd2hpY2hdIDogZS50YXJnZXQudmFsdWUgfSlcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZGV0YWlsc0Zvcm1cIj5cbiAgICAgICAgICAgICAgICA8aDU+UGxlYXNlIHByb3ZpZGUgcGF0aWVudCBkZXRhaWxzPC9oNT5cblxuICAgICAgICAgICAgICAgIDxpbnB1dCB2YWx1ZT17dGhpcy5zdGF0ZS5hZGRyZXNzfSBvbkNoYW5nZT17dGhpcy5pbnB1dEhhbmRsZXIuYmluZCh0aGlzLCdhZGRyZXNzJyl9IGNsYXNzTmFtZT1cInB0bmFtZVwiIHBsYWNlaG9sZGVyPVwiQWRkcmVzcypcIiAvPlxuICAgICAgICAgICAgICAgIDxpbnB1dCB2YWx1ZT17dGhpcy5zdGF0ZS5sb2NhbGl0eX0gb25DaGFuZ2U9e3RoaXMuaW5wdXRIYW5kbGVyLmJpbmQodGhpcywnbG9jYWxpdHknKX0gY2xhc3NOYW1lPVwicHRuYW1lXCIgcGxhY2Vob2xkZXI9XCJMb2NhbGl0eSpcIiAvPlxuICAgICAgICAgICAgICAgIDxpbnB1dCB2YWx1ZT17dGhpcy5zdGF0ZS5sYW5kbWFya30gb25DaGFuZ2U9e3RoaXMuaW5wdXRIYW5kbGVyLmJpbmQodGhpcywnbGFuZG1hcmsnKX0gY2xhc3NOYW1lPVwicHRuYW1lXCIgcGxhY2Vob2xkZXI9XCJMYW5kbWFyaypcIiAvPlxuICAgICAgICAgICAgICAgIDxpbnB1dCB2YWx1ZT17dGhpcy5zdGF0ZS5waW5jb2RlfSBvbkNoYW5nZT17dGhpcy5pbnB1dEhhbmRsZXIuYmluZCh0aGlzLCdwaW5jb2RlJyl9IGNsYXNzTmFtZT1cInB0bW9iaWxlXCIgcGxhY2Vob2xkZXI9XCJQaW5jb2RlKlwiIC8+XG4gICAgICAgICAgICAgICAgey8qIDxpbnB1dCB2YWx1ZT17dGhpcy5zdGF0ZS5jaXR5fSBvbkNoYW5nZT17dGhpcy5pbnB1dEhhbmRsZXIuYmluZCh0aGlzLCdjaXR5Jyl9IGRpc2FibGVkIGNsYXNzTmFtZT1cInB0b3RwXCIgcGxhY2Vob2xkZXI9XCJDaXR5XCIgLz4gKi99XG5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBBZGRyZXNzRm9ybVxuIiwiaW1wb3J0IEFkZHJlc3NGb3JtIGZyb20gJy4vQWRkcmVzc0Zvcm0uanMnXG5cbmV4cG9ydCBkZWZhdWx0IEFkZHJlc3NGb3JtIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cbmNsYXNzIERldGFpbHNGb3JtIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIHBhdGllbnROYW1lIDogJycsXG4gICAgICAgICAgICBwYXRpZW50RW1haWwgOiAnJyxcbiAgICAgICAgICAgIHBhdGllbnRHZW5kZXIgOiAnbWFsZScsXG4gICAgICAgICAgICBtb2JpbGU6JycsXG4gICAgICAgICAgICBvdHAgOicnLFxuICAgICAgICAgICAgcGF0aWVudE1vYmlsZSA6ICcnXG5cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlucHV0SGFuZGxlcih3aGljaCwgZSl7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBbd2hpY2hdIDogZS50YXJnZXQudmFsdWUgfSlcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZGV0YWlsc0Zvcm1cIj5cbiAgICAgICAgICAgICAgICA8aDU+UGxlYXNlIHByb3ZpZGUgcGF0aWVudCBkZXRhaWxzPC9oNT5cblxuICAgICAgICAgICAgICAgIDxpbnB1dCB2YWx1ZT17dGhpcy5zdGF0ZS5wYXRpZW50TmFtZX0gb25DaGFuZ2U9e3RoaXMuaW5wdXRIYW5kbGVyLmJpbmQodGhpcywncGF0aWVudE5hbWUnKX0gY2xhc3NOYW1lPVwicHRuYW1lXCIgcGxhY2Vob2xkZXI9XCJQYXRpZW50IE5hbWUqXCIgLz5cbiAgICAgICAgICAgICAgICA8aW5wdXQgdmFsdWU9e3RoaXMuc3RhdGUucGF0aWVudEVtYWlsfSBvbkNoYW5nZT17dGhpcy5pbnB1dEhhbmRsZXIuYmluZCh0aGlzLCdwYXRpZW50RW1haWwnKX0gY2xhc3NOYW1lPVwicHRlbWFpbFwiIHBsYWNlaG9sZGVyPVwiRW1haWwqXCIgLz5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInB0Z2VuZGVyXCI+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuPkdlbmRlciA6PC9zcGFuPiBcbiAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJyYWRpb1wiIG5hbWU9XCJnZW5kZXJcIiB2YWx1ZT1cIm1hbGVcIiBjaGVja2VkPXt0aGlzLnN0YXRlLnBhdGllbnRHZW5kZXIgPT09IFwibWFsZVwifSBvbkNoYW5nZT17dGhpcy5pbnB1dEhhbmRsZXIuYmluZCh0aGlzLCdwYXRpZW50R2VuZGVyJyl9Lz4gTWFsZVxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInJhZGlvXCIgbmFtZT1cImdlbmRlclwiIHZhbHVlPVwiZmVtYWxlXCIgY2hlY2tlZD17dGhpcy5zdGF0ZS5wYXRpZW50R2VuZGVyID09PSBcImZlbWFsZVwifSBvbkNoYW5nZT17dGhpcy5pbnB1dEhhbmRsZXIuYmluZCh0aGlzLCdwYXRpZW50R2VuZGVyJyl9Lz4gRmVtYWxlXG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGlucHV0IHZhbHVlPXt0aGlzLnN0YXRlLm1vYmlsZX0gb25DaGFuZ2U9e3RoaXMuaW5wdXRIYW5kbGVyLmJpbmQodGhpcywnbW9iaWxlJyl9IGNsYXNzTmFtZT1cInB0bW9iaWxlXCIgcGxhY2Vob2xkZXI9XCJNb2JpbGUqXCIgLz5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cIm90cGJ0blwiPihSZSlTZW5kIE9UUDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDxpbnB1dCB2YWx1ZT17dGhpcy5zdGF0ZS5vdHB9IG9uQ2hhbmdlPXt0aGlzLmlucHV0SGFuZGxlci5iaW5kKHRoaXMsJ290cCcpfSBjbGFzc05hbWU9XCJwdG90cFwiIHBsYWNlaG9sZGVyPVwiRW50ZXIgT1RQKlwiIC8+XG4gICAgICAgICAgICAgICAgPGlucHV0IHZhbHVlPXt0aGlzLnN0YXRlLnBhdGllbnRNb2JpbGV9IG9uQ2hhbmdlPXt0aGlzLmlucHV0SGFuZGxlci5iaW5kKHRoaXMsJ3BhdGllbnRNb2JpbGUnKX0gY2xhc3NOYW1lPVwicHRtb2JpbGVcIiBwbGFjZWhvbGRlcj1cIlBhdGllbnQgTW9iaWxlKlwiIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICBcbiAgICAgICAgKTtcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgRGV0YWlsc0Zvcm1cbiIsImltcG9ydCBEZXRhaWxzRm9ybSBmcm9tICcuL0RldGFpbHNGb3JtLmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBEZXRhaWxzRm9ybSIsImltcG9ydCBQYXRpZW50RGV0YWlsc1ZpZXcgZnJvbSAnLi9QYXRpZW50RGV0YWlsc1ZpZXcuanMnXG5cbmV4cG9ydCBkZWZhdWx0IFBhdGllbnREZXRhaWxzVmlldyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG5pbXBvcnQgQ29tbW9ubHlTZWFyY2hlZCBmcm9tICcuLi8uLi9jb21tb25zL2NvbW1vbmx5U2VhcmNoZWQvaW5kZXguanMnXG5pbXBvcnQgQ3JpdGVyaWFTZWFyY2ggZnJvbSAnLi4vLi4vY29tbW9ucy9jcml0ZXJpYVNlYXJjaCdcblxuY2xhc3MgU2VhcmNoQ3JpdGVyaWFWaWV3IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcblxuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2VhcmNoUHJvY2VlZCgpIHtcbiAgICAgICAgbGV0IHNlYXJjaERhdGEgPSB7XG4gICAgICAgICAgICBzZWxlY3RlZENyaXRlcmlhcyA6IHRoaXMucHJvcHMuc2VsZWN0ZWRDcml0ZXJpYXMsXG4gICAgICAgICAgICBzZWxlY3RlZExvY2F0aW9uIDogdGhpcy5wcm9wcy5zZWxlY3RlZExvY2F0aW9uLFxuICAgICAgICB9XG4gICAgICAgIHNlYXJjaERhdGEgPSBlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc2VhcmNoRGF0YSkpXG4gICAgICAgIGxldCBmaWx0ZXJEYXRhID0gZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHRoaXMucHJvcHMuZmlsdGVyQ3JpdGVyaWEpKVxuICAgICAgICB0aGlzLnByb3BzLmhpc3RvcnkucHVzaChgL2R4L3NlYXJjaHJlc3VsdHM/c2VhcmNoPSR7c2VhcmNoRGF0YX0mZmlsdGVyPSR7ZmlsdGVyRGF0YX1gKVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdj5cblxuICAgICAgICAgICAgICAgIDxDcml0ZXJpYVNlYXJjaCB7Li4udGhpcy5wcm9wc30gY2hlY2tGb3JMb2FkPXt0aGlzLnByb3BzLkxPQURFRF9TRUFSQ0hfQ1JJVEVSSUFfTEFCfSB0aXRsZT1cIlNlYXJjaCBmb3IgVGVzdCBhbmQgTGFicy5cIj5cbiAgICAgICAgICAgICAgICAgICAgPHNlY3Rpb24gY2xhc3NOYW1lPVwid3JhcCB3cmFwLTEwMFwiPlxuXG4gICAgICAgICAgICAgICAgICAgICAgICA8Q29tbW9ubHlTZWFyY2hlZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRpbmc9XCJTZWxlY3RlZCBDcml0ZXJpYVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YT17dGhpcy5wcm9wcy5zZWxlY3RlZENyaXRlcmlhc31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZD17W119XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9nZ2xlPXt0aGlzLnByb3BzLnRvZ2dsZURpYWdub3Npc0NyaXRlcmlhLmJpbmQodGhpcyl9XG4gICAgICAgICAgICAgICAgICAgICAgICAvPlxuXG4gICAgICAgICAgICAgICAgICAgICAgICA8Q29tbW9ubHlTZWFyY2hlZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRpbmc9XCJDb21tb24gVGVzdFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cInRlc3RcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE9e3RoaXMucHJvcHMuY29tbW9uX3Rlc3RzfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkPXt0aGlzLnByb3BzLnNlbGVjdGVkQ3JpdGVyaWFzLmZpbHRlcih4ID0+IHgudHlwZSA9PSAndGVzdCcpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvZ2dsZT17dGhpcy5wcm9wcy50b2dnbGVEaWFnbm9zaXNDcml0ZXJpYS5iaW5kKHRoaXMpfVxuICAgICAgICAgICAgICAgICAgICAgICAgLz5cblxuICAgICAgICAgICAgICAgICAgICAgICAgPENvbW1vbmx5U2VhcmNoZWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWFkaW5nPVwiQ29tbW9uIENvbmRpdGlvbnNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJsYWJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE9e3RoaXMucHJvcHMuY29tbW9uX2NvbmRpdGlvbnN9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWQ9e3RoaXMucHJvcHMuc2VsZWN0ZWRDcml0ZXJpYXMuZmlsdGVyKHggPT4geC50eXBlID09ICdsYWInKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b2dnbGU9e3RoaXMucHJvcHMudG9nZ2xlRGlhZ25vc2lzQ3JpdGVyaWEuYmluZCh0aGlzKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxDb21tb25seVNlYXJjaGVkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGluZz1cIkNvbW1vbiBMYWJzXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwibGFiXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhPXt0aGlzLnByb3BzLnByZWZlcnJlZF9sYWJzfVxuICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgPC9zZWN0aW9uPlxuICAgICAgICAgICAgICAgIDwvQ3JpdGVyaWFTZWFyY2g+XG5cblxuXG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXt0aGlzLnNlYXJjaFByb2NlZWQuYmluZCh0aGlzKX0gY2xhc3NOYW1lPVwidi1idG4gdi1idG4tcHJpbWFyeSBidG4tbGcgZml4ZWQgaG9yaXpvbnRhbCBib3R0b20gbm8tcm91bmQgdGV4dC1sZ1wiPlNob3cgTGFiczwvYnV0dG9uPlxuXG5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgU2VhcmNoQ3JpdGVyaWFWaWV3XG4iLCJpbXBvcnQgU2VhcmNoQ3JpdGVyaWFWaWV3IGZyb20gJy4vU2VhcmNoQ3JpdGVyaWFWaWV3LmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBTZWFyY2hDcml0ZXJpYVZpZXciLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgTGFic0xpc3QgZnJvbSAnLi4vc2VhcmNoUmVzdWx0cy9sYWJzTGlzdC9pbmRleC5qcydcbmltcG9ydCBDcml0ZXJpYVNlYXJjaCBmcm9tICcuLi8uLi9jb21tb25zL2NyaXRlcmlhU2VhcmNoJ1xuaW1wb3J0IFRvcEJhciBmcm9tICcuL3RvcEJhcidcblxuY2xhc3MgU2VhcmNoUmVzdWx0c1ZpZXcgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgICAgICB0aGlzLnN0YXRlID0ge1xuXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgdGhpcy5nZXRMYWJzKClcbiAgICB9XG5cbiAgICBnZXRMYWJzKCkge1xuICAgICAgICBsZXQge1xuICAgICAgICAgICAgc2VsZWN0ZWRMb2NhdGlvbixcbiAgICAgICAgICAgIHNlbGVjdGVkQ3JpdGVyaWFzLFxuICAgICAgICAgICAgZmlsdGVyQ3JpdGVyaWFcbiAgICAgICAgfSA9IHRoaXMucHJvcHNcblxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgbGV0IHNlYXJjaFN0YXRlID0gdGhpcy5nZXRMb2NhdGlvblBhcmFtKCdzZWFyY2gnKVxuICAgICAgICAgICAgbGV0IGZpbHRlckNyaXRlcmlhID0gdGhpcy5nZXRMb2NhdGlvblBhcmFtKCdmaWx0ZXInKVxuICAgICAgICAgICAgaWYgKGZpbHRlckNyaXRlcmlhKSB7XG4gICAgICAgICAgICAgICAgZmlsdGVyQ3JpdGVyaWEgPSBKU09OLnBhcnNlKGZpbHRlckNyaXRlcmlhKVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBmaWx0ZXJDcml0ZXJpYSA9IHt9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzZWFyY2hTdGF0ZSA9IEpTT04ucGFyc2Uoc2VhcmNoU3RhdGUpXG4gICAgICAgICAgICB0aGlzLmdldExhYkxpc3Qoc2VhcmNoU3RhdGUsIGZpbHRlckNyaXRlcmlhLCB0cnVlKVxuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGUpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRMb2NhdGlvblBhcmFtKHRhZykge1xuICAgICAgICAvLyB0aGlzIEFQSSBhc3N1bWVzIHRoZSBjb250ZXh0IG9mIHJlYWN0LXJvdXRlci00XG4gICAgICAgIGNvbnN0IHBhcmFtU3RyaW5nID0gdGhpcy5wcm9wcy5sb2NhdGlvbi5zZWFyY2hcbiAgICAgICAgY29uc3QgcGFyYW1zID0gbmV3IFVSTFNlYXJjaFBhcmFtcyhwYXJhbVN0cmluZylcbiAgICAgICAgcmV0dXJuIHBhcmFtcy5nZXQodGFnKVxuICAgIH1cblxuICAgIGdldExhYkxpc3Qoc2VhcmNoU3RhdGUsIGZpbHRlckNyaXRlcmlhLCBtZXJnZVN0YXRlKSB7XG4gICAgICAgIHRoaXMucHJvcHMuZ2V0TGFicyhzZWFyY2hTdGF0ZSwgZmlsdGVyQ3JpdGVyaWEsIG1lcmdlU3RhdGUpO1xuICAgIH1cblxuICAgIGFwcGx5RmlsdGVycyhmaWx0ZXJTdGF0ZSkge1xuICAgICAgICBsZXQgc2VhcmNoU3RhdGUgPSB7XG4gICAgICAgICAgICBzZWxlY3RlZENyaXRlcmlhczogdGhpcy5wcm9wcy5zZWxlY3RlZENyaXRlcmlhcyxcbiAgICAgICAgICAgIHNlbGVjdGVkTG9jYXRpb246IHRoaXMucHJvcHMuc2VsZWN0ZWRMb2NhdGlvbixcbiAgICAgICAgfVxuICAgICAgICBsZXQgc2VhcmNoRGF0YSA9IGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzZWFyY2hTdGF0ZSkpXG4gICAgICAgIGxldCBmaWx0ZXJEYXRhID0gZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGZpbHRlclN0YXRlKSlcbiAgICAgICAgdGhpcy5wcm9wcy5oaXN0b3J5LnJlcGxhY2UoYC9keC9zZWFyY2hyZXN1bHRzP3NlYXJjaD0ke3NlYXJjaERhdGF9JmZpbHRlcj0ke2ZpbHRlckRhdGF9YClcblxuICAgICAgICB0aGlzLmdldExhYkxpc3Qoc2VhcmNoU3RhdGUsIGZpbHRlclN0YXRlLCB0cnVlKVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICA8Q3JpdGVyaWFTZWFyY2ggey4uLnRoaXMucHJvcHN9IGNoZWNrRm9yTG9hZD17dGhpcy5wcm9wcy5MT0FERURfTEFCU19TRUFSQ0h9IHRpdGxlPVwiU2VhcmNoIGZvciBUZXN0IGFuZCBMYWJzLlwiPlxuICAgICAgICAgICAgICAgICAgICA8VG9wQmFyIHsuLi50aGlzLnByb3BzfSBhcHBseUZpbHRlcnM9e3RoaXMuYXBwbHlGaWx0ZXJzLmJpbmQodGhpcyl9IC8+XG4gICAgICAgICAgICAgICAgICAgIDxMYWJzTGlzdCB7Li4udGhpcy5wcm9wc30gLz5cbiAgICAgICAgICAgICAgICA8L0NyaXRlcmlhU2VhcmNoPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBTZWFyY2hSZXN1bHRzVmlld1xuIiwiaW1wb3J0IFNlYXJjaFJlc3VsdHNWaWV3IGZyb20gJy4vU2VhcmNoUmVzdWx0c1ZpZXcuanMnXG5cbmV4cG9ydCBkZWZhdWx0IFNlYXJjaFJlc3VsdHNWaWV3IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IExhYlByb2ZpbGVDYXJkIGZyb20gJy4uLy4uL2NvbW1vbnMvbGFiUHJvZmlsZUNhcmQvaW5kZXguanMnXG5cbmNsYXNzIExhYnNMaXN0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgbGV0IHsgTEFCUywgbGFiTGlzdCB9ID0gdGhpcy5wcm9wc1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8c2VjdGlvbiBjbGFzc05hbWU9XCJ3cmFwIHNlYXJjaC1ib29rLXJlc3VsdFwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGFpbmVyLWZsdWlkXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC0xMlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiTGlzdC5tYXAoKGxhYklkLCBpKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gPExhYlByb2ZpbGVDYXJkIHsuLi50aGlzLnByb3BzfSBkZXRhaWxzPXtMQUJTW2xhYklkXX0ga2V5PXtpfSAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvc2VjdGlvbj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgTGFic0xpc3RcbiIsImltcG9ydCBMYWJzTGlzdCBmcm9tICcuL0xhYnNMaXN0LmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBMYWJzTGlzdCIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG5pbXBvcnQgTWVudSwgeyBNZW51SXRlbSB9IGZyb20gJ21hdGVyaWFsLXVpL01lbnUnO1xuaW1wb3J0IFJhbmdlIGZyb20gJ3JjLXNsaWRlci9saWIvUmFuZ2UnO1xuXG5jbGFzcyBUb3BCYXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgYW5jaG9yRWw6IG51bGwsXG4gICAgICAgICAgICBvcGVuRmlsdGVyOiBmYWxzZSxcbiAgICAgICAgICAgIHByaWNlUmFuZ2U6IFsxMDAsIDE1MDBdLFxuICAgICAgICAgICAgZGlzdGFuY2VSYW5nZTogWzEsIDM1XSxcbiAgICAgICAgICAgIHNvcnRCeTogbnVsbFxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhwcm9wcykge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHsgLi4ucHJvcHMuZmlsdGVyQ3JpdGVyaWEgfSlcbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IC4uLnRoaXMucHJvcHMuZmlsdGVyQ3JpdGVyaWEgfSlcbiAgICB9XG5cbiAgICBhcHBseUZpbHRlcnMoKSB7XG4gICAgICAgIGxldCBmaWx0ZXJTdGF0ZSA9IHtcbiAgICAgICAgICAgIHByaWNlUmFuZ2U6IHRoaXMuc3RhdGUucHJpY2VSYW5nZSxcbiAgICAgICAgICAgIGRpc3RhbmNlUmFuZ2U6IHRoaXMuc3RhdGUuZGlzdGFuY2VSYW5nZSxcbiAgICAgICAgICAgIHNvcnRCeTogdGhpcy5zdGF0ZS5zb3J0QnlcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnByb3BzLmFwcGx5RmlsdGVycyhmaWx0ZXJTdGF0ZSlcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IG9wZW5GaWx0ZXI6IGZhbHNlIH0pXG4gICAgfVxuXG4gICAgaGFuZGxlT3BlbihldmVudCkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHsgYW5jaG9yRWw6IGV2ZW50LmN1cnJlbnRUYXJnZXQgfSlcbiAgICB9XG5cbiAgICBoYW5kbGVDbG9zZSh0eXBlKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBhbmNob3JFbDogbnVsbCwgc29ydEJ5OiB0eXBlIH0sICgpID0+IHtcbiAgICAgICAgICAgIGlmKHR5cGUpe1xuICAgICAgICAgICAgICAgIHRoaXMuYXBwbHlGaWx0ZXJzKClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICB0b2dnbGVGaWx0ZXIoKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgb3BlbkZpbHRlcjogIXRoaXMuc3RhdGUub3BlbkZpbHRlclxuICAgICAgICB9KVxuICAgIH1cblxuICAgIGhhbmRsZVJhbmdlKHR5cGUsIHJhbmdlKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgW3R5cGVdOiByYW5nZVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIGdldENyaXRlcmlhU3RyaW5nKHNlbGVjdGVkQ3JpdGVyaWFzKSB7XG4gICAgICAgIGlmIChzZWxlY3RlZENyaXRlcmlhcyAmJiBzZWxlY3RlZENyaXRlcmlhcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiBzZWxlY3RlZENyaXRlcmlhcy5yZWR1Y2UoKGZpbmFsLCBjdXJyLCBpKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGkgIT0gMCkge1xuICAgICAgICAgICAgICAgICAgICBmaW5hbCArPSAnLCAnXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZpbmFsICs9IGAke2N1cnIubmFtZX1gXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZpbmFsXG4gICAgICAgICAgICB9LCBcIlwiKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIGxldCBjcml0ZXJpYVN0ciA9IHRoaXMuZ2V0Q3JpdGVyaWFTdHJpbmcodGhpcy5wcm9wcy5zZWxlY3RlZENyaXRlcmlhcylcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPHNlY3Rpb24gY2xhc3NOYW1lPVwiZmlsdGVyLXJvd1wiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGFpbmVyLWZsdWlkXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC0xMlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmlsdGVyLWl0ZW1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhY3Rpb24tZmlsdGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dWwgY2xhc3NOYW1lPVwiaW5saW5lLWxpc3RcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGkgb25DbGljaz17dGhpcy5oYW5kbGVPcGVuLmJpbmQodGhpcyl9PjxzcGFuIGNsYXNzTmFtZT1cImN0LWltZyBjdC1pbWctc20gZmlsdGVyLWljb24gdGV4dC1yaWdodFwiPjxpbWcgc3JjPVwiL2Fzc2V0cy9pbWcvY3VzdG9tZXItaWNvbnMvcmFuZ2Uuc3ZnXCIgY2xhc3NOYW1lPVwiaW1nLWZsdWlkXCIgLz48L3NwYW4+PC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGkgb25DbGljaz17dGhpcy50b2dnbGVGaWx0ZXIuYmluZCh0aGlzKX0+PHNwYW4gY2xhc3NOYW1lPVwiY3QtaW1nIGN0LWltZy1zbSBmaWx0ZXItaWNvbiB0ZXh0LXJpZ2h0IGFwcGxpZWQtZmlsdGVyXCI+PGltZyBzcmM9XCIvYXNzZXRzL2ltZy9jdXN0b21lci1pY29ucy9maWx0ZXIuc3ZnXCIgY2xhc3NOYW1lPVwiaW1nLWZsdWlkXCIgLz48L3NwYW4+PHNwYW4gY2xhc3NOYW1lPVwiYXBwbGllZC1maWx0ZXItbm90aVwiIC8+PC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZpbHRlci10aXRsZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3RoaXMucHJvcHMubGFiTGlzdC5sZW5ndGh9IFJlc3VsdHMgZm91bmQgZm9yIDxzcGFuIGNsYXNzTmFtZT1cImZ3LTcwMFwiPiB7Y3JpdGVyaWFTdHJ9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8TWVudVxuICAgICAgICAgICAgICAgICAgICBpZD1cInNvcnQtbWVudVwiXG4gICAgICAgICAgICAgICAgICAgIGFuY2hvckVsPXt0aGlzLnN0YXRlLmFuY2hvckVsfVxuICAgICAgICAgICAgICAgICAgICBvcGVuPXtCb29sZWFuKHRoaXMuc3RhdGUuYW5jaG9yRWwpfVxuICAgICAgICAgICAgICAgICAgICBvbkNsb3NlPXt0aGlzLmhhbmRsZUNsb3NlLmJpbmQodGhpcywgbnVsbCl9XG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICA8TWVudUl0ZW0gb25DbGljaz17dGhpcy5oYW5kbGVDbG9zZS5iaW5kKHRoaXMsICduYW1lJyl9PlJlbGF2YW5jZTwvTWVudUl0ZW0+XG4gICAgICAgICAgICAgICAgICAgIDxNZW51SXRlbSBvbkNsaWNrPXt0aGlzLmhhbmRsZUNsb3NlLmJpbmQodGhpcywgJ3ByaWNlJyl9PkZlZTwvTWVudUl0ZW0+XG4gICAgICAgICAgICAgICAgICAgIDxNZW51SXRlbSBvbkNsaWNrPXt0aGlzLmhhbmRsZUNsb3NlLmJpbmQodGhpcywgJ2Rpc3RhbmNlJyl9PkRpc3RhbmNlPC9NZW51SXRlbT5cbiAgICAgICAgICAgICAgICA8L01lbnU+XG5cbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUub3BlbkZpbHRlciA/IDxkaXYgb25DbGljaz17dGhpcy50b2dnbGVGaWx0ZXIuYmluZCh0aGlzKX0gY2xhc3NOYW1lPVwib3ZlcmxheSBibGFja1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3aWRnZXQgZmlsdGVyLXBvcHVwXCIgb25DbGljaz17KGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgICAgICAgICAgICAgICAgICB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIndpZGdldC1jb250ZW50XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmlsdGVyUm93XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0bFwiPlByaWNlPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidHJcIj5ScyB7dGhpcy5zdGF0ZS5wcmljZVJhbmdlWzBdfSB0byB7dGhpcy5zdGF0ZS5wcmljZVJhbmdlWzFdfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImJsXCI+UnMgMTAwPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiYnJcIj5ScyAyMDAwPC9zcGFuPlxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8UmFuZ2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtaW49ezEwMH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXg9ezIwMDB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3RoaXMuc3RhdGUucHJpY2VSYW5nZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGVwPXsxMDB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicmFuZ2VcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZVJhbmdlLmJpbmQodGhpcywgJ3ByaWNlUmFuZ2UnKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZpbHRlclJvd1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGxcIj5EaXN0YW5jZTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRyXCI+e3RoaXMuc3RhdGUuZGlzdGFuY2VSYW5nZVswXX0gdG8ge3RoaXMuc3RhdGUuZGlzdGFuY2VSYW5nZVsxXX0gS008L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJibFwiPjEgPiBLTTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImJyXCI+NTAgS008L3NwYW4+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxSYW5nZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1pbj17MX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXg9ezUwfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXt0aGlzLnN0YXRlLmRpc3RhbmNlUmFuZ2V9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RlcD17MX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJyYW5nZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuaGFuZGxlUmFuZ2UuYmluZCh0aGlzLCAnZGlzdGFuY2VSYW5nZScpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3aWRnZXQtZm9vdGVyIHBkLTBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJ2LWJ0biB2LWJ0bi1wcmltYXJ5IGJ0bi1ibG9jayBidG4tbGdcIiBvbkNsaWNrPXt0aGlzLmFwcGx5RmlsdGVycy5iaW5kKHRoaXMpfT5BcHBseTwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PiA6IFwiXCJcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIDwvc2VjdGlvbj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgVG9wQmFyXG4iLCJpbXBvcnQgVG9wQmFyIGZyb20gJy4vVG9wQmFyLmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBUb3BCYXIiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IExvYWRlciBmcm9tICcuLi8uLi9jb21tb25zL0xvYWRlcidcblxuY2xhc3MgVGVzdFNlbGVjdG9yVmlldyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgICBzZWxlY3RlZExhYjogdGhpcy5wcm9wcy5tYXRjaC5wYXJhbXMuaWRcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgICB0aGlzLnByb3BzLmdldExhYkJ5SWQodGhpcy5zdGF0ZS5zZWxlY3RlZExhYilcbiAgICB9XG5cbiAgICB0b2dnbGVUZXN0KHRlc3QpIHtcbiAgICAgICAgdGhpcy5wcm9wcy50b2dnbGVEaWFnbm9zaXNDcml0ZXJpYSgndGVzdCcsIHRlc3QpXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICBcbiAgICAgICAgbGV0IGxhYkRhdGEgPSB0aGlzLnByb3BzLkxBQlNbdGhpcy5zdGF0ZS5zZWxlY3RlZExhYl1cbiAgICAgICAgbGV0IHRlc3RzID0gW11cbiAgICAgICAgbGV0IHNlbGVjdGVkVGVzdHMgPSBbXVxuXG4gICAgICAgIGlmICh0aGlzLnByb3BzLnNlbGVjdGVkQ3JpdGVyaWFzICYmIHRoaXMucHJvcHMuc2VsZWN0ZWRDcml0ZXJpYXMubGVuZ3RoKSB7XG4gICAgICAgICAgICBzZWxlY3RlZFRlc3RzID0gdGhpcy5wcm9wcy5zZWxlY3RlZENyaXRlcmlhcy5maWx0ZXIoeCA9PiB4LnR5cGUgPT0gJ3Rlc3QnKS5tYXAoeCA9PiB4LmlkKVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBpZiAobGFiRGF0YSAmJiBsYWJEYXRhLnRlc3RzICYmIGxhYkRhdGEudGVzdHMubGVuZ3RoKSB7XG4gICAgICAgICAgICB0ZXN0cyA9IGxhYkRhdGEudGVzdHMubWFwKCh0ZXN0LCBpKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIDxsaSBrZXk9e2l9PlxuICAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiY2stYnhcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHt0ZXN0LnRlc3QubmFtZX1cbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBjaGVja2VkPXtzZWxlY3RlZFRlc3RzLmluZGV4T2YodGVzdC50ZXN0LmlkKSA+IC0xfSBvbkNoYW5nZT17dGhpcy50b2dnbGVUZXN0LmJpbmQodGhpcywgdGVzdC50ZXN0KX0gLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImNoZWNrbWFya1wiIC8+XG4gICAgICAgICAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRlc3QtcHJpY2UgdGV4dC1tZCBmdy01MDBcIj57dGVzdC5tcnB9PC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXY+XG5cbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGxhYkRhdGEgP1xuXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoZWFkZXIgY2xhc3NOYW1lPVwic2tpbi13aGl0ZSBmaXhlZCBob3Jpem9udGFsIHRvcCBsb2NhdGlvbi1kZXRlY3QtaGVhZGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGFpbmVyLWZsdWlkXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLTEyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic2VsZWN0LWxvY2F0aW9uLXJvdyB0ZXh0LWNlbnRlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuaGlzdG9yeS5nbygtMSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19IGNsYXNzTmFtZT1cImN0LWltZyBjdC1pbWctbWQgY2xvc2VcIj48aW1nIHNyYz1cIi9hc3NldHMvaW1nL2N1c3RvbWVyLWljb25zL2Nsb3NlLWJsYWNrLnN2Z1wiIGNsYXNzTmFtZT1cImltZy1mbHVpZFwiIC8+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGg0IGNsYXNzTmFtZT1cImZ3LTcwMCB0ZXh0LW1kXCI+QWxsIFRlc3Q8L2g0PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC0xMlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNlYXJjaC1yb3dcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRvbi1ncm91cCBsb2NhdGlvbi1kZXRlY3QtZmllbGRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2wgaW5wdXQtbWQgc2VhcmNoLWlucHV0IG5vLXNoYWRvd1wiIHBsYWNlaG9sZGVyPVwiU2VhcmNoIFRlc3RcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImN0LWltZyBjdC1pbWctc20gbWFwLW1hcmtlci1ibHVlXCI+PGltZyBzcmM9XCIvYXNzZXRzL2ltZy9jdXN0b21lci1pY29ucy9zZWFyY2gtaWNvbi5zdmdcIiBjbGFzc05hbWU9XCJpbWctZmx1aWRcIiAvPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJkZXRlY3QtbXktbG9jYWl0b25cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJjdC1pbWcgY3QtaW1nLXhzXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7c2VsZWN0ZWRUZXN0cy5sZW5ndGh9IFNlbGVjdGVkIEl0ZW1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2hlYWRlcj5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzZWN0aW9uIGNsYXNzTmFtZT1cIndyYXAgYWxsLXRlc3Qtc2NyZWVuIFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIndpZGdldC1wYW5lbFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwYW5lbC1jb250ZW50IHBkLTBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dWwgY2xhc3NOYW1lPVwibGlzdCBhbGwtdGVzdC1saXN0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt0ZXN0c31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc2VjdGlvbj5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwidi1idG4gdi1idG4tcHJpbWFyeSBidG4tbGcgZml4ZWQgaG9yaXpvbnRhbCBib3R0b20gbm8tcm91bmQgdGV4dC1sZ1wiIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5oaXN0b3J5LmdvKC0xKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19PkRvbmU8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PiA6IDxMb2FkZXIgLz5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgVGVzdFNlbGVjdG9yVmlld1xuIiwiaW1wb3J0IFRlc3RTZWxlY3RvciBmcm9tICcuL1Rlc3RTZWxlY3RvcidcbmV4cG9ydCBkZWZhdWx0IFRlc3RTZWxlY3RvciIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG5pbXBvcnQgRG9jdG9yUHJvZmlsZUNhcmQgZnJvbSAnLi4vY29tbW9ucy9kb2N0b3JQcm9maWxlQ2FyZC9pbmRleC5qcydcbmltcG9ydCBUaW1lU2xvdFNlbGVjdG9yIGZyb20gJy4uLy4uL2NvbW1vbnMvdGltZVNsb3RTZWxlY3Rvci9pbmRleC5qcydcbmltcG9ydCBTZWxlY3RlZENsaW5pYyBmcm9tICcuLi9jb21tb25zL3NlbGVjdGVkQ2xpbmljL2luZGV4LmpzJ1xuXG5jbGFzcyBBcHBvaW50bWVudFNsb3QgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgc2VsZWN0ZWREb2N0b3I6IG51bGwsXG4gICAgICAgICAgICBzZWxlY3RlZENsaW5pYzogbnVsbCxcbiAgICAgICAgICAgIHRpbWVTbG90czogbnVsbCxcbiAgICAgICAgICAgIHNlbGVjdGVkU2xvdCA6IG51bGxcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByb2NlZWQoKSB7XG4gICAgICAgIGlmKHRoaXMuc3RhdGUuc2VsZWN0ZWRTbG90KXtcbiAgICAgICAgICAgIHRoaXMuY29udGV4dC5yb3V0ZXIuaGlzdG9yeS5wdXNoKGAvZG9jdG9ycHJvZmlsZS8ke3RoaXMuc3RhdGUuc2VsZWN0ZWREb2N0b3J9LyR7dGhpcy5zdGF0ZS5zZWxlY3RlZENsaW5pY30vYm9va2RldGFpbHM/dD0ke3RoaXMuc3RhdGUuc2VsZWN0ZWRTbG90LnN0YXJ0fWApXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZWxlY3RUaW1lU2xvdChzbG90KXtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHNlbGVjdGVkU2xvdDogc2xvdCB9KVxuICAgIH1cblxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgICBsZXQgZG9jdG9ySWQgPSB0aGlzLnByb3BzLm1hdGNoLnBhcmFtcy5pZFxuICAgICAgICBsZXQgY2xpbmljSWQgPSB0aGlzLnByb3BzLm1hdGNoLnBhcmFtcy5jbGluaWNJZFxuICAgICAgICBpZiAoZG9jdG9ySWQgJiYgY2xpbmljSWQpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBzZWxlY3RlZERvY3RvcjogZG9jdG9ySWQsIHNlbGVjdGVkQ2xpbmljOiBjbGluaWNJZCB9KVxuICAgICAgICAgICAgdGhpcy5wcm9wcy5nZXREb2N0b3JCeUlkKGRvY3RvcklkKVxuXG4gICAgICAgICAgICB0aGlzLnByb3BzLmdldFRpbWVTbG90cyhkb2N0b3JJZCwgY2xpbmljSWQsICh0aW1lU2xvdHMpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgdGltZVNsb3RzIH0pXG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhdGljIGNvbnRleHRUeXBlcyA9IHtcbiAgICAgICAgcm91dGVyOiAoKSA9PiBudWxsXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFwcG9pbnRtZW50U2xvdFwiPlxuXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnByb3BzLkRPQ1RPUlNbdGhpcy5zdGF0ZS5zZWxlY3RlZERvY3Rvcl0gP1xuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8RG9jdG9yUHJvZmlsZUNhcmRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGlkZUJvdHRvbT17dHJ1ZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGlkZUJvb2tOb3c9e3RydWV9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRldGFpbHM9e3RoaXMucHJvcHMuRE9DVE9SU1t0aGlzLnN0YXRlLnNlbGVjdGVkRG9jdG9yXX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxTZWxlY3RlZENsaW5pY1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZERvY3Rvcj17dGhpcy5wcm9wcy5ET0NUT1JTW3RoaXMuc3RhdGUuc2VsZWN0ZWREb2N0b3JdfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZENsaW5pYz17dGhpcy5zdGF0ZS5zZWxlY3RlZENsaW5pY31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZS50aW1lU2xvdHMgP1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPFRpbWVTbG90U2VsZWN0b3JcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aW1lU2xvdHM9e3RoaXMuc3RhdGUudGltZVNsb3RzfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdFRpbWVTbG90PSB7dGhpcy5zZWxlY3RUaW1lU2xvdC5iaW5kKHRoaXMpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLz4gOiAnJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cInByb2NlZWRidG5cIiBvbkNsaWNrPXt0aGlzLnByb2NlZWQuYmluZCh0aGlzKX0+UHJvY2VlZDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+IDogXCJcIlxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IEFwcG9pbnRtZW50U2xvdFxuIiwiaW1wb3J0IEFwcG9pbnRtZW50U2xvdCBmcm9tICcuL0FwcG9pbnRtZW50U2xvdC5qcydcblxuZXhwb3J0IGRlZmF1bHQgQXBwb2ludG1lbnRTbG90IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBTdGVwcGVyLCB7IFN0ZXAsIFN0ZXBMYWJlbCB9IGZyb20gJ21hdGVyaWFsLXVpL1N0ZXBwZXInO1xuXG5pbXBvcnQgQ2FsSWNvbiBmcm9tICdtYXRlcmlhbC11aS1pY29ucy9DYWxsJztcblxuXG5jbGFzcyBCb29raW5nVmlldyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJvb2tpbmdcIj5cbiAgICAgICAgICAgICAgICA8U3RlcHBlciBhY3RpdmVTdGVwPXswfSBhbHRlcm5hdGl2ZUxhYmVsPlxuICAgICAgICAgICAgICAgICAgICA8U3RlcCBrZXk9ezB9PlxuICAgICAgICAgICAgICAgICAgICAgICAgPFN0ZXBMYWJlbD57XCJBcHBvaW50bWVudCBSZXF1ZXN0ZWRcIn08L1N0ZXBMYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgPC9TdGVwPlxuICAgICAgICAgICAgICAgICAgICA8U3RlcCBrZXk9ezF9PlxuICAgICAgICAgICAgICAgICAgICAgICAgPFN0ZXBMYWJlbD57XCJBcHBvaW50bWVudCBDb25maXJtZWRcIn08L1N0ZXBMYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgPC9TdGVwPlxuICAgICAgICAgICAgICAgICAgICA8U3RlcCBrZXk9ezJ9PlxuICAgICAgICAgICAgICAgICAgICAgICAgPFN0ZXBMYWJlbD57XCJBcHBvaW50bWVudCBDb21wbGV0ZVwifTwvU3RlcExhYmVsPlxuICAgICAgICAgICAgICAgICAgICA8L1N0ZXA+XG4gICAgICAgICAgICAgICAgPC9TdGVwcGVyPlxuICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInJlcXVlc3RMaW5lXCI+V2UgaGF2ZSByZXF1ZXN0ZWQgRHIuU21pdGggdG8gY29uZmlybSB5b3VyIGFwcG9pbnRtZW50PC9wPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGF0aWVudE5hbWVcIj5cbiAgICAgICAgICAgICAgICAgICAgPHA+Zm9yPC9wPlxuICAgICAgICAgICAgICAgICAgICA8cD5CcmlqZXNoIEt1bWFyPC9wPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJkZXRhaWxzXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJsYmxcIj5XaXRoPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiY250bnRcIj5Eci4gU3RldmUgU21pdGg8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwibGJsXCI+V2hlcmU8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJjbnRudFwiPlNhcnZvZGF5YSBDbGluaWMsICMgMzYxLCBTZWN0b3IgNTAsIEd1cmdhb248L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwibGJsXCI+V2hlbjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImNudG50XCI+V2VkbmVzZGF5LCBKdW5lIDI3LCAyMDE4LCAxMTo0NUFNPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImxibFwiPlJlZmVyZW5jZSM8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJjbnRudFwiPkhVVkhKQjg3SEpCSkg8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJyZXF1ZXN0XCI+UmVxdWVzdCBSZS1TY2hlZHVsZS9DYW5jZWw8L2J1dHRvbj5cblxuICAgICAgICAgICAgICAgIDxDYWxJY29uIGNsYXNzTmFtZT1cImNhbGxJY29uXCIvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IEJvb2tpbmdWaWV3XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgRG9jdG9yUHJvZmlsZUNhcmQgZnJvbSAnLi4vY29tbW9ucy9kb2N0b3JQcm9maWxlQ2FyZC9pbmRleC5qcydcbmltcG9ydCBDbGluaWNTZWxlY3RvciBmcm9tICcuLi9jb21tb25zL2NsaW5pY1NlbGVjdG9yL2luZGV4LmpzJ1xuXG5jbGFzcyBDbGluaWNMaXN0VmlldyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgICBzZWxlY3RlZERvY3RvcjogbnVsbFxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIGxldCBkb2N0b3JJZCA9IHRoaXMucHJvcHMubWF0Y2gucGFyYW1zLmlkXG4gICAgICAgIGlmIChkb2N0b3JJZCkge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHNlbGVjdGVkRG9jdG9yOiBkb2N0b3JJZCB9KVxuICAgICAgICAgICAgdGhpcy5wcm9wcy5nZXREb2N0b3JCeUlkKGRvY3RvcklkKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImRvY3RvclByb2ZpbGVcIj5cblxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5ET0NUT1JTW3RoaXMuc3RhdGUuc2VsZWN0ZWREb2N0b3JdID9cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPERvY3RvclByb2ZpbGVDYXJkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhpZGVCb3R0b209e3RydWV9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhpZGVCb29rTm93PXt0cnVlfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXRhaWxzPXt0aGlzLnByb3BzLkRPQ1RPUlNbdGhpcy5zdGF0ZS5zZWxlY3RlZERvY3Rvcl19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Q2xpbmljU2VsZWN0b3JcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGV0YWlscz17dGhpcy5wcm9wcy5ET0NUT1JTW3RoaXMuc3RhdGUuc2VsZWN0ZWREb2N0b3JdfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7Li4udGhpcy5wcm9wc31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+IDogXCJcIlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBDbGluaWNMaXN0Vmlld1xuIiwiaW1wb3J0IENsaW5pY0xpc3RWaWV3IGZyb20gJy4vQ2xpbmljTGlzdFZpZXcuanMnXG5cbmV4cG9ydCBkZWZhdWx0IENsaW5pY0xpc3RWaWV3IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cbmltcG9ydCBDbG9ja0ljb24gZnJvbSAnbWF0ZXJpYWwtdWktaWNvbnMvQXZUaW1lcic7XG5pbXBvcnQgUmlnaHRBcnJvd0ljb24gZnJvbSAnbWF0ZXJpYWwtdWktaWNvbnMvS2V5Ym9hcmRBcnJvd1JpZ2h0JztcbmltcG9ydCBNb25leUljb24gZnJvbSAnbWF0ZXJpYWwtdWktaWNvbnMvQXR0YWNoTW9uZXknO1xuXG5cbmNsYXNzIENsaW5pY1NlbGVjdG9yIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICB9XG5cbiAgICBzZWxlY3RDbGluaWMoY2xpbmljSWQpIHtcbiAgICAgICAgbGV0IGRvY3RvcklkID0gdGhpcy5wcm9wcy5tYXRjaC5wYXJhbXMuaWRcbiAgICAgICAgdGhpcy5jb250ZXh0LnJvdXRlci5oaXN0b3J5LnB1c2goYC9kb2N0b3Jwcm9maWxlLyR7ZG9jdG9ySWR9LyR7Y2xpbmljSWR9L2Jvb2tgKVxuICAgIH1cblxuICAgIHN0YXRpYyBjb250ZXh0VHlwZXMgPSB7XG4gICAgICAgIHJvdXRlcjogKCkgPT4gbnVsbFxuICAgIH1cblxuICAgIGdldFRpbWUodW5peF90aW1lc3RhbXApIHtcbiAgICAgICAgdmFyIGRhdGUgPSBuZXcgRGF0ZSh1bml4X3RpbWVzdGFtcCAqIDEwMDApO1xuICAgICAgICB2YXIgaG91cnMgPSBkYXRlLmdldEhvdXJzKCk7XG4gICAgICAgIHZhciBtaW51dGVzID0gXCIwXCIgKyBkYXRlLmdldE1pbnV0ZXMoKTtcbiAgICAgICAgcmV0dXJuIGhvdXJzICsgJzonICsgbWludXRlcy5zdWJzdHIoLTIpXG4gICAgfVxuXG4gICAgZ2V0QXZhaWxhYmlsaXR5KGF2YWlsYWJpbGl0eSkge1xuICAgICAgICBpZiAoYXZhaWxhYmlsaXR5KSB7XG4gICAgICAgICAgICBsZXQgeyBuZXh0QXZhaWxhYmxlIH0gPSBhdmFpbGFiaWxpdHlcbiAgICAgICAgICAgIGlmIChuZXh0QXZhaWxhYmxlWzBdKSB7XG4gICAgICAgICAgICAgICAgbGV0IGRhdGUgPSBuZXcgRGF0ZShuZXh0QXZhaWxhYmxlWzBdLmZyb20pLnRvRGF0ZVN0cmluZygpXG4gICAgICAgICAgICAgICAgbGV0IHRpbWVTdGFydCA9IHRoaXMuZ2V0VGltZShuZXh0QXZhaWxhYmxlWzBdLmZyb20pXG4gICAgICAgICAgICAgICAgbGV0IHRpbWVFbmQgPSB0aGlzLmdldFRpbWUobmV4dEF2YWlsYWJsZVswXS50bylcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICBkYXRlLCB0aW1lU3RhcnQsIHRpbWVFbmQsIGZlZTogbmV4dEF2YWlsYWJsZVswXS5mZWVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4geyBkYXRlOiAnJywgdGltZVN0YXJ0OiAnJywgdGltZUVuZDogJycsIGZlZTogeyBhbW91bnQ6ICcnIH0gfVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICBsZXQgeyBhdmFpbGFiaWxpdHkgfSA9IHRoaXMucHJvcHMuZGV0YWlsc1xuXG4gICAgICAgIGF2YWlsYWJpbGl0eSA9IGF2YWlsYWJpbGl0eS5tYXAoKGNsaW5pYykgPT4ge1xuICAgICAgICAgICAgY2xpbmljLnRpbWVBdmFpbGFibGUgPSB0aGlzLmdldEF2YWlsYWJpbGl0eShjbGluaWMpXG4gICAgICAgICAgICByZXR1cm4gY2xpbmljXG4gICAgICAgIH0pXG5cblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjbGluaWNTZWxlY3RvclwiPlxuICAgICAgICAgICAgICAgIDxoNT5Eci4gU3RldmUgaXMgYXZhaWxhYmxlIGF0PC9oNT5cblxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgYXZhaWxhYmlsaXR5Lm1hcCgoY2xpbmljLCBpKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gPGRpdiBrZXk9e2l9IGNsYXNzTmFtZT1cImNsaW5pY1wiIG9uQ2xpY2s9e3RoaXMuc2VsZWN0Q2xpbmljLmJpbmQodGhpcyxjbGluaWMuaWQpfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm5hbWVcIj57Y2xpbmljLm5hbWUgKyBcIiwgXCIgKyBjbGluaWMuYWRkcmVzc308L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImRldGFpbHNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPENsb2NrSWNvbiBjbGFzc05hbWU9XCJjbG9ja0ljb25cIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8TW9uZXlJY29uIGNsYXNzTmFtZT1cIm1vbmV5SWNvblwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsaW5pYy5kYXlzLm1hcCgoZGF5LCBpKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiA8c3BhblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5PXtpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtkYXkuaXNBdmFpbGFibGUgPyBcImlzQXZhaWxhYmxlXCIgOiBcIlwifT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtkYXkuZGF5WzBdfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtjbGluaWMudGltZUF2YWlsYWJsZS50aW1lU3RhcnR9IHRvIHtjbGluaWMudGltZUF2YWlsYWJsZS50aW1lRW5kfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwPntgRmVlOiBScy4ke2NsaW5pYy50aW1lQXZhaWxhYmxlLmZlZS5hbW91bnR9YH08L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJib29rXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHRcIj5Cb29rPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8UmlnaHRBcnJvd0ljb24gY2xhc3NOYW1lPVwiYm9va0ljb25cIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBDbGluaWNTZWxlY3RvclxuIiwiaW1wb3J0IENsaW5pY1NlbGVjdG9yIGZyb20gJy4vQ2xpbmljU2VsZWN0b3IuanMnXG5cbmV4cG9ydCBkZWZhdWx0IENsaW5pY1NlbGVjdG9yIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cbmNsYXNzIERvY3RvclByb2ZpbGVDYXJkIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICB9XG5cbiAgICBjYXJkQ2xpY2soaWQsIGUpIHtcbiAgICAgICAgLy8gdGhpcy5wcm9wcy5oaXN0b3J5LnB1c2goYC9kb2N0b3Jwcm9maWxlLyR7aWR9YClcbiAgICB9XG5cbiAgICBib29rTm93KGlkLCBlKSB7XG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKClcbiAgICAgICAgLy8gdGhpcy5wcm9wcy5oaXN0b3J5LnB1c2goYC9kb2N0b3Jwcm9maWxlLyR7aWR9L2F2YWlsYWJpbGl0eWApXG4gICAgfVxuXG4gICAgZ2V0UXVhbGlmaWNhdGlvblN0cihxdWFsaWZpY2F0aW9uU3BlY2lhbGl6YXRpb24pIHtcbiAgICAgICAgcmV0dXJuIHF1YWxpZmljYXRpb25TcGVjaWFsaXphdGlvbi5yZWR1Y2UoKHN0ciwgY3VyciwgaSkgPT4ge1xuICAgICAgICAgICAgc3RyICs9IGAke2N1cnIucXVhbGlmaWNhdGlvbn1gXG4gICAgICAgICAgICBpZiAoY3Vyci5zcGVjaWFsaXphdGlvbikge1xuICAgICAgICAgICAgICAgIHN0ciArPSBgIC0gJHtjdXJyLnNwZWNpYWxpemF0aW9ufWBcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChpIDwgcXVhbGlmaWNhdGlvblNwZWNpYWxpemF0aW9uLmxlbmd0aCAtIDEpIHN0ciArPSBgLCBgO1xuICAgICAgICAgICAgcmV0dXJuIHN0clxuICAgICAgICB9LCBcIlwiKVxuICAgIH1cblxuICAgIGdldFRpbWUodW5peF90aW1lc3RhbXApIHtcbiAgICAgICAgdmFyIGRhdGUgPSBuZXcgRGF0ZSh1bml4X3RpbWVzdGFtcCAqIDEwMDApO1xuICAgICAgICB2YXIgaG91cnMgPSBkYXRlLmdldEhvdXJzKCk7XG4gICAgICAgIHZhciBtaW51dGVzID0gXCIwXCIgKyBkYXRlLmdldE1pbnV0ZXMoKTtcbiAgICAgICAgcmV0dXJuIGhvdXJzICsgJzonICsgbWludXRlcy5zdWJzdHIoLTIpXG4gICAgfVxuXG4gICAgZ2V0QXZhaWxhYmlsaXR5KGF2YWlsYWJpbGl0eSkge1xuICAgICAgICBpZiAoYXZhaWxhYmlsaXR5KSB7XG4gICAgICAgICAgICBsZXQgeyBuZXh0QXZhaWxhYmxlIH0gPSBhdmFpbGFiaWxpdHlcbiAgICAgICAgICAgIGlmIChuZXh0QXZhaWxhYmxlWzBdKSB7XG4gICAgICAgICAgICAgICAgbGV0IGRhdGUgPSBuZXcgRGF0ZShuZXh0QXZhaWxhYmxlWzBdLmZyb20pLnRvRGF0ZVN0cmluZygpXG4gICAgICAgICAgICAgICAgbGV0IHRpbWVTdGFydCA9IHRoaXMuZ2V0VGltZShuZXh0QXZhaWxhYmxlWzBdLmZyb20pXG4gICAgICAgICAgICAgICAgbGV0IHRpbWVFbmQgPSB0aGlzLmdldFRpbWUobmV4dEF2YWlsYWJsZVswXS50bylcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICBkYXRlLCB0aW1lU3RhcnQsIHRpbWVFbmQsIGZlZTogbmV4dEF2YWlsYWJsZVswXS5mZWVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4geyBkYXRlOiAnJywgdGltZVN0YXJ0OiAnJywgdGltZUVuZDogJycsIGZlZTogeyBhbW91bnQ6ICcnIH0gfVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICBsZXQge2V4cGVyaWVuY2VfeWVhcnMsIGdlbmRlciwgaG9zcGl0YWwsIGhvc3BpdGFsX2NvdW50LCBuYW1lLCBxdWFsaWZpY2F0aW9uc30gPSB0aGlzLnByb3BzLmRldGFpbHNcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3aWRnZXQgY2FyZCBzZWFyY2gtZHItbGlzdFwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwid2lkZ2V0LWhlYWRlciBkci1pbmZvXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmF0aW5nLWFkZHJlc3MgYmV0YVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHVsIGNsYXNzTmFtZT1cImlubGluZS1saXN0IHJhdHRpbmdcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGk+PHNwYW4gY2xhc3NOYW1lPVwiY3QtaW1nIGN0LWltZy14cyBzdGFyLWljb25cIj48aW1nIHNyYz1cIi9hc3NldHMvaW1nL2N1c3RvbWVyLWljb25zL3N0YXIuc3ZnXCIgY2xhc3NOYW1lPVwiaW1nLWZsdWlkXCIgLz48L3NwYW4+PC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGk+PHNwYW4gY2xhc3NOYW1lPVwiY3QtaW1nIGN0LWltZy14cyBzdGFyLWljb25cIj48aW1nIHNyYz1cIi9hc3NldHMvaW1nL2N1c3RvbWVyLWljb25zL3N0YXIuc3ZnXCIgY2xhc3NOYW1lPVwiaW1nLWZsdWlkXCIgLz48L3NwYW4+PC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGk+PHNwYW4gY2xhc3NOYW1lPVwiY3QtaW1nIGN0LWltZy14cyBzdGFyLWljb25cIj48aW1nIHNyYz1cIi9hc3NldHMvaW1nL2N1c3RvbWVyLWljb25zL3N0YXIuc3ZnXCIgY2xhc3NOYW1lPVwiaW1nLWZsdWlkXCIgLz48L3NwYW4+PC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGk+PHNwYW4gY2xhc3NOYW1lPVwiY3QtaW1nIGN0LWltZy14cyBzdGFyLWljb25cIj48aW1nIHNyYz1cIi9hc3NldHMvaW1nL2N1c3RvbWVyLWljb25zL3N0YXIuc3ZnXCIgY2xhc3NOYW1lPVwiaW1nLWZsdWlkXCIgLz48L3NwYW4+PC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGk+PHNwYW4gY2xhc3NOYW1lPVwiY3QtaW1nIGN0LWltZy14cyBzdGFyLWljb25cIj48aW1nIHNyYz1cIi9hc3NldHMvaW1nL2N1c3RvbWVyLWljb25zL2hhbGYtc3Rhci5zdmdcIiBjbGFzc05hbWU9XCJpbWctZmx1aWRcIiAvPjwvc3Bhbj48L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwPjxzcGFuIGNsYXNzTmFtZT1cImN0LWltZyBjdC1pbWcteHNcIj48aW1nIHNyYz1cIi9hc3NldHMvaW1nL2N1c3RvbWVyLWljb25zL21hcC1tYXJrZXItYmx1ZS5zdmdcIiBjbGFzc05hbWU9XCJpbWctZmx1aWRcIiAvPjwvc3Bhbj57aG9zcGl0YWwuYWRkcmVzc308L3A+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFscGhhIGRyLW5hbWVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbWcgc3JjPVwiL2Fzc2V0cy9pbWcvY3VzdG9tZXItaWNvbnMvdXNlci5wbmdcIiBjbGFzc05hbWU9XCJpbWctZmx1aWRcIiAvPiB7bmFtZX1cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3aWRnZXQtY29udGVudFwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJldGEgb3RoZXItaW5mbyB0ZXh0LXJpZ2h0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cInYtYnRuIHYtYnRuLXByaW1hcnkgYnRuLXNtXCI+Qm9vayBOb3c8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicHJpY2luZ1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtcHJpbWFyeSBmdy03MDAgbmV3LXByaWNlXCI+UnMge2hvc3BpdGFsLmRpc2NvdW50ZWRfZmVlc30gPHNwYW4gY2xhc3NOYW1lPVwib2xkLXByaWNlXCI+UnMge2hvc3BpdGFsLmZlZXN9PC9zcGFuPjwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhbHBoYSBkci1leHAtZGV0YWlsc1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwiZHItZGVzZyB0ZXh0LW1kXCI+e3RoaXMuZ2V0UXVhbGlmaWNhdGlvblN0cihxdWFsaWZpY2F0aW9ucyl9PC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1zbSBmdy01MDAgdGV4dC1saWdodFwiPntleHBlcmllbmNlX3llYXJzfSBZZWFycyBvZiBFeHBlcmluY2U8L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXNtIGZ3LTUwMCB0ZXh0LWxpZ2h0XCI+RXggLSBBSUlNUywgIEV4LSBGb3J0aXM8L3A+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwid2lkZ2V0LWZvb3RlciBjYXJkLWZvb3RlclwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtNlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwPjxpbWcgc3JjPVwiL2Fzc2V0cy9pbWcvY3VzdG9tZXItaWNvbnMvaG9tZS5zdmdcIiBjbGFzc05hbWU9XCJpbWctZmx1aWRcIiAvPjxzcGFuIGNsYXNzTmFtZT1cIkNsaW5jLW5hbWVcIj57aG9zcGl0YWwuaG9zcGl0YWxfbmFtZX0gPGJyIC8+JmFtcDsge2hvc3BpdGFsX2NvdW50LTF9IE1vcmU8L3NwYW4+PC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC02XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHA+PGltZyBzcmM9XCIvYXNzZXRzL2ltZy9jdXN0b21lci1pY29ucy9jbG9jay1ibGFjay5zdmdcIiBjbGFzc05hbWU9XCJpbWctZmx1aWRcIiAvPjxzcGFuIGNsYXNzTmFtZT1cInRpbWUtYXZhaWxhYmlsaXR5XCI+ODowMCBBTSB0byAxMjowMCBQTSA8YnIgLz4yOjAwIFBNIHRvIDc6MDAgUE08L3NwYW4+PC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IERvY3RvclByb2ZpbGVDYXJkXG4iLCJpbXBvcnQgRG9jdG9yUHJvZmlsZUNhcmQgZnJvbSAnLi9Eb2N0b3JQcm9maWxlQ2FyZC5qcydcblxuZXhwb3J0IGRlZmF1bHQgRG9jdG9yUHJvZmlsZUNhcmQiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5jbGFzcyBTZWxlY3RlZENsaW5pYyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG5cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN0YXRpYyBjb250ZXh0VHlwZXMgPSB7XG4gICAgICAgIHJvdXRlcjogKCkgPT4gbnVsbFxuICAgIH1cblx0XG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIGxldCB7IHNlbGVjdGVkRG9jdG9yLCBzZWxlY3RlZENsaW5pYyB9ID0gdGhpcy5wcm9wc1xuXG4gICAgICAgIGxldCBjbGluaWNEYXRhID0gc2VsZWN0ZWREb2N0b3IuYXZhaWxhYmlsaXR5LmZpbHRlcigoY2xpbmljKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gY2xpbmljLmlkID09IHNlbGVjdGVkQ2xpbmljXG4gICAgICAgIH0pWzBdXG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic2VsZWN0ZWRDbGluaWNcIj5cbiAgICAgICAgICAgICAgICA8aDU+U2VsZWN0ZWQgQ2xpbmljPC9oNT5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJjbGluaWNOYW1lXCI+eyBjbGluaWNEYXRhLm5hbWUgKyBcIiwgXCIgKyBjbGluaWNEYXRhLmFkZHJlc3MgfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmZWVcIj5GZWU6IFJzLntjbGluaWNEYXRhLm5leHRBdmFpbGFibGVbMF0uZmVlLmFtb3VudH08L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgU2VsZWN0ZWRDbGluaWNcbiIsImltcG9ydCBTZWxlY3RlZENsaW5pYyBmcm9tICcuL1NlbGVjdGVkQ2xpbmljLmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBTZWxlY3RlZENsaW5pYyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmNvbnN0IGRlYm91bmNlciA9IChmbiwgZGVsYXkpID0+IHtcbiAgICBsZXQgdGltZXIgPSBudWxsXG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVyKVxuICAgICAgICB0aW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgZm4uY2FsbCh0aGlzKVxuICAgICAgICB9LCBkZWxheSlcbiAgICB9XG59XG5cblxuY2xhc3MgQ3JpdGVyaWFTZWFyY2hWaWV3IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIHNlYXJjaFZhbHVlOiAnJyxcbiAgICAgICAgICAgIHNlYXJjaFJlc3VsdHM6IFtdXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgdGhpcy5nZXRTZWFyY2hSZXN1bHRzID0gZGVib3VuY2VyKHRoaXMuZ2V0U2VhcmNoUmVzdWx0cy5iaW5kKHRoaXMpLCAxMDAwKVxuICAgICAgICBsZXQgaW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndG9wQ3JpdGVyaWFTZWFyY2gnKVxuICAgICAgICBpbnB1dC5mb2N1cygpXG4gICAgfVxuXG4gICAgaW5wdXRIYW5kbGVyKGUpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHNlYXJjaFZhbHVlOiBlLnRhcmdldC52YWx1ZSB9KVxuICAgICAgICB0aGlzLmdldFNlYXJjaFJlc3VsdHMoKVxuICAgIH1cblxuICAgIGdldFNlYXJjaFJlc3VsdHMoKSB7XG4gICAgICAgIHRoaXMucHJvcHMuZ2V0Q3JpdGVyaWFSZXN1bHRzKHRoaXMuc3RhdGUuc2VhcmNoVmFsdWUsIChzZWFyY2hSZXN1bHRzKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgc2VhcmNoUmVzdWx0czogc2VhcmNoUmVzdWx0cy5yZXN1bHQgfSlcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBhZGRDcml0ZXJpYShjcml0ZXJpYSwgdHlwZSkge1xuICAgICAgICBjcml0ZXJpYS50eXBlID0gdHlwZVxuICAgICAgICB0aGlzLnByb3BzLnRvZ2dsZUNyaXRlcmlhKGNyaXRlcmlhKVxuICAgICAgICB0aGlzLmNvbnRleHQucm91dGVyLmhpc3RvcnkuZ29CYWNrKClcbiAgICB9XG5cbiAgICBzdGF0aWMgY29udGV4dFR5cGVzID0ge1xuICAgICAgICByb3V0ZXI6ICgpID0+IG51bGxcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibG9jYXRpb25TZWFyY2hcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxvY2F0aW9uU2VhcmNoQm94XCI+XG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCBjbGFzc05hbWU9XCJ0b3BTZWFyY2hcIiBpZD1cInRvcENyaXRlcmlhU2VhcmNoXCIgb25DaGFuZ2U9e3RoaXMuaW5wdXRIYW5kbGVyLmJpbmQodGhpcyl9IHZhbHVlPXt0aGlzLnN0YXRlLnNlYXJjaFZhbHVlfSBwbGFjZWhvbGRlcj1cIlNlYXJjaCBmb3Igc3ltcHRvbXMsIERvY3RvcywgY29uZGl0aW9ucyAuLmV0Y1wiLz5cbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZS5zZWFyY2hSZXN1bHRzLm1hcCgodHlwZSxpKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPVwic2VhcmNoUmVzdWx0VHlwZVwiIGtleT17aX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwPnt0eXBlLm5hbWV9PC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlLmRhdGEubWFwKChyZXN1bHREYXRhLGopID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gPHNwYW4ga2V5PXtqfSBjbGFzc05hbWU9XCJwYWMtaXRlbVwiIG9uQ2xpY2s9e3RoaXMuYWRkQ3JpdGVyaWEuYmluZCh0aGlzLCByZXN1bHREYXRhLCB0eXBlLnR5cGUpfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3Jlc3VsdERhdGEubmFtZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBDcml0ZXJpYVNlYXJjaFZpZXdcbiIsImltcG9ydCBDcml0ZXJpYVNlYXJjaFZpZXcgZnJvbSAnLi9Dcml0ZXJpYVNlYXJjaFZpZXcuanMnXG5cbmV4cG9ydCBkZWZhdWx0IENyaXRlcmlhU2VhcmNoVmlldyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCBEb2N0b3JQcm9maWxlQ2FyZCBmcm9tICcuLi9jb21tb25zL2RvY3RvclByb2ZpbGVDYXJkL2luZGV4LmpzJ1xuaW1wb3J0IEFib3V0RG9jdG9yIGZyb20gJy4uL2RvY3RvclByb2ZpbGUvYWJvdXREb2N0b3IvaW5kZXguanMnXG5pbXBvcnQgUHJvZmVzc2lvbmFsR3JhcGggZnJvbSAnLi4vZG9jdG9yUHJvZmlsZS9wcm9mZXNzaW9uYWxHcmFwaC9pbmRleC5qcydcbmltcG9ydCBDbGluaWNTZWxlY3RvciBmcm9tICcuLi9jb21tb25zL2NsaW5pY1NlbGVjdG9yL2luZGV4LmpzJ1xuXG5jbGFzcyBEb2N0b3JQcm9maWxlVmlldyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgICBzZWxlY3RlZERvY3RvciA6IG51bGxcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgICBsZXQgZG9jdG9ySWQgPSB0aGlzLnByb3BzLm1hdGNoLnBhcmFtcy5pZFxuICAgICAgICBpZiAoZG9jdG9ySWQpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe3NlbGVjdGVkRG9jdG9yIDogZG9jdG9ySWR9KVxuICAgICAgICAgICAgdGhpcy5wcm9wcy5nZXREb2N0b3JCeUlkKGRvY3RvcklkKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImRvY3RvclByb2ZpbGVcIj5cblxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5ET0NUT1JTW3RoaXMuc3RhdGUuc2VsZWN0ZWREb2N0b3JdID9cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPERvY3RvclByb2ZpbGVDYXJkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhpZGVCb3R0b209e3RydWV9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRldGFpbHM9e3RoaXMucHJvcHMuRE9DVE9SU1t0aGlzLnN0YXRlLnNlbGVjdGVkRG9jdG9yXX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxBYm91dERvY3RvciAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxDbGluaWNTZWxlY3RvclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXRhaWxzPXt0aGlzLnByb3BzLkRPQ1RPUlNbdGhpcy5zdGF0ZS5zZWxlY3RlZERvY3Rvcl19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsuLi50aGlzLnByb3BzfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPFByb2Zlc3Npb25hbEdyYXBoIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj4gOiBcIlwiXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IERvY3RvclByb2ZpbGVWaWV3XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcblxuY2xhc3MgQWJvdXREb2N0b3IgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFib3V0RG9jdG9yXCI+XG4gICAgICAgICAgICAgICAgPGg1PkFib3V0IERyLiBTdGV2ZSBSYXk8L2g1PlxuICAgICAgICAgICAgICAgIDxwPkxvcmVtIGlwc3VtIGRvbG9yIHNpdCBhbWV0LCBkb2xvciB1dCB2ZXN0aWJ1bHVtIGJsYW5kaXQsIHR1cnBpcyBmdXNjZS4gTGFib3JlIHBvdGVudGkgdml2YW11cyBvZGlvIGFyY3UgdmVzdGlidWx1bS4gSGVuZHJlcml0IG51bGxhIGNvbnNlY3RldHVlciB0cmlzdGlxdWUgYW50ZSBsZW8sIHVsbGFtY29ycGVyIGN1cnN1cyBydXRydW0gPC9wPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IEFib3V0RG9jdG9yXG4iLCJpbXBvcnQgQWJvdXREb2N0b3IgZnJvbSAnLi9BYm91dERvY3Rvci5qcydcblxuZXhwb3J0IGRlZmF1bHQgQWJvdXREb2N0b3IiLCJpbXBvcnQgRG9jdG9yUHJvZmlsZVZpZXcgZnJvbSAnLi9Eb2N0b3JQcm9maWxlVmlldy5qcydcblxuZXhwb3J0IGRlZmF1bHQgRG9jdG9yUHJvZmlsZVZpZXciLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcblxuaW1wb3J0IEV4cGFuc2lvblBhbmVsLCB7XG4gICAgRXhwYW5zaW9uUGFuZWxTdW1tYXJ5LFxuICAgIEV4cGFuc2lvblBhbmVsRGV0YWlscyxcbn0gZnJvbSAnbWF0ZXJpYWwtdWkvRXhwYW5zaW9uUGFuZWwnO1xuaW1wb3J0IEV4cGFuZE1vcmVJY29uIGZyb20gJ21hdGVyaWFsLXVpLWljb25zL0V4cGFuZE1vcmUnO1xuXG5jbGFzcyBQcm9mZXNzaW9uYWxHcmFwaCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicHJvZmVzc2lvbmFsR3JhcGhcIj5cbiAgICAgICAgICAgICAgICA8aDU+UHJvZmVzc2lvbmFsIEdyYXBoPC9oNT5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImVwYW5lbFwiPlxuICAgICAgICAgICAgICAgICAgICA8RXhwYW5zaW9uUGFuZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICA8RXhwYW5zaW9uUGFuZWxTdW1tYXJ5IGV4cGFuZEljb249ezxFeHBhbmRNb3JlSWNvbiAvPn0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgRWR1Y2F0aW9uXG4gICAgICAgICAgICAgICAgICAgICAgICA8L0V4cGFuc2lvblBhbmVsU3VtbWFyeT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxFeHBhbnNpb25QYW5lbERldGFpbHM+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L0V4cGFuc2lvblBhbmVsRGV0YWlscz5cbiAgICAgICAgICAgICAgICAgICAgPC9FeHBhbnNpb25QYW5lbD5cbiAgICAgICAgICAgICAgICAgICAgPEV4cGFuc2lvblBhbmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgPEV4cGFuc2lvblBhbmVsU3VtbWFyeSBleHBhbmRJY29uPXs8RXhwYW5kTW9yZUljb24gLz59PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIE1lbWJlcnNoaXBzXG4gICAgICAgICAgICAgICAgICAgICAgICA8L0V4cGFuc2lvblBhbmVsU3VtbWFyeT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxFeHBhbnNpb25QYW5lbERldGFpbHM+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L0V4cGFuc2lvblBhbmVsRGV0YWlscz5cbiAgICAgICAgICAgICAgICAgICAgPC9FeHBhbnNpb25QYW5lbD5cbiAgICAgICAgICAgICAgICAgICAgPEV4cGFuc2lvblBhbmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgPEV4cGFuc2lvblBhbmVsU3VtbWFyeSBleHBhbmRJY29uPXs8RXhwYW5kTW9yZUljb24gLz59PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEV4cGVyaWVuY2VcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvRXhwYW5zaW9uUGFuZWxTdW1tYXJ5PlxuICAgICAgICAgICAgICAgICAgICAgICAgPEV4cGFuc2lvblBhbmVsRGV0YWlscz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvRXhwYW5zaW9uUGFuZWxEZXRhaWxzPlxuICAgICAgICAgICAgICAgICAgICA8L0V4cGFuc2lvblBhbmVsPlxuICAgICAgICAgICAgICAgICAgICA8RXhwYW5zaW9uUGFuZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICA8RXhwYW5zaW9uUGFuZWxTdW1tYXJ5IGV4cGFuZEljb249ezxFeHBhbmRNb3JlSWNvbiAvPn0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgU3BlY2lhbGl6YXRpb25zXG4gICAgICAgICAgICAgICAgICAgICAgICA8L0V4cGFuc2lvblBhbmVsU3VtbWFyeT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxFeHBhbnNpb25QYW5lbERldGFpbHM+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L0V4cGFuc2lvblBhbmVsRGV0YWlscz5cbiAgICAgICAgICAgICAgICAgICAgPC9FeHBhbnNpb25QYW5lbD5cbiAgICAgICAgICAgICAgICAgICAgPEV4cGFuc2lvblBhbmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgPEV4cGFuc2lvblBhbmVsU3VtbWFyeSBleHBhbmRJY29uPXs8RXhwYW5kTW9yZUljb24gLz59PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEF3YXJkc1xuICAgICAgICAgICAgICAgICAgICAgICAgPC9FeHBhbnNpb25QYW5lbFN1bW1hcnk+XG4gICAgICAgICAgICAgICAgICAgICAgICA8RXhwYW5zaW9uUGFuZWxEZXRhaWxzPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9FeHBhbnNpb25QYW5lbERldGFpbHM+XG4gICAgICAgICAgICAgICAgICAgIDwvRXhwYW5zaW9uUGFuZWw+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgUHJvZmVzc2lvbmFsR3JhcGhcbiIsImltcG9ydCBQcm9mZXNzaW9uYWxHcmFwaCBmcm9tICcuL1Byb2Zlc3Npb25hbEdyYXBoLmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBQcm9mZXNzaW9uYWxHcmFwaCIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IGF4aW9zIGZyb20gJ2F4aW9zJ1xuXG5jbGFzcyBMb2NhdGlvblNlYXJjaCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgICBzZWFyY2g6IFwiXCIsXG4gICAgICAgICAgICBzZWFyY2hSZXN1bHRzOiBbXVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0TG9jYXRpb24obG9jYXRpb24pIHtcbiAgICAgICAgdmFyIGF1dG8gPSBuZXcgZ29vZ2xlLm1hcHMucGxhY2VzLkF1dG9jb21wbGV0ZVNlcnZpY2UoKVxuXG4gICAgICAgIHZhciByZXF1ZXN0ID0ge1xuICAgICAgICAgICAgaW5wdXQ6IGxvY2F0aW9uLFxuICAgICAgICAgICAgdHlwZXM6IFsnZ2VvY29kZSddLFxuICAgICAgICAgICAgY29tcG9uZW50UmVzdHJpY3Rpb25zOiB7IGNvdW50cnk6ICdpbicgfVxuICAgICAgICB9O1xuICAgICAgICBpZiAobG9jYXRpb24pIHtcbiAgICAgICAgICAgIGF1dG8uZ2V0UGxhY2VQcmVkaWN0aW9ucyhyZXF1ZXN0LCBmdW5jdGlvbiAocmVzdWx0cywgc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHNlYXJjaFJlc3VsdHM6IHJlc3VsdHMgfSlcbiAgICAgICAgICAgIH0uYmluZCh0aGlzKSlcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlucHV0SGFuZGxlcihlKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgc2VhcmNoOiBlLnRhcmdldC52YWx1ZVxuICAgICAgICB9KVxuICAgICAgICB0aGlzLmdldExvY2F0aW9uKGUudGFyZ2V0LnZhbHVlKVxuXG4gICAgfVxuXG4gICAgc2VsZWN0TG9jYXRpb24obG9jYXRpb24pIHtcbiAgICAgICAgbGV0IG1hcCA9IG5ldyBnb29nbGUubWFwcy5NYXAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21hcCcpLCB7XG4gICAgICAgICAgICBjZW50ZXI6IHsgbGF0OiAtMzMuODY3LCBsbmc6IDE1MS4xOTUgfSxcbiAgICAgICAgICAgIHpvb206IDE1XG4gICAgICAgIH0pXG4gICAgICAgIGxldCBzZXJ2aWNlID0gbmV3IGdvb2dsZS5tYXBzLnBsYWNlcy5QbGFjZXNTZXJ2aWNlKG1hcCk7XG4gICAgICAgIHNlcnZpY2UuZ2V0RGV0YWlscyh7XG4gICAgICAgICAgICByZWZlcmVuY2U6IGxvY2F0aW9uLnJlZmVyZW5jZVxuICAgICAgICB9LCBmdW5jdGlvbiAocGxhY2UsIHN0YXR1cykge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5zZWxlY3RMb2NhdGlvbihwbGFjZSlcbiAgICAgICAgICAgIHRoaXMucHJvcHMuaGlzdG9yeS5nbygtMSlcblxuICAgICAgICB9LmJpbmQodGhpcykpXG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIGxldCBpbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0b3BMb2NhdGlvblNlYXJjaCcpXG4gICAgICAgIGlucHV0LmZvY3VzKClcbiAgICB9XG5cbiAgICBzdGF0aWMgY29udGV4dFR5cGVzID0ge1xuICAgICAgICByb3V0ZXI6ICgpID0+IG51bGxcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgPGhlYWRlciBjbGFzc05hbWU9XCJza2luLXdoaXRlIGZpeGVkIGhvcml6b250YWwgdG9wIGxvY2F0aW9uLWRldGVjdC1oZWFkZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250YWluZXItZmx1aWRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtMTJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzZWxlY3QtbG9jYXRpb24tcm93IHRleHQtY2VudGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5oaXN0b3J5LmdvKC0xKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfX0gY2xhc3NOYW1lPVwiY3QtaW1nIGN0LWltZy1tZCBjbG9zZVwiPjxpbWcgc3JjPVwiL2Fzc2V0cy9pbWcvY3VzdG9tZXItaWNvbnMvY2xvc2UtYmxhY2suc3ZnXCIgY2xhc3NOYW1lPVwiaW1nLWZsdWlkXCIgLz48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDQgY2xhc3NOYW1lPVwiZnctNzAwIHRleHQtbWRcIj5TZWxlY3QgTG9jYXRpb248L2g0PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC0xMlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNlYXJjaC1yb3dcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRvbi1ncm91cCBsb2NhdGlvbi1kZXRlY3QtZmllbGRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiB2YWx1ZT17dGhpcy5zdGF0ZS5zZWFyY2h9IG9uQ2hhbmdlPXt0aGlzLmlucHV0SGFuZGxlci5iaW5kKHRoaXMpfSBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2wgaW5wdXQtbWQgc2VhcmNoLWlucHV0IG5vLXNoYWRvd1wiIHBsYWNlaG9sZGVyPVwiU2VsZWN0IGFueSBjaXR5IG9yIGxvY2FsaXR5XCIgaWQ9XCJ0b3BMb2NhdGlvblNlYXJjaFwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiY3QtaW1nIGN0LWltZy1zbSBtYXAtbWFya2VyLWJsdWVcIj48aW1nIHNyYz1cIi9hc3NldHMvaW1nL2N1c3RvbWVyLWljb25zL21hcC1tYXJrZXItYmx1ZS5zdmdcIiBjbGFzc05hbWU9XCJpbWctZmx1aWRcIiAvPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJkZXRlY3QtbXktbG9jYWl0b25cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJjdC1pbWcgY3QtaW1nLXhzXCI+PGltZyBzcmM9XCIvYXNzZXRzL2ltZy9jdXN0b21lci1pY29ucy9ncHMuc3ZnXCIgY2xhc3NOYW1lPVwiaW1nLWZsdWlkXCIgLz48L3NwYW4+RGV0ZWN0IE15IExvY2F0aW9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9oZWFkZXI+XG4gICAgICAgICAgICAgICAgPHNlY3Rpb24gY2xhc3NOYW1lPVwid3JhcCBsb2NhdG9uLWRldGVjdC1zY3JlZW5cIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3aWRnZXQtcGFuZWxcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxoNCBjbGFzc05hbWU9XCJwYW5lbC10aXRsZVwiPlNlYXJjaCBSZXN1bHQ8L2g0PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwYW5lbC1jb250ZW50IHBkLTBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dWwgY2xhc3NOYW1lPVwibGlzdCBjaXR5LWxpc3RcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZS5zZWFyY2hSZXN1bHRzLm1hcCgocmVzdWx0LCBpKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDxsaSBrZXk9e2l9IG9uQ2xpY2s9e3RoaXMuc2VsZWN0TG9jYXRpb24uYmluZCh0aGlzLCByZXN1bHQpfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGE+e3Jlc3VsdC5kZXNjcmlwdGlvbn1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImNpdHktbG9jXCI+Q2l0eTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L3NlY3Rpb24+XG4gICAgICAgICAgICAgICAgPGRpdiBpZD1cIm1hcFwiIHN0eWxlPXt7IGRpc3BsYXk6ICdub25lJyB9fT48L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBMb2NhdGlvblNlYXJjaFxuIiwiaW1wb3J0IExvY2F0aW9uU2VhcmNoIGZyb20gJy4vTG9jYXRpb25TZWFyY2guanMnXG5cblxuZXhwb3J0IGRlZmF1bHQgTG9jYXRpb25TZWFyY2giLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcblxuaW1wb3J0IERvY3RvclByb2ZpbGVDYXJkIGZyb20gJy4uL2NvbW1vbnMvZG9jdG9yUHJvZmlsZUNhcmQvaW5kZXguanMnXG5pbXBvcnQgRGV0YWlsc0Zvcm0gZnJvbSAnLi9kZXRhaWxzRm9ybS9pbmRleC5qcydcbmltcG9ydCBTZWxlY3RlZENsaW5pYyBmcm9tICcuLi9jb21tb25zL3NlbGVjdGVkQ2xpbmljL2luZGV4LmpzJ1xuXG5jbGFzcyBQYXRpZW50RGV0YWlscyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgICBzZWxlY3RlZERvY3RvcjogbnVsbCxcbiAgICAgICAgICAgIHNlbGVjdGVkQ2xpbmljOiBudWxsLFxuICAgICAgICAgICAgc2VsZWN0ZWRTbG90OiBudWxsXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcm9jZWVkKCl7XG4gICAgICAgIHRoaXMuY29udGV4dC5yb3V0ZXIuaGlzdG9yeS5wdXNoKCcvcGF5bWVudCcpXG4gICAgfVxuXG4gICAgZ2V0TG9jYXRpb25QYXJhbSh0YWcpIHtcbiAgICAgICAgLy8gdGhpcyBBUEkgYXNzdW1lcyB0aGUgY29udGV4dCBvZiByZWFjdC1yb3V0ZXItNFxuICAgICAgICBjb25zdCBwYXJhbVN0cmluZyA9IHRoaXMucHJvcHMubG9jYXRpb24uc2VhcmNoXG4gICAgICAgIGNvbnN0IHBhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXMocGFyYW1TdHJpbmcpXG4gICAgICAgIHJldHVybiBwYXJhbXMuZ2V0KHRhZylcbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGxldCBkb2N0b3JJZCA9IHRoaXMucHJvcHMubWF0Y2gucGFyYW1zLmlkXG4gICAgICAgICAgICBsZXQgY2xpbmljSWQgPSB0aGlzLnByb3BzLm1hdGNoLnBhcmFtcy5jbGluaWNJZFxuICAgICAgICAgICAgbGV0IHNlbGVjdGVkU2xvdCA9IHRoaXMuZ2V0TG9jYXRpb25QYXJhbSgndCcpXG4gICAgICAgICAgICBzZWxlY3RlZFNsb3QgPSBuZXcgRGF0ZShwYXJzZUZsb2F0KHNlbGVjdGVkU2xvdCkpXG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIGlmIChkb2N0b3JJZCAmJiBjbGluaWNJZCAmJiBzZWxlY3RlZFNsb3QpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWREb2N0b3I6IGRvY3RvcklkLFxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZENsaW5pYzogY2xpbmljSWQsXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkU2xvdDogc2VsZWN0ZWRTbG90LnRvU3RyaW5nKClcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuZ2V0RG9jdG9yQnlJZChkb2N0b3JJZClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaCAoZSkge1xuXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdGF0aWMgY29udGV4dFR5cGVzID0ge1xuICAgICAgICByb3V0ZXI6ICgpID0+IG51bGxcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGF0aWVudERldGFpbHNcIj5cblxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5ET0NUT1JTW3RoaXMuc3RhdGUuc2VsZWN0ZWREb2N0b3JdID9cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPERvY3RvclByb2ZpbGVDYXJkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhpZGVCb3R0b209e3RydWV9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhpZGVCb29rTm93PXt0cnVlfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXRhaWxzPXt0aGlzLnByb3BzLkRPQ1RPUlNbdGhpcy5zdGF0ZS5zZWxlY3RlZERvY3Rvcl19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8U2VsZWN0ZWRDbGluaWNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWREb2N0b3I9e3RoaXMucHJvcHMuRE9DVE9SU1t0aGlzLnN0YXRlLnNlbGVjdGVkRG9jdG9yXX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRDbGluaWM9e3RoaXMuc3RhdGUuc2VsZWN0ZWRDbGluaWN9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNlbGVjdGVkQXBwb2ludG1lbnRTbG90XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoNT5TZWxlY3RlZCBBcHBvaW50bWVudCBTbG90PC9oNT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiYXBwZGF0ZVwiPkFwcG9pbnRtZW50IERhdGU8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImRhdGVcIj57IHRoaXMuc3RhdGUuc2VsZWN0ZWRTbG90IH08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPERldGFpbHNGb3JtIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJwcm9jZWVkYnRuXCIgb25DbGljaz17dGhpcy5wcm9jZWVkLmJpbmQodGhpcyl9PkNvbmZpcm0gQm9va2luZzwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+IDogXCJcIlxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IFBhdGllbnREZXRhaWxzXG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcblxuY2xhc3MgRGV0YWlsc0Zvcm0gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgcGF0aWVudE5hbWUgOiAnJyxcbiAgICAgICAgICAgIHBhdGllbnRFbWFpbCA6ICcnLFxuICAgICAgICAgICAgcGF0aWVudEdlbmRlciA6ICdtYWxlJyxcbiAgICAgICAgICAgIHBhdGllbnRNb2JpbGUgOiAnJyxcbiAgICAgICAgICAgIG90cCA6JydcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlucHV0SGFuZGxlcih3aGljaCwgZSl7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBbd2hpY2hdIDogZS50YXJnZXQudmFsdWUgfSlcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZGV0YWlsc0Zvcm1cIj5cbiAgICAgICAgICAgICAgICA8aDU+UGxlYXNlIHByb3ZpZGUgcGF0aWVudCBkZXRhaWxzPC9oNT5cblxuICAgICAgICAgICAgICAgIDxpbnB1dCB2YWx1ZT17dGhpcy5zdGF0ZS5wYXRpZW50TmFtZX0gb25DaGFuZ2U9e3RoaXMuaW5wdXRIYW5kbGVyLmJpbmQodGhpcywncGF0aWVudE5hbWUnKX0gY2xhc3NOYW1lPVwicHRuYW1lXCIgcGxhY2Vob2xkZXI9XCJQYXRpZW50IE5hbWUqXCIgLz5cbiAgICAgICAgICAgICAgICA8aW5wdXQgdmFsdWU9e3RoaXMuc3RhdGUucGF0aWVudEVtYWlsfSBvbkNoYW5nZT17dGhpcy5pbnB1dEhhbmRsZXIuYmluZCh0aGlzLCdwYXRpZW50RW1haWwnKX0gY2xhc3NOYW1lPVwicHRlbWFpbFwiIHBsYWNlaG9sZGVyPVwiRW1haWwqXCIgLz5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInB0Z2VuZGVyXCI+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuPkdlbmRlciA6PC9zcGFuPiBcbiAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJyYWRpb1wiIG5hbWU9XCJnZW5kZXJcIiB2YWx1ZT1cIm1hbGVcIiBjaGVja2VkPXt0aGlzLnN0YXRlLnBhdGllbnRHZW5kZXIgPT09IFwibWFsZVwifSBvbkNoYW5nZT17dGhpcy5pbnB1dEhhbmRsZXIuYmluZCh0aGlzLCdwYXRpZW50R2VuZGVyJyl9Lz4gTWFsZVxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInJhZGlvXCIgbmFtZT1cImdlbmRlclwiIHZhbHVlPVwiZmVtYWxlXCIgY2hlY2tlZD17dGhpcy5zdGF0ZS5wYXRpZW50R2VuZGVyID09PSBcImZlbWFsZVwifSBvbkNoYW5nZT17dGhpcy5pbnB1dEhhbmRsZXIuYmluZCh0aGlzLCdwYXRpZW50R2VuZGVyJyl9Lz4gRmVtYWxlXG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGlucHV0IHZhbHVlPXt0aGlzLnN0YXRlLnBhdGllbnRNb2JpbGV9IG9uQ2hhbmdlPXt0aGlzLmlucHV0SGFuZGxlci5iaW5kKHRoaXMsJ3BhdGllbnRNb2JpbGUnKX0gY2xhc3NOYW1lPVwicHRtb2JpbGVcIiBwbGFjZWhvbGRlcj1cIk1vYmlsZSpcIiAvPlxuICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwib3RwYnRuXCI+KFJlKVNlbmQgT1RQPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPGlucHV0IHZhbHVlPXt0aGlzLnN0YXRlLm90cH0gb25DaGFuZ2U9e3RoaXMuaW5wdXRIYW5kbGVyLmJpbmQodGhpcywnb3RwJyl9IGNsYXNzTmFtZT1cInB0b3RwXCIgcGxhY2Vob2xkZXI9XCJFbnRlciBPVFAqXCIgLz5cblxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IERldGFpbHNGb3JtXG4iLCJpbXBvcnQgRGV0YWlsc0Zvcm0gZnJvbSAnLi9EZXRhaWxzRm9ybS5qcydcblxuZXhwb3J0IGRlZmF1bHQgRGV0YWlsc0Zvcm0iLCJpbXBvcnQgUGF0aWVudERldGFpbHMgZnJvbSAnLi9QYXRpZW50RGV0YWlscy5qcydcblxuZXhwb3J0IGRlZmF1bHQgUGF0aWVudERldGFpbHMiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgUGF5bWVudEljb24gZnJvbSAnbWF0ZXJpYWwtdWktaWNvbnMvUGF5bWVudCc7XG5pbXBvcnQgQ2FzaEljb24gZnJvbSAnbWF0ZXJpYWwtdWktaWNvbnMvQXR0YWNoTW9uZXknO1xuXG5jbGFzcyBQYXltZW50VmlldyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgfVxuXG4gICAgcHJvY2VlZCgpe1xuICAgICAgICB0aGlzLmNvbnRleHQucm91dGVyLmhpc3RvcnkucHVzaChcIi9ib29raW5nLzpyZWZJZFwiKVxuICAgIH1cblxuICAgIHN0YXRpYyBjb250ZXh0VHlwZXMgPSB7XG4gICAgICAgIHJvdXRlcjogKCkgPT4gbnVsbFxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwYXltZW50XCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJvZmZlclJvd1wiPlxuICAgICAgICAgICAgICAgICAgICA8c3Bhbj5HZXQgMTAlIGNhc2hiYWNrIGZvciBhbGwgb25saW5lIHBheW1lbnQsIFQmQzwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBheW1lbnRSb3dcIiBvbkNsaWNrPXt0aGlzLnByb2NlZWQuYmluZCh0aGlzKX0+XG4gICAgICAgICAgICAgICAgICAgIDxQYXltZW50SWNvbiBjbGFzc05hbWU9XCJwYXltZW50SWNvblwiIC8+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuPlBheXRtIFdhbGxldDwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBheW1lbnRSb3dcIiBvbkNsaWNrPXt0aGlzLnByb2NlZWQuYmluZCh0aGlzKX0+XG4gICAgICAgICAgICAgICAgICAgIDxQYXltZW50SWNvbiBjbGFzc05hbWU9XCJwYXltZW50SWNvblwiIC8+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuPkNyZWRpdC9EZWJpdC9BVE0gQ2FyZDwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBheW1lbnRSb3dcIiBvbkNsaWNrPXt0aGlzLnByb2NlZWQuYmluZCh0aGlzKX0+XG4gICAgICAgICAgICAgICAgICAgIDxQYXltZW50SWNvbiBjbGFzc05hbWU9XCJwYXltZW50SWNvblwiIC8+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuPk5ldCBCYW5raW5nPC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGF5bWVudFJvd1wiIG9uQ2xpY2s9e3RoaXMucHJvY2VlZC5iaW5kKHRoaXMpfT5cbiAgICAgICAgICAgICAgICAgICAgPENhc2hJY29uIGNsYXNzTmFtZT1cInBheW1lbnRJY29uXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4+UGF5IGluIENhc2g8L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwYXltZW50Um93XCIgb25DbGljaz17dGhpcy5wcm9jZWVkLmJpbmQodGhpcyl9PlxuICAgICAgICAgICAgICAgICAgICA8UGF5bWVudEljb24gY2xhc3NOYW1lPVwicGF5bWVudEljb25cIiAvPlxuICAgICAgICAgICAgICAgICAgICA8c3Bhbj5PbkRvYyBQYXk8L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgUGF5bWVudFZpZXdcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG5pbXBvcnQgQ29tbW9ubHlTZWFyY2hlZCBmcm9tICcuLi8uLi9jb21tb25zL2NvbW1vbmx5U2VhcmNoZWQvaW5kZXguanMnXG5pbXBvcnQgQ3JpdGVyaWFTZWFyY2ggZnJvbSAnLi4vLi4vY29tbW9ucy9jcml0ZXJpYVNlYXJjaCdcblxuY2xhc3MgU2VhcmNoQ3JpdGVyaWFWaWV3IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICB9XG5cbiAgICBzZWFyY2hQcm9jZWVkKCkge1xuICAgICAgICBsZXQgc2VhcmNoRGF0YSA9IHtcbiAgICAgICAgICAgIHNlbGVjdGVkQ3JpdGVyaWFzOiB0aGlzLnByb3BzLnNlbGVjdGVkQ3JpdGVyaWFzLFxuICAgICAgICAgICAgc2VsZWN0ZWRMb2NhdGlvbjogdGhpcy5wcm9wcy5zZWxlY3RlZExvY2F0aW9uLFxuICAgICAgICB9XG4gICAgICAgIHNlYXJjaERhdGEgPSBlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc2VhcmNoRGF0YSkpXG4gICAgICAgIGxldCBmaWx0ZXJEYXRhID0gZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHRoaXMucHJvcHMuZmlsdGVyQ3JpdGVyaWEpKVxuICAgICAgICB0aGlzLnByb3BzLmhpc3RvcnkucHVzaChgL29wZC9zZWFyY2hyZXN1bHRzP3NlYXJjaD0ke3NlYXJjaERhdGF9JmZpbHRlcj0ke2ZpbHRlckRhdGF9YClcbiAgICB9XG5cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgPENyaXRlcmlhU2VhcmNoIHsuLi50aGlzLnByb3BzfSBjaGVja0ZvckxvYWQ9e3RoaXMucHJvcHMuTE9BREVEX1NFQVJDSF9DUklURVJJQV9PUER9IHRpdGxlPVwiU2VhcmNoIEZvciBEaXNlYXNlIG9yIERvY3Rvci5cIiB0eXBlPVwib3BkXCI+XG4gICAgICAgICAgICAgICAgICAgIDxzZWN0aW9uIGNsYXNzTmFtZT1cIndyYXAgd3JhcC0xMDBcIj5cblxuICAgICAgICAgICAgICAgICAgICAgICAgPENvbW1vbmx5U2VhcmNoZWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWFkaW5nPVwiU2VsZWN0ZWQgQ3JpdGVyaWFcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE9e3RoaXMucHJvcHMuc2VsZWN0ZWRDcml0ZXJpYXN9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWQ9e1tdfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvZ2dsZT17dGhpcy5wcm9wcy50b2dnbGVPUERDcml0ZXJpYS5iaW5kKHRoaXMpfVxuICAgICAgICAgICAgICAgICAgICAgICAgLz5cblxuICAgICAgICAgICAgICAgICAgICAgICAgPENvbW1vbmx5U2VhcmNoZWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWFkaW5nPVwiQ29tbW9uIENvbmRpdGlvbnNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJjb25kaXRpb25cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE9e3RoaXMucHJvcHMuY29uZGl0aW9uc31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZD17dGhpcy5wcm9wcy5zZWxlY3RlZENyaXRlcmlhcy5maWx0ZXIoeCA9PiB4LnR5cGUgPT0gJ2NvbmRpdGlvbicpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvZ2dsZT17dGhpcy5wcm9wcy50b2dnbGVPUERDcml0ZXJpYS5iaW5kKHRoaXMpfVxuICAgICAgICAgICAgICAgICAgICAgICAgLz5cblxuICAgICAgICAgICAgICAgICAgICAgICAgPENvbW1vbmx5U2VhcmNoZWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWFkaW5nPVwiQ29tbW9uIFNwZWNpYWxpdGllc1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cInNwZWNpYWxpdHlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE9e3RoaXMucHJvcHMuc3BlY2lhbGl6YXRpb25zfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkPXt0aGlzLnByb3BzLnNlbGVjdGVkQ3JpdGVyaWFzLmZpbHRlcih4ID0+IHgudHlwZSA9PSAnc3BlY2lhbGl0eScpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvZ2dsZT17dGhpcy5wcm9wcy50b2dnbGVPUERDcml0ZXJpYS5iaW5kKHRoaXMpfVxuICAgICAgICAgICAgICAgICAgICAgICAgLz5cblxuICAgICAgICAgICAgICAgICAgICA8L3NlY3Rpb24+XG4gICAgICAgICAgICAgICAgPC9Dcml0ZXJpYVNlYXJjaD5cblxuICAgICAgICAgICAgICAgIDxidXR0b24gb25DbGljaz17dGhpcy5zZWFyY2hQcm9jZWVkLmJpbmQodGhpcyl9IGNsYXNzTmFtZT1cInYtYnRuIHYtYnRuLXByaW1hcnkgYnRuLWxnIGZpeGVkIGhvcml6b250YWwgYm90dG9tIG5vLXJvdW5kIHRleHQtbGdcIj5TaG93IERvY3RvcnM8L2J1dHRvbj5cblxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBTZWFyY2hDcml0ZXJpYVZpZXdcbiIsImltcG9ydCBTZWFyY2hDcml0ZXJpYVZpZXcgZnJvbSAnLi9TZWFyY2hDcml0ZXJpYVZpZXcuanMnXG5cbmV4cG9ydCBkZWZhdWx0IFNlYXJjaENyaXRlcmlhVmlldyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCBEb2N0b3JzTGlzdCBmcm9tICcuLi9zZWFyY2hSZXN1bHRzL2RvY3RvcnNMaXN0L2luZGV4LmpzJ1xuaW1wb3J0IENyaXRlcmlhU2VhcmNoIGZyb20gJy4uLy4uL2NvbW1vbnMvY3JpdGVyaWFTZWFyY2gnXG5pbXBvcnQgVG9wQmFyIGZyb20gJy4vdG9wQmFyJ1xuXG5cbmNsYXNzIFNlYXJjaFJlc3VsdHNWaWV3IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcblxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIHRoaXMuZ2V0RGNvdG9ycygpXG4gICAgfVxuXG4gICAgZ2V0RGNvdG9ycygpIHtcbiAgICAgICAgbGV0IHtcbiAgICAgICAgICAgIHNlbGVjdGVkTG9jYXRpb24sXG4gICAgICAgICAgICBzZWxlY3RlZENyaXRlcmlhcyxcbiAgICAgICAgICAgIGZpbHRlckNyaXRlcmlhXG4gICAgICAgIH0gPSB0aGlzLnByb3BzXG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGxldCBzZWFyY2hTdGF0ZSA9IHRoaXMuZ2V0TG9jYXRpb25QYXJhbSgnc2VhcmNoJylcbiAgICAgICAgICAgIGxldCBmaWx0ZXJDcml0ZXJpYSA9IHRoaXMuZ2V0TG9jYXRpb25QYXJhbSgnZmlsdGVyJylcbiAgICAgICAgICAgIGlmIChmaWx0ZXJDcml0ZXJpYSkge1xuICAgICAgICAgICAgICAgIGZpbHRlckNyaXRlcmlhID0gSlNPTi5wYXJzZShmaWx0ZXJDcml0ZXJpYSlcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZmlsdGVyQ3JpdGVyaWEgPSB7fVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2VhcmNoU3RhdGUgPSBKU09OLnBhcnNlKHNlYXJjaFN0YXRlKVxuICAgICAgICAgICAgdGhpcy5nZXREb2N0b3JMaXN0KHNlYXJjaFN0YXRlLCBmaWx0ZXJDcml0ZXJpYSwgdHJ1ZSlcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihlKVxuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBhcHBseUZpbHRlcnMoZmlsdGVyU3RhdGUpIHtcbiAgICAgICAgbGV0IHNlYXJjaFN0YXRlID0ge1xuICAgICAgICAgICAgc2VsZWN0ZWRDcml0ZXJpYXM6IHRoaXMucHJvcHMuc2VsZWN0ZWRDcml0ZXJpYXMsXG4gICAgICAgICAgICBzZWxlY3RlZExvY2F0aW9uOiB0aGlzLnByb3BzLnNlbGVjdGVkTG9jYXRpb24sXG4gICAgICAgIH1cbiAgICAgICAgbGV0IHNlYXJjaERhdGEgPSBlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc2VhcmNoU3RhdGUpKVxuICAgICAgICBsZXQgZmlsdGVyRGF0YSA9IGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShmaWx0ZXJTdGF0ZSkpXG4gICAgICAgIHRoaXMucHJvcHMuaGlzdG9yeS5yZXBsYWNlKGAvb3BkL3NlYXJjaHJlc3VsdHM/c2VhcmNoPSR7c2VhcmNoRGF0YX0mZmlsdGVyPSR7ZmlsdGVyRGF0YX1gKVxuXG4gICAgICAgIHRoaXMuZ2V0RG9jdG9yTGlzdChzZWFyY2hTdGF0ZSwgZmlsdGVyU3RhdGUsIHRydWUpXG4gICAgfVxuXG4gICAgZ2V0TG9jYXRpb25QYXJhbSh0YWcpIHtcbiAgICAgICAgLy8gdGhpcyBBUEkgYXNzdW1lcyB0aGUgY29udGV4dCBvZiByZWFjdC1yb3V0ZXItNFxuICAgICAgICBjb25zdCBwYXJhbVN0cmluZyA9IHRoaXMucHJvcHMubG9jYXRpb24uc2VhcmNoXG4gICAgICAgIGNvbnN0IHBhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXMocGFyYW1TdHJpbmcpXG4gICAgICAgIHJldHVybiBwYXJhbXMuZ2V0KHRhZylcbiAgICB9XG5cbiAgICBnZXREb2N0b3JMaXN0KHNlYXJjaFN0YXRlLCBmaWx0ZXJDcml0ZXJpYSwgbWVyZ2VTdGF0ZSkge1xuICAgICAgICB0aGlzLnByb3BzLmdldERvY3RvcnMoc2VhcmNoU3RhdGUsIGZpbHRlckNyaXRlcmlhLCBtZXJnZVN0YXRlKTtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIDxDcml0ZXJpYVNlYXJjaCB7Li4udGhpcy5wcm9wc30gY2hlY2tGb3JMb2FkPXt0aGlzLnByb3BzLkxPQURFRF9ET0NUT1JfU0VBUkNIfSB0aXRsZT1cIlNlYXJjaCBGb3IgRGlzZWFzZSBvciBEb2N0b3IuXCIgdHlwZT1cIm9wZFwiPlxuICAgICAgICAgICAgICAgICAgICA8VG9wQmFyIHsuLi50aGlzLnByb3BzfSBhcHBseUZpbHRlcnM9e3RoaXMuYXBwbHlGaWx0ZXJzLmJpbmQodGhpcyl9IC8+XG4gICAgICAgICAgICAgICAgICAgIDxEb2N0b3JzTGlzdCB7Li4udGhpcy5wcm9wc30gLz5cbiAgICAgICAgICAgICAgICA8L0NyaXRlcmlhU2VhcmNoPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBTZWFyY2hSZXN1bHRzVmlld1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cbmltcG9ydCBEb2N0b3JQcm9maWxlQ2FyZCBmcm9tICcuLi8uLi9jb21tb25zL2RvY3RvclByb2ZpbGVDYXJkL2luZGV4LmpzJ1xuLy8gaW1wb3J0IEluZmluaXRlU2Nyb2xsIGZyb20gJ3JlYWN0LWluZmluaXRlLXNjcm9sbGVyJztcblxuXG5jbGFzcyBEb2N0b3JzTGlzdCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIGxldCB7IERPQ1RPUlMsIGRvY3Rvckxpc3QgfSA9IHRoaXMucHJvcHNcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPHNlY3Rpb24gY2xhc3NOYW1lPVwid3JhcCBzZWFyY2gtcmVzdWx0LWRyXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250YWluZXItZmx1aWRcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLTEyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb2N0b3JMaXN0Lm1hcCgoZG9jSWQsIGkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiA8RG9jdG9yUHJvZmlsZUNhcmQgey4uLnRoaXMucHJvcHN9IGRldGFpbHM9e0RPQ1RPUlNbZG9jSWRdfSBrZXk9e2l9IC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9zZWN0aW9uPlxuICAgICAgICApO1xuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBEb2N0b3JzTGlzdFxuIiwiaW1wb3J0IERvY3Rvckxpc3QgZnJvbSAnLi9Eb2N0b3JzTGlzdC5qcydcblxuZXhwb3J0IGRlZmF1bHQgRG9jdG9yTGlzdCIsImltcG9ydCBTZWFyY2hSZXN1bHRzVmlldyBmcm9tICcuL1NlYXJjaFJlc3VsdHNWaWV3LmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBTZWFyY2hSZXN1bHRzVmlldyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG5pbXBvcnQgTWVudSwgeyBNZW51SXRlbSB9IGZyb20gJ21hdGVyaWFsLXVpL01lbnUnO1xuaW1wb3J0IFJhbmdlIGZyb20gJ3JjLXNsaWRlci9saWIvUmFuZ2UnO1xuXG5jbGFzcyBUb3BCYXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgYW5jaG9yRWw6IG51bGwsXG4gICAgICAgICAgICBvcGVuRmlsdGVyOiBmYWxzZSxcbiAgICAgICAgICAgIHByaWNlUmFuZ2U6IFsxMDAsIDE1MDBdLFxuICAgICAgICAgICAgc29ydF9vbjogbnVsbCxcbiAgICAgICAgICAgIHNpdHNfYXRfY2xpbmljOiBmYWxzZSxcbiAgICAgICAgICAgIHNpdHNfYXRfaG9zcGl0YWw6IGZhbHNlLFxuICAgICAgICAgICAgaXNfZmVtYWxlOiBmYWxzZSxcbiAgICAgICAgICAgIGlzX2F2YWlsYWJsZTogZmFsc2VcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMocHJvcHMpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IC4uLnByb3BzLmZpbHRlckNyaXRlcmlhIH0pXG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyAuLi50aGlzLnByb3BzLmZpbHRlckNyaXRlcmlhIH0pXG4gICAgfVxuXG4gICAgaGFuZGxlSW5wdXQoZSkge1xuICAgICAgICBsZXQgZXZOYW1lID0gZS50YXJnZXQubmFtZVxuICAgICAgICBsZXQgY2hlY2tlZCA9IGUudGFyZ2V0LmNoZWNrZWRcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICBbZXZOYW1lXTogY2hlY2tlZFxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBhcHBseUZpbHRlcnMoKSB7XG4gICAgICAgIGxldCBmaWx0ZXJTdGF0ZSA9IHtcbiAgICAgICAgICAgIHByaWNlUmFuZ2U6IHRoaXMuc3RhdGUucHJpY2VSYW5nZSxcbiAgICAgICAgICAgIHNpdHNfYXQ6IHRoaXMuc3RhdGUuc2l0c19hdCxcbiAgICAgICAgICAgIHNvcnRfb246IHRoaXMuc3RhdGUuc29ydF9vbixcbiAgICAgICAgICAgIGlzX2ZlbWFsZTogdGhpcy5zdGF0ZS5pc19mZW1hbGUsXG4gICAgICAgICAgICBpc19hdmFpbGFibGU6IHRoaXMuc3RhdGUuaXNfYXZhaWxhYmxlLFxuICAgICAgICAgICAgc2l0c19hdF9jbGluaWM6IHRoaXMuc3RhdGUuc2l0c19hdF9jbGluaWMsXG4gICAgICAgICAgICBzaXRzX2F0X2hvc3BpdGFsOiB0aGlzLnN0YXRlLnNpdHNfYXRfaG9zcGl0YWxcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnByb3BzLmFwcGx5RmlsdGVycyhmaWx0ZXJTdGF0ZSlcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IG9wZW5GaWx0ZXI6IGZhbHNlIH0pXG4gICAgfVxuXG4gICAgaGFuZGxlT3BlbihldmVudCkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHsgYW5jaG9yRWw6IGV2ZW50LmN1cnJlbnRUYXJnZXQgfSlcbiAgICB9XG5cbiAgICBoYW5kbGVDbG9zZSh0eXBlKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBhbmNob3JFbDogbnVsbCwgc29ydF9vbjogdHlwZSB9LCAoKSA9PiB7XG4gICAgICAgICAgICBpZiAodHlwZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuYXBwbHlGaWx0ZXJzKClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICB0b2dnbGVGaWx0ZXIoKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgb3BlbkZpbHRlcjogIXRoaXMuc3RhdGUub3BlbkZpbHRlclxuICAgICAgICB9KVxuICAgIH1cblxuICAgIGhhbmRsZVJhbmdlKHR5cGUsIHJhbmdlKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgW3R5cGVdOiByYW5nZVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIGdldENyaXRlcmlhU3RyaW5nKHNlbGVjdGVkQ3JpdGVyaWFzKSB7XG4gICAgICAgIGlmIChzZWxlY3RlZENyaXRlcmlhcyAmJiBzZWxlY3RlZENyaXRlcmlhcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiBzZWxlY3RlZENyaXRlcmlhcy5yZWR1Y2UoKGZpbmFsLCBjdXJyLCBpKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGkgIT0gMCkge1xuICAgICAgICAgICAgICAgICAgICBmaW5hbCArPSAnLCAnXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZpbmFsICs9IGAke2N1cnIubmFtZX1gXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZpbmFsXG4gICAgICAgICAgICB9LCBcIlwiKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIGxldCBjcml0ZXJpYVN0ciA9IHRoaXMuZ2V0Q3JpdGVyaWFTdHJpbmcodGhpcy5wcm9wcy5zZWxlY3RlZENyaXRlcmlhcylcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPHNlY3Rpb24gY2xhc3NOYW1lPVwiZmlsdGVyLXJvd1wiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGFpbmVyLWZsdWlkXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC0xMlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmlsdGVyLWl0ZW1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhY3Rpb24tZmlsdGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dWwgY2xhc3NOYW1lPVwiaW5saW5lLWxpc3RcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGkgb25DbGljaz17dGhpcy5oYW5kbGVPcGVuLmJpbmQodGhpcyl9PjxzcGFuIGNsYXNzTmFtZT1cImN0LWltZyBjdC1pbWctc20gZmlsdGVyLWljb24gdGV4dC1yaWdodFwiPjxpbWcgc3JjPVwiL2Fzc2V0cy9pbWcvY3VzdG9tZXItaWNvbnMvcmFuZ2Uuc3ZnXCIgY2xhc3NOYW1lPVwiaW1nLWZsdWlkXCIgLz48L3NwYW4+PC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGkgb25DbGljaz17dGhpcy50b2dnbGVGaWx0ZXIuYmluZCh0aGlzKX0+PHNwYW4gY2xhc3NOYW1lPVwiY3QtaW1nIGN0LWltZy1zbSBmaWx0ZXItaWNvbiB0ZXh0LXJpZ2h0IGFwcGxpZWQtZmlsdGVyXCI+PGltZyBzcmM9XCIvYXNzZXRzL2ltZy9jdXN0b21lci1pY29ucy9maWx0ZXIuc3ZnXCIgY2xhc3NOYW1lPVwiaW1nLWZsdWlkXCIgLz48L3NwYW4+PHNwYW4gY2xhc3NOYW1lPVwiYXBwbGllZC1maWx0ZXItbm90aVwiIC8+PC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZpbHRlci10aXRsZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3RoaXMucHJvcHMuZG9jdG9yTGlzdC5sZW5ndGh9IFJlc3VsdHMgZm91bmQgZm9yIDxzcGFuIGNsYXNzTmFtZT1cImZ3LTcwMFwiPiB7Y3JpdGVyaWFTdHJ9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8TWVudVxuICAgICAgICAgICAgICAgICAgICBpZD1cInNvcnQtbWVudVwiXG4gICAgICAgICAgICAgICAgICAgIGFuY2hvckVsPXt0aGlzLnN0YXRlLmFuY2hvckVsfVxuICAgICAgICAgICAgICAgICAgICBvcGVuPXtCb29sZWFuKHRoaXMuc3RhdGUuYW5jaG9yRWwpfVxuICAgICAgICAgICAgICAgICAgICBvbkNsb3NlPXt0aGlzLmhhbmRsZUNsb3NlLmJpbmQodGhpcywgbnVsbCl9XG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICA8TWVudUl0ZW0gb25DbGljaz17dGhpcy5oYW5kbGVDbG9zZS5iaW5kKHRoaXMsICduYW1lJyl9PlJlbGF2YW5jZTwvTWVudUl0ZW0+XG4gICAgICAgICAgICAgICAgICAgIDxNZW51SXRlbSBvbkNsaWNrPXt0aGlzLmhhbmRsZUNsb3NlLmJpbmQodGhpcywgJ3ByaWNlJyl9PkZlZTwvTWVudUl0ZW0+XG4gICAgICAgICAgICAgICAgICAgIDxNZW51SXRlbSBvbkNsaWNrPXt0aGlzLmhhbmRsZUNsb3NlLmJpbmQodGhpcywgJ2Rpc3RhbmNlJyl9PkRpc3RhbmNlPC9NZW51SXRlbT5cbiAgICAgICAgICAgICAgICAgICAgPE1lbnVJdGVtIG9uQ2xpY2s9e3RoaXMuaGFuZGxlQ2xvc2UuYmluZCh0aGlzLCAnZXhwZXJpZW5jZScpfT5FeHBlcmllbmNlPC9NZW51SXRlbT5cbiAgICAgICAgICAgICAgICA8L01lbnU+XG5cbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUub3BlbkZpbHRlciA/IDxkaXYgb25DbGljaz17dGhpcy50b2dnbGVGaWx0ZXIuYmluZCh0aGlzKX0gY2xhc3NOYW1lPVwib3ZlcmxheSBibGFja1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3aWRnZXQgZmlsdGVyLXBvcHVwXCIgb25DbGljaz17KGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgICAgICAgICAgICAgICAgICB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIndpZGdldC1jb250ZW50XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmlsdGVyUm93XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0bFwiPkF2YWlsYWJsZSBUb2RheTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBuYW1lPVwiaXNfYXZhaWxhYmxlXCIgY2hlY2tlZD17ISF0aGlzLnN0YXRlLmlzX2F2YWlsYWJsZX0gb25DaGFuZ2U9e3RoaXMuaGFuZGxlSW5wdXQuYmluZCh0aGlzKX0gY2xhc3NOYW1lPVwiY2hlY2tGaWx0ZXJcIiAvPlxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwid2lkZ2V0LWNvbnRlbnRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmaWx0ZXJSb3dcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRsXCI+U2l0cyBBdDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBuYW1lPVwic2l0c19hdF9jbGluaWNcIiBjaGVja2VkPXshIXRoaXMuc3RhdGUuc2l0c19hdF9jbGluaWN9IG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUlucHV0LmJpbmQodGhpcyl9IGNsYXNzTmFtZT1cImNoZWNrRmlsdGVyXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImNoZWNrRmlsdGVyTGFiZWxcIj5DbGluaWM8L3NwYW4+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBuYW1lPVwic2l0c19hdF9ob3NwaXRhbFwiIGNoZWNrZWQ9eyEhdGhpcy5zdGF0ZS5zaXRzX2F0X2hvc3BpdGFsfSBvbkNoYW5nZT17dGhpcy5oYW5kbGVJbnB1dC5iaW5kKHRoaXMpfSBjbGFzc05hbWU9XCJjaGVja0ZpbHRlclwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJjaGVja0ZpbHRlckxhYmVsXCI+SG9zcGl0YWw8L3NwYW4+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3aWRnZXQtY29udGVudFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZpbHRlclJvd1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGxcIj5QcmljZTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRyXCI+UnMge3RoaXMuc3RhdGUucHJpY2VSYW5nZVswXX0gdG8ge3RoaXMuc3RhdGUucHJpY2VSYW5nZVsxXX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJibFwiPlJzIDEwMDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImJyXCI+UnMgMjAwMDwvc3Bhbj5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPFJhbmdlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWluPXsxMDB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF4PXsyMDAwfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXt0aGlzLnN0YXRlLnByaWNlUmFuZ2V9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RlcD17MTAwfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInJhbmdlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5oYW5kbGVSYW5nZS5iaW5kKHRoaXMsICdwcmljZVJhbmdlJyl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIndpZGdldC1jb250ZW50XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmlsdGVyUm93XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0bFwiPkZlbWFsZSBEb2N0b3I8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgbmFtZT1cImlzX2ZlbWFsZVwiIGNoZWNrZWQ9eyEhdGhpcy5zdGF0ZS5pc19mZW1hbGV9IG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUlucHV0LmJpbmQodGhpcyl9IGNsYXNzTmFtZT1cImNoZWNrRmlsdGVyXCIgLz5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIndpZGdldC1mb290ZXIgcGQtMFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cInYtYnRuIHYtYnRuLXByaW1hcnkgYnRuLWJsb2NrIGJ0bi1sZ1wiIG9uQ2xpY2s9e3RoaXMuYXBwbHlGaWx0ZXJzLmJpbmQodGhpcyl9PkFwcGx5PC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+IDogXCJcIlxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgPC9zZWN0aW9uPlxuICAgICAgICApO1xuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBUb3BCYXJcbiIsImltcG9ydCBUb3BCYXIgZnJvbSAnLi9Ub3BCYXIuanMnXG5cbmV4cG9ydCBkZWZhdWx0IFRvcEJhciIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IHsgd2l0aFJvdXRlciB9IGZyb20gXCJyZWFjdC1yb3V0ZXItZG9tXCI7XG5cbmltcG9ydCBSYWRpbywgeyBSYWRpb0dyb3VwIH0gZnJvbSAnbWF0ZXJpYWwtdWkvUmFkaW8nO1xuaW1wb3J0IENoZWNrYm94IGZyb20gJ21hdGVyaWFsLXVpL0NoZWNrYm94JztcbmltcG9ydCB7IEZvcm1MYWJlbCwgRm9ybUNvbnRyb2wsIEZvcm1Db250cm9sTGFiZWwsIEZvcm1IZWxwZXJUZXh0IH0gZnJvbSAnbWF0ZXJpYWwtdWkvRm9ybSc7XG5cblxuY2xhc3MgU2VhcmNoUmVzdWx0c0ZpbHRlciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgICBmZWVfMDogZmFsc2UsXG4gICAgICAgICAgICBmZWVfMTogZmFsc2UsXG4gICAgICAgICAgICBmZWVfMjogZmFsc2UsXG4gICAgICAgICAgICBmZWVfMzogZmFsc2UsXG4gICAgICAgICAgICBnZW5kZXI6ICdhbnknLFxuICAgICAgICAgICAgY2xpbmljX3BlcnNvbmFsOiBmYWxzZSxcbiAgICAgICAgICAgIGNsaW5pY19ob3NwaXRhbDogZmFsc2UsXG4gICAgICAgICAgICBjbGluaWNfbXVsdGk6IGZhbHNlLFxuICAgICAgICAgICAgYXZhaWxhYmxlX3RvZGF5OiBmYWxzZSxcbiAgICAgICAgICAgIGRpc3RhbmNlOiAnMzBrbSdcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHsgLi4udGhpcy5wcm9wcy5maWx0ZXJDcml0ZXJpYSB9KVxuICAgIH1cblxuICAgIGFwcGx5RmlsdGVyKCkge1xuICAgICAgICB0aGlzLnByb3BzLnNldE9QREZpbHRlcnModGhpcy5zdGF0ZSlcbiAgICAgICAgdGhpcy5wcm9wcy5oaXN0b3J5LmdvKC0xKVxuICAgIH1cblxuICAgIGhhbmRsZUNoZWNrYm94KG5hbWUsIGUpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IFtuYW1lXTogZS50YXJnZXQuY2hlY2tlZCB9KVxuICAgIH1cblxuICAgIGhhbmRsZUNoYW5nZVJhZGlvKG5hbWUsIGUpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IFtuYW1lXTogZS50YXJnZXQudmFsdWUgfSlcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic2VhcmNoUmVzdWx0c0ZpbHRlclwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3ViRmlsdGVyXCI+XG4gICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInN1YkhlYWRpbmdcIj5GZWU8L3A+XG4gICAgICAgICAgICAgICAgICAgIDxSYWRpb0dyb3VwXG4gICAgICAgICAgICAgICAgICAgICAgICBhcmlhLWxhYmVsPVwiZmVlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU9XCJmZWUxXCJcbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgPEZvcm1Db250cm9sTGFiZWwgY29udHJvbD17PENoZWNrYm94XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2tlZD17dGhpcy5zdGF0ZS5mZWVfMH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5oYW5kbGVDaGVja2JveC5iaW5kKHRoaXMsICdmZWVfMCcpfVxuICAgICAgICAgICAgICAgICAgICAgICAgLz59IGxhYmVsPVwiTGVzcyB0aGFuIDMwMFwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8Rm9ybUNvbnRyb2xMYWJlbCBjb250cm9sPXs8Q2hlY2tib3hcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGVja2VkPXt0aGlzLnN0YXRlLmZlZV8xfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUNoZWNrYm94LmJpbmQodGhpcywgJ2ZlZV8xJyl9XG4gICAgICAgICAgICAgICAgICAgICAgICAvPn0gbGFiZWw9XCIzMDAgdG8gNTAwXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxGb3JtQ29udHJvbExhYmVsIGNvbnRyb2w9ezxDaGVja2JveFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrZWQ9e3RoaXMuc3RhdGUuZmVlXzJ9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuaGFuZGxlQ2hlY2tib3guYmluZCh0aGlzLCAnZmVlXzInKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8+fSBsYWJlbD1cIjUwMCB0byAxMDAwXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxGb3JtQ29udHJvbExhYmVsIGNvbnRyb2w9ezxDaGVja2JveFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrZWQ9e3RoaXMuc3RhdGUuZmVlXzN9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuaGFuZGxlQ2hlY2tib3guYmluZCh0aGlzLCAnZmVlXzMnKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8+fSBsYWJlbD1cIjEwMDArXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgPC9SYWRpb0dyb3VwPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdWJGaWx0ZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwic3ViSGVhZGluZ1wiPkRpc3RhbmNlPC9wPlxuICAgICAgICAgICAgICAgICAgICA8UmFkaW9Hcm91cFxuICAgICAgICAgICAgICAgICAgICAgICAgYXJpYS1sYWJlbD1cIkRpc3RhbmNlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU9XCJEaXN0YW5jZTJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3RoaXMuc3RhdGUuZGlzdGFuY2V9XG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5oYW5kbGVDaGFuZ2VSYWRpby5iaW5kKHRoaXMsICdkaXN0YW5jZScpfVxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICA8Rm9ybUNvbnRyb2xMYWJlbCB2YWx1ZT1cIjMwa21cIiBjb250cm9sPXs8UmFkaW8gY29sb3I9XCJwcmltYXJ5XCIgLz59IGxhYmVsPVwiVW5kZXIgMzAgS01cIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPEZvcm1Db250cm9sTGFiZWwgdmFsdWU9XCIyMGttXCIgY29udHJvbD17PFJhZGlvIGNvbG9yPVwicHJpbWFyeVwiIC8+fSBsYWJlbD1cIlVuZGVyIDIwIEtNXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxGb3JtQ29udHJvbExhYmVsIHZhbHVlPVwiMTBrbVwiIGNvbnRyb2w9ezxSYWRpbyBjb2xvcj1cInByaW1hcnlcIiAvPn0gbGFiZWw9XCJVbmRlciAxMCBLTVwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8Rm9ybUNvbnRyb2xMYWJlbCB2YWx1ZT1cIjVrbVwiIGNvbnRyb2w9ezxSYWRpbyBjb2xvcj1cInByaW1hcnlcIiAvPn0gbGFiZWw9XCJVbmRlciA1IEtNXCIgLz5cblxuICAgICAgICAgICAgICAgICAgICA8L1JhZGlvR3JvdXA+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN1YkZpbHRlclwiPlxuICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJzdWJIZWFkaW5nXCI+VHlwZSBPZiBDbGluaWM8L3A+XG4gICAgICAgICAgICAgICAgICAgIDxSYWRpb0dyb3VwXG4gICAgICAgICAgICAgICAgICAgICAgICBhcmlhLWxhYmVsPVwiY2xpbmljVHlwZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lPVwiY2xpbmljVHlwZVwiXG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxGb3JtQ29udHJvbExhYmVsIGNvbnRyb2w9ezxDaGVja2JveFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrZWQ9e3RoaXMuc3RhdGUuY2xpbmljX3BlcnNvbmFsfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUNoZWNrYm94LmJpbmQodGhpcywgJ2NsaW5pY19wZXJzb25hbCcpfVxuICAgICAgICAgICAgICAgICAgICAgICAgLz59IGxhYmVsPVwiUGVyc29uYWxcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPEZvcm1Db250cm9sTGFiZWwgY29udHJvbD17PENoZWNrYm94XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2tlZD17dGhpcy5zdGF0ZS5jbGluaWNfaG9zcGl0YWx9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuaGFuZGxlQ2hlY2tib3guYmluZCh0aGlzLCAnY2xpbmljX2hvc3BpdGFsJyl9XG4gICAgICAgICAgICAgICAgICAgICAgICAvPn0gbGFiZWw9XCJIb3NwaXRhbFwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8Rm9ybUNvbnRyb2xMYWJlbCBjb250cm9sPXs8Q2hlY2tib3hcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGVja2VkPXt0aGlzLnN0YXRlLmNsaW5pY19tdWx0aX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5oYW5kbGVDaGVja2JveC5iaW5kKHRoaXMsICdjbGluaWNfbXVsdGknKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8+fSBsYWJlbD1cIk11bHRpLWRvY3RvciBjbGluaWNcIiAvPlxuICAgICAgICAgICAgICAgICAgICA8L1JhZGlvR3JvdXA+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN1YkZpbHRlclwiPlxuICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJzdWJIZWFkaW5nXCI+R2VuZGVyPC9wPlxuICAgICAgICAgICAgICAgICAgICA8UmFkaW9Hcm91cFxuICAgICAgICAgICAgICAgICAgICAgICAgYXJpYS1sYWJlbD1cImdlbmRlclwiXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lPVwiZ2VuZGVyMlwiXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17dGhpcy5zdGF0ZS5nZW5kZXJ9XG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5oYW5kbGVDaGFuZ2VSYWRpby5iaW5kKHRoaXMsICdnZW5kZXInKX1cbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgPEZvcm1Db250cm9sTGFiZWwgdmFsdWU9XCJhbnlcIiBjb250cm9sPXs8UmFkaW8gY29sb3I9XCJwcmltYXJ5XCIgLz59IGxhYmVsPVwiQW55XCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxGb3JtQ29udHJvbExhYmVsIHZhbHVlPVwibWFsZVwiIGNvbnRyb2w9ezxSYWRpbyBjb2xvcj1cInByaW1hcnlcIiAvPn0gbGFiZWw9XCJNYWxlXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxGb3JtQ29udHJvbExhYmVsIHZhbHVlPVwiZmVtYWxlXCIgY29udHJvbD17PFJhZGlvIGNvbG9yPVwicHJpbWFyeVwiIC8+fSBsYWJlbD1cIkZlbWFsZVwiIC8+XG5cbiAgICAgICAgICAgICAgICAgICAgPC9SYWRpb0dyb3VwPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdWJGaWx0ZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwic3ViSGVhZGluZ1wiPkF2YWlsYWJpbGl0eTwvcD5cbiAgICAgICAgICAgICAgICAgICAgPFJhZGlvR3JvdXBcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyaWEtbGFiZWw9XCJhdmFpbGFiaWxpdHlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZT1cImF2YWlsYWJpbGl0eVwiXG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxGb3JtQ29udHJvbExhYmVsIGNvbnRyb2w9ezxDaGVja2JveFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrZWQ9e3RoaXMuc3RhdGUuYXZhaWxhYmxlX3RvZGF5fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUNoZWNrYm94LmJpbmQodGhpcywgJ2F2YWlsYWJsZV90b2RheScpfVxuICAgICAgICAgICAgICAgICAgICAgICAgLz59IGxhYmVsPVwiQXZpYWxhYmxlIFRvZGF5XCIgLz5sYWJlbD1cIk11bHRpLWRvY3RvciBjbGluaWNcIiAvPlxuICAgICAgICAgICAgICAgICAgICA8L1JhZGlvR3JvdXA+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImFwcGx5RmlsdGVyXCIgb25DbGljaz17dGhpcy5hcHBseUZpbHRlci5iaW5kKHRoaXMpfT5BcHBseTwvYnV0dG9uPlxuXG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgd2l0aFJvdXRlcihTZWFyY2hSZXN1bHRzRmlsdGVyKVxuIiwiaW1wb3J0IFNlYXJjaFJlc3VsdHNGaWx0ZXIgZnJvbSAnLi9TZWFyY2hSZXN1bHRzRmlsdGVyLmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBTZWFyY2hSZXN1bHRzRmlsdGVyIiwiLy9BVVRIIEFDVElPTlNcbmV4cG9ydCBjb25zdCBTRU5EX09UUF9SRVFVRVNUID0gJ1NFTkRfT1RQX1JFUVVFU1QnXG5leHBvcnQgY29uc3QgU0VORF9PVFBfU1VDQ0VTUyA9ICdTRU5EX09UUF9TVUNDRVNTJ1xuZXhwb3J0IGNvbnN0IFNFTkRfT1RQX0ZBSUwgPSAnU0VORF9PVFBfRkFJTCdcbmV4cG9ydCBjb25zdCBTVUJNSVRfT1RQX1JFUVVFU1QgPSAnU1VCTUlUX09UUF9SRVFVRVNUJ1xuZXhwb3J0IGNvbnN0IFNVQk1JVF9PVFBfU1VDQ0VTUyA9ICdTVUJNSVRfT1RQX1NVQ0NFU1MnXG5leHBvcnQgY29uc3QgU1VCTUlUX09UUF9GQUlMID0gJ1NVQk1JVF9PVFBfRkFJTCdcblxuLy8gT1BEIEZMT1dcbmV4cG9ydCBjb25zdCBBUFBFTkRfRE9DVE9SUyA9ICdBUFBFTkRfRE9DVE9SUyc7XG5leHBvcnQgY29uc3QgRE9DVE9SX1NFQVJDSCA9ICdET0NUT1JfU0VBUkNIJztcbmV4cG9ydCBjb25zdCBET0NUT1JfU0VBUkNIX1NUQVJUID0gJ0RPQ1RPUl9TRUFSQ0hfU1RBUlQnO1xuZXhwb3J0IGNvbnN0IFNFTEVDVF9MT0NBVElPTl9PUEQgPSAnU0VMRUNUX0xPQ0FUSU9OX09QRCc7XG5leHBvcnQgY29uc3QgTUVSR0VfU0VBUkNIX1NUQVRFX09QRCA9ICdNRVJHRV9TRUFSQ0hfU1RBVEVfT1BEJztcbmV4cG9ydCBjb25zdCBUT0dHTEVfT1BEX0NSSVRFUklBID0gJ1RPR0dMRV9PUERfQ1JJVEVSSUEnO1xuZXhwb3J0IGNvbnN0IFNFVF9PUERfRklMVEVSUyA9ICdTRVRfT1BEX0ZJTFRFUlMnXG5leHBvcnQgY29uc3QgTE9BRF9TRUFSQ0hfQ1JJVEVSSUFfT1BEID0gJ0xPQURfU0VBUkNIX0NSSVRFUklBX09QRCdcblxuXG4vLyBESUFHIEZMT1dcbmV4cG9ydCBjb25zdCBUT0dHTEVfRElBR05PU0lTX0NSSVRFUklBID0gJ1RPR0dMRV9ESUFHTk9TSVNfQ1JJVEVSSUEnO1xuZXhwb3J0IGNvbnN0IE1FUkdFX1NFQVJDSF9TVEFURV9MQUIgPSAnTUVSR0VfU0VBUkNIX1NUQVRFX0xBQic7XG5leHBvcnQgY29uc3QgTE9BRF9TRUFSQ0hfQ1JJVEVSSUFfTEFCID0gJ0xPQURfU0VBUkNIX0NSSVRFUklBX0xBQidcbmV4cG9ydCBjb25zdCBBUFBFTkRfTEFCUyA9ICdBUFBFTkRfTEFCUyc7XG5leHBvcnQgY29uc3QgTEFCX1NFQVJDSCA9ICdMQUJfU0VBUkNIJztcbmV4cG9ydCBjb25zdCBTRUxFQ1RfTE9DQVRJT05fRElBR05PU0lTID0gJ1NFTEVDVF9MT0NBVElPTl9ESUFHTk9TSVMnO1xuZXhwb3J0IGNvbnN0IEFQUEVORF9GSUxURVJTX0RJQUdOT1NJUyA9ICdBUFBFTkRfRklMVEVSU19ESUFHTk9TSVMnO1xuZXhwb3J0IGNvbnN0IExBQl9TRUFSQ0hfU1RBUlQgPSAnTEFCX1NFQVJDSF9TVEFSVCc7XG5cbi8vIEFVVEggRkxPV1xuZXhwb3J0IGNvbnN0IEFQUEVORF9VU0VSX1BST0ZJTEVTID0gJ0FQUEVORF9VU0VSX1BST0ZJTEVTJztcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG5pbXBvcnQgeyB9IGZyb20gJy4uLy4uL2FjdGlvbnMvaW5kZXguanMnXG5cbmltcG9ydCBDaGF0VmlldyBmcm9tICcuLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvY2hhdC9pbmRleC5qcydcblxuXG5jbGFzcyBDaGF0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxDaGF0VmlldyB7Li4udGhpcy5wcm9wc30gLz5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9IChzdGF0ZSkgPT4ge1xuICAgIGNvbnN0IFVTRVIgPSBzdGF0ZS5VU0VSXG5cbiAgICByZXR1cm4ge1xuICAgICAgICBVU0VSXG4gICAgfVxufVxuXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSAoZGlzcGF0Y2gpID0+IHtcbiAgICByZXR1cm4ge1xuXG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpKENoYXQpO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cbmltcG9ydCB7IHN1Ym1pdE9UUCB9IGZyb20gJy4uLy4uL2FjdGlvbnMvaW5kZXguanMnXG5cbmltcG9ydCBPdHBWZXJpZnlWaWV3IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9vdHBWZXJpZnknXG5cblxuY2xhc3MgT3RwVmVyaWZ5IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICB9XG5cbiAgICBzdGF0aWMgY29udGV4dFR5cGVzID0ge1xuICAgICAgICByb3V0ZXI6ICgpID0+IG51bGxcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxPdHBWZXJpZnlWaWV3IHsuLi50aGlzLnByb3BzfSAvPlxuICAgICAgICApO1xuICAgIH1cbn1cblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHN0YXRlKSA9PiB7XG4gICAgbGV0IHtcbiAgICAgICAgdG9rZW4sXG4gICAgICAgIGVycm9yX21lc3NhZ2UsXG4gICAgICAgIHN1Y2Nlc3NfbWVzc2FnZSxcbiAgICAgICAgcGhvbmVOdW1iZXIsXG4gICAgICAgIHN1Ym1pdF9vdHAsXG4gICAgICAgIHN1Ym1pdF9vdHBfc3VjY2VzcyxcbiAgICAgICAgc3VibWl0X290cF9mYWlsXG4gICAgfSA9IHN0YXRlLkFVVEhcblxuICAgIHJldHVybiB7XG4gICAgICAgIHRva2VuLFxuICAgICAgICBlcnJvcl9tZXNzYWdlLFxuICAgICAgICBzdWNjZXNzX21lc3NhZ2UsXG4gICAgICAgIHBob25lTnVtYmVyLFxuICAgICAgICBzdWJtaXRfb3RwLFxuICAgICAgICBzdWJtaXRfb3RwX3N1Y2Nlc3MsXG4gICAgICAgIHN1Ym1pdF9vdHBfZmFpbFxuICAgIH1cbn1cblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gKGRpc3BhdGNoKSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgc3VibWl0T1RQOiAobnVtYmVyLCBvdHAsIGNiKSA9PiBkaXNwYXRjaChzdWJtaXRPVFAobnVtYmVyLCBvdHAsIGNiKSksXG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpKE90cFZlcmlmeSk7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcblxuaW1wb3J0IHsgZ2V0VXNlclByb2ZpbGVXaXRoQXBwb2ludG1lbnRzIH0gZnJvbSAnLi4vLi4vYWN0aW9ucy9pbmRleC5qcydcblxuaW1wb3J0IFVzZXJBcHBvaW50bWVudHNWaWV3IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy91c2VyQXBwb2ludG1lbnRzL2luZGV4LmpzJ1xuXG5cbmNsYXNzIFVzZXJBcHBvaW50bWVudHMgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPFVzZXJBcHBvaW50bWVudHNWaWV3IHsuLi50aGlzLnByb3BzfSAvPlxuICAgICAgICApO1xuICAgIH1cbn1cblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHN0YXRlKSA9PiB7XG4gICAgY29uc3QgVVNFUiA9IHN0YXRlLlVTRVJcblxuICAgIHJldHVybiB7XG4gICAgICAgIFVTRVJcbiAgICB9XG59XG5cbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IChkaXNwYXRjaCkgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICAgIGdldFVzZXJQcm9maWxlV2l0aEFwcG9pbnRtZW50cyA6ICgpID0+IGRpc3BhdGNoKGdldFVzZXJQcm9maWxlV2l0aEFwcG9pbnRtZW50cygpKVxuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbWFwRGlzcGF0Y2hUb1Byb3BzKShVc2VyQXBwb2ludG1lbnRzKTtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG5pbXBvcnQgeyBzZW5kT1RQIH0gZnJvbSAnLi4vLi4vYWN0aW9ucy9pbmRleC5qcydcblxuaW1wb3J0IFVzZXJMb2dpblZpZXcgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9jb21tb25zL1VzZXJMb2dpbidcblxuXG5jbGFzcyBVc2VyTG9naW4gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgIH1cblxuICAgIHN0YXRpYyBjb250ZXh0VHlwZXMgPSB7XG4gICAgICAgIHJvdXRlcjogKCkgPT4gbnVsbFxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPFVzZXJMb2dpblZpZXcgey4uLnRoaXMucHJvcHN9IC8+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoc3RhdGUpID0+IHtcbiAgICBsZXQge1xuICAgICAgICB0b2tlbixcbiAgICAgICAgZXJyb3JfbWVzc2FnZSxcbiAgICAgICAgc3VjY2Vzc19tZXNzYWdlLFxuICAgICAgICBvdHBfcmVxdWVzdF9zZW50LFxuICAgICAgICBvdHBfcmVxdWVzdF9zdWNjZXNzLFxuICAgICAgICBvdHBfcmVxdWVzdF9mYWlsLFxuICAgICAgICBwaG9uZU51bWJlclxuICAgIH0gPSBzdGF0ZS5BVVRIXG5cbiAgICByZXR1cm4ge1xuICAgICAgICB0b2tlbixcbiAgICAgICAgZXJyb3JfbWVzc2FnZSxcbiAgICAgICAgc3VjY2Vzc19tZXNzYWdlLFxuICAgICAgICBvdHBfcmVxdWVzdF9zZW50LFxuICAgICAgICBvdHBfcmVxdWVzdF9zdWNjZXNzLFxuICAgICAgICBvdHBfcmVxdWVzdF9mYWlsLFxuICAgICAgICBwaG9uZU51bWJlclxuICAgIH1cbn1cblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gKGRpc3BhdGNoKSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgc2VuZE9UUDogKG51bWJlciwgY2IpID0+IGRpc3BhdGNoKHNlbmRPVFAobnVtYmVyLCBjYikpXG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpKFVzZXJMb2dpbik7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcblxuaW1wb3J0IHsgZ2V0VXNlclByb2ZpbGUgfSBmcm9tICcuLi8uLi9hY3Rpb25zL2luZGV4LmpzJ1xuXG5pbXBvcnQgVXNlclByb2ZpbGVWaWV3IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy91c2VyUHJvZmlsZS9pbmRleC5qcydcblxuXG5jbGFzcyBVc2VyUHJvZmlsZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8VXNlclByb2ZpbGVWaWV3IHsuLi50aGlzLnByb3BzfSAvPlxuICAgICAgICApO1xuICAgIH1cbn1cblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHN0YXRlKSA9PiB7XG4gICAgY29uc3QgVVNFUiA9IHN0YXRlLlVTRVJcblxuICAgIHJldHVybiB7XG4gICAgICAgIFVTRVJcbiAgICB9XG59XG5cbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IChkaXNwYXRjaCkgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICAgIGdldFVzZXJQcm9maWxlIDogKCkgPT4gZGlzcGF0Y2goZ2V0VXNlclByb2ZpbGUoKSlcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG1hcERpc3BhdGNoVG9Qcm9wcykoVXNlclByb2ZpbGUpO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cbmltcG9ydCB7IGdldFVzZXJQcm9maWxlV2l0aFRlc3RzIH0gZnJvbSAnLi4vLi4vYWN0aW9ucy9pbmRleC5qcydcblxuaW1wb3J0IFVzZXJSZXBvcnRzVmlldyBmcm9tICcuLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvdXNlclJlcG9ydHMvaW5kZXguanMnXG5cblxuY2xhc3MgVXNlclJlcG9ydHMgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPFVzZXJSZXBvcnRzVmlldyB7Li4udGhpcy5wcm9wc30gLz5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9IChzdGF0ZSkgPT4ge1xuICAgIGNvbnN0IFVTRVIgPSBzdGF0ZS5VU0VSXG5cbiAgICByZXR1cm4ge1xuICAgICAgICBVU0VSXG4gICAgfVxufVxuXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSAoZGlzcGF0Y2gpID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgICBnZXRVc2VyUHJvZmlsZVdpdGhUZXN0cyA6ICgpID0+IGRpc3BhdGNoKGdldFVzZXJQcm9maWxlV2l0aFRlc3RzKCkpXG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpKFVzZXJSZXBvcnRzKTtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG5pbXBvcnQgeyB9IGZyb20gJy4uLy4uL2FjdGlvbnMvaW5kZXguanMnXG5cbmltcG9ydCBVc2VyU2lnbnVwVmlldyBmcm9tICcuLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvdXNlclNpZ251cCdcblxuXG5jbGFzcyBVc2VyU2lnbnVwIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICB9XG5cbiAgICBzdGF0aWMgY29udGV4dFR5cGVzID0ge1xuICAgICAgICByb3V0ZXI6ICgpID0+IG51bGxcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxVc2VyU2lnbnVwVmlldyB7Li4udGhpcy5wcm9wc30gLz5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9IChzdGF0ZSkgPT4ge1xuICAgIGNvbnN0IFVTRVIgPSBzdGF0ZS5VU0VSXG5cbiAgICByZXR1cm4ge1xuICAgICAgICBVU0VSXG4gICAgfVxufVxuXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSAoZGlzcGF0Y2gpID0+IHtcbiAgICByZXR1cm4ge1xuXG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpKFVzZXJTaWdudXApO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cbmltcG9ydCB7IGdldExhYkJ5SWQgfSBmcm9tICcuLi8uLi9hY3Rpb25zL2luZGV4LmpzJ1xuXG5pbXBvcnQgQm9va2luZ1N1bW1hcnlWaWV3IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvZGlhZ25vc2lzL2Jvb2tpbmdTdW1tYXJ5L2luZGV4LmpzJ1xuXG5jbGFzcyBCb29raW5nU3VtbWFyeSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgfVxuXG4gICAgc3RhdGljIGNvbnRleHRUeXBlcyA9IHtcbiAgICAgICAgcm91dGVyOiAoKSA9PiBudWxsXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8Qm9va2luZ1N1bW1hcnlWaWV3IHsuLi50aGlzLnByb3BzfSAvPlxuICAgICAgICApO1xuICAgIH1cbn1cblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHN0YXRlKSA9PiB7XG5cbiAgICBjb25zdCB7XG4gICAgICAgIHNlbGVjdGVkQ3JpdGVyaWFzLFxuICAgIH0gPSBzdGF0ZS5TRUFSQ0hfQ1JJVEVSSUFfTEFCU1xuXG4gICAgbGV0IExBQlMgPSBzdGF0ZS5MQUJTXG5cbiAgICByZXR1cm4ge1xuICAgICAgICBzZWxlY3RlZENyaXRlcmlhcyxcbiAgICAgICAgTEFCU1xuICAgIH1cbn1cblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gKGRpc3BhdGNoKSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgZ2V0TGFiQnlJZDogKGxhYklkKSA9PiBkaXNwYXRjaChnZXRMYWJCeUlkKGxhYklkKSlcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpKEJvb2tpbmdTdW1tYXJ5KTtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG5pbXBvcnQgeyBnZXRMYWJCeUlkIH0gZnJvbSAnLi4vLi4vYWN0aW9ucy9pbmRleC5qcydcblxuaW1wb3J0IExhYlZpZXcgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9kaWFnbm9zaXMvbGFiL2luZGV4LmpzJ1xuXG5jbGFzcyBMYWIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgIH1cblxuICAgIHN0YXRpYyBsb2FkRGF0YShzdG9yZSwgbWF0Y2gpe1xuICAgICAgICByZXR1cm4gc3RvcmUuZGlzcGF0Y2goZ2V0TGFiQnlJZChtYXRjaC5wYXJhbXMuaWQpKVxuICAgIH1cblxuICAgIHN0YXRpYyBjb250ZXh0VHlwZXMgPSB7XG4gICAgICAgIHJvdXRlcjogKCkgPT4gbnVsbFxuICAgIH1cblxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgICB0aGlzLnByb3BzLmdldExhYkJ5SWQodGhpcy5wcm9wcy5tYXRjaC5wYXJhbXMuaWQpXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8TGFiVmlldyB7Li4udGhpcy5wcm9wc30gLz5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9IChzdGF0ZSkgPT4ge1xuXG4gICAgY29uc3Qge1xuICAgICAgICBzZWxlY3RlZExvY2F0aW9uLFxuICAgICAgICBzZWxlY3RlZENyaXRlcmlhcyxcbiAgICAgICAgZmlsdGVyQ3JpdGVyaWEsXG4gICAgICAgIExPQURFRF9TRUFSQ0hfQ1JJVEVSSUFfTEFCXG4gICAgfSA9IHN0YXRlLlNFQVJDSF9DUklURVJJQV9MQUJTXG5cbiAgICBsZXQgTEFCUyA9IHN0YXRlLkxBQlNcblxuICAgIHJldHVybiB7XG4gICAgICAgIHNlbGVjdGVkQ3JpdGVyaWFzLFxuICAgICAgICBMQUJTXG4gICAgfVxufVxuXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSAoZGlzcGF0Y2gpID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgICBnZXRMYWJCeUlkOiAobGFiSWQpID0+IGRpc3BhdGNoKGdldExhYkJ5SWQobGFiSWQpKVxuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbWFwRGlzcGF0Y2hUb1Byb3BzKShMYWIpO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cbmltcG9ydCB7IGdldExhYkJ5SWQgfSBmcm9tICcuLi8uLi9hY3Rpb25zL2luZGV4LmpzJ1xuXG5pbXBvcnQgUGF0aWVudERldGFpbHNWaWV3IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvZGlhZ25vc2lzL3BhdGllbnREZXRhaWxzL2luZGV4LmpzJ1xuXG5jbGFzcyBQYXRpZW50RGV0YWlscyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8UGF0aWVudERldGFpbHNWaWV3IHsuLi50aGlzLnByb3BzfSAvPlxuICAgICAgICApO1xuICAgIH1cbn1cblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHN0YXRlKSA9PiB7XG5cbiAgICBsZXQgTEFCUyA9IHN0YXRlLkxBQlNcblxuICAgIHJldHVybiB7XG4gICAgICAgIExBQlNcbiAgICB9XG59XG5cbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IChkaXNwYXRjaCkgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICAgIGdldExhYkJ5SWQgOiAobGFiSWQsIHRlc3RJZHMpID0+IGRpc3BhdGNoKGdldExhYkJ5SWQobGFiSWQsIHRlc3RJZHMpKVxuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbWFwRGlzcGF0Y2hUb1Byb3BzKShQYXRpZW50RGV0YWlscyk7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcblxuaW1wb3J0IHsgbG9hZExhYkNvbW1vbkNyaXRlcmlhcywgdG9nZ2xlRGlhZ25vc2lzQ3JpdGVyaWEsIGdldERpYWdub3Npc0NyaXRlcmlhUmVzdWx0cyB9IGZyb20gJy4uLy4uL2FjdGlvbnMvaW5kZXguanMnXG5pbXBvcnQgU2VhcmNoQ3JpdGVyaWFWaWV3IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvZGlhZ25vc2lzL3NlYXJjaENyaXRlcmlhL2luZGV4LmpzJ1xuXG5jbGFzcyBTZWFyY2hDcml0ZXJpYSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgfVxuXG4gICAgc3RhdGljIGxvYWREYXRhKHN0b3JlKXtcbiAgICAgICAgcmV0dXJuIHN0b3JlLmRpc3BhdGNoKGxvYWRMYWJDb21tb25Dcml0ZXJpYXMoKSlcbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgdGhpcy5wcm9wcy5sb2FkTGFiQ29tbW9uQ3JpdGVyaWFzKClcbiAgICB9XG5cbiAgICBzdGF0aWMgY29udGV4dFR5cGVzID0ge1xuICAgICAgICByb3V0ZXI6ICgpID0+IG51bGxcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8U2VhcmNoQ3JpdGVyaWFWaWV3IHsuLi50aGlzLnByb3BzfSAvPlxuICAgICAgICApXG4gICAgfVxufVxuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoc3RhdGUpID0+IHtcblxuICAgIGNvbnN0IHtcbiAgICAgICAgTE9BREVEX1NFQVJDSF9DUklURVJJQV9MQUIsXG4gICAgICAgIGNvbW1vbl90ZXN0cyxcbiAgICAgICAgY29tbW9uX2NvbmRpdGlvbnMsXG4gICAgICAgIHByZWZlcnJlZF9sYWJzLFxuICAgICAgICBzZWxlY3RlZENyaXRlcmlhcyxcbiAgICAgICAgc2VsZWN0ZWRMb2NhdGlvbixcbiAgICAgICAgZmlsdGVyQ3JpdGVyaWFcbiAgICB9ID0gc3RhdGUuU0VBUkNIX0NSSVRFUklBX0xBQlNcblxuICAgIHJldHVybiB7XG4gICAgICAgIExPQURFRF9TRUFSQ0hfQ1JJVEVSSUFfTEFCLFxuICAgICAgICBjb21tb25fdGVzdHMsXG4gICAgICAgIGNvbW1vbl9jb25kaXRpb25zLFxuICAgICAgICBwcmVmZXJyZWRfbGFicyxcbiAgICAgICAgc2VsZWN0ZWRDcml0ZXJpYXMsXG4gICAgICAgIHNlbGVjdGVkTG9jYXRpb24sXG4gICAgICAgIGZpbHRlckNyaXRlcmlhXG4gICAgfVxufVxuXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSAoZGlzcGF0Y2gpID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgICBsb2FkTGFiQ29tbW9uQ3JpdGVyaWFzOiAoKSA9PiBkaXNwYXRjaChsb2FkTGFiQ29tbW9uQ3JpdGVyaWFzKCkpLFxuICAgICAgICB0b2dnbGVEaWFnbm9zaXNDcml0ZXJpYTogKHR5cGUsIGNyaXRlcmlhKSA9PiBkaXNwYXRjaCh0b2dnbGVEaWFnbm9zaXNDcml0ZXJpYSh0eXBlLCBjcml0ZXJpYSkpLFxuICAgICAgICBnZXREaWFnbm9zaXNDcml0ZXJpYVJlc3VsdHM6IChzZWFyY2hTdHJpbmcsIGNhbGxiYWNrKSA9PiBkaXNwYXRjaChnZXREaWFnbm9zaXNDcml0ZXJpYVJlc3VsdHMoc2VhcmNoU3RyaW5nLCBjYWxsYmFjaykpXG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpKFNlYXJjaENyaXRlcmlhKTtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG5pbXBvcnQgeyBnZXRMYWJzLCB0b2dnbGVEaWFnbm9zaXNDcml0ZXJpYSwgZ2V0RGlhZ25vc2lzQ3JpdGVyaWFSZXN1bHRzIH0gZnJvbSAnLi4vLi4vYWN0aW9ucy9pbmRleC5qcydcblxuaW1wb3J0IFNlYXJjaFJlc3VsdHNWaWV3IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvZGlhZ25vc2lzL3NlYXJjaFJlc3VsdHMvaW5kZXguanMnXG5cbmNsYXNzIFNlYXJjaFJlc3VsdHMgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgICAgICB0aGlzLnN0YXRlID0ge1xuXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdGF0aWMgY29udGV4dFR5cGVzID0ge1xuICAgICAgICByb3V0ZXI6ICgpID0+IG51bGxcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxTZWFyY2hSZXN1bHRzVmlldyB7Li4udGhpcy5wcm9wc30gLz5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9IChzdGF0ZSkgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgICAgc2VsZWN0ZWRMb2NhdGlvbixcbiAgICAgICAgc2VsZWN0ZWRDcml0ZXJpYXMsXG4gICAgICAgIGZpbHRlckNyaXRlcmlhLFxuICAgICAgICBMT0FERURfU0VBUkNIX0NSSVRFUklBX0xBQlxuICAgIH0gPSBzdGF0ZS5TRUFSQ0hfQ1JJVEVSSUFfTEFCU1xuXG4gICAgY29uc3QgTEFCUyA9IHN0YXRlLkxBQlNcbiAgICBjb25zdCB7IGxhYkxpc3QsIExPQURFRF9MQUJTX1NFQVJDSCB9ID0gc3RhdGUuTEFCX1NFQVJDSFxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgc2VsZWN0ZWRMb2NhdGlvbixcbiAgICAgICAgc2VsZWN0ZWRDcml0ZXJpYXMsXG4gICAgICAgIGZpbHRlckNyaXRlcmlhLFxuICAgICAgICBMT0FERURfU0VBUkNIX0NSSVRFUklBX0xBQixcbiAgICAgICAgTEFCUyxcbiAgICAgICAgbGFiTGlzdCwgTE9BREVEX0xBQlNfU0VBUkNIXG4gICAgfVxuXG59XG5cbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IChkaXNwYXRjaCkgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICAgIGdldExhYnM6IChzZWFyY2hTdGF0ZSwgZmlsdGVyQ3JpdGVyaWEsIG1lcmdlU3RhdGUpID0+IGRpc3BhdGNoKGdldExhYnMoc2VhcmNoU3RhdGUsIGZpbHRlckNyaXRlcmlhLCBtZXJnZVN0YXRlKSksXG4gICAgICAgIHRvZ2dsZURpYWdub3Npc0NyaXRlcmlhOiAodHlwZSwgY3JpdGVyaWEpID0+IGRpc3BhdGNoKHRvZ2dsZURpYWdub3Npc0NyaXRlcmlhKHR5cGUsIGNyaXRlcmlhKSksXG4gICAgICAgIGdldERpYWdub3Npc0NyaXRlcmlhUmVzdWx0czogKHNlYXJjaFN0cmluZywgY2FsbGJhY2spID0+IGRpc3BhdGNoKGdldERpYWdub3Npc0NyaXRlcmlhUmVzdWx0cyhzZWFyY2hTdHJpbmcsIGNhbGxiYWNrKSlcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpKFNlYXJjaFJlc3VsdHMpO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cbmltcG9ydCB7IGdldExhYkJ5SWQsIHRvZ2dsZURpYWdub3Npc0NyaXRlcmlhIH0gZnJvbSAnLi4vLi4vYWN0aW9ucy9pbmRleC5qcydcblxuaW1wb3J0IFRlc3RTZWxlY3RvclZpZXcgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9kaWFnbm9zaXMvdGVzdFNlbGVjdG9yJ1xuXG5jbGFzcyBUZXN0U2VsZWN0b3IgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgIH1cblxuICAgIHN0YXRpYyBjb250ZXh0VHlwZXMgPSB7XG4gICAgICAgIHJvdXRlcjogKCkgPT4gbnVsbFxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPFRlc3RTZWxlY3RvclZpZXcgey4uLnRoaXMucHJvcHN9IC8+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoc3RhdGUpID0+IHtcblxuICAgIGNvbnN0IHtcbiAgICAgICAgc2VsZWN0ZWRMb2NhdGlvbixcbiAgICAgICAgc2VsZWN0ZWRDcml0ZXJpYXMsXG4gICAgICAgIGZpbHRlckNyaXRlcmlhLFxuICAgICAgICBMT0FERURfU0VBUkNIX0NSSVRFUklBX0xBQlxuICAgIH0gPSBzdGF0ZS5TRUFSQ0hfQ1JJVEVSSUFfTEFCU1xuXG4gICAgbGV0IExBQlMgPSBzdGF0ZS5MQUJTXG5cbiAgICByZXR1cm4ge1xuICAgICAgICBzZWxlY3RlZENyaXRlcmlhcyxcbiAgICAgICAgTEFCU1xuICAgIH1cbn1cblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gKGRpc3BhdGNoKSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdG9nZ2xlRGlhZ25vc2lzQ3JpdGVyaWE6ICh0eXBlLCBjcml0ZXJpYSkgPT4gZGlzcGF0Y2godG9nZ2xlRGlhZ25vc2lzQ3JpdGVyaWEodHlwZSwgY3JpdGVyaWEpKSxcbiAgICAgICAgZ2V0TGFiQnlJZDogKGxhYklkKSA9PiBkaXNwYXRjaChnZXRMYWJCeUlkKGxhYklkKSlcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG1hcERpc3BhdGNoVG9Qcm9wcykoVGVzdFNlbGVjdG9yKTtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG5pbXBvcnQgeyBnZXREb2N0b3JCeUlkLCBnZXRUaW1lU2xvdHMgfSBmcm9tICcuLi8uLi9hY3Rpb25zL2luZGV4LmpzJ1xuXG5pbXBvcnQgQXBwb2ludG1lbnRTbG90VmlldyBmcm9tICcuLi8uLi9jb21wb25lbnRzL29wZC9hcHBvaW50bWVudFNsb3QvaW5kZXguanMnXG5cbmNsYXNzIEFwcG9pbnRtZW50U2xvdCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8QXBwb2ludG1lbnRTbG90VmlldyB7Li4udGhpcy5wcm9wc30gLz5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9IChzdGF0ZSkgPT4ge1xuXG4gICAgbGV0IERPQ1RPUlMgPSBzdGF0ZS5ET0NUT1JTXG5cbiAgICByZXR1cm4ge1xuICAgICAgICBET0NUT1JTXG4gICAgfVxufVxuXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSAoZGlzcGF0Y2gpID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgICBnZXREb2N0b3JCeUlkIDogKGRvY3RvcklkKSA9PiBkaXNwYXRjaChnZXREb2N0b3JCeUlkKGRvY3RvcklkKSksXG4gICAgICAgIGdldFRpbWVTbG90cyA6IChkb2N0b3JJZCwgY2xpbmljSWQsIGNhbGxiYWNrKSA9PiBkaXNwYXRjaChnZXRUaW1lU2xvdHMoZG9jdG9ySWQsIGNsaW5pY0lkLCBjYWxsYmFjaykpXG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpKEFwcG9pbnRtZW50U2xvdCk7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcblxuaW1wb3J0IHsgfSBmcm9tICcuLi8uLi9hY3Rpb25zL2luZGV4LmpzJ1xuXG5pbXBvcnQgQm9va2luZ1ZpZXcgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9vcGQvYm9va2luZy9Cb29raW5nVmlldy5qcydcblxuY2xhc3MgQm9va2luZyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8Qm9va2luZ1ZpZXcgey4uLnRoaXMucHJvcHN9IC8+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoc3RhdGUpID0+IHtcblxuICAgIHJldHVybiB7XG5cbiAgICB9XG59XG5cbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IChkaXNwYXRjaCkgPT4ge1xuICAgIHJldHVybiB7XG5cbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG1hcERpc3BhdGNoVG9Qcm9wcykoQm9va2luZyk7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcblxuaW1wb3J0IHsgZ2V0RG9jdG9yQnlJZCB9IGZyb20gJy4uLy4uL2FjdGlvbnMvaW5kZXguanMnXG5cbmltcG9ydCBDbGluaWNMaXN0VmlldyBmcm9tICcuLi8uLi9jb21wb25lbnRzL29wZC9jbGluaWNMaXN0L2luZGV4LmpzJ1xuXG5jbGFzcyBDbGluaWNMaXN0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxDbGluaWNMaXN0VmlldyB7Li4udGhpcy5wcm9wc30gLz5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9IChzdGF0ZSkgPT4ge1xuXG4gICAgbGV0IERPQ1RPUlMgPSBzdGF0ZS5ET0NUT1JTXG5cbiAgICByZXR1cm4ge1xuICAgICAgICBET0NUT1JTXG4gICAgfVxufVxuXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSAoZGlzcGF0Y2gpID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgICBnZXREb2N0b3JCeUlkIDogKGRvY3RvcklkKSA9PiBkaXNwYXRjaChnZXREb2N0b3JCeUlkKGRvY3RvcklkKSlcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG1hcERpc3BhdGNoVG9Qcm9wcykoQ2xpbmljTGlzdCk7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcblxuaW1wb3J0IHsgZ2V0Q3JpdGVyaWFSZXN1bHRzLCB0b2dnbGVDcml0ZXJpYSB9IGZyb20gJy4uLy4uL2FjdGlvbnMvaW5kZXguanMnXG5pbXBvcnQgQ3JpdGVyaWFTZWFyY2hWaWV3IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvb3BkL2NyaXRlcmlhU2VhcmNoL2luZGV4LmpzJ1xuXG5jbGFzcyBDcml0ZXJpYVNlYXJjaCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8Q3JpdGVyaWFTZWFyY2hWaWV3XG4gICAgICAgICAgICAgICAgeyAuLi50aGlzLnByb3BzIH1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoc3RhdGUpID0+IHtcblxuICAgIHJldHVybiB7XG5cbiAgICB9XG59XG5cbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IChkaXNwYXRjaCkgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICAgIGdldENyaXRlcmlhUmVzdWx0cyA6IChzZWFyY2hTdHJpbmcsY2IpID0+IGRpc3BhdGNoKGdldENyaXRlcmlhUmVzdWx0cyhzZWFyY2hTdHJpbmcsY2IpKSxcbiAgICAgICAgdG9nZ2xlQ3JpdGVyaWEgOiAoY3JpdGVyaWEpID0+IGRpc3BhdGNoKHRvZ2dsZUNyaXRlcmlhKGNyaXRlcmlhKSlcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG1hcERpc3BhdGNoVG9Qcm9wcykoQ3JpdGVyaWFTZWFyY2gpO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cbmltcG9ydCB7IGdldERvY3RvckJ5SWQgfSBmcm9tICcuLi8uLi9hY3Rpb25zL2luZGV4LmpzJ1xuXG5pbXBvcnQgRG9jdG9yUHJvZmlsZVZpZXcgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9vcGQvZG9jdG9yUHJvZmlsZS9pbmRleC5qcydcblxuY2xhc3MgRG9jdG9yUHJvZmlsZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8RG9jdG9yUHJvZmlsZVZpZXcgey4uLnRoaXMucHJvcHN9IC8+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoc3RhdGUpID0+IHtcblxuICAgIGxldCBET0NUT1JTID0gc3RhdGUuRE9DVE9SU1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgRE9DVE9SU1xuICAgIH1cbn1cblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gKGRpc3BhdGNoKSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgZ2V0RG9jdG9yQnlJZCA6IChkb2N0b3JJZCkgPT4gZGlzcGF0Y2goZ2V0RG9jdG9yQnlJZChkb2N0b3JJZCkpXG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpKERvY3RvclByb2ZpbGUpO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cbmltcG9ydCB7IHNlbGVjdExvY2F0aW9uIH0gZnJvbSAnLi4vLi4vYWN0aW9ucy9pbmRleC5qcydcbmltcG9ydCBMb2NhdGlvblNlYXJjaFZpZXcgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9vcGQvbG9jYXRpb25TZWFyY2gvaW5kZXguanMnXG5cbmNsYXNzIExvY2F0aW9uU2VhcmNoIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICB9XG5cbiAgICBzdGF0aWMgY29udGV4dFR5cGVzID0ge1xuICAgICAgICByb3V0ZXI6ICgpID0+IG51bGxcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxMb2NhdGlvblNlYXJjaFZpZXcgey4uLnRoaXMucHJvcHN9IC8+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoc3RhdGUpID0+IHtcbiAgICBjb25zdCB7XG4gICAgICAgIHNlbGVjdGVkTG9jYXRpb25cbiAgICB9ID0gc3RhdGUuU0VBUkNIX0NSSVRFUklBX09QRFxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgc2VsZWN0ZWRMb2NhdGlvblxuICAgIH1cbn1cblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gKGRpc3BhdGNoKSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgc2VsZWN0TG9jYXRpb246IChsb2NhdGlvbikgPT4gZGlzcGF0Y2goc2VsZWN0TG9jYXRpb24obG9jYXRpb24pKVxuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbWFwRGlzcGF0Y2hUb1Byb3BzKShMb2NhdGlvblNlYXJjaCk7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcblxuaW1wb3J0IHsgZ2V0RG9jdG9yQnlJZCB9IGZyb20gJy4uLy4uL2FjdGlvbnMvaW5kZXguanMnXG5cbmltcG9ydCBQYXRpZW50RGV0YWlsc1ZpZXcgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9vcGQvcGF0aWVudERldGFpbHMvaW5kZXguanMnXG5cbmNsYXNzIFBhdGllbnREZXRhaWxzIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxQYXRpZW50RGV0YWlsc1ZpZXcgey4uLnRoaXMucHJvcHN9IC8+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoc3RhdGUpID0+IHtcblxuICAgIGxldCBET0NUT1JTID0gc3RhdGUuRE9DVE9SU1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgRE9DVE9SU1xuICAgIH1cbn1cblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gKGRpc3BhdGNoKSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgZ2V0RG9jdG9yQnlJZCA6IChkb2N0b3JJZCkgPT4gZGlzcGF0Y2goZ2V0RG9jdG9yQnlJZChkb2N0b3JJZCkpXG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpKFBhdGllbnREZXRhaWxzKTtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG5pbXBvcnQgeyB9IGZyb20gJy4uLy4uL2FjdGlvbnMvaW5kZXguanMnXG5cbmltcG9ydCBQYXltZW50VmlldyBmcm9tICcuLi8uLi9jb21wb25lbnRzL29wZC9wYXltZW50L1BheW1lbnRWaWV3LmpzJ1xuXG5jbGFzcyBQYXltZW50IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxQYXltZW50VmlldyB7Li4udGhpcy5wcm9wc30gLz5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9IChzdGF0ZSkgPT4ge1xuXG4gICAgcmV0dXJuIHtcblxuICAgIH1cbn1cblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gKGRpc3BhdGNoKSA9PiB7XG4gICAgcmV0dXJuIHtcblxuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbWFwRGlzcGF0Y2hUb1Byb3BzKShQYXltZW50KTtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG5pbXBvcnQgeyBnZXRPUERDcml0ZXJpYVJlc3VsdHMsIHRvZ2dsZU9QRENyaXRlcmlhLCBsb2FkT1BEQ29tbW9uQ3JpdGVyaWEgfSBmcm9tICcuLi8uLi9hY3Rpb25zL2luZGV4LmpzJ1xuaW1wb3J0IFNlYXJjaENyaXRlcmlhVmlldyBmcm9tICcuLi8uLi9jb21wb25lbnRzL29wZC9zZWFyY2hDcml0ZXJpYS9pbmRleC5qcydcblxuY2xhc3MgU2VhcmNoQ3JpdGVyaWEgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgIH1cblxuICAgIHN0YXRpYyBsb2FkRGF0YShzdG9yZSkge1xuICAgICAgICByZXR1cm4gc3RvcmUuZGlzcGF0Y2gobG9hZE9QRENvbW1vbkNyaXRlcmlhKCkpXG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIHRoaXMucHJvcHMubG9hZE9QRENvbW1vbkNyaXRlcmlhKClcbiAgICB9XG5cbiAgICBzdGF0aWMgY29udGV4dFR5cGVzID0ge1xuICAgICAgICByb3V0ZXI6ICgpID0+IG51bGxcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxTZWFyY2hDcml0ZXJpYVZpZXcgey4uLnRoaXMucHJvcHN9IC8+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoc3RhdGUpID0+IHtcblxuICAgIGNvbnN0IHtcbiAgICAgICAgTE9BREVEX1NFQVJDSF9DUklURVJJQV9PUEQsXG4gICAgICAgIHNwZWNpYWxpemF0aW9ucyxcbiAgICAgICAgY29uZGl0aW9ucyxcbiAgICAgICAgc2VsZWN0ZWRDcml0ZXJpYXMsXG4gICAgICAgIHNlbGVjdGVkTG9jYXRpb24sXG4gICAgICAgIGZpbHRlckNyaXRlcmlhXG4gICAgfSA9IHN0YXRlLlNFQVJDSF9DUklURVJJQV9PUERcblxuICAgIHJldHVybiB7XG4gICAgICAgIExPQURFRF9TRUFSQ0hfQ1JJVEVSSUFfT1BELFxuICAgICAgICBzcGVjaWFsaXphdGlvbnMsXG4gICAgICAgIGNvbmRpdGlvbnMsXG4gICAgICAgIHNlbGVjdGVkQ3JpdGVyaWFzLFxuICAgICAgICBzZWxlY3RlZExvY2F0aW9uLFxuICAgICAgICBmaWx0ZXJDcml0ZXJpYVxuICAgIH1cbn1cblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gKGRpc3BhdGNoKSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgbG9hZE9QRENvbW1vbkNyaXRlcmlhOiAoKSA9PiBkaXNwYXRjaChsb2FkT1BEQ29tbW9uQ3JpdGVyaWEoKSksXG4gICAgICAgIHRvZ2dsZU9QRENyaXRlcmlhOiAodHlwZSwgY3JpdGVyaWEpID0+IGRpc3BhdGNoKHRvZ2dsZU9QRENyaXRlcmlhKHR5cGUsIGNyaXRlcmlhKSksXG4gICAgICAgIGdldE9QRENyaXRlcmlhUmVzdWx0czogKHNlYXJjaFN0cmluZywgY2FsbGJhY2spID0+IGRpc3BhdGNoKGdldE9QRENyaXRlcmlhUmVzdWx0cyhzZWFyY2hTdHJpbmcsIGNhbGxiYWNrKSlcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG1hcERpc3BhdGNoVG9Qcm9wcykoU2VhcmNoQ3JpdGVyaWEpO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cbmltcG9ydCB7IGdldERvY3RvcnMsIGdldE9QRENyaXRlcmlhUmVzdWx0cywgdG9nZ2xlT1BEQ3JpdGVyaWEgfSBmcm9tICcuLi8uLi9hY3Rpb25zL2luZGV4LmpzJ1xuXG5pbXBvcnQgU2VhcmNoUmVzdWx0c1ZpZXcgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9vcGQvc2VhcmNoUmVzdWx0cy9pbmRleC5qcydcblxuY2xhc3MgU2VhcmNoUmVzdWx0cyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG5cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN0YXRpYyBjb250ZXh0VHlwZXMgPSB7XG4gICAgICAgIHJvdXRlcjogKCkgPT4gbnVsbFxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPFNlYXJjaFJlc3VsdHNWaWV3IHsuLi50aGlzLnByb3BzfSAvPlxuICAgICAgICApXG4gICAgfVxufVxuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoc3RhdGUpID0+IHtcblxuICAgIGNvbnN0IHtcbiAgICAgICAgTE9BREVEX1NFQVJDSF9DUklURVJJQV9PUEQsXG4gICAgICAgIHNlbGVjdGVkQ3JpdGVyaWFzLFxuICAgICAgICBzZWxlY3RlZExvY2F0aW9uLFxuICAgICAgICBmaWx0ZXJDcml0ZXJpYVxuICAgIH0gPSBzdGF0ZS5TRUFSQ0hfQ1JJVEVSSUFfT1BEXG5cbiAgICBsZXQgRE9DVE9SUyA9IHN0YXRlLkRPQ1RPUlNcbiAgICBsZXQgeyBkb2N0b3JMaXN0LCBMT0FERURfRE9DVE9SX1NFQVJDSCB9ID0gc3RhdGUuRE9DVE9SX1NFQVJDSFxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgRE9DVE9SUywgZG9jdG9yTGlzdCwgTE9BREVEX0RPQ1RPUl9TRUFSQ0gsXG4gICAgICAgIExPQURFRF9TRUFSQ0hfQ1JJVEVSSUFfT1BELFxuICAgICAgICBzZWxlY3RlZENyaXRlcmlhcyxcbiAgICAgICAgc2VsZWN0ZWRMb2NhdGlvbixcbiAgICAgICAgZmlsdGVyQ3JpdGVyaWFcbiAgICB9XG59XG5cbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IChkaXNwYXRjaCkgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICAgIGxvYWRPUERDb21tb25Dcml0ZXJpYTogKCkgPT4gZGlzcGF0Y2gobG9hZE9QRENvbW1vbkNyaXRlcmlhKCkpLFxuICAgICAgICB0b2dnbGVPUERDcml0ZXJpYTogKHR5cGUsIGNyaXRlcmlhKSA9PiBkaXNwYXRjaCh0b2dnbGVPUERDcml0ZXJpYSh0eXBlLCBjcml0ZXJpYSkpLFxuICAgICAgICBnZXREb2N0b3JzOiAoc2VhcmNoU3RhdGUsIGZpbHRlckNyaXRlcmlhLCBtZXJnZVN0YXRlKSA9PiBkaXNwYXRjaChnZXREb2N0b3JzKHNlYXJjaFN0YXRlLCBmaWx0ZXJDcml0ZXJpYSwgbWVyZ2VTdGF0ZSkpXG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbWFwRGlzcGF0Y2hUb1Byb3BzKShTZWFyY2hSZXN1bHRzKTtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG5pbXBvcnQgeyBzZXRPUERGaWx0ZXJzIH0gZnJvbSAnLi4vLi4vYWN0aW9ucy9pbmRleC5qcydcblxuaW1wb3J0IFNlYXJjaFJlc3VsdHNGaWx0ZXJWaWV3IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvb3BkL3NlYXJjaFJlc3VsdHNGaWx0ZXIvaW5kZXguanMnXG5cbmNsYXNzIFNlYXJjaFJlc3VsdHNGaWx0ZXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPFNlYXJjaFJlc3VsdHNGaWx0ZXJWaWV3IHsuLi50aGlzLnByb3BzfS8+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoc3RhdGUpID0+IHtcblxuICAgIGNvbnN0IHtcbiAgICAgICAgZmlsdGVyQ3JpdGVyaWFcbiAgICB9ID0gc3RhdGUuU0VBUkNIX0NSSVRFUklBX09QRFxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgZmlsdGVyQ3JpdGVyaWFcbiAgICB9XG59XG5cbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IChkaXNwYXRjaCkgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICAgIHNldE9QREZpbHRlcnMgOiAoZmlsdGVyRGF0YSkgPT4gZGlzcGF0Y2goc2V0T1BERmlsdGVycyhmaWx0ZXJEYXRhKSlcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG1hcERpc3BhdGNoVG9Qcm9wcykoU2VhcmNoUmVzdWx0c0ZpbHRlcik7XG4iLCJpbXBvcnQgTkFWSUdBVEUgZnJvbSAnLi9uYXZpZ2F0ZSdcblxuZXhwb3J0IGRlZmF1bHQgTkFWSUdBVEUiLCJjb25zdCBOQVZJR0FURSA9IHtcbiAgICBuYXZpZ2F0ZVRvIDogKHdoZXJlKSA9PiB7XG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gd2hlcmVcbiAgICB9LFxuXG4gICAgcmVmcmVzaEFwcG9pbnRtZW50U3RhdGUgOiAocHJvcHMpID0+IHtcbiAgICAgICAgbGV0IG5vQXBwb2ludG1lbnRGb3VuZCA9IHByb3BzLnVwY29taW5nLmxlbmd0aCA9PSAwICYmIHByb3BzLnByZXZpb3VzLmxlbmd0aCA9PSAwXG4gICAgICAgIFxuICAgICAgICBpZihwcm9wcy5oaXN0b3J5LmFjdGlvbiA9PT0gJ1BVU0gnIHx8IG5vQXBwb2ludG1lbnRGb3VuZCl7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE5BVklHQVRFIiwiaW1wb3J0IFNUT1JBR0UgZnJvbSAnLi9zdG9yYWdlJ1xuXG5leHBvcnQgZGVmYXVsdCBTVE9SQUdFIiwiaW1wb3J0IENvb2tpZXMgZnJvbSAndW5pdmVyc2FsLWNvb2tpZSc7XG5jb25zdCBjb29raWVzID0gbmV3IENvb2tpZXMoKTtcblxuY29uc3QgU1RPUkFHRSA9IHtcbiAgICBzZXRBdXRoVG9rZW46ICh0b2tlbikgPT4ge1xuICAgICAgICBjb29raWVzLnNldCgndG9rZW4nLCB0b2tlbilcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh0cnVlKVxuICAgIH0sXG4gICAgZ2V0QXV0aFRva2VuOiAoKSA9PiB7XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoY29va2llcy5nZXQoJ3Rva2VuJykpXG4gICAgfSxcbiAgICBjaGVja0F1dGg6ICgpID0+IHtcbiAgICAgICAgcmV0dXJuICEhY29va2llcy5nZXQoJ3Rva2VuJylcbiAgICB9LFxuICAgIGRlbGV0ZUF1dGg6ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShjb29raWVzLnJlbW92ZSgndG9rZW4nKSlcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFNUT1JBR0UiLCJpbXBvcnQgeyBTRU5EX09UUF9SRVFVRVNULCBTRU5EX09UUF9TVUNDRVNTLCBTRU5EX09UUF9GQUlMLCBTVUJNSVRfT1RQX1JFUVVFU1QsIFNVQk1JVF9PVFBfU1VDQ0VTUywgU1VCTUlUX09UUF9GQUlMIH0gZnJvbSAnLi4vLi4vY29uc3RhbnRzL3R5cGVzJztcblxuY29uc3QgZGVmYXVsdFN0YXRlID0ge1xuICAgIHRva2VuOiBudWxsLFxuICAgIGVycm9yX21lc3NhZ2U6IFwiXCIsXG4gICAgc3VjY2Vzc19tZXNzYWdlOiBcIlwiLFxuICAgIG90cF9yZXF1ZXN0X3NlbnQ6IGZhbHNlLFxuICAgIG90cF9yZXF1ZXN0X3N1Y2Nlc3M6IGZhbHNlLFxuICAgIG90cF9yZXF1ZXN0X2ZhaWw6IGZhbHNlLFxuICAgIHBob25lTnVtYmVyOiBcIlwiLFxuICAgIHN1Ym1pdF9vdHA6ZmFsc2UsXG4gICAgc3VibWl0X290cF9zdWNjZXNzOmZhbHNlLFxuICAgIHN1Ym1pdF9vdHBfZmFpbDpmYWxzZVxufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoc3RhdGUgPSBkZWZhdWx0U3RhdGUsIGFjdGlvbikge1xuXG4gICAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgICAgICBjYXNlIFNFTkRfT1RQX1JFUVVFU1Q6IHtcbiAgICAgICAgICAgIGxldCBuZXdTdGF0ZSA9IHsgLi4uZGVmYXVsdFN0YXRlIH1cblxuICAgICAgICAgICAgbmV3U3RhdGUub3RwX3JlcXVlc3Rfc2VudCA9IHRydWVcbiAgICAgICAgICAgIG5ld1N0YXRlLnBob25lTnVtYmVyID0gYWN0aW9uLnBheWxvYWQucGhvbmVOdW1iZXJcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgcmV0dXJuIG5ld1N0YXRlXG4gICAgICAgIH1cblxuICAgICAgICBjYXNlIFNFTkRfT1RQX1NVQ0NFU1M6IHtcbiAgICAgICAgICAgIGxldCBuZXdTdGF0ZSA9IHsgLi4uc3RhdGUgfVxuICAgICAgICAgICAgbmV3U3RhdGUub3RwX3JlcXVlc3Rfc2VudCA9IGZhbHNlXG4gICAgICAgICAgICBuZXdTdGF0ZS5vdHBfcmVxdWVzdF9zdWNjZXNzID0gdHJ1ZVxuICAgICAgICAgICAgbmV3U3RhdGUub3RwX3JlcXVlc3RfZmFpbCA9IGZhbHNlXG4gICAgICAgICAgICBuZXdTdGF0ZS5zdWNjZXNzX21lc3NhZ2UgPSBhY3Rpb24ucGF5bG9hZC5zdWNjZXNzX21lc3NhZ2VcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgcmV0dXJuIG5ld1N0YXRlXG4gICAgICAgIH1cblxuICAgICAgICBjYXNlIFNFTkRfT1RQX0ZBSUw6IHtcbiAgICAgICAgICAgIGxldCBuZXdTdGF0ZSA9IHsgLi4uc3RhdGUgfVxuICAgICAgICAgICAgbmV3U3RhdGUub3RwX3JlcXVlc3Rfc2VudCA9IGZhbHNlXG4gICAgICAgICAgICBuZXdTdGF0ZS5vdHBfcmVxdWVzdF9mYWlsID0gdHJ1ZVxuICAgICAgICAgICAgbmV3U3RhdGUub3RwX3JlcXVlc3Rfc3VjY2VzcyA9IGZhbHNlXG4gICAgICAgICAgICBuZXdTdGF0ZS5lcnJvcl9tZXNzYWdlID0gYWN0aW9uLnBheWxvYWQuZXJyb3JfbWVzc2FnZVxuICAgICAgICAgICAgXG4gICAgICAgICAgICByZXR1cm4gbmV3U3RhdGVcbiAgICAgICAgfVxuXG4gICAgICAgIGNhc2UgU1VCTUlUX09UUF9SRVFVRVNUOiB7XG4gICAgICAgICAgICBsZXQgbmV3U3RhdGUgPSB7IC4uLnN0YXRlIH1cbiAgICAgICAgICAgIG5ld1N0YXRlLnN1Ym1pdF9vdHAgPSB0cnVlXG4gICAgICAgICAgICByZXR1cm4gbmV3U3RhdGVcbiAgICAgICAgfVxuXG4gICAgICAgIGNhc2UgU1VCTUlUX09UUF9TVUNDRVNTOiB7XG4gICAgICAgICAgICBsZXQgbmV3U3RhdGUgPSB7IC4uLnN0YXRlIH1cbiAgICAgICAgICAgIG5ld1N0YXRlLnN1Ym1pdF9vdHAgPSBmYWxzZVxuICAgICAgICAgICAgbmV3U3RhdGUuc3VibWl0X290cF9mYWlsID0gZmFsc2VcbiAgICAgICAgICAgIG5ld1N0YXRlLnN1Ym1pdF9vdHBfc3VjY2VzcyA9IHRydWVcbiAgICAgICAgICAgIG5ld1N0YXRlLnRva2VuID0gYWN0aW9uLnBheWxvYWQudG9rZW5cbiAgICAgICAgICAgIHJldHVybiBuZXdTdGF0ZVxuICAgICAgICB9XG5cbiAgICAgICAgY2FzZSBTVUJNSVRfT1RQX0ZBSUw6IHtcbiAgICAgICAgICAgIGxldCBuZXdTdGF0ZSA9IHsgLi4uc3RhdGUgfVxuICAgICAgICAgICAgbmV3U3RhdGUuc3VibWl0X290cCA9IGZhbHNlXG4gICAgICAgICAgICBuZXdTdGF0ZS5zdWJtaXRfb3RwX2ZhaWwgPSB0cnVlXG4gICAgICAgICAgICBuZXdTdGF0ZS5zdWJtaXRfb3RwX3N1Y2Nlc3MgPSBmYWxzZVxuICAgICAgICAgICAgbmV3U3RhdGUuZXJyb3JfbWVzc2FnZSA9IGFjdGlvbi5wYXlsb2FkLmVycm9yX21lc3NhZ2VcbiAgICAgICAgICAgIHJldHVybiBuZXdTdGF0ZVxuICAgICAgICB9XG5cbiAgICB9XG4gICAgcmV0dXJuIHN0YXRlXG59IiwiaW1wb3J0IHsgQVBQRU5EX1VTRVJfUFJPRklMRVMgfSBmcm9tICcuLi8uLi9jb25zdGFudHMvdHlwZXMnO1xuXG5jb25zdCBkZWZhdWx0U3RhdGUgPSB7XG4gICAgcHJvZmlsZXM6IHt9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChzdGF0ZSA9IGRlZmF1bHRTdGF0ZSwgYWN0aW9uKSB7XG5cbiAgICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgICAgIGNhc2UgQVBQRU5EX1VTRVJfUFJPRklMRVM6IHtcbiAgICAgICAgICAgIGxldCBuZXdTdGF0ZSA9IHtcbiAgICAgICAgICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgICAgICAgICBwcm9maWxlcyA6IHsgLi4uc3RhdGUucHJvZmlsZXMgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBuZXdTdGF0ZS5wcm9maWxlcyA9IGFjdGlvbi5wYXlsb2FkLnJlZHVjZSgocHJvZmlsZU1hcCwgcHJvZmlsZSkgPT4ge1xuICAgICAgICAgICAgICAgIHByb2ZpbGVNYXBbcHJvZmlsZS5wcm9maWxlSWRdID0gcHJvZmlsZVxuICAgICAgICAgICAgICAgIHJldHVybiBwcm9maWxlTWFwXG4gICAgICAgICAgICB9LCBuZXdTdGF0ZS5wcm9maWxlcylcblxuICAgICAgICAgICAgcmV0dXJuIG5ld1N0YXRlXG4gICAgICAgIH1cblxuICAgIH1cbiAgICByZXR1cm4gc3RhdGVcbn0iLCJpbXBvcnQgeyBBUFBFTkRfTEFCUyB9IGZyb20gJy4uLy4uL2NvbnN0YW50cy90eXBlcyc7XG5cbmNvbnN0IGRlZmF1bHRTdGF0ZSA9IHtcblxufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoc3RhdGUgPSBkZWZhdWx0U3RhdGUsIGFjdGlvbikge1xuXG4gICAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgICAgICBjYXNlIEFQUEVORF9MQUJTOiB7XG4gICAgICAgICAgICBsZXQgbmV3U3RhdGUgPSB7IC4uLnN0YXRlIH1cblxuICAgICAgICAgICAgcmV0dXJuIGFjdGlvbi5wYXlsb2FkLnJlZHVjZSgobGFwTWFwLCBsYWIpID0+IHtcbiAgICAgICAgICAgICAgICBsYXBNYXBbbGFiLmxhYi5pZF0gPSBsYWJcbiAgICAgICAgICAgICAgICByZXR1cm4gbGFwTWFwXG4gICAgICAgICAgICB9LG5ld1N0YXRlKVxuXG4gICAgICAgIH1cblxuICAgIH1cbiAgICByZXR1cm4gc3RhdGVcbn0iLCJpbXBvcnQgeyBMQUJfU0VBUkNIX1NUQVJULCBMQUJfU0VBUkNIIH0gZnJvbSAnLi4vLi4vY29uc3RhbnRzL3R5cGVzJztcblxuY29uc3QgZGVmYXVsdFN0YXRlID0ge1xuICAgIGxhYkxpc3Q6IFtdLFxuICAgIExPQURFRF9MQUJTX1NFQVJDSDogZmFsc2Vcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHN0YXRlID0gZGVmYXVsdFN0YXRlLCBhY3Rpb24pIHtcblxuICAgIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcblxuICAgICAgICBjYXNlIExBQl9TRUFSQ0hfU1RBUlQ6IHtcbiAgICAgICAgICAgIGxldCBuZXdTdGF0ZSA9IHsgLi4uc3RhdGUgfVxuXG4gICAgICAgICAgICBuZXdTdGF0ZS5MT0FERURfTEFCU19TRUFSQ0ggPSBmYWxzZVxuXG4gICAgICAgICAgICByZXR1cm4gbmV3U3RhdGVcbiAgICAgICAgfVxuXG4gICAgICAgIGNhc2UgTEFCX1NFQVJDSDoge1xuICAgICAgICAgICAgbGV0IG5ld1N0YXRlID0geyAuLi5zdGF0ZSB9XG5cbiAgICAgICAgICAgIG5ld1N0YXRlLmxhYkxpc3QgPSBhY3Rpb24ucGF5bG9hZC5tYXAobGFiID0+IGxhYi5sYWIuaWQpXG4gICAgICAgICAgICBuZXdTdGF0ZS5MT0FERURfTEFCU19TRUFSQ0ggPSB0cnVlXG5cbiAgICAgICAgICAgIHJldHVybiBuZXdTdGF0ZVxuICAgICAgICB9XG5cbiAgICB9XG4gICAgXG4gICAgcmV0dXJuIHN0YXRlXG59IiwiaW1wb3J0IHsgQVBQRU5EX0ZJTFRFUlNfRElBR05PU0lTLCBUT0dHTEVfQ09ORElUSU9OUywgVE9HR0xFX1NQRUNJQUxJVElFUywgU0VMRUNUX0xPQ0FUSU9OX0RJQUdOT1NJUywgTUVSR0VfU0VBUkNIX1NUQVRFX0xBQiwgVE9HR0xFX0NSSVRFUklBLCBUT0dHTEVfVEVTVFMsIFRPR0dMRV9ESUFHTk9TSVNfQ1JJVEVSSUEsIExPQURfU0VBUkNIX0NSSVRFUklBX0xBQiB9IGZyb20gJy4uLy4uL2NvbnN0YW50cy90eXBlcyc7XG5cbmNvbnN0IGRlZmF1bHRTdGF0ZSA9IHtcbiAgICBMT0FERURfU0VBUkNIX0NSSVRFUklBX0xBQjogZmFsc2UsXG4gICAgY29tbW9uX3Rlc3RzOiBbXSxcbiAgICBjb21tb25fY29uZGl0aW9uczogW10sXG4gICAgcHJlZmVycmVkX2xhYnM6IFtdLFxuICAgIHNlbGVjdGVkQ3JpdGVyaWFzOiBbXSxcbiAgICBzZWxlY3RlZExvY2F0aW9uOiBudWxsLFxuICAgIGZpbHRlckNyaXRlcmlhOiB7XG4gICAgICAgIHByaWNlUmFuZ2U6IFsxMDAsIDE1MDBdLFxuICAgICAgICBkaXN0YW5jZVJhbmdlOiBbMSwgMzVdLFxuICAgICAgICBzb3J0Qnk6IG51bGxcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChzdGF0ZSA9IGRlZmF1bHRTdGF0ZSwgYWN0aW9uKSB7XG5cbiAgICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgICAgIGNhc2UgTE9BRF9TRUFSQ0hfQ1JJVEVSSUFfTEFCOiB7XG4gICAgICAgICAgICBsZXQgbmV3U3RhdGUgPSB7IC4uLnN0YXRlIH1cbiAgICAgICAgICAgIGlmIChhY3Rpb24ucGF5bG9hZCkge1xuICAgICAgICAgICAgICAgIG5ld1N0YXRlID0geyAuLi5uZXdTdGF0ZSwgLi4uYWN0aW9uLnBheWxvYWQgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbmV3U3RhdGUuTE9BREVEX1NFQVJDSF9DUklURVJJQV9MQUIgPSB0cnVlXG4gICAgICAgICAgICByZXR1cm4gbmV3U3RhdGVcbiAgICAgICAgfVxuXG4gICAgICAgIGNhc2UgVE9HR0xFX0RJQUdOT1NJU19DUklURVJJQToge1xuICAgICAgICAgICAgbGV0IG5ld1N0YXRlID0ge1xuICAgICAgICAgICAgICAgIC4uLnN0YXRlLFxuICAgICAgICAgICAgICAgIHNlbGVjdGVkQ3JpdGVyaWFzOiBbXS5jb25jYXQoc3RhdGUuc2VsZWN0ZWRDcml0ZXJpYXMpXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxldCBmb3VuZCA9IGZhbHNlXG4gICAgICAgICAgICBuZXdTdGF0ZS5zZWxlY3RlZENyaXRlcmlhcyA9IG5ld1N0YXRlLnNlbGVjdGVkQ3JpdGVyaWFzLmZpbHRlcigoY3VycikgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChjdXJyLmlkID09IGFjdGlvbi5wYXlsb2FkLmNyaXRlcmlhLmlkICYmIGN1cnIudHlwZSA9PSBhY3Rpb24ucGF5bG9hZC50eXBlKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvdW5kID0gdHJ1ZVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgIGlmICghZm91bmQpIHtcbiAgICAgICAgICAgICAgICBuZXdTdGF0ZS5zZWxlY3RlZENyaXRlcmlhcy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgLi4uYWN0aW9uLnBheWxvYWQuY3JpdGVyaWEsXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IGFjdGlvbi5wYXlsb2FkLnR5cGVcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gbmV3U3RhdGVcbiAgICAgICAgfVxuXG4gICAgICAgIGNhc2UgU0VMRUNUX0xPQ0FUSU9OX0RJQUdOT1NJUzoge1xuICAgICAgICAgICAgbGV0IG5ld1N0YXRlID0geyAuLi5zdGF0ZSB9XG5cbiAgICAgICAgICAgIG5ld1N0YXRlLnNlbGVjdGVkTG9jYXRpb24gPSBhY3Rpb24ucGF5bG9hZFxuICAgICAgICAgICAgcmV0dXJuIG5ld1N0YXRlXG4gICAgICAgIH1cblxuICAgICAgICBjYXNlIE1FUkdFX1NFQVJDSF9TVEFURV9MQUI6IHtcbiAgICAgICAgICAgIGxldCBuZXdTdGF0ZSA9IHsgLi4uc3RhdGUsIC4uLmFjdGlvbi5wYXlsb2FkLnNlYXJjaFN0YXRlLCBmaWx0ZXJDcml0ZXJpYSA6IGFjdGlvbi5wYXlsb2FkLmZpbHRlckNyaXRlcmlhIH1cblxuICAgICAgICAgICAgcmV0dXJuIG5ld1N0YXRlXG4gICAgICAgIH1cblxuICAgIH1cbiAgICByZXR1cm4gc3RhdGVcbn1cblxuXG5cblxuXG4iLCJpbXBvcnQge2NvbWJpbmVSZWR1Y2Vyc30gZnJvbSAncmVkdXgnO1xuXG5pbXBvcnQgU0VBUkNIX0NSSVRFUklBX09QRCBmcm9tICcuL29wZC9zZWFyY2hDcml0ZXJpYS5qcydcbmltcG9ydCBTRUFSQ0hfQ1JJVEVSSUFfTEFCUyBmcm9tICcuL2RpYWdub3Npcy9zZWFyY2hDcml0ZXJpYS5qcydcbmltcG9ydCBET0NUT1JTIGZyb20gJy4vb3BkL2RvY3RvcnMuanMnXG5pbXBvcnQgRE9DVE9SX1NFQVJDSCBmcm9tICcuL29wZC9kb2N0b3JTZWFyY2guanMnXG5pbXBvcnQgTEFCUyBmcm9tICcuL2RpYWdub3Npcy9sYWJzLmpzJ1xuaW1wb3J0IExBQl9TRUFSQ0ggZnJvbSAnLi9kaWFnbm9zaXMvbGFic1NlYXJjaC5qcydcbmltcG9ydCBVU0VSIGZyb20gJy4vY29tbW9ucy91c2VyLmpzJ1xuaW1wb3J0IEFVVEggZnJvbSAnLi9jb21tb25zL2F1dGguanMnXG5cbmNvbnN0IGFsbFJlZHVjZXJzID0gY29tYmluZVJlZHVjZXJzKHtcbiAgICBTRUFSQ0hfQ1JJVEVSSUFfT1BELFxuICAgIFNFQVJDSF9DUklURVJJQV9MQUJTLFxuICAgIERPQ1RPUlMsXG4gICAgRE9DVE9SX1NFQVJDSCxcbiAgICBMQUJTLFxuICAgIExBQl9TRUFSQ0gsXG4gICAgVVNFUixcbiAgICBBVVRIXG59KTtcblxuZXhwb3J0IGRlZmF1bHQgYWxsUmVkdWNlcnNcbiIsImltcG9ydCB7IERPQ1RPUl9TRUFSQ0gsIERPQ1RPUl9TRUFSQ0hfU1RBUlQgfSBmcm9tICcuLi8uLi9jb25zdGFudHMvdHlwZXMnO1xuXG5jb25zdCBkZWZhdWx0U3RhdGUgPSB7XG4gICAgZG9jdG9yTGlzdDogW10sXG4gICAgTE9BREVEX0RPQ1RPUl9TRUFSQ0g6IGZhbHNlXG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChzdGF0ZSA9IGRlZmF1bHRTdGF0ZSwgYWN0aW9uKSB7XG5cbiAgICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG5cbiAgICAgICAgY2FzZSBET0NUT1JfU0VBUkNIX1NUQVJUOiB7XG4gICAgICAgICAgICBsZXQgbmV3U3RhdGUgPSB7IC4uLnN0YXRlIH1cblxuICAgICAgICAgICAgbmV3U3RhdGUuTE9BREVEX0RPQ1RPUl9TRUFSQ0ggPSBmYWxzZVxuXG4gICAgICAgICAgICByZXR1cm4gbmV3U3RhdGVcbiAgICAgICAgfVxuXG4gICAgICAgIGNhc2UgRE9DVE9SX1NFQVJDSDoge1xuICAgICAgICAgICAgbGV0IG5ld1N0YXRlID0geyAuLi5zdGF0ZSB9XG5cbiAgICAgICAgICAgIG5ld1N0YXRlLmRvY3Rvckxpc3QgPSBhY3Rpb24ucGF5bG9hZC5tYXAoZG9jID0+IGRvYy5pZClcbiAgICAgICAgICAgIG5ld1N0YXRlLkxPQURFRF9ET0NUT1JfU0VBUkNIID0gdHJ1ZVxuXG4gICAgICAgICAgICByZXR1cm4gbmV3U3RhdGVcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgcmV0dXJuIHN0YXRlXG59IiwiaW1wb3J0IHsgQVBQRU5EX0RPQ1RPUlMgfSBmcm9tICcuLi8uLi9jb25zdGFudHMvdHlwZXMnO1xuXG5jb25zdCBkZWZhdWx0U3RhdGUgPSB7XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHN0YXRlID0gZGVmYXVsdFN0YXRlLCBhY3Rpb24pIHtcblxuICAgIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICAgICAgY2FzZSBBUFBFTkRfRE9DVE9SUzoge1xuICAgICAgICAgICAgbGV0IG5ld1N0YXRlID0geyAuLi5zdGF0ZSB9XG5cbiAgICAgICAgICAgIHJldHVybiBhY3Rpb24ucGF5bG9hZC5yZWR1Y2UoKGRvY3Rvck1hcCwgZG9jdG9yKSA9PiB7XG4gICAgICAgICAgICAgICAgZG9jdG9yTWFwW2RvY3Rvci5pZF0gPSBkb2N0b3JcbiAgICAgICAgICAgICAgICByZXR1cm4gZG9jdG9yTWFwXG4gICAgICAgICAgICB9LG5ld1N0YXRlKVxuXG4gICAgICAgIH1cblxuICAgIH1cbiAgICByZXR1cm4gc3RhdGVcbn0iLCJpbXBvcnQgeyBTRUxFQ1RfTE9DQVRJT05fT1BELCBNRVJHRV9TRUFSQ0hfU1RBVEVfT1BELCBUT0dHTEVfT1BEX0NSSVRFUklBLCBMT0FEX1NFQVJDSF9DUklURVJJQV9PUEQgfSBmcm9tICcuLi8uLi9jb25zdGFudHMvdHlwZXMnO1xuXG5jb25zdCBkZWZhdWx0U3RhdGUgPSB7XG4gICAgTE9BREVEX1NFQVJDSF9DUklURVJJQV9PUEQ6IGZhbHNlLFxuICAgIHNwZWNpYWxpemF0aW9uczogW10sXG4gICAgY29uZGl0aW9uczogW10sXG4gICAgc2VsZWN0ZWRDcml0ZXJpYXM6IFtdLFxuICAgIHNlbGVjdGVkTG9jYXRpb246IG51bGwsXG4gICAgZmlsdGVyQ3JpdGVyaWE6IHtcbiAgICAgICAgcHJpY2VSYW5nZTogWzEwMCwgMTUwMF0sXG4gICAgICAgIHNvcnRfb246IG51bGwsXG4gICAgICAgIHNpdHNfYXRfY2xpbmljOiBmYWxzZSxcbiAgICAgICAgc2l0c19hdF9ob3NwaXRhbDogZmFsc2UsXG4gICAgICAgIGlzX2ZlbWFsZTogZmFsc2UsXG4gICAgICAgIGlzX2F2YWlsYWJsZTogZmFsc2VcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChzdGF0ZSA9IGRlZmF1bHRTdGF0ZSwgYWN0aW9uKSB7XG5cbiAgICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgICAgIGNhc2UgTE9BRF9TRUFSQ0hfQ1JJVEVSSUFfT1BEOiB7XG4gICAgICAgICAgICBsZXQgbmV3U3RhdGUgPSB7IC4uLnN0YXRlIH1cbiAgICAgICAgICAgIGlmIChhY3Rpb24ucGF5bG9hZCkge1xuICAgICAgICAgICAgICAgIG5ld1N0YXRlID0geyAuLi5uZXdTdGF0ZSwgLi4uYWN0aW9uLnBheWxvYWQgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbmV3U3RhdGUuTE9BREVEX1NFQVJDSF9DUklURVJJQV9PUEQgPSB0cnVlXG4gICAgICAgICAgICByZXR1cm4gbmV3U3RhdGVcbiAgICAgICAgfVxuXG4gICAgICAgIGNhc2UgVE9HR0xFX09QRF9DUklURVJJQToge1xuICAgICAgICAgICAgbGV0IG5ld1N0YXRlID0ge1xuICAgICAgICAgICAgICAgIC4uLnN0YXRlLFxuICAgICAgICAgICAgICAgIHNlbGVjdGVkQ3JpdGVyaWFzOiBbXS5jb25jYXQoc3RhdGUuc2VsZWN0ZWRDcml0ZXJpYXMpXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxldCBmb3VuZCA9IGZhbHNlXG4gICAgICAgICAgICBuZXdTdGF0ZS5zZWxlY3RlZENyaXRlcmlhcyA9IG5ld1N0YXRlLnNlbGVjdGVkQ3JpdGVyaWFzLmZpbHRlcigoY3VycikgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChjdXJyLmlkID09IGFjdGlvbi5wYXlsb2FkLmNyaXRlcmlhLmlkICYmIGN1cnIudHlwZSA9PSBhY3Rpb24ucGF5bG9hZC50eXBlKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvdW5kID0gdHJ1ZVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgIGlmICghZm91bmQpIHtcbiAgICAgICAgICAgICAgICBuZXdTdGF0ZS5zZWxlY3RlZENyaXRlcmlhcy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgLi4uYWN0aW9uLnBheWxvYWQuY3JpdGVyaWEsXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IGFjdGlvbi5wYXlsb2FkLnR5cGVcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gbmV3U3RhdGVcbiAgICAgICAgfVxuXG4gICAgICAgIGNhc2UgU0VMRUNUX0xPQ0FUSU9OX09QRDoge1xuICAgICAgICAgICAgbGV0IG5ld1N0YXRlID0geyAuLi5zdGF0ZSB9XG5cbiAgICAgICAgICAgIG5ld1N0YXRlLnNlbGVjdGVkTG9jYXRpb24gPSBhY3Rpb24ucGF5bG9hZFxuICAgICAgICAgICAgcmV0dXJuIG5ld1N0YXRlXG4gICAgICAgIH1cblxuICAgICAgICBjYXNlIE1FUkdFX1NFQVJDSF9TVEFURV9PUEQ6IHtcbiAgICAgICAgICAgIGxldCBuZXdTdGF0ZSA9IHsgLi4uc3RhdGUsIC4uLmFjdGlvbi5wYXlsb2FkLnNlYXJjaFN0YXRlLCBmaWx0ZXJDcml0ZXJpYTogYWN0aW9uLnBheWxvYWQuZmlsdGVyQ3JpdGVyaWEgfVxuXG4gICAgICAgICAgICByZXR1cm4gbmV3U3RhdGVcbiAgICAgICAgfVxuXG4gICAgfVxuICAgIHJldHVybiBzdGF0ZVxufVxuXG5cblxuXG5cbiIsImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBCcm93c2VyUm91dGVyLCBTd2l0Y2gsIFJvdXRlIH0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSdcblxuaW1wb3J0IHsgVHJhbnNpdGlvbkdyb3VwLCBDU1NUcmFuc2l0aW9uIH0gZnJvbSBcInJlYWN0LXRyYW5zaXRpb24tZ3JvdXBcIjtcblxuaW1wb3J0IFNlYXJjaENyaXRlcmlhIGZyb20gJy4vY29udGFpbmVycy9vcGQvU2VhcmNoQ3JpdGVyaWEuanMnXG5pbXBvcnQgTG9jYXRpb25TZWFyY2ggZnJvbSAnLi9jb250YWluZXJzL29wZC9Mb2NhdGlvblNlYXJjaC5qcydcbmltcG9ydCBTZWFyY2hSZXN1bHRzIGZyb20gJy4vY29udGFpbmVycy9vcGQvU2VhcmNoUmVzdWx0cy5qcydcbmltcG9ydCBTZWFyY2hSZXN1bHRzRmlsdGVyIGZyb20gJy4vY29udGFpbmVycy9vcGQvU2VhcmNoUmVzdWx0c0ZpbHRlci5qcydcbmltcG9ydCBEb2N0b3JQcm9maWxlIGZyb20gJy4vY29udGFpbmVycy9vcGQvRG9jdG9yUHJvZmlsZS5qcydcbmltcG9ydCBDbGluaWNMaXN0IGZyb20gJy4vY29udGFpbmVycy9vcGQvQ2xpbmljTGlzdC5qcydcbmltcG9ydCBBcHBvaW50bWVudFNsb3QgZnJvbSAnLi9jb250YWluZXJzL29wZC9BcHBvaW50bWVudFNsb3QuanMnXG5pbXBvcnQgUGF0aWVudERldGFpbHMgZnJvbSAnLi9jb250YWluZXJzL29wZC9QYXRpZW50RGV0YWlscy5qcydcblxuaW1wb3J0IFVzZXJQcm9maWxlIGZyb20gJy4vY29udGFpbmVycy9jb21tb25zL1VzZXJQcm9maWxlLmpzJ1xuaW1wb3J0IFVzZXJBcHBvaW50bWVudHMgZnJvbSAnLi9jb250YWluZXJzL2NvbW1vbnMvVXNlckFwcG9pbnRtZW50cy5qcydcbmltcG9ydCBVc2VyUmVwb3J0cyBmcm9tICcuL2NvbnRhaW5lcnMvY29tbW9ucy9Vc2VyUmVwb3J0cy5qcydcbmltcG9ydCBVc2VyU2lnbnVwIGZyb20gJy4vY29udGFpbmVycy9jb21tb25zL1VzZXJTaWdudXAnXG5cbmltcG9ydCBQYXltZW50IGZyb20gJy4vY29udGFpbmVycy9vcGQvUGF5bWVudC5qcydcbmltcG9ydCBCb29raW5nIGZyb20gJy4vY29udGFpbmVycy9vcGQvQm9va2luZy5qcydcbmltcG9ydCBDcml0ZXJpYVNlYXJjaCBmcm9tICcuL2NvbnRhaW5lcnMvb3BkL0NyaXRlcmlhU2VhcmNoLmpzJ1xuaW1wb3J0IERYX1NlYXJjaENyaXRlcmlhIGZyb20gJy4vY29udGFpbmVycy9kaWFnbm9zaXMvU2VhcmNoQ3JpdGVyaWEuanMnXG5pbXBvcnQgRFhfU2VhcmNoUmVzdWx0cyBmcm9tICcuL2NvbnRhaW5lcnMvZGlhZ25vc2lzL1NlYXJjaFJlc3VsdHMuanMnXG5pbXBvcnQgTGFiIGZyb20gJy4vY29udGFpbmVycy9kaWFnbm9zaXMvTGFiLmpzJ1xuaW1wb3J0IERYX1BhdGllbnREZXRhaWxzIGZyb20gJy4vY29udGFpbmVycy9kaWFnbm9zaXMvUGF0aWVudERldGFpbHMuanMnXG5pbXBvcnQgRFhfQm9va2luZ1N1bW1hcnkgZnJvbSAnLi9jb250YWluZXJzL2RpYWdub3Npcy9Cb29raW5nU3VtbWFyeS5qcydcbmltcG9ydCBEb2N0b3JDaGF0IGZyb20gJy4vY29udGFpbmVycy9jb21tb25zL0NoYXQuanMnXG5pbXBvcnQgVGVzdFNlbGVjdG9yIGZyb20gJy4vY29udGFpbmVycy9kaWFnbm9zaXMvVGVzdFNlbGVjdG9yJ1xuXG5pbXBvcnQgVXNlckxvZ2luIGZyb20gJy4vY29udGFpbmVycy9jb21tb25zL1VzZXJMb2dpbidcbmltcG9ydCBPdHBWZXJpZnkgZnJvbSAnLi9jb250YWluZXJzL2NvbW1vbnMvT3RwVmVyaWZ5J1xuXG5jb25zdCByb3V0ZXMgPSBbXG5cbiAgICB7IHBhdGg6ICcvb3BkJywgZXhhY3Q6IHRydWUsIGNvbXBvbmVudDogU2VhcmNoQ3JpdGVyaWEgfSxcbiAgICB7IHBhdGg6ICcvbG9jYXRpb25zZWFyY2gnLCBleGFjdDogdHJ1ZSwgY29tcG9uZW50OiBMb2NhdGlvblNlYXJjaCB9LFxuICAgIHsgcGF0aDogJy9vcGQvc2VhcmNocmVzdWx0cycsIGV4YWN0OiB0cnVlLCBjb21wb25lbnQ6IFNlYXJjaFJlc3VsdHMgfSxcbiAgICBcbiAgICB7IHBhdGg6ICcvZG9jdG9ycHJvZmlsZS86aWQnLCBleGFjdDogdHJ1ZSwgY29tcG9uZW50OiBEb2N0b3JQcm9maWxlIH0sXG4gICAgeyBwYXRoOiAnL2RvY3RvcnByb2ZpbGUvOmlkL2F2YWlsYWJpbGl0eScsIGV4YWN0OiB0cnVlLCBjb21wb25lbnQ6IENsaW5pY0xpc3QgfSxcbiAgICB7IHBhdGg6ICcvZG9jdG9ycHJvZmlsZS86aWQvOmNsaW5pY0lkL2Jvb2snLCBleGFjdDogdHJ1ZSwgY29tcG9uZW50OiBBcHBvaW50bWVudFNsb3QgfSxcbiAgICB7IHBhdGg6ICcvZG9jdG9ycHJvZmlsZS86aWQvOmNsaW5pY0lkL2Jvb2tkZXRhaWxzJywgZXhhY3Q6IHRydWUsIGNvbXBvbmVudDogUGF0aWVudERldGFpbHMgfSxcbiAgICBcbiAgICB7IHBhdGg6ICcvdXNlci9zaWdudXAnLCBleGFjdDogdHJ1ZSwgY29tcG9uZW50OiBVc2VyU2lnbnVwIH0sXG4gICAgeyBwYXRoOiAnL3VzZXInLCBleGFjdDogdHJ1ZSwgY29tcG9uZW50OiBVc2VyUHJvZmlsZSB9LFxuICAgIHsgcGF0aDogJy91c2VyLzppZCcsIGV4YWN0OiB0cnVlLCBjb21wb25lbnQ6IFVzZXJQcm9maWxlIH0sXG4gICAgeyBwYXRoOiAnL3VzZXIvOmlkL2FwcG9pbnRtZW50cycsIGV4YWN0OiB0cnVlLCBjb21wb25lbnQ6IFVzZXJBcHBvaW50bWVudHMgfSxcbiAgICB7IHBhdGg6ICcvdXNlci86aWQvcmVwb3J0cycsIGV4YWN0OiB0cnVlLCBjb21wb25lbnQ6IFVzZXJSZXBvcnRzIH0sXG4gICAgeyBwYXRoOiAnL2NoYXQnLCBleGFjdDogdHJ1ZSwgY29tcG9uZW50OiBEb2N0b3JDaGF0IH0sXG4gICAgeyBwYXRoOiAnL3BheW1lbnQnLCBleGFjdDogdHJ1ZSwgY29tcG9uZW50OiBQYXltZW50IH0sXG4gICAgeyBwYXRoOiAnL2Jvb2tpbmcvOnJlZklkJywgZXhhY3Q6IHRydWUsIGNvbXBvbmVudDogQm9va2luZyB9LFxuXG4gICAgeyBwYXRoOiAnL2xvZ2luJywgZXhhY3Q6IHRydWUsIGNvbXBvbmVudDogVXNlckxvZ2luIH0sXG4gICAgeyBwYXRoOiAnL290cC92ZXJpZnknLCBleGFjdDogdHJ1ZSwgY29tcG9uZW50OiBPdHBWZXJpZnkgfSxcblxuICAgIHsgcGF0aDogJy9keCcsIGV4YWN0OiB0cnVlLCBjb21wb25lbnQ6IERYX1NlYXJjaENyaXRlcmlhIH0sXG4gICAgeyBwYXRoOiAnL2R4L3NlYXJjaHJlc3VsdHMnLCBleGFjdDogdHJ1ZSwgY29tcG9uZW50OiBEWF9TZWFyY2hSZXN1bHRzIH0sXG4gICAgeyBwYXRoOiAnL2xhYi86aWQnLCBleGFjdDogdHJ1ZSwgY29tcG9uZW50OiBMYWIgfSxcbiAgICB7IHBhdGg6ICcvbGFiLzppZC90ZXN0cycsIGV4YWN0OiB0cnVlLCBjb21wb25lbnQ6IFRlc3RTZWxlY3RvciB9LFxuICAgIHsgcGF0aDogJy9sYWIvOmlkL2Jvb2snLCBleGFjdDogdHJ1ZSwgY29tcG9uZW50OiBEWF9Cb29raW5nU3VtbWFyeSB9LFxuXG4gICAgeyBwYXRoOiAnL2xhYi9ib29raW5nL3N1bW1hcnkvOmlkJywgZXhhY3Q6IHRydWUsIGNvbXBvbmVudDogRFhfQm9va2luZ1N1bW1hcnkgfSxcblxuXVxuXG5jbGFzcyBSb3V0ZXJDb25maWcgZXh0ZW5kcyBDb21wb25lbnQge1xuXG4gICAgc3RhdGljIFJPVVRFUyA9IHJvdXRlc1xuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICA8Um91dGVcbiAgICAgICAgICAgICAgICAgICAgcmVuZGVyPXtcbiAgICAgICAgICAgICAgICAgICAgICAgICh7IGxvY2F0aW9uIH0pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8VHJhbnNpdGlvbkdyb3VwPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPENTU1RyYW5zaXRpb25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk9e2xvY2F0aW9uLnBhdGhuYW1lfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZXM9XCJmYWRlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aW1lb3V0PXt7IGVudGVyOiAzMDAsIGV4aXQ6IDAgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBleGl0PXtmYWxzZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8U3dpdGNoIGxvY2F0aW9uPXtsb2NhdGlvbn0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtyb3V0ZXMubWFwKChyb3V0ZSwgaSkgPT4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPFJvdXRlIHsuLi5yb3V0ZX0ga2V5PXtpfSAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L1N3aXRjaD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ1NTVHJhbnNpdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9UcmFuc2l0aW9uR3JvdXA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLz5cblxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIClcbiAgICB9XG5cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBSb3V0ZXJDb25maWdcblxuIiwiXG5jb25zdCBkYXlzID0gWydTdW5kYXknLCAnTW9uZGF5JywgJ1R1ZXNkYXknLCAnV2VkbmVzZGF5JywgJ1RodXJzZGF5JywgJ0ZyaWRheScsICdTYXR1cmRheSddO1xuXG5leHBvcnQgY29uc3QgZ2V0VGltZSA9ICh0aW1lU3RhbXApID0+IHtcbiAgICB2YXIgZGF0ZSA9IG5ldyBEYXRlKHRpbWVTdGFtcCk7XG4gICAgdmFyIGhvdXJzID0gZGF0ZS5nZXRIb3VycygpO1xuICAgIHZhciBtaW51dGVzID0gXCIwXCIgKyBkYXRlLmdldE1pbnV0ZXMoKTtcbiAgICByZXR1cm4gaG91cnMgKyAnOicgKyBtaW51dGVzLnN1YnN0cigtMilcbn1cbmV4cG9ydCBjb25zdCBnZXREYXlOYW1lID0gKHRpbWVTdGFtcCkgPT4ge1xuICAgIHJldHVybiBkYXlzW25ldyBEYXRlKHRpbWVTdGFtcCkuZ2V0RGF5KCldXG5cbn0iLCJjb25zdCBwYXRoID0gcmVxdWlyZSgncGF0aCcpO1xuY29uc3QgaHR0cCA9IHJlcXVpcmUoJ2h0dHAnKTtcbmNvbnN0IEV4cHJlc3MgPSByZXF1aXJlKCdleHByZXNzJyk7XG5jb25zdCBhcHAgPSBuZXcgRXhwcmVzcygpO1xuY29uc3Qgc2VydmVyID0gbmV3IGh0dHAuU2VydmVyKGFwcCk7XG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcbmltcG9ydCBSZWFjdERPTVNlcnZlciBmcm9tICdyZWFjdC1kb20vc2VydmVyJ1xuaW1wb3J0IHsgU3RhdGljUm91dGVyIH0gZnJvbSAncmVhY3Qtcm91dGVyJ1xuaW1wb3J0IFJvdXRlcyBmcm9tICcuL2Rldi9qcy9yb3V0ZXMuanMnXG5pbXBvcnQgeyBNdWlUaGVtZVByb3ZpZGVyLCBjcmVhdGVNdWlUaGVtZSwgY3JlYXRlR2VuZXJhdGVDbGFzc05hbWUgfSBmcm9tICdtYXRlcmlhbC11aS9zdHlsZXMnO1xuaW1wb3J0IHsgU2hlZXRzUmVnaXN0cnkgfSBmcm9tICdyZWFjdC1qc3MvbGliL2pzcyc7XG5cbmltcG9ydCBKc3NQcm92aWRlciBmcm9tICdyZWFjdC1qc3MvbGliL0pzc1Byb3ZpZGVyJztcbmltcG9ydCB7IFByb3ZpZGVyIH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IHsgY3JlYXRlU3RvcmUsIGFwcGx5TWlkZGxld2FyZSB9IGZyb20gJ3JlZHV4JztcbmltcG9ydCB0aHVuayBmcm9tICdyZWR1eC10aHVuayc7XG5pbXBvcnQgeyBjcmVhdGVMb2dnZXIgfSBmcm9tICdyZWR1eC1sb2dnZXInXG5pbXBvcnQgYWxsUmVkdWNlcnMgZnJvbSAnLi9kZXYvanMvcmVkdWNlcnMvaW5kZXguanMnO1xuaW1wb3J0IHsgbWF0Y2hQYXRoIH0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSdcblxuXG5hcHAudXNlKCcvYXNzZXRzJywgRXhwcmVzcy5zdGF0aWMocGF0aC5qb2luKF9fZGlybmFtZSwgJ2Fzc2V0cycpKSk7XG5hcHAudXNlKCcvZGlzdCcsIEV4cHJlc3Muc3RhdGljKHBhdGguam9pbihfX2Rpcm5hbWUsICdkaXN0JykpKTtcblxuYXBwLnVzZSgnL2FwaScsIEV4cHJlc3Muc3RhdGljKHBhdGguam9pbihfX2Rpcm5hbWUsICdkdW1teV9hcGknKSkpO1xuXG5cbmFwcC5nZXQoJyonLCBmdW5jdGlvbiAocmVxLCByZXMpIHtcblxuICAgIGNvbnN0IGNvbnRleHQgPSB7fVxuXG4gICAgY29uc3Qgc3RvcmUgPSBjcmVhdGVTdG9yZShcbiAgICAgICAgYWxsUmVkdWNlcnMsIGFwcGx5TWlkZGxld2FyZSh0aHVuaylcbiAgICApO1xuXG4gICAgY29uc3Qgc2hlZXRzUmVnaXN0cnkgPSBuZXcgU2hlZXRzUmVnaXN0cnkoKTtcbiAgICBjb25zdCB0aGVtZSA9IGNyZWF0ZU11aVRoZW1lKHtcbiAgICAgICAgcGFsZXR0ZToge1xuICAgICAgICAgICAgcHJpbWFyeToge1xuICAgICAgICAgICAgICAgIG1haW46ICcjMDBiN2IwJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNlY29uZGFyeToge1xuICAgICAgICAgICAgICAgIG1haW46ICcjMDBiN2IwJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgICAgc3RhdHVzOiB7XG4gICAgICAgICAgICBkYW5nZXI6ICdvcmFuZ2UnLFxuICAgICAgICB9LFxuICAgIH0pXG4gICAgY29uc3QgZ2VuZXJhdGVDbGFzc05hbWUgPSBjcmVhdGVHZW5lcmF0ZUNsYXNzTmFtZSgpO1xuXG4gICAgaWYgKGNvbnRleHQudXJsKSB7XG4gICAgICAgIHJlcy53cml0ZUhlYWQoMzAxLCB7XG4gICAgICAgICAgICBMb2NhdGlvbjogY29udGV4dC51cmxcbiAgICAgICAgfSlcbiAgICAgICAgcmVzLmVuZCgpXG4gICAgfSBlbHNlIHtcblxuICAgICAgICAvLyBpbnNpZGUgYSByZXF1ZXN0XG4gICAgICAgIGNvbnN0IHByb21pc2VzID0gW11cblxuICAgICAgICBSb3V0ZXMuUk9VVEVTLnNvbWUocm91dGUgPT4ge1xuICAgICAgICAgICAgLy8gdXNlIGBtYXRjaFBhdGhgIGhlcmVcbiAgICAgICAgICAgIGNvbnN0IG1hdGNoID0gbWF0Y2hQYXRoKHJlcS5wYXRoLCByb3V0ZSlcbiAgICAgICAgICAgIGlmIChtYXRjaCAmJiByb3V0ZS5jb21wb25lbnQubG9hZERhdGEpXG4gICAgICAgICAgICAgICAgcHJvbWlzZXMucHVzaChyb3V0ZS5jb21wb25lbnQubG9hZERhdGEoc3RvcmUsIG1hdGNoKSlcbiAgICAgICAgICAgIHJldHVybiBtYXRjaFxuICAgICAgICB9KVxuXG4gICAgICAgIFByb21pc2UuYWxsKHByb21pc2VzKS50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgY29uc3Qgc3RvcmVEYXRhID0gSlNPTi5zdHJpbmdpZnkoc3RvcmUuZ2V0U3RhdGUoKSlcbiAgICAgICAgICAgIGNvbnN0IGh0bWwgPSBSZWFjdERPTVNlcnZlci5yZW5kZXJUb1N0cmluZyhcbiAgICAgICAgICAgICAgICA8UHJvdmlkZXIgc3RvcmU9e3N0b3JlfT5cbiAgICAgICAgICAgICAgICAgICAgPEpzc1Byb3ZpZGVyIHJlZ2lzdHJ5PXtzaGVldHNSZWdpc3RyeX0gZ2VuZXJhdGVDbGFzc05hbWU9e2dlbmVyYXRlQ2xhc3NOYW1lfT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxNdWlUaGVtZVByb3ZpZGVyIHRoZW1lPXt0aGVtZX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPFN0YXRpY1JvdXRlclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2NhdGlvbj17cmVxLnVybH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dD17Y29udGV4dH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxSb3V0ZXMgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L1N0YXRpY1JvdXRlcj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvTXVpVGhlbWVQcm92aWRlcj5cbiAgICAgICAgICAgICAgICAgICAgPC9Kc3NQcm92aWRlcj5cbiAgICAgICAgICAgICAgICA8L1Byb3ZpZGVyPlxuICAgICAgICAgICAgKVxuICAgICAgICAgICAgY29uc3QgY3NzID0gc2hlZXRzUmVnaXN0cnkudG9TdHJpbmcoKVxuXG4gICAgICAgICAgICByZXMucmVuZGVyKCcuL2luZGV4LnRlbXBsYXRlLmVqcycsIHtcbiAgICAgICAgICAgICAgICBodG1sLCBjc3MsIHN0b3JlRGF0YVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSlcblxuICAgIH1cblxufSk7XG5cblxuYXBwLnVzZShmdW5jdGlvbiAocmVxLCByZXMpIHtcbiAgICByZXMuc2VuZEZpbGUoJ2luZGV4Lmh0bWwnLCB7IHJvb3Q6ICcuL2Rpc3QvJyB9KVxufSlcblxuc2VydmVyLmxpc3RlbigzMDAwLCAoZXJyKSA9PiB7XG4gICAgaWYgKGVycikge1xuICAgICAgICByZXR1cm4gY29uc29sZS5lcnJvcihlcnIpO1xuICAgIH1cbiAgICBjb25zb2xlLmluZm8oJ1NlcnZlciBydW5uaW5nIG9uIGh0dHA6Ly9sb2NhbGhvc3Q6MzAwMCcpO1xufSk7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYXhpb3NcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZXhwcmVzc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJodHRwXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm1hdGVyaWFsLXVpLWljb25zL0FjY291bnRDaXJjbGVcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibWF0ZXJpYWwtdWktaWNvbnMvQXR0YWNoTW9uZXlcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibWF0ZXJpYWwtdWktaWNvbnMvQXZUaW1lclwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJtYXRlcmlhbC11aS1pY29ucy9DYWxsXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm1hdGVyaWFsLXVpLWljb25zL0V4cGFuZE1vcmVcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibWF0ZXJpYWwtdWktaWNvbnMvS2V5Ym9hcmRBcnJvd1JpZ2h0XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm1hdGVyaWFsLXVpLWljb25zL1BheW1lbnRcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibWF0ZXJpYWwtdWkvQ2hlY2tib3hcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibWF0ZXJpYWwtdWkvQ2hpcFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJtYXRlcmlhbC11aS9FeHBhbnNpb25QYW5lbFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJtYXRlcmlhbC11aS9Gb3JtXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm1hdGVyaWFsLXVpL01lbnVcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibWF0ZXJpYWwtdWkvUHJvZ3Jlc3NcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibWF0ZXJpYWwtdWkvUmFkaW9cIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibWF0ZXJpYWwtdWkvU3RlcHBlclwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJtYXRlcmlhbC11aS9zdHlsZXNcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicGF0aFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyYy1zbGlkZXIvbGliL1JhbmdlXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0LWRvbS9zZXJ2ZXJcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhY3QtanNzL2xpYi9Kc3NQcm92aWRlclwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdC1qc3MvbGliL2pzc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdC1yZWR1eFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdC1yb3V0ZXJcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhY3Qtcm91dGVyLWRvbVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdC10cmFuc2l0aW9uLWdyb3VwXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlZHV4XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlZHV4LWxvZ2dlclwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWR1eC10aHVua1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ1bml2ZXJzYWwtY29va2llXCIpOyJdLCJzb3VyY2VSb290IjoiIn0=