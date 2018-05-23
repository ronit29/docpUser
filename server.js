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

	return (0, _api.API_GET)(`/api/v1/doctor/profileuserview/${doctorId}`).then(function (response) {

		dispatch({
			type: _types.APPEND_DOCTORS,
			payload: [response]
		});
	}).catch(function (error) {});
};

const getTimeSlots = exports.getTimeSlots = (doctorId, clinicId, callback) => dispatch => {
	return (0, _api.API_GET)(`/api/v1/doctor/doctortiming?doctor_id=${doctorId}&hospital_id=${clinicId}`).then(function (response) {
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
    baseURL: 'https://qa.panaceatechno.com',
    header: {}
});

function rejectHandler(response, callback) {
    console.log(response);
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

const DAYS_TO_SHOW = 20;
const WEEK_DAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

class TimeSlotSelector extends _react2.default.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    generateDays() {
        // let days = []

        // for (let i = 0; i < DAYS_TO_SHOW; i++) {
        //     let offsetDay = new Date()
        //     offsetDay.setDate(someDate.getDate() + DAYS_TO_SHOW)
        //     let weekDay = offsetDay.getDay()

        //     days.push({
        //         tag: WEEK_DAYS[weekDay],
        //         value: weekDay
        //     })
        // }
    }

    render() {

        return _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
                'div',
                { className: 'widget no-shadow no-round skin-transparent' },
                _react2.default.createElement(
                    'div',
                    { className: 'widget-content' },
                    _react2.default.createElement(
                        'div',
                        { className: 'add-new-time mrb-10' },
                        _react2.default.createElement(
                            'h4',
                            { className: 'text-md fw-700 mrb-10' },
                            'Select Date & Time: ',
                            _react2.default.createElement(
                                'span',
                                { className: 'float-right text-md fw-700 text-primary' },
                                'April ',
                                _react2.default.createElement(
                                    'span',
                                    { className: 'text-light' },
                                    'May'
                                )
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'choose-time' },
                            _react2.default.createElement(
                                'ul',
                                { className: 'inline-list datetime-items' },
                                _react2.default.createElement(
                                    'li',
                                    null,
                                    '21 ',
                                    _react2.default.createElement(
                                        'span',
                                        null,
                                        'S'
                                    )
                                ),
                                _react2.default.createElement(
                                    'li',
                                    null,
                                    '22 ',
                                    _react2.default.createElement(
                                        'span',
                                        null,
                                        'M'
                                    )
                                ),
                                _react2.default.createElement(
                                    'li',
                                    { className: 'active' },
                                    '23 ',
                                    _react2.default.createElement(
                                        'span',
                                        null,
                                        'T'
                                    )
                                ),
                                _react2.default.createElement(
                                    'li',
                                    null,
                                    '24 ',
                                    _react2.default.createElement(
                                        'span',
                                        null,
                                        'W'
                                    )
                                ),
                                _react2.default.createElement(
                                    'li',
                                    null,
                                    '25 ',
                                    _react2.default.createElement(
                                        'span',
                                        null,
                                        'T'
                                    )
                                ),
                                _react2.default.createElement(
                                    'li',
                                    null,
                                    '26 ',
                                    _react2.default.createElement(
                                        'span',
                                        null,
                                        'F'
                                    )
                                ),
                                _react2.default.createElement(
                                    'li',
                                    null,
                                    '27 ',
                                    _react2.default.createElement(
                                        'span',
                                        null,
                                        'S'
                                    )
                                ),
                                _react2.default.createElement(
                                    'li',
                                    null,
                                    '28 ',
                                    _react2.default.createElement(
                                        'span',
                                        null,
                                        'S'
                                    )
                                ),
                                _react2.default.createElement(
                                    'li',
                                    null,
                                    '29 ',
                                    _react2.default.createElement(
                                        'span',
                                        null,
                                        'M'
                                    )
                                ),
                                _react2.default.createElement(
                                    'li',
                                    null,
                                    '30 ',
                                    _react2.default.createElement(
                                        'span',
                                        null,
                                        'T'
                                    )
                                )
                            )
                        )
                    )
                )
            ),
            _react2.default.createElement(
                'div',
                { className: 'widget' },
                _react2.default.createElement(
                    'div',
                    { className: 'widget-content' },
                    _react2.default.createElement(
                        'h4',
                        { className: 'report-on mrb-10' },
                        'Morning'
                    ),
                    _react2.default.createElement(
                        'ul',
                        { className: 'inline-list time-items' },
                        _react2.default.createElement(
                            'li',
                            null,
                            _react2.default.createElement(
                                'a',
                                { href: '', className: 'v-btn v-btn-primary btn-sm outline' },
                                '7:30 AM'
                            )
                        ),
                        _react2.default.createElement(
                            'li',
                            null,
                            _react2.default.createElement(
                                'a',
                                { href: '', className: 'v-btn v-btn-primary btn-sm outline' },
                                '8:00 AM'
                            )
                        ),
                        _react2.default.createElement(
                            'li',
                            null,
                            _react2.default.createElement(
                                'a',
                                { href: '', className: 'v-btn v-btn-primary btn-sm outline' },
                                '8:30 AM'
                            )
                        ),
                        _react2.default.createElement(
                            'li',
                            null,
                            _react2.default.createElement(
                                'a',
                                { href: '', className: 'v-btn v-btn-primary btn-sm outline' },
                                '9:00 AM'
                            )
                        ),
                        _react2.default.createElement(
                            'li',
                            null,
                            _react2.default.createElement(
                                'a',
                                { href: '', className: 'v-btn v-btn-primary btn-sm outline' },
                                '9:30 AM'
                            )
                        ),
                        _react2.default.createElement(
                            'li',
                            null,
                            _react2.default.createElement(
                                'a',
                                { href: '', className: 'v-btn v-btn-primary btn-sm outline' },
                                '10:00 AM'
                            )
                        ),
                        _react2.default.createElement(
                            'li',
                            null,
                            _react2.default.createElement(
                                'a',
                                { href: '', className: 'v-btn v-btn-primary btn-sm outline' },
                                '10:30 AM'
                            )
                        ),
                        _react2.default.createElement(
                            'li',
                            null,
                            _react2.default.createElement(
                                'a',
                                { href: '', className: 'v-btn v-btn-default btn-sm outline' },
                                '11:00 AM'
                            )
                        ),
                        _react2.default.createElement(
                            'li',
                            null,
                            _react2.default.createElement(
                                'a',
                                { href: '', className: 'v-btn v-btn-primary btn-sm outline' },
                                '11:30 AM'
                            )
                        )
                    ),
                    _react2.default.createElement(
                        'h4',
                        { className: 'report-on mrb-10' },
                        'Afternoon'
                    ),
                    _react2.default.createElement(
                        'ul',
                        { className: 'inline-list time-items' },
                        _react2.default.createElement(
                            'li',
                            null,
                            _react2.default.createElement(
                                'a',
                                { href: '', className: 'v-btn v-btn-primary btn-sm outline' },
                                '7:30 PM'
                            )
                        ),
                        _react2.default.createElement(
                            'li',
                            null,
                            _react2.default.createElement(
                                'a',
                                { href: '', className: 'v-btn v-btn-primary btn-sm outline' },
                                '8:00 PM'
                            )
                        ),
                        _react2.default.createElement(
                            'li',
                            null,
                            _react2.default.createElement(
                                'a',
                                { href: '', className: 'v-btn v-btn-primary btn-sm outline' },
                                '8:30 PM'
                            )
                        ),
                        _react2.default.createElement(
                            'li',
                            null,
                            _react2.default.createElement(
                                'a',
                                { href: '', className: 'v-btn v-btn-primary btn-sm outline' },
                                '9:00 PM'
                            )
                        ),
                        _react2.default.createElement(
                            'li',
                            null,
                            _react2.default.createElement(
                                'a',
                                { href: '', className: 'v-btn v-btn-primary btn-sm outline' },
                                '9:30 PM'
                            )
                        ),
                        _react2.default.createElement(
                            'li',
                            null,
                            _react2.default.createElement(
                                'a',
                                { href: '', className: 'v-btn v-btn-primary btn-sm outline' },
                                '10:00 PM'
                            )
                        ),
                        _react2.default.createElement(
                            'li',
                            null,
                            _react2.default.createElement(
                                'a',
                                { href: '', className: 'v-btn v-btn-primary btn-sm outline' },
                                '10:30 PM'
                            )
                        ),
                        _react2.default.createElement(
                            'li',
                            null,
                            _react2.default.createElement(
                                'a',
                                { href: '', className: 'v-btn v-btn-default btn-sm outline' },
                                '11:00 PM'
                            )
                        ),
                        _react2.default.createElement(
                            'li',
                            null,
                            _react2.default.createElement(
                                'a',
                                { href: '', className: 'v-btn v-btn-primary btn-sm outline' },
                                '11:30 PM'
                            )
                        )
                    ),
                    _react2.default.createElement(
                        'h4',
                        { className: 'report-on mrb-10' },
                        'Evening'
                    ),
                    _react2.default.createElement(
                        'ul',
                        { className: 'inline-list time-items' },
                        _react2.default.createElement(
                            'li',
                            null,
                            _react2.default.createElement(
                                'a',
                                { href: '', className: 'v-btn v-btn-primary btn-sm outline' },
                                '7:30 PM'
                            )
                        ),
                        _react2.default.createElement(
                            'li',
                            null,
                            _react2.default.createElement(
                                'a',
                                { href: '', className: 'v-btn v-btn-primary btn-sm outline' },
                                '8:00 PM'
                            )
                        ),
                        _react2.default.createElement(
                            'li',
                            null,
                            _react2.default.createElement(
                                'a',
                                { href: '', className: 'v-btn v-btn-primary btn-sm outline' },
                                '8:30 PM'
                            )
                        ),
                        _react2.default.createElement(
                            'li',
                            null,
                            _react2.default.createElement(
                                'a',
                                { href: '', className: 'v-btn v-btn-primary btn-sm outline' },
                                '9:00 PM'
                            )
                        ),
                        _react2.default.createElement(
                            'li',
                            null,
                            _react2.default.createElement(
                                'a',
                                { href: '', className: 'v-btn v-btn-primary btn-sm outline' },
                                '9:30 PM'
                            )
                        ),
                        _react2.default.createElement(
                            'li',
                            null,
                            _react2.default.createElement(
                                'a',
                                { href: '', className: 'v-btn v-btn-primary btn-sm outline' },
                                '10:00 PM'
                            )
                        ),
                        _react2.default.createElement(
                            'li',
                            null,
                            _react2.default.createElement(
                                'a',
                                { href: '', className: 'v-btn v-btn-primary btn-sm outline' },
                                '10:30 PM'
                            )
                        ),
                        _react2.default.createElement(
                            'li',
                            null,
                            _react2.default.createElement(
                                'a',
                                { href: '', className: 'v-btn v-btn-default btn-sm outline' },
                                '11:00 PM'
                            )
                        ),
                        _react2.default.createElement(
                            'li',
                            null,
                            _react2.default.createElement(
                                'a',
                                { href: '', className: 'v-btn v-btn-primary btn-sm outline' },
                                '11:30 PM'
                            )
                        )
                    )
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

var _index = __webpack_require__(/*! ../../commons/timeSlotSelector/index.js */ "./dev/js/components/commons/timeSlotSelector/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = __webpack_require__(/*! ../commons/selectedClinic/index.js */ "./dev/js/components/opd/commons/selectedClinic/index.js");

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class AppointmentSlot extends _react2.default.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedDoctor: this.props.match.params.id,
            selectedClinic: this.props.match.params.clinicId,
            timeSlots: null,
            selectedSlot: null
        };
    }

    proceed() {
        // if (this.state.selectedSlot) {
        //     this.context.router.history.push(`/doctorprofile/${this.state.selectedDoctor}/${this.state.selectedClinic}/bookdetails?t=${this.state.selectedSlot.start}`)
        // }
    }

    selectTimeSlot(slot) {
        this.setState({ selectedSlot: slot });
    }

    componentDidMount() {
        let clinicId = this.props.match.params.clinicId;
        let doctorId = this.props.match.params.id;

        this.props.getTimeSlots(doctorId, clinicId, timeSlots => {
            this.setState({ timeSlots });
        });
    }

    render() {

        return _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
                'header',
                { className: 'skin-primary fixed horizontal top' },
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
                                'span',
                                { className: 'icon back-icon', onClick: () => {
                                        this.props.history.go(-1);
                                    } },
                                _react2.default.createElement('img', { src: '/assets/img/customer-icons/back-white.png', className: 'img-fluid' })
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'col-8' },
                            _react2.default.createElement(
                                'div',
                                { className: 'header-title fw-700 capitalize text-white text-center' },
                                'Select Date and Time'
                            )
                        ),
                        _react2.default.createElement('div', { className: 'col-2' })
                    )
                )
            ),
            this.props.DOCTORS[this.state.selectedDoctor] ? _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'section',
                    { className: 'wrap dr-profile-screen' },
                    _react2.default.createElement(
                        'div',
                        { className: 'container-fluid' },
                        _react2.default.createElement(
                            'div',
                            { className: 'row' },
                            _react2.default.createElement(
                                'div',
                                { className: 'col-12' },
                                _react2.default.createElement(_index4.default, {
                                    selectedDoctor: this.props.DOCTORS[this.state.selectedDoctor],
                                    selectedClinic: this.state.selectedClinic
                                }),
                                this.state.timeSlots ? _react2.default.createElement(_index2.default, {
                                    timeSlots: this.state.timeSlots,
                                    selectTimeSlot: this.selectTimeSlot.bind(this)
                                }) : ''
                            )
                        )
                    )
                )
            ) : "",
            _react2.default.createElement(
                'button',
                { className: 'v-btn v-btn-primary btn-lg fixed horizontal bottom no-round text-lg' },
                'Select'
            )
        );
    }
}

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ClinicSelector extends _react2.default.Component {
    constructor(props) {
        super(props);
    }

    selectClinic(clinicId) {
        let doctorId = this.props.match.params.id;
        this.props.history.push(`/opd/doctor/${doctorId}/${clinicId}/book`);
    }

    render() {

        let { name, hospitals } = this.props.details;

        return _react2.default.createElement(
            'div',
            { className: 'widget-panel' },
            _react2.default.createElement(
                'h4',
                { className: 'panel-title' },
                'Dr. ',
                name,
                ' Available at'
            ),
            _react2.default.createElement(
                'div',
                { className: 'panel-content scroll-x' },
                _react2.default.createElement(
                    'ul',
                    { className: 'inline-list Clinic-card-list' },
                    hospitals.map((hospital, i) => {
                        return _react2.default.createElement(
                            'li',
                            { key: i },
                            _react2.default.createElement(
                                'div',
                                { className: 'widget no-shadow' },
                                _react2.default.createElement(
                                    'div',
                                    { className: 'widget-header' },
                                    _react2.default.createElement(
                                        'h4',
                                        { className: 'widget-title text-md fw-700' },
                                        hospital.hospital_name,
                                        ' ',
                                        _react2.default.createElement(
                                            'span',
                                            { className: 'float-right' },
                                            'Rs ',
                                            hospital.fees
                                        )
                                    )
                                ),
                                _react2.default.createElement(
                                    'div',
                                    { className: 'widget-content' },
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'location-details' },
                                        _react2.default.createElement('img', { src: '/assets/img/customer-icons/map-marker-blue.png', className: 'img-fluid' }),
                                        _react2.default.createElement(
                                            'p',
                                            { className: 'address' },
                                            hospital.address
                                        )
                                    ),
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'timing-details' },
                                        Object.keys(hospital.timings).map((timingKey, key) => {
                                            return _react2.default.createElement(
                                                'p',
                                                { className: 'fw-700', key: key },
                                                _react2.default.createElement(
                                                    'label',
                                                    { className: 'fw-700 text-md text-primary' },
                                                    timingKey
                                                ),
                                                hospital.timings[timingKey].join(', ')
                                            );
                                        })
                                    )
                                ),
                                _react2.default.createElement(
                                    'div',
                                    { className: 'widget-footer text-center' },
                                    _react2.default.createElement(
                                        'button',
                                        { className: 'v-btn v-btn-primary outline', onClick: this.selectClinic.bind(this, hospital.hospital_id) },
                                        'Book Now'
                                    )
                                )
                            )
                        );
                    })
                )
            )
        );
    }
}

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
        this.props.history.push(`/opd/doctor/${id}`);
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

    render() {

        let { id, experience_years, gender, hospitals, hospital_count, name, qualifications } = this.props.details;

        let hospital = hospitals[0];

        return _react2.default.createElement(
            'div',
            { className: 'widget card search-dr-list', onClick: this.cardClick.bind(this, id) },
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

        // let { selectedDoctor, selectedClinic } = this.props

        // let clinicData = selectedDoctor.availability.filter((clinic) => {
        //     return clinic.id == selectedClinic
        // })[0]

        return _react2.default.createElement(
            "div",
            { className: "widget mrt-10 ct-profile skin-white" },
            _react2.default.createElement(
                "div",
                { className: "widget-header dr-qucik-info" },
                _react2.default.createElement("img", { src: "/assets/img/customer-icons/user.png", className: "img-fluid" }),
                _react2.default.createElement(
                    "div",
                    { className: "dr-profile" },
                    _react2.default.createElement(
                        "h4",
                        { className: "dr-name" },
                        "Dr. Stephny Ray"
                    ),
                    _react2.default.createElement(
                        "p",
                        { className: "desg" },
                        "MBBS, MD - Genral Medicine General Physician"
                    ),
                    _react2.default.createElement(
                        "h4",
                        { className: "dr-name clinic-name mrt-10 text-sm" },
                        "Apollo Clinic"
                    )
                )
            )
        );
    }
}

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

var _Loader = __webpack_require__(/*! ../../commons/Loader */ "./dev/js/components/commons/Loader/index.js");

var _Loader2 = _interopRequireDefault(_Loader);

var _doctorProfileCard = __webpack_require__(/*! ./doctorProfileCard */ "./dev/js/components/opd/doctorProfile/doctorProfileCard/index.js");

var _doctorProfileCard2 = _interopRequireDefault(_doctorProfileCard);

var _index = __webpack_require__(/*! ../doctorProfile/aboutDoctor/index.js */ "./dev/js/components/opd/doctorProfile/aboutDoctor/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = __webpack_require__(/*! ../doctorProfile/professionalGraph/index.js */ "./dev/js/components/opd/doctorProfile/professionalGraph/index.js");

var _index4 = _interopRequireDefault(_index3);

var _index5 = __webpack_require__(/*! ../commons/clinicSelector/index.js */ "./dev/js/components/opd/commons/clinicSelector/index.js");

var _index6 = _interopRequireDefault(_index5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class DoctorProfileView extends _react2.default.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedDoctor: this.props.match.params.id
        };
    }

    render() {

        return _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
                'header',
                { className: 'skin-primary fixed horizontal top' },
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
            this.props.DOCTORS[this.state.selectedDoctor] ? _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'section',
                    { className: 'wrap dr-profile-screen' },
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
                                    { className: 'widget mrt-10 ct-profile skin-white' },
                                    _react2.default.createElement(_doctorProfileCard2.default, {
                                        details: this.props.DOCTORS[this.state.selectedDoctor]
                                    }),
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'widge-content pd-0' },
                                        _react2.default.createElement(_index2.default, {
                                            details: this.props.DOCTORS[this.state.selectedDoctor]
                                        }),
                                        _react2.default.createElement(_index6.default, _extends({
                                            details: this.props.DOCTORS[this.state.selectedDoctor]
                                        }, this.props)),
                                        _react2.default.createElement(_index4.default, {
                                            details: this.props.DOCTORS[this.state.selectedDoctor]
                                        })
                                    )
                                )
                            )
                        )
                    )
                )
            ) : _react2.default.createElement(_Loader2.default, null)
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
        this.state = {
            lessAbout: "",
            readMore: false
        };
    }

    componentDidMount() {
        let { about } = this.props.details;

        if (about && about.length > 100) {
            this.setState({
                readMore: true
            });
        }

        this.setState({
            lessAbout: about.slice(0, 100)
        });
    }

    render() {

        let { about, name } = this.props.details;

        return _react2.default.createElement(
            'div',
            { className: 'widget-panel' },
            _react2.default.createElement(
                'h4',
                { className: 'panel-title' },
                'About ',
                name
            ),
            _react2.default.createElement(
                'div',
                { className: 'panel-content' },
                _react2.default.createElement(
                    'p',
                    { className: 'fw-500 text-md' },
                    this.state.lessAbout,
                    this.state.readMore ? _react2.default.createElement(
                        'a',
                        { className: 'fw-700 text-primary', onClick: () => {
                                this.setState({ readMore: false, lessAbout: about });
                            } },
                        'READ MORE'
                    ) : ""
                )
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

/***/ "./dev/js/components/opd/doctorProfile/doctorProfileCard/DoctorProfileCard.js":
/*!************************************************************************************!*\
  !*** ./dev/js/components/opd/doctorProfile/doctorProfileCard/DoctorProfileCard.js ***!
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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class DoctorProfileCard extends _react2.default.Component {
    constructor(props) {
        super(props);
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

    render() {

        let { name, experience_years, qualifications } = this.props.details;

        return _react2.default.createElement(
            'div',
            { className: 'widget-header dr-qucik-info' },
            _react2.default.createElement('img', { src: '/assets/img/customer-icons/user.png', className: 'img-fluid' }),
            _react2.default.createElement(
                'div',
                { className: 'dr-profile' },
                _react2.default.createElement(
                    'h4',
                    { className: 'dr-name' },
                    name
                ),
                _react2.default.createElement(
                    'p',
                    { className: 'desg' },
                    this.getQualificationStr(qualifications)
                ),
                _react2.default.createElement(
                    'p',
                    { className: 'add-details' },
                    experience_years,
                    ' Years of Experince'
                ),
                _react2.default.createElement(
                    'p',
                    { className: 'add-details' },
                    'Ex - AIIMS, Ex- Fortis'
                )
            )
        );
    }
}

exports.default = DoctorProfileCard;

/***/ }),

/***/ "./dev/js/components/opd/doctorProfile/doctorProfileCard/index.js":
/*!************************************************************************!*\
  !*** ./dev/js/components/opd/doctorProfile/doctorProfileCard/index.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _DoctorProfileCard = __webpack_require__(/*! ./DoctorProfileCard */ "./dev/js/components/opd/doctorProfile/doctorProfileCard/DoctorProfileCard.js");

var _DoctorProfileCard2 = _interopRequireDefault(_DoctorProfileCard);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _DoctorProfileCard2.default;

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
            { className: 'widget-panel' },
            _react2.default.createElement(
                'h4',
                { className: 'panel-title' },
                'Professional Graph'
            ),
            _react2.default.createElement(
                'div',
                { className: 'panel-content pd-0' },
                _react2.default.createElement(
                    'ul',
                    { className: 'list drop-down-list' },
                    _react2.default.createElement(
                        'li',
                        null,
                        _react2.default.createElement(
                            _ExpansionPanel2.default,
                            null,
                            _react2.default.createElement(
                                _ExpansionPanel.ExpansionPanelSummary,
                                { expandIcon: _react2.default.createElement(_ExpandMore2.default, null) },
                                _react2.default.createElement(
                                    'div',
                                    { className: 'title' },
                                    'Education ',
                                    _react2.default.createElement('span', { className: 'float-right' })
                                )
                            ),
                            _react2.default.createElement(
                                _ExpansionPanel.ExpansionPanelDetails,
                                null,
                                _react2.default.createElement(
                                    'div',
                                    { className: 'more-content' },
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'form-group' },
                                        _react2.default.createElement(
                                            'label',
                                            { className: 'fw-700 text-sm text-primary' },
                                            'Qualification'
                                        ),
                                        _react2.default.createElement(
                                            'p',
                                            { className: 'fw-700 text-md text-light' },
                                            'MD'
                                        )
                                    ),
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'form-group' },
                                        _react2.default.createElement(
                                            'label',
                                            { className: 'fw-700 text-sm text-primary' },
                                            'Specialization'
                                        ),
                                        _react2.default.createElement(
                                            'p',
                                            { className: 'fw-700 text-md text-light' },
                                            'Dermitology'
                                        )
                                    ),
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'form-group' },
                                        _react2.default.createElement(
                                            'label',
                                            { className: 'fw-700 text-sm text-primary' },
                                            'College'
                                        ),
                                        _react2.default.createElement(
                                            'p',
                                            { className: 'fw-700 text-md text-light' },
                                            'MGU University, 2009'
                                        )
                                    )
                                )
                            )
                        )
                    ),
                    _react2.default.createElement(
                        'li',
                        null,
                        _react2.default.createElement(
                            _ExpansionPanel2.default,
                            null,
                            _react2.default.createElement(
                                _ExpansionPanel.ExpansionPanelSummary,
                                { expandIcon: _react2.default.createElement(_ExpandMore2.default, null) },
                                _react2.default.createElement(
                                    'div',
                                    { className: 'title' },
                                    'Associate Clinic/Hospital ',
                                    _react2.default.createElement('span', { className: 'float-right' })
                                )
                            ),
                            _react2.default.createElement(
                                _ExpansionPanel.ExpansionPanelDetails,
                                null,
                                _react2.default.createElement(
                                    'div',
                                    { className: 'more-content' },
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'form-group' },
                                        _react2.default.createElement(
                                            'label',
                                            { className: 'fw-700 text-sm text-primary' },
                                            'Qualification'
                                        ),
                                        _react2.default.createElement(
                                            'p',
                                            { className: 'fw-700 text-md text-light' },
                                            'MD'
                                        )
                                    ),
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'form-group' },
                                        _react2.default.createElement(
                                            'label',
                                            { className: 'fw-700 text-sm text-primary' },
                                            'Specialization'
                                        ),
                                        _react2.default.createElement(
                                            'p',
                                            { className: 'fw-700 text-md text-light' },
                                            'Dermitology'
                                        )
                                    ),
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'form-group' },
                                        _react2.default.createElement(
                                            'label',
                                            { className: 'fw-700 text-sm text-primary' },
                                            'College'
                                        ),
                                        _react2.default.createElement(
                                            'p',
                                            { className: 'fw-700 text-md text-light' },
                                            'MGU University, 2009'
                                        )
                                    )
                                )
                            )
                        )
                    ),
                    _react2.default.createElement(
                        'li',
                        null,
                        _react2.default.createElement(
                            _ExpansionPanel2.default,
                            null,
                            _react2.default.createElement(
                                _ExpansionPanel.ExpansionPanelSummary,
                                { expandIcon: _react2.default.createElement(_ExpandMore2.default, null) },
                                _react2.default.createElement(
                                    'div',
                                    { className: 'title' },
                                    'Language ',
                                    _react2.default.createElement('span', { className: 'float-right' })
                                )
                            ),
                            _react2.default.createElement(
                                _ExpansionPanel.ExpansionPanelDetails,
                                null,
                                _react2.default.createElement(
                                    'div',
                                    { className: 'more-content' },
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'form-group' },
                                        _react2.default.createElement(
                                            'label',
                                            { className: 'fw-700 text-sm text-primary' },
                                            'Qualification'
                                        ),
                                        _react2.default.createElement(
                                            'p',
                                            { className: 'fw-700 text-md text-light' },
                                            'MD'
                                        )
                                    ),
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'form-group' },
                                        _react2.default.createElement(
                                            'label',
                                            { className: 'fw-700 text-sm text-primary' },
                                            'Specialization'
                                        ),
                                        _react2.default.createElement(
                                            'p',
                                            { className: 'fw-700 text-md text-light' },
                                            'Dermitology'
                                        )
                                    ),
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'form-group' },
                                        _react2.default.createElement(
                                            'label',
                                            { className: 'fw-700 text-sm text-primary' },
                                            'College'
                                        ),
                                        _react2.default.createElement(
                                            'p',
                                            { className: 'fw-700 text-md text-light' },
                                            'MGU University, 2009'
                                        )
                                    )
                                )
                            )
                        )
                    ),
                    _react2.default.createElement(
                        'li',
                        null,
                        _react2.default.createElement(
                            _ExpansionPanel2.default,
                            null,
                            _react2.default.createElement(
                                _ExpansionPanel.ExpansionPanelSummary,
                                { expandIcon: _react2.default.createElement(_ExpandMore2.default, null) },
                                _react2.default.createElement(
                                    'div',
                                    { className: 'title' },
                                    'Awards ',
                                    _react2.default.createElement('span', { className: 'float-right' })
                                )
                            ),
                            _react2.default.createElement(
                                _ExpansionPanel.ExpansionPanelDetails,
                                null,
                                _react2.default.createElement(
                                    'div',
                                    { className: 'more-content' },
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'form-group' },
                                        _react2.default.createElement(
                                            'label',
                                            { className: 'fw-700 text-sm text-primary' },
                                            'Qualification'
                                        ),
                                        _react2.default.createElement(
                                            'p',
                                            { className: 'fw-700 text-md text-light' },
                                            'MD'
                                        )
                                    ),
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'form-group' },
                                        _react2.default.createElement(
                                            'label',
                                            { className: 'fw-700 text-sm text-primary' },
                                            'Specialization'
                                        ),
                                        _react2.default.createElement(
                                            'p',
                                            { className: 'fw-700 text-md text-light' },
                                            'Dermitology'
                                        )
                                    ),
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'form-group' },
                                        _react2.default.createElement(
                                            'label',
                                            { className: 'fw-700 text-sm text-primary' },
                                            'College'
                                        ),
                                        _react2.default.createElement(
                                            'p',
                                            { className: 'fw-700 text-md text-light' },
                                            'MGU University, 2009'
                                        )
                                    )
                                )
                            )
                        )
                    ),
                    _react2.default.createElement(
                        'li',
                        null,
                        _react2.default.createElement(
                            _ExpansionPanel2.default,
                            null,
                            _react2.default.createElement(
                                _ExpansionPanel.ExpansionPanelSummary,
                                { expandIcon: _react2.default.createElement(_ExpandMore2.default, null) },
                                _react2.default.createElement(
                                    'div',
                                    { className: 'title' },
                                    'Associate Membership ',
                                    _react2.default.createElement('span', { className: 'float-right' })
                                )
                            ),
                            _react2.default.createElement(
                                _ExpansionPanel.ExpansionPanelDetails,
                                null,
                                _react2.default.createElement(
                                    'div',
                                    { className: 'more-content' },
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'form-group' },
                                        _react2.default.createElement(
                                            'label',
                                            { className: 'fw-700 text-sm text-primary' },
                                            'Qualification'
                                        ),
                                        _react2.default.createElement(
                                            'p',
                                            { className: 'fw-700 text-md text-light' },
                                            'MD'
                                        )
                                    ),
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'form-group' },
                                        _react2.default.createElement(
                                            'label',
                                            { className: 'fw-700 text-sm text-primary' },
                                            'Specialization'
                                        ),
                                        _react2.default.createElement(
                                            'p',
                                            { className: 'fw-700 text-md text-light' },
                                            'Dermitology'
                                        )
                                    ),
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'form-group' },
                                        _react2.default.createElement(
                                            'label',
                                            { className: 'fw-700 text-sm text-primary' },
                                            'College'
                                        ),
                                        _react2.default.createElement(
                                            'p',
                                            { className: 'fw-700 text-md text-light' },
                                            'MGU University, 2009'
                                        )
                                    )
                                )
                            )
                        )
                    ),
                    _react2.default.createElement(
                        'li',
                        null,
                        _react2.default.createElement(
                            _ExpansionPanel2.default,
                            null,
                            _react2.default.createElement(
                                _ExpansionPanel.ExpansionPanelSummary,
                                { expandIcon: _react2.default.createElement(_ExpandMore2.default, null) },
                                _react2.default.createElement(
                                    'div',
                                    { className: 'title' },
                                    'Experinece ',
                                    _react2.default.createElement('span', { className: 'float-right' })
                                )
                            ),
                            _react2.default.createElement(
                                _ExpansionPanel.ExpansionPanelDetails,
                                null,
                                _react2.default.createElement(
                                    'div',
                                    { className: 'more-content' },
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'form-group' },
                                        _react2.default.createElement(
                                            'label',
                                            { className: 'fw-700 text-sm text-primary' },
                                            'Qualification'
                                        ),
                                        _react2.default.createElement(
                                            'p',
                                            { className: 'fw-700 text-md text-light' },
                                            'MD'
                                        )
                                    ),
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'form-group' },
                                        _react2.default.createElement(
                                            'label',
                                            { className: 'fw-700 text-sm text-primary' },
                                            'Specialization'
                                        ),
                                        _react2.default.createElement(
                                            'p',
                                            { className: 'fw-700 text-md text-light' },
                                            'Dermitology'
                                        )
                                    ),
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'form-group' },
                                        _react2.default.createElement(
                                            'label',
                                            { className: 'fw-700 text-sm text-primary' },
                                            'College'
                                        ),
                                        _react2.default.createElement(
                                            'p',
                                            { className: 'fw-700 text-md text-light' },
                                            'MGU University, 2009'
                                        )
                                    )
                                )
                            )
                        )
                    ),
                    _react2.default.createElement(
                        'li',
                        null,
                        _react2.default.createElement(
                            _ExpansionPanel2.default,
                            null,
                            _react2.default.createElement(
                                _ExpansionPanel.ExpansionPanelSummary,
                                { expandIcon: _react2.default.createElement(_ExpandMore2.default, null) },
                                _react2.default.createElement(
                                    'div',
                                    { className: 'title' },
                                    'Subscribed Serivces ',
                                    _react2.default.createElement('span', { className: 'float-right' })
                                )
                            ),
                            _react2.default.createElement(
                                _ExpansionPanel.ExpansionPanelDetails,
                                null,
                                _react2.default.createElement(
                                    'div',
                                    { className: 'more-content' },
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'form-group' },
                                        _react2.default.createElement(
                                            'label',
                                            { className: 'fw-700 text-sm text-primary' },
                                            'Qualification'
                                        ),
                                        _react2.default.createElement(
                                            'p',
                                            { className: 'fw-700 text-md text-light' },
                                            'MD'
                                        )
                                    ),
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'form-group' },
                                        _react2.default.createElement(
                                            'label',
                                            { className: 'fw-700 text-sm text-primary' },
                                            'Specialization'
                                        ),
                                        _react2.default.createElement(
                                            'p',
                                            { className: 'fw-700 text-md text-light' },
                                            'Dermitology'
                                        )
                                    ),
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'form-group' },
                                        _react2.default.createElement(
                                            'label',
                                            { className: 'fw-700 text-sm text-primary' },
                                            'College'
                                        ),
                                        _react2.default.createElement(
                                            'p',
                                            { className: 'fw-700 text-md text-light' },
                                            'MGU University, 2009'
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

    static loadData(store, match) {
        return store.dispatch((0, _index.getDoctorById)(match.params.id));
    }

    componentDidMount() {
        this.props.getDoctorById(this.props.match.params.id);
    }

    render() {

        return _react2.default.createElement(_index3.default, this.props);
    }
}

AppointmentSlot.contextTypes = {
    router: () => null
};
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

    static loadData(store, match) {
        return store.dispatch((0, _index.getDoctorById)(match.params.id));
    }

    componentDidMount() {
        this.props.getDoctorById(this.props.match.params.id);
    }

    render() {

        return _react2.default.createElement(_index3.default, this.props);
    }
}

DoctorProfile.contextTypes = {
    router: () => null
};
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

const routes = [{ path: '/opd', exact: true, component: _SearchCriteria2.default }, { path: '/locationsearch', exact: true, component: _LocationSearch2.default }, { path: '/opd/searchresults', exact: true, component: _SearchResults2.default }, { path: '/opd/doctor/:id', exact: true, component: _DoctorProfile2.default }, { path: '/opd/doctor/:id/:clinicId/book', exact: true, component: _AppointmentSlot2.default }, { path: '/opd/doctor/:id/availability', exact: true, component: _ClinicList2.default }, { path: '/doctorprofile/:id/:clinicId/bookdetails', exact: true, component: _PatientDetails2.default }, { path: '/user/signup', exact: true, component: _UserSignup2.default }, { path: '/user', exact: true, component: _UserProfile2.default }, { path: '/user/:id', exact: true, component: _UserProfile2.default }, { path: '/user/:id/appointments', exact: true, component: _UserAppointments2.default }, { path: '/user/:id/reports', exact: true, component: _UserReports2.default }, { path: '/chat', exact: true, component: _Chat2.default }, { path: '/payment', exact: true, component: _Payment2.default }, { path: '/booking/:refId', exact: true, component: _Booking2.default }, { path: '/login', exact: true, component: _UserLogin2.default }, { path: '/otp/verify', exact: true, component: _OtpVerify2.default }, { path: '/dx', exact: true, component: _SearchCriteria4.default }, { path: '/dx/searchresults', exact: true, component: _SearchResults4.default }, { path: '/lab/:id', exact: true, component: _Lab2.default }, { path: '/lab/:id/tests', exact: true, component: _TestSelector2.default }, { path: '/lab/:id/book', exact: true, component: _BookingSummary2.default }, { path: '/lab/booking/summary/:id', exact: true, component: _BookingSummary2.default }];

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

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const path = __webpack_require__(/*! path */ "path");
const http = __webpack_require__(/*! http */ "http");
const Express = __webpack_require__(/*! express */ "express");
const app = new Express();
const server = new http.Server(app);

app.use('/assets', Express.static(path.join(__dirname, 'assets')));
app.use('/dist', Express.static(path.join(__dirname, 'dist')));

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2FjdGlvbnMvY29tbW9ucy9hdXRoLmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9hY3Rpb25zL2NvbW1vbnMvdXNlci5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvYWN0aW9ucy9kaWFnbm9zaXMvbGFiU2VhcmNoLmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9hY3Rpb25zL2RpYWdub3Npcy9zZWFyY2hDcml0ZXJpYS5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvYWN0aW9ucy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvYWN0aW9ucy9vcGQvZG9jdG9yU2VhcmNoLmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9hY3Rpb25zL29wZC9zZWFyY2hDcml0ZXJpYS5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvYXBpL2FwaS5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9jb21tb25zL0xvYWRlci9Mb2FkZXIuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvY29tbW9ucy9Mb2FkZXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvY29tbW9ucy9Vc2VyTG9naW4vVXNlckxvZ2luLmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL2NvbW1vbnMvVXNlckxvZ2luL2luZGV4LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL2NvbW1vbnMvY2hhdC9DaGF0Vmlldy5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9jb21tb25zL2NoYXQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvY29tbW9ucy9jb21tb25seVNlYXJjaGVkL0NvbW1vbmx5U2VhcmNoZWQuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvY29tbW9ucy9jb21tb25seVNlYXJjaGVkL2luZGV4LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL2NvbW1vbnMvY3JpdGVyaWFTZWFyY2gvQ3JpdGVyaWFTZWFyY2hWaWV3LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL2NvbW1vbnMvY3JpdGVyaWFTZWFyY2gvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvY29tbW9ucy9vdHBWZXJpZnkvT3RwVmVyaWZ5LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL2NvbW1vbnMvb3RwVmVyaWZ5L2luZGV4LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL2NvbW1vbnMvcHJvZmlsZVNsaWRlci9Qcm9maWxlU2xpZGVyLmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL2NvbW1vbnMvcHJvZmlsZVNsaWRlci9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9jb21tb25zL3RpbWVTbG90U2VsZWN0b3IvVGltZVNsb3RTZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9jb21tb25zL3RpbWVTbG90U2VsZWN0b3IvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvY29tbW9ucy91c2VyQXBwb2ludG1lbnRzL1VzZXJBcHBvaW50bWVudHNWaWV3LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL2NvbW1vbnMvdXNlckFwcG9pbnRtZW50cy9hcHBvaW50bWVudExpc3QvQXBwb2ludG1lbnRMaXN0LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL2NvbW1vbnMvdXNlckFwcG9pbnRtZW50cy9hcHBvaW50bWVudExpc3QvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvY29tbW9ucy91c2VyQXBwb2ludG1lbnRzL2luZGV4LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL2NvbW1vbnMvdXNlclByb2ZpbGUvVXNlclByb2ZpbGVWaWV3LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL2NvbW1vbnMvdXNlclByb2ZpbGUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvY29tbW9ucy91c2VyUHJvZmlsZS9wcm9maWxlRGF0YS9Qcm9maWxlRGF0YS5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9jb21tb25zL3VzZXJQcm9maWxlL3Byb2ZpbGVEYXRhL2luZGV4LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL2NvbW1vbnMvdXNlclJlcG9ydHMvVXNlclJlcG9ydHNWaWV3LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL2NvbW1vbnMvdXNlclJlcG9ydHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvY29tbW9ucy91c2VyUmVwb3J0cy9yZXBvcnRMaXN0L1JlcG9ydExpc3QuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvY29tbW9ucy91c2VyUmVwb3J0cy9yZXBvcnRMaXN0L2luZGV4LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL2NvbW1vbnMvdXNlclNpZ251cC9Vc2VyU2lnbnVwLmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL2NvbW1vbnMvdXNlclNpZ251cC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9kaWFnbm9zaXMvYm9va2luZ1N1bW1hcnkvQm9va2luZ1N1bW1hcnlWaWV3LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL2RpYWdub3Npcy9ib29raW5nU3VtbWFyeS9jaG9vc2VQYXRpZW50LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL2RpYWdub3Npcy9ib29raW5nU3VtbWFyeS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9kaWFnbm9zaXMvYm9va2luZ1N1bW1hcnkvcGlja3VwQWRkcmVzcy5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9kaWFnbm9zaXMvYm9va2luZ1N1bW1hcnkvdmlzaXRUaW1lLmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL2RpYWdub3Npcy9jb21tb25zL2xhYkRldGFpbHMvTGFiRGV0YWlsLmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL2RpYWdub3Npcy9jb21tb25zL2xhYkRldGFpbHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvZGlhZ25vc2lzL2NvbW1vbnMvbGFiUHJvZmlsZUNhcmQvTGFiUHJvZmlsZUNhcmQuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvZGlhZ25vc2lzL2NvbW1vbnMvbGFiUHJvZmlsZUNhcmQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvZGlhZ25vc2lzL2NvbW1vbnMvbGFiVGVzdHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvZGlhZ25vc2lzL2NvbW1vbnMvbGFiVGVzdHMvbGFiVGVzdHMuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvZGlhZ25vc2lzL2NvbW1vbnMvb3JkZXJEZXRhaWxzL09yZGVyRGV0YWlscy5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9kaWFnbm9zaXMvY29tbW9ucy9vcmRlckRldGFpbHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvZGlhZ25vc2lzL2xhYi9MYWJWaWV3LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL2RpYWdub3Npcy9sYWIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvZGlhZ25vc2lzL3BhdGllbnREZXRhaWxzL1BhdGllbnREZXRhaWxzVmlldy5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9kaWFnbm9zaXMvcGF0aWVudERldGFpbHMvYWRkcmVzc0Zvcm0vQWRkcmVzc0Zvcm0uanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvZGlhZ25vc2lzL3BhdGllbnREZXRhaWxzL2FkZHJlc3NGb3JtL2luZGV4LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL2RpYWdub3Npcy9wYXRpZW50RGV0YWlscy9kZXRhaWxzRm9ybS9EZXRhaWxzRm9ybS5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9kaWFnbm9zaXMvcGF0aWVudERldGFpbHMvZGV0YWlsc0Zvcm0vaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvZGlhZ25vc2lzL3BhdGllbnREZXRhaWxzL2luZGV4LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL2RpYWdub3Npcy9zZWFyY2hDcml0ZXJpYS9TZWFyY2hDcml0ZXJpYVZpZXcuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvZGlhZ25vc2lzL3NlYXJjaENyaXRlcmlhL2luZGV4LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL2RpYWdub3Npcy9zZWFyY2hSZXN1bHRzL1NlYXJjaFJlc3VsdHNWaWV3LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL2RpYWdub3Npcy9zZWFyY2hSZXN1bHRzL2luZGV4LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL2RpYWdub3Npcy9zZWFyY2hSZXN1bHRzL2xhYnNMaXN0L0xhYnNMaXN0LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL2RpYWdub3Npcy9zZWFyY2hSZXN1bHRzL2xhYnNMaXN0L2luZGV4LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL2RpYWdub3Npcy9zZWFyY2hSZXN1bHRzL3RvcEJhci9Ub3BCYXIuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvZGlhZ25vc2lzL3NlYXJjaFJlc3VsdHMvdG9wQmFyL2luZGV4LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL2RpYWdub3Npcy90ZXN0U2VsZWN0b3IvVGVzdFNlbGVjdG9yLmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL2RpYWdub3Npcy90ZXN0U2VsZWN0b3IvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvb3BkL2FwcG9pbnRtZW50U2xvdC9BcHBvaW50bWVudFNsb3QuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvb3BkL2FwcG9pbnRtZW50U2xvdC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9vcGQvYm9va2luZy9Cb29raW5nVmlldy5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9vcGQvY2xpbmljTGlzdC9DbGluaWNMaXN0Vmlldy5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9vcGQvY2xpbmljTGlzdC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9vcGQvY29tbW9ucy9jbGluaWNTZWxlY3Rvci9DbGluaWNTZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9vcGQvY29tbW9ucy9jbGluaWNTZWxlY3Rvci9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9vcGQvY29tbW9ucy9kb2N0b3JQcm9maWxlQ2FyZC9Eb2N0b3JQcm9maWxlQ2FyZC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9vcGQvY29tbW9ucy9kb2N0b3JQcm9maWxlQ2FyZC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9vcGQvY29tbW9ucy9zZWxlY3RlZENsaW5pYy9TZWxlY3RlZENsaW5pYy5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9vcGQvY29tbW9ucy9zZWxlY3RlZENsaW5pYy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9vcGQvY3JpdGVyaWFTZWFyY2gvQ3JpdGVyaWFTZWFyY2hWaWV3LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL29wZC9jcml0ZXJpYVNlYXJjaC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9vcGQvZG9jdG9yUHJvZmlsZS9Eb2N0b3JQcm9maWxlVmlldy5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9vcGQvZG9jdG9yUHJvZmlsZS9hYm91dERvY3Rvci9BYm91dERvY3Rvci5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9vcGQvZG9jdG9yUHJvZmlsZS9hYm91dERvY3Rvci9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9vcGQvZG9jdG9yUHJvZmlsZS9kb2N0b3JQcm9maWxlQ2FyZC9Eb2N0b3JQcm9maWxlQ2FyZC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9vcGQvZG9jdG9yUHJvZmlsZS9kb2N0b3JQcm9maWxlQ2FyZC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9vcGQvZG9jdG9yUHJvZmlsZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9vcGQvZG9jdG9yUHJvZmlsZS9wcm9mZXNzaW9uYWxHcmFwaC9Qcm9mZXNzaW9uYWxHcmFwaC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9vcGQvZG9jdG9yUHJvZmlsZS9wcm9mZXNzaW9uYWxHcmFwaC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9vcGQvbG9jYXRpb25TZWFyY2gvTG9jYXRpb25TZWFyY2guanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvb3BkL2xvY2F0aW9uU2VhcmNoL2luZGV4LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL29wZC9wYXRpZW50RGV0YWlscy9QYXRpZW50RGV0YWlscy5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9vcGQvcGF0aWVudERldGFpbHMvZGV0YWlsc0Zvcm0vRGV0YWlsc0Zvcm0uanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvb3BkL3BhdGllbnREZXRhaWxzL2RldGFpbHNGb3JtL2luZGV4LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL29wZC9wYXRpZW50RGV0YWlscy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9vcGQvcGF5bWVudC9QYXltZW50Vmlldy5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9vcGQvc2VhcmNoQ3JpdGVyaWEvU2VhcmNoQ3JpdGVyaWFWaWV3LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL29wZC9zZWFyY2hDcml0ZXJpYS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9vcGQvc2VhcmNoUmVzdWx0cy9TZWFyY2hSZXN1bHRzVmlldy5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9vcGQvc2VhcmNoUmVzdWx0cy9kb2N0b3JzTGlzdC9Eb2N0b3JzTGlzdC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9vcGQvc2VhcmNoUmVzdWx0cy9kb2N0b3JzTGlzdC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9vcGQvc2VhcmNoUmVzdWx0cy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9vcGQvc2VhcmNoUmVzdWx0cy90b3BCYXIvVG9wQmFyLmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL29wZC9zZWFyY2hSZXN1bHRzL3RvcEJhci9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9vcGQvc2VhcmNoUmVzdWx0c0ZpbHRlci9TZWFyY2hSZXN1bHRzRmlsdGVyLmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL29wZC9zZWFyY2hSZXN1bHRzRmlsdGVyL2luZGV4LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb25zdGFudHMvdHlwZXMuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbnRhaW5lcnMvY29tbW9ucy9DaGF0LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb250YWluZXJzL2NvbW1vbnMvT3RwVmVyaWZ5LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb250YWluZXJzL2NvbW1vbnMvVXNlckFwcG9pbnRtZW50cy5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29udGFpbmVycy9jb21tb25zL1VzZXJMb2dpbi5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29udGFpbmVycy9jb21tb25zL1VzZXJQcm9maWxlLmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb250YWluZXJzL2NvbW1vbnMvVXNlclJlcG9ydHMuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbnRhaW5lcnMvY29tbW9ucy9Vc2VyU2lnbnVwLmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb250YWluZXJzL2RpYWdub3Npcy9Cb29raW5nU3VtbWFyeS5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29udGFpbmVycy9kaWFnbm9zaXMvTGFiLmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb250YWluZXJzL2RpYWdub3Npcy9QYXRpZW50RGV0YWlscy5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29udGFpbmVycy9kaWFnbm9zaXMvU2VhcmNoQ3JpdGVyaWEuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbnRhaW5lcnMvZGlhZ25vc2lzL1NlYXJjaFJlc3VsdHMuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbnRhaW5lcnMvZGlhZ25vc2lzL1Rlc3RTZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29udGFpbmVycy9vcGQvQXBwb2ludG1lbnRTbG90LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb250YWluZXJzL29wZC9Cb29raW5nLmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb250YWluZXJzL29wZC9DbGluaWNMaXN0LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb250YWluZXJzL29wZC9Dcml0ZXJpYVNlYXJjaC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29udGFpbmVycy9vcGQvRG9jdG9yUHJvZmlsZS5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29udGFpbmVycy9vcGQvTG9jYXRpb25TZWFyY2guanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbnRhaW5lcnMvb3BkL1BhdGllbnREZXRhaWxzLmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb250YWluZXJzL29wZC9QYXltZW50LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb250YWluZXJzL29wZC9TZWFyY2hDcml0ZXJpYS5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29udGFpbmVycy9vcGQvU2VhcmNoUmVzdWx0cy5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29udGFpbmVycy9vcGQvU2VhcmNoUmVzdWx0c0ZpbHRlci5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvaGVscGVycy9uYXZpZ2F0ZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvaGVscGVycy9uYXZpZ2F0ZS9uYXZpZ2F0ZS5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvaGVscGVycy9zdG9yYWdlL2luZGV4LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9oZWxwZXJzL3N0b3JhZ2Uvc3RvcmFnZS5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvcmVkdWNlcnMvY29tbW9ucy9hdXRoLmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9yZWR1Y2Vycy9jb21tb25zL3VzZXIuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL3JlZHVjZXJzL2RpYWdub3Npcy9sYWJzLmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9yZWR1Y2Vycy9kaWFnbm9zaXMvbGFic1NlYXJjaC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvcmVkdWNlcnMvZGlhZ25vc2lzL3NlYXJjaENyaXRlcmlhLmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9yZWR1Y2Vycy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvcmVkdWNlcnMvb3BkL2RvY3RvclNlYXJjaC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvcmVkdWNlcnMvb3BkL2RvY3RvcnMuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL3JlZHVjZXJzL29wZC9zZWFyY2hDcml0ZXJpYS5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvcm91dGVzLmpzIiwid2VicGFjazovLy8uL2Rldi9qcy91dGlscy9kYXRlVGltZVV0aWxzLmpzIiwid2VicGFjazovLy8uL2luZGV4LmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcImF4aW9zXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZXhwcmVzc1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcImh0dHBcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJtYXRlcmlhbC11aS1pY29ucy9BY2NvdW50Q2lyY2xlXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibWF0ZXJpYWwtdWktaWNvbnMvQXR0YWNoTW9uZXlcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJtYXRlcmlhbC11aS1pY29ucy9DYWxsXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibWF0ZXJpYWwtdWktaWNvbnMvRXhwYW5kTW9yZVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIm1hdGVyaWFsLXVpLWljb25zL0tleWJvYXJkQXJyb3dSaWdodFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIm1hdGVyaWFsLXVpLWljb25zL1BheW1lbnRcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJtYXRlcmlhbC11aS9DaGVja2JveFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIm1hdGVyaWFsLXVpL0NoaXBcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJtYXRlcmlhbC11aS9FeHBhbnNpb25QYW5lbFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIm1hdGVyaWFsLXVpL0Zvcm1cIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJtYXRlcmlhbC11aS9NZW51XCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibWF0ZXJpYWwtdWkvUHJvZ3Jlc3NcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJtYXRlcmlhbC11aS9SYWRpb1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcIm1hdGVyaWFsLXVpL1N0ZXBwZXJcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJtYXRlcmlhbC11aS9zdHlsZXNcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJwYXRoXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmMtc2xpZGVyL2xpYi9SYW5nZVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInJlYWN0XCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVhY3QtZG9tL3NlcnZlclwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInJlYWN0LWpzcy9saWIvSnNzUHJvdmlkZXJcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWFjdC1qc3MvbGliL2pzc1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcInJlYWN0LXJlZHV4XCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVhY3Qtcm91dGVyXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVhY3Qtcm91dGVyLWRvbVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInJlYWN0LXRyYW5zaXRpb24tZ3JvdXBcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWR1eFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInJlZHV4LWxvZ2dlclwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInJlZHV4LXRodW5rXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwidW5pdmVyc2FsLWNvb2tpZVwiIl0sIm5hbWVzIjpbInNlbmRPVFAiLCJudW1iZXIiLCJjYiIsImRpc3BhdGNoIiwidHlwZSIsInBheWxvYWQiLCJwaG9uZU51bWJlciIsInRoZW4iLCJyZXNwb25zZSIsImV4aXN0cyIsImNhdGNoIiwiZXJyb3IiLCJtZXNzYWdlIiwiZXJyb3JfbWVzc2FnZSIsInN1Ym1pdE9UUCIsIm90cCIsInNldEF1dGhUb2tlbiIsInRva2VuIiwiZ2V0VXNlclByb2ZpbGUiLCJwcm9maWxlcyIsImdldFVzZXJQcm9maWxlV2l0aEFwcG9pbnRtZW50cyIsImdldFVzZXJQcm9maWxlV2l0aFRlc3RzIiwiZ2V0TGFicyIsInNlYXJjaFN0YXRlIiwiZmlsdGVyQ3JpdGVyaWEiLCJtZXJnZVN0YXRlIiwidGVzdElkcyIsInNlbGVjdGVkQ3JpdGVyaWFzIiwiZmlsdGVyIiwieCIsInJlZHVjZSIsImZpbmFsU3RyIiwiY3VyciIsImkiLCJpZCIsImxhdCIsImxvbmciLCJzZWxlY3RlZExvY2F0aW9uIiwiZ2VvbWV0cnkiLCJsb2NhdGlvbiIsImxuZyIsIm1pbl9kaXN0YW5jZSIsImRpc3RhbmNlUmFuZ2UiLCJtYXhfZGlzdGFuY2UiLCJtaW5fcHJpY2UiLCJwcmljZVJhbmdlIiwibWF4X3ByaWNlIiwib3JkZXJfYnkiLCJzb3J0QnkiLCJ1cmwiLCJnZXRMYWJCeUlkIiwibGFiSWQiLCJnZXRMYWJUaW1lU2xvdHMiLCJjYWxsYmFjayIsImdldExhYkJvb2tpbmdTdW1tYXJ5IiwiYm9va2luZ0lkIiwibG9hZExhYkNvbW1vbkNyaXRlcmlhcyIsInRvZ2dsZURpYWdub3Npc0NyaXRlcmlhIiwiY3JpdGVyaWEiLCJnZXREaWFnbm9zaXNDcml0ZXJpYVJlc3VsdHMiLCJzZWFyY2hTdHJpbmciLCJTRUFSQ0hfQ1JJVEVSSUFfT1BEIiwiU0VBUkNIX0NSSVRFUklBX0xBQlMiLCJET0NUT1JTX0FDVElPTlMiLCJMQUJTX0FDVElPTlMiLCJVU0VSX0FDVElPTlMiLCJBVVRIX0FDVElPTlMiLCJtb2R1bGUiLCJleHBvcnRzIiwiT2JqZWN0IiwiYXNzaWduIiwiZ2V0RG9jdG9ycyIsImdldERvY3RvckJ5SWQiLCJkb2N0b3JJZCIsImdldFRpbWVTbG90cyIsImNsaW5pY0lkIiwibG9hZE9QRENvbW1vbkNyaXRlcmlhIiwidG9nZ2xlT1BEQ3JpdGVyaWEiLCJzZWxlY3RMb2NhdGlvbiIsImdldE9QRENyaXRlcmlhUmVzdWx0cyIsImF4aW9zSW5zdGFuY2UiLCJjcmVhdGUiLCJiYXNlVVJMIiwiaGVhZGVyIiwicmVqZWN0SGFuZGxlciIsImNvbnNvbGUiLCJsb2ciLCJBUElfR0VUIiwiZ2V0QXV0aFRva2VuIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJtZXRob2QiLCJyZXMiLCJkYXRhIiwiQVBJX1BPU1QiLCJoZWFkZXJzIiwiQVBJX1BVVCIsIkFQSV9ERUxFVEUiLCJMb2FkZXIiLCJDb21wb25lbnQiLCJjb25zdHJ1Y3RvciIsInByb3BzIiwicmVuZGVyIiwiVXNlckxvZ2luVmlldyIsInN0YXRlIiwidmFsaWRhdGlvbkVycm9yIiwiaW5wdXRIYW5kbGVyIiwiZSIsInNldFN0YXRlIiwidGFyZ2V0IiwibmFtZSIsInZhbHVlIiwic3VibWl0T1RQUmVxdWVzdCIsIm1hdGNoIiwiaGlzdG9yeSIsInJlcGxhY2UiLCJiaW5kIiwib3RwX3JlcXVlc3Rfc2VudCIsIklmcmFtU3R5bGUiLCJ3aWR0aCIsImhlaWdodCIsIkNoYXRWaWV3IiwiY29udGV4dFR5cGVzIiwicm91dGVyIiwiQ29tbW9ubHlTZWFyY2hlZCIsInJvd3MiLCJtYXAiLCJyb3ciLCJzZWxlY3RlZCIsInRvZ2dsZSIsImRpdkNsYXNzIiwidWxDbGFzcyIsImhlYWRpbmciLCJkZWJvdW5jZXIiLCJmbiIsImRlbGF5IiwidGltZXIiLCJjbGVhclRpbWVvdXQiLCJzZXRUaW1lb3V0IiwiY2FsbCIsIkNyaXRlcmlhU2VhcmNoVmlldyIsInNlYXJjaFZhbHVlIiwic2VhcmNoUmVzdWx0cyIsImNvbXBvbmVudERpZE1vdW50IiwiZ2V0U2VhcmNoUmVzdWx0cyIsImlucHV0IiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsInRlc3RzIiwiYWRkQ3JpdGVyaWEiLCJmb3JtYXR0ZWRfYWRkcmVzcyIsInNsaWNlIiwiZ28iLCJwdXNoIiwidGl0bGUiLCJjaGVja0ZvckxvYWQiLCJjaGlsZHJlbiIsIk90cFZlcmlmeVZpZXciLCJQcm9maWxlU2xpZGVyIiwic3dpdGNoVXNlciIsInByb2ZpbGVJZCIsImNvbnRleHQiLCJzdWJSb3V0ZSIsImtleXMiLCJzcmMiLCJwcm9maWxlSW1hZ2UiLCJEQVlTX1RPX1NIT1ciLCJXRUVLX0RBWVMiLCJUaW1lU2xvdFNlbGVjdG9yIiwiZ2VuZXJhdGVEYXlzIiwiVXNlckFwcG9pbnRtZW50c1ZpZXciLCJjb21wYXJlRGF0ZVdpdGhUb2RheSIsImRhdGUiLCJ0b2RheSIsIkRhdGUiLCJnZXRUaW1lIiwic2VsZWN0ZWRVc2VyIiwidXNlclByb2ZpbGVJZCIsInBhcmFtcyIsIlVTRVIiLCJpc0RlZmF1bHRVc2VyIiwiYXBwb2ludG1lbnRzIiwiYXBwb2ludG1lbnQiLCJzbG90Iiwic3RhcnQiLCJpbmRleCIsIkFwcG9pbnRtZW50TGlzdCIsInVuaXhfdGltZXN0YW1wIiwiaG91cnMiLCJnZXRIb3VycyIsIm1pbnV0ZXMiLCJnZXRNaW51dGVzIiwic3Vic3RyIiwiZG9jdG9yTmFtZSIsImVuZCIsInRvRGF0ZVN0cmluZyIsIlVzZXJQcm9maWxlVmlldyIsIlByb2ZpbGVEYXRhIiwib3BlbkFwcG9pbnRtZW50cyIsIm9wZW5SZXBvcnRzIiwiZ2VuZGVyIiwiYWdlIiwibW9iaWxlIiwibWVkaWNhbEhpc3RvcnlDb3VudCIsIm1lZGljYWxUZXN0Q291bnQiLCJvbmxpbmVDb25zdWx0YXRpb25Db3VudCIsIm9wZFZpc2l0Q291bnQiLCJwcm9maWxlRGF0YSIsIlVzZXJSZXBvcnRzVmlldyIsInRlc3QiLCJSZXBvcnRMaXN0Iiwic3ViX25hbWUiLCJhYmJyZXZpYXRpb24iLCJjYXRlZ29yeSIsIlVzZXJTaWdudXBWaWV3IiwiYXBwb2lubWVudEZvciIsInBhdGllbnROYW1lIiwiZW1haWwiLCJzdWJtaXRGb3JtIiwiQm9va2luZ1N1bW1hcnlWaWV3Iiwic2VsZWN0ZWRMYWIiLCJwaWNrdXBUeXBlIiwib3BlblRlc3RzIiwiaGFuZGxlUGlja3VwVHlwZSIsImdldFNlbGVjdG9ycyIsImZpbmFsUHJpY2UiLCJsYWJEZXRhaWwiLCJMQUJTIiwibGFiIiwicHJpY2UiLCJ0d3AiLCJ0ZXN0X2lkIiwibXJwIiwiYWRkcmVzcyIsIkNob29zZVBhdGllbnQiLCJQaWNrdXBBZGRyZXNzIiwiVmlzaXRUaW1lIiwiTGFiRGV0YWlscyIsIkxhYlByb2ZpbGVDYXJkIiwib3BlbkxhYiIsImRldGFpbHMiLCJMYWJUZXN0cyIsImxlbmd0aCIsIk9yZGVyRGV0YWlscyIsInByaWNlX2JyZWFrdXAiLCJ0b3RhbFByaWNlIiwidG90YWxUZXN0cyIsImJyZWFrdXAiLCJhbW91bnQiLCJMYWJWaWV3IiwiYm9va0xhYiIsIlBhdGllbnREZXRhaWxzVmlldyIsInNlbGVjdGVkVGVzdHMiLCJzZWxlY3RlZFNsb3QiLCJzZWxlY3RlZFNsb3RTdGFydCIsInNlbGVjdGVkU2xvdEVuZCIsImdldExvY2F0aW9uUGFyYW0iLCJ0YWciLCJwYXJhbVN0cmluZyIsInNlYXJjaCIsIlVSTFNlYXJjaFBhcmFtcyIsImdldCIsInByb2NlZWQiLCJwYXJzZUZsb2F0IiwidG9TdHJpbmciLCJBZGRyZXNzRm9ybSIsImxvY2FsaXR5IiwibGFuZG1hcmsiLCJwaW5jb2RlIiwiY2l0eSIsIndoaWNoIiwiRGV0YWlsc0Zvcm0iLCJwYXRpZW50RW1haWwiLCJwYXRpZW50R2VuZGVyIiwicGF0aWVudE1vYmlsZSIsIlNlYXJjaENyaXRlcmlhVmlldyIsInNlYXJjaFByb2NlZWQiLCJzZWFyY2hEYXRhIiwiZW5jb2RlVVJJQ29tcG9uZW50IiwiSlNPTiIsInN0cmluZ2lmeSIsImZpbHRlckRhdGEiLCJMT0FERURfU0VBUkNIX0NSSVRFUklBX0xBQiIsImNvbW1vbl90ZXN0cyIsImNvbW1vbl9jb25kaXRpb25zIiwicHJlZmVycmVkX2xhYnMiLCJTZWFyY2hSZXN1bHRzVmlldyIsInBhcnNlIiwiZ2V0TGFiTGlzdCIsImFwcGx5RmlsdGVycyIsImZpbHRlclN0YXRlIiwiTE9BREVEX0xBQlNfU0VBUkNIIiwiTGFic0xpc3QiLCJsYWJMaXN0IiwiVG9wQmFyIiwiYW5jaG9yRWwiLCJvcGVuRmlsdGVyIiwiY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyIsImhhbmRsZU9wZW4iLCJldmVudCIsImN1cnJlbnRUYXJnZXQiLCJoYW5kbGVDbG9zZSIsInRvZ2dsZUZpbHRlciIsImhhbmRsZVJhbmdlIiwicmFuZ2UiLCJnZXRDcml0ZXJpYVN0cmluZyIsImZpbmFsIiwiY3JpdGVyaWFTdHIiLCJCb29sZWFuIiwic3RvcFByb3BhZ2F0aW9uIiwicHJldmVudERlZmF1bHQiLCJUZXN0U2VsZWN0b3JWaWV3IiwidG9nZ2xlVGVzdCIsImxhYkRhdGEiLCJpbmRleE9mIiwiQXBwb2ludG1lbnRTbG90Iiwic2VsZWN0ZWREb2N0b3IiLCJzZWxlY3RlZENsaW5pYyIsInRpbWVTbG90cyIsInNlbGVjdFRpbWVTbG90IiwiRE9DVE9SUyIsIkJvb2tpbmdWaWV3IiwiQ2xpbmljTGlzdFZpZXciLCJDbGluaWNTZWxlY3RvciIsInNlbGVjdENsaW5pYyIsImhvc3BpdGFscyIsImhvc3BpdGFsIiwiaG9zcGl0YWxfbmFtZSIsImZlZXMiLCJ0aW1pbmdzIiwidGltaW5nS2V5Iiwia2V5Iiwiam9pbiIsImhvc3BpdGFsX2lkIiwiRG9jdG9yUHJvZmlsZUNhcmQiLCJjYXJkQ2xpY2siLCJib29rTm93IiwiZ2V0UXVhbGlmaWNhdGlvblN0ciIsInF1YWxpZmljYXRpb25TcGVjaWFsaXphdGlvbiIsInN0ciIsInF1YWxpZmljYXRpb24iLCJzcGVjaWFsaXphdGlvbiIsImV4cGVyaWVuY2VfeWVhcnMiLCJob3NwaXRhbF9jb3VudCIsInF1YWxpZmljYXRpb25zIiwiZGlzY291bnRlZF9mZWVzIiwiU2VsZWN0ZWRDbGluaWMiLCJmb2N1cyIsImdldENyaXRlcmlhUmVzdWx0cyIsInJlc3VsdCIsInRvZ2dsZUNyaXRlcmlhIiwiZ29CYWNrIiwicmVzdWx0RGF0YSIsImoiLCJEb2N0b3JQcm9maWxlVmlldyIsIkFib3V0RG9jdG9yIiwibGVzc0Fib3V0IiwicmVhZE1vcmUiLCJhYm91dCIsIlByb2Zlc3Npb25hbEdyYXBoIiwiTG9jYXRpb25TZWFyY2giLCJnZXRMb2NhdGlvbiIsImF1dG8iLCJnb29nbGUiLCJtYXBzIiwicGxhY2VzIiwiQXV0b2NvbXBsZXRlU2VydmljZSIsInJlcXVlc3QiLCJ0eXBlcyIsImNvbXBvbmVudFJlc3RyaWN0aW9ucyIsImNvdW50cnkiLCJnZXRQbGFjZVByZWRpY3Rpb25zIiwicmVzdWx0cyIsInN0YXR1cyIsIk1hcCIsImNlbnRlciIsInpvb20iLCJzZXJ2aWNlIiwiUGxhY2VzU2VydmljZSIsImdldERldGFpbHMiLCJyZWZlcmVuY2UiLCJwbGFjZSIsImRlc2NyaXB0aW9uIiwiZGlzcGxheSIsIlBhdGllbnREZXRhaWxzIiwiUGF5bWVudFZpZXciLCJMT0FERURfU0VBUkNIX0NSSVRFUklBX09QRCIsImNvbmRpdGlvbnMiLCJzcGVjaWFsaXphdGlvbnMiLCJnZXREY290b3JzIiwiZ2V0RG9jdG9yTGlzdCIsIkxPQURFRF9ET0NUT1JfU0VBUkNIIiwiRG9jdG9yc0xpc3QiLCJkb2N0b3JMaXN0IiwiZG9jSWQiLCJzb3J0X29uIiwic2l0c19hdF9jbGluaWMiLCJzaXRzX2F0X2hvc3BpdGFsIiwiaXNfZmVtYWxlIiwiaXNfYXZhaWxhYmxlIiwiaGFuZGxlSW5wdXQiLCJldk5hbWUiLCJjaGVja2VkIiwic2l0c19hdCIsIlNlYXJjaFJlc3VsdHNGaWx0ZXIiLCJmZWVfMCIsImZlZV8xIiwiZmVlXzIiLCJmZWVfMyIsImNsaW5pY19wZXJzb25hbCIsImNsaW5pY19ob3NwaXRhbCIsImNsaW5pY19tdWx0aSIsImF2YWlsYWJsZV90b2RheSIsImRpc3RhbmNlIiwiYXBwbHlGaWx0ZXIiLCJzZXRPUERGaWx0ZXJzIiwiaGFuZGxlQ2hlY2tib3giLCJoYW5kbGVDaGFuZ2VSYWRpbyIsIlNFTkRfT1RQX1JFUVVFU1QiLCJTRU5EX09UUF9TVUNDRVNTIiwiU0VORF9PVFBfRkFJTCIsIlNVQk1JVF9PVFBfUkVRVUVTVCIsIlNVQk1JVF9PVFBfU1VDQ0VTUyIsIlNVQk1JVF9PVFBfRkFJTCIsIkFQUEVORF9ET0NUT1JTIiwiRE9DVE9SX1NFQVJDSCIsIkRPQ1RPUl9TRUFSQ0hfU1RBUlQiLCJTRUxFQ1RfTE9DQVRJT05fT1BEIiwiTUVSR0VfU0VBUkNIX1NUQVRFX09QRCIsIlRPR0dMRV9PUERfQ1JJVEVSSUEiLCJTRVRfT1BEX0ZJTFRFUlMiLCJMT0FEX1NFQVJDSF9DUklURVJJQV9PUEQiLCJUT0dHTEVfRElBR05PU0lTX0NSSVRFUklBIiwiTUVSR0VfU0VBUkNIX1NUQVRFX0xBQiIsIkxPQURfU0VBUkNIX0NSSVRFUklBX0xBQiIsIkFQUEVORF9MQUJTIiwiTEFCX1NFQVJDSCIsIlNFTEVDVF9MT0NBVElPTl9ESUFHTk9TSVMiLCJBUFBFTkRfRklMVEVSU19ESUFHTk9TSVMiLCJMQUJfU0VBUkNIX1NUQVJUIiwiQVBQRU5EX1VTRVJfUFJPRklMRVMiLCJDaGF0IiwibWFwU3RhdGVUb1Byb3BzIiwibWFwRGlzcGF0Y2hUb1Byb3BzIiwiT3RwVmVyaWZ5Iiwic3VjY2Vzc19tZXNzYWdlIiwic3VibWl0X290cCIsInN1Ym1pdF9vdHBfc3VjY2VzcyIsInN1Ym1pdF9vdHBfZmFpbCIsIkFVVEgiLCJVc2VyQXBwb2ludG1lbnRzIiwiVXNlckxvZ2luIiwib3RwX3JlcXVlc3Rfc3VjY2VzcyIsIm90cF9yZXF1ZXN0X2ZhaWwiLCJVc2VyUHJvZmlsZSIsIlVzZXJSZXBvcnRzIiwiVXNlclNpZ251cCIsIkJvb2tpbmdTdW1tYXJ5IiwiTGFiIiwibG9hZERhdGEiLCJzdG9yZSIsIlNlYXJjaENyaXRlcmlhIiwiU2VhcmNoUmVzdWx0cyIsIlRlc3RTZWxlY3RvciIsIkJvb2tpbmciLCJDbGluaWNMaXN0IiwiQ3JpdGVyaWFTZWFyY2giLCJEb2N0b3JQcm9maWxlIiwiUGF5bWVudCIsIk5BVklHQVRFIiwibmF2aWdhdGVUbyIsIndoZXJlIiwid2luZG93IiwiaHJlZiIsInJlZnJlc2hBcHBvaW50bWVudFN0YXRlIiwibm9BcHBvaW50bWVudEZvdW5kIiwidXBjb21pbmciLCJwcmV2aW91cyIsImFjdGlvbiIsImNvb2tpZXMiLCJTVE9SQUdFIiwic2V0IiwiY2hlY2tBdXRoIiwiZGVsZXRlQXV0aCIsInJlbW92ZSIsImRlZmF1bHRTdGF0ZSIsIm5ld1N0YXRlIiwicHJvZmlsZU1hcCIsInByb2ZpbGUiLCJsYXBNYXAiLCJjb25jYXQiLCJmb3VuZCIsImFsbFJlZHVjZXJzIiwiZG9jIiwiZG9jdG9yTWFwIiwiZG9jdG9yIiwicm91dGVzIiwicGF0aCIsImV4YWN0IiwiY29tcG9uZW50IiwiUm91dGVyQ29uZmlnIiwicGF0aG5hbWUiLCJlbnRlciIsImV4aXQiLCJyb3V0ZSIsIlJPVVRFUyIsImRheXMiLCJ0aW1lU3RhbXAiLCJnZXREYXlOYW1lIiwiZ2V0RGF5IiwicHJvY2VzcyIsImVudiIsIk5PREVfVExTX1JFSkVDVF9VTkFVVEhPUklaRUQiLCJyZXF1aXJlIiwiaHR0cCIsIkV4cHJlc3MiLCJhcHAiLCJzZXJ2ZXIiLCJTZXJ2ZXIiLCJ1c2UiLCJzdGF0aWMiLCJfX2Rpcm5hbWUiLCJyZXEiLCJzaGVldHNSZWdpc3RyeSIsInRoZW1lIiwicGFsZXR0ZSIsInByaW1hcnkiLCJtYWluIiwic2Vjb25kYXJ5IiwiZGFuZ2VyIiwiZ2VuZXJhdGVDbGFzc05hbWUiLCJ3cml0ZUhlYWQiLCJMb2NhdGlvbiIsInByb21pc2VzIiwic29tZSIsImFsbCIsInN0b3JlRGF0YSIsImdldFN0YXRlIiwiaHRtbCIsInJlbmRlclRvU3RyaW5nIiwiY3NzIiwic2VuZEZpbGUiLCJyb290IiwibGlzdGVuIiwiZXJyIiwiaW5mbyJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3pFQTs7QUFDQTs7QUFDQTs7Ozs7O0FBRU8sTUFBTUEsNEJBQVUsQ0FBQ0MsTUFBRCxFQUFTQyxFQUFULEtBQWlCQyxRQUFELElBQWM7QUFDakRBLGFBQVM7QUFDTEMscUNBREs7QUFFTEMsaUJBQVM7QUFDTEMseUJBQWFMO0FBRFI7QUFGSixLQUFUOztBQU9BLHVCQUFTLDJCQUFULEVBQXNDO0FBQ2xDLHdCQUFnQkE7QUFEa0IsS0FBdEMsRUFFR00sSUFGSCxDQUVRLFVBQVVDLFFBQVYsRUFBb0I7QUFDeEJMLGlCQUFTO0FBQ0xDLHlDQURLO0FBRUxDLHFCQUFTO0FBRkosU0FBVDtBQUlBLFlBQUlILEVBQUosRUFBUUEsR0FBR00sU0FBU0MsTUFBWjtBQUNYLEtBUkQsRUFRR0MsS0FSSCxDQVFTLFVBQVVDLEtBQVYsRUFBaUI7QUFDdEIsWUFBSUMsVUFBVSxzQkFB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LENBRkQ7O0FBSUF6QixPQUFPMEIsTUFBUCxDQUFjLElBQWQsRUFBcUJDLEdBQUQsSUFBUztBQUN6QixRQUFJQSxHQUFKLEVBQVM7QUFDTCxlQUFPNWMsUUFBUTFFLEtBQVIsQ0FBY3NoQixHQUFkLENBQVA7QUFDSDtBQUNENWMsWUFBUTZjLElBQVIsQ0FBYSx5Q0FBYjtBQUNILENBTEQsRTs7Ozs7Ozs7Ozs7QUN0R0Esa0M7Ozs7Ozs7Ozs7O0FDQUEsb0M7Ozs7Ozs7Ozs7O0FDQUEsaUM7Ozs7Ozs7Ozs7O0FDQUEsNEQ7Ozs7Ozs7Ozs7O0FDQUEsMEQ7Ozs7Ozs7Ozs7O0FDQUEsbUQ7Ozs7Ozs7Ozs7O0FDQUEseUQ7Ozs7Ozs7Ozs7O0FDQUEsaUU7Ozs7Ozs7Ozs7O0FDQUEsc0Q7Ozs7Ozs7Ozs7O0FDQUEsaUQ7Ozs7Ozs7Ozs7O0FDQUEsNkM7Ozs7Ozs7Ozs7O0FDQUEsdUQ7Ozs7Ozs7Ozs7O0FDQUEsNkM7Ozs7Ozs7Ozs7O0FDQUEsNkM7Ozs7Ozs7Ozs7O0FDQUEsaUQ7Ozs7Ozs7Ozs7O0FDQUEsOEM7Ozs7Ozs7Ozs7O0FDQUEsZ0Q7Ozs7Ozs7Ozs7O0FDQUEsK0M7Ozs7Ozs7Ozs7O0FDQUEsaUM7Ozs7Ozs7Ozs7O0FDQUEsZ0Q7Ozs7Ozs7Ozs7O0FDQUEsa0M7Ozs7Ozs7Ozs7O0FDQUEsNkM7Ozs7Ozs7Ozs7O0FDQUEsc0Q7Ozs7Ozs7Ozs7O0FDQUEsOEM7Ozs7Ozs7Ozs7O0FDQUEsd0M7Ozs7Ozs7Ozs7O0FDQUEseUM7Ozs7Ozs7Ozs7O0FDQUEsNkM7Ozs7Ozs7Ozs7O0FDQUEsbUQ7Ozs7Ozs7Ozs7O0FDQUEsa0M7Ozs7Ozs7Ozs7O0FDQUEseUM7Ozs7Ozs7Ozs7O0FDQUEsd0M7Ozs7Ozs7Ozs7O0FDQUEsNkMiLCJmaWxlIjoic2VydmVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyB3YXNtIG1vZHVsZXNcbiBcdHZhciBpbnN0YWxsZWRXYXNtTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvXCI7XG5cbiBcdC8vIG9iamVjdCB3aXRoIGFsbCBjb21waWxlZCBXZWJBc3NlbWJseS5Nb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLncgPSB7fTtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9pbmRleC5qc1wiKTtcbiIsImltcG9ydCB7IFNFTkRfT1RQX1JFUVVFU1QsIFNFTkRfT1RQX1NVQ0NFU1MsIFNFTkRfT1RQX0ZBSUwsIFNVQk1JVF9PVFBfUkVRVUVTVCwgU1VCTUlUX09UUF9TVUNDRVNTLCBTVUJNSVRfT1RQX0ZBSUwgfSBmcm9tICcuLi8uLi9jb25zdGFudHMvdHlwZXMnO1xuaW1wb3J0IHsgQVBJX0dFVCwgQVBJX1BPU1QgfSBmcm9tICcuLi8uLi9hcGkvYXBpLmpzJztcbmltcG9ydCBTVE9SQUdFIGZyb20gJy4uLy4uL2hlbHBlcnMvc3RvcmFnZSdcblxuZXhwb3J0IGNvbnN0IHNlbmRPVFAgPSAobnVtYmVyLCBjYikgPT4gKGRpc3BhdGNoKSA9PiB7XG4gICAgZGlzcGF0Y2goe1xuICAgICAgICB0eXBlOiBTRU5EX09UUF9SRVFVRVNULFxuICAgICAgICBwYXlsb2FkOiB7XG4gICAgICAgICAgICBwaG9uZU51bWJlcjogbnVtYmVyXG4gICAgICAgIH1cbiAgICB9KVxuXG4gICAgQVBJX1BPU1QoJy9hcGkvdjEvdXNlci9vdHAvZ2VuZXJhdGUnLCB7XG4gICAgICAgIFwicGhvbmVfbnVtYmVyXCI6IG51bWJlclxuICAgIH0pLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgIGRpc3BhdGNoKHtcbiAgICAgICAgICAgIHR5cGU6IFNFTkRfT1RQX1NVQ0NFU1MsXG4gICAgICAgICAgICBwYXlsb2FkOiB7fVxuICAgICAgICB9KVxuICAgICAgICBpZiAoY2IpIGNiKHJlc3BvbnNlLmV4aXN0cyk7XG4gICAgfSkuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICAgIGxldCBtZXNzYWdlID0gXCJDYW5ub3QgZ2VuZXJhdGUgT1RQLlwiXG4gICAgICAgIGRpc3BhdGNoKHtcbiAgICAgICAgICAgIHR5cGU6IFNFTkRfT1RQX0ZBSUwsXG4gICAgICAgICAgICBwYXlsb2FkOiB7XG4gICAgICAgICAgICAgICAgZXJyb3JfbWVzc2FnZTogbWVzc2FnZVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH0pXG5cbn1cblxuZXhwb3J0IGNvbnN0IHN1Ym1pdE9UUCA9IChudW1iZXIsIG90cCwgY2IpID0+IChkaXNwYXRjaCkgPT4ge1xuICAgIGRpc3BhdGNoKHtcbiAgICAgICAgdHlwZTogU1VCTUlUX09UUF9SRVFVRVNULFxuICAgICAgICBwYXlsb2FkOiB7fVxuICAgIH0pXG5cbiAgICBBUElfUE9TVCgnL2FwaS92MS91c2VyL2RvY3Rvci9sb2dpbicsIHtcbiAgICAgICAgXCJwaG9uZV9udW1iZXJcIjogbnVtYmVyLFxuICAgICAgICBcIm90cFwiOiBvdHBcbiAgICB9KS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAvLyBzZXQgY29va2llIHRva2VuIGV4cGxpY2l0bHksIGNzcmYgdG9rZW4gaXMgc2V0IGJ5IGRlZmF1bHRcbiAgICAgICAgU1RPUkFHRS5zZXRBdXRoVG9rZW4ocmVzcG9uc2UudG9rZW4pXG5cbiAgICAgICAgZGlzcGF0Y2goe1xuICAgICAgICAgICAgdHlwZTogU1VCTUlUX09UUF9TVUNDRVNTLFxuICAgICAgICAgICAgcGF5bG9hZDogeyB0b2tlbjogcmVzcG9uc2UudG9rZW4gfVxuICAgICAgICB9KVxuICAgICAgICBpZiAoY2IpIGNiKCk7XG4gICAgfSkuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICAgIGRpc3BhdGNoKHtcbiAgICAgICAgICAgIHR5cGU6IFNVQk1JVF9PVFBfRkFJTCxcbiAgICAgICAgICAgIHBheWxvYWQ6IHtcbiAgICAgICAgICAgICAgICBlcnJvcl9tZXNzYWdlOiBcIkludmFsaWQgT1RQXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9KVxufVxuIiwiaW1wb3J0IHsgQVBQRU5EX1VTRVJfUFJPRklMRVMgfSBmcm9tICcuLi8uLi9jb25zdGFudHMvdHlwZXMnO1xuaW1wb3J0IHsgQVBJX0dFVCB9IGZyb20gJy4uLy4uL2FwaS9hcGkuanMnO1xuXG5cbmV4cG9ydCBjb25zdCBnZXRVc2VyUHJvZmlsZSA9ICgpID0+IChkaXNwYXRjaCkgPT4ge1xuXHRBUElfR0VUKCcvdXNlci5qc29uJykudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcblx0XHRcblx0XHRkaXNwYXRjaCh7XG5cdFx0XHR0eXBlOiBBUFBFTkRfVVNFUl9QUk9GSUxFUyxcblx0XHRcdHBheWxvYWQ6IHJlc3BvbnNlLnByb2ZpbGVzXG5cdFx0fSlcblxuXHR9KS5jYXRjaChmdW5jdGlvbiAoZXJyb3IpIHtcblxuXHR9KVxufVxuXG5leHBvcnQgY29uc3QgZ2V0VXNlclByb2ZpbGVXaXRoQXBwb2ludG1lbnRzID0gKCkgPT4gKGRpc3BhdGNoKSA9PiB7XG5cdEFQSV9HRVQoJy91c2VyX3Byb2ZpbGVfYXBwb2ludG1lbnRzLmpzb24nKS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuXHRcdFxuXHRcdGRpc3BhdGNoKHtcblx0XHRcdHR5cGU6IEFQUEVORF9VU0VSX1BST0ZJTEVTLFxuXHRcdFx0cGF5bG9hZDogcmVzcG9uc2UucHJvZmlsZXNcblx0XHR9KVxuXG5cdH0pLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xuXG5cdH0pXG59XG5cbmV4cG9ydCBjb25zdCBnZXRVc2VyUHJvZmlsZVdpdGhUZXN0cyA9ICgpID0+IChkaXNwYXRjaCkgPT4ge1xuXHRBUElfR0VUKCcvdXNlcl9wcm9maWxlX3Rlc3RzLmpzb24nKS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuXHRcdFxuXHRcdGRpc3BhdGNoKHtcblx0XHRcdHR5cGU6IEFQUEVORF9VU0VSX1BST0ZJTEVTLFxuXHRcdFx0cGF5bG9hZDogcmVzcG9uc2UucHJvZmlsZXNcblx0XHR9KVxuXG5cdH0pLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xuXG5cdH0pXG59XG5cbiIsImltcG9ydCB7IExBQl9TRUFSQ0hfU1RBUlQsIEFQUEVORF9MQUJTLCBMQUJfU0VBUkNILCBNRVJHRV9TRUFSQ0hfU1RBVEVfTEFCIH0gZnJvbSAnLi4vLi4vY29uc3RhbnRzL3R5cGVzJztcbmltcG9ydCB7IEFQSV9HRVQgfSBmcm9tICcuLi8uLi9hcGkvYXBpLmpzJztcblxuXG5leHBvcnQgY29uc3QgZ2V0TGFicyA9IChzZWFyY2hTdGF0ZSA9IHt9LCBmaWx0ZXJDcml0ZXJpYSA9IHt9LCBtZXJnZVN0YXRlID0gZmFsc2UpID0+IChkaXNwYXRjaCkgPT4ge1xuXG5cdGxldCB0ZXN0SWRzID0gc2VhcmNoU3RhdGUuc2VsZWN0ZWRDcml0ZXJpYXNcblx0XHQuZmlsdGVyKHggPT4geC50eXBlID09ICd0ZXN0Jylcblx0XHQucmVkdWNlKChmaW5hbFN0ciwgY3VyciwgaSkgPT4ge1xuXHRcdFx0aWYgKGkgIT0gMCkge1xuXHRcdFx0XHRmaW5hbFN0ciArPSAnLCdcblx0XHRcdH1cblx0XHRcdGZpbmFsU3RyICs9IGAke2N1cnIuaWR9YFxuXHRcdFx0cmV0dXJuIGZpbmFsU3RyXG5cdFx0fSwgXCJcIilcblxuXHRsZXQgbGF0ID0gMjguNDU5NVxuXHRsZXQgbG9uZyA9IDc3LjAyMjZcblx0aWYgKHNlYXJjaFN0YXRlLnNlbGVjdGVkTG9jYXRpb24pIHtcblx0XHRsYXQgPSBzZWFyY2hTdGF0ZS5zZWxlY3RlZExvY2F0aW9uLmdlb21ldHJ5LmxvY2F0aW9uLmxhdFxuXHRcdGxvbmcgPSBzZWFyY2hTdGF0ZS5zZWxlY3RlZExvY2F0aW9uLmdlb21ldHJ5LmxvY2F0aW9uLmxuZ1xuXHR9XG5cdGxldCBtaW5fZGlzdGFuY2UgPSBmaWx0ZXJDcml0ZXJpYS5kaXN0YW5jZVJhbmdlWzBdXG5cdGxldCBtYXhfZGlzdGFuY2UgPSBmaWx0ZXJDcml0ZXJpYS5kaXN0YW5jZVJhbmdlWzFdXG5cdGxldCBtaW5fcHJpY2UgPSBmaWx0ZXJDcml0ZXJpYS5wcmljZVJhbmdlWzBdXG5cdGxldCBtYXhfcHJpY2UgPSBmaWx0ZXJDcml0ZXJpYS5wcmljZVJhbmdlWzFdXG5cdGxldCBvcmRlcl9ieSA9IGZpbHRlckNyaXRlcmlhLnNvcnRCeVxuXG5cdGxldCB1cmwgPSBgL2FwaS92MS9kaWFnbm9zdGljL2xhYmxpc3Q/aWRzPSR7dGVzdElkc30mbG9uZz0ke2xhdH0mbGF0PSR7bG9uZ30mbWluX2Rpc3RhbmNlPSR7bWluX2Rpc3RhbmNlfSZtYXhfZGlzdGFuY2U9JHttYXhfZGlzdGFuY2V9Jm1pbl9wcmljZT0ke21pbl9wcmljZX0mbWF4X3ByaWNlPSR7bWF4X3ByaWNlfSZvcmRlcl9ieT0ke29yZGVyX2J5fWBcblxuXHRkaXNwYXRjaCh7XG5cdFx0dHlwZTogTEFCX1NFQVJDSF9TVEFSVCxcblx0XHRwYXlsb2FkOiBudWxsXG5cdH0pXG5cblx0cmV0dXJuIEFQSV9HRVQodXJsKS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuXG5cdFx0ZGlzcGF0Y2goe1xuXHRcdFx0dHlwZTogQVBQRU5EX0xBQlMsXG5cdFx0XHRwYXlsb2FkOiByZXNwb25zZVxuXHRcdH0pXG5cblx0XHRkaXNwYXRjaCh7XG5cdFx0XHR0eXBlOiBMQUJfU0VBUkNILFxuXHRcdFx0cGF5bG9hZDogcmVzcG9uc2Vcblx0XHR9KVxuXG5cdFx0aWYgKG1lcmdlU3RhdGUpIHtcblx0XHRcdGRpc3BhdGNoKHtcblx0XHRcdFx0dHlwZTogTUVSR0VfU0VBUkNIX1NUQVRFX0xBQixcblx0XHRcdFx0cGF5bG9hZDoge1xuXHRcdFx0XHRcdHNlYXJjaFN0YXRlLFxuXHRcdFx0XHRcdGZpbHRlckNyaXRlcmlhXG5cdFx0XHRcdH1cblx0XHRcdH0pXG5cdFx0fVxuXG5cdH0pLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xuXG5cdH0pXG59XG5cbmV4cG9ydCBjb25zdCBnZXRMYWJCeUlkID0gKGxhYklkKSA9PiAoZGlzcGF0Y2gpID0+IHtcblx0bGV0IHVybCA9IGAvYXBpL3YxL2RpYWdub3N0aWMvbGFibGlzdC8ke2xhYklkfWBcblxuXHRyZXR1cm4gQVBJX0dFVCh1cmwpLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG5cblx0XHRkaXNwYXRjaCh7XG5cdFx0XHR0eXBlOiBBUFBFTkRfTEFCUyxcblx0XHRcdHBheWxvYWQ6IFtyZXNwb25zZV1cblx0XHR9KVxuXG5cdH0pLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xuXG5cdH0pXG59XG5cbmV4cG9ydCBjb25zdCBnZXRMYWJUaW1lU2xvdHMgPSAobGFiSWQsIHRlc3RJZHMsIGNhbGxiYWNrKSA9PiAoZGlzcGF0Y2gpID0+IHtcblx0QVBJX0dFVCgnL2F2YWlsYWJpbGl0eV9sYWJzLmpzb24nKS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuXG5cdFx0Y2FsbGJhY2socmVzcG9uc2UpXG5cblx0fSkuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSB7XG5cblx0fSlcbn1cblxuZXhwb3J0IGNvbnN0IGdldExhYkJvb2tpbmdTdW1tYXJ5ID0gKGJvb2tpbmdJZCwgY2FsbGJhY2spID0+IChkaXNwYXRjaCkgPT4ge1xuXHRBUElfR0VUKCcvbGFiX2Jvb2tpbmdfc3VtbWFyLmpzb24nKS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuXG5cdFx0Y2FsbGJhY2socmVzcG9uc2UpXG5cblx0fSkuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSB7XG5cblx0fSlcbn1cbiIsImltcG9ydCB7IEFQUEVORF9GSUxURVJTX0RJQUdOT1NJUywgVE9HR0xFX0NPTkRJVElPTlMsIFRPR0dMRV9TUEVDSUFMSVRJRVMsIFNFTEVDVF9MT0NBVElPTiwgTUVSR0VfU0VBUkNIX1NUQVRFLCBUT0dHTEVfQ1JJVEVSSUEsIFRPR0dMRV9URVNUUywgVE9HR0xFX0RJQUdOT1NJU19DUklURVJJQSwgTE9BRF9TRUFSQ0hfQ1JJVEVSSUFfTEFCIH0gZnJvbSAnLi4vLi4vY29uc3RhbnRzL3R5cGVzJztcbmltcG9ydCB7IEFQSV9HRVQgfSBmcm9tICcuLi8uLi9hcGkvYXBpLmpzJztcblxuZXhwb3J0IGNvbnN0IGxvYWRMYWJDb21tb25Dcml0ZXJpYXMgPSAoKSA9PiAoZGlzcGF0Y2gpID0+IHtcblxuICAgIHJldHVybiBBUElfR0VUKCcvYXBpL3YxL2RpYWdub3N0aWMvbGFic2VhcmNoJykudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgZGlzcGF0Y2goe1xuICAgICAgICAgICAgdHlwZTogTE9BRF9TRUFSQ0hfQ1JJVEVSSUFfTEFCLFxuICAgICAgICAgICAgcGF5bG9hZDogcmVzcG9uc2VcbiAgICAgICAgfSlcbiAgICB9KS5jYXRjaChmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgICAgZGlzcGF0Y2goe1xuICAgICAgICAgICAgdHlwZTogTE9BRF9TRUFSQ0hfQ1JJVEVSSUFfTEFCLFxuICAgICAgICAgICAgcGF5bG9hZDogbnVsbFxuICAgICAgICB9KVxuICAgIH0pXG5cbn1cblxuZXhwb3J0IGNvbnN0IHRvZ2dsZURpYWdub3Npc0NyaXRlcmlhID0gKHR5cGUsIGNyaXRlcmlhKSA9PiAoZGlzcGF0Y2gpID0+IHtcbiAgICBkaXNwYXRjaCh7XG4gICAgICAgIHR5cGU6IFRPR0dMRV9ESUFHTk9TSVNfQ1JJVEVSSUEsXG4gICAgICAgIHBheWxvYWQ6IHtcbiAgICAgICAgICAgIHR5cGUsIGNyaXRlcmlhXG4gICAgICAgIH1cbiAgICB9KVxuXG59XG5cbmV4cG9ydCBjb25zdCBnZXREaWFnbm9zaXNDcml0ZXJpYVJlc3VsdHMgPSAoc2VhcmNoU3RyaW5nLCBjYWxsYmFjaykgPT4gKGRpc3BhdGNoKSA9PiB7XG4gICAgQVBJX0dFVChgL2FwaS92MS9kaWFnbm9zdGljL3Rlc3Q/bmFtZT0ke3NlYXJjaFN0cmluZ31gKS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICBjYWxsYmFjayhyZXNwb25zZSlcbiAgICB9KS5jYXRjaChmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgICAgY2FsbGJhY2sobnVsbClcbiAgICB9KVxufVxuXG5cbiIsImltcG9ydCAqIGFzIFNFQVJDSF9DUklURVJJQV9PUEQgZnJvbSAnLi9vcGQvc2VhcmNoQ3JpdGVyaWEuanMnXG5pbXBvcnQgKiBhcyBTRUFSQ0hfQ1JJVEVSSUFfTEFCUyBmcm9tICcuL2RpYWdub3Npcy9zZWFyY2hDcml0ZXJpYS5qcydcbmltcG9ydCAqIGFzIERPQ1RPUlNfQUNUSU9OUyBmcm9tICcuL29wZC9kb2N0b3JTZWFyY2guanMnXG5pbXBvcnQgKiBhcyBMQUJTX0FDVElPTlMgZnJvbSAnLi9kaWFnbm9zaXMvbGFiU2VhcmNoLmpzJ1xuaW1wb3J0ICogYXMgVVNFUl9BQ1RJT05TIGZyb20gJy4vY29tbW9ucy91c2VyLmpzJ1xuaW1wb3J0ICogYXMgQVVUSF9BQ1RJT05TIGZyb20gJy4vY29tbW9ucy9hdXRoLmpzJ1xuXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5hc3NpZ24oe30sXG4gICAgU0VBUkNIX0NSSVRFUklBX09QRCxcbiAgICBTRUFSQ0hfQ1JJVEVSSUFfTEFCUyxcbiAgICBET0NUT1JTX0FDVElPTlMsXG4gICAgTEFCU19BQ1RJT05TLFxuICAgIFVTRVJfQUNUSU9OUyxcbiAgICBBVVRIX0FDVElPTlNcbikiLCJpbXBvcnQgeyBET0NUT1JfU0VBUkNIX1NUQVJULCBBUFBFTkRfRE9DVE9SUywgRE9DVE9SX1NFQVJDSCwgTUVSR0VfU0VBUkNIX1NUQVRFX09QRCB9IGZyb20gJy4uLy4uL2NvbnN0YW50cy90eXBlcyc7XG5pbXBvcnQgeyBBUElfR0VUIH0gZnJvbSAnLi4vLi4vYXBpL2FwaS5qcyc7XG5cblxuZXhwb3J0IGNvbnN0IGdldERvY3RvcnMgPSAoc2VhcmNoU3RhdGUgPSB7fSwgZmlsdGVyQ3JpdGVyaWEgPSB7fSwgbWVyZ2VTdGF0ZSA9IGZhbHNlKSA9PiAoZGlzcGF0Y2gpID0+IHtcblx0Ly8gbGV0IHRlc3RJZHMgPSBzZWFyY2hTdGF0ZS5zZWxlY3RlZENyaXRlcmlhc1xuXHQvLyBcdC5maWx0ZXIoeCA9PiB4LnR5cGUgPT0gJ3Rlc3QnKVxuXHQvLyBcdC5yZWR1Y2UoKGZpbmFsU3RyLCBjdXJyLCBpKSA9PiB7XG5cdC8vIFx0XHRpZiAoaSAhPSAwKSB7XG5cdC8vIFx0XHRcdGZpbmFsU3RyICs9ICcsJ1xuXHQvLyBcdFx0fVxuXHQvLyBcdFx0ZmluYWxTdHIgKz0gYCR7Y3Vyci5pZH1gXG5cdC8vIFx0XHRyZXR1cm4gZmluYWxTdHJcblx0Ly8gXHR9LCBcIlwiKVxuXG5cdC8vIGxldCBsYXQgPSAyOC40NTk1XG5cdC8vIGxldCBsb25nID0gNzcuMDIyNlxuXHQvLyBpZiAoc2VhcmNoU3RhdGUuc2VsZWN0ZWRMb2NhdGlvbikge1xuXHQvLyBcdGxhdCA9IHNlYXJjaFN0YXRlLnNlbGVjdGVkTG9jYXRpb24uZ2VvbWV0cnkubG9jYXRpb24ubGF0XG5cdC8vIFx0bG9uZyA9IHNlYXJjaFN0YXRlLnNlbGVjdGVkTG9jYXRpb24uZ2VvbWV0cnkubG9jYXRpb24ubG5nXG5cdC8vIH1cblx0Ly8gbGV0IG1pbl9kaXN0YW5jZSA9IGZpbHRlckNyaXRlcmlhLmRpc3RhbmNlUmFuZ2VbMF1cblx0Ly8gbGV0IG1heF9kaXN0YW5jZSA9IGZpbHRlckNyaXRlcmlhLmRpc3RhbmNlUmFuZ2VbMV1cblx0Ly8gbGV0IG1pbl9wcmljZSA9IGZpbHRlckNyaXRlcmlhLnByaWNlUmFuZ2VbMF1cblx0Ly8gbGV0IG1heF9wcmljZSA9IGZpbHRlckNyaXRlcmlhLnByaWNlUmFuZ2VbMV1cblx0Ly8gbGV0IG9yZGVyX2J5ID0gZmlsdGVyQ3JpdGVyaWEuc29ydEJ5XG5cblx0Ly8gbGV0IHVybCA9IGAvYXBpL3YxL2RpYWdub3N0aWMvbGFibGlzdD9pZHM9JHt0ZXN0SWRzfSZsb25nPSR7bGF0fSZsYXQ9JHtsb25nfSZtaW5fZGlzdGFuY2U9JHttaW5fZGlzdGFuY2V9Jm1heF9kaXN0YW5jZT0ke21heF9kaXN0YW5jZX0mbWluX3ByaWNlPSR7bWluX3ByaWNlfSZtYXhfcHJpY2U9JHttYXhfcHJpY2V9Jm9yZGVyX2J5PSR7b3JkZXJfYnl9YFxuXG5cdGxldCB1cmwgPSBgL2FwaS92MS9kb2N0b3IvZG9jdG9yc2VhcmNoYFxuXG5cdGRpc3BhdGNoKHtcblx0XHR0eXBlOiBET0NUT1JfU0VBUkNIX1NUQVJULFxuXHRcdHBheWxvYWQ6IG51bGxcblx0fSlcblxuXHRyZXR1cm4gQVBJX0dFVCh1cmwpLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG5cblx0XHRkaXNwYXRjaCh7XG5cdFx0XHR0eXBlOiBBUFBFTkRfRE9DVE9SUyxcblx0XHRcdHBheWxvYWQ6IHJlc3BvbnNlXG5cdFx0fSlcblxuXHRcdGRpc3BhdGNoKHtcblx0XHRcdHR5cGU6IERPQ1RPUl9TRUFSQ0gsXG5cdFx0XHRwYXlsb2FkOiByZXNwb25zZVxuXHRcdH0pXG5cblx0XHRpZiAobWVyZ2VTdGF0ZSkge1xuXHRcdFx0ZGlzcGF0Y2goe1xuXHRcdFx0XHR0eXBlOiBNRVJHRV9TRUFSQ0hfU1RBVEVfT1BELFxuXHRcdFx0XHRwYXlsb2FkOiB7XG5cdFx0XHRcdFx0c2VhcmNoU3RhdGUsXG5cdFx0XHRcdFx0ZmlsdGVyQ3JpdGVyaWFcblx0XHRcdFx0fVxuXHRcdFx0fSlcblx0XHR9XG5cblx0fSkuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSB7XG5cblx0fSlcbn1cblxuZXhwb3J0IGNvbnN0IGdldERvY3RvckJ5SWQgPSAoZG9jdG9ySWQpID0+IChkaXNwYXRjaCkgPT4ge1xuXG5cdHJldHVybiBBUElfR0VUKGAvYXBpL3YxL2RvY3Rvci9wcm9maWxldXNlcnZpZXcvJHtkb2N0b3JJZH1gKS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuXG5cdFx0ZGlzcGF0Y2goe1xuXHRcdFx0dHlwZTogQVBQRU5EX0RPQ1RPUlMsXG5cdFx0XHRwYXlsb2FkOiBbcmVzcG9uc2VdXG5cdFx0fSlcblxuXHR9KS5jYXRjaChmdW5jdGlvbiAoZXJyb3IpIHtcblxuXHR9KVxufVxuXG5leHBvcnQgY29uc3QgZ2V0VGltZVNsb3RzID0gKGRvY3RvcklkLCBjbGluaWNJZCwgY2FsbGJhY2spID0+IChkaXNwYXRjaCkgPT4ge1xuXHRyZXR1cm4gQVBJX0dFVChgL2FwaS92MS9kb2N0b3IvZG9jdG9ydGltaW5nP2RvY3Rvcl9pZD0ke2RvY3RvcklkfSZob3NwaXRhbF9pZD0ke2NsaW5pY0lkfWApLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG5cdFx0Y2FsbGJhY2socmVzcG9uc2UpXG5cdH0pLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xuXG5cdH0pXG59XG4iLCJpbXBvcnQgeyBTRUxFQ1RfTE9DQVRJT05fT1BELCBNRVJHRV9TRUFSQ0hfU1RBVEVfT1BELCBUT0dHTEVfT1BEX0NSSVRFUklBLCBMT0FEX1NFQVJDSF9DUklURVJJQV9PUEQsIFNFTEVDVF9MT0NBVElPTl9ESUFHTk9TSVMgfSBmcm9tICcuLi8uLi9jb25zdGFudHMvdHlwZXMnO1xuaW1wb3J0IHsgQVBJX0dFVCB9IGZyb20gJy4uLy4uL2FwaS9hcGkuanMnO1xuXG5cbmV4cG9ydCBjb25zdCBsb2FkT1BEQ29tbW9uQ3JpdGVyaWEgPSAoKSA9PiAoZGlzcGF0Y2gpID0+IHtcblxuICAgIHJldHVybiBBUElfR0VUKCcvYXBpL3YxL2RvY3Rvci9zZWFyY2hlZGl0ZW1zJykudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgZGlzcGF0Y2goe1xuICAgICAgICAgICAgdHlwZTogTE9BRF9TRUFSQ0hfQ1JJVEVSSUFfT1BELFxuICAgICAgICAgICAgcGF5bG9hZDogcmVzcG9uc2VcbiAgICAgICAgfSlcbiAgICB9KS5jYXRjaChmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgICAgZGlzcGF0Y2goe1xuICAgICAgICAgICAgdHlwZTogTE9BRF9TRUFSQ0hfQ1JJVEVSSUFfT1BELFxuICAgICAgICAgICAgcGF5bG9hZDogbnVsbFxuICAgICAgICB9KVxuICAgIH0pXG5cbn1cblxuZXhwb3J0IGNvbnN0IHRvZ2dsZU9QRENyaXRlcmlhID0gKHR5cGUsIGNyaXRlcmlhKSA9PiAoZGlzcGF0Y2gpID0+IHtcbiAgICBkaXNwYXRjaCh7XG4gICAgICAgIHR5cGU6IFRPR0dMRV9PUERfQ1JJVEVSSUEsXG4gICAgICAgIHBheWxvYWQ6IHtcbiAgICAgICAgICAgIHR5cGUsIGNyaXRlcmlhXG4gICAgICAgIH1cbiAgICB9KVxuXG59XG5cbmV4cG9ydCBjb25zdCBzZWxlY3RMb2NhdGlvbiA9IChsb2NhdGlvbikgPT4gKGRpc3BhdGNoKSA9PiB7XG4gICAgZGlzcGF0Y2goe1xuICAgICAgICB0eXBlOiBTRUxFQ1RfTE9DQVRJT05fT1BELFxuICAgICAgICBwYXlsb2FkOiBsb2NhdGlvblxuICAgIH0pXG5cbiAgICBkaXNwYXRjaCh7XG4gICAgICAgIHR5cGU6IFNFTEVDVF9MT0NBVElPTl9ESUFHTk9TSVMsXG4gICAgICAgIHBheWxvYWQ6IGxvY2F0aW9uXG4gICAgfSlcblxufVxuXG5leHBvcnQgY29uc3QgZ2V0T1BEQ3JpdGVyaWFSZXN1bHRzID0gKHNlYXJjaFN0cmluZywgY2FsbGJhY2spID0+IChkaXNwYXRjaCkgPT4ge1xuICAgIFxuICAgIEFQSV9HRVQoYC9hcGkvdjEvZGlhZ25vc3RpYy90ZXN0P25hbWU9JHtzZWFyY2hTdHJpbmd9YCkudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgY2FsbGJhY2socmVzcG9uc2UpXG4gICAgfSkuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICAgIGNhbGxiYWNrKG51bGwpXG4gICAgfSlcbn1cbiIsImltcG9ydCBBeGlvcyBmcm9tICdheGlvcydcbmltcG9ydCBTVE9SQUdFIGZyb20gJy4uL2hlbHBlcnMvc3RvcmFnZSdcbmltcG9ydCBOQVZJR0FURSBmcm9tICcuLi9oZWxwZXJzL25hdmlnYXRlJ1xuXG5sZXQgYXhpb3NJbnN0YW5jZSA9IEF4aW9zLmNyZWF0ZSh7XG4gICAgYmFzZVVSTDogJ2h0dHBzOi8vcWEucGFuYWNlYXRlY2huby5jb20nLFxuICAgIGhlYWRlcjoge31cbn0pO1xuXG5mdW5jdGlvbiByZWplY3RIYW5kbGVyKHJlc3BvbnNlLCBjYWxsYmFjaykge1xuICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKVxuICAgIC8vIGlmIChyZXNwb25zZSAmJiByZXNwb25zZS5yZXNwb25zZSAmJiByZXNwb25zZS5yZXNwb25zZS5zdGF0dXMgPT0gNDAxKSB7XG4gICAgLy8gICAgIFNUT1JBR0UuZGVsZXRlQXV0aCgpLnRoZW4oKCkgPT4ge1xuICAgIC8vICAgICAgICAgLy8gc2VuZCB0byBsb2dpbiBwYWdlXG4gICAgLy8gICAgICAgICBOQVZJR0FURS5uYXZpZ2F0ZVRvKCcvJylcbiAgICAvLyAgICAgfSlcbiAgICAvLyB9XG5cbiAgICBjYWxsYmFjayhyZXNwb25zZSlcbn1cblxuZXhwb3J0IGNvbnN0IEFQSV9HRVQgPSAodXJsKSA9PiB7XG4gICAgcmV0dXJuIFNUT1JBR0UuZ2V0QXV0aFRva2VuKCkudGhlbigodG9rZW4pID0+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGF4aW9zSW5zdGFuY2Uoe1xuICAgICAgICAgICAgICAgIG1ldGhvZDogJ2dldCcsXG4gICAgICAgICAgICAgICAgdXJsOiB1cmwsXG4gICAgICAgICAgICAgICAgLy8gaGVhZGVyczogeyAnQXV0aG9yaXphdGlvbic6IGBUb2tlbiAke3Rva2VufWAgfVxuICAgICAgICAgICAgfSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShyZXMuZGF0YSlcbiAgICAgICAgICAgIH0sIChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgIHJlamVjdEhhbmRsZXIocmVzcG9uc2UsIHJlamVjdClcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgfSlcblxuXG59XG5leHBvcnQgY29uc3QgQVBJX1BPU1QgPSAodXJsLCBkYXRhKSA9PiB7XG4gICAgcmV0dXJuIFNUT1JBR0UuZ2V0QXV0aFRva2VuKCkudGhlbigodG9rZW4pID0+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGF4aW9zSW5zdGFuY2Uoe1xuICAgICAgICAgICAgICAgIG1ldGhvZDogJ3Bvc3QnLFxuICAgICAgICAgICAgICAgIHVybDogdXJsLFxuICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICAgICAgaGVhZGVyczogeyAnQXV0aG9yaXphdGlvbic6IGBUb2tlbiAke3Rva2VufWAgfVxuICAgICAgICAgICAgfSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShyZXMuZGF0YSlcbiAgICAgICAgICAgIH0sIChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgIHJlamVjdEhhbmRsZXIocmVzcG9uc2UsIHJlamVjdClcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgfSlcblxuXG59XG5cbmV4cG9ydCBjb25zdCBBUElfUFVUID0gKHVybCwgZGF0YSkgPT4ge1xuICAgIHJldHVybiBTVE9SQUdFLmdldEF1dGhUb2tlbigpLnRoZW4oKHRva2VuKSA9PiB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBheGlvc0luc3RhbmNlKHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdwdXQnLFxuICAgICAgICAgICAgICAgIHVybDogdXJsLFxuICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICAgICAgaGVhZGVyczogeyAnQXV0aG9yaXphdGlvbic6IGBUb2tlbiAke3Rva2VufWAgfVxuICAgICAgICAgICAgfSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShyZXMuZGF0YSlcbiAgICAgICAgICAgIH0sIChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgIHJlamVjdEhhbmRsZXIocmVzcG9uc2UsIHJlamVjdClcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgfSlcblxuXG59XG5cbmV4cG9ydCBjb25zdCBBUElfREVMRVRFID0gKHVybCkgPT4ge1xuICAgIHJldHVybiBTVE9SQUdFLmdldEF1dGhUb2tlbigpLnRoZW4oKHRva2VuKSA9PiB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBheGlvc0luc3RhbmNlKHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdkZWxldGUnLFxuICAgICAgICAgICAgICAgIHVybDogdXJsLFxuICAgICAgICAgICAgICAgIGhlYWRlcnM6IHsgJ0F1dGhvcml6YXRpb24nOiBgVG9rZW4gJHt0b2tlbn1gIH1cbiAgICAgICAgICAgIH0pLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICAgICAgICAgIHJlc29sdmUocmVzLmRhdGEpXG4gICAgICAgICAgICB9LCAocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICByZWplY3RIYW5kbGVyKHJlc3BvbnNlLCByZWplY3QpXG4gICAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgIH0pXG5cbn0iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgeyBDaXJjdWxhclByb2dyZXNzIH0gZnJvbSAnbWF0ZXJpYWwtdWkvUHJvZ3Jlc3MnO1xuXG5jbGFzcyBMb2FkZXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsb2FkZXJDaXJjdWxhclwiPlxuICAgICAgICAgICAgICAgIDxDaXJjdWxhclByb2dyZXNzIGNsYXNzTmFtZT17XCJsb2FkZXJhY3R1YWxcIn0gc2l6ZT17NTB9IHRoaWNrbmVzcz17M30gLz5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICk7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBMb2FkZXJcbiIsImltcG9ydCBMb2FkZXIgZnJvbSAnLi9Mb2FkZXInXG5cbmV4cG9ydCBkZWZhdWx0IExvYWRlciIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmNsYXNzIFVzZXJMb2dpblZpZXcgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgcGhvbmVOdW1iZXI6ICcnLFxuICAgICAgICAgICAgdmFsaWRhdGlvbkVycm9yOiAnJ1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaW5wdXRIYW5kbGVyKGUpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IFtlLnRhcmdldC5uYW1lXTogZS50YXJnZXQudmFsdWUgfSlcbiAgICB9XG5cbiAgICBzdWJtaXRPVFBSZXF1ZXN0KG51bWJlcikge1xuXG4gICAgICAgIGlmIChudW1iZXIubWF0Y2goL15bNzg5XXsxfVswLTldezl9JC8pKSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgdmFsaWRhdGlvbkVycm9yOiBcIlwiIH0pXG4gICAgICAgICAgICB0aGlzLnByb3BzLnNlbmRPVFAobnVtYmVyLCAoZXhpc3RzKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5oaXN0b3J5LnJlcGxhY2UoJy9vdHAvdmVyaWZ5P2V4aXN0cz0keyEhZXhpc3RzfScpXG4gICAgICAgICAgICB9KVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHZhbGlkYXRpb25FcnJvcjogXCJQbGVhc2UgcHJvdmlkZSBhIHZhbGlkIG51bWJlciAoMTAgZGlnaXRzKVwiIH0pXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgPGhlYWRlciBjbGFzc05hbWU9XCJza2luLXdoaXRlIGZpeGVkIGhvcml6b250YWwgdG9wIGJkci0xIGJvdHRvbSBsaWdodFwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lci1mbHVpZFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC0yXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx1bCBjbGFzc05hbWU9XCJpbmxpbmUtbGlzdFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpPjxzcGFuIGNsYXNzTmFtZT1cImljb24gaWNvbi1zbSB0ZXh0LW1pZGRsZSBiYWNrLWljb24td2hpdGVcIj48aW1nIHNyYz1cIi9hc3NldHMvaW1nL2N1c3RvbWVyLWljb25zL2JhY2staWNvbi5wbmdcIiBjbGFzc05hbWU9XCJpbWctZmx1aWRcIiAvPjwvc3Bhbj48L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLThcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJoZWFkZXItdGl0bGUgZnctNzAwIGNhcGl0YWxpemUgdGV4dC1jZW50ZXJcIj5SZWdpc3RyYXRpb24vTG9naW48L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC0yXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9oZWFkZXI+XG4gICAgICAgICAgICAgICAgPHNlY3Rpb24gY2xhc3NOYW1lPVwid3JhcCBtb2JpbGUtdmVyaWZpY2F0aW9uLXNjcmVlblwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIndpZGdldCBuby1zaGFkb3cgbm8tcm91bmRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwid2lkZ2V0LWhlYWRlciB0ZXh0LWNlbnRlciBtdi1oZWFkZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDQgY2xhc3NOYW1lPVwiZnctNzAwIHRleHQtbWRcIj5FbnRlciB5b3VyIE1vYmlsZSBOdW1iZXIgPGJyIC8+IHRvIGNvbnRpbnVlPC9oND5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3aWRnZXQtY29udGVudCB0ZXh0LWNlbnRlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9iaWxlLXZlcmlmaWNhdGlvblwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInZlcmlmaS1tb2ItaW9jbiB0ZXh0LWNlbnRlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGltZyBzcmM9XCIvYXNzZXRzL2ltZy9jdXN0b21lci1pY29ucy9tb2Iuc3ZnXCIgY2xhc3NOYW1lPVwiaW1nLWZsdWlkXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwIG1vYmlsZS1maWVsZFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkb24tZ3JvdXAgZW50ZXItbW9iaWxlLW51bWJlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgY2xhc3NOYW1lPVwiZmMtaW5wdXQgdGV4dC1jZW50ZXJcIiBwbGFjZWhvbGRlcj1cIjIzNFhYWFhYWFwiIHZhbHVlPXt0aGlzLnN0YXRlLnBob25lTnVtYmVyfSBvbkNoYW5nZT17dGhpcy5pbnB1dEhhbmRsZXIuYmluZCh0aGlzKX0gbmFtZT1cInBob25lTnVtYmVyXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImVycm9yTWVzc2FnZVwiPnt0aGlzLnByb3BzLmVycm9yX21lc3NhZ2V9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZXJyb3JNZXNzYWdlXCI+e3RoaXMuc3RhdGUudmFsaWRhdGlvbkVycm9yfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9zZWN0aW9uPlxuICAgICAgICAgICAgICAgIDxidXR0b24gb25DbGljaz17dGhpcy5zdWJtaXRPVFBSZXF1ZXN0LmJpbmQodGhpcyx0aGlzLnN0YXRlLnBob25lTnVtYmVyKX0gZGlzYWJsZWQ9e3RoaXMucHJvcHMub3RwX3JlcXVlc3Rfc2VudH0gY2xhc3NOYW1lPVwidi1idG4gdi1idG4tcHJpbWFyeSBidG4tbGcgZml4ZWQgaG9yaXpvbnRhbCBib3R0b20gbm8tcm91bmQgYnRuLWxnIHRleHQtbGdcIj5Db250aW51ZTwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IFVzZXJMb2dpblZpZXdcbiIsImltcG9ydCBVc2VyTG9naW5WaWV3IGZyb20gJy4vVXNlckxvZ2luJ1xuXG5leHBvcnQgZGVmYXVsdCBVc2VyTG9naW5WaWV3IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuY29uc3QgSWZyYW1TdHlsZSA9IHtcbiAgICB3aWR0aDogJzEwMCUnLFxuICAgIGhlaWdodDogJ2NhbGMoMTAwdmggLSA2MHB4KSdcbn1cblxuXG5jbGFzcyBDaGF0VmlldyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG5cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN0YXRpYyBjb250ZXh0VHlwZXMgPSB7XG4gICAgICAgIHJvdXRlcjogKCkgPT4gbnVsbFxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsb2NhdGlvblNlbGVjdG9yXCI+XG4gICAgICAgICAgICAgICAgPGlmcmFtZSBzcmM9XCJodHRwOi8vY2hhdGJvdC5wb2xpY3liYXphYXIuY29tL2xpdmVjaGF0XCIgc3R5bGU9e0lmcmFtU3R5bGV9PjwvaWZyYW1lPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IENoYXRWaWV3XG4iLCJpbXBvcnQgQ2hhdFZpZXcgZnJvbSAnLi9DaGF0Vmlldy5qcydcblxuZXhwb3J0IGRlZmF1bHQgQ2hhdFZpZXciLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgQ2hpcCBmcm9tICdtYXRlcmlhbC11aS9DaGlwJztcblxuXG5jbGFzcyBDb21tb25seVNlYXJjaGVkIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcblxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIGxldCByb3dzID0gdGhpcy5wcm9wcy5kYXRhLm1hcCgocm93LGkpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByb3BzLnR5cGUgPT0gJ2xhYicpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gPGxpIGtleT17aX0+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJjdC1pbWcgbGFiLWltZ1wiXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbWcgc3JjPVwiL2Fzc2V0cy9pbWcvY3VzdG9tZXItaWNvbnMvbGFiMS5wbmdcIiBjbGFzc05hbWU9XCJpbWctZmx1aWRcIiAvPlxuICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cImxhYi1uYW1lXCI+U0xSIERpZ25vc3RpY3M8L3A+XG4gICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbGV0IHNlbGVjdGVkID0gZmFsc2VcbiAgICAgICAgICAgICAgICB0aGlzLnByb3BzLnNlbGVjdGVkLm1hcCgoY3VycikgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZihjdXJyLmlkID09IHJvdy5pZCl7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZCA9IHRydWVcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgcmV0dXJuIDxsaSBrZXk9e2l9PlxuICAgICAgICAgICAgICAgICAgICA8YVxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtzZWxlY3RlZCA/IFwidi1idG4gdi1idG4tcHJpbWFyeSB0YWctc20gb3V0bGluZSBzZWxlY3RlZFwiIDogXCJ2LWJ0biB2LWJ0bi1wcmltYXJ5IHRhZy1zbSBvdXRsaW5lXCJ9XG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMudG9nZ2xlKCh0aGlzLnByb3BzLnR5cGUgfHwgcm93LnR5cGUpLCByb3cpXG4gICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICB7cm93Lm5hbWV9XG4gICAgICAgICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0pXG5cbiAgICAgICAgbGV0IGRpdkNsYXNzID0gYHBhbmVsLWNvbnRlbnRgXG4gICAgICAgIGxldCB1bENsYXNzID0gYGlubGluZS1saXN0YFxuXG4gICAgICAgIGlmICh0aGlzLnByb3BzLnR5cGUgPT0gJ2xhYicpIHtcbiAgICAgICAgICAgIGRpdkNsYXNzID0gYHBhbmVsLWNvbnRlbnQgdG90YWwtbGFic2BcbiAgICAgICAgICAgIHVsQ2xhc3MgPSBgaW5saW5lLWxpc3QgbGFiLWl0ZW1zYFxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3aWRnZXQtcGFuZWxcIj5cbiAgICAgICAgICAgICAgICA8aDQgY2xhc3NOYW1lPVwicGFuZWwtdGl0bGVcIj57dGhpcy5wcm9wcy5oZWFkaW5nfTwvaDQ+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2RpdkNsYXNzfT5cbiAgICAgICAgICAgICAgICAgICAgPHVsIGNsYXNzTmFtZT17dWxDbGFzc30+XG4gICAgICAgICAgICAgICAgICAgICAgICB7cm93c31cbiAgICAgICAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBDb21tb25seVNlYXJjaGVkXG4iLCJpbXBvcnQgQ29tbW9ubHlTZWFyY2hlZCBmcm9tICcuL0NvbW1vbmx5U2VhcmNoZWQuanMnXG5cblxuZXhwb3J0IGRlZmF1bHQgQ29tbW9ubHlTZWFyY2hlZCIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBsaWdodEJhc2VUaGVtZSB9IGZyb20gJ21hdGVyaWFsLXVpL3N0eWxlcyc7XG5pbXBvcnQgTG9hZGVyIGZyb20gJy4uLy4uL2NvbW1vbnMvTG9hZGVyJ1xuXG5jb25zdCBkZWJvdW5jZXIgPSAoZm4sIGRlbGF5KSA9PiB7XG4gICAgbGV0IHRpbWVyID0gbnVsbFxuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aW1lcilcbiAgICAgICAgdGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIGZuLmNhbGwodGhpcylcbiAgICAgICAgfSwgZGVsYXkpXG4gICAgfVxufVxuXG5cbmNsYXNzIENyaXRlcmlhU2VhcmNoVmlldyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgICBzZWFyY2hWYWx1ZTogJycsXG4gICAgICAgICAgICBzZWFyY2hSZXN1bHRzOiBbXVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIHRoaXMuZ2V0U2VhcmNoUmVzdWx0cyA9IGRlYm91bmNlcih0aGlzLmdldFNlYXJjaFJlc3VsdHMuYmluZCh0aGlzKSwgMTAwMClcbiAgICAgICAgbGV0IGlucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RvcENyaXRlcmlhU2VhcmNoJylcbiAgICAgICAgLy8gaW5wdXQuZm9jdXMoKVxuICAgIH1cblxuICAgIGlucHV0SGFuZGxlcihlKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBzZWFyY2hWYWx1ZTogZS50YXJnZXQudmFsdWUgfSlcbiAgICAgICAgdGhpcy5nZXRTZWFyY2hSZXN1bHRzKClcbiAgICB9XG5cbiAgICBnZXRTZWFyY2hSZXN1bHRzKCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy50eXBlID09ICdvcGQnKSB7XG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMuZ2V0RGlhZ25vc2lzQ3JpdGVyaWFSZXN1bHRzKHRoaXMuc3RhdGUuc2VhcmNoVmFsdWUsIChzZWFyY2hSZXN1bHRzKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHNlYXJjaFJlc3VsdHMpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRlc3RzID0gc2VhcmNoUmVzdWx0cy50ZXN0cy5tYXAoeCA9PiB7IHJldHVybiB7IC4uLngsIHR5cGU6ICd0ZXN0JyB9IH0pXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBzZWFyY2hSZXN1bHRzOiBbLi4udGVzdHNdIH0pXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFkZENyaXRlcmlhKGNyaXRlcmlhKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLnR5cGUgPT0gJ29wZCcpIHtcblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy50b2dnbGVEaWFnbm9zaXNDcml0ZXJpYShjcml0ZXJpYS50eXBlLCBjcml0ZXJpYSlcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBzZWFyY2hWYWx1ZTogXCJcIiB9KVxuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgbGV0IGxvY2F0aW9uID0gXCJHdXJnYW9uXCJcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuc2VsZWN0ZWRMb2NhdGlvbikge1xuICAgICAgICAgICAgbG9jYXRpb24gPSB0aGlzLnByb3BzLnNlbGVjdGVkTG9jYXRpb24uZm9ybWF0dGVkX2FkZHJlc3Muc2xpY2UoMCwgNSlcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIDxoZWFkZXIgY2xhc3NOYW1lPVwic2tpbi1wcmltYXJ5IGZpeGVkIGhvcml6b250YWwgdG9wIGN0LWhlYWRlclwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lci1mbHVpZFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC0xMlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm5hdmlnYXRlLXJvd1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHVsIGNsYXNzTmFtZT1cImlubGluZS1saXN0IHRvcC1uYXYgYWxwaGEtYnggdGV4dC13aGl0ZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnByb3BzLmhpc3RvcnkuZ28oLTEpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGk+PHNwYW4gY2xhc3NOYW1lPVwiY3QtaW1nIGN0LWltZy1zbSBhcnJvdy1pbWdcIj48aW1nIHNyYz1cIi9hc3NldHMvaW1nL2N1c3RvbWVyLWljb25zL2xlZnQtYXJyb3cuc3ZnXCIgY2xhc3NOYW1lPVwiaW1nLWZsdWlkXCIgLz48L3NwYW4+PC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGk+PGRpdiBjbGFzc05hbWU9XCJzY3JlZW4tdGl0bGVcIj5TZWFyY2g8L2Rpdj48L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx1bCBjbGFzc05hbWU9XCJpbmxpbmUtbGlzdCB0b3AtbmF2IGJldGEtYnggZmxvYXQtcmlnaHQgdGV4dC1yaWdodCB0ZXh0LXdoaXRlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuaGlzdG9yeS5wdXNoKCcvbG9jYXRpb25zZWFyY2gnKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpPjxkaXYgY2xhc3NOYW1lPVwic2NyZWVuLXRpdGxlXCI+PHNwYW4gY2xhc3NOYW1lPVwiY3QtaW1nIGN0LWltZy1zbSBtYXAtbWFya2VyLWltZ1wiPjxpbWcgc3JjPVwiL2Fzc2V0cy9pbWcvY3VzdG9tZXItaWNvbnMvbWFwLW1hcmtlci5zdmdcIiBjbGFzc05hbWU9XCJpbWctZmx1aWRcIiAvPjwvc3Bhbj4ge2xvY2F0aW9ufTwvZGl2PjwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC0xMlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNlYXJjaC1yb3dcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRvbi1ncm91cFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGNsYXNzTmFtZT1cImZvcm0tY29udHJvbCBpbnB1dC1tZCBzZWFyY2gtaW5wdXRcIiBpZD1cInRvcENyaXRlcmlhU2VhcmNoXCIgb25DaGFuZ2U9e3RoaXMuaW5wdXRIYW5kbGVyLmJpbmQodGhpcyl9IHZhbHVlPXt0aGlzLnN0YXRlLnNlYXJjaFZhbHVlfSBwbGFjZWhvbGRlcj17dGhpcy5wcm9wcy50aXRsZX0gLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJjdC1pbWcgY3QtaW1nLXNtIHNlYXJjaC1pY29uXCI+PGltZyBzcmM9XCIvYXNzZXRzL2ltZy9jdXN0b21lci1pY29ucy9zZWFyY2gtaWNvbi5zdmdcIiAvPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2hlYWRlcj5cblxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZS5zZWFyY2hWYWx1ZSA/XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzZWN0aW9uIGNsYXNzTmFtZT1cIndyYXAgd3JhcC0xMDBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIndpZGdldC1wYW5lbFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDQgY2xhc3NOYW1lPVwicGFuZWwtdGl0bGVcIj5TZWFyY2ggUmVzdWx0PC9oND5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwYW5lbC1jb250ZW50XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dWwgY2xhc3NOYW1lPVwibGlzdCBzZWFyY2gtcmVzdWx0LWxpc3RcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUuc2VhcmNoUmVzdWx0cy5tYXAoKGN1cnIsIGkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiA8bGkgb25DbGljaz17dGhpcy5hZGRDcml0ZXJpYS5iaW5kKHRoaXMsIGN1cnIpfSBrZXk9e2l9PjxhPntjdXJyLm5hbWV9PC9hPjwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3NlY3Rpb24+XG4gICAgICAgICAgICAgICAgICAgICAgICA6ICh0aGlzLnByb3BzLmNoZWNrRm9yTG9hZCA/IHRoaXMucHJvcHMuY2hpbGRyZW4gOiA8TG9hZGVyIC8+KVxuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IENyaXRlcmlhU2VhcmNoVmlld1xuIiwiaW1wb3J0IENyaXRlcmlhU2VhcmNoVmlldyBmcm9tICcuL0NyaXRlcmlhU2VhcmNoVmlldy5qcydcblxuZXhwb3J0IGRlZmF1bHQgQ3JpdGVyaWFTZWFyY2hWaWV3IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuY2xhc3MgT3RwVmVyaWZ5VmlldyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMucHJvcHMpXG4gICAgICAgIGRlYnVnZ2VyXG4gICAgfVxuXG4gICAgaW5wdXRIYW5kbGVyKGUpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IFtlLnRhcmdldC5uYW1lXTogZS50YXJnZXQudmFsdWUgfSlcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgT3RwVmVyaWZ5Vmlld1xuIiwiaW1wb3J0IE90cFZlcmlmeSBmcm9tICcuL090cFZlcmlmeSdcblxuZXhwb3J0IGRlZmF1bHQgT3RwVmVyaWZ5IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBFbW90aUljb24gZnJvbSAnbWF0ZXJpYWwtdWktaWNvbnMvQWNjb3VudENpcmNsZSc7XG5cbmNsYXNzIFByb2ZpbGVTbGlkZXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgIH1cblxuICAgIHN3aXRjaFVzZXIocHJvZmlsZUlkKSB7XG4gICAgICAgIHRoaXMuY29udGV4dC5yb3V0ZXIuaGlzdG9yeS5wdXNoKGAvdXNlci8ke3Byb2ZpbGVJZH0ke3RoaXMucHJvcHMuc3ViUm91dGV9YClcblxuICAgIH1cblxuICAgIHN0YXRpYyBjb250ZXh0VHlwZXMgPSB7XG4gICAgICAgIHJvdXRlcjogKCkgPT4gbnVsbFxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICBsZXQgcHJvZmlsZXMgPSBbXVxuXG4gICAgICAgIHByb2ZpbGVzID0gT2JqZWN0LmtleXModGhpcy5wcm9wcy5wcm9maWxlcykubWFwKChwcm9maWxlSWQsIGkpID0+IHtcbiAgICAgICAgICAgIGxldCBzcmMgPSB0aGlzLnByb3BzLnByb2ZpbGVzW3Byb2ZpbGVJZF0ucHJvZmlsZUltYWdlIHx8IFwiaHR0cHM6Ly93d3cuYXRvbWl4LmNvbS5hdS9tZWRpYS8yMDE1LzA2L2F0b21peF91c2VyMzEucG5nXCJcbiAgICAgICAgICAgIHJldHVybiA8ZGl2IGtleT17aX0gY2xhc3NOYW1lPVwic2xpZGVUaWxlXCIgb25DbGljaz17dGhpcy5zd2l0Y2hVc2VyLmJpbmQodGhpcywgcHJvZmlsZUlkKX0+XG4gICAgICAgICAgICAgICAgPGltZyBjbGFzc05hbWU9XCJwcm9maWxlQ2FyZEltYWdlXCIgc3JjPXtzcmN9Lz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICB9KVxuXG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicHJvZmlsZVNsaWRlclwiPlxuICAgICAgICAgICAgICAgIHtwcm9maWxlc31cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBQcm9maWxlU2xpZGVyXG4iLCJpbXBvcnQgUHJvZmlsZVNsaWRlciBmcm9tICcuL1Byb2ZpbGVTbGlkZXIuanMnXG5cbmV4cG9ydCBkZWZhdWx0IFByb2ZpbGVTbGlkZXIiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgeyBnZXRUaW1lLCBnZXREYXlOYW1lIH0gZnJvbSAnLi4vLi4vLi4vdXRpbHMvZGF0ZVRpbWVVdGlscy5qcydcblxuY29uc3QgREFZU19UT19TSE9XID0gMjBcbmNvbnN0IFdFRUtfREFZUyA9IFsnUycsICdNJywgJ1QnLCAnVycsICdUJywgJ0YnLCAnUyddXG5cbmNsYXNzIFRpbWVTbG90U2VsZWN0b3IgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgICAgICB0aGlzLnN0YXRlID0ge1xuXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZW5lcmF0ZURheXMoKSB7XG4gICAgICAgIC8vIGxldCBkYXlzID0gW11cblxuICAgICAgICAvLyBmb3IgKGxldCBpID0gMDsgaSA8IERBWVNfVE9fU0hPVzsgaSsrKSB7XG4gICAgICAgIC8vICAgICBsZXQgb2Zmc2V0RGF5ID0gbmV3IERhdGUoKVxuICAgICAgICAvLyAgICAgb2Zmc2V0RGF5LnNldERhdGUoc29tZURhdGUuZ2V0RGF0ZSgpICsgREFZU19UT19TSE9XKVxuICAgICAgICAvLyAgICAgbGV0IHdlZWtEYXkgPSBvZmZzZXREYXkuZ2V0RGF5KClcblxuICAgICAgICAvLyAgICAgZGF5cy5wdXNoKHtcbiAgICAgICAgLy8gICAgICAgICB0YWc6IFdFRUtfREFZU1t3ZWVrRGF5XSxcbiAgICAgICAgLy8gICAgICAgICB2YWx1ZTogd2Vla0RheVxuICAgICAgICAvLyAgICAgfSlcbiAgICAgICAgLy8gfVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIndpZGdldCBuby1zaGFkb3cgbm8tcm91bmQgc2tpbi10cmFuc3BhcmVudFwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIndpZGdldC1jb250ZW50XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkZC1uZXctdGltZSBtcmItMTBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDQgY2xhc3NOYW1lPVwidGV4dC1tZCBmdy03MDAgbXJiLTEwXCI+U2VsZWN0IERhdGUgJmFtcDsgVGltZTogPHNwYW4gY2xhc3NOYW1lPVwiZmxvYXQtcmlnaHQgdGV4dC1tZCBmdy03MDAgdGV4dC1wcmltYXJ5XCI+QXByaWwgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1saWdodFwiPk1heTwvc3Bhbj48L3NwYW4+PC9oND5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNob29zZS10aW1lXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx1bCBjbGFzc05hbWU9XCJpbmxpbmUtbGlzdCBkYXRldGltZS1pdGVtc1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDIxIDxzcGFuPlM8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDIyIDxzcGFuPk08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpIGNsYXNzTmFtZT1cImFjdGl2ZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDIzIDxzcGFuPlQ8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDI0IDxzcGFuPlc8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDI1IDxzcGFuPlQ8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDI2IDxzcGFuPkY8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDI3IDxzcGFuPlM8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDI4IDxzcGFuPlM8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDI5IDxzcGFuPk08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDMwIDxzcGFuPlQ8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwid2lkZ2V0XCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwid2lkZ2V0LWNvbnRlbnRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxoNCBjbGFzc05hbWU9XCJyZXBvcnQtb24gbXJiLTEwXCI+TW9ybmluZzwvaDQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dWwgY2xhc3NOYW1lPVwiaW5saW5lLWxpc3QgdGltZS1pdGVtc1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaT48YSBocmVmPVwiXCIgY2xhc3NOYW1lPVwidi1idG4gdi1idG4tcHJpbWFyeSBidG4tc20gb3V0bGluZVwiPjc6MzAgQU08L2E+PC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGk+PGEgaHJlZj1cIlwiIGNsYXNzTmFtZT1cInYtYnRuIHYtYnRuLXByaW1hcnkgYnRuLXNtIG91dGxpbmVcIj44OjAwIEFNPC9hPjwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpPjxhIGhyZWY9XCJcIiBjbGFzc05hbWU9XCJ2LWJ0biB2LWJ0bi1wcmltYXJ5IGJ0bi1zbSBvdXRsaW5lXCI+ODozMCBBTTwvYT48L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaT48YSBocmVmPVwiXCIgY2xhc3NOYW1lPVwidi1idG4gdi1idG4tcHJpbWFyeSBidG4tc20gb3V0bGluZVwiPjk6MDAgQU08L2E+PC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGk+PGEgaHJlZj1cIlwiIGNsYXNzTmFtZT1cInYtYnRuIHYtYnRuLXByaW1hcnkgYnRuLXNtIG91dGxpbmVcIj45OjMwIEFNPC9hPjwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpPjxhIGhyZWY9XCJcIiBjbGFzc05hbWU9XCJ2LWJ0biB2LWJ0bi1wcmltYXJ5IGJ0bi1zbSBvdXRsaW5lXCI+MTA6MDAgQU08L2E+PC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGk+PGEgaHJlZj1cIlwiIGNsYXNzTmFtZT1cInYtYnRuIHYtYnRuLXByaW1hcnkgYnRuLXNtIG91dGxpbmVcIj4xMDozMCBBTTwvYT48L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaT48YSBocmVmPVwiXCIgY2xhc3NOYW1lPVwidi1idG4gdi1idG4tZGVmYXVsdCBidG4tc20gb3V0bGluZVwiPjExOjAwIEFNPC9hPjwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpPjxhIGhyZWY9XCJcIiBjbGFzc05hbWU9XCJ2LWJ0biB2LWJ0bi1wcmltYXJ5IGJ0bi1zbSBvdXRsaW5lXCI+MTE6MzAgQU08L2E+PC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aDQgY2xhc3NOYW1lPVwicmVwb3J0LW9uIG1yYi0xMFwiPkFmdGVybm9vbjwvaDQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dWwgY2xhc3NOYW1lPVwiaW5saW5lLWxpc3QgdGltZS1pdGVtc1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaT48YSBocmVmPVwiXCIgY2xhc3NOYW1lPVwidi1idG4gdi1idG4tcHJpbWFyeSBidG4tc20gb3V0bGluZVwiPjc6MzAgUE08L2E+PC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGk+PGEgaHJlZj1cIlwiIGNsYXNzTmFtZT1cInYtYnRuIHYtYnRuLXByaW1hcnkgYnRuLXNtIG91dGxpbmVcIj44OjAwIFBNPC9hPjwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpPjxhIGhyZWY9XCJcIiBjbGFzc05hbWU9XCJ2LWJ0biB2LWJ0bi1wcmltYXJ5IGJ0bi1zbSBvdXRsaW5lXCI+ODozMCBQTTwvYT48L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaT48YSBocmVmPVwiXCIgY2xhc3NOYW1lPVwidi1idG4gdi1idG4tcHJpbWFyeSBidG4tc20gb3V0bGluZVwiPjk6MDAgUE08L2E+PC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGk+PGEgaHJlZj1cIlwiIGNsYXNzTmFtZT1cInYtYnRuIHYtYnRuLXByaW1hcnkgYnRuLXNtIG91dGxpbmVcIj45OjMwIFBNPC9hPjwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpPjxhIGhyZWY9XCJcIiBjbGFzc05hbWU9XCJ2LWJ0biB2LWJ0bi1wcmltYXJ5IGJ0bi1zbSBvdXRsaW5lXCI+MTA6MDAgUE08L2E+PC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGk+PGEgaHJlZj1cIlwiIGNsYXNzTmFtZT1cInYtYnRuIHYtYnRuLXByaW1hcnkgYnRuLXNtIG91dGxpbmVcIj4xMDozMCBQTTwvYT48L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaT48YSBocmVmPVwiXCIgY2xhc3NOYW1lPVwidi1idG4gdi1idG4tZGVmYXVsdCBidG4tc20gb3V0bGluZVwiPjExOjAwIFBNPC9hPjwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpPjxhIGhyZWY9XCJcIiBjbGFzc05hbWU9XCJ2LWJ0biB2LWJ0bi1wcmltYXJ5IGJ0bi1zbSBvdXRsaW5lXCI+MTE6MzAgUE08L2E+PC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aDQgY2xhc3NOYW1lPVwicmVwb3J0LW9uIG1yYi0xMFwiPkV2ZW5pbmc8L2g0PlxuICAgICAgICAgICAgICAgICAgICAgICAgPHVsIGNsYXNzTmFtZT1cImlubGluZS1saXN0IHRpbWUtaXRlbXNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGk+PGEgaHJlZj1cIlwiIGNsYXNzTmFtZT1cInYtYnRuIHYtYnRuLXByaW1hcnkgYnRuLXNtIG91dGxpbmVcIj43OjMwIFBNPC9hPjwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpPjxhIGhyZWY9XCJcIiBjbGFzc05hbWU9XCJ2LWJ0biB2LWJ0bi1wcmltYXJ5IGJ0bi1zbSBvdXRsaW5lXCI+ODowMCBQTTwvYT48L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaT48YSBocmVmPVwiXCIgY2xhc3NOYW1lPVwidi1idG4gdi1idG4tcHJpbWFyeSBidG4tc20gb3V0bGluZVwiPjg6MzAgUE08L2E+PC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGk+PGEgaHJlZj1cIlwiIGNsYXNzTmFtZT1cInYtYnRuIHYtYnRuLXByaW1hcnkgYnRuLXNtIG91dGxpbmVcIj45OjAwIFBNPC9hPjwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpPjxhIGhyZWY9XCJcIiBjbGFzc05hbWU9XCJ2LWJ0biB2LWJ0bi1wcmltYXJ5IGJ0bi1zbSBvdXRsaW5lXCI+OTozMCBQTTwvYT48L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaT48YSBocmVmPVwiXCIgY2xhc3NOYW1lPVwidi1idG4gdi1idG4tcHJpbWFyeSBidG4tc20gb3V0bGluZVwiPjEwOjAwIFBNPC9hPjwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpPjxhIGhyZWY9XCJcIiBjbGFzc05hbWU9XCJ2LWJ0biB2LWJ0bi1wcmltYXJ5IGJ0bi1zbSBvdXRsaW5lXCI+MTA6MzAgUE08L2E+PC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGk+PGEgaHJlZj1cIlwiIGNsYXNzTmFtZT1cInYtYnRuIHYtYnRuLWRlZmF1bHQgYnRuLXNtIG91dGxpbmVcIj4xMTowMCBQTTwvYT48L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaT48YSBocmVmPVwiXCIgY2xhc3NOYW1lPVwidi1idG4gdi1idG4tcHJpbWFyeSBidG4tc20gb3V0bGluZVwiPjExOjMwIFBNPC9hPjwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBUaW1lU2xvdFNlbGVjdG9yXG4iLCJpbXBvcnQgVGltZVNsb3RTZWxlY3RvciBmcm9tICcuL1RpbWVTbG90U2VsZWN0b3IuanMnXG5cbmV4cG9ydCBkZWZhdWx0IFRpbWVTbG90U2VsZWN0b3IiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgUHJvZmlsZVNsaWRlciBmcm9tICcuLi9wcm9maWxlU2xpZGVyL2luZGV4LmpzJ1xuaW1wb3J0IEFwcG9pbnRtZW50TGlzdCBmcm9tICcuL2FwcG9pbnRtZW50TGlzdC9pbmRleC5qcydcblxuY2xhc3MgVXNlckFwcG9pbnRtZW50c1ZpZXcgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgICAgICB0aGlzLnN0YXRlID0ge1xuXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgdGhpcy5wcm9wcy5nZXRVc2VyUHJvZmlsZVdpdGhBcHBvaW50bWVudHMoKVxuICAgIH1cblxuICAgIHN0YXRpYyBjb250ZXh0VHlwZXMgPSB7XG4gICAgICAgIHJvdXRlcjogKCkgPT4gbnVsbFxuICAgIH1cblxuICAgIGNvbXBhcmVEYXRlV2l0aFRvZGF5KGRhdGUpe1xuICAgICAgICBsZXQgdG9kYXkgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKVxuICAgICAgICBkYXRlID0gbmV3IERhdGUoZGF0ZSkuZ2V0VGltZSgpXG4gICAgICAgIHJldHVybiB0b2RheSA+IGRhdGVcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgbGV0IHNlbGVjdGVkVXNlciA9IG51bGxcbiAgICAgICAgbGV0IHVzZXJQcm9maWxlSWQgPSB0aGlzLnByb3BzLm1hdGNoLnBhcmFtcy5pZFxuXG4gICAgICAgIGlmICh0aGlzLnByb3BzLlVTRVIucHJvZmlsZXNbdXNlclByb2ZpbGVJZF0pIHtcbiAgICAgICAgICAgIHNlbGVjdGVkVXNlciA9IHRoaXMucHJvcHMuVVNFUi5wcm9maWxlc1t1c2VyUHJvZmlsZUlkXVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgT2JqZWN0LmtleXModGhpcy5wcm9wcy5VU0VSLnByb2ZpbGVzKS5tYXAoKHByb2ZpbGVJZCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnByb3BzLlVTRVIucHJvZmlsZXNbcHJvZmlsZUlkXS5pc0RlZmF1bHRVc2VyKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkVXNlciA9IHRoaXMucHJvcHMuVVNFUi5wcm9maWxlc1twcm9maWxlSWRdXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInVzZXJQcm9maWxlXCI+XG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAoIHNlbGVjdGVkVXNlciAmJiBzZWxlY3RlZFVzZXIuYXBwb2ludG1lbnRzICkgPyA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPFByb2ZpbGVTbGlkZXJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9maWxlcz17dGhpcy5wcm9wcy5VU0VSLnByb2ZpbGVzfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1YlJvdXRlPVwiL2FwcG9pbnRtZW50c1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidXBjb21pbmdhcHBcIj5VcGNvbWluZyBPUEQgQXBwb2ludG1lbnRzPC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkVXNlci5hcHBvaW50bWVudHMuZmlsdGVyKChhcHBvaW50bWVudCxpKSA9PntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGRhdGUgPSBhcHBvaW50bWVudC5zbG90ID8gYXBwb2ludG1lbnQuc2xvdC5zdGFydCA6IDBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICF0aGlzLmNvbXBhcmVEYXRlV2l0aFRvZGF5KGRhdGUpIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLm1hcCgoYXBwb2ludG1lbnQsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiA8QXBwb2ludG1lbnRMaXN0IGtleT17aW5kZXh9IGRhdGE9e2FwcG9pbnRtZW50fSAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJwcmV2YXBwXCI+UHJldmlvdXMgT1BEIEFwcG9pbnRtZW50czwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZFVzZXIuYXBwb2ludG1lbnRzLmZpbHRlcigoYXBwb2ludG1lbnQsaSkgPT57XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkYXRlID0gYXBwb2ludG1lbnQuc2xvdCA/IGFwcG9pbnRtZW50LnNsb3Quc3RhcnQgOiAwXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNvbXBhcmVEYXRlV2l0aFRvZGF5KGRhdGUpIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLm1hcCgoYXBwb2ludG1lbnQsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiA8QXBwb2ludG1lbnRMaXN0IGtleT17aW5kZXh9IGRhdGE9e2FwcG9pbnRtZW50fSAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PiA6IFwiXCJcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBVc2VyQXBwb2ludG1lbnRzVmlld1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBSaWdodEFycm93SWNvbiBmcm9tICdtYXRlcmlhbC11aS1pY29ucy9LZXlib2FyZEFycm93UmlnaHQnO1xuXG5jbGFzcyBBcHBvaW50bWVudExpc3QgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgIH1cblxuICAgIGdldFRpbWUodW5peF90aW1lc3RhbXApIHtcbiAgICAgICAgdmFyIGRhdGUgPSBuZXcgRGF0ZSh1bml4X3RpbWVzdGFtcCAqIDEwMDApO1xuICAgICAgICB2YXIgaG91cnMgPSBkYXRlLmdldEhvdXJzKCk7XG4gICAgICAgIHZhciBtaW51dGVzID0gXCIwXCIgKyBkYXRlLmdldE1pbnV0ZXMoKTtcbiAgICAgICAgcmV0dXJuIGhvdXJzICsgJzonICsgbWludXRlcy5zdWJzdHIoLTIpXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIGxldCB7IGRvY3Rvck5hbWUsIHNsb3QgfSA9IHRoaXMucHJvcHMuZGF0YVxuICAgICAgICBzbG90ID0gc2xvdCB8fCB7XG4gICAgICAgICAgICBzdGFydDogMCxcbiAgICAgICAgICAgIGVuZDogMFxuICAgICAgICB9XG4gICAgICAgIGxldCBkYXRlID0gbmV3IERhdGUoc2xvdC5zdGFydCkudG9EYXRlU3RyaW5nKClcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhcHBvaW50bWVudFwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibmFtZVwiPlxuXG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJkZXRhaWxzXCI+XG4gICAgICAgICAgICAgICAgICAgIDxwPlxuICAgICAgICAgICAgICAgICAgICAgICAge2RvY3Rvck5hbWV9XG4gICAgICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICAgICAgPHA+XG4gICAgICAgICAgICAgICAgICAgICAgICB7ZGF0ZX1cbiAgICAgICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgICAgICAgICAgIHt0aGlzLmdldFRpbWUoc2xvdC5zdGFydCkgKyBcIiB0byBcIiArIHRoaXMuZ2V0VGltZShzbG90LmVuZCl9XG4gICAgICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJvb2tcIj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dFwiPlZpZXcgQ29uZmlybWF0aW9uPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8UmlnaHRBcnJvd0ljb24gY2xhc3NOYW1lPVwiYm9va0ljb25cIiAvPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IEFwcG9pbnRtZW50TGlzdFxuIiwiaW1wb3J0IEFwcG9pbnRtZW50TGlzdCBmcm9tICcuL0FwcG9pbnRtZW50TGlzdC5qcydcblxuZXhwb3J0IGRlZmF1bHQgQXBwb2ludG1lbnRMaXN0IiwiaW1wb3J0IFVzZXJBcHBvaW50bWVudHNWaWV3IGZyb20gJy4vVXNlckFwcG9pbnRtZW50c1ZpZXcuanMnXG5cbmV4cG9ydCBkZWZhdWx0IFVzZXJBcHBvaW50bWVudHNWaWV3IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IFByb2ZpbGVTbGlkZXIgZnJvbSAnLi4vcHJvZmlsZVNsaWRlci9pbmRleC5qcydcbmltcG9ydCBQcm9maWxlRGF0YSBmcm9tICcuL3Byb2ZpbGVEYXRhL2luZGV4LmpzJ1xuXG5jbGFzcyBVc2VyUHJvZmlsZVZpZXcgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgICAgICB0aGlzLnN0YXRlID0ge1xuXG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIHRoaXMucHJvcHMuZ2V0VXNlclByb2ZpbGUoKVxuICAgIH1cblxuICAgIHN0YXRpYyBjb250ZXh0VHlwZXMgPSB7XG4gICAgICAgIHJvdXRlcjogKCkgPT4gbnVsbFxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICBsZXQgc2VsZWN0ZWRVc2VyID0gbnVsbFxuICAgICAgICBsZXQgdXNlclByb2ZpbGVJZCA9IHRoaXMucHJvcHMubWF0Y2gucGFyYW1zLmlkXG5cbiAgICAgICAgaWYgKHRoaXMucHJvcHMuVVNFUi5wcm9maWxlc1t1c2VyUHJvZmlsZUlkXSkge1xuICAgICAgICAgICAgc2VsZWN0ZWRVc2VyID0gdGhpcy5wcm9wcy5VU0VSLnByb2ZpbGVzW3VzZXJQcm9maWxlSWRdXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBPYmplY3Qua2V5cyh0aGlzLnByb3BzLlVTRVIucHJvZmlsZXMpLm1hcCgocHJvZmlsZUlkKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucHJvcHMuVVNFUi5wcm9maWxlc1twcm9maWxlSWRdLmlzRGVmYXVsdFVzZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRVc2VyID0gdGhpcy5wcm9wcy5VU0VSLnByb2ZpbGVzW3Byb2ZpbGVJZF1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ1c2VyUHJvZmlsZVwiPlxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRVc2VyID8gPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxQcm9maWxlU2xpZGVyIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb2ZpbGVzPXt0aGlzLnByb3BzLlVTRVIucHJvZmlsZXN9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3ViUm91dGU9XCJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxQcm9maWxlRGF0YSBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9maWxlRGF0YT17c2VsZWN0ZWRVc2VyfVxuICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+IDogXCJcIlxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IFVzZXJQcm9maWxlVmlld1xuIiwiaW1wb3J0IFVzZXJQcm9maWxlVmlldyBmcm9tICcuL1VzZXJQcm9maWxlVmlldy5qcydcblxuZXhwb3J0IGRlZmF1bHQgVXNlclByb2ZpbGVWaWV3IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuY2xhc3MgUHJvZmlsZURhdGEgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgIH1cblxuICAgIG9wZW5BcHBvaW50bWVudHMocHJvZmlsZUlkKSB7XG4gICAgICAgIHRoaXMuY29udGV4dC5yb3V0ZXIuaGlzdG9yeS5wdXNoKGAvdXNlci8ke3Byb2ZpbGVJZH0vYXBwb2ludG1lbnRzYClcblxuICAgIH1cblxuICAgIG9wZW5SZXBvcnRzKHByb2ZpbGVJZCkge1xuICAgICAgICB0aGlzLmNvbnRleHQucm91dGVyLmhpc3RvcnkucHVzaChgL3VzZXIvJHtwcm9maWxlSWR9L3JlcG9ydHNgKVxuXG4gICAgfVxuXG4gICAgc3RhdGljIGNvbnRleHRUeXBlcyA9IHtcbiAgICAgICAgcm91dGVyOiAoKSA9PiBudWxsXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIGxldCB7bmFtZSwgZ2VuZGVyLCBhZ2UsIG1vYmlsZSwgbWVkaWNhbEhpc3RvcnlDb3VudCwgbWVkaWNhbFRlc3RDb3VudCwgb25saW5lQ29uc3VsdGF0aW9uQ291bnQsIG9wZFZpc2l0Q291bnQsIHByb2ZpbGVJZH0gPSB0aGlzLnByb3BzLnByb2ZpbGVEYXRhXG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXY+ICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidXNlckRlYWlsXCI+XG4gICAgICAgICAgICAgICAgICAgIDxwPntuYW1lfTwvcD5cbiAgICAgICAgICAgICAgICAgICAgPHA+e2FnZX0gWWVhcnM8L3A+XG4gICAgICAgICAgICAgICAgICAgIDxwPntnZW5kZXJ9PC9wPlxuICAgICAgICAgICAgICAgICAgICA8cD57bW9iaWxlfTwvcD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInByb2ZpbGVCdG5zXCI+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24+UHJvZmlsZSBOb3QgVmVyaWZpZWQ8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbj5ObyBPUEQgSW5zdXJhbmNlPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24+T25saW5lIENvbnN1bHRhdGlvbnMoe29ubGluZUNvbnN1bHRhdGlvbkNvdW50fSk8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXt0aGlzLm9wZW5BcHBvaW50bWVudHMuYmluZCh0aGlzLHByb2ZpbGVJZCl9Pk9QRCBWaXNpdHMgKHtvcGRWaXNpdENvdW50fSk8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbj5NZWRpY2FsIEhpc3RvcnkgKHttZWRpY2FsSGlzdG9yeUNvdW50fSk8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXt0aGlzLm9wZW5SZXBvcnRzLmJpbmQodGhpcyxwcm9maWxlSWQpfT5UZXN0IFJlcG9ydHMgKHttZWRpY2FsVGVzdENvdW50fSk8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBQcm9maWxlRGF0YVxuIiwiaW1wb3J0IFByb2ZpbGVEYXRhIGZyb20gJy4vUHJvZmlsZURhdGEuanMnXG5cbmV4cG9ydCBkZWZhdWx0IFByb2ZpbGVEYXRhIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IFByb2ZpbGVTbGlkZXIgZnJvbSAnLi4vcHJvZmlsZVNsaWRlci9pbmRleC5qcydcbmltcG9ydCBSZXBvcnRMaXN0IGZyb20gJy4vcmVwb3J0TGlzdC9pbmRleC5qcydcblxuY2xhc3MgVXNlclJlcG9ydHNWaWV3IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcblxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIHRoaXMucHJvcHMuZ2V0VXNlclByb2ZpbGVXaXRoVGVzdHMoKVxuICAgIH1cblxuICAgIHN0YXRpYyBjb250ZXh0VHlwZXMgPSB7XG4gICAgICAgIHJvdXRlcjogKCkgPT4gbnVsbFxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICBsZXQgc2VsZWN0ZWRVc2VyID0gbnVsbFxuICAgICAgICBsZXQgdXNlclByb2ZpbGVJZCA9IHRoaXMucHJvcHMubWF0Y2gucGFyYW1zLmlkXG5cbiAgICAgICAgaWYgKHRoaXMucHJvcHMuVVNFUi5wcm9maWxlc1t1c2VyUHJvZmlsZUlkXSkge1xuICAgICAgICAgICAgc2VsZWN0ZWRVc2VyID0gdGhpcy5wcm9wcy5VU0VSLnByb2ZpbGVzW3VzZXJQcm9maWxlSWRdXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBzZWxlY3RpbmcgZGVmYXVsdCB1c2VyXG4gICAgICAgICAgICBPYmplY3Qua2V5cyh0aGlzLnByb3BzLlVTRVIucHJvZmlsZXMpLm1hcCgocHJvZmlsZUlkKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucHJvcHMuVVNFUi5wcm9maWxlc1twcm9maWxlSWRdLmlzRGVmYXVsdFVzZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRVc2VyID0gdGhpcy5wcm9wcy5VU0VSLnByb2ZpbGVzW3Byb2ZpbGVJZF1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidXNlclByb2ZpbGVcIj5cbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIChzZWxlY3RlZFVzZXIgJiYgc2VsZWN0ZWRVc2VyLnRlc3RzKSA/IDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8UHJvZmlsZVNsaWRlclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb2ZpbGVzPXt0aGlzLnByb3BzLlVTRVIucHJvZmlsZXN9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3ViUm91dGU9XCIvcmVwb3J0c1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidXBjb21pbmdhcHBcIj5SZXBvcnRzPC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkVXNlci50ZXN0cy5tYXAoKHRlc3QsIGkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDxSZXBvcnRMaXN0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhPXt0ZXN0fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5PXtpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+IDogXCJcIlxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IFVzZXJSZXBvcnRzVmlld1xuIiwiaW1wb3J0IFVzZXJSZXBvcnRzVmlldyBmcm9tICcuL1VzZXJSZXBvcnRzVmlldy5qcydcblxuZXhwb3J0IGRlZmF1bHQgVXNlclJlcG9ydHNWaWV3IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuY2xhc3MgUmVwb3J0TGlzdCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgfVxuXG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgbGV0IHsgbmFtZSwgc3ViX25hbWUsIGFiYnJldmlhdGlvbiwgY2F0ZWdvcnksIHNsb3QgIH0gPSB0aGlzLnByb3BzLmRhdGFcbiAgICAgICAgc2xvdCA9IHNsb3QgfHwge1xuICAgICAgICAgICAgc3RhcnQ6IDAsXG4gICAgICAgICAgICBlbmQ6IDBcbiAgICAgICAgfVxuICAgICAgICBsZXQgZGF0ZSA9IG5ldyBEYXRlKHNsb3Quc3RhcnQpLnRvRGF0ZVN0cmluZygpXG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYXBwb2ludG1lbnRcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImRldGFpbHNcIj5cbiAgICAgICAgICAgICAgICAgICAgPHA+XG4gICAgICAgICAgICAgICAgICAgICAgICB7bmFtZSArIFwiICwgXCIgKyBzdWJfbmFtZX1cbiAgICAgICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtjYXRlZ29yeSArIFwiICwgXCIgKyBhYmJyZXZpYXRpb259XG4gICAgICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICAgICAgPHA+XG4gICAgICAgICAgICAgICAgICAgICAgICB7ZGF0ZX1cbiAgICAgICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYm9va1wiPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ2aWV3cmVwb3J0XCI+VmlldyBSZXBvcnQ8L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgUmVwb3J0TGlzdFxuIiwiaW1wb3J0IFJlcG9ydExpc3QgZnJvbSAnLi9SZXBvcnRMaXN0LmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBSZXBvcnRMaXN0IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuY2xhc3MgVXNlclNpZ251cFZpZXcgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgYXBwb2lubWVudEZvcjogJ3NlbGYnLFxuICAgICAgICAgICAgcGF0aWVudE5hbWU6ICcnLFxuICAgICAgICAgICAgYWdlOiAnJyxcbiAgICAgICAgICAgIGdlbmRlcjogJ20nLFxuICAgICAgICAgICAgZW1haWw6ICcnLFxuICAgICAgICAgICAgcGhvbmVOdW1iZXI6ICcnXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpbnB1dEhhbmRsZXIoZSkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHsgW2UudGFyZ2V0Lm5hbWVdOiBlLnRhcmdldC52YWx1ZSB9KVxuICAgIH1cblxuICAgIHN1Ym1pdEZvcm0oKSB7XG5cbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgPGhlYWRlciBjbGFzc05hbWU9XCJza2luLXdoaXRlIGZpeGVkIGhvcml6b250YWwgdG9wIGJkci0xIGJvdHRvbSBsaWdodFwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lci1mbHVpZFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC0yXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx1bCBjbGFzc05hbWU9XCJpbmxpbmUtbGlzdFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpPjxzcGFuIGNsYXNzTmFtZT1cImljb24gaWNvbi1zbSB0ZXh0LW1pZGRsZSBiYWNrLWljb24td2hpdGVcIj48aW1nIHNyYz1cIi9hc3NldHMvaW1nL2N1c3RvbWVyLWljb25zL2JhY2staWNvbi5wbmdcIiBjbGFzc05hbWU9XCJpbWctZmx1aWRcIiAvPjwvc3Bhbj48L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLThcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJoZWFkZXItdGl0bGUgZnctNzAwIGNhcGl0YWxpemUgdGV4dC1jZW50ZXJcIj5BZGQgVXNlciBQcm9maWxlPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtMlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvaGVhZGVyPlxuXG4gICAgICAgICAgICAgICAgPHNlY3Rpb24gY2xhc3NOYW1lPVwid3JhcCB2YWxpZGF0aW9uLWJvb2stc2NyZWVuXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwid2lkZ2V0IG5vLXJvdW5kIG5vLXNoYWRvd1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3aWRnZXQtaGVhZGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGg0IGNsYXNzTmFtZT1cIndpZGdldC10aXRsZVwiPkNvbnRhY3QgRGV0YWlsczwvaDQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwid2lkZ2V0LWNvbnRlbnRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Zm9ybSBjbGFzc05hbWU9XCJnby1ib3R0b21cIiA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cCBpbnB1dC1ncm91cFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImlubGluZSBpbnB1dC1sYWJlbFwiPkFwcG9pbnRtZW50IGZvcjwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNob29zZS1nZW5kZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwicmFkaW8taW5saW5lXCI+PGlucHV0IHZhbHVlPXsnc2VsZid9IG9uQ2hhbmdlPXt0aGlzLmlucHV0SGFuZGxlci5iaW5kKHRoaXMpfSBjaGVja2VkPXt0aGlzLnN0YXRlLmFwcG9pbm1lbnRGb3IgPT0gJ3NlbGYnfSB0eXBlPVwicmFkaW9cIiBuYW1lPVwiYXBwb2lubWVudEZvclwiIC8+U2VsZjwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cInJhZGlvLWlubGluZVwiPjxpbnB1dCB2YWx1ZT17J2Vsc2UnfSBvbkNoYW5nZT17dGhpcy5pbnB1dEhhbmRsZXIuYmluZCh0aGlzKX0gY2hlY2tlZD17dGhpcy5zdGF0ZS5hcHBvaW5tZW50Rm9yID09ICdlbHNlJ30gdHlwZT1cInJhZGlvXCIgbmFtZT1cImFwcG9pbm1lbnRGb3JcIiAvPlNvbWVvbmUgZWxzZTwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibGFiZWxXcmFwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgaWQ9XCJmbmFtZVwiIG5hbWU9XCJwYXRpZW50TmFtZVwiIHR5cGU9XCJ0ZXh0XCIgdmFsdWU9e3RoaXMuc3RhdGUucGF0aWVudE5hbWV9IG9uQ2hhbmdlPXt0aGlzLmlucHV0SGFuZGxlci5iaW5kKHRoaXMpfSByZXF1aXJlZCAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGh0bWxGb3I9XCJmbmFtZVwiPlBhdGllbnQgTmFtZTwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXhzIHRleHQtbGlnaHRcIj4oQXBwb2lubWVudCB2YWxpZCBvbmx5IGZvciB0aGUgcHJvdmlkZWQgbmFtZSk8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxhYmVsV3JhcFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IGlkPVwiYWdlXCIgbmFtZT1cImFnZVwiIHR5cGU9XCJ0ZXh0XCIgdmFsdWU9e3RoaXMuc3RhdGUuYWdlfSBvbkNoYW5nZT17dGhpcy5pbnB1dEhhbmRsZXIuYmluZCh0aGlzKX0gcmVxdWlyZWQgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBodG1sRm9yPVwiYWdlXCI+QWdlPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cCBpbnB1dC1ncm91cFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImlubGluZSBpbnB1dC1sYWJlbFwiPkdlbmRlcjwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNob29zZS1nZW5kZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwicmFkaW8taW5saW5lXCI+PGlucHV0IHZhbHVlPXsnbSd9IG9uQ2hhbmdlPXt0aGlzLmlucHV0SGFuZGxlci5iaW5kKHRoaXMpfSBjaGVja2VkPXt0aGlzLnN0YXRlLmdlbmRlciA9PSAnbSd9IHR5cGU9XCJyYWRpb1wiIG5hbWU9XCJnZW5kZXJcIiAvPk1hbGU8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJyYWRpby1pbmxpbmVcIj48aW5wdXQgdmFsdWU9eydmJ30gb25DaGFuZ2U9e3RoaXMuaW5wdXRIYW5kbGVyLmJpbmQodGhpcyl9IGNoZWNrZWQ9e3RoaXMuc3RhdGUuZ2VuZGVyID09ICdmJ30gdHlwZT1cInJhZGlvXCIgbmFtZT1cImdlbmRlclwiIC8+RmVtYWxlPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwicmFkaW8taW5saW5lXCI+PGlucHV0IHZhbHVlPXsnbyd9IG9uQ2hhbmdlPXt0aGlzLmlucHV0SGFuZGxlci5iaW5kKHRoaXMpfSBjaGVja2VkPXt0aGlzLnN0YXRlLmdlbmRlciA9PSAnbyd9IHR5cGU9XCJyYWRpb1wiIG5hbWU9XCJnZW5kZXJcIiAvPk90aGVyPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsYWJlbFdyYXBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCBpZD1cImVtYWlsXCIgbmFtZT1cImVtYWlsXCIgdHlwZT1cInRleHRcIiB2YWx1ZT17dGhpcy5zdGF0ZS5lbWFpbH0gb25DaGFuZ2U9e3RoaXMuaW5wdXRIYW5kbGVyLmJpbmQodGhpcyl9IHJlcXVpcmVkIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgaHRtbEZvcj1cImVtYWlsXCI+RW1haWw8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsYWJlbFdyYXBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCBpZD1cIm51bWJlclwiIG5hbWU9XCJwaG9uZU51bWJlclwiIHR5cGU9XCJ0ZXh0XCIgdmFsdWU9e3RoaXMuc3RhdGUucGhvbmVOdW1iZXJ9IG9uQ2hhbmdlPXt0aGlzLmlucHV0SGFuZGxlci5iaW5kKHRoaXMpfSByZXF1aXJlZCAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGh0bWxGb3I9XCJudW1iZXJcIj5Nb2JpbGUgTnVtYmVyPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9mb3JtPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvc2VjdGlvbj5cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cInYtYnRuIHYtYnRuLXByaW1hcnkgYnRuLWxnIGZpeGVkIGhvcml6b250YWwgYm90dG9tIG5vLXJvdW5kIGJ0bi1sZyB0ZXh0LWxnXCIgb25DbGljaz17dGhpcy5zdWJtaXRGb3JtLmJpbmQodGhpcyl9PkNvbnRpbnVlPC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgVXNlclNpZ251cFZpZXdcbiIsImltcG9ydCBVc2VyU2lnbnVwVmlldyBmcm9tICcuL1VzZXJTaWdudXAnXG5cbmV4cG9ydCBkZWZhdWx0IFVzZXJTaWdudXBWaWV3IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCdcblxuaW1wb3J0IExvYWRlciBmcm9tICcuLi8uLi9jb21tb25zL0xvYWRlcidcbmltcG9ydCBWaXNpdFRpbWUgZnJvbSAnLi92aXNpdFRpbWUnXG5pbXBvcnQgUGlja3VwQWRkcmVzcyBmcm9tICcuL3BpY2t1cEFkZHJlc3MnXG5pbXBvcnQgQ2hvb3NlUGF0aWVudCBmcm9tICcuL2Nob29zZVBhdGllbnQnXG5cbmNsYXNzIEJvb2tpbmdTdW1tYXJ5VmlldyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgICBzZWxlY3RlZExhYjogdGhpcy5wcm9wcy5tYXRjaC5wYXJhbXMuaWQsXG4gICAgICAgICAgICBwaWNrdXBUeXBlOiBcImxhYlwiXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgdGhpcy5wcm9wcy5nZXRMYWJCeUlkKHRoaXMuc3RhdGUuc2VsZWN0ZWRMYWIpXG4gICAgfVxuXG4gICAgb3BlblRlc3RzKCkge1xuICAgICAgICB0aGlzLnByb3BzLmhpc3RvcnkucHVzaChgL2xhYi8ke3RoaXMuc3RhdGUuc2VsZWN0ZWRMYWJ9L3Rlc3RzYClcbiAgICB9XG5cbiAgICBoYW5kbGVQaWNrdXBUeXBlKGUpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHBpY2t1cFR5cGU6IGUudGFyZ2V0LnZhbHVlIH0pXG4gICAgfVxuXG4gICAgZ2V0U2VsZWN0b3JzKCkge1xuICAgICAgICBzd2l0Y2ggKHRoaXMuc3RhdGUucGlja3VwVHlwZSkge1xuICAgICAgICAgICAgY2FzZSBcImxhYlwiOiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgIDxWaXNpdFRpbWUgdHlwZT1cImxhYlwiLz5cbiAgICAgICAgICAgICAgICAgICAgPENob29zZVBhdGllbnQgLz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY2FzZSBcImhvbWVcIjoge1xuICAgICAgICAgICAgICAgIHJldHVybiA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICA8VmlzaXRUaW1lIHR5cGU9XCJob21lXCIvPlxuICAgICAgICAgICAgICAgICAgICA8Q2hvb3NlUGF0aWVudCAvPlxuICAgICAgICAgICAgICAgICAgICA8UGlja3VwQWRkcmVzcyAvPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgbGV0IHRlc3RzID0gW11cbiAgICAgICAgbGV0IGZpbmFsUHJpY2UgPSAwXG4gICAgICAgIGxldCBsYWJEZXRhaWwgPSB7fVxuXG4gICAgICAgIGlmICh0aGlzLnByb3BzLkxBQlNbdGhpcy5zdGF0ZS5zZWxlY3RlZExhYl0pIHtcbiAgICAgICAgICAgIGxhYkRldGFpbCA9IHRoaXMucHJvcHMuTEFCU1t0aGlzLnN0YXRlLnNlbGVjdGVkTGFiXS5sYWJcbiAgICAgICAgICAgIHRlc3RzID0gdGhpcy5wcm9wcy5zZWxlY3RlZENyaXRlcmlhcy5maWx0ZXIoeCA9PiB4LnR5cGUgPT0gJ3Rlc3QnKS5tYXAoKHRlc3QsIGkpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgcHJpY2UgPSAwXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5MQUJTW3RoaXMuc3RhdGUuc2VsZWN0ZWRMYWJdLnRlc3RzLm1hcCgodHdwKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0d3AudGVzdF9pZCA9PSB0ZXN0LmlkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwcmljZSA9IHR3cC5tcnBcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgZmluYWxQcmljZSArPSBwcmljZVxuICAgICAgICAgICAgICAgIHJldHVybiA8cCBrZXk9e2l9IGNsYXNzTmFtZT1cInRlc3QtbGlzdFwiPnt0ZXN0Lm5hbWV9PHNwYW4gY2xhc3NOYW1lPVwiZmxvYXQtcmlnaHQgZnctNzAwXCI+UnMuIHtwcmljZX08L3NwYW4+PC9wPlxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIDxoZWFkZXIgY2xhc3NOYW1lPVwic2tpbi13aGl0ZSBmaXhlZCBob3Jpem9udGFsIHRvcCBiZHItMSBib3R0b20gbGlnaHRcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250YWluZXItZmx1aWRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtMlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dWwgY2xhc3NOYW1lPVwiaW5saW5lLWxpc3RcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaSBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5oaXN0b3J5LmdvKC0xKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfX0+PHNwYW4gY2xhc3NOYW1lPVwiaWNvbiBpY29uLXNtIHRleHQtbWlkZGxlIGJhY2staWNvbi13aGl0ZVwiPjxpbWcgc3JjPVwiL2Fzc2V0cy9pbWcvY3VzdG9tZXItaWNvbnMvYmFjay1pY29uLnBuZ1wiIGNsYXNzTmFtZT1cImltZy1mbHVpZFwiIC8+PC9zcGFuPjwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtOFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImhlYWRlci10aXRsZSBmdy03MDAgY2FwaXRhbGl6ZSB0ZXh0LWNlbnRlclwiPkJvb2tpbmcgQ29uZmlybWF0aW9uPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtMlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7LyogPHVsIGNsYXNzPVwiaW5saW5lLWxpc3QgZmxvYXQtcmlnaHQgdXNlci1ub3RpZmljYXRpb24tYWN0aW9uXCI+XG5cdFx0XHRcdFx0XHQ8bGk+PHNwYW4gY2xhc3M9XCJpY29uIGljb24tbWQgdGV4dC1taWRkbGVcIj48aW1nIHNyYz1cIi9hc3NldHMvaW1nL2N1c3RvbWVyLWljb25zL3VzZXIuc3ZnXCIgY2xhc3M9XCJpbWctZmx1aWRcIj48L3NwYW4+PC9saT5cblx0XHRcdFx0XHRcdDxsaT48c3BhbiBjbGFzcz1cImljb24gaWNvbi1tZCB0ZXh0LW1pZGRsZSBub3RpZmljYXRpb24taWNvblwiPjxpbWcgc3JjPVwiL2Fzc2V0cy9pbWcvY3VzdG9tZXItaWNvbnMvbm90aWZpY2F0aW9uLnN2Z1wiIGNsYXNzPVwiaW1nLWZsdWlkXCI+IDxzcGFuIGNsYXNzPVwibm90aWZpY2F0aW9uLWFsZXJ0XCI+PC9zcGFuPjwvc3Bhbj48L2xpPlxuXHRcdFx0XHRcdDwvdWw+ICovfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvaGVhZGVyPlxuXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnByb3BzLkxBQlNbdGhpcy5zdGF0ZS5zZWxlY3RlZExhYl0gP1xuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c2VjdGlvbiBjbGFzc05hbWU9XCJ3cmFwIGJvb2tpbmctY29uZmlybS1zY3JlZW5cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250YWluZXItZmx1aWRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtMTJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3aWRnZXQgbXJ0LTEwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIndpZGdldC1oZWFkZXIgYmRyLTEgYm90dG9tIGxpZ2h0IHRleHQtY2VudGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHVsIGNsYXNzTmFtZT1cImlubGluZS1saXN0IGJvb2tpbmctdHlwZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGk+PGxhYmVsIGNsYXNzTmFtZT1cInJhZGlvLWlubGluZSB0ZXh0LW1kIGZ3LTcwMCB0ZXh0LXByaW1hcnlcIj48aW5wdXQgdHlwZT1cInJhZGlvXCIgbmFtZT1cIm9wdHJhZGlvXCIgb25DaGFuZ2U9e3RoaXMuaGFuZGxlUGlja3VwVHlwZS5iaW5kKHRoaXMpfSB2YWx1ZT1cImhvbWVcIiBjaGVja2VkPXt0aGlzLnN0YXRlLnBpY2t1cFR5cGUgPT0gJ2hvbWUnfSAvPiBIb21lIFBpY2stdXA8L2xhYmVsPjwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaT48bGFiZWwgY2xhc3NOYW1lPVwicmFkaW8taW5saW5lIHRleHQtbWQgZnctNzAwIHRleHQtcHJpbWFyeVwiPjxpbnB1dCB0eXBlPVwicmFkaW9cIiBuYW1lPVwib3B0cmFkaW9cIiBvbkNoYW5nZT17dGhpcy5oYW5kbGVQaWNrdXBUeXBlLmJpbmQodGhpcyl9IHZhbHVlPVwibGFiXCIgY2hlY2tlZD17dGhpcy5zdGF0ZS5waWNrdXBUeXBlID09ICdsYWInfSAvPiBMYWIgVmlzaXQ8L2xhYmVsPjwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3aWRnZXQtY29udGVudFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibGFiLWRldGFpbHNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGltZyBzcmM9XCIvYXNzZXRzL2ltZy9jdXN0b21lci1pY29ucy9sYWIxLnBuZ1wiIGNsYXNzTmFtZT1cImltZy1mbHVpZFwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibGFiLXRpdGxlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDQgY2xhc3NOYW1lPVwiZnctNzAwIHRleHQtbWQgdGl0bGVcIj57bGFiRGV0YWlsLm5hbWV9PC9oND5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cImZ3LTUwMCB0ZXh0LXNtIHRleHQtbGlnaHRcIj57bGFiRGV0YWlsLmFkZHJlc3N9PC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt0aGlzLmdldFNlbGVjdG9ycygpfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsYWItdmlzaXQtdGltZSB0ZXN0LXJlcG9ydFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDQgY2xhc3NOYW1lPVwidGl0bGVcIj48c3Bhbj48aW1nIHNyYz1cIi9hc3NldHMvaW1nL2N1c3RvbWVyLWljb25zL3Rlc3Quc3ZnXCIgLz48L3NwYW4+VGVzdHMgPHNwYW4gY2xhc3NOYW1lPVwiZmxvYXQtcmlnaHRcIj48YSBvbkNsaWNrPXt0aGlzLm9wZW5UZXN0cy5iaW5kKHRoaXMpfSBjbGFzc05hbWU9XCJ0ZXh0LXByaW1hcnkgZnctNzAwIHRleHQtc21cIj5DaGFuZ2UgVGVzdHM8L2E+PC9zcGFuPjwvaDQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt0ZXN0c31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NlY3Rpb24+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cInYtYnRuIHYtYnRuLXByaW1hcnkgYnRuLWxnIGZpeGVkIGhvcml6b250YWwgYm90dG9tIG5vLXJvdW5kIGJ0bi1sZyB0ZXh0LWxnXCI+UHJvY2VlZCB0byBQYXkgUnMuIHtmaW5hbFByaWNlfTwvYnV0dG9uPlxuXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj4gOiA8TG9hZGVyIC8+XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgQm9va2luZ1N1bW1hcnlWaWV3XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5jbGFzcyBDaG9vc2VQYXRpZW50IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcblxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxhYi12aXNpdC10aW1lXCI+XG4gICAgICAgICAgICAgICAgPGg0IGNsYXNzTmFtZT1cInRpdGxlXCI+PHNwYW4+PGltZyBzcmM9XCIvYXNzZXRzL2ltZy9jdXN0b21lci1pY29ucy9jbG9jay5zdmdcIiAvPjwvc3Bhbj5QYXRpZW50IERldGFpbHMgPHNwYW4gY2xhc3NOYW1lPVwiZmxvYXQtcmlnaHRcIj48YSBocmVmPVwiI1wiIGNsYXNzTmFtZT1cInRleHQtcHJpbWFyeSBmdy03MDAgdGV4dC1zbVwiPlBpY2sgUGF0aWVudDwvYT48L3NwYW4+PC9oND5cbiAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJkYXRlLXRpbWVcIj5EdW1teSBVc2VyPC9wPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IENob29zZVBhdGllbnRcbiIsImltcG9ydCBCb29raW5nU3VtbWFyeVZpZXcgZnJvbSAnLi9Cb29raW5nU3VtbWFyeVZpZXcuanMnXG5cbmV4cG9ydCBkZWZhdWx0IEJvb2tpbmdTdW1tYXJ5VmlldyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmNsYXNzIFBpY2t1cEFkZHJlc3MgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgICAgICB0aGlzLnN0YXRlID0ge1xuXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibGFiLXZpc2l0LXRpbWVcIj5cbiAgICAgICAgICAgICAgICA8aDQgY2xhc3NOYW1lPVwidGl0bGVcIj48c3Bhbj48aW1nIHNyYz1cIi9hc3NldHMvaW1nL2N1c3RvbWVyLWljb25zL2Nsb2NrLnN2Z1wiIC8+PC9zcGFuPlBpY2t1cCBBZGRyZXNzIDxzcGFuIGNsYXNzTmFtZT1cImZsb2F0LXJpZ2h0XCI+PGEgaHJlZj1cIiNcIiBjbGFzc05hbWU9XCJ0ZXh0LXByaW1hcnkgZnctNzAwIHRleHQtc21cIj5DaGFuZ2UgQWRkcmVzczwvYT48L3NwYW4+PC9oND5cbiAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJkYXRlLXRpbWVcIj4xOHRoIEFwcmlsIHwgMzozMCBQTTwvcD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBQaWNrdXBBZGRyZXNzXG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5jbGFzcyBWaXNpdFRpbWUgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgICAgICB0aGlzLnN0YXRlID0ge1xuXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibGFiLXZpc2l0LXRpbWVcIj5cbiAgICAgICAgICAgICAgICA8aDQgY2xhc3NOYW1lPVwidGl0bGVcIj48c3Bhbj48aW1nIHNyYz1cIi9hc3NldHMvaW1nL2N1c3RvbWVyLWljb25zL2Nsb2NrLnN2Z1wiIC8+PC9zcGFuPlZpc2l0IHRpbWUgPHNwYW4gY2xhc3NOYW1lPVwiZmxvYXQtcmlnaHRcIj48YSBocmVmPVwiI1wiIGNsYXNzTmFtZT1cInRleHQtcHJpbWFyeSBmdy03MDAgdGV4dC1zbVwiPkNoYW5nZSBUaW1lPC9hPjwvc3Bhbj48L2g0PlxuICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cImRhdGUtdGltZVwiPjE4dGggQXByaWwgfCAzOjMwIFBNPC9wPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IFZpc2l0VGltZVxuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cbmltcG9ydCBMYWJUZXN0cyBmcm9tICcuLi9sYWJUZXN0cydcblxuY2xhc3MgTGFiRGV0YWlscyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxzZWN0aW9uIGNsYXNzTmFtZT1cIndyYXAgcHJvZmlsZS1ib29rLXNjcmVlblwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGFpbmVyLWZsdWlkXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC0xMlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwid2lkZ2V0IHByb2ZpbGUtYm9va1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIndpZGdldC1oZWFkZXIgcGItaGVhZGVyIHRleHQtY2VudGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBiLWxvZ29cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW1nIHNyYz1cIi9hc3NldHMvaW1nL2N1c3RvbWVyLWljb25zL2xhYjEucG5nXCIgY2xhc3NOYW1lPVwiaW1nLWZsdWlkXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGg0IGNsYXNzTmFtZT1cIndpZGdldC10aXRsZSBwYi10aXRsZVwiPlNSTCBEaWdub3N0aWNzPC9oND5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cImxvY2F0aW9uXCI+U2VjdG9yIDUyIEd1cmdhb24gfCA8c3BhbiBjbGFzc05hbWU9XCJjdC1pbWcgY3QtaW1nLXhzXCI+PGltZyBzcmM9XCIvYXNzZXRzL2ltZy9jdXN0b21lci1pY29ucy9tYXAtbWFya2VyLnN2Z1wiIGNsYXNzTmFtZT1cImltZy1mbHVpZFwiIC8+PC9zcGFuPjEuNUtNPC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHVsIGNsYXNzTmFtZT1cImxpc3QgdGltZS1jb250YWN0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmdy03MDAgdGV4dC1zbVwiPlRpbWluZzogLTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgNzozMCBBTSB0byA4OjMwIFBNXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cIm9wZW4tY2xvc2VcIj5PcGVuIFRvZGF5PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmdy03MDAgdGV4dC1zbVwiPkNvbnRhY3Q6IC08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDAxMjAgMTIzNDU2NywgMDEyMCA3NjU0MzIxXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cIm9wZW4tY2xvc2VcIj5DYWxsIE5vdzwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPExhYlRlc3RzIHsuLi50aGlzLnByb3BzfSAvPlxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwid2lkZ2V0LWNvbnRlbnQgcGItZGV0YWlscyBwYi1sb2NhdGlvblwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGg0IGNsYXNzTmFtZT1cIndjLXRpdGxlIHRleHQtbWQgZnctNzAwXCI+TG9jYXRpb248L2g0PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZGRyZXNzLWRldGFpbHNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW1nIHNyYz1cIi9hc3NldHMvaW1nL2N1c3RvbWVyLWljb25zL21hcC1pY29uLnBuZ1wiIGNsYXNzTmFtZT1cImltZy1mbHVpZCBhZGQtbWFwXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJhZGQtaW5mb1wiPjE5NiwgSHVkYSBQbG90LCBOZWFyLCBEZXZpbmRlciBWaWhhciwgU2VjdG9yIDU2LCBHdXJ1Z3JhbSwgSGFyeWFuYSAxMjIwMTE8L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGItdmlldyB0ZXh0LWxlZnRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YSBocmVmPVwiI1wiIGNsYXNzTmFtZT1cImxpbmstdGV4dCB0ZXh0LW1kIGZ3LTcwMFwiPlZpZXcgaW4gR29vZ2xlIE1hcDwvYT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3aWRnZXQtY29udGVudCBwYi1kZXRhaWxzIHBiLWZhY2lsaXR5XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDQgY2xhc3NOYW1lPVwid2MtdGl0bGUgdGV4dC1tZCBmdy03MDBcIj5GYWNpbGl0eTwvaDQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dWwgY2xhc3NOYW1lPVwibGlzdCBwYi1saXN0IGZhY2lsdHktbGlzdFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaT5QYXJraW5nIEF2YWlsYWJsZTwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpPkNhcmQgQWNjZXB0ZWQ8L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaT5FIFJlcG9ydCBBdmFpbGFibGU8L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaT5Ib21lIENoZWt1cCBBdmFpbGFibGU8L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwid2lkZ2V0LWNvbnRlbnQgcGItZGV0YWlscyBwYi1hYm91dFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGg0IGNsYXNzTmFtZT1cIndjLXRpdGxlIHRleHQtbWQgZnctNzAwXCI+QWJvdXQ8L2g0PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHA+TG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFtZXQsIGNvbnNlY3RldHVyIGFkaXBpc2ljaW5nIGVsaXQsIHNlZCBkbyBlaXVzbW9kXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBvciBpbmNpZGlkdW50IHV0IGxhYm9yZSBldCBkb2xvcmUgbWFnbmEgYWxpcXVhLiBVdCBlbmltIGFkIG1pbmltIHZlbmlhbSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHF1aXMgbm9zdHJ1ZCBleGVyY2l0YXRpb24gdWxsYW1jbyBsYWJvcmlzIG5pc2lcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L3NlY3Rpb24+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IExhYkRldGFpbHNcbiIsImltcG9ydCBMYWJEZXRhaWxzIGZyb20gJy4vTGFiRGV0YWlsLmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBMYWJEZXRhaWxzIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuY2xhc3MgTGFiUHJvZmlsZUNhcmQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgIH1cblxuICAgIG9wZW5MYWIoaWQpe1xuICAgICAgICB0aGlzLnByb3BzLmhpc3RvcnkucHVzaChgL2xhYi8ke2lkfWApXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIGxldCB7IHByaWNlLCBsYWIgfSA9IHRoaXMucHJvcHMuZGV0YWlsc1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIndpZGdldCBjYXJkXCIgb25DbGljaz17dGhpcy5vcGVuTGFiLmJpbmQodGhpcyx0aGlzLnByb3BzLmRldGFpbHMubGFiLmlkKX0+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3aWRnZXQtY29udGVudCBjYXJkLWNvbnRlbnQgYm9vay1jYXJkXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibG9nby1yYXR0aW5nXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJjdC1pbWcgbGFiLWljb25cIj48aW1nIHNyYz1cIi9hc3NldHMvaW1nL2N1c3RvbWVyLWljb25zL2xhYjEucG5nXCIgY2xhc3NOYW1lPVwiaW1nLWZsdWlkXCIgLz48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dWwgY2xhc3NOYW1lPVwiaW5saW5lLWxpc3QgcmF0dGluZ1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaT48c3BhbiBjbGFzc05hbWU9XCJjdC1pbWcgY3QtaW1nLXhzIHN0YXItaWNvblwiPjxpbWcgc3JjPVwiL2Fzc2V0cy9pbWcvY3VzdG9tZXItaWNvbnMvc3Rhci5zdmdcIiBjbGFzc05hbWU9XCJpbWctZmx1aWRcIiAvPjwvc3Bhbj48L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaT48c3BhbiBjbGFzc05hbWU9XCJjdC1pbWcgY3QtaW1nLXhzIHN0YXItaWNvblwiPjxpbWcgc3JjPVwiL2Fzc2V0cy9pbWcvY3VzdG9tZXItaWNvbnMvc3Rhci5zdmdcIiBjbGFzc05hbWU9XCJpbWctZmx1aWRcIiAvPjwvc3Bhbj48L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaT48c3BhbiBjbGFzc05hbWU9XCJjdC1pbWcgY3QtaW1nLXhzIHN0YXItaWNvblwiPjxpbWcgc3JjPVwiL2Fzc2V0cy9pbWcvY3VzdG9tZXItaWNvbnMvc3Rhci5zdmdcIiBjbGFzc05hbWU9XCJpbWctZmx1aWRcIiAvPjwvc3Bhbj48L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaT48c3BhbiBjbGFzc05hbWU9XCJjdC1pbWcgY3QtaW1nLXhzIHN0YXItaWNvblwiPjxpbWcgc3JjPVwiL2Fzc2V0cy9pbWcvY3VzdG9tZXItaWNvbnMvc3Rhci5zdmdcIiBjbGFzc05hbWU9XCJpbWctZmx1aWRcIiAvPjwvc3Bhbj48L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaT48c3BhbiBjbGFzc05hbWU9XCJjdC1pbWcgY3QtaW1nLXhzIHN0YXItaWNvblwiPjxpbWcgc3JjPVwiL2Fzc2V0cy9pbWcvY3VzdG9tZXItaWNvbnMvaGFsZi1zdGFyLnN2Z1wiIGNsYXNzTmFtZT1cImltZy1mbHVpZFwiIC8+PC9zcGFuPjwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJ2LWJ0biB2LWJ0bi1wcmltYXJ5IHBpY2t1cC1idG5cIj5QaWNrdXAgQXZhaWxhYmxlPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJvb2stY2FyZC1jb250ZW50XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aDQgY2xhc3NOYW1lPVwiYm9vay1jYXJ0LXRpdGxlXCI+e2xhYi5uYW1lfTwvaDQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJkZXNjXCI+Qmxvb2QgVGVzdCwgUGF0aG9sb2d5IFVsdHJhc291bmQsIE1SSSwgQ1RJIFNlY3RvciA1MiBHdXJnYW9uIHwgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1wcmltYXJ5IGZ3LTcwMFwiPjEuNSBLTTwvc3Bhbj48L3A+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwid2lkZ2V0LWZvb3RlciBjYXJkLWZvb3RlclwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtNlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cImxhYi1wcmljZVwiPlRvdGFsIFJzIHtwcmljZX08L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLTYgdGV4dC1yaWdodFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwidi1idG4gdi1idG4tcHJpbWFyeSBidG4tbWRcIj5Cb29rIExhYjwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IExhYlByb2ZpbGVDYXJkXG4iLCJpbXBvcnQgTGFiUHJvZmlsZUNhcmQgZnJvbSAnLi9MYWJQcm9maWxlQ2FyZC5qcydcblxuZXhwb3J0IGRlZmF1bHQgTGFiUHJvZmlsZUNhcmQiLCJpbXBvcnQgTGFiVGVzdHMgZnJvbSAnLi9sYWJUZXN0cydcblxuZXhwb3J0IGRlZmF1bHQgTGFiVGVzdHMiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcblxuY2xhc3MgTGFiVGVzdHMgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgfVxuXG4gICAgb3BlblRlc3RzKCkge1xuICAgICAgICB0aGlzLnByb3BzLmhpc3RvcnkucHVzaChgL2xhYi8ke3RoaXMucHJvcHMuZGF0YS5sYWIuaWR9L3Rlc3RzYClcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgbGV0IHRlc3RzID0gW11cbiAgICAgICAgaWYgKHRoaXMucHJvcHMuZGF0YS50ZXN0cyAmJiB0aGlzLnByb3BzLmRhdGEudGVzdHMubGVuZ3RoKSB7XG4gICAgICAgICAgICB0ZXN0cyA9IHRoaXMucHJvcHMuZGF0YS50ZXN0cy5tYXAoKHRlc3QsIGkpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gPGxpIGtleT17aX0+e3Rlc3QudGVzdC5uYW1lfSA8c3BhbiBjbGFzc05hbWU9XCJ0ZXN0LXByaWNlXCI+UnMge3Rlc3QubXJwfTwvc3Bhbj48L2xpPlxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIndpZGdldC1jb250ZW50IHBiLWRldGFpbHMgcGItdGVzdFwiPlxuICAgICAgICAgICAgICAgIDxoNCBjbGFzc05hbWU9XCJ3Yy10aXRsZSB0ZXh0LW1kIGZ3LTcwMFwiPlRlc3RzICh7dGVzdHMubGVuZ3RofSk8L2g0PlxuICAgICAgICAgICAgICAgIDx1bCBjbGFzc05hbWU9XCJsaXN0IHBiLWxpc3QgcGItdGVzdC1saXN0XCI+XG4gICAgICAgICAgICAgICAgICAgIHt0ZXN0cy5zbGljZSgwLDMpfVxuICAgICAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwYi12aWV3IHRleHQtcmlnaHRcIj5cbiAgICAgICAgICAgICAgICAgICAgPGEgY2xhc3NOYW1lPVwibGluay10ZXh0IHRleHQtbWQgZnctNzAwXCIgb25DbGljaz17dGhpcy5vcGVuVGVzdHMuYmluZCh0aGlzKX0+VmlldyBBbGw8L2E+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgTGFiVGVzdHNcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG5pbXBvcnQgRXhwYW5zaW9uUGFuZWwsIHtcbiAgICBFeHBhbnNpb25QYW5lbFN1bW1hcnksXG4gICAgRXhwYW5zaW9uUGFuZWxEZXRhaWxzLFxufSBmcm9tICdtYXRlcmlhbC11aS9FeHBhbnNpb25QYW5lbCc7XG5pbXBvcnQgRXhwYW5kTW9yZUljb24gZnJvbSAnbWF0ZXJpYWwtdWktaWNvbnMvRXhwYW5kTW9yZSc7XG5cblxuY2xhc3MgT3JkZXJEZXRhaWxzIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcblxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICBsZXQgcHJpY2VfYnJlYWt1cCA9IFtdXG4gICAgICAgIGxldCB0b3RhbFByaWNlID0gMFxuICAgICAgICBsZXQgdG90YWxUZXN0cyA9IDBcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuZGF0YS5wcmljZV9icmVha3VwICYmIHRoaXMucHJvcHMuZGF0YS5wcmljZV9icmVha3VwLmJyZWFrdXApIHtcbiAgICAgICAgICAgIHByaWNlX2JyZWFrdXAgPSB0aGlzLnByb3BzLmRhdGEucHJpY2VfYnJlYWt1cC5icmVha3VwLm1hcCgodGVzdCwgaSkgPT4ge1xuICAgICAgICAgICAgICAgIHRvdGFsUHJpY2UgKz0gdGVzdC5hbW91bnRcbiAgICAgICAgICAgICAgICB0b3RhbFRlc3RzKytcbiAgICAgICAgICAgICAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9XCJ0ZXN0UHJpY2VSb3dcIiBrZXk9e2l9PlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0bmFtZVwiPnt0ZXN0Lm5hbWV9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0YW1vdW50XCI+UnMuIHt0ZXN0LmFtb3VudH08L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwib3JkZXJEZXRhaWxzXCI+XG4gICAgICAgICAgICAgICAgPEV4cGFuc2lvblBhbmVsPlxuICAgICAgICAgICAgICAgICAgICA8RXhwYW5zaW9uUGFuZWxTdW1tYXJ5IGV4cGFuZEljb249ezxFeHBhbmRNb3JlSWNvbiAvPn0+XG4gICAgICAgICAgICAgICAgICAgICAgICBPcmRlciBEZXRhaWxzIC0ge3RvdGFsVGVzdHN9IFRlc3RzXG4gICAgICAgICAgICAgICAgICAgIDwvRXhwYW5zaW9uUGFuZWxTdW1tYXJ5PlxuICAgICAgICAgICAgICAgICAgICA8RXhwYW5zaW9uUGFuZWxEZXRhaWxzPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwcmljZUNvbnRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7cHJpY2VfYnJlYWt1cH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRlc3RUb3RhbFJvd1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0bmFtZVwiPntcIlRvdGFsXCJ9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0YW1vdW50XCI+UnMuIHt0b3RhbFByaWNlfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRlc3RUb3RhbFJvd1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0bmFtZVwiPntcIkdTVFwifTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGFtb3VudFwiPlJzLiB7dG90YWxQcmljZSoxLjE4fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRlc3RUb3RhbFJvd1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0bmFtZVwiPntcIlBheWFibGVcIn08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRhbW91bnRcIj5Scy4ge3RvdGFsUHJpY2UqMS4xOH08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9FeHBhbnNpb25QYW5lbERldGFpbHM+XG4gICAgICAgICAgICAgICAgPC9FeHBhbnNpb25QYW5lbD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBPcmRlckRldGFpbHNcbiIsImltcG9ydCBPcmRlckRldGFpbHMgZnJvbSAnLi9PcmRlckRldGFpbHMuanMnXG5cbmV4cG9ydCBkZWZhdWx0IE9yZGVyRGV0YWlscyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCBMYWJEZXRhaWxzIGZyb20gJy4uL2NvbW1vbnMvbGFiRGV0YWlscy9pbmRleC5qcydcbmltcG9ydCBMb2FkZXIgZnJvbSAnLi4vLi4vY29tbW9ucy9Mb2FkZXInXG5cbmNsYXNzIExhYlZpZXcgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgc2VsZWN0ZWRMYWI6IHRoaXMucHJvcHMubWF0Y2gucGFyYW1zLmlkXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBib29rTGFiKCkge1xuICAgICAgICB0aGlzLnByb3BzLmhpc3RvcnkucHVzaChgL2xhYi8ke3RoaXMuc3RhdGUuc2VsZWN0ZWRMYWJ9L2Jvb2tgKVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICA8aGVhZGVyIGNsYXNzTmFtZT1cInNraW4tcHJpbWFyeSBmaXhlZCBob3Jpem9udGFsIHRvcCBwcm9maWxlLWJvb2staGVhZGVyXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGFpbmVyLWZsdWlkXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLTRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJoZWFkZXItdGl0bGUgZnctNzAwIGNhcGl0YWxpemUgdGV4dC13aGl0ZVwiPklDT048L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC00XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtNFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dWwgY2xhc3NOYW1lPVwiaW5saW5lLWxpc3QgZmxvYXQtcmlnaHQgdXNlci1ub3RpZmljYXRpb24tYWN0aW9uXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGk+PHNwYW4gY2xhc3NOYW1lPVwiaWNvbiBpY29uLW1kIHRleHQtbWlkZGxlXCI+PGltZyBzcmM9XCIvYXNzZXRzL2ltZy9jdXN0b21lci1pY29ucy91c2VyLnN2Z1wiIGNsYXNzTmFtZT1cImltZy1mbHVpZFwiIC8+PC9zcGFuPjwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGk+PHNwYW4gY2xhc3NOYW1lPVwiaWNvbiBpY29uLW1kIHRleHQtbWlkZGxlIG5vdGlmaWNhdGlvbi1pY29uXCI+PGltZyBzcmM9XCIvYXNzZXRzL2ltZy9jdXN0b21lci1pY29ucy9ub3RpZmljYXRpb24uc3ZnXCIgY2xhc3NOYW1lPVwiaW1nLWZsdWlkXCIgLz4gPHNwYW4gY2xhc3NOYW1lPVwibm90aWZpY2F0aW9uLWFsZXJ0XCIgLz48L3NwYW4+PC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2hlYWRlcj5cblxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5MQUJTW3RoaXMuc3RhdGUuc2VsZWN0ZWRMYWJdID9cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJza2luLXByaW1hcnkgZW1wdHktaGVhZGVyIFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPExhYkRldGFpbHMgey4uLnRoaXMucHJvcHN9IGRhdGE9e3RoaXMucHJvcHMuTEFCU1t0aGlzLnN0YXRlLnNlbGVjdGVkTGFiXX0gLz5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gb25DbGljaz17dGhpcy5ib29rTGFiLmJpbmQodGhpcyl9IGNsYXNzTmFtZT1cInYtYnRuIHYtYnRuLXByaW1hcnkgYnRuLWxnIGZpeGVkIGhvcml6b250YWwgYm90dG9tIG5vLXJvdW5kIGJ0bi1sZyB0ZXh0LWxnXCI+PHNwYW4gY2xhc3NOYW1lPVwidGV4dC14cyBzZWxlY3RlZC1vcHRpb25cIj4oe3RoaXMucHJvcHMuc2VsZWN0ZWRDcml0ZXJpYXMubGVuZ3RofSBTZWxlY3RlZCkgPC9zcGFuPkJvb2tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cblxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+IDogPExvYWRlciAvPlxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBMYWJWaWV3XG4iLCJpbXBvcnQgTGFiVmlldyBmcm9tICcuL0xhYlZpZXcuanMnXG5cbmV4cG9ydCBkZWZhdWx0IExhYlZpZXciLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcblxuaW1wb3J0IExhYkRldGFpbHMgZnJvbSAnLi4vY29tbW9ucy9sYWJEZXRhaWxzL2luZGV4LmpzJ1xuaW1wb3J0IE9yZGVyRGV0YWlscyBmcm9tICcuLi9jb21tb25zL29yZGVyRGV0YWlscy9pbmRleC5qcydcbmltcG9ydCBEZXRhaWxzRm9ybSBmcm9tICcuL2RldGFpbHNGb3JtL2luZGV4LmpzJ1xuaW1wb3J0IEFkZHJlc3NGb3JtIGZyb20gJy4vYWRkcmVzc0Zvcm0vaW5kZXguanMnO1xuXG5jbGFzcyBQYXRpZW50RGV0YWlsc1ZpZXcgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgc2VsZWN0ZWRMYWI6IG51bGwsXG4gICAgICAgICAgICBzZWxlY3RlZFRlc3RzOiBcIlwiLFxuICAgICAgICAgICAgc2VsZWN0ZWRTbG90OiBudWxsLFxuICAgICAgICAgICAgc2VsZWN0ZWRTbG90U3RhcnQgOiBudWxsLFxuICAgICAgICAgICAgc2VsZWN0ZWRTbG90RW5kIDogbnVsbFxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0TG9jYXRpb25QYXJhbSh0YWcpIHtcbiAgICAgICAgLy8gdGhpcyBBUEkgYXNzdW1lcyB0aGUgY29udGV4dCBvZiByZWFjdC1yb3V0ZXItNFxuICAgICAgICBjb25zdCBwYXJhbVN0cmluZyA9IHRoaXMucHJvcHMubG9jYXRpb24uc2VhcmNoXG4gICAgICAgIGNvbnN0IHBhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXMocGFyYW1TdHJpbmcpXG4gICAgICAgIHJldHVybiBwYXJhbXMuZ2V0KHRhZylcbiAgICB9XG5cbiAgICBwcm9jZWVkKCl7XG4gICAgICAgIHRoaXMuY29udGV4dC5yb3V0ZXIuaGlzdG9yeS5wdXNoKCcvbGFiL2Jvb2tpbmcvc3VtbWFyeS9JVUhCVUg4Nzg3VUhCJylcbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgbGV0IGxhYklkID0gdGhpcy5wcm9wcy5tYXRjaC5wYXJhbXMuaWRcbiAgICAgICAgbGV0IHRlc3RzID0gdGhpcy5nZXRMb2NhdGlvblBhcmFtKCd0ZXN0cycpXG4gICAgICAgIGxldCBzZWxlY3RlZFNsb3RTdGFydCA9IHRoaXMuZ2V0TG9jYXRpb25QYXJhbSgndF9zdGFydCcpXG4gICAgICAgIHNlbGVjdGVkU2xvdFN0YXJ0ID0gbmV3IERhdGUocGFyc2VGbG9hdChzZWxlY3RlZFNsb3RTdGFydCkpXG4gICAgICAgIHNlbGVjdGVkU2xvdFN0YXJ0ID0gc2VsZWN0ZWRTbG90U3RhcnQudG9TdHJpbmcoKVxuICAgICAgICBsZXQgc2VsZWN0ZWRTbG90RW5kID0gdGhpcy5nZXRMb2NhdGlvblBhcmFtKCd0X2VuZCcpXG4gICAgICAgIHNlbGVjdGVkU2xvdEVuZCA9IG5ldyBEYXRlKHBhcnNlRmxvYXQoc2VsZWN0ZWRTbG90RW5kKSlcbiAgICAgICAgc2VsZWN0ZWRTbG90RW5kID0gc2VsZWN0ZWRTbG90RW5kLnRvU3RyaW5nKClcbiAgICAgICAgaWYgKGxhYklkKSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgc2VsZWN0ZWRMYWI6IGxhYklkLCBzZWxlY3RlZFRlc3RzOiB0ZXN0cywgc2VsZWN0ZWRTbG90U3RhcnQsIHNlbGVjdGVkU2xvdEVuZCB9KVxuICAgICAgICAgICAgdGhpcy5wcm9wcy5nZXRMYWJCeUlkKGxhYklkKVxuXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdGF0aWMgY29udGV4dFR5cGVzID0ge1xuICAgICAgICByb3V0ZXI6ICgpID0+IG51bGxcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGF0aWVudERldGFpbHNcIj5cblxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5MQUJTW3RoaXMuc3RhdGUuc2VsZWN0ZWRMYWJdID9cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPExhYkRldGFpbHMgZGF0YT17dGhpcy5wcm9wcy5MQUJTW3RoaXMuc3RhdGUuc2VsZWN0ZWRMYWJdfSAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxPcmRlckRldGFpbHMgZGF0YT17dGhpcy5wcm9wcy5MQUJTW3RoaXMuc3RhdGUuc2VsZWN0ZWRMYWJdfSAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic2VsZWN0ZWRBcHBvaW50bWVudFNsb3RcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGg1PlNlbGVjdGVkIEFwcG9pbnRtZW50IFNsb3Q8L2g1PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJhcHBkYXRlXCI+QXBwb2ludG1lbnQgRGF0ZTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZGF0ZVwiPnsgdGhpcy5zdGF0ZS5zZWxlY3RlZFNsb3RTdGFydCB9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxEZXRhaWxzRm9ybSAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxBZGRyZXNzRm9ybSBjaXR5PVwiU2VsZWN0ZWQgdmFsdWVcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwicHJvY2VlZGJ0blwiIG9uQ2xpY2s9e3RoaXMucHJvY2VlZC5iaW5kKHRoaXMpfT5Qcm9jZWVkPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj4gOiBcIlwiXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgUGF0aWVudERldGFpbHNWaWV3XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcblxuY2xhc3MgQWRkcmVzc0Zvcm0gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgYWRkcmVzczonJyxcbiAgICAgICAgICAgIGxvY2FsaXR5OicnLFxuICAgICAgICAgICAgbGFuZG1hcms6JycsXG4gICAgICAgICAgICBwaW5jb2RlOicnLFxuICAgICAgICAgICAgY2l0eTpwcm9wcy5jaXR5XG5cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlucHV0SGFuZGxlcih3aGljaCwgZSl7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBbd2hpY2hdIDogZS50YXJnZXQudmFsdWUgfSlcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZGV0YWlsc0Zvcm1cIj5cbiAgICAgICAgICAgICAgICA8aDU+UGxlYXNlIHByb3ZpZGUgcGF0aWVudCBkZXRhaWxzPC9oNT5cblxuICAgICAgICAgICAgICAgIDxpbnB1dCB2YWx1ZT17dGhpcy5zdGF0ZS5hZGRyZXNzfSBvbkNoYW5nZT17dGhpcy5pbnB1dEhhbmRsZXIuYmluZCh0aGlzLCdhZGRyZXNzJyl9IGNsYXNzTmFtZT1cInB0bmFtZVwiIHBsYWNlaG9sZGVyPVwiQWRkcmVzcypcIiAvPlxuICAgICAgICAgICAgICAgIDxpbnB1dCB2YWx1ZT17dGhpcy5zdGF0ZS5sb2NhbGl0eX0gb25DaGFuZ2U9e3RoaXMuaW5wdXRIYW5kbGVyLmJpbmQodGhpcywnbG9jYWxpdHknKX0gY2xhc3NOYW1lPVwicHRuYW1lXCIgcGxhY2Vob2xkZXI9XCJMb2NhbGl0eSpcIiAvPlxuICAgICAgICAgICAgICAgIDxpbnB1dCB2YWx1ZT17dGhpcy5zdGF0ZS5sYW5kbWFya30gb25DaGFuZ2U9e3RoaXMuaW5wdXRIYW5kbGVyLmJpbmQodGhpcywnbGFuZG1hcmsnKX0gY2xhc3NOYW1lPVwicHRuYW1lXCIgcGxhY2Vob2xkZXI9XCJMYW5kbWFyaypcIiAvPlxuICAgICAgICAgICAgICAgIDxpbnB1dCB2YWx1ZT17dGhpcy5zdGF0ZS5waW5jb2RlfSBvbkNoYW5nZT17dGhpcy5pbnB1dEhhbmRsZXIuYmluZCh0aGlzLCdwaW5jb2RlJyl9IGNsYXNzTmFtZT1cInB0bW9iaWxlXCIgcGxhY2Vob2xkZXI9XCJQaW5jb2RlKlwiIC8+XG4gICAgICAgICAgICAgICAgey8qIDxpbnB1dCB2YWx1ZT17dGhpcy5zdGF0ZS5jaXR5fSBvbkNoYW5nZT17dGhpcy5pbnB1dEhhbmRsZXIuYmluZCh0aGlzLCdjaXR5Jyl9IGRpc2FibGVkIGNsYXNzTmFtZT1cInB0b3RwXCIgcGxhY2Vob2xkZXI9XCJDaXR5XCIgLz4gKi99XG5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBBZGRyZXNzRm9ybVxuIiwiaW1wb3J0IEFkZHJlc3NGb3JtIGZyb20gJy4vQWRkcmVzc0Zvcm0uanMnXG5cbmV4cG9ydCBkZWZhdWx0IEFkZHJlc3NGb3JtIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cbmNsYXNzIERldGFpbHNGb3JtIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIHBhdGllbnROYW1lIDogJycsXG4gICAgICAgICAgICBwYXRpZW50RW1haWwgOiAnJyxcbiAgICAgICAgICAgIHBhdGllbnRHZW5kZXIgOiAnbWFsZScsXG4gICAgICAgICAgICBtb2JpbGU6JycsXG4gICAgICAgICAgICBvdHAgOicnLFxuICAgICAgICAgICAgcGF0aWVudE1vYmlsZSA6ICcnXG5cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlucHV0SGFuZGxlcih3aGljaCwgZSl7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBbd2hpY2hdIDogZS50YXJnZXQudmFsdWUgfSlcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZGV0YWlsc0Zvcm1cIj5cbiAgICAgICAgICAgICAgICA8aDU+UGxlYXNlIHByb3ZpZGUgcGF0aWVudCBkZXRhaWxzPC9oNT5cblxuICAgICAgICAgICAgICAgIDxpbnB1dCB2YWx1ZT17dGhpcy5zdGF0ZS5wYXRpZW50TmFtZX0gb25DaGFuZ2U9e3RoaXMuaW5wdXRIYW5kbGVyLmJpbmQodGhpcywncGF0aWVudE5hbWUnKX0gY2xhc3NOYW1lPVwicHRuYW1lXCIgcGxhY2Vob2xkZXI9XCJQYXRpZW50IE5hbWUqXCIgLz5cbiAgICAgICAgICAgICAgICA8aW5wdXQgdmFsdWU9e3RoaXMuc3RhdGUucGF0aWVudEVtYWlsfSBvbkNoYW5nZT17dGhpcy5pbnB1dEhhbmRsZXIuYmluZCh0aGlzLCdwYXRpZW50RW1haWwnKX0gY2xhc3NOYW1lPVwicHRlbWFpbFwiIHBsYWNlaG9sZGVyPVwiRW1haWwqXCIgLz5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInB0Z2VuZGVyXCI+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuPkdlbmRlciA6PC9zcGFuPiBcbiAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJyYWRpb1wiIG5hbWU9XCJnZW5kZXJcIiB2YWx1ZT1cIm1hbGVcIiBjaGVja2VkPXt0aGlzLnN0YXRlLnBhdGllbnRHZW5kZXIgPT09IFwibWFsZVwifSBvbkNoYW5nZT17dGhpcy5pbnB1dEhhbmRsZXIuYmluZCh0aGlzLCdwYXRpZW50R2VuZGVyJyl9Lz4gTWFsZVxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInJhZGlvXCIgbmFtZT1cImdlbmRlclwiIHZhbHVlPVwiZmVtYWxlXCIgY2hlY2tlZD17dGhpcy5zdGF0ZS5wYXRpZW50R2VuZGVyID09PSBcImZlbWFsZVwifSBvbkNoYW5nZT17dGhpcy5pbnB1dEhhbmRsZXIuYmluZCh0aGlzLCdwYXRpZW50R2VuZGVyJyl9Lz4gRmVtYWxlXG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGlucHV0IHZhbHVlPXt0aGlzLnN0YXRlLm1vYmlsZX0gb25DaGFuZ2U9e3RoaXMuaW5wdXRIYW5kbGVyLmJpbmQodGhpcywnbW9iaWxlJyl9IGNsYXNzTmFtZT1cInB0bW9iaWxlXCIgcGxhY2Vob2xkZXI9XCJNb2JpbGUqXCIgLz5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cIm90cGJ0blwiPihSZSlTZW5kIE9UUDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDxpbnB1dCB2YWx1ZT17dGhpcy5zdGF0ZS5vdHB9IG9uQ2hhbmdlPXt0aGlzLmlucHV0SGFuZGxlci5iaW5kKHRoaXMsJ290cCcpfSBjbGFzc05hbWU9XCJwdG90cFwiIHBsYWNlaG9sZGVyPVwiRW50ZXIgT1RQKlwiIC8+XG4gICAgICAgICAgICAgICAgPGlucHV0IHZhbHVlPXt0aGlzLnN0YXRlLnBhdGllbnRNb2JpbGV9IG9uQ2hhbmdlPXt0aGlzLmlucHV0SGFuZGxlci5iaW5kKHRoaXMsJ3BhdGllbnRNb2JpbGUnKX0gY2xhc3NOYW1lPVwicHRtb2JpbGVcIiBwbGFjZWhvbGRlcj1cIlBhdGllbnQgTW9iaWxlKlwiIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICBcbiAgICAgICAgKTtcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgRGV0YWlsc0Zvcm1cbiIsImltcG9ydCBEZXRhaWxzRm9ybSBmcm9tICcuL0RldGFpbHNGb3JtLmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBEZXRhaWxzRm9ybSIsImltcG9ydCBQYXRpZW50RGV0YWlsc1ZpZXcgZnJvbSAnLi9QYXRpZW50RGV0YWlsc1ZpZXcuanMnXG5cbmV4cG9ydCBkZWZhdWx0IFBhdGllbnREZXRhaWxzVmlldyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG5pbXBvcnQgQ29tbW9ubHlTZWFyY2hlZCBmcm9tICcuLi8uLi9jb21tb25zL2NvbW1vbmx5U2VhcmNoZWQvaW5kZXguanMnXG5pbXBvcnQgQ3JpdGVyaWFTZWFyY2ggZnJvbSAnLi4vLi4vY29tbW9ucy9jcml0ZXJpYVNlYXJjaCdcblxuY2xhc3MgU2VhcmNoQ3JpdGVyaWFWaWV3IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcblxuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2VhcmNoUHJvY2VlZCgpIHtcbiAgICAgICAgbGV0IHNlYXJjaERhdGEgPSB7XG4gICAgICAgICAgICBzZWxlY3RlZENyaXRlcmlhcyA6IHRoaXMucHJvcHMuc2VsZWN0ZWRDcml0ZXJpYXMsXG4gICAgICAgICAgICBzZWxlY3RlZExvY2F0aW9uIDogdGhpcy5wcm9wcy5zZWxlY3RlZExvY2F0aW9uLFxuICAgICAgICB9XG4gICAgICAgIHNlYXJjaERhdGEgPSBlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc2VhcmNoRGF0YSkpXG4gICAgICAgIGxldCBmaWx0ZXJEYXRhID0gZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHRoaXMucHJvcHMuZmlsdGVyQ3JpdGVyaWEpKVxuICAgICAgICB0aGlzLnByb3BzLmhpc3RvcnkucHVzaChgL2R4L3NlYXJjaHJlc3VsdHM/c2VhcmNoPSR7c2VhcmNoRGF0YX0mZmlsdGVyPSR7ZmlsdGVyRGF0YX1gKVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdj5cblxuICAgICAgICAgICAgICAgIDxDcml0ZXJpYVNlYXJjaCB7Li4udGhpcy5wcm9wc30gY2hlY2tGb3JMb2FkPXt0aGlzLnByb3BzLkxPQURFRF9TRUFSQ0hfQ1JJVEVSSUFfTEFCfSB0aXRsZT1cIlNlYXJjaCBmb3IgVGVzdCBhbmQgTGFicy5cIj5cbiAgICAgICAgICAgICAgICAgICAgPHNlY3Rpb24gY2xhc3NOYW1lPVwid3JhcCB3cmFwLTEwMFwiPlxuXG4gICAgICAgICAgICAgICAgICAgICAgICA8Q29tbW9ubHlTZWFyY2hlZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRpbmc9XCJTZWxlY3RlZCBDcml0ZXJpYVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YT17dGhpcy5wcm9wcy5zZWxlY3RlZENyaXRlcmlhc31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZD17W119XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9nZ2xlPXt0aGlzLnByb3BzLnRvZ2dsZURpYWdub3Npc0NyaXRlcmlhLmJpbmQodGhpcyl9XG4gICAgICAgICAgICAgICAgICAgICAgICAvPlxuXG4gICAgICAgICAgICAgICAgICAgICAgICA8Q29tbW9ubHlTZWFyY2hlZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRpbmc9XCJDb21tb24gVGVzdFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cInRlc3RcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE9e3RoaXMucHJvcHMuY29tbW9uX3Rlc3RzfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkPXt0aGlzLnByb3BzLnNlbGVjdGVkQ3JpdGVyaWFzLmZpbHRlcih4ID0+IHgudHlwZSA9PSAndGVzdCcpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvZ2dsZT17dGhpcy5wcm9wcy50b2dnbGVEaWFnbm9zaXNDcml0ZXJpYS5iaW5kKHRoaXMpfVxuICAgICAgICAgICAgICAgICAgICAgICAgLz5cblxuICAgICAgICAgICAgICAgICAgICAgICAgPENvbW1vbmx5U2VhcmNoZWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWFkaW5nPVwiQ29tbW9uIENvbmRpdGlvbnNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJsYWJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE9e3RoaXMucHJvcHMuY29tbW9uX2NvbmRpdGlvbnN9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWQ9e3RoaXMucHJvcHMuc2VsZWN0ZWRDcml0ZXJpYXMuZmlsdGVyKHggPT4geC50eXBlID09ICdsYWInKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b2dnbGU9e3RoaXMucHJvcHMudG9nZ2xlRGlhZ25vc2lzQ3JpdGVyaWEuYmluZCh0aGlzKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxDb21tb25seVNlYXJjaGVkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGluZz1cIkNvbW1vbiBMYWJzXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwibGFiXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhPXt0aGlzLnByb3BzLnByZWZlcnJlZF9sYWJzfVxuICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgPC9zZWN0aW9uPlxuICAgICAgICAgICAgICAgIDwvQ3JpdGVyaWFTZWFyY2g+XG5cblxuXG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXt0aGlzLnNlYXJjaFByb2NlZWQuYmluZCh0aGlzKX0gY2xhc3NOYW1lPVwidi1idG4gdi1idG4tcHJpbWFyeSBidG4tbGcgZml4ZWQgaG9yaXpvbnRhbCBib3R0b20gbm8tcm91bmQgdGV4dC1sZ1wiPlNob3cgTGFiczwvYnV0dG9uPlxuXG5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgU2VhcmNoQ3JpdGVyaWFWaWV3XG4iLCJpbXBvcnQgU2VhcmNoQ3JpdGVyaWFWaWV3IGZyb20gJy4vU2VhcmNoQ3JpdGVyaWFWaWV3LmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBTZWFyY2hDcml0ZXJpYVZpZXciLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgTGFic0xpc3QgZnJvbSAnLi4vc2VhcmNoUmVzdWx0cy9sYWJzTGlzdC9pbmRleC5qcydcbmltcG9ydCBDcml0ZXJpYVNlYXJjaCBmcm9tICcuLi8uLi9jb21tb25zL2NyaXRlcmlhU2VhcmNoJ1xuaW1wb3J0IFRvcEJhciBmcm9tICcuL3RvcEJhcidcblxuY2xhc3MgU2VhcmNoUmVzdWx0c1ZpZXcgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgICAgICB0aGlzLnN0YXRlID0ge1xuXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgdGhpcy5nZXRMYWJzKClcbiAgICB9XG5cbiAgICBnZXRMYWJzKCkge1xuICAgICAgICBsZXQge1xuICAgICAgICAgICAgc2VsZWN0ZWRMb2NhdGlvbixcbiAgICAgICAgICAgIHNlbGVjdGVkQ3JpdGVyaWFzLFxuICAgICAgICAgICAgZmlsdGVyQ3JpdGVyaWFcbiAgICAgICAgfSA9IHRoaXMucHJvcHNcblxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgbGV0IHNlYXJjaFN0YXRlID0gdGhpcy5nZXRMb2NhdGlvblBhcmFtKCdzZWFyY2gnKVxuICAgICAgICAgICAgbGV0IGZpbHRlckNyaXRlcmlhID0gdGhpcy5nZXRMb2NhdGlvblBhcmFtKCdmaWx0ZXInKVxuICAgICAgICAgICAgaWYgKGZpbHRlckNyaXRlcmlhKSB7XG4gICAgICAgICAgICAgICAgZmlsdGVyQ3JpdGVyaWEgPSBKU09OLnBhcnNlKGZpbHRlckNyaXRlcmlhKVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBmaWx0ZXJDcml0ZXJpYSA9IHt9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzZWFyY2hTdGF0ZSA9IEpTT04ucGFyc2Uoc2VhcmNoU3RhdGUpXG4gICAgICAgICAgICB0aGlzLmdldExhYkxpc3Qoc2VhcmNoU3RhdGUsIGZpbHRlckNyaXRlcmlhLCB0cnVlKVxuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGUpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRMb2NhdGlvblBhcmFtKHRhZykge1xuICAgICAgICAvLyB0aGlzIEFQSSBhc3N1bWVzIHRoZSBjb250ZXh0IG9mIHJlYWN0LXJvdXRlci00XG4gICAgICAgIGNvbnN0IHBhcmFtU3RyaW5nID0gdGhpcy5wcm9wcy5sb2NhdGlvbi5zZWFyY2hcbiAgICAgICAgY29uc3QgcGFyYW1zID0gbmV3IFVSTFNlYXJjaFBhcmFtcyhwYXJhbVN0cmluZylcbiAgICAgICAgcmV0dXJuIHBhcmFtcy5nZXQodGFnKVxuICAgIH1cblxuICAgIGdldExhYkxpc3Qoc2VhcmNoU3RhdGUsIGZpbHRlckNyaXRlcmlhLCBtZXJnZVN0YXRlKSB7XG4gICAgICAgIHRoaXMucHJvcHMuZ2V0TGFicyhzZWFyY2hTdGF0ZSwgZmlsdGVyQ3JpdGVyaWEsIG1lcmdlU3RhdGUpO1xuICAgIH1cblxuICAgIGFwcGx5RmlsdGVycyhmaWx0ZXJTdGF0ZSkge1xuICAgICAgICBsZXQgc2VhcmNoU3RhdGUgPSB7XG4gICAgICAgICAgICBzZWxlY3RlZENyaXRlcmlhczogdGhpcy5wcm9wcy5zZWxlY3RlZENyaXRlcmlhcyxcbiAgICAgICAgICAgIHNlbGVjdGVkTG9jYXRpb246IHRoaXMucHJvcHMuc2VsZWN0ZWRMb2NhdGlvbixcbiAgICAgICAgfVxuICAgICAgICBsZXQgc2VhcmNoRGF0YSA9IGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzZWFyY2hTdGF0ZSkpXG4gICAgICAgIGxldCBmaWx0ZXJEYXRhID0gZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGZpbHRlclN0YXRlKSlcbiAgICAgICAgdGhpcy5wcm9wcy5oaXN0b3J5LnJlcGxhY2UoYC9keC9zZWFyY2hyZXN1bHRzP3NlYXJjaD0ke3NlYXJjaERhdGF9JmZpbHRlcj0ke2ZpbHRlckRhdGF9YClcblxuICAgICAgICB0aGlzLmdldExhYkxpc3Qoc2VhcmNoU3RhdGUsIGZpbHRlclN0YXRlLCB0cnVlKVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICA8Q3JpdGVyaWFTZWFyY2ggey4uLnRoaXMucHJvcHN9IGNoZWNrRm9yTG9hZD17dGhpcy5wcm9wcy5MT0FERURfTEFCU19TRUFSQ0h9IHRpdGxlPVwiU2VhcmNoIGZvciBUZXN0IGFuZCBMYWJzLlwiPlxuICAgICAgICAgICAgICAgICAgICA8VG9wQmFyIHsuLi50aGlzLnByb3BzfSBhcHBseUZpbHRlcnM9e3RoaXMuYXBwbHlGaWx0ZXJzLmJpbmQodGhpcyl9IC8+XG4gICAgICAgICAgICAgICAgICAgIDxMYWJzTGlzdCB7Li4udGhpcy5wcm9wc30gLz5cbiAgICAgICAgICAgICAgICA8L0NyaXRlcmlhU2VhcmNoPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBTZWFyY2hSZXN1bHRzVmlld1xuIiwiaW1wb3J0IFNlYXJjaFJlc3VsdHNWaWV3IGZyb20gJy4vU2VhcmNoUmVzdWx0c1ZpZXcuanMnXG5cbmV4cG9ydCBkZWZhdWx0IFNlYXJjaFJlc3VsdHNWaWV3IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IExhYlByb2ZpbGVDYXJkIGZyb20gJy4uLy4uL2NvbW1vbnMvbGFiUHJvZmlsZUNhcmQvaW5kZXguanMnXG5cbmNsYXNzIExhYnNMaXN0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgbGV0IHsgTEFCUywgbGFiTGlzdCB9ID0gdGhpcy5wcm9wc1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8c2VjdGlvbiBjbGFzc05hbWU9XCJ3cmFwIHNlYXJjaC1ib29rLXJlc3VsdFwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGFpbmVyLWZsdWlkXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC0xMlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiTGlzdC5tYXAoKGxhYklkLCBpKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gPExhYlByb2ZpbGVDYXJkIHsuLi50aGlzLnByb3BzfSBkZXRhaWxzPXtMQUJTW2xhYklkXX0ga2V5PXtpfSAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvc2VjdGlvbj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgTGFic0xpc3RcbiIsImltcG9ydCBMYWJzTGlzdCBmcm9tICcuL0xhYnNMaXN0LmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBMYWJzTGlzdCIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG5pbXBvcnQgTWVudSwgeyBNZW51SXRlbSB9IGZyb20gJ21hdGVyaWFsLXVpL01lbnUnO1xuaW1wb3J0IFJhbmdlIGZyb20gJ3JjLXNsaWRlci9saWIvUmFuZ2UnO1xuXG5jbGFzcyBUb3BCYXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgYW5jaG9yRWw6IG51bGwsXG4gICAgICAgICAgICBvcGVuRmlsdGVyOiBmYWxzZSxcbiAgICAgICAgICAgIHByaWNlUmFuZ2U6IFsxMDAsIDE1MDBdLFxuICAgICAgICAgICAgZGlzdGFuY2VSYW5nZTogWzEsIDM1XSxcbiAgICAgICAgICAgIHNvcnRCeTogbnVsbFxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhwcm9wcykge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHsgLi4ucHJvcHMuZmlsdGVyQ3JpdGVyaWEgfSlcbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IC4uLnRoaXMucHJvcHMuZmlsdGVyQ3JpdGVyaWEgfSlcbiAgICB9XG5cbiAgICBhcHBseUZpbHRlcnMoKSB7XG4gICAgICAgIGxldCBmaWx0ZXJTdGF0ZSA9IHtcbiAgICAgICAgICAgIHByaWNlUmFuZ2U6IHRoaXMuc3RhdGUucHJpY2VSYW5nZSxcbiAgICAgICAgICAgIGRpc3RhbmNlUmFuZ2U6IHRoaXMuc3RhdGUuZGlzdGFuY2VSYW5nZSxcbiAgICAgICAgICAgIHNvcnRCeTogdGhpcy5zdGF0ZS5zb3J0QnlcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnByb3BzLmFwcGx5RmlsdGVycyhmaWx0ZXJTdGF0ZSlcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IG9wZW5GaWx0ZXI6IGZhbHNlIH0pXG4gICAgfVxuXG4gICAgaGFuZGxlT3BlbihldmVudCkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHsgYW5jaG9yRWw6IGV2ZW50LmN1cnJlbnRUYXJnZXQgfSlcbiAgICB9XG5cbiAgICBoYW5kbGVDbG9zZSh0eXBlKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBhbmNob3JFbDogbnVsbCwgc29ydEJ5OiB0eXBlIH0sICgpID0+IHtcbiAgICAgICAgICAgIGlmKHR5cGUpe1xuICAgICAgICAgICAgICAgIHRoaXMuYXBwbHlGaWx0ZXJzKClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICB0b2dnbGVGaWx0ZXIoKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgb3BlbkZpbHRlcjogIXRoaXMuc3RhdGUub3BlbkZpbHRlclxuICAgICAgICB9KVxuICAgIH1cblxuICAgIGhhbmRsZVJhbmdlKHR5cGUsIHJhbmdlKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgW3R5cGVdOiByYW5nZVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIGdldENyaXRlcmlhU3RyaW5nKHNlbGVjdGVkQ3JpdGVyaWFzKSB7XG4gICAgICAgIGlmIChzZWxlY3RlZENyaXRlcmlhcyAmJiBzZWxlY3RlZENyaXRlcmlhcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiBzZWxlY3RlZENyaXRlcmlhcy5yZWR1Y2UoKGZpbmFsLCBjdXJyLCBpKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGkgIT0gMCkge1xuICAgICAgICAgICAgICAgICAgICBmaW5hbCArPSAnLCAnXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZpbmFsICs9IGAke2N1cnIubmFtZX1gXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZpbmFsXG4gICAgICAgICAgICB9LCBcIlwiKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIGxldCBjcml0ZXJpYVN0ciA9IHRoaXMuZ2V0Q3JpdGVyaWFTdHJpbmcodGhpcy5wcm9wcy5zZWxlY3RlZENyaXRlcmlhcylcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPHNlY3Rpb24gY2xhc3NOYW1lPVwiZmlsdGVyLXJvd1wiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGFpbmVyLWZsdWlkXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC0xMlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmlsdGVyLWl0ZW1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhY3Rpb24tZmlsdGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dWwgY2xhc3NOYW1lPVwiaW5saW5lLWxpc3RcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGkgb25DbGljaz17dGhpcy5oYW5kbGVPcGVuLmJpbmQodGhpcyl9PjxzcGFuIGNsYXNzTmFtZT1cImN0LWltZyBjdC1pbWctc20gZmlsdGVyLWljb24gdGV4dC1yaWdodFwiPjxpbWcgc3JjPVwiL2Fzc2V0cy9pbWcvY3VzdG9tZXItaWNvbnMvcmFuZ2Uuc3ZnXCIgY2xhc3NOYW1lPVwiaW1nLWZsdWlkXCIgLz48L3NwYW4+PC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGkgb25DbGljaz17dGhpcy50b2dnbGVGaWx0ZXIuYmluZCh0aGlzKX0+PHNwYW4gY2xhc3NOYW1lPVwiY3QtaW1nIGN0LWltZy1zbSBmaWx0ZXItaWNvbiB0ZXh0LXJpZ2h0IGFwcGxpZWQtZmlsdGVyXCI+PGltZyBzcmM9XCIvYXNzZXRzL2ltZy9jdXN0b21lci1pY29ucy9maWx0ZXIuc3ZnXCIgY2xhc3NOYW1lPVwiaW1nLWZsdWlkXCIgLz48L3NwYW4+PHNwYW4gY2xhc3NOYW1lPVwiYXBwbGllZC1maWx0ZXItbm90aVwiIC8+PC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZpbHRlci10aXRsZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3RoaXMucHJvcHMubGFiTGlzdC5sZW5ndGh9IFJlc3VsdHMgZm91bmQgZm9yIDxzcGFuIGNsYXNzTmFtZT1cImZ3LTcwMFwiPiB7Y3JpdGVyaWFTdHJ9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8TWVudVxuICAgICAgICAgICAgICAgICAgICBpZD1cInNvcnQtbWVudVwiXG4gICAgICAgICAgICAgICAgICAgIGFuY2hvckVsPXt0aGlzLnN0YXRlLmFuY2hvckVsfVxuICAgICAgICAgICAgICAgICAgICBvcGVuPXtCb29sZWFuKHRoaXMuc3RhdGUuYW5jaG9yRWwpfVxuICAgICAgICAgICAgICAgICAgICBvbkNsb3NlPXt0aGlzLmhhbmRsZUNsb3NlLmJpbmQodGhpcywgbnVsbCl9XG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICA8TWVudUl0ZW0gb25DbGljaz17dGhpcy5oYW5kbGVDbG9zZS5iaW5kKHRoaXMsICduYW1lJyl9PlJlbGF2YW5jZTwvTWVudUl0ZW0+XG4gICAgICAgICAgICAgICAgICAgIDxNZW51SXRlbSBvbkNsaWNrPXt0aGlzLmhhbmRsZUNsb3NlLmJpbmQodGhpcywgJ3ByaWNlJyl9PkZlZTwvTWVudUl0ZW0+XG4gICAgICAgICAgICAgICAgICAgIDxNZW51SXRlbSBvbkNsaWNrPXt0aGlzLmhhbmRsZUNsb3NlLmJpbmQodGhpcywgJ2Rpc3RhbmNlJyl9PkRpc3RhbmNlPC9NZW51SXRlbT5cbiAgICAgICAgICAgICAgICA8L01lbnU+XG5cbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUub3BlbkZpbHRlciA/IDxkaXYgb25DbGljaz17dGhpcy50b2dnbGVGaWx0ZXIuYmluZCh0aGlzKX0gY2xhc3NOYW1lPVwib3ZlcmxheSBibGFja1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3aWRnZXQgZmlsdGVyLXBvcHVwXCIgb25DbGljaz17KGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgICAgICAgICAgICAgICAgICB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIndpZGdldC1jb250ZW50XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmlsdGVyUm93XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0bFwiPlByaWNlPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidHJcIj5ScyB7dGhpcy5zdGF0ZS5wcmljZVJhbmdlWzBdfSB0byB7dGhpcy5zdGF0ZS5wcmljZVJhbmdlWzFdfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImJsXCI+UnMgMTAwPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiYnJcIj5ScyAyMDAwPC9zcGFuPlxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8UmFuZ2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtaW49ezEwMH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXg9ezIwMDB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3RoaXMuc3RhdGUucHJpY2VSYW5nZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGVwPXsxMDB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicmFuZ2VcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZVJhbmdlLmJpbmQodGhpcywgJ3ByaWNlUmFuZ2UnKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZpbHRlclJvd1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGxcIj5EaXN0YW5jZTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRyXCI+e3RoaXMuc3RhdGUuZGlzdGFuY2VSYW5nZVswXX0gdG8ge3RoaXMuc3RhdGUuZGlzdGFuY2VSYW5nZVsxXX0gS008L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJibFwiPjEgPiBLTTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImJyXCI+NTAgS008L3NwYW4+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxSYW5nZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1pbj17MX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXg9ezUwfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXt0aGlzLnN0YXRlLmRpc3RhbmNlUmFuZ2V9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RlcD17MX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJyYW5nZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuaGFuZGxlUmFuZ2UuYmluZCh0aGlzLCAnZGlzdGFuY2VSYW5nZScpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3aWRnZXQtZm9vdGVyIHBkLTBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJ2LWJ0biB2LWJ0bi1wcmltYXJ5IGJ0bi1ibG9jayBidG4tbGdcIiBvbkNsaWNrPXt0aGlzLmFwcGx5RmlsdGVycy5iaW5kKHRoaXMpfT5BcHBseTwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PiA6IFwiXCJcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIDwvc2VjdGlvbj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgVG9wQmFyXG4iLCJpbXBvcnQgVG9wQmFyIGZyb20gJy4vVG9wQmFyLmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBUb3BCYXIiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IExvYWRlciBmcm9tICcuLi8uLi9jb21tb25zL0xvYWRlcidcblxuY2xhc3MgVGVzdFNlbGVjdG9yVmlldyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgICBzZWxlY3RlZExhYjogdGhpcy5wcm9wcy5tYXRjaC5wYXJhbXMuaWRcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgICB0aGlzLnByb3BzLmdldExhYkJ5SWQodGhpcy5zdGF0ZS5zZWxlY3RlZExhYilcbiAgICB9XG5cbiAgICB0b2dnbGVUZXN0KHRlc3QpIHtcbiAgICAgICAgdGhpcy5wcm9wcy50b2dnbGVEaWFnbm9zaXNDcml0ZXJpYSgndGVzdCcsIHRlc3QpXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICBcbiAgICAgICAgbGV0IGxhYkRhdGEgPSB0aGlzLnByb3BzLkxBQlNbdGhpcy5zdGF0ZS5zZWxlY3RlZExhYl1cbiAgICAgICAgbGV0IHRlc3RzID0gW11cbiAgICAgICAgbGV0IHNlbGVjdGVkVGVzdHMgPSBbXVxuXG4gICAgICAgIGlmICh0aGlzLnByb3BzLnNlbGVjdGVkQ3JpdGVyaWFzICYmIHRoaXMucHJvcHMuc2VsZWN0ZWRDcml0ZXJpYXMubGVuZ3RoKSB7XG4gICAgICAgICAgICBzZWxlY3RlZFRlc3RzID0gdGhpcy5wcm9wcy5zZWxlY3RlZENyaXRlcmlhcy5maWx0ZXIoeCA9PiB4LnR5cGUgPT0gJ3Rlc3QnKS5tYXAoeCA9PiB4LmlkKVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBpZiAobGFiRGF0YSAmJiBsYWJEYXRhLnRlc3RzICYmIGxhYkRhdGEudGVzdHMubGVuZ3RoKSB7XG4gICAgICAgICAgICB0ZXN0cyA9IGxhYkRhdGEudGVzdHMubWFwKCh0ZXN0LCBpKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIDxsaSBrZXk9e2l9PlxuICAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiY2stYnhcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHt0ZXN0LnRlc3QubmFtZX1cbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBjaGVja2VkPXtzZWxlY3RlZFRlc3RzLmluZGV4T2YodGVzdC50ZXN0LmlkKSA+IC0xfSBvbkNoYW5nZT17dGhpcy50b2dnbGVUZXN0LmJpbmQodGhpcywgdGVzdC50ZXN0KX0gLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImNoZWNrbWFya1wiIC8+XG4gICAgICAgICAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRlc3QtcHJpY2UgdGV4dC1tZCBmdy01MDBcIj57dGVzdC5tcnB9PC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXY+XG5cbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGxhYkRhdGEgP1xuXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoZWFkZXIgY2xhc3NOYW1lPVwic2tpbi13aGl0ZSBmaXhlZCBob3Jpem9udGFsIHRvcCBsb2NhdGlvbi1kZXRlY3QtaGVhZGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGFpbmVyLWZsdWlkXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLTEyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic2VsZWN0LWxvY2F0aW9uLXJvdyB0ZXh0LWNlbnRlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuaGlzdG9yeS5nbygtMSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19IGNsYXNzTmFtZT1cImN0LWltZyBjdC1pbWctbWQgY2xvc2VcIj48aW1nIHNyYz1cIi9hc3NldHMvaW1nL2N1c3RvbWVyLWljb25zL2Nsb3NlLWJsYWNrLnN2Z1wiIGNsYXNzTmFtZT1cImltZy1mbHVpZFwiIC8+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGg0IGNsYXNzTmFtZT1cImZ3LTcwMCB0ZXh0LW1kXCI+QWxsIFRlc3Q8L2g0PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC0xMlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNlYXJjaC1yb3dcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRvbi1ncm91cCBsb2NhdGlvbi1kZXRlY3QtZmllbGRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2wgaW5wdXQtbWQgc2VhcmNoLWlucHV0IG5vLXNoYWRvd1wiIHBsYWNlaG9sZGVyPVwiU2VhcmNoIFRlc3RcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImN0LWltZyBjdC1pbWctc20gbWFwLW1hcmtlci1ibHVlXCI+PGltZyBzcmM9XCIvYXNzZXRzL2ltZy9jdXN0b21lci1pY29ucy9zZWFyY2gtaWNvbi5zdmdcIiBjbGFzc05hbWU9XCJpbWctZmx1aWRcIiAvPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJkZXRlY3QtbXktbG9jYWl0b25cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJjdC1pbWcgY3QtaW1nLXhzXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7c2VsZWN0ZWRUZXN0cy5sZW5ndGh9IFNlbGVjdGVkIEl0ZW1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2hlYWRlcj5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzZWN0aW9uIGNsYXNzTmFtZT1cIndyYXAgYWxsLXRlc3Qtc2NyZWVuIFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIndpZGdldC1wYW5lbFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwYW5lbC1jb250ZW50IHBkLTBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dWwgY2xhc3NOYW1lPVwibGlzdCBhbGwtdGVzdC1saXN0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt0ZXN0c31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc2VjdGlvbj5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwidi1idG4gdi1idG4tcHJpbWFyeSBidG4tbGcgZml4ZWQgaG9yaXpvbnRhbCBib3R0b20gbm8tcm91bmQgdGV4dC1sZ1wiIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5oaXN0b3J5LmdvKC0xKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19PkRvbmU8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PiA6IDxMb2FkZXIgLz5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgVGVzdFNlbGVjdG9yVmlld1xuIiwiaW1wb3J0IFRlc3RTZWxlY3RvciBmcm9tICcuL1Rlc3RTZWxlY3RvcidcbmV4cG9ydCBkZWZhdWx0IFRlc3RTZWxlY3RvciIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG5pbXBvcnQgVGltZVNsb3RTZWxlY3RvciBmcm9tICcuLi8uLi9jb21tb25zL3RpbWVTbG90U2VsZWN0b3IvaW5kZXguanMnXG5pbXBvcnQgU2VsZWN0ZWRDbGluaWMgZnJvbSAnLi4vY29tbW9ucy9zZWxlY3RlZENsaW5pYy9pbmRleC5qcydcblxuY2xhc3MgQXBwb2ludG1lbnRTbG90IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIHNlbGVjdGVkRG9jdG9yOiB0aGlzLnByb3BzLm1hdGNoLnBhcmFtcy5pZCxcbiAgICAgICAgICAgIHNlbGVjdGVkQ2xpbmljOiB0aGlzLnByb3BzLm1hdGNoLnBhcmFtcy5jbGluaWNJZCxcbiAgICAgICAgICAgIHRpbWVTbG90czogbnVsbCxcbiAgICAgICAgICAgIHNlbGVjdGVkU2xvdDogbnVsbFxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJvY2VlZCgpIHtcbiAgICAgICAgLy8gaWYgKHRoaXMuc3RhdGUuc2VsZWN0ZWRTbG90KSB7XG4gICAgICAgIC8vICAgICB0aGlzLmNvbnRleHQucm91dGVyLmhpc3RvcnkucHVzaChgL2RvY3RvcnByb2ZpbGUvJHt0aGlzLnN0YXRlLnNlbGVjdGVkRG9jdG9yfS8ke3RoaXMuc3RhdGUuc2VsZWN0ZWRDbGluaWN9L2Jvb2tkZXRhaWxzP3Q9JHt0aGlzLnN0YXRlLnNlbGVjdGVkU2xvdC5zdGFydH1gKVxuICAgICAgICAvLyB9XG4gICAgfVxuXG4gICAgc2VsZWN0VGltZVNsb3Qoc2xvdCkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHsgc2VsZWN0ZWRTbG90OiBzbG90IH0pXG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIGxldCBjbGluaWNJZCA9IHRoaXMucHJvcHMubWF0Y2gucGFyYW1zLmNsaW5pY0lkXG4gICAgICAgIGxldCBkb2N0b3JJZCA9IHRoaXMucHJvcHMubWF0Y2gucGFyYW1zLmlkXG5cbiAgICAgICAgdGhpcy5wcm9wcy5nZXRUaW1lU2xvdHMoZG9jdG9ySWQsIGNsaW5pY0lkLCAodGltZVNsb3RzKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgdGltZVNsb3RzIH0pXG4gICAgICAgIH0pXG5cbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXY+XG5cbiAgICAgICAgICAgICAgICA8aGVhZGVyIGNsYXNzTmFtZT1cInNraW4tcHJpbWFyeSBmaXhlZCBob3Jpem9udGFsIHRvcFwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lci1mbHVpZFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC0yXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImljb24gYmFjay1pY29uXCIgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5oaXN0b3J5LmdvKC0xKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fT48aW1nIHNyYz1cIi9hc3NldHMvaW1nL2N1c3RvbWVyLWljb25zL2JhY2std2hpdGUucG5nXCIgY2xhc3NOYW1lPVwiaW1nLWZsdWlkXCIgLz48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtOFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImhlYWRlci10aXRsZSBmdy03MDAgY2FwaXRhbGl6ZSB0ZXh0LXdoaXRlIHRleHQtY2VudGVyXCI+U2VsZWN0IERhdGUgYW5kIFRpbWU8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC0yXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9oZWFkZXI+XG5cbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuRE9DVE9SU1t0aGlzLnN0YXRlLnNlbGVjdGVkRG9jdG9yXSA/XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNlY3Rpb24gY2xhc3NOYW1lPVwid3JhcCBkci1wcm9maWxlLXNjcmVlblwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lci1mbHVpZFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC0xMlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8U2VsZWN0ZWRDbGluaWNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkRG9jdG9yPXt0aGlzLnByb3BzLkRPQ1RPUlNbdGhpcy5zdGF0ZS5zZWxlY3RlZERvY3Rvcl19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZENsaW5pYz17dGhpcy5zdGF0ZS5zZWxlY3RlZENsaW5pY31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlLnRpbWVTbG90cyA/XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPFRpbWVTbG90U2VsZWN0b3JcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGltZVNsb3RzPXt0aGlzLnN0YXRlLnRpbWVTbG90c31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0VGltZVNsb3Q9e3RoaXMuc2VsZWN0VGltZVNsb3QuYmluZCh0aGlzKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPiA6ICcnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc2VjdGlvbj5cblxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+IDogXCJcIlxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwidi1idG4gdi1idG4tcHJpbWFyeSBidG4tbGcgZml4ZWQgaG9yaXpvbnRhbCBib3R0b20gbm8tcm91bmQgdGV4dC1sZ1wiPlNlbGVjdDwvYnV0dG9uPlxuXG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgQXBwb2ludG1lbnRTbG90XG4iLCJpbXBvcnQgQXBwb2ludG1lbnRTbG90IGZyb20gJy4vQXBwb2ludG1lbnRTbG90LmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBBcHBvaW50bWVudFNsb3QiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFN0ZXBwZXIsIHsgU3RlcCwgU3RlcExhYmVsIH0gZnJvbSAnbWF0ZXJpYWwtdWkvU3RlcHBlcic7XG5cbmltcG9ydCBDYWxJY29uIGZyb20gJ21hdGVyaWFsLXVpLWljb25zL0NhbGwnO1xuXG5cbmNsYXNzIEJvb2tpbmdWaWV3IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYm9va2luZ1wiPlxuICAgICAgICAgICAgICAgIDxTdGVwcGVyIGFjdGl2ZVN0ZXA9ezB9IGFsdGVybmF0aXZlTGFiZWw+XG4gICAgICAgICAgICAgICAgICAgIDxTdGVwIGtleT17MH0+XG4gICAgICAgICAgICAgICAgICAgICAgICA8U3RlcExhYmVsPntcIkFwcG9pbnRtZW50IFJlcXVlc3RlZFwifTwvU3RlcExhYmVsPlxuICAgICAgICAgICAgICAgICAgICA8L1N0ZXA+XG4gICAgICAgICAgICAgICAgICAgIDxTdGVwIGtleT17MX0+XG4gICAgICAgICAgICAgICAgICAgICAgICA8U3RlcExhYmVsPntcIkFwcG9pbnRtZW50IENvbmZpcm1lZFwifTwvU3RlcExhYmVsPlxuICAgICAgICAgICAgICAgICAgICA8L1N0ZXA+XG4gICAgICAgICAgICAgICAgICAgIDxTdGVwIGtleT17Mn0+XG4gICAgICAgICAgICAgICAgICAgICAgICA8U3RlcExhYmVsPntcIkFwcG9pbnRtZW50IENvbXBsZXRlXCJ9PC9TdGVwTGFiZWw+XG4gICAgICAgICAgICAgICAgICAgIDwvU3RlcD5cbiAgICAgICAgICAgICAgICA8L1N0ZXBwZXI+XG4gICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwicmVxdWVzdExpbmVcIj5XZSBoYXZlIHJlcXVlc3RlZCBEci5TbWl0aCB0byBjb25maXJtIHlvdXIgYXBwb2ludG1lbnQ8L3A+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwYXRpZW50TmFtZVwiPlxuICAgICAgICAgICAgICAgICAgICA8cD5mb3I8L3A+XG4gICAgICAgICAgICAgICAgICAgIDxwPkJyaWplc2ggS3VtYXI8L3A+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImRldGFpbHNcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImxibFwiPldpdGg8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJjbnRudFwiPkRyLiBTdGV2ZSBTbWl0aDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJsYmxcIj5XaGVyZTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImNudG50XCI+U2Fydm9kYXlhIENsaW5pYywgIyAzNjEsIFNlY3RvciA1MCwgR3VyZ2Fvbjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJsYmxcIj5XaGVuPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiY250bnRcIj5XZWRuZXNkYXksIEp1bmUgMjcsIDIwMTgsIDExOjQ1QU08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwibGJsXCI+UmVmZXJlbmNlIzwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImNudG50XCI+SFVWSEpCODdISkJKSDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cInJlcXVlc3RcIj5SZXF1ZXN0IFJlLVNjaGVkdWxlL0NhbmNlbDwvYnV0dG9uPlxuXG4gICAgICAgICAgICAgICAgPENhbEljb24gY2xhc3NOYW1lPVwiY2FsbEljb25cIi8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgQm9va2luZ1ZpZXdcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCBEb2N0b3JQcm9maWxlQ2FyZCBmcm9tICcuLi9jb21tb25zL2RvY3RvclByb2ZpbGVDYXJkL2luZGV4LmpzJ1xuaW1wb3J0IENsaW5pY1NlbGVjdG9yIGZyb20gJy4uL2NvbW1vbnMvY2xpbmljU2VsZWN0b3IvaW5kZXguanMnXG5cbmNsYXNzIENsaW5pY0xpc3RWaWV3IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIHNlbGVjdGVkRG9jdG9yOiBudWxsXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgbGV0IGRvY3RvcklkID0gdGhpcy5wcm9wcy5tYXRjaC5wYXJhbXMuaWRcbiAgICAgICAgaWYgKGRvY3RvcklkKSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgc2VsZWN0ZWREb2N0b3I6IGRvY3RvcklkIH0pXG4gICAgICAgICAgICB0aGlzLnByb3BzLmdldERvY3RvckJ5SWQoZG9jdG9ySWQpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZG9jdG9yUHJvZmlsZVwiPlxuXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnByb3BzLkRPQ1RPUlNbdGhpcy5zdGF0ZS5zZWxlY3RlZERvY3Rvcl0gP1xuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8RG9jdG9yUHJvZmlsZUNhcmRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGlkZUJvdHRvbT17dHJ1ZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGlkZUJvb2tOb3c9e3RydWV9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRldGFpbHM9e3RoaXMucHJvcHMuRE9DVE9SU1t0aGlzLnN0YXRlLnNlbGVjdGVkRG9jdG9yXX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxDbGluaWNTZWxlY3RvclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXRhaWxzPXt0aGlzLnByb3BzLkRPQ1RPUlNbdGhpcy5zdGF0ZS5zZWxlY3RlZERvY3Rvcl19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsuLi50aGlzLnByb3BzfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj4gOiBcIlwiXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IENsaW5pY0xpc3RWaWV3XG4iLCJpbXBvcnQgQ2xpbmljTGlzdFZpZXcgZnJvbSAnLi9DbGluaWNMaXN0Vmlldy5qcydcblxuZXhwb3J0IGRlZmF1bHQgQ2xpbmljTGlzdFZpZXciLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcblxuY2xhc3MgQ2xpbmljU2VsZWN0b3IgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgIH1cblxuICAgIHNlbGVjdENsaW5pYyhjbGluaWNJZCkge1xuICAgICAgICBsZXQgZG9jdG9ySWQgPSB0aGlzLnByb3BzLm1hdGNoLnBhcmFtcy5pZFxuICAgICAgICB0aGlzLnByb3BzLmhpc3RvcnkucHVzaChgL29wZC9kb2N0b3IvJHtkb2N0b3JJZH0vJHtjbGluaWNJZH0vYm9va2ApXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIGxldCB7IG5hbWUsIGhvc3BpdGFscyB9ID0gdGhpcy5wcm9wcy5kZXRhaWxzXG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwid2lkZ2V0LXBhbmVsXCI+XG4gICAgICAgICAgICAgICAgPGg0IGNsYXNzTmFtZT1cInBhbmVsLXRpdGxlXCI+RHIuIHtuYW1lfSBBdmFpbGFibGUgYXQ8L2g0PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGFuZWwtY29udGVudCBzY3JvbGwteFwiPlxuICAgICAgICAgICAgICAgICAgICA8dWwgY2xhc3NOYW1lPVwiaW5saW5lLWxpc3QgQ2xpbmljLWNhcmQtbGlzdFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhvc3BpdGFscy5tYXAoKGhvc3BpdGFsLCBpKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiA8bGkga2V5PXtpfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwid2lkZ2V0IG5vLXNoYWRvd1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwid2lkZ2V0LWhlYWRlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDQgY2xhc3NOYW1lPVwid2lkZ2V0LXRpdGxlIHRleHQtbWQgZnctNzAwXCI+e2hvc3BpdGFsLmhvc3BpdGFsX25hbWV9IDxzcGFuIGNsYXNzTmFtZT1cImZsb2F0LXJpZ2h0XCI+UnMge2hvc3BpdGFsLmZlZXN9PC9zcGFuPjwvaDQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3aWRnZXQtY29udGVudFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxvY2F0aW9uLWRldGFpbHNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbWcgc3JjPVwiL2Fzc2V0cy9pbWcvY3VzdG9tZXItaWNvbnMvbWFwLW1hcmtlci1ibHVlLnBuZ1wiIGNsYXNzTmFtZT1cImltZy1mbHVpZFwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJhZGRyZXNzXCI+e2hvc3BpdGFsLmFkZHJlc3N9PC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0aW1pbmctZGV0YWlsc1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE9iamVjdC5rZXlzKGhvc3BpdGFsLnRpbWluZ3MpLm1hcCgodGltaW5nS2V5LCBrZXkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDxwIGNsYXNzTmFtZT1cImZ3LTcwMFwiIGtleT17a2V5fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJmdy03MDAgdGV4dC1tZCB0ZXh0LXByaW1hcnlcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7dGltaW5nS2V5fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtob3NwaXRhbC50aW1pbmdzW3RpbWluZ0tleV0uam9pbignLCAnKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwid2lkZ2V0LWZvb3RlciB0ZXh0LWNlbnRlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cInYtYnRuIHYtYnRuLXByaW1hcnkgb3V0bGluZVwiIG9uQ2xpY2s9e3RoaXMuc2VsZWN0Q2xpbmljLmJpbmQodGhpcywgaG9zcGl0YWwuaG9zcGl0YWxfaWQpfT5Cb29rIE5vdzwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IENsaW5pY1NlbGVjdG9yXG4iLCJpbXBvcnQgQ2xpbmljU2VsZWN0b3IgZnJvbSAnLi9DbGluaWNTZWxlY3Rvci5qcydcblxuZXhwb3J0IGRlZmF1bHQgQ2xpbmljU2VsZWN0b3IiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcblxuY2xhc3MgRG9jdG9yUHJvZmlsZUNhcmQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgIH1cblxuICAgIGNhcmRDbGljayhpZCwgZSkge1xuICAgICAgICB0aGlzLnByb3BzLmhpc3RvcnkucHVzaChgL29wZC9kb2N0b3IvJHtpZH1gKVxuICAgIH1cblxuICAgIGJvb2tOb3coaWQsIGUpIHtcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKVxuICAgICAgICAvLyB0aGlzLnByb3BzLmhpc3RvcnkucHVzaChgL2RvY3RvcnByb2ZpbGUvJHtpZH0vYXZhaWxhYmlsaXR5YClcbiAgICB9XG5cbiAgICBnZXRRdWFsaWZpY2F0aW9uU3RyKHF1YWxpZmljYXRpb25TcGVjaWFsaXphdGlvbikge1xuICAgICAgICByZXR1cm4gcXVhbGlmaWNhdGlvblNwZWNpYWxpemF0aW9uLnJlZHVjZSgoc3RyLCBjdXJyLCBpKSA9PiB7XG4gICAgICAgICAgICBzdHIgKz0gYCR7Y3Vyci5xdWFsaWZpY2F0aW9ufWBcbiAgICAgICAgICAgIGlmIChjdXJyLnNwZWNpYWxpemF0aW9uKSB7XG4gICAgICAgICAgICAgICAgc3RyICs9IGAgLSAke2N1cnIuc3BlY2lhbGl6YXRpb259YFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGkgPCBxdWFsaWZpY2F0aW9uU3BlY2lhbGl6YXRpb24ubGVuZ3RoIC0gMSkgc3RyICs9IGAsIGA7XG4gICAgICAgICAgICByZXR1cm4gc3RyXG4gICAgICAgIH0sIFwiXCIpXG4gICAgfVxuXG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgbGV0IHtpZCwgZXhwZXJpZW5jZV95ZWFycywgZ2VuZGVyLCBob3NwaXRhbHMsIGhvc3BpdGFsX2NvdW50LCBuYW1lLCBxdWFsaWZpY2F0aW9uc30gPSB0aGlzLnByb3BzLmRldGFpbHNcblxuICAgICAgICBsZXQgaG9zcGl0YWwgPSBob3NwaXRhbHNbMF1cblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3aWRnZXQgY2FyZCBzZWFyY2gtZHItbGlzdFwiIG9uQ2xpY2s9e3RoaXMuY2FyZENsaWNrLmJpbmQodGhpcyxpZCl9PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwid2lkZ2V0LWhlYWRlciBkci1pbmZvXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmF0aW5nLWFkZHJlc3MgYmV0YVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHVsIGNsYXNzTmFtZT1cImlubGluZS1saXN0IHJhdHRpbmdcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGk+PHNwYW4gY2xhc3NOYW1lPVwiY3QtaW1nIGN0LWltZy14cyBzdGFyLWljb25cIj48aW1nIHNyYz1cIi9hc3NldHMvaW1nL2N1c3RvbWVyLWljb25zL3N0YXIuc3ZnXCIgY2xhc3NOYW1lPVwiaW1nLWZsdWlkXCIgLz48L3NwYW4+PC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGk+PHNwYW4gY2xhc3NOYW1lPVwiY3QtaW1nIGN0LWltZy14cyBzdGFyLWljb25cIj48aW1nIHNyYz1cIi9hc3NldHMvaW1nL2N1c3RvbWVyLWljb25zL3N0YXIuc3ZnXCIgY2xhc3NOYW1lPVwiaW1nLWZsdWlkXCIgLz48L3NwYW4+PC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGk+PHNwYW4gY2xhc3NOYW1lPVwiY3QtaW1nIGN0LWltZy14cyBzdGFyLWljb25cIj48aW1nIHNyYz1cIi9hc3NldHMvaW1nL2N1c3RvbWVyLWljb25zL3N0YXIuc3ZnXCIgY2xhc3NOYW1lPVwiaW1nLWZsdWlkXCIgLz48L3NwYW4+PC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGk+PHNwYW4gY2xhc3NOYW1lPVwiY3QtaW1nIGN0LWltZy14cyBzdGFyLWljb25cIj48aW1nIHNyYz1cIi9hc3NldHMvaW1nL2N1c3RvbWVyLWljb25zL3N0YXIuc3ZnXCIgY2xhc3NOYW1lPVwiaW1nLWZsdWlkXCIgLz48L3NwYW4+PC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGk+PHNwYW4gY2xhc3NOYW1lPVwiY3QtaW1nIGN0LWltZy14cyBzdGFyLWljb25cIj48aW1nIHNyYz1cIi9hc3NldHMvaW1nL2N1c3RvbWVyLWljb25zL2hhbGYtc3Rhci5zdmdcIiBjbGFzc05hbWU9XCJpbWctZmx1aWRcIiAvPjwvc3Bhbj48L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwPjxzcGFuIGNsYXNzTmFtZT1cImN0LWltZyBjdC1pbWcteHNcIj48aW1nIHNyYz1cIi9hc3NldHMvaW1nL2N1c3RvbWVyLWljb25zL21hcC1tYXJrZXItYmx1ZS5zdmdcIiBjbGFzc05hbWU9XCJpbWctZmx1aWRcIiAvPjwvc3Bhbj57aG9zcGl0YWwuYWRkcmVzc308L3A+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFscGhhIGRyLW5hbWVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbWcgc3JjPVwiL2Fzc2V0cy9pbWcvY3VzdG9tZXItaWNvbnMvdXNlci5wbmdcIiBjbGFzc05hbWU9XCJpbWctZmx1aWRcIiAvPiB7bmFtZX1cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3aWRnZXQtY29udGVudFwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJldGEgb3RoZXItaW5mbyB0ZXh0LXJpZ2h0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cInYtYnRuIHYtYnRuLXByaW1hcnkgYnRuLXNtXCI+Qm9vayBOb3c8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicHJpY2luZ1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtcHJpbWFyeSBmdy03MDAgbmV3LXByaWNlXCI+UnMge2hvc3BpdGFsLmRpc2NvdW50ZWRfZmVlc30gPHNwYW4gY2xhc3NOYW1lPVwib2xkLXByaWNlXCI+UnMge2hvc3BpdGFsLmZlZXN9PC9zcGFuPjwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhbHBoYSBkci1leHAtZGV0YWlsc1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwiZHItZGVzZyB0ZXh0LW1kXCI+e3RoaXMuZ2V0UXVhbGlmaWNhdGlvblN0cihxdWFsaWZpY2F0aW9ucyl9PC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1zbSBmdy01MDAgdGV4dC1saWdodFwiPntleHBlcmllbmNlX3llYXJzfSBZZWFycyBvZiBFeHBlcmluY2U8L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXNtIGZ3LTUwMCB0ZXh0LWxpZ2h0XCI+RXggLSBBSUlNUywgIEV4LSBGb3J0aXM8L3A+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwid2lkZ2V0LWZvb3RlciBjYXJkLWZvb3RlclwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtNlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwPjxpbWcgc3JjPVwiL2Fzc2V0cy9pbWcvY3VzdG9tZXItaWNvbnMvaG9tZS5zdmdcIiBjbGFzc05hbWU9XCJpbWctZmx1aWRcIiAvPjxzcGFuIGNsYXNzTmFtZT1cIkNsaW5jLW5hbWVcIj57aG9zcGl0YWwuaG9zcGl0YWxfbmFtZX0gPGJyIC8+JmFtcDsge2hvc3BpdGFsX2NvdW50LTF9IE1vcmU8L3NwYW4+PC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC02XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHA+PGltZyBzcmM9XCIvYXNzZXRzL2ltZy9jdXN0b21lci1pY29ucy9jbG9jay1ibGFjay5zdmdcIiBjbGFzc05hbWU9XCJpbWctZmx1aWRcIiAvPjxzcGFuIGNsYXNzTmFtZT1cInRpbWUtYXZhaWxhYmlsaXR5XCI+ODowMCBBTSB0byAxMjowMCBQTSA8YnIgLz4yOjAwIFBNIHRvIDc6MDAgUE08L3NwYW4+PC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IERvY3RvclByb2ZpbGVDYXJkXG4iLCJpbXBvcnQgRG9jdG9yUHJvZmlsZUNhcmQgZnJvbSAnLi9Eb2N0b3JQcm9maWxlQ2FyZC5qcydcblxuZXhwb3J0IGRlZmF1bHQgRG9jdG9yUHJvZmlsZUNhcmQiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5jbGFzcyBTZWxlY3RlZENsaW5pYyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG5cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICAvLyBsZXQgeyBzZWxlY3RlZERvY3Rvciwgc2VsZWN0ZWRDbGluaWMgfSA9IHRoaXMucHJvcHNcblxuICAgICAgICAvLyBsZXQgY2xpbmljRGF0YSA9IHNlbGVjdGVkRG9jdG9yLmF2YWlsYWJpbGl0eS5maWx0ZXIoKGNsaW5pYykgPT4ge1xuICAgICAgICAvLyAgICAgcmV0dXJuIGNsaW5pYy5pZCA9PSBzZWxlY3RlZENsaW5pY1xuICAgICAgICAvLyB9KVswXVxuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIndpZGdldCBtcnQtMTAgY3QtcHJvZmlsZSBza2luLXdoaXRlXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3aWRnZXQtaGVhZGVyIGRyLXF1Y2lrLWluZm9cIj5cbiAgICAgICAgICAgICAgICAgICAgPGltZyBzcmM9XCIvYXNzZXRzL2ltZy9jdXN0b21lci1pY29ucy91c2VyLnBuZ1wiIGNsYXNzTmFtZT1cImltZy1mbHVpZFwiIC8+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZHItcHJvZmlsZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGg0IGNsYXNzTmFtZT1cImRyLW5hbWVcIj5Eci4gU3RlcGhueSBSYXk8L2g0PlxuICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwiZGVzZ1wiPk1CQlMsIE1EIC0gR2VucmFsIE1lZGljaW5lIEdlbmVyYWwgUGh5c2ljaWFuPC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGg0IGNsYXNzTmFtZT1cImRyLW5hbWUgY2xpbmljLW5hbWUgbXJ0LTEwIHRleHQtc21cIj5BcG9sbG8gQ2xpbmljPC9oND5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgU2VsZWN0ZWRDbGluaWNcbiIsImltcG9ydCBTZWxlY3RlZENsaW5pYyBmcm9tICcuL1NlbGVjdGVkQ2xpbmljLmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBTZWxlY3RlZENsaW5pYyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmNvbnN0IGRlYm91bmNlciA9IChmbiwgZGVsYXkpID0+IHtcbiAgICBsZXQgdGltZXIgPSBudWxsXG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVyKVxuICAgICAgICB0aW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgZm4uY2FsbCh0aGlzKVxuICAgICAgICB9LCBkZWxheSlcbiAgICB9XG59XG5cblxuY2xhc3MgQ3JpdGVyaWFTZWFyY2hWaWV3IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIHNlYXJjaFZhbHVlOiAnJyxcbiAgICAgICAgICAgIHNlYXJjaFJlc3VsdHM6IFtdXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgdGhpcy5nZXRTZWFyY2hSZXN1bHRzID0gZGVib3VuY2VyKHRoaXMuZ2V0U2VhcmNoUmVzdWx0cy5iaW5kKHRoaXMpLCAxMDAwKVxuICAgICAgICBsZXQgaW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndG9wQ3JpdGVyaWFTZWFyY2gnKVxuICAgICAgICBpbnB1dC5mb2N1cygpXG4gICAgfVxuXG4gICAgaW5wdXRIYW5kbGVyKGUpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHNlYXJjaFZhbHVlOiBlLnRhcmdldC52YWx1ZSB9KVxuICAgICAgICB0aGlzLmdldFNlYXJjaFJlc3VsdHMoKVxuICAgIH1cblxuICAgIGdldFNlYXJjaFJlc3VsdHMoKSB7XG4gICAgICAgIHRoaXMucHJvcHMuZ2V0Q3JpdGVyaWFSZXN1bHRzKHRoaXMuc3RhdGUuc2VhcmNoVmFsdWUsIChzZWFyY2hSZXN1bHRzKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgc2VhcmNoUmVzdWx0czogc2VhcmNoUmVzdWx0cy5yZXN1bHQgfSlcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBhZGRDcml0ZXJpYShjcml0ZXJpYSwgdHlwZSkge1xuICAgICAgICBjcml0ZXJpYS50eXBlID0gdHlwZVxuICAgICAgICB0aGlzLnByb3BzLnRvZ2dsZUNyaXRlcmlhKGNyaXRlcmlhKVxuICAgICAgICB0aGlzLmNvbnRleHQucm91dGVyLmhpc3RvcnkuZ29CYWNrKClcbiAgICB9XG5cbiAgICBzdGF0aWMgY29udGV4dFR5cGVzID0ge1xuICAgICAgICByb3V0ZXI6ICgpID0+IG51bGxcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibG9jYXRpb25TZWFyY2hcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxvY2F0aW9uU2VhcmNoQm94XCI+XG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCBjbGFzc05hbWU9XCJ0b3BTZWFyY2hcIiBpZD1cInRvcENyaXRlcmlhU2VhcmNoXCIgb25DaGFuZ2U9e3RoaXMuaW5wdXRIYW5kbGVyLmJpbmQodGhpcyl9IHZhbHVlPXt0aGlzLnN0YXRlLnNlYXJjaFZhbHVlfSBwbGFjZWhvbGRlcj1cIlNlYXJjaCBmb3Igc3ltcHRvbXMsIERvY3RvcywgY29uZGl0aW9ucyAuLmV0Y1wiLz5cbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZS5zZWFyY2hSZXN1bHRzLm1hcCgodHlwZSxpKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPVwic2VhcmNoUmVzdWx0VHlwZVwiIGtleT17aX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwPnt0eXBlLm5hbWV9PC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlLmRhdGEubWFwKChyZXN1bHREYXRhLGopID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gPHNwYW4ga2V5PXtqfSBjbGFzc05hbWU9XCJwYWMtaXRlbVwiIG9uQ2xpY2s9e3RoaXMuYWRkQ3JpdGVyaWEuYmluZCh0aGlzLCByZXN1bHREYXRhLCB0eXBlLnR5cGUpfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3Jlc3VsdERhdGEubmFtZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBDcml0ZXJpYVNlYXJjaFZpZXdcbiIsImltcG9ydCBDcml0ZXJpYVNlYXJjaFZpZXcgZnJvbSAnLi9Dcml0ZXJpYVNlYXJjaFZpZXcuanMnXG5cbmV4cG9ydCBkZWZhdWx0IENyaXRlcmlhU2VhcmNoVmlldyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCBMb2FkZXIgZnJvbSAnLi4vLi4vY29tbW9ucy9Mb2FkZXInXG5cbmltcG9ydCBEb2N0b3JQcm9maWxlQ2FyZCBmcm9tICcuL2RvY3RvclByb2ZpbGVDYXJkJ1xuaW1wb3J0IEFib3V0RG9jdG9yIGZyb20gJy4uL2RvY3RvclByb2ZpbGUvYWJvdXREb2N0b3IvaW5kZXguanMnXG5pbXBvcnQgUHJvZmVzc2lvbmFsR3JhcGggZnJvbSAnLi4vZG9jdG9yUHJvZmlsZS9wcm9mZXNzaW9uYWxHcmFwaC9pbmRleC5qcydcbmltcG9ydCBDbGluaWNTZWxlY3RvciBmcm9tICcuLi9jb21tb25zL2NsaW5pY1NlbGVjdG9yL2luZGV4LmpzJ1xuXG5jbGFzcyBEb2N0b3JQcm9maWxlVmlldyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgICBzZWxlY3RlZERvY3RvcjogdGhpcy5wcm9wcy5tYXRjaC5wYXJhbXMuaWRcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdj5cblxuICAgICAgICAgICAgICAgIDxoZWFkZXIgY2xhc3NOYW1lPVwic2tpbi1wcmltYXJ5IGZpeGVkIGhvcml6b250YWwgdG9wXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGFpbmVyLWZsdWlkXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLTRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJoZWFkZXItdGl0bGUgZnctNzAwIGNhcGl0YWxpemUgdGV4dC13aGl0ZVwiPklDT048L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC00XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtNFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dWwgY2xhc3NOYW1lPVwiaW5saW5lLWxpc3QgZmxvYXQtcmlnaHQgdXNlci1ub3RpZmljYXRpb24tYWN0aW9uXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGk+PHNwYW4gY2xhc3NOYW1lPVwiaWNvbiBpY29uLW1kIHRleHQtbWlkZGxlXCI+PGltZyBzcmM9XCIvYXNzZXRzL2ltZy9jdXN0b21lci1pY29ucy91c2VyLnN2Z1wiIGNsYXNzTmFtZT1cImltZy1mbHVpZFwiIC8+PC9zcGFuPjwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGk+PHNwYW4gY2xhc3NOYW1lPVwiaWNvbiBpY29uLW1kIHRleHQtbWlkZGxlIG5vdGlmaWNhdGlvbi1pY29uXCI+PGltZyBzcmM9XCIvYXNzZXRzL2ltZy9jdXN0b21lci1pY29ucy9ub3RpZmljYXRpb24uc3ZnXCIgY2xhc3NOYW1lPVwiaW1nLWZsdWlkXCIgLz4gPHNwYW4gY2xhc3NOYW1lPVwibm90aWZpY2F0aW9uLWFsZXJ0XCIgLz48L3NwYW4+PC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2hlYWRlcj5cblxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5ET0NUT1JTW3RoaXMuc3RhdGUuc2VsZWN0ZWREb2N0b3JdID9cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNlY3Rpb24gY2xhc3NOYW1lPVwid3JhcCBkci1wcm9maWxlLXNjcmVlblwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lci1mbHVpZFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC0xMlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIndpZGdldCBtcnQtMTAgY3QtcHJvZmlsZSBza2luLXdoaXRlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8RG9jdG9yUHJvZmlsZUNhcmRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXRhaWxzPXt0aGlzLnByb3BzLkRPQ1RPUlNbdGhpcy5zdGF0ZS5zZWxlY3RlZERvY3Rvcl19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3aWRnZS1jb250ZW50IHBkLTBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8QWJvdXREb2N0b3JcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGV0YWlscz17dGhpcy5wcm9wcy5ET0NUT1JTW3RoaXMuc3RhdGUuc2VsZWN0ZWREb2N0b3JdfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Q2xpbmljU2VsZWN0b3JcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGV0YWlscz17dGhpcy5wcm9wcy5ET0NUT1JTW3RoaXMuc3RhdGUuc2VsZWN0ZWREb2N0b3JdfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7Li4udGhpcy5wcm9wc31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPFByb2Zlc3Npb25hbEdyYXBoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRldGFpbHM9e3RoaXMucHJvcHMuRE9DVE9SU1t0aGlzLnN0YXRlLnNlbGVjdGVkRG9jdG9yXX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc2VjdGlvbj5cblxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+IDogPExvYWRlciAvPlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgRG9jdG9yUHJvZmlsZVZpZXdcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG5jbGFzcyBBYm91dERvY3RvciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIGxlc3NBYm91dDogXCJcIixcbiAgICAgICAgICAgIHJlYWRNb3JlOiBmYWxzZVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIGxldCB7IGFib3V0IH0gPSB0aGlzLnByb3BzLmRldGFpbHNcblxuICAgICAgICBpZiAoYWJvdXQgJiYgYWJvdXQubGVuZ3RoID4gMTAwKSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICByZWFkTW9yZTogdHJ1ZVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgbGVzc0Fib3V0OiBhYm91dC5zbGljZSgwLCAxMDApXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIGxldCB7IGFib3V0LCBuYW1lIH0gPSB0aGlzLnByb3BzLmRldGFpbHNcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3aWRnZXQtcGFuZWxcIj5cbiAgICAgICAgICAgICAgICA8aDQgY2xhc3NOYW1lPVwicGFuZWwtdGl0bGVcIj5BYm91dCB7bmFtZX08L2g0PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGFuZWwtY29udGVudFwiPlxuICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJmdy01MDAgdGV4dC1tZFwiPnt0aGlzLnN0YXRlLmxlc3NBYm91dH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlLnJlYWRNb3JlID8gPGEgY2xhc3NOYW1lPVwiZnctNzAwIHRleHQtcHJpbWFyeVwiIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHJlYWRNb3JlOiBmYWxzZSwgbGVzc0Fib3V0OiBhYm91dCB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19PlJFQUQgTU9SRTwvYT4gOiBcIlwiXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBBYm91dERvY3RvclxuIiwiaW1wb3J0IEFib3V0RG9jdG9yIGZyb20gJy4vQWJvdXREb2N0b3IuanMnXG5cbmV4cG9ydCBkZWZhdWx0IEFib3V0RG9jdG9yIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cbmNsYXNzIERvY3RvclByb2ZpbGVDYXJkIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICB9XG5cbiAgICBnZXRRdWFsaWZpY2F0aW9uU3RyKHF1YWxpZmljYXRpb25TcGVjaWFsaXphdGlvbikge1xuICAgICAgICByZXR1cm4gcXVhbGlmaWNhdGlvblNwZWNpYWxpemF0aW9uLnJlZHVjZSgoc3RyLCBjdXJyLCBpKSA9PiB7XG4gICAgICAgICAgICBzdHIgKz0gYCR7Y3Vyci5xdWFsaWZpY2F0aW9ufWBcbiAgICAgICAgICAgIGlmIChjdXJyLnNwZWNpYWxpemF0aW9uKSB7XG4gICAgICAgICAgICAgICAgc3RyICs9IGAgLSAke2N1cnIuc3BlY2lhbGl6YXRpb259YFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGkgPCBxdWFsaWZpY2F0aW9uU3BlY2lhbGl6YXRpb24ubGVuZ3RoIC0gMSkgc3RyICs9IGAsIGA7XG4gICAgICAgICAgICByZXR1cm4gc3RyXG4gICAgICAgIH0sIFwiXCIpXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIGxldCB7IG5hbWUsIGV4cGVyaWVuY2VfeWVhcnMsIHF1YWxpZmljYXRpb25zIH0gPSB0aGlzLnByb3BzLmRldGFpbHNcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3aWRnZXQtaGVhZGVyIGRyLXF1Y2lrLWluZm9cIj5cbiAgICAgICAgICAgICAgICA8aW1nIHNyYz1cIi9hc3NldHMvaW1nL2N1c3RvbWVyLWljb25zL3VzZXIucG5nXCIgY2xhc3NOYW1lPVwiaW1nLWZsdWlkXCIgLz5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImRyLXByb2ZpbGVcIj5cbiAgICAgICAgICAgICAgICAgICAgPGg0IGNsYXNzTmFtZT1cImRyLW5hbWVcIj57bmFtZX08L2g0PlxuICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJkZXNnXCI+e3RoaXMuZ2V0UXVhbGlmaWNhdGlvblN0cihxdWFsaWZpY2F0aW9ucyl9PC9wPlxuICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJhZGQtZGV0YWlsc1wiPntleHBlcmllbmNlX3llYXJzfSBZZWFycyBvZiBFeHBlcmluY2U8L3A+XG4gICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cImFkZC1kZXRhaWxzXCI+RXggLSBBSUlNUywgRXgtIEZvcnRpczwvcD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBEb2N0b3JQcm9maWxlQ2FyZFxuIiwiaW1wb3J0IERvY3RvclByb2ZpbGVDYXJkIGZyb20gJy4vRG9jdG9yUHJvZmlsZUNhcmQnXG5cbmV4cG9ydCBkZWZhdWx0IERvY3RvclByb2ZpbGVDYXJkIiwiaW1wb3J0IERvY3RvclByb2ZpbGVWaWV3IGZyb20gJy4vRG9jdG9yUHJvZmlsZVZpZXcuanMnXG5cbmV4cG9ydCBkZWZhdWx0IERvY3RvclByb2ZpbGVWaWV3IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cbmltcG9ydCBFeHBhbnNpb25QYW5lbCwge1xuICAgIEV4cGFuc2lvblBhbmVsU3VtbWFyeSxcbiAgICBFeHBhbnNpb25QYW5lbERldGFpbHMsXG59IGZyb20gJ21hdGVyaWFsLXVpL0V4cGFuc2lvblBhbmVsJztcbmltcG9ydCBFeHBhbmRNb3JlSWNvbiBmcm9tICdtYXRlcmlhbC11aS1pY29ucy9FeHBhbmRNb3JlJztcblxuXG5jbGFzcyBQcm9mZXNzaW9uYWxHcmFwaCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwid2lkZ2V0LXBhbmVsXCI+XG4gICAgICAgICAgICAgICAgPGg0IGNsYXNzTmFtZT1cInBhbmVsLXRpdGxlXCI+UHJvZmVzc2lvbmFsIEdyYXBoPC9oND5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBhbmVsLWNvbnRlbnQgcGQtMFwiPlxuICAgICAgICAgICAgICAgICAgICA8dWwgY2xhc3NOYW1lPVwibGlzdCBkcm9wLWRvd24tbGlzdFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGxpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxFeHBhbnNpb25QYW5lbD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPEV4cGFuc2lvblBhbmVsU3VtbWFyeSBleHBhbmRJY29uPXs8RXhwYW5kTW9yZUljb24gLz59PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0aXRsZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEVkdWNhdGlvbiA8c3BhbiBjbGFzc05hbWU9XCJmbG9hdC1yaWdodFwiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0V4cGFuc2lvblBhbmVsU3VtbWFyeT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPEV4cGFuc2lvblBhbmVsRGV0YWlscz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9yZS1jb250ZW50XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJmdy03MDAgdGV4dC1zbSB0ZXh0LXByaW1hcnlcIj5RdWFsaWZpY2F0aW9uPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwiZnctNzAwIHRleHQtbWQgdGV4dC1saWdodFwiPk1EPC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiZnctNzAwIHRleHQtc20gdGV4dC1wcmltYXJ5XCI+U3BlY2lhbGl6YXRpb248L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJmdy03MDAgdGV4dC1tZCB0ZXh0LWxpZ2h0XCI+RGVybWl0b2xvZ3k8L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJmdy03MDAgdGV4dC1zbSB0ZXh0LXByaW1hcnlcIj5Db2xsZWdlPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwiZnctNzAwIHRleHQtbWQgdGV4dC1saWdodFwiPk1HVSBVbml2ZXJzaXR5LCAyMDA5PC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvRXhwYW5zaW9uUGFuZWxEZXRhaWxzPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvRXhwYW5zaW9uUGFuZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGxpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxFeHBhbnNpb25QYW5lbD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPEV4cGFuc2lvblBhbmVsU3VtbWFyeSBleHBhbmRJY29uPXs8RXhwYW5kTW9yZUljb24gLz59PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0aXRsZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEFzc29jaWF0ZSBDbGluaWMvSG9zcGl0YWwgPHNwYW4gY2xhc3NOYW1lPVwiZmxvYXQtcmlnaHRcIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9FeHBhbnNpb25QYW5lbFN1bW1hcnk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxFeHBhbnNpb25QYW5lbERldGFpbHM+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vcmUtY29udGVudFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiZnctNzAwIHRleHQtc20gdGV4dC1wcmltYXJ5XCI+UXVhbGlmaWNhdGlvbjwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cImZ3LTcwMCB0ZXh0LW1kIHRleHQtbGlnaHRcIj5NRDwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImZ3LTcwMCB0ZXh0LXNtIHRleHQtcHJpbWFyeVwiPlNwZWNpYWxpemF0aW9uPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwiZnctNzAwIHRleHQtbWQgdGV4dC1saWdodFwiPkRlcm1pdG9sb2d5PC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiZnctNzAwIHRleHQtc20gdGV4dC1wcmltYXJ5XCI+Q29sbGVnZTwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cImZ3LTcwMCB0ZXh0LW1kIHRleHQtbGlnaHRcIj5NR1UgVW5pdmVyc2l0eSwgMjAwOTwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0V4cGFuc2lvblBhbmVsRGV0YWlscz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0V4cGFuc2lvblBhbmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxsaT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8RXhwYW5zaW9uUGFuZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxFeHBhbnNpb25QYW5lbFN1bW1hcnkgZXhwYW5kSWNvbj17PEV4cGFuZE1vcmVJY29uIC8+fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGl0bGVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBMYW5ndWFnZSA8c3BhbiBjbGFzc05hbWU9XCJmbG9hdC1yaWdodFwiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0V4cGFuc2lvblBhbmVsU3VtbWFyeT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPEV4cGFuc2lvblBhbmVsRGV0YWlscz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9yZS1jb250ZW50XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJmdy03MDAgdGV4dC1zbSB0ZXh0LXByaW1hcnlcIj5RdWFsaWZpY2F0aW9uPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwiZnctNzAwIHRleHQtbWQgdGV4dC1saWdodFwiPk1EPC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiZnctNzAwIHRleHQtc20gdGV4dC1wcmltYXJ5XCI+U3BlY2lhbGl6YXRpb248L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJmdy03MDAgdGV4dC1tZCB0ZXh0LWxpZ2h0XCI+RGVybWl0b2xvZ3k8L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJmdy03MDAgdGV4dC1zbSB0ZXh0LXByaW1hcnlcIj5Db2xsZWdlPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwiZnctNzAwIHRleHQtbWQgdGV4dC1saWdodFwiPk1HVSBVbml2ZXJzaXR5LCAyMDA5PC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvRXhwYW5zaW9uUGFuZWxEZXRhaWxzPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvRXhwYW5zaW9uUGFuZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGxpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxFeHBhbnNpb25QYW5lbD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPEV4cGFuc2lvblBhbmVsU3VtbWFyeSBleHBhbmRJY29uPXs8RXhwYW5kTW9yZUljb24gLz59PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0aXRsZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEF3YXJkcyA8c3BhbiBjbGFzc05hbWU9XCJmbG9hdC1yaWdodFwiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0V4cGFuc2lvblBhbmVsU3VtbWFyeT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPEV4cGFuc2lvblBhbmVsRGV0YWlscz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9yZS1jb250ZW50XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJmdy03MDAgdGV4dC1zbSB0ZXh0LXByaW1hcnlcIj5RdWFsaWZpY2F0aW9uPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwiZnctNzAwIHRleHQtbWQgdGV4dC1saWdodFwiPk1EPC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiZnctNzAwIHRleHQtc20gdGV4dC1wcmltYXJ5XCI+U3BlY2lhbGl6YXRpb248L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJmdy03MDAgdGV4dC1tZCB0ZXh0LWxpZ2h0XCI+RGVybWl0b2xvZ3k8L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJmdy03MDAgdGV4dC1zbSB0ZXh0LXByaW1hcnlcIj5Db2xsZWdlPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwiZnctNzAwIHRleHQtbWQgdGV4dC1saWdodFwiPk1HVSBVbml2ZXJzaXR5LCAyMDA5PC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvRXhwYW5zaW9uUGFuZWxEZXRhaWxzPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvRXhwYW5zaW9uUGFuZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGxpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxFeHBhbnNpb25QYW5lbD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPEV4cGFuc2lvblBhbmVsU3VtbWFyeSBleHBhbmRJY29uPXs8RXhwYW5kTW9yZUljb24gLz59PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0aXRsZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEFzc29jaWF0ZSBNZW1iZXJzaGlwIDxzcGFuIGNsYXNzTmFtZT1cImZsb2F0LXJpZ2h0XCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvRXhwYW5zaW9uUGFuZWxTdW1tYXJ5PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8RXhwYW5zaW9uUGFuZWxEZXRhaWxzPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb3JlLWNvbnRlbnRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImZ3LTcwMCB0ZXh0LXNtIHRleHQtcHJpbWFyeVwiPlF1YWxpZmljYXRpb248L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJmdy03MDAgdGV4dC1tZCB0ZXh0LWxpZ2h0XCI+TUQ8L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJmdy03MDAgdGV4dC1zbSB0ZXh0LXByaW1hcnlcIj5TcGVjaWFsaXphdGlvbjwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cImZ3LTcwMCB0ZXh0LW1kIHRleHQtbGlnaHRcIj5EZXJtaXRvbG9neTwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImZ3LTcwMCB0ZXh0LXNtIHRleHQtcHJpbWFyeVwiPkNvbGxlZ2U8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJmdy03MDAgdGV4dC1tZCB0ZXh0LWxpZ2h0XCI+TUdVIFVuaXZlcnNpdHksIDIwMDk8L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9FeHBhbnNpb25QYW5lbERldGFpbHM+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9FeHBhbnNpb25QYW5lbD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPEV4cGFuc2lvblBhbmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8RXhwYW5zaW9uUGFuZWxTdW1tYXJ5IGV4cGFuZEljb249ezxFeHBhbmRNb3JlSWNvbiAvPn0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRpdGxlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRXhwZXJpbmVjZSA8c3BhbiBjbGFzc05hbWU9XCJmbG9hdC1yaWdodFwiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0V4cGFuc2lvblBhbmVsU3VtbWFyeT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPEV4cGFuc2lvblBhbmVsRGV0YWlscz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9yZS1jb250ZW50XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJmdy03MDAgdGV4dC1zbSB0ZXh0LXByaW1hcnlcIj5RdWFsaWZpY2F0aW9uPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwiZnctNzAwIHRleHQtbWQgdGV4dC1saWdodFwiPk1EPC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiZnctNzAwIHRleHQtc20gdGV4dC1wcmltYXJ5XCI+U3BlY2lhbGl6YXRpb248L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJmdy03MDAgdGV4dC1tZCB0ZXh0LWxpZ2h0XCI+RGVybWl0b2xvZ3k8L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJmdy03MDAgdGV4dC1zbSB0ZXh0LXByaW1hcnlcIj5Db2xsZWdlPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwiZnctNzAwIHRleHQtbWQgdGV4dC1saWdodFwiPk1HVSBVbml2ZXJzaXR5LCAyMDA5PC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvRXhwYW5zaW9uUGFuZWxEZXRhaWxzPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvRXhwYW5zaW9uUGFuZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGxpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxFeHBhbnNpb25QYW5lbD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPEV4cGFuc2lvblBhbmVsU3VtbWFyeSBleHBhbmRJY29uPXs8RXhwYW5kTW9yZUljb24gLz59PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0aXRsZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFN1YnNjcmliZWQgU2VyaXZjZXMgPHNwYW4gY2xhc3NOYW1lPVwiZmxvYXQtcmlnaHRcIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9FeHBhbnNpb25QYW5lbFN1bW1hcnk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxFeHBhbnNpb25QYW5lbERldGFpbHM+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vcmUtY29udGVudFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiZnctNzAwIHRleHQtc20gdGV4dC1wcmltYXJ5XCI+UXVhbGlmaWNhdGlvbjwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cImZ3LTcwMCB0ZXh0LW1kIHRleHQtbGlnaHRcIj5NRDwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImZ3LTcwMCB0ZXh0LXNtIHRleHQtcHJpbWFyeVwiPlNwZWNpYWxpemF0aW9uPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwiZnctNzAwIHRleHQtbWQgdGV4dC1saWdodFwiPkRlcm1pdG9sb2d5PC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiZnctNzAwIHRleHQtc20gdGV4dC1wcmltYXJ5XCI+Q29sbGVnZTwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cImZ3LTcwMCB0ZXh0LW1kIHRleHQtbGlnaHRcIj5NR1UgVW5pdmVyc2l0eSwgMjAwOTwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0V4cGFuc2lvblBhbmVsRGV0YWlscz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0V4cGFuc2lvblBhbmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBQcm9mZXNzaW9uYWxHcmFwaFxuIiwiaW1wb3J0IFByb2Zlc3Npb25hbEdyYXBoIGZyb20gJy4vUHJvZmVzc2lvbmFsR3JhcGguanMnXG5cbmV4cG9ydCBkZWZhdWx0IFByb2Zlc3Npb25hbEdyYXBoIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgYXhpb3MgZnJvbSAnYXhpb3MnXG5cbmNsYXNzIExvY2F0aW9uU2VhcmNoIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIHNlYXJjaDogXCJcIixcbiAgICAgICAgICAgIHNlYXJjaFJlc3VsdHM6IFtdXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRMb2NhdGlvbihsb2NhdGlvbikge1xuICAgICAgICB2YXIgYXV0byA9IG5ldyBnb29nbGUubWFwcy5wbGFjZXMuQXV0b2NvbXBsZXRlU2VydmljZSgpXG5cbiAgICAgICAgdmFyIHJlcXVlc3QgPSB7XG4gICAgICAgICAgICBpbnB1dDogbG9jYXRpb24sXG4gICAgICAgICAgICB0eXBlczogWydnZW9jb2RlJ10sXG4gICAgICAgICAgICBjb21wb25lbnRSZXN0cmljdGlvbnM6IHsgY291bnRyeTogJ2luJyB9XG4gICAgICAgIH07XG4gICAgICAgIGlmIChsb2NhdGlvbikge1xuICAgICAgICAgICAgYXV0by5nZXRQbGFjZVByZWRpY3Rpb25zKHJlcXVlc3QsIGZ1bmN0aW9uIChyZXN1bHRzLCBzdGF0dXMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgc2VhcmNoUmVzdWx0czogcmVzdWx0cyB9KVxuICAgICAgICAgICAgfS5iaW5kKHRoaXMpKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgaW5wdXRIYW5kbGVyKGUpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBzZWFyY2g6IGUudGFyZ2V0LnZhbHVlXG4gICAgICAgIH0pXG4gICAgICAgIHRoaXMuZ2V0TG9jYXRpb24oZS50YXJnZXQudmFsdWUpXG5cbiAgICB9XG5cbiAgICBzZWxlY3RMb2NhdGlvbihsb2NhdGlvbikge1xuICAgICAgICBsZXQgbWFwID0gbmV3IGdvb2dsZS5tYXBzLk1hcChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFwJyksIHtcbiAgICAgICAgICAgIGNlbnRlcjogeyBsYXQ6IC0zMy44NjcsIGxuZzogMTUxLjE5NSB9LFxuICAgICAgICAgICAgem9vbTogMTVcbiAgICAgICAgfSlcbiAgICAgICAgbGV0IHNlcnZpY2UgPSBuZXcgZ29vZ2xlLm1hcHMucGxhY2VzLlBsYWNlc1NlcnZpY2UobWFwKTtcbiAgICAgICAgc2VydmljZS5nZXREZXRhaWxzKHtcbiAgICAgICAgICAgIHJlZmVyZW5jZTogbG9jYXRpb24ucmVmZXJlbmNlXG4gICAgICAgIH0sIGZ1bmN0aW9uIChwbGFjZSwgc3RhdHVzKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLnNlbGVjdExvY2F0aW9uKHBsYWNlKVxuICAgICAgICAgICAgdGhpcy5wcm9wcy5oaXN0b3J5LmdvKC0xKVxuXG4gICAgICAgIH0uYmluZCh0aGlzKSlcbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgbGV0IGlucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RvcExvY2F0aW9uU2VhcmNoJylcbiAgICAgICAgaW5wdXQuZm9jdXMoKVxuICAgIH1cblxuICAgIHN0YXRpYyBjb250ZXh0VHlwZXMgPSB7XG4gICAgICAgIHJvdXRlcjogKCkgPT4gbnVsbFxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICA8aGVhZGVyIGNsYXNzTmFtZT1cInNraW4td2hpdGUgZml4ZWQgaG9yaXpvbnRhbCB0b3AgbG9jYXRpb24tZGV0ZWN0LWhlYWRlclwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lci1mbHVpZFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC0xMlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNlbGVjdC1sb2NhdGlvbi1yb3cgdGV4dC1jZW50ZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnByb3BzLmhpc3RvcnkuZ28oLTEpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fSBjbGFzc05hbWU9XCJjdC1pbWcgY3QtaW1nLW1kIGNsb3NlXCI+PGltZyBzcmM9XCIvYXNzZXRzL2ltZy9jdXN0b21lci1pY29ucy9jbG9zZS1ibGFjay5zdmdcIiBjbGFzc05hbWU9XCJpbWctZmx1aWRcIiAvPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoNCBjbGFzc05hbWU9XCJmdy03MDAgdGV4dC1tZFwiPlNlbGVjdCBMb2NhdGlvbjwvaDQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLTEyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic2VhcmNoLXJvd1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG9uLWdyb3VwIGxvY2F0aW9uLWRldGVjdC1maWVsZFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIHZhbHVlPXt0aGlzLnN0YXRlLnNlYXJjaH0gb25DaGFuZ2U9e3RoaXMuaW5wdXRIYW5kbGVyLmJpbmQodGhpcyl9IGNsYXNzTmFtZT1cImZvcm0tY29udHJvbCBpbnB1dC1tZCBzZWFyY2gtaW5wdXQgbm8tc2hhZG93XCIgcGxhY2Vob2xkZXI9XCJTZWxlY3QgYW55IGNpdHkgb3IgbG9jYWxpdHlcIiBpZD1cInRvcExvY2F0aW9uU2VhcmNoXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJjdC1pbWcgY3QtaW1nLXNtIG1hcC1tYXJrZXItYmx1ZVwiPjxpbWcgc3JjPVwiL2Fzc2V0cy9pbWcvY3VzdG9tZXItaWNvbnMvbWFwLW1hcmtlci1ibHVlLnN2Z1wiIGNsYXNzTmFtZT1cImltZy1mbHVpZFwiIC8+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImRldGVjdC1teS1sb2NhaXRvblwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImN0LWltZyBjdC1pbWcteHNcIj48aW1nIHNyYz1cIi9hc3NldHMvaW1nL2N1c3RvbWVyLWljb25zL2dwcy5zdmdcIiBjbGFzc05hbWU9XCJpbWctZmx1aWRcIiAvPjwvc3Bhbj5EZXRlY3QgTXkgTG9jYXRpb25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2hlYWRlcj5cbiAgICAgICAgICAgICAgICA8c2VjdGlvbiBjbGFzc05hbWU9XCJ3cmFwIGxvY2F0b24tZGV0ZWN0LXNjcmVlblwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIndpZGdldC1wYW5lbFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGg0IGNsYXNzTmFtZT1cInBhbmVsLXRpdGxlXCI+U2VhcmNoIFJlc3VsdDwvaDQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBhbmVsLWNvbnRlbnQgcGQtMFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx1bCBjbGFzc05hbWU9XCJsaXN0IGNpdHktbGlzdFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlLnNlYXJjaFJlc3VsdHMubWFwKChyZXN1bHQsIGkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gPGxpIGtleT17aX0gb25DbGljaz17dGhpcy5zZWxlY3RMb2NhdGlvbi5iaW5kKHRoaXMsIHJlc3VsdCl9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YT57cmVzdWx0LmRlc2NyaXB0aW9ufVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiY2l0eS1sb2NcIj5DaXR5PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvc2VjdGlvbj5cbiAgICAgICAgICAgICAgICA8ZGl2IGlkPVwibWFwXCIgc3R5bGU9e3sgZGlzcGxheTogJ25vbmUnIH19PjwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IExvY2F0aW9uU2VhcmNoXG4iLCJpbXBvcnQgTG9jYXRpb25TZWFyY2ggZnJvbSAnLi9Mb2NhdGlvblNlYXJjaC5qcydcblxuXG5leHBvcnQgZGVmYXVsdCBMb2NhdGlvblNlYXJjaCIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG5pbXBvcnQgRG9jdG9yUHJvZmlsZUNhcmQgZnJvbSAnLi4vY29tbW9ucy9kb2N0b3JQcm9maWxlQ2FyZC9pbmRleC5qcydcbmltcG9ydCBEZXRhaWxzRm9ybSBmcm9tICcuL2RldGFpbHNGb3JtL2luZGV4LmpzJ1xuaW1wb3J0IFNlbGVjdGVkQ2xpbmljIGZyb20gJy4uL2NvbW1vbnMvc2VsZWN0ZWRDbGluaWMvaW5kZXguanMnXG5cbmNsYXNzIFBhdGllbnREZXRhaWxzIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIHNlbGVjdGVkRG9jdG9yOiBudWxsLFxuICAgICAgICAgICAgc2VsZWN0ZWRDbGluaWM6IG51bGwsXG4gICAgICAgICAgICBzZWxlY3RlZFNsb3Q6IG51bGxcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByb2NlZWQoKXtcbiAgICAgICAgdGhpcy5jb250ZXh0LnJvdXRlci5oaXN0b3J5LnB1c2goJy9wYXltZW50JylcbiAgICB9XG5cbiAgICBnZXRMb2NhdGlvblBhcmFtKHRhZykge1xuICAgICAgICAvLyB0aGlzIEFQSSBhc3N1bWVzIHRoZSBjb250ZXh0IG9mIHJlYWN0LXJvdXRlci00XG4gICAgICAgIGNvbnN0IHBhcmFtU3RyaW5nID0gdGhpcy5wcm9wcy5sb2NhdGlvbi5zZWFyY2hcbiAgICAgICAgY29uc3QgcGFyYW1zID0gbmV3IFVSTFNlYXJjaFBhcmFtcyhwYXJhbVN0cmluZylcbiAgICAgICAgcmV0dXJuIHBhcmFtcy5nZXQodGFnKVxuICAgIH1cblxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgbGV0IGRvY3RvcklkID0gdGhpcy5wcm9wcy5tYXRjaC5wYXJhbXMuaWRcbiAgICAgICAgICAgIGxldCBjbGluaWNJZCA9IHRoaXMucHJvcHMubWF0Y2gucGFyYW1zLmNsaW5pY0lkXG4gICAgICAgICAgICBsZXQgc2VsZWN0ZWRTbG90ID0gdGhpcy5nZXRMb2NhdGlvblBhcmFtKCd0JylcbiAgICAgICAgICAgIHNlbGVjdGVkU2xvdCA9IG5ldyBEYXRlKHBhcnNlRmxvYXQoc2VsZWN0ZWRTbG90KSlcbiAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKGRvY3RvcklkICYmIGNsaW5pY0lkICYmIHNlbGVjdGVkU2xvdCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZERvY3RvcjogZG9jdG9ySWQsXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkQ2xpbmljOiBjbGluaWNJZCxcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRTbG90OiBzZWxlY3RlZFNsb3QudG9TdHJpbmcoKVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5nZXREb2N0b3JCeUlkKGRvY3RvcklkKVxuICAgICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIChlKSB7XG5cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN0YXRpYyBjb250ZXh0VHlwZXMgPSB7XG4gICAgICAgIHJvdXRlcjogKCkgPT4gbnVsbFxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwYXRpZW50RGV0YWlsc1wiPlxuXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnByb3BzLkRPQ1RPUlNbdGhpcy5zdGF0ZS5zZWxlY3RlZERvY3Rvcl0gP1xuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8RG9jdG9yUHJvZmlsZUNhcmRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGlkZUJvdHRvbT17dHJ1ZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGlkZUJvb2tOb3c9e3RydWV9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRldGFpbHM9e3RoaXMucHJvcHMuRE9DVE9SU1t0aGlzLnN0YXRlLnNlbGVjdGVkRG9jdG9yXX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxTZWxlY3RlZENsaW5pY1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZERvY3Rvcj17dGhpcy5wcm9wcy5ET0NUT1JTW3RoaXMuc3RhdGUuc2VsZWN0ZWREb2N0b3JdfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZENsaW5pYz17dGhpcy5zdGF0ZS5zZWxlY3RlZENsaW5pY31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic2VsZWN0ZWRBcHBvaW50bWVudFNsb3RcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGg1PlNlbGVjdGVkIEFwcG9pbnRtZW50IFNsb3Q8L2g1PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJhcHBkYXRlXCI+QXBwb2ludG1lbnQgRGF0ZTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZGF0ZVwiPnsgdGhpcy5zdGF0ZS5zZWxlY3RlZFNsb3QgfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8RGV0YWlsc0Zvcm0gLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cInByb2NlZWRidG5cIiBvbkNsaWNrPXt0aGlzLnByb2NlZWQuYmluZCh0aGlzKX0+Q29uZmlybSBCb29raW5nPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj4gOiBcIlwiXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgUGF0aWVudERldGFpbHNcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG5jbGFzcyBEZXRhaWxzRm9ybSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgICBwYXRpZW50TmFtZSA6ICcnLFxuICAgICAgICAgICAgcGF0aWVudEVtYWlsIDogJycsXG4gICAgICAgICAgICBwYXRpZW50R2VuZGVyIDogJ21hbGUnLFxuICAgICAgICAgICAgcGF0aWVudE1vYmlsZSA6ICcnLFxuICAgICAgICAgICAgb3RwIDonJ1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaW5wdXRIYW5kbGVyKHdoaWNoLCBlKXtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IFt3aGljaF0gOiBlLnRhcmdldC52YWx1ZSB9KVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJkZXRhaWxzRm9ybVwiPlxuICAgICAgICAgICAgICAgIDxoNT5QbGVhc2UgcHJvdmlkZSBwYXRpZW50IGRldGFpbHM8L2g1PlxuXG4gICAgICAgICAgICAgICAgPGlucHV0IHZhbHVlPXt0aGlzLnN0YXRlLnBhdGllbnROYW1lfSBvbkNoYW5nZT17dGhpcy5pbnB1dEhhbmRsZXIuYmluZCh0aGlzLCdwYXRpZW50TmFtZScpfSBjbGFzc05hbWU9XCJwdG5hbWVcIiBwbGFjZWhvbGRlcj1cIlBhdGllbnQgTmFtZSpcIiAvPlxuICAgICAgICAgICAgICAgIDxpbnB1dCB2YWx1ZT17dGhpcy5zdGF0ZS5wYXRpZW50RW1haWx9IG9uQ2hhbmdlPXt0aGlzLmlucHV0SGFuZGxlci5iaW5kKHRoaXMsJ3BhdGllbnRFbWFpbCcpfSBjbGFzc05hbWU9XCJwdGVtYWlsXCIgcGxhY2Vob2xkZXI9XCJFbWFpbCpcIiAvPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicHRnZW5kZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4+R2VuZGVyIDo8L3NwYW4+IFxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInJhZGlvXCIgbmFtZT1cImdlbmRlclwiIHZhbHVlPVwibWFsZVwiIGNoZWNrZWQ9e3RoaXMuc3RhdGUucGF0aWVudEdlbmRlciA9PT0gXCJtYWxlXCJ9IG9uQ2hhbmdlPXt0aGlzLmlucHV0SGFuZGxlci5iaW5kKHRoaXMsJ3BhdGllbnRHZW5kZXInKX0vPiBNYWxlXG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwicmFkaW9cIiBuYW1lPVwiZ2VuZGVyXCIgdmFsdWU9XCJmZW1hbGVcIiBjaGVja2VkPXt0aGlzLnN0YXRlLnBhdGllbnRHZW5kZXIgPT09IFwiZmVtYWxlXCJ9IG9uQ2hhbmdlPXt0aGlzLmlucHV0SGFuZGxlci5iaW5kKHRoaXMsJ3BhdGllbnRHZW5kZXInKX0vPiBGZW1hbGVcbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8aW5wdXQgdmFsdWU9e3RoaXMuc3RhdGUucGF0aWVudE1vYmlsZX0gb25DaGFuZ2U9e3RoaXMuaW5wdXRIYW5kbGVyLmJpbmQodGhpcywncGF0aWVudE1vYmlsZScpfSBjbGFzc05hbWU9XCJwdG1vYmlsZVwiIHBsYWNlaG9sZGVyPVwiTW9iaWxlKlwiIC8+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJvdHBidG5cIj4oUmUpU2VuZCBPVFA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8aW5wdXQgdmFsdWU9e3RoaXMuc3RhdGUub3RwfSBvbkNoYW5nZT17dGhpcy5pbnB1dEhhbmRsZXIuYmluZCh0aGlzLCdvdHAnKX0gY2xhc3NOYW1lPVwicHRvdHBcIiBwbGFjZWhvbGRlcj1cIkVudGVyIE9UUCpcIiAvPlxuXG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgRGV0YWlsc0Zvcm1cbiIsImltcG9ydCBEZXRhaWxzRm9ybSBmcm9tICcuL0RldGFpbHNGb3JtLmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBEZXRhaWxzRm9ybSIsImltcG9ydCBQYXRpZW50RGV0YWlscyBmcm9tICcuL1BhdGllbnREZXRhaWxzLmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBQYXRpZW50RGV0YWlscyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCBQYXltZW50SWNvbiBmcm9tICdtYXRlcmlhbC11aS1pY29ucy9QYXltZW50JztcbmltcG9ydCBDYXNoSWNvbiBmcm9tICdtYXRlcmlhbC11aS1pY29ucy9BdHRhY2hNb25leSc7XG5cbmNsYXNzIFBheW1lbnRWaWV3IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICB9XG5cbiAgICBwcm9jZWVkKCl7XG4gICAgICAgIHRoaXMuY29udGV4dC5yb3V0ZXIuaGlzdG9yeS5wdXNoKFwiL2Jvb2tpbmcvOnJlZklkXCIpXG4gICAgfVxuXG4gICAgc3RhdGljIGNvbnRleHRUeXBlcyA9IHtcbiAgICAgICAgcm91dGVyOiAoKSA9PiBudWxsXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBheW1lbnRcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm9mZmVyUm93XCI+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuPkdldCAxMCUgY2FzaGJhY2sgZm9yIGFsbCBvbmxpbmUgcGF5bWVudCwgVCZDPC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGF5bWVudFJvd1wiIG9uQ2xpY2s9e3RoaXMucHJvY2VlZC5iaW5kKHRoaXMpfT5cbiAgICAgICAgICAgICAgICAgICAgPFBheW1lbnRJY29uIGNsYXNzTmFtZT1cInBheW1lbnRJY29uXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4+UGF5dG0gV2FsbGV0PC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGF5bWVudFJvd1wiIG9uQ2xpY2s9e3RoaXMucHJvY2VlZC5iaW5kKHRoaXMpfT5cbiAgICAgICAgICAgICAgICAgICAgPFBheW1lbnRJY29uIGNsYXNzTmFtZT1cInBheW1lbnRJY29uXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4+Q3JlZGl0L0RlYml0L0FUTSBDYXJkPC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGF5bWVudFJvd1wiIG9uQ2xpY2s9e3RoaXMucHJvY2VlZC5iaW5kKHRoaXMpfT5cbiAgICAgICAgICAgICAgICAgICAgPFBheW1lbnRJY29uIGNsYXNzTmFtZT1cInBheW1lbnRJY29uXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4+TmV0IEJhbmtpbmc8L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwYXltZW50Um93XCIgb25DbGljaz17dGhpcy5wcm9jZWVkLmJpbmQodGhpcyl9PlxuICAgICAgICAgICAgICAgICAgICA8Q2FzaEljb24gY2xhc3NOYW1lPVwicGF5bWVudEljb25cIiAvPlxuICAgICAgICAgICAgICAgICAgICA8c3Bhbj5QYXkgaW4gQ2FzaDwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBheW1lbnRSb3dcIiBvbkNsaWNrPXt0aGlzLnByb2NlZWQuYmluZCh0aGlzKX0+XG4gICAgICAgICAgICAgICAgICAgIDxQYXltZW50SWNvbiBjbGFzc05hbWU9XCJwYXltZW50SWNvblwiIC8+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuPk9uRG9jIFBheTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBQYXltZW50Vmlld1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cbmltcG9ydCBDb21tb25seVNlYXJjaGVkIGZyb20gJy4uLy4uL2NvbW1vbnMvY29tbW9ubHlTZWFyY2hlZC9pbmRleC5qcydcbmltcG9ydCBDcml0ZXJpYVNlYXJjaCBmcm9tICcuLi8uLi9jb21tb25zL2NyaXRlcmlhU2VhcmNoJ1xuXG5jbGFzcyBTZWFyY2hDcml0ZXJpYVZpZXcgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgIH1cblxuICAgIHNlYXJjaFByb2NlZWQoKSB7XG4gICAgICAgIGxldCBzZWFyY2hEYXRhID0ge1xuICAgICAgICAgICAgc2VsZWN0ZWRDcml0ZXJpYXM6IHRoaXMucHJvcHMuc2VsZWN0ZWRDcml0ZXJpYXMsXG4gICAgICAgICAgICBzZWxlY3RlZExvY2F0aW9uOiB0aGlzLnByb3BzLnNlbGVjdGVkTG9jYXRpb24sXG4gICAgICAgIH1cbiAgICAgICAgc2VhcmNoRGF0YSA9IGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzZWFyY2hEYXRhKSlcbiAgICAgICAgbGV0IGZpbHRlckRhdGEgPSBlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkodGhpcy5wcm9wcy5maWx0ZXJDcml0ZXJpYSkpXG4gICAgICAgIHRoaXMucHJvcHMuaGlzdG9yeS5wdXNoKGAvb3BkL3NlYXJjaHJlc3VsdHM/c2VhcmNoPSR7c2VhcmNoRGF0YX0mZmlsdGVyPSR7ZmlsdGVyRGF0YX1gKVxuICAgIH1cblxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICA8Q3JpdGVyaWFTZWFyY2ggey4uLnRoaXMucHJvcHN9IGNoZWNrRm9yTG9hZD17dGhpcy5wcm9wcy5MT0FERURfU0VBUkNIX0NSSVRFUklBX09QRH0gdGl0bGU9XCJTZWFyY2ggRm9yIERpc2Vhc2Ugb3IgRG9jdG9yLlwiIHR5cGU9XCJvcGRcIj5cbiAgICAgICAgICAgICAgICAgICAgPHNlY3Rpb24gY2xhc3NOYW1lPVwid3JhcCB3cmFwLTEwMFwiPlxuXG4gICAgICAgICAgICAgICAgICAgICAgICA8Q29tbW9ubHlTZWFyY2hlZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRpbmc9XCJTZWxlY3RlZCBDcml0ZXJpYVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YT17dGhpcy5wcm9wcy5zZWxlY3RlZENyaXRlcmlhc31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZD17W119XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9nZ2xlPXt0aGlzLnByb3BzLnRvZ2dsZU9QRENyaXRlcmlhLmJpbmQodGhpcyl9XG4gICAgICAgICAgICAgICAgICAgICAgICAvPlxuXG4gICAgICAgICAgICAgICAgICAgICAgICA8Q29tbW9ubHlTZWFyY2hlZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRpbmc9XCJDb21tb24gQ29uZGl0aW9uc1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImNvbmRpdGlvblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YT17dGhpcy5wcm9wcy5jb25kaXRpb25zfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkPXt0aGlzLnByb3BzLnNlbGVjdGVkQ3JpdGVyaWFzLmZpbHRlcih4ID0+IHgudHlwZSA9PSAnY29uZGl0aW9uJyl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9nZ2xlPXt0aGlzLnByb3BzLnRvZ2dsZU9QRENyaXRlcmlhLmJpbmQodGhpcyl9XG4gICAgICAgICAgICAgICAgICAgICAgICAvPlxuXG4gICAgICAgICAgICAgICAgICAgICAgICA8Q29tbW9ubHlTZWFyY2hlZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRpbmc9XCJDb21tb24gU3BlY2lhbGl0aWVzXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwic3BlY2lhbGl0eVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YT17dGhpcy5wcm9wcy5zcGVjaWFsaXphdGlvbnN9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWQ9e3RoaXMucHJvcHMuc2VsZWN0ZWRDcml0ZXJpYXMuZmlsdGVyKHggPT4geC50eXBlID09ICdzcGVjaWFsaXR5Jyl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9nZ2xlPXt0aGlzLnByb3BzLnRvZ2dsZU9QRENyaXRlcmlhLmJpbmQodGhpcyl9XG4gICAgICAgICAgICAgICAgICAgICAgICAvPlxuXG4gICAgICAgICAgICAgICAgICAgIDwvc2VjdGlvbj5cbiAgICAgICAgICAgICAgICA8L0NyaXRlcmlhU2VhcmNoPlxuXG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXt0aGlzLnNlYXJjaFByb2NlZWQuYmluZCh0aGlzKX0gY2xhc3NOYW1lPVwidi1idG4gdi1idG4tcHJpbWFyeSBidG4tbGcgZml4ZWQgaG9yaXpvbnRhbCBib3R0b20gbm8tcm91bmQgdGV4dC1sZ1wiPlNob3cgRG9jdG9yczwvYnV0dG9uPlxuXG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFNlYXJjaENyaXRlcmlhVmlld1xuIiwiaW1wb3J0IFNlYXJjaENyaXRlcmlhVmlldyBmcm9tICcuL1NlYXJjaENyaXRlcmlhVmlldy5qcydcblxuZXhwb3J0IGRlZmF1bHQgU2VhcmNoQ3JpdGVyaWFWaWV3IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IERvY3RvcnNMaXN0IGZyb20gJy4uL3NlYXJjaFJlc3VsdHMvZG9jdG9yc0xpc3QvaW5kZXguanMnXG5pbXBvcnQgQ3JpdGVyaWFTZWFyY2ggZnJvbSAnLi4vLi4vY29tbW9ucy9jcml0ZXJpYVNlYXJjaCdcbmltcG9ydCBUb3BCYXIgZnJvbSAnLi90b3BCYXInXG5cblxuY2xhc3MgU2VhcmNoUmVzdWx0c1ZpZXcgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgICAgICB0aGlzLnN0YXRlID0ge1xuXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgdGhpcy5nZXREY290b3JzKClcbiAgICB9XG5cbiAgICBnZXREY290b3JzKCkge1xuICAgICAgICBsZXQge1xuICAgICAgICAgICAgc2VsZWN0ZWRMb2NhdGlvbixcbiAgICAgICAgICAgIHNlbGVjdGVkQ3JpdGVyaWFzLFxuICAgICAgICAgICAgZmlsdGVyQ3JpdGVyaWFcbiAgICAgICAgfSA9IHRoaXMucHJvcHNcblxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgbGV0IHNlYXJjaFN0YXRlID0gdGhpcy5nZXRMb2NhdGlvblBhcmFtKCdzZWFyY2gnKVxuICAgICAgICAgICAgbGV0IGZpbHRlckNyaXRlcmlhID0gdGhpcy5nZXRMb2NhdGlvblBhcmFtKCdmaWx0ZXInKVxuICAgICAgICAgICAgaWYgKGZpbHRlckNyaXRlcmlhKSB7XG4gICAgICAgICAgICAgICAgZmlsdGVyQ3JpdGVyaWEgPSBKU09OLnBhcnNlKGZpbHRlckNyaXRlcmlhKVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBmaWx0ZXJDcml0ZXJpYSA9IHt9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzZWFyY2hTdGF0ZSA9IEpTT04ucGFyc2Uoc2VhcmNoU3RhdGUpXG4gICAgICAgICAgICB0aGlzLmdldERvY3Rvckxpc3Qoc2VhcmNoU3RhdGUsIGZpbHRlckNyaXRlcmlhLCB0cnVlKVxuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGUpXG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIGFwcGx5RmlsdGVycyhmaWx0ZXJTdGF0ZSkge1xuICAgICAgICBsZXQgc2VhcmNoU3RhdGUgPSB7XG4gICAgICAgICAgICBzZWxlY3RlZENyaXRlcmlhczogdGhpcy5wcm9wcy5zZWxlY3RlZENyaXRlcmlhcyxcbiAgICAgICAgICAgIHNlbGVjdGVkTG9jYXRpb246IHRoaXMucHJvcHMuc2VsZWN0ZWRMb2NhdGlvbixcbiAgICAgICAgfVxuICAgICAgICBsZXQgc2VhcmNoRGF0YSA9IGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzZWFyY2hTdGF0ZSkpXG4gICAgICAgIGxldCBmaWx0ZXJEYXRhID0gZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGZpbHRlclN0YXRlKSlcbiAgICAgICAgdGhpcy5wcm9wcy5oaXN0b3J5LnJlcGxhY2UoYC9vcGQvc2VhcmNocmVzdWx0cz9zZWFyY2g9JHtzZWFyY2hEYXRhfSZmaWx0ZXI9JHtmaWx0ZXJEYXRhfWApXG5cbiAgICAgICAgdGhpcy5nZXREb2N0b3JMaXN0KHNlYXJjaFN0YXRlLCBmaWx0ZXJTdGF0ZSwgdHJ1ZSlcbiAgICB9XG5cbiAgICBnZXRMb2NhdGlvblBhcmFtKHRhZykge1xuICAgICAgICAvLyB0aGlzIEFQSSBhc3N1bWVzIHRoZSBjb250ZXh0IG9mIHJlYWN0LXJvdXRlci00XG4gICAgICAgIGNvbnN0IHBhcmFtU3RyaW5nID0gdGhpcy5wcm9wcy5sb2NhdGlvbi5zZWFyY2hcbiAgICAgICAgY29uc3QgcGFyYW1zID0gbmV3IFVSTFNlYXJjaFBhcmFtcyhwYXJhbVN0cmluZylcbiAgICAgICAgcmV0dXJuIHBhcmFtcy5nZXQodGFnKVxuICAgIH1cblxuICAgIGdldERvY3Rvckxpc3Qoc2VhcmNoU3RhdGUsIGZpbHRlckNyaXRlcmlhLCBtZXJnZVN0YXRlKSB7XG4gICAgICAgIHRoaXMucHJvcHMuZ2V0RG9jdG9ycyhzZWFyY2hTdGF0ZSwgZmlsdGVyQ3JpdGVyaWEsIG1lcmdlU3RhdGUpO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgPENyaXRlcmlhU2VhcmNoIHsuLi50aGlzLnByb3BzfSBjaGVja0ZvckxvYWQ9e3RoaXMucHJvcHMuTE9BREVEX0RPQ1RPUl9TRUFSQ0h9IHRpdGxlPVwiU2VhcmNoIEZvciBEaXNlYXNlIG9yIERvY3Rvci5cIiB0eXBlPVwib3BkXCI+XG4gICAgICAgICAgICAgICAgICAgIDxUb3BCYXIgey4uLnRoaXMucHJvcHN9IGFwcGx5RmlsdGVycz17dGhpcy5hcHBseUZpbHRlcnMuYmluZCh0aGlzKX0gLz5cbiAgICAgICAgICAgICAgICAgICAgPERvY3RvcnNMaXN0IHsuLi50aGlzLnByb3BzfSAvPlxuICAgICAgICAgICAgICAgIDwvQ3JpdGVyaWFTZWFyY2g+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFNlYXJjaFJlc3VsdHNWaWV3XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcblxuaW1wb3J0IERvY3RvclByb2ZpbGVDYXJkIGZyb20gJy4uLy4uL2NvbW1vbnMvZG9jdG9yUHJvZmlsZUNhcmQvaW5kZXguanMnXG4vLyBpbXBvcnQgSW5maW5pdGVTY3JvbGwgZnJvbSAncmVhY3QtaW5maW5pdGUtc2Nyb2xsZXInO1xuXG5cbmNsYXNzIERvY3RvcnNMaXN0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgbGV0IHsgRE9DVE9SUywgZG9jdG9yTGlzdCB9ID0gdGhpcy5wcm9wc1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8c2VjdGlvbiBjbGFzc05hbWU9XCJ3cmFwIHNlYXJjaC1yZXN1bHQtZHJcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lci1mbHVpZFwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtMTJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvY3Rvckxpc3QubWFwKChkb2NJZCwgaSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDxEb2N0b3JQcm9maWxlQ2FyZCB7Li4udGhpcy5wcm9wc30gZGV0YWlscz17RE9DVE9SU1tkb2NJZF19IGtleT17aX0gLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L3NlY3Rpb24+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IERvY3RvcnNMaXN0XG4iLCJpbXBvcnQgRG9jdG9yTGlzdCBmcm9tICcuL0RvY3RvcnNMaXN0LmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBEb2N0b3JMaXN0IiwiaW1wb3J0IFNlYXJjaFJlc3VsdHNWaWV3IGZyb20gJy4vU2VhcmNoUmVzdWx0c1ZpZXcuanMnXG5cbmV4cG9ydCBkZWZhdWx0IFNlYXJjaFJlc3VsdHNWaWV3IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cbmltcG9ydCBNZW51LCB7IE1lbnVJdGVtIH0gZnJvbSAnbWF0ZXJpYWwtdWkvTWVudSc7XG5pbXBvcnQgUmFuZ2UgZnJvbSAncmMtc2xpZGVyL2xpYi9SYW5nZSc7XG5cbmNsYXNzIFRvcEJhciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgICBhbmNob3JFbDogbnVsbCxcbiAgICAgICAgICAgIG9wZW5GaWx0ZXI6IGZhbHNlLFxuICAgICAgICAgICAgcHJpY2VSYW5nZTogWzEwMCwgMTUwMF0sXG4gICAgICAgICAgICBzb3J0X29uOiBudWxsLFxuICAgICAgICAgICAgc2l0c19hdF9jbGluaWM6IGZhbHNlLFxuICAgICAgICAgICAgc2l0c19hdF9ob3NwaXRhbDogZmFsc2UsXG4gICAgICAgICAgICBpc19mZW1hbGU6IGZhbHNlLFxuICAgICAgICAgICAgaXNfYXZhaWxhYmxlOiBmYWxzZVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhwcm9wcykge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHsgLi4ucHJvcHMuZmlsdGVyQ3JpdGVyaWEgfSlcbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IC4uLnRoaXMucHJvcHMuZmlsdGVyQ3JpdGVyaWEgfSlcbiAgICB9XG5cbiAgICBoYW5kbGVJbnB1dChlKSB7XG4gICAgICAgIGxldCBldk5hbWUgPSBlLnRhcmdldC5uYW1lXG4gICAgICAgIGxldCBjaGVja2VkID0gZS50YXJnZXQuY2hlY2tlZFxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgIFtldk5hbWVdOiBjaGVja2VkXG4gICAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIGFwcGx5RmlsdGVycygpIHtcbiAgICAgICAgbGV0IGZpbHRlclN0YXRlID0ge1xuICAgICAgICAgICAgcHJpY2VSYW5nZTogdGhpcy5zdGF0ZS5wcmljZVJhbmdlLFxuICAgICAgICAgICAgc2l0c19hdDogdGhpcy5zdGF0ZS5zaXRzX2F0LFxuICAgICAgICAgICAgc29ydF9vbjogdGhpcy5zdGF0ZS5zb3J0X29uLFxuICAgICAgICAgICAgaXNfZmVtYWxlOiB0aGlzLnN0YXRlLmlzX2ZlbWFsZSxcbiAgICAgICAgICAgIGlzX2F2YWlsYWJsZTogdGhpcy5zdGF0ZS5pc19hdmFpbGFibGUsXG4gICAgICAgICAgICBzaXRzX2F0X2NsaW5pYzogdGhpcy5zdGF0ZS5zaXRzX2F0X2NsaW5pYyxcbiAgICAgICAgICAgIHNpdHNfYXRfaG9zcGl0YWw6IHRoaXMuc3RhdGUuc2l0c19hdF9ob3NwaXRhbFxuICAgICAgICB9XG4gICAgICAgIHRoaXMucHJvcHMuYXBwbHlGaWx0ZXJzKGZpbHRlclN0YXRlKVxuICAgICAgICB0aGlzLnNldFN0YXRlKHsgb3BlbkZpbHRlcjogZmFsc2UgfSlcbiAgICB9XG5cbiAgICBoYW5kbGVPcGVuKGV2ZW50KSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBhbmNob3JFbDogZXZlbnQuY3VycmVudFRhcmdldCB9KVxuICAgIH1cblxuICAgIGhhbmRsZUNsb3NlKHR5cGUpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGFuY2hvckVsOiBudWxsLCBzb3J0X29uOiB0eXBlIH0sICgpID0+IHtcbiAgICAgICAgICAgIGlmICh0eXBlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hcHBseUZpbHRlcnMoKVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIHRvZ2dsZUZpbHRlcigpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBvcGVuRmlsdGVyOiAhdGhpcy5zdGF0ZS5vcGVuRmlsdGVyXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgaGFuZGxlUmFuZ2UodHlwZSwgcmFuZ2UpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBbdHlwZV06IHJhbmdlXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgZ2V0Q3JpdGVyaWFTdHJpbmcoc2VsZWN0ZWRDcml0ZXJpYXMpIHtcbiAgICAgICAgaWYgKHNlbGVjdGVkQ3JpdGVyaWFzICYmIHNlbGVjdGVkQ3JpdGVyaWFzLmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuIHNlbGVjdGVkQ3JpdGVyaWFzLnJlZHVjZSgoZmluYWwsIGN1cnIsIGkpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoaSAhPSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGZpbmFsICs9ICcsICdcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZmluYWwgKz0gYCR7Y3Vyci5uYW1lfWBcbiAgICAgICAgICAgICAgICByZXR1cm4gZmluYWxcbiAgICAgICAgICAgIH0sIFwiXCIpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgbGV0IGNyaXRlcmlhU3RyID0gdGhpcy5nZXRDcml0ZXJpYVN0cmluZyh0aGlzLnByb3BzLnNlbGVjdGVkQ3JpdGVyaWFzKVxuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8c2VjdGlvbiBjbGFzc05hbWU9XCJmaWx0ZXItcm93XCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250YWluZXItZmx1aWRcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLTEyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmaWx0ZXItaXRlbVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFjdGlvbi1maWx0ZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx1bCBjbGFzc05hbWU9XCJpbmxpbmUtbGlzdFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaSBvbkNsaWNrPXt0aGlzLmhhbmRsZU9wZW4uYmluZCh0aGlzKX0+PHNwYW4gY2xhc3NOYW1lPVwiY3QtaW1nIGN0LWltZy1zbSBmaWx0ZXItaWNvbiB0ZXh0LXJpZ2h0XCI+PGltZyBzcmM9XCIvYXNzZXRzL2ltZy9jdXN0b21lci1pY29ucy9yYW5nZS5zdmdcIiBjbGFzc05hbWU9XCJpbWctZmx1aWRcIiAvPjwvc3Bhbj48L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaSBvbkNsaWNrPXt0aGlzLnRvZ2dsZUZpbHRlci5iaW5kKHRoaXMpfT48c3BhbiBjbGFzc05hbWU9XCJjdC1pbWcgY3QtaW1nLXNtIGZpbHRlci1pY29uIHRleHQtcmlnaHQgYXBwbGllZC1maWx0ZXJcIj48aW1nIHNyYz1cIi9hc3NldHMvaW1nL2N1c3RvbWVyLWljb25zL2ZpbHRlci5zdmdcIiBjbGFzc05hbWU9XCJpbWctZmx1aWRcIiAvPjwvc3Bhbj48c3BhbiBjbGFzc05hbWU9XCJhcHBsaWVkLWZpbHRlci1ub3RpXCIgLz48L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmlsdGVyLXRpdGxlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5kb2N0b3JMaXN0Lmxlbmd0aH0gUmVzdWx0cyBmb3VuZCBmb3IgPHNwYW4gY2xhc3NOYW1lPVwiZnctNzAwXCI+IHtjcml0ZXJpYVN0cn08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxNZW51XG4gICAgICAgICAgICAgICAgICAgIGlkPVwic29ydC1tZW51XCJcbiAgICAgICAgICAgICAgICAgICAgYW5jaG9yRWw9e3RoaXMuc3RhdGUuYW5jaG9yRWx9XG4gICAgICAgICAgICAgICAgICAgIG9wZW49e0Jvb2xlYW4odGhpcy5zdGF0ZS5hbmNob3JFbCl9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2xvc2U9e3RoaXMuaGFuZGxlQ2xvc2UuYmluZCh0aGlzLCBudWxsKX1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIDxNZW51SXRlbSBvbkNsaWNrPXt0aGlzLmhhbmRsZUNsb3NlLmJpbmQodGhpcywgJ25hbWUnKX0+UmVsYXZhbmNlPC9NZW51SXRlbT5cbiAgICAgICAgICAgICAgICAgICAgPE1lbnVJdGVtIG9uQ2xpY2s9e3RoaXMuaGFuZGxlQ2xvc2UuYmluZCh0aGlzLCAncHJpY2UnKX0+RmVlPC9NZW51SXRlbT5cbiAgICAgICAgICAgICAgICAgICAgPE1lbnVJdGVtIG9uQ2xpY2s9e3RoaXMuaGFuZGxlQ2xvc2UuYmluZCh0aGlzLCAnZGlzdGFuY2UnKX0+RGlzdGFuY2U8L01lbnVJdGVtPlxuICAgICAgICAgICAgICAgICAgICA8TWVudUl0ZW0gb25DbGljaz17dGhpcy5oYW5kbGVDbG9zZS5iaW5kKHRoaXMsICdleHBlcmllbmNlJyl9PkV4cGVyaWVuY2U8L01lbnVJdGVtPlxuICAgICAgICAgICAgICAgIDwvTWVudT5cblxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZS5vcGVuRmlsdGVyID8gPGRpdiBvbkNsaWNrPXt0aGlzLnRvZ2dsZUZpbHRlci5iaW5kKHRoaXMpfSBjbGFzc05hbWU9XCJvdmVybGF5IGJsYWNrXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIndpZGdldCBmaWx0ZXItcG9wdXBcIiBvbkNsaWNrPXsoZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICAgICAgICAgICAgICAgICAgICAgIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwid2lkZ2V0LWNvbnRlbnRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmaWx0ZXJSb3dcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRsXCI+QXZhaWxhYmxlIFRvZGF5PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJjaGVja2JveFwiIG5hbWU9XCJpc19hdmFpbGFibGVcIiBjaGVja2VkPXshIXRoaXMuc3RhdGUuaXNfYXZhaWxhYmxlfSBvbkNoYW5nZT17dGhpcy5oYW5kbGVJbnB1dC5iaW5kKHRoaXMpfSBjbGFzc05hbWU9XCJjaGVja0ZpbHRlclwiIC8+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3aWRnZXQtY29udGVudFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZpbHRlclJvd1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGxcIj5TaXRzIEF0PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJjaGVja2JveFwiIG5hbWU9XCJzaXRzX2F0X2NsaW5pY1wiIGNoZWNrZWQ9eyEhdGhpcy5zdGF0ZS5zaXRzX2F0X2NsaW5pY30gb25DaGFuZ2U9e3RoaXMuaGFuZGxlSW5wdXQuYmluZCh0aGlzKX0gY2xhc3NOYW1lPVwiY2hlY2tGaWx0ZXJcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiY2hlY2tGaWx0ZXJMYWJlbFwiPkNsaW5pYzwvc3Bhbj5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJjaGVja2JveFwiIG5hbWU9XCJzaXRzX2F0X2hvc3BpdGFsXCIgY2hlY2tlZD17ISF0aGlzLnN0YXRlLnNpdHNfYXRfaG9zcGl0YWx9IG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUlucHV0LmJpbmQodGhpcyl9IGNsYXNzTmFtZT1cImNoZWNrRmlsdGVyXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImNoZWNrRmlsdGVyTGFiZWxcIj5Ib3NwaXRhbDwvc3Bhbj5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIndpZGdldC1jb250ZW50XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmlsdGVyUm93XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0bFwiPlByaWNlPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidHJcIj5ScyB7dGhpcy5zdGF0ZS5wcmljZVJhbmdlWzBdfSB0byB7dGhpcy5zdGF0ZS5wcmljZVJhbmdlWzFdfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImJsXCI+UnMgMTAwPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiYnJcIj5ScyAyMDAwPC9zcGFuPlxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8UmFuZ2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtaW49ezEwMH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXg9ezIwMDB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3RoaXMuc3RhdGUucHJpY2VSYW5nZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGVwPXsxMDB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicmFuZ2VcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZVJhbmdlLmJpbmQodGhpcywgJ3ByaWNlUmFuZ2UnKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwid2lkZ2V0LWNvbnRlbnRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmaWx0ZXJSb3dcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRsXCI+RmVtYWxlIERvY3Rvcjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBuYW1lPVwiaXNfZmVtYWxlXCIgY2hlY2tlZD17ISF0aGlzLnN0YXRlLmlzX2ZlbWFsZX0gb25DaGFuZ2U9e3RoaXMuaGFuZGxlSW5wdXQuYmluZCh0aGlzKX0gY2xhc3NOYW1lPVwiY2hlY2tGaWx0ZXJcIiAvPlxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwid2lkZ2V0LWZvb3RlciBwZC0wXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwidi1idG4gdi1idG4tcHJpbWFyeSBidG4tYmxvY2sgYnRuLWxnXCIgb25DbGljaz17dGhpcy5hcHBseUZpbHRlcnMuYmluZCh0aGlzKX0+QXBwbHk8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj4gOiBcIlwiXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICA8L3NlY3Rpb24+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IFRvcEJhclxuIiwiaW1wb3J0IFRvcEJhciBmcm9tICcuL1RvcEJhci5qcydcblxuZXhwb3J0IGRlZmF1bHQgVG9wQmFyIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgeyB3aXRoUm91dGVyIH0gZnJvbSBcInJlYWN0LXJvdXRlci1kb21cIjtcblxuaW1wb3J0IFJhZGlvLCB7IFJhZGlvR3JvdXAgfSBmcm9tICdtYXRlcmlhbC11aS9SYWRpbyc7XG5pbXBvcnQgQ2hlY2tib3ggZnJvbSAnbWF0ZXJpYWwtdWkvQ2hlY2tib3gnO1xuaW1wb3J0IHsgRm9ybUxhYmVsLCBGb3JtQ29udHJvbCwgRm9ybUNvbnRyb2xMYWJlbCwgRm9ybUhlbHBlclRleHQgfSBmcm9tICdtYXRlcmlhbC11aS9Gb3JtJztcblxuXG5jbGFzcyBTZWFyY2hSZXN1bHRzRmlsdGVyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIGZlZV8wOiBmYWxzZSxcbiAgICAgICAgICAgIGZlZV8xOiBmYWxzZSxcbiAgICAgICAgICAgIGZlZV8yOiBmYWxzZSxcbiAgICAgICAgICAgIGZlZV8zOiBmYWxzZSxcbiAgICAgICAgICAgIGdlbmRlcjogJ2FueScsXG4gICAgICAgICAgICBjbGluaWNfcGVyc29uYWw6IGZhbHNlLFxuICAgICAgICAgICAgY2xpbmljX2hvc3BpdGFsOiBmYWxzZSxcbiAgICAgICAgICAgIGNsaW5pY19tdWx0aTogZmFsc2UsXG4gICAgICAgICAgICBhdmFpbGFibGVfdG9kYXk6IGZhbHNlLFxuICAgICAgICAgICAgZGlzdGFuY2U6ICczMGttJ1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyAuLi50aGlzLnByb3BzLmZpbHRlckNyaXRlcmlhIH0pXG4gICAgfVxuXG4gICAgYXBwbHlGaWx0ZXIoKSB7XG4gICAgICAgIHRoaXMucHJvcHMuc2V0T1BERmlsdGVycyh0aGlzLnN0YXRlKVxuICAgICAgICB0aGlzLnByb3BzLmhpc3RvcnkuZ28oLTEpXG4gICAgfVxuXG4gICAgaGFuZGxlQ2hlY2tib3gobmFtZSwgZSkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHsgW25hbWVdOiBlLnRhcmdldC5jaGVja2VkIH0pXG4gICAgfVxuXG4gICAgaGFuZGxlQ2hhbmdlUmFkaW8obmFtZSwgZSkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHsgW25hbWVdOiBlLnRhcmdldC52YWx1ZSB9KVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzZWFyY2hSZXN1bHRzRmlsdGVyXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdWJGaWx0ZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwic3ViSGVhZGluZ1wiPkZlZTwvcD5cbiAgICAgICAgICAgICAgICAgICAgPFJhZGlvR3JvdXBcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyaWEtbGFiZWw9XCJmZWVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZT1cImZlZTFcIlxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICA8Rm9ybUNvbnRyb2xMYWJlbCBjb250cm9sPXs8Q2hlY2tib3hcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGVja2VkPXt0aGlzLnN0YXRlLmZlZV8wfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUNoZWNrYm94LmJpbmQodGhpcywgJ2ZlZV8wJyl9XG4gICAgICAgICAgICAgICAgICAgICAgICAvPn0gbGFiZWw9XCJMZXNzIHRoYW4gMzAwXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxGb3JtQ29udHJvbExhYmVsIGNvbnRyb2w9ezxDaGVja2JveFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrZWQ9e3RoaXMuc3RhdGUuZmVlXzF9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuaGFuZGxlQ2hlY2tib3guYmluZCh0aGlzLCAnZmVlXzEnKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8+fSBsYWJlbD1cIjMwMCB0byA1MDBcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPEZvcm1Db250cm9sTGFiZWwgY29udHJvbD17PENoZWNrYm94XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2tlZD17dGhpcy5zdGF0ZS5mZWVfMn1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5oYW5kbGVDaGVja2JveC5iaW5kKHRoaXMsICdmZWVfMicpfVxuICAgICAgICAgICAgICAgICAgICAgICAgLz59IGxhYmVsPVwiNTAwIHRvIDEwMDBcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPEZvcm1Db250cm9sTGFiZWwgY29udHJvbD17PENoZWNrYm94XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2tlZD17dGhpcy5zdGF0ZS5mZWVfM31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5oYW5kbGVDaGVja2JveC5iaW5kKHRoaXMsICdmZWVfMycpfVxuICAgICAgICAgICAgICAgICAgICAgICAgLz59IGxhYmVsPVwiMTAwMCtcIiAvPlxuICAgICAgICAgICAgICAgICAgICA8L1JhZGlvR3JvdXA+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN1YkZpbHRlclwiPlxuICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJzdWJIZWFkaW5nXCI+RGlzdGFuY2U8L3A+XG4gICAgICAgICAgICAgICAgICAgIDxSYWRpb0dyb3VwXG4gICAgICAgICAgICAgICAgICAgICAgICBhcmlhLWxhYmVsPVwiRGlzdGFuY2VcIlxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZT1cIkRpc3RhbmNlMlwiXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17dGhpcy5zdGF0ZS5kaXN0YW5jZX1cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUNoYW5nZVJhZGlvLmJpbmQodGhpcywgJ2Rpc3RhbmNlJyl9XG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxGb3JtQ29udHJvbExhYmVsIHZhbHVlPVwiMzBrbVwiIGNvbnRyb2w9ezxSYWRpbyBjb2xvcj1cInByaW1hcnlcIiAvPn0gbGFiZWw9XCJVbmRlciAzMCBLTVwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8Rm9ybUNvbnRyb2xMYWJlbCB2YWx1ZT1cIjIwa21cIiBjb250cm9sPXs8UmFkaW8gY29sb3I9XCJwcmltYXJ5XCIgLz59IGxhYmVsPVwiVW5kZXIgMjAgS01cIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPEZvcm1Db250cm9sTGFiZWwgdmFsdWU9XCIxMGttXCIgY29udHJvbD17PFJhZGlvIGNvbG9yPVwicHJpbWFyeVwiIC8+fSBsYWJlbD1cIlVuZGVyIDEwIEtNXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxGb3JtQ29udHJvbExhYmVsIHZhbHVlPVwiNWttXCIgY29udHJvbD17PFJhZGlvIGNvbG9yPVwicHJpbWFyeVwiIC8+fSBsYWJlbD1cIlVuZGVyIDUgS01cIiAvPlxuXG4gICAgICAgICAgICAgICAgICAgIDwvUmFkaW9Hcm91cD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3ViRmlsdGVyXCI+XG4gICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInN1YkhlYWRpbmdcIj5UeXBlIE9mIENsaW5pYzwvcD5cbiAgICAgICAgICAgICAgICAgICAgPFJhZGlvR3JvdXBcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyaWEtbGFiZWw9XCJjbGluaWNUeXBlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU9XCJjbGluaWNUeXBlXCJcbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgPEZvcm1Db250cm9sTGFiZWwgY29udHJvbD17PENoZWNrYm94XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2tlZD17dGhpcy5zdGF0ZS5jbGluaWNfcGVyc29uYWx9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuaGFuZGxlQ2hlY2tib3guYmluZCh0aGlzLCAnY2xpbmljX3BlcnNvbmFsJyl9XG4gICAgICAgICAgICAgICAgICAgICAgICAvPn0gbGFiZWw9XCJQZXJzb25hbFwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8Rm9ybUNvbnRyb2xMYWJlbCBjb250cm9sPXs8Q2hlY2tib3hcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGVja2VkPXt0aGlzLnN0YXRlLmNsaW5pY19ob3NwaXRhbH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5oYW5kbGVDaGVja2JveC5iaW5kKHRoaXMsICdjbGluaWNfaG9zcGl0YWwnKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8+fSBsYWJlbD1cIkhvc3BpdGFsXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxGb3JtQ29udHJvbExhYmVsIGNvbnRyb2w9ezxDaGVja2JveFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrZWQ9e3RoaXMuc3RhdGUuY2xpbmljX211bHRpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUNoZWNrYm94LmJpbmQodGhpcywgJ2NsaW5pY19tdWx0aScpfVxuICAgICAgICAgICAgICAgICAgICAgICAgLz59IGxhYmVsPVwiTXVsdGktZG9jdG9yIGNsaW5pY1wiIC8+XG4gICAgICAgICAgICAgICAgICAgIDwvUmFkaW9Hcm91cD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3ViRmlsdGVyXCI+XG4gICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInN1YkhlYWRpbmdcIj5HZW5kZXI8L3A+XG4gICAgICAgICAgICAgICAgICAgIDxSYWRpb0dyb3VwXG4gICAgICAgICAgICAgICAgICAgICAgICBhcmlhLWxhYmVsPVwiZ2VuZGVyXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU9XCJnZW5kZXIyXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXt0aGlzLnN0YXRlLmdlbmRlcn1cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUNoYW5nZVJhZGlvLmJpbmQodGhpcywgJ2dlbmRlcicpfVxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICA8Rm9ybUNvbnRyb2xMYWJlbCB2YWx1ZT1cImFueVwiIGNvbnRyb2w9ezxSYWRpbyBjb2xvcj1cInByaW1hcnlcIiAvPn0gbGFiZWw9XCJBbnlcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPEZvcm1Db250cm9sTGFiZWwgdmFsdWU9XCJtYWxlXCIgY29udHJvbD17PFJhZGlvIGNvbG9yPVwicHJpbWFyeVwiIC8+fSBsYWJlbD1cIk1hbGVcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPEZvcm1Db250cm9sTGFiZWwgdmFsdWU9XCJmZW1hbGVcIiBjb250cm9sPXs8UmFkaW8gY29sb3I9XCJwcmltYXJ5XCIgLz59IGxhYmVsPVwiRmVtYWxlXCIgLz5cblxuICAgICAgICAgICAgICAgICAgICA8L1JhZGlvR3JvdXA+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN1YkZpbHRlclwiPlxuICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJzdWJIZWFkaW5nXCI+QXZhaWxhYmlsaXR5PC9wPlxuICAgICAgICAgICAgICAgICAgICA8UmFkaW9Hcm91cFxuICAgICAgICAgICAgICAgICAgICAgICAgYXJpYS1sYWJlbD1cImF2YWlsYWJpbGl0eVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lPVwiYXZhaWxhYmlsaXR5XCJcbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgPEZvcm1Db250cm9sTGFiZWwgY29udHJvbD17PENoZWNrYm94XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2tlZD17dGhpcy5zdGF0ZS5hdmFpbGFibGVfdG9kYXl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuaGFuZGxlQ2hlY2tib3guYmluZCh0aGlzLCAnYXZhaWxhYmxlX3RvZGF5Jyl9XG4gICAgICAgICAgICAgICAgICAgICAgICAvPn0gbGFiZWw9XCJBdmlhbGFibGUgVG9kYXlcIiAvPmxhYmVsPVwiTXVsdGktZG9jdG9yIGNsaW5pY1wiIC8+XG4gICAgICAgICAgICAgICAgICAgIDwvUmFkaW9Hcm91cD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYXBwbHlGaWx0ZXJcIiBvbkNsaWNrPXt0aGlzLmFwcGx5RmlsdGVyLmJpbmQodGhpcyl9PkFwcGx5PC9idXR0b24+XG5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCB3aXRoUm91dGVyKFNlYXJjaFJlc3VsdHNGaWx0ZXIpXG4iLCJpbXBvcnQgU2VhcmNoUmVzdWx0c0ZpbHRlciBmcm9tICcuL1NlYXJjaFJlc3VsdHNGaWx0ZXIuanMnXG5cbmV4cG9ydCBkZWZhdWx0IFNlYXJjaFJlc3VsdHNGaWx0ZXIiLCIvL0FVVEggQUNUSU9OU1xuZXhwb3J0IGNvbnN0IFNFTkRfT1RQX1JFUVVFU1QgPSAnU0VORF9PVFBfUkVRVUVTVCdcbmV4cG9ydCBjb25zdCBTRU5EX09UUF9TVUNDRVNTID0gJ1NFTkRfT1RQX1NVQ0NFU1MnXG5leHBvcnQgY29uc3QgU0VORF9PVFBfRkFJTCA9ICdTRU5EX09UUF9GQUlMJ1xuZXhwb3J0IGNvbnN0IFNVQk1JVF9PVFBfUkVRVUVTVCA9ICdTVUJNSVRfT1RQX1JFUVVFU1QnXG5leHBvcnQgY29uc3QgU1VCTUlUX09UUF9TVUNDRVNTID0gJ1NVQk1JVF9PVFBfU1VDQ0VTUydcbmV4cG9ydCBjb25zdCBTVUJNSVRfT1RQX0ZBSUwgPSAnU1VCTUlUX09UUF9GQUlMJ1xuXG4vLyBPUEQgRkxPV1xuZXhwb3J0IGNvbnN0IEFQUEVORF9ET0NUT1JTID0gJ0FQUEVORF9ET0NUT1JTJztcbmV4cG9ydCBjb25zdCBET0NUT1JfU0VBUkNIID0gJ0RPQ1RPUl9TRUFSQ0gnO1xuZXhwb3J0IGNvbnN0IERPQ1RPUl9TRUFSQ0hfU1RBUlQgPSAnRE9DVE9SX1NFQVJDSF9TVEFSVCc7XG5leHBvcnQgY29uc3QgU0VMRUNUX0xPQ0FUSU9OX09QRCA9ICdTRUxFQ1RfTE9DQVRJT05fT1BEJztcbmV4cG9ydCBjb25zdCBNRVJHRV9TRUFSQ0hfU1RBVEVfT1BEID0gJ01FUkdFX1NFQVJDSF9TVEFURV9PUEQnO1xuZXhwb3J0IGNvbnN0IFRPR0dMRV9PUERfQ1JJVEVSSUEgPSAnVE9HR0xFX09QRF9DUklURVJJQSc7XG5leHBvcnQgY29uc3QgU0VUX09QRF9GSUxURVJTID0gJ1NFVF9PUERfRklMVEVSUydcbmV4cG9ydCBjb25zdCBMT0FEX1NFQVJDSF9DUklURVJJQV9PUEQgPSAnTE9BRF9TRUFSQ0hfQ1JJVEVSSUFfT1BEJ1xuXG5cbi8vIERJQUcgRkxPV1xuZXhwb3J0IGNvbnN0IFRPR0dMRV9ESUFHTk9TSVNfQ1JJVEVSSUEgPSAnVE9HR0xFX0RJQUdOT1NJU19DUklURVJJQSc7XG5leHBvcnQgY29uc3QgTUVSR0VfU0VBUkNIX1NUQVRFX0xBQiA9ICdNRVJHRV9TRUFSQ0hfU1RBVEVfTEFCJztcbmV4cG9ydCBjb25zdCBMT0FEX1NFQVJDSF9DUklURVJJQV9MQUIgPSAnTE9BRF9TRUFSQ0hfQ1JJVEVSSUFfTEFCJ1xuZXhwb3J0IGNvbnN0IEFQUEVORF9MQUJTID0gJ0FQUEVORF9MQUJTJztcbmV4cG9ydCBjb25zdCBMQUJfU0VBUkNIID0gJ0xBQl9TRUFSQ0gnO1xuZXhwb3J0IGNvbnN0IFNFTEVDVF9MT0NBVElPTl9ESUFHTk9TSVMgPSAnU0VMRUNUX0xPQ0FUSU9OX0RJQUdOT1NJUyc7XG5leHBvcnQgY29uc3QgQVBQRU5EX0ZJTFRFUlNfRElBR05PU0lTID0gJ0FQUEVORF9GSUxURVJTX0RJQUdOT1NJUyc7XG5leHBvcnQgY29uc3QgTEFCX1NFQVJDSF9TVEFSVCA9ICdMQUJfU0VBUkNIX1NUQVJUJztcblxuLy8gQVVUSCBGTE9XXG5leHBvcnQgY29uc3QgQVBQRU5EX1VTRVJfUFJPRklMRVMgPSAnQVBQRU5EX1VTRVJfUFJPRklMRVMnO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cbmltcG9ydCB7IH0gZnJvbSAnLi4vLi4vYWN0aW9ucy9pbmRleC5qcydcblxuaW1wb3J0IENoYXRWaWV3IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9jaGF0L2luZGV4LmpzJ1xuXG5cbmNsYXNzIENoYXQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPENoYXRWaWV3IHsuLi50aGlzLnByb3BzfSAvPlxuICAgICAgICApO1xuICAgIH1cbn1cblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHN0YXRlKSA9PiB7XG4gICAgY29uc3QgVVNFUiA9IHN0YXRlLlVTRVJcblxuICAgIHJldHVybiB7XG4gICAgICAgIFVTRVJcbiAgICB9XG59XG5cbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IChkaXNwYXRjaCkgPT4ge1xuICAgIHJldHVybiB7XG5cbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG1hcERpc3BhdGNoVG9Qcm9wcykoQ2hhdCk7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcblxuaW1wb3J0IHsgc3VibWl0T1RQIH0gZnJvbSAnLi4vLi4vYWN0aW9ucy9pbmRleC5qcydcblxuaW1wb3J0IE90cFZlcmlmeVZpZXcgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9jb21tb25zL290cFZlcmlmeSdcblxuXG5jbGFzcyBPdHBWZXJpZnkgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgIH1cblxuICAgIHN0YXRpYyBjb250ZXh0VHlwZXMgPSB7XG4gICAgICAgIHJvdXRlcjogKCkgPT4gbnVsbFxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPE90cFZlcmlmeVZpZXcgey4uLnRoaXMucHJvcHN9IC8+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoc3RhdGUpID0+IHtcbiAgICBsZXQge1xuICAgICAgICB0b2tlbixcbiAgICAgICAgZXJyb3JfbWVzc2FnZSxcbiAgICAgICAgc3VjY2Vzc19tZXNzYWdlLFxuICAgICAgICBwaG9uZU51bWJlcixcbiAgICAgICAgc3VibWl0X290cCxcbiAgICAgICAgc3VibWl0X290cF9zdWNjZXNzLFxuICAgICAgICBzdWJtaXRfb3RwX2ZhaWxcbiAgICB9ID0gc3RhdGUuQVVUSFxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgdG9rZW4sXG4gICAgICAgIGVycm9yX21lc3NhZ2UsXG4gICAgICAgIHN1Y2Nlc3NfbWVzc2FnZSxcbiAgICAgICAgcGhvbmVOdW1iZXIsXG4gICAgICAgIHN1Ym1pdF9vdHAsXG4gICAgICAgIHN1Ym1pdF9vdHBfc3VjY2VzcyxcbiAgICAgICAgc3VibWl0X290cF9mYWlsXG4gICAgfVxufVxuXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSAoZGlzcGF0Y2gpID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgICBzdWJtaXRPVFA6IChudW1iZXIsIG90cCwgY2IpID0+IGRpc3BhdGNoKHN1Ym1pdE9UUChudW1iZXIsIG90cCwgY2IpKSxcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG1hcERpc3BhdGNoVG9Qcm9wcykoT3RwVmVyaWZ5KTtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG5pbXBvcnQgeyBnZXRVc2VyUHJvZmlsZVdpdGhBcHBvaW50bWVudHMgfSBmcm9tICcuLi8uLi9hY3Rpb25zL2luZGV4LmpzJ1xuXG5pbXBvcnQgVXNlckFwcG9pbnRtZW50c1ZpZXcgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9jb21tb25zL3VzZXJBcHBvaW50bWVudHMvaW5kZXguanMnXG5cblxuY2xhc3MgVXNlckFwcG9pbnRtZW50cyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8VXNlckFwcG9pbnRtZW50c1ZpZXcgey4uLnRoaXMucHJvcHN9IC8+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoc3RhdGUpID0+IHtcbiAgICBjb25zdCBVU0VSID0gc3RhdGUuVVNFUlxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgVVNFUlxuICAgIH1cbn1cblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gKGRpc3BhdGNoKSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgZ2V0VXNlclByb2ZpbGVXaXRoQXBwb2ludG1lbnRzIDogKCkgPT4gZGlzcGF0Y2goZ2V0VXNlclByb2ZpbGVXaXRoQXBwb2ludG1lbnRzKCkpXG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpKFVzZXJBcHBvaW50bWVudHMpO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cbmltcG9ydCB7IHNlbmRPVFAgfSBmcm9tICcuLi8uLi9hY3Rpb25zL2luZGV4LmpzJ1xuXG5pbXBvcnQgVXNlckxvZ2luVmlldyBmcm9tICcuLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvVXNlckxvZ2luJ1xuXG5cbmNsYXNzIFVzZXJMb2dpbiBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgfVxuXG4gICAgc3RhdGljIGNvbnRleHRUeXBlcyA9IHtcbiAgICAgICAgcm91dGVyOiAoKSA9PiBudWxsXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8VXNlckxvZ2luVmlldyB7Li4udGhpcy5wcm9wc30gLz5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9IChzdGF0ZSkgPT4ge1xuICAgIGxldCB7XG4gICAgICAgIHRva2VuLFxuICAgICAgICBlcnJvcl9tZXNzYWdlLFxuICAgICAgICBzdWNjZXNzX21lc3NhZ2UsXG4gICAgICAgIG90cF9yZXF1ZXN0X3NlbnQsXG4gICAgICAgIG90cF9yZXF1ZXN0X3N1Y2Nlc3MsXG4gICAgICAgIG90cF9yZXF1ZXN0X2ZhaWwsXG4gICAgICAgIHBob25lTnVtYmVyXG4gICAgfSA9IHN0YXRlLkFVVEhcblxuICAgIHJldHVybiB7XG4gICAgICAgIHRva2VuLFxuICAgICAgICBlcnJvcl9tZXNzYWdlLFxuICAgICAgICBzdWNjZXNzX21lc3NhZ2UsXG4gICAgICAgIG90cF9yZXF1ZXN0X3NlbnQsXG4gICAgICAgIG90cF9yZXF1ZXN0X3N1Y2Nlc3MsXG4gICAgICAgIG90cF9yZXF1ZXN0X2ZhaWwsXG4gICAgICAgIHBob25lTnVtYmVyXG4gICAgfVxufVxuXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSAoZGlzcGF0Y2gpID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgICBzZW5kT1RQOiAobnVtYmVyLCBjYikgPT4gZGlzcGF0Y2goc2VuZE9UUChudW1iZXIsIGNiKSlcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG1hcERpc3BhdGNoVG9Qcm9wcykoVXNlckxvZ2luKTtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG5pbXBvcnQgeyBnZXRVc2VyUHJvZmlsZSB9IGZyb20gJy4uLy4uL2FjdGlvbnMvaW5kZXguanMnXG5cbmltcG9ydCBVc2VyUHJvZmlsZVZpZXcgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9jb21tb25zL3VzZXJQcm9maWxlL2luZGV4LmpzJ1xuXG5cbmNsYXNzIFVzZXJQcm9maWxlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxVc2VyUHJvZmlsZVZpZXcgey4uLnRoaXMucHJvcHN9IC8+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoc3RhdGUpID0+IHtcbiAgICBjb25zdCBVU0VSID0gc3RhdGUuVVNFUlxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgVVNFUlxuICAgIH1cbn1cblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gKGRpc3BhdGNoKSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgZ2V0VXNlclByb2ZpbGUgOiAoKSA9PiBkaXNwYXRjaChnZXRVc2VyUHJvZmlsZSgpKVxuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbWFwRGlzcGF0Y2hUb1Byb3BzKShVc2VyUHJvZmlsZSk7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcblxuaW1wb3J0IHsgZ2V0VXNlclByb2ZpbGVXaXRoVGVzdHMgfSBmcm9tICcuLi8uLi9hY3Rpb25zL2luZGV4LmpzJ1xuXG5pbXBvcnQgVXNlclJlcG9ydHNWaWV3IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy91c2VyUmVwb3J0cy9pbmRleC5qcydcblxuXG5jbGFzcyBVc2VyUmVwb3J0cyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8VXNlclJlcG9ydHNWaWV3IHsuLi50aGlzLnByb3BzfSAvPlxuICAgICAgICApO1xuICAgIH1cbn1cblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHN0YXRlKSA9PiB7XG4gICAgY29uc3QgVVNFUiA9IHN0YXRlLlVTRVJcblxuICAgIHJldHVybiB7XG4gICAgICAgIFVTRVJcbiAgICB9XG59XG5cbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IChkaXNwYXRjaCkgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICAgIGdldFVzZXJQcm9maWxlV2l0aFRlc3RzIDogKCkgPT4gZGlzcGF0Y2goZ2V0VXNlclByb2ZpbGVXaXRoVGVzdHMoKSlcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG1hcERpc3BhdGNoVG9Qcm9wcykoVXNlclJlcG9ydHMpO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cbmltcG9ydCB7IH0gZnJvbSAnLi4vLi4vYWN0aW9ucy9pbmRleC5qcydcblxuaW1wb3J0IFVzZXJTaWdudXBWaWV3IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy91c2VyU2lnbnVwJ1xuXG5cbmNsYXNzIFVzZXJTaWdudXAgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgIH1cblxuICAgIHN0YXRpYyBjb250ZXh0VHlwZXMgPSB7XG4gICAgICAgIHJvdXRlcjogKCkgPT4gbnVsbFxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPFVzZXJTaWdudXBWaWV3IHsuLi50aGlzLnByb3BzfSAvPlxuICAgICAgICApO1xuICAgIH1cbn1cblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHN0YXRlKSA9PiB7XG4gICAgY29uc3QgVVNFUiA9IHN0YXRlLlVTRVJcblxuICAgIHJldHVybiB7XG4gICAgICAgIFVTRVJcbiAgICB9XG59XG5cbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IChkaXNwYXRjaCkgPT4ge1xuICAgIHJldHVybiB7XG5cbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG1hcERpc3BhdGNoVG9Qcm9wcykoVXNlclNpZ251cCk7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcblxuaW1wb3J0IHsgZ2V0TGFiQnlJZCB9IGZyb20gJy4uLy4uL2FjdGlvbnMvaW5kZXguanMnXG5cbmltcG9ydCBCb29raW5nU3VtbWFyeVZpZXcgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9kaWFnbm9zaXMvYm9va2luZ1N1bW1hcnkvaW5kZXguanMnXG5cbmNsYXNzIEJvb2tpbmdTdW1tYXJ5IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICB9XG5cbiAgICBzdGF0aWMgY29udGV4dFR5cGVzID0ge1xuICAgICAgICByb3V0ZXI6ICgpID0+IG51bGxcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxCb29raW5nU3VtbWFyeVZpZXcgey4uLnRoaXMucHJvcHN9IC8+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoc3RhdGUpID0+IHtcblxuICAgIGNvbnN0IHtcbiAgICAgICAgc2VsZWN0ZWRDcml0ZXJpYXMsXG4gICAgfSA9IHN0YXRlLlNFQVJDSF9DUklURVJJQV9MQUJTXG5cbiAgICBsZXQgTEFCUyA9IHN0YXRlLkxBQlNcblxuICAgIHJldHVybiB7XG4gICAgICAgIHNlbGVjdGVkQ3JpdGVyaWFzLFxuICAgICAgICBMQUJTXG4gICAgfVxufVxuXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSAoZGlzcGF0Y2gpID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgICBnZXRMYWJCeUlkOiAobGFiSWQpID0+IGRpc3BhdGNoKGdldExhYkJ5SWQobGFiSWQpKVxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG1hcERpc3BhdGNoVG9Qcm9wcykoQm9va2luZ1N1bW1hcnkpO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cbmltcG9ydCB7IGdldExhYkJ5SWQgfSBmcm9tICcuLi8uLi9hY3Rpb25zL2luZGV4LmpzJ1xuXG5pbXBvcnQgTGFiVmlldyBmcm9tICcuLi8uLi9jb21wb25lbnRzL2RpYWdub3Npcy9sYWIvaW5kZXguanMnXG5cbmNsYXNzIExhYiBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgfVxuXG4gICAgc3RhdGljIGxvYWREYXRhKHN0b3JlLCBtYXRjaCl7XG4gICAgICAgIHJldHVybiBzdG9yZS5kaXNwYXRjaChnZXRMYWJCeUlkKG1hdGNoLnBhcmFtcy5pZCkpXG4gICAgfVxuXG4gICAgc3RhdGljIGNvbnRleHRUeXBlcyA9IHtcbiAgICAgICAgcm91dGVyOiAoKSA9PiBudWxsXG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIHRoaXMucHJvcHMuZ2V0TGFiQnlJZCh0aGlzLnByb3BzLm1hdGNoLnBhcmFtcy5pZClcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxMYWJWaWV3IHsuLi50aGlzLnByb3BzfSAvPlxuICAgICAgICApO1xuICAgIH1cbn1cblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHN0YXRlKSA9PiB7XG5cbiAgICBjb25zdCB7XG4gICAgICAgIHNlbGVjdGVkTG9jYXRpb24sXG4gICAgICAgIHNlbGVjdGVkQ3JpdGVyaWFzLFxuICAgICAgICBmaWx0ZXJDcml0ZXJpYSxcbiAgICAgICAgTE9BREVEX1NFQVJDSF9DUklURVJJQV9MQUJcbiAgICB9ID0gc3RhdGUuU0VBUkNIX0NSSVRFUklBX0xBQlNcblxuICAgIGxldCBMQUJTID0gc3RhdGUuTEFCU1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgc2VsZWN0ZWRDcml0ZXJpYXMsXG4gICAgICAgIExBQlNcbiAgICB9XG59XG5cbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IChkaXNwYXRjaCkgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICAgIGdldExhYkJ5SWQ6IChsYWJJZCkgPT4gZGlzcGF0Y2goZ2V0TGFiQnlJZChsYWJJZCkpXG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpKExhYik7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcblxuaW1wb3J0IHsgZ2V0TGFiQnlJZCB9IGZyb20gJy4uLy4uL2FjdGlvbnMvaW5kZXguanMnXG5cbmltcG9ydCBQYXRpZW50RGV0YWlsc1ZpZXcgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9kaWFnbm9zaXMvcGF0aWVudERldGFpbHMvaW5kZXguanMnXG5cbmNsYXNzIFBhdGllbnREZXRhaWxzIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxQYXRpZW50RGV0YWlsc1ZpZXcgey4uLnRoaXMucHJvcHN9IC8+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoc3RhdGUpID0+IHtcblxuICAgIGxldCBMQUJTID0gc3RhdGUuTEFCU1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgTEFCU1xuICAgIH1cbn1cblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gKGRpc3BhdGNoKSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgZ2V0TGFiQnlJZCA6IChsYWJJZCwgdGVzdElkcykgPT4gZGlzcGF0Y2goZ2V0TGFiQnlJZChsYWJJZCwgdGVzdElkcykpXG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpKFBhdGllbnREZXRhaWxzKTtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG5pbXBvcnQgeyBsb2FkTGFiQ29tbW9uQ3JpdGVyaWFzLCB0b2dnbGVEaWFnbm9zaXNDcml0ZXJpYSwgZ2V0RGlhZ25vc2lzQ3JpdGVyaWFSZXN1bHRzIH0gZnJvbSAnLi4vLi4vYWN0aW9ucy9pbmRleC5qcydcbmltcG9ydCBTZWFyY2hDcml0ZXJpYVZpZXcgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9kaWFnbm9zaXMvc2VhcmNoQ3JpdGVyaWEvaW5kZXguanMnXG5cbmNsYXNzIFNlYXJjaENyaXRlcmlhIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICB9XG5cbiAgICBzdGF0aWMgbG9hZERhdGEoc3RvcmUpe1xuICAgICAgICByZXR1cm4gc3RvcmUuZGlzcGF0Y2gobG9hZExhYkNvbW1vbkNyaXRlcmlhcygpKVxuICAgIH1cblxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgICB0aGlzLnByb3BzLmxvYWRMYWJDb21tb25Dcml0ZXJpYXMoKVxuICAgIH1cblxuICAgIHN0YXRpYyBjb250ZXh0VHlwZXMgPSB7XG4gICAgICAgIHJvdXRlcjogKCkgPT4gbnVsbFxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxTZWFyY2hDcml0ZXJpYVZpZXcgey4uLnRoaXMucHJvcHN9IC8+XG4gICAgICAgIClcbiAgICB9XG59XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9IChzdGF0ZSkgPT4ge1xuXG4gICAgY29uc3Qge1xuICAgICAgICBMT0FERURfU0VBUkNIX0NSSVRFUklBX0xBQixcbiAgICAgICAgY29tbW9uX3Rlc3RzLFxuICAgICAgICBjb21tb25fY29uZGl0aW9ucyxcbiAgICAgICAgcHJlZmVycmVkX2xhYnMsXG4gICAgICAgIHNlbGVjdGVkQ3JpdGVyaWFzLFxuICAgICAgICBzZWxlY3RlZExvY2F0aW9uLFxuICAgICAgICBmaWx0ZXJDcml0ZXJpYVxuICAgIH0gPSBzdGF0ZS5TRUFSQ0hfQ1JJVEVSSUFfTEFCU1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgTE9BREVEX1NFQVJDSF9DUklURVJJQV9MQUIsXG4gICAgICAgIGNvbW1vbl90ZXN0cyxcbiAgICAgICAgY29tbW9uX2NvbmRpdGlvbnMsXG4gICAgICAgIHByZWZlcnJlZF9sYWJzLFxuICAgICAgICBzZWxlY3RlZENyaXRlcmlhcyxcbiAgICAgICAgc2VsZWN0ZWRMb2NhdGlvbixcbiAgICAgICAgZmlsdGVyQ3JpdGVyaWFcbiAgICB9XG59XG5cbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IChkaXNwYXRjaCkgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICAgIGxvYWRMYWJDb21tb25Dcml0ZXJpYXM6ICgpID0+IGRpc3BhdGNoKGxvYWRMYWJDb21tb25Dcml0ZXJpYXMoKSksXG4gICAgICAgIHRvZ2dsZURpYWdub3Npc0NyaXRlcmlhOiAodHlwZSwgY3JpdGVyaWEpID0+IGRpc3BhdGNoKHRvZ2dsZURpYWdub3Npc0NyaXRlcmlhKHR5cGUsIGNyaXRlcmlhKSksXG4gICAgICAgIGdldERpYWdub3Npc0NyaXRlcmlhUmVzdWx0czogKHNlYXJjaFN0cmluZywgY2FsbGJhY2spID0+IGRpc3BhdGNoKGdldERpYWdub3Npc0NyaXRlcmlhUmVzdWx0cyhzZWFyY2hTdHJpbmcsIGNhbGxiYWNrKSlcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG1hcERpc3BhdGNoVG9Qcm9wcykoU2VhcmNoQ3JpdGVyaWEpO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cbmltcG9ydCB7IGdldExhYnMsIHRvZ2dsZURpYWdub3Npc0NyaXRlcmlhLCBnZXREaWFnbm9zaXNDcml0ZXJpYVJlc3VsdHMgfSBmcm9tICcuLi8uLi9hY3Rpb25zL2luZGV4LmpzJ1xuXG5pbXBvcnQgU2VhcmNoUmVzdWx0c1ZpZXcgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9kaWFnbm9zaXMvc2VhcmNoUmVzdWx0cy9pbmRleC5qcydcblxuY2xhc3MgU2VhcmNoUmVzdWx0cyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG5cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN0YXRpYyBjb250ZXh0VHlwZXMgPSB7XG4gICAgICAgIHJvdXRlcjogKCkgPT4gbnVsbFxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPFNlYXJjaFJlc3VsdHNWaWV3IHsuLi50aGlzLnByb3BzfSAvPlxuICAgICAgICApO1xuICAgIH1cbn1cblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHN0YXRlKSA9PiB7XG4gICAgY29uc3Qge1xuICAgICAgICBzZWxlY3RlZExvY2F0aW9uLFxuICAgICAgICBzZWxlY3RlZENyaXRlcmlhcyxcbiAgICAgICAgZmlsdGVyQ3JpdGVyaWEsXG4gICAgICAgIExPQURFRF9TRUFSQ0hfQ1JJVEVSSUFfTEFCXG4gICAgfSA9IHN0YXRlLlNFQVJDSF9DUklURVJJQV9MQUJTXG5cbiAgICBjb25zdCBMQUJTID0gc3RhdGUuTEFCU1xuICAgIGNvbnN0IHsgbGFiTGlzdCwgTE9BREVEX0xBQlNfU0VBUkNIIH0gPSBzdGF0ZS5MQUJfU0VBUkNIXG5cbiAgICByZXR1cm4ge1xuICAgICAgICBzZWxlY3RlZExvY2F0aW9uLFxuICAgICAgICBzZWxlY3RlZENyaXRlcmlhcyxcbiAgICAgICAgZmlsdGVyQ3JpdGVyaWEsXG4gICAgICAgIExPQURFRF9TRUFSQ0hfQ1JJVEVSSUFfTEFCLFxuICAgICAgICBMQUJTLFxuICAgICAgICBsYWJMaXN0LCBMT0FERURfTEFCU19TRUFSQ0hcbiAgICB9XG5cbn1cblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gKGRpc3BhdGNoKSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgZ2V0TGFiczogKHNlYXJjaFN0YXRlLCBmaWx0ZXJDcml0ZXJpYSwgbWVyZ2VTdGF0ZSkgPT4gZGlzcGF0Y2goZ2V0TGFicyhzZWFyY2hTdGF0ZSwgZmlsdGVyQ3JpdGVyaWEsIG1lcmdlU3RhdGUpKSxcbiAgICAgICAgdG9nZ2xlRGlhZ25vc2lzQ3JpdGVyaWE6ICh0eXBlLCBjcml0ZXJpYSkgPT4gZGlzcGF0Y2godG9nZ2xlRGlhZ25vc2lzQ3JpdGVyaWEodHlwZSwgY3JpdGVyaWEpKSxcbiAgICAgICAgZ2V0RGlhZ25vc2lzQ3JpdGVyaWFSZXN1bHRzOiAoc2VhcmNoU3RyaW5nLCBjYWxsYmFjaykgPT4gZGlzcGF0Y2goZ2V0RGlhZ25vc2lzQ3JpdGVyaWFSZXN1bHRzKHNlYXJjaFN0cmluZywgY2FsbGJhY2spKVxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG1hcERpc3BhdGNoVG9Qcm9wcykoU2VhcmNoUmVzdWx0cyk7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcblxuaW1wb3J0IHsgZ2V0TGFiQnlJZCwgdG9nZ2xlRGlhZ25vc2lzQ3JpdGVyaWEgfSBmcm9tICcuLi8uLi9hY3Rpb25zL2luZGV4LmpzJ1xuXG5pbXBvcnQgVGVzdFNlbGVjdG9yVmlldyBmcm9tICcuLi8uLi9jb21wb25lbnRzL2RpYWdub3Npcy90ZXN0U2VsZWN0b3InXG5cbmNsYXNzIFRlc3RTZWxlY3RvciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgfVxuXG4gICAgc3RhdGljIGNvbnRleHRUeXBlcyA9IHtcbiAgICAgICAgcm91dGVyOiAoKSA9PiBudWxsXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8VGVzdFNlbGVjdG9yVmlldyB7Li4udGhpcy5wcm9wc30gLz5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9IChzdGF0ZSkgPT4ge1xuXG4gICAgY29uc3Qge1xuICAgICAgICBzZWxlY3RlZExvY2F0aW9uLFxuICAgICAgICBzZWxlY3RlZENyaXRlcmlhcyxcbiAgICAgICAgZmlsdGVyQ3JpdGVyaWEsXG4gICAgICAgIExPQURFRF9TRUFSQ0hfQ1JJVEVSSUFfTEFCXG4gICAgfSA9IHN0YXRlLlNFQVJDSF9DUklURVJJQV9MQUJTXG5cbiAgICBsZXQgTEFCUyA9IHN0YXRlLkxBQlNcblxuICAgIHJldHVybiB7XG4gICAgICAgIHNlbGVjdGVkQ3JpdGVyaWFzLFxuICAgICAgICBMQUJTXG4gICAgfVxufVxuXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSAoZGlzcGF0Y2gpID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgICB0b2dnbGVEaWFnbm9zaXNDcml0ZXJpYTogKHR5cGUsIGNyaXRlcmlhKSA9PiBkaXNwYXRjaCh0b2dnbGVEaWFnbm9zaXNDcml0ZXJpYSh0eXBlLCBjcml0ZXJpYSkpLFxuICAgICAgICBnZXRMYWJCeUlkOiAobGFiSWQpID0+IGRpc3BhdGNoKGdldExhYkJ5SWQobGFiSWQpKVxuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbWFwRGlzcGF0Y2hUb1Byb3BzKShUZXN0U2VsZWN0b3IpO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cbmltcG9ydCB7IGdldERvY3RvckJ5SWQsIGdldFRpbWVTbG90cyB9IGZyb20gJy4uLy4uL2FjdGlvbnMvaW5kZXguanMnXG5cbmltcG9ydCBBcHBvaW50bWVudFNsb3RWaWV3IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvb3BkL2FwcG9pbnRtZW50U2xvdC9pbmRleC5qcydcblxuY2xhc3MgQXBwb2ludG1lbnRTbG90IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICB9XG5cbiAgICBzdGF0aWMgbG9hZERhdGEoc3RvcmUsIG1hdGNoKSB7XG4gICAgICAgIHJldHVybiBzdG9yZS5kaXNwYXRjaChnZXREb2N0b3JCeUlkKG1hdGNoLnBhcmFtcy5pZCkpXG4gICAgfVxuXG4gICAgc3RhdGljIGNvbnRleHRUeXBlcyA9IHtcbiAgICAgICAgcm91dGVyOiAoKSA9PiBudWxsXG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIHRoaXMucHJvcHMuZ2V0RG9jdG9yQnlJZCh0aGlzLnByb3BzLm1hdGNoLnBhcmFtcy5pZClcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxBcHBvaW50bWVudFNsb3RWaWV3IHsuLi50aGlzLnByb3BzfSAvPlxuICAgICAgICApO1xuICAgIH1cbn1cblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHN0YXRlKSA9PiB7XG5cbiAgICBsZXQgRE9DVE9SUyA9IHN0YXRlLkRPQ1RPUlNcblxuICAgIHJldHVybiB7XG4gICAgICAgIERPQ1RPUlNcbiAgICB9XG59XG5cbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IChkaXNwYXRjaCkgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICAgIGdldERvY3RvckJ5SWQ6IChkb2N0b3JJZCkgPT4gZGlzcGF0Y2goZ2V0RG9jdG9yQnlJZChkb2N0b3JJZCkpLFxuICAgICAgICBnZXRUaW1lU2xvdHM6IChkb2N0b3JJZCwgY2xpbmljSWQsIGNhbGxiYWNrKSA9PiBkaXNwYXRjaChnZXRUaW1lU2xvdHMoZG9jdG9ySWQsIGNsaW5pY0lkLCBjYWxsYmFjaykpXG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpKEFwcG9pbnRtZW50U2xvdCk7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcblxuaW1wb3J0IHsgfSBmcm9tICcuLi8uLi9hY3Rpb25zL2luZGV4LmpzJ1xuXG5pbXBvcnQgQm9va2luZ1ZpZXcgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9vcGQvYm9va2luZy9Cb29raW5nVmlldy5qcydcblxuY2xhc3MgQm9va2luZyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8Qm9va2luZ1ZpZXcgey4uLnRoaXMucHJvcHN9IC8+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoc3RhdGUpID0+IHtcblxuICAgIHJldHVybiB7XG5cbiAgICB9XG59XG5cbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IChkaXNwYXRjaCkgPT4ge1xuICAgIHJldHVybiB7XG5cbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG1hcERpc3BhdGNoVG9Qcm9wcykoQm9va2luZyk7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcblxuaW1wb3J0IHsgZ2V0RG9jdG9yQnlJZCB9IGZyb20gJy4uLy4uL2FjdGlvbnMvaW5kZXguanMnXG5cbmltcG9ydCBDbGluaWNMaXN0VmlldyBmcm9tICcuLi8uLi9jb21wb25lbnRzL29wZC9jbGluaWNMaXN0L2luZGV4LmpzJ1xuXG5jbGFzcyBDbGluaWNMaXN0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxDbGluaWNMaXN0VmlldyB7Li4udGhpcy5wcm9wc30gLz5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9IChzdGF0ZSkgPT4ge1xuXG4gICAgbGV0IERPQ1RPUlMgPSBzdGF0ZS5ET0NUT1JTXG5cbiAgICByZXR1cm4ge1xuICAgICAgICBET0NUT1JTXG4gICAgfVxufVxuXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSAoZGlzcGF0Y2gpID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgICBnZXREb2N0b3JCeUlkIDogKGRvY3RvcklkKSA9PiBkaXNwYXRjaChnZXREb2N0b3JCeUlkKGRvY3RvcklkKSlcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG1hcERpc3BhdGNoVG9Qcm9wcykoQ2xpbmljTGlzdCk7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcblxuaW1wb3J0IHsgZ2V0Q3JpdGVyaWFSZXN1bHRzLCB0b2dnbGVDcml0ZXJpYSB9IGZyb20gJy4uLy4uL2FjdGlvbnMvaW5kZXguanMnXG5pbXBvcnQgQ3JpdGVyaWFTZWFyY2hWaWV3IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvb3BkL2NyaXRlcmlhU2VhcmNoL2luZGV4LmpzJ1xuXG5jbGFzcyBDcml0ZXJpYVNlYXJjaCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8Q3JpdGVyaWFTZWFyY2hWaWV3XG4gICAgICAgICAgICAgICAgeyAuLi50aGlzLnByb3BzIH1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoc3RhdGUpID0+IHtcblxuICAgIHJldHVybiB7XG5cbiAgICB9XG59XG5cbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IChkaXNwYXRjaCkgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICAgIGdldENyaXRlcmlhUmVzdWx0cyA6IChzZWFyY2hTdHJpbmcsY2IpID0+IGRpc3BhdGNoKGdldENyaXRlcmlhUmVzdWx0cyhzZWFyY2hTdHJpbmcsY2IpKSxcbiAgICAgICAgdG9nZ2xlQ3JpdGVyaWEgOiAoY3JpdGVyaWEpID0+IGRpc3BhdGNoKHRvZ2dsZUNyaXRlcmlhKGNyaXRlcmlhKSlcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG1hcERpc3BhdGNoVG9Qcm9wcykoQ3JpdGVyaWFTZWFyY2gpO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cbmltcG9ydCB7IGdldERvY3RvckJ5SWQgfSBmcm9tICcuLi8uLi9hY3Rpb25zL2luZGV4LmpzJ1xuXG5pbXBvcnQgRG9jdG9yUHJvZmlsZVZpZXcgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9vcGQvZG9jdG9yUHJvZmlsZS9pbmRleC5qcydcblxuY2xhc3MgRG9jdG9yUHJvZmlsZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgfVxuXG4gICAgc3RhdGljIGxvYWREYXRhKHN0b3JlLCBtYXRjaCkge1xuICAgICAgICByZXR1cm4gc3RvcmUuZGlzcGF0Y2goZ2V0RG9jdG9yQnlJZChtYXRjaC5wYXJhbXMuaWQpKVxuICAgIH1cblxuICAgIHN0YXRpYyBjb250ZXh0VHlwZXMgPSB7XG4gICAgICAgIHJvdXRlcjogKCkgPT4gbnVsbFxuICAgIH1cblxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgICB0aGlzLnByb3BzLmdldERvY3RvckJ5SWQodGhpcy5wcm9wcy5tYXRjaC5wYXJhbXMuaWQpXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8RG9jdG9yUHJvZmlsZVZpZXcgey4uLnRoaXMucHJvcHN9IC8+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoc3RhdGUpID0+IHtcblxuICAgIGxldCBET0NUT1JTID0gc3RhdGUuRE9DVE9SU1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgRE9DVE9SU1xuICAgIH1cbn1cblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gKGRpc3BhdGNoKSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgZ2V0RG9jdG9yQnlJZDogKGRvY3RvcklkKSA9PiBkaXNwYXRjaChnZXREb2N0b3JCeUlkKGRvY3RvcklkKSlcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG1hcERpc3BhdGNoVG9Qcm9wcykoRG9jdG9yUHJvZmlsZSk7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcblxuaW1wb3J0IHsgc2VsZWN0TG9jYXRpb24gfSBmcm9tICcuLi8uLi9hY3Rpb25zL2luZGV4LmpzJ1xuaW1wb3J0IExvY2F0aW9uU2VhcmNoVmlldyBmcm9tICcuLi8uLi9jb21wb25lbnRzL29wZC9sb2NhdGlvblNlYXJjaC9pbmRleC5qcydcblxuY2xhc3MgTG9jYXRpb25TZWFyY2ggZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgIH1cblxuICAgIHN0YXRpYyBjb250ZXh0VHlwZXMgPSB7XG4gICAgICAgIHJvdXRlcjogKCkgPT4gbnVsbFxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPExvY2F0aW9uU2VhcmNoVmlldyB7Li4udGhpcy5wcm9wc30gLz5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9IChzdGF0ZSkgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgICAgc2VsZWN0ZWRMb2NhdGlvblxuICAgIH0gPSBzdGF0ZS5TRUFSQ0hfQ1JJVEVSSUFfT1BEXG5cbiAgICByZXR1cm4ge1xuICAgICAgICBzZWxlY3RlZExvY2F0aW9uXG4gICAgfVxufVxuXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSAoZGlzcGF0Y2gpID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgICBzZWxlY3RMb2NhdGlvbjogKGxvY2F0aW9uKSA9PiBkaXNwYXRjaChzZWxlY3RMb2NhdGlvbihsb2NhdGlvbikpXG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpKExvY2F0aW9uU2VhcmNoKTtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG5pbXBvcnQgeyBnZXREb2N0b3JCeUlkIH0gZnJvbSAnLi4vLi4vYWN0aW9ucy9pbmRleC5qcydcblxuaW1wb3J0IFBhdGllbnREZXRhaWxzVmlldyBmcm9tICcuLi8uLi9jb21wb25lbnRzL29wZC9wYXRpZW50RGV0YWlscy9pbmRleC5qcydcblxuY2xhc3MgUGF0aWVudERldGFpbHMgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPFBhdGllbnREZXRhaWxzVmlldyB7Li4udGhpcy5wcm9wc30gLz5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9IChzdGF0ZSkgPT4ge1xuXG4gICAgbGV0IERPQ1RPUlMgPSBzdGF0ZS5ET0NUT1JTXG5cbiAgICByZXR1cm4ge1xuICAgICAgICBET0NUT1JTXG4gICAgfVxufVxuXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSAoZGlzcGF0Y2gpID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgICBnZXREb2N0b3JCeUlkIDogKGRvY3RvcklkKSA9PiBkaXNwYXRjaChnZXREb2N0b3JCeUlkKGRvY3RvcklkKSlcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG1hcERpc3BhdGNoVG9Qcm9wcykoUGF0aWVudERldGFpbHMpO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cbmltcG9ydCB7IH0gZnJvbSAnLi4vLi4vYWN0aW9ucy9pbmRleC5qcydcblxuaW1wb3J0IFBheW1lbnRWaWV3IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvb3BkL3BheW1lbnQvUGF5bWVudFZpZXcuanMnXG5cbmNsYXNzIFBheW1lbnQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPFBheW1lbnRWaWV3IHsuLi50aGlzLnByb3BzfSAvPlxuICAgICAgICApO1xuICAgIH1cbn1cblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHN0YXRlKSA9PiB7XG5cbiAgICByZXR1cm4ge1xuXG4gICAgfVxufVxuXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSAoZGlzcGF0Y2gpID0+IHtcbiAgICByZXR1cm4ge1xuXG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpKFBheW1lbnQpO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cbmltcG9ydCB7IGdldE9QRENyaXRlcmlhUmVzdWx0cywgdG9nZ2xlT1BEQ3JpdGVyaWEsIGxvYWRPUERDb21tb25Dcml0ZXJpYSB9IGZyb20gJy4uLy4uL2FjdGlvbnMvaW5kZXguanMnXG5pbXBvcnQgU2VhcmNoQ3JpdGVyaWFWaWV3IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvb3BkL3NlYXJjaENyaXRlcmlhL2luZGV4LmpzJ1xuXG5jbGFzcyBTZWFyY2hDcml0ZXJpYSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgfVxuXG4gICAgc3RhdGljIGxvYWREYXRhKHN0b3JlKSB7XG4gICAgICAgIHJldHVybiBzdG9yZS5kaXNwYXRjaChsb2FkT1BEQ29tbW9uQ3JpdGVyaWEoKSlcbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgdGhpcy5wcm9wcy5sb2FkT1BEQ29tbW9uQ3JpdGVyaWEoKVxuICAgIH1cblxuICAgIHN0YXRpYyBjb250ZXh0VHlwZXMgPSB7XG4gICAgICAgIHJvdXRlcjogKCkgPT4gbnVsbFxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPFNlYXJjaENyaXRlcmlhVmlldyB7Li4udGhpcy5wcm9wc30gLz5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9IChzdGF0ZSkgPT4ge1xuXG4gICAgY29uc3Qge1xuICAgICAgICBMT0FERURfU0VBUkNIX0NSSVRFUklBX09QRCxcbiAgICAgICAgc3BlY2lhbGl6YXRpb25zLFxuICAgICAgICBjb25kaXRpb25zLFxuICAgICAgICBzZWxlY3RlZENyaXRlcmlhcyxcbiAgICAgICAgc2VsZWN0ZWRMb2NhdGlvbixcbiAgICAgICAgZmlsdGVyQ3JpdGVyaWFcbiAgICB9ID0gc3RhdGUuU0VBUkNIX0NSSVRFUklBX09QRFxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgTE9BREVEX1NFQVJDSF9DUklURVJJQV9PUEQsXG4gICAgICAgIHNwZWNpYWxpemF0aW9ucyxcbiAgICAgICAgY29uZGl0aW9ucyxcbiAgICAgICAgc2VsZWN0ZWRDcml0ZXJpYXMsXG4gICAgICAgIHNlbGVjdGVkTG9jYXRpb24sXG4gICAgICAgIGZpbHRlckNyaXRlcmlhXG4gICAgfVxufVxuXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSAoZGlzcGF0Y2gpID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgICBsb2FkT1BEQ29tbW9uQ3JpdGVyaWE6ICgpID0+IGRpc3BhdGNoKGxvYWRPUERDb21tb25Dcml0ZXJpYSgpKSxcbiAgICAgICAgdG9nZ2xlT1BEQ3JpdGVyaWE6ICh0eXBlLCBjcml0ZXJpYSkgPT4gZGlzcGF0Y2godG9nZ2xlT1BEQ3JpdGVyaWEodHlwZSwgY3JpdGVyaWEpKSxcbiAgICAgICAgZ2V0T1BEQ3JpdGVyaWFSZXN1bHRzOiAoc2VhcmNoU3RyaW5nLCBjYWxsYmFjaykgPT4gZGlzcGF0Y2goZ2V0T1BEQ3JpdGVyaWFSZXN1bHRzKHNlYXJjaFN0cmluZywgY2FsbGJhY2spKVxuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbWFwRGlzcGF0Y2hUb1Byb3BzKShTZWFyY2hDcml0ZXJpYSk7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcblxuaW1wb3J0IHsgZ2V0RG9jdG9ycywgZ2V0T1BEQ3JpdGVyaWFSZXN1bHRzLCB0b2dnbGVPUERDcml0ZXJpYSB9IGZyb20gJy4uLy4uL2FjdGlvbnMvaW5kZXguanMnXG5cbmltcG9ydCBTZWFyY2hSZXN1bHRzVmlldyBmcm9tICcuLi8uLi9jb21wb25lbnRzL29wZC9zZWFyY2hSZXN1bHRzL2luZGV4LmpzJ1xuXG5jbGFzcyBTZWFyY2hSZXN1bHRzIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcblxuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhdGljIGNvbnRleHRUeXBlcyA9IHtcbiAgICAgICAgcm91dGVyOiAoKSA9PiBudWxsXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8U2VhcmNoUmVzdWx0c1ZpZXcgey4uLnRoaXMucHJvcHN9IC8+XG4gICAgICAgIClcbiAgICB9XG59XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9IChzdGF0ZSkgPT4ge1xuXG4gICAgY29uc3Qge1xuICAgICAgICBMT0FERURfU0VBUkNIX0NSSVRFUklBX09QRCxcbiAgICAgICAgc2VsZWN0ZWRDcml0ZXJpYXMsXG4gICAgICAgIHNlbGVjdGVkTG9jYXRpb24sXG4gICAgICAgIGZpbHRlckNyaXRlcmlhXG4gICAgfSA9IHN0YXRlLlNFQVJDSF9DUklURVJJQV9PUERcblxuICAgIGxldCBET0NUT1JTID0gc3RhdGUuRE9DVE9SU1xuICAgIGxldCB7IGRvY3Rvckxpc3QsIExPQURFRF9ET0NUT1JfU0VBUkNIIH0gPSBzdGF0ZS5ET0NUT1JfU0VBUkNIXG5cbiAgICByZXR1cm4ge1xuICAgICAgICBET0NUT1JTLCBkb2N0b3JMaXN0LCBMT0FERURfRE9DVE9SX1NFQVJDSCxcbiAgICAgICAgTE9BREVEX1NFQVJDSF9DUklURVJJQV9PUEQsXG4gICAgICAgIHNlbGVjdGVkQ3JpdGVyaWFzLFxuICAgICAgICBzZWxlY3RlZExvY2F0aW9uLFxuICAgICAgICBmaWx0ZXJDcml0ZXJpYVxuICAgIH1cbn1cblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gKGRpc3BhdGNoKSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgbG9hZE9QRENvbW1vbkNyaXRlcmlhOiAoKSA9PiBkaXNwYXRjaChsb2FkT1BEQ29tbW9uQ3JpdGVyaWEoKSksXG4gICAgICAgIHRvZ2dsZU9QRENyaXRlcmlhOiAodHlwZSwgY3JpdGVyaWEpID0+IGRpc3BhdGNoKHRvZ2dsZU9QRENyaXRlcmlhKHR5cGUsIGNyaXRlcmlhKSksXG4gICAgICAgIGdldERvY3RvcnM6IChzZWFyY2hTdGF0ZSwgZmlsdGVyQ3JpdGVyaWEsIG1lcmdlU3RhdGUpID0+IGRpc3BhdGNoKGdldERvY3RvcnMoc2VhcmNoU3RhdGUsIGZpbHRlckNyaXRlcmlhLCBtZXJnZVN0YXRlKSlcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpKFNlYXJjaFJlc3VsdHMpO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cbmltcG9ydCB7IHNldE9QREZpbHRlcnMgfSBmcm9tICcuLi8uLi9hY3Rpb25zL2luZGV4LmpzJ1xuXG5pbXBvcnQgU2VhcmNoUmVzdWx0c0ZpbHRlclZpZXcgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9vcGQvc2VhcmNoUmVzdWx0c0ZpbHRlci9pbmRleC5qcydcblxuY2xhc3MgU2VhcmNoUmVzdWx0c0ZpbHRlciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8U2VhcmNoUmVzdWx0c0ZpbHRlclZpZXcgey4uLnRoaXMucHJvcHN9Lz5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9IChzdGF0ZSkgPT4ge1xuXG4gICAgY29uc3Qge1xuICAgICAgICBmaWx0ZXJDcml0ZXJpYVxuICAgIH0gPSBzdGF0ZS5TRUFSQ0hfQ1JJVEVSSUFfT1BEXG5cbiAgICByZXR1cm4ge1xuICAgICAgICBmaWx0ZXJDcml0ZXJpYVxuICAgIH1cbn1cblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gKGRpc3BhdGNoKSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgc2V0T1BERmlsdGVycyA6IChmaWx0ZXJEYXRhKSA9PiBkaXNwYXRjaChzZXRPUERGaWx0ZXJzKGZpbHRlckRhdGEpKVxuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbWFwRGlzcGF0Y2hUb1Byb3BzKShTZWFyY2hSZXN1bHRzRmlsdGVyKTtcbiIsImltcG9ydCBOQVZJR0FURSBmcm9tICcuL25hdmlnYXRlJ1xuXG5leHBvcnQgZGVmYXVsdCBOQVZJR0FURSIsImNvbnN0IE5BVklHQVRFID0ge1xuICAgIG5hdmlnYXRlVG8gOiAod2hlcmUpID0+IHtcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSB3aGVyZVxuICAgIH0sXG5cbiAgICByZWZyZXNoQXBwb2ludG1lbnRTdGF0ZSA6IChwcm9wcykgPT4ge1xuICAgICAgICBsZXQgbm9BcHBvaW50bWVudEZvdW5kID0gcHJvcHMudXBjb21pbmcubGVuZ3RoID09IDAgJiYgcHJvcHMucHJldmlvdXMubGVuZ3RoID09IDBcbiAgICAgICAgXG4gICAgICAgIGlmKHByb3BzLmhpc3RvcnkuYWN0aW9uID09PSAnUFVTSCcgfHwgbm9BcHBvaW50bWVudEZvdW5kKXtcbiAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTkFWSUdBVEUiLCJpbXBvcnQgU1RPUkFHRSBmcm9tICcuL3N0b3JhZ2UnXG5cbmV4cG9ydCBkZWZhdWx0IFNUT1JBR0UiLCJpbXBvcnQgQ29va2llcyBmcm9tICd1bml2ZXJzYWwtY29va2llJztcbmNvbnN0IGNvb2tpZXMgPSBuZXcgQ29va2llcygpO1xuXG5jb25zdCBTVE9SQUdFID0ge1xuICAgIHNldEF1dGhUb2tlbjogKHRva2VuKSA9PiB7XG4gICAgICAgIGNvb2tpZXMuc2V0KCd0b2tlbicsIHRva2VuKVxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHRydWUpXG4gICAgfSxcbiAgICBnZXRBdXRoVG9rZW46ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShjb29raWVzLmdldCgndG9rZW4nKSlcbiAgICB9LFxuICAgIGNoZWNrQXV0aDogKCkgPT4ge1xuICAgICAgICByZXR1cm4gISFjb29raWVzLmdldCgndG9rZW4nKVxuICAgIH0sXG4gICAgZGVsZXRlQXV0aDogKCkgPT4ge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGNvb2tpZXMucmVtb3ZlKCd0b2tlbicpKVxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgU1RPUkFHRSIsImltcG9ydCB7IFNFTkRfT1RQX1JFUVVFU1QsIFNFTkRfT1RQX1NVQ0NFU1MsIFNFTkRfT1RQX0ZBSUwsIFNVQk1JVF9PVFBfUkVRVUVTVCwgU1VCTUlUX09UUF9TVUNDRVNTLCBTVUJNSVRfT1RQX0ZBSUwgfSBmcm9tICcuLi8uLi9jb25zdGFudHMvdHlwZXMnO1xuXG5jb25zdCBkZWZhdWx0U3RhdGUgPSB7XG4gICAgdG9rZW46IG51bGwsXG4gICAgZXJyb3JfbWVzc2FnZTogXCJcIixcbiAgICBzdWNjZXNzX21lc3NhZ2U6IFwiXCIsXG4gICAgb3RwX3JlcXVlc3Rfc2VudDogZmFsc2UsXG4gICAgb3RwX3JlcXVlc3Rfc3VjY2VzczogZmFsc2UsXG4gICAgb3RwX3JlcXVlc3RfZmFpbDogZmFsc2UsXG4gICAgcGhvbmVOdW1iZXI6IFwiXCIsXG4gICAgc3VibWl0X290cDpmYWxzZSxcbiAgICBzdWJtaXRfb3RwX3N1Y2Nlc3M6ZmFsc2UsXG4gICAgc3VibWl0X290cF9mYWlsOmZhbHNlXG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChzdGF0ZSA9IGRlZmF1bHRTdGF0ZSwgYWN0aW9uKSB7XG5cbiAgICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgICAgIGNhc2UgU0VORF9PVFBfUkVRVUVTVDoge1xuICAgICAgICAgICAgbGV0IG5ld1N0YXRlID0geyAuLi5kZWZhdWx0U3RhdGUgfVxuXG4gICAgICAgICAgICBuZXdTdGF0ZS5vdHBfcmVxdWVzdF9zZW50ID0gdHJ1ZVxuICAgICAgICAgICAgbmV3U3RhdGUucGhvbmVOdW1iZXIgPSBhY3Rpb24ucGF5bG9hZC5waG9uZU51bWJlclxuICAgICAgICAgICAgXG4gICAgICAgICAgICByZXR1cm4gbmV3U3RhdGVcbiAgICAgICAgfVxuXG4gICAgICAgIGNhc2UgU0VORF9PVFBfU1VDQ0VTUzoge1xuICAgICAgICAgICAgbGV0IG5ld1N0YXRlID0geyAuLi5zdGF0ZSB9XG4gICAgICAgICAgICBuZXdTdGF0ZS5vdHBfcmVxdWVzdF9zZW50ID0gZmFsc2VcbiAgICAgICAgICAgIG5ld1N0YXRlLm90cF9yZXF1ZXN0X3N1Y2Nlc3MgPSB0cnVlXG4gICAgICAgICAgICBuZXdTdGF0ZS5vdHBfcmVxdWVzdF9mYWlsID0gZmFsc2VcbiAgICAgICAgICAgIG5ld1N0YXRlLnN1Y2Nlc3NfbWVzc2FnZSA9IGFjdGlvbi5wYXlsb2FkLnN1Y2Nlc3NfbWVzc2FnZVxuICAgICAgICAgICAgXG4gICAgICAgICAgICByZXR1cm4gbmV3U3RhdGVcbiAgICAgICAgfVxuXG4gICAgICAgIGNhc2UgU0VORF9PVFBfRkFJTDoge1xuICAgICAgICAgICAgbGV0IG5ld1N0YXRlID0geyAuLi5zdGF0ZSB9XG4gICAgICAgICAgICBuZXdTdGF0ZS5vdHBfcmVxdWVzdF9zZW50ID0gZmFsc2VcbiAgICAgICAgICAgIG5ld1N0YXRlLm90cF9yZXF1ZXN0X2ZhaWwgPSB0cnVlXG4gICAgICAgICAgICBuZXdTdGF0ZS5vdHBfcmVxdWVzdF9zdWNjZXNzID0gZmFsc2VcbiAgICAgICAgICAgIG5ld1N0YXRlLmVycm9yX21lc3NhZ2UgPSBhY3Rpb24ucGF5bG9hZC5lcnJvcl9tZXNzYWdlXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHJldHVybiBuZXdTdGF0ZVxuICAgICAgICB9XG5cbiAgICAgICAgY2FzZSBTVUJNSVRfT1RQX1JFUVVFU1Q6IHtcbiAgICAgICAgICAgIGxldCBuZXdTdGF0ZSA9IHsgLi4uc3RhdGUgfVxuICAgICAgICAgICAgbmV3U3RhdGUuc3VibWl0X290cCA9IHRydWVcbiAgICAgICAgICAgIHJldHVybiBuZXdTdGF0ZVxuICAgICAgICB9XG5cbiAgICAgICAgY2FzZSBTVUJNSVRfT1RQX1NVQ0NFU1M6IHtcbiAgICAgICAgICAgIGxldCBuZXdTdGF0ZSA9IHsgLi4uc3RhdGUgfVxuICAgICAgICAgICAgbmV3U3RhdGUuc3VibWl0X290cCA9IGZhbHNlXG4gICAgICAgICAgICBuZXdTdGF0ZS5zdWJtaXRfb3RwX2ZhaWwgPSBmYWxzZVxuICAgICAgICAgICAgbmV3U3RhdGUuc3VibWl0X290cF9zdWNjZXNzID0gdHJ1ZVxuICAgICAgICAgICAgbmV3U3RhdGUudG9rZW4gPSBhY3Rpb24ucGF5bG9hZC50b2tlblxuICAgICAgICAgICAgcmV0dXJuIG5ld1N0YXRlXG4gICAgICAgIH1cblxuICAgICAgICBjYXNlIFNVQk1JVF9PVFBfRkFJTDoge1xuICAgICAgICAgICAgbGV0IG5ld1N0YXRlID0geyAuLi5zdGF0ZSB9XG4gICAgICAgICAgICBuZXdTdGF0ZS5zdWJtaXRfb3RwID0gZmFsc2VcbiAgICAgICAgICAgIG5ld1N0YXRlLnN1Ym1pdF9vdHBfZmFpbCA9IHRydWVcbiAgICAgICAgICAgIG5ld1N0YXRlLnN1Ym1pdF9vdHBfc3VjY2VzcyA9IGZhbHNlXG4gICAgICAgICAgICBuZXdTdGF0ZS5lcnJvcl9tZXNzYWdlID0gYWN0aW9uLnBheWxvYWQuZXJyb3JfbWVzc2FnZVxuICAgICAgICAgICAgcmV0dXJuIG5ld1N0YXRlXG4gICAgICAgIH1cblxuICAgIH1cbiAgICByZXR1cm4gc3RhdGVcbn0iLCJpbXBvcnQgeyBBUFBFTkRfVVNFUl9QUk9GSUxFUyB9IGZyb20gJy4uLy4uL2NvbnN0YW50cy90eXBlcyc7XG5cbmNvbnN0IGRlZmF1bHRTdGF0ZSA9IHtcbiAgICBwcm9maWxlczoge31cbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHN0YXRlID0gZGVmYXVsdFN0YXRlLCBhY3Rpb24pIHtcblxuICAgIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICAgICAgY2FzZSBBUFBFTkRfVVNFUl9QUk9GSUxFUzoge1xuICAgICAgICAgICAgbGV0IG5ld1N0YXRlID0ge1xuICAgICAgICAgICAgICAgIC4uLnN0YXRlLFxuICAgICAgICAgICAgICAgIHByb2ZpbGVzIDogeyAuLi5zdGF0ZS5wcm9maWxlcyB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIG5ld1N0YXRlLnByb2ZpbGVzID0gYWN0aW9uLnBheWxvYWQucmVkdWNlKChwcm9maWxlTWFwLCBwcm9maWxlKSA9PiB7XG4gICAgICAgICAgICAgICAgcHJvZmlsZU1hcFtwcm9maWxlLnByb2ZpbGVJZF0gPSBwcm9maWxlXG4gICAgICAgICAgICAgICAgcmV0dXJuIHByb2ZpbGVNYXBcbiAgICAgICAgICAgIH0sIG5ld1N0YXRlLnByb2ZpbGVzKVxuXG4gICAgICAgICAgICByZXR1cm4gbmV3U3RhdGVcbiAgICAgICAgfVxuXG4gICAgfVxuICAgIHJldHVybiBzdGF0ZVxufSIsImltcG9ydCB7IEFQUEVORF9MQUJTIH0gZnJvbSAnLi4vLi4vY29uc3RhbnRzL3R5cGVzJztcblxuY29uc3QgZGVmYXVsdFN0YXRlID0ge1xuXG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChzdGF0ZSA9IGRlZmF1bHRTdGF0ZSwgYWN0aW9uKSB7XG5cbiAgICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgICAgIGNhc2UgQVBQRU5EX0xBQlM6IHtcbiAgICAgICAgICAgIGxldCBuZXdTdGF0ZSA9IHsgLi4uc3RhdGUgfVxuXG4gICAgICAgICAgICByZXR1cm4gYWN0aW9uLnBheWxvYWQucmVkdWNlKChsYXBNYXAsIGxhYikgPT4ge1xuICAgICAgICAgICAgICAgIGxhcE1hcFtsYWIubGFiLmlkXSA9IGxhYlxuICAgICAgICAgICAgICAgIHJldHVybiBsYXBNYXBcbiAgICAgICAgICAgIH0sbmV3U3RhdGUpXG5cbiAgICAgICAgfVxuXG4gICAgfVxuICAgIHJldHVybiBzdGF0ZVxufSIsImltcG9ydCB7IExBQl9TRUFSQ0hfU1RBUlQsIExBQl9TRUFSQ0ggfSBmcm9tICcuLi8uLi9jb25zdGFudHMvdHlwZXMnO1xuXG5jb25zdCBkZWZhdWx0U3RhdGUgPSB7XG4gICAgbGFiTGlzdDogW10sXG4gICAgTE9BREVEX0xBQlNfU0VBUkNIOiBmYWxzZVxufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoc3RhdGUgPSBkZWZhdWx0U3RhdGUsIGFjdGlvbikge1xuXG4gICAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuXG4gICAgICAgIGNhc2UgTEFCX1NFQVJDSF9TVEFSVDoge1xuICAgICAgICAgICAgbGV0IG5ld1N0YXRlID0geyAuLi5zdGF0ZSB9XG5cbiAgICAgICAgICAgIG5ld1N0YXRlLkxPQURFRF9MQUJTX1NFQVJDSCA9IGZhbHNlXG5cbiAgICAgICAgICAgIHJldHVybiBuZXdTdGF0ZVxuICAgICAgICB9XG5cbiAgICAgICAgY2FzZSBMQUJfU0VBUkNIOiB7XG4gICAgICAgICAgICBsZXQgbmV3U3RhdGUgPSB7IC4uLnN0YXRlIH1cblxuICAgICAgICAgICAgbmV3U3RhdGUubGFiTGlzdCA9IGFjdGlvbi5wYXlsb2FkLm1hcChsYWIgPT4gbGFiLmxhYi5pZClcbiAgICAgICAgICAgIG5ld1N0YXRlLkxPQURFRF9MQUJTX1NFQVJDSCA9IHRydWVcblxuICAgICAgICAgICAgcmV0dXJuIG5ld1N0YXRlXG4gICAgICAgIH1cblxuICAgIH1cbiAgICBcbiAgICByZXR1cm4gc3RhdGVcbn0iLCJpbXBvcnQgeyBBUFBFTkRfRklMVEVSU19ESUFHTk9TSVMsIFRPR0dMRV9DT05ESVRJT05TLCBUT0dHTEVfU1BFQ0lBTElUSUVTLCBTRUxFQ1RfTE9DQVRJT05fRElBR05PU0lTLCBNRVJHRV9TRUFSQ0hfU1RBVEVfTEFCLCBUT0dHTEVfQ1JJVEVSSUEsIFRPR0dMRV9URVNUUywgVE9HR0xFX0RJQUdOT1NJU19DUklURVJJQSwgTE9BRF9TRUFSQ0hfQ1JJVEVSSUFfTEFCIH0gZnJvbSAnLi4vLi4vY29uc3RhbnRzL3R5cGVzJztcblxuY29uc3QgZGVmYXVsdFN0YXRlID0ge1xuICAgIExPQURFRF9TRUFSQ0hfQ1JJVEVSSUFfTEFCOiBmYWxzZSxcbiAgICBjb21tb25fdGVzdHM6IFtdLFxuICAgIGNvbW1vbl9jb25kaXRpb25zOiBbXSxcbiAgICBwcmVmZXJyZWRfbGFiczogW10sXG4gICAgc2VsZWN0ZWRDcml0ZXJpYXM6IFtdLFxuICAgIHNlbGVjdGVkTG9jYXRpb246IG51bGwsXG4gICAgZmlsdGVyQ3JpdGVyaWE6IHtcbiAgICAgICAgcHJpY2VSYW5nZTogWzEwMCwgMTUwMF0sXG4gICAgICAgIGRpc3RhbmNlUmFuZ2U6IFsxLCAzNV0sXG4gICAgICAgIHNvcnRCeTogbnVsbFxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHN0YXRlID0gZGVmYXVsdFN0YXRlLCBhY3Rpb24pIHtcblxuICAgIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICAgICAgY2FzZSBMT0FEX1NFQVJDSF9DUklURVJJQV9MQUI6IHtcbiAgICAgICAgICAgIGxldCBuZXdTdGF0ZSA9IHsgLi4uc3RhdGUgfVxuICAgICAgICAgICAgaWYgKGFjdGlvbi5wYXlsb2FkKSB7XG4gICAgICAgICAgICAgICAgbmV3U3RhdGUgPSB7IC4uLm5ld1N0YXRlLCAuLi5hY3Rpb24ucGF5bG9hZCB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBuZXdTdGF0ZS5MT0FERURfU0VBUkNIX0NSSVRFUklBX0xBQiA9IHRydWVcbiAgICAgICAgICAgIHJldHVybiBuZXdTdGF0ZVxuICAgICAgICB9XG5cbiAgICAgICAgY2FzZSBUT0dHTEVfRElBR05PU0lTX0NSSVRFUklBOiB7XG4gICAgICAgICAgICBsZXQgbmV3U3RhdGUgPSB7XG4gICAgICAgICAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRDcml0ZXJpYXM6IFtdLmNvbmNhdChzdGF0ZS5zZWxlY3RlZENyaXRlcmlhcylcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGV0IGZvdW5kID0gZmFsc2VcbiAgICAgICAgICAgIG5ld1N0YXRlLnNlbGVjdGVkQ3JpdGVyaWFzID0gbmV3U3RhdGUuc2VsZWN0ZWRDcml0ZXJpYXMuZmlsdGVyKChjdXJyKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGN1cnIuaWQgPT0gYWN0aW9uLnBheWxvYWQuY3JpdGVyaWEuaWQgJiYgY3Vyci50eXBlID09IGFjdGlvbi5wYXlsb2FkLnR5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgZm91bmQgPSB0cnVlXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgaWYgKCFmb3VuZCkge1xuICAgICAgICAgICAgICAgIG5ld1N0YXRlLnNlbGVjdGVkQ3JpdGVyaWFzLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAuLi5hY3Rpb24ucGF5bG9hZC5jcml0ZXJpYSxcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogYWN0aW9uLnBheWxvYWQudHlwZVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBuZXdTdGF0ZVxuICAgICAgICB9XG5cbiAgICAgICAgY2FzZSBTRUxFQ1RfTE9DQVRJT05fRElBR05PU0lTOiB7XG4gICAgICAgICAgICBsZXQgbmV3U3RhdGUgPSB7IC4uLnN0YXRlIH1cblxuICAgICAgICAgICAgbmV3U3RhdGUuc2VsZWN0ZWRMb2NhdGlvbiA9IGFjdGlvbi5wYXlsb2FkXG4gICAgICAgICAgICByZXR1cm4gbmV3U3RhdGVcbiAgICAgICAgfVxuXG4gICAgICAgIGNhc2UgTUVSR0VfU0VBUkNIX1NUQVRFX0xBQjoge1xuICAgICAgICAgICAgbGV0IG5ld1N0YXRlID0geyAuLi5zdGF0ZSwgLi4uYWN0aW9uLnBheWxvYWQuc2VhcmNoU3RhdGUsIGZpbHRlckNyaXRlcmlhIDogYWN0aW9uLnBheWxvYWQuZmlsdGVyQ3JpdGVyaWEgfVxuXG4gICAgICAgICAgICByZXR1cm4gbmV3U3RhdGVcbiAgICAgICAgfVxuXG4gICAgfVxuICAgIHJldHVybiBzdGF0ZVxufVxuXG5cblxuXG5cbiIsImltcG9ydCB7Y29tYmluZVJlZHVjZXJzfSBmcm9tICdyZWR1eCc7XG5cbmltcG9ydCBTRUFSQ0hfQ1JJVEVSSUFfT1BEIGZyb20gJy4vb3BkL3NlYXJjaENyaXRlcmlhLmpzJ1xuaW1wb3J0IFNFQVJDSF9DUklURVJJQV9MQUJTIGZyb20gJy4vZGlhZ25vc2lzL3NlYXJjaENyaXRlcmlhLmpzJ1xuaW1wb3J0IERPQ1RPUlMgZnJvbSAnLi9vcGQvZG9jdG9ycy5qcydcbmltcG9ydCBET0NUT1JfU0VBUkNIIGZyb20gJy4vb3BkL2RvY3RvclNlYXJjaC5qcydcbmltcG9ydCBMQUJTIGZyb20gJy4vZGlhZ25vc2lzL2xhYnMuanMnXG5pbXBvcnQgTEFCX1NFQVJDSCBmcm9tICcuL2RpYWdub3Npcy9sYWJzU2VhcmNoLmpzJ1xuaW1wb3J0IFVTRVIgZnJvbSAnLi9jb21tb25zL3VzZXIuanMnXG5pbXBvcnQgQVVUSCBmcm9tICcuL2NvbW1vbnMvYXV0aC5qcydcblxuY29uc3QgYWxsUmVkdWNlcnMgPSBjb21iaW5lUmVkdWNlcnMoe1xuICAgIFNFQVJDSF9DUklURVJJQV9PUEQsXG4gICAgU0VBUkNIX0NSSVRFUklBX0xBQlMsXG4gICAgRE9DVE9SUyxcbiAgICBET0NUT1JfU0VBUkNILFxuICAgIExBQlMsXG4gICAgTEFCX1NFQVJDSCxcbiAgICBVU0VSLFxuICAgIEFVVEhcbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBhbGxSZWR1Y2Vyc1xuIiwiaW1wb3J0IHsgRE9DVE9SX1NFQVJDSCwgRE9DVE9SX1NFQVJDSF9TVEFSVCB9IGZyb20gJy4uLy4uL2NvbnN0YW50cy90eXBlcyc7XG5cbmNvbnN0IGRlZmF1bHRTdGF0ZSA9IHtcbiAgICBkb2N0b3JMaXN0OiBbXSxcbiAgICBMT0FERURfRE9DVE9SX1NFQVJDSDogZmFsc2Vcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHN0YXRlID0gZGVmYXVsdFN0YXRlLCBhY3Rpb24pIHtcblxuICAgIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcblxuICAgICAgICBjYXNlIERPQ1RPUl9TRUFSQ0hfU1RBUlQ6IHtcbiAgICAgICAgICAgIGxldCBuZXdTdGF0ZSA9IHsgLi4uc3RhdGUgfVxuXG4gICAgICAgICAgICBuZXdTdGF0ZS5MT0FERURfRE9DVE9SX1NFQVJDSCA9IGZhbHNlXG5cbiAgICAgICAgICAgIHJldHVybiBuZXdTdGF0ZVxuICAgICAgICB9XG5cbiAgICAgICAgY2FzZSBET0NUT1JfU0VBUkNIOiB7XG4gICAgICAgICAgICBsZXQgbmV3U3RhdGUgPSB7IC4uLnN0YXRlIH1cblxuICAgICAgICAgICAgbmV3U3RhdGUuZG9jdG9yTGlzdCA9IGFjdGlvbi5wYXlsb2FkLm1hcChkb2MgPT4gZG9jLmlkKVxuICAgICAgICAgICAgbmV3U3RhdGUuTE9BREVEX0RPQ1RPUl9TRUFSQ0ggPSB0cnVlXG5cbiAgICAgICAgICAgIHJldHVybiBuZXdTdGF0ZVxuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICByZXR1cm4gc3RhdGVcbn0iLCJpbXBvcnQgeyBBUFBFTkRfRE9DVE9SUyB9IGZyb20gJy4uLy4uL2NvbnN0YW50cy90eXBlcyc7XG5cbmNvbnN0IGRlZmF1bHRTdGF0ZSA9IHtcblxufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoc3RhdGUgPSBkZWZhdWx0U3RhdGUsIGFjdGlvbikge1xuXG4gICAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgICAgICBjYXNlIEFQUEVORF9ET0NUT1JTOiB7XG4gICAgICAgICAgICBsZXQgbmV3U3RhdGUgPSB7IC4uLnN0YXRlIH1cblxuICAgICAgICAgICAgcmV0dXJuIGFjdGlvbi5wYXlsb2FkLnJlZHVjZSgoZG9jdG9yTWFwLCBkb2N0b3IpID0+IHtcbiAgICAgICAgICAgICAgICBkb2N0b3JNYXBbZG9jdG9yLmlkXSA9IGRvY3RvclxuICAgICAgICAgICAgICAgIHJldHVybiBkb2N0b3JNYXBcbiAgICAgICAgICAgIH0sbmV3U3RhdGUpXG5cbiAgICAgICAgfVxuXG4gICAgfVxuICAgIHJldHVybiBzdGF0ZVxufSIsImltcG9ydCB7IFNFTEVDVF9MT0NBVElPTl9PUEQsIE1FUkdFX1NFQVJDSF9TVEFURV9PUEQsIFRPR0dMRV9PUERfQ1JJVEVSSUEsIExPQURfU0VBUkNIX0NSSVRFUklBX09QRCB9IGZyb20gJy4uLy4uL2NvbnN0YW50cy90eXBlcyc7XG5cbmNvbnN0IGRlZmF1bHRTdGF0ZSA9IHtcbiAgICBMT0FERURfU0VBUkNIX0NSSVRFUklBX09QRDogZmFsc2UsXG4gICAgc3BlY2lhbGl6YXRpb25zOiBbXSxcbiAgICBjb25kaXRpb25zOiBbXSxcbiAgICBzZWxlY3RlZENyaXRlcmlhczogW10sXG4gICAgc2VsZWN0ZWRMb2NhdGlvbjogbnVsbCxcbiAgICBmaWx0ZXJDcml0ZXJpYToge1xuICAgICAgICBwcmljZVJhbmdlOiBbMTAwLCAxNTAwXSxcbiAgICAgICAgc29ydF9vbjogbnVsbCxcbiAgICAgICAgc2l0c19hdF9jbGluaWM6IGZhbHNlLFxuICAgICAgICBzaXRzX2F0X2hvc3BpdGFsOiBmYWxzZSxcbiAgICAgICAgaXNfZmVtYWxlOiBmYWxzZSxcbiAgICAgICAgaXNfYXZhaWxhYmxlOiBmYWxzZVxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHN0YXRlID0gZGVmYXVsdFN0YXRlLCBhY3Rpb24pIHtcblxuICAgIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICAgICAgY2FzZSBMT0FEX1NFQVJDSF9DUklURVJJQV9PUEQ6IHtcbiAgICAgICAgICAgIGxldCBuZXdTdGF0ZSA9IHsgLi4uc3RhdGUgfVxuICAgICAgICAgICAgaWYgKGFjdGlvbi5wYXlsb2FkKSB7XG4gICAgICAgICAgICAgICAgbmV3U3RhdGUgPSB7IC4uLm5ld1N0YXRlLCAuLi5hY3Rpb24ucGF5bG9hZCB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBuZXdTdGF0ZS5MT0FERURfU0VBUkNIX0NSSVRFUklBX09QRCA9IHRydWVcbiAgICAgICAgICAgIHJldHVybiBuZXdTdGF0ZVxuICAgICAgICB9XG5cbiAgICAgICAgY2FzZSBUT0dHTEVfT1BEX0NSSVRFUklBOiB7XG4gICAgICAgICAgICBsZXQgbmV3U3RhdGUgPSB7XG4gICAgICAgICAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRDcml0ZXJpYXM6IFtdLmNvbmNhdChzdGF0ZS5zZWxlY3RlZENyaXRlcmlhcylcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGV0IGZvdW5kID0gZmFsc2VcbiAgICAgICAgICAgIG5ld1N0YXRlLnNlbGVjdGVkQ3JpdGVyaWFzID0gbmV3U3RhdGUuc2VsZWN0ZWRDcml0ZXJpYXMuZmlsdGVyKChjdXJyKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGN1cnIuaWQgPT0gYWN0aW9uLnBheWxvYWQuY3JpdGVyaWEuaWQgJiYgY3Vyci50eXBlID09IGFjdGlvbi5wYXlsb2FkLnR5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgZm91bmQgPSB0cnVlXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgaWYgKCFmb3VuZCkge1xuICAgICAgICAgICAgICAgIG5ld1N0YXRlLnNlbGVjdGVkQ3JpdGVyaWFzLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAuLi5hY3Rpb24ucGF5bG9hZC5jcml0ZXJpYSxcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogYWN0aW9uLnBheWxvYWQudHlwZVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBuZXdTdGF0ZVxuICAgICAgICB9XG5cbiAgICAgICAgY2FzZSBTRUxFQ1RfTE9DQVRJT05fT1BEOiB7XG4gICAgICAgICAgICBsZXQgbmV3U3RhdGUgPSB7IC4uLnN0YXRlIH1cblxuICAgICAgICAgICAgbmV3U3RhdGUuc2VsZWN0ZWRMb2NhdGlvbiA9IGFjdGlvbi5wYXlsb2FkXG4gICAgICAgICAgICByZXR1cm4gbmV3U3RhdGVcbiAgICAgICAgfVxuXG4gICAgICAgIGNhc2UgTUVSR0VfU0VBUkNIX1NUQVRFX09QRDoge1xuICAgICAgICAgICAgbGV0IG5ld1N0YXRlID0geyAuLi5zdGF0ZSwgLi4uYWN0aW9uLnBheWxvYWQuc2VhcmNoU3RhdGUsIGZpbHRlckNyaXRlcmlhOiBhY3Rpb24ucGF5bG9hZC5maWx0ZXJDcml0ZXJpYSB9XG5cbiAgICAgICAgICAgIHJldHVybiBuZXdTdGF0ZVxuICAgICAgICB9XG5cbiAgICB9XG4gICAgcmV0dXJuIHN0YXRlXG59XG5cblxuXG5cblxuIiwiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IEJyb3dzZXJSb3V0ZXIsIFN3aXRjaCwgUm91dGUgfSBmcm9tICdyZWFjdC1yb3V0ZXItZG9tJ1xuXG5pbXBvcnQgeyBUcmFuc2l0aW9uR3JvdXAsIENTU1RyYW5zaXRpb24gfSBmcm9tIFwicmVhY3QtdHJhbnNpdGlvbi1ncm91cFwiO1xuXG5pbXBvcnQgU2VhcmNoQ3JpdGVyaWEgZnJvbSAnLi9jb250YWluZXJzL29wZC9TZWFyY2hDcml0ZXJpYS5qcydcbmltcG9ydCBMb2NhdGlvblNlYXJjaCBmcm9tICcuL2NvbnRhaW5lcnMvb3BkL0xvY2F0aW9uU2VhcmNoLmpzJ1xuaW1wb3J0IFNlYXJjaFJlc3VsdHMgZnJvbSAnLi9jb250YWluZXJzL29wZC9TZWFyY2hSZXN1bHRzLmpzJ1xuaW1wb3J0IFNlYXJjaFJlc3VsdHNGaWx0ZXIgZnJvbSAnLi9jb250YWluZXJzL29wZC9TZWFyY2hSZXN1bHRzRmlsdGVyLmpzJ1xuaW1wb3J0IERvY3RvclByb2ZpbGUgZnJvbSAnLi9jb250YWluZXJzL29wZC9Eb2N0b3JQcm9maWxlLmpzJ1xuaW1wb3J0IENsaW5pY0xpc3QgZnJvbSAnLi9jb250YWluZXJzL29wZC9DbGluaWNMaXN0LmpzJ1xuaW1wb3J0IEFwcG9pbnRtZW50U2xvdCBmcm9tICcuL2NvbnRhaW5lcnMvb3BkL0FwcG9pbnRtZW50U2xvdC5qcydcbmltcG9ydCBQYXRpZW50RGV0YWlscyBmcm9tICcuL2NvbnRhaW5lcnMvb3BkL1BhdGllbnREZXRhaWxzLmpzJ1xuXG5pbXBvcnQgVXNlclByb2ZpbGUgZnJvbSAnLi9jb250YWluZXJzL2NvbW1vbnMvVXNlclByb2ZpbGUuanMnXG5pbXBvcnQgVXNlckFwcG9pbnRtZW50cyBmcm9tICcuL2NvbnRhaW5lcnMvY29tbW9ucy9Vc2VyQXBwb2ludG1lbnRzLmpzJ1xuaW1wb3J0IFVzZXJSZXBvcnRzIGZyb20gJy4vY29udGFpbmVycy9jb21tb25zL1VzZXJSZXBvcnRzLmpzJ1xuaW1wb3J0IFVzZXJTaWdudXAgZnJvbSAnLi9jb250YWluZXJzL2NvbW1vbnMvVXNlclNpZ251cCdcblxuaW1wb3J0IFBheW1lbnQgZnJvbSAnLi9jb250YWluZXJzL29wZC9QYXltZW50LmpzJ1xuaW1wb3J0IEJvb2tpbmcgZnJvbSAnLi9jb250YWluZXJzL29wZC9Cb29raW5nLmpzJ1xuaW1wb3J0IENyaXRlcmlhU2VhcmNoIGZyb20gJy4vY29udGFpbmVycy9vcGQvQ3JpdGVyaWFTZWFyY2guanMnXG5pbXBvcnQgRFhfU2VhcmNoQ3JpdGVyaWEgZnJvbSAnLi9jb250YWluZXJzL2RpYWdub3Npcy9TZWFyY2hDcml0ZXJpYS5qcydcbmltcG9ydCBEWF9TZWFyY2hSZXN1bHRzIGZyb20gJy4vY29udGFpbmVycy9kaWFnbm9zaXMvU2VhcmNoUmVzdWx0cy5qcydcbmltcG9ydCBMYWIgZnJvbSAnLi9jb250YWluZXJzL2RpYWdub3Npcy9MYWIuanMnXG5pbXBvcnQgRFhfUGF0aWVudERldGFpbHMgZnJvbSAnLi9jb250YWluZXJzL2RpYWdub3Npcy9QYXRpZW50RGV0YWlscy5qcydcbmltcG9ydCBEWF9Cb29raW5nU3VtbWFyeSBmcm9tICcuL2NvbnRhaW5lcnMvZGlhZ25vc2lzL0Jvb2tpbmdTdW1tYXJ5LmpzJ1xuaW1wb3J0IERvY3RvckNoYXQgZnJvbSAnLi9jb250YWluZXJzL2NvbW1vbnMvQ2hhdC5qcydcbmltcG9ydCBUZXN0U2VsZWN0b3IgZnJvbSAnLi9jb250YWluZXJzL2RpYWdub3Npcy9UZXN0U2VsZWN0b3InXG5cbmltcG9ydCBVc2VyTG9naW4gZnJvbSAnLi9jb250YWluZXJzL2NvbW1vbnMvVXNlckxvZ2luJ1xuaW1wb3J0IE90cFZlcmlmeSBmcm9tICcuL2NvbnRhaW5lcnMvY29tbW9ucy9PdHBWZXJpZnknXG5cbmNvbnN0IHJvdXRlcyA9IFtcblxuICAgIHsgcGF0aDogJy9vcGQnLCBleGFjdDogdHJ1ZSwgY29tcG9uZW50OiBTZWFyY2hDcml0ZXJpYSB9LFxuICAgIHsgcGF0aDogJy9sb2NhdGlvbnNlYXJjaCcsIGV4YWN0OiB0cnVlLCBjb21wb25lbnQ6IExvY2F0aW9uU2VhcmNoIH0sXG4gICAgeyBwYXRoOiAnL29wZC9zZWFyY2hyZXN1bHRzJywgZXhhY3Q6IHRydWUsIGNvbXBvbmVudDogU2VhcmNoUmVzdWx0cyB9LFxuICAgIHsgcGF0aDogJy9vcGQvZG9jdG9yLzppZCcsIGV4YWN0OiB0cnVlLCBjb21wb25lbnQ6IERvY3RvclByb2ZpbGUgfSxcbiAgICB7IHBhdGg6ICcvb3BkL2RvY3Rvci86aWQvOmNsaW5pY0lkL2Jvb2snLCBleGFjdDogdHJ1ZSwgY29tcG9uZW50OiBBcHBvaW50bWVudFNsb3QgfSxcblxuICAgIHsgcGF0aDogJy9vcGQvZG9jdG9yLzppZC9hdmFpbGFiaWxpdHknLCBleGFjdDogdHJ1ZSwgY29tcG9uZW50OiBDbGluaWNMaXN0IH0sXG4gICAgeyBwYXRoOiAnL2RvY3RvcnByb2ZpbGUvOmlkLzpjbGluaWNJZC9ib29rZGV0YWlscycsIGV4YWN0OiB0cnVlLCBjb21wb25lbnQ6IFBhdGllbnREZXRhaWxzIH0sXG4gICAgXG4gICAgeyBwYXRoOiAnL3VzZXIvc2lnbnVwJywgZXhhY3Q6IHRydWUsIGNvbXBvbmVudDogVXNlclNpZ251cCB9LFxuICAgIHsgcGF0aDogJy91c2VyJywgZXhhY3Q6IHRydWUsIGNvbXBvbmVudDogVXNlclByb2ZpbGUgfSxcbiAgICB7IHBhdGg6ICcvdXNlci86aWQnLCBleGFjdDogdHJ1ZSwgY29tcG9uZW50OiBVc2VyUHJvZmlsZSB9LFxuICAgIHsgcGF0aDogJy91c2VyLzppZC9hcHBvaW50bWVudHMnLCBleGFjdDogdHJ1ZSwgY29tcG9uZW50OiBVc2VyQXBwb2ludG1lbnRzIH0sXG4gICAgeyBwYXRoOiAnL3VzZXIvOmlkL3JlcG9ydHMnLCBleGFjdDogdHJ1ZSwgY29tcG9uZW50OiBVc2VyUmVwb3J0cyB9LFxuICAgIHsgcGF0aDogJy9jaGF0JywgZXhhY3Q6IHRydWUsIGNvbXBvbmVudDogRG9jdG9yQ2hhdCB9LFxuICAgIHsgcGF0aDogJy9wYXltZW50JywgZXhhY3Q6IHRydWUsIGNvbXBvbmVudDogUGF5bWVudCB9LFxuICAgIHsgcGF0aDogJy9ib29raW5nLzpyZWZJZCcsIGV4YWN0OiB0cnVlLCBjb21wb25lbnQ6IEJvb2tpbmcgfSxcblxuICAgIHsgcGF0aDogJy9sb2dpbicsIGV4YWN0OiB0cnVlLCBjb21wb25lbnQ6IFVzZXJMb2dpbiB9LFxuICAgIHsgcGF0aDogJy9vdHAvdmVyaWZ5JywgZXhhY3Q6IHRydWUsIGNvbXBvbmVudDogT3RwVmVyaWZ5IH0sXG5cbiAgICB7IHBhdGg6ICcvZHgnLCBleGFjdDogdHJ1ZSwgY29tcG9uZW50OiBEWF9TZWFyY2hDcml0ZXJpYSB9LFxuICAgIHsgcGF0aDogJy9keC9zZWFyY2hyZXN1bHRzJywgZXhhY3Q6IHRydWUsIGNvbXBvbmVudDogRFhfU2VhcmNoUmVzdWx0cyB9LFxuICAgIHsgcGF0aDogJy9sYWIvOmlkJywgZXhhY3Q6IHRydWUsIGNvbXBvbmVudDogTGFiIH0sXG4gICAgeyBwYXRoOiAnL2xhYi86aWQvdGVzdHMnLCBleGFjdDogdHJ1ZSwgY29tcG9uZW50OiBUZXN0U2VsZWN0b3IgfSxcbiAgICB7IHBhdGg6ICcvbGFiLzppZC9ib29rJywgZXhhY3Q6IHRydWUsIGNvbXBvbmVudDogRFhfQm9va2luZ1N1bW1hcnkgfSxcblxuICAgIHsgcGF0aDogJy9sYWIvYm9va2luZy9zdW1tYXJ5LzppZCcsIGV4YWN0OiB0cnVlLCBjb21wb25lbnQ6IERYX0Jvb2tpbmdTdW1tYXJ5IH0sXG5cbl1cblxuY2xhc3MgUm91dGVyQ29uZmlnIGV4dGVuZHMgQ29tcG9uZW50IHtcblxuICAgIHN0YXRpYyBST1VURVMgPSByb3V0ZXNcblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgPFJvdXRlXG4gICAgICAgICAgICAgICAgICAgIHJlbmRlcj17XG4gICAgICAgICAgICAgICAgICAgICAgICAoeyBsb2NhdGlvbiB9KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPFRyYW5zaXRpb25Hcm91cD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxDU1NUcmFuc2l0aW9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5PXtsb2NhdGlvbi5wYXRobmFtZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWVzPVwiZmFkZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGltZW91dD17eyBlbnRlcjogMzAwLCBleGl0OiAwIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXhpdD17ZmFsc2V9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPFN3aXRjaCBsb2NhdGlvbj17bG9jYXRpb259PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7cm91dGVzLm1hcCgocm91dGUsIGkpID0+IChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxSb3V0ZSB7Li4ucm91dGV9IGtleT17aX0gLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9Td2l0Y2g+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NTU1RyYW5zaXRpb24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvVHJhbnNpdGlvbkdyb3VwPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8+XG5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApXG4gICAgfVxuXG59XG5cblxuZXhwb3J0IGRlZmF1bHQgUm91dGVyQ29uZmlnXG5cbiIsIlxuY29uc3QgZGF5cyA9IFsnU3VuZGF5JywgJ01vbmRheScsICdUdWVzZGF5JywgJ1dlZG5lc2RheScsICdUaHVyc2RheScsICdGcmlkYXknLCAnU2F0dXJkYXknXTtcblxuZXhwb3J0IGNvbnN0IGdldFRpbWUgPSAodGltZVN0YW1wKSA9PiB7XG4gICAgdmFyIGRhdGUgPSBuZXcgRGF0ZSh0aW1lU3RhbXApO1xuICAgIHZhciBob3VycyA9IGRhdGUuZ2V0SG91cnMoKTtcbiAgICB2YXIgbWludXRlcyA9IFwiMFwiICsgZGF0ZS5nZXRNaW51dGVzKCk7XG4gICAgcmV0dXJuIGhvdXJzICsgJzonICsgbWludXRlcy5zdWJzdHIoLTIpXG59XG5leHBvcnQgY29uc3QgZ2V0RGF5TmFtZSA9ICh0aW1lU3RhbXApID0+IHtcbiAgICByZXR1cm4gZGF5c1tuZXcgRGF0ZSh0aW1lU3RhbXApLmdldERheSgpXVxuXG59IiwicHJvY2Vzcy5lbnYuTk9ERV9UTFNfUkVKRUNUX1VOQVVUSE9SSVpFRCA9IFwiMFwiXG5cbmNvbnN0IHBhdGggPSByZXF1aXJlKCdwYXRoJyk7XG5jb25zdCBodHRwID0gcmVxdWlyZSgnaHR0cCcpO1xuY29uc3QgRXhwcmVzcyA9IHJlcXVpcmUoJ2V4cHJlc3MnKTtcbmNvbnN0IGFwcCA9IG5ldyBFeHByZXNzKCk7XG5jb25zdCBzZXJ2ZXIgPSBuZXcgaHR0cC5TZXJ2ZXIoYXBwKTtcblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IFJlYWN0RE9NU2VydmVyIGZyb20gJ3JlYWN0LWRvbS9zZXJ2ZXInXG5pbXBvcnQgeyBTdGF0aWNSb3V0ZXIgfSBmcm9tICdyZWFjdC1yb3V0ZXInXG5pbXBvcnQgUm91dGVzIGZyb20gJy4vZGV2L2pzL3JvdXRlcy5qcydcbmltcG9ydCB7IE11aVRoZW1lUHJvdmlkZXIsIGNyZWF0ZU11aVRoZW1lLCBjcmVhdGVHZW5lcmF0ZUNsYXNzTmFtZSB9IGZyb20gJ21hdGVyaWFsLXVpL3N0eWxlcyc7XG5pbXBvcnQgeyBTaGVldHNSZWdpc3RyeSB9IGZyb20gJ3JlYWN0LWpzcy9saWIvanNzJztcblxuaW1wb3J0IEpzc1Byb3ZpZGVyIGZyb20gJ3JlYWN0LWpzcy9saWIvSnNzUHJvdmlkZXInO1xuaW1wb3J0IHsgUHJvdmlkZXIgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgeyBjcmVhdGVTdG9yZSwgYXBwbHlNaWRkbGV3YXJlIH0gZnJvbSAncmVkdXgnO1xuaW1wb3J0IHRodW5rIGZyb20gJ3JlZHV4LXRodW5rJztcbmltcG9ydCB7IGNyZWF0ZUxvZ2dlciB9IGZyb20gJ3JlZHV4LWxvZ2dlcidcbmltcG9ydCBhbGxSZWR1Y2VycyBmcm9tICcuL2Rldi9qcy9yZWR1Y2Vycy9pbmRleC5qcyc7XG5pbXBvcnQgeyBtYXRjaFBhdGggfSBmcm9tICdyZWFjdC1yb3V0ZXItZG9tJ1xuXG5cbmFwcC51c2UoJy9hc3NldHMnLCBFeHByZXNzLnN0YXRpYyhwYXRoLmpvaW4oX19kaXJuYW1lLCAnYXNzZXRzJykpKTtcbmFwcC51c2UoJy9kaXN0JywgRXhwcmVzcy5zdGF0aWMocGF0aC5qb2luKF9fZGlybmFtZSwgJ2Rpc3QnKSkpO1xuXG5cbmFwcC5nZXQoJyonLCBmdW5jdGlvbiAocmVxLCByZXMpIHtcblxuICAgIGNvbnN0IGNvbnRleHQgPSB7fVxuXG4gICAgY29uc3Qgc3RvcmUgPSBjcmVhdGVTdG9yZShcbiAgICAgICAgYWxsUmVkdWNlcnMsIGFwcGx5TWlkZGxld2FyZSh0aHVuaylcbiAgICApO1xuXG4gICAgY29uc3Qgc2hlZXRzUmVnaXN0cnkgPSBuZXcgU2hlZXRzUmVnaXN0cnkoKTtcbiAgICBjb25zdCB0aGVtZSA9IGNyZWF0ZU11aVRoZW1lKHtcbiAgICAgICAgcGFsZXR0ZToge1xuICAgICAgICAgICAgcHJpbWFyeToge1xuICAgICAgICAgICAgICAgIG1haW46ICcjMDBiN2IwJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNlY29uZGFyeToge1xuICAgICAgICAgICAgICAgIG1haW46ICcjMDBiN2IwJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgICAgc3RhdHVzOiB7XG4gICAgICAgICAgICBkYW5nZXI6ICdvcmFuZ2UnLFxuICAgICAgICB9LFxuICAgIH0pXG4gICAgY29uc3QgZ2VuZXJhdGVDbGFzc05hbWUgPSBjcmVhdGVHZW5lcmF0ZUNsYXNzTmFtZSgpO1xuXG4gICAgaWYgKGNvbnRleHQudXJsKSB7XG4gICAgICAgIHJlcy53cml0ZUhlYWQoMzAxLCB7XG4gICAgICAgICAgICBMb2NhdGlvbjogY29udGV4dC51cmxcbiAgICAgICAgfSlcbiAgICAgICAgcmVzLmVuZCgpXG4gICAgfSBlbHNlIHtcblxuICAgICAgICAvLyBpbnNpZGUgYSByZXF1ZXN0XG4gICAgICAgIGNvbnN0IHByb21pc2VzID0gW11cblxuICAgICAgICBSb3V0ZXMuUk9VVEVTLnNvbWUocm91dGUgPT4ge1xuICAgICAgICAgICAgLy8gdXNlIGBtYXRjaFBhdGhgIGhlcmVcbiAgICAgICAgICAgIGNvbnN0IG1hdGNoID0gbWF0Y2hQYXRoKHJlcS5wYXRoLCByb3V0ZSlcbiAgICAgICAgICAgIGlmIChtYXRjaCAmJiByb3V0ZS5jb21wb25lbnQubG9hZERhdGEpXG4gICAgICAgICAgICAgICAgcHJvbWlzZXMucHVzaChyb3V0ZS5jb21wb25lbnQubG9hZERhdGEoc3RvcmUsIG1hdGNoKSlcbiAgICAgICAgICAgIHJldHVybiBtYXRjaFxuICAgICAgICB9KVxuXG4gICAgICAgIFByb21pc2UuYWxsKHByb21pc2VzKS50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgY29uc3Qgc3RvcmVEYXRhID0gSlNPTi5zdHJpbmdpZnkoc3RvcmUuZ2V0U3RhdGUoKSlcbiAgICAgICAgICAgIGNvbnN0IGh0bWwgPSBSZWFjdERPTVNlcnZlci5yZW5kZXJUb1N0cmluZyhcbiAgICAgICAgICAgICAgICA8UHJvdmlkZXIgc3RvcmU9e3N0b3JlfT5cbiAgICAgICAgICAgICAgICAgICAgPEpzc1Byb3ZpZGVyIHJlZ2lzdHJ5PXtzaGVldHNSZWdpc3RyeX0gZ2VuZXJhdGVDbGFzc05hbWU9e2dlbmVyYXRlQ2xhc3NOYW1lfT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxNdWlUaGVtZVByb3ZpZGVyIHRoZW1lPXt0aGVtZX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPFN0YXRpY1JvdXRlclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2NhdGlvbj17cmVxLnVybH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dD17Y29udGV4dH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxSb3V0ZXMgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L1N0YXRpY1JvdXRlcj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvTXVpVGhlbWVQcm92aWRlcj5cbiAgICAgICAgICAgICAgICAgICAgPC9Kc3NQcm92aWRlcj5cbiAgICAgICAgICAgICAgICA8L1Byb3ZpZGVyPlxuICAgICAgICAgICAgKVxuICAgICAgICAgICAgY29uc3QgY3NzID0gc2hlZXRzUmVnaXN0cnkudG9TdHJpbmcoKVxuXG4gICAgICAgICAgICByZXMucmVuZGVyKCcuL2luZGV4LnRlbXBsYXRlLmVqcycsIHtcbiAgICAgICAgICAgICAgICBodG1sLCBjc3MsIHN0b3JlRGF0YVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSlcblxuICAgIH1cblxufSk7XG5cblxuYXBwLnVzZShmdW5jdGlvbiAocmVxLCByZXMpIHtcbiAgICByZXMuc2VuZEZpbGUoJ2luZGV4Lmh0bWwnLCB7IHJvb3Q6ICcuL2Rpc3QvJyB9KVxufSlcblxuc2VydmVyLmxpc3RlbigzMDAwLCAoZXJyKSA9PiB7XG4gICAgaWYgKGVycikge1xuICAgICAgICByZXR1cm4gY29uc29sZS5lcnJvcihlcnIpO1xuICAgIH1cbiAgICBjb25zb2xlLmluZm8oJ1NlcnZlciBydW5uaW5nIG9uIGh0dHA6Ly9sb2NhbGhvc3Q6MzAwMCcpO1xufSk7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYXhpb3NcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZXhwcmVzc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJodHRwXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm1hdGVyaWFsLXVpLWljb25zL0FjY291bnRDaXJjbGVcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibWF0ZXJpYWwtdWktaWNvbnMvQXR0YWNoTW9uZXlcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibWF0ZXJpYWwtdWktaWNvbnMvQ2FsbFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJtYXRlcmlhbC11aS1pY29ucy9FeHBhbmRNb3JlXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm1hdGVyaWFsLXVpLWljb25zL0tleWJvYXJkQXJyb3dSaWdodFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJtYXRlcmlhbC11aS1pY29ucy9QYXltZW50XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm1hdGVyaWFsLXVpL0NoZWNrYm94XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm1hdGVyaWFsLXVpL0NoaXBcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibWF0ZXJpYWwtdWkvRXhwYW5zaW9uUGFuZWxcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibWF0ZXJpYWwtdWkvRm9ybVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJtYXRlcmlhbC11aS9NZW51XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm1hdGVyaWFsLXVpL1Byb2dyZXNzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm1hdGVyaWFsLXVpL1JhZGlvXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm1hdGVyaWFsLXVpL1N0ZXBwZXJcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibWF0ZXJpYWwtdWkvc3R5bGVzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInBhdGhcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmMtc2xpZGVyL2xpYi9SYW5nZVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdC1kb20vc2VydmVyXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0LWpzcy9saWIvSnNzUHJvdmlkZXJcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhY3QtanNzL2xpYi9qc3NcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhY3QtcmVkdXhcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhY3Qtcm91dGVyXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0LXJvdXRlci1kb21cIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhY3QtdHJhbnNpdGlvbi1ncm91cFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWR1eFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWR1eC1sb2dnZXJcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVkdXgtdGh1bmtcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidW5pdmVyc2FsLWNvb2tpZVwiKTsiXSwic291cmNlUm9vdCI6IiJ9