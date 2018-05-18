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

	let lat = 77.0266;
	let long = 28.4595;
	if (searchState.selectedLocatio) {
		lat = searchState.selectedLocation.geometry.location.lat;
		long = searchState.selectedLocation.geometry.location.lng;
	}
	let min_distance = filterCriteria.distanceRange[0];
	let max_distance = filterCriteria.distanceRange[1];
	let min_price = filterCriteria.priceRange[0];
	let max_price = filterCriteria.priceRange[1];
	let order_by = filterCriteria.sortBy;

	let url = `/diagnostic/v1/lablist?ids=${testIds}&lat=${lat}&long=${long}&min_distance=${min_distance}&max_distance=${max_distance}&min_price=${min_price}&max_price=${max_price}&order_by=${order_by}`;

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
	let url = `/diagnostic/v1/lablist/${labId}`;

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

    (0, _api.API_GET)('/diagnostic/v1/search-pg').then(function (response) {
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
    (0, _api.API_GET)(`/diagnostic/v1/test?name=${searchString}`).then(function (response) {
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
                        "SRL Dignostics"
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
                            "Total Rs 1354"
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

    render() {

        return _react2.default.createElement(
            'div',
            { className: 'widget-content pb-details pb-test' },
            _react2.default.createElement(
                'h4',
                { className: 'wc-title text-md fw-700' },
                'Tests (28)'
            ),
            _react2.default.createElement(
                'ul',
                { className: 'list pb-list pb-test-list' },
                _react2.default.createElement(
                    'li',
                    null,
                    'ACID PHOSPHATASE TOTAL ',
                    _react2.default.createElement(
                        'span',
                        { className: 'test-price' },
                        'Rs 200'
                    )
                ),
                _react2.default.createElement(
                    'li',
                    null,
                    'ACID PHOSPHATASE TOTAL ',
                    _react2.default.createElement(
                        'span',
                        { className: 'test-price' },
                        'Rs 200'
                    )
                ),
                _react2.default.createElement(
                    'li',
                    null,
                    'ACID PHOSPHATASE TOTAL ',
                    _react2.default.createElement(
                        'span',
                        { className: 'test-price' },
                        'Rs 200'
                    )
                )
            ),
            _react2.default.createElement(
                'div',
                { className: 'pb-view text-right' },
                _react2.default.createElement(
                    'a',
                    { href: '#', className: 'link-text text-md fw-700' },
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
            ) : this.props.children
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
            this.props.LABS[this.state.selectedLab] ? _react2.default.createElement(
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
                _react2.default.createElement('div', { className: 'skin-primary empty-header ' }),
                _react2.default.createElement(_index2.default, _extends({}, this.props, { data: this.props.LABS[this.state.selectedLab] })),
                _react2.default.createElement(
                    'button',
                    { className: 'v-btn v-btn-primary btn-lg fixed horizontal bottom no-round btn-lg text-lg' },
                    _react2.default.createElement(
                        'span',
                        { className: 'text-xs selected-option' },
                        '(2 Selected) '
                    ),
                    'Book'
                )
            ) : ""
        );
    }
}

LabView.contextTypes = {
    router: () => null
};
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
                this.props,
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

        this.getLabList(searchState, filterState, false);
    }

    render() {

        return _react2.default.createElement(
            'div',
            { className: 'searchResults' },
            this.props.LOADED_LABS_SEARCH ? _react2.default.createElement(
                _criteriaSearch2.default,
                this.props,
                _react2.default.createElement(_topBar2.default, _extends({}, this.props, { applyFilters: this.applyFilters.bind(this) })),
                _react2.default.createElement(_index2.default, this.props)
            ) : ""
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
            this.applyFilters();
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
                    onClose: this.handleClose.bind(this)
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

const mapStateToProps = state => {

    let LABS = state.LABS;

    return {
        LABS
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getLabById: labId => dispatch((0, _index.getLabById)(labId)),
        getLabTimeSlots: (labId, testIds, callback) => dispatch((0, _index.getLabTimeSlots)(labId, testIds, callback))
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

        if (this.props.LOADED_SEARCH_CRITERIA_LAB) {
            return _react2.default.createElement(_index3.default, this.props);
        } else {
            return "";
        }
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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const routes = [{ path: '/', exact: true, component: _SearchCriteria2.default }, { path: '/locationsearch', exact: true, component: _LocationSearch2.default }, { path: '/criteriasearch', exact: true, component: _CriteriaSearch2.default }, { path: '/searchresults', exact: true, component: _SearchResults2.default }, { path: '/searchresults/filter', exact: true, component: _SearchResultsFilter2.default }, { path: '/doctorprofile/:id', exact: true, component: _DoctorProfile2.default }, { path: '/doctorprofile/:id/availability', exact: true, component: _ClinicList2.default }, { path: '/doctorprofile/:id/:clinicId/book', exact: true, component: _AppointmentSlot2.default }, { path: '/doctorprofile/:id/:clinicId/bookdetails', exact: true, component: _PatientDetails2.default }, { path: '/user', exact: true, component: _UserProfile2.default }, { path: '/user/:id', exact: true, component: _UserProfile2.default }, { path: '/user/:id/appointments', exact: true, component: _UserAppointments2.default }, { path: '/user/:id/reports', exact: true, component: _UserReports2.default }, { path: '/chat', exact: true, component: _Chat2.default }, { path: '/payment', exact: true, component: _Payment2.default }, { path: '/booking/:refId', exact: true, component: _Booking2.default }, { path: '/dx', exact: true, component: _SearchCriteria4.default }, { path: '/dx/searchresults', exact: true, component: _SearchResults4.default }, { path: '/lab/:id/book', exact: true, component: _Lab2.default }, { path: '/lab/:id/bookdetails', exact: true, component: _PatientDetails4.default }, { path: '/lab/booking/summary/:id', exact: true, component: _BookingSummary2.default }];

class RouterConfig extends _react.Component {

    render() {
        return _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
                _reactRouterDom.Switch,
                null,
                routes.map((route, i) => _react2.default.createElement(_reactRouterDom.Route, _extends({}, route, { key: i })))
            )
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2FjdGlvbnMvY29tbW9ucy91c2VyLmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9hY3Rpb25zL2RpYWdub3Npcy9sYWJTZWFyY2guanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2FjdGlvbnMvZGlhZ25vc2lzL3NlYXJjaENyaXRlcmlhLmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9hY3Rpb25zL2luZGV4LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9hY3Rpb25zL29wZC9kb2N0b3JTZWFyY2guanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2FjdGlvbnMvb3BkL3NlYXJjaENyaXRlcmlhLmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9hcGkvYXBpLmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL2NvbW1vbnMvY2hhdC9DaGF0Vmlldy5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9jb21tb25zL2NoYXQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvY29tbW9ucy9wcm9maWxlU2xpZGVyL1Byb2ZpbGVTbGlkZXIuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvY29tbW9ucy9wcm9maWxlU2xpZGVyL2luZGV4LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL2NvbW1vbnMvdGltZVNsb3RTZWxlY3Rvci9UaW1lU2xvdFNlbGVjdG9yLmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL2NvbW1vbnMvdGltZVNsb3RTZWxlY3Rvci9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9jb21tb25zL3VzZXJBcHBvaW50bWVudHMvVXNlckFwcG9pbnRtZW50c1ZpZXcuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvY29tbW9ucy91c2VyQXBwb2ludG1lbnRzL2FwcG9pbnRtZW50TGlzdC9BcHBvaW50bWVudExpc3QuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvY29tbW9ucy91c2VyQXBwb2ludG1lbnRzL2FwcG9pbnRtZW50TGlzdC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9jb21tb25zL3VzZXJBcHBvaW50bWVudHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvY29tbW9ucy91c2VyUHJvZmlsZS9Vc2VyUHJvZmlsZVZpZXcuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvY29tbW9ucy91c2VyUHJvZmlsZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9jb21tb25zL3VzZXJQcm9maWxlL3Byb2ZpbGVEYXRhL1Byb2ZpbGVEYXRhLmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL2NvbW1vbnMvdXNlclByb2ZpbGUvcHJvZmlsZURhdGEvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvY29tbW9ucy91c2VyUmVwb3J0cy9Vc2VyUmVwb3J0c1ZpZXcuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvY29tbW9ucy91c2VyUmVwb3J0cy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9jb21tb25zL3VzZXJSZXBvcnRzL3JlcG9ydExpc3QvUmVwb3J0TGlzdC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9jb21tb25zL3VzZXJSZXBvcnRzL3JlcG9ydExpc3QvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvZGlhZ25vc2lzL2Jvb2tpbmdTdW1tYXJ5L0Jvb2tpbmdTdW1tYXJ5Vmlldy5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9kaWFnbm9zaXMvYm9va2luZ1N1bW1hcnkvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvZGlhZ25vc2lzL2NvbW1vbnMvY29tbW9ubHlTZWFyY2hlZC9Db21tb25seVNlYXJjaGVkLmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL2RpYWdub3Npcy9jb21tb25zL2NvbW1vbmx5U2VhcmNoZWQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvZGlhZ25vc2lzL2NvbW1vbnMvbGFiRGV0YWlscy9MYWJEZXRhaWwuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvZGlhZ25vc2lzL2NvbW1vbnMvbGFiRGV0YWlscy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9kaWFnbm9zaXMvY29tbW9ucy9sYWJQcm9maWxlQ2FyZC9MYWJQcm9maWxlQ2FyZC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9kaWFnbm9zaXMvY29tbW9ucy9sYWJQcm9maWxlQ2FyZC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9kaWFnbm9zaXMvY29tbW9ucy9sYWJUZXN0cy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9kaWFnbm9zaXMvY29tbW9ucy9sYWJUZXN0cy9sYWJUZXN0cy5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9kaWFnbm9zaXMvY29tbW9ucy9vcmRlckRldGFpbHMvT3JkZXJEZXRhaWxzLmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL2RpYWdub3Npcy9jb21tb25zL29yZGVyRGV0YWlscy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9kaWFnbm9zaXMvY3JpdGVyaWFTZWFyY2gvQ3JpdGVyaWFTZWFyY2hWaWV3LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL2RpYWdub3Npcy9jcml0ZXJpYVNlYXJjaC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9kaWFnbm9zaXMvbGFiL0xhYlZpZXcuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvZGlhZ25vc2lzL2xhYi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9kaWFnbm9zaXMvcGF0aWVudERldGFpbHMvUGF0aWVudERldGFpbHNWaWV3LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL2RpYWdub3Npcy9wYXRpZW50RGV0YWlscy9hZGRyZXNzRm9ybS9BZGRyZXNzRm9ybS5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9kaWFnbm9zaXMvcGF0aWVudERldGFpbHMvYWRkcmVzc0Zvcm0vaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvZGlhZ25vc2lzL3BhdGllbnREZXRhaWxzL2RldGFpbHNGb3JtL0RldGFpbHNGb3JtLmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL2RpYWdub3Npcy9wYXRpZW50RGV0YWlscy9kZXRhaWxzRm9ybS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9kaWFnbm9zaXMvcGF0aWVudERldGFpbHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvZGlhZ25vc2lzL3NlYXJjaENyaXRlcmlhL1NlYXJjaENyaXRlcmlhVmlldy5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9kaWFnbm9zaXMvc2VhcmNoQ3JpdGVyaWEvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvZGlhZ25vc2lzL3NlYXJjaFJlc3VsdHMvU2VhcmNoUmVzdWx0c1ZpZXcuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvZGlhZ25vc2lzL3NlYXJjaFJlc3VsdHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvZGlhZ25vc2lzL3NlYXJjaFJlc3VsdHMvbGFic0xpc3QvTGFic0xpc3QuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvZGlhZ25vc2lzL3NlYXJjaFJlc3VsdHMvbGFic0xpc3QvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvZGlhZ25vc2lzL3NlYXJjaFJlc3VsdHMvdG9wQmFyL1RvcEJhci5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9kaWFnbm9zaXMvc2VhcmNoUmVzdWx0cy90b3BCYXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvb3BkL2FwcG9pbnRtZW50U2xvdC9BcHBvaW50bWVudFNsb3QuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvb3BkL2FwcG9pbnRtZW50U2xvdC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9vcGQvYm9va2luZy9Cb29raW5nVmlldy5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9vcGQvY2xpbmljTGlzdC9DbGluaWNMaXN0Vmlldy5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9vcGQvY2xpbmljTGlzdC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9vcGQvY29tbW9ucy9jbGluaWNTZWxlY3Rvci9DbGluaWNTZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9vcGQvY29tbW9ucy9jbGluaWNTZWxlY3Rvci9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9vcGQvY29tbW9ucy9jb21tb25seVNlYXJjaGVkL0NvbW1vbmx5U2VhcmNoZWQuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvb3BkL2NvbW1vbnMvY29tbW9ubHlTZWFyY2hlZC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9vcGQvY29tbW9ucy9jcml0ZXJpYVNlbGVjdG9yL0NyaXRlcmlhU2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvb3BkL2NvbW1vbnMvY3JpdGVyaWFTZWxlY3Rvci9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9vcGQvY29tbW9ucy9kb2N0b3JQcm9maWxlQ2FyZC9Eb2N0b3JQcm9maWxlQ2FyZC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9vcGQvY29tbW9ucy9kb2N0b3JQcm9maWxlQ2FyZC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9vcGQvY29tbW9ucy9zZWxlY3RlZENsaW5pYy9TZWxlY3RlZENsaW5pYy5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9vcGQvY29tbW9ucy9zZWxlY3RlZENsaW5pYy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9vcGQvY3JpdGVyaWFTZWFyY2gvQ3JpdGVyaWFTZWFyY2hWaWV3LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL29wZC9jcml0ZXJpYVNlYXJjaC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9vcGQvZG9jdG9yUHJvZmlsZS9Eb2N0b3JQcm9maWxlVmlldy5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9vcGQvZG9jdG9yUHJvZmlsZS9hYm91dERvY3Rvci9BYm91dERvY3Rvci5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9vcGQvZG9jdG9yUHJvZmlsZS9hYm91dERvY3Rvci9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9vcGQvZG9jdG9yUHJvZmlsZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9vcGQvZG9jdG9yUHJvZmlsZS9wcm9mZXNzaW9uYWxHcmFwaC9Qcm9mZXNzaW9uYWxHcmFwaC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9vcGQvZG9jdG9yUHJvZmlsZS9wcm9mZXNzaW9uYWxHcmFwaC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9vcGQvbG9jYXRpb25TZWFyY2gvTG9jYXRpb25TZWFyY2guanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvb3BkL2xvY2F0aW9uU2VhcmNoL2luZGV4LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL29wZC9wYXRpZW50RGV0YWlscy9QYXRpZW50RGV0YWlscy5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9vcGQvcGF0aWVudERldGFpbHMvZGV0YWlsc0Zvcm0vRGV0YWlsc0Zvcm0uanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvb3BkL3BhdGllbnREZXRhaWxzL2RldGFpbHNGb3JtL2luZGV4LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL29wZC9wYXRpZW50RGV0YWlscy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9vcGQvcGF5bWVudC9QYXltZW50Vmlldy5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9vcGQvc2VhcmNoQ3JpdGVyaWEvU2VhcmNoQ3JpdGVyaWFWaWV3LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL29wZC9zZWFyY2hDcml0ZXJpYS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9vcGQvc2VhcmNoUmVzdWx0cy9TZWFyY2hSZXN1bHRzVmlldy5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9vcGQvc2VhcmNoUmVzdWx0cy9kb2N0b3JzTGlzdC9Eb2N0b3JzTGlzdC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9vcGQvc2VhcmNoUmVzdWx0cy9kb2N0b3JzTGlzdC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9vcGQvc2VhcmNoUmVzdWx0cy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9vcGQvc2VhcmNoUmVzdWx0cy90b3BCYXIvVG9wQmFyLmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL29wZC9zZWFyY2hSZXN1bHRzL3RvcEJhci9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9vcGQvc2VhcmNoUmVzdWx0c0ZpbHRlci9TZWFyY2hSZXN1bHRzRmlsdGVyLmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL29wZC9zZWFyY2hSZXN1bHRzRmlsdGVyL2luZGV4LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb25zdGFudHMvdHlwZXMuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbnRhaW5lcnMvY29tbW9ucy9DaGF0LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb250YWluZXJzL2NvbW1vbnMvVXNlckFwcG9pbnRtZW50cy5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29udGFpbmVycy9jb21tb25zL1VzZXJQcm9maWxlLmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb250YWluZXJzL2NvbW1vbnMvVXNlclJlcG9ydHMuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbnRhaW5lcnMvZGlhZ25vc2lzL0Jvb2tpbmdTdW1tYXJ5LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb250YWluZXJzL2RpYWdub3Npcy9MYWIuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbnRhaW5lcnMvZGlhZ25vc2lzL1BhdGllbnREZXRhaWxzLmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb250YWluZXJzL2RpYWdub3Npcy9TZWFyY2hDcml0ZXJpYS5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29udGFpbmVycy9kaWFnbm9zaXMvU2VhcmNoUmVzdWx0cy5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29udGFpbmVycy9vcGQvQXBwb2ludG1lbnRTbG90LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb250YWluZXJzL29wZC9Cb29raW5nLmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb250YWluZXJzL29wZC9DbGluaWNMaXN0LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb250YWluZXJzL29wZC9Dcml0ZXJpYVNlYXJjaC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29udGFpbmVycy9vcGQvRG9jdG9yUHJvZmlsZS5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29udGFpbmVycy9vcGQvTG9jYXRpb25TZWFyY2guanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbnRhaW5lcnMvb3BkL1BhdGllbnREZXRhaWxzLmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb250YWluZXJzL29wZC9QYXltZW50LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb250YWluZXJzL29wZC9TZWFyY2hDcml0ZXJpYS5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29udGFpbmVycy9vcGQvU2VhcmNoUmVzdWx0cy5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29udGFpbmVycy9vcGQvU2VhcmNoUmVzdWx0c0ZpbHRlci5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvaGVscGVycy9uYXZpZ2F0ZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvaGVscGVycy9uYXZpZ2F0ZS9uYXZpZ2F0ZS5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvaGVscGVycy9zdG9yYWdlL2luZGV4LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9oZWxwZXJzL3N0b3JhZ2Uvc3RvcmFnZS5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvcmVkdWNlcnMvY29tbW9ucy91c2VyLmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9yZWR1Y2Vycy9kaWFnbm9zaXMvbGFicy5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvcmVkdWNlcnMvZGlhZ25vc2lzL2xhYnNTZWFyY2guanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL3JlZHVjZXJzL2RpYWdub3Npcy9zZWFyY2hDcml0ZXJpYS5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvcmVkdWNlcnMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL3JlZHVjZXJzL29wZC9kb2N0b3JTZWFyY2guanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL3JlZHVjZXJzL29wZC9kb2N0b3JzLmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9yZWR1Y2Vycy9vcGQvc2VhcmNoQ3JpdGVyaWEuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL3JvdXRlcy5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvdXRpbHMvZGF0ZVRpbWVVdGlscy5qcyIsIndlYnBhY2s6Ly8vLi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJheGlvc1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcImV4cHJlc3NcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJodHRwXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibWF0ZXJpYWwtdWktaWNvbnMvQWNjb3VudENpcmNsZVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIm1hdGVyaWFsLXVpLWljb25zL0F0dGFjaE1vbmV5XCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibWF0ZXJpYWwtdWktaWNvbnMvQXZUaW1lclwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIm1hdGVyaWFsLXVpLWljb25zL0NhbGxcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJtYXRlcmlhbC11aS1pY29ucy9FeHBhbmRNb3JlXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibWF0ZXJpYWwtdWktaWNvbnMvRmlsdGVyTGlzdFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIm1hdGVyaWFsLXVpLWljb25zL0hvbWVcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJtYXRlcmlhbC11aS1pY29ucy9LZXlib2FyZEFycm93UmlnaHRcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJtYXRlcmlhbC11aS1pY29ucy9Mb2NhdGlvbk9uXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibWF0ZXJpYWwtdWktaWNvbnMvUGF5bWVudFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIm1hdGVyaWFsLXVpLWljb25zL1NvcnRcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJtYXRlcmlhbC11aS9DaGVja2JveFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIm1hdGVyaWFsLXVpL0NoaXBcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJtYXRlcmlhbC11aS9FeHBhbnNpb25QYW5lbFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIm1hdGVyaWFsLXVpL0Zvcm1cIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJtYXRlcmlhbC11aS9NZW51XCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibWF0ZXJpYWwtdWkvUmFkaW9cIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJtYXRlcmlhbC11aS9TdGVwcGVyXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibWF0ZXJpYWwtdWkvc3R5bGVzXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicGF0aFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInJjLXNsaWRlci9saWIvUmFuZ2VcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWFjdFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInJlYWN0LWRvbS9zZXJ2ZXJcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWFjdC1pbmZpbml0ZS1zY3JvbGxlclwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInJlYWN0LWpzcy9saWIvSnNzUHJvdmlkZXJcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWFjdC1qc3MvbGliL2pzc1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcInJlYWN0LXJlZHV4XCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVhY3Qtcm91dGVyXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVhY3Qtcm91dGVyLWRvbVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInJlZHV4XCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVkdXgtbG9nZ2VyXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVkdXgtdGh1bmtcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ1bml2ZXJzYWwtY29va2llXCIiXSwibmFtZXMiOlsiZ2V0VXNlclByb2ZpbGUiLCJkaXNwYXRjaCIsInRoZW4iLCJyZXNwb25zZSIsInR5cGUiLCJwYXlsb2FkIiwicHJvZmlsZXMiLCJjYXRjaCIsImVycm9yIiwiZ2V0VXNlclByb2ZpbGVXaXRoQXBwb2ludG1lbnRzIiwiZ2V0VXNlclByb2ZpbGVXaXRoVGVzdHMiLCJnZXRMYWJzIiwic2VhcmNoU3RhdGUiLCJmaWx0ZXJDcml0ZXJpYSIsIm1lcmdlU3RhdGUiLCJ0ZXN0SWRzIiwic2VsZWN0ZWRDcml0ZXJpYXMiLCJmaWx0ZXIiLCJ4IiwicmVkdWNlIiwiZmluYWxTdHIiLCJjdXJyIiwiaSIsImlkIiwibGF0IiwibG9uZyIsInNlbGVjdGVkTG9jYXRpbyIsInNlbGVjdGVkTG9jYXRpb24iLCJnZW9tZXRyeSIsImxvY2F0aW9uIiwibG5nIiwibWluX2Rpc3RhbmNlIiwiZGlzdGFuY2VSYW5nZSIsIm1heF9kaXN0YW5jZSIsIm1pbl9wcmljZSIsInByaWNlUmFuZ2UiLCJtYXhfcHJpY2UiLCJvcmRlcl9ieSIsInNvcnRCeSIsInVybCIsImdldExhYkJ5SWQiLCJsYWJJZCIsImdldExhYlRpbWVTbG90cyIsImNhbGxiYWNrIiwiZ2V0TGFiQm9va2luZ1N1bW1hcnkiLCJib29raW5nSWQiLCJsb2FkTGFiQ29tbW9uQ3JpdGVyaWFzIiwidG9nZ2xlRGlhZ25vc2lzQ3JpdGVyaWEiLCJjcml0ZXJpYSIsImdldERpYWdub3Npc0NyaXRlcmlhUmVzdWx0cyIsInNlYXJjaFN0cmluZyIsIlNFQVJDSF9DUklURVJJQV9PUEQiLCJTRUFSQ0hfQ1JJVEVSSUFfTEFCUyIsIkRPQ1RPUlNfQUNUSU9OUyIsIkxBQlNfQUNUSU9OUyIsIlVTRVJfQUNUSU9OUyIsIm1vZHVsZSIsImV4cG9ydHMiLCJPYmplY3QiLCJhc3NpZ24iLCJnZXREb2N0b3JzIiwiZmlsdGVyU3RhdGUiLCJkb2N0b3JzIiwic2VhcmNoU3RhdGVQYXJhbSIsImVuY29kZVVSSUNvbXBvbmVudCIsIkpTT04iLCJzdHJpbmdpZnkiLCJmaWx0ZXJTdGF0ZVBhcmFtIiwiaGlzdG9yeSIsInJlcGxhY2VTdGF0ZSIsImdldERvY3RvckJ5SWQiLCJkb2N0b3JJZCIsImRvY3RvciIsImRvYyIsImdldFRpbWVTbG90cyIsImNsaW5pY0lkIiwibG9hZFNlYXJjaENyaXRlcmlhIiwidG9nZ2xlQ29uZGl0aW9uIiwidG9nZ2xlU3BlY2lhbGl0eSIsInRvZ2dsZUNyaXRlcmlhIiwic2VsZWN0TG9jYXRpb24iLCJtZXJnZVNlYXJjaFN0YXRlIiwic3RhdGUiLCJnZXRDcml0ZXJpYVJlc3VsdHMiLCJzZXRPUERGaWx0ZXJzIiwiZmlsdGVyRGF0YSIsImF4aW9zSW5zdGFuY2UiLCJjcmVhdGUiLCJiYXNlVVJMIiwiaGVhZGVyIiwicmVqZWN0SGFuZGxlciIsIkFQSV9HRVQiLCJnZXRBdXRoVG9rZW4iLCJ0b2tlbiIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwibWV0aG9kIiwiaGVhZGVycyIsInJlcyIsImRhdGEiLCJBUElfUE9TVCIsIkFQSV9QVVQiLCJBUElfREVMRVRFIiwiSWZyYW1TdHlsZSIsIndpZHRoIiwiaGVpZ2h0IiwiQ2hhdFZpZXciLCJDb21wb25lbnQiLCJjb25zdHJ1Y3RvciIsInByb3BzIiwicmVuZGVyIiwiY29udGV4dFR5cGVzIiwicm91dGVyIiwiUHJvZmlsZVNsaWRlciIsInN3aXRjaFVzZXIiLCJwcm9maWxlSWQiLCJjb250ZXh0IiwicHVzaCIsInN1YlJvdXRlIiwia2V5cyIsIm1hcCIsInNyYyIsInByb2ZpbGVJbWFnZSIsImJpbmQiLCJUaW1lU2xvdFNlbGVjdG9yIiwic2VsZWN0ZWREYXkiLCJzZWxlY3RlZEludGVydmFsIiwic2VsZWN0ZWRUaW1lU2xvdCIsImNvbXBvbmVudFdpbGxNb3VudCIsInRpbWVTbG90cyIsInNldERlZmF1bHRTZWxlY3RlZCIsImRheXMiLCJkYXRlcyIsImRlZmF1bHREYXlJbmRleCIsImdldEZpcnN0QXZhaWxhYmxlRGF5Iiwic2V0U3RhdGUiLCJkZWZhdXRJbnRlcndhbEluZGV4IiwiZ2V0Rmlyc3RBdmFpbGFibGVJbnRlcndhbCIsImludGVydmFscyIsImRlZmF1bHRUaW1lU2xvdEluZGV4IiwiZ2V0Rmlyc3RBdmFpbGFibGVUaW1lU2xvdCIsImludGVyd2FsSW5kZXgiLCJpbnRlcndhbCIsImlzQXZhaWxhYmxlIiwicGFyc2VJbnQiLCJ0aW1lU2xvdEluZGV4IiwidGltZVNsb3QiLCJzZWxlY3RUaW1lU2xvdCIsImRheUluZGV4IiwiZGF5Iiwib25EYXRlQ2xpY2siLCJkYXRlIiwic2VsZWN0ZWRJbmRleCIsImluZGV4IiwiYXZhaWxhYmxlSW50ZXJ3YWwiLCJhdmFpbGFibGVUaW1lU2xvdCIsIm9uSW50ZXJ2YWxDbGljayIsIm9uVGltZVNsb3RDbGljayIsImRhdGVMaXN0IiwiZGF5RGF0ZSIsIkRhdGUiLCJnZXREYXRlIiwiZGF5TmFtZSIsInNlbGVjdGVkIiwiaW50ZXJ2YWwiLCJuYW1lIiwic2xvdCIsInNsb3RUZXh0Iiwic3RhcnQiLCJlbmQiLCJVc2VyQXBwb2ludG1lbnRzVmlldyIsImNvbXBvbmVudERpZE1vdW50IiwiY29tcGFyZURhdGVXaXRoVG9kYXkiLCJ0b2RheSIsImdldFRpbWUiLCJzZWxlY3RlZFVzZXIiLCJ1c2VyUHJvZmlsZUlkIiwibWF0Y2giLCJwYXJhbXMiLCJVU0VSIiwiaXNEZWZhdWx0VXNlciIsImFwcG9pbnRtZW50cyIsImFwcG9pbnRtZW50IiwiQXBwb2ludG1lbnRMaXN0IiwidW5peF90aW1lc3RhbXAiLCJob3VycyIsImdldEhvdXJzIiwibWludXRlcyIsImdldE1pbnV0ZXMiLCJzdWJzdHIiLCJkb2N0b3JOYW1lIiwidG9EYXRlU3RyaW5nIiwiVXNlclByb2ZpbGVWaWV3IiwiUHJvZmlsZURhdGEiLCJvcGVuQXBwb2ludG1lbnRzIiwib3BlblJlcG9ydHMiLCJnZW5kZXIiLCJhZ2UiLCJtb2JpbGUiLCJtZWRpY2FsSGlzdG9yeUNvdW50IiwibWVkaWNhbFRlc3RDb3VudCIsIm9ubGluZUNvbnN1bHRhdGlvbkNvdW50Iiwib3BkVmlzaXRDb3VudCIsInByb2ZpbGVEYXRhIiwiVXNlclJlcG9ydHNWaWV3IiwidGVzdHMiLCJ0ZXN0IiwiUmVwb3J0TGlzdCIsInN1Yl9uYW1lIiwiYWJicmV2aWF0aW9uIiwiY2F0ZWdvcnkiLCJCb29raW5nU3VtbWFyeVZpZXciLCJib29raW5nRGV0YWlscyIsImdldExvY2F0aW9uUGFyYW0iLCJ0YWciLCJwYXJhbVN0cmluZyIsInNlYXJjaCIsIlVSTFNlYXJjaFBhcmFtcyIsImdldCIsInByb2NlZWQiLCJsYWIiLCJzZWxlY3RlZFNsb3RTdGFydCIsImZsb2F0IiwicGF0aWVudERldGFpbHMiLCJhZGRyZXNzIiwiQ29tbW9ubHlTZWFyY2hlZCIsInJvd3MiLCJyb3ciLCJ0b2dnbGUiLCJkaXZDbGFzcyIsInVsQ2xhc3MiLCJoZWFkaW5nIiwiTGFiRGV0YWlscyIsIkxhYlByb2ZpbGVDYXJkIiwib3BlbkxhYiIsImRldGFpbHMiLCJMYWJUZXN0cyIsIk9yZGVyRGV0YWlscyIsInByaWNlX2JyZWFrdXAiLCJ0b3RhbFByaWNlIiwidG90YWxUZXN0cyIsImJyZWFrdXAiLCJhbW91bnQiLCJkZWJvdW5jZXIiLCJmbiIsImRlbGF5IiwidGltZXIiLCJjbGVhclRpbWVvdXQiLCJzZXRUaW1lb3V0IiwiY2FsbCIsIkNyaXRlcmlhU2VhcmNoVmlldyIsInNlYXJjaFZhbHVlIiwic2VhcmNoUmVzdWx0cyIsImdldFNlYXJjaFJlc3VsdHMiLCJpbnB1dCIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJmb2N1cyIsImlucHV0SGFuZGxlciIsImUiLCJ0YXJnZXQiLCJ2YWx1ZSIsImFkZENyaXRlcmlhIiwiZm9ybWF0dGVkX2FkZHJlc3MiLCJzbGljZSIsImdvIiwiY2hpbGRyZW4iLCJMYWJWaWV3Iiwic2VsZWN0ZWRMYWIiLCJMQUJTIiwiUGF0aWVudERldGFpbHNWaWV3Iiwic2VsZWN0ZWRUZXN0cyIsInNlbGVjdGVkU2xvdCIsInNlbGVjdGVkU2xvdEVuZCIsInBhcnNlRmxvYXQiLCJ0b1N0cmluZyIsIkFkZHJlc3NGb3JtIiwibG9jYWxpdHkiLCJsYW5kbWFyayIsInBpbmNvZGUiLCJjaXR5Iiwid2hpY2giLCJEZXRhaWxzRm9ybSIsInBhdGllbnROYW1lIiwicGF0aWVudEVtYWlsIiwicGF0aWVudEdlbmRlciIsIm90cCIsInBhdGllbnRNb2JpbGUiLCJTZWFyY2hDcml0ZXJpYVZpZXciLCJzZWFyY2hQcm9jZWVkIiwic2VhcmNoRGF0YSIsImNvbW1vbl90ZXN0cyIsImNvbW1vbl9jb25kaXRpb25zIiwicHJlZmVycmVkX2xhYnMiLCJTZWFyY2hSZXN1bHRzVmlldyIsIkxPQURFRF9TRUFSQ0hfQ1JJVEVSSUFfTEFCIiwicGFyc2UiLCJnZXRMYWJMaXN0IiwiY29uc29sZSIsImFwcGx5RmlsdGVycyIsInJlcGxhY2UiLCJMT0FERURfTEFCU19TRUFSQ0giLCJMYWJzTGlzdCIsImxhYkxpc3QiLCJUb3BCYXIiLCJhbmNob3JFbCIsIm9wZW5GaWx0ZXIiLCJjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzIiwiaGFuZGxlT3BlbiIsImV2ZW50IiwiY3VycmVudFRhcmdldCIsImhhbmRsZUNsb3NlIiwidG9nZ2xlRmlsdGVyIiwiaGFuZGxlUmFuZ2UiLCJyYW5nZSIsImdldENyaXRlcmlhU3RyaW5nIiwibGVuZ3RoIiwiZmluYWwiLCJjcml0ZXJpYVN0ciIsIkJvb2xlYW4iLCJzdG9wUHJvcGFnYXRpb24iLCJwcmV2ZW50RGVmYXVsdCIsIkFwcG9pbnRtZW50U2xvdCIsInNlbGVjdGVkRG9jdG9yIiwic2VsZWN0ZWRDbGluaWMiLCJET0NUT1JTIiwiQm9va2luZ1ZpZXciLCJDbGluaWNMaXN0VmlldyIsIkNsaW5pY1NlbGVjdG9yIiwic2VsZWN0Q2xpbmljIiwiZ2V0QXZhaWxhYmlsaXR5IiwiYXZhaWxhYmlsaXR5IiwibmV4dEF2YWlsYWJsZSIsImZyb20iLCJ0aW1lU3RhcnQiLCJ0aW1lRW5kIiwidG8iLCJmZWUiLCJjbGluaWMiLCJ0aW1lQXZhaWxhYmxlIiwicGlsbHMiLCJwaWxsIiwidG9nZ2xlUGlsbCIsIkNyaXRlcmlhU2VsZWN0b3IiLCJoYW5kbGVEZWxldGUiLCJoYW5kbGVyIiwiY29uZGl0aW9ucyIsInNwZWNpYWxpdGllcyIsImNyaXRlcmlhcyIsImNvbW1vbmx5U2VhcmNoZWRDb25kaXRpb25zIiwic2VsZWN0ZWRDb25kaXRpb25zIiwidHMiLCJjb21tb25seVNlYXJjaGVkU3BlY2lhbGl0aWVzIiwic2VsZWN0ZWRTcGVjaWFsaXRpZXMiLCJzZWxlY3RlZENyaXRlcmlhIiwic29ydCIsImEiLCJiIiwiZGF0ZUEiLCJkYXRlQiIsIkRvY3RvclByb2ZpbGVDYXJkIiwiY2FyZENsaWNrIiwiYm9va05vdyIsImdldFF1YWxpZmljYXRpb25TdHIiLCJxdWFsaWZpY2F0aW9uU3BlY2lhbGl6YXRpb24iLCJzdHIiLCJxdWFsaWZpY2F0aW9uIiwic3BlY2lhbGl6YXRpb24iLCJwcm9maWxlX2ltZyIsInByYWN0aWNlX2R1cmF0aW9uIiwiY29uc3VsdGF0aW9uQ291bnQiLCJwYXN0RXhwZXJpZW5jZSIsInF1YWxpZmljYXRpb25TdHJpbmciLCJoaWRlQm9va05vdyIsImhpZGVCb3R0b20iLCJTZWxlY3RlZENsaW5pYyIsImNsaW5pY0RhdGEiLCJyZXN1bHQiLCJnb0JhY2siLCJyZXN1bHREYXRhIiwiaiIsIkRvY3RvclByb2ZpbGVWaWV3IiwiQWJvdXREb2N0b3IiLCJQcm9mZXNzaW9uYWxHcmFwaCIsIkxvY2F0aW9uU2VhcmNoIiwiZ2V0TG9jYXRpb24iLCJhdXRvIiwiZ29vZ2xlIiwibWFwcyIsInBsYWNlcyIsIkF1dG9jb21wbGV0ZVNlcnZpY2UiLCJyZXF1ZXN0IiwidHlwZXMiLCJjb21wb25lbnRSZXN0cmljdGlvbnMiLCJjb3VudHJ5IiwiZ2V0UGxhY2VQcmVkaWN0aW9ucyIsInJlc3VsdHMiLCJzdGF0dXMiLCJNYXAiLCJjZW50ZXIiLCJ6b29tIiwic2VydmljZSIsIlBsYWNlc1NlcnZpY2UiLCJnZXREZXRhaWxzIiwicmVmZXJlbmNlIiwicGxhY2UiLCJkZXNjcmlwdGlvbiIsImRpc3BsYXkiLCJQYXRpZW50RGV0YWlscyIsIlBheW1lbnRWaWV3IiwiQ1JJVEVSSUFfTE9BREVEIiwiZ2V0RG9jdG9yTGlzdCIsIkxPQURJTkciLCJEb2N0b3JzTGlzdCIsImRvY3Rvckxpc3QiLCJkb2N0b3JWaWV3TGlzdCIsImRvY0lkIiwic2VsZWN0RG9jdG9yIiwicGF0aG5hbWUiLCJTZWFyY2hSZXN1bHRzRmlsdGVyIiwiZmVlXzAiLCJmZWVfMSIsImZlZV8yIiwiZmVlXzMiLCJjbGluaWNfcGVyc29uYWwiLCJjbGluaWNfaG9zcGl0YWwiLCJjbGluaWNfbXVsdGkiLCJhdmFpbGFibGVfdG9kYXkiLCJkaXN0YW5jZSIsImFwcGx5RmlsdGVyIiwiaGFuZGxlQ2hlY2tib3giLCJjaGVja2VkIiwiaGFuZGxlQ2hhbmdlUmFkaW8iLCJBUFBFTkRfRE9DVE9SUyIsIkRPQ1RPUl9TRUFSQ0giLCJTRUxFQ1RfRE9DVE9SIiwiVE9HR0xFX0NPTkRJVElPTlMiLCJUT0dHTEVfU1BFQ0lBTElUSUVTIiwiVE9HR0xFX1RFU1RTIiwiU0VMRUNUX0xPQ0FUSU9OIiwiTUVSR0VfU0VBUkNIX1NUQVRFX09QRCIsIlRPR0dMRV9DUklURVJJQSIsIlRPR0dMRV9ESUFHTk9TSVNfQ1JJVEVSSUEiLCJTRVRfT1BEX0ZJTFRFUlMiLCJTRVRfTEFCU19GSUxURVJTIiwiTE9BRF9TRUFSQ0hfQ1JJVEVSSUFfT1BEIiwiTUVSR0VfU0VBUkNIX1NUQVRFX0xBQiIsIkxPQURfU0VBUkNIX0NSSVRFUklBX0xBQiIsIkFQUEVORF9MQUJTIiwiTEFCX1NFQVJDSCIsIlNFTEVDVF9MT0NBVElPTl9ESUFHTk9TSVMiLCJBUFBFTkRfRklMVEVSU19ESUFHTk9TSVMiLCJMQUJfU0VBUkNIX1NUQVJUIiwiQVBQRU5EX1VTRVJfUFJPRklMRVMiLCJDaGF0IiwibWFwU3RhdGVUb1Byb3BzIiwibWFwRGlzcGF0Y2hUb1Byb3BzIiwiVXNlckFwcG9pbnRtZW50cyIsIlVzZXJQcm9maWxlIiwiVXNlclJlcG9ydHMiLCJCb29raW5nU3VtbWFyeSIsIkxhYiIsIlNlYXJjaENyaXRlcmlhIiwiU2VhcmNoUmVzdWx0cyIsIkJvb2tpbmciLCJDbGluaWNMaXN0IiwiQ3JpdGVyaWFTZWFyY2giLCJjYiIsIkRvY3RvclByb2ZpbGUiLCJQYXltZW50IiwiRVJST1IiLCJOQVZJR0FURSIsIm5hdmlnYXRlVG8iLCJ3aGVyZSIsIndpbmRvdyIsImhyZWYiLCJyZWZyZXNoQXBwb2ludG1lbnRTdGF0ZSIsIm5vQXBwb2ludG1lbnRGb3VuZCIsInVwY29taW5nIiwicHJldmlvdXMiLCJhY3Rpb24iLCJjb29raWVzIiwiU1RPUkFHRSIsInNldEF1dGhUb2tlbiIsInNldCIsImNoZWNrQXV0aCIsImRlbGV0ZUF1dGgiLCJyZW1vdmUiLCJkZWZhdWx0U3RhdGUiLCJuZXdTdGF0ZSIsInByb2ZpbGVNYXAiLCJwcm9maWxlIiwibGFwTWFwIiwiY29uY2F0IiwiZm91bmQiLCJhbGxSZWR1Y2VycyIsImRvY3Rvck1hcCIsInJvdXRlcyIsInBhdGgiLCJleGFjdCIsImNvbXBvbmVudCIsIlJvdXRlckNvbmZpZyIsInJvdXRlIiwiUk9VVEVTIiwidGltZVN0YW1wIiwiZ2V0RGF5TmFtZSIsImdldERheSIsInJlcXVpcmUiLCJodHRwIiwiRXhwcmVzcyIsImFwcCIsInNlcnZlciIsIlNlcnZlciIsInVzZSIsInN0YXRpYyIsImpvaW4iLCJfX2Rpcm5hbWUiLCJyZXEiLCJzdG9yZSIsInNoZWV0c1JlZ2lzdHJ5IiwidGhlbWUiLCJwYWxldHRlIiwicHJpbWFyeSIsIm1haW4iLCJzZWNvbmRhcnkiLCJkYW5nZXIiLCJnZW5lcmF0ZUNsYXNzTmFtZSIsImh0bWwiLCJyZW5kZXJUb1N0cmluZyIsImNzcyIsIndyaXRlSGVhZCIsIkxvY2F0aW9uIiwicHJvbWlzZXMiLCJzb21lIiwibG9hZERhdGEiLCJhbGwiLCJzZW5kRmlsZSIsInJvb3QiLCJsaXN0ZW4iLCJlcnIiLCJpbmZvIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDekVBOztBQUNBOztBQUdPLE1BQU1BLDBDQUFpQixNQUFPQyxRQUFELElBQWM7QUFDakQsbUJBQVEsWUFBUixFQUFzQkMsSUFBdEIsQ0FBMkIsVUFBVUMsUUFBVixFQUFvQjs7QUFFOUNGLFdBQVM7QUFDUkcsb0NBRFE7QUFFUkMsWUFBU0YsU0FBU0c7QUFGVixHQUFUO0FBS0EsRUFQRCxFQU9HQyxLQVBILENBT1MsVUFBVUMsS0FBVixFQUFpQixDQUV6QixDQVREO0FBVUEsQ0FYTTs7QUFhQSxNQUFNQywwRUFBaUMsTUFBT1IsUUFBRCxJQUFjO0FBQ2pFLG1C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Ozs7Ozs7QUNBQSxpRTs7Ozs7Ozs7Ozs7QUNBQSx5RDs7Ozs7Ozs7Ozs7QUNBQSxzRDs7Ozs7Ozs7Ozs7QUNBQSxtRDs7Ozs7Ozs7Ozs7QUNBQSxpRDs7Ozs7Ozs7Ozs7QUNBQSw2Qzs7Ozs7Ozs7Ozs7QUNBQSx1RDs7Ozs7Ozs7Ozs7QUNBQSw2Qzs7Ozs7Ozs7Ozs7QUNBQSw2Qzs7Ozs7Ozs7Ozs7QUNBQSw4Qzs7Ozs7Ozs7Ozs7QUNBQSxnRDs7Ozs7Ozs7Ozs7QUNBQSwrQzs7Ozs7Ozs7Ozs7QUNBQSxpQzs7Ozs7Ozs7Ozs7QUNBQSxnRDs7Ozs7Ozs7Ozs7QUNBQSxrQzs7Ozs7Ozs7Ozs7QUNBQSw2Qzs7Ozs7Ozs7Ozs7QUNBQSxvRDs7Ozs7Ozs7Ozs7QUNBQSxzRDs7Ozs7Ozs7Ozs7QUNBQSw4Qzs7Ozs7Ozs7Ozs7QUNBQSx3Qzs7Ozs7Ozs7Ozs7QUNBQSx5Qzs7Ozs7Ozs7Ozs7QUNBQSw2Qzs7Ozs7Ozs7Ozs7QUNBQSxrQzs7Ozs7Ozs7Ozs7QUNBQSx5Qzs7Ozs7Ozs7Ozs7QUNBQSx3Qzs7Ozs7Ozs7Ozs7QUNBQSw2QyIsImZpbGUiOiJzZXJ2ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIHdhc20gbW9kdWxlc1xuIFx0dmFyIGluc3RhbGxlZFdhc21Nb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9cIjtcblxuIFx0Ly8gb2JqZWN0IHdpdGggYWxsIGNvbXBpbGVkIFdlYkFzc2VtYmx5Lk1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18udyA9IHt9O1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL2luZGV4LmpzXCIpO1xuIiwiaW1wb3J0IHsgQVBQRU5EX1VTRVJfUFJPRklMRVMgfSBmcm9tICcuLi8uLi9jb25zdGFudHMvdHlwZXMnO1xuaW1wb3J0IHsgQVBJX0dFVCB9IGZyb20gJy4uLy4uL2FwaS9hcGkuanMnO1xuXG5cbmV4cG9ydCBjb25zdCBnZXRVc2VyUHJvZmlsZSA9ICgpID0+IChkaXNwYXRjaCkgPT4ge1xuXHRBUElfR0VUKCcvdXNlci5qc29uJykudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcblx0XHRcblx0XHRkaXNwYXRjaCh7XG5cdFx0XHR0eXBlOiBBUFBFTkRfVVNFUl9QUk9GSUxFUyxcblx0XHRcdHBheWxvYWQ6IHJlc3BvbnNlLnByb2ZpbGVzXG5cdFx0fSlcblxuXHR9KS5jYXRjaChmdW5jdGlvbiAoZXJyb3IpIHtcblxuXHR9KVxufVxuXG5leHBvcnQgY29uc3QgZ2V0VXNlclByb2ZpbGVXaXRoQXBwb2ludG1lbnRzID0gKCkgPT4gKGRpc3BhdGNoKSA9PiB7XG5cdEFQSV9HRVQoJy91c2VyX3Byb2ZpbGVfYXBwb2ludG1lbnRzLmpzb24nKS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuXHRcdFxuXHRcdGRpc3BhdGNoKHtcblx0XHRcdHR5cGU6IEFQUEVORF9VU0VSX1BST0ZJTEVTLFxuXHRcdFx0cGF5bG9hZDogcmVzcG9uc2UucHJvZmlsZXNcblx0XHR9KVxuXG5cdH0pLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xuXG5cdH0pXG59XG5cbmV4cG9ydCBjb25zdCBnZXRVc2VyUHJvZmlsZVdpdGhUZXN0cyA9ICgpID0+IChkaXNwYXRjaCkgPT4ge1xuXHRBUElfR0VUKCcvdXNlcl9wcm9maWxlX3Rlc3RzLmpzb24nKS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuXHRcdFxuXHRcdGRpc3BhdGNoKHtcblx0XHRcdHR5cGU6IEFQUEVORF9VU0VSX1BST0ZJTEVTLFxuXHRcdFx0cGF5bG9hZDogcmVzcG9uc2UucHJvZmlsZXNcblx0XHR9KVxuXG5cdH0pLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xuXG5cdH0pXG59XG5cbiIsImltcG9ydCB7IExBQl9TRUFSQ0hfU1RBUlQsIEFQUEVORF9MQUJTLCBMQUJfU0VBUkNILCBNRVJHRV9TRUFSQ0hfU1RBVEVfTEFCIH0gZnJvbSAnLi4vLi4vY29uc3RhbnRzL3R5cGVzJztcbmltcG9ydCB7IEFQSV9HRVQgfSBmcm9tICcuLi8uLi9hcGkvYXBpLmpzJztcblxuXG5leHBvcnQgY29uc3QgZ2V0TGFicyA9IChzZWFyY2hTdGF0ZSA9IHt9LCBmaWx0ZXJDcml0ZXJpYSA9IHt9LCBtZXJnZVN0YXRlID0gZmFsc2UpID0+IChkaXNwYXRjaCkgPT4ge1xuXG5cdGxldCB0ZXN0SWRzID0gc2VhcmNoU3RhdGUuc2VsZWN0ZWRDcml0ZXJpYXNcblx0XHQuZmlsdGVyKHggPT4geC50eXBlID09ICd0ZXN0Jylcblx0XHQucmVkdWNlKChmaW5hbFN0ciwgY3VyciwgaSkgPT4ge1xuXHRcdFx0aWYgKGkgIT0gMCkge1xuXHRcdFx0XHRmaW5hbFN0ciArPSAnLCdcblx0XHRcdH1cblx0XHRcdGZpbmFsU3RyICs9IGAke2N1cnIuaWR9YFxuXHRcdFx0cmV0dXJuIGZpbmFsU3RyXG5cdFx0fSwgXCJcIilcblxuXHRsZXQgbGF0ID0gNzcuMDI2NlxuXHRsZXQgbG9uZyA9IDI4LjQ1OTVcblx0aWYgKHNlYXJjaFN0YXRlLnNlbGVjdGVkTG9jYXRpbykge1xuXHRcdGxhdCA9IHNlYXJjaFN0YXRlLnNlbGVjdGVkTG9jYXRpb24uZ2VvbWV0cnkubG9jYXRpb24ubGF0XG5cdFx0bG9uZyA9IHNlYXJjaFN0YXRlLnNlbGVjdGVkTG9jYXRpb24uZ2VvbWV0cnkubG9jYXRpb24ubG5nXG5cdH1cblx0bGV0IG1pbl9kaXN0YW5jZSA9IGZpbHRlckNyaXRlcmlhLmRpc3RhbmNlUmFuZ2VbMF1cblx0bGV0IG1heF9kaXN0YW5jZSA9IGZpbHRlckNyaXRlcmlhLmRpc3RhbmNlUmFuZ2VbMV1cblx0bGV0IG1pbl9wcmljZSA9IGZpbHRlckNyaXRlcmlhLnByaWNlUmFuZ2VbMF1cblx0bGV0IG1heF9wcmljZSA9IGZpbHRlckNyaXRlcmlhLnByaWNlUmFuZ2VbMV1cblx0bGV0IG9yZGVyX2J5ID0gZmlsdGVyQ3JpdGVyaWEuc29ydEJ5XG5cblx0bGV0IHVybCA9IGAvZGlhZ25vc3RpYy92MS9sYWJsaXN0P2lkcz0ke3Rlc3RJZHN9JmxhdD0ke2xhdH0mbG9uZz0ke2xvbmd9Jm1pbl9kaXN0YW5jZT0ke21pbl9kaXN0YW5jZX0mbWF4X2Rpc3RhbmNlPSR7bWF4X2Rpc3RhbmNlfSZtaW5fcHJpY2U9JHttaW5fcHJpY2V9Jm1heF9wcmljZT0ke21heF9wcmljZX0mb3JkZXJfYnk9JHtvcmRlcl9ieX1gXG5cblx0ZGlzcGF0Y2goe1xuXHRcdHR5cGU6IExBQl9TRUFSQ0hfU1RBUlQsXG5cdFx0cGF5bG9hZDogbnVsbFxuXHR9KVxuXG5cdEFQSV9HRVQodXJsKS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuXG5cdFx0ZGlzcGF0Y2goe1xuXHRcdFx0dHlwZTogQVBQRU5EX0xBQlMsXG5cdFx0XHRwYXlsb2FkOiByZXNwb25zZVxuXHRcdH0pXG5cblx0XHRkaXNwYXRjaCh7XG5cdFx0XHR0eXBlOiBMQUJfU0VBUkNILFxuXHRcdFx0cGF5bG9hZDogcmVzcG9uc2Vcblx0XHR9KVxuXG5cdFx0aWYgKG1lcmdlU3RhdGUpIHtcblx0XHRcdGRpc3BhdGNoKHtcblx0XHRcdFx0dHlwZTogTUVSR0VfU0VBUkNIX1NUQVRFX0xBQixcblx0XHRcdFx0cGF5bG9hZDoge1xuXHRcdFx0XHRcdHNlYXJjaFN0YXRlLFxuXHRcdFx0XHRcdGZpbHRlckNyaXRlcmlhXG5cdFx0XHRcdH1cblx0XHRcdH0pXG5cdFx0fVxuXG5cdH0pLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xuXG5cdH0pXG59XG5cbmV4cG9ydCBjb25zdCBnZXRMYWJCeUlkID0gKGxhYklkKSA9PiAoZGlzcGF0Y2gpID0+IHtcblx0bGV0IHVybCA9IGAvZGlhZ25vc3RpYy92MS9sYWJsaXN0LyR7bGFiSWR9YFxuXG5cdEFQSV9HRVQodXJsKS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuXHRcdFxuXHRcdGRpc3BhdGNoKHtcblx0XHRcdHR5cGU6IEFQUEVORF9MQUJTLFxuXHRcdFx0cGF5bG9hZDogW3Jlc3BvbnNlXVxuXHRcdH0pXG5cblx0fSkuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSB7XG5cblx0fSlcbn1cblxuZXhwb3J0IGNvbnN0IGdldExhYlRpbWVTbG90cyA9IChsYWJJZCwgdGVzdElkcywgY2FsbGJhY2spID0+IChkaXNwYXRjaCkgPT4ge1xuXHRBUElfR0VUKCcvYXZhaWxhYmlsaXR5X2xhYnMuanNvbicpLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG5cblx0XHRjYWxsYmFjayhyZXNwb25zZSlcblxuXHR9KS5jYXRjaChmdW5jdGlvbiAoZXJyb3IpIHtcblxuXHR9KVxufVxuXG5leHBvcnQgY29uc3QgZ2V0TGFiQm9va2luZ1N1bW1hcnkgPSAoYm9va2luZ0lkLCBjYWxsYmFjaykgPT4gKGRpc3BhdGNoKSA9PiB7XG5cdEFQSV9HRVQoJy9sYWJfYm9va2luZ19zdW1tYXIuanNvbicpLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG5cblx0XHRjYWxsYmFjayhyZXNwb25zZSlcblxuXHR9KS5jYXRjaChmdW5jdGlvbiAoZXJyb3IpIHtcblxuXHR9KVxufVxuIiwiaW1wb3J0IHsgQVBQRU5EX0ZJTFRFUlNfRElBR05PU0lTLCBUT0dHTEVfQ09ORElUSU9OUywgVE9HR0xFX1NQRUNJQUxJVElFUywgU0VMRUNUX0xPQ0FUSU9OLCBNRVJHRV9TRUFSQ0hfU1RBVEUsIFRPR0dMRV9DUklURVJJQSwgVE9HR0xFX1RFU1RTLCBUT0dHTEVfRElBR05PU0lTX0NSSVRFUklBLCBMT0FEX1NFQVJDSF9DUklURVJJQV9MQUIgfSBmcm9tICcuLi8uLi9jb25zdGFudHMvdHlwZXMnO1xuaW1wb3J0IHsgQVBJX0dFVCB9IGZyb20gJy4uLy4uL2FwaS9hcGkuanMnO1xuXG5leHBvcnQgY29uc3QgbG9hZExhYkNvbW1vbkNyaXRlcmlhcyA9ICgpID0+IChkaXNwYXRjaCkgPT4ge1xuXG4gICAgQVBJX0dFVCgnL2RpYWdub3N0aWMvdjEvc2VhcmNoLXBnJykudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgZGlzcGF0Y2goe1xuICAgICAgICAgICAgdHlwZTogTE9BRF9TRUFSQ0hfQ1JJVEVSSUFfTEFCLFxuICAgICAgICAgICAgcGF5bG9hZDogcmVzcG9uc2VcbiAgICAgICAgfSlcbiAgICB9KS5jYXRjaChmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgICAgZGlzcGF0Y2goe1xuICAgICAgICAgICAgdHlwZTogTE9BRF9TRUFSQ0hfQ1JJVEVSSUFfTEFCLFxuICAgICAgICAgICAgcGF5bG9hZDogbnVsbFxuICAgICAgICB9KVxuICAgIH0pXG5cbn1cblxuZXhwb3J0IGNvbnN0IHRvZ2dsZURpYWdub3Npc0NyaXRlcmlhID0gKHR5cGUsIGNyaXRlcmlhKSA9PiAoZGlzcGF0Y2gpID0+IHtcbiAgICBkaXNwYXRjaCh7XG4gICAgICAgIHR5cGU6IFRPR0dMRV9ESUFHTk9TSVNfQ1JJVEVSSUEsXG4gICAgICAgIHBheWxvYWQ6IHtcbiAgICAgICAgICAgIHR5cGUsIGNyaXRlcmlhXG4gICAgICAgIH1cbiAgICB9KVxuXG59XG5cbmV4cG9ydCBjb25zdCBnZXREaWFnbm9zaXNDcml0ZXJpYVJlc3VsdHMgPSAoc2VhcmNoU3RyaW5nLCBjYWxsYmFjaykgPT4gKGRpc3BhdGNoKSA9PiB7XG4gICAgQVBJX0dFVChgL2RpYWdub3N0aWMvdjEvdGVzdD9uYW1lPSR7c2VhcmNoU3RyaW5nfWApLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgIGNhbGxiYWNrKHJlc3BvbnNlKVxuICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICBjYWxsYmFjayhudWxsKVxuICAgIH0pXG59XG5cblxuIiwiaW1wb3J0ICogYXMgU0VBUkNIX0NSSVRFUklBX09QRCBmcm9tICcuL29wZC9zZWFyY2hDcml0ZXJpYS5qcydcbmltcG9ydCAqIGFzIFNFQVJDSF9DUklURVJJQV9MQUJTIGZyb20gJy4vZGlhZ25vc2lzL3NlYXJjaENyaXRlcmlhLmpzJ1xuaW1wb3J0ICogYXMgRE9DVE9SU19BQ1RJT05TIGZyb20gJy4vb3BkL2RvY3RvclNlYXJjaC5qcydcbmltcG9ydCAqIGFzIExBQlNfQUNUSU9OUyBmcm9tICcuL2RpYWdub3Npcy9sYWJTZWFyY2guanMnXG5pbXBvcnQgKiBhcyBVU0VSX0FDVElPTlMgZnJvbSAnLi9jb21tb25zL3VzZXIuanMnXG5cbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmFzc2lnbih7fSxcbiAgICBTRUFSQ0hfQ1JJVEVSSUFfT1BELFxuICAgIFNFQVJDSF9DUklURVJJQV9MQUJTLFxuICAgIERPQ1RPUlNfQUNUSU9OUyxcbiAgICBMQUJTX0FDVElPTlMsXG4gICAgVVNFUl9BQ1RJT05TXG4pIiwiaW1wb3J0IHsgQVBQRU5EX0RPQ1RPUlMsIERPQ1RPUl9TRUFSQ0gsIFNFTEVDVF9ET0NUT1IsIE1FUkdFX1NFQVJDSF9TVEFURV9PUEQgfSBmcm9tICcuLi8uLi9jb25zdGFudHMvdHlwZXMnO1xuaW1wb3J0IHsgQVBJX0dFVCB9IGZyb20gJy4uLy4uL2FwaS9hcGkuanMnO1xuXG5cbmV4cG9ydCBjb25zdCBnZXREb2N0b3JzID0gKHNlYXJjaFN0YXRlID0ge30sIGZpbHRlclN0YXRlID0ge30sIG1lcmdlU3RhdGUgPSBmYWxzZSkgPT4gKGRpc3BhdGNoKSA9PiB7XG5cdEFQSV9HRVQoJy9kb2N0b3JzLmpzb24nKS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuXG5cdFx0ZGlzcGF0Y2goe1xuXHRcdFx0dHlwZTogQVBQRU5EX0RPQ1RPUlMsXG5cdFx0XHRwYXlsb2FkOiByZXNwb25zZS5kb2N0b3JzXG5cdFx0fSlcblxuXHRcdGRpc3BhdGNoKHtcblx0XHRcdHR5cGU6IERPQ1RPUl9TRUFSQ0gsXG5cdFx0XHRwYXlsb2FkOiByZXNwb25zZS5kb2N0b3JzXG5cdFx0fSlcblxuXHRcdGlmIChtZXJnZVN0YXRlKSB7XG5cdFx0XHRkaXNwYXRjaCh7XG5cdFx0XHRcdHR5cGU6IE1FUkdFX1NFQVJDSF9TVEFURV9PUEQsXG5cdFx0XHRcdHBheWxvYWQ6IHNlYXJjaFN0YXRlXG5cdFx0XHR9KVxuXHRcdH1cblxuXG5cdFx0bGV0IHNlYXJjaFN0YXRlUGFyYW0gPSBlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc2VhcmNoU3RhdGUpKVxuXHRcdGxldCBmaWx0ZXJTdGF0ZVBhcmFtID0gZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGZpbHRlclN0YXRlKSlcblx0XHRoaXN0b3J5LnJlcGxhY2VTdGF0ZShudWxsLCAnaGVsbG8nLCBgL3NlYXJjaHJlc3VsdHM/c2VhcmNoPSR7c2VhcmNoU3RhdGVQYXJhbX0mZmlsdGVyPSR7ZmlsdGVyU3RhdGVQYXJhbX1gKVxuXG5cdH0pLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xuXG5cdH0pXG59XG5cbmV4cG9ydCBjb25zdCBnZXREb2N0b3JCeUlkID0gKGRvY3RvcklkKSA9PiAoZGlzcGF0Y2gpID0+IHtcblx0Ly8gdGhpcyBBUEkgc2hvdWxkIHJldHVybiBkZXRhaWxlZCBkb2N0b3Jcblx0QVBJX0dFVCgnL2RvY3RvcnMuanNvbicpLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG5cdFx0Ly8gbW9ja2luZyBBUEkgLCBUT0RPIDogcmVtb3ZlXG5cdFx0cmVzcG9uc2UuZG9jdG9yID0gcmVzcG9uc2UuZG9jdG9ycy5maWx0ZXIoZG9jID0+IGRvYy5pZCA9PSBkb2N0b3JJZClbMF1cblxuXHRcdGRpc3BhdGNoKHtcblx0XHRcdHR5cGU6IEFQUEVORF9ET0NUT1JTLFxuXHRcdFx0cGF5bG9hZDogW3Jlc3BvbnNlLmRvY3Rvcl1cblx0XHR9KVxuXG5cdH0pLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xuXG5cdH0pXG59XG5cbmV4cG9ydCBjb25zdCBnZXRUaW1lU2xvdHMgPSAoZG9jdG9ySWQsIGNsaW5pY0lkLCBjYWxsYmFjaykgPT4gKGRpc3BhdGNoKSA9PiB7XG5cdEFQSV9HRVQoJy9hdmFpbGFiaWxpdHkuanNvbicpLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG5cblx0XHRjYWxsYmFjayhyZXNwb25zZSlcblxuXHR9KS5jYXRjaChmdW5jdGlvbiAoZXJyb3IpIHtcblxuXHR9KVxufVxuIiwiaW1wb3J0IHsgVE9HR0xFX0NPTkRJVElPTlMsIFRPR0dMRV9TUEVDSUFMSVRJRVMsIFNFTEVDVF9MT0NBVElPTiwgU0VMRUNUX0xPQ0FUSU9OX0RJQUdOT1NJUywgTUVSR0VfU0VBUkNIX1NUQVRFLCBUT0dHTEVfQ1JJVEVSSUEsIFRPR0dMRV9URVNUUywgVE9HR0xFX0RJQUdOT1NJU19DUklURVJJQSwgU0VUX09QRF9GSUxURVJTLCBMT0FEX1NFQVJDSF9DUklURVJJQV9PUEQgfSBmcm9tICcuLi8uLi9jb25zdGFudHMvdHlwZXMnO1xuaW1wb3J0IHsgQVBJX0dFVCB9IGZyb20gJy4uLy4uL2FwaS9hcGkuanMnO1xuXG5leHBvcnQgY29uc3QgbG9hZFNlYXJjaENyaXRlcmlhID0gKCkgPT4gKGRpc3BhdGNoKSA9PiB7XG4gICAgZGlzcGF0Y2goe1xuICAgICAgICB0eXBlOiBMT0FEX1NFQVJDSF9DUklURVJJQV9PUEQsXG4gICAgICAgIHBheWxvYWQ6IG51bGxcbiAgICB9KVxuXG59IFxuXG5leHBvcnQgY29uc3QgdG9nZ2xlQ29uZGl0aW9uID0gKGlkKSA9PiAoZGlzcGF0Y2gpID0+IHtcbiAgICBkaXNwYXRjaCh7XG4gICAgICAgIHR5cGU6IFRPR0dMRV9DT05ESVRJT05TLFxuICAgICAgICBwYXlsb2FkOiB7XG4gICAgICAgICAgICBpZFxuICAgICAgICB9XG4gICAgfSlcblxufVxuXG5leHBvcnQgY29uc3QgdG9nZ2xlU3BlY2lhbGl0eSA9IChpZCkgPT4gKGRpc3BhdGNoKSA9PiB7XG4gICAgZGlzcGF0Y2goe1xuICAgICAgICB0eXBlOiBUT0dHTEVfU1BFQ0lBTElUSUVTLFxuICAgICAgICBwYXlsb2FkOiB7XG4gICAgICAgICAgICBpZFxuICAgICAgICB9XG4gICAgfSlcblxufVxuXG5leHBvcnQgY29uc3QgdG9nZ2xlQ3JpdGVyaWEgPSAoY3JpdGVyaWEpID0+IChkaXNwYXRjaCkgPT4ge1xuICAgIGRpc3BhdGNoKHtcbiAgICAgICAgdHlwZTogVE9HR0xFX0NSSVRFUklBLFxuICAgICAgICBwYXlsb2FkOiBjcml0ZXJpYVxuICAgIH0pXG5cbn1cblxuZXhwb3J0IGNvbnN0IHNlbGVjdExvY2F0aW9uID0gKGxvY2F0aW9uKSA9PiAoZGlzcGF0Y2gpID0+IHtcbiAgICBkaXNwYXRjaCh7XG4gICAgICAgIHR5cGU6IFNFTEVDVF9MT0NBVElPTixcbiAgICAgICAgcGF5bG9hZDogbG9jYXRpb25cbiAgICB9KVxuXG4gICAgZGlzcGF0Y2goe1xuICAgICAgICB0eXBlOiBTRUxFQ1RfTE9DQVRJT05fRElBR05PU0lTLFxuICAgICAgICBwYXlsb2FkOiBsb2NhdGlvblxuICAgIH0pXG5cbn1cblxuZXhwb3J0IGNvbnN0IG1lcmdlU2VhcmNoU3RhdGUgPSAoc3RhdGUpID0+IChkaXNwYXRjaCkgPT4ge1xuICAgIGRpc3BhdGNoKHtcbiAgICAgICAgdHlwZTogTUVSR0VfU0VBUkNIX1NUQVRFLFxuICAgICAgICBwYXlsb2FkOiBzdGF0ZVxuICAgIH0pXG5cbn1cblxuZXhwb3J0IGNvbnN0IGdldENyaXRlcmlhUmVzdWx0cyA9IChzZWFyY2hTdHJpbmcsIGNhbGxiYWNrKSA9PiAoZGlzcGF0Y2gpID0+IHtcblx0QVBJX0dFVCgnL2dlbmVyaWNfc2VhcmNoLmpzb24nKS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuXHRcdGNhbGxiYWNrKHJlc3BvbnNlKVxuXHR9KS5jYXRjaChmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgICAgXG5cdH0pXG59XG5cbmV4cG9ydCBjb25zdCBzZXRPUERGaWx0ZXJzID0gKGZpbHRlckRhdGEpID0+IChkaXNwYXRjaCkgPT4ge1xuICAgIGRpc3BhdGNoKHtcbiAgICAgICAgdHlwZTogU0VUX09QRF9GSUxURVJTLFxuICAgICAgICBwYXlsb2FkOiBmaWx0ZXJEYXRhXG4gICAgfSlcblxufSBcbiIsImltcG9ydCBBeGlvcyBmcm9tICdheGlvcydcbmltcG9ydCBTVE9SQUdFIGZyb20gJy4uL2hlbHBlcnMvc3RvcmFnZSdcbmltcG9ydCBOQVZJR0FURSBmcm9tICcuLi9oZWxwZXJzL25hdmlnYXRlJ1xuXG5sZXQgYXhpb3NJbnN0YW5jZSA9IEF4aW9zLmNyZWF0ZSh7XG4gICAgYmFzZVVSTDogJ2h0dHA6Ly8xMC4wLjMyLjc5OjgwODAnLFxuICAgIGhlYWRlcjoge31cbn0pO1xuXG5mdW5jdGlvbiByZWplY3RIYW5kbGVyKHJlc3BvbnNlLCBjYWxsYmFjaykge1xuICAgIC8vIGlmIChyZXNwb25zZSAmJiByZXNwb25zZS5yZXNwb25zZSAmJiByZXNwb25zZS5yZXNwb25zZS5zdGF0dXMgPT0gNDAxKSB7XG4gICAgLy8gICAgIFNUT1JBR0UuZGVsZXRlQXV0aCgpLnRoZW4oKCkgPT4ge1xuICAgIC8vICAgICAgICAgLy8gc2VuZCB0byBsb2dpbiBwYWdlXG4gICAgLy8gICAgICAgICBOQVZJR0FURS5uYXZpZ2F0ZVRvKCcvJylcbiAgICAvLyAgICAgfSlcbiAgICAvLyB9XG5cbiAgICBjYWxsYmFjayhyZXNwb25zZSlcbn1cblxuZXhwb3J0IGNvbnN0IEFQSV9HRVQgPSAodXJsKSA9PiB7XG4gICAgcmV0dXJuIFNUT1JBR0UuZ2V0QXV0aFRva2VuKCkudGhlbigodG9rZW4pID0+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGF4aW9zSW5zdGFuY2Uoe1xuICAgICAgICAgICAgICAgIG1ldGhvZDogJ2dldCcsXG4gICAgICAgICAgICAgICAgdXJsOiB1cmwsXG4gICAgICAgICAgICAgICAgaGVhZGVyczogeyAnQXV0aG9yaXphdGlvbic6IGBUb2tlbiAke3Rva2VufWAgfVxuICAgICAgICAgICAgfSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShyZXMuZGF0YSlcbiAgICAgICAgICAgIH0sIChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgIHJlamVjdEhhbmRsZXIocmVzcG9uc2UsIHJlamVjdClcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgfSlcblxuXG59XG5leHBvcnQgY29uc3QgQVBJX1BPU1QgPSAodXJsLCBkYXRhKSA9PiB7XG4gICAgcmV0dXJuIFNUT1JBR0UuZ2V0QXV0aFRva2VuKCkudGhlbigodG9rZW4pID0+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGF4aW9zSW5zdGFuY2Uoe1xuICAgICAgICAgICAgICAgIG1ldGhvZDogJ3Bvc3QnLFxuICAgICAgICAgICAgICAgIHVybDogdXJsLFxuICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICAgICAgaGVhZGVyczogeyAnQXV0aG9yaXphdGlvbic6IGBUb2tlbiAke3Rva2VufWAgfVxuICAgICAgICAgICAgfSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShyZXMuZGF0YSlcbiAgICAgICAgICAgIH0sIChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgIHJlamVjdEhhbmRsZXIocmVzcG9uc2UsIHJlamVjdClcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgfSlcblxuXG59XG5cbmV4cG9ydCBjb25zdCBBUElfUFVUID0gKHVybCwgZGF0YSkgPT4ge1xuICAgIHJldHVybiBTVE9SQUdFLmdldEF1dGhUb2tlbigpLnRoZW4oKHRva2VuKSA9PiB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBheGlvc0luc3RhbmNlKHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdwdXQnLFxuICAgICAgICAgICAgICAgIHVybDogdXJsLFxuICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICAgICAgaGVhZGVyczogeyAnQXV0aG9yaXphdGlvbic6IGBUb2tlbiAke3Rva2VufWAgfVxuICAgICAgICAgICAgfSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShyZXMuZGF0YSlcbiAgICAgICAgICAgIH0sIChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgIHJlamVjdEhhbmRsZXIocmVzcG9uc2UsIHJlamVjdClcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgfSlcblxuXG59XG5cbmV4cG9ydCBjb25zdCBBUElfREVMRVRFID0gKHVybCkgPT4ge1xuICAgIHJldHVybiBTVE9SQUdFLmdldEF1dGhUb2tlbigpLnRoZW4oKHRva2VuKSA9PiB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBheGlvc0luc3RhbmNlKHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdkZWxldGUnLFxuICAgICAgICAgICAgICAgIHVybDogdXJsLFxuICAgICAgICAgICAgICAgIGhlYWRlcnM6IHsgJ0F1dGhvcml6YXRpb24nOiBgVG9rZW4gJHt0b2tlbn1gIH1cbiAgICAgICAgICAgIH0pLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICAgICAgICAgIHJlc29sdmUocmVzLmRhdGEpXG4gICAgICAgICAgICB9LCAocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICByZWplY3RIYW5kbGVyKHJlc3BvbnNlLCByZWplY3QpXG4gICAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgIH0pXG5cbn0iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5jb25zdCBJZnJhbVN0eWxlID0ge1xuICAgIHdpZHRoOiAnMTAwJScsXG4gICAgaGVpZ2h0OiAnY2FsYygxMDB2aCAtIDYwcHgpJ1xufVxuXG5cbmNsYXNzIENoYXRWaWV3IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcblxuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhdGljIGNvbnRleHRUeXBlcyA9IHtcbiAgICAgICAgcm91dGVyOiAoKSA9PiBudWxsXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxvY2F0aW9uU2VsZWN0b3JcIj5cbiAgICAgICAgICAgICAgICA8aWZyYW1lIHNyYz1cImh0dHA6Ly9jaGF0Ym90LnBvbGljeWJhemFhci5jb20vbGl2ZWNoYXRcIiBzdHlsZT17SWZyYW1TdHlsZX0+PC9pZnJhbWU+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgQ2hhdFZpZXdcbiIsImltcG9ydCBDaGF0VmlldyBmcm9tICcuL0NoYXRWaWV3LmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBDaGF0VmlldyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgRW1vdGlJY29uIGZyb20gJ21hdGVyaWFsLXVpLWljb25zL0FjY291bnRDaXJjbGUnO1xuXG5jbGFzcyBQcm9maWxlU2xpZGVyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICB9XG5cbiAgICBzd2l0Y2hVc2VyKHByb2ZpbGVJZCkge1xuICAgICAgICB0aGlzLmNvbnRleHQucm91dGVyLmhpc3RvcnkucHVzaChgL3VzZXIvJHtwcm9maWxlSWR9JHt0aGlzLnByb3BzLnN1YlJvdXRlfWApXG5cbiAgICB9XG5cbiAgICBzdGF0aWMgY29udGV4dFR5cGVzID0ge1xuICAgICAgICByb3V0ZXI6ICgpID0+IG51bGxcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgbGV0IHByb2ZpbGVzID0gW11cblxuICAgICAgICBwcm9maWxlcyA9IE9iamVjdC5rZXlzKHRoaXMucHJvcHMucHJvZmlsZXMpLm1hcCgocHJvZmlsZUlkLCBpKSA9PiB7XG4gICAgICAgICAgICBsZXQgc3JjID0gdGhpcy5wcm9wcy5wcm9maWxlc1twcm9maWxlSWRdLnByb2ZpbGVJbWFnZSB8fCBcImh0dHBzOi8vd3d3LmF0b21peC5jb20uYXUvbWVkaWEvMjAxNS8wNi9hdG9taXhfdXNlcjMxLnBuZ1wiXG4gICAgICAgICAgICByZXR1cm4gPGRpdiBrZXk9e2l9IGNsYXNzTmFtZT1cInNsaWRlVGlsZVwiIG9uQ2xpY2s9e3RoaXMuc3dpdGNoVXNlci5iaW5kKHRoaXMsIHByb2ZpbGVJZCl9PlxuICAgICAgICAgICAgICAgIDxpbWcgY2xhc3NOYW1lPVwicHJvZmlsZUNhcmRJbWFnZVwiIHNyYz17c3JjfS8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgfSlcblxuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInByb2ZpbGVTbGlkZXJcIj5cbiAgICAgICAgICAgICAgICB7cHJvZmlsZXN9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgUHJvZmlsZVNsaWRlclxuIiwiaW1wb3J0IFByb2ZpbGVTbGlkZXIgZnJvbSAnLi9Qcm9maWxlU2xpZGVyLmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBQcm9maWxlU2xpZGVyIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IHsgZ2V0VGltZSwgZ2V0RGF5TmFtZSB9IGZyb20gJy4uLy4uLy4uL3V0aWxzL2RhdGVUaW1lVXRpbHMuanMnXG5cbmNsYXNzIFRpbWVTbG90U2VsZWN0b3IgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgc2VsZWN0ZWREYXk6IDAsXG4gICAgICAgICAgICBzZWxlY3RlZEludGVydmFsOiAwLFxuICAgICAgICAgICAgc2VsZWN0ZWRUaW1lU2xvdDogMFxuXG4gICAgICAgIH1cbiAgICB9XG4gICAgY29tcG9uZW50V2lsbE1vdW50KCkge1xuICAgICAgICBsZXQgdGltZVNsb3RzID0gdGhpcy5wcm9wcy50aW1lU2xvdHM7XG5cbiAgICAgICAgdGhpcy5zZXREZWZhdWx0U2VsZWN0ZWQodGltZVNsb3RzKTtcblxuICAgIH1cbiAgICBzZXREZWZhdWx0U2VsZWN0ZWQodGltZVNsb3RzKSB7XG4gICAgICAgIGxldCBkYXlzID0gdGltZVNsb3RzLmRhdGVzO1xuICAgICAgICBsZXQgZGVmYXVsdERheUluZGV4ID0gdGhpcy5nZXRGaXJzdEF2YWlsYWJsZURheShkYXlzKTtcbiAgICAgICAgXG4gICAgICAgIGlmIChkZWZhdWx0RGF5SW5kZXggfHwgZGVmYXVsdERheUluZGV4ID09PSAwKSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgc2VsZWN0ZWREYXk6IGRlZmF1bHREYXlJbmRleCB9KTtcbiAgICAgICAgICAgIHZhciBkZWZhdXRJbnRlcndhbEluZGV4ID0gdGhpcy5nZXRGaXJzdEF2YWlsYWJsZUludGVyd2FsKGRheXNbZGVmYXVsdERheUluZGV4XS5pbnRlcnZhbHMpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkZWZhdXRJbnRlcndhbEluZGV4IHx8IGRlZmF1dEludGVyd2FsSW5kZXggPT09IDApIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBzZWxlY3RlZEludGVydmFsOiBkZWZhdXRJbnRlcndhbEluZGV4IH0pO1xuICAgICAgICAgICAgdmFyIGRlZmF1bHRUaW1lU2xvdEluZGV4ID0gdGhpcy5nZXRGaXJzdEF2YWlsYWJsZVRpbWVTbG90KGRheXNbZGVmYXVsdERheUluZGV4XS5pbnRlcnZhbHNbZGVmYXV0SW50ZXJ3YWxJbmRleF0udGltZVNsb3RzKTtcblxuICAgICAgICB9XG4gICAgICAgIGlmIChkZWZhdWx0VGltZVNsb3RJbmRleCB8fCBkZWZhdWx0VGltZVNsb3RJbmRleCA9PT0gMCkge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHNlbGVjdGVkVGltZVNsb3Q6IGRlZmF1bHRUaW1lU2xvdEluZGV4IH0pO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBnZXRGaXJzdEF2YWlsYWJsZUludGVyd2FsKGludGVydmFscykge1xuXG4gICAgICAgIGZvciAobGV0IGludGVyd2FsSW5kZXggaW4gaW50ZXJ2YWxzKSB7XG4gICAgICAgICAgICBsZXQgaW50ZXJ3YWwgPSBpbnRlcnZhbHNbaW50ZXJ3YWxJbmRleF07XG4gICAgICAgICAgICBpZiAoaW50ZXJ3YWwgJiYgaW50ZXJ3YWwuaXNBdmFpbGFibGUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcGFyc2VJbnQoaW50ZXJ3YWxJbmRleCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRGaXJzdEF2YWlsYWJsZVRpbWVTbG90KHRpbWVTbG90cykge1xuXG4gICAgICAgIGZvciAobGV0IHRpbWVTbG90SW5kZXggaW4gdGltZVNsb3RzKSB7XG4gICAgICAgICAgICBsZXQgdGltZVNsb3QgPSB0aW1lU2xvdHNbdGltZVNsb3RJbmRleF07XG4gICAgICAgICAgICBpZiAodGltZVNsb3QgJiYgdGltZVNsb3QuaXNBdmFpbGFibGUpIHtcbiAgICAgICAgICAgICAgICAvLyBjYWxsaW5nIHBhcmVudCB0aW1lU2xvdCBzZXR0ZXJcbiAgICAgICAgICAgICAgICB0aGlzLnByb3BzLnNlbGVjdFRpbWVTbG90KHRpbWVTbG90KVxuICAgICAgICAgICAgICAgIHJldHVybiBwYXJzZUludCh0aW1lU2xvdEluZGV4KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIFxuXG4gICAgfVxuXG4gICAgZ2V0Rmlyc3RBdmFpbGFibGVEYXkoZGF5cykge1xuXG4gICAgICAgIGZvciAobGV0IGRheUluZGV4IGluIGRheXMpIHtcbiAgICAgICAgICAgIGxldCBkYXkgPSBkYXlzW2RheUluZGV4XTtcbiAgICAgICAgICAgIGlmIChkYXkgJiYgZGF5LmlzQXZhaWxhYmxlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBhcnNlSW50KGRheUluZGV4KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBvbkRhdGVDbGljayhkYXRlLCBzZWxlY3RlZEluZGV4LCBpbmRleCkge1xuXG4gICAgICAgIGlmIChzZWxlY3RlZEluZGV4ICE9PSBpbmRleCAmJiBkYXRlLmlzQXZhaWxhYmxlKSB7XG4gICAgICAgICAgICB2YXIgYXZhaWxhYmxlSW50ZXJ3YWwgPSB0aGlzLmdldEZpcnN0QXZhaWxhYmxlSW50ZXJ3YWwoZGF0ZS5pbnRlcnZhbHMpXG4gICAgICAgICAgICBpZiAoYXZhaWxhYmxlSW50ZXJ3YWwgfHwgYXZhaWxhYmxlSW50ZXJ3YWwgPT09IDApIHtcbiAgICAgICAgICAgICAgICBsZXQgdGltZVNsb3RzID0gZGF0ZS5pbnRlcnZhbHNbYXZhaWxhYmxlSW50ZXJ3YWxdLnRpbWVTbG90cztcbiAgICAgICAgICAgICAgICB2YXIgYXZhaWxhYmxlVGltZVNsb3QgPSB0aGlzLmdldEZpcnN0QXZhaWxhYmxlVGltZVNsb3QodGltZVNsb3RzKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHNlbGVjdGVkRGF5OiBpbmRleCwgc2VsZWN0ZWRJbnRlcnZhbDogYXZhaWxhYmxlSW50ZXJ3YWwsIHNlbGVjdGVkVGltZVNsb3Q6IGF2YWlsYWJsZVRpbWVTbG90IH0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIG9uSW50ZXJ2YWxDbGljayhpbnRlcndhbCwgc2VsZWN0ZWRJbmRleCwgaW5kZXgpIHtcblxuXG5cbiAgICAgICAgaWYgKHNlbGVjdGVkSW5kZXggIT09IGluZGV4ICYmIGludGVyd2FsLmlzQXZhaWxhYmxlKSB7XG4gICAgICAgICAgICBsZXQgdGltZVNsb3RzID0gaW50ZXJ3YWwudGltZVNsb3RzO1xuICAgICAgICAgICAgdmFyIGF2YWlsYWJsZVRpbWVTbG90ID0gdGhpcy5nZXRGaXJzdEF2YWlsYWJsZVRpbWVTbG90KHRpbWVTbG90cyk7XG5cblxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHNlbGVjdGVkSW50ZXJ2YWw6IGluZGV4LCBzZWxlY3RlZFRpbWVTbG90OiBhdmFpbGFibGVUaW1lU2xvdCB9KTtcbiAgICAgICAgfVxuXG4gICAgfVxuICAgIG9uVGltZVNsb3RDbGljayh0aW1lU2xvdCwgc2VsZWN0ZWRJbmRleCwgaW5kZXgpIHtcblxuICAgICAgICBpZiAoc2VsZWN0ZWRJbmRleCAhPT0gaW5kZXggJiYgdGltZVNsb3QuaXNBdmFpbGFibGUpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBzZWxlY3RlZFRpbWVTbG90OiBpbmRleCB9KTtcbiAgICAgICAgICAgIC8vIGNhbGxpbmcgcGFyZW50IHRpbWVTbG90IHNldHRlclxuICAgICAgICAgICAgdGhpcy5wcm9wcy5zZWxlY3RUaW1lU2xvdCh0aW1lU2xvdClcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICBsZXQgeyBkYXRlcyB9ID0gdGhpcy5wcm9wcy50aW1lU2xvdHNcblxuICAgICAgICBsZXQgaW50ZXJ2YWxzID0gW11cbiAgICAgICAgbGV0IHRpbWVTbG90cyA9IFtdXG4gICAgICAgIGxldCBkYXRlTGlzdCA9IFtdXG5cblxuICAgICAgICBkYXRlTGlzdCA9IGRhdGVzLm1hcCgoZGF0ZSwgaSkgPT4ge1xuICAgICAgICAgICAgbGV0IGRheURhdGUgPSBuZXcgRGF0ZShkYXRlLmRhdGUpLmdldERhdGUoKVxuICAgICAgICAgICAgbGV0IGRheU5hbWUgPSBnZXREYXlOYW1lKGRhdGUuZGF0ZSk7XG4gICAgICAgICAgICBsZXQgc2VsZWN0ZWQgPSB0aGlzLnN0YXRlLnNlbGVjdGVkRGF5ID09IGlcbiAgICAgICAgICAgIHJldHVybiA8ZGl2IGtleT17aX0gb25DbGljaz17dGhpcy5vbkRhdGVDbGljay5iaW5kKHRoaXMsIGRhdGUsIHRoaXMuc3RhdGUuc2VsZWN0ZWREYXksIGkpfSBjbGFzc05hbWU9e2RhdGUuaXNBdmFpbGFibGUgPyAoc2VsZWN0ZWQgPyBcImRhdGVUaWxlIHNlbGVjdGVkXCIgOiBcImRhdGVUaWxlXCIpIDogXCJkYXRlVGlsZSBkaXNhYmxlZFwifT5cbiAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJkYXRlXCI+e2RheURhdGV9PC9wPlxuICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cImRheVwiPntkYXlOYW1lfTwvcD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICB9KVxuICAgICAgICBpbnRlcnZhbHMgPSBkYXRlc1t0aGlzLnN0YXRlLnNlbGVjdGVkRGF5XS5pbnRlcnZhbHMubWFwKChpbnRlcnZhbCwgaSkgPT4ge1xuICAgICAgICAgICAgbGV0IHNlbGVjdGVkID0gdGhpcy5zdGF0ZS5zZWxlY3RlZEludGVydmFsID09IGlcbiAgICAgICAgICAgIHJldHVybiA8YnV0dG9uIGtleT17aX0gb25DbGljaz17dGhpcy5vbkludGVydmFsQ2xpY2suYmluZCh0aGlzLCBpbnRlcnZhbCwgdGhpcy5zdGF0ZS5zZWxlY3RlZEludGVydmFsLCBpKX0gY2xhc3NOYW1lPXtpbnRlcnZhbC5pc0F2YWlsYWJsZSA/IChzZWxlY3RlZCA/IFwidHNCdG4gc2VsZWN0ZWRcIiA6IFwidHNCdG5cIikgOiBcInRzQnRuIGRpc2FibGVkXCJ9PntpbnRlcnZhbC5uYW1lfTwvYnV0dG9uPlxuICAgICAgICB9KVxuXG4gICAgICAgIHRpbWVTbG90cyA9IGRhdGVzW3RoaXMuc3RhdGUuc2VsZWN0ZWREYXldLmludGVydmFsc1t0aGlzLnN0YXRlLnNlbGVjdGVkSW50ZXJ2YWxdLnRpbWVTbG90cy5tYXAoKHNsb3QsIGkpID0+IHtcbiAgICAgICAgICAgIGxldCBzZWxlY3RlZCA9IHRoaXMuc3RhdGUuc2VsZWN0ZWRUaW1lU2xvdCA9PSBpXG4gICAgICAgICAgICBsZXQgc2xvdFRleHQgPSBnZXRUaW1lKHNsb3Quc3RhcnQpXG4gICAgICAgICAgICBpZihzbG90LmVuZCl7XG4gICAgICAgICAgICAgICAgc2xvdFRleHQgKz0gYCAtICR7Z2V0VGltZShzbG90LmVuZCl9YFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIDxzcGFuIGtleT17aX0gb25DbGljaz17dGhpcy5vblRpbWVTbG90Q2xpY2suYmluZCh0aGlzLCBzbG90LCB0aGlzLnN0YXRlLnNlbGVjdGVkVGltZVNsb3QsIGkpfSBjbGFzc05hbWU9e3Nsb3QuaXNBdmFpbGFibGUgPyAoc2VsZWN0ZWQgPyBcInNsb3Qgc2VsZWN0ZWRcIiA6IFwic2xvdFwiKSA6IFwic2xvdCBkaXNhYmxlZFwifT57c2xvdFRleHR9PC9zcGFuPlxuICAgICAgICB9KVxuXG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGltZVNsb3RTZWxlY3RvclwiPlxuICAgICAgICAgICAgICAgIDxoNT5TZWxlY3QgcHJlZmZlcmVkIHRpbWUgc2xvdDwvaDU+XG5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImRhdGVDYXJcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzY3JvbGxlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAge2RhdGVMaXN0fVxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGltZVNsb3RzXCI+XG4gICAgICAgICAgICAgICAgICAgIHtpbnRlcnZhbHN9XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic2xvdHNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHt0aW1lU2xvdHN9XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IFRpbWVTbG90U2VsZWN0b3JcbiIsImltcG9ydCBUaW1lU2xvdFNlbGVjdG9yIGZyb20gJy4vVGltZVNsb3RTZWxlY3Rvci5qcydcblxuZXhwb3J0IGRlZmF1bHQgVGltZVNsb3RTZWxlY3RvciIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCBQcm9maWxlU2xpZGVyIGZyb20gJy4uL3Byb2ZpbGVTbGlkZXIvaW5kZXguanMnXG5pbXBvcnQgQXBwb2ludG1lbnRMaXN0IGZyb20gJy4vYXBwb2ludG1lbnRMaXN0L2luZGV4LmpzJ1xuXG5jbGFzcyBVc2VyQXBwb2ludG1lbnRzVmlldyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG5cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgICB0aGlzLnByb3BzLmdldFVzZXJQcm9maWxlV2l0aEFwcG9pbnRtZW50cygpXG4gICAgfVxuXG4gICAgc3RhdGljIGNvbnRleHRUeXBlcyA9IHtcbiAgICAgICAgcm91dGVyOiAoKSA9PiBudWxsXG4gICAgfVxuXG4gICAgY29tcGFyZURhdGVXaXRoVG9kYXkoZGF0ZSl7XG4gICAgICAgIGxldCB0b2RheSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpXG4gICAgICAgIGRhdGUgPSBuZXcgRGF0ZShkYXRlKS5nZXRUaW1lKClcbiAgICAgICAgcmV0dXJuIHRvZGF5ID4gZGF0ZVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICBsZXQgc2VsZWN0ZWRVc2VyID0gbnVsbFxuICAgICAgICBsZXQgdXNlclByb2ZpbGVJZCA9IHRoaXMucHJvcHMubWF0Y2gucGFyYW1zLmlkXG5cbiAgICAgICAgaWYgKHRoaXMucHJvcHMuVVNFUi5wcm9maWxlc1t1c2VyUHJvZmlsZUlkXSkge1xuICAgICAgICAgICAgc2VsZWN0ZWRVc2VyID0gdGhpcy5wcm9wcy5VU0VSLnByb2ZpbGVzW3VzZXJQcm9maWxlSWRdXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBPYmplY3Qua2V5cyh0aGlzLnByb3BzLlVTRVIucHJvZmlsZXMpLm1hcCgocHJvZmlsZUlkKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucHJvcHMuVVNFUi5wcm9maWxlc1twcm9maWxlSWRdLmlzRGVmYXVsdFVzZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRVc2VyID0gdGhpcy5wcm9wcy5VU0VSLnByb2ZpbGVzW3Byb2ZpbGVJZF1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidXNlclByb2ZpbGVcIj5cbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICggc2VsZWN0ZWRVc2VyICYmIHNlbGVjdGVkVXNlci5hcHBvaW50bWVudHMgKSA/IDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8UHJvZmlsZVNsaWRlclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb2ZpbGVzPXt0aGlzLnByb3BzLlVTRVIucHJvZmlsZXN9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3ViUm91dGU9XCIvYXBwb2ludG1lbnRzXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ1cGNvbWluZ2FwcFwiPlVwY29taW5nIE9QRCBBcHBvaW50bWVudHM8L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRVc2VyLmFwcG9pbnRtZW50cy5maWx0ZXIoKGFwcG9pbnRtZW50LGkpID0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZGF0ZSA9IGFwcG9pbnRtZW50LnNsb3QgPyBhcHBvaW50bWVudC5zbG90LnN0YXJ0IDogMFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gIXRoaXMuY29tcGFyZURhdGVXaXRoVG9kYXkoZGF0ZSkgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkubWFwKChhcHBvaW50bWVudCwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDxBcHBvaW50bWVudExpc3Qga2V5PXtpbmRleH0gZGF0YT17YXBwb2ludG1lbnR9IC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInByZXZhcHBcIj5QcmV2aW91cyBPUEQgQXBwb2ludG1lbnRzPC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkVXNlci5hcHBvaW50bWVudHMuZmlsdGVyKChhcHBvaW50bWVudCxpKSA9PntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGRhdGUgPSBhcHBvaW50bWVudC5zbG90ID8gYXBwb2ludG1lbnQuc2xvdC5zdGFydCA6IDBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY29tcGFyZURhdGVXaXRoVG9kYXkoZGF0ZSkgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkubWFwKChhcHBvaW50bWVudCwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDxBcHBvaW50bWVudExpc3Qga2V5PXtpbmRleH0gZGF0YT17YXBwb2ludG1lbnR9IC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+IDogXCJcIlxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IFVzZXJBcHBvaW50bWVudHNWaWV3XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFJpZ2h0QXJyb3dJY29uIGZyb20gJ21hdGVyaWFsLXVpLWljb25zL0tleWJvYXJkQXJyb3dSaWdodCc7XG5cbmNsYXNzIEFwcG9pbnRtZW50TGlzdCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgfVxuXG4gICAgZ2V0VGltZSh1bml4X3RpbWVzdGFtcCkge1xuICAgICAgICB2YXIgZGF0ZSA9IG5ldyBEYXRlKHVuaXhfdGltZXN0YW1wICogMTAwMCk7XG4gICAgICAgIHZhciBob3VycyA9IGRhdGUuZ2V0SG91cnMoKTtcbiAgICAgICAgdmFyIG1pbnV0ZXMgPSBcIjBcIiArIGRhdGUuZ2V0TWludXRlcygpO1xuICAgICAgICByZXR1cm4gaG91cnMgKyAnOicgKyBtaW51dGVzLnN1YnN0cigtMilcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgbGV0IHsgZG9jdG9yTmFtZSwgc2xvdCB9ID0gdGhpcy5wcm9wcy5kYXRhXG4gICAgICAgIHNsb3QgPSBzbG90IHx8IHtcbiAgICAgICAgICAgIHN0YXJ0OiAwLFxuICAgICAgICAgICAgZW5kOiAwXG4gICAgICAgIH1cbiAgICAgICAgbGV0IGRhdGUgPSBuZXcgRGF0ZShzbG90LnN0YXJ0KS50b0RhdGVTdHJpbmcoKVxuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFwcG9pbnRtZW50XCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJuYW1lXCI+XG5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImRldGFpbHNcIj5cbiAgICAgICAgICAgICAgICAgICAgPHA+XG4gICAgICAgICAgICAgICAgICAgICAgICB7ZG9jdG9yTmFtZX1cbiAgICAgICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtkYXRlfVxuICAgICAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgICAgIDxwPlxuICAgICAgICAgICAgICAgICAgICAgICAge3RoaXMuZ2V0VGltZShzbG90LnN0YXJ0KSArIFwiIHRvIFwiICsgdGhpcy5nZXRUaW1lKHNsb3QuZW5kKX1cbiAgICAgICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYm9va1wiPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0XCI+VmlldyBDb25maXJtYXRpb248L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDxSaWdodEFycm93SWNvbiBjbGFzc05hbWU9XCJib29rSWNvblwiIC8+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgQXBwb2ludG1lbnRMaXN0XG4iLCJpbXBvcnQgQXBwb2ludG1lbnRMaXN0IGZyb20gJy4vQXBwb2ludG1lbnRMaXN0LmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBBcHBvaW50bWVudExpc3QiLCJpbXBvcnQgVXNlckFwcG9pbnRtZW50c1ZpZXcgZnJvbSAnLi9Vc2VyQXBwb2ludG1lbnRzVmlldy5qcydcblxuZXhwb3J0IGRlZmF1bHQgVXNlckFwcG9pbnRtZW50c1ZpZXciLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgUHJvZmlsZVNsaWRlciBmcm9tICcuLi9wcm9maWxlU2xpZGVyL2luZGV4LmpzJ1xuaW1wb3J0IFByb2ZpbGVEYXRhIGZyb20gJy4vcHJvZmlsZURhdGEvaW5kZXguanMnXG5cbmNsYXNzIFVzZXJQcm9maWxlVmlldyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG5cbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgdGhpcy5wcm9wcy5nZXRVc2VyUHJvZmlsZSgpXG4gICAgfVxuXG4gICAgc3RhdGljIGNvbnRleHRUeXBlcyA9IHtcbiAgICAgICAgcm91dGVyOiAoKSA9PiBudWxsXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIGxldCBzZWxlY3RlZFVzZXIgPSBudWxsXG4gICAgICAgIGxldCB1c2VyUHJvZmlsZUlkID0gdGhpcy5wcm9wcy5tYXRjaC5wYXJhbXMuaWRcblxuICAgICAgICBpZiAodGhpcy5wcm9wcy5VU0VSLnByb2ZpbGVzW3VzZXJQcm9maWxlSWRdKSB7XG4gICAgICAgICAgICBzZWxlY3RlZFVzZXIgPSB0aGlzLnByb3BzLlVTRVIucHJvZmlsZXNbdXNlclByb2ZpbGVJZF1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIE9iamVjdC5rZXlzKHRoaXMucHJvcHMuVVNFUi5wcm9maWxlcykubWFwKChwcm9maWxlSWQpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5wcm9wcy5VU0VSLnByb2ZpbGVzW3Byb2ZpbGVJZF0uaXNEZWZhdWx0VXNlcikge1xuICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZFVzZXIgPSB0aGlzLnByb3BzLlVTRVIucHJvZmlsZXNbcHJvZmlsZUlkXVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInVzZXJQcm9maWxlXCI+XG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZFVzZXIgPyA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPFByb2ZpbGVTbGlkZXIgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvZmlsZXM9e3RoaXMucHJvcHMuVVNFUi5wcm9maWxlc31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWJSb3V0ZT1cIlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPFByb2ZpbGVEYXRhIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb2ZpbGVEYXRhPXtzZWxlY3RlZFVzZXJ9XG4gICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj4gOiBcIlwiXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgVXNlclByb2ZpbGVWaWV3XG4iLCJpbXBvcnQgVXNlclByb2ZpbGVWaWV3IGZyb20gJy4vVXNlclByb2ZpbGVWaWV3LmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBVc2VyUHJvZmlsZVZpZXciLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5jbGFzcyBQcm9maWxlRGF0YSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgfVxuXG4gICAgb3BlbkFwcG9pbnRtZW50cyhwcm9maWxlSWQpIHtcbiAgICAgICAgdGhpcy5jb250ZXh0LnJvdXRlci5oaXN0b3J5LnB1c2goYC91c2VyLyR7cHJvZmlsZUlkfS9hcHBvaW50bWVudHNgKVxuXG4gICAgfVxuXG4gICAgb3BlblJlcG9ydHMocHJvZmlsZUlkKSB7XG4gICAgICAgIHRoaXMuY29udGV4dC5yb3V0ZXIuaGlzdG9yeS5wdXNoKGAvdXNlci8ke3Byb2ZpbGVJZH0vcmVwb3J0c2ApXG5cbiAgICB9XG5cbiAgICBzdGF0aWMgY29udGV4dFR5cGVzID0ge1xuICAgICAgICByb3V0ZXI6ICgpID0+IG51bGxcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgbGV0IHtuYW1lLCBnZW5kZXIsIGFnZSwgbW9iaWxlLCBtZWRpY2FsSGlzdG9yeUNvdW50LCBtZWRpY2FsVGVzdENvdW50LCBvbmxpbmVDb25zdWx0YXRpb25Db3VudCwgb3BkVmlzaXRDb3VudCwgcHJvZmlsZUlkfSA9IHRoaXMucHJvcHMucHJvZmlsZURhdGFcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdj4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ1c2VyRGVhaWxcIj5cbiAgICAgICAgICAgICAgICAgICAgPHA+e25hbWV9PC9wPlxuICAgICAgICAgICAgICAgICAgICA8cD57YWdlfSBZZWFyczwvcD5cbiAgICAgICAgICAgICAgICAgICAgPHA+e2dlbmRlcn08L3A+XG4gICAgICAgICAgICAgICAgICAgIDxwPnttb2JpbGV9PC9wPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicHJvZmlsZUJ0bnNcIj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbj5Qcm9maWxlIE5vdCBWZXJpZmllZDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uPk5vIE9QRCBJbnN1cmFuY2U8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbj5PbmxpbmUgQ29uc3VsdGF0aW9ucyh7b25saW5lQ29uc3VsdGF0aW9uQ291bnR9KTwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9e3RoaXMub3BlbkFwcG9pbnRtZW50cy5iaW5kKHRoaXMscHJvZmlsZUlkKX0+T1BEIFZpc2l0cyAoe29wZFZpc2l0Q291bnR9KTwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uPk1lZGljYWwgSGlzdG9yeSAoe21lZGljYWxIaXN0b3J5Q291bnR9KTwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9e3RoaXMub3BlblJlcG9ydHMuYmluZCh0aGlzLHByb2ZpbGVJZCl9PlRlc3QgUmVwb3J0cyAoe21lZGljYWxUZXN0Q291bnR9KTwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IFByb2ZpbGVEYXRhXG4iLCJpbXBvcnQgUHJvZmlsZURhdGEgZnJvbSAnLi9Qcm9maWxlRGF0YS5qcydcblxuZXhwb3J0IGRlZmF1bHQgUHJvZmlsZURhdGEiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgUHJvZmlsZVNsaWRlciBmcm9tICcuLi9wcm9maWxlU2xpZGVyL2luZGV4LmpzJ1xuaW1wb3J0IFJlcG9ydExpc3QgZnJvbSAnLi9yZXBvcnRMaXN0L2luZGV4LmpzJ1xuXG5jbGFzcyBVc2VyUmVwb3J0c1ZpZXcgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgICAgICB0aGlzLnN0YXRlID0ge1xuXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgdGhpcy5wcm9wcy5nZXRVc2VyUHJvZmlsZVdpdGhUZXN0cygpXG4gICAgfVxuXG4gICAgc3RhdGljIGNvbnRleHRUeXBlcyA9IHtcbiAgICAgICAgcm91dGVyOiAoKSA9PiBudWxsXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIGxldCBzZWxlY3RlZFVzZXIgPSBudWxsXG4gICAgICAgIGxldCB1c2VyUHJvZmlsZUlkID0gdGhpcy5wcm9wcy5tYXRjaC5wYXJhbXMuaWRcblxuICAgICAgICBpZiAodGhpcy5wcm9wcy5VU0VSLnByb2ZpbGVzW3VzZXJQcm9maWxlSWRdKSB7XG4gICAgICAgICAgICBzZWxlY3RlZFVzZXIgPSB0aGlzLnByb3BzLlVTRVIucHJvZmlsZXNbdXNlclByb2ZpbGVJZF1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIHNlbGVjdGluZyBkZWZhdWx0IHVzZXJcbiAgICAgICAgICAgIE9iamVjdC5rZXlzKHRoaXMucHJvcHMuVVNFUi5wcm9maWxlcykubWFwKChwcm9maWxlSWQpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5wcm9wcy5VU0VSLnByb2ZpbGVzW3Byb2ZpbGVJZF0uaXNEZWZhdWx0VXNlcikge1xuICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZFVzZXIgPSB0aGlzLnByb3BzLlVTRVIucHJvZmlsZXNbcHJvZmlsZUlkXVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ1c2VyUHJvZmlsZVwiPlxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgKHNlbGVjdGVkVXNlciAmJiBzZWxlY3RlZFVzZXIudGVzdHMpID8gPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxQcm9maWxlU2xpZGVyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvZmlsZXM9e3RoaXMucHJvcHMuVVNFUi5wcm9maWxlc31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWJSb3V0ZT1cIi9yZXBvcnRzXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ1cGNvbWluZ2FwcFwiPlJlcG9ydHM8L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRVc2VyLnRlc3RzLm1hcCgodGVzdCwgaSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gPFJlcG9ydExpc3RcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE9e3Rlc3R9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk9e2l9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj4gOiBcIlwiXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgVXNlclJlcG9ydHNWaWV3XG4iLCJpbXBvcnQgVXNlclJlcG9ydHNWaWV3IGZyb20gJy4vVXNlclJlcG9ydHNWaWV3LmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBVc2VyUmVwb3J0c1ZpZXciLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5jbGFzcyBSZXBvcnRMaXN0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICB9XG5cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICBsZXQgeyBuYW1lLCBzdWJfbmFtZSwgYWJicmV2aWF0aW9uLCBjYXRlZ29yeSwgc2xvdCAgfSA9IHRoaXMucHJvcHMuZGF0YVxuICAgICAgICBzbG90ID0gc2xvdCB8fCB7XG4gICAgICAgICAgICBzdGFydDogMCxcbiAgICAgICAgICAgIGVuZDogMFxuICAgICAgICB9XG4gICAgICAgIGxldCBkYXRlID0gbmV3IERhdGUoc2xvdC5zdGFydCkudG9EYXRlU3RyaW5nKClcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhcHBvaW50bWVudFwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZGV0YWlsc1wiPlxuICAgICAgICAgICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtuYW1lICsgXCIgLCBcIiArIHN1Yl9uYW1lfVxuICAgICAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgICAgIDxwPlxuICAgICAgICAgICAgICAgICAgICAgICAge2NhdGVnb3J5ICsgXCIgLCBcIiArIGFiYnJldmlhdGlvbn1cbiAgICAgICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtkYXRlfVxuICAgICAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJib29rXCI+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInZpZXdyZXBvcnRcIj5WaWV3IFJlcG9ydDwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBSZXBvcnRMaXN0XG4iLCJpbXBvcnQgUmVwb3J0TGlzdCBmcm9tICcuL1JlcG9ydExpc3QuanMnXG5cbmV4cG9ydCBkZWZhdWx0IFJlcG9ydExpc3QiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcblxuaW1wb3J0IExhYkRldGFpbHMgZnJvbSAnLi4vY29tbW9ucy9sYWJEZXRhaWxzL2luZGV4LmpzJ1xuaW1wb3J0IE9yZGVyRGV0YWlscyBmcm9tICcuLi9jb21tb25zL29yZGVyRGV0YWlscy9pbmRleC5qcydcblxuY2xhc3MgQm9va2luZ1N1bW1hcnlWaWV3IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIGJvb2tpbmdJZDogbnVsbCxcbiAgICAgICAgICAgIGJvb2tpbmdEZXRhaWxzOiBudWxsXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRMb2NhdGlvblBhcmFtKHRhZykge1xuICAgICAgICAvLyB0aGlzIEFQSSBhc3N1bWVzIHRoZSBjb250ZXh0IG9mIHJlYWN0LXJvdXRlci00XG4gICAgICAgIGNvbnN0IHBhcmFtU3RyaW5nID0gdGhpcy5wcm9wcy5sb2NhdGlvbi5zZWFyY2hcbiAgICAgICAgY29uc3QgcGFyYW1zID0gbmV3IFVSTFNlYXJjaFBhcmFtcyhwYXJhbVN0cmluZylcbiAgICAgICAgcmV0dXJuIHBhcmFtcy5nZXQodGFnKVxuICAgIH1cblxuICAgIHByb2NlZWQoKSB7XG4gICAgICAgIHRoaXMuY29udGV4dC5yb3V0ZXIuaGlzdG9yeS5wdXNoKCcvcGF5bWVudCcpXG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIGxldCBib29raW5nSWQgPSB0aGlzLnByb3BzLm1hdGNoLnBhcmFtcy5pZFxuICAgICAgICBpZiAoYm9va2luZ0lkKSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgYm9va2luZ0lkIH0pXG4gICAgICAgICAgICB0aGlzLnByb3BzLmdldExhYkJvb2tpbmdTdW1tYXJ5KGJvb2tpbmdJZCwgKGJvb2tpbmdEZXRhaWxzKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGJvb2tpbmdEZXRhaWxzOiBib29raW5nRGV0YWlscy5kYXRhIH0pXG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhdGljIGNvbnRleHRUeXBlcyA9IHtcbiAgICAgICAgcm91dGVyOiAoKSA9PiBudWxsXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBhdGllbnREZXRhaWxzXCI+XG5cbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUuYm9va2luZ0RldGFpbHMgP1xuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdj5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxMYWJEZXRhaWxzIGRhdGE9e3RoaXMuc3RhdGUuYm9va2luZ0RldGFpbHMubGFifSAvPlxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzZWxlY3RlZEFwcG9pbnRtZW50U2xvdFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDU+U2VsZWN0ZWQgQXBwb2ludG1lbnQgU2xvdDwvaDU+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImFwcGRhdGVcIj5BcHBvaW50bWVudCBEYXRlPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJkYXRlXCI+e3RoaXMuc3RhdGUuYm9va2luZ0RldGFpbHMuc2VsZWN0ZWRTbG90U3RhcnR9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzZWxlY3RlZEFwcG9pbnRtZW50U2xvdFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7d2lkdGg6JzEwMCUnLCBmbG9hdDonbGVmdCd9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImFwcGRhdGVcIj5QYXRpZW50IE5hbWU8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJkYXRlXCI+e3RoaXMuc3RhdGUuYm9va2luZ0RldGFpbHMucGF0aWVudERldGFpbHMubmFtZX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7d2lkdGg6JzEwMCUnLCBmbG9hdDonbGVmdCd9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImFwcGRhdGVcIj5QYXRpZW50IEFkZHJlc3M8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJkYXRlXCI+e3RoaXMuc3RhdGUuYm9va2luZ0RldGFpbHMucGF0aWVudERldGFpbHMuYWRkcmVzc308L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPE9yZGVyRGV0YWlscyBkYXRhPXt0aGlzLnN0YXRlLmJvb2tpbmdEZXRhaWxzLmxhYn0gLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cInByb2NlZWRidG5cIiBvbkNsaWNrPXt0aGlzLnByb2NlZWQuYmluZCh0aGlzKX0+UHJvY2VlZCB0byBQYXltZW50PC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj4gOiBcIlwiXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgQm9va2luZ1N1bW1hcnlWaWV3XG4iLCJpbXBvcnQgQm9va2luZ1N1bW1hcnlWaWV3IGZyb20gJy4vQm9va2luZ1N1bW1hcnlWaWV3LmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBCb29raW5nU3VtbWFyeVZpZXciLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgQ2hpcCBmcm9tICdtYXRlcmlhbC11aS9DaGlwJztcblxuXG5jbGFzcyBDb21tb25seVNlYXJjaGVkIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcblxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIGxldCByb3dzID0gdGhpcy5wcm9wcy5kYXRhLm1hcCgocm93KSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcm9wcy50eXBlID09ICdsYWInKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIDxsaSBrZXk9e3Jvdy5pZH0+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJjdC1pbWcgbGFiLWltZ1wiXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbWcgc3JjPVwiL2Fzc2V0cy9pbWcvY3VzdG9tZXItaWNvbnMvbGFiMS5wbmdcIiBjbGFzc05hbWU9XCJpbWctZmx1aWRcIiAvPlxuICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cImxhYi1uYW1lXCI+U0xSIERpZ25vc3RpY3M8L3A+XG4gICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbGV0IHNlbGVjdGVkID0gZmFsc2VcbiAgICAgICAgICAgICAgICB0aGlzLnByb3BzLnNlbGVjdGVkLm1hcCgoY3VycikgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZihjdXJyLmlkID09IHJvdy5pZCl7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZCA9IHRydWVcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgcmV0dXJuIDxsaSBrZXk9e3Jvdy5pZH0+XG4gICAgICAgICAgICAgICAgICAgIDxhXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e3NlbGVjdGVkID8gXCJ2LWJ0biB2LWJ0bi1wcmltYXJ5IHRhZy1zbSBvdXRsaW5lIHNlbGVjdGVkXCIgOiBcInYtYnRuIHYtYnRuLXByaW1hcnkgdGFnLXNtIG91dGxpbmVcIn1cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy50b2dnbGUoKHRoaXMucHJvcHMudHlwZSB8fCByb3cudHlwZSksIHJvdylcbiAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtyb3cubmFtZX1cbiAgICAgICAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSlcblxuICAgICAgICBsZXQgZGl2Q2xhc3MgPSBgcGFuZWwtY29udGVudGBcbiAgICAgICAgbGV0IHVsQ2xhc3MgPSBgaW5saW5lLWxpc3RgXG5cbiAgICAgICAgaWYgKHRoaXMucHJvcHMudHlwZSA9PSAnbGFiJykge1xuICAgICAgICAgICAgZGl2Q2xhc3MgPSBgcGFuZWwtY29udGVudCB0b3RhbC1sYWJzYFxuICAgICAgICAgICAgdWxDbGFzcyA9IGBpbmxpbmUtbGlzdCBsYWItaXRlbXNgXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIndpZGdldC1wYW5lbFwiPlxuICAgICAgICAgICAgICAgIDxoNCBjbGFzc05hbWU9XCJwYW5lbC10aXRsZVwiPnt0aGlzLnByb3BzLmhlYWRpbmd9PC9oND5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17ZGl2Q2xhc3N9PlxuICAgICAgICAgICAgICAgICAgICA8dWwgY2xhc3NOYW1lPXt1bENsYXNzfT5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtyb3dzfVxuICAgICAgICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IENvbW1vbmx5U2VhcmNoZWRcbiIsImltcG9ydCBDb21tb25seVNlYXJjaGVkIGZyb20gJy4vQ29tbW9ubHlTZWFyY2hlZC5qcydcblxuXG5leHBvcnQgZGVmYXVsdCBDb21tb25seVNlYXJjaGVkIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cbmltcG9ydCBMYWJUZXN0cyBmcm9tICcuLi9sYWJUZXN0cydcblxuY2xhc3MgTGFiRGV0YWlscyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxzZWN0aW9uIGNsYXNzTmFtZT1cIndyYXAgcHJvZmlsZS1ib29rLXNjcmVlblwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGFpbmVyLWZsdWlkXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC0xMlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwid2lkZ2V0IHByb2ZpbGUtYm9va1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIndpZGdldC1oZWFkZXIgcGItaGVhZGVyIHRleHQtY2VudGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBiLWxvZ29cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW1nIHNyYz1cIi9hc3NldHMvaW1nL2N1c3RvbWVyLWljb25zL2xhYjEucG5nXCIgY2xhc3NOYW1lPVwiaW1nLWZsdWlkXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGg0IGNsYXNzTmFtZT1cIndpZGdldC10aXRsZSBwYi10aXRsZVwiPlNSTCBEaWdub3N0aWNzPC9oND5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cImxvY2F0aW9uXCI+U2VjdG9yIDUyIEd1cmdhb24gfCA8c3BhbiBjbGFzc05hbWU9XCJjdC1pbWcgY3QtaW1nLXhzXCI+PGltZyBzcmM9XCIvYXNzZXRzL2ltZy9jdXN0b21lci1pY29ucy9tYXAtbWFya2VyLnN2Z1wiIGNsYXNzTmFtZT1cImltZy1mbHVpZFwiIC8+PC9zcGFuPjEuNUtNPC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHVsIGNsYXNzTmFtZT1cImxpc3QgdGltZS1jb250YWN0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmdy03MDAgdGV4dC1zbVwiPlRpbWluZzogLTwvc3Bhbj43OjMwIEFNIHRvIDg6MzAgUE1cbiAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJvcGVuLWNsb3NlXCI+T3BlbiBUb2RheTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZnctNzAwIHRleHQtc21cIj5Db250YWN0OiAtPC9zcGFuPjAxMjAgMTIzNDU2NywgMDEyMCA3NjU0MzIxXG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwib3Blbi1jbG9zZVwiPkNhbGwgTm93PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8TGFiVGVzdHMgey4uLnRoaXMucHJvcHN9IC8+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3aWRnZXQtY29udGVudCBwYi1kZXRhaWxzIHBiLWxvY2F0aW9uXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDQgY2xhc3NOYW1lPVwid2MtdGl0bGUgdGV4dC1tZCBmdy03MDBcIj5Mb2NhdGlvbjwvaDQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkZHJlc3MtZGV0YWlsc1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbWcgc3JjPVwiL2Fzc2V0cy9pbWcvY3VzdG9tZXItaWNvbnMvbWFwLWljb24ucG5nXCIgY2xhc3NOYW1lPVwiaW1nLWZsdWlkIGFkZC1tYXBcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cImFkZC1pbmZvXCI+MTk2LCBIdWRhIFBsb3QsIE5lYXIsIERldmluZGVyIFZpaGFyLCBTZWN0b3IgNTYsIEd1cnVncmFtLCBIYXJ5YW5hIDEyMjAxMTwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwYi12aWV3IHRleHQtbGVmdFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhIGhyZWY9XCIjXCIgY2xhc3NOYW1lPVwibGluay10ZXh0IHRleHQtbWQgZnctNzAwXCI+VmlldyBpbiBHb29nbGUgTWFwPC9hPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIndpZGdldC1jb250ZW50IHBiLWRldGFpbHMgcGItZmFjaWxpdHlcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoNCBjbGFzc05hbWU9XCJ3Yy10aXRsZSB0ZXh0LW1kIGZ3LTcwMFwiPkZhY2lsaXR5PC9oND5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx1bCBjbGFzc05hbWU9XCJsaXN0IHBiLWxpc3QgZmFjaWx0eS1saXN0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpPlBhcmtpbmcgQXZhaWxhYmxlPC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGk+Q2FyZCBBY2NlcHRlZDwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpPkUgUmVwb3J0IEF2YWlsYWJsZTwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpPkhvbWUgQ2hla3VwIEF2YWlsYWJsZTwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3aWRnZXQtY29udGVudCBwYi1kZXRhaWxzIHBiLWFib3V0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDQgY2xhc3NOYW1lPVwid2MtdGl0bGUgdGV4dC1tZCBmdy03MDBcIj5BYm91dDwvaDQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cD5Mb3JlbSBpcHN1bSBkb2xvciBzaXQgYW1ldCwgY29uc2VjdGV0dXIgYWRpcGlzaWNpbmcgZWxpdCwgc2VkIGRvIGVpdXNtb2RcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGVtcG9yIGluY2lkaWR1bnQgdXQgbGFib3JlIGV0IGRvbG9yZSBtYWduYSBhbGlxdWEuIFV0IGVuaW0gYWQgbWluaW0gdmVuaWFtLFxuICAgICAgICAgICAgICAgICAgICBxdWlzIG5vc3RydWQgZXhlcmNpdGF0aW9uIHVsbGFtY28gbGFib3JpcyBuaXNpPC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHVsIGNsYXNzTmFtZT1cImxpc3QgcGItbGlzdCBmYWNpbHR5LWxpc3RcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGk+UGFya2luZyBBdmFpbGFibGU8L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaT5DYXJkIEFjY2VwdGVkPC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGk+RSBSZXBvcnQgQXZhaWxhYmxlPC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGk+SG9tZSBDaGVrdXAgQXZhaWxhYmxlPC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9zZWN0aW9uPlxuICAgICAgICApO1xuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBMYWJEZXRhaWxzXG4iLCJpbXBvcnQgTGFiRGV0YWlscyBmcm9tICcuL0xhYkRldGFpbC5qcydcblxuZXhwb3J0IGRlZmF1bHQgTGFiRGV0YWlscyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmNsYXNzIExhYlByb2ZpbGVDYXJkIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICB9XG5cbiAgICBvcGVuTGFiKGlkKXtcbiAgICAgICAgdGhpcy5wcm9wcy5oaXN0b3J5LnB1c2goYC9sYWIvJHtpZH0vYm9va2ApXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIndpZGdldCBjYXJkXCIgb25DbGljaz17dGhpcy5vcGVuTGFiLmJpbmQodGhpcyx0aGlzLnByb3BzLmRldGFpbHMubGFiLmlkKX0+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3aWRnZXQtY29udGVudCBjYXJkLWNvbnRlbnQgYm9vay1jYXJkXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibG9nby1yYXR0aW5nXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJjdC1pbWcgbGFiLWljb25cIj48aW1nIHNyYz1cIi9hc3NldHMvaW1nL2N1c3RvbWVyLWljb25zL2xhYjEucG5nXCIgY2xhc3NOYW1lPVwiaW1nLWZsdWlkXCIgLz48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dWwgY2xhc3NOYW1lPVwiaW5saW5lLWxpc3QgcmF0dGluZ1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaT48c3BhbiBjbGFzc05hbWU9XCJjdC1pbWcgY3QtaW1nLXhzIHN0YXItaWNvblwiPjxpbWcgc3JjPVwiL2Fzc2V0cy9pbWcvY3VzdG9tZXItaWNvbnMvc3Rhci5zdmdcIiBjbGFzc05hbWU9XCJpbWctZmx1aWRcIiAvPjwvc3Bhbj48L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaT48c3BhbiBjbGFzc05hbWU9XCJjdC1pbWcgY3QtaW1nLXhzIHN0YXItaWNvblwiPjxpbWcgc3JjPVwiL2Fzc2V0cy9pbWcvY3VzdG9tZXItaWNvbnMvc3Rhci5zdmdcIiBjbGFzc05hbWU9XCJpbWctZmx1aWRcIiAvPjwvc3Bhbj48L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaT48c3BhbiBjbGFzc05hbWU9XCJjdC1pbWcgY3QtaW1nLXhzIHN0YXItaWNvblwiPjxpbWcgc3JjPVwiL2Fzc2V0cy9pbWcvY3VzdG9tZXItaWNvbnMvc3Rhci5zdmdcIiBjbGFzc05hbWU9XCJpbWctZmx1aWRcIiAvPjwvc3Bhbj48L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaT48c3BhbiBjbGFzc05hbWU9XCJjdC1pbWcgY3QtaW1nLXhzIHN0YXItaWNvblwiPjxpbWcgc3JjPVwiL2Fzc2V0cy9pbWcvY3VzdG9tZXItaWNvbnMvc3Rhci5zdmdcIiBjbGFzc05hbWU9XCJpbWctZmx1aWRcIiAvPjwvc3Bhbj48L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaT48c3BhbiBjbGFzc05hbWU9XCJjdC1pbWcgY3QtaW1nLXhzIHN0YXItaWNvblwiPjxpbWcgc3JjPVwiL2Fzc2V0cy9pbWcvY3VzdG9tZXItaWNvbnMvaGFsZi1zdGFyLnN2Z1wiIGNsYXNzTmFtZT1cImltZy1mbHVpZFwiIC8+PC9zcGFuPjwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJ2LWJ0biB2LWJ0bi1wcmltYXJ5IHBpY2t1cC1idG5cIj5QaWNrdXAgQXZhaWxhYmxlPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJvb2stY2FyZC1jb250ZW50XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aDQgY2xhc3NOYW1lPVwiYm9vay1jYXJ0LXRpdGxlXCI+U1JMIERpZ25vc3RpY3M8L2g0PlxuICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwiZGVzY1wiPkJsb29kIFRlc3QsIFBhdGhvbG9neSBVbHRyYXNvdW5kLCBNUkksIENUSSBTZWN0b3IgNTIgR3VyZ2FvbiB8IDxzcGFuIGNsYXNzTmFtZT1cInRleHQtcHJpbWFyeSBmdy03MDBcIj4xLjUgS008L3NwYW4+PC9wPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIndpZGdldC1mb290ZXIgY2FyZC1mb290ZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLTZcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJsYWItcHJpY2VcIj5Ub3RhbCBScyAxMzU0PC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC02IHRleHQtcmlnaHRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cInYtYnRuIHYtYnRuLXByaW1hcnkgYnRuLW1kXCI+Qm9vayBMYWI8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBMYWJQcm9maWxlQ2FyZFxuIiwiaW1wb3J0IExhYlByb2ZpbGVDYXJkIGZyb20gJy4vTGFiUHJvZmlsZUNhcmQuanMnXG5cbmV4cG9ydCBkZWZhdWx0IExhYlByb2ZpbGVDYXJkIiwiaW1wb3J0IExhYlRlc3RzIGZyb20gJy4vbGFiVGVzdHMnXG5cbmV4cG9ydCBkZWZhdWx0IExhYlRlc3RzIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cbmNsYXNzIExhYlRlc3RzIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcblxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3aWRnZXQtY29udGVudCBwYi1kZXRhaWxzIHBiLXRlc3RcIj5cbiAgICAgICAgICAgICAgICA8aDQgY2xhc3NOYW1lPVwid2MtdGl0bGUgdGV4dC1tZCBmdy03MDBcIj5UZXN0cyAoMjgpPC9oND5cbiAgICAgICAgICAgICAgICA8dWwgY2xhc3NOYW1lPVwibGlzdCBwYi1saXN0IHBiLXRlc3QtbGlzdFwiPlxuICAgICAgICAgICAgICAgICAgICA8bGk+QUNJRCBQSE9TUEhBVEFTRSBUT1RBTCA8c3BhbiBjbGFzc05hbWU9XCJ0ZXN0LXByaWNlXCI+UnMgMjAwPC9zcGFuPjwvbGk+XG4gICAgICAgICAgICAgICAgICAgIDxsaT5BQ0lEIFBIT1NQSEFUQVNFIFRPVEFMIDxzcGFuIGNsYXNzTmFtZT1cInRlc3QtcHJpY2VcIj5ScyAyMDA8L3NwYW4+PC9saT5cbiAgICAgICAgICAgICAgICAgICAgPGxpPkFDSUQgUEhPU1BIQVRBU0UgVE9UQUwgPHNwYW4gY2xhc3NOYW1lPVwidGVzdC1wcmljZVwiPlJzIDIwMDwvc3Bhbj48L2xpPlxuICAgICAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwYi12aWV3IHRleHQtcmlnaHRcIj5cbiAgICAgICAgICAgICAgICAgICAgPGEgaHJlZj1cIiNcIiBjbGFzc05hbWU9XCJsaW5rLXRleHQgdGV4dC1tZCBmdy03MDBcIj5WaWV3IEFsbDwvYT5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBMYWJUZXN0c1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cbmltcG9ydCBFeHBhbnNpb25QYW5lbCwge1xuICAgIEV4cGFuc2lvblBhbmVsU3VtbWFyeSxcbiAgICBFeHBhbnNpb25QYW5lbERldGFpbHMsXG59IGZyb20gJ21hdGVyaWFsLXVpL0V4cGFuc2lvblBhbmVsJztcbmltcG9ydCBFeHBhbmRNb3JlSWNvbiBmcm9tICdtYXRlcmlhbC11aS1pY29ucy9FeHBhbmRNb3JlJztcblxuXG5jbGFzcyBPcmRlckRldGFpbHMgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIGxldCBwcmljZV9icmVha3VwID0gW11cbiAgICAgICAgbGV0IHRvdGFsUHJpY2UgPSAwXG4gICAgICAgIGxldCB0b3RhbFRlc3RzID0gMFxuICAgICAgICBpZiAodGhpcy5wcm9wcy5kYXRhLnByaWNlX2JyZWFrdXAgJiYgdGhpcy5wcm9wcy5kYXRhLnByaWNlX2JyZWFrdXAuYnJlYWt1cCkge1xuICAgICAgICAgICAgcHJpY2VfYnJlYWt1cCA9IHRoaXMucHJvcHMuZGF0YS5wcmljZV9icmVha3VwLmJyZWFrdXAubWFwKCh0ZXN0LCBpKSA9PiB7XG4gICAgICAgICAgICAgICAgdG90YWxQcmljZSArPSB0ZXN0LmFtb3VudFxuICAgICAgICAgICAgICAgIHRvdGFsVGVzdHMrK1xuICAgICAgICAgICAgICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT1cInRlc3RQcmljZVJvd1wiIGtleT17aX0+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRuYW1lXCI+e3Rlc3QubmFtZX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRhbW91bnRcIj5Scy4ge3Rlc3QuYW1vdW50fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJvcmRlckRldGFpbHNcIj5cbiAgICAgICAgICAgICAgICA8RXhwYW5zaW9uUGFuZWw+XG4gICAgICAgICAgICAgICAgICAgIDxFeHBhbnNpb25QYW5lbFN1bW1hcnkgZXhwYW5kSWNvbj17PEV4cGFuZE1vcmVJY29uIC8+fT5cbiAgICAgICAgICAgICAgICAgICAgICAgIE9yZGVyIERldGFpbHMgLSB7dG90YWxUZXN0c30gVGVzdHNcbiAgICAgICAgICAgICAgICAgICAgPC9FeHBhbnNpb25QYW5lbFN1bW1hcnk+XG4gICAgICAgICAgICAgICAgICAgIDxFeHBhbnNpb25QYW5lbERldGFpbHM+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInByaWNlQ29udFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtwcmljZV9icmVha3VwfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGVzdFRvdGFsUm93XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRuYW1lXCI+e1wiVG90YWxcIn08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRhbW91bnRcIj5Scy4ge3RvdGFsUHJpY2V9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGVzdFRvdGFsUm93XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRuYW1lXCI+e1wiR1NUXCJ9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0YW1vdW50XCI+UnMuIHt0b3RhbFByaWNlKjEuMTh9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGVzdFRvdGFsUm93XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRuYW1lXCI+e1wiUGF5YWJsZVwifTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGFtb3VudFwiPlJzLiB7dG90YWxQcmljZSoxLjE4fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L0V4cGFuc2lvblBhbmVsRGV0YWlscz5cbiAgICAgICAgICAgICAgICA8L0V4cGFuc2lvblBhbmVsPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IE9yZGVyRGV0YWlsc1xuIiwiaW1wb3J0IE9yZGVyRGV0YWlscyBmcm9tICcuL09yZGVyRGV0YWlscy5qcydcblxuZXhwb3J0IGRlZmF1bHQgT3JkZXJEZXRhaWxzIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGxpZ2h0QmFzZVRoZW1lIH0gZnJvbSAnbWF0ZXJpYWwtdWkvc3R5bGVzJztcblxuY29uc3QgZGVib3VuY2VyID0gKGZuLCBkZWxheSkgPT4ge1xuICAgIGxldCB0aW1lciA9IG51bGxcbiAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICBjbGVhclRpbWVvdXQodGltZXIpXG4gICAgICAgIHRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBmbi5jYWxsKHRoaXMpXG4gICAgICAgIH0sIGRlbGF5KVxuICAgIH1cbn1cblxuXG5jbGFzcyBDcml0ZXJpYVNlYXJjaFZpZXcgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgc2VhcmNoVmFsdWU6ICcnLFxuICAgICAgICAgICAgc2VhcmNoUmVzdWx0czogW11cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgICB0aGlzLmdldFNlYXJjaFJlc3VsdHMgPSBkZWJvdW5jZXIodGhpcy5nZXRTZWFyY2hSZXN1bHRzLmJpbmQodGhpcyksIDEwMDApXG4gICAgICAgIGxldCBpbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0b3BDcml0ZXJpYVNlYXJjaCcpXG4gICAgICAgIGlucHV0LmZvY3VzKClcbiAgICB9XG5cbiAgICBpbnB1dEhhbmRsZXIoZSkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHsgc2VhcmNoVmFsdWU6IGUudGFyZ2V0LnZhbHVlIH0pXG4gICAgICAgIHRoaXMuZ2V0U2VhcmNoUmVzdWx0cygpXG4gICAgfVxuXG4gICAgZ2V0U2VhcmNoUmVzdWx0cygpIHtcbiAgICAgICAgdGhpcy5wcm9wcy5nZXREaWFnbm9zaXNDcml0ZXJpYVJlc3VsdHModGhpcy5zdGF0ZS5zZWFyY2hWYWx1ZSwgKHNlYXJjaFJlc3VsdHMpID0+IHtcbiAgICAgICAgICAgIGlmIChzZWFyY2hSZXN1bHRzKSB7XG4gICAgICAgICAgICAgICAgbGV0IHRlc3RzID0gc2VhcmNoUmVzdWx0cy50ZXN0cy5tYXAoeCA9PiB7IHJldHVybiB7IC4uLngsIHR5cGU6ICd0ZXN0JyB9IH0pXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHNlYXJjaFJlc3VsdHM6IFsuLi50ZXN0c10gfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBhZGRDcml0ZXJpYShjcml0ZXJpYSkge1xuICAgICAgICB0aGlzLnByb3BzLnRvZ2dsZURpYWdub3Npc0NyaXRlcmlhKGNyaXRlcmlhLnR5cGUsIGNyaXRlcmlhKVxuICAgICAgICB0aGlzLnNldFN0YXRlKHsgc2VhcmNoVmFsdWU6IFwiXCIgfSlcbiAgICB9XG5cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICBsZXQgbG9jYXRpb24gPSBcIkd1cmdhb25cIlxuICAgICAgICBpZiAodGhpcy5wcm9wcy5zZWxlY3RlZExvY2F0aW9uKSB7XG4gICAgICAgICAgICBsb2NhdGlvbiA9IHRoaXMucHJvcHMuc2VsZWN0ZWRMb2NhdGlvbi5mb3JtYXR0ZWRfYWRkcmVzcy5zbGljZSgwLCA1KVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgPGhlYWRlciBjbGFzc05hbWU9XCJza2luLXByaW1hcnkgZml4ZWQgaG9yaXpvbnRhbCB0b3AgY3QtaGVhZGVyXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGFpbmVyLWZsdWlkXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLTEyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibmF2aWdhdGUtcm93XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dWwgY2xhc3NOYW1lPVwiaW5saW5lLWxpc3QgdG9wLW5hdiBhbHBoYS1ieCB0ZXh0LXdoaXRlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuaGlzdG9yeS5nbygtMSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaT48c3BhbiBjbGFzc05hbWU9XCJjdC1pbWcgY3QtaW1nLXNtIGFycm93LWltZ1wiPjxpbWcgc3JjPVwiL2Fzc2V0cy9pbWcvY3VzdG9tZXItaWNvbnMvbGVmdC1hcnJvdy5zdmdcIiBjbGFzc05hbWU9XCJpbWctZmx1aWRcIiAvPjwvc3Bhbj48L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaT48ZGl2IGNsYXNzTmFtZT1cInNjcmVlbi10aXRsZVwiPlNlYXJjaDwvZGl2PjwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHVsIGNsYXNzTmFtZT1cImlubGluZS1saXN0IHRvcC1uYXYgYmV0YS1ieCBmbG9hdC1yaWdodCB0ZXh0LXJpZ2h0IHRleHQtd2hpdGVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5oaXN0b3J5LnB1c2goJy9sb2NhdGlvbnNlYXJjaCcpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGk+PGRpdiBjbGFzc05hbWU9XCJzY3JlZW4tdGl0bGVcIj48c3BhbiBjbGFzc05hbWU9XCJjdC1pbWcgY3QtaW1nLXNtIG1hcC1tYXJrZXItaW1nXCI+PGltZyBzcmM9XCIvYXNzZXRzL2ltZy9jdXN0b21lci1pY29ucy9tYXAtbWFya2VyLnN2Z1wiIGNsYXNzTmFtZT1cImltZy1mbHVpZFwiIC8+PC9zcGFuPiB7bG9jYXRpb259PC9kaXY+PC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLTEyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic2VhcmNoLXJvd1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG9uLWdyb3VwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sIGlucHV0LW1kIHNlYXJjaC1pbnB1dFwiIGlkPVwidG9wQ3JpdGVyaWFTZWFyY2hcIiBvbkNoYW5nZT17dGhpcy5pbnB1dEhhbmRsZXIuYmluZCh0aGlzKX0gdmFsdWU9e3RoaXMuc3RhdGUuc2VhcmNoVmFsdWV9IHBsYWNlaG9sZGVyPVwiU2VhcmNoIGZvciBUZXN0ICYgTGFic1wiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiY3QtaW1nIGN0LWltZy1zbSBzZWFyY2gtaWNvblwiPjxpbWcgc3JjPVwiL2Fzc2V0cy9pbWcvY3VzdG9tZXItaWNvbnMvc2VhcmNoLWljb24uc3ZnXCIgLz48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9oZWFkZXI+XG5cbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUuc2VhcmNoVmFsdWUgP1xuXG4gICAgICAgICAgICAgICAgICAgICAgICA8c2VjdGlvbiBjbGFzc05hbWU9XCJ3cmFwIHdyYXAtMTAwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3aWRnZXQtcGFuZWxcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGg0IGNsYXNzTmFtZT1cInBhbmVsLXRpdGxlXCI+U2VhcmNoIFJlc3VsdDwvaDQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGFuZWwtY29udGVudFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHVsIGNsYXNzTmFtZT1cImxpc3Qgc2VhcmNoLXJlc3VsdC1saXN0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlLnNlYXJjaFJlc3VsdHMubWFwKChjdXJyLCBpKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gPGxpIG9uQ2xpY2s9e3RoaXMuYWRkQ3JpdGVyaWEuYmluZCh0aGlzLCBjdXJyKX0ga2V5PXtpfT48YT57Y3Vyci5uYW1lfTwvYT48L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9zZWN0aW9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgOiAodGhpcy5wcm9wcy5jaGlsZHJlbilcblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBDcml0ZXJpYVNlYXJjaFZpZXdcbiIsImltcG9ydCBDcml0ZXJpYVNlYXJjaFZpZXcgZnJvbSAnLi9Dcml0ZXJpYVNlYXJjaFZpZXcuanMnXG5cbmV4cG9ydCBkZWZhdWx0IENyaXRlcmlhU2VhcmNoVmlldyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCBMYWJEZXRhaWxzIGZyb20gJy4uL2NvbW1vbnMvbGFiRGV0YWlscy9pbmRleC5qcydcblxuY2xhc3MgTGFiVmlldyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgICBzZWxlY3RlZExhYjogbnVsbFxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIGxldCBsYWJJZCA9IHRoaXMucHJvcHMubWF0Y2gucGFyYW1zLmlkXG5cbiAgICAgICAgaWYgKGxhYklkKSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgc2VsZWN0ZWRMYWI6IGxhYklkIH0pXG4gICAgICAgICAgICB0aGlzLnByb3BzLmdldExhYkJ5SWQobGFiSWQpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdGF0aWMgY29udGV4dFR5cGVzID0ge1xuICAgICAgICByb3V0ZXI6ICgpID0+IG51bGxcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYXBwb2ludG1lbnRTbG90XCI+XG5cbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuTEFCU1t0aGlzLnN0YXRlLnNlbGVjdGVkTGFiXSA/XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGhlYWRlciBjbGFzc05hbWU9XCJza2luLXByaW1hcnkgZml4ZWQgaG9yaXpvbnRhbCB0b3AgcHJvZmlsZS1ib29rLWhlYWRlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lci1mbHVpZFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC00XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaGVhZGVyLXRpdGxlIGZ3LTcwMCBjYXBpdGFsaXplIHRleHQtd2hpdGVcIj5JQ09OPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtNFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLTRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHVsIGNsYXNzTmFtZT1cImlubGluZS1saXN0IGZsb2F0LXJpZ2h0IHVzZXItbm90aWZpY2F0aW9uLWFjdGlvblwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpPjxzcGFuIGNsYXNzTmFtZT1cImljb24gaWNvbi1tZCB0ZXh0LW1pZGRsZVwiPjxpbWcgc3JjPVwiL2Fzc2V0cy9pbWcvY3VzdG9tZXItaWNvbnMvdXNlci5zdmdcIiBjbGFzc05hbWU9XCJpbWctZmx1aWRcIiAvPjwvc3Bhbj48L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpPjxzcGFuIGNsYXNzTmFtZT1cImljb24gaWNvbi1tZCB0ZXh0LW1pZGRsZSBub3RpZmljYXRpb24taWNvblwiPjxpbWcgc3JjPVwiL2Fzc2V0cy9pbWcvY3VzdG9tZXItaWNvbnMvbm90aWZpY2F0aW9uLnN2Z1wiIGNsYXNzTmFtZT1cImltZy1mbHVpZFwiIC8+IDxzcGFuIGNsYXNzTmFtZT1cIm5vdGlmaWNhdGlvbi1hbGVydFwiIC8+PC9zcGFuPjwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9oZWFkZXI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJza2luLXByaW1hcnkgZW1wdHktaGVhZGVyIFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPExhYkRldGFpbHMgey4uLnRoaXMucHJvcHN9IGRhdGE9e3RoaXMucHJvcHMuTEFCU1t0aGlzLnN0YXRlLnNlbGVjdGVkTGFiXX0gLz5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwidi1idG4gdi1idG4tcHJpbWFyeSBidG4tbGcgZml4ZWQgaG9yaXpvbnRhbCBib3R0b20gbm8tcm91bmQgYnRuLWxnIHRleHQtbGdcIj48c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXhzIHNlbGVjdGVkLW9wdGlvblwiPigyIFNlbGVjdGVkKSA8L3NwYW4+Qm9va1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+IDogXCJcIlxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBMYWJWaWV3XG4iLCJpbXBvcnQgTGFiVmlldyBmcm9tICcuL0xhYlZpZXcuanMnXG5cbmV4cG9ydCBkZWZhdWx0IExhYlZpZXciLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcblxuaW1wb3J0IExhYkRldGFpbHMgZnJvbSAnLi4vY29tbW9ucy9sYWJEZXRhaWxzL2luZGV4LmpzJ1xuaW1wb3J0IE9yZGVyRGV0YWlscyBmcm9tICcuLi9jb21tb25zL29yZGVyRGV0YWlscy9pbmRleC5qcydcbmltcG9ydCBEZXRhaWxzRm9ybSBmcm9tICcuL2RldGFpbHNGb3JtL2luZGV4LmpzJ1xuaW1wb3J0IEFkZHJlc3NGb3JtIGZyb20gJy4vYWRkcmVzc0Zvcm0vaW5kZXguanMnO1xuXG5jbGFzcyBQYXRpZW50RGV0YWlsc1ZpZXcgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgc2VsZWN0ZWRMYWI6IG51bGwsXG4gICAgICAgICAgICBzZWxlY3RlZFRlc3RzOiBcIlwiLFxuICAgICAgICAgICAgc2VsZWN0ZWRTbG90OiBudWxsLFxuICAgICAgICAgICAgc2VsZWN0ZWRTbG90U3RhcnQgOiBudWxsLFxuICAgICAgICAgICAgc2VsZWN0ZWRTbG90RW5kIDogbnVsbFxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0TG9jYXRpb25QYXJhbSh0YWcpIHtcbiAgICAgICAgLy8gdGhpcyBBUEkgYXNzdW1lcyB0aGUgY29udGV4dCBvZiByZWFjdC1yb3V0ZXItNFxuICAgICAgICBjb25zdCBwYXJhbVN0cmluZyA9IHRoaXMucHJvcHMubG9jYXRpb24uc2VhcmNoXG4gICAgICAgIGNvbnN0IHBhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXMocGFyYW1TdHJpbmcpXG4gICAgICAgIHJldHVybiBwYXJhbXMuZ2V0KHRhZylcbiAgICB9XG5cbiAgICBwcm9jZWVkKCl7XG4gICAgICAgIHRoaXMuY29udGV4dC5yb3V0ZXIuaGlzdG9yeS5wdXNoKCcvbGFiL2Jvb2tpbmcvc3VtbWFyeS9JVUhCVUg4Nzg3VUhCJylcbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgbGV0IGxhYklkID0gdGhpcy5wcm9wcy5tYXRjaC5wYXJhbXMuaWRcbiAgICAgICAgbGV0IHRlc3RzID0gdGhpcy5nZXRMb2NhdGlvblBhcmFtKCd0ZXN0cycpXG4gICAgICAgIGxldCBzZWxlY3RlZFNsb3RTdGFydCA9IHRoaXMuZ2V0TG9jYXRpb25QYXJhbSgndF9zdGFydCcpXG4gICAgICAgIHNlbGVjdGVkU2xvdFN0YXJ0ID0gbmV3IERhdGUocGFyc2VGbG9hdChzZWxlY3RlZFNsb3RTdGFydCkpXG4gICAgICAgIHNlbGVjdGVkU2xvdFN0YXJ0ID0gc2VsZWN0ZWRTbG90U3RhcnQudG9TdHJpbmcoKVxuICAgICAgICBsZXQgc2VsZWN0ZWRTbG90RW5kID0gdGhpcy5nZXRMb2NhdGlvblBhcmFtKCd0X2VuZCcpXG4gICAgICAgIHNlbGVjdGVkU2xvdEVuZCA9IG5ldyBEYXRlKHBhcnNlRmxvYXQoc2VsZWN0ZWRTbG90RW5kKSlcbiAgICAgICAgc2VsZWN0ZWRTbG90RW5kID0gc2VsZWN0ZWRTbG90RW5kLnRvU3RyaW5nKClcbiAgICAgICAgaWYgKGxhYklkKSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgc2VsZWN0ZWRMYWI6IGxhYklkLCBzZWxlY3RlZFRlc3RzOiB0ZXN0cywgc2VsZWN0ZWRTbG90U3RhcnQsIHNlbGVjdGVkU2xvdEVuZCB9KVxuICAgICAgICAgICAgdGhpcy5wcm9wcy5nZXRMYWJCeUlkKGxhYklkKVxuXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdGF0aWMgY29udGV4dFR5cGVzID0ge1xuICAgICAgICByb3V0ZXI6ICgpID0+IG51bGxcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGF0aWVudERldGFpbHNcIj5cblxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5MQUJTW3RoaXMuc3RhdGUuc2VsZWN0ZWRMYWJdID9cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPExhYkRldGFpbHMgZGF0YT17dGhpcy5wcm9wcy5MQUJTW3RoaXMuc3RhdGUuc2VsZWN0ZWRMYWJdfSAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxPcmRlckRldGFpbHMgZGF0YT17dGhpcy5wcm9wcy5MQUJTW3RoaXMuc3RhdGUuc2VsZWN0ZWRMYWJdfSAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic2VsZWN0ZWRBcHBvaW50bWVudFNsb3RcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGg1PlNlbGVjdGVkIEFwcG9pbnRtZW50IFNsb3Q8L2g1PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJhcHBkYXRlXCI+QXBwb2ludG1lbnQgRGF0ZTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZGF0ZVwiPnsgdGhpcy5zdGF0ZS5zZWxlY3RlZFNsb3RTdGFydCB9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxEZXRhaWxzRm9ybSAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxBZGRyZXNzRm9ybSBjaXR5PVwiU2VsZWN0ZWQgdmFsdWVcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwicHJvY2VlZGJ0blwiIG9uQ2xpY2s9e3RoaXMucHJvY2VlZC5iaW5kKHRoaXMpfT5Qcm9jZWVkPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj4gOiBcIlwiXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgUGF0aWVudERldGFpbHNWaWV3XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcblxuY2xhc3MgQWRkcmVzc0Zvcm0gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgYWRkcmVzczonJyxcbiAgICAgICAgICAgIGxvY2FsaXR5OicnLFxuICAgICAgICAgICAgbGFuZG1hcms6JycsXG4gICAgICAgICAgICBwaW5jb2RlOicnLFxuICAgICAgICAgICAgY2l0eTpwcm9wcy5jaXR5XG5cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlucHV0SGFuZGxlcih3aGljaCwgZSl7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBbd2hpY2hdIDogZS50YXJnZXQudmFsdWUgfSlcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZGV0YWlsc0Zvcm1cIj5cbiAgICAgICAgICAgICAgICA8aDU+UGxlYXNlIHByb3ZpZGUgcGF0aWVudCBkZXRhaWxzPC9oNT5cblxuICAgICAgICAgICAgICAgIDxpbnB1dCB2YWx1ZT17dGhpcy5zdGF0ZS5hZGRyZXNzfSBvbkNoYW5nZT17dGhpcy5pbnB1dEhhbmRsZXIuYmluZCh0aGlzLCdhZGRyZXNzJyl9IGNsYXNzTmFtZT1cInB0bmFtZVwiIHBsYWNlaG9sZGVyPVwiQWRkcmVzcypcIiAvPlxuICAgICAgICAgICAgICAgIDxpbnB1dCB2YWx1ZT17dGhpcy5zdGF0ZS5sb2NhbGl0eX0gb25DaGFuZ2U9e3RoaXMuaW5wdXRIYW5kbGVyLmJpbmQodGhpcywnbG9jYWxpdHknKX0gY2xhc3NOYW1lPVwicHRuYW1lXCIgcGxhY2Vob2xkZXI9XCJMb2NhbGl0eSpcIiAvPlxuICAgICAgICAgICAgICAgIDxpbnB1dCB2YWx1ZT17dGhpcy5zdGF0ZS5sYW5kbWFya30gb25DaGFuZ2U9e3RoaXMuaW5wdXRIYW5kbGVyLmJpbmQodGhpcywnbGFuZG1hcmsnKX0gY2xhc3NOYW1lPVwicHRuYW1lXCIgcGxhY2Vob2xkZXI9XCJMYW5kbWFyaypcIiAvPlxuICAgICAgICAgICAgICAgIDxpbnB1dCB2YWx1ZT17dGhpcy5zdGF0ZS5waW5jb2RlfSBvbkNoYW5nZT17dGhpcy5pbnB1dEhhbmRsZXIuYmluZCh0aGlzLCdwaW5jb2RlJyl9IGNsYXNzTmFtZT1cInB0bW9iaWxlXCIgcGxhY2Vob2xkZXI9XCJQaW5jb2RlKlwiIC8+XG4gICAgICAgICAgICAgICAgey8qIDxpbnB1dCB2YWx1ZT17dGhpcy5zdGF0ZS5jaXR5fSBvbkNoYW5nZT17dGhpcy5pbnB1dEhhbmRsZXIuYmluZCh0aGlzLCdjaXR5Jyl9IGRpc2FibGVkIGNsYXNzTmFtZT1cInB0b3RwXCIgcGxhY2Vob2xkZXI9XCJDaXR5XCIgLz4gKi99XG5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBBZGRyZXNzRm9ybVxuIiwiaW1wb3J0IEFkZHJlc3NGb3JtIGZyb20gJy4vQWRkcmVzc0Zvcm0uanMnXG5cbmV4cG9ydCBkZWZhdWx0IEFkZHJlc3NGb3JtIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cbmNsYXNzIERldGFpbHNGb3JtIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIHBhdGllbnROYW1lIDogJycsXG4gICAgICAgICAgICBwYXRpZW50RW1haWwgOiAnJyxcbiAgICAgICAgICAgIHBhdGllbnRHZW5kZXIgOiAnbWFsZScsXG4gICAgICAgICAgICBtb2JpbGU6JycsXG4gICAgICAgICAgICBvdHAgOicnLFxuICAgICAgICAgICAgcGF0aWVudE1vYmlsZSA6ICcnXG5cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlucHV0SGFuZGxlcih3aGljaCwgZSl7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBbd2hpY2hdIDogZS50YXJnZXQudmFsdWUgfSlcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZGV0YWlsc0Zvcm1cIj5cbiAgICAgICAgICAgICAgICA8aDU+UGxlYXNlIHByb3ZpZGUgcGF0aWVudCBkZXRhaWxzPC9oNT5cblxuICAgICAgICAgICAgICAgIDxpbnB1dCB2YWx1ZT17dGhpcy5zdGF0ZS5wYXRpZW50TmFtZX0gb25DaGFuZ2U9e3RoaXMuaW5wdXRIYW5kbGVyLmJpbmQodGhpcywncGF0aWVudE5hbWUnKX0gY2xhc3NOYW1lPVwicHRuYW1lXCIgcGxhY2Vob2xkZXI9XCJQYXRpZW50IE5hbWUqXCIgLz5cbiAgICAgICAgICAgICAgICA8aW5wdXQgdmFsdWU9e3RoaXMuc3RhdGUucGF0aWVudEVtYWlsfSBvbkNoYW5nZT17dGhpcy5pbnB1dEhhbmRsZXIuYmluZCh0aGlzLCdwYXRpZW50RW1haWwnKX0gY2xhc3NOYW1lPVwicHRlbWFpbFwiIHBsYWNlaG9sZGVyPVwiRW1haWwqXCIgLz5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInB0Z2VuZGVyXCI+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuPkdlbmRlciA6PC9zcGFuPiBcbiAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJyYWRpb1wiIG5hbWU9XCJnZW5kZXJcIiB2YWx1ZT1cIm1hbGVcIiBjaGVja2VkPXt0aGlzLnN0YXRlLnBhdGllbnRHZW5kZXIgPT09IFwibWFsZVwifSBvbkNoYW5nZT17dGhpcy5pbnB1dEhhbmRsZXIuYmluZCh0aGlzLCdwYXRpZW50R2VuZGVyJyl9Lz4gTWFsZVxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInJhZGlvXCIgbmFtZT1cImdlbmRlclwiIHZhbHVlPVwiZmVtYWxlXCIgY2hlY2tlZD17dGhpcy5zdGF0ZS5wYXRpZW50R2VuZGVyID09PSBcImZlbWFsZVwifSBvbkNoYW5nZT17dGhpcy5pbnB1dEhhbmRsZXIuYmluZCh0aGlzLCdwYXRpZW50R2VuZGVyJyl9Lz4gRmVtYWxlXG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGlucHV0IHZhbHVlPXt0aGlzLnN0YXRlLm1vYmlsZX0gb25DaGFuZ2U9e3RoaXMuaW5wdXRIYW5kbGVyLmJpbmQodGhpcywnbW9iaWxlJyl9IGNsYXNzTmFtZT1cInB0bW9iaWxlXCIgcGxhY2Vob2xkZXI9XCJNb2JpbGUqXCIgLz5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cIm90cGJ0blwiPihSZSlTZW5kIE9UUDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDxpbnB1dCB2YWx1ZT17dGhpcy5zdGF0ZS5vdHB9IG9uQ2hhbmdlPXt0aGlzLmlucHV0SGFuZGxlci5iaW5kKHRoaXMsJ290cCcpfSBjbGFzc05hbWU9XCJwdG90cFwiIHBsYWNlaG9sZGVyPVwiRW50ZXIgT1RQKlwiIC8+XG4gICAgICAgICAgICAgICAgPGlucHV0IHZhbHVlPXt0aGlzLnN0YXRlLnBhdGllbnRNb2JpbGV9IG9uQ2hhbmdlPXt0aGlzLmlucHV0SGFuZGxlci5iaW5kKHRoaXMsJ3BhdGllbnRNb2JpbGUnKX0gY2xhc3NOYW1lPVwicHRtb2JpbGVcIiBwbGFjZWhvbGRlcj1cIlBhdGllbnQgTW9iaWxlKlwiIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICBcbiAgICAgICAgKTtcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgRGV0YWlsc0Zvcm1cbiIsImltcG9ydCBEZXRhaWxzRm9ybSBmcm9tICcuL0RldGFpbHNGb3JtLmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBEZXRhaWxzRm9ybSIsImltcG9ydCBQYXRpZW50RGV0YWlsc1ZpZXcgZnJvbSAnLi9QYXRpZW50RGV0YWlsc1ZpZXcuanMnXG5cbmV4cG9ydCBkZWZhdWx0IFBhdGllbnREZXRhaWxzVmlldyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG5pbXBvcnQgQ29tbW9ubHlTZWFyY2hlZCBmcm9tICcuLi9jb21tb25zL2NvbW1vbmx5U2VhcmNoZWQvaW5kZXguanMnXG5pbXBvcnQgQ3JpdGVyaWFTZWFyY2ggZnJvbSAnLi4vY3JpdGVyaWFTZWFyY2gnXG5cbmNsYXNzIFNlYXJjaENyaXRlcmlhVmlldyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG5cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNlYXJjaFByb2NlZWQoKSB7XG4gICAgICAgIGxldCBzZWFyY2hEYXRhID0ge1xuICAgICAgICAgICAgc2VsZWN0ZWRDcml0ZXJpYXMgOiB0aGlzLnByb3BzLnNlbGVjdGVkQ3JpdGVyaWFzLFxuICAgICAgICAgICAgc2VsZWN0ZWRMb2NhdGlvbiA6IHRoaXMucHJvcHMuc2VsZWN0ZWRMb2NhdGlvbixcbiAgICAgICAgfVxuICAgICAgICBzZWFyY2hEYXRhID0gZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNlYXJjaERhdGEpKVxuICAgICAgICBsZXQgZmlsdGVyRGF0YSA9IGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeSh0aGlzLnByb3BzLmZpbHRlckNyaXRlcmlhKSlcbiAgICAgICAgdGhpcy5wcm9wcy5oaXN0b3J5LnB1c2goYC9keC9zZWFyY2hyZXN1bHRzP3NlYXJjaD0ke3NlYXJjaERhdGF9JmZpbHRlcj0ke2ZpbHRlckRhdGF9YClcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXY+XG5cbiAgICAgICAgICAgICAgICA8Q3JpdGVyaWFTZWFyY2ggey4uLnRoaXMucHJvcHN9PlxuICAgICAgICAgICAgICAgICAgICA8c2VjdGlvbiBjbGFzc05hbWU9XCJ3cmFwIHdyYXAtMTAwXCI+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxDb21tb25seVNlYXJjaGVkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGluZz1cIlNlbGVjdGVkIENyaXRlcmlhXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhPXt0aGlzLnByb3BzLnNlbGVjdGVkQ3JpdGVyaWFzfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkPXtbXX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b2dnbGU9e3RoaXMucHJvcHMudG9nZ2xlRGlhZ25vc2lzQ3JpdGVyaWEuYmluZCh0aGlzKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxDb21tb25seVNlYXJjaGVkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGluZz1cIkNvbW1vbiBUZXN0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwidGVzdFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YT17dGhpcy5wcm9wcy5jb21tb25fdGVzdHN9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWQ9e3RoaXMucHJvcHMuc2VsZWN0ZWRDcml0ZXJpYXMuZmlsdGVyKHggPT4geC50eXBlID09ICd0ZXN0Jyl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9nZ2xlPXt0aGlzLnByb3BzLnRvZ2dsZURpYWdub3Npc0NyaXRlcmlhLmJpbmQodGhpcyl9XG4gICAgICAgICAgICAgICAgICAgICAgICAvPlxuXG4gICAgICAgICAgICAgICAgICAgICAgICA8Q29tbW9ubHlTZWFyY2hlZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRpbmc9XCJDb21tb24gQ29uZGl0aW9uc1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImxhYlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YT17dGhpcy5wcm9wcy5jb21tb25fY29uZGl0aW9uc31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZD17dGhpcy5wcm9wcy5zZWxlY3RlZENyaXRlcmlhcy5maWx0ZXIoeCA9PiB4LnR5cGUgPT0gJ2xhYicpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvZ2dsZT17dGhpcy5wcm9wcy50b2dnbGVEaWFnbm9zaXNDcml0ZXJpYS5iaW5kKHRoaXMpfVxuICAgICAgICAgICAgICAgICAgICAgICAgLz5cblxuICAgICAgICAgICAgICAgICAgICAgICAgPENvbW1vbmx5U2VhcmNoZWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWFkaW5nPVwiQ29tbW9uIExhYnNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJsYWJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE9e3RoaXMucHJvcHMucHJlZmVycmVkX2xhYnN9XG4gICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICA8L3NlY3Rpb24+XG4gICAgICAgICAgICAgICAgPC9Dcml0ZXJpYVNlYXJjaD5cblxuXG5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9e3RoaXMuc2VhcmNoUHJvY2VlZC5iaW5kKHRoaXMpfSBjbGFzc05hbWU9XCJ2LWJ0biB2LWJ0bi1wcmltYXJ5IGJ0bi1sZyBmaXhlZCBob3Jpem9udGFsIGJvdHRvbSBuby1yb3VuZCB0ZXh0LWxnXCI+U2hvdyBMYWJzPC9idXR0b24+XG5cblxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBTZWFyY2hDcml0ZXJpYVZpZXdcbiIsImltcG9ydCBTZWFyY2hDcml0ZXJpYVZpZXcgZnJvbSAnLi9TZWFyY2hDcml0ZXJpYVZpZXcuanMnXG5cbmV4cG9ydCBkZWZhdWx0IFNlYXJjaENyaXRlcmlhVmlldyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCBMYWJzTGlzdCBmcm9tICcuLi9zZWFyY2hSZXN1bHRzL2xhYnNMaXN0L2luZGV4LmpzJ1xuaW1wb3J0IENyaXRlcmlhU2VhcmNoIGZyb20gJy4uL2NyaXRlcmlhU2VhcmNoJ1xuaW1wb3J0IFRvcEJhciBmcm9tICcuL3RvcEJhcidcblxuY2xhc3MgU2VhcmNoUmVzdWx0c1ZpZXcgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgICAgICB0aGlzLnN0YXRlID0ge1xuXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgdGhpcy5nZXRMYWJzKClcbiAgICB9XG5cbiAgICBnZXRMYWJzKCkge1xuICAgICAgICBsZXQge1xuICAgICAgICAgICAgc2VsZWN0ZWRMb2NhdGlvbixcbiAgICAgICAgICAgIHNlbGVjdGVkQ3JpdGVyaWFzLFxuICAgICAgICAgICAgZmlsdGVyQ3JpdGVyaWEsXG4gICAgICAgICAgICBMT0FERURfU0VBUkNIX0NSSVRFUklBX0xBQlxuICAgICAgICB9ID0gdGhpcy5wcm9wc1xuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBsZXQgc2VhcmNoU3RhdGUgPSB0aGlzLmdldExvY2F0aW9uUGFyYW0oJ3NlYXJjaCcpXG4gICAgICAgICAgICBsZXQgZmlsdGVyQ3JpdGVyaWEgPSB0aGlzLmdldExvY2F0aW9uUGFyYW0oJ2ZpbHRlcicpXG4gICAgICAgICAgICBpZiAoZmlsdGVyQ3JpdGVyaWEpIHtcbiAgICAgICAgICAgICAgICBmaWx0ZXJDcml0ZXJpYSA9IEpTT04ucGFyc2UoZmlsdGVyQ3JpdGVyaWEpXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGZpbHRlckNyaXRlcmlhID0ge31cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNlYXJjaFN0YXRlID0gSlNPTi5wYXJzZShzZWFyY2hTdGF0ZSlcbiAgICAgICAgICAgIHRoaXMuZ2V0TGFiTGlzdChzZWFyY2hTdGF0ZSwgZmlsdGVyQ3JpdGVyaWEsIHRydWUpXG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZSlcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldExvY2F0aW9uUGFyYW0odGFnKSB7XG4gICAgICAgIC8vIHRoaXMgQVBJIGFzc3VtZXMgdGhlIGNvbnRleHQgb2YgcmVhY3Qtcm91dGVyLTRcbiAgICAgICAgY29uc3QgcGFyYW1TdHJpbmcgPSB0aGlzLnByb3BzLmxvY2F0aW9uLnNlYXJjaFxuICAgICAgICBjb25zdCBwYXJhbXMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKHBhcmFtU3RyaW5nKVxuICAgICAgICByZXR1cm4gcGFyYW1zLmdldCh0YWcpXG4gICAgfVxuXG4gICAgZ2V0TGFiTGlzdChzZWFyY2hTdGF0ZSwgZmlsdGVyQ3JpdGVyaWEsIG1lcmdlU3RhdGUpIHtcbiAgICAgICAgdGhpcy5wcm9wcy5nZXRMYWJzKHNlYXJjaFN0YXRlLCBmaWx0ZXJDcml0ZXJpYSwgbWVyZ2VTdGF0ZSk7XG4gICAgfVxuXG4gICAgYXBwbHlGaWx0ZXJzKGZpbHRlclN0YXRlKSB7XG4gICAgICAgIGxldCBzZWFyY2hTdGF0ZSA9IHtcbiAgICAgICAgICAgIHNlbGVjdGVkQ3JpdGVyaWFzOiB0aGlzLnByb3BzLnNlbGVjdGVkQ3JpdGVyaWFzLFxuICAgICAgICAgICAgc2VsZWN0ZWRMb2NhdGlvbjogdGhpcy5wcm9wcy5zZWxlY3RlZExvY2F0aW9uLFxuICAgICAgICB9XG4gICAgICAgIGxldCBzZWFyY2hEYXRhID0gZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNlYXJjaFN0YXRlKSlcbiAgICAgICAgbGV0IGZpbHRlckRhdGEgPSBlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoZmlsdGVyU3RhdGUpKVxuICAgICAgICB0aGlzLnByb3BzLmhpc3RvcnkucmVwbGFjZShgL2R4L3NlYXJjaHJlc3VsdHM/c2VhcmNoPSR7c2VhcmNoRGF0YX0mZmlsdGVyPSR7ZmlsdGVyRGF0YX1gKVxuXG4gICAgICAgIHRoaXMuZ2V0TGFiTGlzdChzZWFyY2hTdGF0ZSwgZmlsdGVyU3RhdGUsIGZhbHNlKVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzZWFyY2hSZXN1bHRzXCI+XG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnByb3BzLkxPQURFRF9MQUJTX1NFQVJDSCA/XG4gICAgICAgICAgICAgICAgICAgICAgICA8Q3JpdGVyaWFTZWFyY2ggey4uLnRoaXMucHJvcHN9ID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8VG9wQmFyIHsuLi50aGlzLnByb3BzfSBhcHBseUZpbHRlcnM9e3RoaXMuYXBwbHlGaWx0ZXJzLmJpbmQodGhpcyl9Lz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8TGFic0xpc3Qgey4uLnRoaXMucHJvcHN9IC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L0NyaXRlcmlhU2VhcmNoPiA6IFwiXCJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFNlYXJjaFJlc3VsdHNWaWV3XG4iLCJpbXBvcnQgU2VhcmNoUmVzdWx0c1ZpZXcgZnJvbSAnLi9TZWFyY2hSZXN1bHRzVmlldy5qcydcblxuZXhwb3J0IGRlZmF1bHQgU2VhcmNoUmVzdWx0c1ZpZXciLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgTGFiUHJvZmlsZUNhcmQgZnJvbSAnLi4vLi4vY29tbW9ucy9sYWJQcm9maWxlQ2FyZC9pbmRleC5qcydcblxuY2xhc3MgTGFic0xpc3QgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgIH1cblxuICAgIHN0YXRpYyBjb250ZXh0VHlwZXMgPSB7XG4gICAgICAgIHJvdXRlcjogKCkgPT4gbnVsbFxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICBsZXQgeyBMQUJTLCBsYWJMaXN0IH0gPSB0aGlzLnByb3BzXG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxzZWN0aW9uIGNsYXNzTmFtZT1cIndyYXAgc2VhcmNoLWJvb2stcmVzdWx0XCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250YWluZXItZmx1aWRcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLTEyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJMaXN0Lm1hcCgobGFiSWQsIGkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiA8TGFiUHJvZmlsZUNhcmQgey4uLnRoaXMucHJvcHN9IGRldGFpbHM9e0xBQlNbbGFiSWRdfSBrZXk9e2l9IC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9zZWN0aW9uPlxuICAgICAgICApO1xuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBMYWJzTGlzdFxuIiwiaW1wb3J0IExhYnNMaXN0IGZyb20gJy4vTGFic0xpc3QuanMnXG5cbmV4cG9ydCBkZWZhdWx0IExhYnNMaXN0IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cbmltcG9ydCBNZW51LCB7IE1lbnVJdGVtIH0gZnJvbSAnbWF0ZXJpYWwtdWkvTWVudSc7XG5pbXBvcnQgUmFuZ2UgZnJvbSAncmMtc2xpZGVyL2xpYi9SYW5nZSc7XG5cbmNsYXNzIFRvcEJhciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgICBhbmNob3JFbDogbnVsbCxcbiAgICAgICAgICAgIG9wZW5GaWx0ZXI6IGZhbHNlLFxuICAgICAgICAgICAgcHJpY2VSYW5nZTogWzEwMCwgMTUwMF0sXG4gICAgICAgICAgICBkaXN0YW5jZVJhbmdlOiBbMSwgMzVdLFxuICAgICAgICAgICAgc29ydEJ5OiBudWxsXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKHByb3BzKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyAuLi5wcm9wcy5maWx0ZXJDcml0ZXJpYSB9KVxuICAgIH1cblxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHsgLi4udGhpcy5wcm9wcy5maWx0ZXJDcml0ZXJpYSB9KVxuICAgIH1cblxuICAgIGFwcGx5RmlsdGVycygpIHtcbiAgICAgICAgbGV0IGZpbHRlclN0YXRlID0ge1xuICAgICAgICAgICAgcHJpY2VSYW5nZTogdGhpcy5zdGF0ZS5wcmljZVJhbmdlLFxuICAgICAgICAgICAgZGlzdGFuY2VSYW5nZTogdGhpcy5zdGF0ZS5kaXN0YW5jZVJhbmdlLFxuICAgICAgICAgICAgc29ydEJ5OiB0aGlzLnN0YXRlLnNvcnRCeVxuICAgICAgICB9XG4gICAgICAgIHRoaXMucHJvcHMuYXBwbHlGaWx0ZXJzKGZpbHRlclN0YXRlKVxuICAgICAgICB0aGlzLnNldFN0YXRlKHsgb3BlbkZpbHRlcjogZmFsc2UgfSlcbiAgICB9XG5cbiAgICBoYW5kbGVPcGVuKGV2ZW50KSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBhbmNob3JFbDogZXZlbnQuY3VycmVudFRhcmdldCB9KVxuICAgIH1cblxuICAgIGhhbmRsZUNsb3NlKHR5cGUpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGFuY2hvckVsOiBudWxsLCBzb3J0Qnk6IHR5cGUgfSwgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5hcHBseUZpbHRlcnMoKVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIHRvZ2dsZUZpbHRlcigpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBvcGVuRmlsdGVyOiAhdGhpcy5zdGF0ZS5vcGVuRmlsdGVyXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgaGFuZGxlUmFuZ2UodHlwZSwgcmFuZ2UpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBbdHlwZV06IHJhbmdlXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgZ2V0Q3JpdGVyaWFTdHJpbmcoc2VsZWN0ZWRDcml0ZXJpYXMpIHtcbiAgICAgICAgaWYgKHNlbGVjdGVkQ3JpdGVyaWFzICYmIHNlbGVjdGVkQ3JpdGVyaWFzLmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuIHNlbGVjdGVkQ3JpdGVyaWFzLnJlZHVjZSgoZmluYWwsIGN1cnIsIGkpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoaSAhPSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGZpbmFsICs9ICcsICdcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZmluYWwgKz0gYCR7Y3Vyci5uYW1lfWBcbiAgICAgICAgICAgICAgICByZXR1cm4gZmluYWxcbiAgICAgICAgICAgIH0sIFwiXCIpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgbGV0IGNyaXRlcmlhU3RyID0gdGhpcy5nZXRDcml0ZXJpYVN0cmluZyh0aGlzLnByb3BzLnNlbGVjdGVkQ3JpdGVyaWFzKVxuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8c2VjdGlvbiBjbGFzc05hbWU9XCJmaWx0ZXItcm93XCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250YWluZXItZmx1aWRcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLTEyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmaWx0ZXItaXRlbVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFjdGlvbi1maWx0ZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx1bCBjbGFzc05hbWU9XCJpbmxpbmUtbGlzdFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaSBvbkNsaWNrPXt0aGlzLmhhbmRsZU9wZW4uYmluZCh0aGlzKX0+PHNwYW4gY2xhc3NOYW1lPVwiY3QtaW1nIGN0LWltZy1zbSBmaWx0ZXItaWNvbiB0ZXh0LXJpZ2h0XCI+PGltZyBzcmM9XCIvYXNzZXRzL2ltZy9jdXN0b21lci1pY29ucy9yYW5nZS5zdmdcIiBjbGFzc05hbWU9XCJpbWctZmx1aWRcIiAvPjwvc3Bhbj48L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaSBvbkNsaWNrPXt0aGlzLnRvZ2dsZUZpbHRlci5iaW5kKHRoaXMpfT48c3BhbiBjbGFzc05hbWU9XCJjdC1pbWcgY3QtaW1nLXNtIGZpbHRlci1pY29uIHRleHQtcmlnaHQgYXBwbGllZC1maWx0ZXJcIj48aW1nIHNyYz1cIi9hc3NldHMvaW1nL2N1c3RvbWVyLWljb25zL2ZpbHRlci5zdmdcIiBjbGFzc05hbWU9XCJpbWctZmx1aWRcIiAvPjwvc3Bhbj48c3BhbiBjbGFzc05hbWU9XCJhcHBsaWVkLWZpbHRlci1ub3RpXCIgLz48L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmlsdGVyLXRpdGxlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5sYWJMaXN0Lmxlbmd0aH0gUmVzdWx0cyBmb3VuZCBmb3IgPHNwYW4gY2xhc3NOYW1lPVwiZnctNzAwXCI+IHtjcml0ZXJpYVN0cn08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxNZW51XG4gICAgICAgICAgICAgICAgICAgIGlkPVwic29ydC1tZW51XCJcbiAgICAgICAgICAgICAgICAgICAgYW5jaG9yRWw9e3RoaXMuc3RhdGUuYW5jaG9yRWx9XG4gICAgICAgICAgICAgICAgICAgIG9wZW49e0Jvb2xlYW4odGhpcy5zdGF0ZS5hbmNob3JFbCl9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2xvc2U9e3RoaXMuaGFuZGxlQ2xvc2UuYmluZCh0aGlzKX1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIDxNZW51SXRlbSBvbkNsaWNrPXt0aGlzLmhhbmRsZUNsb3NlLmJpbmQodGhpcywgJ25hbWUnKX0+UmVsYXZhbmNlPC9NZW51SXRlbT5cbiAgICAgICAgICAgICAgICAgICAgPE1lbnVJdGVtIG9uQ2xpY2s9e3RoaXMuaGFuZGxlQ2xvc2UuYmluZCh0aGlzLCAncHJpY2UnKX0+RmVlPC9NZW51SXRlbT5cbiAgICAgICAgICAgICAgICAgICAgPE1lbnVJdGVtIG9uQ2xpY2s9e3RoaXMuaGFuZGxlQ2xvc2UuYmluZCh0aGlzLCAnZGlzdGFuY2UnKX0+RGlzdGFuY2U8L01lbnVJdGVtPlxuICAgICAgICAgICAgICAgIDwvTWVudT5cblxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZS5vcGVuRmlsdGVyID8gPGRpdiBvbkNsaWNrPXt0aGlzLnRvZ2dsZUZpbHRlci5iaW5kKHRoaXMpfSBjbGFzc05hbWU9XCJvdmVybGF5IGJsYWNrXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIndpZGdldCBmaWx0ZXItcG9wdXBcIiBvbkNsaWNrPXsoZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICAgICAgICAgICAgICAgICAgICAgIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwid2lkZ2V0LWNvbnRlbnRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmaWx0ZXJSb3dcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRsXCI+UHJpY2U8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0clwiPlJzIHt0aGlzLnN0YXRlLnByaWNlUmFuZ2VbMF19IHRvIHt0aGlzLnN0YXRlLnByaWNlUmFuZ2VbMV19PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiYmxcIj5ScyAxMDA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJiclwiPlJzIDIwMDA8L3NwYW4+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxSYW5nZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1pbj17MTAwfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1heD17MjAwMH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17dGhpcy5zdGF0ZS5wcmljZVJhbmdlfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0ZXA9ezEwMH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJyYW5nZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuaGFuZGxlUmFuZ2UuYmluZCh0aGlzLCAncHJpY2VSYW5nZScpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmlsdGVyUm93XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0bFwiPkRpc3RhbmNlPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidHJcIj57dGhpcy5zdGF0ZS5kaXN0YW5jZVJhbmdlWzBdfSB0byB7dGhpcy5zdGF0ZS5kaXN0YW5jZVJhbmdlWzFdfSBLTTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImJsXCI+MSA+IEtNPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiYnJcIj41MCBLTTwvc3Bhbj5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPFJhbmdlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWluPXsxfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1heD17NTB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3RoaXMuc3RhdGUuZGlzdGFuY2VSYW5nZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGVwPXsxfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInJhbmdlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5oYW5kbGVSYW5nZS5iaW5kKHRoaXMsICdkaXN0YW5jZVJhbmdlJyl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIndpZGdldC1mb290ZXIgcGQtMFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cInYtYnRuIHYtYnRuLXByaW1hcnkgYnRuLWJsb2NrIGJ0bi1sZ1wiIG9uQ2xpY2s9e3RoaXMuYXBwbHlGaWx0ZXJzLmJpbmQodGhpcyl9PkFwcGx5PC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+IDogXCJcIlxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgPC9zZWN0aW9uPlxuICAgICAgICApO1xuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBUb3BCYXJcbiIsImltcG9ydCBUb3BCYXIgZnJvbSAnLi9Ub3BCYXIuanMnXG5cbmV4cG9ydCBkZWZhdWx0IFRvcEJhciIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG5pbXBvcnQgRG9jdG9yUHJvZmlsZUNhcmQgZnJvbSAnLi4vY29tbW9ucy9kb2N0b3JQcm9maWxlQ2FyZC9pbmRleC5qcydcbmltcG9ydCBUaW1lU2xvdFNlbGVjdG9yIGZyb20gJy4uLy4uL2NvbW1vbnMvdGltZVNsb3RTZWxlY3Rvci9pbmRleC5qcydcbmltcG9ydCBTZWxlY3RlZENsaW5pYyBmcm9tICcuLi9jb21tb25zL3NlbGVjdGVkQ2xpbmljL2luZGV4LmpzJ1xuXG5jbGFzcyBBcHBvaW50bWVudFNsb3QgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgc2VsZWN0ZWREb2N0b3I6IG51bGwsXG4gICAgICAgICAgICBzZWxlY3RlZENsaW5pYzogbnVsbCxcbiAgICAgICAgICAgIHRpbWVTbG90czogbnVsbCxcbiAgICAgICAgICAgIHNlbGVjdGVkU2xvdCA6IG51bGxcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByb2NlZWQoKSB7XG4gICAgICAgIGlmKHRoaXMuc3RhdGUuc2VsZWN0ZWRTbG90KXtcbiAgICAgICAgICAgIHRoaXMuY29udGV4dC5yb3V0ZXIuaGlzdG9yeS5wdXNoKGAvZG9jdG9ycHJvZmlsZS8ke3RoaXMuc3RhdGUuc2VsZWN0ZWREb2N0b3J9LyR7dGhpcy5zdGF0ZS5zZWxlY3RlZENsaW5pY30vYm9va2RldGFpbHM/dD0ke3RoaXMuc3RhdGUuc2VsZWN0ZWRTbG90LnN0YXJ0fWApXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZWxlY3RUaW1lU2xvdChzbG90KXtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHNlbGVjdGVkU2xvdDogc2xvdCB9KVxuICAgIH1cblxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgICBsZXQgZG9jdG9ySWQgPSB0aGlzLnByb3BzLm1hdGNoLnBhcmFtcy5pZFxuICAgICAgICBsZXQgY2xpbmljSWQgPSB0aGlzLnByb3BzLm1hdGNoLnBhcmFtcy5jbGluaWNJZFxuICAgICAgICBpZiAoZG9jdG9ySWQgJiYgY2xpbmljSWQpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBzZWxlY3RlZERvY3RvcjogZG9jdG9ySWQsIHNlbGVjdGVkQ2xpbmljOiBjbGluaWNJZCB9KVxuICAgICAgICAgICAgdGhpcy5wcm9wcy5nZXREb2N0b3JCeUlkKGRvY3RvcklkKVxuXG4gICAgICAgICAgICB0aGlzLnByb3BzLmdldFRpbWVTbG90cyhkb2N0b3JJZCwgY2xpbmljSWQsICh0aW1lU2xvdHMpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgdGltZVNsb3RzIH0pXG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhdGljIGNvbnRleHRUeXBlcyA9IHtcbiAgICAgICAgcm91dGVyOiAoKSA9PiBudWxsXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFwcG9pbnRtZW50U2xvdFwiPlxuXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnByb3BzLkRPQ1RPUlNbdGhpcy5zdGF0ZS5zZWxlY3RlZERvY3Rvcl0gP1xuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8RG9jdG9yUHJvZmlsZUNhcmRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGlkZUJvdHRvbT17dHJ1ZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGlkZUJvb2tOb3c9e3RydWV9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRldGFpbHM9e3RoaXMucHJvcHMuRE9DVE9SU1t0aGlzLnN0YXRlLnNlbGVjdGVkRG9jdG9yXX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxTZWxlY3RlZENsaW5pY1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZERvY3Rvcj17dGhpcy5wcm9wcy5ET0NUT1JTW3RoaXMuc3RhdGUuc2VsZWN0ZWREb2N0b3JdfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZENsaW5pYz17dGhpcy5zdGF0ZS5zZWxlY3RlZENsaW5pY31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZS50aW1lU2xvdHMgP1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPFRpbWVTbG90U2VsZWN0b3JcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aW1lU2xvdHM9e3RoaXMuc3RhdGUudGltZVNsb3RzfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdFRpbWVTbG90PSB7dGhpcy5zZWxlY3RUaW1lU2xvdC5iaW5kKHRoaXMpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLz4gOiAnJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cInByb2NlZWRidG5cIiBvbkNsaWNrPXt0aGlzLnByb2NlZWQuYmluZCh0aGlzKX0+UHJvY2VlZDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+IDogXCJcIlxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IEFwcG9pbnRtZW50U2xvdFxuIiwiaW1wb3J0IEFwcG9pbnRtZW50U2xvdCBmcm9tICcuL0FwcG9pbnRtZW50U2xvdC5qcydcblxuZXhwb3J0IGRlZmF1bHQgQXBwb2ludG1lbnRTbG90IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBTdGVwcGVyLCB7IFN0ZXAsIFN0ZXBMYWJlbCB9IGZyb20gJ21hdGVyaWFsLXVpL1N0ZXBwZXInO1xuXG5pbXBvcnQgQ2FsSWNvbiBmcm9tICdtYXRlcmlhbC11aS1pY29ucy9DYWxsJztcblxuXG5jbGFzcyBCb29raW5nVmlldyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJvb2tpbmdcIj5cbiAgICAgICAgICAgICAgICA8U3RlcHBlciBhY3RpdmVTdGVwPXswfSBhbHRlcm5hdGl2ZUxhYmVsPlxuICAgICAgICAgICAgICAgICAgICA8U3RlcCBrZXk9ezB9PlxuICAgICAgICAgICAgICAgICAgICAgICAgPFN0ZXBMYWJlbD57XCJBcHBvaW50bWVudCBSZXF1ZXN0ZWRcIn08L1N0ZXBMYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgPC9TdGVwPlxuICAgICAgICAgICAgICAgICAgICA8U3RlcCBrZXk9ezF9PlxuICAgICAgICAgICAgICAgICAgICAgICAgPFN0ZXBMYWJlbD57XCJBcHBvaW50bWVudCBDb25maXJtZWRcIn08L1N0ZXBMYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgPC9TdGVwPlxuICAgICAgICAgICAgICAgICAgICA8U3RlcCBrZXk9ezJ9PlxuICAgICAgICAgICAgICAgICAgICAgICAgPFN0ZXBMYWJlbD57XCJBcHBvaW50bWVudCBDb21wbGV0ZVwifTwvU3RlcExhYmVsPlxuICAgICAgICAgICAgICAgICAgICA8L1N0ZXA+XG4gICAgICAgICAgICAgICAgPC9TdGVwcGVyPlxuICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInJlcXVlc3RMaW5lXCI+V2UgaGF2ZSByZXF1ZXN0ZWQgRHIuU21pdGggdG8gY29uZmlybSB5b3VyIGFwcG9pbnRtZW50PC9wPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGF0aWVudE5hbWVcIj5cbiAgICAgICAgICAgICAgICAgICAgPHA+Zm9yPC9wPlxuICAgICAgICAgICAgICAgICAgICA8cD5CcmlqZXNoIEt1bWFyPC9wPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJkZXRhaWxzXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJsYmxcIj5XaXRoPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiY250bnRcIj5Eci4gU3RldmUgU21pdGg8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwibGJsXCI+V2hlcmU8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJjbnRudFwiPlNhcnZvZGF5YSBDbGluaWMsICMgMzYxLCBTZWN0b3IgNTAsIEd1cmdhb248L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwibGJsXCI+V2hlbjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImNudG50XCI+V2VkbmVzZGF5LCBKdW5lIDI3LCAyMDE4LCAxMTo0NUFNPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImxibFwiPlJlZmVyZW5jZSM8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJjbnRudFwiPkhVVkhKQjg3SEpCSkg8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJyZXF1ZXN0XCI+UmVxdWVzdCBSZS1TY2hlZHVsZS9DYW5jZWw8L2J1dHRvbj5cblxuICAgICAgICAgICAgICAgIDxDYWxJY29uIGNsYXNzTmFtZT1cImNhbGxJY29uXCIvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IEJvb2tpbmdWaWV3XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgRG9jdG9yUHJvZmlsZUNhcmQgZnJvbSAnLi4vY29tbW9ucy9kb2N0b3JQcm9maWxlQ2FyZC9pbmRleC5qcydcbmltcG9ydCBDbGluaWNTZWxlY3RvciBmcm9tICcuLi9jb21tb25zL2NsaW5pY1NlbGVjdG9yL2luZGV4LmpzJ1xuXG5jbGFzcyBDbGluaWNMaXN0VmlldyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgICBzZWxlY3RlZERvY3RvcjogbnVsbFxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIGxldCBkb2N0b3JJZCA9IHRoaXMucHJvcHMubWF0Y2gucGFyYW1zLmlkXG4gICAgICAgIGlmIChkb2N0b3JJZCkge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHNlbGVjdGVkRG9jdG9yOiBkb2N0b3JJZCB9KVxuICAgICAgICAgICAgdGhpcy5wcm9wcy5nZXREb2N0b3JCeUlkKGRvY3RvcklkKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImRvY3RvclByb2ZpbGVcIj5cblxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5ET0NUT1JTW3RoaXMuc3RhdGUuc2VsZWN0ZWREb2N0b3JdID9cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPERvY3RvclByb2ZpbGVDYXJkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhpZGVCb3R0b209e3RydWV9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhpZGVCb29rTm93PXt0cnVlfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXRhaWxzPXt0aGlzLnByb3BzLkRPQ1RPUlNbdGhpcy5zdGF0ZS5zZWxlY3RlZERvY3Rvcl19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Q2xpbmljU2VsZWN0b3JcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGV0YWlscz17dGhpcy5wcm9wcy5ET0NUT1JTW3RoaXMuc3RhdGUuc2VsZWN0ZWREb2N0b3JdfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7Li4udGhpcy5wcm9wc31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+IDogXCJcIlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBDbGluaWNMaXN0Vmlld1xuIiwiaW1wb3J0IENsaW5pY0xpc3RWaWV3IGZyb20gJy4vQ2xpbmljTGlzdFZpZXcuanMnXG5cbmV4cG9ydCBkZWZhdWx0IENsaW5pY0xpc3RWaWV3IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cbmltcG9ydCBDbG9ja0ljb24gZnJvbSAnbWF0ZXJpYWwtdWktaWNvbnMvQXZUaW1lcic7XG5pbXBvcnQgUmlnaHRBcnJvd0ljb24gZnJvbSAnbWF0ZXJpYWwtdWktaWNvbnMvS2V5Ym9hcmRBcnJvd1JpZ2h0JztcbmltcG9ydCBNb25leUljb24gZnJvbSAnbWF0ZXJpYWwtdWktaWNvbnMvQXR0YWNoTW9uZXknO1xuXG5cbmNsYXNzIENsaW5pY1NlbGVjdG9yIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICB9XG5cbiAgICBzZWxlY3RDbGluaWMoY2xpbmljSWQpIHtcbiAgICAgICAgbGV0IGRvY3RvcklkID0gdGhpcy5wcm9wcy5tYXRjaC5wYXJhbXMuaWRcbiAgICAgICAgdGhpcy5jb250ZXh0LnJvdXRlci5oaXN0b3J5LnB1c2goYC9kb2N0b3Jwcm9maWxlLyR7ZG9jdG9ySWR9LyR7Y2xpbmljSWR9L2Jvb2tgKVxuICAgIH1cblxuICAgIHN0YXRpYyBjb250ZXh0VHlwZXMgPSB7XG4gICAgICAgIHJvdXRlcjogKCkgPT4gbnVsbFxuICAgIH1cblxuICAgIGdldFRpbWUodW5peF90aW1lc3RhbXApIHtcbiAgICAgICAgdmFyIGRhdGUgPSBuZXcgRGF0ZSh1bml4X3RpbWVzdGFtcCAqIDEwMDApO1xuICAgICAgICB2YXIgaG91cnMgPSBkYXRlLmdldEhvdXJzKCk7XG4gICAgICAgIHZhciBtaW51dGVzID0gXCIwXCIgKyBkYXRlLmdldE1pbnV0ZXMoKTtcbiAgICAgICAgcmV0dXJuIGhvdXJzICsgJzonICsgbWludXRlcy5zdWJzdHIoLTIpXG4gICAgfVxuXG4gICAgZ2V0QXZhaWxhYmlsaXR5KGF2YWlsYWJpbGl0eSkge1xuICAgICAgICBpZiAoYXZhaWxhYmlsaXR5KSB7XG4gICAgICAgICAgICBsZXQgeyBuZXh0QXZhaWxhYmxlIH0gPSBhdmFpbGFiaWxpdHlcbiAgICAgICAgICAgIGlmIChuZXh0QXZhaWxhYmxlWzBdKSB7XG4gICAgICAgICAgICAgICAgbGV0IGRhdGUgPSBuZXcgRGF0ZShuZXh0QXZhaWxhYmxlWzBdLmZyb20pLnRvRGF0ZVN0cmluZygpXG4gICAgICAgICAgICAgICAgbGV0IHRpbWVTdGFydCA9IHRoaXMuZ2V0VGltZShuZXh0QXZhaWxhYmxlWzBdLmZyb20pXG4gICAgICAgICAgICAgICAgbGV0IHRpbWVFbmQgPSB0aGlzLmdldFRpbWUobmV4dEF2YWlsYWJsZVswXS50bylcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICBkYXRlLCB0aW1lU3RhcnQsIHRpbWVFbmQsIGZlZTogbmV4dEF2YWlsYWJsZVswXS5mZWVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4geyBkYXRlOiAnJywgdGltZVN0YXJ0OiAnJywgdGltZUVuZDogJycsIGZlZTogeyBhbW91bnQ6ICcnIH0gfVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICBsZXQgeyBhdmFpbGFiaWxpdHkgfSA9IHRoaXMucHJvcHMuZGV0YWlsc1xuXG4gICAgICAgIGF2YWlsYWJpbGl0eSA9IGF2YWlsYWJpbGl0eS5tYXAoKGNsaW5pYykgPT4ge1xuICAgICAgICAgICAgY2xpbmljLnRpbWVBdmFpbGFibGUgPSB0aGlzLmdldEF2YWlsYWJpbGl0eShjbGluaWMpXG4gICAgICAgICAgICByZXR1cm4gY2xpbmljXG4gICAgICAgIH0pXG5cblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjbGluaWNTZWxlY3RvclwiPlxuICAgICAgICAgICAgICAgIDxoNT5Eci4gU3RldmUgaXMgYXZhaWxhYmxlIGF0PC9oNT5cblxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgYXZhaWxhYmlsaXR5Lm1hcCgoY2xpbmljLCBpKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gPGRpdiBrZXk9e2l9IGNsYXNzTmFtZT1cImNsaW5pY1wiIG9uQ2xpY2s9e3RoaXMuc2VsZWN0Q2xpbmljLmJpbmQodGhpcyxjbGluaWMuaWQpfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm5hbWVcIj57Y2xpbmljLm5hbWUgKyBcIiwgXCIgKyBjbGluaWMuYWRkcmVzc308L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImRldGFpbHNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPENsb2NrSWNvbiBjbGFzc05hbWU9XCJjbG9ja0ljb25cIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8TW9uZXlJY29uIGNsYXNzTmFtZT1cIm1vbmV5SWNvblwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsaW5pYy5kYXlzLm1hcCgoZGF5LCBpKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiA8c3BhblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5PXtpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtkYXkuaXNBdmFpbGFibGUgPyBcImlzQXZhaWxhYmxlXCIgOiBcIlwifT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtkYXkuZGF5WzBdfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtjbGluaWMudGltZUF2YWlsYWJsZS50aW1lU3RhcnR9IHRvIHtjbGluaWMudGltZUF2YWlsYWJsZS50aW1lRW5kfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwPntgRmVlOiBScy4ke2NsaW5pYy50aW1lQXZhaWxhYmxlLmZlZS5hbW91bnR9YH08L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJib29rXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHRcIj5Cb29rPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8UmlnaHRBcnJvd0ljb24gY2xhc3NOYW1lPVwiYm9va0ljb25cIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBDbGluaWNTZWxlY3RvclxuIiwiaW1wb3J0IENsaW5pY1NlbGVjdG9yIGZyb20gJy4vQ2xpbmljU2VsZWN0b3IuanMnXG5cbmV4cG9ydCBkZWZhdWx0IENsaW5pY1NlbGVjdG9yIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IENoaXAgZnJvbSAnbWF0ZXJpYWwtdWkvQ2hpcCc7XG5cblxuY2xhc3MgQ29tbW9ubHlTZWFyY2hlZCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG5cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICBsZXQgcGlsbHMgPSB0aGlzLnByb3BzLmRhdGEubWFwKChwaWxsKSA9PiB7XG4gICAgICAgICAgICBsZXQgc2VsZWN0ZWQgPSAhIXRoaXMucHJvcHMuc2VsZWN0ZWRbcGlsbC5pZF1cbiAgICAgICAgICAgIHJldHVybiA8Q2hpcFxuICAgICAgICAgICAgICAgIGxhYmVsPXtwaWxsLm5hbWV9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtzZWxlY3RlZCA/IFwicGlsbCBzZWxlY3RlZFwiIDogXCJwaWxsXCJ9XG4gICAgICAgICAgICAgICAga2V5PXtwaWxsLmlkfVxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMudG9nZ2xlUGlsbChwaWxsLmlkKVxuICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAvPlxuXG4gICAgICAgIH0pXG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29tbW9ubHlTZWFyY2hlZFwiPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImhlYWRpbmdcIj57dGhpcy5wcm9wcy5oZWFkaW5nfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBpbGxzXCI+XG4gICAgICAgICAgICAgICAgICAgIHtwaWxsc31cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBDb21tb25seVNlYXJjaGVkXG4iLCJpbXBvcnQgQ29tbW9ubHlTZWFyY2hlZCBmcm9tICcuL0NvbW1vbmx5U2VhcmNoZWQuanMnXG5cblxuZXhwb3J0IGRlZmF1bHQgQ29tbW9ubHlTZWFyY2hlZCIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCBDaGlwIGZyb20gJ21hdGVyaWFsLXVpL0NoaXAnO1xuXG5jbGFzcyBDcml0ZXJpYVNlbGVjdG9yIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICB9XG5cbiAgICBoYW5kbGVEZWxldGUoaWQsIGhhbmRsZXIpIHtcbiAgICAgICAgaWYoaGFuZGxlciA9PSAndG9nZ2xlQ3JpdGVyaWEnKXtcbiAgICAgICAgICAgIHRoaXMucHJvcHNbaGFuZGxlcl0oe2lkfSlcbiAgICAgICAgfSBlbHNle1xuICAgICAgICAgICAgdGhpcy5wcm9wc1toYW5kbGVyXShpZClcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN0YXRpYyBjb250ZXh0VHlwZXMgPSB7XG4gICAgICAgIHJvdXRlcjogKCkgPT4gbnVsbFxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICBsZXQgcGlsbHMgPSBbXVxuICAgICAgICBsZXQgY29uZGl0aW9ucyA9IFtdXG4gICAgICAgIGxldCBzcGVjaWFsaXRpZXMgPSBbXVxuICAgICAgICBsZXQgY3JpdGVyaWFzID0gW11cblxuICAgICAgICBpZiAodGhpcy5wcm9wcy5jb21tb25seVNlYXJjaGVkQ29uZGl0aW9ucykge1xuICAgICAgICAgICAgY29uZGl0aW9ucyA9IHRoaXMucHJvcHMuY29tbW9ubHlTZWFyY2hlZENvbmRpdGlvbnMuZmlsdGVyKChwaWxsKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMuc2VsZWN0ZWRDb25kaXRpb25zW3BpbGwuaWRdXG4gICAgICAgICAgICB9KS5tYXAoKHBpbGwpID0+IHtcbiAgICAgICAgICAgICAgICBwaWxsLnRzID0gdGhpcy5wcm9wcy5zZWxlY3RlZENvbmRpdGlvbnNbcGlsbC5pZF1cbiAgICAgICAgICAgICAgICBwaWxsLnR5cGUgPSAndG9nZ2xlQ29uZGl0aW9uJ1xuICAgICAgICAgICAgICAgIHJldHVybiBwaWxsXG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmNvbW1vbmx5U2VhcmNoZWRTcGVjaWFsaXRpZXMpIHtcbiAgICAgICAgICAgIHNwZWNpYWxpdGllcyA9IHRoaXMucHJvcHMuY29tbW9ubHlTZWFyY2hlZFNwZWNpYWxpdGllcy5maWx0ZXIoKHBpbGwpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5zZWxlY3RlZFNwZWNpYWxpdGllc1twaWxsLmlkXVxuICAgICAgICAgICAgfSkubWFwKChwaWxsKSA9PiB7XG4gICAgICAgICAgICAgICAgcGlsbC50cyA9IHRoaXMucHJvcHMuc2VsZWN0ZWRTcGVjaWFsaXRpZXNbcGlsbC5pZF1cbiAgICAgICAgICAgICAgICBwaWxsLnR5cGUgPSAndG9nZ2xlU3BlY2lhbGl0eSdcbiAgICAgICAgICAgICAgICByZXR1cm4gcGlsbFxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgICBpZih0aGlzLnByb3BzLnNlbGVjdGVkQ3JpdGVyaWEpe1xuICAgICAgICAgICAgY3JpdGVyaWFzID0gT2JqZWN0LmtleXModGhpcy5wcm9wcy5zZWxlY3RlZENyaXRlcmlhKS5tYXAoKGNyaXRlcmlhKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IHBpbGwgPSB0aGlzLnByb3BzLnNlbGVjdGVkQ3JpdGVyaWFbY3JpdGVyaWFdXG4gICAgICAgICAgICAgICAgcGlsbC50eXBlID0gJ3RvZ2dsZUNyaXRlcmlhJ1xuICAgICAgICAgICAgICAgIHJldHVybiBwaWxsXG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG5cbiAgICAgICAgcGlsbHMgPSBbLi4uY29uZGl0aW9ucywgLi4uc3BlY2lhbGl0aWVzLCAuLi5jcml0ZXJpYXNdXG4gICAgICAgIHBpbGxzID0gcGlsbHMuc29ydCgoYSxiKSA9PiB7XG4gICAgICAgICAgICBsZXQgZGF0ZUEgPSBuZXcgRGF0ZShhLnRzKS5nZXRUaW1lKClcbiAgICAgICAgICAgIGxldCBkYXRlQiA9IG5ldyBEYXRlKGIudHMpLmdldFRpbWUoKVxuICAgICAgICAgICAgcmV0dXJuIGRhdGVBID4gZGF0ZUIgPyAxIDogLTFcbiAgICAgICAgfSkubWFwKChwaWxsKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gPENoaXBcbiAgICAgICAgICAgICAgICBsYWJlbD17cGlsbC5uYW1lfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17XCJwaWxsc2VsZWN0ZWRcIn1cbiAgICAgICAgICAgICAgICBrZXk9e3BpbGwudHlwZSArIHBpbGwuaWR9XG4gICAgICAgICAgICAgICAgb25EZWxldGU9e3RoaXMuaGFuZGxlRGVsZXRlLmJpbmQodGhpcywgcGlsbC5pZCwgcGlsbC50eXBlKX1cbiAgICAgICAgICAgIC8+XG4gICAgICAgIH0pXG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY3JpdGVyaWFTZWxlY3RvclwiPlxuICAgICAgICAgICAgICAgIDxpbnB1dCBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGV4dC5yb3V0ZXIuaGlzdG9yeS5wdXNoKCcvY3JpdGVyaWFzZWFyY2gnKVxuICAgICAgICAgICAgICAgIH19IHBsYWNlaG9sZGVyPXtcIlNlYXJjaCBmb3Igc3ltcHRvbXMsIERvY3RvcnMsIGNvbmRpdGlvbnMgLi5ldGNcIn0gLz5cblxuICAgICAgICAgICAgICAgIHtwaWxsc31cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBDcml0ZXJpYVNlbGVjdG9yXG4iLCJpbXBvcnQgQ3JpdGVyaWFTZWxlY3RvciBmcm9tICcuL0NyaXRlcmlhU2VsZWN0b3IuanMnXG5cbmV4cG9ydCBkZWZhdWx0IENyaXRlcmlhU2VsZWN0b3IiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcblxuaW1wb3J0IEVtb3RpSWNvbiBmcm9tICdtYXRlcmlhbC11aS1pY29ucy9BY2NvdW50Q2lyY2xlJztcbmltcG9ydCBIb21lSWNvbiBmcm9tICdtYXRlcmlhbC11aS1pY29ucy9Ib21lJztcbmltcG9ydCBDbG9ja0ljb24gZnJvbSAnbWF0ZXJpYWwtdWktaWNvbnMvQXZUaW1lcic7XG5pbXBvcnQgTG9jYXRpb25zSWNvbiBmcm9tICdtYXRlcmlhbC11aS1pY29ucy9Mb2NhdGlvbk9uJztcblxuXG5jbGFzcyBEb2N0b3JQcm9maWxlQ2FyZCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgfVxuXG4gICAgY2FyZENsaWNrKGlkLCBlKSB7XG4gICAgICAgIHRoaXMuY29udGV4dC5yb3V0ZXIuaGlzdG9yeS5wdXNoKGAvZG9jdG9ycHJvZmlsZS8ke2lkfWApXG4gICAgfVxuXG4gICAgYm9va05vdyhpZCwgZSkge1xuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpXG4gICAgICAgIHRoaXMuY29udGV4dC5yb3V0ZXIuaGlzdG9yeS5wdXNoKGAvZG9jdG9ycHJvZmlsZS8ke2lkfS9hdmFpbGFiaWxpdHlgKVxuICAgIH1cblxuICAgIHN0YXRpYyBjb250ZXh0VHlwZXMgPSB7XG4gICAgICAgIHJvdXRlcjogKCkgPT4gbnVsbFxuICAgIH1cblxuICAgIGdldFF1YWxpZmljYXRpb25TdHIocXVhbGlmaWNhdGlvblNwZWNpYWxpemF0aW9uKSB7XG4gICAgICAgIHJldHVybiBxdWFsaWZpY2F0aW9uU3BlY2lhbGl6YXRpb24ucmVkdWNlKChzdHIsIGN1cnIsIGkpID0+IHtcbiAgICAgICAgICAgIHN0ciArPSBgJHtjdXJyLnF1YWxpZmljYXRpb259YFxuICAgICAgICAgICAgaWYgKGN1cnIuc3BlY2lhbGl6YXRpb24pIHtcbiAgICAgICAgICAgICAgICBzdHIgKz0gYCAtICR7Y3Vyci5zcGVjaWFsaXphdGlvbn1gXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoaSA8IHF1YWxpZmljYXRpb25TcGVjaWFsaXphdGlvbi5sZW5ndGggLSAxKSBzdHIgKz0gYCwgYDtcbiAgICAgICAgICAgIHJldHVybiBzdHJcbiAgICAgICAgfSwgXCJcIilcbiAgICB9XG5cbiAgICBnZXRUaW1lKHVuaXhfdGltZXN0YW1wKSB7XG4gICAgICAgIHZhciBkYXRlID0gbmV3IERhdGUodW5peF90aW1lc3RhbXAgKiAxMDAwKTtcbiAgICAgICAgdmFyIGhvdXJzID0gZGF0ZS5nZXRIb3VycygpO1xuICAgICAgICB2YXIgbWludXRlcyA9IFwiMFwiICsgZGF0ZS5nZXRNaW51dGVzKCk7XG4gICAgICAgIHJldHVybiBob3VycyArICc6JyArIG1pbnV0ZXMuc3Vic3RyKC0yKVxuICAgIH1cblxuICAgIGdldEF2YWlsYWJpbGl0eShhdmFpbGFiaWxpdHkpIHtcbiAgICAgICAgaWYgKGF2YWlsYWJpbGl0eSkge1xuICAgICAgICAgICAgbGV0IHsgbmV4dEF2YWlsYWJsZSB9ID0gYXZhaWxhYmlsaXR5XG4gICAgICAgICAgICBpZiAobmV4dEF2YWlsYWJsZVswXSkge1xuICAgICAgICAgICAgICAgIGxldCBkYXRlID0gbmV3IERhdGUobmV4dEF2YWlsYWJsZVswXS5mcm9tKS50b0RhdGVTdHJpbmcoKVxuICAgICAgICAgICAgICAgIGxldCB0aW1lU3RhcnQgPSB0aGlzLmdldFRpbWUobmV4dEF2YWlsYWJsZVswXS5mcm9tKVxuICAgICAgICAgICAgICAgIGxldCB0aW1lRW5kID0gdGhpcy5nZXRUaW1lKG5leHRBdmFpbGFibGVbMF0udG8pXG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0ZSwgdGltZVN0YXJ0LCB0aW1lRW5kLCBmZWU6IG5leHRBdmFpbGFibGVbMF0uZmVlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHsgZGF0ZTogJycsIHRpbWVTdGFydDogJycsIHRpbWVFbmQ6ICcnLCBmZWU6IHsgYW1vdW50OiAnJyB9IH1cbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgbGV0IHsgaWQsIG5hbWUsIHByb2ZpbGVfaW1nLCBwcmFjdGljZV9kdXJhdGlvbiwgcXVhbGlmaWNhdGlvblNwZWNpYWxpemF0aW9uLCBjb25zdWx0YXRpb25Db3VudCwgYXZhaWxhYmlsaXR5LCBwYXN0RXhwZXJpZW5jZSB9ID0gdGhpcy5wcm9wcy5kZXRhaWxzXG5cbiAgICAgICAgbGV0IHF1YWxpZmljYXRpb25TdHJpbmcgPSB0aGlzLmdldFF1YWxpZmljYXRpb25TdHIocXVhbGlmaWNhdGlvblNwZWNpYWxpemF0aW9uKVxuICAgICAgICBsZXQgdGltZUF2YWlsYWJsZSA9IHRoaXMuZ2V0QXZhaWxhYmlsaXR5KGF2YWlsYWJpbGl0eVswXSlcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJkb2N0b3JDYXJkXCIgb25DbGljaz17dGhpcy5jYXJkQ2xpY2suYmluZCh0aGlzLCBpZCl9PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZGV0YWlsc0RpdlwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN1Yk9wdGlvbnNJbWFnZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGltZyBzcmM9e3Byb2ZpbGVfaW1nfSBjbGFzc05hbWU9XCJkb2N0b3JJbWFnZVwiIC8+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN1Yk9wdGlvbnNDb250ZW50XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJuYW1lXCI+e25hbWV9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicXVhbGlmaWNhdGlvblwiPntxdWFsaWZpY2F0aW9uU3RyaW5nfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImRlc2lnbmF0aW9uXCI+e3Bhc3RFeHBlcmllbmNlfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImV4cGVyaWVuY2VcIj57cHJhY3RpY2VfZHVyYXRpb259IHllYXJzIG9mIGV4cGVyaWVuY2U8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAhIXRoaXMucHJvcHMuaGlkZUJvb2tOb3cgPyAnJyA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdWJPcHRpb25zSW50ZXJhY3RcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJib29rTm93XCIgb25DbGljaz17dGhpcy5ib29rTm93LmJpbmQodGhpcywgaWQpfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEJvb2sgTm93XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicHJpY2VcIj5GZWU6IFJzLiB7dGltZUF2YWlsYWJsZS5mZWUuYW1vdW50fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgISF0aGlzLnByb3BzLmhpZGVCb3R0b20gPyAnJyA6XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJvdHRvbU9wdGlvbnNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN1Yk9wdGlvbnNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPEhvbWVJY29uIGNsYXNzTmFtZT1cImNsaW5pY0ljb25cIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJjbGluaWNOYW1lXCI+e2F2YWlsYWJpbGl0eVswXS5uYW1lfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN1Yk9wdGlvbnNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPENsb2NrSWNvbiBjbGFzc05hbWU9XCJjbGluaWNJY29uXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGltZUVudHJ5XCI+e3RpbWVBdmFpbGFibGUuZGF0ZX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRpbWVFbnRyeVwiPnt0aW1lQXZhaWxhYmxlLnRpbWVTdGFydH0gdG8ge3RpbWVBdmFpbGFibGUudGltZUVuZH08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdWJPcHRpb25zXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxMb2NhdGlvbnNJY29uIGNsYXNzTmFtZT1cImNsaW5pY0ljb25cIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJjbGluaWNOYW1lXCI+e2F2YWlsYWJpbGl0eVswXS5hZGRyZXNzfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBEb2N0b3JQcm9maWxlQ2FyZFxuIiwiaW1wb3J0IERvY3RvclByb2ZpbGVDYXJkIGZyb20gJy4vRG9jdG9yUHJvZmlsZUNhcmQuanMnXG5cbmV4cG9ydCBkZWZhdWx0IERvY3RvclByb2ZpbGVDYXJkIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuY2xhc3MgU2VsZWN0ZWRDbGluaWMgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgICAgICB0aGlzLnN0YXRlID0ge1xuXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdGF0aWMgY29udGV4dFR5cGVzID0ge1xuICAgICAgICByb3V0ZXI6ICgpID0+IG51bGxcbiAgICB9XG5cdFxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICBsZXQgeyBzZWxlY3RlZERvY3Rvciwgc2VsZWN0ZWRDbGluaWMgfSA9IHRoaXMucHJvcHNcblxuICAgICAgICBsZXQgY2xpbmljRGF0YSA9IHNlbGVjdGVkRG9jdG9yLmF2YWlsYWJpbGl0eS5maWx0ZXIoKGNsaW5pYykgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGNsaW5pYy5pZCA9PSBzZWxlY3RlZENsaW5pY1xuICAgICAgICB9KVswXVxuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNlbGVjdGVkQ2xpbmljXCI+XG4gICAgICAgICAgICAgICAgPGg1PlNlbGVjdGVkIENsaW5pYzwvaDU+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiY2xpbmljTmFtZVwiPnsgY2xpbmljRGF0YS5uYW1lICsgXCIsIFwiICsgY2xpbmljRGF0YS5hZGRyZXNzIH08L3NwYW4+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZmVlXCI+RmVlOiBScy57Y2xpbmljRGF0YS5uZXh0QXZhaWxhYmxlWzBdLmZlZS5hbW91bnR9PC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IFNlbGVjdGVkQ2xpbmljXG4iLCJpbXBvcnQgU2VsZWN0ZWRDbGluaWMgZnJvbSAnLi9TZWxlY3RlZENsaW5pYy5qcydcblxuZXhwb3J0IGRlZmF1bHQgU2VsZWN0ZWRDbGluaWMiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5jb25zdCBkZWJvdW5jZXIgPSAoZm4sIGRlbGF5KSA9PiB7XG4gICAgbGV0IHRpbWVyID0gbnVsbFxuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aW1lcilcbiAgICAgICAgdGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIGZuLmNhbGwodGhpcylcbiAgICAgICAgfSwgZGVsYXkpXG4gICAgfVxufVxuXG5cbmNsYXNzIENyaXRlcmlhU2VhcmNoVmlldyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgICBzZWFyY2hWYWx1ZTogJycsXG4gICAgICAgICAgICBzZWFyY2hSZXN1bHRzOiBbXVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIHRoaXMuZ2V0U2VhcmNoUmVzdWx0cyA9IGRlYm91bmNlcih0aGlzLmdldFNlYXJjaFJlc3VsdHMuYmluZCh0aGlzKSwgMTAwMClcbiAgICAgICAgbGV0IGlucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RvcENyaXRlcmlhU2VhcmNoJylcbiAgICAgICAgaW5wdXQuZm9jdXMoKVxuICAgIH1cblxuICAgIGlucHV0SGFuZGxlcihlKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBzZWFyY2hWYWx1ZTogZS50YXJnZXQudmFsdWUgfSlcbiAgICAgICAgdGhpcy5nZXRTZWFyY2hSZXN1bHRzKClcbiAgICB9XG5cbiAgICBnZXRTZWFyY2hSZXN1bHRzKCkge1xuICAgICAgICB0aGlzLnByb3BzLmdldENyaXRlcmlhUmVzdWx0cyh0aGlzLnN0YXRlLnNlYXJjaFZhbHVlLCAoc2VhcmNoUmVzdWx0cykgPT4ge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHNlYXJjaFJlc3VsdHM6IHNlYXJjaFJlc3VsdHMucmVzdWx0IH0pXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgYWRkQ3JpdGVyaWEoY3JpdGVyaWEsIHR5cGUpIHtcbiAgICAgICAgY3JpdGVyaWEudHlwZSA9IHR5cGVcbiAgICAgICAgdGhpcy5wcm9wcy50b2dnbGVDcml0ZXJpYShjcml0ZXJpYSlcbiAgICAgICAgdGhpcy5jb250ZXh0LnJvdXRlci5oaXN0b3J5LmdvQmFjaygpXG4gICAgfVxuXG4gICAgc3RhdGljIGNvbnRleHRUeXBlcyA9IHtcbiAgICAgICAgcm91dGVyOiAoKSA9PiBudWxsXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxvY2F0aW9uU2VhcmNoXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsb2NhdGlvblNlYXJjaEJveFwiPlxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgY2xhc3NOYW1lPVwidG9wU2VhcmNoXCIgaWQ9XCJ0b3BDcml0ZXJpYVNlYXJjaFwiIG9uQ2hhbmdlPXt0aGlzLmlucHV0SGFuZGxlci5iaW5kKHRoaXMpfSB2YWx1ZT17dGhpcy5zdGF0ZS5zZWFyY2hWYWx1ZX0gcGxhY2Vob2xkZXI9XCJTZWFyY2ggZm9yIHN5bXB0b21zLCBEb2N0b3MsIGNvbmRpdGlvbnMgLi5ldGNcIi8+XG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUuc2VhcmNoUmVzdWx0cy5tYXAoKHR5cGUsaSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT1cInNlYXJjaFJlc3VsdFR5cGVcIiBrZXk9e2l9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cD57dHlwZS5uYW1lfTwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZS5kYXRhLm1hcCgocmVzdWx0RGF0YSxqKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDxzcGFuIGtleT17an0gY2xhc3NOYW1lPVwicGFjLWl0ZW1cIiBvbkNsaWNrPXt0aGlzLmFkZENyaXRlcmlhLmJpbmQodGhpcywgcmVzdWx0RGF0YSwgdHlwZS50eXBlKX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtyZXN1bHREYXRhLm5hbWV9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgQ3JpdGVyaWFTZWFyY2hWaWV3XG4iLCJpbXBvcnQgQ3JpdGVyaWFTZWFyY2hWaWV3IGZyb20gJy4vQ3JpdGVyaWFTZWFyY2hWaWV3LmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBDcml0ZXJpYVNlYXJjaFZpZXciLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgRG9jdG9yUHJvZmlsZUNhcmQgZnJvbSAnLi4vY29tbW9ucy9kb2N0b3JQcm9maWxlQ2FyZC9pbmRleC5qcydcbmltcG9ydCBBYm91dERvY3RvciBmcm9tICcuLi9kb2N0b3JQcm9maWxlL2Fib3V0RG9jdG9yL2luZGV4LmpzJ1xuaW1wb3J0IFByb2Zlc3Npb25hbEdyYXBoIGZyb20gJy4uL2RvY3RvclByb2ZpbGUvcHJvZmVzc2lvbmFsR3JhcGgvaW5kZXguanMnXG5pbXBvcnQgQ2xpbmljU2VsZWN0b3IgZnJvbSAnLi4vY29tbW9ucy9jbGluaWNTZWxlY3Rvci9pbmRleC5qcydcblxuY2xhc3MgRG9jdG9yUHJvZmlsZVZpZXcgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgc2VsZWN0ZWREb2N0b3IgOiBudWxsXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgbGV0IGRvY3RvcklkID0gdGhpcy5wcm9wcy5tYXRjaC5wYXJhbXMuaWRcbiAgICAgICAgaWYgKGRvY3RvcklkKSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtzZWxlY3RlZERvY3RvciA6IGRvY3RvcklkfSlcbiAgICAgICAgICAgIHRoaXMucHJvcHMuZ2V0RG9jdG9yQnlJZChkb2N0b3JJZClcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJkb2N0b3JQcm9maWxlXCI+XG5cbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuRE9DVE9SU1t0aGlzLnN0YXRlLnNlbGVjdGVkRG9jdG9yXSA/XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxEb2N0b3JQcm9maWxlQ2FyZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoaWRlQm90dG9tPXt0cnVlfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXRhaWxzPXt0aGlzLnByb3BzLkRPQ1RPUlNbdGhpcy5zdGF0ZS5zZWxlY3RlZERvY3Rvcl19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8QWJvdXREb2N0b3IgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Q2xpbmljU2VsZWN0b3JcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGV0YWlscz17dGhpcy5wcm9wcy5ET0NUT1JTW3RoaXMuc3RhdGUuc2VsZWN0ZWREb2N0b3JdfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7Li4udGhpcy5wcm9wc31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxQcm9mZXNzaW9uYWxHcmFwaCAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+IDogXCJcIlxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBEb2N0b3JQcm9maWxlVmlld1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cbmNsYXNzIEFib3V0RG9jdG9yIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcblxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYm91dERvY3RvclwiPlxuICAgICAgICAgICAgICAgIDxoNT5BYm91dCBEci4gU3RldmUgUmF5PC9oNT5cbiAgICAgICAgICAgICAgICA8cD5Mb3JlbSBpcHN1bSBkb2xvciBzaXQgYW1ldCwgZG9sb3IgdXQgdmVzdGlidWx1bSBibGFuZGl0LCB0dXJwaXMgZnVzY2UuIExhYm9yZSBwb3RlbnRpIHZpdmFtdXMgb2RpbyBhcmN1IHZlc3RpYnVsdW0uIEhlbmRyZXJpdCBudWxsYSBjb25zZWN0ZXR1ZXIgdHJpc3RpcXVlIGFudGUgbGVvLCB1bGxhbWNvcnBlciBjdXJzdXMgcnV0cnVtIDwvcD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBBYm91dERvY3RvclxuIiwiaW1wb3J0IEFib3V0RG9jdG9yIGZyb20gJy4vQWJvdXREb2N0b3IuanMnXG5cbmV4cG9ydCBkZWZhdWx0IEFib3V0RG9jdG9yIiwiaW1wb3J0IERvY3RvclByb2ZpbGVWaWV3IGZyb20gJy4vRG9jdG9yUHJvZmlsZVZpZXcuanMnXG5cbmV4cG9ydCBkZWZhdWx0IERvY3RvclByb2ZpbGVWaWV3IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cbmltcG9ydCBFeHBhbnNpb25QYW5lbCwge1xuICAgIEV4cGFuc2lvblBhbmVsU3VtbWFyeSxcbiAgICBFeHBhbnNpb25QYW5lbERldGFpbHMsXG59IGZyb20gJ21hdGVyaWFsLXVpL0V4cGFuc2lvblBhbmVsJztcbmltcG9ydCBFeHBhbmRNb3JlSWNvbiBmcm9tICdtYXRlcmlhbC11aS1pY29ucy9FeHBhbmRNb3JlJztcblxuY2xhc3MgUHJvZmVzc2lvbmFsR3JhcGggZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInByb2Zlc3Npb25hbEdyYXBoXCI+XG4gICAgICAgICAgICAgICAgPGg1PlByb2Zlc3Npb25hbCBHcmFwaDwvaDU+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJlcGFuZWxcIj5cbiAgICAgICAgICAgICAgICAgICAgPEV4cGFuc2lvblBhbmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgPEV4cGFuc2lvblBhbmVsU3VtbWFyeSBleHBhbmRJY29uPXs8RXhwYW5kTW9yZUljb24gLz59PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEVkdWNhdGlvblxuICAgICAgICAgICAgICAgICAgICAgICAgPC9FeHBhbnNpb25QYW5lbFN1bW1hcnk+XG4gICAgICAgICAgICAgICAgICAgICAgICA8RXhwYW5zaW9uUGFuZWxEZXRhaWxzPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9FeHBhbnNpb25QYW5lbERldGFpbHM+XG4gICAgICAgICAgICAgICAgICAgIDwvRXhwYW5zaW9uUGFuZWw+XG4gICAgICAgICAgICAgICAgICAgIDxFeHBhbnNpb25QYW5lbD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxFeHBhbnNpb25QYW5lbFN1bW1hcnkgZXhwYW5kSWNvbj17PEV4cGFuZE1vcmVJY29uIC8+fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBNZW1iZXJzaGlwc1xuICAgICAgICAgICAgICAgICAgICAgICAgPC9FeHBhbnNpb25QYW5lbFN1bW1hcnk+XG4gICAgICAgICAgICAgICAgICAgICAgICA8RXhwYW5zaW9uUGFuZWxEZXRhaWxzPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9FeHBhbnNpb25QYW5lbERldGFpbHM+XG4gICAgICAgICAgICAgICAgICAgIDwvRXhwYW5zaW9uUGFuZWw+XG4gICAgICAgICAgICAgICAgICAgIDxFeHBhbnNpb25QYW5lbD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxFeHBhbnNpb25QYW5lbFN1bW1hcnkgZXhwYW5kSWNvbj17PEV4cGFuZE1vcmVJY29uIC8+fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBFeHBlcmllbmNlXG4gICAgICAgICAgICAgICAgICAgICAgICA8L0V4cGFuc2lvblBhbmVsU3VtbWFyeT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxFeHBhbnNpb25QYW5lbERldGFpbHM+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L0V4cGFuc2lvblBhbmVsRGV0YWlscz5cbiAgICAgICAgICAgICAgICAgICAgPC9FeHBhbnNpb25QYW5lbD5cbiAgICAgICAgICAgICAgICAgICAgPEV4cGFuc2lvblBhbmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgPEV4cGFuc2lvblBhbmVsU3VtbWFyeSBleHBhbmRJY29uPXs8RXhwYW5kTW9yZUljb24gLz59PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFNwZWNpYWxpemF0aW9uc1xuICAgICAgICAgICAgICAgICAgICAgICAgPC9FeHBhbnNpb25QYW5lbFN1bW1hcnk+XG4gICAgICAgICAgICAgICAgICAgICAgICA8RXhwYW5zaW9uUGFuZWxEZXRhaWxzPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9FeHBhbnNpb25QYW5lbERldGFpbHM+XG4gICAgICAgICAgICAgICAgICAgIDwvRXhwYW5zaW9uUGFuZWw+XG4gICAgICAgICAgICAgICAgICAgIDxFeHBhbnNpb25QYW5lbD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxFeHBhbnNpb25QYW5lbFN1bW1hcnkgZXhwYW5kSWNvbj17PEV4cGFuZE1vcmVJY29uIC8+fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBBd2FyZHNcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvRXhwYW5zaW9uUGFuZWxTdW1tYXJ5PlxuICAgICAgICAgICAgICAgICAgICAgICAgPEV4cGFuc2lvblBhbmVsRGV0YWlscz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvRXhwYW5zaW9uUGFuZWxEZXRhaWxzPlxuICAgICAgICAgICAgICAgICAgICA8L0V4cGFuc2lvblBhbmVsPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IFByb2Zlc3Npb25hbEdyYXBoXG4iLCJpbXBvcnQgUHJvZmVzc2lvbmFsR3JhcGggZnJvbSAnLi9Qcm9mZXNzaW9uYWxHcmFwaC5qcydcblxuZXhwb3J0IGRlZmF1bHQgUHJvZmVzc2lvbmFsR3JhcGgiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCBheGlvcyBmcm9tICdheGlvcydcblxuY2xhc3MgTG9jYXRpb25TZWFyY2ggZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgc2VhcmNoOiBcIlwiLFxuICAgICAgICAgICAgc2VhcmNoUmVzdWx0czogW11cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldExvY2F0aW9uKGxvY2F0aW9uKSB7XG4gICAgICAgIHZhciBhdXRvID0gbmV3IGdvb2dsZS5tYXBzLnBsYWNlcy5BdXRvY29tcGxldGVTZXJ2aWNlKClcblxuICAgICAgICB2YXIgcmVxdWVzdCA9IHtcbiAgICAgICAgICAgIGlucHV0OiBsb2NhdGlvbixcbiAgICAgICAgICAgIHR5cGVzOiBbJ2dlb2NvZGUnXSxcbiAgICAgICAgICAgIGNvbXBvbmVudFJlc3RyaWN0aW9uczogeyBjb3VudHJ5OiAnaW4nIH1cbiAgICAgICAgfTtcbiAgICAgICAgaWYgKGxvY2F0aW9uKSB7XG4gICAgICAgICAgICBhdXRvLmdldFBsYWNlUHJlZGljdGlvbnMocmVxdWVzdCwgZnVuY3Rpb24gKHJlc3VsdHMsIHN0YXR1cykge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBzZWFyY2hSZXN1bHRzOiByZXN1bHRzIH0pXG4gICAgICAgICAgICB9LmJpbmQodGhpcykpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpbnB1dEhhbmRsZXIoZSkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIHNlYXJjaDogZS50YXJnZXQudmFsdWVcbiAgICAgICAgfSlcbiAgICAgICAgdGhpcy5nZXRMb2NhdGlvbihlLnRhcmdldC52YWx1ZSlcblxuICAgIH1cblxuICAgIHNlbGVjdExvY2F0aW9uKGxvY2F0aW9uKSB7XG4gICAgICAgIGxldCBtYXAgPSBuZXcgZ29vZ2xlLm1hcHMuTWFwKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYXAnKSwge1xuICAgICAgICAgICAgY2VudGVyOiB7IGxhdDogLTMzLjg2NywgbG5nOiAxNTEuMTk1IH0sXG4gICAgICAgICAgICB6b29tOiAxNVxuICAgICAgICB9KVxuICAgICAgICBsZXQgc2VydmljZSA9IG5ldyBnb29nbGUubWFwcy5wbGFjZXMuUGxhY2VzU2VydmljZShtYXApO1xuICAgICAgICBzZXJ2aWNlLmdldERldGFpbHMoe1xuICAgICAgICAgICAgcmVmZXJlbmNlOiBsb2NhdGlvbi5yZWZlcmVuY2VcbiAgICAgICAgfSwgZnVuY3Rpb24gKHBsYWNlLCBzdGF0dXMpIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMuc2VsZWN0TG9jYXRpb24ocGxhY2UpXG4gICAgICAgICAgICB0aGlzLnByb3BzLmhpc3RvcnkuZ28oLTEpXG5cbiAgICAgICAgfS5iaW5kKHRoaXMpKVxuICAgIH1cblxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgICBsZXQgaW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndG9wTG9jYXRpb25TZWFyY2gnKVxuICAgICAgICBpbnB1dC5mb2N1cygpXG4gICAgfVxuXG4gICAgc3RhdGljIGNvbnRleHRUeXBlcyA9IHtcbiAgICAgICAgcm91dGVyOiAoKSA9PiBudWxsXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIDxoZWFkZXIgY2xhc3NOYW1lPVwic2tpbi13aGl0ZSBmaXhlZCBob3Jpem9udGFsIHRvcCBsb2NhdGlvbi1kZXRlY3QtaGVhZGVyXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGFpbmVyLWZsdWlkXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLTEyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic2VsZWN0LWxvY2F0aW9uLXJvdyB0ZXh0LWNlbnRlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuaGlzdG9yeS5nbygtMSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19IGNsYXNzTmFtZT1cImN0LWltZyBjdC1pbWctbWQgY2xvc2VcIj48aW1nIHNyYz1cIi9hc3NldHMvaW1nL2N1c3RvbWVyLWljb25zL2Nsb3NlLWJsYWNrLnN2Z1wiIGNsYXNzTmFtZT1cImltZy1mbHVpZFwiIC8+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGg0IGNsYXNzTmFtZT1cImZ3LTcwMCB0ZXh0LW1kXCI+U2VsZWN0IExvY2F0aW9uPC9oND5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtMTJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzZWFyY2gtcm93XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkb24tZ3JvdXAgbG9jYXRpb24tZGV0ZWN0LWZpZWxkXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgdmFsdWU9e3RoaXMuc3RhdGUuc2VhcmNofSBvbkNoYW5nZT17dGhpcy5pbnB1dEhhbmRsZXIuYmluZCh0aGlzKX0gY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sIGlucHV0LW1kIHNlYXJjaC1pbnB1dCBuby1zaGFkb3dcIiBwbGFjZWhvbGRlcj1cIlNlbGVjdCBhbnkgY2l0eSBvciBsb2NhbGl0eVwiIGlkPVwidG9wTG9jYXRpb25TZWFyY2hcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImN0LWltZyBjdC1pbWctc20gbWFwLW1hcmtlci1ibHVlXCI+PGltZyBzcmM9XCIvYXNzZXRzL2ltZy9jdXN0b21lci1pY29ucy9tYXAtbWFya2VyLWJsdWUuc3ZnXCIgY2xhc3NOYW1lPVwiaW1nLWZsdWlkXCIgLz48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZGV0ZWN0LW15LWxvY2FpdG9uXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiY3QtaW1nIGN0LWltZy14c1wiPjxpbWcgc3JjPVwiL2Fzc2V0cy9pbWcvY3VzdG9tZXItaWNvbnMvZ3BzLnN2Z1wiIGNsYXNzTmFtZT1cImltZy1mbHVpZFwiIC8+PC9zcGFuPkRldGVjdCBNeSBMb2NhdGlvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvaGVhZGVyPlxuICAgICAgICAgICAgICAgIDxzZWN0aW9uIGNsYXNzTmFtZT1cIndyYXAgbG9jYXRvbi1kZXRlY3Qtc2NyZWVuXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwid2lkZ2V0LXBhbmVsXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aDQgY2xhc3NOYW1lPVwicGFuZWwtdGl0bGVcIj5TZWFyY2ggUmVzdWx0PC9oND5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGFuZWwtY29udGVudCBwZC0wXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHVsIGNsYXNzTmFtZT1cImxpc3QgY2l0eS1saXN0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUuc2VhcmNoUmVzdWx0cy5tYXAoKHJlc3VsdCwgaSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiA8bGkga2V5PXtpfSBvbkNsaWNrPXt0aGlzLnNlbGVjdExvY2F0aW9uLmJpbmQodGhpcywgcmVzdWx0KX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhPntyZXN1bHQuZGVzY3JpcHRpb259XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJjaXR5LWxvY1wiPkNpdHk8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9zZWN0aW9uPlxuICAgICAgICAgICAgICAgIDxkaXYgaWQ9XCJtYXBcIiBzdHlsZT17eyBkaXNwbGF5OiAnbm9uZScgfX0+PC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgTG9jYXRpb25TZWFyY2hcbiIsImltcG9ydCBMb2NhdGlvblNlYXJjaCBmcm9tICcuL0xvY2F0aW9uU2VhcmNoLmpzJ1xuXG5cbmV4cG9ydCBkZWZhdWx0IExvY2F0aW9uU2VhcmNoIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cbmltcG9ydCBEb2N0b3JQcm9maWxlQ2FyZCBmcm9tICcuLi9jb21tb25zL2RvY3RvclByb2ZpbGVDYXJkL2luZGV4LmpzJ1xuaW1wb3J0IERldGFpbHNGb3JtIGZyb20gJy4vZGV0YWlsc0Zvcm0vaW5kZXguanMnXG5pbXBvcnQgU2VsZWN0ZWRDbGluaWMgZnJvbSAnLi4vY29tbW9ucy9zZWxlY3RlZENsaW5pYy9pbmRleC5qcydcblxuY2xhc3MgUGF0aWVudERldGFpbHMgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgc2VsZWN0ZWREb2N0b3I6IG51bGwsXG4gICAgICAgICAgICBzZWxlY3RlZENsaW5pYzogbnVsbCxcbiAgICAgICAgICAgIHNlbGVjdGVkU2xvdDogbnVsbFxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJvY2VlZCgpe1xuICAgICAgICB0aGlzLmNvbnRleHQucm91dGVyLmhpc3RvcnkucHVzaCgnL3BheW1lbnQnKVxuICAgIH1cblxuICAgIGdldExvY2F0aW9uUGFyYW0odGFnKSB7XG4gICAgICAgIC8vIHRoaXMgQVBJIGFzc3VtZXMgdGhlIGNvbnRleHQgb2YgcmVhY3Qtcm91dGVyLTRcbiAgICAgICAgY29uc3QgcGFyYW1TdHJpbmcgPSB0aGlzLnByb3BzLmxvY2F0aW9uLnNlYXJjaFxuICAgICAgICBjb25zdCBwYXJhbXMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKHBhcmFtU3RyaW5nKVxuICAgICAgICByZXR1cm4gcGFyYW1zLmdldCh0YWcpXG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBsZXQgZG9jdG9ySWQgPSB0aGlzLnByb3BzLm1hdGNoLnBhcmFtcy5pZFxuICAgICAgICAgICAgbGV0IGNsaW5pY0lkID0gdGhpcy5wcm9wcy5tYXRjaC5wYXJhbXMuY2xpbmljSWRcbiAgICAgICAgICAgIGxldCBzZWxlY3RlZFNsb3QgPSB0aGlzLmdldExvY2F0aW9uUGFyYW0oJ3QnKVxuICAgICAgICAgICAgc2VsZWN0ZWRTbG90ID0gbmV3IERhdGUocGFyc2VGbG9hdChzZWxlY3RlZFNsb3QpKVxuICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAoZG9jdG9ySWQgJiYgY2xpbmljSWQgJiYgc2VsZWN0ZWRTbG90KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkRG9jdG9yOiBkb2N0b3JJZCxcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRDbGluaWM6IGNsaW5pY0lkLFxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZFNsb3Q6IHNlbGVjdGVkU2xvdC50b1N0cmluZygpXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB0aGlzLnByb3BzLmdldERvY3RvckJ5SWQoZG9jdG9ySWQpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcblxuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhdGljIGNvbnRleHRUeXBlcyA9IHtcbiAgICAgICAgcm91dGVyOiAoKSA9PiBudWxsXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBhdGllbnREZXRhaWxzXCI+XG5cbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuRE9DVE9SU1t0aGlzLnN0YXRlLnNlbGVjdGVkRG9jdG9yXSA/XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxEb2N0b3JQcm9maWxlQ2FyZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoaWRlQm90dG9tPXt0cnVlfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoaWRlQm9va05vdz17dHJ1ZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGV0YWlscz17dGhpcy5wcm9wcy5ET0NUT1JTW3RoaXMuc3RhdGUuc2VsZWN0ZWREb2N0b3JdfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPFNlbGVjdGVkQ2xpbmljXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkRG9jdG9yPXt0aGlzLnByb3BzLkRPQ1RPUlNbdGhpcy5zdGF0ZS5zZWxlY3RlZERvY3Rvcl19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkQ2xpbmljPXt0aGlzLnN0YXRlLnNlbGVjdGVkQ2xpbmljfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzZWxlY3RlZEFwcG9pbnRtZW50U2xvdFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDU+U2VsZWN0ZWQgQXBwb2ludG1lbnQgU2xvdDwvaDU+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImFwcGRhdGVcIj5BcHBvaW50bWVudCBEYXRlPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJkYXRlXCI+eyB0aGlzLnN0YXRlLnNlbGVjdGVkU2xvdCB9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxEZXRhaWxzRm9ybSAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwicHJvY2VlZGJ0blwiIG9uQ2xpY2s9e3RoaXMucHJvY2VlZC5iaW5kKHRoaXMpfT5Db25maXJtIEJvb2tpbmc8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PiA6IFwiXCJcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBQYXRpZW50RGV0YWlsc1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cbmNsYXNzIERldGFpbHNGb3JtIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIHBhdGllbnROYW1lIDogJycsXG4gICAgICAgICAgICBwYXRpZW50RW1haWwgOiAnJyxcbiAgICAgICAgICAgIHBhdGllbnRHZW5kZXIgOiAnbWFsZScsXG4gICAgICAgICAgICBwYXRpZW50TW9iaWxlIDogJycsXG4gICAgICAgICAgICBvdHAgOicnXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpbnB1dEhhbmRsZXIod2hpY2gsIGUpe1xuICAgICAgICB0aGlzLnNldFN0YXRlKHsgW3doaWNoXSA6IGUudGFyZ2V0LnZhbHVlIH0pXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImRldGFpbHNGb3JtXCI+XG4gICAgICAgICAgICAgICAgPGg1PlBsZWFzZSBwcm92aWRlIHBhdGllbnQgZGV0YWlsczwvaDU+XG5cbiAgICAgICAgICAgICAgICA8aW5wdXQgdmFsdWU9e3RoaXMuc3RhdGUucGF0aWVudE5hbWV9IG9uQ2hhbmdlPXt0aGlzLmlucHV0SGFuZGxlci5iaW5kKHRoaXMsJ3BhdGllbnROYW1lJyl9IGNsYXNzTmFtZT1cInB0bmFtZVwiIHBsYWNlaG9sZGVyPVwiUGF0aWVudCBOYW1lKlwiIC8+XG4gICAgICAgICAgICAgICAgPGlucHV0IHZhbHVlPXt0aGlzLnN0YXRlLnBhdGllbnRFbWFpbH0gb25DaGFuZ2U9e3RoaXMuaW5wdXRIYW5kbGVyLmJpbmQodGhpcywncGF0aWVudEVtYWlsJyl9IGNsYXNzTmFtZT1cInB0ZW1haWxcIiBwbGFjZWhvbGRlcj1cIkVtYWlsKlwiIC8+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwdGdlbmRlclwiPlxuICAgICAgICAgICAgICAgICAgICA8c3Bhbj5HZW5kZXIgOjwvc3Bhbj4gXG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwicmFkaW9cIiBuYW1lPVwiZ2VuZGVyXCIgdmFsdWU9XCJtYWxlXCIgY2hlY2tlZD17dGhpcy5zdGF0ZS5wYXRpZW50R2VuZGVyID09PSBcIm1hbGVcIn0gb25DaGFuZ2U9e3RoaXMuaW5wdXRIYW5kbGVyLmJpbmQodGhpcywncGF0aWVudEdlbmRlcicpfS8+IE1hbGVcbiAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJyYWRpb1wiIG5hbWU9XCJnZW5kZXJcIiB2YWx1ZT1cImZlbWFsZVwiIGNoZWNrZWQ9e3RoaXMuc3RhdGUucGF0aWVudEdlbmRlciA9PT0gXCJmZW1hbGVcIn0gb25DaGFuZ2U9e3RoaXMuaW5wdXRIYW5kbGVyLmJpbmQodGhpcywncGF0aWVudEdlbmRlcicpfS8+IEZlbWFsZVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxpbnB1dCB2YWx1ZT17dGhpcy5zdGF0ZS5wYXRpZW50TW9iaWxlfSBvbkNoYW5nZT17dGhpcy5pbnB1dEhhbmRsZXIuYmluZCh0aGlzLCdwYXRpZW50TW9iaWxlJyl9IGNsYXNzTmFtZT1cInB0bW9iaWxlXCIgcGxhY2Vob2xkZXI9XCJNb2JpbGUqXCIgLz5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cIm90cGJ0blwiPihSZSlTZW5kIE9UUDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDxpbnB1dCB2YWx1ZT17dGhpcy5zdGF0ZS5vdHB9IG9uQ2hhbmdlPXt0aGlzLmlucHV0SGFuZGxlci5iaW5kKHRoaXMsJ290cCcpfSBjbGFzc05hbWU9XCJwdG90cFwiIHBsYWNlaG9sZGVyPVwiRW50ZXIgT1RQKlwiIC8+XG5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBEZXRhaWxzRm9ybVxuIiwiaW1wb3J0IERldGFpbHNGb3JtIGZyb20gJy4vRGV0YWlsc0Zvcm0uanMnXG5cbmV4cG9ydCBkZWZhdWx0IERldGFpbHNGb3JtIiwiaW1wb3J0IFBhdGllbnREZXRhaWxzIGZyb20gJy4vUGF0aWVudERldGFpbHMuanMnXG5cbmV4cG9ydCBkZWZhdWx0IFBhdGllbnREZXRhaWxzIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IFBheW1lbnRJY29uIGZyb20gJ21hdGVyaWFsLXVpLWljb25zL1BheW1lbnQnO1xuaW1wb3J0IENhc2hJY29uIGZyb20gJ21hdGVyaWFsLXVpLWljb25zL0F0dGFjaE1vbmV5JztcblxuY2xhc3MgUGF5bWVudFZpZXcgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgIH1cblxuICAgIHByb2NlZWQoKXtcbiAgICAgICAgdGhpcy5jb250ZXh0LnJvdXRlci5oaXN0b3J5LnB1c2goXCIvYm9va2luZy86cmVmSWRcIilcbiAgICB9XG5cbiAgICBzdGF0aWMgY29udGV4dFR5cGVzID0ge1xuICAgICAgICByb3V0ZXI6ICgpID0+IG51bGxcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGF5bWVudFwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwib2ZmZXJSb3dcIj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4+R2V0IDEwJSBjYXNoYmFjayBmb3IgYWxsIG9ubGluZSBwYXltZW50LCBUJkM8L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwYXltZW50Um93XCIgb25DbGljaz17dGhpcy5wcm9jZWVkLmJpbmQodGhpcyl9PlxuICAgICAgICAgICAgICAgICAgICA8UGF5bWVudEljb24gY2xhc3NOYW1lPVwicGF5bWVudEljb25cIiAvPlxuICAgICAgICAgICAgICAgICAgICA8c3Bhbj5QYXl0bSBXYWxsZXQ8L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwYXltZW50Um93XCIgb25DbGljaz17dGhpcy5wcm9jZWVkLmJpbmQodGhpcyl9PlxuICAgICAgICAgICAgICAgICAgICA8UGF5bWVudEljb24gY2xhc3NOYW1lPVwicGF5bWVudEljb25cIiAvPlxuICAgICAgICAgICAgICAgICAgICA8c3Bhbj5DcmVkaXQvRGViaXQvQVRNIENhcmQ8L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwYXltZW50Um93XCIgb25DbGljaz17dGhpcy5wcm9jZWVkLmJpbmQodGhpcyl9PlxuICAgICAgICAgICAgICAgICAgICA8UGF5bWVudEljb24gY2xhc3NOYW1lPVwicGF5bWVudEljb25cIiAvPlxuICAgICAgICAgICAgICAgICAgICA8c3Bhbj5OZXQgQmFua2luZzwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBheW1lbnRSb3dcIiBvbkNsaWNrPXt0aGlzLnByb2NlZWQuYmluZCh0aGlzKX0+XG4gICAgICAgICAgICAgICAgICAgIDxDYXNoSWNvbiBjbGFzc05hbWU9XCJwYXltZW50SWNvblwiIC8+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuPlBheSBpbiBDYXNoPC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGF5bWVudFJvd1wiIG9uQ2xpY2s9e3RoaXMucHJvY2VlZC5iaW5kKHRoaXMpfT5cbiAgICAgICAgICAgICAgICAgICAgPFBheW1lbnRJY29uIGNsYXNzTmFtZT1cInBheW1lbnRJY29uXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4+T25Eb2MgUGF5PC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IFBheW1lbnRWaWV3XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcblxuaW1wb3J0IENvbW1vbmx5U2VhcmNoZWQgZnJvbSAnLi4vY29tbW9ucy9jb21tb25seVNlYXJjaGVkL2luZGV4LmpzJ1xuLy8gaW1wb3J0IExvY2F0aW9uU2VsZWN0b3IgZnJvbSAnLi4vLi4vY29tbW9ucy9sb2NhdGlvblNlbGVjdG9yL2luZGV4LmpzJ1xuaW1wb3J0IENyaXRlcmlhU2VsZWN0b3IgZnJvbSAnLi4vY29tbW9ucy9jcml0ZXJpYVNlbGVjdG9yL2luZGV4LmpzJ1xuXG5jbGFzcyBTZWFyY2hDcml0ZXJpYVZpZXcgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgIH1cblxuICAgIGNvbXBvbmVudERpZE1vdW50KCl7XG4gICAgICAgIHRoaXMucHJvcHMubG9hZFNlYXJjaENyaXRlcmlhKClcbiAgICB9XG5cbiAgICBzZWFyY2hQcm9jZWVkKCl7XG4gICAgICAgIC8vIGxldCBzZWFyY2hEYXRhID0ge1xuICAgICAgICAvLyAgICAgc2VsZWN0ZWRTcGVjaWFsaXRpZXMgOiB0aGlzLnByb3BzLnNlbGVjdGVkU3BlY2lhbGl0aWVzLFxuICAgICAgICAvLyAgICAgc2VsZWN0ZWRDb25kaXRpb25zIDogdGhpcy5wcm9wcy5zZWxlY3RlZENvbmRpdGlvbnMsXG4gICAgICAgIC8vICAgICBzZWxlY3RlZExvY2F0aW9uIDogdGhpcy5wcm9wcy5zZWxlY3RlZExvY2F0aW9uLFxuICAgICAgICAvLyAgICAgc2VsZWN0ZWRDcml0ZXJpYSA6IHRoaXMucHJvcHMuc2VsZWN0ZWRDcml0ZXJpYVxuICAgICAgICAvLyB9XG4gICAgICAgIC8vIHNlYXJjaERhdGEgPSBlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc2VhcmNoRGF0YSkpXG4gICAgICAgIHRoaXMuY29udGV4dC5yb3V0ZXIuaGlzdG9yeS5wdXNoKGAvc2VhcmNocmVzdWx0c2ApXG4gICAgfVxuXG4gICAgc3RhdGljIGNvbnRleHRUeXBlcyA9IHtcbiAgICAgICAgcm91dGVyOiAoKSA9PiBudWxsXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNlYXJjaENyaXRlcmlhXCI+XG4gICAgICAgICAgICAgICAgPExvY2F0aW9uU2VsZWN0b3JcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRMb2NhdGlvbj17dGhpcy5wcm9wcy5zZWxlY3RlZExvY2F0aW9ufVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPENyaXRlcmlhU2VsZWN0b3IgXG4gICAgICAgICAgICAgICAgICAgIGNvbW1vbmx5U2VhcmNoZWRDb25kaXRpb25zPXt0aGlzLnByb3BzLmNvbW1vbmx5U2VhcmNoZWRDb25kaXRpb25zfVxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZENvbmRpdGlvbnM9e3RoaXMucHJvcHMuc2VsZWN0ZWRDb25kaXRpb25zfVxuICAgICAgICAgICAgICAgICAgICBjb21tb25seVNlYXJjaGVkU3BlY2lhbGl0aWVzPXt0aGlzLnByb3BzLmNvbW1vbmx5U2VhcmNoZWRTcGVjaWFsaXRpZXN9XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkU3BlY2lhbGl0aWVzPXt0aGlzLnByb3BzLnNlbGVjdGVkU3BlY2lhbGl0aWVzfVxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZENyaXRlcmlhPXt0aGlzLnByb3BzLnNlbGVjdGVkQ3JpdGVyaWF9XG4gICAgICAgICAgICAgICAgICAgIHRvZ2dsZUNvbmRpdGlvbj17dGhpcy5wcm9wcy50b2dnbGVDb25kaXRpb24uYmluZCh0aGlzKX1cbiAgICAgICAgICAgICAgICAgICAgdG9nZ2xlU3BlY2lhbGl0eT17dGhpcy5wcm9wcy50b2dnbGVTcGVjaWFsaXR5LmJpbmQodGhpcyl9XG4gICAgICAgICAgICAgICAgICAgIHRvZ2dsZUNyaXRlcmlhPXt0aGlzLnByb3BzLnRvZ2dsZUNyaXRlcmlhLmJpbmQodGhpcyl9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8Q29tbW9ubHlTZWFyY2hlZFxuICAgICAgICAgICAgICAgICAgICBoZWFkaW5nPVwiQ29tbW9ubHkgc2VhcmNoZWQgY29uZGl0aW9uc1wiXG4gICAgICAgICAgICAgICAgICAgIGRhdGE9e3RoaXMucHJvcHMuY29tbW9ubHlTZWFyY2hlZENvbmRpdGlvbnN9XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkPXt0aGlzLnByb3BzLnNlbGVjdGVkQ29uZGl0aW9uc31cbiAgICAgICAgICAgICAgICAgICAgdG9nZ2xlUGlsbD17dGhpcy5wcm9wcy50b2dnbGVDb25kaXRpb24uYmluZCh0aGlzKX1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDxDb21tb25seVNlYXJjaGVkXG4gICAgICAgICAgICAgICAgICAgIGhlYWRpbmc9XCJDb21tb25seSBzZWFyY2hlZCBzcGVjaWFsaXRpZXNcIlxuICAgICAgICAgICAgICAgICAgICBkYXRhPXt0aGlzLnByb3BzLmNvbW1vbmx5U2VhcmNoZWRTcGVjaWFsaXRpZXN9XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkPXt0aGlzLnByb3BzLnNlbGVjdGVkU3BlY2lhbGl0aWVzfVxuICAgICAgICAgICAgICAgICAgICB0b2dnbGVQaWxsPXt0aGlzLnByb3BzLnRvZ2dsZVNwZWNpYWxpdHkuYmluZCh0aGlzKX1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDxidXR0b24gb25DbGljaz17dGhpcy5zZWFyY2hQcm9jZWVkLmJpbmQodGhpcyl9IGNsYXNzTmFtZT1cInByb2NlZWRCdG5cIj4gUHJvY2VlZCA8L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgU2VhcmNoQ3JpdGVyaWFWaWV3XG4iLCJpbXBvcnQgU2VhcmNoQ3JpdGVyaWFWaWV3IGZyb20gJy4vU2VhcmNoQ3JpdGVyaWFWaWV3LmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBTZWFyY2hDcml0ZXJpYVZpZXciLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgRG9jdG9yc0xpc3QgZnJvbSAnLi4vc2VhcmNoUmVzdWx0cy9kb2N0b3JzTGlzdC9pbmRleC5qcydcbmltcG9ydCBUb3BCYXIgZnJvbSAnLi4vc2VhcmNoUmVzdWx0cy90b3BCYXIvaW5kZXguanMnXG5cblxuY2xhc3MgU2VhcmNoUmVzdWx0c1ZpZXcgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgICAgICB0aGlzLnN0YXRlID0ge1xuXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgbGV0IHtcbiAgICAgICAgICAgIHNlbGVjdGVkQ29uZGl0aW9ucyxcbiAgICAgICAgICAgIHNlbGVjdGVkU3BlY2lhbGl0aWVzLFxuICAgICAgICAgICAgc2VsZWN0ZWRMb2NhdGlvbixcbiAgICAgICAgICAgIHNlbGVjdGVkQ3JpdGVyaWEsXG4gICAgICAgICAgICBDUklURVJJQV9MT0FERURcbiAgICAgICAgfSA9IHRoaXMucHJvcHNcblxuICAgICAgICBpZiAoQ1JJVEVSSUFfTE9BREVEKSB7XG4gICAgICAgICAgICBsZXQgc2VhcmNoU3RhdGUgPSB7XG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRDb25kaXRpb25zLFxuICAgICAgICAgICAgICAgIHNlbGVjdGVkU3BlY2lhbGl0aWVzLFxuICAgICAgICAgICAgICAgIHNlbGVjdGVkTG9jYXRpb24sXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRDcml0ZXJpYVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV0IGZpbHRlclN0YXRlID0gdGhpcy5wcm9wcy5maWx0ZXJDcml0ZXJpYVxuICAgICAgICAgICAgdGhpcy5nZXREb2N0b3JMaXN0KHNlYXJjaFN0YXRlLCBmaWx0ZXJTdGF0ZSwgZmFsc2UpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGxldCBzZWFyY2hTdGF0ZSA9IHRoaXMuZ2V0TG9jYXRpb25QYXJhbSgnc2VhcmNoJylcbiAgICAgICAgICAgICAgICBsZXQgZmlsdGVyU3RhdGUgPSB0aGlzLmdldExvY2F0aW9uUGFyYW0oJ2ZpbHRlcicpXG4gICAgICAgICAgICAgICAgaWYgKGZpbHRlclN0YXRlKSB7XG4gICAgICAgICAgICAgICAgICAgIGZpbHRlclN0YXRlID0gSlNPTi5wYXJzZShmaWx0ZXJTdGF0ZSlcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBmaWx0ZXJTdGF0ZSA9IHt9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHNlYXJjaFN0YXRlID0gSlNPTi5wYXJzZShzZWFyY2hTdGF0ZSlcbiAgICAgICAgICAgICAgICB0aGlzLmdldERvY3Rvckxpc3Qoc2VhcmNoU3RhdGUsIGZpbHRlclN0YXRlLCB0cnVlKVxuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgZ2V0TG9jYXRpb25QYXJhbSh0YWcpIHtcbiAgICAgICAgLy8gdGhpcyBBUEkgYXNzdW1lcyB0aGUgY29udGV4dCBvZiByZWFjdC1yb3V0ZXItNFxuICAgICAgICBjb25zdCBwYXJhbVN0cmluZyA9IHRoaXMucHJvcHMubG9jYXRpb24uc2VhcmNoXG4gICAgICAgIGNvbnN0IHBhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXMocGFyYW1TdHJpbmcpXG4gICAgICAgIHJldHVybiBwYXJhbXMuZ2V0KHRhZylcbiAgICB9XG5cbiAgICBnZXREb2N0b3JMaXN0KHNlYXJjaFN0YXRlLCBmaWx0ZXJTdGF0ZSwgbWVyZ2VTdGF0ZSkge1xuICAgICAgICB0aGlzLnByb3BzLmdldERvY3RvcnMoc2VhcmNoU3RhdGUsIGZpbHRlclN0YXRlLCBtZXJnZVN0YXRlKTtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNlYXJjaFJlc3VsdHNcIj5cbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuTE9BRElORyA/IFwiXCIgOlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8VG9wQmFyIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPERvY3RvcnNMaXN0IHsuLi50aGlzLnByb3BzfSAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBTZWFyY2hSZXN1bHRzVmlld1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cbmltcG9ydCBFbW90aUljb24gZnJvbSAnbWF0ZXJpYWwtdWktaWNvbnMvQWNjb3VudENpcmNsZSc7XG5pbXBvcnQgSG9tZUljb24gZnJvbSAnbWF0ZXJpYWwtdWktaWNvbnMvSG9tZSc7XG5pbXBvcnQgQ2xvY2tJY29uIGZyb20gJ21hdGVyaWFsLXVpLWljb25zL0F2VGltZXInO1xuaW1wb3J0IExvY2F0aW9uc0ljb24gZnJvbSAnbWF0ZXJpYWwtdWktaWNvbnMvTG9jYXRpb25Pbic7XG5cbmltcG9ydCBEb2N0b3JQcm9maWxlQ2FyZCBmcm9tICcuLi8uLi9jb21tb25zL2RvY3RvclByb2ZpbGVDYXJkL2luZGV4LmpzJ1xuaW1wb3J0IEluZmluaXRlU2Nyb2xsIGZyb20gJ3JlYWN0LWluZmluaXRlLXNjcm9sbGVyJztcbmNsYXNzIERvY3RvcnNMaXN0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICB9XG5cbiAgICBzdGF0aWMgY29udGV4dFR5cGVzID0ge1xuICAgICAgICByb3V0ZXI6ICgpID0+IG51bGxcbiAgICB9XG5cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICBsZXQgeyBET0NUT1JTLCBkb2N0b3JMaXN0IH0gPSB0aGlzLnByb3BzXG4gICAgICAgIFxuICAgICAgICB2YXIgZG9jdG9yVmlld0xpc3QgPSBbXTtcblxuICAgICAgICBkb2N0b3JWaWV3TGlzdCA9IGRvY3Rvckxpc3QubWFwKChkb2NJZCwgaSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIDxEb2N0b3JQcm9maWxlQ2FyZCBkZXRhaWxzPXtET0NUT1JTW2RvY0lkXX0gc2VsZWN0RG9jdG9yPXt0aGlzLnByb3BzLnNlbGVjdERvY3Rvcn0ga2V5PXtpfSAvPlxuICAgICAgICB9KVxuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImRvY3RvcnNMaXN0XCI+XG4gICAgICAgICAgICAgICAgey8qIDxJbmZpbml0ZVNjcm9sbFxuICAgICAgICAgICAgICAgICAgICBwYWdlU3RhcnQ9ezB9XG4gICAgICAgICAgICAgICAgICAgIGxvYWRNb3JlPXt0aGlzLnByb3BzLmdldERvY3RvcnN9XG4gICAgICAgICAgICAgICAgICAgIGhhc01vcmU9e2ZhbHNlfVxuICAgICAgICAgICAgICAgICAgICBsb2FkZXI9ezxkaXYgY2xhc3NOYW1lPVwibG9hZGVyXCIga2V5PXswfT5Mb2FkaW5nIC4uLjwvZGl2Pn1cbiAgICAgICAgICAgICAgICA+ICovfVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICB7ZG9jdG9yVmlld0xpc3R9XG5cbiAgICAgICAgICAgICAgICB7LyogPC9JbmZpbml0ZVNjcm9sbD4gKi99XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgRG9jdG9yc0xpc3RcbiIsImltcG9ydCBEb2N0b3JMaXN0IGZyb20gJy4vRG9jdG9yc0xpc3QuanMnXG5cbmV4cG9ydCBkZWZhdWx0IERvY3Rvckxpc3QiLCJpbXBvcnQgU2VhcmNoUmVzdWx0c1ZpZXcgZnJvbSAnLi9TZWFyY2hSZXN1bHRzVmlldy5qcydcblxuZXhwb3J0IGRlZmF1bHQgU2VhcmNoUmVzdWx0c1ZpZXciLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcblxuaW1wb3J0IFNvcnRJY29uIGZyb20gJ21hdGVyaWFsLXVpLWljb25zL1NvcnQnO1xuaW1wb3J0IEZpbHRlckljb24gZnJvbSAnbWF0ZXJpYWwtdWktaWNvbnMvRmlsdGVyTGlzdCc7XG5pbXBvcnQgTWVudSwgeyBNZW51SXRlbSB9IGZyb20gJ21hdGVyaWFsLXVpL01lbnUnO1xuXG5jbGFzcyBUb3BCYXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgYW5jaG9yRWw6IG51bGwsXG4gICAgICAgICAgICBzZWFyY2hSZXN1bHRzIDogdHJ1ZVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlT3BlbihldmVudCkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHsgYW5jaG9yRWw6IGV2ZW50LmN1cnJlbnRUYXJnZXQgfSlcbiAgICB9XG5cbiAgICBoYW5kbGVDbG9zZSgpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGFuY2hvckVsOiBudWxsIH0pXG4gICAgfVxuXG4gICAgc3RhdGljIGNvbnRleHRUeXBlcyA9IHtcbiAgICAgICAgcm91dGVyOiAoKSA9PiBudWxsXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRvcEJhclwiPlxuICAgICAgICAgICAgICAgIDxTb3J0SWNvbiBjbGFzc05hbWU9XCJpY29uc29ydGZpbHRlclwiIG9uQ2xpY2s9e3RoaXMuaGFuZGxlT3Blbi5iaW5kKHRoaXMpfSAvPlxuICAgICAgICAgICAgICAgIDxNZW51XG4gICAgICAgICAgICAgICAgICAgIGlkPVwic29ydC1tZW51XCJcbiAgICAgICAgICAgICAgICAgICAgYW5jaG9yRWw9e3RoaXMuc3RhdGUuYW5jaG9yRWx9XG4gICAgICAgICAgICAgICAgICAgIG9wZW49e0Jvb2xlYW4odGhpcy5zdGF0ZS5hbmNob3JFbCl9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2xvc2U9e3RoaXMuaGFuZGxlQ2xvc2UuYmluZCh0aGlzKX1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIDxNZW51SXRlbSBvbkNsaWNrPXt0aGlzLmhhbmRsZUNsb3NlLmJpbmQodGhpcyl9PlJlbGF2YW5jZTwvTWVudUl0ZW0+XG4gICAgICAgICAgICAgICAgICAgIDxNZW51SXRlbSBvbkNsaWNrPXt0aGlzLmhhbmRsZUNsb3NlLmJpbmQodGhpcyl9PkZlZTwvTWVudUl0ZW0+XG4gICAgICAgICAgICAgICAgICAgIDxNZW51SXRlbSBvbkNsaWNrPXt0aGlzLmhhbmRsZUNsb3NlLmJpbmQodGhpcyl9PkRpc3RhbmNlPC9NZW51SXRlbT5cbiAgICAgICAgICAgICAgICAgICAgPE1lbnVJdGVtIG9uQ2xpY2s9e3RoaXMuaGFuZGxlQ2xvc2UuYmluZCh0aGlzKX0+QXBvaW50bWVudDwvTWVudUl0ZW0+XG4gICAgICAgICAgICAgICAgPC9NZW51PlxuICAgICAgICAgICAgICAgIDxGaWx0ZXJJY29uIGNsYXNzTmFtZT1cImljb25zb3J0ZmlsdGVyXCIgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRleHQucm91dGVyLmhpc3RvcnkucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXRobmFtZSA6ICcvc2VhcmNocmVzdWx0cy9maWx0ZXInXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfX0gLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBUb3BCYXJcbiIsImltcG9ydCBUb3BCYXIgZnJvbSAnLi9Ub3BCYXIuanMnXG5cbmV4cG9ydCBkZWZhdWx0IFRvcEJhciIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IHsgd2l0aFJvdXRlciB9IGZyb20gXCJyZWFjdC1yb3V0ZXItZG9tXCI7XG5cbmltcG9ydCBSYWRpbywgeyBSYWRpb0dyb3VwIH0gZnJvbSAnbWF0ZXJpYWwtdWkvUmFkaW8nO1xuaW1wb3J0IENoZWNrYm94IGZyb20gJ21hdGVyaWFsLXVpL0NoZWNrYm94JztcbmltcG9ydCB7IEZvcm1MYWJlbCwgRm9ybUNvbnRyb2wsIEZvcm1Db250cm9sTGFiZWwsIEZvcm1IZWxwZXJUZXh0IH0gZnJvbSAnbWF0ZXJpYWwtdWkvRm9ybSc7XG5cblxuY2xhc3MgU2VhcmNoUmVzdWx0c0ZpbHRlciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgICBmZWVfMDogZmFsc2UsXG4gICAgICAgICAgICBmZWVfMTogZmFsc2UsXG4gICAgICAgICAgICBmZWVfMjogZmFsc2UsXG4gICAgICAgICAgICBmZWVfMzogZmFsc2UsXG4gICAgICAgICAgICBnZW5kZXI6ICdhbnknLFxuICAgICAgICAgICAgY2xpbmljX3BlcnNvbmFsOiBmYWxzZSxcbiAgICAgICAgICAgIGNsaW5pY19ob3NwaXRhbDogZmFsc2UsXG4gICAgICAgICAgICBjbGluaWNfbXVsdGk6IGZhbHNlLFxuICAgICAgICAgICAgYXZhaWxhYmxlX3RvZGF5OiBmYWxzZSxcbiAgICAgICAgICAgIGRpc3RhbmNlOiAnMzBrbSdcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHsgLi4udGhpcy5wcm9wcy5maWx0ZXJDcml0ZXJpYSB9KVxuICAgIH1cblxuICAgIGFwcGx5RmlsdGVyKCkge1xuICAgICAgICB0aGlzLnByb3BzLnNldE9QREZpbHRlcnModGhpcy5zdGF0ZSlcbiAgICAgICAgdGhpcy5wcm9wcy5oaXN0b3J5LmdvKC0xKVxuICAgIH1cblxuICAgIGhhbmRsZUNoZWNrYm94KG5hbWUsIGUpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IFtuYW1lXTogZS50YXJnZXQuY2hlY2tlZCB9KVxuICAgIH1cblxuICAgIGhhbmRsZUNoYW5nZVJhZGlvKG5hbWUsIGUpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IFtuYW1lXTogZS50YXJnZXQudmFsdWUgfSlcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic2VhcmNoUmVzdWx0c0ZpbHRlclwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3ViRmlsdGVyXCI+XG4gICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInN1YkhlYWRpbmdcIj5GZWU8L3A+XG4gICAgICAgICAgICAgICAgICAgIDxSYWRpb0dyb3VwXG4gICAgICAgICAgICAgICAgICAgICAgICBhcmlhLWxhYmVsPVwiZmVlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU9XCJmZWUxXCJcbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgPEZvcm1Db250cm9sTGFiZWwgY29udHJvbD17PENoZWNrYm94XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2tlZD17dGhpcy5zdGF0ZS5mZWVfMH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5oYW5kbGVDaGVja2JveC5iaW5kKHRoaXMsICdmZWVfMCcpfVxuICAgICAgICAgICAgICAgICAgICAgICAgLz59IGxhYmVsPVwiTGVzcyB0aGFuIDMwMFwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8Rm9ybUNvbnRyb2xMYWJlbCBjb250cm9sPXs8Q2hlY2tib3hcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGVja2VkPXt0aGlzLnN0YXRlLmZlZV8xfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUNoZWNrYm94LmJpbmQodGhpcywgJ2ZlZV8xJyl9XG4gICAgICAgICAgICAgICAgICAgICAgICAvPn0gbGFiZWw9XCIzMDAgdG8gNTAwXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxGb3JtQ29udHJvbExhYmVsIGNvbnRyb2w9ezxDaGVja2JveFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrZWQ9e3RoaXMuc3RhdGUuZmVlXzJ9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuaGFuZGxlQ2hlY2tib3guYmluZCh0aGlzLCAnZmVlXzInKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8+fSBsYWJlbD1cIjUwMCB0byAxMDAwXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxGb3JtQ29udHJvbExhYmVsIGNvbnRyb2w9ezxDaGVja2JveFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrZWQ9e3RoaXMuc3RhdGUuZmVlXzN9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuaGFuZGxlQ2hlY2tib3guYmluZCh0aGlzLCAnZmVlXzMnKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8+fSBsYWJlbD1cIjEwMDArXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgPC9SYWRpb0dyb3VwPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdWJGaWx0ZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwic3ViSGVhZGluZ1wiPkRpc3RhbmNlPC9wPlxuICAgICAgICAgICAgICAgICAgICA8UmFkaW9Hcm91cFxuICAgICAgICAgICAgICAgICAgICAgICAgYXJpYS1sYWJlbD1cIkRpc3RhbmNlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU9XCJEaXN0YW5jZTJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3RoaXMuc3RhdGUuZGlzdGFuY2V9XG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5oYW5kbGVDaGFuZ2VSYWRpby5iaW5kKHRoaXMsICdkaXN0YW5jZScpfVxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICA8Rm9ybUNvbnRyb2xMYWJlbCB2YWx1ZT1cIjMwa21cIiBjb250cm9sPXs8UmFkaW8gY29sb3I9XCJwcmltYXJ5XCIgLz59IGxhYmVsPVwiVW5kZXIgMzAgS01cIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPEZvcm1Db250cm9sTGFiZWwgdmFsdWU9XCIyMGttXCIgY29udHJvbD17PFJhZGlvIGNvbG9yPVwicHJpbWFyeVwiIC8+fSBsYWJlbD1cIlVuZGVyIDIwIEtNXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxGb3JtQ29udHJvbExhYmVsIHZhbHVlPVwiMTBrbVwiIGNvbnRyb2w9ezxSYWRpbyBjb2xvcj1cInByaW1hcnlcIiAvPn0gbGFiZWw9XCJVbmRlciAxMCBLTVwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8Rm9ybUNvbnRyb2xMYWJlbCB2YWx1ZT1cIjVrbVwiIGNvbnRyb2w9ezxSYWRpbyBjb2xvcj1cInByaW1hcnlcIiAvPn0gbGFiZWw9XCJVbmRlciA1IEtNXCIgLz5cblxuICAgICAgICAgICAgICAgICAgICA8L1JhZGlvR3JvdXA+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN1YkZpbHRlclwiPlxuICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJzdWJIZWFkaW5nXCI+VHlwZSBPZiBDbGluaWM8L3A+XG4gICAgICAgICAgICAgICAgICAgIDxSYWRpb0dyb3VwXG4gICAgICAgICAgICAgICAgICAgICAgICBhcmlhLWxhYmVsPVwiY2xpbmljVHlwZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lPVwiY2xpbmljVHlwZVwiXG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxGb3JtQ29udHJvbExhYmVsIGNvbnRyb2w9ezxDaGVja2JveFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrZWQ9e3RoaXMuc3RhdGUuY2xpbmljX3BlcnNvbmFsfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUNoZWNrYm94LmJpbmQodGhpcywgJ2NsaW5pY19wZXJzb25hbCcpfVxuICAgICAgICAgICAgICAgICAgICAgICAgLz59IGxhYmVsPVwiUGVyc29uYWxcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPEZvcm1Db250cm9sTGFiZWwgY29udHJvbD17PENoZWNrYm94XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2tlZD17dGhpcy5zdGF0ZS5jbGluaWNfaG9zcGl0YWx9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuaGFuZGxlQ2hlY2tib3guYmluZCh0aGlzLCAnY2xpbmljX2hvc3BpdGFsJyl9XG4gICAgICAgICAgICAgICAgICAgICAgICAvPn0gbGFiZWw9XCJIb3NwaXRhbFwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8Rm9ybUNvbnRyb2xMYWJlbCBjb250cm9sPXs8Q2hlY2tib3hcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGVja2VkPXt0aGlzLnN0YXRlLmNsaW5pY19tdWx0aX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5oYW5kbGVDaGVja2JveC5iaW5kKHRoaXMsICdjbGluaWNfbXVsdGknKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8+fSBsYWJlbD1cIk11bHRpLWRvY3RvciBjbGluaWNcIiAvPlxuICAgICAgICAgICAgICAgICAgICA8L1JhZGlvR3JvdXA+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN1YkZpbHRlclwiPlxuICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJzdWJIZWFkaW5nXCI+R2VuZGVyPC9wPlxuICAgICAgICAgICAgICAgICAgICA8UmFkaW9Hcm91cFxuICAgICAgICAgICAgICAgICAgICAgICAgYXJpYS1sYWJlbD1cImdlbmRlclwiXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lPVwiZ2VuZGVyMlwiXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17dGhpcy5zdGF0ZS5nZW5kZXJ9XG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5oYW5kbGVDaGFuZ2VSYWRpby5iaW5kKHRoaXMsICdnZW5kZXInKX1cbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgPEZvcm1Db250cm9sTGFiZWwgdmFsdWU9XCJhbnlcIiBjb250cm9sPXs8UmFkaW8gY29sb3I9XCJwcmltYXJ5XCIgLz59IGxhYmVsPVwiQW55XCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxGb3JtQ29udHJvbExhYmVsIHZhbHVlPVwibWFsZVwiIGNvbnRyb2w9ezxSYWRpbyBjb2xvcj1cInByaW1hcnlcIiAvPn0gbGFiZWw9XCJNYWxlXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxGb3JtQ29udHJvbExhYmVsIHZhbHVlPVwiZmVtYWxlXCIgY29udHJvbD17PFJhZGlvIGNvbG9yPVwicHJpbWFyeVwiIC8+fSBsYWJlbD1cIkZlbWFsZVwiIC8+XG5cbiAgICAgICAgICAgICAgICAgICAgPC9SYWRpb0dyb3VwPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdWJGaWx0ZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwic3ViSGVhZGluZ1wiPkF2YWlsYWJpbGl0eTwvcD5cbiAgICAgICAgICAgICAgICAgICAgPFJhZGlvR3JvdXBcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyaWEtbGFiZWw9XCJhdmFpbGFiaWxpdHlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZT1cImF2YWlsYWJpbGl0eVwiXG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxGb3JtQ29udHJvbExhYmVsIGNvbnRyb2w9ezxDaGVja2JveFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrZWQ9e3RoaXMuc3RhdGUuYXZhaWxhYmxlX3RvZGF5fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUNoZWNrYm94LmJpbmQodGhpcywgJ2F2YWlsYWJsZV90b2RheScpfVxuICAgICAgICAgICAgICAgICAgICAgICAgLz59IGxhYmVsPVwiQXZpYWxhYmxlIFRvZGF5XCIgLz5sYWJlbD1cIk11bHRpLWRvY3RvciBjbGluaWNcIiAvPlxuICAgICAgICAgICAgICAgICAgICA8L1JhZGlvR3JvdXA+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImFwcGx5RmlsdGVyXCIgb25DbGljaz17dGhpcy5hcHBseUZpbHRlci5iaW5kKHRoaXMpfT5BcHBseTwvYnV0dG9uPlxuXG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgd2l0aFJvdXRlcihTZWFyY2hSZXN1bHRzRmlsdGVyKVxuIiwiaW1wb3J0IFNlYXJjaFJlc3VsdHNGaWx0ZXIgZnJvbSAnLi9TZWFyY2hSZXN1bHRzRmlsdGVyLmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBTZWFyY2hSZXN1bHRzRmlsdGVyIiwiZXhwb3J0IGNvbnN0IEFQUEVORF9ET0NUT1JTID0gJ0FQUEVORF9ET0NUT1JTJztcbmV4cG9ydCBjb25zdCBET0NUT1JfU0VBUkNIID0gJ0RPQ1RPUl9TRUFSQ0gnO1xuZXhwb3J0IGNvbnN0IFNFTEVDVF9ET0NUT1IgPSAnU0VMRUNUX0RPQ1RPUic7XG5cbmV4cG9ydCBjb25zdCBUT0dHTEVfQ09ORElUSU9OUyA9ICdUT0dHTEVfQ09ORElUSU9OUyc7XG5leHBvcnQgY29uc3QgVE9HR0xFX1NQRUNJQUxJVElFUyA9ICdUT0dHTEVfU1BFQ0lBTElUSUVTJztcbmV4cG9ydCBjb25zdCBUT0dHTEVfVEVTVFMgPSAnVE9HR0xFX1RFU1RTJztcbmV4cG9ydCBjb25zdCBTRUxFQ1RfTE9DQVRJT04gPSAnU0VMRUNUX0xPQ0FUSU9OJztcbmV4cG9ydCBjb25zdCBNRVJHRV9TRUFSQ0hfU1RBVEVfT1BEID0gJ01FUkdFX1NFQVJDSF9TVEFURV9PUEQnO1xuZXhwb3J0IGNvbnN0IFRPR0dMRV9DUklURVJJQSA9ICdUT0dHTEVfQ1JJVEVSSUEnO1xuZXhwb3J0IGNvbnN0IFRPR0dMRV9ESUFHTk9TSVNfQ1JJVEVSSUEgPSAnVE9HR0xFX0RJQUdOT1NJU19DUklURVJJQSc7XG5leHBvcnQgY29uc3QgU0VUX09QRF9GSUxURVJTID0gJ1NFVF9PUERfRklMVEVSUydcbmV4cG9ydCBjb25zdCBTRVRfTEFCU19GSUxURVJTID0gJ1NFVF9MQUJTX0ZJTFRFUlMnXG5leHBvcnQgY29uc3QgTE9BRF9TRUFSQ0hfQ1JJVEVSSUFfT1BEID0gJ0xPQURfU0VBUkNIX0NSSVRFUklBX09QRCdcblxuZXhwb3J0IGNvbnN0IE1FUkdFX1NFQVJDSF9TVEFURV9MQUIgPSAnTUVSR0VfU0VBUkNIX1NUQVRFX0xBQic7XG5leHBvcnQgY29uc3QgTE9BRF9TRUFSQ0hfQ1JJVEVSSUFfTEFCID0gJ0xPQURfU0VBUkNIX0NSSVRFUklBX09QRCdcbmV4cG9ydCBjb25zdCBBUFBFTkRfTEFCUyA9ICdBUFBFTkRfTEFCUyc7XG5leHBvcnQgY29uc3QgTEFCX1NFQVJDSCA9ICdMQUJfU0VBUkNIJztcbmV4cG9ydCBjb25zdCBTRUxFQ1RfTE9DQVRJT05fRElBR05PU0lTID0gJ1NFTEVDVF9MT0NBVElPTl9ESUFHTk9TSVMnO1xuZXhwb3J0IGNvbnN0IEFQUEVORF9GSUxURVJTX0RJQUdOT1NJUyA9ICdBUFBFTkRfRklMVEVSU19ESUFHTk9TSVMnO1xuZXhwb3J0IGNvbnN0IExBQl9TRUFSQ0hfU1RBUlQgPSAnTEFCX1NFQVJDSF9TVEFSVCc7XG5cblxuZXhwb3J0IGNvbnN0IEFQUEVORF9VU0VSX1BST0ZJTEVTID0gJ0FQUEVORF9VU0VSX1BST0ZJTEVTJztcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG5pbXBvcnQgeyB9IGZyb20gJy4uLy4uL2FjdGlvbnMvaW5kZXguanMnXG5cbmltcG9ydCBDaGF0VmlldyBmcm9tICcuLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvY2hhdC9pbmRleC5qcydcblxuXG5jbGFzcyBDaGF0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxDaGF0VmlldyB7Li4udGhpcy5wcm9wc30gLz5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9IChzdGF0ZSkgPT4ge1xuICAgIGNvbnN0IFVTRVIgPSBzdGF0ZS5VU0VSXG5cbiAgICByZXR1cm4ge1xuICAgICAgICBVU0VSXG4gICAgfVxufVxuXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSAoZGlzcGF0Y2gpID0+IHtcbiAgICByZXR1cm4ge1xuXG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpKENoYXQpO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cbmltcG9ydCB7IGdldFVzZXJQcm9maWxlV2l0aEFwcG9pbnRtZW50cyB9IGZyb20gJy4uLy4uL2FjdGlvbnMvaW5kZXguanMnXG5cbmltcG9ydCBVc2VyQXBwb2ludG1lbnRzVmlldyBmcm9tICcuLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvdXNlckFwcG9pbnRtZW50cy9pbmRleC5qcydcblxuXG5jbGFzcyBVc2VyQXBwb2ludG1lbnRzIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxVc2VyQXBwb2ludG1lbnRzVmlldyB7Li4udGhpcy5wcm9wc30gLz5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9IChzdGF0ZSkgPT4ge1xuICAgIGNvbnN0IFVTRVIgPSBzdGF0ZS5VU0VSXG5cbiAgICByZXR1cm4ge1xuICAgICAgICBVU0VSXG4gICAgfVxufVxuXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSAoZGlzcGF0Y2gpID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgICBnZXRVc2VyUHJvZmlsZVdpdGhBcHBvaW50bWVudHMgOiAoKSA9PiBkaXNwYXRjaChnZXRVc2VyUHJvZmlsZVdpdGhBcHBvaW50bWVudHMoKSlcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG1hcERpc3BhdGNoVG9Qcm9wcykoVXNlckFwcG9pbnRtZW50cyk7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcblxuaW1wb3J0IHsgZ2V0VXNlclByb2ZpbGUgfSBmcm9tICcuLi8uLi9hY3Rpb25zL2luZGV4LmpzJ1xuXG5pbXBvcnQgVXNlclByb2ZpbGVWaWV3IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy91c2VyUHJvZmlsZS9pbmRleC5qcydcblxuXG5jbGFzcyBVc2VyUHJvZmlsZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8VXNlclByb2ZpbGVWaWV3IHsuLi50aGlzLnByb3BzfSAvPlxuICAgICAgICApO1xuICAgIH1cbn1cblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHN0YXRlKSA9PiB7XG4gICAgY29uc3QgVVNFUiA9IHN0YXRlLlVTRVJcblxuICAgIHJldHVybiB7XG4gICAgICAgIFVTRVJcbiAgICB9XG59XG5cbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IChkaXNwYXRjaCkgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICAgIGdldFVzZXJQcm9maWxlIDogKCkgPT4gZGlzcGF0Y2goZ2V0VXNlclByb2ZpbGUoKSlcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG1hcERpc3BhdGNoVG9Qcm9wcykoVXNlclByb2ZpbGUpO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cbmltcG9ydCB7IGdldFVzZXJQcm9maWxlV2l0aFRlc3RzIH0gZnJvbSAnLi4vLi4vYWN0aW9ucy9pbmRleC5qcydcblxuaW1wb3J0IFVzZXJSZXBvcnRzVmlldyBmcm9tICcuLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvdXNlclJlcG9ydHMvaW5kZXguanMnXG5cblxuY2xhc3MgVXNlclJlcG9ydHMgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPFVzZXJSZXBvcnRzVmlldyB7Li4udGhpcy5wcm9wc30gLz5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9IChzdGF0ZSkgPT4ge1xuICAgIGNvbnN0IFVTRVIgPSBzdGF0ZS5VU0VSXG5cbiAgICByZXR1cm4ge1xuICAgICAgICBVU0VSXG4gICAgfVxufVxuXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSAoZGlzcGF0Y2gpID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgICBnZXRVc2VyUHJvZmlsZVdpdGhUZXN0cyA6ICgpID0+IGRpc3BhdGNoKGdldFVzZXJQcm9maWxlV2l0aFRlc3RzKCkpXG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpKFVzZXJSZXBvcnRzKTtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG5pbXBvcnQgeyBnZXRMYWJCb29raW5nU3VtbWFyeSB9IGZyb20gJy4uLy4uL2FjdGlvbnMvaW5kZXguanMnXG5cbmltcG9ydCBCb29raW5nU3VtbWFyeVZpZXcgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9kaWFnbm9zaXMvYm9va2luZ1N1bW1hcnkvaW5kZXguanMnXG5cbmNsYXNzIEJvb2tpbmdTdW1tYXJ5IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxCb29raW5nU3VtbWFyeVZpZXcgey4uLnRoaXMucHJvcHN9IC8+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoc3RhdGUpID0+IHtcblxuICAgIHJldHVybiB7XG5cbiAgICB9XG59XG5cbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IChkaXNwYXRjaCkgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICAgIGdldExhYkJvb2tpbmdTdW1tYXJ5IDogKGJvb2tpbmdJZCwgY2FsbGJhY2spID0+IGRpc3BhdGNoKGdldExhYkJvb2tpbmdTdW1tYXJ5KGJvb2tpbmdJZCwgY2FsbGJhY2spKVxuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbWFwRGlzcGF0Y2hUb1Byb3BzKShCb29raW5nU3VtbWFyeSk7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcblxuaW1wb3J0IHsgZ2V0TGFiQnlJZCwgZ2V0TGFiVGltZVNsb3RzIH0gZnJvbSAnLi4vLi4vYWN0aW9ucy9pbmRleC5qcydcblxuaW1wb3J0IExhYlZpZXcgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9kaWFnbm9zaXMvbGFiL2luZGV4LmpzJ1xuXG5jbGFzcyBMYWIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPExhYlZpZXcgey4uLnRoaXMucHJvcHN9IC8+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoc3RhdGUpID0+IHtcblxuICAgIGxldCBMQUJTID0gc3RhdGUuTEFCU1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgTEFCU1xuICAgIH1cbn1cblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gKGRpc3BhdGNoKSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgZ2V0TGFiQnlJZCA6IChsYWJJZCkgPT4gZGlzcGF0Y2goZ2V0TGFiQnlJZChsYWJJZCkpLFxuICAgICAgICBnZXRMYWJUaW1lU2xvdHMgOiAobGFiSWQsIHRlc3RJZHMsIGNhbGxiYWNrKSA9PiBkaXNwYXRjaChnZXRMYWJUaW1lU2xvdHMobGFiSWQsIHRlc3RJZHMsIGNhbGxiYWNrKSlcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG1hcERpc3BhdGNoVG9Qcm9wcykoTGFiKTtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG5pbXBvcnQgeyBnZXRMYWJCeUlkIH0gZnJvbSAnLi4vLi4vYWN0aW9ucy9pbmRleC5qcydcblxuaW1wb3J0IFBhdGllbnREZXRhaWxzVmlldyBmcm9tICcuLi8uLi9jb21wb25lbnRzL2RpYWdub3Npcy9wYXRpZW50RGV0YWlscy9pbmRleC5qcydcblxuY2xhc3MgUGF0aWVudERldGFpbHMgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPFBhdGllbnREZXRhaWxzVmlldyB7Li4udGhpcy5wcm9wc30gLz5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9IChzdGF0ZSkgPT4ge1xuXG4gICAgbGV0IExBQlMgPSBzdGF0ZS5MQUJTXG5cbiAgICByZXR1cm4ge1xuICAgICAgICBMQUJTXG4gICAgfVxufVxuXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSAoZGlzcGF0Y2gpID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgICBnZXRMYWJCeUlkIDogKGxhYklkLCB0ZXN0SWRzKSA9PiBkaXNwYXRjaChnZXRMYWJCeUlkKGxhYklkLCB0ZXN0SWRzKSlcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG1hcERpc3BhdGNoVG9Qcm9wcykoUGF0aWVudERldGFpbHMpO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cbmltcG9ydCB7IGxvYWRMYWJDb21tb25Dcml0ZXJpYXMsIHRvZ2dsZURpYWdub3Npc0NyaXRlcmlhLCBnZXREaWFnbm9zaXNDcml0ZXJpYVJlc3VsdHMgfSBmcm9tICcuLi8uLi9hY3Rpb25zL2luZGV4LmpzJ1xuaW1wb3J0IFNlYXJjaENyaXRlcmlhVmlldyBmcm9tICcuLi8uLi9jb21wb25lbnRzL2RpYWdub3Npcy9zZWFyY2hDcml0ZXJpYS9pbmRleC5qcydcblxuY2xhc3MgU2VhcmNoQ3JpdGVyaWEgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgIH1cblxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgICB0aGlzLnByb3BzLmxvYWRMYWJDb21tb25Dcml0ZXJpYXMoKVxuICAgIH1cblxuICAgIHN0YXRpYyBjb250ZXh0VHlwZXMgPSB7XG4gICAgICAgIHJvdXRlcjogKCkgPT4gbnVsbFxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICBpZiAodGhpcy5wcm9wcy5MT0FERURfU0VBUkNIX0NSSVRFUklBX0xBQikge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8U2VhcmNoQ3JpdGVyaWFWaWV3IHsuLi50aGlzLnByb3BzfSAvPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBcIlwiXG4gICAgICAgIH1cbiAgICB9XG59XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9IChzdGF0ZSkgPT4ge1xuXG4gICAgY29uc3Qge1xuICAgICAgICBMT0FERURfU0VBUkNIX0NSSVRFUklBX0xBQixcbiAgICAgICAgY29tbW9uX3Rlc3RzLFxuICAgICAgICBjb21tb25fY29uZGl0aW9ucyxcbiAgICAgICAgcHJlZmVycmVkX2xhYnMsXG4gICAgICAgIHNlbGVjdGVkQ3JpdGVyaWFzLFxuICAgICAgICBzZWxlY3RlZExvY2F0aW9uLFxuICAgICAgICBmaWx0ZXJDcml0ZXJpYVxuICAgIH0gPSBzdGF0ZS5TRUFSQ0hfQ1JJVEVSSUFfTEFCU1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgTE9BREVEX1NFQVJDSF9DUklURVJJQV9MQUIsXG4gICAgICAgIGNvbW1vbl90ZXN0cyxcbiAgICAgICAgY29tbW9uX2NvbmRpdGlvbnMsXG4gICAgICAgIHByZWZlcnJlZF9sYWJzLFxuICAgICAgICBzZWxlY3RlZENyaXRlcmlhcyxcbiAgICAgICAgc2VsZWN0ZWRMb2NhdGlvbixcbiAgICAgICAgZmlsdGVyQ3JpdGVyaWFcbiAgICB9XG59XG5cbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IChkaXNwYXRjaCkgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICAgIGxvYWRMYWJDb21tb25Dcml0ZXJpYXM6ICgpID0+IGRpc3BhdGNoKGxvYWRMYWJDb21tb25Dcml0ZXJpYXMoKSksXG4gICAgICAgIHRvZ2dsZURpYWdub3Npc0NyaXRlcmlhOiAodHlwZSwgY3JpdGVyaWEpID0+IGRpc3BhdGNoKHRvZ2dsZURpYWdub3Npc0NyaXRlcmlhKHR5cGUsIGNyaXRlcmlhKSksXG4gICAgICAgIGdldERpYWdub3Npc0NyaXRlcmlhUmVzdWx0czogKHNlYXJjaFN0cmluZywgY2FsbGJhY2spID0+IGRpc3BhdGNoKGdldERpYWdub3Npc0NyaXRlcmlhUmVzdWx0cyhzZWFyY2hTdHJpbmcsIGNhbGxiYWNrKSlcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG1hcERpc3BhdGNoVG9Qcm9wcykoU2VhcmNoQ3JpdGVyaWEpO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cbmltcG9ydCB7IGdldExhYnMsIHRvZ2dsZURpYWdub3Npc0NyaXRlcmlhLCBnZXREaWFnbm9zaXNDcml0ZXJpYVJlc3VsdHMgfSBmcm9tICcuLi8uLi9hY3Rpb25zL2luZGV4LmpzJ1xuXG5pbXBvcnQgU2VhcmNoUmVzdWx0c1ZpZXcgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9kaWFnbm9zaXMvc2VhcmNoUmVzdWx0cy9pbmRleC5qcydcblxuY2xhc3MgU2VhcmNoUmVzdWx0cyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG5cbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgc3RhdGljIGNvbnRleHRUeXBlcyA9IHtcbiAgICAgICAgcm91dGVyOiAoKSA9PiBudWxsXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8U2VhcmNoUmVzdWx0c1ZpZXcgey4uLnRoaXMucHJvcHN9IC8+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoc3RhdGUpID0+IHtcbiAgICBjb25zdCB7XG4gICAgICAgIHNlbGVjdGVkTG9jYXRpb24sXG4gICAgICAgIHNlbGVjdGVkQ3JpdGVyaWFzLFxuICAgICAgICBmaWx0ZXJDcml0ZXJpYSxcbiAgICAgICAgTE9BREVEX1NFQVJDSF9DUklURVJJQV9MQUJcbiAgICB9ID0gc3RhdGUuU0VBUkNIX0NSSVRFUklBX0xBQlNcblxuICAgIGNvbnN0IExBQlMgPSBzdGF0ZS5MQUJTXG4gICAgY29uc3QgeyBsYWJMaXN0LCBMT0FERURfTEFCU19TRUFSQ0ggfSA9IHN0YXRlLkxBQl9TRUFSQ0hcblxuICAgIHJldHVybiB7XG4gICAgICAgIHNlbGVjdGVkTG9jYXRpb24sXG4gICAgICAgIHNlbGVjdGVkQ3JpdGVyaWFzLFxuICAgICAgICBmaWx0ZXJDcml0ZXJpYSxcbiAgICAgICAgTE9BREVEX1NFQVJDSF9DUklURVJJQV9MQUIsXG4gICAgICAgIExBQlMsXG4gICAgICAgIGxhYkxpc3QsIExPQURFRF9MQUJTX1NFQVJDSFxuICAgIH1cblxufVxuXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSAoZGlzcGF0Y2gpID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgICBnZXRMYWJzOiAoc2VhcmNoU3RhdGUsIGZpbHRlckNyaXRlcmlhLCBtZXJnZVN0YXRlKSA9PiBkaXNwYXRjaChnZXRMYWJzKHNlYXJjaFN0YXRlLCBmaWx0ZXJDcml0ZXJpYSwgbWVyZ2VTdGF0ZSkpLFxuICAgICAgICB0b2dnbGVEaWFnbm9zaXNDcml0ZXJpYTogKHR5cGUsIGNyaXRlcmlhKSA9PiBkaXNwYXRjaCh0b2dnbGVEaWFnbm9zaXNDcml0ZXJpYSh0eXBlLCBjcml0ZXJpYSkpLFxuICAgICAgICBnZXREaWFnbm9zaXNDcml0ZXJpYVJlc3VsdHM6IChzZWFyY2hTdHJpbmcsIGNhbGxiYWNrKSA9PiBkaXNwYXRjaChnZXREaWFnbm9zaXNDcml0ZXJpYVJlc3VsdHMoc2VhcmNoU3RyaW5nLCBjYWxsYmFjaykpXG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbWFwRGlzcGF0Y2hUb1Byb3BzKShTZWFyY2hSZXN1bHRzKTtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG5pbXBvcnQgeyBnZXREb2N0b3JCeUlkLCBnZXRUaW1lU2xvdHMgfSBmcm9tICcuLi8uLi9hY3Rpb25zL2luZGV4LmpzJ1xuXG5pbXBvcnQgQXBwb2ludG1lbnRTbG90VmlldyBmcm9tICcuLi8uLi9jb21wb25lbnRzL29wZC9hcHBvaW50bWVudFNsb3QvaW5kZXguanMnXG5cbmNsYXNzIEFwcG9pbnRtZW50U2xvdCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8QXBwb2ludG1lbnRTbG90VmlldyB7Li4udGhpcy5wcm9wc30gLz5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9IChzdGF0ZSkgPT4ge1xuXG4gICAgbGV0IERPQ1RPUlMgPSBzdGF0ZS5ET0NUT1JTXG5cbiAgICByZXR1cm4ge1xuICAgICAgICBET0NUT1JTXG4gICAgfVxufVxuXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSAoZGlzcGF0Y2gpID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgICBnZXREb2N0b3JCeUlkIDogKGRvY3RvcklkKSA9PiBkaXNwYXRjaChnZXREb2N0b3JCeUlkKGRvY3RvcklkKSksXG4gICAgICAgIGdldFRpbWVTbG90cyA6IChkb2N0b3JJZCwgY2xpbmljSWQsIGNhbGxiYWNrKSA9PiBkaXNwYXRjaChnZXRUaW1lU2xvdHMoZG9jdG9ySWQsIGNsaW5pY0lkLCBjYWxsYmFjaykpXG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpKEFwcG9pbnRtZW50U2xvdCk7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcblxuaW1wb3J0IHsgfSBmcm9tICcuLi8uLi9hY3Rpb25zL2luZGV4LmpzJ1xuXG5pbXBvcnQgQm9va2luZ1ZpZXcgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9vcGQvYm9va2luZy9Cb29raW5nVmlldy5qcydcblxuY2xhc3MgQm9va2luZyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8Qm9va2luZ1ZpZXcgey4uLnRoaXMucHJvcHN9IC8+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoc3RhdGUpID0+IHtcblxuICAgIHJldHVybiB7XG5cbiAgICB9XG59XG5cbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IChkaXNwYXRjaCkgPT4ge1xuICAgIHJldHVybiB7XG5cbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG1hcERpc3BhdGNoVG9Qcm9wcykoQm9va2luZyk7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcblxuaW1wb3J0IHsgZ2V0RG9jdG9yQnlJZCB9IGZyb20gJy4uLy4uL2FjdGlvbnMvaW5kZXguanMnXG5cbmltcG9ydCBDbGluaWNMaXN0VmlldyBmcm9tICcuLi8uLi9jb21wb25lbnRzL29wZC9jbGluaWNMaXN0L2luZGV4LmpzJ1xuXG5jbGFzcyBDbGluaWNMaXN0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxDbGluaWNMaXN0VmlldyB7Li4udGhpcy5wcm9wc30gLz5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9IChzdGF0ZSkgPT4ge1xuXG4gICAgbGV0IERPQ1RPUlMgPSBzdGF0ZS5ET0NUT1JTXG5cbiAgICByZXR1cm4ge1xuICAgICAgICBET0NUT1JTXG4gICAgfVxufVxuXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSAoZGlzcGF0Y2gpID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgICBnZXREb2N0b3JCeUlkIDogKGRvY3RvcklkKSA9PiBkaXNwYXRjaChnZXREb2N0b3JCeUlkKGRvY3RvcklkKSlcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG1hcERpc3BhdGNoVG9Qcm9wcykoQ2xpbmljTGlzdCk7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcblxuaW1wb3J0IHsgZ2V0Q3JpdGVyaWFSZXN1bHRzLCB0b2dnbGVDcml0ZXJpYSB9IGZyb20gJy4uLy4uL2FjdGlvbnMvaW5kZXguanMnXG5pbXBvcnQgQ3JpdGVyaWFTZWFyY2hWaWV3IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvb3BkL2NyaXRlcmlhU2VhcmNoL2luZGV4LmpzJ1xuXG5jbGFzcyBDcml0ZXJpYVNlYXJjaCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8Q3JpdGVyaWFTZWFyY2hWaWV3XG4gICAgICAgICAgICAgICAgeyAuLi50aGlzLnByb3BzIH1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoc3RhdGUpID0+IHtcblxuICAgIHJldHVybiB7XG5cbiAgICB9XG59XG5cbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IChkaXNwYXRjaCkgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICAgIGdldENyaXRlcmlhUmVzdWx0cyA6IChzZWFyY2hTdHJpbmcsY2IpID0+IGRpc3BhdGNoKGdldENyaXRlcmlhUmVzdWx0cyhzZWFyY2hTdHJpbmcsY2IpKSxcbiAgICAgICAgdG9nZ2xlQ3JpdGVyaWEgOiAoY3JpdGVyaWEpID0+IGRpc3BhdGNoKHRvZ2dsZUNyaXRlcmlhKGNyaXRlcmlhKSlcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG1hcERpc3BhdGNoVG9Qcm9wcykoQ3JpdGVyaWFTZWFyY2gpO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cbmltcG9ydCB7IGdldERvY3RvckJ5SWQgfSBmcm9tICcuLi8uLi9hY3Rpb25zL2luZGV4LmpzJ1xuXG5pbXBvcnQgRG9jdG9yUHJvZmlsZVZpZXcgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9vcGQvZG9jdG9yUHJvZmlsZS9pbmRleC5qcydcblxuY2xhc3MgRG9jdG9yUHJvZmlsZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8RG9jdG9yUHJvZmlsZVZpZXcgey4uLnRoaXMucHJvcHN9IC8+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoc3RhdGUpID0+IHtcblxuICAgIGxldCBET0NUT1JTID0gc3RhdGUuRE9DVE9SU1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgRE9DVE9SU1xuICAgIH1cbn1cblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gKGRpc3BhdGNoKSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgZ2V0RG9jdG9yQnlJZCA6IChkb2N0b3JJZCkgPT4gZGlzcGF0Y2goZ2V0RG9jdG9yQnlJZChkb2N0b3JJZCkpXG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpKERvY3RvclByb2ZpbGUpO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cbmltcG9ydCB7IHNlbGVjdExvY2F0aW9uIH0gZnJvbSAnLi4vLi4vYWN0aW9ucy9pbmRleC5qcydcbmltcG9ydCBMb2NhdGlvblNlYXJjaFZpZXcgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9vcGQvbG9jYXRpb25TZWFyY2gvaW5kZXguanMnXG5cbmNsYXNzIExvY2F0aW9uU2VhcmNoIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICB9XG5cbiAgICBzdGF0aWMgY29udGV4dFR5cGVzID0ge1xuICAgICAgICByb3V0ZXI6ICgpID0+IG51bGxcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxMb2NhdGlvblNlYXJjaFZpZXcgey4uLnRoaXMucHJvcHN9IC8+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoc3RhdGUpID0+IHtcbiAgICBjb25zdCB7XG4gICAgICAgIHNlbGVjdGVkTG9jYXRpb25cbiAgICB9ID0gc3RhdGUuU0VBUkNIX0NSSVRFUklBX09QRFxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgc2VsZWN0ZWRMb2NhdGlvblxuICAgIH1cbn1cblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gKGRpc3BhdGNoKSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgc2VsZWN0TG9jYXRpb246IChsb2NhdGlvbikgPT4gZGlzcGF0Y2goc2VsZWN0TG9jYXRpb24obG9jYXRpb24pKVxuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbWFwRGlzcGF0Y2hUb1Byb3BzKShMb2NhdGlvblNlYXJjaCk7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcblxuaW1wb3J0IHsgZ2V0RG9jdG9yQnlJZCB9IGZyb20gJy4uLy4uL2FjdGlvbnMvaW5kZXguanMnXG5cbmltcG9ydCBQYXRpZW50RGV0YWlsc1ZpZXcgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9vcGQvcGF0aWVudERldGFpbHMvaW5kZXguanMnXG5cbmNsYXNzIFBhdGllbnREZXRhaWxzIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxQYXRpZW50RGV0YWlsc1ZpZXcgey4uLnRoaXMucHJvcHN9IC8+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoc3RhdGUpID0+IHtcblxuICAgIGxldCBET0NUT1JTID0gc3RhdGUuRE9DVE9SU1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgRE9DVE9SU1xuICAgIH1cbn1cblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gKGRpc3BhdGNoKSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgZ2V0RG9jdG9yQnlJZCA6IChkb2N0b3JJZCkgPT4gZGlzcGF0Y2goZ2V0RG9jdG9yQnlJZChkb2N0b3JJZCkpXG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpKFBhdGllbnREZXRhaWxzKTtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG5pbXBvcnQgeyB9IGZyb20gJy4uLy4uL2FjdGlvbnMvaW5kZXguanMnXG5cbmltcG9ydCBQYXltZW50VmlldyBmcm9tICcuLi8uLi9jb21wb25lbnRzL29wZC9wYXltZW50L1BheW1lbnRWaWV3LmpzJ1xuXG5jbGFzcyBQYXltZW50IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxQYXltZW50VmlldyB7Li4udGhpcy5wcm9wc30gLz5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9IChzdGF0ZSkgPT4ge1xuXG4gICAgcmV0dXJuIHtcblxuICAgIH1cbn1cblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gKGRpc3BhdGNoKSA9PiB7XG4gICAgcmV0dXJuIHtcblxuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbWFwRGlzcGF0Y2hUb1Byb3BzKShQYXltZW50KTtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG5pbXBvcnQgeyB0b2dnbGVDb25kaXRpb24sIHRvZ2dsZVNwZWNpYWxpdHksIHRvZ2dsZUNyaXRlcmlhLCBsb2FkU2VhcmNoQ3JpdGVyaWEgfSBmcm9tICcuLi8uLi9hY3Rpb25zL2luZGV4LmpzJ1xuaW1wb3J0IFNlYXJjaENyaXRlcmlhVmlldyBmcm9tICcuLi8uLi9jb21wb25lbnRzL29wZC9zZWFyY2hDcml0ZXJpYS9pbmRleC5qcydcblxuY2xhc3MgU2VhcmNoQ3JpdGVyaWEgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgIH1cblxuICAgIHN0YXRpYyBjb250ZXh0VHlwZXMgPSB7XG4gICAgICAgIHJvdXRlcjogKCkgPT4gbnVsbFxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPFNlYXJjaENyaXRlcmlhVmlldyB7Li4udGhpcy5wcm9wc30gLz5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9IChzdGF0ZSkgPT4ge1xuXG4gICAgY29uc3Qge1xuICAgICAgICBjb21tb25seVNlYXJjaGVkQ29uZGl0aW9ucyxcbiAgICAgICAgc2VsZWN0ZWRDb25kaXRpb25zLFxuICAgICAgICBjb21tb25seVNlYXJjaGVkU3BlY2lhbGl0aWVzLFxuICAgICAgICBzZWxlY3RlZFNwZWNpYWxpdGllcyxcbiAgICAgICAgc2VsZWN0ZWRMb2NhdGlvbixcbiAgICAgICAgc2VsZWN0ZWRDcml0ZXJpYVxuICAgIH0gPSBzdGF0ZS5TRUFSQ0hfQ1JJVEVSSUFfT1BEXG5cbiAgICByZXR1cm4ge1xuICAgICAgICBjb21tb25seVNlYXJjaGVkQ29uZGl0aW9ucyxcbiAgICAgICAgc2VsZWN0ZWRDb25kaXRpb25zLFxuICAgICAgICBjb21tb25seVNlYXJjaGVkU3BlY2lhbGl0aWVzLFxuICAgICAgICBzZWxlY3RlZFNwZWNpYWxpdGllcyxcbiAgICAgICAgc2VsZWN0ZWRMb2NhdGlvbixcbiAgICAgICAgc2VsZWN0ZWRDcml0ZXJpYVxuICAgIH1cbn1cblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gKGRpc3BhdGNoKSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdG9nZ2xlQ29uZGl0aW9uOiAoaWQpID0+IGRpc3BhdGNoKHRvZ2dsZUNvbmRpdGlvbihpZCkpLFxuICAgICAgICB0b2dnbGVTcGVjaWFsaXR5OiAoaWQpID0+IGRpc3BhdGNoKHRvZ2dsZVNwZWNpYWxpdHkoaWQpKSxcbiAgICAgICAgdG9nZ2xlQ3JpdGVyaWEgOiAoY3JpdGVyaWEpID0+IGRpc3BhdGNoKHRvZ2dsZUNyaXRlcmlhKGNyaXRlcmlhKSksXG4gICAgICAgIGxvYWRTZWFyY2hDcml0ZXJpYTogKCkgPT4gZGlzcGF0Y2gobG9hZFNlYXJjaENyaXRlcmlhKCkpXG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpKFNlYXJjaENyaXRlcmlhKTtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG5pbXBvcnQgeyBnZXREb2N0b3JzIH0gZnJvbSAnLi4vLi4vYWN0aW9ucy9pbmRleC5qcydcblxuaW1wb3J0IFNlYXJjaFJlc3VsdHNWaWV3IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvb3BkL3NlYXJjaFJlc3VsdHMvaW5kZXguanMnXG5cbmNsYXNzIFNlYXJjaFJlc3VsdHMgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgICAgICB0aGlzLnN0YXRlID0ge1xuXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxTZWFyY2hSZXN1bHRzVmlldyB7IC4uLnRoaXMucHJvcHMgfSAvPlxuICAgICAgICApO1xuICAgIH1cbn1cblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHN0YXRlKSA9PiB7XG5cbiAgICBjb25zdCB7XG4gICAgICAgIHNlbGVjdGVkQ29uZGl0aW9ucyxcbiAgICAgICAgc2VsZWN0ZWRTcGVjaWFsaXRpZXMsXG4gICAgICAgIHNlbGVjdGVkTG9jYXRpb24sXG4gICAgICAgIHNlbGVjdGVkQ3JpdGVyaWEsXG4gICAgICAgIGZpbHRlckNyaXRlcmlhLFxuICAgICAgICBDUklURVJJQV9MT0FERURcbiAgICB9ID0gc3RhdGUuU0VBUkNIX0NSSVRFUklBX09QRFxuXG4gICAgbGV0IERPQ1RPUlMgPSBzdGF0ZS5ET0NUT1JTXG4gICAgbGV0IHsgZG9jdG9yTGlzdCwgTE9BRElORywgRVJST1IgfSA9IHN0YXRlLkRPQ1RPUl9TRUFSQ0hcblxuICAgIHJldHVybiB7XG4gICAgICAgIERPQ1RPUlMsIGRvY3Rvckxpc3QsIExPQURJTkcsIEVSUk9SLFxuICAgICAgICBzZWxlY3RlZENvbmRpdGlvbnMsXG4gICAgICAgIHNlbGVjdGVkU3BlY2lhbGl0aWVzLFxuICAgICAgICBzZWxlY3RlZExvY2F0aW9uLFxuICAgICAgICBzZWxlY3RlZENyaXRlcmlhLFxuICAgICAgICBmaWx0ZXJDcml0ZXJpYSxcbiAgICAgICAgQ1JJVEVSSUFfTE9BREVEXG4gICAgfVxufVxuXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSAoZGlzcGF0Y2gpID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgICBnZXREb2N0b3JzOiAoc2VhcmNoU3RhdGUsZmlsdGVyU3RhdGUsbWVyZ2VTdGF0ZSkgPT4gZGlzcGF0Y2goZ2V0RG9jdG9ycyhzZWFyY2hTdGF0ZSxmaWx0ZXJTdGF0ZSxtZXJnZVN0YXRlKSlcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpKFNlYXJjaFJlc3VsdHMpO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cbmltcG9ydCB7IHNldE9QREZpbHRlcnMgfSBmcm9tICcuLi8uLi9hY3Rpb25zL2luZGV4LmpzJ1xuXG5pbXBvcnQgU2VhcmNoUmVzdWx0c0ZpbHRlclZpZXcgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9vcGQvc2VhcmNoUmVzdWx0c0ZpbHRlci9pbmRleC5qcydcblxuY2xhc3MgU2VhcmNoUmVzdWx0c0ZpbHRlciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8U2VhcmNoUmVzdWx0c0ZpbHRlclZpZXcgey4uLnRoaXMucHJvcHN9Lz5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9IChzdGF0ZSkgPT4ge1xuXG4gICAgY29uc3Qge1xuICAgICAgICBmaWx0ZXJDcml0ZXJpYVxuICAgIH0gPSBzdGF0ZS5TRUFSQ0hfQ1JJVEVSSUFfT1BEXG5cbiAgICByZXR1cm4ge1xuICAgICAgICBmaWx0ZXJDcml0ZXJpYVxuICAgIH1cbn1cblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gKGRpc3BhdGNoKSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgc2V0T1BERmlsdGVycyA6IChmaWx0ZXJEYXRhKSA9PiBkaXNwYXRjaChzZXRPUERGaWx0ZXJzKGZpbHRlckRhdGEpKVxuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbWFwRGlzcGF0Y2hUb1Byb3BzKShTZWFyY2hSZXN1bHRzRmlsdGVyKTtcbiIsImltcG9ydCBOQVZJR0FURSBmcm9tICcuL25hdmlnYXRlJ1xuXG5leHBvcnQgZGVmYXVsdCBOQVZJR0FURSIsImNvbnN0IE5BVklHQVRFID0ge1xuICAgIG5hdmlnYXRlVG8gOiAod2hlcmUpID0+IHtcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSB3aGVyZVxuICAgIH0sXG5cbiAgICByZWZyZXNoQXBwb2ludG1lbnRTdGF0ZSA6IChwcm9wcykgPT4ge1xuICAgICAgICBsZXQgbm9BcHBvaW50bWVudEZvdW5kID0gcHJvcHMudXBjb21pbmcubGVuZ3RoID09IDAgJiYgcHJvcHMucHJldmlvdXMubGVuZ3RoID09IDBcbiAgICAgICAgXG4gICAgICAgIGlmKHByb3BzLmhpc3RvcnkuYWN0aW9uID09PSAnUFVTSCcgfHwgbm9BcHBvaW50bWVudEZvdW5kKXtcbiAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTkFWSUdBVEUiLCJpbXBvcnQgU1RPUkFHRSBmcm9tICcuL3N0b3JhZ2UnXG5cbmV4cG9ydCBkZWZhdWx0IFNUT1JBR0UiLCJpbXBvcnQgQ29va2llcyBmcm9tICd1bml2ZXJzYWwtY29va2llJztcbmNvbnN0IGNvb2tpZXMgPSBuZXcgQ29va2llcygpO1xuXG5jb25zdCBTVE9SQUdFID0ge1xuICAgIHNldEF1dGhUb2tlbjogKHRva2VuKSA9PiB7XG4gICAgICAgIGNvb2tpZXMuc2V0KCd0b2tlbicsIHRva2VuKVxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHRydWUpXG4gICAgfSxcbiAgICBnZXRBdXRoVG9rZW46ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShjb29raWVzLmdldCgndG9rZW4nKSlcbiAgICB9LFxuICAgIGNoZWNrQXV0aDogKCkgPT4ge1xuICAgICAgICByZXR1cm4gISFjb29raWVzLmdldCgndG9rZW4nKVxuICAgIH0sXG4gICAgZGVsZXRlQXV0aDogKCkgPT4ge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGNvb2tpZXMucmVtb3ZlKCd0b2tlbicpKVxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgU1RPUkFHRSIsImltcG9ydCB7IEFQUEVORF9VU0VSX1BST0ZJTEVTIH0gZnJvbSAnLi4vLi4vY29uc3RhbnRzL3R5cGVzJztcblxuY29uc3QgZGVmYXVsdFN0YXRlID0ge1xuICAgIHByb2ZpbGVzOiB7fVxufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoc3RhdGUgPSBkZWZhdWx0U3RhdGUsIGFjdGlvbikge1xuXG4gICAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgICAgICBjYXNlIEFQUEVORF9VU0VSX1BST0ZJTEVTOiB7XG4gICAgICAgICAgICBsZXQgbmV3U3RhdGUgPSB7XG4gICAgICAgICAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgICAgICAgICAgcHJvZmlsZXMgOiB7IC4uLnN0YXRlLnByb2ZpbGVzIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbmV3U3RhdGUucHJvZmlsZXMgPSBhY3Rpb24ucGF5bG9hZC5yZWR1Y2UoKHByb2ZpbGVNYXAsIHByb2ZpbGUpID0+IHtcbiAgICAgICAgICAgICAgICBwcm9maWxlTWFwW3Byb2ZpbGUucHJvZmlsZUlkXSA9IHByb2ZpbGVcbiAgICAgICAgICAgICAgICByZXR1cm4gcHJvZmlsZU1hcFxuICAgICAgICAgICAgfSwgbmV3U3RhdGUucHJvZmlsZXMpXG5cbiAgICAgICAgICAgIHJldHVybiBuZXdTdGF0ZVxuICAgICAgICB9XG5cbiAgICB9XG4gICAgcmV0dXJuIHN0YXRlXG59IiwiaW1wb3J0IHsgQVBQRU5EX0xBQlMgfSBmcm9tICcuLi8uLi9jb25zdGFudHMvdHlwZXMnO1xuXG5jb25zdCBkZWZhdWx0U3RhdGUgPSB7XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHN0YXRlID0gZGVmYXVsdFN0YXRlLCBhY3Rpb24pIHtcblxuICAgIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICAgICAgY2FzZSBBUFBFTkRfTEFCUzoge1xuICAgICAgICAgICAgbGV0IG5ld1N0YXRlID0geyAuLi5zdGF0ZSB9XG5cbiAgICAgICAgICAgIHJldHVybiBhY3Rpb24ucGF5bG9hZC5yZWR1Y2UoKGxhcE1hcCwgbGFiKSA9PiB7XG4gICAgICAgICAgICAgICAgbGFwTWFwW2xhYi5sYWIuaWRdID0gbGFiXG4gICAgICAgICAgICAgICAgcmV0dXJuIGxhcE1hcFxuICAgICAgICAgICAgfSxuZXdTdGF0ZSlcblxuICAgICAgICB9XG5cbiAgICB9XG4gICAgcmV0dXJuIHN0YXRlXG59IiwiaW1wb3J0IHsgTEFCX1NFQVJDSF9TVEFSVCwgTEFCX1NFQVJDSCB9IGZyb20gJy4uLy4uL2NvbnN0YW50cy90eXBlcyc7XG5cbmNvbnN0IGRlZmF1bHRTdGF0ZSA9IHtcbiAgICBsYWJMaXN0OiBbXSxcbiAgICBMT0FERURfTEFCU19TRUFSQ0g6IGZhbHNlXG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChzdGF0ZSA9IGRlZmF1bHRTdGF0ZSwgYWN0aW9uKSB7XG5cbiAgICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG5cbiAgICAgICAgY2FzZSBMQUJfU0VBUkNIX1NUQVJUOiB7XG4gICAgICAgICAgICBsZXQgbmV3U3RhdGUgPSB7IC4uLnN0YXRlIH1cblxuICAgICAgICAgICAgbmV3U3RhdGUuTE9BREVEX0xBQlNfU0VBUkNIID0gZmFsc2VcblxuICAgICAgICAgICAgcmV0dXJuIG5ld1N0YXRlXG4gICAgICAgIH1cblxuICAgICAgICBjYXNlIExBQl9TRUFSQ0g6IHtcbiAgICAgICAgICAgIGxldCBuZXdTdGF0ZSA9IHsgLi4uc3RhdGUgfVxuXG4gICAgICAgICAgICBuZXdTdGF0ZS5sYWJMaXN0ID0gYWN0aW9uLnBheWxvYWQubWFwKGxhYiA9PiBsYWIubGFiLmlkKVxuICAgICAgICAgICAgbmV3U3RhdGUuTE9BREVEX0xBQlNfU0VBUkNIID0gdHJ1ZVxuXG4gICAgICAgICAgICByZXR1cm4gbmV3U3RhdGVcbiAgICAgICAgfVxuXG4gICAgfVxuICAgIFxuICAgIHJldHVybiBzdGF0ZVxufSIsImltcG9ydCB7IEFQUEVORF9GSUxURVJTX0RJQUdOT1NJUywgVE9HR0xFX0NPTkRJVElPTlMsIFRPR0dMRV9TUEVDSUFMSVRJRVMsIFNFTEVDVF9MT0NBVElPTl9ESUFHTk9TSVMsIE1FUkdFX1NFQVJDSF9TVEFURV9MQUIsIFRPR0dMRV9DUklURVJJQSwgVE9HR0xFX1RFU1RTLCBUT0dHTEVfRElBR05PU0lTX0NSSVRFUklBLCBMT0FEX1NFQVJDSF9DUklURVJJQV9MQUIgfSBmcm9tICcuLi8uLi9jb25zdGFudHMvdHlwZXMnO1xuXG5jb25zdCBkZWZhdWx0U3RhdGUgPSB7XG4gICAgTE9BREVEX1NFQVJDSF9DUklURVJJQV9MQUI6IGZhbHNlLFxuICAgIGNvbW1vbl90ZXN0czogW10sXG4gICAgY29tbW9uX2NvbmRpdGlvbnM6IFtdLFxuICAgIHByZWZlcnJlZF9sYWJzOiBbXSxcbiAgICBzZWxlY3RlZENyaXRlcmlhczogW10sXG4gICAgc2VsZWN0ZWRMb2NhdGlvbjogbnVsbCxcbiAgICBmaWx0ZXJDcml0ZXJpYToge1xuICAgICAgICBwcmljZVJhbmdlOiBbMTAwLCAxNTAwXSxcbiAgICAgICAgZGlzdGFuY2VSYW5nZTogWzEsIDM1XSxcbiAgICAgICAgc29ydEJ5OiBudWxsXG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoc3RhdGUgPSBkZWZhdWx0U3RhdGUsIGFjdGlvbikge1xuXG4gICAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgICAgICBjYXNlIExPQURfU0VBUkNIX0NSSVRFUklBX0xBQjoge1xuICAgICAgICAgICAgbGV0IG5ld1N0YXRlID0geyAuLi5zdGF0ZSB9XG4gICAgICAgICAgICBpZiAoYWN0aW9uLnBheWxvYWQpIHtcbiAgICAgICAgICAgICAgICBuZXdTdGF0ZSA9IHsgLi4ubmV3U3RhdGUsIC4uLmFjdGlvbi5wYXlsb2FkIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG5ld1N0YXRlLkxPQURFRF9TRUFSQ0hfQ1JJVEVSSUFfTEFCID0gdHJ1ZVxuICAgICAgICAgICAgcmV0dXJuIG5ld1N0YXRlXG4gICAgICAgIH1cblxuICAgICAgICBjYXNlIFRPR0dMRV9ESUFHTk9TSVNfQ1JJVEVSSUE6IHtcbiAgICAgICAgICAgIGxldCBuZXdTdGF0ZSA9IHtcbiAgICAgICAgICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgICAgICAgICBzZWxlY3RlZENyaXRlcmlhczogW10uY29uY2F0KHN0YXRlLnNlbGVjdGVkQ3JpdGVyaWFzKVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsZXQgZm91bmQgPSBmYWxzZVxuICAgICAgICAgICAgbmV3U3RhdGUuc2VsZWN0ZWRDcml0ZXJpYXMgPSBuZXdTdGF0ZS5zZWxlY3RlZENyaXRlcmlhcy5maWx0ZXIoKGN1cnIpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoY3Vyci5pZCA9PSBhY3Rpb24ucGF5bG9hZC5jcml0ZXJpYS5pZCAmJiBjdXJyLnR5cGUgPT0gYWN0aW9uLnBheWxvYWQudHlwZSkge1xuICAgICAgICAgICAgICAgICAgICBmb3VuZCA9IHRydWVcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICBpZiAoIWZvdW5kKSB7XG4gICAgICAgICAgICAgICAgbmV3U3RhdGUuc2VsZWN0ZWRDcml0ZXJpYXMucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIC4uLmFjdGlvbi5wYXlsb2FkLmNyaXRlcmlhLFxuICAgICAgICAgICAgICAgICAgICB0eXBlOiBhY3Rpb24ucGF5bG9hZC50eXBlXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIG5ld1N0YXRlXG4gICAgICAgIH1cblxuICAgICAgICBjYXNlIFNFTEVDVF9MT0NBVElPTl9ESUFHTk9TSVM6IHtcbiAgICAgICAgICAgIGxldCBuZXdTdGF0ZSA9IHsgLi4uc3RhdGUgfVxuXG4gICAgICAgICAgICBuZXdTdGF0ZS5zZWxlY3RlZExvY2F0aW9uID0gYWN0aW9uLnBheWxvYWRcbiAgICAgICAgICAgIHJldHVybiBuZXdTdGF0ZVxuICAgICAgICB9XG5cbiAgICAgICAgY2FzZSBNRVJHRV9TRUFSQ0hfU1RBVEVfTEFCOiB7XG4gICAgICAgICAgICBsZXQgbmV3U3RhdGUgPSB7IC4uLnN0YXRlLCAuLi5hY3Rpb24ucGF5bG9hZC5zZWFyY2hTdGF0ZSwgZmlsdGVyQ3JpdGVyaWEgOiBhY3Rpb24ucGF5bG9hZC5maWx0ZXJDcml0ZXJpYSB9XG5cbiAgICAgICAgICAgIHJldHVybiBuZXdTdGF0ZVxuICAgICAgICB9XG5cbiAgICB9XG4gICAgcmV0dXJuIHN0YXRlXG59XG5cblxuXG5cblxuIiwiaW1wb3J0IHtjb21iaW5lUmVkdWNlcnN9IGZyb20gJ3JlZHV4JztcblxuaW1wb3J0IFNFQVJDSF9DUklURVJJQV9PUEQgZnJvbSAnLi9vcGQvc2VhcmNoQ3JpdGVyaWEuanMnXG5pbXBvcnQgU0VBUkNIX0NSSVRFUklBX0xBQlMgZnJvbSAnLi9kaWFnbm9zaXMvc2VhcmNoQ3JpdGVyaWEuanMnXG5pbXBvcnQgRE9DVE9SUyBmcm9tICcuL29wZC9kb2N0b3JzLmpzJ1xuaW1wb3J0IERPQ1RPUl9TRUFSQ0ggZnJvbSAnLi9vcGQvZG9jdG9yU2VhcmNoLmpzJ1xuaW1wb3J0IExBQlMgZnJvbSAnLi9kaWFnbm9zaXMvbGFicy5qcydcbmltcG9ydCBMQUJfU0VBUkNIIGZyb20gJy4vZGlhZ25vc2lzL2xhYnNTZWFyY2guanMnXG5pbXBvcnQgVVNFUiBmcm9tICcuL2NvbW1vbnMvdXNlci5qcydcblxuY29uc3QgYWxsUmVkdWNlcnMgPSBjb21iaW5lUmVkdWNlcnMoe1xuICAgIFNFQVJDSF9DUklURVJJQV9PUEQsXG4gICAgU0VBUkNIX0NSSVRFUklBX0xBQlMsXG4gICAgRE9DVE9SUyxcbiAgICBET0NUT1JfU0VBUkNILFxuICAgIExBQlMsXG4gICAgTEFCX1NFQVJDSCxcbiAgICBVU0VSXG59KTtcblxuZXhwb3J0IGRlZmF1bHQgYWxsUmVkdWNlcnNcbiIsImltcG9ydCB7IERPQ1RPUl9TRUFSQ0ggfSBmcm9tICcuLi8uLi9jb25zdGFudHMvdHlwZXMnO1xuXG5jb25zdCBkZWZhdWx0U3RhdGUgPSB7XG4gICAgZG9jdG9yTGlzdDogW10sXG4gICAgTE9BRElORzogdHJ1ZSxcbiAgICBFUlJPUjogbnVsbFxufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoc3RhdGUgPSBkZWZhdWx0U3RhdGUsIGFjdGlvbikge1xuXG4gICAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgICAgICBjYXNlIERPQ1RPUl9TRUFSQ0g6IHtcbiAgICAgICAgICAgIGxldCBuZXdTdGF0ZSA9IHsgLi4uc3RhdGUgfVxuXG4gICAgICAgICAgICBuZXdTdGF0ZS5kb2N0b3JMaXN0ID0gYWN0aW9uLnBheWxvYWQubWFwKGRvYyA9PiBkb2MuaWQpXG4gICAgICAgICAgICBuZXdTdGF0ZS5MT0FESU5HID0gZmFsc2VcblxuICAgICAgICAgICAgcmV0dXJuIG5ld1N0YXRlXG4gICAgICAgIH1cblxuICAgIH1cbiAgICBcbiAgICByZXR1cm4gc3RhdGVcbn0iLCJpbXBvcnQgeyBBUFBFTkRfRE9DVE9SUyB9IGZyb20gJy4uLy4uL2NvbnN0YW50cy90eXBlcyc7XG5cbmNvbnN0IGRlZmF1bHRTdGF0ZSA9IHtcblxufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoc3RhdGUgPSBkZWZhdWx0U3RhdGUsIGFjdGlvbikge1xuXG4gICAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgICAgICBjYXNlIEFQUEVORF9ET0NUT1JTOiB7XG4gICAgICAgICAgICBsZXQgbmV3U3RhdGUgPSB7IC4uLnN0YXRlIH1cblxuICAgICAgICAgICAgcmV0dXJuIGFjdGlvbi5wYXlsb2FkLnJlZHVjZSgoZG9jdG9yTWFwLCBkb2N0b3IpID0+IHtcbiAgICAgICAgICAgICAgICBkb2N0b3JNYXBbZG9jdG9yLmlkXSA9IGRvY3RvclxuICAgICAgICAgICAgICAgIHJldHVybiBkb2N0b3JNYXBcbiAgICAgICAgICAgIH0sbmV3U3RhdGUpXG5cbiAgICAgICAgfVxuXG4gICAgfVxuICAgIHJldHVybiBzdGF0ZVxufSIsImltcG9ydCB7IFRPR0dMRV9DT05ESVRJT05TLCBUT0dHTEVfU1BFQ0lBTElUSUVTLCBTRUxFQ1RfTE9DQVRJT04sIE1FUkdFX1NFQVJDSF9TVEFURV9PUEQsIFRPR0dMRV9DUklURVJJQSwgVE9HR0xFX1RFU1RTLCBUT0dHTEVfRElBR05PU0lTX0NSSVRFUklBLCBTRVRfT1BEX0ZJTFRFUlMsIExPQURfU0VBUkNIX0NSSVRFUklBX09QRCB9IGZyb20gJy4uLy4uL2NvbnN0YW50cy90eXBlcyc7XG5cbmNvbnN0IGRlZmF1bHRTdGF0ZSA9IHtcbiAgICBjb21tb25seVNlYXJjaGVkQ29uZGl0aW9uczogW3sgaWQ6IDEsIG5hbWU6ICdIZWFkYWNoZScgfSwgeyBpZDogMiwgbmFtZTogJ1N0b21hY2gtYWNoZScgfSwgeyBpZDogMywgbmFtZTogJ0ZsdScgfSwgeyBpZDogNCwgbmFtZTogJ0hhaXIgRmFsbCcgfSwgeyBpZDogNSwgbmFtZTogJ0NoZXN0IFBhaW4nIH1dLFxuICAgIHNlbGVjdGVkQ29uZGl0aW9uczoge30sXG4gICAgY29tbW9ubHlTZWFyY2hlZFNwZWNpYWxpdGllczogW3sgaWQ6IDEsIG5hbWU6ICdHZW5lcmFsIFBoeXNpY2lhbCcgfSwgeyBpZDogMiwgbmFtZTogJ05ldXJvbG9neScgfSwgeyBpZDogMywgbmFtZTogJ0NhcmRpb2xvZ2lzdCcgfSwgeyBpZDogNCwgbmFtZTogJ09ydGhvcGFlZGljJyB9LCB7IGlkOiA1LCBuYW1lOiAnSW5mZXJ0aWxpdHknIH1dLFxuICAgIHNlbGVjdGVkU3BlY2lhbGl0aWVzOiB7fSxcbiAgICBzZWxlY3RlZENyaXRlcmlhOiB7fSxcbiAgICBzZWxlY3RlZExvY2F0aW9uOiBudWxsLFxuICAgIGZpbHRlckNyaXRlcmlhOiB7fSxcbiAgICBDUklURVJJQV9MT0FERUQ6IGZhbHNlXG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChzdGF0ZSA9IGRlZmF1bHRTdGF0ZSwgYWN0aW9uKSB7XG5cbiAgICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgICAgIGNhc2UgTE9BRF9TRUFSQ0hfQ1JJVEVSSUFfT1BEIDoge1xuICAgICAgICAgICAgbGV0IG5ld1N0YXRlID0gey4uLnN0YXRlfVxuXG4gICAgICAgICAgICBuZXdTdGF0ZS5DUklURVJJQV9MT0FERUQgPSB0cnVlXG4gICAgICAgICAgICBuZXdTdGF0ZS5maWx0ZXJDcml0ZXJpYSA9IHt9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHJldHVybiBuZXdTdGF0ZVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBjYXNlIFRPR0dMRV9DT05ESVRJT05TOiB7XG4gICAgICAgICAgICBsZXQgbmV3U3RhdGUgPSB7XG4gICAgICAgICAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRDb25kaXRpb25zIDoge1xuICAgICAgICAgICAgICAgICAgICAuLi5zdGF0ZS5zZWxlY3RlZENvbmRpdGlvbnNcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChuZXdTdGF0ZS5zZWxlY3RlZENvbmRpdGlvbnNbYWN0aW9uLnBheWxvYWQuaWRdKSB7XG4gICAgICAgICAgICAgICAgZGVsZXRlIG5ld1N0YXRlLnNlbGVjdGVkQ29uZGl0aW9uc1thY3Rpb24ucGF5bG9hZC5pZF1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbmV3U3RhdGUuc2VsZWN0ZWRDb25kaXRpb25zW2FjdGlvbi5wYXlsb2FkLmlkXSA9IG5ldyBEYXRlKClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBuZXdTdGF0ZVxuICAgICAgICB9XG5cbiAgICAgICAgY2FzZSBUT0dHTEVfU1BFQ0lBTElUSUVTOiB7XG4gICAgICAgICAgICBsZXQgbmV3U3RhdGUgPSB7XG4gICAgICAgICAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRTcGVjaWFsaXRpZXMgOiB7XG4gICAgICAgICAgICAgICAgICAgIC4uLnN0YXRlLnNlbGVjdGVkU3BlY2lhbGl0aWVzXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAobmV3U3RhdGUuc2VsZWN0ZWRTcGVjaWFsaXRpZXNbYWN0aW9uLnBheWxvYWQuaWRdKSB7XG4gICAgICAgICAgICAgICAgZGVsZXRlIG5ld1N0YXRlLnNlbGVjdGVkU3BlY2lhbGl0aWVzW2FjdGlvbi5wYXlsb2FkLmlkXVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBuZXdTdGF0ZS5zZWxlY3RlZFNwZWNpYWxpdGllc1thY3Rpb24ucGF5bG9hZC5pZF0gPSBuZXcgRGF0ZSgpXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBuZXdTdGF0ZVxuICAgICAgICB9XG5cbiAgICAgICAgY2FzZSBUT0dHTEVfQ1JJVEVSSUE6IHtcbiAgICAgICAgICAgIGxldCBuZXdTdGF0ZSA9IHtcbiAgICAgICAgICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgICAgICAgICBzZWxlY3RlZENyaXRlcmlhIDoge1xuICAgICAgICAgICAgICAgICAgICAuLi5zdGF0ZS5zZWxlY3RlZENyaXRlcmlhXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAobmV3U3RhdGUuc2VsZWN0ZWRDcml0ZXJpYVthY3Rpb24ucGF5bG9hZC5pZF0pIHtcbiAgICAgICAgICAgICAgICBkZWxldGUgbmV3U3RhdGUuc2VsZWN0ZWRDcml0ZXJpYVthY3Rpb24ucGF5bG9hZC5pZF1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgYWN0aW9uLnBheWxvYWQudHMgPSBuZXcgRGF0ZSgpXG4gICAgICAgICAgICAgICAgbmV3U3RhdGUuc2VsZWN0ZWRDcml0ZXJpYVthY3Rpb24ucGF5bG9hZC5pZF0gPSBhY3Rpb24ucGF5bG9hZFxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gbmV3U3RhdGVcbiAgICAgICAgfVxuXG4gICAgICAgIGNhc2UgU0VMRUNUX0xPQ0FUSU9OOiB7XG4gICAgICAgICAgICBsZXQgbmV3U3RhdGUgPSB7IC4uLnN0YXRlIH1cblxuICAgICAgICAgICAgbmV3U3RhdGUuc2VsZWN0ZWRMb2NhdGlvbiA9IGFjdGlvbi5wYXlsb2FkXG4gICAgICAgICAgICByZXR1cm4gbmV3U3RhdGVcbiAgICAgICAgfVxuXG4gICAgICAgIGNhc2UgU0VUX09QRF9GSUxURVJTOiB7XG4gICAgICAgICAgICBsZXQgbmV3U3RhdGUgPSB7IC4uLnN0YXRlIH1cblxuICAgICAgICAgICAgbmV3U3RhdGUuZmlsdGVyQ3JpdGVyaWEgPSBhY3Rpb24ucGF5bG9hZFxuICAgICAgICAgICAgcmV0dXJuIG5ld1N0YXRlXG4gICAgICAgIH1cblxuICAgICAgICBjYXNlIE1FUkdFX1NFQVJDSF9TVEFURV9PUEQ6IHtcbiAgICAgICAgICAgIGxldCBuZXdTdGF0ZSA9IHsgLi4uc3RhdGUgfVxuXG4gICAgICAgICAgICBuZXdTdGF0ZSA9IE9iamVjdC5hc3NpZ24obmV3U3RhdGUsIGFjdGlvbi5wYXlsb2FkKVxuICAgICAgICAgICAgbmV3U3RhdGUuQ1JJVEVSSUFfTE9BREVEID0gdHJ1ZVxuICAgICAgICAgICAgcmV0dXJuIG5ld1N0YXRlXG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHN0YXRlXG59XG5cblxuXG5cblxuIiwiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IEJyb3dzZXJSb3V0ZXIsIFN3aXRjaCwgUm91dGUgfSBmcm9tICdyZWFjdC1yb3V0ZXItZG9tJ1xuXG5pbXBvcnQgU2VhcmNoQ3JpdGVyaWEgZnJvbSAnLi9jb250YWluZXJzL29wZC9TZWFyY2hDcml0ZXJpYS5qcydcbmltcG9ydCBMb2NhdGlvblNlYXJjaCBmcm9tICcuL2NvbnRhaW5lcnMvb3BkL0xvY2F0aW9uU2VhcmNoLmpzJ1xuaW1wb3J0IFNlYXJjaFJlc3VsdHMgZnJvbSAnLi9jb250YWluZXJzL29wZC9TZWFyY2hSZXN1bHRzLmpzJ1xuaW1wb3J0IFNlYXJjaFJlc3VsdHNGaWx0ZXIgZnJvbSAnLi9jb250YWluZXJzL29wZC9TZWFyY2hSZXN1bHRzRmlsdGVyLmpzJ1xuaW1wb3J0IERvY3RvclByb2ZpbGUgZnJvbSAnLi9jb250YWluZXJzL29wZC9Eb2N0b3JQcm9maWxlLmpzJ1xuaW1wb3J0IENsaW5pY0xpc3QgZnJvbSAnLi9jb250YWluZXJzL29wZC9DbGluaWNMaXN0LmpzJ1xuaW1wb3J0IEFwcG9pbnRtZW50U2xvdCBmcm9tICcuL2NvbnRhaW5lcnMvb3BkL0FwcG9pbnRtZW50U2xvdC5qcydcbmltcG9ydCBQYXRpZW50RGV0YWlscyBmcm9tICcuL2NvbnRhaW5lcnMvb3BkL1BhdGllbnREZXRhaWxzLmpzJ1xuaW1wb3J0IFVzZXJQcm9maWxlIGZyb20gJy4vY29udGFpbmVycy9jb21tb25zL1VzZXJQcm9maWxlLmpzJ1xuaW1wb3J0IFVzZXJBcHBvaW50bWVudHMgZnJvbSAnLi9jb250YWluZXJzL2NvbW1vbnMvVXNlckFwcG9pbnRtZW50cy5qcydcbmltcG9ydCBVc2VyUmVwb3J0cyBmcm9tICcuL2NvbnRhaW5lcnMvY29tbW9ucy9Vc2VyUmVwb3J0cy5qcydcbmltcG9ydCBQYXltZW50IGZyb20gJy4vY29udGFpbmVycy9vcGQvUGF5bWVudC5qcydcbmltcG9ydCBCb29raW5nIGZyb20gJy4vY29udGFpbmVycy9vcGQvQm9va2luZy5qcydcbmltcG9ydCBDcml0ZXJpYVNlYXJjaCBmcm9tICcuL2NvbnRhaW5lcnMvb3BkL0NyaXRlcmlhU2VhcmNoLmpzJ1xuaW1wb3J0IERYX1NlYXJjaENyaXRlcmlhIGZyb20gJy4vY29udGFpbmVycy9kaWFnbm9zaXMvU2VhcmNoQ3JpdGVyaWEuanMnXG5pbXBvcnQgRFhfU2VhcmNoUmVzdWx0cyBmcm9tICcuL2NvbnRhaW5lcnMvZGlhZ25vc2lzL1NlYXJjaFJlc3VsdHMuanMnXG5pbXBvcnQgTGFiIGZyb20gJy4vY29udGFpbmVycy9kaWFnbm9zaXMvTGFiLmpzJ1xuaW1wb3J0IERYX1BhdGllbnREZXRhaWxzIGZyb20gJy4vY29udGFpbmVycy9kaWFnbm9zaXMvUGF0aWVudERldGFpbHMuanMnXG5pbXBvcnQgRFhfQm9va2luZ1N1bW1hcnkgZnJvbSAnLi9jb250YWluZXJzL2RpYWdub3Npcy9Cb29raW5nU3VtbWFyeS5qcydcbmltcG9ydCBEb2N0b3JDaGF0IGZyb20gJy4vY29udGFpbmVycy9jb21tb25zL0NoYXQuanMnXG5cblxuY29uc3Qgcm91dGVzID0gW1xuXG4gICAgeyBwYXRoOiAnLycsIGV4YWN0OnRydWUsIGNvbXBvbmVudDogU2VhcmNoQ3JpdGVyaWEgfSxcbiAgICB7IHBhdGg6ICcvbG9jYXRpb25zZWFyY2gnLCBleGFjdDp0cnVlLCBjb21wb25lbnQ6IExvY2F0aW9uU2VhcmNoIH0sXG4gICAgeyBwYXRoOiAnL2NyaXRlcmlhc2VhcmNoJywgZXhhY3Q6dHJ1ZSwgY29tcG9uZW50OiBDcml0ZXJpYVNlYXJjaCB9LFxuICAgIHsgcGF0aDogJy9zZWFyY2hyZXN1bHRzJywgZXhhY3Q6dHJ1ZSwgY29tcG9uZW50OiBTZWFyY2hSZXN1bHRzIH0sXG4gICAgeyBwYXRoOiAnL3NlYXJjaHJlc3VsdHMvZmlsdGVyJywgZXhhY3Q6dHJ1ZSwgY29tcG9uZW50OiBTZWFyY2hSZXN1bHRzRmlsdGVyIH0sXG4gICAgeyBwYXRoOiAnL2RvY3RvcnByb2ZpbGUvOmlkJywgZXhhY3Q6dHJ1ZSwgY29tcG9uZW50OiBEb2N0b3JQcm9maWxlIH0sXG4gICAgeyBwYXRoOiAnL2RvY3RvcnByb2ZpbGUvOmlkL2F2YWlsYWJpbGl0eScsIGV4YWN0OnRydWUsIGNvbXBvbmVudDogQ2xpbmljTGlzdCB9LFxuICAgIHsgcGF0aDogJy9kb2N0b3Jwcm9maWxlLzppZC86Y2xpbmljSWQvYm9vaycsIGV4YWN0OnRydWUsIGNvbXBvbmVudDogQXBwb2ludG1lbnRTbG90IH0sXG4gICAgeyBwYXRoOiAnL2RvY3RvcnByb2ZpbGUvOmlkLzpjbGluaWNJZC9ib29rZGV0YWlscycsIGV4YWN0OnRydWUsIGNvbXBvbmVudDogUGF0aWVudERldGFpbHMgfSxcbiAgICB7IHBhdGg6ICcvdXNlcicsIGV4YWN0OnRydWUsIGNvbXBvbmVudDogVXNlclByb2ZpbGUgfSxcbiAgICB7IHBhdGg6ICcvdXNlci86aWQnLCBleGFjdDp0cnVlLCBjb21wb25lbnQ6IFVzZXJQcm9maWxlIH0sXG4gICAgeyBwYXRoOiAnL3VzZXIvOmlkL2FwcG9pbnRtZW50cycsIGV4YWN0OnRydWUsIGNvbXBvbmVudDogVXNlckFwcG9pbnRtZW50cyB9LFxuICAgIHsgcGF0aDogJy91c2VyLzppZC9yZXBvcnRzJywgZXhhY3Q6dHJ1ZSwgY29tcG9uZW50OiBVc2VyUmVwb3J0cyB9LFxuICAgIHsgcGF0aDogJy9jaGF0JywgZXhhY3Q6dHJ1ZSwgY29tcG9uZW50OiBEb2N0b3JDaGF0IH0sXG4gICAgeyBwYXRoOiAnL3BheW1lbnQnLCBleGFjdDp0cnVlLCBjb21wb25lbnQ6IFBheW1lbnQgfSxcbiAgICB7IHBhdGg6ICcvYm9va2luZy86cmVmSWQnLCBleGFjdDp0cnVlLCBjb21wb25lbnQ6IEJvb2tpbmcgfSxcbiAgICB7IHBhdGg6ICcvZHgnLCBleGFjdDp0cnVlLCBjb21wb25lbnQ6IERYX1NlYXJjaENyaXRlcmlhIH0sXG4gICAgeyBwYXRoOiAnL2R4L3NlYXJjaHJlc3VsdHMnLCBleGFjdDp0cnVlLCBjb21wb25lbnQ6IERYX1NlYXJjaFJlc3VsdHMgfSxcbiAgICB7IHBhdGg6ICcvbGFiLzppZC9ib29rJywgZXhhY3Q6dHJ1ZSwgY29tcG9uZW50OiBMYWIgfSxcbiAgICB7IHBhdGg6ICcvbGFiLzppZC9ib29rZGV0YWlscycsIGV4YWN0OnRydWUsIGNvbXBvbmVudDogRFhfUGF0aWVudERldGFpbHMgfSxcbiAgICB7IHBhdGg6ICcvbGFiL2Jvb2tpbmcvc3VtbWFyeS86aWQnLCBleGFjdDp0cnVlLCBjb21wb25lbnQ6IERYX0Jvb2tpbmdTdW1tYXJ5IH0sXG5cbl1cblxuY2xhc3MgUm91dGVyQ29uZmlnIGV4dGVuZHMgQ29tcG9uZW50IHtcblxuICAgIHN0YXRpYyBST1VURVMgPSByb3V0ZXNcblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgPFN3aXRjaD5cbiAgICAgICAgICAgICAgICAgICAge3JvdXRlcy5tYXAoKHJvdXRlLGkpID0+IChcbiAgICAgICAgICAgICAgICAgICAgICAgIDxSb3V0ZSB7Li4ucm91dGV9IGtleT17aX0vPlxuICAgICAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgICA8L1N3aXRjaD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApXG4gICAgfVxuXG59XG5cblxuZXhwb3J0IGRlZmF1bHQgUm91dGVyQ29uZmlnXG5cbiIsIlxuY29uc3QgZGF5cyA9IFsnU3VuZGF5JywgJ01vbmRheScsICdUdWVzZGF5JywgJ1dlZG5lc2RheScsICdUaHVyc2RheScsICdGcmlkYXknLCAnU2F0dXJkYXknXTtcblxuZXhwb3J0IGNvbnN0IGdldFRpbWUgPSAodGltZVN0YW1wKSA9PiB7XG4gICAgdmFyIGRhdGUgPSBuZXcgRGF0ZSh0aW1lU3RhbXApO1xuICAgIHZhciBob3VycyA9IGRhdGUuZ2V0SG91cnMoKTtcbiAgICB2YXIgbWludXRlcyA9IFwiMFwiICsgZGF0ZS5nZXRNaW51dGVzKCk7XG4gICAgcmV0dXJuIGhvdXJzICsgJzonICsgbWludXRlcy5zdWJzdHIoLTIpXG59XG5leHBvcnQgY29uc3QgZ2V0RGF5TmFtZSA9ICh0aW1lU3RhbXApID0+IHtcbiAgICByZXR1cm4gZGF5c1tuZXcgRGF0ZSh0aW1lU3RhbXApLmdldERheSgpXVxuXG59IiwiY29uc3QgcGF0aCA9IHJlcXVpcmUoJ3BhdGgnKTtcbmNvbnN0IGh0dHAgPSByZXF1aXJlKCdodHRwJyk7XG5jb25zdCBFeHByZXNzID0gcmVxdWlyZSgnZXhwcmVzcycpO1xuY29uc3QgYXBwID0gbmV3IEV4cHJlc3MoKTtcbmNvbnN0IHNlcnZlciA9IG5ldyBodHRwLlNlcnZlcihhcHApO1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQgUmVhY3RET01TZXJ2ZXIgZnJvbSAncmVhY3QtZG9tL3NlcnZlcidcbmltcG9ydCB7IFN0YXRpY1JvdXRlciB9IGZyb20gJ3JlYWN0LXJvdXRlcidcbmltcG9ydCBSb3V0ZXMgZnJvbSAnLi9kZXYvanMvcm91dGVzLmpzJ1xuaW1wb3J0IHsgTXVpVGhlbWVQcm92aWRlciwgY3JlYXRlTXVpVGhlbWUsIGNyZWF0ZUdlbmVyYXRlQ2xhc3NOYW1lIH0gZnJvbSAnbWF0ZXJpYWwtdWkvc3R5bGVzJztcbmltcG9ydCB7IFNoZWV0c1JlZ2lzdHJ5IH0gZnJvbSAncmVhY3QtanNzL2xpYi9qc3MnO1xuXG5pbXBvcnQgSnNzUHJvdmlkZXIgZnJvbSAncmVhY3QtanNzL2xpYi9Kc3NQcm92aWRlcic7XG5pbXBvcnQgeyBQcm92aWRlciB9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCB7IGNyZWF0ZVN0b3JlLCBhcHBseU1pZGRsZXdhcmUgfSBmcm9tICdyZWR1eCc7XG5pbXBvcnQgdGh1bmsgZnJvbSAncmVkdXgtdGh1bmsnO1xuaW1wb3J0IHsgY3JlYXRlTG9nZ2VyIH0gZnJvbSAncmVkdXgtbG9nZ2VyJ1xuaW1wb3J0IGFsbFJlZHVjZXJzIGZyb20gJy4vZGV2L2pzL3JlZHVjZXJzL2luZGV4LmpzJztcbmltcG9ydCB7IG1hdGNoUGF0aCB9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nXG5cblxuYXBwLnVzZSgnL2Fzc2V0cycsIEV4cHJlc3Muc3RhdGljKHBhdGguam9pbihfX2Rpcm5hbWUsICdhc3NldHMnKSkpO1xuYXBwLnVzZSgnL2Rpc3QnLCBFeHByZXNzLnN0YXRpYyhwYXRoLmpvaW4oX19kaXJuYW1lLCAnZGlzdCcpKSk7XG5cbmFwcC51c2UoJy9hcGknLCBFeHByZXNzLnN0YXRpYyhwYXRoLmpvaW4oX19kaXJuYW1lLCAnZHVtbXlfYXBpJykpKTtcblxuXG5hcHAuZ2V0KCcqJywgZnVuY3Rpb24ocmVxLCByZXMpe1xuXG4gICAgY29uc3QgY29udGV4dCA9IHt9XG5cbiAgICBjb25zdCBzdG9yZSA9IGNyZWF0ZVN0b3JlKFxuICAgICAgICBhbGxSZWR1Y2Vyc1xuICAgICk7XG5cbiAgICBjb25zdCBzaGVldHNSZWdpc3RyeSA9IG5ldyBTaGVldHNSZWdpc3RyeSgpO1xuICAgIGNvbnN0IHRoZW1lID0gY3JlYXRlTXVpVGhlbWUoe1xuICAgICAgICBwYWxldHRlOiB7XG4gICAgICAgICAgICBwcmltYXJ5OiB7XG4gICAgICAgICAgICAgICAgbWFpbjogJyMwMGI3YjAnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2Vjb25kYXJ5OiB7XG4gICAgICAgICAgICAgICAgbWFpbjogJyMwMGI3YjAnXG4gICAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICBzdGF0dXM6IHtcbiAgICAgICAgICAgIGRhbmdlcjogJ29yYW5nZScsXG4gICAgICAgIH0sXG4gICAgfSlcbiAgICBjb25zdCBnZW5lcmF0ZUNsYXNzTmFtZSA9IGNyZWF0ZUdlbmVyYXRlQ2xhc3NOYW1lKCk7XG5cbiAgICBjb25zdCBodG1sID0gUmVhY3RET01TZXJ2ZXIucmVuZGVyVG9TdHJpbmcoXG4gICAgICAgIDxQcm92aWRlciBzdG9yZT17c3RvcmV9PlxuICAgICAgICAgICAgPEpzc1Byb3ZpZGVyIHJlZ2lzdHJ5PXtzaGVldHNSZWdpc3RyeX0gZ2VuZXJhdGVDbGFzc05hbWU9e2dlbmVyYXRlQ2xhc3NOYW1lfT5cbiAgICAgICAgICAgICAgICA8TXVpVGhlbWVQcm92aWRlciB0aGVtZT17dGhlbWV9PlxuICAgICAgICAgICAgICAgICAgICA8U3RhdGljUm91dGVyXG4gICAgICAgICAgICAgICAgICAgICAgICBsb2NhdGlvbj17cmVxLnVybH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQ9e2NvbnRleHR9XG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxSb3V0ZXMgLz5cbiAgICAgICAgICAgICAgICAgICAgPC9TdGF0aWNSb3V0ZXI+XG4gICAgICAgICAgICAgICAgPC9NdWlUaGVtZVByb3ZpZGVyPlxuICAgICAgICAgICAgPC9Kc3NQcm92aWRlcj5cbiAgICAgICAgPC9Qcm92aWRlcj5cbiAgICApXG5cbiAgICBjb25zdCBjc3MgPSBzaGVldHNSZWdpc3RyeS50b1N0cmluZygpXG5cblxuICAgIGlmIChjb250ZXh0LnVybCkge1xuICAgICAgICByZXMud3JpdGVIZWFkKDMwMSwge1xuICAgICAgICAgICAgTG9jYXRpb246IGNvbnRleHQudXJsXG4gICAgICAgIH0pXG4gICAgICAgIHJlcy5lbmQoKVxuICAgIH0gZWxzZSB7XG5cbiAgICAgICAgLy8gaW5zaWRlIGEgcmVxdWVzdFxuICAgICAgICBjb25zdCBwcm9taXNlcyA9IFtdXG4gICAgIFxuICAgICAgICBSb3V0ZXMuUk9VVEVTLnNvbWUocm91dGUgPT4ge1xuICAgICAgICAgICAgLy8gdXNlIGBtYXRjaFBhdGhgIGhlcmVcbiAgICAgICAgICAgIGNvbnN0IG1hdGNoID0gbWF0Y2hQYXRoKHJlcS5wYXRoLCByb3V0ZSlcbiAgICAgICAgICAgIGlmIChtYXRjaCAmJiByb3V0ZS5sb2FkRGF0YSlcbiAgICAgICAgICAgICAgICBwcm9taXNlcy5wdXNoKHJvdXRlLmxvYWREYXRhKCkpXG4gICAgICAgICAgICByZXR1cm4gbWF0Y2hcbiAgICAgICAgfSlcblxuICAgICAgICBQcm9taXNlLmFsbChwcm9taXNlcykudGhlbihkYXRhID0+IHtcbiAgICAgICAgICAgIHJlcy5yZW5kZXIoJy4vaW5kZXgudGVtcGxhdGUuZWpzJywge1xuICAgICAgICAgICAgICAgIGh0bWwsIGNzc1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfSlcblxuICAgIH1cblxufSk7XG5cblxuYXBwLnVzZShmdW5jdGlvbiAocmVxLCByZXMpIHtcbiAgICByZXMuc2VuZEZpbGUoJ2luZGV4Lmh0bWwnLCB7IHJvb3Q6ICcuL2Rpc3QvJyB9KVxufSlcblxuc2VydmVyLmxpc3RlbigzMDAwLCAoZXJyKSA9PiB7XG4gICAgaWYgKGVycikge1xuICAgICAgICByZXR1cm4gY29uc29sZS5lcnJvcihlcnIpO1xuICAgIH1cbiAgICBjb25zb2xlLmluZm8oJ1NlcnZlciBydW5uaW5nIG9uIGh0dHA6Ly9sb2NhbGhvc3Q6MzAwMCcpO1xufSk7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYXhpb3NcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZXhwcmVzc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJodHRwXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm1hdGVyaWFsLXVpLWljb25zL0FjY291bnRDaXJjbGVcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibWF0ZXJpYWwtdWktaWNvbnMvQXR0YWNoTW9uZXlcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibWF0ZXJpYWwtdWktaWNvbnMvQXZUaW1lclwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJtYXRlcmlhbC11aS1pY29ucy9DYWxsXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm1hdGVyaWFsLXVpLWljb25zL0V4cGFuZE1vcmVcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibWF0ZXJpYWwtdWktaWNvbnMvRmlsdGVyTGlzdFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJtYXRlcmlhbC11aS1pY29ucy9Ib21lXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm1hdGVyaWFsLXVpLWljb25zL0tleWJvYXJkQXJyb3dSaWdodFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJtYXRlcmlhbC11aS1pY29ucy9Mb2NhdGlvbk9uXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm1hdGVyaWFsLXVpLWljb25zL1BheW1lbnRcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibWF0ZXJpYWwtdWktaWNvbnMvU29ydFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJtYXRlcmlhbC11aS9DaGVja2JveFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJtYXRlcmlhbC11aS9DaGlwXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm1hdGVyaWFsLXVpL0V4cGFuc2lvblBhbmVsXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm1hdGVyaWFsLXVpL0Zvcm1cIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibWF0ZXJpYWwtdWkvTWVudVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJtYXRlcmlhbC11aS9SYWRpb1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJtYXRlcmlhbC11aS9TdGVwcGVyXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm1hdGVyaWFsLXVpL3N0eWxlc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJwYXRoXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJjLXNsaWRlci9saWIvUmFuZ2VcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhY3RcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhY3QtZG9tL3NlcnZlclwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdC1pbmZpbml0ZS1zY3JvbGxlclwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdC1qc3MvbGliL0pzc1Byb3ZpZGVyXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0LWpzcy9saWIvanNzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0LXJlZHV4XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0LXJvdXRlclwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdC1yb3V0ZXItZG9tXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlZHV4XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlZHV4LWxvZ2dlclwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWR1eC10aHVua1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ1bml2ZXJzYWwtY29va2llXCIpOyJdLCJzb3VyY2VSb290IjoiIn0=