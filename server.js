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
	let specialization_ids = searchState.selectedCriterias.filter(x => x.type == 'speciality').reduce((finalStr, curr, i) => {
		if (i != 0) {
			finalStr += ',';
		}
		finalStr += `${curr.id}`;
		return finalStr;
	}, "");

	let sits_at = [];
	// if(filterCriteria.sits_at_clinic) sits_at.push('clinic');
	// if(filterCriteria.sits_at_hospital) sits_at.push('hospital');
	// if(sits_at.length == 0) sits_at = ['clinic','hospital'];
	sits_at = sits_at.join(',');

	let lat = 28.4595;
	let long = 77.0226;
	if (searchState.selectedLocation) {
		lat = searchState.selectedLocation.geometry.location.lat;
		long = searchState.selectedLocation.geometry.location.lng;
	}

	let min_fees = filterCriteria.priceRange[0];
	let max_fees = filterCriteria.priceRange[1];
	let sort_on = filterCriteria.sort_on || "";
	let is_available = filterCriteria.is_available;
	let is_female = filterCriteria.is_female;

	let url = `/api/v1/doctor/doctorsearch?specialization_ids=${specialization_ids}&sits_at=${sits_at}&latitude=${lat}&longitude=${long}&min_fees=${min_fees}&max_fees=${max_fees}&sort_on=${sort_on}&is_available=${is_available}&is_female=${is_female}`;

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
const MONTHS = ['Jan', 'Feb', 'Mar', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

class TimeSlotSelector extends _react2.default.Component {
    constructor(props) {
        super(props);
        this.state = {
            timeSeries: [],
            selectedMonth: "",
            selectedDay: ""
        };
    }

    componentDidMount() {
        this.generateDays();
    }

    generateDays() {
        let days = [];

        for (let i = 0; i < DAYS_TO_SHOW; i++) {
            let offsetDay = new Date();
            offsetDay.setDate(offsetDay.getDate() + i);
            let weekDay = offsetDay.getDay();

            days.push({
                tag: WEEK_DAYS[weekDay],
                dateNumber: offsetDay.getDate(),
                actualDate: offsetDay,
                month: MONTHS[offsetDay.getMonth()]
            });
        }

        this.setState({
            timeSeries: days,
            selectedDay: days[0],
            selectedMonth: days[0].month
        });
    }

    selectDay(day) {
        this.setState({ selectedDay: day });
    }

    selectMonth(month, e) {
        e.stopPropagation();
        this.setState({ selectedMonth: month });
    }

    render() {
        let selectedSchedule = { 0: [], 1: [], 2: [] };
        if (this.state.selectedDay && this.state.selectedDay.actualDate) {
            let weekDayNumber = this.state.selectedDay.actualDate.getDay();
            selectedSchedule = this.props.timeSlots[weekDayNumber].timing;
        }

        // let monthNum = (new Date).getMonth()
        let thisMonth = MONTHS[new Date().getMonth()];
        let nextMonth = MONTHS[new Date().getMonth() + 1];

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
                            'Select Date & Time:',
                            _react2.default.createElement(
                                'span',
                                { onClick: this.selectMonth.bind(this, thisMonth), className: "float-right text-md fw-700 text-" + (thisMonth === this.state.selectedMonth ? "primary" : "light") },
                                thisMonth,
                                _react2.default.createElement(
                                    'span',
                                    { onClick: this.selectMonth.bind(this, nextMonth), className: "text-" + (nextMonth === this.state.selectedMonth ? "primary" : "light") },
                                    nextMonth
                                )
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'choose-time' },
                            _react2.default.createElement(
                                'ul',
                                { className: 'inline-list datetime-items' },
                                this.state.timeSeries.filter(ts => {
                                    return ts.month === this.state.selectedMonth;
                                }).map((ts, i) => {
                                    return _react2.default.createElement(
                                        'li',
                                        {
                                            className: this.state.selectedDay == ts ? 'active' : "",
                                            key: i,
                                            onClick: this.selectDay.bind(this, ts)
                                        },
                                        ts.dateNumber,
                                        ' ',
                                        _react2.default.createElement(
                                            'span',
                                            null,
                                            ts.tag
                                        )
                                    );
                                })
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
                        selectedSchedule[0].map((time, i) => {
                            return _react2.default.createElement(
                                'li',
                                { key: i },
                                _react2.default.createElement(
                                    'a',
                                    { href: '', className: 'v-btn v-btn-primary btn-sm outline' },
                                    time[1],
                                    ' '
                                )
                            );
                        })
                    ),
                    _react2.default.createElement(
                        'h4',
                        { className: 'report-on mrb-10' },
                        'Afternoon'
                    ),
                    _react2.default.createElement(
                        'ul',
                        { className: 'inline-list time-items' },
                        selectedSchedule[1].map((time, i) => {
                            return _react2.default.createElement(
                                'li',
                                { key: i },
                                _react2.default.createElement(
                                    'a',
                                    { href: '', className: 'v-btn v-btn-primary btn-sm outline' },
                                    time[1],
                                    ' '
                                )
                            );
                        })
                    ),
                    _react2.default.createElement(
                        'h4',
                        { className: 'report-on mrb-10' },
                        'Evening'
                    ),
                    _react2.default.createElement(
                        'ul',
                        { className: 'inline-list time-items' },
                        selectedSchedule[2].map((time, i) => {
                            return _react2.default.createElement(
                                'li',
                                { key: i },
                                _react2.default.createElement(
                                    'a',
                                    { href: '', className: 'v-btn v-btn-primary btn-sm outline' },
                                    time[1],
                                    ' '
                                )
                            );
                        })
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

        let { name, qualifications, hospitals } = this.props.selectedDoctor;
        let hospitalName = "";

        if (hospitals && hospitals.length) {
            hospitals.map(hospital => {
                if (hospital.hospital_id == this.props.selectedClinic) {
                    hospitalName = hospital.hospital_name;
                }
            });
        }

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
                        name
                    ),
                    _react2.default.createElement(
                        "p",
                        { className: "desg" },
                        this.getQualificationStr(qualifications)
                    ),
                    _react2.default.createElement(
                        "h4",
                        { className: "dr-name clinic-name mrt-10 text-sm" },
                        hospitalName
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
                results = results || [];
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

    detectLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                var latlng = { lat: parseFloat(position.coords.latitude), lng: parseFloat(position.coords.longitude) };

                let geocoder = new google.maps.Geocoder();
                geocoder.geocode({ 'location': latlng }, (results, status) => {
                    if (results && results[0]) {
                        this.props.selectLocation(results[0]);
                        this.props.history.go(-1);
                    }
                });
            });
        } else {
            // geolocation is not supported
        }
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
                                    { className: 'detect-my-locaiton', onClick: this.detectLocation.bind(this) },
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2FjdGlvbnMvY29tbW9ucy9hdXRoLmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9hY3Rpb25zL2NvbW1vbnMvdXNlci5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvYWN0aW9ucy9kaWFnbm9zaXMvbGFiU2VhcmNoLmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9hY3Rpb25zL2RpYWdub3Npcy9zZWFyY2hDcml0ZXJpYS5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvYWN0aW9ucy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvYWN0aW9ucy9vcGQvZG9jdG9yU2VhcmNoLmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9hY3Rpb25zL29wZC9zZWFyY2hDcml0ZXJpYS5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvYXBpL2FwaS5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9jb21tb25zL0xvYWRlci9Mb2FkZXIuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvY29tbW9ucy9Mb2FkZXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvY29tbW9ucy9Vc2VyTG9naW4vVXNlckxvZ2luLmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL2NvbW1vbnMvVXNlckxvZ2luL2luZGV4LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL2NvbW1vbnMvY2hhdC9DaGF0Vmlldy5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9jb21tb25zL2NoYXQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvY29tbW9ucy9jb21tb25seVNlYXJjaGVkL0NvbW1vbmx5U2VhcmNoZWQuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvY29tbW9ucy9jb21tb25seVNlYXJjaGVkL2luZGV4LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL2NvbW1vbnMvY3JpdGVyaWFTZWFyY2gvQ3JpdGVyaWFTZWFyY2hWaWV3LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL2NvbW1vbnMvY3JpdGVyaWFTZWFyY2gvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvY29tbW9ucy9vdHBWZXJpZnkvT3RwVmVyaWZ5LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL2NvbW1vbnMvb3RwVmVyaWZ5L2luZGV4LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL2NvbW1vbnMvcHJvZmlsZVNsaWRlci9Qcm9maWxlU2xpZGVyLmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL2NvbW1vbnMvcHJvZmlsZVNsaWRlci9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9jb21tb25zL3RpbWVTbG90U2VsZWN0b3IvVGltZVNsb3RTZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9jb21tb25zL3RpbWVTbG90U2VsZWN0b3IvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvY29tbW9ucy91c2VyQXBwb2ludG1lbnRzL1VzZXJBcHBvaW50bWVudHNWaWV3LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL2NvbW1vbnMvdXNlckFwcG9pbnRtZW50cy9hcHBvaW50bWVudExpc3QvQXBwb2ludG1lbnRMaXN0LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL2NvbW1vbnMvdXNlckFwcG9pbnRtZW50cy9hcHBvaW50bWVudExpc3QvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvY29tbW9ucy91c2VyQXBwb2ludG1lbnRzL2luZGV4LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL2NvbW1vbnMvdXNlclByb2ZpbGUvVXNlclByb2ZpbGVWaWV3LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL2NvbW1vbnMvdXNlclByb2ZpbGUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvY29tbW9ucy91c2VyUHJvZmlsZS9wcm9maWxlRGF0YS9Qcm9maWxlRGF0YS5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9jb21tb25zL3VzZXJQcm9maWxlL3Byb2ZpbGVEYXRhL2luZGV4LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL2NvbW1vbnMvdXNlclJlcG9ydHMvVXNlclJlcG9ydHNWaWV3LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL2NvbW1vbnMvdXNlclJlcG9ydHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvY29tbW9ucy91c2VyUmVwb3J0cy9yZXBvcnRMaXN0L1JlcG9ydExpc3QuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvY29tbW9ucy91c2VyUmVwb3J0cy9yZXBvcnRMaXN0L2luZGV4LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL2NvbW1vbnMvdXNlclNpZ251cC9Vc2VyU2lnbnVwLmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL2NvbW1vbnMvdXNlclNpZ251cC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9kaWFnbm9zaXMvYm9va2luZ1N1bW1hcnkvQm9va2luZ1N1bW1hcnlWaWV3LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL2RpYWdub3Npcy9ib29raW5nU3VtbWFyeS9jaG9vc2VQYXRpZW50LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL2RpYWdub3Npcy9ib29raW5nU3VtbWFyeS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9kaWFnbm9zaXMvYm9va2luZ1N1bW1hcnkvcGlja3VwQWRkcmVzcy5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9kaWFnbm9zaXMvYm9va2luZ1N1bW1hcnkvdmlzaXRUaW1lLmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL2RpYWdub3Npcy9jb21tb25zL2xhYkRldGFpbHMvTGFiRGV0YWlsLmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL2RpYWdub3Npcy9jb21tb25zL2xhYkRldGFpbHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvZGlhZ25vc2lzL2NvbW1vbnMvbGFiUHJvZmlsZUNhcmQvTGFiUHJvZmlsZUNhcmQuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvZGlhZ25vc2lzL2NvbW1vbnMvbGFiUHJvZmlsZUNhcmQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvZGlhZ25vc2lzL2NvbW1vbnMvbGFiVGVzdHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvZGlhZ25vc2lzL2NvbW1vbnMvbGFiVGVzdHMvbGFiVGVzdHMuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvZGlhZ25vc2lzL2NvbW1vbnMvb3JkZXJEZXRhaWxzL09yZGVyRGV0YWlscy5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9kaWFnbm9zaXMvY29tbW9ucy9vcmRlckRldGFpbHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvZGlhZ25vc2lzL2xhYi9MYWJWaWV3LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL2RpYWdub3Npcy9sYWIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvZGlhZ25vc2lzL3BhdGllbnREZXRhaWxzL1BhdGllbnREZXRhaWxzVmlldy5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9kaWFnbm9zaXMvcGF0aWVudERldGFpbHMvYWRkcmVzc0Zvcm0vQWRkcmVzc0Zvcm0uanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvZGlhZ25vc2lzL3BhdGllbnREZXRhaWxzL2FkZHJlc3NGb3JtL2luZGV4LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL2RpYWdub3Npcy9wYXRpZW50RGV0YWlscy9kZXRhaWxzRm9ybS9EZXRhaWxzRm9ybS5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9kaWFnbm9zaXMvcGF0aWVudERldGFpbHMvZGV0YWlsc0Zvcm0vaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvZGlhZ25vc2lzL3BhdGllbnREZXRhaWxzL2luZGV4LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL2RpYWdub3Npcy9zZWFyY2hDcml0ZXJpYS9TZWFyY2hDcml0ZXJpYVZpZXcuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvZGlhZ25vc2lzL3NlYXJjaENyaXRlcmlhL2luZGV4LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL2RpYWdub3Npcy9zZWFyY2hSZXN1bHRzL1NlYXJjaFJlc3VsdHNWaWV3LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL2RpYWdub3Npcy9zZWFyY2hSZXN1bHRzL2luZGV4LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL2RpYWdub3Npcy9zZWFyY2hSZXN1bHRzL2xhYnNMaXN0L0xhYnNMaXN0LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL2RpYWdub3Npcy9zZWFyY2hSZXN1bHRzL2xhYnNMaXN0L2luZGV4LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL2RpYWdub3Npcy9zZWFyY2hSZXN1bHRzL3RvcEJhci9Ub3BCYXIuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvZGlhZ25vc2lzL3NlYXJjaFJlc3VsdHMvdG9wQmFyL2luZGV4LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL2RpYWdub3Npcy90ZXN0U2VsZWN0b3IvVGVzdFNlbGVjdG9yLmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL2RpYWdub3Npcy90ZXN0U2VsZWN0b3IvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvb3BkL2FwcG9pbnRtZW50U2xvdC9BcHBvaW50bWVudFNsb3QuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvb3BkL2FwcG9pbnRtZW50U2xvdC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9vcGQvYm9va2luZy9Cb29raW5nVmlldy5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9vcGQvY2xpbmljTGlzdC9DbGluaWNMaXN0Vmlldy5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9vcGQvY2xpbmljTGlzdC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9vcGQvY29tbW9ucy9jbGluaWNTZWxlY3Rvci9DbGluaWNTZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9vcGQvY29tbW9ucy9jbGluaWNTZWxlY3Rvci9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9vcGQvY29tbW9ucy9kb2N0b3JQcm9maWxlQ2FyZC9Eb2N0b3JQcm9maWxlQ2FyZC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9vcGQvY29tbW9ucy9kb2N0b3JQcm9maWxlQ2FyZC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9vcGQvY29tbW9ucy9zZWxlY3RlZENsaW5pYy9TZWxlY3RlZENsaW5pYy5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9vcGQvY29tbW9ucy9zZWxlY3RlZENsaW5pYy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9vcGQvY3JpdGVyaWFTZWFyY2gvQ3JpdGVyaWFTZWFyY2hWaWV3LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL29wZC9jcml0ZXJpYVNlYXJjaC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9vcGQvZG9jdG9yUHJvZmlsZS9Eb2N0b3JQcm9maWxlVmlldy5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9vcGQvZG9jdG9yUHJvZmlsZS9hYm91dERvY3Rvci9BYm91dERvY3Rvci5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9vcGQvZG9jdG9yUHJvZmlsZS9hYm91dERvY3Rvci9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9vcGQvZG9jdG9yUHJvZmlsZS9kb2N0b3JQcm9maWxlQ2FyZC9Eb2N0b3JQcm9maWxlQ2FyZC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9vcGQvZG9jdG9yUHJvZmlsZS9kb2N0b3JQcm9maWxlQ2FyZC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9vcGQvZG9jdG9yUHJvZmlsZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9vcGQvZG9jdG9yUHJvZmlsZS9wcm9mZXNzaW9uYWxHcmFwaC9Qcm9mZXNzaW9uYWxHcmFwaC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9vcGQvZG9jdG9yUHJvZmlsZS9wcm9mZXNzaW9uYWxHcmFwaC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9vcGQvbG9jYXRpb25TZWFyY2gvTG9jYXRpb25TZWFyY2guanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvb3BkL2xvY2F0aW9uU2VhcmNoL2luZGV4LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL29wZC9wYXRpZW50RGV0YWlscy9QYXRpZW50RGV0YWlscy5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9vcGQvcGF0aWVudERldGFpbHMvZGV0YWlsc0Zvcm0vRGV0YWlsc0Zvcm0uanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvb3BkL3BhdGllbnREZXRhaWxzL2RldGFpbHNGb3JtL2luZGV4LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL29wZC9wYXRpZW50RGV0YWlscy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9vcGQvcGF5bWVudC9QYXltZW50Vmlldy5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9vcGQvc2VhcmNoQ3JpdGVyaWEvU2VhcmNoQ3JpdGVyaWFWaWV3LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL29wZC9zZWFyY2hDcml0ZXJpYS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9vcGQvc2VhcmNoUmVzdWx0cy9TZWFyY2hSZXN1bHRzVmlldy5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9vcGQvc2VhcmNoUmVzdWx0cy9kb2N0b3JzTGlzdC9Eb2N0b3JzTGlzdC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9vcGQvc2VhcmNoUmVzdWx0cy9kb2N0b3JzTGlzdC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9vcGQvc2VhcmNoUmVzdWx0cy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9vcGQvc2VhcmNoUmVzdWx0cy90b3BCYXIvVG9wQmFyLmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL29wZC9zZWFyY2hSZXN1bHRzL3RvcEJhci9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9vcGQvc2VhcmNoUmVzdWx0c0ZpbHRlci9TZWFyY2hSZXN1bHRzRmlsdGVyLmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL29wZC9zZWFyY2hSZXN1bHRzRmlsdGVyL2luZGV4LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb25zdGFudHMvdHlwZXMuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbnRhaW5lcnMvY29tbW9ucy9DaGF0LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb250YWluZXJzL2NvbW1vbnMvT3RwVmVyaWZ5LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb250YWluZXJzL2NvbW1vbnMvVXNlckFwcG9pbnRtZW50cy5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29udGFpbmVycy9jb21tb25zL1VzZXJMb2dpbi5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29udGFpbmVycy9jb21tb25zL1VzZXJQcm9maWxlLmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb250YWluZXJzL2NvbW1vbnMvVXNlclJlcG9ydHMuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbnRhaW5lcnMvY29tbW9ucy9Vc2VyU2lnbnVwLmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb250YWluZXJzL2RpYWdub3Npcy9Cb29raW5nU3VtbWFyeS5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29udGFpbmVycy9kaWFnbm9zaXMvTGFiLmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb250YWluZXJzL2RpYWdub3Npcy9QYXRpZW50RGV0YWlscy5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29udGFpbmVycy9kaWFnbm9zaXMvU2VhcmNoQ3JpdGVyaWEuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbnRhaW5lcnMvZGlhZ25vc2lzL1NlYXJjaFJlc3VsdHMuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbnRhaW5lcnMvZGlhZ25vc2lzL1Rlc3RTZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29udGFpbmVycy9vcGQvQXBwb2ludG1lbnRTbG90LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb250YWluZXJzL29wZC9Cb29raW5nLmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb250YWluZXJzL29wZC9DbGluaWNMaXN0LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb250YWluZXJzL29wZC9Dcml0ZXJpYVNlYXJjaC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29udGFpbmVycy9vcGQvRG9jdG9yUHJvZmlsZS5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29udGFpbmVycy9vcGQvTG9jYXRpb25TZWFyY2guanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbnRhaW5lcnMvb3BkL1BhdGllbnREZXRhaWxzLmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb250YWluZXJzL29wZC9QYXltZW50LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb250YWluZXJzL29wZC9TZWFyY2hDcml0ZXJpYS5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29udGFpbmVycy9vcGQvU2VhcmNoUmVzdWx0cy5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29udGFpbmVycy9vcGQvU2VhcmNoUmVzdWx0c0ZpbHRlci5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvaGVscGVycy9uYXZpZ2F0ZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvaGVscGVycy9uYXZpZ2F0ZS9uYXZpZ2F0ZS5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvaGVscGVycy9zdG9yYWdlL2luZGV4LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9oZWxwZXJzL3N0b3JhZ2Uvc3RvcmFnZS5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvcmVkdWNlcnMvY29tbW9ucy9hdXRoLmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9yZWR1Y2Vycy9jb21tb25zL3VzZXIuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL3JlZHVjZXJzL2RpYWdub3Npcy9sYWJzLmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9yZWR1Y2Vycy9kaWFnbm9zaXMvbGFic1NlYXJjaC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvcmVkdWNlcnMvZGlhZ25vc2lzL3NlYXJjaENyaXRlcmlhLmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9yZWR1Y2Vycy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvcmVkdWNlcnMvb3BkL2RvY3RvclNlYXJjaC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvcmVkdWNlcnMvb3BkL2RvY3RvcnMuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL3JlZHVjZXJzL29wZC9zZWFyY2hDcml0ZXJpYS5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvcm91dGVzLmpzIiwid2VicGFjazovLy8uL2Rldi9qcy91dGlscy9kYXRlVGltZVV0aWxzLmpzIiwid2VicGFjazovLy8uL2luZGV4LmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcImF4aW9zXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZXhwcmVzc1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcImh0dHBcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJtYXRlcmlhbC11aS1pY29ucy9BY2NvdW50Q2lyY2xlXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibWF0ZXJpYWwtdWktaWNvbnMvQXR0YWNoTW9uZXlcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJtYXRlcmlhbC11aS1pY29ucy9DYWxsXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibWF0ZXJpYWwtdWktaWNvbnMvRXhwYW5kTW9yZVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIm1hdGVyaWFsLXVpLWljb25zL0tleWJvYXJkQXJyb3dSaWdodFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIm1hdGVyaWFsLXVpLWljb25zL1BheW1lbnRcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJtYXRlcmlhbC11aS9DaGVja2JveFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIm1hdGVyaWFsLXVpL0NoaXBcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJtYXRlcmlhbC11aS9FeHBhbnNpb25QYW5lbFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIm1hdGVyaWFsLXVpL0Zvcm1cIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJtYXRlcmlhbC11aS9NZW51XCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibWF0ZXJpYWwtdWkvUHJvZ3Jlc3NcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJtYXRlcmlhbC11aS9SYWRpb1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcIm1hdGVyaWFsLXVpL1N0ZXBwZXJcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJtYXRlcmlhbC11aS9zdHlsZXNcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJwYXRoXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmMtc2xpZGVyL2xpYi9SYW5nZVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInJlYWN0XCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVhY3QtZG9tL3NlcnZlclwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInJlYWN0LWpzcy9saWIvSnNzUHJvdmlkZXJcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWFjdC1qc3MvbGliL2pzc1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcInJlYWN0LXJlZHV4XCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVhY3Qtcm91dGVyXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVhY3Qtcm91dGVyLWRvbVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInJlYWN0LXRyYW5zaXRpb24tZ3JvdXBcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWR1eFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInJlZHV4LWxvZ2dlclwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInJlZHV4LXRodW5rXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwidW5pdmVyc2FsLWNvb2tpZVwiIl0sIm5hbWVzIjpbInNlbmRPVFAiLCJudW1iZXIiLCJjYiIsImRpc3BhdGNoIiwidHlwZSIsInBheWxvYWQiLCJwaG9uZU51bWJlciIsInRoZW4iLCJyZXNwb25zZSIsImV4aXN0cyIsImNhdGNoIiwiZXJyb3IiLCJtZXNzYWdlIiwiZXJyb3JfbWVzc2FnZSIsInN1Ym1pdE9UUCIsIm90cCIsInNldEF1dGhUb2tlbiIsInRva2VuIiwiZ2V0VXNlclByb2ZpbGUiLCJwcm9maWxlcyIsImdldFVzZXJQcm9maWxlV2l0aEFwcG9pbnRtZW50cyIsImdldFVzZXJQcm9maWxlV2l0aFRlc3RzIiwiZ2V0TGFicyIsInNlYXJjaFN0YXRlIiwiZmlsdGVyQ3JpdGVyaWEiLCJtZXJnZVN0YXRlIiwidGVzdElkcyIsInNlbGVjdGVkQ3JpdGVyaWFzIiwiZmlsdGVyIiwieCIsInJlZHVjZSIsImZpbmFsU3RyIiwiY3VyciIsImkiLCJpZCIsImxhdCIsImxvbmciLCJzZWxlY3RlZExvY2F0aW9uIiwiZ2VvbWV0cnkiLCJsb2NhdGlvbiIsImxuZyIsIm1pbl9kaXN0YW5jZSIsImRpc3RhbmNlUmFuZ2UiLCJtYXhfZGlzdGFuY2UiLCJtaW5fcHJpY2UiLCJwcmljZVJhbmdlIiwibWF4X3ByaWNlIiwib3JkZXJfYnkiLCJzb3J0QnkiLCJ1cmwiLCJnZXRMYWJCeUlkIiwibGFiSWQiLCJnZXRMYWJUaW1lU2xvdHMiLCJjYWxsYmFjayIsImdldExhYkJvb2tpbmdTdW1tYXJ5IiwiYm9va2luZ0lkIiwibG9hZExhYkNvbW1vbkNyaXRlcmlhcyIsInRvZ2dsZURpYWdub3Npc0NyaXRlcmlhIiwiY3JpdGVyaWEiLCJnZXREaWFnbm9zaXNDcml0ZXJpYVJlc3VsdHMiLCJzZWFyY2hTdHJpbmciLCJTRUFSQ0hfQ1JJVEVSSUFfT1BEIiwiU0VBUkNIX0NSSVRFUklBX0xBQlMiLCJET0NUT1JTX0FDVElPTlMiLCJMQUJTX0FDVElPTlMiLCJVU0VSX0FDVElPTlMiLCJBVVRIX0FDVElPTlMiLCJtb2R1bGUiLCJleHBvcnRzIiwiT2JqZWN0IiwiYXNzaWduIiwiZ2V0RG9jdG9ycyIsInNwZWNpYWxpemF0aW9uX2lkcyIsInNpdHNfYXQiLCJqb2luIiwibWluX2ZlZXMiLCJtYXhfZmVlcyIsInNvcnRfb24iLCJpc19hdmFpbGFibGUiLCJpc19mZW1hbGUiLCJnZXREb2N0b3JCeUlkIiwiZG9jdG9ySWQiLCJnZXRUaW1lU2xvdHMiLCJjbGluaWNJZCIsImxvYWRPUERDb21tb25Dcml0ZXJpYSIsInRvZ2dsZU9QRENyaXRlcmlhIiwic2VsZWN0TG9jYXRpb24iLCJnZXRPUERDcml0ZXJpYVJlc3VsdHMiLCJheGlvc0luc3RhbmNlIiwiY3JlYXRlIiwiYmFzZVVSTCIsImhlYWRlciIsInJlamVjdEhhbmRsZXIiLCJjb25zb2xlIiwibG9nIiwiQVBJX0dFVCIsImdldEF1dGhUb2tlbiIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwibWV0aG9kIiwicmVzIiwiZGF0YSIsIkFQSV9QT1NUIiwiaGVhZGVycyIsIkFQSV9QVVQiLCJBUElfREVMRVRFIiwiTG9hZGVyIiwiQ29tcG9uZW50IiwiY29uc3RydWN0b3IiLCJwcm9wcyIsInJlbmRlciIsIlVzZXJMb2dpblZpZXciLCJzdGF0ZSIsInZhbGlkYXRpb25FcnJvciIsImlucHV0SGFuZGxlciIsImUiLCJzZXRTdGF0ZSIsInRhcmdldCIsIm5hbWUiLCJ2YWx1ZSIsInN1Ym1pdE9UUFJlcXVlc3QiLCJtYXRjaCIsImhpc3RvcnkiLCJyZXBsYWNlIiwiYmluZCIsIm90cF9yZXF1ZXN0X3NlbnQiLCJJZnJhbVN0eWxlIiwid2lkdGgiLCJoZWlnaHQiLCJDaGF0VmlldyIsImNvbnRleHRUeXBlcyIsInJvdXRlciIsIkNvbW1vbmx5U2VhcmNoZWQiLCJyb3dzIiwibWFwIiwicm93Iiwic2VsZWN0ZWQiLCJ0b2dnbGUiLCJkaXZDbGFzcyIsInVsQ2xhc3MiLCJoZWFkaW5nIiwiZGVib3VuY2VyIiwiZm4iLCJkZWxheSIsInRpbWVyIiwiY2xlYXJUaW1lb3V0Iiwic2V0VGltZW91dCIsImNhbGwiLCJDcml0ZXJpYVNlYXJjaFZpZXciLCJzZWFyY2hWYWx1ZSIsInNlYXJjaFJlc3VsdHMiLCJjb21wb25lbnREaWRNb3VudCIsImdldFNlYXJjaFJlc3VsdHMiLCJpbnB1dCIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJ0ZXN0cyIsImFkZENyaXRlcmlhIiwiZm9ybWF0dGVkX2FkZHJlc3MiLCJzbGljZSIsImdvIiwicHVzaCIsInRpdGxlIiwiY2hlY2tGb3JMb2FkIiwiY2hpbGRyZW4iLCJPdHBWZXJpZnlWaWV3IiwiUHJvZmlsZVNsaWRlciIsInN3aXRjaFVzZXIiLCJwcm9maWxlSWQiLCJjb250ZXh0Iiwic3ViUm91dGUiLCJrZXlzIiwic3JjIiwicHJvZmlsZUltYWdlIiwiREFZU19UT19TSE9XIiwiV0VFS19EQVlTIiwiTU9OVEhTIiwiVGltZVNsb3RTZWxlY3RvciIsInRpbWVTZXJpZXMiLCJzZWxlY3RlZE1vbnRoIiwic2VsZWN0ZWREYXkiLCJnZW5lcmF0ZURheXMiLCJkYXlzIiwib2Zmc2V0RGF5IiwiRGF0ZSIsInNldERhdGUiLCJnZXREYXRlIiwid2Vla0RheSIsImdldERheSIsInRhZyIsImRhdGVOdW1iZXIiLCJhY3R1YWxEYXRlIiwibW9udGgiLCJnZXRNb250aCIsInNlbGVjdERheSIsImRheSIsInNlbGVjdE1vbnRoIiwic3RvcFByb3BhZ2F0aW9uIiwic2VsZWN0ZWRTY2hlZHVsZSIsIndlZWtEYXlOdW1iZXIiLCJ0aW1lU2xvdHMiLCJ0aW1pbmciLCJ0aGlzTW9udGgiLCJuZXh0TW9udGgiLCJ0cyIsInRpbWUiLCJVc2VyQXBwb2ludG1lbnRzVmlldyIsImNvbXBhcmVEYXRlV2l0aFRvZGF5IiwiZGF0ZSIsInRvZGF5IiwiZ2V0VGltZSIsInNlbGVjdGVkVXNlciIsInVzZXJQcm9maWxlSWQiLCJwYXJhbXMiLCJVU0VSIiwiaXNEZWZhdWx0VXNlciIsImFwcG9pbnRtZW50cyIsImFwcG9pbnRtZW50Iiwic2xvdCIsInN0YXJ0IiwiaW5kZXgiLCJBcHBvaW50bWVudExpc3QiLCJ1bml4X3RpbWVzdGFtcCIsImhvdXJzIiwiZ2V0SG91cnMiLCJtaW51dGVzIiwiZ2V0TWludXRlcyIsInN1YnN0ciIsImRvY3Rvck5hbWUiLCJlbmQiLCJ0b0RhdGVTdHJpbmciLCJVc2VyUHJvZmlsZVZpZXciLCJQcm9maWxlRGF0YSIsIm9wZW5BcHBvaW50bWVudHMiLCJvcGVuUmVwb3J0cyIsImdlbmRlciIsImFnZSIsIm1vYmlsZSIsIm1lZGljYWxIaXN0b3J5Q291bnQiLCJtZWRpY2FsVGVzdENvdW50Iiwib25saW5lQ29uc3VsdGF0aW9uQ291bnQiLCJvcGRWaXNpdENvdW50IiwicHJvZmlsZURhdGEiLCJVc2VyUmVwb3J0c1ZpZXciLCJ0ZXN0IiwiUmVwb3J0TGlzdCIsInN1Yl9uYW1lIiwiYWJicmV2aWF0aW9uIiwiY2F0ZWdvcnkiLCJVc2VyU2lnbnVwVmlldyIsImFwcG9pbm1lbnRGb3IiLCJwYXRpZW50TmFtZSIsImVtYWlsIiwic3VibWl0Rm9ybSIsIkJvb2tpbmdTdW1tYXJ5VmlldyIsInNlbGVjdGVkTGFiIiwicGlja3VwVHlwZSIsIm9wZW5UZXN0cyIsImhhbmRsZVBpY2t1cFR5cGUiLCJnZXRTZWxlY3RvcnMiLCJmaW5hbFByaWNlIiwibGFiRGV0YWlsIiwiTEFCUyIsImxhYiIsInByaWNlIiwidHdwIiwidGVzdF9pZCIsIm1ycCIsImFkZHJlc3MiLCJDaG9vc2VQYXRpZW50IiwiUGlja3VwQWRkcmVzcyIsIlZpc2l0VGltZSIsIkxhYkRldGFpbHMiLCJMYWJQcm9maWxlQ2FyZCIsIm9wZW5MYWIiLCJkZXRhaWxzIiwiTGFiVGVzdHMiLCJsZW5ndGgiLCJPcmRlckRldGFpbHMiLCJwcmljZV9icmVha3VwIiwidG90YWxQcmljZSIsInRvdGFsVGVzdHMiLCJicmVha3VwIiwiYW1vdW50IiwiTGFiVmlldyIsImJvb2tMYWIiLCJQYXRpZW50RGV0YWlsc1ZpZXciLCJzZWxlY3RlZFRlc3RzIiwic2VsZWN0ZWRTbG90Iiwic2VsZWN0ZWRTbG90U3RhcnQiLCJzZWxlY3RlZFNsb3RFbmQiLCJnZXRMb2NhdGlvblBhcmFtIiwicGFyYW1TdHJpbmciLCJzZWFyY2giLCJVUkxTZWFyY2hQYXJhbXMiLCJnZXQiLCJwcm9jZWVkIiwicGFyc2VGbG9hdCIsInRvU3RyaW5nIiwiQWRkcmVzc0Zvcm0iLCJsb2NhbGl0eSIsImxhbmRtYXJrIiwicGluY29kZSIsImNpdHkiLCJ3aGljaCIsIkRldGFpbHNGb3JtIiwicGF0aWVudEVtYWlsIiwicGF0aWVudEdlbmRlciIsInBhdGllbnRNb2JpbGUiLCJTZWFyY2hDcml0ZXJpYVZpZXciLCJzZWFyY2hQcm9jZWVkIiwic2VhcmNoRGF0YSIsImVuY29kZVVSSUNvbXBvbmVudCIsIkpTT04iLCJzdHJpbmdpZnkiLCJmaWx0ZXJEYXRhIiwiTE9BREVEX1NFQVJDSF9DUklURVJJQV9MQUIiLCJjb21tb25fdGVzdHMiLCJjb21tb25fY29uZGl0aW9ucyIsInByZWZlcnJlZF9sYWJzIiwiU2VhcmNoUmVzdWx0c1ZpZXciLCJwYXJzZSIsImdldExhYkxpc3QiLCJhcHBseUZpbHRlcnMiLCJmaWx0ZXJTdGF0ZSIsIkxPQURFRF9MQUJTX1NFQVJDSCIsIkxhYnNMaXN0IiwibGFiTGlzdCIsIlRvcEJhciIsImFuY2hvckVsIiwib3BlbkZpbHRlciIsImNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMiLCJoYW5kbGVPcGVuIiwiZXZlbnQiLCJjdXJyZW50VGFyZ2V0IiwiaGFuZGxlQ2xvc2UiLCJ0b2dnbGVGaWx0ZXIiLCJoYW5kbGVSYW5nZSIsInJhbmdlIiwiZ2V0Q3JpdGVyaWFTdHJpbmciLCJmaW5hbCIsImNyaXRlcmlhU3RyIiwiQm9vbGVhbiIsInByZXZlbnREZWZhdWx0IiwiVGVzdFNlbGVjdG9yVmlldyIsInRvZ2dsZVRlc3QiLCJsYWJEYXRhIiwiaW5kZXhPZiIsIkFwcG9pbnRtZW50U2xvdCIsInNlbGVjdGVkRG9jdG9yIiwic2VsZWN0ZWRDbGluaWMiLCJzZWxlY3RUaW1lU2xvdCIsIkRPQ1RPUlMiLCJCb29raW5nVmlldyIsIkNsaW5pY0xpc3RWaWV3IiwiQ2xpbmljU2VsZWN0b3IiLCJzZWxlY3RDbGluaWMiLCJob3NwaXRhbHMiLCJob3NwaXRhbCIsImhvc3BpdGFsX25hbWUiLCJmZWVzIiwidGltaW5ncyIsInRpbWluZ0tleSIsImtleSIsImhvc3BpdGFsX2lkIiwiRG9jdG9yUHJvZmlsZUNhcmQiLCJjYXJkQ2xpY2siLCJib29rTm93IiwiZ2V0UXVhbGlmaWNhdGlvblN0ciIsInF1YWxpZmljYXRpb25TcGVjaWFsaXphdGlvbiIsInN0ciIsInF1YWxpZmljYXRpb24iLCJzcGVjaWFsaXphdGlvbiIsImV4cGVyaWVuY2VfeWVhcnMiLCJob3NwaXRhbF9jb3VudCIsInF1YWxpZmljYXRpb25zIiwiZGlzY291bnRlZF9mZWVzIiwiU2VsZWN0ZWRDbGluaWMiLCJob3NwaXRhbE5hbWUiLCJmb2N1cyIsImdldENyaXRlcmlhUmVzdWx0cyIsInJlc3VsdCIsInRvZ2dsZUNyaXRlcmlhIiwiZ29CYWNrIiwicmVzdWx0RGF0YSIsImoiLCJEb2N0b3JQcm9maWxlVmlldyIsIkFib3V0RG9jdG9yIiwibGVzc0Fib3V0IiwicmVhZE1vcmUiLCJhYm91dCIsIlByb2Zlc3Npb25hbEdyYXBoIiwiTG9jYXRpb25TZWFyY2giLCJnZXRMb2NhdGlvbiIsImF1dG8iLCJnb29nbGUiLCJtYXBzIiwicGxhY2VzIiwiQXV0b2NvbXBsZXRlU2VydmljZSIsInJlcXVlc3QiLCJ0eXBlcyIsImNvbXBvbmVudFJlc3RyaWN0aW9ucyIsImNvdW50cnkiLCJnZXRQbGFjZVByZWRpY3Rpb25zIiwicmVzdWx0cyIsInN0YXR1cyIsIk1hcCIsImNlbnRlciIsInpvb20iLCJzZXJ2aWNlIiwiUGxhY2VzU2VydmljZSIsImdldERldGFpbHMiLCJyZWZlcmVuY2UiLCJwbGFjZSIsImRldGVjdExvY2F0aW9uIiwibmF2aWdhdG9yIiwiZ2VvbG9jYXRpb24iLCJnZXRDdXJyZW50UG9zaXRpb24iLCJwb3NpdGlvbiIsImxhdGxuZyIsImNvb3JkcyIsImxhdGl0dWRlIiwibG9uZ2l0dWRlIiwiZ2VvY29kZXIiLCJHZW9jb2RlciIsImdlb2NvZGUiLCJkZXNjcmlwdGlvbiIsImRpc3BsYXkiLCJQYXRpZW50RGV0YWlscyIsIlBheW1lbnRWaWV3IiwiTE9BREVEX1NFQVJDSF9DUklURVJJQV9PUEQiLCJjb25kaXRpb25zIiwic3BlY2lhbGl6YXRpb25zIiwiZ2V0RGNvdG9ycyIsImdldERvY3Rvckxpc3QiLCJMT0FERURfRE9DVE9SX1NFQVJDSCIsIkRvY3RvcnNMaXN0IiwiZG9jdG9yTGlzdCIsImRvY0lkIiwic2l0c19hdF9jbGluaWMiLCJzaXRzX2F0X2hvc3BpdGFsIiwiaGFuZGxlSW5wdXQiLCJldk5hbWUiLCJjaGVja2VkIiwiU2VhcmNoUmVzdWx0c0ZpbHRlciIsImZlZV8wIiwiZmVlXzEiLCJmZWVfMiIsImZlZV8zIiwiY2xpbmljX3BlcnNvbmFsIiwiY2xpbmljX2hvc3BpdGFsIiwiY2xpbmljX211bHRpIiwiYXZhaWxhYmxlX3RvZGF5IiwiZGlzdGFuY2UiLCJhcHBseUZpbHRlciIsInNldE9QREZpbHRlcnMiLCJoYW5kbGVDaGVja2JveCIsImhhbmRsZUNoYW5nZVJhZGlvIiwiU0VORF9PVFBfUkVRVUVTVCIsIlNFTkRfT1RQX1NVQ0NFU1MiLCJTRU5EX09UUF9GQUlMIiwiU1VCTUlUX09UUF9SRVFVRVNUIiwiU1VCTUlUX09UUF9TVUNDRVNTIiwiU1VCTUlUX09UUF9GQUlMIiwiQVBQRU5EX0RPQ1RPUlMiLCJET0NUT1JfU0VBUkNIIiwiRE9DVE9SX1NFQVJDSF9TVEFSVCIsIlNFTEVDVF9MT0NBVElPTl9PUEQiLCJNRVJHRV9TRUFSQ0hfU1RBVEVfT1BEIiwiVE9HR0xFX09QRF9DUklURVJJQSIsIlNFVF9PUERfRklMVEVSUyIsIkxPQURfU0VBUkNIX0NSSVRFUklBX09QRCIsIlRPR0dMRV9ESUFHTk9TSVNfQ1JJVEVSSUEiLCJNRVJHRV9TRUFSQ0hfU1RBVEVfTEFCIiwiTE9BRF9TRUFSQ0hfQ1JJVEVSSUFfTEFCIiwiQVBQRU5EX0xBQlMiLCJMQUJfU0VBUkNIIiwiU0VMRUNUX0xPQ0FUSU9OX0RJQUdOT1NJUyIsIkFQUEVORF9GSUxURVJTX0RJQUdOT1NJUyIsIkxBQl9TRUFSQ0hfU1RBUlQiLCJBUFBFTkRfVVNFUl9QUk9GSUxFUyIsIkNoYXQiLCJtYXBTdGF0ZVRvUHJvcHMiLCJtYXBEaXNwYXRjaFRvUHJvcHMiLCJPdHBWZXJpZnkiLCJzdWNjZXNzX21lc3NhZ2UiLCJzdWJtaXRfb3RwIiwic3VibWl0X290cF9zdWNjZXNzIiwic3VibWl0X290cF9mYWlsIiwiQVVUSCIsIlVzZXJBcHBvaW50bWVudHMiLCJVc2VyTG9naW4iLCJvdHBfcmVxdWVzdF9zdWNjZXNzIiwib3RwX3JlcXVlc3RfZmFpbCIsIlVzZXJQcm9maWxlIiwiVXNlclJlcG9ydHMiLCJVc2VyU2lnbnVwIiwiQm9va2luZ1N1bW1hcnkiLCJMYWIiLCJsb2FkRGF0YSIsInN0b3JlIiwiU2VhcmNoQ3JpdGVyaWEiLCJTZWFyY2hSZXN1bHRzIiwiVGVzdFNlbGVjdG9yIiwiQm9va2luZyIsIkNsaW5pY0xpc3QiLCJDcml0ZXJpYVNlYXJjaCIsIkRvY3RvclByb2ZpbGUiLCJQYXltZW50IiwiTkFWSUdBVEUiLCJuYXZpZ2F0ZVRvIiwid2hlcmUiLCJ3aW5kb3ciLCJocmVmIiwicmVmcmVzaEFwcG9pbnRtZW50U3RhdGUiLCJub0FwcG9pbnRtZW50Rm91bmQiLCJ1cGNvbWluZyIsInByZXZpb3VzIiwiYWN0aW9uIiwiY29va2llcyIsIlNUT1JBR0UiLCJzZXQiLCJjaGVja0F1dGgiLCJkZWxldGVBdXRoIiwicmVtb3ZlIiwiZGVmYXVsdFN0YXRlIiwibmV3U3RhdGUiLCJwcm9maWxlTWFwIiwicHJvZmlsZSIsImxhcE1hcCIsImNvbmNhdCIsImZvdW5kIiwiYWxsUmVkdWNlcnMiLCJkb2MiLCJkb2N0b3JNYXAiLCJkb2N0b3IiLCJyb3V0ZXMiLCJwYXRoIiwiZXhhY3QiLCJjb21wb25lbnQiLCJSb3V0ZXJDb25maWciLCJwYXRobmFtZSIsImVudGVyIiwiZXhpdCIsInJvdXRlIiwiUk9VVEVTIiwidGltZVN0YW1wIiwiZ2V0RGF5TmFtZSIsInByb2Nlc3MiLCJlbnYiLCJOT0RFX1RMU19SRUpFQ1RfVU5BVVRIT1JJWkVEIiwicmVxdWlyZSIsImh0dHAiLCJFeHByZXNzIiwiYXBwIiwic2VydmVyIiwiU2VydmVyIiwidXNlIiwic3RhdGljIiwiX19kaXJuYW1lIiwicmVxIiwic2hlZXRzUmVnaXN0cnkiLCJ0aGVtZSIsInBhbGV0dGUiLCJwcmltYXJ5IiwibWFpbiIsInNlY29uZGFyeSIsImRhbmdlciIsImdlbmVyYXRlQ2xhc3NOYW1lIiwid3JpdGVIZWFkIiwiTG9jYXRpb24iLCJwcm9taXNlcyIsInNvbWUiLCJhbGwiLCJzdG9yZURhdGEiLCJnZXRTdGF0ZSIsImh0bWwiLCJyZW5kZXJUb1N0cmluZyIsImNzcyIsInNlbmRGaWxlIiwicm9vdCIsImxpc3RlbiIsImVyciIsImluZm8iXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFD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Ozs7OztBQ0FBLGlEOzs7Ozs7Ozs7OztBQ0FBLDZDOzs7Ozs7Ozs7OztBQ0FBLHVEOzs7Ozs7Ozs7OztBQ0FBLDZDOzs7Ozs7Ozs7OztBQ0FBLDZDOzs7Ozs7Ozs7OztBQ0FBLGlEOzs7Ozs7Ozs7OztBQ0FBLDhDOzs7Ozs7Ozs7OztBQ0FBLGdEOzs7Ozs7Ozs7OztBQ0FBLCtDOzs7Ozs7Ozs7OztBQ0FBLGlDOzs7Ozs7Ozs7OztBQ0FBLGdEOzs7Ozs7Ozs7OztBQ0FBLGtDOzs7Ozs7Ozs7OztBQ0FBLDZDOzs7Ozs7Ozs7OztBQ0FBLHNEOzs7Ozs7Ozs7OztBQ0FBLDhDOzs7Ozs7Ozs7OztBQ0FBLHdDOzs7Ozs7Ozs7OztBQ0FBLHlDOzs7Ozs7Ozs7OztBQ0FBLDZDOzs7Ozs7Ozs7OztBQ0FBLG1EOzs7Ozs7Ozs7OztBQ0FBLGtDOzs7Ozs7Ozs7OztBQ0FBLHlDOzs7Ozs7Ozs7OztBQ0FBLHdDOzs7Ozs7Ozs7OztBQ0FBLDZDIiwiZmlsZSI6InNlcnZlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgd2FzbSBtb2R1bGVzXG4gXHR2YXIgaW5zdGFsbGVkV2FzbU1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL1wiO1xuXG4gXHQvLyBvYmplY3Qgd2l0aCBhbGwgY29tcGlsZWQgV2ViQXNzZW1ibHkuTW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy53ID0ge307XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vaW5kZXguanNcIik7XG4iLCJpbXBvcnQgeyBTRU5EX09UUF9SRVFVRVNULCBTRU5EX09UUF9TVUNDRVNTLCBTRU5EX09UUF9GQUlMLCBTVUJNSVRfT1RQX1JFUVVFU1QsIFNVQk1JVF9PVFBfU1VDQ0VTUywgU1VCTUlUX09UUF9GQUlMIH0gZnJvbSAnLi4vLi4vY29uc3RhbnRzL3R5cGVzJztcbmltcG9ydCB7IEFQSV9HRVQsIEFQSV9QT1NUIH0gZnJvbSAnLi4vLi4vYXBpL2FwaS5qcyc7XG5pbXBvcnQgU1RPUkFHRSBmcm9tICcuLi8uLi9oZWxwZXJzL3N0b3JhZ2UnXG5cbmV4cG9ydCBjb25zdCBzZW5kT1RQID0gKG51bWJlciwgY2IpID0+IChkaXNwYXRjaCkgPT4ge1xuICAgIGRpc3BhdGNoKHtcbiAgICAgICAgdHlwZTogU0VORF9PVFBfUkVRVUVTVCxcbiAgICAgICAgcGF5bG9hZDoge1xuICAgICAgICAgICAgcGhvbmVOdW1iZXI6IG51bWJlclxuICAgICAgICB9XG4gICAgfSlcblxuICAgIEFQSV9QT1NUKCcvYXBpL3YxL3VzZXIvb3RwL2dlbmVyYXRlJywge1xuICAgICAgICBcInBob25lX251bWJlclwiOiBudW1iZXJcbiAgICB9KS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICBkaXNwYXRjaCh7XG4gICAgICAgICAgICB0eXBlOiBTRU5EX09UUF9TVUNDRVNTLFxuICAgICAgICAgICAgcGF5bG9hZDoge31cbiAgICAgICAgfSlcbiAgICAgICAgaWYgKGNiKSBjYihyZXNwb25zZS5leGlzdHMpO1xuICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICBsZXQgbWVzc2FnZSA9IFwiQ2Fubm90IGdlbmVyYXRlIE9UUC5cIlxuICAgICAgICBkaXNwYXRjaCh7XG4gICAgICAgICAgICB0eXBlOiBTRU5EX09UUF9GQUlMLFxuICAgICAgICAgICAgcGF5bG9hZDoge1xuICAgICAgICAgICAgICAgIGVycm9yX21lc3NhZ2U6IG1lc3NhZ2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9KVxuXG59XG5cbmV4cG9ydCBjb25zdCBzdWJtaXRPVFAgPSAobnVtYmVyLCBvdHAsIGNiKSA9PiAoZGlzcGF0Y2gpID0+IHtcbiAgICBkaXNwYXRjaCh7XG4gICAgICAgIHR5cGU6IFNVQk1JVF9PVFBfUkVRVUVTVCxcbiAgICAgICAgcGF5bG9hZDoge31cbiAgICB9KVxuXG4gICAgQVBJX1BPU1QoJy9hcGkvdjEvdXNlci9kb2N0b3IvbG9naW4nLCB7XG4gICAgICAgIFwicGhvbmVfbnVtYmVyXCI6IG51bWJlcixcbiAgICAgICAgXCJvdHBcIjogb3RwXG4gICAgfSkudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgLy8gc2V0IGNvb2tpZSB0b2tlbiBleHBsaWNpdGx5LCBjc3JmIHRva2VuIGlzIHNldCBieSBkZWZhdWx0XG4gICAgICAgIFNUT1JBR0Uuc2V0QXV0aFRva2VuKHJlc3BvbnNlLnRva2VuKVxuXG4gICAgICAgIGRpc3BhdGNoKHtcbiAgICAgICAgICAgIHR5cGU6IFNVQk1JVF9PVFBfU1VDQ0VTUyxcbiAgICAgICAgICAgIHBheWxvYWQ6IHsgdG9rZW46IHJlc3BvbnNlLnRva2VuIH1cbiAgICAgICAgfSlcbiAgICAgICAgaWYgKGNiKSBjYigpO1xuICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICBkaXNwYXRjaCh7XG4gICAgICAgICAgICB0eXBlOiBTVUJNSVRfT1RQX0ZBSUwsXG4gICAgICAgICAgICBwYXlsb2FkOiB7XG4gICAgICAgICAgICAgICAgZXJyb3JfbWVzc2FnZTogXCJJbnZhbGlkIE9UUFwiXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfSlcbn1cbiIsImltcG9ydCB7IEFQUEVORF9VU0VSX1BST0ZJTEVTIH0gZnJvbSAnLi4vLi4vY29uc3RhbnRzL3R5cGVzJztcbmltcG9ydCB7IEFQSV9HRVQgfSBmcm9tICcuLi8uLi9hcGkvYXBpLmpzJztcblxuXG5leHBvcnQgY29uc3QgZ2V0VXNlclByb2ZpbGUgPSAoKSA9PiAoZGlzcGF0Y2gpID0+IHtcblx0QVBJX0dFVCgnL3VzZXIuanNvbicpLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG5cdFx0XG5cdFx0ZGlzcGF0Y2goe1xuXHRcdFx0dHlwZTogQVBQRU5EX1VTRVJfUFJPRklMRVMsXG5cdFx0XHRwYXlsb2FkOiByZXNwb25zZS5wcm9maWxlc1xuXHRcdH0pXG5cblx0fSkuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSB7XG5cblx0fSlcbn1cblxuZXhwb3J0IGNvbnN0IGdldFVzZXJQcm9maWxlV2l0aEFwcG9pbnRtZW50cyA9ICgpID0+IChkaXNwYXRjaCkgPT4ge1xuXHRBUElfR0VUKCcvdXNlcl9wcm9maWxlX2FwcG9pbnRtZW50cy5qc29uJykudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcblx0XHRcblx0XHRkaXNwYXRjaCh7XG5cdFx0XHR0eXBlOiBBUFBFTkRfVVNFUl9QUk9GSUxFUyxcblx0XHRcdHBheWxvYWQ6IHJlc3BvbnNlLnByb2ZpbGVzXG5cdFx0fSlcblxuXHR9KS5jYXRjaChmdW5jdGlvbiAoZXJyb3IpIHtcblxuXHR9KVxufVxuXG5leHBvcnQgY29uc3QgZ2V0VXNlclByb2ZpbGVXaXRoVGVzdHMgPSAoKSA9PiAoZGlzcGF0Y2gpID0+IHtcblx0QVBJX0dFVCgnL3VzZXJfcHJvZmlsZV90ZXN0cy5qc29uJykudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcblx0XHRcblx0XHRkaXNwYXRjaCh7XG5cdFx0XHR0eXBlOiBBUFBFTkRfVVNFUl9QUk9GSUxFUyxcblx0XHRcdHBheWxvYWQ6IHJlc3BvbnNlLnByb2ZpbGVzXG5cdFx0fSlcblxuXHR9KS5jYXRjaChmdW5jdGlvbiAoZXJyb3IpIHtcblxuXHR9KVxufVxuXG4iLCJpbXBvcnQgeyBMQUJfU0VBUkNIX1NUQVJULCBBUFBFTkRfTEFCUywgTEFCX1NFQVJDSCwgTUVSR0VfU0VBUkNIX1NUQVRFX0xBQiB9IGZyb20gJy4uLy4uL2NvbnN0YW50cy90eXBlcyc7XG5pbXBvcnQgeyBBUElfR0VUIH0gZnJvbSAnLi4vLi4vYXBpL2FwaS5qcyc7XG5cblxuZXhwb3J0IGNvbnN0IGdldExhYnMgPSAoc2VhcmNoU3RhdGUgPSB7fSwgZmlsdGVyQ3JpdGVyaWEgPSB7fSwgbWVyZ2VTdGF0ZSA9IGZhbHNlKSA9PiAoZGlzcGF0Y2gpID0+IHtcblxuXHRsZXQgdGVzdElkcyA9IHNlYXJjaFN0YXRlLnNlbGVjdGVkQ3JpdGVyaWFzXG5cdFx0LmZpbHRlcih4ID0+IHgudHlwZSA9PSAndGVzdCcpXG5cdFx0LnJlZHVjZSgoZmluYWxTdHIsIGN1cnIsIGkpID0+IHtcblx0XHRcdGlmIChpICE9IDApIHtcblx0XHRcdFx0ZmluYWxTdHIgKz0gJywnXG5cdFx0XHR9XG5cdFx0XHRmaW5hbFN0ciArPSBgJHtjdXJyLmlkfWBcblx0XHRcdHJldHVybiBmaW5hbFN0clxuXHRcdH0sIFwiXCIpXG5cblx0bGV0IGxhdCA9IDI4LjQ1OTVcblx0bGV0IGxvbmcgPSA3Ny4wMjI2XG5cdGlmIChzZWFyY2hTdGF0ZS5zZWxlY3RlZExvY2F0aW9uKSB7XG5cdFx0bGF0ID0gc2VhcmNoU3RhdGUuc2VsZWN0ZWRMb2NhdGlvbi5nZW9tZXRyeS5sb2NhdGlvbi5sYXRcblx0XHRsb25nID0gc2VhcmNoU3RhdGUuc2VsZWN0ZWRMb2NhdGlvbi5nZW9tZXRyeS5sb2NhdGlvbi5sbmdcblx0fVxuXHRsZXQgbWluX2Rpc3RhbmNlID0gZmlsdGVyQ3JpdGVyaWEuZGlzdGFuY2VSYW5nZVswXVxuXHRsZXQgbWF4X2Rpc3RhbmNlID0gZmlsdGVyQ3JpdGVyaWEuZGlzdGFuY2VSYW5nZVsxXVxuXHRsZXQgbWluX3ByaWNlID0gZmlsdGVyQ3JpdGVyaWEucHJpY2VSYW5nZVswXVxuXHRsZXQgbWF4X3ByaWNlID0gZmlsdGVyQ3JpdGVyaWEucHJpY2VSYW5nZVsxXVxuXHRsZXQgb3JkZXJfYnkgPSBmaWx0ZXJDcml0ZXJpYS5zb3J0QnlcblxuXHRsZXQgdXJsID0gYC9hcGkvdjEvZGlhZ25vc3RpYy9sYWJsaXN0P2lkcz0ke3Rlc3RJZHN9Jmxvbmc9JHtsYXR9JmxhdD0ke2xvbmd9Jm1pbl9kaXN0YW5jZT0ke21pbl9kaXN0YW5jZX0mbWF4X2Rpc3RhbmNlPSR7bWF4X2Rpc3RhbmNlfSZtaW5fcHJpY2U9JHttaW5fcHJpY2V9Jm1heF9wcmljZT0ke21heF9wcmljZX0mb3JkZXJfYnk9JHtvcmRlcl9ieX1gXG5cblx0ZGlzcGF0Y2goe1xuXHRcdHR5cGU6IExBQl9TRUFSQ0hfU1RBUlQsXG5cdFx0cGF5bG9hZDogbnVsbFxuXHR9KVxuXG5cdHJldHVybiBBUElfR0VUKHVybCkudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcblxuXHRcdGRpc3BhdGNoKHtcblx0XHRcdHR5cGU6IEFQUEVORF9MQUJTLFxuXHRcdFx0cGF5bG9hZDogcmVzcG9uc2Vcblx0XHR9KVxuXG5cdFx0ZGlzcGF0Y2goe1xuXHRcdFx0dHlwZTogTEFCX1NFQVJDSCxcblx0XHRcdHBheWxvYWQ6IHJlc3BvbnNlXG5cdFx0fSlcblxuXHRcdGlmIChtZXJnZVN0YXRlKSB7XG5cdFx0XHRkaXNwYXRjaCh7XG5cdFx0XHRcdHR5cGU6IE1FUkdFX1NFQVJDSF9TVEFURV9MQUIsXG5cdFx0XHRcdHBheWxvYWQ6IHtcblx0XHRcdFx0XHRzZWFyY2hTdGF0ZSxcblx0XHRcdFx0XHRmaWx0ZXJDcml0ZXJpYVxuXHRcdFx0XHR9XG5cdFx0XHR9KVxuXHRcdH1cblxuXHR9KS5jYXRjaChmdW5jdGlvbiAoZXJyb3IpIHtcblxuXHR9KVxufVxuXG5leHBvcnQgY29uc3QgZ2V0TGFiQnlJZCA9IChsYWJJZCkgPT4gKGRpc3BhdGNoKSA9PiB7XG5cdGxldCB1cmwgPSBgL2FwaS92MS9kaWFnbm9zdGljL2xhYmxpc3QvJHtsYWJJZH1gXG5cblx0cmV0dXJuIEFQSV9HRVQodXJsKS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuXG5cdFx0ZGlzcGF0Y2goe1xuXHRcdFx0dHlwZTogQVBQRU5EX0xBQlMsXG5cdFx0XHRwYXlsb2FkOiBbcmVzcG9uc2VdXG5cdFx0fSlcblxuXHR9KS5jYXRjaChmdW5jdGlvbiAoZXJyb3IpIHtcblxuXHR9KVxufVxuXG5leHBvcnQgY29uc3QgZ2V0TGFiVGltZVNsb3RzID0gKGxhYklkLCB0ZXN0SWRzLCBjYWxsYmFjaykgPT4gKGRpc3BhdGNoKSA9PiB7XG5cdEFQSV9HRVQoJy9hdmFpbGFiaWxpdHlfbGFicy5qc29uJykudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcblxuXHRcdGNhbGxiYWNrKHJlc3BvbnNlKVxuXG5cdH0pLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xuXG5cdH0pXG59XG5cbmV4cG9ydCBjb25zdCBnZXRMYWJCb29raW5nU3VtbWFyeSA9IChib29raW5nSWQsIGNhbGxiYWNrKSA9PiAoZGlzcGF0Y2gpID0+IHtcblx0QVBJX0dFVCgnL2xhYl9ib29raW5nX3N1bW1hci5qc29uJykudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcblxuXHRcdGNhbGxiYWNrKHJlc3BvbnNlKVxuXG5cdH0pLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xuXG5cdH0pXG59XG4iLCJpbXBvcnQgeyBBUFBFTkRfRklMVEVSU19ESUFHTk9TSVMsIFRPR0dMRV9DT05ESVRJT05TLCBUT0dHTEVfU1BFQ0lBTElUSUVTLCBTRUxFQ1RfTE9DQVRJT04sIE1FUkdFX1NFQVJDSF9TVEFURSwgVE9HR0xFX0NSSVRFUklBLCBUT0dHTEVfVEVTVFMsIFRPR0dMRV9ESUFHTk9TSVNfQ1JJVEVSSUEsIExPQURfU0VBUkNIX0NSSVRFUklBX0xBQiB9IGZyb20gJy4uLy4uL2NvbnN0YW50cy90eXBlcyc7XG5pbXBvcnQgeyBBUElfR0VUIH0gZnJvbSAnLi4vLi4vYXBpL2FwaS5qcyc7XG5cbmV4cG9ydCBjb25zdCBsb2FkTGFiQ29tbW9uQ3JpdGVyaWFzID0gKCkgPT4gKGRpc3BhdGNoKSA9PiB7XG5cbiAgICByZXR1cm4gQVBJX0dFVCgnL2FwaS92MS9kaWFnbm9zdGljL2xhYnNlYXJjaCcpLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgIGRpc3BhdGNoKHtcbiAgICAgICAgICAgIHR5cGU6IExPQURfU0VBUkNIX0NSSVRFUklBX0xBQixcbiAgICAgICAgICAgIHBheWxvYWQ6IHJlc3BvbnNlXG4gICAgICAgIH0pXG4gICAgfSkuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICAgIGRpc3BhdGNoKHtcbiAgICAgICAgICAgIHR5cGU6IExPQURfU0VBUkNIX0NSSVRFUklBX0xBQixcbiAgICAgICAgICAgIHBheWxvYWQ6IG51bGxcbiAgICAgICAgfSlcbiAgICB9KVxuXG59XG5cbmV4cG9ydCBjb25zdCB0b2dnbGVEaWFnbm9zaXNDcml0ZXJpYSA9ICh0eXBlLCBjcml0ZXJpYSkgPT4gKGRpc3BhdGNoKSA9PiB7XG4gICAgZGlzcGF0Y2goe1xuICAgICAgICB0eXBlOiBUT0dHTEVfRElBR05PU0lTX0NSSVRFUklBLFxuICAgICAgICBwYXlsb2FkOiB7XG4gICAgICAgICAgICB0eXBlLCBjcml0ZXJpYVxuICAgICAgICB9XG4gICAgfSlcblxufVxuXG5leHBvcnQgY29uc3QgZ2V0RGlhZ25vc2lzQ3JpdGVyaWFSZXN1bHRzID0gKHNlYXJjaFN0cmluZywgY2FsbGJhY2spID0+IChkaXNwYXRjaCkgPT4ge1xuICAgIEFQSV9HRVQoYC9hcGkvdjEvZGlhZ25vc3RpYy90ZXN0P25hbWU9JHtzZWFyY2hTdHJpbmd9YCkudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgY2FsbGJhY2socmVzcG9uc2UpXG4gICAgfSkuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICAgIGNhbGxiYWNrKG51bGwpXG4gICAgfSlcbn1cblxuXG4iLCJpbXBvcnQgKiBhcyBTRUFSQ0hfQ1JJVEVSSUFfT1BEIGZyb20gJy4vb3BkL3NlYXJjaENyaXRlcmlhLmpzJ1xuaW1wb3J0ICogYXMgU0VBUkNIX0NSSVRFUklBX0xBQlMgZnJvbSAnLi9kaWFnbm9zaXMvc2VhcmNoQ3JpdGVyaWEuanMnXG5pbXBvcnQgKiBhcyBET0NUT1JTX0FDVElPTlMgZnJvbSAnLi9vcGQvZG9jdG9yU2VhcmNoLmpzJ1xuaW1wb3J0ICogYXMgTEFCU19BQ1RJT05TIGZyb20gJy4vZGlhZ25vc2lzL2xhYlNlYXJjaC5qcydcbmltcG9ydCAqIGFzIFVTRVJfQUNUSU9OUyBmcm9tICcuL2NvbW1vbnMvdXNlci5qcydcbmltcG9ydCAqIGFzIEFVVEhfQUNUSU9OUyBmcm9tICcuL2NvbW1vbnMvYXV0aC5qcydcblxubW9kdWxlLmV4cG9ydHMgPSBPYmplY3QuYXNzaWduKHt9LFxuICAgIFNFQVJDSF9DUklURVJJQV9PUEQsXG4gICAgU0VBUkNIX0NSSVRFUklBX0xBQlMsXG4gICAgRE9DVE9SU19BQ1RJT05TLFxuICAgIExBQlNfQUNUSU9OUyxcbiAgICBVU0VSX0FDVElPTlMsXG4gICAgQVVUSF9BQ1RJT05TXG4pIiwiaW1wb3J0IHsgRE9DVE9SX1NFQVJDSF9TVEFSVCwgQVBQRU5EX0RPQ1RPUlMsIERPQ1RPUl9TRUFSQ0gsIE1FUkdFX1NFQVJDSF9TVEFURV9PUEQgfSBmcm9tICcuLi8uLi9jb25zdGFudHMvdHlwZXMnO1xuaW1wb3J0IHsgQVBJX0dFVCB9IGZyb20gJy4uLy4uL2FwaS9hcGkuanMnO1xuXG5cbmV4cG9ydCBjb25zdCBnZXREb2N0b3JzID0gKHNlYXJjaFN0YXRlID0ge30sIGZpbHRlckNyaXRlcmlhID0ge30sIG1lcmdlU3RhdGUgPSBmYWxzZSkgPT4gKGRpc3BhdGNoKSA9PiB7XG5cdGxldCBzcGVjaWFsaXphdGlvbl9pZHMgPSBzZWFyY2hTdGF0ZS5zZWxlY3RlZENyaXRlcmlhc1xuXHRcdC5maWx0ZXIoeCA9PiB4LnR5cGUgPT0gJ3NwZWNpYWxpdHknKVxuXHRcdC5yZWR1Y2UoKGZpbmFsU3RyLCBjdXJyLCBpKSA9PiB7XG5cdFx0XHRpZiAoaSAhPSAwKSB7XG5cdFx0XHRcdGZpbmFsU3RyICs9ICcsJ1xuXHRcdFx0fVxuXHRcdFx0ZmluYWxTdHIgKz0gYCR7Y3Vyci5pZH1gXG5cdFx0XHRyZXR1cm4gZmluYWxTdHJcblx0XHR9LCBcIlwiKVxuXG5cdGxldCBzaXRzX2F0ID0gW11cblx0Ly8gaWYoZmlsdGVyQ3JpdGVyaWEuc2l0c19hdF9jbGluaWMpIHNpdHNfYXQucHVzaCgnY2xpbmljJyk7XG5cdC8vIGlmKGZpbHRlckNyaXRlcmlhLnNpdHNfYXRfaG9zcGl0YWwpIHNpdHNfYXQucHVzaCgnaG9zcGl0YWwnKTtcblx0Ly8gaWYoc2l0c19hdC5sZW5ndGggPT0gMCkgc2l0c19hdCA9IFsnY2xpbmljJywnaG9zcGl0YWwnXTtcblx0c2l0c19hdCA9IHNpdHNfYXQuam9pbignLCcpXG5cblx0bGV0IGxhdCA9IDI4LjQ1OTVcblx0bGV0IGxvbmcgPSA3Ny4wMjI2XG5cdGlmIChzZWFyY2hTdGF0ZS5zZWxlY3RlZExvY2F0aW9uKSB7XG5cdFx0bGF0ID0gc2VhcmNoU3RhdGUuc2VsZWN0ZWRMb2NhdGlvbi5nZW9tZXRyeS5sb2NhdGlvbi5sYXRcblx0XHRsb25nID0gc2VhcmNoU3RhdGUuc2VsZWN0ZWRMb2NhdGlvbi5nZW9tZXRyeS5sb2NhdGlvbi5sbmdcblx0fVxuXG5cdGxldCBtaW5fZmVlcyA9IGZpbHRlckNyaXRlcmlhLnByaWNlUmFuZ2VbMF1cblx0bGV0IG1heF9mZWVzID0gZmlsdGVyQ3JpdGVyaWEucHJpY2VSYW5nZVsxXVxuXHRsZXQgc29ydF9vbiA9IGZpbHRlckNyaXRlcmlhLnNvcnRfb24gfHwgXCJcIlxuXHRsZXQgaXNfYXZhaWxhYmxlID0gZmlsdGVyQ3JpdGVyaWEuaXNfYXZhaWxhYmxlXG5cdGxldCBpc19mZW1hbGUgPSBmaWx0ZXJDcml0ZXJpYS5pc19mZW1hbGVcblxuXHRsZXQgdXJsID0gYC9hcGkvdjEvZG9jdG9yL2RvY3RvcnNlYXJjaD9zcGVjaWFsaXphdGlvbl9pZHM9JHtzcGVjaWFsaXphdGlvbl9pZHN9JnNpdHNfYXQ9JHtzaXRzX2F0fSZsYXRpdHVkZT0ke2xhdH0mbG9uZ2l0dWRlPSR7bG9uZ30mbWluX2ZlZXM9JHttaW5fZmVlc30mbWF4X2ZlZXM9JHttYXhfZmVlc30mc29ydF9vbj0ke3NvcnRfb259JmlzX2F2YWlsYWJsZT0ke2lzX2F2YWlsYWJsZX0maXNfZmVtYWxlPSR7aXNfZmVtYWxlfWBcblxuXHRkaXNwYXRjaCh7XG5cdFx0dHlwZTogRE9DVE9SX1NFQVJDSF9TVEFSVCxcblx0XHRwYXlsb2FkOiBudWxsXG5cdH0pXG5cblx0cmV0dXJuIEFQSV9HRVQodXJsKS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuXG5cdFx0ZGlzcGF0Y2goe1xuXHRcdFx0dHlwZTogQVBQRU5EX0RPQ1RPUlMsXG5cdFx0XHRwYXlsb2FkOiByZXNwb25zZVxuXHRcdH0pXG5cblx0XHRkaXNwYXRjaCh7XG5cdFx0XHR0eXBlOiBET0NUT1JfU0VBUkNILFxuXHRcdFx0cGF5bG9hZDogcmVzcG9uc2Vcblx0XHR9KVxuXG5cdFx0aWYgKG1lcmdlU3RhdGUpIHtcblx0XHRcdGRpc3BhdGNoKHtcblx0XHRcdFx0dHlwZTogTUVSR0VfU0VBUkNIX1NUQVRFX09QRCxcblx0XHRcdFx0cGF5bG9hZDoge1xuXHRcdFx0XHRcdHNlYXJjaFN0YXRlLFxuXHRcdFx0XHRcdGZpbHRlckNyaXRlcmlhXG5cdFx0XHRcdH1cblx0XHRcdH0pXG5cdFx0fVxuXG5cdH0pLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xuXG5cdH0pXG59XG5cbmV4cG9ydCBjb25zdCBnZXREb2N0b3JCeUlkID0gKGRvY3RvcklkKSA9PiAoZGlzcGF0Y2gpID0+IHtcblxuXHRyZXR1cm4gQVBJX0dFVChgL2FwaS92MS9kb2N0b3IvcHJvZmlsZXVzZXJ2aWV3LyR7ZG9jdG9ySWR9YCkudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcblxuXHRcdGRpc3BhdGNoKHtcblx0XHRcdHR5cGU6IEFQUEVORF9ET0NUT1JTLFxuXHRcdFx0cGF5bG9hZDogW3Jlc3BvbnNlXVxuXHRcdH0pXG5cblx0fSkuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSB7XG5cblx0fSlcbn1cblxuZXhwb3J0IGNvbnN0IGdldFRpbWVTbG90cyA9IChkb2N0b3JJZCwgY2xpbmljSWQsIGNhbGxiYWNrKSA9PiAoZGlzcGF0Y2gpID0+IHtcblx0cmV0dXJuIEFQSV9HRVQoYC9hcGkvdjEvZG9jdG9yL2RvY3RvcnRpbWluZz9kb2N0b3JfaWQ9JHtkb2N0b3JJZH0maG9zcGl0YWxfaWQ9JHtjbGluaWNJZH1gKS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuXHRcdGNhbGxiYWNrKHJlc3BvbnNlKVxuXHR9KS5jYXRjaChmdW5jdGlvbiAoZXJyb3IpIHtcblxuXHR9KVxufVxuIiwiaW1wb3J0IHsgU0VMRUNUX0xPQ0FUSU9OX09QRCwgTUVSR0VfU0VBUkNIX1NUQVRFX09QRCwgVE9HR0xFX09QRF9DUklURVJJQSwgTE9BRF9TRUFSQ0hfQ1JJVEVSSUFfT1BELCBTRUxFQ1RfTE9DQVRJT05fRElBR05PU0lTIH0gZnJvbSAnLi4vLi4vY29uc3RhbnRzL3R5cGVzJztcbmltcG9ydCB7IEFQSV9HRVQgfSBmcm9tICcuLi8uLi9hcGkvYXBpLmpzJztcblxuXG5leHBvcnQgY29uc3QgbG9hZE9QRENvbW1vbkNyaXRlcmlhID0gKCkgPT4gKGRpc3BhdGNoKSA9PiB7XG5cbiAgICByZXR1cm4gQVBJX0dFVCgnL2FwaS92MS9kb2N0b3Ivc2VhcmNoZWRpdGVtcycpLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgIGRpc3BhdGNoKHtcbiAgICAgICAgICAgIHR5cGU6IExPQURfU0VBUkNIX0NSSVRFUklBX09QRCxcbiAgICAgICAgICAgIHBheWxvYWQ6IHJlc3BvbnNlXG4gICAgICAgIH0pXG4gICAgfSkuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICAgIGRpc3BhdGNoKHtcbiAgICAgICAgICAgIHR5cGU6IExPQURfU0VBUkNIX0NSSVRFUklBX09QRCxcbiAgICAgICAgICAgIHBheWxvYWQ6IG51bGxcbiAgICAgICAgfSlcbiAgICB9KVxuXG59XG5cbmV4cG9ydCBjb25zdCB0b2dnbGVPUERDcml0ZXJpYSA9ICh0eXBlLCBjcml0ZXJpYSkgPT4gKGRpc3BhdGNoKSA9PiB7XG4gICAgZGlzcGF0Y2goe1xuICAgICAgICB0eXBlOiBUT0dHTEVfT1BEX0NSSVRFUklBLFxuICAgICAgICBwYXlsb2FkOiB7XG4gICAgICAgICAgICB0eXBlLCBjcml0ZXJpYVxuICAgICAgICB9XG4gICAgfSlcblxufVxuXG5leHBvcnQgY29uc3Qgc2VsZWN0TG9jYXRpb24gPSAobG9jYXRpb24pID0+IChkaXNwYXRjaCkgPT4ge1xuICAgIGRpc3BhdGNoKHtcbiAgICAgICAgdHlwZTogU0VMRUNUX0xPQ0FUSU9OX09QRCxcbiAgICAgICAgcGF5bG9hZDogbG9jYXRpb25cbiAgICB9KVxuXG4gICAgZGlzcGF0Y2goe1xuICAgICAgICB0eXBlOiBTRUxFQ1RfTE9DQVRJT05fRElBR05PU0lTLFxuICAgICAgICBwYXlsb2FkOiBsb2NhdGlvblxuICAgIH0pXG5cbn1cblxuZXhwb3J0IGNvbnN0IGdldE9QRENyaXRlcmlhUmVzdWx0cyA9IChzZWFyY2hTdHJpbmcsIGNhbGxiYWNrKSA9PiAoZGlzcGF0Y2gpID0+IHtcbiAgICBcbiAgICBBUElfR0VUKGAvYXBpL3YxL2RpYWdub3N0aWMvdGVzdD9uYW1lPSR7c2VhcmNoU3RyaW5nfWApLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgIGNhbGxiYWNrKHJlc3BvbnNlKVxuICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICBjYWxsYmFjayhudWxsKVxuICAgIH0pXG59XG4iLCJpbXBvcnQgQXhpb3MgZnJvbSAnYXhpb3MnXG5pbXBvcnQgU1RPUkFHRSBmcm9tICcuLi9oZWxwZXJzL3N0b3JhZ2UnXG5pbXBvcnQgTkFWSUdBVEUgZnJvbSAnLi4vaGVscGVycy9uYXZpZ2F0ZSdcblxubGV0IGF4aW9zSW5zdGFuY2UgPSBBeGlvcy5jcmVhdGUoe1xuICAgIGJhc2VVUkw6ICdodHRwczovL3FhLnBhbmFjZWF0ZWNobm8uY29tJyxcbiAgICBoZWFkZXI6IHt9XG59KTtcblxuZnVuY3Rpb24gcmVqZWN0SGFuZGxlcihyZXNwb25zZSwgY2FsbGJhY2spIHtcbiAgICBjb25zb2xlLmxvZyhyZXNwb25zZSlcbiAgICAvLyBpZiAocmVzcG9uc2UgJiYgcmVzcG9uc2UucmVzcG9uc2UgJiYgcmVzcG9uc2UucmVzcG9uc2Uuc3RhdHVzID09IDQwMSkge1xuICAgIC8vICAgICBTVE9SQUdFLmRlbGV0ZUF1dGgoKS50aGVuKCgpID0+IHtcbiAgICAvLyAgICAgICAgIC8vIHNlbmQgdG8gbG9naW4gcGFnZVxuICAgIC8vICAgICAgICAgTkFWSUdBVEUubmF2aWdhdGVUbygnLycpXG4gICAgLy8gICAgIH0pXG4gICAgLy8gfVxuXG4gICAgY2FsbGJhY2socmVzcG9uc2UpXG59XG5cbmV4cG9ydCBjb25zdCBBUElfR0VUID0gKHVybCkgPT4ge1xuICAgIHJldHVybiBTVE9SQUdFLmdldEF1dGhUb2tlbigpLnRoZW4oKHRva2VuKSA9PiB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBheGlvc0luc3RhbmNlKHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdnZXQnLFxuICAgICAgICAgICAgICAgIHVybDogdXJsLFxuICAgICAgICAgICAgICAgIC8vIGhlYWRlcnM6IHsgJ0F1dGhvcml6YXRpb24nOiBgVG9rZW4gJHt0b2tlbn1gIH1cbiAgICAgICAgICAgIH0pLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICAgICAgICAgIHJlc29sdmUocmVzLmRhdGEpXG4gICAgICAgICAgICB9LCAocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICByZWplY3RIYW5kbGVyKHJlc3BvbnNlLCByZWplY3QpXG4gICAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgIH0pXG5cblxufVxuZXhwb3J0IGNvbnN0IEFQSV9QT1NUID0gKHVybCwgZGF0YSkgPT4ge1xuICAgIHJldHVybiBTVE9SQUdFLmdldEF1dGhUb2tlbigpLnRoZW4oKHRva2VuKSA9PiB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBheGlvc0luc3RhbmNlKHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdwb3N0JyxcbiAgICAgICAgICAgICAgICB1cmw6IHVybCxcbiAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgICAgIGhlYWRlcnM6IHsgJ0F1dGhvcml6YXRpb24nOiBgVG9rZW4gJHt0b2tlbn1gIH1cbiAgICAgICAgICAgIH0pLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICAgICAgICAgIHJlc29sdmUocmVzLmRhdGEpXG4gICAgICAgICAgICB9LCAocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICByZWplY3RIYW5kbGVyKHJlc3BvbnNlLCByZWplY3QpXG4gICAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgIH0pXG5cblxufVxuXG5leHBvcnQgY29uc3QgQVBJX1BVVCA9ICh1cmwsIGRhdGEpID0+IHtcbiAgICByZXR1cm4gU1RPUkFHRS5nZXRBdXRoVG9rZW4oKS50aGVuKCh0b2tlbikgPT4ge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgYXhpb3NJbnN0YW5jZSh7XG4gICAgICAgICAgICAgICAgbWV0aG9kOiAncHV0JyxcbiAgICAgICAgICAgICAgICB1cmw6IHVybCxcbiAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgICAgIGhlYWRlcnM6IHsgJ0F1dGhvcml6YXRpb24nOiBgVG9rZW4gJHt0b2tlbn1gIH1cbiAgICAgICAgICAgIH0pLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICAgICAgICAgIHJlc29sdmUocmVzLmRhdGEpXG4gICAgICAgICAgICB9LCAocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICByZWplY3RIYW5kbGVyKHJlc3BvbnNlLCByZWplY3QpXG4gICAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgIH0pXG5cblxufVxuXG5leHBvcnQgY29uc3QgQVBJX0RFTEVURSA9ICh1cmwpID0+IHtcbiAgICByZXR1cm4gU1RPUkFHRS5nZXRBdXRoVG9rZW4oKS50aGVuKCh0b2tlbikgPT4ge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgYXhpb3NJbnN0YW5jZSh7XG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnZGVsZXRlJyxcbiAgICAgICAgICAgICAgICB1cmw6IHVybCxcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiB7ICdBdXRob3JpemF0aW9uJzogYFRva2VuICR7dG9rZW59YCB9XG4gICAgICAgICAgICB9KS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgICAgICAgICByZXNvbHZlKHJlcy5kYXRhKVxuICAgICAgICAgICAgfSwgKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgcmVqZWN0SGFuZGxlcihyZXNwb25zZSwgcmVqZWN0KVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICB9KVxuXG59IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IHsgQ2lyY3VsYXJQcm9ncmVzcyB9IGZyb20gJ21hdGVyaWFsLXVpL1Byb2dyZXNzJztcblxuY2xhc3MgTG9hZGVyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibG9hZGVyQ2lyY3VsYXJcIj5cbiAgICAgICAgICAgICAgICA8Q2lyY3VsYXJQcm9ncmVzcyBjbGFzc05hbWU9e1wibG9hZGVyYWN0dWFsXCJ9IHNpemU9ezUwfSB0aGlja25lc3M9ezN9IC8+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICApO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTG9hZGVyXG4iLCJpbXBvcnQgTG9hZGVyIGZyb20gJy4vTG9hZGVyJ1xuXG5leHBvcnQgZGVmYXVsdCBMb2FkZXIiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5jbGFzcyBVc2VyTG9naW5WaWV3IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIHBob25lTnVtYmVyOiAnJyxcbiAgICAgICAgICAgIHZhbGlkYXRpb25FcnJvcjogJydcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlucHV0SGFuZGxlcihlKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBbZS50YXJnZXQubmFtZV06IGUudGFyZ2V0LnZhbHVlIH0pXG4gICAgfVxuXG4gICAgc3VibWl0T1RQUmVxdWVzdChudW1iZXIpIHtcblxuICAgICAgICBpZiAobnVtYmVyLm1hdGNoKC9eWzc4OV17MX1bMC05XXs5fSQvKSkge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHZhbGlkYXRpb25FcnJvcjogXCJcIiB9KVxuICAgICAgICAgICAgdGhpcy5wcm9wcy5zZW5kT1RQKG51bWJlciwgKGV4aXN0cykgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuaGlzdG9yeS5yZXBsYWNlKCcvb3RwL3ZlcmlmeT9leGlzdHM9JHshIWV4aXN0c30nKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyB2YWxpZGF0aW9uRXJyb3I6IFwiUGxlYXNlIHByb3ZpZGUgYSB2YWxpZCBudW1iZXIgKDEwIGRpZ2l0cylcIiB9KVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIDxoZWFkZXIgY2xhc3NOYW1lPVwic2tpbi13aGl0ZSBmaXhlZCBob3Jpem9udGFsIHRvcCBiZHItMSBib3R0b20gbGlnaHRcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250YWluZXItZmx1aWRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtMlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dWwgY2xhc3NOYW1lPVwiaW5saW5lLWxpc3RcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaT48c3BhbiBjbGFzc05hbWU9XCJpY29uIGljb24tc20gdGV4dC1taWRkbGUgYmFjay1pY29uLXdoaXRlXCI+PGltZyBzcmM9XCIvYXNzZXRzL2ltZy9jdXN0b21lci1pY29ucy9iYWNrLWljb24ucG5nXCIgY2xhc3NOYW1lPVwiaW1nLWZsdWlkXCIgLz48L3NwYW4+PC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC04XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaGVhZGVyLXRpdGxlIGZ3LTcwMCBjYXBpdGFsaXplIHRleHQtY2VudGVyXCI+UmVnaXN0cmF0aW9uL0xvZ2luPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtMlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvaGVhZGVyPlxuICAgICAgICAgICAgICAgIDxzZWN0aW9uIGNsYXNzTmFtZT1cIndyYXAgbW9iaWxlLXZlcmlmaWNhdGlvbi1zY3JlZW5cIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3aWRnZXQgbm8tc2hhZG93IG5vLXJvdW5kXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIndpZGdldC1oZWFkZXIgdGV4dC1jZW50ZXIgbXYtaGVhZGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGg0IGNsYXNzTmFtZT1cImZ3LTcwMCB0ZXh0LW1kXCI+RW50ZXIgeW91ciBNb2JpbGUgTnVtYmVyIDxiciAvPiB0byBjb250aW51ZTwvaDQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwid2lkZ2V0LWNvbnRlbnQgdGV4dC1jZW50ZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vYmlsZS12ZXJpZmljYXRpb25cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ2ZXJpZmktbW9iLWlvY24gdGV4dC1jZW50ZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbWcgc3JjPVwiL2Fzc2V0cy9pbWcvY3VzdG9tZXItaWNvbnMvbW9iLnN2Z1wiIGNsYXNzTmFtZT1cImltZy1mbHVpZFwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cCBtb2JpbGUtZmllbGRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG9uLWdyb3VwIGVudGVyLW1vYmlsZS1udW1iZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGNsYXNzTmFtZT1cImZjLWlucHV0IHRleHQtY2VudGVyXCIgcGxhY2Vob2xkZXI9XCIyMzRYWFhYWFhcIiB2YWx1ZT17dGhpcy5zdGF0ZS5waG9uZU51bWJlcn0gb25DaGFuZ2U9e3RoaXMuaW5wdXRIYW5kbGVyLmJpbmQodGhpcyl9IG5hbWU9XCJwaG9uZU51bWJlclwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJlcnJvck1lc3NhZ2VcIj57dGhpcy5wcm9wcy5lcnJvcl9tZXNzYWdlfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImVycm9yTWVzc2FnZVwiPnt0aGlzLnN0YXRlLnZhbGlkYXRpb25FcnJvcn08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvc2VjdGlvbj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9e3RoaXMuc3VibWl0T1RQUmVxdWVzdC5iaW5kKHRoaXMsdGhpcy5zdGF0ZS5waG9uZU51bWJlcil9IGRpc2FibGVkPXt0aGlzLnByb3BzLm90cF9yZXF1ZXN0X3NlbnR9IGNsYXNzTmFtZT1cInYtYnRuIHYtYnRuLXByaW1hcnkgYnRuLWxnIGZpeGVkIGhvcml6b250YWwgYm90dG9tIG5vLXJvdW5kIGJ0bi1sZyB0ZXh0LWxnXCI+Q29udGludWU8L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBVc2VyTG9naW5WaWV3XG4iLCJpbXBvcnQgVXNlckxvZ2luVmlldyBmcm9tICcuL1VzZXJMb2dpbidcblxuZXhwb3J0IGRlZmF1bHQgVXNlckxvZ2luVmlldyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmNvbnN0IElmcmFtU3R5bGUgPSB7XG4gICAgd2lkdGg6ICcxMDAlJyxcbiAgICBoZWlnaHQ6ICdjYWxjKDEwMHZoIC0gNjBweCknXG59XG5cblxuY2xhc3MgQ2hhdFZpZXcgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgICAgICB0aGlzLnN0YXRlID0ge1xuXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdGF0aWMgY29udGV4dFR5cGVzID0ge1xuICAgICAgICByb3V0ZXI6ICgpID0+IG51bGxcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibG9jYXRpb25TZWxlY3RvclwiPlxuICAgICAgICAgICAgICAgIDxpZnJhbWUgc3JjPVwiaHR0cDovL2NoYXRib3QucG9saWN5YmF6YWFyLmNvbS9saXZlY2hhdFwiIHN0eWxlPXtJZnJhbVN0eWxlfT48L2lmcmFtZT5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBDaGF0Vmlld1xuIiwiaW1wb3J0IENoYXRWaWV3IGZyb20gJy4vQ2hhdFZpZXcuanMnXG5cbmV4cG9ydCBkZWZhdWx0IENoYXRWaWV3IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IENoaXAgZnJvbSAnbWF0ZXJpYWwtdWkvQ2hpcCc7XG5cblxuY2xhc3MgQ29tbW9ubHlTZWFyY2hlZCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG5cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICBsZXQgcm93cyA9IHRoaXMucHJvcHMuZGF0YS5tYXAoKHJvdyxpKSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcm9wcy50eXBlID09ICdsYWInKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIDxsaSBrZXk9e2l9PlxuICAgICAgICAgICAgICAgICAgICA8c3BhblxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiY3QtaW1nIGxhYi1pbWdcIlxuICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aW1nIHNyYz1cIi9hc3NldHMvaW1nL2N1c3RvbWVyLWljb25zL2xhYjEucG5nXCIgY2xhc3NOYW1lPVwiaW1nLWZsdWlkXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJsYWItbmFtZVwiPlNMUiBEaWdub3N0aWNzPC9wPlxuICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGxldCBzZWxlY3RlZCA9IGZhbHNlXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5zZWxlY3RlZC5tYXAoKGN1cnIpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYoY3Vyci5pZCA9PSByb3cuaWQpe1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWQgPSB0cnVlXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIHJldHVybiA8bGkga2V5PXtpfT5cbiAgICAgICAgICAgICAgICAgICAgPGFcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17c2VsZWN0ZWQgPyBcInYtYnRuIHYtYnRuLXByaW1hcnkgdGFnLXNtIG91dGxpbmUgc2VsZWN0ZWRcIiA6IFwidi1idG4gdi1idG4tcHJpbWFyeSB0YWctc20gb3V0bGluZVwifVxuICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnByb3BzLnRvZ2dsZSgodGhpcy5wcm9wcy50eXBlIHx8IHJvdy50eXBlKSwgcm93KVxuICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAge3Jvdy5uYW1lfVxuICAgICAgICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9KVxuXG4gICAgICAgIGxldCBkaXZDbGFzcyA9IGBwYW5lbC1jb250ZW50YFxuICAgICAgICBsZXQgdWxDbGFzcyA9IGBpbmxpbmUtbGlzdGBcblxuICAgICAgICBpZiAodGhpcy5wcm9wcy50eXBlID09ICdsYWInKSB7XG4gICAgICAgICAgICBkaXZDbGFzcyA9IGBwYW5lbC1jb250ZW50IHRvdGFsLWxhYnNgXG4gICAgICAgICAgICB1bENsYXNzID0gYGlubGluZS1saXN0IGxhYi1pdGVtc2BcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwid2lkZ2V0LXBhbmVsXCI+XG4gICAgICAgICAgICAgICAgPGg0IGNsYXNzTmFtZT1cInBhbmVsLXRpdGxlXCI+e3RoaXMucHJvcHMuaGVhZGluZ308L2g0PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtkaXZDbGFzc30+XG4gICAgICAgICAgICAgICAgICAgIDx1bCBjbGFzc05hbWU9e3VsQ2xhc3N9PlxuICAgICAgICAgICAgICAgICAgICAgICAge3Jvd3N9XG4gICAgICAgICAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgQ29tbW9ubHlTZWFyY2hlZFxuIiwiaW1wb3J0IENvbW1vbmx5U2VhcmNoZWQgZnJvbSAnLi9Db21tb25seVNlYXJjaGVkLmpzJ1xuXG5cbmV4cG9ydCBkZWZhdWx0IENvbW1vbmx5U2VhcmNoZWQiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgbGlnaHRCYXNlVGhlbWUgfSBmcm9tICdtYXRlcmlhbC11aS9zdHlsZXMnO1xuaW1wb3J0IExvYWRlciBmcm9tICcuLi8uLi9jb21tb25zL0xvYWRlcidcblxuY29uc3QgZGVib3VuY2VyID0gKGZuLCBkZWxheSkgPT4ge1xuICAgIGxldCB0aW1lciA9IG51bGxcbiAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICBjbGVhclRpbWVvdXQodGltZXIpXG4gICAgICAgIHRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBmbi5jYWxsKHRoaXMpXG4gICAgICAgIH0sIGRlbGF5KVxuICAgIH1cbn1cblxuXG5jbGFzcyBDcml0ZXJpYVNlYXJjaFZpZXcgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgc2VhcmNoVmFsdWU6ICcnLFxuICAgICAgICAgICAgc2VhcmNoUmVzdWx0czogW11cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgICB0aGlzLmdldFNlYXJjaFJlc3VsdHMgPSBkZWJvdW5jZXIodGhpcy5nZXRTZWFyY2hSZXN1bHRzLmJpbmQodGhpcyksIDEwMDApXG4gICAgICAgIGxldCBpbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0b3BDcml0ZXJpYVNlYXJjaCcpXG4gICAgICAgIC8vIGlucHV0LmZvY3VzKClcbiAgICB9XG5cbiAgICBpbnB1dEhhbmRsZXIoZSkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHsgc2VhcmNoVmFsdWU6IGUudGFyZ2V0LnZhbHVlIH0pXG4gICAgICAgIHRoaXMuZ2V0U2VhcmNoUmVzdWx0cygpXG4gICAgfVxuXG4gICAgZ2V0U2VhcmNoUmVzdWx0cygpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMudHlwZSA9PSAnb3BkJykge1xuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLmdldERpYWdub3Npc0NyaXRlcmlhUmVzdWx0cyh0aGlzLnN0YXRlLnNlYXJjaFZhbHVlLCAoc2VhcmNoUmVzdWx0cykgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChzZWFyY2hSZXN1bHRzKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCB0ZXN0cyA9IHNlYXJjaFJlc3VsdHMudGVzdHMubWFwKHggPT4geyByZXR1cm4geyAuLi54LCB0eXBlOiAndGVzdCcgfSB9KVxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgc2VhcmNoUmVzdWx0czogWy4uLnRlc3RzXSB9KVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhZGRDcml0ZXJpYShjcml0ZXJpYSkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy50eXBlID09ICdvcGQnKSB7XG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMudG9nZ2xlRGlhZ25vc2lzQ3JpdGVyaWEoY3JpdGVyaWEudHlwZSwgY3JpdGVyaWEpXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgc2VhcmNoVmFsdWU6IFwiXCIgfSlcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIGxldCBsb2NhdGlvbiA9IFwiR3VyZ2FvblwiXG4gICAgICAgIGlmICh0aGlzLnByb3BzLnNlbGVjdGVkTG9jYXRpb24pIHtcbiAgICAgICAgICAgIGxvY2F0aW9uID0gdGhpcy5wcm9wcy5zZWxlY3RlZExvY2F0aW9uLmZvcm1hdHRlZF9hZGRyZXNzLnNsaWNlKDAsIDUpXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICA8aGVhZGVyIGNsYXNzTmFtZT1cInNraW4tcHJpbWFyeSBmaXhlZCBob3Jpem9udGFsIHRvcCBjdC1oZWFkZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250YWluZXItZmx1aWRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtMTJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJuYXZpZ2F0ZS1yb3dcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx1bCBjbGFzc05hbWU9XCJpbmxpbmUtbGlzdCB0b3AtbmF2IGFscGhhLWJ4IHRleHQtd2hpdGVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5oaXN0b3J5LmdvKC0xKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpPjxzcGFuIGNsYXNzTmFtZT1cImN0LWltZyBjdC1pbWctc20gYXJyb3ctaW1nXCI+PGltZyBzcmM9XCIvYXNzZXRzL2ltZy9jdXN0b21lci1pY29ucy9sZWZ0LWFycm93LnN2Z1wiIGNsYXNzTmFtZT1cImltZy1mbHVpZFwiIC8+PC9zcGFuPjwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpPjxkaXYgY2xhc3NOYW1lPVwic2NyZWVuLXRpdGxlXCI+U2VhcmNoPC9kaXY+PC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dWwgY2xhc3NOYW1lPVwiaW5saW5lLWxpc3QgdG9wLW5hdiBiZXRhLWJ4IGZsb2F0LXJpZ2h0IHRleHQtcmlnaHQgdGV4dC13aGl0ZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnByb3BzLmhpc3RvcnkucHVzaCgnL2xvY2F0aW9uc2VhcmNoJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaT48ZGl2IGNsYXNzTmFtZT1cInNjcmVlbi10aXRsZVwiPjxzcGFuIGNsYXNzTmFtZT1cImN0LWltZyBjdC1pbWctc20gbWFwLW1hcmtlci1pbWdcIj48aW1nIHNyYz1cIi9hc3NldHMvaW1nL2N1c3RvbWVyLWljb25zL21hcC1tYXJrZXIuc3ZnXCIgY2xhc3NOYW1lPVwiaW1nLWZsdWlkXCIgLz48L3NwYW4+IHtsb2NhdGlvbn08L2Rpdj48L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtMTJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzZWFyY2gtcm93XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkb24tZ3JvdXBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2wgaW5wdXQtbWQgc2VhcmNoLWlucHV0XCIgaWQ9XCJ0b3BDcml0ZXJpYVNlYXJjaFwiIG9uQ2hhbmdlPXt0aGlzLmlucHV0SGFuZGxlci5iaW5kKHRoaXMpfSB2YWx1ZT17dGhpcy5zdGF0ZS5zZWFyY2hWYWx1ZX0gcGxhY2Vob2xkZXI9e3RoaXMucHJvcHMudGl0bGV9IC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiY3QtaW1nIGN0LWltZy1zbSBzZWFyY2gtaWNvblwiPjxpbWcgc3JjPVwiL2Fzc2V0cy9pbWcvY3VzdG9tZXItaWNvbnMvc2VhcmNoLWljb24uc3ZnXCIgLz48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9oZWFkZXI+XG5cbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUuc2VhcmNoVmFsdWUgP1xuXG4gICAgICAgICAgICAgICAgICAgICAgICA8c2VjdGlvbiBjbGFzc05hbWU9XCJ3cmFwIHdyYXAtMTAwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3aWRnZXQtcGFuZWxcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGg0IGNsYXNzTmFtZT1cInBhbmVsLXRpdGxlXCI+U2VhcmNoIFJlc3VsdDwvaDQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGFuZWwtY29udGVudFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHVsIGNsYXNzTmFtZT1cImxpc3Qgc2VhcmNoLXJlc3VsdC1saXN0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlLnNlYXJjaFJlc3VsdHMubWFwKChjdXJyLCBpKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gPGxpIG9uQ2xpY2s9e3RoaXMuYWRkQ3JpdGVyaWEuYmluZCh0aGlzLCBjdXJyKX0ga2V5PXtpfT48YT57Y3Vyci5uYW1lfTwvYT48L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9zZWN0aW9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgOiAodGhpcy5wcm9wcy5jaGVja0ZvckxvYWQgPyB0aGlzLnByb3BzLmNoaWxkcmVuIDogPExvYWRlciAvPilcblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBDcml0ZXJpYVNlYXJjaFZpZXdcbiIsImltcG9ydCBDcml0ZXJpYVNlYXJjaFZpZXcgZnJvbSAnLi9Dcml0ZXJpYVNlYXJjaFZpZXcuanMnXG5cbmV4cG9ydCBkZWZhdWx0IENyaXRlcmlhU2VhcmNoVmlldyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmNsYXNzIE90cFZlcmlmeVZpZXcgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgICAgICB0aGlzLnN0YXRlID0ge1xuXG4gICAgICAgIH1cblxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnByb3BzKVxuICAgICAgICBkZWJ1Z2dlclxuICAgIH1cblxuICAgIGlucHV0SGFuZGxlcihlKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBbZS50YXJnZXQubmFtZV06IGUudGFyZ2V0LnZhbHVlIH0pXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IE90cFZlcmlmeVZpZXdcbiIsImltcG9ydCBPdHBWZXJpZnkgZnJvbSAnLi9PdHBWZXJpZnknXG5cbmV4cG9ydCBkZWZhdWx0IE90cFZlcmlmeSIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgRW1vdGlJY29uIGZyb20gJ21hdGVyaWFsLXVpLWljb25zL0FjY291bnRDaXJjbGUnO1xuXG5jbGFzcyBQcm9maWxlU2xpZGVyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICB9XG5cbiAgICBzd2l0Y2hVc2VyKHByb2ZpbGVJZCkge1xuICAgICAgICB0aGlzLmNvbnRleHQucm91dGVyLmhpc3RvcnkucHVzaChgL3VzZXIvJHtwcm9maWxlSWR9JHt0aGlzLnByb3BzLnN1YlJvdXRlfWApXG5cbiAgICB9XG5cbiAgICBzdGF0aWMgY29udGV4dFR5cGVzID0ge1xuICAgICAgICByb3V0ZXI6ICgpID0+IG51bGxcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgbGV0IHByb2ZpbGVzID0gW11cblxuICAgICAgICBwcm9maWxlcyA9IE9iamVjdC5rZXlzKHRoaXMucHJvcHMucHJvZmlsZXMpLm1hcCgocHJvZmlsZUlkLCBpKSA9PiB7XG4gICAgICAgICAgICBsZXQgc3JjID0gdGhpcy5wcm9wcy5wcm9maWxlc1twcm9maWxlSWRdLnByb2ZpbGVJbWFnZSB8fCBcImh0dHBzOi8vd3d3LmF0b21peC5jb20uYXUvbWVkaWEvMjAxNS8wNi9hdG9taXhfdXNlcjMxLnBuZ1wiXG4gICAgICAgICAgICByZXR1cm4gPGRpdiBrZXk9e2l9IGNsYXNzTmFtZT1cInNsaWRlVGlsZVwiIG9uQ2xpY2s9e3RoaXMuc3dpdGNoVXNlci5iaW5kKHRoaXMsIHByb2ZpbGVJZCl9PlxuICAgICAgICAgICAgICAgIDxpbWcgY2xhc3NOYW1lPVwicHJvZmlsZUNhcmRJbWFnZVwiIHNyYz17c3JjfS8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgfSlcblxuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInByb2ZpbGVTbGlkZXJcIj5cbiAgICAgICAgICAgICAgICB7cHJvZmlsZXN9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgUHJvZmlsZVNsaWRlclxuIiwiaW1wb3J0IFByb2ZpbGVTbGlkZXIgZnJvbSAnLi9Qcm9maWxlU2xpZGVyLmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBQcm9maWxlU2xpZGVyIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IHsgZ2V0VGltZSwgZ2V0RGF5TmFtZSB9IGZyb20gJy4uLy4uLy4uL3V0aWxzL2RhdGVUaW1lVXRpbHMuanMnXG5cbmNvbnN0IERBWVNfVE9fU0hPVyA9IDIwXG5jb25zdCBXRUVLX0RBWVMgPSBbJ1MnLCAnTScsICdUJywgJ1cnLCAnVCcsICdGJywgJ1MnXVxuY29uc3QgTU9OVEhTID0gWydKYW4nLCAnRmViJywgJ01hcicsICdBcHJpbCcsICdNYXknLCAnSnVuZScsICdKdWx5JywgJ0F1ZycsICdTZXB0JywgJ09jdCcsICdOb3YnLCAnRGVjJ11cblxuY2xhc3MgVGltZVNsb3RTZWxlY3RvciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgICB0aW1lU2VyaWVzOiBbXSxcbiAgICAgICAgICAgIHNlbGVjdGVkTW9udGg6IFwiXCIsXG4gICAgICAgICAgICBzZWxlY3RlZERheTogXCJcIlxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIHRoaXMuZ2VuZXJhdGVEYXlzKClcbiAgICB9XG5cbiAgICBnZW5lcmF0ZURheXMoKSB7XG4gICAgICAgIGxldCBkYXlzID0gW11cblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IERBWVNfVE9fU0hPVzsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgb2Zmc2V0RGF5ID0gbmV3IERhdGUoKVxuICAgICAgICAgICAgb2Zmc2V0RGF5LnNldERhdGUob2Zmc2V0RGF5LmdldERhdGUoKSArIGkpXG4gICAgICAgICAgICBsZXQgd2Vla0RheSA9IG9mZnNldERheS5nZXREYXkoKVxuXG4gICAgICAgICAgICBkYXlzLnB1c2goe1xuICAgICAgICAgICAgICAgIHRhZzogV0VFS19EQVlTW3dlZWtEYXldLFxuICAgICAgICAgICAgICAgIGRhdGVOdW1iZXI6IG9mZnNldERheS5nZXREYXRlKCksXG4gICAgICAgICAgICAgICAgYWN0dWFsRGF0ZTogb2Zmc2V0RGF5LFxuICAgICAgICAgICAgICAgIG1vbnRoOiBNT05USFNbb2Zmc2V0RGF5LmdldE1vbnRoKCldXG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICB0aW1lU2VyaWVzOiBkYXlzLFxuICAgICAgICAgICAgc2VsZWN0ZWREYXk6IGRheXNbMF0sXG4gICAgICAgICAgICBzZWxlY3RlZE1vbnRoOiBkYXlzWzBdLm1vbnRoXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgc2VsZWN0RGF5KGRheSkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHsgc2VsZWN0ZWREYXk6IGRheSB9KVxuICAgIH1cblxuICAgIHNlbGVjdE1vbnRoKG1vbnRoLGUpe1xuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBzZWxlY3RlZE1vbnRoOiBtb250aCB9KVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgbGV0IHNlbGVjdGVkU2NoZWR1bGUgPSB7IDA6IFtdLCAxOiBbXSwgMjogW10gfVxuICAgICAgICBpZiAodGhpcy5zdGF0ZS5zZWxlY3RlZERheSAmJiB0aGlzLnN0YXRlLnNlbGVjdGVkRGF5LmFjdHVhbERhdGUpIHtcbiAgICAgICAgICAgIGxldCB3ZWVrRGF5TnVtYmVyID0gdGhpcy5zdGF0ZS5zZWxlY3RlZERheS5hY3R1YWxEYXRlLmdldERheSgpXG4gICAgICAgICAgICBzZWxlY3RlZFNjaGVkdWxlID0gdGhpcy5wcm9wcy50aW1lU2xvdHNbd2Vla0RheU51bWJlcl0udGltaW5nXG4gICAgICAgIH1cblxuICAgICAgICAvLyBsZXQgbW9udGhOdW0gPSAobmV3IERhdGUpLmdldE1vbnRoKClcbiAgICAgICAgbGV0IHRoaXNNb250aCA9IE1PTlRIU1sobmV3IERhdGUpLmdldE1vbnRoKCldXG4gICAgICAgIGxldCBuZXh0TW9udGggPSBNT05USFNbKG5ldyBEYXRlKS5nZXRNb250aCgpKzFdXG4gICAgICAgIFxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIndpZGdldCBuby1zaGFkb3cgbm8tcm91bmQgc2tpbi10cmFuc3BhcmVudFwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIndpZGdldC1jb250ZW50XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkZC1uZXctdGltZSBtcmItMTBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDQgY2xhc3NOYW1lPVwidGV4dC1tZCBmdy03MDAgbXJiLTEwXCI+U2VsZWN0IERhdGUgJmFtcDsgVGltZTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBvbkNsaWNrPXt0aGlzLnNlbGVjdE1vbnRoLmJpbmQodGhpcyx0aGlzTW9udGgpfSBjbGFzc05hbWU9e1wiZmxvYXQtcmlnaHQgdGV4dC1tZCBmdy03MDAgdGV4dC1cIiArICh0aGlzTW9udGggPT09IHRoaXMuc3RhdGUuc2VsZWN0ZWRNb250aCA/IFwicHJpbWFyeVwiIDogXCJsaWdodFwiKX0+e3RoaXNNb250aH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBvbkNsaWNrPXt0aGlzLnNlbGVjdE1vbnRoLmJpbmQodGhpcyxuZXh0TW9udGgpfSBjbGFzc05hbWU9e1widGV4dC1cIiArIChuZXh0TW9udGggPT09IHRoaXMuc3RhdGUuc2VsZWN0ZWRNb250aCA/IFwicHJpbWFyeVwiIDogXCJsaWdodFwiKX0+e25leHRNb250aH08L3NwYW4+PC9zcGFuPjwvaDQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjaG9vc2UtdGltZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dWwgY2xhc3NOYW1lPVwiaW5saW5lLWxpc3QgZGF0ZXRpbWUtaXRlbXNcIj5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUudGltZVNlcmllcy5maWx0ZXIoKHRzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cy5tb250aCA9PT0gdGhpcy5zdGF0ZS5zZWxlY3RlZE1vbnRoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkubWFwKCh0cywgaSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gPGxpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e3RoaXMuc3RhdGUuc2VsZWN0ZWREYXkgPT0gdHMgPyAnYWN0aXZlJyA6IFwiXCJ9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk9e2l9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLnNlbGVjdERheS5iaW5kKHRoaXMsIHRzKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3RzLmRhdGVOdW1iZXJ9IDxzcGFuPnt0cy50YWd9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIndpZGdldFwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIndpZGdldC1jb250ZW50XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aDQgY2xhc3NOYW1lPVwicmVwb3J0LW9uIG1yYi0xMFwiPk1vcm5pbmc8L2g0PlxuICAgICAgICAgICAgICAgICAgICAgICAgPHVsIGNsYXNzTmFtZT1cImlubGluZS1saXN0IHRpbWUtaXRlbXNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkU2NoZWR1bGVbMF0ubWFwKCh0aW1lLCBpKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gPGxpIGtleT17aX0+PGEgaHJlZj1cIlwiIGNsYXNzTmFtZT1cInYtYnRuIHYtYnRuLXByaW1hcnkgYnRuLXNtIG91dGxpbmVcIj57dGltZVsxXX0gPC9hPjwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxoNCBjbGFzc05hbWU9XCJyZXBvcnQtb24gbXJiLTEwXCI+QWZ0ZXJub29uPC9oND5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx1bCBjbGFzc05hbWU9XCJpbmxpbmUtbGlzdCB0aW1lLWl0ZW1zXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZFNjaGVkdWxlWzFdLm1hcCgodGltZSwgaSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDxsaSBrZXk9e2l9PjxhIGhyZWY9XCJcIiBjbGFzc05hbWU9XCJ2LWJ0biB2LWJ0bi1wcmltYXJ5IGJ0bi1zbSBvdXRsaW5lXCI+e3RpbWVbMV19IDwvYT48L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aDQgY2xhc3NOYW1lPVwicmVwb3J0LW9uIG1yYi0xMFwiPkV2ZW5pbmc8L2g0PlxuICAgICAgICAgICAgICAgICAgICAgICAgPHVsIGNsYXNzTmFtZT1cImlubGluZS1saXN0IHRpbWUtaXRlbXNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkU2NoZWR1bGVbMl0ubWFwKCh0aW1lLCBpKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gPGxpIGtleT17aX0+PGEgaHJlZj1cIlwiIGNsYXNzTmFtZT1cInYtYnRuIHYtYnRuLXByaW1hcnkgYnRuLXNtIG91dGxpbmVcIj57dGltZVsxXX0gPC9hPjwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgVGltZVNsb3RTZWxlY3RvclxuIiwiaW1wb3J0IFRpbWVTbG90U2VsZWN0b3IgZnJvbSAnLi9UaW1lU2xvdFNlbGVjdG9yLmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBUaW1lU2xvdFNlbGVjdG9yIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IFByb2ZpbGVTbGlkZXIgZnJvbSAnLi4vcHJvZmlsZVNsaWRlci9pbmRleC5qcydcbmltcG9ydCBBcHBvaW50bWVudExpc3QgZnJvbSAnLi9hcHBvaW50bWVudExpc3QvaW5kZXguanMnXG5cbmNsYXNzIFVzZXJBcHBvaW50bWVudHNWaWV3IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcblxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIHRoaXMucHJvcHMuZ2V0VXNlclByb2ZpbGVXaXRoQXBwb2ludG1lbnRzKClcbiAgICB9XG5cbiAgICBzdGF0aWMgY29udGV4dFR5cGVzID0ge1xuICAgICAgICByb3V0ZXI6ICgpID0+IG51bGxcbiAgICB9XG5cbiAgICBjb21wYXJlRGF0ZVdpdGhUb2RheShkYXRlKXtcbiAgICAgICAgbGV0IHRvZGF5ID0gbmV3IERhdGUoKS5nZXRUaW1lKClcbiAgICAgICAgZGF0ZSA9IG5ldyBEYXRlKGRhdGUpLmdldFRpbWUoKVxuICAgICAgICByZXR1cm4gdG9kYXkgPiBkYXRlXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIGxldCBzZWxlY3RlZFVzZXIgPSBudWxsXG4gICAgICAgIGxldCB1c2VyUHJvZmlsZUlkID0gdGhpcy5wcm9wcy5tYXRjaC5wYXJhbXMuaWRcblxuICAgICAgICBpZiAodGhpcy5wcm9wcy5VU0VSLnByb2ZpbGVzW3VzZXJQcm9maWxlSWRdKSB7XG4gICAgICAgICAgICBzZWxlY3RlZFVzZXIgPSB0aGlzLnByb3BzLlVTRVIucHJvZmlsZXNbdXNlclByb2ZpbGVJZF1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIE9iamVjdC5rZXlzKHRoaXMucHJvcHMuVVNFUi5wcm9maWxlcykubWFwKChwcm9maWxlSWQpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5wcm9wcy5VU0VSLnByb2ZpbGVzW3Byb2ZpbGVJZF0uaXNEZWZhdWx0VXNlcikge1xuICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZFVzZXIgPSB0aGlzLnByb3BzLlVTRVIucHJvZmlsZXNbcHJvZmlsZUlkXVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ1c2VyUHJvZmlsZVwiPlxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgKCBzZWxlY3RlZFVzZXIgJiYgc2VsZWN0ZWRVc2VyLmFwcG9pbnRtZW50cyApID8gPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxQcm9maWxlU2xpZGVyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvZmlsZXM9e3RoaXMucHJvcHMuVVNFUi5wcm9maWxlc31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWJSb3V0ZT1cIi9hcHBvaW50bWVudHNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInVwY29taW5nYXBwXCI+VXBjb21pbmcgT1BEIEFwcG9pbnRtZW50czwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZFVzZXIuYXBwb2ludG1lbnRzLmZpbHRlcigoYXBwb2ludG1lbnQsaSkgPT57XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkYXRlID0gYXBwb2ludG1lbnQuc2xvdCA/IGFwcG9pbnRtZW50LnNsb3Quc3RhcnQgOiAwXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAhdGhpcy5jb21wYXJlRGF0ZVdpdGhUb2RheShkYXRlKSBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KS5tYXAoKGFwcG9pbnRtZW50LCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gPEFwcG9pbnRtZW50TGlzdCBrZXk9e2luZGV4fSBkYXRhPXthcHBvaW50bWVudH0gLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwicHJldmFwcFwiPlByZXZpb3VzIE9QRCBBcHBvaW50bWVudHM8L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRVc2VyLmFwcG9pbnRtZW50cy5maWx0ZXIoKGFwcG9pbnRtZW50LGkpID0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZGF0ZSA9IGFwcG9pbnRtZW50LnNsb3QgPyBhcHBvaW50bWVudC5zbG90LnN0YXJ0IDogMFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jb21wYXJlRGF0ZVdpdGhUb2RheShkYXRlKSBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KS5tYXAoKGFwcG9pbnRtZW50LCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gPEFwcG9pbnRtZW50TGlzdCBrZXk9e2luZGV4fSBkYXRhPXthcHBvaW50bWVudH0gLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj4gOiBcIlwiXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgVXNlckFwcG9pbnRtZW50c1ZpZXdcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUmlnaHRBcnJvd0ljb24gZnJvbSAnbWF0ZXJpYWwtdWktaWNvbnMvS2V5Ym9hcmRBcnJvd1JpZ2h0JztcblxuY2xhc3MgQXBwb2ludG1lbnRMaXN0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICB9XG5cbiAgICBnZXRUaW1lKHVuaXhfdGltZXN0YW1wKSB7XG4gICAgICAgIHZhciBkYXRlID0gbmV3IERhdGUodW5peF90aW1lc3RhbXAgKiAxMDAwKTtcbiAgICAgICAgdmFyIGhvdXJzID0gZGF0ZS5nZXRIb3VycygpO1xuICAgICAgICB2YXIgbWludXRlcyA9IFwiMFwiICsgZGF0ZS5nZXRNaW51dGVzKCk7XG4gICAgICAgIHJldHVybiBob3VycyArICc6JyArIG1pbnV0ZXMuc3Vic3RyKC0yKVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICBsZXQgeyBkb2N0b3JOYW1lLCBzbG90IH0gPSB0aGlzLnByb3BzLmRhdGFcbiAgICAgICAgc2xvdCA9IHNsb3QgfHwge1xuICAgICAgICAgICAgc3RhcnQ6IDAsXG4gICAgICAgICAgICBlbmQ6IDBcbiAgICAgICAgfVxuICAgICAgICBsZXQgZGF0ZSA9IG5ldyBEYXRlKHNsb3Quc3RhcnQpLnRvRGF0ZVN0cmluZygpXG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYXBwb2ludG1lbnRcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm5hbWVcIj5cblxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZGV0YWlsc1wiPlxuICAgICAgICAgICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtkb2N0b3JOYW1lfVxuICAgICAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgICAgIDxwPlxuICAgICAgICAgICAgICAgICAgICAgICAge2RhdGV9XG4gICAgICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICAgICAgPHA+XG4gICAgICAgICAgICAgICAgICAgICAgICB7dGhpcy5nZXRUaW1lKHNsb3Quc3RhcnQpICsgXCIgdG8gXCIgKyB0aGlzLmdldFRpbWUoc2xvdC5lbmQpfVxuICAgICAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJib29rXCI+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHRcIj5WaWV3IENvbmZpcm1hdGlvbjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPFJpZ2h0QXJyb3dJY29uIGNsYXNzTmFtZT1cImJvb2tJY29uXCIgLz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBBcHBvaW50bWVudExpc3RcbiIsImltcG9ydCBBcHBvaW50bWVudExpc3QgZnJvbSAnLi9BcHBvaW50bWVudExpc3QuanMnXG5cbmV4cG9ydCBkZWZhdWx0IEFwcG9pbnRtZW50TGlzdCIsImltcG9ydCBVc2VyQXBwb2ludG1lbnRzVmlldyBmcm9tICcuL1VzZXJBcHBvaW50bWVudHNWaWV3LmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBVc2VyQXBwb2ludG1lbnRzVmlldyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCBQcm9maWxlU2xpZGVyIGZyb20gJy4uL3Byb2ZpbGVTbGlkZXIvaW5kZXguanMnXG5pbXBvcnQgUHJvZmlsZURhdGEgZnJvbSAnLi9wcm9maWxlRGF0YS9pbmRleC5qcydcblxuY2xhc3MgVXNlclByb2ZpbGVWaWV3IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcblxuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgICB0aGlzLnByb3BzLmdldFVzZXJQcm9maWxlKClcbiAgICB9XG5cbiAgICBzdGF0aWMgY29udGV4dFR5cGVzID0ge1xuICAgICAgICByb3V0ZXI6ICgpID0+IG51bGxcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgbGV0IHNlbGVjdGVkVXNlciA9IG51bGxcbiAgICAgICAgbGV0IHVzZXJQcm9maWxlSWQgPSB0aGlzLnByb3BzLm1hdGNoLnBhcmFtcy5pZFxuXG4gICAgICAgIGlmICh0aGlzLnByb3BzLlVTRVIucHJvZmlsZXNbdXNlclByb2ZpbGVJZF0pIHtcbiAgICAgICAgICAgIHNlbGVjdGVkVXNlciA9IHRoaXMucHJvcHMuVVNFUi5wcm9maWxlc1t1c2VyUHJvZmlsZUlkXVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgT2JqZWN0LmtleXModGhpcy5wcm9wcy5VU0VSLnByb2ZpbGVzKS5tYXAoKHByb2ZpbGVJZCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnByb3BzLlVTRVIucHJvZmlsZXNbcHJvZmlsZUlkXS5pc0RlZmF1bHRVc2VyKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkVXNlciA9IHRoaXMucHJvcHMuVVNFUi5wcm9maWxlc1twcm9maWxlSWRdXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidXNlclByb2ZpbGVcIj5cbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkVXNlciA/IDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8UHJvZmlsZVNsaWRlciBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9maWxlcz17dGhpcy5wcm9wcy5VU0VSLnByb2ZpbGVzfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1YlJvdXRlPVwiXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8UHJvZmlsZURhdGEgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvZmlsZURhdGE9e3NlbGVjdGVkVXNlcn1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PiA6IFwiXCJcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBVc2VyUHJvZmlsZVZpZXdcbiIsImltcG9ydCBVc2VyUHJvZmlsZVZpZXcgZnJvbSAnLi9Vc2VyUHJvZmlsZVZpZXcuanMnXG5cbmV4cG9ydCBkZWZhdWx0IFVzZXJQcm9maWxlVmlldyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmNsYXNzIFByb2ZpbGVEYXRhIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICB9XG5cbiAgICBvcGVuQXBwb2ludG1lbnRzKHByb2ZpbGVJZCkge1xuICAgICAgICB0aGlzLmNvbnRleHQucm91dGVyLmhpc3RvcnkucHVzaChgL3VzZXIvJHtwcm9maWxlSWR9L2FwcG9pbnRtZW50c2ApXG5cbiAgICB9XG5cbiAgICBvcGVuUmVwb3J0cyhwcm9maWxlSWQpIHtcbiAgICAgICAgdGhpcy5jb250ZXh0LnJvdXRlci5oaXN0b3J5LnB1c2goYC91c2VyLyR7cHJvZmlsZUlkfS9yZXBvcnRzYClcblxuICAgIH1cblxuICAgIHN0YXRpYyBjb250ZXh0VHlwZXMgPSB7XG4gICAgICAgIHJvdXRlcjogKCkgPT4gbnVsbFxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICBsZXQge25hbWUsIGdlbmRlciwgYWdlLCBtb2JpbGUsIG1lZGljYWxIaXN0b3J5Q291bnQsIG1lZGljYWxUZXN0Q291bnQsIG9ubGluZUNvbnN1bHRhdGlvbkNvdW50LCBvcGRWaXNpdENvdW50LCBwcm9maWxlSWR9ID0gdGhpcy5wcm9wcy5wcm9maWxlRGF0YVxuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2PiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInVzZXJEZWFpbFwiPlxuICAgICAgICAgICAgICAgICAgICA8cD57bmFtZX08L3A+XG4gICAgICAgICAgICAgICAgICAgIDxwPnthZ2V9IFllYXJzPC9wPlxuICAgICAgICAgICAgICAgICAgICA8cD57Z2VuZGVyfTwvcD5cbiAgICAgICAgICAgICAgICAgICAgPHA+e21vYmlsZX08L3A+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwcm9maWxlQnRuc1wiPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uPlByb2ZpbGUgTm90IFZlcmlmaWVkPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24+Tm8gT1BEIEluc3VyYW5jZTwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uPk9ubGluZSBDb25zdWx0YXRpb25zKHtvbmxpbmVDb25zdWx0YXRpb25Db3VudH0pPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gb25DbGljaz17dGhpcy5vcGVuQXBwb2ludG1lbnRzLmJpbmQodGhpcyxwcm9maWxlSWQpfT5PUEQgVmlzaXRzICh7b3BkVmlzaXRDb3VudH0pPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24+TWVkaWNhbCBIaXN0b3J5ICh7bWVkaWNhbEhpc3RvcnlDb3VudH0pPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gb25DbGljaz17dGhpcy5vcGVuUmVwb3J0cy5iaW5kKHRoaXMscHJvZmlsZUlkKX0+VGVzdCBSZXBvcnRzICh7bWVkaWNhbFRlc3RDb3VudH0pPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgUHJvZmlsZURhdGFcbiIsImltcG9ydCBQcm9maWxlRGF0YSBmcm9tICcuL1Byb2ZpbGVEYXRhLmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBQcm9maWxlRGF0YSIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCBQcm9maWxlU2xpZGVyIGZyb20gJy4uL3Byb2ZpbGVTbGlkZXIvaW5kZXguanMnXG5pbXBvcnQgUmVwb3J0TGlzdCBmcm9tICcuL3JlcG9ydExpc3QvaW5kZXguanMnXG5cbmNsYXNzIFVzZXJSZXBvcnRzVmlldyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG5cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgICB0aGlzLnByb3BzLmdldFVzZXJQcm9maWxlV2l0aFRlc3RzKClcbiAgICB9XG5cbiAgICBzdGF0aWMgY29udGV4dFR5cGVzID0ge1xuICAgICAgICByb3V0ZXI6ICgpID0+IG51bGxcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgbGV0IHNlbGVjdGVkVXNlciA9IG51bGxcbiAgICAgICAgbGV0IHVzZXJQcm9maWxlSWQgPSB0aGlzLnByb3BzLm1hdGNoLnBhcmFtcy5pZFxuXG4gICAgICAgIGlmICh0aGlzLnByb3BzLlVTRVIucHJvZmlsZXNbdXNlclByb2ZpbGVJZF0pIHtcbiAgICAgICAgICAgIHNlbGVjdGVkVXNlciA9IHRoaXMucHJvcHMuVVNFUi5wcm9maWxlc1t1c2VyUHJvZmlsZUlkXVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gc2VsZWN0aW5nIGRlZmF1bHQgdXNlclxuICAgICAgICAgICAgT2JqZWN0LmtleXModGhpcy5wcm9wcy5VU0VSLnByb2ZpbGVzKS5tYXAoKHByb2ZpbGVJZCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnByb3BzLlVTRVIucHJvZmlsZXNbcHJvZmlsZUlkXS5pc0RlZmF1bHRVc2VyKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkVXNlciA9IHRoaXMucHJvcHMuVVNFUi5wcm9maWxlc1twcm9maWxlSWRdXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInVzZXJQcm9maWxlXCI+XG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAoc2VsZWN0ZWRVc2VyICYmIHNlbGVjdGVkVXNlci50ZXN0cykgPyA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPFByb2ZpbGVTbGlkZXJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9maWxlcz17dGhpcy5wcm9wcy5VU0VSLnByb2ZpbGVzfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1YlJvdXRlPVwiL3JlcG9ydHNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInVwY29taW5nYXBwXCI+UmVwb3J0czwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZFVzZXIudGVzdHMubWFwKCh0ZXN0LCBpKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiA8UmVwb3J0TGlzdFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YT17dGVzdH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleT17aX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PiA6IFwiXCJcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBVc2VyUmVwb3J0c1ZpZXdcbiIsImltcG9ydCBVc2VyUmVwb3J0c1ZpZXcgZnJvbSAnLi9Vc2VyUmVwb3J0c1ZpZXcuanMnXG5cbmV4cG9ydCBkZWZhdWx0IFVzZXJSZXBvcnRzVmlldyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmNsYXNzIFJlcG9ydExpc3QgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgIH1cblxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIGxldCB7IG5hbWUsIHN1Yl9uYW1lLCBhYmJyZXZpYXRpb24sIGNhdGVnb3J5LCBzbG90ICB9ID0gdGhpcy5wcm9wcy5kYXRhXG4gICAgICAgIHNsb3QgPSBzbG90IHx8IHtcbiAgICAgICAgICAgIHN0YXJ0OiAwLFxuICAgICAgICAgICAgZW5kOiAwXG4gICAgICAgIH1cbiAgICAgICAgbGV0IGRhdGUgPSBuZXcgRGF0ZShzbG90LnN0YXJ0KS50b0RhdGVTdHJpbmcoKVxuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFwcG9pbnRtZW50XCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJkZXRhaWxzXCI+XG4gICAgICAgICAgICAgICAgICAgIDxwPlxuICAgICAgICAgICAgICAgICAgICAgICAge25hbWUgKyBcIiAsIFwiICsgc3ViX25hbWV9XG4gICAgICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICAgICAgPHA+XG4gICAgICAgICAgICAgICAgICAgICAgICB7Y2F0ZWdvcnkgKyBcIiAsIFwiICsgYWJicmV2aWF0aW9ufVxuICAgICAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgICAgIDxwPlxuICAgICAgICAgICAgICAgICAgICAgICAge2RhdGV9XG4gICAgICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJvb2tcIj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidmlld3JlcG9ydFwiPlZpZXcgUmVwb3J0PC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IFJlcG9ydExpc3RcbiIsImltcG9ydCBSZXBvcnRMaXN0IGZyb20gJy4vUmVwb3J0TGlzdC5qcydcblxuZXhwb3J0IGRlZmF1bHQgUmVwb3J0TGlzdCIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmNsYXNzIFVzZXJTaWdudXBWaWV3IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIGFwcG9pbm1lbnRGb3I6ICdzZWxmJyxcbiAgICAgICAgICAgIHBhdGllbnROYW1lOiAnJyxcbiAgICAgICAgICAgIGFnZTogJycsXG4gICAgICAgICAgICBnZW5kZXI6ICdtJyxcbiAgICAgICAgICAgIGVtYWlsOiAnJyxcbiAgICAgICAgICAgIHBob25lTnVtYmVyOiAnJ1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaW5wdXRIYW5kbGVyKGUpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IFtlLnRhcmdldC5uYW1lXTogZS50YXJnZXQudmFsdWUgfSlcbiAgICB9XG5cbiAgICBzdWJtaXRGb3JtKCkge1xuXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIDxoZWFkZXIgY2xhc3NOYW1lPVwic2tpbi13aGl0ZSBmaXhlZCBob3Jpem9udGFsIHRvcCBiZHItMSBib3R0b20gbGlnaHRcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250YWluZXItZmx1aWRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtMlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dWwgY2xhc3NOYW1lPVwiaW5saW5lLWxpc3RcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaT48c3BhbiBjbGFzc05hbWU9XCJpY29uIGljb24tc20gdGV4dC1taWRkbGUgYmFjay1pY29uLXdoaXRlXCI+PGltZyBzcmM9XCIvYXNzZXRzL2ltZy9jdXN0b21lci1pY29ucy9iYWNrLWljb24ucG5nXCIgY2xhc3NOYW1lPVwiaW1nLWZsdWlkXCIgLz48L3NwYW4+PC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC04XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaGVhZGVyLXRpdGxlIGZ3LTcwMCBjYXBpdGFsaXplIHRleHQtY2VudGVyXCI+QWRkIFVzZXIgUHJvZmlsZTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLTJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2hlYWRlcj5cblxuICAgICAgICAgICAgICAgIDxzZWN0aW9uIGNsYXNzTmFtZT1cIndyYXAgdmFsaWRhdGlvbi1ib29rLXNjcmVlblwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIndpZGdldCBuby1yb3VuZCBuby1zaGFkb3dcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwid2lkZ2V0LWhlYWRlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoNCBjbGFzc05hbWU9XCJ3aWRnZXQtdGl0bGVcIj5Db250YWN0IERldGFpbHM8L2g0PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIndpZGdldC1jb250ZW50XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGZvcm0gY2xhc3NOYW1lPVwiZ28tYm90dG9tXCIgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXAgaW5wdXQtZ3JvdXBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJpbmxpbmUgaW5wdXQtbGFiZWxcIj5BcHBvaW50bWVudCBmb3I8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjaG9vc2UtZ2VuZGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cInJhZGlvLWlubGluZVwiPjxpbnB1dCB2YWx1ZT17J3NlbGYnfSBvbkNoYW5nZT17dGhpcy5pbnB1dEhhbmRsZXIuYmluZCh0aGlzKX0gY2hlY2tlZD17dGhpcy5zdGF0ZS5hcHBvaW5tZW50Rm9yID09ICdzZWxmJ30gdHlwZT1cInJhZGlvXCIgbmFtZT1cImFwcG9pbm1lbnRGb3JcIiAvPlNlbGY8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJyYWRpby1pbmxpbmVcIj48aW5wdXQgdmFsdWU9eydlbHNlJ30gb25DaGFuZ2U9e3RoaXMuaW5wdXRIYW5kbGVyLmJpbmQodGhpcyl9IGNoZWNrZWQ9e3RoaXMuc3RhdGUuYXBwb2lubWVudEZvciA9PSAnZWxzZSd9IHR5cGU9XCJyYWRpb1wiIG5hbWU9XCJhcHBvaW5tZW50Rm9yXCIgLz5Tb21lb25lIGVsc2U8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxhYmVsV3JhcFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IGlkPVwiZm5hbWVcIiBuYW1lPVwicGF0aWVudE5hbWVcIiB0eXBlPVwidGV4dFwiIHZhbHVlPXt0aGlzLnN0YXRlLnBhdGllbnROYW1lfSBvbkNoYW5nZT17dGhpcy5pbnB1dEhhbmRsZXIuYmluZCh0aGlzKX0gcmVxdWlyZWQgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBodG1sRm9yPVwiZm5hbWVcIj5QYXRpZW50IE5hbWU8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC14cyB0ZXh0LWxpZ2h0XCI+KEFwcG9pbm1lbnQgdmFsaWQgb25seSBmb3IgdGhlIHByb3ZpZGVkIG5hbWUpPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsYWJlbFdyYXBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCBpZD1cImFnZVwiIG5hbWU9XCJhZ2VcIiB0eXBlPVwidGV4dFwiIHZhbHVlPXt0aGlzLnN0YXRlLmFnZX0gb25DaGFuZ2U9e3RoaXMuaW5wdXRIYW5kbGVyLmJpbmQodGhpcyl9IHJlcXVpcmVkIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgaHRtbEZvcj1cImFnZVwiPkFnZTwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXAgaW5wdXQtZ3JvdXBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJpbmxpbmUgaW5wdXQtbGFiZWxcIj5HZW5kZXI8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjaG9vc2UtZ2VuZGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cInJhZGlvLWlubGluZVwiPjxpbnB1dCB2YWx1ZT17J20nfSBvbkNoYW5nZT17dGhpcy5pbnB1dEhhbmRsZXIuYmluZCh0aGlzKX0gY2hlY2tlZD17dGhpcy5zdGF0ZS5nZW5kZXIgPT0gJ20nfSB0eXBlPVwicmFkaW9cIiBuYW1lPVwiZ2VuZGVyXCIgLz5NYWxlPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwicmFkaW8taW5saW5lXCI+PGlucHV0IHZhbHVlPXsnZid9IG9uQ2hhbmdlPXt0aGlzLmlucHV0SGFuZGxlci5iaW5kKHRoaXMpfSBjaGVja2VkPXt0aGlzLnN0YXRlLmdlbmRlciA9PSAnZid9IHR5cGU9XCJyYWRpb1wiIG5hbWU9XCJnZW5kZXJcIiAvPkZlbWFsZTwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cInJhZGlvLWlubGluZVwiPjxpbnB1dCB2YWx1ZT17J28nfSBvbkNoYW5nZT17dGhpcy5pbnB1dEhhbmRsZXIuYmluZCh0aGlzKX0gY2hlY2tlZD17dGhpcy5zdGF0ZS5nZW5kZXIgPT0gJ28nfSB0eXBlPVwicmFkaW9cIiBuYW1lPVwiZ2VuZGVyXCIgLz5PdGhlcjwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibGFiZWxXcmFwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgaWQ9XCJlbWFpbFwiIG5hbWU9XCJlbWFpbFwiIHR5cGU9XCJ0ZXh0XCIgdmFsdWU9e3RoaXMuc3RhdGUuZW1haWx9IG9uQ2hhbmdlPXt0aGlzLmlucHV0SGFuZGxlci5iaW5kKHRoaXMpfSByZXF1aXJlZCAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGh0bWxGb3I9XCJlbWFpbFwiPkVtYWlsPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibGFiZWxXcmFwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgaWQ9XCJudW1iZXJcIiBuYW1lPVwicGhvbmVOdW1iZXJcIiB0eXBlPVwidGV4dFwiIHZhbHVlPXt0aGlzLnN0YXRlLnBob25lTnVtYmVyfSBvbkNoYW5nZT17dGhpcy5pbnB1dEhhbmRsZXIuYmluZCh0aGlzKX0gcmVxdWlyZWQgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBodG1sRm9yPVwibnVtYmVyXCI+TW9iaWxlIE51bWJlcjwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZm9ybT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L3NlY3Rpb24+XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJ2LWJ0biB2LWJ0bi1wcmltYXJ5IGJ0bi1sZyBmaXhlZCBob3Jpem9udGFsIGJvdHRvbSBuby1yb3VuZCBidG4tbGcgdGV4dC1sZ1wiIG9uQ2xpY2s9e3RoaXMuc3VibWl0Rm9ybS5iaW5kKHRoaXMpfT5Db250aW51ZTwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IFVzZXJTaWdudXBWaWV3XG4iLCJpbXBvcnQgVXNlclNpZ251cFZpZXcgZnJvbSAnLi9Vc2VyU2lnbnVwJ1xuXG5leHBvcnQgZGVmYXVsdCBVc2VyU2lnbnVwVmlldyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnXG5cbmltcG9ydCBMb2FkZXIgZnJvbSAnLi4vLi4vY29tbW9ucy9Mb2FkZXInXG5pbXBvcnQgVmlzaXRUaW1lIGZyb20gJy4vdmlzaXRUaW1lJ1xuaW1wb3J0IFBpY2t1cEFkZHJlc3MgZnJvbSAnLi9waWNrdXBBZGRyZXNzJ1xuaW1wb3J0IENob29zZVBhdGllbnQgZnJvbSAnLi9jaG9vc2VQYXRpZW50J1xuXG5jbGFzcyBCb29raW5nU3VtbWFyeVZpZXcgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgc2VsZWN0ZWRMYWI6IHRoaXMucHJvcHMubWF0Y2gucGFyYW1zLmlkLFxuICAgICAgICAgICAgcGlja3VwVHlwZTogXCJsYWJcIlxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIHRoaXMucHJvcHMuZ2V0TGFiQnlJZCh0aGlzLnN0YXRlLnNlbGVjdGVkTGFiKVxuICAgIH1cblxuICAgIG9wZW5UZXN0cygpIHtcbiAgICAgICAgdGhpcy5wcm9wcy5oaXN0b3J5LnB1c2goYC9sYWIvJHt0aGlzLnN0YXRlLnNlbGVjdGVkTGFifS90ZXN0c2ApXG4gICAgfVxuXG4gICAgaGFuZGxlUGlja3VwVHlwZShlKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBwaWNrdXBUeXBlOiBlLnRhcmdldC52YWx1ZSB9KVxuICAgIH1cblxuICAgIGdldFNlbGVjdG9ycygpIHtcbiAgICAgICAgc3dpdGNoICh0aGlzLnN0YXRlLnBpY2t1cFR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgXCJsYWJcIjoge1xuICAgICAgICAgICAgICAgIHJldHVybiA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICA8VmlzaXRUaW1lIHR5cGU9XCJsYWJcIi8+XG4gICAgICAgICAgICAgICAgICAgIDxDaG9vc2VQYXRpZW50IC8+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNhc2UgXCJob21lXCI6IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgPFZpc2l0VGltZSB0eXBlPVwiaG9tZVwiLz5cbiAgICAgICAgICAgICAgICAgICAgPENob29zZVBhdGllbnQgLz5cbiAgICAgICAgICAgICAgICAgICAgPFBpY2t1cEFkZHJlc3MgLz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIGxldCB0ZXN0cyA9IFtdXG4gICAgICAgIGxldCBmaW5hbFByaWNlID0gMFxuICAgICAgICBsZXQgbGFiRGV0YWlsID0ge31cblxuICAgICAgICBpZiAodGhpcy5wcm9wcy5MQUJTW3RoaXMuc3RhdGUuc2VsZWN0ZWRMYWJdKSB7XG4gICAgICAgICAgICBsYWJEZXRhaWwgPSB0aGlzLnByb3BzLkxBQlNbdGhpcy5zdGF0ZS5zZWxlY3RlZExhYl0ubGFiXG4gICAgICAgICAgICB0ZXN0cyA9IHRoaXMucHJvcHMuc2VsZWN0ZWRDcml0ZXJpYXMuZmlsdGVyKHggPT4geC50eXBlID09ICd0ZXN0JykubWFwKCh0ZXN0LCBpKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IHByaWNlID0gMFxuICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuTEFCU1t0aGlzLnN0YXRlLnNlbGVjdGVkTGFiXS50ZXN0cy5tYXAoKHR3cCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAodHdwLnRlc3RfaWQgPT0gdGVzdC5pZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcHJpY2UgPSB0d3AubXJwXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIGZpbmFsUHJpY2UgKz0gcHJpY2VcbiAgICAgICAgICAgICAgICByZXR1cm4gPHAga2V5PXtpfSBjbGFzc05hbWU9XCJ0ZXN0LWxpc3RcIj57dGVzdC5uYW1lfTxzcGFuIGNsYXNzTmFtZT1cImZsb2F0LXJpZ2h0IGZ3LTcwMFwiPlJzLiB7cHJpY2V9PC9zcGFuPjwvcD5cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICA8aGVhZGVyIGNsYXNzTmFtZT1cInNraW4td2hpdGUgZml4ZWQgaG9yaXpvbnRhbCB0b3AgYmRyLTEgYm90dG9tIGxpZ2h0XCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGFpbmVyLWZsdWlkXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLTJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHVsIGNsYXNzTmFtZT1cImlubGluZS1saXN0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGkgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuaGlzdG9yeS5nbygtMSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19PjxzcGFuIGNsYXNzTmFtZT1cImljb24gaWNvbi1zbSB0ZXh0LW1pZGRsZSBiYWNrLWljb24td2hpdGVcIj48aW1nIHNyYz1cIi9hc3NldHMvaW1nL2N1c3RvbWVyLWljb25zL2JhY2staWNvbi5wbmdcIiBjbGFzc05hbWU9XCJpbWctZmx1aWRcIiAvPjwvc3Bhbj48L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLThcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJoZWFkZXItdGl0bGUgZnctNzAwIGNhcGl0YWxpemUgdGV4dC1jZW50ZXJcIj5Cb29raW5nIENvbmZpcm1hdGlvbjwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLTJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgey8qIDx1bCBjbGFzcz1cImlubGluZS1saXN0IGZsb2F0LXJpZ2h0IHVzZXItbm90aWZpY2F0aW9uLWFjdGlvblwiPlxuXHRcdFx0XHRcdFx0PGxpPjxzcGFuIGNsYXNzPVwiaWNvbiBpY29uLW1kIHRleHQtbWlkZGxlXCI+PGltZyBzcmM9XCIvYXNzZXRzL2ltZy9jdXN0b21lci1pY29ucy91c2VyLnN2Z1wiIGNsYXNzPVwiaW1nLWZsdWlkXCI+PC9zcGFuPjwvbGk+XG5cdFx0XHRcdFx0XHQ8bGk+PHNwYW4gY2xhc3M9XCJpY29uIGljb24tbWQgdGV4dC1taWRkbGUgbm90aWZpY2F0aW9uLWljb25cIj48aW1nIHNyYz1cIi9hc3NldHMvaW1nL2N1c3RvbWVyLWljb25zL25vdGlmaWNhdGlvbi5zdmdcIiBjbGFzcz1cImltZy1mbHVpZFwiPiA8c3BhbiBjbGFzcz1cIm5vdGlmaWNhdGlvbi1hbGVydFwiPjwvc3Bhbj48L3NwYW4+PC9saT5cblx0XHRcdFx0XHQ8L3VsPiAqL31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2hlYWRlcj5cblxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5MQUJTW3RoaXMuc3RhdGUuc2VsZWN0ZWRMYWJdID9cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNlY3Rpb24gY2xhc3NOYW1lPVwid3JhcCBib29raW5nLWNvbmZpcm0tc2NyZWVuXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGFpbmVyLWZsdWlkXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLTEyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwid2lkZ2V0IG1ydC0xMFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3aWRnZXQtaGVhZGVyIGJkci0xIGJvdHRvbSBsaWdodCB0ZXh0LWNlbnRlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx1bCBjbGFzc05hbWU9XCJpbmxpbmUtbGlzdCBib29raW5nLXR5cGVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpPjxsYWJlbCBjbGFzc05hbWU9XCJyYWRpby1pbmxpbmUgdGV4dC1tZCBmdy03MDAgdGV4dC1wcmltYXJ5XCI+PGlucHV0IHR5cGU9XCJyYWRpb1wiIG5hbWU9XCJvcHRyYWRpb1wiIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZVBpY2t1cFR5cGUuYmluZCh0aGlzKX0gdmFsdWU9XCJob21lXCIgY2hlY2tlZD17dGhpcy5zdGF0ZS5waWNrdXBUeXBlID09ICdob21lJ30gLz4gSG9tZSBQaWNrLXVwPC9sYWJlbD48L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGk+PGxhYmVsIGNsYXNzTmFtZT1cInJhZGlvLWlubGluZSB0ZXh0LW1kIGZ3LTcwMCB0ZXh0LXByaW1hcnlcIj48aW5wdXQgdHlwZT1cInJhZGlvXCIgbmFtZT1cIm9wdHJhZGlvXCIgb25DaGFuZ2U9e3RoaXMuaGFuZGxlUGlja3VwVHlwZS5iaW5kKHRoaXMpfSB2YWx1ZT1cImxhYlwiIGNoZWNrZWQ9e3RoaXMuc3RhdGUucGlja3VwVHlwZSA9PSAnbGFiJ30gLz4gTGFiIFZpc2l0PC9sYWJlbD48L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwid2lkZ2V0LWNvbnRlbnRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxhYi1kZXRhaWxzXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbWcgc3JjPVwiL2Fzc2V0cy9pbWcvY3VzdG9tZXItaWNvbnMvbGFiMS5wbmdcIiBjbGFzc05hbWU9XCJpbWctZmx1aWRcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxhYi10aXRsZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGg0IGNsYXNzTmFtZT1cImZ3LTcwMCB0ZXh0LW1kIHRpdGxlXCI+e2xhYkRldGFpbC5uYW1lfTwvaDQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJmdy01MDAgdGV4dC1zbSB0ZXh0LWxpZ2h0XCI+e2xhYkRldGFpbC5hZGRyZXNzfTwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7dGhpcy5nZXRTZWxlY3RvcnMoKX1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibGFiLXZpc2l0LXRpbWUgdGVzdC1yZXBvcnRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGg0IGNsYXNzTmFtZT1cInRpdGxlXCI+PHNwYW4+PGltZyBzcmM9XCIvYXNzZXRzL2ltZy9jdXN0b21lci1pY29ucy90ZXN0LnN2Z1wiIC8+PC9zcGFuPlRlc3RzIDxzcGFuIGNsYXNzTmFtZT1cImZsb2F0LXJpZ2h0XCI+PGEgb25DbGljaz17dGhpcy5vcGVuVGVzdHMuYmluZCh0aGlzKX0gY2xhc3NOYW1lPVwidGV4dC1wcmltYXJ5IGZ3LTcwMCB0ZXh0LXNtXCI+Q2hhbmdlIFRlc3RzPC9hPjwvc3Bhbj48L2g0PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7dGVzdHN9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zZWN0aW9uPlxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJ2LWJ0biB2LWJ0bi1wcmltYXJ5IGJ0bi1sZyBmaXhlZCBob3Jpem9udGFsIGJvdHRvbSBuby1yb3VuZCBidG4tbGcgdGV4dC1sZ1wiPlByb2NlZWQgdG8gUGF5IFJzLiB7ZmluYWxQcmljZX08L2J1dHRvbj5cblxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+IDogPExvYWRlciAvPlxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IEJvb2tpbmdTdW1tYXJ5Vmlld1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuY2xhc3MgQ2hvb3NlUGF0aWVudCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG5cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsYWItdmlzaXQtdGltZVwiPlxuICAgICAgICAgICAgICAgIDxoNCBjbGFzc05hbWU9XCJ0aXRsZVwiPjxzcGFuPjxpbWcgc3JjPVwiL2Fzc2V0cy9pbWcvY3VzdG9tZXItaWNvbnMvY2xvY2suc3ZnXCIgLz48L3NwYW4+UGF0aWVudCBEZXRhaWxzIDxzcGFuIGNsYXNzTmFtZT1cImZsb2F0LXJpZ2h0XCI+PGEgaHJlZj1cIiNcIiBjbGFzc05hbWU9XCJ0ZXh0LXByaW1hcnkgZnctNzAwIHRleHQtc21cIj5QaWNrIFBhdGllbnQ8L2E+PC9zcGFuPjwvaDQ+XG4gICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwiZGF0ZS10aW1lXCI+RHVtbXkgVXNlcjwvcD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBDaG9vc2VQYXRpZW50XG4iLCJpbXBvcnQgQm9va2luZ1N1bW1hcnlWaWV3IGZyb20gJy4vQm9va2luZ1N1bW1hcnlWaWV3LmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBCb29raW5nU3VtbWFyeVZpZXciLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5jbGFzcyBQaWNrdXBBZGRyZXNzIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcblxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxhYi12aXNpdC10aW1lXCI+XG4gICAgICAgICAgICAgICAgPGg0IGNsYXNzTmFtZT1cInRpdGxlXCI+PHNwYW4+PGltZyBzcmM9XCIvYXNzZXRzL2ltZy9jdXN0b21lci1pY29ucy9jbG9jay5zdmdcIiAvPjwvc3Bhbj5QaWNrdXAgQWRkcmVzcyA8c3BhbiBjbGFzc05hbWU9XCJmbG9hdC1yaWdodFwiPjxhIGhyZWY9XCIjXCIgY2xhc3NOYW1lPVwidGV4dC1wcmltYXJ5IGZ3LTcwMCB0ZXh0LXNtXCI+Q2hhbmdlIEFkZHJlc3M8L2E+PC9zcGFuPjwvaDQ+XG4gICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwiZGF0ZS10aW1lXCI+MTh0aCBBcHJpbCB8IDM6MzAgUE08L3A+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgUGlja3VwQWRkcmVzc1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuY2xhc3MgVmlzaXRUaW1lIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcblxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxhYi12aXNpdC10aW1lXCI+XG4gICAgICAgICAgICAgICAgPGg0IGNsYXNzTmFtZT1cInRpdGxlXCI+PHNwYW4+PGltZyBzcmM9XCIvYXNzZXRzL2ltZy9jdXN0b21lci1pY29ucy9jbG9jay5zdmdcIiAvPjwvc3Bhbj5WaXNpdCB0aW1lIDxzcGFuIGNsYXNzTmFtZT1cImZsb2F0LXJpZ2h0XCI+PGEgaHJlZj1cIiNcIiBjbGFzc05hbWU9XCJ0ZXh0LXByaW1hcnkgZnctNzAwIHRleHQtc21cIj5DaGFuZ2UgVGltZTwvYT48L3NwYW4+PC9oND5cbiAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJkYXRlLXRpbWVcIj4xOHRoIEFwcmlsIHwgMzozMCBQTTwvcD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBWaXNpdFRpbWVcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG5pbXBvcnQgTGFiVGVzdHMgZnJvbSAnLi4vbGFiVGVzdHMnXG5cbmNsYXNzIExhYkRldGFpbHMgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8c2VjdGlvbiBjbGFzc05hbWU9XCJ3cmFwIHByb2ZpbGUtYm9vay1zY3JlZW5cIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lci1mbHVpZFwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtMTJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIndpZGdldCBwcm9maWxlLWJvb2tcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3aWRnZXQtaGVhZGVyIHBiLWhlYWRlciB0ZXh0LWNlbnRlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwYi1sb2dvXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGltZyBzcmM9XCIvYXNzZXRzL2ltZy9jdXN0b21lci1pY29ucy9sYWIxLnBuZ1wiIGNsYXNzTmFtZT1cImltZy1mbHVpZFwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoNCBjbGFzc05hbWU9XCJ3aWRnZXQtdGl0bGUgcGItdGl0bGVcIj5TUkwgRGlnbm9zdGljczwvaDQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJsb2NhdGlvblwiPlNlY3RvciA1MiBHdXJnYW9uIHwgPHNwYW4gY2xhc3NOYW1lPVwiY3QtaW1nIGN0LWltZy14c1wiPjxpbWcgc3JjPVwiL2Fzc2V0cy9pbWcvY3VzdG9tZXItaWNvbnMvbWFwLW1hcmtlci5zdmdcIiBjbGFzc05hbWU9XCJpbWctZmx1aWRcIiAvPjwvc3Bhbj4xLjVLTTwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx1bCBjbGFzc05hbWU9XCJsaXN0IHRpbWUtY29udGFjdFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZnctNzAwIHRleHQtc21cIj5UaW1pbmc6IC08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDc6MzAgQU0gdG8gODozMCBQTVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJvcGVuLWNsb3NlXCI+T3BlbiBUb2RheTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZnctNzAwIHRleHQtc21cIj5Db250YWN0OiAtPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAwMTIwIDEyMzQ1NjcsIDAxMjAgNzY1NDMyMVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJvcGVuLWNsb3NlXCI+Q2FsbCBOb3c8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxMYWJUZXN0cyB7Li4udGhpcy5wcm9wc30gLz5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIndpZGdldC1jb250ZW50IHBiLWRldGFpbHMgcGItbG9jYXRpb25cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoNCBjbGFzc05hbWU9XCJ3Yy10aXRsZSB0ZXh0LW1kIGZ3LTcwMFwiPkxvY2F0aW9uPC9oND5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRkcmVzcy1kZXRhaWxzXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGltZyBzcmM9XCIvYXNzZXRzL2ltZy9jdXN0b21lci1pY29ucy9tYXAtaWNvbi5wbmdcIiBjbGFzc05hbWU9XCJpbWctZmx1aWQgYWRkLW1hcFwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwiYWRkLWluZm9cIj4xOTYsIEh1ZGEgUGxvdCwgTmVhciwgRGV2aW5kZXIgVmloYXIsIFNlY3RvciA1NiwgR3VydWdyYW0sIEhhcnlhbmEgMTIyMDExPC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBiLXZpZXcgdGV4dC1sZWZ0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGEgaHJlZj1cIiNcIiBjbGFzc05hbWU9XCJsaW5rLXRleHQgdGV4dC1tZCBmdy03MDBcIj5WaWV3IGluIEdvb2dsZSBNYXA8L2E+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwid2lkZ2V0LWNvbnRlbnQgcGItZGV0YWlscyBwYi1mYWNpbGl0eVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGg0IGNsYXNzTmFtZT1cIndjLXRpdGxlIHRleHQtbWQgZnctNzAwXCI+RmFjaWxpdHk8L2g0PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHVsIGNsYXNzTmFtZT1cImxpc3QgcGItbGlzdCBmYWNpbHR5LWxpc3RcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGk+UGFya2luZyBBdmFpbGFibGU8L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaT5DYXJkIEFjY2VwdGVkPC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGk+RSBSZXBvcnQgQXZhaWxhYmxlPC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGk+SG9tZSBDaGVrdXAgQXZhaWxhYmxlPC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIndpZGdldC1jb250ZW50IHBiLWRldGFpbHMgcGItYWJvdXRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoNCBjbGFzc05hbWU9XCJ3Yy10aXRsZSB0ZXh0LW1kIGZ3LTcwMFwiPkFib3V0PC9oND5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwPkxvcmVtIGlwc3VtIGRvbG9yIHNpdCBhbWV0LCBjb25zZWN0ZXR1ciBhZGlwaXNpY2luZyBlbGl0LCBzZWQgZG8gZWl1c21vZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZW1wb3IgaW5jaWRpZHVudCB1dCBsYWJvcmUgZXQgZG9sb3JlIG1hZ25hIGFsaXF1YS4gVXQgZW5pbSBhZCBtaW5pbSB2ZW5pYW0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBxdWlzIG5vc3RydWQgZXhlcmNpdGF0aW9uIHVsbGFtY28gbGFib3JpcyBuaXNpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9zZWN0aW9uPlxuICAgICAgICApO1xuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBMYWJEZXRhaWxzXG4iLCJpbXBvcnQgTGFiRGV0YWlscyBmcm9tICcuL0xhYkRldGFpbC5qcydcblxuZXhwb3J0IGRlZmF1bHQgTGFiRGV0YWlscyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmNsYXNzIExhYlByb2ZpbGVDYXJkIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICB9XG5cbiAgICBvcGVuTGFiKGlkKXtcbiAgICAgICAgdGhpcy5wcm9wcy5oaXN0b3J5LnB1c2goYC9sYWIvJHtpZH1gKVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICBsZXQgeyBwcmljZSwgbGFiIH0gPSB0aGlzLnByb3BzLmRldGFpbHNcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3aWRnZXQgY2FyZFwiIG9uQ2xpY2s9e3RoaXMub3BlbkxhYi5iaW5kKHRoaXMsdGhpcy5wcm9wcy5kZXRhaWxzLmxhYi5pZCl9PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwid2lkZ2V0LWNvbnRlbnQgY2FyZC1jb250ZW50IGJvb2stY2FyZFwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxvZ28tcmF0dGluZ1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiY3QtaW1nIGxhYi1pY29uXCI+PGltZyBzcmM9XCIvYXNzZXRzL2ltZy9jdXN0b21lci1pY29ucy9sYWIxLnBuZ1wiIGNsYXNzTmFtZT1cImltZy1mbHVpZFwiIC8+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHVsIGNsYXNzTmFtZT1cImlubGluZS1saXN0IHJhdHRpbmdcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGk+PHNwYW4gY2xhc3NOYW1lPVwiY3QtaW1nIGN0LWltZy14cyBzdGFyLWljb25cIj48aW1nIHNyYz1cIi9hc3NldHMvaW1nL2N1c3RvbWVyLWljb25zL3N0YXIuc3ZnXCIgY2xhc3NOYW1lPVwiaW1nLWZsdWlkXCIgLz48L3NwYW4+PC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGk+PHNwYW4gY2xhc3NOYW1lPVwiY3QtaW1nIGN0LWltZy14cyBzdGFyLWljb25cIj48aW1nIHNyYz1cIi9hc3NldHMvaW1nL2N1c3RvbWVyLWljb25zL3N0YXIuc3ZnXCIgY2xhc3NOYW1lPVwiaW1nLWZsdWlkXCIgLz48L3NwYW4+PC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGk+PHNwYW4gY2xhc3NOYW1lPVwiY3QtaW1nIGN0LWltZy14cyBzdGFyLWljb25cIj48aW1nIHNyYz1cIi9hc3NldHMvaW1nL2N1c3RvbWVyLWljb25zL3N0YXIuc3ZnXCIgY2xhc3NOYW1lPVwiaW1nLWZsdWlkXCIgLz48L3NwYW4+PC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGk+PHNwYW4gY2xhc3NOYW1lPVwiY3QtaW1nIGN0LWltZy14cyBzdGFyLWljb25cIj48aW1nIHNyYz1cIi9hc3NldHMvaW1nL2N1c3RvbWVyLWljb25zL3N0YXIuc3ZnXCIgY2xhc3NOYW1lPVwiaW1nLWZsdWlkXCIgLz48L3NwYW4+PC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGk+PHNwYW4gY2xhc3NOYW1lPVwiY3QtaW1nIGN0LWltZy14cyBzdGFyLWljb25cIj48aW1nIHNyYz1cIi9hc3NldHMvaW1nL2N1c3RvbWVyLWljb25zL2hhbGYtc3Rhci5zdmdcIiBjbGFzc05hbWU9XCJpbWctZmx1aWRcIiAvPjwvc3Bhbj48L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwidi1idG4gdi1idG4tcHJpbWFyeSBwaWNrdXAtYnRuXCI+UGlja3VwIEF2YWlsYWJsZTwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJib29rLWNhcmQtY29udGVudFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGg0IGNsYXNzTmFtZT1cImJvb2stY2FydC10aXRsZVwiPntsYWIubmFtZX08L2g0PlxuICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwiZGVzY1wiPkJsb29kIFRlc3QsIFBhdGhvbG9neSBVbHRyYXNvdW5kLCBNUkksIENUSSBTZWN0b3IgNTIgR3VyZ2FvbiB8IDxzcGFuIGNsYXNzTmFtZT1cInRleHQtcHJpbWFyeSBmdy03MDBcIj4xLjUgS008L3NwYW4+PC9wPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIndpZGdldC1mb290ZXIgY2FyZC1mb290ZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLTZcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJsYWItcHJpY2VcIj5Ub3RhbCBScyB7cHJpY2V9PC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC02IHRleHQtcmlnaHRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cInYtYnRuIHYtYnRuLXByaW1hcnkgYnRuLW1kXCI+Qm9vayBMYWI8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBMYWJQcm9maWxlQ2FyZFxuIiwiaW1wb3J0IExhYlByb2ZpbGVDYXJkIGZyb20gJy4vTGFiUHJvZmlsZUNhcmQuanMnXG5cbmV4cG9ydCBkZWZhdWx0IExhYlByb2ZpbGVDYXJkIiwiaW1wb3J0IExhYlRlc3RzIGZyb20gJy4vbGFiVGVzdHMnXG5cbmV4cG9ydCBkZWZhdWx0IExhYlRlc3RzIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cbmNsYXNzIExhYlRlc3RzIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcblxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgIH1cblxuICAgIG9wZW5UZXN0cygpIHtcbiAgICAgICAgdGhpcy5wcm9wcy5oaXN0b3J5LnB1c2goYC9sYWIvJHt0aGlzLnByb3BzLmRhdGEubGFiLmlkfS90ZXN0c2ApXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIGxldCB0ZXN0cyA9IFtdXG4gICAgICAgIGlmICh0aGlzLnByb3BzLmRhdGEudGVzdHMgJiYgdGhpcy5wcm9wcy5kYXRhLnRlc3RzLmxlbmd0aCkge1xuICAgICAgICAgICAgdGVzdHMgPSB0aGlzLnByb3BzLmRhdGEudGVzdHMubWFwKCh0ZXN0LCBpKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIDxsaSBrZXk9e2l9Pnt0ZXN0LnRlc3QubmFtZX0gPHNwYW4gY2xhc3NOYW1lPVwidGVzdC1wcmljZVwiPlJzIHt0ZXN0Lm1ycH08L3NwYW4+PC9saT5cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3aWRnZXQtY29udGVudCBwYi1kZXRhaWxzIHBiLXRlc3RcIj5cbiAgICAgICAgICAgICAgICA8aDQgY2xhc3NOYW1lPVwid2MtdGl0bGUgdGV4dC1tZCBmdy03MDBcIj5UZXN0cyAoe3Rlc3RzLmxlbmd0aH0pPC9oND5cbiAgICAgICAgICAgICAgICA8dWwgY2xhc3NOYW1lPVwibGlzdCBwYi1saXN0IHBiLXRlc3QtbGlzdFwiPlxuICAgICAgICAgICAgICAgICAgICB7dGVzdHMuc2xpY2UoMCwzKX1cbiAgICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGItdmlldyB0ZXh0LXJpZ2h0XCI+XG4gICAgICAgICAgICAgICAgICAgIDxhIGNsYXNzTmFtZT1cImxpbmstdGV4dCB0ZXh0LW1kIGZ3LTcwMFwiIG9uQ2xpY2s9e3RoaXMub3BlblRlc3RzLmJpbmQodGhpcyl9PlZpZXcgQWxsPC9hPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IExhYlRlc3RzXG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcblxuaW1wb3J0IEV4cGFuc2lvblBhbmVsLCB7XG4gICAgRXhwYW5zaW9uUGFuZWxTdW1tYXJ5LFxuICAgIEV4cGFuc2lvblBhbmVsRGV0YWlscyxcbn0gZnJvbSAnbWF0ZXJpYWwtdWkvRXhwYW5zaW9uUGFuZWwnO1xuaW1wb3J0IEV4cGFuZE1vcmVJY29uIGZyb20gJ21hdGVyaWFsLXVpLWljb25zL0V4cGFuZE1vcmUnO1xuXG5cbmNsYXNzIE9yZGVyRGV0YWlscyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgbGV0IHByaWNlX2JyZWFrdXAgPSBbXVxuICAgICAgICBsZXQgdG90YWxQcmljZSA9IDBcbiAgICAgICAgbGV0IHRvdGFsVGVzdHMgPSAwXG4gICAgICAgIGlmICh0aGlzLnByb3BzLmRhdGEucHJpY2VfYnJlYWt1cCAmJiB0aGlzLnByb3BzLmRhdGEucHJpY2VfYnJlYWt1cC5icmVha3VwKSB7XG4gICAgICAgICAgICBwcmljZV9icmVha3VwID0gdGhpcy5wcm9wcy5kYXRhLnByaWNlX2JyZWFrdXAuYnJlYWt1cC5tYXAoKHRlc3QsIGkpID0+IHtcbiAgICAgICAgICAgICAgICB0b3RhbFByaWNlICs9IHRlc3QuYW1vdW50XG4gICAgICAgICAgICAgICAgdG90YWxUZXN0cysrXG4gICAgICAgICAgICAgICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPVwidGVzdFByaWNlUm93XCIga2V5PXtpfT5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidG5hbWVcIj57dGVzdC5uYW1lfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGFtb3VudFwiPlJzLiB7dGVzdC5hbW91bnR9PC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm9yZGVyRGV0YWlsc1wiPlxuICAgICAgICAgICAgICAgIDxFeHBhbnNpb25QYW5lbD5cbiAgICAgICAgICAgICAgICAgICAgPEV4cGFuc2lvblBhbmVsU3VtbWFyeSBleHBhbmRJY29uPXs8RXhwYW5kTW9yZUljb24gLz59PlxuICAgICAgICAgICAgICAgICAgICAgICAgT3JkZXIgRGV0YWlscyAtIHt0b3RhbFRlc3RzfSBUZXN0c1xuICAgICAgICAgICAgICAgICAgICA8L0V4cGFuc2lvblBhbmVsU3VtbWFyeT5cbiAgICAgICAgICAgICAgICAgICAgPEV4cGFuc2lvblBhbmVsRGV0YWlscz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicHJpY2VDb250XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3ByaWNlX2JyZWFrdXB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXN0VG90YWxSb3dcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidG5hbWVcIj57XCJUb3RhbFwifTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGFtb3VudFwiPlJzLiB7dG90YWxQcmljZX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXN0VG90YWxSb3dcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidG5hbWVcIj57XCJHU1RcIn08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRhbW91bnRcIj5Scy4ge3RvdGFsUHJpY2UqMS4xOH08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXN0VG90YWxSb3dcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidG5hbWVcIj57XCJQYXlhYmxlXCJ9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0YW1vdW50XCI+UnMuIHt0b3RhbFByaWNlKjEuMTh9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvRXhwYW5zaW9uUGFuZWxEZXRhaWxzPlxuICAgICAgICAgICAgICAgIDwvRXhwYW5zaW9uUGFuZWw+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgT3JkZXJEZXRhaWxzXG4iLCJpbXBvcnQgT3JkZXJEZXRhaWxzIGZyb20gJy4vT3JkZXJEZXRhaWxzLmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBPcmRlckRldGFpbHMiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgTGFiRGV0YWlscyBmcm9tICcuLi9jb21tb25zL2xhYkRldGFpbHMvaW5kZXguanMnXG5pbXBvcnQgTG9hZGVyIGZyb20gJy4uLy4uL2NvbW1vbnMvTG9hZGVyJ1xuXG5jbGFzcyBMYWJWaWV3IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIHNlbGVjdGVkTGFiOiB0aGlzLnByb3BzLm1hdGNoLnBhcmFtcy5pZFxuICAgICAgICB9XG4gICAgfVxuXG4gICAgYm9va0xhYigpIHtcbiAgICAgICAgdGhpcy5wcm9wcy5oaXN0b3J5LnB1c2goYC9sYWIvJHt0aGlzLnN0YXRlLnNlbGVjdGVkTGFifS9ib29rYClcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgPGhlYWRlciBjbGFzc05hbWU9XCJza2luLXByaW1hcnkgZml4ZWQgaG9yaXpvbnRhbCB0b3AgcHJvZmlsZS1ib29rLWhlYWRlclwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lci1mbHVpZFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC00XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaGVhZGVyLXRpdGxlIGZ3LTcwMCBjYXBpdGFsaXplIHRleHQtd2hpdGVcIj5JQ09OPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtNFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLTRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHVsIGNsYXNzTmFtZT1cImlubGluZS1saXN0IGZsb2F0LXJpZ2h0IHVzZXItbm90aWZpY2F0aW9uLWFjdGlvblwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpPjxzcGFuIGNsYXNzTmFtZT1cImljb24gaWNvbi1tZCB0ZXh0LW1pZGRsZVwiPjxpbWcgc3JjPVwiL2Fzc2V0cy9pbWcvY3VzdG9tZXItaWNvbnMvdXNlci5zdmdcIiBjbGFzc05hbWU9XCJpbWctZmx1aWRcIiAvPjwvc3Bhbj48L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpPjxzcGFuIGNsYXNzTmFtZT1cImljb24gaWNvbi1tZCB0ZXh0LW1pZGRsZSBub3RpZmljYXRpb24taWNvblwiPjxpbWcgc3JjPVwiL2Fzc2V0cy9pbWcvY3VzdG9tZXItaWNvbnMvbm90aWZpY2F0aW9uLnN2Z1wiIGNsYXNzTmFtZT1cImltZy1mbHVpZFwiIC8+IDxzcGFuIGNsYXNzTmFtZT1cIm5vdGlmaWNhdGlvbi1hbGVydFwiIC8+PC9zcGFuPjwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9oZWFkZXI+XG5cbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuTEFCU1t0aGlzLnN0YXRlLnNlbGVjdGVkTGFiXSA/XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic2tpbi1wcmltYXJ5IGVtcHR5LWhlYWRlciBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxMYWJEZXRhaWxzIHsuLi50aGlzLnByb3BzfSBkYXRhPXt0aGlzLnByb3BzLkxBQlNbdGhpcy5zdGF0ZS5zZWxlY3RlZExhYl19IC8+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9e3RoaXMuYm9va0xhYi5iaW5kKHRoaXMpfSBjbGFzc05hbWU9XCJ2LWJ0biB2LWJ0bi1wcmltYXJ5IGJ0bi1sZyBmaXhlZCBob3Jpem9udGFsIGJvdHRvbSBuby1yb3VuZCBidG4tbGcgdGV4dC1sZ1wiPjxzcGFuIGNsYXNzTmFtZT1cInRleHQteHMgc2VsZWN0ZWQtb3B0aW9uXCI+KHt0aGlzLnByb3BzLnNlbGVjdGVkQ3JpdGVyaWFzLmxlbmd0aH0gU2VsZWN0ZWQpIDwvc3Bhbj5Cb29rXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PiA6IDxMb2FkZXIgLz5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTGFiVmlld1xuIiwiaW1wb3J0IExhYlZpZXcgZnJvbSAnLi9MYWJWaWV3LmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBMYWJWaWV3IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cbmltcG9ydCBMYWJEZXRhaWxzIGZyb20gJy4uL2NvbW1vbnMvbGFiRGV0YWlscy9pbmRleC5qcydcbmltcG9ydCBPcmRlckRldGFpbHMgZnJvbSAnLi4vY29tbW9ucy9vcmRlckRldGFpbHMvaW5kZXguanMnXG5pbXBvcnQgRGV0YWlsc0Zvcm0gZnJvbSAnLi9kZXRhaWxzRm9ybS9pbmRleC5qcydcbmltcG9ydCBBZGRyZXNzRm9ybSBmcm9tICcuL2FkZHJlc3NGb3JtL2luZGV4LmpzJztcblxuY2xhc3MgUGF0aWVudERldGFpbHNWaWV3IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIHNlbGVjdGVkTGFiOiBudWxsLFxuICAgICAgICAgICAgc2VsZWN0ZWRUZXN0czogXCJcIixcbiAgICAgICAgICAgIHNlbGVjdGVkU2xvdDogbnVsbCxcbiAgICAgICAgICAgIHNlbGVjdGVkU2xvdFN0YXJ0IDogbnVsbCxcbiAgICAgICAgICAgIHNlbGVjdGVkU2xvdEVuZCA6IG51bGxcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldExvY2F0aW9uUGFyYW0odGFnKSB7XG4gICAgICAgIC8vIHRoaXMgQVBJIGFzc3VtZXMgdGhlIGNvbnRleHQgb2YgcmVhY3Qtcm91dGVyLTRcbiAgICAgICAgY29uc3QgcGFyYW1TdHJpbmcgPSB0aGlzLnByb3BzLmxvY2F0aW9uLnNlYXJjaFxuICAgICAgICBjb25zdCBwYXJhbXMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKHBhcmFtU3RyaW5nKVxuICAgICAgICByZXR1cm4gcGFyYW1zLmdldCh0YWcpXG4gICAgfVxuXG4gICAgcHJvY2VlZCgpe1xuICAgICAgICB0aGlzLmNvbnRleHQucm91dGVyLmhpc3RvcnkucHVzaCgnL2xhYi9ib29raW5nL3N1bW1hcnkvSVVIQlVIODc4N1VIQicpXG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIGxldCBsYWJJZCA9IHRoaXMucHJvcHMubWF0Y2gucGFyYW1zLmlkXG4gICAgICAgIGxldCB0ZXN0cyA9IHRoaXMuZ2V0TG9jYXRpb25QYXJhbSgndGVzdHMnKVxuICAgICAgICBsZXQgc2VsZWN0ZWRTbG90U3RhcnQgPSB0aGlzLmdldExvY2F0aW9uUGFyYW0oJ3Rfc3RhcnQnKVxuICAgICAgICBzZWxlY3RlZFNsb3RTdGFydCA9IG5ldyBEYXRlKHBhcnNlRmxvYXQoc2VsZWN0ZWRTbG90U3RhcnQpKVxuICAgICAgICBzZWxlY3RlZFNsb3RTdGFydCA9IHNlbGVjdGVkU2xvdFN0YXJ0LnRvU3RyaW5nKClcbiAgICAgICAgbGV0IHNlbGVjdGVkU2xvdEVuZCA9IHRoaXMuZ2V0TG9jYXRpb25QYXJhbSgndF9lbmQnKVxuICAgICAgICBzZWxlY3RlZFNsb3RFbmQgPSBuZXcgRGF0ZShwYXJzZUZsb2F0KHNlbGVjdGVkU2xvdEVuZCkpXG4gICAgICAgIHNlbGVjdGVkU2xvdEVuZCA9IHNlbGVjdGVkU2xvdEVuZC50b1N0cmluZygpXG4gICAgICAgIGlmIChsYWJJZCkge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHNlbGVjdGVkTGFiOiBsYWJJZCwgc2VsZWN0ZWRUZXN0czogdGVzdHMsIHNlbGVjdGVkU2xvdFN0YXJ0LCBzZWxlY3RlZFNsb3RFbmQgfSlcbiAgICAgICAgICAgIHRoaXMucHJvcHMuZ2V0TGFiQnlJZChsYWJJZClcblxuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhdGljIGNvbnRleHRUeXBlcyA9IHtcbiAgICAgICAgcm91dGVyOiAoKSA9PiBudWxsXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBhdGllbnREZXRhaWxzXCI+XG5cbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuTEFCU1t0aGlzLnN0YXRlLnNlbGVjdGVkTGFiXSA/XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxMYWJEZXRhaWxzIGRhdGE9e3RoaXMucHJvcHMuTEFCU1t0aGlzLnN0YXRlLnNlbGVjdGVkTGFiXX0gLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8T3JkZXJEZXRhaWxzIGRhdGE9e3RoaXMucHJvcHMuTEFCU1t0aGlzLnN0YXRlLnNlbGVjdGVkTGFiXX0gLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNlbGVjdGVkQXBwb2ludG1lbnRTbG90XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoNT5TZWxlY3RlZCBBcHBvaW50bWVudCBTbG90PC9oNT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiYXBwZGF0ZVwiPkFwcG9pbnRtZW50IERhdGU8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImRhdGVcIj57IHRoaXMuc3RhdGUuc2VsZWN0ZWRTbG90U3RhcnQgfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8RGV0YWlsc0Zvcm0gLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8QWRkcmVzc0Zvcm0gY2l0eT1cIlNlbGVjdGVkIHZhbHVlXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cInByb2NlZWRidG5cIiBvbkNsaWNrPXt0aGlzLnByb2NlZWQuYmluZCh0aGlzKX0+UHJvY2VlZDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+IDogXCJcIlxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IFBhdGllbnREZXRhaWxzVmlld1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cbmNsYXNzIEFkZHJlc3NGb3JtIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIGFkZHJlc3M6JycsXG4gICAgICAgICAgICBsb2NhbGl0eTonJyxcbiAgICAgICAgICAgIGxhbmRtYXJrOicnLFxuICAgICAgICAgICAgcGluY29kZTonJyxcbiAgICAgICAgICAgIGNpdHk6cHJvcHMuY2l0eVxuXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpbnB1dEhhbmRsZXIod2hpY2gsIGUpe1xuICAgICAgICB0aGlzLnNldFN0YXRlKHsgW3doaWNoXSA6IGUudGFyZ2V0LnZhbHVlIH0pXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImRldGFpbHNGb3JtXCI+XG4gICAgICAgICAgICAgICAgPGg1PlBsZWFzZSBwcm92aWRlIHBhdGllbnQgZGV0YWlsczwvaDU+XG5cbiAgICAgICAgICAgICAgICA8aW5wdXQgdmFsdWU9e3RoaXMuc3RhdGUuYWRkcmVzc30gb25DaGFuZ2U9e3RoaXMuaW5wdXRIYW5kbGVyLmJpbmQodGhpcywnYWRkcmVzcycpfSBjbGFzc05hbWU9XCJwdG5hbWVcIiBwbGFjZWhvbGRlcj1cIkFkZHJlc3MqXCIgLz5cbiAgICAgICAgICAgICAgICA8aW5wdXQgdmFsdWU9e3RoaXMuc3RhdGUubG9jYWxpdHl9IG9uQ2hhbmdlPXt0aGlzLmlucHV0SGFuZGxlci5iaW5kKHRoaXMsJ2xvY2FsaXR5Jyl9IGNsYXNzTmFtZT1cInB0bmFtZVwiIHBsYWNlaG9sZGVyPVwiTG9jYWxpdHkqXCIgLz5cbiAgICAgICAgICAgICAgICA8aW5wdXQgdmFsdWU9e3RoaXMuc3RhdGUubGFuZG1hcmt9IG9uQ2hhbmdlPXt0aGlzLmlucHV0SGFuZGxlci5iaW5kKHRoaXMsJ2xhbmRtYXJrJyl9IGNsYXNzTmFtZT1cInB0bmFtZVwiIHBsYWNlaG9sZGVyPVwiTGFuZG1hcmsqXCIgLz5cbiAgICAgICAgICAgICAgICA8aW5wdXQgdmFsdWU9e3RoaXMuc3RhdGUucGluY29kZX0gb25DaGFuZ2U9e3RoaXMuaW5wdXRIYW5kbGVyLmJpbmQodGhpcywncGluY29kZScpfSBjbGFzc05hbWU9XCJwdG1vYmlsZVwiIHBsYWNlaG9sZGVyPVwiUGluY29kZSpcIiAvPlxuICAgICAgICAgICAgICAgIHsvKiA8aW5wdXQgdmFsdWU9e3RoaXMuc3RhdGUuY2l0eX0gb25DaGFuZ2U9e3RoaXMuaW5wdXRIYW5kbGVyLmJpbmQodGhpcywnY2l0eScpfSBkaXNhYmxlZCBjbGFzc05hbWU9XCJwdG90cFwiIHBsYWNlaG9sZGVyPVwiQ2l0eVwiIC8+ICovfVxuXG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgQWRkcmVzc0Zvcm1cbiIsImltcG9ydCBBZGRyZXNzRm9ybSBmcm9tICcuL0FkZHJlc3NGb3JtLmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBBZGRyZXNzRm9ybSIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG5jbGFzcyBEZXRhaWxzRm9ybSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgICBwYXRpZW50TmFtZSA6ICcnLFxuICAgICAgICAgICAgcGF0aWVudEVtYWlsIDogJycsXG4gICAgICAgICAgICBwYXRpZW50R2VuZGVyIDogJ21hbGUnLFxuICAgICAgICAgICAgbW9iaWxlOicnLFxuICAgICAgICAgICAgb3RwIDonJyxcbiAgICAgICAgICAgIHBhdGllbnRNb2JpbGUgOiAnJ1xuXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpbnB1dEhhbmRsZXIod2hpY2gsIGUpe1xuICAgICAgICB0aGlzLnNldFN0YXRlKHsgW3doaWNoXSA6IGUudGFyZ2V0LnZhbHVlIH0pXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImRldGFpbHNGb3JtXCI+XG4gICAgICAgICAgICAgICAgPGg1PlBsZWFzZSBwcm92aWRlIHBhdGllbnQgZGV0YWlsczwvaDU+XG5cbiAgICAgICAgICAgICAgICA8aW5wdXQgdmFsdWU9e3RoaXMuc3RhdGUucGF0aWVudE5hbWV9IG9uQ2hhbmdlPXt0aGlzLmlucHV0SGFuZGxlci5iaW5kKHRoaXMsJ3BhdGllbnROYW1lJyl9IGNsYXNzTmFtZT1cInB0bmFtZVwiIHBsYWNlaG9sZGVyPVwiUGF0aWVudCBOYW1lKlwiIC8+XG4gICAgICAgICAgICAgICAgPGlucHV0IHZhbHVlPXt0aGlzLnN0YXRlLnBhdGllbnRFbWFpbH0gb25DaGFuZ2U9e3RoaXMuaW5wdXRIYW5kbGVyLmJpbmQodGhpcywncGF0aWVudEVtYWlsJyl9IGNsYXNzTmFtZT1cInB0ZW1haWxcIiBwbGFjZWhvbGRlcj1cIkVtYWlsKlwiIC8+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwdGdlbmRlclwiPlxuICAgICAgICAgICAgICAgICAgICA8c3Bhbj5HZW5kZXIgOjwvc3Bhbj4gXG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwicmFkaW9cIiBuYW1lPVwiZ2VuZGVyXCIgdmFsdWU9XCJtYWxlXCIgY2hlY2tlZD17dGhpcy5zdGF0ZS5wYXRpZW50R2VuZGVyID09PSBcIm1hbGVcIn0gb25DaGFuZ2U9e3RoaXMuaW5wdXRIYW5kbGVyLmJpbmQodGhpcywncGF0aWVudEdlbmRlcicpfS8+IE1hbGVcbiAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJyYWRpb1wiIG5hbWU9XCJnZW5kZXJcIiB2YWx1ZT1cImZlbWFsZVwiIGNoZWNrZWQ9e3RoaXMuc3RhdGUucGF0aWVudEdlbmRlciA9PT0gXCJmZW1hbGVcIn0gb25DaGFuZ2U9e3RoaXMuaW5wdXRIYW5kbGVyLmJpbmQodGhpcywncGF0aWVudEdlbmRlcicpfS8+IEZlbWFsZVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxpbnB1dCB2YWx1ZT17dGhpcy5zdGF0ZS5tb2JpbGV9IG9uQ2hhbmdlPXt0aGlzLmlucHV0SGFuZGxlci5iaW5kKHRoaXMsJ21vYmlsZScpfSBjbGFzc05hbWU9XCJwdG1vYmlsZVwiIHBsYWNlaG9sZGVyPVwiTW9iaWxlKlwiIC8+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJvdHBidG5cIj4oUmUpU2VuZCBPVFA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8aW5wdXQgdmFsdWU9e3RoaXMuc3RhdGUub3RwfSBvbkNoYW5nZT17dGhpcy5pbnB1dEhhbmRsZXIuYmluZCh0aGlzLCdvdHAnKX0gY2xhc3NOYW1lPVwicHRvdHBcIiBwbGFjZWhvbGRlcj1cIkVudGVyIE9UUCpcIiAvPlxuICAgICAgICAgICAgICAgIDxpbnB1dCB2YWx1ZT17dGhpcy5zdGF0ZS5wYXRpZW50TW9iaWxlfSBvbkNoYW5nZT17dGhpcy5pbnB1dEhhbmRsZXIuYmluZCh0aGlzLCdwYXRpZW50TW9iaWxlJyl9IGNsYXNzTmFtZT1cInB0bW9iaWxlXCIgcGxhY2Vob2xkZXI9XCJQYXRpZW50IE1vYmlsZSpcIiAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgXG4gICAgICAgICk7XG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IERldGFpbHNGb3JtXG4iLCJpbXBvcnQgRGV0YWlsc0Zvcm0gZnJvbSAnLi9EZXRhaWxzRm9ybS5qcydcblxuZXhwb3J0IGRlZmF1bHQgRGV0YWlsc0Zvcm0iLCJpbXBvcnQgUGF0aWVudERldGFpbHNWaWV3IGZyb20gJy4vUGF0aWVudERldGFpbHNWaWV3LmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBQYXRpZW50RGV0YWlsc1ZpZXciLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcblxuaW1wb3J0IENvbW1vbmx5U2VhcmNoZWQgZnJvbSAnLi4vLi4vY29tbW9ucy9jb21tb25seVNlYXJjaGVkL2luZGV4LmpzJ1xuaW1wb3J0IENyaXRlcmlhU2VhcmNoIGZyb20gJy4uLy4uL2NvbW1vbnMvY3JpdGVyaWFTZWFyY2gnXG5cbmNsYXNzIFNlYXJjaENyaXRlcmlhVmlldyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG5cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNlYXJjaFByb2NlZWQoKSB7XG4gICAgICAgIGxldCBzZWFyY2hEYXRhID0ge1xuICAgICAgICAgICAgc2VsZWN0ZWRDcml0ZXJpYXMgOiB0aGlzLnByb3BzLnNlbGVjdGVkQ3JpdGVyaWFzLFxuICAgICAgICAgICAgc2VsZWN0ZWRMb2NhdGlvbiA6IHRoaXMucHJvcHMuc2VsZWN0ZWRMb2NhdGlvbixcbiAgICAgICAgfVxuICAgICAgICBzZWFyY2hEYXRhID0gZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNlYXJjaERhdGEpKVxuICAgICAgICBsZXQgZmlsdGVyRGF0YSA9IGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeSh0aGlzLnByb3BzLmZpbHRlckNyaXRlcmlhKSlcbiAgICAgICAgdGhpcy5wcm9wcy5oaXN0b3J5LnB1c2goYC9keC9zZWFyY2hyZXN1bHRzP3NlYXJjaD0ke3NlYXJjaERhdGF9JmZpbHRlcj0ke2ZpbHRlckRhdGF9YClcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXY+XG5cbiAgICAgICAgICAgICAgICA8Q3JpdGVyaWFTZWFyY2ggey4uLnRoaXMucHJvcHN9IGNoZWNrRm9yTG9hZD17dGhpcy5wcm9wcy5MT0FERURfU0VBUkNIX0NSSVRFUklBX0xBQn0gdGl0bGU9XCJTZWFyY2ggZm9yIFRlc3QgYW5kIExhYnMuXCI+XG4gICAgICAgICAgICAgICAgICAgIDxzZWN0aW9uIGNsYXNzTmFtZT1cIndyYXAgd3JhcC0xMDBcIj5cblxuICAgICAgICAgICAgICAgICAgICAgICAgPENvbW1vbmx5U2VhcmNoZWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWFkaW5nPVwiU2VsZWN0ZWQgQ3JpdGVyaWFcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE9e3RoaXMucHJvcHMuc2VsZWN0ZWRDcml0ZXJpYXN9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWQ9e1tdfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvZ2dsZT17dGhpcy5wcm9wcy50b2dnbGVEaWFnbm9zaXNDcml0ZXJpYS5iaW5kKHRoaXMpfVxuICAgICAgICAgICAgICAgICAgICAgICAgLz5cblxuICAgICAgICAgICAgICAgICAgICAgICAgPENvbW1vbmx5U2VhcmNoZWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWFkaW5nPVwiQ29tbW9uIFRlc3RcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJ0ZXN0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhPXt0aGlzLnByb3BzLmNvbW1vbl90ZXN0c31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZD17dGhpcy5wcm9wcy5zZWxlY3RlZENyaXRlcmlhcy5maWx0ZXIoeCA9PiB4LnR5cGUgPT0gJ3Rlc3QnKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b2dnbGU9e3RoaXMucHJvcHMudG9nZ2xlRGlhZ25vc2lzQ3JpdGVyaWEuYmluZCh0aGlzKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxDb21tb25seVNlYXJjaGVkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGluZz1cIkNvbW1vbiBDb25kaXRpb25zXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwibGFiXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhPXt0aGlzLnByb3BzLmNvbW1vbl9jb25kaXRpb25zfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkPXt0aGlzLnByb3BzLnNlbGVjdGVkQ3JpdGVyaWFzLmZpbHRlcih4ID0+IHgudHlwZSA9PSAnbGFiJyl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9nZ2xlPXt0aGlzLnByb3BzLnRvZ2dsZURpYWdub3Npc0NyaXRlcmlhLmJpbmQodGhpcyl9XG4gICAgICAgICAgICAgICAgICAgICAgICAvPlxuXG4gICAgICAgICAgICAgICAgICAgICAgICA8Q29tbW9ubHlTZWFyY2hlZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRpbmc9XCJDb21tb24gTGFic1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImxhYlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YT17dGhpcy5wcm9wcy5wcmVmZXJyZWRfbGFic31cbiAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgIDwvc2VjdGlvbj5cbiAgICAgICAgICAgICAgICA8L0NyaXRlcmlhU2VhcmNoPlxuXG5cblxuICAgICAgICAgICAgICAgIDxidXR0b24gb25DbGljaz17dGhpcy5zZWFyY2hQcm9jZWVkLmJpbmQodGhpcyl9IGNsYXNzTmFtZT1cInYtYnRuIHYtYnRuLXByaW1hcnkgYnRuLWxnIGZpeGVkIGhvcml6b250YWwgYm90dG9tIG5vLXJvdW5kIHRleHQtbGdcIj5TaG93IExhYnM8L2J1dHRvbj5cblxuXG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFNlYXJjaENyaXRlcmlhVmlld1xuIiwiaW1wb3J0IFNlYXJjaENyaXRlcmlhVmlldyBmcm9tICcuL1NlYXJjaENyaXRlcmlhVmlldy5qcydcblxuZXhwb3J0IGRlZmF1bHQgU2VhcmNoQ3JpdGVyaWFWaWV3IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IExhYnNMaXN0IGZyb20gJy4uL3NlYXJjaFJlc3VsdHMvbGFic0xpc3QvaW5kZXguanMnXG5pbXBvcnQgQ3JpdGVyaWFTZWFyY2ggZnJvbSAnLi4vLi4vY29tbW9ucy9jcml0ZXJpYVNlYXJjaCdcbmltcG9ydCBUb3BCYXIgZnJvbSAnLi90b3BCYXInXG5cbmNsYXNzIFNlYXJjaFJlc3VsdHNWaWV3IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcblxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIHRoaXMuZ2V0TGFicygpXG4gICAgfVxuXG4gICAgZ2V0TGFicygpIHtcbiAgICAgICAgbGV0IHtcbiAgICAgICAgICAgIHNlbGVjdGVkTG9jYXRpb24sXG4gICAgICAgICAgICBzZWxlY3RlZENyaXRlcmlhcyxcbiAgICAgICAgICAgIGZpbHRlckNyaXRlcmlhXG4gICAgICAgIH0gPSB0aGlzLnByb3BzXG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGxldCBzZWFyY2hTdGF0ZSA9IHRoaXMuZ2V0TG9jYXRpb25QYXJhbSgnc2VhcmNoJylcbiAgICAgICAgICAgIGxldCBmaWx0ZXJDcml0ZXJpYSA9IHRoaXMuZ2V0TG9jYXRpb25QYXJhbSgnZmlsdGVyJylcbiAgICAgICAgICAgIGlmIChmaWx0ZXJDcml0ZXJpYSkge1xuICAgICAgICAgICAgICAgIGZpbHRlckNyaXRlcmlhID0gSlNPTi5wYXJzZShmaWx0ZXJDcml0ZXJpYSlcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZmlsdGVyQ3JpdGVyaWEgPSB7fVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2VhcmNoU3RhdGUgPSBKU09OLnBhcnNlKHNlYXJjaFN0YXRlKVxuICAgICAgICAgICAgdGhpcy5nZXRMYWJMaXN0KHNlYXJjaFN0YXRlLCBmaWx0ZXJDcml0ZXJpYSwgdHJ1ZSlcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihlKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0TG9jYXRpb25QYXJhbSh0YWcpIHtcbiAgICAgICAgLy8gdGhpcyBBUEkgYXNzdW1lcyB0aGUgY29udGV4dCBvZiByZWFjdC1yb3V0ZXItNFxuICAgICAgICBjb25zdCBwYXJhbVN0cmluZyA9IHRoaXMucHJvcHMubG9jYXRpb24uc2VhcmNoXG4gICAgICAgIGNvbnN0IHBhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXMocGFyYW1TdHJpbmcpXG4gICAgICAgIHJldHVybiBwYXJhbXMuZ2V0KHRhZylcbiAgICB9XG5cbiAgICBnZXRMYWJMaXN0KHNlYXJjaFN0YXRlLCBmaWx0ZXJDcml0ZXJpYSwgbWVyZ2VTdGF0ZSkge1xuICAgICAgICB0aGlzLnByb3BzLmdldExhYnMoc2VhcmNoU3RhdGUsIGZpbHRlckNyaXRlcmlhLCBtZXJnZVN0YXRlKTtcbiAgICB9XG5cbiAgICBhcHBseUZpbHRlcnMoZmlsdGVyU3RhdGUpIHtcbiAgICAgICAgbGV0IHNlYXJjaFN0YXRlID0ge1xuICAgICAgICAgICAgc2VsZWN0ZWRDcml0ZXJpYXM6IHRoaXMucHJvcHMuc2VsZWN0ZWRDcml0ZXJpYXMsXG4gICAgICAgICAgICBzZWxlY3RlZExvY2F0aW9uOiB0aGlzLnByb3BzLnNlbGVjdGVkTG9jYXRpb24sXG4gICAgICAgIH1cbiAgICAgICAgbGV0IHNlYXJjaERhdGEgPSBlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc2VhcmNoU3RhdGUpKVxuICAgICAgICBsZXQgZmlsdGVyRGF0YSA9IGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShmaWx0ZXJTdGF0ZSkpXG4gICAgICAgIHRoaXMucHJvcHMuaGlzdG9yeS5yZXBsYWNlKGAvZHgvc2VhcmNocmVzdWx0cz9zZWFyY2g9JHtzZWFyY2hEYXRhfSZmaWx0ZXI9JHtmaWx0ZXJEYXRhfWApXG5cbiAgICAgICAgdGhpcy5nZXRMYWJMaXN0KHNlYXJjaFN0YXRlLCBmaWx0ZXJTdGF0ZSwgdHJ1ZSlcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgPENyaXRlcmlhU2VhcmNoIHsuLi50aGlzLnByb3BzfSBjaGVja0ZvckxvYWQ9e3RoaXMucHJvcHMuTE9BREVEX0xBQlNfU0VBUkNIfSB0aXRsZT1cIlNlYXJjaCBmb3IgVGVzdCBhbmQgTGFicy5cIj5cbiAgICAgICAgICAgICAgICAgICAgPFRvcEJhciB7Li4udGhpcy5wcm9wc30gYXBwbHlGaWx0ZXJzPXt0aGlzLmFwcGx5RmlsdGVycy5iaW5kKHRoaXMpfSAvPlxuICAgICAgICAgICAgICAgICAgICA8TGFic0xpc3Qgey4uLnRoaXMucHJvcHN9IC8+XG4gICAgICAgICAgICAgICAgPC9Dcml0ZXJpYVNlYXJjaD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgU2VhcmNoUmVzdWx0c1ZpZXdcbiIsImltcG9ydCBTZWFyY2hSZXN1bHRzVmlldyBmcm9tICcuL1NlYXJjaFJlc3VsdHNWaWV3LmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBTZWFyY2hSZXN1bHRzVmlldyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCBMYWJQcm9maWxlQ2FyZCBmcm9tICcuLi8uLi9jb21tb25zL2xhYlByb2ZpbGVDYXJkL2luZGV4LmpzJ1xuXG5jbGFzcyBMYWJzTGlzdCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIGxldCB7IExBQlMsIGxhYkxpc3QgfSA9IHRoaXMucHJvcHNcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPHNlY3Rpb24gY2xhc3NOYW1lPVwid3JhcCBzZWFyY2gtYm9vay1yZXN1bHRcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lci1mbHVpZFwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtMTJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYkxpc3QubWFwKChsYWJJZCwgaSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDxMYWJQcm9maWxlQ2FyZCB7Li4udGhpcy5wcm9wc30gZGV0YWlscz17TEFCU1tsYWJJZF19IGtleT17aX0gLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L3NlY3Rpb24+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IExhYnNMaXN0XG4iLCJpbXBvcnQgTGFic0xpc3QgZnJvbSAnLi9MYWJzTGlzdC5qcydcblxuZXhwb3J0IGRlZmF1bHQgTGFic0xpc3QiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcblxuaW1wb3J0IE1lbnUsIHsgTWVudUl0ZW0gfSBmcm9tICdtYXRlcmlhbC11aS9NZW51JztcbmltcG9ydCBSYW5nZSBmcm9tICdyYy1zbGlkZXIvbGliL1JhbmdlJztcblxuY2xhc3MgVG9wQmFyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIGFuY2hvckVsOiBudWxsLFxuICAgICAgICAgICAgb3BlbkZpbHRlcjogZmFsc2UsXG4gICAgICAgICAgICBwcmljZVJhbmdlOiBbMTAwLCAxNTAwXSxcbiAgICAgICAgICAgIGRpc3RhbmNlUmFuZ2U6IFsxLCAzNV0sXG4gICAgICAgICAgICBzb3J0Qnk6IG51bGxcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMocHJvcHMpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IC4uLnByb3BzLmZpbHRlckNyaXRlcmlhIH0pXG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyAuLi50aGlzLnByb3BzLmZpbHRlckNyaXRlcmlhIH0pXG4gICAgfVxuXG4gICAgYXBwbHlGaWx0ZXJzKCkge1xuICAgICAgICBsZXQgZmlsdGVyU3RhdGUgPSB7XG4gICAgICAgICAgICBwcmljZVJhbmdlOiB0aGlzLnN0YXRlLnByaWNlUmFuZ2UsXG4gICAgICAgICAgICBkaXN0YW5jZVJhbmdlOiB0aGlzLnN0YXRlLmRpc3RhbmNlUmFuZ2UsXG4gICAgICAgICAgICBzb3J0Qnk6IHRoaXMuc3RhdGUuc29ydEJ5XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5wcm9wcy5hcHBseUZpbHRlcnMoZmlsdGVyU3RhdGUpXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBvcGVuRmlsdGVyOiBmYWxzZSB9KVxuICAgIH1cblxuICAgIGhhbmRsZU9wZW4oZXZlbnQpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGFuY2hvckVsOiBldmVudC5jdXJyZW50VGFyZ2V0IH0pXG4gICAgfVxuXG4gICAgaGFuZGxlQ2xvc2UodHlwZSkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHsgYW5jaG9yRWw6IG51bGwsIHNvcnRCeTogdHlwZSB9LCAoKSA9PiB7XG4gICAgICAgICAgICBpZih0eXBlKXtcbiAgICAgICAgICAgICAgICB0aGlzLmFwcGx5RmlsdGVycygpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgdG9nZ2xlRmlsdGVyKCkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIG9wZW5GaWx0ZXI6ICF0aGlzLnN0YXRlLm9wZW5GaWx0ZXJcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBoYW5kbGVSYW5nZSh0eXBlLCByYW5nZSkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIFt0eXBlXTogcmFuZ2VcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBnZXRDcml0ZXJpYVN0cmluZyhzZWxlY3RlZENyaXRlcmlhcykge1xuICAgICAgICBpZiAoc2VsZWN0ZWRDcml0ZXJpYXMgJiYgc2VsZWN0ZWRDcml0ZXJpYXMubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm4gc2VsZWN0ZWRDcml0ZXJpYXMucmVkdWNlKChmaW5hbCwgY3VyciwgaSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChpICE9IDApIHtcbiAgICAgICAgICAgICAgICAgICAgZmluYWwgKz0gJywgJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBmaW5hbCArPSBgJHtjdXJyLm5hbWV9YFxuICAgICAgICAgICAgICAgIHJldHVybiBmaW5hbFxuICAgICAgICAgICAgfSwgXCJcIilcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICBsZXQgY3JpdGVyaWFTdHIgPSB0aGlzLmdldENyaXRlcmlhU3RyaW5nKHRoaXMucHJvcHMuc2VsZWN0ZWRDcml0ZXJpYXMpXG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxzZWN0aW9uIGNsYXNzTmFtZT1cImZpbHRlci1yb3dcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lci1mbHVpZFwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtMTJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZpbHRlci1pdGVtXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWN0aW9uLWZpbHRlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHVsIGNsYXNzTmFtZT1cImlubGluZS1saXN0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpIG9uQ2xpY2s9e3RoaXMuaGFuZGxlT3Blbi5iaW5kKHRoaXMpfT48c3BhbiBjbGFzc05hbWU9XCJjdC1pbWcgY3QtaW1nLXNtIGZpbHRlci1pY29uIHRleHQtcmlnaHRcIj48aW1nIHNyYz1cIi9hc3NldHMvaW1nL2N1c3RvbWVyLWljb25zL3JhbmdlLnN2Z1wiIGNsYXNzTmFtZT1cImltZy1mbHVpZFwiIC8+PC9zcGFuPjwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpIG9uQ2xpY2s9e3RoaXMudG9nZ2xlRmlsdGVyLmJpbmQodGhpcyl9PjxzcGFuIGNsYXNzTmFtZT1cImN0LWltZyBjdC1pbWctc20gZmlsdGVyLWljb24gdGV4dC1yaWdodCBhcHBsaWVkLWZpbHRlclwiPjxpbWcgc3JjPVwiL2Fzc2V0cy9pbWcvY3VzdG9tZXItaWNvbnMvZmlsdGVyLnN2Z1wiIGNsYXNzTmFtZT1cImltZy1mbHVpZFwiIC8+PC9zcGFuPjxzcGFuIGNsYXNzTmFtZT1cImFwcGxpZWQtZmlsdGVyLW5vdGlcIiAvPjwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmaWx0ZXItdGl0bGVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLmxhYkxpc3QubGVuZ3RofSBSZXN1bHRzIGZvdW5kIGZvciA8c3BhbiBjbGFzc05hbWU9XCJmdy03MDBcIj4ge2NyaXRlcmlhU3RyfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPE1lbnVcbiAgICAgICAgICAgICAgICAgICAgaWQ9XCJzb3J0LW1lbnVcIlxuICAgICAgICAgICAgICAgICAgICBhbmNob3JFbD17dGhpcy5zdGF0ZS5hbmNob3JFbH1cbiAgICAgICAgICAgICAgICAgICAgb3Blbj17Qm9vbGVhbih0aGlzLnN0YXRlLmFuY2hvckVsKX1cbiAgICAgICAgICAgICAgICAgICAgb25DbG9zZT17dGhpcy5oYW5kbGVDbG9zZS5iaW5kKHRoaXMsIG51bGwpfVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgPE1lbnVJdGVtIG9uQ2xpY2s9e3RoaXMuaGFuZGxlQ2xvc2UuYmluZCh0aGlzLCAnbmFtZScpfT5SZWxhdmFuY2U8L01lbnVJdGVtPlxuICAgICAgICAgICAgICAgICAgICA8TWVudUl0ZW0gb25DbGljaz17dGhpcy5oYW5kbGVDbG9zZS5iaW5kKHRoaXMsICdwcmljZScpfT5GZWU8L01lbnVJdGVtPlxuICAgICAgICAgICAgICAgICAgICA8TWVudUl0ZW0gb25DbGljaz17dGhpcy5oYW5kbGVDbG9zZS5iaW5kKHRoaXMsICdkaXN0YW5jZScpfT5EaXN0YW5jZTwvTWVudUl0ZW0+XG4gICAgICAgICAgICAgICAgPC9NZW51PlxuXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlLm9wZW5GaWx0ZXIgPyA8ZGl2IG9uQ2xpY2s9e3RoaXMudG9nZ2xlRmlsdGVyLmJpbmQodGhpcyl9IGNsYXNzTmFtZT1cIm92ZXJsYXkgYmxhY2tcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwid2lkZ2V0IGZpbHRlci1wb3B1cFwiIG9uQ2xpY2s9eyhlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgICAgICAgICAgICAgICAgICAgICAgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3aWRnZXQtY29udGVudFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZpbHRlclJvd1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGxcIj5QcmljZTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRyXCI+UnMge3RoaXMuc3RhdGUucHJpY2VSYW5nZVswXX0gdG8ge3RoaXMuc3RhdGUucHJpY2VSYW5nZVsxXX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJibFwiPlJzIDEwMDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImJyXCI+UnMgMjAwMDwvc3Bhbj5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPFJhbmdlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWluPXsxMDB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF4PXsyMDAwfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXt0aGlzLnN0YXRlLnByaWNlUmFuZ2V9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RlcD17MTAwfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInJhbmdlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5oYW5kbGVSYW5nZS5iaW5kKHRoaXMsICdwcmljZVJhbmdlJyl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmaWx0ZXJSb3dcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRsXCI+RGlzdGFuY2U8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0clwiPnt0aGlzLnN0YXRlLmRpc3RhbmNlUmFuZ2VbMF19IHRvIHt0aGlzLnN0YXRlLmRpc3RhbmNlUmFuZ2VbMV19IEtNPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiYmxcIj4xID4gS008L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJiclwiPjUwIEtNPC9zcGFuPlxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8UmFuZ2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtaW49ezF9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF4PXs1MH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17dGhpcy5zdGF0ZS5kaXN0YW5jZVJhbmdlfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0ZXA9ezF9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicmFuZ2VcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZVJhbmdlLmJpbmQodGhpcywgJ2Rpc3RhbmNlUmFuZ2UnKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwid2lkZ2V0LWZvb3RlciBwZC0wXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwidi1idG4gdi1idG4tcHJpbWFyeSBidG4tYmxvY2sgYnRuLWxnXCIgb25DbGljaz17dGhpcy5hcHBseUZpbHRlcnMuYmluZCh0aGlzKX0+QXBwbHk8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj4gOiBcIlwiXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICA8L3NlY3Rpb24+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IFRvcEJhclxuIiwiaW1wb3J0IFRvcEJhciBmcm9tICcuL1RvcEJhci5qcydcblxuZXhwb3J0IGRlZmF1bHQgVG9wQmFyIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBMb2FkZXIgZnJvbSAnLi4vLi4vY29tbW9ucy9Mb2FkZXInXG5cbmNsYXNzIFRlc3RTZWxlY3RvclZpZXcgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgc2VsZWN0ZWRMYWI6IHRoaXMucHJvcHMubWF0Y2gucGFyYW1zLmlkXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgdGhpcy5wcm9wcy5nZXRMYWJCeUlkKHRoaXMuc3RhdGUuc2VsZWN0ZWRMYWIpXG4gICAgfVxuXG4gICAgdG9nZ2xlVGVzdCh0ZXN0KSB7XG4gICAgICAgIHRoaXMucHJvcHMudG9nZ2xlRGlhZ25vc2lzQ3JpdGVyaWEoJ3Rlc3QnLCB0ZXN0KVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgXG4gICAgICAgIGxldCBsYWJEYXRhID0gdGhpcy5wcm9wcy5MQUJTW3RoaXMuc3RhdGUuc2VsZWN0ZWRMYWJdXG4gICAgICAgIGxldCB0ZXN0cyA9IFtdXG4gICAgICAgIGxldCBzZWxlY3RlZFRlc3RzID0gW11cblxuICAgICAgICBpZiAodGhpcy5wcm9wcy5zZWxlY3RlZENyaXRlcmlhcyAmJiB0aGlzLnByb3BzLnNlbGVjdGVkQ3JpdGVyaWFzLmxlbmd0aCkge1xuICAgICAgICAgICAgc2VsZWN0ZWRUZXN0cyA9IHRoaXMucHJvcHMuc2VsZWN0ZWRDcml0ZXJpYXMuZmlsdGVyKHggPT4geC50eXBlID09ICd0ZXN0JykubWFwKHggPT4geC5pZClcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgaWYgKGxhYkRhdGEgJiYgbGFiRGF0YS50ZXN0cyAmJiBsYWJEYXRhLnRlc3RzLmxlbmd0aCkge1xuICAgICAgICAgICAgdGVzdHMgPSBsYWJEYXRhLnRlc3RzLm1hcCgodGVzdCwgaSkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiA8bGkga2V5PXtpfT5cbiAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImNrLWJ4XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICB7dGVzdC50ZXN0Lm5hbWV9XG4gICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgY2hlY2tlZD17c2VsZWN0ZWRUZXN0cy5pbmRleE9mKHRlc3QudGVzdC5pZCkgPiAtMX0gb25DaGFuZ2U9e3RoaXMudG9nZ2xlVGVzdC5iaW5kKHRoaXMsIHRlc3QudGVzdCl9IC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJjaGVja21hcmtcIiAvPlxuICAgICAgICAgICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXN0LXByaWNlIHRleHQtbWQgZnctNTAwXCI+e3Rlc3QubXJwfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2PlxuXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBsYWJEYXRhID9cblxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aGVhZGVyIGNsYXNzTmFtZT1cInNraW4td2hpdGUgZml4ZWQgaG9yaXpvbnRhbCB0b3AgbG9jYXRpb24tZGV0ZWN0LWhlYWRlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lci1mbHVpZFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC0xMlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNlbGVjdC1sb2NhdGlvbi1yb3cgdGV4dC1jZW50ZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnByb3BzLmhpc3RvcnkuZ28oLTEpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fSBjbGFzc05hbWU9XCJjdC1pbWcgY3QtaW1nLW1kIGNsb3NlXCI+PGltZyBzcmM9XCIvYXNzZXRzL2ltZy9jdXN0b21lci1pY29ucy9jbG9zZS1ibGFjay5zdmdcIiBjbGFzc05hbWU9XCJpbWctZmx1aWRcIiAvPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoNCBjbGFzc05hbWU9XCJmdy03MDAgdGV4dC1tZFwiPkFsbCBUZXN0PC9oND5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtMTJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzZWFyY2gtcm93XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkb24tZ3JvdXAgbG9jYXRpb24tZGV0ZWN0LWZpZWxkXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sIGlucHV0LW1kIHNlYXJjaC1pbnB1dCBuby1zaGFkb3dcIiBwbGFjZWhvbGRlcj1cIlNlYXJjaCBUZXN0XCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJjdC1pbWcgY3QtaW1nLXNtIG1hcC1tYXJrZXItYmx1ZVwiPjxpbWcgc3JjPVwiL2Fzc2V0cy9pbWcvY3VzdG9tZXItaWNvbnMvc2VhcmNoLWljb24uc3ZnXCIgY2xhc3NOYW1lPVwiaW1nLWZsdWlkXCIgLz48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZGV0ZWN0LW15LWxvY2FpdG9uXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiY3QtaW1nIGN0LWltZy14c1wiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3NlbGVjdGVkVGVzdHMubGVuZ3RofSBTZWxlY3RlZCBJdGVtXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9oZWFkZXI+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c2VjdGlvbiBjbGFzc05hbWU9XCJ3cmFwIGFsbC10ZXN0LXNjcmVlbiBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3aWRnZXQtcGFuZWxcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGFuZWwtY29udGVudCBwZC0wXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHVsIGNsYXNzTmFtZT1cImxpc3QgYWxsLXRlc3QtbGlzdFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7dGVzdHN9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NlY3Rpb24+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cInYtYnRuIHYtYnRuLXByaW1hcnkgYnRuLWxnIGZpeGVkIGhvcml6b250YWwgYm90dG9tIG5vLXJvdW5kIHRleHQtbGdcIiBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuaGlzdG9yeS5nbygtMSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fT5Eb25lPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj4gOiA8TG9hZGVyIC8+XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFRlc3RTZWxlY3RvclZpZXdcbiIsImltcG9ydCBUZXN0U2VsZWN0b3IgZnJvbSAnLi9UZXN0U2VsZWN0b3InXG5leHBvcnQgZGVmYXVsdCBUZXN0U2VsZWN0b3IiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcblxuaW1wb3J0IFRpbWVTbG90U2VsZWN0b3IgZnJvbSAnLi4vLi4vY29tbW9ucy90aW1lU2xvdFNlbGVjdG9yL2luZGV4LmpzJ1xuaW1wb3J0IFNlbGVjdGVkQ2xpbmljIGZyb20gJy4uL2NvbW1vbnMvc2VsZWN0ZWRDbGluaWMvaW5kZXguanMnXG5cbmNsYXNzIEFwcG9pbnRtZW50U2xvdCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgICBzZWxlY3RlZERvY3RvcjogdGhpcy5wcm9wcy5tYXRjaC5wYXJhbXMuaWQsXG4gICAgICAgICAgICBzZWxlY3RlZENsaW5pYzogdGhpcy5wcm9wcy5tYXRjaC5wYXJhbXMuY2xpbmljSWQsXG4gICAgICAgICAgICB0aW1lU2xvdHM6IG51bGwsXG4gICAgICAgICAgICBzZWxlY3RlZFNsb3Q6IG51bGxcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByb2NlZWQoKSB7XG4gICAgICAgIC8vIGlmICh0aGlzLnN0YXRlLnNlbGVjdGVkU2xvdCkge1xuICAgICAgICAvLyAgICAgdGhpcy5jb250ZXh0LnJvdXRlci5oaXN0b3J5LnB1c2goYC9kb2N0b3Jwcm9maWxlLyR7dGhpcy5zdGF0ZS5zZWxlY3RlZERvY3Rvcn0vJHt0aGlzLnN0YXRlLnNlbGVjdGVkQ2xpbmljfS9ib29rZGV0YWlscz90PSR7dGhpcy5zdGF0ZS5zZWxlY3RlZFNsb3Quc3RhcnR9YClcbiAgICAgICAgLy8gfVxuICAgIH1cblxuICAgIHNlbGVjdFRpbWVTbG90KHNsb3QpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHNlbGVjdGVkU2xvdDogc2xvdCB9KVxuICAgIH1cblxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgICBsZXQgY2xpbmljSWQgPSB0aGlzLnByb3BzLm1hdGNoLnBhcmFtcy5jbGluaWNJZFxuICAgICAgICBsZXQgZG9jdG9ySWQgPSB0aGlzLnByb3BzLm1hdGNoLnBhcmFtcy5pZFxuXG4gICAgICAgIHRoaXMucHJvcHMuZ2V0VGltZVNsb3RzKGRvY3RvcklkLCBjbGluaWNJZCwgKHRpbWVTbG90cykgPT4ge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHRpbWVTbG90cyB9KVxuICAgICAgICB9KVxuXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2PlxuXG4gICAgICAgICAgICAgICAgPGhlYWRlciBjbGFzc05hbWU9XCJza2luLXByaW1hcnkgZml4ZWQgaG9yaXpvbnRhbCB0b3BcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250YWluZXItZmx1aWRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtMlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJpY29uIGJhY2staWNvblwiIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuaGlzdG9yeS5nbygtMSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfX0+PGltZyBzcmM9XCIvYXNzZXRzL2ltZy9jdXN0b21lci1pY29ucy9iYWNrLXdoaXRlLnBuZ1wiIGNsYXNzTmFtZT1cImltZy1mbHVpZFwiIC8+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLThcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJoZWFkZXItdGl0bGUgZnctNzAwIGNhcGl0YWxpemUgdGV4dC13aGl0ZSB0ZXh0LWNlbnRlclwiPlNlbGVjdCBEYXRlIGFuZCBUaW1lPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtMlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvaGVhZGVyPlxuXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnByb3BzLkRPQ1RPUlNbdGhpcy5zdGF0ZS5zZWxlY3RlZERvY3Rvcl0gP1xuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdj5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzZWN0aW9uIGNsYXNzTmFtZT1cIndyYXAgZHItcHJvZmlsZS1zY3JlZW5cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250YWluZXItZmx1aWRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtMTJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPFNlbGVjdGVkQ2xpbmljXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZERvY3Rvcj17dGhpcy5wcm9wcy5ET0NUT1JTW3RoaXMuc3RhdGUuc2VsZWN0ZWREb2N0b3JdfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRDbGluaWM9e3RoaXMuc3RhdGUuc2VsZWN0ZWRDbGluaWN9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZS50aW1lU2xvdHMgP1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxUaW1lU2xvdFNlbGVjdG9yXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpbWVTbG90cz17dGhpcy5zdGF0ZS50aW1lU2xvdHN9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdFRpbWVTbG90PXt0aGlzLnNlbGVjdFRpbWVTbG90LmJpbmQodGhpcyl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLz4gOiAnJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NlY3Rpb24+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PiA6IFwiXCJcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cInYtYnRuIHYtYnRuLXByaW1hcnkgYnRuLWxnIGZpeGVkIGhvcml6b250YWwgYm90dG9tIG5vLXJvdW5kIHRleHQtbGdcIj5TZWxlY3Q8L2J1dHRvbj5cblxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IEFwcG9pbnRtZW50U2xvdFxuIiwiaW1wb3J0IEFwcG9pbnRtZW50U2xvdCBmcm9tICcuL0FwcG9pbnRtZW50U2xvdC5qcydcblxuZXhwb3J0IGRlZmF1bHQgQXBwb2ludG1lbnRTbG90IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBTdGVwcGVyLCB7IFN0ZXAsIFN0ZXBMYWJlbCB9IGZyb20gJ21hdGVyaWFsLXVpL1N0ZXBwZXInO1xuXG5pbXBvcnQgQ2FsSWNvbiBmcm9tICdtYXRlcmlhbC11aS1pY29ucy9DYWxsJztcblxuXG5jbGFzcyBCb29raW5nVmlldyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJvb2tpbmdcIj5cbiAgICAgICAgICAgICAgICA8U3RlcHBlciBhY3RpdmVTdGVwPXswfSBhbHRlcm5hdGl2ZUxhYmVsPlxuICAgICAgICAgICAgICAgICAgICA8U3RlcCBrZXk9ezB9PlxuICAgICAgICAgICAgICAgICAgICAgICAgPFN0ZXBMYWJlbD57XCJBcHBvaW50bWVudCBSZXF1ZXN0ZWRcIn08L1N0ZXBMYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgPC9TdGVwPlxuICAgICAgICAgICAgICAgICAgICA8U3RlcCBrZXk9ezF9PlxuICAgICAgICAgICAgICAgICAgICAgICAgPFN0ZXBMYWJlbD57XCJBcHBvaW50bWVudCBDb25maXJtZWRcIn08L1N0ZXBMYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgPC9TdGVwPlxuICAgICAgICAgICAgICAgICAgICA8U3RlcCBrZXk9ezJ9PlxuICAgICAgICAgICAgICAgICAgICAgICAgPFN0ZXBMYWJlbD57XCJBcHBvaW50bWVudCBDb21wbGV0ZVwifTwvU3RlcExhYmVsPlxuICAgICAgICAgICAgICAgICAgICA8L1N0ZXA+XG4gICAgICAgICAgICAgICAgPC9TdGVwcGVyPlxuICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInJlcXVlc3RMaW5lXCI+V2UgaGF2ZSByZXF1ZXN0ZWQgRHIuU21pdGggdG8gY29uZmlybSB5b3VyIGFwcG9pbnRtZW50PC9wPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGF0aWVudE5hbWVcIj5cbiAgICAgICAgICAgICAgICAgICAgPHA+Zm9yPC9wPlxuICAgICAgICAgICAgICAgICAgICA8cD5CcmlqZXNoIEt1bWFyPC9wPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJkZXRhaWxzXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJsYmxcIj5XaXRoPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiY250bnRcIj5Eci4gU3RldmUgU21pdGg8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwibGJsXCI+V2hlcmU8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJjbnRudFwiPlNhcnZvZGF5YSBDbGluaWMsICMgMzYxLCBTZWN0b3IgNTAsIEd1cmdhb248L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwibGJsXCI+V2hlbjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImNudG50XCI+V2VkbmVzZGF5LCBKdW5lIDI3LCAyMDE4LCAxMTo0NUFNPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImxibFwiPlJlZmVyZW5jZSM8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJjbnRudFwiPkhVVkhKQjg3SEpCSkg8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJyZXF1ZXN0XCI+UmVxdWVzdCBSZS1TY2hlZHVsZS9DYW5jZWw8L2J1dHRvbj5cblxuICAgICAgICAgICAgICAgIDxDYWxJY29uIGNsYXNzTmFtZT1cImNhbGxJY29uXCIvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IEJvb2tpbmdWaWV3XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgRG9jdG9yUHJvZmlsZUNhcmQgZnJvbSAnLi4vY29tbW9ucy9kb2N0b3JQcm9maWxlQ2FyZC9pbmRleC5qcydcbmltcG9ydCBDbGluaWNTZWxlY3RvciBmcm9tICcuLi9jb21tb25zL2NsaW5pY1NlbGVjdG9yL2luZGV4LmpzJ1xuXG5jbGFzcyBDbGluaWNMaXN0VmlldyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgICBzZWxlY3RlZERvY3RvcjogbnVsbFxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIGxldCBkb2N0b3JJZCA9IHRoaXMucHJvcHMubWF0Y2gucGFyYW1zLmlkXG4gICAgICAgIGlmIChkb2N0b3JJZCkge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHNlbGVjdGVkRG9jdG9yOiBkb2N0b3JJZCB9KVxuICAgICAgICAgICAgdGhpcy5wcm9wcy5nZXREb2N0b3JCeUlkKGRvY3RvcklkKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImRvY3RvclByb2ZpbGVcIj5cblxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5ET0NUT1JTW3RoaXMuc3RhdGUuc2VsZWN0ZWREb2N0b3JdID9cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPERvY3RvclByb2ZpbGVDYXJkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhpZGVCb3R0b209e3RydWV9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhpZGVCb29rTm93PXt0cnVlfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXRhaWxzPXt0aGlzLnByb3BzLkRPQ1RPUlNbdGhpcy5zdGF0ZS5zZWxlY3RlZERvY3Rvcl19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Q2xpbmljU2VsZWN0b3JcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGV0YWlscz17dGhpcy5wcm9wcy5ET0NUT1JTW3RoaXMuc3RhdGUuc2VsZWN0ZWREb2N0b3JdfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7Li4udGhpcy5wcm9wc31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+IDogXCJcIlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBDbGluaWNMaXN0Vmlld1xuIiwiaW1wb3J0IENsaW5pY0xpc3RWaWV3IGZyb20gJy4vQ2xpbmljTGlzdFZpZXcuanMnXG5cbmV4cG9ydCBkZWZhdWx0IENsaW5pY0xpc3RWaWV3IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cbmNsYXNzIENsaW5pY1NlbGVjdG9yIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICB9XG5cbiAgICBzZWxlY3RDbGluaWMoY2xpbmljSWQpIHtcbiAgICAgICAgbGV0IGRvY3RvcklkID0gdGhpcy5wcm9wcy5tYXRjaC5wYXJhbXMuaWRcbiAgICAgICAgdGhpcy5wcm9wcy5oaXN0b3J5LnB1c2goYC9vcGQvZG9jdG9yLyR7ZG9jdG9ySWR9LyR7Y2xpbmljSWR9L2Jvb2tgKVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICBsZXQgeyBuYW1lLCBob3NwaXRhbHMgfSA9IHRoaXMucHJvcHMuZGV0YWlsc1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIndpZGdldC1wYW5lbFwiPlxuICAgICAgICAgICAgICAgIDxoNCBjbGFzc05hbWU9XCJwYW5lbC10aXRsZVwiPkRyLiB7bmFtZX0gQXZhaWxhYmxlIGF0PC9oND5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBhbmVsLWNvbnRlbnQgc2Nyb2xsLXhcIj5cbiAgICAgICAgICAgICAgICAgICAgPHVsIGNsYXNzTmFtZT1cImlubGluZS1saXN0IENsaW5pYy1jYXJkLWxpc3RcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBob3NwaXRhbHMubWFwKChob3NwaXRhbCwgaSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gPGxpIGtleT17aX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIndpZGdldCBuby1zaGFkb3dcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIndpZGdldC1oZWFkZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGg0IGNsYXNzTmFtZT1cIndpZGdldC10aXRsZSB0ZXh0LW1kIGZ3LTcwMFwiPntob3NwaXRhbC5ob3NwaXRhbF9uYW1lfSA8c3BhbiBjbGFzc05hbWU9XCJmbG9hdC1yaWdodFwiPlJzIHtob3NwaXRhbC5mZWVzfTwvc3Bhbj48L2g0PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwid2lkZ2V0LWNvbnRlbnRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsb2NhdGlvbi1kZXRhaWxzXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW1nIHNyYz1cIi9hc3NldHMvaW1nL2N1c3RvbWVyLWljb25zL21hcC1tYXJrZXItYmx1ZS5wbmdcIiBjbGFzc05hbWU9XCJpbWctZmx1aWRcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwiYWRkcmVzc1wiPntob3NwaXRhbC5hZGRyZXNzfTwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGltaW5nLWRldGFpbHNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBPYmplY3Qua2V5cyhob3NwaXRhbC50aW1pbmdzKS5tYXAoKHRpbWluZ0tleSwga2V5KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiA8cCBjbGFzc05hbWU9XCJmdy03MDBcIiBrZXk9e2tleX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiZnctNzAwIHRleHQtbWQgdGV4dC1wcmltYXJ5XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3RpbWluZ0tleX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7aG9zcGl0YWwudGltaW5nc1t0aW1pbmdLZXldLmpvaW4oJywgJyl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIndpZGdldC1mb290ZXIgdGV4dC1jZW50ZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJ2LWJ0biB2LWJ0bi1wcmltYXJ5IG91dGxpbmVcIiBvbkNsaWNrPXt0aGlzLnNlbGVjdENsaW5pYy5iaW5kKHRoaXMsIGhvc3BpdGFsLmhvc3BpdGFsX2lkKX0+Qm9vayBOb3c8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBDbGluaWNTZWxlY3RvclxuIiwiaW1wb3J0IENsaW5pY1NlbGVjdG9yIGZyb20gJy4vQ2xpbmljU2VsZWN0b3IuanMnXG5cbmV4cG9ydCBkZWZhdWx0IENsaW5pY1NlbGVjdG9yIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cbmNsYXNzIERvY3RvclByb2ZpbGVDYXJkIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICB9XG5cbiAgICBjYXJkQ2xpY2soaWQsIGUpIHtcbiAgICAgICAgdGhpcy5wcm9wcy5oaXN0b3J5LnB1c2goYC9vcGQvZG9jdG9yLyR7aWR9YClcbiAgICB9XG5cbiAgICBib29rTm93KGlkLCBlKSB7XG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKClcbiAgICAgICAgLy8gdGhpcy5wcm9wcy5oaXN0b3J5LnB1c2goYC9kb2N0b3Jwcm9maWxlLyR7aWR9L2F2YWlsYWJpbGl0eWApXG4gICAgfVxuXG4gICAgZ2V0UXVhbGlmaWNhdGlvblN0cihxdWFsaWZpY2F0aW9uU3BlY2lhbGl6YXRpb24pIHtcbiAgICAgICAgcmV0dXJuIHF1YWxpZmljYXRpb25TcGVjaWFsaXphdGlvbi5yZWR1Y2UoKHN0ciwgY3VyciwgaSkgPT4ge1xuICAgICAgICAgICAgc3RyICs9IGAke2N1cnIucXVhbGlmaWNhdGlvbn1gXG4gICAgICAgICAgICBpZiAoY3Vyci5zcGVjaWFsaXphdGlvbikge1xuICAgICAgICAgICAgICAgIHN0ciArPSBgIC0gJHtjdXJyLnNwZWNpYWxpemF0aW9ufWBcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChpIDwgcXVhbGlmaWNhdGlvblNwZWNpYWxpemF0aW9uLmxlbmd0aCAtIDEpIHN0ciArPSBgLCBgO1xuICAgICAgICAgICAgcmV0dXJuIHN0clxuICAgICAgICB9LCBcIlwiKVxuICAgIH1cblxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIGxldCB7aWQsIGV4cGVyaWVuY2VfeWVhcnMsIGdlbmRlciwgaG9zcGl0YWxzLCBob3NwaXRhbF9jb3VudCwgbmFtZSwgcXVhbGlmaWNhdGlvbnN9ID0gdGhpcy5wcm9wcy5kZXRhaWxzXG5cbiAgICAgICAgbGV0IGhvc3BpdGFsID0gaG9zcGl0YWxzWzBdXG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwid2lkZ2V0IGNhcmQgc2VhcmNoLWRyLWxpc3RcIiBvbkNsaWNrPXt0aGlzLmNhcmRDbGljay5iaW5kKHRoaXMsaWQpfT5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIndpZGdldC1oZWFkZXIgZHItaW5mb1wiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJhdGluZy1hZGRyZXNzIGJldGFcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx1bCBjbGFzc05hbWU9XCJpbmxpbmUtbGlzdCByYXR0aW5nXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpPjxzcGFuIGNsYXNzTmFtZT1cImN0LWltZyBjdC1pbWcteHMgc3Rhci1pY29uXCI+PGltZyBzcmM9XCIvYXNzZXRzL2ltZy9jdXN0b21lci1pY29ucy9zdGFyLnN2Z1wiIGNsYXNzTmFtZT1cImltZy1mbHVpZFwiIC8+PC9zcGFuPjwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpPjxzcGFuIGNsYXNzTmFtZT1cImN0LWltZyBjdC1pbWcteHMgc3Rhci1pY29uXCI+PGltZyBzcmM9XCIvYXNzZXRzL2ltZy9jdXN0b21lci1pY29ucy9zdGFyLnN2Z1wiIGNsYXNzTmFtZT1cImltZy1mbHVpZFwiIC8+PC9zcGFuPjwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpPjxzcGFuIGNsYXNzTmFtZT1cImN0LWltZyBjdC1pbWcteHMgc3Rhci1pY29uXCI+PGltZyBzcmM9XCIvYXNzZXRzL2ltZy9jdXN0b21lci1pY29ucy9zdGFyLnN2Z1wiIGNsYXNzTmFtZT1cImltZy1mbHVpZFwiIC8+PC9zcGFuPjwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpPjxzcGFuIGNsYXNzTmFtZT1cImN0LWltZyBjdC1pbWcteHMgc3Rhci1pY29uXCI+PGltZyBzcmM9XCIvYXNzZXRzL2ltZy9jdXN0b21lci1pY29ucy9zdGFyLnN2Z1wiIGNsYXNzTmFtZT1cImltZy1mbHVpZFwiIC8+PC9zcGFuPjwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpPjxzcGFuIGNsYXNzTmFtZT1cImN0LWltZyBjdC1pbWcteHMgc3Rhci1pY29uXCI+PGltZyBzcmM9XCIvYXNzZXRzL2ltZy9jdXN0b21lci1pY29ucy9oYWxmLXN0YXIuc3ZnXCIgY2xhc3NOYW1lPVwiaW1nLWZsdWlkXCIgLz48L3NwYW4+PC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cD48c3BhbiBjbGFzc05hbWU9XCJjdC1pbWcgY3QtaW1nLXhzXCI+PGltZyBzcmM9XCIvYXNzZXRzL2ltZy9jdXN0b21lci1pY29ucy9tYXAtbWFya2VyLWJsdWUuc3ZnXCIgY2xhc3NOYW1lPVwiaW1nLWZsdWlkXCIgLz48L3NwYW4+e2hvc3BpdGFsLmFkZHJlc3N9PC9wPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhbHBoYSBkci1uYW1lXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aW1nIHNyYz1cIi9hc3NldHMvaW1nL2N1c3RvbWVyLWljb25zL3VzZXIucG5nXCIgY2xhc3NOYW1lPVwiaW1nLWZsdWlkXCIgLz4ge25hbWV9XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwid2lkZ2V0LWNvbnRlbnRcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZXRhIG90aGVyLWluZm8gdGV4dC1yaWdodFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJ2LWJ0biB2LWJ0bi1wcmltYXJ5IGJ0bi1zbVwiPkJvb2sgTm93PC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInByaWNpbmdcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXByaW1hcnkgZnctNzAwIG5ldy1wcmljZVwiPlJzIHtob3NwaXRhbC5kaXNjb3VudGVkX2ZlZXN9IDxzcGFuIGNsYXNzTmFtZT1cIm9sZC1wcmljZVwiPlJzIHtob3NwaXRhbC5mZWVzfTwvc3Bhbj48L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWxwaGEgZHItZXhwLWRldGFpbHNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cImRyLWRlc2cgdGV4dC1tZFwiPnt0aGlzLmdldFF1YWxpZmljYXRpb25TdHIocXVhbGlmaWNhdGlvbnMpfTwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtc20gZnctNTAwIHRleHQtbGlnaHRcIj57ZXhwZXJpZW5jZV95ZWFyc30gWWVhcnMgb2YgRXhwZXJpbmNlPC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1zbSBmdy01MDAgdGV4dC1saWdodFwiPkV4IC0gQUlJTVMsICBFeC0gRm9ydGlzPC9wPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIndpZGdldC1mb290ZXIgY2FyZC1mb290ZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLTZcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cD48aW1nIHNyYz1cIi9hc3NldHMvaW1nL2N1c3RvbWVyLWljb25zL2hvbWUuc3ZnXCIgY2xhc3NOYW1lPVwiaW1nLWZsdWlkXCIgLz48c3BhbiBjbGFzc05hbWU9XCJDbGluYy1uYW1lXCI+e2hvc3BpdGFsLmhvc3BpdGFsX25hbWV9IDxiciAvPiZhbXA7IHtob3NwaXRhbF9jb3VudC0xfSBNb3JlPC9zcGFuPjwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtNlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwPjxpbWcgc3JjPVwiL2Fzc2V0cy9pbWcvY3VzdG9tZXItaWNvbnMvY2xvY2stYmxhY2suc3ZnXCIgY2xhc3NOYW1lPVwiaW1nLWZsdWlkXCIgLz48c3BhbiBjbGFzc05hbWU9XCJ0aW1lLWF2YWlsYWJpbGl0eVwiPjg6MDAgQU0gdG8gMTI6MDAgUE0gPGJyIC8+MjowMCBQTSB0byA3OjAwIFBNPC9zcGFuPjwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBEb2N0b3JQcm9maWxlQ2FyZFxuIiwiaW1wb3J0IERvY3RvclByb2ZpbGVDYXJkIGZyb20gJy4vRG9jdG9yUHJvZmlsZUNhcmQuanMnXG5cbmV4cG9ydCBkZWZhdWx0IERvY3RvclByb2ZpbGVDYXJkIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuY2xhc3MgU2VsZWN0ZWRDbGluaWMgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgICAgICB0aGlzLnN0YXRlID0ge1xuXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRRdWFsaWZpY2F0aW9uU3RyKHF1YWxpZmljYXRpb25TcGVjaWFsaXphdGlvbikge1xuICAgICAgICByZXR1cm4gcXVhbGlmaWNhdGlvblNwZWNpYWxpemF0aW9uLnJlZHVjZSgoc3RyLCBjdXJyLCBpKSA9PiB7XG4gICAgICAgICAgICBzdHIgKz0gYCR7Y3Vyci5xdWFsaWZpY2F0aW9ufWBcbiAgICAgICAgICAgIGlmIChjdXJyLnNwZWNpYWxpemF0aW9uKSB7XG4gICAgICAgICAgICAgICAgc3RyICs9IGAgLSAke2N1cnIuc3BlY2lhbGl6YXRpb259YFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGkgPCBxdWFsaWZpY2F0aW9uU3BlY2lhbGl6YXRpb24ubGVuZ3RoIC0gMSkgc3RyICs9IGAsIGA7XG4gICAgICAgICAgICByZXR1cm4gc3RyXG4gICAgICAgIH0sIFwiXCIpXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIGxldCB7IG5hbWUsIHF1YWxpZmljYXRpb25zLCBob3NwaXRhbHMgfSA9IHRoaXMucHJvcHMuc2VsZWN0ZWREb2N0b3JcbiAgICAgICAgbGV0IGhvc3BpdGFsTmFtZSA9IFwiXCJcblxuICAgICAgICBpZiAoaG9zcGl0YWxzICYmIGhvc3BpdGFscy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGhvc3BpdGFscy5tYXAoKGhvc3BpdGFsKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGhvc3BpdGFsLmhvc3BpdGFsX2lkID09IHRoaXMucHJvcHMuc2VsZWN0ZWRDbGluaWMpIHtcbiAgICAgICAgICAgICAgICAgICAgaG9zcGl0YWxOYW1lID0gaG9zcGl0YWwuaG9zcGl0YWxfbmFtZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3aWRnZXQgbXJ0LTEwIGN0LXByb2ZpbGUgc2tpbi13aGl0ZVwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwid2lkZ2V0LWhlYWRlciBkci1xdWNpay1pbmZvXCI+XG4gICAgICAgICAgICAgICAgICAgIDxpbWcgc3JjPVwiL2Fzc2V0cy9pbWcvY3VzdG9tZXItaWNvbnMvdXNlci5wbmdcIiBjbGFzc05hbWU9XCJpbWctZmx1aWRcIiAvPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImRyLXByb2ZpbGVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxoNCBjbGFzc05hbWU9XCJkci1uYW1lXCI+e25hbWV9PC9oND5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cImRlc2dcIj57dGhpcy5nZXRRdWFsaWZpY2F0aW9uU3RyKHF1YWxpZmljYXRpb25zKX08L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aDQgY2xhc3NOYW1lPVwiZHItbmFtZSBjbGluaWMtbmFtZSBtcnQtMTAgdGV4dC1zbVwiPntob3NwaXRhbE5hbWV9PC9oND5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgU2VsZWN0ZWRDbGluaWNcbiIsImltcG9ydCBTZWxlY3RlZENsaW5pYyBmcm9tICcuL1NlbGVjdGVkQ2xpbmljLmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBTZWxlY3RlZENsaW5pYyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmNvbnN0IGRlYm91bmNlciA9IChmbiwgZGVsYXkpID0+IHtcbiAgICBsZXQgdGltZXIgPSBudWxsXG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVyKVxuICAgICAgICB0aW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgZm4uY2FsbCh0aGlzKVxuICAgICAgICB9LCBkZWxheSlcbiAgICB9XG59XG5cblxuY2xhc3MgQ3JpdGVyaWFTZWFyY2hWaWV3IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIHNlYXJjaFZhbHVlOiAnJyxcbiAgICAgICAgICAgIHNlYXJjaFJlc3VsdHM6IFtdXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgdGhpcy5nZXRTZWFyY2hSZXN1bHRzID0gZGVib3VuY2VyKHRoaXMuZ2V0U2VhcmNoUmVzdWx0cy5iaW5kKHRoaXMpLCAxMDAwKVxuICAgICAgICBsZXQgaW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndG9wQ3JpdGVyaWFTZWFyY2gnKVxuICAgICAgICBpbnB1dC5mb2N1cygpXG4gICAgfVxuXG4gICAgaW5wdXRIYW5kbGVyKGUpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHNlYXJjaFZhbHVlOiBlLnRhcmdldC52YWx1ZSB9KVxuICAgICAgICB0aGlzLmdldFNlYXJjaFJlc3VsdHMoKVxuICAgIH1cblxuICAgIGdldFNlYXJjaFJlc3VsdHMoKSB7XG4gICAgICAgIHRoaXMucHJvcHMuZ2V0Q3JpdGVyaWFSZXN1bHRzKHRoaXMuc3RhdGUuc2VhcmNoVmFsdWUsIChzZWFyY2hSZXN1bHRzKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgc2VhcmNoUmVzdWx0czogc2VhcmNoUmVzdWx0cy5yZXN1bHQgfSlcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBhZGRDcml0ZXJpYShjcml0ZXJpYSwgdHlwZSkge1xuICAgICAgICBjcml0ZXJpYS50eXBlID0gdHlwZVxuICAgICAgICB0aGlzLnByb3BzLnRvZ2dsZUNyaXRlcmlhKGNyaXRlcmlhKVxuICAgICAgICB0aGlzLmNvbnRleHQucm91dGVyLmhpc3RvcnkuZ29CYWNrKClcbiAgICB9XG5cbiAgICBzdGF0aWMgY29udGV4dFR5cGVzID0ge1xuICAgICAgICByb3V0ZXI6ICgpID0+IG51bGxcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibG9jYXRpb25TZWFyY2hcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxvY2F0aW9uU2VhcmNoQm94XCI+XG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCBjbGFzc05hbWU9XCJ0b3BTZWFyY2hcIiBpZD1cInRvcENyaXRlcmlhU2VhcmNoXCIgb25DaGFuZ2U9e3RoaXMuaW5wdXRIYW5kbGVyLmJpbmQodGhpcyl9IHZhbHVlPXt0aGlzLnN0YXRlLnNlYXJjaFZhbHVlfSBwbGFjZWhvbGRlcj1cIlNlYXJjaCBmb3Igc3ltcHRvbXMsIERvY3RvcywgY29uZGl0aW9ucyAuLmV0Y1wiLz5cbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZS5zZWFyY2hSZXN1bHRzLm1hcCgodHlwZSxpKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPVwic2VhcmNoUmVzdWx0VHlwZVwiIGtleT17aX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwPnt0eXBlLm5hbWV9PC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlLmRhdGEubWFwKChyZXN1bHREYXRhLGopID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gPHNwYW4ga2V5PXtqfSBjbGFzc05hbWU9XCJwYWMtaXRlbVwiIG9uQ2xpY2s9e3RoaXMuYWRkQ3JpdGVyaWEuYmluZCh0aGlzLCByZXN1bHREYXRhLCB0eXBlLnR5cGUpfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3Jlc3VsdERhdGEubmFtZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBDcml0ZXJpYVNlYXJjaFZpZXdcbiIsImltcG9ydCBDcml0ZXJpYVNlYXJjaFZpZXcgZnJvbSAnLi9Dcml0ZXJpYVNlYXJjaFZpZXcuanMnXG5cbmV4cG9ydCBkZWZhdWx0IENyaXRlcmlhU2VhcmNoVmlldyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCBMb2FkZXIgZnJvbSAnLi4vLi4vY29tbW9ucy9Mb2FkZXInXG5cbmltcG9ydCBEb2N0b3JQcm9maWxlQ2FyZCBmcm9tICcuL2RvY3RvclByb2ZpbGVDYXJkJ1xuaW1wb3J0IEFib3V0RG9jdG9yIGZyb20gJy4uL2RvY3RvclByb2ZpbGUvYWJvdXREb2N0b3IvaW5kZXguanMnXG5pbXBvcnQgUHJvZmVzc2lvbmFsR3JhcGggZnJvbSAnLi4vZG9jdG9yUHJvZmlsZS9wcm9mZXNzaW9uYWxHcmFwaC9pbmRleC5qcydcbmltcG9ydCBDbGluaWNTZWxlY3RvciBmcm9tICcuLi9jb21tb25zL2NsaW5pY1NlbGVjdG9yL2luZGV4LmpzJ1xuXG5jbGFzcyBEb2N0b3JQcm9maWxlVmlldyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgICBzZWxlY3RlZERvY3RvcjogdGhpcy5wcm9wcy5tYXRjaC5wYXJhbXMuaWRcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdj5cblxuICAgICAgICAgICAgICAgIDxoZWFkZXIgY2xhc3NOYW1lPVwic2tpbi1wcmltYXJ5IGZpeGVkIGhvcml6b250YWwgdG9wXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGFpbmVyLWZsdWlkXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLTRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJoZWFkZXItdGl0bGUgZnctNzAwIGNhcGl0YWxpemUgdGV4dC13aGl0ZVwiPklDT048L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC00XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtNFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dWwgY2xhc3NOYW1lPVwiaW5saW5lLWxpc3QgZmxvYXQtcmlnaHQgdXNlci1ub3RpZmljYXRpb24tYWN0aW9uXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGk+PHNwYW4gY2xhc3NOYW1lPVwiaWNvbiBpY29uLW1kIHRleHQtbWlkZGxlXCI+PGltZyBzcmM9XCIvYXNzZXRzL2ltZy9jdXN0b21lci1pY29ucy91c2VyLnN2Z1wiIGNsYXNzTmFtZT1cImltZy1mbHVpZFwiIC8+PC9zcGFuPjwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGk+PHNwYW4gY2xhc3NOYW1lPVwiaWNvbiBpY29uLW1kIHRleHQtbWlkZGxlIG5vdGlmaWNhdGlvbi1pY29uXCI+PGltZyBzcmM9XCIvYXNzZXRzL2ltZy9jdXN0b21lci1pY29ucy9ub3RpZmljYXRpb24uc3ZnXCIgY2xhc3NOYW1lPVwiaW1nLWZsdWlkXCIgLz4gPHNwYW4gY2xhc3NOYW1lPVwibm90aWZpY2F0aW9uLWFsZXJ0XCIgLz48L3NwYW4+PC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2hlYWRlcj5cblxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5ET0NUT1JTW3RoaXMuc3RhdGUuc2VsZWN0ZWREb2N0b3JdID9cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNlY3Rpb24gY2xhc3NOYW1lPVwid3JhcCBkci1wcm9maWxlLXNjcmVlblwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lci1mbHVpZFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC0xMlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIndpZGdldCBtcnQtMTAgY3QtcHJvZmlsZSBza2luLXdoaXRlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8RG9jdG9yUHJvZmlsZUNhcmRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXRhaWxzPXt0aGlzLnByb3BzLkRPQ1RPUlNbdGhpcy5zdGF0ZS5zZWxlY3RlZERvY3Rvcl19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3aWRnZS1jb250ZW50IHBkLTBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8QWJvdXREb2N0b3JcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGV0YWlscz17dGhpcy5wcm9wcy5ET0NUT1JTW3RoaXMuc3RhdGUuc2VsZWN0ZWREb2N0b3JdfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Q2xpbmljU2VsZWN0b3JcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGV0YWlscz17dGhpcy5wcm9wcy5ET0NUT1JTW3RoaXMuc3RhdGUuc2VsZWN0ZWREb2N0b3JdfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7Li4udGhpcy5wcm9wc31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPFByb2Zlc3Npb25hbEdyYXBoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRldGFpbHM9e3RoaXMucHJvcHMuRE9DVE9SU1t0aGlzLnN0YXRlLnNlbGVjdGVkRG9jdG9yXX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc2VjdGlvbj5cblxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+IDogPExvYWRlciAvPlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgRG9jdG9yUHJvZmlsZVZpZXdcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG5jbGFzcyBBYm91dERvY3RvciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIGxlc3NBYm91dDogXCJcIixcbiAgICAgICAgICAgIHJlYWRNb3JlOiBmYWxzZVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIGxldCB7IGFib3V0IH0gPSB0aGlzLnByb3BzLmRldGFpbHNcblxuICAgICAgICBpZiAoYWJvdXQgJiYgYWJvdXQubGVuZ3RoID4gMTAwKSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICByZWFkTW9yZTogdHJ1ZVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgbGVzc0Fib3V0OiBhYm91dC5zbGljZSgwLCAxMDApXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIGxldCB7IGFib3V0LCBuYW1lIH0gPSB0aGlzLnByb3BzLmRldGFpbHNcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3aWRnZXQtcGFuZWxcIj5cbiAgICAgICAgICAgICAgICA8aDQgY2xhc3NOYW1lPVwicGFuZWwtdGl0bGVcIj5BYm91dCB7bmFtZX08L2g0PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGFuZWwtY29udGVudFwiPlxuICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJmdy01MDAgdGV4dC1tZFwiPnt0aGlzLnN0YXRlLmxlc3NBYm91dH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlLnJlYWRNb3JlID8gPGEgY2xhc3NOYW1lPVwiZnctNzAwIHRleHQtcHJpbWFyeVwiIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHJlYWRNb3JlOiBmYWxzZSwgbGVzc0Fib3V0OiBhYm91dCB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19PlJFQUQgTU9SRTwvYT4gOiBcIlwiXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBBYm91dERvY3RvclxuIiwiaW1wb3J0IEFib3V0RG9jdG9yIGZyb20gJy4vQWJvdXREb2N0b3IuanMnXG5cbmV4cG9ydCBkZWZhdWx0IEFib3V0RG9jdG9yIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cbmNsYXNzIERvY3RvclByb2ZpbGVDYXJkIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICB9XG5cbiAgICBnZXRRdWFsaWZpY2F0aW9uU3RyKHF1YWxpZmljYXRpb25TcGVjaWFsaXphdGlvbikge1xuICAgICAgICByZXR1cm4gcXVhbGlmaWNhdGlvblNwZWNpYWxpemF0aW9uLnJlZHVjZSgoc3RyLCBjdXJyLCBpKSA9PiB7XG4gICAgICAgICAgICBzdHIgKz0gYCR7Y3Vyci5xdWFsaWZpY2F0aW9ufWBcbiAgICAgICAgICAgIGlmIChjdXJyLnNwZWNpYWxpemF0aW9uKSB7XG4gICAgICAgICAgICAgICAgc3RyICs9IGAgLSAke2N1cnIuc3BlY2lhbGl6YXRpb259YFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGkgPCBxdWFsaWZpY2F0aW9uU3BlY2lhbGl6YXRpb24ubGVuZ3RoIC0gMSkgc3RyICs9IGAsIGA7XG4gICAgICAgICAgICByZXR1cm4gc3RyXG4gICAgICAgIH0sIFwiXCIpXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIGxldCB7IG5hbWUsIGV4cGVyaWVuY2VfeWVhcnMsIHF1YWxpZmljYXRpb25zIH0gPSB0aGlzLnByb3BzLmRldGFpbHNcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3aWRnZXQtaGVhZGVyIGRyLXF1Y2lrLWluZm9cIj5cbiAgICAgICAgICAgICAgICA8aW1nIHNyYz1cIi9hc3NldHMvaW1nL2N1c3RvbWVyLWljb25zL3VzZXIucG5nXCIgY2xhc3NOYW1lPVwiaW1nLWZsdWlkXCIgLz5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImRyLXByb2ZpbGVcIj5cbiAgICAgICAgICAgICAgICAgICAgPGg0IGNsYXNzTmFtZT1cImRyLW5hbWVcIj57bmFtZX08L2g0PlxuICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJkZXNnXCI+e3RoaXMuZ2V0UXVhbGlmaWNhdGlvblN0cihxdWFsaWZpY2F0aW9ucyl9PC9wPlxuICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJhZGQtZGV0YWlsc1wiPntleHBlcmllbmNlX3llYXJzfSBZZWFycyBvZiBFeHBlcmluY2U8L3A+XG4gICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cImFkZC1kZXRhaWxzXCI+RXggLSBBSUlNUywgRXgtIEZvcnRpczwvcD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBEb2N0b3JQcm9maWxlQ2FyZFxuIiwiaW1wb3J0IERvY3RvclByb2ZpbGVDYXJkIGZyb20gJy4vRG9jdG9yUHJvZmlsZUNhcmQnXG5cbmV4cG9ydCBkZWZhdWx0IERvY3RvclByb2ZpbGVDYXJkIiwiaW1wb3J0IERvY3RvclByb2ZpbGVWaWV3IGZyb20gJy4vRG9jdG9yUHJvZmlsZVZpZXcuanMnXG5cbmV4cG9ydCBkZWZhdWx0IERvY3RvclByb2ZpbGVWaWV3IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cbmltcG9ydCBFeHBhbnNpb25QYW5lbCwge1xuICAgIEV4cGFuc2lvblBhbmVsU3VtbWFyeSxcbiAgICBFeHBhbnNpb25QYW5lbERldGFpbHMsXG59IGZyb20gJ21hdGVyaWFsLXVpL0V4cGFuc2lvblBhbmVsJztcbmltcG9ydCBFeHBhbmRNb3JlSWNvbiBmcm9tICdtYXRlcmlhbC11aS1pY29ucy9FeHBhbmRNb3JlJztcblxuXG5jbGFzcyBQcm9mZXNzaW9uYWxHcmFwaCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwid2lkZ2V0LXBhbmVsXCI+XG4gICAgICAgICAgICAgICAgPGg0IGNsYXNzTmFtZT1cInBhbmVsLXRpdGxlXCI+UHJvZmVzc2lvbmFsIEdyYXBoPC9oND5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBhbmVsLWNvbnRlbnQgcGQtMFwiPlxuICAgICAgICAgICAgICAgICAgICA8dWwgY2xhc3NOYW1lPVwibGlzdCBkcm9wLWRvd24tbGlzdFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGxpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxFeHBhbnNpb25QYW5lbD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPEV4cGFuc2lvblBhbmVsU3VtbWFyeSBleHBhbmRJY29uPXs8RXhwYW5kTW9yZUljb24gLz59PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0aXRsZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEVkdWNhdGlvbiA8c3BhbiBjbGFzc05hbWU9XCJmbG9hdC1yaWdodFwiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0V4cGFuc2lvblBhbmVsU3VtbWFyeT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPEV4cGFuc2lvblBhbmVsRGV0YWlscz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9yZS1jb250ZW50XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJmdy03MDAgdGV4dC1zbSB0ZXh0LXByaW1hcnlcIj5RdWFsaWZpY2F0aW9uPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwiZnctNzAwIHRleHQtbWQgdGV4dC1saWdodFwiPk1EPC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiZnctNzAwIHRleHQtc20gdGV4dC1wcmltYXJ5XCI+U3BlY2lhbGl6YXRpb248L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJmdy03MDAgdGV4dC1tZCB0ZXh0LWxpZ2h0XCI+RGVybWl0b2xvZ3k8L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJmdy03MDAgdGV4dC1zbSB0ZXh0LXByaW1hcnlcIj5Db2xsZWdlPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwiZnctNzAwIHRleHQtbWQgdGV4dC1saWdodFwiPk1HVSBVbml2ZXJzaXR5LCAyMDA5PC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvRXhwYW5zaW9uUGFuZWxEZXRhaWxzPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvRXhwYW5zaW9uUGFuZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGxpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxFeHBhbnNpb25QYW5lbD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPEV4cGFuc2lvblBhbmVsU3VtbWFyeSBleHBhbmRJY29uPXs8RXhwYW5kTW9yZUljb24gLz59PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0aXRsZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEFzc29jaWF0ZSBDbGluaWMvSG9zcGl0YWwgPHNwYW4gY2xhc3NOYW1lPVwiZmxvYXQtcmlnaHRcIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9FeHBhbnNpb25QYW5lbFN1bW1hcnk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxFeHBhbnNpb25QYW5lbERldGFpbHM+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vcmUtY29udGVudFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiZnctNzAwIHRleHQtc20gdGV4dC1wcmltYXJ5XCI+UXVhbGlmaWNhdGlvbjwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cImZ3LTcwMCB0ZXh0LW1kIHRleHQtbGlnaHRcIj5NRDwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImZ3LTcwMCB0ZXh0LXNtIHRleHQtcHJpbWFyeVwiPlNwZWNpYWxpemF0aW9uPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwiZnctNzAwIHRleHQtbWQgdGV4dC1saWdodFwiPkRlcm1pdG9sb2d5PC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiZnctNzAwIHRleHQtc20gdGV4dC1wcmltYXJ5XCI+Q29sbGVnZTwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cImZ3LTcwMCB0ZXh0LW1kIHRleHQtbGlnaHRcIj5NR1UgVW5pdmVyc2l0eSwgMjAwOTwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0V4cGFuc2lvblBhbmVsRGV0YWlscz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0V4cGFuc2lvblBhbmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxsaT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8RXhwYW5zaW9uUGFuZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxFeHBhbnNpb25QYW5lbFN1bW1hcnkgZXhwYW5kSWNvbj17PEV4cGFuZE1vcmVJY29uIC8+fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGl0bGVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBMYW5ndWFnZSA8c3BhbiBjbGFzc05hbWU9XCJmbG9hdC1yaWdodFwiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0V4cGFuc2lvblBhbmVsU3VtbWFyeT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPEV4cGFuc2lvblBhbmVsRGV0YWlscz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9yZS1jb250ZW50XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJmdy03MDAgdGV4dC1zbSB0ZXh0LXByaW1hcnlcIj5RdWFsaWZpY2F0aW9uPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwiZnctNzAwIHRleHQtbWQgdGV4dC1saWdodFwiPk1EPC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiZnctNzAwIHRleHQtc20gdGV4dC1wcmltYXJ5XCI+U3BlY2lhbGl6YXRpb248L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJmdy03MDAgdGV4dC1tZCB0ZXh0LWxpZ2h0XCI+RGVybWl0b2xvZ3k8L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJmdy03MDAgdGV4dC1zbSB0ZXh0LXByaW1hcnlcIj5Db2xsZWdlPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwiZnctNzAwIHRleHQtbWQgdGV4dC1saWdodFwiPk1HVSBVbml2ZXJzaXR5LCAyMDA5PC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvRXhwYW5zaW9uUGFuZWxEZXRhaWxzPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvRXhwYW5zaW9uUGFuZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGxpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxFeHBhbnNpb25QYW5lbD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPEV4cGFuc2lvblBhbmVsU3VtbWFyeSBleHBhbmRJY29uPXs8RXhwYW5kTW9yZUljb24gLz59PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0aXRsZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEF3YXJkcyA8c3BhbiBjbGFzc05hbWU9XCJmbG9hdC1yaWdodFwiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0V4cGFuc2lvblBhbmVsU3VtbWFyeT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPEV4cGFuc2lvblBhbmVsRGV0YWlscz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9yZS1jb250ZW50XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJmdy03MDAgdGV4dC1zbSB0ZXh0LXByaW1hcnlcIj5RdWFsaWZpY2F0aW9uPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwiZnctNzAwIHRleHQtbWQgdGV4dC1saWdodFwiPk1EPC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiZnctNzAwIHRleHQtc20gdGV4dC1wcmltYXJ5XCI+U3BlY2lhbGl6YXRpb248L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJmdy03MDAgdGV4dC1tZCB0ZXh0LWxpZ2h0XCI+RGVybWl0b2xvZ3k8L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJmdy03MDAgdGV4dC1zbSB0ZXh0LXByaW1hcnlcIj5Db2xsZWdlPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwiZnctNzAwIHRleHQtbWQgdGV4dC1saWdodFwiPk1HVSBVbml2ZXJzaXR5LCAyMDA5PC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvRXhwYW5zaW9uUGFuZWxEZXRhaWxzPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvRXhwYW5zaW9uUGFuZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGxpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxFeHBhbnNpb25QYW5lbD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPEV4cGFuc2lvblBhbmVsU3VtbWFyeSBleHBhbmRJY29uPXs8RXhwYW5kTW9yZUljb24gLz59PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0aXRsZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEFzc29jaWF0ZSBNZW1iZXJzaGlwIDxzcGFuIGNsYXNzTmFtZT1cImZsb2F0LXJpZ2h0XCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvRXhwYW5zaW9uUGFuZWxTdW1tYXJ5PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8RXhwYW5zaW9uUGFuZWxEZXRhaWxzPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb3JlLWNvbnRlbnRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImZ3LTcwMCB0ZXh0LXNtIHRleHQtcHJpbWFyeVwiPlF1YWxpZmljYXRpb248L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJmdy03MDAgdGV4dC1tZCB0ZXh0LWxpZ2h0XCI+TUQ8L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJmdy03MDAgdGV4dC1zbSB0ZXh0LXByaW1hcnlcIj5TcGVjaWFsaXphdGlvbjwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cImZ3LTcwMCB0ZXh0LW1kIHRleHQtbGlnaHRcIj5EZXJtaXRvbG9neTwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImZ3LTcwMCB0ZXh0LXNtIHRleHQtcHJpbWFyeVwiPkNvbGxlZ2U8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJmdy03MDAgdGV4dC1tZCB0ZXh0LWxpZ2h0XCI+TUdVIFVuaXZlcnNpdHksIDIwMDk8L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9FeHBhbnNpb25QYW5lbERldGFpbHM+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9FeHBhbnNpb25QYW5lbD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPEV4cGFuc2lvblBhbmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8RXhwYW5zaW9uUGFuZWxTdW1tYXJ5IGV4cGFuZEljb249ezxFeHBhbmRNb3JlSWNvbiAvPn0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRpdGxlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRXhwZXJpbmVjZSA8c3BhbiBjbGFzc05hbWU9XCJmbG9hdC1yaWdodFwiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0V4cGFuc2lvblBhbmVsU3VtbWFyeT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPEV4cGFuc2lvblBhbmVsRGV0YWlscz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9yZS1jb250ZW50XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJmdy03MDAgdGV4dC1zbSB0ZXh0LXByaW1hcnlcIj5RdWFsaWZpY2F0aW9uPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwiZnctNzAwIHRleHQtbWQgdGV4dC1saWdodFwiPk1EPC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiZnctNzAwIHRleHQtc20gdGV4dC1wcmltYXJ5XCI+U3BlY2lhbGl6YXRpb248L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJmdy03MDAgdGV4dC1tZCB0ZXh0LWxpZ2h0XCI+RGVybWl0b2xvZ3k8L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJmdy03MDAgdGV4dC1zbSB0ZXh0LXByaW1hcnlcIj5Db2xsZWdlPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwiZnctNzAwIHRleHQtbWQgdGV4dC1saWdodFwiPk1HVSBVbml2ZXJzaXR5LCAyMDA5PC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvRXhwYW5zaW9uUGFuZWxEZXRhaWxzPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvRXhwYW5zaW9uUGFuZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGxpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxFeHBhbnNpb25QYW5lbD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPEV4cGFuc2lvblBhbmVsU3VtbWFyeSBleHBhbmRJY29uPXs8RXhwYW5kTW9yZUljb24gLz59PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0aXRsZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFN1YnNjcmliZWQgU2VyaXZjZXMgPHNwYW4gY2xhc3NOYW1lPVwiZmxvYXQtcmlnaHRcIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9FeHBhbnNpb25QYW5lbFN1bW1hcnk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxFeHBhbnNpb25QYW5lbERldGFpbHM+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vcmUtY29udGVudFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiZnctNzAwIHRleHQtc20gdGV4dC1wcmltYXJ5XCI+UXVhbGlmaWNhdGlvbjwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cImZ3LTcwMCB0ZXh0LW1kIHRleHQtbGlnaHRcIj5NRDwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImZ3LTcwMCB0ZXh0LXNtIHRleHQtcHJpbWFyeVwiPlNwZWNpYWxpemF0aW9uPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwiZnctNzAwIHRleHQtbWQgdGV4dC1saWdodFwiPkRlcm1pdG9sb2d5PC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiZnctNzAwIHRleHQtc20gdGV4dC1wcmltYXJ5XCI+Q29sbGVnZTwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cImZ3LTcwMCB0ZXh0LW1kIHRleHQtbGlnaHRcIj5NR1UgVW5pdmVyc2l0eSwgMjAwOTwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0V4cGFuc2lvblBhbmVsRGV0YWlscz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0V4cGFuc2lvblBhbmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBQcm9mZXNzaW9uYWxHcmFwaFxuIiwiaW1wb3J0IFByb2Zlc3Npb25hbEdyYXBoIGZyb20gJy4vUHJvZmVzc2lvbmFsR3JhcGguanMnXG5cbmV4cG9ydCBkZWZhdWx0IFByb2Zlc3Npb25hbEdyYXBoIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgYXhpb3MgZnJvbSAnYXhpb3MnXG5cbmNsYXNzIExvY2F0aW9uU2VhcmNoIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIHNlYXJjaDogXCJcIixcbiAgICAgICAgICAgIHNlYXJjaFJlc3VsdHM6IFtdXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRMb2NhdGlvbihsb2NhdGlvbikge1xuICAgICAgICB2YXIgYXV0byA9IG5ldyBnb29nbGUubWFwcy5wbGFjZXMuQXV0b2NvbXBsZXRlU2VydmljZSgpXG5cbiAgICAgICAgdmFyIHJlcXVlc3QgPSB7XG4gICAgICAgICAgICBpbnB1dDogbG9jYXRpb24sXG4gICAgICAgICAgICB0eXBlczogWydnZW9jb2RlJ10sXG4gICAgICAgICAgICBjb21wb25lbnRSZXN0cmljdGlvbnM6IHsgY291bnRyeTogJ2luJyB9XG4gICAgICAgIH07XG4gICAgICAgIGlmIChsb2NhdGlvbikge1xuICAgICAgICAgICAgYXV0by5nZXRQbGFjZVByZWRpY3Rpb25zKHJlcXVlc3QsIGZ1bmN0aW9uIChyZXN1bHRzLCBzdGF0dXMpIHtcbiAgICAgICAgICAgICAgICByZXN1bHRzID0gcmVzdWx0cyB8fCBbXVxuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBzZWFyY2hSZXN1bHRzOiByZXN1bHRzIH0pXG4gICAgICAgICAgICB9LmJpbmQodGhpcykpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpbnB1dEhhbmRsZXIoZSkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIHNlYXJjaDogZS50YXJnZXQudmFsdWVcbiAgICAgICAgfSlcbiAgICAgICAgdGhpcy5nZXRMb2NhdGlvbihlLnRhcmdldC52YWx1ZSlcblxuICAgIH1cblxuICAgIHNlbGVjdExvY2F0aW9uKGxvY2F0aW9uKSB7XG4gICAgICAgIGxldCBtYXAgPSBuZXcgZ29vZ2xlLm1hcHMuTWFwKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYXAnKSwge1xuICAgICAgICAgICAgY2VudGVyOiB7IGxhdDogLTMzLjg2NywgbG5nOiAxNTEuMTk1IH0sXG4gICAgICAgICAgICB6b29tOiAxNVxuICAgICAgICB9KVxuICAgICAgICBsZXQgc2VydmljZSA9IG5ldyBnb29nbGUubWFwcy5wbGFjZXMuUGxhY2VzU2VydmljZShtYXApO1xuICAgICAgICBzZXJ2aWNlLmdldERldGFpbHMoe1xuICAgICAgICAgICAgcmVmZXJlbmNlOiBsb2NhdGlvbi5yZWZlcmVuY2VcbiAgICAgICAgfSwgZnVuY3Rpb24gKHBsYWNlLCBzdGF0dXMpIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMuc2VsZWN0TG9jYXRpb24ocGxhY2UpXG4gICAgICAgICAgICB0aGlzLnByb3BzLmhpc3RvcnkuZ28oLTEpXG5cbiAgICAgICAgfS5iaW5kKHRoaXMpKVxuICAgIH1cblxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgICBsZXQgaW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndG9wTG9jYXRpb25TZWFyY2gnKVxuICAgICAgICBpbnB1dC5mb2N1cygpXG4gICAgfVxuXG4gICAgZGV0ZWN0TG9jYXRpb24oKSB7XG4gICAgICAgIGlmIChuYXZpZ2F0b3IuZ2VvbG9jYXRpb24pIHtcbiAgICAgICAgICAgIG5hdmlnYXRvci5nZW9sb2NhdGlvbi5nZXRDdXJyZW50UG9zaXRpb24oKHBvc2l0aW9uKSA9PiB7XG4gICAgICAgICAgICAgICAgdmFyIGxhdGxuZyA9IHsgbGF0OiBwYXJzZUZsb2F0KHBvc2l0aW9uLmNvb3Jkcy5sYXRpdHVkZSksIGxuZzogcGFyc2VGbG9hdChwb3NpdGlvbi5jb29yZHMubG9uZ2l0dWRlKSB9O1xuXG4gICAgICAgICAgICAgICAgbGV0IGdlb2NvZGVyID0gbmV3IGdvb2dsZS5tYXBzLkdlb2NvZGVyXG4gICAgICAgICAgICAgICAgZ2VvY29kZXIuZ2VvY29kZSh7ICdsb2NhdGlvbic6IGxhdGxuZyB9LCAocmVzdWx0cywgc3RhdHVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHRzICYmIHJlc3VsdHNbMF0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuc2VsZWN0TG9jYXRpb24ocmVzdWx0c1swXSlcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuaGlzdG9yeS5nbygtMSlcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgLy8gZ2VvbG9jYXRpb24gaXMgbm90IHN1cHBvcnRlZFxuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhdGljIGNvbnRleHRUeXBlcyA9IHtcbiAgICAgICAgcm91dGVyOiAoKSA9PiBudWxsXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIDxoZWFkZXIgY2xhc3NOYW1lPVwic2tpbi13aGl0ZSBmaXhlZCBob3Jpem9udGFsIHRvcCBsb2NhdGlvbi1kZXRlY3QtaGVhZGVyXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGFpbmVyLWZsdWlkXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLTEyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic2VsZWN0LWxvY2F0aW9uLXJvdyB0ZXh0LWNlbnRlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuaGlzdG9yeS5nbygtMSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19IGNsYXNzTmFtZT1cImN0LWltZyBjdC1pbWctbWQgY2xvc2VcIj48aW1nIHNyYz1cIi9hc3NldHMvaW1nL2N1c3RvbWVyLWljb25zL2Nsb3NlLWJsYWNrLnN2Z1wiIGNsYXNzTmFtZT1cImltZy1mbHVpZFwiIC8+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGg0IGNsYXNzTmFtZT1cImZ3LTcwMCB0ZXh0LW1kXCI+U2VsZWN0IExvY2F0aW9uPC9oND5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtMTJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzZWFyY2gtcm93XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkb24tZ3JvdXAgbG9jYXRpb24tZGV0ZWN0LWZpZWxkXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgdmFsdWU9e3RoaXMuc3RhdGUuc2VhcmNofSBvbkNoYW5nZT17dGhpcy5pbnB1dEhhbmRsZXIuYmluZCh0aGlzKX0gY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sIGlucHV0LW1kIHNlYXJjaC1pbnB1dCBuby1zaGFkb3dcIiBwbGFjZWhvbGRlcj1cIlNlbGVjdCBhbnkgY2l0eSBvciBsb2NhbGl0eVwiIGlkPVwidG9wTG9jYXRpb25TZWFyY2hcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImN0LWltZyBjdC1pbWctc20gbWFwLW1hcmtlci1ibHVlXCI+PGltZyBzcmM9XCIvYXNzZXRzL2ltZy9jdXN0b21lci1pY29ucy9tYXAtbWFya2VyLWJsdWUuc3ZnXCIgY2xhc3NOYW1lPVwiaW1nLWZsdWlkXCIgLz48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZGV0ZWN0LW15LWxvY2FpdG9uXCIgb25DbGljaz17dGhpcy5kZXRlY3RMb2NhdGlvbi5iaW5kKHRoaXMpfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJjdC1pbWcgY3QtaW1nLXhzXCI+PGltZyBzcmM9XCIvYXNzZXRzL2ltZy9jdXN0b21lci1pY29ucy9ncHMuc3ZnXCIgY2xhc3NOYW1lPVwiaW1nLWZsdWlkXCIgLz48L3NwYW4+RGV0ZWN0IE15IExvY2F0aW9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9oZWFkZXI+XG4gICAgICAgICAgICAgICAgPHNlY3Rpb24gY2xhc3NOYW1lPVwid3JhcCBsb2NhdG9uLWRldGVjdC1zY3JlZW5cIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3aWRnZXQtcGFuZWxcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxoNCBjbGFzc05hbWU9XCJwYW5lbC10aXRsZVwiPlNlYXJjaCBSZXN1bHQ8L2g0PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwYW5lbC1jb250ZW50IHBkLTBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dWwgY2xhc3NOYW1lPVwibGlzdCBjaXR5LWxpc3RcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZS5zZWFyY2hSZXN1bHRzLm1hcCgocmVzdWx0LCBpKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDxsaSBrZXk9e2l9IG9uQ2xpY2s9e3RoaXMuc2VsZWN0TG9jYXRpb24uYmluZCh0aGlzLCByZXN1bHQpfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGE+e3Jlc3VsdC5kZXNjcmlwdGlvbn1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImNpdHktbG9jXCI+Q2l0eTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L3NlY3Rpb24+XG4gICAgICAgICAgICAgICAgPGRpdiBpZD1cIm1hcFwiIHN0eWxlPXt7IGRpc3BsYXk6ICdub25lJyB9fT48L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBMb2NhdGlvblNlYXJjaFxuIiwiaW1wb3J0IExvY2F0aW9uU2VhcmNoIGZyb20gJy4vTG9jYXRpb25TZWFyY2guanMnXG5cblxuZXhwb3J0IGRlZmF1bHQgTG9jYXRpb25TZWFyY2giLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcblxuaW1wb3J0IERvY3RvclByb2ZpbGVDYXJkIGZyb20gJy4uL2NvbW1vbnMvZG9jdG9yUHJvZmlsZUNhcmQvaW5kZXguanMnXG5pbXBvcnQgRGV0YWlsc0Zvcm0gZnJvbSAnLi9kZXRhaWxzRm9ybS9pbmRleC5qcydcbmltcG9ydCBTZWxlY3RlZENsaW5pYyBmcm9tICcuLi9jb21tb25zL3NlbGVjdGVkQ2xpbmljL2luZGV4LmpzJ1xuXG5jbGFzcyBQYXRpZW50RGV0YWlscyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgICBzZWxlY3RlZERvY3RvcjogbnVsbCxcbiAgICAgICAgICAgIHNlbGVjdGVkQ2xpbmljOiBudWxsLFxuICAgICAgICAgICAgc2VsZWN0ZWRTbG90OiBudWxsXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcm9jZWVkKCl7XG4gICAgICAgIHRoaXMuY29udGV4dC5yb3V0ZXIuaGlzdG9yeS5wdXNoKCcvcGF5bWVudCcpXG4gICAgfVxuXG4gICAgZ2V0TG9jYXRpb25QYXJhbSh0YWcpIHtcbiAgICAgICAgLy8gdGhpcyBBUEkgYXNzdW1lcyB0aGUgY29udGV4dCBvZiByZWFjdC1yb3V0ZXItNFxuICAgICAgICBjb25zdCBwYXJhbVN0cmluZyA9IHRoaXMucHJvcHMubG9jYXRpb24uc2VhcmNoXG4gICAgICAgIGNvbnN0IHBhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXMocGFyYW1TdHJpbmcpXG4gICAgICAgIHJldHVybiBwYXJhbXMuZ2V0KHRhZylcbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGxldCBkb2N0b3JJZCA9IHRoaXMucHJvcHMubWF0Y2gucGFyYW1zLmlkXG4gICAgICAgICAgICBsZXQgY2xpbmljSWQgPSB0aGlzLnByb3BzLm1hdGNoLnBhcmFtcy5jbGluaWNJZFxuICAgICAgICAgICAgbGV0IHNlbGVjdGVkU2xvdCA9IHRoaXMuZ2V0TG9jYXRpb25QYXJhbSgndCcpXG4gICAgICAgICAgICBzZWxlY3RlZFNsb3QgPSBuZXcgRGF0ZShwYXJzZUZsb2F0KHNlbGVjdGVkU2xvdCkpXG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIGlmIChkb2N0b3JJZCAmJiBjbGluaWNJZCAmJiBzZWxlY3RlZFNsb3QpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWREb2N0b3I6IGRvY3RvcklkLFxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZENsaW5pYzogY2xpbmljSWQsXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkU2xvdDogc2VsZWN0ZWRTbG90LnRvU3RyaW5nKClcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuZ2V0RG9jdG9yQnlJZChkb2N0b3JJZClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaCAoZSkge1xuXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdGF0aWMgY29udGV4dFR5cGVzID0ge1xuICAgICAgICByb3V0ZXI6ICgpID0+IG51bGxcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGF0aWVudERldGFpbHNcIj5cblxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5ET0NUT1JTW3RoaXMuc3RhdGUuc2VsZWN0ZWREb2N0b3JdID9cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPERvY3RvclByb2ZpbGVDYXJkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhpZGVCb3R0b209e3RydWV9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhpZGVCb29rTm93PXt0cnVlfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXRhaWxzPXt0aGlzLnByb3BzLkRPQ1RPUlNbdGhpcy5zdGF0ZS5zZWxlY3RlZERvY3Rvcl19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8U2VsZWN0ZWRDbGluaWNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWREb2N0b3I9e3RoaXMucHJvcHMuRE9DVE9SU1t0aGlzLnN0YXRlLnNlbGVjdGVkRG9jdG9yXX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRDbGluaWM9e3RoaXMuc3RhdGUuc2VsZWN0ZWRDbGluaWN9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNlbGVjdGVkQXBwb2ludG1lbnRTbG90XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoNT5TZWxlY3RlZCBBcHBvaW50bWVudCBTbG90PC9oNT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiYXBwZGF0ZVwiPkFwcG9pbnRtZW50IERhdGU8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImRhdGVcIj57IHRoaXMuc3RhdGUuc2VsZWN0ZWRTbG90IH08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPERldGFpbHNGb3JtIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJwcm9jZWVkYnRuXCIgb25DbGljaz17dGhpcy5wcm9jZWVkLmJpbmQodGhpcyl9PkNvbmZpcm0gQm9va2luZzwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+IDogXCJcIlxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IFBhdGllbnREZXRhaWxzXG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcblxuY2xhc3MgRGV0YWlsc0Zvcm0gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgcGF0aWVudE5hbWUgOiAnJyxcbiAgICAgICAgICAgIHBhdGllbnRFbWFpbCA6ICcnLFxuICAgICAgICAgICAgcGF0aWVudEdlbmRlciA6ICdtYWxlJyxcbiAgICAgICAgICAgIHBhdGllbnRNb2JpbGUgOiAnJyxcbiAgICAgICAgICAgIG90cCA6JydcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlucHV0SGFuZGxlcih3aGljaCwgZSl7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBbd2hpY2hdIDogZS50YXJnZXQudmFsdWUgfSlcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZGV0YWlsc0Zvcm1cIj5cbiAgICAgICAgICAgICAgICA8aDU+UGxlYXNlIHByb3ZpZGUgcGF0aWVudCBkZXRhaWxzPC9oNT5cblxuICAgICAgICAgICAgICAgIDxpbnB1dCB2YWx1ZT17dGhpcy5zdGF0ZS5wYXRpZW50TmFtZX0gb25DaGFuZ2U9e3RoaXMuaW5wdXRIYW5kbGVyLmJpbmQodGhpcywncGF0aWVudE5hbWUnKX0gY2xhc3NOYW1lPVwicHRuYW1lXCIgcGxhY2Vob2xkZXI9XCJQYXRpZW50IE5hbWUqXCIgLz5cbiAgICAgICAgICAgICAgICA8aW5wdXQgdmFsdWU9e3RoaXMuc3RhdGUucGF0aWVudEVtYWlsfSBvbkNoYW5nZT17dGhpcy5pbnB1dEhhbmRsZXIuYmluZCh0aGlzLCdwYXRpZW50RW1haWwnKX0gY2xhc3NOYW1lPVwicHRlbWFpbFwiIHBsYWNlaG9sZGVyPVwiRW1haWwqXCIgLz5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInB0Z2VuZGVyXCI+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuPkdlbmRlciA6PC9zcGFuPiBcbiAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJyYWRpb1wiIG5hbWU9XCJnZW5kZXJcIiB2YWx1ZT1cIm1hbGVcIiBjaGVja2VkPXt0aGlzLnN0YXRlLnBhdGllbnRHZW5kZXIgPT09IFwibWFsZVwifSBvbkNoYW5nZT17dGhpcy5pbnB1dEhhbmRsZXIuYmluZCh0aGlzLCdwYXRpZW50R2VuZGVyJyl9Lz4gTWFsZVxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInJhZGlvXCIgbmFtZT1cImdlbmRlclwiIHZhbHVlPVwiZmVtYWxlXCIgY2hlY2tlZD17dGhpcy5zdGF0ZS5wYXRpZW50R2VuZGVyID09PSBcImZlbWFsZVwifSBvbkNoYW5nZT17dGhpcy5pbnB1dEhhbmRsZXIuYmluZCh0aGlzLCdwYXRpZW50R2VuZGVyJyl9Lz4gRmVtYWxlXG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGlucHV0IHZhbHVlPXt0aGlzLnN0YXRlLnBhdGllbnRNb2JpbGV9IG9uQ2hhbmdlPXt0aGlzLmlucHV0SGFuZGxlci5iaW5kKHRoaXMsJ3BhdGllbnRNb2JpbGUnKX0gY2xhc3NOYW1lPVwicHRtb2JpbGVcIiBwbGFjZWhvbGRlcj1cIk1vYmlsZSpcIiAvPlxuICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwib3RwYnRuXCI+KFJlKVNlbmQgT1RQPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPGlucHV0IHZhbHVlPXt0aGlzLnN0YXRlLm90cH0gb25DaGFuZ2U9e3RoaXMuaW5wdXRIYW5kbGVyLmJpbmQodGhpcywnb3RwJyl9IGNsYXNzTmFtZT1cInB0b3RwXCIgcGxhY2Vob2xkZXI9XCJFbnRlciBPVFAqXCIgLz5cblxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IERldGFpbHNGb3JtXG4iLCJpbXBvcnQgRGV0YWlsc0Zvcm0gZnJvbSAnLi9EZXRhaWxzRm9ybS5qcydcblxuZXhwb3J0IGRlZmF1bHQgRGV0YWlsc0Zvcm0iLCJpbXBvcnQgUGF0aWVudERldGFpbHMgZnJvbSAnLi9QYXRpZW50RGV0YWlscy5qcydcblxuZXhwb3J0IGRlZmF1bHQgUGF0aWVudERldGFpbHMiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgUGF5bWVudEljb24gZnJvbSAnbWF0ZXJpYWwtdWktaWNvbnMvUGF5bWVudCc7XG5pbXBvcnQgQ2FzaEljb24gZnJvbSAnbWF0ZXJpYWwtdWktaWNvbnMvQXR0YWNoTW9uZXknO1xuXG5jbGFzcyBQYXltZW50VmlldyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgfVxuXG4gICAgcHJvY2VlZCgpe1xuICAgICAgICB0aGlzLmNvbnRleHQucm91dGVyLmhpc3RvcnkucHVzaChcIi9ib29raW5nLzpyZWZJZFwiKVxuICAgIH1cblxuICAgIHN0YXRpYyBjb250ZXh0VHlwZXMgPSB7XG4gICAgICAgIHJvdXRlcjogKCkgPT4gbnVsbFxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwYXltZW50XCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJvZmZlclJvd1wiPlxuICAgICAgICAgICAgICAgICAgICA8c3Bhbj5HZXQgMTAlIGNhc2hiYWNrIGZvciBhbGwgb25saW5lIHBheW1lbnQsIFQmQzwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBheW1lbnRSb3dcIiBvbkNsaWNrPXt0aGlzLnByb2NlZWQuYmluZCh0aGlzKX0+XG4gICAgICAgICAgICAgICAgICAgIDxQYXltZW50SWNvbiBjbGFzc05hbWU9XCJwYXltZW50SWNvblwiIC8+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuPlBheXRtIFdhbGxldDwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBheW1lbnRSb3dcIiBvbkNsaWNrPXt0aGlzLnByb2NlZWQuYmluZCh0aGlzKX0+XG4gICAgICAgICAgICAgICAgICAgIDxQYXltZW50SWNvbiBjbGFzc05hbWU9XCJwYXltZW50SWNvblwiIC8+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuPkNyZWRpdC9EZWJpdC9BVE0gQ2FyZDwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBheW1lbnRSb3dcIiBvbkNsaWNrPXt0aGlzLnByb2NlZWQuYmluZCh0aGlzKX0+XG4gICAgICAgICAgICAgICAgICAgIDxQYXltZW50SWNvbiBjbGFzc05hbWU9XCJwYXltZW50SWNvblwiIC8+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuPk5ldCBCYW5raW5nPC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGF5bWVudFJvd1wiIG9uQ2xpY2s9e3RoaXMucHJvY2VlZC5iaW5kKHRoaXMpfT5cbiAgICAgICAgICAgICAgICAgICAgPENhc2hJY29uIGNsYXNzTmFtZT1cInBheW1lbnRJY29uXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4+UGF5IGluIENhc2g8L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwYXltZW50Um93XCIgb25DbGljaz17dGhpcy5wcm9jZWVkLmJpbmQodGhpcyl9PlxuICAgICAgICAgICAgICAgICAgICA8UGF5bWVudEljb24gY2xhc3NOYW1lPVwicGF5bWVudEljb25cIiAvPlxuICAgICAgICAgICAgICAgICAgICA8c3Bhbj5PbkRvYyBQYXk8L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgUGF5bWVudFZpZXdcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG5pbXBvcnQgQ29tbW9ubHlTZWFyY2hlZCBmcm9tICcuLi8uLi9jb21tb25zL2NvbW1vbmx5U2VhcmNoZWQvaW5kZXguanMnXG5pbXBvcnQgQ3JpdGVyaWFTZWFyY2ggZnJvbSAnLi4vLi4vY29tbW9ucy9jcml0ZXJpYVNlYXJjaCdcblxuY2xhc3MgU2VhcmNoQ3JpdGVyaWFWaWV3IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICB9XG5cbiAgICBzZWFyY2hQcm9jZWVkKCkge1xuICAgICAgICBsZXQgc2VhcmNoRGF0YSA9IHtcbiAgICAgICAgICAgIHNlbGVjdGVkQ3JpdGVyaWFzOiB0aGlzLnByb3BzLnNlbGVjdGVkQ3JpdGVyaWFzLFxuICAgICAgICAgICAgc2VsZWN0ZWRMb2NhdGlvbjogdGhpcy5wcm9wcy5zZWxlY3RlZExvY2F0aW9uLFxuICAgICAgICB9XG4gICAgICAgIHNlYXJjaERhdGEgPSBlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc2VhcmNoRGF0YSkpXG4gICAgICAgIGxldCBmaWx0ZXJEYXRhID0gZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHRoaXMucHJvcHMuZmlsdGVyQ3JpdGVyaWEpKVxuICAgICAgICB0aGlzLnByb3BzLmhpc3RvcnkucHVzaChgL29wZC9zZWFyY2hyZXN1bHRzP3NlYXJjaD0ke3NlYXJjaERhdGF9JmZpbHRlcj0ke2ZpbHRlckRhdGF9YClcbiAgICB9XG5cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgPENyaXRlcmlhU2VhcmNoIHsuLi50aGlzLnByb3BzfSBjaGVja0ZvckxvYWQ9e3RoaXMucHJvcHMuTE9BREVEX1NFQVJDSF9DUklURVJJQV9PUER9IHRpdGxlPVwiU2VhcmNoIEZvciBEaXNlYXNlIG9yIERvY3Rvci5cIiB0eXBlPVwib3BkXCI+XG4gICAgICAgICAgICAgICAgICAgIDxzZWN0aW9uIGNsYXNzTmFtZT1cIndyYXAgd3JhcC0xMDBcIj5cblxuICAgICAgICAgICAgICAgICAgICAgICAgPENvbW1vbmx5U2VhcmNoZWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWFkaW5nPVwiU2VsZWN0ZWQgQ3JpdGVyaWFcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE9e3RoaXMucHJvcHMuc2VsZWN0ZWRDcml0ZXJpYXN9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWQ9e1tdfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvZ2dsZT17dGhpcy5wcm9wcy50b2dnbGVPUERDcml0ZXJpYS5iaW5kKHRoaXMpfVxuICAgICAgICAgICAgICAgICAgICAgICAgLz5cblxuICAgICAgICAgICAgICAgICAgICAgICAgPENvbW1vbmx5U2VhcmNoZWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWFkaW5nPVwiQ29tbW9uIENvbmRpdGlvbnNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJjb25kaXRpb25cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE9e3RoaXMucHJvcHMuY29uZGl0aW9uc31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZD17dGhpcy5wcm9wcy5zZWxlY3RlZENyaXRlcmlhcy5maWx0ZXIoeCA9PiB4LnR5cGUgPT0gJ2NvbmRpdGlvbicpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvZ2dsZT17dGhpcy5wcm9wcy50b2dnbGVPUERDcml0ZXJpYS5iaW5kKHRoaXMpfVxuICAgICAgICAgICAgICAgICAgICAgICAgLz5cblxuICAgICAgICAgICAgICAgICAgICAgICAgPENvbW1vbmx5U2VhcmNoZWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWFkaW5nPVwiQ29tbW9uIFNwZWNpYWxpdGllc1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cInNwZWNpYWxpdHlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE9e3RoaXMucHJvcHMuc3BlY2lhbGl6YXRpb25zfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkPXt0aGlzLnByb3BzLnNlbGVjdGVkQ3JpdGVyaWFzLmZpbHRlcih4ID0+IHgudHlwZSA9PSAnc3BlY2lhbGl0eScpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvZ2dsZT17dGhpcy5wcm9wcy50b2dnbGVPUERDcml0ZXJpYS5iaW5kKHRoaXMpfVxuICAgICAgICAgICAgICAgICAgICAgICAgLz5cblxuICAgICAgICAgICAgICAgICAgICA8L3NlY3Rpb24+XG4gICAgICAgICAgICAgICAgPC9Dcml0ZXJpYVNlYXJjaD5cblxuICAgICAgICAgICAgICAgIDxidXR0b24gb25DbGljaz17dGhpcy5zZWFyY2hQcm9jZWVkLmJpbmQodGhpcyl9IGNsYXNzTmFtZT1cInYtYnRuIHYtYnRuLXByaW1hcnkgYnRuLWxnIGZpeGVkIGhvcml6b250YWwgYm90dG9tIG5vLXJvdW5kIHRleHQtbGdcIj5TaG93IERvY3RvcnM8L2J1dHRvbj5cblxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBTZWFyY2hDcml0ZXJpYVZpZXdcbiIsImltcG9ydCBTZWFyY2hDcml0ZXJpYVZpZXcgZnJvbSAnLi9TZWFyY2hDcml0ZXJpYVZpZXcuanMnXG5cbmV4cG9ydCBkZWZhdWx0IFNlYXJjaENyaXRlcmlhVmlldyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCBEb2N0b3JzTGlzdCBmcm9tICcuLi9zZWFyY2hSZXN1bHRzL2RvY3RvcnNMaXN0L2luZGV4LmpzJ1xuaW1wb3J0IENyaXRlcmlhU2VhcmNoIGZyb20gJy4uLy4uL2NvbW1vbnMvY3JpdGVyaWFTZWFyY2gnXG5pbXBvcnQgVG9wQmFyIGZyb20gJy4vdG9wQmFyJ1xuXG5cbmNsYXNzIFNlYXJjaFJlc3VsdHNWaWV3IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcblxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIHRoaXMuZ2V0RGNvdG9ycygpXG4gICAgfVxuXG4gICAgZ2V0RGNvdG9ycygpIHtcbiAgICAgICAgbGV0IHtcbiAgICAgICAgICAgIHNlbGVjdGVkTG9jYXRpb24sXG4gICAgICAgICAgICBzZWxlY3RlZENyaXRlcmlhcyxcbiAgICAgICAgICAgIGZpbHRlckNyaXRlcmlhXG4gICAgICAgIH0gPSB0aGlzLnByb3BzXG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGxldCBzZWFyY2hTdGF0ZSA9IHRoaXMuZ2V0TG9jYXRpb25QYXJhbSgnc2VhcmNoJylcbiAgICAgICAgICAgIGxldCBmaWx0ZXJDcml0ZXJpYSA9IHRoaXMuZ2V0TG9jYXRpb25QYXJhbSgnZmlsdGVyJylcbiAgICAgICAgICAgIGlmIChmaWx0ZXJDcml0ZXJpYSkge1xuICAgICAgICAgICAgICAgIGZpbHRlckNyaXRlcmlhID0gSlNPTi5wYXJzZShmaWx0ZXJDcml0ZXJpYSlcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZmlsdGVyQ3JpdGVyaWEgPSB7fVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2VhcmNoU3RhdGUgPSBKU09OLnBhcnNlKHNlYXJjaFN0YXRlKVxuICAgICAgICAgICAgdGhpcy5nZXREb2N0b3JMaXN0KHNlYXJjaFN0YXRlLCBmaWx0ZXJDcml0ZXJpYSwgdHJ1ZSlcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihlKVxuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBhcHBseUZpbHRlcnMoZmlsdGVyU3RhdGUpIHtcbiAgICAgICAgbGV0IHNlYXJjaFN0YXRlID0ge1xuICAgICAgICAgICAgc2VsZWN0ZWRDcml0ZXJpYXM6IHRoaXMucHJvcHMuc2VsZWN0ZWRDcml0ZXJpYXMsXG4gICAgICAgICAgICBzZWxlY3RlZExvY2F0aW9uOiB0aGlzLnByb3BzLnNlbGVjdGVkTG9jYXRpb24sXG4gICAgICAgIH1cbiAgICAgICAgbGV0IHNlYXJjaERhdGEgPSBlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc2VhcmNoU3RhdGUpKVxuICAgICAgICBsZXQgZmlsdGVyRGF0YSA9IGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShmaWx0ZXJTdGF0ZSkpXG4gICAgICAgIHRoaXMucHJvcHMuaGlzdG9yeS5yZXBsYWNlKGAvb3BkL3NlYXJjaHJlc3VsdHM/c2VhcmNoPSR7c2VhcmNoRGF0YX0mZmlsdGVyPSR7ZmlsdGVyRGF0YX1gKVxuXG4gICAgICAgIHRoaXMuZ2V0RG9jdG9yTGlzdChzZWFyY2hTdGF0ZSwgZmlsdGVyU3RhdGUsIHRydWUpXG4gICAgfVxuXG4gICAgZ2V0TG9jYXRpb25QYXJhbSh0YWcpIHtcbiAgICAgICAgLy8gdGhpcyBBUEkgYXNzdW1lcyB0aGUgY29udGV4dCBvZiByZWFjdC1yb3V0ZXItNFxuICAgICAgICBjb25zdCBwYXJhbVN0cmluZyA9IHRoaXMucHJvcHMubG9jYXRpb24uc2VhcmNoXG4gICAgICAgIGNvbnN0IHBhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXMocGFyYW1TdHJpbmcpXG4gICAgICAgIHJldHVybiBwYXJhbXMuZ2V0KHRhZylcbiAgICB9XG5cbiAgICBnZXREb2N0b3JMaXN0KHNlYXJjaFN0YXRlLCBmaWx0ZXJDcml0ZXJpYSwgbWVyZ2VTdGF0ZSkge1xuICAgICAgICB0aGlzLnByb3BzLmdldERvY3RvcnMoc2VhcmNoU3RhdGUsIGZpbHRlckNyaXRlcmlhLCBtZXJnZVN0YXRlKTtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIDxDcml0ZXJpYVNlYXJjaCB7Li4udGhpcy5wcm9wc30gY2hlY2tGb3JMb2FkPXt0aGlzLnByb3BzLkxPQURFRF9ET0NUT1JfU0VBUkNIfSB0aXRsZT1cIlNlYXJjaCBGb3IgRGlzZWFzZSBvciBEb2N0b3IuXCIgdHlwZT1cIm9wZFwiPlxuICAgICAgICAgICAgICAgICAgICA8VG9wQmFyIHsuLi50aGlzLnByb3BzfSBhcHBseUZpbHRlcnM9e3RoaXMuYXBwbHlGaWx0ZXJzLmJpbmQodGhpcyl9IC8+XG4gICAgICAgICAgICAgICAgICAgIDxEb2N0b3JzTGlzdCB7Li4udGhpcy5wcm9wc30gLz5cbiAgICAgICAgICAgICAgICA8L0NyaXRlcmlhU2VhcmNoPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBTZWFyY2hSZXN1bHRzVmlld1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cbmltcG9ydCBEb2N0b3JQcm9maWxlQ2FyZCBmcm9tICcuLi8uLi9jb21tb25zL2RvY3RvclByb2ZpbGVDYXJkL2luZGV4LmpzJ1xuLy8gaW1wb3J0IEluZmluaXRlU2Nyb2xsIGZyb20gJ3JlYWN0LWluZmluaXRlLXNjcm9sbGVyJztcblxuXG5jbGFzcyBEb2N0b3JzTGlzdCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIGxldCB7IERPQ1RPUlMsIGRvY3Rvckxpc3QgfSA9IHRoaXMucHJvcHNcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPHNlY3Rpb24gY2xhc3NOYW1lPVwid3JhcCBzZWFyY2gtcmVzdWx0LWRyXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250YWluZXItZmx1aWRcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLTEyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb2N0b3JMaXN0Lm1hcCgoZG9jSWQsIGkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiA8RG9jdG9yUHJvZmlsZUNhcmQgey4uLnRoaXMucHJvcHN9IGRldGFpbHM9e0RPQ1RPUlNbZG9jSWRdfSBrZXk9e2l9IC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9zZWN0aW9uPlxuICAgICAgICApO1xuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBEb2N0b3JzTGlzdFxuIiwiaW1wb3J0IERvY3Rvckxpc3QgZnJvbSAnLi9Eb2N0b3JzTGlzdC5qcydcblxuZXhwb3J0IGRlZmF1bHQgRG9jdG9yTGlzdCIsImltcG9ydCBTZWFyY2hSZXN1bHRzVmlldyBmcm9tICcuL1NlYXJjaFJlc3VsdHNWaWV3LmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBTZWFyY2hSZXN1bHRzVmlldyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG5pbXBvcnQgTWVudSwgeyBNZW51SXRlbSB9IGZyb20gJ21hdGVyaWFsLXVpL01lbnUnO1xuaW1wb3J0IFJhbmdlIGZyb20gJ3JjLXNsaWRlci9saWIvUmFuZ2UnO1xuXG5jbGFzcyBUb3BCYXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgYW5jaG9yRWw6IG51bGwsXG4gICAgICAgICAgICBvcGVuRmlsdGVyOiBmYWxzZSxcbiAgICAgICAgICAgIHByaWNlUmFuZ2U6IFsxMDAsIDE1MDBdLFxuICAgICAgICAgICAgc29ydF9vbjogbnVsbCxcbiAgICAgICAgICAgIHNpdHNfYXRfY2xpbmljOiBmYWxzZSxcbiAgICAgICAgICAgIHNpdHNfYXRfaG9zcGl0YWw6IGZhbHNlLFxuICAgICAgICAgICAgaXNfZmVtYWxlOiBmYWxzZSxcbiAgICAgICAgICAgIGlzX2F2YWlsYWJsZTogZmFsc2VcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMocHJvcHMpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IC4uLnByb3BzLmZpbHRlckNyaXRlcmlhIH0pXG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyAuLi50aGlzLnByb3BzLmZpbHRlckNyaXRlcmlhIH0pXG4gICAgfVxuXG4gICAgaGFuZGxlSW5wdXQoZSkge1xuICAgICAgICBsZXQgZXZOYW1lID0gZS50YXJnZXQubmFtZVxuICAgICAgICBsZXQgY2hlY2tlZCA9IGUudGFyZ2V0LmNoZWNrZWRcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICBbZXZOYW1lXTogY2hlY2tlZFxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBhcHBseUZpbHRlcnMoKSB7XG4gICAgICAgIGxldCBmaWx0ZXJTdGF0ZSA9IHtcbiAgICAgICAgICAgIHByaWNlUmFuZ2U6IHRoaXMuc3RhdGUucHJpY2VSYW5nZSxcbiAgICAgICAgICAgIHNpdHNfYXQ6IHRoaXMuc3RhdGUuc2l0c19hdCxcbiAgICAgICAgICAgIHNvcnRfb246IHRoaXMuc3RhdGUuc29ydF9vbixcbiAgICAgICAgICAgIGlzX2ZlbWFsZTogdGhpcy5zdGF0ZS5pc19mZW1hbGUsXG4gICAgICAgICAgICBpc19hdmFpbGFibGU6IHRoaXMuc3RhdGUuaXNfYXZhaWxhYmxlLFxuICAgICAgICAgICAgc2l0c19hdF9jbGluaWM6IHRoaXMuc3RhdGUuc2l0c19hdF9jbGluaWMsXG4gICAgICAgICAgICBzaXRzX2F0X2hvc3BpdGFsOiB0aGlzLnN0YXRlLnNpdHNfYXRfaG9zcGl0YWxcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnByb3BzLmFwcGx5RmlsdGVycyhmaWx0ZXJTdGF0ZSlcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IG9wZW5GaWx0ZXI6IGZhbHNlIH0pXG4gICAgfVxuXG4gICAgaGFuZGxlT3BlbihldmVudCkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHsgYW5jaG9yRWw6IGV2ZW50LmN1cnJlbnRUYXJnZXQgfSlcbiAgICB9XG5cbiAgICBoYW5kbGVDbG9zZSh0eXBlKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBhbmNob3JFbDogbnVsbCwgc29ydF9vbjogdHlwZSB9LCAoKSA9PiB7XG4gICAgICAgICAgICBpZiAodHlwZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuYXBwbHlGaWx0ZXJzKClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICB0b2dnbGVGaWx0ZXIoKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgb3BlbkZpbHRlcjogIXRoaXMuc3RhdGUub3BlbkZpbHRlclxuICAgICAgICB9KVxuICAgIH1cblxuICAgIGhhbmRsZVJhbmdlKHR5cGUsIHJhbmdlKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgW3R5cGVdOiByYW5nZVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIGdldENyaXRlcmlhU3RyaW5nKHNlbGVjdGVkQ3JpdGVyaWFzKSB7XG4gICAgICAgIGlmIChzZWxlY3RlZENyaXRlcmlhcyAmJiBzZWxlY3RlZENyaXRlcmlhcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiBzZWxlY3RlZENyaXRlcmlhcy5yZWR1Y2UoKGZpbmFsLCBjdXJyLCBpKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGkgIT0gMCkge1xuICAgICAgICAgICAgICAgICAgICBmaW5hbCArPSAnLCAnXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZpbmFsICs9IGAke2N1cnIubmFtZX1gXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZpbmFsXG4gICAgICAgICAgICB9LCBcIlwiKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIGxldCBjcml0ZXJpYVN0ciA9IHRoaXMuZ2V0Q3JpdGVyaWFTdHJpbmcodGhpcy5wcm9wcy5zZWxlY3RlZENyaXRlcmlhcylcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPHNlY3Rpb24gY2xhc3NOYW1lPVwiZmlsdGVyLXJvd1wiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGFpbmVyLWZsdWlkXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC0xMlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmlsdGVyLWl0ZW1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhY3Rpb24tZmlsdGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dWwgY2xhc3NOYW1lPVwiaW5saW5lLWxpc3RcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGkgb25DbGljaz17dGhpcy5oYW5kbGVPcGVuLmJpbmQodGhpcyl9PjxzcGFuIGNsYXNzTmFtZT1cImN0LWltZyBjdC1pbWctc20gZmlsdGVyLWljb24gdGV4dC1yaWdodFwiPjxpbWcgc3JjPVwiL2Fzc2V0cy9pbWcvY3VzdG9tZXItaWNvbnMvcmFuZ2Uuc3ZnXCIgY2xhc3NOYW1lPVwiaW1nLWZsdWlkXCIgLz48L3NwYW4+PC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGkgb25DbGljaz17dGhpcy50b2dnbGVGaWx0ZXIuYmluZCh0aGlzKX0+PHNwYW4gY2xhc3NOYW1lPVwiY3QtaW1nIGN0LWltZy1zbSBmaWx0ZXItaWNvbiB0ZXh0LXJpZ2h0IGFwcGxpZWQtZmlsdGVyXCI+PGltZyBzcmM9XCIvYXNzZXRzL2ltZy9jdXN0b21lci1pY29ucy9maWx0ZXIuc3ZnXCIgY2xhc3NOYW1lPVwiaW1nLWZsdWlkXCIgLz48L3NwYW4+PHNwYW4gY2xhc3NOYW1lPVwiYXBwbGllZC1maWx0ZXItbm90aVwiIC8+PC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZpbHRlci10aXRsZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3RoaXMucHJvcHMuZG9jdG9yTGlzdC5sZW5ndGh9IFJlc3VsdHMgZm91bmQgZm9yIDxzcGFuIGNsYXNzTmFtZT1cImZ3LTcwMFwiPiB7Y3JpdGVyaWFTdHJ9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8TWVudVxuICAgICAgICAgICAgICAgICAgICBpZD1cInNvcnQtbWVudVwiXG4gICAgICAgICAgICAgICAgICAgIGFuY2hvckVsPXt0aGlzLnN0YXRlLmFuY2hvckVsfVxuICAgICAgICAgICAgICAgICAgICBvcGVuPXtCb29sZWFuKHRoaXMuc3RhdGUuYW5jaG9yRWwpfVxuICAgICAgICAgICAgICAgICAgICBvbkNsb3NlPXt0aGlzLmhhbmRsZUNsb3NlLmJpbmQodGhpcywgbnVsbCl9XG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICA8TWVudUl0ZW0gb25DbGljaz17dGhpcy5oYW5kbGVDbG9zZS5iaW5kKHRoaXMsICduYW1lJyl9PlJlbGF2YW5jZTwvTWVudUl0ZW0+XG4gICAgICAgICAgICAgICAgICAgIDxNZW51SXRlbSBvbkNsaWNrPXt0aGlzLmhhbmRsZUNsb3NlLmJpbmQodGhpcywgJ3ByaWNlJyl9PkZlZTwvTWVudUl0ZW0+XG4gICAgICAgICAgICAgICAgICAgIDxNZW51SXRlbSBvbkNsaWNrPXt0aGlzLmhhbmRsZUNsb3NlLmJpbmQodGhpcywgJ2Rpc3RhbmNlJyl9PkRpc3RhbmNlPC9NZW51SXRlbT5cbiAgICAgICAgICAgICAgICAgICAgPE1lbnVJdGVtIG9uQ2xpY2s9e3RoaXMuaGFuZGxlQ2xvc2UuYmluZCh0aGlzLCAnZXhwZXJpZW5jZScpfT5FeHBlcmllbmNlPC9NZW51SXRlbT5cbiAgICAgICAgICAgICAgICA8L01lbnU+XG5cbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUub3BlbkZpbHRlciA/IDxkaXYgb25DbGljaz17dGhpcy50b2dnbGVGaWx0ZXIuYmluZCh0aGlzKX0gY2xhc3NOYW1lPVwib3ZlcmxheSBibGFja1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3aWRnZXQgZmlsdGVyLXBvcHVwXCIgb25DbGljaz17KGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgICAgICAgICAgICAgICAgICB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIndpZGdldC1jb250ZW50XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmlsdGVyUm93XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0bFwiPkF2YWlsYWJsZSBUb2RheTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBuYW1lPVwiaXNfYXZhaWxhYmxlXCIgY2hlY2tlZD17ISF0aGlzLnN0YXRlLmlzX2F2YWlsYWJsZX0gb25DaGFuZ2U9e3RoaXMuaGFuZGxlSW5wdXQuYmluZCh0aGlzKX0gY2xhc3NOYW1lPVwiY2hlY2tGaWx0ZXJcIiAvPlxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwid2lkZ2V0LWNvbnRlbnRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmaWx0ZXJSb3dcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRsXCI+U2l0cyBBdDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBuYW1lPVwic2l0c19hdF9jbGluaWNcIiBjaGVja2VkPXshIXRoaXMuc3RhdGUuc2l0c19hdF9jbGluaWN9IG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUlucHV0LmJpbmQodGhpcyl9IGNsYXNzTmFtZT1cImNoZWNrRmlsdGVyXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImNoZWNrRmlsdGVyTGFiZWxcIj5DbGluaWM8L3NwYW4+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBuYW1lPVwic2l0c19hdF9ob3NwaXRhbFwiIGNoZWNrZWQ9eyEhdGhpcy5zdGF0ZS5zaXRzX2F0X2hvc3BpdGFsfSBvbkNoYW5nZT17dGhpcy5oYW5kbGVJbnB1dC5iaW5kKHRoaXMpfSBjbGFzc05hbWU9XCJjaGVja0ZpbHRlclwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJjaGVja0ZpbHRlckxhYmVsXCI+SG9zcGl0YWw8L3NwYW4+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3aWRnZXQtY29udGVudFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZpbHRlclJvd1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGxcIj5QcmljZTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRyXCI+UnMge3RoaXMuc3RhdGUucHJpY2VSYW5nZVswXX0gdG8ge3RoaXMuc3RhdGUucHJpY2VSYW5nZVsxXX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJibFwiPlJzIDEwMDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImJyXCI+UnMgMjAwMDwvc3Bhbj5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPFJhbmdlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWluPXsxMDB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF4PXsyMDAwfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXt0aGlzLnN0YXRlLnByaWNlUmFuZ2V9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RlcD17MTAwfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInJhbmdlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5oYW5kbGVSYW5nZS5iaW5kKHRoaXMsICdwcmljZVJhbmdlJyl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIndpZGdldC1jb250ZW50XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmlsdGVyUm93XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0bFwiPkZlbWFsZSBEb2N0b3I8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgbmFtZT1cImlzX2ZlbWFsZVwiIGNoZWNrZWQ9eyEhdGhpcy5zdGF0ZS5pc19mZW1hbGV9IG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUlucHV0LmJpbmQodGhpcyl9IGNsYXNzTmFtZT1cImNoZWNrRmlsdGVyXCIgLz5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIndpZGdldC1mb290ZXIgcGQtMFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cInYtYnRuIHYtYnRuLXByaW1hcnkgYnRuLWJsb2NrIGJ0bi1sZ1wiIG9uQ2xpY2s9e3RoaXMuYXBwbHlGaWx0ZXJzLmJpbmQodGhpcyl9PkFwcGx5PC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+IDogXCJcIlxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgPC9zZWN0aW9uPlxuICAgICAgICApO1xuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBUb3BCYXJcbiIsImltcG9ydCBUb3BCYXIgZnJvbSAnLi9Ub3BCYXIuanMnXG5cbmV4cG9ydCBkZWZhdWx0IFRvcEJhciIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IHsgd2l0aFJvdXRlciB9IGZyb20gXCJyZWFjdC1yb3V0ZXItZG9tXCI7XG5cbmltcG9ydCBSYWRpbywgeyBSYWRpb0dyb3VwIH0gZnJvbSAnbWF0ZXJpYWwtdWkvUmFkaW8nO1xuaW1wb3J0IENoZWNrYm94IGZyb20gJ21hdGVyaWFsLXVpL0NoZWNrYm94JztcbmltcG9ydCB7IEZvcm1MYWJlbCwgRm9ybUNvbnRyb2wsIEZvcm1Db250cm9sTGFiZWwsIEZvcm1IZWxwZXJUZXh0IH0gZnJvbSAnbWF0ZXJpYWwtdWkvRm9ybSc7XG5cblxuY2xhc3MgU2VhcmNoUmVzdWx0c0ZpbHRlciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgICBmZWVfMDogZmFsc2UsXG4gICAgICAgICAgICBmZWVfMTogZmFsc2UsXG4gICAgICAgICAgICBmZWVfMjogZmFsc2UsXG4gICAgICAgICAgICBmZWVfMzogZmFsc2UsXG4gICAgICAgICAgICBnZW5kZXI6ICdhbnknLFxuICAgICAgICAgICAgY2xpbmljX3BlcnNvbmFsOiBmYWxzZSxcbiAgICAgICAgICAgIGNsaW5pY19ob3NwaXRhbDogZmFsc2UsXG4gICAgICAgICAgICBjbGluaWNfbXVsdGk6IGZhbHNlLFxuICAgICAgICAgICAgYXZhaWxhYmxlX3RvZGF5OiBmYWxzZSxcbiAgICAgICAgICAgIGRpc3RhbmNlOiAnMzBrbSdcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHsgLi4udGhpcy5wcm9wcy5maWx0ZXJDcml0ZXJpYSB9KVxuICAgIH1cblxuICAgIGFwcGx5RmlsdGVyKCkge1xuICAgICAgICB0aGlzLnByb3BzLnNldE9QREZpbHRlcnModGhpcy5zdGF0ZSlcbiAgICAgICAgdGhpcy5wcm9wcy5oaXN0b3J5LmdvKC0xKVxuICAgIH1cblxuICAgIGhhbmRsZUNoZWNrYm94KG5hbWUsIGUpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IFtuYW1lXTogZS50YXJnZXQuY2hlY2tlZCB9KVxuICAgIH1cblxuICAgIGhhbmRsZUNoYW5nZVJhZGlvKG5hbWUsIGUpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IFtuYW1lXTogZS50YXJnZXQudmFsdWUgfSlcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic2VhcmNoUmVzdWx0c0ZpbHRlclwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3ViRmlsdGVyXCI+XG4gICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInN1YkhlYWRpbmdcIj5GZWU8L3A+XG4gICAgICAgICAgICAgICAgICAgIDxSYWRpb0dyb3VwXG4gICAgICAgICAgICAgICAgICAgICAgICBhcmlhLWxhYmVsPVwiZmVlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU9XCJmZWUxXCJcbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgPEZvcm1Db250cm9sTGFiZWwgY29udHJvbD17PENoZWNrYm94XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2tlZD17dGhpcy5zdGF0ZS5mZWVfMH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5oYW5kbGVDaGVja2JveC5iaW5kKHRoaXMsICdmZWVfMCcpfVxuICAgICAgICAgICAgICAgICAgICAgICAgLz59IGxhYmVsPVwiTGVzcyB0aGFuIDMwMFwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8Rm9ybUNvbnRyb2xMYWJlbCBjb250cm9sPXs8Q2hlY2tib3hcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGVja2VkPXt0aGlzLnN0YXRlLmZlZV8xfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUNoZWNrYm94LmJpbmQodGhpcywgJ2ZlZV8xJyl9XG4gICAgICAgICAgICAgICAgICAgICAgICAvPn0gbGFiZWw9XCIzMDAgdG8gNTAwXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxGb3JtQ29udHJvbExhYmVsIGNvbnRyb2w9ezxDaGVja2JveFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrZWQ9e3RoaXMuc3RhdGUuZmVlXzJ9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuaGFuZGxlQ2hlY2tib3guYmluZCh0aGlzLCAnZmVlXzInKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8+fSBsYWJlbD1cIjUwMCB0byAxMDAwXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxGb3JtQ29udHJvbExhYmVsIGNvbnRyb2w9ezxDaGVja2JveFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrZWQ9e3RoaXMuc3RhdGUuZmVlXzN9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuaGFuZGxlQ2hlY2tib3guYmluZCh0aGlzLCAnZmVlXzMnKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8+fSBsYWJlbD1cIjEwMDArXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgPC9SYWRpb0dyb3VwPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdWJGaWx0ZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwic3ViSGVhZGluZ1wiPkRpc3RhbmNlPC9wPlxuICAgICAgICAgICAgICAgICAgICA8UmFkaW9Hcm91cFxuICAgICAgICAgICAgICAgICAgICAgICAgYXJpYS1sYWJlbD1cIkRpc3RhbmNlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU9XCJEaXN0YW5jZTJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3RoaXMuc3RhdGUuZGlzdGFuY2V9XG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5oYW5kbGVDaGFuZ2VSYWRpby5iaW5kKHRoaXMsICdkaXN0YW5jZScpfVxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICA8Rm9ybUNvbnRyb2xMYWJlbCB2YWx1ZT1cIjMwa21cIiBjb250cm9sPXs8UmFkaW8gY29sb3I9XCJwcmltYXJ5XCIgLz59IGxhYmVsPVwiVW5kZXIgMzAgS01cIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPEZvcm1Db250cm9sTGFiZWwgdmFsdWU9XCIyMGttXCIgY29udHJvbD17PFJhZGlvIGNvbG9yPVwicHJpbWFyeVwiIC8+fSBsYWJlbD1cIlVuZGVyIDIwIEtNXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxGb3JtQ29udHJvbExhYmVsIHZhbHVlPVwiMTBrbVwiIGNvbnRyb2w9ezxSYWRpbyBjb2xvcj1cInByaW1hcnlcIiAvPn0gbGFiZWw9XCJVbmRlciAxMCBLTVwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8Rm9ybUNvbnRyb2xMYWJlbCB2YWx1ZT1cIjVrbVwiIGNvbnRyb2w9ezxSYWRpbyBjb2xvcj1cInByaW1hcnlcIiAvPn0gbGFiZWw9XCJVbmRlciA1IEtNXCIgLz5cblxuICAgICAgICAgICAgICAgICAgICA8L1JhZGlvR3JvdXA+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN1YkZpbHRlclwiPlxuICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJzdWJIZWFkaW5nXCI+VHlwZSBPZiBDbGluaWM8L3A+XG4gICAgICAgICAgICAgICAgICAgIDxSYWRpb0dyb3VwXG4gICAgICAgICAgICAgICAgICAgICAgICBhcmlhLWxhYmVsPVwiY2xpbmljVHlwZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lPVwiY2xpbmljVHlwZVwiXG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxGb3JtQ29udHJvbExhYmVsIGNvbnRyb2w9ezxDaGVja2JveFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrZWQ9e3RoaXMuc3RhdGUuY2xpbmljX3BlcnNvbmFsfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUNoZWNrYm94LmJpbmQodGhpcywgJ2NsaW5pY19wZXJzb25hbCcpfVxuICAgICAgICAgICAgICAgICAgICAgICAgLz59IGxhYmVsPVwiUGVyc29uYWxcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPEZvcm1Db250cm9sTGFiZWwgY29udHJvbD17PENoZWNrYm94XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2tlZD17dGhpcy5zdGF0ZS5jbGluaWNfaG9zcGl0YWx9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuaGFuZGxlQ2hlY2tib3guYmluZCh0aGlzLCAnY2xpbmljX2hvc3BpdGFsJyl9XG4gICAgICAgICAgICAgICAgICAgICAgICAvPn0gbGFiZWw9XCJIb3NwaXRhbFwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8Rm9ybUNvbnRyb2xMYWJlbCBjb250cm9sPXs8Q2hlY2tib3hcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGVja2VkPXt0aGlzLnN0YXRlLmNsaW5pY19tdWx0aX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5oYW5kbGVDaGVja2JveC5iaW5kKHRoaXMsICdjbGluaWNfbXVsdGknKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8+fSBsYWJlbD1cIk11bHRpLWRvY3RvciBjbGluaWNcIiAvPlxuICAgICAgICAgICAgICAgICAgICA8L1JhZGlvR3JvdXA+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN1YkZpbHRlclwiPlxuICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJzdWJIZWFkaW5nXCI+R2VuZGVyPC9wPlxuICAgICAgICAgICAgICAgICAgICA8UmFkaW9Hcm91cFxuICAgICAgICAgICAgICAgICAgICAgICAgYXJpYS1sYWJlbD1cImdlbmRlclwiXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lPVwiZ2VuZGVyMlwiXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17dGhpcy5zdGF0ZS5nZW5kZXJ9XG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5oYW5kbGVDaGFuZ2VSYWRpby5iaW5kKHRoaXMsICdnZW5kZXInKX1cbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgPEZvcm1Db250cm9sTGFiZWwgdmFsdWU9XCJhbnlcIiBjb250cm9sPXs8UmFkaW8gY29sb3I9XCJwcmltYXJ5XCIgLz59IGxhYmVsPVwiQW55XCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxGb3JtQ29udHJvbExhYmVsIHZhbHVlPVwibWFsZVwiIGNvbnRyb2w9ezxSYWRpbyBjb2xvcj1cInByaW1hcnlcIiAvPn0gbGFiZWw9XCJNYWxlXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxGb3JtQ29udHJvbExhYmVsIHZhbHVlPVwiZmVtYWxlXCIgY29udHJvbD17PFJhZGlvIGNvbG9yPVwicHJpbWFyeVwiIC8+fSBsYWJlbD1cIkZlbWFsZVwiIC8+XG5cbiAgICAgICAgICAgICAgICAgICAgPC9SYWRpb0dyb3VwPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdWJGaWx0ZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwic3ViSGVhZGluZ1wiPkF2YWlsYWJpbGl0eTwvcD5cbiAgICAgICAgICAgICAgICAgICAgPFJhZGlvR3JvdXBcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyaWEtbGFiZWw9XCJhdmFpbGFiaWxpdHlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZT1cImF2YWlsYWJpbGl0eVwiXG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxGb3JtQ29udHJvbExhYmVsIGNvbnRyb2w9ezxDaGVja2JveFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrZWQ9e3RoaXMuc3RhdGUuYXZhaWxhYmxlX3RvZGF5fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUNoZWNrYm94LmJpbmQodGhpcywgJ2F2YWlsYWJsZV90b2RheScpfVxuICAgICAgICAgICAgICAgICAgICAgICAgLz59IGxhYmVsPVwiQXZpYWxhYmxlIFRvZGF5XCIgLz5sYWJlbD1cIk11bHRpLWRvY3RvciBjbGluaWNcIiAvPlxuICAgICAgICAgICAgICAgICAgICA8L1JhZGlvR3JvdXA+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImFwcGx5RmlsdGVyXCIgb25DbGljaz17dGhpcy5hcHBseUZpbHRlci5iaW5kKHRoaXMpfT5BcHBseTwvYnV0dG9uPlxuXG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgd2l0aFJvdXRlcihTZWFyY2hSZXN1bHRzRmlsdGVyKVxuIiwiaW1wb3J0IFNlYXJjaFJlc3VsdHNGaWx0ZXIgZnJvbSAnLi9TZWFyY2hSZXN1bHRzRmlsdGVyLmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBTZWFyY2hSZXN1bHRzRmlsdGVyIiwiLy9BVVRIIEFDVElPTlNcbmV4cG9ydCBjb25zdCBTRU5EX09UUF9SRVFVRVNUID0gJ1NFTkRfT1RQX1JFUVVFU1QnXG5leHBvcnQgY29uc3QgU0VORF9PVFBfU1VDQ0VTUyA9ICdTRU5EX09UUF9TVUNDRVNTJ1xuZXhwb3J0IGNvbnN0IFNFTkRfT1RQX0ZBSUwgPSAnU0VORF9PVFBfRkFJTCdcbmV4cG9ydCBjb25zdCBTVUJNSVRfT1RQX1JFUVVFU1QgPSAnU1VCTUlUX09UUF9SRVFVRVNUJ1xuZXhwb3J0IGNvbnN0IFNVQk1JVF9PVFBfU1VDQ0VTUyA9ICdTVUJNSVRfT1RQX1NVQ0NFU1MnXG5leHBvcnQgY29uc3QgU1VCTUlUX09UUF9GQUlMID0gJ1NVQk1JVF9PVFBfRkFJTCdcblxuLy8gT1BEIEZMT1dcbmV4cG9ydCBjb25zdCBBUFBFTkRfRE9DVE9SUyA9ICdBUFBFTkRfRE9DVE9SUyc7XG5leHBvcnQgY29uc3QgRE9DVE9SX1NFQVJDSCA9ICdET0NUT1JfU0VBUkNIJztcbmV4cG9ydCBjb25zdCBET0NUT1JfU0VBUkNIX1NUQVJUID0gJ0RPQ1RPUl9TRUFSQ0hfU1RBUlQnO1xuZXhwb3J0IGNvbnN0IFNFTEVDVF9MT0NBVElPTl9PUEQgPSAnU0VMRUNUX0xPQ0FUSU9OX09QRCc7XG5leHBvcnQgY29uc3QgTUVSR0VfU0VBUkNIX1NUQVRFX09QRCA9ICdNRVJHRV9TRUFSQ0hfU1RBVEVfT1BEJztcbmV4cG9ydCBjb25zdCBUT0dHTEVfT1BEX0NSSVRFUklBID0gJ1RPR0dMRV9PUERfQ1JJVEVSSUEnO1xuZXhwb3J0IGNvbnN0IFNFVF9PUERfRklMVEVSUyA9ICdTRVRfT1BEX0ZJTFRFUlMnXG5leHBvcnQgY29uc3QgTE9BRF9TRUFSQ0hfQ1JJVEVSSUFfT1BEID0gJ0xPQURfU0VBUkNIX0NSSVRFUklBX09QRCdcblxuXG4vLyBESUFHIEZMT1dcbmV4cG9ydCBjb25zdCBUT0dHTEVfRElBR05PU0lTX0NSSVRFUklBID0gJ1RPR0dMRV9ESUFHTk9TSVNfQ1JJVEVSSUEnO1xuZXhwb3J0IGNvbnN0IE1FUkdFX1NFQVJDSF9TVEFURV9MQUIgPSAnTUVSR0VfU0VBUkNIX1NUQVRFX0xBQic7XG5leHBvcnQgY29uc3QgTE9BRF9TRUFSQ0hfQ1JJVEVSSUFfTEFCID0gJ0xPQURfU0VBUkNIX0NSSVRFUklBX0xBQidcbmV4cG9ydCBjb25zdCBBUFBFTkRfTEFCUyA9ICdBUFBFTkRfTEFCUyc7XG5leHBvcnQgY29uc3QgTEFCX1NFQVJDSCA9ICdMQUJfU0VBUkNIJztcbmV4cG9ydCBjb25zdCBTRUxFQ1RfTE9DQVRJT05fRElBR05PU0lTID0gJ1NFTEVDVF9MT0NBVElPTl9ESUFHTk9TSVMnO1xuZXhwb3J0IGNvbnN0IEFQUEVORF9GSUxURVJTX0RJQUdOT1NJUyA9ICdBUFBFTkRfRklMVEVSU19ESUFHTk9TSVMnO1xuZXhwb3J0IGNvbnN0IExBQl9TRUFSQ0hfU1RBUlQgPSAnTEFCX1NFQVJDSF9TVEFSVCc7XG5cbi8vIEFVVEggRkxPV1xuZXhwb3J0IGNvbnN0IEFQUEVORF9VU0VSX1BST0ZJTEVTID0gJ0FQUEVORF9VU0VSX1BST0ZJTEVTJztcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG5pbXBvcnQgeyB9IGZyb20gJy4uLy4uL2FjdGlvbnMvaW5kZXguanMnXG5cbmltcG9ydCBDaGF0VmlldyBmcm9tICcuLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvY2hhdC9pbmRleC5qcydcblxuXG5jbGFzcyBDaGF0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxDaGF0VmlldyB7Li4udGhpcy5wcm9wc30gLz5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9IChzdGF0ZSkgPT4ge1xuICAgIGNvbnN0IFVTRVIgPSBzdGF0ZS5VU0VSXG5cbiAgICByZXR1cm4ge1xuICAgICAgICBVU0VSXG4gICAgfVxufVxuXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSAoZGlzcGF0Y2gpID0+IHtcbiAgICByZXR1cm4ge1xuXG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpKENoYXQpO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cbmltcG9ydCB7IHN1Ym1pdE9UUCB9IGZyb20gJy4uLy4uL2FjdGlvbnMvaW5kZXguanMnXG5cbmltcG9ydCBPdHBWZXJpZnlWaWV3IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9vdHBWZXJpZnknXG5cblxuY2xhc3MgT3RwVmVyaWZ5IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICB9XG5cbiAgICBzdGF0aWMgY29udGV4dFR5cGVzID0ge1xuICAgICAgICByb3V0ZXI6ICgpID0+IG51bGxcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxPdHBWZXJpZnlWaWV3IHsuLi50aGlzLnByb3BzfSAvPlxuICAgICAgICApO1xuICAgIH1cbn1cblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHN0YXRlKSA9PiB7XG4gICAgbGV0IHtcbiAgICAgICAgdG9rZW4sXG4gICAgICAgIGVycm9yX21lc3NhZ2UsXG4gICAgICAgIHN1Y2Nlc3NfbWVzc2FnZSxcbiAgICAgICAgcGhvbmVOdW1iZXIsXG4gICAgICAgIHN1Ym1pdF9vdHAsXG4gICAgICAgIHN1Ym1pdF9vdHBfc3VjY2VzcyxcbiAgICAgICAgc3VibWl0X290cF9mYWlsXG4gICAgfSA9IHN0YXRlLkFVVEhcblxuICAgIHJldHVybiB7XG4gICAgICAgIHRva2VuLFxuICAgICAgICBlcnJvcl9tZXNzYWdlLFxuICAgICAgICBzdWNjZXNzX21lc3NhZ2UsXG4gICAgICAgIHBob25lTnVtYmVyLFxuICAgICAgICBzdWJtaXRfb3RwLFxuICAgICAgICBzdWJtaXRfb3RwX3N1Y2Nlc3MsXG4gICAgICAgIHN1Ym1pdF9vdHBfZmFpbFxuICAgIH1cbn1cblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gKGRpc3BhdGNoKSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgc3VibWl0T1RQOiAobnVtYmVyLCBvdHAsIGNiKSA9PiBkaXNwYXRjaChzdWJtaXRPVFAobnVtYmVyLCBvdHAsIGNiKSksXG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpKE90cFZlcmlmeSk7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcblxuaW1wb3J0IHsgZ2V0VXNlclByb2ZpbGVXaXRoQXBwb2ludG1lbnRzIH0gZnJvbSAnLi4vLi4vYWN0aW9ucy9pbmRleC5qcydcblxuaW1wb3J0IFVzZXJBcHBvaW50bWVudHNWaWV3IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy91c2VyQXBwb2ludG1lbnRzL2luZGV4LmpzJ1xuXG5cbmNsYXNzIFVzZXJBcHBvaW50bWVudHMgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPFVzZXJBcHBvaW50bWVudHNWaWV3IHsuLi50aGlzLnByb3BzfSAvPlxuICAgICAgICApO1xuICAgIH1cbn1cblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHN0YXRlKSA9PiB7XG4gICAgY29uc3QgVVNFUiA9IHN0YXRlLlVTRVJcblxuICAgIHJldHVybiB7XG4gICAgICAgIFVTRVJcbiAgICB9XG59XG5cbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IChkaXNwYXRjaCkgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICAgIGdldFVzZXJQcm9maWxlV2l0aEFwcG9pbnRtZW50cyA6ICgpID0+IGRpc3BhdGNoKGdldFVzZXJQcm9maWxlV2l0aEFwcG9pbnRtZW50cygpKVxuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbWFwRGlzcGF0Y2hUb1Byb3BzKShVc2VyQXBwb2ludG1lbnRzKTtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG5pbXBvcnQgeyBzZW5kT1RQIH0gZnJvbSAnLi4vLi4vYWN0aW9ucy9pbmRleC5qcydcblxuaW1wb3J0IFVzZXJMb2dpblZpZXcgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9jb21tb25zL1VzZXJMb2dpbidcblxuXG5jbGFzcyBVc2VyTG9naW4gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgIH1cblxuICAgIHN0YXRpYyBjb250ZXh0VHlwZXMgPSB7XG4gICAgICAgIHJvdXRlcjogKCkgPT4gbnVsbFxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPFVzZXJMb2dpblZpZXcgey4uLnRoaXMucHJvcHN9IC8+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoc3RhdGUpID0+IHtcbiAgICBsZXQge1xuICAgICAgICB0b2tlbixcbiAgICAgICAgZXJyb3JfbWVzc2FnZSxcbiAgICAgICAgc3VjY2Vzc19tZXNzYWdlLFxuICAgICAgICBvdHBfcmVxdWVzdF9zZW50LFxuICAgICAgICBvdHBfcmVxdWVzdF9zdWNjZXNzLFxuICAgICAgICBvdHBfcmVxdWVzdF9mYWlsLFxuICAgICAgICBwaG9uZU51bWJlclxuICAgIH0gPSBzdGF0ZS5BVVRIXG5cbiAgICByZXR1cm4ge1xuICAgICAgICB0b2tlbixcbiAgICAgICAgZXJyb3JfbWVzc2FnZSxcbiAgICAgICAgc3VjY2Vzc19tZXNzYWdlLFxuICAgICAgICBvdHBfcmVxdWVzdF9zZW50LFxuICAgICAgICBvdHBfcmVxdWVzdF9zdWNjZXNzLFxuICAgICAgICBvdHBfcmVxdWVzdF9mYWlsLFxuICAgICAgICBwaG9uZU51bWJlclxuICAgIH1cbn1cblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gKGRpc3BhdGNoKSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgc2VuZE9UUDogKG51bWJlciwgY2IpID0+IGRpc3BhdGNoKHNlbmRPVFAobnVtYmVyLCBjYikpXG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpKFVzZXJMb2dpbik7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcblxuaW1wb3J0IHsgZ2V0VXNlclByb2ZpbGUgfSBmcm9tICcuLi8uLi9hY3Rpb25zL2luZGV4LmpzJ1xuXG5pbXBvcnQgVXNlclByb2ZpbGVWaWV3IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy91c2VyUHJvZmlsZS9pbmRleC5qcydcblxuXG5jbGFzcyBVc2VyUHJvZmlsZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8VXNlclByb2ZpbGVWaWV3IHsuLi50aGlzLnByb3BzfSAvPlxuICAgICAgICApO1xuICAgIH1cbn1cblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHN0YXRlKSA9PiB7XG4gICAgY29uc3QgVVNFUiA9IHN0YXRlLlVTRVJcblxuICAgIHJldHVybiB7XG4gICAgICAgIFVTRVJcbiAgICB9XG59XG5cbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IChkaXNwYXRjaCkgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICAgIGdldFVzZXJQcm9maWxlIDogKCkgPT4gZGlzcGF0Y2goZ2V0VXNlclByb2ZpbGUoKSlcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG1hcERpc3BhdGNoVG9Qcm9wcykoVXNlclByb2ZpbGUpO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cbmltcG9ydCB7IGdldFVzZXJQcm9maWxlV2l0aFRlc3RzIH0gZnJvbSAnLi4vLi4vYWN0aW9ucy9pbmRleC5qcydcblxuaW1wb3J0IFVzZXJSZXBvcnRzVmlldyBmcm9tICcuLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvdXNlclJlcG9ydHMvaW5kZXguanMnXG5cblxuY2xhc3MgVXNlclJlcG9ydHMgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPFVzZXJSZXBvcnRzVmlldyB7Li4udGhpcy5wcm9wc30gLz5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9IChzdGF0ZSkgPT4ge1xuICAgIGNvbnN0IFVTRVIgPSBzdGF0ZS5VU0VSXG5cbiAgICByZXR1cm4ge1xuICAgICAgICBVU0VSXG4gICAgfVxufVxuXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSAoZGlzcGF0Y2gpID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgICBnZXRVc2VyUHJvZmlsZVdpdGhUZXN0cyA6ICgpID0+IGRpc3BhdGNoKGdldFVzZXJQcm9maWxlV2l0aFRlc3RzKCkpXG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpKFVzZXJSZXBvcnRzKTtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG5pbXBvcnQgeyB9IGZyb20gJy4uLy4uL2FjdGlvbnMvaW5kZXguanMnXG5cbmltcG9ydCBVc2VyU2lnbnVwVmlldyBmcm9tICcuLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvdXNlclNpZ251cCdcblxuXG5jbGFzcyBVc2VyU2lnbnVwIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICB9XG5cbiAgICBzdGF0aWMgY29udGV4dFR5cGVzID0ge1xuICAgICAgICByb3V0ZXI6ICgpID0+IG51bGxcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxVc2VyU2lnbnVwVmlldyB7Li4udGhpcy5wcm9wc30gLz5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9IChzdGF0ZSkgPT4ge1xuICAgIGNvbnN0IFVTRVIgPSBzdGF0ZS5VU0VSXG5cbiAgICByZXR1cm4ge1xuICAgICAgICBVU0VSXG4gICAgfVxufVxuXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSAoZGlzcGF0Y2gpID0+IHtcbiAgICByZXR1cm4ge1xuXG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpKFVzZXJTaWdudXApO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cbmltcG9ydCB7IGdldExhYkJ5SWQgfSBmcm9tICcuLi8uLi9hY3Rpb25zL2luZGV4LmpzJ1xuXG5pbXBvcnQgQm9va2luZ1N1bW1hcnlWaWV3IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvZGlhZ25vc2lzL2Jvb2tpbmdTdW1tYXJ5L2luZGV4LmpzJ1xuXG5jbGFzcyBCb29raW5nU3VtbWFyeSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgfVxuXG4gICAgc3RhdGljIGNvbnRleHRUeXBlcyA9IHtcbiAgICAgICAgcm91dGVyOiAoKSA9PiBudWxsXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8Qm9va2luZ1N1bW1hcnlWaWV3IHsuLi50aGlzLnByb3BzfSAvPlxuICAgICAgICApO1xuICAgIH1cbn1cblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHN0YXRlKSA9PiB7XG5cbiAgICBjb25zdCB7XG4gICAgICAgIHNlbGVjdGVkQ3JpdGVyaWFzLFxuICAgIH0gPSBzdGF0ZS5TRUFSQ0hfQ1JJVEVSSUFfTEFCU1xuXG4gICAgbGV0IExBQlMgPSBzdGF0ZS5MQUJTXG5cbiAgICByZXR1cm4ge1xuICAgICAgICBzZWxlY3RlZENyaXRlcmlhcyxcbiAgICAgICAgTEFCU1xuICAgIH1cbn1cblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gKGRpc3BhdGNoKSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgZ2V0TGFiQnlJZDogKGxhYklkKSA9PiBkaXNwYXRjaChnZXRMYWJCeUlkKGxhYklkKSlcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpKEJvb2tpbmdTdW1tYXJ5KTtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG5pbXBvcnQgeyBnZXRMYWJCeUlkIH0gZnJvbSAnLi4vLi4vYWN0aW9ucy9pbmRleC5qcydcblxuaW1wb3J0IExhYlZpZXcgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9kaWFnbm9zaXMvbGFiL2luZGV4LmpzJ1xuXG5jbGFzcyBMYWIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgIH1cblxuICAgIHN0YXRpYyBsb2FkRGF0YShzdG9yZSwgbWF0Y2gpe1xuICAgICAgICByZXR1cm4gc3RvcmUuZGlzcGF0Y2goZ2V0TGFiQnlJZChtYXRjaC5wYXJhbXMuaWQpKVxuICAgIH1cblxuICAgIHN0YXRpYyBjb250ZXh0VHlwZXMgPSB7XG4gICAgICAgIHJvdXRlcjogKCkgPT4gbnVsbFxuICAgIH1cblxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgICB0aGlzLnByb3BzLmdldExhYkJ5SWQodGhpcy5wcm9wcy5tYXRjaC5wYXJhbXMuaWQpXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8TGFiVmlldyB7Li4udGhpcy5wcm9wc30gLz5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9IChzdGF0ZSkgPT4ge1xuXG4gICAgY29uc3Qge1xuICAgICAgICBzZWxlY3RlZExvY2F0aW9uLFxuICAgICAgICBzZWxlY3RlZENyaXRlcmlhcyxcbiAgICAgICAgZmlsdGVyQ3JpdGVyaWEsXG4gICAgICAgIExPQURFRF9TRUFSQ0hfQ1JJVEVSSUFfTEFCXG4gICAgfSA9IHN0YXRlLlNFQVJDSF9DUklURVJJQV9MQUJTXG5cbiAgICBsZXQgTEFCUyA9IHN0YXRlLkxBQlNcblxuICAgIHJldHVybiB7XG4gICAgICAgIHNlbGVjdGVkQ3JpdGVyaWFzLFxuICAgICAgICBMQUJTXG4gICAgfVxufVxuXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSAoZGlzcGF0Y2gpID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgICBnZXRMYWJCeUlkOiAobGFiSWQpID0+IGRpc3BhdGNoKGdldExhYkJ5SWQobGFiSWQpKVxuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbWFwRGlzcGF0Y2hUb1Byb3BzKShMYWIpO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cbmltcG9ydCB7IGdldExhYkJ5SWQgfSBmcm9tICcuLi8uLi9hY3Rpb25zL2luZGV4LmpzJ1xuXG5pbXBvcnQgUGF0aWVudERldGFpbHNWaWV3IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvZGlhZ25vc2lzL3BhdGllbnREZXRhaWxzL2luZGV4LmpzJ1xuXG5jbGFzcyBQYXRpZW50RGV0YWlscyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8UGF0aWVudERldGFpbHNWaWV3IHsuLi50aGlzLnByb3BzfSAvPlxuICAgICAgICApO1xuICAgIH1cbn1cblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHN0YXRlKSA9PiB7XG5cbiAgICBsZXQgTEFCUyA9IHN0YXRlLkxBQlNcblxuICAgIHJldHVybiB7XG4gICAgICAgIExBQlNcbiAgICB9XG59XG5cbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IChkaXNwYXRjaCkgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICAgIGdldExhYkJ5SWQgOiAobGFiSWQsIHRlc3RJZHMpID0+IGRpc3BhdGNoKGdldExhYkJ5SWQobGFiSWQsIHRlc3RJZHMpKVxuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbWFwRGlzcGF0Y2hUb1Byb3BzKShQYXRpZW50RGV0YWlscyk7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcblxuaW1wb3J0IHsgbG9hZExhYkNvbW1vbkNyaXRlcmlhcywgdG9nZ2xlRGlhZ25vc2lzQ3JpdGVyaWEsIGdldERpYWdub3Npc0NyaXRlcmlhUmVzdWx0cyB9IGZyb20gJy4uLy4uL2FjdGlvbnMvaW5kZXguanMnXG5pbXBvcnQgU2VhcmNoQ3JpdGVyaWFWaWV3IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvZGlhZ25vc2lzL3NlYXJjaENyaXRlcmlhL2luZGV4LmpzJ1xuXG5jbGFzcyBTZWFyY2hDcml0ZXJpYSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgfVxuXG4gICAgc3RhdGljIGxvYWREYXRhKHN0b3JlKXtcbiAgICAgICAgcmV0dXJuIHN0b3JlLmRpc3BhdGNoKGxvYWRMYWJDb21tb25Dcml0ZXJpYXMoKSlcbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgdGhpcy5wcm9wcy5sb2FkTGFiQ29tbW9uQ3JpdGVyaWFzKClcbiAgICB9XG5cbiAgICBzdGF0aWMgY29udGV4dFR5cGVzID0ge1xuICAgICAgICByb3V0ZXI6ICgpID0+IG51bGxcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8U2VhcmNoQ3JpdGVyaWFWaWV3IHsuLi50aGlzLnByb3BzfSAvPlxuICAgICAgICApXG4gICAgfVxufVxuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoc3RhdGUpID0+IHtcblxuICAgIGNvbnN0IHtcbiAgICAgICAgTE9BREVEX1NFQVJDSF9DUklURVJJQV9MQUIsXG4gICAgICAgIGNvbW1vbl90ZXN0cyxcbiAgICAgICAgY29tbW9uX2NvbmRpdGlvbnMsXG4gICAgICAgIHByZWZlcnJlZF9sYWJzLFxuICAgICAgICBzZWxlY3RlZENyaXRlcmlhcyxcbiAgICAgICAgc2VsZWN0ZWRMb2NhdGlvbixcbiAgICAgICAgZmlsdGVyQ3JpdGVyaWFcbiAgICB9ID0gc3RhdGUuU0VBUkNIX0NSSVRFUklBX0xBQlNcblxuICAgIHJldHVybiB7XG4gICAgICAgIExPQURFRF9TRUFSQ0hfQ1JJVEVSSUFfTEFCLFxuICAgICAgICBjb21tb25fdGVzdHMsXG4gICAgICAgIGNvbW1vbl9jb25kaXRpb25zLFxuICAgICAgICBwcmVmZXJyZWRfbGFicyxcbiAgICAgICAgc2VsZWN0ZWRDcml0ZXJpYXMsXG4gICAgICAgIHNlbGVjdGVkTG9jYXRpb24sXG4gICAgICAgIGZpbHRlckNyaXRlcmlhXG4gICAgfVxufVxuXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSAoZGlzcGF0Y2gpID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgICBsb2FkTGFiQ29tbW9uQ3JpdGVyaWFzOiAoKSA9PiBkaXNwYXRjaChsb2FkTGFiQ29tbW9uQ3JpdGVyaWFzKCkpLFxuICAgICAgICB0b2dnbGVEaWFnbm9zaXNDcml0ZXJpYTogKHR5cGUsIGNyaXRlcmlhKSA9PiBkaXNwYXRjaCh0b2dnbGVEaWFnbm9zaXNDcml0ZXJpYSh0eXBlLCBjcml0ZXJpYSkpLFxuICAgICAgICBnZXREaWFnbm9zaXNDcml0ZXJpYVJlc3VsdHM6IChzZWFyY2hTdHJpbmcsIGNhbGxiYWNrKSA9PiBkaXNwYXRjaChnZXREaWFnbm9zaXNDcml0ZXJpYVJlc3VsdHMoc2VhcmNoU3RyaW5nLCBjYWxsYmFjaykpXG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpKFNlYXJjaENyaXRlcmlhKTtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG5pbXBvcnQgeyBnZXRMYWJzLCB0b2dnbGVEaWFnbm9zaXNDcml0ZXJpYSwgZ2V0RGlhZ25vc2lzQ3JpdGVyaWFSZXN1bHRzIH0gZnJvbSAnLi4vLi4vYWN0aW9ucy9pbmRleC5qcydcblxuaW1wb3J0IFNlYXJjaFJlc3VsdHNWaWV3IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvZGlhZ25vc2lzL3NlYXJjaFJlc3VsdHMvaW5kZXguanMnXG5cbmNsYXNzIFNlYXJjaFJlc3VsdHMgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgICAgICB0aGlzLnN0YXRlID0ge1xuXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdGF0aWMgY29udGV4dFR5cGVzID0ge1xuICAgICAgICByb3V0ZXI6ICgpID0+IG51bGxcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxTZWFyY2hSZXN1bHRzVmlldyB7Li4udGhpcy5wcm9wc30gLz5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9IChzdGF0ZSkgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgICAgc2VsZWN0ZWRMb2NhdGlvbixcbiAgICAgICAgc2VsZWN0ZWRDcml0ZXJpYXMsXG4gICAgICAgIGZpbHRlckNyaXRlcmlhLFxuICAgICAgICBMT0FERURfU0VBUkNIX0NSSVRFUklBX0xBQlxuICAgIH0gPSBzdGF0ZS5TRUFSQ0hfQ1JJVEVSSUFfTEFCU1xuXG4gICAgY29uc3QgTEFCUyA9IHN0YXRlLkxBQlNcbiAgICBjb25zdCB7IGxhYkxpc3QsIExPQURFRF9MQUJTX1NFQVJDSCB9ID0gc3RhdGUuTEFCX1NFQVJDSFxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgc2VsZWN0ZWRMb2NhdGlvbixcbiAgICAgICAgc2VsZWN0ZWRDcml0ZXJpYXMsXG4gICAgICAgIGZpbHRlckNyaXRlcmlhLFxuICAgICAgICBMT0FERURfU0VBUkNIX0NSSVRFUklBX0xBQixcbiAgICAgICAgTEFCUyxcbiAgICAgICAgbGFiTGlzdCwgTE9BREVEX0xBQlNfU0VBUkNIXG4gICAgfVxuXG59XG5cbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IChkaXNwYXRjaCkgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICAgIGdldExhYnM6IChzZWFyY2hTdGF0ZSwgZmlsdGVyQ3JpdGVyaWEsIG1lcmdlU3RhdGUpID0+IGRpc3BhdGNoKGdldExhYnMoc2VhcmNoU3RhdGUsIGZpbHRlckNyaXRlcmlhLCBtZXJnZVN0YXRlKSksXG4gICAgICAgIHRvZ2dsZURpYWdub3Npc0NyaXRlcmlhOiAodHlwZSwgY3JpdGVyaWEpID0+IGRpc3BhdGNoKHRvZ2dsZURpYWdub3Npc0NyaXRlcmlhKHR5cGUsIGNyaXRlcmlhKSksXG4gICAgICAgIGdldERpYWdub3Npc0NyaXRlcmlhUmVzdWx0czogKHNlYXJjaFN0cmluZywgY2FsbGJhY2spID0+IGRpc3BhdGNoKGdldERpYWdub3Npc0NyaXRlcmlhUmVzdWx0cyhzZWFyY2hTdHJpbmcsIGNhbGxiYWNrKSlcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpKFNlYXJjaFJlc3VsdHMpO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cbmltcG9ydCB7IGdldExhYkJ5SWQsIHRvZ2dsZURpYWdub3Npc0NyaXRlcmlhIH0gZnJvbSAnLi4vLi4vYWN0aW9ucy9pbmRleC5qcydcblxuaW1wb3J0IFRlc3RTZWxlY3RvclZpZXcgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9kaWFnbm9zaXMvdGVzdFNlbGVjdG9yJ1xuXG5jbGFzcyBUZXN0U2VsZWN0b3IgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgIH1cblxuICAgIHN0YXRpYyBjb250ZXh0VHlwZXMgPSB7XG4gICAgICAgIHJvdXRlcjogKCkgPT4gbnVsbFxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPFRlc3RTZWxlY3RvclZpZXcgey4uLnRoaXMucHJvcHN9IC8+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoc3RhdGUpID0+IHtcblxuICAgIGNvbnN0IHtcbiAgICAgICAgc2VsZWN0ZWRMb2NhdGlvbixcbiAgICAgICAgc2VsZWN0ZWRDcml0ZXJpYXMsXG4gICAgICAgIGZpbHRlckNyaXRlcmlhLFxuICAgICAgICBMT0FERURfU0VBUkNIX0NSSVRFUklBX0xBQlxuICAgIH0gPSBzdGF0ZS5TRUFSQ0hfQ1JJVEVSSUFfTEFCU1xuXG4gICAgbGV0IExBQlMgPSBzdGF0ZS5MQUJTXG5cbiAgICByZXR1cm4ge1xuICAgICAgICBzZWxlY3RlZENyaXRlcmlhcyxcbiAgICAgICAgTEFCU1xuICAgIH1cbn1cblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gKGRpc3BhdGNoKSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdG9nZ2xlRGlhZ25vc2lzQ3JpdGVyaWE6ICh0eXBlLCBjcml0ZXJpYSkgPT4gZGlzcGF0Y2godG9nZ2xlRGlhZ25vc2lzQ3JpdGVyaWEodHlwZSwgY3JpdGVyaWEpKSxcbiAgICAgICAgZ2V0TGFiQnlJZDogKGxhYklkKSA9PiBkaXNwYXRjaChnZXRMYWJCeUlkKGxhYklkKSlcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG1hcERpc3BhdGNoVG9Qcm9wcykoVGVzdFNlbGVjdG9yKTtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG5pbXBvcnQgeyBnZXREb2N0b3JCeUlkLCBnZXRUaW1lU2xvdHMgfSBmcm9tICcuLi8uLi9hY3Rpb25zL2luZGV4LmpzJ1xuXG5pbXBvcnQgQXBwb2ludG1lbnRTbG90VmlldyBmcm9tICcuLi8uLi9jb21wb25lbnRzL29wZC9hcHBvaW50bWVudFNsb3QvaW5kZXguanMnXG5cbmNsYXNzIEFwcG9pbnRtZW50U2xvdCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgfVxuXG4gICAgc3RhdGljIGxvYWREYXRhKHN0b3JlLCBtYXRjaCkge1xuICAgICAgICByZXR1cm4gc3RvcmUuZGlzcGF0Y2goZ2V0RG9jdG9yQnlJZChtYXRjaC5wYXJhbXMuaWQpKVxuICAgIH1cblxuICAgIHN0YXRpYyBjb250ZXh0VHlwZXMgPSB7XG4gICAgICAgIHJvdXRlcjogKCkgPT4gbnVsbFxuICAgIH1cblxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgICB0aGlzLnByb3BzLmdldERvY3RvckJ5SWQodGhpcy5wcm9wcy5tYXRjaC5wYXJhbXMuaWQpXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8QXBwb2ludG1lbnRTbG90VmlldyB7Li4udGhpcy5wcm9wc30gLz5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9IChzdGF0ZSkgPT4ge1xuXG4gICAgbGV0IERPQ1RPUlMgPSBzdGF0ZS5ET0NUT1JTXG5cbiAgICByZXR1cm4ge1xuICAgICAgICBET0NUT1JTXG4gICAgfVxufVxuXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSAoZGlzcGF0Y2gpID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgICBnZXREb2N0b3JCeUlkOiAoZG9jdG9ySWQpID0+IGRpc3BhdGNoKGdldERvY3RvckJ5SWQoZG9jdG9ySWQpKSxcbiAgICAgICAgZ2V0VGltZVNsb3RzOiAoZG9jdG9ySWQsIGNsaW5pY0lkLCBjYWxsYmFjaykgPT4gZGlzcGF0Y2goZ2V0VGltZVNsb3RzKGRvY3RvcklkLCBjbGluaWNJZCwgY2FsbGJhY2spKVxuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbWFwRGlzcGF0Y2hUb1Byb3BzKShBcHBvaW50bWVudFNsb3QpO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cbmltcG9ydCB7IH0gZnJvbSAnLi4vLi4vYWN0aW9ucy9pbmRleC5qcydcblxuaW1wb3J0IEJvb2tpbmdWaWV3IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvb3BkL2Jvb2tpbmcvQm9va2luZ1ZpZXcuanMnXG5cbmNsYXNzIEJvb2tpbmcgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPEJvb2tpbmdWaWV3IHsuLi50aGlzLnByb3BzfSAvPlxuICAgICAgICApO1xuICAgIH1cbn1cblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHN0YXRlKSA9PiB7XG5cbiAgICByZXR1cm4ge1xuXG4gICAgfVxufVxuXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSAoZGlzcGF0Y2gpID0+IHtcbiAgICByZXR1cm4ge1xuXG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpKEJvb2tpbmcpO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cbmltcG9ydCB7IGdldERvY3RvckJ5SWQgfSBmcm9tICcuLi8uLi9hY3Rpb25zL2luZGV4LmpzJ1xuXG5pbXBvcnQgQ2xpbmljTGlzdFZpZXcgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9vcGQvY2xpbmljTGlzdC9pbmRleC5qcydcblxuY2xhc3MgQ2xpbmljTGlzdCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8Q2xpbmljTGlzdFZpZXcgey4uLnRoaXMucHJvcHN9IC8+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoc3RhdGUpID0+IHtcblxuICAgIGxldCBET0NUT1JTID0gc3RhdGUuRE9DVE9SU1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgRE9DVE9SU1xuICAgIH1cbn1cblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gKGRpc3BhdGNoKSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgZ2V0RG9jdG9yQnlJZCA6IChkb2N0b3JJZCkgPT4gZGlzcGF0Y2goZ2V0RG9jdG9yQnlJZChkb2N0b3JJZCkpXG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpKENsaW5pY0xpc3QpO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cbmltcG9ydCB7IGdldENyaXRlcmlhUmVzdWx0cywgdG9nZ2xlQ3JpdGVyaWEgfSBmcm9tICcuLi8uLi9hY3Rpb25zL2luZGV4LmpzJ1xuaW1wb3J0IENyaXRlcmlhU2VhcmNoVmlldyBmcm9tICcuLi8uLi9jb21wb25lbnRzL29wZC9jcml0ZXJpYVNlYXJjaC9pbmRleC5qcydcblxuY2xhc3MgQ3JpdGVyaWFTZWFyY2ggZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPENyaXRlcmlhU2VhcmNoVmlld1xuICAgICAgICAgICAgICAgIHsgLi4udGhpcy5wcm9wcyB9XG4gICAgICAgICAgICAvPlxuICAgICAgICApO1xuICAgIH1cbn1cblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHN0YXRlKSA9PiB7XG5cbiAgICByZXR1cm4ge1xuXG4gICAgfVxufVxuXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSAoZGlzcGF0Y2gpID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgICBnZXRDcml0ZXJpYVJlc3VsdHMgOiAoc2VhcmNoU3RyaW5nLGNiKSA9PiBkaXNwYXRjaChnZXRDcml0ZXJpYVJlc3VsdHMoc2VhcmNoU3RyaW5nLGNiKSksXG4gICAgICAgIHRvZ2dsZUNyaXRlcmlhIDogKGNyaXRlcmlhKSA9PiBkaXNwYXRjaCh0b2dnbGVDcml0ZXJpYShjcml0ZXJpYSkpXG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpKENyaXRlcmlhU2VhcmNoKTtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG5pbXBvcnQgeyBnZXREb2N0b3JCeUlkIH0gZnJvbSAnLi4vLi4vYWN0aW9ucy9pbmRleC5qcydcblxuaW1wb3J0IERvY3RvclByb2ZpbGVWaWV3IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvb3BkL2RvY3RvclByb2ZpbGUvaW5kZXguanMnXG5cbmNsYXNzIERvY3RvclByb2ZpbGUgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgIH1cblxuICAgIHN0YXRpYyBsb2FkRGF0YShzdG9yZSwgbWF0Y2gpIHtcbiAgICAgICAgcmV0dXJuIHN0b3JlLmRpc3BhdGNoKGdldERvY3RvckJ5SWQobWF0Y2gucGFyYW1zLmlkKSlcbiAgICB9XG5cbiAgICBzdGF0aWMgY29udGV4dFR5cGVzID0ge1xuICAgICAgICByb3V0ZXI6ICgpID0+IG51bGxcbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgdGhpcy5wcm9wcy5nZXREb2N0b3JCeUlkKHRoaXMucHJvcHMubWF0Y2gucGFyYW1zLmlkKVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPERvY3RvclByb2ZpbGVWaWV3IHsuLi50aGlzLnByb3BzfSAvPlxuICAgICAgICApO1xuICAgIH1cbn1cblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHN0YXRlKSA9PiB7XG5cbiAgICBsZXQgRE9DVE9SUyA9IHN0YXRlLkRPQ1RPUlNcblxuICAgIHJldHVybiB7XG4gICAgICAgIERPQ1RPUlNcbiAgICB9XG59XG5cbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IChkaXNwYXRjaCkgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICAgIGdldERvY3RvckJ5SWQ6IChkb2N0b3JJZCkgPT4gZGlzcGF0Y2goZ2V0RG9jdG9yQnlJZChkb2N0b3JJZCkpXG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpKERvY3RvclByb2ZpbGUpO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cbmltcG9ydCB7IHNlbGVjdExvY2F0aW9uIH0gZnJvbSAnLi4vLi4vYWN0aW9ucy9pbmRleC5qcydcbmltcG9ydCBMb2NhdGlvblNlYXJjaFZpZXcgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9vcGQvbG9jYXRpb25TZWFyY2gvaW5kZXguanMnXG5cbmNsYXNzIExvY2F0aW9uU2VhcmNoIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICB9XG5cbiAgICBzdGF0aWMgY29udGV4dFR5cGVzID0ge1xuICAgICAgICByb3V0ZXI6ICgpID0+IG51bGxcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxMb2NhdGlvblNlYXJjaFZpZXcgey4uLnRoaXMucHJvcHN9IC8+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoc3RhdGUpID0+IHtcbiAgICBjb25zdCB7XG4gICAgICAgIHNlbGVjdGVkTG9jYXRpb25cbiAgICB9ID0gc3RhdGUuU0VBUkNIX0NSSVRFUklBX09QRFxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgc2VsZWN0ZWRMb2NhdGlvblxuICAgIH1cbn1cblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gKGRpc3BhdGNoKSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgc2VsZWN0TG9jYXRpb246IChsb2NhdGlvbikgPT4gZGlzcGF0Y2goc2VsZWN0TG9jYXRpb24obG9jYXRpb24pKVxuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbWFwRGlzcGF0Y2hUb1Byb3BzKShMb2NhdGlvblNlYXJjaCk7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcblxuaW1wb3J0IHsgZ2V0RG9jdG9yQnlJZCB9IGZyb20gJy4uLy4uL2FjdGlvbnMvaW5kZXguanMnXG5cbmltcG9ydCBQYXRpZW50RGV0YWlsc1ZpZXcgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9vcGQvcGF0aWVudERldGFpbHMvaW5kZXguanMnXG5cbmNsYXNzIFBhdGllbnREZXRhaWxzIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxQYXRpZW50RGV0YWlsc1ZpZXcgey4uLnRoaXMucHJvcHN9IC8+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoc3RhdGUpID0+IHtcblxuICAgIGxldCBET0NUT1JTID0gc3RhdGUuRE9DVE9SU1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgRE9DVE9SU1xuICAgIH1cbn1cblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gKGRpc3BhdGNoKSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgZ2V0RG9jdG9yQnlJZCA6IChkb2N0b3JJZCkgPT4gZGlzcGF0Y2goZ2V0RG9jdG9yQnlJZChkb2N0b3JJZCkpXG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpKFBhdGllbnREZXRhaWxzKTtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG5pbXBvcnQgeyB9IGZyb20gJy4uLy4uL2FjdGlvbnMvaW5kZXguanMnXG5cbmltcG9ydCBQYXltZW50VmlldyBmcm9tICcuLi8uLi9jb21wb25lbnRzL29wZC9wYXltZW50L1BheW1lbnRWaWV3LmpzJ1xuXG5jbGFzcyBQYXltZW50IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxQYXltZW50VmlldyB7Li4udGhpcy5wcm9wc30gLz5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9IChzdGF0ZSkgPT4ge1xuXG4gICAgcmV0dXJuIHtcblxuICAgIH1cbn1cblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gKGRpc3BhdGNoKSA9PiB7XG4gICAgcmV0dXJuIHtcblxuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbWFwRGlzcGF0Y2hUb1Byb3BzKShQYXltZW50KTtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG5pbXBvcnQgeyBnZXRPUERDcml0ZXJpYVJlc3VsdHMsIHRvZ2dsZU9QRENyaXRlcmlhLCBsb2FkT1BEQ29tbW9uQ3JpdGVyaWEgfSBmcm9tICcuLi8uLi9hY3Rpb25zL2luZGV4LmpzJ1xuaW1wb3J0IFNlYXJjaENyaXRlcmlhVmlldyBmcm9tICcuLi8uLi9jb21wb25lbnRzL29wZC9zZWFyY2hDcml0ZXJpYS9pbmRleC5qcydcblxuY2xhc3MgU2VhcmNoQ3JpdGVyaWEgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgIH1cblxuICAgIHN0YXRpYyBsb2FkRGF0YShzdG9yZSkge1xuICAgICAgICByZXR1cm4gc3RvcmUuZGlzcGF0Y2gobG9hZE9QRENvbW1vbkNyaXRlcmlhKCkpXG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIHRoaXMucHJvcHMubG9hZE9QRENvbW1vbkNyaXRlcmlhKClcbiAgICB9XG5cbiAgICBzdGF0aWMgY29udGV4dFR5cGVzID0ge1xuICAgICAgICByb3V0ZXI6ICgpID0+IG51bGxcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxTZWFyY2hDcml0ZXJpYVZpZXcgey4uLnRoaXMucHJvcHN9IC8+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoc3RhdGUpID0+IHtcblxuICAgIGNvbnN0IHtcbiAgICAgICAgTE9BREVEX1NFQVJDSF9DUklURVJJQV9PUEQsXG4gICAgICAgIHNwZWNpYWxpemF0aW9ucyxcbiAgICAgICAgY29uZGl0aW9ucyxcbiAgICAgICAgc2VsZWN0ZWRDcml0ZXJpYXMsXG4gICAgICAgIHNlbGVjdGVkTG9jYXRpb24sXG4gICAgICAgIGZpbHRlckNyaXRlcmlhXG4gICAgfSA9IHN0YXRlLlNFQVJDSF9DUklURVJJQV9PUERcblxuICAgIHJldHVybiB7XG4gICAgICAgIExPQURFRF9TRUFSQ0hfQ1JJVEVSSUFfT1BELFxuICAgICAgICBzcGVjaWFsaXphdGlvbnMsXG4gICAgICAgIGNvbmRpdGlvbnMsXG4gICAgICAgIHNlbGVjdGVkQ3JpdGVyaWFzLFxuICAgICAgICBzZWxlY3RlZExvY2F0aW9uLFxuICAgICAgICBmaWx0ZXJDcml0ZXJpYVxuICAgIH1cbn1cblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gKGRpc3BhdGNoKSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgbG9hZE9QRENvbW1vbkNyaXRlcmlhOiAoKSA9PiBkaXNwYXRjaChsb2FkT1BEQ29tbW9uQ3JpdGVyaWEoKSksXG4gICAgICAgIHRvZ2dsZU9QRENyaXRlcmlhOiAodHlwZSwgY3JpdGVyaWEpID0+IGRpc3BhdGNoKHRvZ2dsZU9QRENyaXRlcmlhKHR5cGUsIGNyaXRlcmlhKSksXG4gICAgICAgIGdldE9QRENyaXRlcmlhUmVzdWx0czogKHNlYXJjaFN0cmluZywgY2FsbGJhY2spID0+IGRpc3BhdGNoKGdldE9QRENyaXRlcmlhUmVzdWx0cyhzZWFyY2hTdHJpbmcsIGNhbGxiYWNrKSlcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG1hcERpc3BhdGNoVG9Qcm9wcykoU2VhcmNoQ3JpdGVyaWEpO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cbmltcG9ydCB7IGdldERvY3RvcnMsIGdldE9QRENyaXRlcmlhUmVzdWx0cywgdG9nZ2xlT1BEQ3JpdGVyaWEgfSBmcm9tICcuLi8uLi9hY3Rpb25zL2luZGV4LmpzJ1xuXG5pbXBvcnQgU2VhcmNoUmVzdWx0c1ZpZXcgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9vcGQvc2VhcmNoUmVzdWx0cy9pbmRleC5qcydcblxuY2xhc3MgU2VhcmNoUmVzdWx0cyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG5cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN0YXRpYyBjb250ZXh0VHlwZXMgPSB7XG4gICAgICAgIHJvdXRlcjogKCkgPT4gbnVsbFxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPFNlYXJjaFJlc3VsdHNWaWV3IHsuLi50aGlzLnByb3BzfSAvPlxuICAgICAgICApXG4gICAgfVxufVxuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoc3RhdGUpID0+IHtcblxuICAgIGNvbnN0IHtcbiAgICAgICAgTE9BREVEX1NFQVJDSF9DUklURVJJQV9PUEQsXG4gICAgICAgIHNlbGVjdGVkQ3JpdGVyaWFzLFxuICAgICAgICBzZWxlY3RlZExvY2F0aW9uLFxuICAgICAgICBmaWx0ZXJDcml0ZXJpYVxuICAgIH0gPSBzdGF0ZS5TRUFSQ0hfQ1JJVEVSSUFfT1BEXG5cbiAgICBsZXQgRE9DVE9SUyA9IHN0YXRlLkRPQ1RPUlNcbiAgICBsZXQgeyBkb2N0b3JMaXN0LCBMT0FERURfRE9DVE9SX1NFQVJDSCB9ID0gc3RhdGUuRE9DVE9SX1NFQVJDSFxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgRE9DVE9SUywgZG9jdG9yTGlzdCwgTE9BREVEX0RPQ1RPUl9TRUFSQ0gsXG4gICAgICAgIExPQURFRF9TRUFSQ0hfQ1JJVEVSSUFfT1BELFxuICAgICAgICBzZWxlY3RlZENyaXRlcmlhcyxcbiAgICAgICAgc2VsZWN0ZWRMb2NhdGlvbixcbiAgICAgICAgZmlsdGVyQ3JpdGVyaWFcbiAgICB9XG59XG5cbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IChkaXNwYXRjaCkgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICAgIGxvYWRPUERDb21tb25Dcml0ZXJpYTogKCkgPT4gZGlzcGF0Y2gobG9hZE9QRENvbW1vbkNyaXRlcmlhKCkpLFxuICAgICAgICB0b2dnbGVPUERDcml0ZXJpYTogKHR5cGUsIGNyaXRlcmlhKSA9PiBkaXNwYXRjaCh0b2dnbGVPUERDcml0ZXJpYSh0eXBlLCBjcml0ZXJpYSkpLFxuICAgICAgICBnZXREb2N0b3JzOiAoc2VhcmNoU3RhdGUsIGZpbHRlckNyaXRlcmlhLCBtZXJnZVN0YXRlKSA9PiBkaXNwYXRjaChnZXREb2N0b3JzKHNlYXJjaFN0YXRlLCBmaWx0ZXJDcml0ZXJpYSwgbWVyZ2VTdGF0ZSkpXG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbWFwRGlzcGF0Y2hUb1Byb3BzKShTZWFyY2hSZXN1bHRzKTtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG5pbXBvcnQgeyBzZXRPUERGaWx0ZXJzIH0gZnJvbSAnLi4vLi4vYWN0aW9ucy9pbmRleC5qcydcblxuaW1wb3J0IFNlYXJjaFJlc3VsdHNGaWx0ZXJWaWV3IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvb3BkL3NlYXJjaFJlc3VsdHNGaWx0ZXIvaW5kZXguanMnXG5cbmNsYXNzIFNlYXJjaFJlc3VsdHNGaWx0ZXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPFNlYXJjaFJlc3VsdHNGaWx0ZXJWaWV3IHsuLi50aGlzLnByb3BzfS8+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoc3RhdGUpID0+IHtcblxuICAgIGNvbnN0IHtcbiAgICAgICAgZmlsdGVyQ3JpdGVyaWFcbiAgICB9ID0gc3RhdGUuU0VBUkNIX0NSSVRFUklBX09QRFxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgZmlsdGVyQ3JpdGVyaWFcbiAgICB9XG59XG5cbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IChkaXNwYXRjaCkgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICAgIHNldE9QREZpbHRlcnMgOiAoZmlsdGVyRGF0YSkgPT4gZGlzcGF0Y2goc2V0T1BERmlsdGVycyhmaWx0ZXJEYXRhKSlcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG1hcERpc3BhdGNoVG9Qcm9wcykoU2VhcmNoUmVzdWx0c0ZpbHRlcik7XG4iLCJpbXBvcnQgTkFWSUdBVEUgZnJvbSAnLi9uYXZpZ2F0ZSdcblxuZXhwb3J0IGRlZmF1bHQgTkFWSUdBVEUiLCJjb25zdCBOQVZJR0FURSA9IHtcbiAgICBuYXZpZ2F0ZVRvIDogKHdoZXJlKSA9PiB7XG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gd2hlcmVcbiAgICB9LFxuXG4gICAgcmVmcmVzaEFwcG9pbnRtZW50U3RhdGUgOiAocHJvcHMpID0+IHtcbiAgICAgICAgbGV0IG5vQXBwb2ludG1lbnRGb3VuZCA9IHByb3BzLnVwY29taW5nLmxlbmd0aCA9PSAwICYmIHByb3BzLnByZXZpb3VzLmxlbmd0aCA9PSAwXG4gICAgICAgIFxuICAgICAgICBpZihwcm9wcy5oaXN0b3J5LmFjdGlvbiA9PT0gJ1BVU0gnIHx8IG5vQXBwb2ludG1lbnRGb3VuZCl7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE5BVklHQVRFIiwiaW1wb3J0IFNUT1JBR0UgZnJvbSAnLi9zdG9yYWdlJ1xuXG5leHBvcnQgZGVmYXVsdCBTVE9SQUdFIiwiaW1wb3J0IENvb2tpZXMgZnJvbSAndW5pdmVyc2FsLWNvb2tpZSc7XG5jb25zdCBjb29raWVzID0gbmV3IENvb2tpZXMoKTtcblxuY29uc3QgU1RPUkFHRSA9IHtcbiAgICBzZXRBdXRoVG9rZW46ICh0b2tlbikgPT4ge1xuICAgICAgICBjb29raWVzLnNldCgndG9rZW4nLCB0b2tlbilcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh0cnVlKVxuICAgIH0sXG4gICAgZ2V0QXV0aFRva2VuOiAoKSA9PiB7XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoY29va2llcy5nZXQoJ3Rva2VuJykpXG4gICAgfSxcbiAgICBjaGVja0F1dGg6ICgpID0+IHtcbiAgICAgICAgcmV0dXJuICEhY29va2llcy5nZXQoJ3Rva2VuJylcbiAgICB9LFxuICAgIGRlbGV0ZUF1dGg6ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShjb29raWVzLnJlbW92ZSgndG9rZW4nKSlcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFNUT1JBR0UiLCJpbXBvcnQgeyBTRU5EX09UUF9SRVFVRVNULCBTRU5EX09UUF9TVUNDRVNTLCBTRU5EX09UUF9GQUlMLCBTVUJNSVRfT1RQX1JFUVVFU1QsIFNVQk1JVF9PVFBfU1VDQ0VTUywgU1VCTUlUX09UUF9GQUlMIH0gZnJvbSAnLi4vLi4vY29uc3RhbnRzL3R5cGVzJztcblxuY29uc3QgZGVmYXVsdFN0YXRlID0ge1xuICAgIHRva2VuOiBudWxsLFxuICAgIGVycm9yX21lc3NhZ2U6IFwiXCIsXG4gICAgc3VjY2Vzc19tZXNzYWdlOiBcIlwiLFxuICAgIG90cF9yZXF1ZXN0X3NlbnQ6IGZhbHNlLFxuICAgIG90cF9yZXF1ZXN0X3N1Y2Nlc3M6IGZhbHNlLFxuICAgIG90cF9yZXF1ZXN0X2ZhaWw6IGZhbHNlLFxuICAgIHBob25lTnVtYmVyOiBcIlwiLFxuICAgIHN1Ym1pdF9vdHA6ZmFsc2UsXG4gICAgc3VibWl0X290cF9zdWNjZXNzOmZhbHNlLFxuICAgIHN1Ym1pdF9vdHBfZmFpbDpmYWxzZVxufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoc3RhdGUgPSBkZWZhdWx0U3RhdGUsIGFjdGlvbikge1xuXG4gICAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgICAgICBjYXNlIFNFTkRfT1RQX1JFUVVFU1Q6IHtcbiAgICAgICAgICAgIGxldCBuZXdTdGF0ZSA9IHsgLi4uZGVmYXVsdFN0YXRlIH1cblxuICAgICAgICAgICAgbmV3U3RhdGUub3RwX3JlcXVlc3Rfc2VudCA9IHRydWVcbiAgICAgICAgICAgIG5ld1N0YXRlLnBob25lTnVtYmVyID0gYWN0aW9uLnBheWxvYWQucGhvbmVOdW1iZXJcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgcmV0dXJuIG5ld1N0YXRlXG4gICAgICAgIH1cblxuICAgICAgICBjYXNlIFNFTkRfT1RQX1NVQ0NFU1M6IHtcbiAgICAgICAgICAgIGxldCBuZXdTdGF0ZSA9IHsgLi4uc3RhdGUgfVxuICAgICAgICAgICAgbmV3U3RhdGUub3RwX3JlcXVlc3Rfc2VudCA9IGZhbHNlXG4gICAgICAgICAgICBuZXdTdGF0ZS5vdHBfcmVxdWVzdF9zdWNjZXNzID0gdHJ1ZVxuICAgICAgICAgICAgbmV3U3RhdGUub3RwX3JlcXVlc3RfZmFpbCA9IGZhbHNlXG4gICAgICAgICAgICBuZXdTdGF0ZS5zdWNjZXNzX21lc3NhZ2UgPSBhY3Rpb24ucGF5bG9hZC5zdWNjZXNzX21lc3NhZ2VcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgcmV0dXJuIG5ld1N0YXRlXG4gICAgICAgIH1cblxuICAgICAgICBjYXNlIFNFTkRfT1RQX0ZBSUw6IHtcbiAgICAgICAgICAgIGxldCBuZXdTdGF0ZSA9IHsgLi4uc3RhdGUgfVxuICAgICAgICAgICAgbmV3U3RhdGUub3RwX3JlcXVlc3Rfc2VudCA9IGZhbHNlXG4gICAgICAgICAgICBuZXdTdGF0ZS5vdHBfcmVxdWVzdF9mYWlsID0gdHJ1ZVxuICAgICAgICAgICAgbmV3U3RhdGUub3RwX3JlcXVlc3Rfc3VjY2VzcyA9IGZhbHNlXG4gICAgICAgICAgICBuZXdTdGF0ZS5lcnJvcl9tZXNzYWdlID0gYWN0aW9uLnBheWxvYWQuZXJyb3JfbWVzc2FnZVxuICAgICAgICAgICAgXG4gICAgICAgICAgICByZXR1cm4gbmV3U3RhdGVcbiAgICAgICAgfVxuXG4gICAgICAgIGNhc2UgU1VCTUlUX09UUF9SRVFVRVNUOiB7XG4gICAgICAgICAgICBsZXQgbmV3U3RhdGUgPSB7IC4uLnN0YXRlIH1cbiAgICAgICAgICAgIG5ld1N0YXRlLnN1Ym1pdF9vdHAgPSB0cnVlXG4gICAgICAgICAgICByZXR1cm4gbmV3U3RhdGVcbiAgICAgICAgfVxuXG4gICAgICAgIGNhc2UgU1VCTUlUX09UUF9TVUNDRVNTOiB7XG4gICAgICAgICAgICBsZXQgbmV3U3RhdGUgPSB7IC4uLnN0YXRlIH1cbiAgICAgICAgICAgIG5ld1N0YXRlLnN1Ym1pdF9vdHAgPSBmYWxzZVxuICAgICAgICAgICAgbmV3U3RhdGUuc3VibWl0X290cF9mYWlsID0gZmFsc2VcbiAgICAgICAgICAgIG5ld1N0YXRlLnN1Ym1pdF9vdHBfc3VjY2VzcyA9IHRydWVcbiAgICAgICAgICAgIG5ld1N0YXRlLnRva2VuID0gYWN0aW9uLnBheWxvYWQudG9rZW5cbiAgICAgICAgICAgIHJldHVybiBuZXdTdGF0ZVxuICAgICAgICB9XG5cbiAgICAgICAgY2FzZSBTVUJNSVRfT1RQX0ZBSUw6IHtcbiAgICAgICAgICAgIGxldCBuZXdTdGF0ZSA9IHsgLi4uc3RhdGUgfVxuICAgICAgICAgICAgbmV3U3RhdGUuc3VibWl0X290cCA9IGZhbHNlXG4gICAgICAgICAgICBuZXdTdGF0ZS5zdWJtaXRfb3RwX2ZhaWwgPSB0cnVlXG4gICAgICAgICAgICBuZXdTdGF0ZS5zdWJtaXRfb3RwX3N1Y2Nlc3MgPSBmYWxzZVxuICAgICAgICAgICAgbmV3U3RhdGUuZXJyb3JfbWVzc2FnZSA9IGFjdGlvbi5wYXlsb2FkLmVycm9yX21lc3NhZ2VcbiAgICAgICAgICAgIHJldHVybiBuZXdTdGF0ZVxuICAgICAgICB9XG5cbiAgICB9XG4gICAgcmV0dXJuIHN0YXRlXG59IiwiaW1wb3J0IHsgQVBQRU5EX1VTRVJfUFJPRklMRVMgfSBmcm9tICcuLi8uLi9jb25zdGFudHMvdHlwZXMnO1xuXG5jb25zdCBkZWZhdWx0U3RhdGUgPSB7XG4gICAgcHJvZmlsZXM6IHt9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChzdGF0ZSA9IGRlZmF1bHRTdGF0ZSwgYWN0aW9uKSB7XG5cbiAgICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgICAgIGNhc2UgQVBQRU5EX1VTRVJfUFJPRklMRVM6IHtcbiAgICAgICAgICAgIGxldCBuZXdTdGF0ZSA9IHtcbiAgICAgICAgICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgICAgICAgICBwcm9maWxlcyA6IHsgLi4uc3RhdGUucHJvZmlsZXMgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBuZXdTdGF0ZS5wcm9maWxlcyA9IGFjdGlvbi5wYXlsb2FkLnJlZHVjZSgocHJvZmlsZU1hcCwgcHJvZmlsZSkgPT4ge1xuICAgICAgICAgICAgICAgIHByb2ZpbGVNYXBbcHJvZmlsZS5wcm9maWxlSWRdID0gcHJvZmlsZVxuICAgICAgICAgICAgICAgIHJldHVybiBwcm9maWxlTWFwXG4gICAgICAgICAgICB9LCBuZXdTdGF0ZS5wcm9maWxlcylcblxuICAgICAgICAgICAgcmV0dXJuIG5ld1N0YXRlXG4gICAgICAgIH1cblxuICAgIH1cbiAgICByZXR1cm4gc3RhdGVcbn0iLCJpbXBvcnQgeyBBUFBFTkRfTEFCUyB9IGZyb20gJy4uLy4uL2NvbnN0YW50cy90eXBlcyc7XG5cbmNvbnN0IGRlZmF1bHRTdGF0ZSA9IHtcblxufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoc3RhdGUgPSBkZWZhdWx0U3RhdGUsIGFjdGlvbikge1xuXG4gICAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgICAgICBjYXNlIEFQUEVORF9MQUJTOiB7XG4gICAgICAgICAgICBsZXQgbmV3U3RhdGUgPSB7IC4uLnN0YXRlIH1cblxuICAgICAgICAgICAgcmV0dXJuIGFjdGlvbi5wYXlsb2FkLnJlZHVjZSgobGFwTWFwLCBsYWIpID0+IHtcbiAgICAgICAgICAgICAgICBsYXBNYXBbbGFiLmxhYi5pZF0gPSBsYWJcbiAgICAgICAgICAgICAgICByZXR1cm4gbGFwTWFwXG4gICAgICAgICAgICB9LG5ld1N0YXRlKVxuXG4gICAgICAgIH1cblxuICAgIH1cbiAgICByZXR1cm4gc3RhdGVcbn0iLCJpbXBvcnQgeyBMQUJfU0VBUkNIX1NUQVJULCBMQUJfU0VBUkNIIH0gZnJvbSAnLi4vLi4vY29uc3RhbnRzL3R5cGVzJztcblxuY29uc3QgZGVmYXVsdFN0YXRlID0ge1xuICAgIGxhYkxpc3Q6IFtdLFxuICAgIExPQURFRF9MQUJTX1NFQVJDSDogZmFsc2Vcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHN0YXRlID0gZGVmYXVsdFN0YXRlLCBhY3Rpb24pIHtcblxuICAgIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcblxuICAgICAgICBjYXNlIExBQl9TRUFSQ0hfU1RBUlQ6IHtcbiAgICAgICAgICAgIGxldCBuZXdTdGF0ZSA9IHsgLi4uc3RhdGUgfVxuXG4gICAgICAgICAgICBuZXdTdGF0ZS5MT0FERURfTEFCU19TRUFSQ0ggPSBmYWxzZVxuXG4gICAgICAgICAgICByZXR1cm4gbmV3U3RhdGVcbiAgICAgICAgfVxuXG4gICAgICAgIGNhc2UgTEFCX1NFQVJDSDoge1xuICAgICAgICAgICAgbGV0IG5ld1N0YXRlID0geyAuLi5zdGF0ZSB9XG5cbiAgICAgICAgICAgIG5ld1N0YXRlLmxhYkxpc3QgPSBhY3Rpb24ucGF5bG9hZC5tYXAobGFiID0+IGxhYi5sYWIuaWQpXG4gICAgICAgICAgICBuZXdTdGF0ZS5MT0FERURfTEFCU19TRUFSQ0ggPSB0cnVlXG5cbiAgICAgICAgICAgIHJldHVybiBuZXdTdGF0ZVxuICAgICAgICB9XG5cbiAgICB9XG4gICAgXG4gICAgcmV0dXJuIHN0YXRlXG59IiwiaW1wb3J0IHsgQVBQRU5EX0ZJTFRFUlNfRElBR05PU0lTLCBUT0dHTEVfQ09ORElUSU9OUywgVE9HR0xFX1NQRUNJQUxJVElFUywgU0VMRUNUX0xPQ0FUSU9OX0RJQUdOT1NJUywgTUVSR0VfU0VBUkNIX1NUQVRFX0xBQiwgVE9HR0xFX0NSSVRFUklBLCBUT0dHTEVfVEVTVFMsIFRPR0dMRV9ESUFHTk9TSVNfQ1JJVEVSSUEsIExPQURfU0VBUkNIX0NSSVRFUklBX0xBQiB9IGZyb20gJy4uLy4uL2NvbnN0YW50cy90eXBlcyc7XG5cbmNvbnN0IGRlZmF1bHRTdGF0ZSA9IHtcbiAgICBMT0FERURfU0VBUkNIX0NSSVRFUklBX0xBQjogZmFsc2UsXG4gICAgY29tbW9uX3Rlc3RzOiBbXSxcbiAgICBjb21tb25fY29uZGl0aW9uczogW10sXG4gICAgcHJlZmVycmVkX2xhYnM6IFtdLFxuICAgIHNlbGVjdGVkQ3JpdGVyaWFzOiBbXSxcbiAgICBzZWxlY3RlZExvY2F0aW9uOiBudWxsLFxuICAgIGZpbHRlckNyaXRlcmlhOiB7XG4gICAgICAgIHByaWNlUmFuZ2U6IFsxMDAsIDE1MDBdLFxuICAgICAgICBkaXN0YW5jZVJhbmdlOiBbMSwgMzVdLFxuICAgICAgICBzb3J0Qnk6IG51bGxcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChzdGF0ZSA9IGRlZmF1bHRTdGF0ZSwgYWN0aW9uKSB7XG5cbiAgICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgICAgIGNhc2UgTE9BRF9TRUFSQ0hfQ1JJVEVSSUFfTEFCOiB7XG4gICAgICAgICAgICBsZXQgbmV3U3RhdGUgPSB7IC4uLnN0YXRlIH1cbiAgICAgICAgICAgIGlmIChhY3Rpb24ucGF5bG9hZCkge1xuICAgICAgICAgICAgICAgIG5ld1N0YXRlID0geyAuLi5uZXdTdGF0ZSwgLi4uYWN0aW9uLnBheWxvYWQgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbmV3U3RhdGUuTE9BREVEX1NFQVJDSF9DUklURVJJQV9MQUIgPSB0cnVlXG4gICAgICAgICAgICByZXR1cm4gbmV3U3RhdGVcbiAgICAgICAgfVxuXG4gICAgICAgIGNhc2UgVE9HR0xFX0RJQUdOT1NJU19DUklURVJJQToge1xuICAgICAgICAgICAgbGV0IG5ld1N0YXRlID0ge1xuICAgICAgICAgICAgICAgIC4uLnN0YXRlLFxuICAgICAgICAgICAgICAgIHNlbGVjdGVkQ3JpdGVyaWFzOiBbXS5jb25jYXQoc3RhdGUuc2VsZWN0ZWRDcml0ZXJpYXMpXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxldCBmb3VuZCA9IGZhbHNlXG4gICAgICAgICAgICBuZXdTdGF0ZS5zZWxlY3RlZENyaXRlcmlhcyA9IG5ld1N0YXRlLnNlbGVjdGVkQ3JpdGVyaWFzLmZpbHRlcigoY3VycikgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChjdXJyLmlkID09IGFjdGlvbi5wYXlsb2FkLmNyaXRlcmlhLmlkICYmIGN1cnIudHlwZSA9PSBhY3Rpb24ucGF5bG9hZC50eXBlKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvdW5kID0gdHJ1ZVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgIGlmICghZm91bmQpIHtcbiAgICAgICAgICAgICAgICBuZXdTdGF0ZS5zZWxlY3RlZENyaXRlcmlhcy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgLi4uYWN0aW9uLnBheWxvYWQuY3JpdGVyaWEsXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IGFjdGlvbi5wYXlsb2FkLnR5cGVcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gbmV3U3RhdGVcbiAgICAgICAgfVxuXG4gICAgICAgIGNhc2UgU0VMRUNUX0xPQ0FUSU9OX0RJQUdOT1NJUzoge1xuICAgICAgICAgICAgbGV0IG5ld1N0YXRlID0geyAuLi5zdGF0ZSB9XG5cbiAgICAgICAgICAgIG5ld1N0YXRlLnNlbGVjdGVkTG9jYXRpb24gPSBhY3Rpb24ucGF5bG9hZFxuICAgICAgICAgICAgcmV0dXJuIG5ld1N0YXRlXG4gICAgICAgIH1cblxuICAgICAgICBjYXNlIE1FUkdFX1NFQVJDSF9TVEFURV9MQUI6IHtcbiAgICAgICAgICAgIGxldCBuZXdTdGF0ZSA9IHsgLi4uc3RhdGUsIC4uLmFjdGlvbi5wYXlsb2FkLnNlYXJjaFN0YXRlLCBmaWx0ZXJDcml0ZXJpYSA6IGFjdGlvbi5wYXlsb2FkLmZpbHRlckNyaXRlcmlhIH1cblxuICAgICAgICAgICAgcmV0dXJuIG5ld1N0YXRlXG4gICAgICAgIH1cblxuICAgIH1cbiAgICByZXR1cm4gc3RhdGVcbn1cblxuXG5cblxuXG4iLCJpbXBvcnQge2NvbWJpbmVSZWR1Y2Vyc30gZnJvbSAncmVkdXgnO1xuXG5pbXBvcnQgU0VBUkNIX0NSSVRFUklBX09QRCBmcm9tICcuL29wZC9zZWFyY2hDcml0ZXJpYS5qcydcbmltcG9ydCBTRUFSQ0hfQ1JJVEVSSUFfTEFCUyBmcm9tICcuL2RpYWdub3Npcy9zZWFyY2hDcml0ZXJpYS5qcydcbmltcG9ydCBET0NUT1JTIGZyb20gJy4vb3BkL2RvY3RvcnMuanMnXG5pbXBvcnQgRE9DVE9SX1NFQVJDSCBmcm9tICcuL29wZC9kb2N0b3JTZWFyY2guanMnXG5pbXBvcnQgTEFCUyBmcm9tICcuL2RpYWdub3Npcy9sYWJzLmpzJ1xuaW1wb3J0IExBQl9TRUFSQ0ggZnJvbSAnLi9kaWFnbm9zaXMvbGFic1NlYXJjaC5qcydcbmltcG9ydCBVU0VSIGZyb20gJy4vY29tbW9ucy91c2VyLmpzJ1xuaW1wb3J0IEFVVEggZnJvbSAnLi9jb21tb25zL2F1dGguanMnXG5cbmNvbnN0IGFsbFJlZHVjZXJzID0gY29tYmluZVJlZHVjZXJzKHtcbiAgICBTRUFSQ0hfQ1JJVEVSSUFfT1BELFxuICAgIFNFQVJDSF9DUklURVJJQV9MQUJTLFxuICAgIERPQ1RPUlMsXG4gICAgRE9DVE9SX1NFQVJDSCxcbiAgICBMQUJTLFxuICAgIExBQl9TRUFSQ0gsXG4gICAgVVNFUixcbiAgICBBVVRIXG59KTtcblxuZXhwb3J0IGRlZmF1bHQgYWxsUmVkdWNlcnNcbiIsImltcG9ydCB7IERPQ1RPUl9TRUFSQ0gsIERPQ1RPUl9TRUFSQ0hfU1RBUlQgfSBmcm9tICcuLi8uLi9jb25zdGFudHMvdHlwZXMnO1xuXG5jb25zdCBkZWZhdWx0U3RhdGUgPSB7XG4gICAgZG9jdG9yTGlzdDogW10sXG4gICAgTE9BREVEX0RPQ1RPUl9TRUFSQ0g6IGZhbHNlXG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChzdGF0ZSA9IGRlZmF1bHRTdGF0ZSwgYWN0aW9uKSB7XG5cbiAgICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG5cbiAgICAgICAgY2FzZSBET0NUT1JfU0VBUkNIX1NUQVJUOiB7XG4gICAgICAgICAgICBsZXQgbmV3U3RhdGUgPSB7IC4uLnN0YXRlIH1cblxuICAgICAgICAgICAgbmV3U3RhdGUuTE9BREVEX0RPQ1RPUl9TRUFSQ0ggPSBmYWxzZVxuXG4gICAgICAgICAgICByZXR1cm4gbmV3U3RhdGVcbiAgICAgICAgfVxuXG4gICAgICAgIGNhc2UgRE9DVE9SX1NFQVJDSDoge1xuICAgICAgICAgICAgbGV0IG5ld1N0YXRlID0geyAuLi5zdGF0ZSB9XG5cbiAgICAgICAgICAgIG5ld1N0YXRlLmRvY3Rvckxpc3QgPSBhY3Rpb24ucGF5bG9hZC5tYXAoZG9jID0+IGRvYy5pZClcbiAgICAgICAgICAgIG5ld1N0YXRlLkxPQURFRF9ET0NUT1JfU0VBUkNIID0gdHJ1ZVxuXG4gICAgICAgICAgICByZXR1cm4gbmV3U3RhdGVcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgcmV0dXJuIHN0YXRlXG59IiwiaW1wb3J0IHsgQVBQRU5EX0RPQ1RPUlMgfSBmcm9tICcuLi8uLi9jb25zdGFudHMvdHlwZXMnO1xuXG5jb25zdCBkZWZhdWx0U3RhdGUgPSB7XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHN0YXRlID0gZGVmYXVsdFN0YXRlLCBhY3Rpb24pIHtcblxuICAgIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICAgICAgY2FzZSBBUFBFTkRfRE9DVE9SUzoge1xuICAgICAgICAgICAgbGV0IG5ld1N0YXRlID0geyAuLi5zdGF0ZSB9XG5cbiAgICAgICAgICAgIHJldHVybiBhY3Rpb24ucGF5bG9hZC5yZWR1Y2UoKGRvY3Rvck1hcCwgZG9jdG9yKSA9PiB7XG4gICAgICAgICAgICAgICAgZG9jdG9yTWFwW2RvY3Rvci5pZF0gPSBkb2N0b3JcbiAgICAgICAgICAgICAgICByZXR1cm4gZG9jdG9yTWFwXG4gICAgICAgICAgICB9LG5ld1N0YXRlKVxuXG4gICAgICAgIH1cblxuICAgIH1cbiAgICByZXR1cm4gc3RhdGVcbn0iLCJpbXBvcnQgeyBTRUxFQ1RfTE9DQVRJT05fT1BELCBNRVJHRV9TRUFSQ0hfU1RBVEVfT1BELCBUT0dHTEVfT1BEX0NSSVRFUklBLCBMT0FEX1NFQVJDSF9DUklURVJJQV9PUEQgfSBmcm9tICcuLi8uLi9jb25zdGFudHMvdHlwZXMnO1xuXG5jb25zdCBkZWZhdWx0U3RhdGUgPSB7XG4gICAgTE9BREVEX1NFQVJDSF9DUklURVJJQV9PUEQ6IGZhbHNlLFxuICAgIHNwZWNpYWxpemF0aW9uczogW10sXG4gICAgY29uZGl0aW9uczogW10sXG4gICAgc2VsZWN0ZWRDcml0ZXJpYXM6IFtdLFxuICAgIHNlbGVjdGVkTG9jYXRpb246IG51bGwsXG4gICAgZmlsdGVyQ3JpdGVyaWE6IHtcbiAgICAgICAgcHJpY2VSYW5nZTogWzEwMCwgMTUwMF0sXG4gICAgICAgIHNvcnRfb246IG51bGwsXG4gICAgICAgIHNpdHNfYXRfY2xpbmljOiBmYWxzZSxcbiAgICAgICAgc2l0c19hdF9ob3NwaXRhbDogZmFsc2UsXG4gICAgICAgIGlzX2ZlbWFsZTogZmFsc2UsXG4gICAgICAgIGlzX2F2YWlsYWJsZTogZmFsc2VcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChzdGF0ZSA9IGRlZmF1bHRTdGF0ZSwgYWN0aW9uKSB7XG5cbiAgICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgICAgIGNhc2UgTE9BRF9TRUFSQ0hfQ1JJVEVSSUFfT1BEOiB7XG4gICAgICAgICAgICBsZXQgbmV3U3RhdGUgPSB7IC4uLnN0YXRlIH1cbiAgICAgICAgICAgIGlmIChhY3Rpb24ucGF5bG9hZCkge1xuICAgICAgICAgICAgICAgIG5ld1N0YXRlID0geyAuLi5uZXdTdGF0ZSwgLi4uYWN0aW9uLnBheWxvYWQgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbmV3U3RhdGUuTE9BREVEX1NFQVJDSF9DUklURVJJQV9PUEQgPSB0cnVlXG4gICAgICAgICAgICByZXR1cm4gbmV3U3RhdGVcbiAgICAgICAgfVxuXG4gICAgICAgIGNhc2UgVE9HR0xFX09QRF9DUklURVJJQToge1xuICAgICAgICAgICAgbGV0IG5ld1N0YXRlID0ge1xuICAgICAgICAgICAgICAgIC4uLnN0YXRlLFxuICAgICAgICAgICAgICAgIHNlbGVjdGVkQ3JpdGVyaWFzOiBbXS5jb25jYXQoc3RhdGUuc2VsZWN0ZWRDcml0ZXJpYXMpXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxldCBmb3VuZCA9IGZhbHNlXG4gICAgICAgICAgICBuZXdTdGF0ZS5zZWxlY3RlZENyaXRlcmlhcyA9IG5ld1N0YXRlLnNlbGVjdGVkQ3JpdGVyaWFzLmZpbHRlcigoY3VycikgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChjdXJyLmlkID09IGFjdGlvbi5wYXlsb2FkLmNyaXRlcmlhLmlkICYmIGN1cnIudHlwZSA9PSBhY3Rpb24ucGF5bG9hZC50eXBlKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvdW5kID0gdHJ1ZVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgIGlmICghZm91bmQpIHtcbiAgICAgICAgICAgICAgICBuZXdTdGF0ZS5zZWxlY3RlZENyaXRlcmlhcy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgLi4uYWN0aW9uLnBheWxvYWQuY3JpdGVyaWEsXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IGFjdGlvbi5wYXlsb2FkLnR5cGVcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gbmV3U3RhdGVcbiAgICAgICAgfVxuXG4gICAgICAgIGNhc2UgU0VMRUNUX0xPQ0FUSU9OX09QRDoge1xuICAgICAgICAgICAgbGV0IG5ld1N0YXRlID0geyAuLi5zdGF0ZSB9XG5cbiAgICAgICAgICAgIG5ld1N0YXRlLnNlbGVjdGVkTG9jYXRpb24gPSBhY3Rpb24ucGF5bG9hZFxuICAgICAgICAgICAgcmV0dXJuIG5ld1N0YXRlXG4gICAgICAgIH1cblxuICAgICAgICBjYXNlIE1FUkdFX1NFQVJDSF9TVEFURV9PUEQ6IHtcbiAgICAgICAgICAgIGxldCBuZXdTdGF0ZSA9IHsgLi4uc3RhdGUsIC4uLmFjdGlvbi5wYXlsb2FkLnNlYXJjaFN0YXRlLCBmaWx0ZXJDcml0ZXJpYTogYWN0aW9uLnBheWxvYWQuZmlsdGVyQ3JpdGVyaWEgfVxuXG4gICAgICAgICAgICByZXR1cm4gbmV3U3RhdGVcbiAgICAgICAgfVxuXG4gICAgfVxuICAgIHJldHVybiBzdGF0ZVxufVxuXG5cblxuXG5cbiIsImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBCcm93c2VyUm91dGVyLCBTd2l0Y2gsIFJvdXRlIH0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSdcblxuaW1wb3J0IHsgVHJhbnNpdGlvbkdyb3VwLCBDU1NUcmFuc2l0aW9uIH0gZnJvbSBcInJlYWN0LXRyYW5zaXRpb24tZ3JvdXBcIjtcblxuaW1wb3J0IFNlYXJjaENyaXRlcmlhIGZyb20gJy4vY29udGFpbmVycy9vcGQvU2VhcmNoQ3JpdGVyaWEuanMnXG5pbXBvcnQgTG9jYXRpb25TZWFyY2ggZnJvbSAnLi9jb250YWluZXJzL29wZC9Mb2NhdGlvblNlYXJjaC5qcydcbmltcG9ydCBTZWFyY2hSZXN1bHRzIGZyb20gJy4vY29udGFpbmVycy9vcGQvU2VhcmNoUmVzdWx0cy5qcydcbmltcG9ydCBTZWFyY2hSZXN1bHRzRmlsdGVyIGZyb20gJy4vY29udGFpbmVycy9vcGQvU2VhcmNoUmVzdWx0c0ZpbHRlci5qcydcbmltcG9ydCBEb2N0b3JQcm9maWxlIGZyb20gJy4vY29udGFpbmVycy9vcGQvRG9jdG9yUHJvZmlsZS5qcydcbmltcG9ydCBDbGluaWNMaXN0IGZyb20gJy4vY29udGFpbmVycy9vcGQvQ2xpbmljTGlzdC5qcydcbmltcG9ydCBBcHBvaW50bWVudFNsb3QgZnJvbSAnLi9jb250YWluZXJzL29wZC9BcHBvaW50bWVudFNsb3QuanMnXG5pbXBvcnQgUGF0aWVudERldGFpbHMgZnJvbSAnLi9jb250YWluZXJzL29wZC9QYXRpZW50RGV0YWlscy5qcydcblxuaW1wb3J0IFVzZXJQcm9maWxlIGZyb20gJy4vY29udGFpbmVycy9jb21tb25zL1VzZXJQcm9maWxlLmpzJ1xuaW1wb3J0IFVzZXJBcHBvaW50bWVudHMgZnJvbSAnLi9jb250YWluZXJzL2NvbW1vbnMvVXNlckFwcG9pbnRtZW50cy5qcydcbmltcG9ydCBVc2VyUmVwb3J0cyBmcm9tICcuL2NvbnRhaW5lcnMvY29tbW9ucy9Vc2VyUmVwb3J0cy5qcydcbmltcG9ydCBVc2VyU2lnbnVwIGZyb20gJy4vY29udGFpbmVycy9jb21tb25zL1VzZXJTaWdudXAnXG5cbmltcG9ydCBQYXltZW50IGZyb20gJy4vY29udGFpbmVycy9vcGQvUGF5bWVudC5qcydcbmltcG9ydCBCb29raW5nIGZyb20gJy4vY29udGFpbmVycy9vcGQvQm9va2luZy5qcydcbmltcG9ydCBDcml0ZXJpYVNlYXJjaCBmcm9tICcuL2NvbnRhaW5lcnMvb3BkL0NyaXRlcmlhU2VhcmNoLmpzJ1xuaW1wb3J0IERYX1NlYXJjaENyaXRlcmlhIGZyb20gJy4vY29udGFpbmVycy9kaWFnbm9zaXMvU2VhcmNoQ3JpdGVyaWEuanMnXG5pbXBvcnQgRFhfU2VhcmNoUmVzdWx0cyBmcm9tICcuL2NvbnRhaW5lcnMvZGlhZ25vc2lzL1NlYXJjaFJlc3VsdHMuanMnXG5pbXBvcnQgTGFiIGZyb20gJy4vY29udGFpbmVycy9kaWFnbm9zaXMvTGFiLmpzJ1xuaW1wb3J0IERYX1BhdGllbnREZXRhaWxzIGZyb20gJy4vY29udGFpbmVycy9kaWFnbm9zaXMvUGF0aWVudERldGFpbHMuanMnXG5pbXBvcnQgRFhfQm9va2luZ1N1bW1hcnkgZnJvbSAnLi9jb250YWluZXJzL2RpYWdub3Npcy9Cb29raW5nU3VtbWFyeS5qcydcbmltcG9ydCBEb2N0b3JDaGF0IGZyb20gJy4vY29udGFpbmVycy9jb21tb25zL0NoYXQuanMnXG5pbXBvcnQgVGVzdFNlbGVjdG9yIGZyb20gJy4vY29udGFpbmVycy9kaWFnbm9zaXMvVGVzdFNlbGVjdG9yJ1xuXG5pbXBvcnQgVXNlckxvZ2luIGZyb20gJy4vY29udGFpbmVycy9jb21tb25zL1VzZXJMb2dpbidcbmltcG9ydCBPdHBWZXJpZnkgZnJvbSAnLi9jb250YWluZXJzL2NvbW1vbnMvT3RwVmVyaWZ5J1xuXG5jb25zdCByb3V0ZXMgPSBbXG5cbiAgICB7IHBhdGg6ICcvb3BkJywgZXhhY3Q6IHRydWUsIGNvbXBvbmVudDogU2VhcmNoQ3JpdGVyaWEgfSxcbiAgICB7IHBhdGg6ICcvbG9jYXRpb25zZWFyY2gnLCBleGFjdDogdHJ1ZSwgY29tcG9uZW50OiBMb2NhdGlvblNlYXJjaCB9LFxuICAgIHsgcGF0aDogJy9vcGQvc2VhcmNocmVzdWx0cycsIGV4YWN0OiB0cnVlLCBjb21wb25lbnQ6IFNlYXJjaFJlc3VsdHMgfSxcbiAgICB7IHBhdGg6ICcvb3BkL2RvY3Rvci86aWQnLCBleGFjdDogdHJ1ZSwgY29tcG9uZW50OiBEb2N0b3JQcm9maWxlIH0sXG4gICAgeyBwYXRoOiAnL29wZC9kb2N0b3IvOmlkLzpjbGluaWNJZC9ib29rJywgZXhhY3Q6IHRydWUsIGNvbXBvbmVudDogQXBwb2ludG1lbnRTbG90IH0sXG5cbiAgICB7IHBhdGg6ICcvb3BkL2RvY3Rvci86aWQvYXZhaWxhYmlsaXR5JywgZXhhY3Q6IHRydWUsIGNvbXBvbmVudDogQ2xpbmljTGlzdCB9LFxuICAgIHsgcGF0aDogJy9kb2N0b3Jwcm9maWxlLzppZC86Y2xpbmljSWQvYm9va2RldGFpbHMnLCBleGFjdDogdHJ1ZSwgY29tcG9uZW50OiBQYXRpZW50RGV0YWlscyB9LFxuICAgIFxuICAgIHsgcGF0aDogJy91c2VyL3NpZ251cCcsIGV4YWN0OiB0cnVlLCBjb21wb25lbnQ6IFVzZXJTaWdudXAgfSxcbiAgICB7IHBhdGg6ICcvdXNlcicsIGV4YWN0OiB0cnVlLCBjb21wb25lbnQ6IFVzZXJQcm9maWxlIH0sXG4gICAgeyBwYXRoOiAnL3VzZXIvOmlkJywgZXhhY3Q6IHRydWUsIGNvbXBvbmVudDogVXNlclByb2ZpbGUgfSxcbiAgICB7IHBhdGg6ICcvdXNlci86aWQvYXBwb2ludG1lbnRzJywgZXhhY3Q6IHRydWUsIGNvbXBvbmVudDogVXNlckFwcG9pbnRtZW50cyB9LFxuICAgIHsgcGF0aDogJy91c2VyLzppZC9yZXBvcnRzJywgZXhhY3Q6IHRydWUsIGNvbXBvbmVudDogVXNlclJlcG9ydHMgfSxcbiAgICB7IHBhdGg6ICcvY2hhdCcsIGV4YWN0OiB0cnVlLCBjb21wb25lbnQ6IERvY3RvckNoYXQgfSxcbiAgICB7IHBhdGg6ICcvcGF5bWVudCcsIGV4YWN0OiB0cnVlLCBjb21wb25lbnQ6IFBheW1lbnQgfSxcbiAgICB7IHBhdGg6ICcvYm9va2luZy86cmVmSWQnLCBleGFjdDogdHJ1ZSwgY29tcG9uZW50OiBCb29raW5nIH0sXG5cbiAgICB7IHBhdGg6ICcvbG9naW4nLCBleGFjdDogdHJ1ZSwgY29tcG9uZW50OiBVc2VyTG9naW4gfSxcbiAgICB7IHBhdGg6ICcvb3RwL3ZlcmlmeScsIGV4YWN0OiB0cnVlLCBjb21wb25lbnQ6IE90cFZlcmlmeSB9LFxuXG4gICAgeyBwYXRoOiAnL2R4JywgZXhhY3Q6IHRydWUsIGNvbXBvbmVudDogRFhfU2VhcmNoQ3JpdGVyaWEgfSxcbiAgICB7IHBhdGg6ICcvZHgvc2VhcmNocmVzdWx0cycsIGV4YWN0OiB0cnVlLCBjb21wb25lbnQ6IERYX1NlYXJjaFJlc3VsdHMgfSxcbiAgICB7IHBhdGg6ICcvbGFiLzppZCcsIGV4YWN0OiB0cnVlLCBjb21wb25lbnQ6IExhYiB9LFxuICAgIHsgcGF0aDogJy9sYWIvOmlkL3Rlc3RzJywgZXhhY3Q6IHRydWUsIGNvbXBvbmVudDogVGVzdFNlbGVjdG9yIH0sXG4gICAgeyBwYXRoOiAnL2xhYi86aWQvYm9vaycsIGV4YWN0OiB0cnVlLCBjb21wb25lbnQ6IERYX0Jvb2tpbmdTdW1tYXJ5IH0sXG5cbiAgICB7IHBhdGg6ICcvbGFiL2Jvb2tpbmcvc3VtbWFyeS86aWQnLCBleGFjdDogdHJ1ZSwgY29tcG9uZW50OiBEWF9Cb29raW5nU3VtbWFyeSB9LFxuXG5dXG5cbmNsYXNzIFJvdXRlckNvbmZpZyBleHRlbmRzIENvbXBvbmVudCB7XG5cbiAgICBzdGF0aWMgUk9VVEVTID0gcm91dGVzXG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIDxSb3V0ZVxuICAgICAgICAgICAgICAgICAgICByZW5kZXI9e1xuICAgICAgICAgICAgICAgICAgICAgICAgKHsgbG9jYXRpb24gfSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxUcmFuc2l0aW9uR3JvdXA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Q1NTVHJhbnNpdGlvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleT17bG9jYXRpb24ucGF0aG5hbWV9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lcz1cImZhZGVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpbWVvdXQ9e3sgZW50ZXI6IDMwMCwgZXhpdDogMCB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV4aXQ9e2ZhbHNlfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxTd2l0Y2ggbG9jYXRpb249e2xvY2F0aW9ufT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3JvdXRlcy5tYXAoKHJvdXRlLCBpKSA9PiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Um91dGUgey4uLnJvdXRlfSBrZXk9e2l9IC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvU3dpdGNoPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9DU1NUcmFuc2l0aW9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L1RyYW5zaXRpb25Hcm91cD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvPlxuXG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKVxuICAgIH1cblxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IFJvdXRlckNvbmZpZ1xuXG4iLCJcbmNvbnN0IGRheXMgPSBbJ1N1bmRheScsICdNb25kYXknLCAnVHVlc2RheScsICdXZWRuZXNkYXknLCAnVGh1cnNkYXknLCAnRnJpZGF5JywgJ1NhdHVyZGF5J107XG5cbmV4cG9ydCBjb25zdCBnZXRUaW1lID0gKHRpbWVTdGFtcCkgPT4ge1xuICAgIHZhciBkYXRlID0gbmV3IERhdGUodGltZVN0YW1wKTtcbiAgICB2YXIgaG91cnMgPSBkYXRlLmdldEhvdXJzKCk7XG4gICAgdmFyIG1pbnV0ZXMgPSBcIjBcIiArIGRhdGUuZ2V0TWludXRlcygpO1xuICAgIHJldHVybiBob3VycyArICc6JyArIG1pbnV0ZXMuc3Vic3RyKC0yKVxufVxuZXhwb3J0IGNvbnN0IGdldERheU5hbWUgPSAodGltZVN0YW1wKSA9PiB7XG4gICAgcmV0dXJuIGRheXNbbmV3IERhdGUodGltZVN0YW1wKS5nZXREYXkoKV1cblxufSIsInByb2Nlc3MuZW52Lk5PREVfVExTX1JFSkVDVF9VTkFVVEhPUklaRUQgPSBcIjBcIlxuXG5jb25zdCBwYXRoID0gcmVxdWlyZSgncGF0aCcpO1xuY29uc3QgaHR0cCA9IHJlcXVpcmUoJ2h0dHAnKTtcbmNvbnN0IEV4cHJlc3MgPSByZXF1aXJlKCdleHByZXNzJyk7XG5jb25zdCBhcHAgPSBuZXcgRXhwcmVzcygpO1xuY29uc3Qgc2VydmVyID0gbmV3IGh0dHAuU2VydmVyKGFwcCk7XG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcbmltcG9ydCBSZWFjdERPTVNlcnZlciBmcm9tICdyZWFjdC1kb20vc2VydmVyJ1xuaW1wb3J0IHsgU3RhdGljUm91dGVyIH0gZnJvbSAncmVhY3Qtcm91dGVyJ1xuaW1wb3J0IFJvdXRlcyBmcm9tICcuL2Rldi9qcy9yb3V0ZXMuanMnXG5pbXBvcnQgeyBNdWlUaGVtZVByb3ZpZGVyLCBjcmVhdGVNdWlUaGVtZSwgY3JlYXRlR2VuZXJhdGVDbGFzc05hbWUgfSBmcm9tICdtYXRlcmlhbC11aS9zdHlsZXMnO1xuaW1wb3J0IHsgU2hlZXRzUmVnaXN0cnkgfSBmcm9tICdyZWFjdC1qc3MvbGliL2pzcyc7XG5cbmltcG9ydCBKc3NQcm92aWRlciBmcm9tICdyZWFjdC1qc3MvbGliL0pzc1Byb3ZpZGVyJztcbmltcG9ydCB7IFByb3ZpZGVyIH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IHsgY3JlYXRlU3RvcmUsIGFwcGx5TWlkZGxld2FyZSB9IGZyb20gJ3JlZHV4JztcbmltcG9ydCB0aHVuayBmcm9tICdyZWR1eC10aHVuayc7XG5pbXBvcnQgeyBjcmVhdGVMb2dnZXIgfSBmcm9tICdyZWR1eC1sb2dnZXInXG5pbXBvcnQgYWxsUmVkdWNlcnMgZnJvbSAnLi9kZXYvanMvcmVkdWNlcnMvaW5kZXguanMnO1xuaW1wb3J0IHsgbWF0Y2hQYXRoIH0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSdcblxuXG5hcHAudXNlKCcvYXNzZXRzJywgRXhwcmVzcy5zdGF0aWMocGF0aC5qb2luKF9fZGlybmFtZSwgJ2Fzc2V0cycpKSk7XG5hcHAudXNlKCcvZGlzdCcsIEV4cHJlc3Muc3RhdGljKHBhdGguam9pbihfX2Rpcm5hbWUsICdkaXN0JykpKTtcblxuXG5hcHAuZ2V0KCcqJywgZnVuY3Rpb24gKHJlcSwgcmVzKSB7XG5cbiAgICBjb25zdCBjb250ZXh0ID0ge31cblxuICAgIGNvbnN0IHN0b3JlID0gY3JlYXRlU3RvcmUoXG4gICAgICAgIGFsbFJlZHVjZXJzLCBhcHBseU1pZGRsZXdhcmUodGh1bmspXG4gICAgKTtcblxuICAgIGNvbnN0IHNoZWV0c1JlZ2lzdHJ5ID0gbmV3IFNoZWV0c1JlZ2lzdHJ5KCk7XG4gICAgY29uc3QgdGhlbWUgPSBjcmVhdGVNdWlUaGVtZSh7XG4gICAgICAgIHBhbGV0dGU6IHtcbiAgICAgICAgICAgIHByaW1hcnk6IHtcbiAgICAgICAgICAgICAgICBtYWluOiAnIzAwYjdiMCdcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZWNvbmRhcnk6IHtcbiAgICAgICAgICAgICAgICBtYWluOiAnIzAwYjdiMCdcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIHN0YXR1czoge1xuICAgICAgICAgICAgZGFuZ2VyOiAnb3JhbmdlJyxcbiAgICAgICAgfSxcbiAgICB9KVxuICAgIGNvbnN0IGdlbmVyYXRlQ2xhc3NOYW1lID0gY3JlYXRlR2VuZXJhdGVDbGFzc05hbWUoKTtcblxuICAgIGlmIChjb250ZXh0LnVybCkge1xuICAgICAgICByZXMud3JpdGVIZWFkKDMwMSwge1xuICAgICAgICAgICAgTG9jYXRpb246IGNvbnRleHQudXJsXG4gICAgICAgIH0pXG4gICAgICAgIHJlcy5lbmQoKVxuICAgIH0gZWxzZSB7XG5cbiAgICAgICAgLy8gaW5zaWRlIGEgcmVxdWVzdFxuICAgICAgICBjb25zdCBwcm9taXNlcyA9IFtdXG5cbiAgICAgICAgUm91dGVzLlJPVVRFUy5zb21lKHJvdXRlID0+IHtcbiAgICAgICAgICAgIC8vIHVzZSBgbWF0Y2hQYXRoYCBoZXJlXG4gICAgICAgICAgICBjb25zdCBtYXRjaCA9IG1hdGNoUGF0aChyZXEucGF0aCwgcm91dGUpXG4gICAgICAgICAgICBpZiAobWF0Y2ggJiYgcm91dGUuY29tcG9uZW50LmxvYWREYXRhKVxuICAgICAgICAgICAgICAgIHByb21pc2VzLnB1c2gocm91dGUuY29tcG9uZW50LmxvYWREYXRhKHN0b3JlLCBtYXRjaCkpXG4gICAgICAgICAgICByZXR1cm4gbWF0Y2hcbiAgICAgICAgfSlcblxuICAgICAgICBQcm9taXNlLmFsbChwcm9taXNlcykudGhlbihkYXRhID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHN0b3JlRGF0YSA9IEpTT04uc3RyaW5naWZ5KHN0b3JlLmdldFN0YXRlKCkpXG4gICAgICAgICAgICBjb25zdCBodG1sID0gUmVhY3RET01TZXJ2ZXIucmVuZGVyVG9TdHJpbmcoXG4gICAgICAgICAgICAgICAgPFByb3ZpZGVyIHN0b3JlPXtzdG9yZX0+XG4gICAgICAgICAgICAgICAgICAgIDxKc3NQcm92aWRlciByZWdpc3RyeT17c2hlZXRzUmVnaXN0cnl9IGdlbmVyYXRlQ2xhc3NOYW1lPXtnZW5lcmF0ZUNsYXNzTmFtZX0+XG4gICAgICAgICAgICAgICAgICAgICAgICA8TXVpVGhlbWVQcm92aWRlciB0aGVtZT17dGhlbWV9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxTdGF0aWNSb3V0ZXJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9jYXRpb249e3JlcS51cmx9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQ9e2NvbnRleHR9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Um91dGVzIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9TdGF0aWNSb3V0ZXI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L011aVRoZW1lUHJvdmlkZXI+XG4gICAgICAgICAgICAgICAgICAgIDwvSnNzUHJvdmlkZXI+XG4gICAgICAgICAgICAgICAgPC9Qcm92aWRlcj5cbiAgICAgICAgICAgIClcbiAgICAgICAgICAgIGNvbnN0IGNzcyA9IHNoZWV0c1JlZ2lzdHJ5LnRvU3RyaW5nKClcblxuICAgICAgICAgICAgcmVzLnJlbmRlcignLi9pbmRleC50ZW1wbGF0ZS5lanMnLCB7XG4gICAgICAgICAgICAgICAgaHRtbCwgY3NzLCBzdG9yZURhdGFcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pXG5cbiAgICB9XG5cbn0pO1xuXG5cbmFwcC51c2UoZnVuY3Rpb24gKHJlcSwgcmVzKSB7XG4gICAgcmVzLnNlbmRGaWxlKCdpbmRleC5odG1sJywgeyByb290OiAnLi9kaXN0LycgfSlcbn0pXG5cbnNlcnZlci5saXN0ZW4oMzAwMCwgKGVycikgPT4ge1xuICAgIGlmIChlcnIpIHtcbiAgICAgICAgcmV0dXJuIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICB9XG4gICAgY29uc29sZS5pbmZvKCdTZXJ2ZXIgcnVubmluZyBvbiBodHRwOi8vbG9jYWxob3N0OjMwMDAnKTtcbn0pOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImF4aW9zXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImV4cHJlc3NcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiaHR0cFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJtYXRlcmlhbC11aS1pY29ucy9BY2NvdW50Q2lyY2xlXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm1hdGVyaWFsLXVpLWljb25zL0F0dGFjaE1vbmV5XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm1hdGVyaWFsLXVpLWljb25zL0NhbGxcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibWF0ZXJpYWwtdWktaWNvbnMvRXhwYW5kTW9yZVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJtYXRlcmlhbC11aS1pY29ucy9LZXlib2FyZEFycm93UmlnaHRcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibWF0ZXJpYWwtdWktaWNvbnMvUGF5bWVudFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJtYXRlcmlhbC11aS9DaGVja2JveFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJtYXRlcmlhbC11aS9DaGlwXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm1hdGVyaWFsLXVpL0V4cGFuc2lvblBhbmVsXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm1hdGVyaWFsLXVpL0Zvcm1cIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibWF0ZXJpYWwtdWkvTWVudVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJtYXRlcmlhbC11aS9Qcm9ncmVzc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJtYXRlcmlhbC11aS9SYWRpb1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJtYXRlcmlhbC11aS9TdGVwcGVyXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm1hdGVyaWFsLXVpL3N0eWxlc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJwYXRoXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJjLXNsaWRlci9saWIvUmFuZ2VcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhY3RcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhY3QtZG9tL3NlcnZlclwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdC1qc3MvbGliL0pzc1Byb3ZpZGVyXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0LWpzcy9saWIvanNzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0LXJlZHV4XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0LXJvdXRlclwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdC1yb3V0ZXItZG9tXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0LXRyYW5zaXRpb24tZ3JvdXBcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVkdXhcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVkdXgtbG9nZ2VyXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlZHV4LXRodW5rXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInVuaXZlcnNhbC1jb29raWVcIik7Il0sInNvdXJjZVJvb3QiOiIifQ==