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
exports.registerUser = exports.submitOTP = exports.sendOTP = undefined;

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

    (0, _api.API_POST)('/api/v1/user/login', {
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

const registerUser = exports.registerUser = (postData, cb) => dispatch => {
    dispatch({
        type: _types.SUBMIT_OTP_REQUEST,
        payload: {}
    });

    (0, _api.API_POST)('/api/v1/user/register', postData).then(function (response) {
        // set cookie token explicitly, csrf token is set by default
        // STORAGE.setAuthToken(response.token)
        debugger;
        dispatch({
            type: _types.SUBMIT_OTP_SUCCESS,
            payload: { token: response.token }
        });
        if (cb) cb(response);
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

/***/ "./dev/js/components/commons/Home/HomeView.js":
/*!****************************************************!*\
  !*** ./dev/js/components/commons/Home/HomeView.js ***!
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

class HomeView extends _react2.default.Component {
    constructor(props) {
        super(props);
    }

    navigateTo(where) {
        this.props.history.push(where);
    }

    render() {

        return _react2.default.createElement(
            "div",
            null,
            _react2.default.createElement(
                "header",
                { className: "skin-primary fixed horizontal top" },
                _react2.default.createElement(
                    "div",
                    { className: "container-fluid" },
                    _react2.default.createElement(
                        "div",
                        { className: "row" },
                        _react2.default.createElement(
                            "div",
                            { className: "col-4" },
                            _react2.default.createElement(
                                "div",
                                { className: "header-title fw-700 capitalize text-white" },
                                "ICON"
                            )
                        ),
                        _react2.default.createElement("div", { className: "col-4" }),
                        _react2.default.createElement(
                            "div",
                            { className: "col-4" },
                            _react2.default.createElement(
                                "ul",
                                { className: "inline-list float-right user-notification-action" },
                                _react2.default.createElement(
                                    "li",
                                    null,
                                    _react2.default.createElement(
                                        "span",
                                        { className: "icon icon-md text-middle" },
                                        _react2.default.createElement("img", { src: "/assets/img/customer-icons/user.svg", className: "img-fluid" })
                                    )
                                ),
                                _react2.default.createElement(
                                    "li",
                                    null,
                                    _react2.default.createElement(
                                        "span",
                                        { className: "icon icon-md text-middle notification-icon" },
                                        _react2.default.createElement("img", { src: "/assets/img/customer-icons/notification.svg", className: "img-fluid" }),
                                        " ",
                                        _react2.default.createElement("span", { className: "notification-alert" })
                                    )
                                )
                            )
                        )
                    )
                )
            ),
            _react2.default.createElement(
                "section",
                { className: "wrap ct-home-screen" },
                _react2.default.createElement(
                    "div",
                    { className: "container-fluid" },
                    _react2.default.createElement(
                        "div",
                        { className: "row" },
                        _react2.default.createElement(
                            "div",
                            { className: "col-12" },
                            _react2.default.createElement("div", { className: "widget mrt-10 ct-profile" })
                        )
                    ),
                    _react2.default.createElement(
                        "div",
                        { className: "row" },
                        _react2.default.createElement(
                            "div",
                            { className: "col-6", onClick: this.navigateTo.bind(this, '/opd') },
                            _react2.default.createElement(
                                "div",
                                { className: "widget" },
                                _react2.default.createElement(
                                    "div",
                                    { className: "widget-content text-center booked-dr" },
                                    _react2.default.createElement(
                                        "div",
                                        { className: "ct-img ct-img-lg stath-img" },
                                        _react2.default.createElement("img", { src: "/assets/img/customer-icons/steth.svg", className: "img-fluid stath-img" })
                                    ),
                                    _react2.default.createElement(
                                        "h4",
                                        { className: "text-md fw-500" },
                                        "Book and Visit a Doctor"
                                    )
                                )
                            )
                        ),
                        _react2.default.createElement(
                            "div",
                            { className: "col-6", onClick: this.navigateTo.bind(this, '/dx') },
                            _react2.default.createElement(
                                "div",
                                { className: "widget" },
                                _react2.default.createElement(
                                    "div",
                                    { className: "widget-content text-center booked-dr" },
                                    _react2.default.createElement(
                                        "div",
                                        { className: "ct-img ct-img-lg stath-img" },
                                        _react2.default.createElement("img", { src: "/assets/img/customer-icons/medical-test.svg", className: "img-fluid stath-img" })
                                    ),
                                    _react2.default.createElement(
                                        "h4",
                                        { className: "text-md fw-500" },
                                        "Book medical test"
                                    )
                                )
                            )
                        )
                    ),
                    _react2.default.createElement(
                        "div",
                        { className: "row" },
                        _react2.default.createElement(
                            "div",
                            { className: "col-12" },
                            _react2.default.createElement(
                                "div",
                                { className: "widget consultant-quick" },
                                _react2.default.createElement(
                                    "div",
                                    { className: "widget-header" },
                                    _react2.default.createElement(
                                        "h4",
                                        { className: "widget-title fw-700 text-lg text-center" },
                                        "Get instant Consultation right now for ",
                                        _react2.default.createElement(
                                            "a",
                                            { href: "#", className: "link-text" },
                                            "FREE"
                                        )
                                    )
                                ),
                                _react2.default.createElement(
                                    "div",
                                    { className: "widget-content text-center" },
                                    _react2.default.createElement(
                                        "div",
                                        { className: "row" },
                                        _react2.default.createElement(
                                            "div",
                                            { className: "col-6" },
                                            _react2.default.createElement(
                                                "span",
                                                { className: "ct-img ct-img-sm" },
                                                _react2.default.createElement("img", { src: "/assets/img/customer-icons/message.svg", className: "img-fluid" })
                                            )
                                        ),
                                        _react2.default.createElement(
                                            "div",
                                            { className: "col-6" },
                                            _react2.default.createElement(
                                                "span",
                                                { className: "ct-img ct-img-sm" },
                                                _react2.default.createElement("img", { src: "/assets/img/customer-icons/call.svg", className: "img-fluid" })
                                            )
                                        )
                                    )
                                ),
                                _react2.default.createElement(
                                    "div",
                                    { className: "widget-footer" },
                                    _react2.default.createElement(
                                        "div",
                                        { className: "enq-suggestion" },
                                        _react2.default.createElement(
                                            "ul",
                                            { className: "inline-list" },
                                            _react2.default.createElement(
                                                "li",
                                                null,
                                                _react2.default.createElement(
                                                    "a",
                                                    { href: "#", className: "v-btn v-btn-primary outline round-tag" },
                                                    "Headache"
                                                )
                                            ),
                                            _react2.default.createElement(
                                                "li",
                                                null,
                                                _react2.default.createElement(
                                                    "a",
                                                    { href: "#", className: "v-btn v-btn-primary outline round-tag" },
                                                    "Headache"
                                                )
                                            ),
                                            _react2.default.createElement(
                                                "li",
                                                null,
                                                _react2.default.createElement(
                                                    "a",
                                                    { href: "#", className: "v-btn v-btn-primary outline round-tag" },
                                                    "Headache"
                                                )
                                            )
                                        )
                                    )
                                )
                            )
                        )
                    ),
                    _react2.default.createElement(
                        "div",
                        { className: "row" },
                        _react2.default.createElement(
                            "div",
                            { className: "col-12" },
                            _react2.default.createElement(
                                "div",
                                { className: "widget" },
                                _react2.default.createElement(
                                    "div",
                                    { className: "widget-content" },
                                    _react2.default.createElement("input", { type: "text", className: "fc-input input-line", placeholder: "I am suffering form headache" })
                                )
                            )
                        )
                    )
                )
            )
        );
    }
}

exports.default = HomeView;

/***/ }),

/***/ "./dev/js/components/commons/Home/index.js":
/*!*************************************************!*\
  !*** ./dev/js/components/commons/Home/index.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _HomeView = __webpack_require__(/*! ./HomeView */ "./dev/js/components/commons/Home/HomeView.js");

var _HomeView2 = _interopRequireDefault(_HomeView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _HomeView2.default;

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
            validationError: '',
            showOTP: false,
            otp: ""
        };
    }

    inputHandler(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    submitOTPRequest(number) {

        if (number.match(/^[789]{1}[0-9]{9}$/)) {
            this.setState({ validationError: "" });
            this.props.sendOTP(number, exists => {
                if (exists) {
                    this.setState({ showOTP: true });
                } else {
                    this.props.history.replace('/signup');
                }
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
                                _react2.default.createElement('input', { type: 'text', className: 'fc-input text-center', placeholder: '934XXXXXX', value: this.state.phoneNumber, onChange: this.inputHandler.bind(this), name: 'phoneNumber' })
                            ),
                            this.state.showOTP ? _react2.default.createElement(
                                'div',
                                { className: 'adon-group enter-mobile-number' },
                                _react2.default.createElement('br', null),
                                _react2.default.createElement('br', null),
                                _react2.default.createElement('input', { type: 'text', className: 'fc-input text-center', placeholder: 'Enter OTP', value: this.state.otp, onChange: this.inputHandler.bind(this), name: 'otp' })
                            ) : ""
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
            this.state.showOTP ? _react2.default.createElement(
                'button',
                { className: 'v-btn v-btn-primary btn-lg fixed horizontal bottom no-round btn-lg text-lg' },
                'Verify'
            ) : _react2.default.createElement(
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

const stepperStyle = {
    padding: 60,
    paddingBottom: 0,
    paddingTop: 10
};

class UserSignupView extends _react2.default.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            age: '',
            gender: 'm',
            email: '',
            phone_number: this.props.phoneNumber,
            otp: ''
        };
    }

    componentDidMount() {
        if (!this.props.phoneNumber) {
            this.props.history.replace('/login');
        }
    }

    inputHandler(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    submitForm() {
        // validate
        let register = true;
        Object.keys(this.refs).forEach((prp, i) => {
            if (this.refs[prp].value) {
                this.refs[prp].style.border = '';
            } else {
                this.refs[prp].style.border = '1px solid red';
                register = false;
            }
        });

        if (register) {
            this.props.registerUser(this.state, res => {
                debugger;
            });
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
                                    _react2.default.createElement('span', { className: 'icon icon-sm text-middle back-icon-white' })
                                )
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'col-8' },
                            _react2.default.createElement(
                                'div',
                                { className: 'header-title fw-700 capitalize text-center' },
                                'Signup User'
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
                    { style: stepperStyle },
                    _react2.default.createElement(
                        'div',
                        { className: 'col-12' },
                        _react2.default.createElement(
                            'div',
                            { className: 'app-timeline book-confirmed-timeline' },
                            _react2.default.createElement(
                                'ul',
                                { className: 'inline-list' },
                                _react2.default.createElement(
                                    'li',
                                    { className: 'active' },
                                    _react2.default.createElement(
                                        'span',
                                        { className: 'dot' },
                                        '1'
                                    ),
                                    _react2.default.createElement(
                                        'p',
                                        { className: 'text-sm fw-700 text-light' },
                                        'Details'
                                    )
                                ),
                                _react2.default.createElement('li', null),
                                _react2.default.createElement(
                                    'li',
                                    null,
                                    _react2.default.createElement(
                                        'span',
                                        { className: 'dot' },
                                        '2'
                                    ),
                                    _react2.default.createElement(
                                        'p',
                                        { className: 'text-sm fw-700 text-light' },
                                        'Medical'
                                    )
                                )
                            )
                        )
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'widget no-round no-shadow' },
                    _react2.default.createElement(
                        'div',
                        { className: 'widget-content' },
                        _react2.default.createElement(
                            'form',
                            { className: 'go-bottom' },
                            _react2.default.createElement(
                                'div',
                                { className: 'labelWrap' },
                                _react2.default.createElement('input', { id: 'otp', name: 'otp', type: 'text', value: this.state.otp, onChange: this.inputHandler.bind(this), required: true, ref: 'otp' }),
                                _react2.default.createElement(
                                    'label',
                                    { htmlFor: 'otp' },
                                    'Enter OTP'
                                )
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'labelWrap' },
                                _react2.default.createElement('input', { id: 'number', name: 'phone_number', type: 'text', onChange: () => {}, value: this.state.phone_number, required: true, ref: 'phone_number' }),
                                _react2.default.createElement(
                                    'label',
                                    { htmlFor: 'number' },
                                    'Mobile Number'
                                )
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'labelWrap' },
                                _react2.default.createElement('input', { id: 'fname', name: 'name', type: 'text', value: this.state.name, onChange: this.inputHandler.bind(this), required: true, ref: 'name' }),
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
                                _react2.default.createElement('input', { id: 'age', name: 'age', type: 'text', value: this.state.age, onChange: this.inputHandler.bind(this), required: true, ref: 'age' }),
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
                                _react2.default.createElement('input', { id: 'email', name: 'email', type: 'text', value: this.state.email, onChange: this.inputHandler.bind(this), required: true, ref: 'email' }),
                                _react2.default.createElement(
                                    'label',
                                    { htmlFor: 'email' },
                                    'Email'
                                )
                            )
                        )
                    )
                )
            ),
            _react2.default.createElement(
                'span',
                { className: 'errorMessage' },
                this.props.error_message
            ),
            _react2.default.createElement(
                'button',
                { className: 'v-btn v-btn-primary btn-lg fixed horizontal bottom no-round btn-lg text-lg', onClick: this.submitForm.bind(this) },
                'Next'
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
                                hospital.timings["Mon-Sun"] ? hospital.timings["Mon-Sun"][0] : ""
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

/***/ "./dev/js/containers/commons/Home.js":
/*!*******************************************!*\
  !*** ./dev/js/containers/commons/Home.js ***!
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

var _Home = __webpack_require__(/*! ../../components/commons/Home */ "./dev/js/components/commons/Home/index.js");

var _Home2 = _interopRequireDefault(_Home);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Home extends _react2.default.Component {
    constructor(props) {
        super(props);
    }

    render() {

        return _react2.default.createElement(_Home2.default, this.props);
    }
}

Home.contextTypes = {
    router: () => null
};
const mapStateToProps = state => {
    let {} = state.AUTH;

    return {};
};

const mapDispatchToProps = dispatch => {
    return {};
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Home);

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
        sendOTP: (number, cb) => dispatch((0, _index.sendOTP)(number, cb)),
        submitOTP: (number, otp, cb) => dispatch((0, _index.submitOTP)(number, otp, cb))
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

var _index = __webpack_require__(/*! ../../actions/index.js */ "./dev/js/actions/index.js");

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
        registerUser: (postData, cb) => dispatch((0, _index.registerUser)(postData, cb))
    };
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
// import OtpVerify from './containers/commons/OtpVerify'

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

var _Home = __webpack_require__(/*! ./containers/commons/Home */ "./dev/js/containers/commons/Home.js");

var _Home2 = _interopRequireDefault(_Home);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const routes = [{ path: '/', exact: true, component: _Home2.default }, { path: '/opd', exact: true, component: _SearchCriteria2.default }, { path: '/locationsearch', exact: true, component: _LocationSearch2.default }, { path: '/opd/searchresults', exact: true, component: _SearchResults2.default }, { path: '/opd/doctor/:id', exact: true, component: _DoctorProfile2.default }, { path: '/opd/doctor/:id/:clinicId/book', exact: true, component: _AppointmentSlot2.default }, { path: '/opd/doctor/:id/availability', exact: true, component: _ClinicList2.default }, { path: '/doctorprofile/:id/:clinicId/bookdetails', exact: true, component: _PatientDetails2.default }, { path: '/user', exact: true, component: _UserProfile2.default }, { path: '/user/:id', exact: true, component: _UserProfile2.default }, { path: '/user/:id/appointments', exact: true, component: _UserAppointments2.default }, { path: '/user/:id/reports', exact: true, component: _UserReports2.default }, { path: '/chat', exact: true, component: _Chat2.default }, { path: '/payment', exact: true, component: _Payment2.default }, { path: '/booking/:refId', exact: true, component: _Booking2.default }, { path: '/login', exact: true, component: _UserLogin2.default }, { path: '/signup', exact: true, component: _UserSignup2.default }, { path: '/dx', exact: true, component: _SearchCriteria4.default }, { path: '/dx/searchresults', exact: true, component: _SearchResults4.default }, { path: '/lab/:id', exact: true, component: _Lab2.default }, { path: '/lab/:id/tests', exact: true, component: _TestSelector2.default }, { path: '/lab/:id/book', exact: true, component: _BookingSummary2.default }, { path: '/lab/booking/summary/:id', exact: true, component: _BookingSummary2.default }];

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2FjdGlvbnMvY29tbW9ucy9hdXRoLmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9hY3Rpb25zL2NvbW1vbnMvdXNlci5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvYWN0aW9ucy9kaWFnbm9zaXMvbGFiU2VhcmNoLmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9hY3Rpb25zL2RpYWdub3Npcy9zZWFyY2hDcml0ZXJpYS5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvYWN0aW9ucy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvYWN0aW9ucy9vcGQvZG9jdG9yU2VhcmNoLmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9hY3Rpb25zL29wZC9zZWFyY2hDcml0ZXJpYS5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvYXBpL2FwaS5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9jb21tb25zL0hvbWUvSG9tZVZpZXcuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvY29tbW9ucy9Ib21lL2luZGV4LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL2NvbW1vbnMvTG9hZGVyL0xvYWRlci5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9jb21tb25zL0xvYWRlci9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9jb21tb25zL1VzZXJMb2dpbi9Vc2VyTG9naW4uanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvY29tbW9ucy9Vc2VyTG9naW4vaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvY29tbW9ucy9jaGF0L0NoYXRWaWV3LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL2NvbW1vbnMvY2hhdC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9jb21tb25zL2NvbW1vbmx5U2VhcmNoZWQvQ29tbW9ubHlTZWFyY2hlZC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9jb21tb25zL2NvbW1vbmx5U2VhcmNoZWQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvY29tbW9ucy9jcml0ZXJpYVNlYXJjaC9Dcml0ZXJpYVNlYXJjaFZpZXcuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvY29tbW9ucy9jcml0ZXJpYVNlYXJjaC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9jb21tb25zL3Byb2ZpbGVTbGlkZXIvUHJvZmlsZVNsaWRlci5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9jb21tb25zL3Byb2ZpbGVTbGlkZXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvY29tbW9ucy90aW1lU2xvdFNlbGVjdG9yL1RpbWVTbG90U2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvY29tbW9ucy90aW1lU2xvdFNlbGVjdG9yL2luZGV4LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL2NvbW1vbnMvdXNlckFwcG9pbnRtZW50cy9Vc2VyQXBwb2ludG1lbnRzVmlldy5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9jb21tb25zL3VzZXJBcHBvaW50bWVudHMvYXBwb2ludG1lbnRMaXN0L0FwcG9pbnRtZW50TGlzdC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9jb21tb25zL3VzZXJBcHBvaW50bWVudHMvYXBwb2ludG1lbnRMaXN0L2luZGV4LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL2NvbW1vbnMvdXNlckFwcG9pbnRtZW50cy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9jb21tb25zL3VzZXJQcm9maWxlL1VzZXJQcm9maWxlVmlldy5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9jb21tb25zL3VzZXJQcm9maWxlL2luZGV4LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL2NvbW1vbnMvdXNlclByb2ZpbGUvcHJvZmlsZURhdGEvUHJvZmlsZURhdGEuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvY29tbW9ucy91c2VyUHJvZmlsZS9wcm9maWxlRGF0YS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9jb21tb25zL3VzZXJSZXBvcnRzL1VzZXJSZXBvcnRzVmlldy5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9jb21tb25zL3VzZXJSZXBvcnRzL2luZGV4LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL2NvbW1vbnMvdXNlclJlcG9ydHMvcmVwb3J0TGlzdC9SZXBvcnRMaXN0LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL2NvbW1vbnMvdXNlclJlcG9ydHMvcmVwb3J0TGlzdC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9jb21tb25zL3VzZXJTaWdudXAvVXNlclNpZ251cC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9jb21tb25zL3VzZXJTaWdudXAvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvZGlhZ25vc2lzL2Jvb2tpbmdTdW1tYXJ5L0Jvb2tpbmdTdW1tYXJ5Vmlldy5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9kaWFnbm9zaXMvYm9va2luZ1N1bW1hcnkvY2hvb3NlUGF0aWVudC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9kaWFnbm9zaXMvYm9va2luZ1N1bW1hcnkvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvZGlhZ25vc2lzL2Jvb2tpbmdTdW1tYXJ5L3BpY2t1cEFkZHJlc3MuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvZGlhZ25vc2lzL2Jvb2tpbmdTdW1tYXJ5L3Zpc2l0VGltZS5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9kaWFnbm9zaXMvY29tbW9ucy9sYWJEZXRhaWxzL0xhYkRldGFpbC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9kaWFnbm9zaXMvY29tbW9ucy9sYWJEZXRhaWxzL2luZGV4LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL2RpYWdub3Npcy9jb21tb25zL2xhYlByb2ZpbGVDYXJkL0xhYlByb2ZpbGVDYXJkLmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL2RpYWdub3Npcy9jb21tb25zL2xhYlByb2ZpbGVDYXJkL2luZGV4LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL2RpYWdub3Npcy9jb21tb25zL2xhYlRlc3RzL2luZGV4LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL2RpYWdub3Npcy9jb21tb25zL2xhYlRlc3RzL2xhYlRlc3RzLmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL2RpYWdub3Npcy9jb21tb25zL29yZGVyRGV0YWlscy9PcmRlckRldGFpbHMuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvZGlhZ25vc2lzL2NvbW1vbnMvb3JkZXJEZXRhaWxzL2luZGV4LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL2RpYWdub3Npcy9sYWIvTGFiVmlldy5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9kaWFnbm9zaXMvbGFiL2luZGV4LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL2RpYWdub3Npcy9wYXRpZW50RGV0YWlscy9QYXRpZW50RGV0YWlsc1ZpZXcuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvZGlhZ25vc2lzL3BhdGllbnREZXRhaWxzL2FkZHJlc3NGb3JtL0FkZHJlc3NGb3JtLmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL2RpYWdub3Npcy9wYXRpZW50RGV0YWlscy9hZGRyZXNzRm9ybS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9kaWFnbm9zaXMvcGF0aWVudERldGFpbHMvZGV0YWlsc0Zvcm0vRGV0YWlsc0Zvcm0uanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvZGlhZ25vc2lzL3BhdGllbnREZXRhaWxzL2RldGFpbHNGb3JtL2luZGV4LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL2RpYWdub3Npcy9wYXRpZW50RGV0YWlscy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9kaWFnbm9zaXMvc2VhcmNoQ3JpdGVyaWEvU2VhcmNoQ3JpdGVyaWFWaWV3LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL2RpYWdub3Npcy9zZWFyY2hDcml0ZXJpYS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9kaWFnbm9zaXMvc2VhcmNoUmVzdWx0cy9TZWFyY2hSZXN1bHRzVmlldy5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9kaWFnbm9zaXMvc2VhcmNoUmVzdWx0cy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9kaWFnbm9zaXMvc2VhcmNoUmVzdWx0cy9sYWJzTGlzdC9MYWJzTGlzdC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9kaWFnbm9zaXMvc2VhcmNoUmVzdWx0cy9sYWJzTGlzdC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9kaWFnbm9zaXMvc2VhcmNoUmVzdWx0cy90b3BCYXIvVG9wQmFyLmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL2RpYWdub3Npcy9zZWFyY2hSZXN1bHRzL3RvcEJhci9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9kaWFnbm9zaXMvdGVzdFNlbGVjdG9yL1Rlc3RTZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9kaWFnbm9zaXMvdGVzdFNlbGVjdG9yL2luZGV4LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL29wZC9hcHBvaW50bWVudFNsb3QvQXBwb2ludG1lbnRTbG90LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL29wZC9hcHBvaW50bWVudFNsb3QvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvb3BkL2Jvb2tpbmcvQm9va2luZ1ZpZXcuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvb3BkL2NsaW5pY0xpc3QvQ2xpbmljTGlzdFZpZXcuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvb3BkL2NsaW5pY0xpc3QvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvb3BkL2NvbW1vbnMvY2xpbmljU2VsZWN0b3IvQ2xpbmljU2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvb3BkL2NvbW1vbnMvY2xpbmljU2VsZWN0b3IvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvb3BkL2NvbW1vbnMvZG9jdG9yUHJvZmlsZUNhcmQvRG9jdG9yUHJvZmlsZUNhcmQuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvb3BkL2NvbW1vbnMvZG9jdG9yUHJvZmlsZUNhcmQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvb3BkL2NvbW1vbnMvc2VsZWN0ZWRDbGluaWMvU2VsZWN0ZWRDbGluaWMuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvb3BkL2NvbW1vbnMvc2VsZWN0ZWRDbGluaWMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvb3BkL2NyaXRlcmlhU2VhcmNoL0NyaXRlcmlhU2VhcmNoVmlldy5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9vcGQvY3JpdGVyaWFTZWFyY2gvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvb3BkL2RvY3RvclByb2ZpbGUvRG9jdG9yUHJvZmlsZVZpZXcuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvb3BkL2RvY3RvclByb2ZpbGUvYWJvdXREb2N0b3IvQWJvdXREb2N0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvb3BkL2RvY3RvclByb2ZpbGUvYWJvdXREb2N0b3IvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvb3BkL2RvY3RvclByb2ZpbGUvZG9jdG9yUHJvZmlsZUNhcmQvRG9jdG9yUHJvZmlsZUNhcmQuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvb3BkL2RvY3RvclByb2ZpbGUvZG9jdG9yUHJvZmlsZUNhcmQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvb3BkL2RvY3RvclByb2ZpbGUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvb3BkL2RvY3RvclByb2ZpbGUvcHJvZmVzc2lvbmFsR3JhcGgvUHJvZmVzc2lvbmFsR3JhcGguanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvb3BkL2RvY3RvclByb2ZpbGUvcHJvZmVzc2lvbmFsR3JhcGgvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvb3BkL2xvY2F0aW9uU2VhcmNoL0xvY2F0aW9uU2VhcmNoLmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL29wZC9sb2NhdGlvblNlYXJjaC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9vcGQvcGF0aWVudERldGFpbHMvUGF0aWVudERldGFpbHMuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvb3BkL3BhdGllbnREZXRhaWxzL2RldGFpbHNGb3JtL0RldGFpbHNGb3JtLmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL29wZC9wYXRpZW50RGV0YWlscy9kZXRhaWxzRm9ybS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9vcGQvcGF0aWVudERldGFpbHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvb3BkL3BheW1lbnQvUGF5bWVudFZpZXcuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvb3BkL3NlYXJjaENyaXRlcmlhL1NlYXJjaENyaXRlcmlhVmlldy5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9vcGQvc2VhcmNoQ3JpdGVyaWEvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvb3BkL3NlYXJjaFJlc3VsdHMvU2VhcmNoUmVzdWx0c1ZpZXcuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvb3BkL3NlYXJjaFJlc3VsdHMvZG9jdG9yc0xpc3QvRG9jdG9yc0xpc3QuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvb3BkL3NlYXJjaFJlc3VsdHMvZG9jdG9yc0xpc3QvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvb3BkL3NlYXJjaFJlc3VsdHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvb3BkL3NlYXJjaFJlc3VsdHMvdG9wQmFyL1RvcEJhci5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9vcGQvc2VhcmNoUmVzdWx0cy90b3BCYXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvb3BkL3NlYXJjaFJlc3VsdHNGaWx0ZXIvU2VhcmNoUmVzdWx0c0ZpbHRlci5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9vcGQvc2VhcmNoUmVzdWx0c0ZpbHRlci9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29uc3RhbnRzL3R5cGVzLmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb250YWluZXJzL2NvbW1vbnMvQ2hhdC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29udGFpbmVycy9jb21tb25zL0hvbWUuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbnRhaW5lcnMvY29tbW9ucy9Vc2VyQXBwb2ludG1lbnRzLmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb250YWluZXJzL2NvbW1vbnMvVXNlckxvZ2luLmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb250YWluZXJzL2NvbW1vbnMvVXNlclByb2ZpbGUuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbnRhaW5lcnMvY29tbW9ucy9Vc2VyUmVwb3J0cy5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29udGFpbmVycy9jb21tb25zL1VzZXJTaWdudXAuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbnRhaW5lcnMvZGlhZ25vc2lzL0Jvb2tpbmdTdW1tYXJ5LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb250YWluZXJzL2RpYWdub3Npcy9MYWIuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbnRhaW5lcnMvZGlhZ25vc2lzL1BhdGllbnREZXRhaWxzLmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb250YWluZXJzL2RpYWdub3Npcy9TZWFyY2hDcml0ZXJpYS5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29udGFpbmVycy9kaWFnbm9zaXMvU2VhcmNoUmVzdWx0cy5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29udGFpbmVycy9kaWFnbm9zaXMvVGVzdFNlbGVjdG9yLmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb250YWluZXJzL29wZC9BcHBvaW50bWVudFNsb3QuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbnRhaW5lcnMvb3BkL0Jvb2tpbmcuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbnRhaW5lcnMvb3BkL0NsaW5pY0xpc3QuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbnRhaW5lcnMvb3BkL0NyaXRlcmlhU2VhcmNoLmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb250YWluZXJzL29wZC9Eb2N0b3JQcm9maWxlLmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb250YWluZXJzL29wZC9Mb2NhdGlvblNlYXJjaC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29udGFpbmVycy9vcGQvUGF0aWVudERldGFpbHMuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbnRhaW5lcnMvb3BkL1BheW1lbnQuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbnRhaW5lcnMvb3BkL1NlYXJjaENyaXRlcmlhLmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb250YWluZXJzL29wZC9TZWFyY2hSZXN1bHRzLmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb250YWluZXJzL29wZC9TZWFyY2hSZXN1bHRzRmlsdGVyLmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9oZWxwZXJzL25hdmlnYXRlL2luZGV4LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9oZWxwZXJzL25hdmlnYXRlL25hdmlnYXRlLmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9oZWxwZXJzL3N0b3JhZ2UvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2hlbHBlcnMvc3RvcmFnZS9zdG9yYWdlLmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9yZWR1Y2Vycy9jb21tb25zL2F1dGguanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL3JlZHVjZXJzL2NvbW1vbnMvdXNlci5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvcmVkdWNlcnMvZGlhZ25vc2lzL2xhYnMuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL3JlZHVjZXJzL2RpYWdub3Npcy9sYWJzU2VhcmNoLmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9yZWR1Y2Vycy9kaWFnbm9zaXMvc2VhcmNoQ3JpdGVyaWEuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL3JlZHVjZXJzL2luZGV4LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9yZWR1Y2Vycy9vcGQvZG9jdG9yU2VhcmNoLmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9yZWR1Y2Vycy9vcGQvZG9jdG9ycy5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvcmVkdWNlcnMvb3BkL3NlYXJjaENyaXRlcmlhLmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9yb3V0ZXMuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL3V0aWxzL2RhdGVUaW1lVXRpbHMuanMiLCJ3ZWJwYWNrOi8vLy4vaW5kZXguanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiYXhpb3NcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJleHByZXNzXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiaHR0cFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIm1hdGVyaWFsLXVpLWljb25zL0FjY291bnRDaXJjbGVcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJtYXRlcmlhbC11aS1pY29ucy9BdHRhY2hNb25leVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIm1hdGVyaWFsLXVpLWljb25zL0NhbGxcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJtYXRlcmlhbC11aS1pY29ucy9FeHBhbmRNb3JlXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibWF0ZXJpYWwtdWktaWNvbnMvS2V5Ym9hcmRBcnJvd1JpZ2h0XCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibWF0ZXJpYWwtdWktaWNvbnMvUGF5bWVudFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIm1hdGVyaWFsLXVpL0NoZWNrYm94XCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibWF0ZXJpYWwtdWkvQ2hpcFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIm1hdGVyaWFsLXVpL0V4cGFuc2lvblBhbmVsXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibWF0ZXJpYWwtdWkvRm9ybVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIm1hdGVyaWFsLXVpL01lbnVcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJtYXRlcmlhbC11aS9Qcm9ncmVzc1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcIm1hdGVyaWFsLXVpL1JhZGlvXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibWF0ZXJpYWwtdWkvU3RlcHBlclwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIm1hdGVyaWFsLXVpL3N0eWxlc1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcInBhdGhcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyYy1zbGlkZXIvbGliL1JhbmdlXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVhY3RcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWFjdC1kb20vc2VydmVyXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVhY3QtanNzL2xpYi9Kc3NQcm92aWRlclwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInJlYWN0LWpzcy9saWIvanNzXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVhY3QtcmVkdXhcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWFjdC1yb3V0ZXJcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWFjdC1yb3V0ZXItZG9tXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVhY3QtdHJhbnNpdGlvbi1ncm91cFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInJlZHV4XCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVkdXgtbG9nZ2VyXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVkdXgtdGh1bmtcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ1bml2ZXJzYWwtY29va2llXCIiXSwibmFtZXMiOlsic2VuZE9UUCIsIm51bWJlciIsImNiIiwiZGlzcGF0Y2giLCJ0eXBlIiwicGF5bG9hZCIsInBob25lTnVtYmVyIiwidGhlbiIsInJlc3BvbnNlIiwiZXhpc3RzIiwiY2F0Y2giLCJlcnJvciIsIm1lc3NhZ2UiLCJlcnJvcl9tZXNzYWdlIiwic3VibWl0T1RQIiwib3RwIiwic2V0QXV0aFRva2VuIiwidG9rZW4iLCJyZWdpc3RlclVzZXIiLCJwb3N0RGF0YSIsImdldFVzZXJQcm9maWxlIiwicHJvZmlsZXMiLCJnZXRVc2VyUHJvZmlsZVdpdGhBcHBvaW50bWVudHMiLCJnZXRVc2VyUHJvZmlsZVdpdGhUZXN0cyIsImdldExhYnMiLCJzZWFyY2hTdGF0ZSIsImZpbHRlckNyaXRlcmlhIiwibWVyZ2VTdGF0ZSIsInRlc3RJZHMiLCJzZWxlY3RlZENyaXRlcmlhcyIsImZpbHRlciIsIngiLCJyZWR1Y2UiLCJmaW5hbFN0ciIsImN1cnIiLCJpIiwiaWQiLCJsYXQiLCJsb25nIiwic2VsZWN0ZWRMb2NhdGlvbiIsImdlb21ldHJ5IiwibG9jYXRpb24iLCJsbmciLCJtaW5fZGlzdGFuY2UiLCJkaXN0YW5jZVJhbmdlIiwibWF4X2Rpc3RhbmNlIiwibWluX3ByaWNlIiwicHJpY2VSYW5nZSIsIm1heF9wcmljZSIsIm9yZGVyX2J5Iiwic29ydEJ5IiwidXJsIiwiZ2V0TGFiQnlJZCIsImxhYklkIiwiZ2V0TGFiVGltZVNsb3RzIiwiY2FsbGJhY2siLCJnZXRMYWJCb29raW5nU3VtbWFyeSIsImJvb2tpbmdJZCIsImxvYWRMYWJDb21tb25Dcml0ZXJpYXMiLCJ0b2dnbGVEaWFnbm9zaXNDcml0ZXJpYSIsImNyaXRlcmlhIiwiZ2V0RGlhZ25vc2lzQ3JpdGVyaWFSZXN1bHRzIiwic2VhcmNoU3RyaW5nIiwiU0VBUkNIX0NSSVRFUklBX09QRCIsIlNFQVJDSF9DUklURVJJQV9MQUJTIiwiRE9DVE9SU19BQ1RJT05TIiwiTEFCU19BQ1RJT05TIiwiVVNFUl9BQ1RJT05TIiwiQVVUSF9BQ1RJT05TIiwibW9kdWxlIiwiZXhwb3J0cyIsIk9iamVjdCIsImFzc2lnbiIsImdldERvY3RvcnMiLCJzcGVjaWFsaXphdGlvbl9pZHMiLCJzaXRzX2F0Iiwiam9pbiIsIm1pbl9mZWVzIiwibWF4X2ZlZXMiLCJzb3J0X29uIiwiaXNfYXZhaWxhYmxlIiwiaXNfZmVtYWxlIiwiZ2V0RG9jdG9yQnlJZCIsImRvY3RvcklkIiwiZ2V0VGltZVNsb3RzIiwiY2xpbmljSWQiLCJsb2FkT1BEQ29tbW9uQ3JpdGVyaWEiLCJ0b2dnbGVPUERDcml0ZXJpYSIsInNlbGVjdExvY2F0aW9uIiwiZ2V0T1BEQ3JpdGVyaWFSZXN1bHRzIiwiYXhpb3NJbnN0YW5jZSIsImNyZWF0ZSIsImJhc2VVUkwiLCJoZWFkZXIiLCJyZWplY3RIYW5kbGVyIiwiY29uc29sZSIsImxvZyIsIkFQSV9HRVQiLCJnZXRBdXRoVG9rZW4iLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsIm1ldGhvZCIsInJlcyIsImRhdGEiLCJBUElfUE9TVCIsImhlYWRlcnMiLCJBUElfUFVUIiwiQVBJX0RFTEVURSIsIkhvbWVWaWV3IiwiQ29tcG9uZW50IiwiY29uc3RydWN0b3IiLCJwcm9wcyIsIm5hdmlnYXRlVG8iLCJ3aGVyZSIsImhpc3RvcnkiLCJwdXNoIiwicmVuZGVyIiwiYmluZCIsIkxvYWRlciIsIlVzZXJMb2dpblZpZXciLCJzdGF0ZSIsInZhbGlkYXRpb25FcnJvciIsInNob3dPVFAiLCJpbnB1dEhhbmRsZXIiLCJlIiwic2V0U3RhdGUiLCJ0YXJnZXQiLCJuYW1lIiwidmFsdWUiLCJzdWJtaXRPVFBSZXF1ZXN0IiwibWF0Y2giLCJyZXBsYWNlIiwib3RwX3JlcXVlc3Rfc2VudCIsIklmcmFtU3R5bGUiLCJ3aWR0aCIsImhlaWdodCIsIkNoYXRWaWV3IiwiY29udGV4dFR5cGVzIiwicm91dGVyIiwiQ29tbW9ubHlTZWFyY2hlZCIsInJvd3MiLCJtYXAiLCJyb3ciLCJzZWxlY3RlZCIsInRvZ2dsZSIsImRpdkNsYXNzIiwidWxDbGFzcyIsImhlYWRpbmciLCJkZWJvdW5jZXIiLCJmbiIsImRlbGF5IiwidGltZXIiLCJjbGVhclRpbWVvdXQiLCJzZXRUaW1lb3V0IiwiY2FsbCIsIkNyaXRlcmlhU2VhcmNoVmlldyIsInNlYXJjaFZhbHVlIiwic2VhcmNoUmVzdWx0cyIsImNvbXBvbmVudERpZE1vdW50IiwiZ2V0U2VhcmNoUmVzdWx0cyIsImlucHV0IiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsInRlc3RzIiwiYWRkQ3JpdGVyaWEiLCJmb3JtYXR0ZWRfYWRkcmVzcyIsInNsaWNlIiwiZ28iLCJ0aXRsZSIsImNoZWNrRm9yTG9hZCIsImNoaWxkcmVuIiwiUHJvZmlsZVNsaWRlciIsInN3aXRjaFVzZXIiLCJwcm9maWxlSWQiLCJjb250ZXh0Iiwic3ViUm91dGUiLCJrZXlzIiwic3JjIiwicHJvZmlsZUltYWdlIiwiREFZU19UT19TSE9XIiwiV0VFS19EQVlTIiwiTU9OVEhTIiwiVGltZVNsb3RTZWxlY3RvciIsInRpbWVTZXJpZXMiLCJzZWxlY3RlZE1vbnRoIiwic2VsZWN0ZWREYXkiLCJnZW5lcmF0ZURheXMiLCJkYXlzIiwib2Zmc2V0RGF5IiwiRGF0ZSIsInNldERhdGUiLCJnZXREYXRlIiwid2Vla0RheSIsImdldERheSIsInRhZyIsImRhdGVOdW1iZXIiLCJhY3R1YWxEYXRlIiwibW9udGgiLCJnZXRNb250aCIsInNlbGVjdERheSIsImRheSIsInNlbGVjdE1vbnRoIiwic3RvcFByb3BhZ2F0aW9uIiwic2VsZWN0ZWRTY2hlZHVsZSIsIndlZWtEYXlOdW1iZXIiLCJ0aW1lU2xvdHMiLCJ0aW1pbmciLCJ0aGlzTW9udGgiLCJuZXh0TW9udGgiLCJ0cyIsInRpbWUiLCJVc2VyQXBwb2ludG1lbnRzVmlldyIsImNvbXBhcmVEYXRlV2l0aFRvZGF5IiwiZGF0ZSIsInRvZGF5IiwiZ2V0VGltZSIsInNlbGVjdGVkVXNlciIsInVzZXJQcm9maWxlSWQiLCJwYXJhbXMiLCJVU0VSIiwiaXNEZWZhdWx0VXNlciIsImFwcG9pbnRtZW50cyIsImFwcG9pbnRtZW50Iiwic2xvdCIsInN0YXJ0IiwiaW5kZXgiLCJBcHBvaW50bWVudExpc3QiLCJ1bml4X3RpbWVzdGFtcCIsImhvdXJzIiwiZ2V0SG91cnMiLCJtaW51dGVzIiwiZ2V0TWludXRlcyIsInN1YnN0ciIsImRvY3Rvck5hbWUiLCJlbmQiLCJ0b0RhdGVTdHJpbmciLCJVc2VyUHJvZmlsZVZpZXciLCJQcm9maWxlRGF0YSIsIm9wZW5BcHBvaW50bWVudHMiLCJvcGVuUmVwb3J0cyIsImdlbmRlciIsImFnZSIsIm1vYmlsZSIsIm1lZGljYWxIaXN0b3J5Q291bnQiLCJtZWRpY2FsVGVzdENvdW50Iiwib25saW5lQ29uc3VsdGF0aW9uQ291bnQiLCJvcGRWaXNpdENvdW50IiwicHJvZmlsZURhdGEiLCJVc2VyUmVwb3J0c1ZpZXciLCJ0ZXN0IiwiUmVwb3J0TGlzdCIsInN1Yl9uYW1lIiwiYWJicmV2aWF0aW9uIiwiY2F0ZWdvcnkiLCJzdGVwcGVyU3R5bGUiLCJwYWRkaW5nIiwicGFkZGluZ0JvdHRvbSIsInBhZGRpbmdUb3AiLCJVc2VyU2lnbnVwVmlldyIsImVtYWlsIiwicGhvbmVfbnVtYmVyIiwic3VibWl0Rm9ybSIsInJlZ2lzdGVyIiwicmVmcyIsImZvckVhY2giLCJwcnAiLCJzdHlsZSIsImJvcmRlciIsIkJvb2tpbmdTdW1tYXJ5VmlldyIsInNlbGVjdGVkTGFiIiwicGlja3VwVHlwZSIsIm9wZW5UZXN0cyIsImhhbmRsZVBpY2t1cFR5cGUiLCJnZXRTZWxlY3RvcnMiLCJmaW5hbFByaWNlIiwibGFiRGV0YWlsIiwiTEFCUyIsImxhYiIsInByaWNlIiwidHdwIiwidGVzdF9pZCIsIm1ycCIsImFkZHJlc3MiLCJDaG9vc2VQYXRpZW50IiwiUGlja3VwQWRkcmVzcyIsIlZpc2l0VGltZSIsIkxhYkRldGFpbHMiLCJMYWJQcm9maWxlQ2FyZCIsIm9wZW5MYWIiLCJkZXRhaWxzIiwiTGFiVGVzdHMiLCJsZW5ndGgiLCJPcmRlckRldGFpbHMiLCJwcmljZV9icmVha3VwIiwidG90YWxQcmljZSIsInRvdGFsVGVzdHMiLCJicmVha3VwIiwiYW1vdW50IiwiTGFiVmlldyIsImJvb2tMYWIiLCJQYXRpZW50RGV0YWlsc1ZpZXciLCJzZWxlY3RlZFRlc3RzIiwic2VsZWN0ZWRTbG90Iiwic2VsZWN0ZWRTbG90U3RhcnQiLCJzZWxlY3RlZFNsb3RFbmQiLCJnZXRMb2NhdGlvblBhcmFtIiwicGFyYW1TdHJpbmciLCJzZWFyY2giLCJVUkxTZWFyY2hQYXJhbXMiLCJnZXQiLCJwcm9jZWVkIiwicGFyc2VGbG9hdCIsInRvU3RyaW5nIiwiQWRkcmVzc0Zvcm0iLCJsb2NhbGl0eSIsImxhbmRtYXJrIiwicGluY29kZSIsImNpdHkiLCJ3aGljaCIsIkRldGFpbHNGb3JtIiwicGF0aWVudE5hbWUiLCJwYXRpZW50RW1haWwiLCJwYXRpZW50R2VuZGVyIiwicGF0aWVudE1vYmlsZSIsIlNlYXJjaENyaXRlcmlhVmlldyIsInNlYXJjaFByb2NlZWQiLCJzZWFyY2hEYXRhIiwiZW5jb2RlVVJJQ29tcG9uZW50IiwiSlNPTiIsInN0cmluZ2lmeSIsImZpbHRlckRhdGEiLCJMT0FERURfU0VBUkNIX0NSSVRFUklBX0xBQiIsImNvbW1vbl90ZXN0cyIsImNvbW1vbl9jb25kaXRpb25zIiwicHJlZmVycmVkX2xhYnMiLCJTZWFyY2hSZXN1bHRzVmlldyIsInBhcnNlIiwiZ2V0TGFiTGlzdCIsImFwcGx5RmlsdGVycyIsImZpbHRlclN0YXRlIiwiTE9BREVEX0xBQlNfU0VBUkNIIiwiTGFic0xpc3QiLCJsYWJMaXN0IiwiVG9wQmFyIiwiYW5jaG9yRWwiLCJvcGVuRmlsdGVyIiwiY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyIsImhhbmRsZU9wZW4iLCJldmVudCIsImN1cnJlbnRUYXJnZXQiLCJoYW5kbGVDbG9zZSIsInRvZ2dsZUZpbHRlciIsImhhbmRsZVJhbmdlIiwicmFuZ2UiLCJnZXRDcml0ZXJpYVN0cmluZyIsImZpbmFsIiwiY3JpdGVyaWFTdHIiLCJCb29sZWFuIiwicHJldmVudERlZmF1bHQiLCJUZXN0U2VsZWN0b3JWaWV3IiwidG9nZ2xlVGVzdCIsImxhYkRhdGEiLCJpbmRleE9mIiwiQXBwb2ludG1lbnRTbG90Iiwic2VsZWN0ZWREb2N0b3IiLCJzZWxlY3RlZENsaW5pYyIsInNlbGVjdFRpbWVTbG90IiwiRE9DVE9SUyIsIkJvb2tpbmdWaWV3IiwiQ2xpbmljTGlzdFZpZXciLCJDbGluaWNTZWxlY3RvciIsInNlbGVjdENsaW5pYyIsImhvc3BpdGFscyIsImhvc3BpdGFsIiwiaG9zcGl0YWxfbmFtZSIsImZlZXMiLCJ0aW1pbmdzIiwidGltaW5nS2V5Iiwia2V5IiwiaG9zcGl0YWxfaWQiLCJEb2N0b3JQcm9maWxlQ2FyZCIsImNhcmRDbGljayIsImJvb2tOb3ciLCJnZXRRdWFsaWZpY2F0aW9uU3RyIiwicXVhbGlmaWNhdGlvblNwZWNpYWxpemF0aW9uIiwic3RyIiwicXVhbGlmaWNhdGlvbiIsInNwZWNpYWxpemF0aW9uIiwiZXhwZXJpZW5jZV95ZWFycyIsImhvc3BpdGFsX2NvdW50IiwicXVhbGlmaWNhdGlvbnMiLCJkaXNjb3VudGVkX2ZlZXMiLCJTZWxlY3RlZENsaW5pYyIsImhvc3BpdGFsTmFtZSIsImZvY3VzIiwiZ2V0Q3JpdGVyaWFSZXN1bHRzIiwicmVzdWx0IiwidG9nZ2xlQ3JpdGVyaWEiLCJnb0JhY2siLCJyZXN1bHREYXRhIiwiaiIsIkRvY3RvclByb2ZpbGVWaWV3IiwiQWJvdXREb2N0b3IiLCJsZXNzQWJvdXQiLCJyZWFkTW9yZSIsImFib3V0IiwiUHJvZmVzc2lvbmFsR3JhcGgiLCJMb2NhdGlvblNlYXJjaCIsImdldExvY2F0aW9uIiwiYXV0byIsImdvb2dsZSIsIm1hcHMiLCJwbGFjZXMiLCJBdXRvY29tcGxldGVTZXJ2aWNlIiwicmVxdWVzdCIsInR5cGVzIiwiY29tcG9uZW50UmVzdHJpY3Rpb25zIiwiY291bnRyeSIsImdldFBsYWNlUHJlZGljdGlvbnMiLCJyZXN1bHRzIiwic3RhdHVzIiwiTWFwIiwiY2VudGVyIiwiem9vbSIsInNlcnZpY2UiLCJQbGFjZXNTZXJ2aWNlIiwiZ2V0RGV0YWlscyIsInJlZmVyZW5jZSIsInBsYWNlIiwiZGV0ZWN0TG9jYXRpb24iLCJuYXZpZ2F0b3IiLCJnZW9sb2NhdGlvbiIsImdldEN1cnJlbnRQb3NpdGlvbiIsInBvc2l0aW9uIiwibGF0bG5nIiwiY29vcmRzIiwibGF0aXR1ZGUiLCJsb25naXR1ZGUiLCJnZW9jb2RlciIsIkdlb2NvZGVyIiwiZ2VvY29kZSIsImRlc2NyaXB0aW9uIiwiZGlzcGxheSIsIlBhdGllbnREZXRhaWxzIiwiUGF5bWVudFZpZXciLCJMT0FERURfU0VBUkNIX0NSSVRFUklBX09QRCIsImNvbmRpdGlvbnMiLCJzcGVjaWFsaXphdGlvbnMiLCJnZXREY290b3JzIiwiZ2V0RG9jdG9yTGlzdCIsIkxPQURFRF9ET0NUT1JfU0VBUkNIIiwiRG9jdG9yc0xpc3QiLCJkb2N0b3JMaXN0IiwiZG9jSWQiLCJzaXRzX2F0X2NsaW5pYyIsInNpdHNfYXRfaG9zcGl0YWwiLCJoYW5kbGVJbnB1dCIsImV2TmFtZSIsImNoZWNrZWQiLCJTZWFyY2hSZXN1bHRzRmlsdGVyIiwiZmVlXzAiLCJmZWVfMSIsImZlZV8yIiwiZmVlXzMiLCJjbGluaWNfcGVyc29uYWwiLCJjbGluaWNfaG9zcGl0YWwiLCJjbGluaWNfbXVsdGkiLCJhdmFpbGFibGVfdG9kYXkiLCJkaXN0YW5jZSIsImFwcGx5RmlsdGVyIiwic2V0T1BERmlsdGVycyIsImhhbmRsZUNoZWNrYm94IiwiaGFuZGxlQ2hhbmdlUmFkaW8iLCJTRU5EX09UUF9SRVFVRVNUIiwiU0VORF9PVFBfU1VDQ0VTUyIsIlNFTkRfT1RQX0ZBSUwiLCJTVUJNSVRfT1RQX1JFUVVFU1QiLCJTVUJNSVRfT1RQX1NVQ0NFU1MiLCJTVUJNSVRfT1RQX0ZBSUwiLCJBUFBFTkRfRE9DVE9SUyIsIkRPQ1RPUl9TRUFSQ0giLCJET0NUT1JfU0VBUkNIX1NUQVJUIiwiU0VMRUNUX0xPQ0FUSU9OX09QRCIsIk1FUkdFX1NFQVJDSF9TVEFURV9PUEQiLCJUT0dHTEVfT1BEX0NSSVRFUklBIiwiU0VUX09QRF9GSUxURVJTIiwiTE9BRF9TRUFSQ0hfQ1JJVEVSSUFfT1BEIiwiVE9HR0xFX0RJQUdOT1NJU19DUklURVJJQSIsIk1FUkdFX1NFQVJDSF9TVEFURV9MQUIiLCJMT0FEX1NFQVJDSF9DUklURVJJQV9MQUIiLCJBUFBFTkRfTEFCUyIsIkxBQl9TRUFSQ0giLCJTRUxFQ1RfTE9DQVRJT05fRElBR05PU0lTIiwiQVBQRU5EX0ZJTFRFUlNfRElBR05PU0lTIiwiTEFCX1NFQVJDSF9TVEFSVCIsIkFQUEVORF9VU0VSX1BST0ZJTEVTIiwiQ2hhdCIsIm1hcFN0YXRlVG9Qcm9wcyIsIm1hcERpc3BhdGNoVG9Qcm9wcyIsIkhvbWUiLCJBVVRIIiwiVXNlckFwcG9pbnRtZW50cyIsIlVzZXJMb2dpbiIsInN1Y2Nlc3NfbWVzc2FnZSIsIm90cF9yZXF1ZXN0X3N1Y2Nlc3MiLCJvdHBfcmVxdWVzdF9mYWlsIiwiVXNlclByb2ZpbGUiLCJVc2VyUmVwb3J0cyIsIlVzZXJTaWdudXAiLCJzdWJtaXRfb3RwIiwic3VibWl0X290cF9zdWNjZXNzIiwic3VibWl0X290cF9mYWlsIiwiQm9va2luZ1N1bW1hcnkiLCJMYWIiLCJsb2FkRGF0YSIsInN0b3JlIiwiU2VhcmNoQ3JpdGVyaWEiLCJTZWFyY2hSZXN1bHRzIiwiVGVzdFNlbGVjdG9yIiwiQm9va2luZyIsIkNsaW5pY0xpc3QiLCJDcml0ZXJpYVNlYXJjaCIsIkRvY3RvclByb2ZpbGUiLCJQYXltZW50IiwiTkFWSUdBVEUiLCJ3aW5kb3ciLCJocmVmIiwicmVmcmVzaEFwcG9pbnRtZW50U3RhdGUiLCJub0FwcG9pbnRtZW50Rm91bmQiLCJ1cGNvbWluZyIsInByZXZpb3VzIiwiYWN0aW9uIiwiY29va2llcyIsIlNUT1JBR0UiLCJzZXQiLCJjaGVja0F1dGgiLCJkZWxldGVBdXRoIiwicmVtb3ZlIiwiZGVmYXVsdFN0YXRlIiwibmV3U3RhdGUiLCJwcm9maWxlTWFwIiwicHJvZmlsZSIsImxhcE1hcCIsImNvbmNhdCIsImZvdW5kIiwiYWxsUmVkdWNlcnMiLCJkb2MiLCJkb2N0b3JNYXAiLCJkb2N0b3IiLCJyb3V0ZXMiLCJwYXRoIiwiZXhhY3QiLCJjb21wb25lbnQiLCJSb3V0ZXJDb25maWciLCJwYXRobmFtZSIsImVudGVyIiwiZXhpdCIsInJvdXRlIiwiUk9VVEVTIiwidGltZVN0YW1wIiwiZ2V0RGF5TmFtZSIsInByb2Nlc3MiLCJlbnYiLCJOT0RFX1RMU19SRUpFQ1RfVU5BVVRIT1JJWkVEIiwicmVxdWlyZSIsImh0dHAiLCJFeHByZXNzIiwiYXBwIiwic2VydmVyIiwiU2VydmVyIiwidXNlIiwic3RhdGljIiwiX19kaXJuYW1lIiwicmVxIiwic2hlZXRzUmVnaXN0cnkiLCJ0aGVtZSIsInBhbGV0dGUiLCJwcmltYXJ5IiwibWFpbiIsInNlY29uZGFyeSIsImRhbmdlciIsImdlbmVyYXRlQ2xhc3NOYW1lIiwid3JpdGVIZWFkIiwiTG9jYXRpb24iLCJwcm9taXNlcyIsInNvbWUiLCJhbGwiLCJzdG9yZURhdGEiLCJnZXRTdGF0ZSIsImh0bWwiLCJyZW5kZXJUb1N0cmluZyIsImNzcyIsInNlbmRGaWxlIiwicm9vdCIsImxpc3RlbiIsImVyciIsImluZm8iXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FB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Ozs7Ozs7O0FDQUEsZ0Q7Ozs7Ozs7Ozs7O0FDQUEsK0M7Ozs7Ozs7Ozs7O0FDQUEsaUM7Ozs7Ozs7Ozs7O0FDQUEsZ0Q7Ozs7Ozs7Ozs7O0FDQUEsa0M7Ozs7Ozs7Ozs7O0FDQUEsNkM7Ozs7Ozs7Ozs7O0FDQUEsc0Q7Ozs7Ozs7Ozs7O0FDQUEsOEM7Ozs7Ozs7Ozs7O0FDQUEsd0M7Ozs7Ozs7Ozs7O0FDQUEseUM7Ozs7Ozs7Ozs7O0FDQUEsNkM7Ozs7Ozs7Ozs7O0FDQUEsbUQ7Ozs7Ozs7Ozs7O0FDQUEsa0M7Ozs7Ozs7Ozs7O0FDQUEseUM7Ozs7Ozs7Ozs7O0FDQUEsd0M7Ozs7Ozs7Ozs7O0FDQUEsNkMiLCJmaWxlIjoic2VydmVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyB3YXNtIG1vZHVsZXNcbiBcdHZhciBpbnN0YWxsZWRXYXNtTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvXCI7XG5cbiBcdC8vIG9iamVjdCB3aXRoIGFsbCBjb21waWxlZCBXZWJBc3NlbWJseS5Nb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLncgPSB7fTtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9pbmRleC5qc1wiKTtcbiIsImltcG9ydCB7IFNFTkRfT1RQX1JFUVVFU1QsIFNFTkRfT1RQX1NVQ0NFU1MsIFNFTkRfT1RQX0ZBSUwsIFNVQk1JVF9PVFBfUkVRVUVTVCwgU1VCTUlUX09UUF9TVUNDRVNTLCBTVUJNSVRfT1RQX0ZBSUwgfSBmcm9tICcuLi8uLi9jb25zdGFudHMvdHlwZXMnO1xuaW1wb3J0IHsgQVBJX0dFVCwgQVBJX1BPU1QgfSBmcm9tICcuLi8uLi9hcGkvYXBpLmpzJztcbmltcG9ydCBTVE9SQUdFIGZyb20gJy4uLy4uL2hlbHBlcnMvc3RvcmFnZSdcblxuZXhwb3J0IGNvbnN0IHNlbmRPVFAgPSAobnVtYmVyLCBjYikgPT4gKGRpc3BhdGNoKSA9PiB7XG4gICAgZGlzcGF0Y2goe1xuICAgICAgICB0eXBlOiBTRU5EX09UUF9SRVFVRVNULFxuICAgICAgICBwYXlsb2FkOiB7XG4gICAgICAgICAgICBwaG9uZU51bWJlcjogbnVtYmVyXG4gICAgICAgIH1cbiAgICB9KVxuXG4gICAgQVBJX1BPU1QoJy9hcGkvdjEvdXNlci9vdHAvZ2VuZXJhdGUnLCB7XG4gICAgICAgIFwicGhvbmVfbnVtYmVyXCI6IG51bWJlclxuICAgIH0pLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgIGRpc3BhdGNoKHtcbiAgICAgICAgICAgIHR5cGU6IFNFTkRfT1RQX1NVQ0NFU1MsXG4gICAgICAgICAgICBwYXlsb2FkOiB7fVxuICAgICAgICB9KVxuICAgICAgICBpZiAoY2IpIGNiKHJlc3BvbnNlLmV4aXN0cyk7XG4gICAgfSkuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICAgIGxldCBtZXNzYWdlID0gXCJDYW5ub3QgZ2VuZXJhdGUgT1RQLlwiXG4gICAgICAgIGRpc3BhdGNoKHtcbiAgICAgICAgICAgIHR5cGU6IFNFTkRfT1RQX0ZBSUwsXG4gICAgICAgICAgICBwYXlsb2FkOiB7XG4gICAgICAgICAgICAgICAgZXJyb3JfbWVzc2FnZTogbWVzc2FnZVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH0pXG5cbn1cblxuZXhwb3J0IGNvbnN0IHN1Ym1pdE9UUCA9IChudW1iZXIsIG90cCwgY2IpID0+IChkaXNwYXRjaCkgPT4ge1xuICAgIGRpc3BhdGNoKHtcbiAgICAgICAgdHlwZTogU1VCTUlUX09UUF9SRVFVRVNULFxuICAgICAgICBwYXlsb2FkOiB7fVxuICAgIH0pXG5cbiAgICBBUElfUE9TVCgnL2FwaS92MS91c2VyL2xvZ2luJywge1xuICAgICAgICBcInBob25lX251bWJlclwiOiBudW1iZXIsXG4gICAgICAgIFwib3RwXCI6IG90cFxuICAgIH0pLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgIC8vIHNldCBjb29raWUgdG9rZW4gZXhwbGljaXRseSwgY3NyZiB0b2tlbiBpcyBzZXQgYnkgZGVmYXVsdFxuICAgICAgICBTVE9SQUdFLnNldEF1dGhUb2tlbihyZXNwb25zZS50b2tlbilcblxuICAgICAgICBkaXNwYXRjaCh7XG4gICAgICAgICAgICB0eXBlOiBTVUJNSVRfT1RQX1NVQ0NFU1MsXG4gICAgICAgICAgICBwYXlsb2FkOiB7IHRva2VuOiByZXNwb25zZS50b2tlbiB9XG4gICAgICAgIH0pXG4gICAgICAgIGlmIChjYikgY2IoKTtcbiAgICB9KS5jYXRjaChmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgICAgZGlzcGF0Y2goe1xuICAgICAgICAgICAgdHlwZTogU1VCTUlUX09UUF9GQUlMLFxuICAgICAgICAgICAgcGF5bG9hZDoge1xuICAgICAgICAgICAgICAgIGVycm9yX21lc3NhZ2U6IFwiSW52YWxpZCBPVFBcIlxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH0pXG59XG5cbmV4cG9ydCBjb25zdCByZWdpc3RlclVzZXIgPSAocG9zdERhdGEsIGNiKSA9PiAoZGlzcGF0Y2gpID0+IHtcbiAgICBkaXNwYXRjaCh7XG4gICAgICAgIHR5cGU6IFNVQk1JVF9PVFBfUkVRVUVTVCxcbiAgICAgICAgcGF5bG9hZDoge31cbiAgICB9KVxuXG4gICAgQVBJX1BPU1QoJy9hcGkvdjEvdXNlci9yZWdpc3RlcicsIHBvc3REYXRhKS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAvLyBzZXQgY29va2llIHRva2VuIGV4cGxpY2l0bHksIGNzcmYgdG9rZW4gaXMgc2V0IGJ5IGRlZmF1bHRcbiAgICAgICAgLy8gU1RPUkFHRS5zZXRBdXRoVG9rZW4ocmVzcG9uc2UudG9rZW4pXG4gICAgICAgIGRlYnVnZ2VyXG4gICAgICAgIGRpc3BhdGNoKHtcbiAgICAgICAgICAgIHR5cGU6IFNVQk1JVF9PVFBfU1VDQ0VTUyxcbiAgICAgICAgICAgIHBheWxvYWQ6IHsgdG9rZW46IHJlc3BvbnNlLnRva2VuIH1cbiAgICAgICAgfSlcbiAgICAgICAgaWYgKGNiKSBjYihyZXNwb25zZSk7XG4gICAgfSkuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICAgIGRpc3BhdGNoKHtcbiAgICAgICAgICAgIHR5cGU6IFNVQk1JVF9PVFBfRkFJTCxcbiAgICAgICAgICAgIHBheWxvYWQ6IHtcbiAgICAgICAgICAgICAgICBlcnJvcl9tZXNzYWdlOiBcIkludmFsaWQgT1RQXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9KVxufVxuIiwiaW1wb3J0IHsgQVBQRU5EX1VTRVJfUFJPRklMRVMgfSBmcm9tICcuLi8uLi9jb25zdGFudHMvdHlwZXMnO1xuaW1wb3J0IHsgQVBJX0dFVCB9IGZyb20gJy4uLy4uL2FwaS9hcGkuanMnO1xuXG5cbmV4cG9ydCBjb25zdCBnZXRVc2VyUHJvZmlsZSA9ICgpID0+IChkaXNwYXRjaCkgPT4ge1xuXHRBUElfR0VUKCcvdXNlci5qc29uJykudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcblx0XHRcblx0XHRkaXNwYXRjaCh7XG5cdFx0XHR0eXBlOiBBUFBFTkRfVVNFUl9QUk9GSUxFUyxcblx0XHRcdHBheWxvYWQ6IHJlc3BvbnNlLnByb2ZpbGVzXG5cdFx0fSlcblxuXHR9KS5jYXRjaChmdW5jdGlvbiAoZXJyb3IpIHtcblxuXHR9KVxufVxuXG5leHBvcnQgY29uc3QgZ2V0VXNlclByb2ZpbGVXaXRoQXBwb2ludG1lbnRzID0gKCkgPT4gKGRpc3BhdGNoKSA9PiB7XG5cdEFQSV9HRVQoJy91c2VyX3Byb2ZpbGVfYXBwb2ludG1lbnRzLmpzb24nKS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuXHRcdFxuXHRcdGRpc3BhdGNoKHtcblx0XHRcdHR5cGU6IEFQUEVORF9VU0VSX1BST0ZJTEVTLFxuXHRcdFx0cGF5bG9hZDogcmVzcG9uc2UucHJvZmlsZXNcblx0XHR9KVxuXG5cdH0pLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xuXG5cdH0pXG59XG5cbmV4cG9ydCBjb25zdCBnZXRVc2VyUHJvZmlsZVdpdGhUZXN0cyA9ICgpID0+IChkaXNwYXRjaCkgPT4ge1xuXHRBUElfR0VUKCcvdXNlcl9wcm9maWxlX3Rlc3RzLmpzb24nKS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuXHRcdFxuXHRcdGRpc3BhdGNoKHtcblx0XHRcdHR5cGU6IEFQUEVORF9VU0VSX1BST0ZJTEVTLFxuXHRcdFx0cGF5bG9hZDogcmVzcG9uc2UucHJvZmlsZXNcblx0XHR9KVxuXG5cdH0pLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xuXG5cdH0pXG59XG5cbiIsImltcG9ydCB7IExBQl9TRUFSQ0hfU1RBUlQsIEFQUEVORF9MQUJTLCBMQUJfU0VBUkNILCBNRVJHRV9TRUFSQ0hfU1RBVEVfTEFCIH0gZnJvbSAnLi4vLi4vY29uc3RhbnRzL3R5cGVzJztcbmltcG9ydCB7IEFQSV9HRVQgfSBmcm9tICcuLi8uLi9hcGkvYXBpLmpzJztcblxuXG5leHBvcnQgY29uc3QgZ2V0TGFicyA9IChzZWFyY2hTdGF0ZSA9IHt9LCBmaWx0ZXJDcml0ZXJpYSA9IHt9LCBtZXJnZVN0YXRlID0gZmFsc2UpID0+IChkaXNwYXRjaCkgPT4ge1xuXG5cdGxldCB0ZXN0SWRzID0gc2VhcmNoU3RhdGUuc2VsZWN0ZWRDcml0ZXJpYXNcblx0XHQuZmlsdGVyKHggPT4geC50eXBlID09ICd0ZXN0Jylcblx0XHQucmVkdWNlKChmaW5hbFN0ciwgY3VyciwgaSkgPT4ge1xuXHRcdFx0aWYgKGkgIT0gMCkge1xuXHRcdFx0XHRmaW5hbFN0ciArPSAnLCdcblx0XHRcdH1cblx0XHRcdGZpbmFsU3RyICs9IGAke2N1cnIuaWR9YFxuXHRcdFx0cmV0dXJuIGZpbmFsU3RyXG5cdFx0fSwgXCJcIilcblxuXHRsZXQgbGF0ID0gMjguNDU5NVxuXHRsZXQgbG9uZyA9IDc3LjAyMjZcblx0aWYgKHNlYXJjaFN0YXRlLnNlbGVjdGVkTG9jYXRpb24pIHtcblx0XHRsYXQgPSBzZWFyY2hTdGF0ZS5zZWxlY3RlZExvY2F0aW9uLmdlb21ldHJ5LmxvY2F0aW9uLmxhdFxuXHRcdGxvbmcgPSBzZWFyY2hTdGF0ZS5zZWxlY3RlZExvY2F0aW9uLmdlb21ldHJ5LmxvY2F0aW9uLmxuZ1xuXHR9XG5cdGxldCBtaW5fZGlzdGFuY2UgPSBmaWx0ZXJDcml0ZXJpYS5kaXN0YW5jZVJhbmdlWzBdXG5cdGxldCBtYXhfZGlzdGFuY2UgPSBmaWx0ZXJDcml0ZXJpYS5kaXN0YW5jZVJhbmdlWzFdXG5cdGxldCBtaW5fcHJpY2UgPSBmaWx0ZXJDcml0ZXJpYS5wcmljZVJhbmdlWzBdXG5cdGxldCBtYXhfcHJpY2UgPSBmaWx0ZXJDcml0ZXJpYS5wcmljZVJhbmdlWzFdXG5cdGxldCBvcmRlcl9ieSA9IGZpbHRlckNyaXRlcmlhLnNvcnRCeVxuXG5cdGxldCB1cmwgPSBgL2FwaS92MS9kaWFnbm9zdGljL2xhYmxpc3Q/aWRzPSR7dGVzdElkc30mbG9uZz0ke2xhdH0mbGF0PSR7bG9uZ30mbWluX2Rpc3RhbmNlPSR7bWluX2Rpc3RhbmNlfSZtYXhfZGlzdGFuY2U9JHttYXhfZGlzdGFuY2V9Jm1pbl9wcmljZT0ke21pbl9wcmljZX0mbWF4X3ByaWNlPSR7bWF4X3ByaWNlfSZvcmRlcl9ieT0ke29yZGVyX2J5fWBcblxuXHRkaXNwYXRjaCh7XG5cdFx0dHlwZTogTEFCX1NFQVJDSF9TVEFSVCxcblx0XHRwYXlsb2FkOiBudWxsXG5cdH0pXG5cblx0cmV0dXJuIEFQSV9HRVQodXJsKS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuXG5cdFx0ZGlzcGF0Y2goe1xuXHRcdFx0dHlwZTogQVBQRU5EX0xBQlMsXG5cdFx0XHRwYXlsb2FkOiByZXNwb25zZVxuXHRcdH0pXG5cblx0XHRkaXNwYXRjaCh7XG5cdFx0XHR0eXBlOiBMQUJfU0VBUkNILFxuXHRcdFx0cGF5bG9hZDogcmVzcG9uc2Vcblx0XHR9KVxuXG5cdFx0aWYgKG1lcmdlU3RhdGUpIHtcblx0XHRcdGRpc3BhdGNoKHtcblx0XHRcdFx0dHlwZTogTUVSR0VfU0VBUkNIX1NUQVRFX0xBQixcblx0XHRcdFx0cGF5bG9hZDoge1xuXHRcdFx0XHRcdHNlYXJjaFN0YXRlLFxuXHRcdFx0XHRcdGZpbHRlckNyaXRlcmlhXG5cdFx0XHRcdH1cblx0XHRcdH0pXG5cdFx0fVxuXG5cdH0pLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xuXG5cdH0pXG59XG5cbmV4cG9ydCBjb25zdCBnZXRMYWJCeUlkID0gKGxhYklkKSA9PiAoZGlzcGF0Y2gpID0+IHtcblx0bGV0IHVybCA9IGAvYXBpL3YxL2RpYWdub3N0aWMvbGFibGlzdC8ke2xhYklkfWBcblxuXHRyZXR1cm4gQVBJX0dFVCh1cmwpLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG5cblx0XHRkaXNwYXRjaCh7XG5cdFx0XHR0eXBlOiBBUFBFTkRfTEFCUyxcblx0XHRcdHBheWxvYWQ6IFtyZXNwb25zZV1cblx0XHR9KVxuXG5cdH0pLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xuXG5cdH0pXG59XG5cbmV4cG9ydCBjb25zdCBnZXRMYWJUaW1lU2xvdHMgPSAobGFiSWQsIHRlc3RJZHMsIGNhbGxiYWNrKSA9PiAoZGlzcGF0Y2gpID0+IHtcblx0QVBJX0dFVCgnL2F2YWlsYWJpbGl0eV9sYWJzLmpzb24nKS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuXG5cdFx0Y2FsbGJhY2socmVzcG9uc2UpXG5cblx0fSkuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSB7XG5cblx0fSlcbn1cblxuZXhwb3J0IGNvbnN0IGdldExhYkJvb2tpbmdTdW1tYXJ5ID0gKGJvb2tpbmdJZCwgY2FsbGJhY2spID0+IChkaXNwYXRjaCkgPT4ge1xuXHRBUElfR0VUKCcvbGFiX2Jvb2tpbmdfc3VtbWFyLmpzb24nKS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuXG5cdFx0Y2FsbGJhY2socmVzcG9uc2UpXG5cblx0fSkuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSB7XG5cblx0fSlcbn1cbiIsImltcG9ydCB7IEFQUEVORF9GSUxURVJTX0RJQUdOT1NJUywgVE9HR0xFX0NPTkRJVElPTlMsIFRPR0dMRV9TUEVDSUFMSVRJRVMsIFNFTEVDVF9MT0NBVElPTiwgTUVSR0VfU0VBUkNIX1NUQVRFLCBUT0dHTEVfQ1JJVEVSSUEsIFRPR0dMRV9URVNUUywgVE9HR0xFX0RJQUdOT1NJU19DUklURVJJQSwgTE9BRF9TRUFSQ0hfQ1JJVEVSSUFfTEFCIH0gZnJvbSAnLi4vLi4vY29uc3RhbnRzL3R5cGVzJztcbmltcG9ydCB7IEFQSV9HRVQgfSBmcm9tICcuLi8uLi9hcGkvYXBpLmpzJztcblxuZXhwb3J0IGNvbnN0IGxvYWRMYWJDb21tb25Dcml0ZXJpYXMgPSAoKSA9PiAoZGlzcGF0Y2gpID0+IHtcblxuICAgIHJldHVybiBBUElfR0VUKCcvYXBpL3YxL2RpYWdub3N0aWMvbGFic2VhcmNoJykudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgZGlzcGF0Y2goe1xuICAgICAgICAgICAgdHlwZTogTE9BRF9TRUFSQ0hfQ1JJVEVSSUFfTEFCLFxuICAgICAgICAgICAgcGF5bG9hZDogcmVzcG9uc2VcbiAgICAgICAgfSlcbiAgICB9KS5jYXRjaChmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgICAgZGlzcGF0Y2goe1xuICAgICAgICAgICAgdHlwZTogTE9BRF9TRUFSQ0hfQ1JJVEVSSUFfTEFCLFxuICAgICAgICAgICAgcGF5bG9hZDogbnVsbFxuICAgICAgICB9KVxuICAgIH0pXG5cbn1cblxuZXhwb3J0IGNvbnN0IHRvZ2dsZURpYWdub3Npc0NyaXRlcmlhID0gKHR5cGUsIGNyaXRlcmlhKSA9PiAoZGlzcGF0Y2gpID0+IHtcbiAgICBkaXNwYXRjaCh7XG4gICAgICAgIHR5cGU6IFRPR0dMRV9ESUFHTk9TSVNfQ1JJVEVSSUEsXG4gICAgICAgIHBheWxvYWQ6IHtcbiAgICAgICAgICAgIHR5cGUsIGNyaXRlcmlhXG4gICAgICAgIH1cbiAgICB9KVxuXG59XG5cbmV4cG9ydCBjb25zdCBnZXREaWFnbm9zaXNDcml0ZXJpYVJlc3VsdHMgPSAoc2VhcmNoU3RyaW5nLCBjYWxsYmFjaykgPT4gKGRpc3BhdGNoKSA9PiB7XG4gICAgQVBJX0dFVChgL2FwaS92MS9kaWFnbm9zdGljL3Rlc3Q/bmFtZT0ke3NlYXJjaFN0cmluZ31gKS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICBjYWxsYmFjayhyZXNwb25zZSlcbiAgICB9KS5jYXRjaChmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgICAgY2FsbGJhY2sobnVsbClcbiAgICB9KVxufVxuXG5cbiIsImltcG9ydCAqIGFzIFNFQVJDSF9DUklURVJJQV9PUEQgZnJvbSAnLi9vcGQvc2VhcmNoQ3JpdGVyaWEuanMnXG5pbXBvcnQgKiBhcyBTRUFSQ0hfQ1JJVEVSSUFfTEFCUyBmcm9tICcuL2RpYWdub3Npcy9zZWFyY2hDcml0ZXJpYS5qcydcbmltcG9ydCAqIGFzIERPQ1RPUlNfQUNUSU9OUyBmcm9tICcuL29wZC9kb2N0b3JTZWFyY2guanMnXG5pbXBvcnQgKiBhcyBMQUJTX0FDVElPTlMgZnJvbSAnLi9kaWFnbm9zaXMvbGFiU2VhcmNoLmpzJ1xuaW1wb3J0ICogYXMgVVNFUl9BQ1RJT05TIGZyb20gJy4vY29tbW9ucy91c2VyLmpzJ1xuaW1wb3J0ICogYXMgQVVUSF9BQ1RJT05TIGZyb20gJy4vY29tbW9ucy9hdXRoLmpzJ1xuXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5hc3NpZ24oe30sXG4gICAgU0VBUkNIX0NSSVRFUklBX09QRCxcbiAgICBTRUFSQ0hfQ1JJVEVSSUFfTEFCUyxcbiAgICBET0NUT1JTX0FDVElPTlMsXG4gICAgTEFCU19BQ1RJT05TLFxuICAgIFVTRVJfQUNUSU9OUyxcbiAgICBBVVRIX0FDVElPTlNcbikiLCJpbXBvcnQgeyBET0NUT1JfU0VBUkNIX1NUQVJULCBBUFBFTkRfRE9DVE9SUywgRE9DVE9SX1NFQVJDSCwgTUVSR0VfU0VBUkNIX1NUQVRFX09QRCB9IGZyb20gJy4uLy4uL2NvbnN0YW50cy90eXBlcyc7XG5pbXBvcnQgeyBBUElfR0VUIH0gZnJvbSAnLi4vLi4vYXBpL2FwaS5qcyc7XG5cblxuZXhwb3J0IGNvbnN0IGdldERvY3RvcnMgPSAoc2VhcmNoU3RhdGUgPSB7fSwgZmlsdGVyQ3JpdGVyaWEgPSB7fSwgbWVyZ2VTdGF0ZSA9IGZhbHNlKSA9PiAoZGlzcGF0Y2gpID0+IHtcblx0bGV0IHNwZWNpYWxpemF0aW9uX2lkcyA9IHNlYXJjaFN0YXRlLnNlbGVjdGVkQ3JpdGVyaWFzXG5cdFx0LmZpbHRlcih4ID0+IHgudHlwZSA9PSAnc3BlY2lhbGl0eScpXG5cdFx0LnJlZHVjZSgoZmluYWxTdHIsIGN1cnIsIGkpID0+IHtcblx0XHRcdGlmIChpICE9IDApIHtcblx0XHRcdFx0ZmluYWxTdHIgKz0gJywnXG5cdFx0XHR9XG5cdFx0XHRmaW5hbFN0ciArPSBgJHtjdXJyLmlkfWBcblx0XHRcdHJldHVybiBmaW5hbFN0clxuXHRcdH0sIFwiXCIpXG5cblx0bGV0IHNpdHNfYXQgPSBbXVxuXHQvLyBpZihmaWx0ZXJDcml0ZXJpYS5zaXRzX2F0X2NsaW5pYykgc2l0c19hdC5wdXNoKCdjbGluaWMnKTtcblx0Ly8gaWYoZmlsdGVyQ3JpdGVyaWEuc2l0c19hdF9ob3NwaXRhbCkgc2l0c19hdC5wdXNoKCdob3NwaXRhbCcpO1xuXHQvLyBpZihzaXRzX2F0Lmxlbmd0aCA9PSAwKSBzaXRzX2F0ID0gWydjbGluaWMnLCdob3NwaXRhbCddO1xuXHRzaXRzX2F0ID0gc2l0c19hdC5qb2luKCcsJylcblxuXHRsZXQgbGF0ID0gMjguNDU5NVxuXHRsZXQgbG9uZyA9IDc3LjAyMjZcblx0aWYgKHNlYXJjaFN0YXRlLnNlbGVjdGVkTG9jYXRpb24pIHtcblx0XHRsYXQgPSBzZWFyY2hTdGF0ZS5zZWxlY3RlZExvY2F0aW9uLmdlb21ldHJ5LmxvY2F0aW9uLmxhdFxuXHRcdGxvbmcgPSBzZWFyY2hTdGF0ZS5zZWxlY3RlZExvY2F0aW9uLmdlb21ldHJ5LmxvY2F0aW9uLmxuZ1xuXHR9XG5cblx0bGV0IG1pbl9mZWVzID0gZmlsdGVyQ3JpdGVyaWEucHJpY2VSYW5nZVswXVxuXHRsZXQgbWF4X2ZlZXMgPSBmaWx0ZXJDcml0ZXJpYS5wcmljZVJhbmdlWzFdXG5cdGxldCBzb3J0X29uID0gZmlsdGVyQ3JpdGVyaWEuc29ydF9vbiB8fCBcIlwiXG5cdGxldCBpc19hdmFpbGFibGUgPSBmaWx0ZXJDcml0ZXJpYS5pc19hdmFpbGFibGVcblx0bGV0IGlzX2ZlbWFsZSA9IGZpbHRlckNyaXRlcmlhLmlzX2ZlbWFsZVxuXG5cdGxldCB1cmwgPSBgL2FwaS92MS9kb2N0b3IvZG9jdG9yc2VhcmNoP3NwZWNpYWxpemF0aW9uX2lkcz0ke3NwZWNpYWxpemF0aW9uX2lkc30mc2l0c19hdD0ke3NpdHNfYXR9JmxhdGl0dWRlPSR7bGF0fSZsb25naXR1ZGU9JHtsb25nfSZtaW5fZmVlcz0ke21pbl9mZWVzfSZtYXhfZmVlcz0ke21heF9mZWVzfSZzb3J0X29uPSR7c29ydF9vbn0maXNfYXZhaWxhYmxlPSR7aXNfYXZhaWxhYmxlfSZpc19mZW1hbGU9JHtpc19mZW1hbGV9YFxuXG5cdGRpc3BhdGNoKHtcblx0XHR0eXBlOiBET0NUT1JfU0VBUkNIX1NUQVJULFxuXHRcdHBheWxvYWQ6IG51bGxcblx0fSlcblxuXHRyZXR1cm4gQVBJX0dFVCh1cmwpLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG5cblx0XHRkaXNwYXRjaCh7XG5cdFx0XHR0eXBlOiBBUFBFTkRfRE9DVE9SUyxcblx0XHRcdHBheWxvYWQ6IHJlc3BvbnNlXG5cdFx0fSlcblxuXHRcdGRpc3BhdGNoKHtcblx0XHRcdHR5cGU6IERPQ1RPUl9TRUFSQ0gsXG5cdFx0XHRwYXlsb2FkOiByZXNwb25zZVxuXHRcdH0pXG5cblx0XHRpZiAobWVyZ2VTdGF0ZSkge1xuXHRcdFx0ZGlzcGF0Y2goe1xuXHRcdFx0XHR0eXBlOiBNRVJHRV9TRUFSQ0hfU1RBVEVfT1BELFxuXHRcdFx0XHRwYXlsb2FkOiB7XG5cdFx0XHRcdFx0c2VhcmNoU3RhdGUsXG5cdFx0XHRcdFx0ZmlsdGVyQ3JpdGVyaWFcblx0XHRcdFx0fVxuXHRcdFx0fSlcblx0XHR9XG5cblx0fSkuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSB7XG5cblx0fSlcbn1cblxuZXhwb3J0IGNvbnN0IGdldERvY3RvckJ5SWQgPSAoZG9jdG9ySWQpID0+IChkaXNwYXRjaCkgPT4ge1xuXG5cdHJldHVybiBBUElfR0VUKGAvYXBpL3YxL2RvY3Rvci9wcm9maWxldXNlcnZpZXcvJHtkb2N0b3JJZH1gKS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuXG5cdFx0ZGlzcGF0Y2goe1xuXHRcdFx0dHlwZTogQVBQRU5EX0RPQ1RPUlMsXG5cdFx0XHRwYXlsb2FkOiBbcmVzcG9uc2VdXG5cdFx0fSlcblxuXHR9KS5jYXRjaChmdW5jdGlvbiAoZXJyb3IpIHtcblxuXHR9KVxufVxuXG5leHBvcnQgY29uc3QgZ2V0VGltZVNsb3RzID0gKGRvY3RvcklkLCBjbGluaWNJZCwgY2FsbGJhY2spID0+IChkaXNwYXRjaCkgPT4ge1xuXHRyZXR1cm4gQVBJX0dFVChgL2FwaS92MS9kb2N0b3IvZG9jdG9ydGltaW5nP2RvY3Rvcl9pZD0ke2RvY3RvcklkfSZob3NwaXRhbF9pZD0ke2NsaW5pY0lkfWApLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG5cdFx0Y2FsbGJhY2socmVzcG9uc2UpXG5cdH0pLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xuXG5cdH0pXG59XG4iLCJpbXBvcnQgeyBTRUxFQ1RfTE9DQVRJT05fT1BELCBNRVJHRV9TRUFSQ0hfU1RBVEVfT1BELCBUT0dHTEVfT1BEX0NSSVRFUklBLCBMT0FEX1NFQVJDSF9DUklURVJJQV9PUEQsIFNFTEVDVF9MT0NBVElPTl9ESUFHTk9TSVMgfSBmcm9tICcuLi8uLi9jb25zdGFudHMvdHlwZXMnO1xuaW1wb3J0IHsgQVBJX0dFVCB9IGZyb20gJy4uLy4uL2FwaS9hcGkuanMnO1xuXG5cbmV4cG9ydCBjb25zdCBsb2FkT1BEQ29tbW9uQ3JpdGVyaWEgPSAoKSA9PiAoZGlzcGF0Y2gpID0+IHtcblxuICAgIHJldHVybiBBUElfR0VUKCcvYXBpL3YxL2RvY3Rvci9zZWFyY2hlZGl0ZW1zJykudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgZGlzcGF0Y2goe1xuICAgICAgICAgICAgdHlwZTogTE9BRF9TRUFSQ0hfQ1JJVEVSSUFfT1BELFxuICAgICAgICAgICAgcGF5bG9hZDogcmVzcG9uc2VcbiAgICAgICAgfSlcbiAgICB9KS5jYXRjaChmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgICAgZGlzcGF0Y2goe1xuICAgICAgICAgICAgdHlwZTogTE9BRF9TRUFSQ0hfQ1JJVEVSSUFfT1BELFxuICAgICAgICAgICAgcGF5bG9hZDogbnVsbFxuICAgICAgICB9KVxuICAgIH0pXG5cbn1cblxuZXhwb3J0IGNvbnN0IHRvZ2dsZU9QRENyaXRlcmlhID0gKHR5cGUsIGNyaXRlcmlhKSA9PiAoZGlzcGF0Y2gpID0+IHtcbiAgICBkaXNwYXRjaCh7XG4gICAgICAgIHR5cGU6IFRPR0dMRV9PUERfQ1JJVEVSSUEsXG4gICAgICAgIHBheWxvYWQ6IHtcbiAgICAgICAgICAgIHR5cGUsIGNyaXRlcmlhXG4gICAgICAgIH1cbiAgICB9KVxuXG59XG5cbmV4cG9ydCBjb25zdCBzZWxlY3RMb2NhdGlvbiA9IChsb2NhdGlvbikgPT4gKGRpc3BhdGNoKSA9PiB7XG4gICAgZGlzcGF0Y2goe1xuICAgICAgICB0eXBlOiBTRUxFQ1RfTE9DQVRJT05fT1BELFxuICAgICAgICBwYXlsb2FkOiBsb2NhdGlvblxuICAgIH0pXG5cbiAgICBkaXNwYXRjaCh7XG4gICAgICAgIHR5cGU6IFNFTEVDVF9MT0NBVElPTl9ESUFHTk9TSVMsXG4gICAgICAgIHBheWxvYWQ6IGxvY2F0aW9uXG4gICAgfSlcblxufVxuXG5leHBvcnQgY29uc3QgZ2V0T1BEQ3JpdGVyaWFSZXN1bHRzID0gKHNlYXJjaFN0cmluZywgY2FsbGJhY2spID0+IChkaXNwYXRjaCkgPT4ge1xuICAgIFxuICAgIEFQSV9HRVQoYC9hcGkvdjEvZGlhZ25vc3RpYy90ZXN0P25hbWU9JHtzZWFyY2hTdHJpbmd9YCkudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgY2FsbGJhY2socmVzcG9uc2UpXG4gICAgfSkuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICAgIGNhbGxiYWNrKG51bGwpXG4gICAgfSlcbn1cbiIsImltcG9ydCBBeGlvcyBmcm9tICdheGlvcydcbmltcG9ydCBTVE9SQUdFIGZyb20gJy4uL2hlbHBlcnMvc3RvcmFnZSdcbmltcG9ydCBOQVZJR0FURSBmcm9tICcuLi9oZWxwZXJzL25hdmlnYXRlJ1xuXG5sZXQgYXhpb3NJbnN0YW5jZSA9IEF4aW9zLmNyZWF0ZSh7XG4gICAgYmFzZVVSTDogJ2h0dHBzOi8vcWEucGFuYWNlYXRlY2huby5jb20nLFxuICAgIGhlYWRlcjoge31cbn0pO1xuXG5mdW5jdGlvbiByZWplY3RIYW5kbGVyKHJlc3BvbnNlLCBjYWxsYmFjaykge1xuICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKVxuICAgIC8vIGlmIChyZXNwb25zZSAmJiByZXNwb25zZS5yZXNwb25zZSAmJiByZXNwb25zZS5yZXNwb25zZS5zdGF0dXMgPT0gNDAxKSB7XG4gICAgLy8gICAgIFNUT1JBR0UuZGVsZXRlQXV0aCgpLnRoZW4oKCkgPT4ge1xuICAgIC8vICAgICAgICAgLy8gc2VuZCB0byBsb2dpbiBwYWdlXG4gICAgLy8gICAgICAgICBOQVZJR0FURS5uYXZpZ2F0ZVRvKCcvJylcbiAgICAvLyAgICAgfSlcbiAgICAvLyB9XG5cbiAgICBjYWxsYmFjayhyZXNwb25zZSlcbn1cblxuZXhwb3J0IGNvbnN0IEFQSV9HRVQgPSAodXJsKSA9PiB7XG4gICAgcmV0dXJuIFNUT1JBR0UuZ2V0QXV0aFRva2VuKCkudGhlbigodG9rZW4pID0+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGF4aW9zSW5zdGFuY2Uoe1xuICAgICAgICAgICAgICAgIG1ldGhvZDogJ2dldCcsXG4gICAgICAgICAgICAgICAgdXJsOiB1cmwsXG4gICAgICAgICAgICAgICAgLy8gaGVhZGVyczogeyAnQXV0aG9yaXphdGlvbic6IGBUb2tlbiAke3Rva2VufWAgfVxuICAgICAgICAgICAgfSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShyZXMuZGF0YSlcbiAgICAgICAgICAgIH0sIChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgIHJlamVjdEhhbmRsZXIocmVzcG9uc2UsIHJlamVjdClcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgfSlcblxuXG59XG5leHBvcnQgY29uc3QgQVBJX1BPU1QgPSAodXJsLCBkYXRhKSA9PiB7XG4gICAgcmV0dXJuIFNUT1JBR0UuZ2V0QXV0aFRva2VuKCkudGhlbigodG9rZW4pID0+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGF4aW9zSW5zdGFuY2Uoe1xuICAgICAgICAgICAgICAgIG1ldGhvZDogJ3Bvc3QnLFxuICAgICAgICAgICAgICAgIHVybDogdXJsLFxuICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICAgICAgaGVhZGVyczogeyAnQXV0aG9yaXphdGlvbic6IGBUb2tlbiAke3Rva2VufWAgfVxuICAgICAgICAgICAgfSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShyZXMuZGF0YSlcbiAgICAgICAgICAgIH0sIChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgIHJlamVjdEhhbmRsZXIocmVzcG9uc2UsIHJlamVjdClcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgfSlcblxuXG59XG5cbmV4cG9ydCBjb25zdCBBUElfUFVUID0gKHVybCwgZGF0YSkgPT4ge1xuICAgIHJldHVybiBTVE9SQUdFLmdldEF1dGhUb2tlbigpLnRoZW4oKHRva2VuKSA9PiB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBheGlvc0luc3RhbmNlKHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdwdXQnLFxuICAgICAgICAgICAgICAgIHVybDogdXJsLFxuICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICAgICAgaGVhZGVyczogeyAnQXV0aG9yaXphdGlvbic6IGBUb2tlbiAke3Rva2VufWAgfVxuICAgICAgICAgICAgfSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShyZXMuZGF0YSlcbiAgICAgICAgICAgIH0sIChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgIHJlamVjdEhhbmRsZXIocmVzcG9uc2UsIHJlamVjdClcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgfSlcblxuXG59XG5cbmV4cG9ydCBjb25zdCBBUElfREVMRVRFID0gKHVybCkgPT4ge1xuICAgIHJldHVybiBTVE9SQUdFLmdldEF1dGhUb2tlbigpLnRoZW4oKHRva2VuKSA9PiB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBheGlvc0luc3RhbmNlKHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdkZWxldGUnLFxuICAgICAgICAgICAgICAgIHVybDogdXJsLFxuICAgICAgICAgICAgICAgIGhlYWRlcnM6IHsgJ0F1dGhvcml6YXRpb24nOiBgVG9rZW4gJHt0b2tlbn1gIH1cbiAgICAgICAgICAgIH0pLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICAgICAgICAgIHJlc29sdmUocmVzLmRhdGEpXG4gICAgICAgICAgICB9LCAocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICByZWplY3RIYW5kbGVyKHJlc3BvbnNlLCByZWplY3QpXG4gICAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgIH0pXG5cbn0iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5jbGFzcyBIb21lVmlldyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgfVxuXG4gICAgbmF2aWdhdGVUbyh3aGVyZSl7XG4gICAgICAgIHRoaXMucHJvcHMuaGlzdG9yeS5wdXNoKHdoZXJlKVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICA8aGVhZGVyIGNsYXNzTmFtZT1cInNraW4tcHJpbWFyeSBmaXhlZCBob3Jpem9udGFsIHRvcFwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lci1mbHVpZFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC00XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaGVhZGVyLXRpdGxlIGZ3LTcwMCBjYXBpdGFsaXplIHRleHQtd2hpdGVcIj5JQ09OPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtNFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLTRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHVsIGNsYXNzTmFtZT1cImlubGluZS1saXN0IGZsb2F0LXJpZ2h0IHVzZXItbm90aWZpY2F0aW9uLWFjdGlvblwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpPjxzcGFuIGNsYXNzTmFtZT1cImljb24gaWNvbi1tZCB0ZXh0LW1pZGRsZVwiPjxpbWcgc3JjPVwiL2Fzc2V0cy9pbWcvY3VzdG9tZXItaWNvbnMvdXNlci5zdmdcIiBjbGFzc05hbWU9XCJpbWctZmx1aWRcIiAvPjwvc3Bhbj48L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpPjxzcGFuIGNsYXNzTmFtZT1cImljb24gaWNvbi1tZCB0ZXh0LW1pZGRsZSBub3RpZmljYXRpb24taWNvblwiPjxpbWcgc3JjPVwiL2Fzc2V0cy9pbWcvY3VzdG9tZXItaWNvbnMvbm90aWZpY2F0aW9uLnN2Z1wiIGNsYXNzTmFtZT1cImltZy1mbHVpZFwiIC8+IDxzcGFuIGNsYXNzTmFtZT1cIm5vdGlmaWNhdGlvbi1hbGVydFwiIC8+PC9zcGFuPjwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9oZWFkZXI+XG4gICAgICAgICAgICAgICAgPHNlY3Rpb24gY2xhc3NOYW1lPVwid3JhcCBjdC1ob21lLXNjcmVlblwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lci1mbHVpZFwiPlxuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtMTJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3aWRnZXQgbXJ0LTEwIGN0LXByb2ZpbGVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsvKiA8ZGl2IGNsYXNzTmFtZT1cIndpZGdldC1jb250ZW50IGN0LXByb2ZpbGUtaW5mb1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY3QtaW1nIGN0LWltZy1tZCBjdC1wcm9maWxlLWljb25cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGltZyBzcmM9XCIvYXNzZXRzL2ltZy9jdXN0b21lci1pY29ucy9jYWxhbmRlci5zdmdcIiBjbGFzc05hbWU9XCJpbWctZmx1aWRcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY3QtY29udGVudCByb290LW1hcC1maWVsZFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJmdy01MDAgdGV4dC1tZFwiPkFwcG9pbm1lbnQgZm9yIEFydW4gS3VtYXIgPC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDQgY2xhc3NOYW1lPVwid2lkZ2V0LXRpdGxlIHJtLXRpdGxlXCI+UmlzaGFiaCBNZWhyb3RyYTwvaDQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cImZ3LTUwMCB0ZXh0LW1kIGRyLXdpdGhcIj5XaXRoIERyLiBBbmdlbGEgU21pdGg8L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm9vdC1tYXBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbWcgc3JjPVwiL2Fzc2V0cy9pbWcvY3VzdG9tZXItaWNvbnMvbWFwLXJvb3Quc3ZnXCIgY2xhc3NOYW1lPVwiaW1nLWZsdWlkXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPk5hdmlnYXRlPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PiAqL31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLTZcIiBvbkNsaWNrPXt0aGlzLm5hdmlnYXRlVG8uYmluZCh0aGlzLCcvb3BkJyl9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIndpZGdldFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3aWRnZXQtY29udGVudCB0ZXh0LWNlbnRlciBib29rZWQtZHJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImN0LWltZyBjdC1pbWctbGcgc3RhdGgtaW1nXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbWcgc3JjPVwiL2Fzc2V0cy9pbWcvY3VzdG9tZXItaWNvbnMvc3RldGguc3ZnXCIgY2xhc3NOYW1lPVwiaW1nLWZsdWlkIHN0YXRoLWltZ1wiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGg0IGNsYXNzTmFtZT1cInRleHQtbWQgZnctNTAwXCI+Qm9vayBhbmQgVmlzaXQgYSBEb2N0b3I8L2g0PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLTZcIiBvbkNsaWNrPXt0aGlzLm5hdmlnYXRlVG8uYmluZCh0aGlzLCcvZHgnKX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwid2lkZ2V0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIndpZGdldC1jb250ZW50IHRleHQtY2VudGVyIGJvb2tlZC1kclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY3QtaW1nIGN0LWltZy1sZyBzdGF0aC1pbWdcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGltZyBzcmM9XCIvYXNzZXRzL2ltZy9jdXN0b21lci1pY29ucy9tZWRpY2FsLXRlc3Quc3ZnXCIgY2xhc3NOYW1lPVwiaW1nLWZsdWlkIHN0YXRoLWltZ1wiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGg0IGNsYXNzTmFtZT1cInRleHQtbWQgZnctNTAwXCI+Qm9vayBtZWRpY2FsIHRlc3Q8L2g0PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLTEyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwid2lkZ2V0IGNvbnN1bHRhbnQtcXVpY2tcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwid2lkZ2V0LWhlYWRlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoNCBjbGFzc05hbWU9XCJ3aWRnZXQtdGl0bGUgZnctNzAwIHRleHQtbGcgdGV4dC1jZW50ZXJcIj5HZXQgaW5zdGFudCBDb25zdWx0YXRpb24gcmlnaHQgbm93IGZvciA8YSBocmVmPVwiI1wiIGNsYXNzTmFtZT1cImxpbmstdGV4dFwiPkZSRUU8L2E+PC9oND5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3aWRnZXQtY29udGVudCB0ZXh0LWNlbnRlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLTZcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImN0LWltZyBjdC1pbWctc21cIj48aW1nIHNyYz1cIi9hc3NldHMvaW1nL2N1c3RvbWVyLWljb25zL21lc3NhZ2Uuc3ZnXCIgY2xhc3NOYW1lPVwiaW1nLWZsdWlkXCIgLz48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC02XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJjdC1pbWcgY3QtaW1nLXNtXCI+PGltZyBzcmM9XCIvYXNzZXRzL2ltZy9jdXN0b21lci1pY29ucy9jYWxsLnN2Z1wiIGNsYXNzTmFtZT1cImltZy1mbHVpZFwiIC8+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3aWRnZXQtZm9vdGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJlbnEtc3VnZ2VzdGlvblwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dWwgY2xhc3NOYW1lPVwiaW5saW5lLWxpc3RcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaT48YSBocmVmPVwiI1wiIGNsYXNzTmFtZT1cInYtYnRuIHYtYnRuLXByaW1hcnkgb3V0bGluZSByb3VuZC10YWdcIj5IZWFkYWNoZTwvYT48L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpPjxhIGhyZWY9XCIjXCIgY2xhc3NOYW1lPVwidi1idG4gdi1idG4tcHJpbWFyeSBvdXRsaW5lIHJvdW5kLXRhZ1wiPkhlYWRhY2hlPC9hPjwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGk+PGEgaHJlZj1cIiNcIiBjbGFzc05hbWU9XCJ2LWJ0biB2LWJ0bi1wcmltYXJ5IG91dGxpbmUgcm91bmQtdGFnXCI+SGVhZGFjaGU8L2E+PC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC0xMlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIndpZGdldFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3aWRnZXQtY29udGVudFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGNsYXNzTmFtZT1cImZjLWlucHV0IGlucHV0LWxpbmVcIiBwbGFjZWhvbGRlcj1cIkkgYW0gc3VmZmVyaW5nIGZvcm0gaGVhZGFjaGVcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvc2VjdGlvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgSG9tZVZpZXdcbiIsImltcG9ydCBIb21lVmlldyBmcm9tICcuL0hvbWVWaWV3J1xuXG5leHBvcnQgZGVmYXVsdCBIb21lVmlldyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCB7IENpcmN1bGFyUHJvZ3Jlc3MgfSBmcm9tICdtYXRlcmlhbC11aS9Qcm9ncmVzcyc7XG5cbmNsYXNzIExvYWRlciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxvYWRlckNpcmN1bGFyXCI+XG4gICAgICAgICAgICAgICAgPENpcmN1bGFyUHJvZ3Jlc3MgY2xhc3NOYW1lPXtcImxvYWRlcmFjdHVhbFwifSBzaXplPXs1MH0gdGhpY2tuZXNzPXszfSAvPlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IExvYWRlclxuIiwiaW1wb3J0IExvYWRlciBmcm9tICcuL0xvYWRlcidcblxuZXhwb3J0IGRlZmF1bHQgTG9hZGVyIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuY2xhc3MgVXNlckxvZ2luVmlldyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgICBwaG9uZU51bWJlcjogJycsXG4gICAgICAgICAgICB2YWxpZGF0aW9uRXJyb3I6ICcnLFxuICAgICAgICAgICAgc2hvd09UUDogZmFsc2UsXG4gICAgICAgICAgICBvdHA6IFwiXCJcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlucHV0SGFuZGxlcihlKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBbZS50YXJnZXQubmFtZV06IGUudGFyZ2V0LnZhbHVlIH0pXG4gICAgfVxuXG4gICAgc3VibWl0T1RQUmVxdWVzdChudW1iZXIpIHtcblxuICAgICAgICBpZiAobnVtYmVyLm1hdGNoKC9eWzc4OV17MX1bMC05XXs5fSQvKSkge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHZhbGlkYXRpb25FcnJvcjogXCJcIiB9KVxuICAgICAgICAgICAgdGhpcy5wcm9wcy5zZW5kT1RQKG51bWJlciwgKGV4aXN0cykgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChleGlzdHMpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHNob3dPVFA6IHRydWUgfSlcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnByb3BzLmhpc3RvcnkucmVwbGFjZSgnL3NpZ251cCcpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyB2YWxpZGF0aW9uRXJyb3I6IFwiUGxlYXNlIHByb3ZpZGUgYSB2YWxpZCBudW1iZXIgKDEwIGRpZ2l0cylcIiB9KVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIDxoZWFkZXIgY2xhc3NOYW1lPVwic2tpbi13aGl0ZSBmaXhlZCBob3Jpem9udGFsIHRvcCBiZHItMSBib3R0b20gbGlnaHRcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250YWluZXItZmx1aWRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtMlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dWwgY2xhc3NOYW1lPVwiaW5saW5lLWxpc3RcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaT48c3BhbiBjbGFzc05hbWU9XCJpY29uIGljb24tc20gdGV4dC1taWRkbGUgYmFjay1pY29uLXdoaXRlXCI+PGltZyBzcmM9XCIvYXNzZXRzL2ltZy9jdXN0b21lci1pY29ucy9iYWNrLWljb24ucG5nXCIgY2xhc3NOYW1lPVwiaW1nLWZsdWlkXCIgLz48L3NwYW4+PC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC04XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaGVhZGVyLXRpdGxlIGZ3LTcwMCBjYXBpdGFsaXplIHRleHQtY2VudGVyXCI+UmVnaXN0cmF0aW9uL0xvZ2luPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtMlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvaGVhZGVyPlxuICAgICAgICAgICAgICAgIDxzZWN0aW9uIGNsYXNzTmFtZT1cIndyYXAgbW9iaWxlLXZlcmlmaWNhdGlvbi1zY3JlZW5cIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3aWRnZXQgbm8tc2hhZG93IG5vLXJvdW5kXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIndpZGdldC1oZWFkZXIgdGV4dC1jZW50ZXIgbXYtaGVhZGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGg0IGNsYXNzTmFtZT1cImZ3LTcwMCB0ZXh0LW1kXCI+RW50ZXIgeW91ciBNb2JpbGUgTnVtYmVyIDxiciAvPiB0byBjb250aW51ZTwvaDQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwid2lkZ2V0LWNvbnRlbnQgdGV4dC1jZW50ZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vYmlsZS12ZXJpZmljYXRpb25cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ2ZXJpZmktbW9iLWlvY24gdGV4dC1jZW50ZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbWcgc3JjPVwiL2Fzc2V0cy9pbWcvY3VzdG9tZXItaWNvbnMvbW9iLnN2Z1wiIGNsYXNzTmFtZT1cImltZy1mbHVpZFwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cCBtb2JpbGUtZmllbGRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG9uLWdyb3VwIGVudGVyLW1vYmlsZS1udW1iZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGNsYXNzTmFtZT1cImZjLWlucHV0IHRleHQtY2VudGVyXCIgcGxhY2Vob2xkZXI9XCI5MzRYWFhYWFhcIiB2YWx1ZT17dGhpcy5zdGF0ZS5waG9uZU51bWJlcn0gb25DaGFuZ2U9e3RoaXMuaW5wdXRIYW5kbGVyLmJpbmQodGhpcyl9IG5hbWU9XCJwaG9uZU51bWJlclwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUuc2hvd09UUCA/IDxkaXYgY2xhc3NOYW1lPVwiYWRvbi1ncm91cCBlbnRlci1tb2JpbGUtbnVtYmVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJyIC8+PGJyIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgY2xhc3NOYW1lPVwiZmMtaW5wdXQgdGV4dC1jZW50ZXJcIiBwbGFjZWhvbGRlcj1cIkVudGVyIE9UUFwiIHZhbHVlPXt0aGlzLnN0YXRlLm90cH0gb25DaGFuZ2U9e3RoaXMuaW5wdXRIYW5kbGVyLmJpbmQodGhpcyl9IG5hbWU9XCJvdHBcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+IDogXCJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImVycm9yTWVzc2FnZVwiPnt0aGlzLnByb3BzLmVycm9yX21lc3NhZ2V9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZXJyb3JNZXNzYWdlXCI+e3RoaXMuc3RhdGUudmFsaWRhdGlvbkVycm9yfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9zZWN0aW9uPlxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZS5zaG93T1RQID8gPGJ1dHRvbiBjbGFzc05hbWU9XCJ2LWJ0biB2LWJ0bi1wcmltYXJ5IGJ0bi1sZyBmaXhlZCBob3Jpem9udGFsIGJvdHRvbSBuby1yb3VuZCBidG4tbGcgdGV4dC1sZ1wiPlZlcmlmeTwvYnV0dG9uPiA6IDxidXR0b24gb25DbGljaz17dGhpcy5zdWJtaXRPVFBSZXF1ZXN0LmJpbmQodGhpcywgdGhpcy5zdGF0ZS5waG9uZU51bWJlcil9IGRpc2FibGVkPXt0aGlzLnByb3BzLm90cF9yZXF1ZXN0X3NlbnR9IGNsYXNzTmFtZT1cInYtYnRuIHYtYnRuLXByaW1hcnkgYnRuLWxnIGZpeGVkIGhvcml6b250YWwgYm90dG9tIG5vLXJvdW5kIGJ0bi1sZyB0ZXh0LWxnXCI+Q29udGludWU8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBVc2VyTG9naW5WaWV3XG4iLCJpbXBvcnQgVXNlckxvZ2luVmlldyBmcm9tICcuL1VzZXJMb2dpbidcblxuZXhwb3J0IGRlZmF1bHQgVXNlckxvZ2luVmlldyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmNvbnN0IElmcmFtU3R5bGUgPSB7XG4gICAgd2lkdGg6ICcxMDAlJyxcbiAgICBoZWlnaHQ6ICdjYWxjKDEwMHZoIC0gNjBweCknXG59XG5cblxuY2xhc3MgQ2hhdFZpZXcgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgICAgICB0aGlzLnN0YXRlID0ge1xuXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdGF0aWMgY29udGV4dFR5cGVzID0ge1xuICAgICAgICByb3V0ZXI6ICgpID0+IG51bGxcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibG9jYXRpb25TZWxlY3RvclwiPlxuICAgICAgICAgICAgICAgIDxpZnJhbWUgc3JjPVwiaHR0cDovL2NoYXRib3QucG9saWN5YmF6YWFyLmNvbS9saXZlY2hhdFwiIHN0eWxlPXtJZnJhbVN0eWxlfT48L2lmcmFtZT5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBDaGF0Vmlld1xuIiwiaW1wb3J0IENoYXRWaWV3IGZyb20gJy4vQ2hhdFZpZXcuanMnXG5cbmV4cG9ydCBkZWZhdWx0IENoYXRWaWV3IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IENoaXAgZnJvbSAnbWF0ZXJpYWwtdWkvQ2hpcCc7XG5cblxuY2xhc3MgQ29tbW9ubHlTZWFyY2hlZCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG5cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICBsZXQgcm93cyA9IHRoaXMucHJvcHMuZGF0YS5tYXAoKHJvdyxpKSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcm9wcy50eXBlID09ICdsYWInKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIDxsaSBrZXk9e2l9PlxuICAgICAgICAgICAgICAgICAgICA8c3BhblxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiY3QtaW1nIGxhYi1pbWdcIlxuICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aW1nIHNyYz1cIi9hc3NldHMvaW1nL2N1c3RvbWVyLWljb25zL2xhYjEucG5nXCIgY2xhc3NOYW1lPVwiaW1nLWZsdWlkXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJsYWItbmFtZVwiPlNMUiBEaWdub3N0aWNzPC9wPlxuICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGxldCBzZWxlY3RlZCA9IGZhbHNlXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5zZWxlY3RlZC5tYXAoKGN1cnIpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYoY3Vyci5pZCA9PSByb3cuaWQpe1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWQgPSB0cnVlXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIHJldHVybiA8bGkga2V5PXtpfT5cbiAgICAgICAgICAgICAgICAgICAgPGFcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17c2VsZWN0ZWQgPyBcInYtYnRuIHYtYnRuLXByaW1hcnkgdGFnLXNtIG91dGxpbmUgc2VsZWN0ZWRcIiA6IFwidi1idG4gdi1idG4tcHJpbWFyeSB0YWctc20gb3V0bGluZVwifVxuICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnByb3BzLnRvZ2dsZSgodGhpcy5wcm9wcy50eXBlIHx8IHJvdy50eXBlKSwgcm93KVxuICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAge3Jvdy5uYW1lfVxuICAgICAgICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9KVxuXG4gICAgICAgIGxldCBkaXZDbGFzcyA9IGBwYW5lbC1jb250ZW50YFxuICAgICAgICBsZXQgdWxDbGFzcyA9IGBpbmxpbmUtbGlzdGBcblxuICAgICAgICBpZiAodGhpcy5wcm9wcy50eXBlID09ICdsYWInKSB7XG4gICAgICAgICAgICBkaXZDbGFzcyA9IGBwYW5lbC1jb250ZW50IHRvdGFsLWxhYnNgXG4gICAgICAgICAgICB1bENsYXNzID0gYGlubGluZS1saXN0IGxhYi1pdGVtc2BcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwid2lkZ2V0LXBhbmVsXCI+XG4gICAgICAgICAgICAgICAgPGg0IGNsYXNzTmFtZT1cInBhbmVsLXRpdGxlXCI+e3RoaXMucHJvcHMuaGVhZGluZ308L2g0PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtkaXZDbGFzc30+XG4gICAgICAgICAgICAgICAgICAgIDx1bCBjbGFzc05hbWU9e3VsQ2xhc3N9PlxuICAgICAgICAgICAgICAgICAgICAgICAge3Jvd3N9XG4gICAgICAgICAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgQ29tbW9ubHlTZWFyY2hlZFxuIiwiaW1wb3J0IENvbW1vbmx5U2VhcmNoZWQgZnJvbSAnLi9Db21tb25seVNlYXJjaGVkLmpzJ1xuXG5cbmV4cG9ydCBkZWZhdWx0IENvbW1vbmx5U2VhcmNoZWQiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgbGlnaHRCYXNlVGhlbWUgfSBmcm9tICdtYXRlcmlhbC11aS9zdHlsZXMnO1xuaW1wb3J0IExvYWRlciBmcm9tICcuLi8uLi9jb21tb25zL0xvYWRlcidcblxuY29uc3QgZGVib3VuY2VyID0gKGZuLCBkZWxheSkgPT4ge1xuICAgIGxldCB0aW1lciA9IG51bGxcbiAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICBjbGVhclRpbWVvdXQodGltZXIpXG4gICAgICAgIHRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBmbi5jYWxsKHRoaXMpXG4gICAgICAgIH0sIGRlbGF5KVxuICAgIH1cbn1cblxuXG5jbGFzcyBDcml0ZXJpYVNlYXJjaFZpZXcgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgc2VhcmNoVmFsdWU6ICcnLFxuICAgICAgICAgICAgc2VhcmNoUmVzdWx0czogW11cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgICB0aGlzLmdldFNlYXJjaFJlc3VsdHMgPSBkZWJvdW5jZXIodGhpcy5nZXRTZWFyY2hSZXN1bHRzLmJpbmQodGhpcyksIDEwMDApXG4gICAgICAgIGxldCBpbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0b3BDcml0ZXJpYVNlYXJjaCcpXG4gICAgICAgIC8vIGlucHV0LmZvY3VzKClcbiAgICB9XG5cbiAgICBpbnB1dEhhbmRsZXIoZSkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHsgc2VhcmNoVmFsdWU6IGUudGFyZ2V0LnZhbHVlIH0pXG4gICAgICAgIHRoaXMuZ2V0U2VhcmNoUmVzdWx0cygpXG4gICAgfVxuXG4gICAgZ2V0U2VhcmNoUmVzdWx0cygpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMudHlwZSA9PSAnb3BkJykge1xuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLmdldERpYWdub3Npc0NyaXRlcmlhUmVzdWx0cyh0aGlzLnN0YXRlLnNlYXJjaFZhbHVlLCAoc2VhcmNoUmVzdWx0cykgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChzZWFyY2hSZXN1bHRzKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCB0ZXN0cyA9IHNlYXJjaFJlc3VsdHMudGVzdHMubWFwKHggPT4geyByZXR1cm4geyAuLi54LCB0eXBlOiAndGVzdCcgfSB9KVxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgc2VhcmNoUmVzdWx0czogWy4uLnRlc3RzXSB9KVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhZGRDcml0ZXJpYShjcml0ZXJpYSkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy50eXBlID09ICdvcGQnKSB7XG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMudG9nZ2xlRGlhZ25vc2lzQ3JpdGVyaWEoY3JpdGVyaWEudHlwZSwgY3JpdGVyaWEpXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgc2VhcmNoVmFsdWU6IFwiXCIgfSlcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIGxldCBsb2NhdGlvbiA9IFwiR3VyZ2FvblwiXG4gICAgICAgIGlmICh0aGlzLnByb3BzLnNlbGVjdGVkTG9jYXRpb24pIHtcbiAgICAgICAgICAgIGxvY2F0aW9uID0gdGhpcy5wcm9wcy5zZWxlY3RlZExvY2F0aW9uLmZvcm1hdHRlZF9hZGRyZXNzLnNsaWNlKDAsIDUpXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICA8aGVhZGVyIGNsYXNzTmFtZT1cInNraW4tcHJpbWFyeSBmaXhlZCBob3Jpem9udGFsIHRvcCBjdC1oZWFkZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250YWluZXItZmx1aWRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtMTJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJuYXZpZ2F0ZS1yb3dcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx1bCBjbGFzc05hbWU9XCJpbmxpbmUtbGlzdCB0b3AtbmF2IGFscGhhLWJ4IHRleHQtd2hpdGVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5oaXN0b3J5LmdvKC0xKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpPjxzcGFuIGNsYXNzTmFtZT1cImN0LWltZyBjdC1pbWctc20gYXJyb3ctaW1nXCI+PGltZyBzcmM9XCIvYXNzZXRzL2ltZy9jdXN0b21lci1pY29ucy9sZWZ0LWFycm93LnN2Z1wiIGNsYXNzTmFtZT1cImltZy1mbHVpZFwiIC8+PC9zcGFuPjwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpPjxkaXYgY2xhc3NOYW1lPVwic2NyZWVuLXRpdGxlXCI+U2VhcmNoPC9kaXY+PC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dWwgY2xhc3NOYW1lPVwiaW5saW5lLWxpc3QgdG9wLW5hdiBiZXRhLWJ4IGZsb2F0LXJpZ2h0IHRleHQtcmlnaHQgdGV4dC13aGl0ZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnByb3BzLmhpc3RvcnkucHVzaCgnL2xvY2F0aW9uc2VhcmNoJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaT48ZGl2IGNsYXNzTmFtZT1cInNjcmVlbi10aXRsZVwiPjxzcGFuIGNsYXNzTmFtZT1cImN0LWltZyBjdC1pbWctc20gbWFwLW1hcmtlci1pbWdcIj48aW1nIHNyYz1cIi9hc3NldHMvaW1nL2N1c3RvbWVyLWljb25zL21hcC1tYXJrZXIuc3ZnXCIgY2xhc3NOYW1lPVwiaW1nLWZsdWlkXCIgLz48L3NwYW4+IHtsb2NhdGlvbn08L2Rpdj48L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtMTJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzZWFyY2gtcm93XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkb24tZ3JvdXBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2wgaW5wdXQtbWQgc2VhcmNoLWlucHV0XCIgaWQ9XCJ0b3BDcml0ZXJpYVNlYXJjaFwiIG9uQ2hhbmdlPXt0aGlzLmlucHV0SGFuZGxlci5iaW5kKHRoaXMpfSB2YWx1ZT17dGhpcy5zdGF0ZS5zZWFyY2hWYWx1ZX0gcGxhY2Vob2xkZXI9e3RoaXMucHJvcHMudGl0bGV9IC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiY3QtaW1nIGN0LWltZy1zbSBzZWFyY2gtaWNvblwiPjxpbWcgc3JjPVwiL2Fzc2V0cy9pbWcvY3VzdG9tZXItaWNvbnMvc2VhcmNoLWljb24uc3ZnXCIgLz48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9oZWFkZXI+XG5cbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUuc2VhcmNoVmFsdWUgP1xuXG4gICAgICAgICAgICAgICAgICAgICAgICA8c2VjdGlvbiBjbGFzc05hbWU9XCJ3cmFwIHdyYXAtMTAwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3aWRnZXQtcGFuZWxcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGg0IGNsYXNzTmFtZT1cInBhbmVsLXRpdGxlXCI+U2VhcmNoIFJlc3VsdDwvaDQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGFuZWwtY29udGVudFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHVsIGNsYXNzTmFtZT1cImxpc3Qgc2VhcmNoLXJlc3VsdC1saXN0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlLnNlYXJjaFJlc3VsdHMubWFwKChjdXJyLCBpKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gPGxpIG9uQ2xpY2s9e3RoaXMuYWRkQ3JpdGVyaWEuYmluZCh0aGlzLCBjdXJyKX0ga2V5PXtpfT48YT57Y3Vyci5uYW1lfTwvYT48L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9zZWN0aW9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgOiAodGhpcy5wcm9wcy5jaGVja0ZvckxvYWQgPyB0aGlzLnByb3BzLmNoaWxkcmVuIDogPExvYWRlciAvPilcblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBDcml0ZXJpYVNlYXJjaFZpZXdcbiIsImltcG9ydCBDcml0ZXJpYVNlYXJjaFZpZXcgZnJvbSAnLi9Dcml0ZXJpYVNlYXJjaFZpZXcuanMnXG5cbmV4cG9ydCBkZWZhdWx0IENyaXRlcmlhU2VhcmNoVmlldyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgRW1vdGlJY29uIGZyb20gJ21hdGVyaWFsLXVpLWljb25zL0FjY291bnRDaXJjbGUnO1xuXG5jbGFzcyBQcm9maWxlU2xpZGVyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICB9XG5cbiAgICBzd2l0Y2hVc2VyKHByb2ZpbGVJZCkge1xuICAgICAgICB0aGlzLmNvbnRleHQucm91dGVyLmhpc3RvcnkucHVzaChgL3VzZXIvJHtwcm9maWxlSWR9JHt0aGlzLnByb3BzLnN1YlJvdXRlfWApXG5cbiAgICB9XG5cbiAgICBzdGF0aWMgY29udGV4dFR5cGVzID0ge1xuICAgICAgICByb3V0ZXI6ICgpID0+IG51bGxcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgbGV0IHByb2ZpbGVzID0gW11cblxuICAgICAgICBwcm9maWxlcyA9IE9iamVjdC5rZXlzKHRoaXMucHJvcHMucHJvZmlsZXMpLm1hcCgocHJvZmlsZUlkLCBpKSA9PiB7XG4gICAgICAgICAgICBsZXQgc3JjID0gdGhpcy5wcm9wcy5wcm9maWxlc1twcm9maWxlSWRdLnByb2ZpbGVJbWFnZSB8fCBcImh0dHBzOi8vd3d3LmF0b21peC5jb20uYXUvbWVkaWEvMjAxNS8wNi9hdG9taXhfdXNlcjMxLnBuZ1wiXG4gICAgICAgICAgICByZXR1cm4gPGRpdiBrZXk9e2l9IGNsYXNzTmFtZT1cInNsaWRlVGlsZVwiIG9uQ2xpY2s9e3RoaXMuc3dpdGNoVXNlci5iaW5kKHRoaXMsIHByb2ZpbGVJZCl9PlxuICAgICAgICAgICAgICAgIDxpbWcgY2xhc3NOYW1lPVwicHJvZmlsZUNhcmRJbWFnZVwiIHNyYz17c3JjfS8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgfSlcblxuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInByb2ZpbGVTbGlkZXJcIj5cbiAgICAgICAgICAgICAgICB7cHJvZmlsZXN9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgUHJvZmlsZVNsaWRlclxuIiwiaW1wb3J0IFByb2ZpbGVTbGlkZXIgZnJvbSAnLi9Qcm9maWxlU2xpZGVyLmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBQcm9maWxlU2xpZGVyIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IHsgZ2V0VGltZSwgZ2V0RGF5TmFtZSB9IGZyb20gJy4uLy4uLy4uL3V0aWxzL2RhdGVUaW1lVXRpbHMuanMnXG5cbmNvbnN0IERBWVNfVE9fU0hPVyA9IDIwXG5jb25zdCBXRUVLX0RBWVMgPSBbJ1MnLCAnTScsICdUJywgJ1cnLCAnVCcsICdGJywgJ1MnXVxuY29uc3QgTU9OVEhTID0gWydKYW4nLCAnRmViJywgJ01hcicsICdBcHJpbCcsICdNYXknLCAnSnVuZScsICdKdWx5JywgJ0F1ZycsICdTZXB0JywgJ09jdCcsICdOb3YnLCAnRGVjJ11cblxuY2xhc3MgVGltZVNsb3RTZWxlY3RvciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgICB0aW1lU2VyaWVzOiBbXSxcbiAgICAgICAgICAgIHNlbGVjdGVkTW9udGg6IFwiXCIsXG4gICAgICAgICAgICBzZWxlY3RlZERheTogXCJcIlxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIHRoaXMuZ2VuZXJhdGVEYXlzKClcbiAgICB9XG5cbiAgICBnZW5lcmF0ZURheXMoKSB7XG4gICAgICAgIGxldCBkYXlzID0gW11cblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IERBWVNfVE9fU0hPVzsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgb2Zmc2V0RGF5ID0gbmV3IERhdGUoKVxuICAgICAgICAgICAgb2Zmc2V0RGF5LnNldERhdGUob2Zmc2V0RGF5LmdldERhdGUoKSArIGkpXG4gICAgICAgICAgICBsZXQgd2Vla0RheSA9IG9mZnNldERheS5nZXREYXkoKVxuXG4gICAgICAgICAgICBkYXlzLnB1c2goe1xuICAgICAgICAgICAgICAgIHRhZzogV0VFS19EQVlTW3dlZWtEYXldLFxuICAgICAgICAgICAgICAgIGRhdGVOdW1iZXI6IG9mZnNldERheS5nZXREYXRlKCksXG4gICAgICAgICAgICAgICAgYWN0dWFsRGF0ZTogb2Zmc2V0RGF5LFxuICAgICAgICAgICAgICAgIG1vbnRoOiBNT05USFNbb2Zmc2V0RGF5LmdldE1vbnRoKCldXG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICB0aW1lU2VyaWVzOiBkYXlzLFxuICAgICAgICAgICAgc2VsZWN0ZWREYXk6IGRheXNbMF0sXG4gICAgICAgICAgICBzZWxlY3RlZE1vbnRoOiBkYXlzWzBdLm1vbnRoXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgc2VsZWN0RGF5KGRheSkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHsgc2VsZWN0ZWREYXk6IGRheSB9KVxuICAgIH1cblxuICAgIHNlbGVjdE1vbnRoKG1vbnRoLGUpe1xuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBzZWxlY3RlZE1vbnRoOiBtb250aCB9KVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgbGV0IHNlbGVjdGVkU2NoZWR1bGUgPSB7IDA6IFtdLCAxOiBbXSwgMjogW10gfVxuICAgICAgICBpZiAodGhpcy5zdGF0ZS5zZWxlY3RlZERheSAmJiB0aGlzLnN0YXRlLnNlbGVjdGVkRGF5LmFjdHVhbERhdGUpIHtcbiAgICAgICAgICAgIGxldCB3ZWVrRGF5TnVtYmVyID0gdGhpcy5zdGF0ZS5zZWxlY3RlZERheS5hY3R1YWxEYXRlLmdldERheSgpXG4gICAgICAgICAgICBzZWxlY3RlZFNjaGVkdWxlID0gdGhpcy5wcm9wcy50aW1lU2xvdHNbd2Vla0RheU51bWJlcl0udGltaW5nXG4gICAgICAgIH1cblxuICAgICAgICAvLyBsZXQgbW9udGhOdW0gPSAobmV3IERhdGUpLmdldE1vbnRoKClcbiAgICAgICAgbGV0IHRoaXNNb250aCA9IE1PTlRIU1sobmV3IERhdGUpLmdldE1vbnRoKCldXG4gICAgICAgIGxldCBuZXh0TW9udGggPSBNT05USFNbKG5ldyBEYXRlKS5nZXRNb250aCgpKzFdXG4gICAgICAgIFxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIndpZGdldCBuby1zaGFkb3cgbm8tcm91bmQgc2tpbi10cmFuc3BhcmVudFwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIndpZGdldC1jb250ZW50XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkZC1uZXctdGltZSBtcmItMTBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDQgY2xhc3NOYW1lPVwidGV4dC1tZCBmdy03MDAgbXJiLTEwXCI+U2VsZWN0IERhdGUgJmFtcDsgVGltZTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBvbkNsaWNrPXt0aGlzLnNlbGVjdE1vbnRoLmJpbmQodGhpcyx0aGlzTW9udGgpfSBjbGFzc05hbWU9e1wiZmxvYXQtcmlnaHQgdGV4dC1tZCBmdy03MDAgdGV4dC1cIiArICh0aGlzTW9udGggPT09IHRoaXMuc3RhdGUuc2VsZWN0ZWRNb250aCA/IFwicHJpbWFyeVwiIDogXCJsaWdodFwiKX0+e3RoaXNNb250aH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBvbkNsaWNrPXt0aGlzLnNlbGVjdE1vbnRoLmJpbmQodGhpcyxuZXh0TW9udGgpfSBjbGFzc05hbWU9e1widGV4dC1cIiArIChuZXh0TW9udGggPT09IHRoaXMuc3RhdGUuc2VsZWN0ZWRNb250aCA/IFwicHJpbWFyeVwiIDogXCJsaWdodFwiKX0+e25leHRNb250aH08L3NwYW4+PC9zcGFuPjwvaDQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjaG9vc2UtdGltZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dWwgY2xhc3NOYW1lPVwiaW5saW5lLWxpc3QgZGF0ZXRpbWUtaXRlbXNcIj5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUudGltZVNlcmllcy5maWx0ZXIoKHRzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cy5tb250aCA9PT0gdGhpcy5zdGF0ZS5zZWxlY3RlZE1vbnRoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkubWFwKCh0cywgaSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gPGxpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e3RoaXMuc3RhdGUuc2VsZWN0ZWREYXkgPT0gdHMgPyAnYWN0aXZlJyA6IFwiXCJ9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk9e2l9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLnNlbGVjdERheS5iaW5kKHRoaXMsIHRzKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3RzLmRhdGVOdW1iZXJ9IDxzcGFuPnt0cy50YWd9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIndpZGdldFwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIndpZGdldC1jb250ZW50XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aDQgY2xhc3NOYW1lPVwicmVwb3J0LW9uIG1yYi0xMFwiPk1vcm5pbmc8L2g0PlxuICAgICAgICAgICAgICAgICAgICAgICAgPHVsIGNsYXNzTmFtZT1cImlubGluZS1saXN0IHRpbWUtaXRlbXNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkU2NoZWR1bGVbMF0ubWFwKCh0aW1lLCBpKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gPGxpIGtleT17aX0+PGEgaHJlZj1cIlwiIGNsYXNzTmFtZT1cInYtYnRuIHYtYnRuLXByaW1hcnkgYnRuLXNtIG91dGxpbmVcIj57dGltZVsxXX0gPC9hPjwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxoNCBjbGFzc05hbWU9XCJyZXBvcnQtb24gbXJiLTEwXCI+QWZ0ZXJub29uPC9oND5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx1bCBjbGFzc05hbWU9XCJpbmxpbmUtbGlzdCB0aW1lLWl0ZW1zXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZFNjaGVkdWxlWzFdLm1hcCgodGltZSwgaSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDxsaSBrZXk9e2l9PjxhIGhyZWY9XCJcIiBjbGFzc05hbWU9XCJ2LWJ0biB2LWJ0bi1wcmltYXJ5IGJ0bi1zbSBvdXRsaW5lXCI+e3RpbWVbMV19IDwvYT48L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aDQgY2xhc3NOYW1lPVwicmVwb3J0LW9uIG1yYi0xMFwiPkV2ZW5pbmc8L2g0PlxuICAgICAgICAgICAgICAgICAgICAgICAgPHVsIGNsYXNzTmFtZT1cImlubGluZS1saXN0IHRpbWUtaXRlbXNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkU2NoZWR1bGVbMl0ubWFwKCh0aW1lLCBpKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gPGxpIGtleT17aX0+PGEgaHJlZj1cIlwiIGNsYXNzTmFtZT1cInYtYnRuIHYtYnRuLXByaW1hcnkgYnRuLXNtIG91dGxpbmVcIj57dGltZVsxXX0gPC9hPjwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgVGltZVNsb3RTZWxlY3RvclxuIiwiaW1wb3J0IFRpbWVTbG90U2VsZWN0b3IgZnJvbSAnLi9UaW1lU2xvdFNlbGVjdG9yLmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBUaW1lU2xvdFNlbGVjdG9yIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IFByb2ZpbGVTbGlkZXIgZnJvbSAnLi4vcHJvZmlsZVNsaWRlci9pbmRleC5qcydcbmltcG9ydCBBcHBvaW50bWVudExpc3QgZnJvbSAnLi9hcHBvaW50bWVudExpc3QvaW5kZXguanMnXG5cbmNsYXNzIFVzZXJBcHBvaW50bWVudHNWaWV3IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcblxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIHRoaXMucHJvcHMuZ2V0VXNlclByb2ZpbGVXaXRoQXBwb2ludG1lbnRzKClcbiAgICB9XG5cbiAgICBzdGF0aWMgY29udGV4dFR5cGVzID0ge1xuICAgICAgICByb3V0ZXI6ICgpID0+IG51bGxcbiAgICB9XG5cbiAgICBjb21wYXJlRGF0ZVdpdGhUb2RheShkYXRlKXtcbiAgICAgICAgbGV0IHRvZGF5ID0gbmV3IERhdGUoKS5nZXRUaW1lKClcbiAgICAgICAgZGF0ZSA9IG5ldyBEYXRlKGRhdGUpLmdldFRpbWUoKVxuICAgICAgICByZXR1cm4gdG9kYXkgPiBkYXRlXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIGxldCBzZWxlY3RlZFVzZXIgPSBudWxsXG4gICAgICAgIGxldCB1c2VyUHJvZmlsZUlkID0gdGhpcy5wcm9wcy5tYXRjaC5wYXJhbXMuaWRcblxuICAgICAgICBpZiAodGhpcy5wcm9wcy5VU0VSLnByb2ZpbGVzW3VzZXJQcm9maWxlSWRdKSB7XG4gICAgICAgICAgICBzZWxlY3RlZFVzZXIgPSB0aGlzLnByb3BzLlVTRVIucHJvZmlsZXNbdXNlclByb2ZpbGVJZF1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIE9iamVjdC5rZXlzKHRoaXMucHJvcHMuVVNFUi5wcm9maWxlcykubWFwKChwcm9maWxlSWQpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5wcm9wcy5VU0VSLnByb2ZpbGVzW3Byb2ZpbGVJZF0uaXNEZWZhdWx0VXNlcikge1xuICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZFVzZXIgPSB0aGlzLnByb3BzLlVTRVIucHJvZmlsZXNbcHJvZmlsZUlkXVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ1c2VyUHJvZmlsZVwiPlxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgKCBzZWxlY3RlZFVzZXIgJiYgc2VsZWN0ZWRVc2VyLmFwcG9pbnRtZW50cyApID8gPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxQcm9maWxlU2xpZGVyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvZmlsZXM9e3RoaXMucHJvcHMuVVNFUi5wcm9maWxlc31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWJSb3V0ZT1cIi9hcHBvaW50bWVudHNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInVwY29taW5nYXBwXCI+VXBjb21pbmcgT1BEIEFwcG9pbnRtZW50czwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZFVzZXIuYXBwb2ludG1lbnRzLmZpbHRlcigoYXBwb2ludG1lbnQsaSkgPT57XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkYXRlID0gYXBwb2ludG1lbnQuc2xvdCA/IGFwcG9pbnRtZW50LnNsb3Quc3RhcnQgOiAwXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAhdGhpcy5jb21wYXJlRGF0ZVdpdGhUb2RheShkYXRlKSBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KS5tYXAoKGFwcG9pbnRtZW50LCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gPEFwcG9pbnRtZW50TGlzdCBrZXk9e2luZGV4fSBkYXRhPXthcHBvaW50bWVudH0gLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwicHJldmFwcFwiPlByZXZpb3VzIE9QRCBBcHBvaW50bWVudHM8L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRVc2VyLmFwcG9pbnRtZW50cy5maWx0ZXIoKGFwcG9pbnRtZW50LGkpID0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZGF0ZSA9IGFwcG9pbnRtZW50LnNsb3QgPyBhcHBvaW50bWVudC5zbG90LnN0YXJ0IDogMFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jb21wYXJlRGF0ZVdpdGhUb2RheShkYXRlKSBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KS5tYXAoKGFwcG9pbnRtZW50LCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gPEFwcG9pbnRtZW50TGlzdCBrZXk9e2luZGV4fSBkYXRhPXthcHBvaW50bWVudH0gLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj4gOiBcIlwiXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgVXNlckFwcG9pbnRtZW50c1ZpZXdcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUmlnaHRBcnJvd0ljb24gZnJvbSAnbWF0ZXJpYWwtdWktaWNvbnMvS2V5Ym9hcmRBcnJvd1JpZ2h0JztcblxuY2xhc3MgQXBwb2ludG1lbnRMaXN0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICB9XG5cbiAgICBnZXRUaW1lKHVuaXhfdGltZXN0YW1wKSB7XG4gICAgICAgIHZhciBkYXRlID0gbmV3IERhdGUodW5peF90aW1lc3RhbXAgKiAxMDAwKTtcbiAgICAgICAgdmFyIGhvdXJzID0gZGF0ZS5nZXRIb3VycygpO1xuICAgICAgICB2YXIgbWludXRlcyA9IFwiMFwiICsgZGF0ZS5nZXRNaW51dGVzKCk7XG4gICAgICAgIHJldHVybiBob3VycyArICc6JyArIG1pbnV0ZXMuc3Vic3RyKC0yKVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICBsZXQgeyBkb2N0b3JOYW1lLCBzbG90IH0gPSB0aGlzLnByb3BzLmRhdGFcbiAgICAgICAgc2xvdCA9IHNsb3QgfHwge1xuICAgICAgICAgICAgc3RhcnQ6IDAsXG4gICAgICAgICAgICBlbmQ6IDBcbiAgICAgICAgfVxuICAgICAgICBsZXQgZGF0ZSA9IG5ldyBEYXRlKHNsb3Quc3RhcnQpLnRvRGF0ZVN0cmluZygpXG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYXBwb2ludG1lbnRcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm5hbWVcIj5cblxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZGV0YWlsc1wiPlxuICAgICAgICAgICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtkb2N0b3JOYW1lfVxuICAgICAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgICAgIDxwPlxuICAgICAgICAgICAgICAgICAgICAgICAge2RhdGV9XG4gICAgICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICAgICAgPHA+XG4gICAgICAgICAgICAgICAgICAgICAgICB7dGhpcy5nZXRUaW1lKHNsb3Quc3RhcnQpICsgXCIgdG8gXCIgKyB0aGlzLmdldFRpbWUoc2xvdC5lbmQpfVxuICAgICAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJib29rXCI+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHRcIj5WaWV3IENvbmZpcm1hdGlvbjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPFJpZ2h0QXJyb3dJY29uIGNsYXNzTmFtZT1cImJvb2tJY29uXCIgLz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBBcHBvaW50bWVudExpc3RcbiIsImltcG9ydCBBcHBvaW50bWVudExpc3QgZnJvbSAnLi9BcHBvaW50bWVudExpc3QuanMnXG5cbmV4cG9ydCBkZWZhdWx0IEFwcG9pbnRtZW50TGlzdCIsImltcG9ydCBVc2VyQXBwb2ludG1lbnRzVmlldyBmcm9tICcuL1VzZXJBcHBvaW50bWVudHNWaWV3LmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBVc2VyQXBwb2ludG1lbnRzVmlldyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCBQcm9maWxlU2xpZGVyIGZyb20gJy4uL3Byb2ZpbGVTbGlkZXIvaW5kZXguanMnXG5pbXBvcnQgUHJvZmlsZURhdGEgZnJvbSAnLi9wcm9maWxlRGF0YS9pbmRleC5qcydcblxuY2xhc3MgVXNlclByb2ZpbGVWaWV3IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcblxuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgICB0aGlzLnByb3BzLmdldFVzZXJQcm9maWxlKClcbiAgICB9XG5cbiAgICBzdGF0aWMgY29udGV4dFR5cGVzID0ge1xuICAgICAgICByb3V0ZXI6ICgpID0+IG51bGxcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgbGV0IHNlbGVjdGVkVXNlciA9IG51bGxcbiAgICAgICAgbGV0IHVzZXJQcm9maWxlSWQgPSB0aGlzLnByb3BzLm1hdGNoLnBhcmFtcy5pZFxuXG4gICAgICAgIGlmICh0aGlzLnByb3BzLlVTRVIucHJvZmlsZXNbdXNlclByb2ZpbGVJZF0pIHtcbiAgICAgICAgICAgIHNlbGVjdGVkVXNlciA9IHRoaXMucHJvcHMuVVNFUi5wcm9maWxlc1t1c2VyUHJvZmlsZUlkXVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgT2JqZWN0LmtleXModGhpcy5wcm9wcy5VU0VSLnByb2ZpbGVzKS5tYXAoKHByb2ZpbGVJZCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnByb3BzLlVTRVIucHJvZmlsZXNbcHJvZmlsZUlkXS5pc0RlZmF1bHRVc2VyKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkVXNlciA9IHRoaXMucHJvcHMuVVNFUi5wcm9maWxlc1twcm9maWxlSWRdXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidXNlclByb2ZpbGVcIj5cbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkVXNlciA/IDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8UHJvZmlsZVNsaWRlciBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9maWxlcz17dGhpcy5wcm9wcy5VU0VSLnByb2ZpbGVzfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1YlJvdXRlPVwiXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8UHJvZmlsZURhdGEgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvZmlsZURhdGE9e3NlbGVjdGVkVXNlcn1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PiA6IFwiXCJcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBVc2VyUHJvZmlsZVZpZXdcbiIsImltcG9ydCBVc2VyUHJvZmlsZVZpZXcgZnJvbSAnLi9Vc2VyUHJvZmlsZVZpZXcuanMnXG5cbmV4cG9ydCBkZWZhdWx0IFVzZXJQcm9maWxlVmlldyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmNsYXNzIFByb2ZpbGVEYXRhIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICB9XG5cbiAgICBvcGVuQXBwb2ludG1lbnRzKHByb2ZpbGVJZCkge1xuICAgICAgICB0aGlzLmNvbnRleHQucm91dGVyLmhpc3RvcnkucHVzaChgL3VzZXIvJHtwcm9maWxlSWR9L2FwcG9pbnRtZW50c2ApXG5cbiAgICB9XG5cbiAgICBvcGVuUmVwb3J0cyhwcm9maWxlSWQpIHtcbiAgICAgICAgdGhpcy5jb250ZXh0LnJvdXRlci5oaXN0b3J5LnB1c2goYC91c2VyLyR7cHJvZmlsZUlkfS9yZXBvcnRzYClcblxuICAgIH1cblxuICAgIHN0YXRpYyBjb250ZXh0VHlwZXMgPSB7XG4gICAgICAgIHJvdXRlcjogKCkgPT4gbnVsbFxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICBsZXQge25hbWUsIGdlbmRlciwgYWdlLCBtb2JpbGUsIG1lZGljYWxIaXN0b3J5Q291bnQsIG1lZGljYWxUZXN0Q291bnQsIG9ubGluZUNvbnN1bHRhdGlvbkNvdW50LCBvcGRWaXNpdENvdW50LCBwcm9maWxlSWR9ID0gdGhpcy5wcm9wcy5wcm9maWxlRGF0YVxuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2PiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInVzZXJEZWFpbFwiPlxuICAgICAgICAgICAgICAgICAgICA8cD57bmFtZX08L3A+XG4gICAgICAgICAgICAgICAgICAgIDxwPnthZ2V9IFllYXJzPC9wPlxuICAgICAgICAgICAgICAgICAgICA8cD57Z2VuZGVyfTwvcD5cbiAgICAgICAgICAgICAgICAgICAgPHA+e21vYmlsZX08L3A+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwcm9maWxlQnRuc1wiPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uPlByb2ZpbGUgTm90IFZlcmlmaWVkPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24+Tm8gT1BEIEluc3VyYW5jZTwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uPk9ubGluZSBDb25zdWx0YXRpb25zKHtvbmxpbmVDb25zdWx0YXRpb25Db3VudH0pPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gb25DbGljaz17dGhpcy5vcGVuQXBwb2ludG1lbnRzLmJpbmQodGhpcyxwcm9maWxlSWQpfT5PUEQgVmlzaXRzICh7b3BkVmlzaXRDb3VudH0pPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24+TWVkaWNhbCBIaXN0b3J5ICh7bWVkaWNhbEhpc3RvcnlDb3VudH0pPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gb25DbGljaz17dGhpcy5vcGVuUmVwb3J0cy5iaW5kKHRoaXMscHJvZmlsZUlkKX0+VGVzdCBSZXBvcnRzICh7bWVkaWNhbFRlc3RDb3VudH0pPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgUHJvZmlsZURhdGFcbiIsImltcG9ydCBQcm9maWxlRGF0YSBmcm9tICcuL1Byb2ZpbGVEYXRhLmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBQcm9maWxlRGF0YSIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCBQcm9maWxlU2xpZGVyIGZyb20gJy4uL3Byb2ZpbGVTbGlkZXIvaW5kZXguanMnXG5pbXBvcnQgUmVwb3J0TGlzdCBmcm9tICcuL3JlcG9ydExpc3QvaW5kZXguanMnXG5cbmNsYXNzIFVzZXJSZXBvcnRzVmlldyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG5cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgICB0aGlzLnByb3BzLmdldFVzZXJQcm9maWxlV2l0aFRlc3RzKClcbiAgICB9XG5cbiAgICBzdGF0aWMgY29udGV4dFR5cGVzID0ge1xuICAgICAgICByb3V0ZXI6ICgpID0+IG51bGxcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgbGV0IHNlbGVjdGVkVXNlciA9IG51bGxcbiAgICAgICAgbGV0IHVzZXJQcm9maWxlSWQgPSB0aGlzLnByb3BzLm1hdGNoLnBhcmFtcy5pZFxuXG4gICAgICAgIGlmICh0aGlzLnByb3BzLlVTRVIucHJvZmlsZXNbdXNlclByb2ZpbGVJZF0pIHtcbiAgICAgICAgICAgIHNlbGVjdGVkVXNlciA9IHRoaXMucHJvcHMuVVNFUi5wcm9maWxlc1t1c2VyUHJvZmlsZUlkXVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gc2VsZWN0aW5nIGRlZmF1bHQgdXNlclxuICAgICAgICAgICAgT2JqZWN0LmtleXModGhpcy5wcm9wcy5VU0VSLnByb2ZpbGVzKS5tYXAoKHByb2ZpbGVJZCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnByb3BzLlVTRVIucHJvZmlsZXNbcHJvZmlsZUlkXS5pc0RlZmF1bHRVc2VyKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkVXNlciA9IHRoaXMucHJvcHMuVVNFUi5wcm9maWxlc1twcm9maWxlSWRdXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInVzZXJQcm9maWxlXCI+XG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAoc2VsZWN0ZWRVc2VyICYmIHNlbGVjdGVkVXNlci50ZXN0cykgPyA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPFByb2ZpbGVTbGlkZXJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9maWxlcz17dGhpcy5wcm9wcy5VU0VSLnByb2ZpbGVzfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1YlJvdXRlPVwiL3JlcG9ydHNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInVwY29taW5nYXBwXCI+UmVwb3J0czwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZFVzZXIudGVzdHMubWFwKCh0ZXN0LCBpKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiA8UmVwb3J0TGlzdFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YT17dGVzdH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleT17aX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PiA6IFwiXCJcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBVc2VyUmVwb3J0c1ZpZXdcbiIsImltcG9ydCBVc2VyUmVwb3J0c1ZpZXcgZnJvbSAnLi9Vc2VyUmVwb3J0c1ZpZXcuanMnXG5cbmV4cG9ydCBkZWZhdWx0IFVzZXJSZXBvcnRzVmlldyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmNsYXNzIFJlcG9ydExpc3QgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgIH1cblxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIGxldCB7IG5hbWUsIHN1Yl9uYW1lLCBhYmJyZXZpYXRpb24sIGNhdGVnb3J5LCBzbG90ICB9ID0gdGhpcy5wcm9wcy5kYXRhXG4gICAgICAgIHNsb3QgPSBzbG90IHx8IHtcbiAgICAgICAgICAgIHN0YXJ0OiAwLFxuICAgICAgICAgICAgZW5kOiAwXG4gICAgICAgIH1cbiAgICAgICAgbGV0IGRhdGUgPSBuZXcgRGF0ZShzbG90LnN0YXJ0KS50b0RhdGVTdHJpbmcoKVxuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFwcG9pbnRtZW50XCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJkZXRhaWxzXCI+XG4gICAgICAgICAgICAgICAgICAgIDxwPlxuICAgICAgICAgICAgICAgICAgICAgICAge25hbWUgKyBcIiAsIFwiICsgc3ViX25hbWV9XG4gICAgICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICAgICAgPHA+XG4gICAgICAgICAgICAgICAgICAgICAgICB7Y2F0ZWdvcnkgKyBcIiAsIFwiICsgYWJicmV2aWF0aW9ufVxuICAgICAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgICAgIDxwPlxuICAgICAgICAgICAgICAgICAgICAgICAge2RhdGV9XG4gICAgICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJvb2tcIj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidmlld3JlcG9ydFwiPlZpZXcgUmVwb3J0PC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IFJlcG9ydExpc3RcbiIsImltcG9ydCBSZXBvcnRMaXN0IGZyb20gJy4vUmVwb3J0TGlzdC5qcydcblxuZXhwb3J0IGRlZmF1bHQgUmVwb3J0TGlzdCIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmNvbnN0IHN0ZXBwZXJTdHlsZSA9IHtcbiAgICBwYWRkaW5nOiA2MCxcbiAgICBwYWRkaW5nQm90dG9tOiAwLFxuICAgIHBhZGRpbmdUb3A6IDEwLFxufVxuXG5cbmNsYXNzIFVzZXJTaWdudXBWaWV3IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIG5hbWU6ICcnLFxuICAgICAgICAgICAgYWdlOiAnJyxcbiAgICAgICAgICAgIGdlbmRlcjogJ20nLFxuICAgICAgICAgICAgZW1haWw6ICcnLFxuICAgICAgICAgICAgcGhvbmVfbnVtYmVyOiB0aGlzLnByb3BzLnBob25lTnVtYmVyLFxuICAgICAgICAgICAgb3RwOiAnJ1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIGlmICghdGhpcy5wcm9wcy5waG9uZU51bWJlcikge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5oaXN0b3J5LnJlcGxhY2UoJy9sb2dpbicpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpbnB1dEhhbmRsZXIoZSkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHsgW2UudGFyZ2V0Lm5hbWVdOiBlLnRhcmdldC52YWx1ZSB9KVxuICAgIH1cblxuICAgIHN1Ym1pdEZvcm0oKSB7XG4gICAgICAgIC8vIHZhbGlkYXRlXG4gICAgICAgIGxldCByZWdpc3RlciA9IHRydWVcbiAgICAgICAgT2JqZWN0LmtleXModGhpcy5yZWZzKS5mb3JFYWNoKChwcnAsIGkpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLnJlZnNbcHJwXS52YWx1ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMucmVmc1twcnBdLnN0eWxlLmJvcmRlciA9ICcnXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMucmVmc1twcnBdLnN0eWxlLmJvcmRlciA9ICcxcHggc29saWQgcmVkJ1xuICAgICAgICAgICAgICAgIHJlZ2lzdGVyID0gZmFsc2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcblxuICAgICAgICBpZiAocmVnaXN0ZXIpIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMucmVnaXN0ZXJVc2VyKHRoaXMuc3RhdGUsIChyZXMpID0+IHtcbiAgICAgICAgICAgICAgICBkZWJ1Z2dlclxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICA8aGVhZGVyIGNsYXNzTmFtZT1cInNraW4td2hpdGUgZml4ZWQgaG9yaXpvbnRhbCB0b3AgYmRyLTEgYm90dG9tIGxpZ2h0XCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGFpbmVyLWZsdWlkXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLTJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHVsIGNsYXNzTmFtZT1cImlubGluZS1saXN0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGk+PHNwYW4gY2xhc3NOYW1lPVwiaWNvbiBpY29uLXNtIHRleHQtbWlkZGxlIGJhY2staWNvbi13aGl0ZVwiPjwvc3Bhbj48L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLThcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJoZWFkZXItdGl0bGUgZnctNzAwIGNhcGl0YWxpemUgdGV4dC1jZW50ZXJcIj5TaWdudXAgVXNlcjwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLTJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2hlYWRlcj5cblxuICAgICAgICAgICAgICAgIDxzZWN0aW9uIGNsYXNzTmFtZT1cIndyYXAgdmFsaWRhdGlvbi1ib29rLXNjcmVlblwiPlxuXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3N0ZXBwZXJTdHlsZX0+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC0xMlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYXBwLXRpbWVsaW5lIGJvb2stY29uZmlybWVkLXRpbWVsaW5lXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx1bCBjbGFzc05hbWU9XCJpbmxpbmUtbGlzdFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpIGNsYXNzTmFtZT1cImFjdGl2ZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImRvdFwiPjE8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1zbSBmdy03MDAgdGV4dC1saWdodFwiPkRldGFpbHM8L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpPlxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImRvdFwiPjI8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1zbSBmdy03MDAgdGV4dC1saWdodFwiPk1lZGljYWw8L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3aWRnZXQgbm8tcm91bmQgbm8tc2hhZG93XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIndpZGdldC1jb250ZW50XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGZvcm0gY2xhc3NOYW1lPVwiZ28tYm90dG9tXCIgPlxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibGFiZWxXcmFwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgaWQ9XCJvdHBcIiBuYW1lPVwib3RwXCIgdHlwZT1cInRleHRcIiB2YWx1ZT17dGhpcy5zdGF0ZS5vdHB9IG9uQ2hhbmdlPXt0aGlzLmlucHV0SGFuZGxlci5iaW5kKHRoaXMpfSByZXF1aXJlZCByZWY9XCJvdHBcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGh0bWxGb3I9XCJvdHBcIj5FbnRlciBPVFA8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsYWJlbFdyYXBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCBpZD1cIm51bWJlclwiIG5hbWU9XCJwaG9uZV9udW1iZXJcIiB0eXBlPVwidGV4dFwiIG9uQ2hhbmdlPXsoKSA9PiB7IH19IHZhbHVlPXt0aGlzLnN0YXRlLnBob25lX251bWJlcn0gcmVxdWlyZWQgcmVmPVwicGhvbmVfbnVtYmVyXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBodG1sRm9yPVwibnVtYmVyXCI+TW9iaWxlIE51bWJlcjwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxhYmVsV3JhcFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IGlkPVwiZm5hbWVcIiBuYW1lPVwibmFtZVwiIHR5cGU9XCJ0ZXh0XCIgdmFsdWU9e3RoaXMuc3RhdGUubmFtZX0gb25DaGFuZ2U9e3RoaXMuaW5wdXRIYW5kbGVyLmJpbmQodGhpcyl9IHJlcXVpcmVkIHJlZj1cIm5hbWVcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGh0bWxGb3I9XCJmbmFtZVwiPlBhdGllbnQgTmFtZTwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXhzIHRleHQtbGlnaHRcIj4oQXBwb2lubWVudCB2YWxpZCBvbmx5IGZvciB0aGUgcHJvdmlkZWQgbmFtZSk8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxhYmVsV3JhcFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IGlkPVwiYWdlXCIgbmFtZT1cImFnZVwiIHR5cGU9XCJ0ZXh0XCIgdmFsdWU9e3RoaXMuc3RhdGUuYWdlfSBvbkNoYW5nZT17dGhpcy5pbnB1dEhhbmRsZXIuYmluZCh0aGlzKX0gcmVxdWlyZWQgcmVmPVwiYWdlXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBodG1sRm9yPVwiYWdlXCI+QWdlPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cCBpbnB1dC1ncm91cFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImlubGluZSBpbnB1dC1sYWJlbFwiPkdlbmRlcjwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNob29zZS1nZW5kZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwicmFkaW8taW5saW5lXCI+PGlucHV0IHZhbHVlPXsnbSd9IG9uQ2hhbmdlPXt0aGlzLmlucHV0SGFuZGxlci5iaW5kKHRoaXMpfSBjaGVja2VkPXt0aGlzLnN0YXRlLmdlbmRlciA9PSAnbSd9IHR5cGU9XCJyYWRpb1wiIG5hbWU9XCJnZW5kZXJcIiAvPk1hbGU8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJyYWRpby1pbmxpbmVcIj48aW5wdXQgdmFsdWU9eydmJ30gb25DaGFuZ2U9e3RoaXMuaW5wdXRIYW5kbGVyLmJpbmQodGhpcyl9IGNoZWNrZWQ9e3RoaXMuc3RhdGUuZ2VuZGVyID09ICdmJ30gdHlwZT1cInJhZGlvXCIgbmFtZT1cImdlbmRlclwiIC8+RmVtYWxlPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwicmFkaW8taW5saW5lXCI+PGlucHV0IHZhbHVlPXsnbyd9IG9uQ2hhbmdlPXt0aGlzLmlucHV0SGFuZGxlci5iaW5kKHRoaXMpfSBjaGVja2VkPXt0aGlzLnN0YXRlLmdlbmRlciA9PSAnbyd9IHR5cGU9XCJyYWRpb1wiIG5hbWU9XCJnZW5kZXJcIiAvPk90aGVyPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsYWJlbFdyYXBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCBpZD1cImVtYWlsXCIgbmFtZT1cImVtYWlsXCIgdHlwZT1cInRleHRcIiB2YWx1ZT17dGhpcy5zdGF0ZS5lbWFpbH0gb25DaGFuZ2U9e3RoaXMuaW5wdXRIYW5kbGVyLmJpbmQodGhpcyl9IHJlcXVpcmVkIHJlZj1cImVtYWlsXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBodG1sRm9yPVwiZW1haWxcIj5FbWFpbDwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9mb3JtPlxuXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICA8L3NlY3Rpb24+XG5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJlcnJvck1lc3NhZ2VcIj57dGhpcy5wcm9wcy5lcnJvcl9tZXNzYWdlfTwvc3Bhbj5cblxuICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwidi1idG4gdi1idG4tcHJpbWFyeSBidG4tbGcgZml4ZWQgaG9yaXpvbnRhbCBib3R0b20gbm8tcm91bmQgYnRuLWxnIHRleHQtbGdcIiBvbkNsaWNrPXt0aGlzLnN1Ym1pdEZvcm0uYmluZCh0aGlzKX0+TmV4dDwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IFVzZXJTaWdudXBWaWV3XG4iLCJpbXBvcnQgVXNlclNpZ251cFZpZXcgZnJvbSAnLi9Vc2VyU2lnbnVwJ1xuXG5leHBvcnQgZGVmYXVsdCBVc2VyU2lnbnVwVmlldyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnXG5cbmltcG9ydCBMb2FkZXIgZnJvbSAnLi4vLi4vY29tbW9ucy9Mb2FkZXInXG5pbXBvcnQgVmlzaXRUaW1lIGZyb20gJy4vdmlzaXRUaW1lJ1xuaW1wb3J0IFBpY2t1cEFkZHJlc3MgZnJvbSAnLi9waWNrdXBBZGRyZXNzJ1xuaW1wb3J0IENob29zZVBhdGllbnQgZnJvbSAnLi9jaG9vc2VQYXRpZW50J1xuXG5jbGFzcyBCb29raW5nU3VtbWFyeVZpZXcgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgc2VsZWN0ZWRMYWI6IHRoaXMucHJvcHMubWF0Y2gucGFyYW1zLmlkLFxuICAgICAgICAgICAgcGlja3VwVHlwZTogXCJsYWJcIlxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIHRoaXMucHJvcHMuZ2V0TGFiQnlJZCh0aGlzLnN0YXRlLnNlbGVjdGVkTGFiKVxuICAgIH1cblxuICAgIG9wZW5UZXN0cygpIHtcbiAgICAgICAgdGhpcy5wcm9wcy5oaXN0b3J5LnB1c2goYC9sYWIvJHt0aGlzLnN0YXRlLnNlbGVjdGVkTGFifS90ZXN0c2ApXG4gICAgfVxuXG4gICAgaGFuZGxlUGlja3VwVHlwZShlKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBwaWNrdXBUeXBlOiBlLnRhcmdldC52YWx1ZSB9KVxuICAgIH1cblxuICAgIGdldFNlbGVjdG9ycygpIHtcbiAgICAgICAgc3dpdGNoICh0aGlzLnN0YXRlLnBpY2t1cFR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgXCJsYWJcIjoge1xuICAgICAgICAgICAgICAgIHJldHVybiA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICA8VmlzaXRUaW1lIHR5cGU9XCJsYWJcIi8+XG4gICAgICAgICAgICAgICAgICAgIDxDaG9vc2VQYXRpZW50IC8+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNhc2UgXCJob21lXCI6IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgPFZpc2l0VGltZSB0eXBlPVwiaG9tZVwiLz5cbiAgICAgICAgICAgICAgICAgICAgPENob29zZVBhdGllbnQgLz5cbiAgICAgICAgICAgICAgICAgICAgPFBpY2t1cEFkZHJlc3MgLz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIGxldCB0ZXN0cyA9IFtdXG4gICAgICAgIGxldCBmaW5hbFByaWNlID0gMFxuICAgICAgICBsZXQgbGFiRGV0YWlsID0ge31cblxuICAgICAgICBpZiAodGhpcy5wcm9wcy5MQUJTW3RoaXMuc3RhdGUuc2VsZWN0ZWRMYWJdKSB7XG4gICAgICAgICAgICBsYWJEZXRhaWwgPSB0aGlzLnByb3BzLkxBQlNbdGhpcy5zdGF0ZS5zZWxlY3RlZExhYl0ubGFiXG4gICAgICAgICAgICB0ZXN0cyA9IHRoaXMucHJvcHMuc2VsZWN0ZWRDcml0ZXJpYXMuZmlsdGVyKHggPT4geC50eXBlID09ICd0ZXN0JykubWFwKCh0ZXN0LCBpKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IHByaWNlID0gMFxuICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuTEFCU1t0aGlzLnN0YXRlLnNlbGVjdGVkTGFiXS50ZXN0cy5tYXAoKHR3cCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAodHdwLnRlc3RfaWQgPT0gdGVzdC5pZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcHJpY2UgPSB0d3AubXJwXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIGZpbmFsUHJpY2UgKz0gcHJpY2VcbiAgICAgICAgICAgICAgICByZXR1cm4gPHAga2V5PXtpfSBjbGFzc05hbWU9XCJ0ZXN0LWxpc3RcIj57dGVzdC5uYW1lfTxzcGFuIGNsYXNzTmFtZT1cImZsb2F0LXJpZ2h0IGZ3LTcwMFwiPlJzLiB7cHJpY2V9PC9zcGFuPjwvcD5cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICA8aGVhZGVyIGNsYXNzTmFtZT1cInNraW4td2hpdGUgZml4ZWQgaG9yaXpvbnRhbCB0b3AgYmRyLTEgYm90dG9tIGxpZ2h0XCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGFpbmVyLWZsdWlkXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLTJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHVsIGNsYXNzTmFtZT1cImlubGluZS1saXN0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGkgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuaGlzdG9yeS5nbygtMSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19PjxzcGFuIGNsYXNzTmFtZT1cImljb24gaWNvbi1zbSB0ZXh0LW1pZGRsZSBiYWNrLWljb24td2hpdGVcIj48aW1nIHNyYz1cIi9hc3NldHMvaW1nL2N1c3RvbWVyLWljb25zL2JhY2staWNvbi5wbmdcIiBjbGFzc05hbWU9XCJpbWctZmx1aWRcIiAvPjwvc3Bhbj48L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLThcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJoZWFkZXItdGl0bGUgZnctNzAwIGNhcGl0YWxpemUgdGV4dC1jZW50ZXJcIj5Cb29raW5nIENvbmZpcm1hdGlvbjwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLTJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgey8qIDx1bCBjbGFzcz1cImlubGluZS1saXN0IGZsb2F0LXJpZ2h0IHVzZXItbm90aWZpY2F0aW9uLWFjdGlvblwiPlxuXHRcdFx0XHRcdFx0PGxpPjxzcGFuIGNsYXNzPVwiaWNvbiBpY29uLW1kIHRleHQtbWlkZGxlXCI+PGltZyBzcmM9XCIvYXNzZXRzL2ltZy9jdXN0b21lci1pY29ucy91c2VyLnN2Z1wiIGNsYXNzPVwiaW1nLWZsdWlkXCI+PC9zcGFuPjwvbGk+XG5cdFx0XHRcdFx0XHQ8bGk+PHNwYW4gY2xhc3M9XCJpY29uIGljb24tbWQgdGV4dC1taWRkbGUgbm90aWZpY2F0aW9uLWljb25cIj48aW1nIHNyYz1cIi9hc3NldHMvaW1nL2N1c3RvbWVyLWljb25zL25vdGlmaWNhdGlvbi5zdmdcIiBjbGFzcz1cImltZy1mbHVpZFwiPiA8c3BhbiBjbGFzcz1cIm5vdGlmaWNhdGlvbi1hbGVydFwiPjwvc3Bhbj48L3NwYW4+PC9saT5cblx0XHRcdFx0XHQ8L3VsPiAqL31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2hlYWRlcj5cblxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5MQUJTW3RoaXMuc3RhdGUuc2VsZWN0ZWRMYWJdID9cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNlY3Rpb24gY2xhc3NOYW1lPVwid3JhcCBib29raW5nLWNvbmZpcm0tc2NyZWVuXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGFpbmVyLWZsdWlkXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLTEyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwid2lkZ2V0IG1ydC0xMFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3aWRnZXQtaGVhZGVyIGJkci0xIGJvdHRvbSBsaWdodCB0ZXh0LWNlbnRlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx1bCBjbGFzc05hbWU9XCJpbmxpbmUtbGlzdCBib29raW5nLXR5cGVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpPjxsYWJlbCBjbGFzc05hbWU9XCJyYWRpby1pbmxpbmUgdGV4dC1tZCBmdy03MDAgdGV4dC1wcmltYXJ5XCI+PGlucHV0IHR5cGU9XCJyYWRpb1wiIG5hbWU9XCJvcHRyYWRpb1wiIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZVBpY2t1cFR5cGUuYmluZCh0aGlzKX0gdmFsdWU9XCJob21lXCIgY2hlY2tlZD17dGhpcy5zdGF0ZS5waWNrdXBUeXBlID09ICdob21lJ30gLz4gSG9tZSBQaWNrLXVwPC9sYWJlbD48L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGk+PGxhYmVsIGNsYXNzTmFtZT1cInJhZGlvLWlubGluZSB0ZXh0LW1kIGZ3LTcwMCB0ZXh0LXByaW1hcnlcIj48aW5wdXQgdHlwZT1cInJhZGlvXCIgbmFtZT1cIm9wdHJhZGlvXCIgb25DaGFuZ2U9e3RoaXMuaGFuZGxlUGlja3VwVHlwZS5iaW5kKHRoaXMpfSB2YWx1ZT1cImxhYlwiIGNoZWNrZWQ9e3RoaXMuc3RhdGUucGlja3VwVHlwZSA9PSAnbGFiJ30gLz4gTGFiIFZpc2l0PC9sYWJlbD48L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwid2lkZ2V0LWNvbnRlbnRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxhYi1kZXRhaWxzXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbWcgc3JjPVwiL2Fzc2V0cy9pbWcvY3VzdG9tZXItaWNvbnMvbGFiMS5wbmdcIiBjbGFzc05hbWU9XCJpbWctZmx1aWRcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxhYi10aXRsZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGg0IGNsYXNzTmFtZT1cImZ3LTcwMCB0ZXh0LW1kIHRpdGxlXCI+e2xhYkRldGFpbC5uYW1lfTwvaDQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJmdy01MDAgdGV4dC1zbSB0ZXh0LWxpZ2h0XCI+e2xhYkRldGFpbC5hZGRyZXNzfTwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7dGhpcy5nZXRTZWxlY3RvcnMoKX1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibGFiLXZpc2l0LXRpbWUgdGVzdC1yZXBvcnRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGg0IGNsYXNzTmFtZT1cInRpdGxlXCI+PHNwYW4+PGltZyBzcmM9XCIvYXNzZXRzL2ltZy9jdXN0b21lci1pY29ucy90ZXN0LnN2Z1wiIC8+PC9zcGFuPlRlc3RzIDxzcGFuIGNsYXNzTmFtZT1cImZsb2F0LXJpZ2h0XCI+PGEgb25DbGljaz17dGhpcy5vcGVuVGVzdHMuYmluZCh0aGlzKX0gY2xhc3NOYW1lPVwidGV4dC1wcmltYXJ5IGZ3LTcwMCB0ZXh0LXNtXCI+Q2hhbmdlIFRlc3RzPC9hPjwvc3Bhbj48L2g0PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7dGVzdHN9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zZWN0aW9uPlxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJ2LWJ0biB2LWJ0bi1wcmltYXJ5IGJ0bi1sZyBmaXhlZCBob3Jpem9udGFsIGJvdHRvbSBuby1yb3VuZCBidG4tbGcgdGV4dC1sZ1wiPlByb2NlZWQgdG8gUGF5IFJzLiB7ZmluYWxQcmljZX08L2J1dHRvbj5cblxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+IDogPExvYWRlciAvPlxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IEJvb2tpbmdTdW1tYXJ5Vmlld1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuY2xhc3MgQ2hvb3NlUGF0aWVudCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG5cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsYWItdmlzaXQtdGltZVwiPlxuICAgICAgICAgICAgICAgIDxoNCBjbGFzc05hbWU9XCJ0aXRsZVwiPjxzcGFuPjxpbWcgc3JjPVwiL2Fzc2V0cy9pbWcvY3VzdG9tZXItaWNvbnMvY2xvY2suc3ZnXCIgLz48L3NwYW4+UGF0aWVudCBEZXRhaWxzIDxzcGFuIGNsYXNzTmFtZT1cImZsb2F0LXJpZ2h0XCI+PGEgaHJlZj1cIiNcIiBjbGFzc05hbWU9XCJ0ZXh0LXByaW1hcnkgZnctNzAwIHRleHQtc21cIj5QaWNrIFBhdGllbnQ8L2E+PC9zcGFuPjwvaDQ+XG4gICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwiZGF0ZS10aW1lXCI+RHVtbXkgVXNlcjwvcD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBDaG9vc2VQYXRpZW50XG4iLCJpbXBvcnQgQm9va2luZ1N1bW1hcnlWaWV3IGZyb20gJy4vQm9va2luZ1N1bW1hcnlWaWV3LmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBCb29raW5nU3VtbWFyeVZpZXciLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5jbGFzcyBQaWNrdXBBZGRyZXNzIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcblxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxhYi12aXNpdC10aW1lXCI+XG4gICAgICAgICAgICAgICAgPGg0IGNsYXNzTmFtZT1cInRpdGxlXCI+PHNwYW4+PGltZyBzcmM9XCIvYXNzZXRzL2ltZy9jdXN0b21lci1pY29ucy9jbG9jay5zdmdcIiAvPjwvc3Bhbj5QaWNrdXAgQWRkcmVzcyA8c3BhbiBjbGFzc05hbWU9XCJmbG9hdC1yaWdodFwiPjxhIGhyZWY9XCIjXCIgY2xhc3NOYW1lPVwidGV4dC1wcmltYXJ5IGZ3LTcwMCB0ZXh0LXNtXCI+Q2hhbmdlIEFkZHJlc3M8L2E+PC9zcGFuPjwvaDQ+XG4gICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwiZGF0ZS10aW1lXCI+MTh0aCBBcHJpbCB8IDM6MzAgUE08L3A+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgUGlja3VwQWRkcmVzc1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuY2xhc3MgVmlzaXRUaW1lIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcblxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxhYi12aXNpdC10aW1lXCI+XG4gICAgICAgICAgICAgICAgPGg0IGNsYXNzTmFtZT1cInRpdGxlXCI+PHNwYW4+PGltZyBzcmM9XCIvYXNzZXRzL2ltZy9jdXN0b21lci1pY29ucy9jbG9jay5zdmdcIiAvPjwvc3Bhbj5WaXNpdCB0aW1lIDxzcGFuIGNsYXNzTmFtZT1cImZsb2F0LXJpZ2h0XCI+PGEgaHJlZj1cIiNcIiBjbGFzc05hbWU9XCJ0ZXh0LXByaW1hcnkgZnctNzAwIHRleHQtc21cIj5DaGFuZ2UgVGltZTwvYT48L3NwYW4+PC9oND5cbiAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJkYXRlLXRpbWVcIj4xOHRoIEFwcmlsIHwgMzozMCBQTTwvcD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBWaXNpdFRpbWVcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG5pbXBvcnQgTGFiVGVzdHMgZnJvbSAnLi4vbGFiVGVzdHMnXG5cbmNsYXNzIExhYkRldGFpbHMgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8c2VjdGlvbiBjbGFzc05hbWU9XCJ3cmFwIHByb2ZpbGUtYm9vay1zY3JlZW5cIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lci1mbHVpZFwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtMTJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIndpZGdldCBwcm9maWxlLWJvb2tcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3aWRnZXQtaGVhZGVyIHBiLWhlYWRlciB0ZXh0LWNlbnRlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwYi1sb2dvXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGltZyBzcmM9XCIvYXNzZXRzL2ltZy9jdXN0b21lci1pY29ucy9sYWIxLnBuZ1wiIGNsYXNzTmFtZT1cImltZy1mbHVpZFwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoNCBjbGFzc05hbWU9XCJ3aWRnZXQtdGl0bGUgcGItdGl0bGVcIj5TUkwgRGlnbm9zdGljczwvaDQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJsb2NhdGlvblwiPlNlY3RvciA1MiBHdXJnYW9uIHwgPHNwYW4gY2xhc3NOYW1lPVwiY3QtaW1nIGN0LWltZy14c1wiPjxpbWcgc3JjPVwiL2Fzc2V0cy9pbWcvY3VzdG9tZXItaWNvbnMvbWFwLW1hcmtlci5zdmdcIiBjbGFzc05hbWU9XCJpbWctZmx1aWRcIiAvPjwvc3Bhbj4xLjVLTTwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx1bCBjbGFzc05hbWU9XCJsaXN0IHRpbWUtY29udGFjdFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZnctNzAwIHRleHQtc21cIj5UaW1pbmc6IC08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDc6MzAgQU0gdG8gODozMCBQTVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJvcGVuLWNsb3NlXCI+T3BlbiBUb2RheTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZnctNzAwIHRleHQtc21cIj5Db250YWN0OiAtPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAwMTIwIDEyMzQ1NjcsIDAxMjAgNzY1NDMyMVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJvcGVuLWNsb3NlXCI+Q2FsbCBOb3c8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxMYWJUZXN0cyB7Li4udGhpcy5wcm9wc30gLz5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIndpZGdldC1jb250ZW50IHBiLWRldGFpbHMgcGItbG9jYXRpb25cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoNCBjbGFzc05hbWU9XCJ3Yy10aXRsZSB0ZXh0LW1kIGZ3LTcwMFwiPkxvY2F0aW9uPC9oND5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRkcmVzcy1kZXRhaWxzXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGltZyBzcmM9XCIvYXNzZXRzL2ltZy9jdXN0b21lci1pY29ucy9tYXAtaWNvbi5wbmdcIiBjbGFzc05hbWU9XCJpbWctZmx1aWQgYWRkLW1hcFwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwiYWRkLWluZm9cIj4xOTYsIEh1ZGEgUGxvdCwgTmVhciwgRGV2aW5kZXIgVmloYXIsIFNlY3RvciA1NiwgR3VydWdyYW0sIEhhcnlhbmEgMTIyMDExPC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBiLXZpZXcgdGV4dC1sZWZ0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGEgaHJlZj1cIiNcIiBjbGFzc05hbWU9XCJsaW5rLXRleHQgdGV4dC1tZCBmdy03MDBcIj5WaWV3IGluIEdvb2dsZSBNYXA8L2E+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwid2lkZ2V0LWNvbnRlbnQgcGItZGV0YWlscyBwYi1mYWNpbGl0eVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGg0IGNsYXNzTmFtZT1cIndjLXRpdGxlIHRleHQtbWQgZnctNzAwXCI+RmFjaWxpdHk8L2g0PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHVsIGNsYXNzTmFtZT1cImxpc3QgcGItbGlzdCBmYWNpbHR5LWxpc3RcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGk+UGFya2luZyBBdmFpbGFibGU8L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaT5DYXJkIEFjY2VwdGVkPC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGk+RSBSZXBvcnQgQXZhaWxhYmxlPC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGk+SG9tZSBDaGVrdXAgQXZhaWxhYmxlPC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIndpZGdldC1jb250ZW50IHBiLWRldGFpbHMgcGItYWJvdXRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoNCBjbGFzc05hbWU9XCJ3Yy10aXRsZSB0ZXh0LW1kIGZ3LTcwMFwiPkFib3V0PC9oND5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwPkxvcmVtIGlwc3VtIGRvbG9yIHNpdCBhbWV0LCBjb25zZWN0ZXR1ciBhZGlwaXNpY2luZyBlbGl0LCBzZWQgZG8gZWl1c21vZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZW1wb3IgaW5jaWRpZHVudCB1dCBsYWJvcmUgZXQgZG9sb3JlIG1hZ25hIGFsaXF1YS4gVXQgZW5pbSBhZCBtaW5pbSB2ZW5pYW0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBxdWlzIG5vc3RydWQgZXhlcmNpdGF0aW9uIHVsbGFtY28gbGFib3JpcyBuaXNpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9zZWN0aW9uPlxuICAgICAgICApO1xuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBMYWJEZXRhaWxzXG4iLCJpbXBvcnQgTGFiRGV0YWlscyBmcm9tICcuL0xhYkRldGFpbC5qcydcblxuZXhwb3J0IGRlZmF1bHQgTGFiRGV0YWlscyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmNsYXNzIExhYlByb2ZpbGVDYXJkIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICB9XG5cbiAgICBvcGVuTGFiKGlkKXtcbiAgICAgICAgdGhpcy5wcm9wcy5oaXN0b3J5LnB1c2goYC9sYWIvJHtpZH1gKVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICBsZXQgeyBwcmljZSwgbGFiIH0gPSB0aGlzLnByb3BzLmRldGFpbHNcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3aWRnZXQgY2FyZFwiIG9uQ2xpY2s9e3RoaXMub3BlbkxhYi5iaW5kKHRoaXMsdGhpcy5wcm9wcy5kZXRhaWxzLmxhYi5pZCl9PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwid2lkZ2V0LWNvbnRlbnQgY2FyZC1jb250ZW50IGJvb2stY2FyZFwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxvZ28tcmF0dGluZ1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiY3QtaW1nIGxhYi1pY29uXCI+PGltZyBzcmM9XCIvYXNzZXRzL2ltZy9jdXN0b21lci1pY29ucy9sYWIxLnBuZ1wiIGNsYXNzTmFtZT1cImltZy1mbHVpZFwiIC8+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHVsIGNsYXNzTmFtZT1cImlubGluZS1saXN0IHJhdHRpbmdcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGk+PHNwYW4gY2xhc3NOYW1lPVwiY3QtaW1nIGN0LWltZy14cyBzdGFyLWljb25cIj48aW1nIHNyYz1cIi9hc3NldHMvaW1nL2N1c3RvbWVyLWljb25zL3N0YXIuc3ZnXCIgY2xhc3NOYW1lPVwiaW1nLWZsdWlkXCIgLz48L3NwYW4+PC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGk+PHNwYW4gY2xhc3NOYW1lPVwiY3QtaW1nIGN0LWltZy14cyBzdGFyLWljb25cIj48aW1nIHNyYz1cIi9hc3NldHMvaW1nL2N1c3RvbWVyLWljb25zL3N0YXIuc3ZnXCIgY2xhc3NOYW1lPVwiaW1nLWZsdWlkXCIgLz48L3NwYW4+PC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGk+PHNwYW4gY2xhc3NOYW1lPVwiY3QtaW1nIGN0LWltZy14cyBzdGFyLWljb25cIj48aW1nIHNyYz1cIi9hc3NldHMvaW1nL2N1c3RvbWVyLWljb25zL3N0YXIuc3ZnXCIgY2xhc3NOYW1lPVwiaW1nLWZsdWlkXCIgLz48L3NwYW4+PC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGk+PHNwYW4gY2xhc3NOYW1lPVwiY3QtaW1nIGN0LWltZy14cyBzdGFyLWljb25cIj48aW1nIHNyYz1cIi9hc3NldHMvaW1nL2N1c3RvbWVyLWljb25zL3N0YXIuc3ZnXCIgY2xhc3NOYW1lPVwiaW1nLWZsdWlkXCIgLz48L3NwYW4+PC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGk+PHNwYW4gY2xhc3NOYW1lPVwiY3QtaW1nIGN0LWltZy14cyBzdGFyLWljb25cIj48aW1nIHNyYz1cIi9hc3NldHMvaW1nL2N1c3RvbWVyLWljb25zL2hhbGYtc3Rhci5zdmdcIiBjbGFzc05hbWU9XCJpbWctZmx1aWRcIiAvPjwvc3Bhbj48L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwidi1idG4gdi1idG4tcHJpbWFyeSBwaWNrdXAtYnRuXCI+UGlja3VwIEF2YWlsYWJsZTwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJib29rLWNhcmQtY29udGVudFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGg0IGNsYXNzTmFtZT1cImJvb2stY2FydC10aXRsZVwiPntsYWIubmFtZX08L2g0PlxuICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwiZGVzY1wiPkJsb29kIFRlc3QsIFBhdGhvbG9neSBVbHRyYXNvdW5kLCBNUkksIENUSSBTZWN0b3IgNTIgR3VyZ2FvbiB8IDxzcGFuIGNsYXNzTmFtZT1cInRleHQtcHJpbWFyeSBmdy03MDBcIj4xLjUgS008L3NwYW4+PC9wPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIndpZGdldC1mb290ZXIgY2FyZC1mb290ZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLTZcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJsYWItcHJpY2VcIj5Ub3RhbCBScyB7cHJpY2V9PC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC02IHRleHQtcmlnaHRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cInYtYnRuIHYtYnRuLXByaW1hcnkgYnRuLW1kXCI+Qm9vayBMYWI8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBMYWJQcm9maWxlQ2FyZFxuIiwiaW1wb3J0IExhYlByb2ZpbGVDYXJkIGZyb20gJy4vTGFiUHJvZmlsZUNhcmQuanMnXG5cbmV4cG9ydCBkZWZhdWx0IExhYlByb2ZpbGVDYXJkIiwiaW1wb3J0IExhYlRlc3RzIGZyb20gJy4vbGFiVGVzdHMnXG5cbmV4cG9ydCBkZWZhdWx0IExhYlRlc3RzIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cbmNsYXNzIExhYlRlc3RzIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcblxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgIH1cblxuICAgIG9wZW5UZXN0cygpIHtcbiAgICAgICAgdGhpcy5wcm9wcy5oaXN0b3J5LnB1c2goYC9sYWIvJHt0aGlzLnByb3BzLmRhdGEubGFiLmlkfS90ZXN0c2ApXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIGxldCB0ZXN0cyA9IFtdXG4gICAgICAgIGlmICh0aGlzLnByb3BzLmRhdGEudGVzdHMgJiYgdGhpcy5wcm9wcy5kYXRhLnRlc3RzLmxlbmd0aCkge1xuICAgICAgICAgICAgdGVzdHMgPSB0aGlzLnByb3BzLmRhdGEudGVzdHMubWFwKCh0ZXN0LCBpKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIDxsaSBrZXk9e2l9Pnt0ZXN0LnRlc3QubmFtZX0gPHNwYW4gY2xhc3NOYW1lPVwidGVzdC1wcmljZVwiPlJzIHt0ZXN0Lm1ycH08L3NwYW4+PC9saT5cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3aWRnZXQtY29udGVudCBwYi1kZXRhaWxzIHBiLXRlc3RcIj5cbiAgICAgICAgICAgICAgICA8aDQgY2xhc3NOYW1lPVwid2MtdGl0bGUgdGV4dC1tZCBmdy03MDBcIj5UZXN0cyAoe3Rlc3RzLmxlbmd0aH0pPC9oND5cbiAgICAgICAgICAgICAgICA8dWwgY2xhc3NOYW1lPVwibGlzdCBwYi1saXN0IHBiLXRlc3QtbGlzdFwiPlxuICAgICAgICAgICAgICAgICAgICB7dGVzdHMuc2xpY2UoMCwzKX1cbiAgICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGItdmlldyB0ZXh0LXJpZ2h0XCI+XG4gICAgICAgICAgICAgICAgICAgIDxhIGNsYXNzTmFtZT1cImxpbmstdGV4dCB0ZXh0LW1kIGZ3LTcwMFwiIG9uQ2xpY2s9e3RoaXMub3BlblRlc3RzLmJpbmQodGhpcyl9PlZpZXcgQWxsPC9hPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IExhYlRlc3RzXG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcblxuaW1wb3J0IEV4cGFuc2lvblBhbmVsLCB7XG4gICAgRXhwYW5zaW9uUGFuZWxTdW1tYXJ5LFxuICAgIEV4cGFuc2lvblBhbmVsRGV0YWlscyxcbn0gZnJvbSAnbWF0ZXJpYWwtdWkvRXhwYW5zaW9uUGFuZWwnO1xuaW1wb3J0IEV4cGFuZE1vcmVJY29uIGZyb20gJ21hdGVyaWFsLXVpLWljb25zL0V4cGFuZE1vcmUnO1xuXG5cbmNsYXNzIE9yZGVyRGV0YWlscyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgbGV0IHByaWNlX2JyZWFrdXAgPSBbXVxuICAgICAgICBsZXQgdG90YWxQcmljZSA9IDBcbiAgICAgICAgbGV0IHRvdGFsVGVzdHMgPSAwXG4gICAgICAgIGlmICh0aGlzLnByb3BzLmRhdGEucHJpY2VfYnJlYWt1cCAmJiB0aGlzLnByb3BzLmRhdGEucHJpY2VfYnJlYWt1cC5icmVha3VwKSB7XG4gICAgICAgICAgICBwcmljZV9icmVha3VwID0gdGhpcy5wcm9wcy5kYXRhLnByaWNlX2JyZWFrdXAuYnJlYWt1cC5tYXAoKHRlc3QsIGkpID0+IHtcbiAgICAgICAgICAgICAgICB0b3RhbFByaWNlICs9IHRlc3QuYW1vdW50XG4gICAgICAgICAgICAgICAgdG90YWxUZXN0cysrXG4gICAgICAgICAgICAgICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPVwidGVzdFByaWNlUm93XCIga2V5PXtpfT5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidG5hbWVcIj57dGVzdC5uYW1lfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGFtb3VudFwiPlJzLiB7dGVzdC5hbW91bnR9PC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm9yZGVyRGV0YWlsc1wiPlxuICAgICAgICAgICAgICAgIDxFeHBhbnNpb25QYW5lbD5cbiAgICAgICAgICAgICAgICAgICAgPEV4cGFuc2lvblBhbmVsU3VtbWFyeSBleHBhbmRJY29uPXs8RXhwYW5kTW9yZUljb24gLz59PlxuICAgICAgICAgICAgICAgICAgICAgICAgT3JkZXIgRGV0YWlscyAtIHt0b3RhbFRlc3RzfSBUZXN0c1xuICAgICAgICAgICAgICAgICAgICA8L0V4cGFuc2lvblBhbmVsU3VtbWFyeT5cbiAgICAgICAgICAgICAgICAgICAgPEV4cGFuc2lvblBhbmVsRGV0YWlscz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicHJpY2VDb250XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3ByaWNlX2JyZWFrdXB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXN0VG90YWxSb3dcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidG5hbWVcIj57XCJUb3RhbFwifTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGFtb3VudFwiPlJzLiB7dG90YWxQcmljZX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXN0VG90YWxSb3dcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidG5hbWVcIj57XCJHU1RcIn08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRhbW91bnRcIj5Scy4ge3RvdGFsUHJpY2UqMS4xOH08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXN0VG90YWxSb3dcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidG5hbWVcIj57XCJQYXlhYmxlXCJ9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0YW1vdW50XCI+UnMuIHt0b3RhbFByaWNlKjEuMTh9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvRXhwYW5zaW9uUGFuZWxEZXRhaWxzPlxuICAgICAgICAgICAgICAgIDwvRXhwYW5zaW9uUGFuZWw+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgT3JkZXJEZXRhaWxzXG4iLCJpbXBvcnQgT3JkZXJEZXRhaWxzIGZyb20gJy4vT3JkZXJEZXRhaWxzLmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBPcmRlckRldGFpbHMiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgTGFiRGV0YWlscyBmcm9tICcuLi9jb21tb25zL2xhYkRldGFpbHMvaW5kZXguanMnXG5pbXBvcnQgTG9hZGVyIGZyb20gJy4uLy4uL2NvbW1vbnMvTG9hZGVyJ1xuXG5jbGFzcyBMYWJWaWV3IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIHNlbGVjdGVkTGFiOiB0aGlzLnByb3BzLm1hdGNoLnBhcmFtcy5pZFxuICAgICAgICB9XG4gICAgfVxuXG4gICAgYm9va0xhYigpIHtcbiAgICAgICAgdGhpcy5wcm9wcy5oaXN0b3J5LnB1c2goYC9sYWIvJHt0aGlzLnN0YXRlLnNlbGVjdGVkTGFifS9ib29rYClcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgPGhlYWRlciBjbGFzc05hbWU9XCJza2luLXByaW1hcnkgZml4ZWQgaG9yaXpvbnRhbCB0b3AgcHJvZmlsZS1ib29rLWhlYWRlclwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lci1mbHVpZFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC00XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaGVhZGVyLXRpdGxlIGZ3LTcwMCBjYXBpdGFsaXplIHRleHQtd2hpdGVcIj5JQ09OPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtNFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLTRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHVsIGNsYXNzTmFtZT1cImlubGluZS1saXN0IGZsb2F0LXJpZ2h0IHVzZXItbm90aWZpY2F0aW9uLWFjdGlvblwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpPjxzcGFuIGNsYXNzTmFtZT1cImljb24gaWNvbi1tZCB0ZXh0LW1pZGRsZVwiPjxpbWcgc3JjPVwiL2Fzc2V0cy9pbWcvY3VzdG9tZXItaWNvbnMvdXNlci5zdmdcIiBjbGFzc05hbWU9XCJpbWctZmx1aWRcIiAvPjwvc3Bhbj48L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpPjxzcGFuIGNsYXNzTmFtZT1cImljb24gaWNvbi1tZCB0ZXh0LW1pZGRsZSBub3RpZmljYXRpb24taWNvblwiPjxpbWcgc3JjPVwiL2Fzc2V0cy9pbWcvY3VzdG9tZXItaWNvbnMvbm90aWZpY2F0aW9uLnN2Z1wiIGNsYXNzTmFtZT1cImltZy1mbHVpZFwiIC8+IDxzcGFuIGNsYXNzTmFtZT1cIm5vdGlmaWNhdGlvbi1hbGVydFwiIC8+PC9zcGFuPjwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9oZWFkZXI+XG5cbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuTEFCU1t0aGlzLnN0YXRlLnNlbGVjdGVkTGFiXSA/XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic2tpbi1wcmltYXJ5IGVtcHR5LWhlYWRlciBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxMYWJEZXRhaWxzIHsuLi50aGlzLnByb3BzfSBkYXRhPXt0aGlzLnByb3BzLkxBQlNbdGhpcy5zdGF0ZS5zZWxlY3RlZExhYl19IC8+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9e3RoaXMuYm9va0xhYi5iaW5kKHRoaXMpfSBjbGFzc05hbWU9XCJ2LWJ0biB2LWJ0bi1wcmltYXJ5IGJ0bi1sZyBmaXhlZCBob3Jpem9udGFsIGJvdHRvbSBuby1yb3VuZCBidG4tbGcgdGV4dC1sZ1wiPjxzcGFuIGNsYXNzTmFtZT1cInRleHQteHMgc2VsZWN0ZWQtb3B0aW9uXCI+KHt0aGlzLnByb3BzLnNlbGVjdGVkQ3JpdGVyaWFzLmxlbmd0aH0gU2VsZWN0ZWQpIDwvc3Bhbj5Cb29rXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PiA6IDxMb2FkZXIgLz5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTGFiVmlld1xuIiwiaW1wb3J0IExhYlZpZXcgZnJvbSAnLi9MYWJWaWV3LmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBMYWJWaWV3IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cbmltcG9ydCBMYWJEZXRhaWxzIGZyb20gJy4uL2NvbW1vbnMvbGFiRGV0YWlscy9pbmRleC5qcydcbmltcG9ydCBPcmRlckRldGFpbHMgZnJvbSAnLi4vY29tbW9ucy9vcmRlckRldGFpbHMvaW5kZXguanMnXG5pbXBvcnQgRGV0YWlsc0Zvcm0gZnJvbSAnLi9kZXRhaWxzRm9ybS9pbmRleC5qcydcbmltcG9ydCBBZGRyZXNzRm9ybSBmcm9tICcuL2FkZHJlc3NGb3JtL2luZGV4LmpzJztcblxuY2xhc3MgUGF0aWVudERldGFpbHNWaWV3IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIHNlbGVjdGVkTGFiOiBudWxsLFxuICAgICAgICAgICAgc2VsZWN0ZWRUZXN0czogXCJcIixcbiAgICAgICAgICAgIHNlbGVjdGVkU2xvdDogbnVsbCxcbiAgICAgICAgICAgIHNlbGVjdGVkU2xvdFN0YXJ0IDogbnVsbCxcbiAgICAgICAgICAgIHNlbGVjdGVkU2xvdEVuZCA6IG51bGxcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldExvY2F0aW9uUGFyYW0odGFnKSB7XG4gICAgICAgIC8vIHRoaXMgQVBJIGFzc3VtZXMgdGhlIGNvbnRleHQgb2YgcmVhY3Qtcm91dGVyLTRcbiAgICAgICAgY29uc3QgcGFyYW1TdHJpbmcgPSB0aGlzLnByb3BzLmxvY2F0aW9uLnNlYXJjaFxuICAgICAgICBjb25zdCBwYXJhbXMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKHBhcmFtU3RyaW5nKVxuICAgICAgICByZXR1cm4gcGFyYW1zLmdldCh0YWcpXG4gICAgfVxuXG4gICAgcHJvY2VlZCgpe1xuICAgICAgICB0aGlzLmNvbnRleHQucm91dGVyLmhpc3RvcnkucHVzaCgnL2xhYi9ib29raW5nL3N1bW1hcnkvSVVIQlVIODc4N1VIQicpXG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIGxldCBsYWJJZCA9IHRoaXMucHJvcHMubWF0Y2gucGFyYW1zLmlkXG4gICAgICAgIGxldCB0ZXN0cyA9IHRoaXMuZ2V0TG9jYXRpb25QYXJhbSgndGVzdHMnKVxuICAgICAgICBsZXQgc2VsZWN0ZWRTbG90U3RhcnQgPSB0aGlzLmdldExvY2F0aW9uUGFyYW0oJ3Rfc3RhcnQnKVxuICAgICAgICBzZWxlY3RlZFNsb3RTdGFydCA9IG5ldyBEYXRlKHBhcnNlRmxvYXQoc2VsZWN0ZWRTbG90U3RhcnQpKVxuICAgICAgICBzZWxlY3RlZFNsb3RTdGFydCA9IHNlbGVjdGVkU2xvdFN0YXJ0LnRvU3RyaW5nKClcbiAgICAgICAgbGV0IHNlbGVjdGVkU2xvdEVuZCA9IHRoaXMuZ2V0TG9jYXRpb25QYXJhbSgndF9lbmQnKVxuICAgICAgICBzZWxlY3RlZFNsb3RFbmQgPSBuZXcgRGF0ZShwYXJzZUZsb2F0KHNlbGVjdGVkU2xvdEVuZCkpXG4gICAgICAgIHNlbGVjdGVkU2xvdEVuZCA9IHNlbGVjdGVkU2xvdEVuZC50b1N0cmluZygpXG4gICAgICAgIGlmIChsYWJJZCkge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHNlbGVjdGVkTGFiOiBsYWJJZCwgc2VsZWN0ZWRUZXN0czogdGVzdHMsIHNlbGVjdGVkU2xvdFN0YXJ0LCBzZWxlY3RlZFNsb3RFbmQgfSlcbiAgICAgICAgICAgIHRoaXMucHJvcHMuZ2V0TGFiQnlJZChsYWJJZClcblxuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhdGljIGNvbnRleHRUeXBlcyA9IHtcbiAgICAgICAgcm91dGVyOiAoKSA9PiBudWxsXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBhdGllbnREZXRhaWxzXCI+XG5cbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuTEFCU1t0aGlzLnN0YXRlLnNlbGVjdGVkTGFiXSA/XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxMYWJEZXRhaWxzIGRhdGE9e3RoaXMucHJvcHMuTEFCU1t0aGlzLnN0YXRlLnNlbGVjdGVkTGFiXX0gLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8T3JkZXJEZXRhaWxzIGRhdGE9e3RoaXMucHJvcHMuTEFCU1t0aGlzLnN0YXRlLnNlbGVjdGVkTGFiXX0gLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNlbGVjdGVkQXBwb2ludG1lbnRTbG90XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoNT5TZWxlY3RlZCBBcHBvaW50bWVudCBTbG90PC9oNT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiYXBwZGF0ZVwiPkFwcG9pbnRtZW50IERhdGU8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImRhdGVcIj57IHRoaXMuc3RhdGUuc2VsZWN0ZWRTbG90U3RhcnQgfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8RGV0YWlsc0Zvcm0gLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8QWRkcmVzc0Zvcm0gY2l0eT1cIlNlbGVjdGVkIHZhbHVlXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cInByb2NlZWRidG5cIiBvbkNsaWNrPXt0aGlzLnByb2NlZWQuYmluZCh0aGlzKX0+UHJvY2VlZDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+IDogXCJcIlxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IFBhdGllbnREZXRhaWxzVmlld1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cbmNsYXNzIEFkZHJlc3NGb3JtIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIGFkZHJlc3M6JycsXG4gICAgICAgICAgICBsb2NhbGl0eTonJyxcbiAgICAgICAgICAgIGxhbmRtYXJrOicnLFxuICAgICAgICAgICAgcGluY29kZTonJyxcbiAgICAgICAgICAgIGNpdHk6cHJvcHMuY2l0eVxuXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpbnB1dEhhbmRsZXIod2hpY2gsIGUpe1xuICAgICAgICB0aGlzLnNldFN0YXRlKHsgW3doaWNoXSA6IGUudGFyZ2V0LnZhbHVlIH0pXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImRldGFpbHNGb3JtXCI+XG4gICAgICAgICAgICAgICAgPGg1PlBsZWFzZSBwcm92aWRlIHBhdGllbnQgZGV0YWlsczwvaDU+XG5cbiAgICAgICAgICAgICAgICA8aW5wdXQgdmFsdWU9e3RoaXMuc3RhdGUuYWRkcmVzc30gb25DaGFuZ2U9e3RoaXMuaW5wdXRIYW5kbGVyLmJpbmQodGhpcywnYWRkcmVzcycpfSBjbGFzc05hbWU9XCJwdG5hbWVcIiBwbGFjZWhvbGRlcj1cIkFkZHJlc3MqXCIgLz5cbiAgICAgICAgICAgICAgICA8aW5wdXQgdmFsdWU9e3RoaXMuc3RhdGUubG9jYWxpdHl9IG9uQ2hhbmdlPXt0aGlzLmlucHV0SGFuZGxlci5iaW5kKHRoaXMsJ2xvY2FsaXR5Jyl9IGNsYXNzTmFtZT1cInB0bmFtZVwiIHBsYWNlaG9sZGVyPVwiTG9jYWxpdHkqXCIgLz5cbiAgICAgICAgICAgICAgICA8aW5wdXQgdmFsdWU9e3RoaXMuc3RhdGUubGFuZG1hcmt9IG9uQ2hhbmdlPXt0aGlzLmlucHV0SGFuZGxlci5iaW5kKHRoaXMsJ2xhbmRtYXJrJyl9IGNsYXNzTmFtZT1cInB0bmFtZVwiIHBsYWNlaG9sZGVyPVwiTGFuZG1hcmsqXCIgLz5cbiAgICAgICAgICAgICAgICA8aW5wdXQgdmFsdWU9e3RoaXMuc3RhdGUucGluY29kZX0gb25DaGFuZ2U9e3RoaXMuaW5wdXRIYW5kbGVyLmJpbmQodGhpcywncGluY29kZScpfSBjbGFzc05hbWU9XCJwdG1vYmlsZVwiIHBsYWNlaG9sZGVyPVwiUGluY29kZSpcIiAvPlxuICAgICAgICAgICAgICAgIHsvKiA8aW5wdXQgdmFsdWU9e3RoaXMuc3RhdGUuY2l0eX0gb25DaGFuZ2U9e3RoaXMuaW5wdXRIYW5kbGVyLmJpbmQodGhpcywnY2l0eScpfSBkaXNhYmxlZCBjbGFzc05hbWU9XCJwdG90cFwiIHBsYWNlaG9sZGVyPVwiQ2l0eVwiIC8+ICovfVxuXG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgQWRkcmVzc0Zvcm1cbiIsImltcG9ydCBBZGRyZXNzRm9ybSBmcm9tICcuL0FkZHJlc3NGb3JtLmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBBZGRyZXNzRm9ybSIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG5jbGFzcyBEZXRhaWxzRm9ybSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgICBwYXRpZW50TmFtZSA6ICcnLFxuICAgICAgICAgICAgcGF0aWVudEVtYWlsIDogJycsXG4gICAgICAgICAgICBwYXRpZW50R2VuZGVyIDogJ21hbGUnLFxuICAgICAgICAgICAgbW9iaWxlOicnLFxuICAgICAgICAgICAgb3RwIDonJyxcbiAgICAgICAgICAgIHBhdGllbnRNb2JpbGUgOiAnJ1xuXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpbnB1dEhhbmRsZXIod2hpY2gsIGUpe1xuICAgICAgICB0aGlzLnNldFN0YXRlKHsgW3doaWNoXSA6IGUudGFyZ2V0LnZhbHVlIH0pXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImRldGFpbHNGb3JtXCI+XG4gICAgICAgICAgICAgICAgPGg1PlBsZWFzZSBwcm92aWRlIHBhdGllbnQgZGV0YWlsczwvaDU+XG5cbiAgICAgICAgICAgICAgICA8aW5wdXQgdmFsdWU9e3RoaXMuc3RhdGUucGF0aWVudE5hbWV9IG9uQ2hhbmdlPXt0aGlzLmlucHV0SGFuZGxlci5iaW5kKHRoaXMsJ3BhdGllbnROYW1lJyl9IGNsYXNzTmFtZT1cInB0bmFtZVwiIHBsYWNlaG9sZGVyPVwiUGF0aWVudCBOYW1lKlwiIC8+XG4gICAgICAgICAgICAgICAgPGlucHV0IHZhbHVlPXt0aGlzLnN0YXRlLnBhdGllbnRFbWFpbH0gb25DaGFuZ2U9e3RoaXMuaW5wdXRIYW5kbGVyLmJpbmQodGhpcywncGF0aWVudEVtYWlsJyl9IGNsYXNzTmFtZT1cInB0ZW1haWxcIiBwbGFjZWhvbGRlcj1cIkVtYWlsKlwiIC8+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwdGdlbmRlclwiPlxuICAgICAgICAgICAgICAgICAgICA8c3Bhbj5HZW5kZXIgOjwvc3Bhbj4gXG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwicmFkaW9cIiBuYW1lPVwiZ2VuZGVyXCIgdmFsdWU9XCJtYWxlXCIgY2hlY2tlZD17dGhpcy5zdGF0ZS5wYXRpZW50R2VuZGVyID09PSBcIm1hbGVcIn0gb25DaGFuZ2U9e3RoaXMuaW5wdXRIYW5kbGVyLmJpbmQodGhpcywncGF0aWVudEdlbmRlcicpfS8+IE1hbGVcbiAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJyYWRpb1wiIG5hbWU9XCJnZW5kZXJcIiB2YWx1ZT1cImZlbWFsZVwiIGNoZWNrZWQ9e3RoaXMuc3RhdGUucGF0aWVudEdlbmRlciA9PT0gXCJmZW1hbGVcIn0gb25DaGFuZ2U9e3RoaXMuaW5wdXRIYW5kbGVyLmJpbmQodGhpcywncGF0aWVudEdlbmRlcicpfS8+IEZlbWFsZVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxpbnB1dCB2YWx1ZT17dGhpcy5zdGF0ZS5tb2JpbGV9IG9uQ2hhbmdlPXt0aGlzLmlucHV0SGFuZGxlci5iaW5kKHRoaXMsJ21vYmlsZScpfSBjbGFzc05hbWU9XCJwdG1vYmlsZVwiIHBsYWNlaG9sZGVyPVwiTW9iaWxlKlwiIC8+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJvdHBidG5cIj4oUmUpU2VuZCBPVFA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8aW5wdXQgdmFsdWU9e3RoaXMuc3RhdGUub3RwfSBvbkNoYW5nZT17dGhpcy5pbnB1dEhhbmRsZXIuYmluZCh0aGlzLCdvdHAnKX0gY2xhc3NOYW1lPVwicHRvdHBcIiBwbGFjZWhvbGRlcj1cIkVudGVyIE9UUCpcIiAvPlxuICAgICAgICAgICAgICAgIDxpbnB1dCB2YWx1ZT17dGhpcy5zdGF0ZS5wYXRpZW50TW9iaWxlfSBvbkNoYW5nZT17dGhpcy5pbnB1dEhhbmRsZXIuYmluZCh0aGlzLCdwYXRpZW50TW9iaWxlJyl9IGNsYXNzTmFtZT1cInB0bW9iaWxlXCIgcGxhY2Vob2xkZXI9XCJQYXRpZW50IE1vYmlsZSpcIiAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgXG4gICAgICAgICk7XG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IERldGFpbHNGb3JtXG4iLCJpbXBvcnQgRGV0YWlsc0Zvcm0gZnJvbSAnLi9EZXRhaWxzRm9ybS5qcydcblxuZXhwb3J0IGRlZmF1bHQgRGV0YWlsc0Zvcm0iLCJpbXBvcnQgUGF0aWVudERldGFpbHNWaWV3IGZyb20gJy4vUGF0aWVudERldGFpbHNWaWV3LmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBQYXRpZW50RGV0YWlsc1ZpZXciLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcblxuaW1wb3J0IENvbW1vbmx5U2VhcmNoZWQgZnJvbSAnLi4vLi4vY29tbW9ucy9jb21tb25seVNlYXJjaGVkL2luZGV4LmpzJ1xuaW1wb3J0IENyaXRlcmlhU2VhcmNoIGZyb20gJy4uLy4uL2NvbW1vbnMvY3JpdGVyaWFTZWFyY2gnXG5cbmNsYXNzIFNlYXJjaENyaXRlcmlhVmlldyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG5cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNlYXJjaFByb2NlZWQoKSB7XG4gICAgICAgIGxldCBzZWFyY2hEYXRhID0ge1xuICAgICAgICAgICAgc2VsZWN0ZWRDcml0ZXJpYXMgOiB0aGlzLnByb3BzLnNlbGVjdGVkQ3JpdGVyaWFzLFxuICAgICAgICAgICAgc2VsZWN0ZWRMb2NhdGlvbiA6IHRoaXMucHJvcHMuc2VsZWN0ZWRMb2NhdGlvbixcbiAgICAgICAgfVxuICAgICAgICBzZWFyY2hEYXRhID0gZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNlYXJjaERhdGEpKVxuICAgICAgICBsZXQgZmlsdGVyRGF0YSA9IGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeSh0aGlzLnByb3BzLmZpbHRlckNyaXRlcmlhKSlcbiAgICAgICAgdGhpcy5wcm9wcy5oaXN0b3J5LnB1c2goYC9keC9zZWFyY2hyZXN1bHRzP3NlYXJjaD0ke3NlYXJjaERhdGF9JmZpbHRlcj0ke2ZpbHRlckRhdGF9YClcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXY+XG5cbiAgICAgICAgICAgICAgICA8Q3JpdGVyaWFTZWFyY2ggey4uLnRoaXMucHJvcHN9IGNoZWNrRm9yTG9hZD17dGhpcy5wcm9wcy5MT0FERURfU0VBUkNIX0NSSVRFUklBX0xBQn0gdGl0bGU9XCJTZWFyY2ggZm9yIFRlc3QgYW5kIExhYnMuXCI+XG4gICAgICAgICAgICAgICAgICAgIDxzZWN0aW9uIGNsYXNzTmFtZT1cIndyYXAgd3JhcC0xMDBcIj5cblxuICAgICAgICAgICAgICAgICAgICAgICAgPENvbW1vbmx5U2VhcmNoZWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWFkaW5nPVwiU2VsZWN0ZWQgQ3JpdGVyaWFcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE9e3RoaXMucHJvcHMuc2VsZWN0ZWRDcml0ZXJpYXN9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWQ9e1tdfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvZ2dsZT17dGhpcy5wcm9wcy50b2dnbGVEaWFnbm9zaXNDcml0ZXJpYS5iaW5kKHRoaXMpfVxuICAgICAgICAgICAgICAgICAgICAgICAgLz5cblxuICAgICAgICAgICAgICAgICAgICAgICAgPENvbW1vbmx5U2VhcmNoZWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWFkaW5nPVwiQ29tbW9uIFRlc3RcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJ0ZXN0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhPXt0aGlzLnByb3BzLmNvbW1vbl90ZXN0c31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZD17dGhpcy5wcm9wcy5zZWxlY3RlZENyaXRlcmlhcy5maWx0ZXIoeCA9PiB4LnR5cGUgPT0gJ3Rlc3QnKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b2dnbGU9e3RoaXMucHJvcHMudG9nZ2xlRGlhZ25vc2lzQ3JpdGVyaWEuYmluZCh0aGlzKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxDb21tb25seVNlYXJjaGVkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGluZz1cIkNvbW1vbiBDb25kaXRpb25zXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwibGFiXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhPXt0aGlzLnByb3BzLmNvbW1vbl9jb25kaXRpb25zfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkPXt0aGlzLnByb3BzLnNlbGVjdGVkQ3JpdGVyaWFzLmZpbHRlcih4ID0+IHgudHlwZSA9PSAnbGFiJyl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9nZ2xlPXt0aGlzLnByb3BzLnRvZ2dsZURpYWdub3Npc0NyaXRlcmlhLmJpbmQodGhpcyl9XG4gICAgICAgICAgICAgICAgICAgICAgICAvPlxuXG4gICAgICAgICAgICAgICAgICAgICAgICA8Q29tbW9ubHlTZWFyY2hlZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRpbmc9XCJDb21tb24gTGFic1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImxhYlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YT17dGhpcy5wcm9wcy5wcmVmZXJyZWRfbGFic31cbiAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgIDwvc2VjdGlvbj5cbiAgICAgICAgICAgICAgICA8L0NyaXRlcmlhU2VhcmNoPlxuXG5cblxuICAgICAgICAgICAgICAgIDxidXR0b24gb25DbGljaz17dGhpcy5zZWFyY2hQcm9jZWVkLmJpbmQodGhpcyl9IGNsYXNzTmFtZT1cInYtYnRuIHYtYnRuLXByaW1hcnkgYnRuLWxnIGZpeGVkIGhvcml6b250YWwgYm90dG9tIG5vLXJvdW5kIHRleHQtbGdcIj5TaG93IExhYnM8L2J1dHRvbj5cblxuXG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFNlYXJjaENyaXRlcmlhVmlld1xuIiwiaW1wb3J0IFNlYXJjaENyaXRlcmlhVmlldyBmcm9tICcuL1NlYXJjaENyaXRlcmlhVmlldy5qcydcblxuZXhwb3J0IGRlZmF1bHQgU2VhcmNoQ3JpdGVyaWFWaWV3IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IExhYnNMaXN0IGZyb20gJy4uL3NlYXJjaFJlc3VsdHMvbGFic0xpc3QvaW5kZXguanMnXG5pbXBvcnQgQ3JpdGVyaWFTZWFyY2ggZnJvbSAnLi4vLi4vY29tbW9ucy9jcml0ZXJpYVNlYXJjaCdcbmltcG9ydCBUb3BCYXIgZnJvbSAnLi90b3BCYXInXG5cbmNsYXNzIFNlYXJjaFJlc3VsdHNWaWV3IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcblxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIHRoaXMuZ2V0TGFicygpXG4gICAgfVxuXG4gICAgZ2V0TGFicygpIHtcbiAgICAgICAgbGV0IHtcbiAgICAgICAgICAgIHNlbGVjdGVkTG9jYXRpb24sXG4gICAgICAgICAgICBzZWxlY3RlZENyaXRlcmlhcyxcbiAgICAgICAgICAgIGZpbHRlckNyaXRlcmlhXG4gICAgICAgIH0gPSB0aGlzLnByb3BzXG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGxldCBzZWFyY2hTdGF0ZSA9IHRoaXMuZ2V0TG9jYXRpb25QYXJhbSgnc2VhcmNoJylcbiAgICAgICAgICAgIGxldCBmaWx0ZXJDcml0ZXJpYSA9IHRoaXMuZ2V0TG9jYXRpb25QYXJhbSgnZmlsdGVyJylcbiAgICAgICAgICAgIGlmIChmaWx0ZXJDcml0ZXJpYSkge1xuICAgICAgICAgICAgICAgIGZpbHRlckNyaXRlcmlhID0gSlNPTi5wYXJzZShmaWx0ZXJDcml0ZXJpYSlcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZmlsdGVyQ3JpdGVyaWEgPSB7fVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2VhcmNoU3RhdGUgPSBKU09OLnBhcnNlKHNlYXJjaFN0YXRlKVxuICAgICAgICAgICAgdGhpcy5nZXRMYWJMaXN0KHNlYXJjaFN0YXRlLCBmaWx0ZXJDcml0ZXJpYSwgdHJ1ZSlcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihlKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0TG9jYXRpb25QYXJhbSh0YWcpIHtcbiAgICAgICAgLy8gdGhpcyBBUEkgYXNzdW1lcyB0aGUgY29udGV4dCBvZiByZWFjdC1yb3V0ZXItNFxuICAgICAgICBjb25zdCBwYXJhbVN0cmluZyA9IHRoaXMucHJvcHMubG9jYXRpb24uc2VhcmNoXG4gICAgICAgIGNvbnN0IHBhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXMocGFyYW1TdHJpbmcpXG4gICAgICAgIHJldHVybiBwYXJhbXMuZ2V0KHRhZylcbiAgICB9XG5cbiAgICBnZXRMYWJMaXN0KHNlYXJjaFN0YXRlLCBmaWx0ZXJDcml0ZXJpYSwgbWVyZ2VTdGF0ZSkge1xuICAgICAgICB0aGlzLnByb3BzLmdldExhYnMoc2VhcmNoU3RhdGUsIGZpbHRlckNyaXRlcmlhLCBtZXJnZVN0YXRlKTtcbiAgICB9XG5cbiAgICBhcHBseUZpbHRlcnMoZmlsdGVyU3RhdGUpIHtcbiAgICAgICAgbGV0IHNlYXJjaFN0YXRlID0ge1xuICAgICAgICAgICAgc2VsZWN0ZWRDcml0ZXJpYXM6IHRoaXMucHJvcHMuc2VsZWN0ZWRDcml0ZXJpYXMsXG4gICAgICAgICAgICBzZWxlY3RlZExvY2F0aW9uOiB0aGlzLnByb3BzLnNlbGVjdGVkTG9jYXRpb24sXG4gICAgICAgIH1cbiAgICAgICAgbGV0IHNlYXJjaERhdGEgPSBlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc2VhcmNoU3RhdGUpKVxuICAgICAgICBsZXQgZmlsdGVyRGF0YSA9IGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShmaWx0ZXJTdGF0ZSkpXG4gICAgICAgIHRoaXMucHJvcHMuaGlzdG9yeS5yZXBsYWNlKGAvZHgvc2VhcmNocmVzdWx0cz9zZWFyY2g9JHtzZWFyY2hEYXRhfSZmaWx0ZXI9JHtmaWx0ZXJEYXRhfWApXG5cbiAgICAgICAgdGhpcy5nZXRMYWJMaXN0KHNlYXJjaFN0YXRlLCBmaWx0ZXJTdGF0ZSwgdHJ1ZSlcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgPENyaXRlcmlhU2VhcmNoIHsuLi50aGlzLnByb3BzfSBjaGVja0ZvckxvYWQ9e3RoaXMucHJvcHMuTE9BREVEX0xBQlNfU0VBUkNIfSB0aXRsZT1cIlNlYXJjaCBmb3IgVGVzdCBhbmQgTGFicy5cIj5cbiAgICAgICAgICAgICAgICAgICAgPFRvcEJhciB7Li4udGhpcy5wcm9wc30gYXBwbHlGaWx0ZXJzPXt0aGlzLmFwcGx5RmlsdGVycy5iaW5kKHRoaXMpfSAvPlxuICAgICAgICAgICAgICAgICAgICA8TGFic0xpc3Qgey4uLnRoaXMucHJvcHN9IC8+XG4gICAgICAgICAgICAgICAgPC9Dcml0ZXJpYVNlYXJjaD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgU2VhcmNoUmVzdWx0c1ZpZXdcbiIsImltcG9ydCBTZWFyY2hSZXN1bHRzVmlldyBmcm9tICcuL1NlYXJjaFJlc3VsdHNWaWV3LmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBTZWFyY2hSZXN1bHRzVmlldyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCBMYWJQcm9maWxlQ2FyZCBmcm9tICcuLi8uLi9jb21tb25zL2xhYlByb2ZpbGVDYXJkL2luZGV4LmpzJ1xuXG5jbGFzcyBMYWJzTGlzdCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIGxldCB7IExBQlMsIGxhYkxpc3QgfSA9IHRoaXMucHJvcHNcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPHNlY3Rpb24gY2xhc3NOYW1lPVwid3JhcCBzZWFyY2gtYm9vay1yZXN1bHRcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lci1mbHVpZFwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtMTJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYkxpc3QubWFwKChsYWJJZCwgaSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDxMYWJQcm9maWxlQ2FyZCB7Li4udGhpcy5wcm9wc30gZGV0YWlscz17TEFCU1tsYWJJZF19IGtleT17aX0gLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L3NlY3Rpb24+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IExhYnNMaXN0XG4iLCJpbXBvcnQgTGFic0xpc3QgZnJvbSAnLi9MYWJzTGlzdC5qcydcblxuZXhwb3J0IGRlZmF1bHQgTGFic0xpc3QiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcblxuaW1wb3J0IE1lbnUsIHsgTWVudUl0ZW0gfSBmcm9tICdtYXRlcmlhbC11aS9NZW51JztcbmltcG9ydCBSYW5nZSBmcm9tICdyYy1zbGlkZXIvbGliL1JhbmdlJztcblxuY2xhc3MgVG9wQmFyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIGFuY2hvckVsOiBudWxsLFxuICAgICAgICAgICAgb3BlbkZpbHRlcjogZmFsc2UsXG4gICAgICAgICAgICBwcmljZVJhbmdlOiBbMTAwLCAxNTAwXSxcbiAgICAgICAgICAgIGRpc3RhbmNlUmFuZ2U6IFsxLCAzNV0sXG4gICAgICAgICAgICBzb3J0Qnk6IG51bGxcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMocHJvcHMpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IC4uLnByb3BzLmZpbHRlckNyaXRlcmlhIH0pXG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyAuLi50aGlzLnByb3BzLmZpbHRlckNyaXRlcmlhIH0pXG4gICAgfVxuXG4gICAgYXBwbHlGaWx0ZXJzKCkge1xuICAgICAgICBsZXQgZmlsdGVyU3RhdGUgPSB7XG4gICAgICAgICAgICBwcmljZVJhbmdlOiB0aGlzLnN0YXRlLnByaWNlUmFuZ2UsXG4gICAgICAgICAgICBkaXN0YW5jZVJhbmdlOiB0aGlzLnN0YXRlLmRpc3RhbmNlUmFuZ2UsXG4gICAgICAgICAgICBzb3J0Qnk6IHRoaXMuc3RhdGUuc29ydEJ5XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5wcm9wcy5hcHBseUZpbHRlcnMoZmlsdGVyU3RhdGUpXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBvcGVuRmlsdGVyOiBmYWxzZSB9KVxuICAgIH1cblxuICAgIGhhbmRsZU9wZW4oZXZlbnQpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGFuY2hvckVsOiBldmVudC5jdXJyZW50VGFyZ2V0IH0pXG4gICAgfVxuXG4gICAgaGFuZGxlQ2xvc2UodHlwZSkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHsgYW5jaG9yRWw6IG51bGwsIHNvcnRCeTogdHlwZSB9LCAoKSA9PiB7XG4gICAgICAgICAgICBpZih0eXBlKXtcbiAgICAgICAgICAgICAgICB0aGlzLmFwcGx5RmlsdGVycygpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgdG9nZ2xlRmlsdGVyKCkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIG9wZW5GaWx0ZXI6ICF0aGlzLnN0YXRlLm9wZW5GaWx0ZXJcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBoYW5kbGVSYW5nZSh0eXBlLCByYW5nZSkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIFt0eXBlXTogcmFuZ2VcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBnZXRDcml0ZXJpYVN0cmluZyhzZWxlY3RlZENyaXRlcmlhcykge1xuICAgICAgICBpZiAoc2VsZWN0ZWRDcml0ZXJpYXMgJiYgc2VsZWN0ZWRDcml0ZXJpYXMubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm4gc2VsZWN0ZWRDcml0ZXJpYXMucmVkdWNlKChmaW5hbCwgY3VyciwgaSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChpICE9IDApIHtcbiAgICAgICAgICAgICAgICAgICAgZmluYWwgKz0gJywgJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBmaW5hbCArPSBgJHtjdXJyLm5hbWV9YFxuICAgICAgICAgICAgICAgIHJldHVybiBmaW5hbFxuICAgICAgICAgICAgfSwgXCJcIilcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICBsZXQgY3JpdGVyaWFTdHIgPSB0aGlzLmdldENyaXRlcmlhU3RyaW5nKHRoaXMucHJvcHMuc2VsZWN0ZWRDcml0ZXJpYXMpXG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxzZWN0aW9uIGNsYXNzTmFtZT1cImZpbHRlci1yb3dcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lci1mbHVpZFwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtMTJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZpbHRlci1pdGVtXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWN0aW9uLWZpbHRlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHVsIGNsYXNzTmFtZT1cImlubGluZS1saXN0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpIG9uQ2xpY2s9e3RoaXMuaGFuZGxlT3Blbi5iaW5kKHRoaXMpfT48c3BhbiBjbGFzc05hbWU9XCJjdC1pbWcgY3QtaW1nLXNtIGZpbHRlci1pY29uIHRleHQtcmlnaHRcIj48aW1nIHNyYz1cIi9hc3NldHMvaW1nL2N1c3RvbWVyLWljb25zL3JhbmdlLnN2Z1wiIGNsYXNzTmFtZT1cImltZy1mbHVpZFwiIC8+PC9zcGFuPjwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpIG9uQ2xpY2s9e3RoaXMudG9nZ2xlRmlsdGVyLmJpbmQodGhpcyl9PjxzcGFuIGNsYXNzTmFtZT1cImN0LWltZyBjdC1pbWctc20gZmlsdGVyLWljb24gdGV4dC1yaWdodCBhcHBsaWVkLWZpbHRlclwiPjxpbWcgc3JjPVwiL2Fzc2V0cy9pbWcvY3VzdG9tZXItaWNvbnMvZmlsdGVyLnN2Z1wiIGNsYXNzTmFtZT1cImltZy1mbHVpZFwiIC8+PC9zcGFuPjxzcGFuIGNsYXNzTmFtZT1cImFwcGxpZWQtZmlsdGVyLW5vdGlcIiAvPjwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmaWx0ZXItdGl0bGVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLmxhYkxpc3QubGVuZ3RofSBSZXN1bHRzIGZvdW5kIGZvciA8c3BhbiBjbGFzc05hbWU9XCJmdy03MDBcIj4ge2NyaXRlcmlhU3RyfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPE1lbnVcbiAgICAgICAgICAgICAgICAgICAgaWQ9XCJzb3J0LW1lbnVcIlxuICAgICAgICAgICAgICAgICAgICBhbmNob3JFbD17dGhpcy5zdGF0ZS5hbmNob3JFbH1cbiAgICAgICAgICAgICAgICAgICAgb3Blbj17Qm9vbGVhbih0aGlzLnN0YXRlLmFuY2hvckVsKX1cbiAgICAgICAgICAgICAgICAgICAgb25DbG9zZT17dGhpcy5oYW5kbGVDbG9zZS5iaW5kKHRoaXMsIG51bGwpfVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgPE1lbnVJdGVtIG9uQ2xpY2s9e3RoaXMuaGFuZGxlQ2xvc2UuYmluZCh0aGlzLCAnbmFtZScpfT5SZWxhdmFuY2U8L01lbnVJdGVtPlxuICAgICAgICAgICAgICAgICAgICA8TWVudUl0ZW0gb25DbGljaz17dGhpcy5oYW5kbGVDbG9zZS5iaW5kKHRoaXMsICdwcmljZScpfT5GZWU8L01lbnVJdGVtPlxuICAgICAgICAgICAgICAgICAgICA8TWVudUl0ZW0gb25DbGljaz17dGhpcy5oYW5kbGVDbG9zZS5iaW5kKHRoaXMsICdkaXN0YW5jZScpfT5EaXN0YW5jZTwvTWVudUl0ZW0+XG4gICAgICAgICAgICAgICAgPC9NZW51PlxuXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlLm9wZW5GaWx0ZXIgPyA8ZGl2IG9uQ2xpY2s9e3RoaXMudG9nZ2xlRmlsdGVyLmJpbmQodGhpcyl9IGNsYXNzTmFtZT1cIm92ZXJsYXkgYmxhY2tcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwid2lkZ2V0IGZpbHRlci1wb3B1cFwiIG9uQ2xpY2s9eyhlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgICAgICAgICAgICAgICAgICAgICAgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3aWRnZXQtY29udGVudFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZpbHRlclJvd1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGxcIj5QcmljZTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRyXCI+UnMge3RoaXMuc3RhdGUucHJpY2VSYW5nZVswXX0gdG8ge3RoaXMuc3RhdGUucHJpY2VSYW5nZVsxXX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJibFwiPlJzIDEwMDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImJyXCI+UnMgMjAwMDwvc3Bhbj5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPFJhbmdlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWluPXsxMDB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF4PXsyMDAwfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXt0aGlzLnN0YXRlLnByaWNlUmFuZ2V9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RlcD17MTAwfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInJhbmdlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5oYW5kbGVSYW5nZS5iaW5kKHRoaXMsICdwcmljZVJhbmdlJyl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmaWx0ZXJSb3dcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRsXCI+RGlzdGFuY2U8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0clwiPnt0aGlzLnN0YXRlLmRpc3RhbmNlUmFuZ2VbMF19IHRvIHt0aGlzLnN0YXRlLmRpc3RhbmNlUmFuZ2VbMV19IEtNPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiYmxcIj4xID4gS008L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJiclwiPjUwIEtNPC9zcGFuPlxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8UmFuZ2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtaW49ezF9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF4PXs1MH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17dGhpcy5zdGF0ZS5kaXN0YW5jZVJhbmdlfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0ZXA9ezF9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicmFuZ2VcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZVJhbmdlLmJpbmQodGhpcywgJ2Rpc3RhbmNlUmFuZ2UnKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwid2lkZ2V0LWZvb3RlciBwZC0wXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwidi1idG4gdi1idG4tcHJpbWFyeSBidG4tYmxvY2sgYnRuLWxnXCIgb25DbGljaz17dGhpcy5hcHBseUZpbHRlcnMuYmluZCh0aGlzKX0+QXBwbHk8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj4gOiBcIlwiXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICA8L3NlY3Rpb24+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IFRvcEJhclxuIiwiaW1wb3J0IFRvcEJhciBmcm9tICcuL1RvcEJhci5qcydcblxuZXhwb3J0IGRlZmF1bHQgVG9wQmFyIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBMb2FkZXIgZnJvbSAnLi4vLi4vY29tbW9ucy9Mb2FkZXInXG5cbmNsYXNzIFRlc3RTZWxlY3RvclZpZXcgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgc2VsZWN0ZWRMYWI6IHRoaXMucHJvcHMubWF0Y2gucGFyYW1zLmlkXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgdGhpcy5wcm9wcy5nZXRMYWJCeUlkKHRoaXMuc3RhdGUuc2VsZWN0ZWRMYWIpXG4gICAgfVxuXG4gICAgdG9nZ2xlVGVzdCh0ZXN0KSB7XG4gICAgICAgIHRoaXMucHJvcHMudG9nZ2xlRGlhZ25vc2lzQ3JpdGVyaWEoJ3Rlc3QnLCB0ZXN0KVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgXG4gICAgICAgIGxldCBsYWJEYXRhID0gdGhpcy5wcm9wcy5MQUJTW3RoaXMuc3RhdGUuc2VsZWN0ZWRMYWJdXG4gICAgICAgIGxldCB0ZXN0cyA9IFtdXG4gICAgICAgIGxldCBzZWxlY3RlZFRlc3RzID0gW11cblxuICAgICAgICBpZiAodGhpcy5wcm9wcy5zZWxlY3RlZENyaXRlcmlhcyAmJiB0aGlzLnByb3BzLnNlbGVjdGVkQ3JpdGVyaWFzLmxlbmd0aCkge1xuICAgICAgICAgICAgc2VsZWN0ZWRUZXN0cyA9IHRoaXMucHJvcHMuc2VsZWN0ZWRDcml0ZXJpYXMuZmlsdGVyKHggPT4geC50eXBlID09ICd0ZXN0JykubWFwKHggPT4geC5pZClcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgaWYgKGxhYkRhdGEgJiYgbGFiRGF0YS50ZXN0cyAmJiBsYWJEYXRhLnRlc3RzLmxlbmd0aCkge1xuICAgICAgICAgICAgdGVzdHMgPSBsYWJEYXRhLnRlc3RzLm1hcCgodGVzdCwgaSkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiA8bGkga2V5PXtpfT5cbiAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImNrLWJ4XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICB7dGVzdC50ZXN0Lm5hbWV9XG4gICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgY2hlY2tlZD17c2VsZWN0ZWRUZXN0cy5pbmRleE9mKHRlc3QudGVzdC5pZCkgPiAtMX0gb25DaGFuZ2U9e3RoaXMudG9nZ2xlVGVzdC5iaW5kKHRoaXMsIHRlc3QudGVzdCl9IC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJjaGVja21hcmtcIiAvPlxuICAgICAgICAgICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXN0LXByaWNlIHRleHQtbWQgZnctNTAwXCI+e3Rlc3QubXJwfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2PlxuXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBsYWJEYXRhID9cblxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aGVhZGVyIGNsYXNzTmFtZT1cInNraW4td2hpdGUgZml4ZWQgaG9yaXpvbnRhbCB0b3AgbG9jYXRpb24tZGV0ZWN0LWhlYWRlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lci1mbHVpZFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC0xMlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNlbGVjdC1sb2NhdGlvbi1yb3cgdGV4dC1jZW50ZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnByb3BzLmhpc3RvcnkuZ28oLTEpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fSBjbGFzc05hbWU9XCJjdC1pbWcgY3QtaW1nLW1kIGNsb3NlXCI+PGltZyBzcmM9XCIvYXNzZXRzL2ltZy9jdXN0b21lci1pY29ucy9jbG9zZS1ibGFjay5zdmdcIiBjbGFzc05hbWU9XCJpbWctZmx1aWRcIiAvPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoNCBjbGFzc05hbWU9XCJmdy03MDAgdGV4dC1tZFwiPkFsbCBUZXN0PC9oND5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtMTJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzZWFyY2gtcm93XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkb24tZ3JvdXAgbG9jYXRpb24tZGV0ZWN0LWZpZWxkXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sIGlucHV0LW1kIHNlYXJjaC1pbnB1dCBuby1zaGFkb3dcIiBwbGFjZWhvbGRlcj1cIlNlYXJjaCBUZXN0XCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJjdC1pbWcgY3QtaW1nLXNtIG1hcC1tYXJrZXItYmx1ZVwiPjxpbWcgc3JjPVwiL2Fzc2V0cy9pbWcvY3VzdG9tZXItaWNvbnMvc2VhcmNoLWljb24uc3ZnXCIgY2xhc3NOYW1lPVwiaW1nLWZsdWlkXCIgLz48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZGV0ZWN0LW15LWxvY2FpdG9uXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiY3QtaW1nIGN0LWltZy14c1wiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3NlbGVjdGVkVGVzdHMubGVuZ3RofSBTZWxlY3RlZCBJdGVtXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9oZWFkZXI+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c2VjdGlvbiBjbGFzc05hbWU9XCJ3cmFwIGFsbC10ZXN0LXNjcmVlbiBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3aWRnZXQtcGFuZWxcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGFuZWwtY29udGVudCBwZC0wXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHVsIGNsYXNzTmFtZT1cImxpc3QgYWxsLXRlc3QtbGlzdFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7dGVzdHN9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NlY3Rpb24+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cInYtYnRuIHYtYnRuLXByaW1hcnkgYnRuLWxnIGZpeGVkIGhvcml6b250YWwgYm90dG9tIG5vLXJvdW5kIHRleHQtbGdcIiBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuaGlzdG9yeS5nbygtMSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fT5Eb25lPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj4gOiA8TG9hZGVyIC8+XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFRlc3RTZWxlY3RvclZpZXdcbiIsImltcG9ydCBUZXN0U2VsZWN0b3IgZnJvbSAnLi9UZXN0U2VsZWN0b3InXG5leHBvcnQgZGVmYXVsdCBUZXN0U2VsZWN0b3IiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcblxuaW1wb3J0IFRpbWVTbG90U2VsZWN0b3IgZnJvbSAnLi4vLi4vY29tbW9ucy90aW1lU2xvdFNlbGVjdG9yL2luZGV4LmpzJ1xuaW1wb3J0IFNlbGVjdGVkQ2xpbmljIGZyb20gJy4uL2NvbW1vbnMvc2VsZWN0ZWRDbGluaWMvaW5kZXguanMnXG5cbmNsYXNzIEFwcG9pbnRtZW50U2xvdCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgICBzZWxlY3RlZERvY3RvcjogdGhpcy5wcm9wcy5tYXRjaC5wYXJhbXMuaWQsXG4gICAgICAgICAgICBzZWxlY3RlZENsaW5pYzogdGhpcy5wcm9wcy5tYXRjaC5wYXJhbXMuY2xpbmljSWQsXG4gICAgICAgICAgICB0aW1lU2xvdHM6IG51bGwsXG4gICAgICAgICAgICBzZWxlY3RlZFNsb3Q6IG51bGxcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByb2NlZWQoKSB7XG4gICAgICAgIC8vIGlmICh0aGlzLnN0YXRlLnNlbGVjdGVkU2xvdCkge1xuICAgICAgICAvLyAgICAgdGhpcy5jb250ZXh0LnJvdXRlci5oaXN0b3J5LnB1c2goYC9kb2N0b3Jwcm9maWxlLyR7dGhpcy5zdGF0ZS5zZWxlY3RlZERvY3Rvcn0vJHt0aGlzLnN0YXRlLnNlbGVjdGVkQ2xpbmljfS9ib29rZGV0YWlscz90PSR7dGhpcy5zdGF0ZS5zZWxlY3RlZFNsb3Quc3RhcnR9YClcbiAgICAgICAgLy8gfVxuICAgIH1cblxuICAgIHNlbGVjdFRpbWVTbG90KHNsb3QpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHNlbGVjdGVkU2xvdDogc2xvdCB9KVxuICAgIH1cblxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgICBsZXQgY2xpbmljSWQgPSB0aGlzLnByb3BzLm1hdGNoLnBhcmFtcy5jbGluaWNJZFxuICAgICAgICBsZXQgZG9jdG9ySWQgPSB0aGlzLnByb3BzLm1hdGNoLnBhcmFtcy5pZFxuXG4gICAgICAgIHRoaXMucHJvcHMuZ2V0VGltZVNsb3RzKGRvY3RvcklkLCBjbGluaWNJZCwgKHRpbWVTbG90cykgPT4ge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHRpbWVTbG90cyB9KVxuICAgICAgICB9KVxuXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2PlxuXG4gICAgICAgICAgICAgICAgPGhlYWRlciBjbGFzc05hbWU9XCJza2luLXByaW1hcnkgZml4ZWQgaG9yaXpvbnRhbCB0b3BcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250YWluZXItZmx1aWRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtMlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJpY29uIGJhY2staWNvblwiIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuaGlzdG9yeS5nbygtMSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfX0+PGltZyBzcmM9XCIvYXNzZXRzL2ltZy9jdXN0b21lci1pY29ucy9iYWNrLXdoaXRlLnBuZ1wiIGNsYXNzTmFtZT1cImltZy1mbHVpZFwiIC8+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLThcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJoZWFkZXItdGl0bGUgZnctNzAwIGNhcGl0YWxpemUgdGV4dC13aGl0ZSB0ZXh0LWNlbnRlclwiPlNlbGVjdCBEYXRlIGFuZCBUaW1lPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtMlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvaGVhZGVyPlxuXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnByb3BzLkRPQ1RPUlNbdGhpcy5zdGF0ZS5zZWxlY3RlZERvY3Rvcl0gP1xuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdj5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzZWN0aW9uIGNsYXNzTmFtZT1cIndyYXAgZHItcHJvZmlsZS1zY3JlZW5cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250YWluZXItZmx1aWRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtMTJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPFNlbGVjdGVkQ2xpbmljXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZERvY3Rvcj17dGhpcy5wcm9wcy5ET0NUT1JTW3RoaXMuc3RhdGUuc2VsZWN0ZWREb2N0b3JdfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRDbGluaWM9e3RoaXMuc3RhdGUuc2VsZWN0ZWRDbGluaWN9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZS50aW1lU2xvdHMgP1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxUaW1lU2xvdFNlbGVjdG9yXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpbWVTbG90cz17dGhpcy5zdGF0ZS50aW1lU2xvdHN9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdFRpbWVTbG90PXt0aGlzLnNlbGVjdFRpbWVTbG90LmJpbmQodGhpcyl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLz4gOiAnJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NlY3Rpb24+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PiA6IFwiXCJcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cInYtYnRuIHYtYnRuLXByaW1hcnkgYnRuLWxnIGZpeGVkIGhvcml6b250YWwgYm90dG9tIG5vLXJvdW5kIHRleHQtbGdcIj5TZWxlY3Q8L2J1dHRvbj5cblxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IEFwcG9pbnRtZW50U2xvdFxuIiwiaW1wb3J0IEFwcG9pbnRtZW50U2xvdCBmcm9tICcuL0FwcG9pbnRtZW50U2xvdC5qcydcblxuZXhwb3J0IGRlZmF1bHQgQXBwb2ludG1lbnRTbG90IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBTdGVwcGVyLCB7IFN0ZXAsIFN0ZXBMYWJlbCB9IGZyb20gJ21hdGVyaWFsLXVpL1N0ZXBwZXInO1xuXG5pbXBvcnQgQ2FsSWNvbiBmcm9tICdtYXRlcmlhbC11aS1pY29ucy9DYWxsJztcblxuXG5jbGFzcyBCb29raW5nVmlldyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJvb2tpbmdcIj5cbiAgICAgICAgICAgICAgICA8U3RlcHBlciBhY3RpdmVTdGVwPXswfSBhbHRlcm5hdGl2ZUxhYmVsPlxuICAgICAgICAgICAgICAgICAgICA8U3RlcCBrZXk9ezB9PlxuICAgICAgICAgICAgICAgICAgICAgICAgPFN0ZXBMYWJlbD57XCJBcHBvaW50bWVudCBSZXF1ZXN0ZWRcIn08L1N0ZXBMYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgPC9TdGVwPlxuICAgICAgICAgICAgICAgICAgICA8U3RlcCBrZXk9ezF9PlxuICAgICAgICAgICAgICAgICAgICAgICAgPFN0ZXBMYWJlbD57XCJBcHBvaW50bWVudCBDb25maXJtZWRcIn08L1N0ZXBMYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgPC9TdGVwPlxuICAgICAgICAgICAgICAgICAgICA8U3RlcCBrZXk9ezJ9PlxuICAgICAgICAgICAgICAgICAgICAgICAgPFN0ZXBMYWJlbD57XCJBcHBvaW50bWVudCBDb21wbGV0ZVwifTwvU3RlcExhYmVsPlxuICAgICAgICAgICAgICAgICAgICA8L1N0ZXA+XG4gICAgICAgICAgICAgICAgPC9TdGVwcGVyPlxuICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInJlcXVlc3RMaW5lXCI+V2UgaGF2ZSByZXF1ZXN0ZWQgRHIuU21pdGggdG8gY29uZmlybSB5b3VyIGFwcG9pbnRtZW50PC9wPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGF0aWVudE5hbWVcIj5cbiAgICAgICAgICAgICAgICAgICAgPHA+Zm9yPC9wPlxuICAgICAgICAgICAgICAgICAgICA8cD5CcmlqZXNoIEt1bWFyPC9wPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJkZXRhaWxzXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJsYmxcIj5XaXRoPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiY250bnRcIj5Eci4gU3RldmUgU21pdGg8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwibGJsXCI+V2hlcmU8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJjbnRudFwiPlNhcnZvZGF5YSBDbGluaWMsICMgMzYxLCBTZWN0b3IgNTAsIEd1cmdhb248L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwibGJsXCI+V2hlbjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImNudG50XCI+V2VkbmVzZGF5LCBKdW5lIDI3LCAyMDE4LCAxMTo0NUFNPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImxibFwiPlJlZmVyZW5jZSM8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJjbnRudFwiPkhVVkhKQjg3SEpCSkg8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJyZXF1ZXN0XCI+UmVxdWVzdCBSZS1TY2hlZHVsZS9DYW5jZWw8L2J1dHRvbj5cblxuICAgICAgICAgICAgICAgIDxDYWxJY29uIGNsYXNzTmFtZT1cImNhbGxJY29uXCIvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IEJvb2tpbmdWaWV3XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgRG9jdG9yUHJvZmlsZUNhcmQgZnJvbSAnLi4vY29tbW9ucy9kb2N0b3JQcm9maWxlQ2FyZC9pbmRleC5qcydcbmltcG9ydCBDbGluaWNTZWxlY3RvciBmcm9tICcuLi9jb21tb25zL2NsaW5pY1NlbGVjdG9yL2luZGV4LmpzJ1xuXG5jbGFzcyBDbGluaWNMaXN0VmlldyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgICBzZWxlY3RlZERvY3RvcjogbnVsbFxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIGxldCBkb2N0b3JJZCA9IHRoaXMucHJvcHMubWF0Y2gucGFyYW1zLmlkXG4gICAgICAgIGlmIChkb2N0b3JJZCkge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHNlbGVjdGVkRG9jdG9yOiBkb2N0b3JJZCB9KVxuICAgICAgICAgICAgdGhpcy5wcm9wcy5nZXREb2N0b3JCeUlkKGRvY3RvcklkKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImRvY3RvclByb2ZpbGVcIj5cblxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5ET0NUT1JTW3RoaXMuc3RhdGUuc2VsZWN0ZWREb2N0b3JdID9cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPERvY3RvclByb2ZpbGVDYXJkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhpZGVCb3R0b209e3RydWV9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhpZGVCb29rTm93PXt0cnVlfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXRhaWxzPXt0aGlzLnByb3BzLkRPQ1RPUlNbdGhpcy5zdGF0ZS5zZWxlY3RlZERvY3Rvcl19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Q2xpbmljU2VsZWN0b3JcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGV0YWlscz17dGhpcy5wcm9wcy5ET0NUT1JTW3RoaXMuc3RhdGUuc2VsZWN0ZWREb2N0b3JdfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7Li4udGhpcy5wcm9wc31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+IDogXCJcIlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBDbGluaWNMaXN0Vmlld1xuIiwiaW1wb3J0IENsaW5pY0xpc3RWaWV3IGZyb20gJy4vQ2xpbmljTGlzdFZpZXcuanMnXG5cbmV4cG9ydCBkZWZhdWx0IENsaW5pY0xpc3RWaWV3IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cbmNsYXNzIENsaW5pY1NlbGVjdG9yIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICB9XG5cbiAgICBzZWxlY3RDbGluaWMoY2xpbmljSWQpIHtcbiAgICAgICAgbGV0IGRvY3RvcklkID0gdGhpcy5wcm9wcy5tYXRjaC5wYXJhbXMuaWRcbiAgICAgICAgdGhpcy5wcm9wcy5oaXN0b3J5LnB1c2goYC9vcGQvZG9jdG9yLyR7ZG9jdG9ySWR9LyR7Y2xpbmljSWR9L2Jvb2tgKVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICBsZXQgeyBuYW1lLCBob3NwaXRhbHMgfSA9IHRoaXMucHJvcHMuZGV0YWlsc1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIndpZGdldC1wYW5lbFwiPlxuICAgICAgICAgICAgICAgIDxoNCBjbGFzc05hbWU9XCJwYW5lbC10aXRsZVwiPkRyLiB7bmFtZX0gQXZhaWxhYmxlIGF0PC9oND5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBhbmVsLWNvbnRlbnQgc2Nyb2xsLXhcIj5cbiAgICAgICAgICAgICAgICAgICAgPHVsIGNsYXNzTmFtZT1cImlubGluZS1saXN0IENsaW5pYy1jYXJkLWxpc3RcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBob3NwaXRhbHMubWFwKChob3NwaXRhbCwgaSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gPGxpIGtleT17aX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIndpZGdldCBuby1zaGFkb3dcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIndpZGdldC1oZWFkZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGg0IGNsYXNzTmFtZT1cIndpZGdldC10aXRsZSB0ZXh0LW1kIGZ3LTcwMFwiPntob3NwaXRhbC5ob3NwaXRhbF9uYW1lfSA8c3BhbiBjbGFzc05hbWU9XCJmbG9hdC1yaWdodFwiPlJzIHtob3NwaXRhbC5mZWVzfTwvc3Bhbj48L2g0PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwid2lkZ2V0LWNvbnRlbnRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsb2NhdGlvbi1kZXRhaWxzXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW1nIHNyYz1cIi9hc3NldHMvaW1nL2N1c3RvbWVyLWljb25zL21hcC1tYXJrZXItYmx1ZS5wbmdcIiBjbGFzc05hbWU9XCJpbWctZmx1aWRcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwiYWRkcmVzc1wiPntob3NwaXRhbC5hZGRyZXNzfTwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGltaW5nLWRldGFpbHNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBPYmplY3Qua2V5cyhob3NwaXRhbC50aW1pbmdzKS5tYXAoKHRpbWluZ0tleSwga2V5KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiA8cCBjbGFzc05hbWU9XCJmdy03MDBcIiBrZXk9e2tleX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiZnctNzAwIHRleHQtbWQgdGV4dC1wcmltYXJ5XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3RpbWluZ0tleX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7aG9zcGl0YWwudGltaW5nc1t0aW1pbmdLZXldLmpvaW4oJywgJyl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIndpZGdldC1mb290ZXIgdGV4dC1jZW50ZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJ2LWJ0biB2LWJ0bi1wcmltYXJ5IG91dGxpbmVcIiBvbkNsaWNrPXt0aGlzLnNlbGVjdENsaW5pYy5iaW5kKHRoaXMsIGhvc3BpdGFsLmhvc3BpdGFsX2lkKX0+Qm9vayBOb3c8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBDbGluaWNTZWxlY3RvclxuIiwiaW1wb3J0IENsaW5pY1NlbGVjdG9yIGZyb20gJy4vQ2xpbmljU2VsZWN0b3IuanMnXG5cbmV4cG9ydCBkZWZhdWx0IENsaW5pY1NlbGVjdG9yIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cbmNsYXNzIERvY3RvclByb2ZpbGVDYXJkIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICB9XG5cbiAgICBjYXJkQ2xpY2soaWQsIGUpIHtcbiAgICAgICAgdGhpcy5wcm9wcy5oaXN0b3J5LnB1c2goYC9vcGQvZG9jdG9yLyR7aWR9YClcbiAgICB9XG5cbiAgICBib29rTm93KGlkLCBlKSB7XG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKClcbiAgICAgICAgLy8gdGhpcy5wcm9wcy5oaXN0b3J5LnB1c2goYC9kb2N0b3Jwcm9maWxlLyR7aWR9L2F2YWlsYWJpbGl0eWApXG4gICAgfVxuXG4gICAgZ2V0UXVhbGlmaWNhdGlvblN0cihxdWFsaWZpY2F0aW9uU3BlY2lhbGl6YXRpb24pIHtcbiAgICAgICAgcmV0dXJuIHF1YWxpZmljYXRpb25TcGVjaWFsaXphdGlvbi5yZWR1Y2UoKHN0ciwgY3VyciwgaSkgPT4ge1xuICAgICAgICAgICAgc3RyICs9IGAke2N1cnIucXVhbGlmaWNhdGlvbn1gXG4gICAgICAgICAgICBpZiAoY3Vyci5zcGVjaWFsaXphdGlvbikge1xuICAgICAgICAgICAgICAgIHN0ciArPSBgIC0gJHtjdXJyLnNwZWNpYWxpemF0aW9ufWBcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChpIDwgcXVhbGlmaWNhdGlvblNwZWNpYWxpemF0aW9uLmxlbmd0aCAtIDEpIHN0ciArPSBgLCBgO1xuICAgICAgICAgICAgcmV0dXJuIHN0clxuICAgICAgICB9LCBcIlwiKVxuICAgIH1cblxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIGxldCB7IGlkLCBleHBlcmllbmNlX3llYXJzLCBnZW5kZXIsIGhvc3BpdGFscywgaG9zcGl0YWxfY291bnQsIG5hbWUsIHF1YWxpZmljYXRpb25zIH0gPSB0aGlzLnByb3BzLmRldGFpbHNcblxuICAgICAgICBsZXQgaG9zcGl0YWwgPSBob3NwaXRhbHNbMF1cblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3aWRnZXQgY2FyZCBzZWFyY2gtZHItbGlzdFwiIG9uQ2xpY2s9e3RoaXMuY2FyZENsaWNrLmJpbmQodGhpcywgaWQpfT5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIndpZGdldC1oZWFkZXIgZHItaW5mb1wiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJhdGluZy1hZGRyZXNzIGJldGFcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx1bCBjbGFzc05hbWU9XCJpbmxpbmUtbGlzdCByYXR0aW5nXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpPjxzcGFuIGNsYXNzTmFtZT1cImN0LWltZyBjdC1pbWcteHMgc3Rhci1pY29uXCI+PGltZyBzcmM9XCIvYXNzZXRzL2ltZy9jdXN0b21lci1pY29ucy9zdGFyLnN2Z1wiIGNsYXNzTmFtZT1cImltZy1mbHVpZFwiIC8+PC9zcGFuPjwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpPjxzcGFuIGNsYXNzTmFtZT1cImN0LWltZyBjdC1pbWcteHMgc3Rhci1pY29uXCI+PGltZyBzcmM9XCIvYXNzZXRzL2ltZy9jdXN0b21lci1pY29ucy9zdGFyLnN2Z1wiIGNsYXNzTmFtZT1cImltZy1mbHVpZFwiIC8+PC9zcGFuPjwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpPjxzcGFuIGNsYXNzTmFtZT1cImN0LWltZyBjdC1pbWcteHMgc3Rhci1pY29uXCI+PGltZyBzcmM9XCIvYXNzZXRzL2ltZy9jdXN0b21lci1pY29ucy9zdGFyLnN2Z1wiIGNsYXNzTmFtZT1cImltZy1mbHVpZFwiIC8+PC9zcGFuPjwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpPjxzcGFuIGNsYXNzTmFtZT1cImN0LWltZyBjdC1pbWcteHMgc3Rhci1pY29uXCI+PGltZyBzcmM9XCIvYXNzZXRzL2ltZy9jdXN0b21lci1pY29ucy9zdGFyLnN2Z1wiIGNsYXNzTmFtZT1cImltZy1mbHVpZFwiIC8+PC9zcGFuPjwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpPjxzcGFuIGNsYXNzTmFtZT1cImN0LWltZyBjdC1pbWcteHMgc3Rhci1pY29uXCI+PGltZyBzcmM9XCIvYXNzZXRzL2ltZy9jdXN0b21lci1pY29ucy9oYWxmLXN0YXIuc3ZnXCIgY2xhc3NOYW1lPVwiaW1nLWZsdWlkXCIgLz48L3NwYW4+PC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cD48c3BhbiBjbGFzc05hbWU9XCJjdC1pbWcgY3QtaW1nLXhzXCI+PGltZyBzcmM9XCIvYXNzZXRzL2ltZy9jdXN0b21lci1pY29ucy9tYXAtbWFya2VyLWJsdWUuc3ZnXCIgY2xhc3NOYW1lPVwiaW1nLWZsdWlkXCIgLz48L3NwYW4+e2hvc3BpdGFsLmFkZHJlc3N9PC9wPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhbHBoYSBkci1uYW1lXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aW1nIHNyYz1cIi9hc3NldHMvaW1nL2N1c3RvbWVyLWljb25zL3VzZXIucG5nXCIgY2xhc3NOYW1lPVwiaW1nLWZsdWlkXCIgLz4ge25hbWV9XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwid2lkZ2V0LWNvbnRlbnRcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZXRhIG90aGVyLWluZm8gdGV4dC1yaWdodFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJ2LWJ0biB2LWJ0bi1wcmltYXJ5IGJ0bi1zbVwiPkJvb2sgTm93PC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInByaWNpbmdcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXByaW1hcnkgZnctNzAwIG5ldy1wcmljZVwiPlJzIHtob3NwaXRhbC5kaXNjb3VudGVkX2ZlZXN9IDxzcGFuIGNsYXNzTmFtZT1cIm9sZC1wcmljZVwiPlJzIHtob3NwaXRhbC5mZWVzfTwvc3Bhbj48L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWxwaGEgZHItZXhwLWRldGFpbHNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cImRyLWRlc2cgdGV4dC1tZFwiPnt0aGlzLmdldFF1YWxpZmljYXRpb25TdHIocXVhbGlmaWNhdGlvbnMpfTwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtc20gZnctNTAwIHRleHQtbGlnaHRcIj57ZXhwZXJpZW5jZV95ZWFyc30gWWVhcnMgb2YgRXhwZXJpbmNlPC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1zbSBmdy01MDAgdGV4dC1saWdodFwiPkV4IC0gQUlJTVMsICBFeC0gRm9ydGlzPC9wPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIndpZGdldC1mb290ZXIgY2FyZC1mb290ZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLTZcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cD48aW1nIHNyYz1cIi9hc3NldHMvaW1nL2N1c3RvbWVyLWljb25zL2hvbWUuc3ZnXCIgY2xhc3NOYW1lPVwiaW1nLWZsdWlkXCIgLz48c3BhbiBjbGFzc05hbWU9XCJDbGluYy1uYW1lXCI+e2hvc3BpdGFsLmhvc3BpdGFsX25hbWV9IDxiciAvPiZhbXA7IHtob3NwaXRhbF9jb3VudCAtIDF9IE1vcmU8L3NwYW4+PC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC02XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHA+PGltZyBzcmM9XCIvYXNzZXRzL2ltZy9jdXN0b21lci1pY29ucy9jbG9jay1ibGFjay5zdmdcIiBjbGFzc05hbWU9XCJpbWctZmx1aWRcIiAvPjxzcGFuIGNsYXNzTmFtZT1cInRpbWUtYXZhaWxhYmlsaXR5XCI+e2hvc3BpdGFsLnRpbWluZ3NbXCJNb24tU3VuXCJdID8gaG9zcGl0YWwudGltaW5nc1tcIk1vbi1TdW5cIl1bMF0gOiBcIlwifTwvc3Bhbj48L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgRG9jdG9yUHJvZmlsZUNhcmRcbiIsImltcG9ydCBEb2N0b3JQcm9maWxlQ2FyZCBmcm9tICcuL0RvY3RvclByb2ZpbGVDYXJkLmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBEb2N0b3JQcm9maWxlQ2FyZCIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmNsYXNzIFNlbGVjdGVkQ2xpbmljIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcblxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0UXVhbGlmaWNhdGlvblN0cihxdWFsaWZpY2F0aW9uU3BlY2lhbGl6YXRpb24pIHtcbiAgICAgICAgcmV0dXJuIHF1YWxpZmljYXRpb25TcGVjaWFsaXphdGlvbi5yZWR1Y2UoKHN0ciwgY3VyciwgaSkgPT4ge1xuICAgICAgICAgICAgc3RyICs9IGAke2N1cnIucXVhbGlmaWNhdGlvbn1gXG4gICAgICAgICAgICBpZiAoY3Vyci5zcGVjaWFsaXphdGlvbikge1xuICAgICAgICAgICAgICAgIHN0ciArPSBgIC0gJHtjdXJyLnNwZWNpYWxpemF0aW9ufWBcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChpIDwgcXVhbGlmaWNhdGlvblNwZWNpYWxpemF0aW9uLmxlbmd0aCAtIDEpIHN0ciArPSBgLCBgO1xuICAgICAgICAgICAgcmV0dXJuIHN0clxuICAgICAgICB9LCBcIlwiKVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICBsZXQgeyBuYW1lLCBxdWFsaWZpY2F0aW9ucywgaG9zcGl0YWxzIH0gPSB0aGlzLnByb3BzLnNlbGVjdGVkRG9jdG9yXG4gICAgICAgIGxldCBob3NwaXRhbE5hbWUgPSBcIlwiXG5cbiAgICAgICAgaWYgKGhvc3BpdGFscyAmJiBob3NwaXRhbHMubGVuZ3RoKSB7XG4gICAgICAgICAgICBob3NwaXRhbHMubWFwKChob3NwaXRhbCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChob3NwaXRhbC5ob3NwaXRhbF9pZCA9PSB0aGlzLnByb3BzLnNlbGVjdGVkQ2xpbmljKSB7XG4gICAgICAgICAgICAgICAgICAgIGhvc3BpdGFsTmFtZSA9IGhvc3BpdGFsLmhvc3BpdGFsX25hbWVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwid2lkZ2V0IG1ydC0xMCBjdC1wcm9maWxlIHNraW4td2hpdGVcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIndpZGdldC1oZWFkZXIgZHItcXVjaWstaW5mb1wiPlxuICAgICAgICAgICAgICAgICAgICA8aW1nIHNyYz1cIi9hc3NldHMvaW1nL2N1c3RvbWVyLWljb25zL3VzZXIucG5nXCIgY2xhc3NOYW1lPVwiaW1nLWZsdWlkXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJkci1wcm9maWxlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aDQgY2xhc3NOYW1lPVwiZHItbmFtZVwiPntuYW1lfTwvaDQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJkZXNnXCI+e3RoaXMuZ2V0UXVhbGlmaWNhdGlvblN0cihxdWFsaWZpY2F0aW9ucyl9PC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGg0IGNsYXNzTmFtZT1cImRyLW5hbWUgY2xpbmljLW5hbWUgbXJ0LTEwIHRleHQtc21cIj57aG9zcGl0YWxOYW1lfTwvaDQ+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IFNlbGVjdGVkQ2xpbmljXG4iLCJpbXBvcnQgU2VsZWN0ZWRDbGluaWMgZnJvbSAnLi9TZWxlY3RlZENsaW5pYy5qcydcblxuZXhwb3J0IGRlZmF1bHQgU2VsZWN0ZWRDbGluaWMiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5jb25zdCBkZWJvdW5jZXIgPSAoZm4sIGRlbGF5KSA9PiB7XG4gICAgbGV0IHRpbWVyID0gbnVsbFxuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aW1lcilcbiAgICAgICAgdGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIGZuLmNhbGwodGhpcylcbiAgICAgICAgfSwgZGVsYXkpXG4gICAgfVxufVxuXG5cbmNsYXNzIENyaXRlcmlhU2VhcmNoVmlldyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgICBzZWFyY2hWYWx1ZTogJycsXG4gICAgICAgICAgICBzZWFyY2hSZXN1bHRzOiBbXVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIHRoaXMuZ2V0U2VhcmNoUmVzdWx0cyA9IGRlYm91bmNlcih0aGlzLmdldFNlYXJjaFJlc3VsdHMuYmluZCh0aGlzKSwgMTAwMClcbiAgICAgICAgbGV0IGlucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RvcENyaXRlcmlhU2VhcmNoJylcbiAgICAgICAgaW5wdXQuZm9jdXMoKVxuICAgIH1cblxuICAgIGlucHV0SGFuZGxlcihlKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBzZWFyY2hWYWx1ZTogZS50YXJnZXQudmFsdWUgfSlcbiAgICAgICAgdGhpcy5nZXRTZWFyY2hSZXN1bHRzKClcbiAgICB9XG5cbiAgICBnZXRTZWFyY2hSZXN1bHRzKCkge1xuICAgICAgICB0aGlzLnByb3BzLmdldENyaXRlcmlhUmVzdWx0cyh0aGlzLnN0YXRlLnNlYXJjaFZhbHVlLCAoc2VhcmNoUmVzdWx0cykgPT4ge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHNlYXJjaFJlc3VsdHM6IHNlYXJjaFJlc3VsdHMucmVzdWx0IH0pXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgYWRkQ3JpdGVyaWEoY3JpdGVyaWEsIHR5cGUpIHtcbiAgICAgICAgY3JpdGVyaWEudHlwZSA9IHR5cGVcbiAgICAgICAgdGhpcy5wcm9wcy50b2dnbGVDcml0ZXJpYShjcml0ZXJpYSlcbiAgICAgICAgdGhpcy5jb250ZXh0LnJvdXRlci5oaXN0b3J5LmdvQmFjaygpXG4gICAgfVxuXG4gICAgc3RhdGljIGNvbnRleHRUeXBlcyA9IHtcbiAgICAgICAgcm91dGVyOiAoKSA9PiBudWxsXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxvY2F0aW9uU2VhcmNoXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsb2NhdGlvblNlYXJjaEJveFwiPlxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgY2xhc3NOYW1lPVwidG9wU2VhcmNoXCIgaWQ9XCJ0b3BDcml0ZXJpYVNlYXJjaFwiIG9uQ2hhbmdlPXt0aGlzLmlucHV0SGFuZGxlci5iaW5kKHRoaXMpfSB2YWx1ZT17dGhpcy5zdGF0ZS5zZWFyY2hWYWx1ZX0gcGxhY2Vob2xkZXI9XCJTZWFyY2ggZm9yIHN5bXB0b21zLCBEb2N0b3MsIGNvbmRpdGlvbnMgLi5ldGNcIi8+XG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUuc2VhcmNoUmVzdWx0cy5tYXAoKHR5cGUsaSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT1cInNlYXJjaFJlc3VsdFR5cGVcIiBrZXk9e2l9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cD57dHlwZS5uYW1lfTwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZS5kYXRhLm1hcCgocmVzdWx0RGF0YSxqKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDxzcGFuIGtleT17an0gY2xhc3NOYW1lPVwicGFjLWl0ZW1cIiBvbkNsaWNrPXt0aGlzLmFkZENyaXRlcmlhLmJpbmQodGhpcywgcmVzdWx0RGF0YSwgdHlwZS50eXBlKX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtyZXN1bHREYXRhLm5hbWV9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgQ3JpdGVyaWFTZWFyY2hWaWV3XG4iLCJpbXBvcnQgQ3JpdGVyaWFTZWFyY2hWaWV3IGZyb20gJy4vQ3JpdGVyaWFTZWFyY2hWaWV3LmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBDcml0ZXJpYVNlYXJjaFZpZXciLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgTG9hZGVyIGZyb20gJy4uLy4uL2NvbW1vbnMvTG9hZGVyJ1xuXG5pbXBvcnQgRG9jdG9yUHJvZmlsZUNhcmQgZnJvbSAnLi9kb2N0b3JQcm9maWxlQ2FyZCdcbmltcG9ydCBBYm91dERvY3RvciBmcm9tICcuLi9kb2N0b3JQcm9maWxlL2Fib3V0RG9jdG9yL2luZGV4LmpzJ1xuaW1wb3J0IFByb2Zlc3Npb25hbEdyYXBoIGZyb20gJy4uL2RvY3RvclByb2ZpbGUvcHJvZmVzc2lvbmFsR3JhcGgvaW5kZXguanMnXG5pbXBvcnQgQ2xpbmljU2VsZWN0b3IgZnJvbSAnLi4vY29tbW9ucy9jbGluaWNTZWxlY3Rvci9pbmRleC5qcydcblxuY2xhc3MgRG9jdG9yUHJvZmlsZVZpZXcgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgc2VsZWN0ZWREb2N0b3I6IHRoaXMucHJvcHMubWF0Y2gucGFyYW1zLmlkXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXY+XG5cbiAgICAgICAgICAgICAgICA8aGVhZGVyIGNsYXNzTmFtZT1cInNraW4tcHJpbWFyeSBmaXhlZCBob3Jpem9udGFsIHRvcFwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lci1mbHVpZFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC00XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaGVhZGVyLXRpdGxlIGZ3LTcwMCBjYXBpdGFsaXplIHRleHQtd2hpdGVcIj5JQ09OPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtNFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLTRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHVsIGNsYXNzTmFtZT1cImlubGluZS1saXN0IGZsb2F0LXJpZ2h0IHVzZXItbm90aWZpY2F0aW9uLWFjdGlvblwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpPjxzcGFuIGNsYXNzTmFtZT1cImljb24gaWNvbi1tZCB0ZXh0LW1pZGRsZVwiPjxpbWcgc3JjPVwiL2Fzc2V0cy9pbWcvY3VzdG9tZXItaWNvbnMvdXNlci5zdmdcIiBjbGFzc05hbWU9XCJpbWctZmx1aWRcIiAvPjwvc3Bhbj48L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpPjxzcGFuIGNsYXNzTmFtZT1cImljb24gaWNvbi1tZCB0ZXh0LW1pZGRsZSBub3RpZmljYXRpb24taWNvblwiPjxpbWcgc3JjPVwiL2Fzc2V0cy9pbWcvY3VzdG9tZXItaWNvbnMvbm90aWZpY2F0aW9uLnN2Z1wiIGNsYXNzTmFtZT1cImltZy1mbHVpZFwiIC8+IDxzcGFuIGNsYXNzTmFtZT1cIm5vdGlmaWNhdGlvbi1hbGVydFwiIC8+PC9zcGFuPjwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9oZWFkZXI+XG5cbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuRE9DVE9SU1t0aGlzLnN0YXRlLnNlbGVjdGVkRG9jdG9yXSA/XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzZWN0aW9uIGNsYXNzTmFtZT1cIndyYXAgZHItcHJvZmlsZS1zY3JlZW5cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250YWluZXItZmx1aWRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtMTJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3aWRnZXQgbXJ0LTEwIGN0LXByb2ZpbGUgc2tpbi13aGl0ZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPERvY3RvclByb2ZpbGVDYXJkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGV0YWlscz17dGhpcy5wcm9wcy5ET0NUT1JTW3RoaXMuc3RhdGUuc2VsZWN0ZWREb2N0b3JdfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwid2lkZ2UtY29udGVudCBwZC0wXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPEFib3V0RG9jdG9yXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRldGFpbHM9e3RoaXMucHJvcHMuRE9DVE9SU1t0aGlzLnN0YXRlLnNlbGVjdGVkRG9jdG9yXX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPENsaW5pY1NlbGVjdG9yXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRldGFpbHM9e3RoaXMucHJvcHMuRE9DVE9SU1t0aGlzLnN0YXRlLnNlbGVjdGVkRG9jdG9yXX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgey4uLnRoaXMucHJvcHN9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxQcm9mZXNzaW9uYWxHcmFwaFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXRhaWxzPXt0aGlzLnByb3BzLkRPQ1RPUlNbdGhpcy5zdGF0ZS5zZWxlY3RlZERvY3Rvcl19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NlY3Rpb24+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PiA6IDxMb2FkZXIgLz5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IERvY3RvclByb2ZpbGVWaWV3XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcblxuY2xhc3MgQWJvdXREb2N0b3IgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgICBsZXNzQWJvdXQ6IFwiXCIsXG4gICAgICAgICAgICByZWFkTW9yZTogZmFsc2VcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgICBsZXQgeyBhYm91dCB9ID0gdGhpcy5wcm9wcy5kZXRhaWxzXG5cbiAgICAgICAgaWYgKGFib3V0ICYmIGFib3V0Lmxlbmd0aCA+IDEwMCkge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgcmVhZE1vcmU6IHRydWVcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIGxlc3NBYm91dDogYWJvdXQuc2xpY2UoMCwgMTAwKVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICBsZXQgeyBhYm91dCwgbmFtZSB9ID0gdGhpcy5wcm9wcy5kZXRhaWxzXG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwid2lkZ2V0LXBhbmVsXCI+XG4gICAgICAgICAgICAgICAgPGg0IGNsYXNzTmFtZT1cInBhbmVsLXRpdGxlXCI+QWJvdXQge25hbWV9PC9oND5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBhbmVsLWNvbnRlbnRcIj5cbiAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwiZnctNTAwIHRleHQtbWRcIj57dGhpcy5zdGF0ZS5sZXNzQWJvdXR9XG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZS5yZWFkTW9yZSA/IDxhIGNsYXNzTmFtZT1cImZ3LTcwMCB0ZXh0LXByaW1hcnlcIiBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyByZWFkTW9yZTogZmFsc2UsIGxlc3NBYm91dDogYWJvdXQgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fT5SRUFEIE1PUkU8L2E+IDogXCJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgQWJvdXREb2N0b3JcbiIsImltcG9ydCBBYm91dERvY3RvciBmcm9tICcuL0Fib3V0RG9jdG9yLmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBBYm91dERvY3RvciIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG5jbGFzcyBEb2N0b3JQcm9maWxlQ2FyZCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgfVxuXG4gICAgZ2V0UXVhbGlmaWNhdGlvblN0cihxdWFsaWZpY2F0aW9uU3BlY2lhbGl6YXRpb24pIHtcbiAgICAgICAgcmV0dXJuIHF1YWxpZmljYXRpb25TcGVjaWFsaXphdGlvbi5yZWR1Y2UoKHN0ciwgY3VyciwgaSkgPT4ge1xuICAgICAgICAgICAgc3RyICs9IGAke2N1cnIucXVhbGlmaWNhdGlvbn1gXG4gICAgICAgICAgICBpZiAoY3Vyci5zcGVjaWFsaXphdGlvbikge1xuICAgICAgICAgICAgICAgIHN0ciArPSBgIC0gJHtjdXJyLnNwZWNpYWxpemF0aW9ufWBcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChpIDwgcXVhbGlmaWNhdGlvblNwZWNpYWxpemF0aW9uLmxlbmd0aCAtIDEpIHN0ciArPSBgLCBgO1xuICAgICAgICAgICAgcmV0dXJuIHN0clxuICAgICAgICB9LCBcIlwiKVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICBsZXQgeyBuYW1lLCBleHBlcmllbmNlX3llYXJzLCBxdWFsaWZpY2F0aW9ucyB9ID0gdGhpcy5wcm9wcy5kZXRhaWxzXG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwid2lkZ2V0LWhlYWRlciBkci1xdWNpay1pbmZvXCI+XG4gICAgICAgICAgICAgICAgPGltZyBzcmM9XCIvYXNzZXRzL2ltZy9jdXN0b21lci1pY29ucy91c2VyLnBuZ1wiIGNsYXNzTmFtZT1cImltZy1mbHVpZFwiIC8+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJkci1wcm9maWxlXCI+XG4gICAgICAgICAgICAgICAgICAgIDxoNCBjbGFzc05hbWU9XCJkci1uYW1lXCI+e25hbWV9PC9oND5cbiAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwiZGVzZ1wiPnt0aGlzLmdldFF1YWxpZmljYXRpb25TdHIocXVhbGlmaWNhdGlvbnMpfTwvcD5cbiAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwiYWRkLWRldGFpbHNcIj57ZXhwZXJpZW5jZV95ZWFyc30gWWVhcnMgb2YgRXhwZXJpbmNlPC9wPlxuICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJhZGQtZGV0YWlsc1wiPkV4IC0gQUlJTVMsIEV4LSBGb3J0aXM8L3A+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgRG9jdG9yUHJvZmlsZUNhcmRcbiIsImltcG9ydCBEb2N0b3JQcm9maWxlQ2FyZCBmcm9tICcuL0RvY3RvclByb2ZpbGVDYXJkJ1xuXG5leHBvcnQgZGVmYXVsdCBEb2N0b3JQcm9maWxlQ2FyZCIsImltcG9ydCBEb2N0b3JQcm9maWxlVmlldyBmcm9tICcuL0RvY3RvclByb2ZpbGVWaWV3LmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBEb2N0b3JQcm9maWxlVmlldyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG5pbXBvcnQgRXhwYW5zaW9uUGFuZWwsIHtcbiAgICBFeHBhbnNpb25QYW5lbFN1bW1hcnksXG4gICAgRXhwYW5zaW9uUGFuZWxEZXRhaWxzLFxufSBmcm9tICdtYXRlcmlhbC11aS9FeHBhbnNpb25QYW5lbCc7XG5pbXBvcnQgRXhwYW5kTW9yZUljb24gZnJvbSAnbWF0ZXJpYWwtdWktaWNvbnMvRXhwYW5kTW9yZSc7XG5cblxuY2xhc3MgUHJvZmVzc2lvbmFsR3JhcGggZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIndpZGdldC1wYW5lbFwiPlxuICAgICAgICAgICAgICAgIDxoNCBjbGFzc05hbWU9XCJwYW5lbC10aXRsZVwiPlByb2Zlc3Npb25hbCBHcmFwaDwvaDQ+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwYW5lbC1jb250ZW50IHBkLTBcIj5cbiAgICAgICAgICAgICAgICAgICAgPHVsIGNsYXNzTmFtZT1cImxpc3QgZHJvcC1kb3duLWxpc3RcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxsaT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8RXhwYW5zaW9uUGFuZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxFeHBhbnNpb25QYW5lbFN1bW1hcnkgZXhwYW5kSWNvbj17PEV4cGFuZE1vcmVJY29uIC8+fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGl0bGVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBFZHVjYXRpb24gPHNwYW4gY2xhc3NOYW1lPVwiZmxvYXQtcmlnaHRcIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9FeHBhbnNpb25QYW5lbFN1bW1hcnk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxFeHBhbnNpb25QYW5lbERldGFpbHM+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vcmUtY29udGVudFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiZnctNzAwIHRleHQtc20gdGV4dC1wcmltYXJ5XCI+UXVhbGlmaWNhdGlvbjwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cImZ3LTcwMCB0ZXh0LW1kIHRleHQtbGlnaHRcIj5NRDwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImZ3LTcwMCB0ZXh0LXNtIHRleHQtcHJpbWFyeVwiPlNwZWNpYWxpemF0aW9uPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwiZnctNzAwIHRleHQtbWQgdGV4dC1saWdodFwiPkRlcm1pdG9sb2d5PC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiZnctNzAwIHRleHQtc20gdGV4dC1wcmltYXJ5XCI+Q29sbGVnZTwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cImZ3LTcwMCB0ZXh0LW1kIHRleHQtbGlnaHRcIj5NR1UgVW5pdmVyc2l0eSwgMjAwOTwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0V4cGFuc2lvblBhbmVsRGV0YWlscz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0V4cGFuc2lvblBhbmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxsaT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8RXhwYW5zaW9uUGFuZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxFeHBhbnNpb25QYW5lbFN1bW1hcnkgZXhwYW5kSWNvbj17PEV4cGFuZE1vcmVJY29uIC8+fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGl0bGVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBBc3NvY2lhdGUgQ2xpbmljL0hvc3BpdGFsIDxzcGFuIGNsYXNzTmFtZT1cImZsb2F0LXJpZ2h0XCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvRXhwYW5zaW9uUGFuZWxTdW1tYXJ5PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8RXhwYW5zaW9uUGFuZWxEZXRhaWxzPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb3JlLWNvbnRlbnRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImZ3LTcwMCB0ZXh0LXNtIHRleHQtcHJpbWFyeVwiPlF1YWxpZmljYXRpb248L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJmdy03MDAgdGV4dC1tZCB0ZXh0LWxpZ2h0XCI+TUQ8L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJmdy03MDAgdGV4dC1zbSB0ZXh0LXByaW1hcnlcIj5TcGVjaWFsaXphdGlvbjwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cImZ3LTcwMCB0ZXh0LW1kIHRleHQtbGlnaHRcIj5EZXJtaXRvbG9neTwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImZ3LTcwMCB0ZXh0LXNtIHRleHQtcHJpbWFyeVwiPkNvbGxlZ2U8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJmdy03MDAgdGV4dC1tZCB0ZXh0LWxpZ2h0XCI+TUdVIFVuaXZlcnNpdHksIDIwMDk8L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9FeHBhbnNpb25QYW5lbERldGFpbHM+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9FeHBhbnNpb25QYW5lbD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPEV4cGFuc2lvblBhbmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8RXhwYW5zaW9uUGFuZWxTdW1tYXJ5IGV4cGFuZEljb249ezxFeHBhbmRNb3JlSWNvbiAvPn0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRpdGxlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTGFuZ3VhZ2UgPHNwYW4gY2xhc3NOYW1lPVwiZmxvYXQtcmlnaHRcIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9FeHBhbnNpb25QYW5lbFN1bW1hcnk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxFeHBhbnNpb25QYW5lbERldGFpbHM+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vcmUtY29udGVudFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiZnctNzAwIHRleHQtc20gdGV4dC1wcmltYXJ5XCI+UXVhbGlmaWNhdGlvbjwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cImZ3LTcwMCB0ZXh0LW1kIHRleHQtbGlnaHRcIj5NRDwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImZ3LTcwMCB0ZXh0LXNtIHRleHQtcHJpbWFyeVwiPlNwZWNpYWxpemF0aW9uPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwiZnctNzAwIHRleHQtbWQgdGV4dC1saWdodFwiPkRlcm1pdG9sb2d5PC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiZnctNzAwIHRleHQtc20gdGV4dC1wcmltYXJ5XCI+Q29sbGVnZTwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cImZ3LTcwMCB0ZXh0LW1kIHRleHQtbGlnaHRcIj5NR1UgVW5pdmVyc2l0eSwgMjAwOTwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0V4cGFuc2lvblBhbmVsRGV0YWlscz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0V4cGFuc2lvblBhbmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxsaT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8RXhwYW5zaW9uUGFuZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxFeHBhbnNpb25QYW5lbFN1bW1hcnkgZXhwYW5kSWNvbj17PEV4cGFuZE1vcmVJY29uIC8+fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGl0bGVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBBd2FyZHMgPHNwYW4gY2xhc3NOYW1lPVwiZmxvYXQtcmlnaHRcIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9FeHBhbnNpb25QYW5lbFN1bW1hcnk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxFeHBhbnNpb25QYW5lbERldGFpbHM+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vcmUtY29udGVudFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiZnctNzAwIHRleHQtc20gdGV4dC1wcmltYXJ5XCI+UXVhbGlmaWNhdGlvbjwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cImZ3LTcwMCB0ZXh0LW1kIHRleHQtbGlnaHRcIj5NRDwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImZ3LTcwMCB0ZXh0LXNtIHRleHQtcHJpbWFyeVwiPlNwZWNpYWxpemF0aW9uPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwiZnctNzAwIHRleHQtbWQgdGV4dC1saWdodFwiPkRlcm1pdG9sb2d5PC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiZnctNzAwIHRleHQtc20gdGV4dC1wcmltYXJ5XCI+Q29sbGVnZTwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cImZ3LTcwMCB0ZXh0LW1kIHRleHQtbGlnaHRcIj5NR1UgVW5pdmVyc2l0eSwgMjAwOTwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0V4cGFuc2lvblBhbmVsRGV0YWlscz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0V4cGFuc2lvblBhbmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxsaT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8RXhwYW5zaW9uUGFuZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxFeHBhbnNpb25QYW5lbFN1bW1hcnkgZXhwYW5kSWNvbj17PEV4cGFuZE1vcmVJY29uIC8+fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGl0bGVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBBc3NvY2lhdGUgTWVtYmVyc2hpcCA8c3BhbiBjbGFzc05hbWU9XCJmbG9hdC1yaWdodFwiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0V4cGFuc2lvblBhbmVsU3VtbWFyeT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPEV4cGFuc2lvblBhbmVsRGV0YWlscz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9yZS1jb250ZW50XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJmdy03MDAgdGV4dC1zbSB0ZXh0LXByaW1hcnlcIj5RdWFsaWZpY2F0aW9uPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwiZnctNzAwIHRleHQtbWQgdGV4dC1saWdodFwiPk1EPC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiZnctNzAwIHRleHQtc20gdGV4dC1wcmltYXJ5XCI+U3BlY2lhbGl6YXRpb248L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJmdy03MDAgdGV4dC1tZCB0ZXh0LWxpZ2h0XCI+RGVybWl0b2xvZ3k8L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJmdy03MDAgdGV4dC1zbSB0ZXh0LXByaW1hcnlcIj5Db2xsZWdlPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwiZnctNzAwIHRleHQtbWQgdGV4dC1saWdodFwiPk1HVSBVbml2ZXJzaXR5LCAyMDA5PC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvRXhwYW5zaW9uUGFuZWxEZXRhaWxzPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvRXhwYW5zaW9uUGFuZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGxpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxFeHBhbnNpb25QYW5lbD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPEV4cGFuc2lvblBhbmVsU3VtbWFyeSBleHBhbmRJY29uPXs8RXhwYW5kTW9yZUljb24gLz59PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0aXRsZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEV4cGVyaW5lY2UgPHNwYW4gY2xhc3NOYW1lPVwiZmxvYXQtcmlnaHRcIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9FeHBhbnNpb25QYW5lbFN1bW1hcnk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxFeHBhbnNpb25QYW5lbERldGFpbHM+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vcmUtY29udGVudFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiZnctNzAwIHRleHQtc20gdGV4dC1wcmltYXJ5XCI+UXVhbGlmaWNhdGlvbjwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cImZ3LTcwMCB0ZXh0LW1kIHRleHQtbGlnaHRcIj5NRDwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImZ3LTcwMCB0ZXh0LXNtIHRleHQtcHJpbWFyeVwiPlNwZWNpYWxpemF0aW9uPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwiZnctNzAwIHRleHQtbWQgdGV4dC1saWdodFwiPkRlcm1pdG9sb2d5PC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiZnctNzAwIHRleHQtc20gdGV4dC1wcmltYXJ5XCI+Q29sbGVnZTwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cImZ3LTcwMCB0ZXh0LW1kIHRleHQtbGlnaHRcIj5NR1UgVW5pdmVyc2l0eSwgMjAwOTwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0V4cGFuc2lvblBhbmVsRGV0YWlscz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0V4cGFuc2lvblBhbmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxsaT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8RXhwYW5zaW9uUGFuZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxFeHBhbnNpb25QYW5lbFN1bW1hcnkgZXhwYW5kSWNvbj17PEV4cGFuZE1vcmVJY29uIC8+fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGl0bGVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBTdWJzY3JpYmVkIFNlcml2Y2VzIDxzcGFuIGNsYXNzTmFtZT1cImZsb2F0LXJpZ2h0XCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvRXhwYW5zaW9uUGFuZWxTdW1tYXJ5PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8RXhwYW5zaW9uUGFuZWxEZXRhaWxzPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb3JlLWNvbnRlbnRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImZ3LTcwMCB0ZXh0LXNtIHRleHQtcHJpbWFyeVwiPlF1YWxpZmljYXRpb248L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJmdy03MDAgdGV4dC1tZCB0ZXh0LWxpZ2h0XCI+TUQ8L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJmdy03MDAgdGV4dC1zbSB0ZXh0LXByaW1hcnlcIj5TcGVjaWFsaXphdGlvbjwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cImZ3LTcwMCB0ZXh0LW1kIHRleHQtbGlnaHRcIj5EZXJtaXRvbG9neTwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImZ3LTcwMCB0ZXh0LXNtIHRleHQtcHJpbWFyeVwiPkNvbGxlZ2U8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJmdy03MDAgdGV4dC1tZCB0ZXh0LWxpZ2h0XCI+TUdVIFVuaXZlcnNpdHksIDIwMDk8L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9FeHBhbnNpb25QYW5lbERldGFpbHM+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9FeHBhbnNpb25QYW5lbD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgUHJvZmVzc2lvbmFsR3JhcGhcbiIsImltcG9ydCBQcm9mZXNzaW9uYWxHcmFwaCBmcm9tICcuL1Byb2Zlc3Npb25hbEdyYXBoLmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBQcm9mZXNzaW9uYWxHcmFwaCIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IGF4aW9zIGZyb20gJ2F4aW9zJ1xuXG5jbGFzcyBMb2NhdGlvblNlYXJjaCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgICBzZWFyY2g6IFwiXCIsXG4gICAgICAgICAgICBzZWFyY2hSZXN1bHRzOiBbXVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0TG9jYXRpb24obG9jYXRpb24pIHtcbiAgICAgICAgdmFyIGF1dG8gPSBuZXcgZ29vZ2xlLm1hcHMucGxhY2VzLkF1dG9jb21wbGV0ZVNlcnZpY2UoKVxuXG4gICAgICAgIHZhciByZXF1ZXN0ID0ge1xuICAgICAgICAgICAgaW5wdXQ6IGxvY2F0aW9uLFxuICAgICAgICAgICAgdHlwZXM6IFsnZ2VvY29kZSddLFxuICAgICAgICAgICAgY29tcG9uZW50UmVzdHJpY3Rpb25zOiB7IGNvdW50cnk6ICdpbicgfVxuICAgICAgICB9O1xuICAgICAgICBpZiAobG9jYXRpb24pIHtcbiAgICAgICAgICAgIGF1dG8uZ2V0UGxhY2VQcmVkaWN0aW9ucyhyZXF1ZXN0LCBmdW5jdGlvbiAocmVzdWx0cywgc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0cyA9IHJlc3VsdHMgfHwgW11cbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgc2VhcmNoUmVzdWx0czogcmVzdWx0cyB9KVxuICAgICAgICAgICAgfS5iaW5kKHRoaXMpKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgaW5wdXRIYW5kbGVyKGUpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBzZWFyY2g6IGUudGFyZ2V0LnZhbHVlXG4gICAgICAgIH0pXG4gICAgICAgIHRoaXMuZ2V0TG9jYXRpb24oZS50YXJnZXQudmFsdWUpXG5cbiAgICB9XG5cbiAgICBzZWxlY3RMb2NhdGlvbihsb2NhdGlvbikge1xuICAgICAgICBsZXQgbWFwID0gbmV3IGdvb2dsZS5tYXBzLk1hcChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFwJyksIHtcbiAgICAgICAgICAgIGNlbnRlcjogeyBsYXQ6IC0zMy44NjcsIGxuZzogMTUxLjE5NSB9LFxuICAgICAgICAgICAgem9vbTogMTVcbiAgICAgICAgfSlcbiAgICAgICAgbGV0IHNlcnZpY2UgPSBuZXcgZ29vZ2xlLm1hcHMucGxhY2VzLlBsYWNlc1NlcnZpY2UobWFwKTtcbiAgICAgICAgc2VydmljZS5nZXREZXRhaWxzKHtcbiAgICAgICAgICAgIHJlZmVyZW5jZTogbG9jYXRpb24ucmVmZXJlbmNlXG4gICAgICAgIH0sIGZ1bmN0aW9uIChwbGFjZSwgc3RhdHVzKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLnNlbGVjdExvY2F0aW9uKHBsYWNlKVxuICAgICAgICAgICAgdGhpcy5wcm9wcy5oaXN0b3J5LmdvKC0xKVxuXG4gICAgICAgIH0uYmluZCh0aGlzKSlcbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgbGV0IGlucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RvcExvY2F0aW9uU2VhcmNoJylcbiAgICAgICAgaW5wdXQuZm9jdXMoKVxuICAgIH1cblxuICAgIGRldGVjdExvY2F0aW9uKCkge1xuICAgICAgICBpZiAobmF2aWdhdG9yLmdlb2xvY2F0aW9uKSB7XG4gICAgICAgICAgICBuYXZpZ2F0b3IuZ2VvbG9jYXRpb24uZ2V0Q3VycmVudFBvc2l0aW9uKChwb3NpdGlvbikgPT4ge1xuICAgICAgICAgICAgICAgIHZhciBsYXRsbmcgPSB7IGxhdDogcGFyc2VGbG9hdChwb3NpdGlvbi5jb29yZHMubGF0aXR1ZGUpLCBsbmc6IHBhcnNlRmxvYXQocG9zaXRpb24uY29vcmRzLmxvbmdpdHVkZSkgfTtcblxuICAgICAgICAgICAgICAgIGxldCBnZW9jb2RlciA9IG5ldyBnb29nbGUubWFwcy5HZW9jb2RlclxuICAgICAgICAgICAgICAgIGdlb2NvZGVyLmdlb2NvZGUoeyAnbG9jYXRpb24nOiBsYXRsbmcgfSwgKHJlc3VsdHMsIHN0YXR1cykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0cyAmJiByZXN1bHRzWzBdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnByb3BzLnNlbGVjdExvY2F0aW9uKHJlc3VsdHNbMF0pXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnByb3BzLmhpc3RvcnkuZ28oLTEpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIC8vIGdlb2xvY2F0aW9uIGlzIG5vdCBzdXBwb3J0ZWRcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN0YXRpYyBjb250ZXh0VHlwZXMgPSB7XG4gICAgICAgIHJvdXRlcjogKCkgPT4gbnVsbFxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICA8aGVhZGVyIGNsYXNzTmFtZT1cInNraW4td2hpdGUgZml4ZWQgaG9yaXpvbnRhbCB0b3AgbG9jYXRpb24tZGV0ZWN0LWhlYWRlclwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lci1mbHVpZFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC0xMlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNlbGVjdC1sb2NhdGlvbi1yb3cgdGV4dC1jZW50ZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnByb3BzLmhpc3RvcnkuZ28oLTEpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fSBjbGFzc05hbWU9XCJjdC1pbWcgY3QtaW1nLW1kIGNsb3NlXCI+PGltZyBzcmM9XCIvYXNzZXRzL2ltZy9jdXN0b21lci1pY29ucy9jbG9zZS1ibGFjay5zdmdcIiBjbGFzc05hbWU9XCJpbWctZmx1aWRcIiAvPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoNCBjbGFzc05hbWU9XCJmdy03MDAgdGV4dC1tZFwiPlNlbGVjdCBMb2NhdGlvbjwvaDQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLTEyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic2VhcmNoLXJvd1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG9uLWdyb3VwIGxvY2F0aW9uLWRldGVjdC1maWVsZFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIHZhbHVlPXt0aGlzLnN0YXRlLnNlYXJjaH0gb25DaGFuZ2U9e3RoaXMuaW5wdXRIYW5kbGVyLmJpbmQodGhpcyl9IGNsYXNzTmFtZT1cImZvcm0tY29udHJvbCBpbnB1dC1tZCBzZWFyY2gtaW5wdXQgbm8tc2hhZG93XCIgcGxhY2Vob2xkZXI9XCJTZWxlY3QgYW55IGNpdHkgb3IgbG9jYWxpdHlcIiBpZD1cInRvcExvY2F0aW9uU2VhcmNoXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJjdC1pbWcgY3QtaW1nLXNtIG1hcC1tYXJrZXItYmx1ZVwiPjxpbWcgc3JjPVwiL2Fzc2V0cy9pbWcvY3VzdG9tZXItaWNvbnMvbWFwLW1hcmtlci1ibHVlLnN2Z1wiIGNsYXNzTmFtZT1cImltZy1mbHVpZFwiIC8+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImRldGVjdC1teS1sb2NhaXRvblwiIG9uQ2xpY2s9e3RoaXMuZGV0ZWN0TG9jYXRpb24uYmluZCh0aGlzKX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiY3QtaW1nIGN0LWltZy14c1wiPjxpbWcgc3JjPVwiL2Fzc2V0cy9pbWcvY3VzdG9tZXItaWNvbnMvZ3BzLnN2Z1wiIGNsYXNzTmFtZT1cImltZy1mbHVpZFwiIC8+PC9zcGFuPkRldGVjdCBNeSBMb2NhdGlvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvaGVhZGVyPlxuICAgICAgICAgICAgICAgIDxzZWN0aW9uIGNsYXNzTmFtZT1cIndyYXAgbG9jYXRvbi1kZXRlY3Qtc2NyZWVuXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwid2lkZ2V0LXBhbmVsXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aDQgY2xhc3NOYW1lPVwicGFuZWwtdGl0bGVcIj5TZWFyY2ggUmVzdWx0PC9oND5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGFuZWwtY29udGVudCBwZC0wXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHVsIGNsYXNzTmFtZT1cImxpc3QgY2l0eS1saXN0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUuc2VhcmNoUmVzdWx0cy5tYXAoKHJlc3VsdCwgaSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiA8bGkga2V5PXtpfSBvbkNsaWNrPXt0aGlzLnNlbGVjdExvY2F0aW9uLmJpbmQodGhpcywgcmVzdWx0KX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhPntyZXN1bHQuZGVzY3JpcHRpb259XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJjaXR5LWxvY1wiPkNpdHk8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9zZWN0aW9uPlxuICAgICAgICAgICAgICAgIDxkaXYgaWQ9XCJtYXBcIiBzdHlsZT17eyBkaXNwbGF5OiAnbm9uZScgfX0+PC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgTG9jYXRpb25TZWFyY2hcbiIsImltcG9ydCBMb2NhdGlvblNlYXJjaCBmcm9tICcuL0xvY2F0aW9uU2VhcmNoLmpzJ1xuXG5cbmV4cG9ydCBkZWZhdWx0IExvY2F0aW9uU2VhcmNoIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cbmltcG9ydCBEb2N0b3JQcm9maWxlQ2FyZCBmcm9tICcuLi9jb21tb25zL2RvY3RvclByb2ZpbGVDYXJkL2luZGV4LmpzJ1xuaW1wb3J0IERldGFpbHNGb3JtIGZyb20gJy4vZGV0YWlsc0Zvcm0vaW5kZXguanMnXG5pbXBvcnQgU2VsZWN0ZWRDbGluaWMgZnJvbSAnLi4vY29tbW9ucy9zZWxlY3RlZENsaW5pYy9pbmRleC5qcydcblxuY2xhc3MgUGF0aWVudERldGFpbHMgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgc2VsZWN0ZWREb2N0b3I6IG51bGwsXG4gICAgICAgICAgICBzZWxlY3RlZENsaW5pYzogbnVsbCxcbiAgICAgICAgICAgIHNlbGVjdGVkU2xvdDogbnVsbFxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJvY2VlZCgpe1xuICAgICAgICB0aGlzLmNvbnRleHQucm91dGVyLmhpc3RvcnkucHVzaCgnL3BheW1lbnQnKVxuICAgIH1cblxuICAgIGdldExvY2F0aW9uUGFyYW0odGFnKSB7XG4gICAgICAgIC8vIHRoaXMgQVBJIGFzc3VtZXMgdGhlIGNvbnRleHQgb2YgcmVhY3Qtcm91dGVyLTRcbiAgICAgICAgY29uc3QgcGFyYW1TdHJpbmcgPSB0aGlzLnByb3BzLmxvY2F0aW9uLnNlYXJjaFxuICAgICAgICBjb25zdCBwYXJhbXMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKHBhcmFtU3RyaW5nKVxuICAgICAgICByZXR1cm4gcGFyYW1zLmdldCh0YWcpXG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBsZXQgZG9jdG9ySWQgPSB0aGlzLnByb3BzLm1hdGNoLnBhcmFtcy5pZFxuICAgICAgICAgICAgbGV0IGNsaW5pY0lkID0gdGhpcy5wcm9wcy5tYXRjaC5wYXJhbXMuY2xpbmljSWRcbiAgICAgICAgICAgIGxldCBzZWxlY3RlZFNsb3QgPSB0aGlzLmdldExvY2F0aW9uUGFyYW0oJ3QnKVxuICAgICAgICAgICAgc2VsZWN0ZWRTbG90ID0gbmV3IERhdGUocGFyc2VGbG9hdChzZWxlY3RlZFNsb3QpKVxuICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAoZG9jdG9ySWQgJiYgY2xpbmljSWQgJiYgc2VsZWN0ZWRTbG90KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkRG9jdG9yOiBkb2N0b3JJZCxcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRDbGluaWM6IGNsaW5pY0lkLFxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZFNsb3Q6IHNlbGVjdGVkU2xvdC50b1N0cmluZygpXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB0aGlzLnByb3BzLmdldERvY3RvckJ5SWQoZG9jdG9ySWQpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcblxuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhdGljIGNvbnRleHRUeXBlcyA9IHtcbiAgICAgICAgcm91dGVyOiAoKSA9PiBudWxsXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBhdGllbnREZXRhaWxzXCI+XG5cbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuRE9DVE9SU1t0aGlzLnN0YXRlLnNlbGVjdGVkRG9jdG9yXSA/XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxEb2N0b3JQcm9maWxlQ2FyZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoaWRlQm90dG9tPXt0cnVlfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoaWRlQm9va05vdz17dHJ1ZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGV0YWlscz17dGhpcy5wcm9wcy5ET0NUT1JTW3RoaXMuc3RhdGUuc2VsZWN0ZWREb2N0b3JdfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPFNlbGVjdGVkQ2xpbmljXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkRG9jdG9yPXt0aGlzLnByb3BzLkRPQ1RPUlNbdGhpcy5zdGF0ZS5zZWxlY3RlZERvY3Rvcl19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkQ2xpbmljPXt0aGlzLnN0YXRlLnNlbGVjdGVkQ2xpbmljfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzZWxlY3RlZEFwcG9pbnRtZW50U2xvdFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDU+U2VsZWN0ZWQgQXBwb2ludG1lbnQgU2xvdDwvaDU+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImFwcGRhdGVcIj5BcHBvaW50bWVudCBEYXRlPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJkYXRlXCI+eyB0aGlzLnN0YXRlLnNlbGVjdGVkU2xvdCB9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxEZXRhaWxzRm9ybSAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwicHJvY2VlZGJ0blwiIG9uQ2xpY2s9e3RoaXMucHJvY2VlZC5iaW5kKHRoaXMpfT5Db25maXJtIEJvb2tpbmc8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PiA6IFwiXCJcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBQYXRpZW50RGV0YWlsc1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cbmNsYXNzIERldGFpbHNGb3JtIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIHBhdGllbnROYW1lIDogJycsXG4gICAgICAgICAgICBwYXRpZW50RW1haWwgOiAnJyxcbiAgICAgICAgICAgIHBhdGllbnRHZW5kZXIgOiAnbWFsZScsXG4gICAgICAgICAgICBwYXRpZW50TW9iaWxlIDogJycsXG4gICAgICAgICAgICBvdHAgOicnXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpbnB1dEhhbmRsZXIod2hpY2gsIGUpe1xuICAgICAgICB0aGlzLnNldFN0YXRlKHsgW3doaWNoXSA6IGUudGFyZ2V0LnZhbHVlIH0pXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImRldGFpbHNGb3JtXCI+XG4gICAgICAgICAgICAgICAgPGg1PlBsZWFzZSBwcm92aWRlIHBhdGllbnQgZGV0YWlsczwvaDU+XG5cbiAgICAgICAgICAgICAgICA8aW5wdXQgdmFsdWU9e3RoaXMuc3RhdGUucGF0aWVudE5hbWV9IG9uQ2hhbmdlPXt0aGlzLmlucHV0SGFuZGxlci5iaW5kKHRoaXMsJ3BhdGllbnROYW1lJyl9IGNsYXNzTmFtZT1cInB0bmFtZVwiIHBsYWNlaG9sZGVyPVwiUGF0aWVudCBOYW1lKlwiIC8+XG4gICAgICAgICAgICAgICAgPGlucHV0IHZhbHVlPXt0aGlzLnN0YXRlLnBhdGllbnRFbWFpbH0gb25DaGFuZ2U9e3RoaXMuaW5wdXRIYW5kbGVyLmJpbmQodGhpcywncGF0aWVudEVtYWlsJyl9IGNsYXNzTmFtZT1cInB0ZW1haWxcIiBwbGFjZWhvbGRlcj1cIkVtYWlsKlwiIC8+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwdGdlbmRlclwiPlxuICAgICAgICAgICAgICAgICAgICA8c3Bhbj5HZW5kZXIgOjwvc3Bhbj4gXG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwicmFkaW9cIiBuYW1lPVwiZ2VuZGVyXCIgdmFsdWU9XCJtYWxlXCIgY2hlY2tlZD17dGhpcy5zdGF0ZS5wYXRpZW50R2VuZGVyID09PSBcIm1hbGVcIn0gb25DaGFuZ2U9e3RoaXMuaW5wdXRIYW5kbGVyLmJpbmQodGhpcywncGF0aWVudEdlbmRlcicpfS8+IE1hbGVcbiAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJyYWRpb1wiIG5hbWU9XCJnZW5kZXJcIiB2YWx1ZT1cImZlbWFsZVwiIGNoZWNrZWQ9e3RoaXMuc3RhdGUucGF0aWVudEdlbmRlciA9PT0gXCJmZW1hbGVcIn0gb25DaGFuZ2U9e3RoaXMuaW5wdXRIYW5kbGVyLmJpbmQodGhpcywncGF0aWVudEdlbmRlcicpfS8+IEZlbWFsZVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxpbnB1dCB2YWx1ZT17dGhpcy5zdGF0ZS5wYXRpZW50TW9iaWxlfSBvbkNoYW5nZT17dGhpcy5pbnB1dEhhbmRsZXIuYmluZCh0aGlzLCdwYXRpZW50TW9iaWxlJyl9IGNsYXNzTmFtZT1cInB0bW9iaWxlXCIgcGxhY2Vob2xkZXI9XCJNb2JpbGUqXCIgLz5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cIm90cGJ0blwiPihSZSlTZW5kIE9UUDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDxpbnB1dCB2YWx1ZT17dGhpcy5zdGF0ZS5vdHB9IG9uQ2hhbmdlPXt0aGlzLmlucHV0SGFuZGxlci5iaW5kKHRoaXMsJ290cCcpfSBjbGFzc05hbWU9XCJwdG90cFwiIHBsYWNlaG9sZGVyPVwiRW50ZXIgT1RQKlwiIC8+XG5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBEZXRhaWxzRm9ybVxuIiwiaW1wb3J0IERldGFpbHNGb3JtIGZyb20gJy4vRGV0YWlsc0Zvcm0uanMnXG5cbmV4cG9ydCBkZWZhdWx0IERldGFpbHNGb3JtIiwiaW1wb3J0IFBhdGllbnREZXRhaWxzIGZyb20gJy4vUGF0aWVudERldGFpbHMuanMnXG5cbmV4cG9ydCBkZWZhdWx0IFBhdGllbnREZXRhaWxzIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IFBheW1lbnRJY29uIGZyb20gJ21hdGVyaWFsLXVpLWljb25zL1BheW1lbnQnO1xuaW1wb3J0IENhc2hJY29uIGZyb20gJ21hdGVyaWFsLXVpLWljb25zL0F0dGFjaE1vbmV5JztcblxuY2xhc3MgUGF5bWVudFZpZXcgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgIH1cblxuICAgIHByb2NlZWQoKXtcbiAgICAgICAgdGhpcy5jb250ZXh0LnJvdXRlci5oaXN0b3J5LnB1c2goXCIvYm9va2luZy86cmVmSWRcIilcbiAgICB9XG5cbiAgICBzdGF0aWMgY29udGV4dFR5cGVzID0ge1xuICAgICAgICByb3V0ZXI6ICgpID0+IG51bGxcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGF5bWVudFwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwib2ZmZXJSb3dcIj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4+R2V0IDEwJSBjYXNoYmFjayBmb3IgYWxsIG9ubGluZSBwYXltZW50LCBUJkM8L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwYXltZW50Um93XCIgb25DbGljaz17dGhpcy5wcm9jZWVkLmJpbmQodGhpcyl9PlxuICAgICAgICAgICAgICAgICAgICA8UGF5bWVudEljb24gY2xhc3NOYW1lPVwicGF5bWVudEljb25cIiAvPlxuICAgICAgICAgICAgICAgICAgICA8c3Bhbj5QYXl0bSBXYWxsZXQ8L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwYXltZW50Um93XCIgb25DbGljaz17dGhpcy5wcm9jZWVkLmJpbmQodGhpcyl9PlxuICAgICAgICAgICAgICAgICAgICA8UGF5bWVudEljb24gY2xhc3NOYW1lPVwicGF5bWVudEljb25cIiAvPlxuICAgICAgICAgICAgICAgICAgICA8c3Bhbj5DcmVkaXQvRGViaXQvQVRNIENhcmQ8L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwYXltZW50Um93XCIgb25DbGljaz17dGhpcy5wcm9jZWVkLmJpbmQodGhpcyl9PlxuICAgICAgICAgICAgICAgICAgICA8UGF5bWVudEljb24gY2xhc3NOYW1lPVwicGF5bWVudEljb25cIiAvPlxuICAgICAgICAgICAgICAgICAgICA8c3Bhbj5OZXQgQmFua2luZzwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBheW1lbnRSb3dcIiBvbkNsaWNrPXt0aGlzLnByb2NlZWQuYmluZCh0aGlzKX0+XG4gICAgICAgICAgICAgICAgICAgIDxDYXNoSWNvbiBjbGFzc05hbWU9XCJwYXltZW50SWNvblwiIC8+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuPlBheSBpbiBDYXNoPC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGF5bWVudFJvd1wiIG9uQ2xpY2s9e3RoaXMucHJvY2VlZC5iaW5kKHRoaXMpfT5cbiAgICAgICAgICAgICAgICAgICAgPFBheW1lbnRJY29uIGNsYXNzTmFtZT1cInBheW1lbnRJY29uXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4+T25Eb2MgUGF5PC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IFBheW1lbnRWaWV3XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcblxuaW1wb3J0IENvbW1vbmx5U2VhcmNoZWQgZnJvbSAnLi4vLi4vY29tbW9ucy9jb21tb25seVNlYXJjaGVkL2luZGV4LmpzJ1xuaW1wb3J0IENyaXRlcmlhU2VhcmNoIGZyb20gJy4uLy4uL2NvbW1vbnMvY3JpdGVyaWFTZWFyY2gnXG5cbmNsYXNzIFNlYXJjaENyaXRlcmlhVmlldyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgfVxuXG4gICAgc2VhcmNoUHJvY2VlZCgpIHtcbiAgICAgICAgbGV0IHNlYXJjaERhdGEgPSB7XG4gICAgICAgICAgICBzZWxlY3RlZENyaXRlcmlhczogdGhpcy5wcm9wcy5zZWxlY3RlZENyaXRlcmlhcyxcbiAgICAgICAgICAgIHNlbGVjdGVkTG9jYXRpb246IHRoaXMucHJvcHMuc2VsZWN0ZWRMb2NhdGlvbixcbiAgICAgICAgfVxuICAgICAgICBzZWFyY2hEYXRhID0gZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNlYXJjaERhdGEpKVxuICAgICAgICBsZXQgZmlsdGVyRGF0YSA9IGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeSh0aGlzLnByb3BzLmZpbHRlckNyaXRlcmlhKSlcbiAgICAgICAgdGhpcy5wcm9wcy5oaXN0b3J5LnB1c2goYC9vcGQvc2VhcmNocmVzdWx0cz9zZWFyY2g9JHtzZWFyY2hEYXRhfSZmaWx0ZXI9JHtmaWx0ZXJEYXRhfWApXG4gICAgfVxuXG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIDxDcml0ZXJpYVNlYXJjaCB7Li4udGhpcy5wcm9wc30gY2hlY2tGb3JMb2FkPXt0aGlzLnByb3BzLkxPQURFRF9TRUFSQ0hfQ1JJVEVSSUFfT1BEfSB0aXRsZT1cIlNlYXJjaCBGb3IgRGlzZWFzZSBvciBEb2N0b3IuXCIgdHlwZT1cIm9wZFwiPlxuICAgICAgICAgICAgICAgICAgICA8c2VjdGlvbiBjbGFzc05hbWU9XCJ3cmFwIHdyYXAtMTAwXCI+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxDb21tb25seVNlYXJjaGVkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGluZz1cIlNlbGVjdGVkIENyaXRlcmlhXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhPXt0aGlzLnByb3BzLnNlbGVjdGVkQ3JpdGVyaWFzfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkPXtbXX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b2dnbGU9e3RoaXMucHJvcHMudG9nZ2xlT1BEQ3JpdGVyaWEuYmluZCh0aGlzKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxDb21tb25seVNlYXJjaGVkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGluZz1cIkNvbW1vbiBDb25kaXRpb25zXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiY29uZGl0aW9uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhPXt0aGlzLnByb3BzLmNvbmRpdGlvbnN9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWQ9e3RoaXMucHJvcHMuc2VsZWN0ZWRDcml0ZXJpYXMuZmlsdGVyKHggPT4geC50eXBlID09ICdjb25kaXRpb24nKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b2dnbGU9e3RoaXMucHJvcHMudG9nZ2xlT1BEQ3JpdGVyaWEuYmluZCh0aGlzKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxDb21tb25seVNlYXJjaGVkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGluZz1cIkNvbW1vbiBTcGVjaWFsaXRpZXNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJzcGVjaWFsaXR5XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhPXt0aGlzLnByb3BzLnNwZWNpYWxpemF0aW9uc31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZD17dGhpcy5wcm9wcy5zZWxlY3RlZENyaXRlcmlhcy5maWx0ZXIoeCA9PiB4LnR5cGUgPT0gJ3NwZWNpYWxpdHknKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b2dnbGU9e3RoaXMucHJvcHMudG9nZ2xlT1BEQ3JpdGVyaWEuYmluZCh0aGlzKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8+XG5cbiAgICAgICAgICAgICAgICAgICAgPC9zZWN0aW9uPlxuICAgICAgICAgICAgICAgIDwvQ3JpdGVyaWFTZWFyY2g+XG5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9e3RoaXMuc2VhcmNoUHJvY2VlZC5iaW5kKHRoaXMpfSBjbGFzc05hbWU9XCJ2LWJ0biB2LWJ0bi1wcmltYXJ5IGJ0bi1sZyBmaXhlZCBob3Jpem9udGFsIGJvdHRvbSBuby1yb3VuZCB0ZXh0LWxnXCI+U2hvdyBEb2N0b3JzPC9idXR0b24+XG5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgU2VhcmNoQ3JpdGVyaWFWaWV3XG4iLCJpbXBvcnQgU2VhcmNoQ3JpdGVyaWFWaWV3IGZyb20gJy4vU2VhcmNoQ3JpdGVyaWFWaWV3LmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBTZWFyY2hDcml0ZXJpYVZpZXciLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgRG9jdG9yc0xpc3QgZnJvbSAnLi4vc2VhcmNoUmVzdWx0cy9kb2N0b3JzTGlzdC9pbmRleC5qcydcbmltcG9ydCBDcml0ZXJpYVNlYXJjaCBmcm9tICcuLi8uLi9jb21tb25zL2NyaXRlcmlhU2VhcmNoJ1xuaW1wb3J0IFRvcEJhciBmcm9tICcuL3RvcEJhcidcblxuXG5jbGFzcyBTZWFyY2hSZXN1bHRzVmlldyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG5cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgICB0aGlzLmdldERjb3RvcnMoKVxuICAgIH1cblxuICAgIGdldERjb3RvcnMoKSB7XG4gICAgICAgIGxldCB7XG4gICAgICAgICAgICBzZWxlY3RlZExvY2F0aW9uLFxuICAgICAgICAgICAgc2VsZWN0ZWRDcml0ZXJpYXMsXG4gICAgICAgICAgICBmaWx0ZXJDcml0ZXJpYVxuICAgICAgICB9ID0gdGhpcy5wcm9wc1xuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBsZXQgc2VhcmNoU3RhdGUgPSB0aGlzLmdldExvY2F0aW9uUGFyYW0oJ3NlYXJjaCcpXG4gICAgICAgICAgICBsZXQgZmlsdGVyQ3JpdGVyaWEgPSB0aGlzLmdldExvY2F0aW9uUGFyYW0oJ2ZpbHRlcicpXG4gICAgICAgICAgICBpZiAoZmlsdGVyQ3JpdGVyaWEpIHtcbiAgICAgICAgICAgICAgICBmaWx0ZXJDcml0ZXJpYSA9IEpTT04ucGFyc2UoZmlsdGVyQ3JpdGVyaWEpXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGZpbHRlckNyaXRlcmlhID0ge31cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNlYXJjaFN0YXRlID0gSlNPTi5wYXJzZShzZWFyY2hTdGF0ZSlcbiAgICAgICAgICAgIHRoaXMuZ2V0RG9jdG9yTGlzdChzZWFyY2hTdGF0ZSwgZmlsdGVyQ3JpdGVyaWEsIHRydWUpXG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZSlcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgYXBwbHlGaWx0ZXJzKGZpbHRlclN0YXRlKSB7XG4gICAgICAgIGxldCBzZWFyY2hTdGF0ZSA9IHtcbiAgICAgICAgICAgIHNlbGVjdGVkQ3JpdGVyaWFzOiB0aGlzLnByb3BzLnNlbGVjdGVkQ3JpdGVyaWFzLFxuICAgICAgICAgICAgc2VsZWN0ZWRMb2NhdGlvbjogdGhpcy5wcm9wcy5zZWxlY3RlZExvY2F0aW9uLFxuICAgICAgICB9XG4gICAgICAgIGxldCBzZWFyY2hEYXRhID0gZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNlYXJjaFN0YXRlKSlcbiAgICAgICAgbGV0IGZpbHRlckRhdGEgPSBlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoZmlsdGVyU3RhdGUpKVxuICAgICAgICB0aGlzLnByb3BzLmhpc3RvcnkucmVwbGFjZShgL29wZC9zZWFyY2hyZXN1bHRzP3NlYXJjaD0ke3NlYXJjaERhdGF9JmZpbHRlcj0ke2ZpbHRlckRhdGF9YClcblxuICAgICAgICB0aGlzLmdldERvY3Rvckxpc3Qoc2VhcmNoU3RhdGUsIGZpbHRlclN0YXRlLCB0cnVlKVxuICAgIH1cblxuICAgIGdldExvY2F0aW9uUGFyYW0odGFnKSB7XG4gICAgICAgIC8vIHRoaXMgQVBJIGFzc3VtZXMgdGhlIGNvbnRleHQgb2YgcmVhY3Qtcm91dGVyLTRcbiAgICAgICAgY29uc3QgcGFyYW1TdHJpbmcgPSB0aGlzLnByb3BzLmxvY2F0aW9uLnNlYXJjaFxuICAgICAgICBjb25zdCBwYXJhbXMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKHBhcmFtU3RyaW5nKVxuICAgICAgICByZXR1cm4gcGFyYW1zLmdldCh0YWcpXG4gICAgfVxuXG4gICAgZ2V0RG9jdG9yTGlzdChzZWFyY2hTdGF0ZSwgZmlsdGVyQ3JpdGVyaWEsIG1lcmdlU3RhdGUpIHtcbiAgICAgICAgdGhpcy5wcm9wcy5nZXREb2N0b3JzKHNlYXJjaFN0YXRlLCBmaWx0ZXJDcml0ZXJpYSwgbWVyZ2VTdGF0ZSk7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICA8Q3JpdGVyaWFTZWFyY2ggey4uLnRoaXMucHJvcHN9IGNoZWNrRm9yTG9hZD17dGhpcy5wcm9wcy5MT0FERURfRE9DVE9SX1NFQVJDSH0gdGl0bGU9XCJTZWFyY2ggRm9yIERpc2Vhc2Ugb3IgRG9jdG9yLlwiIHR5cGU9XCJvcGRcIj5cbiAgICAgICAgICAgICAgICAgICAgPFRvcEJhciB7Li4udGhpcy5wcm9wc30gYXBwbHlGaWx0ZXJzPXt0aGlzLmFwcGx5RmlsdGVycy5iaW5kKHRoaXMpfSAvPlxuICAgICAgICAgICAgICAgICAgICA8RG9jdG9yc0xpc3Qgey4uLnRoaXMucHJvcHN9IC8+XG4gICAgICAgICAgICAgICAgPC9Dcml0ZXJpYVNlYXJjaD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgU2VhcmNoUmVzdWx0c1ZpZXdcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG5pbXBvcnQgRG9jdG9yUHJvZmlsZUNhcmQgZnJvbSAnLi4vLi4vY29tbW9ucy9kb2N0b3JQcm9maWxlQ2FyZC9pbmRleC5qcydcbi8vIGltcG9ydCBJbmZpbml0ZVNjcm9sbCBmcm9tICdyZWFjdC1pbmZpbml0ZS1zY3JvbGxlcic7XG5cblxuY2xhc3MgRG9jdG9yc0xpc3QgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICBsZXQgeyBET0NUT1JTLCBkb2N0b3JMaXN0IH0gPSB0aGlzLnByb3BzXG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxzZWN0aW9uIGNsYXNzTmFtZT1cIndyYXAgc2VhcmNoLXJlc3VsdC1kclwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGFpbmVyLWZsdWlkXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC0xMlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZG9jdG9yTGlzdC5tYXAoKGRvY0lkLCBpKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gPERvY3RvclByb2ZpbGVDYXJkIHsuLi50aGlzLnByb3BzfSBkZXRhaWxzPXtET0NUT1JTW2RvY0lkXX0ga2V5PXtpfSAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvc2VjdGlvbj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgRG9jdG9yc0xpc3RcbiIsImltcG9ydCBEb2N0b3JMaXN0IGZyb20gJy4vRG9jdG9yc0xpc3QuanMnXG5cbmV4cG9ydCBkZWZhdWx0IERvY3Rvckxpc3QiLCJpbXBvcnQgU2VhcmNoUmVzdWx0c1ZpZXcgZnJvbSAnLi9TZWFyY2hSZXN1bHRzVmlldy5qcydcblxuZXhwb3J0IGRlZmF1bHQgU2VhcmNoUmVzdWx0c1ZpZXciLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcblxuaW1wb3J0IE1lbnUsIHsgTWVudUl0ZW0gfSBmcm9tICdtYXRlcmlhbC11aS9NZW51JztcbmltcG9ydCBSYW5nZSBmcm9tICdyYy1zbGlkZXIvbGliL1JhbmdlJztcblxuY2xhc3MgVG9wQmFyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIGFuY2hvckVsOiBudWxsLFxuICAgICAgICAgICAgb3BlbkZpbHRlcjogZmFsc2UsXG4gICAgICAgICAgICBwcmljZVJhbmdlOiBbMTAwLCAxNTAwXSxcbiAgICAgICAgICAgIHNvcnRfb246IG51bGwsXG4gICAgICAgICAgICBzaXRzX2F0X2NsaW5pYzogZmFsc2UsXG4gICAgICAgICAgICBzaXRzX2F0X2hvc3BpdGFsOiBmYWxzZSxcbiAgICAgICAgICAgIGlzX2ZlbWFsZTogZmFsc2UsXG4gICAgICAgICAgICBpc19hdmFpbGFibGU6IGZhbHNlXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKHByb3BzKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyAuLi5wcm9wcy5maWx0ZXJDcml0ZXJpYSB9KVxuICAgIH1cblxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHsgLi4udGhpcy5wcm9wcy5maWx0ZXJDcml0ZXJpYSB9KVxuICAgIH1cblxuICAgIGhhbmRsZUlucHV0KGUpIHtcbiAgICAgICAgbGV0IGV2TmFtZSA9IGUudGFyZ2V0Lm5hbWVcbiAgICAgICAgbGV0IGNoZWNrZWQgPSBlLnRhcmdldC5jaGVja2VkXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgW2V2TmFtZV06IGNoZWNrZWRcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgYXBwbHlGaWx0ZXJzKCkge1xuICAgICAgICBsZXQgZmlsdGVyU3RhdGUgPSB7XG4gICAgICAgICAgICBwcmljZVJhbmdlOiB0aGlzLnN0YXRlLnByaWNlUmFuZ2UsXG4gICAgICAgICAgICBzaXRzX2F0OiB0aGlzLnN0YXRlLnNpdHNfYXQsXG4gICAgICAgICAgICBzb3J0X29uOiB0aGlzLnN0YXRlLnNvcnRfb24sXG4gICAgICAgICAgICBpc19mZW1hbGU6IHRoaXMuc3RhdGUuaXNfZmVtYWxlLFxuICAgICAgICAgICAgaXNfYXZhaWxhYmxlOiB0aGlzLnN0YXRlLmlzX2F2YWlsYWJsZSxcbiAgICAgICAgICAgIHNpdHNfYXRfY2xpbmljOiB0aGlzLnN0YXRlLnNpdHNfYXRfY2xpbmljLFxuICAgICAgICAgICAgc2l0c19hdF9ob3NwaXRhbDogdGhpcy5zdGF0ZS5zaXRzX2F0X2hvc3BpdGFsXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5wcm9wcy5hcHBseUZpbHRlcnMoZmlsdGVyU3RhdGUpXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBvcGVuRmlsdGVyOiBmYWxzZSB9KVxuICAgIH1cblxuICAgIGhhbmRsZU9wZW4oZXZlbnQpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGFuY2hvckVsOiBldmVudC5jdXJyZW50VGFyZ2V0IH0pXG4gICAgfVxuXG4gICAgaGFuZGxlQ2xvc2UodHlwZSkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHsgYW5jaG9yRWw6IG51bGwsIHNvcnRfb246IHR5cGUgfSwgKCkgPT4ge1xuICAgICAgICAgICAgaWYgKHR5cGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFwcGx5RmlsdGVycygpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgdG9nZ2xlRmlsdGVyKCkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIG9wZW5GaWx0ZXI6ICF0aGlzLnN0YXRlLm9wZW5GaWx0ZXJcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBoYW5kbGVSYW5nZSh0eXBlLCByYW5nZSkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIFt0eXBlXTogcmFuZ2VcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBnZXRDcml0ZXJpYVN0cmluZyhzZWxlY3RlZENyaXRlcmlhcykge1xuICAgICAgICBpZiAoc2VsZWN0ZWRDcml0ZXJpYXMgJiYgc2VsZWN0ZWRDcml0ZXJpYXMubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm4gc2VsZWN0ZWRDcml0ZXJpYXMucmVkdWNlKChmaW5hbCwgY3VyciwgaSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChpICE9IDApIHtcbiAgICAgICAgICAgICAgICAgICAgZmluYWwgKz0gJywgJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBmaW5hbCArPSBgJHtjdXJyLm5hbWV9YFxuICAgICAgICAgICAgICAgIHJldHVybiBmaW5hbFxuICAgICAgICAgICAgfSwgXCJcIilcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICBsZXQgY3JpdGVyaWFTdHIgPSB0aGlzLmdldENyaXRlcmlhU3RyaW5nKHRoaXMucHJvcHMuc2VsZWN0ZWRDcml0ZXJpYXMpXG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxzZWN0aW9uIGNsYXNzTmFtZT1cImZpbHRlci1yb3dcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lci1mbHVpZFwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtMTJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZpbHRlci1pdGVtXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWN0aW9uLWZpbHRlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHVsIGNsYXNzTmFtZT1cImlubGluZS1saXN0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpIG9uQ2xpY2s9e3RoaXMuaGFuZGxlT3Blbi5iaW5kKHRoaXMpfT48c3BhbiBjbGFzc05hbWU9XCJjdC1pbWcgY3QtaW1nLXNtIGZpbHRlci1pY29uIHRleHQtcmlnaHRcIj48aW1nIHNyYz1cIi9hc3NldHMvaW1nL2N1c3RvbWVyLWljb25zL3JhbmdlLnN2Z1wiIGNsYXNzTmFtZT1cImltZy1mbHVpZFwiIC8+PC9zcGFuPjwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpIG9uQ2xpY2s9e3RoaXMudG9nZ2xlRmlsdGVyLmJpbmQodGhpcyl9PjxzcGFuIGNsYXNzTmFtZT1cImN0LWltZyBjdC1pbWctc20gZmlsdGVyLWljb24gdGV4dC1yaWdodCBhcHBsaWVkLWZpbHRlclwiPjxpbWcgc3JjPVwiL2Fzc2V0cy9pbWcvY3VzdG9tZXItaWNvbnMvZmlsdGVyLnN2Z1wiIGNsYXNzTmFtZT1cImltZy1mbHVpZFwiIC8+PC9zcGFuPjxzcGFuIGNsYXNzTmFtZT1cImFwcGxpZWQtZmlsdGVyLW5vdGlcIiAvPjwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmaWx0ZXItdGl0bGVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLmRvY3Rvckxpc3QubGVuZ3RofSBSZXN1bHRzIGZvdW5kIGZvciA8c3BhbiBjbGFzc05hbWU9XCJmdy03MDBcIj4ge2NyaXRlcmlhU3RyfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPE1lbnVcbiAgICAgICAgICAgICAgICAgICAgaWQ9XCJzb3J0LW1lbnVcIlxuICAgICAgICAgICAgICAgICAgICBhbmNob3JFbD17dGhpcy5zdGF0ZS5hbmNob3JFbH1cbiAgICAgICAgICAgICAgICAgICAgb3Blbj17Qm9vbGVhbih0aGlzLnN0YXRlLmFuY2hvckVsKX1cbiAgICAgICAgICAgICAgICAgICAgb25DbG9zZT17dGhpcy5oYW5kbGVDbG9zZS5iaW5kKHRoaXMsIG51bGwpfVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgPE1lbnVJdGVtIG9uQ2xpY2s9e3RoaXMuaGFuZGxlQ2xvc2UuYmluZCh0aGlzLCAnbmFtZScpfT5SZWxhdmFuY2U8L01lbnVJdGVtPlxuICAgICAgICAgICAgICAgICAgICA8TWVudUl0ZW0gb25DbGljaz17dGhpcy5oYW5kbGVDbG9zZS5iaW5kKHRoaXMsICdwcmljZScpfT5GZWU8L01lbnVJdGVtPlxuICAgICAgICAgICAgICAgICAgICA8TWVudUl0ZW0gb25DbGljaz17dGhpcy5oYW5kbGVDbG9zZS5iaW5kKHRoaXMsICdkaXN0YW5jZScpfT5EaXN0YW5jZTwvTWVudUl0ZW0+XG4gICAgICAgICAgICAgICAgICAgIDxNZW51SXRlbSBvbkNsaWNrPXt0aGlzLmhhbmRsZUNsb3NlLmJpbmQodGhpcywgJ2V4cGVyaWVuY2UnKX0+RXhwZXJpZW5jZTwvTWVudUl0ZW0+XG4gICAgICAgICAgICAgICAgPC9NZW51PlxuXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlLm9wZW5GaWx0ZXIgPyA8ZGl2IG9uQ2xpY2s9e3RoaXMudG9nZ2xlRmlsdGVyLmJpbmQodGhpcyl9IGNsYXNzTmFtZT1cIm92ZXJsYXkgYmxhY2tcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwid2lkZ2V0IGZpbHRlci1wb3B1cFwiIG9uQ2xpY2s9eyhlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgICAgICAgICAgICAgICAgICAgICAgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3aWRnZXQtY29udGVudFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZpbHRlclJvd1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGxcIj5BdmFpbGFibGUgVG9kYXk8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgbmFtZT1cImlzX2F2YWlsYWJsZVwiIGNoZWNrZWQ9eyEhdGhpcy5zdGF0ZS5pc19hdmFpbGFibGV9IG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUlucHV0LmJpbmQodGhpcyl9IGNsYXNzTmFtZT1cImNoZWNrRmlsdGVyXCIgLz5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIndpZGdldC1jb250ZW50XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmlsdGVyUm93XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0bFwiPlNpdHMgQXQ8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgbmFtZT1cInNpdHNfYXRfY2xpbmljXCIgY2hlY2tlZD17ISF0aGlzLnN0YXRlLnNpdHNfYXRfY2xpbmljfSBvbkNoYW5nZT17dGhpcy5oYW5kbGVJbnB1dC5iaW5kKHRoaXMpfSBjbGFzc05hbWU9XCJjaGVja0ZpbHRlclwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJjaGVja0ZpbHRlckxhYmVsXCI+Q2xpbmljPC9zcGFuPlxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgbmFtZT1cInNpdHNfYXRfaG9zcGl0YWxcIiBjaGVja2VkPXshIXRoaXMuc3RhdGUuc2l0c19hdF9ob3NwaXRhbH0gb25DaGFuZ2U9e3RoaXMuaGFuZGxlSW5wdXQuYmluZCh0aGlzKX0gY2xhc3NOYW1lPVwiY2hlY2tGaWx0ZXJcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiY2hlY2tGaWx0ZXJMYWJlbFwiPkhvc3BpdGFsPC9zcGFuPlxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwid2lkZ2V0LWNvbnRlbnRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmaWx0ZXJSb3dcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRsXCI+UHJpY2U8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0clwiPlJzIHt0aGlzLnN0YXRlLnByaWNlUmFuZ2VbMF19IHRvIHt0aGlzLnN0YXRlLnByaWNlUmFuZ2VbMV19PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiYmxcIj5ScyAxMDA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJiclwiPlJzIDIwMDA8L3NwYW4+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxSYW5nZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1pbj17MTAwfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1heD17MjAwMH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17dGhpcy5zdGF0ZS5wcmljZVJhbmdlfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0ZXA9ezEwMH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJyYW5nZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuaGFuZGxlUmFuZ2UuYmluZCh0aGlzLCAncHJpY2VSYW5nZScpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3aWRnZXQtY29udGVudFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZpbHRlclJvd1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGxcIj5GZW1hbGUgRG9jdG9yPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJjaGVja2JveFwiIG5hbWU9XCJpc19mZW1hbGVcIiBjaGVja2VkPXshIXRoaXMuc3RhdGUuaXNfZmVtYWxlfSBvbkNoYW5nZT17dGhpcy5oYW5kbGVJbnB1dC5iaW5kKHRoaXMpfSBjbGFzc05hbWU9XCJjaGVja0ZpbHRlclwiIC8+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3aWRnZXQtZm9vdGVyIHBkLTBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJ2LWJ0biB2LWJ0bi1wcmltYXJ5IGJ0bi1ibG9jayBidG4tbGdcIiBvbkNsaWNrPXt0aGlzLmFwcGx5RmlsdGVycy5iaW5kKHRoaXMpfT5BcHBseTwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PiA6IFwiXCJcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIDwvc2VjdGlvbj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgVG9wQmFyXG4iLCJpbXBvcnQgVG9wQmFyIGZyb20gJy4vVG9wQmFyLmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBUb3BCYXIiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCB7IHdpdGhSb3V0ZXIgfSBmcm9tIFwicmVhY3Qtcm91dGVyLWRvbVwiO1xuXG5pbXBvcnQgUmFkaW8sIHsgUmFkaW9Hcm91cCB9IGZyb20gJ21hdGVyaWFsLXVpL1JhZGlvJztcbmltcG9ydCBDaGVja2JveCBmcm9tICdtYXRlcmlhbC11aS9DaGVja2JveCc7XG5pbXBvcnQgeyBGb3JtTGFiZWwsIEZvcm1Db250cm9sLCBGb3JtQ29udHJvbExhYmVsLCBGb3JtSGVscGVyVGV4dCB9IGZyb20gJ21hdGVyaWFsLXVpL0Zvcm0nO1xuXG5cbmNsYXNzIFNlYXJjaFJlc3VsdHNGaWx0ZXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgZmVlXzA6IGZhbHNlLFxuICAgICAgICAgICAgZmVlXzE6IGZhbHNlLFxuICAgICAgICAgICAgZmVlXzI6IGZhbHNlLFxuICAgICAgICAgICAgZmVlXzM6IGZhbHNlLFxuICAgICAgICAgICAgZ2VuZGVyOiAnYW55JyxcbiAgICAgICAgICAgIGNsaW5pY19wZXJzb25hbDogZmFsc2UsXG4gICAgICAgICAgICBjbGluaWNfaG9zcGl0YWw6IGZhbHNlLFxuICAgICAgICAgICAgY2xpbmljX211bHRpOiBmYWxzZSxcbiAgICAgICAgICAgIGF2YWlsYWJsZV90b2RheTogZmFsc2UsXG4gICAgICAgICAgICBkaXN0YW5jZTogJzMwa20nXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IC4uLnRoaXMucHJvcHMuZmlsdGVyQ3JpdGVyaWEgfSlcbiAgICB9XG5cbiAgICBhcHBseUZpbHRlcigpIHtcbiAgICAgICAgdGhpcy5wcm9wcy5zZXRPUERGaWx0ZXJzKHRoaXMuc3RhdGUpXG4gICAgICAgIHRoaXMucHJvcHMuaGlzdG9yeS5nbygtMSlcbiAgICB9XG5cbiAgICBoYW5kbGVDaGVja2JveChuYW1lLCBlKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBbbmFtZV06IGUudGFyZ2V0LmNoZWNrZWQgfSlcbiAgICB9XG5cbiAgICBoYW5kbGVDaGFuZ2VSYWRpbyhuYW1lLCBlKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBbbmFtZV06IGUudGFyZ2V0LnZhbHVlIH0pXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNlYXJjaFJlc3VsdHNGaWx0ZXJcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN1YkZpbHRlclwiPlxuICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJzdWJIZWFkaW5nXCI+RmVlPC9wPlxuICAgICAgICAgICAgICAgICAgICA8UmFkaW9Hcm91cFxuICAgICAgICAgICAgICAgICAgICAgICAgYXJpYS1sYWJlbD1cImZlZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lPVwiZmVlMVwiXG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxGb3JtQ29udHJvbExhYmVsIGNvbnRyb2w9ezxDaGVja2JveFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrZWQ9e3RoaXMuc3RhdGUuZmVlXzB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuaGFuZGxlQ2hlY2tib3guYmluZCh0aGlzLCAnZmVlXzAnKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8+fSBsYWJlbD1cIkxlc3MgdGhhbiAzMDBcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPEZvcm1Db250cm9sTGFiZWwgY29udHJvbD17PENoZWNrYm94XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2tlZD17dGhpcy5zdGF0ZS5mZWVfMX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5oYW5kbGVDaGVja2JveC5iaW5kKHRoaXMsICdmZWVfMScpfVxuICAgICAgICAgICAgICAgICAgICAgICAgLz59IGxhYmVsPVwiMzAwIHRvIDUwMFwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8Rm9ybUNvbnRyb2xMYWJlbCBjb250cm9sPXs8Q2hlY2tib3hcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGVja2VkPXt0aGlzLnN0YXRlLmZlZV8yfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUNoZWNrYm94LmJpbmQodGhpcywgJ2ZlZV8yJyl9XG4gICAgICAgICAgICAgICAgICAgICAgICAvPn0gbGFiZWw9XCI1MDAgdG8gMTAwMFwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8Rm9ybUNvbnRyb2xMYWJlbCBjb250cm9sPXs8Q2hlY2tib3hcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGVja2VkPXt0aGlzLnN0YXRlLmZlZV8zfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUNoZWNrYm94LmJpbmQodGhpcywgJ2ZlZV8zJyl9XG4gICAgICAgICAgICAgICAgICAgICAgICAvPn0gbGFiZWw9XCIxMDAwK1wiIC8+XG4gICAgICAgICAgICAgICAgICAgIDwvUmFkaW9Hcm91cD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3ViRmlsdGVyXCI+XG4gICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInN1YkhlYWRpbmdcIj5EaXN0YW5jZTwvcD5cbiAgICAgICAgICAgICAgICAgICAgPFJhZGlvR3JvdXBcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyaWEtbGFiZWw9XCJEaXN0YW5jZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lPVwiRGlzdGFuY2UyXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXt0aGlzLnN0YXRlLmRpc3RhbmNlfVxuICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuaGFuZGxlQ2hhbmdlUmFkaW8uYmluZCh0aGlzLCAnZGlzdGFuY2UnKX1cbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgPEZvcm1Db250cm9sTGFiZWwgdmFsdWU9XCIzMGttXCIgY29udHJvbD17PFJhZGlvIGNvbG9yPVwicHJpbWFyeVwiIC8+fSBsYWJlbD1cIlVuZGVyIDMwIEtNXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxGb3JtQ29udHJvbExhYmVsIHZhbHVlPVwiMjBrbVwiIGNvbnRyb2w9ezxSYWRpbyBjb2xvcj1cInByaW1hcnlcIiAvPn0gbGFiZWw9XCJVbmRlciAyMCBLTVwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8Rm9ybUNvbnRyb2xMYWJlbCB2YWx1ZT1cIjEwa21cIiBjb250cm9sPXs8UmFkaW8gY29sb3I9XCJwcmltYXJ5XCIgLz59IGxhYmVsPVwiVW5kZXIgMTAgS01cIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPEZvcm1Db250cm9sTGFiZWwgdmFsdWU9XCI1a21cIiBjb250cm9sPXs8UmFkaW8gY29sb3I9XCJwcmltYXJ5XCIgLz59IGxhYmVsPVwiVW5kZXIgNSBLTVwiIC8+XG5cbiAgICAgICAgICAgICAgICAgICAgPC9SYWRpb0dyb3VwPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdWJGaWx0ZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwic3ViSGVhZGluZ1wiPlR5cGUgT2YgQ2xpbmljPC9wPlxuICAgICAgICAgICAgICAgICAgICA8UmFkaW9Hcm91cFxuICAgICAgICAgICAgICAgICAgICAgICAgYXJpYS1sYWJlbD1cImNsaW5pY1R5cGVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZT1cImNsaW5pY1R5cGVcIlxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICA8Rm9ybUNvbnRyb2xMYWJlbCBjb250cm9sPXs8Q2hlY2tib3hcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGVja2VkPXt0aGlzLnN0YXRlLmNsaW5pY19wZXJzb25hbH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5oYW5kbGVDaGVja2JveC5iaW5kKHRoaXMsICdjbGluaWNfcGVyc29uYWwnKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8+fSBsYWJlbD1cIlBlcnNvbmFsXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxGb3JtQ29udHJvbExhYmVsIGNvbnRyb2w9ezxDaGVja2JveFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrZWQ9e3RoaXMuc3RhdGUuY2xpbmljX2hvc3BpdGFsfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUNoZWNrYm94LmJpbmQodGhpcywgJ2NsaW5pY19ob3NwaXRhbCcpfVxuICAgICAgICAgICAgICAgICAgICAgICAgLz59IGxhYmVsPVwiSG9zcGl0YWxcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPEZvcm1Db250cm9sTGFiZWwgY29udHJvbD17PENoZWNrYm94XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2tlZD17dGhpcy5zdGF0ZS5jbGluaWNfbXVsdGl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuaGFuZGxlQ2hlY2tib3guYmluZCh0aGlzLCAnY2xpbmljX211bHRpJyl9XG4gICAgICAgICAgICAgICAgICAgICAgICAvPn0gbGFiZWw9XCJNdWx0aS1kb2N0b3IgY2xpbmljXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgPC9SYWRpb0dyb3VwPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdWJGaWx0ZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwic3ViSGVhZGluZ1wiPkdlbmRlcjwvcD5cbiAgICAgICAgICAgICAgICAgICAgPFJhZGlvR3JvdXBcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyaWEtbGFiZWw9XCJnZW5kZXJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZT1cImdlbmRlcjJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3RoaXMuc3RhdGUuZ2VuZGVyfVxuICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuaGFuZGxlQ2hhbmdlUmFkaW8uYmluZCh0aGlzLCAnZ2VuZGVyJyl9XG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxGb3JtQ29udHJvbExhYmVsIHZhbHVlPVwiYW55XCIgY29udHJvbD17PFJhZGlvIGNvbG9yPVwicHJpbWFyeVwiIC8+fSBsYWJlbD1cIkFueVwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8Rm9ybUNvbnRyb2xMYWJlbCB2YWx1ZT1cIm1hbGVcIiBjb250cm9sPXs8UmFkaW8gY29sb3I9XCJwcmltYXJ5XCIgLz59IGxhYmVsPVwiTWFsZVwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8Rm9ybUNvbnRyb2xMYWJlbCB2YWx1ZT1cImZlbWFsZVwiIGNvbnRyb2w9ezxSYWRpbyBjb2xvcj1cInByaW1hcnlcIiAvPn0gbGFiZWw9XCJGZW1hbGVcIiAvPlxuXG4gICAgICAgICAgICAgICAgICAgIDwvUmFkaW9Hcm91cD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3ViRmlsdGVyXCI+XG4gICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInN1YkhlYWRpbmdcIj5BdmFpbGFiaWxpdHk8L3A+XG4gICAgICAgICAgICAgICAgICAgIDxSYWRpb0dyb3VwXG4gICAgICAgICAgICAgICAgICAgICAgICBhcmlhLWxhYmVsPVwiYXZhaWxhYmlsaXR5XCJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU9XCJhdmFpbGFiaWxpdHlcIlxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICA8Rm9ybUNvbnRyb2xMYWJlbCBjb250cm9sPXs8Q2hlY2tib3hcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGVja2VkPXt0aGlzLnN0YXRlLmF2YWlsYWJsZV90b2RheX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5oYW5kbGVDaGVja2JveC5iaW5kKHRoaXMsICdhdmFpbGFibGVfdG9kYXknKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8+fSBsYWJlbD1cIkF2aWFsYWJsZSBUb2RheVwiIC8+bGFiZWw9XCJNdWx0aS1kb2N0b3IgY2xpbmljXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgPC9SYWRpb0dyb3VwPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJhcHBseUZpbHRlclwiIG9uQ2xpY2s9e3RoaXMuYXBwbHlGaWx0ZXIuYmluZCh0aGlzKX0+QXBwbHk8L2J1dHRvbj5cblxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IHdpdGhSb3V0ZXIoU2VhcmNoUmVzdWx0c0ZpbHRlcilcbiIsImltcG9ydCBTZWFyY2hSZXN1bHRzRmlsdGVyIGZyb20gJy4vU2VhcmNoUmVzdWx0c0ZpbHRlci5qcydcblxuZXhwb3J0IGRlZmF1bHQgU2VhcmNoUmVzdWx0c0ZpbHRlciIsIi8vQVVUSCBBQ1RJT05TXG5leHBvcnQgY29uc3QgU0VORF9PVFBfUkVRVUVTVCA9ICdTRU5EX09UUF9SRVFVRVNUJ1xuZXhwb3J0IGNvbnN0IFNFTkRfT1RQX1NVQ0NFU1MgPSAnU0VORF9PVFBfU1VDQ0VTUydcbmV4cG9ydCBjb25zdCBTRU5EX09UUF9GQUlMID0gJ1NFTkRfT1RQX0ZBSUwnXG5leHBvcnQgY29uc3QgU1VCTUlUX09UUF9SRVFVRVNUID0gJ1NVQk1JVF9PVFBfUkVRVUVTVCdcbmV4cG9ydCBjb25zdCBTVUJNSVRfT1RQX1NVQ0NFU1MgPSAnU1VCTUlUX09UUF9TVUNDRVNTJ1xuZXhwb3J0IGNvbnN0IFNVQk1JVF9PVFBfRkFJTCA9ICdTVUJNSVRfT1RQX0ZBSUwnXG5cbi8vIE9QRCBGTE9XXG5leHBvcnQgY29uc3QgQVBQRU5EX0RPQ1RPUlMgPSAnQVBQRU5EX0RPQ1RPUlMnO1xuZXhwb3J0IGNvbnN0IERPQ1RPUl9TRUFSQ0ggPSAnRE9DVE9SX1NFQVJDSCc7XG5leHBvcnQgY29uc3QgRE9DVE9SX1NFQVJDSF9TVEFSVCA9ICdET0NUT1JfU0VBUkNIX1NUQVJUJztcbmV4cG9ydCBjb25zdCBTRUxFQ1RfTE9DQVRJT05fT1BEID0gJ1NFTEVDVF9MT0NBVElPTl9PUEQnO1xuZXhwb3J0IGNvbnN0IE1FUkdFX1NFQVJDSF9TVEFURV9PUEQgPSAnTUVSR0VfU0VBUkNIX1NUQVRFX09QRCc7XG5leHBvcnQgY29uc3QgVE9HR0xFX09QRF9DUklURVJJQSA9ICdUT0dHTEVfT1BEX0NSSVRFUklBJztcbmV4cG9ydCBjb25zdCBTRVRfT1BEX0ZJTFRFUlMgPSAnU0VUX09QRF9GSUxURVJTJ1xuZXhwb3J0IGNvbnN0IExPQURfU0VBUkNIX0NSSVRFUklBX09QRCA9ICdMT0FEX1NFQVJDSF9DUklURVJJQV9PUEQnXG5cblxuLy8gRElBRyBGTE9XXG5leHBvcnQgY29uc3QgVE9HR0xFX0RJQUdOT1NJU19DUklURVJJQSA9ICdUT0dHTEVfRElBR05PU0lTX0NSSVRFUklBJztcbmV4cG9ydCBjb25zdCBNRVJHRV9TRUFSQ0hfU1RBVEVfTEFCID0gJ01FUkdFX1NFQVJDSF9TVEFURV9MQUInO1xuZXhwb3J0IGNvbnN0IExPQURfU0VBUkNIX0NSSVRFUklBX0xBQiA9ICdMT0FEX1NFQVJDSF9DUklURVJJQV9MQUInXG5leHBvcnQgY29uc3QgQVBQRU5EX0xBQlMgPSAnQVBQRU5EX0xBQlMnO1xuZXhwb3J0IGNvbnN0IExBQl9TRUFSQ0ggPSAnTEFCX1NFQVJDSCc7XG5leHBvcnQgY29uc3QgU0VMRUNUX0xPQ0FUSU9OX0RJQUdOT1NJUyA9ICdTRUxFQ1RfTE9DQVRJT05fRElBR05PU0lTJztcbmV4cG9ydCBjb25zdCBBUFBFTkRfRklMVEVSU19ESUFHTk9TSVMgPSAnQVBQRU5EX0ZJTFRFUlNfRElBR05PU0lTJztcbmV4cG9ydCBjb25zdCBMQUJfU0VBUkNIX1NUQVJUID0gJ0xBQl9TRUFSQ0hfU1RBUlQnO1xuXG4vLyBBVVRIIEZMT1dcbmV4cG9ydCBjb25zdCBBUFBFTkRfVVNFUl9QUk9GSUxFUyA9ICdBUFBFTkRfVVNFUl9QUk9GSUxFUyc7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcblxuaW1wb3J0IHsgfSBmcm9tICcuLi8uLi9hY3Rpb25zL2luZGV4LmpzJ1xuXG5pbXBvcnQgQ2hhdFZpZXcgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9jb21tb25zL2NoYXQvaW5kZXguanMnXG5cblxuY2xhc3MgQ2hhdCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8Q2hhdFZpZXcgey4uLnRoaXMucHJvcHN9IC8+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoc3RhdGUpID0+IHtcbiAgICBjb25zdCBVU0VSID0gc3RhdGUuVVNFUlxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgVVNFUlxuICAgIH1cbn1cblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gKGRpc3BhdGNoKSA9PiB7XG4gICAgcmV0dXJuIHtcblxuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbWFwRGlzcGF0Y2hUb1Byb3BzKShDaGF0KTtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG5pbXBvcnQgeyB9IGZyb20gJy4uLy4uL2FjdGlvbnMvaW5kZXguanMnXG5cbmltcG9ydCBIb21lVmlldyBmcm9tICcuLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvSG9tZSdcblxuXG5jbGFzcyBIb21lIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICB9XG5cbiAgICBzdGF0aWMgY29udGV4dFR5cGVzID0ge1xuICAgICAgICByb3V0ZXI6ICgpID0+IG51bGxcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxIb21lVmlldyB7Li4udGhpcy5wcm9wc30gLz5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9IChzdGF0ZSkgPT4ge1xuICAgIGxldCB7XG5cbiAgICB9ID0gc3RhdGUuQVVUSFxuXG4gICAgcmV0dXJuIHtcblxuICAgIH1cbn1cblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gKGRpc3BhdGNoKSA9PiB7XG4gICAgcmV0dXJuIHtcblxuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbWFwRGlzcGF0Y2hUb1Byb3BzKShIb21lKTtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG5pbXBvcnQgeyBnZXRVc2VyUHJvZmlsZVdpdGhBcHBvaW50bWVudHMgfSBmcm9tICcuLi8uLi9hY3Rpb25zL2luZGV4LmpzJ1xuXG5pbXBvcnQgVXNlckFwcG9pbnRtZW50c1ZpZXcgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9jb21tb25zL3VzZXJBcHBvaW50bWVudHMvaW5kZXguanMnXG5cblxuY2xhc3MgVXNlckFwcG9pbnRtZW50cyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8VXNlckFwcG9pbnRtZW50c1ZpZXcgey4uLnRoaXMucHJvcHN9IC8+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoc3RhdGUpID0+IHtcbiAgICBjb25zdCBVU0VSID0gc3RhdGUuVVNFUlxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgVVNFUlxuICAgIH1cbn1cblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gKGRpc3BhdGNoKSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgZ2V0VXNlclByb2ZpbGVXaXRoQXBwb2ludG1lbnRzIDogKCkgPT4gZGlzcGF0Y2goZ2V0VXNlclByb2ZpbGVXaXRoQXBwb2ludG1lbnRzKCkpXG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpKFVzZXJBcHBvaW50bWVudHMpO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cbmltcG9ydCB7IHNlbmRPVFAsIHN1Ym1pdE9UUCB9IGZyb20gJy4uLy4uL2FjdGlvbnMvaW5kZXguanMnXG5cbmltcG9ydCBVc2VyTG9naW5WaWV3IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9Vc2VyTG9naW4nXG5cblxuY2xhc3MgVXNlckxvZ2luIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICB9XG5cbiAgICBzdGF0aWMgY29udGV4dFR5cGVzID0ge1xuICAgICAgICByb3V0ZXI6ICgpID0+IG51bGxcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxVc2VyTG9naW5WaWV3IHsuLi50aGlzLnByb3BzfSAvPlxuICAgICAgICApO1xuICAgIH1cbn1cblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHN0YXRlKSA9PiB7XG4gICAgbGV0IHtcbiAgICAgICAgdG9rZW4sXG4gICAgICAgIGVycm9yX21lc3NhZ2UsXG4gICAgICAgIHN1Y2Nlc3NfbWVzc2FnZSxcbiAgICAgICAgb3RwX3JlcXVlc3Rfc2VudCxcbiAgICAgICAgb3RwX3JlcXVlc3Rfc3VjY2VzcyxcbiAgICAgICAgb3RwX3JlcXVlc3RfZmFpbCxcbiAgICAgICAgcGhvbmVOdW1iZXJcbiAgICB9ID0gc3RhdGUuQVVUSFxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgdG9rZW4sXG4gICAgICAgIGVycm9yX21lc3NhZ2UsXG4gICAgICAgIHN1Y2Nlc3NfbWVzc2FnZSxcbiAgICAgICAgb3RwX3JlcXVlc3Rfc2VudCxcbiAgICAgICAgb3RwX3JlcXVlc3Rfc3VjY2VzcyxcbiAgICAgICAgb3RwX3JlcXVlc3RfZmFpbCxcbiAgICAgICAgcGhvbmVOdW1iZXJcbiAgICB9XG59XG5cbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IChkaXNwYXRjaCkgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICAgIHNlbmRPVFA6IChudW1iZXIsIGNiKSA9PiBkaXNwYXRjaChzZW5kT1RQKG51bWJlciwgY2IpKSxcbiAgICAgICAgc3VibWl0T1RQOiAobnVtYmVyLCBvdHAsIGNiKSA9PiBkaXNwYXRjaChzdWJtaXRPVFAobnVtYmVyLCBvdHAsIGNiKSlcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG1hcERpc3BhdGNoVG9Qcm9wcykoVXNlckxvZ2luKTtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG5pbXBvcnQgeyBnZXRVc2VyUHJvZmlsZSB9IGZyb20gJy4uLy4uL2FjdGlvbnMvaW5kZXguanMnXG5cbmltcG9ydCBVc2VyUHJvZmlsZVZpZXcgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9jb21tb25zL3VzZXJQcm9maWxlL2luZGV4LmpzJ1xuXG5cbmNsYXNzIFVzZXJQcm9maWxlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxVc2VyUHJvZmlsZVZpZXcgey4uLnRoaXMucHJvcHN9IC8+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoc3RhdGUpID0+IHtcbiAgICBjb25zdCBVU0VSID0gc3RhdGUuVVNFUlxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgVVNFUlxuICAgIH1cbn1cblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gKGRpc3BhdGNoKSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgZ2V0VXNlclByb2ZpbGUgOiAoKSA9PiBkaXNwYXRjaChnZXRVc2VyUHJvZmlsZSgpKVxuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbWFwRGlzcGF0Y2hUb1Byb3BzKShVc2VyUHJvZmlsZSk7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcblxuaW1wb3J0IHsgZ2V0VXNlclByb2ZpbGVXaXRoVGVzdHMgfSBmcm9tICcuLi8uLi9hY3Rpb25zL2luZGV4LmpzJ1xuXG5pbXBvcnQgVXNlclJlcG9ydHNWaWV3IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy91c2VyUmVwb3J0cy9pbmRleC5qcydcblxuXG5jbGFzcyBVc2VyUmVwb3J0cyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8VXNlclJlcG9ydHNWaWV3IHsuLi50aGlzLnByb3BzfSAvPlxuICAgICAgICApO1xuICAgIH1cbn1cblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHN0YXRlKSA9PiB7XG4gICAgY29uc3QgVVNFUiA9IHN0YXRlLlVTRVJcblxuICAgIHJldHVybiB7XG4gICAgICAgIFVTRVJcbiAgICB9XG59XG5cbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IChkaXNwYXRjaCkgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICAgIGdldFVzZXJQcm9maWxlV2l0aFRlc3RzIDogKCkgPT4gZGlzcGF0Y2goZ2V0VXNlclByb2ZpbGVXaXRoVGVzdHMoKSlcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG1hcERpc3BhdGNoVG9Qcm9wcykoVXNlclJlcG9ydHMpO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cbmltcG9ydCB7IHJlZ2lzdGVyVXNlciB9IGZyb20gJy4uLy4uL2FjdGlvbnMvaW5kZXguanMnXG5cbmltcG9ydCBVc2VyU2lnbnVwVmlldyBmcm9tICcuLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvdXNlclNpZ251cCdcblxuXG5jbGFzcyBVc2VyU2lnbnVwIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICB9XG5cbiAgICBzdGF0aWMgY29udGV4dFR5cGVzID0ge1xuICAgICAgICByb3V0ZXI6ICgpID0+IG51bGxcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxVc2VyU2lnbnVwVmlldyB7Li4udGhpcy5wcm9wc30gLz5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9IChzdGF0ZSkgPT4ge1xuICAgIGxldCB7XG4gICAgICAgIHRva2VuLFxuICAgICAgICBlcnJvcl9tZXNzYWdlLFxuICAgICAgICBzdWNjZXNzX21lc3NhZ2UsXG4gICAgICAgIHBob25lTnVtYmVyLFxuICAgICAgICBzdWJtaXRfb3RwLFxuICAgICAgICBzdWJtaXRfb3RwX3N1Y2Nlc3MsXG4gICAgICAgIHN1Ym1pdF9vdHBfZmFpbFxuICAgIH0gPSBzdGF0ZS5BVVRIXG5cbiAgICByZXR1cm4ge1xuICAgICAgICB0b2tlbixcbiAgICAgICAgZXJyb3JfbWVzc2FnZSxcbiAgICAgICAgc3VjY2Vzc19tZXNzYWdlLFxuICAgICAgICBwaG9uZU51bWJlcixcbiAgICAgICAgc3VibWl0X290cCxcbiAgICAgICAgc3VibWl0X290cF9zdWNjZXNzLFxuICAgICAgICBzdWJtaXRfb3RwX2ZhaWxcbiAgICB9XG59XG5cbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IChkaXNwYXRjaCkgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICAgIHJlZ2lzdGVyVXNlcjogKHBvc3REYXRhLCBjYikgPT4gZGlzcGF0Y2gocmVnaXN0ZXJVc2VyKHBvc3REYXRhLCBjYikpXG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpKFVzZXJTaWdudXApO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cbmltcG9ydCB7IGdldExhYkJ5SWQgfSBmcm9tICcuLi8uLi9hY3Rpb25zL2luZGV4LmpzJ1xuXG5pbXBvcnQgQm9va2luZ1N1bW1hcnlWaWV3IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvZGlhZ25vc2lzL2Jvb2tpbmdTdW1tYXJ5L2luZGV4LmpzJ1xuXG5jbGFzcyBCb29raW5nU3VtbWFyeSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgfVxuXG4gICAgc3RhdGljIGNvbnRleHRUeXBlcyA9IHtcbiAgICAgICAgcm91dGVyOiAoKSA9PiBudWxsXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8Qm9va2luZ1N1bW1hcnlWaWV3IHsuLi50aGlzLnByb3BzfSAvPlxuICAgICAgICApO1xuICAgIH1cbn1cblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHN0YXRlKSA9PiB7XG5cbiAgICBjb25zdCB7XG4gICAgICAgIHNlbGVjdGVkQ3JpdGVyaWFzLFxuICAgIH0gPSBzdGF0ZS5TRUFSQ0hfQ1JJVEVSSUFfTEFCU1xuXG4gICAgbGV0IExBQlMgPSBzdGF0ZS5MQUJTXG5cbiAgICByZXR1cm4ge1xuICAgICAgICBzZWxlY3RlZENyaXRlcmlhcyxcbiAgICAgICAgTEFCU1xuICAgIH1cbn1cblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gKGRpc3BhdGNoKSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgZ2V0TGFiQnlJZDogKGxhYklkKSA9PiBkaXNwYXRjaChnZXRMYWJCeUlkKGxhYklkKSlcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpKEJvb2tpbmdTdW1tYXJ5KTtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG5pbXBvcnQgeyBnZXRMYWJCeUlkIH0gZnJvbSAnLi4vLi4vYWN0aW9ucy9pbmRleC5qcydcblxuaW1wb3J0IExhYlZpZXcgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9kaWFnbm9zaXMvbGFiL2luZGV4LmpzJ1xuXG5jbGFzcyBMYWIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgIH1cblxuICAgIHN0YXRpYyBsb2FkRGF0YShzdG9yZSwgbWF0Y2gpe1xuICAgICAgICByZXR1cm4gc3RvcmUuZGlzcGF0Y2goZ2V0TGFiQnlJZChtYXRjaC5wYXJhbXMuaWQpKVxuICAgIH1cblxuICAgIHN0YXRpYyBjb250ZXh0VHlwZXMgPSB7XG4gICAgICAgIHJvdXRlcjogKCkgPT4gbnVsbFxuICAgIH1cblxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgICB0aGlzLnByb3BzLmdldExhYkJ5SWQodGhpcy5wcm9wcy5tYXRjaC5wYXJhbXMuaWQpXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8TGFiVmlldyB7Li4udGhpcy5wcm9wc30gLz5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9IChzdGF0ZSkgPT4ge1xuXG4gICAgY29uc3Qge1xuICAgICAgICBzZWxlY3RlZExvY2F0aW9uLFxuICAgICAgICBzZWxlY3RlZENyaXRlcmlhcyxcbiAgICAgICAgZmlsdGVyQ3JpdGVyaWEsXG4gICAgICAgIExPQURFRF9TRUFSQ0hfQ1JJVEVSSUFfTEFCXG4gICAgfSA9IHN0YXRlLlNFQVJDSF9DUklURVJJQV9MQUJTXG5cbiAgICBsZXQgTEFCUyA9IHN0YXRlLkxBQlNcblxuICAgIHJldHVybiB7XG4gICAgICAgIHNlbGVjdGVkQ3JpdGVyaWFzLFxuICAgICAgICBMQUJTXG4gICAgfVxufVxuXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSAoZGlzcGF0Y2gpID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgICBnZXRMYWJCeUlkOiAobGFiSWQpID0+IGRpc3BhdGNoKGdldExhYkJ5SWQobGFiSWQpKVxuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbWFwRGlzcGF0Y2hUb1Byb3BzKShMYWIpO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cbmltcG9ydCB7IGdldExhYkJ5SWQgfSBmcm9tICcuLi8uLi9hY3Rpb25zL2luZGV4LmpzJ1xuXG5pbXBvcnQgUGF0aWVudERldGFpbHNWaWV3IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvZGlhZ25vc2lzL3BhdGllbnREZXRhaWxzL2luZGV4LmpzJ1xuXG5jbGFzcyBQYXRpZW50RGV0YWlscyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8UGF0aWVudERldGFpbHNWaWV3IHsuLi50aGlzLnByb3BzfSAvPlxuICAgICAgICApO1xuICAgIH1cbn1cblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHN0YXRlKSA9PiB7XG5cbiAgICBsZXQgTEFCUyA9IHN0YXRlLkxBQlNcblxuICAgIHJldHVybiB7XG4gICAgICAgIExBQlNcbiAgICB9XG59XG5cbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IChkaXNwYXRjaCkgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICAgIGdldExhYkJ5SWQgOiAobGFiSWQsIHRlc3RJZHMpID0+IGRpc3BhdGNoKGdldExhYkJ5SWQobGFiSWQsIHRlc3RJZHMpKVxuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbWFwRGlzcGF0Y2hUb1Byb3BzKShQYXRpZW50RGV0YWlscyk7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcblxuaW1wb3J0IHsgbG9hZExhYkNvbW1vbkNyaXRlcmlhcywgdG9nZ2xlRGlhZ25vc2lzQ3JpdGVyaWEsIGdldERpYWdub3Npc0NyaXRlcmlhUmVzdWx0cyB9IGZyb20gJy4uLy4uL2FjdGlvbnMvaW5kZXguanMnXG5pbXBvcnQgU2VhcmNoQ3JpdGVyaWFWaWV3IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvZGlhZ25vc2lzL3NlYXJjaENyaXRlcmlhL2luZGV4LmpzJ1xuXG5jbGFzcyBTZWFyY2hDcml0ZXJpYSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgfVxuXG4gICAgc3RhdGljIGxvYWREYXRhKHN0b3JlKXtcbiAgICAgICAgcmV0dXJuIHN0b3JlLmRpc3BhdGNoKGxvYWRMYWJDb21tb25Dcml0ZXJpYXMoKSlcbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgdGhpcy5wcm9wcy5sb2FkTGFiQ29tbW9uQ3JpdGVyaWFzKClcbiAgICB9XG5cbiAgICBzdGF0aWMgY29udGV4dFR5cGVzID0ge1xuICAgICAgICByb3V0ZXI6ICgpID0+IG51bGxcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8U2VhcmNoQ3JpdGVyaWFWaWV3IHsuLi50aGlzLnByb3BzfSAvPlxuICAgICAgICApXG4gICAgfVxufVxuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoc3RhdGUpID0+IHtcblxuICAgIGNvbnN0IHtcbiAgICAgICAgTE9BREVEX1NFQVJDSF9DUklURVJJQV9MQUIsXG4gICAgICAgIGNvbW1vbl90ZXN0cyxcbiAgICAgICAgY29tbW9uX2NvbmRpdGlvbnMsXG4gICAgICAgIHByZWZlcnJlZF9sYWJzLFxuICAgICAgICBzZWxlY3RlZENyaXRlcmlhcyxcbiAgICAgICAgc2VsZWN0ZWRMb2NhdGlvbixcbiAgICAgICAgZmlsdGVyQ3JpdGVyaWFcbiAgICB9ID0gc3RhdGUuU0VBUkNIX0NSSVRFUklBX0xBQlNcblxuICAgIHJldHVybiB7XG4gICAgICAgIExPQURFRF9TRUFSQ0hfQ1JJVEVSSUFfTEFCLFxuICAgICAgICBjb21tb25fdGVzdHMsXG4gICAgICAgIGNvbW1vbl9jb25kaXRpb25zLFxuICAgICAgICBwcmVmZXJyZWRfbGFicyxcbiAgICAgICAgc2VsZWN0ZWRDcml0ZXJpYXMsXG4gICAgICAgIHNlbGVjdGVkTG9jYXRpb24sXG4gICAgICAgIGZpbHRlckNyaXRlcmlhXG4gICAgfVxufVxuXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSAoZGlzcGF0Y2gpID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgICBsb2FkTGFiQ29tbW9uQ3JpdGVyaWFzOiAoKSA9PiBkaXNwYXRjaChsb2FkTGFiQ29tbW9uQ3JpdGVyaWFzKCkpLFxuICAgICAgICB0b2dnbGVEaWFnbm9zaXNDcml0ZXJpYTogKHR5cGUsIGNyaXRlcmlhKSA9PiBkaXNwYXRjaCh0b2dnbGVEaWFnbm9zaXNDcml0ZXJpYSh0eXBlLCBjcml0ZXJpYSkpLFxuICAgICAgICBnZXREaWFnbm9zaXNDcml0ZXJpYVJlc3VsdHM6IChzZWFyY2hTdHJpbmcsIGNhbGxiYWNrKSA9PiBkaXNwYXRjaChnZXREaWFnbm9zaXNDcml0ZXJpYVJlc3VsdHMoc2VhcmNoU3RyaW5nLCBjYWxsYmFjaykpXG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpKFNlYXJjaENyaXRlcmlhKTtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG5pbXBvcnQgeyBnZXRMYWJzLCB0b2dnbGVEaWFnbm9zaXNDcml0ZXJpYSwgZ2V0RGlhZ25vc2lzQ3JpdGVyaWFSZXN1bHRzIH0gZnJvbSAnLi4vLi4vYWN0aW9ucy9pbmRleC5qcydcblxuaW1wb3J0IFNlYXJjaFJlc3VsdHNWaWV3IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvZGlhZ25vc2lzL3NlYXJjaFJlc3VsdHMvaW5kZXguanMnXG5cbmNsYXNzIFNlYXJjaFJlc3VsdHMgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgICAgICB0aGlzLnN0YXRlID0ge1xuXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdGF0aWMgY29udGV4dFR5cGVzID0ge1xuICAgICAgICByb3V0ZXI6ICgpID0+IG51bGxcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxTZWFyY2hSZXN1bHRzVmlldyB7Li4udGhpcy5wcm9wc30gLz5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9IChzdGF0ZSkgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgICAgc2VsZWN0ZWRMb2NhdGlvbixcbiAgICAgICAgc2VsZWN0ZWRDcml0ZXJpYXMsXG4gICAgICAgIGZpbHRlckNyaXRlcmlhLFxuICAgICAgICBMT0FERURfU0VBUkNIX0NSSVRFUklBX0xBQlxuICAgIH0gPSBzdGF0ZS5TRUFSQ0hfQ1JJVEVSSUFfTEFCU1xuXG4gICAgY29uc3QgTEFCUyA9IHN0YXRlLkxBQlNcbiAgICBjb25zdCB7IGxhYkxpc3QsIExPQURFRF9MQUJTX1NFQVJDSCB9ID0gc3RhdGUuTEFCX1NFQVJDSFxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgc2VsZWN0ZWRMb2NhdGlvbixcbiAgICAgICAgc2VsZWN0ZWRDcml0ZXJpYXMsXG4gICAgICAgIGZpbHRlckNyaXRlcmlhLFxuICAgICAgICBMT0FERURfU0VBUkNIX0NSSVRFUklBX0xBQixcbiAgICAgICAgTEFCUyxcbiAgICAgICAgbGFiTGlzdCwgTE9BREVEX0xBQlNfU0VBUkNIXG4gICAgfVxuXG59XG5cbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IChkaXNwYXRjaCkgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICAgIGdldExhYnM6IChzZWFyY2hTdGF0ZSwgZmlsdGVyQ3JpdGVyaWEsIG1lcmdlU3RhdGUpID0+IGRpc3BhdGNoKGdldExhYnMoc2VhcmNoU3RhdGUsIGZpbHRlckNyaXRlcmlhLCBtZXJnZVN0YXRlKSksXG4gICAgICAgIHRvZ2dsZURpYWdub3Npc0NyaXRlcmlhOiAodHlwZSwgY3JpdGVyaWEpID0+IGRpc3BhdGNoKHRvZ2dsZURpYWdub3Npc0NyaXRlcmlhKHR5cGUsIGNyaXRlcmlhKSksXG4gICAgICAgIGdldERpYWdub3Npc0NyaXRlcmlhUmVzdWx0czogKHNlYXJjaFN0cmluZywgY2FsbGJhY2spID0+IGRpc3BhdGNoKGdldERpYWdub3Npc0NyaXRlcmlhUmVzdWx0cyhzZWFyY2hTdHJpbmcsIGNhbGxiYWNrKSlcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpKFNlYXJjaFJlc3VsdHMpO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cbmltcG9ydCB7IGdldExhYkJ5SWQsIHRvZ2dsZURpYWdub3Npc0NyaXRlcmlhIH0gZnJvbSAnLi4vLi4vYWN0aW9ucy9pbmRleC5qcydcblxuaW1wb3J0IFRlc3RTZWxlY3RvclZpZXcgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9kaWFnbm9zaXMvdGVzdFNlbGVjdG9yJ1xuXG5jbGFzcyBUZXN0U2VsZWN0b3IgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgIH1cblxuICAgIHN0YXRpYyBjb250ZXh0VHlwZXMgPSB7XG4gICAgICAgIHJvdXRlcjogKCkgPT4gbnVsbFxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPFRlc3RTZWxlY3RvclZpZXcgey4uLnRoaXMucHJvcHN9IC8+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoc3RhdGUpID0+IHtcblxuICAgIGNvbnN0IHtcbiAgICAgICAgc2VsZWN0ZWRMb2NhdGlvbixcbiAgICAgICAgc2VsZWN0ZWRDcml0ZXJpYXMsXG4gICAgICAgIGZpbHRlckNyaXRlcmlhLFxuICAgICAgICBMT0FERURfU0VBUkNIX0NSSVRFUklBX0xBQlxuICAgIH0gPSBzdGF0ZS5TRUFSQ0hfQ1JJVEVSSUFfTEFCU1xuXG4gICAgbGV0IExBQlMgPSBzdGF0ZS5MQUJTXG5cbiAgICByZXR1cm4ge1xuICAgICAgICBzZWxlY3RlZENyaXRlcmlhcyxcbiAgICAgICAgTEFCU1xuICAgIH1cbn1cblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gKGRpc3BhdGNoKSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdG9nZ2xlRGlhZ25vc2lzQ3JpdGVyaWE6ICh0eXBlLCBjcml0ZXJpYSkgPT4gZGlzcGF0Y2godG9nZ2xlRGlhZ25vc2lzQ3JpdGVyaWEodHlwZSwgY3JpdGVyaWEpKSxcbiAgICAgICAgZ2V0TGFiQnlJZDogKGxhYklkKSA9PiBkaXNwYXRjaChnZXRMYWJCeUlkKGxhYklkKSlcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG1hcERpc3BhdGNoVG9Qcm9wcykoVGVzdFNlbGVjdG9yKTtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG5pbXBvcnQgeyBnZXREb2N0b3JCeUlkLCBnZXRUaW1lU2xvdHMgfSBmcm9tICcuLi8uLi9hY3Rpb25zL2luZGV4LmpzJ1xuXG5pbXBvcnQgQXBwb2ludG1lbnRTbG90VmlldyBmcm9tICcuLi8uLi9jb21wb25lbnRzL29wZC9hcHBvaW50bWVudFNsb3QvaW5kZXguanMnXG5cbmNsYXNzIEFwcG9pbnRtZW50U2xvdCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgfVxuXG4gICAgc3RhdGljIGxvYWREYXRhKHN0b3JlLCBtYXRjaCkge1xuICAgICAgICByZXR1cm4gc3RvcmUuZGlzcGF0Y2goZ2V0RG9jdG9yQnlJZChtYXRjaC5wYXJhbXMuaWQpKVxuICAgIH1cblxuICAgIHN0YXRpYyBjb250ZXh0VHlwZXMgPSB7XG4gICAgICAgIHJvdXRlcjogKCkgPT4gbnVsbFxuICAgIH1cblxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgICB0aGlzLnByb3BzLmdldERvY3RvckJ5SWQodGhpcy5wcm9wcy5tYXRjaC5wYXJhbXMuaWQpXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8QXBwb2ludG1lbnRTbG90VmlldyB7Li4udGhpcy5wcm9wc30gLz5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9IChzdGF0ZSkgPT4ge1xuXG4gICAgbGV0IERPQ1RPUlMgPSBzdGF0ZS5ET0NUT1JTXG5cbiAgICByZXR1cm4ge1xuICAgICAgICBET0NUT1JTXG4gICAgfVxufVxuXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSAoZGlzcGF0Y2gpID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgICBnZXREb2N0b3JCeUlkOiAoZG9jdG9ySWQpID0+IGRpc3BhdGNoKGdldERvY3RvckJ5SWQoZG9jdG9ySWQpKSxcbiAgICAgICAgZ2V0VGltZVNsb3RzOiAoZG9jdG9ySWQsIGNsaW5pY0lkLCBjYWxsYmFjaykgPT4gZGlzcGF0Y2goZ2V0VGltZVNsb3RzKGRvY3RvcklkLCBjbGluaWNJZCwgY2FsbGJhY2spKVxuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbWFwRGlzcGF0Y2hUb1Byb3BzKShBcHBvaW50bWVudFNsb3QpO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cbmltcG9ydCB7IH0gZnJvbSAnLi4vLi4vYWN0aW9ucy9pbmRleC5qcydcblxuaW1wb3J0IEJvb2tpbmdWaWV3IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvb3BkL2Jvb2tpbmcvQm9va2luZ1ZpZXcuanMnXG5cbmNsYXNzIEJvb2tpbmcgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPEJvb2tpbmdWaWV3IHsuLi50aGlzLnByb3BzfSAvPlxuICAgICAgICApO1xuICAgIH1cbn1cblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHN0YXRlKSA9PiB7XG5cbiAgICByZXR1cm4ge1xuXG4gICAgfVxufVxuXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSAoZGlzcGF0Y2gpID0+IHtcbiAgICByZXR1cm4ge1xuXG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpKEJvb2tpbmcpO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cbmltcG9ydCB7IGdldERvY3RvckJ5SWQgfSBmcm9tICcuLi8uLi9hY3Rpb25zL2luZGV4LmpzJ1xuXG5pbXBvcnQgQ2xpbmljTGlzdFZpZXcgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9vcGQvY2xpbmljTGlzdC9pbmRleC5qcydcblxuY2xhc3MgQ2xpbmljTGlzdCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8Q2xpbmljTGlzdFZpZXcgey4uLnRoaXMucHJvcHN9IC8+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoc3RhdGUpID0+IHtcblxuICAgIGxldCBET0NUT1JTID0gc3RhdGUuRE9DVE9SU1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgRE9DVE9SU1xuICAgIH1cbn1cblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gKGRpc3BhdGNoKSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgZ2V0RG9jdG9yQnlJZCA6IChkb2N0b3JJZCkgPT4gZGlzcGF0Y2goZ2V0RG9jdG9yQnlJZChkb2N0b3JJZCkpXG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpKENsaW5pY0xpc3QpO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cbmltcG9ydCB7IGdldENyaXRlcmlhUmVzdWx0cywgdG9nZ2xlQ3JpdGVyaWEgfSBmcm9tICcuLi8uLi9hY3Rpb25zL2luZGV4LmpzJ1xuaW1wb3J0IENyaXRlcmlhU2VhcmNoVmlldyBmcm9tICcuLi8uLi9jb21wb25lbnRzL29wZC9jcml0ZXJpYVNlYXJjaC9pbmRleC5qcydcblxuY2xhc3MgQ3JpdGVyaWFTZWFyY2ggZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPENyaXRlcmlhU2VhcmNoVmlld1xuICAgICAgICAgICAgICAgIHsgLi4udGhpcy5wcm9wcyB9XG4gICAgICAgICAgICAvPlxuICAgICAgICApO1xuICAgIH1cbn1cblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHN0YXRlKSA9PiB7XG5cbiAgICByZXR1cm4ge1xuXG4gICAgfVxufVxuXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSAoZGlzcGF0Y2gpID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgICBnZXRDcml0ZXJpYVJlc3VsdHMgOiAoc2VhcmNoU3RyaW5nLGNiKSA9PiBkaXNwYXRjaChnZXRDcml0ZXJpYVJlc3VsdHMoc2VhcmNoU3RyaW5nLGNiKSksXG4gICAgICAgIHRvZ2dsZUNyaXRlcmlhIDogKGNyaXRlcmlhKSA9PiBkaXNwYXRjaCh0b2dnbGVDcml0ZXJpYShjcml0ZXJpYSkpXG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpKENyaXRlcmlhU2VhcmNoKTtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG5pbXBvcnQgeyBnZXREb2N0b3JCeUlkIH0gZnJvbSAnLi4vLi4vYWN0aW9ucy9pbmRleC5qcydcblxuaW1wb3J0IERvY3RvclByb2ZpbGVWaWV3IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvb3BkL2RvY3RvclByb2ZpbGUvaW5kZXguanMnXG5cbmNsYXNzIERvY3RvclByb2ZpbGUgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgIH1cblxuICAgIHN0YXRpYyBsb2FkRGF0YShzdG9yZSwgbWF0Y2gpIHtcbiAgICAgICAgcmV0dXJuIHN0b3JlLmRpc3BhdGNoKGdldERvY3RvckJ5SWQobWF0Y2gucGFyYW1zLmlkKSlcbiAgICB9XG5cbiAgICBzdGF0aWMgY29udGV4dFR5cGVzID0ge1xuICAgICAgICByb3V0ZXI6ICgpID0+IG51bGxcbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgdGhpcy5wcm9wcy5nZXREb2N0b3JCeUlkKHRoaXMucHJvcHMubWF0Y2gucGFyYW1zLmlkKVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPERvY3RvclByb2ZpbGVWaWV3IHsuLi50aGlzLnByb3BzfSAvPlxuICAgICAgICApO1xuICAgIH1cbn1cblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHN0YXRlKSA9PiB7XG5cbiAgICBsZXQgRE9DVE9SUyA9IHN0YXRlLkRPQ1RPUlNcblxuICAgIHJldHVybiB7XG4gICAgICAgIERPQ1RPUlNcbiAgICB9XG59XG5cbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IChkaXNwYXRjaCkgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICAgIGdldERvY3RvckJ5SWQ6IChkb2N0b3JJZCkgPT4gZGlzcGF0Y2goZ2V0RG9jdG9yQnlJZChkb2N0b3JJZCkpXG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpKERvY3RvclByb2ZpbGUpO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cbmltcG9ydCB7IHNlbGVjdExvY2F0aW9uIH0gZnJvbSAnLi4vLi4vYWN0aW9ucy9pbmRleC5qcydcbmltcG9ydCBMb2NhdGlvblNlYXJjaFZpZXcgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9vcGQvbG9jYXRpb25TZWFyY2gvaW5kZXguanMnXG5cbmNsYXNzIExvY2F0aW9uU2VhcmNoIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICB9XG5cbiAgICBzdGF0aWMgY29udGV4dFR5cGVzID0ge1xuICAgICAgICByb3V0ZXI6ICgpID0+IG51bGxcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxMb2NhdGlvblNlYXJjaFZpZXcgey4uLnRoaXMucHJvcHN9IC8+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoc3RhdGUpID0+IHtcbiAgICBjb25zdCB7XG4gICAgICAgIHNlbGVjdGVkTG9jYXRpb25cbiAgICB9ID0gc3RhdGUuU0VBUkNIX0NSSVRFUklBX09QRFxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgc2VsZWN0ZWRMb2NhdGlvblxuICAgIH1cbn1cblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gKGRpc3BhdGNoKSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgc2VsZWN0TG9jYXRpb246IChsb2NhdGlvbikgPT4gZGlzcGF0Y2goc2VsZWN0TG9jYXRpb24obG9jYXRpb24pKVxuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbWFwRGlzcGF0Y2hUb1Byb3BzKShMb2NhdGlvblNlYXJjaCk7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcblxuaW1wb3J0IHsgZ2V0RG9jdG9yQnlJZCB9IGZyb20gJy4uLy4uL2FjdGlvbnMvaW5kZXguanMnXG5cbmltcG9ydCBQYXRpZW50RGV0YWlsc1ZpZXcgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9vcGQvcGF0aWVudERldGFpbHMvaW5kZXguanMnXG5cbmNsYXNzIFBhdGllbnREZXRhaWxzIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxQYXRpZW50RGV0YWlsc1ZpZXcgey4uLnRoaXMucHJvcHN9IC8+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoc3RhdGUpID0+IHtcblxuICAgIGxldCBET0NUT1JTID0gc3RhdGUuRE9DVE9SU1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgRE9DVE9SU1xuICAgIH1cbn1cblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gKGRpc3BhdGNoKSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgZ2V0RG9jdG9yQnlJZCA6IChkb2N0b3JJZCkgPT4gZGlzcGF0Y2goZ2V0RG9jdG9yQnlJZChkb2N0b3JJZCkpXG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpKFBhdGllbnREZXRhaWxzKTtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG5pbXBvcnQgeyB9IGZyb20gJy4uLy4uL2FjdGlvbnMvaW5kZXguanMnXG5cbmltcG9ydCBQYXltZW50VmlldyBmcm9tICcuLi8uLi9jb21wb25lbnRzL29wZC9wYXltZW50L1BheW1lbnRWaWV3LmpzJ1xuXG5jbGFzcyBQYXltZW50IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxQYXltZW50VmlldyB7Li4udGhpcy5wcm9wc30gLz5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9IChzdGF0ZSkgPT4ge1xuXG4gICAgcmV0dXJuIHtcblxuICAgIH1cbn1cblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gKGRpc3BhdGNoKSA9PiB7XG4gICAgcmV0dXJuIHtcblxuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbWFwRGlzcGF0Y2hUb1Byb3BzKShQYXltZW50KTtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG5pbXBvcnQgeyBnZXRPUERDcml0ZXJpYVJlc3VsdHMsIHRvZ2dsZU9QRENyaXRlcmlhLCBsb2FkT1BEQ29tbW9uQ3JpdGVyaWEgfSBmcm9tICcuLi8uLi9hY3Rpb25zL2luZGV4LmpzJ1xuaW1wb3J0IFNlYXJjaENyaXRlcmlhVmlldyBmcm9tICcuLi8uLi9jb21wb25lbnRzL29wZC9zZWFyY2hDcml0ZXJpYS9pbmRleC5qcydcblxuY2xhc3MgU2VhcmNoQ3JpdGVyaWEgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgIH1cblxuICAgIHN0YXRpYyBsb2FkRGF0YShzdG9yZSkge1xuICAgICAgICByZXR1cm4gc3RvcmUuZGlzcGF0Y2gobG9hZE9QRENvbW1vbkNyaXRlcmlhKCkpXG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIHRoaXMucHJvcHMubG9hZE9QRENvbW1vbkNyaXRlcmlhKClcbiAgICB9XG5cbiAgICBzdGF0aWMgY29udGV4dFR5cGVzID0ge1xuICAgICAgICByb3V0ZXI6ICgpID0+IG51bGxcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxTZWFyY2hDcml0ZXJpYVZpZXcgey4uLnRoaXMucHJvcHN9IC8+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoc3RhdGUpID0+IHtcblxuICAgIGNvbnN0IHtcbiAgICAgICAgTE9BREVEX1NFQVJDSF9DUklURVJJQV9PUEQsXG4gICAgICAgIHNwZWNpYWxpemF0aW9ucyxcbiAgICAgICAgY29uZGl0aW9ucyxcbiAgICAgICAgc2VsZWN0ZWRDcml0ZXJpYXMsXG4gICAgICAgIHNlbGVjdGVkTG9jYXRpb24sXG4gICAgICAgIGZpbHRlckNyaXRlcmlhXG4gICAgfSA9IHN0YXRlLlNFQVJDSF9DUklURVJJQV9PUERcblxuICAgIHJldHVybiB7XG4gICAgICAgIExPQURFRF9TRUFSQ0hfQ1JJVEVSSUFfT1BELFxuICAgICAgICBzcGVjaWFsaXphdGlvbnMsXG4gICAgICAgIGNvbmRpdGlvbnMsXG4gICAgICAgIHNlbGVjdGVkQ3JpdGVyaWFzLFxuICAgICAgICBzZWxlY3RlZExvY2F0aW9uLFxuICAgICAgICBmaWx0ZXJDcml0ZXJpYVxuICAgIH1cbn1cblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gKGRpc3BhdGNoKSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgbG9hZE9QRENvbW1vbkNyaXRlcmlhOiAoKSA9PiBkaXNwYXRjaChsb2FkT1BEQ29tbW9uQ3JpdGVyaWEoKSksXG4gICAgICAgIHRvZ2dsZU9QRENyaXRlcmlhOiAodHlwZSwgY3JpdGVyaWEpID0+IGRpc3BhdGNoKHRvZ2dsZU9QRENyaXRlcmlhKHR5cGUsIGNyaXRlcmlhKSksXG4gICAgICAgIGdldE9QRENyaXRlcmlhUmVzdWx0czogKHNlYXJjaFN0cmluZywgY2FsbGJhY2spID0+IGRpc3BhdGNoKGdldE9QRENyaXRlcmlhUmVzdWx0cyhzZWFyY2hTdHJpbmcsIGNhbGxiYWNrKSlcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG1hcERpc3BhdGNoVG9Qcm9wcykoU2VhcmNoQ3JpdGVyaWEpO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cbmltcG9ydCB7IGdldERvY3RvcnMsIGdldE9QRENyaXRlcmlhUmVzdWx0cywgdG9nZ2xlT1BEQ3JpdGVyaWEgfSBmcm9tICcuLi8uLi9hY3Rpb25zL2luZGV4LmpzJ1xuXG5pbXBvcnQgU2VhcmNoUmVzdWx0c1ZpZXcgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9vcGQvc2VhcmNoUmVzdWx0cy9pbmRleC5qcydcblxuY2xhc3MgU2VhcmNoUmVzdWx0cyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG5cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN0YXRpYyBjb250ZXh0VHlwZXMgPSB7XG4gICAgICAgIHJvdXRlcjogKCkgPT4gbnVsbFxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPFNlYXJjaFJlc3VsdHNWaWV3IHsuLi50aGlzLnByb3BzfSAvPlxuICAgICAgICApXG4gICAgfVxufVxuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoc3RhdGUpID0+IHtcblxuICAgIGNvbnN0IHtcbiAgICAgICAgTE9BREVEX1NFQVJDSF9DUklURVJJQV9PUEQsXG4gICAgICAgIHNlbGVjdGVkQ3JpdGVyaWFzLFxuICAgICAgICBzZWxlY3RlZExvY2F0aW9uLFxuICAgICAgICBmaWx0ZXJDcml0ZXJpYVxuICAgIH0gPSBzdGF0ZS5TRUFSQ0hfQ1JJVEVSSUFfT1BEXG5cbiAgICBsZXQgRE9DVE9SUyA9IHN0YXRlLkRPQ1RPUlNcbiAgICBsZXQgeyBkb2N0b3JMaXN0LCBMT0FERURfRE9DVE9SX1NFQVJDSCB9ID0gc3RhdGUuRE9DVE9SX1NFQVJDSFxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgRE9DVE9SUywgZG9jdG9yTGlzdCwgTE9BREVEX0RPQ1RPUl9TRUFSQ0gsXG4gICAgICAgIExPQURFRF9TRUFSQ0hfQ1JJVEVSSUFfT1BELFxuICAgICAgICBzZWxlY3RlZENyaXRlcmlhcyxcbiAgICAgICAgc2VsZWN0ZWRMb2NhdGlvbixcbiAgICAgICAgZmlsdGVyQ3JpdGVyaWFcbiAgICB9XG59XG5cbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IChkaXNwYXRjaCkgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICAgIGxvYWRPUERDb21tb25Dcml0ZXJpYTogKCkgPT4gZGlzcGF0Y2gobG9hZE9QRENvbW1vbkNyaXRlcmlhKCkpLFxuICAgICAgICB0b2dnbGVPUERDcml0ZXJpYTogKHR5cGUsIGNyaXRlcmlhKSA9PiBkaXNwYXRjaCh0b2dnbGVPUERDcml0ZXJpYSh0eXBlLCBjcml0ZXJpYSkpLFxuICAgICAgICBnZXREb2N0b3JzOiAoc2VhcmNoU3RhdGUsIGZpbHRlckNyaXRlcmlhLCBtZXJnZVN0YXRlKSA9PiBkaXNwYXRjaChnZXREb2N0b3JzKHNlYXJjaFN0YXRlLCBmaWx0ZXJDcml0ZXJpYSwgbWVyZ2VTdGF0ZSkpXG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbWFwRGlzcGF0Y2hUb1Byb3BzKShTZWFyY2hSZXN1bHRzKTtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG5pbXBvcnQgeyBzZXRPUERGaWx0ZXJzIH0gZnJvbSAnLi4vLi4vYWN0aW9ucy9pbmRleC5qcydcblxuaW1wb3J0IFNlYXJjaFJlc3VsdHNGaWx0ZXJWaWV3IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvb3BkL3NlYXJjaFJlc3VsdHNGaWx0ZXIvaW5kZXguanMnXG5cbmNsYXNzIFNlYXJjaFJlc3VsdHNGaWx0ZXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPFNlYXJjaFJlc3VsdHNGaWx0ZXJWaWV3IHsuLi50aGlzLnByb3BzfS8+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoc3RhdGUpID0+IHtcblxuICAgIGNvbnN0IHtcbiAgICAgICAgZmlsdGVyQ3JpdGVyaWFcbiAgICB9ID0gc3RhdGUuU0VBUkNIX0NSSVRFUklBX09QRFxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgZmlsdGVyQ3JpdGVyaWFcbiAgICB9XG59XG5cbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IChkaXNwYXRjaCkgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICAgIHNldE9QREZpbHRlcnMgOiAoZmlsdGVyRGF0YSkgPT4gZGlzcGF0Y2goc2V0T1BERmlsdGVycyhmaWx0ZXJEYXRhKSlcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG1hcERpc3BhdGNoVG9Qcm9wcykoU2VhcmNoUmVzdWx0c0ZpbHRlcik7XG4iLCJpbXBvcnQgTkFWSUdBVEUgZnJvbSAnLi9uYXZpZ2F0ZSdcblxuZXhwb3J0IGRlZmF1bHQgTkFWSUdBVEUiLCJjb25zdCBOQVZJR0FURSA9IHtcbiAgICBuYXZpZ2F0ZVRvIDogKHdoZXJlKSA9PiB7XG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gd2hlcmVcbiAgICB9LFxuXG4gICAgcmVmcmVzaEFwcG9pbnRtZW50U3RhdGUgOiAocHJvcHMpID0+IHtcbiAgICAgICAgbGV0IG5vQXBwb2ludG1lbnRGb3VuZCA9IHByb3BzLnVwY29taW5nLmxlbmd0aCA9PSAwICYmIHByb3BzLnByZXZpb3VzLmxlbmd0aCA9PSAwXG4gICAgICAgIFxuICAgICAgICBpZihwcm9wcy5oaXN0b3J5LmFjdGlvbiA9PT0gJ1BVU0gnIHx8IG5vQXBwb2ludG1lbnRGb3VuZCl7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE5BVklHQVRFIiwiaW1wb3J0IFNUT1JBR0UgZnJvbSAnLi9zdG9yYWdlJ1xuXG5leHBvcnQgZGVmYXVsdCBTVE9SQUdFIiwiaW1wb3J0IENvb2tpZXMgZnJvbSAndW5pdmVyc2FsLWNvb2tpZSc7XG5jb25zdCBjb29raWVzID0gbmV3IENvb2tpZXMoKTtcblxuY29uc3QgU1RPUkFHRSA9IHtcbiAgICBzZXRBdXRoVG9rZW46ICh0b2tlbikgPT4ge1xuICAgICAgICBjb29raWVzLnNldCgndG9rZW4nLCB0b2tlbilcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh0cnVlKVxuICAgIH0sXG4gICAgZ2V0QXV0aFRva2VuOiAoKSA9PiB7XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoY29va2llcy5nZXQoJ3Rva2VuJykpXG4gICAgfSxcbiAgICBjaGVja0F1dGg6ICgpID0+IHtcbiAgICAgICAgcmV0dXJuICEhY29va2llcy5nZXQoJ3Rva2VuJylcbiAgICB9LFxuICAgIGRlbGV0ZUF1dGg6ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShjb29raWVzLnJlbW92ZSgndG9rZW4nKSlcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFNUT1JBR0UiLCJpbXBvcnQgeyBTRU5EX09UUF9SRVFVRVNULCBTRU5EX09UUF9TVUNDRVNTLCBTRU5EX09UUF9GQUlMLCBTVUJNSVRfT1RQX1JFUVVFU1QsIFNVQk1JVF9PVFBfU1VDQ0VTUywgU1VCTUlUX09UUF9GQUlMIH0gZnJvbSAnLi4vLi4vY29uc3RhbnRzL3R5cGVzJztcblxuY29uc3QgZGVmYXVsdFN0YXRlID0ge1xuICAgIHRva2VuOiBudWxsLFxuICAgIGVycm9yX21lc3NhZ2U6IFwiXCIsXG4gICAgc3VjY2Vzc19tZXNzYWdlOiBcIlwiLFxuICAgIG90cF9yZXF1ZXN0X3NlbnQ6IGZhbHNlLFxuICAgIG90cF9yZXF1ZXN0X3N1Y2Nlc3M6IGZhbHNlLFxuICAgIG90cF9yZXF1ZXN0X2ZhaWw6IGZhbHNlLFxuICAgIHBob25lTnVtYmVyOiBcIlwiLFxuICAgIHN1Ym1pdF9vdHA6ZmFsc2UsXG4gICAgc3VibWl0X290cF9zdWNjZXNzOmZhbHNlLFxuICAgIHN1Ym1pdF9vdHBfZmFpbDpmYWxzZVxufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoc3RhdGUgPSBkZWZhdWx0U3RhdGUsIGFjdGlvbikge1xuXG4gICAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgICAgICBjYXNlIFNFTkRfT1RQX1JFUVVFU1Q6IHtcbiAgICAgICAgICAgIGxldCBuZXdTdGF0ZSA9IHsgLi4uZGVmYXVsdFN0YXRlIH1cblxuICAgICAgICAgICAgbmV3U3RhdGUub3RwX3JlcXVlc3Rfc2VudCA9IHRydWVcbiAgICAgICAgICAgIG5ld1N0YXRlLnBob25lTnVtYmVyID0gYWN0aW9uLnBheWxvYWQucGhvbmVOdW1iZXJcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgcmV0dXJuIG5ld1N0YXRlXG4gICAgICAgIH1cblxuICAgICAgICBjYXNlIFNFTkRfT1RQX1NVQ0NFU1M6IHtcbiAgICAgICAgICAgIGxldCBuZXdTdGF0ZSA9IHsgLi4uc3RhdGUgfVxuICAgICAgICAgICAgbmV3U3RhdGUub3RwX3JlcXVlc3Rfc2VudCA9IGZhbHNlXG4gICAgICAgICAgICBuZXdTdGF0ZS5vdHBfcmVxdWVzdF9zdWNjZXNzID0gdHJ1ZVxuICAgICAgICAgICAgbmV3U3RhdGUub3RwX3JlcXVlc3RfZmFpbCA9IGZhbHNlXG4gICAgICAgICAgICBuZXdTdGF0ZS5zdWNjZXNzX21lc3NhZ2UgPSBhY3Rpb24ucGF5bG9hZC5zdWNjZXNzX21lc3NhZ2VcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgcmV0dXJuIG5ld1N0YXRlXG4gICAgICAgIH1cblxuICAgICAgICBjYXNlIFNFTkRfT1RQX0ZBSUw6IHtcbiAgICAgICAgICAgIGxldCBuZXdTdGF0ZSA9IHsgLi4uc3RhdGUgfVxuICAgICAgICAgICAgbmV3U3RhdGUub3RwX3JlcXVlc3Rfc2VudCA9IGZhbHNlXG4gICAgICAgICAgICBuZXdTdGF0ZS5vdHBfcmVxdWVzdF9mYWlsID0gdHJ1ZVxuICAgICAgICAgICAgbmV3U3RhdGUub3RwX3JlcXVlc3Rfc3VjY2VzcyA9IGZhbHNlXG4gICAgICAgICAgICBuZXdTdGF0ZS5lcnJvcl9tZXNzYWdlID0gYWN0aW9uLnBheWxvYWQuZXJyb3JfbWVzc2FnZVxuICAgICAgICAgICAgXG4gICAgICAgICAgICByZXR1cm4gbmV3U3RhdGVcbiAgICAgICAgfVxuXG4gICAgICAgIGNhc2UgU1VCTUlUX09UUF9SRVFVRVNUOiB7XG4gICAgICAgICAgICBsZXQgbmV3U3RhdGUgPSB7IC4uLnN0YXRlIH1cbiAgICAgICAgICAgIG5ld1N0YXRlLnN1Ym1pdF9vdHAgPSB0cnVlXG4gICAgICAgICAgICByZXR1cm4gbmV3U3RhdGVcbiAgICAgICAgfVxuXG4gICAgICAgIGNhc2UgU1VCTUlUX09UUF9TVUNDRVNTOiB7XG4gICAgICAgICAgICBsZXQgbmV3U3RhdGUgPSB7IC4uLnN0YXRlIH1cbiAgICAgICAgICAgIG5ld1N0YXRlLnN1Ym1pdF9vdHAgPSBmYWxzZVxuICAgICAgICAgICAgbmV3U3RhdGUuc3VibWl0X290cF9mYWlsID0gZmFsc2VcbiAgICAgICAgICAgIG5ld1N0YXRlLnN1Ym1pdF9vdHBfc3VjY2VzcyA9IHRydWVcbiAgICAgICAgICAgIG5ld1N0YXRlLnRva2VuID0gYWN0aW9uLnBheWxvYWQudG9rZW5cbiAgICAgICAgICAgIHJldHVybiBuZXdTdGF0ZVxuICAgICAgICB9XG5cbiAgICAgICAgY2FzZSBTVUJNSVRfT1RQX0ZBSUw6IHtcbiAgICAgICAgICAgIGxldCBuZXdTdGF0ZSA9IHsgLi4uc3RhdGUgfVxuICAgICAgICAgICAgbmV3U3RhdGUuc3VibWl0X290cCA9IGZhbHNlXG4gICAgICAgICAgICBuZXdTdGF0ZS5zdWJtaXRfb3RwX2ZhaWwgPSB0cnVlXG4gICAgICAgICAgICBuZXdTdGF0ZS5zdWJtaXRfb3RwX3N1Y2Nlc3MgPSBmYWxzZVxuICAgICAgICAgICAgbmV3U3RhdGUuZXJyb3JfbWVzc2FnZSA9IGFjdGlvbi5wYXlsb2FkLmVycm9yX21lc3NhZ2VcbiAgICAgICAgICAgIHJldHVybiBuZXdTdGF0ZVxuICAgICAgICB9XG5cbiAgICB9XG4gICAgcmV0dXJuIHN0YXRlXG59IiwiaW1wb3J0IHsgQVBQRU5EX1VTRVJfUFJPRklMRVMgfSBmcm9tICcuLi8uLi9jb25zdGFudHMvdHlwZXMnO1xuXG5jb25zdCBkZWZhdWx0U3RhdGUgPSB7XG4gICAgcHJvZmlsZXM6IHt9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChzdGF0ZSA9IGRlZmF1bHRTdGF0ZSwgYWN0aW9uKSB7XG5cbiAgICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgICAgIGNhc2UgQVBQRU5EX1VTRVJfUFJPRklMRVM6IHtcbiAgICAgICAgICAgIGxldCBuZXdTdGF0ZSA9IHtcbiAgICAgICAgICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgICAgICAgICBwcm9maWxlcyA6IHsgLi4uc3RhdGUucHJvZmlsZXMgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBuZXdTdGF0ZS5wcm9maWxlcyA9IGFjdGlvbi5wYXlsb2FkLnJlZHVjZSgocHJvZmlsZU1hcCwgcHJvZmlsZSkgPT4ge1xuICAgICAgICAgICAgICAgIHByb2ZpbGVNYXBbcHJvZmlsZS5wcm9maWxlSWRdID0gcHJvZmlsZVxuICAgICAgICAgICAgICAgIHJldHVybiBwcm9maWxlTWFwXG4gICAgICAgICAgICB9LCBuZXdTdGF0ZS5wcm9maWxlcylcblxuICAgICAgICAgICAgcmV0dXJuIG5ld1N0YXRlXG4gICAgICAgIH1cblxuICAgIH1cbiAgICByZXR1cm4gc3RhdGVcbn0iLCJpbXBvcnQgeyBBUFBFTkRfTEFCUyB9IGZyb20gJy4uLy4uL2NvbnN0YW50cy90eXBlcyc7XG5cbmNvbnN0IGRlZmF1bHRTdGF0ZSA9IHtcblxufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoc3RhdGUgPSBkZWZhdWx0U3RhdGUsIGFjdGlvbikge1xuXG4gICAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgICAgICBjYXNlIEFQUEVORF9MQUJTOiB7XG4gICAgICAgICAgICBsZXQgbmV3U3RhdGUgPSB7IC4uLnN0YXRlIH1cblxuICAgICAgICAgICAgcmV0dXJuIGFjdGlvbi5wYXlsb2FkLnJlZHVjZSgobGFwTWFwLCBsYWIpID0+IHtcbiAgICAgICAgICAgICAgICBsYXBNYXBbbGFiLmxhYi5pZF0gPSBsYWJcbiAgICAgICAgICAgICAgICByZXR1cm4gbGFwTWFwXG4gICAgICAgICAgICB9LG5ld1N0YXRlKVxuXG4gICAgICAgIH1cblxuICAgIH1cbiAgICByZXR1cm4gc3RhdGVcbn0iLCJpbXBvcnQgeyBMQUJfU0VBUkNIX1NUQVJULCBMQUJfU0VBUkNIIH0gZnJvbSAnLi4vLi4vY29uc3RhbnRzL3R5cGVzJztcblxuY29uc3QgZGVmYXVsdFN0YXRlID0ge1xuICAgIGxhYkxpc3Q6IFtdLFxuICAgIExPQURFRF9MQUJTX1NFQVJDSDogZmFsc2Vcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHN0YXRlID0gZGVmYXVsdFN0YXRlLCBhY3Rpb24pIHtcblxuICAgIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcblxuICAgICAgICBjYXNlIExBQl9TRUFSQ0hfU1RBUlQ6IHtcbiAgICAgICAgICAgIGxldCBuZXdTdGF0ZSA9IHsgLi4uc3RhdGUgfVxuXG4gICAgICAgICAgICBuZXdTdGF0ZS5MT0FERURfTEFCU19TRUFSQ0ggPSBmYWxzZVxuXG4gICAgICAgICAgICByZXR1cm4gbmV3U3RhdGVcbiAgICAgICAgfVxuXG4gICAgICAgIGNhc2UgTEFCX1NFQVJDSDoge1xuICAgICAgICAgICAgbGV0IG5ld1N0YXRlID0geyAuLi5zdGF0ZSB9XG5cbiAgICAgICAgICAgIG5ld1N0YXRlLmxhYkxpc3QgPSBhY3Rpb24ucGF5bG9hZC5tYXAobGFiID0+IGxhYi5sYWIuaWQpXG4gICAgICAgICAgICBuZXdTdGF0ZS5MT0FERURfTEFCU19TRUFSQ0ggPSB0cnVlXG5cbiAgICAgICAgICAgIHJldHVybiBuZXdTdGF0ZVxuICAgICAgICB9XG5cbiAgICB9XG4gICAgXG4gICAgcmV0dXJuIHN0YXRlXG59IiwiaW1wb3J0IHsgQVBQRU5EX0ZJTFRFUlNfRElBR05PU0lTLCBUT0dHTEVfQ09ORElUSU9OUywgVE9HR0xFX1NQRUNJQUxJVElFUywgU0VMRUNUX0xPQ0FUSU9OX0RJQUdOT1NJUywgTUVSR0VfU0VBUkNIX1NUQVRFX0xBQiwgVE9HR0xFX0NSSVRFUklBLCBUT0dHTEVfVEVTVFMsIFRPR0dMRV9ESUFHTk9TSVNfQ1JJVEVSSUEsIExPQURfU0VBUkNIX0NSSVRFUklBX0xBQiB9IGZyb20gJy4uLy4uL2NvbnN0YW50cy90eXBlcyc7XG5cbmNvbnN0IGRlZmF1bHRTdGF0ZSA9IHtcbiAgICBMT0FERURfU0VBUkNIX0NSSVRFUklBX0xBQjogZmFsc2UsXG4gICAgY29tbW9uX3Rlc3RzOiBbXSxcbiAgICBjb21tb25fY29uZGl0aW9uczogW10sXG4gICAgcHJlZmVycmVkX2xhYnM6IFtdLFxuICAgIHNlbGVjdGVkQ3JpdGVyaWFzOiBbXSxcbiAgICBzZWxlY3RlZExvY2F0aW9uOiBudWxsLFxuICAgIGZpbHRlckNyaXRlcmlhOiB7XG4gICAgICAgIHByaWNlUmFuZ2U6IFsxMDAsIDE1MDBdLFxuICAgICAgICBkaXN0YW5jZVJhbmdlOiBbMSwgMzVdLFxuICAgICAgICBzb3J0Qnk6IG51bGxcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChzdGF0ZSA9IGRlZmF1bHRTdGF0ZSwgYWN0aW9uKSB7XG5cbiAgICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgICAgIGNhc2UgTE9BRF9TRUFSQ0hfQ1JJVEVSSUFfTEFCOiB7XG4gICAgICAgICAgICBsZXQgbmV3U3RhdGUgPSB7IC4uLnN0YXRlIH1cbiAgICAgICAgICAgIGlmIChhY3Rpb24ucGF5bG9hZCkge1xuICAgICAgICAgICAgICAgIG5ld1N0YXRlID0geyAuLi5uZXdTdGF0ZSwgLi4uYWN0aW9uLnBheWxvYWQgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbmV3U3RhdGUuTE9BREVEX1NFQVJDSF9DUklURVJJQV9MQUIgPSB0cnVlXG4gICAgICAgICAgICByZXR1cm4gbmV3U3RhdGVcbiAgICAgICAgfVxuXG4gICAgICAgIGNhc2UgVE9HR0xFX0RJQUdOT1NJU19DUklURVJJQToge1xuICAgICAgICAgICAgbGV0IG5ld1N0YXRlID0ge1xuICAgICAgICAgICAgICAgIC4uLnN0YXRlLFxuICAgICAgICAgICAgICAgIHNlbGVjdGVkQ3JpdGVyaWFzOiBbXS5jb25jYXQoc3RhdGUuc2VsZWN0ZWRDcml0ZXJpYXMpXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxldCBmb3VuZCA9IGZhbHNlXG4gICAgICAgICAgICBuZXdTdGF0ZS5zZWxlY3RlZENyaXRlcmlhcyA9IG5ld1N0YXRlLnNlbGVjdGVkQ3JpdGVyaWFzLmZpbHRlcigoY3VycikgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChjdXJyLmlkID09IGFjdGlvbi5wYXlsb2FkLmNyaXRlcmlhLmlkICYmIGN1cnIudHlwZSA9PSBhY3Rpb24ucGF5bG9hZC50eXBlKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvdW5kID0gdHJ1ZVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgIGlmICghZm91bmQpIHtcbiAgICAgICAgICAgICAgICBuZXdTdGF0ZS5zZWxlY3RlZENyaXRlcmlhcy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgLi4uYWN0aW9uLnBheWxvYWQuY3JpdGVyaWEsXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IGFjdGlvbi5wYXlsb2FkLnR5cGVcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gbmV3U3RhdGVcbiAgICAgICAgfVxuXG4gICAgICAgIGNhc2UgU0VMRUNUX0xPQ0FUSU9OX0RJQUdOT1NJUzoge1xuICAgICAgICAgICAgbGV0IG5ld1N0YXRlID0geyAuLi5zdGF0ZSB9XG5cbiAgICAgICAgICAgIG5ld1N0YXRlLnNlbGVjdGVkTG9jYXRpb24gPSBhY3Rpb24ucGF5bG9hZFxuICAgICAgICAgICAgcmV0dXJuIG5ld1N0YXRlXG4gICAgICAgIH1cblxuICAgICAgICBjYXNlIE1FUkdFX1NFQVJDSF9TVEFURV9MQUI6IHtcbiAgICAgICAgICAgIGxldCBuZXdTdGF0ZSA9IHsgLi4uc3RhdGUsIC4uLmFjdGlvbi5wYXlsb2FkLnNlYXJjaFN0YXRlLCBmaWx0ZXJDcml0ZXJpYSA6IGFjdGlvbi5wYXlsb2FkLmZpbHRlckNyaXRlcmlhIH1cblxuICAgICAgICAgICAgcmV0dXJuIG5ld1N0YXRlXG4gICAgICAgIH1cblxuICAgIH1cbiAgICByZXR1cm4gc3RhdGVcbn1cblxuXG5cblxuXG4iLCJpbXBvcnQge2NvbWJpbmVSZWR1Y2Vyc30gZnJvbSAncmVkdXgnO1xuXG5pbXBvcnQgU0VBUkNIX0NSSVRFUklBX09QRCBmcm9tICcuL29wZC9zZWFyY2hDcml0ZXJpYS5qcydcbmltcG9ydCBTRUFSQ0hfQ1JJVEVSSUFfTEFCUyBmcm9tICcuL2RpYWdub3Npcy9zZWFyY2hDcml0ZXJpYS5qcydcbmltcG9ydCBET0NUT1JTIGZyb20gJy4vb3BkL2RvY3RvcnMuanMnXG5pbXBvcnQgRE9DVE9SX1NFQVJDSCBmcm9tICcuL29wZC9kb2N0b3JTZWFyY2guanMnXG5pbXBvcnQgTEFCUyBmcm9tICcuL2RpYWdub3Npcy9sYWJzLmpzJ1xuaW1wb3J0IExBQl9TRUFSQ0ggZnJvbSAnLi9kaWFnbm9zaXMvbGFic1NlYXJjaC5qcydcbmltcG9ydCBVU0VSIGZyb20gJy4vY29tbW9ucy91c2VyLmpzJ1xuaW1wb3J0IEFVVEggZnJvbSAnLi9jb21tb25zL2F1dGguanMnXG5cbmNvbnN0IGFsbFJlZHVjZXJzID0gY29tYmluZVJlZHVjZXJzKHtcbiAgICBTRUFSQ0hfQ1JJVEVSSUFfT1BELFxuICAgIFNFQVJDSF9DUklURVJJQV9MQUJTLFxuICAgIERPQ1RPUlMsXG4gICAgRE9DVE9SX1NFQVJDSCxcbiAgICBMQUJTLFxuICAgIExBQl9TRUFSQ0gsXG4gICAgVVNFUixcbiAgICBBVVRIXG59KTtcblxuZXhwb3J0IGRlZmF1bHQgYWxsUmVkdWNlcnNcbiIsImltcG9ydCB7IERPQ1RPUl9TRUFSQ0gsIERPQ1RPUl9TRUFSQ0hfU1RBUlQgfSBmcm9tICcuLi8uLi9jb25zdGFudHMvdHlwZXMnO1xuXG5jb25zdCBkZWZhdWx0U3RhdGUgPSB7XG4gICAgZG9jdG9yTGlzdDogW10sXG4gICAgTE9BREVEX0RPQ1RPUl9TRUFSQ0g6IGZhbHNlXG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChzdGF0ZSA9IGRlZmF1bHRTdGF0ZSwgYWN0aW9uKSB7XG5cbiAgICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG5cbiAgICAgICAgY2FzZSBET0NUT1JfU0VBUkNIX1NUQVJUOiB7XG4gICAgICAgICAgICBsZXQgbmV3U3RhdGUgPSB7IC4uLnN0YXRlIH1cblxuICAgICAgICAgICAgbmV3U3RhdGUuTE9BREVEX0RPQ1RPUl9TRUFSQ0ggPSBmYWxzZVxuXG4gICAgICAgICAgICByZXR1cm4gbmV3U3RhdGVcbiAgICAgICAgfVxuXG4gICAgICAgIGNhc2UgRE9DVE9SX1NFQVJDSDoge1xuICAgICAgICAgICAgbGV0IG5ld1N0YXRlID0geyAuLi5zdGF0ZSB9XG5cbiAgICAgICAgICAgIG5ld1N0YXRlLmRvY3Rvckxpc3QgPSBhY3Rpb24ucGF5bG9hZC5tYXAoZG9jID0+IGRvYy5pZClcbiAgICAgICAgICAgIG5ld1N0YXRlLkxPQURFRF9ET0NUT1JfU0VBUkNIID0gdHJ1ZVxuXG4gICAgICAgICAgICByZXR1cm4gbmV3U3RhdGVcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgcmV0dXJuIHN0YXRlXG59IiwiaW1wb3J0IHsgQVBQRU5EX0RPQ1RPUlMgfSBmcm9tICcuLi8uLi9jb25zdGFudHMvdHlwZXMnO1xuXG5jb25zdCBkZWZhdWx0U3RhdGUgPSB7XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHN0YXRlID0gZGVmYXVsdFN0YXRlLCBhY3Rpb24pIHtcblxuICAgIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICAgICAgY2FzZSBBUFBFTkRfRE9DVE9SUzoge1xuICAgICAgICAgICAgbGV0IG5ld1N0YXRlID0geyAuLi5zdGF0ZSB9XG5cbiAgICAgICAgICAgIHJldHVybiBhY3Rpb24ucGF5bG9hZC5yZWR1Y2UoKGRvY3Rvck1hcCwgZG9jdG9yKSA9PiB7XG4gICAgICAgICAgICAgICAgZG9jdG9yTWFwW2RvY3Rvci5pZF0gPSBkb2N0b3JcbiAgICAgICAgICAgICAgICByZXR1cm4gZG9jdG9yTWFwXG4gICAgICAgICAgICB9LG5ld1N0YXRlKVxuXG4gICAgICAgIH1cblxuICAgIH1cbiAgICByZXR1cm4gc3RhdGVcbn0iLCJpbXBvcnQgeyBTRUxFQ1RfTE9DQVRJT05fT1BELCBNRVJHRV9TRUFSQ0hfU1RBVEVfT1BELCBUT0dHTEVfT1BEX0NSSVRFUklBLCBMT0FEX1NFQVJDSF9DUklURVJJQV9PUEQgfSBmcm9tICcuLi8uLi9jb25zdGFudHMvdHlwZXMnO1xuXG5jb25zdCBkZWZhdWx0U3RhdGUgPSB7XG4gICAgTE9BREVEX1NFQVJDSF9DUklURVJJQV9PUEQ6IGZhbHNlLFxuICAgIHNwZWNpYWxpemF0aW9uczogW10sXG4gICAgY29uZGl0aW9uczogW10sXG4gICAgc2VsZWN0ZWRDcml0ZXJpYXM6IFtdLFxuICAgIHNlbGVjdGVkTG9jYXRpb246IG51bGwsXG4gICAgZmlsdGVyQ3JpdGVyaWE6IHtcbiAgICAgICAgcHJpY2VSYW5nZTogWzEwMCwgMTUwMF0sXG4gICAgICAgIHNvcnRfb246IG51bGwsXG4gICAgICAgIHNpdHNfYXRfY2xpbmljOiBmYWxzZSxcbiAgICAgICAgc2l0c19hdF9ob3NwaXRhbDogZmFsc2UsXG4gICAgICAgIGlzX2ZlbWFsZTogZmFsc2UsXG4gICAgICAgIGlzX2F2YWlsYWJsZTogZmFsc2VcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChzdGF0ZSA9IGRlZmF1bHRTdGF0ZSwgYWN0aW9uKSB7XG5cbiAgICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgICAgIGNhc2UgTE9BRF9TRUFSQ0hfQ1JJVEVSSUFfT1BEOiB7XG4gICAgICAgICAgICBsZXQgbmV3U3RhdGUgPSB7IC4uLnN0YXRlIH1cbiAgICAgICAgICAgIGlmIChhY3Rpb24ucGF5bG9hZCkge1xuICAgICAgICAgICAgICAgIG5ld1N0YXRlID0geyAuLi5uZXdTdGF0ZSwgLi4uYWN0aW9uLnBheWxvYWQgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbmV3U3RhdGUuTE9BREVEX1NFQVJDSF9DUklURVJJQV9PUEQgPSB0cnVlXG4gICAgICAgICAgICByZXR1cm4gbmV3U3RhdGVcbiAgICAgICAgfVxuXG4gICAgICAgIGNhc2UgVE9HR0xFX09QRF9DUklURVJJQToge1xuICAgICAgICAgICAgbGV0IG5ld1N0YXRlID0ge1xuICAgICAgICAgICAgICAgIC4uLnN0YXRlLFxuICAgICAgICAgICAgICAgIHNlbGVjdGVkQ3JpdGVyaWFzOiBbXS5jb25jYXQoc3RhdGUuc2VsZWN0ZWRDcml0ZXJpYXMpXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxldCBmb3VuZCA9IGZhbHNlXG4gICAgICAgICAgICBuZXdTdGF0ZS5zZWxlY3RlZENyaXRlcmlhcyA9IG5ld1N0YXRlLnNlbGVjdGVkQ3JpdGVyaWFzLmZpbHRlcigoY3VycikgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChjdXJyLmlkID09IGFjdGlvbi5wYXlsb2FkLmNyaXRlcmlhLmlkICYmIGN1cnIudHlwZSA9PSBhY3Rpb24ucGF5bG9hZC50eXBlKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvdW5kID0gdHJ1ZVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgIGlmICghZm91bmQpIHtcbiAgICAgICAgICAgICAgICBuZXdTdGF0ZS5zZWxlY3RlZENyaXRlcmlhcy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgLi4uYWN0aW9uLnBheWxvYWQuY3JpdGVyaWEsXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IGFjdGlvbi5wYXlsb2FkLnR5cGVcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gbmV3U3RhdGVcbiAgICAgICAgfVxuXG4gICAgICAgIGNhc2UgU0VMRUNUX0xPQ0FUSU9OX09QRDoge1xuICAgICAgICAgICAgbGV0IG5ld1N0YXRlID0geyAuLi5zdGF0ZSB9XG5cbiAgICAgICAgICAgIG5ld1N0YXRlLnNlbGVjdGVkTG9jYXRpb24gPSBhY3Rpb24ucGF5bG9hZFxuICAgICAgICAgICAgcmV0dXJuIG5ld1N0YXRlXG4gICAgICAgIH1cblxuICAgICAgICBjYXNlIE1FUkdFX1NFQVJDSF9TVEFURV9PUEQ6IHtcbiAgICAgICAgICAgIGxldCBuZXdTdGF0ZSA9IHsgLi4uc3RhdGUsIC4uLmFjdGlvbi5wYXlsb2FkLnNlYXJjaFN0YXRlLCBmaWx0ZXJDcml0ZXJpYTogYWN0aW9uLnBheWxvYWQuZmlsdGVyQ3JpdGVyaWEgfVxuXG4gICAgICAgICAgICByZXR1cm4gbmV3U3RhdGVcbiAgICAgICAgfVxuXG4gICAgfVxuICAgIHJldHVybiBzdGF0ZVxufVxuXG5cblxuXG5cbiIsImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBCcm93c2VyUm91dGVyLCBTd2l0Y2gsIFJvdXRlIH0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSdcblxuaW1wb3J0IHsgVHJhbnNpdGlvbkdyb3VwLCBDU1NUcmFuc2l0aW9uIH0gZnJvbSBcInJlYWN0LXRyYW5zaXRpb24tZ3JvdXBcIjtcblxuaW1wb3J0IFNlYXJjaENyaXRlcmlhIGZyb20gJy4vY29udGFpbmVycy9vcGQvU2VhcmNoQ3JpdGVyaWEuanMnXG5pbXBvcnQgTG9jYXRpb25TZWFyY2ggZnJvbSAnLi9jb250YWluZXJzL29wZC9Mb2NhdGlvblNlYXJjaC5qcydcbmltcG9ydCBTZWFyY2hSZXN1bHRzIGZyb20gJy4vY29udGFpbmVycy9vcGQvU2VhcmNoUmVzdWx0cy5qcydcbmltcG9ydCBTZWFyY2hSZXN1bHRzRmlsdGVyIGZyb20gJy4vY29udGFpbmVycy9vcGQvU2VhcmNoUmVzdWx0c0ZpbHRlci5qcydcbmltcG9ydCBEb2N0b3JQcm9maWxlIGZyb20gJy4vY29udGFpbmVycy9vcGQvRG9jdG9yUHJvZmlsZS5qcydcbmltcG9ydCBDbGluaWNMaXN0IGZyb20gJy4vY29udGFpbmVycy9vcGQvQ2xpbmljTGlzdC5qcydcbmltcG9ydCBBcHBvaW50bWVudFNsb3QgZnJvbSAnLi9jb250YWluZXJzL29wZC9BcHBvaW50bWVudFNsb3QuanMnXG5pbXBvcnQgUGF0aWVudERldGFpbHMgZnJvbSAnLi9jb250YWluZXJzL29wZC9QYXRpZW50RGV0YWlscy5qcydcblxuaW1wb3J0IFVzZXJQcm9maWxlIGZyb20gJy4vY29udGFpbmVycy9jb21tb25zL1VzZXJQcm9maWxlLmpzJ1xuaW1wb3J0IFVzZXJBcHBvaW50bWVudHMgZnJvbSAnLi9jb250YWluZXJzL2NvbW1vbnMvVXNlckFwcG9pbnRtZW50cy5qcydcbmltcG9ydCBVc2VyUmVwb3J0cyBmcm9tICcuL2NvbnRhaW5lcnMvY29tbW9ucy9Vc2VyUmVwb3J0cy5qcydcbmltcG9ydCBVc2VyU2lnbnVwIGZyb20gJy4vY29udGFpbmVycy9jb21tb25zL1VzZXJTaWdudXAnXG5cbmltcG9ydCBQYXltZW50IGZyb20gJy4vY29udGFpbmVycy9vcGQvUGF5bWVudC5qcydcbmltcG9ydCBCb29raW5nIGZyb20gJy4vY29udGFpbmVycy9vcGQvQm9va2luZy5qcydcbmltcG9ydCBDcml0ZXJpYVNlYXJjaCBmcm9tICcuL2NvbnRhaW5lcnMvb3BkL0NyaXRlcmlhU2VhcmNoLmpzJ1xuaW1wb3J0IERYX1NlYXJjaENyaXRlcmlhIGZyb20gJy4vY29udGFpbmVycy9kaWFnbm9zaXMvU2VhcmNoQ3JpdGVyaWEuanMnXG5pbXBvcnQgRFhfU2VhcmNoUmVzdWx0cyBmcm9tICcuL2NvbnRhaW5lcnMvZGlhZ25vc2lzL1NlYXJjaFJlc3VsdHMuanMnXG5pbXBvcnQgTGFiIGZyb20gJy4vY29udGFpbmVycy9kaWFnbm9zaXMvTGFiLmpzJ1xuaW1wb3J0IERYX1BhdGllbnREZXRhaWxzIGZyb20gJy4vY29udGFpbmVycy9kaWFnbm9zaXMvUGF0aWVudERldGFpbHMuanMnXG5pbXBvcnQgRFhfQm9va2luZ1N1bW1hcnkgZnJvbSAnLi9jb250YWluZXJzL2RpYWdub3Npcy9Cb29raW5nU3VtbWFyeS5qcydcbmltcG9ydCBEb2N0b3JDaGF0IGZyb20gJy4vY29udGFpbmVycy9jb21tb25zL0NoYXQuanMnXG5pbXBvcnQgVGVzdFNlbGVjdG9yIGZyb20gJy4vY29udGFpbmVycy9kaWFnbm9zaXMvVGVzdFNlbGVjdG9yJ1xuXG5pbXBvcnQgVXNlckxvZ2luIGZyb20gJy4vY29udGFpbmVycy9jb21tb25zL1VzZXJMb2dpbidcbi8vIGltcG9ydCBPdHBWZXJpZnkgZnJvbSAnLi9jb250YWluZXJzL2NvbW1vbnMvT3RwVmVyaWZ5J1xuXG5pbXBvcnQgSG9tZSBmcm9tICcuL2NvbnRhaW5lcnMvY29tbW9ucy9Ib21lJ1xuXG5jb25zdCByb3V0ZXMgPSBbXG5cbiAgICB7IHBhdGg6ICcvJywgZXhhY3Q6IHRydWUsIGNvbXBvbmVudDogSG9tZSB9LFxuXG4gICAgeyBwYXRoOiAnL29wZCcsIGV4YWN0OiB0cnVlLCBjb21wb25lbnQ6IFNlYXJjaENyaXRlcmlhIH0sXG4gICAgeyBwYXRoOiAnL2xvY2F0aW9uc2VhcmNoJywgZXhhY3Q6IHRydWUsIGNvbXBvbmVudDogTG9jYXRpb25TZWFyY2ggfSxcbiAgICB7IHBhdGg6ICcvb3BkL3NlYXJjaHJlc3VsdHMnLCBleGFjdDogdHJ1ZSwgY29tcG9uZW50OiBTZWFyY2hSZXN1bHRzIH0sXG4gICAgeyBwYXRoOiAnL29wZC9kb2N0b3IvOmlkJywgZXhhY3Q6IHRydWUsIGNvbXBvbmVudDogRG9jdG9yUHJvZmlsZSB9LFxuICAgIHsgcGF0aDogJy9vcGQvZG9jdG9yLzppZC86Y2xpbmljSWQvYm9vaycsIGV4YWN0OiB0cnVlLCBjb21wb25lbnQ6IEFwcG9pbnRtZW50U2xvdCB9LFxuXG4gICAgeyBwYXRoOiAnL29wZC9kb2N0b3IvOmlkL2F2YWlsYWJpbGl0eScsIGV4YWN0OiB0cnVlLCBjb21wb25lbnQ6IENsaW5pY0xpc3QgfSxcbiAgICB7IHBhdGg6ICcvZG9jdG9ycHJvZmlsZS86aWQvOmNsaW5pY0lkL2Jvb2tkZXRhaWxzJywgZXhhY3Q6IHRydWUsIGNvbXBvbmVudDogUGF0aWVudERldGFpbHMgfSxcbiAgICBcbiAgICBcbiAgICB7IHBhdGg6ICcvdXNlcicsIGV4YWN0OiB0cnVlLCBjb21wb25lbnQ6IFVzZXJQcm9maWxlIH0sXG4gICAgeyBwYXRoOiAnL3VzZXIvOmlkJywgZXhhY3Q6IHRydWUsIGNvbXBvbmVudDogVXNlclByb2ZpbGUgfSxcbiAgICB7IHBhdGg6ICcvdXNlci86aWQvYXBwb2ludG1lbnRzJywgZXhhY3Q6IHRydWUsIGNvbXBvbmVudDogVXNlckFwcG9pbnRtZW50cyB9LFxuICAgIHsgcGF0aDogJy91c2VyLzppZC9yZXBvcnRzJywgZXhhY3Q6IHRydWUsIGNvbXBvbmVudDogVXNlclJlcG9ydHMgfSxcbiAgICB7IHBhdGg6ICcvY2hhdCcsIGV4YWN0OiB0cnVlLCBjb21wb25lbnQ6IERvY3RvckNoYXQgfSxcbiAgICB7IHBhdGg6ICcvcGF5bWVudCcsIGV4YWN0OiB0cnVlLCBjb21wb25lbnQ6IFBheW1lbnQgfSxcbiAgICB7IHBhdGg6ICcvYm9va2luZy86cmVmSWQnLCBleGFjdDogdHJ1ZSwgY29tcG9uZW50OiBCb29raW5nIH0sXG5cbiAgICB7IHBhdGg6ICcvbG9naW4nLCBleGFjdDogdHJ1ZSwgY29tcG9uZW50OiBVc2VyTG9naW4gfSxcbiAgICB7IHBhdGg6ICcvc2lnbnVwJywgZXhhY3Q6IHRydWUsIGNvbXBvbmVudDogVXNlclNpZ251cCB9LFxuXG4gICAgeyBwYXRoOiAnL2R4JywgZXhhY3Q6IHRydWUsIGNvbXBvbmVudDogRFhfU2VhcmNoQ3JpdGVyaWEgfSxcbiAgICB7IHBhdGg6ICcvZHgvc2VhcmNocmVzdWx0cycsIGV4YWN0OiB0cnVlLCBjb21wb25lbnQ6IERYX1NlYXJjaFJlc3VsdHMgfSxcbiAgICB7IHBhdGg6ICcvbGFiLzppZCcsIGV4YWN0OiB0cnVlLCBjb21wb25lbnQ6IExhYiB9LFxuICAgIHsgcGF0aDogJy9sYWIvOmlkL3Rlc3RzJywgZXhhY3Q6IHRydWUsIGNvbXBvbmVudDogVGVzdFNlbGVjdG9yIH0sXG4gICAgeyBwYXRoOiAnL2xhYi86aWQvYm9vaycsIGV4YWN0OiB0cnVlLCBjb21wb25lbnQ6IERYX0Jvb2tpbmdTdW1tYXJ5IH0sXG5cbiAgICB7IHBhdGg6ICcvbGFiL2Jvb2tpbmcvc3VtbWFyeS86aWQnLCBleGFjdDogdHJ1ZSwgY29tcG9uZW50OiBEWF9Cb29raW5nU3VtbWFyeSB9LFxuXG5dXG5cbmNsYXNzIFJvdXRlckNvbmZpZyBleHRlbmRzIENvbXBvbmVudCB7XG5cbiAgICBzdGF0aWMgUk9VVEVTID0gcm91dGVzXG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIDxSb3V0ZVxuICAgICAgICAgICAgICAgICAgICByZW5kZXI9e1xuICAgICAgICAgICAgICAgICAgICAgICAgKHsgbG9jYXRpb24gfSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxUcmFuc2l0aW9uR3JvdXA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Q1NTVHJhbnNpdGlvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleT17bG9jYXRpb24ucGF0aG5hbWV9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lcz1cImZhZGVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpbWVvdXQ9e3sgZW50ZXI6IDMwMCwgZXhpdDogMCB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV4aXQ9e2ZhbHNlfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxTd2l0Y2ggbG9jYXRpb249e2xvY2F0aW9ufT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3JvdXRlcy5tYXAoKHJvdXRlLCBpKSA9PiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Um91dGUgey4uLnJvdXRlfSBrZXk9e2l9IC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvU3dpdGNoPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9DU1NUcmFuc2l0aW9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L1RyYW5zaXRpb25Hcm91cD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvPlxuXG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKVxuICAgIH1cblxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IFJvdXRlckNvbmZpZ1xuXG4iLCJcbmNvbnN0IGRheXMgPSBbJ1N1bmRheScsICdNb25kYXknLCAnVHVlc2RheScsICdXZWRuZXNkYXknLCAnVGh1cnNkYXknLCAnRnJpZGF5JywgJ1NhdHVyZGF5J107XG5cbmV4cG9ydCBjb25zdCBnZXRUaW1lID0gKHRpbWVTdGFtcCkgPT4ge1xuICAgIHZhciBkYXRlID0gbmV3IERhdGUodGltZVN0YW1wKTtcbiAgICB2YXIgaG91cnMgPSBkYXRlLmdldEhvdXJzKCk7XG4gICAgdmFyIG1pbnV0ZXMgPSBcIjBcIiArIGRhdGUuZ2V0TWludXRlcygpO1xuICAgIHJldHVybiBob3VycyArICc6JyArIG1pbnV0ZXMuc3Vic3RyKC0yKVxufVxuZXhwb3J0IGNvbnN0IGdldERheU5hbWUgPSAodGltZVN0YW1wKSA9PiB7XG4gICAgcmV0dXJuIGRheXNbbmV3IERhdGUodGltZVN0YW1wKS5nZXREYXkoKV1cblxufSIsInByb2Nlc3MuZW52Lk5PREVfVExTX1JFSkVDVF9VTkFVVEhPUklaRUQgPSBcIjBcIlxuXG5jb25zdCBwYXRoID0gcmVxdWlyZSgncGF0aCcpO1xuY29uc3QgaHR0cCA9IHJlcXVpcmUoJ2h0dHAnKTtcbmNvbnN0IEV4cHJlc3MgPSByZXF1aXJlKCdleHByZXNzJyk7XG5jb25zdCBhcHAgPSBuZXcgRXhwcmVzcygpO1xuY29uc3Qgc2VydmVyID0gbmV3IGh0dHAuU2VydmVyKGFwcCk7XG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcbmltcG9ydCBSZWFjdERPTVNlcnZlciBmcm9tICdyZWFjdC1kb20vc2VydmVyJ1xuaW1wb3J0IHsgU3RhdGljUm91dGVyIH0gZnJvbSAncmVhY3Qtcm91dGVyJ1xuaW1wb3J0IFJvdXRlcyBmcm9tICcuL2Rldi9qcy9yb3V0ZXMuanMnXG5pbXBvcnQgeyBNdWlUaGVtZVByb3ZpZGVyLCBjcmVhdGVNdWlUaGVtZSwgY3JlYXRlR2VuZXJhdGVDbGFzc05hbWUgfSBmcm9tICdtYXRlcmlhbC11aS9zdHlsZXMnO1xuaW1wb3J0IHsgU2hlZXRzUmVnaXN0cnkgfSBmcm9tICdyZWFjdC1qc3MvbGliL2pzcyc7XG5cbmltcG9ydCBKc3NQcm92aWRlciBmcm9tICdyZWFjdC1qc3MvbGliL0pzc1Byb3ZpZGVyJztcbmltcG9ydCB7IFByb3ZpZGVyIH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IHsgY3JlYXRlU3RvcmUsIGFwcGx5TWlkZGxld2FyZSB9IGZyb20gJ3JlZHV4JztcbmltcG9ydCB0aHVuayBmcm9tICdyZWR1eC10aHVuayc7XG5pbXBvcnQgeyBjcmVhdGVMb2dnZXIgfSBmcm9tICdyZWR1eC1sb2dnZXInXG5pbXBvcnQgYWxsUmVkdWNlcnMgZnJvbSAnLi9kZXYvanMvcmVkdWNlcnMvaW5kZXguanMnO1xuaW1wb3J0IHsgbWF0Y2hQYXRoIH0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSdcblxuXG5hcHAudXNlKCcvYXNzZXRzJywgRXhwcmVzcy5zdGF0aWMocGF0aC5qb2luKF9fZGlybmFtZSwgJ2Fzc2V0cycpKSk7XG5hcHAudXNlKCcvZGlzdCcsIEV4cHJlc3Muc3RhdGljKHBhdGguam9pbihfX2Rpcm5hbWUsICdkaXN0JykpKTtcblxuXG5hcHAuZ2V0KCcqJywgZnVuY3Rpb24gKHJlcSwgcmVzKSB7XG5cbiAgICBjb25zdCBjb250ZXh0ID0ge31cblxuICAgIGNvbnN0IHN0b3JlID0gY3JlYXRlU3RvcmUoXG4gICAgICAgIGFsbFJlZHVjZXJzLCBhcHBseU1pZGRsZXdhcmUodGh1bmspXG4gICAgKTtcblxuICAgIGNvbnN0IHNoZWV0c1JlZ2lzdHJ5ID0gbmV3IFNoZWV0c1JlZ2lzdHJ5KCk7XG4gICAgY29uc3QgdGhlbWUgPSBjcmVhdGVNdWlUaGVtZSh7XG4gICAgICAgIHBhbGV0dGU6IHtcbiAgICAgICAgICAgIHByaW1hcnk6IHtcbiAgICAgICAgICAgICAgICBtYWluOiAnIzAwYjdiMCdcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZWNvbmRhcnk6IHtcbiAgICAgICAgICAgICAgICBtYWluOiAnIzAwYjdiMCdcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIHN0YXR1czoge1xuICAgICAgICAgICAgZGFuZ2VyOiAnb3JhbmdlJyxcbiAgICAgICAgfSxcbiAgICB9KVxuICAgIGNvbnN0IGdlbmVyYXRlQ2xhc3NOYW1lID0gY3JlYXRlR2VuZXJhdGVDbGFzc05hbWUoKTtcblxuICAgIGlmIChjb250ZXh0LnVybCkge1xuICAgICAgICByZXMud3JpdGVIZWFkKDMwMSwge1xuICAgICAgICAgICAgTG9jYXRpb246IGNvbnRleHQudXJsXG4gICAgICAgIH0pXG4gICAgICAgIHJlcy5lbmQoKVxuICAgIH0gZWxzZSB7XG5cbiAgICAgICAgLy8gaW5zaWRlIGEgcmVxdWVzdFxuICAgICAgICBjb25zdCBwcm9taXNlcyA9IFtdXG5cbiAgICAgICAgUm91dGVzLlJPVVRFUy5zb21lKHJvdXRlID0+IHtcbiAgICAgICAgICAgIC8vIHVzZSBgbWF0Y2hQYXRoYCBoZXJlXG4gICAgICAgICAgICBjb25zdCBtYXRjaCA9IG1hdGNoUGF0aChyZXEucGF0aCwgcm91dGUpXG4gICAgICAgICAgICBpZiAobWF0Y2ggJiYgcm91dGUuY29tcG9uZW50LmxvYWREYXRhKVxuICAgICAgICAgICAgICAgIHByb21pc2VzLnB1c2gocm91dGUuY29tcG9uZW50LmxvYWREYXRhKHN0b3JlLCBtYXRjaCkpXG4gICAgICAgICAgICByZXR1cm4gbWF0Y2hcbiAgICAgICAgfSlcblxuICAgICAgICBQcm9taXNlLmFsbChwcm9taXNlcykudGhlbihkYXRhID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHN0b3JlRGF0YSA9IEpTT04uc3RyaW5naWZ5KHN0b3JlLmdldFN0YXRlKCkpXG4gICAgICAgICAgICBjb25zdCBodG1sID0gUmVhY3RET01TZXJ2ZXIucmVuZGVyVG9TdHJpbmcoXG4gICAgICAgICAgICAgICAgPFByb3ZpZGVyIHN0b3JlPXtzdG9yZX0+XG4gICAgICAgICAgICAgICAgICAgIDxKc3NQcm92aWRlciByZWdpc3RyeT17c2hlZXRzUmVnaXN0cnl9IGdlbmVyYXRlQ2xhc3NOYW1lPXtnZW5lcmF0ZUNsYXNzTmFtZX0+XG4gICAgICAgICAgICAgICAgICAgICAgICA8TXVpVGhlbWVQcm92aWRlciB0aGVtZT17dGhlbWV9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxTdGF0aWNSb3V0ZXJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9jYXRpb249e3JlcS51cmx9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQ9e2NvbnRleHR9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Um91dGVzIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9TdGF0aWNSb3V0ZXI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L011aVRoZW1lUHJvdmlkZXI+XG4gICAgICAgICAgICAgICAgICAgIDwvSnNzUHJvdmlkZXI+XG4gICAgICAgICAgICAgICAgPC9Qcm92aWRlcj5cbiAgICAgICAgICAgIClcbiAgICAgICAgICAgIGNvbnN0IGNzcyA9IHNoZWV0c1JlZ2lzdHJ5LnRvU3RyaW5nKClcblxuICAgICAgICAgICAgcmVzLnJlbmRlcignLi9pbmRleC50ZW1wbGF0ZS5lanMnLCB7XG4gICAgICAgICAgICAgICAgaHRtbCwgY3NzLCBzdG9yZURhdGFcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pXG5cbiAgICB9XG5cbn0pO1xuXG5cbmFwcC51c2UoZnVuY3Rpb24gKHJlcSwgcmVzKSB7XG4gICAgcmVzLnNlbmRGaWxlKCdpbmRleC5odG1sJywgeyByb290OiAnLi9kaXN0LycgfSlcbn0pXG5cbnNlcnZlci5saXN0ZW4oMzAwMCwgKGVycikgPT4ge1xuICAgIGlmIChlcnIpIHtcbiAgICAgICAgcmV0dXJuIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICB9XG4gICAgY29uc29sZS5pbmZvKCdTZXJ2ZXIgcnVubmluZyBvbiBodHRwOi8vbG9jYWxob3N0OjMwMDAnKTtcbn0pOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImF4aW9zXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImV4cHJlc3NcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiaHR0cFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJtYXRlcmlhbC11aS1pY29ucy9BY2NvdW50Q2lyY2xlXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm1hdGVyaWFsLXVpLWljb25zL0F0dGFjaE1vbmV5XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm1hdGVyaWFsLXVpLWljb25zL0NhbGxcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibWF0ZXJpYWwtdWktaWNvbnMvRXhwYW5kTW9yZVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJtYXRlcmlhbC11aS1pY29ucy9LZXlib2FyZEFycm93UmlnaHRcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibWF0ZXJpYWwtdWktaWNvbnMvUGF5bWVudFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJtYXRlcmlhbC11aS9DaGVja2JveFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJtYXRlcmlhbC11aS9DaGlwXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm1hdGVyaWFsLXVpL0V4cGFuc2lvblBhbmVsXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm1hdGVyaWFsLXVpL0Zvcm1cIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibWF0ZXJpYWwtdWkvTWVudVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJtYXRlcmlhbC11aS9Qcm9ncmVzc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJtYXRlcmlhbC11aS9SYWRpb1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJtYXRlcmlhbC11aS9TdGVwcGVyXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm1hdGVyaWFsLXVpL3N0eWxlc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJwYXRoXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJjLXNsaWRlci9saWIvUmFuZ2VcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhY3RcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhY3QtZG9tL3NlcnZlclwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdC1qc3MvbGliL0pzc1Byb3ZpZGVyXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0LWpzcy9saWIvanNzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0LXJlZHV4XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0LXJvdXRlclwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdC1yb3V0ZXItZG9tXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0LXRyYW5zaXRpb24tZ3JvdXBcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVkdXhcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVkdXgtbG9nZ2VyXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlZHV4LXRodW5rXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInVuaXZlcnNhbC1jb29raWVcIik7Il0sInNvdXJjZVJvb3QiOiIifQ==