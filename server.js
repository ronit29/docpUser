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

	(0, _api.API_GET)(url).then(function (response) {

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

    (0, _api.API_GET)('/api/v1/diagnostic/labsearch').then(function (response) {
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

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

module.exports = Object.assign({}, SEARCH_CRITERIA_OPD, SEARCH_CRITERIA_LABS, DOCTORS_ACTIONS, LABS_ACTIONS, USER_ACTIONS);

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
    baseURL: 'http://localhost:8080',
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

var _index = __webpack_require__(/*! ../commons/labDetails/index.js */ "./dev/js/components/diagnosis/commons/labDetails/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = __webpack_require__(/*! ../commons/orderDetails/index.js */ "./dev/js/components/diagnosis/commons/orderDetails/index.js");

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class BookingSummaryView extends _react2.default.Component {
    constructor(props) {
        super(props);
        this.state = {
            bookingId: null,
            bookingDetails: null
        };
    }

    getLocationParam(tag) {
        // this API assumes the context of react-router-4
        const paramString = this.props.location.search;
        const params = new URLSearchParams(paramString);
        return params.get(tag);
    }

    proceed() {
        this.context.router.history.push('/payment');
    }

    componentDidMount() {
        let bookingId = this.props.match.params.id;
        if (bookingId) {
            this.setState({ bookingId });
            this.props.getLabBookingSummary(bookingId, bookingDetails => {
                this.setState({ bookingDetails: bookingDetails.data });
            });
        }
    }

    render() {

        return _react2.default.createElement(
            'div',
            { className: 'patientDetails' },
            this.state.bookingDetails ? _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(_index2.default, { data: this.state.bookingDetails.lab }),
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
                        this.state.bookingDetails.selectedSlotStart
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'selectedAppointmentSlot' },
                    _react2.default.createElement(
                        'div',
                        { style: { width: '100%', float: 'left' } },
                        _react2.default.createElement(
                            'span',
                            { className: 'appdate' },
                            'Patient Name'
                        ),
                        _react2.default.createElement(
                            'span',
                            { className: 'date' },
                            this.state.bookingDetails.patientDetails.name
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { style: { width: '100%', float: 'left' } },
                        _react2.default.createElement(
                            'span',
                            { className: 'appdate' },
                            'Patient Address'
                        ),
                        _react2.default.createElement(
                            'span',
                            { className: 'date' },
                            this.state.bookingDetails.patientDetails.address
                        )
                    )
                ),
                _react2.default.createElement(_index4.default, { data: this.state.bookingDetails.lab }),
                _react2.default.createElement(
                    'button',
                    { className: 'proceedbtn', onClick: this.proceed.bind(this) },
                    'Proceed to Payment'
                )
            ) : ""
        );
    }
}

BookingSummaryView.contextTypes = {
    router: () => null
};
exports.default = BookingSummaryView;

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
        this.props.history.push(`/lab/${id}/book`);
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
        input.focus();
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
            selectedLab: null
        };
    }

    componentDidMount() {
        let labId = this.props.match.params.id;

        if (labId) {
            this.setState({ selectedLab: labId });
            this.props.getLabById(labId);
        }
    }

    render() {

        return _react2.default.createElement(
            'div',
            { className: 'appointmentSlot' },
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
                    { className: 'v-btn v-btn-primary btn-lg fixed horizontal bottom no-round btn-lg text-lg' },
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
            selectedLab: null
        };
    }

    componentDidMount() {
        let labId = this.props.match.params.id;

        if (labId) {
            this.setState({ selectedLab: labId });
            this.props.getLabById(labId);
        }
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
            { className: 'appointmentSlot' },
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

const mapStateToProps = state => {

    return {};
};

const mapDispatchToProps = dispatch => {
    return {
        getLabBookingSummary: (bookingId, callback) => dispatch((0, _index.getLabBookingSummary)(bookingId, callback))
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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const allReducers = (0, _redux.combineReducers)({
    SEARCH_CRITERIA_OPD: _searchCriteria2.default,
    SEARCH_CRITERIA_LABS: _searchCriteria4.default,
    DOCTORS: _doctors2.default,
    DOCTOR_SEARCH: _doctorSearch2.default,
    LABS: _labs2.default,
    LAB_SEARCH: _labsSearch2.default,
    USER: _user2.default
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

const routes = [{ path: '/', exact: true, component: _SearchCriteria2.default }, { path: '/locationsearch', exact: true, component: _LocationSearch2.default }, { path: '/criteriasearch', exact: true, component: _CriteriaSearch2.default }, { path: '/searchresults', exact: true, component: _SearchResults2.default }, { path: '/searchresults/filter', exact: true, component: _SearchResultsFilter2.default }, { path: '/doctorprofile/:id', exact: true, component: _DoctorProfile2.default }, { path: '/doctorprofile/:id/availability', exact: true, component: _ClinicList2.default }, { path: '/doctorprofile/:id/:clinicId/book', exact: true, component: _AppointmentSlot2.default }, { path: '/doctorprofile/:id/:clinicId/bookdetails', exact: true, component: _PatientDetails2.default }, { path: '/user', exact: true, component: _UserProfile2.default }, { path: '/user/:id', exact: true, component: _UserProfile2.default }, { path: '/user/:id/appointments', exact: true, component: _UserAppointments2.default }, { path: '/user/:id/reports', exact: true, component: _UserReports2.default }, { path: '/chat', exact: true, component: _Chat2.default }, { path: '/payment', exact: true, component: _Payment2.default }, { path: '/booking/:refId', exact: true, component: _Booking2.default }, { path: '/dx', exact: true, component: _SearchCriteria4.default }, { path: '/dx/searchresults', exact: true, component: _SearchResults4.default }, { path: '/lab/:id/book', exact: true, component: _Lab2.default }, { path: '/lab/:id/tests', exact: true, component: _TestSelector2.default }, { path: '/lab/:id/bookdetails', exact: true, component: _PatientDetails4.default }, { path: '/lab/booking/summary/:id', exact: true, component: _BookingSummary2.default }];

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
                            { key: location.pathname,
                                classNames: 'fade',
                                timeout: 300
                            },
                            _react2.default.createElement(
                                _reactRouterDom.Switch,
                                null,
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

    const store = (0, _redux.createStore)(_index2.default);

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
            if (match && route.loadData) promises.push(route.loadData());
            return match;
        });

        Promise.all(promises).then(data => {
            res.render('./index.template.ejs', {
                html, css
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2FjdGlvbnMvY29tbW9ucy91c2VyLmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9hY3Rpb25zL2RpYWdub3Npcy9sYWJTZWFyY2guanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2FjdGlvbnMvZGlhZ25vc2lzL3NlYXJjaENyaXRlcmlhLmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9hY3Rpb25zL2luZGV4LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9hY3Rpb25zL29wZC9kb2N0b3JTZWFyY2guanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2FjdGlvbnMvb3BkL3NlYXJjaENyaXRlcmlhLmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9hcGkvYXBpLmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL2NvbW1vbnMvTG9hZGVyL0xvYWRlci5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9jb21tb25zL0xvYWRlci9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9jb21tb25zL2NoYXQvQ2hhdFZpZXcuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvY29tbW9ucy9jaGF0L2luZGV4LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL2NvbW1vbnMvcHJvZmlsZVNsaWRlci9Qcm9maWxlU2xpZGVyLmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL2NvbW1vbnMvcHJvZmlsZVNsaWRlci9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9jb21tb25zL3RpbWVTbG90U2VsZWN0b3IvVGltZVNsb3RTZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9jb21tb25zL3RpbWVTbG90U2VsZWN0b3IvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvY29tbW9ucy91c2VyQXBwb2ludG1lbnRzL1VzZXJBcHBvaW50bWVudHNWaWV3LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL2NvbW1vbnMvdXNlckFwcG9pbnRtZW50cy9hcHBvaW50bWVudExpc3QvQXBwb2ludG1lbnRMaXN0LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL2NvbW1vbnMvdXNlckFwcG9pbnRtZW50cy9hcHBvaW50bWVudExpc3QvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvY29tbW9ucy91c2VyQXBwb2ludG1lbnRzL2luZGV4LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL2NvbW1vbnMvdXNlclByb2ZpbGUvVXNlclByb2ZpbGVWaWV3LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL2NvbW1vbnMvdXNlclByb2ZpbGUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvY29tbW9ucy91c2VyUHJvZmlsZS9wcm9maWxlRGF0YS9Qcm9maWxlRGF0YS5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9jb21tb25zL3VzZXJQcm9maWxlL3Byb2ZpbGVEYXRhL2luZGV4LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL2NvbW1vbnMvdXNlclJlcG9ydHMvVXNlclJlcG9ydHNWaWV3LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL2NvbW1vbnMvdXNlclJlcG9ydHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvY29tbW9ucy91c2VyUmVwb3J0cy9yZXBvcnRMaXN0L1JlcG9ydExpc3QuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvY29tbW9ucy91c2VyUmVwb3J0cy9yZXBvcnRMaXN0L2luZGV4LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL2RpYWdub3Npcy9ib29raW5nU3VtbWFyeS9Cb29raW5nU3VtbWFyeVZpZXcuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvZGlhZ25vc2lzL2Jvb2tpbmdTdW1tYXJ5L2luZGV4LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL2RpYWdub3Npcy9jb21tb25zL2NvbW1vbmx5U2VhcmNoZWQvQ29tbW9ubHlTZWFyY2hlZC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9kaWFnbm9zaXMvY29tbW9ucy9jb21tb25seVNlYXJjaGVkL2luZGV4LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL2RpYWdub3Npcy9jb21tb25zL2xhYkRldGFpbHMvTGFiRGV0YWlsLmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL2RpYWdub3Npcy9jb21tb25zL2xhYkRldGFpbHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvZGlhZ25vc2lzL2NvbW1vbnMvbGFiUHJvZmlsZUNhcmQvTGFiUHJvZmlsZUNhcmQuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvZGlhZ25vc2lzL2NvbW1vbnMvbGFiUHJvZmlsZUNhcmQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvZGlhZ25vc2lzL2NvbW1vbnMvbGFiVGVzdHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvZGlhZ25vc2lzL2NvbW1vbnMvbGFiVGVzdHMvbGFiVGVzdHMuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvZGlhZ25vc2lzL2NvbW1vbnMvb3JkZXJEZXRhaWxzL09yZGVyRGV0YWlscy5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9kaWFnbm9zaXMvY29tbW9ucy9vcmRlckRldGFpbHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvZGlhZ25vc2lzL2NyaXRlcmlhU2VhcmNoL0NyaXRlcmlhU2VhcmNoVmlldy5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9kaWFnbm9zaXMvY3JpdGVyaWFTZWFyY2gvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvZGlhZ25vc2lzL2xhYi9MYWJWaWV3LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL2RpYWdub3Npcy9sYWIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvZGlhZ25vc2lzL3BhdGllbnREZXRhaWxzL1BhdGllbnREZXRhaWxzVmlldy5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9kaWFnbm9zaXMvcGF0aWVudERldGFpbHMvYWRkcmVzc0Zvcm0vQWRkcmVzc0Zvcm0uanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvZGlhZ25vc2lzL3BhdGllbnREZXRhaWxzL2FkZHJlc3NGb3JtL2luZGV4LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL2RpYWdub3Npcy9wYXRpZW50RGV0YWlscy9kZXRhaWxzRm9ybS9EZXRhaWxzRm9ybS5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9kaWFnbm9zaXMvcGF0aWVudERldGFpbHMvZGV0YWlsc0Zvcm0vaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvZGlhZ25vc2lzL3BhdGllbnREZXRhaWxzL2luZGV4LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL2RpYWdub3Npcy9zZWFyY2hDcml0ZXJpYS9TZWFyY2hDcml0ZXJpYVZpZXcuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvZGlhZ25vc2lzL3NlYXJjaENyaXRlcmlhL2luZGV4LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL2RpYWdub3Npcy9zZWFyY2hSZXN1bHRzL1NlYXJjaFJlc3VsdHNWaWV3LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL2RpYWdub3Npcy9zZWFyY2hSZXN1bHRzL2luZGV4LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL2RpYWdub3Npcy9zZWFyY2hSZXN1bHRzL2xhYnNMaXN0L0xhYnNMaXN0LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL2RpYWdub3Npcy9zZWFyY2hSZXN1bHRzL2xhYnNMaXN0L2luZGV4LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL2RpYWdub3Npcy9zZWFyY2hSZXN1bHRzL3RvcEJhci9Ub3BCYXIuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvZGlhZ25vc2lzL3NlYXJjaFJlc3VsdHMvdG9wQmFyL2luZGV4LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL2RpYWdub3Npcy90ZXN0U2VsZWN0b3IvVGVzdFNlbGVjdG9yLmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL2RpYWdub3Npcy90ZXN0U2VsZWN0b3IvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvb3BkL2FwcG9pbnRtZW50U2xvdC9BcHBvaW50bWVudFNsb3QuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvb3BkL2FwcG9pbnRtZW50U2xvdC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9vcGQvYm9va2luZy9Cb29raW5nVmlldy5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9vcGQvY2xpbmljTGlzdC9DbGluaWNMaXN0Vmlldy5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9vcGQvY2xpbmljTGlzdC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9vcGQvY29tbW9ucy9jbGluaWNTZWxlY3Rvci9DbGluaWNTZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9vcGQvY29tbW9ucy9jbGluaWNTZWxlY3Rvci9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9vcGQvY29tbW9ucy9jb21tb25seVNlYXJjaGVkL0NvbW1vbmx5U2VhcmNoZWQuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvb3BkL2NvbW1vbnMvY29tbW9ubHlTZWFyY2hlZC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9vcGQvY29tbW9ucy9jcml0ZXJpYVNlbGVjdG9yL0NyaXRlcmlhU2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvb3BkL2NvbW1vbnMvY3JpdGVyaWFTZWxlY3Rvci9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9vcGQvY29tbW9ucy9kb2N0b3JQcm9maWxlQ2FyZC9Eb2N0b3JQcm9maWxlQ2FyZC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9vcGQvY29tbW9ucy9kb2N0b3JQcm9maWxlQ2FyZC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9vcGQvY29tbW9ucy9zZWxlY3RlZENsaW5pYy9TZWxlY3RlZENsaW5pYy5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9vcGQvY29tbW9ucy9zZWxlY3RlZENsaW5pYy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9vcGQvY3JpdGVyaWFTZWFyY2gvQ3JpdGVyaWFTZWFyY2hWaWV3LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL29wZC9jcml0ZXJpYVNlYXJjaC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9vcGQvZG9jdG9yUHJvZmlsZS9Eb2N0b3JQcm9maWxlVmlldy5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9vcGQvZG9jdG9yUHJvZmlsZS9hYm91dERvY3Rvci9BYm91dERvY3Rvci5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9vcGQvZG9jdG9yUHJvZmlsZS9hYm91dERvY3Rvci9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9vcGQvZG9jdG9yUHJvZmlsZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9vcGQvZG9jdG9yUHJvZmlsZS9wcm9mZXNzaW9uYWxHcmFwaC9Qcm9mZXNzaW9uYWxHcmFwaC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9vcGQvZG9jdG9yUHJvZmlsZS9wcm9mZXNzaW9uYWxHcmFwaC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9vcGQvbG9jYXRpb25TZWFyY2gvTG9jYXRpb25TZWFyY2guanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvb3BkL2xvY2F0aW9uU2VhcmNoL2luZGV4LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL29wZC9wYXRpZW50RGV0YWlscy9QYXRpZW50RGV0YWlscy5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9vcGQvcGF0aWVudERldGFpbHMvZGV0YWlsc0Zvcm0vRGV0YWlsc0Zvcm0uanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvb3BkL3BhdGllbnREZXRhaWxzL2RldGFpbHNGb3JtL2luZGV4LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL29wZC9wYXRpZW50RGV0YWlscy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9vcGQvcGF5bWVudC9QYXltZW50Vmlldy5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9vcGQvc2VhcmNoQ3JpdGVyaWEvU2VhcmNoQ3JpdGVyaWFWaWV3LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL29wZC9zZWFyY2hDcml0ZXJpYS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9vcGQvc2VhcmNoUmVzdWx0cy9TZWFyY2hSZXN1bHRzVmlldy5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9vcGQvc2VhcmNoUmVzdWx0cy9kb2N0b3JzTGlzdC9Eb2N0b3JzTGlzdC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9vcGQvc2VhcmNoUmVzdWx0cy9kb2N0b3JzTGlzdC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9vcGQvc2VhcmNoUmVzdWx0cy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9vcGQvc2VhcmNoUmVzdWx0cy90b3BCYXIvVG9wQmFyLmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL29wZC9zZWFyY2hSZXN1bHRzL3RvcEJhci9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9vcGQvc2VhcmNoUmVzdWx0c0ZpbHRlci9TZWFyY2hSZXN1bHRzRmlsdGVyLmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL29wZC9zZWFyY2hSZXN1bHRzRmlsdGVyL2luZGV4LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb25zdGFudHMvdHlwZXMuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbnRhaW5lcnMvY29tbW9ucy9DaGF0LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb250YWluZXJzL2NvbW1vbnMvVXNlckFwcG9pbnRtZW50cy5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29udGFpbmVycy9jb21tb25zL1VzZXJQcm9maWxlLmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb250YWluZXJzL2NvbW1vbnMvVXNlclJlcG9ydHMuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbnRhaW5lcnMvZGlhZ25vc2lzL0Jvb2tpbmdTdW1tYXJ5LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb250YWluZXJzL2RpYWdub3Npcy9MYWIuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbnRhaW5lcnMvZGlhZ25vc2lzL1BhdGllbnREZXRhaWxzLmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb250YWluZXJzL2RpYWdub3Npcy9TZWFyY2hDcml0ZXJpYS5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29udGFpbmVycy9kaWFnbm9zaXMvU2VhcmNoUmVzdWx0cy5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29udGFpbmVycy9kaWFnbm9zaXMvVGVzdFNlbGVjdG9yLmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb250YWluZXJzL29wZC9BcHBvaW50bWVudFNsb3QuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbnRhaW5lcnMvb3BkL0Jvb2tpbmcuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbnRhaW5lcnMvb3BkL0NsaW5pY0xpc3QuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbnRhaW5lcnMvb3BkL0NyaXRlcmlhU2VhcmNoLmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb250YWluZXJzL29wZC9Eb2N0b3JQcm9maWxlLmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb250YWluZXJzL29wZC9Mb2NhdGlvblNlYXJjaC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29udGFpbmVycy9vcGQvUGF0aWVudERldGFpbHMuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbnRhaW5lcnMvb3BkL1BheW1lbnQuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbnRhaW5lcnMvb3BkL1NlYXJjaENyaXRlcmlhLmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb250YWluZXJzL29wZC9TZWFyY2hSZXN1bHRzLmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb250YWluZXJzL29wZC9TZWFyY2hSZXN1bHRzRmlsdGVyLmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9oZWxwZXJzL25hdmlnYXRlL2luZGV4LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9oZWxwZXJzL25hdmlnYXRlL25hdmlnYXRlLmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9oZWxwZXJzL3N0b3JhZ2UvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2hlbHBlcnMvc3RvcmFnZS9zdG9yYWdlLmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9yZWR1Y2Vycy9jb21tb25zL3VzZXIuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL3JlZHVjZXJzL2RpYWdub3Npcy9sYWJzLmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9yZWR1Y2Vycy9kaWFnbm9zaXMvbGFic1NlYXJjaC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvcmVkdWNlcnMvZGlhZ25vc2lzL3NlYXJjaENyaXRlcmlhLmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9yZWR1Y2Vycy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvcmVkdWNlcnMvb3BkL2RvY3RvclNlYXJjaC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvcmVkdWNlcnMvb3BkL2RvY3RvcnMuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL3JlZHVjZXJzL29wZC9zZWFyY2hDcml0ZXJpYS5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvcm91dGVzLmpzIiwid2VicGFjazovLy8uL2Rldi9qcy91dGlscy9kYXRlVGltZVV0aWxzLmpzIiwid2VicGFjazovLy8uL2luZGV4LmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcImF4aW9zXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZXhwcmVzc1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcImh0dHBcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJtYXRlcmlhbC11aS1pY29ucy9BY2NvdW50Q2lyY2xlXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibWF0ZXJpYWwtdWktaWNvbnMvQXR0YWNoTW9uZXlcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJtYXRlcmlhbC11aS1pY29ucy9BdlRpbWVyXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibWF0ZXJpYWwtdWktaWNvbnMvQ2FsbFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIm1hdGVyaWFsLXVpLWljb25zL0V4cGFuZE1vcmVcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJtYXRlcmlhbC11aS1pY29ucy9GaWx0ZXJMaXN0XCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibWF0ZXJpYWwtdWktaWNvbnMvSG9tZVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIm1hdGVyaWFsLXVpLWljb25zL0tleWJvYXJkQXJyb3dSaWdodFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIm1hdGVyaWFsLXVpLWljb25zL0xvY2F0aW9uT25cIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJtYXRlcmlhbC11aS1pY29ucy9QYXltZW50XCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibWF0ZXJpYWwtdWktaWNvbnMvU29ydFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIm1hdGVyaWFsLXVpL0NoZWNrYm94XCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibWF0ZXJpYWwtdWkvQ2hpcFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIm1hdGVyaWFsLXVpL0V4cGFuc2lvblBhbmVsXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibWF0ZXJpYWwtdWkvRm9ybVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIm1hdGVyaWFsLXVpL01lbnVcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJtYXRlcmlhbC11aS9Qcm9ncmVzc1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcIm1hdGVyaWFsLXVpL1JhZGlvXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibWF0ZXJpYWwtdWkvU3RlcHBlclwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIm1hdGVyaWFsLXVpL3N0eWxlc1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcInBhdGhcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyYy1zbGlkZXIvbGliL1JhbmdlXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVhY3RcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWFjdC1kb20vc2VydmVyXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVhY3QtaW5maW5pdGUtc2Nyb2xsZXJcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWFjdC1qc3MvbGliL0pzc1Byb3ZpZGVyXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVhY3QtanNzL2xpYi9qc3NcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWFjdC1yZWR1eFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInJlYWN0LXJvdXRlclwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInJlYWN0LXJvdXRlci1kb21cIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWFjdC10cmFuc2l0aW9uLWdyb3VwXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVkdXhcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWR1eC1sb2dnZXJcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWR1eC10aHVua1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcInVuaXZlcnNhbC1jb29raWVcIiJdLCJuYW1lcyI6WyJnZXRVc2VyUHJvZmlsZSIsImRpc3BhdGNoIiwidGhlbiIsInJlc3BvbnNlIiwidHlwZSIsInBheWxvYWQiLCJwcm9maWxlcyIsImNhdGNoIiwiZXJyb3IiLCJnZXRVc2VyUHJvZmlsZVdpdGhBcHBvaW50bWVudHMiLCJnZXRVc2VyUHJvZmlsZVdpdGhUZXN0cyIsImdldExhYnMiLCJzZWFyY2hTdGF0ZSIsImZpbHRlckNyaXRlcmlhIiwibWVyZ2VTdGF0ZSIsInRlc3RJZHMiLCJzZWxlY3RlZENyaXRlcmlhcyIsImZpbHRlciIsIngiLCJyZWR1Y2UiLCJmaW5hbFN0ciIsImN1cnIiLCJpIiwiaWQiLCJsYXQiLCJsb25nIiwic2VsZWN0ZWRMb2NhdGlvbiIsImdlb21ldHJ5IiwibG9jYXRpb24iLCJsbmciLCJtaW5fZGlzdGFuY2UiLCJkaXN0YW5jZVJhbmdlIiwibWF4X2Rpc3RhbmNlIiwibWluX3ByaWNlIiwicHJpY2VSYW5nZSIsIm1heF9wcmljZSIsIm9yZGVyX2J5Iiwic29ydEJ5IiwidXJsIiwiZ2V0TGFiQnlJZCIsImxhYklkIiwiZ2V0TGFiVGltZVNsb3RzIiwiY2FsbGJhY2siLCJnZXRMYWJCb29raW5nU3VtbWFyeSIsImJvb2tpbmdJZCIsImxvYWRMYWJDb21tb25Dcml0ZXJpYXMiLCJ0b2dnbGVEaWFnbm9zaXNDcml0ZXJpYSIsImNyaXRlcmlhIiwiZ2V0RGlhZ25vc2lzQ3JpdGVyaWFSZXN1bHRzIiwic2VhcmNoU3RyaW5nIiwiU0VBUkNIX0NSSVRFUklBX09QRCIsIlNFQVJDSF9DUklURVJJQV9MQUJTIiwiRE9DVE9SU19BQ1RJT05TIiwiTEFCU19BQ1RJT05TIiwiVVNFUl9BQ1RJT05TIiwibW9kdWxlIiwiZXhwb3J0cyIsIk9iamVjdCIsImFzc2lnbiIsImdldERvY3RvcnMiLCJmaWx0ZXJTdGF0ZSIsImRvY3RvcnMiLCJzZWFyY2hTdGF0ZVBhcmFtIiwiZW5jb2RlVVJJQ29tcG9uZW50IiwiSlNPTiIsInN0cmluZ2lmeSIsImZpbHRlclN0YXRlUGFyYW0iLCJoaXN0b3J5IiwicmVwbGFjZVN0YXRlIiwiZ2V0RG9jdG9yQnlJZCIsImRvY3RvcklkIiwiZG9jdG9yIiwiZG9jIiwiZ2V0VGltZVNsb3RzIiwiY2xpbmljSWQiLCJsb2FkU2VhcmNoQ3JpdGVyaWEiLCJ0b2dnbGVDb25kaXRpb24iLCJ0b2dnbGVTcGVjaWFsaXR5IiwidG9nZ2xlQ3JpdGVyaWEiLCJzZWxlY3RMb2NhdGlvbiIsIm1lcmdlU2VhcmNoU3RhdGUiLCJzdGF0ZSIsImdldENyaXRlcmlhUmVzdWx0cyIsInNldE9QREZpbHRlcnMiLCJmaWx0ZXJEYXRhIiwiYXhpb3NJbnN0YW5jZSIsImNyZWF0ZSIsImJhc2VVUkwiLCJoZWFkZXIiLCJyZWplY3RIYW5kbGVyIiwiQVBJX0dFVCIsImdldEF1dGhUb2tlbiIsInRva2VuIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJtZXRob2QiLCJoZWFkZXJzIiwicmVzIiwiZGF0YSIsIkFQSV9QT1NUIiwiQVBJX1BVVCIsIkFQSV9ERUxFVEUiLCJMb2FkZXIiLCJDb21wb25lbnQiLCJjb25zdHJ1Y3RvciIsInByb3BzIiwicmVuZGVyIiwiSWZyYW1TdHlsZSIsIndpZHRoIiwiaGVpZ2h0IiwiQ2hhdFZpZXciLCJjb250ZXh0VHlwZXMiLCJyb3V0ZXIiLCJQcm9maWxlU2xpZGVyIiwic3dpdGNoVXNlciIsInByb2ZpbGVJZCIsImNvbnRleHQiLCJwdXNoIiwic3ViUm91dGUiLCJrZXlzIiwibWFwIiwic3JjIiwicHJvZmlsZUltYWdlIiwiYmluZCIsIlRpbWVTbG90U2VsZWN0b3IiLCJzZWxlY3RlZERheSIsInNlbGVjdGVkSW50ZXJ2YWwiLCJzZWxlY3RlZFRpbWVTbG90IiwiY29tcG9uZW50V2lsbE1vdW50IiwidGltZVNsb3RzIiwic2V0RGVmYXVsdFNlbGVjdGVkIiwiZGF5cyIsImRhdGVzIiwiZGVmYXVsdERheUluZGV4IiwiZ2V0Rmlyc3RBdmFpbGFibGVEYXkiLCJzZXRTdGF0ZSIsImRlZmF1dEludGVyd2FsSW5kZXgiLCJnZXRGaXJzdEF2YWlsYWJsZUludGVyd2FsIiwiaW50ZXJ2YWxzIiwiZGVmYXVsdFRpbWVTbG90SW5kZXgiLCJnZXRGaXJzdEF2YWlsYWJsZVRpbWVTbG90IiwiaW50ZXJ3YWxJbmRleCIsImludGVyd2FsIiwiaXNBdmFpbGFibGUiLCJwYXJzZUludCIsInRpbWVTbG90SW5kZXgiLCJ0aW1lU2xvdCIsInNlbGVjdFRpbWVTbG90IiwiZGF5SW5kZXgiLCJkYXkiLCJvbkRhdGVDbGljayIsImRhdGUiLCJzZWxlY3RlZEluZGV4IiwiaW5kZXgiLCJhdmFpbGFibGVJbnRlcndhbCIsImF2YWlsYWJsZVRpbWVTbG90Iiwib25JbnRlcnZhbENsaWNrIiwib25UaW1lU2xvdENsaWNrIiwiZGF0ZUxpc3QiLCJkYXlEYXRlIiwiRGF0ZSIsImdldERhdGUiLCJkYXlOYW1lIiwic2VsZWN0ZWQiLCJpbnRlcnZhbCIsIm5hbWUiLCJzbG90Iiwic2xvdFRleHQiLCJzdGFydCIsImVuZCIsIlVzZXJBcHBvaW50bWVudHNWaWV3IiwiY29tcG9uZW50RGlkTW91bnQiLCJjb21wYXJlRGF0ZVdpdGhUb2RheSIsInRvZGF5IiwiZ2V0VGltZSIsInNlbGVjdGVkVXNlciIsInVzZXJQcm9maWxlSWQiLCJtYXRjaCIsInBhcmFtcyIsIlVTRVIiLCJpc0RlZmF1bHRVc2VyIiwiYXBwb2ludG1lbnRzIiwiYXBwb2ludG1lbnQiLCJBcHBvaW50bWVudExpc3QiLCJ1bml4X3RpbWVzdGFtcCIsImhvdXJzIiwiZ2V0SG91cnMiLCJtaW51dGVzIiwiZ2V0TWludXRlcyIsInN1YnN0ciIsImRvY3Rvck5hbWUiLCJ0b0RhdGVTdHJpbmciLCJVc2VyUHJvZmlsZVZpZXciLCJQcm9maWxlRGF0YSIsIm9wZW5BcHBvaW50bWVudHMiLCJvcGVuUmVwb3J0cyIsImdlbmRlciIsImFnZSIsIm1vYmlsZSIsIm1lZGljYWxIaXN0b3J5Q291bnQiLCJtZWRpY2FsVGVzdENvdW50Iiwib25saW5lQ29uc3VsdGF0aW9uQ291bnQiLCJvcGRWaXNpdENvdW50IiwicHJvZmlsZURhdGEiLCJVc2VyUmVwb3J0c1ZpZXciLCJ0ZXN0cyIsInRlc3QiLCJSZXBvcnRMaXN0Iiwic3ViX25hbWUiLCJhYmJyZXZpYXRpb24iLCJjYXRlZ29yeSIsIkJvb2tpbmdTdW1tYXJ5VmlldyIsImJvb2tpbmdEZXRhaWxzIiwiZ2V0TG9jYXRpb25QYXJhbSIsInRhZyIsInBhcmFtU3RyaW5nIiwic2VhcmNoIiwiVVJMU2VhcmNoUGFyYW1zIiwiZ2V0IiwicHJvY2VlZCIsImxhYiIsInNlbGVjdGVkU2xvdFN0YXJ0IiwiZmxvYXQiLCJwYXRpZW50RGV0YWlscyIsImFkZHJlc3MiLCJDb21tb25seVNlYXJjaGVkIiwicm93cyIsInJvdyIsInRvZ2dsZSIsImRpdkNsYXNzIiwidWxDbGFzcyIsImhlYWRpbmciLCJMYWJEZXRhaWxzIiwiTGFiUHJvZmlsZUNhcmQiLCJvcGVuTGFiIiwicHJpY2UiLCJkZXRhaWxzIiwiTGFiVGVzdHMiLCJvcGVuVGVzdHMiLCJsZW5ndGgiLCJtcnAiLCJzbGljZSIsIk9yZGVyRGV0YWlscyIsInByaWNlX2JyZWFrdXAiLCJ0b3RhbFByaWNlIiwidG90YWxUZXN0cyIsImJyZWFrdXAiLCJhbW91bnQiLCJkZWJvdW5jZXIiLCJmbiIsImRlbGF5IiwidGltZXIiLCJjbGVhclRpbWVvdXQiLCJzZXRUaW1lb3V0IiwiY2FsbCIsIkNyaXRlcmlhU2VhcmNoVmlldyIsInNlYXJjaFZhbHVlIiwic2VhcmNoUmVzdWx0cyIsImdldFNlYXJjaFJlc3VsdHMiLCJpbnB1dCIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJmb2N1cyIsImlucHV0SGFuZGxlciIsImUiLCJ0YXJnZXQiLCJ2YWx1ZSIsImFkZENyaXRlcmlhIiwiZm9ybWF0dGVkX2FkZHJlc3MiLCJnbyIsImNoZWNrRm9yTG9hZCIsImNoaWxkcmVuIiwiTGFiVmlldyIsInNlbGVjdGVkTGFiIiwiTEFCUyIsIlBhdGllbnREZXRhaWxzVmlldyIsInNlbGVjdGVkVGVzdHMiLCJzZWxlY3RlZFNsb3QiLCJzZWxlY3RlZFNsb3RFbmQiLCJwYXJzZUZsb2F0IiwidG9TdHJpbmciLCJBZGRyZXNzRm9ybSIsImxvY2FsaXR5IiwibGFuZG1hcmsiLCJwaW5jb2RlIiwiY2l0eSIsIndoaWNoIiwiRGV0YWlsc0Zvcm0iLCJwYXRpZW50TmFtZSIsInBhdGllbnRFbWFpbCIsInBhdGllbnRHZW5kZXIiLCJvdHAiLCJwYXRpZW50TW9iaWxlIiwiU2VhcmNoQ3JpdGVyaWFWaWV3Iiwic2VhcmNoUHJvY2VlZCIsInNlYXJjaERhdGEiLCJMT0FERURfU0VBUkNIX0NSSVRFUklBX0xBQiIsImNvbW1vbl90ZXN0cyIsImNvbW1vbl9jb25kaXRpb25zIiwicHJlZmVycmVkX2xhYnMiLCJTZWFyY2hSZXN1bHRzVmlldyIsInBhcnNlIiwiZ2V0TGFiTGlzdCIsImNvbnNvbGUiLCJhcHBseUZpbHRlcnMiLCJyZXBsYWNlIiwiTE9BREVEX0xBQlNfU0VBUkNIIiwiTGFic0xpc3QiLCJsYWJMaXN0IiwiVG9wQmFyIiwiYW5jaG9yRWwiLCJvcGVuRmlsdGVyIiwiY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyIsImhhbmRsZU9wZW4iLCJldmVudCIsImN1cnJlbnRUYXJnZXQiLCJoYW5kbGVDbG9zZSIsInRvZ2dsZUZpbHRlciIsImhhbmRsZVJhbmdlIiwicmFuZ2UiLCJnZXRDcml0ZXJpYVN0cmluZyIsImZpbmFsIiwiY3JpdGVyaWFTdHIiLCJCb29sZWFuIiwic3RvcFByb3BhZ2F0aW9uIiwicHJldmVudERlZmF1bHQiLCJUZXN0U2VsZWN0b3JWaWV3IiwidG9nZ2xlVGVzdCIsImxhYkRhdGEiLCJpbmRleE9mIiwiQXBwb2ludG1lbnRTbG90Iiwic2VsZWN0ZWREb2N0b3IiLCJzZWxlY3RlZENsaW5pYyIsIkRPQ1RPUlMiLCJCb29raW5nVmlldyIsIkNsaW5pY0xpc3RWaWV3IiwiQ2xpbmljU2VsZWN0b3IiLCJzZWxlY3RDbGluaWMiLCJnZXRBdmFpbGFiaWxpdHkiLCJhdmFpbGFiaWxpdHkiLCJuZXh0QXZhaWxhYmxlIiwiZnJvbSIsInRpbWVTdGFydCIsInRpbWVFbmQiLCJ0byIsImZlZSIsImNsaW5pYyIsInRpbWVBdmFpbGFibGUiLCJwaWxscyIsInBpbGwiLCJ0b2dnbGVQaWxsIiwiQ3JpdGVyaWFTZWxlY3RvciIsImhhbmRsZURlbGV0ZSIsImhhbmRsZXIiLCJjb25kaXRpb25zIiwic3BlY2lhbGl0aWVzIiwiY3JpdGVyaWFzIiwiY29tbW9ubHlTZWFyY2hlZENvbmRpdGlvbnMiLCJzZWxlY3RlZENvbmRpdGlvbnMiLCJ0cyIsImNvbW1vbmx5U2VhcmNoZWRTcGVjaWFsaXRpZXMiLCJzZWxlY3RlZFNwZWNpYWxpdGllcyIsInNlbGVjdGVkQ3JpdGVyaWEiLCJzb3J0IiwiYSIsImIiLCJkYXRlQSIsImRhdGVCIiwiRG9jdG9yUHJvZmlsZUNhcmQiLCJjYXJkQ2xpY2siLCJib29rTm93IiwiZ2V0UXVhbGlmaWNhdGlvblN0ciIsInF1YWxpZmljYXRpb25TcGVjaWFsaXphdGlvbiIsInN0ciIsInF1YWxpZmljYXRpb24iLCJzcGVjaWFsaXphdGlvbiIsInByb2ZpbGVfaW1nIiwicHJhY3RpY2VfZHVyYXRpb24iLCJjb25zdWx0YXRpb25Db3VudCIsInBhc3RFeHBlcmllbmNlIiwicXVhbGlmaWNhdGlvblN0cmluZyIsImhpZGVCb29rTm93IiwiaGlkZUJvdHRvbSIsIlNlbGVjdGVkQ2xpbmljIiwiY2xpbmljRGF0YSIsInJlc3VsdCIsImdvQmFjayIsInJlc3VsdERhdGEiLCJqIiwiRG9jdG9yUHJvZmlsZVZpZXciLCJBYm91dERvY3RvciIsIlByb2Zlc3Npb25hbEdyYXBoIiwiTG9jYXRpb25TZWFyY2giLCJnZXRMb2NhdGlvbiIsImF1dG8iLCJnb29nbGUiLCJtYXBzIiwicGxhY2VzIiwiQXV0b2NvbXBsZXRlU2VydmljZSIsInJlcXVlc3QiLCJ0eXBlcyIsImNvbXBvbmVudFJlc3RyaWN0aW9ucyIsImNvdW50cnkiLCJnZXRQbGFjZVByZWRpY3Rpb25zIiwicmVzdWx0cyIsInN0YXR1cyIsIk1hcCIsImNlbnRlciIsInpvb20iLCJzZXJ2aWNlIiwiUGxhY2VzU2VydmljZSIsImdldERldGFpbHMiLCJyZWZlcmVuY2UiLCJwbGFjZSIsImRlc2NyaXB0aW9uIiwiZGlzcGxheSIsIlBhdGllbnREZXRhaWxzIiwiUGF5bWVudFZpZXciLCJDUklURVJJQV9MT0FERUQiLCJnZXREb2N0b3JMaXN0IiwiTE9BRElORyIsIkRvY3RvcnNMaXN0IiwiZG9jdG9yTGlzdCIsImRvY3RvclZpZXdMaXN0IiwiZG9jSWQiLCJzZWxlY3REb2N0b3IiLCJwYXRobmFtZSIsIlNlYXJjaFJlc3VsdHNGaWx0ZXIiLCJmZWVfMCIsImZlZV8xIiwiZmVlXzIiLCJmZWVfMyIsImNsaW5pY19wZXJzb25hbCIsImNsaW5pY19ob3NwaXRhbCIsImNsaW5pY19tdWx0aSIsImF2YWlsYWJsZV90b2RheSIsImRpc3RhbmNlIiwiYXBwbHlGaWx0ZXIiLCJoYW5kbGVDaGVja2JveCIsImNoZWNrZWQiLCJoYW5kbGVDaGFuZ2VSYWRpbyIsIkFQUEVORF9ET0NUT1JTIiwiRE9DVE9SX1NFQVJDSCIsIlNFTEVDVF9ET0NUT1IiLCJUT0dHTEVfQ09ORElUSU9OUyIsIlRPR0dMRV9TUEVDSUFMSVRJRVMiLCJUT0dHTEVfVEVTVFMiLCJTRUxFQ1RfTE9DQVRJT04iLCJNRVJHRV9TRUFSQ0hfU1RBVEVfT1BEIiwiVE9HR0xFX0NSSVRFUklBIiwiVE9HR0xFX0RJQUdOT1NJU19DUklURVJJQSIsIlNFVF9PUERfRklMVEVSUyIsIlNFVF9MQUJTX0ZJTFRFUlMiLCJMT0FEX1NFQVJDSF9DUklURVJJQV9PUEQiLCJNRVJHRV9TRUFSQ0hfU1RBVEVfTEFCIiwiTE9BRF9TRUFSQ0hfQ1JJVEVSSUFfTEFCIiwiQVBQRU5EX0xBQlMiLCJMQUJfU0VBUkNIIiwiU0VMRUNUX0xPQ0FUSU9OX0RJQUdOT1NJUyIsIkFQUEVORF9GSUxURVJTX0RJQUdOT1NJUyIsIkxBQl9TRUFSQ0hfU1RBUlQiLCJBUFBFTkRfVVNFUl9QUk9GSUxFUyIsIkNoYXQiLCJtYXBTdGF0ZVRvUHJvcHMiLCJtYXBEaXNwYXRjaFRvUHJvcHMiLCJVc2VyQXBwb2ludG1lbnRzIiwiVXNlclByb2ZpbGUiLCJVc2VyUmVwb3J0cyIsIkJvb2tpbmdTdW1tYXJ5IiwiTGFiIiwiU2VhcmNoQ3JpdGVyaWEiLCJTZWFyY2hSZXN1bHRzIiwiVGVzdFNlbGVjdG9yIiwiQm9va2luZyIsIkNsaW5pY0xpc3QiLCJDcml0ZXJpYVNlYXJjaCIsImNiIiwiRG9jdG9yUHJvZmlsZSIsIlBheW1lbnQiLCJFUlJPUiIsIk5BVklHQVRFIiwibmF2aWdhdGVUbyIsIndoZXJlIiwid2luZG93IiwiaHJlZiIsInJlZnJlc2hBcHBvaW50bWVudFN0YXRlIiwibm9BcHBvaW50bWVudEZvdW5kIiwidXBjb21pbmciLCJwcmV2aW91cyIsImFjdGlvbiIsImNvb2tpZXMiLCJTVE9SQUdFIiwic2V0QXV0aFRva2VuIiwic2V0IiwiY2hlY2tBdXRoIiwiZGVsZXRlQXV0aCIsInJlbW92ZSIsImRlZmF1bHRTdGF0ZSIsIm5ld1N0YXRlIiwicHJvZmlsZU1hcCIsInByb2ZpbGUiLCJsYXBNYXAiLCJjb25jYXQiLCJmb3VuZCIsImFsbFJlZHVjZXJzIiwiZG9jdG9yTWFwIiwicm91dGVzIiwicGF0aCIsImV4YWN0IiwiY29tcG9uZW50IiwiUm91dGVyQ29uZmlnIiwicm91dGUiLCJST1VURVMiLCJ0aW1lU3RhbXAiLCJnZXREYXlOYW1lIiwiZ2V0RGF5IiwicmVxdWlyZSIsImh0dHAiLCJFeHByZXNzIiwiYXBwIiwic2VydmVyIiwiU2VydmVyIiwidXNlIiwic3RhdGljIiwiam9pbiIsIl9fZGlybmFtZSIsInJlcSIsInN0b3JlIiwic2hlZXRzUmVnaXN0cnkiLCJ0aGVtZSIsInBhbGV0dGUiLCJwcmltYXJ5IiwibWFpbiIsInNlY29uZGFyeSIsImRhbmdlciIsImdlbmVyYXRlQ2xhc3NOYW1lIiwiaHRtbCIsInJlbmRlclRvU3RyaW5nIiwiY3NzIiwid3JpdGVIZWFkIiwiTG9jYXRpb24iLCJwcm9taXNlcyIsInNvbWUiLCJsb2FkRGF0YSIsImFsbCIsInNlbmRGaWxlIiwicm9vdCIsImxpc3RlbiIsImVyciIsImluZm8iXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FB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UyxLQUFSLENBQWM2aEIsR0FBZCxDQUFQO0FBQ0g7QUFDRHJQLFlBQVFzUCxJQUFSLENBQWEseUNBQWI7QUFDSCxDQUxELEU7Ozs7Ozs7Ozs7O0FDdkdBLGtDOzs7Ozs7Ozs7OztBQ0FBLG9DOzs7Ozs7Ozs7OztBQ0FBLGlDOzs7Ozs7Ozs7OztBQ0FBLDREOzs7Ozs7Ozs7OztBQ0FBLDBEOzs7Ozs7Ozs7OztBQ0FBLHNEOzs7Ozs7Ozs7OztBQ0FBLG1EOzs7Ozs7Ozs7OztBQ0FBLHlEOzs7Ozs7Ozs7OztBQ0FBLHlEOzs7Ozs7Ozs7OztBQ0FBLG1EOzs7Ozs7Ozs7OztBQ0FBLGlFOzs7Ozs7Ozs7OztBQ0FBLHlEOzs7Ozs7Ozs7OztBQ0FBLHNEOzs7Ozs7Ozs7OztBQ0FBLG1EOzs7Ozs7Ozs7OztBQ0FBLGlEOzs7Ozs7Ozs7OztBQ0FBLDZDOzs7Ozs7Ozs7OztBQ0FBLHVEOzs7Ozs7Ozs7OztBQ0FBLDZDOzs7Ozs7Ozs7OztBQ0FBLDZDOzs7Ozs7Ozs7OztBQ0FBLGlEOzs7Ozs7Ozs7OztBQ0FBLDhDOzs7Ozs7Ozs7OztBQ0FBLGdEOzs7Ozs7Ozs7OztBQ0FBLCtDOzs7Ozs7Ozs7OztBQ0FBLGlDOzs7Ozs7Ozs7OztBQ0FBLGdEOzs7Ozs7Ozs7OztBQ0FBLGtDOzs7Ozs7Ozs7OztBQ0FBLDZDOzs7Ozs7Ozs7OztBQ0FBLG9EOzs7Ozs7Ozs7OztBQ0FBLHNEOzs7Ozs7Ozs7OztBQ0FBLDhDOzs7Ozs7Ozs7OztBQ0FBLHdDOzs7Ozs7Ozs7OztBQ0FBLHlDOzs7Ozs7Ozs7OztBQ0FBLDZDOzs7Ozs7Ozs7OztBQ0FBLG1EOzs7Ozs7Ozs7OztBQ0FBLGtDOzs7Ozs7Ozs7OztBQ0FBLHlDOzs7Ozs7Ozs7OztBQ0FBLHdDOzs7Ozs7Ozs7OztBQ0FBLDZDIiwiZmlsZSI6InNlcnZlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgd2FzbSBtb2R1bGVzXG4gXHR2YXIgaW5zdGFsbGVkV2FzbU1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL1wiO1xuXG4gXHQvLyBvYmplY3Qgd2l0aCBhbGwgY29tcGlsZWQgV2ViQXNzZW1ibHkuTW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy53ID0ge307XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vaW5kZXguanNcIik7XG4iLCJpbXBvcnQgeyBBUFBFTkRfVVNFUl9QUk9GSUxFUyB9IGZyb20gJy4uLy4uL2NvbnN0YW50cy90eXBlcyc7XG5pbXBvcnQgeyBBUElfR0VUIH0gZnJvbSAnLi4vLi4vYXBpL2FwaS5qcyc7XG5cblxuZXhwb3J0IGNvbnN0IGdldFVzZXJQcm9maWxlID0gKCkgPT4gKGRpc3BhdGNoKSA9PiB7XG5cdEFQSV9HRVQoJy91c2VyLmpzb24nKS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuXHRcdFxuXHRcdGRpc3BhdGNoKHtcblx0XHRcdHR5cGU6IEFQUEVORF9VU0VSX1BST0ZJTEVTLFxuXHRcdFx0cGF5bG9hZDogcmVzcG9uc2UucHJvZmlsZXNcblx0XHR9KVxuXG5cdH0pLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xuXG5cdH0pXG59XG5cbmV4cG9ydCBjb25zdCBnZXRVc2VyUHJvZmlsZVdpdGhBcHBvaW50bWVudHMgPSAoKSA9PiAoZGlzcGF0Y2gpID0+IHtcblx0QVBJX0dFVCgnL3VzZXJfcHJvZmlsZV9hcHBvaW50bWVudHMuanNvbicpLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG5cdFx0XG5cdFx0ZGlzcGF0Y2goe1xuXHRcdFx0dHlwZTogQVBQRU5EX1VTRVJfUFJPRklMRVMsXG5cdFx0XHRwYXlsb2FkOiByZXNwb25zZS5wcm9maWxlc1xuXHRcdH0pXG5cblx0fSkuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSB7XG5cblx0fSlcbn1cblxuZXhwb3J0IGNvbnN0IGdldFVzZXJQcm9maWxlV2l0aFRlc3RzID0gKCkgPT4gKGRpc3BhdGNoKSA9PiB7XG5cdEFQSV9HRVQoJy91c2VyX3Byb2ZpbGVfdGVzdHMuanNvbicpLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG5cdFx0XG5cdFx0ZGlzcGF0Y2goe1xuXHRcdFx0dHlwZTogQVBQRU5EX1VTRVJfUFJPRklMRVMsXG5cdFx0XHRwYXlsb2FkOiByZXNwb25zZS5wcm9maWxlc1xuXHRcdH0pXG5cblx0fSkuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSB7XG5cblx0fSlcbn1cblxuIiwiaW1wb3J0IHsgTEFCX1NFQVJDSF9TVEFSVCwgQVBQRU5EX0xBQlMsIExBQl9TRUFSQ0gsIE1FUkdFX1NFQVJDSF9TVEFURV9MQUIgfSBmcm9tICcuLi8uLi9jb25zdGFudHMvdHlwZXMnO1xuaW1wb3J0IHsgQVBJX0dFVCB9IGZyb20gJy4uLy4uL2FwaS9hcGkuanMnO1xuXG5cbmV4cG9ydCBjb25zdCBnZXRMYWJzID0gKHNlYXJjaFN0YXRlID0ge30sIGZpbHRlckNyaXRlcmlhID0ge30sIG1lcmdlU3RhdGUgPSBmYWxzZSkgPT4gKGRpc3BhdGNoKSA9PiB7XG5cblx0bGV0IHRlc3RJZHMgPSBzZWFyY2hTdGF0ZS5zZWxlY3RlZENyaXRlcmlhc1xuXHRcdC5maWx0ZXIoeCA9PiB4LnR5cGUgPT0gJ3Rlc3QnKVxuXHRcdC5yZWR1Y2UoKGZpbmFsU3RyLCBjdXJyLCBpKSA9PiB7XG5cdFx0XHRpZiAoaSAhPSAwKSB7XG5cdFx0XHRcdGZpbmFsU3RyICs9ICcsJ1xuXHRcdFx0fVxuXHRcdFx0ZmluYWxTdHIgKz0gYCR7Y3Vyci5pZH1gXG5cdFx0XHRyZXR1cm4gZmluYWxTdHJcblx0XHR9LCBcIlwiKVxuXG5cdGxldCBsYXQgPSAyOC40NTk1XG5cdGxldCBsb25nID0gNzcuMDIyNlxuXHRpZiAoc2VhcmNoU3RhdGUuc2VsZWN0ZWRMb2NhdGlvbikge1xuXHRcdGxhdCA9IHNlYXJjaFN0YXRlLnNlbGVjdGVkTG9jYXRpb24uZ2VvbWV0cnkubG9jYXRpb24ubGF0XG5cdFx0bG9uZyA9IHNlYXJjaFN0YXRlLnNlbGVjdGVkTG9jYXRpb24uZ2VvbWV0cnkubG9jYXRpb24ubG5nXG5cdH1cblx0bGV0IG1pbl9kaXN0YW5jZSA9IGZpbHRlckNyaXRlcmlhLmRpc3RhbmNlUmFuZ2VbMF1cblx0bGV0IG1heF9kaXN0YW5jZSA9IGZpbHRlckNyaXRlcmlhLmRpc3RhbmNlUmFuZ2VbMV1cblx0bGV0IG1pbl9wcmljZSA9IGZpbHRlckNyaXRlcmlhLnByaWNlUmFuZ2VbMF1cblx0bGV0IG1heF9wcmljZSA9IGZpbHRlckNyaXRlcmlhLnByaWNlUmFuZ2VbMV1cblx0bGV0IG9yZGVyX2J5ID0gZmlsdGVyQ3JpdGVyaWEuc29ydEJ5XG5cdFxuXHRsZXQgdXJsID0gYC9hcGkvdjEvZGlhZ25vc3RpYy9sYWJsaXN0P2lkcz0ke3Rlc3RJZHN9Jmxvbmc9JHtsYXR9JmxhdD0ke2xvbmd9Jm1pbl9kaXN0YW5jZT0ke21pbl9kaXN0YW5jZX0mbWF4X2Rpc3RhbmNlPSR7bWF4X2Rpc3RhbmNlfSZtaW5fcHJpY2U9JHttaW5fcHJpY2V9Jm1heF9wcmljZT0ke21heF9wcmljZX0mb3JkZXJfYnk9JHtvcmRlcl9ieX1gXG5cblx0ZGlzcGF0Y2goe1xuXHRcdHR5cGU6IExBQl9TRUFSQ0hfU1RBUlQsXG5cdFx0cGF5bG9hZDogbnVsbFxuXHR9KVxuXG5cdEFQSV9HRVQodXJsKS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuXG5cdFx0ZGlzcGF0Y2goe1xuXHRcdFx0dHlwZTogQVBQRU5EX0xBQlMsXG5cdFx0XHRwYXlsb2FkOiByZXNwb25zZVxuXHRcdH0pXG5cblx0XHRkaXNwYXRjaCh7XG5cdFx0XHR0eXBlOiBMQUJfU0VBUkNILFxuXHRcdFx0cGF5bG9hZDogcmVzcG9uc2Vcblx0XHR9KVxuXG5cdFx0aWYgKG1lcmdlU3RhdGUpIHtcblx0XHRcdGRpc3BhdGNoKHtcblx0XHRcdFx0dHlwZTogTUVSR0VfU0VBUkNIX1NUQVRFX0xBQixcblx0XHRcdFx0cGF5bG9hZDoge1xuXHRcdFx0XHRcdHNlYXJjaFN0YXRlLFxuXHRcdFx0XHRcdGZpbHRlckNyaXRlcmlhXG5cdFx0XHRcdH1cblx0XHRcdH0pXG5cdFx0fVxuXG5cdH0pLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xuXG5cdH0pXG59XG5cbmV4cG9ydCBjb25zdCBnZXRMYWJCeUlkID0gKGxhYklkKSA9PiAoZGlzcGF0Y2gpID0+IHtcblx0bGV0IHVybCA9IGAvYXBpL3YxL2RpYWdub3N0aWMvbGFibGlzdC8ke2xhYklkfWBcblxuXHRBUElfR0VUKHVybCkudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcblx0XHRcblx0XHRkaXNwYXRjaCh7XG5cdFx0XHR0eXBlOiBBUFBFTkRfTEFCUyxcblx0XHRcdHBheWxvYWQ6IFtyZXNwb25zZV1cblx0XHR9KVxuXG5cdH0pLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xuXG5cdH0pXG59XG5cbmV4cG9ydCBjb25zdCBnZXRMYWJUaW1lU2xvdHMgPSAobGFiSWQsIHRlc3RJZHMsIGNhbGxiYWNrKSA9PiAoZGlzcGF0Y2gpID0+IHtcblx0QVBJX0dFVCgnL2F2YWlsYWJpbGl0eV9sYWJzLmpzb24nKS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuXG5cdFx0Y2FsbGJhY2socmVzcG9uc2UpXG5cblx0fSkuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSB7XG5cblx0fSlcbn1cblxuZXhwb3J0IGNvbnN0IGdldExhYkJvb2tpbmdTdW1tYXJ5ID0gKGJvb2tpbmdJZCwgY2FsbGJhY2spID0+IChkaXNwYXRjaCkgPT4ge1xuXHRBUElfR0VUKCcvbGFiX2Jvb2tpbmdfc3VtbWFyLmpzb24nKS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuXG5cdFx0Y2FsbGJhY2socmVzcG9uc2UpXG5cblx0fSkuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSB7XG5cblx0fSlcbn1cbiIsImltcG9ydCB7IEFQUEVORF9GSUxURVJTX0RJQUdOT1NJUywgVE9HR0xFX0NPTkRJVElPTlMsIFRPR0dMRV9TUEVDSUFMSVRJRVMsIFNFTEVDVF9MT0NBVElPTiwgTUVSR0VfU0VBUkNIX1NUQVRFLCBUT0dHTEVfQ1JJVEVSSUEsIFRPR0dMRV9URVNUUywgVE9HR0xFX0RJQUdOT1NJU19DUklURVJJQSwgTE9BRF9TRUFSQ0hfQ1JJVEVSSUFfTEFCIH0gZnJvbSAnLi4vLi4vY29uc3RhbnRzL3R5cGVzJztcbmltcG9ydCB7IEFQSV9HRVQgfSBmcm9tICcuLi8uLi9hcGkvYXBpLmpzJztcblxuZXhwb3J0IGNvbnN0IGxvYWRMYWJDb21tb25Dcml0ZXJpYXMgPSAoKSA9PiAoZGlzcGF0Y2gpID0+IHtcblxuICAgIEFQSV9HRVQoJy9hcGkvdjEvZGlhZ25vc3RpYy9sYWJzZWFyY2gnKS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICBkaXNwYXRjaCh7XG4gICAgICAgICAgICB0eXBlOiBMT0FEX1NFQVJDSF9DUklURVJJQV9MQUIsXG4gICAgICAgICAgICBwYXlsb2FkOiByZXNwb25zZVxuICAgICAgICB9KVxuICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICBkaXNwYXRjaCh7XG4gICAgICAgICAgICB0eXBlOiBMT0FEX1NFQVJDSF9DUklURVJJQV9MQUIsXG4gICAgICAgICAgICBwYXlsb2FkOiBudWxsXG4gICAgICAgIH0pXG4gICAgfSlcblxufVxuXG5leHBvcnQgY29uc3QgdG9nZ2xlRGlhZ25vc2lzQ3JpdGVyaWEgPSAodHlwZSwgY3JpdGVyaWEpID0+IChkaXNwYXRjaCkgPT4ge1xuICAgIGRpc3BhdGNoKHtcbiAgICAgICAgdHlwZTogVE9HR0xFX0RJQUdOT1NJU19DUklURVJJQSxcbiAgICAgICAgcGF5bG9hZDoge1xuICAgICAgICAgICAgdHlwZSwgY3JpdGVyaWFcbiAgICAgICAgfVxuICAgIH0pXG5cbn1cblxuZXhwb3J0IGNvbnN0IGdldERpYWdub3Npc0NyaXRlcmlhUmVzdWx0cyA9IChzZWFyY2hTdHJpbmcsIGNhbGxiYWNrKSA9PiAoZGlzcGF0Y2gpID0+IHtcbiAgICBBUElfR0VUKGAvYXBpL3YxL2RpYWdub3N0aWMvdGVzdD9uYW1lPSR7c2VhcmNoU3RyaW5nfWApLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgIGNhbGxiYWNrKHJlc3BvbnNlKVxuICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICBjYWxsYmFjayhudWxsKVxuICAgIH0pXG59XG5cblxuIiwiaW1wb3J0ICogYXMgU0VBUkNIX0NSSVRFUklBX09QRCBmcm9tICcuL29wZC9zZWFyY2hDcml0ZXJpYS5qcydcbmltcG9ydCAqIGFzIFNFQVJDSF9DUklURVJJQV9MQUJTIGZyb20gJy4vZGlhZ25vc2lzL3NlYXJjaENyaXRlcmlhLmpzJ1xuaW1wb3J0ICogYXMgRE9DVE9SU19BQ1RJT05TIGZyb20gJy4vb3BkL2RvY3RvclNlYXJjaC5qcydcbmltcG9ydCAqIGFzIExBQlNfQUNUSU9OUyBmcm9tICcuL2RpYWdub3Npcy9sYWJTZWFyY2guanMnXG5pbXBvcnQgKiBhcyBVU0VSX0FDVElPTlMgZnJvbSAnLi9jb21tb25zL3VzZXIuanMnXG5cbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmFzc2lnbih7fSxcbiAgICBTRUFSQ0hfQ1JJVEVSSUFfT1BELFxuICAgIFNFQVJDSF9DUklURVJJQV9MQUJTLFxuICAgIERPQ1RPUlNfQUNUSU9OUyxcbiAgICBMQUJTX0FDVElPTlMsXG4gICAgVVNFUl9BQ1RJT05TXG4pIiwiaW1wb3J0IHsgQVBQRU5EX0RPQ1RPUlMsIERPQ1RPUl9TRUFSQ0gsIFNFTEVDVF9ET0NUT1IsIE1FUkdFX1NFQVJDSF9TVEFURV9PUEQgfSBmcm9tICcuLi8uLi9jb25zdGFudHMvdHlwZXMnO1xuaW1wb3J0IHsgQVBJX0dFVCB9IGZyb20gJy4uLy4uL2FwaS9hcGkuanMnO1xuXG5cbmV4cG9ydCBjb25zdCBnZXREb2N0b3JzID0gKHNlYXJjaFN0YXRlID0ge30sIGZpbHRlclN0YXRlID0ge30sIG1lcmdlU3RhdGUgPSBmYWxzZSkgPT4gKGRpc3BhdGNoKSA9PiB7XG5cdEFQSV9HRVQoJy9kb2N0b3JzLmpzb24nKS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuXG5cdFx0ZGlzcGF0Y2goe1xuXHRcdFx0dHlwZTogQVBQRU5EX0RPQ1RPUlMsXG5cdFx0XHRwYXlsb2FkOiByZXNwb25zZS5kb2N0b3JzXG5cdFx0fSlcblxuXHRcdGRpc3BhdGNoKHtcblx0XHRcdHR5cGU6IERPQ1RPUl9TRUFSQ0gsXG5cdFx0XHRwYXlsb2FkOiByZXNwb25zZS5kb2N0b3JzXG5cdFx0fSlcblxuXHRcdGlmIChtZXJnZVN0YXRlKSB7XG5cdFx0XHRkaXNwYXRjaCh7XG5cdFx0XHRcdHR5cGU6IE1FUkdFX1NFQVJDSF9TVEFURV9PUEQsXG5cdFx0XHRcdHBheWxvYWQ6IHNlYXJjaFN0YXRlXG5cdFx0XHR9KVxuXHRcdH1cblxuXG5cdFx0bGV0IHNlYXJjaFN0YXRlUGFyYW0gPSBlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc2VhcmNoU3RhdGUpKVxuXHRcdGxldCBmaWx0ZXJTdGF0ZVBhcmFtID0gZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGZpbHRlclN0YXRlKSlcblx0XHRoaXN0b3J5LnJlcGxhY2VTdGF0ZShudWxsLCAnaGVsbG8nLCBgL3NlYXJjaHJlc3VsdHM/c2VhcmNoPSR7c2VhcmNoU3RhdGVQYXJhbX0mZmlsdGVyPSR7ZmlsdGVyU3RhdGVQYXJhbX1gKVxuXG5cdH0pLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xuXG5cdH0pXG59XG5cbmV4cG9ydCBjb25zdCBnZXREb2N0b3JCeUlkID0gKGRvY3RvcklkKSA9PiAoZGlzcGF0Y2gpID0+IHtcblx0Ly8gdGhpcyBBUEkgc2hvdWxkIHJldHVybiBkZXRhaWxlZCBkb2N0b3Jcblx0QVBJX0dFVCgnL2RvY3RvcnMuanNvbicpLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG5cdFx0Ly8gbW9ja2luZyBBUEkgLCBUT0RPIDogcmVtb3ZlXG5cdFx0cmVzcG9uc2UuZG9jdG9yID0gcmVzcG9uc2UuZG9jdG9ycy5maWx0ZXIoZG9jID0+IGRvYy5pZCA9PSBkb2N0b3JJZClbMF1cblxuXHRcdGRpc3BhdGNoKHtcblx0XHRcdHR5cGU6IEFQUEVORF9ET0NUT1JTLFxuXHRcdFx0cGF5bG9hZDogW3Jlc3BvbnNlLmRvY3Rvcl1cblx0XHR9KVxuXG5cdH0pLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xuXG5cdH0pXG59XG5cbmV4cG9ydCBjb25zdCBnZXRUaW1lU2xvdHMgPSAoZG9jdG9ySWQsIGNsaW5pY0lkLCBjYWxsYmFjaykgPT4gKGRpc3BhdGNoKSA9PiB7XG5cdEFQSV9HRVQoJy9hdmFpbGFiaWxpdHkuanNvbicpLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG5cblx0XHRjYWxsYmFjayhyZXNwb25zZSlcblxuXHR9KS5jYXRjaChmdW5jdGlvbiAoZXJyb3IpIHtcblxuXHR9KVxufVxuIiwiaW1wb3J0IHsgVE9HR0xFX0NPTkRJVElPTlMsIFRPR0dMRV9TUEVDSUFMSVRJRVMsIFNFTEVDVF9MT0NBVElPTiwgU0VMRUNUX0xPQ0FUSU9OX0RJQUdOT1NJUywgTUVSR0VfU0VBUkNIX1NUQVRFLCBUT0dHTEVfQ1JJVEVSSUEsIFRPR0dMRV9URVNUUywgVE9HR0xFX0RJQUdOT1NJU19DUklURVJJQSwgU0VUX09QRF9GSUxURVJTLCBMT0FEX1NFQVJDSF9DUklURVJJQV9PUEQgfSBmcm9tICcuLi8uLi9jb25zdGFudHMvdHlwZXMnO1xuaW1wb3J0IHsgQVBJX0dFVCB9IGZyb20gJy4uLy4uL2FwaS9hcGkuanMnO1xuXG5leHBvcnQgY29uc3QgbG9hZFNlYXJjaENyaXRlcmlhID0gKCkgPT4gKGRpc3BhdGNoKSA9PiB7XG4gICAgZGlzcGF0Y2goe1xuICAgICAgICB0eXBlOiBMT0FEX1NFQVJDSF9DUklURVJJQV9PUEQsXG4gICAgICAgIHBheWxvYWQ6IG51bGxcbiAgICB9KVxuXG59IFxuXG5leHBvcnQgY29uc3QgdG9nZ2xlQ29uZGl0aW9uID0gKGlkKSA9PiAoZGlzcGF0Y2gpID0+IHtcbiAgICBkaXNwYXRjaCh7XG4gICAgICAgIHR5cGU6IFRPR0dMRV9DT05ESVRJT05TLFxuICAgICAgICBwYXlsb2FkOiB7XG4gICAgICAgICAgICBpZFxuICAgICAgICB9XG4gICAgfSlcblxufVxuXG5leHBvcnQgY29uc3QgdG9nZ2xlU3BlY2lhbGl0eSA9IChpZCkgPT4gKGRpc3BhdGNoKSA9PiB7XG4gICAgZGlzcGF0Y2goe1xuICAgICAgICB0eXBlOiBUT0dHTEVfU1BFQ0lBTElUSUVTLFxuICAgICAgICBwYXlsb2FkOiB7XG4gICAgICAgICAgICBpZFxuICAgICAgICB9XG4gICAgfSlcblxufVxuXG5leHBvcnQgY29uc3QgdG9nZ2xlQ3JpdGVyaWEgPSAoY3JpdGVyaWEpID0+IChkaXNwYXRjaCkgPT4ge1xuICAgIGRpc3BhdGNoKHtcbiAgICAgICAgdHlwZTogVE9HR0xFX0NSSVRFUklBLFxuICAgICAgICBwYXlsb2FkOiBjcml0ZXJpYVxuICAgIH0pXG5cbn1cblxuZXhwb3J0IGNvbnN0IHNlbGVjdExvY2F0aW9uID0gKGxvY2F0aW9uKSA9PiAoZGlzcGF0Y2gpID0+IHtcbiAgICBkaXNwYXRjaCh7XG4gICAgICAgIHR5cGU6IFNFTEVDVF9MT0NBVElPTixcbiAgICAgICAgcGF5bG9hZDogbG9jYXRpb25cbiAgICB9KVxuXG4gICAgZGlzcGF0Y2goe1xuICAgICAgICB0eXBlOiBTRUxFQ1RfTE9DQVRJT05fRElBR05PU0lTLFxuICAgICAgICBwYXlsb2FkOiBsb2NhdGlvblxuICAgIH0pXG5cbn1cblxuZXhwb3J0IGNvbnN0IG1lcmdlU2VhcmNoU3RhdGUgPSAoc3RhdGUpID0+IChkaXNwYXRjaCkgPT4ge1xuICAgIGRpc3BhdGNoKHtcbiAgICAgICAgdHlwZTogTUVSR0VfU0VBUkNIX1NUQVRFLFxuICAgICAgICBwYXlsb2FkOiBzdGF0ZVxuICAgIH0pXG5cbn1cblxuZXhwb3J0IGNvbnN0IGdldENyaXRlcmlhUmVzdWx0cyA9IChzZWFyY2hTdHJpbmcsIGNhbGxiYWNrKSA9PiAoZGlzcGF0Y2gpID0+IHtcblx0QVBJX0dFVCgnL2dlbmVyaWNfc2VhcmNoLmpzb24nKS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuXHRcdGNhbGxiYWNrKHJlc3BvbnNlKVxuXHR9KS5jYXRjaChmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgICAgXG5cdH0pXG59XG5cbmV4cG9ydCBjb25zdCBzZXRPUERGaWx0ZXJzID0gKGZpbHRlckRhdGEpID0+IChkaXNwYXRjaCkgPT4ge1xuICAgIGRpc3BhdGNoKHtcbiAgICAgICAgdHlwZTogU0VUX09QRF9GSUxURVJTLFxuICAgICAgICBwYXlsb2FkOiBmaWx0ZXJEYXRhXG4gICAgfSlcblxufSBcbiIsImltcG9ydCBBeGlvcyBmcm9tICdheGlvcydcbmltcG9ydCBTVE9SQUdFIGZyb20gJy4uL2hlbHBlcnMvc3RvcmFnZSdcbmltcG9ydCBOQVZJR0FURSBmcm9tICcuLi9oZWxwZXJzL25hdmlnYXRlJ1xuXG5sZXQgYXhpb3NJbnN0YW5jZSA9IEF4aW9zLmNyZWF0ZSh7XG4gICAgYmFzZVVSTDogJ2h0dHA6Ly9sb2NhbGhvc3Q6ODA4MCcsXG4gICAgaGVhZGVyOiB7fVxufSk7XG5cbmZ1bmN0aW9uIHJlamVjdEhhbmRsZXIocmVzcG9uc2UsIGNhbGxiYWNrKSB7XG4gICAgLy8gaWYgKHJlc3BvbnNlICYmIHJlc3BvbnNlLnJlc3BvbnNlICYmIHJlc3BvbnNlLnJlc3BvbnNlLnN0YXR1cyA9PSA0MDEpIHtcbiAgICAvLyAgICAgU1RPUkFHRS5kZWxldGVBdXRoKCkudGhlbigoKSA9PiB7XG4gICAgLy8gICAgICAgICAvLyBzZW5kIHRvIGxvZ2luIHBhZ2VcbiAgICAvLyAgICAgICAgIE5BVklHQVRFLm5hdmlnYXRlVG8oJy8nKVxuICAgIC8vICAgICB9KVxuICAgIC8vIH1cblxuICAgIGNhbGxiYWNrKHJlc3BvbnNlKVxufVxuXG5leHBvcnQgY29uc3QgQVBJX0dFVCA9ICh1cmwpID0+IHtcbiAgICByZXR1cm4gU1RPUkFHRS5nZXRBdXRoVG9rZW4oKS50aGVuKCh0b2tlbikgPT4ge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgYXhpb3NJbnN0YW5jZSh7XG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnZ2V0JyxcbiAgICAgICAgICAgICAgICB1cmw6IHVybCxcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiB7ICdBdXRob3JpemF0aW9uJzogYFRva2VuICR7dG9rZW59YCB9XG4gICAgICAgICAgICB9KS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgICAgICAgICByZXNvbHZlKHJlcy5kYXRhKVxuICAgICAgICAgICAgfSwgKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgcmVqZWN0SGFuZGxlcihyZXNwb25zZSwgcmVqZWN0KVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICB9KVxuXG5cbn1cbmV4cG9ydCBjb25zdCBBUElfUE9TVCA9ICh1cmwsIGRhdGEpID0+IHtcbiAgICByZXR1cm4gU1RPUkFHRS5nZXRBdXRoVG9rZW4oKS50aGVuKCh0b2tlbikgPT4ge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgYXhpb3NJbnN0YW5jZSh7XG4gICAgICAgICAgICAgICAgbWV0aG9kOiAncG9zdCcsXG4gICAgICAgICAgICAgICAgdXJsOiB1cmwsXG4gICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiB7ICdBdXRob3JpemF0aW9uJzogYFRva2VuICR7dG9rZW59YCB9XG4gICAgICAgICAgICB9KS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgICAgICAgICByZXNvbHZlKHJlcy5kYXRhKVxuICAgICAgICAgICAgfSwgKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgcmVqZWN0SGFuZGxlcihyZXNwb25zZSwgcmVqZWN0KVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICB9KVxuXG5cbn1cblxuZXhwb3J0IGNvbnN0IEFQSV9QVVQgPSAodXJsLCBkYXRhKSA9PiB7XG4gICAgcmV0dXJuIFNUT1JBR0UuZ2V0QXV0aFRva2VuKCkudGhlbigodG9rZW4pID0+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGF4aW9zSW5zdGFuY2Uoe1xuICAgICAgICAgICAgICAgIG1ldGhvZDogJ3B1dCcsXG4gICAgICAgICAgICAgICAgdXJsOiB1cmwsXG4gICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiB7ICdBdXRob3JpemF0aW9uJzogYFRva2VuICR7dG9rZW59YCB9XG4gICAgICAgICAgICB9KS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgICAgICAgICByZXNvbHZlKHJlcy5kYXRhKVxuICAgICAgICAgICAgfSwgKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgcmVqZWN0SGFuZGxlcihyZXNwb25zZSwgcmVqZWN0KVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICB9KVxuXG5cbn1cblxuZXhwb3J0IGNvbnN0IEFQSV9ERUxFVEUgPSAodXJsKSA9PiB7XG4gICAgcmV0dXJuIFNUT1JBR0UuZ2V0QXV0aFRva2VuKCkudGhlbigodG9rZW4pID0+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGF4aW9zSW5zdGFuY2Uoe1xuICAgICAgICAgICAgICAgIG1ldGhvZDogJ2RlbGV0ZScsXG4gICAgICAgICAgICAgICAgdXJsOiB1cmwsXG4gICAgICAgICAgICAgICAgaGVhZGVyczogeyAnQXV0aG9yaXphdGlvbic6IGBUb2tlbiAke3Rva2VufWAgfVxuICAgICAgICAgICAgfSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShyZXMuZGF0YSlcbiAgICAgICAgICAgIH0sIChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgIHJlamVjdEhhbmRsZXIocmVzcG9uc2UsIHJlamVjdClcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgfSlcblxufSIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCB7IENpcmN1bGFyUHJvZ3Jlc3MgfSBmcm9tICdtYXRlcmlhbC11aS9Qcm9ncmVzcyc7XG5cbmNsYXNzIExvYWRlciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxvYWRlckNpcmN1bGFyXCI+XG4gICAgICAgICAgICAgICAgPENpcmN1bGFyUHJvZ3Jlc3MgY2xhc3NOYW1lPXtcImxvYWRlcmFjdHVhbFwifSBzaXplPXs1MH0gdGhpY2tuZXNzPXszfSAvPlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IExvYWRlclxuIiwiaW1wb3J0IExvYWRlciBmcm9tICcuL0xvYWRlcidcblxuZXhwb3J0IGRlZmF1bHQgTG9hZGVyIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuY29uc3QgSWZyYW1TdHlsZSA9IHtcbiAgICB3aWR0aDogJzEwMCUnLFxuICAgIGhlaWdodDogJ2NhbGMoMTAwdmggLSA2MHB4KSdcbn1cblxuXG5jbGFzcyBDaGF0VmlldyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG5cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN0YXRpYyBjb250ZXh0VHlwZXMgPSB7XG4gICAgICAgIHJvdXRlcjogKCkgPT4gbnVsbFxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsb2NhdGlvblNlbGVjdG9yXCI+XG4gICAgICAgICAgICAgICAgPGlmcmFtZSBzcmM9XCJodHRwOi8vY2hhdGJvdC5wb2xpY3liYXphYXIuY29tL2xpdmVjaGF0XCIgc3R5bGU9e0lmcmFtU3R5bGV9PjwvaWZyYW1lPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IENoYXRWaWV3XG4iLCJpbXBvcnQgQ2hhdFZpZXcgZnJvbSAnLi9DaGF0Vmlldy5qcydcblxuZXhwb3J0IGRlZmF1bHQgQ2hhdFZpZXciLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IEVtb3RpSWNvbiBmcm9tICdtYXRlcmlhbC11aS1pY29ucy9BY2NvdW50Q2lyY2xlJztcblxuY2xhc3MgUHJvZmlsZVNsaWRlciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgfVxuXG4gICAgc3dpdGNoVXNlcihwcm9maWxlSWQpIHtcbiAgICAgICAgdGhpcy5jb250ZXh0LnJvdXRlci5oaXN0b3J5LnB1c2goYC91c2VyLyR7cHJvZmlsZUlkfSR7dGhpcy5wcm9wcy5zdWJSb3V0ZX1gKVxuXG4gICAgfVxuXG4gICAgc3RhdGljIGNvbnRleHRUeXBlcyA9IHtcbiAgICAgICAgcm91dGVyOiAoKSA9PiBudWxsXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIGxldCBwcm9maWxlcyA9IFtdXG5cbiAgICAgICAgcHJvZmlsZXMgPSBPYmplY3Qua2V5cyh0aGlzLnByb3BzLnByb2ZpbGVzKS5tYXAoKHByb2ZpbGVJZCwgaSkgPT4ge1xuICAgICAgICAgICAgbGV0IHNyYyA9IHRoaXMucHJvcHMucHJvZmlsZXNbcHJvZmlsZUlkXS5wcm9maWxlSW1hZ2UgfHwgXCJodHRwczovL3d3dy5hdG9taXguY29tLmF1L21lZGlhLzIwMTUvMDYvYXRvbWl4X3VzZXIzMS5wbmdcIlxuICAgICAgICAgICAgcmV0dXJuIDxkaXYga2V5PXtpfSBjbGFzc05hbWU9XCJzbGlkZVRpbGVcIiBvbkNsaWNrPXt0aGlzLnN3aXRjaFVzZXIuYmluZCh0aGlzLCBwcm9maWxlSWQpfT5cbiAgICAgICAgICAgICAgICA8aW1nIGNsYXNzTmFtZT1cInByb2ZpbGVDYXJkSW1hZ2VcIiBzcmM9e3NyY30vPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIH0pXG5cblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwcm9maWxlU2xpZGVyXCI+XG4gICAgICAgICAgICAgICAge3Byb2ZpbGVzfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IFByb2ZpbGVTbGlkZXJcbiIsImltcG9ydCBQcm9maWxlU2xpZGVyIGZyb20gJy4vUHJvZmlsZVNsaWRlci5qcydcblxuZXhwb3J0IGRlZmF1bHQgUHJvZmlsZVNsaWRlciIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCB7IGdldFRpbWUsIGdldERheU5hbWUgfSBmcm9tICcuLi8uLi8uLi91dGlscy9kYXRlVGltZVV0aWxzLmpzJ1xuXG5jbGFzcyBUaW1lU2xvdFNlbGVjdG9yIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIHNlbGVjdGVkRGF5OiAwLFxuICAgICAgICAgICAgc2VsZWN0ZWRJbnRlcnZhbDogMCxcbiAgICAgICAgICAgIHNlbGVjdGVkVGltZVNsb3Q6IDBcblxuICAgICAgICB9XG4gICAgfVxuICAgIGNvbXBvbmVudFdpbGxNb3VudCgpIHtcbiAgICAgICAgbGV0IHRpbWVTbG90cyA9IHRoaXMucHJvcHMudGltZVNsb3RzO1xuXG4gICAgICAgIHRoaXMuc2V0RGVmYXVsdFNlbGVjdGVkKHRpbWVTbG90cyk7XG5cbiAgICB9XG4gICAgc2V0RGVmYXVsdFNlbGVjdGVkKHRpbWVTbG90cykge1xuICAgICAgICBsZXQgZGF5cyA9IHRpbWVTbG90cy5kYXRlcztcbiAgICAgICAgbGV0IGRlZmF1bHREYXlJbmRleCA9IHRoaXMuZ2V0Rmlyc3RBdmFpbGFibGVEYXkoZGF5cyk7XG4gICAgICAgIFxuICAgICAgICBpZiAoZGVmYXVsdERheUluZGV4IHx8IGRlZmF1bHREYXlJbmRleCA9PT0gMCkge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHNlbGVjdGVkRGF5OiBkZWZhdWx0RGF5SW5kZXggfSk7XG4gICAgICAgICAgICB2YXIgZGVmYXV0SW50ZXJ3YWxJbmRleCA9IHRoaXMuZ2V0Rmlyc3RBdmFpbGFibGVJbnRlcndhbChkYXlzW2RlZmF1bHREYXlJbmRleF0uaW50ZXJ2YWxzKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZGVmYXV0SW50ZXJ3YWxJbmRleCB8fCBkZWZhdXRJbnRlcndhbEluZGV4ID09PSAwKSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgc2VsZWN0ZWRJbnRlcnZhbDogZGVmYXV0SW50ZXJ3YWxJbmRleCB9KTtcbiAgICAgICAgICAgIHZhciBkZWZhdWx0VGltZVNsb3RJbmRleCA9IHRoaXMuZ2V0Rmlyc3RBdmFpbGFibGVUaW1lU2xvdChkYXlzW2RlZmF1bHREYXlJbmRleF0uaW50ZXJ2YWxzW2RlZmF1dEludGVyd2FsSW5kZXhdLnRpbWVTbG90cyk7XG5cbiAgICAgICAgfVxuICAgICAgICBpZiAoZGVmYXVsdFRpbWVTbG90SW5kZXggfHwgZGVmYXVsdFRpbWVTbG90SW5kZXggPT09IDApIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBzZWxlY3RlZFRpbWVTbG90OiBkZWZhdWx0VGltZVNsb3RJbmRleCB9KTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgZ2V0Rmlyc3RBdmFpbGFibGVJbnRlcndhbChpbnRlcnZhbHMpIHtcblxuICAgICAgICBmb3IgKGxldCBpbnRlcndhbEluZGV4IGluIGludGVydmFscykge1xuICAgICAgICAgICAgbGV0IGludGVyd2FsID0gaW50ZXJ2YWxzW2ludGVyd2FsSW5kZXhdO1xuICAgICAgICAgICAgaWYgKGludGVyd2FsICYmIGludGVyd2FsLmlzQXZhaWxhYmxlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBhcnNlSW50KGludGVyd2FsSW5kZXgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0Rmlyc3RBdmFpbGFibGVUaW1lU2xvdCh0aW1lU2xvdHMpIHtcblxuICAgICAgICBmb3IgKGxldCB0aW1lU2xvdEluZGV4IGluIHRpbWVTbG90cykge1xuICAgICAgICAgICAgbGV0IHRpbWVTbG90ID0gdGltZVNsb3RzW3RpbWVTbG90SW5kZXhdO1xuICAgICAgICAgICAgaWYgKHRpbWVTbG90ICYmIHRpbWVTbG90LmlzQXZhaWxhYmxlKSB7XG4gICAgICAgICAgICAgICAgLy8gY2FsbGluZyBwYXJlbnQgdGltZVNsb3Qgc2V0dGVyXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5zZWxlY3RUaW1lU2xvdCh0aW1lU2xvdClcbiAgICAgICAgICAgICAgICByZXR1cm4gcGFyc2VJbnQodGltZVNsb3RJbmRleCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBcblxuICAgIH1cblxuICAgIGdldEZpcnN0QXZhaWxhYmxlRGF5KGRheXMpIHtcblxuICAgICAgICBmb3IgKGxldCBkYXlJbmRleCBpbiBkYXlzKSB7XG4gICAgICAgICAgICBsZXQgZGF5ID0gZGF5c1tkYXlJbmRleF07XG4gICAgICAgICAgICBpZiAoZGF5ICYmIGRheS5pc0F2YWlsYWJsZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBwYXJzZUludChkYXlJbmRleCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgb25EYXRlQ2xpY2soZGF0ZSwgc2VsZWN0ZWRJbmRleCwgaW5kZXgpIHtcblxuICAgICAgICBpZiAoc2VsZWN0ZWRJbmRleCAhPT0gaW5kZXggJiYgZGF0ZS5pc0F2YWlsYWJsZSkge1xuICAgICAgICAgICAgdmFyIGF2YWlsYWJsZUludGVyd2FsID0gdGhpcy5nZXRGaXJzdEF2YWlsYWJsZUludGVyd2FsKGRhdGUuaW50ZXJ2YWxzKVxuICAgICAgICAgICAgaWYgKGF2YWlsYWJsZUludGVyd2FsIHx8IGF2YWlsYWJsZUludGVyd2FsID09PSAwKSB7XG4gICAgICAgICAgICAgICAgbGV0IHRpbWVTbG90cyA9IGRhdGUuaW50ZXJ2YWxzW2F2YWlsYWJsZUludGVyd2FsXS50aW1lU2xvdHM7XG4gICAgICAgICAgICAgICAgdmFyIGF2YWlsYWJsZVRpbWVTbG90ID0gdGhpcy5nZXRGaXJzdEF2YWlsYWJsZVRpbWVTbG90KHRpbWVTbG90cyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBzZWxlY3RlZERheTogaW5kZXgsIHNlbGVjdGVkSW50ZXJ2YWw6IGF2YWlsYWJsZUludGVyd2FsLCBzZWxlY3RlZFRpbWVTbG90OiBhdmFpbGFibGVUaW1lU2xvdCB9KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBvbkludGVydmFsQ2xpY2soaW50ZXJ3YWwsIHNlbGVjdGVkSW5kZXgsIGluZGV4KSB7XG5cblxuXG4gICAgICAgIGlmIChzZWxlY3RlZEluZGV4ICE9PSBpbmRleCAmJiBpbnRlcndhbC5pc0F2YWlsYWJsZSkge1xuICAgICAgICAgICAgbGV0IHRpbWVTbG90cyA9IGludGVyd2FsLnRpbWVTbG90cztcbiAgICAgICAgICAgIHZhciBhdmFpbGFibGVUaW1lU2xvdCA9IHRoaXMuZ2V0Rmlyc3RBdmFpbGFibGVUaW1lU2xvdCh0aW1lU2xvdHMpO1xuXG5cbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBzZWxlY3RlZEludGVydmFsOiBpbmRleCwgc2VsZWN0ZWRUaW1lU2xvdDogYXZhaWxhYmxlVGltZVNsb3QgfSk7XG4gICAgICAgIH1cblxuICAgIH1cbiAgICBvblRpbWVTbG90Q2xpY2sodGltZVNsb3QsIHNlbGVjdGVkSW5kZXgsIGluZGV4KSB7XG5cbiAgICAgICAgaWYgKHNlbGVjdGVkSW5kZXggIT09IGluZGV4ICYmIHRpbWVTbG90LmlzQXZhaWxhYmxlKSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgc2VsZWN0ZWRUaW1lU2xvdDogaW5kZXggfSk7XG4gICAgICAgICAgICAvLyBjYWxsaW5nIHBhcmVudCB0aW1lU2xvdCBzZXR0ZXJcbiAgICAgICAgICAgIHRoaXMucHJvcHMuc2VsZWN0VGltZVNsb3QodGltZVNsb3QpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgbGV0IHsgZGF0ZXMgfSA9IHRoaXMucHJvcHMudGltZVNsb3RzXG5cbiAgICAgICAgbGV0IGludGVydmFscyA9IFtdXG4gICAgICAgIGxldCB0aW1lU2xvdHMgPSBbXVxuICAgICAgICBsZXQgZGF0ZUxpc3QgPSBbXVxuXG5cbiAgICAgICAgZGF0ZUxpc3QgPSBkYXRlcy5tYXAoKGRhdGUsIGkpID0+IHtcbiAgICAgICAgICAgIGxldCBkYXlEYXRlID0gbmV3IERhdGUoZGF0ZS5kYXRlKS5nZXREYXRlKClcbiAgICAgICAgICAgIGxldCBkYXlOYW1lID0gZ2V0RGF5TmFtZShkYXRlLmRhdGUpO1xuICAgICAgICAgICAgbGV0IHNlbGVjdGVkID0gdGhpcy5zdGF0ZS5zZWxlY3RlZERheSA9PSBpXG4gICAgICAgICAgICByZXR1cm4gPGRpdiBrZXk9e2l9IG9uQ2xpY2s9e3RoaXMub25EYXRlQ2xpY2suYmluZCh0aGlzLCBkYXRlLCB0aGlzLnN0YXRlLnNlbGVjdGVkRGF5LCBpKX0gY2xhc3NOYW1lPXtkYXRlLmlzQXZhaWxhYmxlID8gKHNlbGVjdGVkID8gXCJkYXRlVGlsZSBzZWxlY3RlZFwiIDogXCJkYXRlVGlsZVwiKSA6IFwiZGF0ZVRpbGUgZGlzYWJsZWRcIn0+XG4gICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwiZGF0ZVwiPntkYXlEYXRlfTwvcD5cbiAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJkYXlcIj57ZGF5TmFtZX08L3A+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgfSlcbiAgICAgICAgaW50ZXJ2YWxzID0gZGF0ZXNbdGhpcy5zdGF0ZS5zZWxlY3RlZERheV0uaW50ZXJ2YWxzLm1hcCgoaW50ZXJ2YWwsIGkpID0+IHtcbiAgICAgICAgICAgIGxldCBzZWxlY3RlZCA9IHRoaXMuc3RhdGUuc2VsZWN0ZWRJbnRlcnZhbCA9PSBpXG4gICAgICAgICAgICByZXR1cm4gPGJ1dHRvbiBrZXk9e2l9IG9uQ2xpY2s9e3RoaXMub25JbnRlcnZhbENsaWNrLmJpbmQodGhpcywgaW50ZXJ2YWwsIHRoaXMuc3RhdGUuc2VsZWN0ZWRJbnRlcnZhbCwgaSl9IGNsYXNzTmFtZT17aW50ZXJ2YWwuaXNBdmFpbGFibGUgPyAoc2VsZWN0ZWQgPyBcInRzQnRuIHNlbGVjdGVkXCIgOiBcInRzQnRuXCIpIDogXCJ0c0J0biBkaXNhYmxlZFwifT57aW50ZXJ2YWwubmFtZX08L2J1dHRvbj5cbiAgICAgICAgfSlcblxuICAgICAgICB0aW1lU2xvdHMgPSBkYXRlc1t0aGlzLnN0YXRlLnNlbGVjdGVkRGF5XS5pbnRlcnZhbHNbdGhpcy5zdGF0ZS5zZWxlY3RlZEludGVydmFsXS50aW1lU2xvdHMubWFwKChzbG90LCBpKSA9PiB7XG4gICAgICAgICAgICBsZXQgc2VsZWN0ZWQgPSB0aGlzLnN0YXRlLnNlbGVjdGVkVGltZVNsb3QgPT0gaVxuICAgICAgICAgICAgbGV0IHNsb3RUZXh0ID0gZ2V0VGltZShzbG90LnN0YXJ0KVxuICAgICAgICAgICAgaWYoc2xvdC5lbmQpe1xuICAgICAgICAgICAgICAgIHNsb3RUZXh0ICs9IGAgLSAke2dldFRpbWUoc2xvdC5lbmQpfWBcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiA8c3BhbiBrZXk9e2l9IG9uQ2xpY2s9e3RoaXMub25UaW1lU2xvdENsaWNrLmJpbmQodGhpcywgc2xvdCwgdGhpcy5zdGF0ZS5zZWxlY3RlZFRpbWVTbG90LCBpKX0gY2xhc3NOYW1lPXtzbG90LmlzQXZhaWxhYmxlID8gKHNlbGVjdGVkID8gXCJzbG90IHNlbGVjdGVkXCIgOiBcInNsb3RcIikgOiBcInNsb3QgZGlzYWJsZWRcIn0+e3Nsb3RUZXh0fTwvc3Bhbj5cbiAgICAgICAgfSlcblxuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRpbWVTbG90U2VsZWN0b3JcIj5cbiAgICAgICAgICAgICAgICA8aDU+U2VsZWN0IHByZWZmZXJlZCB0aW1lIHNsb3Q8L2g1PlxuXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJkYXRlQ2FyXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic2Nyb2xsZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtkYXRlTGlzdH1cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRpbWVTbG90c1wiPlxuICAgICAgICAgICAgICAgICAgICB7aW50ZXJ2YWxzfVxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNsb3RzXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICB7dGltZVNsb3RzfVxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBUaW1lU2xvdFNlbGVjdG9yXG4iLCJpbXBvcnQgVGltZVNsb3RTZWxlY3RvciBmcm9tICcuL1RpbWVTbG90U2VsZWN0b3IuanMnXG5cbmV4cG9ydCBkZWZhdWx0IFRpbWVTbG90U2VsZWN0b3IiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgUHJvZmlsZVNsaWRlciBmcm9tICcuLi9wcm9maWxlU2xpZGVyL2luZGV4LmpzJ1xuaW1wb3J0IEFwcG9pbnRtZW50TGlzdCBmcm9tICcuL2FwcG9pbnRtZW50TGlzdC9pbmRleC5qcydcblxuY2xhc3MgVXNlckFwcG9pbnRtZW50c1ZpZXcgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgICAgICB0aGlzLnN0YXRlID0ge1xuXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgdGhpcy5wcm9wcy5nZXRVc2VyUHJvZmlsZVdpdGhBcHBvaW50bWVudHMoKVxuICAgIH1cblxuICAgIHN0YXRpYyBjb250ZXh0VHlwZXMgPSB7XG4gICAgICAgIHJvdXRlcjogKCkgPT4gbnVsbFxuICAgIH1cblxuICAgIGNvbXBhcmVEYXRlV2l0aFRvZGF5KGRhdGUpe1xuICAgICAgICBsZXQgdG9kYXkgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKVxuICAgICAgICBkYXRlID0gbmV3IERhdGUoZGF0ZSkuZ2V0VGltZSgpXG4gICAgICAgIHJldHVybiB0b2RheSA+IGRhdGVcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgbGV0IHNlbGVjdGVkVXNlciA9IG51bGxcbiAgICAgICAgbGV0IHVzZXJQcm9maWxlSWQgPSB0aGlzLnByb3BzLm1hdGNoLnBhcmFtcy5pZFxuXG4gICAgICAgIGlmICh0aGlzLnByb3BzLlVTRVIucHJvZmlsZXNbdXNlclByb2ZpbGVJZF0pIHtcbiAgICAgICAgICAgIHNlbGVjdGVkVXNlciA9IHRoaXMucHJvcHMuVVNFUi5wcm9maWxlc1t1c2VyUHJvZmlsZUlkXVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgT2JqZWN0LmtleXModGhpcy5wcm9wcy5VU0VSLnByb2ZpbGVzKS5tYXAoKHByb2ZpbGVJZCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnByb3BzLlVTRVIucHJvZmlsZXNbcHJvZmlsZUlkXS5pc0RlZmF1bHRVc2VyKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkVXNlciA9IHRoaXMucHJvcHMuVVNFUi5wcm9maWxlc1twcm9maWxlSWRdXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInVzZXJQcm9maWxlXCI+XG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAoIHNlbGVjdGVkVXNlciAmJiBzZWxlY3RlZFVzZXIuYXBwb2ludG1lbnRzICkgPyA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPFByb2ZpbGVTbGlkZXJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9maWxlcz17dGhpcy5wcm9wcy5VU0VSLnByb2ZpbGVzfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1YlJvdXRlPVwiL2FwcG9pbnRtZW50c1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidXBjb21pbmdhcHBcIj5VcGNvbWluZyBPUEQgQXBwb2ludG1lbnRzPC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkVXNlci5hcHBvaW50bWVudHMuZmlsdGVyKChhcHBvaW50bWVudCxpKSA9PntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGRhdGUgPSBhcHBvaW50bWVudC5zbG90ID8gYXBwb2ludG1lbnQuc2xvdC5zdGFydCA6IDBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICF0aGlzLmNvbXBhcmVEYXRlV2l0aFRvZGF5KGRhdGUpIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLm1hcCgoYXBwb2ludG1lbnQsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiA8QXBwb2ludG1lbnRMaXN0IGtleT17aW5kZXh9IGRhdGE9e2FwcG9pbnRtZW50fSAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJwcmV2YXBwXCI+UHJldmlvdXMgT1BEIEFwcG9pbnRtZW50czwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZFVzZXIuYXBwb2ludG1lbnRzLmZpbHRlcigoYXBwb2ludG1lbnQsaSkgPT57XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkYXRlID0gYXBwb2ludG1lbnQuc2xvdCA/IGFwcG9pbnRtZW50LnNsb3Quc3RhcnQgOiAwXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNvbXBhcmVEYXRlV2l0aFRvZGF5KGRhdGUpIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLm1hcCgoYXBwb2ludG1lbnQsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiA8QXBwb2ludG1lbnRMaXN0IGtleT17aW5kZXh9IGRhdGE9e2FwcG9pbnRtZW50fSAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PiA6IFwiXCJcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBVc2VyQXBwb2ludG1lbnRzVmlld1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBSaWdodEFycm93SWNvbiBmcm9tICdtYXRlcmlhbC11aS1pY29ucy9LZXlib2FyZEFycm93UmlnaHQnO1xuXG5jbGFzcyBBcHBvaW50bWVudExpc3QgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgIH1cblxuICAgIGdldFRpbWUodW5peF90aW1lc3RhbXApIHtcbiAgICAgICAgdmFyIGRhdGUgPSBuZXcgRGF0ZSh1bml4X3RpbWVzdGFtcCAqIDEwMDApO1xuICAgICAgICB2YXIgaG91cnMgPSBkYXRlLmdldEhvdXJzKCk7XG4gICAgICAgIHZhciBtaW51dGVzID0gXCIwXCIgKyBkYXRlLmdldE1pbnV0ZXMoKTtcbiAgICAgICAgcmV0dXJuIGhvdXJzICsgJzonICsgbWludXRlcy5zdWJzdHIoLTIpXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIGxldCB7IGRvY3Rvck5hbWUsIHNsb3QgfSA9IHRoaXMucHJvcHMuZGF0YVxuICAgICAgICBzbG90ID0gc2xvdCB8fCB7XG4gICAgICAgICAgICBzdGFydDogMCxcbiAgICAgICAgICAgIGVuZDogMFxuICAgICAgICB9XG4gICAgICAgIGxldCBkYXRlID0gbmV3IERhdGUoc2xvdC5zdGFydCkudG9EYXRlU3RyaW5nKClcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhcHBvaW50bWVudFwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibmFtZVwiPlxuXG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJkZXRhaWxzXCI+XG4gICAgICAgICAgICAgICAgICAgIDxwPlxuICAgICAgICAgICAgICAgICAgICAgICAge2RvY3Rvck5hbWV9XG4gICAgICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICAgICAgPHA+XG4gICAgICAgICAgICAgICAgICAgICAgICB7ZGF0ZX1cbiAgICAgICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgICAgICAgICAgIHt0aGlzLmdldFRpbWUoc2xvdC5zdGFydCkgKyBcIiB0byBcIiArIHRoaXMuZ2V0VGltZShzbG90LmVuZCl9XG4gICAgICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJvb2tcIj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dFwiPlZpZXcgQ29uZmlybWF0aW9uPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8UmlnaHRBcnJvd0ljb24gY2xhc3NOYW1lPVwiYm9va0ljb25cIiAvPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IEFwcG9pbnRtZW50TGlzdFxuIiwiaW1wb3J0IEFwcG9pbnRtZW50TGlzdCBmcm9tICcuL0FwcG9pbnRtZW50TGlzdC5qcydcblxuZXhwb3J0IGRlZmF1bHQgQXBwb2ludG1lbnRMaXN0IiwiaW1wb3J0IFVzZXJBcHBvaW50bWVudHNWaWV3IGZyb20gJy4vVXNlckFwcG9pbnRtZW50c1ZpZXcuanMnXG5cbmV4cG9ydCBkZWZhdWx0IFVzZXJBcHBvaW50bWVudHNWaWV3IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IFByb2ZpbGVTbGlkZXIgZnJvbSAnLi4vcHJvZmlsZVNsaWRlci9pbmRleC5qcydcbmltcG9ydCBQcm9maWxlRGF0YSBmcm9tICcuL3Byb2ZpbGVEYXRhL2luZGV4LmpzJ1xuXG5jbGFzcyBVc2VyUHJvZmlsZVZpZXcgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgICAgICB0aGlzLnN0YXRlID0ge1xuXG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIHRoaXMucHJvcHMuZ2V0VXNlclByb2ZpbGUoKVxuICAgIH1cblxuICAgIHN0YXRpYyBjb250ZXh0VHlwZXMgPSB7XG4gICAgICAgIHJvdXRlcjogKCkgPT4gbnVsbFxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICBsZXQgc2VsZWN0ZWRVc2VyID0gbnVsbFxuICAgICAgICBsZXQgdXNlclByb2ZpbGVJZCA9IHRoaXMucHJvcHMubWF0Y2gucGFyYW1zLmlkXG5cbiAgICAgICAgaWYgKHRoaXMucHJvcHMuVVNFUi5wcm9maWxlc1t1c2VyUHJvZmlsZUlkXSkge1xuICAgICAgICAgICAgc2VsZWN0ZWRVc2VyID0gdGhpcy5wcm9wcy5VU0VSLnByb2ZpbGVzW3VzZXJQcm9maWxlSWRdXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBPYmplY3Qua2V5cyh0aGlzLnByb3BzLlVTRVIucHJvZmlsZXMpLm1hcCgocHJvZmlsZUlkKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucHJvcHMuVVNFUi5wcm9maWxlc1twcm9maWxlSWRdLmlzRGVmYXVsdFVzZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRVc2VyID0gdGhpcy5wcm9wcy5VU0VSLnByb2ZpbGVzW3Byb2ZpbGVJZF1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ1c2VyUHJvZmlsZVwiPlxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRVc2VyID8gPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxQcm9maWxlU2xpZGVyIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb2ZpbGVzPXt0aGlzLnByb3BzLlVTRVIucHJvZmlsZXN9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3ViUm91dGU9XCJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxQcm9maWxlRGF0YSBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9maWxlRGF0YT17c2VsZWN0ZWRVc2VyfVxuICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+IDogXCJcIlxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IFVzZXJQcm9maWxlVmlld1xuIiwiaW1wb3J0IFVzZXJQcm9maWxlVmlldyBmcm9tICcuL1VzZXJQcm9maWxlVmlldy5qcydcblxuZXhwb3J0IGRlZmF1bHQgVXNlclByb2ZpbGVWaWV3IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuY2xhc3MgUHJvZmlsZURhdGEgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgIH1cblxuICAgIG9wZW5BcHBvaW50bWVudHMocHJvZmlsZUlkKSB7XG4gICAgICAgIHRoaXMuY29udGV4dC5yb3V0ZXIuaGlzdG9yeS5wdXNoKGAvdXNlci8ke3Byb2ZpbGVJZH0vYXBwb2ludG1lbnRzYClcblxuICAgIH1cblxuICAgIG9wZW5SZXBvcnRzKHByb2ZpbGVJZCkge1xuICAgICAgICB0aGlzLmNvbnRleHQucm91dGVyLmhpc3RvcnkucHVzaChgL3VzZXIvJHtwcm9maWxlSWR9L3JlcG9ydHNgKVxuXG4gICAgfVxuXG4gICAgc3RhdGljIGNvbnRleHRUeXBlcyA9IHtcbiAgICAgICAgcm91dGVyOiAoKSA9PiBudWxsXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIGxldCB7bmFtZSwgZ2VuZGVyLCBhZ2UsIG1vYmlsZSwgbWVkaWNhbEhpc3RvcnlDb3VudCwgbWVkaWNhbFRlc3RDb3VudCwgb25saW5lQ29uc3VsdGF0aW9uQ291bnQsIG9wZFZpc2l0Q291bnQsIHByb2ZpbGVJZH0gPSB0aGlzLnByb3BzLnByb2ZpbGVEYXRhXG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXY+ICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidXNlckRlYWlsXCI+XG4gICAgICAgICAgICAgICAgICAgIDxwPntuYW1lfTwvcD5cbiAgICAgICAgICAgICAgICAgICAgPHA+e2FnZX0gWWVhcnM8L3A+XG4gICAgICAgICAgICAgICAgICAgIDxwPntnZW5kZXJ9PC9wPlxuICAgICAgICAgICAgICAgICAgICA8cD57bW9iaWxlfTwvcD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInByb2ZpbGVCdG5zXCI+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24+UHJvZmlsZSBOb3QgVmVyaWZpZWQ8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbj5ObyBPUEQgSW5zdXJhbmNlPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24+T25saW5lIENvbnN1bHRhdGlvbnMoe29ubGluZUNvbnN1bHRhdGlvbkNvdW50fSk8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXt0aGlzLm9wZW5BcHBvaW50bWVudHMuYmluZCh0aGlzLHByb2ZpbGVJZCl9Pk9QRCBWaXNpdHMgKHtvcGRWaXNpdENvdW50fSk8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbj5NZWRpY2FsIEhpc3RvcnkgKHttZWRpY2FsSGlzdG9yeUNvdW50fSk8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXt0aGlzLm9wZW5SZXBvcnRzLmJpbmQodGhpcyxwcm9maWxlSWQpfT5UZXN0IFJlcG9ydHMgKHttZWRpY2FsVGVzdENvdW50fSk8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBQcm9maWxlRGF0YVxuIiwiaW1wb3J0IFByb2ZpbGVEYXRhIGZyb20gJy4vUHJvZmlsZURhdGEuanMnXG5cbmV4cG9ydCBkZWZhdWx0IFByb2ZpbGVEYXRhIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IFByb2ZpbGVTbGlkZXIgZnJvbSAnLi4vcHJvZmlsZVNsaWRlci9pbmRleC5qcydcbmltcG9ydCBSZXBvcnRMaXN0IGZyb20gJy4vcmVwb3J0TGlzdC9pbmRleC5qcydcblxuY2xhc3MgVXNlclJlcG9ydHNWaWV3IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcblxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIHRoaXMucHJvcHMuZ2V0VXNlclByb2ZpbGVXaXRoVGVzdHMoKVxuICAgIH1cblxuICAgIHN0YXRpYyBjb250ZXh0VHlwZXMgPSB7XG4gICAgICAgIHJvdXRlcjogKCkgPT4gbnVsbFxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICBsZXQgc2VsZWN0ZWRVc2VyID0gbnVsbFxuICAgICAgICBsZXQgdXNlclByb2ZpbGVJZCA9IHRoaXMucHJvcHMubWF0Y2gucGFyYW1zLmlkXG5cbiAgICAgICAgaWYgKHRoaXMucHJvcHMuVVNFUi5wcm9maWxlc1t1c2VyUHJvZmlsZUlkXSkge1xuICAgICAgICAgICAgc2VsZWN0ZWRVc2VyID0gdGhpcy5wcm9wcy5VU0VSLnByb2ZpbGVzW3VzZXJQcm9maWxlSWRdXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBzZWxlY3RpbmcgZGVmYXVsdCB1c2VyXG4gICAgICAgICAgICBPYmplY3Qua2V5cyh0aGlzLnByb3BzLlVTRVIucHJvZmlsZXMpLm1hcCgocHJvZmlsZUlkKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucHJvcHMuVVNFUi5wcm9maWxlc1twcm9maWxlSWRdLmlzRGVmYXVsdFVzZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRVc2VyID0gdGhpcy5wcm9wcy5VU0VSLnByb2ZpbGVzW3Byb2ZpbGVJZF1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidXNlclByb2ZpbGVcIj5cbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIChzZWxlY3RlZFVzZXIgJiYgc2VsZWN0ZWRVc2VyLnRlc3RzKSA/IDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8UHJvZmlsZVNsaWRlclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb2ZpbGVzPXt0aGlzLnByb3BzLlVTRVIucHJvZmlsZXN9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3ViUm91dGU9XCIvcmVwb3J0c1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidXBjb21pbmdhcHBcIj5SZXBvcnRzPC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkVXNlci50ZXN0cy5tYXAoKHRlc3QsIGkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDxSZXBvcnRMaXN0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhPXt0ZXN0fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5PXtpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+IDogXCJcIlxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IFVzZXJSZXBvcnRzVmlld1xuIiwiaW1wb3J0IFVzZXJSZXBvcnRzVmlldyBmcm9tICcuL1VzZXJSZXBvcnRzVmlldy5qcydcblxuZXhwb3J0IGRlZmF1bHQgVXNlclJlcG9ydHNWaWV3IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuY2xhc3MgUmVwb3J0TGlzdCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgfVxuXG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgbGV0IHsgbmFtZSwgc3ViX25hbWUsIGFiYnJldmlhdGlvbiwgY2F0ZWdvcnksIHNsb3QgIH0gPSB0aGlzLnByb3BzLmRhdGFcbiAgICAgICAgc2xvdCA9IHNsb3QgfHwge1xuICAgICAgICAgICAgc3RhcnQ6IDAsXG4gICAgICAgICAgICBlbmQ6IDBcbiAgICAgICAgfVxuICAgICAgICBsZXQgZGF0ZSA9IG5ldyBEYXRlKHNsb3Quc3RhcnQpLnRvRGF0ZVN0cmluZygpXG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYXBwb2ludG1lbnRcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImRldGFpbHNcIj5cbiAgICAgICAgICAgICAgICAgICAgPHA+XG4gICAgICAgICAgICAgICAgICAgICAgICB7bmFtZSArIFwiICwgXCIgKyBzdWJfbmFtZX1cbiAgICAgICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtjYXRlZ29yeSArIFwiICwgXCIgKyBhYmJyZXZpYXRpb259XG4gICAgICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICAgICAgPHA+XG4gICAgICAgICAgICAgICAgICAgICAgICB7ZGF0ZX1cbiAgICAgICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYm9va1wiPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ2aWV3cmVwb3J0XCI+VmlldyBSZXBvcnQ8L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgUmVwb3J0TGlzdFxuIiwiaW1wb3J0IFJlcG9ydExpc3QgZnJvbSAnLi9SZXBvcnRMaXN0LmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBSZXBvcnRMaXN0IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cbmltcG9ydCBMYWJEZXRhaWxzIGZyb20gJy4uL2NvbW1vbnMvbGFiRGV0YWlscy9pbmRleC5qcydcbmltcG9ydCBPcmRlckRldGFpbHMgZnJvbSAnLi4vY29tbW9ucy9vcmRlckRldGFpbHMvaW5kZXguanMnXG5cbmNsYXNzIEJvb2tpbmdTdW1tYXJ5VmlldyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgICBib29raW5nSWQ6IG51bGwsXG4gICAgICAgICAgICBib29raW5nRGV0YWlsczogbnVsbFxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0TG9jYXRpb25QYXJhbSh0YWcpIHtcbiAgICAgICAgLy8gdGhpcyBBUEkgYXNzdW1lcyB0aGUgY29udGV4dCBvZiByZWFjdC1yb3V0ZXItNFxuICAgICAgICBjb25zdCBwYXJhbVN0cmluZyA9IHRoaXMucHJvcHMubG9jYXRpb24uc2VhcmNoXG4gICAgICAgIGNvbnN0IHBhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXMocGFyYW1TdHJpbmcpXG4gICAgICAgIHJldHVybiBwYXJhbXMuZ2V0KHRhZylcbiAgICB9XG5cbiAgICBwcm9jZWVkKCkge1xuICAgICAgICB0aGlzLmNvbnRleHQucm91dGVyLmhpc3RvcnkucHVzaCgnL3BheW1lbnQnKVxuICAgIH1cblxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgICBsZXQgYm9va2luZ0lkID0gdGhpcy5wcm9wcy5tYXRjaC5wYXJhbXMuaWRcbiAgICAgICAgaWYgKGJvb2tpbmdJZCkge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGJvb2tpbmdJZCB9KVxuICAgICAgICAgICAgdGhpcy5wcm9wcy5nZXRMYWJCb29raW5nU3VtbWFyeShib29raW5nSWQsIChib29raW5nRGV0YWlscykgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBib29raW5nRGV0YWlsczogYm9va2luZ0RldGFpbHMuZGF0YSB9KVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN0YXRpYyBjb250ZXh0VHlwZXMgPSB7XG4gICAgICAgIHJvdXRlcjogKCkgPT4gbnVsbFxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwYXRpZW50RGV0YWlsc1wiPlxuXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlLmJvb2tpbmdEZXRhaWxzID9cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8TGFiRGV0YWlscyBkYXRhPXt0aGlzLnN0YXRlLmJvb2tpbmdEZXRhaWxzLmxhYn0gLz5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic2VsZWN0ZWRBcHBvaW50bWVudFNsb3RcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGg1PlNlbGVjdGVkIEFwcG9pbnRtZW50IFNsb3Q8L2g1PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJhcHBkYXRlXCI+QXBwb2ludG1lbnQgRGF0ZTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZGF0ZVwiPnt0aGlzLnN0YXRlLmJvb2tpbmdEZXRhaWxzLnNlbGVjdGVkU2xvdFN0YXJ0fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic2VsZWN0ZWRBcHBvaW50bWVudFNsb3RcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17e3dpZHRoOicxMDAlJywgZmxvYXQ6J2xlZnQnfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJhcHBkYXRlXCI+UGF0aWVudCBOYW1lPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZGF0ZVwiPnt0aGlzLnN0YXRlLmJvb2tpbmdEZXRhaWxzLnBhdGllbnREZXRhaWxzLm5hbWV9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17e3dpZHRoOicxMDAlJywgZmxvYXQ6J2xlZnQnfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJhcHBkYXRlXCI+UGF0aWVudCBBZGRyZXNzPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZGF0ZVwiPnt0aGlzLnN0YXRlLmJvb2tpbmdEZXRhaWxzLnBhdGllbnREZXRhaWxzLmFkZHJlc3N9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxPcmRlckRldGFpbHMgZGF0YT17dGhpcy5zdGF0ZS5ib29raW5nRGV0YWlscy5sYWJ9IC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJwcm9jZWVkYnRuXCIgb25DbGljaz17dGhpcy5wcm9jZWVkLmJpbmQodGhpcyl9PlByb2NlZWQgdG8gUGF5bWVudDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+IDogXCJcIlxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IEJvb2tpbmdTdW1tYXJ5Vmlld1xuIiwiaW1wb3J0IEJvb2tpbmdTdW1tYXJ5VmlldyBmcm9tICcuL0Jvb2tpbmdTdW1tYXJ5Vmlldy5qcydcblxuZXhwb3J0IGRlZmF1bHQgQm9va2luZ1N1bW1hcnlWaWV3IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IENoaXAgZnJvbSAnbWF0ZXJpYWwtdWkvQ2hpcCc7XG5cblxuY2xhc3MgQ29tbW9ubHlTZWFyY2hlZCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG5cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICBsZXQgcm93cyA9IHRoaXMucHJvcHMuZGF0YS5tYXAoKHJvdykgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJvcHMudHlwZSA9PSAnbGFiJykge1xuICAgICAgICAgICAgICAgIHJldHVybiA8bGkga2V5PXtyb3cuaWR9PlxuICAgICAgICAgICAgICAgICAgICA8c3BhblxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiY3QtaW1nIGxhYi1pbWdcIlxuICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aW1nIHNyYz1cIi9hc3NldHMvaW1nL2N1c3RvbWVyLWljb25zL2xhYjEucG5nXCIgY2xhc3NOYW1lPVwiaW1nLWZsdWlkXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJsYWItbmFtZVwiPlNMUiBEaWdub3N0aWNzPC9wPlxuICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGxldCBzZWxlY3RlZCA9IGZhbHNlXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5zZWxlY3RlZC5tYXAoKGN1cnIpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYoY3Vyci5pZCA9PSByb3cuaWQpe1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWQgPSB0cnVlXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIHJldHVybiA8bGkga2V5PXtyb3cuaWR9PlxuICAgICAgICAgICAgICAgICAgICA8YVxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtzZWxlY3RlZCA/IFwidi1idG4gdi1idG4tcHJpbWFyeSB0YWctc20gb3V0bGluZSBzZWxlY3RlZFwiIDogXCJ2LWJ0biB2LWJ0bi1wcmltYXJ5IHRhZy1zbSBvdXRsaW5lXCJ9XG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMudG9nZ2xlKCh0aGlzLnByb3BzLnR5cGUgfHwgcm93LnR5cGUpLCByb3cpXG4gICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICB7cm93Lm5hbWV9XG4gICAgICAgICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0pXG5cbiAgICAgICAgbGV0IGRpdkNsYXNzID0gYHBhbmVsLWNvbnRlbnRgXG4gICAgICAgIGxldCB1bENsYXNzID0gYGlubGluZS1saXN0YFxuXG4gICAgICAgIGlmICh0aGlzLnByb3BzLnR5cGUgPT0gJ2xhYicpIHtcbiAgICAgICAgICAgIGRpdkNsYXNzID0gYHBhbmVsLWNvbnRlbnQgdG90YWwtbGFic2BcbiAgICAgICAgICAgIHVsQ2xhc3MgPSBgaW5saW5lLWxpc3QgbGFiLWl0ZW1zYFxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3aWRnZXQtcGFuZWxcIj5cbiAgICAgICAgICAgICAgICA8aDQgY2xhc3NOYW1lPVwicGFuZWwtdGl0bGVcIj57dGhpcy5wcm9wcy5oZWFkaW5nfTwvaDQ+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2RpdkNsYXNzfT5cbiAgICAgICAgICAgICAgICAgICAgPHVsIGNsYXNzTmFtZT17dWxDbGFzc30+XG4gICAgICAgICAgICAgICAgICAgICAgICB7cm93c31cbiAgICAgICAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBDb21tb25seVNlYXJjaGVkXG4iLCJpbXBvcnQgQ29tbW9ubHlTZWFyY2hlZCBmcm9tICcuL0NvbW1vbmx5U2VhcmNoZWQuanMnXG5cblxuZXhwb3J0IGRlZmF1bHQgQ29tbW9ubHlTZWFyY2hlZCIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG5pbXBvcnQgTGFiVGVzdHMgZnJvbSAnLi4vbGFiVGVzdHMnXG5cbmNsYXNzIExhYkRldGFpbHMgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8c2VjdGlvbiBjbGFzc05hbWU9XCJ3cmFwIHByb2ZpbGUtYm9vay1zY3JlZW5cIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lci1mbHVpZFwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtMTJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIndpZGdldCBwcm9maWxlLWJvb2tcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3aWRnZXQtaGVhZGVyIHBiLWhlYWRlciB0ZXh0LWNlbnRlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwYi1sb2dvXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGltZyBzcmM9XCIvYXNzZXRzL2ltZy9jdXN0b21lci1pY29ucy9sYWIxLnBuZ1wiIGNsYXNzTmFtZT1cImltZy1mbHVpZFwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoNCBjbGFzc05hbWU9XCJ3aWRnZXQtdGl0bGUgcGItdGl0bGVcIj5TUkwgRGlnbm9zdGljczwvaDQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJsb2NhdGlvblwiPlNlY3RvciA1MiBHdXJnYW9uIHwgPHNwYW4gY2xhc3NOYW1lPVwiY3QtaW1nIGN0LWltZy14c1wiPjxpbWcgc3JjPVwiL2Fzc2V0cy9pbWcvY3VzdG9tZXItaWNvbnMvbWFwLW1hcmtlci5zdmdcIiBjbGFzc05hbWU9XCJpbWctZmx1aWRcIiAvPjwvc3Bhbj4xLjVLTTwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx1bCBjbGFzc05hbWU9XCJsaXN0IHRpbWUtY29udGFjdFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZnctNzAwIHRleHQtc21cIj5UaW1pbmc6IC08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDc6MzAgQU0gdG8gODozMCBQTVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJvcGVuLWNsb3NlXCI+T3BlbiBUb2RheTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZnctNzAwIHRleHQtc21cIj5Db250YWN0OiAtPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAwMTIwIDEyMzQ1NjcsIDAxMjAgNzY1NDMyMVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJvcGVuLWNsb3NlXCI+Q2FsbCBOb3c8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxMYWJUZXN0cyB7Li4udGhpcy5wcm9wc30gLz5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIndpZGdldC1jb250ZW50IHBiLWRldGFpbHMgcGItbG9jYXRpb25cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoNCBjbGFzc05hbWU9XCJ3Yy10aXRsZSB0ZXh0LW1kIGZ3LTcwMFwiPkxvY2F0aW9uPC9oND5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRkcmVzcy1kZXRhaWxzXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGltZyBzcmM9XCIvYXNzZXRzL2ltZy9jdXN0b21lci1pY29ucy9tYXAtaWNvbi5wbmdcIiBjbGFzc05hbWU9XCJpbWctZmx1aWQgYWRkLW1hcFwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwiYWRkLWluZm9cIj4xOTYsIEh1ZGEgUGxvdCwgTmVhciwgRGV2aW5kZXIgVmloYXIsIFNlY3RvciA1NiwgR3VydWdyYW0sIEhhcnlhbmEgMTIyMDExPC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBiLXZpZXcgdGV4dC1sZWZ0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGEgaHJlZj1cIiNcIiBjbGFzc05hbWU9XCJsaW5rLXRleHQgdGV4dC1tZCBmdy03MDBcIj5WaWV3IGluIEdvb2dsZSBNYXA8L2E+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwid2lkZ2V0LWNvbnRlbnQgcGItZGV0YWlscyBwYi1mYWNpbGl0eVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGg0IGNsYXNzTmFtZT1cIndjLXRpdGxlIHRleHQtbWQgZnctNzAwXCI+RmFjaWxpdHk8L2g0PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHVsIGNsYXNzTmFtZT1cImxpc3QgcGItbGlzdCBmYWNpbHR5LWxpc3RcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGk+UGFya2luZyBBdmFpbGFibGU8L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaT5DYXJkIEFjY2VwdGVkPC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGk+RSBSZXBvcnQgQXZhaWxhYmxlPC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGk+SG9tZSBDaGVrdXAgQXZhaWxhYmxlPC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIndpZGdldC1jb250ZW50IHBiLWRldGFpbHMgcGItYWJvdXRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoNCBjbGFzc05hbWU9XCJ3Yy10aXRsZSB0ZXh0LW1kIGZ3LTcwMFwiPkFib3V0PC9oND5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwPkxvcmVtIGlwc3VtIGRvbG9yIHNpdCBhbWV0LCBjb25zZWN0ZXR1ciBhZGlwaXNpY2luZyBlbGl0LCBzZWQgZG8gZWl1c21vZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZW1wb3IgaW5jaWRpZHVudCB1dCBsYWJvcmUgZXQgZG9sb3JlIG1hZ25hIGFsaXF1YS4gVXQgZW5pbSBhZCBtaW5pbSB2ZW5pYW0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBxdWlzIG5vc3RydWQgZXhlcmNpdGF0aW9uIHVsbGFtY28gbGFib3JpcyBuaXNpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9zZWN0aW9uPlxuICAgICAgICApO1xuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBMYWJEZXRhaWxzXG4iLCJpbXBvcnQgTGFiRGV0YWlscyBmcm9tICcuL0xhYkRldGFpbC5qcydcblxuZXhwb3J0IGRlZmF1bHQgTGFiRGV0YWlscyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmNsYXNzIExhYlByb2ZpbGVDYXJkIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICB9XG5cbiAgICBvcGVuTGFiKGlkKXtcbiAgICAgICAgdGhpcy5wcm9wcy5oaXN0b3J5LnB1c2goYC9sYWIvJHtpZH0vYm9va2ApXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIGxldCB7IHByaWNlLCBsYWIgfSA9IHRoaXMucHJvcHMuZGV0YWlsc1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIndpZGdldCBjYXJkXCIgb25DbGljaz17dGhpcy5vcGVuTGFiLmJpbmQodGhpcyx0aGlzLnByb3BzLmRldGFpbHMubGFiLmlkKX0+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3aWRnZXQtY29udGVudCBjYXJkLWNvbnRlbnQgYm9vay1jYXJkXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibG9nby1yYXR0aW5nXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJjdC1pbWcgbGFiLWljb25cIj48aW1nIHNyYz1cIi9hc3NldHMvaW1nL2N1c3RvbWVyLWljb25zL2xhYjEucG5nXCIgY2xhc3NOYW1lPVwiaW1nLWZsdWlkXCIgLz48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dWwgY2xhc3NOYW1lPVwiaW5saW5lLWxpc3QgcmF0dGluZ1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaT48c3BhbiBjbGFzc05hbWU9XCJjdC1pbWcgY3QtaW1nLXhzIHN0YXItaWNvblwiPjxpbWcgc3JjPVwiL2Fzc2V0cy9pbWcvY3VzdG9tZXItaWNvbnMvc3Rhci5zdmdcIiBjbGFzc05hbWU9XCJpbWctZmx1aWRcIiAvPjwvc3Bhbj48L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaT48c3BhbiBjbGFzc05hbWU9XCJjdC1pbWcgY3QtaW1nLXhzIHN0YXItaWNvblwiPjxpbWcgc3JjPVwiL2Fzc2V0cy9pbWcvY3VzdG9tZXItaWNvbnMvc3Rhci5zdmdcIiBjbGFzc05hbWU9XCJpbWctZmx1aWRcIiAvPjwvc3Bhbj48L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaT48c3BhbiBjbGFzc05hbWU9XCJjdC1pbWcgY3QtaW1nLXhzIHN0YXItaWNvblwiPjxpbWcgc3JjPVwiL2Fzc2V0cy9pbWcvY3VzdG9tZXItaWNvbnMvc3Rhci5zdmdcIiBjbGFzc05hbWU9XCJpbWctZmx1aWRcIiAvPjwvc3Bhbj48L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaT48c3BhbiBjbGFzc05hbWU9XCJjdC1pbWcgY3QtaW1nLXhzIHN0YXItaWNvblwiPjxpbWcgc3JjPVwiL2Fzc2V0cy9pbWcvY3VzdG9tZXItaWNvbnMvc3Rhci5zdmdcIiBjbGFzc05hbWU9XCJpbWctZmx1aWRcIiAvPjwvc3Bhbj48L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaT48c3BhbiBjbGFzc05hbWU9XCJjdC1pbWcgY3QtaW1nLXhzIHN0YXItaWNvblwiPjxpbWcgc3JjPVwiL2Fzc2V0cy9pbWcvY3VzdG9tZXItaWNvbnMvaGFsZi1zdGFyLnN2Z1wiIGNsYXNzTmFtZT1cImltZy1mbHVpZFwiIC8+PC9zcGFuPjwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJ2LWJ0biB2LWJ0bi1wcmltYXJ5IHBpY2t1cC1idG5cIj5QaWNrdXAgQXZhaWxhYmxlPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJvb2stY2FyZC1jb250ZW50XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aDQgY2xhc3NOYW1lPVwiYm9vay1jYXJ0LXRpdGxlXCI+e2xhYi5uYW1lfTwvaDQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJkZXNjXCI+Qmxvb2QgVGVzdCwgUGF0aG9sb2d5IFVsdHJhc291bmQsIE1SSSwgQ1RJIFNlY3RvciA1MiBHdXJnYW9uIHwgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1wcmltYXJ5IGZ3LTcwMFwiPjEuNSBLTTwvc3Bhbj48L3A+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwid2lkZ2V0LWZvb3RlciBjYXJkLWZvb3RlclwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtNlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cImxhYi1wcmljZVwiPlRvdGFsIFJzIHtwcmljZX08L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLTYgdGV4dC1yaWdodFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwidi1idG4gdi1idG4tcHJpbWFyeSBidG4tbWRcIj5Cb29rIExhYjwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IExhYlByb2ZpbGVDYXJkXG4iLCJpbXBvcnQgTGFiUHJvZmlsZUNhcmQgZnJvbSAnLi9MYWJQcm9maWxlQ2FyZC5qcydcblxuZXhwb3J0IGRlZmF1bHQgTGFiUHJvZmlsZUNhcmQiLCJpbXBvcnQgTGFiVGVzdHMgZnJvbSAnLi9sYWJUZXN0cydcblxuZXhwb3J0IGRlZmF1bHQgTGFiVGVzdHMiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcblxuY2xhc3MgTGFiVGVzdHMgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgfVxuXG4gICAgb3BlblRlc3RzKCkge1xuICAgICAgICB0aGlzLnByb3BzLmhpc3RvcnkucHVzaChgL2xhYi8ke3RoaXMucHJvcHMuZGF0YS5sYWIuaWR9L3Rlc3RzYClcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgbGV0IHRlc3RzID0gW11cbiAgICAgICAgaWYgKHRoaXMucHJvcHMuZGF0YS50ZXN0cyAmJiB0aGlzLnByb3BzLmRhdGEudGVzdHMubGVuZ3RoKSB7XG4gICAgICAgICAgICB0ZXN0cyA9IHRoaXMucHJvcHMuZGF0YS50ZXN0cy5tYXAoKHRlc3QsIGkpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gPGxpIGtleT17aX0+e3Rlc3QudGVzdC5uYW1lfSA8c3BhbiBjbGFzc05hbWU9XCJ0ZXN0LXByaWNlXCI+UnMge3Rlc3QubXJwfTwvc3Bhbj48L2xpPlxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIndpZGdldC1jb250ZW50IHBiLWRldGFpbHMgcGItdGVzdFwiPlxuICAgICAgICAgICAgICAgIDxoNCBjbGFzc05hbWU9XCJ3Yy10aXRsZSB0ZXh0LW1kIGZ3LTcwMFwiPlRlc3RzICh7dGVzdHMubGVuZ3RofSk8L2g0PlxuICAgICAgICAgICAgICAgIDx1bCBjbGFzc05hbWU9XCJsaXN0IHBiLWxpc3QgcGItdGVzdC1saXN0XCI+XG4gICAgICAgICAgICAgICAgICAgIHt0ZXN0cy5zbGljZSgwLDMpfVxuICAgICAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwYi12aWV3IHRleHQtcmlnaHRcIj5cbiAgICAgICAgICAgICAgICAgICAgPGEgY2xhc3NOYW1lPVwibGluay10ZXh0IHRleHQtbWQgZnctNzAwXCIgb25DbGljaz17dGhpcy5vcGVuVGVzdHMuYmluZCh0aGlzKX0+VmlldyBBbGw8L2E+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgTGFiVGVzdHNcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG5pbXBvcnQgRXhwYW5zaW9uUGFuZWwsIHtcbiAgICBFeHBhbnNpb25QYW5lbFN1bW1hcnksXG4gICAgRXhwYW5zaW9uUGFuZWxEZXRhaWxzLFxufSBmcm9tICdtYXRlcmlhbC11aS9FeHBhbnNpb25QYW5lbCc7XG5pbXBvcnQgRXhwYW5kTW9yZUljb24gZnJvbSAnbWF0ZXJpYWwtdWktaWNvbnMvRXhwYW5kTW9yZSc7XG5cblxuY2xhc3MgT3JkZXJEZXRhaWxzIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcblxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICBsZXQgcHJpY2VfYnJlYWt1cCA9IFtdXG4gICAgICAgIGxldCB0b3RhbFByaWNlID0gMFxuICAgICAgICBsZXQgdG90YWxUZXN0cyA9IDBcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuZGF0YS5wcmljZV9icmVha3VwICYmIHRoaXMucHJvcHMuZGF0YS5wcmljZV9icmVha3VwLmJyZWFrdXApIHtcbiAgICAgICAgICAgIHByaWNlX2JyZWFrdXAgPSB0aGlzLnByb3BzLmRhdGEucHJpY2VfYnJlYWt1cC5icmVha3VwLm1hcCgodGVzdCwgaSkgPT4ge1xuICAgICAgICAgICAgICAgIHRvdGFsUHJpY2UgKz0gdGVzdC5hbW91bnRcbiAgICAgICAgICAgICAgICB0b3RhbFRlc3RzKytcbiAgICAgICAgICAgICAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9XCJ0ZXN0UHJpY2VSb3dcIiBrZXk9e2l9PlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0bmFtZVwiPnt0ZXN0Lm5hbWV9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0YW1vdW50XCI+UnMuIHt0ZXN0LmFtb3VudH08L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwib3JkZXJEZXRhaWxzXCI+XG4gICAgICAgICAgICAgICAgPEV4cGFuc2lvblBhbmVsPlxuICAgICAgICAgICAgICAgICAgICA8RXhwYW5zaW9uUGFuZWxTdW1tYXJ5IGV4cGFuZEljb249ezxFeHBhbmRNb3JlSWNvbiAvPn0+XG4gICAgICAgICAgICAgICAgICAgICAgICBPcmRlciBEZXRhaWxzIC0ge3RvdGFsVGVzdHN9IFRlc3RzXG4gICAgICAgICAgICAgICAgICAgIDwvRXhwYW5zaW9uUGFuZWxTdW1tYXJ5PlxuICAgICAgICAgICAgICAgICAgICA8RXhwYW5zaW9uUGFuZWxEZXRhaWxzPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwcmljZUNvbnRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7cHJpY2VfYnJlYWt1cH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRlc3RUb3RhbFJvd1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0bmFtZVwiPntcIlRvdGFsXCJ9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0YW1vdW50XCI+UnMuIHt0b3RhbFByaWNlfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRlc3RUb3RhbFJvd1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0bmFtZVwiPntcIkdTVFwifTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGFtb3VudFwiPlJzLiB7dG90YWxQcmljZSoxLjE4fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRlc3RUb3RhbFJvd1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0bmFtZVwiPntcIlBheWFibGVcIn08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRhbW91bnRcIj5Scy4ge3RvdGFsUHJpY2UqMS4xOH08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9FeHBhbnNpb25QYW5lbERldGFpbHM+XG4gICAgICAgICAgICAgICAgPC9FeHBhbnNpb25QYW5lbD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBPcmRlckRldGFpbHNcbiIsImltcG9ydCBPcmRlckRldGFpbHMgZnJvbSAnLi9PcmRlckRldGFpbHMuanMnXG5cbmV4cG9ydCBkZWZhdWx0IE9yZGVyRGV0YWlscyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBsaWdodEJhc2VUaGVtZSB9IGZyb20gJ21hdGVyaWFsLXVpL3N0eWxlcyc7XG5pbXBvcnQgTG9hZGVyIGZyb20gJy4uLy4uL2NvbW1vbnMvTG9hZGVyJ1xuXG5jb25zdCBkZWJvdW5jZXIgPSAoZm4sIGRlbGF5KSA9PiB7XG4gICAgbGV0IHRpbWVyID0gbnVsbFxuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aW1lcilcbiAgICAgICAgdGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIGZuLmNhbGwodGhpcylcbiAgICAgICAgfSwgZGVsYXkpXG4gICAgfVxufVxuXG5cbmNsYXNzIENyaXRlcmlhU2VhcmNoVmlldyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgICBzZWFyY2hWYWx1ZTogJycsXG4gICAgICAgICAgICBzZWFyY2hSZXN1bHRzOiBbXVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIHRoaXMuZ2V0U2VhcmNoUmVzdWx0cyA9IGRlYm91bmNlcih0aGlzLmdldFNlYXJjaFJlc3VsdHMuYmluZCh0aGlzKSwgMTAwMClcbiAgICAgICAgbGV0IGlucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RvcENyaXRlcmlhU2VhcmNoJylcbiAgICAgICAgaW5wdXQuZm9jdXMoKVxuICAgIH1cblxuICAgIGlucHV0SGFuZGxlcihlKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBzZWFyY2hWYWx1ZTogZS50YXJnZXQudmFsdWUgfSlcbiAgICAgICAgdGhpcy5nZXRTZWFyY2hSZXN1bHRzKClcbiAgICB9XG5cbiAgICBnZXRTZWFyY2hSZXN1bHRzKCkge1xuICAgICAgICB0aGlzLnByb3BzLmdldERpYWdub3Npc0NyaXRlcmlhUmVzdWx0cyh0aGlzLnN0YXRlLnNlYXJjaFZhbHVlLCAoc2VhcmNoUmVzdWx0cykgPT4ge1xuICAgICAgICAgICAgaWYgKHNlYXJjaFJlc3VsdHMpIHtcbiAgICAgICAgICAgICAgICBsZXQgdGVzdHMgPSBzZWFyY2hSZXN1bHRzLnRlc3RzLm1hcCh4ID0+IHsgcmV0dXJuIHsgLi4ueCwgdHlwZTogJ3Rlc3QnIH0gfSlcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgc2VhcmNoUmVzdWx0czogWy4uLnRlc3RzXSB9KVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIGFkZENyaXRlcmlhKGNyaXRlcmlhKSB7XG4gICAgICAgIHRoaXMucHJvcHMudG9nZ2xlRGlhZ25vc2lzQ3JpdGVyaWEoY3JpdGVyaWEudHlwZSwgY3JpdGVyaWEpXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBzZWFyY2hWYWx1ZTogXCJcIiB9KVxuICAgIH1cblxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIGxldCBsb2NhdGlvbiA9IFwiR3VyZ2FvblwiXG4gICAgICAgIGlmICh0aGlzLnByb3BzLnNlbGVjdGVkTG9jYXRpb24pIHtcbiAgICAgICAgICAgIGxvY2F0aW9uID0gdGhpcy5wcm9wcy5zZWxlY3RlZExvY2F0aW9uLmZvcm1hdHRlZF9hZGRyZXNzLnNsaWNlKDAsIDUpXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICA8aGVhZGVyIGNsYXNzTmFtZT1cInNraW4tcHJpbWFyeSBmaXhlZCBob3Jpem9udGFsIHRvcCBjdC1oZWFkZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250YWluZXItZmx1aWRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtMTJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJuYXZpZ2F0ZS1yb3dcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx1bCBjbGFzc05hbWU9XCJpbmxpbmUtbGlzdCB0b3AtbmF2IGFscGhhLWJ4IHRleHQtd2hpdGVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5oaXN0b3J5LmdvKC0xKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpPjxzcGFuIGNsYXNzTmFtZT1cImN0LWltZyBjdC1pbWctc20gYXJyb3ctaW1nXCI+PGltZyBzcmM9XCIvYXNzZXRzL2ltZy9jdXN0b21lci1pY29ucy9sZWZ0LWFycm93LnN2Z1wiIGNsYXNzTmFtZT1cImltZy1mbHVpZFwiIC8+PC9zcGFuPjwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpPjxkaXYgY2xhc3NOYW1lPVwic2NyZWVuLXRpdGxlXCI+U2VhcmNoPC9kaXY+PC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dWwgY2xhc3NOYW1lPVwiaW5saW5lLWxpc3QgdG9wLW5hdiBiZXRhLWJ4IGZsb2F0LXJpZ2h0IHRleHQtcmlnaHQgdGV4dC13aGl0ZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnByb3BzLmhpc3RvcnkucHVzaCgnL2xvY2F0aW9uc2VhcmNoJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaT48ZGl2IGNsYXNzTmFtZT1cInNjcmVlbi10aXRsZVwiPjxzcGFuIGNsYXNzTmFtZT1cImN0LWltZyBjdC1pbWctc20gbWFwLW1hcmtlci1pbWdcIj48aW1nIHNyYz1cIi9hc3NldHMvaW1nL2N1c3RvbWVyLWljb25zL21hcC1tYXJrZXIuc3ZnXCIgY2xhc3NOYW1lPVwiaW1nLWZsdWlkXCIgLz48L3NwYW4+IHtsb2NhdGlvbn08L2Rpdj48L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtMTJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzZWFyY2gtcm93XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkb24tZ3JvdXBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2wgaW5wdXQtbWQgc2VhcmNoLWlucHV0XCIgaWQ9XCJ0b3BDcml0ZXJpYVNlYXJjaFwiIG9uQ2hhbmdlPXt0aGlzLmlucHV0SGFuZGxlci5iaW5kKHRoaXMpfSB2YWx1ZT17dGhpcy5zdGF0ZS5zZWFyY2hWYWx1ZX0gcGxhY2Vob2xkZXI9XCJTZWFyY2ggZm9yIFRlc3QgJiBMYWJzXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJjdC1pbWcgY3QtaW1nLXNtIHNlYXJjaC1pY29uXCI+PGltZyBzcmM9XCIvYXNzZXRzL2ltZy9jdXN0b21lci1pY29ucy9zZWFyY2gtaWNvbi5zdmdcIiAvPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2hlYWRlcj5cblxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZS5zZWFyY2hWYWx1ZSA/XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzZWN0aW9uIGNsYXNzTmFtZT1cIndyYXAgd3JhcC0xMDBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIndpZGdldC1wYW5lbFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDQgY2xhc3NOYW1lPVwicGFuZWwtdGl0bGVcIj5TZWFyY2ggUmVzdWx0PC9oND5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwYW5lbC1jb250ZW50XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dWwgY2xhc3NOYW1lPVwibGlzdCBzZWFyY2gtcmVzdWx0LWxpc3RcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUuc2VhcmNoUmVzdWx0cy5tYXAoKGN1cnIsIGkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiA8bGkgb25DbGljaz17dGhpcy5hZGRDcml0ZXJpYS5iaW5kKHRoaXMsIGN1cnIpfSBrZXk9e2l9PjxhPntjdXJyLm5hbWV9PC9hPjwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3NlY3Rpb24+XG4gICAgICAgICAgICAgICAgICAgICAgICA6ICh0aGlzLnByb3BzLmNoZWNrRm9yTG9hZCA/IHRoaXMucHJvcHMuY2hpbGRyZW4gOiA8TG9hZGVyIC8+KVxuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IENyaXRlcmlhU2VhcmNoVmlld1xuIiwiaW1wb3J0IENyaXRlcmlhU2VhcmNoVmlldyBmcm9tICcuL0NyaXRlcmlhU2VhcmNoVmlldy5qcydcblxuZXhwb3J0IGRlZmF1bHQgQ3JpdGVyaWFTZWFyY2hWaWV3IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IExhYkRldGFpbHMgZnJvbSAnLi4vY29tbW9ucy9sYWJEZXRhaWxzL2luZGV4LmpzJ1xuaW1wb3J0IExvYWRlciBmcm9tICcuLi8uLi9jb21tb25zL0xvYWRlcidcblxuY2xhc3MgTGFiVmlldyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgICBzZWxlY3RlZExhYjogbnVsbFxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIGxldCBsYWJJZCA9IHRoaXMucHJvcHMubWF0Y2gucGFyYW1zLmlkXG5cbiAgICAgICAgaWYgKGxhYklkKSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgc2VsZWN0ZWRMYWI6IGxhYklkIH0pXG4gICAgICAgICAgICB0aGlzLnByb3BzLmdldExhYkJ5SWQobGFiSWQpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYXBwb2ludG1lbnRTbG90XCI+XG4gICAgICAgICAgICAgICAgPGhlYWRlciBjbGFzc05hbWU9XCJza2luLXByaW1hcnkgZml4ZWQgaG9yaXpvbnRhbCB0b3AgcHJvZmlsZS1ib29rLWhlYWRlclwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lci1mbHVpZFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC00XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaGVhZGVyLXRpdGxlIGZ3LTcwMCBjYXBpdGFsaXplIHRleHQtd2hpdGVcIj5JQ09OPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtNFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLTRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHVsIGNsYXNzTmFtZT1cImlubGluZS1saXN0IGZsb2F0LXJpZ2h0IHVzZXItbm90aWZpY2F0aW9uLWFjdGlvblwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpPjxzcGFuIGNsYXNzTmFtZT1cImljb24gaWNvbi1tZCB0ZXh0LW1pZGRsZVwiPjxpbWcgc3JjPVwiL2Fzc2V0cy9pbWcvY3VzdG9tZXItaWNvbnMvdXNlci5zdmdcIiBjbGFzc05hbWU9XCJpbWctZmx1aWRcIiAvPjwvc3Bhbj48L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpPjxzcGFuIGNsYXNzTmFtZT1cImljb24gaWNvbi1tZCB0ZXh0LW1pZGRsZSBub3RpZmljYXRpb24taWNvblwiPjxpbWcgc3JjPVwiL2Fzc2V0cy9pbWcvY3VzdG9tZXItaWNvbnMvbm90aWZpY2F0aW9uLnN2Z1wiIGNsYXNzTmFtZT1cImltZy1mbHVpZFwiIC8+IDxzcGFuIGNsYXNzTmFtZT1cIm5vdGlmaWNhdGlvbi1hbGVydFwiIC8+PC9zcGFuPjwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9oZWFkZXI+XG5cbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuTEFCU1t0aGlzLnN0YXRlLnNlbGVjdGVkTGFiXSA/XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic2tpbi1wcmltYXJ5IGVtcHR5LWhlYWRlciBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxMYWJEZXRhaWxzIHsuLi50aGlzLnByb3BzfSBkYXRhPXt0aGlzLnByb3BzLkxBQlNbdGhpcy5zdGF0ZS5zZWxlY3RlZExhYl19IC8+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cInYtYnRuIHYtYnRuLXByaW1hcnkgYnRuLWxnIGZpeGVkIGhvcml6b250YWwgYm90dG9tIG5vLXJvdW5kIGJ0bi1sZyB0ZXh0LWxnXCI+PHNwYW4gY2xhc3NOYW1lPVwidGV4dC14cyBzZWxlY3RlZC1vcHRpb25cIj4oe3RoaXMucHJvcHMuc2VsZWN0ZWRDcml0ZXJpYXMubGVuZ3RofSBTZWxlY3RlZCkgPC9zcGFuPkJvb2tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cblxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+IDogPExvYWRlciAvPlxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBMYWJWaWV3XG4iLCJpbXBvcnQgTGFiVmlldyBmcm9tICcuL0xhYlZpZXcuanMnXG5cbmV4cG9ydCBkZWZhdWx0IExhYlZpZXciLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcblxuaW1wb3J0IExhYkRldGFpbHMgZnJvbSAnLi4vY29tbW9ucy9sYWJEZXRhaWxzL2luZGV4LmpzJ1xuaW1wb3J0IE9yZGVyRGV0YWlscyBmcm9tICcuLi9jb21tb25zL29yZGVyRGV0YWlscy9pbmRleC5qcydcbmltcG9ydCBEZXRhaWxzRm9ybSBmcm9tICcuL2RldGFpbHNGb3JtL2luZGV4LmpzJ1xuaW1wb3J0IEFkZHJlc3NGb3JtIGZyb20gJy4vYWRkcmVzc0Zvcm0vaW5kZXguanMnO1xuXG5jbGFzcyBQYXRpZW50RGV0YWlsc1ZpZXcgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgc2VsZWN0ZWRMYWI6IG51bGwsXG4gICAgICAgICAgICBzZWxlY3RlZFRlc3RzOiBcIlwiLFxuICAgICAgICAgICAgc2VsZWN0ZWRTbG90OiBudWxsLFxuICAgICAgICAgICAgc2VsZWN0ZWRTbG90U3RhcnQgOiBudWxsLFxuICAgICAgICAgICAgc2VsZWN0ZWRTbG90RW5kIDogbnVsbFxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0TG9jYXRpb25QYXJhbSh0YWcpIHtcbiAgICAgICAgLy8gdGhpcyBBUEkgYXNzdW1lcyB0aGUgY29udGV4dCBvZiByZWFjdC1yb3V0ZXItNFxuICAgICAgICBjb25zdCBwYXJhbVN0cmluZyA9IHRoaXMucHJvcHMubG9jYXRpb24uc2VhcmNoXG4gICAgICAgIGNvbnN0IHBhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXMocGFyYW1TdHJpbmcpXG4gICAgICAgIHJldHVybiBwYXJhbXMuZ2V0KHRhZylcbiAgICB9XG5cbiAgICBwcm9jZWVkKCl7XG4gICAgICAgIHRoaXMuY29udGV4dC5yb3V0ZXIuaGlzdG9yeS5wdXNoKCcvbGFiL2Jvb2tpbmcvc3VtbWFyeS9JVUhCVUg4Nzg3VUhCJylcbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgbGV0IGxhYklkID0gdGhpcy5wcm9wcy5tYXRjaC5wYXJhbXMuaWRcbiAgICAgICAgbGV0IHRlc3RzID0gdGhpcy5nZXRMb2NhdGlvblBhcmFtKCd0ZXN0cycpXG4gICAgICAgIGxldCBzZWxlY3RlZFNsb3RTdGFydCA9IHRoaXMuZ2V0TG9jYXRpb25QYXJhbSgndF9zdGFydCcpXG4gICAgICAgIHNlbGVjdGVkU2xvdFN0YXJ0ID0gbmV3IERhdGUocGFyc2VGbG9hdChzZWxlY3RlZFNsb3RTdGFydCkpXG4gICAgICAgIHNlbGVjdGVkU2xvdFN0YXJ0ID0gc2VsZWN0ZWRTbG90U3RhcnQudG9TdHJpbmcoKVxuICAgICAgICBsZXQgc2VsZWN0ZWRTbG90RW5kID0gdGhpcy5nZXRMb2NhdGlvblBhcmFtKCd0X2VuZCcpXG4gICAgICAgIHNlbGVjdGVkU2xvdEVuZCA9IG5ldyBEYXRlKHBhcnNlRmxvYXQoc2VsZWN0ZWRTbG90RW5kKSlcbiAgICAgICAgc2VsZWN0ZWRTbG90RW5kID0gc2VsZWN0ZWRTbG90RW5kLnRvU3RyaW5nKClcbiAgICAgICAgaWYgKGxhYklkKSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgc2VsZWN0ZWRMYWI6IGxhYklkLCBzZWxlY3RlZFRlc3RzOiB0ZXN0cywgc2VsZWN0ZWRTbG90U3RhcnQsIHNlbGVjdGVkU2xvdEVuZCB9KVxuICAgICAgICAgICAgdGhpcy5wcm9wcy5nZXRMYWJCeUlkKGxhYklkKVxuXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdGF0aWMgY29udGV4dFR5cGVzID0ge1xuICAgICAgICByb3V0ZXI6ICgpID0+IG51bGxcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGF0aWVudERldGFpbHNcIj5cblxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5MQUJTW3RoaXMuc3RhdGUuc2VsZWN0ZWRMYWJdID9cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPExhYkRldGFpbHMgZGF0YT17dGhpcy5wcm9wcy5MQUJTW3RoaXMuc3RhdGUuc2VsZWN0ZWRMYWJdfSAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxPcmRlckRldGFpbHMgZGF0YT17dGhpcy5wcm9wcy5MQUJTW3RoaXMuc3RhdGUuc2VsZWN0ZWRMYWJdfSAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic2VsZWN0ZWRBcHBvaW50bWVudFNsb3RcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGg1PlNlbGVjdGVkIEFwcG9pbnRtZW50IFNsb3Q8L2g1PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJhcHBkYXRlXCI+QXBwb2ludG1lbnQgRGF0ZTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZGF0ZVwiPnsgdGhpcy5zdGF0ZS5zZWxlY3RlZFNsb3RTdGFydCB9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxEZXRhaWxzRm9ybSAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxBZGRyZXNzRm9ybSBjaXR5PVwiU2VsZWN0ZWQgdmFsdWVcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwicHJvY2VlZGJ0blwiIG9uQ2xpY2s9e3RoaXMucHJvY2VlZC5iaW5kKHRoaXMpfT5Qcm9jZWVkPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj4gOiBcIlwiXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgUGF0aWVudERldGFpbHNWaWV3XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcblxuY2xhc3MgQWRkcmVzc0Zvcm0gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgYWRkcmVzczonJyxcbiAgICAgICAgICAgIGxvY2FsaXR5OicnLFxuICAgICAgICAgICAgbGFuZG1hcms6JycsXG4gICAgICAgICAgICBwaW5jb2RlOicnLFxuICAgICAgICAgICAgY2l0eTpwcm9wcy5jaXR5XG5cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlucHV0SGFuZGxlcih3aGljaCwgZSl7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBbd2hpY2hdIDogZS50YXJnZXQudmFsdWUgfSlcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZGV0YWlsc0Zvcm1cIj5cbiAgICAgICAgICAgICAgICA8aDU+UGxlYXNlIHByb3ZpZGUgcGF0aWVudCBkZXRhaWxzPC9oNT5cblxuICAgICAgICAgICAgICAgIDxpbnB1dCB2YWx1ZT17dGhpcy5zdGF0ZS5hZGRyZXNzfSBvbkNoYW5nZT17dGhpcy5pbnB1dEhhbmRsZXIuYmluZCh0aGlzLCdhZGRyZXNzJyl9IGNsYXNzTmFtZT1cInB0bmFtZVwiIHBsYWNlaG9sZGVyPVwiQWRkcmVzcypcIiAvPlxuICAgICAgICAgICAgICAgIDxpbnB1dCB2YWx1ZT17dGhpcy5zdGF0ZS5sb2NhbGl0eX0gb25DaGFuZ2U9e3RoaXMuaW5wdXRIYW5kbGVyLmJpbmQodGhpcywnbG9jYWxpdHknKX0gY2xhc3NOYW1lPVwicHRuYW1lXCIgcGxhY2Vob2xkZXI9XCJMb2NhbGl0eSpcIiAvPlxuICAgICAgICAgICAgICAgIDxpbnB1dCB2YWx1ZT17dGhpcy5zdGF0ZS5sYW5kbWFya30gb25DaGFuZ2U9e3RoaXMuaW5wdXRIYW5kbGVyLmJpbmQodGhpcywnbGFuZG1hcmsnKX0gY2xhc3NOYW1lPVwicHRuYW1lXCIgcGxhY2Vob2xkZXI9XCJMYW5kbWFyaypcIiAvPlxuICAgICAgICAgICAgICAgIDxpbnB1dCB2YWx1ZT17dGhpcy5zdGF0ZS5waW5jb2RlfSBvbkNoYW5nZT17dGhpcy5pbnB1dEhhbmRsZXIuYmluZCh0aGlzLCdwaW5jb2RlJyl9IGNsYXNzTmFtZT1cInB0bW9iaWxlXCIgcGxhY2Vob2xkZXI9XCJQaW5jb2RlKlwiIC8+XG4gICAgICAgICAgICAgICAgey8qIDxpbnB1dCB2YWx1ZT17dGhpcy5zdGF0ZS5jaXR5fSBvbkNoYW5nZT17dGhpcy5pbnB1dEhhbmRsZXIuYmluZCh0aGlzLCdjaXR5Jyl9IGRpc2FibGVkIGNsYXNzTmFtZT1cInB0b3RwXCIgcGxhY2Vob2xkZXI9XCJDaXR5XCIgLz4gKi99XG5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBBZGRyZXNzRm9ybVxuIiwiaW1wb3J0IEFkZHJlc3NGb3JtIGZyb20gJy4vQWRkcmVzc0Zvcm0uanMnXG5cbmV4cG9ydCBkZWZhdWx0IEFkZHJlc3NGb3JtIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cbmNsYXNzIERldGFpbHNGb3JtIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIHBhdGllbnROYW1lIDogJycsXG4gICAgICAgICAgICBwYXRpZW50RW1haWwgOiAnJyxcbiAgICAgICAgICAgIHBhdGllbnRHZW5kZXIgOiAnbWFsZScsXG4gICAgICAgICAgICBtb2JpbGU6JycsXG4gICAgICAgICAgICBvdHAgOicnLFxuICAgICAgICAgICAgcGF0aWVudE1vYmlsZSA6ICcnXG5cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlucHV0SGFuZGxlcih3aGljaCwgZSl7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBbd2hpY2hdIDogZS50YXJnZXQudmFsdWUgfSlcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZGV0YWlsc0Zvcm1cIj5cbiAgICAgICAgICAgICAgICA8aDU+UGxlYXNlIHByb3ZpZGUgcGF0aWVudCBkZXRhaWxzPC9oNT5cblxuICAgICAgICAgICAgICAgIDxpbnB1dCB2YWx1ZT17dGhpcy5zdGF0ZS5wYXRpZW50TmFtZX0gb25DaGFuZ2U9e3RoaXMuaW5wdXRIYW5kbGVyLmJpbmQodGhpcywncGF0aWVudE5hbWUnKX0gY2xhc3NOYW1lPVwicHRuYW1lXCIgcGxhY2Vob2xkZXI9XCJQYXRpZW50IE5hbWUqXCIgLz5cbiAgICAgICAgICAgICAgICA8aW5wdXQgdmFsdWU9e3RoaXMuc3RhdGUucGF0aWVudEVtYWlsfSBvbkNoYW5nZT17dGhpcy5pbnB1dEhhbmRsZXIuYmluZCh0aGlzLCdwYXRpZW50RW1haWwnKX0gY2xhc3NOYW1lPVwicHRlbWFpbFwiIHBsYWNlaG9sZGVyPVwiRW1haWwqXCIgLz5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInB0Z2VuZGVyXCI+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuPkdlbmRlciA6PC9zcGFuPiBcbiAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJyYWRpb1wiIG5hbWU9XCJnZW5kZXJcIiB2YWx1ZT1cIm1hbGVcIiBjaGVja2VkPXt0aGlzLnN0YXRlLnBhdGllbnRHZW5kZXIgPT09IFwibWFsZVwifSBvbkNoYW5nZT17dGhpcy5pbnB1dEhhbmRsZXIuYmluZCh0aGlzLCdwYXRpZW50R2VuZGVyJyl9Lz4gTWFsZVxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInJhZGlvXCIgbmFtZT1cImdlbmRlclwiIHZhbHVlPVwiZmVtYWxlXCIgY2hlY2tlZD17dGhpcy5zdGF0ZS5wYXRpZW50R2VuZGVyID09PSBcImZlbWFsZVwifSBvbkNoYW5nZT17dGhpcy5pbnB1dEhhbmRsZXIuYmluZCh0aGlzLCdwYXRpZW50R2VuZGVyJyl9Lz4gRmVtYWxlXG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGlucHV0IHZhbHVlPXt0aGlzLnN0YXRlLm1vYmlsZX0gb25DaGFuZ2U9e3RoaXMuaW5wdXRIYW5kbGVyLmJpbmQodGhpcywnbW9iaWxlJyl9IGNsYXNzTmFtZT1cInB0bW9iaWxlXCIgcGxhY2Vob2xkZXI9XCJNb2JpbGUqXCIgLz5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cIm90cGJ0blwiPihSZSlTZW5kIE9UUDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDxpbnB1dCB2YWx1ZT17dGhpcy5zdGF0ZS5vdHB9IG9uQ2hhbmdlPXt0aGlzLmlucHV0SGFuZGxlci5iaW5kKHRoaXMsJ290cCcpfSBjbGFzc05hbWU9XCJwdG90cFwiIHBsYWNlaG9sZGVyPVwiRW50ZXIgT1RQKlwiIC8+XG4gICAgICAgICAgICAgICAgPGlucHV0IHZhbHVlPXt0aGlzLnN0YXRlLnBhdGllbnRNb2JpbGV9IG9uQ2hhbmdlPXt0aGlzLmlucHV0SGFuZGxlci5iaW5kKHRoaXMsJ3BhdGllbnRNb2JpbGUnKX0gY2xhc3NOYW1lPVwicHRtb2JpbGVcIiBwbGFjZWhvbGRlcj1cIlBhdGllbnQgTW9iaWxlKlwiIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICBcbiAgICAgICAgKTtcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgRGV0YWlsc0Zvcm1cbiIsImltcG9ydCBEZXRhaWxzRm9ybSBmcm9tICcuL0RldGFpbHNGb3JtLmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBEZXRhaWxzRm9ybSIsImltcG9ydCBQYXRpZW50RGV0YWlsc1ZpZXcgZnJvbSAnLi9QYXRpZW50RGV0YWlsc1ZpZXcuanMnXG5cbmV4cG9ydCBkZWZhdWx0IFBhdGllbnREZXRhaWxzVmlldyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG5pbXBvcnQgQ29tbW9ubHlTZWFyY2hlZCBmcm9tICcuLi9jb21tb25zL2NvbW1vbmx5U2VhcmNoZWQvaW5kZXguanMnXG5pbXBvcnQgQ3JpdGVyaWFTZWFyY2ggZnJvbSAnLi4vY3JpdGVyaWFTZWFyY2gnXG5cbmNsYXNzIFNlYXJjaENyaXRlcmlhVmlldyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG5cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNlYXJjaFByb2NlZWQoKSB7XG4gICAgICAgIGxldCBzZWFyY2hEYXRhID0ge1xuICAgICAgICAgICAgc2VsZWN0ZWRDcml0ZXJpYXMgOiB0aGlzLnByb3BzLnNlbGVjdGVkQ3JpdGVyaWFzLFxuICAgICAgICAgICAgc2VsZWN0ZWRMb2NhdGlvbiA6IHRoaXMucHJvcHMuc2VsZWN0ZWRMb2NhdGlvbixcbiAgICAgICAgfVxuICAgICAgICBzZWFyY2hEYXRhID0gZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNlYXJjaERhdGEpKVxuICAgICAgICBsZXQgZmlsdGVyRGF0YSA9IGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeSh0aGlzLnByb3BzLmZpbHRlckNyaXRlcmlhKSlcbiAgICAgICAgdGhpcy5wcm9wcy5oaXN0b3J5LnB1c2goYC9keC9zZWFyY2hyZXN1bHRzP3NlYXJjaD0ke3NlYXJjaERhdGF9JmZpbHRlcj0ke2ZpbHRlckRhdGF9YClcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXY+XG5cbiAgICAgICAgICAgICAgICA8Q3JpdGVyaWFTZWFyY2ggey4uLnRoaXMucHJvcHN9IGNoZWNrRm9yTG9hZD17dGhpcy5wcm9wcy5MT0FERURfU0VBUkNIX0NSSVRFUklBX0xBQn0+XG4gICAgICAgICAgICAgICAgICAgIDxzZWN0aW9uIGNsYXNzTmFtZT1cIndyYXAgd3JhcC0xMDBcIj5cblxuICAgICAgICAgICAgICAgICAgICAgICAgPENvbW1vbmx5U2VhcmNoZWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWFkaW5nPVwiU2VsZWN0ZWQgQ3JpdGVyaWFcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE9e3RoaXMucHJvcHMuc2VsZWN0ZWRDcml0ZXJpYXN9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWQ9e1tdfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvZ2dsZT17dGhpcy5wcm9wcy50b2dnbGVEaWFnbm9zaXNDcml0ZXJpYS5iaW5kKHRoaXMpfVxuICAgICAgICAgICAgICAgICAgICAgICAgLz5cblxuICAgICAgICAgICAgICAgICAgICAgICAgPENvbW1vbmx5U2VhcmNoZWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWFkaW5nPVwiQ29tbW9uIFRlc3RcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJ0ZXN0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhPXt0aGlzLnByb3BzLmNvbW1vbl90ZXN0c31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZD17dGhpcy5wcm9wcy5zZWxlY3RlZENyaXRlcmlhcy5maWx0ZXIoeCA9PiB4LnR5cGUgPT0gJ3Rlc3QnKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b2dnbGU9e3RoaXMucHJvcHMudG9nZ2xlRGlhZ25vc2lzQ3JpdGVyaWEuYmluZCh0aGlzKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxDb21tb25seVNlYXJjaGVkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGluZz1cIkNvbW1vbiBDb25kaXRpb25zXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwibGFiXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhPXt0aGlzLnByb3BzLmNvbW1vbl9jb25kaXRpb25zfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkPXt0aGlzLnByb3BzLnNlbGVjdGVkQ3JpdGVyaWFzLmZpbHRlcih4ID0+IHgudHlwZSA9PSAnbGFiJyl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9nZ2xlPXt0aGlzLnByb3BzLnRvZ2dsZURpYWdub3Npc0NyaXRlcmlhLmJpbmQodGhpcyl9XG4gICAgICAgICAgICAgICAgICAgICAgICAvPlxuXG4gICAgICAgICAgICAgICAgICAgICAgICA8Q29tbW9ubHlTZWFyY2hlZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRpbmc9XCJDb21tb24gTGFic1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImxhYlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YT17dGhpcy5wcm9wcy5wcmVmZXJyZWRfbGFic31cbiAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgIDwvc2VjdGlvbj5cbiAgICAgICAgICAgICAgICA8L0NyaXRlcmlhU2VhcmNoPlxuXG5cblxuICAgICAgICAgICAgICAgIDxidXR0b24gb25DbGljaz17dGhpcy5zZWFyY2hQcm9jZWVkLmJpbmQodGhpcyl9IGNsYXNzTmFtZT1cInYtYnRuIHYtYnRuLXByaW1hcnkgYnRuLWxnIGZpeGVkIGhvcml6b250YWwgYm90dG9tIG5vLXJvdW5kIHRleHQtbGdcIj5TaG93IExhYnM8L2J1dHRvbj5cblxuXG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFNlYXJjaENyaXRlcmlhVmlld1xuIiwiaW1wb3J0IFNlYXJjaENyaXRlcmlhVmlldyBmcm9tICcuL1NlYXJjaENyaXRlcmlhVmlldy5qcydcblxuZXhwb3J0IGRlZmF1bHQgU2VhcmNoQ3JpdGVyaWFWaWV3IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IExhYnNMaXN0IGZyb20gJy4uL3NlYXJjaFJlc3VsdHMvbGFic0xpc3QvaW5kZXguanMnXG5pbXBvcnQgQ3JpdGVyaWFTZWFyY2ggZnJvbSAnLi4vY3JpdGVyaWFTZWFyY2gnXG5pbXBvcnQgVG9wQmFyIGZyb20gJy4vdG9wQmFyJ1xuXG5jbGFzcyBTZWFyY2hSZXN1bHRzVmlldyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG5cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgICB0aGlzLmdldExhYnMoKVxuICAgIH1cblxuICAgIGdldExhYnMoKSB7XG4gICAgICAgIGxldCB7XG4gICAgICAgICAgICBzZWxlY3RlZExvY2F0aW9uLFxuICAgICAgICAgICAgc2VsZWN0ZWRDcml0ZXJpYXMsXG4gICAgICAgICAgICBmaWx0ZXJDcml0ZXJpYSxcbiAgICAgICAgICAgIExPQURFRF9TRUFSQ0hfQ1JJVEVSSUFfTEFCXG4gICAgICAgIH0gPSB0aGlzLnByb3BzXG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGxldCBzZWFyY2hTdGF0ZSA9IHRoaXMuZ2V0TG9jYXRpb25QYXJhbSgnc2VhcmNoJylcbiAgICAgICAgICAgIGxldCBmaWx0ZXJDcml0ZXJpYSA9IHRoaXMuZ2V0TG9jYXRpb25QYXJhbSgnZmlsdGVyJylcbiAgICAgICAgICAgIGlmIChmaWx0ZXJDcml0ZXJpYSkge1xuICAgICAgICAgICAgICAgIGZpbHRlckNyaXRlcmlhID0gSlNPTi5wYXJzZShmaWx0ZXJDcml0ZXJpYSlcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZmlsdGVyQ3JpdGVyaWEgPSB7fVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2VhcmNoU3RhdGUgPSBKU09OLnBhcnNlKHNlYXJjaFN0YXRlKVxuICAgICAgICAgICAgdGhpcy5nZXRMYWJMaXN0KHNlYXJjaFN0YXRlLCBmaWx0ZXJDcml0ZXJpYSwgdHJ1ZSlcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihlKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0TG9jYXRpb25QYXJhbSh0YWcpIHtcbiAgICAgICAgLy8gdGhpcyBBUEkgYXNzdW1lcyB0aGUgY29udGV4dCBvZiByZWFjdC1yb3V0ZXItNFxuICAgICAgICBjb25zdCBwYXJhbVN0cmluZyA9IHRoaXMucHJvcHMubG9jYXRpb24uc2VhcmNoXG4gICAgICAgIGNvbnN0IHBhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXMocGFyYW1TdHJpbmcpXG4gICAgICAgIHJldHVybiBwYXJhbXMuZ2V0KHRhZylcbiAgICB9XG5cbiAgICBnZXRMYWJMaXN0KHNlYXJjaFN0YXRlLCBmaWx0ZXJDcml0ZXJpYSwgbWVyZ2VTdGF0ZSkge1xuICAgICAgICB0aGlzLnByb3BzLmdldExhYnMoc2VhcmNoU3RhdGUsIGZpbHRlckNyaXRlcmlhLCBtZXJnZVN0YXRlKTtcbiAgICB9XG5cbiAgICBhcHBseUZpbHRlcnMoZmlsdGVyU3RhdGUpIHtcbiAgICAgICAgbGV0IHNlYXJjaFN0YXRlID0ge1xuICAgICAgICAgICAgc2VsZWN0ZWRDcml0ZXJpYXM6IHRoaXMucHJvcHMuc2VsZWN0ZWRDcml0ZXJpYXMsXG4gICAgICAgICAgICBzZWxlY3RlZExvY2F0aW9uOiB0aGlzLnByb3BzLnNlbGVjdGVkTG9jYXRpb24sXG4gICAgICAgIH1cbiAgICAgICAgbGV0IHNlYXJjaERhdGEgPSBlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc2VhcmNoU3RhdGUpKVxuICAgICAgICBsZXQgZmlsdGVyRGF0YSA9IGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShmaWx0ZXJTdGF0ZSkpXG4gICAgICAgIHRoaXMucHJvcHMuaGlzdG9yeS5yZXBsYWNlKGAvZHgvc2VhcmNocmVzdWx0cz9zZWFyY2g9JHtzZWFyY2hEYXRhfSZmaWx0ZXI9JHtmaWx0ZXJEYXRhfWApXG5cbiAgICAgICAgdGhpcy5nZXRMYWJMaXN0KHNlYXJjaFN0YXRlLCBmaWx0ZXJTdGF0ZSwgdHJ1ZSlcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic2VhcmNoUmVzdWx0c1wiPlxuICAgICAgICAgICAgICAgIDxDcml0ZXJpYVNlYXJjaCB7Li4udGhpcy5wcm9wc30gY2hlY2tGb3JMb2FkPXt0aGlzLnByb3BzLkxPQURFRF9MQUJTX1NFQVJDSH0+XG4gICAgICAgICAgICAgICAgICAgIDxUb3BCYXIgey4uLnRoaXMucHJvcHN9IGFwcGx5RmlsdGVycz17dGhpcy5hcHBseUZpbHRlcnMuYmluZCh0aGlzKX0gLz5cbiAgICAgICAgICAgICAgICAgICAgPExhYnNMaXN0IHsuLi50aGlzLnByb3BzfSAvPlxuICAgICAgICAgICAgICAgIDwvQ3JpdGVyaWFTZWFyY2g+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFNlYXJjaFJlc3VsdHNWaWV3XG4iLCJpbXBvcnQgU2VhcmNoUmVzdWx0c1ZpZXcgZnJvbSAnLi9TZWFyY2hSZXN1bHRzVmlldy5qcydcblxuZXhwb3J0IGRlZmF1bHQgU2VhcmNoUmVzdWx0c1ZpZXciLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgTGFiUHJvZmlsZUNhcmQgZnJvbSAnLi4vLi4vY29tbW9ucy9sYWJQcm9maWxlQ2FyZC9pbmRleC5qcydcblxuY2xhc3MgTGFic0xpc3QgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgIH1cblxuICAgIHN0YXRpYyBjb250ZXh0VHlwZXMgPSB7XG4gICAgICAgIHJvdXRlcjogKCkgPT4gbnVsbFxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICBsZXQgeyBMQUJTLCBsYWJMaXN0IH0gPSB0aGlzLnByb3BzXG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxzZWN0aW9uIGNsYXNzTmFtZT1cIndyYXAgc2VhcmNoLWJvb2stcmVzdWx0XCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250YWluZXItZmx1aWRcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLTEyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJMaXN0Lm1hcCgobGFiSWQsIGkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiA8TGFiUHJvZmlsZUNhcmQgey4uLnRoaXMucHJvcHN9IGRldGFpbHM9e0xBQlNbbGFiSWRdfSBrZXk9e2l9IC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9zZWN0aW9uPlxuICAgICAgICApO1xuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBMYWJzTGlzdFxuIiwiaW1wb3J0IExhYnNMaXN0IGZyb20gJy4vTGFic0xpc3QuanMnXG5cbmV4cG9ydCBkZWZhdWx0IExhYnNMaXN0IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cbmltcG9ydCBNZW51LCB7IE1lbnVJdGVtIH0gZnJvbSAnbWF0ZXJpYWwtdWkvTWVudSc7XG5pbXBvcnQgUmFuZ2UgZnJvbSAncmMtc2xpZGVyL2xpYi9SYW5nZSc7XG5cbmNsYXNzIFRvcEJhciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgICBhbmNob3JFbDogbnVsbCxcbiAgICAgICAgICAgIG9wZW5GaWx0ZXI6IGZhbHNlLFxuICAgICAgICAgICAgcHJpY2VSYW5nZTogWzEwMCwgMTUwMF0sXG4gICAgICAgICAgICBkaXN0YW5jZVJhbmdlOiBbMSwgMzVdLFxuICAgICAgICAgICAgc29ydEJ5OiBudWxsXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKHByb3BzKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyAuLi5wcm9wcy5maWx0ZXJDcml0ZXJpYSB9KVxuICAgIH1cblxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHsgLi4udGhpcy5wcm9wcy5maWx0ZXJDcml0ZXJpYSB9KVxuICAgIH1cblxuICAgIGFwcGx5RmlsdGVycygpIHtcbiAgICAgICAgbGV0IGZpbHRlclN0YXRlID0ge1xuICAgICAgICAgICAgcHJpY2VSYW5nZTogdGhpcy5zdGF0ZS5wcmljZVJhbmdlLFxuICAgICAgICAgICAgZGlzdGFuY2VSYW5nZTogdGhpcy5zdGF0ZS5kaXN0YW5jZVJhbmdlLFxuICAgICAgICAgICAgc29ydEJ5OiB0aGlzLnN0YXRlLnNvcnRCeVxuICAgICAgICB9XG4gICAgICAgIHRoaXMucHJvcHMuYXBwbHlGaWx0ZXJzKGZpbHRlclN0YXRlKVxuICAgICAgICB0aGlzLnNldFN0YXRlKHsgb3BlbkZpbHRlcjogZmFsc2UgfSlcbiAgICB9XG5cbiAgICBoYW5kbGVPcGVuKGV2ZW50KSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBhbmNob3JFbDogZXZlbnQuY3VycmVudFRhcmdldCB9KVxuICAgIH1cblxuICAgIGhhbmRsZUNsb3NlKHR5cGUpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGFuY2hvckVsOiBudWxsLCBzb3J0Qnk6IHR5cGUgfSwgKCkgPT4ge1xuICAgICAgICAgICAgaWYodHlwZSl7XG4gICAgICAgICAgICAgICAgdGhpcy5hcHBseUZpbHRlcnMoKVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIHRvZ2dsZUZpbHRlcigpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBvcGVuRmlsdGVyOiAhdGhpcy5zdGF0ZS5vcGVuRmlsdGVyXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgaGFuZGxlUmFuZ2UodHlwZSwgcmFuZ2UpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBbdHlwZV06IHJhbmdlXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgZ2V0Q3JpdGVyaWFTdHJpbmcoc2VsZWN0ZWRDcml0ZXJpYXMpIHtcbiAgICAgICAgaWYgKHNlbGVjdGVkQ3JpdGVyaWFzICYmIHNlbGVjdGVkQ3JpdGVyaWFzLmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuIHNlbGVjdGVkQ3JpdGVyaWFzLnJlZHVjZSgoZmluYWwsIGN1cnIsIGkpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoaSAhPSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGZpbmFsICs9ICcsICdcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZmluYWwgKz0gYCR7Y3Vyci5uYW1lfWBcbiAgICAgICAgICAgICAgICByZXR1cm4gZmluYWxcbiAgICAgICAgICAgIH0sIFwiXCIpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgbGV0IGNyaXRlcmlhU3RyID0gdGhpcy5nZXRDcml0ZXJpYVN0cmluZyh0aGlzLnByb3BzLnNlbGVjdGVkQ3JpdGVyaWFzKVxuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8c2VjdGlvbiBjbGFzc05hbWU9XCJmaWx0ZXItcm93XCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250YWluZXItZmx1aWRcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLTEyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmaWx0ZXItaXRlbVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFjdGlvbi1maWx0ZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx1bCBjbGFzc05hbWU9XCJpbmxpbmUtbGlzdFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaSBvbkNsaWNrPXt0aGlzLmhhbmRsZU9wZW4uYmluZCh0aGlzKX0+PHNwYW4gY2xhc3NOYW1lPVwiY3QtaW1nIGN0LWltZy1zbSBmaWx0ZXItaWNvbiB0ZXh0LXJpZ2h0XCI+PGltZyBzcmM9XCIvYXNzZXRzL2ltZy9jdXN0b21lci1pY29ucy9yYW5nZS5zdmdcIiBjbGFzc05hbWU9XCJpbWctZmx1aWRcIiAvPjwvc3Bhbj48L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaSBvbkNsaWNrPXt0aGlzLnRvZ2dsZUZpbHRlci5iaW5kKHRoaXMpfT48c3BhbiBjbGFzc05hbWU9XCJjdC1pbWcgY3QtaW1nLXNtIGZpbHRlci1pY29uIHRleHQtcmlnaHQgYXBwbGllZC1maWx0ZXJcIj48aW1nIHNyYz1cIi9hc3NldHMvaW1nL2N1c3RvbWVyLWljb25zL2ZpbHRlci5zdmdcIiBjbGFzc05hbWU9XCJpbWctZmx1aWRcIiAvPjwvc3Bhbj48c3BhbiBjbGFzc05hbWU9XCJhcHBsaWVkLWZpbHRlci1ub3RpXCIgLz48L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmlsdGVyLXRpdGxlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5sYWJMaXN0Lmxlbmd0aH0gUmVzdWx0cyBmb3VuZCBmb3IgPHNwYW4gY2xhc3NOYW1lPVwiZnctNzAwXCI+IHtjcml0ZXJpYVN0cn08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxNZW51XG4gICAgICAgICAgICAgICAgICAgIGlkPVwic29ydC1tZW51XCJcbiAgICAgICAgICAgICAgICAgICAgYW5jaG9yRWw9e3RoaXMuc3RhdGUuYW5jaG9yRWx9XG4gICAgICAgICAgICAgICAgICAgIG9wZW49e0Jvb2xlYW4odGhpcy5zdGF0ZS5hbmNob3JFbCl9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2xvc2U9e3RoaXMuaGFuZGxlQ2xvc2UuYmluZCh0aGlzLCBudWxsKX1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIDxNZW51SXRlbSBvbkNsaWNrPXt0aGlzLmhhbmRsZUNsb3NlLmJpbmQodGhpcywgJ25hbWUnKX0+UmVsYXZhbmNlPC9NZW51SXRlbT5cbiAgICAgICAgICAgICAgICAgICAgPE1lbnVJdGVtIG9uQ2xpY2s9e3RoaXMuaGFuZGxlQ2xvc2UuYmluZCh0aGlzLCAncHJpY2UnKX0+RmVlPC9NZW51SXRlbT5cbiAgICAgICAgICAgICAgICAgICAgPE1lbnVJdGVtIG9uQ2xpY2s9e3RoaXMuaGFuZGxlQ2xvc2UuYmluZCh0aGlzLCAnZGlzdGFuY2UnKX0+RGlzdGFuY2U8L01lbnVJdGVtPlxuICAgICAgICAgICAgICAgIDwvTWVudT5cblxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZS5vcGVuRmlsdGVyID8gPGRpdiBvbkNsaWNrPXt0aGlzLnRvZ2dsZUZpbHRlci5iaW5kKHRoaXMpfSBjbGFzc05hbWU9XCJvdmVybGF5IGJsYWNrXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIndpZGdldCBmaWx0ZXItcG9wdXBcIiBvbkNsaWNrPXsoZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICAgICAgICAgICAgICAgICAgICAgIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwid2lkZ2V0LWNvbnRlbnRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmaWx0ZXJSb3dcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRsXCI+UHJpY2U8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0clwiPlJzIHt0aGlzLnN0YXRlLnByaWNlUmFuZ2VbMF19IHRvIHt0aGlzLnN0YXRlLnByaWNlUmFuZ2VbMV19PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiYmxcIj5ScyAxMDA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJiclwiPlJzIDIwMDA8L3NwYW4+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxSYW5nZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1pbj17MTAwfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1heD17MjAwMH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17dGhpcy5zdGF0ZS5wcmljZVJhbmdlfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0ZXA9ezEwMH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJyYW5nZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuaGFuZGxlUmFuZ2UuYmluZCh0aGlzLCAncHJpY2VSYW5nZScpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmlsdGVyUm93XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0bFwiPkRpc3RhbmNlPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidHJcIj57dGhpcy5zdGF0ZS5kaXN0YW5jZVJhbmdlWzBdfSB0byB7dGhpcy5zdGF0ZS5kaXN0YW5jZVJhbmdlWzFdfSBLTTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImJsXCI+MSA+IEtNPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiYnJcIj41MCBLTTwvc3Bhbj5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPFJhbmdlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWluPXsxfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1heD17NTB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3RoaXMuc3RhdGUuZGlzdGFuY2VSYW5nZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGVwPXsxfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInJhbmdlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5oYW5kbGVSYW5nZS5iaW5kKHRoaXMsICdkaXN0YW5jZVJhbmdlJyl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIndpZGdldC1mb290ZXIgcGQtMFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cInYtYnRuIHYtYnRuLXByaW1hcnkgYnRuLWJsb2NrIGJ0bi1sZ1wiIG9uQ2xpY2s9e3RoaXMuYXBwbHlGaWx0ZXJzLmJpbmQodGhpcyl9PkFwcGx5PC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+IDogXCJcIlxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgPC9zZWN0aW9uPlxuICAgICAgICApO1xuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBUb3BCYXJcbiIsImltcG9ydCBUb3BCYXIgZnJvbSAnLi9Ub3BCYXIuanMnXG5cbmV4cG9ydCBkZWZhdWx0IFRvcEJhciIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgTG9hZGVyIGZyb20gJy4uLy4uL2NvbW1vbnMvTG9hZGVyJ1xuXG5jbGFzcyBUZXN0U2VsZWN0b3JWaWV3IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIHNlbGVjdGVkTGFiOiBudWxsXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgbGV0IGxhYklkID0gdGhpcy5wcm9wcy5tYXRjaC5wYXJhbXMuaWRcblxuICAgICAgICBpZiAobGFiSWQpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBzZWxlY3RlZExhYjogbGFiSWQgfSlcbiAgICAgICAgICAgIHRoaXMucHJvcHMuZ2V0TGFiQnlJZChsYWJJZClcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHRvZ2dsZVRlc3QodGVzdCkge1xuICAgICAgICB0aGlzLnByb3BzLnRvZ2dsZURpYWdub3Npc0NyaXRlcmlhKCd0ZXN0JywgdGVzdClcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgbGV0IGxhYkRhdGEgPSB0aGlzLnByb3BzLkxBQlNbdGhpcy5zdGF0ZS5zZWxlY3RlZExhYl1cbiAgICAgICAgbGV0IHRlc3RzID0gW11cbiAgICAgICAgbGV0IHNlbGVjdGVkVGVzdHMgPSBbXVxuXG4gICAgICAgIGlmICh0aGlzLnByb3BzLnNlbGVjdGVkQ3JpdGVyaWFzICYmIHRoaXMucHJvcHMuc2VsZWN0ZWRDcml0ZXJpYXMubGVuZ3RoKSB7XG4gICAgICAgICAgICBzZWxlY3RlZFRlc3RzID0gdGhpcy5wcm9wcy5zZWxlY3RlZENyaXRlcmlhcy5maWx0ZXIoeCA9PiB4LnR5cGUgPT0gJ3Rlc3QnKS5tYXAoeCA9PiB4LmlkKVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGxhYkRhdGEgJiYgbGFiRGF0YS50ZXN0cyAmJiBsYWJEYXRhLnRlc3RzLmxlbmd0aCkge1xuICAgICAgICAgICAgdGVzdHMgPSBsYWJEYXRhLnRlc3RzLm1hcCgodGVzdCwgaSkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiA8bGkga2V5PXtpfT5cbiAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImNrLWJ4XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICB7dGVzdC50ZXN0Lm5hbWV9XG4gICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgY2hlY2tlZD17c2VsZWN0ZWRUZXN0cy5pbmRleE9mKHRlc3QudGVzdC5pZCkgPiAtMX0gb25DaGFuZ2U9e3RoaXMudG9nZ2xlVGVzdC5iaW5kKHRoaXMsIHRlc3QudGVzdCl9IC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJjaGVja21hcmtcIiAvPlxuICAgICAgICAgICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXN0LXByaWNlIHRleHQtbWQgZnctNTAwXCI+e3Rlc3QubXJwfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFwcG9pbnRtZW50U2xvdFwiPlxuXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBsYWJEYXRhID9cblxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aGVhZGVyIGNsYXNzTmFtZT1cInNraW4td2hpdGUgZml4ZWQgaG9yaXpvbnRhbCB0b3AgbG9jYXRpb24tZGV0ZWN0LWhlYWRlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lci1mbHVpZFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC0xMlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNlbGVjdC1sb2NhdGlvbi1yb3cgdGV4dC1jZW50ZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnByb3BzLmhpc3RvcnkuZ28oLTEpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fSBjbGFzc05hbWU9XCJjdC1pbWcgY3QtaW1nLW1kIGNsb3NlXCI+PGltZyBzcmM9XCIvYXNzZXRzL2ltZy9jdXN0b21lci1pY29ucy9jbG9zZS1ibGFjay5zdmdcIiBjbGFzc05hbWU9XCJpbWctZmx1aWRcIiAvPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoNCBjbGFzc05hbWU9XCJmdy03MDAgdGV4dC1tZFwiPkFsbCBUZXN0PC9oND5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtMTJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzZWFyY2gtcm93XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkb24tZ3JvdXAgbG9jYXRpb24tZGV0ZWN0LWZpZWxkXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sIGlucHV0LW1kIHNlYXJjaC1pbnB1dCBuby1zaGFkb3dcIiBwbGFjZWhvbGRlcj1cIlNlYXJjaCBUZXN0XCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJjdC1pbWcgY3QtaW1nLXNtIG1hcC1tYXJrZXItYmx1ZVwiPjxpbWcgc3JjPVwiL2Fzc2V0cy9pbWcvY3VzdG9tZXItaWNvbnMvc2VhcmNoLWljb24uc3ZnXCIgY2xhc3NOYW1lPVwiaW1nLWZsdWlkXCIgLz48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZGV0ZWN0LW15LWxvY2FpdG9uXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiY3QtaW1nIGN0LWltZy14c1wiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3NlbGVjdGVkVGVzdHMubGVuZ3RofSBTZWxlY3RlZCBJdGVtXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9oZWFkZXI+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c2VjdGlvbiBjbGFzc05hbWU9XCJ3cmFwIGFsbC10ZXN0LXNjcmVlbiBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3aWRnZXQtcGFuZWxcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGFuZWwtY29udGVudCBwZC0wXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHVsIGNsYXNzTmFtZT1cImxpc3QgYWxsLXRlc3QtbGlzdFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7dGVzdHN9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NlY3Rpb24+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cInYtYnRuIHYtYnRuLXByaW1hcnkgYnRuLWxnIGZpeGVkIGhvcml6b250YWwgYm90dG9tIG5vLXJvdW5kIHRleHQtbGdcIiBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuaGlzdG9yeS5nbygtMSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fT5Eb25lPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj4gOiA8TG9hZGVyIC8+XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFRlc3RTZWxlY3RvclZpZXdcbiIsImltcG9ydCBUZXN0U2VsZWN0b3IgZnJvbSAnLi9UZXN0U2VsZWN0b3InXG5leHBvcnQgZGVmYXVsdCBUZXN0U2VsZWN0b3IiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcblxuaW1wb3J0IERvY3RvclByb2ZpbGVDYXJkIGZyb20gJy4uL2NvbW1vbnMvZG9jdG9yUHJvZmlsZUNhcmQvaW5kZXguanMnXG5pbXBvcnQgVGltZVNsb3RTZWxlY3RvciBmcm9tICcuLi8uLi9jb21tb25zL3RpbWVTbG90U2VsZWN0b3IvaW5kZXguanMnXG5pbXBvcnQgU2VsZWN0ZWRDbGluaWMgZnJvbSAnLi4vY29tbW9ucy9zZWxlY3RlZENsaW5pYy9pbmRleC5qcydcblxuY2xhc3MgQXBwb2ludG1lbnRTbG90IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIHNlbGVjdGVkRG9jdG9yOiBudWxsLFxuICAgICAgICAgICAgc2VsZWN0ZWRDbGluaWM6IG51bGwsXG4gICAgICAgICAgICB0aW1lU2xvdHM6IG51bGwsXG4gICAgICAgICAgICBzZWxlY3RlZFNsb3QgOiBudWxsXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcm9jZWVkKCkge1xuICAgICAgICBpZih0aGlzLnN0YXRlLnNlbGVjdGVkU2xvdCl7XG4gICAgICAgICAgICB0aGlzLmNvbnRleHQucm91dGVyLmhpc3RvcnkucHVzaChgL2RvY3RvcnByb2ZpbGUvJHt0aGlzLnN0YXRlLnNlbGVjdGVkRG9jdG9yfS8ke3RoaXMuc3RhdGUuc2VsZWN0ZWRDbGluaWN9L2Jvb2tkZXRhaWxzP3Q9JHt0aGlzLnN0YXRlLnNlbGVjdGVkU2xvdC5zdGFydH1gKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2VsZWN0VGltZVNsb3Qoc2xvdCl7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBzZWxlY3RlZFNsb3Q6IHNsb3QgfSlcbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgbGV0IGRvY3RvcklkID0gdGhpcy5wcm9wcy5tYXRjaC5wYXJhbXMuaWRcbiAgICAgICAgbGV0IGNsaW5pY0lkID0gdGhpcy5wcm9wcy5tYXRjaC5wYXJhbXMuY2xpbmljSWRcbiAgICAgICAgaWYgKGRvY3RvcklkICYmIGNsaW5pY0lkKSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgc2VsZWN0ZWREb2N0b3I6IGRvY3RvcklkLCBzZWxlY3RlZENsaW5pYzogY2xpbmljSWQgfSlcbiAgICAgICAgICAgIHRoaXMucHJvcHMuZ2V0RG9jdG9yQnlJZChkb2N0b3JJZClcblxuICAgICAgICAgICAgdGhpcy5wcm9wcy5nZXRUaW1lU2xvdHMoZG9jdG9ySWQsIGNsaW5pY0lkLCAodGltZVNsb3RzKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHRpbWVTbG90cyB9KVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN0YXRpYyBjb250ZXh0VHlwZXMgPSB7XG4gICAgICAgIHJvdXRlcjogKCkgPT4gbnVsbFxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhcHBvaW50bWVudFNsb3RcIj5cblxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5ET0NUT1JTW3RoaXMuc3RhdGUuc2VsZWN0ZWREb2N0b3JdID9cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPERvY3RvclByb2ZpbGVDYXJkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhpZGVCb3R0b209e3RydWV9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhpZGVCb29rTm93PXt0cnVlfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXRhaWxzPXt0aGlzLnByb3BzLkRPQ1RPUlNbdGhpcy5zdGF0ZS5zZWxlY3RlZERvY3Rvcl19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8U2VsZWN0ZWRDbGluaWNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWREb2N0b3I9e3RoaXMucHJvcHMuRE9DVE9SU1t0aGlzLnN0YXRlLnNlbGVjdGVkRG9jdG9yXX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRDbGluaWM9e3RoaXMuc3RhdGUuc2VsZWN0ZWRDbGluaWN9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUudGltZVNsb3RzID9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxUaW1lU2xvdFNlbGVjdG9yXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGltZVNsb3RzPXt0aGlzLnN0YXRlLnRpbWVTbG90c31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RUaW1lU2xvdD0ge3RoaXMuc2VsZWN0VGltZVNsb3QuYmluZCh0aGlzKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8+IDogJydcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJwcm9jZWVkYnRuXCIgb25DbGljaz17dGhpcy5wcm9jZWVkLmJpbmQodGhpcyl9PlByb2NlZWQ8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PiA6IFwiXCJcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBBcHBvaW50bWVudFNsb3RcbiIsImltcG9ydCBBcHBvaW50bWVudFNsb3QgZnJvbSAnLi9BcHBvaW50bWVudFNsb3QuanMnXG5cbmV4cG9ydCBkZWZhdWx0IEFwcG9pbnRtZW50U2xvdCIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgU3RlcHBlciwgeyBTdGVwLCBTdGVwTGFiZWwgfSBmcm9tICdtYXRlcmlhbC11aS9TdGVwcGVyJztcblxuaW1wb3J0IENhbEljb24gZnJvbSAnbWF0ZXJpYWwtdWktaWNvbnMvQ2FsbCc7XG5cblxuY2xhc3MgQm9va2luZ1ZpZXcgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJib29raW5nXCI+XG4gICAgICAgICAgICAgICAgPFN0ZXBwZXIgYWN0aXZlU3RlcD17MH0gYWx0ZXJuYXRpdmVMYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgPFN0ZXAga2V5PXswfT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxTdGVwTGFiZWw+e1wiQXBwb2ludG1lbnQgUmVxdWVzdGVkXCJ9PC9TdGVwTGFiZWw+XG4gICAgICAgICAgICAgICAgICAgIDwvU3RlcD5cbiAgICAgICAgICAgICAgICAgICAgPFN0ZXAga2V5PXsxfT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxTdGVwTGFiZWw+e1wiQXBwb2ludG1lbnQgQ29uZmlybWVkXCJ9PC9TdGVwTGFiZWw+XG4gICAgICAgICAgICAgICAgICAgIDwvU3RlcD5cbiAgICAgICAgICAgICAgICAgICAgPFN0ZXAga2V5PXsyfT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxTdGVwTGFiZWw+e1wiQXBwb2ludG1lbnQgQ29tcGxldGVcIn08L1N0ZXBMYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgPC9TdGVwPlxuICAgICAgICAgICAgICAgIDwvU3RlcHBlcj5cbiAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJyZXF1ZXN0TGluZVwiPldlIGhhdmUgcmVxdWVzdGVkIERyLlNtaXRoIHRvIGNvbmZpcm0geW91ciBhcHBvaW50bWVudDwvcD5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBhdGllbnROYW1lXCI+XG4gICAgICAgICAgICAgICAgICAgIDxwPmZvcjwvcD5cbiAgICAgICAgICAgICAgICAgICAgPHA+QnJpamVzaCBLdW1hcjwvcD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZGV0YWlsc1wiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwibGJsXCI+V2l0aDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImNudG50XCI+RHIuIFN0ZXZlIFNtaXRoPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImxibFwiPldoZXJlPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiY250bnRcIj5TYXJ2b2RheWEgQ2xpbmljLCAjIDM2MSwgU2VjdG9yIDUwLCBHdXJnYW9uPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImxibFwiPldoZW48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJjbnRudFwiPldlZG5lc2RheSwgSnVuZSAyNywgMjAxOCwgMTE6NDVBTTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJsYmxcIj5SZWZlcmVuY2UjPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiY250bnRcIj5IVVZISkI4N0hKQkpIPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwicmVxdWVzdFwiPlJlcXVlc3QgUmUtU2NoZWR1bGUvQ2FuY2VsPC9idXR0b24+XG5cbiAgICAgICAgICAgICAgICA8Q2FsSWNvbiBjbGFzc05hbWU9XCJjYWxsSWNvblwiLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBCb29raW5nVmlld1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IERvY3RvclByb2ZpbGVDYXJkIGZyb20gJy4uL2NvbW1vbnMvZG9jdG9yUHJvZmlsZUNhcmQvaW5kZXguanMnXG5pbXBvcnQgQ2xpbmljU2VsZWN0b3IgZnJvbSAnLi4vY29tbW9ucy9jbGluaWNTZWxlY3Rvci9pbmRleC5qcydcblxuY2xhc3MgQ2xpbmljTGlzdFZpZXcgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgc2VsZWN0ZWREb2N0b3I6IG51bGxcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgICBsZXQgZG9jdG9ySWQgPSB0aGlzLnByb3BzLm1hdGNoLnBhcmFtcy5pZFxuICAgICAgICBpZiAoZG9jdG9ySWQpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBzZWxlY3RlZERvY3RvcjogZG9jdG9ySWQgfSlcbiAgICAgICAgICAgIHRoaXMucHJvcHMuZ2V0RG9jdG9yQnlJZChkb2N0b3JJZClcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJkb2N0b3JQcm9maWxlXCI+XG5cbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuRE9DVE9SU1t0aGlzLnN0YXRlLnNlbGVjdGVkRG9jdG9yXSA/XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxEb2N0b3JQcm9maWxlQ2FyZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoaWRlQm90dG9tPXt0cnVlfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoaWRlQm9va05vdz17dHJ1ZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGV0YWlscz17dGhpcy5wcm9wcy5ET0NUT1JTW3RoaXMuc3RhdGUuc2VsZWN0ZWREb2N0b3JdfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPENsaW5pY1NlbGVjdG9yXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRldGFpbHM9e3RoaXMucHJvcHMuRE9DVE9SU1t0aGlzLnN0YXRlLnNlbGVjdGVkRG9jdG9yXX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgey4uLnRoaXMucHJvcHN9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PiA6IFwiXCJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgQ2xpbmljTGlzdFZpZXdcbiIsImltcG9ydCBDbGluaWNMaXN0VmlldyBmcm9tICcuL0NsaW5pY0xpc3RWaWV3LmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBDbGluaWNMaXN0VmlldyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG5pbXBvcnQgQ2xvY2tJY29uIGZyb20gJ21hdGVyaWFsLXVpLWljb25zL0F2VGltZXInO1xuaW1wb3J0IFJpZ2h0QXJyb3dJY29uIGZyb20gJ21hdGVyaWFsLXVpLWljb25zL0tleWJvYXJkQXJyb3dSaWdodCc7XG5pbXBvcnQgTW9uZXlJY29uIGZyb20gJ21hdGVyaWFsLXVpLWljb25zL0F0dGFjaE1vbmV5JztcblxuXG5jbGFzcyBDbGluaWNTZWxlY3RvciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgfVxuXG4gICAgc2VsZWN0Q2xpbmljKGNsaW5pY0lkKSB7XG4gICAgICAgIGxldCBkb2N0b3JJZCA9IHRoaXMucHJvcHMubWF0Y2gucGFyYW1zLmlkXG4gICAgICAgIHRoaXMuY29udGV4dC5yb3V0ZXIuaGlzdG9yeS5wdXNoKGAvZG9jdG9ycHJvZmlsZS8ke2RvY3RvcklkfS8ke2NsaW5pY0lkfS9ib29rYClcbiAgICB9XG5cbiAgICBzdGF0aWMgY29udGV4dFR5cGVzID0ge1xuICAgICAgICByb3V0ZXI6ICgpID0+IG51bGxcbiAgICB9XG5cbiAgICBnZXRUaW1lKHVuaXhfdGltZXN0YW1wKSB7XG4gICAgICAgIHZhciBkYXRlID0gbmV3IERhdGUodW5peF90aW1lc3RhbXAgKiAxMDAwKTtcbiAgICAgICAgdmFyIGhvdXJzID0gZGF0ZS5nZXRIb3VycygpO1xuICAgICAgICB2YXIgbWludXRlcyA9IFwiMFwiICsgZGF0ZS5nZXRNaW51dGVzKCk7XG4gICAgICAgIHJldHVybiBob3VycyArICc6JyArIG1pbnV0ZXMuc3Vic3RyKC0yKVxuICAgIH1cblxuICAgIGdldEF2YWlsYWJpbGl0eShhdmFpbGFiaWxpdHkpIHtcbiAgICAgICAgaWYgKGF2YWlsYWJpbGl0eSkge1xuICAgICAgICAgICAgbGV0IHsgbmV4dEF2YWlsYWJsZSB9ID0gYXZhaWxhYmlsaXR5XG4gICAgICAgICAgICBpZiAobmV4dEF2YWlsYWJsZVswXSkge1xuICAgICAgICAgICAgICAgIGxldCBkYXRlID0gbmV3IERhdGUobmV4dEF2YWlsYWJsZVswXS5mcm9tKS50b0RhdGVTdHJpbmcoKVxuICAgICAgICAgICAgICAgIGxldCB0aW1lU3RhcnQgPSB0aGlzLmdldFRpbWUobmV4dEF2YWlsYWJsZVswXS5mcm9tKVxuICAgICAgICAgICAgICAgIGxldCB0aW1lRW5kID0gdGhpcy5nZXRUaW1lKG5leHRBdmFpbGFibGVbMF0udG8pXG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0ZSwgdGltZVN0YXJ0LCB0aW1lRW5kLCBmZWU6IG5leHRBdmFpbGFibGVbMF0uZmVlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHsgZGF0ZTogJycsIHRpbWVTdGFydDogJycsIHRpbWVFbmQ6ICcnLCBmZWU6IHsgYW1vdW50OiAnJyB9IH1cbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgbGV0IHsgYXZhaWxhYmlsaXR5IH0gPSB0aGlzLnByb3BzLmRldGFpbHNcblxuICAgICAgICBhdmFpbGFiaWxpdHkgPSBhdmFpbGFiaWxpdHkubWFwKChjbGluaWMpID0+IHtcbiAgICAgICAgICAgIGNsaW5pYy50aW1lQXZhaWxhYmxlID0gdGhpcy5nZXRBdmFpbGFiaWxpdHkoY2xpbmljKVxuICAgICAgICAgICAgcmV0dXJuIGNsaW5pY1xuICAgICAgICB9KVxuXG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2xpbmljU2VsZWN0b3JcIj5cbiAgICAgICAgICAgICAgICA8aDU+RHIuIFN0ZXZlIGlzIGF2YWlsYWJsZSBhdDwvaDU+XG5cbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGF2YWlsYWJpbGl0eS5tYXAoKGNsaW5pYywgaSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDxkaXYga2V5PXtpfSBjbGFzc05hbWU9XCJjbGluaWNcIiBvbkNsaWNrPXt0aGlzLnNlbGVjdENsaW5pYy5iaW5kKHRoaXMsY2xpbmljLmlkKX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJuYW1lXCI+e2NsaW5pYy5uYW1lICsgXCIsIFwiICsgY2xpbmljLmFkZHJlc3N9PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJkZXRhaWxzXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxDbG9ja0ljb24gY2xhc3NOYW1lPVwiY2xvY2tJY29uXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPE1vbmV5SWNvbiBjbGFzc05hbWU9XCJtb25leUljb25cIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGluaWMuZGF5cy5tYXAoKGRheSwgaSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gPHNwYW5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleT17aX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17ZGF5LmlzQXZhaWxhYmxlID8gXCJpc0F2YWlsYWJsZVwiIDogXCJcIn0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7ZGF5LmRheVswXX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7Y2xpbmljLnRpbWVBdmFpbGFibGUudGltZVN0YXJ0fSB0byB7Y2xpbmljLnRpbWVBdmFpbGFibGUudGltZUVuZH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cD57YEZlZTogUnMuJHtjbGluaWMudGltZUF2YWlsYWJsZS5mZWUuYW1vdW50fWB9PC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYm9va1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0XCI+Qm9vazwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPFJpZ2h0QXJyb3dJY29uIGNsYXNzTmFtZT1cImJvb2tJY29uXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgQ2xpbmljU2VsZWN0b3JcbiIsImltcG9ydCBDbGluaWNTZWxlY3RvciBmcm9tICcuL0NsaW5pY1NlbGVjdG9yLmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBDbGluaWNTZWxlY3RvciIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCBDaGlwIGZyb20gJ21hdGVyaWFsLXVpL0NoaXAnO1xuXG5cbmNsYXNzIENvbW1vbmx5U2VhcmNoZWQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgICAgICB0aGlzLnN0YXRlID0ge1xuXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgbGV0IHBpbGxzID0gdGhpcy5wcm9wcy5kYXRhLm1hcCgocGlsbCkgPT4ge1xuICAgICAgICAgICAgbGV0IHNlbGVjdGVkID0gISF0aGlzLnByb3BzLnNlbGVjdGVkW3BpbGwuaWRdXG4gICAgICAgICAgICByZXR1cm4gPENoaXBcbiAgICAgICAgICAgICAgICBsYWJlbD17cGlsbC5uYW1lfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17c2VsZWN0ZWQgPyBcInBpbGwgc2VsZWN0ZWRcIiA6IFwicGlsbFwifVxuICAgICAgICAgICAgICAgIGtleT17cGlsbC5pZH1cbiAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnByb3BzLnRvZ2dsZVBpbGwocGlsbC5pZClcbiAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgLz5cblxuICAgICAgICB9KVxuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbW1vbmx5U2VhcmNoZWRcIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJoZWFkaW5nXCI+e3RoaXMucHJvcHMuaGVhZGluZ308L3NwYW4+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwaWxsc1wiPlxuICAgICAgICAgICAgICAgICAgICB7cGlsbHN9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgQ29tbW9ubHlTZWFyY2hlZFxuIiwiaW1wb3J0IENvbW1vbmx5U2VhcmNoZWQgZnJvbSAnLi9Db21tb25seVNlYXJjaGVkLmpzJ1xuXG5cbmV4cG9ydCBkZWZhdWx0IENvbW1vbmx5U2VhcmNoZWQiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgQ2hpcCBmcm9tICdtYXRlcmlhbC11aS9DaGlwJztcblxuY2xhc3MgQ3JpdGVyaWFTZWxlY3RvciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgfVxuXG4gICAgaGFuZGxlRGVsZXRlKGlkLCBoYW5kbGVyKSB7XG4gICAgICAgIGlmKGhhbmRsZXIgPT0gJ3RvZ2dsZUNyaXRlcmlhJyl7XG4gICAgICAgICAgICB0aGlzLnByb3BzW2hhbmRsZXJdKHtpZH0pXG4gICAgICAgIH0gZWxzZXtcbiAgICAgICAgICAgIHRoaXMucHJvcHNbaGFuZGxlcl0oaWQpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdGF0aWMgY29udGV4dFR5cGVzID0ge1xuICAgICAgICByb3V0ZXI6ICgpID0+IG51bGxcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgbGV0IHBpbGxzID0gW11cbiAgICAgICAgbGV0IGNvbmRpdGlvbnMgPSBbXVxuICAgICAgICBsZXQgc3BlY2lhbGl0aWVzID0gW11cbiAgICAgICAgbGV0IGNyaXRlcmlhcyA9IFtdXG5cbiAgICAgICAgaWYgKHRoaXMucHJvcHMuY29tbW9ubHlTZWFyY2hlZENvbmRpdGlvbnMpIHtcbiAgICAgICAgICAgIGNvbmRpdGlvbnMgPSB0aGlzLnByb3BzLmNvbW1vbmx5U2VhcmNoZWRDb25kaXRpb25zLmZpbHRlcigocGlsbCkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnByb3BzLnNlbGVjdGVkQ29uZGl0aW9uc1twaWxsLmlkXVxuICAgICAgICAgICAgfSkubWFwKChwaWxsKSA9PiB7XG4gICAgICAgICAgICAgICAgcGlsbC50cyA9IHRoaXMucHJvcHMuc2VsZWN0ZWRDb25kaXRpb25zW3BpbGwuaWRdXG4gICAgICAgICAgICAgICAgcGlsbC50eXBlID0gJ3RvZ2dsZUNvbmRpdGlvbidcbiAgICAgICAgICAgICAgICByZXR1cm4gcGlsbFxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5wcm9wcy5jb21tb25seVNlYXJjaGVkU3BlY2lhbGl0aWVzKSB7XG4gICAgICAgICAgICBzcGVjaWFsaXRpZXMgPSB0aGlzLnByb3BzLmNvbW1vbmx5U2VhcmNoZWRTcGVjaWFsaXRpZXMuZmlsdGVyKChwaWxsKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMuc2VsZWN0ZWRTcGVjaWFsaXRpZXNbcGlsbC5pZF1cbiAgICAgICAgICAgIH0pLm1hcCgocGlsbCkgPT4ge1xuICAgICAgICAgICAgICAgIHBpbGwudHMgPSB0aGlzLnByb3BzLnNlbGVjdGVkU3BlY2lhbGl0aWVzW3BpbGwuaWRdXG4gICAgICAgICAgICAgICAgcGlsbC50eXBlID0gJ3RvZ2dsZVNwZWNpYWxpdHknXG4gICAgICAgICAgICAgICAgcmV0dXJuIHBpbGxcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgICAgaWYodGhpcy5wcm9wcy5zZWxlY3RlZENyaXRlcmlhKXtcbiAgICAgICAgICAgIGNyaXRlcmlhcyA9IE9iamVjdC5rZXlzKHRoaXMucHJvcHMuc2VsZWN0ZWRDcml0ZXJpYSkubWFwKChjcml0ZXJpYSkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBwaWxsID0gdGhpcy5wcm9wcy5zZWxlY3RlZENyaXRlcmlhW2NyaXRlcmlhXVxuICAgICAgICAgICAgICAgIHBpbGwudHlwZSA9ICd0b2dnbGVDcml0ZXJpYSdcbiAgICAgICAgICAgICAgICByZXR1cm4gcGlsbFxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuXG4gICAgICAgIHBpbGxzID0gWy4uLmNvbmRpdGlvbnMsIC4uLnNwZWNpYWxpdGllcywgLi4uY3JpdGVyaWFzXVxuICAgICAgICBwaWxscyA9IHBpbGxzLnNvcnQoKGEsYikgPT4ge1xuICAgICAgICAgICAgbGV0IGRhdGVBID0gbmV3IERhdGUoYS50cykuZ2V0VGltZSgpXG4gICAgICAgICAgICBsZXQgZGF0ZUIgPSBuZXcgRGF0ZShiLnRzKS5nZXRUaW1lKClcbiAgICAgICAgICAgIHJldHVybiBkYXRlQSA+IGRhdGVCID8gMSA6IC0xXG4gICAgICAgIH0pLm1hcCgocGlsbCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIDxDaGlwXG4gICAgICAgICAgICAgICAgbGFiZWw9e3BpbGwubmFtZX1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e1wicGlsbHNlbGVjdGVkXCJ9XG4gICAgICAgICAgICAgICAga2V5PXtwaWxsLnR5cGUgKyBwaWxsLmlkfVxuICAgICAgICAgICAgICAgIG9uRGVsZXRlPXt0aGlzLmhhbmRsZURlbGV0ZS5iaW5kKHRoaXMsIHBpbGwuaWQsIHBpbGwudHlwZSl9XG4gICAgICAgICAgICAvPlxuICAgICAgICB9KVxuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNyaXRlcmlhU2VsZWN0b3JcIj5cbiAgICAgICAgICAgICAgICA8aW5wdXQgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRleHQucm91dGVyLmhpc3RvcnkucHVzaCgnL2NyaXRlcmlhc2VhcmNoJylcbiAgICAgICAgICAgICAgICB9fSBwbGFjZWhvbGRlcj17XCJTZWFyY2ggZm9yIHN5bXB0b21zLCBEb2N0b3JzLCBjb25kaXRpb25zIC4uZXRjXCJ9IC8+XG5cbiAgICAgICAgICAgICAgICB7cGlsbHN9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgQ3JpdGVyaWFTZWxlY3RvclxuIiwiaW1wb3J0IENyaXRlcmlhU2VsZWN0b3IgZnJvbSAnLi9Dcml0ZXJpYVNlbGVjdG9yLmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBDcml0ZXJpYVNlbGVjdG9yIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cbmltcG9ydCBFbW90aUljb24gZnJvbSAnbWF0ZXJpYWwtdWktaWNvbnMvQWNjb3VudENpcmNsZSc7XG5pbXBvcnQgSG9tZUljb24gZnJvbSAnbWF0ZXJpYWwtdWktaWNvbnMvSG9tZSc7XG5pbXBvcnQgQ2xvY2tJY29uIGZyb20gJ21hdGVyaWFsLXVpLWljb25zL0F2VGltZXInO1xuaW1wb3J0IExvY2F0aW9uc0ljb24gZnJvbSAnbWF0ZXJpYWwtdWktaWNvbnMvTG9jYXRpb25Pbic7XG5cblxuY2xhc3MgRG9jdG9yUHJvZmlsZUNhcmQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgIH1cblxuICAgIGNhcmRDbGljayhpZCwgZSkge1xuICAgICAgICB0aGlzLmNvbnRleHQucm91dGVyLmhpc3RvcnkucHVzaChgL2RvY3RvcnByb2ZpbGUvJHtpZH1gKVxuICAgIH1cblxuICAgIGJvb2tOb3coaWQsIGUpIHtcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKVxuICAgICAgICB0aGlzLmNvbnRleHQucm91dGVyLmhpc3RvcnkucHVzaChgL2RvY3RvcnByb2ZpbGUvJHtpZH0vYXZhaWxhYmlsaXR5YClcbiAgICB9XG5cbiAgICBzdGF0aWMgY29udGV4dFR5cGVzID0ge1xuICAgICAgICByb3V0ZXI6ICgpID0+IG51bGxcbiAgICB9XG5cbiAgICBnZXRRdWFsaWZpY2F0aW9uU3RyKHF1YWxpZmljYXRpb25TcGVjaWFsaXphdGlvbikge1xuICAgICAgICByZXR1cm4gcXVhbGlmaWNhdGlvblNwZWNpYWxpemF0aW9uLnJlZHVjZSgoc3RyLCBjdXJyLCBpKSA9PiB7XG4gICAgICAgICAgICBzdHIgKz0gYCR7Y3Vyci5xdWFsaWZpY2F0aW9ufWBcbiAgICAgICAgICAgIGlmIChjdXJyLnNwZWNpYWxpemF0aW9uKSB7XG4gICAgICAgICAgICAgICAgc3RyICs9IGAgLSAke2N1cnIuc3BlY2lhbGl6YXRpb259YFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGkgPCBxdWFsaWZpY2F0aW9uU3BlY2lhbGl6YXRpb24ubGVuZ3RoIC0gMSkgc3RyICs9IGAsIGA7XG4gICAgICAgICAgICByZXR1cm4gc3RyXG4gICAgICAgIH0sIFwiXCIpXG4gICAgfVxuXG4gICAgZ2V0VGltZSh1bml4X3RpbWVzdGFtcCkge1xuICAgICAgICB2YXIgZGF0ZSA9IG5ldyBEYXRlKHVuaXhfdGltZXN0YW1wICogMTAwMCk7XG4gICAgICAgIHZhciBob3VycyA9IGRhdGUuZ2V0SG91cnMoKTtcbiAgICAgICAgdmFyIG1pbnV0ZXMgPSBcIjBcIiArIGRhdGUuZ2V0TWludXRlcygpO1xuICAgICAgICByZXR1cm4gaG91cnMgKyAnOicgKyBtaW51dGVzLnN1YnN0cigtMilcbiAgICB9XG5cbiAgICBnZXRBdmFpbGFiaWxpdHkoYXZhaWxhYmlsaXR5KSB7XG4gICAgICAgIGlmIChhdmFpbGFiaWxpdHkpIHtcbiAgICAgICAgICAgIGxldCB7IG5leHRBdmFpbGFibGUgfSA9IGF2YWlsYWJpbGl0eVxuICAgICAgICAgICAgaWYgKG5leHRBdmFpbGFibGVbMF0pIHtcbiAgICAgICAgICAgICAgICBsZXQgZGF0ZSA9IG5ldyBEYXRlKG5leHRBdmFpbGFibGVbMF0uZnJvbSkudG9EYXRlU3RyaW5nKClcbiAgICAgICAgICAgICAgICBsZXQgdGltZVN0YXJ0ID0gdGhpcy5nZXRUaW1lKG5leHRBdmFpbGFibGVbMF0uZnJvbSlcbiAgICAgICAgICAgICAgICBsZXQgdGltZUVuZCA9IHRoaXMuZ2V0VGltZShuZXh0QXZhaWxhYmxlWzBdLnRvKVxuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGUsIHRpbWVTdGFydCwgdGltZUVuZCwgZmVlOiBuZXh0QXZhaWxhYmxlWzBdLmZlZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7IGRhdGU6ICcnLCB0aW1lU3RhcnQ6ICcnLCB0aW1lRW5kOiAnJywgZmVlOiB7IGFtb3VudDogJycgfSB9XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIGxldCB7IGlkLCBuYW1lLCBwcm9maWxlX2ltZywgcHJhY3RpY2VfZHVyYXRpb24sIHF1YWxpZmljYXRpb25TcGVjaWFsaXphdGlvbiwgY29uc3VsdGF0aW9uQ291bnQsIGF2YWlsYWJpbGl0eSwgcGFzdEV4cGVyaWVuY2UgfSA9IHRoaXMucHJvcHMuZGV0YWlsc1xuXG4gICAgICAgIGxldCBxdWFsaWZpY2F0aW9uU3RyaW5nID0gdGhpcy5nZXRRdWFsaWZpY2F0aW9uU3RyKHF1YWxpZmljYXRpb25TcGVjaWFsaXphdGlvbilcbiAgICAgICAgbGV0IHRpbWVBdmFpbGFibGUgPSB0aGlzLmdldEF2YWlsYWJpbGl0eShhdmFpbGFiaWxpdHlbMF0pXG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZG9jdG9yQ2FyZFwiIG9uQ2xpY2s9e3RoaXMuY2FyZENsaWNrLmJpbmQodGhpcywgaWQpfT5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImRldGFpbHNEaXZcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdWJPcHRpb25zSW1hZ2VcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbWcgc3JjPXtwcm9maWxlX2ltZ30gY2xhc3NOYW1lPVwiZG9jdG9ySW1hZ2VcIiAvPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdWJPcHRpb25zQ29udGVudFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwibmFtZVwiPntuYW1lfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInF1YWxpZmljYXRpb25cIj57cXVhbGlmaWNhdGlvblN0cmluZ308L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJkZXNpZ25hdGlvblwiPntwYXN0RXhwZXJpZW5jZX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJleHBlcmllbmNlXCI+e3ByYWN0aWNlX2R1cmF0aW9ufSB5ZWFycyBvZiBleHBlcmllbmNlPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgISF0aGlzLnByb3BzLmhpZGVCb29rTm93ID8gJycgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3ViT3B0aW9uc0ludGVyYWN0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYm9va05vd1wiIG9uQ2xpY2s9e3RoaXMuYm9va05vdy5iaW5kKHRoaXMsIGlkKX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBCb29rIE5vd1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInByaWNlXCI+RmVlOiBScy4ge3RpbWVBdmFpbGFibGUuZmVlLmFtb3VudH08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICEhdGhpcy5wcm9wcy5oaWRlQm90dG9tID8gJycgOlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJib3R0b21PcHRpb25zXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdWJPcHRpb25zXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxIb21lSWNvbiBjbGFzc05hbWU9XCJjbGluaWNJY29uXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiY2xpbmljTmFtZVwiPnthdmFpbGFiaWxpdHlbMF0ubmFtZX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdWJPcHRpb25zXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxDbG9ja0ljb24gY2xhc3NOYW1lPVwiY2xpbmljSWNvblwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRpbWVFbnRyeVwiPnt0aW1lQXZhaWxhYmxlLmRhdGV9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0aW1lRW50cnlcIj57dGltZUF2YWlsYWJsZS50aW1lU3RhcnR9IHRvIHt0aW1lQXZhaWxhYmxlLnRpbWVFbmR9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3ViT3B0aW9uc1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8TG9jYXRpb25zSWNvbiBjbGFzc05hbWU9XCJjbGluaWNJY29uXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiY2xpbmljTmFtZVwiPnthdmFpbGFiaWxpdHlbMF0uYWRkcmVzc308L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgRG9jdG9yUHJvZmlsZUNhcmRcbiIsImltcG9ydCBEb2N0b3JQcm9maWxlQ2FyZCBmcm9tICcuL0RvY3RvclByb2ZpbGVDYXJkLmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBEb2N0b3JQcm9maWxlQ2FyZCIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmNsYXNzIFNlbGVjdGVkQ2xpbmljIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcblxuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhdGljIGNvbnRleHRUeXBlcyA9IHtcbiAgICAgICAgcm91dGVyOiAoKSA9PiBudWxsXG4gICAgfVxuXHRcbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgbGV0IHsgc2VsZWN0ZWREb2N0b3IsIHNlbGVjdGVkQ2xpbmljIH0gPSB0aGlzLnByb3BzXG5cbiAgICAgICAgbGV0IGNsaW5pY0RhdGEgPSBzZWxlY3RlZERvY3Rvci5hdmFpbGFiaWxpdHkuZmlsdGVyKChjbGluaWMpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBjbGluaWMuaWQgPT0gc2VsZWN0ZWRDbGluaWNcbiAgICAgICAgfSlbMF1cblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzZWxlY3RlZENsaW5pY1wiPlxuICAgICAgICAgICAgICAgIDxoNT5TZWxlY3RlZCBDbGluaWM8L2g1PlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImNsaW5pY05hbWVcIj57IGNsaW5pY0RhdGEubmFtZSArIFwiLCBcIiArIGNsaW5pY0RhdGEuYWRkcmVzcyB9PC9zcGFuPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZlZVwiPkZlZTogUnMue2NsaW5pY0RhdGEubmV4dEF2YWlsYWJsZVswXS5mZWUuYW1vdW50fTwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBTZWxlY3RlZENsaW5pY1xuIiwiaW1wb3J0IFNlbGVjdGVkQ2xpbmljIGZyb20gJy4vU2VsZWN0ZWRDbGluaWMuanMnXG5cbmV4cG9ydCBkZWZhdWx0IFNlbGVjdGVkQ2xpbmljIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuY29uc3QgZGVib3VuY2VyID0gKGZuLCBkZWxheSkgPT4ge1xuICAgIGxldCB0aW1lciA9IG51bGxcbiAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICBjbGVhclRpbWVvdXQodGltZXIpXG4gICAgICAgIHRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBmbi5jYWxsKHRoaXMpXG4gICAgICAgIH0sIGRlbGF5KVxuICAgIH1cbn1cblxuXG5jbGFzcyBDcml0ZXJpYVNlYXJjaFZpZXcgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgc2VhcmNoVmFsdWU6ICcnLFxuICAgICAgICAgICAgc2VhcmNoUmVzdWx0czogW11cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgICB0aGlzLmdldFNlYXJjaFJlc3VsdHMgPSBkZWJvdW5jZXIodGhpcy5nZXRTZWFyY2hSZXN1bHRzLmJpbmQodGhpcyksIDEwMDApXG4gICAgICAgIGxldCBpbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0b3BDcml0ZXJpYVNlYXJjaCcpXG4gICAgICAgIGlucHV0LmZvY3VzKClcbiAgICB9XG5cbiAgICBpbnB1dEhhbmRsZXIoZSkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHsgc2VhcmNoVmFsdWU6IGUudGFyZ2V0LnZhbHVlIH0pXG4gICAgICAgIHRoaXMuZ2V0U2VhcmNoUmVzdWx0cygpXG4gICAgfVxuXG4gICAgZ2V0U2VhcmNoUmVzdWx0cygpIHtcbiAgICAgICAgdGhpcy5wcm9wcy5nZXRDcml0ZXJpYVJlc3VsdHModGhpcy5zdGF0ZS5zZWFyY2hWYWx1ZSwgKHNlYXJjaFJlc3VsdHMpID0+IHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBzZWFyY2hSZXN1bHRzOiBzZWFyY2hSZXN1bHRzLnJlc3VsdCB9KVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIGFkZENyaXRlcmlhKGNyaXRlcmlhLCB0eXBlKSB7XG4gICAgICAgIGNyaXRlcmlhLnR5cGUgPSB0eXBlXG4gICAgICAgIHRoaXMucHJvcHMudG9nZ2xlQ3JpdGVyaWEoY3JpdGVyaWEpXG4gICAgICAgIHRoaXMuY29udGV4dC5yb3V0ZXIuaGlzdG9yeS5nb0JhY2soKVxuICAgIH1cblxuICAgIHN0YXRpYyBjb250ZXh0VHlwZXMgPSB7XG4gICAgICAgIHJvdXRlcjogKCkgPT4gbnVsbFxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsb2NhdGlvblNlYXJjaFwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibG9jYXRpb25TZWFyY2hCb3hcIj5cbiAgICAgICAgICAgICAgICAgICAgPGlucHV0IGNsYXNzTmFtZT1cInRvcFNlYXJjaFwiIGlkPVwidG9wQ3JpdGVyaWFTZWFyY2hcIiBvbkNoYW5nZT17dGhpcy5pbnB1dEhhbmRsZXIuYmluZCh0aGlzKX0gdmFsdWU9e3RoaXMuc3RhdGUuc2VhcmNoVmFsdWV9IHBsYWNlaG9sZGVyPVwiU2VhcmNoIGZvciBzeW1wdG9tcywgRG9jdG9zLCBjb25kaXRpb25zIC4uZXRjXCIvPlxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlLnNlYXJjaFJlc3VsdHMubWFwKCh0eXBlLGkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9XCJzZWFyY2hSZXN1bHRUeXBlXCIga2V5PXtpfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHA+e3R5cGUubmFtZX08L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGUuZGF0YS5tYXAoKHJlc3VsdERhdGEsaikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiA8c3BhbiBrZXk9e2p9IGNsYXNzTmFtZT1cInBhYy1pdGVtXCIgb25DbGljaz17dGhpcy5hZGRDcml0ZXJpYS5iaW5kKHRoaXMsIHJlc3VsdERhdGEsIHR5cGUudHlwZSl9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7cmVzdWx0RGF0YS5uYW1lfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IENyaXRlcmlhU2VhcmNoVmlld1xuIiwiaW1wb3J0IENyaXRlcmlhU2VhcmNoVmlldyBmcm9tICcuL0NyaXRlcmlhU2VhcmNoVmlldy5qcydcblxuZXhwb3J0IGRlZmF1bHQgQ3JpdGVyaWFTZWFyY2hWaWV3IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IERvY3RvclByb2ZpbGVDYXJkIGZyb20gJy4uL2NvbW1vbnMvZG9jdG9yUHJvZmlsZUNhcmQvaW5kZXguanMnXG5pbXBvcnQgQWJvdXREb2N0b3IgZnJvbSAnLi4vZG9jdG9yUHJvZmlsZS9hYm91dERvY3Rvci9pbmRleC5qcydcbmltcG9ydCBQcm9mZXNzaW9uYWxHcmFwaCBmcm9tICcuLi9kb2N0b3JQcm9maWxlL3Byb2Zlc3Npb25hbEdyYXBoL2luZGV4LmpzJ1xuaW1wb3J0IENsaW5pY1NlbGVjdG9yIGZyb20gJy4uL2NvbW1vbnMvY2xpbmljU2VsZWN0b3IvaW5kZXguanMnXG5cbmNsYXNzIERvY3RvclByb2ZpbGVWaWV3IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIHNlbGVjdGVkRG9jdG9yIDogbnVsbFxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIGxldCBkb2N0b3JJZCA9IHRoaXMucHJvcHMubWF0Y2gucGFyYW1zLmlkXG4gICAgICAgIGlmIChkb2N0b3JJZCkge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7c2VsZWN0ZWREb2N0b3IgOiBkb2N0b3JJZH0pXG4gICAgICAgICAgICB0aGlzLnByb3BzLmdldERvY3RvckJ5SWQoZG9jdG9ySWQpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZG9jdG9yUHJvZmlsZVwiPlxuXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnByb3BzLkRPQ1RPUlNbdGhpcy5zdGF0ZS5zZWxlY3RlZERvY3Rvcl0gP1xuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8RG9jdG9yUHJvZmlsZUNhcmRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGlkZUJvdHRvbT17dHJ1ZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGV0YWlscz17dGhpcy5wcm9wcy5ET0NUT1JTW3RoaXMuc3RhdGUuc2VsZWN0ZWREb2N0b3JdfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPEFib3V0RG9jdG9yIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPENsaW5pY1NlbGVjdG9yXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRldGFpbHM9e3RoaXMucHJvcHMuRE9DVE9SU1t0aGlzLnN0YXRlLnNlbGVjdGVkRG9jdG9yXX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgey4uLnRoaXMucHJvcHN9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8UHJvZmVzc2lvbmFsR3JhcGggLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PiA6IFwiXCJcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgRG9jdG9yUHJvZmlsZVZpZXdcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG5jbGFzcyBBYm91dERvY3RvciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJvdXREb2N0b3JcIj5cbiAgICAgICAgICAgICAgICA8aDU+QWJvdXQgRHIuIFN0ZXZlIFJheTwvaDU+XG4gICAgICAgICAgICAgICAgPHA+TG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFtZXQsIGRvbG9yIHV0IHZlc3RpYnVsdW0gYmxhbmRpdCwgdHVycGlzIGZ1c2NlLiBMYWJvcmUgcG90ZW50aSB2aXZhbXVzIG9kaW8gYXJjdSB2ZXN0aWJ1bHVtLiBIZW5kcmVyaXQgbnVsbGEgY29uc2VjdGV0dWVyIHRyaXN0aXF1ZSBhbnRlIGxlbywgdWxsYW1jb3JwZXIgY3Vyc3VzIHJ1dHJ1bSA8L3A+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgQWJvdXREb2N0b3JcbiIsImltcG9ydCBBYm91dERvY3RvciBmcm9tICcuL0Fib3V0RG9jdG9yLmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBBYm91dERvY3RvciIsImltcG9ydCBEb2N0b3JQcm9maWxlVmlldyBmcm9tICcuL0RvY3RvclByb2ZpbGVWaWV3LmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBEb2N0b3JQcm9maWxlVmlldyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG5pbXBvcnQgRXhwYW5zaW9uUGFuZWwsIHtcbiAgICBFeHBhbnNpb25QYW5lbFN1bW1hcnksXG4gICAgRXhwYW5zaW9uUGFuZWxEZXRhaWxzLFxufSBmcm9tICdtYXRlcmlhbC11aS9FeHBhbnNpb25QYW5lbCc7XG5pbXBvcnQgRXhwYW5kTW9yZUljb24gZnJvbSAnbWF0ZXJpYWwtdWktaWNvbnMvRXhwYW5kTW9yZSc7XG5cbmNsYXNzIFByb2Zlc3Npb25hbEdyYXBoIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcblxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwcm9mZXNzaW9uYWxHcmFwaFwiPlxuICAgICAgICAgICAgICAgIDxoNT5Qcm9mZXNzaW9uYWwgR3JhcGg8L2g1PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZXBhbmVsXCI+XG4gICAgICAgICAgICAgICAgICAgIDxFeHBhbnNpb25QYW5lbD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxFeHBhbnNpb25QYW5lbFN1bW1hcnkgZXhwYW5kSWNvbj17PEV4cGFuZE1vcmVJY29uIC8+fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBFZHVjYXRpb25cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvRXhwYW5zaW9uUGFuZWxTdW1tYXJ5PlxuICAgICAgICAgICAgICAgICAgICAgICAgPEV4cGFuc2lvblBhbmVsRGV0YWlscz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvRXhwYW5zaW9uUGFuZWxEZXRhaWxzPlxuICAgICAgICAgICAgICAgICAgICA8L0V4cGFuc2lvblBhbmVsPlxuICAgICAgICAgICAgICAgICAgICA8RXhwYW5zaW9uUGFuZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICA8RXhwYW5zaW9uUGFuZWxTdW1tYXJ5IGV4cGFuZEljb249ezxFeHBhbmRNb3JlSWNvbiAvPn0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgTWVtYmVyc2hpcHNcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvRXhwYW5zaW9uUGFuZWxTdW1tYXJ5PlxuICAgICAgICAgICAgICAgICAgICAgICAgPEV4cGFuc2lvblBhbmVsRGV0YWlscz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvRXhwYW5zaW9uUGFuZWxEZXRhaWxzPlxuICAgICAgICAgICAgICAgICAgICA8L0V4cGFuc2lvblBhbmVsPlxuICAgICAgICAgICAgICAgICAgICA8RXhwYW5zaW9uUGFuZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICA8RXhwYW5zaW9uUGFuZWxTdW1tYXJ5IGV4cGFuZEljb249ezxFeHBhbmRNb3JlSWNvbiAvPn0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgRXhwZXJpZW5jZVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9FeHBhbnNpb25QYW5lbFN1bW1hcnk+XG4gICAgICAgICAgICAgICAgICAgICAgICA8RXhwYW5zaW9uUGFuZWxEZXRhaWxzPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9FeHBhbnNpb25QYW5lbERldGFpbHM+XG4gICAgICAgICAgICAgICAgICAgIDwvRXhwYW5zaW9uUGFuZWw+XG4gICAgICAgICAgICAgICAgICAgIDxFeHBhbnNpb25QYW5lbD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxFeHBhbnNpb25QYW5lbFN1bW1hcnkgZXhwYW5kSWNvbj17PEV4cGFuZE1vcmVJY29uIC8+fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBTcGVjaWFsaXphdGlvbnNcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvRXhwYW5zaW9uUGFuZWxTdW1tYXJ5PlxuICAgICAgICAgICAgICAgICAgICAgICAgPEV4cGFuc2lvblBhbmVsRGV0YWlscz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvRXhwYW5zaW9uUGFuZWxEZXRhaWxzPlxuICAgICAgICAgICAgICAgICAgICA8L0V4cGFuc2lvblBhbmVsPlxuICAgICAgICAgICAgICAgICAgICA8RXhwYW5zaW9uUGFuZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICA8RXhwYW5zaW9uUGFuZWxTdW1tYXJ5IGV4cGFuZEljb249ezxFeHBhbmRNb3JlSWNvbiAvPn0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgQXdhcmRzXG4gICAgICAgICAgICAgICAgICAgICAgICA8L0V4cGFuc2lvblBhbmVsU3VtbWFyeT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxFeHBhbnNpb25QYW5lbERldGFpbHM+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L0V4cGFuc2lvblBhbmVsRGV0YWlscz5cbiAgICAgICAgICAgICAgICAgICAgPC9FeHBhbnNpb25QYW5lbD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBQcm9mZXNzaW9uYWxHcmFwaFxuIiwiaW1wb3J0IFByb2Zlc3Npb25hbEdyYXBoIGZyb20gJy4vUHJvZmVzc2lvbmFsR3JhcGguanMnXG5cbmV4cG9ydCBkZWZhdWx0IFByb2Zlc3Npb25hbEdyYXBoIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgYXhpb3MgZnJvbSAnYXhpb3MnXG5cbmNsYXNzIExvY2F0aW9uU2VhcmNoIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIHNlYXJjaDogXCJcIixcbiAgICAgICAgICAgIHNlYXJjaFJlc3VsdHM6IFtdXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRMb2NhdGlvbihsb2NhdGlvbikge1xuICAgICAgICB2YXIgYXV0byA9IG5ldyBnb29nbGUubWFwcy5wbGFjZXMuQXV0b2NvbXBsZXRlU2VydmljZSgpXG5cbiAgICAgICAgdmFyIHJlcXVlc3QgPSB7XG4gICAgICAgICAgICBpbnB1dDogbG9jYXRpb24sXG4gICAgICAgICAgICB0eXBlczogWydnZW9jb2RlJ10sXG4gICAgICAgICAgICBjb21wb25lbnRSZXN0cmljdGlvbnM6IHsgY291bnRyeTogJ2luJyB9XG4gICAgICAgIH07XG4gICAgICAgIGlmIChsb2NhdGlvbikge1xuICAgICAgICAgICAgYXV0by5nZXRQbGFjZVByZWRpY3Rpb25zKHJlcXVlc3QsIGZ1bmN0aW9uIChyZXN1bHRzLCBzdGF0dXMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgc2VhcmNoUmVzdWx0czogcmVzdWx0cyB9KVxuICAgICAgICAgICAgfS5iaW5kKHRoaXMpKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgaW5wdXRIYW5kbGVyKGUpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBzZWFyY2g6IGUudGFyZ2V0LnZhbHVlXG4gICAgICAgIH0pXG4gICAgICAgIHRoaXMuZ2V0TG9jYXRpb24oZS50YXJnZXQudmFsdWUpXG5cbiAgICB9XG5cbiAgICBzZWxlY3RMb2NhdGlvbihsb2NhdGlvbikge1xuICAgICAgICBsZXQgbWFwID0gbmV3IGdvb2dsZS5tYXBzLk1hcChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFwJyksIHtcbiAgICAgICAgICAgIGNlbnRlcjogeyBsYXQ6IC0zMy44NjcsIGxuZzogMTUxLjE5NSB9LFxuICAgICAgICAgICAgem9vbTogMTVcbiAgICAgICAgfSlcbiAgICAgICAgbGV0IHNlcnZpY2UgPSBuZXcgZ29vZ2xlLm1hcHMucGxhY2VzLlBsYWNlc1NlcnZpY2UobWFwKTtcbiAgICAgICAgc2VydmljZS5nZXREZXRhaWxzKHtcbiAgICAgICAgICAgIHJlZmVyZW5jZTogbG9jYXRpb24ucmVmZXJlbmNlXG4gICAgICAgIH0sIGZ1bmN0aW9uIChwbGFjZSwgc3RhdHVzKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLnNlbGVjdExvY2F0aW9uKHBsYWNlKVxuICAgICAgICAgICAgdGhpcy5wcm9wcy5oaXN0b3J5LmdvKC0xKVxuXG4gICAgICAgIH0uYmluZCh0aGlzKSlcbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgbGV0IGlucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RvcExvY2F0aW9uU2VhcmNoJylcbiAgICAgICAgaW5wdXQuZm9jdXMoKVxuICAgIH1cblxuICAgIHN0YXRpYyBjb250ZXh0VHlwZXMgPSB7XG4gICAgICAgIHJvdXRlcjogKCkgPT4gbnVsbFxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICA8aGVhZGVyIGNsYXNzTmFtZT1cInNraW4td2hpdGUgZml4ZWQgaG9yaXpvbnRhbCB0b3AgbG9jYXRpb24tZGV0ZWN0LWhlYWRlclwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lci1mbHVpZFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC0xMlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNlbGVjdC1sb2NhdGlvbi1yb3cgdGV4dC1jZW50ZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnByb3BzLmhpc3RvcnkuZ28oLTEpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fSBjbGFzc05hbWU9XCJjdC1pbWcgY3QtaW1nLW1kIGNsb3NlXCI+PGltZyBzcmM9XCIvYXNzZXRzL2ltZy9jdXN0b21lci1pY29ucy9jbG9zZS1ibGFjay5zdmdcIiBjbGFzc05hbWU9XCJpbWctZmx1aWRcIiAvPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoNCBjbGFzc05hbWU9XCJmdy03MDAgdGV4dC1tZFwiPlNlbGVjdCBMb2NhdGlvbjwvaDQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLTEyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic2VhcmNoLXJvd1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG9uLWdyb3VwIGxvY2F0aW9uLWRldGVjdC1maWVsZFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIHZhbHVlPXt0aGlzLnN0YXRlLnNlYXJjaH0gb25DaGFuZ2U9e3RoaXMuaW5wdXRIYW5kbGVyLmJpbmQodGhpcyl9IGNsYXNzTmFtZT1cImZvcm0tY29udHJvbCBpbnB1dC1tZCBzZWFyY2gtaW5wdXQgbm8tc2hhZG93XCIgcGxhY2Vob2xkZXI9XCJTZWxlY3QgYW55IGNpdHkgb3IgbG9jYWxpdHlcIiBpZD1cInRvcExvY2F0aW9uU2VhcmNoXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJjdC1pbWcgY3QtaW1nLXNtIG1hcC1tYXJrZXItYmx1ZVwiPjxpbWcgc3JjPVwiL2Fzc2V0cy9pbWcvY3VzdG9tZXItaWNvbnMvbWFwLW1hcmtlci1ibHVlLnN2Z1wiIGNsYXNzTmFtZT1cImltZy1mbHVpZFwiIC8+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImRldGVjdC1teS1sb2NhaXRvblwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImN0LWltZyBjdC1pbWcteHNcIj48aW1nIHNyYz1cIi9hc3NldHMvaW1nL2N1c3RvbWVyLWljb25zL2dwcy5zdmdcIiBjbGFzc05hbWU9XCJpbWctZmx1aWRcIiAvPjwvc3Bhbj5EZXRlY3QgTXkgTG9jYXRpb25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2hlYWRlcj5cbiAgICAgICAgICAgICAgICA8c2VjdGlvbiBjbGFzc05hbWU9XCJ3cmFwIGxvY2F0b24tZGV0ZWN0LXNjcmVlblwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIndpZGdldC1wYW5lbFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGg0IGNsYXNzTmFtZT1cInBhbmVsLXRpdGxlXCI+U2VhcmNoIFJlc3VsdDwvaDQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBhbmVsLWNvbnRlbnQgcGQtMFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx1bCBjbGFzc05hbWU9XCJsaXN0IGNpdHktbGlzdFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlLnNlYXJjaFJlc3VsdHMubWFwKChyZXN1bHQsIGkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gPGxpIGtleT17aX0gb25DbGljaz17dGhpcy5zZWxlY3RMb2NhdGlvbi5iaW5kKHRoaXMsIHJlc3VsdCl9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YT57cmVzdWx0LmRlc2NyaXB0aW9ufVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiY2l0eS1sb2NcIj5DaXR5PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvc2VjdGlvbj5cbiAgICAgICAgICAgICAgICA8ZGl2IGlkPVwibWFwXCIgc3R5bGU9e3sgZGlzcGxheTogJ25vbmUnIH19PjwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IExvY2F0aW9uU2VhcmNoXG4iLCJpbXBvcnQgTG9jYXRpb25TZWFyY2ggZnJvbSAnLi9Mb2NhdGlvblNlYXJjaC5qcydcblxuXG5leHBvcnQgZGVmYXVsdCBMb2NhdGlvblNlYXJjaCIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG5pbXBvcnQgRG9jdG9yUHJvZmlsZUNhcmQgZnJvbSAnLi4vY29tbW9ucy9kb2N0b3JQcm9maWxlQ2FyZC9pbmRleC5qcydcbmltcG9ydCBEZXRhaWxzRm9ybSBmcm9tICcuL2RldGFpbHNGb3JtL2luZGV4LmpzJ1xuaW1wb3J0IFNlbGVjdGVkQ2xpbmljIGZyb20gJy4uL2NvbW1vbnMvc2VsZWN0ZWRDbGluaWMvaW5kZXguanMnXG5cbmNsYXNzIFBhdGllbnREZXRhaWxzIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIHNlbGVjdGVkRG9jdG9yOiBudWxsLFxuICAgICAgICAgICAgc2VsZWN0ZWRDbGluaWM6IG51bGwsXG4gICAgICAgICAgICBzZWxlY3RlZFNsb3Q6IG51bGxcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByb2NlZWQoKXtcbiAgICAgICAgdGhpcy5jb250ZXh0LnJvdXRlci5oaXN0b3J5LnB1c2goJy9wYXltZW50JylcbiAgICB9XG5cbiAgICBnZXRMb2NhdGlvblBhcmFtKHRhZykge1xuICAgICAgICAvLyB0aGlzIEFQSSBhc3N1bWVzIHRoZSBjb250ZXh0IG9mIHJlYWN0LXJvdXRlci00XG4gICAgICAgIGNvbnN0IHBhcmFtU3RyaW5nID0gdGhpcy5wcm9wcy5sb2NhdGlvbi5zZWFyY2hcbiAgICAgICAgY29uc3QgcGFyYW1zID0gbmV3IFVSTFNlYXJjaFBhcmFtcyhwYXJhbVN0cmluZylcbiAgICAgICAgcmV0dXJuIHBhcmFtcy5nZXQodGFnKVxuICAgIH1cblxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgbGV0IGRvY3RvcklkID0gdGhpcy5wcm9wcy5tYXRjaC5wYXJhbXMuaWRcbiAgICAgICAgICAgIGxldCBjbGluaWNJZCA9IHRoaXMucHJvcHMubWF0Y2gucGFyYW1zLmNsaW5pY0lkXG4gICAgICAgICAgICBsZXQgc2VsZWN0ZWRTbG90ID0gdGhpcy5nZXRMb2NhdGlvblBhcmFtKCd0JylcbiAgICAgICAgICAgIHNlbGVjdGVkU2xvdCA9IG5ldyBEYXRlKHBhcnNlRmxvYXQoc2VsZWN0ZWRTbG90KSlcbiAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKGRvY3RvcklkICYmIGNsaW5pY0lkICYmIHNlbGVjdGVkU2xvdCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZERvY3RvcjogZG9jdG9ySWQsXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkQ2xpbmljOiBjbGluaWNJZCxcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRTbG90OiBzZWxlY3RlZFNsb3QudG9TdHJpbmcoKVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5nZXREb2N0b3JCeUlkKGRvY3RvcklkKVxuICAgICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIChlKSB7XG5cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN0YXRpYyBjb250ZXh0VHlwZXMgPSB7XG4gICAgICAgIHJvdXRlcjogKCkgPT4gbnVsbFxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwYXRpZW50RGV0YWlsc1wiPlxuXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnByb3BzLkRPQ1RPUlNbdGhpcy5zdGF0ZS5zZWxlY3RlZERvY3Rvcl0gP1xuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8RG9jdG9yUHJvZmlsZUNhcmRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGlkZUJvdHRvbT17dHJ1ZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGlkZUJvb2tOb3c9e3RydWV9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRldGFpbHM9e3RoaXMucHJvcHMuRE9DVE9SU1t0aGlzLnN0YXRlLnNlbGVjdGVkRG9jdG9yXX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxTZWxlY3RlZENsaW5pY1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZERvY3Rvcj17dGhpcy5wcm9wcy5ET0NUT1JTW3RoaXMuc3RhdGUuc2VsZWN0ZWREb2N0b3JdfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZENsaW5pYz17dGhpcy5zdGF0ZS5zZWxlY3RlZENsaW5pY31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic2VsZWN0ZWRBcHBvaW50bWVudFNsb3RcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGg1PlNlbGVjdGVkIEFwcG9pbnRtZW50IFNsb3Q8L2g1PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJhcHBkYXRlXCI+QXBwb2ludG1lbnQgRGF0ZTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZGF0ZVwiPnsgdGhpcy5zdGF0ZS5zZWxlY3RlZFNsb3QgfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8RGV0YWlsc0Zvcm0gLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cInByb2NlZWRidG5cIiBvbkNsaWNrPXt0aGlzLnByb2NlZWQuYmluZCh0aGlzKX0+Q29uZmlybSBCb29raW5nPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj4gOiBcIlwiXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgUGF0aWVudERldGFpbHNcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG5jbGFzcyBEZXRhaWxzRm9ybSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgICBwYXRpZW50TmFtZSA6ICcnLFxuICAgICAgICAgICAgcGF0aWVudEVtYWlsIDogJycsXG4gICAgICAgICAgICBwYXRpZW50R2VuZGVyIDogJ21hbGUnLFxuICAgICAgICAgICAgcGF0aWVudE1vYmlsZSA6ICcnLFxuICAgICAgICAgICAgb3RwIDonJ1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaW5wdXRIYW5kbGVyKHdoaWNoLCBlKXtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IFt3aGljaF0gOiBlLnRhcmdldC52YWx1ZSB9KVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJkZXRhaWxzRm9ybVwiPlxuICAgICAgICAgICAgICAgIDxoNT5QbGVhc2UgcHJvdmlkZSBwYXRpZW50IGRldGFpbHM8L2g1PlxuXG4gICAgICAgICAgICAgICAgPGlucHV0IHZhbHVlPXt0aGlzLnN0YXRlLnBhdGllbnROYW1lfSBvbkNoYW5nZT17dGhpcy5pbnB1dEhhbmRsZXIuYmluZCh0aGlzLCdwYXRpZW50TmFtZScpfSBjbGFzc05hbWU9XCJwdG5hbWVcIiBwbGFjZWhvbGRlcj1cIlBhdGllbnQgTmFtZSpcIiAvPlxuICAgICAgICAgICAgICAgIDxpbnB1dCB2YWx1ZT17dGhpcy5zdGF0ZS5wYXRpZW50RW1haWx9IG9uQ2hhbmdlPXt0aGlzLmlucHV0SGFuZGxlci5iaW5kKHRoaXMsJ3BhdGllbnRFbWFpbCcpfSBjbGFzc05hbWU9XCJwdGVtYWlsXCIgcGxhY2Vob2xkZXI9XCJFbWFpbCpcIiAvPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicHRnZW5kZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4+R2VuZGVyIDo8L3NwYW4+IFxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInJhZGlvXCIgbmFtZT1cImdlbmRlclwiIHZhbHVlPVwibWFsZVwiIGNoZWNrZWQ9e3RoaXMuc3RhdGUucGF0aWVudEdlbmRlciA9PT0gXCJtYWxlXCJ9IG9uQ2hhbmdlPXt0aGlzLmlucHV0SGFuZGxlci5iaW5kKHRoaXMsJ3BhdGllbnRHZW5kZXInKX0vPiBNYWxlXG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwicmFkaW9cIiBuYW1lPVwiZ2VuZGVyXCIgdmFsdWU9XCJmZW1hbGVcIiBjaGVja2VkPXt0aGlzLnN0YXRlLnBhdGllbnRHZW5kZXIgPT09IFwiZmVtYWxlXCJ9IG9uQ2hhbmdlPXt0aGlzLmlucHV0SGFuZGxlci5iaW5kKHRoaXMsJ3BhdGllbnRHZW5kZXInKX0vPiBGZW1hbGVcbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8aW5wdXQgdmFsdWU9e3RoaXMuc3RhdGUucGF0aWVudE1vYmlsZX0gb25DaGFuZ2U9e3RoaXMuaW5wdXRIYW5kbGVyLmJpbmQodGhpcywncGF0aWVudE1vYmlsZScpfSBjbGFzc05hbWU9XCJwdG1vYmlsZVwiIHBsYWNlaG9sZGVyPVwiTW9iaWxlKlwiIC8+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJvdHBidG5cIj4oUmUpU2VuZCBPVFA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8aW5wdXQgdmFsdWU9e3RoaXMuc3RhdGUub3RwfSBvbkNoYW5nZT17dGhpcy5pbnB1dEhhbmRsZXIuYmluZCh0aGlzLCdvdHAnKX0gY2xhc3NOYW1lPVwicHRvdHBcIiBwbGFjZWhvbGRlcj1cIkVudGVyIE9UUCpcIiAvPlxuXG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgRGV0YWlsc0Zvcm1cbiIsImltcG9ydCBEZXRhaWxzRm9ybSBmcm9tICcuL0RldGFpbHNGb3JtLmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBEZXRhaWxzRm9ybSIsImltcG9ydCBQYXRpZW50RGV0YWlscyBmcm9tICcuL1BhdGllbnREZXRhaWxzLmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBQYXRpZW50RGV0YWlscyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCBQYXltZW50SWNvbiBmcm9tICdtYXRlcmlhbC11aS1pY29ucy9QYXltZW50JztcbmltcG9ydCBDYXNoSWNvbiBmcm9tICdtYXRlcmlhbC11aS1pY29ucy9BdHRhY2hNb25leSc7XG5cbmNsYXNzIFBheW1lbnRWaWV3IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICB9XG5cbiAgICBwcm9jZWVkKCl7XG4gICAgICAgIHRoaXMuY29udGV4dC5yb3V0ZXIuaGlzdG9yeS5wdXNoKFwiL2Jvb2tpbmcvOnJlZklkXCIpXG4gICAgfVxuXG4gICAgc3RhdGljIGNvbnRleHRUeXBlcyA9IHtcbiAgICAgICAgcm91dGVyOiAoKSA9PiBudWxsXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBheW1lbnRcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm9mZmVyUm93XCI+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuPkdldCAxMCUgY2FzaGJhY2sgZm9yIGFsbCBvbmxpbmUgcGF5bWVudCwgVCZDPC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGF5bWVudFJvd1wiIG9uQ2xpY2s9e3RoaXMucHJvY2VlZC5iaW5kKHRoaXMpfT5cbiAgICAgICAgICAgICAgICAgICAgPFBheW1lbnRJY29uIGNsYXNzTmFtZT1cInBheW1lbnRJY29uXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4+UGF5dG0gV2FsbGV0PC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGF5bWVudFJvd1wiIG9uQ2xpY2s9e3RoaXMucHJvY2VlZC5iaW5kKHRoaXMpfT5cbiAgICAgICAgICAgICAgICAgICAgPFBheW1lbnRJY29uIGNsYXNzTmFtZT1cInBheW1lbnRJY29uXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4+Q3JlZGl0L0RlYml0L0FUTSBDYXJkPC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGF5bWVudFJvd1wiIG9uQ2xpY2s9e3RoaXMucHJvY2VlZC5iaW5kKHRoaXMpfT5cbiAgICAgICAgICAgICAgICAgICAgPFBheW1lbnRJY29uIGNsYXNzTmFtZT1cInBheW1lbnRJY29uXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4+TmV0IEJhbmtpbmc8L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwYXltZW50Um93XCIgb25DbGljaz17dGhpcy5wcm9jZWVkLmJpbmQodGhpcyl9PlxuICAgICAgICAgICAgICAgICAgICA8Q2FzaEljb24gY2xhc3NOYW1lPVwicGF5bWVudEljb25cIiAvPlxuICAgICAgICAgICAgICAgICAgICA8c3Bhbj5QYXkgaW4gQ2FzaDwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBheW1lbnRSb3dcIiBvbkNsaWNrPXt0aGlzLnByb2NlZWQuYmluZCh0aGlzKX0+XG4gICAgICAgICAgICAgICAgICAgIDxQYXltZW50SWNvbiBjbGFzc05hbWU9XCJwYXltZW50SWNvblwiIC8+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuPk9uRG9jIFBheTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBQYXltZW50Vmlld1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cbmltcG9ydCBDb21tb25seVNlYXJjaGVkIGZyb20gJy4uL2NvbW1vbnMvY29tbW9ubHlTZWFyY2hlZC9pbmRleC5qcydcbi8vIGltcG9ydCBMb2NhdGlvblNlbGVjdG9yIGZyb20gJy4uLy4uL2NvbW1vbnMvbG9jYXRpb25TZWxlY3Rvci9pbmRleC5qcydcbmltcG9ydCBDcml0ZXJpYVNlbGVjdG9yIGZyb20gJy4uL2NvbW1vbnMvY3JpdGVyaWFTZWxlY3Rvci9pbmRleC5qcydcblxuY2xhc3MgU2VhcmNoQ3JpdGVyaWFWaWV3IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpe1xuICAgICAgICB0aGlzLnByb3BzLmxvYWRTZWFyY2hDcml0ZXJpYSgpXG4gICAgfVxuXG4gICAgc2VhcmNoUHJvY2VlZCgpe1xuICAgICAgICAvLyBsZXQgc2VhcmNoRGF0YSA9IHtcbiAgICAgICAgLy8gICAgIHNlbGVjdGVkU3BlY2lhbGl0aWVzIDogdGhpcy5wcm9wcy5zZWxlY3RlZFNwZWNpYWxpdGllcyxcbiAgICAgICAgLy8gICAgIHNlbGVjdGVkQ29uZGl0aW9ucyA6IHRoaXMucHJvcHMuc2VsZWN0ZWRDb25kaXRpb25zLFxuICAgICAgICAvLyAgICAgc2VsZWN0ZWRMb2NhdGlvbiA6IHRoaXMucHJvcHMuc2VsZWN0ZWRMb2NhdGlvbixcbiAgICAgICAgLy8gICAgIHNlbGVjdGVkQ3JpdGVyaWEgOiB0aGlzLnByb3BzLnNlbGVjdGVkQ3JpdGVyaWFcbiAgICAgICAgLy8gfVxuICAgICAgICAvLyBzZWFyY2hEYXRhID0gZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNlYXJjaERhdGEpKVxuICAgICAgICB0aGlzLmNvbnRleHQucm91dGVyLmhpc3RvcnkucHVzaChgL3NlYXJjaHJlc3VsdHNgKVxuICAgIH1cblxuICAgIHN0YXRpYyBjb250ZXh0VHlwZXMgPSB7XG4gICAgICAgIHJvdXRlcjogKCkgPT4gbnVsbFxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzZWFyY2hDcml0ZXJpYVwiPlxuICAgICAgICAgICAgICAgIDxMb2NhdGlvblNlbGVjdG9yXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkTG9jYXRpb249e3RoaXMucHJvcHMuc2VsZWN0ZWRMb2NhdGlvbn1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDxDcml0ZXJpYVNlbGVjdG9yIFxuICAgICAgICAgICAgICAgICAgICBjb21tb25seVNlYXJjaGVkQ29uZGl0aW9ucz17dGhpcy5wcm9wcy5jb21tb25seVNlYXJjaGVkQ29uZGl0aW9uc31cbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRDb25kaXRpb25zPXt0aGlzLnByb3BzLnNlbGVjdGVkQ29uZGl0aW9uc31cbiAgICAgICAgICAgICAgICAgICAgY29tbW9ubHlTZWFyY2hlZFNwZWNpYWxpdGllcz17dGhpcy5wcm9wcy5jb21tb25seVNlYXJjaGVkU3BlY2lhbGl0aWVzfVxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZFNwZWNpYWxpdGllcz17dGhpcy5wcm9wcy5zZWxlY3RlZFNwZWNpYWxpdGllc31cbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRDcml0ZXJpYT17dGhpcy5wcm9wcy5zZWxlY3RlZENyaXRlcmlhfVxuICAgICAgICAgICAgICAgICAgICB0b2dnbGVDb25kaXRpb249e3RoaXMucHJvcHMudG9nZ2xlQ29uZGl0aW9uLmJpbmQodGhpcyl9XG4gICAgICAgICAgICAgICAgICAgIHRvZ2dsZVNwZWNpYWxpdHk9e3RoaXMucHJvcHMudG9nZ2xlU3BlY2lhbGl0eS5iaW5kKHRoaXMpfVxuICAgICAgICAgICAgICAgICAgICB0b2dnbGVDcml0ZXJpYT17dGhpcy5wcm9wcy50b2dnbGVDcml0ZXJpYS5iaW5kKHRoaXMpfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPENvbW1vbmx5U2VhcmNoZWRcbiAgICAgICAgICAgICAgICAgICAgaGVhZGluZz1cIkNvbW1vbmx5IHNlYXJjaGVkIGNvbmRpdGlvbnNcIlxuICAgICAgICAgICAgICAgICAgICBkYXRhPXt0aGlzLnByb3BzLmNvbW1vbmx5U2VhcmNoZWRDb25kaXRpb25zfVxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZD17dGhpcy5wcm9wcy5zZWxlY3RlZENvbmRpdGlvbnN9XG4gICAgICAgICAgICAgICAgICAgIHRvZ2dsZVBpbGw9e3RoaXMucHJvcHMudG9nZ2xlQ29uZGl0aW9uLmJpbmQodGhpcyl9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8Q29tbW9ubHlTZWFyY2hlZFxuICAgICAgICAgICAgICAgICAgICBoZWFkaW5nPVwiQ29tbW9ubHkgc2VhcmNoZWQgc3BlY2lhbGl0aWVzXCJcbiAgICAgICAgICAgICAgICAgICAgZGF0YT17dGhpcy5wcm9wcy5jb21tb25seVNlYXJjaGVkU3BlY2lhbGl0aWVzfVxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZD17dGhpcy5wcm9wcy5zZWxlY3RlZFNwZWNpYWxpdGllc31cbiAgICAgICAgICAgICAgICAgICAgdG9nZ2xlUGlsbD17dGhpcy5wcm9wcy50b2dnbGVTcGVjaWFsaXR5LmJpbmQodGhpcyl9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9e3RoaXMuc2VhcmNoUHJvY2VlZC5iaW5kKHRoaXMpfSBjbGFzc05hbWU9XCJwcm9jZWVkQnRuXCI+IFByb2NlZWQgPC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFNlYXJjaENyaXRlcmlhVmlld1xuIiwiaW1wb3J0IFNlYXJjaENyaXRlcmlhVmlldyBmcm9tICcuL1NlYXJjaENyaXRlcmlhVmlldy5qcydcblxuZXhwb3J0IGRlZmF1bHQgU2VhcmNoQ3JpdGVyaWFWaWV3IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IERvY3RvcnNMaXN0IGZyb20gJy4uL3NlYXJjaFJlc3VsdHMvZG9jdG9yc0xpc3QvaW5kZXguanMnXG5pbXBvcnQgVG9wQmFyIGZyb20gJy4uL3NlYXJjaFJlc3VsdHMvdG9wQmFyL2luZGV4LmpzJ1xuXG5cbmNsYXNzIFNlYXJjaFJlc3VsdHNWaWV3IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcblxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIGxldCB7XG4gICAgICAgICAgICBzZWxlY3RlZENvbmRpdGlvbnMsXG4gICAgICAgICAgICBzZWxlY3RlZFNwZWNpYWxpdGllcyxcbiAgICAgICAgICAgIHNlbGVjdGVkTG9jYXRpb24sXG4gICAgICAgICAgICBzZWxlY3RlZENyaXRlcmlhLFxuICAgICAgICAgICAgQ1JJVEVSSUFfTE9BREVEXG4gICAgICAgIH0gPSB0aGlzLnByb3BzXG5cbiAgICAgICAgaWYgKENSSVRFUklBX0xPQURFRCkge1xuICAgICAgICAgICAgbGV0IHNlYXJjaFN0YXRlID0ge1xuICAgICAgICAgICAgICAgIHNlbGVjdGVkQ29uZGl0aW9ucyxcbiAgICAgICAgICAgICAgICBzZWxlY3RlZFNwZWNpYWxpdGllcyxcbiAgICAgICAgICAgICAgICBzZWxlY3RlZExvY2F0aW9uLFxuICAgICAgICAgICAgICAgIHNlbGVjdGVkQ3JpdGVyaWFcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCBmaWx0ZXJTdGF0ZSA9IHRoaXMucHJvcHMuZmlsdGVyQ3JpdGVyaWFcbiAgICAgICAgICAgIHRoaXMuZ2V0RG9jdG9yTGlzdChzZWFyY2hTdGF0ZSwgZmlsdGVyU3RhdGUsIGZhbHNlKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBsZXQgc2VhcmNoU3RhdGUgPSB0aGlzLmdldExvY2F0aW9uUGFyYW0oJ3NlYXJjaCcpXG4gICAgICAgICAgICAgICAgbGV0IGZpbHRlclN0YXRlID0gdGhpcy5nZXRMb2NhdGlvblBhcmFtKCdmaWx0ZXInKVxuICAgICAgICAgICAgICAgIGlmIChmaWx0ZXJTdGF0ZSkge1xuICAgICAgICAgICAgICAgICAgICBmaWx0ZXJTdGF0ZSA9IEpTT04ucGFyc2UoZmlsdGVyU3RhdGUpXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZmlsdGVyU3RhdGUgPSB7fVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzZWFyY2hTdGF0ZSA9IEpTT04ucGFyc2Uoc2VhcmNoU3RhdGUpXG4gICAgICAgICAgICAgICAgdGhpcy5nZXREb2N0b3JMaXN0KHNlYXJjaFN0YXRlLCBmaWx0ZXJTdGF0ZSwgdHJ1ZSlcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGUpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIGdldExvY2F0aW9uUGFyYW0odGFnKSB7XG4gICAgICAgIC8vIHRoaXMgQVBJIGFzc3VtZXMgdGhlIGNvbnRleHQgb2YgcmVhY3Qtcm91dGVyLTRcbiAgICAgICAgY29uc3QgcGFyYW1TdHJpbmcgPSB0aGlzLnByb3BzLmxvY2F0aW9uLnNlYXJjaFxuICAgICAgICBjb25zdCBwYXJhbXMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKHBhcmFtU3RyaW5nKVxuICAgICAgICByZXR1cm4gcGFyYW1zLmdldCh0YWcpXG4gICAgfVxuXG4gICAgZ2V0RG9jdG9yTGlzdChzZWFyY2hTdGF0ZSwgZmlsdGVyU3RhdGUsIG1lcmdlU3RhdGUpIHtcbiAgICAgICAgdGhpcy5wcm9wcy5nZXREb2N0b3JzKHNlYXJjaFN0YXRlLCBmaWx0ZXJTdGF0ZSwgbWVyZ2VTdGF0ZSk7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzZWFyY2hSZXN1bHRzXCI+XG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnByb3BzLkxPQURJTkcgPyBcIlwiIDpcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPFRvcEJhciAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxEb2N0b3JzTGlzdCB7Li4udGhpcy5wcm9wc30gLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgU2VhcmNoUmVzdWx0c1ZpZXdcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG5pbXBvcnQgRW1vdGlJY29uIGZyb20gJ21hdGVyaWFsLXVpLWljb25zL0FjY291bnRDaXJjbGUnO1xuaW1wb3J0IEhvbWVJY29uIGZyb20gJ21hdGVyaWFsLXVpLWljb25zL0hvbWUnO1xuaW1wb3J0IENsb2NrSWNvbiBmcm9tICdtYXRlcmlhbC11aS1pY29ucy9BdlRpbWVyJztcbmltcG9ydCBMb2NhdGlvbnNJY29uIGZyb20gJ21hdGVyaWFsLXVpLWljb25zL0xvY2F0aW9uT24nO1xuXG5pbXBvcnQgRG9jdG9yUHJvZmlsZUNhcmQgZnJvbSAnLi4vLi4vY29tbW9ucy9kb2N0b3JQcm9maWxlQ2FyZC9pbmRleC5qcydcbmltcG9ydCBJbmZpbml0ZVNjcm9sbCBmcm9tICdyZWFjdC1pbmZpbml0ZS1zY3JvbGxlcic7XG5jbGFzcyBEb2N0b3JzTGlzdCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgfVxuXG4gICAgc3RhdGljIGNvbnRleHRUeXBlcyA9IHtcbiAgICAgICAgcm91dGVyOiAoKSA9PiBudWxsXG4gICAgfVxuXG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgbGV0IHsgRE9DVE9SUywgZG9jdG9yTGlzdCB9ID0gdGhpcy5wcm9wc1xuICAgICAgICBcbiAgICAgICAgdmFyIGRvY3RvclZpZXdMaXN0ID0gW107XG5cbiAgICAgICAgZG9jdG9yVmlld0xpc3QgPSBkb2N0b3JMaXN0Lm1hcCgoZG9jSWQsIGkpID0+IHtcbiAgICAgICAgICAgIHJldHVybiA8RG9jdG9yUHJvZmlsZUNhcmQgZGV0YWlscz17RE9DVE9SU1tkb2NJZF19IHNlbGVjdERvY3Rvcj17dGhpcy5wcm9wcy5zZWxlY3REb2N0b3J9IGtleT17aX0gLz5cbiAgICAgICAgfSlcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJkb2N0b3JzTGlzdFwiPlxuICAgICAgICAgICAgICAgIHsvKiA8SW5maW5pdGVTY3JvbGxcbiAgICAgICAgICAgICAgICAgICAgcGFnZVN0YXJ0PXswfVxuICAgICAgICAgICAgICAgICAgICBsb2FkTW9yZT17dGhpcy5wcm9wcy5nZXREb2N0b3JzfVxuICAgICAgICAgICAgICAgICAgICBoYXNNb3JlPXtmYWxzZX1cbiAgICAgICAgICAgICAgICAgICAgbG9hZGVyPXs8ZGl2IGNsYXNzTmFtZT1cImxvYWRlclwiIGtleT17MH0+TG9hZGluZyAuLi48L2Rpdj59XG4gICAgICAgICAgICAgICAgPiAqL31cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAge2RvY3RvclZpZXdMaXN0fVxuXG4gICAgICAgICAgICAgICAgey8qIDwvSW5maW5pdGVTY3JvbGw+ICovfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IERvY3RvcnNMaXN0XG4iLCJpbXBvcnQgRG9jdG9yTGlzdCBmcm9tICcuL0RvY3RvcnNMaXN0LmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBEb2N0b3JMaXN0IiwiaW1wb3J0IFNlYXJjaFJlc3VsdHNWaWV3IGZyb20gJy4vU2VhcmNoUmVzdWx0c1ZpZXcuanMnXG5cbmV4cG9ydCBkZWZhdWx0IFNlYXJjaFJlc3VsdHNWaWV3IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cbmltcG9ydCBTb3J0SWNvbiBmcm9tICdtYXRlcmlhbC11aS1pY29ucy9Tb3J0JztcbmltcG9ydCBGaWx0ZXJJY29uIGZyb20gJ21hdGVyaWFsLXVpLWljb25zL0ZpbHRlckxpc3QnO1xuaW1wb3J0IE1lbnUsIHsgTWVudUl0ZW0gfSBmcm9tICdtYXRlcmlhbC11aS9NZW51JztcblxuY2xhc3MgVG9wQmFyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIGFuY2hvckVsOiBudWxsLFxuICAgICAgICAgICAgc2VhcmNoUmVzdWx0cyA6IHRydWVcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZU9wZW4oZXZlbnQpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGFuY2hvckVsOiBldmVudC5jdXJyZW50VGFyZ2V0IH0pXG4gICAgfVxuXG4gICAgaGFuZGxlQ2xvc2UoKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBhbmNob3JFbDogbnVsbCB9KVxuICAgIH1cblxuICAgIHN0YXRpYyBjb250ZXh0VHlwZXMgPSB7XG4gICAgICAgIHJvdXRlcjogKCkgPT4gbnVsbFxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0b3BCYXJcIj5cbiAgICAgICAgICAgICAgICA8U29ydEljb24gY2xhc3NOYW1lPVwiaWNvbnNvcnRmaWx0ZXJcIiBvbkNsaWNrPXt0aGlzLmhhbmRsZU9wZW4uYmluZCh0aGlzKX0gLz5cbiAgICAgICAgICAgICAgICA8TWVudVxuICAgICAgICAgICAgICAgICAgICBpZD1cInNvcnQtbWVudVwiXG4gICAgICAgICAgICAgICAgICAgIGFuY2hvckVsPXt0aGlzLnN0YXRlLmFuY2hvckVsfVxuICAgICAgICAgICAgICAgICAgICBvcGVuPXtCb29sZWFuKHRoaXMuc3RhdGUuYW5jaG9yRWwpfVxuICAgICAgICAgICAgICAgICAgICBvbkNsb3NlPXt0aGlzLmhhbmRsZUNsb3NlLmJpbmQodGhpcyl9XG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICA8TWVudUl0ZW0gb25DbGljaz17dGhpcy5oYW5kbGVDbG9zZS5iaW5kKHRoaXMpfT5SZWxhdmFuY2U8L01lbnVJdGVtPlxuICAgICAgICAgICAgICAgICAgICA8TWVudUl0ZW0gb25DbGljaz17dGhpcy5oYW5kbGVDbG9zZS5iaW5kKHRoaXMpfT5GZWU8L01lbnVJdGVtPlxuICAgICAgICAgICAgICAgICAgICA8TWVudUl0ZW0gb25DbGljaz17dGhpcy5oYW5kbGVDbG9zZS5iaW5kKHRoaXMpfT5EaXN0YW5jZTwvTWVudUl0ZW0+XG4gICAgICAgICAgICAgICAgICAgIDxNZW51SXRlbSBvbkNsaWNrPXt0aGlzLmhhbmRsZUNsb3NlLmJpbmQodGhpcyl9PkFwb2ludG1lbnQ8L01lbnVJdGVtPlxuICAgICAgICAgICAgICAgIDwvTWVudT5cbiAgICAgICAgICAgICAgICA8RmlsdGVySWNvbiBjbGFzc05hbWU9XCJpY29uc29ydGZpbHRlclwiIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250ZXh0LnJvdXRlci5oaXN0b3J5LnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgcGF0aG5hbWUgOiAnL3NlYXJjaHJlc3VsdHMvZmlsdGVyJ1xuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH19IC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgVG9wQmFyXG4iLCJpbXBvcnQgVG9wQmFyIGZyb20gJy4vVG9wQmFyLmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBUb3BCYXIiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCB7IHdpdGhSb3V0ZXIgfSBmcm9tIFwicmVhY3Qtcm91dGVyLWRvbVwiO1xuXG5pbXBvcnQgUmFkaW8sIHsgUmFkaW9Hcm91cCB9IGZyb20gJ21hdGVyaWFsLXVpL1JhZGlvJztcbmltcG9ydCBDaGVja2JveCBmcm9tICdtYXRlcmlhbC11aS9DaGVja2JveCc7XG5pbXBvcnQgeyBGb3JtTGFiZWwsIEZvcm1Db250cm9sLCBGb3JtQ29udHJvbExhYmVsLCBGb3JtSGVscGVyVGV4dCB9IGZyb20gJ21hdGVyaWFsLXVpL0Zvcm0nO1xuXG5cbmNsYXNzIFNlYXJjaFJlc3VsdHNGaWx0ZXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgZmVlXzA6IGZhbHNlLFxuICAgICAgICAgICAgZmVlXzE6IGZhbHNlLFxuICAgICAgICAgICAgZmVlXzI6IGZhbHNlLFxuICAgICAgICAgICAgZmVlXzM6IGZhbHNlLFxuICAgICAgICAgICAgZ2VuZGVyOiAnYW55JyxcbiAgICAgICAgICAgIGNsaW5pY19wZXJzb25hbDogZmFsc2UsXG4gICAgICAgICAgICBjbGluaWNfaG9zcGl0YWw6IGZhbHNlLFxuICAgICAgICAgICAgY2xpbmljX211bHRpOiBmYWxzZSxcbiAgICAgICAgICAgIGF2YWlsYWJsZV90b2RheTogZmFsc2UsXG4gICAgICAgICAgICBkaXN0YW5jZTogJzMwa20nXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IC4uLnRoaXMucHJvcHMuZmlsdGVyQ3JpdGVyaWEgfSlcbiAgICB9XG5cbiAgICBhcHBseUZpbHRlcigpIHtcbiAgICAgICAgdGhpcy5wcm9wcy5zZXRPUERGaWx0ZXJzKHRoaXMuc3RhdGUpXG4gICAgICAgIHRoaXMucHJvcHMuaGlzdG9yeS5nbygtMSlcbiAgICB9XG5cbiAgICBoYW5kbGVDaGVja2JveChuYW1lLCBlKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBbbmFtZV06IGUudGFyZ2V0LmNoZWNrZWQgfSlcbiAgICB9XG5cbiAgICBoYW5kbGVDaGFuZ2VSYWRpbyhuYW1lLCBlKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBbbmFtZV06IGUudGFyZ2V0LnZhbHVlIH0pXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNlYXJjaFJlc3VsdHNGaWx0ZXJcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN1YkZpbHRlclwiPlxuICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJzdWJIZWFkaW5nXCI+RmVlPC9wPlxuICAgICAgICAgICAgICAgICAgICA8UmFkaW9Hcm91cFxuICAgICAgICAgICAgICAgICAgICAgICAgYXJpYS1sYWJlbD1cImZlZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lPVwiZmVlMVwiXG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxGb3JtQ29udHJvbExhYmVsIGNvbnRyb2w9ezxDaGVja2JveFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrZWQ9e3RoaXMuc3RhdGUuZmVlXzB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuaGFuZGxlQ2hlY2tib3guYmluZCh0aGlzLCAnZmVlXzAnKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8+fSBsYWJlbD1cIkxlc3MgdGhhbiAzMDBcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPEZvcm1Db250cm9sTGFiZWwgY29udHJvbD17PENoZWNrYm94XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2tlZD17dGhpcy5zdGF0ZS5mZWVfMX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5oYW5kbGVDaGVja2JveC5iaW5kKHRoaXMsICdmZWVfMScpfVxuICAgICAgICAgICAgICAgICAgICAgICAgLz59IGxhYmVsPVwiMzAwIHRvIDUwMFwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8Rm9ybUNvbnRyb2xMYWJlbCBjb250cm9sPXs8Q2hlY2tib3hcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGVja2VkPXt0aGlzLnN0YXRlLmZlZV8yfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUNoZWNrYm94LmJpbmQodGhpcywgJ2ZlZV8yJyl9XG4gICAgICAgICAgICAgICAgICAgICAgICAvPn0gbGFiZWw9XCI1MDAgdG8gMTAwMFwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8Rm9ybUNvbnRyb2xMYWJlbCBjb250cm9sPXs8Q2hlY2tib3hcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGVja2VkPXt0aGlzLnN0YXRlLmZlZV8zfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUNoZWNrYm94LmJpbmQodGhpcywgJ2ZlZV8zJyl9XG4gICAgICAgICAgICAgICAgICAgICAgICAvPn0gbGFiZWw9XCIxMDAwK1wiIC8+XG4gICAgICAgICAgICAgICAgICAgIDwvUmFkaW9Hcm91cD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3ViRmlsdGVyXCI+XG4gICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInN1YkhlYWRpbmdcIj5EaXN0YW5jZTwvcD5cbiAgICAgICAgICAgICAgICAgICAgPFJhZGlvR3JvdXBcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyaWEtbGFiZWw9XCJEaXN0YW5jZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lPVwiRGlzdGFuY2UyXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXt0aGlzLnN0YXRlLmRpc3RhbmNlfVxuICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuaGFuZGxlQ2hhbmdlUmFkaW8uYmluZCh0aGlzLCAnZGlzdGFuY2UnKX1cbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgPEZvcm1Db250cm9sTGFiZWwgdmFsdWU9XCIzMGttXCIgY29udHJvbD17PFJhZGlvIGNvbG9yPVwicHJpbWFyeVwiIC8+fSBsYWJlbD1cIlVuZGVyIDMwIEtNXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxGb3JtQ29udHJvbExhYmVsIHZhbHVlPVwiMjBrbVwiIGNvbnRyb2w9ezxSYWRpbyBjb2xvcj1cInByaW1hcnlcIiAvPn0gbGFiZWw9XCJVbmRlciAyMCBLTVwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8Rm9ybUNvbnRyb2xMYWJlbCB2YWx1ZT1cIjEwa21cIiBjb250cm9sPXs8UmFkaW8gY29sb3I9XCJwcmltYXJ5XCIgLz59IGxhYmVsPVwiVW5kZXIgMTAgS01cIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPEZvcm1Db250cm9sTGFiZWwgdmFsdWU9XCI1a21cIiBjb250cm9sPXs8UmFkaW8gY29sb3I9XCJwcmltYXJ5XCIgLz59IGxhYmVsPVwiVW5kZXIgNSBLTVwiIC8+XG5cbiAgICAgICAgICAgICAgICAgICAgPC9SYWRpb0dyb3VwPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdWJGaWx0ZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwic3ViSGVhZGluZ1wiPlR5cGUgT2YgQ2xpbmljPC9wPlxuICAgICAgICAgICAgICAgICAgICA8UmFkaW9Hcm91cFxuICAgICAgICAgICAgICAgICAgICAgICAgYXJpYS1sYWJlbD1cImNsaW5pY1R5cGVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZT1cImNsaW5pY1R5cGVcIlxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICA8Rm9ybUNvbnRyb2xMYWJlbCBjb250cm9sPXs8Q2hlY2tib3hcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGVja2VkPXt0aGlzLnN0YXRlLmNsaW5pY19wZXJzb25hbH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5oYW5kbGVDaGVja2JveC5iaW5kKHRoaXMsICdjbGluaWNfcGVyc29uYWwnKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8+fSBsYWJlbD1cIlBlcnNvbmFsXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxGb3JtQ29udHJvbExhYmVsIGNvbnRyb2w9ezxDaGVja2JveFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrZWQ9e3RoaXMuc3RhdGUuY2xpbmljX2hvc3BpdGFsfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUNoZWNrYm94LmJpbmQodGhpcywgJ2NsaW5pY19ob3NwaXRhbCcpfVxuICAgICAgICAgICAgICAgICAgICAgICAgLz59IGxhYmVsPVwiSG9zcGl0YWxcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPEZvcm1Db250cm9sTGFiZWwgY29udHJvbD17PENoZWNrYm94XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2tlZD17dGhpcy5zdGF0ZS5jbGluaWNfbXVsdGl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuaGFuZGxlQ2hlY2tib3guYmluZCh0aGlzLCAnY2xpbmljX211bHRpJyl9XG4gICAgICAgICAgICAgICAgICAgICAgICAvPn0gbGFiZWw9XCJNdWx0aS1kb2N0b3IgY2xpbmljXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgPC9SYWRpb0dyb3VwPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdWJGaWx0ZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwic3ViSGVhZGluZ1wiPkdlbmRlcjwvcD5cbiAgICAgICAgICAgICAgICAgICAgPFJhZGlvR3JvdXBcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyaWEtbGFiZWw9XCJnZW5kZXJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZT1cImdlbmRlcjJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3RoaXMuc3RhdGUuZ2VuZGVyfVxuICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuaGFuZGxlQ2hhbmdlUmFkaW8uYmluZCh0aGlzLCAnZ2VuZGVyJyl9XG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxGb3JtQ29udHJvbExhYmVsIHZhbHVlPVwiYW55XCIgY29udHJvbD17PFJhZGlvIGNvbG9yPVwicHJpbWFyeVwiIC8+fSBsYWJlbD1cIkFueVwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8Rm9ybUNvbnRyb2xMYWJlbCB2YWx1ZT1cIm1hbGVcIiBjb250cm9sPXs8UmFkaW8gY29sb3I9XCJwcmltYXJ5XCIgLz59IGxhYmVsPVwiTWFsZVwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8Rm9ybUNvbnRyb2xMYWJlbCB2YWx1ZT1cImZlbWFsZVwiIGNvbnRyb2w9ezxSYWRpbyBjb2xvcj1cInByaW1hcnlcIiAvPn0gbGFiZWw9XCJGZW1hbGVcIiAvPlxuXG4gICAgICAgICAgICAgICAgICAgIDwvUmFkaW9Hcm91cD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3ViRmlsdGVyXCI+XG4gICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInN1YkhlYWRpbmdcIj5BdmFpbGFiaWxpdHk8L3A+XG4gICAgICAgICAgICAgICAgICAgIDxSYWRpb0dyb3VwXG4gICAgICAgICAgICAgICAgICAgICAgICBhcmlhLWxhYmVsPVwiYXZhaWxhYmlsaXR5XCJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU9XCJhdmFpbGFiaWxpdHlcIlxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICA8Rm9ybUNvbnRyb2xMYWJlbCBjb250cm9sPXs8Q2hlY2tib3hcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGVja2VkPXt0aGlzLnN0YXRlLmF2YWlsYWJsZV90b2RheX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5oYW5kbGVDaGVja2JveC5iaW5kKHRoaXMsICdhdmFpbGFibGVfdG9kYXknKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8+fSBsYWJlbD1cIkF2aWFsYWJsZSBUb2RheVwiIC8+bGFiZWw9XCJNdWx0aS1kb2N0b3IgY2xpbmljXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgPC9SYWRpb0dyb3VwPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJhcHBseUZpbHRlclwiIG9uQ2xpY2s9e3RoaXMuYXBwbHlGaWx0ZXIuYmluZCh0aGlzKX0+QXBwbHk8L2J1dHRvbj5cblxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IHdpdGhSb3V0ZXIoU2VhcmNoUmVzdWx0c0ZpbHRlcilcbiIsImltcG9ydCBTZWFyY2hSZXN1bHRzRmlsdGVyIGZyb20gJy4vU2VhcmNoUmVzdWx0c0ZpbHRlci5qcydcblxuZXhwb3J0IGRlZmF1bHQgU2VhcmNoUmVzdWx0c0ZpbHRlciIsImV4cG9ydCBjb25zdCBBUFBFTkRfRE9DVE9SUyA9ICdBUFBFTkRfRE9DVE9SUyc7XG5leHBvcnQgY29uc3QgRE9DVE9SX1NFQVJDSCA9ICdET0NUT1JfU0VBUkNIJztcbmV4cG9ydCBjb25zdCBTRUxFQ1RfRE9DVE9SID0gJ1NFTEVDVF9ET0NUT1InO1xuXG5leHBvcnQgY29uc3QgVE9HR0xFX0NPTkRJVElPTlMgPSAnVE9HR0xFX0NPTkRJVElPTlMnO1xuZXhwb3J0IGNvbnN0IFRPR0dMRV9TUEVDSUFMSVRJRVMgPSAnVE9HR0xFX1NQRUNJQUxJVElFUyc7XG5leHBvcnQgY29uc3QgVE9HR0xFX1RFU1RTID0gJ1RPR0dMRV9URVNUUyc7XG5leHBvcnQgY29uc3QgU0VMRUNUX0xPQ0FUSU9OID0gJ1NFTEVDVF9MT0NBVElPTic7XG5leHBvcnQgY29uc3QgTUVSR0VfU0VBUkNIX1NUQVRFX09QRCA9ICdNRVJHRV9TRUFSQ0hfU1RBVEVfT1BEJztcbmV4cG9ydCBjb25zdCBUT0dHTEVfQ1JJVEVSSUEgPSAnVE9HR0xFX0NSSVRFUklBJztcbmV4cG9ydCBjb25zdCBUT0dHTEVfRElBR05PU0lTX0NSSVRFUklBID0gJ1RPR0dMRV9ESUFHTk9TSVNfQ1JJVEVSSUEnO1xuZXhwb3J0IGNvbnN0IFNFVF9PUERfRklMVEVSUyA9ICdTRVRfT1BEX0ZJTFRFUlMnXG5leHBvcnQgY29uc3QgU0VUX0xBQlNfRklMVEVSUyA9ICdTRVRfTEFCU19GSUxURVJTJ1xuZXhwb3J0IGNvbnN0IExPQURfU0VBUkNIX0NSSVRFUklBX09QRCA9ICdMT0FEX1NFQVJDSF9DUklURVJJQV9PUEQnXG5cbmV4cG9ydCBjb25zdCBNRVJHRV9TRUFSQ0hfU1RBVEVfTEFCID0gJ01FUkdFX1NFQVJDSF9TVEFURV9MQUInO1xuZXhwb3J0IGNvbnN0IExPQURfU0VBUkNIX0NSSVRFUklBX0xBQiA9ICdMT0FEX1NFQVJDSF9DUklURVJJQV9PUEQnXG5leHBvcnQgY29uc3QgQVBQRU5EX0xBQlMgPSAnQVBQRU5EX0xBQlMnO1xuZXhwb3J0IGNvbnN0IExBQl9TRUFSQ0ggPSAnTEFCX1NFQVJDSCc7XG5leHBvcnQgY29uc3QgU0VMRUNUX0xPQ0FUSU9OX0RJQUdOT1NJUyA9ICdTRUxFQ1RfTE9DQVRJT05fRElBR05PU0lTJztcbmV4cG9ydCBjb25zdCBBUFBFTkRfRklMVEVSU19ESUFHTk9TSVMgPSAnQVBQRU5EX0ZJTFRFUlNfRElBR05PU0lTJztcbmV4cG9ydCBjb25zdCBMQUJfU0VBUkNIX1NUQVJUID0gJ0xBQl9TRUFSQ0hfU1RBUlQnO1xuXG5cbmV4cG9ydCBjb25zdCBBUFBFTkRfVVNFUl9QUk9GSUxFUyA9ICdBUFBFTkRfVVNFUl9QUk9GSUxFUyc7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcblxuaW1wb3J0IHsgfSBmcm9tICcuLi8uLi9hY3Rpb25zL2luZGV4LmpzJ1xuXG5pbXBvcnQgQ2hhdFZpZXcgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9jb21tb25zL2NoYXQvaW5kZXguanMnXG5cblxuY2xhc3MgQ2hhdCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8Q2hhdFZpZXcgey4uLnRoaXMucHJvcHN9IC8+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoc3RhdGUpID0+IHtcbiAgICBjb25zdCBVU0VSID0gc3RhdGUuVVNFUlxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgVVNFUlxuICAgIH1cbn1cblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gKGRpc3BhdGNoKSA9PiB7XG4gICAgcmV0dXJuIHtcblxuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbWFwRGlzcGF0Y2hUb1Byb3BzKShDaGF0KTtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG5pbXBvcnQgeyBnZXRVc2VyUHJvZmlsZVdpdGhBcHBvaW50bWVudHMgfSBmcm9tICcuLi8uLi9hY3Rpb25zL2luZGV4LmpzJ1xuXG5pbXBvcnQgVXNlckFwcG9pbnRtZW50c1ZpZXcgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9jb21tb25zL3VzZXJBcHBvaW50bWVudHMvaW5kZXguanMnXG5cblxuY2xhc3MgVXNlckFwcG9pbnRtZW50cyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8VXNlckFwcG9pbnRtZW50c1ZpZXcgey4uLnRoaXMucHJvcHN9IC8+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoc3RhdGUpID0+IHtcbiAgICBjb25zdCBVU0VSID0gc3RhdGUuVVNFUlxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgVVNFUlxuICAgIH1cbn1cblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gKGRpc3BhdGNoKSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgZ2V0VXNlclByb2ZpbGVXaXRoQXBwb2ludG1lbnRzIDogKCkgPT4gZGlzcGF0Y2goZ2V0VXNlclByb2ZpbGVXaXRoQXBwb2ludG1lbnRzKCkpXG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpKFVzZXJBcHBvaW50bWVudHMpO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cbmltcG9ydCB7IGdldFVzZXJQcm9maWxlIH0gZnJvbSAnLi4vLi4vYWN0aW9ucy9pbmRleC5qcydcblxuaW1wb3J0IFVzZXJQcm9maWxlVmlldyBmcm9tICcuLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvdXNlclByb2ZpbGUvaW5kZXguanMnXG5cblxuY2xhc3MgVXNlclByb2ZpbGUgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPFVzZXJQcm9maWxlVmlldyB7Li4udGhpcy5wcm9wc30gLz5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9IChzdGF0ZSkgPT4ge1xuICAgIGNvbnN0IFVTRVIgPSBzdGF0ZS5VU0VSXG5cbiAgICByZXR1cm4ge1xuICAgICAgICBVU0VSXG4gICAgfVxufVxuXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSAoZGlzcGF0Y2gpID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgICBnZXRVc2VyUHJvZmlsZSA6ICgpID0+IGRpc3BhdGNoKGdldFVzZXJQcm9maWxlKCkpXG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpKFVzZXJQcm9maWxlKTtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG5pbXBvcnQgeyBnZXRVc2VyUHJvZmlsZVdpdGhUZXN0cyB9IGZyb20gJy4uLy4uL2FjdGlvbnMvaW5kZXguanMnXG5cbmltcG9ydCBVc2VyUmVwb3J0c1ZpZXcgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9jb21tb25zL3VzZXJSZXBvcnRzL2luZGV4LmpzJ1xuXG5cbmNsYXNzIFVzZXJSZXBvcnRzIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxVc2VyUmVwb3J0c1ZpZXcgey4uLnRoaXMucHJvcHN9IC8+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoc3RhdGUpID0+IHtcbiAgICBjb25zdCBVU0VSID0gc3RhdGUuVVNFUlxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgVVNFUlxuICAgIH1cbn1cblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gKGRpc3BhdGNoKSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgZ2V0VXNlclByb2ZpbGVXaXRoVGVzdHMgOiAoKSA9PiBkaXNwYXRjaChnZXRVc2VyUHJvZmlsZVdpdGhUZXN0cygpKVxuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbWFwRGlzcGF0Y2hUb1Byb3BzKShVc2VyUmVwb3J0cyk7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcblxuaW1wb3J0IHsgZ2V0TGFiQm9va2luZ1N1bW1hcnkgfSBmcm9tICcuLi8uLi9hY3Rpb25zL2luZGV4LmpzJ1xuXG5pbXBvcnQgQm9va2luZ1N1bW1hcnlWaWV3IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvZGlhZ25vc2lzL2Jvb2tpbmdTdW1tYXJ5L2luZGV4LmpzJ1xuXG5jbGFzcyBCb29raW5nU3VtbWFyeSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8Qm9va2luZ1N1bW1hcnlWaWV3IHsuLi50aGlzLnByb3BzfSAvPlxuICAgICAgICApO1xuICAgIH1cbn1cblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHN0YXRlKSA9PiB7XG5cbiAgICByZXR1cm4ge1xuXG4gICAgfVxufVxuXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSAoZGlzcGF0Y2gpID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgICBnZXRMYWJCb29raW5nU3VtbWFyeSA6IChib29raW5nSWQsIGNhbGxiYWNrKSA9PiBkaXNwYXRjaChnZXRMYWJCb29raW5nU3VtbWFyeShib29raW5nSWQsIGNhbGxiYWNrKSlcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG1hcERpc3BhdGNoVG9Qcm9wcykoQm9va2luZ1N1bW1hcnkpO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cbmltcG9ydCB7IGdldExhYkJ5SWQgfSBmcm9tICcuLi8uLi9hY3Rpb25zL2luZGV4LmpzJ1xuXG5pbXBvcnQgTGFiVmlldyBmcm9tICcuLi8uLi9jb21wb25lbnRzL2RpYWdub3Npcy9sYWIvaW5kZXguanMnXG5cbmNsYXNzIExhYiBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgfVxuXG4gICAgc3RhdGljIGNvbnRleHRUeXBlcyA9IHtcbiAgICAgICAgcm91dGVyOiAoKSA9PiBudWxsXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8TGFiVmlldyB7Li4udGhpcy5wcm9wc30gLz5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9IChzdGF0ZSkgPT4ge1xuXG4gICAgY29uc3Qge1xuICAgICAgICBzZWxlY3RlZExvY2F0aW9uLFxuICAgICAgICBzZWxlY3RlZENyaXRlcmlhcyxcbiAgICAgICAgZmlsdGVyQ3JpdGVyaWEsXG4gICAgICAgIExPQURFRF9TRUFSQ0hfQ1JJVEVSSUFfTEFCXG4gICAgfSA9IHN0YXRlLlNFQVJDSF9DUklURVJJQV9MQUJTXG5cbiAgICBsZXQgTEFCUyA9IHN0YXRlLkxBQlNcblxuICAgIHJldHVybiB7XG4gICAgICAgIHNlbGVjdGVkQ3JpdGVyaWFzLFxuICAgICAgICBMQUJTXG4gICAgfVxufVxuXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSAoZGlzcGF0Y2gpID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgICBnZXRMYWJCeUlkOiAobGFiSWQpID0+IGRpc3BhdGNoKGdldExhYkJ5SWQobGFiSWQpKVxuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbWFwRGlzcGF0Y2hUb1Byb3BzKShMYWIpO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cbmltcG9ydCB7IGdldExhYkJ5SWQgfSBmcm9tICcuLi8uLi9hY3Rpb25zL2luZGV4LmpzJ1xuXG5pbXBvcnQgUGF0aWVudERldGFpbHNWaWV3IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvZGlhZ25vc2lzL3BhdGllbnREZXRhaWxzL2luZGV4LmpzJ1xuXG5jbGFzcyBQYXRpZW50RGV0YWlscyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8UGF0aWVudERldGFpbHNWaWV3IHsuLi50aGlzLnByb3BzfSAvPlxuICAgICAgICApO1xuICAgIH1cbn1cblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHN0YXRlKSA9PiB7XG5cbiAgICBsZXQgTEFCUyA9IHN0YXRlLkxBQlNcblxuICAgIHJldHVybiB7XG4gICAgICAgIExBQlNcbiAgICB9XG59XG5cbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IChkaXNwYXRjaCkgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICAgIGdldExhYkJ5SWQgOiAobGFiSWQsIHRlc3RJZHMpID0+IGRpc3BhdGNoKGdldExhYkJ5SWQobGFiSWQsIHRlc3RJZHMpKVxuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbWFwRGlzcGF0Y2hUb1Byb3BzKShQYXRpZW50RGV0YWlscyk7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcblxuaW1wb3J0IHsgbG9hZExhYkNvbW1vbkNyaXRlcmlhcywgdG9nZ2xlRGlhZ25vc2lzQ3JpdGVyaWEsIGdldERpYWdub3Npc0NyaXRlcmlhUmVzdWx0cyB9IGZyb20gJy4uLy4uL2FjdGlvbnMvaW5kZXguanMnXG5pbXBvcnQgU2VhcmNoQ3JpdGVyaWFWaWV3IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvZGlhZ25vc2lzL3NlYXJjaENyaXRlcmlhL2luZGV4LmpzJ1xuXG5jbGFzcyBTZWFyY2hDcml0ZXJpYSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIHRoaXMucHJvcHMubG9hZExhYkNvbW1vbkNyaXRlcmlhcygpXG4gICAgfVxuXG4gICAgc3RhdGljIGNvbnRleHRUeXBlcyA9IHtcbiAgICAgICAgcm91dGVyOiAoKSA9PiBudWxsXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPFNlYXJjaENyaXRlcmlhVmlldyB7Li4udGhpcy5wcm9wc30gLz5cbiAgICAgICAgKVxuICAgIH1cbn1cblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHN0YXRlKSA9PiB7XG5cbiAgICBjb25zdCB7XG4gICAgICAgIExPQURFRF9TRUFSQ0hfQ1JJVEVSSUFfTEFCLFxuICAgICAgICBjb21tb25fdGVzdHMsXG4gICAgICAgIGNvbW1vbl9jb25kaXRpb25zLFxuICAgICAgICBwcmVmZXJyZWRfbGFicyxcbiAgICAgICAgc2VsZWN0ZWRDcml0ZXJpYXMsXG4gICAgICAgIHNlbGVjdGVkTG9jYXRpb24sXG4gICAgICAgIGZpbHRlckNyaXRlcmlhXG4gICAgfSA9IHN0YXRlLlNFQVJDSF9DUklURVJJQV9MQUJTXG5cbiAgICByZXR1cm4ge1xuICAgICAgICBMT0FERURfU0VBUkNIX0NSSVRFUklBX0xBQixcbiAgICAgICAgY29tbW9uX3Rlc3RzLFxuICAgICAgICBjb21tb25fY29uZGl0aW9ucyxcbiAgICAgICAgcHJlZmVycmVkX2xhYnMsXG4gICAgICAgIHNlbGVjdGVkQ3JpdGVyaWFzLFxuICAgICAgICBzZWxlY3RlZExvY2F0aW9uLFxuICAgICAgICBmaWx0ZXJDcml0ZXJpYVxuICAgIH1cbn1cblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gKGRpc3BhdGNoKSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgbG9hZExhYkNvbW1vbkNyaXRlcmlhczogKCkgPT4gZGlzcGF0Y2gobG9hZExhYkNvbW1vbkNyaXRlcmlhcygpKSxcbiAgICAgICAgdG9nZ2xlRGlhZ25vc2lzQ3JpdGVyaWE6ICh0eXBlLCBjcml0ZXJpYSkgPT4gZGlzcGF0Y2godG9nZ2xlRGlhZ25vc2lzQ3JpdGVyaWEodHlwZSwgY3JpdGVyaWEpKSxcbiAgICAgICAgZ2V0RGlhZ25vc2lzQ3JpdGVyaWFSZXN1bHRzOiAoc2VhcmNoU3RyaW5nLCBjYWxsYmFjaykgPT4gZGlzcGF0Y2goZ2V0RGlhZ25vc2lzQ3JpdGVyaWFSZXN1bHRzKHNlYXJjaFN0cmluZywgY2FsbGJhY2spKVxuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbWFwRGlzcGF0Y2hUb1Byb3BzKShTZWFyY2hDcml0ZXJpYSk7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcblxuaW1wb3J0IHsgZ2V0TGFicywgdG9nZ2xlRGlhZ25vc2lzQ3JpdGVyaWEsIGdldERpYWdub3Npc0NyaXRlcmlhUmVzdWx0cyB9IGZyb20gJy4uLy4uL2FjdGlvbnMvaW5kZXguanMnXG5cbmltcG9ydCBTZWFyY2hSZXN1bHRzVmlldyBmcm9tICcuLi8uLi9jb21wb25lbnRzL2RpYWdub3Npcy9zZWFyY2hSZXN1bHRzL2luZGV4LmpzJ1xuXG5jbGFzcyBTZWFyY2hSZXN1bHRzIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcblxuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICBzdGF0aWMgY29udGV4dFR5cGVzID0ge1xuICAgICAgICByb3V0ZXI6ICgpID0+IG51bGxcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxTZWFyY2hSZXN1bHRzVmlldyB7Li4udGhpcy5wcm9wc30gLz5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9IChzdGF0ZSkgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgICAgc2VsZWN0ZWRMb2NhdGlvbixcbiAgICAgICAgc2VsZWN0ZWRDcml0ZXJpYXMsXG4gICAgICAgIGZpbHRlckNyaXRlcmlhLFxuICAgICAgICBMT0FERURfU0VBUkNIX0NSSVRFUklBX0xBQlxuICAgIH0gPSBzdGF0ZS5TRUFSQ0hfQ1JJVEVSSUFfTEFCU1xuXG4gICAgY29uc3QgTEFCUyA9IHN0YXRlLkxBQlNcbiAgICBjb25zdCB7IGxhYkxpc3QsIExPQURFRF9MQUJTX1NFQVJDSCB9ID0gc3RhdGUuTEFCX1NFQVJDSFxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgc2VsZWN0ZWRMb2NhdGlvbixcbiAgICAgICAgc2VsZWN0ZWRDcml0ZXJpYXMsXG4gICAgICAgIGZpbHRlckNyaXRlcmlhLFxuICAgICAgICBMT0FERURfU0VBUkNIX0NSSVRFUklBX0xBQixcbiAgICAgICAgTEFCUyxcbiAgICAgICAgbGFiTGlzdCwgTE9BREVEX0xBQlNfU0VBUkNIXG4gICAgfVxuXG59XG5cbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IChkaXNwYXRjaCkgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICAgIGdldExhYnM6IChzZWFyY2hTdGF0ZSwgZmlsdGVyQ3JpdGVyaWEsIG1lcmdlU3RhdGUpID0+IGRpc3BhdGNoKGdldExhYnMoc2VhcmNoU3RhdGUsIGZpbHRlckNyaXRlcmlhLCBtZXJnZVN0YXRlKSksXG4gICAgICAgIHRvZ2dsZURpYWdub3Npc0NyaXRlcmlhOiAodHlwZSwgY3JpdGVyaWEpID0+IGRpc3BhdGNoKHRvZ2dsZURpYWdub3Npc0NyaXRlcmlhKHR5cGUsIGNyaXRlcmlhKSksXG4gICAgICAgIGdldERpYWdub3Npc0NyaXRlcmlhUmVzdWx0czogKHNlYXJjaFN0cmluZywgY2FsbGJhY2spID0+IGRpc3BhdGNoKGdldERpYWdub3Npc0NyaXRlcmlhUmVzdWx0cyhzZWFyY2hTdHJpbmcsIGNhbGxiYWNrKSlcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpKFNlYXJjaFJlc3VsdHMpO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cbmltcG9ydCB7IGdldExhYkJ5SWQsIHRvZ2dsZURpYWdub3Npc0NyaXRlcmlhIH0gZnJvbSAnLi4vLi4vYWN0aW9ucy9pbmRleC5qcydcblxuaW1wb3J0IFRlc3RTZWxlY3RvclZpZXcgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9kaWFnbm9zaXMvdGVzdFNlbGVjdG9yJ1xuXG5jbGFzcyBUZXN0U2VsZWN0b3IgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgIH1cblxuICAgIHN0YXRpYyBjb250ZXh0VHlwZXMgPSB7XG4gICAgICAgIHJvdXRlcjogKCkgPT4gbnVsbFxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPFRlc3RTZWxlY3RvclZpZXcgey4uLnRoaXMucHJvcHN9IC8+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoc3RhdGUpID0+IHtcblxuICAgIGNvbnN0IHtcbiAgICAgICAgc2VsZWN0ZWRMb2NhdGlvbixcbiAgICAgICAgc2VsZWN0ZWRDcml0ZXJpYXMsXG4gICAgICAgIGZpbHRlckNyaXRlcmlhLFxuICAgICAgICBMT0FERURfU0VBUkNIX0NSSVRFUklBX0xBQlxuICAgIH0gPSBzdGF0ZS5TRUFSQ0hfQ1JJVEVSSUFfTEFCU1xuXG4gICAgbGV0IExBQlMgPSBzdGF0ZS5MQUJTXG5cbiAgICByZXR1cm4ge1xuICAgICAgICBzZWxlY3RlZENyaXRlcmlhcyxcbiAgICAgICAgTEFCU1xuICAgIH1cbn1cblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gKGRpc3BhdGNoKSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdG9nZ2xlRGlhZ25vc2lzQ3JpdGVyaWE6ICh0eXBlLCBjcml0ZXJpYSkgPT4gZGlzcGF0Y2godG9nZ2xlRGlhZ25vc2lzQ3JpdGVyaWEodHlwZSwgY3JpdGVyaWEpKSxcbiAgICAgICAgZ2V0TGFiQnlJZDogKGxhYklkKSA9PiBkaXNwYXRjaChnZXRMYWJCeUlkKGxhYklkKSlcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG1hcERpc3BhdGNoVG9Qcm9wcykoVGVzdFNlbGVjdG9yKTtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG5pbXBvcnQgeyBnZXREb2N0b3JCeUlkLCBnZXRUaW1lU2xvdHMgfSBmcm9tICcuLi8uLi9hY3Rpb25zL2luZGV4LmpzJ1xuXG5pbXBvcnQgQXBwb2ludG1lbnRTbG90VmlldyBmcm9tICcuLi8uLi9jb21wb25lbnRzL29wZC9hcHBvaW50bWVudFNsb3QvaW5kZXguanMnXG5cbmNsYXNzIEFwcG9pbnRtZW50U2xvdCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8QXBwb2ludG1lbnRTbG90VmlldyB7Li4udGhpcy5wcm9wc30gLz5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9IChzdGF0ZSkgPT4ge1xuXG4gICAgbGV0IERPQ1RPUlMgPSBzdGF0ZS5ET0NUT1JTXG5cbiAgICByZXR1cm4ge1xuICAgICAgICBET0NUT1JTXG4gICAgfVxufVxuXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSAoZGlzcGF0Y2gpID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgICBnZXREb2N0b3JCeUlkIDogKGRvY3RvcklkKSA9PiBkaXNwYXRjaChnZXREb2N0b3JCeUlkKGRvY3RvcklkKSksXG4gICAgICAgIGdldFRpbWVTbG90cyA6IChkb2N0b3JJZCwgY2xpbmljSWQsIGNhbGxiYWNrKSA9PiBkaXNwYXRjaChnZXRUaW1lU2xvdHMoZG9jdG9ySWQsIGNsaW5pY0lkLCBjYWxsYmFjaykpXG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpKEFwcG9pbnRtZW50U2xvdCk7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcblxuaW1wb3J0IHsgfSBmcm9tICcuLi8uLi9hY3Rpb25zL2luZGV4LmpzJ1xuXG5pbXBvcnQgQm9va2luZ1ZpZXcgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9vcGQvYm9va2luZy9Cb29raW5nVmlldy5qcydcblxuY2xhc3MgQm9va2luZyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8Qm9va2luZ1ZpZXcgey4uLnRoaXMucHJvcHN9IC8+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoc3RhdGUpID0+IHtcblxuICAgIHJldHVybiB7XG5cbiAgICB9XG59XG5cbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IChkaXNwYXRjaCkgPT4ge1xuICAgIHJldHVybiB7XG5cbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG1hcERpc3BhdGNoVG9Qcm9wcykoQm9va2luZyk7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcblxuaW1wb3J0IHsgZ2V0RG9jdG9yQnlJZCB9IGZyb20gJy4uLy4uL2FjdGlvbnMvaW5kZXguanMnXG5cbmltcG9ydCBDbGluaWNMaXN0VmlldyBmcm9tICcuLi8uLi9jb21wb25lbnRzL29wZC9jbGluaWNMaXN0L2luZGV4LmpzJ1xuXG5jbGFzcyBDbGluaWNMaXN0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxDbGluaWNMaXN0VmlldyB7Li4udGhpcy5wcm9wc30gLz5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9IChzdGF0ZSkgPT4ge1xuXG4gICAgbGV0IERPQ1RPUlMgPSBzdGF0ZS5ET0NUT1JTXG5cbiAgICByZXR1cm4ge1xuICAgICAgICBET0NUT1JTXG4gICAgfVxufVxuXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSAoZGlzcGF0Y2gpID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgICBnZXREb2N0b3JCeUlkIDogKGRvY3RvcklkKSA9PiBkaXNwYXRjaChnZXREb2N0b3JCeUlkKGRvY3RvcklkKSlcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG1hcERpc3BhdGNoVG9Qcm9wcykoQ2xpbmljTGlzdCk7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcblxuaW1wb3J0IHsgZ2V0Q3JpdGVyaWFSZXN1bHRzLCB0b2dnbGVDcml0ZXJpYSB9IGZyb20gJy4uLy4uL2FjdGlvbnMvaW5kZXguanMnXG5pbXBvcnQgQ3JpdGVyaWFTZWFyY2hWaWV3IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvb3BkL2NyaXRlcmlhU2VhcmNoL2luZGV4LmpzJ1xuXG5jbGFzcyBDcml0ZXJpYVNlYXJjaCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8Q3JpdGVyaWFTZWFyY2hWaWV3XG4gICAgICAgICAgICAgICAgeyAuLi50aGlzLnByb3BzIH1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoc3RhdGUpID0+IHtcblxuICAgIHJldHVybiB7XG5cbiAgICB9XG59XG5cbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IChkaXNwYXRjaCkgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICAgIGdldENyaXRlcmlhUmVzdWx0cyA6IChzZWFyY2hTdHJpbmcsY2IpID0+IGRpc3BhdGNoKGdldENyaXRlcmlhUmVzdWx0cyhzZWFyY2hTdHJpbmcsY2IpKSxcbiAgICAgICAgdG9nZ2xlQ3JpdGVyaWEgOiAoY3JpdGVyaWEpID0+IGRpc3BhdGNoKHRvZ2dsZUNyaXRlcmlhKGNyaXRlcmlhKSlcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG1hcERpc3BhdGNoVG9Qcm9wcykoQ3JpdGVyaWFTZWFyY2gpO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cbmltcG9ydCB7IGdldERvY3RvckJ5SWQgfSBmcm9tICcuLi8uLi9hY3Rpb25zL2luZGV4LmpzJ1xuXG5pbXBvcnQgRG9jdG9yUHJvZmlsZVZpZXcgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9vcGQvZG9jdG9yUHJvZmlsZS9pbmRleC5qcydcblxuY2xhc3MgRG9jdG9yUHJvZmlsZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8RG9jdG9yUHJvZmlsZVZpZXcgey4uLnRoaXMucHJvcHN9IC8+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoc3RhdGUpID0+IHtcblxuICAgIGxldCBET0NUT1JTID0gc3RhdGUuRE9DVE9SU1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgRE9DVE9SU1xuICAgIH1cbn1cblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gKGRpc3BhdGNoKSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgZ2V0RG9jdG9yQnlJZCA6IChkb2N0b3JJZCkgPT4gZGlzcGF0Y2goZ2V0RG9jdG9yQnlJZChkb2N0b3JJZCkpXG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpKERvY3RvclByb2ZpbGUpO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cbmltcG9ydCB7IHNlbGVjdExvY2F0aW9uIH0gZnJvbSAnLi4vLi4vYWN0aW9ucy9pbmRleC5qcydcbmltcG9ydCBMb2NhdGlvblNlYXJjaFZpZXcgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9vcGQvbG9jYXRpb25TZWFyY2gvaW5kZXguanMnXG5cbmNsYXNzIExvY2F0aW9uU2VhcmNoIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICB9XG5cbiAgICBzdGF0aWMgY29udGV4dFR5cGVzID0ge1xuICAgICAgICByb3V0ZXI6ICgpID0+IG51bGxcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxMb2NhdGlvblNlYXJjaFZpZXcgey4uLnRoaXMucHJvcHN9IC8+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoc3RhdGUpID0+IHtcbiAgICBjb25zdCB7XG4gICAgICAgIHNlbGVjdGVkTG9jYXRpb25cbiAgICB9ID0gc3RhdGUuU0VBUkNIX0NSSVRFUklBX09QRFxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgc2VsZWN0ZWRMb2NhdGlvblxuICAgIH1cbn1cblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gKGRpc3BhdGNoKSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgc2VsZWN0TG9jYXRpb246IChsb2NhdGlvbikgPT4gZGlzcGF0Y2goc2VsZWN0TG9jYXRpb24obG9jYXRpb24pKVxuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbWFwRGlzcGF0Y2hUb1Byb3BzKShMb2NhdGlvblNlYXJjaCk7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcblxuaW1wb3J0IHsgZ2V0RG9jdG9yQnlJZCB9IGZyb20gJy4uLy4uL2FjdGlvbnMvaW5kZXguanMnXG5cbmltcG9ydCBQYXRpZW50RGV0YWlsc1ZpZXcgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9vcGQvcGF0aWVudERldGFpbHMvaW5kZXguanMnXG5cbmNsYXNzIFBhdGllbnREZXRhaWxzIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxQYXRpZW50RGV0YWlsc1ZpZXcgey4uLnRoaXMucHJvcHN9IC8+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoc3RhdGUpID0+IHtcblxuICAgIGxldCBET0NUT1JTID0gc3RhdGUuRE9DVE9SU1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgRE9DVE9SU1xuICAgIH1cbn1cblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gKGRpc3BhdGNoKSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgZ2V0RG9jdG9yQnlJZCA6IChkb2N0b3JJZCkgPT4gZGlzcGF0Y2goZ2V0RG9jdG9yQnlJZChkb2N0b3JJZCkpXG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpKFBhdGllbnREZXRhaWxzKTtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG5pbXBvcnQgeyB9IGZyb20gJy4uLy4uL2FjdGlvbnMvaW5kZXguanMnXG5cbmltcG9ydCBQYXltZW50VmlldyBmcm9tICcuLi8uLi9jb21wb25lbnRzL29wZC9wYXltZW50L1BheW1lbnRWaWV3LmpzJ1xuXG5jbGFzcyBQYXltZW50IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxQYXltZW50VmlldyB7Li4udGhpcy5wcm9wc30gLz5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9IChzdGF0ZSkgPT4ge1xuXG4gICAgcmV0dXJuIHtcblxuICAgIH1cbn1cblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gKGRpc3BhdGNoKSA9PiB7XG4gICAgcmV0dXJuIHtcblxuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbWFwRGlzcGF0Y2hUb1Byb3BzKShQYXltZW50KTtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG5pbXBvcnQgeyB0b2dnbGVDb25kaXRpb24sIHRvZ2dsZVNwZWNpYWxpdHksIHRvZ2dsZUNyaXRlcmlhLCBsb2FkU2VhcmNoQ3JpdGVyaWEgfSBmcm9tICcuLi8uLi9hY3Rpb25zL2luZGV4LmpzJ1xuaW1wb3J0IFNlYXJjaENyaXRlcmlhVmlldyBmcm9tICcuLi8uLi9jb21wb25lbnRzL29wZC9zZWFyY2hDcml0ZXJpYS9pbmRleC5qcydcblxuY2xhc3MgU2VhcmNoQ3JpdGVyaWEgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgIH1cblxuICAgIHN0YXRpYyBjb250ZXh0VHlwZXMgPSB7XG4gICAgICAgIHJvdXRlcjogKCkgPT4gbnVsbFxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPFNlYXJjaENyaXRlcmlhVmlldyB7Li4udGhpcy5wcm9wc30gLz5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9IChzdGF0ZSkgPT4ge1xuXG4gICAgY29uc3Qge1xuICAgICAgICBjb21tb25seVNlYXJjaGVkQ29uZGl0aW9ucyxcbiAgICAgICAgc2VsZWN0ZWRDb25kaXRpb25zLFxuICAgICAgICBjb21tb25seVNlYXJjaGVkU3BlY2lhbGl0aWVzLFxuICAgICAgICBzZWxlY3RlZFNwZWNpYWxpdGllcyxcbiAgICAgICAgc2VsZWN0ZWRMb2NhdGlvbixcbiAgICAgICAgc2VsZWN0ZWRDcml0ZXJpYVxuICAgIH0gPSBzdGF0ZS5TRUFSQ0hfQ1JJVEVSSUFfT1BEXG5cbiAgICByZXR1cm4ge1xuICAgICAgICBjb21tb25seVNlYXJjaGVkQ29uZGl0aW9ucyxcbiAgICAgICAgc2VsZWN0ZWRDb25kaXRpb25zLFxuICAgICAgICBjb21tb25seVNlYXJjaGVkU3BlY2lhbGl0aWVzLFxuICAgICAgICBzZWxlY3RlZFNwZWNpYWxpdGllcyxcbiAgICAgICAgc2VsZWN0ZWRMb2NhdGlvbixcbiAgICAgICAgc2VsZWN0ZWRDcml0ZXJpYVxuICAgIH1cbn1cblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gKGRpc3BhdGNoKSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdG9nZ2xlQ29uZGl0aW9uOiAoaWQpID0+IGRpc3BhdGNoKHRvZ2dsZUNvbmRpdGlvbihpZCkpLFxuICAgICAgICB0b2dnbGVTcGVjaWFsaXR5OiAoaWQpID0+IGRpc3BhdGNoKHRvZ2dsZVNwZWNpYWxpdHkoaWQpKSxcbiAgICAgICAgdG9nZ2xlQ3JpdGVyaWEgOiAoY3JpdGVyaWEpID0+IGRpc3BhdGNoKHRvZ2dsZUNyaXRlcmlhKGNyaXRlcmlhKSksXG4gICAgICAgIGxvYWRTZWFyY2hDcml0ZXJpYTogKCkgPT4gZGlzcGF0Y2gobG9hZFNlYXJjaENyaXRlcmlhKCkpXG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpKFNlYXJjaENyaXRlcmlhKTtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG5pbXBvcnQgeyBnZXREb2N0b3JzIH0gZnJvbSAnLi4vLi4vYWN0aW9ucy9pbmRleC5qcydcblxuaW1wb3J0IFNlYXJjaFJlc3VsdHNWaWV3IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvb3BkL3NlYXJjaFJlc3VsdHMvaW5kZXguanMnXG5cbmNsYXNzIFNlYXJjaFJlc3VsdHMgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgICAgICB0aGlzLnN0YXRlID0ge1xuXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxTZWFyY2hSZXN1bHRzVmlldyB7IC4uLnRoaXMucHJvcHMgfSAvPlxuICAgICAgICApO1xuICAgIH1cbn1cblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHN0YXRlKSA9PiB7XG5cbiAgICBjb25zdCB7XG4gICAgICAgIHNlbGVjdGVkQ29uZGl0aW9ucyxcbiAgICAgICAgc2VsZWN0ZWRTcGVjaWFsaXRpZXMsXG4gICAgICAgIHNlbGVjdGVkTG9jYXRpb24sXG4gICAgICAgIHNlbGVjdGVkQ3JpdGVyaWEsXG4gICAgICAgIGZpbHRlckNyaXRlcmlhLFxuICAgICAgICBDUklURVJJQV9MT0FERURcbiAgICB9ID0gc3RhdGUuU0VBUkNIX0NSSVRFUklBX09QRFxuXG4gICAgbGV0IERPQ1RPUlMgPSBzdGF0ZS5ET0NUT1JTXG4gICAgbGV0IHsgZG9jdG9yTGlzdCwgTE9BRElORywgRVJST1IgfSA9IHN0YXRlLkRPQ1RPUl9TRUFSQ0hcblxuICAgIHJldHVybiB7XG4gICAgICAgIERPQ1RPUlMsIGRvY3Rvckxpc3QsIExPQURJTkcsIEVSUk9SLFxuICAgICAgICBzZWxlY3RlZENvbmRpdGlvbnMsXG4gICAgICAgIHNlbGVjdGVkU3BlY2lhbGl0aWVzLFxuICAgICAgICBzZWxlY3RlZExvY2F0aW9uLFxuICAgICAgICBzZWxlY3RlZENyaXRlcmlhLFxuICAgICAgICBmaWx0ZXJDcml0ZXJpYSxcbiAgICAgICAgQ1JJVEVSSUFfTE9BREVEXG4gICAgfVxufVxuXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSAoZGlzcGF0Y2gpID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgICBnZXREb2N0b3JzOiAoc2VhcmNoU3RhdGUsZmlsdGVyU3RhdGUsbWVyZ2VTdGF0ZSkgPT4gZGlzcGF0Y2goZ2V0RG9jdG9ycyhzZWFyY2hTdGF0ZSxmaWx0ZXJTdGF0ZSxtZXJnZVN0YXRlKSlcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpKFNlYXJjaFJlc3VsdHMpO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cbmltcG9ydCB7IHNldE9QREZpbHRlcnMgfSBmcm9tICcuLi8uLi9hY3Rpb25zL2luZGV4LmpzJ1xuXG5pbXBvcnQgU2VhcmNoUmVzdWx0c0ZpbHRlclZpZXcgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9vcGQvc2VhcmNoUmVzdWx0c0ZpbHRlci9pbmRleC5qcydcblxuY2xhc3MgU2VhcmNoUmVzdWx0c0ZpbHRlciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8U2VhcmNoUmVzdWx0c0ZpbHRlclZpZXcgey4uLnRoaXMucHJvcHN9Lz5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9IChzdGF0ZSkgPT4ge1xuXG4gICAgY29uc3Qge1xuICAgICAgICBmaWx0ZXJDcml0ZXJpYVxuICAgIH0gPSBzdGF0ZS5TRUFSQ0hfQ1JJVEVSSUFfT1BEXG5cbiAgICByZXR1cm4ge1xuICAgICAgICBmaWx0ZXJDcml0ZXJpYVxuICAgIH1cbn1cblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gKGRpc3BhdGNoKSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgc2V0T1BERmlsdGVycyA6IChmaWx0ZXJEYXRhKSA9PiBkaXNwYXRjaChzZXRPUERGaWx0ZXJzKGZpbHRlckRhdGEpKVxuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbWFwRGlzcGF0Y2hUb1Byb3BzKShTZWFyY2hSZXN1bHRzRmlsdGVyKTtcbiIsImltcG9ydCBOQVZJR0FURSBmcm9tICcuL25hdmlnYXRlJ1xuXG5leHBvcnQgZGVmYXVsdCBOQVZJR0FURSIsImNvbnN0IE5BVklHQVRFID0ge1xuICAgIG5hdmlnYXRlVG8gOiAod2hlcmUpID0+IHtcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSB3aGVyZVxuICAgIH0sXG5cbiAgICByZWZyZXNoQXBwb2ludG1lbnRTdGF0ZSA6IChwcm9wcykgPT4ge1xuICAgICAgICBsZXQgbm9BcHBvaW50bWVudEZvdW5kID0gcHJvcHMudXBjb21pbmcubGVuZ3RoID09IDAgJiYgcHJvcHMucHJldmlvdXMubGVuZ3RoID09IDBcbiAgICAgICAgXG4gICAgICAgIGlmKHByb3BzLmhpc3RvcnkuYWN0aW9uID09PSAnUFVTSCcgfHwgbm9BcHBvaW50bWVudEZvdW5kKXtcbiAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTkFWSUdBVEUiLCJpbXBvcnQgU1RPUkFHRSBmcm9tICcuL3N0b3JhZ2UnXG5cbmV4cG9ydCBkZWZhdWx0IFNUT1JBR0UiLCJpbXBvcnQgQ29va2llcyBmcm9tICd1bml2ZXJzYWwtY29va2llJztcbmNvbnN0IGNvb2tpZXMgPSBuZXcgQ29va2llcygpO1xuXG5jb25zdCBTVE9SQUdFID0ge1xuICAgIHNldEF1dGhUb2tlbjogKHRva2VuKSA9PiB7XG4gICAgICAgIGNvb2tpZXMuc2V0KCd0b2tlbicsIHRva2VuKVxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHRydWUpXG4gICAgfSxcbiAgICBnZXRBdXRoVG9rZW46ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShjb29raWVzLmdldCgndG9rZW4nKSlcbiAgICB9LFxuICAgIGNoZWNrQXV0aDogKCkgPT4ge1xuICAgICAgICByZXR1cm4gISFjb29raWVzLmdldCgndG9rZW4nKVxuICAgIH0sXG4gICAgZGVsZXRlQXV0aDogKCkgPT4ge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGNvb2tpZXMucmVtb3ZlKCd0b2tlbicpKVxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgU1RPUkFHRSIsImltcG9ydCB7IEFQUEVORF9VU0VSX1BST0ZJTEVTIH0gZnJvbSAnLi4vLi4vY29uc3RhbnRzL3R5cGVzJztcblxuY29uc3QgZGVmYXVsdFN0YXRlID0ge1xuICAgIHByb2ZpbGVzOiB7fVxufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoc3RhdGUgPSBkZWZhdWx0U3RhdGUsIGFjdGlvbikge1xuXG4gICAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgICAgICBjYXNlIEFQUEVORF9VU0VSX1BST0ZJTEVTOiB7XG4gICAgICAgICAgICBsZXQgbmV3U3RhdGUgPSB7XG4gICAgICAgICAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgICAgICAgICAgcHJvZmlsZXMgOiB7IC4uLnN0YXRlLnByb2ZpbGVzIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbmV3U3RhdGUucHJvZmlsZXMgPSBhY3Rpb24ucGF5bG9hZC5yZWR1Y2UoKHByb2ZpbGVNYXAsIHByb2ZpbGUpID0+IHtcbiAgICAgICAgICAgICAgICBwcm9maWxlTWFwW3Byb2ZpbGUucHJvZmlsZUlkXSA9IHByb2ZpbGVcbiAgICAgICAgICAgICAgICByZXR1cm4gcHJvZmlsZU1hcFxuICAgICAgICAgICAgfSwgbmV3U3RhdGUucHJvZmlsZXMpXG5cbiAgICAgICAgICAgIHJldHVybiBuZXdTdGF0ZVxuICAgICAgICB9XG5cbiAgICB9XG4gICAgcmV0dXJuIHN0YXRlXG59IiwiaW1wb3J0IHsgQVBQRU5EX0xBQlMgfSBmcm9tICcuLi8uLi9jb25zdGFudHMvdHlwZXMnO1xuXG5jb25zdCBkZWZhdWx0U3RhdGUgPSB7XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHN0YXRlID0gZGVmYXVsdFN0YXRlLCBhY3Rpb24pIHtcblxuICAgIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICAgICAgY2FzZSBBUFBFTkRfTEFCUzoge1xuICAgICAgICAgICAgbGV0IG5ld1N0YXRlID0geyAuLi5zdGF0ZSB9XG5cbiAgICAgICAgICAgIHJldHVybiBhY3Rpb24ucGF5bG9hZC5yZWR1Y2UoKGxhcE1hcCwgbGFiKSA9PiB7XG4gICAgICAgICAgICAgICAgbGFwTWFwW2xhYi5sYWIuaWRdID0gbGFiXG4gICAgICAgICAgICAgICAgcmV0dXJuIGxhcE1hcFxuICAgICAgICAgICAgfSxuZXdTdGF0ZSlcblxuICAgICAgICB9XG5cbiAgICB9XG4gICAgcmV0dXJuIHN0YXRlXG59IiwiaW1wb3J0IHsgTEFCX1NFQVJDSF9TVEFSVCwgTEFCX1NFQVJDSCB9IGZyb20gJy4uLy4uL2NvbnN0YW50cy90eXBlcyc7XG5cbmNvbnN0IGRlZmF1bHRTdGF0ZSA9IHtcbiAgICBsYWJMaXN0OiBbXSxcbiAgICBMT0FERURfTEFCU19TRUFSQ0g6IGZhbHNlXG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChzdGF0ZSA9IGRlZmF1bHRTdGF0ZSwgYWN0aW9uKSB7XG5cbiAgICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG5cbiAgICAgICAgY2FzZSBMQUJfU0VBUkNIX1NUQVJUOiB7XG4gICAgICAgICAgICBsZXQgbmV3U3RhdGUgPSB7IC4uLnN0YXRlIH1cblxuICAgICAgICAgICAgbmV3U3RhdGUuTE9BREVEX0xBQlNfU0VBUkNIID0gZmFsc2VcblxuICAgICAgICAgICAgcmV0dXJuIG5ld1N0YXRlXG4gICAgICAgIH1cblxuICAgICAgICBjYXNlIExBQl9TRUFSQ0g6IHtcbiAgICAgICAgICAgIGxldCBuZXdTdGF0ZSA9IHsgLi4uc3RhdGUgfVxuXG4gICAgICAgICAgICBuZXdTdGF0ZS5sYWJMaXN0ID0gYWN0aW9uLnBheWxvYWQubWFwKGxhYiA9PiBsYWIubGFiLmlkKVxuICAgICAgICAgICAgbmV3U3RhdGUuTE9BREVEX0xBQlNfU0VBUkNIID0gdHJ1ZVxuXG4gICAgICAgICAgICByZXR1cm4gbmV3U3RhdGVcbiAgICAgICAgfVxuXG4gICAgfVxuICAgIFxuICAgIHJldHVybiBzdGF0ZVxufSIsImltcG9ydCB7IEFQUEVORF9GSUxURVJTX0RJQUdOT1NJUywgVE9HR0xFX0NPTkRJVElPTlMsIFRPR0dMRV9TUEVDSUFMSVRJRVMsIFNFTEVDVF9MT0NBVElPTl9ESUFHTk9TSVMsIE1FUkdFX1NFQVJDSF9TVEFURV9MQUIsIFRPR0dMRV9DUklURVJJQSwgVE9HR0xFX1RFU1RTLCBUT0dHTEVfRElBR05PU0lTX0NSSVRFUklBLCBMT0FEX1NFQVJDSF9DUklURVJJQV9MQUIgfSBmcm9tICcuLi8uLi9jb25zdGFudHMvdHlwZXMnO1xuXG5jb25zdCBkZWZhdWx0U3RhdGUgPSB7XG4gICAgTE9BREVEX1NFQVJDSF9DUklURVJJQV9MQUI6IGZhbHNlLFxuICAgIGNvbW1vbl90ZXN0czogW10sXG4gICAgY29tbW9uX2NvbmRpdGlvbnM6IFtdLFxuICAgIHByZWZlcnJlZF9sYWJzOiBbXSxcbiAgICBzZWxlY3RlZENyaXRlcmlhczogW10sXG4gICAgc2VsZWN0ZWRMb2NhdGlvbjogbnVsbCxcbiAgICBmaWx0ZXJDcml0ZXJpYToge1xuICAgICAgICBwcmljZVJhbmdlOiBbMTAwLCAxNTAwXSxcbiAgICAgICAgZGlzdGFuY2VSYW5nZTogWzEsIDM1XSxcbiAgICAgICAgc29ydEJ5OiBudWxsXG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoc3RhdGUgPSBkZWZhdWx0U3RhdGUsIGFjdGlvbikge1xuXG4gICAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgICAgICBjYXNlIExPQURfU0VBUkNIX0NSSVRFUklBX0xBQjoge1xuICAgICAgICAgICAgbGV0IG5ld1N0YXRlID0geyAuLi5zdGF0ZSB9XG4gICAgICAgICAgICBpZiAoYWN0aW9uLnBheWxvYWQpIHtcbiAgICAgICAgICAgICAgICBuZXdTdGF0ZSA9IHsgLi4ubmV3U3RhdGUsIC4uLmFjdGlvbi5wYXlsb2FkIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG5ld1N0YXRlLkxPQURFRF9TRUFSQ0hfQ1JJVEVSSUFfTEFCID0gdHJ1ZVxuICAgICAgICAgICAgcmV0dXJuIG5ld1N0YXRlXG4gICAgICAgIH1cblxuICAgICAgICBjYXNlIFRPR0dMRV9ESUFHTk9TSVNfQ1JJVEVSSUE6IHtcbiAgICAgICAgICAgIGxldCBuZXdTdGF0ZSA9IHtcbiAgICAgICAgICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgICAgICAgICBzZWxlY3RlZENyaXRlcmlhczogW10uY29uY2F0KHN0YXRlLnNlbGVjdGVkQ3JpdGVyaWFzKVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsZXQgZm91bmQgPSBmYWxzZVxuICAgICAgICAgICAgbmV3U3RhdGUuc2VsZWN0ZWRDcml0ZXJpYXMgPSBuZXdTdGF0ZS5zZWxlY3RlZENyaXRlcmlhcy5maWx0ZXIoKGN1cnIpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoY3Vyci5pZCA9PSBhY3Rpb24ucGF5bG9hZC5jcml0ZXJpYS5pZCAmJiBjdXJyLnR5cGUgPT0gYWN0aW9uLnBheWxvYWQudHlwZSkge1xuICAgICAgICAgICAgICAgICAgICBmb3VuZCA9IHRydWVcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICBpZiAoIWZvdW5kKSB7XG4gICAgICAgICAgICAgICAgbmV3U3RhdGUuc2VsZWN0ZWRDcml0ZXJpYXMucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIC4uLmFjdGlvbi5wYXlsb2FkLmNyaXRlcmlhLFxuICAgICAgICAgICAgICAgICAgICB0eXBlOiBhY3Rpb24ucGF5bG9hZC50eXBlXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIG5ld1N0YXRlXG4gICAgICAgIH1cblxuICAgICAgICBjYXNlIFNFTEVDVF9MT0NBVElPTl9ESUFHTk9TSVM6IHtcbiAgICAgICAgICAgIGxldCBuZXdTdGF0ZSA9IHsgLi4uc3RhdGUgfVxuXG4gICAgICAgICAgICBuZXdTdGF0ZS5zZWxlY3RlZExvY2F0aW9uID0gYWN0aW9uLnBheWxvYWRcbiAgICAgICAgICAgIHJldHVybiBuZXdTdGF0ZVxuICAgICAgICB9XG5cbiAgICAgICAgY2FzZSBNRVJHRV9TRUFSQ0hfU1RBVEVfTEFCOiB7XG4gICAgICAgICAgICBsZXQgbmV3U3RhdGUgPSB7IC4uLnN0YXRlLCAuLi5hY3Rpb24ucGF5bG9hZC5zZWFyY2hTdGF0ZSwgZmlsdGVyQ3JpdGVyaWEgOiBhY3Rpb24ucGF5bG9hZC5maWx0ZXJDcml0ZXJpYSB9XG5cbiAgICAgICAgICAgIHJldHVybiBuZXdTdGF0ZVxuICAgICAgICB9XG5cbiAgICB9XG4gICAgcmV0dXJuIHN0YXRlXG59XG5cblxuXG5cblxuIiwiaW1wb3J0IHtjb21iaW5lUmVkdWNlcnN9IGZyb20gJ3JlZHV4JztcblxuaW1wb3J0IFNFQVJDSF9DUklURVJJQV9PUEQgZnJvbSAnLi9vcGQvc2VhcmNoQ3JpdGVyaWEuanMnXG5pbXBvcnQgU0VBUkNIX0NSSVRFUklBX0xBQlMgZnJvbSAnLi9kaWFnbm9zaXMvc2VhcmNoQ3JpdGVyaWEuanMnXG5pbXBvcnQgRE9DVE9SUyBmcm9tICcuL29wZC9kb2N0b3JzLmpzJ1xuaW1wb3J0IERPQ1RPUl9TRUFSQ0ggZnJvbSAnLi9vcGQvZG9jdG9yU2VhcmNoLmpzJ1xuaW1wb3J0IExBQlMgZnJvbSAnLi9kaWFnbm9zaXMvbGFicy5qcydcbmltcG9ydCBMQUJfU0VBUkNIIGZyb20gJy4vZGlhZ25vc2lzL2xhYnNTZWFyY2guanMnXG5pbXBvcnQgVVNFUiBmcm9tICcuL2NvbW1vbnMvdXNlci5qcydcblxuY29uc3QgYWxsUmVkdWNlcnMgPSBjb21iaW5lUmVkdWNlcnMoe1xuICAgIFNFQVJDSF9DUklURVJJQV9PUEQsXG4gICAgU0VBUkNIX0NSSVRFUklBX0xBQlMsXG4gICAgRE9DVE9SUyxcbiAgICBET0NUT1JfU0VBUkNILFxuICAgIExBQlMsXG4gICAgTEFCX1NFQVJDSCxcbiAgICBVU0VSXG59KTtcblxuZXhwb3J0IGRlZmF1bHQgYWxsUmVkdWNlcnNcbiIsImltcG9ydCB7IERPQ1RPUl9TRUFSQ0ggfSBmcm9tICcuLi8uLi9jb25zdGFudHMvdHlwZXMnO1xuXG5jb25zdCBkZWZhdWx0U3RhdGUgPSB7XG4gICAgZG9jdG9yTGlzdDogW10sXG4gICAgTE9BRElORzogdHJ1ZSxcbiAgICBFUlJPUjogbnVsbFxufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoc3RhdGUgPSBkZWZhdWx0U3RhdGUsIGFjdGlvbikge1xuXG4gICAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgICAgICBjYXNlIERPQ1RPUl9TRUFSQ0g6IHtcbiAgICAgICAgICAgIGxldCBuZXdTdGF0ZSA9IHsgLi4uc3RhdGUgfVxuXG4gICAgICAgICAgICBuZXdTdGF0ZS5kb2N0b3JMaXN0ID0gYWN0aW9uLnBheWxvYWQubWFwKGRvYyA9PiBkb2MuaWQpXG4gICAgICAgICAgICBuZXdTdGF0ZS5MT0FESU5HID0gZmFsc2VcblxuICAgICAgICAgICAgcmV0dXJuIG5ld1N0YXRlXG4gICAgICAgIH1cblxuICAgIH1cbiAgICBcbiAgICByZXR1cm4gc3RhdGVcbn0iLCJpbXBvcnQgeyBBUFBFTkRfRE9DVE9SUyB9IGZyb20gJy4uLy4uL2NvbnN0YW50cy90eXBlcyc7XG5cbmNvbnN0IGRlZmF1bHRTdGF0ZSA9IHtcblxufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoc3RhdGUgPSBkZWZhdWx0U3RhdGUsIGFjdGlvbikge1xuXG4gICAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgICAgICBjYXNlIEFQUEVORF9ET0NUT1JTOiB7XG4gICAgICAgICAgICBsZXQgbmV3U3RhdGUgPSB7IC4uLnN0YXRlIH1cblxuICAgICAgICAgICAgcmV0dXJuIGFjdGlvbi5wYXlsb2FkLnJlZHVjZSgoZG9jdG9yTWFwLCBkb2N0b3IpID0+IHtcbiAgICAgICAgICAgICAgICBkb2N0b3JNYXBbZG9jdG9yLmlkXSA9IGRvY3RvclxuICAgICAgICAgICAgICAgIHJldHVybiBkb2N0b3JNYXBcbiAgICAgICAgICAgIH0sbmV3U3RhdGUpXG5cbiAgICAgICAgfVxuXG4gICAgfVxuICAgIHJldHVybiBzdGF0ZVxufSIsImltcG9ydCB7IFRPR0dMRV9DT05ESVRJT05TLCBUT0dHTEVfU1BFQ0lBTElUSUVTLCBTRUxFQ1RfTE9DQVRJT04sIE1FUkdFX1NFQVJDSF9TVEFURV9PUEQsIFRPR0dMRV9DUklURVJJQSwgVE9HR0xFX1RFU1RTLCBUT0dHTEVfRElBR05PU0lTX0NSSVRFUklBLCBTRVRfT1BEX0ZJTFRFUlMsIExPQURfU0VBUkNIX0NSSVRFUklBX09QRCB9IGZyb20gJy4uLy4uL2NvbnN0YW50cy90eXBlcyc7XG5cbmNvbnN0IGRlZmF1bHRTdGF0ZSA9IHtcbiAgICBjb21tb25seVNlYXJjaGVkQ29uZGl0aW9uczogW3sgaWQ6IDEsIG5hbWU6ICdIZWFkYWNoZScgfSwgeyBpZDogMiwgbmFtZTogJ1N0b21hY2gtYWNoZScgfSwgeyBpZDogMywgbmFtZTogJ0ZsdScgfSwgeyBpZDogNCwgbmFtZTogJ0hhaXIgRmFsbCcgfSwgeyBpZDogNSwgbmFtZTogJ0NoZXN0IFBhaW4nIH1dLFxuICAgIHNlbGVjdGVkQ29uZGl0aW9uczoge30sXG4gICAgY29tbW9ubHlTZWFyY2hlZFNwZWNpYWxpdGllczogW3sgaWQ6IDEsIG5hbWU6ICdHZW5lcmFsIFBoeXNpY2lhbCcgfSwgeyBpZDogMiwgbmFtZTogJ05ldXJvbG9neScgfSwgeyBpZDogMywgbmFtZTogJ0NhcmRpb2xvZ2lzdCcgfSwgeyBpZDogNCwgbmFtZTogJ09ydGhvcGFlZGljJyB9LCB7IGlkOiA1LCBuYW1lOiAnSW5mZXJ0aWxpdHknIH1dLFxuICAgIHNlbGVjdGVkU3BlY2lhbGl0aWVzOiB7fSxcbiAgICBzZWxlY3RlZENyaXRlcmlhOiB7fSxcbiAgICBzZWxlY3RlZExvY2F0aW9uOiBudWxsLFxuICAgIGZpbHRlckNyaXRlcmlhOiB7fSxcbiAgICBDUklURVJJQV9MT0FERUQ6IGZhbHNlXG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChzdGF0ZSA9IGRlZmF1bHRTdGF0ZSwgYWN0aW9uKSB7XG5cbiAgICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgICAgIGNhc2UgTE9BRF9TRUFSQ0hfQ1JJVEVSSUFfT1BEIDoge1xuICAgICAgICAgICAgbGV0IG5ld1N0YXRlID0gey4uLnN0YXRlfVxuXG4gICAgICAgICAgICBuZXdTdGF0ZS5DUklURVJJQV9MT0FERUQgPSB0cnVlXG4gICAgICAgICAgICBuZXdTdGF0ZS5maWx0ZXJDcml0ZXJpYSA9IHt9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHJldHVybiBuZXdTdGF0ZVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBjYXNlIFRPR0dMRV9DT05ESVRJT05TOiB7XG4gICAgICAgICAgICBsZXQgbmV3U3RhdGUgPSB7XG4gICAgICAgICAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRDb25kaXRpb25zIDoge1xuICAgICAgICAgICAgICAgICAgICAuLi5zdGF0ZS5zZWxlY3RlZENvbmRpdGlvbnNcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChuZXdTdGF0ZS5zZWxlY3RlZENvbmRpdGlvbnNbYWN0aW9uLnBheWxvYWQuaWRdKSB7XG4gICAgICAgICAgICAgICAgZGVsZXRlIG5ld1N0YXRlLnNlbGVjdGVkQ29uZGl0aW9uc1thY3Rpb24ucGF5bG9hZC5pZF1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbmV3U3RhdGUuc2VsZWN0ZWRDb25kaXRpb25zW2FjdGlvbi5wYXlsb2FkLmlkXSA9IG5ldyBEYXRlKClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBuZXdTdGF0ZVxuICAgICAgICB9XG5cbiAgICAgICAgY2FzZSBUT0dHTEVfU1BFQ0lBTElUSUVTOiB7XG4gICAgICAgICAgICBsZXQgbmV3U3RhdGUgPSB7XG4gICAgICAgICAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRTcGVjaWFsaXRpZXMgOiB7XG4gICAgICAgICAgICAgICAgICAgIC4uLnN0YXRlLnNlbGVjdGVkU3BlY2lhbGl0aWVzXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAobmV3U3RhdGUuc2VsZWN0ZWRTcGVjaWFsaXRpZXNbYWN0aW9uLnBheWxvYWQuaWRdKSB7XG4gICAgICAgICAgICAgICAgZGVsZXRlIG5ld1N0YXRlLnNlbGVjdGVkU3BlY2lhbGl0aWVzW2FjdGlvbi5wYXlsb2FkLmlkXVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBuZXdTdGF0ZS5zZWxlY3RlZFNwZWNpYWxpdGllc1thY3Rpb24ucGF5bG9hZC5pZF0gPSBuZXcgRGF0ZSgpXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBuZXdTdGF0ZVxuICAgICAgICB9XG5cbiAgICAgICAgY2FzZSBUT0dHTEVfQ1JJVEVSSUE6IHtcbiAgICAgICAgICAgIGxldCBuZXdTdGF0ZSA9IHtcbiAgICAgICAgICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgICAgICAgICBzZWxlY3RlZENyaXRlcmlhIDoge1xuICAgICAgICAgICAgICAgICAgICAuLi5zdGF0ZS5zZWxlY3RlZENyaXRlcmlhXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAobmV3U3RhdGUuc2VsZWN0ZWRDcml0ZXJpYVthY3Rpb24ucGF5bG9hZC5pZF0pIHtcbiAgICAgICAgICAgICAgICBkZWxldGUgbmV3U3RhdGUuc2VsZWN0ZWRDcml0ZXJpYVthY3Rpb24ucGF5bG9hZC5pZF1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgYWN0aW9uLnBheWxvYWQudHMgPSBuZXcgRGF0ZSgpXG4gICAgICAgICAgICAgICAgbmV3U3RhdGUuc2VsZWN0ZWRDcml0ZXJpYVthY3Rpb24ucGF5bG9hZC5pZF0gPSBhY3Rpb24ucGF5bG9hZFxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gbmV3U3RhdGVcbiAgICAgICAgfVxuXG4gICAgICAgIGNhc2UgU0VMRUNUX0xPQ0FUSU9OOiB7XG4gICAgICAgICAgICBsZXQgbmV3U3RhdGUgPSB7IC4uLnN0YXRlIH1cblxuICAgICAgICAgICAgbmV3U3RhdGUuc2VsZWN0ZWRMb2NhdGlvbiA9IGFjdGlvbi5wYXlsb2FkXG4gICAgICAgICAgICByZXR1cm4gbmV3U3RhdGVcbiAgICAgICAgfVxuXG4gICAgICAgIGNhc2UgU0VUX09QRF9GSUxURVJTOiB7XG4gICAgICAgICAgICBsZXQgbmV3U3RhdGUgPSB7IC4uLnN0YXRlIH1cblxuICAgICAgICAgICAgbmV3U3RhdGUuZmlsdGVyQ3JpdGVyaWEgPSBhY3Rpb24ucGF5bG9hZFxuICAgICAgICAgICAgcmV0dXJuIG5ld1N0YXRlXG4gICAgICAgIH1cblxuICAgICAgICBjYXNlIE1FUkdFX1NFQVJDSF9TVEFURV9PUEQ6IHtcbiAgICAgICAgICAgIGxldCBuZXdTdGF0ZSA9IHsgLi4uc3RhdGUgfVxuXG4gICAgICAgICAgICBuZXdTdGF0ZSA9IE9iamVjdC5hc3NpZ24obmV3U3RhdGUsIGFjdGlvbi5wYXlsb2FkKVxuICAgICAgICAgICAgbmV3U3RhdGUuQ1JJVEVSSUFfTE9BREVEID0gdHJ1ZVxuICAgICAgICAgICAgcmV0dXJuIG5ld1N0YXRlXG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHN0YXRlXG59XG5cblxuXG5cblxuIiwiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IEJyb3dzZXJSb3V0ZXIsIFN3aXRjaCwgUm91dGUgfSBmcm9tICdyZWFjdC1yb3V0ZXItZG9tJ1xuXG5pbXBvcnQgeyBUcmFuc2l0aW9uR3JvdXAsIENTU1RyYW5zaXRpb24gfSBmcm9tIFwicmVhY3QtdHJhbnNpdGlvbi1ncm91cFwiO1xuXG5pbXBvcnQgU2VhcmNoQ3JpdGVyaWEgZnJvbSAnLi9jb250YWluZXJzL29wZC9TZWFyY2hDcml0ZXJpYS5qcydcbmltcG9ydCBMb2NhdGlvblNlYXJjaCBmcm9tICcuL2NvbnRhaW5lcnMvb3BkL0xvY2F0aW9uU2VhcmNoLmpzJ1xuaW1wb3J0IFNlYXJjaFJlc3VsdHMgZnJvbSAnLi9jb250YWluZXJzL29wZC9TZWFyY2hSZXN1bHRzLmpzJ1xuaW1wb3J0IFNlYXJjaFJlc3VsdHNGaWx0ZXIgZnJvbSAnLi9jb250YWluZXJzL29wZC9TZWFyY2hSZXN1bHRzRmlsdGVyLmpzJ1xuaW1wb3J0IERvY3RvclByb2ZpbGUgZnJvbSAnLi9jb250YWluZXJzL29wZC9Eb2N0b3JQcm9maWxlLmpzJ1xuaW1wb3J0IENsaW5pY0xpc3QgZnJvbSAnLi9jb250YWluZXJzL29wZC9DbGluaWNMaXN0LmpzJ1xuaW1wb3J0IEFwcG9pbnRtZW50U2xvdCBmcm9tICcuL2NvbnRhaW5lcnMvb3BkL0FwcG9pbnRtZW50U2xvdC5qcydcbmltcG9ydCBQYXRpZW50RGV0YWlscyBmcm9tICcuL2NvbnRhaW5lcnMvb3BkL1BhdGllbnREZXRhaWxzLmpzJ1xuaW1wb3J0IFVzZXJQcm9maWxlIGZyb20gJy4vY29udGFpbmVycy9jb21tb25zL1VzZXJQcm9maWxlLmpzJ1xuaW1wb3J0IFVzZXJBcHBvaW50bWVudHMgZnJvbSAnLi9jb250YWluZXJzL2NvbW1vbnMvVXNlckFwcG9pbnRtZW50cy5qcydcbmltcG9ydCBVc2VyUmVwb3J0cyBmcm9tICcuL2NvbnRhaW5lcnMvY29tbW9ucy9Vc2VyUmVwb3J0cy5qcydcbmltcG9ydCBQYXltZW50IGZyb20gJy4vY29udGFpbmVycy9vcGQvUGF5bWVudC5qcydcbmltcG9ydCBCb29raW5nIGZyb20gJy4vY29udGFpbmVycy9vcGQvQm9va2luZy5qcydcbmltcG9ydCBDcml0ZXJpYVNlYXJjaCBmcm9tICcuL2NvbnRhaW5lcnMvb3BkL0NyaXRlcmlhU2VhcmNoLmpzJ1xuaW1wb3J0IERYX1NlYXJjaENyaXRlcmlhIGZyb20gJy4vY29udGFpbmVycy9kaWFnbm9zaXMvU2VhcmNoQ3JpdGVyaWEuanMnXG5pbXBvcnQgRFhfU2VhcmNoUmVzdWx0cyBmcm9tICcuL2NvbnRhaW5lcnMvZGlhZ25vc2lzL1NlYXJjaFJlc3VsdHMuanMnXG5pbXBvcnQgTGFiIGZyb20gJy4vY29udGFpbmVycy9kaWFnbm9zaXMvTGFiLmpzJ1xuaW1wb3J0IERYX1BhdGllbnREZXRhaWxzIGZyb20gJy4vY29udGFpbmVycy9kaWFnbm9zaXMvUGF0aWVudERldGFpbHMuanMnXG5pbXBvcnQgRFhfQm9va2luZ1N1bW1hcnkgZnJvbSAnLi9jb250YWluZXJzL2RpYWdub3Npcy9Cb29raW5nU3VtbWFyeS5qcydcbmltcG9ydCBEb2N0b3JDaGF0IGZyb20gJy4vY29udGFpbmVycy9jb21tb25zL0NoYXQuanMnXG5pbXBvcnQgVGVzdFNlbGVjdG9yIGZyb20gJy4vY29udGFpbmVycy9kaWFnbm9zaXMvVGVzdFNlbGVjdG9yJ1xuXG5cbmNvbnN0IHJvdXRlcyA9IFtcblxuICAgIHsgcGF0aDogJy8nLCBleGFjdDogdHJ1ZSwgY29tcG9uZW50OiBTZWFyY2hDcml0ZXJpYSB9LFxuICAgIHsgcGF0aDogJy9sb2NhdGlvbnNlYXJjaCcsIGV4YWN0OiB0cnVlLCBjb21wb25lbnQ6IExvY2F0aW9uU2VhcmNoIH0sXG4gICAgeyBwYXRoOiAnL2NyaXRlcmlhc2VhcmNoJywgZXhhY3Q6IHRydWUsIGNvbXBvbmVudDogQ3JpdGVyaWFTZWFyY2ggfSxcbiAgICB7IHBhdGg6ICcvc2VhcmNocmVzdWx0cycsIGV4YWN0OiB0cnVlLCBjb21wb25lbnQ6IFNlYXJjaFJlc3VsdHMgfSxcbiAgICB7IHBhdGg6ICcvc2VhcmNocmVzdWx0cy9maWx0ZXInLCBleGFjdDogdHJ1ZSwgY29tcG9uZW50OiBTZWFyY2hSZXN1bHRzRmlsdGVyIH0sXG4gICAgeyBwYXRoOiAnL2RvY3RvcnByb2ZpbGUvOmlkJywgZXhhY3Q6IHRydWUsIGNvbXBvbmVudDogRG9jdG9yUHJvZmlsZSB9LFxuICAgIHsgcGF0aDogJy9kb2N0b3Jwcm9maWxlLzppZC9hdmFpbGFiaWxpdHknLCBleGFjdDogdHJ1ZSwgY29tcG9uZW50OiBDbGluaWNMaXN0IH0sXG4gICAgeyBwYXRoOiAnL2RvY3RvcnByb2ZpbGUvOmlkLzpjbGluaWNJZC9ib29rJywgZXhhY3Q6IHRydWUsIGNvbXBvbmVudDogQXBwb2ludG1lbnRTbG90IH0sXG4gICAgeyBwYXRoOiAnL2RvY3RvcnByb2ZpbGUvOmlkLzpjbGluaWNJZC9ib29rZGV0YWlscycsIGV4YWN0OiB0cnVlLCBjb21wb25lbnQ6IFBhdGllbnREZXRhaWxzIH0sXG4gICAgeyBwYXRoOiAnL3VzZXInLCBleGFjdDogdHJ1ZSwgY29tcG9uZW50OiBVc2VyUHJvZmlsZSB9LFxuICAgIHsgcGF0aDogJy91c2VyLzppZCcsIGV4YWN0OiB0cnVlLCBjb21wb25lbnQ6IFVzZXJQcm9maWxlIH0sXG4gICAgeyBwYXRoOiAnL3VzZXIvOmlkL2FwcG9pbnRtZW50cycsIGV4YWN0OiB0cnVlLCBjb21wb25lbnQ6IFVzZXJBcHBvaW50bWVudHMgfSxcbiAgICB7IHBhdGg6ICcvdXNlci86aWQvcmVwb3J0cycsIGV4YWN0OiB0cnVlLCBjb21wb25lbnQ6IFVzZXJSZXBvcnRzIH0sXG4gICAgeyBwYXRoOiAnL2NoYXQnLCBleGFjdDogdHJ1ZSwgY29tcG9uZW50OiBEb2N0b3JDaGF0IH0sXG4gICAgeyBwYXRoOiAnL3BheW1lbnQnLCBleGFjdDogdHJ1ZSwgY29tcG9uZW50OiBQYXltZW50IH0sXG4gICAgeyBwYXRoOiAnL2Jvb2tpbmcvOnJlZklkJywgZXhhY3Q6IHRydWUsIGNvbXBvbmVudDogQm9va2luZyB9LFxuXG4gICAgeyBwYXRoOiAnL2R4JywgZXhhY3Q6IHRydWUsIGNvbXBvbmVudDogRFhfU2VhcmNoQ3JpdGVyaWEgfSxcbiAgICB7IHBhdGg6ICcvZHgvc2VhcmNocmVzdWx0cycsIGV4YWN0OiB0cnVlLCBjb21wb25lbnQ6IERYX1NlYXJjaFJlc3VsdHMgfSxcbiAgICB7IHBhdGg6ICcvbGFiLzppZC9ib29rJywgZXhhY3Q6IHRydWUsIGNvbXBvbmVudDogTGFiIH0sXG4gICAgeyBwYXRoOiAnL2xhYi86aWQvdGVzdHMnLCBleGFjdDogdHJ1ZSwgY29tcG9uZW50OiBUZXN0U2VsZWN0b3IgfSxcblxuICAgIHsgcGF0aDogJy9sYWIvOmlkL2Jvb2tkZXRhaWxzJywgZXhhY3Q6IHRydWUsIGNvbXBvbmVudDogRFhfUGF0aWVudERldGFpbHMgfSxcbiAgICB7IHBhdGg6ICcvbGFiL2Jvb2tpbmcvc3VtbWFyeS86aWQnLCBleGFjdDogdHJ1ZSwgY29tcG9uZW50OiBEWF9Cb29raW5nU3VtbWFyeSB9LFxuXG5dXG5cbmNsYXNzIFJvdXRlckNvbmZpZyBleHRlbmRzIENvbXBvbmVudCB7XG5cbiAgICBzdGF0aWMgUk9VVEVTID0gcm91dGVzXG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIDxSb3V0ZVxuICAgICAgICAgICAgICAgICAgICByZW5kZXI9e1xuICAgICAgICAgICAgICAgICAgICAgICAgKHsgbG9jYXRpb24gfSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxUcmFuc2l0aW9uR3JvdXA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Q1NTVHJhbnNpdGlvbiBrZXk9e2xvY2F0aW9uLnBhdGhuYW1lfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZXM9XCJmYWRlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aW1lb3V0PXszMDB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPFN3aXRjaD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3JvdXRlcy5tYXAoKHJvdXRlLCBpKSA9PiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Um91dGUgey4uLnJvdXRlfSBrZXk9e2l9IC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvU3dpdGNoPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9DU1NUcmFuc2l0aW9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L1RyYW5zaXRpb25Hcm91cD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvPlxuXG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKVxuICAgIH1cblxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IFJvdXRlckNvbmZpZ1xuXG4iLCJcbmNvbnN0IGRheXMgPSBbJ1N1bmRheScsICdNb25kYXknLCAnVHVlc2RheScsICdXZWRuZXNkYXknLCAnVGh1cnNkYXknLCAnRnJpZGF5JywgJ1NhdHVyZGF5J107XG5cbmV4cG9ydCBjb25zdCBnZXRUaW1lID0gKHRpbWVTdGFtcCkgPT4ge1xuICAgIHZhciBkYXRlID0gbmV3IERhdGUodGltZVN0YW1wKTtcbiAgICB2YXIgaG91cnMgPSBkYXRlLmdldEhvdXJzKCk7XG4gICAgdmFyIG1pbnV0ZXMgPSBcIjBcIiArIGRhdGUuZ2V0TWludXRlcygpO1xuICAgIHJldHVybiBob3VycyArICc6JyArIG1pbnV0ZXMuc3Vic3RyKC0yKVxufVxuZXhwb3J0IGNvbnN0IGdldERheU5hbWUgPSAodGltZVN0YW1wKSA9PiB7XG4gICAgcmV0dXJuIGRheXNbbmV3IERhdGUodGltZVN0YW1wKS5nZXREYXkoKV1cblxufSIsImNvbnN0IHBhdGggPSByZXF1aXJlKCdwYXRoJyk7XG5jb25zdCBodHRwID0gcmVxdWlyZSgnaHR0cCcpO1xuY29uc3QgRXhwcmVzcyA9IHJlcXVpcmUoJ2V4cHJlc3MnKTtcbmNvbnN0IGFwcCA9IG5ldyBFeHByZXNzKCk7XG5jb25zdCBzZXJ2ZXIgPSBuZXcgaHR0cC5TZXJ2ZXIoYXBwKTtcblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IFJlYWN0RE9NU2VydmVyIGZyb20gJ3JlYWN0LWRvbS9zZXJ2ZXInXG5pbXBvcnQgeyBTdGF0aWNSb3V0ZXIgfSBmcm9tICdyZWFjdC1yb3V0ZXInXG5pbXBvcnQgUm91dGVzIGZyb20gJy4vZGV2L2pzL3JvdXRlcy5qcydcbmltcG9ydCB7IE11aVRoZW1lUHJvdmlkZXIsIGNyZWF0ZU11aVRoZW1lLCBjcmVhdGVHZW5lcmF0ZUNsYXNzTmFtZSB9IGZyb20gJ21hdGVyaWFsLXVpL3N0eWxlcyc7XG5pbXBvcnQgeyBTaGVldHNSZWdpc3RyeSB9IGZyb20gJ3JlYWN0LWpzcy9saWIvanNzJztcblxuaW1wb3J0IEpzc1Byb3ZpZGVyIGZyb20gJ3JlYWN0LWpzcy9saWIvSnNzUHJvdmlkZXInO1xuaW1wb3J0IHsgUHJvdmlkZXIgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgeyBjcmVhdGVTdG9yZSwgYXBwbHlNaWRkbGV3YXJlIH0gZnJvbSAncmVkdXgnO1xuaW1wb3J0IHRodW5rIGZyb20gJ3JlZHV4LXRodW5rJztcbmltcG9ydCB7IGNyZWF0ZUxvZ2dlciB9IGZyb20gJ3JlZHV4LWxvZ2dlcidcbmltcG9ydCBhbGxSZWR1Y2VycyBmcm9tICcuL2Rldi9qcy9yZWR1Y2Vycy9pbmRleC5qcyc7XG5pbXBvcnQgeyBtYXRjaFBhdGggfSBmcm9tICdyZWFjdC1yb3V0ZXItZG9tJ1xuXG5cbmFwcC51c2UoJy9hc3NldHMnLCBFeHByZXNzLnN0YXRpYyhwYXRoLmpvaW4oX19kaXJuYW1lLCAnYXNzZXRzJykpKTtcbmFwcC51c2UoJy9kaXN0JywgRXhwcmVzcy5zdGF0aWMocGF0aC5qb2luKF9fZGlybmFtZSwgJ2Rpc3QnKSkpO1xuXG5hcHAudXNlKCcvYXBpJywgRXhwcmVzcy5zdGF0aWMocGF0aC5qb2luKF9fZGlybmFtZSwgJ2R1bW15X2FwaScpKSk7XG5cblxuYXBwLmdldCgnKicsIGZ1bmN0aW9uKHJlcSwgcmVzKXtcblxuICAgIGNvbnN0IGNvbnRleHQgPSB7fVxuXG4gICAgY29uc3Qgc3RvcmUgPSBjcmVhdGVTdG9yZShcbiAgICAgICAgYWxsUmVkdWNlcnNcbiAgICApO1xuXG4gICAgY29uc3Qgc2hlZXRzUmVnaXN0cnkgPSBuZXcgU2hlZXRzUmVnaXN0cnkoKTtcbiAgICBjb25zdCB0aGVtZSA9IGNyZWF0ZU11aVRoZW1lKHtcbiAgICAgICAgcGFsZXR0ZToge1xuICAgICAgICAgICAgcHJpbWFyeToge1xuICAgICAgICAgICAgICAgIG1haW46ICcjMDBiN2IwJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNlY29uZGFyeToge1xuICAgICAgICAgICAgICAgIG1haW46ICcjMDBiN2IwJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgICAgc3RhdHVzOiB7XG4gICAgICAgICAgICBkYW5nZXI6ICdvcmFuZ2UnLFxuICAgICAgICB9LFxuICAgIH0pXG4gICAgY29uc3QgZ2VuZXJhdGVDbGFzc05hbWUgPSBjcmVhdGVHZW5lcmF0ZUNsYXNzTmFtZSgpO1xuXG4gICAgY29uc3QgaHRtbCA9IFJlYWN0RE9NU2VydmVyLnJlbmRlclRvU3RyaW5nKFxuICAgICAgICA8UHJvdmlkZXIgc3RvcmU9e3N0b3JlfT5cbiAgICAgICAgICAgIDxKc3NQcm92aWRlciByZWdpc3RyeT17c2hlZXRzUmVnaXN0cnl9IGdlbmVyYXRlQ2xhc3NOYW1lPXtnZW5lcmF0ZUNsYXNzTmFtZX0+XG4gICAgICAgICAgICAgICAgPE11aVRoZW1lUHJvdmlkZXIgdGhlbWU9e3RoZW1lfT5cbiAgICAgICAgICAgICAgICAgICAgPFN0YXRpY1JvdXRlclxuICAgICAgICAgICAgICAgICAgICAgICAgbG9jYXRpb249e3JlcS51cmx9XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0PXtjb250ZXh0fVxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICA8Um91dGVzIC8+XG4gICAgICAgICAgICAgICAgICAgIDwvU3RhdGljUm91dGVyPlxuICAgICAgICAgICAgICAgIDwvTXVpVGhlbWVQcm92aWRlcj5cbiAgICAgICAgICAgIDwvSnNzUHJvdmlkZXI+XG4gICAgICAgIDwvUHJvdmlkZXI+XG4gICAgKVxuXG4gICAgY29uc3QgY3NzID0gc2hlZXRzUmVnaXN0cnkudG9TdHJpbmcoKVxuXG5cbiAgICBpZiAoY29udGV4dC51cmwpIHtcbiAgICAgICAgcmVzLndyaXRlSGVhZCgzMDEsIHtcbiAgICAgICAgICAgIExvY2F0aW9uOiBjb250ZXh0LnVybFxuICAgICAgICB9KVxuICAgICAgICByZXMuZW5kKClcbiAgICB9IGVsc2Uge1xuXG4gICAgICAgIC8vIGluc2lkZSBhIHJlcXVlc3RcbiAgICAgICAgY29uc3QgcHJvbWlzZXMgPSBbXVxuICAgICBcbiAgICAgICAgUm91dGVzLlJPVVRFUy5zb21lKHJvdXRlID0+IHtcbiAgICAgICAgICAgIC8vIHVzZSBgbWF0Y2hQYXRoYCBoZXJlXG4gICAgICAgICAgICBjb25zdCBtYXRjaCA9IG1hdGNoUGF0aChyZXEucGF0aCwgcm91dGUpXG4gICAgICAgICAgICBpZiAobWF0Y2ggJiYgcm91dGUubG9hZERhdGEpXG4gICAgICAgICAgICAgICAgcHJvbWlzZXMucHVzaChyb3V0ZS5sb2FkRGF0YSgpKVxuICAgICAgICAgICAgcmV0dXJuIG1hdGNoXG4gICAgICAgIH0pXG5cbiAgICAgICAgUHJvbWlzZS5hbGwocHJvbWlzZXMpLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgICByZXMucmVuZGVyKCcuL2luZGV4LnRlbXBsYXRlLmVqcycsIHtcbiAgICAgICAgICAgICAgICBodG1sLCBjc3NcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pXG5cbiAgICB9XG5cbn0pO1xuXG5cbmFwcC51c2UoZnVuY3Rpb24gKHJlcSwgcmVzKSB7XG4gICAgcmVzLnNlbmRGaWxlKCdpbmRleC5odG1sJywgeyByb290OiAnLi9kaXN0LycgfSlcbn0pXG5cbnNlcnZlci5saXN0ZW4oMzAwMCwgKGVycikgPT4ge1xuICAgIGlmIChlcnIpIHtcbiAgICAgICAgcmV0dXJuIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICB9XG4gICAgY29uc29sZS5pbmZvKCdTZXJ2ZXIgcnVubmluZyBvbiBodHRwOi8vbG9jYWxob3N0OjMwMDAnKTtcbn0pOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImF4aW9zXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImV4cHJlc3NcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiaHR0cFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJtYXRlcmlhbC11aS1pY29ucy9BY2NvdW50Q2lyY2xlXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm1hdGVyaWFsLXVpLWljb25zL0F0dGFjaE1vbmV5XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm1hdGVyaWFsLXVpLWljb25zL0F2VGltZXJcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibWF0ZXJpYWwtdWktaWNvbnMvQ2FsbFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJtYXRlcmlhbC11aS1pY29ucy9FeHBhbmRNb3JlXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm1hdGVyaWFsLXVpLWljb25zL0ZpbHRlckxpc3RcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibWF0ZXJpYWwtdWktaWNvbnMvSG9tZVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJtYXRlcmlhbC11aS1pY29ucy9LZXlib2FyZEFycm93UmlnaHRcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibWF0ZXJpYWwtdWktaWNvbnMvTG9jYXRpb25PblwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJtYXRlcmlhbC11aS1pY29ucy9QYXltZW50XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm1hdGVyaWFsLXVpLWljb25zL1NvcnRcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibWF0ZXJpYWwtdWkvQ2hlY2tib3hcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibWF0ZXJpYWwtdWkvQ2hpcFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJtYXRlcmlhbC11aS9FeHBhbnNpb25QYW5lbFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJtYXRlcmlhbC11aS9Gb3JtXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm1hdGVyaWFsLXVpL01lbnVcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibWF0ZXJpYWwtdWkvUHJvZ3Jlc3NcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibWF0ZXJpYWwtdWkvUmFkaW9cIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibWF0ZXJpYWwtdWkvU3RlcHBlclwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJtYXRlcmlhbC11aS9zdHlsZXNcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicGF0aFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyYy1zbGlkZXIvbGliL1JhbmdlXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0LWRvbS9zZXJ2ZXJcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhY3QtaW5maW5pdGUtc2Nyb2xsZXJcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhY3QtanNzL2xpYi9Kc3NQcm92aWRlclwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdC1qc3MvbGliL2pzc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdC1yZWR1eFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdC1yb3V0ZXJcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhY3Qtcm91dGVyLWRvbVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdC10cmFuc2l0aW9uLWdyb3VwXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlZHV4XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlZHV4LWxvZ2dlclwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWR1eC10aHVua1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ1bml2ZXJzYWwtY29va2llXCIpOyJdLCJzb3VyY2VSb290IjoiIn0=