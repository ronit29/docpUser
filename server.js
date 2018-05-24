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

var _Home = __webpack_require__(/*! ./containers/commons/Home */ "./dev/js/containers/commons/Home.js");

var _Home2 = _interopRequireDefault(_Home);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const routes = [{ path: '/', exact: true, component: _Home2.default }, { path: '/opd', exact: true, component: _SearchCriteria2.default }, { path: '/locationsearch', exact: true, component: _LocationSearch2.default }, { path: '/opd/searchresults', exact: true, component: _SearchResults2.default }, { path: '/opd/doctor/:id', exact: true, component: _DoctorProfile2.default }, { path: '/opd/doctor/:id/:clinicId/book', exact: true, component: _AppointmentSlot2.default }, { path: '/opd/doctor/:id/availability', exact: true, component: _ClinicList2.default }, { path: '/doctorprofile/:id/:clinicId/bookdetails', exact: true, component: _PatientDetails2.default }, { path: '/user/signup', exact: true, component: _UserSignup2.default }, { path: '/user', exact: true, component: _UserProfile2.default }, { path: '/user/:id', exact: true, component: _UserProfile2.default }, { path: '/user/:id/appointments', exact: true, component: _UserAppointments2.default }, { path: '/user/:id/reports', exact: true, component: _UserReports2.default }, { path: '/chat', exact: true, component: _Chat2.default }, { path: '/payment', exact: true, component: _Payment2.default }, { path: '/booking/:refId', exact: true, component: _Booking2.default }, { path: '/login', exact: true, component: _UserLogin2.default }, { path: '/otp/verify', exact: true, component: _OtpVerify2.default }, { path: '/dx', exact: true, component: _SearchCriteria4.default }, { path: '/dx/searchresults', exact: true, component: _SearchResults4.default }, { path: '/lab/:id', exact: true, component: _Lab2.default }, { path: '/lab/:id/tests', exact: true, component: _TestSelector2.default }, { path: '/lab/:id/book', exact: true, component: _BookingSummary2.default }, { path: '/lab/booking/summary/:id', exact: true, component: _BookingSummary2.default }];

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2FjdGlvbnMvY29tbW9ucy9hdXRoLmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9hY3Rpb25zL2NvbW1vbnMvdXNlci5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvYWN0aW9ucy9kaWFnbm9zaXMvbGFiU2VhcmNoLmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9hY3Rpb25zL2RpYWdub3Npcy9zZWFyY2hDcml0ZXJpYS5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvYWN0aW9ucy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvYWN0aW9ucy9vcGQvZG9jdG9yU2VhcmNoLmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9hY3Rpb25zL29wZC9zZWFyY2hDcml0ZXJpYS5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvYXBpL2FwaS5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9jb21tb25zL0hvbWUvSG9tZVZpZXcuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvY29tbW9ucy9Ib21lL2luZGV4LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL2NvbW1vbnMvTG9hZGVyL0xvYWRlci5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9jb21tb25zL0xvYWRlci9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9jb21tb25zL1VzZXJMb2dpbi9Vc2VyTG9naW4uanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvY29tbW9ucy9Vc2VyTG9naW4vaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvY29tbW9ucy9jaGF0L0NoYXRWaWV3LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL2NvbW1vbnMvY2hhdC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9jb21tb25zL2NvbW1vbmx5U2VhcmNoZWQvQ29tbW9ubHlTZWFyY2hlZC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9jb21tb25zL2NvbW1vbmx5U2VhcmNoZWQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvY29tbW9ucy9jcml0ZXJpYVNlYXJjaC9Dcml0ZXJpYVNlYXJjaFZpZXcuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvY29tbW9ucy9jcml0ZXJpYVNlYXJjaC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9jb21tb25zL290cFZlcmlmeS9PdHBWZXJpZnkuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvY29tbW9ucy9vdHBWZXJpZnkvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvY29tbW9ucy9wcm9maWxlU2xpZGVyL1Byb2ZpbGVTbGlkZXIuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvY29tbW9ucy9wcm9maWxlU2xpZGVyL2luZGV4LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL2NvbW1vbnMvdGltZVNsb3RTZWxlY3Rvci9UaW1lU2xvdFNlbGVjdG9yLmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL2NvbW1vbnMvdGltZVNsb3RTZWxlY3Rvci9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9jb21tb25zL3VzZXJBcHBvaW50bWVudHMvVXNlckFwcG9pbnRtZW50c1ZpZXcuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvY29tbW9ucy91c2VyQXBwb2ludG1lbnRzL2FwcG9pbnRtZW50TGlzdC9BcHBvaW50bWVudExpc3QuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvY29tbW9ucy91c2VyQXBwb2ludG1lbnRzL2FwcG9pbnRtZW50TGlzdC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9jb21tb25zL3VzZXJBcHBvaW50bWVudHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvY29tbW9ucy91c2VyUHJvZmlsZS9Vc2VyUHJvZmlsZVZpZXcuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvY29tbW9ucy91c2VyUHJvZmlsZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9jb21tb25zL3VzZXJQcm9maWxlL3Byb2ZpbGVEYXRhL1Byb2ZpbGVEYXRhLmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL2NvbW1vbnMvdXNlclByb2ZpbGUvcHJvZmlsZURhdGEvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvY29tbW9ucy91c2VyUmVwb3J0cy9Vc2VyUmVwb3J0c1ZpZXcuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvY29tbW9ucy91c2VyUmVwb3J0cy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9jb21tb25zL3VzZXJSZXBvcnRzL3JlcG9ydExpc3QvUmVwb3J0TGlzdC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9jb21tb25zL3VzZXJSZXBvcnRzL3JlcG9ydExpc3QvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvY29tbW9ucy91c2VyU2lnbnVwL1VzZXJTaWdudXAuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvY29tbW9ucy91c2VyU2lnbnVwL2luZGV4LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL2RpYWdub3Npcy9ib29raW5nU3VtbWFyeS9Cb29raW5nU3VtbWFyeVZpZXcuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvZGlhZ25vc2lzL2Jvb2tpbmdTdW1tYXJ5L2Nob29zZVBhdGllbnQuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvZGlhZ25vc2lzL2Jvb2tpbmdTdW1tYXJ5L2luZGV4LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL2RpYWdub3Npcy9ib29raW5nU3VtbWFyeS9waWNrdXBBZGRyZXNzLmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL2RpYWdub3Npcy9ib29raW5nU3VtbWFyeS92aXNpdFRpbWUuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvZGlhZ25vc2lzL2NvbW1vbnMvbGFiRGV0YWlscy9MYWJEZXRhaWwuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvZGlhZ25vc2lzL2NvbW1vbnMvbGFiRGV0YWlscy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9kaWFnbm9zaXMvY29tbW9ucy9sYWJQcm9maWxlQ2FyZC9MYWJQcm9maWxlQ2FyZC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9kaWFnbm9zaXMvY29tbW9ucy9sYWJQcm9maWxlQ2FyZC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9kaWFnbm9zaXMvY29tbW9ucy9sYWJUZXN0cy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9kaWFnbm9zaXMvY29tbW9ucy9sYWJUZXN0cy9sYWJUZXN0cy5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9kaWFnbm9zaXMvY29tbW9ucy9vcmRlckRldGFpbHMvT3JkZXJEZXRhaWxzLmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL2RpYWdub3Npcy9jb21tb25zL29yZGVyRGV0YWlscy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9kaWFnbm9zaXMvbGFiL0xhYlZpZXcuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvZGlhZ25vc2lzL2xhYi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9kaWFnbm9zaXMvcGF0aWVudERldGFpbHMvUGF0aWVudERldGFpbHNWaWV3LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL2RpYWdub3Npcy9wYXRpZW50RGV0YWlscy9hZGRyZXNzRm9ybS9BZGRyZXNzRm9ybS5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9kaWFnbm9zaXMvcGF0aWVudERldGFpbHMvYWRkcmVzc0Zvcm0vaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvZGlhZ25vc2lzL3BhdGllbnREZXRhaWxzL2RldGFpbHNGb3JtL0RldGFpbHNGb3JtLmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL2RpYWdub3Npcy9wYXRpZW50RGV0YWlscy9kZXRhaWxzRm9ybS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9kaWFnbm9zaXMvcGF0aWVudERldGFpbHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvZGlhZ25vc2lzL3NlYXJjaENyaXRlcmlhL1NlYXJjaENyaXRlcmlhVmlldy5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9kaWFnbm9zaXMvc2VhcmNoQ3JpdGVyaWEvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvZGlhZ25vc2lzL3NlYXJjaFJlc3VsdHMvU2VhcmNoUmVzdWx0c1ZpZXcuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvZGlhZ25vc2lzL3NlYXJjaFJlc3VsdHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvZGlhZ25vc2lzL3NlYXJjaFJlc3VsdHMvbGFic0xpc3QvTGFic0xpc3QuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvZGlhZ25vc2lzL3NlYXJjaFJlc3VsdHMvbGFic0xpc3QvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvZGlhZ25vc2lzL3NlYXJjaFJlc3VsdHMvdG9wQmFyL1RvcEJhci5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9kaWFnbm9zaXMvc2VhcmNoUmVzdWx0cy90b3BCYXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvZGlhZ25vc2lzL3Rlc3RTZWxlY3Rvci9UZXN0U2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvZGlhZ25vc2lzL3Rlc3RTZWxlY3Rvci9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9vcGQvYXBwb2ludG1lbnRTbG90L0FwcG9pbnRtZW50U2xvdC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9vcGQvYXBwb2ludG1lbnRTbG90L2luZGV4LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL29wZC9ib29raW5nL0Jvb2tpbmdWaWV3LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL29wZC9jbGluaWNMaXN0L0NsaW5pY0xpc3RWaWV3LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL29wZC9jbGluaWNMaXN0L2luZGV4LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL29wZC9jb21tb25zL2NsaW5pY1NlbGVjdG9yL0NsaW5pY1NlbGVjdG9yLmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL29wZC9jb21tb25zL2NsaW5pY1NlbGVjdG9yL2luZGV4LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL29wZC9jb21tb25zL2RvY3RvclByb2ZpbGVDYXJkL0RvY3RvclByb2ZpbGVDYXJkLmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL29wZC9jb21tb25zL2RvY3RvclByb2ZpbGVDYXJkL2luZGV4LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL29wZC9jb21tb25zL3NlbGVjdGVkQ2xpbmljL1NlbGVjdGVkQ2xpbmljLmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL29wZC9jb21tb25zL3NlbGVjdGVkQ2xpbmljL2luZGV4LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL29wZC9jcml0ZXJpYVNlYXJjaC9Dcml0ZXJpYVNlYXJjaFZpZXcuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvb3BkL2NyaXRlcmlhU2VhcmNoL2luZGV4LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL29wZC9kb2N0b3JQcm9maWxlL0RvY3RvclByb2ZpbGVWaWV3LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL29wZC9kb2N0b3JQcm9maWxlL2Fib3V0RG9jdG9yL0Fib3V0RG9jdG9yLmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL29wZC9kb2N0b3JQcm9maWxlL2Fib3V0RG9jdG9yL2luZGV4LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL29wZC9kb2N0b3JQcm9maWxlL2RvY3RvclByb2ZpbGVDYXJkL0RvY3RvclByb2ZpbGVDYXJkLmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL29wZC9kb2N0b3JQcm9maWxlL2RvY3RvclByb2ZpbGVDYXJkL2luZGV4LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL29wZC9kb2N0b3JQcm9maWxlL2luZGV4LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL29wZC9kb2N0b3JQcm9maWxlL3Byb2Zlc3Npb25hbEdyYXBoL1Byb2Zlc3Npb25hbEdyYXBoLmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL29wZC9kb2N0b3JQcm9maWxlL3Byb2Zlc3Npb25hbEdyYXBoL2luZGV4LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL29wZC9sb2NhdGlvblNlYXJjaC9Mb2NhdGlvblNlYXJjaC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9vcGQvbG9jYXRpb25TZWFyY2gvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvb3BkL3BhdGllbnREZXRhaWxzL1BhdGllbnREZXRhaWxzLmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL29wZC9wYXRpZW50RGV0YWlscy9kZXRhaWxzRm9ybS9EZXRhaWxzRm9ybS5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9vcGQvcGF0aWVudERldGFpbHMvZGV0YWlsc0Zvcm0vaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvb3BkL3BhdGllbnREZXRhaWxzL2luZGV4LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL29wZC9wYXltZW50L1BheW1lbnRWaWV3LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL29wZC9zZWFyY2hDcml0ZXJpYS9TZWFyY2hDcml0ZXJpYVZpZXcuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvb3BkL3NlYXJjaENyaXRlcmlhL2luZGV4LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL29wZC9zZWFyY2hSZXN1bHRzL1NlYXJjaFJlc3VsdHNWaWV3LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL29wZC9zZWFyY2hSZXN1bHRzL2RvY3RvcnNMaXN0L0RvY3RvcnNMaXN0LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL29wZC9zZWFyY2hSZXN1bHRzL2RvY3RvcnNMaXN0L2luZGV4LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL29wZC9zZWFyY2hSZXN1bHRzL2luZGV4LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL29wZC9zZWFyY2hSZXN1bHRzL3RvcEJhci9Ub3BCYXIuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvb3BkL3NlYXJjaFJlc3VsdHMvdG9wQmFyL2luZGV4LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL29wZC9zZWFyY2hSZXN1bHRzRmlsdGVyL1NlYXJjaFJlc3VsdHNGaWx0ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvb3BkL3NlYXJjaFJlc3VsdHNGaWx0ZXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbnN0YW50cy90eXBlcy5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29udGFpbmVycy9jb21tb25zL0NoYXQuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbnRhaW5lcnMvY29tbW9ucy9Ib21lLmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb250YWluZXJzL2NvbW1vbnMvT3RwVmVyaWZ5LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb250YWluZXJzL2NvbW1vbnMvVXNlckFwcG9pbnRtZW50cy5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29udGFpbmVycy9jb21tb25zL1VzZXJMb2dpbi5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29udGFpbmVycy9jb21tb25zL1VzZXJQcm9maWxlLmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb250YWluZXJzL2NvbW1vbnMvVXNlclJlcG9ydHMuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbnRhaW5lcnMvY29tbW9ucy9Vc2VyU2lnbnVwLmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb250YWluZXJzL2RpYWdub3Npcy9Cb29raW5nU3VtbWFyeS5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29udGFpbmVycy9kaWFnbm9zaXMvTGFiLmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb250YWluZXJzL2RpYWdub3Npcy9QYXRpZW50RGV0YWlscy5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29udGFpbmVycy9kaWFnbm9zaXMvU2VhcmNoQ3JpdGVyaWEuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbnRhaW5lcnMvZGlhZ25vc2lzL1NlYXJjaFJlc3VsdHMuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbnRhaW5lcnMvZGlhZ25vc2lzL1Rlc3RTZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29udGFpbmVycy9vcGQvQXBwb2ludG1lbnRTbG90LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb250YWluZXJzL29wZC9Cb29raW5nLmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb250YWluZXJzL29wZC9DbGluaWNMaXN0LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb250YWluZXJzL29wZC9Dcml0ZXJpYVNlYXJjaC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29udGFpbmVycy9vcGQvRG9jdG9yUHJvZmlsZS5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29udGFpbmVycy9vcGQvTG9jYXRpb25TZWFyY2guanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbnRhaW5lcnMvb3BkL1BhdGllbnREZXRhaWxzLmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb250YWluZXJzL29wZC9QYXltZW50LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb250YWluZXJzL29wZC9TZWFyY2hDcml0ZXJpYS5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29udGFpbmVycy9vcGQvU2VhcmNoUmVzdWx0cy5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29udGFpbmVycy9vcGQvU2VhcmNoUmVzdWx0c0ZpbHRlci5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvaGVscGVycy9uYXZpZ2F0ZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvaGVscGVycy9uYXZpZ2F0ZS9uYXZpZ2F0ZS5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvaGVscGVycy9zdG9yYWdlL2luZGV4LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9oZWxwZXJzL3N0b3JhZ2Uvc3RvcmFnZS5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvcmVkdWNlcnMvY29tbW9ucy9hdXRoLmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9yZWR1Y2Vycy9jb21tb25zL3VzZXIuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL3JlZHVjZXJzL2RpYWdub3Npcy9sYWJzLmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9yZWR1Y2Vycy9kaWFnbm9zaXMvbGFic1NlYXJjaC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvcmVkdWNlcnMvZGlhZ25vc2lzL3NlYXJjaENyaXRlcmlhLmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9yZWR1Y2Vycy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvcmVkdWNlcnMvb3BkL2RvY3RvclNlYXJjaC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvcmVkdWNlcnMvb3BkL2RvY3RvcnMuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL3JlZHVjZXJzL29wZC9zZWFyY2hDcml0ZXJpYS5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvcm91dGVzLmpzIiwid2VicGFjazovLy8uL2Rldi9qcy91dGlscy9kYXRlVGltZVV0aWxzLmpzIiwid2VicGFjazovLy8uL2luZGV4LmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcImF4aW9zXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZXhwcmVzc1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcImh0dHBcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJtYXRlcmlhbC11aS1pY29ucy9BY2NvdW50Q2lyY2xlXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibWF0ZXJpYWwtdWktaWNvbnMvQXR0YWNoTW9uZXlcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJtYXRlcmlhbC11aS1pY29ucy9DYWxsXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibWF0ZXJpYWwtdWktaWNvbnMvRXhwYW5kTW9yZVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIm1hdGVyaWFsLXVpLWljb25zL0tleWJvYXJkQXJyb3dSaWdodFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIm1hdGVyaWFsLXVpLWljb25zL1BheW1lbnRcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJtYXRlcmlhbC11aS9DaGVja2JveFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIm1hdGVyaWFsLXVpL0NoaXBcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJtYXRlcmlhbC11aS9FeHBhbnNpb25QYW5lbFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIm1hdGVyaWFsLXVpL0Zvcm1cIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJtYXRlcmlhbC11aS9NZW51XCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibWF0ZXJpYWwtdWkvUHJvZ3Jlc3NcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJtYXRlcmlhbC11aS9SYWRpb1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcIm1hdGVyaWFsLXVpL1N0ZXBwZXJcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJtYXRlcmlhbC11aS9zdHlsZXNcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJwYXRoXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmMtc2xpZGVyL2xpYi9SYW5nZVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInJlYWN0XCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVhY3QtZG9tL3NlcnZlclwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInJlYWN0LWpzcy9saWIvSnNzUHJvdmlkZXJcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWFjdC1qc3MvbGliL2pzc1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcInJlYWN0LXJlZHV4XCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVhY3Qtcm91dGVyXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVhY3Qtcm91dGVyLWRvbVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInJlYWN0LXRyYW5zaXRpb24tZ3JvdXBcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWR1eFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInJlZHV4LWxvZ2dlclwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInJlZHV4LXRodW5rXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwidW5pdmVyc2FsLWNvb2tpZVwiIl0sIm5hbWVzIjpbInNlbmRPVFAiLCJudW1iZXIiLCJjYiIsImRpc3BhdGNoIiwidHlwZSIsInBheWxvYWQiLCJwaG9uZU51bWJlciIsInRoZW4iLCJyZXNwb25zZSIsImV4aXN0cyIsImNhdGNoIiwiZXJyb3IiLCJtZXNzYWdlIiwiZXJyb3JfbWVzc2FnZSIsInN1Ym1pdE9UUCIsIm90cCIsInNldEF1dGhUb2tlbiIsInRva2VuIiwiZ2V0VXNlclByb2ZpbGUiLCJwcm9maWxlcyIsImdldFVzZXJQcm9maWxlV2l0aEFwcG9pbnRtZW50cyIsImdldFVzZXJQcm9maWxlV2l0aFRlc3RzIiwiZ2V0TGFicyIsInNlYXJjaFN0YXRlIiwiZmlsdGVyQ3JpdGVyaWEiLCJtZXJnZVN0YXRlIiwidGVzdElkcyIsInNlbGVjdGVkQ3JpdGVyaWFzIiwiZmlsdGVyIiwieCIsInJlZHVjZSIsImZpbmFsU3RyIiwiY3VyciIsImkiLCJpZCIsImxhdCIsImxvbmciLCJzZWxlY3RlZExvY2F0aW9uIiwiZ2VvbWV0cnkiLCJsb2NhdGlvbiIsImxuZyIsIm1pbl9kaXN0YW5jZSIsImRpc3RhbmNlUmFuZ2UiLCJtYXhfZGlzdGFuY2UiLCJtaW5fcHJpY2UiLCJwcmljZVJhbmdlIiwibWF4X3ByaWNlIiwib3JkZXJfYnkiLCJzb3J0QnkiLCJ1cmwiLCJnZXRMYWJCeUlkIiwibGFiSWQiLCJnZXRMYWJUaW1lU2xvdHMiLCJjYWxsYmFjayIsImdldExhYkJvb2tpbmdTdW1tYXJ5IiwiYm9va2luZ0lkIiwibG9hZExhYkNvbW1vbkNyaXRlcmlhcyIsInRvZ2dsZURpYWdub3Npc0NyaXRlcmlhIiwiY3JpdGVyaWEiLCJnZXREaWFnbm9zaXNDcml0ZXJpYVJlc3VsdHMiLCJzZWFyY2hTdHJpbmciLCJTRUFSQ0hfQ1JJVEVSSUFfT1BEIiwiU0VBUkNIX0NSSVRFUklBX0xBQlMiLCJET0NUT1JTX0FDVElPTlMiLCJMQUJTX0FDVElPTlMiLCJVU0VSX0FDVElPTlMiLCJBVVRIX0FDVElPTlMiLCJtb2R1bGUiLCJleHBvcnRzIiwiT2JqZWN0IiwiYXNzaWduIiwiZ2V0RG9jdG9ycyIsInNwZWNpYWxpemF0aW9uX2lkcyIsInNpdHNfYXQiLCJqb2luIiwibWluX2ZlZXMiLCJtYXhfZmVlcyIsInNvcnRfb24iLCJpc19hdmFpbGFibGUiLCJpc19mZW1hbGUiLCJnZXREb2N0b3JCeUlkIiwiZG9jdG9ySWQiLCJnZXRUaW1lU2xvdHMiLCJjbGluaWNJZCIsImxvYWRPUERDb21tb25Dcml0ZXJpYSIsInRvZ2dsZU9QRENyaXRlcmlhIiwic2VsZWN0TG9jYXRpb24iLCJnZXRPUERDcml0ZXJpYVJlc3VsdHMiLCJheGlvc0luc3RhbmNlIiwiY3JlYXRlIiwiYmFzZVVSTCIsImhlYWRlciIsInJlamVjdEhhbmRsZXIiLCJjb25zb2xlIiwibG9nIiwiQVBJX0dFVCIsImdldEF1dGhUb2tlbiIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwibWV0aG9kIiwicmVzIiwiZGF0YSIsIkFQSV9QT1NUIiwiaGVhZGVycyIsIkFQSV9QVVQiLCJBUElfREVMRVRFIiwiSG9tZVZpZXciLCJDb21wb25lbnQiLCJjb25zdHJ1Y3RvciIsInByb3BzIiwibmF2aWdhdGVUbyIsIndoZXJlIiwiaGlzdG9yeSIsInB1c2giLCJyZW5kZXIiLCJiaW5kIiwiTG9hZGVyIiwiVXNlckxvZ2luVmlldyIsInN0YXRlIiwidmFsaWRhdGlvbkVycm9yIiwiaW5wdXRIYW5kbGVyIiwiZSIsInNldFN0YXRlIiwidGFyZ2V0IiwibmFtZSIsInZhbHVlIiwic3VibWl0T1RQUmVxdWVzdCIsIm1hdGNoIiwicmVwbGFjZSIsIm90cF9yZXF1ZXN0X3NlbnQiLCJJZnJhbVN0eWxlIiwid2lkdGgiLCJoZWlnaHQiLCJDaGF0VmlldyIsImNvbnRleHRUeXBlcyIsInJvdXRlciIsIkNvbW1vbmx5U2VhcmNoZWQiLCJyb3dzIiwibWFwIiwicm93Iiwic2VsZWN0ZWQiLCJ0b2dnbGUiLCJkaXZDbGFzcyIsInVsQ2xhc3MiLCJoZWFkaW5nIiwiZGVib3VuY2VyIiwiZm4iLCJkZWxheSIsInRpbWVyIiwiY2xlYXJUaW1lb3V0Iiwic2V0VGltZW91dCIsImNhbGwiLCJDcml0ZXJpYVNlYXJjaFZpZXciLCJzZWFyY2hWYWx1ZSIsInNlYXJjaFJlc3VsdHMiLCJjb21wb25lbnREaWRNb3VudCIsImdldFNlYXJjaFJlc3VsdHMiLCJpbnB1dCIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJ0ZXN0cyIsImFkZENyaXRlcmlhIiwiZm9ybWF0dGVkX2FkZHJlc3MiLCJzbGljZSIsImdvIiwidGl0bGUiLCJjaGVja0ZvckxvYWQiLCJjaGlsZHJlbiIsIk90cFZlcmlmeVZpZXciLCJQcm9maWxlU2xpZGVyIiwic3dpdGNoVXNlciIsInByb2ZpbGVJZCIsImNvbnRleHQiLCJzdWJSb3V0ZSIsImtleXMiLCJzcmMiLCJwcm9maWxlSW1hZ2UiLCJEQVlTX1RPX1NIT1ciLCJXRUVLX0RBWVMiLCJNT05USFMiLCJUaW1lU2xvdFNlbGVjdG9yIiwidGltZVNlcmllcyIsInNlbGVjdGVkTW9udGgiLCJzZWxlY3RlZERheSIsImdlbmVyYXRlRGF5cyIsImRheXMiLCJvZmZzZXREYXkiLCJEYXRlIiwic2V0RGF0ZSIsImdldERhdGUiLCJ3ZWVrRGF5IiwiZ2V0RGF5IiwidGFnIiwiZGF0ZU51bWJlciIsImFjdHVhbERhdGUiLCJtb250aCIsImdldE1vbnRoIiwic2VsZWN0RGF5IiwiZGF5Iiwic2VsZWN0TW9udGgiLCJzdG9wUHJvcGFnYXRpb24iLCJzZWxlY3RlZFNjaGVkdWxlIiwid2Vla0RheU51bWJlciIsInRpbWVTbG90cyIsInRpbWluZyIsInRoaXNNb250aCIsIm5leHRNb250aCIsInRzIiwidGltZSIsIlVzZXJBcHBvaW50bWVudHNWaWV3IiwiY29tcGFyZURhdGVXaXRoVG9kYXkiLCJkYXRlIiwidG9kYXkiLCJnZXRUaW1lIiwic2VsZWN0ZWRVc2VyIiwidXNlclByb2ZpbGVJZCIsInBhcmFtcyIsIlVTRVIiLCJpc0RlZmF1bHRVc2VyIiwiYXBwb2ludG1lbnRzIiwiYXBwb2ludG1lbnQiLCJzbG90Iiwic3RhcnQiLCJpbmRleCIsIkFwcG9pbnRtZW50TGlzdCIsInVuaXhfdGltZXN0YW1wIiwiaG91cnMiLCJnZXRIb3VycyIsIm1pbnV0ZXMiLCJnZXRNaW51dGVzIiwic3Vic3RyIiwiZG9jdG9yTmFtZSIsImVuZCIsInRvRGF0ZVN0cmluZyIsIlVzZXJQcm9maWxlVmlldyIsIlByb2ZpbGVEYXRhIiwib3BlbkFwcG9pbnRtZW50cyIsIm9wZW5SZXBvcnRzIiwiZ2VuZGVyIiwiYWdlIiwibW9iaWxlIiwibWVkaWNhbEhpc3RvcnlDb3VudCIsIm1lZGljYWxUZXN0Q291bnQiLCJvbmxpbmVDb25zdWx0YXRpb25Db3VudCIsIm9wZFZpc2l0Q291bnQiLCJwcm9maWxlRGF0YSIsIlVzZXJSZXBvcnRzVmlldyIsInRlc3QiLCJSZXBvcnRMaXN0Iiwic3ViX25hbWUiLCJhYmJyZXZpYXRpb24iLCJjYXRlZ29yeSIsIlVzZXJTaWdudXBWaWV3IiwiYXBwb2lubWVudEZvciIsInBhdGllbnROYW1lIiwiZW1haWwiLCJzdWJtaXRGb3JtIiwiQm9va2luZ1N1bW1hcnlWaWV3Iiwic2VsZWN0ZWRMYWIiLCJwaWNrdXBUeXBlIiwib3BlblRlc3RzIiwiaGFuZGxlUGlja3VwVHlwZSIsImdldFNlbGVjdG9ycyIsImZpbmFsUHJpY2UiLCJsYWJEZXRhaWwiLCJMQUJTIiwibGFiIiwicHJpY2UiLCJ0d3AiLCJ0ZXN0X2lkIiwibXJwIiwiYWRkcmVzcyIsIkNob29zZVBhdGllbnQiLCJQaWNrdXBBZGRyZXNzIiwiVmlzaXRUaW1lIiwiTGFiRGV0YWlscyIsIkxhYlByb2ZpbGVDYXJkIiwib3BlbkxhYiIsImRldGFpbHMiLCJMYWJUZXN0cyIsImxlbmd0aCIsIk9yZGVyRGV0YWlscyIsInByaWNlX2JyZWFrdXAiLCJ0b3RhbFByaWNlIiwidG90YWxUZXN0cyIsImJyZWFrdXAiLCJhbW91bnQiLCJMYWJWaWV3IiwiYm9va0xhYiIsIlBhdGllbnREZXRhaWxzVmlldyIsInNlbGVjdGVkVGVzdHMiLCJzZWxlY3RlZFNsb3QiLCJzZWxlY3RlZFNsb3RTdGFydCIsInNlbGVjdGVkU2xvdEVuZCIsImdldExvY2F0aW9uUGFyYW0iLCJwYXJhbVN0cmluZyIsInNlYXJjaCIsIlVSTFNlYXJjaFBhcmFtcyIsImdldCIsInByb2NlZWQiLCJwYXJzZUZsb2F0IiwidG9TdHJpbmciLCJBZGRyZXNzRm9ybSIsImxvY2FsaXR5IiwibGFuZG1hcmsiLCJwaW5jb2RlIiwiY2l0eSIsIndoaWNoIiwiRGV0YWlsc0Zvcm0iLCJwYXRpZW50RW1haWwiLCJwYXRpZW50R2VuZGVyIiwicGF0aWVudE1vYmlsZSIsIlNlYXJjaENyaXRlcmlhVmlldyIsInNlYXJjaFByb2NlZWQiLCJzZWFyY2hEYXRhIiwiZW5jb2RlVVJJQ29tcG9uZW50IiwiSlNPTiIsInN0cmluZ2lmeSIsImZpbHRlckRhdGEiLCJMT0FERURfU0VBUkNIX0NSSVRFUklBX0xBQiIsImNvbW1vbl90ZXN0cyIsImNvbW1vbl9jb25kaXRpb25zIiwicHJlZmVycmVkX2xhYnMiLCJTZWFyY2hSZXN1bHRzVmlldyIsInBhcnNlIiwiZ2V0TGFiTGlzdCIsImFwcGx5RmlsdGVycyIsImZpbHRlclN0YXRlIiwiTE9BREVEX0xBQlNfU0VBUkNIIiwiTGFic0xpc3QiLCJsYWJMaXN0IiwiVG9wQmFyIiwiYW5jaG9yRWwiLCJvcGVuRmlsdGVyIiwiY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyIsImhhbmRsZU9wZW4iLCJldmVudCIsImN1cnJlbnRUYXJnZXQiLCJoYW5kbGVDbG9zZSIsInRvZ2dsZUZpbHRlciIsImhhbmRsZVJhbmdlIiwicmFuZ2UiLCJnZXRDcml0ZXJpYVN0cmluZyIsImZpbmFsIiwiY3JpdGVyaWFTdHIiLCJCb29sZWFuIiwicHJldmVudERlZmF1bHQiLCJUZXN0U2VsZWN0b3JWaWV3IiwidG9nZ2xlVGVzdCIsImxhYkRhdGEiLCJpbmRleE9mIiwiQXBwb2ludG1lbnRTbG90Iiwic2VsZWN0ZWREb2N0b3IiLCJzZWxlY3RlZENsaW5pYyIsInNlbGVjdFRpbWVTbG90IiwiRE9DVE9SUyIsIkJvb2tpbmdWaWV3IiwiQ2xpbmljTGlzdFZpZXciLCJDbGluaWNTZWxlY3RvciIsInNlbGVjdENsaW5pYyIsImhvc3BpdGFscyIsImhvc3BpdGFsIiwiaG9zcGl0YWxfbmFtZSIsImZlZXMiLCJ0aW1pbmdzIiwidGltaW5nS2V5Iiwia2V5IiwiaG9zcGl0YWxfaWQiLCJEb2N0b3JQcm9maWxlQ2FyZCIsImNhcmRDbGljayIsImJvb2tOb3ciLCJnZXRRdWFsaWZpY2F0aW9uU3RyIiwicXVhbGlmaWNhdGlvblNwZWNpYWxpemF0aW9uIiwic3RyIiwicXVhbGlmaWNhdGlvbiIsInNwZWNpYWxpemF0aW9uIiwiZXhwZXJpZW5jZV95ZWFycyIsImhvc3BpdGFsX2NvdW50IiwicXVhbGlmaWNhdGlvbnMiLCJkaXNjb3VudGVkX2ZlZXMiLCJTZWxlY3RlZENsaW5pYyIsImhvc3BpdGFsTmFtZSIsImZvY3VzIiwiZ2V0Q3JpdGVyaWFSZXN1bHRzIiwicmVzdWx0IiwidG9nZ2xlQ3JpdGVyaWEiLCJnb0JhY2siLCJyZXN1bHREYXRhIiwiaiIsIkRvY3RvclByb2ZpbGVWaWV3IiwiQWJvdXREb2N0b3IiLCJsZXNzQWJvdXQiLCJyZWFkTW9yZSIsImFib3V0IiwiUHJvZmVzc2lvbmFsR3JhcGgiLCJMb2NhdGlvblNlYXJjaCIsImdldExvY2F0aW9uIiwiYXV0byIsImdvb2dsZSIsIm1hcHMiLCJwbGFjZXMiLCJBdXRvY29tcGxldGVTZXJ2aWNlIiwicmVxdWVzdCIsInR5cGVzIiwiY29tcG9uZW50UmVzdHJpY3Rpb25zIiwiY291bnRyeSIsImdldFBsYWNlUHJlZGljdGlvbnMiLCJyZXN1bHRzIiwic3RhdHVzIiwiTWFwIiwiY2VudGVyIiwiem9vbSIsInNlcnZpY2UiLCJQbGFjZXNTZXJ2aWNlIiwiZ2V0RGV0YWlscyIsInJlZmVyZW5jZSIsInBsYWNlIiwiZGV0ZWN0TG9jYXRpb24iLCJuYXZpZ2F0b3IiLCJnZW9sb2NhdGlvbiIsImdldEN1cnJlbnRQb3NpdGlvbiIsInBvc2l0aW9uIiwibGF0bG5nIiwiY29vcmRzIiwibGF0aXR1ZGUiLCJsb25naXR1ZGUiLCJnZW9jb2RlciIsIkdlb2NvZGVyIiwiZ2VvY29kZSIsImRlc2NyaXB0aW9uIiwiZGlzcGxheSIsIlBhdGllbnREZXRhaWxzIiwiUGF5bWVudFZpZXciLCJMT0FERURfU0VBUkNIX0NSSVRFUklBX09QRCIsImNvbmRpdGlvbnMiLCJzcGVjaWFsaXphdGlvbnMiLCJnZXREY290b3JzIiwiZ2V0RG9jdG9yTGlzdCIsIkxPQURFRF9ET0NUT1JfU0VBUkNIIiwiRG9jdG9yc0xpc3QiLCJkb2N0b3JMaXN0IiwiZG9jSWQiLCJzaXRzX2F0X2NsaW5pYyIsInNpdHNfYXRfaG9zcGl0YWwiLCJoYW5kbGVJbnB1dCIsImV2TmFtZSIsImNoZWNrZWQiLCJTZWFyY2hSZXN1bHRzRmlsdGVyIiwiZmVlXzAiLCJmZWVfMSIsImZlZV8yIiwiZmVlXzMiLCJjbGluaWNfcGVyc29uYWwiLCJjbGluaWNfaG9zcGl0YWwiLCJjbGluaWNfbXVsdGkiLCJhdmFpbGFibGVfdG9kYXkiLCJkaXN0YW5jZSIsImFwcGx5RmlsdGVyIiwic2V0T1BERmlsdGVycyIsImhhbmRsZUNoZWNrYm94IiwiaGFuZGxlQ2hhbmdlUmFkaW8iLCJTRU5EX09UUF9SRVFVRVNUIiwiU0VORF9PVFBfU1VDQ0VTUyIsIlNFTkRfT1RQX0ZBSUwiLCJTVUJNSVRfT1RQX1JFUVVFU1QiLCJTVUJNSVRfT1RQX1NVQ0NFU1MiLCJTVUJNSVRfT1RQX0ZBSUwiLCJBUFBFTkRfRE9DVE9SUyIsIkRPQ1RPUl9TRUFSQ0giLCJET0NUT1JfU0VBUkNIX1NUQVJUIiwiU0VMRUNUX0xPQ0FUSU9OX09QRCIsIk1FUkdFX1NFQVJDSF9TVEFURV9PUEQiLCJUT0dHTEVfT1BEX0NSSVRFUklBIiwiU0VUX09QRF9GSUxURVJTIiwiTE9BRF9TRUFSQ0hfQ1JJVEVSSUFfT1BEIiwiVE9HR0xFX0RJQUdOT1NJU19DUklURVJJQSIsIk1FUkdFX1NFQVJDSF9TVEFURV9MQUIiLCJMT0FEX1NFQVJDSF9DUklURVJJQV9MQUIiLCJBUFBFTkRfTEFCUyIsIkxBQl9TRUFSQ0giLCJTRUxFQ1RfTE9DQVRJT05fRElBR05PU0lTIiwiQVBQRU5EX0ZJTFRFUlNfRElBR05PU0lTIiwiTEFCX1NFQVJDSF9TVEFSVCIsIkFQUEVORF9VU0VSX1BST0ZJTEVTIiwiQ2hhdCIsIm1hcFN0YXRlVG9Qcm9wcyIsIm1hcERpc3BhdGNoVG9Qcm9wcyIsIkhvbWUiLCJBVVRIIiwiT3RwVmVyaWZ5Iiwic3VjY2Vzc19tZXNzYWdlIiwic3VibWl0X290cCIsInN1Ym1pdF9vdHBfc3VjY2VzcyIsInN1Ym1pdF9vdHBfZmFpbCIsIlVzZXJBcHBvaW50bWVudHMiLCJVc2VyTG9naW4iLCJvdHBfcmVxdWVzdF9zdWNjZXNzIiwib3RwX3JlcXVlc3RfZmFpbCIsIlVzZXJQcm9maWxlIiwiVXNlclJlcG9ydHMiLCJVc2VyU2lnbnVwIiwiQm9va2luZ1N1bW1hcnkiLCJMYWIiLCJsb2FkRGF0YSIsInN0b3JlIiwiU2VhcmNoQ3JpdGVyaWEiLCJTZWFyY2hSZXN1bHRzIiwiVGVzdFNlbGVjdG9yIiwiQm9va2luZyIsIkNsaW5pY0xpc3QiLCJDcml0ZXJpYVNlYXJjaCIsIkRvY3RvclByb2ZpbGUiLCJQYXltZW50IiwiTkFWSUdBVEUiLCJ3aW5kb3ciLCJocmVmIiwicmVmcmVzaEFwcG9pbnRtZW50U3RhdGUiLCJub0FwcG9pbnRtZW50Rm91bmQiLCJ1cGNvbWluZyIsInByZXZpb3VzIiwiYWN0aW9uIiwiY29va2llcyIsIlNUT1JBR0UiLCJzZXQiLCJjaGVja0F1dGgiLCJkZWxldGVBdXRoIiwicmVtb3ZlIiwiZGVmYXVsdFN0YXRlIiwibmV3U3RhdGUiLCJwcm9maWxlTWFwIiwicHJvZmlsZSIsImxhcE1hcCIsImNvbmNhdCIsImZvdW5kIiwiYWxsUmVkdWNlcnMiLCJkb2MiLCJkb2N0b3JNYXAiLCJkb2N0b3IiLCJyb3V0ZXMiLCJwYXRoIiwiZXhhY3QiLCJjb21wb25lbnQiLCJSb3V0ZXJDb25maWciLCJwYXRobmFtZSIsImVudGVyIiwiZXhpdCIsInJvdXRlIiwiUk9VVEVTIiwidGltZVN0YW1wIiwiZ2V0RGF5TmFtZSIsInByb2Nlc3MiLCJlbnYiLCJOT0RFX1RMU19SRUpFQ1RfVU5BVVRIT1JJWkVEIiwicmVxdWlyZSIsImh0dHAiLCJFeHByZXNzIiwiYXBwIiwic2VydmVyIiwiU2VydmVyIiwidXNlIiwic3RhdGljIiwiX19kaXJuYW1lIiwicmVxIiwic2hlZXRzUmVnaXN0cnkiLCJ0aGVtZSIsInBhbGV0dGUiLCJwcmltYXJ5IiwibWFpbiIsInNlY29uZGFyeSIsImRhbmdlciIsImdlbmVyYXRlQ2xhc3NOYW1lIiwid3JpdGVIZWFkIiwiTG9jYXRpb24iLCJwcm9taXNlcyIsInNvbWUiLCJhbGwiLCJzdG9yZURhdGEiLCJnZXRTdGF0ZSIsImh0bWwiLCJyZW5kZXJUb1N0cmluZyIsImNzcyIsInNlbmRGaWxlIiwicm9vdCIsImxpc3RlbiIsImVyciIsImluZm8iXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN6RUE7O0FBQ0E7O0FBQ0E7Ozs7OztBQUVPLE1BQU1BLDRCQUFVLENBQUNDLE1BQUQsRUFBU0MsRUFBVCxLQUFpQkMsUUFBRCxJQUFjO0FBQ2pEQSxhQUFTO0FBQ0xDLHFDQURLO0FBRUxDLGlCQUFTO0FBQ0xDLHlCQUFhTDtBQURSO0FBRkosS0FBVDs7QUFPQSx1QkFBUywyQkFBVCxFQUFzQztBQUNsQyx3QkFBZ0JBO0FBRGtCLEtBQXRDLEVBRUdNLElBRkgsQ0FFUSxVQUFVQyxRQUFWLEVBQW9CO0FBQ3hCTCxpQkFBUztBQUNMQyx5Q0FESztBQUVMQyxxQkFBUztBQUZKLFNBQVQ7QUFJQSxZQUFJSCxFQUFKLEVBQVFBLEdBQUdNLFNBQVNDLE1BQVo7QUFDWCxLQVJELEVBUUdDLEtBUkgsQ0FRUyxVQUFVQyxLQUFWLEVBQWlCO0FBQ3RCLFlBQUlDLFVBQVUsc0JBQWQ7QUFDQVQsaUJBQVM7QUFDTEMsc0NBREs7QUFFTEMscUJBQVM7QUFDTFEsK0JBQWVEO0FBRFY7QUFGSixTQUFUO0FBTUgsS0FoQkQ7QUFrQkgsQ0ExQk07O0FBNEJBLE1BQU1FLGdDQUFZLENBQUNiLE1BQUQsRUFBU2MsR0FBVCxFQUFjYixFQUFkLEtBQXNCQyxRQUFELElBQWM7QUFDeERBLGFBQVM7QUFDTEMsdUNBREs7QUFFTEMsaUJBQVM7QUFGSixLQUFUOztBQUtBLHVCQUFTLDJCQUFULEVBQXNDO0FBQ2xDLHdCQUFnQkosTUFEa0I7QUFFbEMsZUFBT2M7QUFGMkIsS0FBdEMsRUFHR1IsSUFISCxDQUdRLFVBQVVDLFFBQVYsRUFBb0I7QUFDeEI7QUFDQSwwQkFBUVEsWUFBUixDQUFxQlIsU0FBU1MsS0FBOUI7O0FBRUFkLGlCQUFTO0FBQ0xDLDJDQURLO0FBRUxDLHFCQUFTLEVBQUVZLE9BQU9ULFNBQVNTLEtBQWxCO0FBRkosU0FBVDtBQUlBLFlBQUlmLEVBQUosRUFBUUE7QUFDWCxLQVpELEVBWUdRLEtBWkgsQ0FZUyxVQUFVQyxLQUFWLEVBQWlCO0FBQ3RCUixpQkFBUztBQUNMQyx3Q0FESztBQUVMQyxxQkFBUztBQUNMUSwrQkFBZTtBQURWO0FBRkosU0FBVDtBQU1ILEtBbkJEO0FBb0JILENBMUJNLEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNoQ1A7O0FBQ0E7O0FBR08sTUFBTUssMENBQWlCLE1BQU9mLFFBQUQsSUFBYztBQUNqRCxtQkFBUSxZQUFSLEVBQXNCSSxJQUF0QixDQUEyQixVQUFVQyxRQUFWLEVBQW9COztBQUU5Q0wsV0FBUztBQUNSQyxvQ0FEUTtBQUVSQyxZQUFTRyxTQUFTVztBQUZWLEdBQVQ7QUFLQSxFQVBELEVBT0dULEtBUEgsQ0FPUyxVQUFVQyxLQUFWLEVBQWlCLENBRXpCLENBVEQ7QUFVQSxDQVhNOztBQWFBLE1BQU1TLDBFQUFpQyxNQUFPakIsUUFBRCxJQUFjO0FBQ2pFLG1CQUFRLGlDQUFSLEVBQTJDSSxJQUEzQyxDQUFnRCxVQUFVQyxRQUFWLEVBQW9COztBQUVuRUwsV0FBUztBQUNSQyxvQ0FEUTtBQUVSQyxZQUFTRyxTQUFTVztBQUZWLEdBQVQ7QUFLQSxFQVBELEVBT0dULEtBUEgsQ0FPUyxVQUFVQyxLQUFWLEVBQWlCLENBRXpCLENBVEQ7QUFVQSxDQVhNOztBQWFBLE1BQU1VLDREQUEwQixNQUFPbEIsUUFBRCxJQUFjO0FBQzFELG1CQUFRLDBCQUFSLEVBQW9DSSxJQUFwQyxDQUF5QyxVQUFVQyxRQUFWLEVBQW9COztBQUU1REwsV0FBUztBQUNSQyxvQ0FEUTtBQUVSQyxZQUFTRyxTQUFTVztBQUZWLEdBQVQ7QUFLQSxFQVBELEVBT0dULEtBUEgsQ0FPUyxVQUFVQyxLQUFWLEVBQWlCLENBRXpCLENBVEQ7QUFVQSxDQVhNLEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM5QlA7O0FBQ0E7O0FBR08sTUFBTVcsNEJBQVUsQ0FBQ0MsY0FBYyxFQUFmLEVBQW1CQyxpQkFBaUIsRUFBcEMsRUFBd0NDLGFBQWEsS0FBckQsS0FBZ0V0QixRQUFELElBQWM7O0FBRW5HLEtBQUl1QixVQUFVSCxZQUFZSSxpQkFBWixDQUNaQyxNQURZLENBQ0xDLEtBQUtBLEVBQUV6QixJQUFGLElBQVUsTUFEVixFQUVaMEIsTUFGWSxDQUVMLENBQUNDLFFBQUQsRUFBV0MsSUFBWCxFQUFpQkMsQ0FBakIsS0FBdUI7QUFDOUIsTUFBSUEsS0FBSyxDQUFULEVBQVk7QUFDWEYsZUFBWSxHQUFaO0FBQ0E7QUFDREEsY0FBYSxHQUFFQyxLQUFLRSxFQUFHLEVBQXZCO0FBQ0EsU0FBT0gsUUFBUDtBQUNBLEVBUlksRUFRVixFQVJVLENBQWQ7O0FBVUEsS0FBSUksTUFBTSxPQUFWO0FBQ0EsS0FBSUMsT0FBTyxPQUFYO0FBQ0EsS0FBSWIsWUFBWWMsZ0JBQWhCLEVBQWtDO0FBQ2pDRixRQUFNWixZQUFZYyxnQkFBWixDQUE2QkMsUUFBN0IsQ0FBc0NDLFFBQXRDLENBQStDSixHQUFyRDtBQUNBQyxTQUFPYixZQUFZYyxnQkFBWixDQUE2QkMsUUFBN0IsQ0FBc0NDLFFBQXRDLENBQStDQyxHQUF0RDtBQUNBO0FBQ0QsS0FBSUMsZUFBZWpCLGVBQWVrQixhQUFmLENBQTZCLENBQTdCLENBQW5CO0FBQ0EsS0FBSUMsZUFBZW5CLGVBQWVrQixhQUFmLENBQTZCLENBQTdCLENBQW5CO0FBQ0EsS0FBSUUsWUFBWXBCLGVBQWVxQixVQUFmLENBQTBCLENBQTFCLENBQWhCO0FBQ0EsS0FBSUMsWUFBWXRCLGVBQWVxQixVQUFmLENBQTBCLENBQTFCLENBQWhCO0FBQ0EsS0FBSUUsV0FBV3ZCLGVBQWV3QixNQUE5Qjs7QUFFQSxLQUFJQyxNQUFPLGtDQUFpQ3ZCLE9BQVEsU0FBUVMsR0FBSSxRQUFPQyxJQUFLLGlCQUFnQkssWUFBYSxpQkFBZ0JFLFlBQWEsY0FBYUMsU0FBVSxjQUFhRSxTQUFVLGFBQVlDLFFBQVMsRUFBek07O0FBRUE1QyxVQUFTO0FBQ1JDLCtCQURRO0FBRVJDLFdBQVM7QUFGRCxFQUFUOztBQUtBLFFBQU8sa0JBQVE0QyxHQUFSLEVBQWExQyxJQUFiLENBQWtCLFVBQVVDLFFBQVYsRUFBb0I7O0FBRTVDTCxXQUFTO0FBQ1JDLDJCQURRO0FBRVJDLFlBQVNHO0FBRkQsR0FBVDs7QUFLQUwsV0FBUztBQUNSQywwQkFEUTtBQUVSQyxZQUFTRztBQUZELEdBQVQ7O0FBS0EsTUFBSWlCLFVBQUosRUFBZ0I7QUFDZnRCLFlBQVM7QUFDUkMsdUNBRFE7QUFFUkMsYUFBUztBQUNSa0IsZ0JBRFE7QUFFUkM7QUFGUTtBQUZELElBQVQ7QUFPQTtBQUVELEVBdEJNLEVBc0JKZCxLQXRCSSxDQXNCRSxVQUFVQyxLQUFWLEVBQWlCLENBRXpCLENBeEJNLENBQVA7QUF5QkEsQ0F4RE07O0FBMERBLE1BQU11QyxrQ0FBY0MsS0FBRCxJQUFZaEQsUUFBRCxJQUFjO0FBQ2xELEtBQUk4QyxNQUFPLDhCQUE2QkUsS0FBTSxFQUE5Qzs7QUFFQSxRQUFPLGtCQUFRRixHQUFSLEVBQWExQyxJQUFiLENBQWtCLFVBQVVDLFFBQVYsRUFBb0I7O0FBRTVDTCxXQUFTO0FBQ1JDLDJCQURRO0FBRVJDLFlBQVMsQ0FBQ0csUUFBRDtBQUZELEdBQVQ7QUFLQSxFQVBNLEVBT0pFLEtBUEksQ0FPRSxVQUFVQyxLQUFWLEVBQWlCLENBRXpCLENBVE0sQ0FBUDtBQVVBLENBYk07O0FBZUEsTUFBTXlDLDRDQUFrQixDQUFDRCxLQUFELEVBQVF6QixPQUFSLEVBQWlCMkIsUUFBakIsS0FBK0JsRCxRQUFELElBQWM7QUFDMUUsbUJBQVEseUJBQVIsRUFBbUNJLElBQW5DLENBQXdDLFVBQVVDLFFBQVYsRUFBb0I7O0FBRTNENkMsV0FBUzdDLFFBQVQ7QUFFQSxFQUpELEVBSUdFLEtBSkgsQ0FJUyxVQUFVQyxLQUFWLEVBQWlCLENBRXpCLENBTkQ7QUFPQSxDQVJNOztBQVVBLE1BQU0yQyxzREFBdUIsQ0FBQ0MsU0FBRCxFQUFZRixRQUFaLEtBQTBCbEQsUUFBRCxJQUFjO0FBQzFFLG1CQUFRLDBCQUFSLEVBQW9DSSxJQUFwQyxDQUF5QyxVQUFVQyxRQUFWLEVBQW9COztBQUU1RDZDLFdBQVM3QyxRQUFUO0FBRUEsRUFKRCxFQUlHRSxLQUpILENBSVMsVUFBVUMsS0FBVixFQUFpQixDQUV6QixDQU5EO0FBT0EsQ0FSTSxDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDdkZQOztBQUNBOztBQUVPLE1BQU02QywwREFBeUIsTUFBT3JELFFBQUQsSUFBYzs7QUFFdEQsV0FBTyxrQkFBUSw4QkFBUixFQUF3Q0ksSUFBeEMsQ0FBNkMsVUFBVUMsUUFBVixFQUFvQjtBQUNwRUwsaUJBQVM7QUFDTEMsaURBREs7QUFFTEMscUJBQVNHO0FBRkosU0FBVDtBQUlILEtBTE0sRUFLSkUsS0FMSSxDQUtFLFVBQVVDLEtBQVYsRUFBaUI7QUFDdEJSLGlCQUFTO0FBQ0xDLGlEQURLO0FBRUxDLHFCQUFTO0FBRkosU0FBVDtBQUlILEtBVk0sQ0FBUDtBQVlILENBZE07O0FBZ0JBLE1BQU1vRCw0REFBMEIsQ0FBQ3JELElBQUQsRUFBT3NELFFBQVAsS0FBcUJ2RCxRQUFELElBQWM7QUFDckVBLGFBQVM7QUFDTEMsOENBREs7QUFFTEMsaUJBQVM7QUFDTEQsZ0JBREssRUFDQ3NEO0FBREQ7QUFGSixLQUFUO0FBT0gsQ0FSTTs7QUFVQSxNQUFNQyxvRUFBOEIsQ0FBQ0MsWUFBRCxFQUFlUCxRQUFmLEtBQTZCbEQsUUFBRCxJQUFjO0FBQ2pGLHNCQUFTLGdDQUErQnlELFlBQWEsRUFBckQsRUFBd0RyRCxJQUF4RCxDQUE2RCxVQUFVQyxRQUFWLEVBQW9CO0FBQzdFNkMsaUJBQVM3QyxRQUFUO0FBQ0gsS0FGRCxFQUVHRSxLQUZILENBRVMsVUFBVUMsS0FBVixFQUFpQjtBQUN0QjBDLGlCQUFTLElBQVQ7QUFDSCxLQUpEO0FBS0gsQ0FOTSxDOzs7Ozs7Ozs7Ozs7OztBQzdCUDs7SUFBWVEsbUI7O0FBQ1o7O0lBQVlDLG9COztBQUNaOztJQUFZQyxlOztBQUNaOztJQUFZQyxZOztBQUNaOztJQUFZQyxZOztBQUNaOztJQUFZQyxZOzs7O0FBRVpDLE9BQU9DLE9BQVAsR0FBaUJDLE9BQU9DLE1BQVAsQ0FBYyxFQUFkLEVBQ2JULG1CQURhLEVBRWJDLG9CQUZhLEVBR2JDLGVBSGEsRUFJYkMsWUFKYSxFQUtiQyxZQUxhLEVBTWJDLFlBTmEsQ0FBakIsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ1BBOztBQUNBOztBQUdPLE1BQU1LLGtDQUFhLENBQUNoRCxjQUFjLEVBQWYsRUFBbUJDLGlCQUFpQixFQUFwQyxFQUF3Q0MsYUFBYSxLQUFyRCxLQUFnRXRCLFFBQUQsSUFBYztBQUN0RyxLQUFJcUUscUJBQXFCakQsWUFBWUksaUJBQVosQ0FDdkJDLE1BRHVCLENBQ2hCQyxLQUFLQSxFQUFFekIsSUFBRixJQUFVLFlBREMsRUFFdkIwQixNQUZ1QixDQUVoQixDQUFDQyxRQUFELEVBQVdDLElBQVgsRUFBaUJDLENBQWpCLEtBQXVCO0FBQzlCLE1BQUlBLEtBQUssQ0FBVCxFQUFZO0FBQ1hGLGVBQVksR0FBWjtBQUNBO0FBQ0RBLGNBQWEsR0FBRUMsS0FBS0UsRUFBRyxFQUF2QjtBQUNBLFNBQU9ILFFBQVA7QUFDQSxFQVJ1QixFQVFyQixFQVJxQixDQUF6Qjs7QUFVQSxLQUFJMEMsVUFBVSxFQUFkO0FBQ0E7QUFDQTtBQUNBO0FBQ0FBLFdBQVVBLFFBQVFDLElBQVIsQ0FBYSxHQUFiLENBQVY7O0FBRUEsS0FBSXZDLE1BQU0sT0FBVjtBQUNBLEtBQUlDLE9BQU8sT0FBWDtBQUNBLEtBQUliLFlBQVljLGdCQUFoQixFQUFrQztBQUNqQ0YsUUFBTVosWUFBWWMsZ0JBQVosQ0FBNkJDLFFBQTdCLENBQXNDQyxRQUF0QyxDQUErQ0osR0FBckQ7QUFDQUMsU0FBT2IsWUFBWWMsZ0JBQVosQ0FBNkJDLFFBQTdCLENBQXNDQyxRQUF0QyxDQUErQ0MsR0FBdEQ7QUFDQTs7QUFFRCxLQUFJbUMsV0FBV25ELGVBQWVxQixVQUFmLENBQTBCLENBQTFCLENBQWY7QUFDQSxLQUFJK0IsV0FBV3BELGVBQWVxQixVQUFmLENBQTBCLENBQTFCLENBQWY7QUFDQSxLQUFJZ0MsVUFBVXJELGVBQWVxRCxPQUFmLElBQTBCLEVBQXhDO0FBQ0EsS0FBSUMsZUFBZXRELGVBQWVzRCxZQUFsQztBQUNBLEtBQUlDLFlBQVl2RCxlQUFldUQsU0FBL0I7O0FBRUEsS0FBSTlCLE1BQU8sa0RBQWlEdUIsa0JBQW1CLFlBQVdDLE9BQVEsYUFBWXRDLEdBQUksY0FBYUMsSUFBSyxhQUFZdUMsUUFBUyxhQUFZQyxRQUFTLFlBQVdDLE9BQVEsaUJBQWdCQyxZQUFhLGNBQWFDLFNBQVUsRUFBclA7O0FBRUE1RSxVQUFTO0FBQ1JDLGtDQURRO0FBRVJDLFdBQVM7QUFGRCxFQUFUOztBQUtBLFFBQU8sa0JBQVE0QyxHQUFSLEVBQWExQyxJQUFiLENBQWtCLFVBQVVDLFFBQVYsRUFBb0I7O0FBRTVDTCxXQUFTO0FBQ1JDLDhCQURRO0FBRVJDLFlBQVNHO0FBRkQsR0FBVDs7QUFLQUwsV0FBUztBQUNSQyw2QkFEUTtBQUVSQyxZQUFTRztBQUZELEdBQVQ7O0FBS0EsTUFBSWlCLFVBQUosRUFBZ0I7QUFDZnRCLFlBQVM7QUFDUkMsdUNBRFE7QUFFUkMsYUFBUztBQUNSa0IsZ0JBRFE7QUFFUkM7QUFGUTtBQUZELElBQVQ7QUFPQTtBQUVELEVBdEJNLEVBc0JKZCxLQXRCSSxDQXNCRSxVQUFVQyxLQUFWLEVBQWlCLENBRXpCLENBeEJNLENBQVA7QUF5QkEsQ0E5RE07O0FBZ0VBLE1BQU1xRSx3Q0FBaUJDLFFBQUQsSUFBZTlFLFFBQUQsSUFBYzs7QUFFeEQsUUFBTyxrQkFBUyxrQ0FBaUM4RSxRQUFTLEVBQW5ELEVBQXNEMUUsSUFBdEQsQ0FBMkQsVUFBVUMsUUFBVixFQUFvQjs7QUFFckZMLFdBQVM7QUFDUkMsOEJBRFE7QUFFUkMsWUFBUyxDQUFDRyxRQUFEO0FBRkQsR0FBVDtBQUtBLEVBUE0sRUFPSkUsS0FQSSxDQU9FLFVBQVVDLEtBQVYsRUFBaUIsQ0FFekIsQ0FUTSxDQUFQO0FBVUEsQ0FaTTs7QUFjQSxNQUFNdUUsc0NBQWUsQ0FBQ0QsUUFBRCxFQUFXRSxRQUFYLEVBQXFCOUIsUUFBckIsS0FBbUNsRCxRQUFELElBQWM7QUFDM0UsUUFBTyxrQkFBUyx5Q0FBd0M4RSxRQUFTLGdCQUFlRSxRQUFTLEVBQWxGLEVBQXFGNUUsSUFBckYsQ0FBMEYsVUFBVUMsUUFBVixFQUFvQjtBQUNwSDZDLFdBQVM3QyxRQUFUO0FBQ0EsRUFGTSxFQUVKRSxLQUZJLENBRUUsVUFBVUMsS0FBVixFQUFpQixDQUV6QixDQUpNLENBQVA7QUFLQSxDQU5NLEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNsRlA7O0FBQ0E7O0FBR08sTUFBTXlFLHdEQUF3QixNQUFPakYsUUFBRCxJQUFjOztBQUVyRCxXQUFPLGtCQUFRLDhCQUFSLEVBQXdDSSxJQUF4QyxDQUE2QyxVQUFVQyxRQUFWLEVBQW9CO0FBQ3BFTCxpQkFBUztBQUNMQyxpREFESztBQUVMQyxxQkFBU0c7QUFGSixTQUFUO0FBSUgsS0FMTSxFQUtKRSxLQUxJLENBS0UsVUFBVUMsS0FBVixFQUFpQjtBQUN0QlIsaUJBQVM7QUFDTEMsaURBREs7QUFFTEMscUJBQVM7QUFGSixTQUFUO0FBSUgsS0FWTSxDQUFQO0FBWUgsQ0FkTTs7QUFnQkEsTUFBTWdGLGdEQUFvQixDQUFDakYsSUFBRCxFQUFPc0QsUUFBUCxLQUFxQnZELFFBQUQsSUFBYztBQUMvREEsYUFBUztBQUNMQyx3Q0FESztBQUVMQyxpQkFBUztBQUNMRCxnQkFESyxFQUNDc0Q7QUFERDtBQUZKLEtBQVQ7QUFPSCxDQVJNOztBQVVBLE1BQU00QiwwQ0FBa0IvQyxRQUFELElBQWVwQyxRQUFELElBQWM7QUFDdERBLGFBQVM7QUFDTEMsd0NBREs7QUFFTEMsaUJBQVNrQztBQUZKLEtBQVQ7O0FBS0FwQyxhQUFTO0FBQ0xDLDhDQURLO0FBRUxDLGlCQUFTa0M7QUFGSixLQUFUO0FBS0gsQ0FYTTs7QUFhQSxNQUFNZ0Qsd0RBQXdCLENBQUMzQixZQUFELEVBQWVQLFFBQWYsS0FBNkJsRCxRQUFELElBQWM7O0FBRTNFLHNCQUFTLGdDQUErQnlELFlBQWEsRUFBckQsRUFBd0RyRCxJQUF4RCxDQUE2RCxVQUFVQyxRQUFWLEVBQW9CO0FBQzdFNkMsaUJBQVM3QyxRQUFUO0FBQ0gsS0FGRCxFQUVHRSxLQUZILENBRVMsVUFBVUMsS0FBVixFQUFpQjtBQUN0QjBDLGlCQUFTLElBQVQ7QUFDSCxLQUpEO0FBS0gsQ0FQTSxDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDM0NQOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRUEsSUFBSW1DLGdCQUFnQixnQkFBTUMsTUFBTixDQUFhO0FBQzdCQyxhQUFTLDhCQURvQjtBQUU3QkMsWUFBUTtBQUZxQixDQUFiLENBQXBCOztBQUtBLFNBQVNDLGFBQVQsQ0FBdUJwRixRQUF2QixFQUFpQzZDLFFBQWpDLEVBQTJDO0FBQ3ZDd0MsWUFBUUMsR0FBUixDQUFZdEYsUUFBWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTZDLGFBQVM3QyxRQUFUO0FBQ0g7O0FBRU0sTUFBTXVGLDRCQUFXOUMsR0FBRCxJQUFTO0FBQzVCLFdBQU8sa0JBQVErQyxZQUFSLEdBQXVCekYsSUFBdkIsQ0FBNkJVLEtBQUQsSUFBVztBQUMxQyxlQUFPLElBQUlnRixPQUFKLENBQVksQ0FBQ0MsT0FBRCxFQUFVQyxNQUFWLEtBQXFCO0FBQ3BDWCwwQkFBYztBQUNWWSx3QkFBUSxLQURFO0FBRVZuRCxxQkFBS0E7QUFDTDtBQUhVLGFBQWQsRUFJRzFDLElBSkgsQ0FJUzhGLEdBQUQsSUFBUztBQUNiSCx3QkFBUUcsSUFBSUMsSUFBWjtBQUNILGFBTkQsRUFNSTlGLFFBQUQsSUFBYztBQUNib0YsOEJBQWNwRixRQUFkLEVBQXdCMkYsTUFBeEI7QUFDSCxhQVJEO0FBU0gsU0FWTSxDQUFQO0FBV0gsS0FaTSxDQUFQO0FBZUgsQ0FoQk07QUFpQkEsTUFBTUksOEJBQVcsQ0FBQ3RELEdBQUQsRUFBTXFELElBQU4sS0FBZTtBQUNuQyxXQUFPLGtCQUFRTixZQUFSLEdBQXVCekYsSUFBdkIsQ0FBNkJVLEtBQUQsSUFBVztBQUMxQyxlQUFPLElBQUlnRixPQUFKLENBQVksQ0FBQ0MsT0FBRCxFQUFVQyxNQUFWLEtBQXFCO0FBQ3BDWCwwQkFBYztBQUNWWSx3QkFBUSxNQURFO0FBRVZuRCxxQkFBS0EsR0FGSztBQUdWcUQsc0JBQU1BLElBSEk7QUFJVkUseUJBQVMsRUFBRSxpQkFBa0IsU0FBUXZGLEtBQU0sRUFBbEM7QUFKQyxhQUFkLEVBS0dWLElBTEgsQ0FLUzhGLEdBQUQsSUFBUztBQUNiSCx3QkFBUUcsSUFBSUMsSUFBWjtBQUNILGFBUEQsRUFPSTlGLFFBQUQsSUFBYztBQUNib0YsOEJBQWNwRixRQUFkLEVBQXdCMkYsTUFBeEI7QUFDSCxhQVREO0FBVUgsU0FYTSxDQUFQO0FBWUgsS0FiTSxDQUFQO0FBZ0JILENBakJNOztBQW1CQSxNQUFNTSw0QkFBVSxDQUFDeEQsR0FBRCxFQUFNcUQsSUFBTixLQUFlO0FBQ2xDLFdBQU8sa0JBQVFOLFlBQVIsR0FBdUJ6RixJQUF2QixDQUE2QlUsS0FBRCxJQUFXO0FBQzFDLGVBQU8sSUFBSWdGLE9BQUosQ0FBWSxDQUFDQyxPQUFELEVBQVVDLE1BQVYsS0FBcUI7QUFDcENYLDBCQUFjO0FBQ1ZZLHdCQUFRLEtBREU7QUFFVm5ELHFCQUFLQSxHQUZLO0FBR1ZxRCxzQkFBTUEsSUFISTtBQUlWRSx5QkFBUyxFQUFFLGlCQUFrQixTQUFRdkYsS0FBTSxFQUFsQztBQUpDLGFBQWQsRUFLR1YsSUFMSCxDQUtTOEYsR0FBRCxJQUFTO0FBQ2JILHdCQUFRRyxJQUFJQyxJQUFaO0FBQ0gsYUFQRCxFQU9JOUYsUUFBRCxJQUFjO0FBQ2JvRiw4QkFBY3BGLFFBQWQsRUFBd0IyRixNQUF4QjtBQUNILGFBVEQ7QUFVSCxTQVhNLENBQVA7QUFZSCxLQWJNLENBQVA7QUFnQkgsQ0FqQk07O0FBbUJBLE1BQU1PLGtDQUFjekQsR0FBRCxJQUFTO0FBQy9CLFdBQU8sa0JBQVErQyxZQUFSLEdBQXVCekYsSUFBdkIsQ0FBNkJVLEtBQUQsSUFBVztBQUMxQyxlQUFPLElBQUlnRixPQUFKLENBQVksQ0FBQ0MsT0FBRCxFQUFVQyxNQUFWLEtBQXFCO0FBQ3BDWCwwQkFBYztBQUNWWSx3QkFBUSxRQURFO0FBRVZuRCxxQkFBS0EsR0FGSztBQUdWdUQseUJBQVMsRUFBRSxpQkFBa0IsU0FBUXZGLEtBQU0sRUFBbEM7QUFIQyxhQUFkLEVBSUdWLElBSkgsQ0FJUzhGLEdBQUQsSUFBUztBQUNiSCx3QkFBUUcsSUFBSUMsSUFBWjtBQUNILGFBTkQsRUFNSTlGLFFBQUQsSUFBYztBQUNib0YsOEJBQWNwRixRQUFkLEVBQXdCMkYsTUFBeEI7QUFDSCxhQVJEO0FBU0gsU0FWTSxDQUFQO0FBV0gsS0FaTSxDQUFQO0FBY0gsQ0FmTSxDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM1RVA7Ozs7OztBQUVBLE1BQU1RLFFBQU4sU0FBdUIsZ0JBQU1DLFNBQTdCLENBQXVDO0FBQ25DQyxnQkFBWUMsS0FBWixFQUFtQjtBQUNmLGNBQU1BLEtBQU47QUFDSDs7QUFFREMsZUFBV0MsS0FBWCxFQUFpQjtBQUNiLGFBQUtGLEtBQUwsQ0FBV0csT0FBWCxDQUFtQkMsSUFBbkIsQ0FBd0JGLEtBQXhCO0FBQ0g7O0FBRURHLGFBQVM7O0FBRUwsZUFDSTtBQUFBO0FBQUE7QUFDSTtBQUFBO0FBQUEsa0JBQVEsV0FBVSxtQ0FBbEI7QUFDSTtBQUFBO0FBQUEsc0JBQUssV0FBVSxpQkFBZjtBQUNJO0FBQUE7QUFBQSwwQkFBSyxXQUFVLEtBQWY7QUFDSTtBQUFBO0FBQUEsOEJBQUssV0FBVSxPQUFmO0FBQ0k7QUFBQTtBQUFBLGtDQUFLLFdBQVUsMkNBQWY7QUFBQTtBQUFBO0FBREoseUJBREo7QUFJSSwrREFBSyxXQUFVLE9BQWYsR0FKSjtBQU1JO0FBQUE7QUFBQSw4QkFBSyxXQUFVLE9BQWY7QUFDSTtBQUFBO0FBQUEsa0NBQUksV0FBVSxrREFBZDtBQUNJO0FBQUE7QUFBQTtBQUFJO0FBQUE7QUFBQSwwQ0FBTSxXQUFVLDBCQUFoQjtBQUEyQywrRUFBSyxLQUFJLHFDQUFULEVBQStDLFdBQVUsV0FBekQ7QUFBM0M7QUFBSixpQ0FESjtBQUVJO0FBQUE7QUFBQTtBQUFJO0FBQUE7QUFBQSwwQ0FBTSxXQUFVLDRDQUFoQjtBQUE2RCwrRUFBSyxLQUFJLDZDQUFULEVBQXVELFdBQVUsV0FBakUsR0FBN0Q7QUFBQTtBQUE2SSxnRkFBTSxXQUFVLG9CQUFoQjtBQUE3STtBQUFKO0FBRko7QUFESjtBQU5KO0FBREo7QUFESixhQURKO0FBa0JJO0FBQUE7QUFBQSxrQkFBUyxXQUFVLHFCQUFuQjtBQUNJO0FBQUE7QUFBQSxzQkFBSyxXQUFVLGlCQUFmO0FBR0k7QUFBQTtBQUFBLDBCQUFLLFdBQVUsS0FBZjtBQUNJO0FBQUE7QUFBQSw4QkFBSyxXQUFVLFFBQWY7QUFDSSxtRUFBSyxXQUFVLDBCQUFmO0FBREo7QUFESixxQkFISjtBQXlCSTtBQUFBO0FBQUEsMEJBQUssV0FBVSxLQUFmO0FBQ0k7QUFBQTtBQUFBLDhCQUFLLFdBQVUsT0FBZixFQUF1QixTQUFTLEtBQUtKLFVBQUwsQ0FBZ0JLLElBQWhCLENBQXFCLElBQXJCLEVBQTBCLE1BQTFCLENBQWhDO0FBQ0k7QUFBQTtBQUFBLGtDQUFLLFdBQVUsUUFBZjtBQUNJO0FBQUE7QUFBQSxzQ0FBSyxXQUFVLHNDQUFmO0FBQ0k7QUFBQTtBQUFBLDBDQUFLLFdBQVUsNEJBQWY7QUFDSSwrRUFBSyxLQUFJLHNDQUFULEVBQWdELFdBQVUscUJBQTFEO0FBREoscUNBREo7QUFJSTtBQUFBO0FBQUEsMENBQUksV0FBVSxnQkFBZDtBQUFBO0FBQUE7QUFKSjtBQURKO0FBREoseUJBREo7QUFXSTtBQUFBO0FBQUEsOEJBQUssV0FBVSxPQUFmLEVBQXVCLFNBQVMsS0FBS0wsVUFBTCxDQUFnQkssSUFBaEIsQ0FBcUIsSUFBckIsRUFBMEIsS0FBMUIsQ0FBaEM7QUFDSTtBQUFBO0FBQUEsa0NBQUssV0FBVSxRQUFmO0FBQ0k7QUFBQTtBQUFBLHNDQUFLLFdBQVUsc0NBQWY7QUFDSTtBQUFBO0FBQUEsMENBQUssV0FBVSw0QkFBZjtBQUNJLCtFQUFLLEtBQUksNkNBQVQsRUFBdUQsV0FBVSxxQkFBakU7QUFESixxQ0FESjtBQUlJO0FBQUE7QUFBQSwwQ0FBSSxXQUFVLGdCQUFkO0FBQUE7QUFBQTtBQUpKO0FBREo7QUFESjtBQVhKLHFCQXpCSjtBQStDSTtBQUFBO0FBQUEsMEJBQUssV0FBVSxLQUFmO0FBQ0k7QUFBQTtBQUFBLDhCQUFLLFdBQVUsUUFBZjtBQUNJO0FBQUE7QUFBQSxrQ0FBSyxXQUFVLHlCQUFmO0FBQ0k7QUFBQTtBQUFBLHNDQUFLLFdBQVUsZUFBZjtBQUNJO0FBQUE7QUFBQSwwQ0FBSSxXQUFVLHlDQUFkO0FBQUE7QUFBK0Y7QUFBQTtBQUFBLDhDQUFHLE1BQUssR0FBUixFQUFZLFdBQVUsV0FBdEI7QUFBQTtBQUFBO0FBQS9GO0FBREosaUNBREo7QUFJSTtBQUFBO0FBQUEsc0NBQUssV0FBVSw0QkFBZjtBQUNJO0FBQUE7QUFBQSwwQ0FBSyxXQUFVLEtBQWY7QUFDSTtBQUFBO0FBQUEsOENBQUssV0FBVSxPQUFmO0FBQ0k7QUFBQTtBQUFBLGtEQUFNLFdBQVUsa0JBQWhCO0FBQW1DLHVGQUFLLEtBQUksd0NBQVQsRUFBa0QsV0FBVSxXQUE1RDtBQUFuQztBQURKLHlDQURKO0FBSUk7QUFBQTtBQUFBLDhDQUFLLFdBQVUsT0FBZjtBQUNJO0FBQUE7QUFBQSxrREFBTSxXQUFVLGtCQUFoQjtBQUFtQyx1RkFBSyxLQUFJLHFDQUFULEVBQStDLFdBQVUsV0FBekQ7QUFBbkM7QUFESjtBQUpKO0FBREosaUNBSko7QUFjSTtBQUFBO0FBQUEsc0NBQUssV0FBVSxlQUFmO0FBQ0k7QUFBQTtBQUFBLDBDQUFLLFdBQVUsZ0JBQWY7QUFDSTtBQUFBO0FBQUEsOENBQUksV0FBVSxhQUFkO0FBQ0k7QUFBQTtBQUFBO0FBQUk7QUFBQTtBQUFBLHNEQUFHLE1BQUssR0FBUixFQUFZLFdBQVUsdUNBQXRCO0FBQUE7QUFBQTtBQUFKLDZDQURKO0FBRUk7QUFBQTtBQUFBO0FBQUk7QUFBQTtBQUFBLHNEQUFHLE1BQUssR0FBUixFQUFZLFdBQVUsdUNBQXRCO0FBQUE7QUFBQTtBQUFKLDZDQUZKO0FBR0k7QUFBQTtBQUFBO0FBQUk7QUFBQTtBQUFBLHNEQUFHLE1BQUssR0FBUixFQUFZLFdBQVUsdUNBQXRCO0FBQUE7QUFBQTtBQUFKO0FBSEo7QUFESjtBQURKO0FBZEo7QUFESjtBQURKLHFCQS9DSjtBQTJFSTtBQUFBO0FBQUEsMEJBQUssV0FBVSxLQUFmO0FBQ0k7QUFBQTtBQUFBLDhCQUFLLFdBQVUsUUFBZjtBQUNJO0FBQUE7QUFBQSxrQ0FBSyxXQUFVLFFBQWY7QUFDSTtBQUFBO0FBQUEsc0NBQUssV0FBVSxnQkFBZjtBQUNJLDZFQUFPLE1BQUssTUFBWixFQUFtQixXQUFVLHFCQUE3QixFQUFtRCxhQUFZLDhCQUEvRDtBQURKO0FBREo7QUFESjtBQURKO0FBM0VKO0FBREo7QUFsQkosU0FESjtBQTRHSDtBQXZIa0M7O2tCQTBIeEJULFE7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzVIZjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDQUE7Ozs7QUFFQTs7OztBQUVBLE1BQU1VLE1BQU4sU0FBcUIsZ0JBQU1ULFNBQTNCLENBQXFDO0FBQ2pDQyxnQkFBWUMsS0FBWixFQUFtQjtBQUNmLGNBQU1BLEtBQU47QUFDSDs7QUFFREssYUFBUzs7QUFFTCxlQUNJO0FBQUE7QUFBQSxjQUFLLFdBQVUsZ0JBQWY7QUFDSSx3RUFBa0IsV0FBVyxjQUE3QixFQUE2QyxNQUFNLEVBQW5ELEVBQXVELFdBQVcsQ0FBbEU7QUFESixTQURKO0FBTUg7QUFiZ0M7O2tCQWdCdEJFLE07Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3BCZjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDQUE7Ozs7OztBQUVBLE1BQU1DLGFBQU4sU0FBNEIsZ0JBQU1WLFNBQWxDLENBQTRDO0FBQ3hDQyxnQkFBWUMsS0FBWixFQUFtQjtBQUNmLGNBQU1BLEtBQU47QUFDQSxhQUFLUyxLQUFMLEdBQWE7QUFDVGpILHlCQUFhLEVBREo7QUFFVGtILDZCQUFpQjtBQUZSLFNBQWI7QUFJSDs7QUFFREMsaUJBQWFDLENBQWIsRUFBZ0I7QUFDWixhQUFLQyxRQUFMLENBQWMsRUFBRSxDQUFDRCxFQUFFRSxNQUFGLENBQVNDLElBQVYsR0FBaUJILEVBQUVFLE1BQUYsQ0FBU0UsS0FBNUIsRUFBZDtBQUNIOztBQUVEQyxxQkFBaUI5SCxNQUFqQixFQUF5Qjs7QUFFckIsWUFBSUEsT0FBTytILEtBQVAsQ0FBYSxvQkFBYixDQUFKLEVBQXdDO0FBQ3BDLGlCQUFLTCxRQUFMLENBQWMsRUFBRUgsaUJBQWlCLEVBQW5CLEVBQWQ7QUFDQSxpQkFBS1YsS0FBTCxDQUFXOUcsT0FBWCxDQUFtQkMsTUFBbkIsRUFBNEJRLE1BQUQsSUFBWTtBQUNuQyxxQkFBS3FHLEtBQUwsQ0FBV0csT0FBWCxDQUFtQmdCLE9BQW5CLENBQTJCLGdDQUEzQjtBQUNILGFBRkQ7QUFHSCxTQUxELE1BS087QUFDSCxpQkFBS04sUUFBTCxDQUFjLEVBQUVILGlCQUFpQiwyQ0FBbkIsRUFBZDtBQUNIO0FBQ0o7O0FBRURMLGFBQVM7O0FBRUwsZUFDSTtBQUFBO0FBQUE7QUFDSTtBQUFBO0FBQUEsa0JBQVEsV0FBVSxvREFBbEI7QUFDSTtBQUFBO0FBQUEsc0JBQUssV0FBVSxpQkFBZjtBQUNJO0FBQUE7QUFBQSwwQkFBSyxXQUFVLEtBQWY7QUFDSTtBQUFBO0FBQUEsOEJBQUssV0FBVSxPQUFmO0FBQ0k7QUFBQTtBQUFBLGtDQUFJLFdBQVUsYUFBZDtBQUNJO0FBQUE7QUFBQTtBQUFJO0FBQUE7QUFBQSwwQ0FBTSxXQUFVLDBDQUFoQjtBQUEyRCwrRUFBSyxLQUFJLDBDQUFULEVBQW9ELFdBQVUsV0FBOUQ7QUFBM0Q7QUFBSjtBQURKO0FBREoseUJBREo7QUFNSTtBQUFBO0FBQUEsOEJBQUssV0FBVSxPQUFmO0FBQ0k7QUFBQTtBQUFBLGtDQUFLLFdBQVUsNENBQWY7QUFBQTtBQUFBO0FBREoseUJBTko7QUFTSSwrREFBSyxXQUFVLE9BQWY7QUFUSjtBQURKO0FBREosYUFESjtBQWlCSTtBQUFBO0FBQUEsa0JBQVMsV0FBVSxpQ0FBbkI7QUFDSTtBQUFBO0FBQUEsc0JBQUssV0FBVSwyQkFBZjtBQUNJO0FBQUE7QUFBQSwwQkFBSyxXQUFVLHFDQUFmO0FBQ0k7QUFBQTtBQUFBLDhCQUFJLFdBQVUsZ0JBQWQ7QUFBQTtBQUF3RCxxRUFBeEQ7QUFBQTtBQUFBO0FBREoscUJBREo7QUFJSTtBQUFBO0FBQUEsMEJBQUssV0FBVSw0QkFBZjtBQUNJO0FBQUE7QUFBQSw4QkFBSyxXQUFVLHFCQUFmO0FBQ0k7QUFBQTtBQUFBLGtDQUFLLFdBQVUsNkJBQWY7QUFDSSx1RUFBSyxLQUFJLG9DQUFULEVBQThDLFdBQVUsV0FBeEQ7QUFESjtBQURKLHlCQURKO0FBTUk7QUFBQTtBQUFBLDhCQUFLLFdBQVUseUJBQWY7QUFDSTtBQUFBO0FBQUEsa0NBQUssV0FBVSxnQ0FBZjtBQUNJLHlFQUFPLE1BQUssTUFBWixFQUFtQixXQUFVLHNCQUE3QixFQUFvRCxhQUFZLFdBQWhFLEVBQTRFLE9BQU8sS0FBS0ksS0FBTCxDQUFXakgsV0FBOUYsRUFBMkcsVUFBVSxLQUFLbUgsWUFBTCxDQUFrQkwsSUFBbEIsQ0FBdUIsSUFBdkIsQ0FBckgsRUFBbUosTUFBSyxhQUF4SjtBQURKO0FBREo7QUFOSixxQkFKSjtBQWdCSTtBQUFBO0FBQUEsMEJBQU0sV0FBVSxjQUFoQjtBQUFnQyw2QkFBS04sS0FBTCxDQUFXakc7QUFBM0MscUJBaEJKO0FBaUJJO0FBQUE7QUFBQSwwQkFBTSxXQUFVLGNBQWhCO0FBQWdDLDZCQUFLMEcsS0FBTCxDQUFXQztBQUEzQztBQWpCSjtBQURKLGFBakJKO0FBc0NJO0FBQUE7QUFBQSxrQkFBUSxTQUFTLEtBQUtPLGdCQUFMLENBQXNCWCxJQUF0QixDQUEyQixJQUEzQixFQUFnQyxLQUFLRyxLQUFMLENBQVdqSCxXQUEzQyxDQUFqQixFQUEwRSxVQUFVLEtBQUt3RyxLQUFMLENBQVdvQixnQkFBL0YsRUFBaUgsV0FBVSw0RUFBM0g7QUFBQTtBQUFBO0FBdENKLFNBREo7QUEwQ0g7QUFyRXVDOztrQkF5RTdCWixhOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMzRWY7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0FBOzs7Ozs7QUFFQSxNQUFNYSxhQUFhO0FBQ2ZDLFdBQU8sTUFEUTtBQUVmQyxZQUFRO0FBRk8sQ0FBbkI7O0FBTUEsTUFBTUMsUUFBTixTQUF1QixnQkFBTTFCLFNBQTdCLENBQXVDO0FBQ25DQyxnQkFBWUMsS0FBWixFQUFtQjtBQUNmLGNBQU1BLEtBQU47QUFDQSxhQUFLUyxLQUFMLEdBQWEsRUFBYjtBQUdIOztBQU1ESixhQUFTOztBQUVMLGVBQ0k7QUFBQTtBQUFBLGNBQUssV0FBVSxrQkFBZjtBQUNJLHNEQUFRLEtBQUksMENBQVosRUFBdUQsT0FBT2dCLFVBQTlEO0FBREosU0FESjtBQUtIO0FBbkJrQzs7QUFBakNHLFEsQ0FRS0MsWSxHQUFlO0FBQ2xCQyxZQUFRLE1BQU07QUFESSxDO2tCQWVYRixROzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMvQmY7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0FBOzs7O0FBRUE7Ozs7OztBQUdBLE1BQU1HLGdCQUFOLFNBQStCLGdCQUFNN0IsU0FBckMsQ0FBK0M7QUFDM0NDLGdCQUFZQyxLQUFaLEVBQW1CO0FBQ2YsY0FBTUEsS0FBTjtBQUNBLGFBQUtTLEtBQUwsR0FBYSxFQUFiO0FBR0g7O0FBRURKLGFBQVM7O0FBRUwsWUFBSXVCLE9BQU8sS0FBSzVCLEtBQUwsQ0FBV1IsSUFBWCxDQUFnQnFDLEdBQWhCLENBQW9CLENBQUNDLEdBQUQsRUFBSzNHLENBQUwsS0FBVztBQUN0QyxnQkFBSSxLQUFLNkUsS0FBTCxDQUFXMUcsSUFBWCxJQUFtQixLQUF2QixFQUE4QjtBQUMxQix1QkFBTztBQUFBO0FBQUEsc0JBQUksS0FBSzZCLENBQVQ7QUFDSDtBQUFBO0FBQUE7QUFDSSx1Q0FBVSxnQkFEZDtBQUVJLHFDQUFTLE1BQU0sQ0FFZDtBQUpMO0FBTUksK0RBQUssS0FBSSxxQ0FBVCxFQUErQyxXQUFVLFdBQXpEO0FBTkoscUJBREc7QUFTSDtBQUFBO0FBQUEsMEJBQUcsV0FBVSxVQUFiO0FBQUE7QUFBQTtBQVRHLGlCQUFQO0FBV0gsYUFaRCxNQVlPO0FBQ0gsb0JBQUk0RyxXQUFXLEtBQWY7QUFDQSxxQkFBSy9CLEtBQUwsQ0FBVytCLFFBQVgsQ0FBb0JGLEdBQXBCLENBQXlCM0csSUFBRCxJQUFVO0FBQzlCLHdCQUFHQSxLQUFLRSxFQUFMLElBQVcwRyxJQUFJMUcsRUFBbEIsRUFBcUI7QUFDakIyRyxtQ0FBVyxJQUFYO0FBQ0g7QUFDSixpQkFKRDtBQUtBLHVCQUFPO0FBQUE7QUFBQSxzQkFBSSxLQUFLNUcsQ0FBVDtBQUNIO0FBQUE7QUFBQTtBQUNJLHVDQUFXNEcsV0FBVyw2Q0FBWCxHQUEyRCxvQ0FEMUU7QUFFSSxxQ0FBUyxNQUFNO0FBQ1gsdUNBQU8sS0FBSy9CLEtBQUwsQ0FBV2dDLE1BQVgsQ0FBbUIsS0FBS2hDLEtBQUwsQ0FBVzFHLElBQVgsSUFBbUJ3SSxJQUFJeEksSUFBMUMsRUFBaUR3SSxHQUFqRCxDQUFQO0FBQ0g7QUFKTDtBQU1LQSw0QkFBSWY7QUFOVDtBQURHLGlCQUFQO0FBVUg7QUFFSixTQWhDVSxDQUFYOztBQWtDQSxZQUFJa0IsV0FBWSxlQUFoQjtBQUNBLFlBQUlDLFVBQVcsYUFBZjs7QUFFQSxZQUFJLEtBQUtsQyxLQUFMLENBQVcxRyxJQUFYLElBQW1CLEtBQXZCLEVBQThCO0FBQzFCMkksdUJBQVksMEJBQVo7QUFDQUMsc0JBQVcsdUJBQVg7QUFDSDs7QUFFRCxlQUVJO0FBQUE7QUFBQSxjQUFLLFdBQVUsY0FBZjtBQUNJO0FBQUE7QUFBQSxrQkFBSSxXQUFVLGFBQWQ7QUFBNkIscUJBQUtsQyxLQUFMLENBQVdtQztBQUF4QyxhQURKO0FBRUk7QUFBQTtBQUFBLGtCQUFLLFdBQVdGLFFBQWhCO0FBQ0k7QUFBQTtBQUFBLHNCQUFJLFdBQVdDLE9BQWY7QUFDS047QUFETDtBQURKO0FBRkosU0FGSjtBQVdIO0FBL0QwQzs7a0JBbUVoQ0QsZ0I7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3hFZjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBQTs7OztBQUNBOztBQUNBOzs7Ozs7QUFFQSxNQUFNUyxZQUFZLENBQUNDLEVBQUQsRUFBS0MsS0FBTCxLQUFlO0FBQzdCLFFBQUlDLFFBQVEsSUFBWjtBQUNBLFdBQU8sWUFBWTtBQUNmQyxxQkFBYUQsS0FBYjtBQUNBQSxnQkFBUUUsV0FBVyxNQUFNO0FBQ3JCSixlQUFHSyxJQUFILENBQVEsSUFBUjtBQUNILFNBRk8sRUFFTEosS0FGSyxDQUFSO0FBR0gsS0FMRDtBQU1ILENBUkQ7O0FBV0EsTUFBTUssa0JBQU4sU0FBaUMsZ0JBQU03QyxTQUF2QyxDQUFpRDtBQUM3Q0MsZ0JBQVlDLEtBQVosRUFBbUI7QUFDZixjQUFNQSxLQUFOO0FBQ0EsYUFBS1MsS0FBTCxHQUFhO0FBQ1RtQyx5QkFBYSxFQURKO0FBRVRDLDJCQUFlO0FBRk4sU0FBYjtBQUlIOztBQUVEQyx3QkFBb0I7QUFDaEIsYUFBS0MsZ0JBQUwsR0FBd0JYLFVBQVUsS0FBS1csZ0JBQUwsQ0FBc0J6QyxJQUF0QixDQUEyQixJQUEzQixDQUFWLEVBQTRDLElBQTVDLENBQXhCO0FBQ0EsWUFBSTBDLFFBQVFDLFNBQVNDLGNBQVQsQ0FBd0IsbUJBQXhCLENBQVo7QUFDQTtBQUNIOztBQUVEdkMsaUJBQWFDLENBQWIsRUFBZ0I7QUFDWixhQUFLQyxRQUFMLENBQWMsRUFBRStCLGFBQWFoQyxFQUFFRSxNQUFGLENBQVNFLEtBQXhCLEVBQWQ7QUFDQSxhQUFLK0IsZ0JBQUw7QUFDSDs7QUFFREEsdUJBQW1CO0FBQ2YsWUFBSSxLQUFLL0MsS0FBTCxDQUFXMUcsSUFBWCxJQUFtQixLQUF2QixFQUE4QixDQUU3QixDQUZELE1BRU87QUFDSCxpQkFBSzBHLEtBQUwsQ0FBV25ELDJCQUFYLENBQXVDLEtBQUs0RCxLQUFMLENBQVdtQyxXQUFsRCxFQUFnRUMsYUFBRCxJQUFtQjtBQUM5RSxvQkFBSUEsYUFBSixFQUFtQjtBQUNmLHdCQUFJTSxRQUFRTixjQUFjTSxLQUFkLENBQW9CdEIsR0FBcEIsQ0FBd0I5RyxLQUFLO0FBQUUsNENBQVlBLENBQVosSUFBZXpCLE1BQU0sTUFBckI7QUFBK0IscUJBQTlELENBQVo7QUFDQSx5QkFBS3VILFFBQUwsQ0FBYyxFQUFFZ0MsZUFBZSxDQUFDLEdBQUdNLEtBQUosQ0FBakIsRUFBZDtBQUNIO0FBQ0osYUFMRDtBQU1IO0FBQ0o7O0FBRURDLGdCQUFZeEcsUUFBWixFQUFzQjtBQUNsQixZQUFJLEtBQUtvRCxLQUFMLENBQVcxRyxJQUFYLElBQW1CLEtBQXZCLEVBQThCLENBRTdCLENBRkQsTUFFTztBQUNILGlCQUFLMEcsS0FBTCxDQUFXckQsdUJBQVgsQ0FBbUNDLFNBQVN0RCxJQUE1QyxFQUFrRHNELFFBQWxEO0FBQ0EsaUJBQUtpRSxRQUFMLENBQWMsRUFBRStCLGFBQWEsRUFBZixFQUFkO0FBQ0g7QUFDSjs7QUFHRHZDLGFBQVM7O0FBRUwsWUFBSTVFLFdBQVcsU0FBZjtBQUNBLFlBQUksS0FBS3VFLEtBQUwsQ0FBV3pFLGdCQUFmLEVBQWlDO0FBQzdCRSx1QkFBVyxLQUFLdUUsS0FBTCxDQUFXekUsZ0JBQVgsQ0FBNEI4SCxpQkFBNUIsQ0FBOENDLEtBQTlDLENBQW9ELENBQXBELEVBQXVELENBQXZELENBQVg7QUFDSDs7QUFFRCxlQUNJO0FBQUE7QUFBQTtBQUNJO0FBQUE7QUFBQSxrQkFBUSxXQUFVLDZDQUFsQjtBQUNJO0FBQUE7QUFBQSxzQkFBSyxXQUFVLGlCQUFmO0FBQ0k7QUFBQTtBQUFBLDBCQUFLLFdBQVUsS0FBZjtBQUNJO0FBQUE7QUFBQSw4QkFBSyxXQUFVLFFBQWY7QUFDSTtBQUFBO0FBQUEsa0NBQUssV0FBVSxjQUFmO0FBQ0k7QUFBQTtBQUFBLHNDQUFJLFdBQVUseUNBQWQ7QUFDSSxpREFBUyxNQUFNO0FBQ1gsaURBQUt0RCxLQUFMLENBQVdHLE9BQVgsQ0FBbUJvRCxFQUFuQixDQUFzQixDQUFDLENBQXZCO0FBQ0g7QUFITDtBQUtJO0FBQUE7QUFBQTtBQUFJO0FBQUE7QUFBQSw4Q0FBTSxXQUFVLDRCQUFoQjtBQUE2QyxtRkFBSyxLQUFJLDJDQUFULEVBQXFELFdBQVUsV0FBL0Q7QUFBN0M7QUFBSixxQ0FMSjtBQU1JO0FBQUE7QUFBQTtBQUFJO0FBQUE7QUFBQSw4Q0FBSyxXQUFVLGNBQWY7QUFBQTtBQUFBO0FBQUo7QUFOSixpQ0FESjtBQVNJO0FBQUE7QUFBQSxzQ0FBSSxXQUFVLCtEQUFkO0FBQ0ksaURBQVMsTUFBTTtBQUNYLGlEQUFLdkQsS0FBTCxDQUFXRyxPQUFYLENBQW1CQyxJQUFuQixDQUF3QixpQkFBeEI7QUFDSDtBQUhMO0FBS0k7QUFBQTtBQUFBO0FBQUk7QUFBQTtBQUFBLDhDQUFLLFdBQVUsY0FBZjtBQUE4QjtBQUFBO0FBQUEsa0RBQU0sV0FBVSxpQ0FBaEI7QUFBa0QsdUZBQUssS0FBSSwyQ0FBVCxFQUFxRCxXQUFVLFdBQS9EO0FBQWxELDZDQUE5QjtBQUFBO0FBQXNLM0U7QUFBdEs7QUFBSjtBQUxKO0FBVEo7QUFESjtBQURKLHFCQURKO0FBc0JJO0FBQUE7QUFBQSwwQkFBSyxXQUFVLEtBQWY7QUFDSTtBQUFBO0FBQUEsOEJBQUssV0FBVSxRQUFmO0FBQ0k7QUFBQTtBQUFBLGtDQUFLLFdBQVUsWUFBZjtBQUNJO0FBQUE7QUFBQSxzQ0FBSyxXQUFVLFlBQWY7QUFDSSw2RUFBTyxNQUFLLE1BQVosRUFBbUIsV0FBVSxvQ0FBN0IsRUFBa0UsSUFBRyxtQkFBckUsRUFBeUYsVUFBVSxLQUFLa0YsWUFBTCxDQUFrQkwsSUFBbEIsQ0FBdUIsSUFBdkIsQ0FBbkcsRUFBaUksT0FBTyxLQUFLRyxLQUFMLENBQVdtQyxXQUFuSixFQUFnSyxhQUFhLEtBQUs1QyxLQUFMLENBQVd3RCxLQUF4TCxHQURKO0FBRUk7QUFBQTtBQUFBLDBDQUFNLFdBQVUsOEJBQWhCO0FBQStDLCtFQUFLLEtBQUksNENBQVQ7QUFBL0M7QUFGSjtBQURKO0FBREo7QUFESjtBQXRCSjtBQURKLGFBREo7QUFzQ1EsaUJBQUsvQyxLQUFMLENBQVdtQyxXQUFYLEdBRUk7QUFBQTtBQUFBLGtCQUFTLFdBQVUsZUFBbkI7QUFDSTtBQUFBO0FBQUEsc0JBQUssV0FBVSxjQUFmO0FBQ0k7QUFBQTtBQUFBLDBCQUFJLFdBQVUsYUFBZDtBQUFBO0FBQUEscUJBREo7QUFFSTtBQUFBO0FBQUEsMEJBQUssV0FBVSxlQUFmO0FBQ0k7QUFBQTtBQUFBLDhCQUFJLFdBQVUseUJBQWQ7QUFFUSxpQ0FBS25DLEtBQUwsQ0FBV29DLGFBQVgsQ0FBeUJoQixHQUF6QixDQUE2QixDQUFDM0csSUFBRCxFQUFPQyxDQUFQLEtBQWE7QUFDdEMsdUNBQU87QUFBQTtBQUFBLHNDQUFJLFNBQVMsS0FBS2lJLFdBQUwsQ0FBaUI5QyxJQUFqQixDQUFzQixJQUF0QixFQUE0QnBGLElBQTVCLENBQWIsRUFBZ0QsS0FBS0MsQ0FBckQ7QUFBd0Q7QUFBQTtBQUFBO0FBQUlELDZDQUFLNkY7QUFBVDtBQUF4RCxpQ0FBUDtBQUNILDZCQUZEO0FBRlI7QUFESjtBQUZKO0FBREosYUFGSixHQWdCTyxLQUFLZixLQUFMLENBQVd5RCxZQUFYLEdBQTBCLEtBQUt6RCxLQUFMLENBQVcwRCxRQUFyQyxHQUFnRDtBQXREL0QsU0FESjtBQTRESDtBQTlHNEM7O2tCQWtIbENmLGtCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNqSWY7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0FBOzs7Ozs7QUFFQSxNQUFNZ0IsYUFBTixTQUE0QixnQkFBTTdELFNBQWxDLENBQTRDO0FBQ3hDQyxnQkFBWUMsS0FBWixFQUFtQjtBQUNmLGNBQU1BLEtBQU47QUFDQSxhQUFLUyxLQUFMLEdBQWEsRUFBYjs7QUFJQTFCLGdCQUFRQyxHQUFSLENBQVksS0FBS2dCLEtBQWpCO0FBQ0E7QUFDSDs7QUFFRFcsaUJBQWFDLENBQWIsRUFBZ0I7QUFDWixhQUFLQyxRQUFMLENBQWMsRUFBRSxDQUFDRCxFQUFFRSxNQUFGLENBQVNDLElBQVYsR0FBaUJILEVBQUVFLE1BQUYsQ0FBU0UsS0FBNUIsRUFBZDtBQUNIOztBQUVEWCxhQUFTOztBQUVMLGVBQ0ksMENBREo7QUFJSDtBQXJCdUM7O2tCQXlCN0JzRCxhOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMzQmY7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0FBOzs7O0FBQ0E7Ozs7OztBQUVBLE1BQU1DLGFBQU4sU0FBNEIsZ0JBQU05RCxTQUFsQyxDQUE0QztBQUN4Q0MsZ0JBQVlDLEtBQVosRUFBbUI7QUFDZixjQUFNQSxLQUFOO0FBQ0g7O0FBRUQ2RCxlQUFXQyxTQUFYLEVBQXNCO0FBQ2xCLGFBQUtDLE9BQUwsQ0FBYXJDLE1BQWIsQ0FBb0J2QixPQUFwQixDQUE0QkMsSUFBNUIsQ0FBa0MsU0FBUTBELFNBQVUsR0FBRSxLQUFLOUQsS0FBTCxDQUFXZ0UsUUFBUyxFQUExRTtBQUVIOztBQU1EM0QsYUFBUzs7QUFFTCxZQUFJaEcsV0FBVyxFQUFmOztBQUVBQSxtQkFBV2tELE9BQU8wRyxJQUFQLENBQVksS0FBS2pFLEtBQUwsQ0FBVzNGLFFBQXZCLEVBQWlDd0gsR0FBakMsQ0FBcUMsQ0FBQ2lDLFNBQUQsRUFBWTNJLENBQVosS0FBa0I7QUFDOUQsZ0JBQUkrSSxNQUFNLEtBQUtsRSxLQUFMLENBQVczRixRQUFYLENBQW9CeUosU0FBcEIsRUFBK0JLLFlBQS9CLElBQStDLDJEQUF6RDtBQUNBLG1CQUFPO0FBQUE7QUFBQSxrQkFBSyxLQUFLaEosQ0FBVixFQUFhLFdBQVUsV0FBdkIsRUFBbUMsU0FBUyxLQUFLMEksVUFBTCxDQUFnQnZELElBQWhCLENBQXFCLElBQXJCLEVBQTJCd0QsU0FBM0IsQ0FBNUM7QUFDSCx1REFBSyxXQUFVLGtCQUFmLEVBQWtDLEtBQUtJLEdBQXZDO0FBREcsYUFBUDtBQUdILFNBTFUsQ0FBWDs7QUFRQSxlQUNJO0FBQUE7QUFBQSxjQUFLLFdBQVUsZUFBZjtBQUNLN0o7QUFETCxTQURKO0FBS0g7QUEvQnVDOztBQUF0Q3VKLGEsQ0FVS25DLFksR0FBZTtBQUNsQkMsWUFBUSxNQUFNO0FBREksQztrQkF5QlhrQyxhOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN0Q2Y7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0FBOzs7O0FBRUE7Ozs7QUFFQSxNQUFNUSxlQUFlLEVBQXJCO0FBQ0EsTUFBTUMsWUFBWSxDQUFDLEdBQUQsRUFBTSxHQUFOLEVBQVcsR0FBWCxFQUFnQixHQUFoQixFQUFxQixHQUFyQixFQUEwQixHQUExQixFQUErQixHQUEvQixDQUFsQjtBQUNBLE1BQU1DLFNBQVMsQ0FBQyxLQUFELEVBQVEsS0FBUixFQUFlLEtBQWYsRUFBc0IsT0FBdEIsRUFBK0IsS0FBL0IsRUFBc0MsTUFBdEMsRUFBOEMsTUFBOUMsRUFBc0QsS0FBdEQsRUFBNkQsTUFBN0QsRUFBcUUsS0FBckUsRUFBNEUsS0FBNUUsRUFBbUYsS0FBbkYsQ0FBZjs7QUFFQSxNQUFNQyxnQkFBTixTQUErQixnQkFBTXpFLFNBQXJDLENBQStDO0FBQzNDQyxnQkFBWUMsS0FBWixFQUFtQjtBQUNmLGNBQU1BLEtBQU47QUFDQSxhQUFLUyxLQUFMLEdBQWE7QUFDVCtELHdCQUFZLEVBREg7QUFFVEMsMkJBQWUsRUFGTjtBQUdUQyx5QkFBYTtBQUhKLFNBQWI7QUFLSDs7QUFFRDVCLHdCQUFvQjtBQUNoQixhQUFLNkIsWUFBTDtBQUNIOztBQUVEQSxtQkFBZTtBQUNYLFlBQUlDLE9BQU8sRUFBWDs7QUFFQSxhQUFLLElBQUl6SixJQUFJLENBQWIsRUFBZ0JBLElBQUlpSixZQUFwQixFQUFrQ2pKLEdBQWxDLEVBQXVDO0FBQ25DLGdCQUFJMEosWUFBWSxJQUFJQyxJQUFKLEVBQWhCO0FBQ0FELHNCQUFVRSxPQUFWLENBQWtCRixVQUFVRyxPQUFWLEtBQXNCN0osQ0FBeEM7QUFDQSxnQkFBSThKLFVBQVVKLFVBQVVLLE1BQVYsRUFBZDs7QUFFQU4saUJBQUt4RSxJQUFMLENBQVU7QUFDTitFLHFCQUFLZCxVQUFVWSxPQUFWLENBREM7QUFFTkcsNEJBQVlQLFVBQVVHLE9BQVYsRUFGTjtBQUdOSyw0QkFBWVIsU0FITjtBQUlOUyx1QkFBT2hCLE9BQU9PLFVBQVVVLFFBQVYsRUFBUDtBQUpELGFBQVY7QUFNSDs7QUFFRCxhQUFLMUUsUUFBTCxDQUFjO0FBQ1YyRCx3QkFBWUksSUFERjtBQUVWRix5QkFBYUUsS0FBSyxDQUFMLENBRkg7QUFHVkgsMkJBQWVHLEtBQUssQ0FBTCxFQUFRVTtBQUhiLFNBQWQ7QUFLSDs7QUFFREUsY0FBVUMsR0FBVixFQUFlO0FBQ1gsYUFBSzVFLFFBQUwsQ0FBYyxFQUFFNkQsYUFBYWUsR0FBZixFQUFkO0FBQ0g7O0FBRURDLGdCQUFZSixLQUFaLEVBQWtCMUUsQ0FBbEIsRUFBb0I7QUFDaEJBLFVBQUUrRSxlQUFGO0FBQ0EsYUFBSzlFLFFBQUwsQ0FBYyxFQUFFNEQsZUFBZWEsS0FBakIsRUFBZDtBQUNIOztBQUVEakYsYUFBUztBQUNMLFlBQUl1RixtQkFBbUIsRUFBRSxHQUFHLEVBQUwsRUFBUyxHQUFHLEVBQVosRUFBZ0IsR0FBRyxFQUFuQixFQUF2QjtBQUNBLFlBQUksS0FBS25GLEtBQUwsQ0FBV2lFLFdBQVgsSUFBMEIsS0FBS2pFLEtBQUwsQ0FBV2lFLFdBQVgsQ0FBdUJXLFVBQXJELEVBQWlFO0FBQzdELGdCQUFJUSxnQkFBZ0IsS0FBS3BGLEtBQUwsQ0FBV2lFLFdBQVgsQ0FBdUJXLFVBQXZCLENBQWtDSCxNQUFsQyxFQUFwQjtBQUNBVSwrQkFBbUIsS0FBSzVGLEtBQUwsQ0FBVzhGLFNBQVgsQ0FBcUJELGFBQXJCLEVBQW9DRSxNQUF2RDtBQUNIOztBQUVEO0FBQ0EsWUFBSUMsWUFBWTFCLE9BQVEsSUFBSVEsSUFBSixFQUFELENBQVdTLFFBQVgsRUFBUCxDQUFoQjtBQUNBLFlBQUlVLFlBQVkzQixPQUFRLElBQUlRLElBQUosRUFBRCxDQUFXUyxRQUFYLEtBQXNCLENBQTdCLENBQWhCOztBQUVBLGVBQ0k7QUFBQTtBQUFBO0FBQ0k7QUFBQTtBQUFBLGtCQUFLLFdBQVUsNENBQWY7QUFDSTtBQUFBO0FBQUEsc0JBQUssV0FBVSxnQkFBZjtBQUNJO0FBQUE7QUFBQSwwQkFBSyxXQUFVLHFCQUFmO0FBQ0k7QUFBQTtBQUFBLDhCQUFJLFdBQVUsdUJBQWQ7QUFBQTtBQUNBO0FBQUE7QUFBQSxrQ0FBTSxTQUFTLEtBQUtHLFdBQUwsQ0FBaUJwRixJQUFqQixDQUFzQixJQUF0QixFQUEyQjBGLFNBQTNCLENBQWYsRUFBc0QsV0FBVyxzQ0FBc0NBLGNBQWMsS0FBS3ZGLEtBQUwsQ0FBV2dFLGFBQXpCLEdBQXlDLFNBQXpDLEdBQXFELE9BQTNGLENBQWpFO0FBQXVLdUIseUNBQXZLO0FBQ0E7QUFBQTtBQUFBLHNDQUFNLFNBQVMsS0FBS04sV0FBTCxDQUFpQnBGLElBQWpCLENBQXNCLElBQXRCLEVBQTJCMkYsU0FBM0IsQ0FBZixFQUFzRCxXQUFXLFdBQVdBLGNBQWMsS0FBS3hGLEtBQUwsQ0FBV2dFLGFBQXpCLEdBQXlDLFNBQXpDLEdBQXFELE9BQWhFLENBQWpFO0FBQTRJd0I7QUFBNUk7QUFEQTtBQURBLHlCQURKO0FBSUk7QUFBQTtBQUFBLDhCQUFLLFdBQVUsYUFBZjtBQUNJO0FBQUE7QUFBQSxrQ0FBSSxXQUFVLDRCQUFkO0FBR1EscUNBQUt4RixLQUFMLENBQVcrRCxVQUFYLENBQXNCMUosTUFBdEIsQ0FBOEJvTCxFQUFELElBQVE7QUFDakMsMkNBQU9BLEdBQUdaLEtBQUgsS0FBYSxLQUFLN0UsS0FBTCxDQUFXZ0UsYUFBL0I7QUFDSCxpQ0FGRCxFQUVHNUMsR0FGSCxDQUVPLENBQUNxRSxFQUFELEVBQUsvSyxDQUFMLEtBQVc7QUFDZCwyQ0FBTztBQUFBO0FBQUE7QUFDSCx1REFBVyxLQUFLc0YsS0FBTCxDQUFXaUUsV0FBWCxJQUEwQndCLEVBQTFCLEdBQStCLFFBQS9CLEdBQTBDLEVBRGxEO0FBRUgsaURBQUsvSyxDQUZGO0FBR0gscURBQVMsS0FBS3FLLFNBQUwsQ0FBZWxGLElBQWYsQ0FBb0IsSUFBcEIsRUFBMEI0RixFQUExQjtBQUhOO0FBS0ZBLDJDQUFHZCxVQUxEO0FBQUE7QUFLYTtBQUFBO0FBQUE7QUFBT2MsK0NBQUdmO0FBQVY7QUFMYixxQ0FBUDtBQU9ILGlDQVZEO0FBSFI7QUFESjtBQUpKO0FBREo7QUFESixhQURKO0FBNkJJO0FBQUE7QUFBQSxrQkFBSyxXQUFVLFFBQWY7QUFDSTtBQUFBO0FBQUEsc0JBQUssV0FBVSxnQkFBZjtBQUNJO0FBQUE7QUFBQSwwQkFBSSxXQUFVLGtCQUFkO0FBQUE7QUFBQSxxQkFESjtBQUVJO0FBQUE7QUFBQSwwQkFBSSxXQUFVLHdCQUFkO0FBRVFTLHlDQUFpQixDQUFqQixFQUFvQi9ELEdBQXBCLENBQXdCLENBQUNzRSxJQUFELEVBQU9oTCxDQUFQLEtBQWE7QUFDakMsbUNBQU87QUFBQTtBQUFBLGtDQUFJLEtBQUtBLENBQVQ7QUFBWTtBQUFBO0FBQUEsc0NBQUcsTUFBSyxFQUFSLEVBQVcsV0FBVSxvQ0FBckI7QUFBMkRnTCx5Q0FBSyxDQUFMLENBQTNEO0FBQUE7QUFBQTtBQUFaLDZCQUFQO0FBQ0gseUJBRkQ7QUFGUixxQkFGSjtBQVNJO0FBQUE7QUFBQSwwQkFBSSxXQUFVLGtCQUFkO0FBQUE7QUFBQSxxQkFUSjtBQVVJO0FBQUE7QUFBQSwwQkFBSSxXQUFVLHdCQUFkO0FBRVFQLHlDQUFpQixDQUFqQixFQUFvQi9ELEdBQXBCLENBQXdCLENBQUNzRSxJQUFELEVBQU9oTCxDQUFQLEtBQWE7QUFDakMsbUNBQU87QUFBQTtBQUFBLGtDQUFJLEtBQUtBLENBQVQ7QUFBWTtBQUFBO0FBQUEsc0NBQUcsTUFBSyxFQUFSLEVBQVcsV0FBVSxvQ0FBckI7QUFBMkRnTCx5Q0FBSyxDQUFMLENBQTNEO0FBQUE7QUFBQTtBQUFaLDZCQUFQO0FBQ0gseUJBRkQ7QUFGUixxQkFWSjtBQWlCSTtBQUFBO0FBQUEsMEJBQUksV0FBVSxrQkFBZDtBQUFBO0FBQUEscUJBakJKO0FBa0JJO0FBQUE7QUFBQSwwQkFBSSxXQUFVLHdCQUFkO0FBRVFQLHlDQUFpQixDQUFqQixFQUFvQi9ELEdBQXBCLENBQXdCLENBQUNzRSxJQUFELEVBQU9oTCxDQUFQLEtBQWE7QUFDakMsbUNBQU87QUFBQTtBQUFBLGtDQUFJLEtBQUtBLENBQVQ7QUFBWTtBQUFBO0FBQUEsc0NBQUcsTUFBSyxFQUFSLEVBQVcsV0FBVSxvQ0FBckI7QUFBMkRnTCx5Q0FBSyxDQUFMLENBQTNEO0FBQUE7QUFBQTtBQUFaLDZCQUFQO0FBQ0gseUJBRkQ7QUFGUjtBQWxCSjtBQURKO0FBN0JKLFNBREo7QUE0REg7QUFySDBDOztrQkF5SGhDNUIsZ0I7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2pJZjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDQUE7Ozs7QUFFQTs7OztBQUNBOzs7Ozs7QUFFQSxNQUFNNkIsb0JBQU4sU0FBbUMsZ0JBQU10RyxTQUF6QyxDQUFtRDtBQUMvQ0MsZ0JBQVlDLEtBQVosRUFBbUI7QUFDZixjQUFNQSxLQUFOO0FBQ0EsYUFBS1MsS0FBTCxHQUFhLEVBQWI7QUFHSDs7QUFFRHFDLHdCQUFvQjtBQUNoQixhQUFLOUMsS0FBTCxDQUFXMUYsOEJBQVg7QUFDSDs7QUFNRCtMLHlCQUFxQkMsSUFBckIsRUFBMEI7QUFDdEIsWUFBSUMsUUFBUSxJQUFJekIsSUFBSixHQUFXMEIsT0FBWCxFQUFaO0FBQ0FGLGVBQU8sSUFBSXhCLElBQUosQ0FBU3dCLElBQVQsRUFBZUUsT0FBZixFQUFQO0FBQ0EsZUFBT0QsUUFBUUQsSUFBZjtBQUNIOztBQUVEakcsYUFBUzs7QUFFTCxZQUFJb0csZUFBZSxJQUFuQjtBQUNBLFlBQUlDLGdCQUFnQixLQUFLMUcsS0FBTCxDQUFXa0IsS0FBWCxDQUFpQnlGLE1BQWpCLENBQXdCdkwsRUFBNUM7O0FBRUEsWUFBSSxLQUFLNEUsS0FBTCxDQUFXNEcsSUFBWCxDQUFnQnZNLFFBQWhCLENBQXlCcU0sYUFBekIsQ0FBSixFQUE2QztBQUN6Q0QsMkJBQWUsS0FBS3pHLEtBQUwsQ0FBVzRHLElBQVgsQ0FBZ0J2TSxRQUFoQixDQUF5QnFNLGFBQXpCLENBQWY7QUFDSCxTQUZELE1BRU87QUFDSG5KLG1CQUFPMEcsSUFBUCxDQUFZLEtBQUtqRSxLQUFMLENBQVc0RyxJQUFYLENBQWdCdk0sUUFBNUIsRUFBc0N3SCxHQUF0QyxDQUEyQ2lDLFNBQUQsSUFBZTtBQUNyRCxvQkFBSSxLQUFLOUQsS0FBTCxDQUFXNEcsSUFBWCxDQUFnQnZNLFFBQWhCLENBQXlCeUosU0FBekIsRUFBb0MrQyxhQUF4QyxFQUF1RDtBQUNuREosbUNBQWUsS0FBS3pHLEtBQUwsQ0FBVzRHLElBQVgsQ0FBZ0J2TSxRQUFoQixDQUF5QnlKLFNBQXpCLENBQWY7QUFDSDtBQUNKLGFBSkQ7QUFLSDs7QUFFRCxlQUNJO0FBQUE7QUFBQSxjQUFLLFdBQVUsYUFBZjtBQUVVMkMsNEJBQWdCQSxhQUFhSyxZQUEvQixHQUFnRDtBQUFBO0FBQUE7QUFDNUM7QUFDSSw4QkFBVSxLQUFLOUcsS0FBTCxDQUFXNEcsSUFBWCxDQUFnQnZNLFFBRDlCO0FBRUksOEJBQVM7QUFGYixrQkFENEM7QUFLNUM7QUFBQTtBQUFBLHNCQUFHLFdBQVUsYUFBYjtBQUFBO0FBQUEsaUJBTDRDO0FBT3hDb00sNkJBQWFLLFlBQWIsQ0FBMEJoTSxNQUExQixDQUFpQyxDQUFDaU0sV0FBRCxFQUFhNUwsQ0FBYixLQUFrQjtBQUMvQyx3QkFBSW1MLE9BQU9TLFlBQVlDLElBQVosR0FBbUJELFlBQVlDLElBQVosQ0FBaUJDLEtBQXBDLEdBQTRDLENBQXZEO0FBQ0EsMkJBQU8sQ0FBQyxLQUFLWixvQkFBTCxDQUEwQkMsSUFBMUIsQ0FBUjtBQUNILGlCQUhELEVBR0d6RSxHQUhILENBR08sQ0FBQ2tGLFdBQUQsRUFBY0csS0FBZCxLQUF3QjtBQUMzQiwyQkFBTyxpREFBaUIsS0FBS0EsS0FBdEIsRUFBNkIsTUFBTUgsV0FBbkMsR0FBUDtBQUNILGlCQUxELENBUHdDO0FBYzVDO0FBQUE7QUFBQSxzQkFBRyxXQUFVLFNBQWI7QUFBQTtBQUFBLGlCQWQ0QztBQWdCeENOLDZCQUFhSyxZQUFiLENBQTBCaE0sTUFBMUIsQ0FBaUMsQ0FBQ2lNLFdBQUQsRUFBYTVMLENBQWIsS0FBa0I7QUFDL0Msd0JBQUltTCxPQUFPUyxZQUFZQyxJQUFaLEdBQW1CRCxZQUFZQyxJQUFaLENBQWlCQyxLQUFwQyxHQUE0QyxDQUF2RDtBQUNBLDJCQUFPLEtBQUtaLG9CQUFMLENBQTBCQyxJQUExQixDQUFQO0FBQ0gsaUJBSEQsRUFHR3pFLEdBSEgsQ0FHTyxDQUFDa0YsV0FBRCxFQUFjRyxLQUFkLEtBQXdCO0FBQzNCLDJCQUFPLGlEQUFpQixLQUFLQSxLQUF0QixFQUE2QixNQUFNSCxXQUFuQyxHQUFQO0FBQ0gsaUJBTEQ7QUFoQndDLGFBQWhELEdBdUJTO0FBekJqQixTQURKO0FBK0JIO0FBcEU4Qzs7QUFBN0NYLG9CLENBWUszRSxZLEdBQWU7QUFDbEJDLFlBQVEsTUFBTTtBQURJLEM7a0JBNERYMEUsb0I7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzdFZjs7OztBQUNBOzs7Ozs7QUFFQSxNQUFNZSxlQUFOLFNBQThCLGdCQUFNckgsU0FBcEMsQ0FBOEM7QUFDMUNDLGdCQUFZQyxLQUFaLEVBQW1CO0FBQ2YsY0FBTUEsS0FBTjtBQUNIOztBQUVEd0csWUFBUVksY0FBUixFQUF3QjtBQUNwQixZQUFJZCxPQUFPLElBQUl4QixJQUFKLENBQVNzQyxpQkFBaUIsSUFBMUIsQ0FBWDtBQUNBLFlBQUlDLFFBQVFmLEtBQUtnQixRQUFMLEVBQVo7QUFDQSxZQUFJQyxVQUFVLE1BQU1qQixLQUFLa0IsVUFBTCxFQUFwQjtBQUNBLGVBQU9ILFFBQVEsR0FBUixHQUFjRSxRQUFRRSxNQUFSLENBQWUsQ0FBQyxDQUFoQixDQUFyQjtBQUNIOztBQUVEcEgsYUFBUzs7QUFFTCxZQUFJLEVBQUVxSCxVQUFGLEVBQWNWLElBQWQsS0FBdUIsS0FBS2hILEtBQUwsQ0FBV1IsSUFBdEM7QUFDQXdILGVBQU9BLFFBQVE7QUFDWEMsbUJBQU8sQ0FESTtBQUVYVSxpQkFBSztBQUZNLFNBQWY7QUFJQSxZQUFJckIsT0FBTyxJQUFJeEIsSUFBSixDQUFTa0MsS0FBS0MsS0FBZCxFQUFxQlcsWUFBckIsRUFBWDs7QUFFQSxlQUNJO0FBQUE7QUFBQSxjQUFLLFdBQVUsYUFBZjtBQUNJLG1EQUFLLFdBQVUsTUFBZixHQURKO0FBSUk7QUFBQTtBQUFBLGtCQUFLLFdBQVUsU0FBZjtBQUNJO0FBQUE7QUFBQTtBQUNLRjtBQURMLGlCQURKO0FBSUk7QUFBQTtBQUFBO0FBQ0twQjtBQURMLGlCQUpKO0FBT0k7QUFBQTtBQUFBO0FBQ0sseUJBQUtFLE9BQUwsQ0FBYVEsS0FBS0MsS0FBbEIsSUFBMkIsTUFBM0IsR0FBb0MsS0FBS1QsT0FBTCxDQUFhUSxLQUFLVyxHQUFsQjtBQUR6QztBQVBKLGFBSko7QUFlSTtBQUFBO0FBQUEsa0JBQUssV0FBVSxNQUFmO0FBQ0k7QUFBQTtBQUFBLHNCQUFNLFdBQVUsTUFBaEI7QUFBQTtBQUFBLGlCQURKO0FBRUksOEVBQWdCLFdBQVUsVUFBMUI7QUFGSjtBQWZKLFNBREo7QUFzQkg7QUEzQ3lDOztrQkErQy9CUixlOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNsRGY7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBQTs7OztBQUVBOzs7O0FBQ0E7Ozs7OztBQUVBLE1BQU1VLGVBQU4sU0FBOEIsZ0JBQU0vSCxTQUFwQyxDQUE4QztBQUMxQ0MsZ0JBQVlDLEtBQVosRUFBbUI7QUFDZixjQUFNQSxLQUFOO0FBQ0EsYUFBS1MsS0FBTCxHQUFhLEVBQWI7QUFHSDs7QUFFRHFDLHdCQUFvQjtBQUNoQixhQUFLOUMsS0FBTCxDQUFXNUYsY0FBWDtBQUNIOztBQU1EaUcsYUFBUzs7QUFFTCxZQUFJb0csZUFBZSxJQUFuQjtBQUNBLFlBQUlDLGdCQUFnQixLQUFLMUcsS0FBTCxDQUFXa0IsS0FBWCxDQUFpQnlGLE1BQWpCLENBQXdCdkwsRUFBNUM7O0FBRUEsWUFBSSxLQUFLNEUsS0FBTCxDQUFXNEcsSUFBWCxDQUFnQnZNLFFBQWhCLENBQXlCcU0sYUFBekIsQ0FBSixFQUE2QztBQUN6Q0QsMkJBQWUsS0FBS3pHLEtBQUwsQ0FBVzRHLElBQVgsQ0FBZ0J2TSxRQUFoQixDQUF5QnFNLGFBQXpCLENBQWY7QUFDSCxTQUZELE1BRU87QUFDSG5KLG1CQUFPMEcsSUFBUCxDQUFZLEtBQUtqRSxLQUFMLENBQVc0RyxJQUFYLENBQWdCdk0sUUFBNUIsRUFBc0N3SCxHQUF0QyxDQUEyQ2lDLFNBQUQsSUFBZTtBQUNyRCxvQkFBSSxLQUFLOUQsS0FBTCxDQUFXNEcsSUFBWCxDQUFnQnZNLFFBQWhCLENBQXlCeUosU0FBekIsRUFBb0MrQyxhQUF4QyxFQUF1RDtBQUNuREosbUNBQWUsS0FBS3pHLEtBQUwsQ0FBVzRHLElBQVgsQ0FBZ0J2TSxRQUFoQixDQUF5QnlKLFNBQXpCLENBQWY7QUFDSDtBQUNKLGFBSkQ7QUFLSDs7QUFFRCxlQUNJO0FBQUE7QUFBQSxjQUFLLFdBQVUsYUFBZjtBQUVRMkMsMkJBQWU7QUFBQTtBQUFBO0FBQ1g7QUFDSSw4QkFBVSxLQUFLekcsS0FBTCxDQUFXNEcsSUFBWCxDQUFnQnZNLFFBRDlCO0FBRUksOEJBQVM7QUFGYixrQkFEVztBQUtYO0FBQ0ksaUNBQWFvTTtBQURqQjtBQUxXLGFBQWYsR0FRUztBQVZqQixTQURKO0FBZ0JIO0FBL0N5Qzs7QUFBeENvQixlLENBWUtwRyxZLEdBQWU7QUFDbEJDLFlBQVEsTUFBTTtBQURJLEM7a0JBdUNYbUcsZTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDeERmOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7O0FBRUEsTUFBTUMsV0FBTixTQUEwQixnQkFBTWhJLFNBQWhDLENBQTBDO0FBQ3RDQyxnQkFBWUMsS0FBWixFQUFtQjtBQUNmLGNBQU1BLEtBQU47QUFDSDs7QUFFRCtILHFCQUFpQmpFLFNBQWpCLEVBQTRCO0FBQ3hCLGFBQUtDLE9BQUwsQ0FBYXJDLE1BQWIsQ0FBb0J2QixPQUFwQixDQUE0QkMsSUFBNUIsQ0FBa0MsU0FBUTBELFNBQVUsZUFBcEQ7QUFFSDs7QUFFRGtFLGdCQUFZbEUsU0FBWixFQUF1QjtBQUNuQixhQUFLQyxPQUFMLENBQWFyQyxNQUFiLENBQW9CdkIsT0FBcEIsQ0FBNEJDLElBQTVCLENBQWtDLFNBQVEwRCxTQUFVLFVBQXBEO0FBRUg7O0FBTUR6RCxhQUFTOztBQUVMLFlBQUksRUFBQ1UsSUFBRCxFQUFPa0gsTUFBUCxFQUFlQyxHQUFmLEVBQW9CQyxNQUFwQixFQUE0QkMsbUJBQTVCLEVBQWlEQyxnQkFBakQsRUFBbUVDLHVCQUFuRSxFQUE0RkMsYUFBNUYsRUFBMkd6RSxTQUEzRyxLQUF3SCxLQUFLOUQsS0FBTCxDQUFXd0ksV0FBdkk7O0FBRUEsZUFDSTtBQUFBO0FBQUE7QUFDSTtBQUFBO0FBQUEsa0JBQUssV0FBVSxXQUFmO0FBQ0k7QUFBQTtBQUFBO0FBQUl6SDtBQUFKLGlCQURKO0FBRUk7QUFBQTtBQUFBO0FBQUltSCx1QkFBSjtBQUFBO0FBQUEsaUJBRko7QUFHSTtBQUFBO0FBQUE7QUFBSUQ7QUFBSixpQkFISjtBQUlJO0FBQUE7QUFBQTtBQUFJRTtBQUFKO0FBSkosYUFESjtBQU9JO0FBQUE7QUFBQSxrQkFBSyxXQUFVLGFBQWY7QUFDSTtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQURKO0FBRUk7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkFGSjtBQUdJO0FBQUE7QUFBQTtBQUFBO0FBQThCRywyQ0FBOUI7QUFBQTtBQUFBLGlCQUhKO0FBSUk7QUFBQTtBQUFBLHNCQUFRLFNBQVMsS0FBS1AsZ0JBQUwsQ0FBc0J6SCxJQUF0QixDQUEyQixJQUEzQixFQUFnQ3dELFNBQWhDLENBQWpCO0FBQUE7QUFBMEV5RSxpQ0FBMUU7QUFBQTtBQUFBLGlCQUpKO0FBS0k7QUFBQTtBQUFBO0FBQUE7QUFBMEJILHVDQUExQjtBQUFBO0FBQUEsaUJBTEo7QUFNSTtBQUFBO0FBQUEsc0JBQVEsU0FBUyxLQUFLSixXQUFMLENBQWlCMUgsSUFBakIsQ0FBc0IsSUFBdEIsRUFBMkJ3RCxTQUEzQixDQUFqQjtBQUFBO0FBQXVFdUUsb0NBQXZFO0FBQUE7QUFBQTtBQU5KO0FBUEosU0FESjtBQWtCSDtBQXpDcUM7O0FBQXBDUCxXLENBZUtyRyxZLEdBQWU7QUFDbEJDLFlBQVEsTUFBTTtBQURJLEM7a0JBOEJYb0csVzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDL0NmOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBQTs7OztBQUVBOzs7O0FBQ0E7Ozs7OztBQUVBLE1BQU1XLGVBQU4sU0FBOEIsZ0JBQU0zSSxTQUFwQyxDQUE4QztBQUMxQ0MsZ0JBQVlDLEtBQVosRUFBbUI7QUFDZixjQUFNQSxLQUFOO0FBQ0EsYUFBS1MsS0FBTCxHQUFhLEVBQWI7QUFHSDs7QUFFRHFDLHdCQUFvQjtBQUNoQixhQUFLOUMsS0FBTCxDQUFXekYsdUJBQVg7QUFDSDs7QUFNRDhGLGFBQVM7O0FBRUwsWUFBSW9HLGVBQWUsSUFBbkI7QUFDQSxZQUFJQyxnQkFBZ0IsS0FBSzFHLEtBQUwsQ0FBV2tCLEtBQVgsQ0FBaUJ5RixNQUFqQixDQUF3QnZMLEVBQTVDOztBQUVBLFlBQUksS0FBSzRFLEtBQUwsQ0FBVzRHLElBQVgsQ0FBZ0J2TSxRQUFoQixDQUF5QnFNLGFBQXpCLENBQUosRUFBNkM7QUFDekNELDJCQUFlLEtBQUt6RyxLQUFMLENBQVc0RyxJQUFYLENBQWdCdk0sUUFBaEIsQ0FBeUJxTSxhQUF6QixDQUFmO0FBQ0gsU0FGRCxNQUVPO0FBQ0g7QUFDQW5KLG1CQUFPMEcsSUFBUCxDQUFZLEtBQUtqRSxLQUFMLENBQVc0RyxJQUFYLENBQWdCdk0sUUFBNUIsRUFBc0N3SCxHQUF0QyxDQUEyQ2lDLFNBQUQsSUFBZTtBQUNyRCxvQkFBSSxLQUFLOUQsS0FBTCxDQUFXNEcsSUFBWCxDQUFnQnZNLFFBQWhCLENBQXlCeUosU0FBekIsRUFBb0MrQyxhQUF4QyxFQUF1RDtBQUNuREosbUNBQWUsS0FBS3pHLEtBQUwsQ0FBVzRHLElBQVgsQ0FBZ0J2TSxRQUFoQixDQUF5QnlKLFNBQXpCLENBQWY7QUFDSDtBQUNKLGFBSkQ7QUFLSDs7QUFFRCxlQUNJO0FBQUE7QUFBQSxjQUFLLFdBQVUsYUFBZjtBQUVTMkMsNEJBQWdCQSxhQUFhdEQsS0FBOUIsR0FBdUM7QUFBQTtBQUFBO0FBQ25DO0FBQ0ksOEJBQVUsS0FBS25ELEtBQUwsQ0FBVzRHLElBQVgsQ0FBZ0J2TSxRQUQ5QjtBQUVJLDhCQUFTO0FBRmIsa0JBRG1DO0FBS25DO0FBQUE7QUFBQSxzQkFBRyxXQUFVLGFBQWI7QUFBQTtBQUFBLGlCQUxtQztBQU8vQm9NLDZCQUFhdEQsS0FBYixDQUFtQnRCLEdBQW5CLENBQXVCLENBQUM2RyxJQUFELEVBQU92TixDQUFQLEtBQWE7QUFDaEMsMkJBQU87QUFDSCw4QkFBTXVOLElBREg7QUFFSCw2QkFBS3ZOO0FBRkYsc0JBQVA7QUFJSCxpQkFMRDtBQVArQixhQUF2QyxHQWVTO0FBakJqQixTQURKO0FBdUJIO0FBdkR5Qzs7QUFBeENzTixlLENBWUtoSCxZLEdBQWU7QUFDbEJDLFlBQVEsTUFBTTtBQURJLEM7a0JBK0NYK0csZTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDaEVmOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7O0FBRUEsTUFBTUUsVUFBTixTQUF5QixnQkFBTTdJLFNBQS9CLENBQXlDO0FBQ3JDQyxnQkFBWUMsS0FBWixFQUFtQjtBQUNmLGNBQU1BLEtBQU47QUFDSDs7QUFHREssYUFBUzs7QUFFTCxZQUFJLEVBQUVVLElBQUYsRUFBUTZILFFBQVIsRUFBa0JDLFlBQWxCLEVBQWdDQyxRQUFoQyxFQUEwQzlCLElBQTFDLEtBQW9ELEtBQUtoSCxLQUFMLENBQVdSLElBQW5FO0FBQ0F3SCxlQUFPQSxRQUFRO0FBQ1hDLG1CQUFPLENBREk7QUFFWFUsaUJBQUs7QUFGTSxTQUFmO0FBSUEsWUFBSXJCLE9BQU8sSUFBSXhCLElBQUosQ0FBU2tDLEtBQUtDLEtBQWQsRUFBcUJXLFlBQXJCLEVBQVg7O0FBRUEsZUFDSTtBQUFBO0FBQUEsY0FBSyxXQUFVLGFBQWY7QUFDSTtBQUFBO0FBQUEsa0JBQUssV0FBVSxTQUFmO0FBQ0k7QUFBQTtBQUFBO0FBQ0s3RywyQkFBTyxLQUFQLEdBQWU2SDtBQURwQixpQkFESjtBQUlJO0FBQUE7QUFBQTtBQUNLRSwrQkFBVyxLQUFYLEdBQW1CRDtBQUR4QixpQkFKSjtBQU9JO0FBQUE7QUFBQTtBQUNLdkM7QUFETDtBQVBKLGFBREo7QUFZSTtBQUFBO0FBQUEsa0JBQUssV0FBVSxNQUFmO0FBQ0k7QUFBQTtBQUFBLHNCQUFNLFdBQVUsWUFBaEI7QUFBQTtBQUFBO0FBREo7QUFaSixTQURKO0FBa0JIO0FBakNvQzs7a0JBcUMxQnFDLFU7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3ZDZjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDQUE7Ozs7OztBQUVBLE1BQU1JLGNBQU4sU0FBNkIsZ0JBQU1qSixTQUFuQyxDQUE2QztBQUN6Q0MsZ0JBQVlDLEtBQVosRUFBbUI7QUFDZixjQUFNQSxLQUFOO0FBQ0EsYUFBS1MsS0FBTCxHQUFhO0FBQ1R1SSwyQkFBZSxNQUROO0FBRVRDLHlCQUFhLEVBRko7QUFHVGYsaUJBQUssRUFISTtBQUlURCxvQkFBUSxHQUpDO0FBS1RpQixtQkFBTyxFQUxFO0FBTVQxUCx5QkFBYTtBQU5KLFNBQWI7QUFRSDs7QUFFRG1ILGlCQUFhQyxDQUFiLEVBQWdCO0FBQ1osYUFBS0MsUUFBTCxDQUFjLEVBQUUsQ0FBQ0QsRUFBRUUsTUFBRixDQUFTQyxJQUFWLEdBQWlCSCxFQUFFRSxNQUFGLENBQVNFLEtBQTVCLEVBQWQ7QUFDSDs7QUFFRG1JLGlCQUFhLENBRVo7O0FBRUQ5SSxhQUFTOztBQUVMLGVBQ0k7QUFBQTtBQUFBO0FBQ0k7QUFBQTtBQUFBLGtCQUFRLFdBQVUsb0RBQWxCO0FBQ0k7QUFBQTtBQUFBLHNCQUFLLFdBQVUsaUJBQWY7QUFDSTtBQUFBO0FBQUEsMEJBQUssV0FBVSxLQUFmO0FBQ0k7QUFBQTtBQUFBLDhCQUFLLFdBQVUsT0FBZjtBQUNJO0FBQUE7QUFBQSxrQ0FBSSxXQUFVLGFBQWQ7QUFDSTtBQUFBO0FBQUE7QUFBSTtBQUFBO0FBQUEsMENBQU0sV0FBVSwwQ0FBaEI7QUFBMkQsK0VBQUssS0FBSSwwQ0FBVCxFQUFvRCxXQUFVLFdBQTlEO0FBQTNEO0FBQUo7QUFESjtBQURKLHlCQURKO0FBTUk7QUFBQTtBQUFBLDhCQUFLLFdBQVUsT0FBZjtBQUNJO0FBQUE7QUFBQSxrQ0FBSyxXQUFVLDRDQUFmO0FBQUE7QUFBQTtBQURKLHlCQU5KO0FBU0ksK0RBQUssV0FBVSxPQUFmO0FBVEo7QUFESjtBQURKLGFBREo7QUFrQkk7QUFBQTtBQUFBLGtCQUFTLFdBQVUsNkJBQW5CO0FBQ0k7QUFBQTtBQUFBLHNCQUFLLFdBQVUsMkJBQWY7QUFDSTtBQUFBO0FBQUEsMEJBQUssV0FBVSxlQUFmO0FBQ0k7QUFBQTtBQUFBLDhCQUFJLFdBQVUsY0FBZDtBQUFBO0FBQUE7QUFESixxQkFESjtBQUlJO0FBQUE7QUFBQSwwQkFBSyxXQUFVLGdCQUFmO0FBQ0k7QUFBQTtBQUFBLDhCQUFNLFdBQVUsV0FBaEI7QUFDSTtBQUFBO0FBQUEsa0NBQUssV0FBVSx3QkFBZjtBQUNJO0FBQUE7QUFBQSxzQ0FBTyxXQUFVLG9CQUFqQjtBQUFBO0FBQUEsaUNBREo7QUFFSTtBQUFBO0FBQUEsc0NBQUssV0FBVSxlQUFmO0FBQ0k7QUFBQTtBQUFBLDBDQUFPLFdBQVUsY0FBakI7QUFBZ0MsaUZBQU8sT0FBTyxNQUFkLEVBQXNCLFVBQVUsS0FBS00sWUFBTCxDQUFrQkwsSUFBbEIsQ0FBdUIsSUFBdkIsQ0FBaEMsRUFBOEQsU0FBUyxLQUFLRyxLQUFMLENBQVd1SSxhQUFYLElBQTRCLE1BQW5HLEVBQTJHLE1BQUssT0FBaEgsRUFBd0gsTUFBSyxlQUE3SCxHQUFoQztBQUFBO0FBQUEscUNBREo7QUFFSTtBQUFBO0FBQUEsMENBQU8sV0FBVSxjQUFqQjtBQUFnQyxpRkFBTyxPQUFPLE1BQWQsRUFBc0IsVUFBVSxLQUFLckksWUFBTCxDQUFrQkwsSUFBbEIsQ0FBdUIsSUFBdkIsQ0FBaEMsRUFBOEQsU0FBUyxLQUFLRyxLQUFMLENBQVd1SSxhQUFYLElBQTRCLE1BQW5HLEVBQTJHLE1BQUssT0FBaEgsRUFBd0gsTUFBSyxlQUE3SCxHQUFoQztBQUFBO0FBQUE7QUFGSjtBQUZKLDZCQURKO0FBUUk7QUFBQTtBQUFBLGtDQUFLLFdBQVUsV0FBZjtBQUNJLHlFQUFPLElBQUcsT0FBVixFQUFrQixNQUFLLGFBQXZCLEVBQXFDLE1BQUssTUFBMUMsRUFBaUQsT0FBTyxLQUFLdkksS0FBTCxDQUFXd0ksV0FBbkUsRUFBZ0YsVUFBVSxLQUFLdEksWUFBTCxDQUFrQkwsSUFBbEIsQ0FBdUIsSUFBdkIsQ0FBMUYsRUFBd0gsY0FBeEgsR0FESjtBQUVJO0FBQUE7QUFBQSxzQ0FBTyxTQUFRLE9BQWY7QUFBQTtBQUFBLGlDQUZKO0FBR0k7QUFBQTtBQUFBLHNDQUFNLFdBQVUsb0JBQWhCO0FBQUE7QUFBQTtBQUhKLDZCQVJKO0FBYUk7QUFBQTtBQUFBLGtDQUFLLFdBQVUsV0FBZjtBQUNJLHlFQUFPLElBQUcsS0FBVixFQUFnQixNQUFLLEtBQXJCLEVBQTJCLE1BQUssTUFBaEMsRUFBdUMsT0FBTyxLQUFLRyxLQUFMLENBQVd5SCxHQUF6RCxFQUE4RCxVQUFVLEtBQUt2SCxZQUFMLENBQWtCTCxJQUFsQixDQUF1QixJQUF2QixDQUF4RSxFQUFzRyxjQUF0RyxHQURKO0FBRUk7QUFBQTtBQUFBLHNDQUFPLFNBQVEsS0FBZjtBQUFBO0FBQUE7QUFGSiw2QkFiSjtBQWlCSTtBQUFBO0FBQUEsa0NBQUssV0FBVSx3QkFBZjtBQUNJO0FBQUE7QUFBQSxzQ0FBTyxXQUFVLG9CQUFqQjtBQUFBO0FBQUEsaUNBREo7QUFFSTtBQUFBO0FBQUEsc0NBQUssV0FBVSxlQUFmO0FBQ0k7QUFBQTtBQUFBLDBDQUFPLFdBQVUsY0FBakI7QUFBZ0MsaUZBQU8sT0FBTyxHQUFkLEVBQW1CLFVBQVUsS0FBS0ssWUFBTCxDQUFrQkwsSUFBbEIsQ0FBdUIsSUFBdkIsQ0FBN0IsRUFBMkQsU0FBUyxLQUFLRyxLQUFMLENBQVd3SCxNQUFYLElBQXFCLEdBQXpGLEVBQThGLE1BQUssT0FBbkcsRUFBMkcsTUFBSyxRQUFoSCxHQUFoQztBQUFBO0FBQUEscUNBREo7QUFFSTtBQUFBO0FBQUEsMENBQU8sV0FBVSxjQUFqQjtBQUFnQyxpRkFBTyxPQUFPLEdBQWQsRUFBbUIsVUFBVSxLQUFLdEgsWUFBTCxDQUFrQkwsSUFBbEIsQ0FBdUIsSUFBdkIsQ0FBN0IsRUFBMkQsU0FBUyxLQUFLRyxLQUFMLENBQVd3SCxNQUFYLElBQXFCLEdBQXpGLEVBQThGLE1BQUssT0FBbkcsRUFBMkcsTUFBSyxRQUFoSCxHQUFoQztBQUFBO0FBQUEscUNBRko7QUFHSTtBQUFBO0FBQUEsMENBQU8sV0FBVSxjQUFqQjtBQUFnQyxpRkFBTyxPQUFPLEdBQWQsRUFBbUIsVUFBVSxLQUFLdEgsWUFBTCxDQUFrQkwsSUFBbEIsQ0FBdUIsSUFBdkIsQ0FBN0IsRUFBMkQsU0FBUyxLQUFLRyxLQUFMLENBQVd3SCxNQUFYLElBQXFCLEdBQXpGLEVBQThGLE1BQUssT0FBbkcsRUFBMkcsTUFBSyxRQUFoSCxHQUFoQztBQUFBO0FBQUE7QUFISjtBQUZKLDZCQWpCSjtBQXlCSTtBQUFBO0FBQUEsa0NBQUssV0FBVSxXQUFmO0FBQ0kseUVBQU8sSUFBRyxPQUFWLEVBQWtCLE1BQUssT0FBdkIsRUFBK0IsTUFBSyxNQUFwQyxFQUEyQyxPQUFPLEtBQUt4SCxLQUFMLENBQVd5SSxLQUE3RCxFQUFvRSxVQUFVLEtBQUt2SSxZQUFMLENBQWtCTCxJQUFsQixDQUF1QixJQUF2QixDQUE5RSxFQUE0RyxjQUE1RyxHQURKO0FBRUk7QUFBQTtBQUFBLHNDQUFPLFNBQVEsT0FBZjtBQUFBO0FBQUE7QUFGSiw2QkF6Qko7QUE2Qkk7QUFBQTtBQUFBLGtDQUFLLFdBQVUsV0FBZjtBQUNJLHlFQUFPLElBQUcsUUFBVixFQUFtQixNQUFLLGFBQXhCLEVBQXNDLE1BQUssTUFBM0MsRUFBa0QsT0FBTyxLQUFLRyxLQUFMLENBQVdqSCxXQUFwRSxFQUFpRixVQUFVLEtBQUttSCxZQUFMLENBQWtCTCxJQUFsQixDQUF1QixJQUF2QixDQUEzRixFQUF5SCxjQUF6SCxHQURKO0FBRUk7QUFBQTtBQUFBLHNDQUFPLFNBQVEsUUFBZjtBQUFBO0FBQUE7QUFGSjtBQTdCSjtBQURKO0FBSko7QUFESixhQWxCSjtBQThESTtBQUFBO0FBQUEsa0JBQVEsV0FBVSw0RUFBbEIsRUFBK0YsU0FBUyxLQUFLNkksVUFBTCxDQUFnQjdJLElBQWhCLENBQXFCLElBQXJCLENBQXhHO0FBQUE7QUFBQTtBQTlESixTQURKO0FBa0VIO0FBekZ3Qzs7a0JBNkY5QnlJLGM7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQy9GZjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDQUE7Ozs7QUFDQTs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRUEsTUFBTUssa0JBQU4sU0FBaUMsZ0JBQU10SixTQUF2QyxDQUFpRDtBQUM3Q0MsZ0JBQVlDLEtBQVosRUFBbUI7QUFDZixjQUFNQSxLQUFOO0FBQ0EsYUFBS1MsS0FBTCxHQUFhO0FBQ1Q0SSx5QkFBYSxLQUFLckosS0FBTCxDQUFXa0IsS0FBWCxDQUFpQnlGLE1BQWpCLENBQXdCdkwsRUFENUI7QUFFVGtPLHdCQUFZO0FBRkgsU0FBYjtBQUlIOztBQUVEeEcsd0JBQW9CO0FBQ2hCLGFBQUs5QyxLQUFMLENBQVc1RCxVQUFYLENBQXNCLEtBQUtxRSxLQUFMLENBQVc0SSxXQUFqQztBQUNIOztBQUVERSxnQkFBWTtBQUNSLGFBQUt2SixLQUFMLENBQVdHLE9BQVgsQ0FBbUJDLElBQW5CLENBQXlCLFFBQU8sS0FBS0ssS0FBTCxDQUFXNEksV0FBWSxRQUF2RDtBQUNIOztBQUVERyxxQkFBaUI1SSxDQUFqQixFQUFvQjtBQUNoQixhQUFLQyxRQUFMLENBQWMsRUFBRXlJLFlBQVkxSSxFQUFFRSxNQUFGLENBQVNFLEtBQXZCLEVBQWQ7QUFDSDs7QUFFRHlJLG1CQUFlO0FBQ1gsZ0JBQVEsS0FBS2hKLEtBQUwsQ0FBVzZJLFVBQW5CO0FBQ0ksaUJBQUssS0FBTDtBQUFZO0FBQ1IsMkJBQU87QUFBQTtBQUFBO0FBQ0gsNkVBQVcsTUFBSyxLQUFoQixHQURHO0FBRUg7QUFGRyxxQkFBUDtBQUlIOztBQUVELGlCQUFLLE1BQUw7QUFBYTtBQUNULDJCQUFPO0FBQUE7QUFBQTtBQUNILDZFQUFXLE1BQUssTUFBaEIsR0FERztBQUVILG9GQUZHO0FBR0g7QUFIRyxxQkFBUDtBQUtIO0FBZEw7QUFnQkg7O0FBR0RqSixhQUFTOztBQUVMLFlBQUk4QyxRQUFRLEVBQVo7QUFDQSxZQUFJdUcsYUFBYSxDQUFqQjtBQUNBLFlBQUlDLFlBQVksRUFBaEI7O0FBRUEsWUFBSSxLQUFLM0osS0FBTCxDQUFXNEosSUFBWCxDQUFnQixLQUFLbkosS0FBTCxDQUFXNEksV0FBM0IsQ0FBSixFQUE2QztBQUN6Q00sd0JBQVksS0FBSzNKLEtBQUwsQ0FBVzRKLElBQVgsQ0FBZ0IsS0FBS25KLEtBQUwsQ0FBVzRJLFdBQTNCLEVBQXdDUSxHQUFwRDtBQUNBMUcsb0JBQVEsS0FBS25ELEtBQUwsQ0FBV25GLGlCQUFYLENBQTZCQyxNQUE3QixDQUFvQ0MsS0FBS0EsRUFBRXpCLElBQUYsSUFBVSxNQUFuRCxFQUEyRHVJLEdBQTNELENBQStELENBQUM2RyxJQUFELEVBQU92TixDQUFQLEtBQWE7QUFDaEYsb0JBQUkyTyxRQUFRLENBQVo7QUFDQSxxQkFBSzlKLEtBQUwsQ0FBVzRKLElBQVgsQ0FBZ0IsS0FBS25KLEtBQUwsQ0FBVzRJLFdBQTNCLEVBQXdDbEcsS0FBeEMsQ0FBOEN0QixHQUE5QyxDQUFtRGtJLEdBQUQsSUFBUztBQUN2RCx3QkFBSUEsSUFBSUMsT0FBSixJQUFldEIsS0FBS3ROLEVBQXhCLEVBQTRCO0FBQ3hCME8sZ0NBQVFDLElBQUlFLEdBQVo7QUFDSDtBQUNKLGlCQUpEO0FBS0FQLDhCQUFjSSxLQUFkO0FBQ0EsdUJBQU87QUFBQTtBQUFBLHNCQUFHLEtBQUszTyxDQUFSLEVBQVcsV0FBVSxXQUFyQjtBQUFrQ3VOLHlCQUFLM0gsSUFBdkM7QUFBNEM7QUFBQTtBQUFBLDBCQUFNLFdBQVUsb0JBQWhCO0FBQUE7QUFBMEMrSTtBQUExQztBQUE1QyxpQkFBUDtBQUNILGFBVE8sQ0FBUjtBQVVIOztBQUVELGVBQ0k7QUFBQTtBQUFBO0FBQ0k7QUFBQTtBQUFBLGtCQUFRLFdBQVUsb0RBQWxCO0FBQ0k7QUFBQTtBQUFBLHNCQUFLLFdBQVUsaUJBQWY7QUFDSTtBQUFBO0FBQUEsMEJBQUssV0FBVSxLQUFmO0FBQ0k7QUFBQTtBQUFBLDhCQUFLLFdBQVUsT0FBZjtBQUNJO0FBQUE7QUFBQSxrQ0FBSSxXQUFVLGFBQWQ7QUFDSTtBQUFBO0FBQUEsc0NBQUksU0FBUyxNQUFNO0FBQ2YsaURBQUs5SixLQUFMLENBQVdHLE9BQVgsQ0FBbUJvRCxFQUFuQixDQUFzQixDQUFDLENBQXZCO0FBQ0gseUNBRkQ7QUFFRztBQUFBO0FBQUEsMENBQU0sV0FBVSwwQ0FBaEI7QUFBMkQsK0VBQUssS0FBSSwwQ0FBVCxFQUFvRCxXQUFVLFdBQTlEO0FBQTNEO0FBRkg7QUFESjtBQURKLHlCQURKO0FBUUk7QUFBQTtBQUFBLDhCQUFLLFdBQVUsT0FBZjtBQUNJO0FBQUE7QUFBQSxrQ0FBSyxXQUFVLDRDQUFmO0FBQUE7QUFBQTtBQURKLHlCQVJKO0FBV0ksK0RBQUssV0FBVSxPQUFmO0FBWEo7QUFESjtBQURKLGFBREo7QUF5QlEsaUJBQUt2RCxLQUFMLENBQVc0SixJQUFYLENBQWdCLEtBQUtuSixLQUFMLENBQVc0SSxXQUEzQixJQUNJO0FBQUE7QUFBQTtBQUNJO0FBQUE7QUFBQSxzQkFBUyxXQUFVLDZCQUFuQjtBQUNJO0FBQUE7QUFBQSwwQkFBSyxXQUFVLGlCQUFmO0FBQ0k7QUFBQTtBQUFBLDhCQUFLLFdBQVUsS0FBZjtBQUNJO0FBQUE7QUFBQSxrQ0FBSyxXQUFVLFFBQWY7QUFDSTtBQUFBO0FBQUEsc0NBQUssV0FBVSxlQUFmO0FBQ0k7QUFBQTtBQUFBLDBDQUFLLFdBQVUsOENBQWY7QUFDSTtBQUFBO0FBQUEsOENBQUksV0FBVSwwQkFBZDtBQUNJO0FBQUE7QUFBQTtBQUFJO0FBQUE7QUFBQSxzREFBTyxXQUFVLDBDQUFqQjtBQUE0RCw2RkFBTyxNQUFLLE9BQVosRUFBb0IsTUFBSyxVQUF6QixFQUFvQyxVQUFVLEtBQUtHLGdCQUFMLENBQXNCbEosSUFBdEIsQ0FBMkIsSUFBM0IsQ0FBOUMsRUFBZ0YsT0FBTSxNQUF0RixFQUE2RixTQUFTLEtBQUtHLEtBQUwsQ0FBVzZJLFVBQVgsSUFBeUIsTUFBL0gsR0FBNUQ7QUFBQTtBQUFBO0FBQUosNkNBREo7QUFFSTtBQUFBO0FBQUE7QUFBSTtBQUFBO0FBQUEsc0RBQU8sV0FBVSwwQ0FBakI7QUFBNEQsNkZBQU8sTUFBSyxPQUFaLEVBQW9CLE1BQUssVUFBekIsRUFBb0MsVUFBVSxLQUFLRSxnQkFBTCxDQUFzQmxKLElBQXRCLENBQTJCLElBQTNCLENBQTlDLEVBQWdGLE9BQU0sS0FBdEYsRUFBNEYsU0FBUyxLQUFLRyxLQUFMLENBQVc2SSxVQUFYLElBQXlCLEtBQTlILEdBQTVEO0FBQUE7QUFBQTtBQUFKO0FBRko7QUFESixxQ0FESjtBQU9JO0FBQUE7QUFBQSwwQ0FBSyxXQUFVLGdCQUFmO0FBQ0k7QUFBQTtBQUFBLDhDQUFLLFdBQVUsYUFBZjtBQUNJLG1GQUFLLEtBQUkscUNBQVQsRUFBK0MsV0FBVSxXQUF6RCxHQURKO0FBRUk7QUFBQTtBQUFBLGtEQUFLLFdBQVUsV0FBZjtBQUNJO0FBQUE7QUFBQSxzREFBSSxXQUFVLHNCQUFkO0FBQXNDSyw4REFBVTVJO0FBQWhELGlEQURKO0FBRUk7QUFBQTtBQUFBLHNEQUFHLFdBQVUsMkJBQWI7QUFBMEM0SSw4REFBVU87QUFBcEQ7QUFGSjtBQUZKLHlDQURKO0FBU0ssNkNBQUtULFlBQUwsRUFUTDtBQVdJO0FBQUE7QUFBQSw4Q0FBSyxXQUFVLDRCQUFmO0FBQ0k7QUFBQTtBQUFBLGtEQUFJLFdBQVUsT0FBZDtBQUFzQjtBQUFBO0FBQUE7QUFBTSwyRkFBSyxLQUFJLHFDQUFUO0FBQU4saURBQXRCO0FBQUE7QUFBMEY7QUFBQTtBQUFBLHNEQUFNLFdBQVUsYUFBaEI7QUFBOEI7QUFBQTtBQUFBLDBEQUFHLFNBQVMsS0FBS0YsU0FBTCxDQUFlakosSUFBZixDQUFvQixJQUFwQixDQUFaLEVBQXVDLFdBQVUsNkJBQWpEO0FBQUE7QUFBQTtBQUE5QjtBQUExRiw2Q0FESjtBQUVLNkM7QUFGTDtBQVhKO0FBUEo7QUFESjtBQURKO0FBREo7QUFESixpQkFESjtBQWtDSTtBQUFBO0FBQUEsc0JBQVEsV0FBVSw0RUFBbEI7QUFBQTtBQUFtSHVHO0FBQW5IO0FBbENKLGFBREosR0FxQ2E7QUE5RHJCLFNBREo7QUFvRUg7QUFqSTRDOztrQkFxSWxDTixrQjs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDN0lmOzs7Ozs7QUFFQSxNQUFNZSxhQUFOLFNBQTRCLGdCQUFNckssU0FBbEMsQ0FBNEM7QUFDeENDLGdCQUFZQyxLQUFaLEVBQW1CO0FBQ2YsY0FBTUEsS0FBTjtBQUNBLGFBQUtTLEtBQUwsR0FBYSxFQUFiO0FBR0g7O0FBRURKLGFBQVM7O0FBRUwsZUFDSTtBQUFBO0FBQUEsY0FBSyxXQUFVLGdCQUFmO0FBQ0k7QUFBQTtBQUFBLGtCQUFJLFdBQVUsT0FBZDtBQUFzQjtBQUFBO0FBQUE7QUFBTSwyREFBSyxLQUFJLHNDQUFUO0FBQU4saUJBQXRCO0FBQUE7QUFBcUc7QUFBQTtBQUFBLHNCQUFNLFdBQVUsYUFBaEI7QUFBOEI7QUFBQTtBQUFBLDBCQUFHLE1BQUssR0FBUixFQUFZLFdBQVUsNkJBQXRCO0FBQUE7QUFBQTtBQUE5QjtBQUFyRyxhQURKO0FBRUk7QUFBQTtBQUFBLGtCQUFHLFdBQVUsV0FBYjtBQUFBO0FBQUE7QUFGSixTQURKO0FBTUg7QUFoQnVDOztrQkFvQjdCOEosYTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDdEJmOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7O0FBRUEsTUFBTUMsYUFBTixTQUE0QixnQkFBTXRLLFNBQWxDLENBQTRDO0FBQ3hDQyxnQkFBWUMsS0FBWixFQUFtQjtBQUNmLGNBQU1BLEtBQU47QUFDQSxhQUFLUyxLQUFMLEdBQWEsRUFBYjtBQUdIOztBQUVESixhQUFTOztBQUVMLGVBQ0k7QUFBQTtBQUFBLGNBQUssV0FBVSxnQkFBZjtBQUNJO0FBQUE7QUFBQSxrQkFBSSxXQUFVLE9BQWQ7QUFBc0I7QUFBQTtBQUFBO0FBQU0sMkRBQUssS0FBSSxzQ0FBVDtBQUFOLGlCQUF0QjtBQUFBO0FBQW9HO0FBQUE7QUFBQSxzQkFBTSxXQUFVLGFBQWhCO0FBQThCO0FBQUE7QUFBQSwwQkFBRyxNQUFLLEdBQVIsRUFBWSxXQUFVLDZCQUF0QjtBQUFBO0FBQUE7QUFBOUI7QUFBcEcsYUFESjtBQUVJO0FBQUE7QUFBQSxrQkFBRyxXQUFVLFdBQWI7QUFBQTtBQUFBO0FBRkosU0FESjtBQU1IO0FBaEJ1Qzs7a0JBb0I3QitKLGE7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3RCZjs7Ozs7O0FBRUEsTUFBTUMsU0FBTixTQUF3QixnQkFBTXZLLFNBQTlCLENBQXdDO0FBQ3BDQyxnQkFBWUMsS0FBWixFQUFtQjtBQUNmLGNBQU1BLEtBQU47QUFDQSxhQUFLUyxLQUFMLEdBQWEsRUFBYjtBQUdIOztBQUVESixhQUFTOztBQUVMLGVBQ0k7QUFBQTtBQUFBLGNBQUssV0FBVSxnQkFBZjtBQUNJO0FBQUE7QUFBQSxrQkFBSSxXQUFVLE9BQWQ7QUFBc0I7QUFBQTtBQUFBO0FBQU0sMkRBQUssS0FBSSxzQ0FBVDtBQUFOLGlCQUF0QjtBQUFBO0FBQWdHO0FBQUE7QUFBQSxzQkFBTSxXQUFVLGFBQWhCO0FBQThCO0FBQUE7QUFBQSwwQkFBRyxNQUFLLEdBQVIsRUFBWSxXQUFVLDZCQUF0QjtBQUFBO0FBQUE7QUFBOUI7QUFBaEcsYUFESjtBQUVJO0FBQUE7QUFBQSxrQkFBRyxXQUFVLFdBQWI7QUFBQTtBQUFBO0FBRkosU0FESjtBQU1IO0FBaEJtQzs7a0JBb0J6QmdLLFM7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3RCZjs7OztBQUNBOztBQUVBOzs7Ozs7QUFFQSxNQUFNQyxVQUFOLFNBQXlCLGdCQUFNeEssU0FBL0IsQ0FBeUM7O0FBRXJDQyxnQkFBWUMsS0FBWixFQUFtQjtBQUNmLGNBQU1BLEtBQU47QUFDSDs7QUFFREssYUFBUzs7QUFFTCxlQUNJO0FBQUE7QUFBQSxjQUFTLFdBQVUsMEJBQW5CO0FBQ0k7QUFBQTtBQUFBLGtCQUFLLFdBQVUsaUJBQWY7QUFDSTtBQUFBO0FBQUEsc0JBQUssV0FBVSxLQUFmO0FBQ0k7QUFBQTtBQUFBLDBCQUFLLFdBQVUsUUFBZjtBQUNJO0FBQUE7QUFBQSw4QkFBSyxXQUFVLHFCQUFmO0FBQ0k7QUFBQTtBQUFBLGtDQUFLLFdBQVUscUNBQWY7QUFDSTtBQUFBO0FBQUEsc0NBQUssV0FBVSxTQUFmO0FBQ0ksMkVBQUssS0FBSSxxQ0FBVCxFQUErQyxXQUFVLFdBQXpEO0FBREosaUNBREo7QUFJSTtBQUFBO0FBQUEsc0NBQUksV0FBVSx1QkFBZDtBQUFBO0FBQUEsaUNBSko7QUFLSTtBQUFBO0FBQUEsc0NBQUcsV0FBVSxVQUFiO0FBQUE7QUFBNEM7QUFBQTtBQUFBLDBDQUFNLFdBQVUsa0JBQWhCO0FBQW1DLCtFQUFLLEtBQUksMkNBQVQsRUFBcUQsV0FBVSxXQUEvRDtBQUFuQyxxQ0FBNUM7QUFBQTtBQUFBLGlDQUxKO0FBTUk7QUFBQTtBQUFBLHNDQUFJLFdBQVUsbUJBQWQ7QUFDSTtBQUFBO0FBQUE7QUFDSTtBQUFBO0FBQUEsOENBQU0sV0FBVSxnQkFBaEI7QUFBQTtBQUFBLHlDQURKO0FBQUE7QUFHSTtBQUFBO0FBQUEsOENBQU0sV0FBVSxZQUFoQjtBQUFBO0FBQUE7QUFISixxQ0FESjtBQU1JO0FBQUE7QUFBQTtBQUNJO0FBQUE7QUFBQSw4Q0FBTSxXQUFVLGdCQUFoQjtBQUFBO0FBQUEseUNBREo7QUFBQTtBQUdJO0FBQUE7QUFBQSw4Q0FBTSxXQUFVLFlBQWhCO0FBQUE7QUFBQTtBQUhKO0FBTko7QUFOSiw2QkFESjtBQXFCSSw4RUFBYyxLQUFLTCxLQUFuQixDQXJCSjtBQXVCSTtBQUFBO0FBQUEsa0NBQUssV0FBVSx1Q0FBZjtBQUNJO0FBQUE7QUFBQSxzQ0FBSSxXQUFVLHlCQUFkO0FBQUE7QUFBQSxpQ0FESjtBQUVJO0FBQUE7QUFBQSxzQ0FBSyxXQUFVLGlCQUFmO0FBQ0ksMkVBQUssS0FBSSx5Q0FBVCxFQUFtRCxXQUFVLG1CQUE3RCxHQURKO0FBRUk7QUFBQTtBQUFBLDBDQUFHLFdBQVUsVUFBYjtBQUFBO0FBQUE7QUFGSixpQ0FGSjtBQU1JO0FBQUE7QUFBQSxzQ0FBSyxXQUFVLG1CQUFmO0FBQ0k7QUFBQTtBQUFBLDBDQUFHLE1BQUssR0FBUixFQUFZLFdBQVUsMEJBQXRCO0FBQUE7QUFBQTtBQURKO0FBTkosNkJBdkJKO0FBaUNJO0FBQUE7QUFBQSxrQ0FBSyxXQUFVLHVDQUFmO0FBQ0k7QUFBQTtBQUFBLHNDQUFJLFdBQVUseUJBQWQ7QUFBQTtBQUFBLGlDQURKO0FBRUk7QUFBQTtBQUFBLHNDQUFJLFdBQVUsMkJBQWQ7QUFDSTtBQUFBO0FBQUE7QUFBQTtBQUFBLHFDQURKO0FBRUk7QUFBQTtBQUFBO0FBQUE7QUFBQSxxQ0FGSjtBQUdJO0FBQUE7QUFBQTtBQUFBO0FBQUEscUNBSEo7QUFJSTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBSko7QUFGSiw2QkFqQ0o7QUEwQ0k7QUFBQTtBQUFBLGtDQUFLLFdBQVUsb0NBQWY7QUFDSTtBQUFBO0FBQUEsc0NBQUksV0FBVSx5QkFBZDtBQUFBO0FBQUEsaUNBREo7QUFFSTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBRko7QUExQ0o7QUFESjtBQURKO0FBREo7QUFESixTQURKO0FBNERIO0FBcEVvQzs7a0JBd0UxQnNLLFU7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzdFZjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDQUE7Ozs7OztBQUVBLE1BQU1DLGNBQU4sU0FBNkIsZ0JBQU16SyxTQUFuQyxDQUE2QztBQUN6Q0MsZ0JBQVlDLEtBQVosRUFBbUI7QUFDZixjQUFNQSxLQUFOO0FBQ0g7O0FBRUR3SyxZQUFRcFAsRUFBUixFQUFXO0FBQ1AsYUFBSzRFLEtBQUwsQ0FBV0csT0FBWCxDQUFtQkMsSUFBbkIsQ0FBeUIsUUFBT2hGLEVBQUcsRUFBbkM7QUFDSDs7QUFFRGlGLGFBQVM7O0FBRUwsWUFBSSxFQUFFeUosS0FBRixFQUFTRCxHQUFULEtBQWlCLEtBQUs3SixLQUFMLENBQVd5SyxPQUFoQzs7QUFFQSxlQUNJO0FBQUE7QUFBQSxjQUFLLFdBQVUsYUFBZixFQUE2QixTQUFTLEtBQUtELE9BQUwsQ0FBYWxLLElBQWIsQ0FBa0IsSUFBbEIsRUFBdUIsS0FBS04sS0FBTCxDQUFXeUssT0FBWCxDQUFtQlosR0FBbkIsQ0FBdUJ6TyxFQUE5QyxDQUF0QztBQUNJO0FBQUE7QUFBQSxrQkFBSyxXQUFVLHVDQUFmO0FBQ0k7QUFBQTtBQUFBLHNCQUFLLFdBQVUsY0FBZjtBQUNJO0FBQUE7QUFBQSwwQkFBTSxXQUFVLGlCQUFoQjtBQUFrQywrREFBSyxLQUFJLHFDQUFULEVBQStDLFdBQVUsV0FBekQ7QUFBbEMscUJBREo7QUFFSTtBQUFBO0FBQUEsMEJBQUksV0FBVSxxQkFBZDtBQUNJO0FBQUE7QUFBQTtBQUFJO0FBQUE7QUFBQSxrQ0FBTSxXQUFVLDRCQUFoQjtBQUE2Qyx1RUFBSyxLQUFJLHFDQUFULEVBQStDLFdBQVUsV0FBekQ7QUFBN0M7QUFBSix5QkFESjtBQUVJO0FBQUE7QUFBQTtBQUFJO0FBQUE7QUFBQSxrQ0FBTSxXQUFVLDRCQUFoQjtBQUE2Qyx1RUFBSyxLQUFJLHFDQUFULEVBQStDLFdBQVUsV0FBekQ7QUFBN0M7QUFBSix5QkFGSjtBQUdJO0FBQUE7QUFBQTtBQUFJO0FBQUE7QUFBQSxrQ0FBTSxXQUFVLDRCQUFoQjtBQUE2Qyx1RUFBSyxLQUFJLHFDQUFULEVBQStDLFdBQVUsV0FBekQ7QUFBN0M7QUFBSix5QkFISjtBQUlJO0FBQUE7QUFBQTtBQUFJO0FBQUE7QUFBQSxrQ0FBTSxXQUFVLDRCQUFoQjtBQUE2Qyx1RUFBSyxLQUFJLHFDQUFULEVBQStDLFdBQVUsV0FBekQ7QUFBN0M7QUFBSix5QkFKSjtBQUtJO0FBQUE7QUFBQTtBQUFJO0FBQUE7QUFBQSxrQ0FBTSxXQUFVLDRCQUFoQjtBQUE2Qyx1RUFBSyxLQUFJLDBDQUFULEVBQW9ELFdBQVUsV0FBOUQ7QUFBN0M7QUFBSjtBQUxKLHFCQUZKO0FBU0k7QUFBQTtBQUFBLDBCQUFRLFdBQVUsZ0NBQWxCO0FBQUE7QUFBQTtBQVRKLGlCQURKO0FBWUk7QUFBQTtBQUFBLHNCQUFLLFdBQVUsbUJBQWY7QUFDSTtBQUFBO0FBQUEsMEJBQUksV0FBVSxpQkFBZDtBQUFpQ3lPLDRCQUFJOUk7QUFBckMscUJBREo7QUFFSTtBQUFBO0FBQUEsMEJBQUcsV0FBVSxNQUFiO0FBQUE7QUFBbUY7QUFBQTtBQUFBLDhCQUFNLFdBQVUscUJBQWhCO0FBQUE7QUFBQTtBQUFuRjtBQUZKO0FBWkosYUFESjtBQWtCSTtBQUFBO0FBQUEsa0JBQUssV0FBVSwyQkFBZjtBQUNJO0FBQUE7QUFBQSxzQkFBSyxXQUFVLEtBQWY7QUFDSTtBQUFBO0FBQUEsMEJBQUssV0FBVSxPQUFmO0FBQ0k7QUFBQTtBQUFBLDhCQUFHLFdBQVUsV0FBYjtBQUFBO0FBQW1DK0k7QUFBbkM7QUFESixxQkFESjtBQUlJO0FBQUE7QUFBQSwwQkFBSyxXQUFVLGtCQUFmO0FBQ0k7QUFBQTtBQUFBLDhCQUFRLFdBQVUsNEJBQWxCO0FBQUE7QUFBQTtBQURKO0FBSko7QUFESjtBQWxCSixTQURKO0FBK0JIO0FBNUN3Qzs7a0JBZ0Q5QlMsYzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbERmOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDQUE7Ozs7QUFDQTs7OztBQUVBLE1BQU1HLFFBQU4sU0FBdUIsZ0JBQU01SyxTQUE3QixDQUF1Qzs7QUFFbkNDLGdCQUFZQyxLQUFaLEVBQW1CO0FBQ2YsY0FBTUEsS0FBTjtBQUNIOztBQUVEdUosZ0JBQVk7QUFDUixhQUFLdkosS0FBTCxDQUFXRyxPQUFYLENBQW1CQyxJQUFuQixDQUF5QixRQUFPLEtBQUtKLEtBQUwsQ0FBV1IsSUFBWCxDQUFnQnFLLEdBQWhCLENBQW9Cek8sRUFBRyxRQUF2RDtBQUNIOztBQUVEaUYsYUFBUzs7QUFFTCxZQUFJOEMsUUFBUSxFQUFaO0FBQ0EsWUFBSSxLQUFLbkQsS0FBTCxDQUFXUixJQUFYLENBQWdCMkQsS0FBaEIsSUFBeUIsS0FBS25ELEtBQUwsQ0FBV1IsSUFBWCxDQUFnQjJELEtBQWhCLENBQXNCd0gsTUFBbkQsRUFBMkQ7QUFDdkR4SCxvQkFBUSxLQUFLbkQsS0FBTCxDQUFXUixJQUFYLENBQWdCMkQsS0FBaEIsQ0FBc0J0QixHQUF0QixDQUEwQixDQUFDNkcsSUFBRCxFQUFPdk4sQ0FBUCxLQUFhO0FBQzNDLHVCQUFPO0FBQUE7QUFBQSxzQkFBSSxLQUFLQSxDQUFUO0FBQWF1Tix5QkFBS0EsSUFBTCxDQUFVM0gsSUFBdkI7QUFBQTtBQUE2QjtBQUFBO0FBQUEsMEJBQU0sV0FBVSxZQUFoQjtBQUFBO0FBQWlDMkgsNkJBQUt1QjtBQUF0QztBQUE3QixpQkFBUDtBQUNILGFBRk8sQ0FBUjtBQUdIOztBQUVELGVBQ0k7QUFBQTtBQUFBLGNBQUssV0FBVSxtQ0FBZjtBQUNJO0FBQUE7QUFBQSxrQkFBSSxXQUFVLHlCQUFkO0FBQUE7QUFBZ0Q5RyxzQkFBTXdILE1BQXREO0FBQUE7QUFBQSxhQURKO0FBRUk7QUFBQTtBQUFBLGtCQUFJLFdBQVUsMkJBQWQ7QUFDS3hILHNCQUFNRyxLQUFOLENBQVksQ0FBWixFQUFjLENBQWQ7QUFETCxhQUZKO0FBS0k7QUFBQTtBQUFBLGtCQUFLLFdBQVUsb0JBQWY7QUFDSTtBQUFBO0FBQUEsc0JBQUcsV0FBVSwwQkFBYixFQUF3QyxTQUFTLEtBQUtpRyxTQUFMLENBQWVqSixJQUFmLENBQW9CLElBQXBCLENBQWpEO0FBQUE7QUFBQTtBQURKO0FBTEosU0FESjtBQVdIO0FBOUJrQzs7a0JBa0N4Qm9LLFE7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3JDZjs7OztBQUNBOztBQUVBOzs7O0FBSUE7Ozs7OztBQUdBLE1BQU1FLFlBQU4sU0FBMkIsZ0JBQU05SyxTQUFqQyxDQUEyQzs7QUFFdkNDLGdCQUFZQyxLQUFaLEVBQW1CO0FBQ2YsY0FBTUEsS0FBTjtBQUNIOztBQUVESyxhQUFTOztBQUVMLFlBQUl3SyxnQkFBZ0IsRUFBcEI7QUFDQSxZQUFJQyxhQUFhLENBQWpCO0FBQ0EsWUFBSUMsYUFBYSxDQUFqQjtBQUNBLFlBQUksS0FBSy9LLEtBQUwsQ0FBV1IsSUFBWCxDQUFnQnFMLGFBQWhCLElBQWlDLEtBQUs3SyxLQUFMLENBQVdSLElBQVgsQ0FBZ0JxTCxhQUFoQixDQUE4QkcsT0FBbkUsRUFBNEU7QUFDeEVILDRCQUFnQixLQUFLN0ssS0FBTCxDQUFXUixJQUFYLENBQWdCcUwsYUFBaEIsQ0FBOEJHLE9BQTlCLENBQXNDbkosR0FBdEMsQ0FBMEMsQ0FBQzZHLElBQUQsRUFBT3ZOLENBQVAsS0FBYTtBQUNuRTJQLDhCQUFjcEMsS0FBS3VDLE1BQW5CO0FBQ0FGO0FBQ0EsdUJBQU87QUFBQTtBQUFBLHNCQUFLLFdBQVUsY0FBZixFQUE4QixLQUFLNVAsQ0FBbkM7QUFDSDtBQUFBO0FBQUEsMEJBQU0sV0FBVSxPQUFoQjtBQUF5QnVOLDZCQUFLM0g7QUFBOUIscUJBREc7QUFFSDtBQUFBO0FBQUEsMEJBQU0sV0FBVSxTQUFoQjtBQUFBO0FBQStCMkgsNkJBQUt1QztBQUFwQztBQUZHLGlCQUFQO0FBSUgsYUFQZSxDQUFoQjtBQVFIOztBQUVELGVBQ0k7QUFBQTtBQUFBLGNBQUssV0FBVSxjQUFmO0FBQ0k7QUFBQTtBQUFBO0FBQ0k7QUFBQTtBQUFBLHNCQUF1QixZQUFZLHlEQUFuQztBQUFBO0FBQ3FCRiw4QkFEckI7QUFBQTtBQUFBLGlCQURKO0FBSUk7QUFBQTtBQUFBO0FBQ0k7QUFBQTtBQUFBLDBCQUFLLFdBQVUsV0FBZjtBQUNLRixxQ0FETDtBQUVJO0FBQUE7QUFBQSw4QkFBSyxXQUFVLGNBQWY7QUFDSTtBQUFBO0FBQUEsa0NBQU0sV0FBVSxPQUFoQjtBQUF5QjtBQUF6Qiw2QkFESjtBQUVJO0FBQUE7QUFBQSxrQ0FBTSxXQUFVLFNBQWhCO0FBQUE7QUFBK0JDO0FBQS9CO0FBRkoseUJBRko7QUFNSTtBQUFBO0FBQUEsOEJBQUssV0FBVSxjQUFmO0FBQ0k7QUFBQTtBQUFBLGtDQUFNLFdBQVUsT0FBaEI7QUFBeUI7QUFBekIsNkJBREo7QUFFSTtBQUFBO0FBQUEsa0NBQU0sV0FBVSxTQUFoQjtBQUFBO0FBQStCQSw2Q0FBVztBQUExQztBQUZKLHlCQU5KO0FBVUk7QUFBQTtBQUFBLDhCQUFLLFdBQVUsY0FBZjtBQUNJO0FBQUE7QUFBQSxrQ0FBTSxXQUFVLE9BQWhCO0FBQXlCO0FBQXpCLDZCQURKO0FBRUk7QUFBQTtBQUFBLGtDQUFNLFdBQVUsU0FBaEI7QUFBQTtBQUErQkEsNkNBQVc7QUFBMUM7QUFGSjtBQVZKO0FBREo7QUFKSjtBQURKLFNBREo7QUEwQkg7QUFoRHNDOztrQkFvRDVCRixZOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM5RGY7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDQUE7Ozs7QUFFQTs7OztBQUNBOzs7Ozs7QUFFQSxNQUFNTSxPQUFOLFNBQXNCLGdCQUFNcEwsU0FBNUIsQ0FBc0M7QUFDbENDLGdCQUFZQyxLQUFaLEVBQW1CO0FBQ2YsY0FBTUEsS0FBTjtBQUNBLGFBQUtTLEtBQUwsR0FBYTtBQUNUNEkseUJBQWEsS0FBS3JKLEtBQUwsQ0FBV2tCLEtBQVgsQ0FBaUJ5RixNQUFqQixDQUF3QnZMO0FBRDVCLFNBQWI7QUFHSDs7QUFFRCtQLGNBQVU7QUFDTixhQUFLbkwsS0FBTCxDQUFXRyxPQUFYLENBQW1CQyxJQUFuQixDQUF5QixRQUFPLEtBQUtLLEtBQUwsQ0FBVzRJLFdBQVksT0FBdkQ7QUFDSDs7QUFFRGhKLGFBQVM7O0FBRUwsZUFDSTtBQUFBO0FBQUE7QUFDSTtBQUFBO0FBQUEsa0JBQVEsV0FBVSx1REFBbEI7QUFDSTtBQUFBO0FBQUEsc0JBQUssV0FBVSxpQkFBZjtBQUNJO0FBQUE7QUFBQSwwQkFBSyxXQUFVLEtBQWY7QUFDSTtBQUFBO0FBQUEsOEJBQUssV0FBVSxPQUFmO0FBQ0k7QUFBQTtBQUFBLGtDQUFLLFdBQVUsMkNBQWY7QUFBQTtBQUFBO0FBREoseUJBREo7QUFJSSwrREFBSyxXQUFVLE9BQWYsR0FKSjtBQU1JO0FBQUE7QUFBQSw4QkFBSyxXQUFVLE9BQWY7QUFDSTtBQUFBO0FBQUEsa0NBQUksV0FBVSxrREFBZDtBQUNJO0FBQUE7QUFBQTtBQUFJO0FBQUE7QUFBQSwwQ0FBTSxXQUFVLDBCQUFoQjtBQUEyQywrRUFBSyxLQUFJLHFDQUFULEVBQStDLFdBQVUsV0FBekQ7QUFBM0M7QUFBSixpQ0FESjtBQUVJO0FBQUE7QUFBQTtBQUFJO0FBQUE7QUFBQSwwQ0FBTSxXQUFVLDRDQUFoQjtBQUE2RCwrRUFBSyxLQUFJLDZDQUFULEVBQXVELFdBQVUsV0FBakUsR0FBN0Q7QUFBQTtBQUE2SSxnRkFBTSxXQUFVLG9CQUFoQjtBQUE3STtBQUFKO0FBRko7QUFESjtBQU5KO0FBREo7QUFESixhQURKO0FBb0JRLGlCQUFLTCxLQUFMLENBQVc0SixJQUFYLENBQWdCLEtBQUtuSixLQUFMLENBQVc0SSxXQUEzQixJQUNJO0FBQUE7QUFBQTtBQUNJLHVEQUFLLFdBQVUsNEJBQWYsR0FESjtBQUlJLDRFQUFnQixLQUFLckosS0FBckIsSUFBNEIsTUFBTSxLQUFLQSxLQUFMLENBQVc0SixJQUFYLENBQWdCLEtBQUtuSixLQUFMLENBQVc0SSxXQUEzQixDQUFsQyxJQUpKO0FBTUk7QUFBQTtBQUFBLHNCQUFRLFNBQVMsS0FBSzhCLE9BQUwsQ0FBYTdLLElBQWIsQ0FBa0IsSUFBbEIsQ0FBakIsRUFBMEMsV0FBVSw0RUFBcEQ7QUFBaUk7QUFBQTtBQUFBLDBCQUFNLFdBQVUseUJBQWhCO0FBQUE7QUFBNEMsNkJBQUtOLEtBQUwsQ0FBV25GLGlCQUFYLENBQTZCOFAsTUFBekU7QUFBQTtBQUFBLHFCQUFqSTtBQUFBO0FBQUE7QUFOSixhQURKLEdBVWE7QUE5QnJCLFNBREo7QUFvQ0g7QUFsRGlDOztrQkFxRHZCTyxPOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMxRGY7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0FBOzs7O0FBQ0E7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQUVBLE1BQU1FLGtCQUFOLFNBQWlDLGdCQUFNdEwsU0FBdkMsQ0FBaUQ7QUFDN0NDLGdCQUFZQyxLQUFaLEVBQW1CO0FBQ2YsY0FBTUEsS0FBTjtBQUNBLGFBQUtTLEtBQUwsR0FBYTtBQUNUNEkseUJBQWEsSUFESjtBQUVUZ0MsMkJBQWUsRUFGTjtBQUdUQywwQkFBYyxJQUhMO0FBSVRDLCtCQUFvQixJQUpYO0FBS1RDLDZCQUFrQjtBQUxULFNBQWI7QUFPSDs7QUFFREMscUJBQWlCdEcsR0FBakIsRUFBc0I7QUFDbEI7QUFDQSxjQUFNdUcsY0FBYyxLQUFLMUwsS0FBTCxDQUFXdkUsUUFBWCxDQUFvQmtRLE1BQXhDO0FBQ0EsY0FBTWhGLFNBQVMsSUFBSWlGLGVBQUosQ0FBb0JGLFdBQXBCLENBQWY7QUFDQSxlQUFPL0UsT0FBT2tGLEdBQVAsQ0FBVzFHLEdBQVgsQ0FBUDtBQUNIOztBQUVEMkcsY0FBUztBQUNMLGFBQUsvSCxPQUFMLENBQWFyQyxNQUFiLENBQW9CdkIsT0FBcEIsQ0FBNEJDLElBQTVCLENBQWlDLG9DQUFqQztBQUNIOztBQUVEMEMsd0JBQW9CO0FBQ2hCLFlBQUl6RyxRQUFRLEtBQUsyRCxLQUFMLENBQVdrQixLQUFYLENBQWlCeUYsTUFBakIsQ0FBd0J2TCxFQUFwQztBQUNBLFlBQUkrSCxRQUFRLEtBQUtzSSxnQkFBTCxDQUFzQixPQUF0QixDQUFaO0FBQ0EsWUFBSUYsb0JBQW9CLEtBQUtFLGdCQUFMLENBQXNCLFNBQXRCLENBQXhCO0FBQ0FGLDRCQUFvQixJQUFJekcsSUFBSixDQUFTaUgsV0FBV1IsaUJBQVgsQ0FBVCxDQUFwQjtBQUNBQSw0QkFBb0JBLGtCQUFrQlMsUUFBbEIsRUFBcEI7QUFDQSxZQUFJUixrQkFBa0IsS0FBS0MsZ0JBQUwsQ0FBc0IsT0FBdEIsQ0FBdEI7QUFDQUQsMEJBQWtCLElBQUkxRyxJQUFKLENBQVNpSCxXQUFXUCxlQUFYLENBQVQsQ0FBbEI7QUFDQUEsMEJBQWtCQSxnQkFBZ0JRLFFBQWhCLEVBQWxCO0FBQ0EsWUFBSTNQLEtBQUosRUFBVztBQUNQLGlCQUFLd0UsUUFBTCxDQUFjLEVBQUV3SSxhQUFhaE4sS0FBZixFQUFzQmdQLGVBQWVsSSxLQUFyQyxFQUE0Q29JLGlCQUE1QyxFQUErREMsZUFBL0QsRUFBZDtBQUNBLGlCQUFLeEwsS0FBTCxDQUFXNUQsVUFBWCxDQUFzQkMsS0FBdEI7QUFFSDtBQUNKOztBQU1EZ0UsYUFBUzs7QUFFTCxlQUNJO0FBQUE7QUFBQSxjQUFLLFdBQVUsZ0JBQWY7QUFHUSxpQkFBS0wsS0FBTCxDQUFXNEosSUFBWCxDQUFnQixLQUFLbkosS0FBTCxDQUFXNEksV0FBM0IsSUFDSTtBQUFBO0FBQUE7QUFDSSxpRUFBWSxNQUFNLEtBQUtySixLQUFMLENBQVc0SixJQUFYLENBQWdCLEtBQUtuSixLQUFMLENBQVc0SSxXQUEzQixDQUFsQixHQURKO0FBRUksaUVBQWMsTUFBTSxLQUFLckosS0FBTCxDQUFXNEosSUFBWCxDQUFnQixLQUFLbkosS0FBTCxDQUFXNEksV0FBM0IsQ0FBcEIsR0FGSjtBQUdJO0FBQUE7QUFBQSxzQkFBSyxXQUFVLHlCQUFmO0FBQ0k7QUFBQTtBQUFBO0FBQUE7QUFBQSxxQkFESjtBQUVJO0FBQUE7QUFBQSwwQkFBTSxXQUFVLFNBQWhCO0FBQUE7QUFBQSxxQkFGSjtBQUdJO0FBQUE7QUFBQSwwQkFBTSxXQUFVLE1BQWhCO0FBQXlCLDZCQUFLNUksS0FBTCxDQUFXOEs7QUFBcEM7QUFISixpQkFISjtBQVFJLG9FQVJKO0FBU0ksaUVBQWEsTUFBSyxnQkFBbEIsR0FUSjtBQVVJO0FBQUE7QUFBQSxzQkFBUSxXQUFVLFlBQWxCLEVBQStCLFNBQVMsS0FBS08sT0FBTCxDQUFheEwsSUFBYixDQUFrQixJQUFsQixDQUF4QztBQUFBO0FBQUE7QUFWSixhQURKLEdBWWE7QUFmckIsU0FESjtBQXFCSDtBQWxFNEM7O0FBQTNDOEssa0IsQ0F1Q0szSixZLEdBQWU7QUFDbEJDLFlBQVEsTUFBTTtBQURJLEM7a0JBK0JYMEosa0I7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzlFZjs7OztBQUNBOzs7O0FBRUEsTUFBTWEsV0FBTixTQUEwQixnQkFBTW5NLFNBQWhDLENBQTBDO0FBQ3RDQyxnQkFBWUMsS0FBWixFQUFtQjtBQUNmLGNBQU1BLEtBQU47QUFDQSxhQUFLUyxLQUFMLEdBQWE7QUFDVHlKLHFCQUFRLEVBREM7QUFFVGdDLHNCQUFTLEVBRkE7QUFHVEMsc0JBQVMsRUFIQTtBQUlUQyxxQkFBUSxFQUpDO0FBS1RDLGtCQUFLck0sTUFBTXFNOztBQUxGLFNBQWI7QUFRSDs7QUFFRDFMLGlCQUFhMkwsS0FBYixFQUFvQjFMLENBQXBCLEVBQXNCO0FBQ2xCLGFBQUtDLFFBQUwsQ0FBYyxFQUFFLENBQUN5TCxLQUFELEdBQVUxTCxFQUFFRSxNQUFGLENBQVNFLEtBQXJCLEVBQWQ7QUFDSDs7QUFFRFgsYUFBUzs7QUFFTCxlQUNJO0FBQUE7QUFBQSxjQUFLLFdBQVUsYUFBZjtBQUNJO0FBQUE7QUFBQTtBQUFBO0FBQUEsYUFESjtBQUdJLHFEQUFPLE9BQU8sS0FBS0ksS0FBTCxDQUFXeUosT0FBekIsRUFBa0MsVUFBVSxLQUFLdkosWUFBTCxDQUFrQkwsSUFBbEIsQ0FBdUIsSUFBdkIsRUFBNEIsU0FBNUIsQ0FBNUMsRUFBb0YsV0FBVSxRQUE5RixFQUF1RyxhQUFZLFVBQW5ILEdBSEo7QUFJSSxxREFBTyxPQUFPLEtBQUtHLEtBQUwsQ0FBV3lMLFFBQXpCLEVBQW1DLFVBQVUsS0FBS3ZMLFlBQUwsQ0FBa0JMLElBQWxCLENBQXVCLElBQXZCLEVBQTRCLFVBQTVCLENBQTdDLEVBQXNGLFdBQVUsUUFBaEcsRUFBeUcsYUFBWSxXQUFySCxHQUpKO0FBS0kscURBQU8sT0FBTyxLQUFLRyxLQUFMLENBQVcwTCxRQUF6QixFQUFtQyxVQUFVLEtBQUt4TCxZQUFMLENBQWtCTCxJQUFsQixDQUF1QixJQUF2QixFQUE0QixVQUE1QixDQUE3QyxFQUFzRixXQUFVLFFBQWhHLEVBQXlHLGFBQVksV0FBckgsR0FMSjtBQU1JLHFEQUFPLE9BQU8sS0FBS0csS0FBTCxDQUFXMkwsT0FBekIsRUFBa0MsVUFBVSxLQUFLekwsWUFBTCxDQUFrQkwsSUFBbEIsQ0FBdUIsSUFBdkIsRUFBNEIsU0FBNUIsQ0FBNUMsRUFBb0YsV0FBVSxVQUE5RixFQUF5RyxhQUFZLFVBQXJIO0FBTkosU0FESjtBQVlIO0FBL0JxQzs7a0JBbUMzQjJMLFc7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3RDZjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDQUE7Ozs7QUFDQTs7OztBQUVBLE1BQU1NLFdBQU4sU0FBMEIsZ0JBQU16TSxTQUFoQyxDQUEwQztBQUN0Q0MsZ0JBQVlDLEtBQVosRUFBbUI7QUFDZixjQUFNQSxLQUFOO0FBQ0EsYUFBS1MsS0FBTCxHQUFhO0FBQ1R3SSx5QkFBYyxFQURMO0FBRVR1RCwwQkFBZSxFQUZOO0FBR1RDLDJCQUFnQixNQUhQO0FBSVR0RSxvQkFBTyxFQUpFO0FBS1RsTyxpQkFBSyxFQUxJO0FBTVR5UywyQkFBZ0I7O0FBTlAsU0FBYjtBQVNIOztBQUVEL0wsaUJBQWEyTCxLQUFiLEVBQW9CMUwsQ0FBcEIsRUFBc0I7QUFDbEIsYUFBS0MsUUFBTCxDQUFjLEVBQUUsQ0FBQ3lMLEtBQUQsR0FBVTFMLEVBQUVFLE1BQUYsQ0FBU0UsS0FBckIsRUFBZDtBQUNIOztBQUVEWCxhQUFTOztBQUVMLGVBQ0k7QUFBQTtBQUFBLGNBQUssV0FBVSxhQUFmO0FBQ0k7QUFBQTtBQUFBO0FBQUE7QUFBQSxhQURKO0FBR0kscURBQU8sT0FBTyxLQUFLSSxLQUFMLENBQVd3SSxXQUF6QixFQUFzQyxVQUFVLEtBQUt0SSxZQUFMLENBQWtCTCxJQUFsQixDQUF1QixJQUF2QixFQUE0QixhQUE1QixDQUFoRCxFQUE0RixXQUFVLFFBQXRHLEVBQStHLGFBQVksZUFBM0gsR0FISjtBQUlJLHFEQUFPLE9BQU8sS0FBS0csS0FBTCxDQUFXK0wsWUFBekIsRUFBdUMsVUFBVSxLQUFLN0wsWUFBTCxDQUFrQkwsSUFBbEIsQ0FBdUIsSUFBdkIsRUFBNEIsY0FBNUIsQ0FBakQsRUFBOEYsV0FBVSxTQUF4RyxFQUFrSCxhQUFZLFFBQTlILEdBSko7QUFLSTtBQUFBO0FBQUEsa0JBQUssV0FBVSxVQUFmO0FBQ0k7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkFESjtBQUVJLHlEQUFPLE1BQUssT0FBWixFQUFvQixNQUFLLFFBQXpCLEVBQWtDLE9BQU0sTUFBeEMsRUFBK0MsU0FBUyxLQUFLRyxLQUFMLENBQVdnTSxhQUFYLEtBQTZCLE1BQXJGLEVBQTZGLFVBQVUsS0FBSzlMLFlBQUwsQ0FBa0JMLElBQWxCLENBQXVCLElBQXZCLEVBQTRCLGVBQTVCLENBQXZHLEdBRko7QUFBQTtBQUdJLHlEQUFPLE1BQUssT0FBWixFQUFvQixNQUFLLFFBQXpCLEVBQWtDLE9BQU0sUUFBeEMsRUFBaUQsU0FBUyxLQUFLRyxLQUFMLENBQVdnTSxhQUFYLEtBQTZCLFFBQXZGLEVBQWlHLFVBQVUsS0FBSzlMLFlBQUwsQ0FBa0JMLElBQWxCLENBQXVCLElBQXZCLEVBQTRCLGVBQTVCLENBQTNHLEdBSEo7QUFBQTtBQUFBLGFBTEo7QUFVSSxxREFBTyxPQUFPLEtBQUtHLEtBQUwsQ0FBVzBILE1BQXpCLEVBQWlDLFVBQVUsS0FBS3hILFlBQUwsQ0FBa0JMLElBQWxCLENBQXVCLElBQXZCLEVBQTRCLFFBQTVCLENBQTNDLEVBQWtGLFdBQVUsVUFBNUYsRUFBdUcsYUFBWSxTQUFuSCxHQVZKO0FBV0k7QUFBQTtBQUFBLGtCQUFRLFdBQVUsUUFBbEI7QUFBQTtBQUFBLGFBWEo7QUFZSSxxREFBTyxPQUFPLEtBQUtHLEtBQUwsQ0FBV3hHLEdBQXpCLEVBQThCLFVBQVUsS0FBSzBHLFlBQUwsQ0FBa0JMLElBQWxCLENBQXVCLElBQXZCLEVBQTRCLEtBQTVCLENBQXhDLEVBQTRFLFdBQVUsT0FBdEYsRUFBOEYsYUFBWSxZQUExRyxHQVpKO0FBYUkscURBQU8sT0FBTyxLQUFLRyxLQUFMLENBQVdpTSxhQUF6QixFQUF3QyxVQUFVLEtBQUsvTCxZQUFMLENBQWtCTCxJQUFsQixDQUF1QixJQUF2QixFQUE0QixlQUE1QixDQUFsRCxFQUFnRyxXQUFVLFVBQTFHLEVBQXFILGFBQVksaUJBQWpJO0FBYkosU0FESjtBQWtCSDtBQXRDcUM7O2tCQTBDM0JpTSxXOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM3Q2Y7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0FBOzs7O0FBQ0E7O0FBRUE7Ozs7QUFDQTs7Ozs7O0FBRUEsTUFBTUksa0JBQU4sU0FBaUMsZ0JBQU03TSxTQUF2QyxDQUFpRDtBQUM3Q0MsZ0JBQVlDLEtBQVosRUFBbUI7QUFDZixjQUFNQSxLQUFOO0FBQ0EsYUFBS1MsS0FBTCxHQUFhLEVBQWI7QUFHSDs7QUFFRG1NLG9CQUFnQjtBQUNaLFlBQUlDLGFBQWE7QUFDYmhTLCtCQUFvQixLQUFLbUYsS0FBTCxDQUFXbkYsaUJBRGxCO0FBRWJVLDhCQUFtQixLQUFLeUUsS0FBTCxDQUFXekU7QUFGakIsU0FBakI7QUFJQXNSLHFCQUFhQyxtQkFBbUJDLEtBQUtDLFNBQUwsQ0FBZUgsVUFBZixDQUFuQixDQUFiO0FBQ0EsWUFBSUksYUFBYUgsbUJBQW1CQyxLQUFLQyxTQUFMLENBQWUsS0FBS2hOLEtBQUwsQ0FBV3RGLGNBQTFCLENBQW5CLENBQWpCO0FBQ0EsYUFBS3NGLEtBQUwsQ0FBV0csT0FBWCxDQUFtQkMsSUFBbkIsQ0FBeUIsNEJBQTJCeU0sVUFBVyxXQUFVSSxVQUFXLEVBQXBGO0FBQ0g7O0FBRUQ1TSxhQUFTOztBQUVMLGVBQ0k7QUFBQTtBQUFBO0FBRUk7QUFBQTtBQUFBLDZCQUFvQixLQUFLTCxLQUF6QixJQUFnQyxjQUFjLEtBQUtBLEtBQUwsQ0FBV2tOLDBCQUF6RCxFQUFxRixPQUFNLDJCQUEzRjtBQUNJO0FBQUE7QUFBQSxzQkFBUyxXQUFVLGVBQW5CO0FBRUk7QUFDSSxpQ0FBUSxtQkFEWjtBQUVJLDhCQUFNLEtBQUtsTixLQUFMLENBQVduRixpQkFGckI7QUFHSSxrQ0FBVSxFQUhkO0FBSUksZ0NBQVEsS0FBS21GLEtBQUwsQ0FBV3JELHVCQUFYLENBQW1DMkQsSUFBbkMsQ0FBd0MsSUFBeEM7QUFKWixzQkFGSjtBQVNJO0FBQ0ksaUNBQVEsYUFEWjtBQUVJLDhCQUFLLE1BRlQ7QUFHSSw4QkFBTSxLQUFLTixLQUFMLENBQVdtTixZQUhyQjtBQUlJLGtDQUFVLEtBQUtuTixLQUFMLENBQVduRixpQkFBWCxDQUE2QkMsTUFBN0IsQ0FBb0NDLEtBQUtBLEVBQUV6QixJQUFGLElBQVUsTUFBbkQsQ0FKZDtBQUtJLGdDQUFRLEtBQUswRyxLQUFMLENBQVdyRCx1QkFBWCxDQUFtQzJELElBQW5DLENBQXdDLElBQXhDO0FBTFosc0JBVEo7QUFpQkk7QUFDSSxpQ0FBUSxtQkFEWjtBQUVJLDhCQUFLLEtBRlQ7QUFHSSw4QkFBTSxLQUFLTixLQUFMLENBQVdvTixpQkFIckI7QUFJSSxrQ0FBVSxLQUFLcE4sS0FBTCxDQUFXbkYsaUJBQVgsQ0FBNkJDLE1BQTdCLENBQW9DQyxLQUFLQSxFQUFFekIsSUFBRixJQUFVLEtBQW5ELENBSmQ7QUFLSSxnQ0FBUSxLQUFLMEcsS0FBTCxDQUFXckQsdUJBQVgsQ0FBbUMyRCxJQUFuQyxDQUF3QyxJQUF4QztBQUxaLHNCQWpCSjtBQXlCSTtBQUNJLGlDQUFRLGFBRFo7QUFFSSw4QkFBSyxLQUZUO0FBR0ksOEJBQU0sS0FBS04sS0FBTCxDQUFXcU47QUFIckI7QUF6Qko7QUFESixhQUZKO0FBc0NJO0FBQUE7QUFBQSxrQkFBUSxTQUFTLEtBQUtULGFBQUwsQ0FBbUJ0TSxJQUFuQixDQUF3QixJQUF4QixDQUFqQixFQUFnRCxXQUFVLHFFQUExRDtBQUFBO0FBQUE7QUF0Q0osU0FESjtBQTRDSDtBQWhFNEM7O2tCQW1FbENxTSxrQjs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDekVmOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0FBOzs7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUFFQSxNQUFNVyxpQkFBTixTQUFnQyxnQkFBTXhOLFNBQXRDLENBQWdEO0FBQzVDQyxnQkFBWUMsS0FBWixFQUFtQjtBQUNmLGNBQU1BLEtBQU47QUFDQSxhQUFLUyxLQUFMLEdBQWEsRUFBYjtBQUdIOztBQUVEcUMsd0JBQW9CO0FBQ2hCLGFBQUt0SSxPQUFMO0FBQ0g7O0FBRURBLGNBQVU7QUFDTixZQUFJO0FBQ0FlLDRCQURBO0FBRUFWLDZCQUZBO0FBR0FIO0FBSEEsWUFJQSxLQUFLc0YsS0FKVDs7QUFNQSxZQUFJO0FBQ0EsZ0JBQUl2RixjQUFjLEtBQUtnUixnQkFBTCxDQUFzQixRQUF0QixDQUFsQjtBQUNBLGdCQUFJL1EsaUJBQWlCLEtBQUsrUSxnQkFBTCxDQUFzQixRQUF0QixDQUFyQjtBQUNBLGdCQUFJL1EsY0FBSixFQUFvQjtBQUNoQkEsaUNBQWlCcVMsS0FBS1EsS0FBTCxDQUFXN1MsY0FBWCxDQUFqQjtBQUNILGFBRkQsTUFFTztBQUNIQSxpQ0FBaUIsRUFBakI7QUFDSDtBQUNERCwwQkFBY3NTLEtBQUtRLEtBQUwsQ0FBVzlTLFdBQVgsQ0FBZDtBQUNBLGlCQUFLK1MsVUFBTCxDQUFnQi9TLFdBQWhCLEVBQTZCQyxjQUE3QixFQUE2QyxJQUE3QztBQUNILFNBVkQsQ0FVRSxPQUFPa0csQ0FBUCxFQUFVO0FBQ1I3QixvQkFBUWxGLEtBQVIsQ0FBYytHLENBQWQ7QUFDSDtBQUNKOztBQUVENksscUJBQWlCdEcsR0FBakIsRUFBc0I7QUFDbEI7QUFDQSxjQUFNdUcsY0FBYyxLQUFLMUwsS0FBTCxDQUFXdkUsUUFBWCxDQUFvQmtRLE1BQXhDO0FBQ0EsY0FBTWhGLFNBQVMsSUFBSWlGLGVBQUosQ0FBb0JGLFdBQXBCLENBQWY7QUFDQSxlQUFPL0UsT0FBT2tGLEdBQVAsQ0FBVzFHLEdBQVgsQ0FBUDtBQUNIOztBQUVEcUksZUFBVy9TLFdBQVgsRUFBd0JDLGNBQXhCLEVBQXdDQyxVQUF4QyxFQUFvRDtBQUNoRCxhQUFLcUYsS0FBTCxDQUFXeEYsT0FBWCxDQUFtQkMsV0FBbkIsRUFBZ0NDLGNBQWhDLEVBQWdEQyxVQUFoRDtBQUNIOztBQUVEOFMsaUJBQWFDLFdBQWIsRUFBMEI7QUFDdEIsWUFBSWpULGNBQWM7QUFDZEksK0JBQW1CLEtBQUttRixLQUFMLENBQVduRixpQkFEaEI7QUFFZFUsOEJBQWtCLEtBQUt5RSxLQUFMLENBQVd6RTtBQUZmLFNBQWxCO0FBSUEsWUFBSXNSLGFBQWFDLG1CQUFtQkMsS0FBS0MsU0FBTCxDQUFldlMsV0FBZixDQUFuQixDQUFqQjtBQUNBLFlBQUl3UyxhQUFhSCxtQkFBbUJDLEtBQUtDLFNBQUwsQ0FBZVUsV0FBZixDQUFuQixDQUFqQjtBQUNBLGFBQUsxTixLQUFMLENBQVdHLE9BQVgsQ0FBbUJnQixPQUFuQixDQUE0Qiw0QkFBMkIwTCxVQUFXLFdBQVVJLFVBQVcsRUFBdkY7O0FBRUEsYUFBS08sVUFBTCxDQUFnQi9TLFdBQWhCLEVBQTZCaVQsV0FBN0IsRUFBMEMsSUFBMUM7QUFDSDs7QUFFRHJOLGFBQVM7O0FBRUwsZUFDSTtBQUFBO0FBQUE7QUFDSTtBQUFBO0FBQUEsNkJBQW9CLEtBQUtMLEtBQXpCLElBQWdDLGNBQWMsS0FBS0EsS0FBTCxDQUFXMk4sa0JBQXpELEVBQTZFLE9BQU0sMkJBQW5GO0FBQ0ksNkVBQVksS0FBSzNOLEtBQWpCLElBQXdCLGNBQWMsS0FBS3lOLFlBQUwsQ0FBa0JuTixJQUFsQixDQUF1QixJQUF2QixDQUF0QyxJQURKO0FBRUksK0RBQWMsS0FBS04sS0FBbkI7QUFGSjtBQURKLFNBREo7QUFRSDtBQW5FMkM7O2tCQXNFakNzTixpQjs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDNUVmOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0FBOzs7O0FBRUE7Ozs7OztBQUVBLE1BQU1NLFFBQU4sU0FBdUIsZ0JBQU05TixTQUE3QixDQUF1QztBQUNuQ0MsZ0JBQVlDLEtBQVosRUFBbUI7QUFDZixjQUFNQSxLQUFOO0FBQ0g7O0FBRURLLGFBQVM7O0FBRUwsWUFBSSxFQUFFdUosSUFBRixFQUFRaUUsT0FBUixLQUFvQixLQUFLN04sS0FBN0I7O0FBRUEsZUFDSTtBQUFBO0FBQUEsY0FBUyxXQUFVLHlCQUFuQjtBQUNJO0FBQUE7QUFBQSxrQkFBSyxXQUFVLGlCQUFmO0FBQ0k7QUFBQTtBQUFBLHNCQUFLLFdBQVUsS0FBZjtBQUNJO0FBQUE7QUFBQSwwQkFBSyxXQUFVLFFBQWY7QUFFUTZOLGdDQUFRaE0sR0FBUixDQUFZLENBQUN4RixLQUFELEVBQVFsQixDQUFSLEtBQWM7QUFDdEIsbUNBQU8sNERBQW9CLEtBQUs2RSxLQUF6QixJQUFnQyxTQUFTNEosS0FBS3ZOLEtBQUwsQ0FBekMsRUFBc0QsS0FBS2xCLENBQTNELElBQVA7QUFDSCx5QkFGRDtBQUZSO0FBREo7QUFESjtBQURKLFNBREo7QUFlSDtBQXhCa0M7O2tCQTRCeEJ5UyxROzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNoQ2Y7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDQUE7Ozs7QUFDQTs7QUFFQTs7OztBQUNBOzs7Ozs7QUFFQSxNQUFNRSxNQUFOLFNBQXFCLGdCQUFNaE8sU0FBM0IsQ0FBcUM7QUFDakNDLGdCQUFZQyxLQUFaLEVBQW1CO0FBQ2YsY0FBTUEsS0FBTjtBQUNBLGFBQUtTLEtBQUwsR0FBYTtBQUNUc04sc0JBQVUsSUFERDtBQUVUQyx3QkFBWSxLQUZIO0FBR1RqUyx3QkFBWSxDQUFDLEdBQUQsRUFBTSxJQUFOLENBSEg7QUFJVEgsMkJBQWUsQ0FBQyxDQUFELEVBQUksRUFBSixDQUpOO0FBS1RNLG9CQUFRO0FBTEMsU0FBYjtBQU9IOztBQUVEK1IsOEJBQTBCak8sS0FBMUIsRUFBaUM7QUFDN0IsYUFBS2EsUUFBTCxjQUFtQmIsTUFBTXRGLGNBQXpCO0FBQ0g7O0FBRURvSSx3QkFBb0I7QUFDaEIsYUFBS2pDLFFBQUwsY0FBbUIsS0FBS2IsS0FBTCxDQUFXdEYsY0FBOUI7QUFDSDs7QUFFRCtTLG1CQUFlO0FBQ1gsWUFBSUMsY0FBYztBQUNkM1Isd0JBQVksS0FBSzBFLEtBQUwsQ0FBVzFFLFVBRFQ7QUFFZEgsMkJBQWUsS0FBSzZFLEtBQUwsQ0FBVzdFLGFBRlo7QUFHZE0sb0JBQVEsS0FBS3VFLEtBQUwsQ0FBV3ZFO0FBSEwsU0FBbEI7QUFLQSxhQUFLOEQsS0FBTCxDQUFXeU4sWUFBWCxDQUF3QkMsV0FBeEI7QUFDQSxhQUFLN00sUUFBTCxDQUFjLEVBQUVtTixZQUFZLEtBQWQsRUFBZDtBQUNIOztBQUVERSxlQUFXQyxLQUFYLEVBQWtCO0FBQ2QsYUFBS3ROLFFBQUwsQ0FBYyxFQUFFa04sVUFBVUksTUFBTUMsYUFBbEIsRUFBZDtBQUNIOztBQUVEQyxnQkFBWS9VLElBQVosRUFBa0I7QUFDZCxhQUFLdUgsUUFBTCxDQUFjLEVBQUVrTixVQUFVLElBQVosRUFBa0I3UixRQUFRNUMsSUFBMUIsRUFBZCxFQUFnRCxNQUFNO0FBQ2xELGdCQUFHQSxJQUFILEVBQVE7QUFDSixxQkFBS21VLFlBQUw7QUFDSDtBQUNKLFNBSkQ7QUFLSDs7QUFFRGEsbUJBQWU7QUFDWCxhQUFLek4sUUFBTCxDQUFjO0FBQ1ZtTix3QkFBWSxDQUFDLEtBQUt2TixLQUFMLENBQVd1TjtBQURkLFNBQWQ7QUFHSDs7QUFFRE8sZ0JBQVlqVixJQUFaLEVBQWtCa1YsS0FBbEIsRUFBeUI7QUFDckIsYUFBSzNOLFFBQUwsQ0FBYztBQUNWLGFBQUN2SCxJQUFELEdBQVFrVjtBQURFLFNBQWQ7QUFHSDs7QUFFREMsc0JBQWtCNVQsaUJBQWxCLEVBQXFDO0FBQ2pDLFlBQUlBLHFCQUFxQkEsa0JBQWtCOFAsTUFBM0MsRUFBbUQ7QUFDL0MsbUJBQU85UCxrQkFBa0JHLE1BQWxCLENBQXlCLENBQUMwVCxLQUFELEVBQVF4VCxJQUFSLEVBQWNDLENBQWQsS0FBb0I7QUFDaEQsb0JBQUlBLEtBQUssQ0FBVCxFQUFZO0FBQ1J1VCw2QkFBUyxJQUFUO0FBQ0g7QUFDREEseUJBQVUsR0FBRXhULEtBQUs2RixJQUFLLEVBQXRCO0FBQ0EsdUJBQU8yTixLQUFQO0FBQ0gsYUFOTSxFQU1KLEVBTkksQ0FBUDtBQU9IO0FBQ0o7O0FBRURyTyxhQUFTOztBQUVMLFlBQUlzTyxjQUFjLEtBQUtGLGlCQUFMLENBQXVCLEtBQUt6TyxLQUFMLENBQVduRixpQkFBbEMsQ0FBbEI7O0FBRUEsZUFDSTtBQUFBO0FBQUEsY0FBUyxXQUFVLFlBQW5CO0FBQ0k7QUFBQTtBQUFBLGtCQUFLLFdBQVUsaUJBQWY7QUFDSTtBQUFBO0FBQUEsc0JBQUssV0FBVSxLQUFmO0FBQ0k7QUFBQTtBQUFBLDBCQUFLLFdBQVUsUUFBZjtBQUNJO0FBQUE7QUFBQSw4QkFBSyxXQUFVLGFBQWY7QUFDSTtBQUFBO0FBQUEsa0NBQUssV0FBVSxlQUFmO0FBQ0k7QUFBQTtBQUFBLHNDQUFJLFdBQVUsYUFBZDtBQUNJO0FBQUE7QUFBQSwwQ0FBSSxTQUFTLEtBQUtxVCxVQUFMLENBQWdCNU4sSUFBaEIsQ0FBcUIsSUFBckIsQ0FBYjtBQUF5QztBQUFBO0FBQUEsOENBQU0sV0FBVSx5Q0FBaEI7QUFBMEQsbUZBQUssS0FBSSxzQ0FBVCxFQUFnRCxXQUFVLFdBQTFEO0FBQTFEO0FBQXpDLHFDQURKO0FBRUk7QUFBQTtBQUFBLDBDQUFJLFNBQVMsS0FBS2dPLFlBQUwsQ0FBa0JoTyxJQUFsQixDQUF1QixJQUF2QixDQUFiO0FBQTJDO0FBQUE7QUFBQSw4Q0FBTSxXQUFVLHdEQUFoQjtBQUF5RSxtRkFBSyxLQUFJLHVDQUFULEVBQWlELFdBQVUsV0FBM0Q7QUFBekUseUNBQTNDO0FBQW9NLGdGQUFNLFdBQVUscUJBQWhCO0FBQXBNO0FBRko7QUFESiw2QkFESjtBQU9JO0FBQUE7QUFBQSxrQ0FBSyxXQUFVLGNBQWY7QUFDSyxxQ0FBS04sS0FBTCxDQUFXNk4sT0FBWCxDQUFtQmxELE1BRHhCO0FBQUE7QUFDa0Q7QUFBQTtBQUFBLHNDQUFNLFdBQVUsUUFBaEI7QUFBQTtBQUEyQmdFO0FBQTNCO0FBRGxEO0FBUEo7QUFESjtBQURKO0FBREosYUFESjtBQWtCSTtBQUFBO0FBQUE7QUFDSSx3QkFBRyxXQURQO0FBRUksOEJBQVUsS0FBS2xPLEtBQUwsQ0FBV3NOLFFBRnpCO0FBR0ksMEJBQU1hLFFBQVEsS0FBS25PLEtBQUwsQ0FBV3NOLFFBQW5CLENBSFY7QUFJSSw2QkFBUyxLQUFLTSxXQUFMLENBQWlCL04sSUFBakIsQ0FBc0IsSUFBdEIsRUFBNEIsSUFBNUI7QUFKYjtBQU1JO0FBQUE7QUFBQSxzQkFBVSxTQUFTLEtBQUsrTixXQUFMLENBQWlCL04sSUFBakIsQ0FBc0IsSUFBdEIsRUFBNEIsTUFBNUIsQ0FBbkI7QUFBQTtBQUFBLGlCQU5KO0FBT0k7QUFBQTtBQUFBLHNCQUFVLFNBQVMsS0FBSytOLFdBQUwsQ0FBaUIvTixJQUFqQixDQUFzQixJQUF0QixFQUE0QixPQUE1QixDQUFuQjtBQUFBO0FBQUEsaUJBUEo7QUFRSTtBQUFBO0FBQUEsc0JBQVUsU0FBUyxLQUFLK04sV0FBTCxDQUFpQi9OLElBQWpCLENBQXNCLElBQXRCLEVBQTRCLFVBQTVCLENBQW5CO0FBQUE7QUFBQTtBQVJKLGFBbEJKO0FBOEJRLGlCQUFLRyxLQUFMLENBQVd1TixVQUFYLEdBQXdCO0FBQUE7QUFBQSxrQkFBSyxTQUFTLEtBQUtNLFlBQUwsQ0FBa0JoTyxJQUFsQixDQUF1QixJQUF2QixDQUFkLEVBQTRDLFdBQVUsZUFBdEQ7QUFDcEI7QUFBQTtBQUFBLHNCQUFLLFdBQVUscUJBQWYsRUFBcUMsU0FBVU0sQ0FBRCxJQUFPO0FBQ2pEQSw4QkFBRStFLGVBQUY7QUFDQS9FLDhCQUFFaU8sY0FBRjtBQUNILHlCQUhEO0FBSUk7QUFBQTtBQUFBLDBCQUFLLFdBQVUsZ0JBQWY7QUFDSTtBQUFBO0FBQUEsOEJBQUssV0FBVSxXQUFmO0FBQ0k7QUFBQTtBQUFBLGtDQUFNLFdBQVUsSUFBaEI7QUFBQTtBQUFBLDZCQURKO0FBRUk7QUFBQTtBQUFBLGtDQUFNLFdBQVUsSUFBaEI7QUFBQTtBQUF5QixxQ0FBS3BPLEtBQUwsQ0FBVzFFLFVBQVgsQ0FBc0IsQ0FBdEIsQ0FBekI7QUFBQTtBQUF1RCxxQ0FBSzBFLEtBQUwsQ0FBVzFFLFVBQVgsQ0FBc0IsQ0FBdEI7QUFBdkQsNkJBRko7QUFHSTtBQUFBO0FBQUEsa0NBQU0sV0FBVSxJQUFoQjtBQUFBO0FBQUEsNkJBSEo7QUFJSTtBQUFBO0FBQUEsa0NBQU0sV0FBVSxJQUFoQjtBQUFBO0FBQUEsNkJBSko7QUFNSTtBQUNJLHFDQUFLLEdBRFQ7QUFFSSxxQ0FBSyxJQUZUO0FBR0ksdUNBQU8sS0FBSzBFLEtBQUwsQ0FBVzFFLFVBSHRCO0FBSUksc0NBQU0sR0FKVjtBQUtJLDJDQUFVLE9BTGQ7QUFNSSwwQ0FBVSxLQUFLd1MsV0FBTCxDQUFpQmpPLElBQWpCLENBQXNCLElBQXRCLEVBQTRCLFlBQTVCO0FBTmQ7QUFOSix5QkFESjtBQWdCSTtBQUFBO0FBQUEsOEJBQUssV0FBVSxXQUFmO0FBQ0k7QUFBQTtBQUFBLGtDQUFNLFdBQVUsSUFBaEI7QUFBQTtBQUFBLDZCQURKO0FBRUk7QUFBQTtBQUFBLGtDQUFNLFdBQVUsSUFBaEI7QUFBc0IscUNBQUtHLEtBQUwsQ0FBVzdFLGFBQVgsQ0FBeUIsQ0FBekIsQ0FBdEI7QUFBQTtBQUF1RCxxQ0FBSzZFLEtBQUwsQ0FBVzdFLGFBQVgsQ0FBeUIsQ0FBekIsQ0FBdkQ7QUFBQTtBQUFBLDZCQUZKO0FBR0k7QUFBQTtBQUFBLGtDQUFNLFdBQVUsSUFBaEI7QUFBQTtBQUFBLDZCQUhKO0FBSUk7QUFBQTtBQUFBLGtDQUFNLFdBQVUsSUFBaEI7QUFBQTtBQUFBLDZCQUpKO0FBTUk7QUFDSSxxQ0FBSyxDQURUO0FBRUkscUNBQUssRUFGVDtBQUdJLHVDQUFPLEtBQUs2RSxLQUFMLENBQVc3RSxhQUh0QjtBQUlJLHNDQUFNLENBSlY7QUFLSSwyQ0FBVSxPQUxkO0FBTUksMENBQVUsS0FBSzJTLFdBQUwsQ0FBaUJqTyxJQUFqQixDQUFzQixJQUF0QixFQUE0QixlQUE1QjtBQU5kO0FBTko7QUFoQkoscUJBSko7QUFvQ0k7QUFBQTtBQUFBLDBCQUFLLFdBQVUsb0JBQWY7QUFDSTtBQUFBO0FBQUEsOEJBQVEsV0FBVSxzQ0FBbEIsRUFBeUQsU0FBUyxLQUFLbU4sWUFBTCxDQUFrQm5OLElBQWxCLENBQXVCLElBQXZCLENBQWxFO0FBQUE7QUFBQTtBQURKO0FBcENKO0FBRG9CLGFBQXhCLEdBeUNTO0FBdkVqQixTQURKO0FBNkVIO0FBbkpnQzs7a0JBdUp0QndOLE07Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzdKZjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDQUE7Ozs7QUFDQTs7Ozs7O0FBRUEsTUFBTWdCLGdCQUFOLFNBQStCLGdCQUFNaFAsU0FBckMsQ0FBK0M7QUFDM0NDLGdCQUFZQyxLQUFaLEVBQW1CO0FBQ2YsY0FBTUEsS0FBTjtBQUNBLGFBQUtTLEtBQUwsR0FBYTtBQUNUNEkseUJBQWEsS0FBS3JKLEtBQUwsQ0FBV2tCLEtBQVgsQ0FBaUJ5RixNQUFqQixDQUF3QnZMO0FBRDVCLFNBQWI7QUFHSDs7QUFFRDBILHdCQUFvQjtBQUNoQixhQUFLOUMsS0FBTCxDQUFXNUQsVUFBWCxDQUFzQixLQUFLcUUsS0FBTCxDQUFXNEksV0FBakM7QUFDSDs7QUFFRDBGLGVBQVdyRyxJQUFYLEVBQWlCO0FBQ2IsYUFBSzFJLEtBQUwsQ0FBV3JELHVCQUFYLENBQW1DLE1BQW5DLEVBQTJDK0wsSUFBM0M7QUFDSDs7QUFFRHJJLGFBQVM7O0FBRUwsWUFBSTJPLFVBQVUsS0FBS2hQLEtBQUwsQ0FBVzRKLElBQVgsQ0FBZ0IsS0FBS25KLEtBQUwsQ0FBVzRJLFdBQTNCLENBQWQ7QUFDQSxZQUFJbEcsUUFBUSxFQUFaO0FBQ0EsWUFBSWtJLGdCQUFnQixFQUFwQjs7QUFFQSxZQUFJLEtBQUtyTCxLQUFMLENBQVduRixpQkFBWCxJQUFnQyxLQUFLbUYsS0FBTCxDQUFXbkYsaUJBQVgsQ0FBNkI4UCxNQUFqRSxFQUF5RTtBQUNyRVUsNEJBQWdCLEtBQUtyTCxLQUFMLENBQVduRixpQkFBWCxDQUE2QkMsTUFBN0IsQ0FBb0NDLEtBQUtBLEVBQUV6QixJQUFGLElBQVUsTUFBbkQsRUFBMkR1SSxHQUEzRCxDQUErRDlHLEtBQUtBLEVBQUVLLEVBQXRFLENBQWhCO0FBQ0g7O0FBRUQsWUFBSTRULFdBQVdBLFFBQVE3TCxLQUFuQixJQUE0QjZMLFFBQVE3TCxLQUFSLENBQWN3SCxNQUE5QyxFQUFzRDtBQUNsRHhILG9CQUFRNkwsUUFBUTdMLEtBQVIsQ0FBY3RCLEdBQWQsQ0FBa0IsQ0FBQzZHLElBQUQsRUFBT3ZOLENBQVAsS0FBYTtBQUNuQyx1QkFBTztBQUFBO0FBQUEsc0JBQUksS0FBS0EsQ0FBVDtBQUNIO0FBQUE7QUFBQSwwQkFBTyxXQUFVLE9BQWpCO0FBQ0t1Tiw2QkFBS0EsSUFBTCxDQUFVM0gsSUFEZjtBQUVJLGlFQUFPLE1BQUssVUFBWixFQUF1QixTQUFTc0ssY0FBYzRELE9BQWQsQ0FBc0J2RyxLQUFLQSxJQUFMLENBQVV0TixFQUFoQyxJQUFzQyxDQUFDLENBQXZFLEVBQTBFLFVBQVUsS0FBSzJULFVBQUwsQ0FBZ0J6TyxJQUFoQixDQUFxQixJQUFyQixFQUEyQm9JLEtBQUtBLElBQWhDLENBQXBGLEdBRko7QUFHSSxnRUFBTSxXQUFVLFdBQWhCO0FBSEoscUJBREc7QUFNSDtBQUFBO0FBQUEsMEJBQU0sV0FBVSwyQkFBaEI7QUFBNkNBLDZCQUFLdUI7QUFBbEQ7QUFORyxpQkFBUDtBQVFILGFBVE8sQ0FBUjtBQVVIOztBQUVELGVBQ0k7QUFBQTtBQUFBO0FBR1ErRSxzQkFFSTtBQUFBO0FBQUE7QUFDSTtBQUFBO0FBQUEsc0JBQVEsV0FBVSx3REFBbEI7QUFDSTtBQUFBO0FBQUEsMEJBQUssV0FBVSxpQkFBZjtBQUNJO0FBQUE7QUFBQSw4QkFBSyxXQUFVLEtBQWY7QUFDSTtBQUFBO0FBQUEsa0NBQUssV0FBVSxRQUFmO0FBQ0k7QUFBQTtBQUFBLHNDQUFLLFdBQVUsaUNBQWY7QUFDSTtBQUFBO0FBQUEsMENBQU0sU0FBUyxNQUFNO0FBQ2pCLHFEQUFLaFAsS0FBTCxDQUFXRyxPQUFYLENBQW1Cb0QsRUFBbkIsQ0FBc0IsQ0FBQyxDQUF2QjtBQUNILDZDQUZELEVBRUcsV0FBVSx3QkFGYjtBQUVzQywrRUFBSyxLQUFJLDRDQUFULEVBQXNELFdBQVUsV0FBaEU7QUFGdEMscUNBREo7QUFJSTtBQUFBO0FBQUEsMENBQUksV0FBVSxnQkFBZDtBQUFBO0FBQUE7QUFKSjtBQURKO0FBREoseUJBREo7QUFXSTtBQUFBO0FBQUEsOEJBQUssV0FBVSxLQUFmO0FBQ0k7QUFBQTtBQUFBLGtDQUFLLFdBQVUsUUFBZjtBQUNJO0FBQUE7QUFBQSxzQ0FBSyxXQUFVLFlBQWY7QUFDSTtBQUFBO0FBQUEsMENBQUssV0FBVSxrQ0FBZjtBQUNJLGlGQUFPLE1BQUssTUFBWixFQUFtQixXQUFVLDhDQUE3QixFQUE0RSxhQUFZLGFBQXhGLEdBREo7QUFFSTtBQUFBO0FBQUEsOENBQU0sV0FBVSxrQ0FBaEI7QUFBbUQsbUZBQUssS0FBSSw0Q0FBVCxFQUFzRCxXQUFVLFdBQWhFO0FBQW5EO0FBRkoscUNBREo7QUFLSTtBQUFBO0FBQUEsMENBQUssV0FBVSxvQkFBZjtBQUNJLGdGQUFNLFdBQVUsa0JBQWhCLEdBREo7QUFFSzhILHNEQUFjVixNQUZuQjtBQUFBO0FBQUE7QUFMSjtBQURKO0FBREo7QUFYSjtBQURKLGlCQURKO0FBOEJJO0FBQUE7QUFBQSxzQkFBUyxXQUFVLHVCQUFuQjtBQUNJO0FBQUE7QUFBQSwwQkFBSyxXQUFVLGNBQWY7QUFDSTtBQUFBO0FBQUEsOEJBQUssV0FBVSxvQkFBZjtBQUNJO0FBQUE7QUFBQSxrQ0FBSSxXQUFVLG9CQUFkO0FBQ0t4SDtBQURMO0FBREo7QUFESjtBQURKLGlCQTlCSjtBQXdDSTtBQUFBO0FBQUEsc0JBQVEsV0FBVSxxRUFBbEIsRUFBd0YsU0FBUyxNQUFNO0FBQ25HLGlDQUFLbkQsS0FBTCxDQUFXRyxPQUFYLENBQW1Cb0QsRUFBbkIsQ0FBc0IsQ0FBQyxDQUF2QjtBQUNILHlCQUZEO0FBQUE7QUFBQTtBQXhDSixhQUZKLEdBNkNhO0FBaERyQixTQURKO0FBc0RIO0FBN0YwQzs7a0JBZ0doQ3VMLGdCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNuR2Y7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0FBOzs7O0FBQ0E7O0FBRUE7Ozs7QUFDQTs7Ozs7O0FBRUEsTUFBTUksZUFBTixTQUE4QixnQkFBTXBQLFNBQXBDLENBQThDO0FBQzFDQyxnQkFBWUMsS0FBWixFQUFtQjtBQUNmLGNBQU1BLEtBQU47QUFDQSxhQUFLUyxLQUFMLEdBQWE7QUFDVDBPLDRCQUFnQixLQUFLblAsS0FBTCxDQUFXa0IsS0FBWCxDQUFpQnlGLE1BQWpCLENBQXdCdkwsRUFEL0I7QUFFVGdVLDRCQUFnQixLQUFLcFAsS0FBTCxDQUFXa0IsS0FBWCxDQUFpQnlGLE1BQWpCLENBQXdCdEksUUFGL0I7QUFHVHlILHVCQUFXLElBSEY7QUFJVHdGLDBCQUFjO0FBSkwsU0FBYjtBQU1IOztBQUVEUSxjQUFVO0FBQ047QUFDQTtBQUNBO0FBQ0g7O0FBRUR1RCxtQkFBZXJJLElBQWYsRUFBcUI7QUFDakIsYUFBS25HLFFBQUwsQ0FBYyxFQUFFeUssY0FBY3RFLElBQWhCLEVBQWQ7QUFDSDs7QUFFRGxFLHdCQUFvQjtBQUNoQixZQUFJekUsV0FBVyxLQUFLMkIsS0FBTCxDQUFXa0IsS0FBWCxDQUFpQnlGLE1BQWpCLENBQXdCdEksUUFBdkM7QUFDQSxZQUFJRixXQUFXLEtBQUs2QixLQUFMLENBQVdrQixLQUFYLENBQWlCeUYsTUFBakIsQ0FBd0J2TCxFQUF2Qzs7QUFFQSxhQUFLNEUsS0FBTCxDQUFXNUIsWUFBWCxDQUF3QkQsUUFBeEIsRUFBa0NFLFFBQWxDLEVBQTZDeUgsU0FBRCxJQUFlO0FBQ3ZELGlCQUFLakYsUUFBTCxDQUFjLEVBQUVpRixTQUFGLEVBQWQ7QUFDSCxTQUZEO0FBSUg7O0FBRUR6RixhQUFTOztBQUVMLGVBQ0k7QUFBQTtBQUFBO0FBRUk7QUFBQTtBQUFBLGtCQUFRLFdBQVUsbUNBQWxCO0FBQ0k7QUFBQTtBQUFBLHNCQUFLLFdBQVUsaUJBQWY7QUFDSTtBQUFBO0FBQUEsMEJBQUssV0FBVSxLQUFmO0FBQ0k7QUFBQTtBQUFBLDhCQUFLLFdBQVUsT0FBZjtBQUNJO0FBQUE7QUFBQSxrQ0FBTSxXQUFVLGdCQUFoQixFQUFpQyxTQUFTLE1BQU07QUFDNUMsNkNBQUtMLEtBQUwsQ0FBV0csT0FBWCxDQUFtQm9ELEVBQW5CLENBQXNCLENBQUMsQ0FBdkI7QUFDSCxxQ0FGRDtBQUVHLHVFQUFLLEtBQUksMkNBQVQsRUFBcUQsV0FBVSxXQUEvRDtBQUZIO0FBREoseUJBREo7QUFNSTtBQUFBO0FBQUEsOEJBQUssV0FBVSxPQUFmO0FBQ0k7QUFBQTtBQUFBLGtDQUFLLFdBQVUsdURBQWY7QUFBQTtBQUFBO0FBREoseUJBTko7QUFTSSwrREFBSyxXQUFVLE9BQWY7QUFUSjtBQURKO0FBREosYUFGSjtBQW9CUSxpQkFBS3ZELEtBQUwsQ0FBV3NQLE9BQVgsQ0FBbUIsS0FBSzdPLEtBQUwsQ0FBVzBPLGNBQTlCLElBQ0k7QUFBQTtBQUFBO0FBRUk7QUFBQTtBQUFBLHNCQUFTLFdBQVUsd0JBQW5CO0FBQ0k7QUFBQTtBQUFBLDBCQUFLLFdBQVUsaUJBQWY7QUFDSTtBQUFBO0FBQUEsOEJBQUssV0FBVSxLQUFmO0FBQ0k7QUFBQTtBQUFBLGtDQUFLLFdBQVUsUUFBZjtBQUNJO0FBQ0ksb0RBQWdCLEtBQUtuUCxLQUFMLENBQVdzUCxPQUFYLENBQW1CLEtBQUs3TyxLQUFMLENBQVcwTyxjQUE5QixDQURwQjtBQUVJLG9EQUFnQixLQUFLMU8sS0FBTCxDQUFXMk87QUFGL0Isa0NBREo7QUFPUSxxQ0FBSzNPLEtBQUwsQ0FBV3FGLFNBQVgsR0FDSTtBQUNJLCtDQUFXLEtBQUtyRixLQUFMLENBQVdxRixTQUQxQjtBQUVJLG9EQUFnQixLQUFLdUosY0FBTCxDQUFvQi9PLElBQXBCLENBQXlCLElBQXpCO0FBRnBCLGtDQURKLEdBSVM7QUFYakI7QUFESjtBQURKO0FBREo7QUFGSixhQURKLEdBeUJhLEVBN0NyQjtBQWdESTtBQUFBO0FBQUEsa0JBQVEsV0FBVSxxRUFBbEI7QUFBQTtBQUFBO0FBaERKLFNBREo7QUFxREg7QUF0RnlDOztrQkEwRi9CNE8sZTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDaEdmOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBQTs7OztBQUNBOzs7O0FBRUE7Ozs7OztBQUdBLE1BQU1LLFdBQU4sU0FBMEIsZ0JBQU16UCxTQUFoQyxDQUEwQztBQUN0Q0MsZ0JBQVlDLEtBQVosRUFBbUI7QUFDZixjQUFNQSxLQUFOO0FBQ0g7O0FBRURLLGFBQVM7O0FBRUwsZUFDSTtBQUFBO0FBQUEsY0FBSyxXQUFVLFNBQWY7QUFDSTtBQUFBO0FBQUEsa0JBQVMsWUFBWSxDQUFyQixFQUF3QixzQkFBeEI7QUFDSTtBQUFBO0FBQUEsc0JBQU0sS0FBSyxDQUFYO0FBQ0k7QUFBQTtBQUFBO0FBQVk7QUFBWjtBQURKLGlCQURKO0FBSUk7QUFBQTtBQUFBLHNCQUFNLEtBQUssQ0FBWDtBQUNJO0FBQUE7QUFBQTtBQUFZO0FBQVo7QUFESixpQkFKSjtBQU9JO0FBQUE7QUFBQSxzQkFBTSxLQUFLLENBQVg7QUFDSTtBQUFBO0FBQUE7QUFBWTtBQUFaO0FBREo7QUFQSixhQURKO0FBWUk7QUFBQTtBQUFBLGtCQUFHLFdBQVUsYUFBYjtBQUFBO0FBQUEsYUFaSjtBQWFJO0FBQUE7QUFBQSxrQkFBSyxXQUFVLGFBQWY7QUFDSTtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQURKO0FBRUk7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUZKLGFBYko7QUFrQkk7QUFBQTtBQUFBLGtCQUFLLFdBQVUsU0FBZjtBQUNJO0FBQUE7QUFBQTtBQUNJO0FBQUE7QUFBQSwwQkFBTSxXQUFVLEtBQWhCO0FBQUE7QUFBQSxxQkFESjtBQUVJO0FBQUE7QUFBQSwwQkFBTSxXQUFVLE9BQWhCO0FBQUE7QUFBQTtBQUZKLGlCQURKO0FBS0k7QUFBQTtBQUFBO0FBQ0k7QUFBQTtBQUFBLDBCQUFNLFdBQVUsS0FBaEI7QUFBQTtBQUFBLHFCQURKO0FBRUk7QUFBQTtBQUFBLDBCQUFNLFdBQVUsT0FBaEI7QUFBQTtBQUFBO0FBRkosaUJBTEo7QUFTSTtBQUFBO0FBQUE7QUFDSTtBQUFBO0FBQUEsMEJBQU0sV0FBVSxLQUFoQjtBQUFBO0FBQUEscUJBREo7QUFFSTtBQUFBO0FBQUEsMEJBQU0sV0FBVSxPQUFoQjtBQUFBO0FBQUE7QUFGSixpQkFUSjtBQWFJO0FBQUE7QUFBQTtBQUNJO0FBQUE7QUFBQSwwQkFBTSxXQUFVLEtBQWhCO0FBQUE7QUFBQSxxQkFESjtBQUVJO0FBQUE7QUFBQSwwQkFBTSxXQUFVLE9BQWhCO0FBQUE7QUFBQTtBQUZKO0FBYkosYUFsQko7QUFxQ0k7QUFBQTtBQUFBLGtCQUFRLFdBQVUsU0FBbEI7QUFBQTtBQUFBLGFBckNKO0FBdUNJLDREQUFTLFdBQVUsVUFBbkI7QUF2Q0osU0FESjtBQTJDSDtBQWxEcUM7O2tCQXNEM0JrUCxXOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzVEZjs7OztBQUVBOzs7O0FBQ0E7Ozs7OztBQUVBLE1BQU1DLGNBQU4sU0FBNkIsZ0JBQU0xUCxTQUFuQyxDQUE2QztBQUN6Q0MsZ0JBQVlDLEtBQVosRUFBbUI7QUFDZixjQUFNQSxLQUFOO0FBQ0EsYUFBS1MsS0FBTCxHQUFhO0FBQ1QwTyw0QkFBZ0I7QUFEUCxTQUFiO0FBR0g7O0FBRURyTSx3QkFBb0I7QUFDaEIsWUFBSTNFLFdBQVcsS0FBSzZCLEtBQUwsQ0FBV2tCLEtBQVgsQ0FBaUJ5RixNQUFqQixDQUF3QnZMLEVBQXZDO0FBQ0EsWUFBSStDLFFBQUosRUFBYztBQUNWLGlCQUFLMEMsUUFBTCxDQUFjLEVBQUVzTyxnQkFBZ0JoUixRQUFsQixFQUFkO0FBQ0EsaUJBQUs2QixLQUFMLENBQVc5QixhQUFYLENBQXlCQyxRQUF6QjtBQUNIO0FBQ0o7O0FBRURrQyxhQUFTOztBQUVMLGVBQ0k7QUFBQTtBQUFBLGNBQUssV0FBVSxlQUFmO0FBR1EsaUJBQUtMLEtBQUwsQ0FBV3NQLE9BQVgsQ0FBbUIsS0FBSzdPLEtBQUwsQ0FBVzBPLGNBQTlCLElBQ0k7QUFBQTtBQUFBO0FBQ0k7QUFDSSxnQ0FBWSxJQURoQjtBQUVJLGlDQUFhLElBRmpCO0FBR0ksNkJBQVMsS0FBS25QLEtBQUwsQ0FBV3NQLE9BQVgsQ0FBbUIsS0FBSzdPLEtBQUwsQ0FBVzBPLGNBQTlCO0FBSGIsa0JBREo7QUFNSTtBQUNJLDZCQUFTLEtBQUtuUCxLQUFMLENBQVdzUCxPQUFYLENBQW1CLEtBQUs3TyxLQUFMLENBQVcwTyxjQUE5QjtBQURiLG1CQUVRLEtBQUtuUCxLQUZiO0FBTkosYUFESixHQVdhO0FBZHJCLFNBREo7QUFtQkg7QUFyQ3dDOztrQkF5QzlCd1AsYzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDOUNmOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBQTs7OztBQUNBOzs7O0FBRUEsTUFBTUMsY0FBTixTQUE2QixnQkFBTTNQLFNBQW5DLENBQTZDO0FBQ3pDQyxnQkFBWUMsS0FBWixFQUFtQjtBQUNmLGNBQU1BLEtBQU47QUFDSDs7QUFFRDBQLGlCQUFhclIsUUFBYixFQUF1QjtBQUNuQixZQUFJRixXQUFXLEtBQUs2QixLQUFMLENBQVdrQixLQUFYLENBQWlCeUYsTUFBakIsQ0FBd0J2TCxFQUF2QztBQUNBLGFBQUs0RSxLQUFMLENBQVdHLE9BQVgsQ0FBbUJDLElBQW5CLENBQXlCLGVBQWNqQyxRQUFTLElBQUdFLFFBQVMsT0FBNUQ7QUFDSDs7QUFFRGdDLGFBQVM7O0FBRUwsWUFBSSxFQUFFVSxJQUFGLEVBQVE0TyxTQUFSLEtBQXNCLEtBQUszUCxLQUFMLENBQVd5SyxPQUFyQzs7QUFFQSxlQUNJO0FBQUE7QUFBQSxjQUFLLFdBQVUsY0FBZjtBQUNJO0FBQUE7QUFBQSxrQkFBSSxXQUFVLGFBQWQ7QUFBQTtBQUFpQzFKLG9CQUFqQztBQUFBO0FBQUEsYUFESjtBQUVJO0FBQUE7QUFBQSxrQkFBSyxXQUFVLHdCQUFmO0FBQ0k7QUFBQTtBQUFBLHNCQUFJLFdBQVUsOEJBQWQ7QUFFUTRPLDhCQUFVOU4sR0FBVixDQUFjLENBQUMrTixRQUFELEVBQVd6VSxDQUFYLEtBQWlCO0FBQzNCLCtCQUFPO0FBQUE7QUFBQSw4QkFBSSxLQUFLQSxDQUFUO0FBQ0g7QUFBQTtBQUFBLGtDQUFLLFdBQVUsa0JBQWY7QUFDSTtBQUFBO0FBQUEsc0NBQUssV0FBVSxlQUFmO0FBQ0k7QUFBQTtBQUFBLDBDQUFJLFdBQVUsNkJBQWQ7QUFBNkN5VSxpREFBU0MsYUFBdEQ7QUFBQTtBQUFxRTtBQUFBO0FBQUEsOENBQU0sV0FBVSxhQUFoQjtBQUFBO0FBQWtDRCxxREFBU0U7QUFBM0M7QUFBckU7QUFESixpQ0FESjtBQUlJO0FBQUE7QUFBQSxzQ0FBSyxXQUFVLGdCQUFmO0FBQ0k7QUFBQTtBQUFBLDBDQUFLLFdBQVUsa0JBQWY7QUFDSSwrRUFBSyxLQUFJLGdEQUFULEVBQTBELFdBQVUsV0FBcEUsR0FESjtBQUVJO0FBQUE7QUFBQSw4Q0FBRyxXQUFVLFNBQWI7QUFBd0JGLHFEQUFTMUY7QUFBakM7QUFGSixxQ0FESjtBQUtJO0FBQUE7QUFBQSwwQ0FBSyxXQUFVLGdCQUFmO0FBRVEzTSwrQ0FBTzBHLElBQVAsQ0FBWTJMLFNBQVNHLE9BQXJCLEVBQThCbE8sR0FBOUIsQ0FBa0MsQ0FBQ21PLFNBQUQsRUFBWUMsR0FBWixLQUFvQjtBQUNsRCxtREFBTztBQUFBO0FBQUEsa0RBQUcsV0FBVSxRQUFiLEVBQXNCLEtBQUtBLEdBQTNCO0FBQ0g7QUFBQTtBQUFBLHNEQUFPLFdBQVUsNkJBQWpCO0FBQ0tEO0FBREwsaURBREc7QUFJRkoseURBQVNHLE9BQVQsQ0FBaUJDLFNBQWpCLEVBQTRCcFMsSUFBNUIsQ0FBaUMsSUFBakM7QUFKRSw2Q0FBUDtBQU1ILHlDQVBEO0FBRlI7QUFMSixpQ0FKSjtBQXNCSTtBQUFBO0FBQUEsc0NBQUssV0FBVSwyQkFBZjtBQUNJO0FBQUE7QUFBQSwwQ0FBUSxXQUFVLDZCQUFsQixFQUFnRCxTQUFTLEtBQUs4UixZQUFMLENBQWtCcFAsSUFBbEIsQ0FBdUIsSUFBdkIsRUFBNkJzUCxTQUFTTSxXQUF0QyxDQUF6RDtBQUFBO0FBQUE7QUFESjtBQXRCSjtBQURHLHlCQUFQO0FBNEJILHFCQTdCRDtBQUZSO0FBREo7QUFGSixTQURKO0FBMENIO0FBeER3Qzs7a0JBNEQ5QlQsYzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDL0RmOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBQTs7OztBQUNBOzs7O0FBRUEsTUFBTVUsaUJBQU4sU0FBZ0MsZ0JBQU1yUSxTQUF0QyxDQUFnRDtBQUM1Q0MsZ0JBQVlDLEtBQVosRUFBbUI7QUFDZixjQUFNQSxLQUFOO0FBQ0g7O0FBRURvUSxjQUFVaFYsRUFBVixFQUFjd0YsQ0FBZCxFQUFpQjtBQUNiLGFBQUtaLEtBQUwsQ0FBV0csT0FBWCxDQUFtQkMsSUFBbkIsQ0FBeUIsZUFBY2hGLEVBQUcsRUFBMUM7QUFDSDs7QUFFRGlWLFlBQVFqVixFQUFSLEVBQVl3RixDQUFaLEVBQWU7QUFDWEEsVUFBRStFLGVBQUY7QUFDQTtBQUNIOztBQUVEMkssd0JBQW9CQywyQkFBcEIsRUFBaUQ7QUFDN0MsZUFBT0EsNEJBQTRCdlYsTUFBNUIsQ0FBbUMsQ0FBQ3dWLEdBQUQsRUFBTXRWLElBQU4sRUFBWUMsQ0FBWixLQUFrQjtBQUN4RHFWLG1CQUFRLEdBQUV0VixLQUFLdVYsYUFBYyxFQUE3QjtBQUNBLGdCQUFJdlYsS0FBS3dWLGNBQVQsRUFBeUI7QUFDckJGLHVCQUFRLE1BQUt0VixLQUFLd1YsY0FBZSxFQUFqQztBQUNIO0FBQ0QsZ0JBQUl2VixJQUFJb1YsNEJBQTRCNUYsTUFBNUIsR0FBcUMsQ0FBN0MsRUFBZ0Q2RixPQUFRLElBQVI7QUFDaEQsbUJBQU9BLEdBQVA7QUFDSCxTQVBNLEVBT0osRUFQSSxDQUFQO0FBUUg7O0FBR0RuUSxhQUFTOztBQUVMLFlBQUksRUFBRWpGLEVBQUYsRUFBTXVWLGdCQUFOLEVBQXdCMUksTUFBeEIsRUFBZ0MwSCxTQUFoQyxFQUEyQ2lCLGNBQTNDLEVBQTJEN1AsSUFBM0QsRUFBaUU4UCxjQUFqRSxLQUFvRixLQUFLN1EsS0FBTCxDQUFXeUssT0FBbkc7O0FBRUEsWUFBSW1GLFdBQVdELFVBQVUsQ0FBVixDQUFmOztBQUVBLGVBQ0k7QUFBQTtBQUFBLGNBQUssV0FBVSw0QkFBZixFQUE0QyxTQUFTLEtBQUtTLFNBQUwsQ0FBZTlQLElBQWYsQ0FBb0IsSUFBcEIsRUFBMEJsRixFQUExQixDQUFyRDtBQUNJO0FBQUE7QUFBQSxrQkFBSyxXQUFVLHVCQUFmO0FBQ0k7QUFBQTtBQUFBLHNCQUFLLFdBQVUscUJBQWY7QUFDSTtBQUFBO0FBQUEsMEJBQUksV0FBVSxxQkFBZDtBQUNJO0FBQUE7QUFBQTtBQUFJO0FBQUE7QUFBQSxrQ0FBTSxXQUFVLDRCQUFoQjtBQUE2Qyx1RUFBSyxLQUFJLHFDQUFULEVBQStDLFdBQVUsV0FBekQ7QUFBN0M7QUFBSix5QkFESjtBQUVJO0FBQUE7QUFBQTtBQUFJO0FBQUE7QUFBQSxrQ0FBTSxXQUFVLDRCQUFoQjtBQUE2Qyx1RUFBSyxLQUFJLHFDQUFULEVBQStDLFdBQVUsV0FBekQ7QUFBN0M7QUFBSix5QkFGSjtBQUdJO0FBQUE7QUFBQTtBQUFJO0FBQUE7QUFBQSxrQ0FBTSxXQUFVLDRCQUFoQjtBQUE2Qyx1RUFBSyxLQUFJLHFDQUFULEVBQStDLFdBQVUsV0FBekQ7QUFBN0M7QUFBSix5QkFISjtBQUlJO0FBQUE7QUFBQTtBQUFJO0FBQUE7QUFBQSxrQ0FBTSxXQUFVLDRCQUFoQjtBQUE2Qyx1RUFBSyxLQUFJLHFDQUFULEVBQStDLFdBQVUsV0FBekQ7QUFBN0M7QUFBSix5QkFKSjtBQUtJO0FBQUE7QUFBQTtBQUFJO0FBQUE7QUFBQSxrQ0FBTSxXQUFVLDRCQUFoQjtBQUE2Qyx1RUFBSyxLQUFJLDBDQUFULEVBQW9ELFdBQVUsV0FBOUQ7QUFBN0M7QUFBSjtBQUxKLHFCQURKO0FBUUk7QUFBQTtBQUFBO0FBQUc7QUFBQTtBQUFBLDhCQUFNLFdBQVUsa0JBQWhCO0FBQW1DLG1FQUFLLEtBQUksZ0RBQVQsRUFBMEQsV0FBVSxXQUFwRTtBQUFuQyx5QkFBSDtBQUFnSXdVLGlDQUFTMUY7QUFBekk7QUFSSixpQkFESjtBQVdJO0FBQUE7QUFBQSxzQkFBSyxXQUFVLGVBQWY7QUFDSSwyREFBSyxLQUFJLHFDQUFULEVBQStDLFdBQVUsV0FBekQsR0FESjtBQUFBO0FBQzZFbko7QUFEN0U7QUFYSixhQURKO0FBZ0JJO0FBQUE7QUFBQSxrQkFBSyxXQUFVLGdCQUFmO0FBQ0k7QUFBQTtBQUFBLHNCQUFLLFdBQVUsNEJBQWY7QUFDSTtBQUFBO0FBQUEsMEJBQVEsV0FBVSw0QkFBbEI7QUFBQTtBQUFBLHFCQURKO0FBRUk7QUFBQTtBQUFBLDBCQUFLLFdBQVUsU0FBZjtBQUNJO0FBQUE7QUFBQSw4QkFBRyxXQUFVLCtCQUFiO0FBQUE7QUFBaUQ2TyxxQ0FBU2tCLGVBQTFEO0FBQUE7QUFBMkU7QUFBQTtBQUFBLGtDQUFNLFdBQVUsV0FBaEI7QUFBQTtBQUFnQ2xCLHlDQUFTRTtBQUF6QztBQUEzRTtBQURKO0FBRkosaUJBREo7QUFPSTtBQUFBO0FBQUEsc0JBQUssV0FBVSxzQkFBZjtBQUNJO0FBQUE7QUFBQSwwQkFBRyxXQUFVLGlCQUFiO0FBQWdDLDZCQUFLUSxtQkFBTCxDQUF5Qk8sY0FBekI7QUFBaEMscUJBREo7QUFFSTtBQUFBO0FBQUEsMEJBQUcsV0FBVSwyQkFBYjtBQUEwQ0Ysd0NBQTFDO0FBQUE7QUFBQSxxQkFGSjtBQUdJO0FBQUE7QUFBQSwwQkFBRyxXQUFVLDJCQUFiO0FBQUE7QUFBQTtBQUhKO0FBUEosYUFoQko7QUE2Qkk7QUFBQTtBQUFBLGtCQUFLLFdBQVUsMkJBQWY7QUFDSTtBQUFBO0FBQUEsc0JBQUssV0FBVSxLQUFmO0FBQ0k7QUFBQTtBQUFBLDBCQUFLLFdBQVUsT0FBZjtBQUNJO0FBQUE7QUFBQTtBQUFHLG1FQUFLLEtBQUkscUNBQVQsRUFBK0MsV0FBVSxXQUF6RCxHQUFIO0FBQTBFO0FBQUE7QUFBQSxrQ0FBTSxXQUFVLFlBQWhCO0FBQThCZix5Q0FBU0MsYUFBdkM7QUFBQTtBQUFzRCx5RUFBdEQ7QUFBQTtBQUFtRWUsaURBQWlCLENBQXBGO0FBQUE7QUFBQTtBQUExRTtBQURKLHFCQURKO0FBSUk7QUFBQTtBQUFBLDBCQUFLLFdBQVUsT0FBZjtBQUNJO0FBQUE7QUFBQTtBQUFHLG1FQUFLLEtBQUksNENBQVQsRUFBc0QsV0FBVSxXQUFoRSxHQUFIO0FBQWlGO0FBQUE7QUFBQSxrQ0FBTSxXQUFVLG1CQUFoQjtBQUFxQ2hCLHlDQUFTRyxPQUFULENBQWlCLFNBQWpCLElBQThCSCxTQUFTRyxPQUFULENBQWlCLFNBQWpCLEVBQTRCLENBQTVCLENBQTlCLEdBQStEO0FBQXBHO0FBQWpGO0FBREo7QUFKSjtBQURKO0FBN0JKLFNBREo7QUEwQ0g7QUExRTJDOztrQkE4RWpDSSxpQjs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDakZmOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7O0FBRUEsTUFBTVksY0FBTixTQUE2QixnQkFBTWpSLFNBQW5DLENBQTZDO0FBQ3pDQyxnQkFBWUMsS0FBWixFQUFtQjtBQUNmLGNBQU1BLEtBQU47QUFDQSxhQUFLUyxLQUFMLEdBQWEsRUFBYjtBQUdIOztBQUVENlAsd0JBQW9CQywyQkFBcEIsRUFBaUQ7QUFDN0MsZUFBT0EsNEJBQTRCdlYsTUFBNUIsQ0FBbUMsQ0FBQ3dWLEdBQUQsRUFBTXRWLElBQU4sRUFBWUMsQ0FBWixLQUFrQjtBQUN4RHFWLG1CQUFRLEdBQUV0VixLQUFLdVYsYUFBYyxFQUE3QjtBQUNBLGdCQUFJdlYsS0FBS3dWLGNBQVQsRUFBeUI7QUFDckJGLHVCQUFRLE1BQUt0VixLQUFLd1YsY0FBZSxFQUFqQztBQUNIO0FBQ0QsZ0JBQUl2VixJQUFJb1YsNEJBQTRCNUYsTUFBNUIsR0FBcUMsQ0FBN0MsRUFBZ0Q2RixPQUFRLElBQVI7QUFDaEQsbUJBQU9BLEdBQVA7QUFDSCxTQVBNLEVBT0osRUFQSSxDQUFQO0FBUUg7O0FBRURuUSxhQUFTOztBQUVMLFlBQUksRUFBRVUsSUFBRixFQUFROFAsY0FBUixFQUF3QmxCLFNBQXhCLEtBQXNDLEtBQUszUCxLQUFMLENBQVdtUCxjQUFyRDtBQUNBLFlBQUk2QixlQUFlLEVBQW5COztBQUVBLFlBQUlyQixhQUFhQSxVQUFVaEYsTUFBM0IsRUFBbUM7QUFDL0JnRixzQkFBVTlOLEdBQVYsQ0FBZStOLFFBQUQsSUFBYztBQUN4QixvQkFBSUEsU0FBU00sV0FBVCxJQUF3QixLQUFLbFEsS0FBTCxDQUFXb1AsY0FBdkMsRUFBdUQ7QUFDbkQ0QixtQ0FBZXBCLFNBQVNDLGFBQXhCO0FBQ0g7QUFDSixhQUpEO0FBS0g7O0FBRUQsZUFDSTtBQUFBO0FBQUEsY0FBSyxXQUFVLHFDQUFmO0FBQ0k7QUFBQTtBQUFBLGtCQUFLLFdBQVUsNkJBQWY7QUFDSSx1REFBSyxLQUFJLHFDQUFULEVBQStDLFdBQVUsV0FBekQsR0FESjtBQUVJO0FBQUE7QUFBQSxzQkFBSyxXQUFVLFlBQWY7QUFDSTtBQUFBO0FBQUEsMEJBQUksV0FBVSxTQUFkO0FBQXlCOU87QUFBekIscUJBREo7QUFFSTtBQUFBO0FBQUEsMEJBQUcsV0FBVSxNQUFiO0FBQXFCLDZCQUFLdVAsbUJBQUwsQ0FBeUJPLGNBQXpCO0FBQXJCLHFCQUZKO0FBR0k7QUFBQTtBQUFBLDBCQUFJLFdBQVUsb0NBQWQ7QUFBb0RHO0FBQXBEO0FBSEo7QUFGSjtBQURKLFNBREo7QUFZSDtBQTVDd0M7O2tCQWdEOUJELGM7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2xEZjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDQUE7Ozs7OztBQUVBLE1BQU0zTyxZQUFZLENBQUNDLEVBQUQsRUFBS0MsS0FBTCxLQUFlO0FBQzdCLFFBQUlDLFFBQVEsSUFBWjtBQUNBLFdBQU8sWUFBWTtBQUNmQyxxQkFBYUQsS0FBYjtBQUNBQSxnQkFBUUUsV0FBVyxNQUFNO0FBQ3JCSixlQUFHSyxJQUFILENBQVEsSUFBUjtBQUNILFNBRk8sRUFFTEosS0FGSyxDQUFSO0FBR0gsS0FMRDtBQU1ILENBUkQ7O0FBV0EsTUFBTUssa0JBQU4sU0FBaUMsZ0JBQU03QyxTQUF2QyxDQUFpRDtBQUM3Q0MsZ0JBQVlDLEtBQVosRUFBbUI7QUFDZixjQUFNQSxLQUFOO0FBQ0EsYUFBS1MsS0FBTCxHQUFhO0FBQ1RtQyx5QkFBYSxFQURKO0FBRVRDLDJCQUFlO0FBRk4sU0FBYjtBQUlIOztBQUVEQyx3QkFBb0I7QUFDaEIsYUFBS0MsZ0JBQUwsR0FBd0JYLFVBQVUsS0FBS1csZ0JBQUwsQ0FBc0J6QyxJQUF0QixDQUEyQixJQUEzQixDQUFWLEVBQTRDLElBQTVDLENBQXhCO0FBQ0EsWUFBSTBDLFFBQVFDLFNBQVNDLGNBQVQsQ0FBd0IsbUJBQXhCLENBQVo7QUFDQUYsY0FBTWlPLEtBQU47QUFDSDs7QUFFRHRRLGlCQUFhQyxDQUFiLEVBQWdCO0FBQ1osYUFBS0MsUUFBTCxDQUFjLEVBQUUrQixhQUFhaEMsRUFBRUUsTUFBRixDQUFTRSxLQUF4QixFQUFkO0FBQ0EsYUFBSytCLGdCQUFMO0FBQ0g7O0FBRURBLHVCQUFtQjtBQUNmLGFBQUsvQyxLQUFMLENBQVdrUixrQkFBWCxDQUE4QixLQUFLelEsS0FBTCxDQUFXbUMsV0FBekMsRUFBdURDLGFBQUQsSUFBbUI7QUFDckUsaUJBQUtoQyxRQUFMLENBQWMsRUFBRWdDLGVBQWVBLGNBQWNzTyxNQUEvQixFQUFkO0FBQ0gsU0FGRDtBQUdIOztBQUVEL04sZ0JBQVl4RyxRQUFaLEVBQXNCdEQsSUFBdEIsRUFBNEI7QUFDeEJzRCxpQkFBU3RELElBQVQsR0FBZ0JBLElBQWhCO0FBQ0EsYUFBSzBHLEtBQUwsQ0FBV29SLGNBQVgsQ0FBMEJ4VSxRQUExQjtBQUNBLGFBQUttSCxPQUFMLENBQWFyQyxNQUFiLENBQW9CdkIsT0FBcEIsQ0FBNEJrUixNQUE1QjtBQUNIOztBQU1EaFIsYUFBUzs7QUFFTCxlQUNJO0FBQUE7QUFBQSxjQUFLLFdBQVUsZ0JBQWY7QUFDSTtBQUFBO0FBQUEsa0JBQUssV0FBVSxtQkFBZjtBQUNJLHlEQUFPLFdBQVUsV0FBakIsRUFBNkIsSUFBRyxtQkFBaEMsRUFBb0QsVUFBVSxLQUFLTSxZQUFMLENBQWtCTCxJQUFsQixDQUF1QixJQUF2QixDQUE5RCxFQUE0RixPQUFPLEtBQUtHLEtBQUwsQ0FBV21DLFdBQTlHLEVBQTJILGFBQVksK0NBQXZJLEdBREo7QUFHUSxxQkFBS25DLEtBQUwsQ0FBV29DLGFBQVgsQ0FBeUJoQixHQUF6QixDQUE2QixDQUFDdkksSUFBRCxFQUFNNkIsQ0FBTixLQUFZO0FBQ3JDLDJCQUFPO0FBQUE7QUFBQSwwQkFBSyxXQUFVLGtCQUFmLEVBQWtDLEtBQUtBLENBQXZDO0FBQ0g7QUFBQTtBQUFBO0FBQUk3QixpQ0FBS3lIO0FBQVQseUJBREc7QUFHQ3pILDZCQUFLa0csSUFBTCxDQUFVcUMsR0FBVixDQUFjLENBQUN5UCxVQUFELEVBQVlDLENBQVosS0FBa0I7QUFDNUIsbUNBQU87QUFBQTtBQUFBLGtDQUFNLEtBQUtBLENBQVgsRUFBYyxXQUFVLFVBQXhCLEVBQW1DLFNBQVMsS0FBS25PLFdBQUwsQ0FBaUI5QyxJQUFqQixDQUFzQixJQUF0QixFQUE0QmdSLFVBQTVCLEVBQXdDaFksS0FBS0EsSUFBN0MsQ0FBNUM7QUFDRmdZLDJDQUFXdlE7QUFEVCw2QkFBUDtBQUdILHlCQUpEO0FBSEQscUJBQVA7QUFVSCxpQkFYRDtBQUhSO0FBREosU0FESjtBQXNCSDtBQTVENEM7O0FBQTNDNEIsa0IsQ0FnQ0tsQixZLEdBQWU7QUFDbEJDLFlBQVEsTUFBTTtBQURJLEM7a0JBZ0NYaUIsa0I7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzdFZjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBQTs7OztBQUVBOzs7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQUVBLE1BQU02TyxpQkFBTixTQUFnQyxnQkFBTTFSLFNBQXRDLENBQWdEO0FBQzVDQyxnQkFBWUMsS0FBWixFQUFtQjtBQUNmLGNBQU1BLEtBQU47QUFDQSxhQUFLUyxLQUFMLEdBQWE7QUFDVDBPLDRCQUFnQixLQUFLblAsS0FBTCxDQUFXa0IsS0FBWCxDQUFpQnlGLE1BQWpCLENBQXdCdkw7QUFEL0IsU0FBYjtBQUdIOztBQUVEaUYsYUFBUzs7QUFFTCxlQUNJO0FBQUE7QUFBQTtBQUVJO0FBQUE7QUFBQSxrQkFBUSxXQUFVLG1DQUFsQjtBQUNJO0FBQUE7QUFBQSxzQkFBSyxXQUFVLGlCQUFmO0FBQ0k7QUFBQTtBQUFBLDBCQUFLLFdBQVUsS0FBZjtBQUNJO0FBQUE7QUFBQSw4QkFBSyxXQUFVLE9BQWY7QUFDSTtBQUFBO0FBQUEsa0NBQUssV0FBVSwyQ0FBZjtBQUFBO0FBQUE7QUFESix5QkFESjtBQUlJLCtEQUFLLFdBQVUsT0FBZixHQUpKO0FBTUk7QUFBQTtBQUFBLDhCQUFLLFdBQVUsT0FBZjtBQUNJO0FBQUE7QUFBQSxrQ0FBSSxXQUFVLGtEQUFkO0FBQ0k7QUFBQTtBQUFBO0FBQUk7QUFBQTtBQUFBLDBDQUFNLFdBQVUsMEJBQWhCO0FBQTJDLCtFQUFLLEtBQUkscUNBQVQsRUFBK0MsV0FBVSxXQUF6RDtBQUEzQztBQUFKLGlDQURKO0FBRUk7QUFBQTtBQUFBO0FBQUk7QUFBQTtBQUFBLDBDQUFNLFdBQVUsNENBQWhCO0FBQTZELCtFQUFLLEtBQUksNkNBQVQsRUFBdUQsV0FBVSxXQUFqRSxHQUE3RDtBQUFBO0FBQTZJLGdGQUFNLFdBQVUsb0JBQWhCO0FBQTdJO0FBQUo7QUFGSjtBQURKO0FBTko7QUFESjtBQURKLGFBRko7QUFxQlEsaUJBQUtMLEtBQUwsQ0FBV3NQLE9BQVgsQ0FBbUIsS0FBSzdPLEtBQUwsQ0FBVzBPLGNBQTlCLElBQ0k7QUFBQTtBQUFBO0FBQ0k7QUFBQTtBQUFBLHNCQUFTLFdBQVUsd0JBQW5CO0FBQ0k7QUFBQTtBQUFBLDBCQUFLLFdBQVUsaUJBQWY7QUFDSTtBQUFBO0FBQUEsOEJBQUssV0FBVSxLQUFmO0FBQ0k7QUFBQTtBQUFBLGtDQUFLLFdBQVUsUUFBZjtBQUNJO0FBQUE7QUFBQSxzQ0FBSyxXQUFVLHFDQUFmO0FBQ0k7QUFDSSxpREFBUyxLQUFLblAsS0FBTCxDQUFXc1AsT0FBWCxDQUFtQixLQUFLN08sS0FBTCxDQUFXME8sY0FBOUI7QUFEYixzQ0FESjtBQUlJO0FBQUE7QUFBQSwwQ0FBSyxXQUFVLG9CQUFmO0FBQ0k7QUFDSSxxREFBUyxLQUFLblAsS0FBTCxDQUFXc1AsT0FBWCxDQUFtQixLQUFLN08sS0FBTCxDQUFXME8sY0FBOUI7QUFEYiwwQ0FESjtBQUtJO0FBQ0kscURBQVMsS0FBS25QLEtBQUwsQ0FBV3NQLE9BQVgsQ0FBbUIsS0FBSzdPLEtBQUwsQ0FBVzBPLGNBQTlCO0FBRGIsMkNBRVEsS0FBS25QLEtBRmIsRUFMSjtBQVVJO0FBQ0kscURBQVMsS0FBS0EsS0FBTCxDQUFXc1AsT0FBWCxDQUFtQixLQUFLN08sS0FBTCxDQUFXME8sY0FBOUI7QUFEYjtBQVZKO0FBSko7QUFESjtBQURKO0FBREo7QUFESjtBQURKLGFBREosR0E4QmE7QUFuRHJCLFNBREo7QUF3REg7QUFsRTJDOztrQkFxRWpDcUMsaUI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzlFZjs7OztBQUNBOzs7O0FBRUEsTUFBTUMsV0FBTixTQUEwQixnQkFBTTNSLFNBQWhDLENBQTBDOztBQUV0Q0MsZ0JBQVlDLEtBQVosRUFBbUI7QUFDZixjQUFNQSxLQUFOO0FBQ0EsYUFBS1MsS0FBTCxHQUFhO0FBQ1RpUix1QkFBVyxFQURGO0FBRVRDLHNCQUFVO0FBRkQsU0FBYjtBQUlIOztBQUVEN08sd0JBQW9CO0FBQ2hCLFlBQUksRUFBRThPLEtBQUYsS0FBWSxLQUFLNVIsS0FBTCxDQUFXeUssT0FBM0I7O0FBRUEsWUFBSW1ILFNBQVNBLE1BQU1qSCxNQUFOLEdBQWUsR0FBNUIsRUFBaUM7QUFDN0IsaUJBQUs5SixRQUFMLENBQWM7QUFDVjhRLDBCQUFVO0FBREEsYUFBZDtBQUdIOztBQUVELGFBQUs5USxRQUFMLENBQWM7QUFDVjZRLHVCQUFXRSxNQUFNdE8sS0FBTixDQUFZLENBQVosRUFBZSxHQUFmO0FBREQsU0FBZDtBQUdIOztBQUVEakQsYUFBUzs7QUFFTCxZQUFJLEVBQUV1UixLQUFGLEVBQVM3USxJQUFULEtBQWtCLEtBQUtmLEtBQUwsQ0FBV3lLLE9BQWpDOztBQUVBLGVBQ0k7QUFBQTtBQUFBLGNBQUssV0FBVSxjQUFmO0FBQ0k7QUFBQTtBQUFBLGtCQUFJLFdBQVUsYUFBZDtBQUFBO0FBQW1DMUo7QUFBbkMsYUFESjtBQUVJO0FBQUE7QUFBQSxrQkFBSyxXQUFVLGVBQWY7QUFDSTtBQUFBO0FBQUEsc0JBQUcsV0FBVSxnQkFBYjtBQUErQix5QkFBS04sS0FBTCxDQUFXaVIsU0FBMUM7QUFFUSx5QkFBS2pSLEtBQUwsQ0FBV2tSLFFBQVgsR0FBc0I7QUFBQTtBQUFBLDBCQUFHLFdBQVUscUJBQWIsRUFBbUMsU0FBUyxNQUFNO0FBQ3BFLHFDQUFLOVEsUUFBTCxDQUFjLEVBQUU4USxVQUFVLEtBQVosRUFBbUJELFdBQVdFLEtBQTlCLEVBQWQ7QUFDSCw2QkFGcUI7QUFBQTtBQUFBLHFCQUF0QixHQUVtQjtBQUozQjtBQURKO0FBRkosU0FESjtBQWNIO0FBMUNxQzs7a0JBOEMzQkgsVzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDakRmOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBQTs7OztBQUNBOzs7O0FBRUEsTUFBTXRCLGlCQUFOLFNBQWdDLGdCQUFNclEsU0FBdEMsQ0FBZ0Q7QUFDNUNDLGdCQUFZQyxLQUFaLEVBQW1CO0FBQ2YsY0FBTUEsS0FBTjtBQUNIOztBQUVEc1Esd0JBQW9CQywyQkFBcEIsRUFBaUQ7QUFDN0MsZUFBT0EsNEJBQTRCdlYsTUFBNUIsQ0FBbUMsQ0FBQ3dWLEdBQUQsRUFBTXRWLElBQU4sRUFBWUMsQ0FBWixLQUFrQjtBQUN4RHFWLG1CQUFRLEdBQUV0VixLQUFLdVYsYUFBYyxFQUE3QjtBQUNBLGdCQUFJdlYsS0FBS3dWLGNBQVQsRUFBeUI7QUFDckJGLHVCQUFRLE1BQUt0VixLQUFLd1YsY0FBZSxFQUFqQztBQUNIO0FBQ0QsZ0JBQUl2VixJQUFJb1YsNEJBQTRCNUYsTUFBNUIsR0FBcUMsQ0FBN0MsRUFBZ0Q2RixPQUFRLElBQVI7QUFDaEQsbUJBQU9BLEdBQVA7QUFDSCxTQVBNLEVBT0osRUFQSSxDQUFQO0FBUUg7O0FBRURuUSxhQUFTOztBQUVMLFlBQUksRUFBRVUsSUFBRixFQUFRNFAsZ0JBQVIsRUFBMEJFLGNBQTFCLEtBQTZDLEtBQUs3USxLQUFMLENBQVd5SyxPQUE1RDs7QUFFQSxlQUNJO0FBQUE7QUFBQSxjQUFLLFdBQVUsNkJBQWY7QUFDSSxtREFBSyxLQUFJLHFDQUFULEVBQStDLFdBQVUsV0FBekQsR0FESjtBQUVJO0FBQUE7QUFBQSxrQkFBSyxXQUFVLFlBQWY7QUFDSTtBQUFBO0FBQUEsc0JBQUksV0FBVSxTQUFkO0FBQXlCMUo7QUFBekIsaUJBREo7QUFFSTtBQUFBO0FBQUEsc0JBQUcsV0FBVSxNQUFiO0FBQXFCLHlCQUFLdVAsbUJBQUwsQ0FBeUJPLGNBQXpCO0FBQXJCLGlCQUZKO0FBR0k7QUFBQTtBQUFBLHNCQUFHLFdBQVUsYUFBYjtBQUE0QkYsb0NBQTVCO0FBQUE7QUFBQSxpQkFISjtBQUlJO0FBQUE7QUFBQSxzQkFBRyxXQUFVLGFBQWI7QUFBQTtBQUFBO0FBSko7QUFGSixTQURKO0FBV0g7QUEvQjJDOztrQkFtQ2pDUixpQjs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDdENmOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDQUE7Ozs7QUFDQTs7QUFFQTs7OztBQUlBOzs7Ozs7QUFHQSxNQUFNMEIsaUJBQU4sU0FBZ0MsZ0JBQU0vUixTQUF0QyxDQUFnRDs7QUFFNUNDLGdCQUFZQyxLQUFaLEVBQW1CO0FBQ2YsY0FBTUEsS0FBTjtBQUNIOztBQUVESyxhQUFTOztBQUVMLGVBQ0k7QUFBQTtBQUFBLGNBQUssV0FBVSxjQUFmO0FBQ0k7QUFBQTtBQUFBLGtCQUFJLFdBQVUsYUFBZDtBQUFBO0FBQUEsYUFESjtBQUVJO0FBQUE7QUFBQSxrQkFBSyxXQUFVLG9CQUFmO0FBQ0k7QUFBQTtBQUFBLHNCQUFJLFdBQVUscUJBQWQ7QUFDSTtBQUFBO0FBQUE7QUFDSTtBQUFBO0FBQUE7QUFDSTtBQUFBO0FBQUEsa0NBQXVCLFlBQVkseURBQW5DO0FBQ0k7QUFBQTtBQUFBLHNDQUFLLFdBQVUsT0FBZjtBQUFBO0FBQ2MsNEVBQU0sV0FBVSxhQUFoQjtBQURkO0FBREosNkJBREo7QUFNSTtBQUFBO0FBQUE7QUFDSTtBQUFBO0FBQUEsc0NBQUssV0FBVSxjQUFmO0FBQ0k7QUFBQTtBQUFBLDBDQUFLLFdBQVUsWUFBZjtBQUNJO0FBQUE7QUFBQSw4Q0FBTyxXQUFVLDZCQUFqQjtBQUFBO0FBQUEseUNBREo7QUFFSTtBQUFBO0FBQUEsOENBQUcsV0FBVSwyQkFBYjtBQUFBO0FBQUE7QUFGSixxQ0FESjtBQUtJO0FBQUE7QUFBQSwwQ0FBSyxXQUFVLFlBQWY7QUFDSTtBQUFBO0FBQUEsOENBQU8sV0FBVSw2QkFBakI7QUFBQTtBQUFBLHlDQURKO0FBRUk7QUFBQTtBQUFBLDhDQUFHLFdBQVUsMkJBQWI7QUFBQTtBQUFBO0FBRkoscUNBTEo7QUFTSTtBQUFBO0FBQUEsMENBQUssV0FBVSxZQUFmO0FBQ0k7QUFBQTtBQUFBLDhDQUFPLFdBQVUsNkJBQWpCO0FBQUE7QUFBQSx5Q0FESjtBQUVJO0FBQUE7QUFBQSw4Q0FBRyxXQUFVLDJCQUFiO0FBQUE7QUFBQTtBQUZKO0FBVEo7QUFESjtBQU5KO0FBREoscUJBREo7QUEwQkk7QUFBQTtBQUFBO0FBQ0k7QUFBQTtBQUFBO0FBQ0k7QUFBQTtBQUFBLGtDQUF1QixZQUFZLHlEQUFuQztBQUNJO0FBQUE7QUFBQSxzQ0FBSyxXQUFVLE9BQWY7QUFBQTtBQUM4Qiw0RUFBTSxXQUFVLGFBQWhCO0FBRDlCO0FBREosNkJBREo7QUFNSTtBQUFBO0FBQUE7QUFDSTtBQUFBO0FBQUEsc0NBQUssV0FBVSxjQUFmO0FBQ0k7QUFBQTtBQUFBLDBDQUFLLFdBQVUsWUFBZjtBQUNJO0FBQUE7QUFBQSw4Q0FBTyxXQUFVLDZCQUFqQjtBQUFBO0FBQUEseUNBREo7QUFFSTtBQUFBO0FBQUEsOENBQUcsV0FBVSwyQkFBYjtBQUFBO0FBQUE7QUFGSixxQ0FESjtBQUtJO0FBQUE7QUFBQSwwQ0FBSyxXQUFVLFlBQWY7QUFDSTtBQUFBO0FBQUEsOENBQU8sV0FBVSw2QkFBakI7QUFBQTtBQUFBLHlDQURKO0FBRUk7QUFBQTtBQUFBLDhDQUFHLFdBQVUsMkJBQWI7QUFBQTtBQUFBO0FBRkoscUNBTEo7QUFTSTtBQUFBO0FBQUEsMENBQUssV0FBVSxZQUFmO0FBQ0k7QUFBQTtBQUFBLDhDQUFPLFdBQVUsNkJBQWpCO0FBQUE7QUFBQSx5Q0FESjtBQUVJO0FBQUE7QUFBQSw4Q0FBRyxXQUFVLDJCQUFiO0FBQUE7QUFBQTtBQUZKO0FBVEo7QUFESjtBQU5KO0FBREoscUJBMUJKO0FBbURJO0FBQUE7QUFBQTtBQUNJO0FBQUE7QUFBQTtBQUNJO0FBQUE7QUFBQSxrQ0FBdUIsWUFBWSx5REFBbkM7QUFDSTtBQUFBO0FBQUEsc0NBQUssV0FBVSxPQUFmO0FBQUE7QUFDYSw0RUFBTSxXQUFVLGFBQWhCO0FBRGI7QUFESiw2QkFESjtBQU1JO0FBQUE7QUFBQTtBQUNJO0FBQUE7QUFBQSxzQ0FBSyxXQUFVLGNBQWY7QUFDSTtBQUFBO0FBQUEsMENBQUssV0FBVSxZQUFmO0FBQ0k7QUFBQTtBQUFBLDhDQUFPLFdBQVUsNkJBQWpCO0FBQUE7QUFBQSx5Q0FESjtBQUVJO0FBQUE7QUFBQSw4Q0FBRyxXQUFVLDJCQUFiO0FBQUE7QUFBQTtBQUZKLHFDQURKO0FBS0k7QUFBQTtBQUFBLDBDQUFLLFdBQVUsWUFBZjtBQUNJO0FBQUE7QUFBQSw4Q0FBTyxXQUFVLDZCQUFqQjtBQUFBO0FBQUEseUNBREo7QUFFSTtBQUFBO0FBQUEsOENBQUcsV0FBVSwyQkFBYjtBQUFBO0FBQUE7QUFGSixxQ0FMSjtBQVNJO0FBQUE7QUFBQSwwQ0FBSyxXQUFVLFlBQWY7QUFDSTtBQUFBO0FBQUEsOENBQU8sV0FBVSw2QkFBakI7QUFBQTtBQUFBLHlDQURKO0FBRUk7QUFBQTtBQUFBLDhDQUFHLFdBQVUsMkJBQWI7QUFBQTtBQUFBO0FBRko7QUFUSjtBQURKO0FBTko7QUFESixxQkFuREo7QUE0RUk7QUFBQTtBQUFBO0FBQ0k7QUFBQTtBQUFBO0FBQ0k7QUFBQTtBQUFBLGtDQUF1QixZQUFZLHlEQUFuQztBQUNJO0FBQUE7QUFBQSxzQ0FBSyxXQUFVLE9BQWY7QUFBQTtBQUNXLDRFQUFNLFdBQVUsYUFBaEI7QUFEWDtBQURKLDZCQURKO0FBTUk7QUFBQTtBQUFBO0FBQ0k7QUFBQTtBQUFBLHNDQUFLLFdBQVUsY0FBZjtBQUNJO0FBQUE7QUFBQSwwQ0FBSyxXQUFVLFlBQWY7QUFDSTtBQUFBO0FBQUEsOENBQU8sV0FBVSw2QkFBakI7QUFBQTtBQUFBLHlDQURKO0FBRUk7QUFBQTtBQUFBLDhDQUFHLFdBQVUsMkJBQWI7QUFBQTtBQUFBO0FBRkoscUNBREo7QUFLSTtBQUFBO0FBQUEsMENBQUssV0FBVSxZQUFmO0FBQ0k7QUFBQTtBQUFBLDhDQUFPLFdBQVUsNkJBQWpCO0FBQUE7QUFBQSx5Q0FESjtBQUVJO0FBQUE7QUFBQSw4Q0FBRyxXQUFVLDJCQUFiO0FBQUE7QUFBQTtBQUZKLHFDQUxKO0FBU0k7QUFBQTtBQUFBLDBDQUFLLFdBQVUsWUFBZjtBQUNJO0FBQUE7QUFBQSw4Q0FBTyxXQUFVLDZCQUFqQjtBQUFBO0FBQUEseUNBREo7QUFFSTtBQUFBO0FBQUEsOENBQUcsV0FBVSwyQkFBYjtBQUFBO0FBQUE7QUFGSjtBQVRKO0FBREo7QUFOSjtBQURKLHFCQTVFSjtBQXFHSTtBQUFBO0FBQUE7QUFDSTtBQUFBO0FBQUE7QUFDSTtBQUFBO0FBQUEsa0NBQXVCLFlBQVkseURBQW5DO0FBQ0k7QUFBQTtBQUFBLHNDQUFLLFdBQVUsT0FBZjtBQUFBO0FBQ3lCLDRFQUFNLFdBQVUsYUFBaEI7QUFEekI7QUFESiw2QkFESjtBQU1JO0FBQUE7QUFBQTtBQUNJO0FBQUE7QUFBQSxzQ0FBSyxXQUFVLGNBQWY7QUFDSTtBQUFBO0FBQUEsMENBQUssV0FBVSxZQUFmO0FBQ0k7QUFBQTtBQUFBLDhDQUFPLFdBQVUsNkJBQWpCO0FBQUE7QUFBQSx5Q0FESjtBQUVJO0FBQUE7QUFBQSw4Q0FBRyxXQUFVLDJCQUFiO0FBQUE7QUFBQTtBQUZKLHFDQURKO0FBS0k7QUFBQTtBQUFBLDBDQUFLLFdBQVUsWUFBZjtBQUNJO0FBQUE7QUFBQSw4Q0FBTyxXQUFVLDZCQUFqQjtBQUFBO0FBQUEseUNBREo7QUFFSTtBQUFBO0FBQUEsOENBQUcsV0FBVSwyQkFBYjtBQUFBO0FBQUE7QUFGSixxQ0FMSjtBQVNJO0FBQUE7QUFBQSwwQ0FBSyxXQUFVLFlBQWY7QUFDSTtBQUFBO0FBQUEsOENBQU8sV0FBVSw2QkFBakI7QUFBQTtBQUFBLHlDQURKO0FBRUk7QUFBQTtBQUFBLDhDQUFHLFdBQVUsMkJBQWI7QUFBQTtBQUFBO0FBRko7QUFUSjtBQURKO0FBTko7QUFESixxQkFyR0o7QUE4SEk7QUFBQTtBQUFBO0FBQ0k7QUFBQTtBQUFBO0FBQ0k7QUFBQTtBQUFBLGtDQUF1QixZQUFZLHlEQUFuQztBQUNJO0FBQUE7QUFBQSxzQ0FBSyxXQUFVLE9BQWY7QUFBQTtBQUNlLDRFQUFNLFdBQVUsYUFBaEI7QUFEZjtBQURKLDZCQURKO0FBTUk7QUFBQTtBQUFBO0FBQ0k7QUFBQTtBQUFBLHNDQUFLLFdBQVUsY0FBZjtBQUNJO0FBQUE7QUFBQSwwQ0FBSyxXQUFVLFlBQWY7QUFDSTtBQUFBO0FBQUEsOENBQU8sV0FBVSw2QkFBakI7QUFBQTtBQUFBLHlDQURKO0FBRUk7QUFBQTtBQUFBLDhDQUFHLFdBQVUsMkJBQWI7QUFBQTtBQUFBO0FBRkoscUNBREo7QUFLSTtBQUFBO0FBQUEsMENBQUssV0FBVSxZQUFmO0FBQ0k7QUFBQTtBQUFBLDhDQUFPLFdBQVUsNkJBQWpCO0FBQUE7QUFBQSx5Q0FESjtBQUVJO0FBQUE7QUFBQSw4Q0FBRyxXQUFVLDJCQUFiO0FBQUE7QUFBQTtBQUZKLHFDQUxKO0FBU0k7QUFBQTtBQUFBLDBDQUFLLFdBQVUsWUFBZjtBQUNJO0FBQUE7QUFBQSw4Q0FBTyxXQUFVLDZCQUFqQjtBQUFBO0FBQUEseUNBREo7QUFFSTtBQUFBO0FBQUEsOENBQUcsV0FBVSwyQkFBYjtBQUFBO0FBQUE7QUFGSjtBQVRKO0FBREo7QUFOSjtBQURKLHFCQTlISjtBQXVKSTtBQUFBO0FBQUE7QUFDSTtBQUFBO0FBQUE7QUFDSTtBQUFBO0FBQUEsa0NBQXVCLFlBQVkseURBQW5DO0FBQ0k7QUFBQTtBQUFBLHNDQUFLLFdBQVUsT0FBZjtBQUFBO0FBQ3dCLDRFQUFNLFdBQVUsYUFBaEI7QUFEeEI7QUFESiw2QkFESjtBQU1JO0FBQUE7QUFBQTtBQUNJO0FBQUE7QUFBQSxzQ0FBSyxXQUFVLGNBQWY7QUFDSTtBQUFBO0FBQUEsMENBQUssV0FBVSxZQUFmO0FBQ0k7QUFBQTtBQUFBLDhDQUFPLFdBQVUsNkJBQWpCO0FBQUE7QUFBQSx5Q0FESjtBQUVJO0FBQUE7QUFBQSw4Q0FBRyxXQUFVLDJCQUFiO0FBQUE7QUFBQTtBQUZKLHFDQURKO0FBS0k7QUFBQTtBQUFBLDBDQUFLLFdBQVUsWUFBZjtBQUNJO0FBQUE7QUFBQSw4Q0FBTyxXQUFVLDZCQUFqQjtBQUFBO0FBQUEseUNBREo7QUFFSTtBQUFBO0FBQUEsOENBQUcsV0FBVSwyQkFBYjtBQUFBO0FBQUE7QUFGSixxQ0FMSjtBQVNJO0FBQUE7QUFBQSwwQ0FBSyxXQUFVLFlBQWY7QUFDSTtBQUFBO0FBQUEsOENBQU8sV0FBVSw2QkFBakI7QUFBQTtBQUFBLHlDQURKO0FBRUk7QUFBQTtBQUFBLDhDQUFHLFdBQVUsMkJBQWI7QUFBQTtBQUFBO0FBRko7QUFUSjtBQURKO0FBTko7QUFESjtBQXZKSjtBQURKO0FBRkosU0FESjtBQXdMSDtBQWhNMkM7O2tCQW9NakN3UixpQjs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDOU1mOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBQTs7OztBQUNBOztBQUNBOzs7Ozs7QUFFQSxNQUFNQyxjQUFOLFNBQTZCLGdCQUFNaFMsU0FBbkMsQ0FBNkM7QUFDekNDLGdCQUFZQyxLQUFaLEVBQW1CO0FBQ2YsY0FBTUEsS0FBTjtBQUNBLGFBQUtTLEtBQUwsR0FBYTtBQUNUa0wsb0JBQVEsRUFEQztBQUVUOUksMkJBQWU7QUFGTixTQUFiO0FBSUg7O0FBRURrUCxnQkFBWXRXLFFBQVosRUFBc0I7QUFDbEIsWUFBSXVXLE9BQU8sSUFBSUMsT0FBT0MsSUFBUCxDQUFZQyxNQUFaLENBQW1CQyxtQkFBdkIsRUFBWDs7QUFFQSxZQUFJQyxVQUFVO0FBQ1ZyUCxtQkFBT3ZILFFBREc7QUFFVjZXLG1CQUFPLENBQUMsU0FBRCxDQUZHO0FBR1ZDLG1DQUF1QixFQUFFQyxTQUFTLElBQVg7QUFIYixTQUFkO0FBS0EsWUFBSS9XLFFBQUosRUFBYztBQUNWdVcsaUJBQUtTLG1CQUFMLENBQXlCSixPQUF6QixFQUFrQyxVQUFVSyxPQUFWLEVBQW1CQyxNQUFuQixFQUEyQjtBQUN6REQsMEJBQVVBLFdBQVcsRUFBckI7QUFDQSxxQkFBSzdSLFFBQUwsQ0FBYyxFQUFFZ0MsZUFBZTZQLE9BQWpCLEVBQWQ7QUFDSCxhQUhpQyxDQUdoQ3BTLElBSGdDLENBRzNCLElBSDJCLENBQWxDO0FBSUg7QUFDSjs7QUFFREssaUJBQWFDLENBQWIsRUFBZ0I7QUFDWixhQUFLQyxRQUFMLENBQWM7QUFDVjhLLG9CQUFRL0ssRUFBRUUsTUFBRixDQUFTRTtBQURQLFNBQWQ7QUFHQSxhQUFLK1EsV0FBTCxDQUFpQm5SLEVBQUVFLE1BQUYsQ0FBU0UsS0FBMUI7QUFFSDs7QUFFRHhDLG1CQUFlL0MsUUFBZixFQUF5QjtBQUNyQixZQUFJb0csTUFBTSxJQUFJb1EsT0FBT0MsSUFBUCxDQUFZVSxHQUFoQixDQUFvQjNQLFNBQVNDLGNBQVQsQ0FBd0IsS0FBeEIsQ0FBcEIsRUFBb0Q7QUFDMUQyUCxvQkFBUSxFQUFFeFgsS0FBSyxDQUFDLE1BQVIsRUFBZ0JLLEtBQUssT0FBckIsRUFEa0Q7QUFFMURvWCxrQkFBTTtBQUZvRCxTQUFwRCxDQUFWO0FBSUEsWUFBSUMsVUFBVSxJQUFJZCxPQUFPQyxJQUFQLENBQVlDLE1BQVosQ0FBbUJhLGFBQXZCLENBQXFDblIsR0FBckMsQ0FBZDtBQUNBa1IsZ0JBQVFFLFVBQVIsQ0FBbUI7QUFDZkMsdUJBQVd6WCxTQUFTeVg7QUFETCxTQUFuQixFQUVHLFVBQVVDLEtBQVYsRUFBaUJSLE1BQWpCLEVBQXlCO0FBQ3hCLGlCQUFLM1MsS0FBTCxDQUFXeEIsY0FBWCxDQUEwQjJVLEtBQTFCO0FBQ0EsaUJBQUtuVCxLQUFMLENBQVdHLE9BQVgsQ0FBbUJvRCxFQUFuQixDQUFzQixDQUFDLENBQXZCO0FBRUgsU0FKRSxDQUlEakQsSUFKQyxDQUlJLElBSkosQ0FGSDtBQU9IOztBQUVEd0Msd0JBQW9CO0FBQ2hCLFlBQUlFLFFBQVFDLFNBQVNDLGNBQVQsQ0FBd0IsbUJBQXhCLENBQVo7QUFDQUYsY0FBTWlPLEtBQU47QUFDSDs7QUFFRG1DLHFCQUFpQjtBQUNiLFlBQUlDLFVBQVVDLFdBQWQsRUFBMkI7QUFDdkJELHNCQUFVQyxXQUFWLENBQXNCQyxrQkFBdEIsQ0FBMENDLFFBQUQsSUFBYztBQUNuRCxvQkFBSUMsU0FBUyxFQUFFcFksS0FBSzBRLFdBQVd5SCxTQUFTRSxNQUFULENBQWdCQyxRQUEzQixDQUFQLEVBQTZDalksS0FBS3FRLFdBQVd5SCxTQUFTRSxNQUFULENBQWdCRSxTQUEzQixDQUFsRCxFQUFiOztBQUVBLG9CQUFJQyxXQUFXLElBQUk1QixPQUFPQyxJQUFQLENBQVk0QixRQUFoQixFQUFmO0FBQ0FELHlCQUFTRSxPQUFULENBQWlCLEVBQUUsWUFBWU4sTUFBZCxFQUFqQixFQUF5QyxDQUFDZixPQUFELEVBQVVDLE1BQVYsS0FBcUI7QUFDMUQsd0JBQUlELFdBQVdBLFFBQVEsQ0FBUixDQUFmLEVBQTJCO0FBQ3ZCLDZCQUFLMVMsS0FBTCxDQUFXeEIsY0FBWCxDQUEwQmtVLFFBQVEsQ0FBUixDQUExQjtBQUNBLDZCQUFLMVMsS0FBTCxDQUFXRyxPQUFYLENBQW1Cb0QsRUFBbkIsQ0FBc0IsQ0FBQyxDQUF2QjtBQUNIO0FBQ0osaUJBTEQ7QUFNSCxhQVZEO0FBV0gsU0FaRCxNQWFLO0FBQ0Q7QUFDSDtBQUNKOztBQU1EbEQsYUFBUzs7QUFFTCxlQUNJO0FBQUE7QUFBQTtBQUNJO0FBQUE7QUFBQSxrQkFBUSxXQUFVLHdEQUFsQjtBQUNJO0FBQUE7QUFBQSxzQkFBSyxXQUFVLGlCQUFmO0FBQ0k7QUFBQTtBQUFBLDBCQUFLLFdBQVUsS0FBZjtBQUNJO0FBQUE7QUFBQSw4QkFBSyxXQUFVLFFBQWY7QUFDSTtBQUFBO0FBQUEsa0NBQUssV0FBVSxpQ0FBZjtBQUNJO0FBQUE7QUFBQSxzQ0FBTSxTQUFTLE1BQU07QUFDakIsaURBQUtMLEtBQUwsQ0FBV0csT0FBWCxDQUFtQm9ELEVBQW5CLENBQXNCLENBQUMsQ0FBdkI7QUFDSCx5Q0FGRCxFQUVHLFdBQVUsd0JBRmI7QUFFc0MsMkVBQUssS0FBSSw0Q0FBVCxFQUFzRCxXQUFVLFdBQWhFO0FBRnRDLGlDQURKO0FBSUk7QUFBQTtBQUFBLHNDQUFJLFdBQVUsZ0JBQWQ7QUFBQTtBQUFBO0FBSko7QUFESjtBQURKLHFCQURKO0FBV0k7QUFBQTtBQUFBLDBCQUFLLFdBQVUsS0FBZjtBQUNJO0FBQUE7QUFBQSw4QkFBSyxXQUFVLFFBQWY7QUFDSTtBQUFBO0FBQUEsa0NBQUssV0FBVSxZQUFmO0FBQ0k7QUFBQTtBQUFBLHNDQUFLLFdBQVUsa0NBQWY7QUFDSSw2RUFBTyxNQUFLLE1BQVosRUFBbUIsT0FBTyxLQUFLOUMsS0FBTCxDQUFXa0wsTUFBckMsRUFBNkMsVUFBVSxLQUFLaEwsWUFBTCxDQUFrQkwsSUFBbEIsQ0FBdUIsSUFBdkIsQ0FBdkQsRUFBcUYsV0FBVSw4Q0FBL0YsRUFBOEksYUFBWSw2QkFBMUosRUFBd0wsSUFBRyxtQkFBM0wsR0FESjtBQUVJO0FBQUE7QUFBQSwwQ0FBTSxXQUFVLGtDQUFoQjtBQUFtRCwrRUFBSyxLQUFJLGdEQUFULEVBQTBELFdBQVUsV0FBcEU7QUFBbkQ7QUFGSixpQ0FESjtBQUtJO0FBQUE7QUFBQSxzQ0FBSyxXQUFVLG9CQUFmLEVBQW9DLFNBQVMsS0FBSzhTLGNBQUwsQ0FBb0I5UyxJQUFwQixDQUF5QixJQUF6QixDQUE3QztBQUNJO0FBQUE7QUFBQSwwQ0FBTSxXQUFVLGtCQUFoQjtBQUFtQywrRUFBSyxLQUFJLG9DQUFULEVBQThDLFdBQVUsV0FBeEQ7QUFBbkMscUNBREo7QUFBQTtBQUFBO0FBTEo7QUFESjtBQURKO0FBWEo7QUFESixhQURKO0FBNEJJO0FBQUE7QUFBQSxrQkFBUyxXQUFVLDRCQUFuQjtBQUNJO0FBQUE7QUFBQSxzQkFBSyxXQUFVLGNBQWY7QUFDSTtBQUFBO0FBQUEsMEJBQUksV0FBVSxhQUFkO0FBQUE7QUFBQSxxQkFESjtBQUVJO0FBQUE7QUFBQSwwQkFBSyxXQUFVLG9CQUFmO0FBQ0k7QUFBQTtBQUFBLDhCQUFJLFdBQVUsZ0JBQWQ7QUFFUSxpQ0FBS0csS0FBTCxDQUFXb0MsYUFBWCxDQUF5QmhCLEdBQXpCLENBQTZCLENBQUNzUCxNQUFELEVBQVNoVyxDQUFULEtBQWU7QUFDeEMsdUNBQU87QUFBQTtBQUFBLHNDQUFJLEtBQUtBLENBQVQsRUFBWSxTQUFTLEtBQUtxRCxjQUFMLENBQW9COEIsSUFBcEIsQ0FBeUIsSUFBekIsRUFBK0I2USxNQUEvQixDQUFyQjtBQUNIO0FBQUE7QUFBQTtBQUFJQSwrQ0FBTzZDLFdBQVg7QUFDSTtBQUFBO0FBQUEsOENBQU0sV0FBVSxVQUFoQjtBQUFBO0FBQUE7QUFESjtBQURHLGlDQUFQO0FBS0gsNkJBTkQ7QUFGUjtBQURKO0FBRko7QUFESixhQTVCSjtBQThDSSxtREFBSyxJQUFHLEtBQVIsRUFBYyxPQUFPLEVBQUVDLFNBQVMsTUFBWCxFQUFyQjtBQTlDSixTQURKO0FBa0RIO0FBaEl3Qzs7QUFBdkNuQyxjLENBd0VLclEsWSxHQUFlO0FBQ2xCQyxZQUFRLE1BQU07QUFESSxDO2tCQTREWG9RLGM7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3hJZjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDQUE7Ozs7QUFDQTs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQUVBLE1BQU1vQyxjQUFOLFNBQTZCLGdCQUFNcFUsU0FBbkMsQ0FBNkM7QUFDekNDLGdCQUFZQyxLQUFaLEVBQW1CO0FBQ2YsY0FBTUEsS0FBTjtBQUNBLGFBQUtTLEtBQUwsR0FBYTtBQUNUME8sNEJBQWdCLElBRFA7QUFFVEMsNEJBQWdCLElBRlA7QUFHVDlELDBCQUFjO0FBSEwsU0FBYjtBQUtIOztBQUVEUSxjQUFTO0FBQ0wsYUFBSy9ILE9BQUwsQ0FBYXJDLE1BQWIsQ0FBb0J2QixPQUFwQixDQUE0QkMsSUFBNUIsQ0FBaUMsVUFBakM7QUFDSDs7QUFFRHFMLHFCQUFpQnRHLEdBQWpCLEVBQXNCO0FBQ2xCO0FBQ0EsY0FBTXVHLGNBQWMsS0FBSzFMLEtBQUwsQ0FBV3ZFLFFBQVgsQ0FBb0JrUSxNQUF4QztBQUNBLGNBQU1oRixTQUFTLElBQUlpRixlQUFKLENBQW9CRixXQUFwQixDQUFmO0FBQ0EsZUFBTy9FLE9BQU9rRixHQUFQLENBQVcxRyxHQUFYLENBQVA7QUFDSDs7QUFFRHJDLHdCQUFvQjtBQUNoQixZQUFJO0FBQ0EsZ0JBQUkzRSxXQUFXLEtBQUs2QixLQUFMLENBQVdrQixLQUFYLENBQWlCeUYsTUFBakIsQ0FBd0J2TCxFQUF2QztBQUNBLGdCQUFJaUQsV0FBVyxLQUFLMkIsS0FBTCxDQUFXa0IsS0FBWCxDQUFpQnlGLE1BQWpCLENBQXdCdEksUUFBdkM7QUFDQSxnQkFBSWlOLGVBQWUsS0FBS0csZ0JBQUwsQ0FBc0IsR0FBdEIsQ0FBbkI7QUFDQUgsMkJBQWUsSUFBSXhHLElBQUosQ0FBU2lILFdBQVdULFlBQVgsQ0FBVCxDQUFmOztBQUVBLGdCQUFJbk4sWUFBWUUsUUFBWixJQUF3QmlOLFlBQTVCLEVBQTBDO0FBQ3RDLHFCQUFLekssUUFBTCxDQUFjO0FBQ1ZzTyxvQ0FBZ0JoUixRQUROO0FBRVZpUixvQ0FBZ0IvUSxRQUZOO0FBR1ZpTixrQ0FBY0EsYUFBYVUsUUFBYjtBQUhKLGlCQUFkO0FBS0EscUJBQUtoTSxLQUFMLENBQVc5QixhQUFYLENBQXlCQyxRQUF6QjtBQUNIO0FBQ0osU0FkRCxDQWNFLE9BQU95QyxDQUFQLEVBQVUsQ0FFWDtBQUNKOztBQU1EUCxhQUFTOztBQUVMLGVBQ0k7QUFBQTtBQUFBLGNBQUssV0FBVSxnQkFBZjtBQUdRLGlCQUFLTCxLQUFMLENBQVdzUCxPQUFYLENBQW1CLEtBQUs3TyxLQUFMLENBQVcwTyxjQUE5QixJQUNJO0FBQUE7QUFBQTtBQUNJO0FBQ0ksZ0NBQVksSUFEaEI7QUFFSSxpQ0FBYSxJQUZqQjtBQUdJLDZCQUFTLEtBQUtuUCxLQUFMLENBQVdzUCxPQUFYLENBQW1CLEtBQUs3TyxLQUFMLENBQVcwTyxjQUE5QjtBQUhiLGtCQURKO0FBTUk7QUFDSSxvQ0FBZ0IsS0FBS25QLEtBQUwsQ0FBV3NQLE9BQVgsQ0FBbUIsS0FBSzdPLEtBQUwsQ0FBVzBPLGNBQTlCLENBRHBCO0FBRUksb0NBQWdCLEtBQUsxTyxLQUFMLENBQVcyTztBQUYvQixrQkFOSjtBQVVJO0FBQUE7QUFBQSxzQkFBSyxXQUFVLHlCQUFmO0FBQ0k7QUFBQTtBQUFBO0FBQUE7QUFBQSxxQkFESjtBQUVJO0FBQUE7QUFBQSwwQkFBTSxXQUFVLFNBQWhCO0FBQUE7QUFBQSxxQkFGSjtBQUdJO0FBQUE7QUFBQSwwQkFBTSxXQUFVLE1BQWhCO0FBQXlCLDZCQUFLM08sS0FBTCxDQUFXNks7QUFBcEM7QUFISixpQkFWSjtBQWVJLG9FQWZKO0FBZ0JJO0FBQUE7QUFBQSxzQkFBUSxXQUFVLFlBQWxCLEVBQStCLFNBQVMsS0FBS1EsT0FBTCxDQUFheEwsSUFBYixDQUFrQixJQUFsQixDQUF4QztBQUFBO0FBQUE7QUFoQkosYUFESixHQWtCYTtBQXJCckIsU0FESjtBQTJCSDtBQTFFd0M7O0FBQXZDNFQsYyxDQXlDS3pTLFksR0FBZTtBQUNsQkMsWUFBUSxNQUFNO0FBREksQztrQkFxQ1h3UyxjOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNyRmY7Ozs7QUFDQTs7OztBQUVBLE1BQU0zSCxXQUFOLFNBQTBCLGdCQUFNek0sU0FBaEMsQ0FBMEM7QUFDdENDLGdCQUFZQyxLQUFaLEVBQW1CO0FBQ2YsY0FBTUEsS0FBTjtBQUNBLGFBQUtTLEtBQUwsR0FBYTtBQUNUd0kseUJBQWMsRUFETDtBQUVUdUQsMEJBQWUsRUFGTjtBQUdUQywyQkFBZ0IsTUFIUDtBQUlUQywyQkFBZ0IsRUFKUDtBQUtUelMsaUJBQUs7QUFMSSxTQUFiO0FBT0g7O0FBRUQwRyxpQkFBYTJMLEtBQWIsRUFBb0IxTCxDQUFwQixFQUFzQjtBQUNsQixhQUFLQyxRQUFMLENBQWMsRUFBRSxDQUFDeUwsS0FBRCxHQUFVMUwsRUFBRUUsTUFBRixDQUFTRSxLQUFyQixFQUFkO0FBQ0g7O0FBRURYLGFBQVM7O0FBRUwsZUFDSTtBQUFBO0FBQUEsY0FBSyxXQUFVLGFBQWY7QUFDSTtBQUFBO0FBQUE7QUFBQTtBQUFBLGFBREo7QUFHSSxxREFBTyxPQUFPLEtBQUtJLEtBQUwsQ0FBV3dJLFdBQXpCLEVBQXNDLFVBQVUsS0FBS3RJLFlBQUwsQ0FBa0JMLElBQWxCLENBQXVCLElBQXZCLEVBQTRCLGFBQTVCLENBQWhELEVBQTRGLFdBQVUsUUFBdEcsRUFBK0csYUFBWSxlQUEzSCxHQUhKO0FBSUkscURBQU8sT0FBTyxLQUFLRyxLQUFMLENBQVcrTCxZQUF6QixFQUF1QyxVQUFVLEtBQUs3TCxZQUFMLENBQWtCTCxJQUFsQixDQUF1QixJQUF2QixFQUE0QixjQUE1QixDQUFqRCxFQUE4RixXQUFVLFNBQXhHLEVBQWtILGFBQVksUUFBOUgsR0FKSjtBQUtJO0FBQUE7QUFBQSxrQkFBSyxXQUFVLFVBQWY7QUFDSTtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQURKO0FBRUkseURBQU8sTUFBSyxPQUFaLEVBQW9CLE1BQUssUUFBekIsRUFBa0MsT0FBTSxNQUF4QyxFQUErQyxTQUFTLEtBQUtHLEtBQUwsQ0FBV2dNLGFBQVgsS0FBNkIsTUFBckYsRUFBNkYsVUFBVSxLQUFLOUwsWUFBTCxDQUFrQkwsSUFBbEIsQ0FBdUIsSUFBdkIsRUFBNEIsZUFBNUIsQ0FBdkcsR0FGSjtBQUFBO0FBR0kseURBQU8sTUFBSyxPQUFaLEVBQW9CLE1BQUssUUFBekIsRUFBa0MsT0FBTSxRQUF4QyxFQUFpRCxTQUFTLEtBQUtHLEtBQUwsQ0FBV2dNLGFBQVgsS0FBNkIsUUFBdkYsRUFBaUcsVUFBVSxLQUFLOUwsWUFBTCxDQUFrQkwsSUFBbEIsQ0FBdUIsSUFBdkIsRUFBNEIsZUFBNUIsQ0FBM0csR0FISjtBQUFBO0FBQUEsYUFMSjtBQVVJLHFEQUFPLE9BQU8sS0FBS0csS0FBTCxDQUFXaU0sYUFBekIsRUFBd0MsVUFBVSxLQUFLL0wsWUFBTCxDQUFrQkwsSUFBbEIsQ0FBdUIsSUFBdkIsRUFBNEIsZUFBNUIsQ0FBbEQsRUFBZ0csV0FBVSxVQUExRyxFQUFxSCxhQUFZLFNBQWpJLEdBVko7QUFXSTtBQUFBO0FBQUEsa0JBQVEsV0FBVSxRQUFsQjtBQUFBO0FBQUEsYUFYSjtBQVlJLHFEQUFPLE9BQU8sS0FBS0csS0FBTCxDQUFXeEcsR0FBekIsRUFBOEIsVUFBVSxLQUFLMEcsWUFBTCxDQUFrQkwsSUFBbEIsQ0FBdUIsSUFBdkIsRUFBNEIsS0FBNUIsQ0FBeEMsRUFBNEUsV0FBVSxPQUF0RixFQUE4RixhQUFZLFlBQTFHO0FBWkosU0FESjtBQWlCSDtBQW5DcUM7O2tCQXVDM0JpTSxXOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMxQ2Y7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBQTs7OztBQUVBOzs7O0FBQ0E7Ozs7OztBQUVBLE1BQU00SCxXQUFOLFNBQTBCLGdCQUFNclUsU0FBaEMsQ0FBMEM7QUFDdENDLGdCQUFZQyxLQUFaLEVBQW1CO0FBQ2YsY0FBTUEsS0FBTjtBQUNIOztBQUVEOEwsY0FBUztBQUNMLGFBQUsvSCxPQUFMLENBQWFyQyxNQUFiLENBQW9CdkIsT0FBcEIsQ0FBNEJDLElBQTVCLENBQWlDLGlCQUFqQztBQUNIOztBQU1EQyxhQUFTOztBQUVMLGVBQ0k7QUFBQTtBQUFBLGNBQUssV0FBVSxTQUFmO0FBQ0k7QUFBQTtBQUFBLGtCQUFLLFdBQVUsVUFBZjtBQUNJO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFESixhQURKO0FBSUk7QUFBQTtBQUFBLGtCQUFLLFdBQVUsWUFBZixFQUE0QixTQUFTLEtBQUt5TCxPQUFMLENBQWF4TCxJQUFiLENBQWtCLElBQWxCLENBQXJDO0FBQ0ksbUVBQWEsV0FBVSxhQUF2QixHQURKO0FBRUk7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUZKLGFBSko7QUFRSTtBQUFBO0FBQUEsa0JBQUssV0FBVSxZQUFmLEVBQTRCLFNBQVMsS0FBS3dMLE9BQUwsQ0FBYXhMLElBQWIsQ0FBa0IsSUFBbEIsQ0FBckM7QUFDSSxtRUFBYSxXQUFVLGFBQXZCLEdBREo7QUFFSTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBRkosYUFSSjtBQVlJO0FBQUE7QUFBQSxrQkFBSyxXQUFVLFlBQWYsRUFBNEIsU0FBUyxLQUFLd0wsT0FBTCxDQUFheEwsSUFBYixDQUFrQixJQUFsQixDQUFyQztBQUNJLG1FQUFhLFdBQVUsYUFBdkIsR0FESjtBQUVJO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFGSixhQVpKO0FBZ0JJO0FBQUE7QUFBQSxrQkFBSyxXQUFVLFlBQWYsRUFBNEIsU0FBUyxLQUFLd0wsT0FBTCxDQUFheEwsSUFBYixDQUFrQixJQUFsQixDQUFyQztBQUNJLHVFQUFVLFdBQVUsYUFBcEIsR0FESjtBQUVJO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFGSixhQWhCSjtBQW9CSTtBQUFBO0FBQUEsa0JBQUssV0FBVSxZQUFmLEVBQTRCLFNBQVMsS0FBS3dMLE9BQUwsQ0FBYXhMLElBQWIsQ0FBa0IsSUFBbEIsQ0FBckM7QUFDSSxtRUFBYSxXQUFVLGFBQXZCLEdBREo7QUFFSTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBRko7QUFwQkosU0FESjtBQTJCSDtBQTFDcUM7O0FBQXBDNlQsVyxDQVNLMVMsWSxHQUFlO0FBQ2xCQyxZQUFRLE1BQU07QUFESSxDO2tCQXFDWHlTLFc7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbkRmOzs7O0FBQ0E7O0FBRUE7Ozs7QUFDQTs7Ozs7O0FBRUEsTUFBTXhILGtCQUFOLFNBQWlDLGdCQUFNN00sU0FBdkMsQ0FBaUQ7QUFDN0NDLGdCQUFZQyxLQUFaLEVBQW1CO0FBQ2YsY0FBTUEsS0FBTjtBQUNIOztBQUVENE0sb0JBQWdCO0FBQ1osWUFBSUMsYUFBYTtBQUNiaFMsK0JBQW1CLEtBQUttRixLQUFMLENBQVduRixpQkFEakI7QUFFYlUsOEJBQWtCLEtBQUt5RSxLQUFMLENBQVd6RTtBQUZoQixTQUFqQjtBQUlBc1IscUJBQWFDLG1CQUFtQkMsS0FBS0MsU0FBTCxDQUFlSCxVQUFmLENBQW5CLENBQWI7QUFDQSxZQUFJSSxhQUFhSCxtQkFBbUJDLEtBQUtDLFNBQUwsQ0FBZSxLQUFLaE4sS0FBTCxDQUFXdEYsY0FBMUIsQ0FBbkIsQ0FBakI7QUFDQSxhQUFLc0YsS0FBTCxDQUFXRyxPQUFYLENBQW1CQyxJQUFuQixDQUF5Qiw2QkFBNEJ5TSxVQUFXLFdBQVVJLFVBQVcsRUFBckY7QUFDSDs7QUFHRDVNLGFBQVM7QUFDTCxlQUNJO0FBQUE7QUFBQTtBQUNJO0FBQUE7QUFBQSw2QkFBb0IsS0FBS0wsS0FBekIsSUFBZ0MsY0FBYyxLQUFLQSxLQUFMLENBQVdvVSwwQkFBekQsRUFBcUYsT0FBTSwrQkFBM0YsRUFBMkgsTUFBSyxLQUFoSTtBQUNJO0FBQUE7QUFBQSxzQkFBUyxXQUFVLGVBQW5CO0FBRUk7QUFDSSxpQ0FBUSxtQkFEWjtBQUVJLDhCQUFNLEtBQUtwVSxLQUFMLENBQVduRixpQkFGckI7QUFHSSxrQ0FBVSxFQUhkO0FBSUksZ0NBQVEsS0FBS21GLEtBQUwsQ0FBV3pCLGlCQUFYLENBQTZCK0IsSUFBN0IsQ0FBa0MsSUFBbEM7QUFKWixzQkFGSjtBQVNJO0FBQ0ksaUNBQVEsbUJBRFo7QUFFSSw4QkFBSyxXQUZUO0FBR0ksOEJBQU0sS0FBS04sS0FBTCxDQUFXcVUsVUFIckI7QUFJSSxrQ0FBVSxLQUFLclUsS0FBTCxDQUFXbkYsaUJBQVgsQ0FBNkJDLE1BQTdCLENBQW9DQyxLQUFLQSxFQUFFekIsSUFBRixJQUFVLFdBQW5ELENBSmQ7QUFLSSxnQ0FBUSxLQUFLMEcsS0FBTCxDQUFXekIsaUJBQVgsQ0FBNkIrQixJQUE3QixDQUFrQyxJQUFsQztBQUxaLHNCQVRKO0FBaUJJO0FBQ0ksaUNBQVEscUJBRFo7QUFFSSw4QkFBSyxZQUZUO0FBR0ksOEJBQU0sS0FBS04sS0FBTCxDQUFXc1UsZUFIckI7QUFJSSxrQ0FBVSxLQUFLdFUsS0FBTCxDQUFXbkYsaUJBQVgsQ0FBNkJDLE1BQTdCLENBQW9DQyxLQUFLQSxFQUFFekIsSUFBRixJQUFVLFlBQW5ELENBSmQ7QUFLSSxnQ0FBUSxLQUFLMEcsS0FBTCxDQUFXekIsaUJBQVgsQ0FBNkIrQixJQUE3QixDQUFrQyxJQUFsQztBQUxaO0FBakJKO0FBREosYUFESjtBQThCSTtBQUFBO0FBQUEsa0JBQVEsU0FBUyxLQUFLc00sYUFBTCxDQUFtQnRNLElBQW5CLENBQXdCLElBQXhCLENBQWpCLEVBQWdELFdBQVUscUVBQTFEO0FBQUE7QUFBQTtBQTlCSixTQURKO0FBbUNIO0FBcEQ0Qzs7a0JBdURsQ3FNLGtCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM3RGY7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDQUE7Ozs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQUdBLE1BQU1XLGlCQUFOLFNBQWdDLGdCQUFNeE4sU0FBdEMsQ0FBZ0Q7QUFDNUNDLGdCQUFZQyxLQUFaLEVBQW1CO0FBQ2YsY0FBTUEsS0FBTjtBQUNBLGFBQUtTLEtBQUwsR0FBYSxFQUFiO0FBR0g7O0FBRURxQyx3QkFBb0I7QUFDaEIsYUFBS3lSLFVBQUw7QUFDSDs7QUFFREEsaUJBQWE7QUFDVCxZQUFJO0FBQ0FoWiw0QkFEQTtBQUVBViw2QkFGQTtBQUdBSDtBQUhBLFlBSUEsS0FBS3NGLEtBSlQ7O0FBTUEsWUFBSTtBQUNBLGdCQUFJdkYsY0FBYyxLQUFLZ1IsZ0JBQUwsQ0FBc0IsUUFBdEIsQ0FBbEI7QUFDQSxnQkFBSS9RLGlCQUFpQixLQUFLK1EsZ0JBQUwsQ0FBc0IsUUFBdEIsQ0FBckI7QUFDQSxnQkFBSS9RLGNBQUosRUFBb0I7QUFDaEJBLGlDQUFpQnFTLEtBQUtRLEtBQUwsQ0FBVzdTLGNBQVgsQ0FBakI7QUFDSCxhQUZELE1BRU87QUFDSEEsaUNBQWlCLEVBQWpCO0FBQ0g7QUFDREQsMEJBQWNzUyxLQUFLUSxLQUFMLENBQVc5UyxXQUFYLENBQWQ7QUFDQSxpQkFBSytaLGFBQUwsQ0FBbUIvWixXQUFuQixFQUFnQ0MsY0FBaEMsRUFBZ0QsSUFBaEQ7QUFDSCxTQVZELENBVUUsT0FBT2tHLENBQVAsRUFBVTtBQUNSN0Isb0JBQVFsRixLQUFSLENBQWMrRyxDQUFkO0FBQ0g7QUFFSjs7QUFFRDZNLGlCQUFhQyxXQUFiLEVBQTBCO0FBQ3RCLFlBQUlqVCxjQUFjO0FBQ2RJLCtCQUFtQixLQUFLbUYsS0FBTCxDQUFXbkYsaUJBRGhCO0FBRWRVLDhCQUFrQixLQUFLeUUsS0FBTCxDQUFXekU7QUFGZixTQUFsQjtBQUlBLFlBQUlzUixhQUFhQyxtQkFBbUJDLEtBQUtDLFNBQUwsQ0FBZXZTLFdBQWYsQ0FBbkIsQ0FBakI7QUFDQSxZQUFJd1MsYUFBYUgsbUJBQW1CQyxLQUFLQyxTQUFMLENBQWVVLFdBQWYsQ0FBbkIsQ0FBakI7QUFDQSxhQUFLMU4sS0FBTCxDQUFXRyxPQUFYLENBQW1CZ0IsT0FBbkIsQ0FBNEIsNkJBQTRCMEwsVUFBVyxXQUFVSSxVQUFXLEVBQXhGOztBQUVBLGFBQUt1SCxhQUFMLENBQW1CL1osV0FBbkIsRUFBZ0NpVCxXQUFoQyxFQUE2QyxJQUE3QztBQUNIOztBQUVEakMscUJBQWlCdEcsR0FBakIsRUFBc0I7QUFDbEI7QUFDQSxjQUFNdUcsY0FBYyxLQUFLMUwsS0FBTCxDQUFXdkUsUUFBWCxDQUFvQmtRLE1BQXhDO0FBQ0EsY0FBTWhGLFNBQVMsSUFBSWlGLGVBQUosQ0FBb0JGLFdBQXBCLENBQWY7QUFDQSxlQUFPL0UsT0FBT2tGLEdBQVAsQ0FBVzFHLEdBQVgsQ0FBUDtBQUNIOztBQUVEcVAsa0JBQWMvWixXQUFkLEVBQTJCQyxjQUEzQixFQUEyQ0MsVUFBM0MsRUFBdUQ7QUFDbkQsYUFBS3FGLEtBQUwsQ0FBV3ZDLFVBQVgsQ0FBc0JoRCxXQUF0QixFQUFtQ0MsY0FBbkMsRUFBbURDLFVBQW5EO0FBQ0g7O0FBRUQwRixhQUFTO0FBQ0wsZUFDSTtBQUFBO0FBQUE7QUFDSTtBQUFBO0FBQUEsNkJBQW9CLEtBQUtMLEtBQXpCLElBQWdDLGNBQWMsS0FBS0EsS0FBTCxDQUFXeVUsb0JBQXpELEVBQStFLE9BQU0sK0JBQXJGLEVBQXFILE1BQUssS0FBMUg7QUFDSSw2RUFBWSxLQUFLelUsS0FBakIsSUFBd0IsY0FBYyxLQUFLeU4sWUFBTCxDQUFrQm5OLElBQWxCLENBQXVCLElBQXZCLENBQXRDLElBREo7QUFFSSwrREFBaUIsS0FBS04sS0FBdEI7QUFGSjtBQURKLFNBREo7QUFRSDtBQW5FMkM7O2tCQXNFakNzTixpQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM3RWY7Ozs7QUFDQTs7QUFFQTs7Ozs7O0FBQ0E7OztBQUdBLE1BQU1vSCxXQUFOLFNBQTBCLGdCQUFNNVUsU0FBaEMsQ0FBMEM7QUFDdENDLGdCQUFZQyxLQUFaLEVBQW1CO0FBQ2YsY0FBTUEsS0FBTjtBQUNIOztBQUVESyxhQUFTOztBQUVMLFlBQUksRUFBRWlQLE9BQUYsRUFBV3FGLFVBQVgsS0FBMEIsS0FBSzNVLEtBQW5DOztBQUVBLGVBQ0k7QUFBQTtBQUFBLGNBQVMsV0FBVSx1QkFBbkI7QUFDSTtBQUFBO0FBQUEsa0JBQUssV0FBVSxpQkFBZjtBQUNJO0FBQUE7QUFBQSxzQkFBSyxXQUFVLEtBQWY7QUFDSTtBQUFBO0FBQUEsMEJBQUssV0FBVSxRQUFmO0FBRVEyVSxtQ0FBVzlTLEdBQVgsQ0FBZSxDQUFDK1MsS0FBRCxFQUFRelosQ0FBUixLQUFjO0FBQ3pCLG1DQUFPLDREQUF1QixLQUFLNkUsS0FBNUIsSUFBbUMsU0FBU3NQLFFBQVFzRixLQUFSLENBQTVDLEVBQTRELEtBQUt6WixDQUFqRSxJQUFQO0FBQ0gseUJBRkQ7QUFGUjtBQURKO0FBREo7QUFESixTQURKO0FBZUg7QUF4QnFDOztrQkE0QjNCdVosVzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbkNmOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBQTs7OztBQUNBOztBQUVBOzs7O0FBQ0E7Ozs7OztBQUVBLE1BQU01RyxNQUFOLFNBQXFCLGdCQUFNaE8sU0FBM0IsQ0FBcUM7QUFDakNDLGdCQUFZQyxLQUFaLEVBQW1CO0FBQ2YsY0FBTUEsS0FBTjtBQUNBLGFBQUtTLEtBQUwsR0FBYTtBQUNUc04sc0JBQVUsSUFERDtBQUVUQyx3QkFBWSxLQUZIO0FBR1RqUyx3QkFBWSxDQUFDLEdBQUQsRUFBTSxJQUFOLENBSEg7QUFJVGdDLHFCQUFTLElBSkE7QUFLVDhXLDRCQUFnQixLQUxQO0FBTVRDLDhCQUFrQixLQU5UO0FBT1Q3Vyx1QkFBVyxLQVBGO0FBUVRELDBCQUFjO0FBUkwsU0FBYjtBQVVIOztBQUVEaVEsOEJBQTBCak8sS0FBMUIsRUFBaUM7QUFDN0IsYUFBS2EsUUFBTCxjQUFtQmIsTUFBTXRGLGNBQXpCO0FBQ0g7O0FBRURvSSx3QkFBb0I7QUFDaEIsYUFBS2pDLFFBQUwsY0FBbUIsS0FBS2IsS0FBTCxDQUFXdEYsY0FBOUI7QUFDSDs7QUFFRHFhLGdCQUFZblUsQ0FBWixFQUFlO0FBQ1gsWUFBSW9VLFNBQVNwVSxFQUFFRSxNQUFGLENBQVNDLElBQXRCO0FBQ0EsWUFBSWtVLFVBQVVyVSxFQUFFRSxNQUFGLENBQVNtVSxPQUF2QjtBQUNBeFMsbUJBQVcsTUFBTTtBQUNiLGlCQUFLNUIsUUFBTCxDQUFjO0FBQ1YsaUJBQUNtVSxNQUFELEdBQVVDO0FBREEsYUFBZDtBQUdILFNBSkQ7QUFLSDs7QUFFRHhILG1CQUFlO0FBQ1gsWUFBSUMsY0FBYztBQUNkM1Isd0JBQVksS0FBSzBFLEtBQUwsQ0FBVzFFLFVBRFQ7QUFFZDRCLHFCQUFTLEtBQUs4QyxLQUFMLENBQVc5QyxPQUZOO0FBR2RJLHFCQUFTLEtBQUswQyxLQUFMLENBQVcxQyxPQUhOO0FBSWRFLHVCQUFXLEtBQUt3QyxLQUFMLENBQVd4QyxTQUpSO0FBS2RELDBCQUFjLEtBQUt5QyxLQUFMLENBQVd6QyxZQUxYO0FBTWQ2Vyw0QkFBZ0IsS0FBS3BVLEtBQUwsQ0FBV29VLGNBTmI7QUFPZEMsOEJBQWtCLEtBQUtyVSxLQUFMLENBQVdxVTtBQVBmLFNBQWxCO0FBU0EsYUFBSzlVLEtBQUwsQ0FBV3lOLFlBQVgsQ0FBd0JDLFdBQXhCO0FBQ0EsYUFBSzdNLFFBQUwsQ0FBYyxFQUFFbU4sWUFBWSxLQUFkLEVBQWQ7QUFDSDs7QUFFREUsZUFBV0MsS0FBWCxFQUFrQjtBQUNkLGFBQUt0TixRQUFMLENBQWMsRUFBRWtOLFVBQVVJLE1BQU1DLGFBQWxCLEVBQWQ7QUFDSDs7QUFFREMsZ0JBQVkvVSxJQUFaLEVBQWtCO0FBQ2QsYUFBS3VILFFBQUwsQ0FBYyxFQUFFa04sVUFBVSxJQUFaLEVBQWtCaFEsU0FBU3pFLElBQTNCLEVBQWQsRUFBaUQsTUFBTTtBQUNuRCxnQkFBSUEsSUFBSixFQUFVO0FBQ04scUJBQUttVSxZQUFMO0FBQ0g7QUFDSixTQUpEO0FBS0g7O0FBRURhLG1CQUFlO0FBQ1gsYUFBS3pOLFFBQUwsQ0FBYztBQUNWbU4sd0JBQVksQ0FBQyxLQUFLdk4sS0FBTCxDQUFXdU47QUFEZCxTQUFkO0FBR0g7O0FBRURPLGdCQUFZalYsSUFBWixFQUFrQmtWLEtBQWxCLEVBQXlCO0FBQ3JCLGFBQUszTixRQUFMLENBQWM7QUFDVixhQUFDdkgsSUFBRCxHQUFRa1Y7QUFERSxTQUFkO0FBR0g7O0FBRURDLHNCQUFrQjVULGlCQUFsQixFQUFxQztBQUNqQyxZQUFJQSxxQkFBcUJBLGtCQUFrQjhQLE1BQTNDLEVBQW1EO0FBQy9DLG1CQUFPOVAsa0JBQWtCRyxNQUFsQixDQUF5QixDQUFDMFQsS0FBRCxFQUFReFQsSUFBUixFQUFjQyxDQUFkLEtBQW9CO0FBQ2hELG9CQUFJQSxLQUFLLENBQVQsRUFBWTtBQUNSdVQsNkJBQVMsSUFBVDtBQUNIO0FBQ0RBLHlCQUFVLEdBQUV4VCxLQUFLNkYsSUFBSyxFQUF0QjtBQUNBLHVCQUFPMk4sS0FBUDtBQUNILGFBTk0sRUFNSixFQU5JLENBQVA7QUFPSDtBQUNKOztBQUVEck8sYUFBUzs7QUFFTCxZQUFJc08sY0FBYyxLQUFLRixpQkFBTCxDQUF1QixLQUFLek8sS0FBTCxDQUFXbkYsaUJBQWxDLENBQWxCOztBQUVBLGVBQ0k7QUFBQTtBQUFBLGNBQVMsV0FBVSxZQUFuQjtBQUNJO0FBQUE7QUFBQSxrQkFBSyxXQUFVLGlCQUFmO0FBQ0k7QUFBQTtBQUFBLHNCQUFLLFdBQVUsS0FBZjtBQUNJO0FBQUE7QUFBQSwwQkFBSyxXQUFVLFFBQWY7QUFDSTtBQUFBO0FBQUEsOEJBQUssV0FBVSxhQUFmO0FBQ0k7QUFBQTtBQUFBLGtDQUFLLFdBQVUsZUFBZjtBQUNJO0FBQUE7QUFBQSxzQ0FBSSxXQUFVLGFBQWQ7QUFDSTtBQUFBO0FBQUEsMENBQUksU0FBUyxLQUFLcVQsVUFBTCxDQUFnQjVOLElBQWhCLENBQXFCLElBQXJCLENBQWI7QUFBeUM7QUFBQTtBQUFBLDhDQUFNLFdBQVUseUNBQWhCO0FBQTBELG1GQUFLLEtBQUksc0NBQVQsRUFBZ0QsV0FBVSxXQUExRDtBQUExRDtBQUF6QyxxQ0FESjtBQUVJO0FBQUE7QUFBQSwwQ0FBSSxTQUFTLEtBQUtnTyxZQUFMLENBQWtCaE8sSUFBbEIsQ0FBdUIsSUFBdkIsQ0FBYjtBQUEyQztBQUFBO0FBQUEsOENBQU0sV0FBVSx3REFBaEI7QUFBeUUsbUZBQUssS0FBSSx1Q0FBVCxFQUFpRCxXQUFVLFdBQTNEO0FBQXpFLHlDQUEzQztBQUFvTSxnRkFBTSxXQUFVLHFCQUFoQjtBQUFwTTtBQUZKO0FBREosNkJBREo7QUFPSTtBQUFBO0FBQUEsa0NBQUssV0FBVSxjQUFmO0FBQ0sscUNBQUtOLEtBQUwsQ0FBVzJVLFVBQVgsQ0FBc0JoSyxNQUQzQjtBQUFBO0FBQ3FEO0FBQUE7QUFBQSxzQ0FBTSxXQUFVLFFBQWhCO0FBQUE7QUFBMkJnRTtBQUEzQjtBQURyRDtBQVBKO0FBREo7QUFESjtBQURKLGFBREo7QUFrQkk7QUFBQTtBQUFBO0FBQ0ksd0JBQUcsV0FEUDtBQUVJLDhCQUFVLEtBQUtsTyxLQUFMLENBQVdzTixRQUZ6QjtBQUdJLDBCQUFNYSxRQUFRLEtBQUtuTyxLQUFMLENBQVdzTixRQUFuQixDQUhWO0FBSUksNkJBQVMsS0FBS00sV0FBTCxDQUFpQi9OLElBQWpCLENBQXNCLElBQXRCLEVBQTRCLElBQTVCO0FBSmI7QUFNSTtBQUFBO0FBQUEsc0JBQVUsU0FBUyxLQUFLK04sV0FBTCxDQUFpQi9OLElBQWpCLENBQXNCLElBQXRCLEVBQTRCLE1BQTVCLENBQW5CO0FBQUE7QUFBQSxpQkFOSjtBQU9JO0FBQUE7QUFBQSxzQkFBVSxTQUFTLEtBQUsrTixXQUFMLENBQWlCL04sSUFBakIsQ0FBc0IsSUFBdEIsRUFBNEIsT0FBNUIsQ0FBbkI7QUFBQTtBQUFBLGlCQVBKO0FBUUk7QUFBQTtBQUFBLHNCQUFVLFNBQVMsS0FBSytOLFdBQUwsQ0FBaUIvTixJQUFqQixDQUFzQixJQUF0QixFQUE0QixVQUE1QixDQUFuQjtBQUFBO0FBQUEsaUJBUko7QUFTSTtBQUFBO0FBQUEsc0JBQVUsU0FBUyxLQUFLK04sV0FBTCxDQUFpQi9OLElBQWpCLENBQXNCLElBQXRCLEVBQTRCLFlBQTVCLENBQW5CO0FBQUE7QUFBQTtBQVRKLGFBbEJKO0FBK0JRLGlCQUFLRyxLQUFMLENBQVd1TixVQUFYLEdBQXdCO0FBQUE7QUFBQSxrQkFBSyxTQUFTLEtBQUtNLFlBQUwsQ0FBa0JoTyxJQUFsQixDQUF1QixJQUF2QixDQUFkLEVBQTRDLFdBQVUsZUFBdEQ7QUFDcEI7QUFBQTtBQUFBLHNCQUFLLFdBQVUscUJBQWYsRUFBcUMsU0FBVU0sQ0FBRCxJQUFPO0FBQ2pEQSw4QkFBRStFLGVBQUY7QUFDQS9FLDhCQUFFaU8sY0FBRjtBQUNILHlCQUhEO0FBSUk7QUFBQTtBQUFBLDBCQUFLLFdBQVUsZ0JBQWY7QUFDSTtBQUFBO0FBQUEsOEJBQUssV0FBVSxXQUFmO0FBQ0k7QUFBQTtBQUFBLGtDQUFNLFdBQVUsSUFBaEI7QUFBQTtBQUFBLDZCQURKO0FBRUkscUVBQU8sTUFBSyxVQUFaLEVBQXVCLE1BQUssY0FBNUIsRUFBMkMsU0FBUyxDQUFDLENBQUMsS0FBS3BPLEtBQUwsQ0FBV3pDLFlBQWpFLEVBQStFLFVBQVUsS0FBSytXLFdBQUwsQ0FBaUJ6VSxJQUFqQixDQUFzQixJQUF0QixDQUF6RixFQUFzSCxXQUFVLGFBQWhJO0FBRko7QUFESixxQkFKSjtBQVdJO0FBQUE7QUFBQSwwQkFBSyxXQUFVLGdCQUFmO0FBQ0k7QUFBQTtBQUFBLDhCQUFLLFdBQVUsV0FBZjtBQUNJO0FBQUE7QUFBQSxrQ0FBTSxXQUFVLElBQWhCO0FBQUE7QUFBQSw2QkFESjtBQUVJLHFFQUFPLE1BQUssVUFBWixFQUF1QixNQUFLLGdCQUE1QixFQUE2QyxTQUFTLENBQUMsQ0FBQyxLQUFLRyxLQUFMLENBQVdvVSxjQUFuRSxFQUFtRixVQUFVLEtBQUtFLFdBQUwsQ0FBaUJ6VSxJQUFqQixDQUFzQixJQUF0QixDQUE3RixFQUEwSCxXQUFVLGFBQXBJLEdBRko7QUFHSTtBQUFBO0FBQUEsa0NBQU0sV0FBVSxrQkFBaEI7QUFBQTtBQUFBLDZCQUhKO0FBS0kscUVBQU8sTUFBSyxVQUFaLEVBQXVCLE1BQUssa0JBQTVCLEVBQStDLFNBQVMsQ0FBQyxDQUFDLEtBQUtHLEtBQUwsQ0FBV3FVLGdCQUFyRSxFQUF1RixVQUFVLEtBQUtDLFdBQUwsQ0FBaUJ6VSxJQUFqQixDQUFzQixJQUF0QixDQUFqRyxFQUE4SCxXQUFVLGFBQXhJLEdBTEo7QUFNSTtBQUFBO0FBQUEsa0NBQU0sV0FBVSxrQkFBaEI7QUFBQTtBQUFBO0FBTko7QUFESixxQkFYSjtBQXNCSTtBQUFBO0FBQUEsMEJBQUssV0FBVSxnQkFBZjtBQUNJO0FBQUE7QUFBQSw4QkFBSyxXQUFVLFdBQWY7QUFDSTtBQUFBO0FBQUEsa0NBQU0sV0FBVSxJQUFoQjtBQUFBO0FBQUEsNkJBREo7QUFFSTtBQUFBO0FBQUEsa0NBQU0sV0FBVSxJQUFoQjtBQUFBO0FBQXlCLHFDQUFLRyxLQUFMLENBQVcxRSxVQUFYLENBQXNCLENBQXRCLENBQXpCO0FBQUE7QUFBdUQscUNBQUswRSxLQUFMLENBQVcxRSxVQUFYLENBQXNCLENBQXRCO0FBQXZELDZCQUZKO0FBR0k7QUFBQTtBQUFBLGtDQUFNLFdBQVUsSUFBaEI7QUFBQTtBQUFBLDZCQUhKO0FBSUk7QUFBQTtBQUFBLGtDQUFNLFdBQVUsSUFBaEI7QUFBQTtBQUFBLDZCQUpKO0FBTUk7QUFDSSxxQ0FBSyxHQURUO0FBRUkscUNBQUssSUFGVDtBQUdJLHVDQUFPLEtBQUswRSxLQUFMLENBQVcxRSxVQUh0QjtBQUlJLHNDQUFNLEdBSlY7QUFLSSwyQ0FBVSxPQUxkO0FBTUksMENBQVUsS0FBS3dTLFdBQUwsQ0FBaUJqTyxJQUFqQixDQUFzQixJQUF0QixFQUE0QixZQUE1QjtBQU5kO0FBTko7QUFESixxQkF0Qko7QUF1Q0k7QUFBQTtBQUFBLDBCQUFLLFdBQVUsZ0JBQWY7QUFDSTtBQUFBO0FBQUEsOEJBQUssV0FBVSxXQUFmO0FBQ0k7QUFBQTtBQUFBLGtDQUFNLFdBQVUsSUFBaEI7QUFBQTtBQUFBLDZCQURKO0FBRUkscUVBQU8sTUFBSyxVQUFaLEVBQXVCLE1BQUssV0FBNUIsRUFBd0MsU0FBUyxDQUFDLENBQUMsS0FBS0csS0FBTCxDQUFXeEMsU0FBOUQsRUFBeUUsVUFBVSxLQUFLOFcsV0FBTCxDQUFpQnpVLElBQWpCLENBQXNCLElBQXRCLENBQW5GLEVBQWdILFdBQVUsYUFBMUg7QUFGSjtBQURKLHFCQXZDSjtBQThDSTtBQUFBO0FBQUEsMEJBQUssV0FBVSxvQkFBZjtBQUNJO0FBQUE7QUFBQSw4QkFBUSxXQUFVLHNDQUFsQixFQUF5RCxTQUFTLEtBQUttTixZQUFMLENBQWtCbk4sSUFBbEIsQ0FBdUIsSUFBdkIsQ0FBbEU7QUFBQTtBQUFBO0FBREo7QUE5Q0o7QUFEb0IsYUFBeEIsR0FtRFM7QUFsRmpCLFNBREo7QUF3Rkg7QUEvS2dDOztrQkFtTHRCd04sTTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDekxmOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0FBOzs7O0FBQ0E7O0FBQ0E7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBR0EsTUFBTW9ILG1CQUFOLFNBQWtDLGdCQUFNcFYsU0FBeEMsQ0FBa0Q7QUFDOUNDLGdCQUFZQyxLQUFaLEVBQW1CO0FBQ2YsY0FBTUEsS0FBTjtBQUNBLGFBQUtTLEtBQUwsR0FBYTtBQUNUMFUsbUJBQU8sS0FERTtBQUVUQyxtQkFBTyxLQUZFO0FBR1RDLG1CQUFPLEtBSEU7QUFJVEMsbUJBQU8sS0FKRTtBQUtUck4sb0JBQVEsS0FMQztBQU1Uc04sNkJBQWlCLEtBTlI7QUFPVEMsNkJBQWlCLEtBUFI7QUFRVEMsMEJBQWMsS0FSTDtBQVNUQyw2QkFBaUIsS0FUUjtBQVVUQyxzQkFBVTtBQVZELFNBQWI7QUFZSDs7QUFFRDdTLHdCQUFvQjtBQUNoQixhQUFLakMsUUFBTCxjQUFtQixLQUFLYixLQUFMLENBQVd0RixjQUE5QjtBQUNIOztBQUVEa2Isa0JBQWM7QUFDVixhQUFLNVYsS0FBTCxDQUFXNlYsYUFBWCxDQUF5QixLQUFLcFYsS0FBOUI7QUFDQSxhQUFLVCxLQUFMLENBQVdHLE9BQVgsQ0FBbUJvRCxFQUFuQixDQUFzQixDQUFDLENBQXZCO0FBQ0g7O0FBRUR1UyxtQkFBZS9VLElBQWYsRUFBcUJILENBQXJCLEVBQXdCO0FBQ3BCLGFBQUtDLFFBQUwsQ0FBYyxFQUFFLENBQUNFLElBQUQsR0FBUUgsRUFBRUUsTUFBRixDQUFTbVUsT0FBbkIsRUFBZDtBQUNIOztBQUVEYyxzQkFBa0JoVixJQUFsQixFQUF3QkgsQ0FBeEIsRUFBMkI7QUFDdkIsYUFBS0MsUUFBTCxDQUFjLEVBQUUsQ0FBQ0UsSUFBRCxHQUFRSCxFQUFFRSxNQUFGLENBQVNFLEtBQW5CLEVBQWQ7QUFDSDs7QUFFRFgsYUFBUzs7QUFFTCxlQUNJO0FBQUE7QUFBQSxjQUFLLFdBQVUscUJBQWY7QUFDSTtBQUFBO0FBQUEsa0JBQUssV0FBVSxXQUFmO0FBQ0k7QUFBQTtBQUFBLHNCQUFHLFdBQVUsWUFBYjtBQUFBO0FBQUEsaUJBREo7QUFFSTtBQUFBO0FBQUE7QUFDSSxzQ0FBVyxLQURmO0FBRUksOEJBQUs7QUFGVDtBQUlJLDRFQUFrQixTQUFTO0FBQ3ZCLHFDQUFTLEtBQUtJLEtBQUwsQ0FBVzBVLEtBREc7QUFFdkIsc0NBQVUsS0FBS1csY0FBTCxDQUFvQnhWLElBQXBCLENBQXlCLElBQXpCLEVBQStCLE9BQS9CO0FBRmEsMEJBQTNCLEVBR0ksT0FBTSxlQUhWLEdBSko7QUFRSSw0RUFBa0IsU0FBUztBQUN2QixxQ0FBUyxLQUFLRyxLQUFMLENBQVcyVSxLQURHO0FBRXZCLHNDQUFVLEtBQUtVLGNBQUwsQ0FBb0J4VixJQUFwQixDQUF5QixJQUF6QixFQUErQixPQUEvQjtBQUZhLDBCQUEzQixFQUdJLE9BQU0sWUFIVixHQVJKO0FBWUksNEVBQWtCLFNBQVM7QUFDdkIscUNBQVMsS0FBS0csS0FBTCxDQUFXNFUsS0FERztBQUV2QixzQ0FBVSxLQUFLUyxjQUFMLENBQW9CeFYsSUFBcEIsQ0FBeUIsSUFBekIsRUFBK0IsT0FBL0I7QUFGYSwwQkFBM0IsRUFHSSxPQUFNLGFBSFYsR0FaSjtBQWdCSSw0RUFBa0IsU0FBUztBQUN2QixxQ0FBUyxLQUFLRyxLQUFMLENBQVc2VSxLQURHO0FBRXZCLHNDQUFVLEtBQUtRLGNBQUwsQ0FBb0J4VixJQUFwQixDQUF5QixJQUF6QixFQUErQixPQUEvQjtBQUZhLDBCQUEzQixFQUdJLE9BQU0sT0FIVjtBQWhCSjtBQUZKLGFBREo7QUEwQkk7QUFBQTtBQUFBLGtCQUFLLFdBQVUsV0FBZjtBQUNJO0FBQUE7QUFBQSxzQkFBRyxXQUFVLFlBQWI7QUFBQTtBQUFBLGlCQURKO0FBRUk7QUFBQTtBQUFBO0FBQ0ksc0NBQVcsVUFEZjtBQUVJLDhCQUFLLFdBRlQ7QUFHSSwrQkFBTyxLQUFLRyxLQUFMLENBQVdrVixRQUh0QjtBQUlJLGtDQUFVLEtBQUtJLGlCQUFMLENBQXVCelYsSUFBdkIsQ0FBNEIsSUFBNUIsRUFBa0MsVUFBbEM7QUFKZDtBQU1JLDRFQUFrQixPQUFNLE1BQXhCLEVBQStCLFNBQVMsaURBQU8sT0FBTSxTQUFiLEdBQXhDLEVBQW1FLE9BQU0sYUFBekUsR0FOSjtBQU9JLDRFQUFrQixPQUFNLE1BQXhCLEVBQStCLFNBQVMsaURBQU8sT0FBTSxTQUFiLEdBQXhDLEVBQW1FLE9BQU0sYUFBekUsR0FQSjtBQVFJLDRFQUFrQixPQUFNLE1BQXhCLEVBQStCLFNBQVMsaURBQU8sT0FBTSxTQUFiLEdBQXhDLEVBQW1FLE9BQU0sYUFBekUsR0FSSjtBQVNJLDRFQUFrQixPQUFNLEtBQXhCLEVBQThCLFNBQVMsaURBQU8sT0FBTSxTQUFiLEdBQXZDLEVBQWtFLE9BQU0sWUFBeEU7QUFUSjtBQUZKLGFBMUJKO0FBMENJO0FBQUE7QUFBQSxrQkFBSyxXQUFVLFdBQWY7QUFDSTtBQUFBO0FBQUEsc0JBQUcsV0FBVSxZQUFiO0FBQUE7QUFBQSxpQkFESjtBQUVJO0FBQUE7QUFBQTtBQUNJLHNDQUFXLFlBRGY7QUFFSSw4QkFBSztBQUZUO0FBSUksNEVBQWtCLFNBQVM7QUFDdkIscUNBQVMsS0FBS0csS0FBTCxDQUFXOFUsZUFERztBQUV2QixzQ0FBVSxLQUFLTyxjQUFMLENBQW9CeFYsSUFBcEIsQ0FBeUIsSUFBekIsRUFBK0IsaUJBQS9CO0FBRmEsMEJBQTNCLEVBR0ksT0FBTSxVQUhWLEdBSko7QUFRSSw0RUFBa0IsU0FBUztBQUN2QixxQ0FBUyxLQUFLRyxLQUFMLENBQVcrVSxlQURHO0FBRXZCLHNDQUFVLEtBQUtNLGNBQUwsQ0FBb0J4VixJQUFwQixDQUF5QixJQUF6QixFQUErQixpQkFBL0I7QUFGYSwwQkFBM0IsRUFHSSxPQUFNLFVBSFYsR0FSSjtBQVlJLDRFQUFrQixTQUFTO0FBQ3ZCLHFDQUFTLEtBQUtHLEtBQUwsQ0FBV2dWLFlBREc7QUFFdkIsc0NBQVUsS0FBS0ssY0FBTCxDQUFvQnhWLElBQXBCLENBQXlCLElBQXpCLEVBQStCLGNBQS9CO0FBRmEsMEJBQTNCLEVBR0ksT0FBTSxxQkFIVjtBQVpKO0FBRkosYUExQ0o7QUErREk7QUFBQTtBQUFBLGtCQUFLLFdBQVUsV0FBZjtBQUNJO0FBQUE7QUFBQSxzQkFBRyxXQUFVLFlBQWI7QUFBQTtBQUFBLGlCQURKO0FBRUk7QUFBQTtBQUFBO0FBQ0ksc0NBQVcsUUFEZjtBQUVJLDhCQUFLLFNBRlQ7QUFHSSwrQkFBTyxLQUFLRyxLQUFMLENBQVd3SCxNQUh0QjtBQUlJLGtDQUFVLEtBQUs4TixpQkFBTCxDQUF1QnpWLElBQXZCLENBQTRCLElBQTVCLEVBQWtDLFFBQWxDO0FBSmQ7QUFNSSw0RUFBa0IsT0FBTSxLQUF4QixFQUE4QixTQUFTLGlEQUFPLE9BQU0sU0FBYixHQUF2QyxFQUFrRSxPQUFNLEtBQXhFLEdBTko7QUFPSSw0RUFBa0IsT0FBTSxNQUF4QixFQUErQixTQUFTLGlEQUFPLE9BQU0sU0FBYixHQUF4QyxFQUFtRSxPQUFNLE1BQXpFLEdBUEo7QUFRSSw0RUFBa0IsT0FBTSxRQUF4QixFQUFpQyxTQUFTLGlEQUFPLE9BQU0sU0FBYixHQUExQyxFQUFxRSxPQUFNLFFBQTNFO0FBUko7QUFGSixhQS9ESjtBQThFSTtBQUFBO0FBQUEsa0JBQUssV0FBVSxXQUFmO0FBQ0k7QUFBQTtBQUFBLHNCQUFHLFdBQVUsWUFBYjtBQUFBO0FBQUEsaUJBREo7QUFFSTtBQUFBO0FBQUE7QUFDSSxzQ0FBVyxjQURmO0FBRUksOEJBQUs7QUFGVDtBQUlJLDRFQUFrQixTQUFTO0FBQ3ZCLHFDQUFTLEtBQUtHLEtBQUwsQ0FBV2lWLGVBREc7QUFFdkIsc0NBQVUsS0FBS0ksY0FBTCxDQUFvQnhWLElBQXBCLENBQXlCLElBQXpCLEVBQStCLGlCQUEvQjtBQUZhLDBCQUEzQixFQUdJLE9BQU0saUJBSFYsR0FKSjtBQUFBO0FBQUE7QUFGSixhQTlFSjtBQTJGSTtBQUFBO0FBQUEsa0JBQVEsV0FBVSxhQUFsQixFQUFnQyxTQUFTLEtBQUtzVixXQUFMLENBQWlCdFYsSUFBakIsQ0FBc0IsSUFBdEIsQ0FBekM7QUFBQTtBQUFBO0FBM0ZKLFNBREo7QUFnR0g7QUFwSTZDOztrQkF3SW5DLGdDQUFXNFUsbUJBQVgsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDakpmOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0FBO0FBQ08sTUFBTWMsOENBQW1CLGtCQUF6QjtBQUNBLE1BQU1DLDhDQUFtQixrQkFBekI7QUFDQSxNQUFNQyx3Q0FBZ0IsZUFBdEI7QUFDQSxNQUFNQyxrREFBcUIsb0JBQTNCO0FBQ0EsTUFBTUMsa0RBQXFCLG9CQUEzQjtBQUNBLE1BQU1DLDRDQUFrQixpQkFBeEI7O0FBRVA7QUFDTyxNQUFNQywwQ0FBaUIsZ0JBQXZCO0FBQ0EsTUFBTUMsd0NBQWdCLGVBQXRCO0FBQ0EsTUFBTUMsb0RBQXNCLHFCQUE1QjtBQUNBLE1BQU1DLG9EQUFzQixxQkFBNUI7QUFDQSxNQUFNQywwREFBeUIsd0JBQS9CO0FBQ0EsTUFBTUMsb0RBQXNCLHFCQUE1QjtBQUNBLE1BQU1DLDRDQUFrQixpQkFBeEI7QUFDQSxNQUFNQyw4REFBMkIsMEJBQWpDOztBQUdQO0FBQ08sTUFBTUMsZ0VBQTRCLDJCQUFsQztBQUNBLE1BQU1DLDBEQUF5Qix3QkFBL0I7QUFDQSxNQUFNQyw4REFBMkIsMEJBQWpDO0FBQ0EsTUFBTUMsb0NBQWMsYUFBcEI7QUFDQSxNQUFNQyxrQ0FBYSxZQUFuQjtBQUNBLE1BQU1DLGdFQUE0QiwyQkFBbEM7QUFDQSxNQUFNQyw4REFBMkIsMEJBQWpDO0FBQ0EsTUFBTUMsOENBQW1CLGtCQUF6Qjs7QUFFUDtBQUNPLE1BQU1DLHNEQUF1QixzQkFBN0IsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDOUJQOzs7O0FBQ0E7O0FBRUE7O0FBRUE7Ozs7OztBQUdBLE1BQU1DLElBQU4sU0FBbUIsZ0JBQU16WCxTQUF6QixDQUFtQztBQUMvQkMsZ0JBQVlDLEtBQVosRUFBbUI7QUFDZixjQUFNQSxLQUFOO0FBQ0g7O0FBRURLLGFBQVM7O0FBRUwsZUFDSSwrQ0FBYyxLQUFLTCxLQUFuQixDQURKO0FBR0g7QUFWOEI7O0FBYW5DLE1BQU13WCxrQkFBbUIvVyxLQUFELElBQVc7QUFDL0IsVUFBTW1HLE9BQU9uRyxNQUFNbUcsSUFBbkI7O0FBRUEsV0FBTztBQUNIQTtBQURHLEtBQVA7QUFHSCxDQU5EOztBQVFBLE1BQU02USxxQkFBc0JwZSxRQUFELElBQWM7QUFDckMsV0FBTyxFQUFQO0FBR0gsQ0FKRDs7a0JBT2UseUJBQVFtZSxlQUFSLEVBQXlCQyxrQkFBekIsRUFBNkNGLElBQTdDLEM7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3BDZjs7OztBQUNBOztBQUVBOztBQUVBOzs7Ozs7QUFHQSxNQUFNRyxJQUFOLFNBQW1CLGdCQUFNNVgsU0FBekIsQ0FBbUM7QUFDL0JDLGdCQUFZQyxLQUFaLEVBQW1CO0FBQ2YsY0FBTUEsS0FBTjtBQUNIOztBQU1ESyxhQUFTOztBQUVMLGVBQ0ksOENBQWMsS0FBS0wsS0FBbkIsQ0FESjtBQUdIO0FBZDhCOztBQUE3QjBYLEksQ0FLS2pXLFksR0FBZTtBQUNsQkMsWUFBUSxNQUFNO0FBREksQztBQVkxQixNQUFNOFYsa0JBQW1CL1csS0FBRCxJQUFXO0FBQy9CLFFBQUksS0FFQUEsTUFBTWtYLElBRlY7O0FBSUEsV0FBTyxFQUFQO0FBR0gsQ0FSRDs7QUFVQSxNQUFNRixxQkFBc0JwZSxRQUFELElBQWM7QUFDckMsV0FBTyxFQUFQO0FBR0gsQ0FKRDs7a0JBT2UseUJBQVFtZSxlQUFSLEVBQXlCQyxrQkFBekIsRUFBNkNDLElBQTdDLEM7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzFDZjs7OztBQUNBOztBQUVBOztBQUVBOzs7Ozs7QUFHQSxNQUFNRSxTQUFOLFNBQXdCLGdCQUFNOVgsU0FBOUIsQ0FBd0M7QUFDcENDLGdCQUFZQyxLQUFaLEVBQW1CO0FBQ2YsY0FBTUEsS0FBTjtBQUNIOztBQU1ESyxhQUFTOztBQUVMLGVBQ0ksbURBQW1CLEtBQUtMLEtBQXhCLENBREo7QUFHSDtBQWRtQzs7QUFBbEM0WCxTLENBS0tuVyxZLEdBQWU7QUFDbEJDLFlBQVEsTUFBTTtBQURJLEM7QUFZMUIsTUFBTThWLGtCQUFtQi9XLEtBQUQsSUFBVztBQUMvQixRQUFJO0FBQ0F0RyxhQURBO0FBRUFKLHFCQUZBO0FBR0E4ZCx1QkFIQTtBQUlBcmUsbUJBSkE7QUFLQXNlLGtCQUxBO0FBTUFDLDBCQU5BO0FBT0FDO0FBUEEsUUFRQXZYLE1BQU1rWCxJQVJWOztBQVVBLFdBQU87QUFDSHhkLGFBREc7QUFFSEoscUJBRkc7QUFHSDhkLHVCQUhHO0FBSUhyZSxtQkFKRztBQUtIc2Usa0JBTEc7QUFNSEMsMEJBTkc7QUFPSEM7QUFQRyxLQUFQO0FBU0gsQ0FwQkQ7O0FBc0JBLE1BQU1QLHFCQUFzQnBlLFFBQUQsSUFBYztBQUNyQyxXQUFPO0FBQ0hXLG1CQUFXLENBQUNiLE1BQUQsRUFBU2MsR0FBVCxFQUFjYixFQUFkLEtBQXFCQyxTQUFTLHNCQUFVRixNQUFWLEVBQWtCYyxHQUFsQixFQUF1QmIsRUFBdkIsQ0FBVDtBQUQ3QixLQUFQO0FBR0gsQ0FKRDs7a0JBT2UseUJBQVFvZSxlQUFSLEVBQXlCQyxrQkFBekIsRUFBNkNHLFNBQTdDLEM7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3REZjs7OztBQUNBOztBQUVBOztBQUVBOzs7Ozs7QUFHQSxNQUFNSyxnQkFBTixTQUErQixnQkFBTW5ZLFNBQXJDLENBQStDO0FBQzNDQyxnQkFBWUMsS0FBWixFQUFtQjtBQUNmLGNBQU1BLEtBQU47QUFDSDs7QUFFREssYUFBUzs7QUFFTCxlQUNJLCtDQUEwQixLQUFLTCxLQUEvQixDQURKO0FBR0g7QUFWMEM7O0FBYS9DLE1BQU13WCxrQkFBbUIvVyxLQUFELElBQVc7QUFDL0IsVUFBTW1HLE9BQU9uRyxNQUFNbUcsSUFBbkI7O0FBRUEsV0FBTztBQUNIQTtBQURHLEtBQVA7QUFHSCxDQU5EOztBQVFBLE1BQU02USxxQkFBc0JwZSxRQUFELElBQWM7QUFDckMsV0FBTztBQUNIaUIsd0NBQWlDLE1BQU1qQixTQUFTLDRDQUFUO0FBRHBDLEtBQVA7QUFHSCxDQUpEOztrQkFPZSx5QkFBUW1lLGVBQVIsRUFBeUJDLGtCQUF6QixFQUE2Q1EsZ0JBQTdDLEM7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3BDZjs7OztBQUNBOztBQUVBOztBQUVBOzs7Ozs7QUFHQSxNQUFNQyxTQUFOLFNBQXdCLGdCQUFNcFksU0FBOUIsQ0FBd0M7QUFDcENDLGdCQUFZQyxLQUFaLEVBQW1CO0FBQ2YsY0FBTUEsS0FBTjtBQUNIOztBQU1ESyxhQUFTOztBQUVMLGVBQ0ksbURBQW1CLEtBQUtMLEtBQXhCLENBREo7QUFHSDtBQWRtQzs7QUFBbENrWSxTLENBS0t6VyxZLEdBQWU7QUFDbEJDLFlBQVEsTUFBTTtBQURJLEM7QUFZMUIsTUFBTThWLGtCQUFtQi9XLEtBQUQsSUFBVztBQUMvQixRQUFJO0FBQ0F0RyxhQURBO0FBRUFKLHFCQUZBO0FBR0E4ZCx1QkFIQTtBQUlBelcsd0JBSkE7QUFLQStXLDJCQUxBO0FBTUFDLHdCQU5BO0FBT0E1ZTtBQVBBLFFBUUFpSCxNQUFNa1gsSUFSVjs7QUFVQSxXQUFPO0FBQ0h4ZCxhQURHO0FBRUhKLHFCQUZHO0FBR0g4ZCx1QkFIRztBQUlIelcsd0JBSkc7QUFLSCtXLDJCQUxHO0FBTUhDLHdCQU5HO0FBT0g1ZTtBQVBHLEtBQVA7QUFTSCxDQXBCRDs7QUFzQkEsTUFBTWllLHFCQUFzQnBlLFFBQUQsSUFBYztBQUNyQyxXQUFPO0FBQ0hILGlCQUFTLENBQUNDLE1BQUQsRUFBU0MsRUFBVCxLQUFnQkMsU0FBUyxvQkFBUUYsTUFBUixFQUFnQkMsRUFBaEIsQ0FBVDtBQUR0QixLQUFQO0FBR0gsQ0FKRDs7a0JBT2UseUJBQVFvZSxlQUFSLEVBQXlCQyxrQkFBekIsRUFBNkNTLFNBQTdDLEM7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3REZjs7OztBQUNBOztBQUVBOztBQUVBOzs7Ozs7QUFHQSxNQUFNRyxXQUFOLFNBQTBCLGdCQUFNdlksU0FBaEMsQ0FBMEM7QUFDdENDLGdCQUFZQyxLQUFaLEVBQW1CO0FBQ2YsY0FBTUEsS0FBTjtBQUNIOztBQUVESyxhQUFTOztBQUVMLGVBQ0ksK0NBQXFCLEtBQUtMLEtBQTFCLENBREo7QUFHSDtBQVZxQzs7QUFhMUMsTUFBTXdYLGtCQUFtQi9XLEtBQUQsSUFBVztBQUMvQixVQUFNbUcsT0FBT25HLE1BQU1tRyxJQUFuQjs7QUFFQSxXQUFPO0FBQ0hBO0FBREcsS0FBUDtBQUdILENBTkQ7O0FBUUEsTUFBTTZRLHFCQUFzQnBlLFFBQUQsSUFBYztBQUNyQyxXQUFPO0FBQ0hlLHdCQUFpQixNQUFNZixTQUFTLDRCQUFUO0FBRHBCLEtBQVA7QUFHSCxDQUpEOztrQkFPZSx5QkFBUW1lLGVBQVIsRUFBeUJDLGtCQUF6QixFQUE2Q1ksV0FBN0MsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDcENmOzs7O0FBQ0E7O0FBRUE7O0FBRUE7Ozs7OztBQUdBLE1BQU1DLFdBQU4sU0FBMEIsZ0JBQU14WSxTQUFoQyxDQUEwQztBQUN0Q0MsZ0JBQVlDLEtBQVosRUFBbUI7QUFDZixjQUFNQSxLQUFOO0FBQ0g7O0FBRURLLGFBQVM7O0FBRUwsZUFDSSwrQ0FBcUIsS0FBS0wsS0FBMUIsQ0FESjtBQUdIO0FBVnFDOztBQWExQyxNQUFNd1gsa0JBQW1CL1csS0FBRCxJQUFXO0FBQy9CLFVBQU1tRyxPQUFPbkcsTUFBTW1HLElBQW5COztBQUVBLFdBQU87QUFDSEE7QUFERyxLQUFQO0FBR0gsQ0FORDs7QUFRQSxNQUFNNlEscUJBQXNCcGUsUUFBRCxJQUFjO0FBQ3JDLFdBQU87QUFDSGtCLGlDQUEwQixNQUFNbEIsU0FBUyxxQ0FBVDtBQUQ3QixLQUFQO0FBR0gsQ0FKRDs7a0JBT2UseUJBQVFtZSxlQUFSLEVBQXlCQyxrQkFBekIsRUFBNkNhLFdBQTdDLEM7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3BDZjs7OztBQUNBOztBQUVBOztBQUVBOzs7Ozs7QUFHQSxNQUFNQyxVQUFOLFNBQXlCLGdCQUFNelksU0FBL0IsQ0FBeUM7QUFDckNDLGdCQUFZQyxLQUFaLEVBQW1CO0FBQ2YsY0FBTUEsS0FBTjtBQUNIOztBQU1ESyxhQUFTOztBQUVMLGVBQ0ksb0RBQW9CLEtBQUtMLEtBQXpCLENBREo7QUFHSDtBQWRvQzs7QUFBbkN1WSxVLENBS0s5VyxZLEdBQWU7QUFDbEJDLFlBQVEsTUFBTTtBQURJLEM7QUFZMUIsTUFBTThWLGtCQUFtQi9XLEtBQUQsSUFBVztBQUMvQixVQUFNbUcsT0FBT25HLE1BQU1tRyxJQUFuQjs7QUFFQSxXQUFPO0FBQ0hBO0FBREcsS0FBUDtBQUdILENBTkQ7O0FBUUEsTUFBTTZRLHFCQUFzQnBlLFFBQUQsSUFBYztBQUNyQyxXQUFPLEVBQVA7QUFHSCxDQUpEOztrQkFPZSx5QkFBUW1lLGVBQVIsRUFBeUJDLGtCQUF6QixFQUE2Q2MsVUFBN0MsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDeENmOzs7O0FBQ0E7O0FBRUE7O0FBRUE7Ozs7OztBQUVBLE1BQU1DLGNBQU4sU0FBNkIsZ0JBQU0xWSxTQUFuQyxDQUE2QztBQUN6Q0MsZ0JBQVlDLEtBQVosRUFBbUI7QUFDZixjQUFNQSxLQUFOO0FBQ0g7O0FBTURLLGFBQVM7O0FBRUwsZUFDSSwrQ0FBd0IsS0FBS0wsS0FBN0IsQ0FESjtBQUdIO0FBZHdDOztBQUF2Q3dZLGMsQ0FLSy9XLFksR0FBZTtBQUNsQkMsWUFBUSxNQUFNO0FBREksQztBQVkxQixNQUFNOFYsa0JBQW1CL1csS0FBRCxJQUFXOztBQUUvQixVQUFNO0FBQ0Y1RjtBQURFLFFBRUY0RixNQUFNekQsb0JBRlY7O0FBSUEsUUFBSTRNLE9BQU9uSixNQUFNbUosSUFBakI7O0FBRUEsV0FBTztBQUNIL08seUJBREc7QUFFSCtPO0FBRkcsS0FBUDtBQUlILENBWkQ7O0FBY0EsTUFBTTZOLHFCQUFzQnBlLFFBQUQsSUFBYztBQUNyQyxXQUFPO0FBQ0grQyxvQkFBYUMsS0FBRCxJQUFXaEQsU0FBUyx1QkFBV2dELEtBQVgsQ0FBVDtBQURwQixLQUFQO0FBR0gsQ0FKRDs7a0JBTWUseUJBQVFtYixlQUFSLEVBQXlCQyxrQkFBekIsRUFBNkNlLGNBQTdDLEM7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzVDZjs7OztBQUNBOztBQUVBOztBQUVBOzs7Ozs7QUFFQSxNQUFNQyxHQUFOLFNBQWtCLGdCQUFNM1ksU0FBeEIsQ0FBa0M7QUFDOUJDLGdCQUFZQyxLQUFaLEVBQW1CO0FBQ2YsY0FBTUEsS0FBTjtBQUNIOztBQUVELFdBQU8wWSxRQUFQLENBQWdCQyxLQUFoQixFQUF1QnpYLEtBQXZCLEVBQTZCO0FBQ3pCLGVBQU95WCxNQUFNdGYsUUFBTixDQUFlLHVCQUFXNkgsTUFBTXlGLE1BQU4sQ0FBYXZMLEVBQXhCLENBQWYsQ0FBUDtBQUNIOztBQU1EMEgsd0JBQW9CO0FBQ2hCLGFBQUs5QyxLQUFMLENBQVc1RCxVQUFYLENBQXNCLEtBQUs0RCxLQUFMLENBQVdrQixLQUFYLENBQWlCeUYsTUFBakIsQ0FBd0J2TCxFQUE5QztBQUNIOztBQUVEaUYsYUFBUzs7QUFFTCxlQUNJLCtDQUFhLEtBQUtMLEtBQWxCLENBREo7QUFHSDtBQXRCNkI7O0FBQTVCeVksRyxDQVNLaFgsWSxHQUFlO0FBQ2xCQyxZQUFRLE1BQU07QUFESSxDO0FBZ0IxQixNQUFNOFYsa0JBQW1CL1csS0FBRCxJQUFXOztBQUUvQixVQUFNO0FBQ0ZsRix3QkFERTtBQUVGVix5QkFGRTtBQUdGSCxzQkFIRTtBQUlGd1M7QUFKRSxRQUtGek0sTUFBTXpELG9CQUxWOztBQU9BLFFBQUk0TSxPQUFPbkosTUFBTW1KLElBQWpCOztBQUVBLFdBQU87QUFDSC9PLHlCQURHO0FBRUgrTztBQUZHLEtBQVA7QUFJSCxDQWZEOztBQWlCQSxNQUFNNk4scUJBQXNCcGUsUUFBRCxJQUFjO0FBQ3JDLFdBQU87QUFDSCtDLG9CQUFhQyxLQUFELElBQVdoRCxTQUFTLHVCQUFXZ0QsS0FBWCxDQUFUO0FBRHBCLEtBQVA7QUFHSCxDQUpEOztrQkFPZSx5QkFBUW1iLGVBQVIsRUFBeUJDLGtCQUF6QixFQUE2Q2dCLEdBQTdDLEM7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3hEZjs7OztBQUNBOztBQUVBOztBQUVBOzs7Ozs7QUFFQSxNQUFNdkUsY0FBTixTQUE2QixnQkFBTXBVLFNBQW5DLENBQTZDO0FBQ3pDQyxnQkFBWUMsS0FBWixFQUFtQjtBQUNmLGNBQU1BLEtBQU47QUFDSDs7QUFFREssYUFBUzs7QUFFTCxlQUNJLCtDQUF3QixLQUFLTCxLQUE3QixDQURKO0FBR0g7QUFWd0M7O0FBYTdDLE1BQU13WCxrQkFBbUIvVyxLQUFELElBQVc7O0FBRS9CLFFBQUltSixPQUFPbkosTUFBTW1KLElBQWpCOztBQUVBLFdBQU87QUFDSEE7QUFERyxLQUFQO0FBR0gsQ0FQRDs7QUFTQSxNQUFNNk4scUJBQXNCcGUsUUFBRCxJQUFjO0FBQ3JDLFdBQU87QUFDSCtDLG9CQUFhLENBQUNDLEtBQUQsRUFBUXpCLE9BQVIsS0FBb0J2QixTQUFTLHVCQUFXZ0QsS0FBWCxFQUFrQnpCLE9BQWxCLENBQVQ7QUFEOUIsS0FBUDtBQUdILENBSkQ7O2tCQU9lLHlCQUFRNGMsZUFBUixFQUF5QkMsa0JBQXpCLEVBQTZDdkQsY0FBN0MsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDcENmOzs7O0FBQ0E7O0FBRUE7O0FBQ0E7Ozs7OztBQUVBLE1BQU0wRSxjQUFOLFNBQTZCLGdCQUFNOVksU0FBbkMsQ0FBNkM7QUFDekNDLGdCQUFZQyxLQUFaLEVBQW1CO0FBQ2YsY0FBTUEsS0FBTjtBQUNIOztBQUVELFdBQU8wWSxRQUFQLENBQWdCQyxLQUFoQixFQUFzQjtBQUNsQixlQUFPQSxNQUFNdGYsUUFBTixDQUFlLG9DQUFmLENBQVA7QUFDSDs7QUFFRHlKLHdCQUFvQjtBQUNoQixhQUFLOUMsS0FBTCxDQUFXdEQsc0JBQVg7QUFDSDs7QUFNRDJELGFBQVM7QUFDTCxlQUNJLCtDQUF3QixLQUFLTCxLQUE3QixDQURKO0FBR0g7QUFyQndDOztBQUF2QzRZLGMsQ0FhS25YLFksR0FBZTtBQUNsQkMsWUFBUSxNQUFNO0FBREksQztBQVcxQixNQUFNOFYsa0JBQW1CL1csS0FBRCxJQUFXOztBQUUvQixVQUFNO0FBQ0Z5TSxrQ0FERTtBQUVGQyxvQkFGRTtBQUdGQyx5QkFIRTtBQUlGQyxzQkFKRTtBQUtGeFMseUJBTEU7QUFNRlUsd0JBTkU7QUFPRmI7QUFQRSxRQVFGK0YsTUFBTXpELG9CQVJWOztBQVVBLFdBQU87QUFDSGtRLGtDQURHO0FBRUhDLG9CQUZHO0FBR0hDLHlCQUhHO0FBSUhDLHNCQUpHO0FBS0h4Uyx5QkFMRztBQU1IVSx3QkFORztBQU9IYjtBQVBHLEtBQVA7QUFTSCxDQXJCRDs7QUF1QkEsTUFBTStjLHFCQUFzQnBlLFFBQUQsSUFBYztBQUNyQyxXQUFPO0FBQ0hxRCxnQ0FBd0IsTUFBTXJELFNBQVMsb0NBQVQsQ0FEM0I7QUFFSHNELGlDQUF5QixDQUFDckQsSUFBRCxFQUFPc0QsUUFBUCxLQUFvQnZELFNBQVMsb0NBQXdCQyxJQUF4QixFQUE4QnNELFFBQTlCLENBQVQsQ0FGMUM7QUFHSEMscUNBQTZCLENBQUNDLFlBQUQsRUFBZVAsUUFBZixLQUE0QmxELFNBQVMsd0NBQTRCeUQsWUFBNUIsRUFBMENQLFFBQTFDLENBQVQ7QUFIdEQsS0FBUDtBQUtILENBTkQ7O2tCQVNlLHlCQUFRaWIsZUFBUixFQUF5QkMsa0JBQXpCLEVBQTZDbUIsY0FBN0MsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDOURmOzs7O0FBQ0E7O0FBRUE7O0FBRUE7Ozs7OztBQUVBLE1BQU1DLGFBQU4sU0FBNEIsZ0JBQU0vWSxTQUFsQyxDQUE0QztBQUN4Q0MsZ0JBQVlDLEtBQVosRUFBbUI7QUFDZixjQUFNQSxLQUFOO0FBQ0EsYUFBS1MsS0FBTCxHQUFhLEVBQWI7QUFHSDs7QUFNREosYUFBUzs7QUFFTCxlQUNJLCtDQUF1QixLQUFLTCxLQUE1QixDQURKO0FBR0g7QUFqQnVDOztBQUF0QzZZLGEsQ0FRS3BYLFksR0FBZTtBQUNsQkMsWUFBUSxNQUFNO0FBREksQztBQVkxQixNQUFNOFYsa0JBQW1CL1csS0FBRCxJQUFXO0FBQy9CLFVBQU07QUFDRmxGLHdCQURFO0FBRUZWLHlCQUZFO0FBR0ZILHNCQUhFO0FBSUZ3UztBQUpFLFFBS0Z6TSxNQUFNekQsb0JBTFY7O0FBT0EsVUFBTTRNLE9BQU9uSixNQUFNbUosSUFBbkI7QUFDQSxVQUFNLEVBQUVpRSxPQUFGLEVBQVdGLGtCQUFYLEtBQWtDbE4sTUFBTXlXLFVBQTlDOztBQUVBLFdBQU87QUFDSDNiLHdCQURHO0FBRUhWLHlCQUZHO0FBR0hILHNCQUhHO0FBSUh3UyxrQ0FKRztBQUtIdEQsWUFMRztBQU1IaUUsZUFORyxFQU1NRjtBQU5OLEtBQVA7QUFTSCxDQXBCRDs7QUFzQkEsTUFBTThKLHFCQUFzQnBlLFFBQUQsSUFBYztBQUNyQyxXQUFPO0FBQ0htQixpQkFBUyxDQUFDQyxXQUFELEVBQWNDLGNBQWQsRUFBOEJDLFVBQTlCLEtBQTZDdEIsU0FBUyxvQkFBUW9CLFdBQVIsRUFBcUJDLGNBQXJCLEVBQXFDQyxVQUFyQyxDQUFULENBRG5EO0FBRUhnQyxpQ0FBeUIsQ0FBQ3JELElBQUQsRUFBT3NELFFBQVAsS0FBb0J2RCxTQUFTLG9DQUF3QkMsSUFBeEIsRUFBOEJzRCxRQUE5QixDQUFULENBRjFDO0FBR0hDLHFDQUE2QixDQUFDQyxZQUFELEVBQWVQLFFBQWYsS0FBNEJsRCxTQUFTLHdDQUE0QnlELFlBQTVCLEVBQTBDUCxRQUExQyxDQUFUO0FBSHRELEtBQVA7QUFLSCxDQU5EOztrQkFRZSx5QkFBUWliLGVBQVIsRUFBeUJDLGtCQUF6QixFQUE2Q29CLGFBQTdDLEM7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3pEZjs7OztBQUNBOztBQUVBOztBQUVBOzs7Ozs7QUFFQSxNQUFNQyxZQUFOLFNBQTJCLGdCQUFNaFosU0FBakMsQ0FBMkM7QUFDdkNDLGdCQUFZQyxLQUFaLEVBQW1CO0FBQ2YsY0FBTUEsS0FBTjtBQUNIOztBQU1ESyxhQUFTOztBQUVMLGVBQ0ksc0RBQXNCLEtBQUtMLEtBQTNCLENBREo7QUFHSDtBQWRzQzs7QUFBckM4WSxZLENBS0tyWCxZLEdBQWU7QUFDbEJDLFlBQVEsTUFBTTtBQURJLEM7QUFZMUIsTUFBTThWLGtCQUFtQi9XLEtBQUQsSUFBVzs7QUFFL0IsVUFBTTtBQUNGbEYsd0JBREU7QUFFRlYseUJBRkU7QUFHRkgsc0JBSEU7QUFJRndTO0FBSkUsUUFLRnpNLE1BQU16RCxvQkFMVjs7QUFPQSxRQUFJNE0sT0FBT25KLE1BQU1tSixJQUFqQjs7QUFFQSxXQUFPO0FBQ0gvTyx5QkFERztBQUVIK087QUFGRyxLQUFQO0FBSUgsQ0FmRDs7QUFpQkEsTUFBTTZOLHFCQUFzQnBlLFFBQUQsSUFBYztBQUNyQyxXQUFPO0FBQ0hzRCxpQ0FBeUIsQ0FBQ3JELElBQUQsRUFBT3NELFFBQVAsS0FBb0J2RCxTQUFTLG9DQUF3QkMsSUFBeEIsRUFBOEJzRCxRQUE5QixDQUFULENBRDFDO0FBRUhSLG9CQUFhQyxLQUFELElBQVdoRCxTQUFTLHVCQUFXZ0QsS0FBWCxDQUFUO0FBRnBCLEtBQVA7QUFJSCxDQUxEOztrQkFRZSx5QkFBUW1iLGVBQVIsRUFBeUJDLGtCQUF6QixFQUE2Q3FCLFlBQTdDLEM7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2pEZjs7OztBQUNBOztBQUVBOztBQUVBOzs7Ozs7QUFFQSxNQUFNNUosZUFBTixTQUE4QixnQkFBTXBQLFNBQXBDLENBQThDO0FBQzFDQyxnQkFBWUMsS0FBWixFQUFtQjtBQUNmLGNBQU1BLEtBQU47QUFDSDs7QUFFRCxXQUFPMFksUUFBUCxDQUFnQkMsS0FBaEIsRUFBdUJ6WCxLQUF2QixFQUE4QjtBQUMxQixlQUFPeVgsTUFBTXRmLFFBQU4sQ0FBZSwwQkFBYzZILE1BQU15RixNQUFOLENBQWF2TCxFQUEzQixDQUFmLENBQVA7QUFDSDs7QUFNRDBILHdCQUFvQjtBQUNoQixhQUFLOUMsS0FBTCxDQUFXOUIsYUFBWCxDQUF5QixLQUFLOEIsS0FBTCxDQUFXa0IsS0FBWCxDQUFpQnlGLE1BQWpCLENBQXdCdkwsRUFBakQ7QUFDSDs7QUFFRGlGLGFBQVM7O0FBRUwsZUFDSSwrQ0FBeUIsS0FBS0wsS0FBOUIsQ0FESjtBQUdIO0FBdEJ5Qzs7QUFBeENrUCxlLENBU0t6TixZLEdBQWU7QUFDbEJDLFlBQVEsTUFBTTtBQURJLEM7QUFnQjFCLE1BQU04VixrQkFBbUIvVyxLQUFELElBQVc7O0FBRS9CLFFBQUk2TyxVQUFVN08sTUFBTTZPLE9BQXBCOztBQUVBLFdBQU87QUFDSEE7QUFERyxLQUFQO0FBR0gsQ0FQRDs7QUFTQSxNQUFNbUkscUJBQXNCcGUsUUFBRCxJQUFjO0FBQ3JDLFdBQU87QUFDSDZFLHVCQUFnQkMsUUFBRCxJQUFjOUUsU0FBUywwQkFBYzhFLFFBQWQsQ0FBVCxDQUQxQjtBQUVIQyxzQkFBYyxDQUFDRCxRQUFELEVBQVdFLFFBQVgsRUFBcUI5QixRQUFyQixLQUFrQ2xELFNBQVMseUJBQWE4RSxRQUFiLEVBQXVCRSxRQUF2QixFQUFpQzlCLFFBQWpDLENBQVQ7QUFGN0MsS0FBUDtBQUlILENBTEQ7O2tCQVFlLHlCQUFRaWIsZUFBUixFQUF5QkMsa0JBQXpCLEVBQTZDdkksZUFBN0MsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDakRmOzs7O0FBQ0E7O0FBRUE7O0FBRUE7Ozs7OztBQUVBLE1BQU02SixPQUFOLFNBQXNCLGdCQUFNalosU0FBNUIsQ0FBc0M7QUFDbENDLGdCQUFZQyxLQUFaLEVBQW1CO0FBQ2YsY0FBTUEsS0FBTjtBQUNIOztBQUVESyxhQUFTOztBQUVMLGVBQ0kscURBQWlCLEtBQUtMLEtBQXRCLENBREo7QUFHSDtBQVZpQzs7QUFhdEMsTUFBTXdYLGtCQUFtQi9XLEtBQUQsSUFBVzs7QUFFL0IsV0FBTyxFQUFQO0FBR0gsQ0FMRDs7QUFPQSxNQUFNZ1gscUJBQXNCcGUsUUFBRCxJQUFjO0FBQ3JDLFdBQU8sRUFBUDtBQUdILENBSkQ7O2tCQU9lLHlCQUFRbWUsZUFBUixFQUF5QkMsa0JBQXpCLEVBQTZDc0IsT0FBN0MsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbENmOzs7O0FBQ0E7O0FBRUE7O0FBRUE7Ozs7OztBQUVBLE1BQU1DLFVBQU4sU0FBeUIsZ0JBQU1sWixTQUEvQixDQUF5QztBQUNyQ0MsZ0JBQVlDLEtBQVosRUFBbUI7QUFDZixjQUFNQSxLQUFOO0FBQ0g7O0FBRURLLGFBQVM7O0FBRUwsZUFDSSwrQ0FBb0IsS0FBS0wsS0FBekIsQ0FESjtBQUdIO0FBVm9DOztBQWF6QyxNQUFNd1gsa0JBQW1CL1csS0FBRCxJQUFXOztBQUUvQixRQUFJNk8sVUFBVTdPLE1BQU02TyxPQUFwQjs7QUFFQSxXQUFPO0FBQ0hBO0FBREcsS0FBUDtBQUdILENBUEQ7O0FBU0EsTUFBTW1JLHFCQUFzQnBlLFFBQUQsSUFBYztBQUNyQyxXQUFPO0FBQ0g2RSx1QkFBaUJDLFFBQUQsSUFBYzlFLFNBQVMsMEJBQWM4RSxRQUFkLENBQVQ7QUFEM0IsS0FBUDtBQUdILENBSkQ7O2tCQU9lLHlCQUFRcVosZUFBUixFQUF5QkMsa0JBQXpCLEVBQTZDdUIsVUFBN0MsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDcENmOzs7O0FBQ0E7O0FBRUE7O0FBQ0E7Ozs7OztBQUVBLE1BQU1DLGNBQU4sU0FBNkIsZ0JBQU1uWixTQUFuQyxDQUE2QztBQUN6Q0MsZ0JBQVlDLEtBQVosRUFBbUI7QUFDZixjQUFNQSxLQUFOO0FBQ0g7O0FBRURLLGFBQVM7O0FBRUwsZUFDSSwrQ0FDUyxLQUFLTCxLQURkLENBREo7QUFLSDtBQVp3Qzs7QUFlN0MsTUFBTXdYLGtCQUFtQi9XLEtBQUQsSUFBVzs7QUFFL0IsV0FBTyxFQUFQO0FBR0gsQ0FMRDs7QUFPQSxNQUFNZ1gscUJBQXNCcGUsUUFBRCxJQUFjO0FBQ3JDLFdBQU87QUFDSDZYLDRCQUFxQixDQUFDcFUsWUFBRCxFQUFjMUQsRUFBZCxLQUFxQkMsU0FBUywrQkFBbUJ5RCxZQUFuQixFQUFnQzFELEVBQWhDLENBQVQsQ0FEdkM7QUFFSGdZLHdCQUFrQnhVLFFBQUQsSUFBY3ZELFNBQVMsMkJBQWV1RCxRQUFmLENBQVQ7QUFGNUIsS0FBUDtBQUlILENBTEQ7O2tCQVFlLHlCQUFRNGEsZUFBUixFQUF5QkMsa0JBQXpCLEVBQTZDd0IsY0FBN0MsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDcENmOzs7O0FBQ0E7O0FBRUE7O0FBRUE7Ozs7OztBQUVBLE1BQU1DLGFBQU4sU0FBNEIsZ0JBQU1wWixTQUFsQyxDQUE0QztBQUN4Q0MsZ0JBQVlDLEtBQVosRUFBbUI7QUFDZixjQUFNQSxLQUFOO0FBQ0g7O0FBRUQsV0FBTzBZLFFBQVAsQ0FBZ0JDLEtBQWhCLEVBQXVCelgsS0FBdkIsRUFBOEI7QUFDMUIsZUFBT3lYLE1BQU10ZixRQUFOLENBQWUsMEJBQWM2SCxNQUFNeUYsTUFBTixDQUFhdkwsRUFBM0IsQ0FBZixDQUFQO0FBQ0g7O0FBTUQwSCx3QkFBb0I7QUFDaEIsYUFBSzlDLEtBQUwsQ0FBVzlCLGFBQVgsQ0FBeUIsS0FBSzhCLEtBQUwsQ0FBV2tCLEtBQVgsQ0FBaUJ5RixNQUFqQixDQUF3QnZMLEVBQWpEO0FBQ0g7O0FBRURpRixhQUFTOztBQUVMLGVBQ0ksK0NBQXVCLEtBQUtMLEtBQTVCLENBREo7QUFHSDtBQXRCdUM7O0FBQXRDa1osYSxDQVNLelgsWSxHQUFlO0FBQ2xCQyxZQUFRLE1BQU07QUFESSxDO0FBZ0IxQixNQUFNOFYsa0JBQW1CL1csS0FBRCxJQUFXOztBQUUvQixRQUFJNk8sVUFBVTdPLE1BQU02TyxPQUFwQjs7QUFFQSxXQUFPO0FBQ0hBO0FBREcsS0FBUDtBQUdILENBUEQ7O0FBU0EsTUFBTW1JLHFCQUFzQnBlLFFBQUQsSUFBYztBQUNyQyxXQUFPO0FBQ0g2RSx1QkFBZ0JDLFFBQUQsSUFBYzlFLFNBQVMsMEJBQWM4RSxRQUFkLENBQVQ7QUFEMUIsS0FBUDtBQUdILENBSkQ7O2tCQU9lLHlCQUFRcVosZUFBUixFQUF5QkMsa0JBQXpCLEVBQTZDeUIsYUFBN0MsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDaERmOzs7O0FBQ0E7O0FBRUE7O0FBQ0E7Ozs7OztBQUVBLE1BQU1wSCxjQUFOLFNBQTZCLGdCQUFNaFMsU0FBbkMsQ0FBNkM7QUFDekNDLGdCQUFZQyxLQUFaLEVBQW1CO0FBQ2YsY0FBTUEsS0FBTjtBQUNIOztBQU1ESyxhQUFTOztBQUVMLGVBQ0ksK0NBQXdCLEtBQUtMLEtBQTdCLENBREo7QUFHSDtBQWR3Qzs7QUFBdkM4UixjLENBS0tyUSxZLEdBQWU7QUFDbEJDLFlBQVEsTUFBTTtBQURJLEM7QUFZMUIsTUFBTThWLGtCQUFtQi9XLEtBQUQsSUFBVztBQUMvQixVQUFNO0FBQ0ZsRjtBQURFLFFBRUZrRixNQUFNMUQsbUJBRlY7O0FBSUEsV0FBTztBQUNIeEI7QUFERyxLQUFQO0FBR0gsQ0FSRDs7QUFVQSxNQUFNa2MscUJBQXNCcGUsUUFBRCxJQUFjO0FBQ3JDLFdBQU87QUFDSG1GLHdCQUFpQi9DLFFBQUQsSUFBY3BDLFNBQVMsMkJBQWVvQyxRQUFmLENBQVQ7QUFEM0IsS0FBUDtBQUdILENBSkQ7O2tCQU9lLHlCQUFRK2IsZUFBUixFQUF5QkMsa0JBQXpCLEVBQTZDM0YsY0FBN0MsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDeENmOzs7O0FBQ0E7O0FBRUE7O0FBRUE7Ozs7OztBQUVBLE1BQU1vQyxjQUFOLFNBQTZCLGdCQUFNcFUsU0FBbkMsQ0FBNkM7QUFDekNDLGdCQUFZQyxLQUFaLEVBQW1CO0FBQ2YsY0FBTUEsS0FBTjtBQUNIOztBQUVESyxhQUFTOztBQUVMLGVBQ0ksK0NBQXdCLEtBQUtMLEtBQTdCLENBREo7QUFHSDtBQVZ3Qzs7QUFhN0MsTUFBTXdYLGtCQUFtQi9XLEtBQUQsSUFBVzs7QUFFL0IsUUFBSTZPLFVBQVU3TyxNQUFNNk8sT0FBcEI7O0FBRUEsV0FBTztBQUNIQTtBQURHLEtBQVA7QUFHSCxDQVBEOztBQVNBLE1BQU1tSSxxQkFBc0JwZSxRQUFELElBQWM7QUFDckMsV0FBTztBQUNINkUsdUJBQWlCQyxRQUFELElBQWM5RSxTQUFTLDBCQUFjOEUsUUFBZCxDQUFUO0FBRDNCLEtBQVA7QUFHSCxDQUpEOztrQkFPZSx5QkFBUXFaLGVBQVIsRUFBeUJDLGtCQUF6QixFQUE2Q3ZELGNBQTdDLEM7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3BDZjs7OztBQUNBOztBQUVBOztBQUVBOzs7Ozs7QUFFQSxNQUFNaUYsT0FBTixTQUFzQixnQkFBTXJaLFNBQTVCLENBQXNDO0FBQ2xDQyxnQkFBWUMsS0FBWixFQUFtQjtBQUNmLGNBQU1BLEtBQU47QUFDSDs7QUFFREssYUFBUzs7QUFFTCxlQUNJLHFEQUFpQixLQUFLTCxLQUF0QixDQURKO0FBR0g7QUFWaUM7O0FBYXRDLE1BQU13WCxrQkFBbUIvVyxLQUFELElBQVc7O0FBRS9CLFdBQU8sRUFBUDtBQUdILENBTEQ7O0FBT0EsTUFBTWdYLHFCQUFzQnBlLFFBQUQsSUFBYztBQUNyQyxXQUFPLEVBQVA7QUFHSCxDQUpEOztrQkFPZSx5QkFBUW1lLGVBQVIsRUFBeUJDLGtCQUF6QixFQUE2QzBCLE9BQTdDLEM7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2xDZjs7OztBQUNBOztBQUVBOztBQUNBOzs7Ozs7QUFFQSxNQUFNUCxjQUFOLFNBQTZCLGdCQUFNOVksU0FBbkMsQ0FBNkM7QUFDekNDLGdCQUFZQyxLQUFaLEVBQW1CO0FBQ2YsY0FBTUEsS0FBTjtBQUNIOztBQUVELFdBQU8wWSxRQUFQLENBQWdCQyxLQUFoQixFQUF1QjtBQUNuQixlQUFPQSxNQUFNdGYsUUFBTixDQUFlLG1DQUFmLENBQVA7QUFDSDs7QUFFRHlKLHdCQUFvQjtBQUNoQixhQUFLOUMsS0FBTCxDQUFXMUIscUJBQVg7QUFDSDs7QUFNRCtCLGFBQVM7O0FBRUwsZUFDSSwrQ0FBd0IsS0FBS0wsS0FBN0IsQ0FESjtBQUdIO0FBdEJ3Qzs7QUFBdkM0WSxjLENBYUtuWCxZLEdBQWU7QUFDbEJDLFlBQVEsTUFBTTtBQURJLEM7QUFZMUIsTUFBTThWLGtCQUFtQi9XLEtBQUQsSUFBVzs7QUFFL0IsVUFBTTtBQUNGMlQsa0NBREU7QUFFRkUsdUJBRkU7QUFHRkQsa0JBSEU7QUFJRnhaLHlCQUpFO0FBS0ZVLHdCQUxFO0FBTUZiO0FBTkUsUUFPRitGLE1BQU0xRCxtQkFQVjs7QUFTQSxXQUFPO0FBQ0hxWCxrQ0FERztBQUVIRSx1QkFGRztBQUdIRCxrQkFIRztBQUlIeFoseUJBSkc7QUFLSFUsd0JBTEc7QUFNSGI7QUFORyxLQUFQO0FBUUgsQ0FuQkQ7O0FBcUJBLE1BQU0rYyxxQkFBc0JwZSxRQUFELElBQWM7QUFDckMsV0FBTztBQUNIaUYsK0JBQXVCLE1BQU1qRixTQUFTLG1DQUFULENBRDFCO0FBRUhrRiwyQkFBbUIsQ0FBQ2pGLElBQUQsRUFBT3NELFFBQVAsS0FBb0J2RCxTQUFTLDhCQUFrQkMsSUFBbEIsRUFBd0JzRCxRQUF4QixDQUFULENBRnBDO0FBR0g2QiwrQkFBdUIsQ0FBQzNCLFlBQUQsRUFBZVAsUUFBZixLQUE0QmxELFNBQVMsa0NBQXNCeUQsWUFBdEIsRUFBb0NQLFFBQXBDLENBQVQ7QUFIaEQsS0FBUDtBQUtILENBTkQ7O2tCQVNlLHlCQUFRaWIsZUFBUixFQUF5QkMsa0JBQXpCLEVBQTZDbUIsY0FBN0MsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDN0RmOzs7O0FBQ0E7O0FBRUE7O0FBRUE7Ozs7OztBQUVBLE1BQU1DLGFBQU4sU0FBNEIsZ0JBQU0vWSxTQUFsQyxDQUE0QztBQUN4Q0MsZ0JBQVlDLEtBQVosRUFBbUI7QUFDZixjQUFNQSxLQUFOO0FBQ0EsYUFBS1MsS0FBTCxHQUFhLEVBQWI7QUFHSDs7QUFNREosYUFBUzs7QUFFTCxlQUNJLCtDQUF1QixLQUFLTCxLQUE1QixDQURKO0FBR0g7QUFqQnVDOztBQUF0QzZZLGEsQ0FRS3BYLFksR0FBZTtBQUNsQkMsWUFBUSxNQUFNO0FBREksQztBQVkxQixNQUFNOFYsa0JBQW1CL1csS0FBRCxJQUFXOztBQUUvQixVQUFNO0FBQ0YyVCxrQ0FERTtBQUVGdloseUJBRkU7QUFHRlUsd0JBSEU7QUFJRmI7QUFKRSxRQUtGK0YsTUFBTTFELG1CQUxWOztBQU9BLFFBQUl1UyxVQUFVN08sTUFBTTZPLE9BQXBCO0FBQ0EsUUFBSSxFQUFFcUYsVUFBRixFQUFjRixvQkFBZCxLQUF1Q2hVLE1BQU04VixhQUFqRDs7QUFFQSxXQUFPO0FBQ0hqSCxlQURHLEVBQ01xRixVQUROLEVBQ2tCRixvQkFEbEI7QUFFSEwsa0NBRkc7QUFHSHZaLHlCQUhHO0FBSUhVLHdCQUpHO0FBS0hiO0FBTEcsS0FBUDtBQU9ILENBbkJEOztBQXFCQSxNQUFNK2MscUJBQXNCcGUsUUFBRCxJQUFjO0FBQ3JDLFdBQU87QUFDSGlGLCtCQUF1QixNQUFNakYsU0FBU2lGLHVCQUFULENBRDFCO0FBRUhDLDJCQUFtQixDQUFDakYsSUFBRCxFQUFPc0QsUUFBUCxLQUFvQnZELFNBQVMsOEJBQWtCQyxJQUFsQixFQUF3QnNELFFBQXhCLENBQVQsQ0FGcEM7QUFHSGEsb0JBQVksQ0FBQ2hELFdBQUQsRUFBY0MsY0FBZCxFQUE4QkMsVUFBOUIsS0FBNkN0QixTQUFTLHVCQUFXb0IsV0FBWCxFQUF3QkMsY0FBeEIsRUFBd0NDLFVBQXhDLENBQVQ7QUFIdEQsS0FBUDtBQUtILENBTkQ7O2tCQVFlLHlCQUFRNmMsZUFBUixFQUF5QkMsa0JBQXpCLEVBQTZDb0IsYUFBN0MsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDeERmOzs7O0FBQ0E7O0FBRUE7O0FBRUE7Ozs7OztBQUVBLE1BQU0zRCxtQkFBTixTQUFrQyxnQkFBTXBWLFNBQXhDLENBQWtEO0FBQzlDQyxnQkFBWUMsS0FBWixFQUFtQjtBQUNmLGNBQU1BLEtBQU47QUFDSDs7QUFFREssYUFBUzs7QUFFTCxlQUNJLCtDQUE2QixLQUFLTCxLQUFsQyxDQURKO0FBR0g7QUFWNkM7O0FBYWxELE1BQU13WCxrQkFBbUIvVyxLQUFELElBQVc7O0FBRS9CLFVBQU07QUFDRi9GO0FBREUsUUFFRitGLE1BQU0xRCxtQkFGVjs7QUFJQSxXQUFPO0FBQ0hyQztBQURHLEtBQVA7QUFHSCxDQVREOztBQVdBLE1BQU0rYyxxQkFBc0JwZSxRQUFELElBQWM7QUFDckMsV0FBTztBQUNId2MsdUJBQWlCNUksVUFBRCxJQUFnQjVULFNBQVMsMEJBQWM0VCxVQUFkLENBQVQ7QUFEN0IsS0FBUDtBQUdILENBSkQ7O2tCQU9lLHlCQUFRdUssZUFBUixFQUF5QkMsa0JBQXpCLEVBQTZDdkMsbUJBQTdDLEM7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3RDZjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBQSxNQUFNa0UsV0FBVztBQUNiblosZ0JBQWNDLEtBQUQsSUFBVztBQUNwQm1aLGVBQU81ZCxRQUFQLENBQWdCNmQsSUFBaEIsR0FBdUJwWixLQUF2QjtBQUNILEtBSFk7O0FBS2JxWiw2QkFBMkJ2WixLQUFELElBQVc7QUFDakMsWUFBSXdaLHFCQUFxQnhaLE1BQU15WixRQUFOLENBQWU5TyxNQUFmLElBQXlCLENBQXpCLElBQThCM0ssTUFBTTBaLFFBQU4sQ0FBZS9PLE1BQWYsSUFBeUIsQ0FBaEY7O0FBRUEsWUFBRzNLLE1BQU1HLE9BQU4sQ0FBY3daLE1BQWQsS0FBeUIsTUFBekIsSUFBbUNILGtCQUF0QyxFQUF5RDtBQUNyRCxtQkFBTyxJQUFQO0FBQ0g7O0FBRUQsZUFBTyxLQUFQO0FBQ0g7QUFiWSxDQUFqQjs7a0JBZ0JlSixROzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNoQmY7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0FBOzs7Ozs7QUFDQSxNQUFNUSxVQUFVLCtCQUFoQjs7QUFFQSxNQUFNQyxVQUFVO0FBQ1ozZixrQkFBZUMsS0FBRCxJQUFXO0FBQ3JCeWYsZ0JBQVFFLEdBQVIsQ0FBWSxPQUFaLEVBQXFCM2YsS0FBckI7QUFDQSxlQUFPZ0YsUUFBUUMsT0FBUixDQUFnQixJQUFoQixDQUFQO0FBQ0gsS0FKVztBQUtaRixrQkFBYyxNQUFNO0FBQ2hCLGVBQU9DLFFBQVFDLE9BQVIsQ0FBZ0J3YSxRQUFRL04sR0FBUixDQUFZLE9BQVosQ0FBaEIsQ0FBUDtBQUNILEtBUFc7QUFRWmtPLGVBQVcsTUFBTTtBQUNiLGVBQU8sQ0FBQyxDQUFDSCxRQUFRL04sR0FBUixDQUFZLE9BQVosQ0FBVDtBQUNILEtBVlc7QUFXWm1PLGdCQUFZLE1BQU07QUFDZCxlQUFPN2EsUUFBUUMsT0FBUixDQUFnQndhLFFBQVFLLE1BQVIsQ0FBZSxPQUFmLENBQWhCLENBQVA7QUFDSDtBQWJXLENBQWhCOztrQkFnQmVKLE87Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2tCQ0pBLFVBQVVwWixRQUFReVosWUFBbEIsRUFBZ0NQLE1BQWhDLEVBQXdDOztBQUVuRCxZQUFRQSxPQUFPcmdCLElBQWY7QUFDSTtBQUF1QjtBQUNuQixvQkFBSTZnQix3QkFBZ0JELFlBQWhCLENBQUo7O0FBRUFDLHlCQUFTL1ksZ0JBQVQsR0FBNEIsSUFBNUI7QUFDQStZLHlCQUFTM2dCLFdBQVQsR0FBdUJtZ0IsT0FBT3BnQixPQUFQLENBQWVDLFdBQXRDOztBQUVBLHVCQUFPMmdCLFFBQVA7QUFDSDs7QUFFRDtBQUF1QjtBQUNuQixvQkFBSUEsd0JBQWdCMVosS0FBaEIsQ0FBSjtBQUNBMFoseUJBQVMvWSxnQkFBVCxHQUE0QixLQUE1QjtBQUNBK1kseUJBQVNoQyxtQkFBVCxHQUErQixJQUEvQjtBQUNBZ0MseUJBQVMvQixnQkFBVCxHQUE0QixLQUE1QjtBQUNBK0IseUJBQVN0QyxlQUFULEdBQTJCOEIsT0FBT3BnQixPQUFQLENBQWVzZSxlQUExQzs7QUFFQSx1QkFBT3NDLFFBQVA7QUFDSDs7QUFFRDtBQUFvQjtBQUNoQixvQkFBSUEsd0JBQWdCMVosS0FBaEIsQ0FBSjtBQUNBMFoseUJBQVMvWSxnQkFBVCxHQUE0QixLQUE1QjtBQUNBK1kseUJBQVMvQixnQkFBVCxHQUE0QixJQUE1QjtBQUNBK0IseUJBQVNoQyxtQkFBVCxHQUErQixLQUEvQjtBQUNBZ0MseUJBQVNwZ0IsYUFBVCxHQUF5QjRmLE9BQU9wZ0IsT0FBUCxDQUFlUSxhQUF4Qzs7QUFFQSx1QkFBT29nQixRQUFQO0FBQ0g7O0FBRUQ7QUFBeUI7QUFDckIsb0JBQUlBLHdCQUFnQjFaLEtBQWhCLENBQUo7QUFDQTBaLHlCQUFTckMsVUFBVCxHQUFzQixJQUF0QjtBQUNBLHVCQUFPcUMsUUFBUDtBQUNIOztBQUVEO0FBQXlCO0FBQ3JCLG9CQUFJQSx3QkFBZ0IxWixLQUFoQixDQUFKO0FBQ0EwWix5QkFBU3JDLFVBQVQsR0FBc0IsS0FBdEI7QUFDQXFDLHlCQUFTbkMsZUFBVCxHQUEyQixLQUEzQjtBQUNBbUMseUJBQVNwQyxrQkFBVCxHQUE4QixJQUE5QjtBQUNBb0MseUJBQVNoZ0IsS0FBVCxHQUFpQndmLE9BQU9wZ0IsT0FBUCxDQUFlWSxLQUFoQztBQUNBLHVCQUFPZ2dCLFFBQVA7QUFDSDs7QUFFRDtBQUFzQjtBQUNsQixvQkFBSUEsd0JBQWdCMVosS0FBaEIsQ0FBSjtBQUNBMFoseUJBQVNyQyxVQUFULEdBQXNCLEtBQXRCO0FBQ0FxQyx5QkFBU25DLGVBQVQsR0FBMkIsSUFBM0I7QUFDQW1DLHlCQUFTcEMsa0JBQVQsR0FBOEIsS0FBOUI7QUFDQW9DLHlCQUFTcGdCLGFBQVQsR0FBeUI0ZixPQUFPcGdCLE9BQVAsQ0FBZVEsYUFBeEM7QUFDQSx1QkFBT29nQixRQUFQO0FBQ0g7O0FBcERMO0FBdURBLFdBQU8xWixLQUFQO0FBQ0gsQzs7QUF6RUQ7O0FBRUEsTUFBTXlaLGVBQWU7QUFDakIvZixXQUFPLElBRFU7QUFFakJKLG1CQUFlLEVBRkU7QUFHakI4ZCxxQkFBaUIsRUFIQTtBQUlqQnpXLHNCQUFrQixLQUpEO0FBS2pCK1cseUJBQXFCLEtBTEo7QUFNakJDLHNCQUFrQixLQU5EO0FBT2pCNWUsaUJBQWEsRUFQSTtBQVFqQnNlLGdCQUFXLEtBUk07QUFTakJDLHdCQUFtQixLQVRGO0FBVWpCQyxxQkFBZ0I7QUFWQyxDQUFyQixDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztrQkNJZSxVQUFVdlgsUUFBUXlaLFlBQWxCLEVBQWdDUCxNQUFoQyxFQUF3Qzs7QUFFbkQsWUFBUUEsT0FBT3JnQixJQUFmO0FBQ0k7QUFBMkI7QUFDdkIsb0JBQUk2Z0Isd0JBQ0cxWixLQURIO0FBRUFwRywyQ0FBZ0JvRyxNQUFNcEcsUUFBdEI7QUFGQSxrQkFBSjs7QUFLQThmLHlCQUFTOWYsUUFBVCxHQUFvQnNmLE9BQU9wZ0IsT0FBUCxDQUFleUIsTUFBZixDQUFzQixDQUFDb2YsVUFBRCxFQUFhQyxPQUFiLEtBQXlCO0FBQy9ERCwrQkFBV0MsUUFBUXZXLFNBQW5CLElBQWdDdVcsT0FBaEM7QUFDQSwyQkFBT0QsVUFBUDtBQUNILGlCQUhtQixFQUdqQkQsU0FBUzlmLFFBSFEsQ0FBcEI7O0FBS0EsdUJBQU84ZixRQUFQO0FBQ0g7O0FBYkw7QUFnQkEsV0FBTzFaLEtBQVA7QUFDSCxDOztBQXpCRDs7QUFFQSxNQUFNeVosZUFBZTtBQUNqQjdmLGNBQVU7QUFETyxDQUFyQixDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztrQkNJZSxVQUFVb0csUUFBUXlaLFlBQWxCLEVBQWdDUCxNQUFoQyxFQUF3Qzs7QUFFbkQsWUFBUUEsT0FBT3JnQixJQUFmO0FBQ0k7QUFBa0I7QUFDZCxvQkFBSTZnQix3QkFBZ0IxWixLQUFoQixDQUFKOztBQUVBLHVCQUFPa1osT0FBT3BnQixPQUFQLENBQWV5QixNQUFmLENBQXNCLENBQUNzZixNQUFELEVBQVN6USxHQUFULEtBQWlCO0FBQzFDeVEsMkJBQU96USxJQUFJQSxHQUFKLENBQVF6TyxFQUFmLElBQXFCeU8sR0FBckI7QUFDQSwyQkFBT3lRLE1BQVA7QUFDSCxpQkFITSxFQUdMSCxRQUhLLENBQVA7QUFLSDs7QUFUTDtBQVlBLFdBQU8xWixLQUFQO0FBQ0gsQzs7QUFyQkQ7O0FBRUEsTUFBTXlaLGVBQWUsRUFBckIsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7a0JDS2UsVUFBVXpaLFFBQVF5WixZQUFsQixFQUFnQ1AsTUFBaEMsRUFBd0M7O0FBRW5ELFlBQVFBLE9BQU9yZ0IsSUFBZjs7QUFFSTtBQUF1QjtBQUNuQixvQkFBSTZnQix3QkFBZ0IxWixLQUFoQixDQUFKOztBQUVBMFoseUJBQVN4TSxrQkFBVCxHQUE4QixLQUE5Qjs7QUFFQSx1QkFBT3dNLFFBQVA7QUFDSDs7QUFFRDtBQUFpQjtBQUNiLG9CQUFJQSx3QkFBZ0IxWixLQUFoQixDQUFKOztBQUVBMFoseUJBQVN0TSxPQUFULEdBQW1COEwsT0FBT3BnQixPQUFQLENBQWVzSSxHQUFmLENBQW1CZ0ksT0FBT0EsSUFBSUEsR0FBSixDQUFRek8sRUFBbEMsQ0FBbkI7QUFDQStlLHlCQUFTeE0sa0JBQVQsR0FBOEIsSUFBOUI7O0FBRUEsdUJBQU93TSxRQUFQO0FBQ0g7O0FBakJMOztBQXFCQSxXQUFPMVosS0FBUDtBQUNILEM7O0FBL0JEOztBQUVBLE1BQU15WixlQUFlO0FBQ2pCck0sYUFBUyxFQURRO0FBRWpCRix3QkFBb0I7QUFGSCxDQUFyQixDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztrQkNjZSxVQUFVbE4sUUFBUXlaLFlBQWxCLEVBQWdDUCxNQUFoQyxFQUF3Qzs7QUFFbkQsWUFBUUEsT0FBT3JnQixJQUFmO0FBQ0k7QUFBK0I7QUFDM0Isb0JBQUk2Z0Isd0JBQWdCMVosS0FBaEIsQ0FBSjtBQUNBLG9CQUFJa1osT0FBT3BnQixPQUFYLEVBQW9CO0FBQ2hCNGdCLDRDQUFnQkEsUUFBaEIsRUFBNkJSLE9BQU9wZ0IsT0FBcEM7QUFDSDtBQUNENGdCLHlCQUFTak4sMEJBQVQsR0FBc0MsSUFBdEM7QUFDQSx1QkFBT2lOLFFBQVA7QUFDSDs7QUFFRDtBQUFnQztBQUM1QixvQkFBSUEsd0JBQ0cxWixLQURIO0FBRUE1Rix1Q0FBbUIsR0FBRzBmLE1BQUgsQ0FBVTlaLE1BQU01RixpQkFBaEI7QUFGbkIsa0JBQUo7O0FBS0Esb0JBQUkyZixRQUFRLEtBQVo7QUFDQUwseUJBQVN0ZixpQkFBVCxHQUE2QnNmLFNBQVN0ZixpQkFBVCxDQUEyQkMsTUFBM0IsQ0FBbUNJLElBQUQsSUFBVTtBQUNyRSx3QkFBSUEsS0FBS0UsRUFBTCxJQUFXdWUsT0FBT3BnQixPQUFQLENBQWVxRCxRQUFmLENBQXdCeEIsRUFBbkMsSUFBeUNGLEtBQUs1QixJQUFMLElBQWFxZ0IsT0FBT3BnQixPQUFQLENBQWVELElBQXpFLEVBQStFO0FBQzNFa2hCLGdDQUFRLElBQVI7QUFDQSwrQkFBTyxLQUFQO0FBQ0g7QUFDRCwyQkFBTyxJQUFQO0FBQ0gsaUJBTjRCLENBQTdCOztBQVFBLG9CQUFJLENBQUNBLEtBQUwsRUFBWTtBQUNSTCw2QkFBU3RmLGlCQUFULENBQTJCdUYsSUFBM0IsY0FDT3VaLE9BQU9wZ0IsT0FBUCxDQUFlcUQsUUFEdEI7QUFFSXRELDhCQUFNcWdCLE9BQU9wZ0IsT0FBUCxDQUFlRDtBQUZ6QjtBQUlIOztBQUVELHVCQUFPNmdCLFFBQVA7QUFDSDs7QUFFRDtBQUFnQztBQUM1QixvQkFBSUEsd0JBQWdCMVosS0FBaEIsQ0FBSjs7QUFFQTBaLHlCQUFTNWUsZ0JBQVQsR0FBNEJvZSxPQUFPcGdCLE9BQW5DO0FBQ0EsdUJBQU80Z0IsUUFBUDtBQUNIOztBQUVEO0FBQTZCO0FBQ3pCLG9CQUFJQSx3QkFBZ0IxWixLQUFoQixFQUEwQmtaLE9BQU9wZ0IsT0FBUCxDQUFla0IsV0FBekMsSUFBc0RDLGdCQUFpQmlmLE9BQU9wZ0IsT0FBUCxDQUFlbUIsY0FBdEYsR0FBSjs7QUFFQSx1QkFBT3lmLFFBQVA7QUFDSDs7QUE5Q0w7QUFpREEsV0FBTzFaLEtBQVA7QUFDSCxDOztBQXBFRDs7QUFFQSxNQUFNeVosZUFBZTtBQUNqQmhOLGdDQUE0QixLQURYO0FBRWpCQyxrQkFBYyxFQUZHO0FBR2pCQyx1QkFBbUIsRUFIRjtBQUlqQkMsb0JBQWdCLEVBSkM7QUFLakJ4Uyx1QkFBbUIsRUFMRjtBQU1qQlUsc0JBQWtCLElBTkQ7QUFPakJiLG9CQUFnQjtBQUNacUIsb0JBQVksQ0FBQyxHQUFELEVBQU0sSUFBTixDQURBO0FBRVpILHVCQUFlLENBQUMsQ0FBRCxFQUFJLEVBQUosQ0FGSDtBQUdaTSxnQkFBUTtBQUhJO0FBUEMsQ0FBckIsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDRkE7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRUEsTUFBTXVlLGNBQWMsNEJBQWdCO0FBQ2hDMWQsaURBRGdDO0FBRWhDQyxrREFGZ0M7QUFHaENzUyw4QkFIZ0M7QUFJaENpSCx5Q0FKZ0M7QUFLaEMzTSx3QkFMZ0M7QUFNaENzTixvQ0FOZ0M7QUFPaEN0USx3QkFQZ0M7QUFRaEMrUTtBQVJnQyxDQUFoQixDQUFwQjs7a0JBV2U4QyxXOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztrQkNmQSxVQUFVaGEsUUFBUXlaLFlBQWxCLEVBQWdDUCxNQUFoQyxFQUF3Qzs7QUFFbkQsWUFBUUEsT0FBT3JnQixJQUFmOztBQUVJO0FBQTBCO0FBQ3RCLG9CQUFJNmdCLHdCQUFnQjFaLEtBQWhCLENBQUo7O0FBRUEwWix5QkFBUzFGLG9CQUFULEdBQWdDLEtBQWhDOztBQUVBLHVCQUFPMEYsUUFBUDtBQUNIOztBQUVEO0FBQW9CO0FBQ2hCLG9CQUFJQSx3QkFBZ0IxWixLQUFoQixDQUFKOztBQUVBMFoseUJBQVN4RixVQUFULEdBQXNCZ0YsT0FBT3BnQixPQUFQLENBQWVzSSxHQUFmLENBQW1CNlksT0FBT0EsSUFBSXRmLEVBQTlCLENBQXRCO0FBQ0ErZSx5QkFBUzFGLG9CQUFULEdBQWdDLElBQWhDOztBQUVBLHVCQUFPMEYsUUFBUDtBQUNIOztBQWpCTDs7QUFxQkEsV0FBTzFaLEtBQVA7QUFDSCxDOztBQS9CRDs7QUFFQSxNQUFNeVosZUFBZTtBQUNqQnZGLGdCQUFZLEVBREs7QUFFakJGLDBCQUFzQjtBQUZMLENBQXJCLEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2tCQ0llLFVBQVVoVSxRQUFReVosWUFBbEIsRUFBZ0NQLE1BQWhDLEVBQXdDOztBQUVuRCxZQUFRQSxPQUFPcmdCLElBQWY7QUFDSTtBQUFxQjtBQUNqQixvQkFBSTZnQix3QkFBZ0IxWixLQUFoQixDQUFKOztBQUVBLHVCQUFPa1osT0FBT3BnQixPQUFQLENBQWV5QixNQUFmLENBQXNCLENBQUMyZixTQUFELEVBQVlDLE1BQVosS0FBdUI7QUFDaERELDhCQUFVQyxPQUFPeGYsRUFBakIsSUFBdUJ3ZixNQUF2QjtBQUNBLDJCQUFPRCxTQUFQO0FBQ0gsaUJBSE0sRUFHTFIsUUFISyxDQUFQO0FBS0g7O0FBVEw7QUFZQSxXQUFPMVosS0FBUDtBQUNILEM7O0FBckJEOztBQUVBLE1BQU15WixlQUFlLEVBQXJCLEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2tCQ2dCZSxVQUFVelosUUFBUXlaLFlBQWxCLEVBQWdDUCxNQUFoQyxFQUF3Qzs7QUFFbkQsWUFBUUEsT0FBT3JnQixJQUFmO0FBQ0k7QUFBK0I7QUFDM0Isb0JBQUk2Z0Isd0JBQWdCMVosS0FBaEIsQ0FBSjtBQUNBLG9CQUFJa1osT0FBT3BnQixPQUFYLEVBQW9CO0FBQ2hCNGdCLDRDQUFnQkEsUUFBaEIsRUFBNkJSLE9BQU9wZ0IsT0FBcEM7QUFDSDtBQUNENGdCLHlCQUFTL0YsMEJBQVQsR0FBc0MsSUFBdEM7QUFDQSx1QkFBTytGLFFBQVA7QUFDSDs7QUFFRDtBQUEwQjtBQUN0QixvQkFBSUEsd0JBQ0cxWixLQURIO0FBRUE1Rix1Q0FBbUIsR0FBRzBmLE1BQUgsQ0FBVTlaLE1BQU01RixpQkFBaEI7QUFGbkIsa0JBQUo7O0FBS0Esb0JBQUkyZixRQUFRLEtBQVo7QUFDQUwseUJBQVN0ZixpQkFBVCxHQUE2QnNmLFNBQVN0ZixpQkFBVCxDQUEyQkMsTUFBM0IsQ0FBbUNJLElBQUQsSUFBVTtBQUNyRSx3QkFBSUEsS0FBS0UsRUFBTCxJQUFXdWUsT0FBT3BnQixPQUFQLENBQWVxRCxRQUFmLENBQXdCeEIsRUFBbkMsSUFBeUNGLEtBQUs1QixJQUFMLElBQWFxZ0IsT0FBT3BnQixPQUFQLENBQWVELElBQXpFLEVBQStFO0FBQzNFa2hCLGdDQUFRLElBQVI7QUFDQSwrQkFBTyxLQUFQO0FBQ0g7QUFDRCwyQkFBTyxJQUFQO0FBQ0gsaUJBTjRCLENBQTdCOztBQVFBLG9CQUFJLENBQUNBLEtBQUwsRUFBWTtBQUNSTCw2QkFBU3RmLGlCQUFULENBQTJCdUYsSUFBM0IsY0FDT3VaLE9BQU9wZ0IsT0FBUCxDQUFlcUQsUUFEdEI7QUFFSXRELDhCQUFNcWdCLE9BQU9wZ0IsT0FBUCxDQUFlRDtBQUZ6QjtBQUlIOztBQUVELHVCQUFPNmdCLFFBQVA7QUFDSDs7QUFFRDtBQUEwQjtBQUN0QixvQkFBSUEsd0JBQWdCMVosS0FBaEIsQ0FBSjs7QUFFQTBaLHlCQUFTNWUsZ0JBQVQsR0FBNEJvZSxPQUFPcGdCLE9BQW5DO0FBQ0EsdUJBQU80Z0IsUUFBUDtBQUNIOztBQUVEO0FBQTZCO0FBQ3pCLG9CQUFJQSx3QkFBZ0IxWixLQUFoQixFQUEwQmtaLE9BQU9wZ0IsT0FBUCxDQUFla0IsV0FBekMsSUFBc0RDLGdCQUFnQmlmLE9BQU9wZ0IsT0FBUCxDQUFlbUIsY0FBckYsR0FBSjs7QUFFQSx1QkFBT3lmLFFBQVA7QUFDSDs7QUE5Q0w7QUFpREEsV0FBTzFaLEtBQVA7QUFDSCxDOztBQXRFRDs7QUFFQSxNQUFNeVosZUFBZTtBQUNqQjlGLGdDQUE0QixLQURYO0FBRWpCRSxxQkFBaUIsRUFGQTtBQUdqQkQsZ0JBQVksRUFISztBQUlqQnhaLHVCQUFtQixFQUpGO0FBS2pCVSxzQkFBa0IsSUFMRDtBQU1qQmIsb0JBQWdCO0FBQ1pxQixvQkFBWSxDQUFDLEdBQUQsRUFBTSxJQUFOLENBREE7QUFFWmdDLGlCQUFTLElBRkc7QUFHWjhXLHdCQUFnQixLQUhKO0FBSVpDLDBCQUFrQixLQUpOO0FBS1o3VyxtQkFBVyxLQUxDO0FBTVpELHNCQUFjO0FBTkY7QUFOQyxDQUFyQixDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0ZBOzs7O0FBQ0E7O0FBRUE7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7OztBQUNBOzs7O0FBRUE7Ozs7OztBQUVBLE1BQU02YyxTQUFTLENBRVgsRUFBRUMsTUFBTSxHQUFSLEVBQWFDLE9BQU8sSUFBcEIsRUFBMEJDLHlCQUExQixFQUZXLEVBSVgsRUFBRUYsTUFBTSxNQUFSLEVBQWdCQyxPQUFPLElBQXZCLEVBQTZCQyxtQ0FBN0IsRUFKVyxFQUtYLEVBQUVGLE1BQU0saUJBQVIsRUFBMkJDLE9BQU8sSUFBbEMsRUFBd0NDLG1DQUF4QyxFQUxXLEVBTVgsRUFBRUYsTUFBTSxvQkFBUixFQUE4QkMsT0FBTyxJQUFyQyxFQUEyQ0Msa0NBQTNDLEVBTlcsRUFPWCxFQUFFRixNQUFNLGlCQUFSLEVBQTJCQyxPQUFPLElBQWxDLEVBQXdDQyxrQ0FBeEMsRUFQVyxFQVFYLEVBQUVGLE1BQU0sZ0NBQVIsRUFBMENDLE9BQU8sSUFBakQsRUFBdURDLG9DQUF2RCxFQVJXLEVBVVgsRUFBRUYsTUFBTSw4QkFBUixFQUF3Q0MsT0FBTyxJQUEvQyxFQUFxREMsK0JBQXJELEVBVlcsRUFXWCxFQUFFRixNQUFNLDBDQUFSLEVBQW9EQyxPQUFPLElBQTNELEVBQWlFQyxtQ0FBakUsRUFYVyxFQWFYLEVBQUVGLE1BQU0sY0FBUixFQUF3QkMsT0FBTyxJQUEvQixFQUFxQ0MsK0JBQXJDLEVBYlcsRUFjWCxFQUFFRixNQUFNLE9BQVIsRUFBaUJDLE9BQU8sSUFBeEIsRUFBOEJDLGdDQUE5QixFQWRXLEVBZVgsRUFBRUYsTUFBTSxXQUFSLEVBQXFCQyxPQUFPLElBQTVCLEVBQWtDQyxnQ0FBbEMsRUFmVyxFQWdCWCxFQUFFRixNQUFNLHdCQUFSLEVBQWtDQyxPQUFPLElBQXpDLEVBQStDQyxxQ0FBL0MsRUFoQlcsRUFpQlgsRUFBRUYsTUFBTSxtQkFBUixFQUE2QkMsT0FBTyxJQUFwQyxFQUEwQ0MsZ0NBQTFDLEVBakJXLEVBa0JYLEVBQUVGLE1BQU0sT0FBUixFQUFpQkMsT0FBTyxJQUF4QixFQUE4QkMseUJBQTlCLEVBbEJXLEVBbUJYLEVBQUVGLE1BQU0sVUFBUixFQUFvQkMsT0FBTyxJQUEzQixFQUFpQ0MsNEJBQWpDLEVBbkJXLEVBb0JYLEVBQUVGLE1BQU0saUJBQVIsRUFBMkJDLE9BQU8sSUFBbEMsRUFBd0NDLDRCQUF4QyxFQXBCVyxFQXNCWCxFQUFFRixNQUFNLFFBQVIsRUFBa0JDLE9BQU8sSUFBekIsRUFBK0JDLDhCQUEvQixFQXRCVyxFQXVCWCxFQUFFRixNQUFNLGFBQVIsRUFBdUJDLE9BQU8sSUFBOUIsRUFBb0NDLDhCQUFwQyxFQXZCVyxFQXlCWCxFQUFFRixNQUFNLEtBQVIsRUFBZUMsT0FBTyxJQUF0QixFQUE0QkMsbUNBQTVCLEVBekJXLEVBMEJYLEVBQUVGLE1BQU0sbUJBQVIsRUFBNkJDLE9BQU8sSUFBcEMsRUFBMENDLGtDQUExQyxFQTFCVyxFQTJCWCxFQUFFRixNQUFNLFVBQVIsRUFBb0JDLE9BQU8sSUFBM0IsRUFBaUNDLHdCQUFqQyxFQTNCVyxFQTRCWCxFQUFFRixNQUFNLGdCQUFSLEVBQTBCQyxPQUFPLElBQWpDLEVBQXVDQyxpQ0FBdkMsRUE1QlcsRUE2QlgsRUFBRUYsTUFBTSxlQUFSLEVBQXlCQyxPQUFPLElBQWhDLEVBQXNDQyxtQ0FBdEMsRUE3QlcsRUErQlgsRUFBRUYsTUFBTSwwQkFBUixFQUFvQ0MsT0FBTyxJQUEzQyxFQUFpREMsbUNBQWpELEVBL0JXLENBQWY7O0FBbUNBLE1BQU1DLFlBQU4sMEJBQXFDOztBQUlqQzVhLGFBQVM7QUFDTCxlQUNJO0FBQUE7QUFBQTtBQUNJO0FBQ0ksd0JBQ0ksQ0FBQyxFQUFFNUUsUUFBRixFQUFELEtBQWtCO0FBQ2QsMkJBQ0k7QUFBQTtBQUFBO0FBQ0k7QUFBQTtBQUFBO0FBQ0kscUNBQUtBLFNBQVN5ZixRQURsQjtBQUVJLDRDQUFXLE1BRmY7QUFHSSx5Q0FBUyxFQUFFQyxPQUFPLEdBQVQsRUFBY0MsTUFBTSxDQUFwQixFQUhiO0FBSUksc0NBQU07QUFKVjtBQU1JO0FBQUE7QUFBQSxrQ0FBUSxVQUFVM2YsUUFBbEI7QUFDS29mLHVDQUFPaFosR0FBUCxDQUFXLENBQUN3WixLQUFELEVBQVFsZ0IsQ0FBUixLQUNSLGtFQUFXa2dCLEtBQVgsSUFBa0IsS0FBS2xnQixDQUF2QixJQURIO0FBREw7QUFOSjtBQURKLHFCQURKO0FBZ0JIO0FBbkJUO0FBREosU0FESjtBQTJCSDs7QUFoQ2dDOztBQUEvQjhmLFksQ0FFS0ssTSxHQUFTVCxNO2tCQW1DTEksWTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDMUdmLE1BQU1yVyxPQUFPLENBQUMsUUFBRCxFQUFXLFFBQVgsRUFBcUIsU0FBckIsRUFBZ0MsV0FBaEMsRUFBNkMsVUFBN0MsRUFBeUQsUUFBekQsRUFBbUUsVUFBbkUsQ0FBYjs7QUFFTyxNQUFNNEIsNEJBQVcrVSxTQUFELElBQWU7QUFDbEMsUUFBSWpWLE9BQU8sSUFBSXhCLElBQUosQ0FBU3lXLFNBQVQsQ0FBWDtBQUNBLFFBQUlsVSxRQUFRZixLQUFLZ0IsUUFBTCxFQUFaO0FBQ0EsUUFBSUMsVUFBVSxNQUFNakIsS0FBS2tCLFVBQUwsRUFBcEI7QUFDQSxXQUFPSCxRQUFRLEdBQVIsR0FBY0UsUUFBUUUsTUFBUixDQUFlLENBQUMsQ0FBaEIsQ0FBckI7QUFDSCxDQUxNO0FBTUEsTUFBTStULGtDQUFjRCxTQUFELElBQWU7QUFDckMsV0FBTzNXLEtBQUssSUFBSUUsSUFBSixDQUFTeVcsU0FBVCxFQUFvQnJXLE1BQXBCLEVBQUwsQ0FBUDtBQUVILENBSE0sQzs7Ozs7Ozs7Ozs7Ozs7QUNEUDs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7QUFFQTs7OztBQUNBOztBQUNBOztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7OztBQXJCQXVXLFFBQVFDLEdBQVIsQ0FBWUMsNEJBQVosR0FBMkMsR0FBM0M7O0FBRUEsTUFBTWIsT0FBTyxtQkFBQWMsQ0FBUSxrQkFBUixDQUFiO0FBQ0EsTUFBTUMsT0FBTyxtQkFBQUQsQ0FBUSxrQkFBUixDQUFiO0FBQ0EsTUFBTUUsVUFBVSxtQkFBQUYsQ0FBUSx3QkFBUixDQUFoQjtBQUNBLE1BQU1HLE1BQU0sSUFBSUQsT0FBSixFQUFaO0FBQ0EsTUFBTUUsU0FBUyxJQUFJSCxLQUFLSSxNQUFULENBQWdCRixHQUFoQixDQUFmOztBQWtCQUEsSUFBSUcsR0FBSixDQUFRLFNBQVIsRUFBbUJKLFFBQVFLLE1BQVIsQ0FBZXJCLEtBQUtsZCxJQUFMLENBQVV3ZSxTQUFWLEVBQXFCLFFBQXJCLENBQWYsQ0FBbkI7QUFDQUwsSUFBSUcsR0FBSixDQUFRLE9BQVIsRUFBaUJKLFFBQVFLLE1BQVIsQ0FBZXJCLEtBQUtsZCxJQUFMLENBQVV3ZSxTQUFWLEVBQXFCLE1BQXJCLENBQWYsQ0FBakI7O0FBR0FMLElBQUlsUSxHQUFKLENBQVEsR0FBUixFQUFhLFVBQVV3USxHQUFWLEVBQWU5YyxHQUFmLEVBQW9COztBQUU3QixVQUFNd0UsVUFBVSxFQUFoQjs7QUFFQSxVQUFNNFUsUUFBUSx5Q0FDRyxpREFESCxDQUFkOztBQUlBLFVBQU0yRCxpQkFBaUIseUJBQXZCO0FBQ0EsVUFBTUMsUUFBUSw0QkFBZTtBQUN6QkMsaUJBQVM7QUFDTEMscUJBQVM7QUFDTEMsc0JBQU07QUFERCxhQURKO0FBSUxDLHVCQUFXO0FBQ1BELHNCQUFNO0FBREM7QUFKTixTQURnQjtBQVN6Qi9KLGdCQUFRO0FBQ0ppSyxvQkFBUTtBQURKO0FBVGlCLEtBQWYsQ0FBZDtBQWFBLFVBQU1DLG9CQUFvQixzQ0FBMUI7O0FBRUEsUUFBSTlZLFFBQVE1SCxHQUFaLEVBQWlCO0FBQ2JvRCxZQUFJdWQsU0FBSixDQUFjLEdBQWQsRUFBbUI7QUFDZkMsc0JBQVVoWixRQUFRNUg7QUFESCxTQUFuQjtBQUdBb0QsWUFBSW9JLEdBQUo7QUFDSCxLQUxELE1BS087O0FBRUg7QUFDQSxjQUFNcVYsV0FBVyxFQUFqQjs7QUFFQSx5QkFBTzFCLE1BQVAsQ0FBYzJCLElBQWQsQ0FBbUI1QixTQUFTO0FBQ3hCO0FBQ0Esa0JBQU1uYSxRQUFRLCtCQUFVbWIsSUFBSXZCLElBQWQsRUFBb0JPLEtBQXBCLENBQWQ7QUFDQSxnQkFBSW5hLFNBQVNtYSxNQUFNTCxTQUFOLENBQWdCdEMsUUFBN0IsRUFDSXNFLFNBQVM1YyxJQUFULENBQWNpYixNQUFNTCxTQUFOLENBQWdCdEMsUUFBaEIsQ0FBeUJDLEtBQXpCLEVBQWdDelgsS0FBaEMsQ0FBZDtBQUNKLG1CQUFPQSxLQUFQO0FBQ0gsU0FORDs7QUFRQS9CLGdCQUFRK2QsR0FBUixDQUFZRixRQUFaLEVBQXNCdmpCLElBQXRCLENBQTJCK0YsUUFBUTtBQUMvQixrQkFBTTJkLFlBQVlwUSxLQUFLQyxTQUFMLENBQWUyTCxNQUFNeUUsUUFBTixFQUFmLENBQWxCO0FBQ0Esa0JBQU1DLE9BQU8saUJBQWVDLGNBQWYsQ0FDVDtBQUFBO0FBQUEsa0JBQVUsT0FBTzNFLEtBQWpCO0FBQ0k7QUFBQTtBQUFBLHNCQUFhLFVBQVUyRCxjQUF2QixFQUF1QyxtQkFBbUJPLGlCQUExRDtBQUNJO0FBQUE7QUFBQSwwQkFBa0IsT0FBT04sS0FBekI7QUFDSTtBQUFBO0FBQUE7QUFDSSwwQ0FBVUYsSUFBSWxnQixHQURsQjtBQUVJLHlDQUFTNEg7QUFGYjtBQUlJO0FBSko7QUFESjtBQURKO0FBREosYUFEUyxDQUFiO0FBY0Esa0JBQU13WixNQUFNakIsZUFBZXRRLFFBQWYsRUFBWjs7QUFFQXpNLGdCQUFJYyxNQUFKLENBQVcsc0JBQVgsRUFBbUM7QUFDL0JnZCxvQkFEK0IsRUFDekJFLEdBRHlCLEVBQ3BCSjtBQURvQixhQUFuQztBQUdILFNBckJEO0FBdUJIO0FBRUosQ0FuRUQ7O0FBc0VBcEIsSUFBSUcsR0FBSixDQUFRLFVBQVVHLEdBQVYsRUFBZTljLEdBQWYsRUFBb0I7QUFDeEJBLFFBQUlpZSxRQUFKLENBQWEsWUFBYixFQUEyQixFQUFFQyxNQUFNLFNBQVIsRUFBM0I7QUFDSCxDQUZEOztBQUlBekIsT0FBTzBCLE1BQVAsQ0FBYyxJQUFkLEVBQXFCQyxHQUFELElBQVM7QUFDekIsUUFBSUEsR0FBSixFQUFTO0FBQ0wsZUFBTzVlLFFBQVFsRixLQUFSLENBQWM4akIsR0FBZCxDQUFQO0FBQ0g7QUFDRDVlLFlBQVE2ZSxJQUFSLENBQWEseUNBQWI7QUFDSCxDQUxELEU7Ozs7Ozs7Ozs7O0FDdEdBLGtDOzs7Ozs7Ozs7OztBQ0FBLG9DOzs7Ozs7Ozs7OztBQ0FBLGlDOzs7Ozs7Ozs7OztBQ0FBLDREOzs7Ozs7Ozs7OztBQ0FBLDBEOzs7Ozs7Ozs7OztBQ0FBLG1EOzs7Ozs7Ozs7OztBQ0FBLHlEOzs7Ozs7Ozs7OztBQ0FBLGlFOzs7Ozs7Ozs7OztBQ0FBLHNEOzs7Ozs7Ozs7OztBQ0FBLGlEOzs7Ozs7Ozs7OztBQ0FBLDZDOzs7Ozs7Ozs7OztBQ0FBLHVEOzs7Ozs7Ozs7OztBQ0FBLDZDOzs7Ozs7Ozs7OztBQ0FBLDZDOzs7Ozs7Ozs7OztBQ0FBLGlEOzs7Ozs7Ozs7OztBQ0FBLDhDOzs7Ozs7Ozs7OztBQ0FBLGdEOzs7Ozs7Ozs7OztBQ0FBLCtDOzs7Ozs7Ozs7OztBQ0FBLGlDOzs7Ozs7Ozs7OztBQ0FBLGdEOzs7Ozs7Ozs7OztBQ0FBLGtDOzs7Ozs7Ozs7OztBQ0FBLDZDOzs7Ozs7Ozs7OztBQ0FBLHNEOzs7Ozs7Ozs7OztBQ0FBLDhDOzs7Ozs7Ozs7OztBQ0FBLHdDOzs7Ozs7Ozs7OztBQ0FBLHlDOzs7Ozs7Ozs7OztBQ0FBLDZDOzs7Ozs7Ozs7OztBQ0FBLG1EOzs7Ozs7Ozs7OztBQ0FBLGtDOzs7Ozs7Ozs7OztBQ0FBLHlDOzs7Ozs7Ozs7OztBQ0FBLHdDOzs7Ozs7Ozs7OztBQ0FBLDZDIiwiZmlsZSI6InNlcnZlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgd2FzbSBtb2R1bGVzXG4gXHR2YXIgaW5zdGFsbGVkV2FzbU1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL1wiO1xuXG4gXHQvLyBvYmplY3Qgd2l0aCBhbGwgY29tcGlsZWQgV2ViQXNzZW1ibHkuTW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy53ID0ge307XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vaW5kZXguanNcIik7XG4iLCJpbXBvcnQgeyBTRU5EX09UUF9SRVFVRVNULCBTRU5EX09UUF9TVUNDRVNTLCBTRU5EX09UUF9GQUlMLCBTVUJNSVRfT1RQX1JFUVVFU1QsIFNVQk1JVF9PVFBfU1VDQ0VTUywgU1VCTUlUX09UUF9GQUlMIH0gZnJvbSAnLi4vLi4vY29uc3RhbnRzL3R5cGVzJztcbmltcG9ydCB7IEFQSV9HRVQsIEFQSV9QT1NUIH0gZnJvbSAnLi4vLi4vYXBpL2FwaS5qcyc7XG5pbXBvcnQgU1RPUkFHRSBmcm9tICcuLi8uLi9oZWxwZXJzL3N0b3JhZ2UnXG5cbmV4cG9ydCBjb25zdCBzZW5kT1RQID0gKG51bWJlciwgY2IpID0+IChkaXNwYXRjaCkgPT4ge1xuICAgIGRpc3BhdGNoKHtcbiAgICAgICAgdHlwZTogU0VORF9PVFBfUkVRVUVTVCxcbiAgICAgICAgcGF5bG9hZDoge1xuICAgICAgICAgICAgcGhvbmVOdW1iZXI6IG51bWJlclxuICAgICAgICB9XG4gICAgfSlcblxuICAgIEFQSV9QT1NUKCcvYXBpL3YxL3VzZXIvb3RwL2dlbmVyYXRlJywge1xuICAgICAgICBcInBob25lX251bWJlclwiOiBudW1iZXJcbiAgICB9KS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICBkaXNwYXRjaCh7XG4gICAgICAgICAgICB0eXBlOiBTRU5EX09UUF9TVUNDRVNTLFxuICAgICAgICAgICAgcGF5bG9hZDoge31cbiAgICAgICAgfSlcbiAgICAgICAgaWYgKGNiKSBjYihyZXNwb25zZS5leGlzdHMpO1xuICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICBsZXQgbWVzc2FnZSA9IFwiQ2Fubm90IGdlbmVyYXRlIE9UUC5cIlxuICAgICAgICBkaXNwYXRjaCh7XG4gICAgICAgICAgICB0eXBlOiBTRU5EX09UUF9GQUlMLFxuICAgICAgICAgICAgcGF5bG9hZDoge1xuICAgICAgICAgICAgICAgIGVycm9yX21lc3NhZ2U6IG1lc3NhZ2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9KVxuXG59XG5cbmV4cG9ydCBjb25zdCBzdWJtaXRPVFAgPSAobnVtYmVyLCBvdHAsIGNiKSA9PiAoZGlzcGF0Y2gpID0+IHtcbiAgICBkaXNwYXRjaCh7XG4gICAgICAgIHR5cGU6IFNVQk1JVF9PVFBfUkVRVUVTVCxcbiAgICAgICAgcGF5bG9hZDoge31cbiAgICB9KVxuXG4gICAgQVBJX1BPU1QoJy9hcGkvdjEvdXNlci9kb2N0b3IvbG9naW4nLCB7XG4gICAgICAgIFwicGhvbmVfbnVtYmVyXCI6IG51bWJlcixcbiAgICAgICAgXCJvdHBcIjogb3RwXG4gICAgfSkudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgLy8gc2V0IGNvb2tpZSB0b2tlbiBleHBsaWNpdGx5LCBjc3JmIHRva2VuIGlzIHNldCBieSBkZWZhdWx0XG4gICAgICAgIFNUT1JBR0Uuc2V0QXV0aFRva2VuKHJlc3BvbnNlLnRva2VuKVxuXG4gICAgICAgIGRpc3BhdGNoKHtcbiAgICAgICAgICAgIHR5cGU6IFNVQk1JVF9PVFBfU1VDQ0VTUyxcbiAgICAgICAgICAgIHBheWxvYWQ6IHsgdG9rZW46IHJlc3BvbnNlLnRva2VuIH1cbiAgICAgICAgfSlcbiAgICAgICAgaWYgKGNiKSBjYigpO1xuICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICBkaXNwYXRjaCh7XG4gICAgICAgICAgICB0eXBlOiBTVUJNSVRfT1RQX0ZBSUwsXG4gICAgICAgICAgICBwYXlsb2FkOiB7XG4gICAgICAgICAgICAgICAgZXJyb3JfbWVzc2FnZTogXCJJbnZhbGlkIE9UUFwiXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfSlcbn1cbiIsImltcG9ydCB7IEFQUEVORF9VU0VSX1BST0ZJTEVTIH0gZnJvbSAnLi4vLi4vY29uc3RhbnRzL3R5cGVzJztcbmltcG9ydCB7IEFQSV9HRVQgfSBmcm9tICcuLi8uLi9hcGkvYXBpLmpzJztcblxuXG5leHBvcnQgY29uc3QgZ2V0VXNlclByb2ZpbGUgPSAoKSA9PiAoZGlzcGF0Y2gpID0+IHtcblx0QVBJX0dFVCgnL3VzZXIuanNvbicpLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG5cdFx0XG5cdFx0ZGlzcGF0Y2goe1xuXHRcdFx0dHlwZTogQVBQRU5EX1VTRVJfUFJPRklMRVMsXG5cdFx0XHRwYXlsb2FkOiByZXNwb25zZS5wcm9maWxlc1xuXHRcdH0pXG5cblx0fSkuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSB7XG5cblx0fSlcbn1cblxuZXhwb3J0IGNvbnN0IGdldFVzZXJQcm9maWxlV2l0aEFwcG9pbnRtZW50cyA9ICgpID0+IChkaXNwYXRjaCkgPT4ge1xuXHRBUElfR0VUKCcvdXNlcl9wcm9maWxlX2FwcG9pbnRtZW50cy5qc29uJykudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcblx0XHRcblx0XHRkaXNwYXRjaCh7XG5cdFx0XHR0eXBlOiBBUFBFTkRfVVNFUl9QUk9GSUxFUyxcblx0XHRcdHBheWxvYWQ6IHJlc3BvbnNlLnByb2ZpbGVzXG5cdFx0fSlcblxuXHR9KS5jYXRjaChmdW5jdGlvbiAoZXJyb3IpIHtcblxuXHR9KVxufVxuXG5leHBvcnQgY29uc3QgZ2V0VXNlclByb2ZpbGVXaXRoVGVzdHMgPSAoKSA9PiAoZGlzcGF0Y2gpID0+IHtcblx0QVBJX0dFVCgnL3VzZXJfcHJvZmlsZV90ZXN0cy5qc29uJykudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcblx0XHRcblx0XHRkaXNwYXRjaCh7XG5cdFx0XHR0eXBlOiBBUFBFTkRfVVNFUl9QUk9GSUxFUyxcblx0XHRcdHBheWxvYWQ6IHJlc3BvbnNlLnByb2ZpbGVzXG5cdFx0fSlcblxuXHR9KS5jYXRjaChmdW5jdGlvbiAoZXJyb3IpIHtcblxuXHR9KVxufVxuXG4iLCJpbXBvcnQgeyBMQUJfU0VBUkNIX1NUQVJULCBBUFBFTkRfTEFCUywgTEFCX1NFQVJDSCwgTUVSR0VfU0VBUkNIX1NUQVRFX0xBQiB9IGZyb20gJy4uLy4uL2NvbnN0YW50cy90eXBlcyc7XG5pbXBvcnQgeyBBUElfR0VUIH0gZnJvbSAnLi4vLi4vYXBpL2FwaS5qcyc7XG5cblxuZXhwb3J0IGNvbnN0IGdldExhYnMgPSAoc2VhcmNoU3RhdGUgPSB7fSwgZmlsdGVyQ3JpdGVyaWEgPSB7fSwgbWVyZ2VTdGF0ZSA9IGZhbHNlKSA9PiAoZGlzcGF0Y2gpID0+IHtcblxuXHRsZXQgdGVzdElkcyA9IHNlYXJjaFN0YXRlLnNlbGVjdGVkQ3JpdGVyaWFzXG5cdFx0LmZpbHRlcih4ID0+IHgudHlwZSA9PSAndGVzdCcpXG5cdFx0LnJlZHVjZSgoZmluYWxTdHIsIGN1cnIsIGkpID0+IHtcblx0XHRcdGlmIChpICE9IDApIHtcblx0XHRcdFx0ZmluYWxTdHIgKz0gJywnXG5cdFx0XHR9XG5cdFx0XHRmaW5hbFN0ciArPSBgJHtjdXJyLmlkfWBcblx0XHRcdHJldHVybiBmaW5hbFN0clxuXHRcdH0sIFwiXCIpXG5cblx0bGV0IGxhdCA9IDI4LjQ1OTVcblx0bGV0IGxvbmcgPSA3Ny4wMjI2XG5cdGlmIChzZWFyY2hTdGF0ZS5zZWxlY3RlZExvY2F0aW9uKSB7XG5cdFx0bGF0ID0gc2VhcmNoU3RhdGUuc2VsZWN0ZWRMb2NhdGlvbi5nZW9tZXRyeS5sb2NhdGlvbi5sYXRcblx0XHRsb25nID0gc2VhcmNoU3RhdGUuc2VsZWN0ZWRMb2NhdGlvbi5nZW9tZXRyeS5sb2NhdGlvbi5sbmdcblx0fVxuXHRsZXQgbWluX2Rpc3RhbmNlID0gZmlsdGVyQ3JpdGVyaWEuZGlzdGFuY2VSYW5nZVswXVxuXHRsZXQgbWF4X2Rpc3RhbmNlID0gZmlsdGVyQ3JpdGVyaWEuZGlzdGFuY2VSYW5nZVsxXVxuXHRsZXQgbWluX3ByaWNlID0gZmlsdGVyQ3JpdGVyaWEucHJpY2VSYW5nZVswXVxuXHRsZXQgbWF4X3ByaWNlID0gZmlsdGVyQ3JpdGVyaWEucHJpY2VSYW5nZVsxXVxuXHRsZXQgb3JkZXJfYnkgPSBmaWx0ZXJDcml0ZXJpYS5zb3J0QnlcblxuXHRsZXQgdXJsID0gYC9hcGkvdjEvZGlhZ25vc3RpYy9sYWJsaXN0P2lkcz0ke3Rlc3RJZHN9Jmxvbmc9JHtsYXR9JmxhdD0ke2xvbmd9Jm1pbl9kaXN0YW5jZT0ke21pbl9kaXN0YW5jZX0mbWF4X2Rpc3RhbmNlPSR7bWF4X2Rpc3RhbmNlfSZtaW5fcHJpY2U9JHttaW5fcHJpY2V9Jm1heF9wcmljZT0ke21heF9wcmljZX0mb3JkZXJfYnk9JHtvcmRlcl9ieX1gXG5cblx0ZGlzcGF0Y2goe1xuXHRcdHR5cGU6IExBQl9TRUFSQ0hfU1RBUlQsXG5cdFx0cGF5bG9hZDogbnVsbFxuXHR9KVxuXG5cdHJldHVybiBBUElfR0VUKHVybCkudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcblxuXHRcdGRpc3BhdGNoKHtcblx0XHRcdHR5cGU6IEFQUEVORF9MQUJTLFxuXHRcdFx0cGF5bG9hZDogcmVzcG9uc2Vcblx0XHR9KVxuXG5cdFx0ZGlzcGF0Y2goe1xuXHRcdFx0dHlwZTogTEFCX1NFQVJDSCxcblx0XHRcdHBheWxvYWQ6IHJlc3BvbnNlXG5cdFx0fSlcblxuXHRcdGlmIChtZXJnZVN0YXRlKSB7XG5cdFx0XHRkaXNwYXRjaCh7XG5cdFx0XHRcdHR5cGU6IE1FUkdFX1NFQVJDSF9TVEFURV9MQUIsXG5cdFx0XHRcdHBheWxvYWQ6IHtcblx0XHRcdFx0XHRzZWFyY2hTdGF0ZSxcblx0XHRcdFx0XHRmaWx0ZXJDcml0ZXJpYVxuXHRcdFx0XHR9XG5cdFx0XHR9KVxuXHRcdH1cblxuXHR9KS5jYXRjaChmdW5jdGlvbiAoZXJyb3IpIHtcblxuXHR9KVxufVxuXG5leHBvcnQgY29uc3QgZ2V0TGFiQnlJZCA9IChsYWJJZCkgPT4gKGRpc3BhdGNoKSA9PiB7XG5cdGxldCB1cmwgPSBgL2FwaS92MS9kaWFnbm9zdGljL2xhYmxpc3QvJHtsYWJJZH1gXG5cblx0cmV0dXJuIEFQSV9HRVQodXJsKS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuXG5cdFx0ZGlzcGF0Y2goe1xuXHRcdFx0dHlwZTogQVBQRU5EX0xBQlMsXG5cdFx0XHRwYXlsb2FkOiBbcmVzcG9uc2VdXG5cdFx0fSlcblxuXHR9KS5jYXRjaChmdW5jdGlvbiAoZXJyb3IpIHtcblxuXHR9KVxufVxuXG5leHBvcnQgY29uc3QgZ2V0TGFiVGltZVNsb3RzID0gKGxhYklkLCB0ZXN0SWRzLCBjYWxsYmFjaykgPT4gKGRpc3BhdGNoKSA9PiB7XG5cdEFQSV9HRVQoJy9hdmFpbGFiaWxpdHlfbGFicy5qc29uJykudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcblxuXHRcdGNhbGxiYWNrKHJlc3BvbnNlKVxuXG5cdH0pLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xuXG5cdH0pXG59XG5cbmV4cG9ydCBjb25zdCBnZXRMYWJCb29raW5nU3VtbWFyeSA9IChib29raW5nSWQsIGNhbGxiYWNrKSA9PiAoZGlzcGF0Y2gpID0+IHtcblx0QVBJX0dFVCgnL2xhYl9ib29raW5nX3N1bW1hci5qc29uJykudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcblxuXHRcdGNhbGxiYWNrKHJlc3BvbnNlKVxuXG5cdH0pLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xuXG5cdH0pXG59XG4iLCJpbXBvcnQgeyBBUFBFTkRfRklMVEVSU19ESUFHTk9TSVMsIFRPR0dMRV9DT05ESVRJT05TLCBUT0dHTEVfU1BFQ0lBTElUSUVTLCBTRUxFQ1RfTE9DQVRJT04sIE1FUkdFX1NFQVJDSF9TVEFURSwgVE9HR0xFX0NSSVRFUklBLCBUT0dHTEVfVEVTVFMsIFRPR0dMRV9ESUFHTk9TSVNfQ1JJVEVSSUEsIExPQURfU0VBUkNIX0NSSVRFUklBX0xBQiB9IGZyb20gJy4uLy4uL2NvbnN0YW50cy90eXBlcyc7XG5pbXBvcnQgeyBBUElfR0VUIH0gZnJvbSAnLi4vLi4vYXBpL2FwaS5qcyc7XG5cbmV4cG9ydCBjb25zdCBsb2FkTGFiQ29tbW9uQ3JpdGVyaWFzID0gKCkgPT4gKGRpc3BhdGNoKSA9PiB7XG5cbiAgICByZXR1cm4gQVBJX0dFVCgnL2FwaS92MS9kaWFnbm9zdGljL2xhYnNlYXJjaCcpLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgIGRpc3BhdGNoKHtcbiAgICAgICAgICAgIHR5cGU6IExPQURfU0VBUkNIX0NSSVRFUklBX0xBQixcbiAgICAgICAgICAgIHBheWxvYWQ6IHJlc3BvbnNlXG4gICAgICAgIH0pXG4gICAgfSkuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICAgIGRpc3BhdGNoKHtcbiAgICAgICAgICAgIHR5cGU6IExPQURfU0VBUkNIX0NSSVRFUklBX0xBQixcbiAgICAgICAgICAgIHBheWxvYWQ6IG51bGxcbiAgICAgICAgfSlcbiAgICB9KVxuXG59XG5cbmV4cG9ydCBjb25zdCB0b2dnbGVEaWFnbm9zaXNDcml0ZXJpYSA9ICh0eXBlLCBjcml0ZXJpYSkgPT4gKGRpc3BhdGNoKSA9PiB7XG4gICAgZGlzcGF0Y2goe1xuICAgICAgICB0eXBlOiBUT0dHTEVfRElBR05PU0lTX0NSSVRFUklBLFxuICAgICAgICBwYXlsb2FkOiB7XG4gICAgICAgICAgICB0eXBlLCBjcml0ZXJpYVxuICAgICAgICB9XG4gICAgfSlcblxufVxuXG5leHBvcnQgY29uc3QgZ2V0RGlhZ25vc2lzQ3JpdGVyaWFSZXN1bHRzID0gKHNlYXJjaFN0cmluZywgY2FsbGJhY2spID0+IChkaXNwYXRjaCkgPT4ge1xuICAgIEFQSV9HRVQoYC9hcGkvdjEvZGlhZ25vc3RpYy90ZXN0P25hbWU9JHtzZWFyY2hTdHJpbmd9YCkudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgY2FsbGJhY2socmVzcG9uc2UpXG4gICAgfSkuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICAgIGNhbGxiYWNrKG51bGwpXG4gICAgfSlcbn1cblxuXG4iLCJpbXBvcnQgKiBhcyBTRUFSQ0hfQ1JJVEVSSUFfT1BEIGZyb20gJy4vb3BkL3NlYXJjaENyaXRlcmlhLmpzJ1xuaW1wb3J0ICogYXMgU0VBUkNIX0NSSVRFUklBX0xBQlMgZnJvbSAnLi9kaWFnbm9zaXMvc2VhcmNoQ3JpdGVyaWEuanMnXG5pbXBvcnQgKiBhcyBET0NUT1JTX0FDVElPTlMgZnJvbSAnLi9vcGQvZG9jdG9yU2VhcmNoLmpzJ1xuaW1wb3J0ICogYXMgTEFCU19BQ1RJT05TIGZyb20gJy4vZGlhZ25vc2lzL2xhYlNlYXJjaC5qcydcbmltcG9ydCAqIGFzIFVTRVJfQUNUSU9OUyBmcm9tICcuL2NvbW1vbnMvdXNlci5qcydcbmltcG9ydCAqIGFzIEFVVEhfQUNUSU9OUyBmcm9tICcuL2NvbW1vbnMvYXV0aC5qcydcblxubW9kdWxlLmV4cG9ydHMgPSBPYmplY3QuYXNzaWduKHt9LFxuICAgIFNFQVJDSF9DUklURVJJQV9PUEQsXG4gICAgU0VBUkNIX0NSSVRFUklBX0xBQlMsXG4gICAgRE9DVE9SU19BQ1RJT05TLFxuICAgIExBQlNfQUNUSU9OUyxcbiAgICBVU0VSX0FDVElPTlMsXG4gICAgQVVUSF9BQ1RJT05TXG4pIiwiaW1wb3J0IHsgRE9DVE9SX1NFQVJDSF9TVEFSVCwgQVBQRU5EX0RPQ1RPUlMsIERPQ1RPUl9TRUFSQ0gsIE1FUkdFX1NFQVJDSF9TVEFURV9PUEQgfSBmcm9tICcuLi8uLi9jb25zdGFudHMvdHlwZXMnO1xuaW1wb3J0IHsgQVBJX0dFVCB9IGZyb20gJy4uLy4uL2FwaS9hcGkuanMnO1xuXG5cbmV4cG9ydCBjb25zdCBnZXREb2N0b3JzID0gKHNlYXJjaFN0YXRlID0ge30sIGZpbHRlckNyaXRlcmlhID0ge30sIG1lcmdlU3RhdGUgPSBmYWxzZSkgPT4gKGRpc3BhdGNoKSA9PiB7XG5cdGxldCBzcGVjaWFsaXphdGlvbl9pZHMgPSBzZWFyY2hTdGF0ZS5zZWxlY3RlZENyaXRlcmlhc1xuXHRcdC5maWx0ZXIoeCA9PiB4LnR5cGUgPT0gJ3NwZWNpYWxpdHknKVxuXHRcdC5yZWR1Y2UoKGZpbmFsU3RyLCBjdXJyLCBpKSA9PiB7XG5cdFx0XHRpZiAoaSAhPSAwKSB7XG5cdFx0XHRcdGZpbmFsU3RyICs9ICcsJ1xuXHRcdFx0fVxuXHRcdFx0ZmluYWxTdHIgKz0gYCR7Y3Vyci5pZH1gXG5cdFx0XHRyZXR1cm4gZmluYWxTdHJcblx0XHR9LCBcIlwiKVxuXG5cdGxldCBzaXRzX2F0ID0gW11cblx0Ly8gaWYoZmlsdGVyQ3JpdGVyaWEuc2l0c19hdF9jbGluaWMpIHNpdHNfYXQucHVzaCgnY2xpbmljJyk7XG5cdC8vIGlmKGZpbHRlckNyaXRlcmlhLnNpdHNfYXRfaG9zcGl0YWwpIHNpdHNfYXQucHVzaCgnaG9zcGl0YWwnKTtcblx0Ly8gaWYoc2l0c19hdC5sZW5ndGggPT0gMCkgc2l0c19hdCA9IFsnY2xpbmljJywnaG9zcGl0YWwnXTtcblx0c2l0c19hdCA9IHNpdHNfYXQuam9pbignLCcpXG5cblx0bGV0IGxhdCA9IDI4LjQ1OTVcblx0bGV0IGxvbmcgPSA3Ny4wMjI2XG5cdGlmIChzZWFyY2hTdGF0ZS5zZWxlY3RlZExvY2F0aW9uKSB7XG5cdFx0bGF0ID0gc2VhcmNoU3RhdGUuc2VsZWN0ZWRMb2NhdGlvbi5nZW9tZXRyeS5sb2NhdGlvbi5sYXRcblx0XHRsb25nID0gc2VhcmNoU3RhdGUuc2VsZWN0ZWRMb2NhdGlvbi5nZW9tZXRyeS5sb2NhdGlvbi5sbmdcblx0fVxuXG5cdGxldCBtaW5fZmVlcyA9IGZpbHRlckNyaXRlcmlhLnByaWNlUmFuZ2VbMF1cblx0bGV0IG1heF9mZWVzID0gZmlsdGVyQ3JpdGVyaWEucHJpY2VSYW5nZVsxXVxuXHRsZXQgc29ydF9vbiA9IGZpbHRlckNyaXRlcmlhLnNvcnRfb24gfHwgXCJcIlxuXHRsZXQgaXNfYXZhaWxhYmxlID0gZmlsdGVyQ3JpdGVyaWEuaXNfYXZhaWxhYmxlXG5cdGxldCBpc19mZW1hbGUgPSBmaWx0ZXJDcml0ZXJpYS5pc19mZW1hbGVcblxuXHRsZXQgdXJsID0gYC9hcGkvdjEvZG9jdG9yL2RvY3RvcnNlYXJjaD9zcGVjaWFsaXphdGlvbl9pZHM9JHtzcGVjaWFsaXphdGlvbl9pZHN9JnNpdHNfYXQ9JHtzaXRzX2F0fSZsYXRpdHVkZT0ke2xhdH0mbG9uZ2l0dWRlPSR7bG9uZ30mbWluX2ZlZXM9JHttaW5fZmVlc30mbWF4X2ZlZXM9JHttYXhfZmVlc30mc29ydF9vbj0ke3NvcnRfb259JmlzX2F2YWlsYWJsZT0ke2lzX2F2YWlsYWJsZX0maXNfZmVtYWxlPSR7aXNfZmVtYWxlfWBcblxuXHRkaXNwYXRjaCh7XG5cdFx0dHlwZTogRE9DVE9SX1NFQVJDSF9TVEFSVCxcblx0XHRwYXlsb2FkOiBudWxsXG5cdH0pXG5cblx0cmV0dXJuIEFQSV9HRVQodXJsKS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuXG5cdFx0ZGlzcGF0Y2goe1xuXHRcdFx0dHlwZTogQVBQRU5EX0RPQ1RPUlMsXG5cdFx0XHRwYXlsb2FkOiByZXNwb25zZVxuXHRcdH0pXG5cblx0XHRkaXNwYXRjaCh7XG5cdFx0XHR0eXBlOiBET0NUT1JfU0VBUkNILFxuXHRcdFx0cGF5bG9hZDogcmVzcG9uc2Vcblx0XHR9KVxuXG5cdFx0aWYgKG1lcmdlU3RhdGUpIHtcblx0XHRcdGRpc3BhdGNoKHtcblx0XHRcdFx0dHlwZTogTUVSR0VfU0VBUkNIX1NUQVRFX09QRCxcblx0XHRcdFx0cGF5bG9hZDoge1xuXHRcdFx0XHRcdHNlYXJjaFN0YXRlLFxuXHRcdFx0XHRcdGZpbHRlckNyaXRlcmlhXG5cdFx0XHRcdH1cblx0XHRcdH0pXG5cdFx0fVxuXG5cdH0pLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xuXG5cdH0pXG59XG5cbmV4cG9ydCBjb25zdCBnZXREb2N0b3JCeUlkID0gKGRvY3RvcklkKSA9PiAoZGlzcGF0Y2gpID0+IHtcblxuXHRyZXR1cm4gQVBJX0dFVChgL2FwaS92MS9kb2N0b3IvcHJvZmlsZXVzZXJ2aWV3LyR7ZG9jdG9ySWR9YCkudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcblxuXHRcdGRpc3BhdGNoKHtcblx0XHRcdHR5cGU6IEFQUEVORF9ET0NUT1JTLFxuXHRcdFx0cGF5bG9hZDogW3Jlc3BvbnNlXVxuXHRcdH0pXG5cblx0fSkuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSB7XG5cblx0fSlcbn1cblxuZXhwb3J0IGNvbnN0IGdldFRpbWVTbG90cyA9IChkb2N0b3JJZCwgY2xpbmljSWQsIGNhbGxiYWNrKSA9PiAoZGlzcGF0Y2gpID0+IHtcblx0cmV0dXJuIEFQSV9HRVQoYC9hcGkvdjEvZG9jdG9yL2RvY3RvcnRpbWluZz9kb2N0b3JfaWQ9JHtkb2N0b3JJZH0maG9zcGl0YWxfaWQ9JHtjbGluaWNJZH1gKS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuXHRcdGNhbGxiYWNrKHJlc3BvbnNlKVxuXHR9KS5jYXRjaChmdW5jdGlvbiAoZXJyb3IpIHtcblxuXHR9KVxufVxuIiwiaW1wb3J0IHsgU0VMRUNUX0xPQ0FUSU9OX09QRCwgTUVSR0VfU0VBUkNIX1NUQVRFX09QRCwgVE9HR0xFX09QRF9DUklURVJJQSwgTE9BRF9TRUFSQ0hfQ1JJVEVSSUFfT1BELCBTRUxFQ1RfTE9DQVRJT05fRElBR05PU0lTIH0gZnJvbSAnLi4vLi4vY29uc3RhbnRzL3R5cGVzJztcbmltcG9ydCB7IEFQSV9HRVQgfSBmcm9tICcuLi8uLi9hcGkvYXBpLmpzJztcblxuXG5leHBvcnQgY29uc3QgbG9hZE9QRENvbW1vbkNyaXRlcmlhID0gKCkgPT4gKGRpc3BhdGNoKSA9PiB7XG5cbiAgICByZXR1cm4gQVBJX0dFVCgnL2FwaS92MS9kb2N0b3Ivc2VhcmNoZWRpdGVtcycpLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgIGRpc3BhdGNoKHtcbiAgICAgICAgICAgIHR5cGU6IExPQURfU0VBUkNIX0NSSVRFUklBX09QRCxcbiAgICAgICAgICAgIHBheWxvYWQ6IHJlc3BvbnNlXG4gICAgICAgIH0pXG4gICAgfSkuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICAgIGRpc3BhdGNoKHtcbiAgICAgICAgICAgIHR5cGU6IExPQURfU0VBUkNIX0NSSVRFUklBX09QRCxcbiAgICAgICAgICAgIHBheWxvYWQ6IG51bGxcbiAgICAgICAgfSlcbiAgICB9KVxuXG59XG5cbmV4cG9ydCBjb25zdCB0b2dnbGVPUERDcml0ZXJpYSA9ICh0eXBlLCBjcml0ZXJpYSkgPT4gKGRpc3BhdGNoKSA9PiB7XG4gICAgZGlzcGF0Y2goe1xuICAgICAgICB0eXBlOiBUT0dHTEVfT1BEX0NSSVRFUklBLFxuICAgICAgICBwYXlsb2FkOiB7XG4gICAgICAgICAgICB0eXBlLCBjcml0ZXJpYVxuICAgICAgICB9XG4gICAgfSlcblxufVxuXG5leHBvcnQgY29uc3Qgc2VsZWN0TG9jYXRpb24gPSAobG9jYXRpb24pID0+IChkaXNwYXRjaCkgPT4ge1xuICAgIGRpc3BhdGNoKHtcbiAgICAgICAgdHlwZTogU0VMRUNUX0xPQ0FUSU9OX09QRCxcbiAgICAgICAgcGF5bG9hZDogbG9jYXRpb25cbiAgICB9KVxuXG4gICAgZGlzcGF0Y2goe1xuICAgICAgICB0eXBlOiBTRUxFQ1RfTE9DQVRJT05fRElBR05PU0lTLFxuICAgICAgICBwYXlsb2FkOiBsb2NhdGlvblxuICAgIH0pXG5cbn1cblxuZXhwb3J0IGNvbnN0IGdldE9QRENyaXRlcmlhUmVzdWx0cyA9IChzZWFyY2hTdHJpbmcsIGNhbGxiYWNrKSA9PiAoZGlzcGF0Y2gpID0+IHtcbiAgICBcbiAgICBBUElfR0VUKGAvYXBpL3YxL2RpYWdub3N0aWMvdGVzdD9uYW1lPSR7c2VhcmNoU3RyaW5nfWApLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgIGNhbGxiYWNrKHJlc3BvbnNlKVxuICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICBjYWxsYmFjayhudWxsKVxuICAgIH0pXG59XG4iLCJpbXBvcnQgQXhpb3MgZnJvbSAnYXhpb3MnXG5pbXBvcnQgU1RPUkFHRSBmcm9tICcuLi9oZWxwZXJzL3N0b3JhZ2UnXG5pbXBvcnQgTkFWSUdBVEUgZnJvbSAnLi4vaGVscGVycy9uYXZpZ2F0ZSdcblxubGV0IGF4aW9zSW5zdGFuY2UgPSBBeGlvcy5jcmVhdGUoe1xuICAgIGJhc2VVUkw6ICdodHRwczovL3FhLnBhbmFjZWF0ZWNobm8uY29tJyxcbiAgICBoZWFkZXI6IHt9XG59KTtcblxuZnVuY3Rpb24gcmVqZWN0SGFuZGxlcihyZXNwb25zZSwgY2FsbGJhY2spIHtcbiAgICBjb25zb2xlLmxvZyhyZXNwb25zZSlcbiAgICAvLyBpZiAocmVzcG9uc2UgJiYgcmVzcG9uc2UucmVzcG9uc2UgJiYgcmVzcG9uc2UucmVzcG9uc2Uuc3RhdHVzID09IDQwMSkge1xuICAgIC8vICAgICBTVE9SQUdFLmRlbGV0ZUF1dGgoKS50aGVuKCgpID0+IHtcbiAgICAvLyAgICAgICAgIC8vIHNlbmQgdG8gbG9naW4gcGFnZVxuICAgIC8vICAgICAgICAgTkFWSUdBVEUubmF2aWdhdGVUbygnLycpXG4gICAgLy8gICAgIH0pXG4gICAgLy8gfVxuXG4gICAgY2FsbGJhY2socmVzcG9uc2UpXG59XG5cbmV4cG9ydCBjb25zdCBBUElfR0VUID0gKHVybCkgPT4ge1xuICAgIHJldHVybiBTVE9SQUdFLmdldEF1dGhUb2tlbigpLnRoZW4oKHRva2VuKSA9PiB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBheGlvc0luc3RhbmNlKHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdnZXQnLFxuICAgICAgICAgICAgICAgIHVybDogdXJsLFxuICAgICAgICAgICAgICAgIC8vIGhlYWRlcnM6IHsgJ0F1dGhvcml6YXRpb24nOiBgVG9rZW4gJHt0b2tlbn1gIH1cbiAgICAgICAgICAgIH0pLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICAgICAgICAgIHJlc29sdmUocmVzLmRhdGEpXG4gICAgICAgICAgICB9LCAocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICByZWplY3RIYW5kbGVyKHJlc3BvbnNlLCByZWplY3QpXG4gICAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgIH0pXG5cblxufVxuZXhwb3J0IGNvbnN0IEFQSV9QT1NUID0gKHVybCwgZGF0YSkgPT4ge1xuICAgIHJldHVybiBTVE9SQUdFLmdldEF1dGhUb2tlbigpLnRoZW4oKHRva2VuKSA9PiB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBheGlvc0luc3RhbmNlKHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdwb3N0JyxcbiAgICAgICAgICAgICAgICB1cmw6IHVybCxcbiAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgICAgIGhlYWRlcnM6IHsgJ0F1dGhvcml6YXRpb24nOiBgVG9rZW4gJHt0b2tlbn1gIH1cbiAgICAgICAgICAgIH0pLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICAgICAgICAgIHJlc29sdmUocmVzLmRhdGEpXG4gICAgICAgICAgICB9LCAocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICByZWplY3RIYW5kbGVyKHJlc3BvbnNlLCByZWplY3QpXG4gICAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgIH0pXG5cblxufVxuXG5leHBvcnQgY29uc3QgQVBJX1BVVCA9ICh1cmwsIGRhdGEpID0+IHtcbiAgICByZXR1cm4gU1RPUkFHRS5nZXRBdXRoVG9rZW4oKS50aGVuKCh0b2tlbikgPT4ge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgYXhpb3NJbnN0YW5jZSh7XG4gICAgICAgICAgICAgICAgbWV0aG9kOiAncHV0JyxcbiAgICAgICAgICAgICAgICB1cmw6IHVybCxcbiAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgICAgIGhlYWRlcnM6IHsgJ0F1dGhvcml6YXRpb24nOiBgVG9rZW4gJHt0b2tlbn1gIH1cbiAgICAgICAgICAgIH0pLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICAgICAgICAgIHJlc29sdmUocmVzLmRhdGEpXG4gICAgICAgICAgICB9LCAocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICByZWplY3RIYW5kbGVyKHJlc3BvbnNlLCByZWplY3QpXG4gICAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgIH0pXG5cblxufVxuXG5leHBvcnQgY29uc3QgQVBJX0RFTEVURSA9ICh1cmwpID0+IHtcbiAgICByZXR1cm4gU1RPUkFHRS5nZXRBdXRoVG9rZW4oKS50aGVuKCh0b2tlbikgPT4ge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgYXhpb3NJbnN0YW5jZSh7XG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnZGVsZXRlJyxcbiAgICAgICAgICAgICAgICB1cmw6IHVybCxcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiB7ICdBdXRob3JpemF0aW9uJzogYFRva2VuICR7dG9rZW59YCB9XG4gICAgICAgICAgICB9KS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgICAgICAgICByZXNvbHZlKHJlcy5kYXRhKVxuICAgICAgICAgICAgfSwgKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgcmVqZWN0SGFuZGxlcihyZXNwb25zZSwgcmVqZWN0KVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICB9KVxuXG59IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuY2xhc3MgSG9tZVZpZXcgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgIH1cblxuICAgIG5hdmlnYXRlVG8od2hlcmUpe1xuICAgICAgICB0aGlzLnByb3BzLmhpc3RvcnkucHVzaCh3aGVyZSlcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgPGhlYWRlciBjbGFzc05hbWU9XCJza2luLXByaW1hcnkgZml4ZWQgaG9yaXpvbnRhbCB0b3BcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250YWluZXItZmx1aWRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtNFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImhlYWRlci10aXRsZSBmdy03MDAgY2FwaXRhbGl6ZSB0ZXh0LXdoaXRlXCI+SUNPTjwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLTRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC00XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx1bCBjbGFzc05hbWU9XCJpbmxpbmUtbGlzdCBmbG9hdC1yaWdodCB1c2VyLW5vdGlmaWNhdGlvbi1hY3Rpb25cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaT48c3BhbiBjbGFzc05hbWU9XCJpY29uIGljb24tbWQgdGV4dC1taWRkbGVcIj48aW1nIHNyYz1cIi9hc3NldHMvaW1nL2N1c3RvbWVyLWljb25zL3VzZXIuc3ZnXCIgY2xhc3NOYW1lPVwiaW1nLWZsdWlkXCIgLz48L3NwYW4+PC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaT48c3BhbiBjbGFzc05hbWU9XCJpY29uIGljb24tbWQgdGV4dC1taWRkbGUgbm90aWZpY2F0aW9uLWljb25cIj48aW1nIHNyYz1cIi9hc3NldHMvaW1nL2N1c3RvbWVyLWljb25zL25vdGlmaWNhdGlvbi5zdmdcIiBjbGFzc05hbWU9XCJpbWctZmx1aWRcIiAvPiA8c3BhbiBjbGFzc05hbWU9XCJub3RpZmljYXRpb24tYWxlcnRcIiAvPjwvc3Bhbj48L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvaGVhZGVyPlxuICAgICAgICAgICAgICAgIDxzZWN0aW9uIGNsYXNzTmFtZT1cIndyYXAgY3QtaG9tZS1zY3JlZW5cIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250YWluZXItZmx1aWRcIj5cblxuXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLTEyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwid2lkZ2V0IG1ydC0xMCBjdC1wcm9maWxlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7LyogPGRpdiBjbGFzc05hbWU9XCJ3aWRnZXQtY29udGVudCBjdC1wcm9maWxlLWluZm9cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImN0LWltZyBjdC1pbWctbWQgY3QtcHJvZmlsZS1pY29uXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbWcgc3JjPVwiL2Fzc2V0cy9pbWcvY3VzdG9tZXItaWNvbnMvY2FsYW5kZXIuc3ZnXCIgY2xhc3NOYW1lPVwiaW1nLWZsdWlkXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImN0LWNvbnRlbnQgcm9vdC1tYXAtZmllbGRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwiZnctNTAwIHRleHQtbWRcIj5BcHBvaW5tZW50IGZvciBBcnVuIEt1bWFyIDwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGg0IGNsYXNzTmFtZT1cIndpZGdldC10aXRsZSBybS10aXRsZVwiPlJpc2hhYmggTWVocm90cmE8L2g0PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJmdy01MDAgdGV4dC1tZCBkci13aXRoXCI+V2l0aCBEci4gQW5nZWxhIFNtaXRoPC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvb3QtbWFwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW1nIHNyYz1cIi9hc3NldHMvaW1nL2N1c3RvbWVyLWljb25zL21hcC1yb290LnN2Z1wiIGNsYXNzTmFtZT1cImltZy1mbHVpZFwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj5OYXZpZ2F0ZTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj4gKi99XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cblxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC02XCIgb25DbGljaz17dGhpcy5uYXZpZ2F0ZVRvLmJpbmQodGhpcywnL29wZCcpfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3aWRnZXRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwid2lkZ2V0LWNvbnRlbnQgdGV4dC1jZW50ZXIgYm9va2VkLWRyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjdC1pbWcgY3QtaW1nLWxnIHN0YXRoLWltZ1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW1nIHNyYz1cIi9hc3NldHMvaW1nL2N1c3RvbWVyLWljb25zL3N0ZXRoLnN2Z1wiIGNsYXNzTmFtZT1cImltZy1mbHVpZCBzdGF0aC1pbWdcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoNCBjbGFzc05hbWU9XCJ0ZXh0LW1kIGZ3LTUwMFwiPkJvb2sgYW5kIFZpc2l0IGEgRG9jdG9yPC9oND5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC02XCIgb25DbGljaz17dGhpcy5uYXZpZ2F0ZVRvLmJpbmQodGhpcywnL2R4Jyl9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIndpZGdldFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3aWRnZXQtY29udGVudCB0ZXh0LWNlbnRlciBib29rZWQtZHJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImN0LWltZyBjdC1pbWctbGcgc3RhdGgtaW1nXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbWcgc3JjPVwiL2Fzc2V0cy9pbWcvY3VzdG9tZXItaWNvbnMvbWVkaWNhbC10ZXN0LnN2Z1wiIGNsYXNzTmFtZT1cImltZy1mbHVpZCBzdGF0aC1pbWdcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoNCBjbGFzc05hbWU9XCJ0ZXh0LW1kIGZ3LTUwMFwiPkJvb2sgbWVkaWNhbCB0ZXN0PC9oND5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC0xMlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIndpZGdldCBjb25zdWx0YW50LXF1aWNrXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIndpZGdldC1oZWFkZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDQgY2xhc3NOYW1lPVwid2lkZ2V0LXRpdGxlIGZ3LTcwMCB0ZXh0LWxnIHRleHQtY2VudGVyXCI+R2V0IGluc3RhbnQgQ29uc3VsdGF0aW9uIHJpZ2h0IG5vdyBmb3IgPGEgaHJlZj1cIiNcIiBjbGFzc05hbWU9XCJsaW5rLXRleHRcIj5GUkVFPC9hPjwvaDQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwid2lkZ2V0LWNvbnRlbnQgdGV4dC1jZW50ZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC02XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJjdC1pbWcgY3QtaW1nLXNtXCI+PGltZyBzcmM9XCIvYXNzZXRzL2ltZy9jdXN0b21lci1pY29ucy9tZXNzYWdlLnN2Z1wiIGNsYXNzTmFtZT1cImltZy1mbHVpZFwiIC8+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtNlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiY3QtaW1nIGN0LWltZy1zbVwiPjxpbWcgc3JjPVwiL2Fzc2V0cy9pbWcvY3VzdG9tZXItaWNvbnMvY2FsbC5zdmdcIiBjbGFzc05hbWU9XCJpbWctZmx1aWRcIiAvPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwid2lkZ2V0LWZvb3RlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZW5xLXN1Z2dlc3Rpb25cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHVsIGNsYXNzTmFtZT1cImlubGluZS1saXN0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGk+PGEgaHJlZj1cIiNcIiBjbGFzc05hbWU9XCJ2LWJ0biB2LWJ0bi1wcmltYXJ5IG91dGxpbmUgcm91bmQtdGFnXCI+SGVhZGFjaGU8L2E+PC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaT48YSBocmVmPVwiI1wiIGNsYXNzTmFtZT1cInYtYnRuIHYtYnRuLXByaW1hcnkgb3V0bGluZSByb3VuZC10YWdcIj5IZWFkYWNoZTwvYT48L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpPjxhIGhyZWY9XCIjXCIgY2xhc3NOYW1lPVwidi1idG4gdi1idG4tcHJpbWFyeSBvdXRsaW5lIHJvdW5kLXRhZ1wiPkhlYWRhY2hlPC9hPjwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtMTJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3aWRnZXRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwid2lkZ2V0LWNvbnRlbnRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBjbGFzc05hbWU9XCJmYy1pbnB1dCBpbnB1dC1saW5lXCIgcGxhY2Vob2xkZXI9XCJJIGFtIHN1ZmZlcmluZyBmb3JtIGhlYWRhY2hlXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L3NlY3Rpb24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEhvbWVWaWV3XG4iLCJpbXBvcnQgSG9tZVZpZXcgZnJvbSAnLi9Ib21lVmlldydcblxuZXhwb3J0IGRlZmF1bHQgSG9tZVZpZXciLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgeyBDaXJjdWxhclByb2dyZXNzIH0gZnJvbSAnbWF0ZXJpYWwtdWkvUHJvZ3Jlc3MnO1xuXG5jbGFzcyBMb2FkZXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsb2FkZXJDaXJjdWxhclwiPlxuICAgICAgICAgICAgICAgIDxDaXJjdWxhclByb2dyZXNzIGNsYXNzTmFtZT17XCJsb2FkZXJhY3R1YWxcIn0gc2l6ZT17NTB9IHRoaWNrbmVzcz17M30gLz5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICk7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBMb2FkZXJcbiIsImltcG9ydCBMb2FkZXIgZnJvbSAnLi9Mb2FkZXInXG5cbmV4cG9ydCBkZWZhdWx0IExvYWRlciIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmNsYXNzIFVzZXJMb2dpblZpZXcgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgcGhvbmVOdW1iZXI6ICcnLFxuICAgICAgICAgICAgdmFsaWRhdGlvbkVycm9yOiAnJ1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaW5wdXRIYW5kbGVyKGUpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IFtlLnRhcmdldC5uYW1lXTogZS50YXJnZXQudmFsdWUgfSlcbiAgICB9XG5cbiAgICBzdWJtaXRPVFBSZXF1ZXN0KG51bWJlcikge1xuXG4gICAgICAgIGlmIChudW1iZXIubWF0Y2goL15bNzg5XXsxfVswLTldezl9JC8pKSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgdmFsaWRhdGlvbkVycm9yOiBcIlwiIH0pXG4gICAgICAgICAgICB0aGlzLnByb3BzLnNlbmRPVFAobnVtYmVyLCAoZXhpc3RzKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5oaXN0b3J5LnJlcGxhY2UoJy9vdHAvdmVyaWZ5P2V4aXN0cz0keyEhZXhpc3RzfScpXG4gICAgICAgICAgICB9KVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHZhbGlkYXRpb25FcnJvcjogXCJQbGVhc2UgcHJvdmlkZSBhIHZhbGlkIG51bWJlciAoMTAgZGlnaXRzKVwiIH0pXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgPGhlYWRlciBjbGFzc05hbWU9XCJza2luLXdoaXRlIGZpeGVkIGhvcml6b250YWwgdG9wIGJkci0xIGJvdHRvbSBsaWdodFwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lci1mbHVpZFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC0yXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx1bCBjbGFzc05hbWU9XCJpbmxpbmUtbGlzdFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpPjxzcGFuIGNsYXNzTmFtZT1cImljb24gaWNvbi1zbSB0ZXh0LW1pZGRsZSBiYWNrLWljb24td2hpdGVcIj48aW1nIHNyYz1cIi9hc3NldHMvaW1nL2N1c3RvbWVyLWljb25zL2JhY2staWNvbi5wbmdcIiBjbGFzc05hbWU9XCJpbWctZmx1aWRcIiAvPjwvc3Bhbj48L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLThcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJoZWFkZXItdGl0bGUgZnctNzAwIGNhcGl0YWxpemUgdGV4dC1jZW50ZXJcIj5SZWdpc3RyYXRpb24vTG9naW48L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC0yXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9oZWFkZXI+XG4gICAgICAgICAgICAgICAgPHNlY3Rpb24gY2xhc3NOYW1lPVwid3JhcCBtb2JpbGUtdmVyaWZpY2F0aW9uLXNjcmVlblwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIndpZGdldCBuby1zaGFkb3cgbm8tcm91bmRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwid2lkZ2V0LWhlYWRlciB0ZXh0LWNlbnRlciBtdi1oZWFkZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDQgY2xhc3NOYW1lPVwiZnctNzAwIHRleHQtbWRcIj5FbnRlciB5b3VyIE1vYmlsZSBOdW1iZXIgPGJyIC8+IHRvIGNvbnRpbnVlPC9oND5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3aWRnZXQtY29udGVudCB0ZXh0LWNlbnRlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9iaWxlLXZlcmlmaWNhdGlvblwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInZlcmlmaS1tb2ItaW9jbiB0ZXh0LWNlbnRlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGltZyBzcmM9XCIvYXNzZXRzL2ltZy9jdXN0b21lci1pY29ucy9tb2Iuc3ZnXCIgY2xhc3NOYW1lPVwiaW1nLWZsdWlkXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwIG1vYmlsZS1maWVsZFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkb24tZ3JvdXAgZW50ZXItbW9iaWxlLW51bWJlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgY2xhc3NOYW1lPVwiZmMtaW5wdXQgdGV4dC1jZW50ZXJcIiBwbGFjZWhvbGRlcj1cIjIzNFhYWFhYWFwiIHZhbHVlPXt0aGlzLnN0YXRlLnBob25lTnVtYmVyfSBvbkNoYW5nZT17dGhpcy5pbnB1dEhhbmRsZXIuYmluZCh0aGlzKX0gbmFtZT1cInBob25lTnVtYmVyXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImVycm9yTWVzc2FnZVwiPnt0aGlzLnByb3BzLmVycm9yX21lc3NhZ2V9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZXJyb3JNZXNzYWdlXCI+e3RoaXMuc3RhdGUudmFsaWRhdGlvbkVycm9yfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9zZWN0aW9uPlxuICAgICAgICAgICAgICAgIDxidXR0b24gb25DbGljaz17dGhpcy5zdWJtaXRPVFBSZXF1ZXN0LmJpbmQodGhpcyx0aGlzLnN0YXRlLnBob25lTnVtYmVyKX0gZGlzYWJsZWQ9e3RoaXMucHJvcHMub3RwX3JlcXVlc3Rfc2VudH0gY2xhc3NOYW1lPVwidi1idG4gdi1idG4tcHJpbWFyeSBidG4tbGcgZml4ZWQgaG9yaXpvbnRhbCBib3R0b20gbm8tcm91bmQgYnRuLWxnIHRleHQtbGdcIj5Db250aW51ZTwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IFVzZXJMb2dpblZpZXdcbiIsImltcG9ydCBVc2VyTG9naW5WaWV3IGZyb20gJy4vVXNlckxvZ2luJ1xuXG5leHBvcnQgZGVmYXVsdCBVc2VyTG9naW5WaWV3IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuY29uc3QgSWZyYW1TdHlsZSA9IHtcbiAgICB3aWR0aDogJzEwMCUnLFxuICAgIGhlaWdodDogJ2NhbGMoMTAwdmggLSA2MHB4KSdcbn1cblxuXG5jbGFzcyBDaGF0VmlldyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG5cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN0YXRpYyBjb250ZXh0VHlwZXMgPSB7XG4gICAgICAgIHJvdXRlcjogKCkgPT4gbnVsbFxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsb2NhdGlvblNlbGVjdG9yXCI+XG4gICAgICAgICAgICAgICAgPGlmcmFtZSBzcmM9XCJodHRwOi8vY2hhdGJvdC5wb2xpY3liYXphYXIuY29tL2xpdmVjaGF0XCIgc3R5bGU9e0lmcmFtU3R5bGV9PjwvaWZyYW1lPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IENoYXRWaWV3XG4iLCJpbXBvcnQgQ2hhdFZpZXcgZnJvbSAnLi9DaGF0Vmlldy5qcydcblxuZXhwb3J0IGRlZmF1bHQgQ2hhdFZpZXciLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgQ2hpcCBmcm9tICdtYXRlcmlhbC11aS9DaGlwJztcblxuXG5jbGFzcyBDb21tb25seVNlYXJjaGVkIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcblxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIGxldCByb3dzID0gdGhpcy5wcm9wcy5kYXRhLm1hcCgocm93LGkpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByb3BzLnR5cGUgPT0gJ2xhYicpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gPGxpIGtleT17aX0+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJjdC1pbWcgbGFiLWltZ1wiXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbWcgc3JjPVwiL2Fzc2V0cy9pbWcvY3VzdG9tZXItaWNvbnMvbGFiMS5wbmdcIiBjbGFzc05hbWU9XCJpbWctZmx1aWRcIiAvPlxuICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cImxhYi1uYW1lXCI+U0xSIERpZ25vc3RpY3M8L3A+XG4gICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbGV0IHNlbGVjdGVkID0gZmFsc2VcbiAgICAgICAgICAgICAgICB0aGlzLnByb3BzLnNlbGVjdGVkLm1hcCgoY3VycikgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZihjdXJyLmlkID09IHJvdy5pZCl7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZCA9IHRydWVcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgcmV0dXJuIDxsaSBrZXk9e2l9PlxuICAgICAgICAgICAgICAgICAgICA8YVxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtzZWxlY3RlZCA/IFwidi1idG4gdi1idG4tcHJpbWFyeSB0YWctc20gb3V0bGluZSBzZWxlY3RlZFwiIDogXCJ2LWJ0biB2LWJ0bi1wcmltYXJ5IHRhZy1zbSBvdXRsaW5lXCJ9XG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMudG9nZ2xlKCh0aGlzLnByb3BzLnR5cGUgfHwgcm93LnR5cGUpLCByb3cpXG4gICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICB7cm93Lm5hbWV9XG4gICAgICAgICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0pXG5cbiAgICAgICAgbGV0IGRpdkNsYXNzID0gYHBhbmVsLWNvbnRlbnRgXG4gICAgICAgIGxldCB1bENsYXNzID0gYGlubGluZS1saXN0YFxuXG4gICAgICAgIGlmICh0aGlzLnByb3BzLnR5cGUgPT0gJ2xhYicpIHtcbiAgICAgICAgICAgIGRpdkNsYXNzID0gYHBhbmVsLWNvbnRlbnQgdG90YWwtbGFic2BcbiAgICAgICAgICAgIHVsQ2xhc3MgPSBgaW5saW5lLWxpc3QgbGFiLWl0ZW1zYFxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3aWRnZXQtcGFuZWxcIj5cbiAgICAgICAgICAgICAgICA8aDQgY2xhc3NOYW1lPVwicGFuZWwtdGl0bGVcIj57dGhpcy5wcm9wcy5oZWFkaW5nfTwvaDQ+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2RpdkNsYXNzfT5cbiAgICAgICAgICAgICAgICAgICAgPHVsIGNsYXNzTmFtZT17dWxDbGFzc30+XG4gICAgICAgICAgICAgICAgICAgICAgICB7cm93c31cbiAgICAgICAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBDb21tb25seVNlYXJjaGVkXG4iLCJpbXBvcnQgQ29tbW9ubHlTZWFyY2hlZCBmcm9tICcuL0NvbW1vbmx5U2VhcmNoZWQuanMnXG5cblxuZXhwb3J0IGRlZmF1bHQgQ29tbW9ubHlTZWFyY2hlZCIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBsaWdodEJhc2VUaGVtZSB9IGZyb20gJ21hdGVyaWFsLXVpL3N0eWxlcyc7XG5pbXBvcnQgTG9hZGVyIGZyb20gJy4uLy4uL2NvbW1vbnMvTG9hZGVyJ1xuXG5jb25zdCBkZWJvdW5jZXIgPSAoZm4sIGRlbGF5KSA9PiB7XG4gICAgbGV0IHRpbWVyID0gbnVsbFxuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aW1lcilcbiAgICAgICAgdGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIGZuLmNhbGwodGhpcylcbiAgICAgICAgfSwgZGVsYXkpXG4gICAgfVxufVxuXG5cbmNsYXNzIENyaXRlcmlhU2VhcmNoVmlldyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgICBzZWFyY2hWYWx1ZTogJycsXG4gICAgICAgICAgICBzZWFyY2hSZXN1bHRzOiBbXVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIHRoaXMuZ2V0U2VhcmNoUmVzdWx0cyA9IGRlYm91bmNlcih0aGlzLmdldFNlYXJjaFJlc3VsdHMuYmluZCh0aGlzKSwgMTAwMClcbiAgICAgICAgbGV0IGlucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RvcENyaXRlcmlhU2VhcmNoJylcbiAgICAgICAgLy8gaW5wdXQuZm9jdXMoKVxuICAgIH1cblxuICAgIGlucHV0SGFuZGxlcihlKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBzZWFyY2hWYWx1ZTogZS50YXJnZXQudmFsdWUgfSlcbiAgICAgICAgdGhpcy5nZXRTZWFyY2hSZXN1bHRzKClcbiAgICB9XG5cbiAgICBnZXRTZWFyY2hSZXN1bHRzKCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy50eXBlID09ICdvcGQnKSB7XG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMuZ2V0RGlhZ25vc2lzQ3JpdGVyaWFSZXN1bHRzKHRoaXMuc3RhdGUuc2VhcmNoVmFsdWUsIChzZWFyY2hSZXN1bHRzKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHNlYXJjaFJlc3VsdHMpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRlc3RzID0gc2VhcmNoUmVzdWx0cy50ZXN0cy5tYXAoeCA9PiB7IHJldHVybiB7IC4uLngsIHR5cGU6ICd0ZXN0JyB9IH0pXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBzZWFyY2hSZXN1bHRzOiBbLi4udGVzdHNdIH0pXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFkZENyaXRlcmlhKGNyaXRlcmlhKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLnR5cGUgPT0gJ29wZCcpIHtcblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy50b2dnbGVEaWFnbm9zaXNDcml0ZXJpYShjcml0ZXJpYS50eXBlLCBjcml0ZXJpYSlcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBzZWFyY2hWYWx1ZTogXCJcIiB9KVxuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgbGV0IGxvY2F0aW9uID0gXCJHdXJnYW9uXCJcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuc2VsZWN0ZWRMb2NhdGlvbikge1xuICAgICAgICAgICAgbG9jYXRpb24gPSB0aGlzLnByb3BzLnNlbGVjdGVkTG9jYXRpb24uZm9ybWF0dGVkX2FkZHJlc3Muc2xpY2UoMCwgNSlcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIDxoZWFkZXIgY2xhc3NOYW1lPVwic2tpbi1wcmltYXJ5IGZpeGVkIGhvcml6b250YWwgdG9wIGN0LWhlYWRlclwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lci1mbHVpZFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC0xMlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm5hdmlnYXRlLXJvd1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHVsIGNsYXNzTmFtZT1cImlubGluZS1saXN0IHRvcC1uYXYgYWxwaGEtYnggdGV4dC13aGl0ZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnByb3BzLmhpc3RvcnkuZ28oLTEpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGk+PHNwYW4gY2xhc3NOYW1lPVwiY3QtaW1nIGN0LWltZy1zbSBhcnJvdy1pbWdcIj48aW1nIHNyYz1cIi9hc3NldHMvaW1nL2N1c3RvbWVyLWljb25zL2xlZnQtYXJyb3cuc3ZnXCIgY2xhc3NOYW1lPVwiaW1nLWZsdWlkXCIgLz48L3NwYW4+PC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGk+PGRpdiBjbGFzc05hbWU9XCJzY3JlZW4tdGl0bGVcIj5TZWFyY2g8L2Rpdj48L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx1bCBjbGFzc05hbWU9XCJpbmxpbmUtbGlzdCB0b3AtbmF2IGJldGEtYnggZmxvYXQtcmlnaHQgdGV4dC1yaWdodCB0ZXh0LXdoaXRlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuaGlzdG9yeS5wdXNoKCcvbG9jYXRpb25zZWFyY2gnKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpPjxkaXYgY2xhc3NOYW1lPVwic2NyZWVuLXRpdGxlXCI+PHNwYW4gY2xhc3NOYW1lPVwiY3QtaW1nIGN0LWltZy1zbSBtYXAtbWFya2VyLWltZ1wiPjxpbWcgc3JjPVwiL2Fzc2V0cy9pbWcvY3VzdG9tZXItaWNvbnMvbWFwLW1hcmtlci5zdmdcIiBjbGFzc05hbWU9XCJpbWctZmx1aWRcIiAvPjwvc3Bhbj4ge2xvY2F0aW9ufTwvZGl2PjwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC0xMlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNlYXJjaC1yb3dcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRvbi1ncm91cFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGNsYXNzTmFtZT1cImZvcm0tY29udHJvbCBpbnB1dC1tZCBzZWFyY2gtaW5wdXRcIiBpZD1cInRvcENyaXRlcmlhU2VhcmNoXCIgb25DaGFuZ2U9e3RoaXMuaW5wdXRIYW5kbGVyLmJpbmQodGhpcyl9IHZhbHVlPXt0aGlzLnN0YXRlLnNlYXJjaFZhbHVlfSBwbGFjZWhvbGRlcj17dGhpcy5wcm9wcy50aXRsZX0gLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJjdC1pbWcgY3QtaW1nLXNtIHNlYXJjaC1pY29uXCI+PGltZyBzcmM9XCIvYXNzZXRzL2ltZy9jdXN0b21lci1pY29ucy9zZWFyY2gtaWNvbi5zdmdcIiAvPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2hlYWRlcj5cblxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZS5zZWFyY2hWYWx1ZSA/XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzZWN0aW9uIGNsYXNzTmFtZT1cIndyYXAgd3JhcC0xMDBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIndpZGdldC1wYW5lbFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDQgY2xhc3NOYW1lPVwicGFuZWwtdGl0bGVcIj5TZWFyY2ggUmVzdWx0PC9oND5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwYW5lbC1jb250ZW50XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dWwgY2xhc3NOYW1lPVwibGlzdCBzZWFyY2gtcmVzdWx0LWxpc3RcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUuc2VhcmNoUmVzdWx0cy5tYXAoKGN1cnIsIGkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiA8bGkgb25DbGljaz17dGhpcy5hZGRDcml0ZXJpYS5iaW5kKHRoaXMsIGN1cnIpfSBrZXk9e2l9PjxhPntjdXJyLm5hbWV9PC9hPjwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3NlY3Rpb24+XG4gICAgICAgICAgICAgICAgICAgICAgICA6ICh0aGlzLnByb3BzLmNoZWNrRm9yTG9hZCA/IHRoaXMucHJvcHMuY2hpbGRyZW4gOiA8TG9hZGVyIC8+KVxuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IENyaXRlcmlhU2VhcmNoVmlld1xuIiwiaW1wb3J0IENyaXRlcmlhU2VhcmNoVmlldyBmcm9tICcuL0NyaXRlcmlhU2VhcmNoVmlldy5qcydcblxuZXhwb3J0IGRlZmF1bHQgQ3JpdGVyaWFTZWFyY2hWaWV3IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuY2xhc3MgT3RwVmVyaWZ5VmlldyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMucHJvcHMpXG4gICAgICAgIGRlYnVnZ2VyXG4gICAgfVxuXG4gICAgaW5wdXRIYW5kbGVyKGUpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IFtlLnRhcmdldC5uYW1lXTogZS50YXJnZXQudmFsdWUgfSlcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgT3RwVmVyaWZ5Vmlld1xuIiwiaW1wb3J0IE90cFZlcmlmeSBmcm9tICcuL090cFZlcmlmeSdcblxuZXhwb3J0IGRlZmF1bHQgT3RwVmVyaWZ5IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBFbW90aUljb24gZnJvbSAnbWF0ZXJpYWwtdWktaWNvbnMvQWNjb3VudENpcmNsZSc7XG5cbmNsYXNzIFByb2ZpbGVTbGlkZXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgIH1cblxuICAgIHN3aXRjaFVzZXIocHJvZmlsZUlkKSB7XG4gICAgICAgIHRoaXMuY29udGV4dC5yb3V0ZXIuaGlzdG9yeS5wdXNoKGAvdXNlci8ke3Byb2ZpbGVJZH0ke3RoaXMucHJvcHMuc3ViUm91dGV9YClcblxuICAgIH1cblxuICAgIHN0YXRpYyBjb250ZXh0VHlwZXMgPSB7XG4gICAgICAgIHJvdXRlcjogKCkgPT4gbnVsbFxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICBsZXQgcHJvZmlsZXMgPSBbXVxuXG4gICAgICAgIHByb2ZpbGVzID0gT2JqZWN0LmtleXModGhpcy5wcm9wcy5wcm9maWxlcykubWFwKChwcm9maWxlSWQsIGkpID0+IHtcbiAgICAgICAgICAgIGxldCBzcmMgPSB0aGlzLnByb3BzLnByb2ZpbGVzW3Byb2ZpbGVJZF0ucHJvZmlsZUltYWdlIHx8IFwiaHR0cHM6Ly93d3cuYXRvbWl4LmNvbS5hdS9tZWRpYS8yMDE1LzA2L2F0b21peF91c2VyMzEucG5nXCJcbiAgICAgICAgICAgIHJldHVybiA8ZGl2IGtleT17aX0gY2xhc3NOYW1lPVwic2xpZGVUaWxlXCIgb25DbGljaz17dGhpcy5zd2l0Y2hVc2VyLmJpbmQodGhpcywgcHJvZmlsZUlkKX0+XG4gICAgICAgICAgICAgICAgPGltZyBjbGFzc05hbWU9XCJwcm9maWxlQ2FyZEltYWdlXCIgc3JjPXtzcmN9Lz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICB9KVxuXG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicHJvZmlsZVNsaWRlclwiPlxuICAgICAgICAgICAgICAgIHtwcm9maWxlc31cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBQcm9maWxlU2xpZGVyXG4iLCJpbXBvcnQgUHJvZmlsZVNsaWRlciBmcm9tICcuL1Byb2ZpbGVTbGlkZXIuanMnXG5cbmV4cG9ydCBkZWZhdWx0IFByb2ZpbGVTbGlkZXIiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgeyBnZXRUaW1lLCBnZXREYXlOYW1lIH0gZnJvbSAnLi4vLi4vLi4vdXRpbHMvZGF0ZVRpbWVVdGlscy5qcydcblxuY29uc3QgREFZU19UT19TSE9XID0gMjBcbmNvbnN0IFdFRUtfREFZUyA9IFsnUycsICdNJywgJ1QnLCAnVycsICdUJywgJ0YnLCAnUyddXG5jb25zdCBNT05USFMgPSBbJ0phbicsICdGZWInLCAnTWFyJywgJ0FwcmlsJywgJ01heScsICdKdW5lJywgJ0p1bHknLCAnQXVnJywgJ1NlcHQnLCAnT2N0JywgJ05vdicsICdEZWMnXVxuXG5jbGFzcyBUaW1lU2xvdFNlbGVjdG9yIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIHRpbWVTZXJpZXM6IFtdLFxuICAgICAgICAgICAgc2VsZWN0ZWRNb250aDogXCJcIixcbiAgICAgICAgICAgIHNlbGVjdGVkRGF5OiBcIlwiXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgdGhpcy5nZW5lcmF0ZURheXMoKVxuICAgIH1cblxuICAgIGdlbmVyYXRlRGF5cygpIHtcbiAgICAgICAgbGV0IGRheXMgPSBbXVxuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgREFZU19UT19TSE9XOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBvZmZzZXREYXkgPSBuZXcgRGF0ZSgpXG4gICAgICAgICAgICBvZmZzZXREYXkuc2V0RGF0ZShvZmZzZXREYXkuZ2V0RGF0ZSgpICsgaSlcbiAgICAgICAgICAgIGxldCB3ZWVrRGF5ID0gb2Zmc2V0RGF5LmdldERheSgpXG5cbiAgICAgICAgICAgIGRheXMucHVzaCh7XG4gICAgICAgICAgICAgICAgdGFnOiBXRUVLX0RBWVNbd2Vla0RheV0sXG4gICAgICAgICAgICAgICAgZGF0ZU51bWJlcjogb2Zmc2V0RGF5LmdldERhdGUoKSxcbiAgICAgICAgICAgICAgICBhY3R1YWxEYXRlOiBvZmZzZXREYXksXG4gICAgICAgICAgICAgICAgbW9udGg6IE1PTlRIU1tvZmZzZXREYXkuZ2V0TW9udGgoKV1cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIHRpbWVTZXJpZXM6IGRheXMsXG4gICAgICAgICAgICBzZWxlY3RlZERheTogZGF5c1swXSxcbiAgICAgICAgICAgIHNlbGVjdGVkTW9udGg6IGRheXNbMF0ubW9udGhcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBzZWxlY3REYXkoZGF5KSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBzZWxlY3RlZERheTogZGF5IH0pXG4gICAgfVxuXG4gICAgc2VsZWN0TW9udGgobW9udGgsZSl7XG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKClcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHNlbGVjdGVkTW9udGg6IG1vbnRoIH0pXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICBsZXQgc2VsZWN0ZWRTY2hlZHVsZSA9IHsgMDogW10sIDE6IFtdLCAyOiBbXSB9XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLnNlbGVjdGVkRGF5ICYmIHRoaXMuc3RhdGUuc2VsZWN0ZWREYXkuYWN0dWFsRGF0ZSkge1xuICAgICAgICAgICAgbGV0IHdlZWtEYXlOdW1iZXIgPSB0aGlzLnN0YXRlLnNlbGVjdGVkRGF5LmFjdHVhbERhdGUuZ2V0RGF5KClcbiAgICAgICAgICAgIHNlbGVjdGVkU2NoZWR1bGUgPSB0aGlzLnByb3BzLnRpbWVTbG90c1t3ZWVrRGF5TnVtYmVyXS50aW1pbmdcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGxldCBtb250aE51bSA9IChuZXcgRGF0ZSkuZ2V0TW9udGgoKVxuICAgICAgICBsZXQgdGhpc01vbnRoID0gTU9OVEhTWyhuZXcgRGF0ZSkuZ2V0TW9udGgoKV1cbiAgICAgICAgbGV0IG5leHRNb250aCA9IE1PTlRIU1sobmV3IERhdGUpLmdldE1vbnRoKCkrMV1cbiAgICAgICAgXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwid2lkZ2V0IG5vLXNoYWRvdyBuby1yb3VuZCBza2luLXRyYW5zcGFyZW50XCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwid2lkZ2V0LWNvbnRlbnRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRkLW5ldy10aW1lIG1yYi0xMFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoNCBjbGFzc05hbWU9XCJ0ZXh0LW1kIGZ3LTcwMCBtcmItMTBcIj5TZWxlY3QgRGF0ZSAmYW1wOyBUaW1lOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIG9uQ2xpY2s9e3RoaXMuc2VsZWN0TW9udGguYmluZCh0aGlzLHRoaXNNb250aCl9IGNsYXNzTmFtZT17XCJmbG9hdC1yaWdodCB0ZXh0LW1kIGZ3LTcwMCB0ZXh0LVwiICsgKHRoaXNNb250aCA9PT0gdGhpcy5zdGF0ZS5zZWxlY3RlZE1vbnRoID8gXCJwcmltYXJ5XCIgOiBcImxpZ2h0XCIpfT57dGhpc01vbnRofVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIG9uQ2xpY2s9e3RoaXMuc2VsZWN0TW9udGguYmluZCh0aGlzLG5leHRNb250aCl9IGNsYXNzTmFtZT17XCJ0ZXh0LVwiICsgKG5leHRNb250aCA9PT0gdGhpcy5zdGF0ZS5zZWxlY3RlZE1vbnRoID8gXCJwcmltYXJ5XCIgOiBcImxpZ2h0XCIpfT57bmV4dE1vbnRofTwvc3Bhbj48L3NwYW4+PC9oND5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNob29zZS10aW1lXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx1bCBjbGFzc05hbWU9XCJpbmxpbmUtbGlzdCBkYXRldGltZS1pdGVtc1wiPlxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZS50aW1lU2VyaWVzLmZpbHRlcigodHMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRzLm1vbnRoID09PSB0aGlzLnN0YXRlLnNlbGVjdGVkTW9udGhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KS5tYXAoKHRzLCBpKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiA8bGlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17dGhpcy5zdGF0ZS5zZWxlY3RlZERheSA9PSB0cyA/ICdhY3RpdmUnIDogXCJcIn1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleT17aX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuc2VsZWN0RGF5LmJpbmQodGhpcywgdHMpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7dHMuZGF0ZU51bWJlcn0gPHNwYW4+e3RzLnRhZ308L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwid2lkZ2V0XCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwid2lkZ2V0LWNvbnRlbnRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxoNCBjbGFzc05hbWU9XCJyZXBvcnQtb24gbXJiLTEwXCI+TW9ybmluZzwvaDQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dWwgY2xhc3NOYW1lPVwiaW5saW5lLWxpc3QgdGltZS1pdGVtc1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRTY2hlZHVsZVswXS5tYXAoKHRpbWUsIGkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiA8bGkga2V5PXtpfT48YSBocmVmPVwiXCIgY2xhc3NOYW1lPVwidi1idG4gdi1idG4tcHJpbWFyeSBidG4tc20gb3V0bGluZVwiPnt0aW1lWzFdfSA8L2E+PC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGg0IGNsYXNzTmFtZT1cInJlcG9ydC1vbiBtcmItMTBcIj5BZnRlcm5vb248L2g0PlxuICAgICAgICAgICAgICAgICAgICAgICAgPHVsIGNsYXNzTmFtZT1cImlubGluZS1saXN0IHRpbWUtaXRlbXNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkU2NoZWR1bGVbMV0ubWFwKCh0aW1lLCBpKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gPGxpIGtleT17aX0+PGEgaHJlZj1cIlwiIGNsYXNzTmFtZT1cInYtYnRuIHYtYnRuLXByaW1hcnkgYnRuLXNtIG91dGxpbmVcIj57dGltZVsxXX0gPC9hPjwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxoNCBjbGFzc05hbWU9XCJyZXBvcnQtb24gbXJiLTEwXCI+RXZlbmluZzwvaDQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dWwgY2xhc3NOYW1lPVwiaW5saW5lLWxpc3QgdGltZS1pdGVtc1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRTY2hlZHVsZVsyXS5tYXAoKHRpbWUsIGkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiA8bGkga2V5PXtpfT48YSBocmVmPVwiXCIgY2xhc3NOYW1lPVwidi1idG4gdi1idG4tcHJpbWFyeSBidG4tc20gb3V0bGluZVwiPnt0aW1lWzFdfSA8L2E+PC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBUaW1lU2xvdFNlbGVjdG9yXG4iLCJpbXBvcnQgVGltZVNsb3RTZWxlY3RvciBmcm9tICcuL1RpbWVTbG90U2VsZWN0b3IuanMnXG5cbmV4cG9ydCBkZWZhdWx0IFRpbWVTbG90U2VsZWN0b3IiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgUHJvZmlsZVNsaWRlciBmcm9tICcuLi9wcm9maWxlU2xpZGVyL2luZGV4LmpzJ1xuaW1wb3J0IEFwcG9pbnRtZW50TGlzdCBmcm9tICcuL2FwcG9pbnRtZW50TGlzdC9pbmRleC5qcydcblxuY2xhc3MgVXNlckFwcG9pbnRtZW50c1ZpZXcgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgICAgICB0aGlzLnN0YXRlID0ge1xuXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgdGhpcy5wcm9wcy5nZXRVc2VyUHJvZmlsZVdpdGhBcHBvaW50bWVudHMoKVxuICAgIH1cblxuICAgIHN0YXRpYyBjb250ZXh0VHlwZXMgPSB7XG4gICAgICAgIHJvdXRlcjogKCkgPT4gbnVsbFxuICAgIH1cblxuICAgIGNvbXBhcmVEYXRlV2l0aFRvZGF5KGRhdGUpe1xuICAgICAgICBsZXQgdG9kYXkgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKVxuICAgICAgICBkYXRlID0gbmV3IERhdGUoZGF0ZSkuZ2V0VGltZSgpXG4gICAgICAgIHJldHVybiB0b2RheSA+IGRhdGVcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgbGV0IHNlbGVjdGVkVXNlciA9IG51bGxcbiAgICAgICAgbGV0IHVzZXJQcm9maWxlSWQgPSB0aGlzLnByb3BzLm1hdGNoLnBhcmFtcy5pZFxuXG4gICAgICAgIGlmICh0aGlzLnByb3BzLlVTRVIucHJvZmlsZXNbdXNlclByb2ZpbGVJZF0pIHtcbiAgICAgICAgICAgIHNlbGVjdGVkVXNlciA9IHRoaXMucHJvcHMuVVNFUi5wcm9maWxlc1t1c2VyUHJvZmlsZUlkXVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgT2JqZWN0LmtleXModGhpcy5wcm9wcy5VU0VSLnByb2ZpbGVzKS5tYXAoKHByb2ZpbGVJZCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnByb3BzLlVTRVIucHJvZmlsZXNbcHJvZmlsZUlkXS5pc0RlZmF1bHRVc2VyKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkVXNlciA9IHRoaXMucHJvcHMuVVNFUi5wcm9maWxlc1twcm9maWxlSWRdXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInVzZXJQcm9maWxlXCI+XG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAoIHNlbGVjdGVkVXNlciAmJiBzZWxlY3RlZFVzZXIuYXBwb2ludG1lbnRzICkgPyA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPFByb2ZpbGVTbGlkZXJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9maWxlcz17dGhpcy5wcm9wcy5VU0VSLnByb2ZpbGVzfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1YlJvdXRlPVwiL2FwcG9pbnRtZW50c1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidXBjb21pbmdhcHBcIj5VcGNvbWluZyBPUEQgQXBwb2ludG1lbnRzPC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkVXNlci5hcHBvaW50bWVudHMuZmlsdGVyKChhcHBvaW50bWVudCxpKSA9PntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGRhdGUgPSBhcHBvaW50bWVudC5zbG90ID8gYXBwb2ludG1lbnQuc2xvdC5zdGFydCA6IDBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICF0aGlzLmNvbXBhcmVEYXRlV2l0aFRvZGF5KGRhdGUpIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLm1hcCgoYXBwb2ludG1lbnQsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiA8QXBwb2ludG1lbnRMaXN0IGtleT17aW5kZXh9IGRhdGE9e2FwcG9pbnRtZW50fSAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJwcmV2YXBwXCI+UHJldmlvdXMgT1BEIEFwcG9pbnRtZW50czwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZFVzZXIuYXBwb2ludG1lbnRzLmZpbHRlcigoYXBwb2ludG1lbnQsaSkgPT57XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkYXRlID0gYXBwb2ludG1lbnQuc2xvdCA/IGFwcG9pbnRtZW50LnNsb3Quc3RhcnQgOiAwXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNvbXBhcmVEYXRlV2l0aFRvZGF5KGRhdGUpIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLm1hcCgoYXBwb2ludG1lbnQsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiA8QXBwb2ludG1lbnRMaXN0IGtleT17aW5kZXh9IGRhdGE9e2FwcG9pbnRtZW50fSAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PiA6IFwiXCJcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBVc2VyQXBwb2ludG1lbnRzVmlld1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBSaWdodEFycm93SWNvbiBmcm9tICdtYXRlcmlhbC11aS1pY29ucy9LZXlib2FyZEFycm93UmlnaHQnO1xuXG5jbGFzcyBBcHBvaW50bWVudExpc3QgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgIH1cblxuICAgIGdldFRpbWUodW5peF90aW1lc3RhbXApIHtcbiAgICAgICAgdmFyIGRhdGUgPSBuZXcgRGF0ZSh1bml4X3RpbWVzdGFtcCAqIDEwMDApO1xuICAgICAgICB2YXIgaG91cnMgPSBkYXRlLmdldEhvdXJzKCk7XG4gICAgICAgIHZhciBtaW51dGVzID0gXCIwXCIgKyBkYXRlLmdldE1pbnV0ZXMoKTtcbiAgICAgICAgcmV0dXJuIGhvdXJzICsgJzonICsgbWludXRlcy5zdWJzdHIoLTIpXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIGxldCB7IGRvY3Rvck5hbWUsIHNsb3QgfSA9IHRoaXMucHJvcHMuZGF0YVxuICAgICAgICBzbG90ID0gc2xvdCB8fCB7XG4gICAgICAgICAgICBzdGFydDogMCxcbiAgICAgICAgICAgIGVuZDogMFxuICAgICAgICB9XG4gICAgICAgIGxldCBkYXRlID0gbmV3IERhdGUoc2xvdC5zdGFydCkudG9EYXRlU3RyaW5nKClcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhcHBvaW50bWVudFwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibmFtZVwiPlxuXG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJkZXRhaWxzXCI+XG4gICAgICAgICAgICAgICAgICAgIDxwPlxuICAgICAgICAgICAgICAgICAgICAgICAge2RvY3Rvck5hbWV9XG4gICAgICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICAgICAgPHA+XG4gICAgICAgICAgICAgICAgICAgICAgICB7ZGF0ZX1cbiAgICAgICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgICAgICAgICAgIHt0aGlzLmdldFRpbWUoc2xvdC5zdGFydCkgKyBcIiB0byBcIiArIHRoaXMuZ2V0VGltZShzbG90LmVuZCl9XG4gICAgICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJvb2tcIj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dFwiPlZpZXcgQ29uZmlybWF0aW9uPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8UmlnaHRBcnJvd0ljb24gY2xhc3NOYW1lPVwiYm9va0ljb25cIiAvPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IEFwcG9pbnRtZW50TGlzdFxuIiwiaW1wb3J0IEFwcG9pbnRtZW50TGlzdCBmcm9tICcuL0FwcG9pbnRtZW50TGlzdC5qcydcblxuZXhwb3J0IGRlZmF1bHQgQXBwb2ludG1lbnRMaXN0IiwiaW1wb3J0IFVzZXJBcHBvaW50bWVudHNWaWV3IGZyb20gJy4vVXNlckFwcG9pbnRtZW50c1ZpZXcuanMnXG5cbmV4cG9ydCBkZWZhdWx0IFVzZXJBcHBvaW50bWVudHNWaWV3IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IFByb2ZpbGVTbGlkZXIgZnJvbSAnLi4vcHJvZmlsZVNsaWRlci9pbmRleC5qcydcbmltcG9ydCBQcm9maWxlRGF0YSBmcm9tICcuL3Byb2ZpbGVEYXRhL2luZGV4LmpzJ1xuXG5jbGFzcyBVc2VyUHJvZmlsZVZpZXcgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgICAgICB0aGlzLnN0YXRlID0ge1xuXG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIHRoaXMucHJvcHMuZ2V0VXNlclByb2ZpbGUoKVxuICAgIH1cblxuICAgIHN0YXRpYyBjb250ZXh0VHlwZXMgPSB7XG4gICAgICAgIHJvdXRlcjogKCkgPT4gbnVsbFxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICBsZXQgc2VsZWN0ZWRVc2VyID0gbnVsbFxuICAgICAgICBsZXQgdXNlclByb2ZpbGVJZCA9IHRoaXMucHJvcHMubWF0Y2gucGFyYW1zLmlkXG5cbiAgICAgICAgaWYgKHRoaXMucHJvcHMuVVNFUi5wcm9maWxlc1t1c2VyUHJvZmlsZUlkXSkge1xuICAgICAgICAgICAgc2VsZWN0ZWRVc2VyID0gdGhpcy5wcm9wcy5VU0VSLnByb2ZpbGVzW3VzZXJQcm9maWxlSWRdXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBPYmplY3Qua2V5cyh0aGlzLnByb3BzLlVTRVIucHJvZmlsZXMpLm1hcCgocHJvZmlsZUlkKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucHJvcHMuVVNFUi5wcm9maWxlc1twcm9maWxlSWRdLmlzRGVmYXVsdFVzZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRVc2VyID0gdGhpcy5wcm9wcy5VU0VSLnByb2ZpbGVzW3Byb2ZpbGVJZF1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ1c2VyUHJvZmlsZVwiPlxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRVc2VyID8gPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxQcm9maWxlU2xpZGVyIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb2ZpbGVzPXt0aGlzLnByb3BzLlVTRVIucHJvZmlsZXN9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3ViUm91dGU9XCJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxQcm9maWxlRGF0YSBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9maWxlRGF0YT17c2VsZWN0ZWRVc2VyfVxuICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+IDogXCJcIlxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IFVzZXJQcm9maWxlVmlld1xuIiwiaW1wb3J0IFVzZXJQcm9maWxlVmlldyBmcm9tICcuL1VzZXJQcm9maWxlVmlldy5qcydcblxuZXhwb3J0IGRlZmF1bHQgVXNlclByb2ZpbGVWaWV3IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuY2xhc3MgUHJvZmlsZURhdGEgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgIH1cblxuICAgIG9wZW5BcHBvaW50bWVudHMocHJvZmlsZUlkKSB7XG4gICAgICAgIHRoaXMuY29udGV4dC5yb3V0ZXIuaGlzdG9yeS5wdXNoKGAvdXNlci8ke3Byb2ZpbGVJZH0vYXBwb2ludG1lbnRzYClcblxuICAgIH1cblxuICAgIG9wZW5SZXBvcnRzKHByb2ZpbGVJZCkge1xuICAgICAgICB0aGlzLmNvbnRleHQucm91dGVyLmhpc3RvcnkucHVzaChgL3VzZXIvJHtwcm9maWxlSWR9L3JlcG9ydHNgKVxuXG4gICAgfVxuXG4gICAgc3RhdGljIGNvbnRleHRUeXBlcyA9IHtcbiAgICAgICAgcm91dGVyOiAoKSA9PiBudWxsXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIGxldCB7bmFtZSwgZ2VuZGVyLCBhZ2UsIG1vYmlsZSwgbWVkaWNhbEhpc3RvcnlDb3VudCwgbWVkaWNhbFRlc3RDb3VudCwgb25saW5lQ29uc3VsdGF0aW9uQ291bnQsIG9wZFZpc2l0Q291bnQsIHByb2ZpbGVJZH0gPSB0aGlzLnByb3BzLnByb2ZpbGVEYXRhXG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXY+ICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidXNlckRlYWlsXCI+XG4gICAgICAgICAgICAgICAgICAgIDxwPntuYW1lfTwvcD5cbiAgICAgICAgICAgICAgICAgICAgPHA+e2FnZX0gWWVhcnM8L3A+XG4gICAgICAgICAgICAgICAgICAgIDxwPntnZW5kZXJ9PC9wPlxuICAgICAgICAgICAgICAgICAgICA8cD57bW9iaWxlfTwvcD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInByb2ZpbGVCdG5zXCI+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24+UHJvZmlsZSBOb3QgVmVyaWZpZWQ8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbj5ObyBPUEQgSW5zdXJhbmNlPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24+T25saW5lIENvbnN1bHRhdGlvbnMoe29ubGluZUNvbnN1bHRhdGlvbkNvdW50fSk8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXt0aGlzLm9wZW5BcHBvaW50bWVudHMuYmluZCh0aGlzLHByb2ZpbGVJZCl9Pk9QRCBWaXNpdHMgKHtvcGRWaXNpdENvdW50fSk8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbj5NZWRpY2FsIEhpc3RvcnkgKHttZWRpY2FsSGlzdG9yeUNvdW50fSk8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXt0aGlzLm9wZW5SZXBvcnRzLmJpbmQodGhpcyxwcm9maWxlSWQpfT5UZXN0IFJlcG9ydHMgKHttZWRpY2FsVGVzdENvdW50fSk8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBQcm9maWxlRGF0YVxuIiwiaW1wb3J0IFByb2ZpbGVEYXRhIGZyb20gJy4vUHJvZmlsZURhdGEuanMnXG5cbmV4cG9ydCBkZWZhdWx0IFByb2ZpbGVEYXRhIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IFByb2ZpbGVTbGlkZXIgZnJvbSAnLi4vcHJvZmlsZVNsaWRlci9pbmRleC5qcydcbmltcG9ydCBSZXBvcnRMaXN0IGZyb20gJy4vcmVwb3J0TGlzdC9pbmRleC5qcydcblxuY2xhc3MgVXNlclJlcG9ydHNWaWV3IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcblxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIHRoaXMucHJvcHMuZ2V0VXNlclByb2ZpbGVXaXRoVGVzdHMoKVxuICAgIH1cblxuICAgIHN0YXRpYyBjb250ZXh0VHlwZXMgPSB7XG4gICAgICAgIHJvdXRlcjogKCkgPT4gbnVsbFxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICBsZXQgc2VsZWN0ZWRVc2VyID0gbnVsbFxuICAgICAgICBsZXQgdXNlclByb2ZpbGVJZCA9IHRoaXMucHJvcHMubWF0Y2gucGFyYW1zLmlkXG5cbiAgICAgICAgaWYgKHRoaXMucHJvcHMuVVNFUi5wcm9maWxlc1t1c2VyUHJvZmlsZUlkXSkge1xuICAgICAgICAgICAgc2VsZWN0ZWRVc2VyID0gdGhpcy5wcm9wcy5VU0VSLnByb2ZpbGVzW3VzZXJQcm9maWxlSWRdXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBzZWxlY3RpbmcgZGVmYXVsdCB1c2VyXG4gICAgICAgICAgICBPYmplY3Qua2V5cyh0aGlzLnByb3BzLlVTRVIucHJvZmlsZXMpLm1hcCgocHJvZmlsZUlkKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucHJvcHMuVVNFUi5wcm9maWxlc1twcm9maWxlSWRdLmlzRGVmYXVsdFVzZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRVc2VyID0gdGhpcy5wcm9wcy5VU0VSLnByb2ZpbGVzW3Byb2ZpbGVJZF1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidXNlclByb2ZpbGVcIj5cbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIChzZWxlY3RlZFVzZXIgJiYgc2VsZWN0ZWRVc2VyLnRlc3RzKSA/IDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8UHJvZmlsZVNsaWRlclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb2ZpbGVzPXt0aGlzLnByb3BzLlVTRVIucHJvZmlsZXN9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3ViUm91dGU9XCIvcmVwb3J0c1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidXBjb21pbmdhcHBcIj5SZXBvcnRzPC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkVXNlci50ZXN0cy5tYXAoKHRlc3QsIGkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDxSZXBvcnRMaXN0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhPXt0ZXN0fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5PXtpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+IDogXCJcIlxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IFVzZXJSZXBvcnRzVmlld1xuIiwiaW1wb3J0IFVzZXJSZXBvcnRzVmlldyBmcm9tICcuL1VzZXJSZXBvcnRzVmlldy5qcydcblxuZXhwb3J0IGRlZmF1bHQgVXNlclJlcG9ydHNWaWV3IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuY2xhc3MgUmVwb3J0TGlzdCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgfVxuXG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgbGV0IHsgbmFtZSwgc3ViX25hbWUsIGFiYnJldmlhdGlvbiwgY2F0ZWdvcnksIHNsb3QgIH0gPSB0aGlzLnByb3BzLmRhdGFcbiAgICAgICAgc2xvdCA9IHNsb3QgfHwge1xuICAgICAgICAgICAgc3RhcnQ6IDAsXG4gICAgICAgICAgICBlbmQ6IDBcbiAgICAgICAgfVxuICAgICAgICBsZXQgZGF0ZSA9IG5ldyBEYXRlKHNsb3Quc3RhcnQpLnRvRGF0ZVN0cmluZygpXG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYXBwb2ludG1lbnRcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImRldGFpbHNcIj5cbiAgICAgICAgICAgICAgICAgICAgPHA+XG4gICAgICAgICAgICAgICAgICAgICAgICB7bmFtZSArIFwiICwgXCIgKyBzdWJfbmFtZX1cbiAgICAgICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtjYXRlZ29yeSArIFwiICwgXCIgKyBhYmJyZXZpYXRpb259XG4gICAgICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICAgICAgPHA+XG4gICAgICAgICAgICAgICAgICAgICAgICB7ZGF0ZX1cbiAgICAgICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYm9va1wiPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ2aWV3cmVwb3J0XCI+VmlldyBSZXBvcnQ8L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgUmVwb3J0TGlzdFxuIiwiaW1wb3J0IFJlcG9ydExpc3QgZnJvbSAnLi9SZXBvcnRMaXN0LmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBSZXBvcnRMaXN0IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuY2xhc3MgVXNlclNpZ251cFZpZXcgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgYXBwb2lubWVudEZvcjogJ3NlbGYnLFxuICAgICAgICAgICAgcGF0aWVudE5hbWU6ICcnLFxuICAgICAgICAgICAgYWdlOiAnJyxcbiAgICAgICAgICAgIGdlbmRlcjogJ20nLFxuICAgICAgICAgICAgZW1haWw6ICcnLFxuICAgICAgICAgICAgcGhvbmVOdW1iZXI6ICcnXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpbnB1dEhhbmRsZXIoZSkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHsgW2UudGFyZ2V0Lm5hbWVdOiBlLnRhcmdldC52YWx1ZSB9KVxuICAgIH1cblxuICAgIHN1Ym1pdEZvcm0oKSB7XG5cbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgPGhlYWRlciBjbGFzc05hbWU9XCJza2luLXdoaXRlIGZpeGVkIGhvcml6b250YWwgdG9wIGJkci0xIGJvdHRvbSBsaWdodFwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lci1mbHVpZFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC0yXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx1bCBjbGFzc05hbWU9XCJpbmxpbmUtbGlzdFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpPjxzcGFuIGNsYXNzTmFtZT1cImljb24gaWNvbi1zbSB0ZXh0LW1pZGRsZSBiYWNrLWljb24td2hpdGVcIj48aW1nIHNyYz1cIi9hc3NldHMvaW1nL2N1c3RvbWVyLWljb25zL2JhY2staWNvbi5wbmdcIiBjbGFzc05hbWU9XCJpbWctZmx1aWRcIiAvPjwvc3Bhbj48L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLThcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJoZWFkZXItdGl0bGUgZnctNzAwIGNhcGl0YWxpemUgdGV4dC1jZW50ZXJcIj5BZGQgVXNlciBQcm9maWxlPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtMlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvaGVhZGVyPlxuXG4gICAgICAgICAgICAgICAgPHNlY3Rpb24gY2xhc3NOYW1lPVwid3JhcCB2YWxpZGF0aW9uLWJvb2stc2NyZWVuXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwid2lkZ2V0IG5vLXJvdW5kIG5vLXNoYWRvd1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3aWRnZXQtaGVhZGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGg0IGNsYXNzTmFtZT1cIndpZGdldC10aXRsZVwiPkNvbnRhY3QgRGV0YWlsczwvaDQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwid2lkZ2V0LWNvbnRlbnRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Zm9ybSBjbGFzc05hbWU9XCJnby1ib3R0b21cIiA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cCBpbnB1dC1ncm91cFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImlubGluZSBpbnB1dC1sYWJlbFwiPkFwcG9pbnRtZW50IGZvcjwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNob29zZS1nZW5kZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwicmFkaW8taW5saW5lXCI+PGlucHV0IHZhbHVlPXsnc2VsZid9IG9uQ2hhbmdlPXt0aGlzLmlucHV0SGFuZGxlci5iaW5kKHRoaXMpfSBjaGVja2VkPXt0aGlzLnN0YXRlLmFwcG9pbm1lbnRGb3IgPT0gJ3NlbGYnfSB0eXBlPVwicmFkaW9cIiBuYW1lPVwiYXBwb2lubWVudEZvclwiIC8+U2VsZjwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cInJhZGlvLWlubGluZVwiPjxpbnB1dCB2YWx1ZT17J2Vsc2UnfSBvbkNoYW5nZT17dGhpcy5pbnB1dEhhbmRsZXIuYmluZCh0aGlzKX0gY2hlY2tlZD17dGhpcy5zdGF0ZS5hcHBvaW5tZW50Rm9yID09ICdlbHNlJ30gdHlwZT1cInJhZGlvXCIgbmFtZT1cImFwcG9pbm1lbnRGb3JcIiAvPlNvbWVvbmUgZWxzZTwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibGFiZWxXcmFwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgaWQ9XCJmbmFtZVwiIG5hbWU9XCJwYXRpZW50TmFtZVwiIHR5cGU9XCJ0ZXh0XCIgdmFsdWU9e3RoaXMuc3RhdGUucGF0aWVudE5hbWV9IG9uQ2hhbmdlPXt0aGlzLmlucHV0SGFuZGxlci5iaW5kKHRoaXMpfSByZXF1aXJlZCAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGh0bWxGb3I9XCJmbmFtZVwiPlBhdGllbnQgTmFtZTwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXhzIHRleHQtbGlnaHRcIj4oQXBwb2lubWVudCB2YWxpZCBvbmx5IGZvciB0aGUgcHJvdmlkZWQgbmFtZSk8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxhYmVsV3JhcFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IGlkPVwiYWdlXCIgbmFtZT1cImFnZVwiIHR5cGU9XCJ0ZXh0XCIgdmFsdWU9e3RoaXMuc3RhdGUuYWdlfSBvbkNoYW5nZT17dGhpcy5pbnB1dEhhbmRsZXIuYmluZCh0aGlzKX0gcmVxdWlyZWQgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBodG1sRm9yPVwiYWdlXCI+QWdlPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cCBpbnB1dC1ncm91cFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImlubGluZSBpbnB1dC1sYWJlbFwiPkdlbmRlcjwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNob29zZS1nZW5kZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwicmFkaW8taW5saW5lXCI+PGlucHV0IHZhbHVlPXsnbSd9IG9uQ2hhbmdlPXt0aGlzLmlucHV0SGFuZGxlci5iaW5kKHRoaXMpfSBjaGVja2VkPXt0aGlzLnN0YXRlLmdlbmRlciA9PSAnbSd9IHR5cGU9XCJyYWRpb1wiIG5hbWU9XCJnZW5kZXJcIiAvPk1hbGU8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJyYWRpby1pbmxpbmVcIj48aW5wdXQgdmFsdWU9eydmJ30gb25DaGFuZ2U9e3RoaXMuaW5wdXRIYW5kbGVyLmJpbmQodGhpcyl9IGNoZWNrZWQ9e3RoaXMuc3RhdGUuZ2VuZGVyID09ICdmJ30gdHlwZT1cInJhZGlvXCIgbmFtZT1cImdlbmRlclwiIC8+RmVtYWxlPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwicmFkaW8taW5saW5lXCI+PGlucHV0IHZhbHVlPXsnbyd9IG9uQ2hhbmdlPXt0aGlzLmlucHV0SGFuZGxlci5iaW5kKHRoaXMpfSBjaGVja2VkPXt0aGlzLnN0YXRlLmdlbmRlciA9PSAnbyd9IHR5cGU9XCJyYWRpb1wiIG5hbWU9XCJnZW5kZXJcIiAvPk90aGVyPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsYWJlbFdyYXBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCBpZD1cImVtYWlsXCIgbmFtZT1cImVtYWlsXCIgdHlwZT1cInRleHRcIiB2YWx1ZT17dGhpcy5zdGF0ZS5lbWFpbH0gb25DaGFuZ2U9e3RoaXMuaW5wdXRIYW5kbGVyLmJpbmQodGhpcyl9IHJlcXVpcmVkIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgaHRtbEZvcj1cImVtYWlsXCI+RW1haWw8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsYWJlbFdyYXBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCBpZD1cIm51bWJlclwiIG5hbWU9XCJwaG9uZU51bWJlclwiIHR5cGU9XCJ0ZXh0XCIgdmFsdWU9e3RoaXMuc3RhdGUucGhvbmVOdW1iZXJ9IG9uQ2hhbmdlPXt0aGlzLmlucHV0SGFuZGxlci5iaW5kKHRoaXMpfSByZXF1aXJlZCAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGh0bWxGb3I9XCJudW1iZXJcIj5Nb2JpbGUgTnVtYmVyPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9mb3JtPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvc2VjdGlvbj5cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cInYtYnRuIHYtYnRuLXByaW1hcnkgYnRuLWxnIGZpeGVkIGhvcml6b250YWwgYm90dG9tIG5vLXJvdW5kIGJ0bi1sZyB0ZXh0LWxnXCIgb25DbGljaz17dGhpcy5zdWJtaXRGb3JtLmJpbmQodGhpcyl9PkNvbnRpbnVlPC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgVXNlclNpZ251cFZpZXdcbiIsImltcG9ydCBVc2VyU2lnbnVwVmlldyBmcm9tICcuL1VzZXJTaWdudXAnXG5cbmV4cG9ydCBkZWZhdWx0IFVzZXJTaWdudXBWaWV3IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCdcblxuaW1wb3J0IExvYWRlciBmcm9tICcuLi8uLi9jb21tb25zL0xvYWRlcidcbmltcG9ydCBWaXNpdFRpbWUgZnJvbSAnLi92aXNpdFRpbWUnXG5pbXBvcnQgUGlja3VwQWRkcmVzcyBmcm9tICcuL3BpY2t1cEFkZHJlc3MnXG5pbXBvcnQgQ2hvb3NlUGF0aWVudCBmcm9tICcuL2Nob29zZVBhdGllbnQnXG5cbmNsYXNzIEJvb2tpbmdTdW1tYXJ5VmlldyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgICBzZWxlY3RlZExhYjogdGhpcy5wcm9wcy5tYXRjaC5wYXJhbXMuaWQsXG4gICAgICAgICAgICBwaWNrdXBUeXBlOiBcImxhYlwiXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgdGhpcy5wcm9wcy5nZXRMYWJCeUlkKHRoaXMuc3RhdGUuc2VsZWN0ZWRMYWIpXG4gICAgfVxuXG4gICAgb3BlblRlc3RzKCkge1xuICAgICAgICB0aGlzLnByb3BzLmhpc3RvcnkucHVzaChgL2xhYi8ke3RoaXMuc3RhdGUuc2VsZWN0ZWRMYWJ9L3Rlc3RzYClcbiAgICB9XG5cbiAgICBoYW5kbGVQaWNrdXBUeXBlKGUpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHBpY2t1cFR5cGU6IGUudGFyZ2V0LnZhbHVlIH0pXG4gICAgfVxuXG4gICAgZ2V0U2VsZWN0b3JzKCkge1xuICAgICAgICBzd2l0Y2ggKHRoaXMuc3RhdGUucGlja3VwVHlwZSkge1xuICAgICAgICAgICAgY2FzZSBcImxhYlwiOiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgIDxWaXNpdFRpbWUgdHlwZT1cImxhYlwiLz5cbiAgICAgICAgICAgICAgICAgICAgPENob29zZVBhdGllbnQgLz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY2FzZSBcImhvbWVcIjoge1xuICAgICAgICAgICAgICAgIHJldHVybiA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICA8VmlzaXRUaW1lIHR5cGU9XCJob21lXCIvPlxuICAgICAgICAgICAgICAgICAgICA8Q2hvb3NlUGF0aWVudCAvPlxuICAgICAgICAgICAgICAgICAgICA8UGlja3VwQWRkcmVzcyAvPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgbGV0IHRlc3RzID0gW11cbiAgICAgICAgbGV0IGZpbmFsUHJpY2UgPSAwXG4gICAgICAgIGxldCBsYWJEZXRhaWwgPSB7fVxuXG4gICAgICAgIGlmICh0aGlzLnByb3BzLkxBQlNbdGhpcy5zdGF0ZS5zZWxlY3RlZExhYl0pIHtcbiAgICAgICAgICAgIGxhYkRldGFpbCA9IHRoaXMucHJvcHMuTEFCU1t0aGlzLnN0YXRlLnNlbGVjdGVkTGFiXS5sYWJcbiAgICAgICAgICAgIHRlc3RzID0gdGhpcy5wcm9wcy5zZWxlY3RlZENyaXRlcmlhcy5maWx0ZXIoeCA9PiB4LnR5cGUgPT0gJ3Rlc3QnKS5tYXAoKHRlc3QsIGkpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgcHJpY2UgPSAwXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5MQUJTW3RoaXMuc3RhdGUuc2VsZWN0ZWRMYWJdLnRlc3RzLm1hcCgodHdwKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0d3AudGVzdF9pZCA9PSB0ZXN0LmlkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwcmljZSA9IHR3cC5tcnBcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgZmluYWxQcmljZSArPSBwcmljZVxuICAgICAgICAgICAgICAgIHJldHVybiA8cCBrZXk9e2l9IGNsYXNzTmFtZT1cInRlc3QtbGlzdFwiPnt0ZXN0Lm5hbWV9PHNwYW4gY2xhc3NOYW1lPVwiZmxvYXQtcmlnaHQgZnctNzAwXCI+UnMuIHtwcmljZX08L3NwYW4+PC9wPlxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIDxoZWFkZXIgY2xhc3NOYW1lPVwic2tpbi13aGl0ZSBmaXhlZCBob3Jpem9udGFsIHRvcCBiZHItMSBib3R0b20gbGlnaHRcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250YWluZXItZmx1aWRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtMlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dWwgY2xhc3NOYW1lPVwiaW5saW5lLWxpc3RcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaSBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5oaXN0b3J5LmdvKC0xKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfX0+PHNwYW4gY2xhc3NOYW1lPVwiaWNvbiBpY29uLXNtIHRleHQtbWlkZGxlIGJhY2staWNvbi13aGl0ZVwiPjxpbWcgc3JjPVwiL2Fzc2V0cy9pbWcvY3VzdG9tZXItaWNvbnMvYmFjay1pY29uLnBuZ1wiIGNsYXNzTmFtZT1cImltZy1mbHVpZFwiIC8+PC9zcGFuPjwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtOFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImhlYWRlci10aXRsZSBmdy03MDAgY2FwaXRhbGl6ZSB0ZXh0LWNlbnRlclwiPkJvb2tpbmcgQ29uZmlybWF0aW9uPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtMlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7LyogPHVsIGNsYXNzPVwiaW5saW5lLWxpc3QgZmxvYXQtcmlnaHQgdXNlci1ub3RpZmljYXRpb24tYWN0aW9uXCI+XG5cdFx0XHRcdFx0XHQ8bGk+PHNwYW4gY2xhc3M9XCJpY29uIGljb24tbWQgdGV4dC1taWRkbGVcIj48aW1nIHNyYz1cIi9hc3NldHMvaW1nL2N1c3RvbWVyLWljb25zL3VzZXIuc3ZnXCIgY2xhc3M9XCJpbWctZmx1aWRcIj48L3NwYW4+PC9saT5cblx0XHRcdFx0XHRcdDxsaT48c3BhbiBjbGFzcz1cImljb24gaWNvbi1tZCB0ZXh0LW1pZGRsZSBub3RpZmljYXRpb24taWNvblwiPjxpbWcgc3JjPVwiL2Fzc2V0cy9pbWcvY3VzdG9tZXItaWNvbnMvbm90aWZpY2F0aW9uLnN2Z1wiIGNsYXNzPVwiaW1nLWZsdWlkXCI+IDxzcGFuIGNsYXNzPVwibm90aWZpY2F0aW9uLWFsZXJ0XCI+PC9zcGFuPjwvc3Bhbj48L2xpPlxuXHRcdFx0XHRcdDwvdWw+ICovfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvaGVhZGVyPlxuXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnByb3BzLkxBQlNbdGhpcy5zdGF0ZS5zZWxlY3RlZExhYl0gP1xuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c2VjdGlvbiBjbGFzc05hbWU9XCJ3cmFwIGJvb2tpbmctY29uZmlybS1zY3JlZW5cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250YWluZXItZmx1aWRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtMTJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3aWRnZXQgbXJ0LTEwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIndpZGdldC1oZWFkZXIgYmRyLTEgYm90dG9tIGxpZ2h0IHRleHQtY2VudGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHVsIGNsYXNzTmFtZT1cImlubGluZS1saXN0IGJvb2tpbmctdHlwZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGk+PGxhYmVsIGNsYXNzTmFtZT1cInJhZGlvLWlubGluZSB0ZXh0LW1kIGZ3LTcwMCB0ZXh0LXByaW1hcnlcIj48aW5wdXQgdHlwZT1cInJhZGlvXCIgbmFtZT1cIm9wdHJhZGlvXCIgb25DaGFuZ2U9e3RoaXMuaGFuZGxlUGlja3VwVHlwZS5iaW5kKHRoaXMpfSB2YWx1ZT1cImhvbWVcIiBjaGVja2VkPXt0aGlzLnN0YXRlLnBpY2t1cFR5cGUgPT0gJ2hvbWUnfSAvPiBIb21lIFBpY2stdXA8L2xhYmVsPjwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaT48bGFiZWwgY2xhc3NOYW1lPVwicmFkaW8taW5saW5lIHRleHQtbWQgZnctNzAwIHRleHQtcHJpbWFyeVwiPjxpbnB1dCB0eXBlPVwicmFkaW9cIiBuYW1lPVwib3B0cmFkaW9cIiBvbkNoYW5nZT17dGhpcy5oYW5kbGVQaWNrdXBUeXBlLmJpbmQodGhpcyl9IHZhbHVlPVwibGFiXCIgY2hlY2tlZD17dGhpcy5zdGF0ZS5waWNrdXBUeXBlID09ICdsYWInfSAvPiBMYWIgVmlzaXQ8L2xhYmVsPjwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3aWRnZXQtY29udGVudFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibGFiLWRldGFpbHNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGltZyBzcmM9XCIvYXNzZXRzL2ltZy9jdXN0b21lci1pY29ucy9sYWIxLnBuZ1wiIGNsYXNzTmFtZT1cImltZy1mbHVpZFwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibGFiLXRpdGxlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDQgY2xhc3NOYW1lPVwiZnctNzAwIHRleHQtbWQgdGl0bGVcIj57bGFiRGV0YWlsLm5hbWV9PC9oND5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cImZ3LTUwMCB0ZXh0LXNtIHRleHQtbGlnaHRcIj57bGFiRGV0YWlsLmFkZHJlc3N9PC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt0aGlzLmdldFNlbGVjdG9ycygpfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsYWItdmlzaXQtdGltZSB0ZXN0LXJlcG9ydFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDQgY2xhc3NOYW1lPVwidGl0bGVcIj48c3Bhbj48aW1nIHNyYz1cIi9hc3NldHMvaW1nL2N1c3RvbWVyLWljb25zL3Rlc3Quc3ZnXCIgLz48L3NwYW4+VGVzdHMgPHNwYW4gY2xhc3NOYW1lPVwiZmxvYXQtcmlnaHRcIj48YSBvbkNsaWNrPXt0aGlzLm9wZW5UZXN0cy5iaW5kKHRoaXMpfSBjbGFzc05hbWU9XCJ0ZXh0LXByaW1hcnkgZnctNzAwIHRleHQtc21cIj5DaGFuZ2UgVGVzdHM8L2E+PC9zcGFuPjwvaDQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt0ZXN0c31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NlY3Rpb24+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cInYtYnRuIHYtYnRuLXByaW1hcnkgYnRuLWxnIGZpeGVkIGhvcml6b250YWwgYm90dG9tIG5vLXJvdW5kIGJ0bi1sZyB0ZXh0LWxnXCI+UHJvY2VlZCB0byBQYXkgUnMuIHtmaW5hbFByaWNlfTwvYnV0dG9uPlxuXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj4gOiA8TG9hZGVyIC8+XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgQm9va2luZ1N1bW1hcnlWaWV3XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5jbGFzcyBDaG9vc2VQYXRpZW50IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcblxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxhYi12aXNpdC10aW1lXCI+XG4gICAgICAgICAgICAgICAgPGg0IGNsYXNzTmFtZT1cInRpdGxlXCI+PHNwYW4+PGltZyBzcmM9XCIvYXNzZXRzL2ltZy9jdXN0b21lci1pY29ucy9jbG9jay5zdmdcIiAvPjwvc3Bhbj5QYXRpZW50IERldGFpbHMgPHNwYW4gY2xhc3NOYW1lPVwiZmxvYXQtcmlnaHRcIj48YSBocmVmPVwiI1wiIGNsYXNzTmFtZT1cInRleHQtcHJpbWFyeSBmdy03MDAgdGV4dC1zbVwiPlBpY2sgUGF0aWVudDwvYT48L3NwYW4+PC9oND5cbiAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJkYXRlLXRpbWVcIj5EdW1teSBVc2VyPC9wPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IENob29zZVBhdGllbnRcbiIsImltcG9ydCBCb29raW5nU3VtbWFyeVZpZXcgZnJvbSAnLi9Cb29raW5nU3VtbWFyeVZpZXcuanMnXG5cbmV4cG9ydCBkZWZhdWx0IEJvb2tpbmdTdW1tYXJ5VmlldyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmNsYXNzIFBpY2t1cEFkZHJlc3MgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgICAgICB0aGlzLnN0YXRlID0ge1xuXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibGFiLXZpc2l0LXRpbWVcIj5cbiAgICAgICAgICAgICAgICA8aDQgY2xhc3NOYW1lPVwidGl0bGVcIj48c3Bhbj48aW1nIHNyYz1cIi9hc3NldHMvaW1nL2N1c3RvbWVyLWljb25zL2Nsb2NrLnN2Z1wiIC8+PC9zcGFuPlBpY2t1cCBBZGRyZXNzIDxzcGFuIGNsYXNzTmFtZT1cImZsb2F0LXJpZ2h0XCI+PGEgaHJlZj1cIiNcIiBjbGFzc05hbWU9XCJ0ZXh0LXByaW1hcnkgZnctNzAwIHRleHQtc21cIj5DaGFuZ2UgQWRkcmVzczwvYT48L3NwYW4+PC9oND5cbiAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJkYXRlLXRpbWVcIj4xOHRoIEFwcmlsIHwgMzozMCBQTTwvcD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBQaWNrdXBBZGRyZXNzXG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5jbGFzcyBWaXNpdFRpbWUgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgICAgICB0aGlzLnN0YXRlID0ge1xuXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibGFiLXZpc2l0LXRpbWVcIj5cbiAgICAgICAgICAgICAgICA8aDQgY2xhc3NOYW1lPVwidGl0bGVcIj48c3Bhbj48aW1nIHNyYz1cIi9hc3NldHMvaW1nL2N1c3RvbWVyLWljb25zL2Nsb2NrLnN2Z1wiIC8+PC9zcGFuPlZpc2l0IHRpbWUgPHNwYW4gY2xhc3NOYW1lPVwiZmxvYXQtcmlnaHRcIj48YSBocmVmPVwiI1wiIGNsYXNzTmFtZT1cInRleHQtcHJpbWFyeSBmdy03MDAgdGV4dC1zbVwiPkNoYW5nZSBUaW1lPC9hPjwvc3Bhbj48L2g0PlxuICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cImRhdGUtdGltZVwiPjE4dGggQXByaWwgfCAzOjMwIFBNPC9wPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IFZpc2l0VGltZVxuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cbmltcG9ydCBMYWJUZXN0cyBmcm9tICcuLi9sYWJUZXN0cydcblxuY2xhc3MgTGFiRGV0YWlscyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxzZWN0aW9uIGNsYXNzTmFtZT1cIndyYXAgcHJvZmlsZS1ib29rLXNjcmVlblwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGFpbmVyLWZsdWlkXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC0xMlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwid2lkZ2V0IHByb2ZpbGUtYm9va1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIndpZGdldC1oZWFkZXIgcGItaGVhZGVyIHRleHQtY2VudGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBiLWxvZ29cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW1nIHNyYz1cIi9hc3NldHMvaW1nL2N1c3RvbWVyLWljb25zL2xhYjEucG5nXCIgY2xhc3NOYW1lPVwiaW1nLWZsdWlkXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGg0IGNsYXNzTmFtZT1cIndpZGdldC10aXRsZSBwYi10aXRsZVwiPlNSTCBEaWdub3N0aWNzPC9oND5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cImxvY2F0aW9uXCI+U2VjdG9yIDUyIEd1cmdhb24gfCA8c3BhbiBjbGFzc05hbWU9XCJjdC1pbWcgY3QtaW1nLXhzXCI+PGltZyBzcmM9XCIvYXNzZXRzL2ltZy9jdXN0b21lci1pY29ucy9tYXAtbWFya2VyLnN2Z1wiIGNsYXNzTmFtZT1cImltZy1mbHVpZFwiIC8+PC9zcGFuPjEuNUtNPC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHVsIGNsYXNzTmFtZT1cImxpc3QgdGltZS1jb250YWN0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmdy03MDAgdGV4dC1zbVwiPlRpbWluZzogLTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgNzozMCBBTSB0byA4OjMwIFBNXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cIm9wZW4tY2xvc2VcIj5PcGVuIFRvZGF5PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmdy03MDAgdGV4dC1zbVwiPkNvbnRhY3Q6IC08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDAxMjAgMTIzNDU2NywgMDEyMCA3NjU0MzIxXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cIm9wZW4tY2xvc2VcIj5DYWxsIE5vdzwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPExhYlRlc3RzIHsuLi50aGlzLnByb3BzfSAvPlxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwid2lkZ2V0LWNvbnRlbnQgcGItZGV0YWlscyBwYi1sb2NhdGlvblwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGg0IGNsYXNzTmFtZT1cIndjLXRpdGxlIHRleHQtbWQgZnctNzAwXCI+TG9jYXRpb248L2g0PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZGRyZXNzLWRldGFpbHNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW1nIHNyYz1cIi9hc3NldHMvaW1nL2N1c3RvbWVyLWljb25zL21hcC1pY29uLnBuZ1wiIGNsYXNzTmFtZT1cImltZy1mbHVpZCBhZGQtbWFwXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJhZGQtaW5mb1wiPjE5NiwgSHVkYSBQbG90LCBOZWFyLCBEZXZpbmRlciBWaWhhciwgU2VjdG9yIDU2LCBHdXJ1Z3JhbSwgSGFyeWFuYSAxMjIwMTE8L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGItdmlldyB0ZXh0LWxlZnRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YSBocmVmPVwiI1wiIGNsYXNzTmFtZT1cImxpbmstdGV4dCB0ZXh0LW1kIGZ3LTcwMFwiPlZpZXcgaW4gR29vZ2xlIE1hcDwvYT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3aWRnZXQtY29udGVudCBwYi1kZXRhaWxzIHBiLWZhY2lsaXR5XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDQgY2xhc3NOYW1lPVwid2MtdGl0bGUgdGV4dC1tZCBmdy03MDBcIj5GYWNpbGl0eTwvaDQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dWwgY2xhc3NOYW1lPVwibGlzdCBwYi1saXN0IGZhY2lsdHktbGlzdFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaT5QYXJraW5nIEF2YWlsYWJsZTwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpPkNhcmQgQWNjZXB0ZWQ8L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaT5FIFJlcG9ydCBBdmFpbGFibGU8L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaT5Ib21lIENoZWt1cCBBdmFpbGFibGU8L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwid2lkZ2V0LWNvbnRlbnQgcGItZGV0YWlscyBwYi1hYm91dFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGg0IGNsYXNzTmFtZT1cIndjLXRpdGxlIHRleHQtbWQgZnctNzAwXCI+QWJvdXQ8L2g0PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHA+TG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFtZXQsIGNvbnNlY3RldHVyIGFkaXBpc2ljaW5nIGVsaXQsIHNlZCBkbyBlaXVzbW9kXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBvciBpbmNpZGlkdW50IHV0IGxhYm9yZSBldCBkb2xvcmUgbWFnbmEgYWxpcXVhLiBVdCBlbmltIGFkIG1pbmltIHZlbmlhbSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHF1aXMgbm9zdHJ1ZCBleGVyY2l0YXRpb24gdWxsYW1jbyBsYWJvcmlzIG5pc2lcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L3NlY3Rpb24+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IExhYkRldGFpbHNcbiIsImltcG9ydCBMYWJEZXRhaWxzIGZyb20gJy4vTGFiRGV0YWlsLmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBMYWJEZXRhaWxzIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuY2xhc3MgTGFiUHJvZmlsZUNhcmQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgIH1cblxuICAgIG9wZW5MYWIoaWQpe1xuICAgICAgICB0aGlzLnByb3BzLmhpc3RvcnkucHVzaChgL2xhYi8ke2lkfWApXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIGxldCB7IHByaWNlLCBsYWIgfSA9IHRoaXMucHJvcHMuZGV0YWlsc1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIndpZGdldCBjYXJkXCIgb25DbGljaz17dGhpcy5vcGVuTGFiLmJpbmQodGhpcyx0aGlzLnByb3BzLmRldGFpbHMubGFiLmlkKX0+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3aWRnZXQtY29udGVudCBjYXJkLWNvbnRlbnQgYm9vay1jYXJkXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibG9nby1yYXR0aW5nXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJjdC1pbWcgbGFiLWljb25cIj48aW1nIHNyYz1cIi9hc3NldHMvaW1nL2N1c3RvbWVyLWljb25zL2xhYjEucG5nXCIgY2xhc3NOYW1lPVwiaW1nLWZsdWlkXCIgLz48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dWwgY2xhc3NOYW1lPVwiaW5saW5lLWxpc3QgcmF0dGluZ1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaT48c3BhbiBjbGFzc05hbWU9XCJjdC1pbWcgY3QtaW1nLXhzIHN0YXItaWNvblwiPjxpbWcgc3JjPVwiL2Fzc2V0cy9pbWcvY3VzdG9tZXItaWNvbnMvc3Rhci5zdmdcIiBjbGFzc05hbWU9XCJpbWctZmx1aWRcIiAvPjwvc3Bhbj48L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaT48c3BhbiBjbGFzc05hbWU9XCJjdC1pbWcgY3QtaW1nLXhzIHN0YXItaWNvblwiPjxpbWcgc3JjPVwiL2Fzc2V0cy9pbWcvY3VzdG9tZXItaWNvbnMvc3Rhci5zdmdcIiBjbGFzc05hbWU9XCJpbWctZmx1aWRcIiAvPjwvc3Bhbj48L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaT48c3BhbiBjbGFzc05hbWU9XCJjdC1pbWcgY3QtaW1nLXhzIHN0YXItaWNvblwiPjxpbWcgc3JjPVwiL2Fzc2V0cy9pbWcvY3VzdG9tZXItaWNvbnMvc3Rhci5zdmdcIiBjbGFzc05hbWU9XCJpbWctZmx1aWRcIiAvPjwvc3Bhbj48L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaT48c3BhbiBjbGFzc05hbWU9XCJjdC1pbWcgY3QtaW1nLXhzIHN0YXItaWNvblwiPjxpbWcgc3JjPVwiL2Fzc2V0cy9pbWcvY3VzdG9tZXItaWNvbnMvc3Rhci5zdmdcIiBjbGFzc05hbWU9XCJpbWctZmx1aWRcIiAvPjwvc3Bhbj48L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaT48c3BhbiBjbGFzc05hbWU9XCJjdC1pbWcgY3QtaW1nLXhzIHN0YXItaWNvblwiPjxpbWcgc3JjPVwiL2Fzc2V0cy9pbWcvY3VzdG9tZXItaWNvbnMvaGFsZi1zdGFyLnN2Z1wiIGNsYXNzTmFtZT1cImltZy1mbHVpZFwiIC8+PC9zcGFuPjwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJ2LWJ0biB2LWJ0bi1wcmltYXJ5IHBpY2t1cC1idG5cIj5QaWNrdXAgQXZhaWxhYmxlPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJvb2stY2FyZC1jb250ZW50XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aDQgY2xhc3NOYW1lPVwiYm9vay1jYXJ0LXRpdGxlXCI+e2xhYi5uYW1lfTwvaDQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJkZXNjXCI+Qmxvb2QgVGVzdCwgUGF0aG9sb2d5IFVsdHJhc291bmQsIE1SSSwgQ1RJIFNlY3RvciA1MiBHdXJnYW9uIHwgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1wcmltYXJ5IGZ3LTcwMFwiPjEuNSBLTTwvc3Bhbj48L3A+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwid2lkZ2V0LWZvb3RlciBjYXJkLWZvb3RlclwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtNlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cImxhYi1wcmljZVwiPlRvdGFsIFJzIHtwcmljZX08L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLTYgdGV4dC1yaWdodFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwidi1idG4gdi1idG4tcHJpbWFyeSBidG4tbWRcIj5Cb29rIExhYjwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IExhYlByb2ZpbGVDYXJkXG4iLCJpbXBvcnQgTGFiUHJvZmlsZUNhcmQgZnJvbSAnLi9MYWJQcm9maWxlQ2FyZC5qcydcblxuZXhwb3J0IGRlZmF1bHQgTGFiUHJvZmlsZUNhcmQiLCJpbXBvcnQgTGFiVGVzdHMgZnJvbSAnLi9sYWJUZXN0cydcblxuZXhwb3J0IGRlZmF1bHQgTGFiVGVzdHMiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcblxuY2xhc3MgTGFiVGVzdHMgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgfVxuXG4gICAgb3BlblRlc3RzKCkge1xuICAgICAgICB0aGlzLnByb3BzLmhpc3RvcnkucHVzaChgL2xhYi8ke3RoaXMucHJvcHMuZGF0YS5sYWIuaWR9L3Rlc3RzYClcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgbGV0IHRlc3RzID0gW11cbiAgICAgICAgaWYgKHRoaXMucHJvcHMuZGF0YS50ZXN0cyAmJiB0aGlzLnByb3BzLmRhdGEudGVzdHMubGVuZ3RoKSB7XG4gICAgICAgICAgICB0ZXN0cyA9IHRoaXMucHJvcHMuZGF0YS50ZXN0cy5tYXAoKHRlc3QsIGkpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gPGxpIGtleT17aX0+e3Rlc3QudGVzdC5uYW1lfSA8c3BhbiBjbGFzc05hbWU9XCJ0ZXN0LXByaWNlXCI+UnMge3Rlc3QubXJwfTwvc3Bhbj48L2xpPlxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIndpZGdldC1jb250ZW50IHBiLWRldGFpbHMgcGItdGVzdFwiPlxuICAgICAgICAgICAgICAgIDxoNCBjbGFzc05hbWU9XCJ3Yy10aXRsZSB0ZXh0LW1kIGZ3LTcwMFwiPlRlc3RzICh7dGVzdHMubGVuZ3RofSk8L2g0PlxuICAgICAgICAgICAgICAgIDx1bCBjbGFzc05hbWU9XCJsaXN0IHBiLWxpc3QgcGItdGVzdC1saXN0XCI+XG4gICAgICAgICAgICAgICAgICAgIHt0ZXN0cy5zbGljZSgwLDMpfVxuICAgICAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwYi12aWV3IHRleHQtcmlnaHRcIj5cbiAgICAgICAgICAgICAgICAgICAgPGEgY2xhc3NOYW1lPVwibGluay10ZXh0IHRleHQtbWQgZnctNzAwXCIgb25DbGljaz17dGhpcy5vcGVuVGVzdHMuYmluZCh0aGlzKX0+VmlldyBBbGw8L2E+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgTGFiVGVzdHNcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG5pbXBvcnQgRXhwYW5zaW9uUGFuZWwsIHtcbiAgICBFeHBhbnNpb25QYW5lbFN1bW1hcnksXG4gICAgRXhwYW5zaW9uUGFuZWxEZXRhaWxzLFxufSBmcm9tICdtYXRlcmlhbC11aS9FeHBhbnNpb25QYW5lbCc7XG5pbXBvcnQgRXhwYW5kTW9yZUljb24gZnJvbSAnbWF0ZXJpYWwtdWktaWNvbnMvRXhwYW5kTW9yZSc7XG5cblxuY2xhc3MgT3JkZXJEZXRhaWxzIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcblxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICBsZXQgcHJpY2VfYnJlYWt1cCA9IFtdXG4gICAgICAgIGxldCB0b3RhbFByaWNlID0gMFxuICAgICAgICBsZXQgdG90YWxUZXN0cyA9IDBcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuZGF0YS5wcmljZV9icmVha3VwICYmIHRoaXMucHJvcHMuZGF0YS5wcmljZV9icmVha3VwLmJyZWFrdXApIHtcbiAgICAgICAgICAgIHByaWNlX2JyZWFrdXAgPSB0aGlzLnByb3BzLmRhdGEucHJpY2VfYnJlYWt1cC5icmVha3VwLm1hcCgodGVzdCwgaSkgPT4ge1xuICAgICAgICAgICAgICAgIHRvdGFsUHJpY2UgKz0gdGVzdC5hbW91bnRcbiAgICAgICAgICAgICAgICB0b3RhbFRlc3RzKytcbiAgICAgICAgICAgICAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9XCJ0ZXN0UHJpY2VSb3dcIiBrZXk9e2l9PlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0bmFtZVwiPnt0ZXN0Lm5hbWV9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0YW1vdW50XCI+UnMuIHt0ZXN0LmFtb3VudH08L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwib3JkZXJEZXRhaWxzXCI+XG4gICAgICAgICAgICAgICAgPEV4cGFuc2lvblBhbmVsPlxuICAgICAgICAgICAgICAgICAgICA8RXhwYW5zaW9uUGFuZWxTdW1tYXJ5IGV4cGFuZEljb249ezxFeHBhbmRNb3JlSWNvbiAvPn0+XG4gICAgICAgICAgICAgICAgICAgICAgICBPcmRlciBEZXRhaWxzIC0ge3RvdGFsVGVzdHN9IFRlc3RzXG4gICAgICAgICAgICAgICAgICAgIDwvRXhwYW5zaW9uUGFuZWxTdW1tYXJ5PlxuICAgICAgICAgICAgICAgICAgICA8RXhwYW5zaW9uUGFuZWxEZXRhaWxzPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwcmljZUNvbnRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7cHJpY2VfYnJlYWt1cH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRlc3RUb3RhbFJvd1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0bmFtZVwiPntcIlRvdGFsXCJ9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0YW1vdW50XCI+UnMuIHt0b3RhbFByaWNlfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRlc3RUb3RhbFJvd1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0bmFtZVwiPntcIkdTVFwifTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGFtb3VudFwiPlJzLiB7dG90YWxQcmljZSoxLjE4fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRlc3RUb3RhbFJvd1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0bmFtZVwiPntcIlBheWFibGVcIn08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRhbW91bnRcIj5Scy4ge3RvdGFsUHJpY2UqMS4xOH08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9FeHBhbnNpb25QYW5lbERldGFpbHM+XG4gICAgICAgICAgICAgICAgPC9FeHBhbnNpb25QYW5lbD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBPcmRlckRldGFpbHNcbiIsImltcG9ydCBPcmRlckRldGFpbHMgZnJvbSAnLi9PcmRlckRldGFpbHMuanMnXG5cbmV4cG9ydCBkZWZhdWx0IE9yZGVyRGV0YWlscyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCBMYWJEZXRhaWxzIGZyb20gJy4uL2NvbW1vbnMvbGFiRGV0YWlscy9pbmRleC5qcydcbmltcG9ydCBMb2FkZXIgZnJvbSAnLi4vLi4vY29tbW9ucy9Mb2FkZXInXG5cbmNsYXNzIExhYlZpZXcgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgc2VsZWN0ZWRMYWI6IHRoaXMucHJvcHMubWF0Y2gucGFyYW1zLmlkXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBib29rTGFiKCkge1xuICAgICAgICB0aGlzLnByb3BzLmhpc3RvcnkucHVzaChgL2xhYi8ke3RoaXMuc3RhdGUuc2VsZWN0ZWRMYWJ9L2Jvb2tgKVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICA8aGVhZGVyIGNsYXNzTmFtZT1cInNraW4tcHJpbWFyeSBmaXhlZCBob3Jpem9udGFsIHRvcCBwcm9maWxlLWJvb2staGVhZGVyXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGFpbmVyLWZsdWlkXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLTRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJoZWFkZXItdGl0bGUgZnctNzAwIGNhcGl0YWxpemUgdGV4dC13aGl0ZVwiPklDT048L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC00XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtNFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dWwgY2xhc3NOYW1lPVwiaW5saW5lLWxpc3QgZmxvYXQtcmlnaHQgdXNlci1ub3RpZmljYXRpb24tYWN0aW9uXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGk+PHNwYW4gY2xhc3NOYW1lPVwiaWNvbiBpY29uLW1kIHRleHQtbWlkZGxlXCI+PGltZyBzcmM9XCIvYXNzZXRzL2ltZy9jdXN0b21lci1pY29ucy91c2VyLnN2Z1wiIGNsYXNzTmFtZT1cImltZy1mbHVpZFwiIC8+PC9zcGFuPjwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGk+PHNwYW4gY2xhc3NOYW1lPVwiaWNvbiBpY29uLW1kIHRleHQtbWlkZGxlIG5vdGlmaWNhdGlvbi1pY29uXCI+PGltZyBzcmM9XCIvYXNzZXRzL2ltZy9jdXN0b21lci1pY29ucy9ub3RpZmljYXRpb24uc3ZnXCIgY2xhc3NOYW1lPVwiaW1nLWZsdWlkXCIgLz4gPHNwYW4gY2xhc3NOYW1lPVwibm90aWZpY2F0aW9uLWFsZXJ0XCIgLz48L3NwYW4+PC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2hlYWRlcj5cblxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5MQUJTW3RoaXMuc3RhdGUuc2VsZWN0ZWRMYWJdID9cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJza2luLXByaW1hcnkgZW1wdHktaGVhZGVyIFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPExhYkRldGFpbHMgey4uLnRoaXMucHJvcHN9IGRhdGE9e3RoaXMucHJvcHMuTEFCU1t0aGlzLnN0YXRlLnNlbGVjdGVkTGFiXX0gLz5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gb25DbGljaz17dGhpcy5ib29rTGFiLmJpbmQodGhpcyl9IGNsYXNzTmFtZT1cInYtYnRuIHYtYnRuLXByaW1hcnkgYnRuLWxnIGZpeGVkIGhvcml6b250YWwgYm90dG9tIG5vLXJvdW5kIGJ0bi1sZyB0ZXh0LWxnXCI+PHNwYW4gY2xhc3NOYW1lPVwidGV4dC14cyBzZWxlY3RlZC1vcHRpb25cIj4oe3RoaXMucHJvcHMuc2VsZWN0ZWRDcml0ZXJpYXMubGVuZ3RofSBTZWxlY3RlZCkgPC9zcGFuPkJvb2tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cblxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+IDogPExvYWRlciAvPlxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBMYWJWaWV3XG4iLCJpbXBvcnQgTGFiVmlldyBmcm9tICcuL0xhYlZpZXcuanMnXG5cbmV4cG9ydCBkZWZhdWx0IExhYlZpZXciLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcblxuaW1wb3J0IExhYkRldGFpbHMgZnJvbSAnLi4vY29tbW9ucy9sYWJEZXRhaWxzL2luZGV4LmpzJ1xuaW1wb3J0IE9yZGVyRGV0YWlscyBmcm9tICcuLi9jb21tb25zL29yZGVyRGV0YWlscy9pbmRleC5qcydcbmltcG9ydCBEZXRhaWxzRm9ybSBmcm9tICcuL2RldGFpbHNGb3JtL2luZGV4LmpzJ1xuaW1wb3J0IEFkZHJlc3NGb3JtIGZyb20gJy4vYWRkcmVzc0Zvcm0vaW5kZXguanMnO1xuXG5jbGFzcyBQYXRpZW50RGV0YWlsc1ZpZXcgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgc2VsZWN0ZWRMYWI6IG51bGwsXG4gICAgICAgICAgICBzZWxlY3RlZFRlc3RzOiBcIlwiLFxuICAgICAgICAgICAgc2VsZWN0ZWRTbG90OiBudWxsLFxuICAgICAgICAgICAgc2VsZWN0ZWRTbG90U3RhcnQgOiBudWxsLFxuICAgICAgICAgICAgc2VsZWN0ZWRTbG90RW5kIDogbnVsbFxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0TG9jYXRpb25QYXJhbSh0YWcpIHtcbiAgICAgICAgLy8gdGhpcyBBUEkgYXNzdW1lcyB0aGUgY29udGV4dCBvZiByZWFjdC1yb3V0ZXItNFxuICAgICAgICBjb25zdCBwYXJhbVN0cmluZyA9IHRoaXMucHJvcHMubG9jYXRpb24uc2VhcmNoXG4gICAgICAgIGNvbnN0IHBhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXMocGFyYW1TdHJpbmcpXG4gICAgICAgIHJldHVybiBwYXJhbXMuZ2V0KHRhZylcbiAgICB9XG5cbiAgICBwcm9jZWVkKCl7XG4gICAgICAgIHRoaXMuY29udGV4dC5yb3V0ZXIuaGlzdG9yeS5wdXNoKCcvbGFiL2Jvb2tpbmcvc3VtbWFyeS9JVUhCVUg4Nzg3VUhCJylcbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgbGV0IGxhYklkID0gdGhpcy5wcm9wcy5tYXRjaC5wYXJhbXMuaWRcbiAgICAgICAgbGV0IHRlc3RzID0gdGhpcy5nZXRMb2NhdGlvblBhcmFtKCd0ZXN0cycpXG4gICAgICAgIGxldCBzZWxlY3RlZFNsb3RTdGFydCA9IHRoaXMuZ2V0TG9jYXRpb25QYXJhbSgndF9zdGFydCcpXG4gICAgICAgIHNlbGVjdGVkU2xvdFN0YXJ0ID0gbmV3IERhdGUocGFyc2VGbG9hdChzZWxlY3RlZFNsb3RTdGFydCkpXG4gICAgICAgIHNlbGVjdGVkU2xvdFN0YXJ0ID0gc2VsZWN0ZWRTbG90U3RhcnQudG9TdHJpbmcoKVxuICAgICAgICBsZXQgc2VsZWN0ZWRTbG90RW5kID0gdGhpcy5nZXRMb2NhdGlvblBhcmFtKCd0X2VuZCcpXG4gICAgICAgIHNlbGVjdGVkU2xvdEVuZCA9IG5ldyBEYXRlKHBhcnNlRmxvYXQoc2VsZWN0ZWRTbG90RW5kKSlcbiAgICAgICAgc2VsZWN0ZWRTbG90RW5kID0gc2VsZWN0ZWRTbG90RW5kLnRvU3RyaW5nKClcbiAgICAgICAgaWYgKGxhYklkKSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgc2VsZWN0ZWRMYWI6IGxhYklkLCBzZWxlY3RlZFRlc3RzOiB0ZXN0cywgc2VsZWN0ZWRTbG90U3RhcnQsIHNlbGVjdGVkU2xvdEVuZCB9KVxuICAgICAgICAgICAgdGhpcy5wcm9wcy5nZXRMYWJCeUlkKGxhYklkKVxuXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdGF0aWMgY29udGV4dFR5cGVzID0ge1xuICAgICAgICByb3V0ZXI6ICgpID0+IG51bGxcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGF0aWVudERldGFpbHNcIj5cblxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5MQUJTW3RoaXMuc3RhdGUuc2VsZWN0ZWRMYWJdID9cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPExhYkRldGFpbHMgZGF0YT17dGhpcy5wcm9wcy5MQUJTW3RoaXMuc3RhdGUuc2VsZWN0ZWRMYWJdfSAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxPcmRlckRldGFpbHMgZGF0YT17dGhpcy5wcm9wcy5MQUJTW3RoaXMuc3RhdGUuc2VsZWN0ZWRMYWJdfSAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic2VsZWN0ZWRBcHBvaW50bWVudFNsb3RcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGg1PlNlbGVjdGVkIEFwcG9pbnRtZW50IFNsb3Q8L2g1PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJhcHBkYXRlXCI+QXBwb2ludG1lbnQgRGF0ZTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZGF0ZVwiPnsgdGhpcy5zdGF0ZS5zZWxlY3RlZFNsb3RTdGFydCB9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxEZXRhaWxzRm9ybSAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxBZGRyZXNzRm9ybSBjaXR5PVwiU2VsZWN0ZWQgdmFsdWVcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwicHJvY2VlZGJ0blwiIG9uQ2xpY2s9e3RoaXMucHJvY2VlZC5iaW5kKHRoaXMpfT5Qcm9jZWVkPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj4gOiBcIlwiXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgUGF0aWVudERldGFpbHNWaWV3XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcblxuY2xhc3MgQWRkcmVzc0Zvcm0gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgYWRkcmVzczonJyxcbiAgICAgICAgICAgIGxvY2FsaXR5OicnLFxuICAgICAgICAgICAgbGFuZG1hcms6JycsXG4gICAgICAgICAgICBwaW5jb2RlOicnLFxuICAgICAgICAgICAgY2l0eTpwcm9wcy5jaXR5XG5cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlucHV0SGFuZGxlcih3aGljaCwgZSl7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBbd2hpY2hdIDogZS50YXJnZXQudmFsdWUgfSlcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZGV0YWlsc0Zvcm1cIj5cbiAgICAgICAgICAgICAgICA8aDU+UGxlYXNlIHByb3ZpZGUgcGF0aWVudCBkZXRhaWxzPC9oNT5cblxuICAgICAgICAgICAgICAgIDxpbnB1dCB2YWx1ZT17dGhpcy5zdGF0ZS5hZGRyZXNzfSBvbkNoYW5nZT17dGhpcy5pbnB1dEhhbmRsZXIuYmluZCh0aGlzLCdhZGRyZXNzJyl9IGNsYXNzTmFtZT1cInB0bmFtZVwiIHBsYWNlaG9sZGVyPVwiQWRkcmVzcypcIiAvPlxuICAgICAgICAgICAgICAgIDxpbnB1dCB2YWx1ZT17dGhpcy5zdGF0ZS5sb2NhbGl0eX0gb25DaGFuZ2U9e3RoaXMuaW5wdXRIYW5kbGVyLmJpbmQodGhpcywnbG9jYWxpdHknKX0gY2xhc3NOYW1lPVwicHRuYW1lXCIgcGxhY2Vob2xkZXI9XCJMb2NhbGl0eSpcIiAvPlxuICAgICAgICAgICAgICAgIDxpbnB1dCB2YWx1ZT17dGhpcy5zdGF0ZS5sYW5kbWFya30gb25DaGFuZ2U9e3RoaXMuaW5wdXRIYW5kbGVyLmJpbmQodGhpcywnbGFuZG1hcmsnKX0gY2xhc3NOYW1lPVwicHRuYW1lXCIgcGxhY2Vob2xkZXI9XCJMYW5kbWFyaypcIiAvPlxuICAgICAgICAgICAgICAgIDxpbnB1dCB2YWx1ZT17dGhpcy5zdGF0ZS5waW5jb2RlfSBvbkNoYW5nZT17dGhpcy5pbnB1dEhhbmRsZXIuYmluZCh0aGlzLCdwaW5jb2RlJyl9IGNsYXNzTmFtZT1cInB0bW9iaWxlXCIgcGxhY2Vob2xkZXI9XCJQaW5jb2RlKlwiIC8+XG4gICAgICAgICAgICAgICAgey8qIDxpbnB1dCB2YWx1ZT17dGhpcy5zdGF0ZS5jaXR5fSBvbkNoYW5nZT17dGhpcy5pbnB1dEhhbmRsZXIuYmluZCh0aGlzLCdjaXR5Jyl9IGRpc2FibGVkIGNsYXNzTmFtZT1cInB0b3RwXCIgcGxhY2Vob2xkZXI9XCJDaXR5XCIgLz4gKi99XG5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBBZGRyZXNzRm9ybVxuIiwiaW1wb3J0IEFkZHJlc3NGb3JtIGZyb20gJy4vQWRkcmVzc0Zvcm0uanMnXG5cbmV4cG9ydCBkZWZhdWx0IEFkZHJlc3NGb3JtIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cbmNsYXNzIERldGFpbHNGb3JtIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIHBhdGllbnROYW1lIDogJycsXG4gICAgICAgICAgICBwYXRpZW50RW1haWwgOiAnJyxcbiAgICAgICAgICAgIHBhdGllbnRHZW5kZXIgOiAnbWFsZScsXG4gICAgICAgICAgICBtb2JpbGU6JycsXG4gICAgICAgICAgICBvdHAgOicnLFxuICAgICAgICAgICAgcGF0aWVudE1vYmlsZSA6ICcnXG5cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlucHV0SGFuZGxlcih3aGljaCwgZSl7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBbd2hpY2hdIDogZS50YXJnZXQudmFsdWUgfSlcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZGV0YWlsc0Zvcm1cIj5cbiAgICAgICAgICAgICAgICA8aDU+UGxlYXNlIHByb3ZpZGUgcGF0aWVudCBkZXRhaWxzPC9oNT5cblxuICAgICAgICAgICAgICAgIDxpbnB1dCB2YWx1ZT17dGhpcy5zdGF0ZS5wYXRpZW50TmFtZX0gb25DaGFuZ2U9e3RoaXMuaW5wdXRIYW5kbGVyLmJpbmQodGhpcywncGF0aWVudE5hbWUnKX0gY2xhc3NOYW1lPVwicHRuYW1lXCIgcGxhY2Vob2xkZXI9XCJQYXRpZW50IE5hbWUqXCIgLz5cbiAgICAgICAgICAgICAgICA8aW5wdXQgdmFsdWU9e3RoaXMuc3RhdGUucGF0aWVudEVtYWlsfSBvbkNoYW5nZT17dGhpcy5pbnB1dEhhbmRsZXIuYmluZCh0aGlzLCdwYXRpZW50RW1haWwnKX0gY2xhc3NOYW1lPVwicHRlbWFpbFwiIHBsYWNlaG9sZGVyPVwiRW1haWwqXCIgLz5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInB0Z2VuZGVyXCI+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuPkdlbmRlciA6PC9zcGFuPiBcbiAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJyYWRpb1wiIG5hbWU9XCJnZW5kZXJcIiB2YWx1ZT1cIm1hbGVcIiBjaGVja2VkPXt0aGlzLnN0YXRlLnBhdGllbnRHZW5kZXIgPT09IFwibWFsZVwifSBvbkNoYW5nZT17dGhpcy5pbnB1dEhhbmRsZXIuYmluZCh0aGlzLCdwYXRpZW50R2VuZGVyJyl9Lz4gTWFsZVxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInJhZGlvXCIgbmFtZT1cImdlbmRlclwiIHZhbHVlPVwiZmVtYWxlXCIgY2hlY2tlZD17dGhpcy5zdGF0ZS5wYXRpZW50R2VuZGVyID09PSBcImZlbWFsZVwifSBvbkNoYW5nZT17dGhpcy5pbnB1dEhhbmRsZXIuYmluZCh0aGlzLCdwYXRpZW50R2VuZGVyJyl9Lz4gRmVtYWxlXG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGlucHV0IHZhbHVlPXt0aGlzLnN0YXRlLm1vYmlsZX0gb25DaGFuZ2U9e3RoaXMuaW5wdXRIYW5kbGVyLmJpbmQodGhpcywnbW9iaWxlJyl9IGNsYXNzTmFtZT1cInB0bW9iaWxlXCIgcGxhY2Vob2xkZXI9XCJNb2JpbGUqXCIgLz5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cIm90cGJ0blwiPihSZSlTZW5kIE9UUDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDxpbnB1dCB2YWx1ZT17dGhpcy5zdGF0ZS5vdHB9IG9uQ2hhbmdlPXt0aGlzLmlucHV0SGFuZGxlci5iaW5kKHRoaXMsJ290cCcpfSBjbGFzc05hbWU9XCJwdG90cFwiIHBsYWNlaG9sZGVyPVwiRW50ZXIgT1RQKlwiIC8+XG4gICAgICAgICAgICAgICAgPGlucHV0IHZhbHVlPXt0aGlzLnN0YXRlLnBhdGllbnRNb2JpbGV9IG9uQ2hhbmdlPXt0aGlzLmlucHV0SGFuZGxlci5iaW5kKHRoaXMsJ3BhdGllbnRNb2JpbGUnKX0gY2xhc3NOYW1lPVwicHRtb2JpbGVcIiBwbGFjZWhvbGRlcj1cIlBhdGllbnQgTW9iaWxlKlwiIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICBcbiAgICAgICAgKTtcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgRGV0YWlsc0Zvcm1cbiIsImltcG9ydCBEZXRhaWxzRm9ybSBmcm9tICcuL0RldGFpbHNGb3JtLmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBEZXRhaWxzRm9ybSIsImltcG9ydCBQYXRpZW50RGV0YWlsc1ZpZXcgZnJvbSAnLi9QYXRpZW50RGV0YWlsc1ZpZXcuanMnXG5cbmV4cG9ydCBkZWZhdWx0IFBhdGllbnREZXRhaWxzVmlldyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG5pbXBvcnQgQ29tbW9ubHlTZWFyY2hlZCBmcm9tICcuLi8uLi9jb21tb25zL2NvbW1vbmx5U2VhcmNoZWQvaW5kZXguanMnXG5pbXBvcnQgQ3JpdGVyaWFTZWFyY2ggZnJvbSAnLi4vLi4vY29tbW9ucy9jcml0ZXJpYVNlYXJjaCdcblxuY2xhc3MgU2VhcmNoQ3JpdGVyaWFWaWV3IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcblxuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2VhcmNoUHJvY2VlZCgpIHtcbiAgICAgICAgbGV0IHNlYXJjaERhdGEgPSB7XG4gICAgICAgICAgICBzZWxlY3RlZENyaXRlcmlhcyA6IHRoaXMucHJvcHMuc2VsZWN0ZWRDcml0ZXJpYXMsXG4gICAgICAgICAgICBzZWxlY3RlZExvY2F0aW9uIDogdGhpcy5wcm9wcy5zZWxlY3RlZExvY2F0aW9uLFxuICAgICAgICB9XG4gICAgICAgIHNlYXJjaERhdGEgPSBlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc2VhcmNoRGF0YSkpXG4gICAgICAgIGxldCBmaWx0ZXJEYXRhID0gZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHRoaXMucHJvcHMuZmlsdGVyQ3JpdGVyaWEpKVxuICAgICAgICB0aGlzLnByb3BzLmhpc3RvcnkucHVzaChgL2R4L3NlYXJjaHJlc3VsdHM/c2VhcmNoPSR7c2VhcmNoRGF0YX0mZmlsdGVyPSR7ZmlsdGVyRGF0YX1gKVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdj5cblxuICAgICAgICAgICAgICAgIDxDcml0ZXJpYVNlYXJjaCB7Li4udGhpcy5wcm9wc30gY2hlY2tGb3JMb2FkPXt0aGlzLnByb3BzLkxPQURFRF9TRUFSQ0hfQ1JJVEVSSUFfTEFCfSB0aXRsZT1cIlNlYXJjaCBmb3IgVGVzdCBhbmQgTGFicy5cIj5cbiAgICAgICAgICAgICAgICAgICAgPHNlY3Rpb24gY2xhc3NOYW1lPVwid3JhcCB3cmFwLTEwMFwiPlxuXG4gICAgICAgICAgICAgICAgICAgICAgICA8Q29tbW9ubHlTZWFyY2hlZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRpbmc9XCJTZWxlY3RlZCBDcml0ZXJpYVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YT17dGhpcy5wcm9wcy5zZWxlY3RlZENyaXRlcmlhc31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZD17W119XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9nZ2xlPXt0aGlzLnByb3BzLnRvZ2dsZURpYWdub3Npc0NyaXRlcmlhLmJpbmQodGhpcyl9XG4gICAgICAgICAgICAgICAgICAgICAgICAvPlxuXG4gICAgICAgICAgICAgICAgICAgICAgICA8Q29tbW9ubHlTZWFyY2hlZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRpbmc9XCJDb21tb24gVGVzdFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cInRlc3RcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE9e3RoaXMucHJvcHMuY29tbW9uX3Rlc3RzfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkPXt0aGlzLnByb3BzLnNlbGVjdGVkQ3JpdGVyaWFzLmZpbHRlcih4ID0+IHgudHlwZSA9PSAndGVzdCcpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvZ2dsZT17dGhpcy5wcm9wcy50b2dnbGVEaWFnbm9zaXNDcml0ZXJpYS5iaW5kKHRoaXMpfVxuICAgICAgICAgICAgICAgICAgICAgICAgLz5cblxuICAgICAgICAgICAgICAgICAgICAgICAgPENvbW1vbmx5U2VhcmNoZWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWFkaW5nPVwiQ29tbW9uIENvbmRpdGlvbnNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJsYWJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE9e3RoaXMucHJvcHMuY29tbW9uX2NvbmRpdGlvbnN9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWQ9e3RoaXMucHJvcHMuc2VsZWN0ZWRDcml0ZXJpYXMuZmlsdGVyKHggPT4geC50eXBlID09ICdsYWInKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b2dnbGU9e3RoaXMucHJvcHMudG9nZ2xlRGlhZ25vc2lzQ3JpdGVyaWEuYmluZCh0aGlzKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxDb21tb25seVNlYXJjaGVkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGluZz1cIkNvbW1vbiBMYWJzXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwibGFiXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhPXt0aGlzLnByb3BzLnByZWZlcnJlZF9sYWJzfVxuICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgPC9zZWN0aW9uPlxuICAgICAgICAgICAgICAgIDwvQ3JpdGVyaWFTZWFyY2g+XG5cblxuXG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXt0aGlzLnNlYXJjaFByb2NlZWQuYmluZCh0aGlzKX0gY2xhc3NOYW1lPVwidi1idG4gdi1idG4tcHJpbWFyeSBidG4tbGcgZml4ZWQgaG9yaXpvbnRhbCBib3R0b20gbm8tcm91bmQgdGV4dC1sZ1wiPlNob3cgTGFiczwvYnV0dG9uPlxuXG5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgU2VhcmNoQ3JpdGVyaWFWaWV3XG4iLCJpbXBvcnQgU2VhcmNoQ3JpdGVyaWFWaWV3IGZyb20gJy4vU2VhcmNoQ3JpdGVyaWFWaWV3LmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBTZWFyY2hDcml0ZXJpYVZpZXciLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgTGFic0xpc3QgZnJvbSAnLi4vc2VhcmNoUmVzdWx0cy9sYWJzTGlzdC9pbmRleC5qcydcbmltcG9ydCBDcml0ZXJpYVNlYXJjaCBmcm9tICcuLi8uLi9jb21tb25zL2NyaXRlcmlhU2VhcmNoJ1xuaW1wb3J0IFRvcEJhciBmcm9tICcuL3RvcEJhcidcblxuY2xhc3MgU2VhcmNoUmVzdWx0c1ZpZXcgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgICAgICB0aGlzLnN0YXRlID0ge1xuXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgdGhpcy5nZXRMYWJzKClcbiAgICB9XG5cbiAgICBnZXRMYWJzKCkge1xuICAgICAgICBsZXQge1xuICAgICAgICAgICAgc2VsZWN0ZWRMb2NhdGlvbixcbiAgICAgICAgICAgIHNlbGVjdGVkQ3JpdGVyaWFzLFxuICAgICAgICAgICAgZmlsdGVyQ3JpdGVyaWFcbiAgICAgICAgfSA9IHRoaXMucHJvcHNcblxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgbGV0IHNlYXJjaFN0YXRlID0gdGhpcy5nZXRMb2NhdGlvblBhcmFtKCdzZWFyY2gnKVxuICAgICAgICAgICAgbGV0IGZpbHRlckNyaXRlcmlhID0gdGhpcy5nZXRMb2NhdGlvblBhcmFtKCdmaWx0ZXInKVxuICAgICAgICAgICAgaWYgKGZpbHRlckNyaXRlcmlhKSB7XG4gICAgICAgICAgICAgICAgZmlsdGVyQ3JpdGVyaWEgPSBKU09OLnBhcnNlKGZpbHRlckNyaXRlcmlhKVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBmaWx0ZXJDcml0ZXJpYSA9IHt9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzZWFyY2hTdGF0ZSA9IEpTT04ucGFyc2Uoc2VhcmNoU3RhdGUpXG4gICAgICAgICAgICB0aGlzLmdldExhYkxpc3Qoc2VhcmNoU3RhdGUsIGZpbHRlckNyaXRlcmlhLCB0cnVlKVxuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGUpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRMb2NhdGlvblBhcmFtKHRhZykge1xuICAgICAgICAvLyB0aGlzIEFQSSBhc3N1bWVzIHRoZSBjb250ZXh0IG9mIHJlYWN0LXJvdXRlci00XG4gICAgICAgIGNvbnN0IHBhcmFtU3RyaW5nID0gdGhpcy5wcm9wcy5sb2NhdGlvbi5zZWFyY2hcbiAgICAgICAgY29uc3QgcGFyYW1zID0gbmV3IFVSTFNlYXJjaFBhcmFtcyhwYXJhbVN0cmluZylcbiAgICAgICAgcmV0dXJuIHBhcmFtcy5nZXQodGFnKVxuICAgIH1cblxuICAgIGdldExhYkxpc3Qoc2VhcmNoU3RhdGUsIGZpbHRlckNyaXRlcmlhLCBtZXJnZVN0YXRlKSB7XG4gICAgICAgIHRoaXMucHJvcHMuZ2V0TGFicyhzZWFyY2hTdGF0ZSwgZmlsdGVyQ3JpdGVyaWEsIG1lcmdlU3RhdGUpO1xuICAgIH1cblxuICAgIGFwcGx5RmlsdGVycyhmaWx0ZXJTdGF0ZSkge1xuICAgICAgICBsZXQgc2VhcmNoU3RhdGUgPSB7XG4gICAgICAgICAgICBzZWxlY3RlZENyaXRlcmlhczogdGhpcy5wcm9wcy5zZWxlY3RlZENyaXRlcmlhcyxcbiAgICAgICAgICAgIHNlbGVjdGVkTG9jYXRpb246IHRoaXMucHJvcHMuc2VsZWN0ZWRMb2NhdGlvbixcbiAgICAgICAgfVxuICAgICAgICBsZXQgc2VhcmNoRGF0YSA9IGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzZWFyY2hTdGF0ZSkpXG4gICAgICAgIGxldCBmaWx0ZXJEYXRhID0gZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGZpbHRlclN0YXRlKSlcbiAgICAgICAgdGhpcy5wcm9wcy5oaXN0b3J5LnJlcGxhY2UoYC9keC9zZWFyY2hyZXN1bHRzP3NlYXJjaD0ke3NlYXJjaERhdGF9JmZpbHRlcj0ke2ZpbHRlckRhdGF9YClcblxuICAgICAgICB0aGlzLmdldExhYkxpc3Qoc2VhcmNoU3RhdGUsIGZpbHRlclN0YXRlLCB0cnVlKVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICA8Q3JpdGVyaWFTZWFyY2ggey4uLnRoaXMucHJvcHN9IGNoZWNrRm9yTG9hZD17dGhpcy5wcm9wcy5MT0FERURfTEFCU19TRUFSQ0h9IHRpdGxlPVwiU2VhcmNoIGZvciBUZXN0IGFuZCBMYWJzLlwiPlxuICAgICAgICAgICAgICAgICAgICA8VG9wQmFyIHsuLi50aGlzLnByb3BzfSBhcHBseUZpbHRlcnM9e3RoaXMuYXBwbHlGaWx0ZXJzLmJpbmQodGhpcyl9IC8+XG4gICAgICAgICAgICAgICAgICAgIDxMYWJzTGlzdCB7Li4udGhpcy5wcm9wc30gLz5cbiAgICAgICAgICAgICAgICA8L0NyaXRlcmlhU2VhcmNoPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBTZWFyY2hSZXN1bHRzVmlld1xuIiwiaW1wb3J0IFNlYXJjaFJlc3VsdHNWaWV3IGZyb20gJy4vU2VhcmNoUmVzdWx0c1ZpZXcuanMnXG5cbmV4cG9ydCBkZWZhdWx0IFNlYXJjaFJlc3VsdHNWaWV3IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IExhYlByb2ZpbGVDYXJkIGZyb20gJy4uLy4uL2NvbW1vbnMvbGFiUHJvZmlsZUNhcmQvaW5kZXguanMnXG5cbmNsYXNzIExhYnNMaXN0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgbGV0IHsgTEFCUywgbGFiTGlzdCB9ID0gdGhpcy5wcm9wc1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8c2VjdGlvbiBjbGFzc05hbWU9XCJ3cmFwIHNlYXJjaC1ib29rLXJlc3VsdFwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGFpbmVyLWZsdWlkXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC0xMlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiTGlzdC5tYXAoKGxhYklkLCBpKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gPExhYlByb2ZpbGVDYXJkIHsuLi50aGlzLnByb3BzfSBkZXRhaWxzPXtMQUJTW2xhYklkXX0ga2V5PXtpfSAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvc2VjdGlvbj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgTGFic0xpc3RcbiIsImltcG9ydCBMYWJzTGlzdCBmcm9tICcuL0xhYnNMaXN0LmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBMYWJzTGlzdCIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG5pbXBvcnQgTWVudSwgeyBNZW51SXRlbSB9IGZyb20gJ21hdGVyaWFsLXVpL01lbnUnO1xuaW1wb3J0IFJhbmdlIGZyb20gJ3JjLXNsaWRlci9saWIvUmFuZ2UnO1xuXG5jbGFzcyBUb3BCYXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgYW5jaG9yRWw6IG51bGwsXG4gICAgICAgICAgICBvcGVuRmlsdGVyOiBmYWxzZSxcbiAgICAgICAgICAgIHByaWNlUmFuZ2U6IFsxMDAsIDE1MDBdLFxuICAgICAgICAgICAgZGlzdGFuY2VSYW5nZTogWzEsIDM1XSxcbiAgICAgICAgICAgIHNvcnRCeTogbnVsbFxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhwcm9wcykge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHsgLi4ucHJvcHMuZmlsdGVyQ3JpdGVyaWEgfSlcbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IC4uLnRoaXMucHJvcHMuZmlsdGVyQ3JpdGVyaWEgfSlcbiAgICB9XG5cbiAgICBhcHBseUZpbHRlcnMoKSB7XG4gICAgICAgIGxldCBmaWx0ZXJTdGF0ZSA9IHtcbiAgICAgICAgICAgIHByaWNlUmFuZ2U6IHRoaXMuc3RhdGUucHJpY2VSYW5nZSxcbiAgICAgICAgICAgIGRpc3RhbmNlUmFuZ2U6IHRoaXMuc3RhdGUuZGlzdGFuY2VSYW5nZSxcbiAgICAgICAgICAgIHNvcnRCeTogdGhpcy5zdGF0ZS5zb3J0QnlcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnByb3BzLmFwcGx5RmlsdGVycyhmaWx0ZXJTdGF0ZSlcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IG9wZW5GaWx0ZXI6IGZhbHNlIH0pXG4gICAgfVxuXG4gICAgaGFuZGxlT3BlbihldmVudCkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHsgYW5jaG9yRWw6IGV2ZW50LmN1cnJlbnRUYXJnZXQgfSlcbiAgICB9XG5cbiAgICBoYW5kbGVDbG9zZSh0eXBlKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBhbmNob3JFbDogbnVsbCwgc29ydEJ5OiB0eXBlIH0sICgpID0+IHtcbiAgICAgICAgICAgIGlmKHR5cGUpe1xuICAgICAgICAgICAgICAgIHRoaXMuYXBwbHlGaWx0ZXJzKClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICB0b2dnbGVGaWx0ZXIoKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgb3BlbkZpbHRlcjogIXRoaXMuc3RhdGUub3BlbkZpbHRlclxuICAgICAgICB9KVxuICAgIH1cblxuICAgIGhhbmRsZVJhbmdlKHR5cGUsIHJhbmdlKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgW3R5cGVdOiByYW5nZVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIGdldENyaXRlcmlhU3RyaW5nKHNlbGVjdGVkQ3JpdGVyaWFzKSB7XG4gICAgICAgIGlmIChzZWxlY3RlZENyaXRlcmlhcyAmJiBzZWxlY3RlZENyaXRlcmlhcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiBzZWxlY3RlZENyaXRlcmlhcy5yZWR1Y2UoKGZpbmFsLCBjdXJyLCBpKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGkgIT0gMCkge1xuICAgICAgICAgICAgICAgICAgICBmaW5hbCArPSAnLCAnXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZpbmFsICs9IGAke2N1cnIubmFtZX1gXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZpbmFsXG4gICAgICAgICAgICB9LCBcIlwiKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIGxldCBjcml0ZXJpYVN0ciA9IHRoaXMuZ2V0Q3JpdGVyaWFTdHJpbmcodGhpcy5wcm9wcy5zZWxlY3RlZENyaXRlcmlhcylcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPHNlY3Rpb24gY2xhc3NOYW1lPVwiZmlsdGVyLXJvd1wiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGFpbmVyLWZsdWlkXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC0xMlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmlsdGVyLWl0ZW1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhY3Rpb24tZmlsdGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dWwgY2xhc3NOYW1lPVwiaW5saW5lLWxpc3RcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGkgb25DbGljaz17dGhpcy5oYW5kbGVPcGVuLmJpbmQodGhpcyl9PjxzcGFuIGNsYXNzTmFtZT1cImN0LWltZyBjdC1pbWctc20gZmlsdGVyLWljb24gdGV4dC1yaWdodFwiPjxpbWcgc3JjPVwiL2Fzc2V0cy9pbWcvY3VzdG9tZXItaWNvbnMvcmFuZ2Uuc3ZnXCIgY2xhc3NOYW1lPVwiaW1nLWZsdWlkXCIgLz48L3NwYW4+PC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGkgb25DbGljaz17dGhpcy50b2dnbGVGaWx0ZXIuYmluZCh0aGlzKX0+PHNwYW4gY2xhc3NOYW1lPVwiY3QtaW1nIGN0LWltZy1zbSBmaWx0ZXItaWNvbiB0ZXh0LXJpZ2h0IGFwcGxpZWQtZmlsdGVyXCI+PGltZyBzcmM9XCIvYXNzZXRzL2ltZy9jdXN0b21lci1pY29ucy9maWx0ZXIuc3ZnXCIgY2xhc3NOYW1lPVwiaW1nLWZsdWlkXCIgLz48L3NwYW4+PHNwYW4gY2xhc3NOYW1lPVwiYXBwbGllZC1maWx0ZXItbm90aVwiIC8+PC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZpbHRlci10aXRsZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3RoaXMucHJvcHMubGFiTGlzdC5sZW5ndGh9IFJlc3VsdHMgZm91bmQgZm9yIDxzcGFuIGNsYXNzTmFtZT1cImZ3LTcwMFwiPiB7Y3JpdGVyaWFTdHJ9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8TWVudVxuICAgICAgICAgICAgICAgICAgICBpZD1cInNvcnQtbWVudVwiXG4gICAgICAgICAgICAgICAgICAgIGFuY2hvckVsPXt0aGlzLnN0YXRlLmFuY2hvckVsfVxuICAgICAgICAgICAgICAgICAgICBvcGVuPXtCb29sZWFuKHRoaXMuc3RhdGUuYW5jaG9yRWwpfVxuICAgICAgICAgICAgICAgICAgICBvbkNsb3NlPXt0aGlzLmhhbmRsZUNsb3NlLmJpbmQodGhpcywgbnVsbCl9XG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICA8TWVudUl0ZW0gb25DbGljaz17dGhpcy5oYW5kbGVDbG9zZS5iaW5kKHRoaXMsICduYW1lJyl9PlJlbGF2YW5jZTwvTWVudUl0ZW0+XG4gICAgICAgICAgICAgICAgICAgIDxNZW51SXRlbSBvbkNsaWNrPXt0aGlzLmhhbmRsZUNsb3NlLmJpbmQodGhpcywgJ3ByaWNlJyl9PkZlZTwvTWVudUl0ZW0+XG4gICAgICAgICAgICAgICAgICAgIDxNZW51SXRlbSBvbkNsaWNrPXt0aGlzLmhhbmRsZUNsb3NlLmJpbmQodGhpcywgJ2Rpc3RhbmNlJyl9PkRpc3RhbmNlPC9NZW51SXRlbT5cbiAgICAgICAgICAgICAgICA8L01lbnU+XG5cbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUub3BlbkZpbHRlciA/IDxkaXYgb25DbGljaz17dGhpcy50b2dnbGVGaWx0ZXIuYmluZCh0aGlzKX0gY2xhc3NOYW1lPVwib3ZlcmxheSBibGFja1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3aWRnZXQgZmlsdGVyLXBvcHVwXCIgb25DbGljaz17KGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgICAgICAgICAgICAgICAgICB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIndpZGdldC1jb250ZW50XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmlsdGVyUm93XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0bFwiPlByaWNlPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidHJcIj5ScyB7dGhpcy5zdGF0ZS5wcmljZVJhbmdlWzBdfSB0byB7dGhpcy5zdGF0ZS5wcmljZVJhbmdlWzFdfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImJsXCI+UnMgMTAwPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiYnJcIj5ScyAyMDAwPC9zcGFuPlxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8UmFuZ2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtaW49ezEwMH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXg9ezIwMDB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3RoaXMuc3RhdGUucHJpY2VSYW5nZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGVwPXsxMDB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicmFuZ2VcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZVJhbmdlLmJpbmQodGhpcywgJ3ByaWNlUmFuZ2UnKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZpbHRlclJvd1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGxcIj5EaXN0YW5jZTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRyXCI+e3RoaXMuc3RhdGUuZGlzdGFuY2VSYW5nZVswXX0gdG8ge3RoaXMuc3RhdGUuZGlzdGFuY2VSYW5nZVsxXX0gS008L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJibFwiPjEgPiBLTTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImJyXCI+NTAgS008L3NwYW4+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxSYW5nZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1pbj17MX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXg9ezUwfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXt0aGlzLnN0YXRlLmRpc3RhbmNlUmFuZ2V9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RlcD17MX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJyYW5nZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuaGFuZGxlUmFuZ2UuYmluZCh0aGlzLCAnZGlzdGFuY2VSYW5nZScpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3aWRnZXQtZm9vdGVyIHBkLTBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJ2LWJ0biB2LWJ0bi1wcmltYXJ5IGJ0bi1ibG9jayBidG4tbGdcIiBvbkNsaWNrPXt0aGlzLmFwcGx5RmlsdGVycy5iaW5kKHRoaXMpfT5BcHBseTwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PiA6IFwiXCJcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIDwvc2VjdGlvbj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgVG9wQmFyXG4iLCJpbXBvcnQgVG9wQmFyIGZyb20gJy4vVG9wQmFyLmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBUb3BCYXIiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IExvYWRlciBmcm9tICcuLi8uLi9jb21tb25zL0xvYWRlcidcblxuY2xhc3MgVGVzdFNlbGVjdG9yVmlldyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgICBzZWxlY3RlZExhYjogdGhpcy5wcm9wcy5tYXRjaC5wYXJhbXMuaWRcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgICB0aGlzLnByb3BzLmdldExhYkJ5SWQodGhpcy5zdGF0ZS5zZWxlY3RlZExhYilcbiAgICB9XG5cbiAgICB0b2dnbGVUZXN0KHRlc3QpIHtcbiAgICAgICAgdGhpcy5wcm9wcy50b2dnbGVEaWFnbm9zaXNDcml0ZXJpYSgndGVzdCcsIHRlc3QpXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICBcbiAgICAgICAgbGV0IGxhYkRhdGEgPSB0aGlzLnByb3BzLkxBQlNbdGhpcy5zdGF0ZS5zZWxlY3RlZExhYl1cbiAgICAgICAgbGV0IHRlc3RzID0gW11cbiAgICAgICAgbGV0IHNlbGVjdGVkVGVzdHMgPSBbXVxuXG4gICAgICAgIGlmICh0aGlzLnByb3BzLnNlbGVjdGVkQ3JpdGVyaWFzICYmIHRoaXMucHJvcHMuc2VsZWN0ZWRDcml0ZXJpYXMubGVuZ3RoKSB7XG4gICAgICAgICAgICBzZWxlY3RlZFRlc3RzID0gdGhpcy5wcm9wcy5zZWxlY3RlZENyaXRlcmlhcy5maWx0ZXIoeCA9PiB4LnR5cGUgPT0gJ3Rlc3QnKS5tYXAoeCA9PiB4LmlkKVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBpZiAobGFiRGF0YSAmJiBsYWJEYXRhLnRlc3RzICYmIGxhYkRhdGEudGVzdHMubGVuZ3RoKSB7XG4gICAgICAgICAgICB0ZXN0cyA9IGxhYkRhdGEudGVzdHMubWFwKCh0ZXN0LCBpKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIDxsaSBrZXk9e2l9PlxuICAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiY2stYnhcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHt0ZXN0LnRlc3QubmFtZX1cbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBjaGVja2VkPXtzZWxlY3RlZFRlc3RzLmluZGV4T2YodGVzdC50ZXN0LmlkKSA+IC0xfSBvbkNoYW5nZT17dGhpcy50b2dnbGVUZXN0LmJpbmQodGhpcywgdGVzdC50ZXN0KX0gLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImNoZWNrbWFya1wiIC8+XG4gICAgICAgICAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRlc3QtcHJpY2UgdGV4dC1tZCBmdy01MDBcIj57dGVzdC5tcnB9PC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXY+XG5cbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGxhYkRhdGEgP1xuXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoZWFkZXIgY2xhc3NOYW1lPVwic2tpbi13aGl0ZSBmaXhlZCBob3Jpem9udGFsIHRvcCBsb2NhdGlvbi1kZXRlY3QtaGVhZGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGFpbmVyLWZsdWlkXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLTEyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic2VsZWN0LWxvY2F0aW9uLXJvdyB0ZXh0LWNlbnRlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuaGlzdG9yeS5nbygtMSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19IGNsYXNzTmFtZT1cImN0LWltZyBjdC1pbWctbWQgY2xvc2VcIj48aW1nIHNyYz1cIi9hc3NldHMvaW1nL2N1c3RvbWVyLWljb25zL2Nsb3NlLWJsYWNrLnN2Z1wiIGNsYXNzTmFtZT1cImltZy1mbHVpZFwiIC8+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGg0IGNsYXNzTmFtZT1cImZ3LTcwMCB0ZXh0LW1kXCI+QWxsIFRlc3Q8L2g0PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC0xMlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNlYXJjaC1yb3dcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRvbi1ncm91cCBsb2NhdGlvbi1kZXRlY3QtZmllbGRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2wgaW5wdXQtbWQgc2VhcmNoLWlucHV0IG5vLXNoYWRvd1wiIHBsYWNlaG9sZGVyPVwiU2VhcmNoIFRlc3RcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImN0LWltZyBjdC1pbWctc20gbWFwLW1hcmtlci1ibHVlXCI+PGltZyBzcmM9XCIvYXNzZXRzL2ltZy9jdXN0b21lci1pY29ucy9zZWFyY2gtaWNvbi5zdmdcIiBjbGFzc05hbWU9XCJpbWctZmx1aWRcIiAvPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJkZXRlY3QtbXktbG9jYWl0b25cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJjdC1pbWcgY3QtaW1nLXhzXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7c2VsZWN0ZWRUZXN0cy5sZW5ndGh9IFNlbGVjdGVkIEl0ZW1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2hlYWRlcj5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzZWN0aW9uIGNsYXNzTmFtZT1cIndyYXAgYWxsLXRlc3Qtc2NyZWVuIFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIndpZGdldC1wYW5lbFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwYW5lbC1jb250ZW50IHBkLTBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dWwgY2xhc3NOYW1lPVwibGlzdCBhbGwtdGVzdC1saXN0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt0ZXN0c31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc2VjdGlvbj5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwidi1idG4gdi1idG4tcHJpbWFyeSBidG4tbGcgZml4ZWQgaG9yaXpvbnRhbCBib3R0b20gbm8tcm91bmQgdGV4dC1sZ1wiIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5oaXN0b3J5LmdvKC0xKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19PkRvbmU8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PiA6IDxMb2FkZXIgLz5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgVGVzdFNlbGVjdG9yVmlld1xuIiwiaW1wb3J0IFRlc3RTZWxlY3RvciBmcm9tICcuL1Rlc3RTZWxlY3RvcidcbmV4cG9ydCBkZWZhdWx0IFRlc3RTZWxlY3RvciIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG5pbXBvcnQgVGltZVNsb3RTZWxlY3RvciBmcm9tICcuLi8uLi9jb21tb25zL3RpbWVTbG90U2VsZWN0b3IvaW5kZXguanMnXG5pbXBvcnQgU2VsZWN0ZWRDbGluaWMgZnJvbSAnLi4vY29tbW9ucy9zZWxlY3RlZENsaW5pYy9pbmRleC5qcydcblxuY2xhc3MgQXBwb2ludG1lbnRTbG90IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIHNlbGVjdGVkRG9jdG9yOiB0aGlzLnByb3BzLm1hdGNoLnBhcmFtcy5pZCxcbiAgICAgICAgICAgIHNlbGVjdGVkQ2xpbmljOiB0aGlzLnByb3BzLm1hdGNoLnBhcmFtcy5jbGluaWNJZCxcbiAgICAgICAgICAgIHRpbWVTbG90czogbnVsbCxcbiAgICAgICAgICAgIHNlbGVjdGVkU2xvdDogbnVsbFxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJvY2VlZCgpIHtcbiAgICAgICAgLy8gaWYgKHRoaXMuc3RhdGUuc2VsZWN0ZWRTbG90KSB7XG4gICAgICAgIC8vICAgICB0aGlzLmNvbnRleHQucm91dGVyLmhpc3RvcnkucHVzaChgL2RvY3RvcnByb2ZpbGUvJHt0aGlzLnN0YXRlLnNlbGVjdGVkRG9jdG9yfS8ke3RoaXMuc3RhdGUuc2VsZWN0ZWRDbGluaWN9L2Jvb2tkZXRhaWxzP3Q9JHt0aGlzLnN0YXRlLnNlbGVjdGVkU2xvdC5zdGFydH1gKVxuICAgICAgICAvLyB9XG4gICAgfVxuXG4gICAgc2VsZWN0VGltZVNsb3Qoc2xvdCkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHsgc2VsZWN0ZWRTbG90OiBzbG90IH0pXG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIGxldCBjbGluaWNJZCA9IHRoaXMucHJvcHMubWF0Y2gucGFyYW1zLmNsaW5pY0lkXG4gICAgICAgIGxldCBkb2N0b3JJZCA9IHRoaXMucHJvcHMubWF0Y2gucGFyYW1zLmlkXG5cbiAgICAgICAgdGhpcy5wcm9wcy5nZXRUaW1lU2xvdHMoZG9jdG9ySWQsIGNsaW5pY0lkLCAodGltZVNsb3RzKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgdGltZVNsb3RzIH0pXG4gICAgICAgIH0pXG5cbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXY+XG5cbiAgICAgICAgICAgICAgICA8aGVhZGVyIGNsYXNzTmFtZT1cInNraW4tcHJpbWFyeSBmaXhlZCBob3Jpem9udGFsIHRvcFwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lci1mbHVpZFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC0yXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImljb24gYmFjay1pY29uXCIgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5oaXN0b3J5LmdvKC0xKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fT48aW1nIHNyYz1cIi9hc3NldHMvaW1nL2N1c3RvbWVyLWljb25zL2JhY2std2hpdGUucG5nXCIgY2xhc3NOYW1lPVwiaW1nLWZsdWlkXCIgLz48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtOFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImhlYWRlci10aXRsZSBmdy03MDAgY2FwaXRhbGl6ZSB0ZXh0LXdoaXRlIHRleHQtY2VudGVyXCI+U2VsZWN0IERhdGUgYW5kIFRpbWU8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC0yXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9oZWFkZXI+XG5cbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuRE9DVE9SU1t0aGlzLnN0YXRlLnNlbGVjdGVkRG9jdG9yXSA/XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNlY3Rpb24gY2xhc3NOYW1lPVwid3JhcCBkci1wcm9maWxlLXNjcmVlblwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lci1mbHVpZFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC0xMlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8U2VsZWN0ZWRDbGluaWNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkRG9jdG9yPXt0aGlzLnByb3BzLkRPQ1RPUlNbdGhpcy5zdGF0ZS5zZWxlY3RlZERvY3Rvcl19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZENsaW5pYz17dGhpcy5zdGF0ZS5zZWxlY3RlZENsaW5pY31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlLnRpbWVTbG90cyA/XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPFRpbWVTbG90U2VsZWN0b3JcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGltZVNsb3RzPXt0aGlzLnN0YXRlLnRpbWVTbG90c31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0VGltZVNsb3Q9e3RoaXMuc2VsZWN0VGltZVNsb3QuYmluZCh0aGlzKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPiA6ICcnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc2VjdGlvbj5cblxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+IDogXCJcIlxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwidi1idG4gdi1idG4tcHJpbWFyeSBidG4tbGcgZml4ZWQgaG9yaXpvbnRhbCBib3R0b20gbm8tcm91bmQgdGV4dC1sZ1wiPlNlbGVjdDwvYnV0dG9uPlxuXG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgQXBwb2ludG1lbnRTbG90XG4iLCJpbXBvcnQgQXBwb2ludG1lbnRTbG90IGZyb20gJy4vQXBwb2ludG1lbnRTbG90LmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBBcHBvaW50bWVudFNsb3QiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFN0ZXBwZXIsIHsgU3RlcCwgU3RlcExhYmVsIH0gZnJvbSAnbWF0ZXJpYWwtdWkvU3RlcHBlcic7XG5cbmltcG9ydCBDYWxJY29uIGZyb20gJ21hdGVyaWFsLXVpLWljb25zL0NhbGwnO1xuXG5cbmNsYXNzIEJvb2tpbmdWaWV3IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYm9va2luZ1wiPlxuICAgICAgICAgICAgICAgIDxTdGVwcGVyIGFjdGl2ZVN0ZXA9ezB9IGFsdGVybmF0aXZlTGFiZWw+XG4gICAgICAgICAgICAgICAgICAgIDxTdGVwIGtleT17MH0+XG4gICAgICAgICAgICAgICAgICAgICAgICA8U3RlcExhYmVsPntcIkFwcG9pbnRtZW50IFJlcXVlc3RlZFwifTwvU3RlcExhYmVsPlxuICAgICAgICAgICAgICAgICAgICA8L1N0ZXA+XG4gICAgICAgICAgICAgICAgICAgIDxTdGVwIGtleT17MX0+XG4gICAgICAgICAgICAgICAgICAgICAgICA8U3RlcExhYmVsPntcIkFwcG9pbnRtZW50IENvbmZpcm1lZFwifTwvU3RlcExhYmVsPlxuICAgICAgICAgICAgICAgICAgICA8L1N0ZXA+XG4gICAgICAgICAgICAgICAgICAgIDxTdGVwIGtleT17Mn0+XG4gICAgICAgICAgICAgICAgICAgICAgICA8U3RlcExhYmVsPntcIkFwcG9pbnRtZW50IENvbXBsZXRlXCJ9PC9TdGVwTGFiZWw+XG4gICAgICAgICAgICAgICAgICAgIDwvU3RlcD5cbiAgICAgICAgICAgICAgICA8L1N0ZXBwZXI+XG4gICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwicmVxdWVzdExpbmVcIj5XZSBoYXZlIHJlcXVlc3RlZCBEci5TbWl0aCB0byBjb25maXJtIHlvdXIgYXBwb2ludG1lbnQ8L3A+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwYXRpZW50TmFtZVwiPlxuICAgICAgICAgICAgICAgICAgICA8cD5mb3I8L3A+XG4gICAgICAgICAgICAgICAgICAgIDxwPkJyaWplc2ggS3VtYXI8L3A+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImRldGFpbHNcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImxibFwiPldpdGg8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJjbnRudFwiPkRyLiBTdGV2ZSBTbWl0aDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJsYmxcIj5XaGVyZTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImNudG50XCI+U2Fydm9kYXlhIENsaW5pYywgIyAzNjEsIFNlY3RvciA1MCwgR3VyZ2Fvbjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJsYmxcIj5XaGVuPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiY250bnRcIj5XZWRuZXNkYXksIEp1bmUgMjcsIDIwMTgsIDExOjQ1QU08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwibGJsXCI+UmVmZXJlbmNlIzwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImNudG50XCI+SFVWSEpCODdISkJKSDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cInJlcXVlc3RcIj5SZXF1ZXN0IFJlLVNjaGVkdWxlL0NhbmNlbDwvYnV0dG9uPlxuXG4gICAgICAgICAgICAgICAgPENhbEljb24gY2xhc3NOYW1lPVwiY2FsbEljb25cIi8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgQm9va2luZ1ZpZXdcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCBEb2N0b3JQcm9maWxlQ2FyZCBmcm9tICcuLi9jb21tb25zL2RvY3RvclByb2ZpbGVDYXJkL2luZGV4LmpzJ1xuaW1wb3J0IENsaW5pY1NlbGVjdG9yIGZyb20gJy4uL2NvbW1vbnMvY2xpbmljU2VsZWN0b3IvaW5kZXguanMnXG5cbmNsYXNzIENsaW5pY0xpc3RWaWV3IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIHNlbGVjdGVkRG9jdG9yOiBudWxsXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgbGV0IGRvY3RvcklkID0gdGhpcy5wcm9wcy5tYXRjaC5wYXJhbXMuaWRcbiAgICAgICAgaWYgKGRvY3RvcklkKSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgc2VsZWN0ZWREb2N0b3I6IGRvY3RvcklkIH0pXG4gICAgICAgICAgICB0aGlzLnByb3BzLmdldERvY3RvckJ5SWQoZG9jdG9ySWQpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZG9jdG9yUHJvZmlsZVwiPlxuXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnByb3BzLkRPQ1RPUlNbdGhpcy5zdGF0ZS5zZWxlY3RlZERvY3Rvcl0gP1xuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8RG9jdG9yUHJvZmlsZUNhcmRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGlkZUJvdHRvbT17dHJ1ZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGlkZUJvb2tOb3c9e3RydWV9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRldGFpbHM9e3RoaXMucHJvcHMuRE9DVE9SU1t0aGlzLnN0YXRlLnNlbGVjdGVkRG9jdG9yXX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxDbGluaWNTZWxlY3RvclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXRhaWxzPXt0aGlzLnByb3BzLkRPQ1RPUlNbdGhpcy5zdGF0ZS5zZWxlY3RlZERvY3Rvcl19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsuLi50aGlzLnByb3BzfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj4gOiBcIlwiXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IENsaW5pY0xpc3RWaWV3XG4iLCJpbXBvcnQgQ2xpbmljTGlzdFZpZXcgZnJvbSAnLi9DbGluaWNMaXN0Vmlldy5qcydcblxuZXhwb3J0IGRlZmF1bHQgQ2xpbmljTGlzdFZpZXciLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcblxuY2xhc3MgQ2xpbmljU2VsZWN0b3IgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgIH1cblxuICAgIHNlbGVjdENsaW5pYyhjbGluaWNJZCkge1xuICAgICAgICBsZXQgZG9jdG9ySWQgPSB0aGlzLnByb3BzLm1hdGNoLnBhcmFtcy5pZFxuICAgICAgICB0aGlzLnByb3BzLmhpc3RvcnkucHVzaChgL29wZC9kb2N0b3IvJHtkb2N0b3JJZH0vJHtjbGluaWNJZH0vYm9va2ApXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIGxldCB7IG5hbWUsIGhvc3BpdGFscyB9ID0gdGhpcy5wcm9wcy5kZXRhaWxzXG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwid2lkZ2V0LXBhbmVsXCI+XG4gICAgICAgICAgICAgICAgPGg0IGNsYXNzTmFtZT1cInBhbmVsLXRpdGxlXCI+RHIuIHtuYW1lfSBBdmFpbGFibGUgYXQ8L2g0PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGFuZWwtY29udGVudCBzY3JvbGwteFwiPlxuICAgICAgICAgICAgICAgICAgICA8dWwgY2xhc3NOYW1lPVwiaW5saW5lLWxpc3QgQ2xpbmljLWNhcmQtbGlzdFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhvc3BpdGFscy5tYXAoKGhvc3BpdGFsLCBpKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiA8bGkga2V5PXtpfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwid2lkZ2V0IG5vLXNoYWRvd1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwid2lkZ2V0LWhlYWRlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDQgY2xhc3NOYW1lPVwid2lkZ2V0LXRpdGxlIHRleHQtbWQgZnctNzAwXCI+e2hvc3BpdGFsLmhvc3BpdGFsX25hbWV9IDxzcGFuIGNsYXNzTmFtZT1cImZsb2F0LXJpZ2h0XCI+UnMge2hvc3BpdGFsLmZlZXN9PC9zcGFuPjwvaDQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3aWRnZXQtY29udGVudFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxvY2F0aW9uLWRldGFpbHNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbWcgc3JjPVwiL2Fzc2V0cy9pbWcvY3VzdG9tZXItaWNvbnMvbWFwLW1hcmtlci1ibHVlLnBuZ1wiIGNsYXNzTmFtZT1cImltZy1mbHVpZFwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJhZGRyZXNzXCI+e2hvc3BpdGFsLmFkZHJlc3N9PC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0aW1pbmctZGV0YWlsc1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE9iamVjdC5rZXlzKGhvc3BpdGFsLnRpbWluZ3MpLm1hcCgodGltaW5nS2V5LCBrZXkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDxwIGNsYXNzTmFtZT1cImZ3LTcwMFwiIGtleT17a2V5fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJmdy03MDAgdGV4dC1tZCB0ZXh0LXByaW1hcnlcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7dGltaW5nS2V5fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtob3NwaXRhbC50aW1pbmdzW3RpbWluZ0tleV0uam9pbignLCAnKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwid2lkZ2V0LWZvb3RlciB0ZXh0LWNlbnRlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cInYtYnRuIHYtYnRuLXByaW1hcnkgb3V0bGluZVwiIG9uQ2xpY2s9e3RoaXMuc2VsZWN0Q2xpbmljLmJpbmQodGhpcywgaG9zcGl0YWwuaG9zcGl0YWxfaWQpfT5Cb29rIE5vdzwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IENsaW5pY1NlbGVjdG9yXG4iLCJpbXBvcnQgQ2xpbmljU2VsZWN0b3IgZnJvbSAnLi9DbGluaWNTZWxlY3Rvci5qcydcblxuZXhwb3J0IGRlZmF1bHQgQ2xpbmljU2VsZWN0b3IiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcblxuY2xhc3MgRG9jdG9yUHJvZmlsZUNhcmQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgIH1cblxuICAgIGNhcmRDbGljayhpZCwgZSkge1xuICAgICAgICB0aGlzLnByb3BzLmhpc3RvcnkucHVzaChgL29wZC9kb2N0b3IvJHtpZH1gKVxuICAgIH1cblxuICAgIGJvb2tOb3coaWQsIGUpIHtcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKVxuICAgICAgICAvLyB0aGlzLnByb3BzLmhpc3RvcnkucHVzaChgL2RvY3RvcnByb2ZpbGUvJHtpZH0vYXZhaWxhYmlsaXR5YClcbiAgICB9XG5cbiAgICBnZXRRdWFsaWZpY2F0aW9uU3RyKHF1YWxpZmljYXRpb25TcGVjaWFsaXphdGlvbikge1xuICAgICAgICByZXR1cm4gcXVhbGlmaWNhdGlvblNwZWNpYWxpemF0aW9uLnJlZHVjZSgoc3RyLCBjdXJyLCBpKSA9PiB7XG4gICAgICAgICAgICBzdHIgKz0gYCR7Y3Vyci5xdWFsaWZpY2F0aW9ufWBcbiAgICAgICAgICAgIGlmIChjdXJyLnNwZWNpYWxpemF0aW9uKSB7XG4gICAgICAgICAgICAgICAgc3RyICs9IGAgLSAke2N1cnIuc3BlY2lhbGl6YXRpb259YFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGkgPCBxdWFsaWZpY2F0aW9uU3BlY2lhbGl6YXRpb24ubGVuZ3RoIC0gMSkgc3RyICs9IGAsIGA7XG4gICAgICAgICAgICByZXR1cm4gc3RyXG4gICAgICAgIH0sIFwiXCIpXG4gICAgfVxuXG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgbGV0IHsgaWQsIGV4cGVyaWVuY2VfeWVhcnMsIGdlbmRlciwgaG9zcGl0YWxzLCBob3NwaXRhbF9jb3VudCwgbmFtZSwgcXVhbGlmaWNhdGlvbnMgfSA9IHRoaXMucHJvcHMuZGV0YWlsc1xuXG4gICAgICAgIGxldCBob3NwaXRhbCA9IGhvc3BpdGFsc1swXVxuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIndpZGdldCBjYXJkIHNlYXJjaC1kci1saXN0XCIgb25DbGljaz17dGhpcy5jYXJkQ2xpY2suYmluZCh0aGlzLCBpZCl9PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwid2lkZ2V0LWhlYWRlciBkci1pbmZvXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmF0aW5nLWFkZHJlc3MgYmV0YVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHVsIGNsYXNzTmFtZT1cImlubGluZS1saXN0IHJhdHRpbmdcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGk+PHNwYW4gY2xhc3NOYW1lPVwiY3QtaW1nIGN0LWltZy14cyBzdGFyLWljb25cIj48aW1nIHNyYz1cIi9hc3NldHMvaW1nL2N1c3RvbWVyLWljb25zL3N0YXIuc3ZnXCIgY2xhc3NOYW1lPVwiaW1nLWZsdWlkXCIgLz48L3NwYW4+PC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGk+PHNwYW4gY2xhc3NOYW1lPVwiY3QtaW1nIGN0LWltZy14cyBzdGFyLWljb25cIj48aW1nIHNyYz1cIi9hc3NldHMvaW1nL2N1c3RvbWVyLWljb25zL3N0YXIuc3ZnXCIgY2xhc3NOYW1lPVwiaW1nLWZsdWlkXCIgLz48L3NwYW4+PC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGk+PHNwYW4gY2xhc3NOYW1lPVwiY3QtaW1nIGN0LWltZy14cyBzdGFyLWljb25cIj48aW1nIHNyYz1cIi9hc3NldHMvaW1nL2N1c3RvbWVyLWljb25zL3N0YXIuc3ZnXCIgY2xhc3NOYW1lPVwiaW1nLWZsdWlkXCIgLz48L3NwYW4+PC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGk+PHNwYW4gY2xhc3NOYW1lPVwiY3QtaW1nIGN0LWltZy14cyBzdGFyLWljb25cIj48aW1nIHNyYz1cIi9hc3NldHMvaW1nL2N1c3RvbWVyLWljb25zL3N0YXIuc3ZnXCIgY2xhc3NOYW1lPVwiaW1nLWZsdWlkXCIgLz48L3NwYW4+PC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGk+PHNwYW4gY2xhc3NOYW1lPVwiY3QtaW1nIGN0LWltZy14cyBzdGFyLWljb25cIj48aW1nIHNyYz1cIi9hc3NldHMvaW1nL2N1c3RvbWVyLWljb25zL2hhbGYtc3Rhci5zdmdcIiBjbGFzc05hbWU9XCJpbWctZmx1aWRcIiAvPjwvc3Bhbj48L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwPjxzcGFuIGNsYXNzTmFtZT1cImN0LWltZyBjdC1pbWcteHNcIj48aW1nIHNyYz1cIi9hc3NldHMvaW1nL2N1c3RvbWVyLWljb25zL21hcC1tYXJrZXItYmx1ZS5zdmdcIiBjbGFzc05hbWU9XCJpbWctZmx1aWRcIiAvPjwvc3Bhbj57aG9zcGl0YWwuYWRkcmVzc308L3A+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFscGhhIGRyLW5hbWVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbWcgc3JjPVwiL2Fzc2V0cy9pbWcvY3VzdG9tZXItaWNvbnMvdXNlci5wbmdcIiBjbGFzc05hbWU9XCJpbWctZmx1aWRcIiAvPiB7bmFtZX1cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3aWRnZXQtY29udGVudFwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJldGEgb3RoZXItaW5mbyB0ZXh0LXJpZ2h0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cInYtYnRuIHYtYnRuLXByaW1hcnkgYnRuLXNtXCI+Qm9vayBOb3c8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicHJpY2luZ1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtcHJpbWFyeSBmdy03MDAgbmV3LXByaWNlXCI+UnMge2hvc3BpdGFsLmRpc2NvdW50ZWRfZmVlc30gPHNwYW4gY2xhc3NOYW1lPVwib2xkLXByaWNlXCI+UnMge2hvc3BpdGFsLmZlZXN9PC9zcGFuPjwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhbHBoYSBkci1leHAtZGV0YWlsc1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwiZHItZGVzZyB0ZXh0LW1kXCI+e3RoaXMuZ2V0UXVhbGlmaWNhdGlvblN0cihxdWFsaWZpY2F0aW9ucyl9PC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1zbSBmdy01MDAgdGV4dC1saWdodFwiPntleHBlcmllbmNlX3llYXJzfSBZZWFycyBvZiBFeHBlcmluY2U8L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXNtIGZ3LTUwMCB0ZXh0LWxpZ2h0XCI+RXggLSBBSUlNUywgIEV4LSBGb3J0aXM8L3A+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwid2lkZ2V0LWZvb3RlciBjYXJkLWZvb3RlclwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtNlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwPjxpbWcgc3JjPVwiL2Fzc2V0cy9pbWcvY3VzdG9tZXItaWNvbnMvaG9tZS5zdmdcIiBjbGFzc05hbWU9XCJpbWctZmx1aWRcIiAvPjxzcGFuIGNsYXNzTmFtZT1cIkNsaW5jLW5hbWVcIj57aG9zcGl0YWwuaG9zcGl0YWxfbmFtZX0gPGJyIC8+JmFtcDsge2hvc3BpdGFsX2NvdW50IC0gMX0gTW9yZTwvc3Bhbj48L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLTZcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cD48aW1nIHNyYz1cIi9hc3NldHMvaW1nL2N1c3RvbWVyLWljb25zL2Nsb2NrLWJsYWNrLnN2Z1wiIGNsYXNzTmFtZT1cImltZy1mbHVpZFwiIC8+PHNwYW4gY2xhc3NOYW1lPVwidGltZS1hdmFpbGFiaWxpdHlcIj57aG9zcGl0YWwudGltaW5nc1tcIk1vbi1TdW5cIl0gPyBob3NwaXRhbC50aW1pbmdzW1wiTW9uLVN1blwiXVswXSA6IFwiXCJ9PC9zcGFuPjwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBEb2N0b3JQcm9maWxlQ2FyZFxuIiwiaW1wb3J0IERvY3RvclByb2ZpbGVDYXJkIGZyb20gJy4vRG9jdG9yUHJvZmlsZUNhcmQuanMnXG5cbmV4cG9ydCBkZWZhdWx0IERvY3RvclByb2ZpbGVDYXJkIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuY2xhc3MgU2VsZWN0ZWRDbGluaWMgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgICAgICB0aGlzLnN0YXRlID0ge1xuXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRRdWFsaWZpY2F0aW9uU3RyKHF1YWxpZmljYXRpb25TcGVjaWFsaXphdGlvbikge1xuICAgICAgICByZXR1cm4gcXVhbGlmaWNhdGlvblNwZWNpYWxpemF0aW9uLnJlZHVjZSgoc3RyLCBjdXJyLCBpKSA9PiB7XG4gICAgICAgICAgICBzdHIgKz0gYCR7Y3Vyci5xdWFsaWZpY2F0aW9ufWBcbiAgICAgICAgICAgIGlmIChjdXJyLnNwZWNpYWxpemF0aW9uKSB7XG4gICAgICAgICAgICAgICAgc3RyICs9IGAgLSAke2N1cnIuc3BlY2lhbGl6YXRpb259YFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGkgPCBxdWFsaWZpY2F0aW9uU3BlY2lhbGl6YXRpb24ubGVuZ3RoIC0gMSkgc3RyICs9IGAsIGA7XG4gICAgICAgICAgICByZXR1cm4gc3RyXG4gICAgICAgIH0sIFwiXCIpXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIGxldCB7IG5hbWUsIHF1YWxpZmljYXRpb25zLCBob3NwaXRhbHMgfSA9IHRoaXMucHJvcHMuc2VsZWN0ZWREb2N0b3JcbiAgICAgICAgbGV0IGhvc3BpdGFsTmFtZSA9IFwiXCJcblxuICAgICAgICBpZiAoaG9zcGl0YWxzICYmIGhvc3BpdGFscy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGhvc3BpdGFscy5tYXAoKGhvc3BpdGFsKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGhvc3BpdGFsLmhvc3BpdGFsX2lkID09IHRoaXMucHJvcHMuc2VsZWN0ZWRDbGluaWMpIHtcbiAgICAgICAgICAgICAgICAgICAgaG9zcGl0YWxOYW1lID0gaG9zcGl0YWwuaG9zcGl0YWxfbmFtZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3aWRnZXQgbXJ0LTEwIGN0LXByb2ZpbGUgc2tpbi13aGl0ZVwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwid2lkZ2V0LWhlYWRlciBkci1xdWNpay1pbmZvXCI+XG4gICAgICAgICAgICAgICAgICAgIDxpbWcgc3JjPVwiL2Fzc2V0cy9pbWcvY3VzdG9tZXItaWNvbnMvdXNlci5wbmdcIiBjbGFzc05hbWU9XCJpbWctZmx1aWRcIiAvPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImRyLXByb2ZpbGVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxoNCBjbGFzc05hbWU9XCJkci1uYW1lXCI+e25hbWV9PC9oND5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cImRlc2dcIj57dGhpcy5nZXRRdWFsaWZpY2F0aW9uU3RyKHF1YWxpZmljYXRpb25zKX08L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aDQgY2xhc3NOYW1lPVwiZHItbmFtZSBjbGluaWMtbmFtZSBtcnQtMTAgdGV4dC1zbVwiPntob3NwaXRhbE5hbWV9PC9oND5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgU2VsZWN0ZWRDbGluaWNcbiIsImltcG9ydCBTZWxlY3RlZENsaW5pYyBmcm9tICcuL1NlbGVjdGVkQ2xpbmljLmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBTZWxlY3RlZENsaW5pYyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmNvbnN0IGRlYm91bmNlciA9IChmbiwgZGVsYXkpID0+IHtcbiAgICBsZXQgdGltZXIgPSBudWxsXG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVyKVxuICAgICAgICB0aW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgZm4uY2FsbCh0aGlzKVxuICAgICAgICB9LCBkZWxheSlcbiAgICB9XG59XG5cblxuY2xhc3MgQ3JpdGVyaWFTZWFyY2hWaWV3IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIHNlYXJjaFZhbHVlOiAnJyxcbiAgICAgICAgICAgIHNlYXJjaFJlc3VsdHM6IFtdXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgdGhpcy5nZXRTZWFyY2hSZXN1bHRzID0gZGVib3VuY2VyKHRoaXMuZ2V0U2VhcmNoUmVzdWx0cy5iaW5kKHRoaXMpLCAxMDAwKVxuICAgICAgICBsZXQgaW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndG9wQ3JpdGVyaWFTZWFyY2gnKVxuICAgICAgICBpbnB1dC5mb2N1cygpXG4gICAgfVxuXG4gICAgaW5wdXRIYW5kbGVyKGUpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHNlYXJjaFZhbHVlOiBlLnRhcmdldC52YWx1ZSB9KVxuICAgICAgICB0aGlzLmdldFNlYXJjaFJlc3VsdHMoKVxuICAgIH1cblxuICAgIGdldFNlYXJjaFJlc3VsdHMoKSB7XG4gICAgICAgIHRoaXMucHJvcHMuZ2V0Q3JpdGVyaWFSZXN1bHRzKHRoaXMuc3RhdGUuc2VhcmNoVmFsdWUsIChzZWFyY2hSZXN1bHRzKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgc2VhcmNoUmVzdWx0czogc2VhcmNoUmVzdWx0cy5yZXN1bHQgfSlcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBhZGRDcml0ZXJpYShjcml0ZXJpYSwgdHlwZSkge1xuICAgICAgICBjcml0ZXJpYS50eXBlID0gdHlwZVxuICAgICAgICB0aGlzLnByb3BzLnRvZ2dsZUNyaXRlcmlhKGNyaXRlcmlhKVxuICAgICAgICB0aGlzLmNvbnRleHQucm91dGVyLmhpc3RvcnkuZ29CYWNrKClcbiAgICB9XG5cbiAgICBzdGF0aWMgY29udGV4dFR5cGVzID0ge1xuICAgICAgICByb3V0ZXI6ICgpID0+IG51bGxcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibG9jYXRpb25TZWFyY2hcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxvY2F0aW9uU2VhcmNoQm94XCI+XG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCBjbGFzc05hbWU9XCJ0b3BTZWFyY2hcIiBpZD1cInRvcENyaXRlcmlhU2VhcmNoXCIgb25DaGFuZ2U9e3RoaXMuaW5wdXRIYW5kbGVyLmJpbmQodGhpcyl9IHZhbHVlPXt0aGlzLnN0YXRlLnNlYXJjaFZhbHVlfSBwbGFjZWhvbGRlcj1cIlNlYXJjaCBmb3Igc3ltcHRvbXMsIERvY3RvcywgY29uZGl0aW9ucyAuLmV0Y1wiLz5cbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZS5zZWFyY2hSZXN1bHRzLm1hcCgodHlwZSxpKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPVwic2VhcmNoUmVzdWx0VHlwZVwiIGtleT17aX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwPnt0eXBlLm5hbWV9PC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlLmRhdGEubWFwKChyZXN1bHREYXRhLGopID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gPHNwYW4ga2V5PXtqfSBjbGFzc05hbWU9XCJwYWMtaXRlbVwiIG9uQ2xpY2s9e3RoaXMuYWRkQ3JpdGVyaWEuYmluZCh0aGlzLCByZXN1bHREYXRhLCB0eXBlLnR5cGUpfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3Jlc3VsdERhdGEubmFtZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBDcml0ZXJpYVNlYXJjaFZpZXdcbiIsImltcG9ydCBDcml0ZXJpYVNlYXJjaFZpZXcgZnJvbSAnLi9Dcml0ZXJpYVNlYXJjaFZpZXcuanMnXG5cbmV4cG9ydCBkZWZhdWx0IENyaXRlcmlhU2VhcmNoVmlldyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCBMb2FkZXIgZnJvbSAnLi4vLi4vY29tbW9ucy9Mb2FkZXInXG5cbmltcG9ydCBEb2N0b3JQcm9maWxlQ2FyZCBmcm9tICcuL2RvY3RvclByb2ZpbGVDYXJkJ1xuaW1wb3J0IEFib3V0RG9jdG9yIGZyb20gJy4uL2RvY3RvclByb2ZpbGUvYWJvdXREb2N0b3IvaW5kZXguanMnXG5pbXBvcnQgUHJvZmVzc2lvbmFsR3JhcGggZnJvbSAnLi4vZG9jdG9yUHJvZmlsZS9wcm9mZXNzaW9uYWxHcmFwaC9pbmRleC5qcydcbmltcG9ydCBDbGluaWNTZWxlY3RvciBmcm9tICcuLi9jb21tb25zL2NsaW5pY1NlbGVjdG9yL2luZGV4LmpzJ1xuXG5jbGFzcyBEb2N0b3JQcm9maWxlVmlldyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgICBzZWxlY3RlZERvY3RvcjogdGhpcy5wcm9wcy5tYXRjaC5wYXJhbXMuaWRcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdj5cblxuICAgICAgICAgICAgICAgIDxoZWFkZXIgY2xhc3NOYW1lPVwic2tpbi1wcmltYXJ5IGZpeGVkIGhvcml6b250YWwgdG9wXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGFpbmVyLWZsdWlkXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLTRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJoZWFkZXItdGl0bGUgZnctNzAwIGNhcGl0YWxpemUgdGV4dC13aGl0ZVwiPklDT048L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC00XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtNFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dWwgY2xhc3NOYW1lPVwiaW5saW5lLWxpc3QgZmxvYXQtcmlnaHQgdXNlci1ub3RpZmljYXRpb24tYWN0aW9uXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGk+PHNwYW4gY2xhc3NOYW1lPVwiaWNvbiBpY29uLW1kIHRleHQtbWlkZGxlXCI+PGltZyBzcmM9XCIvYXNzZXRzL2ltZy9jdXN0b21lci1pY29ucy91c2VyLnN2Z1wiIGNsYXNzTmFtZT1cImltZy1mbHVpZFwiIC8+PC9zcGFuPjwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGk+PHNwYW4gY2xhc3NOYW1lPVwiaWNvbiBpY29uLW1kIHRleHQtbWlkZGxlIG5vdGlmaWNhdGlvbi1pY29uXCI+PGltZyBzcmM9XCIvYXNzZXRzL2ltZy9jdXN0b21lci1pY29ucy9ub3RpZmljYXRpb24uc3ZnXCIgY2xhc3NOYW1lPVwiaW1nLWZsdWlkXCIgLz4gPHNwYW4gY2xhc3NOYW1lPVwibm90aWZpY2F0aW9uLWFsZXJ0XCIgLz48L3NwYW4+PC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2hlYWRlcj5cblxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5ET0NUT1JTW3RoaXMuc3RhdGUuc2VsZWN0ZWREb2N0b3JdID9cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNlY3Rpb24gY2xhc3NOYW1lPVwid3JhcCBkci1wcm9maWxlLXNjcmVlblwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lci1mbHVpZFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC0xMlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIndpZGdldCBtcnQtMTAgY3QtcHJvZmlsZSBza2luLXdoaXRlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8RG9jdG9yUHJvZmlsZUNhcmRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXRhaWxzPXt0aGlzLnByb3BzLkRPQ1RPUlNbdGhpcy5zdGF0ZS5zZWxlY3RlZERvY3Rvcl19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3aWRnZS1jb250ZW50IHBkLTBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8QWJvdXREb2N0b3JcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGV0YWlscz17dGhpcy5wcm9wcy5ET0NUT1JTW3RoaXMuc3RhdGUuc2VsZWN0ZWREb2N0b3JdfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Q2xpbmljU2VsZWN0b3JcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGV0YWlscz17dGhpcy5wcm9wcy5ET0NUT1JTW3RoaXMuc3RhdGUuc2VsZWN0ZWREb2N0b3JdfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7Li4udGhpcy5wcm9wc31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPFByb2Zlc3Npb25hbEdyYXBoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRldGFpbHM9e3RoaXMucHJvcHMuRE9DVE9SU1t0aGlzLnN0YXRlLnNlbGVjdGVkRG9jdG9yXX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc2VjdGlvbj5cblxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+IDogPExvYWRlciAvPlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgRG9jdG9yUHJvZmlsZVZpZXdcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG5jbGFzcyBBYm91dERvY3RvciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIGxlc3NBYm91dDogXCJcIixcbiAgICAgICAgICAgIHJlYWRNb3JlOiBmYWxzZVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIGxldCB7IGFib3V0IH0gPSB0aGlzLnByb3BzLmRldGFpbHNcblxuICAgICAgICBpZiAoYWJvdXQgJiYgYWJvdXQubGVuZ3RoID4gMTAwKSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICByZWFkTW9yZTogdHJ1ZVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgbGVzc0Fib3V0OiBhYm91dC5zbGljZSgwLCAxMDApXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIGxldCB7IGFib3V0LCBuYW1lIH0gPSB0aGlzLnByb3BzLmRldGFpbHNcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3aWRnZXQtcGFuZWxcIj5cbiAgICAgICAgICAgICAgICA8aDQgY2xhc3NOYW1lPVwicGFuZWwtdGl0bGVcIj5BYm91dCB7bmFtZX08L2g0PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGFuZWwtY29udGVudFwiPlxuICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJmdy01MDAgdGV4dC1tZFwiPnt0aGlzLnN0YXRlLmxlc3NBYm91dH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlLnJlYWRNb3JlID8gPGEgY2xhc3NOYW1lPVwiZnctNzAwIHRleHQtcHJpbWFyeVwiIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHJlYWRNb3JlOiBmYWxzZSwgbGVzc0Fib3V0OiBhYm91dCB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19PlJFQUQgTU9SRTwvYT4gOiBcIlwiXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBBYm91dERvY3RvclxuIiwiaW1wb3J0IEFib3V0RG9jdG9yIGZyb20gJy4vQWJvdXREb2N0b3IuanMnXG5cbmV4cG9ydCBkZWZhdWx0IEFib3V0RG9jdG9yIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cbmNsYXNzIERvY3RvclByb2ZpbGVDYXJkIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICB9XG5cbiAgICBnZXRRdWFsaWZpY2F0aW9uU3RyKHF1YWxpZmljYXRpb25TcGVjaWFsaXphdGlvbikge1xuICAgICAgICByZXR1cm4gcXVhbGlmaWNhdGlvblNwZWNpYWxpemF0aW9uLnJlZHVjZSgoc3RyLCBjdXJyLCBpKSA9PiB7XG4gICAgICAgICAgICBzdHIgKz0gYCR7Y3Vyci5xdWFsaWZpY2F0aW9ufWBcbiAgICAgICAgICAgIGlmIChjdXJyLnNwZWNpYWxpemF0aW9uKSB7XG4gICAgICAgICAgICAgICAgc3RyICs9IGAgLSAke2N1cnIuc3BlY2lhbGl6YXRpb259YFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGkgPCBxdWFsaWZpY2F0aW9uU3BlY2lhbGl6YXRpb24ubGVuZ3RoIC0gMSkgc3RyICs9IGAsIGA7XG4gICAgICAgICAgICByZXR1cm4gc3RyXG4gICAgICAgIH0sIFwiXCIpXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIGxldCB7IG5hbWUsIGV4cGVyaWVuY2VfeWVhcnMsIHF1YWxpZmljYXRpb25zIH0gPSB0aGlzLnByb3BzLmRldGFpbHNcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3aWRnZXQtaGVhZGVyIGRyLXF1Y2lrLWluZm9cIj5cbiAgICAgICAgICAgICAgICA8aW1nIHNyYz1cIi9hc3NldHMvaW1nL2N1c3RvbWVyLWljb25zL3VzZXIucG5nXCIgY2xhc3NOYW1lPVwiaW1nLWZsdWlkXCIgLz5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImRyLXByb2ZpbGVcIj5cbiAgICAgICAgICAgICAgICAgICAgPGg0IGNsYXNzTmFtZT1cImRyLW5hbWVcIj57bmFtZX08L2g0PlxuICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJkZXNnXCI+e3RoaXMuZ2V0UXVhbGlmaWNhdGlvblN0cihxdWFsaWZpY2F0aW9ucyl9PC9wPlxuICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJhZGQtZGV0YWlsc1wiPntleHBlcmllbmNlX3llYXJzfSBZZWFycyBvZiBFeHBlcmluY2U8L3A+XG4gICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cImFkZC1kZXRhaWxzXCI+RXggLSBBSUlNUywgRXgtIEZvcnRpczwvcD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBEb2N0b3JQcm9maWxlQ2FyZFxuIiwiaW1wb3J0IERvY3RvclByb2ZpbGVDYXJkIGZyb20gJy4vRG9jdG9yUHJvZmlsZUNhcmQnXG5cbmV4cG9ydCBkZWZhdWx0IERvY3RvclByb2ZpbGVDYXJkIiwiaW1wb3J0IERvY3RvclByb2ZpbGVWaWV3IGZyb20gJy4vRG9jdG9yUHJvZmlsZVZpZXcuanMnXG5cbmV4cG9ydCBkZWZhdWx0IERvY3RvclByb2ZpbGVWaWV3IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cbmltcG9ydCBFeHBhbnNpb25QYW5lbCwge1xuICAgIEV4cGFuc2lvblBhbmVsU3VtbWFyeSxcbiAgICBFeHBhbnNpb25QYW5lbERldGFpbHMsXG59IGZyb20gJ21hdGVyaWFsLXVpL0V4cGFuc2lvblBhbmVsJztcbmltcG9ydCBFeHBhbmRNb3JlSWNvbiBmcm9tICdtYXRlcmlhbC11aS1pY29ucy9FeHBhbmRNb3JlJztcblxuXG5jbGFzcyBQcm9mZXNzaW9uYWxHcmFwaCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwid2lkZ2V0LXBhbmVsXCI+XG4gICAgICAgICAgICAgICAgPGg0IGNsYXNzTmFtZT1cInBhbmVsLXRpdGxlXCI+UHJvZmVzc2lvbmFsIEdyYXBoPC9oND5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBhbmVsLWNvbnRlbnQgcGQtMFwiPlxuICAgICAgICAgICAgICAgICAgICA8dWwgY2xhc3NOYW1lPVwibGlzdCBkcm9wLWRvd24tbGlzdFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGxpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxFeHBhbnNpb25QYW5lbD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPEV4cGFuc2lvblBhbmVsU3VtbWFyeSBleHBhbmRJY29uPXs8RXhwYW5kTW9yZUljb24gLz59PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0aXRsZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEVkdWNhdGlvbiA8c3BhbiBjbGFzc05hbWU9XCJmbG9hdC1yaWdodFwiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0V4cGFuc2lvblBhbmVsU3VtbWFyeT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPEV4cGFuc2lvblBhbmVsRGV0YWlscz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9yZS1jb250ZW50XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJmdy03MDAgdGV4dC1zbSB0ZXh0LXByaW1hcnlcIj5RdWFsaWZpY2F0aW9uPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwiZnctNzAwIHRleHQtbWQgdGV4dC1saWdodFwiPk1EPC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiZnctNzAwIHRleHQtc20gdGV4dC1wcmltYXJ5XCI+U3BlY2lhbGl6YXRpb248L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJmdy03MDAgdGV4dC1tZCB0ZXh0LWxpZ2h0XCI+RGVybWl0b2xvZ3k8L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJmdy03MDAgdGV4dC1zbSB0ZXh0LXByaW1hcnlcIj5Db2xsZWdlPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwiZnctNzAwIHRleHQtbWQgdGV4dC1saWdodFwiPk1HVSBVbml2ZXJzaXR5LCAyMDA5PC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvRXhwYW5zaW9uUGFuZWxEZXRhaWxzPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvRXhwYW5zaW9uUGFuZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGxpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxFeHBhbnNpb25QYW5lbD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPEV4cGFuc2lvblBhbmVsU3VtbWFyeSBleHBhbmRJY29uPXs8RXhwYW5kTW9yZUljb24gLz59PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0aXRsZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEFzc29jaWF0ZSBDbGluaWMvSG9zcGl0YWwgPHNwYW4gY2xhc3NOYW1lPVwiZmxvYXQtcmlnaHRcIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9FeHBhbnNpb25QYW5lbFN1bW1hcnk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxFeHBhbnNpb25QYW5lbERldGFpbHM+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vcmUtY29udGVudFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiZnctNzAwIHRleHQtc20gdGV4dC1wcmltYXJ5XCI+UXVhbGlmaWNhdGlvbjwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cImZ3LTcwMCB0ZXh0LW1kIHRleHQtbGlnaHRcIj5NRDwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImZ3LTcwMCB0ZXh0LXNtIHRleHQtcHJpbWFyeVwiPlNwZWNpYWxpemF0aW9uPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwiZnctNzAwIHRleHQtbWQgdGV4dC1saWdodFwiPkRlcm1pdG9sb2d5PC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiZnctNzAwIHRleHQtc20gdGV4dC1wcmltYXJ5XCI+Q29sbGVnZTwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cImZ3LTcwMCB0ZXh0LW1kIHRleHQtbGlnaHRcIj5NR1UgVW5pdmVyc2l0eSwgMjAwOTwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0V4cGFuc2lvblBhbmVsRGV0YWlscz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0V4cGFuc2lvblBhbmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxsaT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8RXhwYW5zaW9uUGFuZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxFeHBhbnNpb25QYW5lbFN1bW1hcnkgZXhwYW5kSWNvbj17PEV4cGFuZE1vcmVJY29uIC8+fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGl0bGVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBMYW5ndWFnZSA8c3BhbiBjbGFzc05hbWU9XCJmbG9hdC1yaWdodFwiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0V4cGFuc2lvblBhbmVsU3VtbWFyeT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPEV4cGFuc2lvblBhbmVsRGV0YWlscz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9yZS1jb250ZW50XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJmdy03MDAgdGV4dC1zbSB0ZXh0LXByaW1hcnlcIj5RdWFsaWZpY2F0aW9uPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwiZnctNzAwIHRleHQtbWQgdGV4dC1saWdodFwiPk1EPC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiZnctNzAwIHRleHQtc20gdGV4dC1wcmltYXJ5XCI+U3BlY2lhbGl6YXRpb248L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJmdy03MDAgdGV4dC1tZCB0ZXh0LWxpZ2h0XCI+RGVybWl0b2xvZ3k8L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJmdy03MDAgdGV4dC1zbSB0ZXh0LXByaW1hcnlcIj5Db2xsZWdlPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwiZnctNzAwIHRleHQtbWQgdGV4dC1saWdodFwiPk1HVSBVbml2ZXJzaXR5LCAyMDA5PC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvRXhwYW5zaW9uUGFuZWxEZXRhaWxzPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvRXhwYW5zaW9uUGFuZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGxpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxFeHBhbnNpb25QYW5lbD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPEV4cGFuc2lvblBhbmVsU3VtbWFyeSBleHBhbmRJY29uPXs8RXhwYW5kTW9yZUljb24gLz59PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0aXRsZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEF3YXJkcyA8c3BhbiBjbGFzc05hbWU9XCJmbG9hdC1yaWdodFwiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0V4cGFuc2lvblBhbmVsU3VtbWFyeT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPEV4cGFuc2lvblBhbmVsRGV0YWlscz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9yZS1jb250ZW50XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJmdy03MDAgdGV4dC1zbSB0ZXh0LXByaW1hcnlcIj5RdWFsaWZpY2F0aW9uPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwiZnctNzAwIHRleHQtbWQgdGV4dC1saWdodFwiPk1EPC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiZnctNzAwIHRleHQtc20gdGV4dC1wcmltYXJ5XCI+U3BlY2lhbGl6YXRpb248L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJmdy03MDAgdGV4dC1tZCB0ZXh0LWxpZ2h0XCI+RGVybWl0b2xvZ3k8L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJmdy03MDAgdGV4dC1zbSB0ZXh0LXByaW1hcnlcIj5Db2xsZWdlPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwiZnctNzAwIHRleHQtbWQgdGV4dC1saWdodFwiPk1HVSBVbml2ZXJzaXR5LCAyMDA5PC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvRXhwYW5zaW9uUGFuZWxEZXRhaWxzPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvRXhwYW5zaW9uUGFuZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGxpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxFeHBhbnNpb25QYW5lbD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPEV4cGFuc2lvblBhbmVsU3VtbWFyeSBleHBhbmRJY29uPXs8RXhwYW5kTW9yZUljb24gLz59PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0aXRsZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEFzc29jaWF0ZSBNZW1iZXJzaGlwIDxzcGFuIGNsYXNzTmFtZT1cImZsb2F0LXJpZ2h0XCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvRXhwYW5zaW9uUGFuZWxTdW1tYXJ5PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8RXhwYW5zaW9uUGFuZWxEZXRhaWxzPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb3JlLWNvbnRlbnRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImZ3LTcwMCB0ZXh0LXNtIHRleHQtcHJpbWFyeVwiPlF1YWxpZmljYXRpb248L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJmdy03MDAgdGV4dC1tZCB0ZXh0LWxpZ2h0XCI+TUQ8L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJmdy03MDAgdGV4dC1zbSB0ZXh0LXByaW1hcnlcIj5TcGVjaWFsaXphdGlvbjwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cImZ3LTcwMCB0ZXh0LW1kIHRleHQtbGlnaHRcIj5EZXJtaXRvbG9neTwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImZ3LTcwMCB0ZXh0LXNtIHRleHQtcHJpbWFyeVwiPkNvbGxlZ2U8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJmdy03MDAgdGV4dC1tZCB0ZXh0LWxpZ2h0XCI+TUdVIFVuaXZlcnNpdHksIDIwMDk8L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9FeHBhbnNpb25QYW5lbERldGFpbHM+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9FeHBhbnNpb25QYW5lbD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPEV4cGFuc2lvblBhbmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8RXhwYW5zaW9uUGFuZWxTdW1tYXJ5IGV4cGFuZEljb249ezxFeHBhbmRNb3JlSWNvbiAvPn0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRpdGxlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRXhwZXJpbmVjZSA8c3BhbiBjbGFzc05hbWU9XCJmbG9hdC1yaWdodFwiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0V4cGFuc2lvblBhbmVsU3VtbWFyeT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPEV4cGFuc2lvblBhbmVsRGV0YWlscz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9yZS1jb250ZW50XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJmdy03MDAgdGV4dC1zbSB0ZXh0LXByaW1hcnlcIj5RdWFsaWZpY2F0aW9uPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwiZnctNzAwIHRleHQtbWQgdGV4dC1saWdodFwiPk1EPC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiZnctNzAwIHRleHQtc20gdGV4dC1wcmltYXJ5XCI+U3BlY2lhbGl6YXRpb248L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJmdy03MDAgdGV4dC1tZCB0ZXh0LWxpZ2h0XCI+RGVybWl0b2xvZ3k8L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJmdy03MDAgdGV4dC1zbSB0ZXh0LXByaW1hcnlcIj5Db2xsZWdlPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwiZnctNzAwIHRleHQtbWQgdGV4dC1saWdodFwiPk1HVSBVbml2ZXJzaXR5LCAyMDA5PC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvRXhwYW5zaW9uUGFuZWxEZXRhaWxzPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvRXhwYW5zaW9uUGFuZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGxpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxFeHBhbnNpb25QYW5lbD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPEV4cGFuc2lvblBhbmVsU3VtbWFyeSBleHBhbmRJY29uPXs8RXhwYW5kTW9yZUljb24gLz59PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0aXRsZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFN1YnNjcmliZWQgU2VyaXZjZXMgPHNwYW4gY2xhc3NOYW1lPVwiZmxvYXQtcmlnaHRcIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9FeHBhbnNpb25QYW5lbFN1bW1hcnk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxFeHBhbnNpb25QYW5lbERldGFpbHM+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vcmUtY29udGVudFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiZnctNzAwIHRleHQtc20gdGV4dC1wcmltYXJ5XCI+UXVhbGlmaWNhdGlvbjwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cImZ3LTcwMCB0ZXh0LW1kIHRleHQtbGlnaHRcIj5NRDwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImZ3LTcwMCB0ZXh0LXNtIHRleHQtcHJpbWFyeVwiPlNwZWNpYWxpemF0aW9uPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwiZnctNzAwIHRleHQtbWQgdGV4dC1saWdodFwiPkRlcm1pdG9sb2d5PC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiZnctNzAwIHRleHQtc20gdGV4dC1wcmltYXJ5XCI+Q29sbGVnZTwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cImZ3LTcwMCB0ZXh0LW1kIHRleHQtbGlnaHRcIj5NR1UgVW5pdmVyc2l0eSwgMjAwOTwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0V4cGFuc2lvblBhbmVsRGV0YWlscz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0V4cGFuc2lvblBhbmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBQcm9mZXNzaW9uYWxHcmFwaFxuIiwiaW1wb3J0IFByb2Zlc3Npb25hbEdyYXBoIGZyb20gJy4vUHJvZmVzc2lvbmFsR3JhcGguanMnXG5cbmV4cG9ydCBkZWZhdWx0IFByb2Zlc3Npb25hbEdyYXBoIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgYXhpb3MgZnJvbSAnYXhpb3MnXG5cbmNsYXNzIExvY2F0aW9uU2VhcmNoIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIHNlYXJjaDogXCJcIixcbiAgICAgICAgICAgIHNlYXJjaFJlc3VsdHM6IFtdXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRMb2NhdGlvbihsb2NhdGlvbikge1xuICAgICAgICB2YXIgYXV0byA9IG5ldyBnb29nbGUubWFwcy5wbGFjZXMuQXV0b2NvbXBsZXRlU2VydmljZSgpXG5cbiAgICAgICAgdmFyIHJlcXVlc3QgPSB7XG4gICAgICAgICAgICBpbnB1dDogbG9jYXRpb24sXG4gICAgICAgICAgICB0eXBlczogWydnZW9jb2RlJ10sXG4gICAgICAgICAgICBjb21wb25lbnRSZXN0cmljdGlvbnM6IHsgY291bnRyeTogJ2luJyB9XG4gICAgICAgIH07XG4gICAgICAgIGlmIChsb2NhdGlvbikge1xuICAgICAgICAgICAgYXV0by5nZXRQbGFjZVByZWRpY3Rpb25zKHJlcXVlc3QsIGZ1bmN0aW9uIChyZXN1bHRzLCBzdGF0dXMpIHtcbiAgICAgICAgICAgICAgICByZXN1bHRzID0gcmVzdWx0cyB8fCBbXVxuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBzZWFyY2hSZXN1bHRzOiByZXN1bHRzIH0pXG4gICAgICAgICAgICB9LmJpbmQodGhpcykpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpbnB1dEhhbmRsZXIoZSkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIHNlYXJjaDogZS50YXJnZXQudmFsdWVcbiAgICAgICAgfSlcbiAgICAgICAgdGhpcy5nZXRMb2NhdGlvbihlLnRhcmdldC52YWx1ZSlcblxuICAgIH1cblxuICAgIHNlbGVjdExvY2F0aW9uKGxvY2F0aW9uKSB7XG4gICAgICAgIGxldCBtYXAgPSBuZXcgZ29vZ2xlLm1hcHMuTWFwKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYXAnKSwge1xuICAgICAgICAgICAgY2VudGVyOiB7IGxhdDogLTMzLjg2NywgbG5nOiAxNTEuMTk1IH0sXG4gICAgICAgICAgICB6b29tOiAxNVxuICAgICAgICB9KVxuICAgICAgICBsZXQgc2VydmljZSA9IG5ldyBnb29nbGUubWFwcy5wbGFjZXMuUGxhY2VzU2VydmljZShtYXApO1xuICAgICAgICBzZXJ2aWNlLmdldERldGFpbHMoe1xuICAgICAgICAgICAgcmVmZXJlbmNlOiBsb2NhdGlvbi5yZWZlcmVuY2VcbiAgICAgICAgfSwgZnVuY3Rpb24gKHBsYWNlLCBzdGF0dXMpIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMuc2VsZWN0TG9jYXRpb24ocGxhY2UpXG4gICAgICAgICAgICB0aGlzLnByb3BzLmhpc3RvcnkuZ28oLTEpXG5cbiAgICAgICAgfS5iaW5kKHRoaXMpKVxuICAgIH1cblxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgICBsZXQgaW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndG9wTG9jYXRpb25TZWFyY2gnKVxuICAgICAgICBpbnB1dC5mb2N1cygpXG4gICAgfVxuXG4gICAgZGV0ZWN0TG9jYXRpb24oKSB7XG4gICAgICAgIGlmIChuYXZpZ2F0b3IuZ2VvbG9jYXRpb24pIHtcbiAgICAgICAgICAgIG5hdmlnYXRvci5nZW9sb2NhdGlvbi5nZXRDdXJyZW50UG9zaXRpb24oKHBvc2l0aW9uKSA9PiB7XG4gICAgICAgICAgICAgICAgdmFyIGxhdGxuZyA9IHsgbGF0OiBwYXJzZUZsb2F0KHBvc2l0aW9uLmNvb3Jkcy5sYXRpdHVkZSksIGxuZzogcGFyc2VGbG9hdChwb3NpdGlvbi5jb29yZHMubG9uZ2l0dWRlKSB9O1xuXG4gICAgICAgICAgICAgICAgbGV0IGdlb2NvZGVyID0gbmV3IGdvb2dsZS5tYXBzLkdlb2NvZGVyXG4gICAgICAgICAgICAgICAgZ2VvY29kZXIuZ2VvY29kZSh7ICdsb2NhdGlvbic6IGxhdGxuZyB9LCAocmVzdWx0cywgc3RhdHVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHRzICYmIHJlc3VsdHNbMF0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuc2VsZWN0TG9jYXRpb24ocmVzdWx0c1swXSlcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuaGlzdG9yeS5nbygtMSlcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgLy8gZ2VvbG9jYXRpb24gaXMgbm90IHN1cHBvcnRlZFxuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhdGljIGNvbnRleHRUeXBlcyA9IHtcbiAgICAgICAgcm91dGVyOiAoKSA9PiBudWxsXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIDxoZWFkZXIgY2xhc3NOYW1lPVwic2tpbi13aGl0ZSBmaXhlZCBob3Jpem9udGFsIHRvcCBsb2NhdGlvbi1kZXRlY3QtaGVhZGVyXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGFpbmVyLWZsdWlkXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLTEyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic2VsZWN0LWxvY2F0aW9uLXJvdyB0ZXh0LWNlbnRlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuaGlzdG9yeS5nbygtMSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19IGNsYXNzTmFtZT1cImN0LWltZyBjdC1pbWctbWQgY2xvc2VcIj48aW1nIHNyYz1cIi9hc3NldHMvaW1nL2N1c3RvbWVyLWljb25zL2Nsb3NlLWJsYWNrLnN2Z1wiIGNsYXNzTmFtZT1cImltZy1mbHVpZFwiIC8+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGg0IGNsYXNzTmFtZT1cImZ3LTcwMCB0ZXh0LW1kXCI+U2VsZWN0IExvY2F0aW9uPC9oND5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtMTJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzZWFyY2gtcm93XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkb24tZ3JvdXAgbG9jYXRpb24tZGV0ZWN0LWZpZWxkXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgdmFsdWU9e3RoaXMuc3RhdGUuc2VhcmNofSBvbkNoYW5nZT17dGhpcy5pbnB1dEhhbmRsZXIuYmluZCh0aGlzKX0gY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sIGlucHV0LW1kIHNlYXJjaC1pbnB1dCBuby1zaGFkb3dcIiBwbGFjZWhvbGRlcj1cIlNlbGVjdCBhbnkgY2l0eSBvciBsb2NhbGl0eVwiIGlkPVwidG9wTG9jYXRpb25TZWFyY2hcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImN0LWltZyBjdC1pbWctc20gbWFwLW1hcmtlci1ibHVlXCI+PGltZyBzcmM9XCIvYXNzZXRzL2ltZy9jdXN0b21lci1pY29ucy9tYXAtbWFya2VyLWJsdWUuc3ZnXCIgY2xhc3NOYW1lPVwiaW1nLWZsdWlkXCIgLz48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZGV0ZWN0LW15LWxvY2FpdG9uXCIgb25DbGljaz17dGhpcy5kZXRlY3RMb2NhdGlvbi5iaW5kKHRoaXMpfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJjdC1pbWcgY3QtaW1nLXhzXCI+PGltZyBzcmM9XCIvYXNzZXRzL2ltZy9jdXN0b21lci1pY29ucy9ncHMuc3ZnXCIgY2xhc3NOYW1lPVwiaW1nLWZsdWlkXCIgLz48L3NwYW4+RGV0ZWN0IE15IExvY2F0aW9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9oZWFkZXI+XG4gICAgICAgICAgICAgICAgPHNlY3Rpb24gY2xhc3NOYW1lPVwid3JhcCBsb2NhdG9uLWRldGVjdC1zY3JlZW5cIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3aWRnZXQtcGFuZWxcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxoNCBjbGFzc05hbWU9XCJwYW5lbC10aXRsZVwiPlNlYXJjaCBSZXN1bHQ8L2g0PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwYW5lbC1jb250ZW50IHBkLTBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dWwgY2xhc3NOYW1lPVwibGlzdCBjaXR5LWxpc3RcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZS5zZWFyY2hSZXN1bHRzLm1hcCgocmVzdWx0LCBpKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDxsaSBrZXk9e2l9IG9uQ2xpY2s9e3RoaXMuc2VsZWN0TG9jYXRpb24uYmluZCh0aGlzLCByZXN1bHQpfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGE+e3Jlc3VsdC5kZXNjcmlwdGlvbn1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImNpdHktbG9jXCI+Q2l0eTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L3NlY3Rpb24+XG4gICAgICAgICAgICAgICAgPGRpdiBpZD1cIm1hcFwiIHN0eWxlPXt7IGRpc3BsYXk6ICdub25lJyB9fT48L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBMb2NhdGlvblNlYXJjaFxuIiwiaW1wb3J0IExvY2F0aW9uU2VhcmNoIGZyb20gJy4vTG9jYXRpb25TZWFyY2guanMnXG5cblxuZXhwb3J0IGRlZmF1bHQgTG9jYXRpb25TZWFyY2giLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcblxuaW1wb3J0IERvY3RvclByb2ZpbGVDYXJkIGZyb20gJy4uL2NvbW1vbnMvZG9jdG9yUHJvZmlsZUNhcmQvaW5kZXguanMnXG5pbXBvcnQgRGV0YWlsc0Zvcm0gZnJvbSAnLi9kZXRhaWxzRm9ybS9pbmRleC5qcydcbmltcG9ydCBTZWxlY3RlZENsaW5pYyBmcm9tICcuLi9jb21tb25zL3NlbGVjdGVkQ2xpbmljL2luZGV4LmpzJ1xuXG5jbGFzcyBQYXRpZW50RGV0YWlscyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgICBzZWxlY3RlZERvY3RvcjogbnVsbCxcbiAgICAgICAgICAgIHNlbGVjdGVkQ2xpbmljOiBudWxsLFxuICAgICAgICAgICAgc2VsZWN0ZWRTbG90OiBudWxsXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcm9jZWVkKCl7XG4gICAgICAgIHRoaXMuY29udGV4dC5yb3V0ZXIuaGlzdG9yeS5wdXNoKCcvcGF5bWVudCcpXG4gICAgfVxuXG4gICAgZ2V0TG9jYXRpb25QYXJhbSh0YWcpIHtcbiAgICAgICAgLy8gdGhpcyBBUEkgYXNzdW1lcyB0aGUgY29udGV4dCBvZiByZWFjdC1yb3V0ZXItNFxuICAgICAgICBjb25zdCBwYXJhbVN0cmluZyA9IHRoaXMucHJvcHMubG9jYXRpb24uc2VhcmNoXG4gICAgICAgIGNvbnN0IHBhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXMocGFyYW1TdHJpbmcpXG4gICAgICAgIHJldHVybiBwYXJhbXMuZ2V0KHRhZylcbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGxldCBkb2N0b3JJZCA9IHRoaXMucHJvcHMubWF0Y2gucGFyYW1zLmlkXG4gICAgICAgICAgICBsZXQgY2xpbmljSWQgPSB0aGlzLnByb3BzLm1hdGNoLnBhcmFtcy5jbGluaWNJZFxuICAgICAgICAgICAgbGV0IHNlbGVjdGVkU2xvdCA9IHRoaXMuZ2V0TG9jYXRpb25QYXJhbSgndCcpXG4gICAgICAgICAgICBzZWxlY3RlZFNsb3QgPSBuZXcgRGF0ZShwYXJzZUZsb2F0KHNlbGVjdGVkU2xvdCkpXG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIGlmIChkb2N0b3JJZCAmJiBjbGluaWNJZCAmJiBzZWxlY3RlZFNsb3QpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWREb2N0b3I6IGRvY3RvcklkLFxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZENsaW5pYzogY2xpbmljSWQsXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkU2xvdDogc2VsZWN0ZWRTbG90LnRvU3RyaW5nKClcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuZ2V0RG9jdG9yQnlJZChkb2N0b3JJZClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaCAoZSkge1xuXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdGF0aWMgY29udGV4dFR5cGVzID0ge1xuICAgICAgICByb3V0ZXI6ICgpID0+IG51bGxcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGF0aWVudERldGFpbHNcIj5cblxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5ET0NUT1JTW3RoaXMuc3RhdGUuc2VsZWN0ZWREb2N0b3JdID9cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPERvY3RvclByb2ZpbGVDYXJkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhpZGVCb3R0b209e3RydWV9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhpZGVCb29rTm93PXt0cnVlfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXRhaWxzPXt0aGlzLnByb3BzLkRPQ1RPUlNbdGhpcy5zdGF0ZS5zZWxlY3RlZERvY3Rvcl19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8U2VsZWN0ZWRDbGluaWNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWREb2N0b3I9e3RoaXMucHJvcHMuRE9DVE9SU1t0aGlzLnN0YXRlLnNlbGVjdGVkRG9jdG9yXX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRDbGluaWM9e3RoaXMuc3RhdGUuc2VsZWN0ZWRDbGluaWN9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNlbGVjdGVkQXBwb2ludG1lbnRTbG90XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoNT5TZWxlY3RlZCBBcHBvaW50bWVudCBTbG90PC9oNT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiYXBwZGF0ZVwiPkFwcG9pbnRtZW50IERhdGU8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImRhdGVcIj57IHRoaXMuc3RhdGUuc2VsZWN0ZWRTbG90IH08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPERldGFpbHNGb3JtIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJwcm9jZWVkYnRuXCIgb25DbGljaz17dGhpcy5wcm9jZWVkLmJpbmQodGhpcyl9PkNvbmZpcm0gQm9va2luZzwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+IDogXCJcIlxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IFBhdGllbnREZXRhaWxzXG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcblxuY2xhc3MgRGV0YWlsc0Zvcm0gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgcGF0aWVudE5hbWUgOiAnJyxcbiAgICAgICAgICAgIHBhdGllbnRFbWFpbCA6ICcnLFxuICAgICAgICAgICAgcGF0aWVudEdlbmRlciA6ICdtYWxlJyxcbiAgICAgICAgICAgIHBhdGllbnRNb2JpbGUgOiAnJyxcbiAgICAgICAgICAgIG90cCA6JydcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlucHV0SGFuZGxlcih3aGljaCwgZSl7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBbd2hpY2hdIDogZS50YXJnZXQudmFsdWUgfSlcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZGV0YWlsc0Zvcm1cIj5cbiAgICAgICAgICAgICAgICA8aDU+UGxlYXNlIHByb3ZpZGUgcGF0aWVudCBkZXRhaWxzPC9oNT5cblxuICAgICAgICAgICAgICAgIDxpbnB1dCB2YWx1ZT17dGhpcy5zdGF0ZS5wYXRpZW50TmFtZX0gb25DaGFuZ2U9e3RoaXMuaW5wdXRIYW5kbGVyLmJpbmQodGhpcywncGF0aWVudE5hbWUnKX0gY2xhc3NOYW1lPVwicHRuYW1lXCIgcGxhY2Vob2xkZXI9XCJQYXRpZW50IE5hbWUqXCIgLz5cbiAgICAgICAgICAgICAgICA8aW5wdXQgdmFsdWU9e3RoaXMuc3RhdGUucGF0aWVudEVtYWlsfSBvbkNoYW5nZT17dGhpcy5pbnB1dEhhbmRsZXIuYmluZCh0aGlzLCdwYXRpZW50RW1haWwnKX0gY2xhc3NOYW1lPVwicHRlbWFpbFwiIHBsYWNlaG9sZGVyPVwiRW1haWwqXCIgLz5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInB0Z2VuZGVyXCI+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuPkdlbmRlciA6PC9zcGFuPiBcbiAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJyYWRpb1wiIG5hbWU9XCJnZW5kZXJcIiB2YWx1ZT1cIm1hbGVcIiBjaGVja2VkPXt0aGlzLnN0YXRlLnBhdGllbnRHZW5kZXIgPT09IFwibWFsZVwifSBvbkNoYW5nZT17dGhpcy5pbnB1dEhhbmRsZXIuYmluZCh0aGlzLCdwYXRpZW50R2VuZGVyJyl9Lz4gTWFsZVxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInJhZGlvXCIgbmFtZT1cImdlbmRlclwiIHZhbHVlPVwiZmVtYWxlXCIgY2hlY2tlZD17dGhpcy5zdGF0ZS5wYXRpZW50R2VuZGVyID09PSBcImZlbWFsZVwifSBvbkNoYW5nZT17dGhpcy5pbnB1dEhhbmRsZXIuYmluZCh0aGlzLCdwYXRpZW50R2VuZGVyJyl9Lz4gRmVtYWxlXG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGlucHV0IHZhbHVlPXt0aGlzLnN0YXRlLnBhdGllbnRNb2JpbGV9IG9uQ2hhbmdlPXt0aGlzLmlucHV0SGFuZGxlci5iaW5kKHRoaXMsJ3BhdGllbnRNb2JpbGUnKX0gY2xhc3NOYW1lPVwicHRtb2JpbGVcIiBwbGFjZWhvbGRlcj1cIk1vYmlsZSpcIiAvPlxuICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwib3RwYnRuXCI+KFJlKVNlbmQgT1RQPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPGlucHV0IHZhbHVlPXt0aGlzLnN0YXRlLm90cH0gb25DaGFuZ2U9e3RoaXMuaW5wdXRIYW5kbGVyLmJpbmQodGhpcywnb3RwJyl9IGNsYXNzTmFtZT1cInB0b3RwXCIgcGxhY2Vob2xkZXI9XCJFbnRlciBPVFAqXCIgLz5cblxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IERldGFpbHNGb3JtXG4iLCJpbXBvcnQgRGV0YWlsc0Zvcm0gZnJvbSAnLi9EZXRhaWxzRm9ybS5qcydcblxuZXhwb3J0IGRlZmF1bHQgRGV0YWlsc0Zvcm0iLCJpbXBvcnQgUGF0aWVudERldGFpbHMgZnJvbSAnLi9QYXRpZW50RGV0YWlscy5qcydcblxuZXhwb3J0IGRlZmF1bHQgUGF0aWVudERldGFpbHMiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgUGF5bWVudEljb24gZnJvbSAnbWF0ZXJpYWwtdWktaWNvbnMvUGF5bWVudCc7XG5pbXBvcnQgQ2FzaEljb24gZnJvbSAnbWF0ZXJpYWwtdWktaWNvbnMvQXR0YWNoTW9uZXknO1xuXG5jbGFzcyBQYXltZW50VmlldyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgfVxuXG4gICAgcHJvY2VlZCgpe1xuICAgICAgICB0aGlzLmNvbnRleHQucm91dGVyLmhpc3RvcnkucHVzaChcIi9ib29raW5nLzpyZWZJZFwiKVxuICAgIH1cblxuICAgIHN0YXRpYyBjb250ZXh0VHlwZXMgPSB7XG4gICAgICAgIHJvdXRlcjogKCkgPT4gbnVsbFxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwYXltZW50XCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJvZmZlclJvd1wiPlxuICAgICAgICAgICAgICAgICAgICA8c3Bhbj5HZXQgMTAlIGNhc2hiYWNrIGZvciBhbGwgb25saW5lIHBheW1lbnQsIFQmQzwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBheW1lbnRSb3dcIiBvbkNsaWNrPXt0aGlzLnByb2NlZWQuYmluZCh0aGlzKX0+XG4gICAgICAgICAgICAgICAgICAgIDxQYXltZW50SWNvbiBjbGFzc05hbWU9XCJwYXltZW50SWNvblwiIC8+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuPlBheXRtIFdhbGxldDwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBheW1lbnRSb3dcIiBvbkNsaWNrPXt0aGlzLnByb2NlZWQuYmluZCh0aGlzKX0+XG4gICAgICAgICAgICAgICAgICAgIDxQYXltZW50SWNvbiBjbGFzc05hbWU9XCJwYXltZW50SWNvblwiIC8+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuPkNyZWRpdC9EZWJpdC9BVE0gQ2FyZDwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBheW1lbnRSb3dcIiBvbkNsaWNrPXt0aGlzLnByb2NlZWQuYmluZCh0aGlzKX0+XG4gICAgICAgICAgICAgICAgICAgIDxQYXltZW50SWNvbiBjbGFzc05hbWU9XCJwYXltZW50SWNvblwiIC8+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuPk5ldCBCYW5raW5nPC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGF5bWVudFJvd1wiIG9uQ2xpY2s9e3RoaXMucHJvY2VlZC5iaW5kKHRoaXMpfT5cbiAgICAgICAgICAgICAgICAgICAgPENhc2hJY29uIGNsYXNzTmFtZT1cInBheW1lbnRJY29uXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4+UGF5IGluIENhc2g8L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwYXltZW50Um93XCIgb25DbGljaz17dGhpcy5wcm9jZWVkLmJpbmQodGhpcyl9PlxuICAgICAgICAgICAgICAgICAgICA8UGF5bWVudEljb24gY2xhc3NOYW1lPVwicGF5bWVudEljb25cIiAvPlxuICAgICAgICAgICAgICAgICAgICA8c3Bhbj5PbkRvYyBQYXk8L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgUGF5bWVudFZpZXdcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG5pbXBvcnQgQ29tbW9ubHlTZWFyY2hlZCBmcm9tICcuLi8uLi9jb21tb25zL2NvbW1vbmx5U2VhcmNoZWQvaW5kZXguanMnXG5pbXBvcnQgQ3JpdGVyaWFTZWFyY2ggZnJvbSAnLi4vLi4vY29tbW9ucy9jcml0ZXJpYVNlYXJjaCdcblxuY2xhc3MgU2VhcmNoQ3JpdGVyaWFWaWV3IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICB9XG5cbiAgICBzZWFyY2hQcm9jZWVkKCkge1xuICAgICAgICBsZXQgc2VhcmNoRGF0YSA9IHtcbiAgICAgICAgICAgIHNlbGVjdGVkQ3JpdGVyaWFzOiB0aGlzLnByb3BzLnNlbGVjdGVkQ3JpdGVyaWFzLFxuICAgICAgICAgICAgc2VsZWN0ZWRMb2NhdGlvbjogdGhpcy5wcm9wcy5zZWxlY3RlZExvY2F0aW9uLFxuICAgICAgICB9XG4gICAgICAgIHNlYXJjaERhdGEgPSBlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc2VhcmNoRGF0YSkpXG4gICAgICAgIGxldCBmaWx0ZXJEYXRhID0gZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHRoaXMucHJvcHMuZmlsdGVyQ3JpdGVyaWEpKVxuICAgICAgICB0aGlzLnByb3BzLmhpc3RvcnkucHVzaChgL29wZC9zZWFyY2hyZXN1bHRzP3NlYXJjaD0ke3NlYXJjaERhdGF9JmZpbHRlcj0ke2ZpbHRlckRhdGF9YClcbiAgICB9XG5cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgPENyaXRlcmlhU2VhcmNoIHsuLi50aGlzLnByb3BzfSBjaGVja0ZvckxvYWQ9e3RoaXMucHJvcHMuTE9BREVEX1NFQVJDSF9DUklURVJJQV9PUER9IHRpdGxlPVwiU2VhcmNoIEZvciBEaXNlYXNlIG9yIERvY3Rvci5cIiB0eXBlPVwib3BkXCI+XG4gICAgICAgICAgICAgICAgICAgIDxzZWN0aW9uIGNsYXNzTmFtZT1cIndyYXAgd3JhcC0xMDBcIj5cblxuICAgICAgICAgICAgICAgICAgICAgICAgPENvbW1vbmx5U2VhcmNoZWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWFkaW5nPVwiU2VsZWN0ZWQgQ3JpdGVyaWFcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE9e3RoaXMucHJvcHMuc2VsZWN0ZWRDcml0ZXJpYXN9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWQ9e1tdfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvZ2dsZT17dGhpcy5wcm9wcy50b2dnbGVPUERDcml0ZXJpYS5iaW5kKHRoaXMpfVxuICAgICAgICAgICAgICAgICAgICAgICAgLz5cblxuICAgICAgICAgICAgICAgICAgICAgICAgPENvbW1vbmx5U2VhcmNoZWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWFkaW5nPVwiQ29tbW9uIENvbmRpdGlvbnNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJjb25kaXRpb25cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE9e3RoaXMucHJvcHMuY29uZGl0aW9uc31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZD17dGhpcy5wcm9wcy5zZWxlY3RlZENyaXRlcmlhcy5maWx0ZXIoeCA9PiB4LnR5cGUgPT0gJ2NvbmRpdGlvbicpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvZ2dsZT17dGhpcy5wcm9wcy50b2dnbGVPUERDcml0ZXJpYS5iaW5kKHRoaXMpfVxuICAgICAgICAgICAgICAgICAgICAgICAgLz5cblxuICAgICAgICAgICAgICAgICAgICAgICAgPENvbW1vbmx5U2VhcmNoZWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWFkaW5nPVwiQ29tbW9uIFNwZWNpYWxpdGllc1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cInNwZWNpYWxpdHlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE9e3RoaXMucHJvcHMuc3BlY2lhbGl6YXRpb25zfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkPXt0aGlzLnByb3BzLnNlbGVjdGVkQ3JpdGVyaWFzLmZpbHRlcih4ID0+IHgudHlwZSA9PSAnc3BlY2lhbGl0eScpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvZ2dsZT17dGhpcy5wcm9wcy50b2dnbGVPUERDcml0ZXJpYS5iaW5kKHRoaXMpfVxuICAgICAgICAgICAgICAgICAgICAgICAgLz5cblxuICAgICAgICAgICAgICAgICAgICA8L3NlY3Rpb24+XG4gICAgICAgICAgICAgICAgPC9Dcml0ZXJpYVNlYXJjaD5cblxuICAgICAgICAgICAgICAgIDxidXR0b24gb25DbGljaz17dGhpcy5zZWFyY2hQcm9jZWVkLmJpbmQodGhpcyl9IGNsYXNzTmFtZT1cInYtYnRuIHYtYnRuLXByaW1hcnkgYnRuLWxnIGZpeGVkIGhvcml6b250YWwgYm90dG9tIG5vLXJvdW5kIHRleHQtbGdcIj5TaG93IERvY3RvcnM8L2J1dHRvbj5cblxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBTZWFyY2hDcml0ZXJpYVZpZXdcbiIsImltcG9ydCBTZWFyY2hDcml0ZXJpYVZpZXcgZnJvbSAnLi9TZWFyY2hDcml0ZXJpYVZpZXcuanMnXG5cbmV4cG9ydCBkZWZhdWx0IFNlYXJjaENyaXRlcmlhVmlldyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCBEb2N0b3JzTGlzdCBmcm9tICcuLi9zZWFyY2hSZXN1bHRzL2RvY3RvcnNMaXN0L2luZGV4LmpzJ1xuaW1wb3J0IENyaXRlcmlhU2VhcmNoIGZyb20gJy4uLy4uL2NvbW1vbnMvY3JpdGVyaWFTZWFyY2gnXG5pbXBvcnQgVG9wQmFyIGZyb20gJy4vdG9wQmFyJ1xuXG5cbmNsYXNzIFNlYXJjaFJlc3VsdHNWaWV3IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcblxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIHRoaXMuZ2V0RGNvdG9ycygpXG4gICAgfVxuXG4gICAgZ2V0RGNvdG9ycygpIHtcbiAgICAgICAgbGV0IHtcbiAgICAgICAgICAgIHNlbGVjdGVkTG9jYXRpb24sXG4gICAgICAgICAgICBzZWxlY3RlZENyaXRlcmlhcyxcbiAgICAgICAgICAgIGZpbHRlckNyaXRlcmlhXG4gICAgICAgIH0gPSB0aGlzLnByb3BzXG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGxldCBzZWFyY2hTdGF0ZSA9IHRoaXMuZ2V0TG9jYXRpb25QYXJhbSgnc2VhcmNoJylcbiAgICAgICAgICAgIGxldCBmaWx0ZXJDcml0ZXJpYSA9IHRoaXMuZ2V0TG9jYXRpb25QYXJhbSgnZmlsdGVyJylcbiAgICAgICAgICAgIGlmIChmaWx0ZXJDcml0ZXJpYSkge1xuICAgICAgICAgICAgICAgIGZpbHRlckNyaXRlcmlhID0gSlNPTi5wYXJzZShmaWx0ZXJDcml0ZXJpYSlcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZmlsdGVyQ3JpdGVyaWEgPSB7fVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2VhcmNoU3RhdGUgPSBKU09OLnBhcnNlKHNlYXJjaFN0YXRlKVxuICAgICAgICAgICAgdGhpcy5nZXREb2N0b3JMaXN0KHNlYXJjaFN0YXRlLCBmaWx0ZXJDcml0ZXJpYSwgdHJ1ZSlcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihlKVxuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBhcHBseUZpbHRlcnMoZmlsdGVyU3RhdGUpIHtcbiAgICAgICAgbGV0IHNlYXJjaFN0YXRlID0ge1xuICAgICAgICAgICAgc2VsZWN0ZWRDcml0ZXJpYXM6IHRoaXMucHJvcHMuc2VsZWN0ZWRDcml0ZXJpYXMsXG4gICAgICAgICAgICBzZWxlY3RlZExvY2F0aW9uOiB0aGlzLnByb3BzLnNlbGVjdGVkTG9jYXRpb24sXG4gICAgICAgIH1cbiAgICAgICAgbGV0IHNlYXJjaERhdGEgPSBlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc2VhcmNoU3RhdGUpKVxuICAgICAgICBsZXQgZmlsdGVyRGF0YSA9IGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShmaWx0ZXJTdGF0ZSkpXG4gICAgICAgIHRoaXMucHJvcHMuaGlzdG9yeS5yZXBsYWNlKGAvb3BkL3NlYXJjaHJlc3VsdHM/c2VhcmNoPSR7c2VhcmNoRGF0YX0mZmlsdGVyPSR7ZmlsdGVyRGF0YX1gKVxuXG4gICAgICAgIHRoaXMuZ2V0RG9jdG9yTGlzdChzZWFyY2hTdGF0ZSwgZmlsdGVyU3RhdGUsIHRydWUpXG4gICAgfVxuXG4gICAgZ2V0TG9jYXRpb25QYXJhbSh0YWcpIHtcbiAgICAgICAgLy8gdGhpcyBBUEkgYXNzdW1lcyB0aGUgY29udGV4dCBvZiByZWFjdC1yb3V0ZXItNFxuICAgICAgICBjb25zdCBwYXJhbVN0cmluZyA9IHRoaXMucHJvcHMubG9jYXRpb24uc2VhcmNoXG4gICAgICAgIGNvbnN0IHBhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXMocGFyYW1TdHJpbmcpXG4gICAgICAgIHJldHVybiBwYXJhbXMuZ2V0KHRhZylcbiAgICB9XG5cbiAgICBnZXREb2N0b3JMaXN0KHNlYXJjaFN0YXRlLCBmaWx0ZXJDcml0ZXJpYSwgbWVyZ2VTdGF0ZSkge1xuICAgICAgICB0aGlzLnByb3BzLmdldERvY3RvcnMoc2VhcmNoU3RhdGUsIGZpbHRlckNyaXRlcmlhLCBtZXJnZVN0YXRlKTtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIDxDcml0ZXJpYVNlYXJjaCB7Li4udGhpcy5wcm9wc30gY2hlY2tGb3JMb2FkPXt0aGlzLnByb3BzLkxPQURFRF9ET0NUT1JfU0VBUkNIfSB0aXRsZT1cIlNlYXJjaCBGb3IgRGlzZWFzZSBvciBEb2N0b3IuXCIgdHlwZT1cIm9wZFwiPlxuICAgICAgICAgICAgICAgICAgICA8VG9wQmFyIHsuLi50aGlzLnByb3BzfSBhcHBseUZpbHRlcnM9e3RoaXMuYXBwbHlGaWx0ZXJzLmJpbmQodGhpcyl9IC8+XG4gICAgICAgICAgICAgICAgICAgIDxEb2N0b3JzTGlzdCB7Li4udGhpcy5wcm9wc30gLz5cbiAgICAgICAgICAgICAgICA8L0NyaXRlcmlhU2VhcmNoPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBTZWFyY2hSZXN1bHRzVmlld1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cbmltcG9ydCBEb2N0b3JQcm9maWxlQ2FyZCBmcm9tICcuLi8uLi9jb21tb25zL2RvY3RvclByb2ZpbGVDYXJkL2luZGV4LmpzJ1xuLy8gaW1wb3J0IEluZmluaXRlU2Nyb2xsIGZyb20gJ3JlYWN0LWluZmluaXRlLXNjcm9sbGVyJztcblxuXG5jbGFzcyBEb2N0b3JzTGlzdCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIGxldCB7IERPQ1RPUlMsIGRvY3Rvckxpc3QgfSA9IHRoaXMucHJvcHNcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPHNlY3Rpb24gY2xhc3NOYW1lPVwid3JhcCBzZWFyY2gtcmVzdWx0LWRyXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250YWluZXItZmx1aWRcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLTEyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb2N0b3JMaXN0Lm1hcCgoZG9jSWQsIGkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiA8RG9jdG9yUHJvZmlsZUNhcmQgey4uLnRoaXMucHJvcHN9IGRldGFpbHM9e0RPQ1RPUlNbZG9jSWRdfSBrZXk9e2l9IC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9zZWN0aW9uPlxuICAgICAgICApO1xuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBEb2N0b3JzTGlzdFxuIiwiaW1wb3J0IERvY3Rvckxpc3QgZnJvbSAnLi9Eb2N0b3JzTGlzdC5qcydcblxuZXhwb3J0IGRlZmF1bHQgRG9jdG9yTGlzdCIsImltcG9ydCBTZWFyY2hSZXN1bHRzVmlldyBmcm9tICcuL1NlYXJjaFJlc3VsdHNWaWV3LmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBTZWFyY2hSZXN1bHRzVmlldyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG5pbXBvcnQgTWVudSwgeyBNZW51SXRlbSB9IGZyb20gJ21hdGVyaWFsLXVpL01lbnUnO1xuaW1wb3J0IFJhbmdlIGZyb20gJ3JjLXNsaWRlci9saWIvUmFuZ2UnO1xuXG5jbGFzcyBUb3BCYXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgYW5jaG9yRWw6IG51bGwsXG4gICAgICAgICAgICBvcGVuRmlsdGVyOiBmYWxzZSxcbiAgICAgICAgICAgIHByaWNlUmFuZ2U6IFsxMDAsIDE1MDBdLFxuICAgICAgICAgICAgc29ydF9vbjogbnVsbCxcbiAgICAgICAgICAgIHNpdHNfYXRfY2xpbmljOiBmYWxzZSxcbiAgICAgICAgICAgIHNpdHNfYXRfaG9zcGl0YWw6IGZhbHNlLFxuICAgICAgICAgICAgaXNfZmVtYWxlOiBmYWxzZSxcbiAgICAgICAgICAgIGlzX2F2YWlsYWJsZTogZmFsc2VcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMocHJvcHMpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IC4uLnByb3BzLmZpbHRlckNyaXRlcmlhIH0pXG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyAuLi50aGlzLnByb3BzLmZpbHRlckNyaXRlcmlhIH0pXG4gICAgfVxuXG4gICAgaGFuZGxlSW5wdXQoZSkge1xuICAgICAgICBsZXQgZXZOYW1lID0gZS50YXJnZXQubmFtZVxuICAgICAgICBsZXQgY2hlY2tlZCA9IGUudGFyZ2V0LmNoZWNrZWRcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICBbZXZOYW1lXTogY2hlY2tlZFxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBhcHBseUZpbHRlcnMoKSB7XG4gICAgICAgIGxldCBmaWx0ZXJTdGF0ZSA9IHtcbiAgICAgICAgICAgIHByaWNlUmFuZ2U6IHRoaXMuc3RhdGUucHJpY2VSYW5nZSxcbiAgICAgICAgICAgIHNpdHNfYXQ6IHRoaXMuc3RhdGUuc2l0c19hdCxcbiAgICAgICAgICAgIHNvcnRfb246IHRoaXMuc3RhdGUuc29ydF9vbixcbiAgICAgICAgICAgIGlzX2ZlbWFsZTogdGhpcy5zdGF0ZS5pc19mZW1hbGUsXG4gICAgICAgICAgICBpc19hdmFpbGFibGU6IHRoaXMuc3RhdGUuaXNfYXZhaWxhYmxlLFxuICAgICAgICAgICAgc2l0c19hdF9jbGluaWM6IHRoaXMuc3RhdGUuc2l0c19hdF9jbGluaWMsXG4gICAgICAgICAgICBzaXRzX2F0X2hvc3BpdGFsOiB0aGlzLnN0YXRlLnNpdHNfYXRfaG9zcGl0YWxcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnByb3BzLmFwcGx5RmlsdGVycyhmaWx0ZXJTdGF0ZSlcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IG9wZW5GaWx0ZXI6IGZhbHNlIH0pXG4gICAgfVxuXG4gICAgaGFuZGxlT3BlbihldmVudCkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHsgYW5jaG9yRWw6IGV2ZW50LmN1cnJlbnRUYXJnZXQgfSlcbiAgICB9XG5cbiAgICBoYW5kbGVDbG9zZSh0eXBlKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBhbmNob3JFbDogbnVsbCwgc29ydF9vbjogdHlwZSB9LCAoKSA9PiB7XG4gICAgICAgICAgICBpZiAodHlwZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuYXBwbHlGaWx0ZXJzKClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICB0b2dnbGVGaWx0ZXIoKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgb3BlbkZpbHRlcjogIXRoaXMuc3RhdGUub3BlbkZpbHRlclxuICAgICAgICB9KVxuICAgIH1cblxuICAgIGhhbmRsZVJhbmdlKHR5cGUsIHJhbmdlKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgW3R5cGVdOiByYW5nZVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIGdldENyaXRlcmlhU3RyaW5nKHNlbGVjdGVkQ3JpdGVyaWFzKSB7XG4gICAgICAgIGlmIChzZWxlY3RlZENyaXRlcmlhcyAmJiBzZWxlY3RlZENyaXRlcmlhcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiBzZWxlY3RlZENyaXRlcmlhcy5yZWR1Y2UoKGZpbmFsLCBjdXJyLCBpKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGkgIT0gMCkge1xuICAgICAgICAgICAgICAgICAgICBmaW5hbCArPSAnLCAnXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZpbmFsICs9IGAke2N1cnIubmFtZX1gXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZpbmFsXG4gICAgICAgICAgICB9LCBcIlwiKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIGxldCBjcml0ZXJpYVN0ciA9IHRoaXMuZ2V0Q3JpdGVyaWFTdHJpbmcodGhpcy5wcm9wcy5zZWxlY3RlZENyaXRlcmlhcylcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPHNlY3Rpb24gY2xhc3NOYW1lPVwiZmlsdGVyLXJvd1wiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGFpbmVyLWZsdWlkXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC0xMlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmlsdGVyLWl0ZW1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhY3Rpb24tZmlsdGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dWwgY2xhc3NOYW1lPVwiaW5saW5lLWxpc3RcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGkgb25DbGljaz17dGhpcy5oYW5kbGVPcGVuLmJpbmQodGhpcyl9PjxzcGFuIGNsYXNzTmFtZT1cImN0LWltZyBjdC1pbWctc20gZmlsdGVyLWljb24gdGV4dC1yaWdodFwiPjxpbWcgc3JjPVwiL2Fzc2V0cy9pbWcvY3VzdG9tZXItaWNvbnMvcmFuZ2Uuc3ZnXCIgY2xhc3NOYW1lPVwiaW1nLWZsdWlkXCIgLz48L3NwYW4+PC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGkgb25DbGljaz17dGhpcy50b2dnbGVGaWx0ZXIuYmluZCh0aGlzKX0+PHNwYW4gY2xhc3NOYW1lPVwiY3QtaW1nIGN0LWltZy1zbSBmaWx0ZXItaWNvbiB0ZXh0LXJpZ2h0IGFwcGxpZWQtZmlsdGVyXCI+PGltZyBzcmM9XCIvYXNzZXRzL2ltZy9jdXN0b21lci1pY29ucy9maWx0ZXIuc3ZnXCIgY2xhc3NOYW1lPVwiaW1nLWZsdWlkXCIgLz48L3NwYW4+PHNwYW4gY2xhc3NOYW1lPVwiYXBwbGllZC1maWx0ZXItbm90aVwiIC8+PC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZpbHRlci10aXRsZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3RoaXMucHJvcHMuZG9jdG9yTGlzdC5sZW5ndGh9IFJlc3VsdHMgZm91bmQgZm9yIDxzcGFuIGNsYXNzTmFtZT1cImZ3LTcwMFwiPiB7Y3JpdGVyaWFTdHJ9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8TWVudVxuICAgICAgICAgICAgICAgICAgICBpZD1cInNvcnQtbWVudVwiXG4gICAgICAgICAgICAgICAgICAgIGFuY2hvckVsPXt0aGlzLnN0YXRlLmFuY2hvckVsfVxuICAgICAgICAgICAgICAgICAgICBvcGVuPXtCb29sZWFuKHRoaXMuc3RhdGUuYW5jaG9yRWwpfVxuICAgICAgICAgICAgICAgICAgICBvbkNsb3NlPXt0aGlzLmhhbmRsZUNsb3NlLmJpbmQodGhpcywgbnVsbCl9XG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICA8TWVudUl0ZW0gb25DbGljaz17dGhpcy5oYW5kbGVDbG9zZS5iaW5kKHRoaXMsICduYW1lJyl9PlJlbGF2YW5jZTwvTWVudUl0ZW0+XG4gICAgICAgICAgICAgICAgICAgIDxNZW51SXRlbSBvbkNsaWNrPXt0aGlzLmhhbmRsZUNsb3NlLmJpbmQodGhpcywgJ3ByaWNlJyl9PkZlZTwvTWVudUl0ZW0+XG4gICAgICAgICAgICAgICAgICAgIDxNZW51SXRlbSBvbkNsaWNrPXt0aGlzLmhhbmRsZUNsb3NlLmJpbmQodGhpcywgJ2Rpc3RhbmNlJyl9PkRpc3RhbmNlPC9NZW51SXRlbT5cbiAgICAgICAgICAgICAgICAgICAgPE1lbnVJdGVtIG9uQ2xpY2s9e3RoaXMuaGFuZGxlQ2xvc2UuYmluZCh0aGlzLCAnZXhwZXJpZW5jZScpfT5FeHBlcmllbmNlPC9NZW51SXRlbT5cbiAgICAgICAgICAgICAgICA8L01lbnU+XG5cbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUub3BlbkZpbHRlciA/IDxkaXYgb25DbGljaz17dGhpcy50b2dnbGVGaWx0ZXIuYmluZCh0aGlzKX0gY2xhc3NOYW1lPVwib3ZlcmxheSBibGFja1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3aWRnZXQgZmlsdGVyLXBvcHVwXCIgb25DbGljaz17KGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgICAgICAgICAgICAgICAgICB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIndpZGdldC1jb250ZW50XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmlsdGVyUm93XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0bFwiPkF2YWlsYWJsZSBUb2RheTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBuYW1lPVwiaXNfYXZhaWxhYmxlXCIgY2hlY2tlZD17ISF0aGlzLnN0YXRlLmlzX2F2YWlsYWJsZX0gb25DaGFuZ2U9e3RoaXMuaGFuZGxlSW5wdXQuYmluZCh0aGlzKX0gY2xhc3NOYW1lPVwiY2hlY2tGaWx0ZXJcIiAvPlxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwid2lkZ2V0LWNvbnRlbnRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmaWx0ZXJSb3dcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRsXCI+U2l0cyBBdDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBuYW1lPVwic2l0c19hdF9jbGluaWNcIiBjaGVja2VkPXshIXRoaXMuc3RhdGUuc2l0c19hdF9jbGluaWN9IG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUlucHV0LmJpbmQodGhpcyl9IGNsYXNzTmFtZT1cImNoZWNrRmlsdGVyXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImNoZWNrRmlsdGVyTGFiZWxcIj5DbGluaWM8L3NwYW4+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBuYW1lPVwic2l0c19hdF9ob3NwaXRhbFwiIGNoZWNrZWQ9eyEhdGhpcy5zdGF0ZS5zaXRzX2F0X2hvc3BpdGFsfSBvbkNoYW5nZT17dGhpcy5oYW5kbGVJbnB1dC5iaW5kKHRoaXMpfSBjbGFzc05hbWU9XCJjaGVja0ZpbHRlclwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJjaGVja0ZpbHRlckxhYmVsXCI+SG9zcGl0YWw8L3NwYW4+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3aWRnZXQtY29udGVudFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZpbHRlclJvd1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGxcIj5QcmljZTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRyXCI+UnMge3RoaXMuc3RhdGUucHJpY2VSYW5nZVswXX0gdG8ge3RoaXMuc3RhdGUucHJpY2VSYW5nZVsxXX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJibFwiPlJzIDEwMDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImJyXCI+UnMgMjAwMDwvc3Bhbj5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPFJhbmdlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWluPXsxMDB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF4PXsyMDAwfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXt0aGlzLnN0YXRlLnByaWNlUmFuZ2V9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RlcD17MTAwfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInJhbmdlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5oYW5kbGVSYW5nZS5iaW5kKHRoaXMsICdwcmljZVJhbmdlJyl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIndpZGdldC1jb250ZW50XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmlsdGVyUm93XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0bFwiPkZlbWFsZSBEb2N0b3I8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgbmFtZT1cImlzX2ZlbWFsZVwiIGNoZWNrZWQ9eyEhdGhpcy5zdGF0ZS5pc19mZW1hbGV9IG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUlucHV0LmJpbmQodGhpcyl9IGNsYXNzTmFtZT1cImNoZWNrRmlsdGVyXCIgLz5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIndpZGdldC1mb290ZXIgcGQtMFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cInYtYnRuIHYtYnRuLXByaW1hcnkgYnRuLWJsb2NrIGJ0bi1sZ1wiIG9uQ2xpY2s9e3RoaXMuYXBwbHlGaWx0ZXJzLmJpbmQodGhpcyl9PkFwcGx5PC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+IDogXCJcIlxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgPC9zZWN0aW9uPlxuICAgICAgICApO1xuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBUb3BCYXJcbiIsImltcG9ydCBUb3BCYXIgZnJvbSAnLi9Ub3BCYXIuanMnXG5cbmV4cG9ydCBkZWZhdWx0IFRvcEJhciIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IHsgd2l0aFJvdXRlciB9IGZyb20gXCJyZWFjdC1yb3V0ZXItZG9tXCI7XG5cbmltcG9ydCBSYWRpbywgeyBSYWRpb0dyb3VwIH0gZnJvbSAnbWF0ZXJpYWwtdWkvUmFkaW8nO1xuaW1wb3J0IENoZWNrYm94IGZyb20gJ21hdGVyaWFsLXVpL0NoZWNrYm94JztcbmltcG9ydCB7IEZvcm1MYWJlbCwgRm9ybUNvbnRyb2wsIEZvcm1Db250cm9sTGFiZWwsIEZvcm1IZWxwZXJUZXh0IH0gZnJvbSAnbWF0ZXJpYWwtdWkvRm9ybSc7XG5cblxuY2xhc3MgU2VhcmNoUmVzdWx0c0ZpbHRlciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgICBmZWVfMDogZmFsc2UsXG4gICAgICAgICAgICBmZWVfMTogZmFsc2UsXG4gICAgICAgICAgICBmZWVfMjogZmFsc2UsXG4gICAgICAgICAgICBmZWVfMzogZmFsc2UsXG4gICAgICAgICAgICBnZW5kZXI6ICdhbnknLFxuICAgICAgICAgICAgY2xpbmljX3BlcnNvbmFsOiBmYWxzZSxcbiAgICAgICAgICAgIGNsaW5pY19ob3NwaXRhbDogZmFsc2UsXG4gICAgICAgICAgICBjbGluaWNfbXVsdGk6IGZhbHNlLFxuICAgICAgICAgICAgYXZhaWxhYmxlX3RvZGF5OiBmYWxzZSxcbiAgICAgICAgICAgIGRpc3RhbmNlOiAnMzBrbSdcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHsgLi4udGhpcy5wcm9wcy5maWx0ZXJDcml0ZXJpYSB9KVxuICAgIH1cblxuICAgIGFwcGx5RmlsdGVyKCkge1xuICAgICAgICB0aGlzLnByb3BzLnNldE9QREZpbHRlcnModGhpcy5zdGF0ZSlcbiAgICAgICAgdGhpcy5wcm9wcy5oaXN0b3J5LmdvKC0xKVxuICAgIH1cblxuICAgIGhhbmRsZUNoZWNrYm94KG5hbWUsIGUpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IFtuYW1lXTogZS50YXJnZXQuY2hlY2tlZCB9KVxuICAgIH1cblxuICAgIGhhbmRsZUNoYW5nZVJhZGlvKG5hbWUsIGUpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IFtuYW1lXTogZS50YXJnZXQudmFsdWUgfSlcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic2VhcmNoUmVzdWx0c0ZpbHRlclwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3ViRmlsdGVyXCI+XG4gICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInN1YkhlYWRpbmdcIj5GZWU8L3A+XG4gICAgICAgICAgICAgICAgICAgIDxSYWRpb0dyb3VwXG4gICAgICAgICAgICAgICAgICAgICAgICBhcmlhLWxhYmVsPVwiZmVlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU9XCJmZWUxXCJcbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgPEZvcm1Db250cm9sTGFiZWwgY29udHJvbD17PENoZWNrYm94XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2tlZD17dGhpcy5zdGF0ZS5mZWVfMH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5oYW5kbGVDaGVja2JveC5iaW5kKHRoaXMsICdmZWVfMCcpfVxuICAgICAgICAgICAgICAgICAgICAgICAgLz59IGxhYmVsPVwiTGVzcyB0aGFuIDMwMFwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8Rm9ybUNvbnRyb2xMYWJlbCBjb250cm9sPXs8Q2hlY2tib3hcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGVja2VkPXt0aGlzLnN0YXRlLmZlZV8xfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUNoZWNrYm94LmJpbmQodGhpcywgJ2ZlZV8xJyl9XG4gICAgICAgICAgICAgICAgICAgICAgICAvPn0gbGFiZWw9XCIzMDAgdG8gNTAwXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxGb3JtQ29udHJvbExhYmVsIGNvbnRyb2w9ezxDaGVja2JveFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrZWQ9e3RoaXMuc3RhdGUuZmVlXzJ9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuaGFuZGxlQ2hlY2tib3guYmluZCh0aGlzLCAnZmVlXzInKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8+fSBsYWJlbD1cIjUwMCB0byAxMDAwXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxGb3JtQ29udHJvbExhYmVsIGNvbnRyb2w9ezxDaGVja2JveFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrZWQ9e3RoaXMuc3RhdGUuZmVlXzN9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuaGFuZGxlQ2hlY2tib3guYmluZCh0aGlzLCAnZmVlXzMnKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8+fSBsYWJlbD1cIjEwMDArXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgPC9SYWRpb0dyb3VwPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdWJGaWx0ZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwic3ViSGVhZGluZ1wiPkRpc3RhbmNlPC9wPlxuICAgICAgICAgICAgICAgICAgICA8UmFkaW9Hcm91cFxuICAgICAgICAgICAgICAgICAgICAgICAgYXJpYS1sYWJlbD1cIkRpc3RhbmNlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU9XCJEaXN0YW5jZTJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3RoaXMuc3RhdGUuZGlzdGFuY2V9XG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5oYW5kbGVDaGFuZ2VSYWRpby5iaW5kKHRoaXMsICdkaXN0YW5jZScpfVxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICA8Rm9ybUNvbnRyb2xMYWJlbCB2YWx1ZT1cIjMwa21cIiBjb250cm9sPXs8UmFkaW8gY29sb3I9XCJwcmltYXJ5XCIgLz59IGxhYmVsPVwiVW5kZXIgMzAgS01cIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPEZvcm1Db250cm9sTGFiZWwgdmFsdWU9XCIyMGttXCIgY29udHJvbD17PFJhZGlvIGNvbG9yPVwicHJpbWFyeVwiIC8+fSBsYWJlbD1cIlVuZGVyIDIwIEtNXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxGb3JtQ29udHJvbExhYmVsIHZhbHVlPVwiMTBrbVwiIGNvbnRyb2w9ezxSYWRpbyBjb2xvcj1cInByaW1hcnlcIiAvPn0gbGFiZWw9XCJVbmRlciAxMCBLTVwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8Rm9ybUNvbnRyb2xMYWJlbCB2YWx1ZT1cIjVrbVwiIGNvbnRyb2w9ezxSYWRpbyBjb2xvcj1cInByaW1hcnlcIiAvPn0gbGFiZWw9XCJVbmRlciA1IEtNXCIgLz5cblxuICAgICAgICAgICAgICAgICAgICA8L1JhZGlvR3JvdXA+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN1YkZpbHRlclwiPlxuICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJzdWJIZWFkaW5nXCI+VHlwZSBPZiBDbGluaWM8L3A+XG4gICAgICAgICAgICAgICAgICAgIDxSYWRpb0dyb3VwXG4gICAgICAgICAgICAgICAgICAgICAgICBhcmlhLWxhYmVsPVwiY2xpbmljVHlwZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lPVwiY2xpbmljVHlwZVwiXG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxGb3JtQ29udHJvbExhYmVsIGNvbnRyb2w9ezxDaGVja2JveFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrZWQ9e3RoaXMuc3RhdGUuY2xpbmljX3BlcnNvbmFsfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUNoZWNrYm94LmJpbmQodGhpcywgJ2NsaW5pY19wZXJzb25hbCcpfVxuICAgICAgICAgICAgICAgICAgICAgICAgLz59IGxhYmVsPVwiUGVyc29uYWxcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPEZvcm1Db250cm9sTGFiZWwgY29udHJvbD17PENoZWNrYm94XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2tlZD17dGhpcy5zdGF0ZS5jbGluaWNfaG9zcGl0YWx9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuaGFuZGxlQ2hlY2tib3guYmluZCh0aGlzLCAnY2xpbmljX2hvc3BpdGFsJyl9XG4gICAgICAgICAgICAgICAgICAgICAgICAvPn0gbGFiZWw9XCJIb3NwaXRhbFwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8Rm9ybUNvbnRyb2xMYWJlbCBjb250cm9sPXs8Q2hlY2tib3hcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGVja2VkPXt0aGlzLnN0YXRlLmNsaW5pY19tdWx0aX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5oYW5kbGVDaGVja2JveC5iaW5kKHRoaXMsICdjbGluaWNfbXVsdGknKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8+fSBsYWJlbD1cIk11bHRpLWRvY3RvciBjbGluaWNcIiAvPlxuICAgICAgICAgICAgICAgICAgICA8L1JhZGlvR3JvdXA+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN1YkZpbHRlclwiPlxuICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJzdWJIZWFkaW5nXCI+R2VuZGVyPC9wPlxuICAgICAgICAgICAgICAgICAgICA8UmFkaW9Hcm91cFxuICAgICAgICAgICAgICAgICAgICAgICAgYXJpYS1sYWJlbD1cImdlbmRlclwiXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lPVwiZ2VuZGVyMlwiXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17dGhpcy5zdGF0ZS5nZW5kZXJ9XG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5oYW5kbGVDaGFuZ2VSYWRpby5iaW5kKHRoaXMsICdnZW5kZXInKX1cbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgPEZvcm1Db250cm9sTGFiZWwgdmFsdWU9XCJhbnlcIiBjb250cm9sPXs8UmFkaW8gY29sb3I9XCJwcmltYXJ5XCIgLz59IGxhYmVsPVwiQW55XCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxGb3JtQ29udHJvbExhYmVsIHZhbHVlPVwibWFsZVwiIGNvbnRyb2w9ezxSYWRpbyBjb2xvcj1cInByaW1hcnlcIiAvPn0gbGFiZWw9XCJNYWxlXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxGb3JtQ29udHJvbExhYmVsIHZhbHVlPVwiZmVtYWxlXCIgY29udHJvbD17PFJhZGlvIGNvbG9yPVwicHJpbWFyeVwiIC8+fSBsYWJlbD1cIkZlbWFsZVwiIC8+XG5cbiAgICAgICAgICAgICAgICAgICAgPC9SYWRpb0dyb3VwPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdWJGaWx0ZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwic3ViSGVhZGluZ1wiPkF2YWlsYWJpbGl0eTwvcD5cbiAgICAgICAgICAgICAgICAgICAgPFJhZGlvR3JvdXBcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyaWEtbGFiZWw9XCJhdmFpbGFiaWxpdHlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZT1cImF2YWlsYWJpbGl0eVwiXG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxGb3JtQ29udHJvbExhYmVsIGNvbnRyb2w9ezxDaGVja2JveFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrZWQ9e3RoaXMuc3RhdGUuYXZhaWxhYmxlX3RvZGF5fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUNoZWNrYm94LmJpbmQodGhpcywgJ2F2YWlsYWJsZV90b2RheScpfVxuICAgICAgICAgICAgICAgICAgICAgICAgLz59IGxhYmVsPVwiQXZpYWxhYmxlIFRvZGF5XCIgLz5sYWJlbD1cIk11bHRpLWRvY3RvciBjbGluaWNcIiAvPlxuICAgICAgICAgICAgICAgICAgICA8L1JhZGlvR3JvdXA+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImFwcGx5RmlsdGVyXCIgb25DbGljaz17dGhpcy5hcHBseUZpbHRlci5iaW5kKHRoaXMpfT5BcHBseTwvYnV0dG9uPlxuXG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgd2l0aFJvdXRlcihTZWFyY2hSZXN1bHRzRmlsdGVyKVxuIiwiaW1wb3J0IFNlYXJjaFJlc3VsdHNGaWx0ZXIgZnJvbSAnLi9TZWFyY2hSZXN1bHRzRmlsdGVyLmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBTZWFyY2hSZXN1bHRzRmlsdGVyIiwiLy9BVVRIIEFDVElPTlNcbmV4cG9ydCBjb25zdCBTRU5EX09UUF9SRVFVRVNUID0gJ1NFTkRfT1RQX1JFUVVFU1QnXG5leHBvcnQgY29uc3QgU0VORF9PVFBfU1VDQ0VTUyA9ICdTRU5EX09UUF9TVUNDRVNTJ1xuZXhwb3J0IGNvbnN0IFNFTkRfT1RQX0ZBSUwgPSAnU0VORF9PVFBfRkFJTCdcbmV4cG9ydCBjb25zdCBTVUJNSVRfT1RQX1JFUVVFU1QgPSAnU1VCTUlUX09UUF9SRVFVRVNUJ1xuZXhwb3J0IGNvbnN0IFNVQk1JVF9PVFBfU1VDQ0VTUyA9ICdTVUJNSVRfT1RQX1NVQ0NFU1MnXG5leHBvcnQgY29uc3QgU1VCTUlUX09UUF9GQUlMID0gJ1NVQk1JVF9PVFBfRkFJTCdcblxuLy8gT1BEIEZMT1dcbmV4cG9ydCBjb25zdCBBUFBFTkRfRE9DVE9SUyA9ICdBUFBFTkRfRE9DVE9SUyc7XG5leHBvcnQgY29uc3QgRE9DVE9SX1NFQVJDSCA9ICdET0NUT1JfU0VBUkNIJztcbmV4cG9ydCBjb25zdCBET0NUT1JfU0VBUkNIX1NUQVJUID0gJ0RPQ1RPUl9TRUFSQ0hfU1RBUlQnO1xuZXhwb3J0IGNvbnN0IFNFTEVDVF9MT0NBVElPTl9PUEQgPSAnU0VMRUNUX0xPQ0FUSU9OX09QRCc7XG5leHBvcnQgY29uc3QgTUVSR0VfU0VBUkNIX1NUQVRFX09QRCA9ICdNRVJHRV9TRUFSQ0hfU1RBVEVfT1BEJztcbmV4cG9ydCBjb25zdCBUT0dHTEVfT1BEX0NSSVRFUklBID0gJ1RPR0dMRV9PUERfQ1JJVEVSSUEnO1xuZXhwb3J0IGNvbnN0IFNFVF9PUERfRklMVEVSUyA9ICdTRVRfT1BEX0ZJTFRFUlMnXG5leHBvcnQgY29uc3QgTE9BRF9TRUFSQ0hfQ1JJVEVSSUFfT1BEID0gJ0xPQURfU0VBUkNIX0NSSVRFUklBX09QRCdcblxuXG4vLyBESUFHIEZMT1dcbmV4cG9ydCBjb25zdCBUT0dHTEVfRElBR05PU0lTX0NSSVRFUklBID0gJ1RPR0dMRV9ESUFHTk9TSVNfQ1JJVEVSSUEnO1xuZXhwb3J0IGNvbnN0IE1FUkdFX1NFQVJDSF9TVEFURV9MQUIgPSAnTUVSR0VfU0VBUkNIX1NUQVRFX0xBQic7XG5leHBvcnQgY29uc3QgTE9BRF9TRUFSQ0hfQ1JJVEVSSUFfTEFCID0gJ0xPQURfU0VBUkNIX0NSSVRFUklBX0xBQidcbmV4cG9ydCBjb25zdCBBUFBFTkRfTEFCUyA9ICdBUFBFTkRfTEFCUyc7XG5leHBvcnQgY29uc3QgTEFCX1NFQVJDSCA9ICdMQUJfU0VBUkNIJztcbmV4cG9ydCBjb25zdCBTRUxFQ1RfTE9DQVRJT05fRElBR05PU0lTID0gJ1NFTEVDVF9MT0NBVElPTl9ESUFHTk9TSVMnO1xuZXhwb3J0IGNvbnN0IEFQUEVORF9GSUxURVJTX0RJQUdOT1NJUyA9ICdBUFBFTkRfRklMVEVSU19ESUFHTk9TSVMnO1xuZXhwb3J0IGNvbnN0IExBQl9TRUFSQ0hfU1RBUlQgPSAnTEFCX1NFQVJDSF9TVEFSVCc7XG5cbi8vIEFVVEggRkxPV1xuZXhwb3J0IGNvbnN0IEFQUEVORF9VU0VSX1BST0ZJTEVTID0gJ0FQUEVORF9VU0VSX1BST0ZJTEVTJztcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG5pbXBvcnQgeyB9IGZyb20gJy4uLy4uL2FjdGlvbnMvaW5kZXguanMnXG5cbmltcG9ydCBDaGF0VmlldyBmcm9tICcuLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvY2hhdC9pbmRleC5qcydcblxuXG5jbGFzcyBDaGF0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxDaGF0VmlldyB7Li4udGhpcy5wcm9wc30gLz5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9IChzdGF0ZSkgPT4ge1xuICAgIGNvbnN0IFVTRVIgPSBzdGF0ZS5VU0VSXG5cbiAgICByZXR1cm4ge1xuICAgICAgICBVU0VSXG4gICAgfVxufVxuXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSAoZGlzcGF0Y2gpID0+IHtcbiAgICByZXR1cm4ge1xuXG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpKENoYXQpO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cbmltcG9ydCB7IH0gZnJvbSAnLi4vLi4vYWN0aW9ucy9pbmRleC5qcydcblxuaW1wb3J0IEhvbWVWaWV3IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9Ib21lJ1xuXG5cbmNsYXNzIEhvbWUgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgIH1cblxuICAgIHN0YXRpYyBjb250ZXh0VHlwZXMgPSB7XG4gICAgICAgIHJvdXRlcjogKCkgPT4gbnVsbFxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPEhvbWVWaWV3IHsuLi50aGlzLnByb3BzfSAvPlxuICAgICAgICApO1xuICAgIH1cbn1cblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHN0YXRlKSA9PiB7XG4gICAgbGV0IHtcblxuICAgIH0gPSBzdGF0ZS5BVVRIXG5cbiAgICByZXR1cm4ge1xuXG4gICAgfVxufVxuXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSAoZGlzcGF0Y2gpID0+IHtcbiAgICByZXR1cm4ge1xuXG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpKEhvbWUpO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cbmltcG9ydCB7IHN1Ym1pdE9UUCB9IGZyb20gJy4uLy4uL2FjdGlvbnMvaW5kZXguanMnXG5cbmltcG9ydCBPdHBWZXJpZnlWaWV3IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9vdHBWZXJpZnknXG5cblxuY2xhc3MgT3RwVmVyaWZ5IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICB9XG5cbiAgICBzdGF0aWMgY29udGV4dFR5cGVzID0ge1xuICAgICAgICByb3V0ZXI6ICgpID0+IG51bGxcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxPdHBWZXJpZnlWaWV3IHsuLi50aGlzLnByb3BzfSAvPlxuICAgICAgICApO1xuICAgIH1cbn1cblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHN0YXRlKSA9PiB7XG4gICAgbGV0IHtcbiAgICAgICAgdG9rZW4sXG4gICAgICAgIGVycm9yX21lc3NhZ2UsXG4gICAgICAgIHN1Y2Nlc3NfbWVzc2FnZSxcbiAgICAgICAgcGhvbmVOdW1iZXIsXG4gICAgICAgIHN1Ym1pdF9vdHAsXG4gICAgICAgIHN1Ym1pdF9vdHBfc3VjY2VzcyxcbiAgICAgICAgc3VibWl0X290cF9mYWlsXG4gICAgfSA9IHN0YXRlLkFVVEhcblxuICAgIHJldHVybiB7XG4gICAgICAgIHRva2VuLFxuICAgICAgICBlcnJvcl9tZXNzYWdlLFxuICAgICAgICBzdWNjZXNzX21lc3NhZ2UsXG4gICAgICAgIHBob25lTnVtYmVyLFxuICAgICAgICBzdWJtaXRfb3RwLFxuICAgICAgICBzdWJtaXRfb3RwX3N1Y2Nlc3MsXG4gICAgICAgIHN1Ym1pdF9vdHBfZmFpbFxuICAgIH1cbn1cblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gKGRpc3BhdGNoKSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgc3VibWl0T1RQOiAobnVtYmVyLCBvdHAsIGNiKSA9PiBkaXNwYXRjaChzdWJtaXRPVFAobnVtYmVyLCBvdHAsIGNiKSksXG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpKE90cFZlcmlmeSk7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcblxuaW1wb3J0IHsgZ2V0VXNlclByb2ZpbGVXaXRoQXBwb2ludG1lbnRzIH0gZnJvbSAnLi4vLi4vYWN0aW9ucy9pbmRleC5qcydcblxuaW1wb3J0IFVzZXJBcHBvaW50bWVudHNWaWV3IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy91c2VyQXBwb2ludG1lbnRzL2luZGV4LmpzJ1xuXG5cbmNsYXNzIFVzZXJBcHBvaW50bWVudHMgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPFVzZXJBcHBvaW50bWVudHNWaWV3IHsuLi50aGlzLnByb3BzfSAvPlxuICAgICAgICApO1xuICAgIH1cbn1cblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHN0YXRlKSA9PiB7XG4gICAgY29uc3QgVVNFUiA9IHN0YXRlLlVTRVJcblxuICAgIHJldHVybiB7XG4gICAgICAgIFVTRVJcbiAgICB9XG59XG5cbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IChkaXNwYXRjaCkgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICAgIGdldFVzZXJQcm9maWxlV2l0aEFwcG9pbnRtZW50cyA6ICgpID0+IGRpc3BhdGNoKGdldFVzZXJQcm9maWxlV2l0aEFwcG9pbnRtZW50cygpKVxuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbWFwRGlzcGF0Y2hUb1Byb3BzKShVc2VyQXBwb2ludG1lbnRzKTtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG5pbXBvcnQgeyBzZW5kT1RQIH0gZnJvbSAnLi4vLi4vYWN0aW9ucy9pbmRleC5qcydcblxuaW1wb3J0IFVzZXJMb2dpblZpZXcgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9jb21tb25zL1VzZXJMb2dpbidcblxuXG5jbGFzcyBVc2VyTG9naW4gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgIH1cblxuICAgIHN0YXRpYyBjb250ZXh0VHlwZXMgPSB7XG4gICAgICAgIHJvdXRlcjogKCkgPT4gbnVsbFxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPFVzZXJMb2dpblZpZXcgey4uLnRoaXMucHJvcHN9IC8+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoc3RhdGUpID0+IHtcbiAgICBsZXQge1xuICAgICAgICB0b2tlbixcbiAgICAgICAgZXJyb3JfbWVzc2FnZSxcbiAgICAgICAgc3VjY2Vzc19tZXNzYWdlLFxuICAgICAgICBvdHBfcmVxdWVzdF9zZW50LFxuICAgICAgICBvdHBfcmVxdWVzdF9zdWNjZXNzLFxuICAgICAgICBvdHBfcmVxdWVzdF9mYWlsLFxuICAgICAgICBwaG9uZU51bWJlclxuICAgIH0gPSBzdGF0ZS5BVVRIXG5cbiAgICByZXR1cm4ge1xuICAgICAgICB0b2tlbixcbiAgICAgICAgZXJyb3JfbWVzc2FnZSxcbiAgICAgICAgc3VjY2Vzc19tZXNzYWdlLFxuICAgICAgICBvdHBfcmVxdWVzdF9zZW50LFxuICAgICAgICBvdHBfcmVxdWVzdF9zdWNjZXNzLFxuICAgICAgICBvdHBfcmVxdWVzdF9mYWlsLFxuICAgICAgICBwaG9uZU51bWJlclxuICAgIH1cbn1cblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gKGRpc3BhdGNoKSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgc2VuZE9UUDogKG51bWJlciwgY2IpID0+IGRpc3BhdGNoKHNlbmRPVFAobnVtYmVyLCBjYikpXG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpKFVzZXJMb2dpbik7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcblxuaW1wb3J0IHsgZ2V0VXNlclByb2ZpbGUgfSBmcm9tICcuLi8uLi9hY3Rpb25zL2luZGV4LmpzJ1xuXG5pbXBvcnQgVXNlclByb2ZpbGVWaWV3IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy91c2VyUHJvZmlsZS9pbmRleC5qcydcblxuXG5jbGFzcyBVc2VyUHJvZmlsZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8VXNlclByb2ZpbGVWaWV3IHsuLi50aGlzLnByb3BzfSAvPlxuICAgICAgICApO1xuICAgIH1cbn1cblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHN0YXRlKSA9PiB7XG4gICAgY29uc3QgVVNFUiA9IHN0YXRlLlVTRVJcblxuICAgIHJldHVybiB7XG4gICAgICAgIFVTRVJcbiAgICB9XG59XG5cbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IChkaXNwYXRjaCkgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICAgIGdldFVzZXJQcm9maWxlIDogKCkgPT4gZGlzcGF0Y2goZ2V0VXNlclByb2ZpbGUoKSlcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG1hcERpc3BhdGNoVG9Qcm9wcykoVXNlclByb2ZpbGUpO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cbmltcG9ydCB7IGdldFVzZXJQcm9maWxlV2l0aFRlc3RzIH0gZnJvbSAnLi4vLi4vYWN0aW9ucy9pbmRleC5qcydcblxuaW1wb3J0IFVzZXJSZXBvcnRzVmlldyBmcm9tICcuLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvdXNlclJlcG9ydHMvaW5kZXguanMnXG5cblxuY2xhc3MgVXNlclJlcG9ydHMgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPFVzZXJSZXBvcnRzVmlldyB7Li4udGhpcy5wcm9wc30gLz5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9IChzdGF0ZSkgPT4ge1xuICAgIGNvbnN0IFVTRVIgPSBzdGF0ZS5VU0VSXG5cbiAgICByZXR1cm4ge1xuICAgICAgICBVU0VSXG4gICAgfVxufVxuXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSAoZGlzcGF0Y2gpID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgICBnZXRVc2VyUHJvZmlsZVdpdGhUZXN0cyA6ICgpID0+IGRpc3BhdGNoKGdldFVzZXJQcm9maWxlV2l0aFRlc3RzKCkpXG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpKFVzZXJSZXBvcnRzKTtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG5pbXBvcnQgeyB9IGZyb20gJy4uLy4uL2FjdGlvbnMvaW5kZXguanMnXG5cbmltcG9ydCBVc2VyU2lnbnVwVmlldyBmcm9tICcuLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvdXNlclNpZ251cCdcblxuXG5jbGFzcyBVc2VyU2lnbnVwIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICB9XG5cbiAgICBzdGF0aWMgY29udGV4dFR5cGVzID0ge1xuICAgICAgICByb3V0ZXI6ICgpID0+IG51bGxcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxVc2VyU2lnbnVwVmlldyB7Li4udGhpcy5wcm9wc30gLz5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9IChzdGF0ZSkgPT4ge1xuICAgIGNvbnN0IFVTRVIgPSBzdGF0ZS5VU0VSXG5cbiAgICByZXR1cm4ge1xuICAgICAgICBVU0VSXG4gICAgfVxufVxuXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSAoZGlzcGF0Y2gpID0+IHtcbiAgICByZXR1cm4ge1xuXG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpKFVzZXJTaWdudXApO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cbmltcG9ydCB7IGdldExhYkJ5SWQgfSBmcm9tICcuLi8uLi9hY3Rpb25zL2luZGV4LmpzJ1xuXG5pbXBvcnQgQm9va2luZ1N1bW1hcnlWaWV3IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvZGlhZ25vc2lzL2Jvb2tpbmdTdW1tYXJ5L2luZGV4LmpzJ1xuXG5jbGFzcyBCb29raW5nU3VtbWFyeSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgfVxuXG4gICAgc3RhdGljIGNvbnRleHRUeXBlcyA9IHtcbiAgICAgICAgcm91dGVyOiAoKSA9PiBudWxsXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8Qm9va2luZ1N1bW1hcnlWaWV3IHsuLi50aGlzLnByb3BzfSAvPlxuICAgICAgICApO1xuICAgIH1cbn1cblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHN0YXRlKSA9PiB7XG5cbiAgICBjb25zdCB7XG4gICAgICAgIHNlbGVjdGVkQ3JpdGVyaWFzLFxuICAgIH0gPSBzdGF0ZS5TRUFSQ0hfQ1JJVEVSSUFfTEFCU1xuXG4gICAgbGV0IExBQlMgPSBzdGF0ZS5MQUJTXG5cbiAgICByZXR1cm4ge1xuICAgICAgICBzZWxlY3RlZENyaXRlcmlhcyxcbiAgICAgICAgTEFCU1xuICAgIH1cbn1cblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gKGRpc3BhdGNoKSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgZ2V0TGFiQnlJZDogKGxhYklkKSA9PiBkaXNwYXRjaChnZXRMYWJCeUlkKGxhYklkKSlcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpKEJvb2tpbmdTdW1tYXJ5KTtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG5pbXBvcnQgeyBnZXRMYWJCeUlkIH0gZnJvbSAnLi4vLi4vYWN0aW9ucy9pbmRleC5qcydcblxuaW1wb3J0IExhYlZpZXcgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9kaWFnbm9zaXMvbGFiL2luZGV4LmpzJ1xuXG5jbGFzcyBMYWIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgIH1cblxuICAgIHN0YXRpYyBsb2FkRGF0YShzdG9yZSwgbWF0Y2gpe1xuICAgICAgICByZXR1cm4gc3RvcmUuZGlzcGF0Y2goZ2V0TGFiQnlJZChtYXRjaC5wYXJhbXMuaWQpKVxuICAgIH1cblxuICAgIHN0YXRpYyBjb250ZXh0VHlwZXMgPSB7XG4gICAgICAgIHJvdXRlcjogKCkgPT4gbnVsbFxuICAgIH1cblxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgICB0aGlzLnByb3BzLmdldExhYkJ5SWQodGhpcy5wcm9wcy5tYXRjaC5wYXJhbXMuaWQpXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8TGFiVmlldyB7Li4udGhpcy5wcm9wc30gLz5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9IChzdGF0ZSkgPT4ge1xuXG4gICAgY29uc3Qge1xuICAgICAgICBzZWxlY3RlZExvY2F0aW9uLFxuICAgICAgICBzZWxlY3RlZENyaXRlcmlhcyxcbiAgICAgICAgZmlsdGVyQ3JpdGVyaWEsXG4gICAgICAgIExPQURFRF9TRUFSQ0hfQ1JJVEVSSUFfTEFCXG4gICAgfSA9IHN0YXRlLlNFQVJDSF9DUklURVJJQV9MQUJTXG5cbiAgICBsZXQgTEFCUyA9IHN0YXRlLkxBQlNcblxuICAgIHJldHVybiB7XG4gICAgICAgIHNlbGVjdGVkQ3JpdGVyaWFzLFxuICAgICAgICBMQUJTXG4gICAgfVxufVxuXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSAoZGlzcGF0Y2gpID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgICBnZXRMYWJCeUlkOiAobGFiSWQpID0+IGRpc3BhdGNoKGdldExhYkJ5SWQobGFiSWQpKVxuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbWFwRGlzcGF0Y2hUb1Byb3BzKShMYWIpO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cbmltcG9ydCB7IGdldExhYkJ5SWQgfSBmcm9tICcuLi8uLi9hY3Rpb25zL2luZGV4LmpzJ1xuXG5pbXBvcnQgUGF0aWVudERldGFpbHNWaWV3IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvZGlhZ25vc2lzL3BhdGllbnREZXRhaWxzL2luZGV4LmpzJ1xuXG5jbGFzcyBQYXRpZW50RGV0YWlscyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8UGF0aWVudERldGFpbHNWaWV3IHsuLi50aGlzLnByb3BzfSAvPlxuICAgICAgICApO1xuICAgIH1cbn1cblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHN0YXRlKSA9PiB7XG5cbiAgICBsZXQgTEFCUyA9IHN0YXRlLkxBQlNcblxuICAgIHJldHVybiB7XG4gICAgICAgIExBQlNcbiAgICB9XG59XG5cbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IChkaXNwYXRjaCkgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICAgIGdldExhYkJ5SWQgOiAobGFiSWQsIHRlc3RJZHMpID0+IGRpc3BhdGNoKGdldExhYkJ5SWQobGFiSWQsIHRlc3RJZHMpKVxuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbWFwRGlzcGF0Y2hUb1Byb3BzKShQYXRpZW50RGV0YWlscyk7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcblxuaW1wb3J0IHsgbG9hZExhYkNvbW1vbkNyaXRlcmlhcywgdG9nZ2xlRGlhZ25vc2lzQ3JpdGVyaWEsIGdldERpYWdub3Npc0NyaXRlcmlhUmVzdWx0cyB9IGZyb20gJy4uLy4uL2FjdGlvbnMvaW5kZXguanMnXG5pbXBvcnQgU2VhcmNoQ3JpdGVyaWFWaWV3IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvZGlhZ25vc2lzL3NlYXJjaENyaXRlcmlhL2luZGV4LmpzJ1xuXG5jbGFzcyBTZWFyY2hDcml0ZXJpYSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgfVxuXG4gICAgc3RhdGljIGxvYWREYXRhKHN0b3JlKXtcbiAgICAgICAgcmV0dXJuIHN0b3JlLmRpc3BhdGNoKGxvYWRMYWJDb21tb25Dcml0ZXJpYXMoKSlcbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgdGhpcy5wcm9wcy5sb2FkTGFiQ29tbW9uQ3JpdGVyaWFzKClcbiAgICB9XG5cbiAgICBzdGF0aWMgY29udGV4dFR5cGVzID0ge1xuICAgICAgICByb3V0ZXI6ICgpID0+IG51bGxcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8U2VhcmNoQ3JpdGVyaWFWaWV3IHsuLi50aGlzLnByb3BzfSAvPlxuICAgICAgICApXG4gICAgfVxufVxuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoc3RhdGUpID0+IHtcblxuICAgIGNvbnN0IHtcbiAgICAgICAgTE9BREVEX1NFQVJDSF9DUklURVJJQV9MQUIsXG4gICAgICAgIGNvbW1vbl90ZXN0cyxcbiAgICAgICAgY29tbW9uX2NvbmRpdGlvbnMsXG4gICAgICAgIHByZWZlcnJlZF9sYWJzLFxuICAgICAgICBzZWxlY3RlZENyaXRlcmlhcyxcbiAgICAgICAgc2VsZWN0ZWRMb2NhdGlvbixcbiAgICAgICAgZmlsdGVyQ3JpdGVyaWFcbiAgICB9ID0gc3RhdGUuU0VBUkNIX0NSSVRFUklBX0xBQlNcblxuICAgIHJldHVybiB7XG4gICAgICAgIExPQURFRF9TRUFSQ0hfQ1JJVEVSSUFfTEFCLFxuICAgICAgICBjb21tb25fdGVzdHMsXG4gICAgICAgIGNvbW1vbl9jb25kaXRpb25zLFxuICAgICAgICBwcmVmZXJyZWRfbGFicyxcbiAgICAgICAgc2VsZWN0ZWRDcml0ZXJpYXMsXG4gICAgICAgIHNlbGVjdGVkTG9jYXRpb24sXG4gICAgICAgIGZpbHRlckNyaXRlcmlhXG4gICAgfVxufVxuXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSAoZGlzcGF0Y2gpID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgICBsb2FkTGFiQ29tbW9uQ3JpdGVyaWFzOiAoKSA9PiBkaXNwYXRjaChsb2FkTGFiQ29tbW9uQ3JpdGVyaWFzKCkpLFxuICAgICAgICB0b2dnbGVEaWFnbm9zaXNDcml0ZXJpYTogKHR5cGUsIGNyaXRlcmlhKSA9PiBkaXNwYXRjaCh0b2dnbGVEaWFnbm9zaXNDcml0ZXJpYSh0eXBlLCBjcml0ZXJpYSkpLFxuICAgICAgICBnZXREaWFnbm9zaXNDcml0ZXJpYVJlc3VsdHM6IChzZWFyY2hTdHJpbmcsIGNhbGxiYWNrKSA9PiBkaXNwYXRjaChnZXREaWFnbm9zaXNDcml0ZXJpYVJlc3VsdHMoc2VhcmNoU3RyaW5nLCBjYWxsYmFjaykpXG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpKFNlYXJjaENyaXRlcmlhKTtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG5pbXBvcnQgeyBnZXRMYWJzLCB0b2dnbGVEaWFnbm9zaXNDcml0ZXJpYSwgZ2V0RGlhZ25vc2lzQ3JpdGVyaWFSZXN1bHRzIH0gZnJvbSAnLi4vLi4vYWN0aW9ucy9pbmRleC5qcydcblxuaW1wb3J0IFNlYXJjaFJlc3VsdHNWaWV3IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvZGlhZ25vc2lzL3NlYXJjaFJlc3VsdHMvaW5kZXguanMnXG5cbmNsYXNzIFNlYXJjaFJlc3VsdHMgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgICAgICB0aGlzLnN0YXRlID0ge1xuXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdGF0aWMgY29udGV4dFR5cGVzID0ge1xuICAgICAgICByb3V0ZXI6ICgpID0+IG51bGxcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxTZWFyY2hSZXN1bHRzVmlldyB7Li4udGhpcy5wcm9wc30gLz5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9IChzdGF0ZSkgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgICAgc2VsZWN0ZWRMb2NhdGlvbixcbiAgICAgICAgc2VsZWN0ZWRDcml0ZXJpYXMsXG4gICAgICAgIGZpbHRlckNyaXRlcmlhLFxuICAgICAgICBMT0FERURfU0VBUkNIX0NSSVRFUklBX0xBQlxuICAgIH0gPSBzdGF0ZS5TRUFSQ0hfQ1JJVEVSSUFfTEFCU1xuXG4gICAgY29uc3QgTEFCUyA9IHN0YXRlLkxBQlNcbiAgICBjb25zdCB7IGxhYkxpc3QsIExPQURFRF9MQUJTX1NFQVJDSCB9ID0gc3RhdGUuTEFCX1NFQVJDSFxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgc2VsZWN0ZWRMb2NhdGlvbixcbiAgICAgICAgc2VsZWN0ZWRDcml0ZXJpYXMsXG4gICAgICAgIGZpbHRlckNyaXRlcmlhLFxuICAgICAgICBMT0FERURfU0VBUkNIX0NSSVRFUklBX0xBQixcbiAgICAgICAgTEFCUyxcbiAgICAgICAgbGFiTGlzdCwgTE9BREVEX0xBQlNfU0VBUkNIXG4gICAgfVxuXG59XG5cbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IChkaXNwYXRjaCkgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICAgIGdldExhYnM6IChzZWFyY2hTdGF0ZSwgZmlsdGVyQ3JpdGVyaWEsIG1lcmdlU3RhdGUpID0+IGRpc3BhdGNoKGdldExhYnMoc2VhcmNoU3RhdGUsIGZpbHRlckNyaXRlcmlhLCBtZXJnZVN0YXRlKSksXG4gICAgICAgIHRvZ2dsZURpYWdub3Npc0NyaXRlcmlhOiAodHlwZSwgY3JpdGVyaWEpID0+IGRpc3BhdGNoKHRvZ2dsZURpYWdub3Npc0NyaXRlcmlhKHR5cGUsIGNyaXRlcmlhKSksXG4gICAgICAgIGdldERpYWdub3Npc0NyaXRlcmlhUmVzdWx0czogKHNlYXJjaFN0cmluZywgY2FsbGJhY2spID0+IGRpc3BhdGNoKGdldERpYWdub3Npc0NyaXRlcmlhUmVzdWx0cyhzZWFyY2hTdHJpbmcsIGNhbGxiYWNrKSlcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpKFNlYXJjaFJlc3VsdHMpO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cbmltcG9ydCB7IGdldExhYkJ5SWQsIHRvZ2dsZURpYWdub3Npc0NyaXRlcmlhIH0gZnJvbSAnLi4vLi4vYWN0aW9ucy9pbmRleC5qcydcblxuaW1wb3J0IFRlc3RTZWxlY3RvclZpZXcgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9kaWFnbm9zaXMvdGVzdFNlbGVjdG9yJ1xuXG5jbGFzcyBUZXN0U2VsZWN0b3IgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgIH1cblxuICAgIHN0YXRpYyBjb250ZXh0VHlwZXMgPSB7XG4gICAgICAgIHJvdXRlcjogKCkgPT4gbnVsbFxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPFRlc3RTZWxlY3RvclZpZXcgey4uLnRoaXMucHJvcHN9IC8+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoc3RhdGUpID0+IHtcblxuICAgIGNvbnN0IHtcbiAgICAgICAgc2VsZWN0ZWRMb2NhdGlvbixcbiAgICAgICAgc2VsZWN0ZWRDcml0ZXJpYXMsXG4gICAgICAgIGZpbHRlckNyaXRlcmlhLFxuICAgICAgICBMT0FERURfU0VBUkNIX0NSSVRFUklBX0xBQlxuICAgIH0gPSBzdGF0ZS5TRUFSQ0hfQ1JJVEVSSUFfTEFCU1xuXG4gICAgbGV0IExBQlMgPSBzdGF0ZS5MQUJTXG5cbiAgICByZXR1cm4ge1xuICAgICAgICBzZWxlY3RlZENyaXRlcmlhcyxcbiAgICAgICAgTEFCU1xuICAgIH1cbn1cblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gKGRpc3BhdGNoKSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdG9nZ2xlRGlhZ25vc2lzQ3JpdGVyaWE6ICh0eXBlLCBjcml0ZXJpYSkgPT4gZGlzcGF0Y2godG9nZ2xlRGlhZ25vc2lzQ3JpdGVyaWEodHlwZSwgY3JpdGVyaWEpKSxcbiAgICAgICAgZ2V0TGFiQnlJZDogKGxhYklkKSA9PiBkaXNwYXRjaChnZXRMYWJCeUlkKGxhYklkKSlcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG1hcERpc3BhdGNoVG9Qcm9wcykoVGVzdFNlbGVjdG9yKTtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG5pbXBvcnQgeyBnZXREb2N0b3JCeUlkLCBnZXRUaW1lU2xvdHMgfSBmcm9tICcuLi8uLi9hY3Rpb25zL2luZGV4LmpzJ1xuXG5pbXBvcnQgQXBwb2ludG1lbnRTbG90VmlldyBmcm9tICcuLi8uLi9jb21wb25lbnRzL29wZC9hcHBvaW50bWVudFNsb3QvaW5kZXguanMnXG5cbmNsYXNzIEFwcG9pbnRtZW50U2xvdCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgfVxuXG4gICAgc3RhdGljIGxvYWREYXRhKHN0b3JlLCBtYXRjaCkge1xuICAgICAgICByZXR1cm4gc3RvcmUuZGlzcGF0Y2goZ2V0RG9jdG9yQnlJZChtYXRjaC5wYXJhbXMuaWQpKVxuICAgIH1cblxuICAgIHN0YXRpYyBjb250ZXh0VHlwZXMgPSB7XG4gICAgICAgIHJvdXRlcjogKCkgPT4gbnVsbFxuICAgIH1cblxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgICB0aGlzLnByb3BzLmdldERvY3RvckJ5SWQodGhpcy5wcm9wcy5tYXRjaC5wYXJhbXMuaWQpXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8QXBwb2ludG1lbnRTbG90VmlldyB7Li4udGhpcy5wcm9wc30gLz5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9IChzdGF0ZSkgPT4ge1xuXG4gICAgbGV0IERPQ1RPUlMgPSBzdGF0ZS5ET0NUT1JTXG5cbiAgICByZXR1cm4ge1xuICAgICAgICBET0NUT1JTXG4gICAgfVxufVxuXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSAoZGlzcGF0Y2gpID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgICBnZXREb2N0b3JCeUlkOiAoZG9jdG9ySWQpID0+IGRpc3BhdGNoKGdldERvY3RvckJ5SWQoZG9jdG9ySWQpKSxcbiAgICAgICAgZ2V0VGltZVNsb3RzOiAoZG9jdG9ySWQsIGNsaW5pY0lkLCBjYWxsYmFjaykgPT4gZGlzcGF0Y2goZ2V0VGltZVNsb3RzKGRvY3RvcklkLCBjbGluaWNJZCwgY2FsbGJhY2spKVxuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbWFwRGlzcGF0Y2hUb1Byb3BzKShBcHBvaW50bWVudFNsb3QpO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cbmltcG9ydCB7IH0gZnJvbSAnLi4vLi4vYWN0aW9ucy9pbmRleC5qcydcblxuaW1wb3J0IEJvb2tpbmdWaWV3IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvb3BkL2Jvb2tpbmcvQm9va2luZ1ZpZXcuanMnXG5cbmNsYXNzIEJvb2tpbmcgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPEJvb2tpbmdWaWV3IHsuLi50aGlzLnByb3BzfSAvPlxuICAgICAgICApO1xuICAgIH1cbn1cblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHN0YXRlKSA9PiB7XG5cbiAgICByZXR1cm4ge1xuXG4gICAgfVxufVxuXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSAoZGlzcGF0Y2gpID0+IHtcbiAgICByZXR1cm4ge1xuXG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpKEJvb2tpbmcpO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cbmltcG9ydCB7IGdldERvY3RvckJ5SWQgfSBmcm9tICcuLi8uLi9hY3Rpb25zL2luZGV4LmpzJ1xuXG5pbXBvcnQgQ2xpbmljTGlzdFZpZXcgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9vcGQvY2xpbmljTGlzdC9pbmRleC5qcydcblxuY2xhc3MgQ2xpbmljTGlzdCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8Q2xpbmljTGlzdFZpZXcgey4uLnRoaXMucHJvcHN9IC8+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoc3RhdGUpID0+IHtcblxuICAgIGxldCBET0NUT1JTID0gc3RhdGUuRE9DVE9SU1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgRE9DVE9SU1xuICAgIH1cbn1cblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gKGRpc3BhdGNoKSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgZ2V0RG9jdG9yQnlJZCA6IChkb2N0b3JJZCkgPT4gZGlzcGF0Y2goZ2V0RG9jdG9yQnlJZChkb2N0b3JJZCkpXG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpKENsaW5pY0xpc3QpO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cbmltcG9ydCB7IGdldENyaXRlcmlhUmVzdWx0cywgdG9nZ2xlQ3JpdGVyaWEgfSBmcm9tICcuLi8uLi9hY3Rpb25zL2luZGV4LmpzJ1xuaW1wb3J0IENyaXRlcmlhU2VhcmNoVmlldyBmcm9tICcuLi8uLi9jb21wb25lbnRzL29wZC9jcml0ZXJpYVNlYXJjaC9pbmRleC5qcydcblxuY2xhc3MgQ3JpdGVyaWFTZWFyY2ggZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPENyaXRlcmlhU2VhcmNoVmlld1xuICAgICAgICAgICAgICAgIHsgLi4udGhpcy5wcm9wcyB9XG4gICAgICAgICAgICAvPlxuICAgICAgICApO1xuICAgIH1cbn1cblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHN0YXRlKSA9PiB7XG5cbiAgICByZXR1cm4ge1xuXG4gICAgfVxufVxuXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSAoZGlzcGF0Y2gpID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgICBnZXRDcml0ZXJpYVJlc3VsdHMgOiAoc2VhcmNoU3RyaW5nLGNiKSA9PiBkaXNwYXRjaChnZXRDcml0ZXJpYVJlc3VsdHMoc2VhcmNoU3RyaW5nLGNiKSksXG4gICAgICAgIHRvZ2dsZUNyaXRlcmlhIDogKGNyaXRlcmlhKSA9PiBkaXNwYXRjaCh0b2dnbGVDcml0ZXJpYShjcml0ZXJpYSkpXG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpKENyaXRlcmlhU2VhcmNoKTtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG5pbXBvcnQgeyBnZXREb2N0b3JCeUlkIH0gZnJvbSAnLi4vLi4vYWN0aW9ucy9pbmRleC5qcydcblxuaW1wb3J0IERvY3RvclByb2ZpbGVWaWV3IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvb3BkL2RvY3RvclByb2ZpbGUvaW5kZXguanMnXG5cbmNsYXNzIERvY3RvclByb2ZpbGUgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgIH1cblxuICAgIHN0YXRpYyBsb2FkRGF0YShzdG9yZSwgbWF0Y2gpIHtcbiAgICAgICAgcmV0dXJuIHN0b3JlLmRpc3BhdGNoKGdldERvY3RvckJ5SWQobWF0Y2gucGFyYW1zLmlkKSlcbiAgICB9XG5cbiAgICBzdGF0aWMgY29udGV4dFR5cGVzID0ge1xuICAgICAgICByb3V0ZXI6ICgpID0+IG51bGxcbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgdGhpcy5wcm9wcy5nZXREb2N0b3JCeUlkKHRoaXMucHJvcHMubWF0Y2gucGFyYW1zLmlkKVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPERvY3RvclByb2ZpbGVWaWV3IHsuLi50aGlzLnByb3BzfSAvPlxuICAgICAgICApO1xuICAgIH1cbn1cblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHN0YXRlKSA9PiB7XG5cbiAgICBsZXQgRE9DVE9SUyA9IHN0YXRlLkRPQ1RPUlNcblxuICAgIHJldHVybiB7XG4gICAgICAgIERPQ1RPUlNcbiAgICB9XG59XG5cbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IChkaXNwYXRjaCkgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICAgIGdldERvY3RvckJ5SWQ6IChkb2N0b3JJZCkgPT4gZGlzcGF0Y2goZ2V0RG9jdG9yQnlJZChkb2N0b3JJZCkpXG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpKERvY3RvclByb2ZpbGUpO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cbmltcG9ydCB7IHNlbGVjdExvY2F0aW9uIH0gZnJvbSAnLi4vLi4vYWN0aW9ucy9pbmRleC5qcydcbmltcG9ydCBMb2NhdGlvblNlYXJjaFZpZXcgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9vcGQvbG9jYXRpb25TZWFyY2gvaW5kZXguanMnXG5cbmNsYXNzIExvY2F0aW9uU2VhcmNoIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICB9XG5cbiAgICBzdGF0aWMgY29udGV4dFR5cGVzID0ge1xuICAgICAgICByb3V0ZXI6ICgpID0+IG51bGxcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxMb2NhdGlvblNlYXJjaFZpZXcgey4uLnRoaXMucHJvcHN9IC8+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoc3RhdGUpID0+IHtcbiAgICBjb25zdCB7XG4gICAgICAgIHNlbGVjdGVkTG9jYXRpb25cbiAgICB9ID0gc3RhdGUuU0VBUkNIX0NSSVRFUklBX09QRFxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgc2VsZWN0ZWRMb2NhdGlvblxuICAgIH1cbn1cblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gKGRpc3BhdGNoKSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgc2VsZWN0TG9jYXRpb246IChsb2NhdGlvbikgPT4gZGlzcGF0Y2goc2VsZWN0TG9jYXRpb24obG9jYXRpb24pKVxuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbWFwRGlzcGF0Y2hUb1Byb3BzKShMb2NhdGlvblNlYXJjaCk7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcblxuaW1wb3J0IHsgZ2V0RG9jdG9yQnlJZCB9IGZyb20gJy4uLy4uL2FjdGlvbnMvaW5kZXguanMnXG5cbmltcG9ydCBQYXRpZW50RGV0YWlsc1ZpZXcgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9vcGQvcGF0aWVudERldGFpbHMvaW5kZXguanMnXG5cbmNsYXNzIFBhdGllbnREZXRhaWxzIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxQYXRpZW50RGV0YWlsc1ZpZXcgey4uLnRoaXMucHJvcHN9IC8+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoc3RhdGUpID0+IHtcblxuICAgIGxldCBET0NUT1JTID0gc3RhdGUuRE9DVE9SU1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgRE9DVE9SU1xuICAgIH1cbn1cblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gKGRpc3BhdGNoKSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgZ2V0RG9jdG9yQnlJZCA6IChkb2N0b3JJZCkgPT4gZGlzcGF0Y2goZ2V0RG9jdG9yQnlJZChkb2N0b3JJZCkpXG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpKFBhdGllbnREZXRhaWxzKTtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG5pbXBvcnQgeyB9IGZyb20gJy4uLy4uL2FjdGlvbnMvaW5kZXguanMnXG5cbmltcG9ydCBQYXltZW50VmlldyBmcm9tICcuLi8uLi9jb21wb25lbnRzL29wZC9wYXltZW50L1BheW1lbnRWaWV3LmpzJ1xuXG5jbGFzcyBQYXltZW50IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxQYXltZW50VmlldyB7Li4udGhpcy5wcm9wc30gLz5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9IChzdGF0ZSkgPT4ge1xuXG4gICAgcmV0dXJuIHtcblxuICAgIH1cbn1cblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gKGRpc3BhdGNoKSA9PiB7XG4gICAgcmV0dXJuIHtcblxuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbWFwRGlzcGF0Y2hUb1Byb3BzKShQYXltZW50KTtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG5pbXBvcnQgeyBnZXRPUERDcml0ZXJpYVJlc3VsdHMsIHRvZ2dsZU9QRENyaXRlcmlhLCBsb2FkT1BEQ29tbW9uQ3JpdGVyaWEgfSBmcm9tICcuLi8uLi9hY3Rpb25zL2luZGV4LmpzJ1xuaW1wb3J0IFNlYXJjaENyaXRlcmlhVmlldyBmcm9tICcuLi8uLi9jb21wb25lbnRzL29wZC9zZWFyY2hDcml0ZXJpYS9pbmRleC5qcydcblxuY2xhc3MgU2VhcmNoQ3JpdGVyaWEgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgIH1cblxuICAgIHN0YXRpYyBsb2FkRGF0YShzdG9yZSkge1xuICAgICAgICByZXR1cm4gc3RvcmUuZGlzcGF0Y2gobG9hZE9QRENvbW1vbkNyaXRlcmlhKCkpXG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIHRoaXMucHJvcHMubG9hZE9QRENvbW1vbkNyaXRlcmlhKClcbiAgICB9XG5cbiAgICBzdGF0aWMgY29udGV4dFR5cGVzID0ge1xuICAgICAgICByb3V0ZXI6ICgpID0+IG51bGxcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxTZWFyY2hDcml0ZXJpYVZpZXcgey4uLnRoaXMucHJvcHN9IC8+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoc3RhdGUpID0+IHtcblxuICAgIGNvbnN0IHtcbiAgICAgICAgTE9BREVEX1NFQVJDSF9DUklURVJJQV9PUEQsXG4gICAgICAgIHNwZWNpYWxpemF0aW9ucyxcbiAgICAgICAgY29uZGl0aW9ucyxcbiAgICAgICAgc2VsZWN0ZWRDcml0ZXJpYXMsXG4gICAgICAgIHNlbGVjdGVkTG9jYXRpb24sXG4gICAgICAgIGZpbHRlckNyaXRlcmlhXG4gICAgfSA9IHN0YXRlLlNFQVJDSF9DUklURVJJQV9PUERcblxuICAgIHJldHVybiB7XG4gICAgICAgIExPQURFRF9TRUFSQ0hfQ1JJVEVSSUFfT1BELFxuICAgICAgICBzcGVjaWFsaXphdGlvbnMsXG4gICAgICAgIGNvbmRpdGlvbnMsXG4gICAgICAgIHNlbGVjdGVkQ3JpdGVyaWFzLFxuICAgICAgICBzZWxlY3RlZExvY2F0aW9uLFxuICAgICAgICBmaWx0ZXJDcml0ZXJpYVxuICAgIH1cbn1cblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gKGRpc3BhdGNoKSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgbG9hZE9QRENvbW1vbkNyaXRlcmlhOiAoKSA9PiBkaXNwYXRjaChsb2FkT1BEQ29tbW9uQ3JpdGVyaWEoKSksXG4gICAgICAgIHRvZ2dsZU9QRENyaXRlcmlhOiAodHlwZSwgY3JpdGVyaWEpID0+IGRpc3BhdGNoKHRvZ2dsZU9QRENyaXRlcmlhKHR5cGUsIGNyaXRlcmlhKSksXG4gICAgICAgIGdldE9QRENyaXRlcmlhUmVzdWx0czogKHNlYXJjaFN0cmluZywgY2FsbGJhY2spID0+IGRpc3BhdGNoKGdldE9QRENyaXRlcmlhUmVzdWx0cyhzZWFyY2hTdHJpbmcsIGNhbGxiYWNrKSlcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG1hcERpc3BhdGNoVG9Qcm9wcykoU2VhcmNoQ3JpdGVyaWEpO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cbmltcG9ydCB7IGdldERvY3RvcnMsIGdldE9QRENyaXRlcmlhUmVzdWx0cywgdG9nZ2xlT1BEQ3JpdGVyaWEgfSBmcm9tICcuLi8uLi9hY3Rpb25zL2luZGV4LmpzJ1xuXG5pbXBvcnQgU2VhcmNoUmVzdWx0c1ZpZXcgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9vcGQvc2VhcmNoUmVzdWx0cy9pbmRleC5qcydcblxuY2xhc3MgU2VhcmNoUmVzdWx0cyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG5cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN0YXRpYyBjb250ZXh0VHlwZXMgPSB7XG4gICAgICAgIHJvdXRlcjogKCkgPT4gbnVsbFxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPFNlYXJjaFJlc3VsdHNWaWV3IHsuLi50aGlzLnByb3BzfSAvPlxuICAgICAgICApXG4gICAgfVxufVxuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoc3RhdGUpID0+IHtcblxuICAgIGNvbnN0IHtcbiAgICAgICAgTE9BREVEX1NFQVJDSF9DUklURVJJQV9PUEQsXG4gICAgICAgIHNlbGVjdGVkQ3JpdGVyaWFzLFxuICAgICAgICBzZWxlY3RlZExvY2F0aW9uLFxuICAgICAgICBmaWx0ZXJDcml0ZXJpYVxuICAgIH0gPSBzdGF0ZS5TRUFSQ0hfQ1JJVEVSSUFfT1BEXG5cbiAgICBsZXQgRE9DVE9SUyA9IHN0YXRlLkRPQ1RPUlNcbiAgICBsZXQgeyBkb2N0b3JMaXN0LCBMT0FERURfRE9DVE9SX1NFQVJDSCB9ID0gc3RhdGUuRE9DVE9SX1NFQVJDSFxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgRE9DVE9SUywgZG9jdG9yTGlzdCwgTE9BREVEX0RPQ1RPUl9TRUFSQ0gsXG4gICAgICAgIExPQURFRF9TRUFSQ0hfQ1JJVEVSSUFfT1BELFxuICAgICAgICBzZWxlY3RlZENyaXRlcmlhcyxcbiAgICAgICAgc2VsZWN0ZWRMb2NhdGlvbixcbiAgICAgICAgZmlsdGVyQ3JpdGVyaWFcbiAgICB9XG59XG5cbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IChkaXNwYXRjaCkgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICAgIGxvYWRPUERDb21tb25Dcml0ZXJpYTogKCkgPT4gZGlzcGF0Y2gobG9hZE9QRENvbW1vbkNyaXRlcmlhKCkpLFxuICAgICAgICB0b2dnbGVPUERDcml0ZXJpYTogKHR5cGUsIGNyaXRlcmlhKSA9PiBkaXNwYXRjaCh0b2dnbGVPUERDcml0ZXJpYSh0eXBlLCBjcml0ZXJpYSkpLFxuICAgICAgICBnZXREb2N0b3JzOiAoc2VhcmNoU3RhdGUsIGZpbHRlckNyaXRlcmlhLCBtZXJnZVN0YXRlKSA9PiBkaXNwYXRjaChnZXREb2N0b3JzKHNlYXJjaFN0YXRlLCBmaWx0ZXJDcml0ZXJpYSwgbWVyZ2VTdGF0ZSkpXG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbWFwRGlzcGF0Y2hUb1Byb3BzKShTZWFyY2hSZXN1bHRzKTtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG5pbXBvcnQgeyBzZXRPUERGaWx0ZXJzIH0gZnJvbSAnLi4vLi4vYWN0aW9ucy9pbmRleC5qcydcblxuaW1wb3J0IFNlYXJjaFJlc3VsdHNGaWx0ZXJWaWV3IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvb3BkL3NlYXJjaFJlc3VsdHNGaWx0ZXIvaW5kZXguanMnXG5cbmNsYXNzIFNlYXJjaFJlc3VsdHNGaWx0ZXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPFNlYXJjaFJlc3VsdHNGaWx0ZXJWaWV3IHsuLi50aGlzLnByb3BzfS8+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoc3RhdGUpID0+IHtcblxuICAgIGNvbnN0IHtcbiAgICAgICAgZmlsdGVyQ3JpdGVyaWFcbiAgICB9ID0gc3RhdGUuU0VBUkNIX0NSSVRFUklBX09QRFxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgZmlsdGVyQ3JpdGVyaWFcbiAgICB9XG59XG5cbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IChkaXNwYXRjaCkgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICAgIHNldE9QREZpbHRlcnMgOiAoZmlsdGVyRGF0YSkgPT4gZGlzcGF0Y2goc2V0T1BERmlsdGVycyhmaWx0ZXJEYXRhKSlcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG1hcERpc3BhdGNoVG9Qcm9wcykoU2VhcmNoUmVzdWx0c0ZpbHRlcik7XG4iLCJpbXBvcnQgTkFWSUdBVEUgZnJvbSAnLi9uYXZpZ2F0ZSdcblxuZXhwb3J0IGRlZmF1bHQgTkFWSUdBVEUiLCJjb25zdCBOQVZJR0FURSA9IHtcbiAgICBuYXZpZ2F0ZVRvIDogKHdoZXJlKSA9PiB7XG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gd2hlcmVcbiAgICB9LFxuXG4gICAgcmVmcmVzaEFwcG9pbnRtZW50U3RhdGUgOiAocHJvcHMpID0+IHtcbiAgICAgICAgbGV0IG5vQXBwb2ludG1lbnRGb3VuZCA9IHByb3BzLnVwY29taW5nLmxlbmd0aCA9PSAwICYmIHByb3BzLnByZXZpb3VzLmxlbmd0aCA9PSAwXG4gICAgICAgIFxuICAgICAgICBpZihwcm9wcy5oaXN0b3J5LmFjdGlvbiA9PT0gJ1BVU0gnIHx8IG5vQXBwb2ludG1lbnRGb3VuZCl7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE5BVklHQVRFIiwiaW1wb3J0IFNUT1JBR0UgZnJvbSAnLi9zdG9yYWdlJ1xuXG5leHBvcnQgZGVmYXVsdCBTVE9SQUdFIiwiaW1wb3J0IENvb2tpZXMgZnJvbSAndW5pdmVyc2FsLWNvb2tpZSc7XG5jb25zdCBjb29raWVzID0gbmV3IENvb2tpZXMoKTtcblxuY29uc3QgU1RPUkFHRSA9IHtcbiAgICBzZXRBdXRoVG9rZW46ICh0b2tlbikgPT4ge1xuICAgICAgICBjb29raWVzLnNldCgndG9rZW4nLCB0b2tlbilcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh0cnVlKVxuICAgIH0sXG4gICAgZ2V0QXV0aFRva2VuOiAoKSA9PiB7XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoY29va2llcy5nZXQoJ3Rva2VuJykpXG4gICAgfSxcbiAgICBjaGVja0F1dGg6ICgpID0+IHtcbiAgICAgICAgcmV0dXJuICEhY29va2llcy5nZXQoJ3Rva2VuJylcbiAgICB9LFxuICAgIGRlbGV0ZUF1dGg6ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShjb29raWVzLnJlbW92ZSgndG9rZW4nKSlcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFNUT1JBR0UiLCJpbXBvcnQgeyBTRU5EX09UUF9SRVFVRVNULCBTRU5EX09UUF9TVUNDRVNTLCBTRU5EX09UUF9GQUlMLCBTVUJNSVRfT1RQX1JFUVVFU1QsIFNVQk1JVF9PVFBfU1VDQ0VTUywgU1VCTUlUX09UUF9GQUlMIH0gZnJvbSAnLi4vLi4vY29uc3RhbnRzL3R5cGVzJztcblxuY29uc3QgZGVmYXVsdFN0YXRlID0ge1xuICAgIHRva2VuOiBudWxsLFxuICAgIGVycm9yX21lc3NhZ2U6IFwiXCIsXG4gICAgc3VjY2Vzc19tZXNzYWdlOiBcIlwiLFxuICAgIG90cF9yZXF1ZXN0X3NlbnQ6IGZhbHNlLFxuICAgIG90cF9yZXF1ZXN0X3N1Y2Nlc3M6IGZhbHNlLFxuICAgIG90cF9yZXF1ZXN0X2ZhaWw6IGZhbHNlLFxuICAgIHBob25lTnVtYmVyOiBcIlwiLFxuICAgIHN1Ym1pdF9vdHA6ZmFsc2UsXG4gICAgc3VibWl0X290cF9zdWNjZXNzOmZhbHNlLFxuICAgIHN1Ym1pdF9vdHBfZmFpbDpmYWxzZVxufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoc3RhdGUgPSBkZWZhdWx0U3RhdGUsIGFjdGlvbikge1xuXG4gICAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgICAgICBjYXNlIFNFTkRfT1RQX1JFUVVFU1Q6IHtcbiAgICAgICAgICAgIGxldCBuZXdTdGF0ZSA9IHsgLi4uZGVmYXVsdFN0YXRlIH1cblxuICAgICAgICAgICAgbmV3U3RhdGUub3RwX3JlcXVlc3Rfc2VudCA9IHRydWVcbiAgICAgICAgICAgIG5ld1N0YXRlLnBob25lTnVtYmVyID0gYWN0aW9uLnBheWxvYWQucGhvbmVOdW1iZXJcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgcmV0dXJuIG5ld1N0YXRlXG4gICAgICAgIH1cblxuICAgICAgICBjYXNlIFNFTkRfT1RQX1NVQ0NFU1M6IHtcbiAgICAgICAgICAgIGxldCBuZXdTdGF0ZSA9IHsgLi4uc3RhdGUgfVxuICAgICAgICAgICAgbmV3U3RhdGUub3RwX3JlcXVlc3Rfc2VudCA9IGZhbHNlXG4gICAgICAgICAgICBuZXdTdGF0ZS5vdHBfcmVxdWVzdF9zdWNjZXNzID0gdHJ1ZVxuICAgICAgICAgICAgbmV3U3RhdGUub3RwX3JlcXVlc3RfZmFpbCA9IGZhbHNlXG4gICAgICAgICAgICBuZXdTdGF0ZS5zdWNjZXNzX21lc3NhZ2UgPSBhY3Rpb24ucGF5bG9hZC5zdWNjZXNzX21lc3NhZ2VcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgcmV0dXJuIG5ld1N0YXRlXG4gICAgICAgIH1cblxuICAgICAgICBjYXNlIFNFTkRfT1RQX0ZBSUw6IHtcbiAgICAgICAgICAgIGxldCBuZXdTdGF0ZSA9IHsgLi4uc3RhdGUgfVxuICAgICAgICAgICAgbmV3U3RhdGUub3RwX3JlcXVlc3Rfc2VudCA9IGZhbHNlXG4gICAgICAgICAgICBuZXdTdGF0ZS5vdHBfcmVxdWVzdF9mYWlsID0gdHJ1ZVxuICAgICAgICAgICAgbmV3U3RhdGUub3RwX3JlcXVlc3Rfc3VjY2VzcyA9IGZhbHNlXG4gICAgICAgICAgICBuZXdTdGF0ZS5lcnJvcl9tZXNzYWdlID0gYWN0aW9uLnBheWxvYWQuZXJyb3JfbWVzc2FnZVxuICAgICAgICAgICAgXG4gICAgICAgICAgICByZXR1cm4gbmV3U3RhdGVcbiAgICAgICAgfVxuXG4gICAgICAgIGNhc2UgU1VCTUlUX09UUF9SRVFVRVNUOiB7XG4gICAgICAgICAgICBsZXQgbmV3U3RhdGUgPSB7IC4uLnN0YXRlIH1cbiAgICAgICAgICAgIG5ld1N0YXRlLnN1Ym1pdF9vdHAgPSB0cnVlXG4gICAgICAgICAgICByZXR1cm4gbmV3U3RhdGVcbiAgICAgICAgfVxuXG4gICAgICAgIGNhc2UgU1VCTUlUX09UUF9TVUNDRVNTOiB7XG4gICAgICAgICAgICBsZXQgbmV3U3RhdGUgPSB7IC4uLnN0YXRlIH1cbiAgICAgICAgICAgIG5ld1N0YXRlLnN1Ym1pdF9vdHAgPSBmYWxzZVxuICAgICAgICAgICAgbmV3U3RhdGUuc3VibWl0X290cF9mYWlsID0gZmFsc2VcbiAgICAgICAgICAgIG5ld1N0YXRlLnN1Ym1pdF9vdHBfc3VjY2VzcyA9IHRydWVcbiAgICAgICAgICAgIG5ld1N0YXRlLnRva2VuID0gYWN0aW9uLnBheWxvYWQudG9rZW5cbiAgICAgICAgICAgIHJldHVybiBuZXdTdGF0ZVxuICAgICAgICB9XG5cbiAgICAgICAgY2FzZSBTVUJNSVRfT1RQX0ZBSUw6IHtcbiAgICAgICAgICAgIGxldCBuZXdTdGF0ZSA9IHsgLi4uc3RhdGUgfVxuICAgICAgICAgICAgbmV3U3RhdGUuc3VibWl0X290cCA9IGZhbHNlXG4gICAgICAgICAgICBuZXdTdGF0ZS5zdWJtaXRfb3RwX2ZhaWwgPSB0cnVlXG4gICAgICAgICAgICBuZXdTdGF0ZS5zdWJtaXRfb3RwX3N1Y2Nlc3MgPSBmYWxzZVxuICAgICAgICAgICAgbmV3U3RhdGUuZXJyb3JfbWVzc2FnZSA9IGFjdGlvbi5wYXlsb2FkLmVycm9yX21lc3NhZ2VcbiAgICAgICAgICAgIHJldHVybiBuZXdTdGF0ZVxuICAgICAgICB9XG5cbiAgICB9XG4gICAgcmV0dXJuIHN0YXRlXG59IiwiaW1wb3J0IHsgQVBQRU5EX1VTRVJfUFJPRklMRVMgfSBmcm9tICcuLi8uLi9jb25zdGFudHMvdHlwZXMnO1xuXG5jb25zdCBkZWZhdWx0U3RhdGUgPSB7XG4gICAgcHJvZmlsZXM6IHt9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChzdGF0ZSA9IGRlZmF1bHRTdGF0ZSwgYWN0aW9uKSB7XG5cbiAgICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgICAgIGNhc2UgQVBQRU5EX1VTRVJfUFJPRklMRVM6IHtcbiAgICAgICAgICAgIGxldCBuZXdTdGF0ZSA9IHtcbiAgICAgICAgICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgICAgICAgICBwcm9maWxlcyA6IHsgLi4uc3RhdGUucHJvZmlsZXMgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBuZXdTdGF0ZS5wcm9maWxlcyA9IGFjdGlvbi5wYXlsb2FkLnJlZHVjZSgocHJvZmlsZU1hcCwgcHJvZmlsZSkgPT4ge1xuICAgICAgICAgICAgICAgIHByb2ZpbGVNYXBbcHJvZmlsZS5wcm9maWxlSWRdID0gcHJvZmlsZVxuICAgICAgICAgICAgICAgIHJldHVybiBwcm9maWxlTWFwXG4gICAgICAgICAgICB9LCBuZXdTdGF0ZS5wcm9maWxlcylcblxuICAgICAgICAgICAgcmV0dXJuIG5ld1N0YXRlXG4gICAgICAgIH1cblxuICAgIH1cbiAgICByZXR1cm4gc3RhdGVcbn0iLCJpbXBvcnQgeyBBUFBFTkRfTEFCUyB9IGZyb20gJy4uLy4uL2NvbnN0YW50cy90eXBlcyc7XG5cbmNvbnN0IGRlZmF1bHRTdGF0ZSA9IHtcblxufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoc3RhdGUgPSBkZWZhdWx0U3RhdGUsIGFjdGlvbikge1xuXG4gICAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgICAgICBjYXNlIEFQUEVORF9MQUJTOiB7XG4gICAgICAgICAgICBsZXQgbmV3U3RhdGUgPSB7IC4uLnN0YXRlIH1cblxuICAgICAgICAgICAgcmV0dXJuIGFjdGlvbi5wYXlsb2FkLnJlZHVjZSgobGFwTWFwLCBsYWIpID0+IHtcbiAgICAgICAgICAgICAgICBsYXBNYXBbbGFiLmxhYi5pZF0gPSBsYWJcbiAgICAgICAgICAgICAgICByZXR1cm4gbGFwTWFwXG4gICAgICAgICAgICB9LG5ld1N0YXRlKVxuXG4gICAgICAgIH1cblxuICAgIH1cbiAgICByZXR1cm4gc3RhdGVcbn0iLCJpbXBvcnQgeyBMQUJfU0VBUkNIX1NUQVJULCBMQUJfU0VBUkNIIH0gZnJvbSAnLi4vLi4vY29uc3RhbnRzL3R5cGVzJztcblxuY29uc3QgZGVmYXVsdFN0YXRlID0ge1xuICAgIGxhYkxpc3Q6IFtdLFxuICAgIExPQURFRF9MQUJTX1NFQVJDSDogZmFsc2Vcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHN0YXRlID0gZGVmYXVsdFN0YXRlLCBhY3Rpb24pIHtcblxuICAgIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcblxuICAgICAgICBjYXNlIExBQl9TRUFSQ0hfU1RBUlQ6IHtcbiAgICAgICAgICAgIGxldCBuZXdTdGF0ZSA9IHsgLi4uc3RhdGUgfVxuXG4gICAgICAgICAgICBuZXdTdGF0ZS5MT0FERURfTEFCU19TRUFSQ0ggPSBmYWxzZVxuXG4gICAgICAgICAgICByZXR1cm4gbmV3U3RhdGVcbiAgICAgICAgfVxuXG4gICAgICAgIGNhc2UgTEFCX1NFQVJDSDoge1xuICAgICAgICAgICAgbGV0IG5ld1N0YXRlID0geyAuLi5zdGF0ZSB9XG5cbiAgICAgICAgICAgIG5ld1N0YXRlLmxhYkxpc3QgPSBhY3Rpb24ucGF5bG9hZC5tYXAobGFiID0+IGxhYi5sYWIuaWQpXG4gICAgICAgICAgICBuZXdTdGF0ZS5MT0FERURfTEFCU19TRUFSQ0ggPSB0cnVlXG5cbiAgICAgICAgICAgIHJldHVybiBuZXdTdGF0ZVxuICAgICAgICB9XG5cbiAgICB9XG4gICAgXG4gICAgcmV0dXJuIHN0YXRlXG59IiwiaW1wb3J0IHsgQVBQRU5EX0ZJTFRFUlNfRElBR05PU0lTLCBUT0dHTEVfQ09ORElUSU9OUywgVE9HR0xFX1NQRUNJQUxJVElFUywgU0VMRUNUX0xPQ0FUSU9OX0RJQUdOT1NJUywgTUVSR0VfU0VBUkNIX1NUQVRFX0xBQiwgVE9HR0xFX0NSSVRFUklBLCBUT0dHTEVfVEVTVFMsIFRPR0dMRV9ESUFHTk9TSVNfQ1JJVEVSSUEsIExPQURfU0VBUkNIX0NSSVRFUklBX0xBQiB9IGZyb20gJy4uLy4uL2NvbnN0YW50cy90eXBlcyc7XG5cbmNvbnN0IGRlZmF1bHRTdGF0ZSA9IHtcbiAgICBMT0FERURfU0VBUkNIX0NSSVRFUklBX0xBQjogZmFsc2UsXG4gICAgY29tbW9uX3Rlc3RzOiBbXSxcbiAgICBjb21tb25fY29uZGl0aW9uczogW10sXG4gICAgcHJlZmVycmVkX2xhYnM6IFtdLFxuICAgIHNlbGVjdGVkQ3JpdGVyaWFzOiBbXSxcbiAgICBzZWxlY3RlZExvY2F0aW9uOiBudWxsLFxuICAgIGZpbHRlckNyaXRlcmlhOiB7XG4gICAgICAgIHByaWNlUmFuZ2U6IFsxMDAsIDE1MDBdLFxuICAgICAgICBkaXN0YW5jZVJhbmdlOiBbMSwgMzVdLFxuICAgICAgICBzb3J0Qnk6IG51bGxcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChzdGF0ZSA9IGRlZmF1bHRTdGF0ZSwgYWN0aW9uKSB7XG5cbiAgICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgICAgIGNhc2UgTE9BRF9TRUFSQ0hfQ1JJVEVSSUFfTEFCOiB7XG4gICAgICAgICAgICBsZXQgbmV3U3RhdGUgPSB7IC4uLnN0YXRlIH1cbiAgICAgICAgICAgIGlmIChhY3Rpb24ucGF5bG9hZCkge1xuICAgICAgICAgICAgICAgIG5ld1N0YXRlID0geyAuLi5uZXdTdGF0ZSwgLi4uYWN0aW9uLnBheWxvYWQgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbmV3U3RhdGUuTE9BREVEX1NFQVJDSF9DUklURVJJQV9MQUIgPSB0cnVlXG4gICAgICAgICAgICByZXR1cm4gbmV3U3RhdGVcbiAgICAgICAgfVxuXG4gICAgICAgIGNhc2UgVE9HR0xFX0RJQUdOT1NJU19DUklURVJJQToge1xuICAgICAgICAgICAgbGV0IG5ld1N0YXRlID0ge1xuICAgICAgICAgICAgICAgIC4uLnN0YXRlLFxuICAgICAgICAgICAgICAgIHNlbGVjdGVkQ3JpdGVyaWFzOiBbXS5jb25jYXQoc3RhdGUuc2VsZWN0ZWRDcml0ZXJpYXMpXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxldCBmb3VuZCA9IGZhbHNlXG4gICAgICAgICAgICBuZXdTdGF0ZS5zZWxlY3RlZENyaXRlcmlhcyA9IG5ld1N0YXRlLnNlbGVjdGVkQ3JpdGVyaWFzLmZpbHRlcigoY3VycikgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChjdXJyLmlkID09IGFjdGlvbi5wYXlsb2FkLmNyaXRlcmlhLmlkICYmIGN1cnIudHlwZSA9PSBhY3Rpb24ucGF5bG9hZC50eXBlKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvdW5kID0gdHJ1ZVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgIGlmICghZm91bmQpIHtcbiAgICAgICAgICAgICAgICBuZXdTdGF0ZS5zZWxlY3RlZENyaXRlcmlhcy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgLi4uYWN0aW9uLnBheWxvYWQuY3JpdGVyaWEsXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IGFjdGlvbi5wYXlsb2FkLnR5cGVcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gbmV3U3RhdGVcbiAgICAgICAgfVxuXG4gICAgICAgIGNhc2UgU0VMRUNUX0xPQ0FUSU9OX0RJQUdOT1NJUzoge1xuICAgICAgICAgICAgbGV0IG5ld1N0YXRlID0geyAuLi5zdGF0ZSB9XG5cbiAgICAgICAgICAgIG5ld1N0YXRlLnNlbGVjdGVkTG9jYXRpb24gPSBhY3Rpb24ucGF5bG9hZFxuICAgICAgICAgICAgcmV0dXJuIG5ld1N0YXRlXG4gICAgICAgIH1cblxuICAgICAgICBjYXNlIE1FUkdFX1NFQVJDSF9TVEFURV9MQUI6IHtcbiAgICAgICAgICAgIGxldCBuZXdTdGF0ZSA9IHsgLi4uc3RhdGUsIC4uLmFjdGlvbi5wYXlsb2FkLnNlYXJjaFN0YXRlLCBmaWx0ZXJDcml0ZXJpYSA6IGFjdGlvbi5wYXlsb2FkLmZpbHRlckNyaXRlcmlhIH1cblxuICAgICAgICAgICAgcmV0dXJuIG5ld1N0YXRlXG4gICAgICAgIH1cblxuICAgIH1cbiAgICByZXR1cm4gc3RhdGVcbn1cblxuXG5cblxuXG4iLCJpbXBvcnQge2NvbWJpbmVSZWR1Y2Vyc30gZnJvbSAncmVkdXgnO1xuXG5pbXBvcnQgU0VBUkNIX0NSSVRFUklBX09QRCBmcm9tICcuL29wZC9zZWFyY2hDcml0ZXJpYS5qcydcbmltcG9ydCBTRUFSQ0hfQ1JJVEVSSUFfTEFCUyBmcm9tICcuL2RpYWdub3Npcy9zZWFyY2hDcml0ZXJpYS5qcydcbmltcG9ydCBET0NUT1JTIGZyb20gJy4vb3BkL2RvY3RvcnMuanMnXG5pbXBvcnQgRE9DVE9SX1NFQVJDSCBmcm9tICcuL29wZC9kb2N0b3JTZWFyY2guanMnXG5pbXBvcnQgTEFCUyBmcm9tICcuL2RpYWdub3Npcy9sYWJzLmpzJ1xuaW1wb3J0IExBQl9TRUFSQ0ggZnJvbSAnLi9kaWFnbm9zaXMvbGFic1NlYXJjaC5qcydcbmltcG9ydCBVU0VSIGZyb20gJy4vY29tbW9ucy91c2VyLmpzJ1xuaW1wb3J0IEFVVEggZnJvbSAnLi9jb21tb25zL2F1dGguanMnXG5cbmNvbnN0IGFsbFJlZHVjZXJzID0gY29tYmluZVJlZHVjZXJzKHtcbiAgICBTRUFSQ0hfQ1JJVEVSSUFfT1BELFxuICAgIFNFQVJDSF9DUklURVJJQV9MQUJTLFxuICAgIERPQ1RPUlMsXG4gICAgRE9DVE9SX1NFQVJDSCxcbiAgICBMQUJTLFxuICAgIExBQl9TRUFSQ0gsXG4gICAgVVNFUixcbiAgICBBVVRIXG59KTtcblxuZXhwb3J0IGRlZmF1bHQgYWxsUmVkdWNlcnNcbiIsImltcG9ydCB7IERPQ1RPUl9TRUFSQ0gsIERPQ1RPUl9TRUFSQ0hfU1RBUlQgfSBmcm9tICcuLi8uLi9jb25zdGFudHMvdHlwZXMnO1xuXG5jb25zdCBkZWZhdWx0U3RhdGUgPSB7XG4gICAgZG9jdG9yTGlzdDogW10sXG4gICAgTE9BREVEX0RPQ1RPUl9TRUFSQ0g6IGZhbHNlXG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChzdGF0ZSA9IGRlZmF1bHRTdGF0ZSwgYWN0aW9uKSB7XG5cbiAgICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG5cbiAgICAgICAgY2FzZSBET0NUT1JfU0VBUkNIX1NUQVJUOiB7XG4gICAgICAgICAgICBsZXQgbmV3U3RhdGUgPSB7IC4uLnN0YXRlIH1cblxuICAgICAgICAgICAgbmV3U3RhdGUuTE9BREVEX0RPQ1RPUl9TRUFSQ0ggPSBmYWxzZVxuXG4gICAgICAgICAgICByZXR1cm4gbmV3U3RhdGVcbiAgICAgICAgfVxuXG4gICAgICAgIGNhc2UgRE9DVE9SX1NFQVJDSDoge1xuICAgICAgICAgICAgbGV0IG5ld1N0YXRlID0geyAuLi5zdGF0ZSB9XG5cbiAgICAgICAgICAgIG5ld1N0YXRlLmRvY3Rvckxpc3QgPSBhY3Rpb24ucGF5bG9hZC5tYXAoZG9jID0+IGRvYy5pZClcbiAgICAgICAgICAgIG5ld1N0YXRlLkxPQURFRF9ET0NUT1JfU0VBUkNIID0gdHJ1ZVxuXG4gICAgICAgICAgICByZXR1cm4gbmV3U3RhdGVcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgcmV0dXJuIHN0YXRlXG59IiwiaW1wb3J0IHsgQVBQRU5EX0RPQ1RPUlMgfSBmcm9tICcuLi8uLi9jb25zdGFudHMvdHlwZXMnO1xuXG5jb25zdCBkZWZhdWx0U3RhdGUgPSB7XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHN0YXRlID0gZGVmYXVsdFN0YXRlLCBhY3Rpb24pIHtcblxuICAgIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICAgICAgY2FzZSBBUFBFTkRfRE9DVE9SUzoge1xuICAgICAgICAgICAgbGV0IG5ld1N0YXRlID0geyAuLi5zdGF0ZSB9XG5cbiAgICAgICAgICAgIHJldHVybiBhY3Rpb24ucGF5bG9hZC5yZWR1Y2UoKGRvY3Rvck1hcCwgZG9jdG9yKSA9PiB7XG4gICAgICAgICAgICAgICAgZG9jdG9yTWFwW2RvY3Rvci5pZF0gPSBkb2N0b3JcbiAgICAgICAgICAgICAgICByZXR1cm4gZG9jdG9yTWFwXG4gICAgICAgICAgICB9LG5ld1N0YXRlKVxuXG4gICAgICAgIH1cblxuICAgIH1cbiAgICByZXR1cm4gc3RhdGVcbn0iLCJpbXBvcnQgeyBTRUxFQ1RfTE9DQVRJT05fT1BELCBNRVJHRV9TRUFSQ0hfU1RBVEVfT1BELCBUT0dHTEVfT1BEX0NSSVRFUklBLCBMT0FEX1NFQVJDSF9DUklURVJJQV9PUEQgfSBmcm9tICcuLi8uLi9jb25zdGFudHMvdHlwZXMnO1xuXG5jb25zdCBkZWZhdWx0U3RhdGUgPSB7XG4gICAgTE9BREVEX1NFQVJDSF9DUklURVJJQV9PUEQ6IGZhbHNlLFxuICAgIHNwZWNpYWxpemF0aW9uczogW10sXG4gICAgY29uZGl0aW9uczogW10sXG4gICAgc2VsZWN0ZWRDcml0ZXJpYXM6IFtdLFxuICAgIHNlbGVjdGVkTG9jYXRpb246IG51bGwsXG4gICAgZmlsdGVyQ3JpdGVyaWE6IHtcbiAgICAgICAgcHJpY2VSYW5nZTogWzEwMCwgMTUwMF0sXG4gICAgICAgIHNvcnRfb246IG51bGwsXG4gICAgICAgIHNpdHNfYXRfY2xpbmljOiBmYWxzZSxcbiAgICAgICAgc2l0c19hdF9ob3NwaXRhbDogZmFsc2UsXG4gICAgICAgIGlzX2ZlbWFsZTogZmFsc2UsXG4gICAgICAgIGlzX2F2YWlsYWJsZTogZmFsc2VcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChzdGF0ZSA9IGRlZmF1bHRTdGF0ZSwgYWN0aW9uKSB7XG5cbiAgICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgICAgIGNhc2UgTE9BRF9TRUFSQ0hfQ1JJVEVSSUFfT1BEOiB7XG4gICAgICAgICAgICBsZXQgbmV3U3RhdGUgPSB7IC4uLnN0YXRlIH1cbiAgICAgICAgICAgIGlmIChhY3Rpb24ucGF5bG9hZCkge1xuICAgICAgICAgICAgICAgIG5ld1N0YXRlID0geyAuLi5uZXdTdGF0ZSwgLi4uYWN0aW9uLnBheWxvYWQgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbmV3U3RhdGUuTE9BREVEX1NFQVJDSF9DUklURVJJQV9PUEQgPSB0cnVlXG4gICAgICAgICAgICByZXR1cm4gbmV3U3RhdGVcbiAgICAgICAgfVxuXG4gICAgICAgIGNhc2UgVE9HR0xFX09QRF9DUklURVJJQToge1xuICAgICAgICAgICAgbGV0IG5ld1N0YXRlID0ge1xuICAgICAgICAgICAgICAgIC4uLnN0YXRlLFxuICAgICAgICAgICAgICAgIHNlbGVjdGVkQ3JpdGVyaWFzOiBbXS5jb25jYXQoc3RhdGUuc2VsZWN0ZWRDcml0ZXJpYXMpXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxldCBmb3VuZCA9IGZhbHNlXG4gICAgICAgICAgICBuZXdTdGF0ZS5zZWxlY3RlZENyaXRlcmlhcyA9IG5ld1N0YXRlLnNlbGVjdGVkQ3JpdGVyaWFzLmZpbHRlcigoY3VycikgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChjdXJyLmlkID09IGFjdGlvbi5wYXlsb2FkLmNyaXRlcmlhLmlkICYmIGN1cnIudHlwZSA9PSBhY3Rpb24ucGF5bG9hZC50eXBlKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvdW5kID0gdHJ1ZVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgIGlmICghZm91bmQpIHtcbiAgICAgICAgICAgICAgICBuZXdTdGF0ZS5zZWxlY3RlZENyaXRlcmlhcy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgLi4uYWN0aW9uLnBheWxvYWQuY3JpdGVyaWEsXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IGFjdGlvbi5wYXlsb2FkLnR5cGVcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gbmV3U3RhdGVcbiAgICAgICAgfVxuXG4gICAgICAgIGNhc2UgU0VMRUNUX0xPQ0FUSU9OX09QRDoge1xuICAgICAgICAgICAgbGV0IG5ld1N0YXRlID0geyAuLi5zdGF0ZSB9XG5cbiAgICAgICAgICAgIG5ld1N0YXRlLnNlbGVjdGVkTG9jYXRpb24gPSBhY3Rpb24ucGF5bG9hZFxuICAgICAgICAgICAgcmV0dXJuIG5ld1N0YXRlXG4gICAgICAgIH1cblxuICAgICAgICBjYXNlIE1FUkdFX1NFQVJDSF9TVEFURV9PUEQ6IHtcbiAgICAgICAgICAgIGxldCBuZXdTdGF0ZSA9IHsgLi4uc3RhdGUsIC4uLmFjdGlvbi5wYXlsb2FkLnNlYXJjaFN0YXRlLCBmaWx0ZXJDcml0ZXJpYTogYWN0aW9uLnBheWxvYWQuZmlsdGVyQ3JpdGVyaWEgfVxuXG4gICAgICAgICAgICByZXR1cm4gbmV3U3RhdGVcbiAgICAgICAgfVxuXG4gICAgfVxuICAgIHJldHVybiBzdGF0ZVxufVxuXG5cblxuXG5cbiIsImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBCcm93c2VyUm91dGVyLCBTd2l0Y2gsIFJvdXRlIH0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSdcblxuaW1wb3J0IHsgVHJhbnNpdGlvbkdyb3VwLCBDU1NUcmFuc2l0aW9uIH0gZnJvbSBcInJlYWN0LXRyYW5zaXRpb24tZ3JvdXBcIjtcblxuaW1wb3J0IFNlYXJjaENyaXRlcmlhIGZyb20gJy4vY29udGFpbmVycy9vcGQvU2VhcmNoQ3JpdGVyaWEuanMnXG5pbXBvcnQgTG9jYXRpb25TZWFyY2ggZnJvbSAnLi9jb250YWluZXJzL29wZC9Mb2NhdGlvblNlYXJjaC5qcydcbmltcG9ydCBTZWFyY2hSZXN1bHRzIGZyb20gJy4vY29udGFpbmVycy9vcGQvU2VhcmNoUmVzdWx0cy5qcydcbmltcG9ydCBTZWFyY2hSZXN1bHRzRmlsdGVyIGZyb20gJy4vY29udGFpbmVycy9vcGQvU2VhcmNoUmVzdWx0c0ZpbHRlci5qcydcbmltcG9ydCBEb2N0b3JQcm9maWxlIGZyb20gJy4vY29udGFpbmVycy9vcGQvRG9jdG9yUHJvZmlsZS5qcydcbmltcG9ydCBDbGluaWNMaXN0IGZyb20gJy4vY29udGFpbmVycy9vcGQvQ2xpbmljTGlzdC5qcydcbmltcG9ydCBBcHBvaW50bWVudFNsb3QgZnJvbSAnLi9jb250YWluZXJzL29wZC9BcHBvaW50bWVudFNsb3QuanMnXG5pbXBvcnQgUGF0aWVudERldGFpbHMgZnJvbSAnLi9jb250YWluZXJzL29wZC9QYXRpZW50RGV0YWlscy5qcydcblxuaW1wb3J0IFVzZXJQcm9maWxlIGZyb20gJy4vY29udGFpbmVycy9jb21tb25zL1VzZXJQcm9maWxlLmpzJ1xuaW1wb3J0IFVzZXJBcHBvaW50bWVudHMgZnJvbSAnLi9jb250YWluZXJzL2NvbW1vbnMvVXNlckFwcG9pbnRtZW50cy5qcydcbmltcG9ydCBVc2VyUmVwb3J0cyBmcm9tICcuL2NvbnRhaW5lcnMvY29tbW9ucy9Vc2VyUmVwb3J0cy5qcydcbmltcG9ydCBVc2VyU2lnbnVwIGZyb20gJy4vY29udGFpbmVycy9jb21tb25zL1VzZXJTaWdudXAnXG5cbmltcG9ydCBQYXltZW50IGZyb20gJy4vY29udGFpbmVycy9vcGQvUGF5bWVudC5qcydcbmltcG9ydCBCb29raW5nIGZyb20gJy4vY29udGFpbmVycy9vcGQvQm9va2luZy5qcydcbmltcG9ydCBDcml0ZXJpYVNlYXJjaCBmcm9tICcuL2NvbnRhaW5lcnMvb3BkL0NyaXRlcmlhU2VhcmNoLmpzJ1xuaW1wb3J0IERYX1NlYXJjaENyaXRlcmlhIGZyb20gJy4vY29udGFpbmVycy9kaWFnbm9zaXMvU2VhcmNoQ3JpdGVyaWEuanMnXG5pbXBvcnQgRFhfU2VhcmNoUmVzdWx0cyBmcm9tICcuL2NvbnRhaW5lcnMvZGlhZ25vc2lzL1NlYXJjaFJlc3VsdHMuanMnXG5pbXBvcnQgTGFiIGZyb20gJy4vY29udGFpbmVycy9kaWFnbm9zaXMvTGFiLmpzJ1xuaW1wb3J0IERYX1BhdGllbnREZXRhaWxzIGZyb20gJy4vY29udGFpbmVycy9kaWFnbm9zaXMvUGF0aWVudERldGFpbHMuanMnXG5pbXBvcnQgRFhfQm9va2luZ1N1bW1hcnkgZnJvbSAnLi9jb250YWluZXJzL2RpYWdub3Npcy9Cb29raW5nU3VtbWFyeS5qcydcbmltcG9ydCBEb2N0b3JDaGF0IGZyb20gJy4vY29udGFpbmVycy9jb21tb25zL0NoYXQuanMnXG5pbXBvcnQgVGVzdFNlbGVjdG9yIGZyb20gJy4vY29udGFpbmVycy9kaWFnbm9zaXMvVGVzdFNlbGVjdG9yJ1xuXG5pbXBvcnQgVXNlckxvZ2luIGZyb20gJy4vY29udGFpbmVycy9jb21tb25zL1VzZXJMb2dpbidcbmltcG9ydCBPdHBWZXJpZnkgZnJvbSAnLi9jb250YWluZXJzL2NvbW1vbnMvT3RwVmVyaWZ5J1xuXG5pbXBvcnQgSG9tZSBmcm9tICcuL2NvbnRhaW5lcnMvY29tbW9ucy9Ib21lJ1xuXG5jb25zdCByb3V0ZXMgPSBbXG5cbiAgICB7IHBhdGg6ICcvJywgZXhhY3Q6IHRydWUsIGNvbXBvbmVudDogSG9tZSB9LFxuXG4gICAgeyBwYXRoOiAnL29wZCcsIGV4YWN0OiB0cnVlLCBjb21wb25lbnQ6IFNlYXJjaENyaXRlcmlhIH0sXG4gICAgeyBwYXRoOiAnL2xvY2F0aW9uc2VhcmNoJywgZXhhY3Q6IHRydWUsIGNvbXBvbmVudDogTG9jYXRpb25TZWFyY2ggfSxcbiAgICB7IHBhdGg6ICcvb3BkL3NlYXJjaHJlc3VsdHMnLCBleGFjdDogdHJ1ZSwgY29tcG9uZW50OiBTZWFyY2hSZXN1bHRzIH0sXG4gICAgeyBwYXRoOiAnL29wZC9kb2N0b3IvOmlkJywgZXhhY3Q6IHRydWUsIGNvbXBvbmVudDogRG9jdG9yUHJvZmlsZSB9LFxuICAgIHsgcGF0aDogJy9vcGQvZG9jdG9yLzppZC86Y2xpbmljSWQvYm9vaycsIGV4YWN0OiB0cnVlLCBjb21wb25lbnQ6IEFwcG9pbnRtZW50U2xvdCB9LFxuXG4gICAgeyBwYXRoOiAnL29wZC9kb2N0b3IvOmlkL2F2YWlsYWJpbGl0eScsIGV4YWN0OiB0cnVlLCBjb21wb25lbnQ6IENsaW5pY0xpc3QgfSxcbiAgICB7IHBhdGg6ICcvZG9jdG9ycHJvZmlsZS86aWQvOmNsaW5pY0lkL2Jvb2tkZXRhaWxzJywgZXhhY3Q6IHRydWUsIGNvbXBvbmVudDogUGF0aWVudERldGFpbHMgfSxcbiAgICBcbiAgICB7IHBhdGg6ICcvdXNlci9zaWdudXAnLCBleGFjdDogdHJ1ZSwgY29tcG9uZW50OiBVc2VyU2lnbnVwIH0sXG4gICAgeyBwYXRoOiAnL3VzZXInLCBleGFjdDogdHJ1ZSwgY29tcG9uZW50OiBVc2VyUHJvZmlsZSB9LFxuICAgIHsgcGF0aDogJy91c2VyLzppZCcsIGV4YWN0OiB0cnVlLCBjb21wb25lbnQ6IFVzZXJQcm9maWxlIH0sXG4gICAgeyBwYXRoOiAnL3VzZXIvOmlkL2FwcG9pbnRtZW50cycsIGV4YWN0OiB0cnVlLCBjb21wb25lbnQ6IFVzZXJBcHBvaW50bWVudHMgfSxcbiAgICB7IHBhdGg6ICcvdXNlci86aWQvcmVwb3J0cycsIGV4YWN0OiB0cnVlLCBjb21wb25lbnQ6IFVzZXJSZXBvcnRzIH0sXG4gICAgeyBwYXRoOiAnL2NoYXQnLCBleGFjdDogdHJ1ZSwgY29tcG9uZW50OiBEb2N0b3JDaGF0IH0sXG4gICAgeyBwYXRoOiAnL3BheW1lbnQnLCBleGFjdDogdHJ1ZSwgY29tcG9uZW50OiBQYXltZW50IH0sXG4gICAgeyBwYXRoOiAnL2Jvb2tpbmcvOnJlZklkJywgZXhhY3Q6IHRydWUsIGNvbXBvbmVudDogQm9va2luZyB9LFxuXG4gICAgeyBwYXRoOiAnL2xvZ2luJywgZXhhY3Q6IHRydWUsIGNvbXBvbmVudDogVXNlckxvZ2luIH0sXG4gICAgeyBwYXRoOiAnL290cC92ZXJpZnknLCBleGFjdDogdHJ1ZSwgY29tcG9uZW50OiBPdHBWZXJpZnkgfSxcblxuICAgIHsgcGF0aDogJy9keCcsIGV4YWN0OiB0cnVlLCBjb21wb25lbnQ6IERYX1NlYXJjaENyaXRlcmlhIH0sXG4gICAgeyBwYXRoOiAnL2R4L3NlYXJjaHJlc3VsdHMnLCBleGFjdDogdHJ1ZSwgY29tcG9uZW50OiBEWF9TZWFyY2hSZXN1bHRzIH0sXG4gICAgeyBwYXRoOiAnL2xhYi86aWQnLCBleGFjdDogdHJ1ZSwgY29tcG9uZW50OiBMYWIgfSxcbiAgICB7IHBhdGg6ICcvbGFiLzppZC90ZXN0cycsIGV4YWN0OiB0cnVlLCBjb21wb25lbnQ6IFRlc3RTZWxlY3RvciB9LFxuICAgIHsgcGF0aDogJy9sYWIvOmlkL2Jvb2snLCBleGFjdDogdHJ1ZSwgY29tcG9uZW50OiBEWF9Cb29raW5nU3VtbWFyeSB9LFxuXG4gICAgeyBwYXRoOiAnL2xhYi9ib29raW5nL3N1bW1hcnkvOmlkJywgZXhhY3Q6IHRydWUsIGNvbXBvbmVudDogRFhfQm9va2luZ1N1bW1hcnkgfSxcblxuXVxuXG5jbGFzcyBSb3V0ZXJDb25maWcgZXh0ZW5kcyBDb21wb25lbnQge1xuXG4gICAgc3RhdGljIFJPVVRFUyA9IHJvdXRlc1xuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICA8Um91dGVcbiAgICAgICAgICAgICAgICAgICAgcmVuZGVyPXtcbiAgICAgICAgICAgICAgICAgICAgICAgICh7IGxvY2F0aW9uIH0pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8VHJhbnNpdGlvbkdyb3VwPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPENTU1RyYW5zaXRpb25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk9e2xvY2F0aW9uLnBhdGhuYW1lfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZXM9XCJmYWRlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aW1lb3V0PXt7IGVudGVyOiAzMDAsIGV4aXQ6IDAgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBleGl0PXtmYWxzZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8U3dpdGNoIGxvY2F0aW9uPXtsb2NhdGlvbn0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtyb3V0ZXMubWFwKChyb3V0ZSwgaSkgPT4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPFJvdXRlIHsuLi5yb3V0ZX0ga2V5PXtpfSAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L1N3aXRjaD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ1NTVHJhbnNpdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9UcmFuc2l0aW9uR3JvdXA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLz5cblxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIClcbiAgICB9XG5cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBSb3V0ZXJDb25maWdcblxuIiwiXG5jb25zdCBkYXlzID0gWydTdW5kYXknLCAnTW9uZGF5JywgJ1R1ZXNkYXknLCAnV2VkbmVzZGF5JywgJ1RodXJzZGF5JywgJ0ZyaWRheScsICdTYXR1cmRheSddO1xuXG5leHBvcnQgY29uc3QgZ2V0VGltZSA9ICh0aW1lU3RhbXApID0+IHtcbiAgICB2YXIgZGF0ZSA9IG5ldyBEYXRlKHRpbWVTdGFtcCk7XG4gICAgdmFyIGhvdXJzID0gZGF0ZS5nZXRIb3VycygpO1xuICAgIHZhciBtaW51dGVzID0gXCIwXCIgKyBkYXRlLmdldE1pbnV0ZXMoKTtcbiAgICByZXR1cm4gaG91cnMgKyAnOicgKyBtaW51dGVzLnN1YnN0cigtMilcbn1cbmV4cG9ydCBjb25zdCBnZXREYXlOYW1lID0gKHRpbWVTdGFtcCkgPT4ge1xuICAgIHJldHVybiBkYXlzW25ldyBEYXRlKHRpbWVTdGFtcCkuZ2V0RGF5KCldXG5cbn0iLCJwcm9jZXNzLmVudi5OT0RFX1RMU19SRUpFQ1RfVU5BVVRIT1JJWkVEID0gXCIwXCJcblxuY29uc3QgcGF0aCA9IHJlcXVpcmUoJ3BhdGgnKTtcbmNvbnN0IGh0dHAgPSByZXF1aXJlKCdodHRwJyk7XG5jb25zdCBFeHByZXNzID0gcmVxdWlyZSgnZXhwcmVzcycpO1xuY29uc3QgYXBwID0gbmV3IEV4cHJlc3MoKTtcbmNvbnN0IHNlcnZlciA9IG5ldyBodHRwLlNlcnZlcihhcHApO1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQgUmVhY3RET01TZXJ2ZXIgZnJvbSAncmVhY3QtZG9tL3NlcnZlcidcbmltcG9ydCB7IFN0YXRpY1JvdXRlciB9IGZyb20gJ3JlYWN0LXJvdXRlcidcbmltcG9ydCBSb3V0ZXMgZnJvbSAnLi9kZXYvanMvcm91dGVzLmpzJ1xuaW1wb3J0IHsgTXVpVGhlbWVQcm92aWRlciwgY3JlYXRlTXVpVGhlbWUsIGNyZWF0ZUdlbmVyYXRlQ2xhc3NOYW1lIH0gZnJvbSAnbWF0ZXJpYWwtdWkvc3R5bGVzJztcbmltcG9ydCB7IFNoZWV0c1JlZ2lzdHJ5IH0gZnJvbSAncmVhY3QtanNzL2xpYi9qc3MnO1xuXG5pbXBvcnQgSnNzUHJvdmlkZXIgZnJvbSAncmVhY3QtanNzL2xpYi9Kc3NQcm92aWRlcic7XG5pbXBvcnQgeyBQcm92aWRlciB9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCB7IGNyZWF0ZVN0b3JlLCBhcHBseU1pZGRsZXdhcmUgfSBmcm9tICdyZWR1eCc7XG5pbXBvcnQgdGh1bmsgZnJvbSAncmVkdXgtdGh1bmsnO1xuaW1wb3J0IHsgY3JlYXRlTG9nZ2VyIH0gZnJvbSAncmVkdXgtbG9nZ2VyJ1xuaW1wb3J0IGFsbFJlZHVjZXJzIGZyb20gJy4vZGV2L2pzL3JlZHVjZXJzL2luZGV4LmpzJztcbmltcG9ydCB7IG1hdGNoUGF0aCB9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nXG5cblxuYXBwLnVzZSgnL2Fzc2V0cycsIEV4cHJlc3Muc3RhdGljKHBhdGguam9pbihfX2Rpcm5hbWUsICdhc3NldHMnKSkpO1xuYXBwLnVzZSgnL2Rpc3QnLCBFeHByZXNzLnN0YXRpYyhwYXRoLmpvaW4oX19kaXJuYW1lLCAnZGlzdCcpKSk7XG5cblxuYXBwLmdldCgnKicsIGZ1bmN0aW9uIChyZXEsIHJlcykge1xuXG4gICAgY29uc3QgY29udGV4dCA9IHt9XG5cbiAgICBjb25zdCBzdG9yZSA9IGNyZWF0ZVN0b3JlKFxuICAgICAgICBhbGxSZWR1Y2VycywgYXBwbHlNaWRkbGV3YXJlKHRodW5rKVxuICAgICk7XG5cbiAgICBjb25zdCBzaGVldHNSZWdpc3RyeSA9IG5ldyBTaGVldHNSZWdpc3RyeSgpO1xuICAgIGNvbnN0IHRoZW1lID0gY3JlYXRlTXVpVGhlbWUoe1xuICAgICAgICBwYWxldHRlOiB7XG4gICAgICAgICAgICBwcmltYXJ5OiB7XG4gICAgICAgICAgICAgICAgbWFpbjogJyMwMGI3YjAnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2Vjb25kYXJ5OiB7XG4gICAgICAgICAgICAgICAgbWFpbjogJyMwMGI3YjAnXG4gICAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICBzdGF0dXM6IHtcbiAgICAgICAgICAgIGRhbmdlcjogJ29yYW5nZScsXG4gICAgICAgIH0sXG4gICAgfSlcbiAgICBjb25zdCBnZW5lcmF0ZUNsYXNzTmFtZSA9IGNyZWF0ZUdlbmVyYXRlQ2xhc3NOYW1lKCk7XG5cbiAgICBpZiAoY29udGV4dC51cmwpIHtcbiAgICAgICAgcmVzLndyaXRlSGVhZCgzMDEsIHtcbiAgICAgICAgICAgIExvY2F0aW9uOiBjb250ZXh0LnVybFxuICAgICAgICB9KVxuICAgICAgICByZXMuZW5kKClcbiAgICB9IGVsc2Uge1xuXG4gICAgICAgIC8vIGluc2lkZSBhIHJlcXVlc3RcbiAgICAgICAgY29uc3QgcHJvbWlzZXMgPSBbXVxuXG4gICAgICAgIFJvdXRlcy5ST1VURVMuc29tZShyb3V0ZSA9PiB7XG4gICAgICAgICAgICAvLyB1c2UgYG1hdGNoUGF0aGAgaGVyZVxuICAgICAgICAgICAgY29uc3QgbWF0Y2ggPSBtYXRjaFBhdGgocmVxLnBhdGgsIHJvdXRlKVxuICAgICAgICAgICAgaWYgKG1hdGNoICYmIHJvdXRlLmNvbXBvbmVudC5sb2FkRGF0YSlcbiAgICAgICAgICAgICAgICBwcm9taXNlcy5wdXNoKHJvdXRlLmNvbXBvbmVudC5sb2FkRGF0YShzdG9yZSwgbWF0Y2gpKVxuICAgICAgICAgICAgcmV0dXJuIG1hdGNoXG4gICAgICAgIH0pXG5cbiAgICAgICAgUHJvbWlzZS5hbGwocHJvbWlzZXMpLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgICBjb25zdCBzdG9yZURhdGEgPSBKU09OLnN0cmluZ2lmeShzdG9yZS5nZXRTdGF0ZSgpKVxuICAgICAgICAgICAgY29uc3QgaHRtbCA9IFJlYWN0RE9NU2VydmVyLnJlbmRlclRvU3RyaW5nKFxuICAgICAgICAgICAgICAgIDxQcm92aWRlciBzdG9yZT17c3RvcmV9PlxuICAgICAgICAgICAgICAgICAgICA8SnNzUHJvdmlkZXIgcmVnaXN0cnk9e3NoZWV0c1JlZ2lzdHJ5fSBnZW5lcmF0ZUNsYXNzTmFtZT17Z2VuZXJhdGVDbGFzc05hbWV9PlxuICAgICAgICAgICAgICAgICAgICAgICAgPE11aVRoZW1lUHJvdmlkZXIgdGhlbWU9e3RoZW1lfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8U3RhdGljUm91dGVyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvY2F0aW9uPXtyZXEudXJsfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0PXtjb250ZXh0fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPFJvdXRlcyAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvU3RhdGljUm91dGVyPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9NdWlUaGVtZVByb3ZpZGVyPlxuICAgICAgICAgICAgICAgICAgICA8L0pzc1Byb3ZpZGVyPlxuICAgICAgICAgICAgICAgIDwvUHJvdmlkZXI+XG4gICAgICAgICAgICApXG4gICAgICAgICAgICBjb25zdCBjc3MgPSBzaGVldHNSZWdpc3RyeS50b1N0cmluZygpXG5cbiAgICAgICAgICAgIHJlcy5yZW5kZXIoJy4vaW5kZXgudGVtcGxhdGUuZWpzJywge1xuICAgICAgICAgICAgICAgIGh0bWwsIGNzcywgc3RvcmVEYXRhXG4gICAgICAgICAgICB9KVxuICAgICAgICB9KVxuXG4gICAgfVxuXG59KTtcblxuXG5hcHAudXNlKGZ1bmN0aW9uIChyZXEsIHJlcykge1xuICAgIHJlcy5zZW5kRmlsZSgnaW5kZXguaHRtbCcsIHsgcm9vdDogJy4vZGlzdC8nIH0pXG59KVxuXG5zZXJ2ZXIubGlzdGVuKDMwMDAsIChlcnIpID0+IHtcbiAgICBpZiAoZXJyKSB7XG4gICAgICAgIHJldHVybiBjb25zb2xlLmVycm9yKGVycik7XG4gICAgfVxuICAgIGNvbnNvbGUuaW5mbygnU2VydmVyIHJ1bm5pbmcgb24gaHR0cDovL2xvY2FsaG9zdDozMDAwJyk7XG59KTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJheGlvc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJleHByZXNzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImh0dHBcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibWF0ZXJpYWwtdWktaWNvbnMvQWNjb3VudENpcmNsZVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJtYXRlcmlhbC11aS1pY29ucy9BdHRhY2hNb25leVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJtYXRlcmlhbC11aS1pY29ucy9DYWxsXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm1hdGVyaWFsLXVpLWljb25zL0V4cGFuZE1vcmVcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibWF0ZXJpYWwtdWktaWNvbnMvS2V5Ym9hcmRBcnJvd1JpZ2h0XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm1hdGVyaWFsLXVpLWljb25zL1BheW1lbnRcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibWF0ZXJpYWwtdWkvQ2hlY2tib3hcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibWF0ZXJpYWwtdWkvQ2hpcFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJtYXRlcmlhbC11aS9FeHBhbnNpb25QYW5lbFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJtYXRlcmlhbC11aS9Gb3JtXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm1hdGVyaWFsLXVpL01lbnVcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibWF0ZXJpYWwtdWkvUHJvZ3Jlc3NcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibWF0ZXJpYWwtdWkvUmFkaW9cIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibWF0ZXJpYWwtdWkvU3RlcHBlclwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJtYXRlcmlhbC11aS9zdHlsZXNcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicGF0aFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyYy1zbGlkZXIvbGliL1JhbmdlXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0LWRvbS9zZXJ2ZXJcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhY3QtanNzL2xpYi9Kc3NQcm92aWRlclwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdC1qc3MvbGliL2pzc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdC1yZWR1eFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdC1yb3V0ZXJcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhY3Qtcm91dGVyLWRvbVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdC10cmFuc2l0aW9uLWdyb3VwXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlZHV4XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlZHV4LWxvZ2dlclwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWR1eC10aHVua1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ1bml2ZXJzYWwtY29va2llXCIpOyJdLCJzb3VyY2VSb290IjoiIn0=