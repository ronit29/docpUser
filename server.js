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

    (0, _api.API_POST)('/api/v1/user/otp/generate?type=doctor', {
        "phone_number": number
    }).then(function (response) {
        if (response.exists) {
            dispatch({
                type: _types.SEND_OTP_SUCCESS,
                payload: {}
            });
            if (cb) cb();
        } else {
            dispatch({
                type: _types.SEND_OTP_FAIL,
                payload: {
                    error_message: "Doctor not registered."
                }
            });
        }
    }).catch(function (error) {
        debugger;
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

	(0, _api.API_GET)(url).then(function (response) {

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

const getDoctors = exports.getDoctors = (searchState = {}, filterState = {}, mergeState = false) => dispatch => {
	(0, _api.API_GET)('/doctors.json').then(function (response) {

		dispatch({
			type: _types.APPEND_DOCTORS,
			payload: response.doctors
		});

		dispatch({
			type: _types.DOCTOR_SEARCH,
			payload: response.doctors
		});

		if (mergeState) {
			dispatch({
				type: _types.MERGE_SEARCH_STATE_OPD,
				payload: searchState
			});
		}

		let searchStateParam = encodeURIComponent(JSON.stringify(searchState));
		let filterStateParam = encodeURIComponent(JSON.stringify(filterState));
		history.replaceState(null, 'hello', `/searchresults?search=${searchStateParam}&filter=${filterStateParam}`);
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
exports.setOPDFilters = exports.getCriteriaResults = exports.mergeSearchState = exports.selectLocation = exports.toggleCriteria = exports.toggleSpeciality = exports.toggleCondition = exports.loadSearchCriteria = undefined;

var _types = __webpack_require__(/*! ../../constants/types */ "./dev/js/constants/types.js");

var _api = __webpack_require__(/*! ../../api/api.js */ "./dev/js/api/api.js");

const loadSearchCriteria = exports.loadSearchCriteria = () => dispatch => {
    dispatch({
        type: _types.LOAD_SEARCH_CRITERIA_OPD,
        payload: null
    });
};

const toggleCondition = exports.toggleCondition = id => dispatch => {
    dispatch({
        type: _types.TOGGLE_CONDITIONS,
        payload: {
            id
        }
    });
};

const toggleSpeciality = exports.toggleSpeciality = id => dispatch => {
    dispatch({
        type: _types.TOGGLE_SPECIALITIES,
        payload: {
            id
        }
    });
};

const toggleCriteria = exports.toggleCriteria = criteria => dispatch => {
    dispatch({
        type: _types.TOGGLE_CRITERIA,
        payload: criteria
    });
};

const selectLocation = exports.selectLocation = location => dispatch => {
    dispatch({
        type: _types.SELECT_LOCATION,
        payload: location
    });

    dispatch({
        type: _types.SELECT_LOCATION_DIAGNOSIS,
        payload: location
    });
};

const mergeSearchState = exports.mergeSearchState = state => dispatch => {
    dispatch({
        type: _types.MERGE_SEARCH_STATE,
        payload: state
    });
};

const getCriteriaResults = exports.getCriteriaResults = (searchString, callback) => dispatch => {
    (0, _api.API_GET)('/generic_search.json').then(function (response) {
        callback(response);
    }).catch(function (error) {});
};

const setOPDFilters = exports.setOPDFilters = filterData => dispatch => {
    dispatch({
        type: _types.SET_OPD_FILTERS,
        payload: filterData
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

/***/ "./dev/js/components/diagnosis/commons/commonlySearched/CommonlySearched.js":
/*!**********************************************************************************!*\
  !*** ./dev/js/components/diagnosis/commons/commonlySearched/CommonlySearched.js ***!
  \**********************************************************************************/
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

        let rows = this.props.data.map(row => {
            if (this.props.type == 'lab') {
                return _react2.default.createElement(
                    'li',
                    { key: row.id },
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
                    { key: row.id },
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

/***/ "./dev/js/components/diagnosis/commons/commonlySearched/index.js":
/*!***********************************************************************!*\
  !*** ./dev/js/components/diagnosis/commons/commonlySearched/index.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _CommonlySearched = __webpack_require__(/*! ./CommonlySearched.js */ "./dev/js/components/diagnosis/commons/commonlySearched/CommonlySearched.js");

var _CommonlySearched2 = _interopRequireDefault(_CommonlySearched);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _CommonlySearched2.default;

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

/***/ "./dev/js/components/diagnosis/criteriaSearch/CriteriaSearchView.js":
/*!**************************************************************************!*\
  !*** ./dev/js/components/diagnosis/criteriaSearch/CriteriaSearchView.js ***!
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
        this.props.getDiagnosisCriteriaResults(this.state.searchValue, searchResults => {
            if (searchResults) {
                let tests = searchResults.tests.map(x => {
                    return _extends({}, x, { type: 'test' });
                });
                this.setState({ searchResults: [...tests] });
            }
        });
    }

    addCriteria(criteria) {
        this.props.toggleDiagnosisCriteria(criteria.type, criteria);
        this.setState({ searchValue: "" });
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
                                    _react2.default.createElement('input', { type: 'text', className: 'form-control input-md search-input', id: 'topCriteriaSearch', onChange: this.inputHandler.bind(this), value: this.state.searchValue, placeholder: 'Search for Test & Labs' }),
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

/***/ "./dev/js/components/diagnosis/criteriaSearch/index.js":
/*!*************************************************************!*\
  !*** ./dev/js/components/diagnosis/criteriaSearch/index.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _CriteriaSearchView = __webpack_require__(/*! ./CriteriaSearchView.js */ "./dev/js/components/diagnosis/criteriaSearch/CriteriaSearchView.js");

var _CriteriaSearchView2 = _interopRequireDefault(_CriteriaSearchView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _CriteriaSearchView2.default;

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

var _index = __webpack_require__(/*! ../commons/commonlySearched/index.js */ "./dev/js/components/diagnosis/commons/commonlySearched/index.js");

var _index2 = _interopRequireDefault(_index);

var _criteriaSearch = __webpack_require__(/*! ../criteriaSearch */ "./dev/js/components/diagnosis/criteriaSearch/index.js");

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
                _extends({}, this.props, { checkForLoad: this.props.LOADED_SEARCH_CRITERIA_LAB }),
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

var _criteriaSearch = __webpack_require__(/*! ../criteriaSearch */ "./dev/js/components/diagnosis/criteriaSearch/index.js");

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
            filterCriteria,
            LOADED_SEARCH_CRITERIA_LAB
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
            { className: 'searchResults' },
            _react2.default.createElement(
                _criteriaSearch2.default,
                _extends({}, this.props, { checkForLoad: this.props.LOADED_LABS_SEARCH }),
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

LabsList.contextTypes = {
    router: () => null
};
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

/***/ "./dev/js/components/opd/commons/commonlySearched/CommonlySearched.js":
/*!****************************************************************************!*\
  !*** ./dev/js/components/opd/commons/commonlySearched/CommonlySearched.js ***!
  \****************************************************************************/
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

        let pills = this.props.data.map(pill => {
            let selected = !!this.props.selected[pill.id];
            return _react2.default.createElement(_Chip2.default, {
                label: pill.name,
                className: selected ? "pill selected" : "pill",
                key: pill.id,
                onClick: () => {
                    return this.props.togglePill(pill.id);
                }
            });
        });

        return _react2.default.createElement(
            'div',
            { className: 'commonlySearched' },
            _react2.default.createElement(
                'span',
                { className: 'heading' },
                this.props.heading
            ),
            _react2.default.createElement(
                'div',
                { className: 'pills' },
                pills
            )
        );
    }
}

exports.default = CommonlySearched;

/***/ }),

/***/ "./dev/js/components/opd/commons/commonlySearched/index.js":
/*!*****************************************************************!*\
  !*** ./dev/js/components/opd/commons/commonlySearched/index.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _CommonlySearched = __webpack_require__(/*! ./CommonlySearched.js */ "./dev/js/components/opd/commons/commonlySearched/CommonlySearched.js");

var _CommonlySearched2 = _interopRequireDefault(_CommonlySearched);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _CommonlySearched2.default;

/***/ }),

/***/ "./dev/js/components/opd/commons/criteriaSelector/CriteriaSelector.js":
/*!****************************************************************************!*\
  !*** ./dev/js/components/opd/commons/criteriaSelector/CriteriaSelector.js ***!
  \****************************************************************************/
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

class CriteriaSelector extends _react2.default.Component {
    constructor(props) {
        super(props);
    }

    handleDelete(id, handler) {
        if (handler == 'toggleCriteria') {
            this.props[handler]({ id });
        } else {
            this.props[handler](id);
        }
    }

    render() {

        let pills = [];
        let conditions = [];
        let specialities = [];
        let criterias = [];

        if (this.props.commonlySearchedConditions) {
            conditions = this.props.commonlySearchedConditions.filter(pill => {
                return this.props.selectedConditions[pill.id];
            }).map(pill => {
                pill.ts = this.props.selectedConditions[pill.id];
                pill.type = 'toggleCondition';
                return pill;
            });
        }
        if (this.props.commonlySearchedSpecialities) {
            specialities = this.props.commonlySearchedSpecialities.filter(pill => {
                return this.props.selectedSpecialities[pill.id];
            }).map(pill => {
                pill.ts = this.props.selectedSpecialities[pill.id];
                pill.type = 'toggleSpeciality';
                return pill;
            });
        }
        if (this.props.selectedCriteria) {
            criterias = Object.keys(this.props.selectedCriteria).map(criteria => {
                let pill = this.props.selectedCriteria[criteria];
                pill.type = 'toggleCriteria';
                return pill;
            });
        }

        pills = [...conditions, ...specialities, ...criterias];
        pills = pills.sort((a, b) => {
            let dateA = new Date(a.ts).getTime();
            let dateB = new Date(b.ts).getTime();
            return dateA > dateB ? 1 : -1;
        }).map(pill => {
            return _react2.default.createElement(_Chip2.default, {
                label: pill.name,
                className: "pillselected",
                key: pill.type + pill.id,
                onDelete: this.handleDelete.bind(this, pill.id, pill.type)
            });
        });

        return _react2.default.createElement(
            'div',
            { className: 'criteriaSelector' },
            _react2.default.createElement('input', { onClick: () => {
                    this.context.router.history.push('/criteriasearch');
                }, placeholder: "Search for symptoms, Doctors, conditions ..etc" }),
            pills
        );
    }
}

CriteriaSelector.contextTypes = {
    router: () => null
};
exports.default = CriteriaSelector;

/***/ }),

/***/ "./dev/js/components/opd/commons/criteriaSelector/index.js":
/*!*****************************************************************!*\
  !*** ./dev/js/components/opd/commons/criteriaSelector/index.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _CriteriaSelector = __webpack_require__(/*! ./CriteriaSelector.js */ "./dev/js/components/opd/commons/criteriaSelector/CriteriaSelector.js");

var _CriteriaSelector2 = _interopRequireDefault(_CriteriaSelector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _CriteriaSelector2.default;

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

var _AccountCircle = __webpack_require__(/*! material-ui-icons/AccountCircle */ "material-ui-icons/AccountCircle");

var _AccountCircle2 = _interopRequireDefault(_AccountCircle);

var _Home = __webpack_require__(/*! material-ui-icons/Home */ "material-ui-icons/Home");

var _Home2 = _interopRequireDefault(_Home);

var _AvTimer = __webpack_require__(/*! material-ui-icons/AvTimer */ "material-ui-icons/AvTimer");

var _AvTimer2 = _interopRequireDefault(_AvTimer);

var _LocationOn = __webpack_require__(/*! material-ui-icons/LocationOn */ "material-ui-icons/LocationOn");

var _LocationOn2 = _interopRequireDefault(_LocationOn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class DoctorProfileCard extends _react2.default.Component {
    constructor(props) {
        super(props);
    }

    cardClick(id, e) {
        this.context.router.history.push(`/doctorprofile/${id}`);
    }

    bookNow(id, e) {
        e.stopPropagation();
        this.context.router.history.push(`/doctorprofile/${id}/availability`);
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

        let { id, name, profile_img, practice_duration, qualificationSpecialization, consultationCount, availability, pastExperience } = this.props.details;

        let qualificationString = this.getQualificationStr(qualificationSpecialization);
        let timeAvailable = this.getAvailability(availability[0]);

        return _react2.default.createElement(
            'div',
            { className: 'doctorCard', onClick: this.cardClick.bind(this, id) },
            _react2.default.createElement(
                'div',
                { className: 'detailsDiv' },
                _react2.default.createElement(
                    'div',
                    { className: 'subOptionsImage' },
                    _react2.default.createElement('img', { src: profile_img, className: 'doctorImage' })
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'subOptionsContent' },
                    _react2.default.createElement(
                        'span',
                        { className: 'name' },
                        name
                    ),
                    _react2.default.createElement(
                        'span',
                        { className: 'qualification' },
                        qualificationString
                    ),
                    _react2.default.createElement(
                        'span',
                        { className: 'designation' },
                        pastExperience
                    ),
                    _react2.default.createElement(
                        'span',
                        { className: 'experience' },
                        practice_duration,
                        ' years of experience'
                    )
                ),
                !!this.props.hideBookNow ? '' : _react2.default.createElement(
                    'div',
                    { className: 'subOptionsInteract' },
                    _react2.default.createElement(
                        'button',
                        { className: 'bookNow', onClick: this.bookNow.bind(this, id) },
                        'Book Now'
                    ),
                    _react2.default.createElement(
                        'span',
                        { className: 'price' },
                        'Fee: Rs. ',
                        timeAvailable.fee.amount
                    )
                )
            ),
            !!this.props.hideBottom ? '' : _react2.default.createElement(
                'div',
                { className: 'bottomOptions' },
                _react2.default.createElement(
                    'div',
                    { className: 'subOptions' },
                    _react2.default.createElement(_Home2.default, { className: 'clinicIcon' }),
                    _react2.default.createElement(
                        'span',
                        { className: 'clinicName' },
                        availability[0].name
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'subOptions' },
                    _react2.default.createElement(_AvTimer2.default, { className: 'clinicIcon' }),
                    _react2.default.createElement(
                        'span',
                        { className: 'timeEntry' },
                        timeAvailable.date
                    ),
                    _react2.default.createElement(
                        'span',
                        { className: 'timeEntry' },
                        timeAvailable.timeStart,
                        ' to ',
                        timeAvailable.timeEnd
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'subOptions' },
                    _react2.default.createElement(_LocationOn2.default, { className: 'clinicIcon' }),
                    _react2.default.createElement(
                        'span',
                        { className: 'clinicName' },
                        availability[0].address
                    )
                )
            )
        );
    }
}

DoctorProfileCard.contextTypes = {
    router: () => null
};
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

var _react = __webpack_require__(/*! react */ "react");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(/*! react-redux */ "react-redux");

var _index = __webpack_require__(/*! ../commons/commonlySearched/index.js */ "./dev/js/components/opd/commons/commonlySearched/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = __webpack_require__(/*! ../commons/criteriaSelector/index.js */ "./dev/js/components/opd/commons/criteriaSelector/index.js");

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class SearchCriteriaView extends _react2.default.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.loadSearchCriteria();
    }

    searchProceed() {
        // let searchData = {
        //     selectedSpecialities : this.props.selectedSpecialities,
        //     selectedConditions : this.props.selectedConditions,
        //     selectedLocation : this.props.selectedLocation,
        //     selectedCriteria : this.props.selectedCriteria
        // }
        // searchData = encodeURIComponent(JSON.stringify(searchData))
        this.context.router.history.push(`/searchresults`);
    }

    render() {

        return _react2.default.createElement(
            'div',
            { className: 'searchCriteria' },
            _react2.default.createElement(LocationSelector, {
                selectedLocation: this.props.selectedLocation
            }),
            _react2.default.createElement(_index4.default, {
                commonlySearchedConditions: this.props.commonlySearchedConditions,
                selectedConditions: this.props.selectedConditions,
                commonlySearchedSpecialities: this.props.commonlySearchedSpecialities,
                selectedSpecialities: this.props.selectedSpecialities,
                selectedCriteria: this.props.selectedCriteria,
                toggleCondition: this.props.toggleCondition.bind(this),
                toggleSpeciality: this.props.toggleSpeciality.bind(this),
                toggleCriteria: this.props.toggleCriteria.bind(this)
            }),
            _react2.default.createElement(_index2.default, {
                heading: 'Commonly searched conditions',
                data: this.props.commonlySearchedConditions,
                selected: this.props.selectedConditions,
                togglePill: this.props.toggleCondition.bind(this)
            }),
            _react2.default.createElement(_index2.default, {
                heading: 'Commonly searched specialities',
                data: this.props.commonlySearchedSpecialities,
                selected: this.props.selectedSpecialities,
                togglePill: this.props.toggleSpeciality.bind(this)
            }),
            _react2.default.createElement(
                'button',
                { onClick: this.searchProceed.bind(this), className: 'proceedBtn' },
                ' Proceed '
            )
        );
    }
}
// import LocationSelector from '../../commons/locationSelector/index.js'
SearchCriteriaView.contextTypes = {
    router: () => null
};
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

var _react = __webpack_require__(/*! react */ "react");

var _react2 = _interopRequireDefault(_react);

var _index = __webpack_require__(/*! ../searchResults/doctorsList/index.js */ "./dev/js/components/opd/searchResults/doctorsList/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = __webpack_require__(/*! ../searchResults/topBar/index.js */ "./dev/js/components/opd/searchResults/topBar/index.js");

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class SearchResultsView extends _react2.default.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        let {
            selectedConditions,
            selectedSpecialities,
            selectedLocation,
            selectedCriteria,
            CRITERIA_LOADED
        } = this.props;

        if (CRITERIA_LOADED) {
            let searchState = {
                selectedConditions,
                selectedSpecialities,
                selectedLocation,
                selectedCriteria
            };
            let filterState = this.props.filterCriteria;
            this.getDoctorList(searchState, filterState, false);
        } else {
            try {
                let searchState = this.getLocationParam('search');
                let filterState = this.getLocationParam('filter');
                if (filterState) {
                    filterState = JSON.parse(filterState);
                } else {
                    filterState = {};
                }
                searchState = JSON.parse(searchState);
                this.getDoctorList(searchState, filterState, true);
            } catch (e) {
                console.error(e);
            }
        }
    }

    getLocationParam(tag) {
        // this API assumes the context of react-router-4
        const paramString = this.props.location.search;
        const params = new URLSearchParams(paramString);
        return params.get(tag);
    }

    getDoctorList(searchState, filterState, mergeState) {
        this.props.getDoctors(searchState, filterState, mergeState);
    }

    render() {
        return _react2.default.createElement(
            'div',
            { className: 'searchResults' },
            this.props.LOADING ? "" : _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(_index4.default, null),
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

var _react = __webpack_require__(/*! react */ "react");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(/*! react-redux */ "react-redux");

var _AccountCircle = __webpack_require__(/*! material-ui-icons/AccountCircle */ "material-ui-icons/AccountCircle");

var _AccountCircle2 = _interopRequireDefault(_AccountCircle);

var _Home = __webpack_require__(/*! material-ui-icons/Home */ "material-ui-icons/Home");

var _Home2 = _interopRequireDefault(_Home);

var _AvTimer = __webpack_require__(/*! material-ui-icons/AvTimer */ "material-ui-icons/AvTimer");

var _AvTimer2 = _interopRequireDefault(_AvTimer);

var _LocationOn = __webpack_require__(/*! material-ui-icons/LocationOn */ "material-ui-icons/LocationOn");

var _LocationOn2 = _interopRequireDefault(_LocationOn);

var _index = __webpack_require__(/*! ../../commons/doctorProfileCard/index.js */ "./dev/js/components/opd/commons/doctorProfileCard/index.js");

var _index2 = _interopRequireDefault(_index);

var _reactInfiniteScroller = __webpack_require__(/*! react-infinite-scroller */ "react-infinite-scroller");

var _reactInfiniteScroller2 = _interopRequireDefault(_reactInfiniteScroller);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class DoctorsList extends _react2.default.Component {
    constructor(props) {
        super(props);
    }

    render() {

        let { DOCTORS, doctorList } = this.props;

        var doctorViewList = [];

        doctorViewList = doctorList.map((docId, i) => {
            return _react2.default.createElement(_index2.default, { details: DOCTORS[docId], selectDoctor: this.props.selectDoctor, key: i });
        });

        return _react2.default.createElement(
            'div',
            { className: 'doctorsList' },
            doctorViewList
        );
    }
}

DoctorsList.contextTypes = {
    router: () => null
};
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

var _react = __webpack_require__(/*! react */ "react");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(/*! react-redux */ "react-redux");

var _Sort = __webpack_require__(/*! material-ui-icons/Sort */ "material-ui-icons/Sort");

var _Sort2 = _interopRequireDefault(_Sort);

var _FilterList = __webpack_require__(/*! material-ui-icons/FilterList */ "material-ui-icons/FilterList");

var _FilterList2 = _interopRequireDefault(_FilterList);

var _Menu = __webpack_require__(/*! material-ui/Menu */ "material-ui/Menu");

var _Menu2 = _interopRequireDefault(_Menu);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class TopBar extends _react2.default.Component {
    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null,
            searchResults: true
        };
    }

    handleOpen(event) {
        this.setState({ anchorEl: event.currentTarget });
    }

    handleClose() {
        this.setState({ anchorEl: null });
    }

    render() {

        return _react2.default.createElement(
            'div',
            { className: 'topBar' },
            _react2.default.createElement(_Sort2.default, { className: 'iconsortfilter', onClick: this.handleOpen.bind(this) }),
            _react2.default.createElement(
                _Menu2.default,
                {
                    id: 'sort-menu',
                    anchorEl: this.state.anchorEl,
                    open: Boolean(this.state.anchorEl),
                    onClose: this.handleClose.bind(this)
                },
                _react2.default.createElement(
                    _Menu.MenuItem,
                    { onClick: this.handleClose.bind(this) },
                    'Relavance'
                ),
                _react2.default.createElement(
                    _Menu.MenuItem,
                    { onClick: this.handleClose.bind(this) },
                    'Fee'
                ),
                _react2.default.createElement(
                    _Menu.MenuItem,
                    { onClick: this.handleClose.bind(this) },
                    'Distance'
                ),
                _react2.default.createElement(
                    _Menu.MenuItem,
                    { onClick: this.handleClose.bind(this) },
                    'Apointment'
                )
            ),
            _react2.default.createElement(_FilterList2.default, { className: 'iconsortfilter', onClick: () => {
                    this.context.router.history.push({
                        pathname: '/searchresults/filter'
                    });
                } })
        );
    }
}

TopBar.contextTypes = {
    router: () => null
};
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

const APPEND_DOCTORS = exports.APPEND_DOCTORS = 'APPEND_DOCTORS';
const DOCTOR_SEARCH = exports.DOCTOR_SEARCH = 'DOCTOR_SEARCH';
const SELECT_DOCTOR = exports.SELECT_DOCTOR = 'SELECT_DOCTOR';

const TOGGLE_CONDITIONS = exports.TOGGLE_CONDITIONS = 'TOGGLE_CONDITIONS';
const TOGGLE_SPECIALITIES = exports.TOGGLE_SPECIALITIES = 'TOGGLE_SPECIALITIES';
const TOGGLE_TESTS = exports.TOGGLE_TESTS = 'TOGGLE_TESTS';
const SELECT_LOCATION = exports.SELECT_LOCATION = 'SELECT_LOCATION';
const MERGE_SEARCH_STATE_OPD = exports.MERGE_SEARCH_STATE_OPD = 'MERGE_SEARCH_STATE_OPD';
const TOGGLE_CRITERIA = exports.TOGGLE_CRITERIA = 'TOGGLE_CRITERIA';
const TOGGLE_DIAGNOSIS_CRITERIA = exports.TOGGLE_DIAGNOSIS_CRITERIA = 'TOGGLE_DIAGNOSIS_CRITERIA';
const SET_OPD_FILTERS = exports.SET_OPD_FILTERS = 'SET_OPD_FILTERS';
const SET_LABS_FILTERS = exports.SET_LABS_FILTERS = 'SET_LABS_FILTERS';
const LOAD_SEARCH_CRITERIA_OPD = exports.LOAD_SEARCH_CRITERIA_OPD = 'LOAD_SEARCH_CRITERIA_OPD';

const MERGE_SEARCH_STATE_LAB = exports.MERGE_SEARCH_STATE_LAB = 'MERGE_SEARCH_STATE_LAB';
const LOAD_SEARCH_CRITERIA_LAB = exports.LOAD_SEARCH_CRITERIA_LAB = 'LOAD_SEARCH_CRITERIA_OPD';
const APPEND_LABS = exports.APPEND_LABS = 'APPEND_LABS';
const LAB_SEARCH = exports.LAB_SEARCH = 'LAB_SEARCH';
const SELECT_LOCATION_DIAGNOSIS = exports.SELECT_LOCATION_DIAGNOSIS = 'SELECT_LOCATION_DIAGNOSIS';
const APPEND_FILTERS_DIAGNOSIS = exports.APPEND_FILTERS_DIAGNOSIS = 'APPEND_FILTERS_DIAGNOSIS';
const LAB_SEARCH_START = exports.LAB_SEARCH_START = 'LAB_SEARCH_START';

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

    render() {

        return _react2.default.createElement(_index3.default, this.props);
    }
}

SearchCriteria.contextTypes = {
    router: () => null
};
const mapStateToProps = state => {

    const {
        commonlySearchedConditions,
        selectedConditions,
        commonlySearchedSpecialities,
        selectedSpecialities,
        selectedLocation,
        selectedCriteria
    } = state.SEARCH_CRITERIA_OPD;

    return {
        commonlySearchedConditions,
        selectedConditions,
        commonlySearchedSpecialities,
        selectedSpecialities,
        selectedLocation,
        selectedCriteria
    };
};

const mapDispatchToProps = dispatch => {
    return {
        toggleCondition: id => dispatch((0, _index.toggleCondition)(id)),
        toggleSpeciality: id => dispatch((0, _index.toggleSpeciality)(id)),
        toggleCriteria: criteria => dispatch((0, _index.toggleCriteria)(criteria)),
        loadSearchCriteria: () => dispatch((0, _index.loadSearchCriteria)())
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

const mapStateToProps = state => {

    const {
        selectedConditions,
        selectedSpecialities,
        selectedLocation,
        selectedCriteria,
        filterCriteria,
        CRITERIA_LOADED
    } = state.SEARCH_CRITERIA_OPD;

    let DOCTORS = state.DOCTORS;
    let { doctorList, LOADING, ERROR } = state.DOCTOR_SEARCH;

    return {
        DOCTORS, doctorList, LOADING, ERROR,
        selectedConditions,
        selectedSpecialities,
        selectedLocation,
        selectedCriteria,
        filterCriteria,
        CRITERIA_LOADED
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getDoctors: (searchState, filterState, mergeState) => dispatch((0, _index.getDoctors)(searchState, filterState, mergeState))
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
        case _types.DOCTOR_SEARCH:
            {
                let newState = _extends({}, state);

                newState.doctorList = action.payload.map(doc => doc.id);
                newState.LOADING = false;

                return newState;
            }

    }

    return state;
};

var _types = __webpack_require__(/*! ../../constants/types */ "./dev/js/constants/types.js");

const defaultState = {
    doctorList: [],
    LOADING: true,
    ERROR: null
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

                newState.CRITERIA_LOADED = true;
                newState.filterCriteria = {};

                return newState;
            }

        case _types.TOGGLE_CONDITIONS:
            {
                let newState = _extends({}, state, {
                    selectedConditions: _extends({}, state.selectedConditions)
                });

                if (newState.selectedConditions[action.payload.id]) {
                    delete newState.selectedConditions[action.payload.id];
                } else {
                    newState.selectedConditions[action.payload.id] = new Date();
                }
                return newState;
            }

        case _types.TOGGLE_SPECIALITIES:
            {
                let newState = _extends({}, state, {
                    selectedSpecialities: _extends({}, state.selectedSpecialities)
                });

                if (newState.selectedSpecialities[action.payload.id]) {
                    delete newState.selectedSpecialities[action.payload.id];
                } else {
                    newState.selectedSpecialities[action.payload.id] = new Date();
                }

                return newState;
            }

        case _types.TOGGLE_CRITERIA:
            {
                let newState = _extends({}, state, {
                    selectedCriteria: _extends({}, state.selectedCriteria)
                });

                if (newState.selectedCriteria[action.payload.id]) {
                    delete newState.selectedCriteria[action.payload.id];
                } else {
                    action.payload.ts = new Date();
                    newState.selectedCriteria[action.payload.id] = action.payload;
                }

                return newState;
            }

        case _types.SELECT_LOCATION:
            {
                let newState = _extends({}, state);

                newState.selectedLocation = action.payload;
                return newState;
            }

        case _types.SET_OPD_FILTERS:
            {
                let newState = _extends({}, state);

                newState.filterCriteria = action.payload;
                return newState;
            }

        case _types.MERGE_SEARCH_STATE_OPD:
            {
                let newState = _extends({}, state);

                newState = Object.assign(newState, action.payload);
                newState.CRITERIA_LOADED = true;
                return newState;
            }
    }
    return state;
};

var _types = __webpack_require__(/*! ../../constants/types */ "./dev/js/constants/types.js");

const defaultState = {
    commonlySearchedConditions: [{ id: 1, name: 'Headache' }, { id: 2, name: 'Stomach-ache' }, { id: 3, name: 'Flu' }, { id: 4, name: 'Hair Fall' }, { id: 5, name: 'Chest Pain' }],
    selectedConditions: {},
    commonlySearchedSpecialities: [{ id: 1, name: 'General Physicial' }, { id: 2, name: 'Neurology' }, { id: 3, name: 'Cardiologist' }, { id: 4, name: 'Orthopaedic' }, { id: 5, name: 'Infertility' }],
    selectedSpecialities: {},
    selectedCriteria: {},
    selectedLocation: null,
    filterCriteria: {},
    CRITERIA_LOADED: false
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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const routes = [{ path: '/', exact: true, component: _SearchCriteria2.default }, { path: '/locationsearch', exact: true, component: _LocationSearch2.default }, { path: '/criteriasearch', exact: true, component: _CriteriaSearch2.default }, { path: '/searchresults', exact: true, component: _SearchResults2.default }, { path: '/searchresults/filter', exact: true, component: _SearchResultsFilter2.default }, { path: '/doctorprofile/:id', exact: true, component: _DoctorProfile2.default }, { path: '/doctorprofile/:id/availability', exact: true, component: _ClinicList2.default }, { path: '/doctorprofile/:id/:clinicId/book', exact: true, component: _AppointmentSlot2.default }, { path: '/doctorprofile/:id/:clinicId/bookdetails', exact: true, component: _PatientDetails2.default }, { path: '/user/signup', exact: true, component: _UserSignup2.default }, { path: '/user', exact: true, component: _UserProfile2.default }, { path: '/user/:id', exact: true, component: _UserProfile2.default }, { path: '/user/:id/appointments', exact: true, component: _UserAppointments2.default }, { path: '/user/:id/reports', exact: true, component: _UserReports2.default }, { path: '/chat', exact: true, component: _Chat2.default }, { path: '/payment', exact: true, component: _Payment2.default }, { path: '/booking/:refId', exact: true, component: _Booking2.default }, { path: '/dx', exact: true, component: _SearchCriteria4.default }, { path: '/dx/searchresults', exact: true, component: _SearchResults4.default }, { path: '/lab/:id', exact: true, component: _Lab2.default }, { path: '/lab/:id/tests', exact: true, component: _TestSelector2.default }, { path: '/lab/:id/book', exact: true, component: _BookingSummary2.default }, { path: '/lab/booking/summary/:id', exact: true, component: _BookingSummary2.default }];

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

/***/ "material-ui-icons/FilterList":
/*!***********************************************!*\
  !*** external "material-ui-icons/FilterList" ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("material-ui-icons/FilterList");

/***/ }),

/***/ "material-ui-icons/Home":
/*!*****************************************!*\
  !*** external "material-ui-icons/Home" ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("material-ui-icons/Home");

/***/ }),

/***/ "material-ui-icons/KeyboardArrowRight":
/*!*******************************************************!*\
  !*** external "material-ui-icons/KeyboardArrowRight" ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("material-ui-icons/KeyboardArrowRight");

/***/ }),

/***/ "material-ui-icons/LocationOn":
/*!***********************************************!*\
  !*** external "material-ui-icons/LocationOn" ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("material-ui-icons/LocationOn");

/***/ }),

/***/ "material-ui-icons/Payment":
/*!********************************************!*\
  !*** external "material-ui-icons/Payment" ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("material-ui-icons/Payment");

/***/ }),

/***/ "material-ui-icons/Sort":
/*!*****************************************!*\
  !*** external "material-ui-icons/Sort" ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("material-ui-icons/Sort");

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

/***/ "react-infinite-scroller":
/*!******************************************!*\
  !*** external "react-infinite-scroller" ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-infinite-scroller");

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2FjdGlvbnMvY29tbW9ucy9hdXRoLmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9hY3Rpb25zL2NvbW1vbnMvdXNlci5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvYWN0aW9ucy9kaWFnbm9zaXMvbGFiU2VhcmNoLmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9hY3Rpb25zL2RpYWdub3Npcy9zZWFyY2hDcml0ZXJpYS5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvYWN0aW9ucy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvYWN0aW9ucy9vcGQvZG9jdG9yU2VhcmNoLmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9hY3Rpb25zL29wZC9zZWFyY2hDcml0ZXJpYS5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvYXBpL2FwaS5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9jb21tb25zL0xvYWRlci9Mb2FkZXIuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvY29tbW9ucy9Mb2FkZXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvY29tbW9ucy9jaGF0L0NoYXRWaWV3LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL2NvbW1vbnMvY2hhdC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9jb21tb25zL3Byb2ZpbGVTbGlkZXIvUHJvZmlsZVNsaWRlci5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9jb21tb25zL3Byb2ZpbGVTbGlkZXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvY29tbW9ucy90aW1lU2xvdFNlbGVjdG9yL1RpbWVTbG90U2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvY29tbW9ucy90aW1lU2xvdFNlbGVjdG9yL2luZGV4LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL2NvbW1vbnMvdXNlckFwcG9pbnRtZW50cy9Vc2VyQXBwb2ludG1lbnRzVmlldy5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9jb21tb25zL3VzZXJBcHBvaW50bWVudHMvYXBwb2ludG1lbnRMaXN0L0FwcG9pbnRtZW50TGlzdC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9jb21tb25zL3VzZXJBcHBvaW50bWVudHMvYXBwb2ludG1lbnRMaXN0L2luZGV4LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL2NvbW1vbnMvdXNlckFwcG9pbnRtZW50cy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9jb21tb25zL3VzZXJQcm9maWxlL1VzZXJQcm9maWxlVmlldy5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9jb21tb25zL3VzZXJQcm9maWxlL2luZGV4LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL2NvbW1vbnMvdXNlclByb2ZpbGUvcHJvZmlsZURhdGEvUHJvZmlsZURhdGEuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvY29tbW9ucy91c2VyUHJvZmlsZS9wcm9maWxlRGF0YS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9jb21tb25zL3VzZXJSZXBvcnRzL1VzZXJSZXBvcnRzVmlldy5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9jb21tb25zL3VzZXJSZXBvcnRzL2luZGV4LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL2NvbW1vbnMvdXNlclJlcG9ydHMvcmVwb3J0TGlzdC9SZXBvcnRMaXN0LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL2NvbW1vbnMvdXNlclJlcG9ydHMvcmVwb3J0TGlzdC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9jb21tb25zL3VzZXJTaWdudXAvVXNlclNpZ251cC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9jb21tb25zL3VzZXJTaWdudXAvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvZGlhZ25vc2lzL2Jvb2tpbmdTdW1tYXJ5L0Jvb2tpbmdTdW1tYXJ5Vmlldy5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9kaWFnbm9zaXMvYm9va2luZ1N1bW1hcnkvY2hvb3NlUGF0aWVudC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9kaWFnbm9zaXMvYm9va2luZ1N1bW1hcnkvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvZGlhZ25vc2lzL2Jvb2tpbmdTdW1tYXJ5L3BpY2t1cEFkZHJlc3MuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvZGlhZ25vc2lzL2Jvb2tpbmdTdW1tYXJ5L3Zpc2l0VGltZS5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9kaWFnbm9zaXMvY29tbW9ucy9jb21tb25seVNlYXJjaGVkL0NvbW1vbmx5U2VhcmNoZWQuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvZGlhZ25vc2lzL2NvbW1vbnMvY29tbW9ubHlTZWFyY2hlZC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9kaWFnbm9zaXMvY29tbW9ucy9sYWJEZXRhaWxzL0xhYkRldGFpbC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9kaWFnbm9zaXMvY29tbW9ucy9sYWJEZXRhaWxzL2luZGV4LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL2RpYWdub3Npcy9jb21tb25zL2xhYlByb2ZpbGVDYXJkL0xhYlByb2ZpbGVDYXJkLmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL2RpYWdub3Npcy9jb21tb25zL2xhYlByb2ZpbGVDYXJkL2luZGV4LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL2RpYWdub3Npcy9jb21tb25zL2xhYlRlc3RzL2luZGV4LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL2RpYWdub3Npcy9jb21tb25zL2xhYlRlc3RzL2xhYlRlc3RzLmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL2RpYWdub3Npcy9jb21tb25zL29yZGVyRGV0YWlscy9PcmRlckRldGFpbHMuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvZGlhZ25vc2lzL2NvbW1vbnMvb3JkZXJEZXRhaWxzL2luZGV4LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL2RpYWdub3Npcy9jcml0ZXJpYVNlYXJjaC9Dcml0ZXJpYVNlYXJjaFZpZXcuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvZGlhZ25vc2lzL2NyaXRlcmlhU2VhcmNoL2luZGV4LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL2RpYWdub3Npcy9sYWIvTGFiVmlldy5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9kaWFnbm9zaXMvbGFiL2luZGV4LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL2RpYWdub3Npcy9wYXRpZW50RGV0YWlscy9QYXRpZW50RGV0YWlsc1ZpZXcuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvZGlhZ25vc2lzL3BhdGllbnREZXRhaWxzL2FkZHJlc3NGb3JtL0FkZHJlc3NGb3JtLmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL2RpYWdub3Npcy9wYXRpZW50RGV0YWlscy9hZGRyZXNzRm9ybS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9kaWFnbm9zaXMvcGF0aWVudERldGFpbHMvZGV0YWlsc0Zvcm0vRGV0YWlsc0Zvcm0uanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvZGlhZ25vc2lzL3BhdGllbnREZXRhaWxzL2RldGFpbHNGb3JtL2luZGV4LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL2RpYWdub3Npcy9wYXRpZW50RGV0YWlscy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9kaWFnbm9zaXMvc2VhcmNoQ3JpdGVyaWEvU2VhcmNoQ3JpdGVyaWFWaWV3LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL2RpYWdub3Npcy9zZWFyY2hDcml0ZXJpYS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9kaWFnbm9zaXMvc2VhcmNoUmVzdWx0cy9TZWFyY2hSZXN1bHRzVmlldy5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9kaWFnbm9zaXMvc2VhcmNoUmVzdWx0cy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9kaWFnbm9zaXMvc2VhcmNoUmVzdWx0cy9sYWJzTGlzdC9MYWJzTGlzdC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9kaWFnbm9zaXMvc2VhcmNoUmVzdWx0cy9sYWJzTGlzdC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9kaWFnbm9zaXMvc2VhcmNoUmVzdWx0cy90b3BCYXIvVG9wQmFyLmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL2RpYWdub3Npcy9zZWFyY2hSZXN1bHRzL3RvcEJhci9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9kaWFnbm9zaXMvdGVzdFNlbGVjdG9yL1Rlc3RTZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9kaWFnbm9zaXMvdGVzdFNlbGVjdG9yL2luZGV4LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL29wZC9hcHBvaW50bWVudFNsb3QvQXBwb2ludG1lbnRTbG90LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL29wZC9hcHBvaW50bWVudFNsb3QvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvb3BkL2Jvb2tpbmcvQm9va2luZ1ZpZXcuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvb3BkL2NsaW5pY0xpc3QvQ2xpbmljTGlzdFZpZXcuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvb3BkL2NsaW5pY0xpc3QvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvb3BkL2NvbW1vbnMvY2xpbmljU2VsZWN0b3IvQ2xpbmljU2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvb3BkL2NvbW1vbnMvY2xpbmljU2VsZWN0b3IvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvb3BkL2NvbW1vbnMvY29tbW9ubHlTZWFyY2hlZC9Db21tb25seVNlYXJjaGVkLmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL29wZC9jb21tb25zL2NvbW1vbmx5U2VhcmNoZWQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvb3BkL2NvbW1vbnMvY3JpdGVyaWFTZWxlY3Rvci9Dcml0ZXJpYVNlbGVjdG9yLmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL29wZC9jb21tb25zL2NyaXRlcmlhU2VsZWN0b3IvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvb3BkL2NvbW1vbnMvZG9jdG9yUHJvZmlsZUNhcmQvRG9jdG9yUHJvZmlsZUNhcmQuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvb3BkL2NvbW1vbnMvZG9jdG9yUHJvZmlsZUNhcmQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvb3BkL2NvbW1vbnMvc2VsZWN0ZWRDbGluaWMvU2VsZWN0ZWRDbGluaWMuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvb3BkL2NvbW1vbnMvc2VsZWN0ZWRDbGluaWMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvb3BkL2NyaXRlcmlhU2VhcmNoL0NyaXRlcmlhU2VhcmNoVmlldy5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9vcGQvY3JpdGVyaWFTZWFyY2gvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvb3BkL2RvY3RvclByb2ZpbGUvRG9jdG9yUHJvZmlsZVZpZXcuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvb3BkL2RvY3RvclByb2ZpbGUvYWJvdXREb2N0b3IvQWJvdXREb2N0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvb3BkL2RvY3RvclByb2ZpbGUvYWJvdXREb2N0b3IvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvb3BkL2RvY3RvclByb2ZpbGUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvb3BkL2RvY3RvclByb2ZpbGUvcHJvZmVzc2lvbmFsR3JhcGgvUHJvZmVzc2lvbmFsR3JhcGguanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvb3BkL2RvY3RvclByb2ZpbGUvcHJvZmVzc2lvbmFsR3JhcGgvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvb3BkL2xvY2F0aW9uU2VhcmNoL0xvY2F0aW9uU2VhcmNoLmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL29wZC9sb2NhdGlvblNlYXJjaC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9vcGQvcGF0aWVudERldGFpbHMvUGF0aWVudERldGFpbHMuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvb3BkL3BhdGllbnREZXRhaWxzL2RldGFpbHNGb3JtL0RldGFpbHNGb3JtLmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL29wZC9wYXRpZW50RGV0YWlscy9kZXRhaWxzRm9ybS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9vcGQvcGF0aWVudERldGFpbHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvb3BkL3BheW1lbnQvUGF5bWVudFZpZXcuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvb3BkL3NlYXJjaENyaXRlcmlhL1NlYXJjaENyaXRlcmlhVmlldy5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9vcGQvc2VhcmNoQ3JpdGVyaWEvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvb3BkL3NlYXJjaFJlc3VsdHMvU2VhcmNoUmVzdWx0c1ZpZXcuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvb3BkL3NlYXJjaFJlc3VsdHMvZG9jdG9yc0xpc3QvRG9jdG9yc0xpc3QuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvb3BkL3NlYXJjaFJlc3VsdHMvZG9jdG9yc0xpc3QvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvb3BkL3NlYXJjaFJlc3VsdHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvb3BkL3NlYXJjaFJlc3VsdHMvdG9wQmFyL1RvcEJhci5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9vcGQvc2VhcmNoUmVzdWx0cy90b3BCYXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvb3BkL3NlYXJjaFJlc3VsdHNGaWx0ZXIvU2VhcmNoUmVzdWx0c0ZpbHRlci5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9vcGQvc2VhcmNoUmVzdWx0c0ZpbHRlci9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29uc3RhbnRzL3R5cGVzLmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb250YWluZXJzL2NvbW1vbnMvQ2hhdC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29udGFpbmVycy9jb21tb25zL1VzZXJBcHBvaW50bWVudHMuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbnRhaW5lcnMvY29tbW9ucy9Vc2VyUHJvZmlsZS5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29udGFpbmVycy9jb21tb25zL1VzZXJSZXBvcnRzLmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb250YWluZXJzL2NvbW1vbnMvVXNlclNpZ251cC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29udGFpbmVycy9kaWFnbm9zaXMvQm9va2luZ1N1bW1hcnkuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbnRhaW5lcnMvZGlhZ25vc2lzL0xhYi5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29udGFpbmVycy9kaWFnbm9zaXMvUGF0aWVudERldGFpbHMuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbnRhaW5lcnMvZGlhZ25vc2lzL1NlYXJjaENyaXRlcmlhLmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb250YWluZXJzL2RpYWdub3Npcy9TZWFyY2hSZXN1bHRzLmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb250YWluZXJzL2RpYWdub3Npcy9UZXN0U2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbnRhaW5lcnMvb3BkL0FwcG9pbnRtZW50U2xvdC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29udGFpbmVycy9vcGQvQm9va2luZy5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29udGFpbmVycy9vcGQvQ2xpbmljTGlzdC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29udGFpbmVycy9vcGQvQ3JpdGVyaWFTZWFyY2guanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbnRhaW5lcnMvb3BkL0RvY3RvclByb2ZpbGUuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbnRhaW5lcnMvb3BkL0xvY2F0aW9uU2VhcmNoLmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb250YWluZXJzL29wZC9QYXRpZW50RGV0YWlscy5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29udGFpbmVycy9vcGQvUGF5bWVudC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29udGFpbmVycy9vcGQvU2VhcmNoQ3JpdGVyaWEuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbnRhaW5lcnMvb3BkL1NlYXJjaFJlc3VsdHMuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbnRhaW5lcnMvb3BkL1NlYXJjaFJlc3VsdHNGaWx0ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2hlbHBlcnMvbmF2aWdhdGUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2hlbHBlcnMvbmF2aWdhdGUvbmF2aWdhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2hlbHBlcnMvc3RvcmFnZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvaGVscGVycy9zdG9yYWdlL3N0b3JhZ2UuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL3JlZHVjZXJzL2NvbW1vbnMvYXV0aC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvcmVkdWNlcnMvY29tbW9ucy91c2VyLmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9yZWR1Y2Vycy9kaWFnbm9zaXMvbGFicy5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvcmVkdWNlcnMvZGlhZ25vc2lzL2xhYnNTZWFyY2guanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL3JlZHVjZXJzL2RpYWdub3Npcy9zZWFyY2hDcml0ZXJpYS5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvcmVkdWNlcnMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL3JlZHVjZXJzL29wZC9kb2N0b3JTZWFyY2guanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL3JlZHVjZXJzL29wZC9kb2N0b3JzLmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9yZWR1Y2Vycy9vcGQvc2VhcmNoQ3JpdGVyaWEuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL3JvdXRlcy5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvdXRpbHMvZGF0ZVRpbWVVdGlscy5qcyIsIndlYnBhY2s6Ly8vLi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJheGlvc1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcImV4cHJlc3NcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJodHRwXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibWF0ZXJpYWwtdWktaWNvbnMvQWNjb3VudENpcmNsZVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIm1hdGVyaWFsLXVpLWljb25zL0F0dGFjaE1vbmV5XCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibWF0ZXJpYWwtdWktaWNvbnMvQXZUaW1lclwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIm1hdGVyaWFsLXVpLWljb25zL0NhbGxcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJtYXRlcmlhbC11aS1pY29ucy9FeHBhbmRNb3JlXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibWF0ZXJpYWwtdWktaWNvbnMvRmlsdGVyTGlzdFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIm1hdGVyaWFsLXVpLWljb25zL0hvbWVcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJtYXRlcmlhbC11aS1pY29ucy9LZXlib2FyZEFycm93UmlnaHRcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJtYXRlcmlhbC11aS1pY29ucy9Mb2NhdGlvbk9uXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibWF0ZXJpYWwtdWktaWNvbnMvUGF5bWVudFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIm1hdGVyaWFsLXVpLWljb25zL1NvcnRcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJtYXRlcmlhbC11aS9DaGVja2JveFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIm1hdGVyaWFsLXVpL0NoaXBcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJtYXRlcmlhbC11aS9FeHBhbnNpb25QYW5lbFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIm1hdGVyaWFsLXVpL0Zvcm1cIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJtYXRlcmlhbC11aS9NZW51XCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibWF0ZXJpYWwtdWkvUHJvZ3Jlc3NcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJtYXRlcmlhbC11aS9SYWRpb1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcIm1hdGVyaWFsLXVpL1N0ZXBwZXJcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJtYXRlcmlhbC11aS9zdHlsZXNcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJwYXRoXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmMtc2xpZGVyL2xpYi9SYW5nZVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInJlYWN0XCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVhY3QtZG9tL3NlcnZlclwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInJlYWN0LWluZmluaXRlLXNjcm9sbGVyXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVhY3QtanNzL2xpYi9Kc3NQcm92aWRlclwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInJlYWN0LWpzcy9saWIvanNzXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVhY3QtcmVkdXhcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWFjdC1yb3V0ZXJcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWFjdC1yb3V0ZXItZG9tXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVhY3QtdHJhbnNpdGlvbi1ncm91cFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInJlZHV4XCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVkdXgtbG9nZ2VyXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVkdXgtdGh1bmtcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ1bml2ZXJzYWwtY29va2llXCIiXSwibmFtZXMiOlsic2VuZE9UUCIsIm51bWJlciIsImNiIiwiZGlzcGF0Y2giLCJ0eXBlIiwicGF5bG9hZCIsInBob25lTnVtYmVyIiwidGhlbiIsInJlc3BvbnNlIiwiZXhpc3RzIiwiZXJyb3JfbWVzc2FnZSIsImNhdGNoIiwiZXJyb3IiLCJtZXNzYWdlIiwic3VibWl0T1RQIiwib3RwIiwic2V0QXV0aFRva2VuIiwidG9rZW4iLCJnZXRVc2VyUHJvZmlsZSIsInByb2ZpbGVzIiwiZ2V0VXNlclByb2ZpbGVXaXRoQXBwb2ludG1lbnRzIiwiZ2V0VXNlclByb2ZpbGVXaXRoVGVzdHMiLCJnZXRMYWJzIiwic2VhcmNoU3RhdGUiLCJmaWx0ZXJDcml0ZXJpYSIsIm1lcmdlU3RhdGUiLCJ0ZXN0SWRzIiwic2VsZWN0ZWRDcml0ZXJpYXMiLCJmaWx0ZXIiLCJ4IiwicmVkdWNlIiwiZmluYWxTdHIiLCJjdXJyIiwiaSIsImlkIiwibGF0IiwibG9uZyIsInNlbGVjdGVkTG9jYXRpb24iLCJnZW9tZXRyeSIsImxvY2F0aW9uIiwibG5nIiwibWluX2Rpc3RhbmNlIiwiZGlzdGFuY2VSYW5nZSIsIm1heF9kaXN0YW5jZSIsIm1pbl9wcmljZSIsInByaWNlUmFuZ2UiLCJtYXhfcHJpY2UiLCJvcmRlcl9ieSIsInNvcnRCeSIsInVybCIsImdldExhYkJ5SWQiLCJsYWJJZCIsImdldExhYlRpbWVTbG90cyIsImNhbGxiYWNrIiwiZ2V0TGFiQm9va2luZ1N1bW1hcnkiLCJib29raW5nSWQiLCJsb2FkTGFiQ29tbW9uQ3JpdGVyaWFzIiwidG9nZ2xlRGlhZ25vc2lzQ3JpdGVyaWEiLCJjcml0ZXJpYSIsImdldERpYWdub3Npc0NyaXRlcmlhUmVzdWx0cyIsInNlYXJjaFN0cmluZyIsIlNFQVJDSF9DUklURVJJQV9PUEQiLCJTRUFSQ0hfQ1JJVEVSSUFfTEFCUyIsIkRPQ1RPUlNfQUNUSU9OUyIsIkxBQlNfQUNUSU9OUyIsIlVTRVJfQUNUSU9OUyIsIkFVVEhfQUNUSU9OUyIsIm1vZHVsZSIsImV4cG9ydHMiLCJPYmplY3QiLCJhc3NpZ24iLCJnZXREb2N0b3JzIiwiZmlsdGVyU3RhdGUiLCJkb2N0b3JzIiwic2VhcmNoU3RhdGVQYXJhbSIsImVuY29kZVVSSUNvbXBvbmVudCIsIkpTT04iLCJzdHJpbmdpZnkiLCJmaWx0ZXJTdGF0ZVBhcmFtIiwiaGlzdG9yeSIsInJlcGxhY2VTdGF0ZSIsImdldERvY3RvckJ5SWQiLCJkb2N0b3JJZCIsImRvY3RvciIsImRvYyIsImdldFRpbWVTbG90cyIsImNsaW5pY0lkIiwibG9hZFNlYXJjaENyaXRlcmlhIiwidG9nZ2xlQ29uZGl0aW9uIiwidG9nZ2xlU3BlY2lhbGl0eSIsInRvZ2dsZUNyaXRlcmlhIiwic2VsZWN0TG9jYXRpb24iLCJtZXJnZVNlYXJjaFN0YXRlIiwic3RhdGUiLCJnZXRDcml0ZXJpYVJlc3VsdHMiLCJzZXRPUERGaWx0ZXJzIiwiZmlsdGVyRGF0YSIsImF4aW9zSW5zdGFuY2UiLCJjcmVhdGUiLCJiYXNlVVJMIiwiaGVhZGVyIiwicmVqZWN0SGFuZGxlciIsIkFQSV9HRVQiLCJnZXRBdXRoVG9rZW4iLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsIm1ldGhvZCIsInJlcyIsImRhdGEiLCJBUElfUE9TVCIsImhlYWRlcnMiLCJBUElfUFVUIiwiQVBJX0RFTEVURSIsIkxvYWRlciIsIkNvbXBvbmVudCIsImNvbnN0cnVjdG9yIiwicHJvcHMiLCJyZW5kZXIiLCJJZnJhbVN0eWxlIiwid2lkdGgiLCJoZWlnaHQiLCJDaGF0VmlldyIsImNvbnRleHRUeXBlcyIsInJvdXRlciIsIlByb2ZpbGVTbGlkZXIiLCJzd2l0Y2hVc2VyIiwicHJvZmlsZUlkIiwiY29udGV4dCIsInB1c2giLCJzdWJSb3V0ZSIsImtleXMiLCJtYXAiLCJzcmMiLCJwcm9maWxlSW1hZ2UiLCJiaW5kIiwiVGltZVNsb3RTZWxlY3RvciIsInNlbGVjdGVkRGF5Iiwic2VsZWN0ZWRJbnRlcnZhbCIsInNlbGVjdGVkVGltZVNsb3QiLCJjb21wb25lbnRXaWxsTW91bnQiLCJ0aW1lU2xvdHMiLCJzZXREZWZhdWx0U2VsZWN0ZWQiLCJkYXlzIiwiZGF0ZXMiLCJkZWZhdWx0RGF5SW5kZXgiLCJnZXRGaXJzdEF2YWlsYWJsZURheSIsInNldFN0YXRlIiwiZGVmYXV0SW50ZXJ3YWxJbmRleCIsImdldEZpcnN0QXZhaWxhYmxlSW50ZXJ3YWwiLCJpbnRlcnZhbHMiLCJkZWZhdWx0VGltZVNsb3RJbmRleCIsImdldEZpcnN0QXZhaWxhYmxlVGltZVNsb3QiLCJpbnRlcndhbEluZGV4IiwiaW50ZXJ3YWwiLCJpc0F2YWlsYWJsZSIsInBhcnNlSW50IiwidGltZVNsb3RJbmRleCIsInRpbWVTbG90Iiwic2VsZWN0VGltZVNsb3QiLCJkYXlJbmRleCIsImRheSIsIm9uRGF0ZUNsaWNrIiwiZGF0ZSIsInNlbGVjdGVkSW5kZXgiLCJpbmRleCIsImF2YWlsYWJsZUludGVyd2FsIiwiYXZhaWxhYmxlVGltZVNsb3QiLCJvbkludGVydmFsQ2xpY2siLCJvblRpbWVTbG90Q2xpY2siLCJkYXRlTGlzdCIsImRheURhdGUiLCJEYXRlIiwiZ2V0RGF0ZSIsImRheU5hbWUiLCJzZWxlY3RlZCIsImludGVydmFsIiwibmFtZSIsInNsb3QiLCJzbG90VGV4dCIsInN0YXJ0IiwiZW5kIiwiVXNlckFwcG9pbnRtZW50c1ZpZXciLCJjb21wb25lbnREaWRNb3VudCIsImNvbXBhcmVEYXRlV2l0aFRvZGF5IiwidG9kYXkiLCJnZXRUaW1lIiwic2VsZWN0ZWRVc2VyIiwidXNlclByb2ZpbGVJZCIsIm1hdGNoIiwicGFyYW1zIiwiVVNFUiIsImlzRGVmYXVsdFVzZXIiLCJhcHBvaW50bWVudHMiLCJhcHBvaW50bWVudCIsIkFwcG9pbnRtZW50TGlzdCIsInVuaXhfdGltZXN0YW1wIiwiaG91cnMiLCJnZXRIb3VycyIsIm1pbnV0ZXMiLCJnZXRNaW51dGVzIiwic3Vic3RyIiwiZG9jdG9yTmFtZSIsInRvRGF0ZVN0cmluZyIsIlVzZXJQcm9maWxlVmlldyIsIlByb2ZpbGVEYXRhIiwib3BlbkFwcG9pbnRtZW50cyIsIm9wZW5SZXBvcnRzIiwiZ2VuZGVyIiwiYWdlIiwibW9iaWxlIiwibWVkaWNhbEhpc3RvcnlDb3VudCIsIm1lZGljYWxUZXN0Q291bnQiLCJvbmxpbmVDb25zdWx0YXRpb25Db3VudCIsIm9wZFZpc2l0Q291bnQiLCJwcm9maWxlRGF0YSIsIlVzZXJSZXBvcnRzVmlldyIsInRlc3RzIiwidGVzdCIsIlJlcG9ydExpc3QiLCJzdWJfbmFtZSIsImFiYnJldmlhdGlvbiIsImNhdGVnb3J5IiwiVXNlclNpZ251cFZpZXciLCJhcHBvaW5tZW50Rm9yIiwicGF0aWVudE5hbWUiLCJlbWFpbCIsImlucHV0SGFuZGxlciIsImUiLCJ0YXJnZXQiLCJ2YWx1ZSIsInN1Ym1pdEZvcm0iLCJCb29raW5nU3VtbWFyeVZpZXciLCJzZWxlY3RlZExhYiIsInBpY2t1cFR5cGUiLCJvcGVuVGVzdHMiLCJoYW5kbGVQaWNrdXBUeXBlIiwiZ2V0U2VsZWN0b3JzIiwiZmluYWxQcmljZSIsImxhYkRldGFpbCIsIkxBQlMiLCJsYWIiLCJwcmljZSIsInR3cCIsInRlc3RfaWQiLCJtcnAiLCJnbyIsImFkZHJlc3MiLCJDaG9vc2VQYXRpZW50IiwiUGlja3VwQWRkcmVzcyIsIlZpc2l0VGltZSIsIkNvbW1vbmx5U2VhcmNoZWQiLCJyb3dzIiwicm93IiwidG9nZ2xlIiwiZGl2Q2xhc3MiLCJ1bENsYXNzIiwiaGVhZGluZyIsIkxhYkRldGFpbHMiLCJMYWJQcm9maWxlQ2FyZCIsIm9wZW5MYWIiLCJkZXRhaWxzIiwiTGFiVGVzdHMiLCJsZW5ndGgiLCJzbGljZSIsIk9yZGVyRGV0YWlscyIsInByaWNlX2JyZWFrdXAiLCJ0b3RhbFByaWNlIiwidG90YWxUZXN0cyIsImJyZWFrdXAiLCJhbW91bnQiLCJkZWJvdW5jZXIiLCJmbiIsImRlbGF5IiwidGltZXIiLCJjbGVhclRpbWVvdXQiLCJzZXRUaW1lb3V0IiwiY2FsbCIsIkNyaXRlcmlhU2VhcmNoVmlldyIsInNlYXJjaFZhbHVlIiwic2VhcmNoUmVzdWx0cyIsImdldFNlYXJjaFJlc3VsdHMiLCJpbnB1dCIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJhZGRDcml0ZXJpYSIsImZvcm1hdHRlZF9hZGRyZXNzIiwiY2hlY2tGb3JMb2FkIiwiY2hpbGRyZW4iLCJMYWJWaWV3IiwiYm9va0xhYiIsIlBhdGllbnREZXRhaWxzVmlldyIsInNlbGVjdGVkVGVzdHMiLCJzZWxlY3RlZFNsb3QiLCJzZWxlY3RlZFNsb3RTdGFydCIsInNlbGVjdGVkU2xvdEVuZCIsImdldExvY2F0aW9uUGFyYW0iLCJ0YWciLCJwYXJhbVN0cmluZyIsInNlYXJjaCIsIlVSTFNlYXJjaFBhcmFtcyIsImdldCIsInByb2NlZWQiLCJwYXJzZUZsb2F0IiwidG9TdHJpbmciLCJBZGRyZXNzRm9ybSIsImxvY2FsaXR5IiwibGFuZG1hcmsiLCJwaW5jb2RlIiwiY2l0eSIsIndoaWNoIiwiRGV0YWlsc0Zvcm0iLCJwYXRpZW50RW1haWwiLCJwYXRpZW50R2VuZGVyIiwicGF0aWVudE1vYmlsZSIsIlNlYXJjaENyaXRlcmlhVmlldyIsInNlYXJjaFByb2NlZWQiLCJzZWFyY2hEYXRhIiwiTE9BREVEX1NFQVJDSF9DUklURVJJQV9MQUIiLCJjb21tb25fdGVzdHMiLCJjb21tb25fY29uZGl0aW9ucyIsInByZWZlcnJlZF9sYWJzIiwiU2VhcmNoUmVzdWx0c1ZpZXciLCJwYXJzZSIsImdldExhYkxpc3QiLCJjb25zb2xlIiwiYXBwbHlGaWx0ZXJzIiwicmVwbGFjZSIsIkxPQURFRF9MQUJTX1NFQVJDSCIsIkxhYnNMaXN0IiwibGFiTGlzdCIsIlRvcEJhciIsImFuY2hvckVsIiwib3BlbkZpbHRlciIsImNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMiLCJoYW5kbGVPcGVuIiwiZXZlbnQiLCJjdXJyZW50VGFyZ2V0IiwiaGFuZGxlQ2xvc2UiLCJ0b2dnbGVGaWx0ZXIiLCJoYW5kbGVSYW5nZSIsInJhbmdlIiwiZ2V0Q3JpdGVyaWFTdHJpbmciLCJmaW5hbCIsImNyaXRlcmlhU3RyIiwiQm9vbGVhbiIsInN0b3BQcm9wYWdhdGlvbiIsInByZXZlbnREZWZhdWx0IiwiVGVzdFNlbGVjdG9yVmlldyIsInRvZ2dsZVRlc3QiLCJsYWJEYXRhIiwiaW5kZXhPZiIsIkFwcG9pbnRtZW50U2xvdCIsInNlbGVjdGVkRG9jdG9yIiwic2VsZWN0ZWRDbGluaWMiLCJET0NUT1JTIiwiQm9va2luZ1ZpZXciLCJDbGluaWNMaXN0VmlldyIsIkNsaW5pY1NlbGVjdG9yIiwic2VsZWN0Q2xpbmljIiwiZ2V0QXZhaWxhYmlsaXR5IiwiYXZhaWxhYmlsaXR5IiwibmV4dEF2YWlsYWJsZSIsImZyb20iLCJ0aW1lU3RhcnQiLCJ0aW1lRW5kIiwidG8iLCJmZWUiLCJjbGluaWMiLCJ0aW1lQXZhaWxhYmxlIiwicGlsbHMiLCJwaWxsIiwidG9nZ2xlUGlsbCIsIkNyaXRlcmlhU2VsZWN0b3IiLCJoYW5kbGVEZWxldGUiLCJoYW5kbGVyIiwiY29uZGl0aW9ucyIsInNwZWNpYWxpdGllcyIsImNyaXRlcmlhcyIsImNvbW1vbmx5U2VhcmNoZWRDb25kaXRpb25zIiwic2VsZWN0ZWRDb25kaXRpb25zIiwidHMiLCJjb21tb25seVNlYXJjaGVkU3BlY2lhbGl0aWVzIiwic2VsZWN0ZWRTcGVjaWFsaXRpZXMiLCJzZWxlY3RlZENyaXRlcmlhIiwic29ydCIsImEiLCJiIiwiZGF0ZUEiLCJkYXRlQiIsIkRvY3RvclByb2ZpbGVDYXJkIiwiY2FyZENsaWNrIiwiYm9va05vdyIsImdldFF1YWxpZmljYXRpb25TdHIiLCJxdWFsaWZpY2F0aW9uU3BlY2lhbGl6YXRpb24iLCJzdHIiLCJxdWFsaWZpY2F0aW9uIiwic3BlY2lhbGl6YXRpb24iLCJwcm9maWxlX2ltZyIsInByYWN0aWNlX2R1cmF0aW9uIiwiY29uc3VsdGF0aW9uQ291bnQiLCJwYXN0RXhwZXJpZW5jZSIsInF1YWxpZmljYXRpb25TdHJpbmciLCJoaWRlQm9va05vdyIsImhpZGVCb3R0b20iLCJTZWxlY3RlZENsaW5pYyIsImNsaW5pY0RhdGEiLCJmb2N1cyIsInJlc3VsdCIsImdvQmFjayIsInJlc3VsdERhdGEiLCJqIiwiRG9jdG9yUHJvZmlsZVZpZXciLCJBYm91dERvY3RvciIsIlByb2Zlc3Npb25hbEdyYXBoIiwiTG9jYXRpb25TZWFyY2giLCJnZXRMb2NhdGlvbiIsImF1dG8iLCJnb29nbGUiLCJtYXBzIiwicGxhY2VzIiwiQXV0b2NvbXBsZXRlU2VydmljZSIsInJlcXVlc3QiLCJ0eXBlcyIsImNvbXBvbmVudFJlc3RyaWN0aW9ucyIsImNvdW50cnkiLCJnZXRQbGFjZVByZWRpY3Rpb25zIiwicmVzdWx0cyIsInN0YXR1cyIsIk1hcCIsImNlbnRlciIsInpvb20iLCJzZXJ2aWNlIiwiUGxhY2VzU2VydmljZSIsImdldERldGFpbHMiLCJyZWZlcmVuY2UiLCJwbGFjZSIsImRlc2NyaXB0aW9uIiwiZGlzcGxheSIsIlBhdGllbnREZXRhaWxzIiwiUGF5bWVudFZpZXciLCJDUklURVJJQV9MT0FERUQiLCJnZXREb2N0b3JMaXN0IiwiTE9BRElORyIsIkRvY3RvcnNMaXN0IiwiZG9jdG9yTGlzdCIsImRvY3RvclZpZXdMaXN0IiwiZG9jSWQiLCJzZWxlY3REb2N0b3IiLCJwYXRobmFtZSIsIlNlYXJjaFJlc3VsdHNGaWx0ZXIiLCJmZWVfMCIsImZlZV8xIiwiZmVlXzIiLCJmZWVfMyIsImNsaW5pY19wZXJzb25hbCIsImNsaW5pY19ob3NwaXRhbCIsImNsaW5pY19tdWx0aSIsImF2YWlsYWJsZV90b2RheSIsImRpc3RhbmNlIiwiYXBwbHlGaWx0ZXIiLCJoYW5kbGVDaGVja2JveCIsImNoZWNrZWQiLCJoYW5kbGVDaGFuZ2VSYWRpbyIsIlNFTkRfT1RQX1JFUVVFU1QiLCJTRU5EX09UUF9TVUNDRVNTIiwiU0VORF9PVFBfRkFJTCIsIlNVQk1JVF9PVFBfUkVRVUVTVCIsIlNVQk1JVF9PVFBfU1VDQ0VTUyIsIlNVQk1JVF9PVFBfRkFJTCIsIkFQUEVORF9ET0NUT1JTIiwiRE9DVE9SX1NFQVJDSCIsIlNFTEVDVF9ET0NUT1IiLCJUT0dHTEVfQ09ORElUSU9OUyIsIlRPR0dMRV9TUEVDSUFMSVRJRVMiLCJUT0dHTEVfVEVTVFMiLCJTRUxFQ1RfTE9DQVRJT04iLCJNRVJHRV9TRUFSQ0hfU1RBVEVfT1BEIiwiVE9HR0xFX0NSSVRFUklBIiwiVE9HR0xFX0RJQUdOT1NJU19DUklURVJJQSIsIlNFVF9PUERfRklMVEVSUyIsIlNFVF9MQUJTX0ZJTFRFUlMiLCJMT0FEX1NFQVJDSF9DUklURVJJQV9PUEQiLCJNRVJHRV9TRUFSQ0hfU1RBVEVfTEFCIiwiTE9BRF9TRUFSQ0hfQ1JJVEVSSUFfTEFCIiwiQVBQRU5EX0xBQlMiLCJMQUJfU0VBUkNIIiwiU0VMRUNUX0xPQ0FUSU9OX0RJQUdOT1NJUyIsIkFQUEVORF9GSUxURVJTX0RJQUdOT1NJUyIsIkxBQl9TRUFSQ0hfU1RBUlQiLCJBUFBFTkRfVVNFUl9QUk9GSUxFUyIsIkNoYXQiLCJtYXBTdGF0ZVRvUHJvcHMiLCJtYXBEaXNwYXRjaFRvUHJvcHMiLCJVc2VyQXBwb2ludG1lbnRzIiwiVXNlclByb2ZpbGUiLCJVc2VyUmVwb3J0cyIsIlVzZXJTaWdudXAiLCJCb29raW5nU3VtbWFyeSIsIkxhYiIsImxvYWREYXRhIiwic3RvcmUiLCJTZWFyY2hDcml0ZXJpYSIsIlNlYXJjaFJlc3VsdHMiLCJUZXN0U2VsZWN0b3IiLCJCb29raW5nIiwiQ2xpbmljTGlzdCIsIkNyaXRlcmlhU2VhcmNoIiwiRG9jdG9yUHJvZmlsZSIsIlBheW1lbnQiLCJFUlJPUiIsIk5BVklHQVRFIiwibmF2aWdhdGVUbyIsIndoZXJlIiwid2luZG93IiwiaHJlZiIsInJlZnJlc2hBcHBvaW50bWVudFN0YXRlIiwibm9BcHBvaW50bWVudEZvdW5kIiwidXBjb21pbmciLCJwcmV2aW91cyIsImFjdGlvbiIsImNvb2tpZXMiLCJTVE9SQUdFIiwic2V0IiwiY2hlY2tBdXRoIiwiZGVsZXRlQXV0aCIsInJlbW92ZSIsImRlZmF1bHRTdGF0ZSIsIm5ld1N0YXRlIiwib3RwX3JlcXVlc3Rfc2VudCIsIm90cF9yZXF1ZXN0X3N1Y2Nlc3MiLCJvdHBfcmVxdWVzdF9mYWlsIiwic3VjY2Vzc19tZXNzYWdlIiwic3VibWl0X290cCIsInN1Ym1pdF9vdHBfZmFpbCIsInN1Ym1pdF9vdHBfc3VjY2VzcyIsInByb2ZpbGVNYXAiLCJwcm9maWxlIiwibGFwTWFwIiwiY29uY2F0IiwiZm91bmQiLCJhbGxSZWR1Y2VycyIsIkFVVEgiLCJkb2N0b3JNYXAiLCJyb3V0ZXMiLCJwYXRoIiwiZXhhY3QiLCJjb21wb25lbnQiLCJSb3V0ZXJDb25maWciLCJlbnRlciIsImV4aXQiLCJyb3V0ZSIsIlJPVVRFUyIsInRpbWVTdGFtcCIsImdldERheU5hbWUiLCJnZXREYXkiLCJyZXF1aXJlIiwiaHR0cCIsIkV4cHJlc3MiLCJhcHAiLCJzZXJ2ZXIiLCJTZXJ2ZXIiLCJ1c2UiLCJzdGF0aWMiLCJqb2luIiwiX19kaXJuYW1lIiwicmVxIiwic2hlZXRzUmVnaXN0cnkiLCJ0aGVtZSIsInBhbGV0dGUiLCJwcmltYXJ5IiwibWFpbiIsInNlY29uZGFyeSIsImRhbmdlciIsImdlbmVyYXRlQ2xhc3NOYW1lIiwid3JpdGVIZWFkIiwiTG9jYXRpb24iLCJwcm9taXNlcyIsInNvbWUiLCJhbGwiLCJzdG9yZURhdGEiLCJnZXRTdGF0ZSIsImh0bWwiLCJyZW5kZXJUb1N0cmluZyIsImNzcyIsInNlbmRGaWxlIiwicm9vdCIsImxpc3RlbiIsImVyciIsImluZm8iXSwibWFwcGlu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QUNBQSxpQzs7Ozs7Ozs7Ozs7QUNBQSw0RDs7Ozs7Ozs7Ozs7QUNBQSwwRDs7Ozs7Ozs7Ozs7QUNBQSxzRDs7Ozs7Ozs7Ozs7QUNBQSxtRDs7Ozs7Ozs7Ozs7QUNBQSx5RDs7Ozs7Ozs7Ozs7QUNBQSx5RDs7Ozs7Ozs7Ozs7QUNBQSxtRDs7Ozs7Ozs7Ozs7QUNBQSxpRTs7Ozs7Ozs7Ozs7QUNBQSx5RDs7Ozs7Ozs7Ozs7QUNBQSxzRDs7Ozs7Ozs7Ozs7QUNBQSxtRDs7Ozs7Ozs7Ozs7QUNBQSxpRDs7Ozs7Ozs7Ozs7QUNBQSw2Qzs7Ozs7Ozs7Ozs7QUNBQSx1RDs7Ozs7Ozs7Ozs7QUNBQSw2Qzs7Ozs7Ozs7Ozs7QUNBQSw2Qzs7Ozs7Ozs7Ozs7QUNBQSxpRDs7Ozs7Ozs7Ozs7QUNBQSw4Qzs7Ozs7Ozs7Ozs7QUNBQSxnRDs7Ozs7Ozs7Ozs7QUNBQSwrQzs7Ozs7Ozs7Ozs7QUNBQSxpQzs7Ozs7Ozs7Ozs7QUNBQSxnRDs7Ozs7Ozs7Ozs7QUNBQSxrQzs7Ozs7Ozs7Ozs7QUNBQSw2Qzs7Ozs7Ozs7Ozs7QUNBQSxvRDs7Ozs7Ozs7Ozs7QUNBQSxzRDs7Ozs7Ozs7Ozs7QUNBQSw4Qzs7Ozs7Ozs7Ozs7QUNBQSx3Qzs7Ozs7Ozs7Ozs7QUNBQSx5Qzs7Ozs7Ozs7Ozs7QUNBQSw2Qzs7Ozs7Ozs7Ozs7QUNBQSxtRDs7Ozs7Ozs7Ozs7QUNBQSxrQzs7Ozs7Ozs7Ozs7QUNBQSx5Qzs7Ozs7Ozs7Ozs7QUNBQSx3Qzs7Ozs7Ozs7Ozs7QUNBQSw2QyIsImZpbGUiOiJzZXJ2ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIHdhc20gbW9kdWxlc1xuIFx0dmFyIGluc3RhbGxlZFdhc21Nb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9cIjtcblxuIFx0Ly8gb2JqZWN0IHdpdGggYWxsIGNvbXBpbGVkIFdlYkFzc2VtYmx5Lk1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18udyA9IHt9O1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL2luZGV4LmpzXCIpO1xuIiwiaW1wb3J0IHsgU0VORF9PVFBfUkVRVUVTVCwgU0VORF9PVFBfU1VDQ0VTUywgU0VORF9PVFBfRkFJTCwgU1VCTUlUX09UUF9SRVFVRVNULCBTVUJNSVRfT1RQX1NVQ0NFU1MsIFNVQk1JVF9PVFBfRkFJTCB9IGZyb20gJy4uLy4uL2NvbnN0YW50cy90eXBlcyc7XG5pbXBvcnQgeyBBUElfR0VULCBBUElfUE9TVCB9IGZyb20gJy4uLy4uL2FwaS9hcGkuanMnO1xuaW1wb3J0IFNUT1JBR0UgZnJvbSAnLi4vLi4vaGVscGVycy9zdG9yYWdlJ1xuXG5leHBvcnQgY29uc3Qgc2VuZE9UUCA9IChudW1iZXIsIGNiKSA9PiAoZGlzcGF0Y2gpID0+IHtcbiAgICBkaXNwYXRjaCh7XG4gICAgICAgIHR5cGU6IFNFTkRfT1RQX1JFUVVFU1QsXG4gICAgICAgIHBheWxvYWQ6IHtcbiAgICAgICAgICAgIHBob25lTnVtYmVyOiBudW1iZXJcbiAgICAgICAgfVxuICAgIH0pXG5cbiAgICBBUElfUE9TVCgnL2FwaS92MS91c2VyL290cC9nZW5lcmF0ZT90eXBlPWRvY3RvcicsIHtcbiAgICAgICAgXCJwaG9uZV9udW1iZXJcIjogbnVtYmVyXG4gICAgfSkudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgaWYgKHJlc3BvbnNlLmV4aXN0cykge1xuICAgICAgICAgICAgZGlzcGF0Y2goe1xuICAgICAgICAgICAgICAgIHR5cGU6IFNFTkRfT1RQX1NVQ0NFU1MsXG4gICAgICAgICAgICAgICAgcGF5bG9hZDoge31cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBpZiAoY2IpIGNiKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkaXNwYXRjaCh7XG4gICAgICAgICAgICAgICAgdHlwZTogU0VORF9PVFBfRkFJTCxcbiAgICAgICAgICAgICAgICBwYXlsb2FkOiB7XG4gICAgICAgICAgICAgICAgICAgIGVycm9yX21lc3NhZ2U6IFwiRG9jdG9yIG5vdCByZWdpc3RlcmVkLlwiXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICBkZWJ1Z2dlclxuICAgICAgICBsZXQgbWVzc2FnZSA9IFwiQ2Fubm90IGdlbmVyYXRlIE9UUC5cIlxuICAgICAgICBkaXNwYXRjaCh7XG4gICAgICAgICAgICB0eXBlOiBTRU5EX09UUF9GQUlMLFxuICAgICAgICAgICAgcGF5bG9hZDoge1xuICAgICAgICAgICAgICAgIGVycm9yX21lc3NhZ2U6IG1lc3NhZ2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9KVxuXG59XG5cbmV4cG9ydCBjb25zdCBzdWJtaXRPVFAgPSAobnVtYmVyLCBvdHAsIGNiKSA9PiAoZGlzcGF0Y2gpID0+IHtcbiAgICBkaXNwYXRjaCh7XG4gICAgICAgIHR5cGU6IFNVQk1JVF9PVFBfUkVRVUVTVCxcbiAgICAgICAgcGF5bG9hZDoge31cbiAgICB9KVxuXG4gICAgQVBJX1BPU1QoJy9hcGkvdjEvdXNlci9kb2N0b3IvbG9naW4nLCB7XG4gICAgICAgIFwicGhvbmVfbnVtYmVyXCI6IG51bWJlcixcbiAgICAgICAgXCJvdHBcIjogb3RwXG4gICAgfSkudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgLy8gc2V0IGNvb2tpZSB0b2tlbiBleHBsaWNpdGx5LCBjc3JmIHRva2VuIGlzIHNldCBieSBkZWZhdWx0XG4gICAgICAgIFNUT1JBR0Uuc2V0QXV0aFRva2VuKHJlc3BvbnNlLnRva2VuKVxuXG4gICAgICAgIGRpc3BhdGNoKHtcbiAgICAgICAgICAgIHR5cGU6IFNVQk1JVF9PVFBfU1VDQ0VTUyxcbiAgICAgICAgICAgIHBheWxvYWQ6IHsgdG9rZW46IHJlc3BvbnNlLnRva2VuIH1cbiAgICAgICAgfSlcbiAgICAgICAgaWYgKGNiKSBjYigpO1xuICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICBkaXNwYXRjaCh7XG4gICAgICAgICAgICB0eXBlOiBTVUJNSVRfT1RQX0ZBSUwsXG4gICAgICAgICAgICBwYXlsb2FkOiB7XG4gICAgICAgICAgICAgICAgZXJyb3JfbWVzc2FnZTogXCJJbnZhbGlkIE9UUFwiXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfSlcbn1cbiIsImltcG9ydCB7IEFQUEVORF9VU0VSX1BST0ZJTEVTIH0gZnJvbSAnLi4vLi4vY29uc3RhbnRzL3R5cGVzJztcbmltcG9ydCB7IEFQSV9HRVQgfSBmcm9tICcuLi8uLi9hcGkvYXBpLmpzJztcblxuXG5leHBvcnQgY29uc3QgZ2V0VXNlclByb2ZpbGUgPSAoKSA9PiAoZGlzcGF0Y2gpID0+IHtcblx0QVBJX0dFVCgnL3VzZXIuanNvbicpLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG5cdFx0XG5cdFx0ZGlzcGF0Y2goe1xuXHRcdFx0dHlwZTogQVBQRU5EX1VTRVJfUFJPRklMRVMsXG5cdFx0XHRwYXlsb2FkOiByZXNwb25zZS5wcm9maWxlc1xuXHRcdH0pXG5cblx0fSkuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSB7XG5cblx0fSlcbn1cblxuZXhwb3J0IGNvbnN0IGdldFVzZXJQcm9maWxlV2l0aEFwcG9pbnRtZW50cyA9ICgpID0+IChkaXNwYXRjaCkgPT4ge1xuXHRBUElfR0VUKCcvdXNlcl9wcm9maWxlX2FwcG9pbnRtZW50cy5qc29uJykudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcblx0XHRcblx0XHRkaXNwYXRjaCh7XG5cdFx0XHR0eXBlOiBBUFBFTkRfVVNFUl9QUk9GSUxFUyxcblx0XHRcdHBheWxvYWQ6IHJlc3BvbnNlLnByb2ZpbGVzXG5cdFx0fSlcblxuXHR9KS5jYXRjaChmdW5jdGlvbiAoZXJyb3IpIHtcblxuXHR9KVxufVxuXG5leHBvcnQgY29uc3QgZ2V0VXNlclByb2ZpbGVXaXRoVGVzdHMgPSAoKSA9PiAoZGlzcGF0Y2gpID0+IHtcblx0QVBJX0dFVCgnL3VzZXJfcHJvZmlsZV90ZXN0cy5qc29uJykudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcblx0XHRcblx0XHRkaXNwYXRjaCh7XG5cdFx0XHR0eXBlOiBBUFBFTkRfVVNFUl9QUk9GSUxFUyxcblx0XHRcdHBheWxvYWQ6IHJlc3BvbnNlLnByb2ZpbGVzXG5cdFx0fSlcblxuXHR9KS5jYXRjaChmdW5jdGlvbiAoZXJyb3IpIHtcblxuXHR9KVxufVxuXG4iLCJpbXBvcnQgeyBMQUJfU0VBUkNIX1NUQVJULCBBUFBFTkRfTEFCUywgTEFCX1NFQVJDSCwgTUVSR0VfU0VBUkNIX1NUQVRFX0xBQiB9IGZyb20gJy4uLy4uL2NvbnN0YW50cy90eXBlcyc7XG5pbXBvcnQgeyBBUElfR0VUIH0gZnJvbSAnLi4vLi4vYXBpL2FwaS5qcyc7XG5cblxuZXhwb3J0IGNvbnN0IGdldExhYnMgPSAoc2VhcmNoU3RhdGUgPSB7fSwgZmlsdGVyQ3JpdGVyaWEgPSB7fSwgbWVyZ2VTdGF0ZSA9IGZhbHNlKSA9PiAoZGlzcGF0Y2gpID0+IHtcblxuXHRsZXQgdGVzdElkcyA9IHNlYXJjaFN0YXRlLnNlbGVjdGVkQ3JpdGVyaWFzXG5cdFx0LmZpbHRlcih4ID0+IHgudHlwZSA9PSAndGVzdCcpXG5cdFx0LnJlZHVjZSgoZmluYWxTdHIsIGN1cnIsIGkpID0+IHtcblx0XHRcdGlmIChpICE9IDApIHtcblx0XHRcdFx0ZmluYWxTdHIgKz0gJywnXG5cdFx0XHR9XG5cdFx0XHRmaW5hbFN0ciArPSBgJHtjdXJyLmlkfWBcblx0XHRcdHJldHVybiBmaW5hbFN0clxuXHRcdH0sIFwiXCIpXG5cblx0bGV0IGxhdCA9IDI4LjQ1OTVcblx0bGV0IGxvbmcgPSA3Ny4wMjI2XG5cdGlmIChzZWFyY2hTdGF0ZS5zZWxlY3RlZExvY2F0aW9uKSB7XG5cdFx0bGF0ID0gc2VhcmNoU3RhdGUuc2VsZWN0ZWRMb2NhdGlvbi5nZW9tZXRyeS5sb2NhdGlvbi5sYXRcblx0XHRsb25nID0gc2VhcmNoU3RhdGUuc2VsZWN0ZWRMb2NhdGlvbi5nZW9tZXRyeS5sb2NhdGlvbi5sbmdcblx0fVxuXHRsZXQgbWluX2Rpc3RhbmNlID0gZmlsdGVyQ3JpdGVyaWEuZGlzdGFuY2VSYW5nZVswXVxuXHRsZXQgbWF4X2Rpc3RhbmNlID0gZmlsdGVyQ3JpdGVyaWEuZGlzdGFuY2VSYW5nZVsxXVxuXHRsZXQgbWluX3ByaWNlID0gZmlsdGVyQ3JpdGVyaWEucHJpY2VSYW5nZVswXVxuXHRsZXQgbWF4X3ByaWNlID0gZmlsdGVyQ3JpdGVyaWEucHJpY2VSYW5nZVsxXVxuXHRsZXQgb3JkZXJfYnkgPSBmaWx0ZXJDcml0ZXJpYS5zb3J0QnlcblxuXHRsZXQgdXJsID0gYC9hcGkvdjEvZGlhZ25vc3RpYy9sYWJsaXN0P2lkcz0ke3Rlc3RJZHN9Jmxvbmc9JHtsYXR9JmxhdD0ke2xvbmd9Jm1pbl9kaXN0YW5jZT0ke21pbl9kaXN0YW5jZX0mbWF4X2Rpc3RhbmNlPSR7bWF4X2Rpc3RhbmNlfSZtaW5fcHJpY2U9JHttaW5fcHJpY2V9Jm1heF9wcmljZT0ke21heF9wcmljZX0mb3JkZXJfYnk9JHtvcmRlcl9ieX1gXG5cblx0ZGlzcGF0Y2goe1xuXHRcdHR5cGU6IExBQl9TRUFSQ0hfU1RBUlQsXG5cdFx0cGF5bG9hZDogbnVsbFxuXHR9KVxuXG5cdEFQSV9HRVQodXJsKS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuXG5cdFx0ZGlzcGF0Y2goe1xuXHRcdFx0dHlwZTogQVBQRU5EX0xBQlMsXG5cdFx0XHRwYXlsb2FkOiByZXNwb25zZVxuXHRcdH0pXG5cblx0XHRkaXNwYXRjaCh7XG5cdFx0XHR0eXBlOiBMQUJfU0VBUkNILFxuXHRcdFx0cGF5bG9hZDogcmVzcG9uc2Vcblx0XHR9KVxuXG5cdFx0aWYgKG1lcmdlU3RhdGUpIHtcblx0XHRcdGRpc3BhdGNoKHtcblx0XHRcdFx0dHlwZTogTUVSR0VfU0VBUkNIX1NUQVRFX0xBQixcblx0XHRcdFx0cGF5bG9hZDoge1xuXHRcdFx0XHRcdHNlYXJjaFN0YXRlLFxuXHRcdFx0XHRcdGZpbHRlckNyaXRlcmlhXG5cdFx0XHRcdH1cblx0XHRcdH0pXG5cdFx0fVxuXG5cdH0pLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xuXG5cdH0pXG59XG5cbmV4cG9ydCBjb25zdCBnZXRMYWJCeUlkID0gKGxhYklkKSA9PiAoZGlzcGF0Y2gpID0+IHtcblx0bGV0IHVybCA9IGAvYXBpL3YxL2RpYWdub3N0aWMvbGFibGlzdC8ke2xhYklkfWBcblxuXHRyZXR1cm4gQVBJX0dFVCh1cmwpLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG5cdFx0XG5cdFx0ZGlzcGF0Y2goe1xuXHRcdFx0dHlwZTogQVBQRU5EX0xBQlMsXG5cdFx0XHRwYXlsb2FkOiBbcmVzcG9uc2VdXG5cdFx0fSlcblxuXHR9KS5jYXRjaChmdW5jdGlvbiAoZXJyb3IpIHtcblxuXHR9KVxufVxuXG5leHBvcnQgY29uc3QgZ2V0TGFiVGltZVNsb3RzID0gKGxhYklkLCB0ZXN0SWRzLCBjYWxsYmFjaykgPT4gKGRpc3BhdGNoKSA9PiB7XG5cdEFQSV9HRVQoJy9hdmFpbGFiaWxpdHlfbGFicy5qc29uJykudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcblxuXHRcdGNhbGxiYWNrKHJlc3BvbnNlKVxuXG5cdH0pLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xuXG5cdH0pXG59XG5cbmV4cG9ydCBjb25zdCBnZXRMYWJCb29raW5nU3VtbWFyeSA9IChib29raW5nSWQsIGNhbGxiYWNrKSA9PiAoZGlzcGF0Y2gpID0+IHtcblx0QVBJX0dFVCgnL2xhYl9ib29raW5nX3N1bW1hci5qc29uJykudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcblxuXHRcdGNhbGxiYWNrKHJlc3BvbnNlKVxuXG5cdH0pLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xuXG5cdH0pXG59XG4iLCJpbXBvcnQgeyBBUFBFTkRfRklMVEVSU19ESUFHTk9TSVMsIFRPR0dMRV9DT05ESVRJT05TLCBUT0dHTEVfU1BFQ0lBTElUSUVTLCBTRUxFQ1RfTE9DQVRJT04sIE1FUkdFX1NFQVJDSF9TVEFURSwgVE9HR0xFX0NSSVRFUklBLCBUT0dHTEVfVEVTVFMsIFRPR0dMRV9ESUFHTk9TSVNfQ1JJVEVSSUEsIExPQURfU0VBUkNIX0NSSVRFUklBX0xBQiB9IGZyb20gJy4uLy4uL2NvbnN0YW50cy90eXBlcyc7XG5pbXBvcnQgeyBBUElfR0VUIH0gZnJvbSAnLi4vLi4vYXBpL2FwaS5qcyc7XG5cbmV4cG9ydCBjb25zdCBsb2FkTGFiQ29tbW9uQ3JpdGVyaWFzID0gKCkgPT4gKGRpc3BhdGNoKSA9PiB7XG5cbiAgICByZXR1cm4gQVBJX0dFVCgnL2FwaS92MS9kaWFnbm9zdGljL2xhYnNlYXJjaCcpLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgIGRpc3BhdGNoKHtcbiAgICAgICAgICAgIHR5cGU6IExPQURfU0VBUkNIX0NSSVRFUklBX0xBQixcbiAgICAgICAgICAgIHBheWxvYWQ6IHJlc3BvbnNlXG4gICAgICAgIH0pXG4gICAgfSkuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICAgIGRpc3BhdGNoKHtcbiAgICAgICAgICAgIHR5cGU6IExPQURfU0VBUkNIX0NSSVRFUklBX0xBQixcbiAgICAgICAgICAgIHBheWxvYWQ6IG51bGxcbiAgICAgICAgfSlcbiAgICB9KVxuXG59XG5cbmV4cG9ydCBjb25zdCB0b2dnbGVEaWFnbm9zaXNDcml0ZXJpYSA9ICh0eXBlLCBjcml0ZXJpYSkgPT4gKGRpc3BhdGNoKSA9PiB7XG4gICAgZGlzcGF0Y2goe1xuICAgICAgICB0eXBlOiBUT0dHTEVfRElBR05PU0lTX0NSSVRFUklBLFxuICAgICAgICBwYXlsb2FkOiB7XG4gICAgICAgICAgICB0eXBlLCBjcml0ZXJpYVxuICAgICAgICB9XG4gICAgfSlcblxufVxuXG5leHBvcnQgY29uc3QgZ2V0RGlhZ25vc2lzQ3JpdGVyaWFSZXN1bHRzID0gKHNlYXJjaFN0cmluZywgY2FsbGJhY2spID0+IChkaXNwYXRjaCkgPT4ge1xuICAgIEFQSV9HRVQoYC9hcGkvdjEvZGlhZ25vc3RpYy90ZXN0P25hbWU9JHtzZWFyY2hTdHJpbmd9YCkudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgY2FsbGJhY2socmVzcG9uc2UpXG4gICAgfSkuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICAgIGNhbGxiYWNrKG51bGwpXG4gICAgfSlcbn1cblxuXG4iLCJpbXBvcnQgKiBhcyBTRUFSQ0hfQ1JJVEVSSUFfT1BEIGZyb20gJy4vb3BkL3NlYXJjaENyaXRlcmlhLmpzJ1xuaW1wb3J0ICogYXMgU0VBUkNIX0NSSVRFUklBX0xBQlMgZnJvbSAnLi9kaWFnbm9zaXMvc2VhcmNoQ3JpdGVyaWEuanMnXG5pbXBvcnQgKiBhcyBET0NUT1JTX0FDVElPTlMgZnJvbSAnLi9vcGQvZG9jdG9yU2VhcmNoLmpzJ1xuaW1wb3J0ICogYXMgTEFCU19BQ1RJT05TIGZyb20gJy4vZGlhZ25vc2lzL2xhYlNlYXJjaC5qcydcbmltcG9ydCAqIGFzIFVTRVJfQUNUSU9OUyBmcm9tICcuL2NvbW1vbnMvdXNlci5qcydcbmltcG9ydCAqIGFzIEFVVEhfQUNUSU9OUyBmcm9tICcuL2NvbW1vbnMvYXV0aC5qcydcblxubW9kdWxlLmV4cG9ydHMgPSBPYmplY3QuYXNzaWduKHt9LFxuICAgIFNFQVJDSF9DUklURVJJQV9PUEQsXG4gICAgU0VBUkNIX0NSSVRFUklBX0xBQlMsXG4gICAgRE9DVE9SU19BQ1RJT05TLFxuICAgIExBQlNfQUNUSU9OUyxcbiAgICBVU0VSX0FDVElPTlMsXG4gICAgQVVUSF9BQ1RJT05TXG4pIiwiaW1wb3J0IHsgQVBQRU5EX0RPQ1RPUlMsIERPQ1RPUl9TRUFSQ0gsIFNFTEVDVF9ET0NUT1IsIE1FUkdFX1NFQVJDSF9TVEFURV9PUEQgfSBmcm9tICcuLi8uLi9jb25zdGFudHMvdHlwZXMnO1xuaW1wb3J0IHsgQVBJX0dFVCB9IGZyb20gJy4uLy4uL2FwaS9hcGkuanMnO1xuXG5cbmV4cG9ydCBjb25zdCBnZXREb2N0b3JzID0gKHNlYXJjaFN0YXRlID0ge30sIGZpbHRlclN0YXRlID0ge30sIG1lcmdlU3RhdGUgPSBmYWxzZSkgPT4gKGRpc3BhdGNoKSA9PiB7XG5cdEFQSV9HRVQoJy9kb2N0b3JzLmpzb24nKS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuXG5cdFx0ZGlzcGF0Y2goe1xuXHRcdFx0dHlwZTogQVBQRU5EX0RPQ1RPUlMsXG5cdFx0XHRwYXlsb2FkOiByZXNwb25zZS5kb2N0b3JzXG5cdFx0fSlcblxuXHRcdGRpc3BhdGNoKHtcblx0XHRcdHR5cGU6IERPQ1RPUl9TRUFSQ0gsXG5cdFx0XHRwYXlsb2FkOiByZXNwb25zZS5kb2N0b3JzXG5cdFx0fSlcblxuXHRcdGlmIChtZXJnZVN0YXRlKSB7XG5cdFx0XHRkaXNwYXRjaCh7XG5cdFx0XHRcdHR5cGU6IE1FUkdFX1NFQVJDSF9TVEFURV9PUEQsXG5cdFx0XHRcdHBheWxvYWQ6IHNlYXJjaFN0YXRlXG5cdFx0XHR9KVxuXHRcdH1cblxuXG5cdFx0bGV0IHNlYXJjaFN0YXRlUGFyYW0gPSBlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc2VhcmNoU3RhdGUpKVxuXHRcdGxldCBmaWx0ZXJTdGF0ZVBhcmFtID0gZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGZpbHRlclN0YXRlKSlcblx0XHRoaXN0b3J5LnJlcGxhY2VTdGF0ZShudWxsLCAnaGVsbG8nLCBgL3NlYXJjaHJlc3VsdHM/c2VhcmNoPSR7c2VhcmNoU3RhdGVQYXJhbX0mZmlsdGVyPSR7ZmlsdGVyU3RhdGVQYXJhbX1gKVxuXG5cdH0pLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xuXG5cdH0pXG59XG5cbmV4cG9ydCBjb25zdCBnZXREb2N0b3JCeUlkID0gKGRvY3RvcklkKSA9PiAoZGlzcGF0Y2gpID0+IHtcblx0Ly8gdGhpcyBBUEkgc2hvdWxkIHJldHVybiBkZXRhaWxlZCBkb2N0b3Jcblx0QVBJX0dFVCgnL2RvY3RvcnMuanNvbicpLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG5cdFx0Ly8gbW9ja2luZyBBUEkgLCBUT0RPIDogcmVtb3ZlXG5cdFx0cmVzcG9uc2UuZG9jdG9yID0gcmVzcG9uc2UuZG9jdG9ycy5maWx0ZXIoZG9jID0+IGRvYy5pZCA9PSBkb2N0b3JJZClbMF1cblxuXHRcdGRpc3BhdGNoKHtcblx0XHRcdHR5cGU6IEFQUEVORF9ET0NUT1JTLFxuXHRcdFx0cGF5bG9hZDogW3Jlc3BvbnNlLmRvY3Rvcl1cblx0XHR9KVxuXG5cdH0pLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xuXG5cdH0pXG59XG5cbmV4cG9ydCBjb25zdCBnZXRUaW1lU2xvdHMgPSAoZG9jdG9ySWQsIGNsaW5pY0lkLCBjYWxsYmFjaykgPT4gKGRpc3BhdGNoKSA9PiB7XG5cdEFQSV9HRVQoJy9hdmFpbGFiaWxpdHkuanNvbicpLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG5cblx0XHRjYWxsYmFjayhyZXNwb25zZSlcblxuXHR9KS5jYXRjaChmdW5jdGlvbiAoZXJyb3IpIHtcblxuXHR9KVxufVxuIiwiaW1wb3J0IHsgVE9HR0xFX0NPTkRJVElPTlMsIFRPR0dMRV9TUEVDSUFMSVRJRVMsIFNFTEVDVF9MT0NBVElPTiwgU0VMRUNUX0xPQ0FUSU9OX0RJQUdOT1NJUywgTUVSR0VfU0VBUkNIX1NUQVRFLCBUT0dHTEVfQ1JJVEVSSUEsIFRPR0dMRV9URVNUUywgVE9HR0xFX0RJQUdOT1NJU19DUklURVJJQSwgU0VUX09QRF9GSUxURVJTLCBMT0FEX1NFQVJDSF9DUklURVJJQV9PUEQgfSBmcm9tICcuLi8uLi9jb25zdGFudHMvdHlwZXMnO1xuaW1wb3J0IHsgQVBJX0dFVCB9IGZyb20gJy4uLy4uL2FwaS9hcGkuanMnO1xuXG5leHBvcnQgY29uc3QgbG9hZFNlYXJjaENyaXRlcmlhID0gKCkgPT4gKGRpc3BhdGNoKSA9PiB7XG4gICAgZGlzcGF0Y2goe1xuICAgICAgICB0eXBlOiBMT0FEX1NFQVJDSF9DUklURVJJQV9PUEQsXG4gICAgICAgIHBheWxvYWQ6IG51bGxcbiAgICB9KVxuXG59IFxuXG5leHBvcnQgY29uc3QgdG9nZ2xlQ29uZGl0aW9uID0gKGlkKSA9PiAoZGlzcGF0Y2gpID0+IHtcbiAgICBkaXNwYXRjaCh7XG4gICAgICAgIHR5cGU6IFRPR0dMRV9DT05ESVRJT05TLFxuICAgICAgICBwYXlsb2FkOiB7XG4gICAgICAgICAgICBpZFxuICAgICAgICB9XG4gICAgfSlcblxufVxuXG5leHBvcnQgY29uc3QgdG9nZ2xlU3BlY2lhbGl0eSA9IChpZCkgPT4gKGRpc3BhdGNoKSA9PiB7XG4gICAgZGlzcGF0Y2goe1xuICAgICAgICB0eXBlOiBUT0dHTEVfU1BFQ0lBTElUSUVTLFxuICAgICAgICBwYXlsb2FkOiB7XG4gICAgICAgICAgICBpZFxuICAgICAgICB9XG4gICAgfSlcblxufVxuXG5leHBvcnQgY29uc3QgdG9nZ2xlQ3JpdGVyaWEgPSAoY3JpdGVyaWEpID0+IChkaXNwYXRjaCkgPT4ge1xuICAgIGRpc3BhdGNoKHtcbiAgICAgICAgdHlwZTogVE9HR0xFX0NSSVRFUklBLFxuICAgICAgICBwYXlsb2FkOiBjcml0ZXJpYVxuICAgIH0pXG5cbn1cblxuZXhwb3J0IGNvbnN0IHNlbGVjdExvY2F0aW9uID0gKGxvY2F0aW9uKSA9PiAoZGlzcGF0Y2gpID0+IHtcbiAgICBkaXNwYXRjaCh7XG4gICAgICAgIHR5cGU6IFNFTEVDVF9MT0NBVElPTixcbiAgICAgICAgcGF5bG9hZDogbG9jYXRpb25cbiAgICB9KVxuXG4gICAgZGlzcGF0Y2goe1xuICAgICAgICB0eXBlOiBTRUxFQ1RfTE9DQVRJT05fRElBR05PU0lTLFxuICAgICAgICBwYXlsb2FkOiBsb2NhdGlvblxuICAgIH0pXG5cbn1cblxuZXhwb3J0IGNvbnN0IG1lcmdlU2VhcmNoU3RhdGUgPSAoc3RhdGUpID0+IChkaXNwYXRjaCkgPT4ge1xuICAgIGRpc3BhdGNoKHtcbiAgICAgICAgdHlwZTogTUVSR0VfU0VBUkNIX1NUQVRFLFxuICAgICAgICBwYXlsb2FkOiBzdGF0ZVxuICAgIH0pXG5cbn1cblxuZXhwb3J0IGNvbnN0IGdldENyaXRlcmlhUmVzdWx0cyA9IChzZWFyY2hTdHJpbmcsIGNhbGxiYWNrKSA9PiAoZGlzcGF0Y2gpID0+IHtcblx0QVBJX0dFVCgnL2dlbmVyaWNfc2VhcmNoLmpzb24nKS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuXHRcdGNhbGxiYWNrKHJlc3BvbnNlKVxuXHR9KS5jYXRjaChmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgICAgXG5cdH0pXG59XG5cbmV4cG9ydCBjb25zdCBzZXRPUERGaWx0ZXJzID0gKGZpbHRlckRhdGEpID0+IChkaXNwYXRjaCkgPT4ge1xuICAgIGRpc3BhdGNoKHtcbiAgICAgICAgdHlwZTogU0VUX09QRF9GSUxURVJTLFxuICAgICAgICBwYXlsb2FkOiBmaWx0ZXJEYXRhXG4gICAgfSlcblxufSBcbiIsImltcG9ydCBBeGlvcyBmcm9tICdheGlvcydcbmltcG9ydCBTVE9SQUdFIGZyb20gJy4uL2hlbHBlcnMvc3RvcmFnZSdcbmltcG9ydCBOQVZJR0FURSBmcm9tICcuLi9oZWxwZXJzL25hdmlnYXRlJ1xuXG5sZXQgYXhpb3NJbnN0YW5jZSA9IEF4aW9zLmNyZWF0ZSh7XG4gICAgYmFzZVVSTDogJ2h0dHA6Ly8xMC4wLjMyLjc5OjgwODAnLFxuICAgIGhlYWRlcjoge31cbn0pO1xuXG5mdW5jdGlvbiByZWplY3RIYW5kbGVyKHJlc3BvbnNlLCBjYWxsYmFjaykge1xuICAgIC8vIGlmIChyZXNwb25zZSAmJiByZXNwb25zZS5yZXNwb25zZSAmJiByZXNwb25zZS5yZXNwb25zZS5zdGF0dXMgPT0gNDAxKSB7XG4gICAgLy8gICAgIFNUT1JBR0UuZGVsZXRlQXV0aCgpLnRoZW4oKCkgPT4ge1xuICAgIC8vICAgICAgICAgLy8gc2VuZCB0byBsb2dpbiBwYWdlXG4gICAgLy8gICAgICAgICBOQVZJR0FURS5uYXZpZ2F0ZVRvKCcvJylcbiAgICAvLyAgICAgfSlcbiAgICAvLyB9XG5cbiAgICBjYWxsYmFjayhyZXNwb25zZSlcbn1cblxuZXhwb3J0IGNvbnN0IEFQSV9HRVQgPSAodXJsKSA9PiB7XG4gICAgcmV0dXJuIFNUT1JBR0UuZ2V0QXV0aFRva2VuKCkudGhlbigodG9rZW4pID0+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGF4aW9zSW5zdGFuY2Uoe1xuICAgICAgICAgICAgICAgIG1ldGhvZDogJ2dldCcsXG4gICAgICAgICAgICAgICAgdXJsOiB1cmwsXG4gICAgICAgICAgICAgICAgLy8gaGVhZGVyczogeyAnQXV0aG9yaXphdGlvbic6IGBUb2tlbiAke3Rva2VufWAgfVxuICAgICAgICAgICAgfSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShyZXMuZGF0YSlcbiAgICAgICAgICAgIH0sIChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgIHJlamVjdEhhbmRsZXIocmVzcG9uc2UsIHJlamVjdClcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgfSlcblxuXG59XG5leHBvcnQgY29uc3QgQVBJX1BPU1QgPSAodXJsLCBkYXRhKSA9PiB7XG4gICAgcmV0dXJuIFNUT1JBR0UuZ2V0QXV0aFRva2VuKCkudGhlbigodG9rZW4pID0+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGF4aW9zSW5zdGFuY2Uoe1xuICAgICAgICAgICAgICAgIG1ldGhvZDogJ3Bvc3QnLFxuICAgICAgICAgICAgICAgIHVybDogdXJsLFxuICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICAgICAgaGVhZGVyczogeyAnQXV0aG9yaXphdGlvbic6IGBUb2tlbiAke3Rva2VufWAgfVxuICAgICAgICAgICAgfSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShyZXMuZGF0YSlcbiAgICAgICAgICAgIH0sIChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgIHJlamVjdEhhbmRsZXIocmVzcG9uc2UsIHJlamVjdClcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgfSlcblxuXG59XG5cbmV4cG9ydCBjb25zdCBBUElfUFVUID0gKHVybCwgZGF0YSkgPT4ge1xuICAgIHJldHVybiBTVE9SQUdFLmdldEF1dGhUb2tlbigpLnRoZW4oKHRva2VuKSA9PiB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBheGlvc0luc3RhbmNlKHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdwdXQnLFxuICAgICAgICAgICAgICAgIHVybDogdXJsLFxuICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICAgICAgaGVhZGVyczogeyAnQXV0aG9yaXphdGlvbic6IGBUb2tlbiAke3Rva2VufWAgfVxuICAgICAgICAgICAgfSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShyZXMuZGF0YSlcbiAgICAgICAgICAgIH0sIChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgIHJlamVjdEhhbmRsZXIocmVzcG9uc2UsIHJlamVjdClcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgfSlcblxuXG59XG5cbmV4cG9ydCBjb25zdCBBUElfREVMRVRFID0gKHVybCkgPT4ge1xuICAgIHJldHVybiBTVE9SQUdFLmdldEF1dGhUb2tlbigpLnRoZW4oKHRva2VuKSA9PiB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBheGlvc0luc3RhbmNlKHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdkZWxldGUnLFxuICAgICAgICAgICAgICAgIHVybDogdXJsLFxuICAgICAgICAgICAgICAgIGhlYWRlcnM6IHsgJ0F1dGhvcml6YXRpb24nOiBgVG9rZW4gJHt0b2tlbn1gIH1cbiAgICAgICAgICAgIH0pLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICAgICAgICAgIHJlc29sdmUocmVzLmRhdGEpXG4gICAgICAgICAgICB9LCAocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICByZWplY3RIYW5kbGVyKHJlc3BvbnNlLCByZWplY3QpXG4gICAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgIH0pXG5cbn0iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgeyBDaXJjdWxhclByb2dyZXNzIH0gZnJvbSAnbWF0ZXJpYWwtdWkvUHJvZ3Jlc3MnO1xuXG5jbGFzcyBMb2FkZXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsb2FkZXJDaXJjdWxhclwiPlxuICAgICAgICAgICAgICAgIDxDaXJjdWxhclByb2dyZXNzIGNsYXNzTmFtZT17XCJsb2FkZXJhY3R1YWxcIn0gc2l6ZT17NTB9IHRoaWNrbmVzcz17M30gLz5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICk7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBMb2FkZXJcbiIsImltcG9ydCBMb2FkZXIgZnJvbSAnLi9Mb2FkZXInXG5cbmV4cG9ydCBkZWZhdWx0IExvYWRlciIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmNvbnN0IElmcmFtU3R5bGUgPSB7XG4gICAgd2lkdGg6ICcxMDAlJyxcbiAgICBoZWlnaHQ6ICdjYWxjKDEwMHZoIC0gNjBweCknXG59XG5cblxuY2xhc3MgQ2hhdFZpZXcgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgICAgICB0aGlzLnN0YXRlID0ge1xuXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdGF0aWMgY29udGV4dFR5cGVzID0ge1xuICAgICAgICByb3V0ZXI6ICgpID0+IG51bGxcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibG9jYXRpb25TZWxlY3RvclwiPlxuICAgICAgICAgICAgICAgIDxpZnJhbWUgc3JjPVwiaHR0cDovL2NoYXRib3QucG9saWN5YmF6YWFyLmNvbS9saXZlY2hhdFwiIHN0eWxlPXtJZnJhbVN0eWxlfT48L2lmcmFtZT5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBDaGF0Vmlld1xuIiwiaW1wb3J0IENoYXRWaWV3IGZyb20gJy4vQ2hhdFZpZXcuanMnXG5cbmV4cG9ydCBkZWZhdWx0IENoYXRWaWV3IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBFbW90aUljb24gZnJvbSAnbWF0ZXJpYWwtdWktaWNvbnMvQWNjb3VudENpcmNsZSc7XG5cbmNsYXNzIFByb2ZpbGVTbGlkZXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgIH1cblxuICAgIHN3aXRjaFVzZXIocHJvZmlsZUlkKSB7XG4gICAgICAgIHRoaXMuY29udGV4dC5yb3V0ZXIuaGlzdG9yeS5wdXNoKGAvdXNlci8ke3Byb2ZpbGVJZH0ke3RoaXMucHJvcHMuc3ViUm91dGV9YClcblxuICAgIH1cblxuICAgIHN0YXRpYyBjb250ZXh0VHlwZXMgPSB7XG4gICAgICAgIHJvdXRlcjogKCkgPT4gbnVsbFxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICBsZXQgcHJvZmlsZXMgPSBbXVxuXG4gICAgICAgIHByb2ZpbGVzID0gT2JqZWN0LmtleXModGhpcy5wcm9wcy5wcm9maWxlcykubWFwKChwcm9maWxlSWQsIGkpID0+IHtcbiAgICAgICAgICAgIGxldCBzcmMgPSB0aGlzLnByb3BzLnByb2ZpbGVzW3Byb2ZpbGVJZF0ucHJvZmlsZUltYWdlIHx8IFwiaHR0cHM6Ly93d3cuYXRvbWl4LmNvbS5hdS9tZWRpYS8yMDE1LzA2L2F0b21peF91c2VyMzEucG5nXCJcbiAgICAgICAgICAgIHJldHVybiA8ZGl2IGtleT17aX0gY2xhc3NOYW1lPVwic2xpZGVUaWxlXCIgb25DbGljaz17dGhpcy5zd2l0Y2hVc2VyLmJpbmQodGhpcywgcHJvZmlsZUlkKX0+XG4gICAgICAgICAgICAgICAgPGltZyBjbGFzc05hbWU9XCJwcm9maWxlQ2FyZEltYWdlXCIgc3JjPXtzcmN9Lz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICB9KVxuXG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicHJvZmlsZVNsaWRlclwiPlxuICAgICAgICAgICAgICAgIHtwcm9maWxlc31cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBQcm9maWxlU2xpZGVyXG4iLCJpbXBvcnQgUHJvZmlsZVNsaWRlciBmcm9tICcuL1Byb2ZpbGVTbGlkZXIuanMnXG5cbmV4cG9ydCBkZWZhdWx0IFByb2ZpbGVTbGlkZXIiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgeyBnZXRUaW1lLCBnZXREYXlOYW1lIH0gZnJvbSAnLi4vLi4vLi4vdXRpbHMvZGF0ZVRpbWVVdGlscy5qcydcblxuY2xhc3MgVGltZVNsb3RTZWxlY3RvciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgICBzZWxlY3RlZERheTogMCxcbiAgICAgICAgICAgIHNlbGVjdGVkSW50ZXJ2YWw6IDAsXG4gICAgICAgICAgICBzZWxlY3RlZFRpbWVTbG90OiAwXG5cbiAgICAgICAgfVxuICAgIH1cbiAgICBjb21wb25lbnRXaWxsTW91bnQoKSB7XG4gICAgICAgIGxldCB0aW1lU2xvdHMgPSB0aGlzLnByb3BzLnRpbWVTbG90cztcblxuICAgICAgICB0aGlzLnNldERlZmF1bHRTZWxlY3RlZCh0aW1lU2xvdHMpO1xuXG4gICAgfVxuICAgIHNldERlZmF1bHRTZWxlY3RlZCh0aW1lU2xvdHMpIHtcbiAgICAgICAgbGV0IGRheXMgPSB0aW1lU2xvdHMuZGF0ZXM7XG4gICAgICAgIGxldCBkZWZhdWx0RGF5SW5kZXggPSB0aGlzLmdldEZpcnN0QXZhaWxhYmxlRGF5KGRheXMpO1xuICAgICAgICBcbiAgICAgICAgaWYgKGRlZmF1bHREYXlJbmRleCB8fCBkZWZhdWx0RGF5SW5kZXggPT09IDApIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBzZWxlY3RlZERheTogZGVmYXVsdERheUluZGV4IH0pO1xuICAgICAgICAgICAgdmFyIGRlZmF1dEludGVyd2FsSW5kZXggPSB0aGlzLmdldEZpcnN0QXZhaWxhYmxlSW50ZXJ3YWwoZGF5c1tkZWZhdWx0RGF5SW5kZXhdLmludGVydmFscyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGRlZmF1dEludGVyd2FsSW5kZXggfHwgZGVmYXV0SW50ZXJ3YWxJbmRleCA9PT0gMCkge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHNlbGVjdGVkSW50ZXJ2YWw6IGRlZmF1dEludGVyd2FsSW5kZXggfSk7XG4gICAgICAgICAgICB2YXIgZGVmYXVsdFRpbWVTbG90SW5kZXggPSB0aGlzLmdldEZpcnN0QXZhaWxhYmxlVGltZVNsb3QoZGF5c1tkZWZhdWx0RGF5SW5kZXhdLmludGVydmFsc1tkZWZhdXRJbnRlcndhbEluZGV4XS50aW1lU2xvdHMpO1xuXG4gICAgICAgIH1cbiAgICAgICAgaWYgKGRlZmF1bHRUaW1lU2xvdEluZGV4IHx8IGRlZmF1bHRUaW1lU2xvdEluZGV4ID09PSAwKSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgc2VsZWN0ZWRUaW1lU2xvdDogZGVmYXVsdFRpbWVTbG90SW5kZXggfSk7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIGdldEZpcnN0QXZhaWxhYmxlSW50ZXJ3YWwoaW50ZXJ2YWxzKSB7XG5cbiAgICAgICAgZm9yIChsZXQgaW50ZXJ3YWxJbmRleCBpbiBpbnRlcnZhbHMpIHtcbiAgICAgICAgICAgIGxldCBpbnRlcndhbCA9IGludGVydmFsc1tpbnRlcndhbEluZGV4XTtcbiAgICAgICAgICAgIGlmIChpbnRlcndhbCAmJiBpbnRlcndhbC5pc0F2YWlsYWJsZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBwYXJzZUludChpbnRlcndhbEluZGV4KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldEZpcnN0QXZhaWxhYmxlVGltZVNsb3QodGltZVNsb3RzKSB7XG5cbiAgICAgICAgZm9yIChsZXQgdGltZVNsb3RJbmRleCBpbiB0aW1lU2xvdHMpIHtcbiAgICAgICAgICAgIGxldCB0aW1lU2xvdCA9IHRpbWVTbG90c1t0aW1lU2xvdEluZGV4XTtcbiAgICAgICAgICAgIGlmICh0aW1lU2xvdCAmJiB0aW1lU2xvdC5pc0F2YWlsYWJsZSkge1xuICAgICAgICAgICAgICAgIC8vIGNhbGxpbmcgcGFyZW50IHRpbWVTbG90IHNldHRlclxuICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuc2VsZWN0VGltZVNsb3QodGltZVNsb3QpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHBhcnNlSW50KHRpbWVTbG90SW5kZXgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgXG5cbiAgICB9XG5cbiAgICBnZXRGaXJzdEF2YWlsYWJsZURheShkYXlzKSB7XG5cbiAgICAgICAgZm9yIChsZXQgZGF5SW5kZXggaW4gZGF5cykge1xuICAgICAgICAgICAgbGV0IGRheSA9IGRheXNbZGF5SW5kZXhdO1xuICAgICAgICAgICAgaWYgKGRheSAmJiBkYXkuaXNBdmFpbGFibGUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcGFyc2VJbnQoZGF5SW5kZXgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIG9uRGF0ZUNsaWNrKGRhdGUsIHNlbGVjdGVkSW5kZXgsIGluZGV4KSB7XG5cbiAgICAgICAgaWYgKHNlbGVjdGVkSW5kZXggIT09IGluZGV4ICYmIGRhdGUuaXNBdmFpbGFibGUpIHtcbiAgICAgICAgICAgIHZhciBhdmFpbGFibGVJbnRlcndhbCA9IHRoaXMuZ2V0Rmlyc3RBdmFpbGFibGVJbnRlcndhbChkYXRlLmludGVydmFscylcbiAgICAgICAgICAgIGlmIChhdmFpbGFibGVJbnRlcndhbCB8fCBhdmFpbGFibGVJbnRlcndhbCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIGxldCB0aW1lU2xvdHMgPSBkYXRlLmludGVydmFsc1thdmFpbGFibGVJbnRlcndhbF0udGltZVNsb3RzO1xuICAgICAgICAgICAgICAgIHZhciBhdmFpbGFibGVUaW1lU2xvdCA9IHRoaXMuZ2V0Rmlyc3RBdmFpbGFibGVUaW1lU2xvdCh0aW1lU2xvdHMpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgc2VsZWN0ZWREYXk6IGluZGV4LCBzZWxlY3RlZEludGVydmFsOiBhdmFpbGFibGVJbnRlcndhbCwgc2VsZWN0ZWRUaW1lU2xvdDogYXZhaWxhYmxlVGltZVNsb3QgfSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgb25JbnRlcnZhbENsaWNrKGludGVyd2FsLCBzZWxlY3RlZEluZGV4LCBpbmRleCkge1xuXG5cblxuICAgICAgICBpZiAoc2VsZWN0ZWRJbmRleCAhPT0gaW5kZXggJiYgaW50ZXJ3YWwuaXNBdmFpbGFibGUpIHtcbiAgICAgICAgICAgIGxldCB0aW1lU2xvdHMgPSBpbnRlcndhbC50aW1lU2xvdHM7XG4gICAgICAgICAgICB2YXIgYXZhaWxhYmxlVGltZVNsb3QgPSB0aGlzLmdldEZpcnN0QXZhaWxhYmxlVGltZVNsb3QodGltZVNsb3RzKTtcblxuXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgc2VsZWN0ZWRJbnRlcnZhbDogaW5kZXgsIHNlbGVjdGVkVGltZVNsb3Q6IGF2YWlsYWJsZVRpbWVTbG90IH0pO1xuICAgICAgICB9XG5cbiAgICB9XG4gICAgb25UaW1lU2xvdENsaWNrKHRpbWVTbG90LCBzZWxlY3RlZEluZGV4LCBpbmRleCkge1xuXG4gICAgICAgIGlmIChzZWxlY3RlZEluZGV4ICE9PSBpbmRleCAmJiB0aW1lU2xvdC5pc0F2YWlsYWJsZSkge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHNlbGVjdGVkVGltZVNsb3Q6IGluZGV4IH0pO1xuICAgICAgICAgICAgLy8gY2FsbGluZyBwYXJlbnQgdGltZVNsb3Qgc2V0dGVyXG4gICAgICAgICAgICB0aGlzLnByb3BzLnNlbGVjdFRpbWVTbG90KHRpbWVTbG90KVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIGxldCB7IGRhdGVzIH0gPSB0aGlzLnByb3BzLnRpbWVTbG90c1xuXG4gICAgICAgIGxldCBpbnRlcnZhbHMgPSBbXVxuICAgICAgICBsZXQgdGltZVNsb3RzID0gW11cbiAgICAgICAgbGV0IGRhdGVMaXN0ID0gW11cblxuXG4gICAgICAgIGRhdGVMaXN0ID0gZGF0ZXMubWFwKChkYXRlLCBpKSA9PiB7XG4gICAgICAgICAgICBsZXQgZGF5RGF0ZSA9IG5ldyBEYXRlKGRhdGUuZGF0ZSkuZ2V0RGF0ZSgpXG4gICAgICAgICAgICBsZXQgZGF5TmFtZSA9IGdldERheU5hbWUoZGF0ZS5kYXRlKTtcbiAgICAgICAgICAgIGxldCBzZWxlY3RlZCA9IHRoaXMuc3RhdGUuc2VsZWN0ZWREYXkgPT0gaVxuICAgICAgICAgICAgcmV0dXJuIDxkaXYga2V5PXtpfSBvbkNsaWNrPXt0aGlzLm9uRGF0ZUNsaWNrLmJpbmQodGhpcywgZGF0ZSwgdGhpcy5zdGF0ZS5zZWxlY3RlZERheSwgaSl9IGNsYXNzTmFtZT17ZGF0ZS5pc0F2YWlsYWJsZSA/IChzZWxlY3RlZCA/IFwiZGF0ZVRpbGUgc2VsZWN0ZWRcIiA6IFwiZGF0ZVRpbGVcIikgOiBcImRhdGVUaWxlIGRpc2FibGVkXCJ9PlxuICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cImRhdGVcIj57ZGF5RGF0ZX08L3A+XG4gICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwiZGF5XCI+e2RheU5hbWV9PC9wPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIH0pXG4gICAgICAgIGludGVydmFscyA9IGRhdGVzW3RoaXMuc3RhdGUuc2VsZWN0ZWREYXldLmludGVydmFscy5tYXAoKGludGVydmFsLCBpKSA9PiB7XG4gICAgICAgICAgICBsZXQgc2VsZWN0ZWQgPSB0aGlzLnN0YXRlLnNlbGVjdGVkSW50ZXJ2YWwgPT0gaVxuICAgICAgICAgICAgcmV0dXJuIDxidXR0b24ga2V5PXtpfSBvbkNsaWNrPXt0aGlzLm9uSW50ZXJ2YWxDbGljay5iaW5kKHRoaXMsIGludGVydmFsLCB0aGlzLnN0YXRlLnNlbGVjdGVkSW50ZXJ2YWwsIGkpfSBjbGFzc05hbWU9e2ludGVydmFsLmlzQXZhaWxhYmxlID8gKHNlbGVjdGVkID8gXCJ0c0J0biBzZWxlY3RlZFwiIDogXCJ0c0J0blwiKSA6IFwidHNCdG4gZGlzYWJsZWRcIn0+e2ludGVydmFsLm5hbWV9PC9idXR0b24+XG4gICAgICAgIH0pXG5cbiAgICAgICAgdGltZVNsb3RzID0gZGF0ZXNbdGhpcy5zdGF0ZS5zZWxlY3RlZERheV0uaW50ZXJ2YWxzW3RoaXMuc3RhdGUuc2VsZWN0ZWRJbnRlcnZhbF0udGltZVNsb3RzLm1hcCgoc2xvdCwgaSkgPT4ge1xuICAgICAgICAgICAgbGV0IHNlbGVjdGVkID0gdGhpcy5zdGF0ZS5zZWxlY3RlZFRpbWVTbG90ID09IGlcbiAgICAgICAgICAgIGxldCBzbG90VGV4dCA9IGdldFRpbWUoc2xvdC5zdGFydClcbiAgICAgICAgICAgIGlmKHNsb3QuZW5kKXtcbiAgICAgICAgICAgICAgICBzbG90VGV4dCArPSBgIC0gJHtnZXRUaW1lKHNsb3QuZW5kKX1gXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gPHNwYW4ga2V5PXtpfSBvbkNsaWNrPXt0aGlzLm9uVGltZVNsb3RDbGljay5iaW5kKHRoaXMsIHNsb3QsIHRoaXMuc3RhdGUuc2VsZWN0ZWRUaW1lU2xvdCwgaSl9IGNsYXNzTmFtZT17c2xvdC5pc0F2YWlsYWJsZSA/IChzZWxlY3RlZCA/IFwic2xvdCBzZWxlY3RlZFwiIDogXCJzbG90XCIpIDogXCJzbG90IGRpc2FibGVkXCJ9PntzbG90VGV4dH08L3NwYW4+XG4gICAgICAgIH0pXG5cblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0aW1lU2xvdFNlbGVjdG9yXCI+XG4gICAgICAgICAgICAgICAgPGg1PlNlbGVjdCBwcmVmZmVyZWQgdGltZSBzbG90PC9oNT5cblxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZGF0ZUNhclwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNjcm9sbGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICB7ZGF0ZUxpc3R9XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0aW1lU2xvdHNcIj5cbiAgICAgICAgICAgICAgICAgICAge2ludGVydmFsc31cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzbG90c1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAge3RpbWVTbG90c31cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgVGltZVNsb3RTZWxlY3RvclxuIiwiaW1wb3J0IFRpbWVTbG90U2VsZWN0b3IgZnJvbSAnLi9UaW1lU2xvdFNlbGVjdG9yLmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBUaW1lU2xvdFNlbGVjdG9yIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IFByb2ZpbGVTbGlkZXIgZnJvbSAnLi4vcHJvZmlsZVNsaWRlci9pbmRleC5qcydcbmltcG9ydCBBcHBvaW50bWVudExpc3QgZnJvbSAnLi9hcHBvaW50bWVudExpc3QvaW5kZXguanMnXG5cbmNsYXNzIFVzZXJBcHBvaW50bWVudHNWaWV3IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcblxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIHRoaXMucHJvcHMuZ2V0VXNlclByb2ZpbGVXaXRoQXBwb2ludG1lbnRzKClcbiAgICB9XG5cbiAgICBzdGF0aWMgY29udGV4dFR5cGVzID0ge1xuICAgICAgICByb3V0ZXI6ICgpID0+IG51bGxcbiAgICB9XG5cbiAgICBjb21wYXJlRGF0ZVdpdGhUb2RheShkYXRlKXtcbiAgICAgICAgbGV0IHRvZGF5ID0gbmV3IERhdGUoKS5nZXRUaW1lKClcbiAgICAgICAgZGF0ZSA9IG5ldyBEYXRlKGRhdGUpLmdldFRpbWUoKVxuICAgICAgICByZXR1cm4gdG9kYXkgPiBkYXRlXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIGxldCBzZWxlY3RlZFVzZXIgPSBudWxsXG4gICAgICAgIGxldCB1c2VyUHJvZmlsZUlkID0gdGhpcy5wcm9wcy5tYXRjaC5wYXJhbXMuaWRcblxuICAgICAgICBpZiAodGhpcy5wcm9wcy5VU0VSLnByb2ZpbGVzW3VzZXJQcm9maWxlSWRdKSB7XG4gICAgICAgICAgICBzZWxlY3RlZFVzZXIgPSB0aGlzLnByb3BzLlVTRVIucHJvZmlsZXNbdXNlclByb2ZpbGVJZF1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIE9iamVjdC5rZXlzKHRoaXMucHJvcHMuVVNFUi5wcm9maWxlcykubWFwKChwcm9maWxlSWQpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5wcm9wcy5VU0VSLnByb2ZpbGVzW3Byb2ZpbGVJZF0uaXNEZWZhdWx0VXNlcikge1xuICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZFVzZXIgPSB0aGlzLnByb3BzLlVTRVIucHJvZmlsZXNbcHJvZmlsZUlkXVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ1c2VyUHJvZmlsZVwiPlxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgKCBzZWxlY3RlZFVzZXIgJiYgc2VsZWN0ZWRVc2VyLmFwcG9pbnRtZW50cyApID8gPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxQcm9maWxlU2xpZGVyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvZmlsZXM9e3RoaXMucHJvcHMuVVNFUi5wcm9maWxlc31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWJSb3V0ZT1cIi9hcHBvaW50bWVudHNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInVwY29taW5nYXBwXCI+VXBjb21pbmcgT1BEIEFwcG9pbnRtZW50czwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZFVzZXIuYXBwb2ludG1lbnRzLmZpbHRlcigoYXBwb2ludG1lbnQsaSkgPT57XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkYXRlID0gYXBwb2ludG1lbnQuc2xvdCA/IGFwcG9pbnRtZW50LnNsb3Quc3RhcnQgOiAwXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAhdGhpcy5jb21wYXJlRGF0ZVdpdGhUb2RheShkYXRlKSBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KS5tYXAoKGFwcG9pbnRtZW50LCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gPEFwcG9pbnRtZW50TGlzdCBrZXk9e2luZGV4fSBkYXRhPXthcHBvaW50bWVudH0gLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwicHJldmFwcFwiPlByZXZpb3VzIE9QRCBBcHBvaW50bWVudHM8L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRVc2VyLmFwcG9pbnRtZW50cy5maWx0ZXIoKGFwcG9pbnRtZW50LGkpID0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZGF0ZSA9IGFwcG9pbnRtZW50LnNsb3QgPyBhcHBvaW50bWVudC5zbG90LnN0YXJ0IDogMFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jb21wYXJlRGF0ZVdpdGhUb2RheShkYXRlKSBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KS5tYXAoKGFwcG9pbnRtZW50LCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gPEFwcG9pbnRtZW50TGlzdCBrZXk9e2luZGV4fSBkYXRhPXthcHBvaW50bWVudH0gLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj4gOiBcIlwiXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgVXNlckFwcG9pbnRtZW50c1ZpZXdcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUmlnaHRBcnJvd0ljb24gZnJvbSAnbWF0ZXJpYWwtdWktaWNvbnMvS2V5Ym9hcmRBcnJvd1JpZ2h0JztcblxuY2xhc3MgQXBwb2ludG1lbnRMaXN0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICB9XG5cbiAgICBnZXRUaW1lKHVuaXhfdGltZXN0YW1wKSB7XG4gICAgICAgIHZhciBkYXRlID0gbmV3IERhdGUodW5peF90aW1lc3RhbXAgKiAxMDAwKTtcbiAgICAgICAgdmFyIGhvdXJzID0gZGF0ZS5nZXRIb3VycygpO1xuICAgICAgICB2YXIgbWludXRlcyA9IFwiMFwiICsgZGF0ZS5nZXRNaW51dGVzKCk7XG4gICAgICAgIHJldHVybiBob3VycyArICc6JyArIG1pbnV0ZXMuc3Vic3RyKC0yKVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICBsZXQgeyBkb2N0b3JOYW1lLCBzbG90IH0gPSB0aGlzLnByb3BzLmRhdGFcbiAgICAgICAgc2xvdCA9IHNsb3QgfHwge1xuICAgICAgICAgICAgc3RhcnQ6IDAsXG4gICAgICAgICAgICBlbmQ6IDBcbiAgICAgICAgfVxuICAgICAgICBsZXQgZGF0ZSA9IG5ldyBEYXRlKHNsb3Quc3RhcnQpLnRvRGF0ZVN0cmluZygpXG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYXBwb2ludG1lbnRcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm5hbWVcIj5cblxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZGV0YWlsc1wiPlxuICAgICAgICAgICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtkb2N0b3JOYW1lfVxuICAgICAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgICAgIDxwPlxuICAgICAgICAgICAgICAgICAgICAgICAge2RhdGV9XG4gICAgICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICAgICAgPHA+XG4gICAgICAgICAgICAgICAgICAgICAgICB7dGhpcy5nZXRUaW1lKHNsb3Quc3RhcnQpICsgXCIgdG8gXCIgKyB0aGlzLmdldFRpbWUoc2xvdC5lbmQpfVxuICAgICAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJib29rXCI+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHRcIj5WaWV3IENvbmZpcm1hdGlvbjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPFJpZ2h0QXJyb3dJY29uIGNsYXNzTmFtZT1cImJvb2tJY29uXCIgLz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBBcHBvaW50bWVudExpc3RcbiIsImltcG9ydCBBcHBvaW50bWVudExpc3QgZnJvbSAnLi9BcHBvaW50bWVudExpc3QuanMnXG5cbmV4cG9ydCBkZWZhdWx0IEFwcG9pbnRtZW50TGlzdCIsImltcG9ydCBVc2VyQXBwb2ludG1lbnRzVmlldyBmcm9tICcuL1VzZXJBcHBvaW50bWVudHNWaWV3LmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBVc2VyQXBwb2ludG1lbnRzVmlldyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCBQcm9maWxlU2xpZGVyIGZyb20gJy4uL3Byb2ZpbGVTbGlkZXIvaW5kZXguanMnXG5pbXBvcnQgUHJvZmlsZURhdGEgZnJvbSAnLi9wcm9maWxlRGF0YS9pbmRleC5qcydcblxuY2xhc3MgVXNlclByb2ZpbGVWaWV3IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcblxuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgICB0aGlzLnByb3BzLmdldFVzZXJQcm9maWxlKClcbiAgICB9XG5cbiAgICBzdGF0aWMgY29udGV4dFR5cGVzID0ge1xuICAgICAgICByb3V0ZXI6ICgpID0+IG51bGxcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgbGV0IHNlbGVjdGVkVXNlciA9IG51bGxcbiAgICAgICAgbGV0IHVzZXJQcm9maWxlSWQgPSB0aGlzLnByb3BzLm1hdGNoLnBhcmFtcy5pZFxuXG4gICAgICAgIGlmICh0aGlzLnByb3BzLlVTRVIucHJvZmlsZXNbdXNlclByb2ZpbGVJZF0pIHtcbiAgICAgICAgICAgIHNlbGVjdGVkVXNlciA9IHRoaXMucHJvcHMuVVNFUi5wcm9maWxlc1t1c2VyUHJvZmlsZUlkXVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgT2JqZWN0LmtleXModGhpcy5wcm9wcy5VU0VSLnByb2ZpbGVzKS5tYXAoKHByb2ZpbGVJZCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnByb3BzLlVTRVIucHJvZmlsZXNbcHJvZmlsZUlkXS5pc0RlZmF1bHRVc2VyKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkVXNlciA9IHRoaXMucHJvcHMuVVNFUi5wcm9maWxlc1twcm9maWxlSWRdXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidXNlclByb2ZpbGVcIj5cbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkVXNlciA/IDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8UHJvZmlsZVNsaWRlciBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9maWxlcz17dGhpcy5wcm9wcy5VU0VSLnByb2ZpbGVzfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1YlJvdXRlPVwiXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8UHJvZmlsZURhdGEgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvZmlsZURhdGE9e3NlbGVjdGVkVXNlcn1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PiA6IFwiXCJcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBVc2VyUHJvZmlsZVZpZXdcbiIsImltcG9ydCBVc2VyUHJvZmlsZVZpZXcgZnJvbSAnLi9Vc2VyUHJvZmlsZVZpZXcuanMnXG5cbmV4cG9ydCBkZWZhdWx0IFVzZXJQcm9maWxlVmlldyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmNsYXNzIFByb2ZpbGVEYXRhIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICB9XG5cbiAgICBvcGVuQXBwb2ludG1lbnRzKHByb2ZpbGVJZCkge1xuICAgICAgICB0aGlzLmNvbnRleHQucm91dGVyLmhpc3RvcnkucHVzaChgL3VzZXIvJHtwcm9maWxlSWR9L2FwcG9pbnRtZW50c2ApXG5cbiAgICB9XG5cbiAgICBvcGVuUmVwb3J0cyhwcm9maWxlSWQpIHtcbiAgICAgICAgdGhpcy5jb250ZXh0LnJvdXRlci5oaXN0b3J5LnB1c2goYC91c2VyLyR7cHJvZmlsZUlkfS9yZXBvcnRzYClcblxuICAgIH1cblxuICAgIHN0YXRpYyBjb250ZXh0VHlwZXMgPSB7XG4gICAgICAgIHJvdXRlcjogKCkgPT4gbnVsbFxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICBsZXQge25hbWUsIGdlbmRlciwgYWdlLCBtb2JpbGUsIG1lZGljYWxIaXN0b3J5Q291bnQsIG1lZGljYWxUZXN0Q291bnQsIG9ubGluZUNvbnN1bHRhdGlvbkNvdW50LCBvcGRWaXNpdENvdW50LCBwcm9maWxlSWR9ID0gdGhpcy5wcm9wcy5wcm9maWxlRGF0YVxuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2PiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInVzZXJEZWFpbFwiPlxuICAgICAgICAgICAgICAgICAgICA8cD57bmFtZX08L3A+XG4gICAgICAgICAgICAgICAgICAgIDxwPnthZ2V9IFllYXJzPC9wPlxuICAgICAgICAgICAgICAgICAgICA8cD57Z2VuZGVyfTwvcD5cbiAgICAgICAgICAgICAgICAgICAgPHA+e21vYmlsZX08L3A+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwcm9maWxlQnRuc1wiPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uPlByb2ZpbGUgTm90IFZlcmlmaWVkPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24+Tm8gT1BEIEluc3VyYW5jZTwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uPk9ubGluZSBDb25zdWx0YXRpb25zKHtvbmxpbmVDb25zdWx0YXRpb25Db3VudH0pPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gb25DbGljaz17dGhpcy5vcGVuQXBwb2ludG1lbnRzLmJpbmQodGhpcyxwcm9maWxlSWQpfT5PUEQgVmlzaXRzICh7b3BkVmlzaXRDb3VudH0pPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24+TWVkaWNhbCBIaXN0b3J5ICh7bWVkaWNhbEhpc3RvcnlDb3VudH0pPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gb25DbGljaz17dGhpcy5vcGVuUmVwb3J0cy5iaW5kKHRoaXMscHJvZmlsZUlkKX0+VGVzdCBSZXBvcnRzICh7bWVkaWNhbFRlc3RDb3VudH0pPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgUHJvZmlsZURhdGFcbiIsImltcG9ydCBQcm9maWxlRGF0YSBmcm9tICcuL1Byb2ZpbGVEYXRhLmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBQcm9maWxlRGF0YSIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCBQcm9maWxlU2xpZGVyIGZyb20gJy4uL3Byb2ZpbGVTbGlkZXIvaW5kZXguanMnXG5pbXBvcnQgUmVwb3J0TGlzdCBmcm9tICcuL3JlcG9ydExpc3QvaW5kZXguanMnXG5cbmNsYXNzIFVzZXJSZXBvcnRzVmlldyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG5cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgICB0aGlzLnByb3BzLmdldFVzZXJQcm9maWxlV2l0aFRlc3RzKClcbiAgICB9XG5cbiAgICBzdGF0aWMgY29udGV4dFR5cGVzID0ge1xuICAgICAgICByb3V0ZXI6ICgpID0+IG51bGxcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgbGV0IHNlbGVjdGVkVXNlciA9IG51bGxcbiAgICAgICAgbGV0IHVzZXJQcm9maWxlSWQgPSB0aGlzLnByb3BzLm1hdGNoLnBhcmFtcy5pZFxuXG4gICAgICAgIGlmICh0aGlzLnByb3BzLlVTRVIucHJvZmlsZXNbdXNlclByb2ZpbGVJZF0pIHtcbiAgICAgICAgICAgIHNlbGVjdGVkVXNlciA9IHRoaXMucHJvcHMuVVNFUi5wcm9maWxlc1t1c2VyUHJvZmlsZUlkXVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gc2VsZWN0aW5nIGRlZmF1bHQgdXNlclxuICAgICAgICAgICAgT2JqZWN0LmtleXModGhpcy5wcm9wcy5VU0VSLnByb2ZpbGVzKS5tYXAoKHByb2ZpbGVJZCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnByb3BzLlVTRVIucHJvZmlsZXNbcHJvZmlsZUlkXS5pc0RlZmF1bHRVc2VyKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkVXNlciA9IHRoaXMucHJvcHMuVVNFUi5wcm9maWxlc1twcm9maWxlSWRdXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInVzZXJQcm9maWxlXCI+XG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAoc2VsZWN0ZWRVc2VyICYmIHNlbGVjdGVkVXNlci50ZXN0cykgPyA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPFByb2ZpbGVTbGlkZXJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9maWxlcz17dGhpcy5wcm9wcy5VU0VSLnByb2ZpbGVzfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1YlJvdXRlPVwiL3JlcG9ydHNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInVwY29taW5nYXBwXCI+UmVwb3J0czwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZFVzZXIudGVzdHMubWFwKCh0ZXN0LCBpKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiA8UmVwb3J0TGlzdFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YT17dGVzdH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleT17aX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PiA6IFwiXCJcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBVc2VyUmVwb3J0c1ZpZXdcbiIsImltcG9ydCBVc2VyUmVwb3J0c1ZpZXcgZnJvbSAnLi9Vc2VyUmVwb3J0c1ZpZXcuanMnXG5cbmV4cG9ydCBkZWZhdWx0IFVzZXJSZXBvcnRzVmlldyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmNsYXNzIFJlcG9ydExpc3QgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgIH1cblxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIGxldCB7IG5hbWUsIHN1Yl9uYW1lLCBhYmJyZXZpYXRpb24sIGNhdGVnb3J5LCBzbG90ICB9ID0gdGhpcy5wcm9wcy5kYXRhXG4gICAgICAgIHNsb3QgPSBzbG90IHx8IHtcbiAgICAgICAgICAgIHN0YXJ0OiAwLFxuICAgICAgICAgICAgZW5kOiAwXG4gICAgICAgIH1cbiAgICAgICAgbGV0IGRhdGUgPSBuZXcgRGF0ZShzbG90LnN0YXJ0KS50b0RhdGVTdHJpbmcoKVxuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFwcG9pbnRtZW50XCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJkZXRhaWxzXCI+XG4gICAgICAgICAgICAgICAgICAgIDxwPlxuICAgICAgICAgICAgICAgICAgICAgICAge25hbWUgKyBcIiAsIFwiICsgc3ViX25hbWV9XG4gICAgICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICAgICAgPHA+XG4gICAgICAgICAgICAgICAgICAgICAgICB7Y2F0ZWdvcnkgKyBcIiAsIFwiICsgYWJicmV2aWF0aW9ufVxuICAgICAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgICAgIDxwPlxuICAgICAgICAgICAgICAgICAgICAgICAge2RhdGV9XG4gICAgICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJvb2tcIj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidmlld3JlcG9ydFwiPlZpZXcgUmVwb3J0PC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IFJlcG9ydExpc3RcbiIsImltcG9ydCBSZXBvcnRMaXN0IGZyb20gJy4vUmVwb3J0TGlzdC5qcydcblxuZXhwb3J0IGRlZmF1bHQgUmVwb3J0TGlzdCIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmNsYXNzIFVzZXJTaWdudXBWaWV3IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIGFwcG9pbm1lbnRGb3I6ICdzZWxmJyxcbiAgICAgICAgICAgIHBhdGllbnROYW1lOiAnJyxcbiAgICAgICAgICAgIGFnZTogJycsXG4gICAgICAgICAgICBnZW5kZXI6ICdtJyxcbiAgICAgICAgICAgIGVtYWlsOiAnJyxcbiAgICAgICAgICAgIHBob25lTnVtYmVyOiAnJ1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaW5wdXRIYW5kbGVyKGUpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IFtlLnRhcmdldC5uYW1lXTogZS50YXJnZXQudmFsdWUgfSlcbiAgICB9XG5cbiAgICBzdWJtaXRGb3JtKCkge1xuXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIDxoZWFkZXIgY2xhc3NOYW1lPVwic2tpbi13aGl0ZSBmaXhlZCBob3Jpem9udGFsIHRvcCBiZHItMSBib3R0b20gbGlnaHRcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250YWluZXItZmx1aWRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtMlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dWwgY2xhc3NOYW1lPVwiaW5saW5lLWxpc3RcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaT48c3BhbiBjbGFzc05hbWU9XCJpY29uIGljb24tc20gdGV4dC1taWRkbGUgYmFjay1pY29uLXdoaXRlXCI+PGltZyBzcmM9XCIvYXNzZXRzL2ltZy9jdXN0b21lci1pY29ucy9iYWNrLWljb24ucG5nXCIgY2xhc3NOYW1lPVwiaW1nLWZsdWlkXCIgLz48L3NwYW4+PC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC04XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaGVhZGVyLXRpdGxlIGZ3LTcwMCBjYXBpdGFsaXplIHRleHQtY2VudGVyXCI+QWRkIFVzZXIgUHJvZmlsZTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLTJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2hlYWRlcj5cblxuICAgICAgICAgICAgICAgIDxzZWN0aW9uIGNsYXNzTmFtZT1cIndyYXAgdmFsaWRhdGlvbi1ib29rLXNjcmVlblwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIndpZGdldCBuby1yb3VuZCBuby1zaGFkb3dcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwid2lkZ2V0LWhlYWRlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoNCBjbGFzc05hbWU9XCJ3aWRnZXQtdGl0bGVcIj5Db250YWN0IERldGFpbHM8L2g0PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIndpZGdldC1jb250ZW50XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGZvcm0gY2xhc3NOYW1lPVwiZ28tYm90dG9tXCIgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXAgaW5wdXQtZ3JvdXBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJpbmxpbmUgaW5wdXQtbGFiZWxcIj5BcHBvaW50bWVudCBmb3I8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjaG9vc2UtZ2VuZGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cInJhZGlvLWlubGluZVwiPjxpbnB1dCB2YWx1ZT17J3NlbGYnfSBvbkNoYW5nZT17dGhpcy5pbnB1dEhhbmRsZXIuYmluZCh0aGlzKX0gY2hlY2tlZD17dGhpcy5zdGF0ZS5hcHBvaW5tZW50Rm9yID09ICdzZWxmJ30gdHlwZT1cInJhZGlvXCIgbmFtZT1cImFwcG9pbm1lbnRGb3JcIiAvPlNlbGY8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJyYWRpby1pbmxpbmVcIj48aW5wdXQgdmFsdWU9eydlbHNlJ30gb25DaGFuZ2U9e3RoaXMuaW5wdXRIYW5kbGVyLmJpbmQodGhpcyl9IGNoZWNrZWQ9e3RoaXMuc3RhdGUuYXBwb2lubWVudEZvciA9PSAnZWxzZSd9IHR5cGU9XCJyYWRpb1wiIG5hbWU9XCJhcHBvaW5tZW50Rm9yXCIgLz5Tb21lb25lIGVsc2U8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxhYmVsV3JhcFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IGlkPVwiZm5hbWVcIiBuYW1lPVwicGF0aWVudE5hbWVcIiB0eXBlPVwidGV4dFwiIHZhbHVlPXt0aGlzLnN0YXRlLnBhdGllbnROYW1lfSBvbkNoYW5nZT17dGhpcy5pbnB1dEhhbmRsZXIuYmluZCh0aGlzKX0gcmVxdWlyZWQgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBodG1sRm9yPVwiZm5hbWVcIj5QYXRpZW50IE5hbWU8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC14cyB0ZXh0LWxpZ2h0XCI+KEFwcG9pbm1lbnQgdmFsaWQgb25seSBmb3IgdGhlIHByb3ZpZGVkIG5hbWUpPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsYWJlbFdyYXBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCBpZD1cImFnZVwiIG5hbWU9XCJhZ2VcIiB0eXBlPVwidGV4dFwiIHZhbHVlPXt0aGlzLnN0YXRlLmFnZX0gb25DaGFuZ2U9e3RoaXMuaW5wdXRIYW5kbGVyLmJpbmQodGhpcyl9IHJlcXVpcmVkIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgaHRtbEZvcj1cImFnZVwiPkFnZTwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXAgaW5wdXQtZ3JvdXBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJpbmxpbmUgaW5wdXQtbGFiZWxcIj5HZW5kZXI8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjaG9vc2UtZ2VuZGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cInJhZGlvLWlubGluZVwiPjxpbnB1dCB2YWx1ZT17J20nfSBvbkNoYW5nZT17dGhpcy5pbnB1dEhhbmRsZXIuYmluZCh0aGlzKX0gY2hlY2tlZD17dGhpcy5zdGF0ZS5nZW5kZXIgPT0gJ20nfSB0eXBlPVwicmFkaW9cIiBuYW1lPVwiZ2VuZGVyXCIgLz5NYWxlPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwicmFkaW8taW5saW5lXCI+PGlucHV0IHZhbHVlPXsnZid9IG9uQ2hhbmdlPXt0aGlzLmlucHV0SGFuZGxlci5iaW5kKHRoaXMpfSBjaGVja2VkPXt0aGlzLnN0YXRlLmdlbmRlciA9PSAnZid9IHR5cGU9XCJyYWRpb1wiIG5hbWU9XCJnZW5kZXJcIiAvPkZlbWFsZTwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cInJhZGlvLWlubGluZVwiPjxpbnB1dCB2YWx1ZT17J28nfSBvbkNoYW5nZT17dGhpcy5pbnB1dEhhbmRsZXIuYmluZCh0aGlzKX0gY2hlY2tlZD17dGhpcy5zdGF0ZS5nZW5kZXIgPT0gJ28nfSB0eXBlPVwicmFkaW9cIiBuYW1lPVwiZ2VuZGVyXCIgLz5PdGhlcjwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibGFiZWxXcmFwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgaWQ9XCJlbWFpbFwiIG5hbWU9XCJlbWFpbFwiIHR5cGU9XCJ0ZXh0XCIgdmFsdWU9e3RoaXMuc3RhdGUuZW1haWx9IG9uQ2hhbmdlPXt0aGlzLmlucHV0SGFuZGxlci5iaW5kKHRoaXMpfSByZXF1aXJlZCAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGh0bWxGb3I9XCJlbWFpbFwiPkVtYWlsPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibGFiZWxXcmFwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgaWQ9XCJudW1iZXJcIiBuYW1lPVwicGhvbmVOdW1iZXJcIiB0eXBlPVwidGV4dFwiIHZhbHVlPXt0aGlzLnN0YXRlLnBob25lTnVtYmVyfSBvbkNoYW5nZT17dGhpcy5pbnB1dEhhbmRsZXIuYmluZCh0aGlzKX0gcmVxdWlyZWQgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBodG1sRm9yPVwibnVtYmVyXCI+TW9iaWxlIE51bWJlcjwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZm9ybT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L3NlY3Rpb24+XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJ2LWJ0biB2LWJ0bi1wcmltYXJ5IGJ0bi1sZyBmaXhlZCBob3Jpem9udGFsIGJvdHRvbSBuby1yb3VuZCBidG4tbGcgdGV4dC1sZ1wiIG9uQ2xpY2s9e3RoaXMuc3VibWl0Rm9ybS5iaW5kKHRoaXMpfT5Db250aW51ZTwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IFVzZXJTaWdudXBWaWV3XG4iLCJpbXBvcnQgVXNlclNpZ251cFZpZXcgZnJvbSAnLi9Vc2VyU2lnbnVwJ1xuXG5leHBvcnQgZGVmYXVsdCBVc2VyU2lnbnVwVmlldyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnXG5cbmltcG9ydCBMb2FkZXIgZnJvbSAnLi4vLi4vY29tbW9ucy9Mb2FkZXInXG5pbXBvcnQgVmlzaXRUaW1lIGZyb20gJy4vdmlzaXRUaW1lJ1xuaW1wb3J0IFBpY2t1cEFkZHJlc3MgZnJvbSAnLi9waWNrdXBBZGRyZXNzJ1xuaW1wb3J0IENob29zZVBhdGllbnQgZnJvbSAnLi9jaG9vc2VQYXRpZW50J1xuXG5jbGFzcyBCb29raW5nU3VtbWFyeVZpZXcgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgc2VsZWN0ZWRMYWI6IHRoaXMucHJvcHMubWF0Y2gucGFyYW1zLmlkLFxuICAgICAgICAgICAgcGlja3VwVHlwZTogXCJsYWJcIlxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIHRoaXMucHJvcHMuZ2V0TGFiQnlJZCh0aGlzLnN0YXRlLnNlbGVjdGVkTGFiKVxuICAgIH1cblxuICAgIG9wZW5UZXN0cygpIHtcbiAgICAgICAgdGhpcy5wcm9wcy5oaXN0b3J5LnB1c2goYC9sYWIvJHt0aGlzLnN0YXRlLnNlbGVjdGVkTGFifS90ZXN0c2ApXG4gICAgfVxuXG4gICAgaGFuZGxlUGlja3VwVHlwZShlKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBwaWNrdXBUeXBlOiBlLnRhcmdldC52YWx1ZSB9KVxuICAgIH1cblxuICAgIGdldFNlbGVjdG9ycygpIHtcbiAgICAgICAgc3dpdGNoICh0aGlzLnN0YXRlLnBpY2t1cFR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgXCJsYWJcIjoge1xuICAgICAgICAgICAgICAgIHJldHVybiA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICA8VmlzaXRUaW1lIHR5cGU9XCJsYWJcIi8+XG4gICAgICAgICAgICAgICAgICAgIDxDaG9vc2VQYXRpZW50IC8+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNhc2UgXCJob21lXCI6IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgPFZpc2l0VGltZSB0eXBlPVwiaG9tZVwiLz5cbiAgICAgICAgICAgICAgICAgICAgPENob29zZVBhdGllbnQgLz5cbiAgICAgICAgICAgICAgICAgICAgPFBpY2t1cEFkZHJlc3MgLz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIGxldCB0ZXN0cyA9IFtdXG4gICAgICAgIGxldCBmaW5hbFByaWNlID0gMFxuICAgICAgICBsZXQgbGFiRGV0YWlsID0ge31cblxuICAgICAgICBpZiAodGhpcy5wcm9wcy5MQUJTW3RoaXMuc3RhdGUuc2VsZWN0ZWRMYWJdKSB7XG4gICAgICAgICAgICBsYWJEZXRhaWwgPSB0aGlzLnByb3BzLkxBQlNbdGhpcy5zdGF0ZS5zZWxlY3RlZExhYl0ubGFiXG4gICAgICAgICAgICB0ZXN0cyA9IHRoaXMucHJvcHMuc2VsZWN0ZWRDcml0ZXJpYXMuZmlsdGVyKHggPT4geC50eXBlID09ICd0ZXN0JykubWFwKCh0ZXN0LCBpKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IHByaWNlID0gMFxuICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuTEFCU1t0aGlzLnN0YXRlLnNlbGVjdGVkTGFiXS50ZXN0cy5tYXAoKHR3cCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAodHdwLnRlc3RfaWQgPT0gdGVzdC5pZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcHJpY2UgPSB0d3AubXJwXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIGZpbmFsUHJpY2UgKz0gcHJpY2VcbiAgICAgICAgICAgICAgICByZXR1cm4gPHAga2V5PXtpfSBjbGFzc05hbWU9XCJ0ZXN0LWxpc3RcIj57dGVzdC5uYW1lfTxzcGFuIGNsYXNzTmFtZT1cImZsb2F0LXJpZ2h0IGZ3LTcwMFwiPlJzLiB7cHJpY2V9PC9zcGFuPjwvcD5cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICA8aGVhZGVyIGNsYXNzTmFtZT1cInNraW4td2hpdGUgZml4ZWQgaG9yaXpvbnRhbCB0b3AgYmRyLTEgYm90dG9tIGxpZ2h0XCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGFpbmVyLWZsdWlkXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLTJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHVsIGNsYXNzTmFtZT1cImlubGluZS1saXN0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGkgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuaGlzdG9yeS5nbygtMSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19PjxzcGFuIGNsYXNzTmFtZT1cImljb24gaWNvbi1zbSB0ZXh0LW1pZGRsZSBiYWNrLWljb24td2hpdGVcIj48aW1nIHNyYz1cIi9hc3NldHMvaW1nL2N1c3RvbWVyLWljb25zL2JhY2staWNvbi5wbmdcIiBjbGFzc05hbWU9XCJpbWctZmx1aWRcIiAvPjwvc3Bhbj48L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLThcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJoZWFkZXItdGl0bGUgZnctNzAwIGNhcGl0YWxpemUgdGV4dC1jZW50ZXJcIj5Cb29raW5nIENvbmZpcm1hdGlvbjwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLTJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgey8qIDx1bCBjbGFzcz1cImlubGluZS1saXN0IGZsb2F0LXJpZ2h0IHVzZXItbm90aWZpY2F0aW9uLWFjdGlvblwiPlxuXHRcdFx0XHRcdFx0PGxpPjxzcGFuIGNsYXNzPVwiaWNvbiBpY29uLW1kIHRleHQtbWlkZGxlXCI+PGltZyBzcmM9XCIvYXNzZXRzL2ltZy9jdXN0b21lci1pY29ucy91c2VyLnN2Z1wiIGNsYXNzPVwiaW1nLWZsdWlkXCI+PC9zcGFuPjwvbGk+XG5cdFx0XHRcdFx0XHQ8bGk+PHNwYW4gY2xhc3M9XCJpY29uIGljb24tbWQgdGV4dC1taWRkbGUgbm90aWZpY2F0aW9uLWljb25cIj48aW1nIHNyYz1cIi9hc3NldHMvaW1nL2N1c3RvbWVyLWljb25zL25vdGlmaWNhdGlvbi5zdmdcIiBjbGFzcz1cImltZy1mbHVpZFwiPiA8c3BhbiBjbGFzcz1cIm5vdGlmaWNhdGlvbi1hbGVydFwiPjwvc3Bhbj48L3NwYW4+PC9saT5cblx0XHRcdFx0XHQ8L3VsPiAqL31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2hlYWRlcj5cblxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5MQUJTW3RoaXMuc3RhdGUuc2VsZWN0ZWRMYWJdID9cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNlY3Rpb24gY2xhc3NOYW1lPVwid3JhcCBib29raW5nLWNvbmZpcm0tc2NyZWVuXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGFpbmVyLWZsdWlkXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLTEyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwid2lkZ2V0IG1ydC0xMFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3aWRnZXQtaGVhZGVyIGJkci0xIGJvdHRvbSBsaWdodCB0ZXh0LWNlbnRlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx1bCBjbGFzc05hbWU9XCJpbmxpbmUtbGlzdCBib29raW5nLXR5cGVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpPjxsYWJlbCBjbGFzc05hbWU9XCJyYWRpby1pbmxpbmUgdGV4dC1tZCBmdy03MDAgdGV4dC1wcmltYXJ5XCI+PGlucHV0IHR5cGU9XCJyYWRpb1wiIG5hbWU9XCJvcHRyYWRpb1wiIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZVBpY2t1cFR5cGUuYmluZCh0aGlzKX0gdmFsdWU9XCJob21lXCIgY2hlY2tlZD17dGhpcy5zdGF0ZS5waWNrdXBUeXBlID09ICdob21lJ30gLz4gSG9tZSBQaWNrLXVwPC9sYWJlbD48L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGk+PGxhYmVsIGNsYXNzTmFtZT1cInJhZGlvLWlubGluZSB0ZXh0LW1kIGZ3LTcwMCB0ZXh0LXByaW1hcnlcIj48aW5wdXQgdHlwZT1cInJhZGlvXCIgbmFtZT1cIm9wdHJhZGlvXCIgb25DaGFuZ2U9e3RoaXMuaGFuZGxlUGlja3VwVHlwZS5iaW5kKHRoaXMpfSB2YWx1ZT1cImxhYlwiIGNoZWNrZWQ9e3RoaXMuc3RhdGUucGlja3VwVHlwZSA9PSAnbGFiJ30gLz4gTGFiIFZpc2l0PC9sYWJlbD48L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwid2lkZ2V0LWNvbnRlbnRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxhYi1kZXRhaWxzXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbWcgc3JjPVwiL2Fzc2V0cy9pbWcvY3VzdG9tZXItaWNvbnMvbGFiMS5wbmdcIiBjbGFzc05hbWU9XCJpbWctZmx1aWRcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxhYi10aXRsZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGg0IGNsYXNzTmFtZT1cImZ3LTcwMCB0ZXh0LW1kIHRpdGxlXCI+e2xhYkRldGFpbC5uYW1lfTwvaDQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJmdy01MDAgdGV4dC1zbSB0ZXh0LWxpZ2h0XCI+e2xhYkRldGFpbC5hZGRyZXNzfTwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7dGhpcy5nZXRTZWxlY3RvcnMoKX1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibGFiLXZpc2l0LXRpbWUgdGVzdC1yZXBvcnRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGg0IGNsYXNzTmFtZT1cInRpdGxlXCI+PHNwYW4+PGltZyBzcmM9XCIvYXNzZXRzL2ltZy9jdXN0b21lci1pY29ucy90ZXN0LnN2Z1wiIC8+PC9zcGFuPlRlc3RzIDxzcGFuIGNsYXNzTmFtZT1cImZsb2F0LXJpZ2h0XCI+PGEgb25DbGljaz17dGhpcy5vcGVuVGVzdHMuYmluZCh0aGlzKX0gY2xhc3NOYW1lPVwidGV4dC1wcmltYXJ5IGZ3LTcwMCB0ZXh0LXNtXCI+Q2hhbmdlIFRlc3RzPC9hPjwvc3Bhbj48L2g0PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7dGVzdHN9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zZWN0aW9uPlxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJ2LWJ0biB2LWJ0bi1wcmltYXJ5IGJ0bi1sZyBmaXhlZCBob3Jpem9udGFsIGJvdHRvbSBuby1yb3VuZCBidG4tbGcgdGV4dC1sZ1wiPlByb2NlZWQgdG8gUGF5IFJzLiB7ZmluYWxQcmljZX08L2J1dHRvbj5cblxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+IDogPExvYWRlciAvPlxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IEJvb2tpbmdTdW1tYXJ5Vmlld1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuY2xhc3MgQ2hvb3NlUGF0aWVudCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG5cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsYWItdmlzaXQtdGltZVwiPlxuICAgICAgICAgICAgICAgIDxoNCBjbGFzc05hbWU9XCJ0aXRsZVwiPjxzcGFuPjxpbWcgc3JjPVwiL2Fzc2V0cy9pbWcvY3VzdG9tZXItaWNvbnMvY2xvY2suc3ZnXCIgLz48L3NwYW4+UGF0aWVudCBEZXRhaWxzIDxzcGFuIGNsYXNzTmFtZT1cImZsb2F0LXJpZ2h0XCI+PGEgaHJlZj1cIiNcIiBjbGFzc05hbWU9XCJ0ZXh0LXByaW1hcnkgZnctNzAwIHRleHQtc21cIj5QaWNrIFBhdGllbnQ8L2E+PC9zcGFuPjwvaDQ+XG4gICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwiZGF0ZS10aW1lXCI+RHVtbXkgVXNlcjwvcD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBDaG9vc2VQYXRpZW50XG4iLCJpbXBvcnQgQm9va2luZ1N1bW1hcnlWaWV3IGZyb20gJy4vQm9va2luZ1N1bW1hcnlWaWV3LmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBCb29raW5nU3VtbWFyeVZpZXciLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5jbGFzcyBQaWNrdXBBZGRyZXNzIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcblxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxhYi12aXNpdC10aW1lXCI+XG4gICAgICAgICAgICAgICAgPGg0IGNsYXNzTmFtZT1cInRpdGxlXCI+PHNwYW4+PGltZyBzcmM9XCIvYXNzZXRzL2ltZy9jdXN0b21lci1pY29ucy9jbG9jay5zdmdcIiAvPjwvc3Bhbj5QaWNrdXAgQWRkcmVzcyA8c3BhbiBjbGFzc05hbWU9XCJmbG9hdC1yaWdodFwiPjxhIGhyZWY9XCIjXCIgY2xhc3NOYW1lPVwidGV4dC1wcmltYXJ5IGZ3LTcwMCB0ZXh0LXNtXCI+Q2hhbmdlIEFkZHJlc3M8L2E+PC9zcGFuPjwvaDQ+XG4gICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwiZGF0ZS10aW1lXCI+MTh0aCBBcHJpbCB8IDM6MzAgUE08L3A+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgUGlja3VwQWRkcmVzc1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuY2xhc3MgVmlzaXRUaW1lIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcblxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxhYi12aXNpdC10aW1lXCI+XG4gICAgICAgICAgICAgICAgPGg0IGNsYXNzTmFtZT1cInRpdGxlXCI+PHNwYW4+PGltZyBzcmM9XCIvYXNzZXRzL2ltZy9jdXN0b21lci1pY29ucy9jbG9jay5zdmdcIiAvPjwvc3Bhbj5WaXNpdCB0aW1lIDxzcGFuIGNsYXNzTmFtZT1cImZsb2F0LXJpZ2h0XCI+PGEgaHJlZj1cIiNcIiBjbGFzc05hbWU9XCJ0ZXh0LXByaW1hcnkgZnctNzAwIHRleHQtc21cIj5DaGFuZ2UgVGltZTwvYT48L3NwYW4+PC9oND5cbiAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJkYXRlLXRpbWVcIj4xOHRoIEFwcmlsIHwgMzozMCBQTTwvcD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBWaXNpdFRpbWVcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCBDaGlwIGZyb20gJ21hdGVyaWFsLXVpL0NoaXAnO1xuXG5cbmNsYXNzIENvbW1vbmx5U2VhcmNoZWQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgICAgICB0aGlzLnN0YXRlID0ge1xuXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgbGV0IHJvd3MgPSB0aGlzLnByb3BzLmRhdGEubWFwKChyb3cpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByb3BzLnR5cGUgPT0gJ2xhYicpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gPGxpIGtleT17cm93LmlkfT5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImN0LWltZyBsYWItaW1nXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGltZyBzcmM9XCIvYXNzZXRzL2ltZy9jdXN0b21lci1pY29ucy9sYWIxLnBuZ1wiIGNsYXNzTmFtZT1cImltZy1mbHVpZFwiIC8+XG4gICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwibGFiLW5hbWVcIj5TTFIgRGlnbm9zdGljczwvcD5cbiAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBsZXQgc2VsZWN0ZWQgPSBmYWxzZVxuICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuc2VsZWN0ZWQubWFwKChjdXJyKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmKGN1cnIuaWQgPT0gcm93LmlkKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkID0gdHJ1ZVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICByZXR1cm4gPGxpIGtleT17cm93LmlkfT5cbiAgICAgICAgICAgICAgICAgICAgPGFcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17c2VsZWN0ZWQgPyBcInYtYnRuIHYtYnRuLXByaW1hcnkgdGFnLXNtIG91dGxpbmUgc2VsZWN0ZWRcIiA6IFwidi1idG4gdi1idG4tcHJpbWFyeSB0YWctc20gb3V0bGluZVwifVxuICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnByb3BzLnRvZ2dsZSgodGhpcy5wcm9wcy50eXBlIHx8IHJvdy50eXBlKSwgcm93KVxuICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAge3Jvdy5uYW1lfVxuICAgICAgICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9KVxuXG4gICAgICAgIGxldCBkaXZDbGFzcyA9IGBwYW5lbC1jb250ZW50YFxuICAgICAgICBsZXQgdWxDbGFzcyA9IGBpbmxpbmUtbGlzdGBcblxuICAgICAgICBpZiAodGhpcy5wcm9wcy50eXBlID09ICdsYWInKSB7XG4gICAgICAgICAgICBkaXZDbGFzcyA9IGBwYW5lbC1jb250ZW50IHRvdGFsLWxhYnNgXG4gICAgICAgICAgICB1bENsYXNzID0gYGlubGluZS1saXN0IGxhYi1pdGVtc2BcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwid2lkZ2V0LXBhbmVsXCI+XG4gICAgICAgICAgICAgICAgPGg0IGNsYXNzTmFtZT1cInBhbmVsLXRpdGxlXCI+e3RoaXMucHJvcHMuaGVhZGluZ308L2g0PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtkaXZDbGFzc30+XG4gICAgICAgICAgICAgICAgICAgIDx1bCBjbGFzc05hbWU9e3VsQ2xhc3N9PlxuICAgICAgICAgICAgICAgICAgICAgICAge3Jvd3N9XG4gICAgICAgICAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgQ29tbW9ubHlTZWFyY2hlZFxuIiwiaW1wb3J0IENvbW1vbmx5U2VhcmNoZWQgZnJvbSAnLi9Db21tb25seVNlYXJjaGVkLmpzJ1xuXG5cbmV4cG9ydCBkZWZhdWx0IENvbW1vbmx5U2VhcmNoZWQiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcblxuaW1wb3J0IExhYlRlc3RzIGZyb20gJy4uL2xhYlRlc3RzJ1xuXG5jbGFzcyBMYWJEZXRhaWxzIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcblxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPHNlY3Rpb24gY2xhc3NOYW1lPVwid3JhcCBwcm9maWxlLWJvb2stc2NyZWVuXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250YWluZXItZmx1aWRcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLTEyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3aWRnZXQgcHJvZmlsZS1ib29rXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwid2lkZ2V0LWhlYWRlciBwYi1oZWFkZXIgdGV4dC1jZW50ZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGItbG9nb1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbWcgc3JjPVwiL2Fzc2V0cy9pbWcvY3VzdG9tZXItaWNvbnMvbGFiMS5wbmdcIiBjbGFzc05hbWU9XCJpbWctZmx1aWRcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDQgY2xhc3NOYW1lPVwid2lkZ2V0LXRpdGxlIHBiLXRpdGxlXCI+U1JMIERpZ25vc3RpY3M8L2g0PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwibG9jYXRpb25cIj5TZWN0b3IgNTIgR3VyZ2FvbiB8IDxzcGFuIGNsYXNzTmFtZT1cImN0LWltZyBjdC1pbWcteHNcIj48aW1nIHNyYz1cIi9hc3NldHMvaW1nL2N1c3RvbWVyLWljb25zL21hcC1tYXJrZXIuc3ZnXCIgY2xhc3NOYW1lPVwiaW1nLWZsdWlkXCIgLz48L3NwYW4+MS41S008L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dWwgY2xhc3NOYW1lPVwibGlzdCB0aW1lLWNvbnRhY3RcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZ3LTcwMCB0ZXh0LXNtXCI+VGltaW5nOiAtPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA3OjMwIEFNIHRvIDg6MzAgUE1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwib3Blbi1jbG9zZVwiPk9wZW4gVG9kYXk8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZ3LTcwMCB0ZXh0LXNtXCI+Q29udGFjdDogLTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMDEyMCAxMjM0NTY3LCAwMTIwIDc2NTQzMjFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwib3Blbi1jbG9zZVwiPkNhbGwgTm93PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8TGFiVGVzdHMgey4uLnRoaXMucHJvcHN9IC8+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3aWRnZXQtY29udGVudCBwYi1kZXRhaWxzIHBiLWxvY2F0aW9uXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDQgY2xhc3NOYW1lPVwid2MtdGl0bGUgdGV4dC1tZCBmdy03MDBcIj5Mb2NhdGlvbjwvaDQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkZHJlc3MtZGV0YWlsc1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbWcgc3JjPVwiL2Fzc2V0cy9pbWcvY3VzdG9tZXItaWNvbnMvbWFwLWljb24ucG5nXCIgY2xhc3NOYW1lPVwiaW1nLWZsdWlkIGFkZC1tYXBcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cImFkZC1pbmZvXCI+MTk2LCBIdWRhIFBsb3QsIE5lYXIsIERldmluZGVyIFZpaGFyLCBTZWN0b3IgNTYsIEd1cnVncmFtLCBIYXJ5YW5hIDEyMjAxMTwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwYi12aWV3IHRleHQtbGVmdFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhIGhyZWY9XCIjXCIgY2xhc3NOYW1lPVwibGluay10ZXh0IHRleHQtbWQgZnctNzAwXCI+VmlldyBpbiBHb29nbGUgTWFwPC9hPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIndpZGdldC1jb250ZW50IHBiLWRldGFpbHMgcGItZmFjaWxpdHlcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoNCBjbGFzc05hbWU9XCJ3Yy10aXRsZSB0ZXh0LW1kIGZ3LTcwMFwiPkZhY2lsaXR5PC9oND5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx1bCBjbGFzc05hbWU9XCJsaXN0IHBiLWxpc3QgZmFjaWx0eS1saXN0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpPlBhcmtpbmcgQXZhaWxhYmxlPC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGk+Q2FyZCBBY2NlcHRlZDwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpPkUgUmVwb3J0IEF2YWlsYWJsZTwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpPkhvbWUgQ2hla3VwIEF2YWlsYWJsZTwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3aWRnZXQtY29udGVudCBwYi1kZXRhaWxzIHBiLWFib3V0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDQgY2xhc3NOYW1lPVwid2MtdGl0bGUgdGV4dC1tZCBmdy03MDBcIj5BYm91dDwvaDQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cD5Mb3JlbSBpcHN1bSBkb2xvciBzaXQgYW1ldCwgY29uc2VjdGV0dXIgYWRpcGlzaWNpbmcgZWxpdCwgc2VkIGRvIGVpdXNtb2RcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGVtcG9yIGluY2lkaWR1bnQgdXQgbGFib3JlIGV0IGRvbG9yZSBtYWduYSBhbGlxdWEuIFV0IGVuaW0gYWQgbWluaW0gdmVuaWFtLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcXVpcyBub3N0cnVkIGV4ZXJjaXRhdGlvbiB1bGxhbWNvIGxhYm9yaXMgbmlzaVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvc2VjdGlvbj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgTGFiRGV0YWlsc1xuIiwiaW1wb3J0IExhYkRldGFpbHMgZnJvbSAnLi9MYWJEZXRhaWwuanMnXG5cbmV4cG9ydCBkZWZhdWx0IExhYkRldGFpbHMiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5jbGFzcyBMYWJQcm9maWxlQ2FyZCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgfVxuXG4gICAgb3BlbkxhYihpZCl7XG4gICAgICAgIHRoaXMucHJvcHMuaGlzdG9yeS5wdXNoKGAvbGFiLyR7aWR9YClcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgbGV0IHsgcHJpY2UsIGxhYiB9ID0gdGhpcy5wcm9wcy5kZXRhaWxzXG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwid2lkZ2V0IGNhcmRcIiBvbkNsaWNrPXt0aGlzLm9wZW5MYWIuYmluZCh0aGlzLHRoaXMucHJvcHMuZGV0YWlscy5sYWIuaWQpfT5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIndpZGdldC1jb250ZW50IGNhcmQtY29udGVudCBib29rLWNhcmRcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsb2dvLXJhdHRpbmdcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImN0LWltZyBsYWItaWNvblwiPjxpbWcgc3JjPVwiL2Fzc2V0cy9pbWcvY3VzdG9tZXItaWNvbnMvbGFiMS5wbmdcIiBjbGFzc05hbWU9XCJpbWctZmx1aWRcIiAvPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx1bCBjbGFzc05hbWU9XCJpbmxpbmUtbGlzdCByYXR0aW5nXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpPjxzcGFuIGNsYXNzTmFtZT1cImN0LWltZyBjdC1pbWcteHMgc3Rhci1pY29uXCI+PGltZyBzcmM9XCIvYXNzZXRzL2ltZy9jdXN0b21lci1pY29ucy9zdGFyLnN2Z1wiIGNsYXNzTmFtZT1cImltZy1mbHVpZFwiIC8+PC9zcGFuPjwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpPjxzcGFuIGNsYXNzTmFtZT1cImN0LWltZyBjdC1pbWcteHMgc3Rhci1pY29uXCI+PGltZyBzcmM9XCIvYXNzZXRzL2ltZy9jdXN0b21lci1pY29ucy9zdGFyLnN2Z1wiIGNsYXNzTmFtZT1cImltZy1mbHVpZFwiIC8+PC9zcGFuPjwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpPjxzcGFuIGNsYXNzTmFtZT1cImN0LWltZyBjdC1pbWcteHMgc3Rhci1pY29uXCI+PGltZyBzcmM9XCIvYXNzZXRzL2ltZy9jdXN0b21lci1pY29ucy9zdGFyLnN2Z1wiIGNsYXNzTmFtZT1cImltZy1mbHVpZFwiIC8+PC9zcGFuPjwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpPjxzcGFuIGNsYXNzTmFtZT1cImN0LWltZyBjdC1pbWcteHMgc3Rhci1pY29uXCI+PGltZyBzcmM9XCIvYXNzZXRzL2ltZy9jdXN0b21lci1pY29ucy9zdGFyLnN2Z1wiIGNsYXNzTmFtZT1cImltZy1mbHVpZFwiIC8+PC9zcGFuPjwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpPjxzcGFuIGNsYXNzTmFtZT1cImN0LWltZyBjdC1pbWcteHMgc3Rhci1pY29uXCI+PGltZyBzcmM9XCIvYXNzZXRzL2ltZy9jdXN0b21lci1pY29ucy9oYWxmLXN0YXIuc3ZnXCIgY2xhc3NOYW1lPVwiaW1nLWZsdWlkXCIgLz48L3NwYW4+PC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cInYtYnRuIHYtYnRuLXByaW1hcnkgcGlja3VwLWJ0blwiPlBpY2t1cCBBdmFpbGFibGU8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYm9vay1jYXJkLWNvbnRlbnRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxoNCBjbGFzc05hbWU9XCJib29rLWNhcnQtdGl0bGVcIj57bGFiLm5hbWV9PC9oND5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cImRlc2NcIj5CbG9vZCBUZXN0LCBQYXRob2xvZ3kgVWx0cmFzb3VuZCwgTVJJLCBDVEkgU2VjdG9yIDUyIEd1cmdhb24gfCA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXByaW1hcnkgZnctNzAwXCI+MS41IEtNPC9zcGFuPjwvcD5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3aWRnZXQtZm9vdGVyIGNhcmQtZm9vdGVyXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC02XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwibGFiLXByaWNlXCI+VG90YWwgUnMge3ByaWNlfTwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtNiB0ZXh0LXJpZ2h0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJ2LWJ0biB2LWJ0bi1wcmltYXJ5IGJ0bi1tZFwiPkJvb2sgTGFiPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgTGFiUHJvZmlsZUNhcmRcbiIsImltcG9ydCBMYWJQcm9maWxlQ2FyZCBmcm9tICcuL0xhYlByb2ZpbGVDYXJkLmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBMYWJQcm9maWxlQ2FyZCIsImltcG9ydCBMYWJUZXN0cyBmcm9tICcuL2xhYlRlc3RzJ1xuXG5leHBvcnQgZGVmYXVsdCBMYWJUZXN0cyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG5jbGFzcyBMYWJUZXN0cyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICB9XG5cbiAgICBvcGVuVGVzdHMoKSB7XG4gICAgICAgIHRoaXMucHJvcHMuaGlzdG9yeS5wdXNoKGAvbGFiLyR7dGhpcy5wcm9wcy5kYXRhLmxhYi5pZH0vdGVzdHNgKVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICBsZXQgdGVzdHMgPSBbXVxuICAgICAgICBpZiAodGhpcy5wcm9wcy5kYXRhLnRlc3RzICYmIHRoaXMucHJvcHMuZGF0YS50ZXN0cy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRlc3RzID0gdGhpcy5wcm9wcy5kYXRhLnRlc3RzLm1hcCgodGVzdCwgaSkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiA8bGkga2V5PXtpfT57dGVzdC50ZXN0Lm5hbWV9IDxzcGFuIGNsYXNzTmFtZT1cInRlc3QtcHJpY2VcIj5ScyB7dGVzdC5tcnB9PC9zcGFuPjwvbGk+XG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwid2lkZ2V0LWNvbnRlbnQgcGItZGV0YWlscyBwYi10ZXN0XCI+XG4gICAgICAgICAgICAgICAgPGg0IGNsYXNzTmFtZT1cIndjLXRpdGxlIHRleHQtbWQgZnctNzAwXCI+VGVzdHMgKHt0ZXN0cy5sZW5ndGh9KTwvaDQ+XG4gICAgICAgICAgICAgICAgPHVsIGNsYXNzTmFtZT1cImxpc3QgcGItbGlzdCBwYi10ZXN0LWxpc3RcIj5cbiAgICAgICAgICAgICAgICAgICAge3Rlc3RzLnNsaWNlKDAsMyl9XG4gICAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBiLXZpZXcgdGV4dC1yaWdodFwiPlxuICAgICAgICAgICAgICAgICAgICA8YSBjbGFzc05hbWU9XCJsaW5rLXRleHQgdGV4dC1tZCBmdy03MDBcIiBvbkNsaWNrPXt0aGlzLm9wZW5UZXN0cy5iaW5kKHRoaXMpfT5WaWV3IEFsbDwvYT5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBMYWJUZXN0c1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cbmltcG9ydCBFeHBhbnNpb25QYW5lbCwge1xuICAgIEV4cGFuc2lvblBhbmVsU3VtbWFyeSxcbiAgICBFeHBhbnNpb25QYW5lbERldGFpbHMsXG59IGZyb20gJ21hdGVyaWFsLXVpL0V4cGFuc2lvblBhbmVsJztcbmltcG9ydCBFeHBhbmRNb3JlSWNvbiBmcm9tICdtYXRlcmlhbC11aS1pY29ucy9FeHBhbmRNb3JlJztcblxuXG5jbGFzcyBPcmRlckRldGFpbHMgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIGxldCBwcmljZV9icmVha3VwID0gW11cbiAgICAgICAgbGV0IHRvdGFsUHJpY2UgPSAwXG4gICAgICAgIGxldCB0b3RhbFRlc3RzID0gMFxuICAgICAgICBpZiAodGhpcy5wcm9wcy5kYXRhLnByaWNlX2JyZWFrdXAgJiYgdGhpcy5wcm9wcy5kYXRhLnByaWNlX2JyZWFrdXAuYnJlYWt1cCkge1xuICAgICAgICAgICAgcHJpY2VfYnJlYWt1cCA9IHRoaXMucHJvcHMuZGF0YS5wcmljZV9icmVha3VwLmJyZWFrdXAubWFwKCh0ZXN0LCBpKSA9PiB7XG4gICAgICAgICAgICAgICAgdG90YWxQcmljZSArPSB0ZXN0LmFtb3VudFxuICAgICAgICAgICAgICAgIHRvdGFsVGVzdHMrK1xuICAgICAgICAgICAgICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT1cInRlc3RQcmljZVJvd1wiIGtleT17aX0+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRuYW1lXCI+e3Rlc3QubmFtZX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRhbW91bnRcIj5Scy4ge3Rlc3QuYW1vdW50fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJvcmRlckRldGFpbHNcIj5cbiAgICAgICAgICAgICAgICA8RXhwYW5zaW9uUGFuZWw+XG4gICAgICAgICAgICAgICAgICAgIDxFeHBhbnNpb25QYW5lbFN1bW1hcnkgZXhwYW5kSWNvbj17PEV4cGFuZE1vcmVJY29uIC8+fT5cbiAgICAgICAgICAgICAgICAgICAgICAgIE9yZGVyIERldGFpbHMgLSB7dG90YWxUZXN0c30gVGVzdHNcbiAgICAgICAgICAgICAgICAgICAgPC9FeHBhbnNpb25QYW5lbFN1bW1hcnk+XG4gICAgICAgICAgICAgICAgICAgIDxFeHBhbnNpb25QYW5lbERldGFpbHM+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInByaWNlQ29udFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtwcmljZV9icmVha3VwfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGVzdFRvdGFsUm93XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRuYW1lXCI+e1wiVG90YWxcIn08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRhbW91bnRcIj5Scy4ge3RvdGFsUHJpY2V9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGVzdFRvdGFsUm93XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRuYW1lXCI+e1wiR1NUXCJ9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0YW1vdW50XCI+UnMuIHt0b3RhbFByaWNlKjEuMTh9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGVzdFRvdGFsUm93XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRuYW1lXCI+e1wiUGF5YWJsZVwifTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGFtb3VudFwiPlJzLiB7dG90YWxQcmljZSoxLjE4fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L0V4cGFuc2lvblBhbmVsRGV0YWlscz5cbiAgICAgICAgICAgICAgICA8L0V4cGFuc2lvblBhbmVsPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IE9yZGVyRGV0YWlsc1xuIiwiaW1wb3J0IE9yZGVyRGV0YWlscyBmcm9tICcuL09yZGVyRGV0YWlscy5qcydcblxuZXhwb3J0IGRlZmF1bHQgT3JkZXJEZXRhaWxzIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGxpZ2h0QmFzZVRoZW1lIH0gZnJvbSAnbWF0ZXJpYWwtdWkvc3R5bGVzJztcbmltcG9ydCBMb2FkZXIgZnJvbSAnLi4vLi4vY29tbW9ucy9Mb2FkZXInXG5cbmNvbnN0IGRlYm91bmNlciA9IChmbiwgZGVsYXkpID0+IHtcbiAgICBsZXQgdGltZXIgPSBudWxsXG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVyKVxuICAgICAgICB0aW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgZm4uY2FsbCh0aGlzKVxuICAgICAgICB9LCBkZWxheSlcbiAgICB9XG59XG5cblxuY2xhc3MgQ3JpdGVyaWFTZWFyY2hWaWV3IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIHNlYXJjaFZhbHVlOiAnJyxcbiAgICAgICAgICAgIHNlYXJjaFJlc3VsdHM6IFtdXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgdGhpcy5nZXRTZWFyY2hSZXN1bHRzID0gZGVib3VuY2VyKHRoaXMuZ2V0U2VhcmNoUmVzdWx0cy5iaW5kKHRoaXMpLCAxMDAwKVxuICAgICAgICBsZXQgaW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndG9wQ3JpdGVyaWFTZWFyY2gnKVxuICAgICAgICAvLyBpbnB1dC5mb2N1cygpXG4gICAgfVxuXG4gICAgaW5wdXRIYW5kbGVyKGUpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHNlYXJjaFZhbHVlOiBlLnRhcmdldC52YWx1ZSB9KVxuICAgICAgICB0aGlzLmdldFNlYXJjaFJlc3VsdHMoKVxuICAgIH1cblxuICAgIGdldFNlYXJjaFJlc3VsdHMoKSB7XG4gICAgICAgIHRoaXMucHJvcHMuZ2V0RGlhZ25vc2lzQ3JpdGVyaWFSZXN1bHRzKHRoaXMuc3RhdGUuc2VhcmNoVmFsdWUsIChzZWFyY2hSZXN1bHRzKSA9PiB7XG4gICAgICAgICAgICBpZiAoc2VhcmNoUmVzdWx0cykge1xuICAgICAgICAgICAgICAgIGxldCB0ZXN0cyA9IHNlYXJjaFJlc3VsdHMudGVzdHMubWFwKHggPT4geyByZXR1cm4geyAuLi54LCB0eXBlOiAndGVzdCcgfSB9KVxuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBzZWFyY2hSZXN1bHRzOiBbLi4udGVzdHNdIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgYWRkQ3JpdGVyaWEoY3JpdGVyaWEpIHtcbiAgICAgICAgdGhpcy5wcm9wcy50b2dnbGVEaWFnbm9zaXNDcml0ZXJpYShjcml0ZXJpYS50eXBlLCBjcml0ZXJpYSlcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHNlYXJjaFZhbHVlOiBcIlwiIH0pXG4gICAgfVxuXG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgbGV0IGxvY2F0aW9uID0gXCJHdXJnYW9uXCJcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuc2VsZWN0ZWRMb2NhdGlvbikge1xuICAgICAgICAgICAgbG9jYXRpb24gPSB0aGlzLnByb3BzLnNlbGVjdGVkTG9jYXRpb24uZm9ybWF0dGVkX2FkZHJlc3Muc2xpY2UoMCwgNSlcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIDxoZWFkZXIgY2xhc3NOYW1lPVwic2tpbi1wcmltYXJ5IGZpeGVkIGhvcml6b250YWwgdG9wIGN0LWhlYWRlclwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lci1mbHVpZFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC0xMlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm5hdmlnYXRlLXJvd1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHVsIGNsYXNzTmFtZT1cImlubGluZS1saXN0IHRvcC1uYXYgYWxwaGEtYnggdGV4dC13aGl0ZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnByb3BzLmhpc3RvcnkuZ28oLTEpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGk+PHNwYW4gY2xhc3NOYW1lPVwiY3QtaW1nIGN0LWltZy1zbSBhcnJvdy1pbWdcIj48aW1nIHNyYz1cIi9hc3NldHMvaW1nL2N1c3RvbWVyLWljb25zL2xlZnQtYXJyb3cuc3ZnXCIgY2xhc3NOYW1lPVwiaW1nLWZsdWlkXCIgLz48L3NwYW4+PC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGk+PGRpdiBjbGFzc05hbWU9XCJzY3JlZW4tdGl0bGVcIj5TZWFyY2g8L2Rpdj48L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx1bCBjbGFzc05hbWU9XCJpbmxpbmUtbGlzdCB0b3AtbmF2IGJldGEtYnggZmxvYXQtcmlnaHQgdGV4dC1yaWdodCB0ZXh0LXdoaXRlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuaGlzdG9yeS5wdXNoKCcvbG9jYXRpb25zZWFyY2gnKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpPjxkaXYgY2xhc3NOYW1lPVwic2NyZWVuLXRpdGxlXCI+PHNwYW4gY2xhc3NOYW1lPVwiY3QtaW1nIGN0LWltZy1zbSBtYXAtbWFya2VyLWltZ1wiPjxpbWcgc3JjPVwiL2Fzc2V0cy9pbWcvY3VzdG9tZXItaWNvbnMvbWFwLW1hcmtlci5zdmdcIiBjbGFzc05hbWU9XCJpbWctZmx1aWRcIiAvPjwvc3Bhbj4ge2xvY2F0aW9ufTwvZGl2PjwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC0xMlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNlYXJjaC1yb3dcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRvbi1ncm91cFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGNsYXNzTmFtZT1cImZvcm0tY29udHJvbCBpbnB1dC1tZCBzZWFyY2gtaW5wdXRcIiBpZD1cInRvcENyaXRlcmlhU2VhcmNoXCIgb25DaGFuZ2U9e3RoaXMuaW5wdXRIYW5kbGVyLmJpbmQodGhpcyl9IHZhbHVlPXt0aGlzLnN0YXRlLnNlYXJjaFZhbHVlfSBwbGFjZWhvbGRlcj1cIlNlYXJjaCBmb3IgVGVzdCAmIExhYnNcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImN0LWltZyBjdC1pbWctc20gc2VhcmNoLWljb25cIj48aW1nIHNyYz1cIi9hc3NldHMvaW1nL2N1c3RvbWVyLWljb25zL3NlYXJjaC1pY29uLnN2Z1wiIC8+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvaGVhZGVyPlxuXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlLnNlYXJjaFZhbHVlID9cblxuICAgICAgICAgICAgICAgICAgICAgICAgPHNlY3Rpb24gY2xhc3NOYW1lPVwid3JhcCB3cmFwLTEwMFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwid2lkZ2V0LXBhbmVsXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoNCBjbGFzc05hbWU9XCJwYW5lbC10aXRsZVwiPlNlYXJjaCBSZXN1bHQ8L2g0PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBhbmVsLWNvbnRlbnRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx1bCBjbGFzc05hbWU9XCJsaXN0IHNlYXJjaC1yZXN1bHQtbGlzdFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZS5zZWFyY2hSZXN1bHRzLm1hcCgoY3VyciwgaSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDxsaSBvbkNsaWNrPXt0aGlzLmFkZENyaXRlcmlhLmJpbmQodGhpcywgY3Vycil9IGtleT17aX0+PGE+e2N1cnIubmFtZX08L2E+PC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvc2VjdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDogKHRoaXMucHJvcHMuY2hlY2tGb3JMb2FkID8gdGhpcy5wcm9wcy5jaGlsZHJlbiA6IDxMb2FkZXIgLz4pXG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgQ3JpdGVyaWFTZWFyY2hWaWV3XG4iLCJpbXBvcnQgQ3JpdGVyaWFTZWFyY2hWaWV3IGZyb20gJy4vQ3JpdGVyaWFTZWFyY2hWaWV3LmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBDcml0ZXJpYVNlYXJjaFZpZXciLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgTGFiRGV0YWlscyBmcm9tICcuLi9jb21tb25zL2xhYkRldGFpbHMvaW5kZXguanMnXG5pbXBvcnQgTG9hZGVyIGZyb20gJy4uLy4uL2NvbW1vbnMvTG9hZGVyJ1xuXG5jbGFzcyBMYWJWaWV3IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIHNlbGVjdGVkTGFiOiB0aGlzLnByb3BzLm1hdGNoLnBhcmFtcy5pZFxuICAgICAgICB9XG4gICAgfVxuXG4gICAgYm9va0xhYigpIHtcbiAgICAgICAgdGhpcy5wcm9wcy5oaXN0b3J5LnB1c2goYC9sYWIvJHt0aGlzLnN0YXRlLnNlbGVjdGVkTGFifS9ib29rYClcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgPGhlYWRlciBjbGFzc05hbWU9XCJza2luLXByaW1hcnkgZml4ZWQgaG9yaXpvbnRhbCB0b3AgcHJvZmlsZS1ib29rLWhlYWRlclwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lci1mbHVpZFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC00XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaGVhZGVyLXRpdGxlIGZ3LTcwMCBjYXBpdGFsaXplIHRleHQtd2hpdGVcIj5JQ09OPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtNFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLTRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHVsIGNsYXNzTmFtZT1cImlubGluZS1saXN0IGZsb2F0LXJpZ2h0IHVzZXItbm90aWZpY2F0aW9uLWFjdGlvblwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpPjxzcGFuIGNsYXNzTmFtZT1cImljb24gaWNvbi1tZCB0ZXh0LW1pZGRsZVwiPjxpbWcgc3JjPVwiL2Fzc2V0cy9pbWcvY3VzdG9tZXItaWNvbnMvdXNlci5zdmdcIiBjbGFzc05hbWU9XCJpbWctZmx1aWRcIiAvPjwvc3Bhbj48L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpPjxzcGFuIGNsYXNzTmFtZT1cImljb24gaWNvbi1tZCB0ZXh0LW1pZGRsZSBub3RpZmljYXRpb24taWNvblwiPjxpbWcgc3JjPVwiL2Fzc2V0cy9pbWcvY3VzdG9tZXItaWNvbnMvbm90aWZpY2F0aW9uLnN2Z1wiIGNsYXNzTmFtZT1cImltZy1mbHVpZFwiIC8+IDxzcGFuIGNsYXNzTmFtZT1cIm5vdGlmaWNhdGlvbi1hbGVydFwiIC8+PC9zcGFuPjwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9oZWFkZXI+XG5cbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuTEFCU1t0aGlzLnN0YXRlLnNlbGVjdGVkTGFiXSA/XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic2tpbi1wcmltYXJ5IGVtcHR5LWhlYWRlciBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxMYWJEZXRhaWxzIHsuLi50aGlzLnByb3BzfSBkYXRhPXt0aGlzLnByb3BzLkxBQlNbdGhpcy5zdGF0ZS5zZWxlY3RlZExhYl19IC8+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9e3RoaXMuYm9va0xhYi5iaW5kKHRoaXMpfSBjbGFzc05hbWU9XCJ2LWJ0biB2LWJ0bi1wcmltYXJ5IGJ0bi1sZyBmaXhlZCBob3Jpem9udGFsIGJvdHRvbSBuby1yb3VuZCBidG4tbGcgdGV4dC1sZ1wiPjxzcGFuIGNsYXNzTmFtZT1cInRleHQteHMgc2VsZWN0ZWQtb3B0aW9uXCI+KHt0aGlzLnByb3BzLnNlbGVjdGVkQ3JpdGVyaWFzLmxlbmd0aH0gU2VsZWN0ZWQpIDwvc3Bhbj5Cb29rXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PiA6IDxMb2FkZXIgLz5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTGFiVmlld1xuIiwiaW1wb3J0IExhYlZpZXcgZnJvbSAnLi9MYWJWaWV3LmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBMYWJWaWV3IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cbmltcG9ydCBMYWJEZXRhaWxzIGZyb20gJy4uL2NvbW1vbnMvbGFiRGV0YWlscy9pbmRleC5qcydcbmltcG9ydCBPcmRlckRldGFpbHMgZnJvbSAnLi4vY29tbW9ucy9vcmRlckRldGFpbHMvaW5kZXguanMnXG5pbXBvcnQgRGV0YWlsc0Zvcm0gZnJvbSAnLi9kZXRhaWxzRm9ybS9pbmRleC5qcydcbmltcG9ydCBBZGRyZXNzRm9ybSBmcm9tICcuL2FkZHJlc3NGb3JtL2luZGV4LmpzJztcblxuY2xhc3MgUGF0aWVudERldGFpbHNWaWV3IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIHNlbGVjdGVkTGFiOiBudWxsLFxuICAgICAgICAgICAgc2VsZWN0ZWRUZXN0czogXCJcIixcbiAgICAgICAgICAgIHNlbGVjdGVkU2xvdDogbnVsbCxcbiAgICAgICAgICAgIHNlbGVjdGVkU2xvdFN0YXJ0IDogbnVsbCxcbiAgICAgICAgICAgIHNlbGVjdGVkU2xvdEVuZCA6IG51bGxcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldExvY2F0aW9uUGFyYW0odGFnKSB7XG4gICAgICAgIC8vIHRoaXMgQVBJIGFzc3VtZXMgdGhlIGNvbnRleHQgb2YgcmVhY3Qtcm91dGVyLTRcbiAgICAgICAgY29uc3QgcGFyYW1TdHJpbmcgPSB0aGlzLnByb3BzLmxvY2F0aW9uLnNlYXJjaFxuICAgICAgICBjb25zdCBwYXJhbXMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKHBhcmFtU3RyaW5nKVxuICAgICAgICByZXR1cm4gcGFyYW1zLmdldCh0YWcpXG4gICAgfVxuXG4gICAgcHJvY2VlZCgpe1xuICAgICAgICB0aGlzLmNvbnRleHQucm91dGVyLmhpc3RvcnkucHVzaCgnL2xhYi9ib29raW5nL3N1bW1hcnkvSVVIQlVIODc4N1VIQicpXG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIGxldCBsYWJJZCA9IHRoaXMucHJvcHMubWF0Y2gucGFyYW1zLmlkXG4gICAgICAgIGxldCB0ZXN0cyA9IHRoaXMuZ2V0TG9jYXRpb25QYXJhbSgndGVzdHMnKVxuICAgICAgICBsZXQgc2VsZWN0ZWRTbG90U3RhcnQgPSB0aGlzLmdldExvY2F0aW9uUGFyYW0oJ3Rfc3RhcnQnKVxuICAgICAgICBzZWxlY3RlZFNsb3RTdGFydCA9IG5ldyBEYXRlKHBhcnNlRmxvYXQoc2VsZWN0ZWRTbG90U3RhcnQpKVxuICAgICAgICBzZWxlY3RlZFNsb3RTdGFydCA9IHNlbGVjdGVkU2xvdFN0YXJ0LnRvU3RyaW5nKClcbiAgICAgICAgbGV0IHNlbGVjdGVkU2xvdEVuZCA9IHRoaXMuZ2V0TG9jYXRpb25QYXJhbSgndF9lbmQnKVxuICAgICAgICBzZWxlY3RlZFNsb3RFbmQgPSBuZXcgRGF0ZShwYXJzZUZsb2F0KHNlbGVjdGVkU2xvdEVuZCkpXG4gICAgICAgIHNlbGVjdGVkU2xvdEVuZCA9IHNlbGVjdGVkU2xvdEVuZC50b1N0cmluZygpXG4gICAgICAgIGlmIChsYWJJZCkge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHNlbGVjdGVkTGFiOiBsYWJJZCwgc2VsZWN0ZWRUZXN0czogdGVzdHMsIHNlbGVjdGVkU2xvdFN0YXJ0LCBzZWxlY3RlZFNsb3RFbmQgfSlcbiAgICAgICAgICAgIHRoaXMucHJvcHMuZ2V0TGFiQnlJZChsYWJJZClcblxuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhdGljIGNvbnRleHRUeXBlcyA9IHtcbiAgICAgICAgcm91dGVyOiAoKSA9PiBudWxsXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBhdGllbnREZXRhaWxzXCI+XG5cbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuTEFCU1t0aGlzLnN0YXRlLnNlbGVjdGVkTGFiXSA/XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxMYWJEZXRhaWxzIGRhdGE9e3RoaXMucHJvcHMuTEFCU1t0aGlzLnN0YXRlLnNlbGVjdGVkTGFiXX0gLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8T3JkZXJEZXRhaWxzIGRhdGE9e3RoaXMucHJvcHMuTEFCU1t0aGlzLnN0YXRlLnNlbGVjdGVkTGFiXX0gLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNlbGVjdGVkQXBwb2ludG1lbnRTbG90XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoNT5TZWxlY3RlZCBBcHBvaW50bWVudCBTbG90PC9oNT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiYXBwZGF0ZVwiPkFwcG9pbnRtZW50IERhdGU8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImRhdGVcIj57IHRoaXMuc3RhdGUuc2VsZWN0ZWRTbG90U3RhcnQgfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8RGV0YWlsc0Zvcm0gLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8QWRkcmVzc0Zvcm0gY2l0eT1cIlNlbGVjdGVkIHZhbHVlXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cInByb2NlZWRidG5cIiBvbkNsaWNrPXt0aGlzLnByb2NlZWQuYmluZCh0aGlzKX0+UHJvY2VlZDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+IDogXCJcIlxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IFBhdGllbnREZXRhaWxzVmlld1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cbmNsYXNzIEFkZHJlc3NGb3JtIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIGFkZHJlc3M6JycsXG4gICAgICAgICAgICBsb2NhbGl0eTonJyxcbiAgICAgICAgICAgIGxhbmRtYXJrOicnLFxuICAgICAgICAgICAgcGluY29kZTonJyxcbiAgICAgICAgICAgIGNpdHk6cHJvcHMuY2l0eVxuXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpbnB1dEhhbmRsZXIod2hpY2gsIGUpe1xuICAgICAgICB0aGlzLnNldFN0YXRlKHsgW3doaWNoXSA6IGUudGFyZ2V0LnZhbHVlIH0pXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImRldGFpbHNGb3JtXCI+XG4gICAgICAgICAgICAgICAgPGg1PlBsZWFzZSBwcm92aWRlIHBhdGllbnQgZGV0YWlsczwvaDU+XG5cbiAgICAgICAgICAgICAgICA8aW5wdXQgdmFsdWU9e3RoaXMuc3RhdGUuYWRkcmVzc30gb25DaGFuZ2U9e3RoaXMuaW5wdXRIYW5kbGVyLmJpbmQodGhpcywnYWRkcmVzcycpfSBjbGFzc05hbWU9XCJwdG5hbWVcIiBwbGFjZWhvbGRlcj1cIkFkZHJlc3MqXCIgLz5cbiAgICAgICAgICAgICAgICA8aW5wdXQgdmFsdWU9e3RoaXMuc3RhdGUubG9jYWxpdHl9IG9uQ2hhbmdlPXt0aGlzLmlucHV0SGFuZGxlci5iaW5kKHRoaXMsJ2xvY2FsaXR5Jyl9IGNsYXNzTmFtZT1cInB0bmFtZVwiIHBsYWNlaG9sZGVyPVwiTG9jYWxpdHkqXCIgLz5cbiAgICAgICAgICAgICAgICA8aW5wdXQgdmFsdWU9e3RoaXMuc3RhdGUubGFuZG1hcmt9IG9uQ2hhbmdlPXt0aGlzLmlucHV0SGFuZGxlci5iaW5kKHRoaXMsJ2xhbmRtYXJrJyl9IGNsYXNzTmFtZT1cInB0bmFtZVwiIHBsYWNlaG9sZGVyPVwiTGFuZG1hcmsqXCIgLz5cbiAgICAgICAgICAgICAgICA8aW5wdXQgdmFsdWU9e3RoaXMuc3RhdGUucGluY29kZX0gb25DaGFuZ2U9e3RoaXMuaW5wdXRIYW5kbGVyLmJpbmQodGhpcywncGluY29kZScpfSBjbGFzc05hbWU9XCJwdG1vYmlsZVwiIHBsYWNlaG9sZGVyPVwiUGluY29kZSpcIiAvPlxuICAgICAgICAgICAgICAgIHsvKiA8aW5wdXQgdmFsdWU9e3RoaXMuc3RhdGUuY2l0eX0gb25DaGFuZ2U9e3RoaXMuaW5wdXRIYW5kbGVyLmJpbmQodGhpcywnY2l0eScpfSBkaXNhYmxlZCBjbGFzc05hbWU9XCJwdG90cFwiIHBsYWNlaG9sZGVyPVwiQ2l0eVwiIC8+ICovfVxuXG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgQWRkcmVzc0Zvcm1cbiIsImltcG9ydCBBZGRyZXNzRm9ybSBmcm9tICcuL0FkZHJlc3NGb3JtLmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBBZGRyZXNzRm9ybSIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG5jbGFzcyBEZXRhaWxzRm9ybSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgICBwYXRpZW50TmFtZSA6ICcnLFxuICAgICAgICAgICAgcGF0aWVudEVtYWlsIDogJycsXG4gICAgICAgICAgICBwYXRpZW50R2VuZGVyIDogJ21hbGUnLFxuICAgICAgICAgICAgbW9iaWxlOicnLFxuICAgICAgICAgICAgb3RwIDonJyxcbiAgICAgICAgICAgIHBhdGllbnRNb2JpbGUgOiAnJ1xuXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpbnB1dEhhbmRsZXIod2hpY2gsIGUpe1xuICAgICAgICB0aGlzLnNldFN0YXRlKHsgW3doaWNoXSA6IGUudGFyZ2V0LnZhbHVlIH0pXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImRldGFpbHNGb3JtXCI+XG4gICAgICAgICAgICAgICAgPGg1PlBsZWFzZSBwcm92aWRlIHBhdGllbnQgZGV0YWlsczwvaDU+XG5cbiAgICAgICAgICAgICAgICA8aW5wdXQgdmFsdWU9e3RoaXMuc3RhdGUucGF0aWVudE5hbWV9IG9uQ2hhbmdlPXt0aGlzLmlucHV0SGFuZGxlci5iaW5kKHRoaXMsJ3BhdGllbnROYW1lJyl9IGNsYXNzTmFtZT1cInB0bmFtZVwiIHBsYWNlaG9sZGVyPVwiUGF0aWVudCBOYW1lKlwiIC8+XG4gICAgICAgICAgICAgICAgPGlucHV0IHZhbHVlPXt0aGlzLnN0YXRlLnBhdGllbnRFbWFpbH0gb25DaGFuZ2U9e3RoaXMuaW5wdXRIYW5kbGVyLmJpbmQodGhpcywncGF0aWVudEVtYWlsJyl9IGNsYXNzTmFtZT1cInB0ZW1haWxcIiBwbGFjZWhvbGRlcj1cIkVtYWlsKlwiIC8+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwdGdlbmRlclwiPlxuICAgICAgICAgICAgICAgICAgICA8c3Bhbj5HZW5kZXIgOjwvc3Bhbj4gXG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwicmFkaW9cIiBuYW1lPVwiZ2VuZGVyXCIgdmFsdWU9XCJtYWxlXCIgY2hlY2tlZD17dGhpcy5zdGF0ZS5wYXRpZW50R2VuZGVyID09PSBcIm1hbGVcIn0gb25DaGFuZ2U9e3RoaXMuaW5wdXRIYW5kbGVyLmJpbmQodGhpcywncGF0aWVudEdlbmRlcicpfS8+IE1hbGVcbiAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJyYWRpb1wiIG5hbWU9XCJnZW5kZXJcIiB2YWx1ZT1cImZlbWFsZVwiIGNoZWNrZWQ9e3RoaXMuc3RhdGUucGF0aWVudEdlbmRlciA9PT0gXCJmZW1hbGVcIn0gb25DaGFuZ2U9e3RoaXMuaW5wdXRIYW5kbGVyLmJpbmQodGhpcywncGF0aWVudEdlbmRlcicpfS8+IEZlbWFsZVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxpbnB1dCB2YWx1ZT17dGhpcy5zdGF0ZS5tb2JpbGV9IG9uQ2hhbmdlPXt0aGlzLmlucHV0SGFuZGxlci5iaW5kKHRoaXMsJ21vYmlsZScpfSBjbGFzc05hbWU9XCJwdG1vYmlsZVwiIHBsYWNlaG9sZGVyPVwiTW9iaWxlKlwiIC8+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJvdHBidG5cIj4oUmUpU2VuZCBPVFA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8aW5wdXQgdmFsdWU9e3RoaXMuc3RhdGUub3RwfSBvbkNoYW5nZT17dGhpcy5pbnB1dEhhbmRsZXIuYmluZCh0aGlzLCdvdHAnKX0gY2xhc3NOYW1lPVwicHRvdHBcIiBwbGFjZWhvbGRlcj1cIkVudGVyIE9UUCpcIiAvPlxuICAgICAgICAgICAgICAgIDxpbnB1dCB2YWx1ZT17dGhpcy5zdGF0ZS5wYXRpZW50TW9iaWxlfSBvbkNoYW5nZT17dGhpcy5pbnB1dEhhbmRsZXIuYmluZCh0aGlzLCdwYXRpZW50TW9iaWxlJyl9IGNsYXNzTmFtZT1cInB0bW9iaWxlXCIgcGxhY2Vob2xkZXI9XCJQYXRpZW50IE1vYmlsZSpcIiAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgXG4gICAgICAgICk7XG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IERldGFpbHNGb3JtXG4iLCJpbXBvcnQgRGV0YWlsc0Zvcm0gZnJvbSAnLi9EZXRhaWxzRm9ybS5qcydcblxuZXhwb3J0IGRlZmF1bHQgRGV0YWlsc0Zvcm0iLCJpbXBvcnQgUGF0aWVudERldGFpbHNWaWV3IGZyb20gJy4vUGF0aWVudERldGFpbHNWaWV3LmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBQYXRpZW50RGV0YWlsc1ZpZXciLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcblxuaW1wb3J0IENvbW1vbmx5U2VhcmNoZWQgZnJvbSAnLi4vY29tbW9ucy9jb21tb25seVNlYXJjaGVkL2luZGV4LmpzJ1xuaW1wb3J0IENyaXRlcmlhU2VhcmNoIGZyb20gJy4uL2NyaXRlcmlhU2VhcmNoJ1xuXG5jbGFzcyBTZWFyY2hDcml0ZXJpYVZpZXcgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgICAgICB0aGlzLnN0YXRlID0ge1xuXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZWFyY2hQcm9jZWVkKCkge1xuICAgICAgICBsZXQgc2VhcmNoRGF0YSA9IHtcbiAgICAgICAgICAgIHNlbGVjdGVkQ3JpdGVyaWFzIDogdGhpcy5wcm9wcy5zZWxlY3RlZENyaXRlcmlhcyxcbiAgICAgICAgICAgIHNlbGVjdGVkTG9jYXRpb24gOiB0aGlzLnByb3BzLnNlbGVjdGVkTG9jYXRpb24sXG4gICAgICAgIH1cbiAgICAgICAgc2VhcmNoRGF0YSA9IGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzZWFyY2hEYXRhKSlcbiAgICAgICAgbGV0IGZpbHRlckRhdGEgPSBlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkodGhpcy5wcm9wcy5maWx0ZXJDcml0ZXJpYSkpXG4gICAgICAgIHRoaXMucHJvcHMuaGlzdG9yeS5wdXNoKGAvZHgvc2VhcmNocmVzdWx0cz9zZWFyY2g9JHtzZWFyY2hEYXRhfSZmaWx0ZXI9JHtmaWx0ZXJEYXRhfWApXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2PlxuXG4gICAgICAgICAgICAgICAgPENyaXRlcmlhU2VhcmNoIHsuLi50aGlzLnByb3BzfSBjaGVja0ZvckxvYWQ9e3RoaXMucHJvcHMuTE9BREVEX1NFQVJDSF9DUklURVJJQV9MQUJ9PlxuICAgICAgICAgICAgICAgICAgICA8c2VjdGlvbiBjbGFzc05hbWU9XCJ3cmFwIHdyYXAtMTAwXCI+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxDb21tb25seVNlYXJjaGVkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGluZz1cIlNlbGVjdGVkIENyaXRlcmlhXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhPXt0aGlzLnByb3BzLnNlbGVjdGVkQ3JpdGVyaWFzfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkPXtbXX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b2dnbGU9e3RoaXMucHJvcHMudG9nZ2xlRGlhZ25vc2lzQ3JpdGVyaWEuYmluZCh0aGlzKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxDb21tb25seVNlYXJjaGVkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGluZz1cIkNvbW1vbiBUZXN0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwidGVzdFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YT17dGhpcy5wcm9wcy5jb21tb25fdGVzdHN9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWQ9e3RoaXMucHJvcHMuc2VsZWN0ZWRDcml0ZXJpYXMuZmlsdGVyKHggPT4geC50eXBlID09ICd0ZXN0Jyl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9nZ2xlPXt0aGlzLnByb3BzLnRvZ2dsZURpYWdub3Npc0NyaXRlcmlhLmJpbmQodGhpcyl9XG4gICAgICAgICAgICAgICAgICAgICAgICAvPlxuXG4gICAgICAgICAgICAgICAgICAgICAgICA8Q29tbW9ubHlTZWFyY2hlZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRpbmc9XCJDb21tb24gQ29uZGl0aW9uc1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImxhYlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YT17dGhpcy5wcm9wcy5jb21tb25fY29uZGl0aW9uc31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZD17dGhpcy5wcm9wcy5zZWxlY3RlZENyaXRlcmlhcy5maWx0ZXIoeCA9PiB4LnR5cGUgPT0gJ2xhYicpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvZ2dsZT17dGhpcy5wcm9wcy50b2dnbGVEaWFnbm9zaXNDcml0ZXJpYS5iaW5kKHRoaXMpfVxuICAgICAgICAgICAgICAgICAgICAgICAgLz5cblxuICAgICAgICAgICAgICAgICAgICAgICAgPENvbW1vbmx5U2VhcmNoZWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWFkaW5nPVwiQ29tbW9uIExhYnNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJsYWJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE9e3RoaXMucHJvcHMucHJlZmVycmVkX2xhYnN9XG4gICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICA8L3NlY3Rpb24+XG4gICAgICAgICAgICAgICAgPC9Dcml0ZXJpYVNlYXJjaD5cblxuXG5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9e3RoaXMuc2VhcmNoUHJvY2VlZC5iaW5kKHRoaXMpfSBjbGFzc05hbWU9XCJ2LWJ0biB2LWJ0bi1wcmltYXJ5IGJ0bi1sZyBmaXhlZCBob3Jpem9udGFsIGJvdHRvbSBuby1yb3VuZCB0ZXh0LWxnXCI+U2hvdyBMYWJzPC9idXR0b24+XG5cblxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBTZWFyY2hDcml0ZXJpYVZpZXdcbiIsImltcG9ydCBTZWFyY2hDcml0ZXJpYVZpZXcgZnJvbSAnLi9TZWFyY2hDcml0ZXJpYVZpZXcuanMnXG5cbmV4cG9ydCBkZWZhdWx0IFNlYXJjaENyaXRlcmlhVmlldyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCBMYWJzTGlzdCBmcm9tICcuLi9zZWFyY2hSZXN1bHRzL2xhYnNMaXN0L2luZGV4LmpzJ1xuaW1wb3J0IENyaXRlcmlhU2VhcmNoIGZyb20gJy4uL2NyaXRlcmlhU2VhcmNoJ1xuaW1wb3J0IFRvcEJhciBmcm9tICcuL3RvcEJhcidcblxuY2xhc3MgU2VhcmNoUmVzdWx0c1ZpZXcgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgICAgICB0aGlzLnN0YXRlID0ge1xuXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgdGhpcy5nZXRMYWJzKClcbiAgICB9XG5cbiAgICBnZXRMYWJzKCkge1xuICAgICAgICBsZXQge1xuICAgICAgICAgICAgc2VsZWN0ZWRMb2NhdGlvbixcbiAgICAgICAgICAgIHNlbGVjdGVkQ3JpdGVyaWFzLFxuICAgICAgICAgICAgZmlsdGVyQ3JpdGVyaWEsXG4gICAgICAgICAgICBMT0FERURfU0VBUkNIX0NSSVRFUklBX0xBQlxuICAgICAgICB9ID0gdGhpcy5wcm9wc1xuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBsZXQgc2VhcmNoU3RhdGUgPSB0aGlzLmdldExvY2F0aW9uUGFyYW0oJ3NlYXJjaCcpXG4gICAgICAgICAgICBsZXQgZmlsdGVyQ3JpdGVyaWEgPSB0aGlzLmdldExvY2F0aW9uUGFyYW0oJ2ZpbHRlcicpXG4gICAgICAgICAgICBpZiAoZmlsdGVyQ3JpdGVyaWEpIHtcbiAgICAgICAgICAgICAgICBmaWx0ZXJDcml0ZXJpYSA9IEpTT04ucGFyc2UoZmlsdGVyQ3JpdGVyaWEpXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGZpbHRlckNyaXRlcmlhID0ge31cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNlYXJjaFN0YXRlID0gSlNPTi5wYXJzZShzZWFyY2hTdGF0ZSlcbiAgICAgICAgICAgIHRoaXMuZ2V0TGFiTGlzdChzZWFyY2hTdGF0ZSwgZmlsdGVyQ3JpdGVyaWEsIHRydWUpXG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZSlcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldExvY2F0aW9uUGFyYW0odGFnKSB7XG4gICAgICAgIC8vIHRoaXMgQVBJIGFzc3VtZXMgdGhlIGNvbnRleHQgb2YgcmVhY3Qtcm91dGVyLTRcbiAgICAgICAgY29uc3QgcGFyYW1TdHJpbmcgPSB0aGlzLnByb3BzLmxvY2F0aW9uLnNlYXJjaFxuICAgICAgICBjb25zdCBwYXJhbXMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKHBhcmFtU3RyaW5nKVxuICAgICAgICByZXR1cm4gcGFyYW1zLmdldCh0YWcpXG4gICAgfVxuXG4gICAgZ2V0TGFiTGlzdChzZWFyY2hTdGF0ZSwgZmlsdGVyQ3JpdGVyaWEsIG1lcmdlU3RhdGUpIHtcbiAgICAgICAgdGhpcy5wcm9wcy5nZXRMYWJzKHNlYXJjaFN0YXRlLCBmaWx0ZXJDcml0ZXJpYSwgbWVyZ2VTdGF0ZSk7XG4gICAgfVxuXG4gICAgYXBwbHlGaWx0ZXJzKGZpbHRlclN0YXRlKSB7XG4gICAgICAgIGxldCBzZWFyY2hTdGF0ZSA9IHtcbiAgICAgICAgICAgIHNlbGVjdGVkQ3JpdGVyaWFzOiB0aGlzLnByb3BzLnNlbGVjdGVkQ3JpdGVyaWFzLFxuICAgICAgICAgICAgc2VsZWN0ZWRMb2NhdGlvbjogdGhpcy5wcm9wcy5zZWxlY3RlZExvY2F0aW9uLFxuICAgICAgICB9XG4gICAgICAgIGxldCBzZWFyY2hEYXRhID0gZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNlYXJjaFN0YXRlKSlcbiAgICAgICAgbGV0IGZpbHRlckRhdGEgPSBlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoZmlsdGVyU3RhdGUpKVxuICAgICAgICB0aGlzLnByb3BzLmhpc3RvcnkucmVwbGFjZShgL2R4L3NlYXJjaHJlc3VsdHM/c2VhcmNoPSR7c2VhcmNoRGF0YX0mZmlsdGVyPSR7ZmlsdGVyRGF0YX1gKVxuXG4gICAgICAgIHRoaXMuZ2V0TGFiTGlzdChzZWFyY2hTdGF0ZSwgZmlsdGVyU3RhdGUsIHRydWUpXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNlYXJjaFJlc3VsdHNcIj5cbiAgICAgICAgICAgICAgICA8Q3JpdGVyaWFTZWFyY2ggey4uLnRoaXMucHJvcHN9IGNoZWNrRm9yTG9hZD17dGhpcy5wcm9wcy5MT0FERURfTEFCU19TRUFSQ0h9PlxuICAgICAgICAgICAgICAgICAgICA8VG9wQmFyIHsuLi50aGlzLnByb3BzfSBhcHBseUZpbHRlcnM9e3RoaXMuYXBwbHlGaWx0ZXJzLmJpbmQodGhpcyl9IC8+XG4gICAgICAgICAgICAgICAgICAgIDxMYWJzTGlzdCB7Li4udGhpcy5wcm9wc30gLz5cbiAgICAgICAgICAgICAgICA8L0NyaXRlcmlhU2VhcmNoPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBTZWFyY2hSZXN1bHRzVmlld1xuIiwiaW1wb3J0IFNlYXJjaFJlc3VsdHNWaWV3IGZyb20gJy4vU2VhcmNoUmVzdWx0c1ZpZXcuanMnXG5cbmV4cG9ydCBkZWZhdWx0IFNlYXJjaFJlc3VsdHNWaWV3IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IExhYlByb2ZpbGVDYXJkIGZyb20gJy4uLy4uL2NvbW1vbnMvbGFiUHJvZmlsZUNhcmQvaW5kZXguanMnXG5cbmNsYXNzIExhYnNMaXN0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICB9XG5cbiAgICBzdGF0aWMgY29udGV4dFR5cGVzID0ge1xuICAgICAgICByb3V0ZXI6ICgpID0+IG51bGxcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgbGV0IHsgTEFCUywgbGFiTGlzdCB9ID0gdGhpcy5wcm9wc1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8c2VjdGlvbiBjbGFzc05hbWU9XCJ3cmFwIHNlYXJjaC1ib29rLXJlc3VsdFwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGFpbmVyLWZsdWlkXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC0xMlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiTGlzdC5tYXAoKGxhYklkLCBpKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gPExhYlByb2ZpbGVDYXJkIHsuLi50aGlzLnByb3BzfSBkZXRhaWxzPXtMQUJTW2xhYklkXX0ga2V5PXtpfSAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvc2VjdGlvbj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgTGFic0xpc3RcbiIsImltcG9ydCBMYWJzTGlzdCBmcm9tICcuL0xhYnNMaXN0LmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBMYWJzTGlzdCIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG5pbXBvcnQgTWVudSwgeyBNZW51SXRlbSB9IGZyb20gJ21hdGVyaWFsLXVpL01lbnUnO1xuaW1wb3J0IFJhbmdlIGZyb20gJ3JjLXNsaWRlci9saWIvUmFuZ2UnO1xuXG5jbGFzcyBUb3BCYXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgYW5jaG9yRWw6IG51bGwsXG4gICAgICAgICAgICBvcGVuRmlsdGVyOiBmYWxzZSxcbiAgICAgICAgICAgIHByaWNlUmFuZ2U6IFsxMDAsIDE1MDBdLFxuICAgICAgICAgICAgZGlzdGFuY2VSYW5nZTogWzEsIDM1XSxcbiAgICAgICAgICAgIHNvcnRCeTogbnVsbFxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhwcm9wcykge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHsgLi4ucHJvcHMuZmlsdGVyQ3JpdGVyaWEgfSlcbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IC4uLnRoaXMucHJvcHMuZmlsdGVyQ3JpdGVyaWEgfSlcbiAgICB9XG5cbiAgICBhcHBseUZpbHRlcnMoKSB7XG4gICAgICAgIGxldCBmaWx0ZXJTdGF0ZSA9IHtcbiAgICAgICAgICAgIHByaWNlUmFuZ2U6IHRoaXMuc3RhdGUucHJpY2VSYW5nZSxcbiAgICAgICAgICAgIGRpc3RhbmNlUmFuZ2U6IHRoaXMuc3RhdGUuZGlzdGFuY2VSYW5nZSxcbiAgICAgICAgICAgIHNvcnRCeTogdGhpcy5zdGF0ZS5zb3J0QnlcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnByb3BzLmFwcGx5RmlsdGVycyhmaWx0ZXJTdGF0ZSlcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IG9wZW5GaWx0ZXI6IGZhbHNlIH0pXG4gICAgfVxuXG4gICAgaGFuZGxlT3BlbihldmVudCkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHsgYW5jaG9yRWw6IGV2ZW50LmN1cnJlbnRUYXJnZXQgfSlcbiAgICB9XG5cbiAgICBoYW5kbGVDbG9zZSh0eXBlKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBhbmNob3JFbDogbnVsbCwgc29ydEJ5OiB0eXBlIH0sICgpID0+IHtcbiAgICAgICAgICAgIGlmKHR5cGUpe1xuICAgICAgICAgICAgICAgIHRoaXMuYXBwbHlGaWx0ZXJzKClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICB0b2dnbGVGaWx0ZXIoKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgb3BlbkZpbHRlcjogIXRoaXMuc3RhdGUub3BlbkZpbHRlclxuICAgICAgICB9KVxuICAgIH1cblxuICAgIGhhbmRsZVJhbmdlKHR5cGUsIHJhbmdlKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgW3R5cGVdOiByYW5nZVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIGdldENyaXRlcmlhU3RyaW5nKHNlbGVjdGVkQ3JpdGVyaWFzKSB7XG4gICAgICAgIGlmIChzZWxlY3RlZENyaXRlcmlhcyAmJiBzZWxlY3RlZENyaXRlcmlhcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiBzZWxlY3RlZENyaXRlcmlhcy5yZWR1Y2UoKGZpbmFsLCBjdXJyLCBpKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGkgIT0gMCkge1xuICAgICAgICAgICAgICAgICAgICBmaW5hbCArPSAnLCAnXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZpbmFsICs9IGAke2N1cnIubmFtZX1gXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZpbmFsXG4gICAgICAgICAgICB9LCBcIlwiKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIGxldCBjcml0ZXJpYVN0ciA9IHRoaXMuZ2V0Q3JpdGVyaWFTdHJpbmcodGhpcy5wcm9wcy5zZWxlY3RlZENyaXRlcmlhcylcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPHNlY3Rpb24gY2xhc3NOYW1lPVwiZmlsdGVyLXJvd1wiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGFpbmVyLWZsdWlkXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC0xMlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmlsdGVyLWl0ZW1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhY3Rpb24tZmlsdGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dWwgY2xhc3NOYW1lPVwiaW5saW5lLWxpc3RcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGkgb25DbGljaz17dGhpcy5oYW5kbGVPcGVuLmJpbmQodGhpcyl9PjxzcGFuIGNsYXNzTmFtZT1cImN0LWltZyBjdC1pbWctc20gZmlsdGVyLWljb24gdGV4dC1yaWdodFwiPjxpbWcgc3JjPVwiL2Fzc2V0cy9pbWcvY3VzdG9tZXItaWNvbnMvcmFuZ2Uuc3ZnXCIgY2xhc3NOYW1lPVwiaW1nLWZsdWlkXCIgLz48L3NwYW4+PC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGkgb25DbGljaz17dGhpcy50b2dnbGVGaWx0ZXIuYmluZCh0aGlzKX0+PHNwYW4gY2xhc3NOYW1lPVwiY3QtaW1nIGN0LWltZy1zbSBmaWx0ZXItaWNvbiB0ZXh0LXJpZ2h0IGFwcGxpZWQtZmlsdGVyXCI+PGltZyBzcmM9XCIvYXNzZXRzL2ltZy9jdXN0b21lci1pY29ucy9maWx0ZXIuc3ZnXCIgY2xhc3NOYW1lPVwiaW1nLWZsdWlkXCIgLz48L3NwYW4+PHNwYW4gY2xhc3NOYW1lPVwiYXBwbGllZC1maWx0ZXItbm90aVwiIC8+PC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZpbHRlci10aXRsZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3RoaXMucHJvcHMubGFiTGlzdC5sZW5ndGh9IFJlc3VsdHMgZm91bmQgZm9yIDxzcGFuIGNsYXNzTmFtZT1cImZ3LTcwMFwiPiB7Y3JpdGVyaWFTdHJ9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8TWVudVxuICAgICAgICAgICAgICAgICAgICBpZD1cInNvcnQtbWVudVwiXG4gICAgICAgICAgICAgICAgICAgIGFuY2hvckVsPXt0aGlzLnN0YXRlLmFuY2hvckVsfVxuICAgICAgICAgICAgICAgICAgICBvcGVuPXtCb29sZWFuKHRoaXMuc3RhdGUuYW5jaG9yRWwpfVxuICAgICAgICAgICAgICAgICAgICBvbkNsb3NlPXt0aGlzLmhhbmRsZUNsb3NlLmJpbmQodGhpcywgbnVsbCl9XG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICA8TWVudUl0ZW0gb25DbGljaz17dGhpcy5oYW5kbGVDbG9zZS5iaW5kKHRoaXMsICduYW1lJyl9PlJlbGF2YW5jZTwvTWVudUl0ZW0+XG4gICAgICAgICAgICAgICAgICAgIDxNZW51SXRlbSBvbkNsaWNrPXt0aGlzLmhhbmRsZUNsb3NlLmJpbmQodGhpcywgJ3ByaWNlJyl9PkZlZTwvTWVudUl0ZW0+XG4gICAgICAgICAgICAgICAgICAgIDxNZW51SXRlbSBvbkNsaWNrPXt0aGlzLmhhbmRsZUNsb3NlLmJpbmQodGhpcywgJ2Rpc3RhbmNlJyl9PkRpc3RhbmNlPC9NZW51SXRlbT5cbiAgICAgICAgICAgICAgICA8L01lbnU+XG5cbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUub3BlbkZpbHRlciA/IDxkaXYgb25DbGljaz17dGhpcy50b2dnbGVGaWx0ZXIuYmluZCh0aGlzKX0gY2xhc3NOYW1lPVwib3ZlcmxheSBibGFja1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3aWRnZXQgZmlsdGVyLXBvcHVwXCIgb25DbGljaz17KGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgICAgICAgICAgICAgICAgICB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIndpZGdldC1jb250ZW50XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmlsdGVyUm93XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0bFwiPlByaWNlPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidHJcIj5ScyB7dGhpcy5zdGF0ZS5wcmljZVJhbmdlWzBdfSB0byB7dGhpcy5zdGF0ZS5wcmljZVJhbmdlWzFdfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImJsXCI+UnMgMTAwPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiYnJcIj5ScyAyMDAwPC9zcGFuPlxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8UmFuZ2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtaW49ezEwMH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXg9ezIwMDB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3RoaXMuc3RhdGUucHJpY2VSYW5nZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGVwPXsxMDB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicmFuZ2VcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZVJhbmdlLmJpbmQodGhpcywgJ3ByaWNlUmFuZ2UnKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZpbHRlclJvd1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGxcIj5EaXN0YW5jZTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRyXCI+e3RoaXMuc3RhdGUuZGlzdGFuY2VSYW5nZVswXX0gdG8ge3RoaXMuc3RhdGUuZGlzdGFuY2VSYW5nZVsxXX0gS008L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJibFwiPjEgPiBLTTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImJyXCI+NTAgS008L3NwYW4+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxSYW5nZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1pbj17MX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXg9ezUwfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXt0aGlzLnN0YXRlLmRpc3RhbmNlUmFuZ2V9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RlcD17MX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJyYW5nZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuaGFuZGxlUmFuZ2UuYmluZCh0aGlzLCAnZGlzdGFuY2VSYW5nZScpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3aWRnZXQtZm9vdGVyIHBkLTBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJ2LWJ0biB2LWJ0bi1wcmltYXJ5IGJ0bi1ibG9jayBidG4tbGdcIiBvbkNsaWNrPXt0aGlzLmFwcGx5RmlsdGVycy5iaW5kKHRoaXMpfT5BcHBseTwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PiA6IFwiXCJcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIDwvc2VjdGlvbj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgVG9wQmFyXG4iLCJpbXBvcnQgVG9wQmFyIGZyb20gJy4vVG9wQmFyLmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBUb3BCYXIiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IExvYWRlciBmcm9tICcuLi8uLi9jb21tb25zL0xvYWRlcidcblxuY2xhc3MgVGVzdFNlbGVjdG9yVmlldyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgICBzZWxlY3RlZExhYjogdGhpcy5wcm9wcy5tYXRjaC5wYXJhbXMuaWRcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgICB0aGlzLnByb3BzLmdldExhYkJ5SWQodGhpcy5zdGF0ZS5zZWxlY3RlZExhYilcbiAgICB9XG5cbiAgICB0b2dnbGVUZXN0KHRlc3QpIHtcbiAgICAgICAgdGhpcy5wcm9wcy50b2dnbGVEaWFnbm9zaXNDcml0ZXJpYSgndGVzdCcsIHRlc3QpXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICBcbiAgICAgICAgbGV0IGxhYkRhdGEgPSB0aGlzLnByb3BzLkxBQlNbdGhpcy5zdGF0ZS5zZWxlY3RlZExhYl1cbiAgICAgICAgbGV0IHRlc3RzID0gW11cbiAgICAgICAgbGV0IHNlbGVjdGVkVGVzdHMgPSBbXVxuXG4gICAgICAgIGlmICh0aGlzLnByb3BzLnNlbGVjdGVkQ3JpdGVyaWFzICYmIHRoaXMucHJvcHMuc2VsZWN0ZWRDcml0ZXJpYXMubGVuZ3RoKSB7XG4gICAgICAgICAgICBzZWxlY3RlZFRlc3RzID0gdGhpcy5wcm9wcy5zZWxlY3RlZENyaXRlcmlhcy5maWx0ZXIoeCA9PiB4LnR5cGUgPT0gJ3Rlc3QnKS5tYXAoeCA9PiB4LmlkKVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBpZiAobGFiRGF0YSAmJiBsYWJEYXRhLnRlc3RzICYmIGxhYkRhdGEudGVzdHMubGVuZ3RoKSB7XG4gICAgICAgICAgICB0ZXN0cyA9IGxhYkRhdGEudGVzdHMubWFwKCh0ZXN0LCBpKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIDxsaSBrZXk9e2l9PlxuICAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiY2stYnhcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHt0ZXN0LnRlc3QubmFtZX1cbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBjaGVja2VkPXtzZWxlY3RlZFRlc3RzLmluZGV4T2YodGVzdC50ZXN0LmlkKSA+IC0xfSBvbkNoYW5nZT17dGhpcy50b2dnbGVUZXN0LmJpbmQodGhpcywgdGVzdC50ZXN0KX0gLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImNoZWNrbWFya1wiIC8+XG4gICAgICAgICAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRlc3QtcHJpY2UgdGV4dC1tZCBmdy01MDBcIj57dGVzdC5tcnB9PC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXY+XG5cbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGxhYkRhdGEgP1xuXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoZWFkZXIgY2xhc3NOYW1lPVwic2tpbi13aGl0ZSBmaXhlZCBob3Jpem9udGFsIHRvcCBsb2NhdGlvbi1kZXRlY3QtaGVhZGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGFpbmVyLWZsdWlkXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLTEyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic2VsZWN0LWxvY2F0aW9uLXJvdyB0ZXh0LWNlbnRlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuaGlzdG9yeS5nbygtMSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19IGNsYXNzTmFtZT1cImN0LWltZyBjdC1pbWctbWQgY2xvc2VcIj48aW1nIHNyYz1cIi9hc3NldHMvaW1nL2N1c3RvbWVyLWljb25zL2Nsb3NlLWJsYWNrLnN2Z1wiIGNsYXNzTmFtZT1cImltZy1mbHVpZFwiIC8+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGg0IGNsYXNzTmFtZT1cImZ3LTcwMCB0ZXh0LW1kXCI+QWxsIFRlc3Q8L2g0PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC0xMlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNlYXJjaC1yb3dcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRvbi1ncm91cCBsb2NhdGlvbi1kZXRlY3QtZmllbGRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2wgaW5wdXQtbWQgc2VhcmNoLWlucHV0IG5vLXNoYWRvd1wiIHBsYWNlaG9sZGVyPVwiU2VhcmNoIFRlc3RcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImN0LWltZyBjdC1pbWctc20gbWFwLW1hcmtlci1ibHVlXCI+PGltZyBzcmM9XCIvYXNzZXRzL2ltZy9jdXN0b21lci1pY29ucy9zZWFyY2gtaWNvbi5zdmdcIiBjbGFzc05hbWU9XCJpbWctZmx1aWRcIiAvPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJkZXRlY3QtbXktbG9jYWl0b25cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJjdC1pbWcgY3QtaW1nLXhzXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7c2VsZWN0ZWRUZXN0cy5sZW5ndGh9IFNlbGVjdGVkIEl0ZW1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2hlYWRlcj5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzZWN0aW9uIGNsYXNzTmFtZT1cIndyYXAgYWxsLXRlc3Qtc2NyZWVuIFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIndpZGdldC1wYW5lbFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwYW5lbC1jb250ZW50IHBkLTBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dWwgY2xhc3NOYW1lPVwibGlzdCBhbGwtdGVzdC1saXN0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt0ZXN0c31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc2VjdGlvbj5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwidi1idG4gdi1idG4tcHJpbWFyeSBidG4tbGcgZml4ZWQgaG9yaXpvbnRhbCBib3R0b20gbm8tcm91bmQgdGV4dC1sZ1wiIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5oaXN0b3J5LmdvKC0xKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19PkRvbmU8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PiA6IDxMb2FkZXIgLz5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgVGVzdFNlbGVjdG9yVmlld1xuIiwiaW1wb3J0IFRlc3RTZWxlY3RvciBmcm9tICcuL1Rlc3RTZWxlY3RvcidcbmV4cG9ydCBkZWZhdWx0IFRlc3RTZWxlY3RvciIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG5pbXBvcnQgRG9jdG9yUHJvZmlsZUNhcmQgZnJvbSAnLi4vY29tbW9ucy9kb2N0b3JQcm9maWxlQ2FyZC9pbmRleC5qcydcbmltcG9ydCBUaW1lU2xvdFNlbGVjdG9yIGZyb20gJy4uLy4uL2NvbW1vbnMvdGltZVNsb3RTZWxlY3Rvci9pbmRleC5qcydcbmltcG9ydCBTZWxlY3RlZENsaW5pYyBmcm9tICcuLi9jb21tb25zL3NlbGVjdGVkQ2xpbmljL2luZGV4LmpzJ1xuXG5jbGFzcyBBcHBvaW50bWVudFNsb3QgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgc2VsZWN0ZWREb2N0b3I6IG51bGwsXG4gICAgICAgICAgICBzZWxlY3RlZENsaW5pYzogbnVsbCxcbiAgICAgICAgICAgIHRpbWVTbG90czogbnVsbCxcbiAgICAgICAgICAgIHNlbGVjdGVkU2xvdCA6IG51bGxcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByb2NlZWQoKSB7XG4gICAgICAgIGlmKHRoaXMuc3RhdGUuc2VsZWN0ZWRTbG90KXtcbiAgICAgICAgICAgIHRoaXMuY29udGV4dC5yb3V0ZXIuaGlzdG9yeS5wdXNoKGAvZG9jdG9ycHJvZmlsZS8ke3RoaXMuc3RhdGUuc2VsZWN0ZWREb2N0b3J9LyR7dGhpcy5zdGF0ZS5zZWxlY3RlZENsaW5pY30vYm9va2RldGFpbHM/dD0ke3RoaXMuc3RhdGUuc2VsZWN0ZWRTbG90LnN0YXJ0fWApXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZWxlY3RUaW1lU2xvdChzbG90KXtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHNlbGVjdGVkU2xvdDogc2xvdCB9KVxuICAgIH1cblxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgICBsZXQgZG9jdG9ySWQgPSB0aGlzLnByb3BzLm1hdGNoLnBhcmFtcy5pZFxuICAgICAgICBsZXQgY2xpbmljSWQgPSB0aGlzLnByb3BzLm1hdGNoLnBhcmFtcy5jbGluaWNJZFxuICAgICAgICBpZiAoZG9jdG9ySWQgJiYgY2xpbmljSWQpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBzZWxlY3RlZERvY3RvcjogZG9jdG9ySWQsIHNlbGVjdGVkQ2xpbmljOiBjbGluaWNJZCB9KVxuICAgICAgICAgICAgdGhpcy5wcm9wcy5nZXREb2N0b3JCeUlkKGRvY3RvcklkKVxuXG4gICAgICAgICAgICB0aGlzLnByb3BzLmdldFRpbWVTbG90cyhkb2N0b3JJZCwgY2xpbmljSWQsICh0aW1lU2xvdHMpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgdGltZVNsb3RzIH0pXG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhdGljIGNvbnRleHRUeXBlcyA9IHtcbiAgICAgICAgcm91dGVyOiAoKSA9PiBudWxsXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFwcG9pbnRtZW50U2xvdFwiPlxuXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnByb3BzLkRPQ1RPUlNbdGhpcy5zdGF0ZS5zZWxlY3RlZERvY3Rvcl0gP1xuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8RG9jdG9yUHJvZmlsZUNhcmRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGlkZUJvdHRvbT17dHJ1ZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGlkZUJvb2tOb3c9e3RydWV9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRldGFpbHM9e3RoaXMucHJvcHMuRE9DVE9SU1t0aGlzLnN0YXRlLnNlbGVjdGVkRG9jdG9yXX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxTZWxlY3RlZENsaW5pY1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZERvY3Rvcj17dGhpcy5wcm9wcy5ET0NUT1JTW3RoaXMuc3RhdGUuc2VsZWN0ZWREb2N0b3JdfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZENsaW5pYz17dGhpcy5zdGF0ZS5zZWxlY3RlZENsaW5pY31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZS50aW1lU2xvdHMgP1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPFRpbWVTbG90U2VsZWN0b3JcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aW1lU2xvdHM9e3RoaXMuc3RhdGUudGltZVNsb3RzfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdFRpbWVTbG90PSB7dGhpcy5zZWxlY3RUaW1lU2xvdC5iaW5kKHRoaXMpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLz4gOiAnJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cInByb2NlZWRidG5cIiBvbkNsaWNrPXt0aGlzLnByb2NlZWQuYmluZCh0aGlzKX0+UHJvY2VlZDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+IDogXCJcIlxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IEFwcG9pbnRtZW50U2xvdFxuIiwiaW1wb3J0IEFwcG9pbnRtZW50U2xvdCBmcm9tICcuL0FwcG9pbnRtZW50U2xvdC5qcydcblxuZXhwb3J0IGRlZmF1bHQgQXBwb2ludG1lbnRTbG90IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBTdGVwcGVyLCB7IFN0ZXAsIFN0ZXBMYWJlbCB9IGZyb20gJ21hdGVyaWFsLXVpL1N0ZXBwZXInO1xuXG5pbXBvcnQgQ2FsSWNvbiBmcm9tICdtYXRlcmlhbC11aS1pY29ucy9DYWxsJztcblxuXG5jbGFzcyBCb29raW5nVmlldyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJvb2tpbmdcIj5cbiAgICAgICAgICAgICAgICA8U3RlcHBlciBhY3RpdmVTdGVwPXswfSBhbHRlcm5hdGl2ZUxhYmVsPlxuICAgICAgICAgICAgICAgICAgICA8U3RlcCBrZXk9ezB9PlxuICAgICAgICAgICAgICAgICAgICAgICAgPFN0ZXBMYWJlbD57XCJBcHBvaW50bWVudCBSZXF1ZXN0ZWRcIn08L1N0ZXBMYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgPC9TdGVwPlxuICAgICAgICAgICAgICAgICAgICA8U3RlcCBrZXk9ezF9PlxuICAgICAgICAgICAgICAgICAgICAgICAgPFN0ZXBMYWJlbD57XCJBcHBvaW50bWVudCBDb25maXJtZWRcIn08L1N0ZXBMYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgPC9TdGVwPlxuICAgICAgICAgICAgICAgICAgICA8U3RlcCBrZXk9ezJ9PlxuICAgICAgICAgICAgICAgICAgICAgICAgPFN0ZXBMYWJlbD57XCJBcHBvaW50bWVudCBDb21wbGV0ZVwifTwvU3RlcExhYmVsPlxuICAgICAgICAgICAgICAgICAgICA8L1N0ZXA+XG4gICAgICAgICAgICAgICAgPC9TdGVwcGVyPlxuICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInJlcXVlc3RMaW5lXCI+V2UgaGF2ZSByZXF1ZXN0ZWQgRHIuU21pdGggdG8gY29uZmlybSB5b3VyIGFwcG9pbnRtZW50PC9wPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGF0aWVudE5hbWVcIj5cbiAgICAgICAgICAgICAgICAgICAgPHA+Zm9yPC9wPlxuICAgICAgICAgICAgICAgICAgICA8cD5CcmlqZXNoIEt1bWFyPC9wPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJkZXRhaWxzXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJsYmxcIj5XaXRoPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiY250bnRcIj5Eci4gU3RldmUgU21pdGg8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwibGJsXCI+V2hlcmU8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJjbnRudFwiPlNhcnZvZGF5YSBDbGluaWMsICMgMzYxLCBTZWN0b3IgNTAsIEd1cmdhb248L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwibGJsXCI+V2hlbjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImNudG50XCI+V2VkbmVzZGF5LCBKdW5lIDI3LCAyMDE4LCAxMTo0NUFNPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImxibFwiPlJlZmVyZW5jZSM8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJjbnRudFwiPkhVVkhKQjg3SEpCSkg8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJyZXF1ZXN0XCI+UmVxdWVzdCBSZS1TY2hlZHVsZS9DYW5jZWw8L2J1dHRvbj5cblxuICAgICAgICAgICAgICAgIDxDYWxJY29uIGNsYXNzTmFtZT1cImNhbGxJY29uXCIvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IEJvb2tpbmdWaWV3XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgRG9jdG9yUHJvZmlsZUNhcmQgZnJvbSAnLi4vY29tbW9ucy9kb2N0b3JQcm9maWxlQ2FyZC9pbmRleC5qcydcbmltcG9ydCBDbGluaWNTZWxlY3RvciBmcm9tICcuLi9jb21tb25zL2NsaW5pY1NlbGVjdG9yL2luZGV4LmpzJ1xuXG5jbGFzcyBDbGluaWNMaXN0VmlldyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgICBzZWxlY3RlZERvY3RvcjogbnVsbFxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIGxldCBkb2N0b3JJZCA9IHRoaXMucHJvcHMubWF0Y2gucGFyYW1zLmlkXG4gICAgICAgIGlmIChkb2N0b3JJZCkge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHNlbGVjdGVkRG9jdG9yOiBkb2N0b3JJZCB9KVxuICAgICAgICAgICAgdGhpcy5wcm9wcy5nZXREb2N0b3JCeUlkKGRvY3RvcklkKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImRvY3RvclByb2ZpbGVcIj5cblxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5ET0NUT1JTW3RoaXMuc3RhdGUuc2VsZWN0ZWREb2N0b3JdID9cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPERvY3RvclByb2ZpbGVDYXJkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhpZGVCb3R0b209e3RydWV9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhpZGVCb29rTm93PXt0cnVlfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXRhaWxzPXt0aGlzLnByb3BzLkRPQ1RPUlNbdGhpcy5zdGF0ZS5zZWxlY3RlZERvY3Rvcl19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Q2xpbmljU2VsZWN0b3JcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGV0YWlscz17dGhpcy5wcm9wcy5ET0NUT1JTW3RoaXMuc3RhdGUuc2VsZWN0ZWREb2N0b3JdfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7Li4udGhpcy5wcm9wc31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+IDogXCJcIlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBDbGluaWNMaXN0Vmlld1xuIiwiaW1wb3J0IENsaW5pY0xpc3RWaWV3IGZyb20gJy4vQ2xpbmljTGlzdFZpZXcuanMnXG5cbmV4cG9ydCBkZWZhdWx0IENsaW5pY0xpc3RWaWV3IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cbmltcG9ydCBDbG9ja0ljb24gZnJvbSAnbWF0ZXJpYWwtdWktaWNvbnMvQXZUaW1lcic7XG5pbXBvcnQgUmlnaHRBcnJvd0ljb24gZnJvbSAnbWF0ZXJpYWwtdWktaWNvbnMvS2V5Ym9hcmRBcnJvd1JpZ2h0JztcbmltcG9ydCBNb25leUljb24gZnJvbSAnbWF0ZXJpYWwtdWktaWNvbnMvQXR0YWNoTW9uZXknO1xuXG5cbmNsYXNzIENsaW5pY1NlbGVjdG9yIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICB9XG5cbiAgICBzZWxlY3RDbGluaWMoY2xpbmljSWQpIHtcbiAgICAgICAgbGV0IGRvY3RvcklkID0gdGhpcy5wcm9wcy5tYXRjaC5wYXJhbXMuaWRcbiAgICAgICAgdGhpcy5jb250ZXh0LnJvdXRlci5oaXN0b3J5LnB1c2goYC9kb2N0b3Jwcm9maWxlLyR7ZG9jdG9ySWR9LyR7Y2xpbmljSWR9L2Jvb2tgKVxuICAgIH1cblxuICAgIHN0YXRpYyBjb250ZXh0VHlwZXMgPSB7XG4gICAgICAgIHJvdXRlcjogKCkgPT4gbnVsbFxuICAgIH1cblxuICAgIGdldFRpbWUodW5peF90aW1lc3RhbXApIHtcbiAgICAgICAgdmFyIGRhdGUgPSBuZXcgRGF0ZSh1bml4X3RpbWVzdGFtcCAqIDEwMDApO1xuICAgICAgICB2YXIgaG91cnMgPSBkYXRlLmdldEhvdXJzKCk7XG4gICAgICAgIHZhciBtaW51dGVzID0gXCIwXCIgKyBkYXRlLmdldE1pbnV0ZXMoKTtcbiAgICAgICAgcmV0dXJuIGhvdXJzICsgJzonICsgbWludXRlcy5zdWJzdHIoLTIpXG4gICAgfVxuXG4gICAgZ2V0QXZhaWxhYmlsaXR5KGF2YWlsYWJpbGl0eSkge1xuICAgICAgICBpZiAoYXZhaWxhYmlsaXR5KSB7XG4gICAgICAgICAgICBsZXQgeyBuZXh0QXZhaWxhYmxlIH0gPSBhdmFpbGFiaWxpdHlcbiAgICAgICAgICAgIGlmIChuZXh0QXZhaWxhYmxlWzBdKSB7XG4gICAgICAgICAgICAgICAgbGV0IGRhdGUgPSBuZXcgRGF0ZShuZXh0QXZhaWxhYmxlWzBdLmZyb20pLnRvRGF0ZVN0cmluZygpXG4gICAgICAgICAgICAgICAgbGV0IHRpbWVTdGFydCA9IHRoaXMuZ2V0VGltZShuZXh0QXZhaWxhYmxlWzBdLmZyb20pXG4gICAgICAgICAgICAgICAgbGV0IHRpbWVFbmQgPSB0aGlzLmdldFRpbWUobmV4dEF2YWlsYWJsZVswXS50bylcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICBkYXRlLCB0aW1lU3RhcnQsIHRpbWVFbmQsIGZlZTogbmV4dEF2YWlsYWJsZVswXS5mZWVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4geyBkYXRlOiAnJywgdGltZVN0YXJ0OiAnJywgdGltZUVuZDogJycsIGZlZTogeyBhbW91bnQ6ICcnIH0gfVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICBsZXQgeyBhdmFpbGFiaWxpdHkgfSA9IHRoaXMucHJvcHMuZGV0YWlsc1xuXG4gICAgICAgIGF2YWlsYWJpbGl0eSA9IGF2YWlsYWJpbGl0eS5tYXAoKGNsaW5pYykgPT4ge1xuICAgICAgICAgICAgY2xpbmljLnRpbWVBdmFpbGFibGUgPSB0aGlzLmdldEF2YWlsYWJpbGl0eShjbGluaWMpXG4gICAgICAgICAgICByZXR1cm4gY2xpbmljXG4gICAgICAgIH0pXG5cblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjbGluaWNTZWxlY3RvclwiPlxuICAgICAgICAgICAgICAgIDxoNT5Eci4gU3RldmUgaXMgYXZhaWxhYmxlIGF0PC9oNT5cblxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgYXZhaWxhYmlsaXR5Lm1hcCgoY2xpbmljLCBpKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gPGRpdiBrZXk9e2l9IGNsYXNzTmFtZT1cImNsaW5pY1wiIG9uQ2xpY2s9e3RoaXMuc2VsZWN0Q2xpbmljLmJpbmQodGhpcyxjbGluaWMuaWQpfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm5hbWVcIj57Y2xpbmljLm5hbWUgKyBcIiwgXCIgKyBjbGluaWMuYWRkcmVzc308L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImRldGFpbHNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPENsb2NrSWNvbiBjbGFzc05hbWU9XCJjbG9ja0ljb25cIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8TW9uZXlJY29uIGNsYXNzTmFtZT1cIm1vbmV5SWNvblwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsaW5pYy5kYXlzLm1hcCgoZGF5LCBpKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiA8c3BhblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5PXtpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtkYXkuaXNBdmFpbGFibGUgPyBcImlzQXZhaWxhYmxlXCIgOiBcIlwifT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtkYXkuZGF5WzBdfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtjbGluaWMudGltZUF2YWlsYWJsZS50aW1lU3RhcnR9IHRvIHtjbGluaWMudGltZUF2YWlsYWJsZS50aW1lRW5kfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwPntgRmVlOiBScy4ke2NsaW5pYy50aW1lQXZhaWxhYmxlLmZlZS5hbW91bnR9YH08L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJib29rXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHRcIj5Cb29rPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8UmlnaHRBcnJvd0ljb24gY2xhc3NOYW1lPVwiYm9va0ljb25cIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBDbGluaWNTZWxlY3RvclxuIiwiaW1wb3J0IENsaW5pY1NlbGVjdG9yIGZyb20gJy4vQ2xpbmljU2VsZWN0b3IuanMnXG5cbmV4cG9ydCBkZWZhdWx0IENsaW5pY1NlbGVjdG9yIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IENoaXAgZnJvbSAnbWF0ZXJpYWwtdWkvQ2hpcCc7XG5cblxuY2xhc3MgQ29tbW9ubHlTZWFyY2hlZCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG5cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICBsZXQgcGlsbHMgPSB0aGlzLnByb3BzLmRhdGEubWFwKChwaWxsKSA9PiB7XG4gICAgICAgICAgICBsZXQgc2VsZWN0ZWQgPSAhIXRoaXMucHJvcHMuc2VsZWN0ZWRbcGlsbC5pZF1cbiAgICAgICAgICAgIHJldHVybiA8Q2hpcFxuICAgICAgICAgICAgICAgIGxhYmVsPXtwaWxsLm5hbWV9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtzZWxlY3RlZCA/IFwicGlsbCBzZWxlY3RlZFwiIDogXCJwaWxsXCJ9XG4gICAgICAgICAgICAgICAga2V5PXtwaWxsLmlkfVxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMudG9nZ2xlUGlsbChwaWxsLmlkKVxuICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAvPlxuXG4gICAgICAgIH0pXG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29tbW9ubHlTZWFyY2hlZFwiPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImhlYWRpbmdcIj57dGhpcy5wcm9wcy5oZWFkaW5nfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBpbGxzXCI+XG4gICAgICAgICAgICAgICAgICAgIHtwaWxsc31cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBDb21tb25seVNlYXJjaGVkXG4iLCJpbXBvcnQgQ29tbW9ubHlTZWFyY2hlZCBmcm9tICcuL0NvbW1vbmx5U2VhcmNoZWQuanMnXG5cblxuZXhwb3J0IGRlZmF1bHQgQ29tbW9ubHlTZWFyY2hlZCIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCBDaGlwIGZyb20gJ21hdGVyaWFsLXVpL0NoaXAnO1xuXG5jbGFzcyBDcml0ZXJpYVNlbGVjdG9yIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICB9XG5cbiAgICBoYW5kbGVEZWxldGUoaWQsIGhhbmRsZXIpIHtcbiAgICAgICAgaWYoaGFuZGxlciA9PSAndG9nZ2xlQ3JpdGVyaWEnKXtcbiAgICAgICAgICAgIHRoaXMucHJvcHNbaGFuZGxlcl0oe2lkfSlcbiAgICAgICAgfSBlbHNle1xuICAgICAgICAgICAgdGhpcy5wcm9wc1toYW5kbGVyXShpZClcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN0YXRpYyBjb250ZXh0VHlwZXMgPSB7XG4gICAgICAgIHJvdXRlcjogKCkgPT4gbnVsbFxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICBsZXQgcGlsbHMgPSBbXVxuICAgICAgICBsZXQgY29uZGl0aW9ucyA9IFtdXG4gICAgICAgIGxldCBzcGVjaWFsaXRpZXMgPSBbXVxuICAgICAgICBsZXQgY3JpdGVyaWFzID0gW11cblxuICAgICAgICBpZiAodGhpcy5wcm9wcy5jb21tb25seVNlYXJjaGVkQ29uZGl0aW9ucykge1xuICAgICAgICAgICAgY29uZGl0aW9ucyA9IHRoaXMucHJvcHMuY29tbW9ubHlTZWFyY2hlZENvbmRpdGlvbnMuZmlsdGVyKChwaWxsKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMuc2VsZWN0ZWRDb25kaXRpb25zW3BpbGwuaWRdXG4gICAgICAgICAgICB9KS5tYXAoKHBpbGwpID0+IHtcbiAgICAgICAgICAgICAgICBwaWxsLnRzID0gdGhpcy5wcm9wcy5zZWxlY3RlZENvbmRpdGlvbnNbcGlsbC5pZF1cbiAgICAgICAgICAgICAgICBwaWxsLnR5cGUgPSAndG9nZ2xlQ29uZGl0aW9uJ1xuICAgICAgICAgICAgICAgIHJldHVybiBwaWxsXG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmNvbW1vbmx5U2VhcmNoZWRTcGVjaWFsaXRpZXMpIHtcbiAgICAgICAgICAgIHNwZWNpYWxpdGllcyA9IHRoaXMucHJvcHMuY29tbW9ubHlTZWFyY2hlZFNwZWNpYWxpdGllcy5maWx0ZXIoKHBpbGwpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5zZWxlY3RlZFNwZWNpYWxpdGllc1twaWxsLmlkXVxuICAgICAgICAgICAgfSkubWFwKChwaWxsKSA9PiB7XG4gICAgICAgICAgICAgICAgcGlsbC50cyA9IHRoaXMucHJvcHMuc2VsZWN0ZWRTcGVjaWFsaXRpZXNbcGlsbC5pZF1cbiAgICAgICAgICAgICAgICBwaWxsLnR5cGUgPSAndG9nZ2xlU3BlY2lhbGl0eSdcbiAgICAgICAgICAgICAgICByZXR1cm4gcGlsbFxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgICBpZih0aGlzLnByb3BzLnNlbGVjdGVkQ3JpdGVyaWEpe1xuICAgICAgICAgICAgY3JpdGVyaWFzID0gT2JqZWN0LmtleXModGhpcy5wcm9wcy5zZWxlY3RlZENyaXRlcmlhKS5tYXAoKGNyaXRlcmlhKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IHBpbGwgPSB0aGlzLnByb3BzLnNlbGVjdGVkQ3JpdGVyaWFbY3JpdGVyaWFdXG4gICAgICAgICAgICAgICAgcGlsbC50eXBlID0gJ3RvZ2dsZUNyaXRlcmlhJ1xuICAgICAgICAgICAgICAgIHJldHVybiBwaWxsXG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG5cbiAgICAgICAgcGlsbHMgPSBbLi4uY29uZGl0aW9ucywgLi4uc3BlY2lhbGl0aWVzLCAuLi5jcml0ZXJpYXNdXG4gICAgICAgIHBpbGxzID0gcGlsbHMuc29ydCgoYSxiKSA9PiB7XG4gICAgICAgICAgICBsZXQgZGF0ZUEgPSBuZXcgRGF0ZShhLnRzKS5nZXRUaW1lKClcbiAgICAgICAgICAgIGxldCBkYXRlQiA9IG5ldyBEYXRlKGIudHMpLmdldFRpbWUoKVxuICAgICAgICAgICAgcmV0dXJuIGRhdGVBID4gZGF0ZUIgPyAxIDogLTFcbiAgICAgICAgfSkubWFwKChwaWxsKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gPENoaXBcbiAgICAgICAgICAgICAgICBsYWJlbD17cGlsbC5uYW1lfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17XCJwaWxsc2VsZWN0ZWRcIn1cbiAgICAgICAgICAgICAgICBrZXk9e3BpbGwudHlwZSArIHBpbGwuaWR9XG4gICAgICAgICAgICAgICAgb25EZWxldGU9e3RoaXMuaGFuZGxlRGVsZXRlLmJpbmQodGhpcywgcGlsbC5pZCwgcGlsbC50eXBlKX1cbiAgICAgICAgICAgIC8+XG4gICAgICAgIH0pXG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY3JpdGVyaWFTZWxlY3RvclwiPlxuICAgICAgICAgICAgICAgIDxpbnB1dCBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGV4dC5yb3V0ZXIuaGlzdG9yeS5wdXNoKCcvY3JpdGVyaWFzZWFyY2gnKVxuICAgICAgICAgICAgICAgIH19IHBsYWNlaG9sZGVyPXtcIlNlYXJjaCBmb3Igc3ltcHRvbXMsIERvY3RvcnMsIGNvbmRpdGlvbnMgLi5ldGNcIn0gLz5cblxuICAgICAgICAgICAgICAgIHtwaWxsc31cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBDcml0ZXJpYVNlbGVjdG9yXG4iLCJpbXBvcnQgQ3JpdGVyaWFTZWxlY3RvciBmcm9tICcuL0NyaXRlcmlhU2VsZWN0b3IuanMnXG5cbmV4cG9ydCBkZWZhdWx0IENyaXRlcmlhU2VsZWN0b3IiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcblxuaW1wb3J0IEVtb3RpSWNvbiBmcm9tICdtYXRlcmlhbC11aS1pY29ucy9BY2NvdW50Q2lyY2xlJztcbmltcG9ydCBIb21lSWNvbiBmcm9tICdtYXRlcmlhbC11aS1pY29ucy9Ib21lJztcbmltcG9ydCBDbG9ja0ljb24gZnJvbSAnbWF0ZXJpYWwtdWktaWNvbnMvQXZUaW1lcic7XG5pbXBvcnQgTG9jYXRpb25zSWNvbiBmcm9tICdtYXRlcmlhbC11aS1pY29ucy9Mb2NhdGlvbk9uJztcblxuXG5jbGFzcyBEb2N0b3JQcm9maWxlQ2FyZCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgfVxuXG4gICAgY2FyZENsaWNrKGlkLCBlKSB7XG4gICAgICAgIHRoaXMuY29udGV4dC5yb3V0ZXIuaGlzdG9yeS5wdXNoKGAvZG9jdG9ycHJvZmlsZS8ke2lkfWApXG4gICAgfVxuXG4gICAgYm9va05vdyhpZCwgZSkge1xuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpXG4gICAgICAgIHRoaXMuY29udGV4dC5yb3V0ZXIuaGlzdG9yeS5wdXNoKGAvZG9jdG9ycHJvZmlsZS8ke2lkfS9hdmFpbGFiaWxpdHlgKVxuICAgIH1cblxuICAgIHN0YXRpYyBjb250ZXh0VHlwZXMgPSB7XG4gICAgICAgIHJvdXRlcjogKCkgPT4gbnVsbFxuICAgIH1cblxuICAgIGdldFF1YWxpZmljYXRpb25TdHIocXVhbGlmaWNhdGlvblNwZWNpYWxpemF0aW9uKSB7XG4gICAgICAgIHJldHVybiBxdWFsaWZpY2F0aW9uU3BlY2lhbGl6YXRpb24ucmVkdWNlKChzdHIsIGN1cnIsIGkpID0+IHtcbiAgICAgICAgICAgIHN0ciArPSBgJHtjdXJyLnF1YWxpZmljYXRpb259YFxuICAgICAgICAgICAgaWYgKGN1cnIuc3BlY2lhbGl6YXRpb24pIHtcbiAgICAgICAgICAgICAgICBzdHIgKz0gYCAtICR7Y3Vyci5zcGVjaWFsaXphdGlvbn1gXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoaSA8IHF1YWxpZmljYXRpb25TcGVjaWFsaXphdGlvbi5sZW5ndGggLSAxKSBzdHIgKz0gYCwgYDtcbiAgICAgICAgICAgIHJldHVybiBzdHJcbiAgICAgICAgfSwgXCJcIilcbiAgICB9XG5cbiAgICBnZXRUaW1lKHVuaXhfdGltZXN0YW1wKSB7XG4gICAgICAgIHZhciBkYXRlID0gbmV3IERhdGUodW5peF90aW1lc3RhbXAgKiAxMDAwKTtcbiAgICAgICAgdmFyIGhvdXJzID0gZGF0ZS5nZXRIb3VycygpO1xuICAgICAgICB2YXIgbWludXRlcyA9IFwiMFwiICsgZGF0ZS5nZXRNaW51dGVzKCk7XG4gICAgICAgIHJldHVybiBob3VycyArICc6JyArIG1pbnV0ZXMuc3Vic3RyKC0yKVxuICAgIH1cblxuICAgIGdldEF2YWlsYWJpbGl0eShhdmFpbGFiaWxpdHkpIHtcbiAgICAgICAgaWYgKGF2YWlsYWJpbGl0eSkge1xuICAgICAgICAgICAgbGV0IHsgbmV4dEF2YWlsYWJsZSB9ID0gYXZhaWxhYmlsaXR5XG4gICAgICAgICAgICBpZiAobmV4dEF2YWlsYWJsZVswXSkge1xuICAgICAgICAgICAgICAgIGxldCBkYXRlID0gbmV3IERhdGUobmV4dEF2YWlsYWJsZVswXS5mcm9tKS50b0RhdGVTdHJpbmcoKVxuICAgICAgICAgICAgICAgIGxldCB0aW1lU3RhcnQgPSB0aGlzLmdldFRpbWUobmV4dEF2YWlsYWJsZVswXS5mcm9tKVxuICAgICAgICAgICAgICAgIGxldCB0aW1lRW5kID0gdGhpcy5nZXRUaW1lKG5leHRBdmFpbGFibGVbMF0udG8pXG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0ZSwgdGltZVN0YXJ0LCB0aW1lRW5kLCBmZWU6IG5leHRBdmFpbGFibGVbMF0uZmVlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHsgZGF0ZTogJycsIHRpbWVTdGFydDogJycsIHRpbWVFbmQ6ICcnLCBmZWU6IHsgYW1vdW50OiAnJyB9IH1cbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgbGV0IHsgaWQsIG5hbWUsIHByb2ZpbGVfaW1nLCBwcmFjdGljZV9kdXJhdGlvbiwgcXVhbGlmaWNhdGlvblNwZWNpYWxpemF0aW9uLCBjb25zdWx0YXRpb25Db3VudCwgYXZhaWxhYmlsaXR5LCBwYXN0RXhwZXJpZW5jZSB9ID0gdGhpcy5wcm9wcy5kZXRhaWxzXG5cbiAgICAgICAgbGV0IHF1YWxpZmljYXRpb25TdHJpbmcgPSB0aGlzLmdldFF1YWxpZmljYXRpb25TdHIocXVhbGlmaWNhdGlvblNwZWNpYWxpemF0aW9uKVxuICAgICAgICBsZXQgdGltZUF2YWlsYWJsZSA9IHRoaXMuZ2V0QXZhaWxhYmlsaXR5KGF2YWlsYWJpbGl0eVswXSlcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJkb2N0b3JDYXJkXCIgb25DbGljaz17dGhpcy5jYXJkQ2xpY2suYmluZCh0aGlzLCBpZCl9PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZGV0YWlsc0RpdlwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN1Yk9wdGlvbnNJbWFnZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGltZyBzcmM9e3Byb2ZpbGVfaW1nfSBjbGFzc05hbWU9XCJkb2N0b3JJbWFnZVwiIC8+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN1Yk9wdGlvbnNDb250ZW50XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJuYW1lXCI+e25hbWV9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicXVhbGlmaWNhdGlvblwiPntxdWFsaWZpY2F0aW9uU3RyaW5nfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImRlc2lnbmF0aW9uXCI+e3Bhc3RFeHBlcmllbmNlfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImV4cGVyaWVuY2VcIj57cHJhY3RpY2VfZHVyYXRpb259IHllYXJzIG9mIGV4cGVyaWVuY2U8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAhIXRoaXMucHJvcHMuaGlkZUJvb2tOb3cgPyAnJyA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdWJPcHRpb25zSW50ZXJhY3RcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJib29rTm93XCIgb25DbGljaz17dGhpcy5ib29rTm93LmJpbmQodGhpcywgaWQpfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEJvb2sgTm93XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicHJpY2VcIj5GZWU6IFJzLiB7dGltZUF2YWlsYWJsZS5mZWUuYW1vdW50fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgISF0aGlzLnByb3BzLmhpZGVCb3R0b20gPyAnJyA6XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJvdHRvbU9wdGlvbnNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN1Yk9wdGlvbnNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPEhvbWVJY29uIGNsYXNzTmFtZT1cImNsaW5pY0ljb25cIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJjbGluaWNOYW1lXCI+e2F2YWlsYWJpbGl0eVswXS5uYW1lfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN1Yk9wdGlvbnNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPENsb2NrSWNvbiBjbGFzc05hbWU9XCJjbGluaWNJY29uXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGltZUVudHJ5XCI+e3RpbWVBdmFpbGFibGUuZGF0ZX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRpbWVFbnRyeVwiPnt0aW1lQXZhaWxhYmxlLnRpbWVTdGFydH0gdG8ge3RpbWVBdmFpbGFibGUudGltZUVuZH08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdWJPcHRpb25zXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxMb2NhdGlvbnNJY29uIGNsYXNzTmFtZT1cImNsaW5pY0ljb25cIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJjbGluaWNOYW1lXCI+e2F2YWlsYWJpbGl0eVswXS5hZGRyZXNzfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBEb2N0b3JQcm9maWxlQ2FyZFxuIiwiaW1wb3J0IERvY3RvclByb2ZpbGVDYXJkIGZyb20gJy4vRG9jdG9yUHJvZmlsZUNhcmQuanMnXG5cbmV4cG9ydCBkZWZhdWx0IERvY3RvclByb2ZpbGVDYXJkIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuY2xhc3MgU2VsZWN0ZWRDbGluaWMgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgICAgICB0aGlzLnN0YXRlID0ge1xuXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdGF0aWMgY29udGV4dFR5cGVzID0ge1xuICAgICAgICByb3V0ZXI6ICgpID0+IG51bGxcbiAgICB9XG5cdFxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICBsZXQgeyBzZWxlY3RlZERvY3Rvciwgc2VsZWN0ZWRDbGluaWMgfSA9IHRoaXMucHJvcHNcblxuICAgICAgICBsZXQgY2xpbmljRGF0YSA9IHNlbGVjdGVkRG9jdG9yLmF2YWlsYWJpbGl0eS5maWx0ZXIoKGNsaW5pYykgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGNsaW5pYy5pZCA9PSBzZWxlY3RlZENsaW5pY1xuICAgICAgICB9KVswXVxuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNlbGVjdGVkQ2xpbmljXCI+XG4gICAgICAgICAgICAgICAgPGg1PlNlbGVjdGVkIENsaW5pYzwvaDU+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiY2xpbmljTmFtZVwiPnsgY2xpbmljRGF0YS5uYW1lICsgXCIsIFwiICsgY2xpbmljRGF0YS5hZGRyZXNzIH08L3NwYW4+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZmVlXCI+RmVlOiBScy57Y2xpbmljRGF0YS5uZXh0QXZhaWxhYmxlWzBdLmZlZS5hbW91bnR9PC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IFNlbGVjdGVkQ2xpbmljXG4iLCJpbXBvcnQgU2VsZWN0ZWRDbGluaWMgZnJvbSAnLi9TZWxlY3RlZENsaW5pYy5qcydcblxuZXhwb3J0IGRlZmF1bHQgU2VsZWN0ZWRDbGluaWMiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5jb25zdCBkZWJvdW5jZXIgPSAoZm4sIGRlbGF5KSA9PiB7XG4gICAgbGV0IHRpbWVyID0gbnVsbFxuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aW1lcilcbiAgICAgICAgdGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIGZuLmNhbGwodGhpcylcbiAgICAgICAgfSwgZGVsYXkpXG4gICAgfVxufVxuXG5cbmNsYXNzIENyaXRlcmlhU2VhcmNoVmlldyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgICBzZWFyY2hWYWx1ZTogJycsXG4gICAgICAgICAgICBzZWFyY2hSZXN1bHRzOiBbXVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIHRoaXMuZ2V0U2VhcmNoUmVzdWx0cyA9IGRlYm91bmNlcih0aGlzLmdldFNlYXJjaFJlc3VsdHMuYmluZCh0aGlzKSwgMTAwMClcbiAgICAgICAgbGV0IGlucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RvcENyaXRlcmlhU2VhcmNoJylcbiAgICAgICAgaW5wdXQuZm9jdXMoKVxuICAgIH1cblxuICAgIGlucHV0SGFuZGxlcihlKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBzZWFyY2hWYWx1ZTogZS50YXJnZXQudmFsdWUgfSlcbiAgICAgICAgdGhpcy5nZXRTZWFyY2hSZXN1bHRzKClcbiAgICB9XG5cbiAgICBnZXRTZWFyY2hSZXN1bHRzKCkge1xuICAgICAgICB0aGlzLnByb3BzLmdldENyaXRlcmlhUmVzdWx0cyh0aGlzLnN0YXRlLnNlYXJjaFZhbHVlLCAoc2VhcmNoUmVzdWx0cykgPT4ge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHNlYXJjaFJlc3VsdHM6IHNlYXJjaFJlc3VsdHMucmVzdWx0IH0pXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgYWRkQ3JpdGVyaWEoY3JpdGVyaWEsIHR5cGUpIHtcbiAgICAgICAgY3JpdGVyaWEudHlwZSA9IHR5cGVcbiAgICAgICAgdGhpcy5wcm9wcy50b2dnbGVDcml0ZXJpYShjcml0ZXJpYSlcbiAgICAgICAgdGhpcy5jb250ZXh0LnJvdXRlci5oaXN0b3J5LmdvQmFjaygpXG4gICAgfVxuXG4gICAgc3RhdGljIGNvbnRleHRUeXBlcyA9IHtcbiAgICAgICAgcm91dGVyOiAoKSA9PiBudWxsXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxvY2F0aW9uU2VhcmNoXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsb2NhdGlvblNlYXJjaEJveFwiPlxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgY2xhc3NOYW1lPVwidG9wU2VhcmNoXCIgaWQ9XCJ0b3BDcml0ZXJpYVNlYXJjaFwiIG9uQ2hhbmdlPXt0aGlzLmlucHV0SGFuZGxlci5iaW5kKHRoaXMpfSB2YWx1ZT17dGhpcy5zdGF0ZS5zZWFyY2hWYWx1ZX0gcGxhY2Vob2xkZXI9XCJTZWFyY2ggZm9yIHN5bXB0b21zLCBEb2N0b3MsIGNvbmRpdGlvbnMgLi5ldGNcIi8+XG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUuc2VhcmNoUmVzdWx0cy5tYXAoKHR5cGUsaSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT1cInNlYXJjaFJlc3VsdFR5cGVcIiBrZXk9e2l9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cD57dHlwZS5uYW1lfTwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZS5kYXRhLm1hcCgocmVzdWx0RGF0YSxqKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDxzcGFuIGtleT17an0gY2xhc3NOYW1lPVwicGFjLWl0ZW1cIiBvbkNsaWNrPXt0aGlzLmFkZENyaXRlcmlhLmJpbmQodGhpcywgcmVzdWx0RGF0YSwgdHlwZS50eXBlKX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtyZXN1bHREYXRhLm5hbWV9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgQ3JpdGVyaWFTZWFyY2hWaWV3XG4iLCJpbXBvcnQgQ3JpdGVyaWFTZWFyY2hWaWV3IGZyb20gJy4vQ3JpdGVyaWFTZWFyY2hWaWV3LmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBDcml0ZXJpYVNlYXJjaFZpZXciLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgRG9jdG9yUHJvZmlsZUNhcmQgZnJvbSAnLi4vY29tbW9ucy9kb2N0b3JQcm9maWxlQ2FyZC9pbmRleC5qcydcbmltcG9ydCBBYm91dERvY3RvciBmcm9tICcuLi9kb2N0b3JQcm9maWxlL2Fib3V0RG9jdG9yL2luZGV4LmpzJ1xuaW1wb3J0IFByb2Zlc3Npb25hbEdyYXBoIGZyb20gJy4uL2RvY3RvclByb2ZpbGUvcHJvZmVzc2lvbmFsR3JhcGgvaW5kZXguanMnXG5pbXBvcnQgQ2xpbmljU2VsZWN0b3IgZnJvbSAnLi4vY29tbW9ucy9jbGluaWNTZWxlY3Rvci9pbmRleC5qcydcblxuY2xhc3MgRG9jdG9yUHJvZmlsZVZpZXcgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgc2VsZWN0ZWREb2N0b3IgOiBudWxsXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgbGV0IGRvY3RvcklkID0gdGhpcy5wcm9wcy5tYXRjaC5wYXJhbXMuaWRcbiAgICAgICAgaWYgKGRvY3RvcklkKSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtzZWxlY3RlZERvY3RvciA6IGRvY3RvcklkfSlcbiAgICAgICAgICAgIHRoaXMucHJvcHMuZ2V0RG9jdG9yQnlJZChkb2N0b3JJZClcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJkb2N0b3JQcm9maWxlXCI+XG5cbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuRE9DVE9SU1t0aGlzLnN0YXRlLnNlbGVjdGVkRG9jdG9yXSA/XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxEb2N0b3JQcm9maWxlQ2FyZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoaWRlQm90dG9tPXt0cnVlfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXRhaWxzPXt0aGlzLnByb3BzLkRPQ1RPUlNbdGhpcy5zdGF0ZS5zZWxlY3RlZERvY3Rvcl19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8QWJvdXREb2N0b3IgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Q2xpbmljU2VsZWN0b3JcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGV0YWlscz17dGhpcy5wcm9wcy5ET0NUT1JTW3RoaXMuc3RhdGUuc2VsZWN0ZWREb2N0b3JdfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7Li4udGhpcy5wcm9wc31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxQcm9mZXNzaW9uYWxHcmFwaCAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+IDogXCJcIlxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBEb2N0b3JQcm9maWxlVmlld1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cbmNsYXNzIEFib3V0RG9jdG9yIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcblxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYm91dERvY3RvclwiPlxuICAgICAgICAgICAgICAgIDxoNT5BYm91dCBEci4gU3RldmUgUmF5PC9oNT5cbiAgICAgICAgICAgICAgICA8cD5Mb3JlbSBpcHN1bSBkb2xvciBzaXQgYW1ldCwgZG9sb3IgdXQgdmVzdGlidWx1bSBibGFuZGl0LCB0dXJwaXMgZnVzY2UuIExhYm9yZSBwb3RlbnRpIHZpdmFtdXMgb2RpbyBhcmN1IHZlc3RpYnVsdW0uIEhlbmRyZXJpdCBudWxsYSBjb25zZWN0ZXR1ZXIgdHJpc3RpcXVlIGFudGUgbGVvLCB1bGxhbWNvcnBlciBjdXJzdXMgcnV0cnVtIDwvcD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBBYm91dERvY3RvclxuIiwiaW1wb3J0IEFib3V0RG9jdG9yIGZyb20gJy4vQWJvdXREb2N0b3IuanMnXG5cbmV4cG9ydCBkZWZhdWx0IEFib3V0RG9jdG9yIiwiaW1wb3J0IERvY3RvclByb2ZpbGVWaWV3IGZyb20gJy4vRG9jdG9yUHJvZmlsZVZpZXcuanMnXG5cbmV4cG9ydCBkZWZhdWx0IERvY3RvclByb2ZpbGVWaWV3IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cbmltcG9ydCBFeHBhbnNpb25QYW5lbCwge1xuICAgIEV4cGFuc2lvblBhbmVsU3VtbWFyeSxcbiAgICBFeHBhbnNpb25QYW5lbERldGFpbHMsXG59IGZyb20gJ21hdGVyaWFsLXVpL0V4cGFuc2lvblBhbmVsJztcbmltcG9ydCBFeHBhbmRNb3JlSWNvbiBmcm9tICdtYXRlcmlhbC11aS1pY29ucy9FeHBhbmRNb3JlJztcblxuY2xhc3MgUHJvZmVzc2lvbmFsR3JhcGggZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInByb2Zlc3Npb25hbEdyYXBoXCI+XG4gICAgICAgICAgICAgICAgPGg1PlByb2Zlc3Npb25hbCBHcmFwaDwvaDU+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJlcGFuZWxcIj5cbiAgICAgICAgICAgICAgICAgICAgPEV4cGFuc2lvblBhbmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgPEV4cGFuc2lvblBhbmVsU3VtbWFyeSBleHBhbmRJY29uPXs8RXhwYW5kTW9yZUljb24gLz59PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEVkdWNhdGlvblxuICAgICAgICAgICAgICAgICAgICAgICAgPC9FeHBhbnNpb25QYW5lbFN1bW1hcnk+XG4gICAgICAgICAgICAgICAgICAgICAgICA8RXhwYW5zaW9uUGFuZWxEZXRhaWxzPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9FeHBhbnNpb25QYW5lbERldGFpbHM+XG4gICAgICAgICAgICAgICAgICAgIDwvRXhwYW5zaW9uUGFuZWw+XG4gICAgICAgICAgICAgICAgICAgIDxFeHBhbnNpb25QYW5lbD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxFeHBhbnNpb25QYW5lbFN1bW1hcnkgZXhwYW5kSWNvbj17PEV4cGFuZE1vcmVJY29uIC8+fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBNZW1iZXJzaGlwc1xuICAgICAgICAgICAgICAgICAgICAgICAgPC9FeHBhbnNpb25QYW5lbFN1bW1hcnk+XG4gICAgICAgICAgICAgICAgICAgICAgICA8RXhwYW5zaW9uUGFuZWxEZXRhaWxzPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9FeHBhbnNpb25QYW5lbERldGFpbHM+XG4gICAgICAgICAgICAgICAgICAgIDwvRXhwYW5zaW9uUGFuZWw+XG4gICAgICAgICAgICAgICAgICAgIDxFeHBhbnNpb25QYW5lbD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxFeHBhbnNpb25QYW5lbFN1bW1hcnkgZXhwYW5kSWNvbj17PEV4cGFuZE1vcmVJY29uIC8+fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBFeHBlcmllbmNlXG4gICAgICAgICAgICAgICAgICAgICAgICA8L0V4cGFuc2lvblBhbmVsU3VtbWFyeT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxFeHBhbnNpb25QYW5lbERldGFpbHM+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L0V4cGFuc2lvblBhbmVsRGV0YWlscz5cbiAgICAgICAgICAgICAgICAgICAgPC9FeHBhbnNpb25QYW5lbD5cbiAgICAgICAgICAgICAgICAgICAgPEV4cGFuc2lvblBhbmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgPEV4cGFuc2lvblBhbmVsU3VtbWFyeSBleHBhbmRJY29uPXs8RXhwYW5kTW9yZUljb24gLz59PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFNwZWNpYWxpemF0aW9uc1xuICAgICAgICAgICAgICAgICAgICAgICAgPC9FeHBhbnNpb25QYW5lbFN1bW1hcnk+XG4gICAgICAgICAgICAgICAgICAgICAgICA8RXhwYW5zaW9uUGFuZWxEZXRhaWxzPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9FeHBhbnNpb25QYW5lbERldGFpbHM+XG4gICAgICAgICAgICAgICAgICAgIDwvRXhwYW5zaW9uUGFuZWw+XG4gICAgICAgICAgICAgICAgICAgIDxFeHBhbnNpb25QYW5lbD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxFeHBhbnNpb25QYW5lbFN1bW1hcnkgZXhwYW5kSWNvbj17PEV4cGFuZE1vcmVJY29uIC8+fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBBd2FyZHNcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvRXhwYW5zaW9uUGFuZWxTdW1tYXJ5PlxuICAgICAgICAgICAgICAgICAgICAgICAgPEV4cGFuc2lvblBhbmVsRGV0YWlscz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvRXhwYW5zaW9uUGFuZWxEZXRhaWxzPlxuICAgICAgICAgICAgICAgICAgICA8L0V4cGFuc2lvblBhbmVsPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IFByb2Zlc3Npb25hbEdyYXBoXG4iLCJpbXBvcnQgUHJvZmVzc2lvbmFsR3JhcGggZnJvbSAnLi9Qcm9mZXNzaW9uYWxHcmFwaC5qcydcblxuZXhwb3J0IGRlZmF1bHQgUHJvZmVzc2lvbmFsR3JhcGgiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCBheGlvcyBmcm9tICdheGlvcydcblxuY2xhc3MgTG9jYXRpb25TZWFyY2ggZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgc2VhcmNoOiBcIlwiLFxuICAgICAgICAgICAgc2VhcmNoUmVzdWx0czogW11cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldExvY2F0aW9uKGxvY2F0aW9uKSB7XG4gICAgICAgIHZhciBhdXRvID0gbmV3IGdvb2dsZS5tYXBzLnBsYWNlcy5BdXRvY29tcGxldGVTZXJ2aWNlKClcblxuICAgICAgICB2YXIgcmVxdWVzdCA9IHtcbiAgICAgICAgICAgIGlucHV0OiBsb2NhdGlvbixcbiAgICAgICAgICAgIHR5cGVzOiBbJ2dlb2NvZGUnXSxcbiAgICAgICAgICAgIGNvbXBvbmVudFJlc3RyaWN0aW9uczogeyBjb3VudHJ5OiAnaW4nIH1cbiAgICAgICAgfTtcbiAgICAgICAgaWYgKGxvY2F0aW9uKSB7XG4gICAgICAgICAgICBhdXRvLmdldFBsYWNlUHJlZGljdGlvbnMocmVxdWVzdCwgZnVuY3Rpb24gKHJlc3VsdHMsIHN0YXR1cykge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBzZWFyY2hSZXN1bHRzOiByZXN1bHRzIH0pXG4gICAgICAgICAgICB9LmJpbmQodGhpcykpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpbnB1dEhhbmRsZXIoZSkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIHNlYXJjaDogZS50YXJnZXQudmFsdWVcbiAgICAgICAgfSlcbiAgICAgICAgdGhpcy5nZXRMb2NhdGlvbihlLnRhcmdldC52YWx1ZSlcblxuICAgIH1cblxuICAgIHNlbGVjdExvY2F0aW9uKGxvY2F0aW9uKSB7XG4gICAgICAgIGxldCBtYXAgPSBuZXcgZ29vZ2xlLm1hcHMuTWFwKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYXAnKSwge1xuICAgICAgICAgICAgY2VudGVyOiB7IGxhdDogLTMzLjg2NywgbG5nOiAxNTEuMTk1IH0sXG4gICAgICAgICAgICB6b29tOiAxNVxuICAgICAgICB9KVxuICAgICAgICBsZXQgc2VydmljZSA9IG5ldyBnb29nbGUubWFwcy5wbGFjZXMuUGxhY2VzU2VydmljZShtYXApO1xuICAgICAgICBzZXJ2aWNlLmdldERldGFpbHMoe1xuICAgICAgICAgICAgcmVmZXJlbmNlOiBsb2NhdGlvbi5yZWZlcmVuY2VcbiAgICAgICAgfSwgZnVuY3Rpb24gKHBsYWNlLCBzdGF0dXMpIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMuc2VsZWN0TG9jYXRpb24ocGxhY2UpXG4gICAgICAgICAgICB0aGlzLnByb3BzLmhpc3RvcnkuZ28oLTEpXG5cbiAgICAgICAgfS5iaW5kKHRoaXMpKVxuICAgIH1cblxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgICBsZXQgaW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndG9wTG9jYXRpb25TZWFyY2gnKVxuICAgICAgICBpbnB1dC5mb2N1cygpXG4gICAgfVxuXG4gICAgc3RhdGljIGNvbnRleHRUeXBlcyA9IHtcbiAgICAgICAgcm91dGVyOiAoKSA9PiBudWxsXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIDxoZWFkZXIgY2xhc3NOYW1lPVwic2tpbi13aGl0ZSBmaXhlZCBob3Jpem9udGFsIHRvcCBsb2NhdGlvbi1kZXRlY3QtaGVhZGVyXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGFpbmVyLWZsdWlkXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLTEyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic2VsZWN0LWxvY2F0aW9uLXJvdyB0ZXh0LWNlbnRlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuaGlzdG9yeS5nbygtMSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19IGNsYXNzTmFtZT1cImN0LWltZyBjdC1pbWctbWQgY2xvc2VcIj48aW1nIHNyYz1cIi9hc3NldHMvaW1nL2N1c3RvbWVyLWljb25zL2Nsb3NlLWJsYWNrLnN2Z1wiIGNsYXNzTmFtZT1cImltZy1mbHVpZFwiIC8+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGg0IGNsYXNzTmFtZT1cImZ3LTcwMCB0ZXh0LW1kXCI+U2VsZWN0IExvY2F0aW9uPC9oND5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtMTJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzZWFyY2gtcm93XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkb24tZ3JvdXAgbG9jYXRpb24tZGV0ZWN0LWZpZWxkXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgdmFsdWU9e3RoaXMuc3RhdGUuc2VhcmNofSBvbkNoYW5nZT17dGhpcy5pbnB1dEhhbmRsZXIuYmluZCh0aGlzKX0gY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sIGlucHV0LW1kIHNlYXJjaC1pbnB1dCBuby1zaGFkb3dcIiBwbGFjZWhvbGRlcj1cIlNlbGVjdCBhbnkgY2l0eSBvciBsb2NhbGl0eVwiIGlkPVwidG9wTG9jYXRpb25TZWFyY2hcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImN0LWltZyBjdC1pbWctc20gbWFwLW1hcmtlci1ibHVlXCI+PGltZyBzcmM9XCIvYXNzZXRzL2ltZy9jdXN0b21lci1pY29ucy9tYXAtbWFya2VyLWJsdWUuc3ZnXCIgY2xhc3NOYW1lPVwiaW1nLWZsdWlkXCIgLz48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZGV0ZWN0LW15LWxvY2FpdG9uXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiY3QtaW1nIGN0LWltZy14c1wiPjxpbWcgc3JjPVwiL2Fzc2V0cy9pbWcvY3VzdG9tZXItaWNvbnMvZ3BzLnN2Z1wiIGNsYXNzTmFtZT1cImltZy1mbHVpZFwiIC8+PC9zcGFuPkRldGVjdCBNeSBMb2NhdGlvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvaGVhZGVyPlxuICAgICAgICAgICAgICAgIDxzZWN0aW9uIGNsYXNzTmFtZT1cIndyYXAgbG9jYXRvbi1kZXRlY3Qtc2NyZWVuXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwid2lkZ2V0LXBhbmVsXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aDQgY2xhc3NOYW1lPVwicGFuZWwtdGl0bGVcIj5TZWFyY2ggUmVzdWx0PC9oND5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGFuZWwtY29udGVudCBwZC0wXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHVsIGNsYXNzTmFtZT1cImxpc3QgY2l0eS1saXN0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUuc2VhcmNoUmVzdWx0cy5tYXAoKHJlc3VsdCwgaSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiA8bGkga2V5PXtpfSBvbkNsaWNrPXt0aGlzLnNlbGVjdExvY2F0aW9uLmJpbmQodGhpcywgcmVzdWx0KX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhPntyZXN1bHQuZGVzY3JpcHRpb259XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJjaXR5LWxvY1wiPkNpdHk8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9zZWN0aW9uPlxuICAgICAgICAgICAgICAgIDxkaXYgaWQ9XCJtYXBcIiBzdHlsZT17eyBkaXNwbGF5OiAnbm9uZScgfX0+PC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgTG9jYXRpb25TZWFyY2hcbiIsImltcG9ydCBMb2NhdGlvblNlYXJjaCBmcm9tICcuL0xvY2F0aW9uU2VhcmNoLmpzJ1xuXG5cbmV4cG9ydCBkZWZhdWx0IExvY2F0aW9uU2VhcmNoIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cbmltcG9ydCBEb2N0b3JQcm9maWxlQ2FyZCBmcm9tICcuLi9jb21tb25zL2RvY3RvclByb2ZpbGVDYXJkL2luZGV4LmpzJ1xuaW1wb3J0IERldGFpbHNGb3JtIGZyb20gJy4vZGV0YWlsc0Zvcm0vaW5kZXguanMnXG5pbXBvcnQgU2VsZWN0ZWRDbGluaWMgZnJvbSAnLi4vY29tbW9ucy9zZWxlY3RlZENsaW5pYy9pbmRleC5qcydcblxuY2xhc3MgUGF0aWVudERldGFpbHMgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgc2VsZWN0ZWREb2N0b3I6IG51bGwsXG4gICAgICAgICAgICBzZWxlY3RlZENsaW5pYzogbnVsbCxcbiAgICAgICAgICAgIHNlbGVjdGVkU2xvdDogbnVsbFxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJvY2VlZCgpe1xuICAgICAgICB0aGlzLmNvbnRleHQucm91dGVyLmhpc3RvcnkucHVzaCgnL3BheW1lbnQnKVxuICAgIH1cblxuICAgIGdldExvY2F0aW9uUGFyYW0odGFnKSB7XG4gICAgICAgIC8vIHRoaXMgQVBJIGFzc3VtZXMgdGhlIGNvbnRleHQgb2YgcmVhY3Qtcm91dGVyLTRcbiAgICAgICAgY29uc3QgcGFyYW1TdHJpbmcgPSB0aGlzLnByb3BzLmxvY2F0aW9uLnNlYXJjaFxuICAgICAgICBjb25zdCBwYXJhbXMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKHBhcmFtU3RyaW5nKVxuICAgICAgICByZXR1cm4gcGFyYW1zLmdldCh0YWcpXG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBsZXQgZG9jdG9ySWQgPSB0aGlzLnByb3BzLm1hdGNoLnBhcmFtcy5pZFxuICAgICAgICAgICAgbGV0IGNsaW5pY0lkID0gdGhpcy5wcm9wcy5tYXRjaC5wYXJhbXMuY2xpbmljSWRcbiAgICAgICAgICAgIGxldCBzZWxlY3RlZFNsb3QgPSB0aGlzLmdldExvY2F0aW9uUGFyYW0oJ3QnKVxuICAgICAgICAgICAgc2VsZWN0ZWRTbG90ID0gbmV3IERhdGUocGFyc2VGbG9hdChzZWxlY3RlZFNsb3QpKVxuICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAoZG9jdG9ySWQgJiYgY2xpbmljSWQgJiYgc2VsZWN0ZWRTbG90KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkRG9jdG9yOiBkb2N0b3JJZCxcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRDbGluaWM6IGNsaW5pY0lkLFxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZFNsb3Q6IHNlbGVjdGVkU2xvdC50b1N0cmluZygpXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB0aGlzLnByb3BzLmdldERvY3RvckJ5SWQoZG9jdG9ySWQpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcblxuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhdGljIGNvbnRleHRUeXBlcyA9IHtcbiAgICAgICAgcm91dGVyOiAoKSA9PiBudWxsXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBhdGllbnREZXRhaWxzXCI+XG5cbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuRE9DVE9SU1t0aGlzLnN0YXRlLnNlbGVjdGVkRG9jdG9yXSA/XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxEb2N0b3JQcm9maWxlQ2FyZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoaWRlQm90dG9tPXt0cnVlfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoaWRlQm9va05vdz17dHJ1ZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGV0YWlscz17dGhpcy5wcm9wcy5ET0NUT1JTW3RoaXMuc3RhdGUuc2VsZWN0ZWREb2N0b3JdfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPFNlbGVjdGVkQ2xpbmljXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkRG9jdG9yPXt0aGlzLnByb3BzLkRPQ1RPUlNbdGhpcy5zdGF0ZS5zZWxlY3RlZERvY3Rvcl19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkQ2xpbmljPXt0aGlzLnN0YXRlLnNlbGVjdGVkQ2xpbmljfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzZWxlY3RlZEFwcG9pbnRtZW50U2xvdFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDU+U2VsZWN0ZWQgQXBwb2ludG1lbnQgU2xvdDwvaDU+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImFwcGRhdGVcIj5BcHBvaW50bWVudCBEYXRlPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJkYXRlXCI+eyB0aGlzLnN0YXRlLnNlbGVjdGVkU2xvdCB9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxEZXRhaWxzRm9ybSAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwicHJvY2VlZGJ0blwiIG9uQ2xpY2s9e3RoaXMucHJvY2VlZC5iaW5kKHRoaXMpfT5Db25maXJtIEJvb2tpbmc8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PiA6IFwiXCJcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBQYXRpZW50RGV0YWlsc1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cbmNsYXNzIERldGFpbHNGb3JtIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIHBhdGllbnROYW1lIDogJycsXG4gICAgICAgICAgICBwYXRpZW50RW1haWwgOiAnJyxcbiAgICAgICAgICAgIHBhdGllbnRHZW5kZXIgOiAnbWFsZScsXG4gICAgICAgICAgICBwYXRpZW50TW9iaWxlIDogJycsXG4gICAgICAgICAgICBvdHAgOicnXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpbnB1dEhhbmRsZXIod2hpY2gsIGUpe1xuICAgICAgICB0aGlzLnNldFN0YXRlKHsgW3doaWNoXSA6IGUudGFyZ2V0LnZhbHVlIH0pXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImRldGFpbHNGb3JtXCI+XG4gICAgICAgICAgICAgICAgPGg1PlBsZWFzZSBwcm92aWRlIHBhdGllbnQgZGV0YWlsczwvaDU+XG5cbiAgICAgICAgICAgICAgICA8aW5wdXQgdmFsdWU9e3RoaXMuc3RhdGUucGF0aWVudE5hbWV9IG9uQ2hhbmdlPXt0aGlzLmlucHV0SGFuZGxlci5iaW5kKHRoaXMsJ3BhdGllbnROYW1lJyl9IGNsYXNzTmFtZT1cInB0bmFtZVwiIHBsYWNlaG9sZGVyPVwiUGF0aWVudCBOYW1lKlwiIC8+XG4gICAgICAgICAgICAgICAgPGlucHV0IHZhbHVlPXt0aGlzLnN0YXRlLnBhdGllbnRFbWFpbH0gb25DaGFuZ2U9e3RoaXMuaW5wdXRIYW5kbGVyLmJpbmQodGhpcywncGF0aWVudEVtYWlsJyl9IGNsYXNzTmFtZT1cInB0ZW1haWxcIiBwbGFjZWhvbGRlcj1cIkVtYWlsKlwiIC8+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwdGdlbmRlclwiPlxuICAgICAgICAgICAgICAgICAgICA8c3Bhbj5HZW5kZXIgOjwvc3Bhbj4gXG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwicmFkaW9cIiBuYW1lPVwiZ2VuZGVyXCIgdmFsdWU9XCJtYWxlXCIgY2hlY2tlZD17dGhpcy5zdGF0ZS5wYXRpZW50R2VuZGVyID09PSBcIm1hbGVcIn0gb25DaGFuZ2U9e3RoaXMuaW5wdXRIYW5kbGVyLmJpbmQodGhpcywncGF0aWVudEdlbmRlcicpfS8+IE1hbGVcbiAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJyYWRpb1wiIG5hbWU9XCJnZW5kZXJcIiB2YWx1ZT1cImZlbWFsZVwiIGNoZWNrZWQ9e3RoaXMuc3RhdGUucGF0aWVudEdlbmRlciA9PT0gXCJmZW1hbGVcIn0gb25DaGFuZ2U9e3RoaXMuaW5wdXRIYW5kbGVyLmJpbmQodGhpcywncGF0aWVudEdlbmRlcicpfS8+IEZlbWFsZVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxpbnB1dCB2YWx1ZT17dGhpcy5zdGF0ZS5wYXRpZW50TW9iaWxlfSBvbkNoYW5nZT17dGhpcy5pbnB1dEhhbmRsZXIuYmluZCh0aGlzLCdwYXRpZW50TW9iaWxlJyl9IGNsYXNzTmFtZT1cInB0bW9iaWxlXCIgcGxhY2Vob2xkZXI9XCJNb2JpbGUqXCIgLz5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cIm90cGJ0blwiPihSZSlTZW5kIE9UUDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDxpbnB1dCB2YWx1ZT17dGhpcy5zdGF0ZS5vdHB9IG9uQ2hhbmdlPXt0aGlzLmlucHV0SGFuZGxlci5iaW5kKHRoaXMsJ290cCcpfSBjbGFzc05hbWU9XCJwdG90cFwiIHBsYWNlaG9sZGVyPVwiRW50ZXIgT1RQKlwiIC8+XG5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBEZXRhaWxzRm9ybVxuIiwiaW1wb3J0IERldGFpbHNGb3JtIGZyb20gJy4vRGV0YWlsc0Zvcm0uanMnXG5cbmV4cG9ydCBkZWZhdWx0IERldGFpbHNGb3JtIiwiaW1wb3J0IFBhdGllbnREZXRhaWxzIGZyb20gJy4vUGF0aWVudERldGFpbHMuanMnXG5cbmV4cG9ydCBkZWZhdWx0IFBhdGllbnREZXRhaWxzIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IFBheW1lbnRJY29uIGZyb20gJ21hdGVyaWFsLXVpLWljb25zL1BheW1lbnQnO1xuaW1wb3J0IENhc2hJY29uIGZyb20gJ21hdGVyaWFsLXVpLWljb25zL0F0dGFjaE1vbmV5JztcblxuY2xhc3MgUGF5bWVudFZpZXcgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgIH1cblxuICAgIHByb2NlZWQoKXtcbiAgICAgICAgdGhpcy5jb250ZXh0LnJvdXRlci5oaXN0b3J5LnB1c2goXCIvYm9va2luZy86cmVmSWRcIilcbiAgICB9XG5cbiAgICBzdGF0aWMgY29udGV4dFR5cGVzID0ge1xuICAgICAgICByb3V0ZXI6ICgpID0+IG51bGxcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGF5bWVudFwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwib2ZmZXJSb3dcIj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4+R2V0IDEwJSBjYXNoYmFjayBmb3IgYWxsIG9ubGluZSBwYXltZW50LCBUJkM8L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwYXltZW50Um93XCIgb25DbGljaz17dGhpcy5wcm9jZWVkLmJpbmQodGhpcyl9PlxuICAgICAgICAgICAgICAgICAgICA8UGF5bWVudEljb24gY2xhc3NOYW1lPVwicGF5bWVudEljb25cIiAvPlxuICAgICAgICAgICAgICAgICAgICA8c3Bhbj5QYXl0bSBXYWxsZXQ8L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwYXltZW50Um93XCIgb25DbGljaz17dGhpcy5wcm9jZWVkLmJpbmQodGhpcyl9PlxuICAgICAgICAgICAgICAgICAgICA8UGF5bWVudEljb24gY2xhc3NOYW1lPVwicGF5bWVudEljb25cIiAvPlxuICAgICAgICAgICAgICAgICAgICA8c3Bhbj5DcmVkaXQvRGViaXQvQVRNIENhcmQ8L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwYXltZW50Um93XCIgb25DbGljaz17dGhpcy5wcm9jZWVkLmJpbmQodGhpcyl9PlxuICAgICAgICAgICAgICAgICAgICA8UGF5bWVudEljb24gY2xhc3NOYW1lPVwicGF5bWVudEljb25cIiAvPlxuICAgICAgICAgICAgICAgICAgICA8c3Bhbj5OZXQgQmFua2luZzwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBheW1lbnRSb3dcIiBvbkNsaWNrPXt0aGlzLnByb2NlZWQuYmluZCh0aGlzKX0+XG4gICAgICAgICAgICAgICAgICAgIDxDYXNoSWNvbiBjbGFzc05hbWU9XCJwYXltZW50SWNvblwiIC8+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuPlBheSBpbiBDYXNoPC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGF5bWVudFJvd1wiIG9uQ2xpY2s9e3RoaXMucHJvY2VlZC5iaW5kKHRoaXMpfT5cbiAgICAgICAgICAgICAgICAgICAgPFBheW1lbnRJY29uIGNsYXNzTmFtZT1cInBheW1lbnRJY29uXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4+T25Eb2MgUGF5PC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IFBheW1lbnRWaWV3XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcblxuaW1wb3J0IENvbW1vbmx5U2VhcmNoZWQgZnJvbSAnLi4vY29tbW9ucy9jb21tb25seVNlYXJjaGVkL2luZGV4LmpzJ1xuLy8gaW1wb3J0IExvY2F0aW9uU2VsZWN0b3IgZnJvbSAnLi4vLi4vY29tbW9ucy9sb2NhdGlvblNlbGVjdG9yL2luZGV4LmpzJ1xuaW1wb3J0IENyaXRlcmlhU2VsZWN0b3IgZnJvbSAnLi4vY29tbW9ucy9jcml0ZXJpYVNlbGVjdG9yL2luZGV4LmpzJ1xuXG5jbGFzcyBTZWFyY2hDcml0ZXJpYVZpZXcgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgIH1cblxuICAgIGNvbXBvbmVudERpZE1vdW50KCl7XG4gICAgICAgIHRoaXMucHJvcHMubG9hZFNlYXJjaENyaXRlcmlhKClcbiAgICB9XG5cbiAgICBzZWFyY2hQcm9jZWVkKCl7XG4gICAgICAgIC8vIGxldCBzZWFyY2hEYXRhID0ge1xuICAgICAgICAvLyAgICAgc2VsZWN0ZWRTcGVjaWFsaXRpZXMgOiB0aGlzLnByb3BzLnNlbGVjdGVkU3BlY2lhbGl0aWVzLFxuICAgICAgICAvLyAgICAgc2VsZWN0ZWRDb25kaXRpb25zIDogdGhpcy5wcm9wcy5zZWxlY3RlZENvbmRpdGlvbnMsXG4gICAgICAgIC8vICAgICBzZWxlY3RlZExvY2F0aW9uIDogdGhpcy5wcm9wcy5zZWxlY3RlZExvY2F0aW9uLFxuICAgICAgICAvLyAgICAgc2VsZWN0ZWRDcml0ZXJpYSA6IHRoaXMucHJvcHMuc2VsZWN0ZWRDcml0ZXJpYVxuICAgICAgICAvLyB9XG4gICAgICAgIC8vIHNlYXJjaERhdGEgPSBlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc2VhcmNoRGF0YSkpXG4gICAgICAgIHRoaXMuY29udGV4dC5yb3V0ZXIuaGlzdG9yeS5wdXNoKGAvc2VhcmNocmVzdWx0c2ApXG4gICAgfVxuXG4gICAgc3RhdGljIGNvbnRleHRUeXBlcyA9IHtcbiAgICAgICAgcm91dGVyOiAoKSA9PiBudWxsXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNlYXJjaENyaXRlcmlhXCI+XG4gICAgICAgICAgICAgICAgPExvY2F0aW9uU2VsZWN0b3JcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRMb2NhdGlvbj17dGhpcy5wcm9wcy5zZWxlY3RlZExvY2F0aW9ufVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPENyaXRlcmlhU2VsZWN0b3IgXG4gICAgICAgICAgICAgICAgICAgIGNvbW1vbmx5U2VhcmNoZWRDb25kaXRpb25zPXt0aGlzLnByb3BzLmNvbW1vbmx5U2VhcmNoZWRDb25kaXRpb25zfVxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZENvbmRpdGlvbnM9e3RoaXMucHJvcHMuc2VsZWN0ZWRDb25kaXRpb25zfVxuICAgICAgICAgICAgICAgICAgICBjb21tb25seVNlYXJjaGVkU3BlY2lhbGl0aWVzPXt0aGlzLnByb3BzLmNvbW1vbmx5U2VhcmNoZWRTcGVjaWFsaXRpZXN9XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkU3BlY2lhbGl0aWVzPXt0aGlzLnByb3BzLnNlbGVjdGVkU3BlY2lhbGl0aWVzfVxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZENyaXRlcmlhPXt0aGlzLnByb3BzLnNlbGVjdGVkQ3JpdGVyaWF9XG4gICAgICAgICAgICAgICAgICAgIHRvZ2dsZUNvbmRpdGlvbj17dGhpcy5wcm9wcy50b2dnbGVDb25kaXRpb24uYmluZCh0aGlzKX1cbiAgICAgICAgICAgICAgICAgICAgdG9nZ2xlU3BlY2lhbGl0eT17dGhpcy5wcm9wcy50b2dnbGVTcGVjaWFsaXR5LmJpbmQodGhpcyl9XG4gICAgICAgICAgICAgICAgICAgIHRvZ2dsZUNyaXRlcmlhPXt0aGlzLnByb3BzLnRvZ2dsZUNyaXRlcmlhLmJpbmQodGhpcyl9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8Q29tbW9ubHlTZWFyY2hlZFxuICAgICAgICAgICAgICAgICAgICBoZWFkaW5nPVwiQ29tbW9ubHkgc2VhcmNoZWQgY29uZGl0aW9uc1wiXG4gICAgICAgICAgICAgICAgICAgIGRhdGE9e3RoaXMucHJvcHMuY29tbW9ubHlTZWFyY2hlZENvbmRpdGlvbnN9XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkPXt0aGlzLnByb3BzLnNlbGVjdGVkQ29uZGl0aW9uc31cbiAgICAgICAgICAgICAgICAgICAgdG9nZ2xlUGlsbD17dGhpcy5wcm9wcy50b2dnbGVDb25kaXRpb24uYmluZCh0aGlzKX1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDxDb21tb25seVNlYXJjaGVkXG4gICAgICAgICAgICAgICAgICAgIGhlYWRpbmc9XCJDb21tb25seSBzZWFyY2hlZCBzcGVjaWFsaXRpZXNcIlxuICAgICAgICAgICAgICAgICAgICBkYXRhPXt0aGlzLnByb3BzLmNvbW1vbmx5U2VhcmNoZWRTcGVjaWFsaXRpZXN9XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkPXt0aGlzLnByb3BzLnNlbGVjdGVkU3BlY2lhbGl0aWVzfVxuICAgICAgICAgICAgICAgICAgICB0b2dnbGVQaWxsPXt0aGlzLnByb3BzLnRvZ2dsZVNwZWNpYWxpdHkuYmluZCh0aGlzKX1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDxidXR0b24gb25DbGljaz17dGhpcy5zZWFyY2hQcm9jZWVkLmJpbmQodGhpcyl9IGNsYXNzTmFtZT1cInByb2NlZWRCdG5cIj4gUHJvY2VlZCA8L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgU2VhcmNoQ3JpdGVyaWFWaWV3XG4iLCJpbXBvcnQgU2VhcmNoQ3JpdGVyaWFWaWV3IGZyb20gJy4vU2VhcmNoQ3JpdGVyaWFWaWV3LmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBTZWFyY2hDcml0ZXJpYVZpZXciLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgRG9jdG9yc0xpc3QgZnJvbSAnLi4vc2VhcmNoUmVzdWx0cy9kb2N0b3JzTGlzdC9pbmRleC5qcydcbmltcG9ydCBUb3BCYXIgZnJvbSAnLi4vc2VhcmNoUmVzdWx0cy90b3BCYXIvaW5kZXguanMnXG5cblxuY2xhc3MgU2VhcmNoUmVzdWx0c1ZpZXcgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgICAgICB0aGlzLnN0YXRlID0ge1xuXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgbGV0IHtcbiAgICAgICAgICAgIHNlbGVjdGVkQ29uZGl0aW9ucyxcbiAgICAgICAgICAgIHNlbGVjdGVkU3BlY2lhbGl0aWVzLFxuICAgICAgICAgICAgc2VsZWN0ZWRMb2NhdGlvbixcbiAgICAgICAgICAgIHNlbGVjdGVkQ3JpdGVyaWEsXG4gICAgICAgICAgICBDUklURVJJQV9MT0FERURcbiAgICAgICAgfSA9IHRoaXMucHJvcHNcblxuICAgICAgICBpZiAoQ1JJVEVSSUFfTE9BREVEKSB7XG4gICAgICAgICAgICBsZXQgc2VhcmNoU3RhdGUgPSB7XG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRDb25kaXRpb25zLFxuICAgICAgICAgICAgICAgIHNlbGVjdGVkU3BlY2lhbGl0aWVzLFxuICAgICAgICAgICAgICAgIHNlbGVjdGVkTG9jYXRpb24sXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRDcml0ZXJpYVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV0IGZpbHRlclN0YXRlID0gdGhpcy5wcm9wcy5maWx0ZXJDcml0ZXJpYVxuICAgICAgICAgICAgdGhpcy5nZXREb2N0b3JMaXN0KHNlYXJjaFN0YXRlLCBmaWx0ZXJTdGF0ZSwgZmFsc2UpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGxldCBzZWFyY2hTdGF0ZSA9IHRoaXMuZ2V0TG9jYXRpb25QYXJhbSgnc2VhcmNoJylcbiAgICAgICAgICAgICAgICBsZXQgZmlsdGVyU3RhdGUgPSB0aGlzLmdldExvY2F0aW9uUGFyYW0oJ2ZpbHRlcicpXG4gICAgICAgICAgICAgICAgaWYgKGZpbHRlclN0YXRlKSB7XG4gICAgICAgICAgICAgICAgICAgIGZpbHRlclN0YXRlID0gSlNPTi5wYXJzZShmaWx0ZXJTdGF0ZSlcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBmaWx0ZXJTdGF0ZSA9IHt9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHNlYXJjaFN0YXRlID0gSlNPTi5wYXJzZShzZWFyY2hTdGF0ZSlcbiAgICAgICAgICAgICAgICB0aGlzLmdldERvY3Rvckxpc3Qoc2VhcmNoU3RhdGUsIGZpbHRlclN0YXRlLCB0cnVlKVxuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgZ2V0TG9jYXRpb25QYXJhbSh0YWcpIHtcbiAgICAgICAgLy8gdGhpcyBBUEkgYXNzdW1lcyB0aGUgY29udGV4dCBvZiByZWFjdC1yb3V0ZXItNFxuICAgICAgICBjb25zdCBwYXJhbVN0cmluZyA9IHRoaXMucHJvcHMubG9jYXRpb24uc2VhcmNoXG4gICAgICAgIGNvbnN0IHBhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXMocGFyYW1TdHJpbmcpXG4gICAgICAgIHJldHVybiBwYXJhbXMuZ2V0KHRhZylcbiAgICB9XG5cbiAgICBnZXREb2N0b3JMaXN0KHNlYXJjaFN0YXRlLCBmaWx0ZXJTdGF0ZSwgbWVyZ2VTdGF0ZSkge1xuICAgICAgICB0aGlzLnByb3BzLmdldERvY3RvcnMoc2VhcmNoU3RhdGUsIGZpbHRlclN0YXRlLCBtZXJnZVN0YXRlKTtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNlYXJjaFJlc3VsdHNcIj5cbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuTE9BRElORyA/IFwiXCIgOlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8VG9wQmFyIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPERvY3RvcnNMaXN0IHsuLi50aGlzLnByb3BzfSAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBTZWFyY2hSZXN1bHRzVmlld1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cbmltcG9ydCBFbW90aUljb24gZnJvbSAnbWF0ZXJpYWwtdWktaWNvbnMvQWNjb3VudENpcmNsZSc7XG5pbXBvcnQgSG9tZUljb24gZnJvbSAnbWF0ZXJpYWwtdWktaWNvbnMvSG9tZSc7XG5pbXBvcnQgQ2xvY2tJY29uIGZyb20gJ21hdGVyaWFsLXVpLWljb25zL0F2VGltZXInO1xuaW1wb3J0IExvY2F0aW9uc0ljb24gZnJvbSAnbWF0ZXJpYWwtdWktaWNvbnMvTG9jYXRpb25Pbic7XG5cbmltcG9ydCBEb2N0b3JQcm9maWxlQ2FyZCBmcm9tICcuLi8uLi9jb21tb25zL2RvY3RvclByb2ZpbGVDYXJkL2luZGV4LmpzJ1xuaW1wb3J0IEluZmluaXRlU2Nyb2xsIGZyb20gJ3JlYWN0LWluZmluaXRlLXNjcm9sbGVyJztcbmNsYXNzIERvY3RvcnNMaXN0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICB9XG5cbiAgICBzdGF0aWMgY29udGV4dFR5cGVzID0ge1xuICAgICAgICByb3V0ZXI6ICgpID0+IG51bGxcbiAgICB9XG5cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICBsZXQgeyBET0NUT1JTLCBkb2N0b3JMaXN0IH0gPSB0aGlzLnByb3BzXG4gICAgICAgIFxuICAgICAgICB2YXIgZG9jdG9yVmlld0xpc3QgPSBbXTtcblxuICAgICAgICBkb2N0b3JWaWV3TGlzdCA9IGRvY3Rvckxpc3QubWFwKChkb2NJZCwgaSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIDxEb2N0b3JQcm9maWxlQ2FyZCBkZXRhaWxzPXtET0NUT1JTW2RvY0lkXX0gc2VsZWN0RG9jdG9yPXt0aGlzLnByb3BzLnNlbGVjdERvY3Rvcn0ga2V5PXtpfSAvPlxuICAgICAgICB9KVxuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImRvY3RvcnNMaXN0XCI+XG4gICAgICAgICAgICAgICAgey8qIDxJbmZpbml0ZVNjcm9sbFxuICAgICAgICAgICAgICAgICAgICBwYWdlU3RhcnQ9ezB9XG4gICAgICAgICAgICAgICAgICAgIGxvYWRNb3JlPXt0aGlzLnByb3BzLmdldERvY3RvcnN9XG4gICAgICAgICAgICAgICAgICAgIGhhc01vcmU9e2ZhbHNlfVxuICAgICAgICAgICAgICAgICAgICBsb2FkZXI9ezxkaXYgY2xhc3NOYW1lPVwibG9hZGVyXCIga2V5PXswfT5Mb2FkaW5nIC4uLjwvZGl2Pn1cbiAgICAgICAgICAgICAgICA+ICovfVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICB7ZG9jdG9yVmlld0xpc3R9XG5cbiAgICAgICAgICAgICAgICB7LyogPC9JbmZpbml0ZVNjcm9sbD4gKi99XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgRG9jdG9yc0xpc3RcbiIsImltcG9ydCBEb2N0b3JMaXN0IGZyb20gJy4vRG9jdG9yc0xpc3QuanMnXG5cbmV4cG9ydCBkZWZhdWx0IERvY3Rvckxpc3QiLCJpbXBvcnQgU2VhcmNoUmVzdWx0c1ZpZXcgZnJvbSAnLi9TZWFyY2hSZXN1bHRzVmlldy5qcydcblxuZXhwb3J0IGRlZmF1bHQgU2VhcmNoUmVzdWx0c1ZpZXciLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcblxuaW1wb3J0IFNvcnRJY29uIGZyb20gJ21hdGVyaWFsLXVpLWljb25zL1NvcnQnO1xuaW1wb3J0IEZpbHRlckljb24gZnJvbSAnbWF0ZXJpYWwtdWktaWNvbnMvRmlsdGVyTGlzdCc7XG5pbXBvcnQgTWVudSwgeyBNZW51SXRlbSB9IGZyb20gJ21hdGVyaWFsLXVpL01lbnUnO1xuXG5jbGFzcyBUb3BCYXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgYW5jaG9yRWw6IG51bGwsXG4gICAgICAgICAgICBzZWFyY2hSZXN1bHRzIDogdHJ1ZVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlT3BlbihldmVudCkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHsgYW5jaG9yRWw6IGV2ZW50LmN1cnJlbnRUYXJnZXQgfSlcbiAgICB9XG5cbiAgICBoYW5kbGVDbG9zZSgpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGFuY2hvckVsOiBudWxsIH0pXG4gICAgfVxuXG4gICAgc3RhdGljIGNvbnRleHRUeXBlcyA9IHtcbiAgICAgICAgcm91dGVyOiAoKSA9PiBudWxsXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRvcEJhclwiPlxuICAgICAgICAgICAgICAgIDxTb3J0SWNvbiBjbGFzc05hbWU9XCJpY29uc29ydGZpbHRlclwiIG9uQ2xpY2s9e3RoaXMuaGFuZGxlT3Blbi5iaW5kKHRoaXMpfSAvPlxuICAgICAgICAgICAgICAgIDxNZW51XG4gICAgICAgICAgICAgICAgICAgIGlkPVwic29ydC1tZW51XCJcbiAgICAgICAgICAgICAgICAgICAgYW5jaG9yRWw9e3RoaXMuc3RhdGUuYW5jaG9yRWx9XG4gICAgICAgICAgICAgICAgICAgIG9wZW49e0Jvb2xlYW4odGhpcy5zdGF0ZS5hbmNob3JFbCl9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2xvc2U9e3RoaXMuaGFuZGxlQ2xvc2UuYmluZCh0aGlzKX1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIDxNZW51SXRlbSBvbkNsaWNrPXt0aGlzLmhhbmRsZUNsb3NlLmJpbmQodGhpcyl9PlJlbGF2YW5jZTwvTWVudUl0ZW0+XG4gICAgICAgICAgICAgICAgICAgIDxNZW51SXRlbSBvbkNsaWNrPXt0aGlzLmhhbmRsZUNsb3NlLmJpbmQodGhpcyl9PkZlZTwvTWVudUl0ZW0+XG4gICAgICAgICAgICAgICAgICAgIDxNZW51SXRlbSBvbkNsaWNrPXt0aGlzLmhhbmRsZUNsb3NlLmJpbmQodGhpcyl9PkRpc3RhbmNlPC9NZW51SXRlbT5cbiAgICAgICAgICAgICAgICAgICAgPE1lbnVJdGVtIG9uQ2xpY2s9e3RoaXMuaGFuZGxlQ2xvc2UuYmluZCh0aGlzKX0+QXBvaW50bWVudDwvTWVudUl0ZW0+XG4gICAgICAgICAgICAgICAgPC9NZW51PlxuICAgICAgICAgICAgICAgIDxGaWx0ZXJJY29uIGNsYXNzTmFtZT1cImljb25zb3J0ZmlsdGVyXCIgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRleHQucm91dGVyLmhpc3RvcnkucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXRobmFtZSA6ICcvc2VhcmNocmVzdWx0cy9maWx0ZXInXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfX0gLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBUb3BCYXJcbiIsImltcG9ydCBUb3BCYXIgZnJvbSAnLi9Ub3BCYXIuanMnXG5cbmV4cG9ydCBkZWZhdWx0IFRvcEJhciIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IHsgd2l0aFJvdXRlciB9IGZyb20gXCJyZWFjdC1yb3V0ZXItZG9tXCI7XG5cbmltcG9ydCBSYWRpbywgeyBSYWRpb0dyb3VwIH0gZnJvbSAnbWF0ZXJpYWwtdWkvUmFkaW8nO1xuaW1wb3J0IENoZWNrYm94IGZyb20gJ21hdGVyaWFsLXVpL0NoZWNrYm94JztcbmltcG9ydCB7IEZvcm1MYWJlbCwgRm9ybUNvbnRyb2wsIEZvcm1Db250cm9sTGFiZWwsIEZvcm1IZWxwZXJUZXh0IH0gZnJvbSAnbWF0ZXJpYWwtdWkvRm9ybSc7XG5cblxuY2xhc3MgU2VhcmNoUmVzdWx0c0ZpbHRlciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgICBmZWVfMDogZmFsc2UsXG4gICAgICAgICAgICBmZWVfMTogZmFsc2UsXG4gICAgICAgICAgICBmZWVfMjogZmFsc2UsXG4gICAgICAgICAgICBmZWVfMzogZmFsc2UsXG4gICAgICAgICAgICBnZW5kZXI6ICdhbnknLFxuICAgICAgICAgICAgY2xpbmljX3BlcnNvbmFsOiBmYWxzZSxcbiAgICAgICAgICAgIGNsaW5pY19ob3NwaXRhbDogZmFsc2UsXG4gICAgICAgICAgICBjbGluaWNfbXVsdGk6IGZhbHNlLFxuICAgICAgICAgICAgYXZhaWxhYmxlX3RvZGF5OiBmYWxzZSxcbiAgICAgICAgICAgIGRpc3RhbmNlOiAnMzBrbSdcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHsgLi4udGhpcy5wcm9wcy5maWx0ZXJDcml0ZXJpYSB9KVxuICAgIH1cblxuICAgIGFwcGx5RmlsdGVyKCkge1xuICAgICAgICB0aGlzLnByb3BzLnNldE9QREZpbHRlcnModGhpcy5zdGF0ZSlcbiAgICAgICAgdGhpcy5wcm9wcy5oaXN0b3J5LmdvKC0xKVxuICAgIH1cblxuICAgIGhhbmRsZUNoZWNrYm94KG5hbWUsIGUpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IFtuYW1lXTogZS50YXJnZXQuY2hlY2tlZCB9KVxuICAgIH1cblxuICAgIGhhbmRsZUNoYW5nZVJhZGlvKG5hbWUsIGUpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IFtuYW1lXTogZS50YXJnZXQudmFsdWUgfSlcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic2VhcmNoUmVzdWx0c0ZpbHRlclwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3ViRmlsdGVyXCI+XG4gICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInN1YkhlYWRpbmdcIj5GZWU8L3A+XG4gICAgICAgICAgICAgICAgICAgIDxSYWRpb0dyb3VwXG4gICAgICAgICAgICAgICAgICAgICAgICBhcmlhLWxhYmVsPVwiZmVlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU9XCJmZWUxXCJcbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgPEZvcm1Db250cm9sTGFiZWwgY29udHJvbD17PENoZWNrYm94XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2tlZD17dGhpcy5zdGF0ZS5mZWVfMH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5oYW5kbGVDaGVja2JveC5iaW5kKHRoaXMsICdmZWVfMCcpfVxuICAgICAgICAgICAgICAgICAgICAgICAgLz59IGxhYmVsPVwiTGVzcyB0aGFuIDMwMFwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8Rm9ybUNvbnRyb2xMYWJlbCBjb250cm9sPXs8Q2hlY2tib3hcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGVja2VkPXt0aGlzLnN0YXRlLmZlZV8xfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUNoZWNrYm94LmJpbmQodGhpcywgJ2ZlZV8xJyl9XG4gICAgICAgICAgICAgICAgICAgICAgICAvPn0gbGFiZWw9XCIzMDAgdG8gNTAwXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxGb3JtQ29udHJvbExhYmVsIGNvbnRyb2w9ezxDaGVja2JveFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrZWQ9e3RoaXMuc3RhdGUuZmVlXzJ9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuaGFuZGxlQ2hlY2tib3guYmluZCh0aGlzLCAnZmVlXzInKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8+fSBsYWJlbD1cIjUwMCB0byAxMDAwXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxGb3JtQ29udHJvbExhYmVsIGNvbnRyb2w9ezxDaGVja2JveFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrZWQ9e3RoaXMuc3RhdGUuZmVlXzN9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuaGFuZGxlQ2hlY2tib3guYmluZCh0aGlzLCAnZmVlXzMnKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8+fSBsYWJlbD1cIjEwMDArXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgPC9SYWRpb0dyb3VwPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdWJGaWx0ZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwic3ViSGVhZGluZ1wiPkRpc3RhbmNlPC9wPlxuICAgICAgICAgICAgICAgICAgICA8UmFkaW9Hcm91cFxuICAgICAgICAgICAgICAgICAgICAgICAgYXJpYS1sYWJlbD1cIkRpc3RhbmNlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU9XCJEaXN0YW5jZTJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3RoaXMuc3RhdGUuZGlzdGFuY2V9XG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5oYW5kbGVDaGFuZ2VSYWRpby5iaW5kKHRoaXMsICdkaXN0YW5jZScpfVxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICA8Rm9ybUNvbnRyb2xMYWJlbCB2YWx1ZT1cIjMwa21cIiBjb250cm9sPXs8UmFkaW8gY29sb3I9XCJwcmltYXJ5XCIgLz59IGxhYmVsPVwiVW5kZXIgMzAgS01cIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPEZvcm1Db250cm9sTGFiZWwgdmFsdWU9XCIyMGttXCIgY29udHJvbD17PFJhZGlvIGNvbG9yPVwicHJpbWFyeVwiIC8+fSBsYWJlbD1cIlVuZGVyIDIwIEtNXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxGb3JtQ29udHJvbExhYmVsIHZhbHVlPVwiMTBrbVwiIGNvbnRyb2w9ezxSYWRpbyBjb2xvcj1cInByaW1hcnlcIiAvPn0gbGFiZWw9XCJVbmRlciAxMCBLTVwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8Rm9ybUNvbnRyb2xMYWJlbCB2YWx1ZT1cIjVrbVwiIGNvbnRyb2w9ezxSYWRpbyBjb2xvcj1cInByaW1hcnlcIiAvPn0gbGFiZWw9XCJVbmRlciA1IEtNXCIgLz5cblxuICAgICAgICAgICAgICAgICAgICA8L1JhZGlvR3JvdXA+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN1YkZpbHRlclwiPlxuICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJzdWJIZWFkaW5nXCI+VHlwZSBPZiBDbGluaWM8L3A+XG4gICAgICAgICAgICAgICAgICAgIDxSYWRpb0dyb3VwXG4gICAgICAgICAgICAgICAgICAgICAgICBhcmlhLWxhYmVsPVwiY2xpbmljVHlwZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lPVwiY2xpbmljVHlwZVwiXG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxGb3JtQ29udHJvbExhYmVsIGNvbnRyb2w9ezxDaGVja2JveFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrZWQ9e3RoaXMuc3RhdGUuY2xpbmljX3BlcnNvbmFsfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUNoZWNrYm94LmJpbmQodGhpcywgJ2NsaW5pY19wZXJzb25hbCcpfVxuICAgICAgICAgICAgICAgICAgICAgICAgLz59IGxhYmVsPVwiUGVyc29uYWxcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPEZvcm1Db250cm9sTGFiZWwgY29udHJvbD17PENoZWNrYm94XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2tlZD17dGhpcy5zdGF0ZS5jbGluaWNfaG9zcGl0YWx9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuaGFuZGxlQ2hlY2tib3guYmluZCh0aGlzLCAnY2xpbmljX2hvc3BpdGFsJyl9XG4gICAgICAgICAgICAgICAgICAgICAgICAvPn0gbGFiZWw9XCJIb3NwaXRhbFwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8Rm9ybUNvbnRyb2xMYWJlbCBjb250cm9sPXs8Q2hlY2tib3hcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGVja2VkPXt0aGlzLnN0YXRlLmNsaW5pY19tdWx0aX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5oYW5kbGVDaGVja2JveC5iaW5kKHRoaXMsICdjbGluaWNfbXVsdGknKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8+fSBsYWJlbD1cIk11bHRpLWRvY3RvciBjbGluaWNcIiAvPlxuICAgICAgICAgICAgICAgICAgICA8L1JhZGlvR3JvdXA+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN1YkZpbHRlclwiPlxuICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJzdWJIZWFkaW5nXCI+R2VuZGVyPC9wPlxuICAgICAgICAgICAgICAgICAgICA8UmFkaW9Hcm91cFxuICAgICAgICAgICAgICAgICAgICAgICAgYXJpYS1sYWJlbD1cImdlbmRlclwiXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lPVwiZ2VuZGVyMlwiXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17dGhpcy5zdGF0ZS5nZW5kZXJ9XG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5oYW5kbGVDaGFuZ2VSYWRpby5iaW5kKHRoaXMsICdnZW5kZXInKX1cbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgPEZvcm1Db250cm9sTGFiZWwgdmFsdWU9XCJhbnlcIiBjb250cm9sPXs8UmFkaW8gY29sb3I9XCJwcmltYXJ5XCIgLz59IGxhYmVsPVwiQW55XCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxGb3JtQ29udHJvbExhYmVsIHZhbHVlPVwibWFsZVwiIGNvbnRyb2w9ezxSYWRpbyBjb2xvcj1cInByaW1hcnlcIiAvPn0gbGFiZWw9XCJNYWxlXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxGb3JtQ29udHJvbExhYmVsIHZhbHVlPVwiZmVtYWxlXCIgY29udHJvbD17PFJhZGlvIGNvbG9yPVwicHJpbWFyeVwiIC8+fSBsYWJlbD1cIkZlbWFsZVwiIC8+XG5cbiAgICAgICAgICAgICAgICAgICAgPC9SYWRpb0dyb3VwPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdWJGaWx0ZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwic3ViSGVhZGluZ1wiPkF2YWlsYWJpbGl0eTwvcD5cbiAgICAgICAgICAgICAgICAgICAgPFJhZGlvR3JvdXBcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyaWEtbGFiZWw9XCJhdmFpbGFiaWxpdHlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZT1cImF2YWlsYWJpbGl0eVwiXG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxGb3JtQ29udHJvbExhYmVsIGNvbnRyb2w9ezxDaGVja2JveFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrZWQ9e3RoaXMuc3RhdGUuYXZhaWxhYmxlX3RvZGF5fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUNoZWNrYm94LmJpbmQodGhpcywgJ2F2YWlsYWJsZV90b2RheScpfVxuICAgICAgICAgICAgICAgICAgICAgICAgLz59IGxhYmVsPVwiQXZpYWxhYmxlIFRvZGF5XCIgLz5sYWJlbD1cIk11bHRpLWRvY3RvciBjbGluaWNcIiAvPlxuICAgICAgICAgICAgICAgICAgICA8L1JhZGlvR3JvdXA+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImFwcGx5RmlsdGVyXCIgb25DbGljaz17dGhpcy5hcHBseUZpbHRlci5iaW5kKHRoaXMpfT5BcHBseTwvYnV0dG9uPlxuXG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgd2l0aFJvdXRlcihTZWFyY2hSZXN1bHRzRmlsdGVyKVxuIiwiaW1wb3J0IFNlYXJjaFJlc3VsdHNGaWx0ZXIgZnJvbSAnLi9TZWFyY2hSZXN1bHRzRmlsdGVyLmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBTZWFyY2hSZXN1bHRzRmlsdGVyIiwiLy9BVVRIIEFDVElPTlNcbmV4cG9ydCBjb25zdCBTRU5EX09UUF9SRVFVRVNUID0gJ1NFTkRfT1RQX1JFUVVFU1QnXG5leHBvcnQgY29uc3QgU0VORF9PVFBfU1VDQ0VTUyA9ICdTRU5EX09UUF9TVUNDRVNTJ1xuZXhwb3J0IGNvbnN0IFNFTkRfT1RQX0ZBSUwgPSAnU0VORF9PVFBfRkFJTCdcbmV4cG9ydCBjb25zdCBTVUJNSVRfT1RQX1JFUVVFU1QgPSAnU1VCTUlUX09UUF9SRVFVRVNUJ1xuZXhwb3J0IGNvbnN0IFNVQk1JVF9PVFBfU1VDQ0VTUyA9ICdTVUJNSVRfT1RQX1NVQ0NFU1MnXG5leHBvcnQgY29uc3QgU1VCTUlUX09UUF9GQUlMID0gJ1NVQk1JVF9PVFBfRkFJTCdcblxuZXhwb3J0IGNvbnN0IEFQUEVORF9ET0NUT1JTID0gJ0FQUEVORF9ET0NUT1JTJztcbmV4cG9ydCBjb25zdCBET0NUT1JfU0VBUkNIID0gJ0RPQ1RPUl9TRUFSQ0gnO1xuZXhwb3J0IGNvbnN0IFNFTEVDVF9ET0NUT1IgPSAnU0VMRUNUX0RPQ1RPUic7XG5cbmV4cG9ydCBjb25zdCBUT0dHTEVfQ09ORElUSU9OUyA9ICdUT0dHTEVfQ09ORElUSU9OUyc7XG5leHBvcnQgY29uc3QgVE9HR0xFX1NQRUNJQUxJVElFUyA9ICdUT0dHTEVfU1BFQ0lBTElUSUVTJztcbmV4cG9ydCBjb25zdCBUT0dHTEVfVEVTVFMgPSAnVE9HR0xFX1RFU1RTJztcbmV4cG9ydCBjb25zdCBTRUxFQ1RfTE9DQVRJT04gPSAnU0VMRUNUX0xPQ0FUSU9OJztcbmV4cG9ydCBjb25zdCBNRVJHRV9TRUFSQ0hfU1RBVEVfT1BEID0gJ01FUkdFX1NFQVJDSF9TVEFURV9PUEQnO1xuZXhwb3J0IGNvbnN0IFRPR0dMRV9DUklURVJJQSA9ICdUT0dHTEVfQ1JJVEVSSUEnO1xuZXhwb3J0IGNvbnN0IFRPR0dMRV9ESUFHTk9TSVNfQ1JJVEVSSUEgPSAnVE9HR0xFX0RJQUdOT1NJU19DUklURVJJQSc7XG5leHBvcnQgY29uc3QgU0VUX09QRF9GSUxURVJTID0gJ1NFVF9PUERfRklMVEVSUydcbmV4cG9ydCBjb25zdCBTRVRfTEFCU19GSUxURVJTID0gJ1NFVF9MQUJTX0ZJTFRFUlMnXG5leHBvcnQgY29uc3QgTE9BRF9TRUFSQ0hfQ1JJVEVSSUFfT1BEID0gJ0xPQURfU0VBUkNIX0NSSVRFUklBX09QRCdcblxuZXhwb3J0IGNvbnN0IE1FUkdFX1NFQVJDSF9TVEFURV9MQUIgPSAnTUVSR0VfU0VBUkNIX1NUQVRFX0xBQic7XG5leHBvcnQgY29uc3QgTE9BRF9TRUFSQ0hfQ1JJVEVSSUFfTEFCID0gJ0xPQURfU0VBUkNIX0NSSVRFUklBX09QRCdcbmV4cG9ydCBjb25zdCBBUFBFTkRfTEFCUyA9ICdBUFBFTkRfTEFCUyc7XG5leHBvcnQgY29uc3QgTEFCX1NFQVJDSCA9ICdMQUJfU0VBUkNIJztcbmV4cG9ydCBjb25zdCBTRUxFQ1RfTE9DQVRJT05fRElBR05PU0lTID0gJ1NFTEVDVF9MT0NBVElPTl9ESUFHTk9TSVMnO1xuZXhwb3J0IGNvbnN0IEFQUEVORF9GSUxURVJTX0RJQUdOT1NJUyA9ICdBUFBFTkRfRklMVEVSU19ESUFHTk9TSVMnO1xuZXhwb3J0IGNvbnN0IExBQl9TRUFSQ0hfU1RBUlQgPSAnTEFCX1NFQVJDSF9TVEFSVCc7XG5cblxuZXhwb3J0IGNvbnN0IEFQUEVORF9VU0VSX1BST0ZJTEVTID0gJ0FQUEVORF9VU0VSX1BST0ZJTEVTJztcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG5pbXBvcnQgeyB9IGZyb20gJy4uLy4uL2FjdGlvbnMvaW5kZXguanMnXG5cbmltcG9ydCBDaGF0VmlldyBmcm9tICcuLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvY2hhdC9pbmRleC5qcydcblxuXG5jbGFzcyBDaGF0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxDaGF0VmlldyB7Li4udGhpcy5wcm9wc30gLz5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9IChzdGF0ZSkgPT4ge1xuICAgIGNvbnN0IFVTRVIgPSBzdGF0ZS5VU0VSXG5cbiAgICByZXR1cm4ge1xuICAgICAgICBVU0VSXG4gICAgfVxufVxuXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSAoZGlzcGF0Y2gpID0+IHtcbiAgICByZXR1cm4ge1xuXG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpKENoYXQpO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cbmltcG9ydCB7IGdldFVzZXJQcm9maWxlV2l0aEFwcG9pbnRtZW50cyB9IGZyb20gJy4uLy4uL2FjdGlvbnMvaW5kZXguanMnXG5cbmltcG9ydCBVc2VyQXBwb2ludG1lbnRzVmlldyBmcm9tICcuLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvdXNlckFwcG9pbnRtZW50cy9pbmRleC5qcydcblxuXG5jbGFzcyBVc2VyQXBwb2ludG1lbnRzIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxVc2VyQXBwb2ludG1lbnRzVmlldyB7Li4udGhpcy5wcm9wc30gLz5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9IChzdGF0ZSkgPT4ge1xuICAgIGNvbnN0IFVTRVIgPSBzdGF0ZS5VU0VSXG5cbiAgICByZXR1cm4ge1xuICAgICAgICBVU0VSXG4gICAgfVxufVxuXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSAoZGlzcGF0Y2gpID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgICBnZXRVc2VyUHJvZmlsZVdpdGhBcHBvaW50bWVudHMgOiAoKSA9PiBkaXNwYXRjaChnZXRVc2VyUHJvZmlsZVdpdGhBcHBvaW50bWVudHMoKSlcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG1hcERpc3BhdGNoVG9Qcm9wcykoVXNlckFwcG9pbnRtZW50cyk7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcblxuaW1wb3J0IHsgZ2V0VXNlclByb2ZpbGUgfSBmcm9tICcuLi8uLi9hY3Rpb25zL2luZGV4LmpzJ1xuXG5pbXBvcnQgVXNlclByb2ZpbGVWaWV3IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy91c2VyUHJvZmlsZS9pbmRleC5qcydcblxuXG5jbGFzcyBVc2VyUHJvZmlsZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8VXNlclByb2ZpbGVWaWV3IHsuLi50aGlzLnByb3BzfSAvPlxuICAgICAgICApO1xuICAgIH1cbn1cblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHN0YXRlKSA9PiB7XG4gICAgY29uc3QgVVNFUiA9IHN0YXRlLlVTRVJcblxuICAgIHJldHVybiB7XG4gICAgICAgIFVTRVJcbiAgICB9XG59XG5cbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IChkaXNwYXRjaCkgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICAgIGdldFVzZXJQcm9maWxlIDogKCkgPT4gZGlzcGF0Y2goZ2V0VXNlclByb2ZpbGUoKSlcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG1hcERpc3BhdGNoVG9Qcm9wcykoVXNlclByb2ZpbGUpO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cbmltcG9ydCB7IGdldFVzZXJQcm9maWxlV2l0aFRlc3RzIH0gZnJvbSAnLi4vLi4vYWN0aW9ucy9pbmRleC5qcydcblxuaW1wb3J0IFVzZXJSZXBvcnRzVmlldyBmcm9tICcuLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvdXNlclJlcG9ydHMvaW5kZXguanMnXG5cblxuY2xhc3MgVXNlclJlcG9ydHMgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPFVzZXJSZXBvcnRzVmlldyB7Li4udGhpcy5wcm9wc30gLz5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9IChzdGF0ZSkgPT4ge1xuICAgIGNvbnN0IFVTRVIgPSBzdGF0ZS5VU0VSXG5cbiAgICByZXR1cm4ge1xuICAgICAgICBVU0VSXG4gICAgfVxufVxuXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSAoZGlzcGF0Y2gpID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgICBnZXRVc2VyUHJvZmlsZVdpdGhUZXN0cyA6ICgpID0+IGRpc3BhdGNoKGdldFVzZXJQcm9maWxlV2l0aFRlc3RzKCkpXG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpKFVzZXJSZXBvcnRzKTtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG5pbXBvcnQgeyB9IGZyb20gJy4uLy4uL2FjdGlvbnMvaW5kZXguanMnXG5cbmltcG9ydCBVc2VyU2lnbnVwVmlldyBmcm9tICcuLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvdXNlclNpZ251cCdcblxuXG5jbGFzcyBVc2VyU2lnbnVwIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICB9XG5cbiAgICBzdGF0aWMgY29udGV4dFR5cGVzID0ge1xuICAgICAgICByb3V0ZXI6ICgpID0+IG51bGxcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxVc2VyU2lnbnVwVmlldyB7Li4udGhpcy5wcm9wc30gLz5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9IChzdGF0ZSkgPT4ge1xuICAgIGNvbnN0IFVTRVIgPSBzdGF0ZS5VU0VSXG5cbiAgICByZXR1cm4ge1xuICAgICAgICBVU0VSXG4gICAgfVxufVxuXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSAoZGlzcGF0Y2gpID0+IHtcbiAgICByZXR1cm4ge1xuXG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpKFVzZXJTaWdudXApO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cbmltcG9ydCB7IGdldExhYkJ5SWQgfSBmcm9tICcuLi8uLi9hY3Rpb25zL2luZGV4LmpzJ1xuXG5pbXBvcnQgQm9va2luZ1N1bW1hcnlWaWV3IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvZGlhZ25vc2lzL2Jvb2tpbmdTdW1tYXJ5L2luZGV4LmpzJ1xuXG5jbGFzcyBCb29raW5nU3VtbWFyeSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgfVxuXG4gICAgc3RhdGljIGNvbnRleHRUeXBlcyA9IHtcbiAgICAgICAgcm91dGVyOiAoKSA9PiBudWxsXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8Qm9va2luZ1N1bW1hcnlWaWV3IHsuLi50aGlzLnByb3BzfSAvPlxuICAgICAgICApO1xuICAgIH1cbn1cblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHN0YXRlKSA9PiB7XG5cbiAgICBjb25zdCB7XG4gICAgICAgIHNlbGVjdGVkQ3JpdGVyaWFzLFxuICAgIH0gPSBzdGF0ZS5TRUFSQ0hfQ1JJVEVSSUFfTEFCU1xuXG4gICAgbGV0IExBQlMgPSBzdGF0ZS5MQUJTXG5cbiAgICByZXR1cm4ge1xuICAgICAgICBzZWxlY3RlZENyaXRlcmlhcyxcbiAgICAgICAgTEFCU1xuICAgIH1cbn1cblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gKGRpc3BhdGNoKSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgZ2V0TGFiQnlJZDogKGxhYklkKSA9PiBkaXNwYXRjaChnZXRMYWJCeUlkKGxhYklkKSlcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpKEJvb2tpbmdTdW1tYXJ5KTtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG5pbXBvcnQgeyBnZXRMYWJCeUlkIH0gZnJvbSAnLi4vLi4vYWN0aW9ucy9pbmRleC5qcydcblxuaW1wb3J0IExhYlZpZXcgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9kaWFnbm9zaXMvbGFiL2luZGV4LmpzJ1xuXG5jbGFzcyBMYWIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgIH1cblxuICAgIHN0YXRpYyBsb2FkRGF0YShzdG9yZSwgbWF0Y2gpe1xuICAgICAgICByZXR1cm4gc3RvcmUuZGlzcGF0Y2goZ2V0TGFiQnlJZChtYXRjaC5wYXJhbXMuaWQpKVxuICAgIH1cblxuICAgIHN0YXRpYyBjb250ZXh0VHlwZXMgPSB7XG4gICAgICAgIHJvdXRlcjogKCkgPT4gbnVsbFxuICAgIH1cblxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgICB0aGlzLnByb3BzLmdldExhYkJ5SWQodGhpcy5wcm9wcy5tYXRjaC5wYXJhbXMuaWQpXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8TGFiVmlldyB7Li4udGhpcy5wcm9wc30gLz5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9IChzdGF0ZSkgPT4ge1xuXG4gICAgY29uc3Qge1xuICAgICAgICBzZWxlY3RlZExvY2F0aW9uLFxuICAgICAgICBzZWxlY3RlZENyaXRlcmlhcyxcbiAgICAgICAgZmlsdGVyQ3JpdGVyaWEsXG4gICAgICAgIExPQURFRF9TRUFSQ0hfQ1JJVEVSSUFfTEFCXG4gICAgfSA9IHN0YXRlLlNFQVJDSF9DUklURVJJQV9MQUJTXG5cbiAgICBsZXQgTEFCUyA9IHN0YXRlLkxBQlNcblxuICAgIHJldHVybiB7XG4gICAgICAgIHNlbGVjdGVkQ3JpdGVyaWFzLFxuICAgICAgICBMQUJTXG4gICAgfVxufVxuXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSAoZGlzcGF0Y2gpID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgICBnZXRMYWJCeUlkOiAobGFiSWQpID0+IGRpc3BhdGNoKGdldExhYkJ5SWQobGFiSWQpKVxuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbWFwRGlzcGF0Y2hUb1Byb3BzKShMYWIpO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cbmltcG9ydCB7IGdldExhYkJ5SWQgfSBmcm9tICcuLi8uLi9hY3Rpb25zL2luZGV4LmpzJ1xuXG5pbXBvcnQgUGF0aWVudERldGFpbHNWaWV3IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvZGlhZ25vc2lzL3BhdGllbnREZXRhaWxzL2luZGV4LmpzJ1xuXG5jbGFzcyBQYXRpZW50RGV0YWlscyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8UGF0aWVudERldGFpbHNWaWV3IHsuLi50aGlzLnByb3BzfSAvPlxuICAgICAgICApO1xuICAgIH1cbn1cblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHN0YXRlKSA9PiB7XG5cbiAgICBsZXQgTEFCUyA9IHN0YXRlLkxBQlNcblxuICAgIHJldHVybiB7XG4gICAgICAgIExBQlNcbiAgICB9XG59XG5cbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IChkaXNwYXRjaCkgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICAgIGdldExhYkJ5SWQgOiAobGFiSWQsIHRlc3RJZHMpID0+IGRpc3BhdGNoKGdldExhYkJ5SWQobGFiSWQsIHRlc3RJZHMpKVxuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbWFwRGlzcGF0Y2hUb1Byb3BzKShQYXRpZW50RGV0YWlscyk7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcblxuaW1wb3J0IHsgbG9hZExhYkNvbW1vbkNyaXRlcmlhcywgdG9nZ2xlRGlhZ25vc2lzQ3JpdGVyaWEsIGdldERpYWdub3Npc0NyaXRlcmlhUmVzdWx0cyB9IGZyb20gJy4uLy4uL2FjdGlvbnMvaW5kZXguanMnXG5pbXBvcnQgU2VhcmNoQ3JpdGVyaWFWaWV3IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvZGlhZ25vc2lzL3NlYXJjaENyaXRlcmlhL2luZGV4LmpzJ1xuXG5jbGFzcyBTZWFyY2hDcml0ZXJpYSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgfVxuXG4gICAgc3RhdGljIGxvYWREYXRhKHN0b3JlKXtcbiAgICAgICAgcmV0dXJuIHN0b3JlLmRpc3BhdGNoKGxvYWRMYWJDb21tb25Dcml0ZXJpYXMoKSlcbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgdGhpcy5wcm9wcy5sb2FkTGFiQ29tbW9uQ3JpdGVyaWFzKClcbiAgICB9XG5cbiAgICBzdGF0aWMgY29udGV4dFR5cGVzID0ge1xuICAgICAgICByb3V0ZXI6ICgpID0+IG51bGxcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8U2VhcmNoQ3JpdGVyaWFWaWV3IHsuLi50aGlzLnByb3BzfSAvPlxuICAgICAgICApXG4gICAgfVxufVxuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoc3RhdGUpID0+IHtcblxuICAgIGNvbnN0IHtcbiAgICAgICAgTE9BREVEX1NFQVJDSF9DUklURVJJQV9MQUIsXG4gICAgICAgIGNvbW1vbl90ZXN0cyxcbiAgICAgICAgY29tbW9uX2NvbmRpdGlvbnMsXG4gICAgICAgIHByZWZlcnJlZF9sYWJzLFxuICAgICAgICBzZWxlY3RlZENyaXRlcmlhcyxcbiAgICAgICAgc2VsZWN0ZWRMb2NhdGlvbixcbiAgICAgICAgZmlsdGVyQ3JpdGVyaWFcbiAgICB9ID0gc3RhdGUuU0VBUkNIX0NSSVRFUklBX0xBQlNcblxuICAgIHJldHVybiB7XG4gICAgICAgIExPQURFRF9TRUFSQ0hfQ1JJVEVSSUFfTEFCLFxuICAgICAgICBjb21tb25fdGVzdHMsXG4gICAgICAgIGNvbW1vbl9jb25kaXRpb25zLFxuICAgICAgICBwcmVmZXJyZWRfbGFicyxcbiAgICAgICAgc2VsZWN0ZWRDcml0ZXJpYXMsXG4gICAgICAgIHNlbGVjdGVkTG9jYXRpb24sXG4gICAgICAgIGZpbHRlckNyaXRlcmlhXG4gICAgfVxufVxuXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSAoZGlzcGF0Y2gpID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgICBsb2FkTGFiQ29tbW9uQ3JpdGVyaWFzOiAoKSA9PiBkaXNwYXRjaChsb2FkTGFiQ29tbW9uQ3JpdGVyaWFzKCkpLFxuICAgICAgICB0b2dnbGVEaWFnbm9zaXNDcml0ZXJpYTogKHR5cGUsIGNyaXRlcmlhKSA9PiBkaXNwYXRjaCh0b2dnbGVEaWFnbm9zaXNDcml0ZXJpYSh0eXBlLCBjcml0ZXJpYSkpLFxuICAgICAgICBnZXREaWFnbm9zaXNDcml0ZXJpYVJlc3VsdHM6IChzZWFyY2hTdHJpbmcsIGNhbGxiYWNrKSA9PiBkaXNwYXRjaChnZXREaWFnbm9zaXNDcml0ZXJpYVJlc3VsdHMoc2VhcmNoU3RyaW5nLCBjYWxsYmFjaykpXG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpKFNlYXJjaENyaXRlcmlhKTtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG5pbXBvcnQgeyBnZXRMYWJzLCB0b2dnbGVEaWFnbm9zaXNDcml0ZXJpYSwgZ2V0RGlhZ25vc2lzQ3JpdGVyaWFSZXN1bHRzIH0gZnJvbSAnLi4vLi4vYWN0aW9ucy9pbmRleC5qcydcblxuaW1wb3J0IFNlYXJjaFJlc3VsdHNWaWV3IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvZGlhZ25vc2lzL3NlYXJjaFJlc3VsdHMvaW5kZXguanMnXG5cbmNsYXNzIFNlYXJjaFJlc3VsdHMgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgICAgICB0aGlzLnN0YXRlID0ge1xuXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdGF0aWMgY29udGV4dFR5cGVzID0ge1xuICAgICAgICByb3V0ZXI6ICgpID0+IG51bGxcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxTZWFyY2hSZXN1bHRzVmlldyB7Li4udGhpcy5wcm9wc30gLz5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9IChzdGF0ZSkgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgICAgc2VsZWN0ZWRMb2NhdGlvbixcbiAgICAgICAgc2VsZWN0ZWRDcml0ZXJpYXMsXG4gICAgICAgIGZpbHRlckNyaXRlcmlhLFxuICAgICAgICBMT0FERURfU0VBUkNIX0NSSVRFUklBX0xBQlxuICAgIH0gPSBzdGF0ZS5TRUFSQ0hfQ1JJVEVSSUFfTEFCU1xuXG4gICAgY29uc3QgTEFCUyA9IHN0YXRlLkxBQlNcbiAgICBjb25zdCB7IGxhYkxpc3QsIExPQURFRF9MQUJTX1NFQVJDSCB9ID0gc3RhdGUuTEFCX1NFQVJDSFxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgc2VsZWN0ZWRMb2NhdGlvbixcbiAgICAgICAgc2VsZWN0ZWRDcml0ZXJpYXMsXG4gICAgICAgIGZpbHRlckNyaXRlcmlhLFxuICAgICAgICBMT0FERURfU0VBUkNIX0NSSVRFUklBX0xBQixcbiAgICAgICAgTEFCUyxcbiAgICAgICAgbGFiTGlzdCwgTE9BREVEX0xBQlNfU0VBUkNIXG4gICAgfVxuXG59XG5cbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IChkaXNwYXRjaCkgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICAgIGdldExhYnM6IChzZWFyY2hTdGF0ZSwgZmlsdGVyQ3JpdGVyaWEsIG1lcmdlU3RhdGUpID0+IGRpc3BhdGNoKGdldExhYnMoc2VhcmNoU3RhdGUsIGZpbHRlckNyaXRlcmlhLCBtZXJnZVN0YXRlKSksXG4gICAgICAgIHRvZ2dsZURpYWdub3Npc0NyaXRlcmlhOiAodHlwZSwgY3JpdGVyaWEpID0+IGRpc3BhdGNoKHRvZ2dsZURpYWdub3Npc0NyaXRlcmlhKHR5cGUsIGNyaXRlcmlhKSksXG4gICAgICAgIGdldERpYWdub3Npc0NyaXRlcmlhUmVzdWx0czogKHNlYXJjaFN0cmluZywgY2FsbGJhY2spID0+IGRpc3BhdGNoKGdldERpYWdub3Npc0NyaXRlcmlhUmVzdWx0cyhzZWFyY2hTdHJpbmcsIGNhbGxiYWNrKSlcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpKFNlYXJjaFJlc3VsdHMpO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cbmltcG9ydCB7IGdldExhYkJ5SWQsIHRvZ2dsZURpYWdub3Npc0NyaXRlcmlhIH0gZnJvbSAnLi4vLi4vYWN0aW9ucy9pbmRleC5qcydcblxuaW1wb3J0IFRlc3RTZWxlY3RvclZpZXcgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9kaWFnbm9zaXMvdGVzdFNlbGVjdG9yJ1xuXG5jbGFzcyBUZXN0U2VsZWN0b3IgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgIH1cblxuICAgIHN0YXRpYyBjb250ZXh0VHlwZXMgPSB7XG4gICAgICAgIHJvdXRlcjogKCkgPT4gbnVsbFxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPFRlc3RTZWxlY3RvclZpZXcgey4uLnRoaXMucHJvcHN9IC8+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoc3RhdGUpID0+IHtcblxuICAgIGNvbnN0IHtcbiAgICAgICAgc2VsZWN0ZWRMb2NhdGlvbixcbiAgICAgICAgc2VsZWN0ZWRDcml0ZXJpYXMsXG4gICAgICAgIGZpbHRlckNyaXRlcmlhLFxuICAgICAgICBMT0FERURfU0VBUkNIX0NSSVRFUklBX0xBQlxuICAgIH0gPSBzdGF0ZS5TRUFSQ0hfQ1JJVEVSSUFfTEFCU1xuXG4gICAgbGV0IExBQlMgPSBzdGF0ZS5MQUJTXG5cbiAgICByZXR1cm4ge1xuICAgICAgICBzZWxlY3RlZENyaXRlcmlhcyxcbiAgICAgICAgTEFCU1xuICAgIH1cbn1cblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gKGRpc3BhdGNoKSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdG9nZ2xlRGlhZ25vc2lzQ3JpdGVyaWE6ICh0eXBlLCBjcml0ZXJpYSkgPT4gZGlzcGF0Y2godG9nZ2xlRGlhZ25vc2lzQ3JpdGVyaWEodHlwZSwgY3JpdGVyaWEpKSxcbiAgICAgICAgZ2V0TGFiQnlJZDogKGxhYklkKSA9PiBkaXNwYXRjaChnZXRMYWJCeUlkKGxhYklkKSlcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG1hcERpc3BhdGNoVG9Qcm9wcykoVGVzdFNlbGVjdG9yKTtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG5pbXBvcnQgeyBnZXREb2N0b3JCeUlkLCBnZXRUaW1lU2xvdHMgfSBmcm9tICcuLi8uLi9hY3Rpb25zL2luZGV4LmpzJ1xuXG5pbXBvcnQgQXBwb2ludG1lbnRTbG90VmlldyBmcm9tICcuLi8uLi9jb21wb25lbnRzL29wZC9hcHBvaW50bWVudFNsb3QvaW5kZXguanMnXG5cbmNsYXNzIEFwcG9pbnRtZW50U2xvdCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8QXBwb2ludG1lbnRTbG90VmlldyB7Li4udGhpcy5wcm9wc30gLz5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9IChzdGF0ZSkgPT4ge1xuXG4gICAgbGV0IERPQ1RPUlMgPSBzdGF0ZS5ET0NUT1JTXG5cbiAgICByZXR1cm4ge1xuICAgICAgICBET0NUT1JTXG4gICAgfVxufVxuXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSAoZGlzcGF0Y2gpID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgICBnZXREb2N0b3JCeUlkIDogKGRvY3RvcklkKSA9PiBkaXNwYXRjaChnZXREb2N0b3JCeUlkKGRvY3RvcklkKSksXG4gICAgICAgIGdldFRpbWVTbG90cyA6IChkb2N0b3JJZCwgY2xpbmljSWQsIGNhbGxiYWNrKSA9PiBkaXNwYXRjaChnZXRUaW1lU2xvdHMoZG9jdG9ySWQsIGNsaW5pY0lkLCBjYWxsYmFjaykpXG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpKEFwcG9pbnRtZW50U2xvdCk7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcblxuaW1wb3J0IHsgfSBmcm9tICcuLi8uLi9hY3Rpb25zL2luZGV4LmpzJ1xuXG5pbXBvcnQgQm9va2luZ1ZpZXcgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9vcGQvYm9va2luZy9Cb29raW5nVmlldy5qcydcblxuY2xhc3MgQm9va2luZyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8Qm9va2luZ1ZpZXcgey4uLnRoaXMucHJvcHN9IC8+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoc3RhdGUpID0+IHtcblxuICAgIHJldHVybiB7XG5cbiAgICB9XG59XG5cbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IChkaXNwYXRjaCkgPT4ge1xuICAgIHJldHVybiB7XG5cbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG1hcERpc3BhdGNoVG9Qcm9wcykoQm9va2luZyk7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcblxuaW1wb3J0IHsgZ2V0RG9jdG9yQnlJZCB9IGZyb20gJy4uLy4uL2FjdGlvbnMvaW5kZXguanMnXG5cbmltcG9ydCBDbGluaWNMaXN0VmlldyBmcm9tICcuLi8uLi9jb21wb25lbnRzL29wZC9jbGluaWNMaXN0L2luZGV4LmpzJ1xuXG5jbGFzcyBDbGluaWNMaXN0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxDbGluaWNMaXN0VmlldyB7Li4udGhpcy5wcm9wc30gLz5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9IChzdGF0ZSkgPT4ge1xuXG4gICAgbGV0IERPQ1RPUlMgPSBzdGF0ZS5ET0NUT1JTXG5cbiAgICByZXR1cm4ge1xuICAgICAgICBET0NUT1JTXG4gICAgfVxufVxuXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSAoZGlzcGF0Y2gpID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgICBnZXREb2N0b3JCeUlkIDogKGRvY3RvcklkKSA9PiBkaXNwYXRjaChnZXREb2N0b3JCeUlkKGRvY3RvcklkKSlcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG1hcERpc3BhdGNoVG9Qcm9wcykoQ2xpbmljTGlzdCk7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcblxuaW1wb3J0IHsgZ2V0Q3JpdGVyaWFSZXN1bHRzLCB0b2dnbGVDcml0ZXJpYSB9IGZyb20gJy4uLy4uL2FjdGlvbnMvaW5kZXguanMnXG5pbXBvcnQgQ3JpdGVyaWFTZWFyY2hWaWV3IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvb3BkL2NyaXRlcmlhU2VhcmNoL2luZGV4LmpzJ1xuXG5jbGFzcyBDcml0ZXJpYVNlYXJjaCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8Q3JpdGVyaWFTZWFyY2hWaWV3XG4gICAgICAgICAgICAgICAgeyAuLi50aGlzLnByb3BzIH1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoc3RhdGUpID0+IHtcblxuICAgIHJldHVybiB7XG5cbiAgICB9XG59XG5cbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IChkaXNwYXRjaCkgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICAgIGdldENyaXRlcmlhUmVzdWx0cyA6IChzZWFyY2hTdHJpbmcsY2IpID0+IGRpc3BhdGNoKGdldENyaXRlcmlhUmVzdWx0cyhzZWFyY2hTdHJpbmcsY2IpKSxcbiAgICAgICAgdG9nZ2xlQ3JpdGVyaWEgOiAoY3JpdGVyaWEpID0+IGRpc3BhdGNoKHRvZ2dsZUNyaXRlcmlhKGNyaXRlcmlhKSlcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG1hcERpc3BhdGNoVG9Qcm9wcykoQ3JpdGVyaWFTZWFyY2gpO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cbmltcG9ydCB7IGdldERvY3RvckJ5SWQgfSBmcm9tICcuLi8uLi9hY3Rpb25zL2luZGV4LmpzJ1xuXG5pbXBvcnQgRG9jdG9yUHJvZmlsZVZpZXcgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9vcGQvZG9jdG9yUHJvZmlsZS9pbmRleC5qcydcblxuY2xhc3MgRG9jdG9yUHJvZmlsZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8RG9jdG9yUHJvZmlsZVZpZXcgey4uLnRoaXMucHJvcHN9IC8+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoc3RhdGUpID0+IHtcblxuICAgIGxldCBET0NUT1JTID0gc3RhdGUuRE9DVE9SU1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgRE9DVE9SU1xuICAgIH1cbn1cblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gKGRpc3BhdGNoKSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgZ2V0RG9jdG9yQnlJZCA6IChkb2N0b3JJZCkgPT4gZGlzcGF0Y2goZ2V0RG9jdG9yQnlJZChkb2N0b3JJZCkpXG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpKERvY3RvclByb2ZpbGUpO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cbmltcG9ydCB7IHNlbGVjdExvY2F0aW9uIH0gZnJvbSAnLi4vLi4vYWN0aW9ucy9pbmRleC5qcydcbmltcG9ydCBMb2NhdGlvblNlYXJjaFZpZXcgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9vcGQvbG9jYXRpb25TZWFyY2gvaW5kZXguanMnXG5cbmNsYXNzIExvY2F0aW9uU2VhcmNoIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICB9XG5cbiAgICBzdGF0aWMgY29udGV4dFR5cGVzID0ge1xuICAgICAgICByb3V0ZXI6ICgpID0+IG51bGxcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxMb2NhdGlvblNlYXJjaFZpZXcgey4uLnRoaXMucHJvcHN9IC8+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoc3RhdGUpID0+IHtcbiAgICBjb25zdCB7XG4gICAgICAgIHNlbGVjdGVkTG9jYXRpb25cbiAgICB9ID0gc3RhdGUuU0VBUkNIX0NSSVRFUklBX09QRFxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgc2VsZWN0ZWRMb2NhdGlvblxuICAgIH1cbn1cblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gKGRpc3BhdGNoKSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgc2VsZWN0TG9jYXRpb246IChsb2NhdGlvbikgPT4gZGlzcGF0Y2goc2VsZWN0TG9jYXRpb24obG9jYXRpb24pKVxuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbWFwRGlzcGF0Y2hUb1Byb3BzKShMb2NhdGlvblNlYXJjaCk7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcblxuaW1wb3J0IHsgZ2V0RG9jdG9yQnlJZCB9IGZyb20gJy4uLy4uL2FjdGlvbnMvaW5kZXguanMnXG5cbmltcG9ydCBQYXRpZW50RGV0YWlsc1ZpZXcgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9vcGQvcGF0aWVudERldGFpbHMvaW5kZXguanMnXG5cbmNsYXNzIFBhdGllbnREZXRhaWxzIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxQYXRpZW50RGV0YWlsc1ZpZXcgey4uLnRoaXMucHJvcHN9IC8+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoc3RhdGUpID0+IHtcblxuICAgIGxldCBET0NUT1JTID0gc3RhdGUuRE9DVE9SU1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgRE9DVE9SU1xuICAgIH1cbn1cblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gKGRpc3BhdGNoKSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgZ2V0RG9jdG9yQnlJZCA6IChkb2N0b3JJZCkgPT4gZGlzcGF0Y2goZ2V0RG9jdG9yQnlJZChkb2N0b3JJZCkpXG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpKFBhdGllbnREZXRhaWxzKTtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG5pbXBvcnQgeyB9IGZyb20gJy4uLy4uL2FjdGlvbnMvaW5kZXguanMnXG5cbmltcG9ydCBQYXltZW50VmlldyBmcm9tICcuLi8uLi9jb21wb25lbnRzL29wZC9wYXltZW50L1BheW1lbnRWaWV3LmpzJ1xuXG5jbGFzcyBQYXltZW50IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxQYXltZW50VmlldyB7Li4udGhpcy5wcm9wc30gLz5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9IChzdGF0ZSkgPT4ge1xuXG4gICAgcmV0dXJuIHtcblxuICAgIH1cbn1cblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gKGRpc3BhdGNoKSA9PiB7XG4gICAgcmV0dXJuIHtcblxuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbWFwRGlzcGF0Y2hUb1Byb3BzKShQYXltZW50KTtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG5pbXBvcnQgeyB0b2dnbGVDb25kaXRpb24sIHRvZ2dsZVNwZWNpYWxpdHksIHRvZ2dsZUNyaXRlcmlhLCBsb2FkU2VhcmNoQ3JpdGVyaWEgfSBmcm9tICcuLi8uLi9hY3Rpb25zL2luZGV4LmpzJ1xuaW1wb3J0IFNlYXJjaENyaXRlcmlhVmlldyBmcm9tICcuLi8uLi9jb21wb25lbnRzL29wZC9zZWFyY2hDcml0ZXJpYS9pbmRleC5qcydcblxuY2xhc3MgU2VhcmNoQ3JpdGVyaWEgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgIH1cblxuICAgIHN0YXRpYyBjb250ZXh0VHlwZXMgPSB7XG4gICAgICAgIHJvdXRlcjogKCkgPT4gbnVsbFxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPFNlYXJjaENyaXRlcmlhVmlldyB7Li4udGhpcy5wcm9wc30gLz5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9IChzdGF0ZSkgPT4ge1xuXG4gICAgY29uc3Qge1xuICAgICAgICBjb21tb25seVNlYXJjaGVkQ29uZGl0aW9ucyxcbiAgICAgICAgc2VsZWN0ZWRDb25kaXRpb25zLFxuICAgICAgICBjb21tb25seVNlYXJjaGVkU3BlY2lhbGl0aWVzLFxuICAgICAgICBzZWxlY3RlZFNwZWNpYWxpdGllcyxcbiAgICAgICAgc2VsZWN0ZWRMb2NhdGlvbixcbiAgICAgICAgc2VsZWN0ZWRDcml0ZXJpYVxuICAgIH0gPSBzdGF0ZS5TRUFSQ0hfQ1JJVEVSSUFfT1BEXG5cbiAgICByZXR1cm4ge1xuICAgICAgICBjb21tb25seVNlYXJjaGVkQ29uZGl0aW9ucyxcbiAgICAgICAgc2VsZWN0ZWRDb25kaXRpb25zLFxuICAgICAgICBjb21tb25seVNlYXJjaGVkU3BlY2lhbGl0aWVzLFxuICAgICAgICBzZWxlY3RlZFNwZWNpYWxpdGllcyxcbiAgICAgICAgc2VsZWN0ZWRMb2NhdGlvbixcbiAgICAgICAgc2VsZWN0ZWRDcml0ZXJpYVxuICAgIH1cbn1cblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gKGRpc3BhdGNoKSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdG9nZ2xlQ29uZGl0aW9uOiAoaWQpID0+IGRpc3BhdGNoKHRvZ2dsZUNvbmRpdGlvbihpZCkpLFxuICAgICAgICB0b2dnbGVTcGVjaWFsaXR5OiAoaWQpID0+IGRpc3BhdGNoKHRvZ2dsZVNwZWNpYWxpdHkoaWQpKSxcbiAgICAgICAgdG9nZ2xlQ3JpdGVyaWEgOiAoY3JpdGVyaWEpID0+IGRpc3BhdGNoKHRvZ2dsZUNyaXRlcmlhKGNyaXRlcmlhKSksXG4gICAgICAgIGxvYWRTZWFyY2hDcml0ZXJpYTogKCkgPT4gZGlzcGF0Y2gobG9hZFNlYXJjaENyaXRlcmlhKCkpXG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpKFNlYXJjaENyaXRlcmlhKTtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG5pbXBvcnQgeyBnZXREb2N0b3JzIH0gZnJvbSAnLi4vLi4vYWN0aW9ucy9pbmRleC5qcydcblxuaW1wb3J0IFNlYXJjaFJlc3VsdHNWaWV3IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvb3BkL3NlYXJjaFJlc3VsdHMvaW5kZXguanMnXG5cbmNsYXNzIFNlYXJjaFJlc3VsdHMgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgICAgICB0aGlzLnN0YXRlID0ge1xuXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxTZWFyY2hSZXN1bHRzVmlldyB7IC4uLnRoaXMucHJvcHMgfSAvPlxuICAgICAgICApO1xuICAgIH1cbn1cblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHN0YXRlKSA9PiB7XG5cbiAgICBjb25zdCB7XG4gICAgICAgIHNlbGVjdGVkQ29uZGl0aW9ucyxcbiAgICAgICAgc2VsZWN0ZWRTcGVjaWFsaXRpZXMsXG4gICAgICAgIHNlbGVjdGVkTG9jYXRpb24sXG4gICAgICAgIHNlbGVjdGVkQ3JpdGVyaWEsXG4gICAgICAgIGZpbHRlckNyaXRlcmlhLFxuICAgICAgICBDUklURVJJQV9MT0FERURcbiAgICB9ID0gc3RhdGUuU0VBUkNIX0NSSVRFUklBX09QRFxuXG4gICAgbGV0IERPQ1RPUlMgPSBzdGF0ZS5ET0NUT1JTXG4gICAgbGV0IHsgZG9jdG9yTGlzdCwgTE9BRElORywgRVJST1IgfSA9IHN0YXRlLkRPQ1RPUl9TRUFSQ0hcblxuICAgIHJldHVybiB7XG4gICAgICAgIERPQ1RPUlMsIGRvY3Rvckxpc3QsIExPQURJTkcsIEVSUk9SLFxuICAgICAgICBzZWxlY3RlZENvbmRpdGlvbnMsXG4gICAgICAgIHNlbGVjdGVkU3BlY2lhbGl0aWVzLFxuICAgICAgICBzZWxlY3RlZExvY2F0aW9uLFxuICAgICAgICBzZWxlY3RlZENyaXRlcmlhLFxuICAgICAgICBmaWx0ZXJDcml0ZXJpYSxcbiAgICAgICAgQ1JJVEVSSUFfTE9BREVEXG4gICAgfVxufVxuXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSAoZGlzcGF0Y2gpID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgICBnZXREb2N0b3JzOiAoc2VhcmNoU3RhdGUsZmlsdGVyU3RhdGUsbWVyZ2VTdGF0ZSkgPT4gZGlzcGF0Y2goZ2V0RG9jdG9ycyhzZWFyY2hTdGF0ZSxmaWx0ZXJTdGF0ZSxtZXJnZVN0YXRlKSlcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpKFNlYXJjaFJlc3VsdHMpO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cbmltcG9ydCB7IHNldE9QREZpbHRlcnMgfSBmcm9tICcuLi8uLi9hY3Rpb25zL2luZGV4LmpzJ1xuXG5pbXBvcnQgU2VhcmNoUmVzdWx0c0ZpbHRlclZpZXcgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9vcGQvc2VhcmNoUmVzdWx0c0ZpbHRlci9pbmRleC5qcydcblxuY2xhc3MgU2VhcmNoUmVzdWx0c0ZpbHRlciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8U2VhcmNoUmVzdWx0c0ZpbHRlclZpZXcgey4uLnRoaXMucHJvcHN9Lz5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9IChzdGF0ZSkgPT4ge1xuXG4gICAgY29uc3Qge1xuICAgICAgICBmaWx0ZXJDcml0ZXJpYVxuICAgIH0gPSBzdGF0ZS5TRUFSQ0hfQ1JJVEVSSUFfT1BEXG5cbiAgICByZXR1cm4ge1xuICAgICAgICBmaWx0ZXJDcml0ZXJpYVxuICAgIH1cbn1cblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gKGRpc3BhdGNoKSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgc2V0T1BERmlsdGVycyA6IChmaWx0ZXJEYXRhKSA9PiBkaXNwYXRjaChzZXRPUERGaWx0ZXJzKGZpbHRlckRhdGEpKVxuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbWFwRGlzcGF0Y2hUb1Byb3BzKShTZWFyY2hSZXN1bHRzRmlsdGVyKTtcbiIsImltcG9ydCBOQVZJR0FURSBmcm9tICcuL25hdmlnYXRlJ1xuXG5leHBvcnQgZGVmYXVsdCBOQVZJR0FURSIsImNvbnN0IE5BVklHQVRFID0ge1xuICAgIG5hdmlnYXRlVG8gOiAod2hlcmUpID0+IHtcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSB3aGVyZVxuICAgIH0sXG5cbiAgICByZWZyZXNoQXBwb2ludG1lbnRTdGF0ZSA6IChwcm9wcykgPT4ge1xuICAgICAgICBsZXQgbm9BcHBvaW50bWVudEZvdW5kID0gcHJvcHMudXBjb21pbmcubGVuZ3RoID09IDAgJiYgcHJvcHMucHJldmlvdXMubGVuZ3RoID09IDBcbiAgICAgICAgXG4gICAgICAgIGlmKHByb3BzLmhpc3RvcnkuYWN0aW9uID09PSAnUFVTSCcgfHwgbm9BcHBvaW50bWVudEZvdW5kKXtcbiAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTkFWSUdBVEUiLCJpbXBvcnQgU1RPUkFHRSBmcm9tICcuL3N0b3JhZ2UnXG5cbmV4cG9ydCBkZWZhdWx0IFNUT1JBR0UiLCJpbXBvcnQgQ29va2llcyBmcm9tICd1bml2ZXJzYWwtY29va2llJztcbmNvbnN0IGNvb2tpZXMgPSBuZXcgQ29va2llcygpO1xuXG5jb25zdCBTVE9SQUdFID0ge1xuICAgIHNldEF1dGhUb2tlbjogKHRva2VuKSA9PiB7XG4gICAgICAgIGNvb2tpZXMuc2V0KCd0b2tlbicsIHRva2VuKVxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHRydWUpXG4gICAgfSxcbiAgICBnZXRBdXRoVG9rZW46ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShjb29raWVzLmdldCgndG9rZW4nKSlcbiAgICB9LFxuICAgIGNoZWNrQXV0aDogKCkgPT4ge1xuICAgICAgICByZXR1cm4gISFjb29raWVzLmdldCgndG9rZW4nKVxuICAgIH0sXG4gICAgZGVsZXRlQXV0aDogKCkgPT4ge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGNvb2tpZXMucmVtb3ZlKCd0b2tlbicpKVxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgU1RPUkFHRSIsImltcG9ydCB7IFNFTkRfT1RQX1JFUVVFU1QsIFNFTkRfT1RQX1NVQ0NFU1MsIFNFTkRfT1RQX0ZBSUwsIFNVQk1JVF9PVFBfUkVRVUVTVCwgU1VCTUlUX09UUF9TVUNDRVNTLCBTVUJNSVRfT1RQX0ZBSUwgfSBmcm9tICcuLi8uLi9jb25zdGFudHMvdHlwZXMnO1xuXG5jb25zdCBkZWZhdWx0U3RhdGUgPSB7XG4gICAgdG9rZW46IG51bGwsXG4gICAgZXJyb3JfbWVzc2FnZTogXCJcIixcbiAgICBzdWNjZXNzX21lc3NhZ2U6IFwiXCIsXG4gICAgb3RwX3JlcXVlc3Rfc2VudDogZmFsc2UsXG4gICAgb3RwX3JlcXVlc3Rfc3VjY2VzczogZmFsc2UsXG4gICAgb3RwX3JlcXVlc3RfZmFpbDogZmFsc2UsXG4gICAgcGhvbmVOdW1iZXI6IFwiXCIsXG4gICAgc3VibWl0X290cDpmYWxzZSxcbiAgICBzdWJtaXRfb3RwX3N1Y2Nlc3M6ZmFsc2UsXG4gICAgc3VibWl0X290cF9mYWlsOmZhbHNlXG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChzdGF0ZSA9IGRlZmF1bHRTdGF0ZSwgYWN0aW9uKSB7XG5cbiAgICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgICAgIGNhc2UgU0VORF9PVFBfUkVRVUVTVDoge1xuICAgICAgICAgICAgbGV0IG5ld1N0YXRlID0geyAuLi5kZWZhdWx0U3RhdGUgfVxuXG4gICAgICAgICAgICBuZXdTdGF0ZS5vdHBfcmVxdWVzdF9zZW50ID0gdHJ1ZVxuICAgICAgICAgICAgbmV3U3RhdGUucGhvbmVOdW1iZXIgPSBhY3Rpb24ucGF5bG9hZC5waG9uZU51bWJlclxuICAgICAgICAgICAgXG4gICAgICAgICAgICByZXR1cm4gbmV3U3RhdGVcbiAgICAgICAgfVxuXG4gICAgICAgIGNhc2UgU0VORF9PVFBfU1VDQ0VTUzoge1xuICAgICAgICAgICAgbGV0IG5ld1N0YXRlID0geyAuLi5zdGF0ZSB9XG4gICAgICAgICAgICBuZXdTdGF0ZS5vdHBfcmVxdWVzdF9zZW50ID0gZmFsc2VcbiAgICAgICAgICAgIG5ld1N0YXRlLm90cF9yZXF1ZXN0X3N1Y2Nlc3MgPSB0cnVlXG4gICAgICAgICAgICBuZXdTdGF0ZS5vdHBfcmVxdWVzdF9mYWlsID0gZmFsc2VcbiAgICAgICAgICAgIG5ld1N0YXRlLnN1Y2Nlc3NfbWVzc2FnZSA9IGFjdGlvbi5wYXlsb2FkLnN1Y2Nlc3NfbWVzc2FnZVxuICAgICAgICAgICAgXG4gICAgICAgICAgICByZXR1cm4gbmV3U3RhdGVcbiAgICAgICAgfVxuXG4gICAgICAgIGNhc2UgU0VORF9PVFBfRkFJTDoge1xuICAgICAgICAgICAgbGV0IG5ld1N0YXRlID0geyAuLi5zdGF0ZSB9XG4gICAgICAgICAgICBuZXdTdGF0ZS5vdHBfcmVxdWVzdF9zZW50ID0gZmFsc2VcbiAgICAgICAgICAgIG5ld1N0YXRlLm90cF9yZXF1ZXN0X2ZhaWwgPSB0cnVlXG4gICAgICAgICAgICBuZXdTdGF0ZS5vdHBfcmVxdWVzdF9zdWNjZXNzID0gZmFsc2VcbiAgICAgICAgICAgIG5ld1N0YXRlLmVycm9yX21lc3NhZ2UgPSBhY3Rpb24ucGF5bG9hZC5lcnJvcl9tZXNzYWdlXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHJldHVybiBuZXdTdGF0ZVxuICAgICAgICB9XG5cbiAgICAgICAgY2FzZSBTVUJNSVRfT1RQX1JFUVVFU1Q6IHtcbiAgICAgICAgICAgIGxldCBuZXdTdGF0ZSA9IHsgLi4uc3RhdGUgfVxuICAgICAgICAgICAgbmV3U3RhdGUuc3VibWl0X290cCA9IHRydWVcbiAgICAgICAgICAgIHJldHVybiBuZXdTdGF0ZVxuICAgICAgICB9XG5cbiAgICAgICAgY2FzZSBTVUJNSVRfT1RQX1NVQ0NFU1M6IHtcbiAgICAgICAgICAgIGxldCBuZXdTdGF0ZSA9IHsgLi4uc3RhdGUgfVxuICAgICAgICAgICAgbmV3U3RhdGUuc3VibWl0X290cCA9IGZhbHNlXG4gICAgICAgICAgICBuZXdTdGF0ZS5zdWJtaXRfb3RwX2ZhaWwgPSBmYWxzZVxuICAgICAgICAgICAgbmV3U3RhdGUuc3VibWl0X290cF9zdWNjZXNzID0gdHJ1ZVxuICAgICAgICAgICAgbmV3U3RhdGUudG9rZW4gPSBhY3Rpb24ucGF5bG9hZC50b2tlblxuICAgICAgICAgICAgcmV0dXJuIG5ld1N0YXRlXG4gICAgICAgIH1cblxuICAgICAgICBjYXNlIFNVQk1JVF9PVFBfRkFJTDoge1xuICAgICAgICAgICAgbGV0IG5ld1N0YXRlID0geyAuLi5zdGF0ZSB9XG4gICAgICAgICAgICBuZXdTdGF0ZS5zdWJtaXRfb3RwID0gZmFsc2VcbiAgICAgICAgICAgIG5ld1N0YXRlLnN1Ym1pdF9vdHBfZmFpbCA9IHRydWVcbiAgICAgICAgICAgIG5ld1N0YXRlLnN1Ym1pdF9vdHBfc3VjY2VzcyA9IGZhbHNlXG4gICAgICAgICAgICBuZXdTdGF0ZS5lcnJvcl9tZXNzYWdlID0gYWN0aW9uLnBheWxvYWQuZXJyb3JfbWVzc2FnZVxuICAgICAgICAgICAgcmV0dXJuIG5ld1N0YXRlXG4gICAgICAgIH1cblxuICAgIH1cbiAgICByZXR1cm4gc3RhdGVcbn0iLCJpbXBvcnQgeyBBUFBFTkRfVVNFUl9QUk9GSUxFUyB9IGZyb20gJy4uLy4uL2NvbnN0YW50cy90eXBlcyc7XG5cbmNvbnN0IGRlZmF1bHRTdGF0ZSA9IHtcbiAgICBwcm9maWxlczoge31cbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHN0YXRlID0gZGVmYXVsdFN0YXRlLCBhY3Rpb24pIHtcblxuICAgIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICAgICAgY2FzZSBBUFBFTkRfVVNFUl9QUk9GSUxFUzoge1xuICAgICAgICAgICAgbGV0IG5ld1N0YXRlID0ge1xuICAgICAgICAgICAgICAgIC4uLnN0YXRlLFxuICAgICAgICAgICAgICAgIHByb2ZpbGVzIDogeyAuLi5zdGF0ZS5wcm9maWxlcyB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIG5ld1N0YXRlLnByb2ZpbGVzID0gYWN0aW9uLnBheWxvYWQucmVkdWNlKChwcm9maWxlTWFwLCBwcm9maWxlKSA9PiB7XG4gICAgICAgICAgICAgICAgcHJvZmlsZU1hcFtwcm9maWxlLnByb2ZpbGVJZF0gPSBwcm9maWxlXG4gICAgICAgICAgICAgICAgcmV0dXJuIHByb2ZpbGVNYXBcbiAgICAgICAgICAgIH0sIG5ld1N0YXRlLnByb2ZpbGVzKVxuXG4gICAgICAgICAgICByZXR1cm4gbmV3U3RhdGVcbiAgICAgICAgfVxuXG4gICAgfVxuICAgIHJldHVybiBzdGF0ZVxufSIsImltcG9ydCB7IEFQUEVORF9MQUJTIH0gZnJvbSAnLi4vLi4vY29uc3RhbnRzL3R5cGVzJztcblxuY29uc3QgZGVmYXVsdFN0YXRlID0ge1xuXG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChzdGF0ZSA9IGRlZmF1bHRTdGF0ZSwgYWN0aW9uKSB7XG5cbiAgICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgICAgIGNhc2UgQVBQRU5EX0xBQlM6IHtcbiAgICAgICAgICAgIGxldCBuZXdTdGF0ZSA9IHsgLi4uc3RhdGUgfVxuXG4gICAgICAgICAgICByZXR1cm4gYWN0aW9uLnBheWxvYWQucmVkdWNlKChsYXBNYXAsIGxhYikgPT4ge1xuICAgICAgICAgICAgICAgIGxhcE1hcFtsYWIubGFiLmlkXSA9IGxhYlxuICAgICAgICAgICAgICAgIHJldHVybiBsYXBNYXBcbiAgICAgICAgICAgIH0sbmV3U3RhdGUpXG5cbiAgICAgICAgfVxuXG4gICAgfVxuICAgIHJldHVybiBzdGF0ZVxufSIsImltcG9ydCB7IExBQl9TRUFSQ0hfU1RBUlQsIExBQl9TRUFSQ0ggfSBmcm9tICcuLi8uLi9jb25zdGFudHMvdHlwZXMnO1xuXG5jb25zdCBkZWZhdWx0U3RhdGUgPSB7XG4gICAgbGFiTGlzdDogW10sXG4gICAgTE9BREVEX0xBQlNfU0VBUkNIOiBmYWxzZVxufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoc3RhdGUgPSBkZWZhdWx0U3RhdGUsIGFjdGlvbikge1xuXG4gICAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuXG4gICAgICAgIGNhc2UgTEFCX1NFQVJDSF9TVEFSVDoge1xuICAgICAgICAgICAgbGV0IG5ld1N0YXRlID0geyAuLi5zdGF0ZSB9XG5cbiAgICAgICAgICAgIG5ld1N0YXRlLkxPQURFRF9MQUJTX1NFQVJDSCA9IGZhbHNlXG5cbiAgICAgICAgICAgIHJldHVybiBuZXdTdGF0ZVxuICAgICAgICB9XG5cbiAgICAgICAgY2FzZSBMQUJfU0VBUkNIOiB7XG4gICAgICAgICAgICBsZXQgbmV3U3RhdGUgPSB7IC4uLnN0YXRlIH1cblxuICAgICAgICAgICAgbmV3U3RhdGUubGFiTGlzdCA9IGFjdGlvbi5wYXlsb2FkLm1hcChsYWIgPT4gbGFiLmxhYi5pZClcbiAgICAgICAgICAgIG5ld1N0YXRlLkxPQURFRF9MQUJTX1NFQVJDSCA9IHRydWVcblxuICAgICAgICAgICAgcmV0dXJuIG5ld1N0YXRlXG4gICAgICAgIH1cblxuICAgIH1cbiAgICBcbiAgICByZXR1cm4gc3RhdGVcbn0iLCJpbXBvcnQgeyBBUFBFTkRfRklMVEVSU19ESUFHTk9TSVMsIFRPR0dMRV9DT05ESVRJT05TLCBUT0dHTEVfU1BFQ0lBTElUSUVTLCBTRUxFQ1RfTE9DQVRJT05fRElBR05PU0lTLCBNRVJHRV9TRUFSQ0hfU1RBVEVfTEFCLCBUT0dHTEVfQ1JJVEVSSUEsIFRPR0dMRV9URVNUUywgVE9HR0xFX0RJQUdOT1NJU19DUklURVJJQSwgTE9BRF9TRUFSQ0hfQ1JJVEVSSUFfTEFCIH0gZnJvbSAnLi4vLi4vY29uc3RhbnRzL3R5cGVzJztcblxuY29uc3QgZGVmYXVsdFN0YXRlID0ge1xuICAgIExPQURFRF9TRUFSQ0hfQ1JJVEVSSUFfTEFCOiBmYWxzZSxcbiAgICBjb21tb25fdGVzdHM6IFtdLFxuICAgIGNvbW1vbl9jb25kaXRpb25zOiBbXSxcbiAgICBwcmVmZXJyZWRfbGFiczogW10sXG4gICAgc2VsZWN0ZWRDcml0ZXJpYXM6IFtdLFxuICAgIHNlbGVjdGVkTG9jYXRpb246IG51bGwsXG4gICAgZmlsdGVyQ3JpdGVyaWE6IHtcbiAgICAgICAgcHJpY2VSYW5nZTogWzEwMCwgMTUwMF0sXG4gICAgICAgIGRpc3RhbmNlUmFuZ2U6IFsxLCAzNV0sXG4gICAgICAgIHNvcnRCeTogbnVsbFxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHN0YXRlID0gZGVmYXVsdFN0YXRlLCBhY3Rpb24pIHtcblxuICAgIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICAgICAgY2FzZSBMT0FEX1NFQVJDSF9DUklURVJJQV9MQUI6IHtcbiAgICAgICAgICAgIGxldCBuZXdTdGF0ZSA9IHsgLi4uc3RhdGUgfVxuICAgICAgICAgICAgaWYgKGFjdGlvbi5wYXlsb2FkKSB7XG4gICAgICAgICAgICAgICAgbmV3U3RhdGUgPSB7IC4uLm5ld1N0YXRlLCAuLi5hY3Rpb24ucGF5bG9hZCB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBuZXdTdGF0ZS5MT0FERURfU0VBUkNIX0NSSVRFUklBX0xBQiA9IHRydWVcbiAgICAgICAgICAgIHJldHVybiBuZXdTdGF0ZVxuICAgICAgICB9XG5cbiAgICAgICAgY2FzZSBUT0dHTEVfRElBR05PU0lTX0NSSVRFUklBOiB7XG4gICAgICAgICAgICBsZXQgbmV3U3RhdGUgPSB7XG4gICAgICAgICAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRDcml0ZXJpYXM6IFtdLmNvbmNhdChzdGF0ZS5zZWxlY3RlZENyaXRlcmlhcylcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGV0IGZvdW5kID0gZmFsc2VcbiAgICAgICAgICAgIG5ld1N0YXRlLnNlbGVjdGVkQ3JpdGVyaWFzID0gbmV3U3RhdGUuc2VsZWN0ZWRDcml0ZXJpYXMuZmlsdGVyKChjdXJyKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGN1cnIuaWQgPT0gYWN0aW9uLnBheWxvYWQuY3JpdGVyaWEuaWQgJiYgY3Vyci50eXBlID09IGFjdGlvbi5wYXlsb2FkLnR5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgZm91bmQgPSB0cnVlXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgaWYgKCFmb3VuZCkge1xuICAgICAgICAgICAgICAgIG5ld1N0YXRlLnNlbGVjdGVkQ3JpdGVyaWFzLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAuLi5hY3Rpb24ucGF5bG9hZC5jcml0ZXJpYSxcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogYWN0aW9uLnBheWxvYWQudHlwZVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBuZXdTdGF0ZVxuICAgICAgICB9XG5cbiAgICAgICAgY2FzZSBTRUxFQ1RfTE9DQVRJT05fRElBR05PU0lTOiB7XG4gICAgICAgICAgICBsZXQgbmV3U3RhdGUgPSB7IC4uLnN0YXRlIH1cblxuICAgICAgICAgICAgbmV3U3RhdGUuc2VsZWN0ZWRMb2NhdGlvbiA9IGFjdGlvbi5wYXlsb2FkXG4gICAgICAgICAgICByZXR1cm4gbmV3U3RhdGVcbiAgICAgICAgfVxuXG4gICAgICAgIGNhc2UgTUVSR0VfU0VBUkNIX1NUQVRFX0xBQjoge1xuICAgICAgICAgICAgbGV0IG5ld1N0YXRlID0geyAuLi5zdGF0ZSwgLi4uYWN0aW9uLnBheWxvYWQuc2VhcmNoU3RhdGUsIGZpbHRlckNyaXRlcmlhIDogYWN0aW9uLnBheWxvYWQuZmlsdGVyQ3JpdGVyaWEgfVxuXG4gICAgICAgICAgICByZXR1cm4gbmV3U3RhdGVcbiAgICAgICAgfVxuXG4gICAgfVxuICAgIHJldHVybiBzdGF0ZVxufVxuXG5cblxuXG5cbiIsImltcG9ydCB7Y29tYmluZVJlZHVjZXJzfSBmcm9tICdyZWR1eCc7XG5cbmltcG9ydCBTRUFSQ0hfQ1JJVEVSSUFfT1BEIGZyb20gJy4vb3BkL3NlYXJjaENyaXRlcmlhLmpzJ1xuaW1wb3J0IFNFQVJDSF9DUklURVJJQV9MQUJTIGZyb20gJy4vZGlhZ25vc2lzL3NlYXJjaENyaXRlcmlhLmpzJ1xuaW1wb3J0IERPQ1RPUlMgZnJvbSAnLi9vcGQvZG9jdG9ycy5qcydcbmltcG9ydCBET0NUT1JfU0VBUkNIIGZyb20gJy4vb3BkL2RvY3RvclNlYXJjaC5qcydcbmltcG9ydCBMQUJTIGZyb20gJy4vZGlhZ25vc2lzL2xhYnMuanMnXG5pbXBvcnQgTEFCX1NFQVJDSCBmcm9tICcuL2RpYWdub3Npcy9sYWJzU2VhcmNoLmpzJ1xuaW1wb3J0IFVTRVIgZnJvbSAnLi9jb21tb25zL3VzZXIuanMnXG5pbXBvcnQgQVVUSCBmcm9tICcuL2NvbW1vbnMvYXV0aC5qcydcblxuY29uc3QgYWxsUmVkdWNlcnMgPSBjb21iaW5lUmVkdWNlcnMoe1xuICAgIFNFQVJDSF9DUklURVJJQV9PUEQsXG4gICAgU0VBUkNIX0NSSVRFUklBX0xBQlMsXG4gICAgRE9DVE9SUyxcbiAgICBET0NUT1JfU0VBUkNILFxuICAgIExBQlMsXG4gICAgTEFCX1NFQVJDSCxcbiAgICBVU0VSLFxuICAgIEFVVEhcbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBhbGxSZWR1Y2Vyc1xuIiwiaW1wb3J0IHsgRE9DVE9SX1NFQVJDSCB9IGZyb20gJy4uLy4uL2NvbnN0YW50cy90eXBlcyc7XG5cbmNvbnN0IGRlZmF1bHRTdGF0ZSA9IHtcbiAgICBkb2N0b3JMaXN0OiBbXSxcbiAgICBMT0FESU5HOiB0cnVlLFxuICAgIEVSUk9SOiBudWxsXG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChzdGF0ZSA9IGRlZmF1bHRTdGF0ZSwgYWN0aW9uKSB7XG5cbiAgICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgICAgIGNhc2UgRE9DVE9SX1NFQVJDSDoge1xuICAgICAgICAgICAgbGV0IG5ld1N0YXRlID0geyAuLi5zdGF0ZSB9XG5cbiAgICAgICAgICAgIG5ld1N0YXRlLmRvY3Rvckxpc3QgPSBhY3Rpb24ucGF5bG9hZC5tYXAoZG9jID0+IGRvYy5pZClcbiAgICAgICAgICAgIG5ld1N0YXRlLkxPQURJTkcgPSBmYWxzZVxuXG4gICAgICAgICAgICByZXR1cm4gbmV3U3RhdGVcbiAgICAgICAgfVxuXG4gICAgfVxuICAgIFxuICAgIHJldHVybiBzdGF0ZVxufSIsImltcG9ydCB7IEFQUEVORF9ET0NUT1JTIH0gZnJvbSAnLi4vLi4vY29uc3RhbnRzL3R5cGVzJztcblxuY29uc3QgZGVmYXVsdFN0YXRlID0ge1xuXG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChzdGF0ZSA9IGRlZmF1bHRTdGF0ZSwgYWN0aW9uKSB7XG5cbiAgICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgICAgIGNhc2UgQVBQRU5EX0RPQ1RPUlM6IHtcbiAgICAgICAgICAgIGxldCBuZXdTdGF0ZSA9IHsgLi4uc3RhdGUgfVxuXG4gICAgICAgICAgICByZXR1cm4gYWN0aW9uLnBheWxvYWQucmVkdWNlKChkb2N0b3JNYXAsIGRvY3RvcikgPT4ge1xuICAgICAgICAgICAgICAgIGRvY3Rvck1hcFtkb2N0b3IuaWRdID0gZG9jdG9yXG4gICAgICAgICAgICAgICAgcmV0dXJuIGRvY3Rvck1hcFxuICAgICAgICAgICAgfSxuZXdTdGF0ZSlcblxuICAgICAgICB9XG5cbiAgICB9XG4gICAgcmV0dXJuIHN0YXRlXG59IiwiaW1wb3J0IHsgVE9HR0xFX0NPTkRJVElPTlMsIFRPR0dMRV9TUEVDSUFMSVRJRVMsIFNFTEVDVF9MT0NBVElPTiwgTUVSR0VfU0VBUkNIX1NUQVRFX09QRCwgVE9HR0xFX0NSSVRFUklBLCBUT0dHTEVfVEVTVFMsIFRPR0dMRV9ESUFHTk9TSVNfQ1JJVEVSSUEsIFNFVF9PUERfRklMVEVSUywgTE9BRF9TRUFSQ0hfQ1JJVEVSSUFfT1BEIH0gZnJvbSAnLi4vLi4vY29uc3RhbnRzL3R5cGVzJztcblxuY29uc3QgZGVmYXVsdFN0YXRlID0ge1xuICAgIGNvbW1vbmx5U2VhcmNoZWRDb25kaXRpb25zOiBbeyBpZDogMSwgbmFtZTogJ0hlYWRhY2hlJyB9LCB7IGlkOiAyLCBuYW1lOiAnU3RvbWFjaC1hY2hlJyB9LCB7IGlkOiAzLCBuYW1lOiAnRmx1JyB9LCB7IGlkOiA0LCBuYW1lOiAnSGFpciBGYWxsJyB9LCB7IGlkOiA1LCBuYW1lOiAnQ2hlc3QgUGFpbicgfV0sXG4gICAgc2VsZWN0ZWRDb25kaXRpb25zOiB7fSxcbiAgICBjb21tb25seVNlYXJjaGVkU3BlY2lhbGl0aWVzOiBbeyBpZDogMSwgbmFtZTogJ0dlbmVyYWwgUGh5c2ljaWFsJyB9LCB7IGlkOiAyLCBuYW1lOiAnTmV1cm9sb2d5JyB9LCB7IGlkOiAzLCBuYW1lOiAnQ2FyZGlvbG9naXN0JyB9LCB7IGlkOiA0LCBuYW1lOiAnT3J0aG9wYWVkaWMnIH0sIHsgaWQ6IDUsIG5hbWU6ICdJbmZlcnRpbGl0eScgfV0sXG4gICAgc2VsZWN0ZWRTcGVjaWFsaXRpZXM6IHt9LFxuICAgIHNlbGVjdGVkQ3JpdGVyaWE6IHt9LFxuICAgIHNlbGVjdGVkTG9jYXRpb246IG51bGwsXG4gICAgZmlsdGVyQ3JpdGVyaWE6IHt9LFxuICAgIENSSVRFUklBX0xPQURFRDogZmFsc2Vcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHN0YXRlID0gZGVmYXVsdFN0YXRlLCBhY3Rpb24pIHtcblxuICAgIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICAgICAgY2FzZSBMT0FEX1NFQVJDSF9DUklURVJJQV9PUEQgOiB7XG4gICAgICAgICAgICBsZXQgbmV3U3RhdGUgPSB7Li4uc3RhdGV9XG5cbiAgICAgICAgICAgIG5ld1N0YXRlLkNSSVRFUklBX0xPQURFRCA9IHRydWVcbiAgICAgICAgICAgIG5ld1N0YXRlLmZpbHRlckNyaXRlcmlhID0ge31cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgcmV0dXJuIG5ld1N0YXRlXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGNhc2UgVE9HR0xFX0NPTkRJVElPTlM6IHtcbiAgICAgICAgICAgIGxldCBuZXdTdGF0ZSA9IHtcbiAgICAgICAgICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgICAgICAgICBzZWxlY3RlZENvbmRpdGlvbnMgOiB7XG4gICAgICAgICAgICAgICAgICAgIC4uLnN0YXRlLnNlbGVjdGVkQ29uZGl0aW9uc1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKG5ld1N0YXRlLnNlbGVjdGVkQ29uZGl0aW9uc1thY3Rpb24ucGF5bG9hZC5pZF0pIHtcbiAgICAgICAgICAgICAgICBkZWxldGUgbmV3U3RhdGUuc2VsZWN0ZWRDb25kaXRpb25zW2FjdGlvbi5wYXlsb2FkLmlkXVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBuZXdTdGF0ZS5zZWxlY3RlZENvbmRpdGlvbnNbYWN0aW9uLnBheWxvYWQuaWRdID0gbmV3IERhdGUoKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG5ld1N0YXRlXG4gICAgICAgIH1cblxuICAgICAgICBjYXNlIFRPR0dMRV9TUEVDSUFMSVRJRVM6IHtcbiAgICAgICAgICAgIGxldCBuZXdTdGF0ZSA9IHtcbiAgICAgICAgICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgICAgICAgICBzZWxlY3RlZFNwZWNpYWxpdGllcyA6IHtcbiAgICAgICAgICAgICAgICAgICAgLi4uc3RhdGUuc2VsZWN0ZWRTcGVjaWFsaXRpZXNcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChuZXdTdGF0ZS5zZWxlY3RlZFNwZWNpYWxpdGllc1thY3Rpb24ucGF5bG9hZC5pZF0pIHtcbiAgICAgICAgICAgICAgICBkZWxldGUgbmV3U3RhdGUuc2VsZWN0ZWRTcGVjaWFsaXRpZXNbYWN0aW9uLnBheWxvYWQuaWRdXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG5ld1N0YXRlLnNlbGVjdGVkU3BlY2lhbGl0aWVzW2FjdGlvbi5wYXlsb2FkLmlkXSA9IG5ldyBEYXRlKClcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIG5ld1N0YXRlXG4gICAgICAgIH1cblxuICAgICAgICBjYXNlIFRPR0dMRV9DUklURVJJQToge1xuICAgICAgICAgICAgbGV0IG5ld1N0YXRlID0ge1xuICAgICAgICAgICAgICAgIC4uLnN0YXRlLFxuICAgICAgICAgICAgICAgIHNlbGVjdGVkQ3JpdGVyaWEgOiB7XG4gICAgICAgICAgICAgICAgICAgIC4uLnN0YXRlLnNlbGVjdGVkQ3JpdGVyaWFcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChuZXdTdGF0ZS5zZWxlY3RlZENyaXRlcmlhW2FjdGlvbi5wYXlsb2FkLmlkXSkge1xuICAgICAgICAgICAgICAgIGRlbGV0ZSBuZXdTdGF0ZS5zZWxlY3RlZENyaXRlcmlhW2FjdGlvbi5wYXlsb2FkLmlkXVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBhY3Rpb24ucGF5bG9hZC50cyA9IG5ldyBEYXRlKClcbiAgICAgICAgICAgICAgICBuZXdTdGF0ZS5zZWxlY3RlZENyaXRlcmlhW2FjdGlvbi5wYXlsb2FkLmlkXSA9IGFjdGlvbi5wYXlsb2FkXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBuZXdTdGF0ZVxuICAgICAgICB9XG5cbiAgICAgICAgY2FzZSBTRUxFQ1RfTE9DQVRJT046IHtcbiAgICAgICAgICAgIGxldCBuZXdTdGF0ZSA9IHsgLi4uc3RhdGUgfVxuXG4gICAgICAgICAgICBuZXdTdGF0ZS5zZWxlY3RlZExvY2F0aW9uID0gYWN0aW9uLnBheWxvYWRcbiAgICAgICAgICAgIHJldHVybiBuZXdTdGF0ZVxuICAgICAgICB9XG5cbiAgICAgICAgY2FzZSBTRVRfT1BEX0ZJTFRFUlM6IHtcbiAgICAgICAgICAgIGxldCBuZXdTdGF0ZSA9IHsgLi4uc3RhdGUgfVxuXG4gICAgICAgICAgICBuZXdTdGF0ZS5maWx0ZXJDcml0ZXJpYSA9IGFjdGlvbi5wYXlsb2FkXG4gICAgICAgICAgICByZXR1cm4gbmV3U3RhdGVcbiAgICAgICAgfVxuXG4gICAgICAgIGNhc2UgTUVSR0VfU0VBUkNIX1NUQVRFX09QRDoge1xuICAgICAgICAgICAgbGV0IG5ld1N0YXRlID0geyAuLi5zdGF0ZSB9XG5cbiAgICAgICAgICAgIG5ld1N0YXRlID0gT2JqZWN0LmFzc2lnbihuZXdTdGF0ZSwgYWN0aW9uLnBheWxvYWQpXG4gICAgICAgICAgICBuZXdTdGF0ZS5DUklURVJJQV9MT0FERUQgPSB0cnVlXG4gICAgICAgICAgICByZXR1cm4gbmV3U3RhdGVcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gc3RhdGVcbn1cblxuXG5cblxuXG4iLCJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgQnJvd3NlclJvdXRlciwgU3dpdGNoLCBSb3V0ZSB9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nXG5cbmltcG9ydCB7IFRyYW5zaXRpb25Hcm91cCwgQ1NTVHJhbnNpdGlvbiB9IGZyb20gXCJyZWFjdC10cmFuc2l0aW9uLWdyb3VwXCI7XG5cbmltcG9ydCBTZWFyY2hDcml0ZXJpYSBmcm9tICcuL2NvbnRhaW5lcnMvb3BkL1NlYXJjaENyaXRlcmlhLmpzJ1xuaW1wb3J0IExvY2F0aW9uU2VhcmNoIGZyb20gJy4vY29udGFpbmVycy9vcGQvTG9jYXRpb25TZWFyY2guanMnXG5pbXBvcnQgU2VhcmNoUmVzdWx0cyBmcm9tICcuL2NvbnRhaW5lcnMvb3BkL1NlYXJjaFJlc3VsdHMuanMnXG5pbXBvcnQgU2VhcmNoUmVzdWx0c0ZpbHRlciBmcm9tICcuL2NvbnRhaW5lcnMvb3BkL1NlYXJjaFJlc3VsdHNGaWx0ZXIuanMnXG5pbXBvcnQgRG9jdG9yUHJvZmlsZSBmcm9tICcuL2NvbnRhaW5lcnMvb3BkL0RvY3RvclByb2ZpbGUuanMnXG5pbXBvcnQgQ2xpbmljTGlzdCBmcm9tICcuL2NvbnRhaW5lcnMvb3BkL0NsaW5pY0xpc3QuanMnXG5pbXBvcnQgQXBwb2ludG1lbnRTbG90IGZyb20gJy4vY29udGFpbmVycy9vcGQvQXBwb2ludG1lbnRTbG90LmpzJ1xuaW1wb3J0IFBhdGllbnREZXRhaWxzIGZyb20gJy4vY29udGFpbmVycy9vcGQvUGF0aWVudERldGFpbHMuanMnXG5cbmltcG9ydCBVc2VyUHJvZmlsZSBmcm9tICcuL2NvbnRhaW5lcnMvY29tbW9ucy9Vc2VyUHJvZmlsZS5qcydcbmltcG9ydCBVc2VyQXBwb2ludG1lbnRzIGZyb20gJy4vY29udGFpbmVycy9jb21tb25zL1VzZXJBcHBvaW50bWVudHMuanMnXG5pbXBvcnQgVXNlclJlcG9ydHMgZnJvbSAnLi9jb250YWluZXJzL2NvbW1vbnMvVXNlclJlcG9ydHMuanMnXG5pbXBvcnQgVXNlclNpZ251cCBmcm9tICcuL2NvbnRhaW5lcnMvY29tbW9ucy9Vc2VyU2lnbnVwJ1xuXG5pbXBvcnQgUGF5bWVudCBmcm9tICcuL2NvbnRhaW5lcnMvb3BkL1BheW1lbnQuanMnXG5pbXBvcnQgQm9va2luZyBmcm9tICcuL2NvbnRhaW5lcnMvb3BkL0Jvb2tpbmcuanMnXG5pbXBvcnQgQ3JpdGVyaWFTZWFyY2ggZnJvbSAnLi9jb250YWluZXJzL29wZC9Dcml0ZXJpYVNlYXJjaC5qcydcbmltcG9ydCBEWF9TZWFyY2hDcml0ZXJpYSBmcm9tICcuL2NvbnRhaW5lcnMvZGlhZ25vc2lzL1NlYXJjaENyaXRlcmlhLmpzJ1xuaW1wb3J0IERYX1NlYXJjaFJlc3VsdHMgZnJvbSAnLi9jb250YWluZXJzL2RpYWdub3Npcy9TZWFyY2hSZXN1bHRzLmpzJ1xuaW1wb3J0IExhYiBmcm9tICcuL2NvbnRhaW5lcnMvZGlhZ25vc2lzL0xhYi5qcydcbmltcG9ydCBEWF9QYXRpZW50RGV0YWlscyBmcm9tICcuL2NvbnRhaW5lcnMvZGlhZ25vc2lzL1BhdGllbnREZXRhaWxzLmpzJ1xuaW1wb3J0IERYX0Jvb2tpbmdTdW1tYXJ5IGZyb20gJy4vY29udGFpbmVycy9kaWFnbm9zaXMvQm9va2luZ1N1bW1hcnkuanMnXG5pbXBvcnQgRG9jdG9yQ2hhdCBmcm9tICcuL2NvbnRhaW5lcnMvY29tbW9ucy9DaGF0LmpzJ1xuaW1wb3J0IFRlc3RTZWxlY3RvciBmcm9tICcuL2NvbnRhaW5lcnMvZGlhZ25vc2lzL1Rlc3RTZWxlY3RvcidcblxuXG5jb25zdCByb3V0ZXMgPSBbXG5cbiAgICB7IHBhdGg6ICcvJywgZXhhY3Q6IHRydWUsIGNvbXBvbmVudDogU2VhcmNoQ3JpdGVyaWEgfSxcbiAgICB7IHBhdGg6ICcvbG9jYXRpb25zZWFyY2gnLCBleGFjdDogdHJ1ZSwgY29tcG9uZW50OiBMb2NhdGlvblNlYXJjaCB9LFxuICAgIHsgcGF0aDogJy9jcml0ZXJpYXNlYXJjaCcsIGV4YWN0OiB0cnVlLCBjb21wb25lbnQ6IENyaXRlcmlhU2VhcmNoIH0sXG4gICAgeyBwYXRoOiAnL3NlYXJjaHJlc3VsdHMnLCBleGFjdDogdHJ1ZSwgY29tcG9uZW50OiBTZWFyY2hSZXN1bHRzIH0sXG4gICAgeyBwYXRoOiAnL3NlYXJjaHJlc3VsdHMvZmlsdGVyJywgZXhhY3Q6IHRydWUsIGNvbXBvbmVudDogU2VhcmNoUmVzdWx0c0ZpbHRlciB9LFxuICAgIHsgcGF0aDogJy9kb2N0b3Jwcm9maWxlLzppZCcsIGV4YWN0OiB0cnVlLCBjb21wb25lbnQ6IERvY3RvclByb2ZpbGUgfSxcbiAgICB7IHBhdGg6ICcvZG9jdG9ycHJvZmlsZS86aWQvYXZhaWxhYmlsaXR5JywgZXhhY3Q6IHRydWUsIGNvbXBvbmVudDogQ2xpbmljTGlzdCB9LFxuICAgIHsgcGF0aDogJy9kb2N0b3Jwcm9maWxlLzppZC86Y2xpbmljSWQvYm9vaycsIGV4YWN0OiB0cnVlLCBjb21wb25lbnQ6IEFwcG9pbnRtZW50U2xvdCB9LFxuICAgIHsgcGF0aDogJy9kb2N0b3Jwcm9maWxlLzppZC86Y2xpbmljSWQvYm9va2RldGFpbHMnLCBleGFjdDogdHJ1ZSwgY29tcG9uZW50OiBQYXRpZW50RGV0YWlscyB9LFxuICAgIFxuICAgIHsgcGF0aDogJy91c2VyL3NpZ251cCcsIGV4YWN0OiB0cnVlLCBjb21wb25lbnQ6IFVzZXJTaWdudXAgfSxcbiAgICB7IHBhdGg6ICcvdXNlcicsIGV4YWN0OiB0cnVlLCBjb21wb25lbnQ6IFVzZXJQcm9maWxlIH0sXG4gICAgeyBwYXRoOiAnL3VzZXIvOmlkJywgZXhhY3Q6IHRydWUsIGNvbXBvbmVudDogVXNlclByb2ZpbGUgfSxcbiAgICB7IHBhdGg6ICcvdXNlci86aWQvYXBwb2ludG1lbnRzJywgZXhhY3Q6IHRydWUsIGNvbXBvbmVudDogVXNlckFwcG9pbnRtZW50cyB9LFxuICAgIHsgcGF0aDogJy91c2VyLzppZC9yZXBvcnRzJywgZXhhY3Q6IHRydWUsIGNvbXBvbmVudDogVXNlclJlcG9ydHMgfSxcbiAgICB7IHBhdGg6ICcvY2hhdCcsIGV4YWN0OiB0cnVlLCBjb21wb25lbnQ6IERvY3RvckNoYXQgfSxcbiAgICB7IHBhdGg6ICcvcGF5bWVudCcsIGV4YWN0OiB0cnVlLCBjb21wb25lbnQ6IFBheW1lbnQgfSxcbiAgICB7IHBhdGg6ICcvYm9va2luZy86cmVmSWQnLCBleGFjdDogdHJ1ZSwgY29tcG9uZW50OiBCb29raW5nIH0sXG5cbiAgICB7IHBhdGg6ICcvZHgnLCBleGFjdDogdHJ1ZSwgY29tcG9uZW50OiBEWF9TZWFyY2hDcml0ZXJpYSB9LFxuICAgIHsgcGF0aDogJy9keC9zZWFyY2hyZXN1bHRzJywgZXhhY3Q6IHRydWUsIGNvbXBvbmVudDogRFhfU2VhcmNoUmVzdWx0cyB9LFxuICAgIHsgcGF0aDogJy9sYWIvOmlkJywgZXhhY3Q6IHRydWUsIGNvbXBvbmVudDogTGFiIH0sXG4gICAgeyBwYXRoOiAnL2xhYi86aWQvdGVzdHMnLCBleGFjdDogdHJ1ZSwgY29tcG9uZW50OiBUZXN0U2VsZWN0b3IgfSxcbiAgICB7IHBhdGg6ICcvbGFiLzppZC9ib29rJywgZXhhY3Q6IHRydWUsIGNvbXBvbmVudDogRFhfQm9va2luZ1N1bW1hcnkgfSxcblxuICAgIHsgcGF0aDogJy9sYWIvYm9va2luZy9zdW1tYXJ5LzppZCcsIGV4YWN0OiB0cnVlLCBjb21wb25lbnQ6IERYX0Jvb2tpbmdTdW1tYXJ5IH0sXG5cbl1cblxuY2xhc3MgUm91dGVyQ29uZmlnIGV4dGVuZHMgQ29tcG9uZW50IHtcblxuICAgIHN0YXRpYyBST1VURVMgPSByb3V0ZXNcblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgPFJvdXRlXG4gICAgICAgICAgICAgICAgICAgIHJlbmRlcj17XG4gICAgICAgICAgICAgICAgICAgICAgICAoeyBsb2NhdGlvbiB9KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPFRyYW5zaXRpb25Hcm91cD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxDU1NUcmFuc2l0aW9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5PXtsb2NhdGlvbi5wYXRobmFtZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWVzPVwiZmFkZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGltZW91dD17eyBlbnRlcjogMzAwLCBleGl0OiAwIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXhpdD17ZmFsc2V9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPFN3aXRjaCBsb2NhdGlvbj17bG9jYXRpb259PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7cm91dGVzLm1hcCgocm91dGUsIGkpID0+IChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxSb3V0ZSB7Li4ucm91dGV9IGtleT17aX0gLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9Td2l0Y2g+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NTU1RyYW5zaXRpb24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvVHJhbnNpdGlvbkdyb3VwPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8+XG5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApXG4gICAgfVxuXG59XG5cblxuZXhwb3J0IGRlZmF1bHQgUm91dGVyQ29uZmlnXG5cbiIsIlxuY29uc3QgZGF5cyA9IFsnU3VuZGF5JywgJ01vbmRheScsICdUdWVzZGF5JywgJ1dlZG5lc2RheScsICdUaHVyc2RheScsICdGcmlkYXknLCAnU2F0dXJkYXknXTtcblxuZXhwb3J0IGNvbnN0IGdldFRpbWUgPSAodGltZVN0YW1wKSA9PiB7XG4gICAgdmFyIGRhdGUgPSBuZXcgRGF0ZSh0aW1lU3RhbXApO1xuICAgIHZhciBob3VycyA9IGRhdGUuZ2V0SG91cnMoKTtcbiAgICB2YXIgbWludXRlcyA9IFwiMFwiICsgZGF0ZS5nZXRNaW51dGVzKCk7XG4gICAgcmV0dXJuIGhvdXJzICsgJzonICsgbWludXRlcy5zdWJzdHIoLTIpXG59XG5leHBvcnQgY29uc3QgZ2V0RGF5TmFtZSA9ICh0aW1lU3RhbXApID0+IHtcbiAgICByZXR1cm4gZGF5c1tuZXcgRGF0ZSh0aW1lU3RhbXApLmdldERheSgpXVxuXG59IiwiY29uc3QgcGF0aCA9IHJlcXVpcmUoJ3BhdGgnKTtcbmNvbnN0IGh0dHAgPSByZXF1aXJlKCdodHRwJyk7XG5jb25zdCBFeHByZXNzID0gcmVxdWlyZSgnZXhwcmVzcycpO1xuY29uc3QgYXBwID0gbmV3IEV4cHJlc3MoKTtcbmNvbnN0IHNlcnZlciA9IG5ldyBodHRwLlNlcnZlcihhcHApO1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQgUmVhY3RET01TZXJ2ZXIgZnJvbSAncmVhY3QtZG9tL3NlcnZlcidcbmltcG9ydCB7IFN0YXRpY1JvdXRlciB9IGZyb20gJ3JlYWN0LXJvdXRlcidcbmltcG9ydCBSb3V0ZXMgZnJvbSAnLi9kZXYvanMvcm91dGVzLmpzJ1xuaW1wb3J0IHsgTXVpVGhlbWVQcm92aWRlciwgY3JlYXRlTXVpVGhlbWUsIGNyZWF0ZUdlbmVyYXRlQ2xhc3NOYW1lIH0gZnJvbSAnbWF0ZXJpYWwtdWkvc3R5bGVzJztcbmltcG9ydCB7IFNoZWV0c1JlZ2lzdHJ5IH0gZnJvbSAncmVhY3QtanNzL2xpYi9qc3MnO1xuXG5pbXBvcnQgSnNzUHJvdmlkZXIgZnJvbSAncmVhY3QtanNzL2xpYi9Kc3NQcm92aWRlcic7XG5pbXBvcnQgeyBQcm92aWRlciB9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCB7IGNyZWF0ZVN0b3JlLCBhcHBseU1pZGRsZXdhcmUgfSBmcm9tICdyZWR1eCc7XG5pbXBvcnQgdGh1bmsgZnJvbSAncmVkdXgtdGh1bmsnO1xuaW1wb3J0IHsgY3JlYXRlTG9nZ2VyIH0gZnJvbSAncmVkdXgtbG9nZ2VyJ1xuaW1wb3J0IGFsbFJlZHVjZXJzIGZyb20gJy4vZGV2L2pzL3JlZHVjZXJzL2luZGV4LmpzJztcbmltcG9ydCB7IG1hdGNoUGF0aCB9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nXG5cblxuYXBwLnVzZSgnL2Fzc2V0cycsIEV4cHJlc3Muc3RhdGljKHBhdGguam9pbihfX2Rpcm5hbWUsICdhc3NldHMnKSkpO1xuYXBwLnVzZSgnL2Rpc3QnLCBFeHByZXNzLnN0YXRpYyhwYXRoLmpvaW4oX19kaXJuYW1lLCAnZGlzdCcpKSk7XG5cbmFwcC51c2UoJy9hcGknLCBFeHByZXNzLnN0YXRpYyhwYXRoLmpvaW4oX19kaXJuYW1lLCAnZHVtbXlfYXBpJykpKTtcblxuXG5hcHAuZ2V0KCcqJywgZnVuY3Rpb24gKHJlcSwgcmVzKSB7XG5cbiAgICBjb25zdCBjb250ZXh0ID0ge31cblxuICAgIGNvbnN0IHN0b3JlID0gY3JlYXRlU3RvcmUoXG4gICAgICAgIGFsbFJlZHVjZXJzLCBhcHBseU1pZGRsZXdhcmUodGh1bmspXG4gICAgKTtcblxuICAgIGNvbnN0IHNoZWV0c1JlZ2lzdHJ5ID0gbmV3IFNoZWV0c1JlZ2lzdHJ5KCk7XG4gICAgY29uc3QgdGhlbWUgPSBjcmVhdGVNdWlUaGVtZSh7XG4gICAgICAgIHBhbGV0dGU6IHtcbiAgICAgICAgICAgIHByaW1hcnk6IHtcbiAgICAgICAgICAgICAgICBtYWluOiAnIzAwYjdiMCdcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZWNvbmRhcnk6IHtcbiAgICAgICAgICAgICAgICBtYWluOiAnIzAwYjdiMCdcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIHN0YXR1czoge1xuICAgICAgICAgICAgZGFuZ2VyOiAnb3JhbmdlJyxcbiAgICAgICAgfSxcbiAgICB9KVxuICAgIGNvbnN0IGdlbmVyYXRlQ2xhc3NOYW1lID0gY3JlYXRlR2VuZXJhdGVDbGFzc05hbWUoKTtcblxuICAgIGlmIChjb250ZXh0LnVybCkge1xuICAgICAgICByZXMud3JpdGVIZWFkKDMwMSwge1xuICAgICAgICAgICAgTG9jYXRpb246IGNvbnRleHQudXJsXG4gICAgICAgIH0pXG4gICAgICAgIHJlcy5lbmQoKVxuICAgIH0gZWxzZSB7XG5cbiAgICAgICAgLy8gaW5zaWRlIGEgcmVxdWVzdFxuICAgICAgICBjb25zdCBwcm9taXNlcyA9IFtdXG5cbiAgICAgICAgUm91dGVzLlJPVVRFUy5zb21lKHJvdXRlID0+IHtcbiAgICAgICAgICAgIC8vIHVzZSBgbWF0Y2hQYXRoYCBoZXJlXG4gICAgICAgICAgICBjb25zdCBtYXRjaCA9IG1hdGNoUGF0aChyZXEucGF0aCwgcm91dGUpXG4gICAgICAgICAgICBpZiAobWF0Y2ggJiYgcm91dGUuY29tcG9uZW50LmxvYWREYXRhKVxuICAgICAgICAgICAgICAgIHByb21pc2VzLnB1c2gocm91dGUuY29tcG9uZW50LmxvYWREYXRhKHN0b3JlLCBtYXRjaCkpXG4gICAgICAgICAgICByZXR1cm4gbWF0Y2hcbiAgICAgICAgfSlcblxuICAgICAgICBQcm9taXNlLmFsbChwcm9taXNlcykudGhlbihkYXRhID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHN0b3JlRGF0YSA9IEpTT04uc3RyaW5naWZ5KHN0b3JlLmdldFN0YXRlKCkpXG4gICAgICAgICAgICBjb25zdCBodG1sID0gUmVhY3RET01TZXJ2ZXIucmVuZGVyVG9TdHJpbmcoXG4gICAgICAgICAgICAgICAgPFByb3ZpZGVyIHN0b3JlPXtzdG9yZX0+XG4gICAgICAgICAgICAgICAgICAgIDxKc3NQcm92aWRlciByZWdpc3RyeT17c2hlZXRzUmVnaXN0cnl9IGdlbmVyYXRlQ2xhc3NOYW1lPXtnZW5lcmF0ZUNsYXNzTmFtZX0+XG4gICAgICAgICAgICAgICAgICAgICAgICA8TXVpVGhlbWVQcm92aWRlciB0aGVtZT17dGhlbWV9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxTdGF0aWNSb3V0ZXJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9jYXRpb249e3JlcS51cmx9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQ9e2NvbnRleHR9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Um91dGVzIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9TdGF0aWNSb3V0ZXI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L011aVRoZW1lUHJvdmlkZXI+XG4gICAgICAgICAgICAgICAgICAgIDwvSnNzUHJvdmlkZXI+XG4gICAgICAgICAgICAgICAgPC9Qcm92aWRlcj5cbiAgICAgICAgICAgIClcbiAgICAgICAgICAgIGNvbnN0IGNzcyA9IHNoZWV0c1JlZ2lzdHJ5LnRvU3RyaW5nKClcblxuICAgICAgICAgICAgcmVzLnJlbmRlcignLi9pbmRleC50ZW1wbGF0ZS5lanMnLCB7XG4gICAgICAgICAgICAgICAgaHRtbCwgY3NzLCBzdG9yZURhdGFcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pXG5cbiAgICB9XG5cbn0pO1xuXG5cbmFwcC51c2UoZnVuY3Rpb24gKHJlcSwgcmVzKSB7XG4gICAgcmVzLnNlbmRGaWxlKCdpbmRleC5odG1sJywgeyByb290OiAnLi9kaXN0LycgfSlcbn0pXG5cbnNlcnZlci5saXN0ZW4oMzAwMCwgKGVycikgPT4ge1xuICAgIGlmIChlcnIpIHtcbiAgICAgICAgcmV0dXJuIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICB9XG4gICAgY29uc29sZS5pbmZvKCdTZXJ2ZXIgcnVubmluZyBvbiBodHRwOi8vbG9jYWxob3N0OjMwMDAnKTtcbn0pOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImF4aW9zXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImV4cHJlc3NcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiaHR0cFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJtYXRlcmlhbC11aS1pY29ucy9BY2NvdW50Q2lyY2xlXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm1hdGVyaWFsLXVpLWljb25zL0F0dGFjaE1vbmV5XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm1hdGVyaWFsLXVpLWljb25zL0F2VGltZXJcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibWF0ZXJpYWwtdWktaWNvbnMvQ2FsbFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJtYXRlcmlhbC11aS1pY29ucy9FeHBhbmRNb3JlXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm1hdGVyaWFsLXVpLWljb25zL0ZpbHRlckxpc3RcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibWF0ZXJpYWwtdWktaWNvbnMvSG9tZVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJtYXRlcmlhbC11aS1pY29ucy9LZXlib2FyZEFycm93UmlnaHRcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibWF0ZXJpYWwtdWktaWNvbnMvTG9jYXRpb25PblwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJtYXRlcmlhbC11aS1pY29ucy9QYXltZW50XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm1hdGVyaWFsLXVpLWljb25zL1NvcnRcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibWF0ZXJpYWwtdWkvQ2hlY2tib3hcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibWF0ZXJpYWwtdWkvQ2hpcFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJtYXRlcmlhbC11aS9FeHBhbnNpb25QYW5lbFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJtYXRlcmlhbC11aS9Gb3JtXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm1hdGVyaWFsLXVpL01lbnVcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibWF0ZXJpYWwtdWkvUHJvZ3Jlc3NcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibWF0ZXJpYWwtdWkvUmFkaW9cIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibWF0ZXJpYWwtdWkvU3RlcHBlclwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJtYXRlcmlhbC11aS9zdHlsZXNcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicGF0aFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyYy1zbGlkZXIvbGliL1JhbmdlXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0LWRvbS9zZXJ2ZXJcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhY3QtaW5maW5pdGUtc2Nyb2xsZXJcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhY3QtanNzL2xpYi9Kc3NQcm92aWRlclwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdC1qc3MvbGliL2pzc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdC1yZWR1eFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdC1yb3V0ZXJcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhY3Qtcm91dGVyLWRvbVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdC10cmFuc2l0aW9uLWdyb3VwXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlZHV4XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlZHV4LWxvZ2dlclwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWR1eC10aHVua1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ1bml2ZXJzYWwtY29va2llXCIpOyJdLCJzb3VyY2VSb290IjoiIn0=