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

const getLabs = exports.getLabs = (searchState = {}, filterState = {}, mergeState = false) => dispatch => {
	(0, _api.API_GET)('/labs_with_tests.json').then(function (response) {

		dispatch({
			type: _types.APPEND_LABS,
			payload: response.labs
		});

		dispatch({
			type: _types.LAB_SEARCH,
			payload: response.labs
		});

		if (mergeState) {
			dispatch({
				type: _types.MERGE_SEARCH_STATE_LAB,
				payload: searchState
			});
		}

		let searchStateParam = encodeURIComponent(JSON.stringify(searchState));
		let filterStateParam = encodeURIComponent(JSON.stringify(filterState));
		history.replaceState(null, 'hello', `/dx/searchresults?search=${searchStateParam}&filter=${filterStateParam}`);
	}).catch(function (error) {});
};

const getLabById = exports.getLabById = (labId, testIds) => dispatch => {
	// this API should return detailed lab
	(0, _api.API_GET)('/labs_with_tests.json').then(function (response) {
		// mocking API , TODO : remove
		response.lab = response.labs.filter(lab => lab.id == labId)[0];

		dispatch({
			type: _types.APPEND_LABS,
			payload: [response.lab]
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
exports.getDiagnosisCriteriaResults = exports.toggleDiagnosisCriteria = exports.toggleTest = exports.loadLabSearchCriteria = undefined;

var _types = __webpack_require__(/*! ../../constants/types */ "./dev/js/constants/types.js");

var _api = __webpack_require__(/*! ../../api/api.js */ "./dev/js/api/api.js");

const loadLabSearchCriteria = exports.loadLabSearchCriteria = () => dispatch => {
    dispatch({
        type: _types.LOAD_SEARCH_CRITERIA_LAB,
        payload: null
    });
};

const toggleTest = exports.toggleTest = id => dispatch => {
    dispatch({
        type: _types.TOGGLE_TESTS,
        payload: {
            id
        }
    });
};

const toggleDiagnosisCriteria = exports.toggleDiagnosisCriteria = criteria => dispatch => {
    dispatch({
        type: _types.TOGGLE_DIAGNOSIS_CRITERIA,
        payload: criteria
    });
};

const getDiagnosisCriteriaResults = exports.getDiagnosisCriteriaResults = (searchString, callback) => dispatch => {
    (0, _api.API_GET)('/generic_search_tests.json').then(function (response) {
        callback(response);
    }).catch(function (error) {});
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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let axiosInstance = _axios2.default.create({
    baseURL: '/api/',
    header: {}
});

const API_GET = exports.API_GET = url => {
    return new Promise((resolve, reject) => {
        axiosInstance.get(url).then(res => {
            resolve(res.data);
        }, rej => {
            reject();
        });
    });
};
const API_POST = exports.API_POST = (url, data) => {
    return new Promise((resolve, reject) => {
        axiosInstance.post(url, data).then(res => {
            resolve(res.data);
        }, reject);
    });
};
const API_PUT = exports.API_PUT = (url, data) => {
    return new Promise((resolve, reject) => {
        axiosInstance.put(url, data).then(res => {
            resolve(res.data);
        }, reject);
    });
};
const API_DELETE = exports.API_DELETE = url => {
    return new Promise((resolve, reject) => {
        axiosInstance.delete(url).then(res => {
            resolve(res.data);
        }, reject);
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

/***/ "./dev/js/components/commons/locationSelector/LocationSelector.js":
/*!************************************************************************!*\
  !*** ./dev/js/components/commons/locationSelector/LocationSelector.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(/*! react */ "react");

var _react2 = _interopRequireDefault(_react);

var _LocationSearching = __webpack_require__(/*! material-ui-icons/LocationSearching */ "material-ui-icons/LocationSearching");

var _LocationSearching2 = _interopRequireDefault(_LocationSearching);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class LocationSelector extends _react2.default.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    getCurrentLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                debugger;
                // let geocoder = new google.maps.Geocoder()
                // let latlng = new google.maps.LatLng(-33.8665433, 151.1956316)
                // geocoder.geocode({
                //     'latLng': latlng
                // }, function (results, status) {
                //     debugger
                // })
            });
        }
    }

    render() {
        let address = 'Select Location';
        if (this.props.selectedLocation && this.props.selectedLocation.formatted_address) {
            address = this.props.selectedLocation.formatted_address;
        }

        return _react2.default.createElement(
            'div',
            { className: 'locationSelector' },
            _react2.default.createElement('input', { onClick: () => {
                    this.context.router.history.push('/locationsearch');
                }, placeholder: address }),
            _react2.default.createElement(_LocationSearching2.default, { className: 'currentLocation', onClick: this.getCurrentLocation.bind(this) })
        );
    }
}

LocationSelector.contextTypes = {
    router: () => null
};
exports.default = LocationSelector;

/***/ }),

/***/ "./dev/js/components/commons/locationSelector/index.js":
/*!*************************************************************!*\
  !*** ./dev/js/components/commons/locationSelector/index.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _LocationSelector = __webpack_require__(/*! ./LocationSelector.js */ "./dev/js/components/commons/locationSelector/LocationSelector.js");

var _LocationSelector2 = _interopRequireDefault(_LocationSelector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _LocationSelector2.default;

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
            let selected = !!this.props.selected[row.id];
            return _react2.default.createElement(
                'span',
                {
                    className: selected ? "testRow selected" : "testRow",
                    key: row.id,
                    onClick: () => {
                        return this.props.toggleRow(row.id);
                    }
                },
                _react2.default.createElement(
                    'p',
                    { className: 'head' },
                    row.name
                ),
                _react2.default.createElement(
                    'p',
                    { className: 'sub' },
                    row.name
                )
            );
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
                { className: 'rows' },
                rows
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

/***/ "./dev/js/components/diagnosis/commons/criteriaSelector/CriteriaSelector.js":
/*!**********************************************************************************!*\
  !*** ./dev/js/components/diagnosis/commons/criteriaSelector/CriteriaSelector.js ***!
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

class CriteriaSelector extends _react2.default.Component {
    constructor(props) {
        super(props);
    }

    handleDelete(id, handler) {
        if (handler == 'toggleDiagnosisCriteria') {
            this.props[handler]({ id });
        } else {
            this.props[handler](id);
        }
    }

    render() {

        let locationPill = "";
        let pills = [];
        let tests = [];
        let criterias = [];

        if (this.props.commonlySearchedTests) {
            tests = this.props.commonlySearchedTests.filter(pill => {
                return this.props.selectedTests[pill.id];
            }).map(pill => {
                pill.ts = this.props.selectedTests[pill.id];
                pill.type = 'toggleTest';
                return pill;
            });
        }

        if (this.props.selectedDiagnosisCriteria) {
            criterias = Object.keys(this.props.selectedDiagnosisCriteria).map(criteria => {
                let pill = this.props.selectedDiagnosisCriteria[criteria];
                pill.type = 'toggleDiagnosisCriteria';
                return pill;
            });
        }

        if (this.props.selectedLocation) {
            locationPill = _react2.default.createElement(_Chip2.default, {
                label: this.props.selectedLocation.name,
                className: "pillselected location"
            });
        }

        pills = [...tests, ...criterias];
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
                    this.context.router.history.push('/dx/criteriasearch');
                }, placeholder: this.props.heading || "Search for tests, labs, packages ..etc" }),
            locationPill,
            pills
        );
    }
}

CriteriaSelector.contextTypes = {
    router: () => null
};
exports.default = CriteriaSelector;

/***/ }),

/***/ "./dev/js/components/diagnosis/commons/criteriaSelector/index.js":
/*!***********************************************************************!*\
  !*** ./dev/js/components/diagnosis/commons/criteriaSelector/index.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _CriteriaSelector = __webpack_require__(/*! ./CriteriaSelector.js */ "./dev/js/components/diagnosis/commons/criteriaSelector/CriteriaSelector.js");

var _CriteriaSelector2 = _interopRequireDefault(_CriteriaSelector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _CriteriaSelector2.default;

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

var _index = __webpack_require__(/*! ../labProfileCard/index.js */ "./dev/js/components/diagnosis/commons/labProfileCard/index.js");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class LabDetails extends _react2.default.Component {

    constructor(props) {
        super(props);
    }

    render() {

        return _react2.default.createElement(_index2.default, {
            details: this.props.data,
            hideBottom: true,
            hideBookNow: true
        });
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

var _AccountCircle = __webpack_require__(/*! material-ui-icons/AccountCircle */ "material-ui-icons/AccountCircle");

var _AccountCircle2 = _interopRequireDefault(_AccountCircle);

var _Home = __webpack_require__(/*! material-ui-icons/Home */ "material-ui-icons/Home");

var _Home2 = _interopRequireDefault(_Home);

var _AvTimer = __webpack_require__(/*! material-ui-icons/AvTimer */ "material-ui-icons/AvTimer");

var _AvTimer2 = _interopRequireDefault(_AvTimer);

var _LocationOn = __webpack_require__(/*! material-ui-icons/LocationOn */ "material-ui-icons/LocationOn");

var _LocationOn2 = _interopRequireDefault(_LocationOn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class LabProfileCard extends _react2.default.Component {
    constructor(props) {
        super(props);
    }

    generateTestsString(tests) {
        return tests.reduce((str, test, i) => {
            if (test.isAvailable) {
                str += test.id;
                if (i + 1 < tests.length) str += ",";
            }
            return str;
        }, "");
    }

    cardClick(id, e) {
        let { tests } = this.props.details;
        let testsStr = this.generateTestsString(tests);
        this.context.router.history.push(`/lab/${id}/book?tests=${testsStr}`);
    }

    bookNow(id, e) {
        e.stopPropagation();
        let { tests } = this.props.details;
        let testsStr = this.generateTestsString(tests);
        this.context.router.history.push(`/lab/${id}/book?tests=${testsStr}`);
    }

    getTime(unix_timestamp) {
        var date = new Date(unix_timestamp * 1000);
        var hours = date.getHours();
        var minutes = "0" + date.getMinutes();
        return hours + ':' + minutes.substr(-2);
    }

    getAvailability(nextAvailable) {
        if (nextAvailable[0]) {
            let date = new Date(nextAvailable[0].from).toDateString();
            let timeStart = this.getTime(nextAvailable[0].from);
            let timeEnd = this.getTime(nextAvailable[0].to);
            return {
                date, timeStart, timeEnd
            };
        }

        return { date: '', timeStart: '', timeEnd: '' };
    }

    render() {

        let { id, name, profile_img, nextAvailable, address, price_breakup } = this.props.details;

        let timeAvailable = this.getAvailability(nextAvailable);

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
                    )
                ),
                !!this.props.hideBookNow ? '' : _react2.default.createElement(
                    'div',
                    { className: 'subOptionsInteract' },
                    _react2.default.createElement(
                        'button',
                        { className: 'bookNow', onClick: this.bookNow.bind(this, id) },
                        'Book Rs. ',
                        price_breakup.amount
                    )
                )
            ),
            !!this.props.hideBottom ? '' : _react2.default.createElement(
                'div',
                { className: 'bottomOptions' },
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
                        address
                    )
                )
            )
        );
    }
}

LabProfileCard.contextTypes = {
    router: () => null
};
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
        this.props.getDiagnosisCriteriaResults(this.state.searchValue, searchResults => {
            this.setState({ searchResults: searchResults.result });
        });
    }

    addCriteria(criteria, type) {
        criteria.type = type;
        this.props.toggleDiagnosisCriteria(criteria);
        this.context.router.history.goBack();
    }

    render() {

        return _react2.default.createElement(
            'div',
            { className: 'locationSearch' },
            _react2.default.createElement(
                'div',
                { className: 'locationSearchBox' },
                _react2.default.createElement('input', { className: 'topSearch', id: 'topCriteriaSearch', onChange: this.inputHandler.bind(this), value: this.state.searchValue, placeholder: 'Search for tests, labs, packages ..etc' }),
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
                                _react2.default.createElement(
                                    'p',
                                    { className: 'head' },
                                    resultData.name
                                ),
                                _react2.default.createElement(
                                    'p',
                                    { className: 'sub' },
                                    resultData.sub_name || resultData.address
                                )
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

/***/ "./dev/js/components/diagnosis/labSlots/LabSlotsView.js":
/*!**************************************************************!*\
  !*** ./dev/js/components/diagnosis/labSlots/LabSlotsView.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(/*! react */ "react");

var _react2 = _interopRequireDefault(_react);

var _index = __webpack_require__(/*! ../commons/labDetails/index.js */ "./dev/js/components/diagnosis/commons/labDetails/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = __webpack_require__(/*! ../commons/orderDetails/index.js */ "./dev/js/components/diagnosis/commons/orderDetails/index.js");

var _index4 = _interopRequireDefault(_index3);

var _index5 = __webpack_require__(/*! ../../commons/timeSlotSelector/index.js */ "./dev/js/components/commons/timeSlotSelector/index.js");

var _index6 = _interopRequireDefault(_index5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class LabSlotsView extends _react2.default.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedLab: null,
            selectedTests: "",
            timeSlots: null,
            selectedSlot: null,
            selectedTests: ""
        };
    }
    getLocationParam(tag) {
        // this API assumes the context of react-router-4
        const paramString = this.props.location.search;
        const params = new URLSearchParams(paramString);
        return params.get(tag);
    }

    proceed() {
        if (this.state.selectedLab) {
            this.context.router.history.push(`/lab/${this.state.selectedLab}/bookdetails?tests=${this.state.selectedTests}&t_start=${this.state.selectedSlot.start}&t_end=${this.state.selectedSlot.end}`);
        }
    }

    selectTimeSlot(slot) {
        this.setState({ selectedSlot: slot });
    }

    componentDidMount() {
        let labId = this.props.match.params.id;
        let tests = this.getLocationParam('tests');
        if (labId) {
            this.setState({ selectedLab: labId, selectedTests: tests });
            this.props.getLabById(labId);

            this.props.getLabTimeSlots(labId, tests, timeSlots => {
                this.setState({ timeSlots });
            });
        }
    }

    render() {

        return _react2.default.createElement(
            'div',
            { className: 'appointmentSlot' },
            this.props.LABS[this.state.selectedLab] ? _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(_index2.default, { data: this.props.LABS[this.state.selectedLab] }),
                _react2.default.createElement(_index4.default, { data: this.props.LABS[this.state.selectedLab] }),
                this.state.timeSlots ? _react2.default.createElement(_index6.default, {
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

LabSlotsView.contextTypes = {
    router: () => null
};
exports.default = LabSlotsView;

/***/ }),

/***/ "./dev/js/components/diagnosis/labSlots/index.js":
/*!*******************************************************!*\
  !*** ./dev/js/components/diagnosis/labSlots/index.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _LabSlotsView = __webpack_require__(/*! ./LabSlotsView.js */ "./dev/js/components/diagnosis/labSlots/LabSlotsView.js");

var _LabSlotsView2 = _interopRequireDefault(_LabSlotsView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _LabSlotsView2.default;

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

var _index = __webpack_require__(/*! ../../commons/locationSelector/index.js */ "./dev/js/components/commons/locationSelector/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = __webpack_require__(/*! ../commons/criteriaSelector/index.js */ "./dev/js/components/diagnosis/commons/criteriaSelector/index.js");

var _index4 = _interopRequireDefault(_index3);

var _index5 = __webpack_require__(/*! ../commons/commonlySearched/index.js */ "./dev/js/components/diagnosis/commons/commonlySearched/index.js");

var _index6 = _interopRequireDefault(_index5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class SearchCriteriaView extends _react2.default.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.loadLabSearchCriteria();
    }

    searchProceed() {
        // let searchData = {
        //     selectedTests : this.props.selectedTests,
        //     selectedLocation : this.props.selectedLocation,
        //     selectedDiagnosisCriteria : this.props.selectedDiagnosisCriteria
        // }
        // searchData = encodeURIComponent(JSON.stringify(searchData))
        // this.context.router.history.push(`/dx/searchresults?search=${searchData}`)
        this.context.router.history.push(`/dx/searchresults`);
    }

    render() {

        return _react2.default.createElement(
            'div',
            { className: 'searchCriteria' },
            _react2.default.createElement(_index2.default, {
                selectedLocation: this.props.selectedLocation
            }),
            _react2.default.createElement(_index4.default, {
                commonlySearchedTests: this.props.commonlySearchedTests,
                selectedTests: this.props.selectedTests,
                toggleTest: this.props.toggleTest.bind(this),
                selectedDiagnosisCriteria: this.props.selectedDiagnosisCriteria,
                toggleDiagnosisCriteria: this.props.toggleDiagnosisCriteria.bind(this)
            }),
            _react2.default.createElement(_index6.default, {
                heading: 'Commonly searched tests',
                data: this.props.commonlySearchedTests,
                selected: this.props.selectedTests,
                toggleRow: this.props.toggleTest.bind(this)
            }),
            _react2.default.createElement(
                'button',
                { onClick: this.searchProceed.bind(this), className: 'proceedBtn' },
                ' Proceed '
            )
        );
    }
}

SearchCriteriaView.contextTypes = {
    router: () => null
};
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

var _react = __webpack_require__(/*! react */ "react");

var _react2 = _interopRequireDefault(_react);

var _index = __webpack_require__(/*! ../searchResults/labsList/index.js */ "./dev/js/components/diagnosis/searchResults/labsList/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = __webpack_require__(/*! ../searchResults/topBar/index.js */ "./dev/js/components/diagnosis/searchResults/topBar/index.js");

var _index4 = _interopRequireDefault(_index3);

var _index5 = __webpack_require__(/*! ../commons/criteriaSelector/index.js */ "./dev/js/components/diagnosis/commons/criteriaSelector/index.js");

var _index6 = _interopRequireDefault(_index5);

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
            selectedTests,
            selectedLocation,
            selectedDiagnosisCriteria,
            CRITERIA_LOADED
        } = this.props;

        if (CRITERIA_LOADED) {
            let searchState = {
                selectedTests,
                selectedLocation,
                selectedDiagnosisCriteria
            };
            let filterState = this.props.filterCriteria;
            this.getLabList(searchState, filterState, false);
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
                this.getLabList(searchState, filterState, true);
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

    getLabList(searchState, filterState, mergeState) {
        this.props.getLabs(searchState, filterState, mergeState);
    }

    updateLabs(fn) {
        return (...args) => {
            fn(...args);
            setTimeout(this.getLabs.bind(this), 0);
        };
    }

    render() {

        return _react2.default.createElement(
            'div',
            { className: 'searchResults' },
            this.props.LOADING ? "" : _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(_index6.default, {
                    heading: "Add More test",
                    selectedLocation: this.props.selectedLocation,
                    commonlySearchedTests: this.props.commonlySearchedTests,
                    selectedTests: this.props.selectedTests,
                    toggleTest: this.updateLabs.call(this, this.props.toggleTest.bind(this)),
                    selectedDiagnosisCriteria: this.props.selectedDiagnosisCriteria,
                    toggleDiagnosisCriteria: this.updateLabs.call(this, this.props.toggleDiagnosisCriteria.bind(this))
                }),
                _react2.default.createElement(_index4.default, null),
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
            'div',
            { className: 'doctorsList' },
            labList.map((labId, i) => {
                return _react2.default.createElement(_index2.default, { details: LABS[labId], key: i });
            })
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
            _react2.default.createElement(_FilterList2.default, { className: 'iconsortfilter', onClick: () => {} })
        );
    }
}

TopBar.contextTypes = {
    router: () => null
};
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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class LocationSearch extends _react2.default.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

        let input = document.getElementById('topLocationSearch');
        let options = {
            types: ['establishment']
        };
        let autocomplete = new google.maps.places.Autocomplete(input, options);

        google.maps.event.addListener(autocomplete, 'place_changed', function () {
            let place = autocomplete.getPlace();
            this.props.selectLocation(place);
            this.context.router.history.goBack();
        }.bind(this));

        input.focus();
    }

    render() {

        return _react2.default.createElement(
            'div',
            { className: 'locationSearch' },
            _react2.default.createElement(
                'div',
                { className: 'locationSearchBox' },
                _react2.default.createElement('input', { className: 'topSearch', id: 'topLocationSearch' })
            )
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

var _index3 = __webpack_require__(/*! ../../commons/locationSelector/index.js */ "./dev/js/components/commons/locationSelector/index.js");

var _index4 = _interopRequireDefault(_index3);

var _index5 = __webpack_require__(/*! ../commons/criteriaSelector/index.js */ "./dev/js/components/opd/commons/criteriaSelector/index.js");

var _index6 = _interopRequireDefault(_index5);

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
            _react2.default.createElement(_index4.default, {
                selectedLocation: this.props.selectedLocation
            }),
            _react2.default.createElement(_index6.default, {
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

/***/ "./dev/js/components/opd/topBar/TopBar.js":
/*!************************************************!*\
  !*** ./dev/js/components/opd/topBar/TopBar.js ***!
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

var _AppBar = __webpack_require__(/*! material-ui/AppBar */ "material-ui/AppBar");

var _AppBar2 = _interopRequireDefault(_AppBar);

var _Toolbar = __webpack_require__(/*! material-ui/Toolbar */ "material-ui/Toolbar");

var _Toolbar2 = _interopRequireDefault(_Toolbar);

var _ArrowBack = __webpack_require__(/*! material-ui-icons/ArrowBack */ "material-ui-icons/ArrowBack");

var _ArrowBack2 = _interopRequireDefault(_ArrowBack);

var _styles = __webpack_require__(/*! material-ui/styles */ "material-ui/styles");

__webpack_require__(/*! ../../../actions/index.js */ "./dev/js/actions/index.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class TopBar extends _react2.default.Component {

    constructor(props) {
        super(props);
    }

    goBack() {
        window.history.go(-1);
    }

    render() {

        return _react2.default.createElement(
            _AppBar2.default,
            { position: 'static', color: 'default' },
            _react2.default.createElement(
                _Toolbar2.default,
                null,
                _react2.default.createElement(_ArrowBack2.default, { onClick: this.goBack.bind(this) })
            )
        );
    }
}

exports.default = (0, _styles.withStyles)()(TopBar);

/***/ }),

/***/ "./dev/js/components/opd/topBar/index.js":
/*!***********************************************!*\
  !*** ./dev/js/components/opd/topBar/index.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _TopBar = __webpack_require__(/*! ./TopBar.js */ "./dev/js/components/opd/topBar/TopBar.js");

var _TopBar2 = _interopRequireDefault(_TopBar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _TopBar2.default;

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

/***/ "./dev/js/containers/diagnosis/CriteriaSearch.js":
/*!*******************************************************!*\
  !*** ./dev/js/containers/diagnosis/CriteriaSearch.js ***!
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

var _index2 = __webpack_require__(/*! ../../components/diagnosis/criteriaSearch/index.js */ "./dev/js/components/diagnosis/criteriaSearch/index.js");

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
        getDiagnosisCriteriaResults: (searchString, cb) => dispatch((0, _index.getDiagnosisCriteriaResults)(searchString, cb)),
        toggleDiagnosisCriteria: criteria => dispatch((0, _index.toggleDiagnosisCriteria)(criteria))
    };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(CriteriaSearch);

/***/ }),

/***/ "./dev/js/containers/diagnosis/LabSlots.js":
/*!*************************************************!*\
  !*** ./dev/js/containers/diagnosis/LabSlots.js ***!
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

var _index2 = __webpack_require__(/*! ../../components/diagnosis/labSlots/index.js */ "./dev/js/components/diagnosis/labSlots/index.js");

var _index3 = _interopRequireDefault(_index2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class LabSlots extends _react2.default.Component {
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
        getLabById: (labId, testIds) => dispatch((0, _index.getLabById)(labId, testIds)),
        getLabTimeSlots: (labId, testIds, callback) => dispatch((0, _index.getLabTimeSlots)(labId, testIds, callback))
    };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(LabSlots);

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

    render() {

        return _react2.default.createElement(_index3.default, this.props);
    }
}

SearchCriteria.contextTypes = {
    router: () => null
};
const mapStateToProps = state => {

    const {
        commonlySearchedTests,
        selectedTests,
        selectedLocation,
        selectedDiagnosisCriteria
    } = state.SEARCH_CRITERIA_LABS;

    return {
        commonlySearchedTests,
        selectedTests,
        selectedLocation,
        selectedDiagnosisCriteria
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadLabSearchCriteria: () => dispatch((0, _index.loadLabSearchCriteria)()),
        toggleTest: id => dispatch((0, _index.toggleTest)(id)),
        toggleDiagnosisCriteria: criteria => dispatch((0, _index.toggleDiagnosisCriteria)(criteria))
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

const mapStateToProps = state => {
    const {
        commonlySearchedTests,
        selectedTests,
        selectedLocation,
        selectedDiagnosisCriteria,
        filterCriteria,
        CRITERIA_LOADED
    } = state.SEARCH_CRITERIA_LABS;
    let LABS = state.LABS;
    let { labList, LOADING, ERROR } = state.LAB_SEARCH;

    return {
        LABS, labList, LOADING, ERROR,
        commonlySearchedTests,
        selectedTests,
        selectedLocation,
        selectedDiagnosisCriteria,
        filterCriteria,
        CRITERIA_LOADED
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getLabs: (searchState, filterState, mergeState) => dispatch((0, _index.getLabs)(searchState, filterState, mergeState)),
        toggleTest: id => dispatch((0, _index.toggleTest)(id)),
        toggleDiagnosisCriteria: criteria => dispatch((0, _index.toggleDiagnosisCriteria)(criteria))
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

        return _react2.default.createElement(_index3.default, {
            selectedLocation: this.props.selectedLocation,
            selectLocation: this.props.selectLocation.bind(this)
        });
    }
}

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

/***/ "./dev/js/containers/opd/TopBar.js":
/*!*****************************************!*\
  !*** ./dev/js/containers/opd/TopBar.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(/*! react */ "react");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(/*! react-redux */ "react-redux");

var _index = __webpack_require__(/*! ../../components/opd/topBar/index.js */ "./dev/js/components/opd/topBar/index.js");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class TopBar extends _react2.default.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentWillMount() {}

    render() {

        return _react2.default.createElement(_index2.default, null);
    }
}

const mapStateToProps = state => {

    return {};
};

const mapDispatchToProps = dispatch => {
    return {};
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(TopBar);

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
                    lapMap[lab.id] = lab;
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
        case _types.LAB_SEARCH:
            {
                let newState = _extends({}, state);

                newState.labList = action.payload.map(lab => lab.id);
                newState.LOADING = false;

                return newState;
            }

    }

    return state;
};

var _types = __webpack_require__(/*! ../../constants/types */ "./dev/js/constants/types.js");

const defaultState = {
    labList: [],
    LOADING: true,
    ERROR: null
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

                newState.CRITERIA_LOADED = true;
                newState.filterCriteria = {};

                return newState;
            }

        case _types.TOGGLE_TESTS:
            {
                let newState = _extends({}, state, {
                    selectedTests: _extends({}, state.selectedTests)
                });

                if (newState.selectedTests[action.payload.id]) {
                    delete newState.selectedTests[action.payload.id];
                } else {
                    newState.selectedTests[action.payload.id] = new Date();
                }

                return newState;
            }

        case _types.TOGGLE_DIAGNOSIS_CRITERIA:
            {
                let newState = _extends({}, state, {
                    selectedDiagnosisCriteria: _extends({}, state.selectedDiagnosisCriteria)
                });

                if (newState.selectedDiagnosisCriteria[action.payload.id]) {
                    delete newState.selectedDiagnosisCriteria[action.payload.id];
                } else {
                    action.payload.ts = new Date();
                    newState.selectedDiagnosisCriteria[action.payload.id] = action.payload;
                }

                return newState;
            }

        case _types.SELECT_LOCATION:
            {
                let newState = _extends({}, state);

                newState.selectedLocation = action.payload;
                return newState;
            }

        case _types.MERGE_SEARCH_STATE_LAB:
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
    commonlySearchedTests: [{ id: 1, name: 'General Physicial' }, { id: 2, name: 'Neurology' }, { id: 3, name: 'Cardiologist' }, { id: 4, name: 'Orthopaedic' }, { id: 5, name: 'Infertility' }],
    selectedTests: {},
    selectedDiagnosisCriteria: {},
    selectedLocation: null,
    filterCriteria: {},
    CRITERIA_LOADED: false
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

var _TopBar = __webpack_require__(/*! ./containers/opd/TopBar.js */ "./dev/js/containers/opd/TopBar.js");

var _TopBar2 = _interopRequireDefault(_TopBar);

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

var _CriteriaSearch3 = __webpack_require__(/*! ./containers/diagnosis/CriteriaSearch.js */ "./dev/js/containers/diagnosis/CriteriaSearch.js");

var _CriteriaSearch4 = _interopRequireDefault(_CriteriaSearch3);

var _SearchResults3 = __webpack_require__(/*! ./containers/diagnosis/SearchResults.js */ "./dev/js/containers/diagnosis/SearchResults.js");

var _SearchResults4 = _interopRequireDefault(_SearchResults3);

var _LabSlots = __webpack_require__(/*! ./containers/diagnosis/LabSlots.js */ "./dev/js/containers/diagnosis/LabSlots.js");

var _LabSlots2 = _interopRequireDefault(_LabSlots);

var _PatientDetails3 = __webpack_require__(/*! ./containers/diagnosis/PatientDetails.js */ "./dev/js/containers/diagnosis/PatientDetails.js");

var _PatientDetails4 = _interopRequireDefault(_PatientDetails3);

var _BookingSummary = __webpack_require__(/*! ./containers/diagnosis/BookingSummary.js */ "./dev/js/containers/diagnosis/BookingSummary.js");

var _BookingSummary2 = _interopRequireDefault(_BookingSummary);

var _Chat = __webpack_require__(/*! ./containers/commons/Chat.js */ "./dev/js/containers/commons/Chat.js");

var _Chat2 = _interopRequireDefault(_Chat);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const routes = [{ path: '/', exact: true, component: _SearchCriteria2.default }, { path: '/locationsearch', exact: true, component: _LocationSearch2.default }, { path: '/criteriasearch', exact: true, component: _CriteriaSearch2.default }, { path: '/searchresults', exact: true, component: _SearchResults2.default }, { path: '/searchresults/filter', exact: true, component: _SearchResultsFilter2.default }, { path: '/doctorprofile/:id', exact: true, component: _DoctorProfile2.default }, { path: '/doctorprofile/:id/availability', exact: true, component: _ClinicList2.default }, { path: '/doctorprofile/:id/:clinicId/book', exact: true, component: _AppointmentSlot2.default }, { path: '/doctorprofile/:id/:clinicId/bookdetails', exact: true, component: _PatientDetails2.default }, { path: '/user', exact: true, component: _UserProfile2.default }, { path: '/user/:id', exact: true, component: _UserProfile2.default }, { path: '/user/:id/appointments', exact: true, component: _UserAppointments2.default }, { path: '/user/:id/reports', exact: true, component: _UserReports2.default }, { path: '/chat', exact: true, component: _Chat2.default }, { path: '/payment', exact: true, component: _Payment2.default }, { path: '/booking/:refId', exact: true, component: _Booking2.default }, { path: '/dx', exact: true, component: _SearchCriteria4.default }, { path: '/dx/criteriasearch', exact: true, component: _CriteriaSearch4.default }, { path: '/dx/searchresults', exact: true, component: _SearchResults4.default }, { path: '/lab/:id/book', exact: true, component: _LabSlots2.default }, { path: '/lab/:id/bookdetails', exact: true, component: _PatientDetails4.default }, { path: '/lab/booking/summary/:id', exact: true, component: _BookingSummary2.default }];

class RouterConfig extends _react.Component {

    render() {
        return _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(_TopBar2.default, null),
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

/***/ "material-ui-icons/ArrowBack":
/*!**********************************************!*\
  !*** external "material-ui-icons/ArrowBack" ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("material-ui-icons/ArrowBack");

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

/***/ "material-ui-icons/LocationSearching":
/*!******************************************************!*\
  !*** external "material-ui-icons/LocationSearching" ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("material-ui-icons/LocationSearching");

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

/***/ "material-ui/AppBar":
/*!*************************************!*\
  !*** external "material-ui/AppBar" ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("material-ui/AppBar");

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

/***/ "material-ui/Toolbar":
/*!**************************************!*\
  !*** external "material-ui/Toolbar" ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("material-ui/Toolbar");

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

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2FjdGlvbnMvY29tbW9ucy91c2VyLmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9hY3Rpb25zL2RpYWdub3Npcy9sYWJTZWFyY2guanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2FjdGlvbnMvZGlhZ25vc2lzL3NlYXJjaENyaXRlcmlhLmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9hY3Rpb25zL2luZGV4LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9hY3Rpb25zL29wZC9kb2N0b3JTZWFyY2guanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2FjdGlvbnMvb3BkL3NlYXJjaENyaXRlcmlhLmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9hcGkvYXBpLmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL2NvbW1vbnMvY2hhdC9DaGF0Vmlldy5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9jb21tb25zL2NoYXQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvY29tbW9ucy9sb2NhdGlvblNlbGVjdG9yL0xvY2F0aW9uU2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvY29tbW9ucy9sb2NhdGlvblNlbGVjdG9yL2luZGV4LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL2NvbW1vbnMvcHJvZmlsZVNsaWRlci9Qcm9maWxlU2xpZGVyLmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL2NvbW1vbnMvcHJvZmlsZVNsaWRlci9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9jb21tb25zL3RpbWVTbG90U2VsZWN0b3IvVGltZVNsb3RTZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9jb21tb25zL3RpbWVTbG90U2VsZWN0b3IvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvY29tbW9ucy91c2VyQXBwb2ludG1lbnRzL1VzZXJBcHBvaW50bWVudHNWaWV3LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL2NvbW1vbnMvdXNlckFwcG9pbnRtZW50cy9hcHBvaW50bWVudExpc3QvQXBwb2ludG1lbnRMaXN0LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL2NvbW1vbnMvdXNlckFwcG9pbnRtZW50cy9hcHBvaW50bWVudExpc3QvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvY29tbW9ucy91c2VyQXBwb2ludG1lbnRzL2luZGV4LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL2NvbW1vbnMvdXNlclByb2ZpbGUvVXNlclByb2ZpbGVWaWV3LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL2NvbW1vbnMvdXNlclByb2ZpbGUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvY29tbW9ucy91c2VyUHJvZmlsZS9wcm9maWxlRGF0YS9Qcm9maWxlRGF0YS5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9jb21tb25zL3VzZXJQcm9maWxlL3Byb2ZpbGVEYXRhL2luZGV4LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL2NvbW1vbnMvdXNlclJlcG9ydHMvVXNlclJlcG9ydHNWaWV3LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL2NvbW1vbnMvdXNlclJlcG9ydHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvY29tbW9ucy91c2VyUmVwb3J0cy9yZXBvcnRMaXN0L1JlcG9ydExpc3QuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvY29tbW9ucy91c2VyUmVwb3J0cy9yZXBvcnRMaXN0L2luZGV4LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL2RpYWdub3Npcy9ib29raW5nU3VtbWFyeS9Cb29raW5nU3VtbWFyeVZpZXcuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvZGlhZ25vc2lzL2Jvb2tpbmdTdW1tYXJ5L2luZGV4LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL2RpYWdub3Npcy9jb21tb25zL2NvbW1vbmx5U2VhcmNoZWQvQ29tbW9ubHlTZWFyY2hlZC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9kaWFnbm9zaXMvY29tbW9ucy9jb21tb25seVNlYXJjaGVkL2luZGV4LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL2RpYWdub3Npcy9jb21tb25zL2NyaXRlcmlhU2VsZWN0b3IvQ3JpdGVyaWFTZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9kaWFnbm9zaXMvY29tbW9ucy9jcml0ZXJpYVNlbGVjdG9yL2luZGV4LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL2RpYWdub3Npcy9jb21tb25zL2xhYkRldGFpbHMvTGFiRGV0YWlsLmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL2RpYWdub3Npcy9jb21tb25zL2xhYkRldGFpbHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvZGlhZ25vc2lzL2NvbW1vbnMvbGFiUHJvZmlsZUNhcmQvTGFiUHJvZmlsZUNhcmQuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvZGlhZ25vc2lzL2NvbW1vbnMvbGFiUHJvZmlsZUNhcmQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvZGlhZ25vc2lzL2NvbW1vbnMvb3JkZXJEZXRhaWxzL09yZGVyRGV0YWlscy5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9kaWFnbm9zaXMvY29tbW9ucy9vcmRlckRldGFpbHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvZGlhZ25vc2lzL2NyaXRlcmlhU2VhcmNoL0NyaXRlcmlhU2VhcmNoVmlldy5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9kaWFnbm9zaXMvY3JpdGVyaWFTZWFyY2gvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvZGlhZ25vc2lzL2xhYlNsb3RzL0xhYlNsb3RzVmlldy5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9kaWFnbm9zaXMvbGFiU2xvdHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvZGlhZ25vc2lzL3BhdGllbnREZXRhaWxzL1BhdGllbnREZXRhaWxzVmlldy5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9kaWFnbm9zaXMvcGF0aWVudERldGFpbHMvYWRkcmVzc0Zvcm0vQWRkcmVzc0Zvcm0uanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvZGlhZ25vc2lzL3BhdGllbnREZXRhaWxzL2FkZHJlc3NGb3JtL2luZGV4LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL2RpYWdub3Npcy9wYXRpZW50RGV0YWlscy9kZXRhaWxzRm9ybS9EZXRhaWxzRm9ybS5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9kaWFnbm9zaXMvcGF0aWVudERldGFpbHMvZGV0YWlsc0Zvcm0vaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvZGlhZ25vc2lzL3BhdGllbnREZXRhaWxzL2luZGV4LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL2RpYWdub3Npcy9zZWFyY2hDcml0ZXJpYS9TZWFyY2hDcml0ZXJpYVZpZXcuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvZGlhZ25vc2lzL3NlYXJjaENyaXRlcmlhL2luZGV4LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL2RpYWdub3Npcy9zZWFyY2hSZXN1bHRzL1NlYXJjaFJlc3VsdHNWaWV3LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL2RpYWdub3Npcy9zZWFyY2hSZXN1bHRzL2luZGV4LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL2RpYWdub3Npcy9zZWFyY2hSZXN1bHRzL2xhYnNMaXN0L0xhYnNMaXN0LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL2RpYWdub3Npcy9zZWFyY2hSZXN1bHRzL2xhYnNMaXN0L2luZGV4LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL2RpYWdub3Npcy9zZWFyY2hSZXN1bHRzL3RvcEJhci9Ub3BCYXIuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvZGlhZ25vc2lzL3NlYXJjaFJlc3VsdHMvdG9wQmFyL2luZGV4LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL29wZC9hcHBvaW50bWVudFNsb3QvQXBwb2ludG1lbnRTbG90LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL29wZC9hcHBvaW50bWVudFNsb3QvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvb3BkL2Jvb2tpbmcvQm9va2luZ1ZpZXcuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvb3BkL2NsaW5pY0xpc3QvQ2xpbmljTGlzdFZpZXcuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvb3BkL2NsaW5pY0xpc3QvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvb3BkL2NvbW1vbnMvY2xpbmljU2VsZWN0b3IvQ2xpbmljU2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvb3BkL2NvbW1vbnMvY2xpbmljU2VsZWN0b3IvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvb3BkL2NvbW1vbnMvY29tbW9ubHlTZWFyY2hlZC9Db21tb25seVNlYXJjaGVkLmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL29wZC9jb21tb25zL2NvbW1vbmx5U2VhcmNoZWQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvb3BkL2NvbW1vbnMvY3JpdGVyaWFTZWxlY3Rvci9Dcml0ZXJpYVNlbGVjdG9yLmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL29wZC9jb21tb25zL2NyaXRlcmlhU2VsZWN0b3IvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvb3BkL2NvbW1vbnMvZG9jdG9yUHJvZmlsZUNhcmQvRG9jdG9yUHJvZmlsZUNhcmQuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvb3BkL2NvbW1vbnMvZG9jdG9yUHJvZmlsZUNhcmQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvb3BkL2NvbW1vbnMvc2VsZWN0ZWRDbGluaWMvU2VsZWN0ZWRDbGluaWMuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvb3BkL2NvbW1vbnMvc2VsZWN0ZWRDbGluaWMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvb3BkL2NyaXRlcmlhU2VhcmNoL0NyaXRlcmlhU2VhcmNoVmlldy5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9vcGQvY3JpdGVyaWFTZWFyY2gvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvb3BkL2RvY3RvclByb2ZpbGUvRG9jdG9yUHJvZmlsZVZpZXcuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvb3BkL2RvY3RvclByb2ZpbGUvYWJvdXREb2N0b3IvQWJvdXREb2N0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvb3BkL2RvY3RvclByb2ZpbGUvYWJvdXREb2N0b3IvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvb3BkL2RvY3RvclByb2ZpbGUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvb3BkL2RvY3RvclByb2ZpbGUvcHJvZmVzc2lvbmFsR3JhcGgvUHJvZmVzc2lvbmFsR3JhcGguanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvb3BkL2RvY3RvclByb2ZpbGUvcHJvZmVzc2lvbmFsR3JhcGgvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvb3BkL2xvY2F0aW9uU2VhcmNoL0xvY2F0aW9uU2VhcmNoLmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL29wZC9sb2NhdGlvblNlYXJjaC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9vcGQvcGF0aWVudERldGFpbHMvUGF0aWVudERldGFpbHMuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvb3BkL3BhdGllbnREZXRhaWxzL2RldGFpbHNGb3JtL0RldGFpbHNGb3JtLmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb21wb25lbnRzL29wZC9wYXRpZW50RGV0YWlscy9kZXRhaWxzRm9ybS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9vcGQvcGF0aWVudERldGFpbHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvb3BkL3BheW1lbnQvUGF5bWVudFZpZXcuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvb3BkL3NlYXJjaENyaXRlcmlhL1NlYXJjaENyaXRlcmlhVmlldy5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9vcGQvc2VhcmNoQ3JpdGVyaWEvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvb3BkL3NlYXJjaFJlc3VsdHMvU2VhcmNoUmVzdWx0c1ZpZXcuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvb3BkL3NlYXJjaFJlc3VsdHMvZG9jdG9yc0xpc3QvRG9jdG9yc0xpc3QuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvb3BkL3NlYXJjaFJlc3VsdHMvZG9jdG9yc0xpc3QvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvb3BkL3NlYXJjaFJlc3VsdHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvb3BkL3NlYXJjaFJlc3VsdHMvdG9wQmFyL1RvcEJhci5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9vcGQvc2VhcmNoUmVzdWx0cy90b3BCYXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbXBvbmVudHMvb3BkL3NlYXJjaFJlc3VsdHNGaWx0ZXIvU2VhcmNoUmVzdWx0c0ZpbHRlci5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9vcGQvc2VhcmNoUmVzdWx0c0ZpbHRlci9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9vcGQvdG9wQmFyL1RvcEJhci5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29tcG9uZW50cy9vcGQvdG9wQmFyL2luZGV4LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb25zdGFudHMvdHlwZXMuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbnRhaW5lcnMvY29tbW9ucy9DaGF0LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb250YWluZXJzL2NvbW1vbnMvVXNlckFwcG9pbnRtZW50cy5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29udGFpbmVycy9jb21tb25zL1VzZXJQcm9maWxlLmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb250YWluZXJzL2NvbW1vbnMvVXNlclJlcG9ydHMuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbnRhaW5lcnMvZGlhZ25vc2lzL0Jvb2tpbmdTdW1tYXJ5LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb250YWluZXJzL2RpYWdub3Npcy9Dcml0ZXJpYVNlYXJjaC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29udGFpbmVycy9kaWFnbm9zaXMvTGFiU2xvdHMuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbnRhaW5lcnMvZGlhZ25vc2lzL1BhdGllbnREZXRhaWxzLmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb250YWluZXJzL2RpYWdub3Npcy9TZWFyY2hDcml0ZXJpYS5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29udGFpbmVycy9kaWFnbm9zaXMvU2VhcmNoUmVzdWx0cy5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29udGFpbmVycy9vcGQvQXBwb2ludG1lbnRTbG90LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb250YWluZXJzL29wZC9Cb29raW5nLmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb250YWluZXJzL29wZC9DbGluaWNMaXN0LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb250YWluZXJzL29wZC9Dcml0ZXJpYVNlYXJjaC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29udGFpbmVycy9vcGQvRG9jdG9yUHJvZmlsZS5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29udGFpbmVycy9vcGQvTG9jYXRpb25TZWFyY2guanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2NvbnRhaW5lcnMvb3BkL1BhdGllbnREZXRhaWxzLmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb250YWluZXJzL29wZC9QYXltZW50LmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9jb250YWluZXJzL29wZC9TZWFyY2hDcml0ZXJpYS5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29udGFpbmVycy9vcGQvU2VhcmNoUmVzdWx0cy5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29udGFpbmVycy9vcGQvU2VhcmNoUmVzdWx0c0ZpbHRlci5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvY29udGFpbmVycy9vcGQvVG9wQmFyLmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9yZWR1Y2Vycy9jb21tb25zL3VzZXIuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL3JlZHVjZXJzL2RpYWdub3Npcy9sYWJzLmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9yZWR1Y2Vycy9kaWFnbm9zaXMvbGFic1NlYXJjaC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvcmVkdWNlcnMvZGlhZ25vc2lzL3NlYXJjaENyaXRlcmlhLmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9yZWR1Y2Vycy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvcmVkdWNlcnMvb3BkL2RvY3RvclNlYXJjaC5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvcmVkdWNlcnMvb3BkL2RvY3RvcnMuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL3JlZHVjZXJzL29wZC9zZWFyY2hDcml0ZXJpYS5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvcm91dGVzLmpzIiwid2VicGFjazovLy8uL2Rldi9qcy91dGlscy9kYXRlVGltZVV0aWxzLmpzIiwid2VicGFjazovLy8uL2luZGV4LmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcImF4aW9zXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZXhwcmVzc1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcImh0dHBcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJtYXRlcmlhbC11aS1pY29ucy9BY2NvdW50Q2lyY2xlXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibWF0ZXJpYWwtdWktaWNvbnMvQXJyb3dCYWNrXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibWF0ZXJpYWwtdWktaWNvbnMvQXR0YWNoTW9uZXlcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJtYXRlcmlhbC11aS1pY29ucy9BdlRpbWVyXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibWF0ZXJpYWwtdWktaWNvbnMvQ2FsbFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIm1hdGVyaWFsLXVpLWljb25zL0V4cGFuZE1vcmVcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJtYXRlcmlhbC11aS1pY29ucy9GaWx0ZXJMaXN0XCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibWF0ZXJpYWwtdWktaWNvbnMvSG9tZVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIm1hdGVyaWFsLXVpLWljb25zL0tleWJvYXJkQXJyb3dSaWdodFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIm1hdGVyaWFsLXVpLWljb25zL0xvY2F0aW9uT25cIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJtYXRlcmlhbC11aS1pY29ucy9Mb2NhdGlvblNlYXJjaGluZ1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcIm1hdGVyaWFsLXVpLWljb25zL1BheW1lbnRcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJtYXRlcmlhbC11aS1pY29ucy9Tb3J0XCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibWF0ZXJpYWwtdWkvQXBwQmFyXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibWF0ZXJpYWwtdWkvQ2hlY2tib3hcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJtYXRlcmlhbC11aS9DaGlwXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibWF0ZXJpYWwtdWkvRXhwYW5zaW9uUGFuZWxcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJtYXRlcmlhbC11aS9Gb3JtXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibWF0ZXJpYWwtdWkvTWVudVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIm1hdGVyaWFsLXVpL1JhZGlvXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibWF0ZXJpYWwtdWkvU3RlcHBlclwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIm1hdGVyaWFsLXVpL1Rvb2xiYXJcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJtYXRlcmlhbC11aS9zdHlsZXNcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJwYXRoXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVhY3RcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWFjdC1kb20vc2VydmVyXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVhY3QtaW5maW5pdGUtc2Nyb2xsZXJcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWFjdC1qc3MvbGliL0pzc1Byb3ZpZGVyXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVhY3QtanNzL2xpYi9qc3NcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWFjdC1yZWR1eFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInJlYWN0LXJvdXRlclwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInJlYWN0LXJvdXRlci1kb21cIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWR1eFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInJlZHV4LWxvZ2dlclwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInJlZHV4LXRodW5rXCIiXSwibmFtZXMiOlsiZ2V0VXNlclByb2ZpbGUiLCJkaXNwYXRjaCIsInRoZW4iLCJyZXNwb25zZSIsInR5cGUiLCJwYXlsb2FkIiwicHJvZmlsZXMiLCJjYXRjaCIsImVycm9yIiwiZ2V0VXNlclByb2ZpbGVXaXRoQXBwb2ludG1lbnRzIiwiZ2V0VXNlclByb2ZpbGVXaXRoVGVzdHMiLCJnZXRMYWJzIiwic2VhcmNoU3RhdGUiLCJmaWx0ZXJTdGF0ZSIsIm1lcmdlU3RhdGUiLCJsYWJzIiwic2VhcmNoU3RhdGVQYXJhbSIsImVuY29kZVVSSUNvbXBvbmVudCIsIkpTT04iLCJzdHJpbmdpZnkiLCJmaWx0ZXJTdGF0ZVBhcmFtIiwiaGlzdG9yeSIsInJlcGxhY2VTdGF0ZSIsImdldExhYkJ5SWQiLCJsYWJJZCIsInRlc3RJZHMiLCJsYWIiLCJmaWx0ZXIiLCJpZCIsImdldExhYlRpbWVTbG90cyIsImNhbGxiYWNrIiwiZ2V0TGFiQm9va2luZ1N1bW1hcnkiLCJib29raW5nSWQiLCJsb2FkTGFiU2VhcmNoQ3JpdGVyaWEiLCJ0b2dnbGVUZXN0IiwidG9nZ2xlRGlhZ25vc2lzQ3JpdGVyaWEiLCJjcml0ZXJpYSIsImdldERpYWdub3Npc0NyaXRlcmlhUmVzdWx0cyIsInNlYXJjaFN0cmluZyIsIlNFQVJDSF9DUklURVJJQV9PUEQiLCJTRUFSQ0hfQ1JJVEVSSUFfTEFCUyIsIkRPQ1RPUlNfQUNUSU9OUyIsIkxBQlNfQUNUSU9OUyIsIlVTRVJfQUNUSU9OUyIsIm1vZHVsZSIsImV4cG9ydHMiLCJPYmplY3QiLCJhc3NpZ24iLCJnZXREb2N0b3JzIiwiZG9jdG9ycyIsImdldERvY3RvckJ5SWQiLCJkb2N0b3JJZCIsImRvY3RvciIsImRvYyIsImdldFRpbWVTbG90cyIsImNsaW5pY0lkIiwibG9hZFNlYXJjaENyaXRlcmlhIiwidG9nZ2xlQ29uZGl0aW9uIiwidG9nZ2xlU3BlY2lhbGl0eSIsInRvZ2dsZUNyaXRlcmlhIiwic2VsZWN0TG9jYXRpb24iLCJsb2NhdGlvbiIsIm1lcmdlU2VhcmNoU3RhdGUiLCJzdGF0ZSIsImdldENyaXRlcmlhUmVzdWx0cyIsInNldE9QREZpbHRlcnMiLCJmaWx0ZXJEYXRhIiwiYXhpb3NJbnN0YW5jZSIsImNyZWF0ZSIsImJhc2VVUkwiLCJoZWFkZXIiLCJBUElfR0VUIiwidXJsIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJnZXQiLCJyZXMiLCJkYXRhIiwicmVqIiwiQVBJX1BPU1QiLCJwb3N0IiwiQVBJX1BVVCIsInB1dCIsIkFQSV9ERUxFVEUiLCJkZWxldGUiLCJJZnJhbVN0eWxlIiwid2lkdGgiLCJoZWlnaHQiLCJDaGF0VmlldyIsIkNvbXBvbmVudCIsImNvbnN0cnVjdG9yIiwicHJvcHMiLCJyZW5kZXIiLCJjb250ZXh0VHlwZXMiLCJyb3V0ZXIiLCJMb2NhdGlvblNlbGVjdG9yIiwiZ2V0Q3VycmVudExvY2F0aW9uIiwibmF2aWdhdG9yIiwiZ2VvbG9jYXRpb24iLCJnZXRDdXJyZW50UG9zaXRpb24iLCJwb3NpdGlvbiIsImFkZHJlc3MiLCJzZWxlY3RlZExvY2F0aW9uIiwiZm9ybWF0dGVkX2FkZHJlc3MiLCJjb250ZXh0IiwicHVzaCIsImJpbmQiLCJQcm9maWxlU2xpZGVyIiwic3dpdGNoVXNlciIsInByb2ZpbGVJZCIsInN1YlJvdXRlIiwia2V5cyIsIm1hcCIsImkiLCJzcmMiLCJwcm9maWxlSW1hZ2UiLCJUaW1lU2xvdFNlbGVjdG9yIiwic2VsZWN0ZWREYXkiLCJzZWxlY3RlZEludGVydmFsIiwic2VsZWN0ZWRUaW1lU2xvdCIsImNvbXBvbmVudFdpbGxNb3VudCIsInRpbWVTbG90cyIsInNldERlZmF1bHRTZWxlY3RlZCIsImRheXMiLCJkYXRlcyIsImRlZmF1bHREYXlJbmRleCIsImdldEZpcnN0QXZhaWxhYmxlRGF5Iiwic2V0U3RhdGUiLCJkZWZhdXRJbnRlcndhbEluZGV4IiwiZ2V0Rmlyc3RBdmFpbGFibGVJbnRlcndhbCIsImludGVydmFscyIsImRlZmF1bHRUaW1lU2xvdEluZGV4IiwiZ2V0Rmlyc3RBdmFpbGFibGVUaW1lU2xvdCIsImludGVyd2FsSW5kZXgiLCJpbnRlcndhbCIsImlzQXZhaWxhYmxlIiwicGFyc2VJbnQiLCJ0aW1lU2xvdEluZGV4IiwidGltZVNsb3QiLCJzZWxlY3RUaW1lU2xvdCIsImRheUluZGV4IiwiZGF5Iiwib25EYXRlQ2xpY2siLCJkYXRlIiwic2VsZWN0ZWRJbmRleCIsImluZGV4IiwiYXZhaWxhYmxlSW50ZXJ3YWwiLCJhdmFpbGFibGVUaW1lU2xvdCIsIm9uSW50ZXJ2YWxDbGljayIsIm9uVGltZVNsb3RDbGljayIsImRhdGVMaXN0IiwiZGF5RGF0ZSIsIkRhdGUiLCJnZXREYXRlIiwiZGF5TmFtZSIsInNlbGVjdGVkIiwiaW50ZXJ2YWwiLCJuYW1lIiwic2xvdCIsInNsb3RUZXh0Iiwic3RhcnQiLCJlbmQiLCJVc2VyQXBwb2ludG1lbnRzVmlldyIsImNvbXBvbmVudERpZE1vdW50IiwiY29tcGFyZURhdGVXaXRoVG9kYXkiLCJ0b2RheSIsImdldFRpbWUiLCJzZWxlY3RlZFVzZXIiLCJ1c2VyUHJvZmlsZUlkIiwibWF0Y2giLCJwYXJhbXMiLCJVU0VSIiwiaXNEZWZhdWx0VXNlciIsImFwcG9pbnRtZW50cyIsImFwcG9pbnRtZW50IiwiQXBwb2ludG1lbnRMaXN0IiwidW5peF90aW1lc3RhbXAiLCJob3VycyIsImdldEhvdXJzIiwibWludXRlcyIsImdldE1pbnV0ZXMiLCJzdWJzdHIiLCJkb2N0b3JOYW1lIiwidG9EYXRlU3RyaW5nIiwiVXNlclByb2ZpbGVWaWV3IiwiUHJvZmlsZURhdGEiLCJvcGVuQXBwb2ludG1lbnRzIiwib3BlblJlcG9ydHMiLCJnZW5kZXIiLCJhZ2UiLCJtb2JpbGUiLCJtZWRpY2FsSGlzdG9yeUNvdW50IiwibWVkaWNhbFRlc3RDb3VudCIsIm9ubGluZUNvbnN1bHRhdGlvbkNvdW50Iiwib3BkVmlzaXRDb3VudCIsInByb2ZpbGVEYXRhIiwiVXNlclJlcG9ydHNWaWV3IiwidGVzdHMiLCJ0ZXN0IiwiUmVwb3J0TGlzdCIsInN1Yl9uYW1lIiwiYWJicmV2aWF0aW9uIiwiY2F0ZWdvcnkiLCJCb29raW5nU3VtbWFyeVZpZXciLCJib29raW5nRGV0YWlscyIsImdldExvY2F0aW9uUGFyYW0iLCJ0YWciLCJwYXJhbVN0cmluZyIsInNlYXJjaCIsIlVSTFNlYXJjaFBhcmFtcyIsInByb2NlZWQiLCJzZWxlY3RlZFNsb3RTdGFydCIsImZsb2F0IiwicGF0aWVudERldGFpbHMiLCJDb21tb25seVNlYXJjaGVkIiwicm93cyIsInJvdyIsInRvZ2dsZVJvdyIsImhlYWRpbmciLCJDcml0ZXJpYVNlbGVjdG9yIiwiaGFuZGxlRGVsZXRlIiwiaGFuZGxlciIsImxvY2F0aW9uUGlsbCIsInBpbGxzIiwiY3JpdGVyaWFzIiwiY29tbW9ubHlTZWFyY2hlZFRlc3RzIiwicGlsbCIsInNlbGVjdGVkVGVzdHMiLCJ0cyIsInNlbGVjdGVkRGlhZ25vc2lzQ3JpdGVyaWEiLCJzb3J0IiwiYSIsImIiLCJkYXRlQSIsImRhdGVCIiwiTGFiRGV0YWlscyIsIkxhYlByb2ZpbGVDYXJkIiwiZ2VuZXJhdGVUZXN0c1N0cmluZyIsInJlZHVjZSIsInN0ciIsImxlbmd0aCIsImNhcmRDbGljayIsImUiLCJkZXRhaWxzIiwidGVzdHNTdHIiLCJib29rTm93Iiwic3RvcFByb3BhZ2F0aW9uIiwiZ2V0QXZhaWxhYmlsaXR5IiwibmV4dEF2YWlsYWJsZSIsImZyb20iLCJ0aW1lU3RhcnQiLCJ0aW1lRW5kIiwidG8iLCJwcm9maWxlX2ltZyIsInByaWNlX2JyZWFrdXAiLCJ0aW1lQXZhaWxhYmxlIiwiaGlkZUJvb2tOb3ciLCJhbW91bnQiLCJoaWRlQm90dG9tIiwiT3JkZXJEZXRhaWxzIiwidG90YWxQcmljZSIsInRvdGFsVGVzdHMiLCJicmVha3VwIiwiZGVib3VuY2VyIiwiZm4iLCJkZWxheSIsInRpbWVyIiwiY2xlYXJUaW1lb3V0Iiwic2V0VGltZW91dCIsImNhbGwiLCJDcml0ZXJpYVNlYXJjaFZpZXciLCJzZWFyY2hWYWx1ZSIsInNlYXJjaFJlc3VsdHMiLCJnZXRTZWFyY2hSZXN1bHRzIiwiaW5wdXQiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiZm9jdXMiLCJpbnB1dEhhbmRsZXIiLCJ0YXJnZXQiLCJ2YWx1ZSIsInJlc3VsdCIsImFkZENyaXRlcmlhIiwiZ29CYWNrIiwicmVzdWx0RGF0YSIsImoiLCJMYWJTbG90c1ZpZXciLCJzZWxlY3RlZExhYiIsInNlbGVjdGVkU2xvdCIsIkxBQlMiLCJQYXRpZW50RGV0YWlsc1ZpZXciLCJzZWxlY3RlZFNsb3RFbmQiLCJwYXJzZUZsb2F0IiwidG9TdHJpbmciLCJBZGRyZXNzRm9ybSIsImxvY2FsaXR5IiwibGFuZG1hcmsiLCJwaW5jb2RlIiwiY2l0eSIsIndoaWNoIiwiRGV0YWlsc0Zvcm0iLCJwYXRpZW50TmFtZSIsInBhdGllbnRFbWFpbCIsInBhdGllbnRHZW5kZXIiLCJvdHAiLCJwYXRpZW50TW9iaWxlIiwiU2VhcmNoQ3JpdGVyaWFWaWV3Iiwic2VhcmNoUHJvY2VlZCIsIlNlYXJjaFJlc3VsdHNWaWV3IiwiQ1JJVEVSSUFfTE9BREVEIiwiZmlsdGVyQ3JpdGVyaWEiLCJnZXRMYWJMaXN0IiwicGFyc2UiLCJjb25zb2xlIiwidXBkYXRlTGFicyIsImFyZ3MiLCJMT0FESU5HIiwiTGFic0xpc3QiLCJsYWJMaXN0IiwiVG9wQmFyIiwiYW5jaG9yRWwiLCJoYW5kbGVPcGVuIiwiZXZlbnQiLCJjdXJyZW50VGFyZ2V0IiwiaGFuZGxlQ2xvc2UiLCJCb29sZWFuIiwiQXBwb2ludG1lbnRTbG90Iiwic2VsZWN0ZWREb2N0b3IiLCJzZWxlY3RlZENsaW5pYyIsIkRPQ1RPUlMiLCJCb29raW5nVmlldyIsIkNsaW5pY0xpc3RWaWV3IiwiQ2xpbmljU2VsZWN0b3IiLCJzZWxlY3RDbGluaWMiLCJhdmFpbGFiaWxpdHkiLCJmZWUiLCJjbGluaWMiLCJ0b2dnbGVQaWxsIiwiY29uZGl0aW9ucyIsInNwZWNpYWxpdGllcyIsImNvbW1vbmx5U2VhcmNoZWRDb25kaXRpb25zIiwic2VsZWN0ZWRDb25kaXRpb25zIiwiY29tbW9ubHlTZWFyY2hlZFNwZWNpYWxpdGllcyIsInNlbGVjdGVkU3BlY2lhbGl0aWVzIiwic2VsZWN0ZWRDcml0ZXJpYSIsIkRvY3RvclByb2ZpbGVDYXJkIiwiZ2V0UXVhbGlmaWNhdGlvblN0ciIsInF1YWxpZmljYXRpb25TcGVjaWFsaXphdGlvbiIsImN1cnIiLCJxdWFsaWZpY2F0aW9uIiwic3BlY2lhbGl6YXRpb24iLCJwcmFjdGljZV9kdXJhdGlvbiIsImNvbnN1bHRhdGlvbkNvdW50IiwicGFzdEV4cGVyaWVuY2UiLCJxdWFsaWZpY2F0aW9uU3RyaW5nIiwiU2VsZWN0ZWRDbGluaWMiLCJjbGluaWNEYXRhIiwiRG9jdG9yUHJvZmlsZVZpZXciLCJBYm91dERvY3RvciIsIlByb2Zlc3Npb25hbEdyYXBoIiwiTG9jYXRpb25TZWFyY2giLCJvcHRpb25zIiwidHlwZXMiLCJhdXRvY29tcGxldGUiLCJnb29nbGUiLCJtYXBzIiwicGxhY2VzIiwiQXV0b2NvbXBsZXRlIiwiYWRkTGlzdGVuZXIiLCJwbGFjZSIsImdldFBsYWNlIiwiUGF0aWVudERldGFpbHMiLCJQYXltZW50VmlldyIsImdldERvY3Rvckxpc3QiLCJEb2N0b3JzTGlzdCIsImRvY3Rvckxpc3QiLCJkb2N0b3JWaWV3TGlzdCIsImRvY0lkIiwic2VsZWN0RG9jdG9yIiwicGF0aG5hbWUiLCJTZWFyY2hSZXN1bHRzRmlsdGVyIiwiZmVlXzAiLCJmZWVfMSIsImZlZV8yIiwiZmVlXzMiLCJjbGluaWNfcGVyc29uYWwiLCJjbGluaWNfaG9zcGl0YWwiLCJjbGluaWNfbXVsdGkiLCJhdmFpbGFibGVfdG9kYXkiLCJkaXN0YW5jZSIsImFwcGx5RmlsdGVyIiwiZ28iLCJoYW5kbGVDaGVja2JveCIsImNoZWNrZWQiLCJoYW5kbGVDaGFuZ2VSYWRpbyIsIndpbmRvdyIsIkFQUEVORF9ET0NUT1JTIiwiRE9DVE9SX1NFQVJDSCIsIlNFTEVDVF9ET0NUT1IiLCJUT0dHTEVfQ09ORElUSU9OUyIsIlRPR0dMRV9TUEVDSUFMSVRJRVMiLCJUT0dHTEVfVEVTVFMiLCJTRUxFQ1RfTE9DQVRJT04iLCJNRVJHRV9TRUFSQ0hfU1RBVEVfT1BEIiwiVE9HR0xFX0NSSVRFUklBIiwiVE9HR0xFX0RJQUdOT1NJU19DUklURVJJQSIsIlNFVF9PUERfRklMVEVSUyIsIlNFVF9MQUJTX0ZJTFRFUlMiLCJMT0FEX1NFQVJDSF9DUklURVJJQV9PUEQiLCJNRVJHRV9TRUFSQ0hfU1RBVEVfTEFCIiwiTE9BRF9TRUFSQ0hfQ1JJVEVSSUFfTEFCIiwiQVBQRU5EX0xBQlMiLCJMQUJfU0VBUkNIIiwiQVBQRU5EX1VTRVJfUFJPRklMRVMiLCJDaGF0IiwibWFwU3RhdGVUb1Byb3BzIiwibWFwRGlzcGF0Y2hUb1Byb3BzIiwiVXNlckFwcG9pbnRtZW50cyIsIlVzZXJQcm9maWxlIiwiVXNlclJlcG9ydHMiLCJCb29raW5nU3VtbWFyeSIsIkNyaXRlcmlhU2VhcmNoIiwiY2IiLCJMYWJTbG90cyIsIlNlYXJjaENyaXRlcmlhIiwiU2VhcmNoUmVzdWx0cyIsIkVSUk9SIiwiQm9va2luZyIsIkNsaW5pY0xpc3QiLCJEb2N0b3JQcm9maWxlIiwiUGF5bWVudCIsImRlZmF1bHRTdGF0ZSIsImFjdGlvbiIsIm5ld1N0YXRlIiwicHJvZmlsZU1hcCIsInByb2ZpbGUiLCJsYXBNYXAiLCJhbGxSZWR1Y2VycyIsImRvY3Rvck1hcCIsInJvdXRlcyIsInBhdGgiLCJleGFjdCIsImNvbXBvbmVudCIsIlJvdXRlckNvbmZpZyIsInJvdXRlIiwiUk9VVEVTIiwidGltZVN0YW1wIiwiZ2V0RGF5TmFtZSIsImdldERheSIsInJlcXVpcmUiLCJodHRwIiwiRXhwcmVzcyIsImFwcCIsInNlcnZlciIsIlNlcnZlciIsInVzZSIsInN0YXRpYyIsImpvaW4iLCJfX2Rpcm5hbWUiLCJyZXEiLCJzdG9yZSIsInNoZWV0c1JlZ2lzdHJ5IiwidGhlbWUiLCJwYWxldHRlIiwicHJpbWFyeSIsIm1haW4iLCJzZWNvbmRhcnkiLCJzdGF0dXMiLCJkYW5nZXIiLCJnZW5lcmF0ZUNsYXNzTmFtZSIsImh0bWwiLCJyZW5kZXJUb1N0cmluZyIsImNzcyIsIndyaXRlSGVhZCIsIkxvY2F0aW9uIiwicHJvbWlzZXMiLCJzb21lIiwibG9hZERhdGEiLCJhbGwiLCJzZW5kRmlsZSIsInJvb3QiLCJsaXN0ZW4iLCJlcnIiLCJpbmZvIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVB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Q0FBLDZDOzs7Ozs7Ozs7OztBQ0FBLDZDOzs7Ozs7Ozs7OztBQ0FBLDhDOzs7Ozs7Ozs7OztBQ0FBLGdEOzs7Ozs7Ozs7OztBQ0FBLGdEOzs7Ozs7Ozs7OztBQ0FBLCtDOzs7Ozs7Ozs7OztBQ0FBLGlDOzs7Ozs7Ozs7OztBQ0FBLGtDOzs7Ozs7Ozs7OztBQ0FBLDZDOzs7Ozs7Ozs7OztBQ0FBLG9EOzs7Ozs7Ozs7OztBQ0FBLHNEOzs7Ozs7Ozs7OztBQ0FBLDhDOzs7Ozs7Ozs7OztBQ0FBLHdDOzs7Ozs7Ozs7OztBQ0FBLHlDOzs7Ozs7Ozs7OztBQ0FBLDZDOzs7Ozs7Ozs7OztBQ0FBLGtDOzs7Ozs7Ozs7OztBQ0FBLHlDOzs7Ozs7Ozs7OztBQ0FBLHdDIiwiZmlsZSI6InNlcnZlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgd2FzbSBtb2R1bGVzXG4gXHR2YXIgaW5zdGFsbGVkV2FzbU1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL1wiO1xuXG4gXHQvLyBvYmplY3Qgd2l0aCBhbGwgY29tcGlsZWQgV2ViQXNzZW1ibHkuTW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy53ID0ge307XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vaW5kZXguanNcIik7XG4iLCJpbXBvcnQgeyBBUFBFTkRfVVNFUl9QUk9GSUxFUyB9IGZyb20gJy4uLy4uL2NvbnN0YW50cy90eXBlcyc7XG5pbXBvcnQgeyBBUElfR0VUIH0gZnJvbSAnLi4vLi4vYXBpL2FwaS5qcyc7XG5cblxuZXhwb3J0IGNvbnN0IGdldFVzZXJQcm9maWxlID0gKCkgPT4gKGRpc3BhdGNoKSA9PiB7XG5cdEFQSV9HRVQoJy91c2VyLmpzb24nKS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuXHRcdFxuXHRcdGRpc3BhdGNoKHtcblx0XHRcdHR5cGU6IEFQUEVORF9VU0VSX1BST0ZJTEVTLFxuXHRcdFx0cGF5bG9hZDogcmVzcG9uc2UucHJvZmlsZXNcblx0XHR9KVxuXG5cdH0pLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xuXG5cdH0pXG59XG5cbmV4cG9ydCBjb25zdCBnZXRVc2VyUHJvZmlsZVdpdGhBcHBvaW50bWVudHMgPSAoKSA9PiAoZGlzcGF0Y2gpID0+IHtcblx0QVBJX0dFVCgnL3VzZXJfcHJvZmlsZV9hcHBvaW50bWVudHMuanNvbicpLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG5cdFx0XG5cdFx0ZGlzcGF0Y2goe1xuXHRcdFx0dHlwZTogQVBQRU5EX1VTRVJfUFJPRklMRVMsXG5cdFx0XHRwYXlsb2FkOiByZXNwb25zZS5wcm9maWxlc1xuXHRcdH0pXG5cblx0fSkuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSB7XG5cblx0fSlcbn1cblxuZXhwb3J0IGNvbnN0IGdldFVzZXJQcm9maWxlV2l0aFRlc3RzID0gKCkgPT4gKGRpc3BhdGNoKSA9PiB7XG5cdEFQSV9HRVQoJy91c2VyX3Byb2ZpbGVfdGVzdHMuanNvbicpLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG5cdFx0XG5cdFx0ZGlzcGF0Y2goe1xuXHRcdFx0dHlwZTogQVBQRU5EX1VTRVJfUFJPRklMRVMsXG5cdFx0XHRwYXlsb2FkOiByZXNwb25zZS5wcm9maWxlc1xuXHRcdH0pXG5cblx0fSkuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSB7XG5cblx0fSlcbn1cblxuIiwiaW1wb3J0IHsgQVBQRU5EX0xBQlMsIExBQl9TRUFSQ0gsIE1FUkdFX1NFQVJDSF9TVEFURV9MQUIgfSBmcm9tICcuLi8uLi9jb25zdGFudHMvdHlwZXMnO1xuaW1wb3J0IHsgQVBJX0dFVCB9IGZyb20gJy4uLy4uL2FwaS9hcGkuanMnO1xuXG5cbmV4cG9ydCBjb25zdCBnZXRMYWJzID0gKHNlYXJjaFN0YXRlID0ge30sIGZpbHRlclN0YXRlID0ge30sIG1lcmdlU3RhdGUgPSBmYWxzZSkgPT4gKGRpc3BhdGNoKSA9PiB7XG5cdEFQSV9HRVQoJy9sYWJzX3dpdGhfdGVzdHMuanNvbicpLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG5cdFx0XG5cdFx0ZGlzcGF0Y2goe1xuXHRcdFx0dHlwZTogQVBQRU5EX0xBQlMsXG5cdFx0XHRwYXlsb2FkOiByZXNwb25zZS5sYWJzXG5cdFx0fSlcblxuXHRcdGRpc3BhdGNoKHtcblx0XHRcdHR5cGU6IExBQl9TRUFSQ0gsXG5cdFx0XHRwYXlsb2FkOiByZXNwb25zZS5sYWJzXG5cdFx0fSlcblxuXHRcdGlmIChtZXJnZVN0YXRlKSB7XG5cdFx0XHRkaXNwYXRjaCh7XG5cdFx0XHRcdHR5cGU6IE1FUkdFX1NFQVJDSF9TVEFURV9MQUIsXG5cdFx0XHRcdHBheWxvYWQ6IHNlYXJjaFN0YXRlXG5cdFx0XHR9KVxuXHRcdH1cblxuXHRcdGxldCBzZWFyY2hTdGF0ZVBhcmFtID0gZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNlYXJjaFN0YXRlKSlcblx0XHRsZXQgZmlsdGVyU3RhdGVQYXJhbSA9IGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShmaWx0ZXJTdGF0ZSkpXG5cdFx0aGlzdG9yeS5yZXBsYWNlU3RhdGUobnVsbCwgJ2hlbGxvJywgYC9keC9zZWFyY2hyZXN1bHRzP3NlYXJjaD0ke3NlYXJjaFN0YXRlUGFyYW19JmZpbHRlcj0ke2ZpbHRlclN0YXRlUGFyYW19YClcblxuXG5cdH0pLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xuXG5cdH0pXG59XG5cbmV4cG9ydCBjb25zdCBnZXRMYWJCeUlkID0gKGxhYklkLCB0ZXN0SWRzKSA9PiAoZGlzcGF0Y2gpID0+IHtcblx0Ly8gdGhpcyBBUEkgc2hvdWxkIHJldHVybiBkZXRhaWxlZCBsYWJcblx0QVBJX0dFVCgnL2xhYnNfd2l0aF90ZXN0cy5qc29uJykudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcblx0XHQvLyBtb2NraW5nIEFQSSAsIFRPRE8gOiByZW1vdmVcblx0XHRyZXNwb25zZS5sYWIgPSByZXNwb25zZS5sYWJzLmZpbHRlcihsYWIgPT4gbGFiLmlkID09IGxhYklkKVswXVxuXG5cdFx0ZGlzcGF0Y2goe1xuXHRcdFx0dHlwZTogQVBQRU5EX0xBQlMsXG5cdFx0XHRwYXlsb2FkOiBbcmVzcG9uc2UubGFiXVxuXHRcdH0pXG5cblx0fSkuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSB7XG5cblx0fSlcbn1cblxuZXhwb3J0IGNvbnN0IGdldExhYlRpbWVTbG90cyA9IChsYWJJZCwgdGVzdElkcywgY2FsbGJhY2spID0+IChkaXNwYXRjaCkgPT4ge1xuXHRBUElfR0VUKCcvYXZhaWxhYmlsaXR5X2xhYnMuanNvbicpLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG5cdFx0XG5cdFx0Y2FsbGJhY2socmVzcG9uc2UpXG5cblx0fSkuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSB7XG5cblx0fSlcbn1cblxuZXhwb3J0IGNvbnN0IGdldExhYkJvb2tpbmdTdW1tYXJ5ID0gKGJvb2tpbmdJZCwgY2FsbGJhY2spID0+IChkaXNwYXRjaCkgPT4ge1xuXHRBUElfR0VUKCcvbGFiX2Jvb2tpbmdfc3VtbWFyLmpzb24nKS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuXHRcdFxuXHRcdGNhbGxiYWNrKHJlc3BvbnNlKVxuXG5cdH0pLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xuXG5cdH0pXG59XG4iLCJpbXBvcnQgeyBUT0dHTEVfQ09ORElUSU9OUywgVE9HR0xFX1NQRUNJQUxJVElFUywgU0VMRUNUX0xPQ0FUSU9OLCBNRVJHRV9TRUFSQ0hfU1RBVEUsIFRPR0dMRV9DUklURVJJQSwgVE9HR0xFX1RFU1RTLCBUT0dHTEVfRElBR05PU0lTX0NSSVRFUklBLCBMT0FEX1NFQVJDSF9DUklURVJJQV9MQUIgfSBmcm9tICcuLi8uLi9jb25zdGFudHMvdHlwZXMnO1xuaW1wb3J0IHsgQVBJX0dFVCB9IGZyb20gJy4uLy4uL2FwaS9hcGkuanMnO1xuXG5leHBvcnQgY29uc3QgbG9hZExhYlNlYXJjaENyaXRlcmlhID0gKCkgPT4gKGRpc3BhdGNoKSA9PiB7XG4gICAgZGlzcGF0Y2goe1xuICAgICAgICB0eXBlOiBMT0FEX1NFQVJDSF9DUklURVJJQV9MQUIsXG4gICAgICAgIHBheWxvYWQ6IG51bGxcbiAgICB9KVxuXG59IFxuXG5leHBvcnQgY29uc3QgdG9nZ2xlVGVzdCA9IChpZCkgPT4gKGRpc3BhdGNoKSA9PiB7XG4gICAgZGlzcGF0Y2goe1xuICAgICAgICB0eXBlOiBUT0dHTEVfVEVTVFMsXG4gICAgICAgIHBheWxvYWQ6IHtcbiAgICAgICAgICAgIGlkXG4gICAgICAgIH1cbiAgICB9KVxuXG59XG5cbmV4cG9ydCBjb25zdCB0b2dnbGVEaWFnbm9zaXNDcml0ZXJpYSA9IChjcml0ZXJpYSkgPT4gKGRpc3BhdGNoKSA9PiB7XG4gICAgZGlzcGF0Y2goe1xuICAgICAgICB0eXBlOiBUT0dHTEVfRElBR05PU0lTX0NSSVRFUklBLFxuICAgICAgICBwYXlsb2FkOiBjcml0ZXJpYVxuICAgIH0pXG5cbn1cblxuZXhwb3J0IGNvbnN0IGdldERpYWdub3Npc0NyaXRlcmlhUmVzdWx0cyA9IChzZWFyY2hTdHJpbmcsIGNhbGxiYWNrKSA9PiAoZGlzcGF0Y2gpID0+IHtcblx0QVBJX0dFVCgnL2dlbmVyaWNfc2VhcmNoX3Rlc3RzLmpzb24nKS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuXHRcdGNhbGxiYWNrKHJlc3BvbnNlKVxuXHR9KS5jYXRjaChmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgICAgXG5cdH0pXG59XG5cblxuIiwiaW1wb3J0ICogYXMgU0VBUkNIX0NSSVRFUklBX09QRCBmcm9tICcuL29wZC9zZWFyY2hDcml0ZXJpYS5qcydcbmltcG9ydCAqIGFzIFNFQVJDSF9DUklURVJJQV9MQUJTIGZyb20gJy4vZGlhZ25vc2lzL3NlYXJjaENyaXRlcmlhLmpzJ1xuaW1wb3J0ICogYXMgRE9DVE9SU19BQ1RJT05TIGZyb20gJy4vb3BkL2RvY3RvclNlYXJjaC5qcydcbmltcG9ydCAqIGFzIExBQlNfQUNUSU9OUyBmcm9tICcuL2RpYWdub3Npcy9sYWJTZWFyY2guanMnXG5pbXBvcnQgKiBhcyBVU0VSX0FDVElPTlMgZnJvbSAnLi9jb21tb25zL3VzZXIuanMnXG5cbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmFzc2lnbih7fSxcbiAgICBTRUFSQ0hfQ1JJVEVSSUFfT1BELFxuICAgIFNFQVJDSF9DUklURVJJQV9MQUJTLFxuICAgIERPQ1RPUlNfQUNUSU9OUyxcbiAgICBMQUJTX0FDVElPTlMsXG4gICAgVVNFUl9BQ1RJT05TXG4pIiwiaW1wb3J0IHsgQVBQRU5EX0RPQ1RPUlMsIERPQ1RPUl9TRUFSQ0gsIFNFTEVDVF9ET0NUT1IsIE1FUkdFX1NFQVJDSF9TVEFURV9PUEQgfSBmcm9tICcuLi8uLi9jb25zdGFudHMvdHlwZXMnO1xuaW1wb3J0IHsgQVBJX0dFVCB9IGZyb20gJy4uLy4uL2FwaS9hcGkuanMnO1xuXG5cbmV4cG9ydCBjb25zdCBnZXREb2N0b3JzID0gKHNlYXJjaFN0YXRlID0ge30sIGZpbHRlclN0YXRlID0ge30sIG1lcmdlU3RhdGUgPSBmYWxzZSkgPT4gKGRpc3BhdGNoKSA9PiB7XG5cdEFQSV9HRVQoJy9kb2N0b3JzLmpzb24nKS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuXG5cdFx0ZGlzcGF0Y2goe1xuXHRcdFx0dHlwZTogQVBQRU5EX0RPQ1RPUlMsXG5cdFx0XHRwYXlsb2FkOiByZXNwb25zZS5kb2N0b3JzXG5cdFx0fSlcblxuXHRcdGRpc3BhdGNoKHtcblx0XHRcdHR5cGU6IERPQ1RPUl9TRUFSQ0gsXG5cdFx0XHRwYXlsb2FkOiByZXNwb25zZS5kb2N0b3JzXG5cdFx0fSlcblxuXHRcdGlmIChtZXJnZVN0YXRlKSB7XG5cdFx0XHRkaXNwYXRjaCh7XG5cdFx0XHRcdHR5cGU6IE1FUkdFX1NFQVJDSF9TVEFURV9PUEQsXG5cdFx0XHRcdHBheWxvYWQ6IHNlYXJjaFN0YXRlXG5cdFx0XHR9KVxuXHRcdH1cblxuXG5cdFx0bGV0IHNlYXJjaFN0YXRlUGFyYW0gPSBlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc2VhcmNoU3RhdGUpKVxuXHRcdGxldCBmaWx0ZXJTdGF0ZVBhcmFtID0gZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGZpbHRlclN0YXRlKSlcblx0XHRoaXN0b3J5LnJlcGxhY2VTdGF0ZShudWxsLCAnaGVsbG8nLCBgL3NlYXJjaHJlc3VsdHM/c2VhcmNoPSR7c2VhcmNoU3RhdGVQYXJhbX0mZmlsdGVyPSR7ZmlsdGVyU3RhdGVQYXJhbX1gKVxuXG5cdH0pLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xuXG5cdH0pXG59XG5cbmV4cG9ydCBjb25zdCBnZXREb2N0b3JCeUlkID0gKGRvY3RvcklkKSA9PiAoZGlzcGF0Y2gpID0+IHtcblx0Ly8gdGhpcyBBUEkgc2hvdWxkIHJldHVybiBkZXRhaWxlZCBkb2N0b3Jcblx0QVBJX0dFVCgnL2RvY3RvcnMuanNvbicpLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG5cdFx0Ly8gbW9ja2luZyBBUEkgLCBUT0RPIDogcmVtb3ZlXG5cdFx0cmVzcG9uc2UuZG9jdG9yID0gcmVzcG9uc2UuZG9jdG9ycy5maWx0ZXIoZG9jID0+IGRvYy5pZCA9PSBkb2N0b3JJZClbMF1cblxuXHRcdGRpc3BhdGNoKHtcblx0XHRcdHR5cGU6IEFQUEVORF9ET0NUT1JTLFxuXHRcdFx0cGF5bG9hZDogW3Jlc3BvbnNlLmRvY3Rvcl1cblx0XHR9KVxuXG5cdH0pLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xuXG5cdH0pXG59XG5cbmV4cG9ydCBjb25zdCBnZXRUaW1lU2xvdHMgPSAoZG9jdG9ySWQsIGNsaW5pY0lkLCBjYWxsYmFjaykgPT4gKGRpc3BhdGNoKSA9PiB7XG5cdEFQSV9HRVQoJy9hdmFpbGFiaWxpdHkuanNvbicpLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG5cblx0XHRjYWxsYmFjayhyZXNwb25zZSlcblxuXHR9KS5jYXRjaChmdW5jdGlvbiAoZXJyb3IpIHtcblxuXHR9KVxufVxuIiwiaW1wb3J0IHsgVE9HR0xFX0NPTkRJVElPTlMsIFRPR0dMRV9TUEVDSUFMSVRJRVMsIFNFTEVDVF9MT0NBVElPTiwgTUVSR0VfU0VBUkNIX1NUQVRFLCBUT0dHTEVfQ1JJVEVSSUEsIFRPR0dMRV9URVNUUywgVE9HR0xFX0RJQUdOT1NJU19DUklURVJJQSwgU0VUX09QRF9GSUxURVJTLCBMT0FEX1NFQVJDSF9DUklURVJJQV9PUEQgfSBmcm9tICcuLi8uLi9jb25zdGFudHMvdHlwZXMnO1xuaW1wb3J0IHsgQVBJX0dFVCB9IGZyb20gJy4uLy4uL2FwaS9hcGkuanMnO1xuXG5leHBvcnQgY29uc3QgbG9hZFNlYXJjaENyaXRlcmlhID0gKCkgPT4gKGRpc3BhdGNoKSA9PiB7XG4gICAgZGlzcGF0Y2goe1xuICAgICAgICB0eXBlOiBMT0FEX1NFQVJDSF9DUklURVJJQV9PUEQsXG4gICAgICAgIHBheWxvYWQ6IG51bGxcbiAgICB9KVxuXG59IFxuXG5leHBvcnQgY29uc3QgdG9nZ2xlQ29uZGl0aW9uID0gKGlkKSA9PiAoZGlzcGF0Y2gpID0+IHtcbiAgICBkaXNwYXRjaCh7XG4gICAgICAgIHR5cGU6IFRPR0dMRV9DT05ESVRJT05TLFxuICAgICAgICBwYXlsb2FkOiB7XG4gICAgICAgICAgICBpZFxuICAgICAgICB9XG4gICAgfSlcblxufVxuXG5leHBvcnQgY29uc3QgdG9nZ2xlU3BlY2lhbGl0eSA9IChpZCkgPT4gKGRpc3BhdGNoKSA9PiB7XG4gICAgZGlzcGF0Y2goe1xuICAgICAgICB0eXBlOiBUT0dHTEVfU1BFQ0lBTElUSUVTLFxuICAgICAgICBwYXlsb2FkOiB7XG4gICAgICAgICAgICBpZFxuICAgICAgICB9XG4gICAgfSlcblxufVxuXG5leHBvcnQgY29uc3QgdG9nZ2xlQ3JpdGVyaWEgPSAoY3JpdGVyaWEpID0+IChkaXNwYXRjaCkgPT4ge1xuICAgIGRpc3BhdGNoKHtcbiAgICAgICAgdHlwZTogVE9HR0xFX0NSSVRFUklBLFxuICAgICAgICBwYXlsb2FkOiBjcml0ZXJpYVxuICAgIH0pXG5cbn1cblxuZXhwb3J0IGNvbnN0IHNlbGVjdExvY2F0aW9uID0gKGxvY2F0aW9uKSA9PiAoZGlzcGF0Y2gpID0+IHtcbiAgICBkaXNwYXRjaCh7XG4gICAgICAgIHR5cGU6IFNFTEVDVF9MT0NBVElPTixcbiAgICAgICAgcGF5bG9hZDogbG9jYXRpb25cbiAgICB9KVxuXG59XG5cbmV4cG9ydCBjb25zdCBtZXJnZVNlYXJjaFN0YXRlID0gKHN0YXRlKSA9PiAoZGlzcGF0Y2gpID0+IHtcbiAgICBkaXNwYXRjaCh7XG4gICAgICAgIHR5cGU6IE1FUkdFX1NFQVJDSF9TVEFURSxcbiAgICAgICAgcGF5bG9hZDogc3RhdGVcbiAgICB9KVxuXG59XG5cbmV4cG9ydCBjb25zdCBnZXRDcml0ZXJpYVJlc3VsdHMgPSAoc2VhcmNoU3RyaW5nLCBjYWxsYmFjaykgPT4gKGRpc3BhdGNoKSA9PiB7XG5cdEFQSV9HRVQoJy9nZW5lcmljX3NlYXJjaC5qc29uJykudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcblx0XHRjYWxsYmFjayhyZXNwb25zZSlcblx0fSkuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICAgIFxuXHR9KVxufVxuXG5leHBvcnQgY29uc3Qgc2V0T1BERmlsdGVycyA9IChmaWx0ZXJEYXRhKSA9PiAoZGlzcGF0Y2gpID0+IHtcbiAgICBkaXNwYXRjaCh7XG4gICAgICAgIHR5cGU6IFNFVF9PUERfRklMVEVSUyxcbiAgICAgICAgcGF5bG9hZDogZmlsdGVyRGF0YVxuICAgIH0pXG5cbn0gXG4iLCJpbXBvcnQgQXhpb3MgZnJvbSAnYXhpb3MnXG5cbmxldCBheGlvc0luc3RhbmNlID0gQXhpb3MuY3JlYXRlKHtcbiAgICBiYXNlVVJMOiAnL2FwaS8nLFxuICAgIGhlYWRlciA6IHt9XG59KTtcblxuZXhwb3J0IGNvbnN0IEFQSV9HRVQgPSAodXJsKSA9PiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLHJlamVjdCkgPT4ge1xuICAgICAgICBheGlvc0luc3RhbmNlLmdldCh1cmwpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICAgICAgcmVzb2x2ZShyZXMuZGF0YSlcbiAgICAgICAgfSwocmVqKSA9PiB7XG4gICAgICAgICAgICByZWplY3QoKVxuICAgICAgICB9KVxuICAgIH0pXG59XG5leHBvcnQgY29uc3QgQVBJX1BPU1QgPSAodXJsLCBkYXRhKSA9PiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLHJlamVjdCkgPT4ge1xuICAgICAgICBheGlvc0luc3RhbmNlLnBvc3QodXJsLCBkYXRhKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgICAgIHJlc29sdmUocmVzLmRhdGEpXG4gICAgICAgIH0scmVqZWN0KVxuICAgIH0pXG59XG5leHBvcnQgY29uc3QgQVBJX1BVVCA9ICh1cmwsIGRhdGEpID0+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUscmVqZWN0KSA9PiB7XG4gICAgICAgIGF4aW9zSW5zdGFuY2UucHV0KHVybCwgZGF0YSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgICAgICByZXNvbHZlKHJlcy5kYXRhKVxuICAgICAgICB9LHJlamVjdClcbiAgICB9KVxufVxuZXhwb3J0IGNvbnN0IEFQSV9ERUxFVEUgPSAodXJsKSA9PiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLHJlamVjdCkgPT4ge1xuICAgICAgICBheGlvc0luc3RhbmNlLmRlbGV0ZSh1cmwpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICAgICAgcmVzb2x2ZShyZXMuZGF0YSlcbiAgICAgICAgfSxyZWplY3QpXG4gICAgfSlcbn0iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5jb25zdCBJZnJhbVN0eWxlID0ge1xuICAgIHdpZHRoOiAnMTAwJScsXG4gICAgaGVpZ2h0OiAnY2FsYygxMDB2aCAtIDYwcHgpJ1xufVxuXG5cbmNsYXNzIENoYXRWaWV3IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcblxuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhdGljIGNvbnRleHRUeXBlcyA9IHtcbiAgICAgICAgcm91dGVyOiAoKSA9PiBudWxsXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxvY2F0aW9uU2VsZWN0b3JcIj5cbiAgICAgICAgICAgICAgICA8aWZyYW1lIHNyYz1cImh0dHA6Ly9jaGF0Ym90LnBvbGljeWJhemFhci5jb20vbGl2ZWNoYXRcIiBzdHlsZT17SWZyYW1TdHlsZX0+PC9pZnJhbWU+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgQ2hhdFZpZXdcbiIsImltcG9ydCBDaGF0VmlldyBmcm9tICcuL0NoYXRWaWV3LmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBDaGF0VmlldyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCBMb2NhdGlvblNlYXJjaEljb24gZnJvbSAnbWF0ZXJpYWwtdWktaWNvbnMvTG9jYXRpb25TZWFyY2hpbmcnO1xuXG5cbmNsYXNzIExvY2F0aW9uU2VsZWN0b3IgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgICAgICB0aGlzLnN0YXRlID0ge1xuXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdGF0aWMgY29udGV4dFR5cGVzID0ge1xuICAgICAgICByb3V0ZXI6ICgpID0+IG51bGxcbiAgICB9XG5cbiAgICBnZXRDdXJyZW50TG9jYXRpb24oKSB7XG4gICAgICAgIGlmIChuYXZpZ2F0b3IuZ2VvbG9jYXRpb24pIHtcbiAgICAgICAgICAgIG5hdmlnYXRvci5nZW9sb2NhdGlvbi5nZXRDdXJyZW50UG9zaXRpb24oZnVuY3Rpb24gKHBvc2l0aW9uKSB7XG4gICAgICAgICAgICAgICAgZGVidWdnZXJcbiAgICAgICAgICAgICAgICAvLyBsZXQgZ2VvY29kZXIgPSBuZXcgZ29vZ2xlLm1hcHMuR2VvY29kZXIoKVxuICAgICAgICAgICAgICAgIC8vIGxldCBsYXRsbmcgPSBuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nKC0zMy44NjY1NDMzLCAxNTEuMTk1NjMxNilcbiAgICAgICAgICAgICAgICAvLyBnZW9jb2Rlci5nZW9jb2RlKHtcbiAgICAgICAgICAgICAgICAvLyAgICAgJ2xhdExuZyc6IGxhdGxuZ1xuICAgICAgICAgICAgICAgIC8vIH0sIGZ1bmN0aW9uIChyZXN1bHRzLCBzdGF0dXMpIHtcbiAgICAgICAgICAgICAgICAvLyAgICAgZGVidWdnZXJcbiAgICAgICAgICAgICAgICAvLyB9KVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgbGV0IGFkZHJlc3MgPSAnU2VsZWN0IExvY2F0aW9uJ1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5zZWxlY3RlZExvY2F0aW9uICYmIHRoaXMucHJvcHMuc2VsZWN0ZWRMb2NhdGlvbi5mb3JtYXR0ZWRfYWRkcmVzcykge1xuICAgICAgICAgICAgYWRkcmVzcyA9IHRoaXMucHJvcHMuc2VsZWN0ZWRMb2NhdGlvbi5mb3JtYXR0ZWRfYWRkcmVzc1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibG9jYXRpb25TZWxlY3RvclwiPlxuICAgICAgICAgICAgICAgIDxpbnB1dCBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGV4dC5yb3V0ZXIuaGlzdG9yeS5wdXNoKCcvbG9jYXRpb25zZWFyY2gnKVxuICAgICAgICAgICAgICAgIH19IHBsYWNlaG9sZGVyPXthZGRyZXNzfSAvPlxuICAgICAgICAgICAgICAgIDxMb2NhdGlvblNlYXJjaEljb24gY2xhc3NOYW1lPVwiY3VycmVudExvY2F0aW9uXCIgb25DbGljaz17dGhpcy5nZXRDdXJyZW50TG9jYXRpb24uYmluZCh0aGlzKX0gLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBMb2NhdGlvblNlbGVjdG9yXG4iLCJpbXBvcnQgTG9jYXRpb25TZWxlY3RvciBmcm9tICcuL0xvY2F0aW9uU2VsZWN0b3IuanMnXG5cblxuZXhwb3J0IGRlZmF1bHQgTG9jYXRpb25TZWxlY3RvciIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgRW1vdGlJY29uIGZyb20gJ21hdGVyaWFsLXVpLWljb25zL0FjY291bnRDaXJjbGUnO1xuXG5jbGFzcyBQcm9maWxlU2xpZGVyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICB9XG5cbiAgICBzd2l0Y2hVc2VyKHByb2ZpbGVJZCkge1xuICAgICAgICB0aGlzLmNvbnRleHQucm91dGVyLmhpc3RvcnkucHVzaChgL3VzZXIvJHtwcm9maWxlSWR9JHt0aGlzLnByb3BzLnN1YlJvdXRlfWApXG5cbiAgICB9XG5cbiAgICBzdGF0aWMgY29udGV4dFR5cGVzID0ge1xuICAgICAgICByb3V0ZXI6ICgpID0+IG51bGxcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgbGV0IHByb2ZpbGVzID0gW11cblxuICAgICAgICBwcm9maWxlcyA9IE9iamVjdC5rZXlzKHRoaXMucHJvcHMucHJvZmlsZXMpLm1hcCgocHJvZmlsZUlkLCBpKSA9PiB7XG4gICAgICAgICAgICBsZXQgc3JjID0gdGhpcy5wcm9wcy5wcm9maWxlc1twcm9maWxlSWRdLnByb2ZpbGVJbWFnZSB8fCBcImh0dHBzOi8vd3d3LmF0b21peC5jb20uYXUvbWVkaWEvMjAxNS8wNi9hdG9taXhfdXNlcjMxLnBuZ1wiXG4gICAgICAgICAgICByZXR1cm4gPGRpdiBrZXk9e2l9IGNsYXNzTmFtZT1cInNsaWRlVGlsZVwiIG9uQ2xpY2s9e3RoaXMuc3dpdGNoVXNlci5iaW5kKHRoaXMsIHByb2ZpbGVJZCl9PlxuICAgICAgICAgICAgICAgIDxpbWcgY2xhc3NOYW1lPVwicHJvZmlsZUNhcmRJbWFnZVwiIHNyYz17c3JjfS8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgfSlcblxuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInByb2ZpbGVTbGlkZXJcIj5cbiAgICAgICAgICAgICAgICB7cHJvZmlsZXN9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgUHJvZmlsZVNsaWRlclxuIiwiaW1wb3J0IFByb2ZpbGVTbGlkZXIgZnJvbSAnLi9Qcm9maWxlU2xpZGVyLmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBQcm9maWxlU2xpZGVyIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IHsgZ2V0VGltZSwgZ2V0RGF5TmFtZSB9IGZyb20gJy4uLy4uLy4uL3V0aWxzL2RhdGVUaW1lVXRpbHMuanMnXG5cbmNsYXNzIFRpbWVTbG90U2VsZWN0b3IgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgc2VsZWN0ZWREYXk6IDAsXG4gICAgICAgICAgICBzZWxlY3RlZEludGVydmFsOiAwLFxuICAgICAgICAgICAgc2VsZWN0ZWRUaW1lU2xvdDogMFxuXG4gICAgICAgIH1cbiAgICB9XG4gICAgY29tcG9uZW50V2lsbE1vdW50KCkge1xuICAgICAgICBsZXQgdGltZVNsb3RzID0gdGhpcy5wcm9wcy50aW1lU2xvdHM7XG5cbiAgICAgICAgdGhpcy5zZXREZWZhdWx0U2VsZWN0ZWQodGltZVNsb3RzKTtcblxuICAgIH1cbiAgICBzZXREZWZhdWx0U2VsZWN0ZWQodGltZVNsb3RzKSB7XG4gICAgICAgIGxldCBkYXlzID0gdGltZVNsb3RzLmRhdGVzO1xuICAgICAgICBsZXQgZGVmYXVsdERheUluZGV4ID0gdGhpcy5nZXRGaXJzdEF2YWlsYWJsZURheShkYXlzKTtcbiAgICAgICAgXG4gICAgICAgIGlmIChkZWZhdWx0RGF5SW5kZXggfHwgZGVmYXVsdERheUluZGV4ID09PSAwKSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgc2VsZWN0ZWREYXk6IGRlZmF1bHREYXlJbmRleCB9KTtcbiAgICAgICAgICAgIHZhciBkZWZhdXRJbnRlcndhbEluZGV4ID0gdGhpcy5nZXRGaXJzdEF2YWlsYWJsZUludGVyd2FsKGRheXNbZGVmYXVsdERheUluZGV4XS5pbnRlcnZhbHMpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkZWZhdXRJbnRlcndhbEluZGV4IHx8IGRlZmF1dEludGVyd2FsSW5kZXggPT09IDApIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBzZWxlY3RlZEludGVydmFsOiBkZWZhdXRJbnRlcndhbEluZGV4IH0pO1xuICAgICAgICAgICAgdmFyIGRlZmF1bHRUaW1lU2xvdEluZGV4ID0gdGhpcy5nZXRGaXJzdEF2YWlsYWJsZVRpbWVTbG90KGRheXNbZGVmYXVsdERheUluZGV4XS5pbnRlcnZhbHNbZGVmYXV0SW50ZXJ3YWxJbmRleF0udGltZVNsb3RzKTtcblxuICAgICAgICB9XG4gICAgICAgIGlmIChkZWZhdWx0VGltZVNsb3RJbmRleCB8fCBkZWZhdWx0VGltZVNsb3RJbmRleCA9PT0gMCkge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHNlbGVjdGVkVGltZVNsb3Q6IGRlZmF1bHRUaW1lU2xvdEluZGV4IH0pO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBnZXRGaXJzdEF2YWlsYWJsZUludGVyd2FsKGludGVydmFscykge1xuXG4gICAgICAgIGZvciAobGV0IGludGVyd2FsSW5kZXggaW4gaW50ZXJ2YWxzKSB7XG4gICAgICAgICAgICBsZXQgaW50ZXJ3YWwgPSBpbnRlcnZhbHNbaW50ZXJ3YWxJbmRleF07XG4gICAgICAgICAgICBpZiAoaW50ZXJ3YWwgJiYgaW50ZXJ3YWwuaXNBdmFpbGFibGUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcGFyc2VJbnQoaW50ZXJ3YWxJbmRleCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRGaXJzdEF2YWlsYWJsZVRpbWVTbG90KHRpbWVTbG90cykge1xuXG4gICAgICAgIGZvciAobGV0IHRpbWVTbG90SW5kZXggaW4gdGltZVNsb3RzKSB7XG4gICAgICAgICAgICBsZXQgdGltZVNsb3QgPSB0aW1lU2xvdHNbdGltZVNsb3RJbmRleF07XG4gICAgICAgICAgICBpZiAodGltZVNsb3QgJiYgdGltZVNsb3QuaXNBdmFpbGFibGUpIHtcbiAgICAgICAgICAgICAgICAvLyBjYWxsaW5nIHBhcmVudCB0aW1lU2xvdCBzZXR0ZXJcbiAgICAgICAgICAgICAgICB0aGlzLnByb3BzLnNlbGVjdFRpbWVTbG90KHRpbWVTbG90KVxuICAgICAgICAgICAgICAgIHJldHVybiBwYXJzZUludCh0aW1lU2xvdEluZGV4KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIFxuXG4gICAgfVxuXG4gICAgZ2V0Rmlyc3RBdmFpbGFibGVEYXkoZGF5cykge1xuXG4gICAgICAgIGZvciAobGV0IGRheUluZGV4IGluIGRheXMpIHtcbiAgICAgICAgICAgIGxldCBkYXkgPSBkYXlzW2RheUluZGV4XTtcbiAgICAgICAgICAgIGlmIChkYXkgJiYgZGF5LmlzQXZhaWxhYmxlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBhcnNlSW50KGRheUluZGV4KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBvbkRhdGVDbGljayhkYXRlLCBzZWxlY3RlZEluZGV4LCBpbmRleCkge1xuXG4gICAgICAgIGlmIChzZWxlY3RlZEluZGV4ICE9PSBpbmRleCAmJiBkYXRlLmlzQXZhaWxhYmxlKSB7XG4gICAgICAgICAgICB2YXIgYXZhaWxhYmxlSW50ZXJ3YWwgPSB0aGlzLmdldEZpcnN0QXZhaWxhYmxlSW50ZXJ3YWwoZGF0ZS5pbnRlcnZhbHMpXG4gICAgICAgICAgICBpZiAoYXZhaWxhYmxlSW50ZXJ3YWwgfHwgYXZhaWxhYmxlSW50ZXJ3YWwgPT09IDApIHtcbiAgICAgICAgICAgICAgICBsZXQgdGltZVNsb3RzID0gZGF0ZS5pbnRlcnZhbHNbYXZhaWxhYmxlSW50ZXJ3YWxdLnRpbWVTbG90cztcbiAgICAgICAgICAgICAgICB2YXIgYXZhaWxhYmxlVGltZVNsb3QgPSB0aGlzLmdldEZpcnN0QXZhaWxhYmxlVGltZVNsb3QodGltZVNsb3RzKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHNlbGVjdGVkRGF5OiBpbmRleCwgc2VsZWN0ZWRJbnRlcnZhbDogYXZhaWxhYmxlSW50ZXJ3YWwsIHNlbGVjdGVkVGltZVNsb3Q6IGF2YWlsYWJsZVRpbWVTbG90IH0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIG9uSW50ZXJ2YWxDbGljayhpbnRlcndhbCwgc2VsZWN0ZWRJbmRleCwgaW5kZXgpIHtcblxuXG5cbiAgICAgICAgaWYgKHNlbGVjdGVkSW5kZXggIT09IGluZGV4ICYmIGludGVyd2FsLmlzQXZhaWxhYmxlKSB7XG4gICAgICAgICAgICBsZXQgdGltZVNsb3RzID0gaW50ZXJ3YWwudGltZVNsb3RzO1xuICAgICAgICAgICAgdmFyIGF2YWlsYWJsZVRpbWVTbG90ID0gdGhpcy5nZXRGaXJzdEF2YWlsYWJsZVRpbWVTbG90KHRpbWVTbG90cyk7XG5cblxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHNlbGVjdGVkSW50ZXJ2YWw6IGluZGV4LCBzZWxlY3RlZFRpbWVTbG90OiBhdmFpbGFibGVUaW1lU2xvdCB9KTtcbiAgICAgICAgfVxuXG4gICAgfVxuICAgIG9uVGltZVNsb3RDbGljayh0aW1lU2xvdCwgc2VsZWN0ZWRJbmRleCwgaW5kZXgpIHtcblxuICAgICAgICBpZiAoc2VsZWN0ZWRJbmRleCAhPT0gaW5kZXggJiYgdGltZVNsb3QuaXNBdmFpbGFibGUpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBzZWxlY3RlZFRpbWVTbG90OiBpbmRleCB9KTtcbiAgICAgICAgICAgIC8vIGNhbGxpbmcgcGFyZW50IHRpbWVTbG90IHNldHRlclxuICAgICAgICAgICAgdGhpcy5wcm9wcy5zZWxlY3RUaW1lU2xvdCh0aW1lU2xvdClcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICBsZXQgeyBkYXRlcyB9ID0gdGhpcy5wcm9wcy50aW1lU2xvdHNcblxuICAgICAgICBsZXQgaW50ZXJ2YWxzID0gW11cbiAgICAgICAgbGV0IHRpbWVTbG90cyA9IFtdXG4gICAgICAgIGxldCBkYXRlTGlzdCA9IFtdXG5cblxuICAgICAgICBkYXRlTGlzdCA9IGRhdGVzLm1hcCgoZGF0ZSwgaSkgPT4ge1xuICAgICAgICAgICAgbGV0IGRheURhdGUgPSBuZXcgRGF0ZShkYXRlLmRhdGUpLmdldERhdGUoKVxuICAgICAgICAgICAgbGV0IGRheU5hbWUgPSBnZXREYXlOYW1lKGRhdGUuZGF0ZSk7XG4gICAgICAgICAgICBsZXQgc2VsZWN0ZWQgPSB0aGlzLnN0YXRlLnNlbGVjdGVkRGF5ID09IGlcbiAgICAgICAgICAgIHJldHVybiA8ZGl2IGtleT17aX0gb25DbGljaz17dGhpcy5vbkRhdGVDbGljay5iaW5kKHRoaXMsIGRhdGUsIHRoaXMuc3RhdGUuc2VsZWN0ZWREYXksIGkpfSBjbGFzc05hbWU9e2RhdGUuaXNBdmFpbGFibGUgPyAoc2VsZWN0ZWQgPyBcImRhdGVUaWxlIHNlbGVjdGVkXCIgOiBcImRhdGVUaWxlXCIpIDogXCJkYXRlVGlsZSBkaXNhYmxlZFwifT5cbiAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJkYXRlXCI+e2RheURhdGV9PC9wPlxuICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cImRheVwiPntkYXlOYW1lfTwvcD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICB9KVxuICAgICAgICBpbnRlcnZhbHMgPSBkYXRlc1t0aGlzLnN0YXRlLnNlbGVjdGVkRGF5XS5pbnRlcnZhbHMubWFwKChpbnRlcnZhbCwgaSkgPT4ge1xuICAgICAgICAgICAgbGV0IHNlbGVjdGVkID0gdGhpcy5zdGF0ZS5zZWxlY3RlZEludGVydmFsID09IGlcbiAgICAgICAgICAgIHJldHVybiA8YnV0dG9uIGtleT17aX0gb25DbGljaz17dGhpcy5vbkludGVydmFsQ2xpY2suYmluZCh0aGlzLCBpbnRlcnZhbCwgdGhpcy5zdGF0ZS5zZWxlY3RlZEludGVydmFsLCBpKX0gY2xhc3NOYW1lPXtpbnRlcnZhbC5pc0F2YWlsYWJsZSA/IChzZWxlY3RlZCA/IFwidHNCdG4gc2VsZWN0ZWRcIiA6IFwidHNCdG5cIikgOiBcInRzQnRuIGRpc2FibGVkXCJ9PntpbnRlcnZhbC5uYW1lfTwvYnV0dG9uPlxuICAgICAgICB9KVxuXG4gICAgICAgIHRpbWVTbG90cyA9IGRhdGVzW3RoaXMuc3RhdGUuc2VsZWN0ZWREYXldLmludGVydmFsc1t0aGlzLnN0YXRlLnNlbGVjdGVkSW50ZXJ2YWxdLnRpbWVTbG90cy5tYXAoKHNsb3QsIGkpID0+IHtcbiAgICAgICAgICAgIGxldCBzZWxlY3RlZCA9IHRoaXMuc3RhdGUuc2VsZWN0ZWRUaW1lU2xvdCA9PSBpXG4gICAgICAgICAgICBsZXQgc2xvdFRleHQgPSBnZXRUaW1lKHNsb3Quc3RhcnQpXG4gICAgICAgICAgICBpZihzbG90LmVuZCl7XG4gICAgICAgICAgICAgICAgc2xvdFRleHQgKz0gYCAtICR7Z2V0VGltZShzbG90LmVuZCl9YFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIDxzcGFuIGtleT17aX0gb25DbGljaz17dGhpcy5vblRpbWVTbG90Q2xpY2suYmluZCh0aGlzLCBzbG90LCB0aGlzLnN0YXRlLnNlbGVjdGVkVGltZVNsb3QsIGkpfSBjbGFzc05hbWU9e3Nsb3QuaXNBdmFpbGFibGUgPyAoc2VsZWN0ZWQgPyBcInNsb3Qgc2VsZWN0ZWRcIiA6IFwic2xvdFwiKSA6IFwic2xvdCBkaXNhYmxlZFwifT57c2xvdFRleHR9PC9zcGFuPlxuICAgICAgICB9KVxuXG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGltZVNsb3RTZWxlY3RvclwiPlxuICAgICAgICAgICAgICAgIDxoNT5TZWxlY3QgcHJlZmZlcmVkIHRpbWUgc2xvdDwvaDU+XG5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImRhdGVDYXJcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzY3JvbGxlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAge2RhdGVMaXN0fVxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGltZVNsb3RzXCI+XG4gICAgICAgICAgICAgICAgICAgIHtpbnRlcnZhbHN9XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic2xvdHNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHt0aW1lU2xvdHN9XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IFRpbWVTbG90U2VsZWN0b3JcbiIsImltcG9ydCBUaW1lU2xvdFNlbGVjdG9yIGZyb20gJy4vVGltZVNsb3RTZWxlY3Rvci5qcydcblxuZXhwb3J0IGRlZmF1bHQgVGltZVNsb3RTZWxlY3RvciIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCBQcm9maWxlU2xpZGVyIGZyb20gJy4uL3Byb2ZpbGVTbGlkZXIvaW5kZXguanMnXG5pbXBvcnQgQXBwb2ludG1lbnRMaXN0IGZyb20gJy4vYXBwb2ludG1lbnRMaXN0L2luZGV4LmpzJ1xuXG5jbGFzcyBVc2VyQXBwb2ludG1lbnRzVmlldyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG5cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgICB0aGlzLnByb3BzLmdldFVzZXJQcm9maWxlV2l0aEFwcG9pbnRtZW50cygpXG4gICAgfVxuXG4gICAgc3RhdGljIGNvbnRleHRUeXBlcyA9IHtcbiAgICAgICAgcm91dGVyOiAoKSA9PiBudWxsXG4gICAgfVxuXG4gICAgY29tcGFyZURhdGVXaXRoVG9kYXkoZGF0ZSl7XG4gICAgICAgIGxldCB0b2RheSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpXG4gICAgICAgIGRhdGUgPSBuZXcgRGF0ZShkYXRlKS5nZXRUaW1lKClcbiAgICAgICAgcmV0dXJuIHRvZGF5ID4gZGF0ZVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICBsZXQgc2VsZWN0ZWRVc2VyID0gbnVsbFxuICAgICAgICBsZXQgdXNlclByb2ZpbGVJZCA9IHRoaXMucHJvcHMubWF0Y2gucGFyYW1zLmlkXG5cbiAgICAgICAgaWYgKHRoaXMucHJvcHMuVVNFUi5wcm9maWxlc1t1c2VyUHJvZmlsZUlkXSkge1xuICAgICAgICAgICAgc2VsZWN0ZWRVc2VyID0gdGhpcy5wcm9wcy5VU0VSLnByb2ZpbGVzW3VzZXJQcm9maWxlSWRdXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBPYmplY3Qua2V5cyh0aGlzLnByb3BzLlVTRVIucHJvZmlsZXMpLm1hcCgocHJvZmlsZUlkKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucHJvcHMuVVNFUi5wcm9maWxlc1twcm9maWxlSWRdLmlzRGVmYXVsdFVzZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRVc2VyID0gdGhpcy5wcm9wcy5VU0VSLnByb2ZpbGVzW3Byb2ZpbGVJZF1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidXNlclByb2ZpbGVcIj5cbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICggc2VsZWN0ZWRVc2VyICYmIHNlbGVjdGVkVXNlci5hcHBvaW50bWVudHMgKSA/IDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8UHJvZmlsZVNsaWRlclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb2ZpbGVzPXt0aGlzLnByb3BzLlVTRVIucHJvZmlsZXN9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3ViUm91dGU9XCIvYXBwb2ludG1lbnRzXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ1cGNvbWluZ2FwcFwiPlVwY29taW5nIE9QRCBBcHBvaW50bWVudHM8L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRVc2VyLmFwcG9pbnRtZW50cy5maWx0ZXIoKGFwcG9pbnRtZW50LGkpID0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZGF0ZSA9IGFwcG9pbnRtZW50LnNsb3QgPyBhcHBvaW50bWVudC5zbG90LnN0YXJ0IDogMFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gIXRoaXMuY29tcGFyZURhdGVXaXRoVG9kYXkoZGF0ZSkgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkubWFwKChhcHBvaW50bWVudCwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDxBcHBvaW50bWVudExpc3Qga2V5PXtpbmRleH0gZGF0YT17YXBwb2ludG1lbnR9IC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInByZXZhcHBcIj5QcmV2aW91cyBPUEQgQXBwb2ludG1lbnRzPC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkVXNlci5hcHBvaW50bWVudHMuZmlsdGVyKChhcHBvaW50bWVudCxpKSA9PntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGRhdGUgPSBhcHBvaW50bWVudC5zbG90ID8gYXBwb2ludG1lbnQuc2xvdC5zdGFydCA6IDBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY29tcGFyZURhdGVXaXRoVG9kYXkoZGF0ZSkgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkubWFwKChhcHBvaW50bWVudCwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDxBcHBvaW50bWVudExpc3Qga2V5PXtpbmRleH0gZGF0YT17YXBwb2ludG1lbnR9IC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+IDogXCJcIlxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IFVzZXJBcHBvaW50bWVudHNWaWV3XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFJpZ2h0QXJyb3dJY29uIGZyb20gJ21hdGVyaWFsLXVpLWljb25zL0tleWJvYXJkQXJyb3dSaWdodCc7XG5cbmNsYXNzIEFwcG9pbnRtZW50TGlzdCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgfVxuXG4gICAgZ2V0VGltZSh1bml4X3RpbWVzdGFtcCkge1xuICAgICAgICB2YXIgZGF0ZSA9IG5ldyBEYXRlKHVuaXhfdGltZXN0YW1wICogMTAwMCk7XG4gICAgICAgIHZhciBob3VycyA9IGRhdGUuZ2V0SG91cnMoKTtcbiAgICAgICAgdmFyIG1pbnV0ZXMgPSBcIjBcIiArIGRhdGUuZ2V0TWludXRlcygpO1xuICAgICAgICByZXR1cm4gaG91cnMgKyAnOicgKyBtaW51dGVzLnN1YnN0cigtMilcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgbGV0IHsgZG9jdG9yTmFtZSwgc2xvdCB9ID0gdGhpcy5wcm9wcy5kYXRhXG4gICAgICAgIHNsb3QgPSBzbG90IHx8IHtcbiAgICAgICAgICAgIHN0YXJ0OiAwLFxuICAgICAgICAgICAgZW5kOiAwXG4gICAgICAgIH1cbiAgICAgICAgbGV0IGRhdGUgPSBuZXcgRGF0ZShzbG90LnN0YXJ0KS50b0RhdGVTdHJpbmcoKVxuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFwcG9pbnRtZW50XCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJuYW1lXCI+XG5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImRldGFpbHNcIj5cbiAgICAgICAgICAgICAgICAgICAgPHA+XG4gICAgICAgICAgICAgICAgICAgICAgICB7ZG9jdG9yTmFtZX1cbiAgICAgICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtkYXRlfVxuICAgICAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgICAgIDxwPlxuICAgICAgICAgICAgICAgICAgICAgICAge3RoaXMuZ2V0VGltZShzbG90LnN0YXJ0KSArIFwiIHRvIFwiICsgdGhpcy5nZXRUaW1lKHNsb3QuZW5kKX1cbiAgICAgICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYm9va1wiPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0XCI+VmlldyBDb25maXJtYXRpb248L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDxSaWdodEFycm93SWNvbiBjbGFzc05hbWU9XCJib29rSWNvblwiIC8+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgQXBwb2ludG1lbnRMaXN0XG4iLCJpbXBvcnQgQXBwb2ludG1lbnRMaXN0IGZyb20gJy4vQXBwb2ludG1lbnRMaXN0LmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBBcHBvaW50bWVudExpc3QiLCJpbXBvcnQgVXNlckFwcG9pbnRtZW50c1ZpZXcgZnJvbSAnLi9Vc2VyQXBwb2ludG1lbnRzVmlldy5qcydcblxuZXhwb3J0IGRlZmF1bHQgVXNlckFwcG9pbnRtZW50c1ZpZXciLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgUHJvZmlsZVNsaWRlciBmcm9tICcuLi9wcm9maWxlU2xpZGVyL2luZGV4LmpzJ1xuaW1wb3J0IFByb2ZpbGVEYXRhIGZyb20gJy4vcHJvZmlsZURhdGEvaW5kZXguanMnXG5cbmNsYXNzIFVzZXJQcm9maWxlVmlldyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG5cbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgdGhpcy5wcm9wcy5nZXRVc2VyUHJvZmlsZSgpXG4gICAgfVxuXG4gICAgc3RhdGljIGNvbnRleHRUeXBlcyA9IHtcbiAgICAgICAgcm91dGVyOiAoKSA9PiBudWxsXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIGxldCBzZWxlY3RlZFVzZXIgPSBudWxsXG4gICAgICAgIGxldCB1c2VyUHJvZmlsZUlkID0gdGhpcy5wcm9wcy5tYXRjaC5wYXJhbXMuaWRcblxuICAgICAgICBpZiAodGhpcy5wcm9wcy5VU0VSLnByb2ZpbGVzW3VzZXJQcm9maWxlSWRdKSB7XG4gICAgICAgICAgICBzZWxlY3RlZFVzZXIgPSB0aGlzLnByb3BzLlVTRVIucHJvZmlsZXNbdXNlclByb2ZpbGVJZF1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIE9iamVjdC5rZXlzKHRoaXMucHJvcHMuVVNFUi5wcm9maWxlcykubWFwKChwcm9maWxlSWQpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5wcm9wcy5VU0VSLnByb2ZpbGVzW3Byb2ZpbGVJZF0uaXNEZWZhdWx0VXNlcikge1xuICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZFVzZXIgPSB0aGlzLnByb3BzLlVTRVIucHJvZmlsZXNbcHJvZmlsZUlkXVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInVzZXJQcm9maWxlXCI+XG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZFVzZXIgPyA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPFByb2ZpbGVTbGlkZXIgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvZmlsZXM9e3RoaXMucHJvcHMuVVNFUi5wcm9maWxlc31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWJSb3V0ZT1cIlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPFByb2ZpbGVEYXRhIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb2ZpbGVEYXRhPXtzZWxlY3RlZFVzZXJ9XG4gICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj4gOiBcIlwiXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgVXNlclByb2ZpbGVWaWV3XG4iLCJpbXBvcnQgVXNlclByb2ZpbGVWaWV3IGZyb20gJy4vVXNlclByb2ZpbGVWaWV3LmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBVc2VyUHJvZmlsZVZpZXciLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5jbGFzcyBQcm9maWxlRGF0YSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgfVxuXG4gICAgb3BlbkFwcG9pbnRtZW50cyhwcm9maWxlSWQpIHtcbiAgICAgICAgdGhpcy5jb250ZXh0LnJvdXRlci5oaXN0b3J5LnB1c2goYC91c2VyLyR7cHJvZmlsZUlkfS9hcHBvaW50bWVudHNgKVxuXG4gICAgfVxuXG4gICAgb3BlblJlcG9ydHMocHJvZmlsZUlkKSB7XG4gICAgICAgIHRoaXMuY29udGV4dC5yb3V0ZXIuaGlzdG9yeS5wdXNoKGAvdXNlci8ke3Byb2ZpbGVJZH0vcmVwb3J0c2ApXG5cbiAgICB9XG5cbiAgICBzdGF0aWMgY29udGV4dFR5cGVzID0ge1xuICAgICAgICByb3V0ZXI6ICgpID0+IG51bGxcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgbGV0IHtuYW1lLCBnZW5kZXIsIGFnZSwgbW9iaWxlLCBtZWRpY2FsSGlzdG9yeUNvdW50LCBtZWRpY2FsVGVzdENvdW50LCBvbmxpbmVDb25zdWx0YXRpb25Db3VudCwgb3BkVmlzaXRDb3VudCwgcHJvZmlsZUlkfSA9IHRoaXMucHJvcHMucHJvZmlsZURhdGFcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdj4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ1c2VyRGVhaWxcIj5cbiAgICAgICAgICAgICAgICAgICAgPHA+e25hbWV9PC9wPlxuICAgICAgICAgICAgICAgICAgICA8cD57YWdlfSBZZWFyczwvcD5cbiAgICAgICAgICAgICAgICAgICAgPHA+e2dlbmRlcn08L3A+XG4gICAgICAgICAgICAgICAgICAgIDxwPnttb2JpbGV9PC9wPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicHJvZmlsZUJ0bnNcIj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbj5Qcm9maWxlIE5vdCBWZXJpZmllZDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uPk5vIE9QRCBJbnN1cmFuY2U8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbj5PbmxpbmUgQ29uc3VsdGF0aW9ucyh7b25saW5lQ29uc3VsdGF0aW9uQ291bnR9KTwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9e3RoaXMub3BlbkFwcG9pbnRtZW50cy5iaW5kKHRoaXMscHJvZmlsZUlkKX0+T1BEIFZpc2l0cyAoe29wZFZpc2l0Q291bnR9KTwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uPk1lZGljYWwgSGlzdG9yeSAoe21lZGljYWxIaXN0b3J5Q291bnR9KTwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9e3RoaXMub3BlblJlcG9ydHMuYmluZCh0aGlzLHByb2ZpbGVJZCl9PlRlc3QgUmVwb3J0cyAoe21lZGljYWxUZXN0Q291bnR9KTwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IFByb2ZpbGVEYXRhXG4iLCJpbXBvcnQgUHJvZmlsZURhdGEgZnJvbSAnLi9Qcm9maWxlRGF0YS5qcydcblxuZXhwb3J0IGRlZmF1bHQgUHJvZmlsZURhdGEiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgUHJvZmlsZVNsaWRlciBmcm9tICcuLi9wcm9maWxlU2xpZGVyL2luZGV4LmpzJ1xuaW1wb3J0IFJlcG9ydExpc3QgZnJvbSAnLi9yZXBvcnRMaXN0L2luZGV4LmpzJ1xuXG5jbGFzcyBVc2VyUmVwb3J0c1ZpZXcgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgICAgICB0aGlzLnN0YXRlID0ge1xuXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgdGhpcy5wcm9wcy5nZXRVc2VyUHJvZmlsZVdpdGhUZXN0cygpXG4gICAgfVxuXG4gICAgc3RhdGljIGNvbnRleHRUeXBlcyA9IHtcbiAgICAgICAgcm91dGVyOiAoKSA9PiBudWxsXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIGxldCBzZWxlY3RlZFVzZXIgPSBudWxsXG4gICAgICAgIGxldCB1c2VyUHJvZmlsZUlkID0gdGhpcy5wcm9wcy5tYXRjaC5wYXJhbXMuaWRcblxuICAgICAgICBpZiAodGhpcy5wcm9wcy5VU0VSLnByb2ZpbGVzW3VzZXJQcm9maWxlSWRdKSB7XG4gICAgICAgICAgICBzZWxlY3RlZFVzZXIgPSB0aGlzLnByb3BzLlVTRVIucHJvZmlsZXNbdXNlclByb2ZpbGVJZF1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIHNlbGVjdGluZyBkZWZhdWx0IHVzZXJcbiAgICAgICAgICAgIE9iamVjdC5rZXlzKHRoaXMucHJvcHMuVVNFUi5wcm9maWxlcykubWFwKChwcm9maWxlSWQpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5wcm9wcy5VU0VSLnByb2ZpbGVzW3Byb2ZpbGVJZF0uaXNEZWZhdWx0VXNlcikge1xuICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZFVzZXIgPSB0aGlzLnByb3BzLlVTRVIucHJvZmlsZXNbcHJvZmlsZUlkXVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ1c2VyUHJvZmlsZVwiPlxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgKHNlbGVjdGVkVXNlciAmJiBzZWxlY3RlZFVzZXIudGVzdHMpID8gPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxQcm9maWxlU2xpZGVyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvZmlsZXM9e3RoaXMucHJvcHMuVVNFUi5wcm9maWxlc31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWJSb3V0ZT1cIi9yZXBvcnRzXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ1cGNvbWluZ2FwcFwiPlJlcG9ydHM8L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRVc2VyLnRlc3RzLm1hcCgodGVzdCwgaSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gPFJlcG9ydExpc3RcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE9e3Rlc3R9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk9e2l9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj4gOiBcIlwiXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgVXNlclJlcG9ydHNWaWV3XG4iLCJpbXBvcnQgVXNlclJlcG9ydHNWaWV3IGZyb20gJy4vVXNlclJlcG9ydHNWaWV3LmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBVc2VyUmVwb3J0c1ZpZXciLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5jbGFzcyBSZXBvcnRMaXN0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICB9XG5cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICBsZXQgeyBuYW1lLCBzdWJfbmFtZSwgYWJicmV2aWF0aW9uLCBjYXRlZ29yeSwgc2xvdCAgfSA9IHRoaXMucHJvcHMuZGF0YVxuICAgICAgICBzbG90ID0gc2xvdCB8fCB7XG4gICAgICAgICAgICBzdGFydDogMCxcbiAgICAgICAgICAgIGVuZDogMFxuICAgICAgICB9XG4gICAgICAgIGxldCBkYXRlID0gbmV3IERhdGUoc2xvdC5zdGFydCkudG9EYXRlU3RyaW5nKClcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhcHBvaW50bWVudFwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZGV0YWlsc1wiPlxuICAgICAgICAgICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtuYW1lICsgXCIgLCBcIiArIHN1Yl9uYW1lfVxuICAgICAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgICAgIDxwPlxuICAgICAgICAgICAgICAgICAgICAgICAge2NhdGVnb3J5ICsgXCIgLCBcIiArIGFiYnJldmlhdGlvbn1cbiAgICAgICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtkYXRlfVxuICAgICAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJib29rXCI+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInZpZXdyZXBvcnRcIj5WaWV3IFJlcG9ydDwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBSZXBvcnRMaXN0XG4iLCJpbXBvcnQgUmVwb3J0TGlzdCBmcm9tICcuL1JlcG9ydExpc3QuanMnXG5cbmV4cG9ydCBkZWZhdWx0IFJlcG9ydExpc3QiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcblxuaW1wb3J0IExhYkRldGFpbHMgZnJvbSAnLi4vY29tbW9ucy9sYWJEZXRhaWxzL2luZGV4LmpzJ1xuaW1wb3J0IE9yZGVyRGV0YWlscyBmcm9tICcuLi9jb21tb25zL29yZGVyRGV0YWlscy9pbmRleC5qcydcblxuY2xhc3MgQm9va2luZ1N1bW1hcnlWaWV3IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIGJvb2tpbmdJZDogbnVsbCxcbiAgICAgICAgICAgIGJvb2tpbmdEZXRhaWxzOiBudWxsXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRMb2NhdGlvblBhcmFtKHRhZykge1xuICAgICAgICAvLyB0aGlzIEFQSSBhc3N1bWVzIHRoZSBjb250ZXh0IG9mIHJlYWN0LXJvdXRlci00XG4gICAgICAgIGNvbnN0IHBhcmFtU3RyaW5nID0gdGhpcy5wcm9wcy5sb2NhdGlvbi5zZWFyY2hcbiAgICAgICAgY29uc3QgcGFyYW1zID0gbmV3IFVSTFNlYXJjaFBhcmFtcyhwYXJhbVN0cmluZylcbiAgICAgICAgcmV0dXJuIHBhcmFtcy5nZXQodGFnKVxuICAgIH1cblxuICAgIHByb2NlZWQoKSB7XG4gICAgICAgIHRoaXMuY29udGV4dC5yb3V0ZXIuaGlzdG9yeS5wdXNoKCcvcGF5bWVudCcpXG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIGxldCBib29raW5nSWQgPSB0aGlzLnByb3BzLm1hdGNoLnBhcmFtcy5pZFxuICAgICAgICBpZiAoYm9va2luZ0lkKSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgYm9va2luZ0lkIH0pXG4gICAgICAgICAgICB0aGlzLnByb3BzLmdldExhYkJvb2tpbmdTdW1tYXJ5KGJvb2tpbmdJZCwgKGJvb2tpbmdEZXRhaWxzKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGJvb2tpbmdEZXRhaWxzOiBib29raW5nRGV0YWlscy5kYXRhIH0pXG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhdGljIGNvbnRleHRUeXBlcyA9IHtcbiAgICAgICAgcm91dGVyOiAoKSA9PiBudWxsXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBhdGllbnREZXRhaWxzXCI+XG5cbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUuYm9va2luZ0RldGFpbHMgP1xuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdj5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxMYWJEZXRhaWxzIGRhdGE9e3RoaXMuc3RhdGUuYm9va2luZ0RldGFpbHMubGFifSAvPlxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzZWxlY3RlZEFwcG9pbnRtZW50U2xvdFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDU+U2VsZWN0ZWQgQXBwb2ludG1lbnQgU2xvdDwvaDU+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImFwcGRhdGVcIj5BcHBvaW50bWVudCBEYXRlPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJkYXRlXCI+e3RoaXMuc3RhdGUuYm9va2luZ0RldGFpbHMuc2VsZWN0ZWRTbG90U3RhcnR9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzZWxlY3RlZEFwcG9pbnRtZW50U2xvdFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7d2lkdGg6JzEwMCUnLCBmbG9hdDonbGVmdCd9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImFwcGRhdGVcIj5QYXRpZW50IE5hbWU8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJkYXRlXCI+e3RoaXMuc3RhdGUuYm9va2luZ0RldGFpbHMucGF0aWVudERldGFpbHMubmFtZX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7d2lkdGg6JzEwMCUnLCBmbG9hdDonbGVmdCd9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImFwcGRhdGVcIj5QYXRpZW50IEFkZHJlc3M8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJkYXRlXCI+e3RoaXMuc3RhdGUuYm9va2luZ0RldGFpbHMucGF0aWVudERldGFpbHMuYWRkcmVzc308L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPE9yZGVyRGV0YWlscyBkYXRhPXt0aGlzLnN0YXRlLmJvb2tpbmdEZXRhaWxzLmxhYn0gLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cInByb2NlZWRidG5cIiBvbkNsaWNrPXt0aGlzLnByb2NlZWQuYmluZCh0aGlzKX0+UHJvY2VlZCB0byBQYXltZW50PC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj4gOiBcIlwiXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgQm9va2luZ1N1bW1hcnlWaWV3XG4iLCJpbXBvcnQgQm9va2luZ1N1bW1hcnlWaWV3IGZyb20gJy4vQm9va2luZ1N1bW1hcnlWaWV3LmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBCb29raW5nU3VtbWFyeVZpZXciLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgQ2hpcCBmcm9tICdtYXRlcmlhbC11aS9DaGlwJztcblxuXG5jbGFzcyBDb21tb25seVNlYXJjaGVkIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcblxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIGxldCByb3dzID0gdGhpcy5wcm9wcy5kYXRhLm1hcCgocm93KSA9PiB7XG4gICAgICAgICAgICBsZXQgc2VsZWN0ZWQgPSAhIXRoaXMucHJvcHMuc2VsZWN0ZWRbcm93LmlkXVxuICAgICAgICAgICAgcmV0dXJuIDxzcGFuXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtzZWxlY3RlZCA/IFwidGVzdFJvdyBzZWxlY3RlZFwiIDogXCJ0ZXN0Um93XCJ9XG4gICAgICAgICAgICAgICAga2V5PXtyb3cuaWR9XG4gICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy50b2dnbGVSb3cocm93LmlkKVxuICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwiaGVhZFwiPntyb3cubmFtZX08L3A+XG4gICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwic3ViXCI+e3Jvdy5uYW1lfTwvcD5cbiAgICAgICAgICAgIDwvc3Bhbj5cblxuICAgICAgICB9KVxuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbW1vbmx5U2VhcmNoZWRcIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJoZWFkaW5nXCI+e3RoaXMucHJvcHMuaGVhZGluZ308L3NwYW4+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dzXCI+XG4gICAgICAgICAgICAgICAgICAgIHtyb3dzfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IENvbW1vbmx5U2VhcmNoZWRcbiIsImltcG9ydCBDb21tb25seVNlYXJjaGVkIGZyb20gJy4vQ29tbW9ubHlTZWFyY2hlZC5qcydcblxuXG5leHBvcnQgZGVmYXVsdCBDb21tb25seVNlYXJjaGVkIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IENoaXAgZnJvbSAnbWF0ZXJpYWwtdWkvQ2hpcCc7XG5cbmNsYXNzIENyaXRlcmlhU2VsZWN0b3IgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgIH1cblxuICAgIGhhbmRsZURlbGV0ZShpZCwgaGFuZGxlcikge1xuICAgICAgICBpZiAoaGFuZGxlciA9PSAndG9nZ2xlRGlhZ25vc2lzQ3JpdGVyaWEnKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzW2hhbmRsZXJdKHsgaWQgfSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHNbaGFuZGxlcl0oaWQpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdGF0aWMgY29udGV4dFR5cGVzID0ge1xuICAgICAgICByb3V0ZXI6ICgpID0+IG51bGxcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgbGV0IGxvY2F0aW9uUGlsbCA9IFwiXCJcbiAgICAgICAgbGV0IHBpbGxzID0gW11cbiAgICAgICAgbGV0IHRlc3RzID0gW11cbiAgICAgICAgbGV0IGNyaXRlcmlhcyA9IFtdXG5cbiAgICAgICAgaWYgKHRoaXMucHJvcHMuY29tbW9ubHlTZWFyY2hlZFRlc3RzKSB7XG4gICAgICAgICAgICB0ZXN0cyA9IHRoaXMucHJvcHMuY29tbW9ubHlTZWFyY2hlZFRlc3RzLmZpbHRlcigocGlsbCkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnByb3BzLnNlbGVjdGVkVGVzdHNbcGlsbC5pZF1cbiAgICAgICAgICAgIH0pLm1hcCgocGlsbCkgPT4ge1xuICAgICAgICAgICAgICAgIHBpbGwudHMgPSB0aGlzLnByb3BzLnNlbGVjdGVkVGVzdHNbcGlsbC5pZF1cbiAgICAgICAgICAgICAgICBwaWxsLnR5cGUgPSAndG9nZ2xlVGVzdCdcbiAgICAgICAgICAgICAgICByZXR1cm4gcGlsbFxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnByb3BzLnNlbGVjdGVkRGlhZ25vc2lzQ3JpdGVyaWEpIHtcbiAgICAgICAgICAgIGNyaXRlcmlhcyA9IE9iamVjdC5rZXlzKHRoaXMucHJvcHMuc2VsZWN0ZWREaWFnbm9zaXNDcml0ZXJpYSkubWFwKChjcml0ZXJpYSkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBwaWxsID0gdGhpcy5wcm9wcy5zZWxlY3RlZERpYWdub3Npc0NyaXRlcmlhW2NyaXRlcmlhXVxuICAgICAgICAgICAgICAgIHBpbGwudHlwZSA9ICd0b2dnbGVEaWFnbm9zaXNDcml0ZXJpYSdcbiAgICAgICAgICAgICAgICByZXR1cm4gcGlsbFxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnByb3BzLnNlbGVjdGVkTG9jYXRpb24pIHtcbiAgICAgICAgICAgIGxvY2F0aW9uUGlsbCA9IDxDaGlwXG4gICAgICAgICAgICAgICAgbGFiZWw9e3RoaXMucHJvcHMuc2VsZWN0ZWRMb2NhdGlvbi5uYW1lfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17XCJwaWxsc2VsZWN0ZWQgbG9jYXRpb25cIn1cbiAgICAgICAgICAgIC8+XG4gICAgICAgIH1cblxuICAgICAgICBwaWxscyA9IFsuLi50ZXN0cywgLi4uY3JpdGVyaWFzXVxuICAgICAgICBwaWxscyA9IHBpbGxzLnNvcnQoKGEsIGIpID0+IHtcbiAgICAgICAgICAgIGxldCBkYXRlQSA9IG5ldyBEYXRlKGEudHMpLmdldFRpbWUoKVxuICAgICAgICAgICAgbGV0IGRhdGVCID0gbmV3IERhdGUoYi50cykuZ2V0VGltZSgpXG4gICAgICAgICAgICByZXR1cm4gZGF0ZUEgPiBkYXRlQiA/IDEgOiAtMVxuICAgICAgICB9KS5tYXAoKHBpbGwpID0+IHtcbiAgICAgICAgICAgIHJldHVybiA8Q2hpcFxuICAgICAgICAgICAgICAgIGxhYmVsPXtwaWxsLm5hbWV9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtcInBpbGxzZWxlY3RlZFwifVxuICAgICAgICAgICAgICAgIGtleT17cGlsbC50eXBlICsgcGlsbC5pZH1cbiAgICAgICAgICAgICAgICBvbkRlbGV0ZT17dGhpcy5oYW5kbGVEZWxldGUuYmluZCh0aGlzLCBwaWxsLmlkLCBwaWxsLnR5cGUpfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgfSlcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjcml0ZXJpYVNlbGVjdG9yXCI+XG4gICAgICAgICAgICAgICAgPGlucHV0IG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250ZXh0LnJvdXRlci5oaXN0b3J5LnB1c2goJy9keC9jcml0ZXJpYXNlYXJjaCcpXG4gICAgICAgICAgICAgICAgfX0gcGxhY2Vob2xkZXI9e3RoaXMucHJvcHMuaGVhZGluZyB8fCBcIlNlYXJjaCBmb3IgdGVzdHMsIGxhYnMsIHBhY2thZ2VzIC4uZXRjXCJ9IC8+XG4gICAgICAgICAgICAgICAge2xvY2F0aW9uUGlsbH1cbiAgICAgICAgICAgICAgICB7cGlsbHN9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgQ3JpdGVyaWFTZWxlY3RvclxuIiwiaW1wb3J0IENyaXRlcmlhU2VsZWN0b3IgZnJvbSAnLi9Dcml0ZXJpYVNlbGVjdG9yLmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBDcml0ZXJpYVNlbGVjdG9yIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cbmltcG9ydCBMYWJQcm9maWxlQ2FyZCBmcm9tICcuLi9sYWJQcm9maWxlQ2FyZC9pbmRleC5qcydcblxuY2xhc3MgTGFiRGV0YWlscyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxMYWJQcm9maWxlQ2FyZCBcbiAgICAgICAgICAgICAgICBkZXRhaWxzPXt0aGlzLnByb3BzLmRhdGF9XG4gICAgICAgICAgICAgICAgaGlkZUJvdHRvbT17dHJ1ZX1cbiAgICAgICAgICAgICAgICBoaWRlQm9va05vdz17dHJ1ZX1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IExhYkRldGFpbHNcbiIsImltcG9ydCBMYWJEZXRhaWxzIGZyb20gJy4vTGFiRGV0YWlsLmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBMYWJEZXRhaWxzIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IEVtb3RpSWNvbiBmcm9tICdtYXRlcmlhbC11aS1pY29ucy9BY2NvdW50Q2lyY2xlJztcbmltcG9ydCBIb21lSWNvbiBmcm9tICdtYXRlcmlhbC11aS1pY29ucy9Ib21lJztcbmltcG9ydCBDbG9ja0ljb24gZnJvbSAnbWF0ZXJpYWwtdWktaWNvbnMvQXZUaW1lcic7XG5pbXBvcnQgTG9jYXRpb25zSWNvbiBmcm9tICdtYXRlcmlhbC11aS1pY29ucy9Mb2NhdGlvbk9uJztcblxuXG5jbGFzcyBMYWJQcm9maWxlQ2FyZCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgfVxuXG4gICAgZ2VuZXJhdGVUZXN0c1N0cmluZyh0ZXN0cykge1xuICAgICAgICByZXR1cm4gdGVzdHMucmVkdWNlKChzdHIsIHRlc3QsIGkpID0+IHtcbiAgICAgICAgICAgIGlmKHRlc3QuaXNBdmFpbGFibGUpIHtcbiAgICAgICAgICAgICAgICBzdHIgKz0gdGVzdC5pZDtcbiAgICAgICAgICAgICAgICBpZiAoaSArIDEgPCB0ZXN0cy5sZW5ndGgpIHN0ciArPSBcIixcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBzdHJcbiAgICAgICAgfSwgXCJcIilcbiAgICB9XG5cbiAgICBjYXJkQ2xpY2soaWQsIGUpIHtcbiAgICAgICAgbGV0IHsgdGVzdHMgfSA9IHRoaXMucHJvcHMuZGV0YWlsc1xuICAgICAgICBsZXQgdGVzdHNTdHIgPSB0aGlzLmdlbmVyYXRlVGVzdHNTdHJpbmcodGVzdHMpXG4gICAgICAgIHRoaXMuY29udGV4dC5yb3V0ZXIuaGlzdG9yeS5wdXNoKGAvbGFiLyR7aWR9L2Jvb2s/dGVzdHM9JHt0ZXN0c1N0cn1gKVxuICAgIH1cblxuICAgIGJvb2tOb3coaWQsIGUpIHtcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKVxuICAgICAgICBsZXQgeyB0ZXN0cyB9ID0gdGhpcy5wcm9wcy5kZXRhaWxzXG4gICAgICAgIGxldCB0ZXN0c1N0ciA9IHRoaXMuZ2VuZXJhdGVUZXN0c1N0cmluZyh0ZXN0cylcbiAgICAgICAgdGhpcy5jb250ZXh0LnJvdXRlci5oaXN0b3J5LnB1c2goYC9sYWIvJHtpZH0vYm9vaz90ZXN0cz0ke3Rlc3RzU3RyfWApXG4gICAgfVxuXG4gICAgc3RhdGljIGNvbnRleHRUeXBlcyA9IHtcbiAgICAgICAgcm91dGVyOiAoKSA9PiBudWxsXG4gICAgfVxuXG4gICAgZ2V0VGltZSh1bml4X3RpbWVzdGFtcCkge1xuICAgICAgICB2YXIgZGF0ZSA9IG5ldyBEYXRlKHVuaXhfdGltZXN0YW1wICogMTAwMCk7XG4gICAgICAgIHZhciBob3VycyA9IGRhdGUuZ2V0SG91cnMoKTtcbiAgICAgICAgdmFyIG1pbnV0ZXMgPSBcIjBcIiArIGRhdGUuZ2V0TWludXRlcygpO1xuICAgICAgICByZXR1cm4gaG91cnMgKyAnOicgKyBtaW51dGVzLnN1YnN0cigtMilcbiAgICB9XG5cbiAgICBnZXRBdmFpbGFiaWxpdHkobmV4dEF2YWlsYWJsZSkge1xuICAgICAgICBpZiAobmV4dEF2YWlsYWJsZVswXSkge1xuICAgICAgICAgICAgbGV0IGRhdGUgPSBuZXcgRGF0ZShuZXh0QXZhaWxhYmxlWzBdLmZyb20pLnRvRGF0ZVN0cmluZygpXG4gICAgICAgICAgICBsZXQgdGltZVN0YXJ0ID0gdGhpcy5nZXRUaW1lKG5leHRBdmFpbGFibGVbMF0uZnJvbSlcbiAgICAgICAgICAgIGxldCB0aW1lRW5kID0gdGhpcy5nZXRUaW1lKG5leHRBdmFpbGFibGVbMF0udG8pXG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGRhdGUsIHRpbWVTdGFydCwgdGltZUVuZFxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4geyBkYXRlOiAnJywgdGltZVN0YXJ0OiAnJywgdGltZUVuZDogJycgfVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICBsZXQgeyBpZCwgbmFtZSwgcHJvZmlsZV9pbWcsIG5leHRBdmFpbGFibGUsIGFkZHJlc3MsIHByaWNlX2JyZWFrdXAgfSA9IHRoaXMucHJvcHMuZGV0YWlsc1xuXG4gICAgICAgIGxldCB0aW1lQXZhaWxhYmxlID0gdGhpcy5nZXRBdmFpbGFiaWxpdHkobmV4dEF2YWlsYWJsZSlcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJkb2N0b3JDYXJkXCIgb25DbGljaz17dGhpcy5jYXJkQ2xpY2suYmluZCh0aGlzLCBpZCl9PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZGV0YWlsc0RpdlwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN1Yk9wdGlvbnNJbWFnZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGltZyBzcmM9e3Byb2ZpbGVfaW1nfSBjbGFzc05hbWU9XCJkb2N0b3JJbWFnZVwiIC8+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN1Yk9wdGlvbnNDb250ZW50XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJuYW1lXCI+e25hbWV9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgISF0aGlzLnByb3BzLmhpZGVCb29rTm93ID8gJycgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3ViT3B0aW9uc0ludGVyYWN0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYm9va05vd1wiIG9uQ2xpY2s9e3RoaXMuYm9va05vdy5iaW5kKHRoaXMsIGlkKX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBCb29rIFJzLiB7cHJpY2VfYnJlYWt1cC5hbW91bnR9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAhIXRoaXMucHJvcHMuaGlkZUJvdHRvbSA/ICcnIDpcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYm90dG9tT3B0aW9uc1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3ViT3B0aW9uc1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Q2xvY2tJY29uIGNsYXNzTmFtZT1cImNsaW5pY0ljb25cIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0aW1lRW50cnlcIj57dGltZUF2YWlsYWJsZS5kYXRlfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGltZUVudHJ5XCI+e3RpbWVBdmFpbGFibGUudGltZVN0YXJ0fSB0byB7dGltZUF2YWlsYWJsZS50aW1lRW5kfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN1Yk9wdGlvbnNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPExvY2F0aW9uc0ljb24gY2xhc3NOYW1lPVwiY2xpbmljSWNvblwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImNsaW5pY05hbWVcIj57YWRkcmVzc308L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgTGFiUHJvZmlsZUNhcmRcbiIsImltcG9ydCBMYWJQcm9maWxlQ2FyZCBmcm9tICcuL0xhYlByb2ZpbGVDYXJkLmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBMYWJQcm9maWxlQ2FyZCIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG5pbXBvcnQgRXhwYW5zaW9uUGFuZWwsIHtcbiAgICBFeHBhbnNpb25QYW5lbFN1bW1hcnksXG4gICAgRXhwYW5zaW9uUGFuZWxEZXRhaWxzLFxufSBmcm9tICdtYXRlcmlhbC11aS9FeHBhbnNpb25QYW5lbCc7XG5pbXBvcnQgRXhwYW5kTW9yZUljb24gZnJvbSAnbWF0ZXJpYWwtdWktaWNvbnMvRXhwYW5kTW9yZSc7XG5cblxuY2xhc3MgT3JkZXJEZXRhaWxzIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcblxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICBsZXQgcHJpY2VfYnJlYWt1cCA9IFtdXG4gICAgICAgIGxldCB0b3RhbFByaWNlID0gMFxuICAgICAgICBsZXQgdG90YWxUZXN0cyA9IDBcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuZGF0YS5wcmljZV9icmVha3VwICYmIHRoaXMucHJvcHMuZGF0YS5wcmljZV9icmVha3VwLmJyZWFrdXApIHtcbiAgICAgICAgICAgIHByaWNlX2JyZWFrdXAgPSB0aGlzLnByb3BzLmRhdGEucHJpY2VfYnJlYWt1cC5icmVha3VwLm1hcCgodGVzdCwgaSkgPT4ge1xuICAgICAgICAgICAgICAgIHRvdGFsUHJpY2UgKz0gdGVzdC5hbW91bnRcbiAgICAgICAgICAgICAgICB0b3RhbFRlc3RzKytcbiAgICAgICAgICAgICAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9XCJ0ZXN0UHJpY2VSb3dcIiBrZXk9e2l9PlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0bmFtZVwiPnt0ZXN0Lm5hbWV9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0YW1vdW50XCI+UnMuIHt0ZXN0LmFtb3VudH08L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwib3JkZXJEZXRhaWxzXCI+XG4gICAgICAgICAgICAgICAgPEV4cGFuc2lvblBhbmVsPlxuICAgICAgICAgICAgICAgICAgICA8RXhwYW5zaW9uUGFuZWxTdW1tYXJ5IGV4cGFuZEljb249ezxFeHBhbmRNb3JlSWNvbiAvPn0+XG4gICAgICAgICAgICAgICAgICAgICAgICBPcmRlciBEZXRhaWxzIC0ge3RvdGFsVGVzdHN9IFRlc3RzXG4gICAgICAgICAgICAgICAgICAgIDwvRXhwYW5zaW9uUGFuZWxTdW1tYXJ5PlxuICAgICAgICAgICAgICAgICAgICA8RXhwYW5zaW9uUGFuZWxEZXRhaWxzPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwcmljZUNvbnRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7cHJpY2VfYnJlYWt1cH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRlc3RUb3RhbFJvd1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0bmFtZVwiPntcIlRvdGFsXCJ9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0YW1vdW50XCI+UnMuIHt0b3RhbFByaWNlfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRlc3RUb3RhbFJvd1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0bmFtZVwiPntcIkdTVFwifTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGFtb3VudFwiPlJzLiB7dG90YWxQcmljZSoxLjE4fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRlc3RUb3RhbFJvd1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0bmFtZVwiPntcIlBheWFibGVcIn08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRhbW91bnRcIj5Scy4ge3RvdGFsUHJpY2UqMS4xOH08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9FeHBhbnNpb25QYW5lbERldGFpbHM+XG4gICAgICAgICAgICAgICAgPC9FeHBhbnNpb25QYW5lbD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBPcmRlckRldGFpbHNcbiIsImltcG9ydCBPcmRlckRldGFpbHMgZnJvbSAnLi9PcmRlckRldGFpbHMuanMnXG5cbmV4cG9ydCBkZWZhdWx0IE9yZGVyRGV0YWlscyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmNvbnN0IGRlYm91bmNlciA9IChmbiwgZGVsYXkpID0+IHtcbiAgICBsZXQgdGltZXIgPSBudWxsXG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVyKVxuICAgICAgICB0aW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgZm4uY2FsbCh0aGlzKVxuICAgICAgICB9LCBkZWxheSlcbiAgICB9XG59XG5cblxuY2xhc3MgQ3JpdGVyaWFTZWFyY2hWaWV3IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIHNlYXJjaFZhbHVlOiAnJyxcbiAgICAgICAgICAgIHNlYXJjaFJlc3VsdHM6IFtdXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgdGhpcy5nZXRTZWFyY2hSZXN1bHRzID0gZGVib3VuY2VyKHRoaXMuZ2V0U2VhcmNoUmVzdWx0cy5iaW5kKHRoaXMpLCAxMDAwKVxuICAgICAgICBsZXQgaW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndG9wQ3JpdGVyaWFTZWFyY2gnKVxuICAgICAgICBpbnB1dC5mb2N1cygpXG4gICAgfVxuXG4gICAgaW5wdXRIYW5kbGVyKGUpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHNlYXJjaFZhbHVlOiBlLnRhcmdldC52YWx1ZSB9KVxuICAgICAgICB0aGlzLmdldFNlYXJjaFJlc3VsdHMoKVxuICAgIH1cblxuICAgIGdldFNlYXJjaFJlc3VsdHMoKSB7XG4gICAgICAgIHRoaXMucHJvcHMuZ2V0RGlhZ25vc2lzQ3JpdGVyaWFSZXN1bHRzKHRoaXMuc3RhdGUuc2VhcmNoVmFsdWUsIChzZWFyY2hSZXN1bHRzKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgc2VhcmNoUmVzdWx0czogc2VhcmNoUmVzdWx0cy5yZXN1bHQgfSlcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBhZGRDcml0ZXJpYShjcml0ZXJpYSwgdHlwZSkge1xuICAgICAgICBjcml0ZXJpYS50eXBlID0gdHlwZVxuICAgICAgICB0aGlzLnByb3BzLnRvZ2dsZURpYWdub3Npc0NyaXRlcmlhKGNyaXRlcmlhKVxuICAgICAgICB0aGlzLmNvbnRleHQucm91dGVyLmhpc3RvcnkuZ29CYWNrKClcbiAgICB9XG5cbiAgICBzdGF0aWMgY29udGV4dFR5cGVzID0ge1xuICAgICAgICByb3V0ZXI6ICgpID0+IG51bGxcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibG9jYXRpb25TZWFyY2hcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxvY2F0aW9uU2VhcmNoQm94XCI+XG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCBjbGFzc05hbWU9XCJ0b3BTZWFyY2hcIiBpZD1cInRvcENyaXRlcmlhU2VhcmNoXCIgb25DaGFuZ2U9e3RoaXMuaW5wdXRIYW5kbGVyLmJpbmQodGhpcyl9IHZhbHVlPXt0aGlzLnN0YXRlLnNlYXJjaFZhbHVlfSBwbGFjZWhvbGRlcj1cIlNlYXJjaCBmb3IgdGVzdHMsIGxhYnMsIHBhY2thZ2VzIC4uZXRjXCIgLz5cbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZS5zZWFyY2hSZXN1bHRzLm1hcCgodHlwZSwgaSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT1cInNlYXJjaFJlc3VsdFR5cGVcIiBrZXk9e2l9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cD57dHlwZS5uYW1lfTwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZS5kYXRhLm1hcCgocmVzdWx0RGF0YSwgaikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiA8c3BhbiBrZXk9e2p9IGNsYXNzTmFtZT1cInBhYy1pdGVtXCIgb25DbGljaz17dGhpcy5hZGRDcml0ZXJpYS5iaW5kKHRoaXMsIHJlc3VsdERhdGEsIHR5cGUudHlwZSl9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJoZWFkXCI+e3Jlc3VsdERhdGEubmFtZX08L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInN1YlwiPntyZXN1bHREYXRhLnN1Yl9uYW1lIHx8IHJlc3VsdERhdGEuYWRkcmVzc308L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgQ3JpdGVyaWFTZWFyY2hWaWV3XG4iLCJpbXBvcnQgQ3JpdGVyaWFTZWFyY2hWaWV3IGZyb20gJy4vQ3JpdGVyaWFTZWFyY2hWaWV3LmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBDcml0ZXJpYVNlYXJjaFZpZXciLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgTGFiRGV0YWlscyBmcm9tICcuLi9jb21tb25zL2xhYkRldGFpbHMvaW5kZXguanMnXG5pbXBvcnQgT3JkZXJEZXRhaWxzIGZyb20gJy4uL2NvbW1vbnMvb3JkZXJEZXRhaWxzL2luZGV4LmpzJ1xuaW1wb3J0IFRpbWVTbG90U2VsZWN0b3IgZnJvbSAnLi4vLi4vY29tbW9ucy90aW1lU2xvdFNlbGVjdG9yL2luZGV4LmpzJ1xuXG5jbGFzcyBMYWJTbG90c1ZpZXcgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgc2VsZWN0ZWRMYWI6IG51bGwsXG4gICAgICAgICAgICBzZWxlY3RlZFRlc3RzOiBcIlwiLFxuICAgICAgICAgICAgdGltZVNsb3RzOiBudWxsLFxuICAgICAgICAgICAgc2VsZWN0ZWRTbG90OiBudWxsLFxuICAgICAgICAgICAgc2VsZWN0ZWRUZXN0cyA6IFwiXCJcbiAgICAgICAgfVxuICAgIH1cbiAgICBnZXRMb2NhdGlvblBhcmFtKHRhZykge1xuICAgICAgICAvLyB0aGlzIEFQSSBhc3N1bWVzIHRoZSBjb250ZXh0IG9mIHJlYWN0LXJvdXRlci00XG4gICAgICAgIGNvbnN0IHBhcmFtU3RyaW5nID0gdGhpcy5wcm9wcy5sb2NhdGlvbi5zZWFyY2hcbiAgICAgICAgY29uc3QgcGFyYW1zID0gbmV3IFVSTFNlYXJjaFBhcmFtcyhwYXJhbVN0cmluZylcbiAgICAgICAgcmV0dXJuIHBhcmFtcy5nZXQodGFnKVxuICAgIH1cblxuICAgIHByb2NlZWQoKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLnNlbGVjdGVkTGFiKSB7XG4gICAgICAgICAgICB0aGlzLmNvbnRleHQucm91dGVyLmhpc3RvcnkucHVzaChgL2xhYi8ke3RoaXMuc3RhdGUuc2VsZWN0ZWRMYWJ9L2Jvb2tkZXRhaWxzP3Rlc3RzPSR7dGhpcy5zdGF0ZS5zZWxlY3RlZFRlc3RzfSZ0X3N0YXJ0PSR7dGhpcy5zdGF0ZS5zZWxlY3RlZFNsb3Quc3RhcnR9JnRfZW5kPSR7dGhpcy5zdGF0ZS5zZWxlY3RlZFNsb3QuZW5kfWApXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZWxlY3RUaW1lU2xvdChzbG90KSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBzZWxlY3RlZFNsb3Q6IHNsb3QgfSlcbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgbGV0IGxhYklkID0gdGhpcy5wcm9wcy5tYXRjaC5wYXJhbXMuaWRcbiAgICAgICAgbGV0IHRlc3RzID0gdGhpcy5nZXRMb2NhdGlvblBhcmFtKCd0ZXN0cycpXG4gICAgICAgIGlmIChsYWJJZCkge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHNlbGVjdGVkTGFiOiBsYWJJZCwgc2VsZWN0ZWRUZXN0czogdGVzdHMgfSlcbiAgICAgICAgICAgIHRoaXMucHJvcHMuZ2V0TGFiQnlJZChsYWJJZClcblxuICAgICAgICAgICAgdGhpcy5wcm9wcy5nZXRMYWJUaW1lU2xvdHMobGFiSWQsIHRlc3RzLCAodGltZVNsb3RzKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHRpbWVTbG90cyB9KVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN0YXRpYyBjb250ZXh0VHlwZXMgPSB7XG4gICAgICAgIHJvdXRlcjogKCkgPT4gbnVsbFxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhcHBvaW50bWVudFNsb3RcIj5cblxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5MQUJTW3RoaXMuc3RhdGUuc2VsZWN0ZWRMYWJdID9cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPExhYkRldGFpbHMgZGF0YT17dGhpcy5wcm9wcy5MQUJTW3RoaXMuc3RhdGUuc2VsZWN0ZWRMYWJdfSAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxPcmRlckRldGFpbHMgZGF0YT17dGhpcy5wcm9wcy5MQUJTW3RoaXMuc3RhdGUuc2VsZWN0ZWRMYWJdfSAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZS50aW1lU2xvdHMgP1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPFRpbWVTbG90U2VsZWN0b3JcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aW1lU2xvdHM9e3RoaXMuc3RhdGUudGltZVNsb3RzfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdFRpbWVTbG90PXt0aGlzLnNlbGVjdFRpbWVTbG90LmJpbmQodGhpcyl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPiA6ICcnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwicHJvY2VlZGJ0blwiIG9uQ2xpY2s9e3RoaXMucHJvY2VlZC5iaW5kKHRoaXMpfT5Qcm9jZWVkPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj4gOiBcIlwiXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IExhYlNsb3RzVmlld1xuIiwiaW1wb3J0IExhYlNsb3RzVmlldyBmcm9tICcuL0xhYlNsb3RzVmlldy5qcydcblxuZXhwb3J0IGRlZmF1bHQgTGFiU2xvdHNWaWV3IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cbmltcG9ydCBMYWJEZXRhaWxzIGZyb20gJy4uL2NvbW1vbnMvbGFiRGV0YWlscy9pbmRleC5qcydcbmltcG9ydCBPcmRlckRldGFpbHMgZnJvbSAnLi4vY29tbW9ucy9vcmRlckRldGFpbHMvaW5kZXguanMnXG5pbXBvcnQgRGV0YWlsc0Zvcm0gZnJvbSAnLi9kZXRhaWxzRm9ybS9pbmRleC5qcydcbmltcG9ydCBBZGRyZXNzRm9ybSBmcm9tICcuL2FkZHJlc3NGb3JtL2luZGV4LmpzJztcblxuY2xhc3MgUGF0aWVudERldGFpbHNWaWV3IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIHNlbGVjdGVkTGFiOiBudWxsLFxuICAgICAgICAgICAgc2VsZWN0ZWRUZXN0czogXCJcIixcbiAgICAgICAgICAgIHNlbGVjdGVkU2xvdDogbnVsbCxcbiAgICAgICAgICAgIHNlbGVjdGVkU2xvdFN0YXJ0IDogbnVsbCxcbiAgICAgICAgICAgIHNlbGVjdGVkU2xvdEVuZCA6IG51bGxcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldExvY2F0aW9uUGFyYW0odGFnKSB7XG4gICAgICAgIC8vIHRoaXMgQVBJIGFzc3VtZXMgdGhlIGNvbnRleHQgb2YgcmVhY3Qtcm91dGVyLTRcbiAgICAgICAgY29uc3QgcGFyYW1TdHJpbmcgPSB0aGlzLnByb3BzLmxvY2F0aW9uLnNlYXJjaFxuICAgICAgICBjb25zdCBwYXJhbXMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKHBhcmFtU3RyaW5nKVxuICAgICAgICByZXR1cm4gcGFyYW1zLmdldCh0YWcpXG4gICAgfVxuXG4gICAgcHJvY2VlZCgpe1xuICAgICAgICB0aGlzLmNvbnRleHQucm91dGVyLmhpc3RvcnkucHVzaCgnL2xhYi9ib29raW5nL3N1bW1hcnkvSVVIQlVIODc4N1VIQicpXG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIGxldCBsYWJJZCA9IHRoaXMucHJvcHMubWF0Y2gucGFyYW1zLmlkXG4gICAgICAgIGxldCB0ZXN0cyA9IHRoaXMuZ2V0TG9jYXRpb25QYXJhbSgndGVzdHMnKVxuICAgICAgICBsZXQgc2VsZWN0ZWRTbG90U3RhcnQgPSB0aGlzLmdldExvY2F0aW9uUGFyYW0oJ3Rfc3RhcnQnKVxuICAgICAgICBzZWxlY3RlZFNsb3RTdGFydCA9IG5ldyBEYXRlKHBhcnNlRmxvYXQoc2VsZWN0ZWRTbG90U3RhcnQpKVxuICAgICAgICBzZWxlY3RlZFNsb3RTdGFydCA9IHNlbGVjdGVkU2xvdFN0YXJ0LnRvU3RyaW5nKClcbiAgICAgICAgbGV0IHNlbGVjdGVkU2xvdEVuZCA9IHRoaXMuZ2V0TG9jYXRpb25QYXJhbSgndF9lbmQnKVxuICAgICAgICBzZWxlY3RlZFNsb3RFbmQgPSBuZXcgRGF0ZShwYXJzZUZsb2F0KHNlbGVjdGVkU2xvdEVuZCkpXG4gICAgICAgIHNlbGVjdGVkU2xvdEVuZCA9IHNlbGVjdGVkU2xvdEVuZC50b1N0cmluZygpXG4gICAgICAgIGlmIChsYWJJZCkge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHNlbGVjdGVkTGFiOiBsYWJJZCwgc2VsZWN0ZWRUZXN0czogdGVzdHMsIHNlbGVjdGVkU2xvdFN0YXJ0LCBzZWxlY3RlZFNsb3RFbmQgfSlcbiAgICAgICAgICAgIHRoaXMucHJvcHMuZ2V0TGFiQnlJZChsYWJJZClcblxuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhdGljIGNvbnRleHRUeXBlcyA9IHtcbiAgICAgICAgcm91dGVyOiAoKSA9PiBudWxsXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBhdGllbnREZXRhaWxzXCI+XG5cbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuTEFCU1t0aGlzLnN0YXRlLnNlbGVjdGVkTGFiXSA/XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxMYWJEZXRhaWxzIGRhdGE9e3RoaXMucHJvcHMuTEFCU1t0aGlzLnN0YXRlLnNlbGVjdGVkTGFiXX0gLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8T3JkZXJEZXRhaWxzIGRhdGE9e3RoaXMucHJvcHMuTEFCU1t0aGlzLnN0YXRlLnNlbGVjdGVkTGFiXX0gLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNlbGVjdGVkQXBwb2ludG1lbnRTbG90XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoNT5TZWxlY3RlZCBBcHBvaW50bWVudCBTbG90PC9oNT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiYXBwZGF0ZVwiPkFwcG9pbnRtZW50IERhdGU8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImRhdGVcIj57IHRoaXMuc3RhdGUuc2VsZWN0ZWRTbG90U3RhcnQgfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8RGV0YWlsc0Zvcm0gLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8QWRkcmVzc0Zvcm0gY2l0eT1cIlNlbGVjdGVkIHZhbHVlXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cInByb2NlZWRidG5cIiBvbkNsaWNrPXt0aGlzLnByb2NlZWQuYmluZCh0aGlzKX0+UHJvY2VlZDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+IDogXCJcIlxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IFBhdGllbnREZXRhaWxzVmlld1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cbmNsYXNzIEFkZHJlc3NGb3JtIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIGFkZHJlc3M6JycsXG4gICAgICAgICAgICBsb2NhbGl0eTonJyxcbiAgICAgICAgICAgIGxhbmRtYXJrOicnLFxuICAgICAgICAgICAgcGluY29kZTonJyxcbiAgICAgICAgICAgIGNpdHk6cHJvcHMuY2l0eVxuXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpbnB1dEhhbmRsZXIod2hpY2gsIGUpe1xuICAgICAgICB0aGlzLnNldFN0YXRlKHsgW3doaWNoXSA6IGUudGFyZ2V0LnZhbHVlIH0pXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImRldGFpbHNGb3JtXCI+XG4gICAgICAgICAgICAgICAgPGg1PlBsZWFzZSBwcm92aWRlIHBhdGllbnQgZGV0YWlsczwvaDU+XG5cbiAgICAgICAgICAgICAgICA8aW5wdXQgdmFsdWU9e3RoaXMuc3RhdGUuYWRkcmVzc30gb25DaGFuZ2U9e3RoaXMuaW5wdXRIYW5kbGVyLmJpbmQodGhpcywnYWRkcmVzcycpfSBjbGFzc05hbWU9XCJwdG5hbWVcIiBwbGFjZWhvbGRlcj1cIkFkZHJlc3MqXCIgLz5cbiAgICAgICAgICAgICAgICA8aW5wdXQgdmFsdWU9e3RoaXMuc3RhdGUubG9jYWxpdHl9IG9uQ2hhbmdlPXt0aGlzLmlucHV0SGFuZGxlci5iaW5kKHRoaXMsJ2xvY2FsaXR5Jyl9IGNsYXNzTmFtZT1cInB0bmFtZVwiIHBsYWNlaG9sZGVyPVwiTG9jYWxpdHkqXCIgLz5cbiAgICAgICAgICAgICAgICA8aW5wdXQgdmFsdWU9e3RoaXMuc3RhdGUubGFuZG1hcmt9IG9uQ2hhbmdlPXt0aGlzLmlucHV0SGFuZGxlci5iaW5kKHRoaXMsJ2xhbmRtYXJrJyl9IGNsYXNzTmFtZT1cInB0bmFtZVwiIHBsYWNlaG9sZGVyPVwiTGFuZG1hcmsqXCIgLz5cbiAgICAgICAgICAgICAgICA8aW5wdXQgdmFsdWU9e3RoaXMuc3RhdGUucGluY29kZX0gb25DaGFuZ2U9e3RoaXMuaW5wdXRIYW5kbGVyLmJpbmQodGhpcywncGluY29kZScpfSBjbGFzc05hbWU9XCJwdG1vYmlsZVwiIHBsYWNlaG9sZGVyPVwiUGluY29kZSpcIiAvPlxuICAgICAgICAgICAgICAgIHsvKiA8aW5wdXQgdmFsdWU9e3RoaXMuc3RhdGUuY2l0eX0gb25DaGFuZ2U9e3RoaXMuaW5wdXRIYW5kbGVyLmJpbmQodGhpcywnY2l0eScpfSBkaXNhYmxlZCBjbGFzc05hbWU9XCJwdG90cFwiIHBsYWNlaG9sZGVyPVwiQ2l0eVwiIC8+ICovfVxuXG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgQWRkcmVzc0Zvcm1cbiIsImltcG9ydCBBZGRyZXNzRm9ybSBmcm9tICcuL0FkZHJlc3NGb3JtLmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBBZGRyZXNzRm9ybSIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG5jbGFzcyBEZXRhaWxzRm9ybSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgICBwYXRpZW50TmFtZSA6ICcnLFxuICAgICAgICAgICAgcGF0aWVudEVtYWlsIDogJycsXG4gICAgICAgICAgICBwYXRpZW50R2VuZGVyIDogJ21hbGUnLFxuICAgICAgICAgICAgbW9iaWxlOicnLFxuICAgICAgICAgICAgb3RwIDonJyxcbiAgICAgICAgICAgIHBhdGllbnRNb2JpbGUgOiAnJ1xuXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpbnB1dEhhbmRsZXIod2hpY2gsIGUpe1xuICAgICAgICB0aGlzLnNldFN0YXRlKHsgW3doaWNoXSA6IGUudGFyZ2V0LnZhbHVlIH0pXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImRldGFpbHNGb3JtXCI+XG4gICAgICAgICAgICAgICAgPGg1PlBsZWFzZSBwcm92aWRlIHBhdGllbnQgZGV0YWlsczwvaDU+XG5cbiAgICAgICAgICAgICAgICA8aW5wdXQgdmFsdWU9e3RoaXMuc3RhdGUucGF0aWVudE5hbWV9IG9uQ2hhbmdlPXt0aGlzLmlucHV0SGFuZGxlci5iaW5kKHRoaXMsJ3BhdGllbnROYW1lJyl9IGNsYXNzTmFtZT1cInB0bmFtZVwiIHBsYWNlaG9sZGVyPVwiUGF0aWVudCBOYW1lKlwiIC8+XG4gICAgICAgICAgICAgICAgPGlucHV0IHZhbHVlPXt0aGlzLnN0YXRlLnBhdGllbnRFbWFpbH0gb25DaGFuZ2U9e3RoaXMuaW5wdXRIYW5kbGVyLmJpbmQodGhpcywncGF0aWVudEVtYWlsJyl9IGNsYXNzTmFtZT1cInB0ZW1haWxcIiBwbGFjZWhvbGRlcj1cIkVtYWlsKlwiIC8+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwdGdlbmRlclwiPlxuICAgICAgICAgICAgICAgICAgICA8c3Bhbj5HZW5kZXIgOjwvc3Bhbj4gXG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwicmFkaW9cIiBuYW1lPVwiZ2VuZGVyXCIgdmFsdWU9XCJtYWxlXCIgY2hlY2tlZD17dGhpcy5zdGF0ZS5wYXRpZW50R2VuZGVyID09PSBcIm1hbGVcIn0gb25DaGFuZ2U9e3RoaXMuaW5wdXRIYW5kbGVyLmJpbmQodGhpcywncGF0aWVudEdlbmRlcicpfS8+IE1hbGVcbiAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJyYWRpb1wiIG5hbWU9XCJnZW5kZXJcIiB2YWx1ZT1cImZlbWFsZVwiIGNoZWNrZWQ9e3RoaXMuc3RhdGUucGF0aWVudEdlbmRlciA9PT0gXCJmZW1hbGVcIn0gb25DaGFuZ2U9e3RoaXMuaW5wdXRIYW5kbGVyLmJpbmQodGhpcywncGF0aWVudEdlbmRlcicpfS8+IEZlbWFsZVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxpbnB1dCB2YWx1ZT17dGhpcy5zdGF0ZS5tb2JpbGV9IG9uQ2hhbmdlPXt0aGlzLmlucHV0SGFuZGxlci5iaW5kKHRoaXMsJ21vYmlsZScpfSBjbGFzc05hbWU9XCJwdG1vYmlsZVwiIHBsYWNlaG9sZGVyPVwiTW9iaWxlKlwiIC8+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJvdHBidG5cIj4oUmUpU2VuZCBPVFA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8aW5wdXQgdmFsdWU9e3RoaXMuc3RhdGUub3RwfSBvbkNoYW5nZT17dGhpcy5pbnB1dEhhbmRsZXIuYmluZCh0aGlzLCdvdHAnKX0gY2xhc3NOYW1lPVwicHRvdHBcIiBwbGFjZWhvbGRlcj1cIkVudGVyIE9UUCpcIiAvPlxuICAgICAgICAgICAgICAgIDxpbnB1dCB2YWx1ZT17dGhpcy5zdGF0ZS5wYXRpZW50TW9iaWxlfSBvbkNoYW5nZT17dGhpcy5pbnB1dEhhbmRsZXIuYmluZCh0aGlzLCdwYXRpZW50TW9iaWxlJyl9IGNsYXNzTmFtZT1cInB0bW9iaWxlXCIgcGxhY2Vob2xkZXI9XCJQYXRpZW50IE1vYmlsZSpcIiAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgXG4gICAgICAgICk7XG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IERldGFpbHNGb3JtXG4iLCJpbXBvcnQgRGV0YWlsc0Zvcm0gZnJvbSAnLi9EZXRhaWxzRm9ybS5qcydcblxuZXhwb3J0IGRlZmF1bHQgRGV0YWlsc0Zvcm0iLCJpbXBvcnQgUGF0aWVudERldGFpbHNWaWV3IGZyb20gJy4vUGF0aWVudERldGFpbHNWaWV3LmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBQYXRpZW50RGV0YWlsc1ZpZXciLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcblxuaW1wb3J0IExvY2F0aW9uU2VsZWN0b3IgZnJvbSAnLi4vLi4vY29tbW9ucy9sb2NhdGlvblNlbGVjdG9yL2luZGV4LmpzJ1xuaW1wb3J0IENyaXRlcmlhU2VsZWN0b3IgZnJvbSAnLi4vY29tbW9ucy9jcml0ZXJpYVNlbGVjdG9yL2luZGV4LmpzJ1xuaW1wb3J0IENvbW1vbmx5U2VhcmNoZWQgZnJvbSAnLi4vY29tbW9ucy9jb21tb25seVNlYXJjaGVkL2luZGV4LmpzJ1xuXG5jbGFzcyBTZWFyY2hDcml0ZXJpYVZpZXcgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgIH1cblxuICAgIGNvbXBvbmVudERpZE1vdW50KCl7XG4gICAgICAgIHRoaXMucHJvcHMubG9hZExhYlNlYXJjaENyaXRlcmlhKClcbiAgICB9XG5cbiAgICBzZWFyY2hQcm9jZWVkKCl7XG4gICAgICAgIC8vIGxldCBzZWFyY2hEYXRhID0ge1xuICAgICAgICAvLyAgICAgc2VsZWN0ZWRUZXN0cyA6IHRoaXMucHJvcHMuc2VsZWN0ZWRUZXN0cyxcbiAgICAgICAgLy8gICAgIHNlbGVjdGVkTG9jYXRpb24gOiB0aGlzLnByb3BzLnNlbGVjdGVkTG9jYXRpb24sXG4gICAgICAgIC8vICAgICBzZWxlY3RlZERpYWdub3Npc0NyaXRlcmlhIDogdGhpcy5wcm9wcy5zZWxlY3RlZERpYWdub3Npc0NyaXRlcmlhXG4gICAgICAgIC8vIH1cbiAgICAgICAgLy8gc2VhcmNoRGF0YSA9IGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzZWFyY2hEYXRhKSlcbiAgICAgICAgLy8gdGhpcy5jb250ZXh0LnJvdXRlci5oaXN0b3J5LnB1c2goYC9keC9zZWFyY2hyZXN1bHRzP3NlYXJjaD0ke3NlYXJjaERhdGF9YClcbiAgICAgICAgdGhpcy5jb250ZXh0LnJvdXRlci5oaXN0b3J5LnB1c2goYC9keC9zZWFyY2hyZXN1bHRzYClcbiAgICB9XG5cbiAgICBzdGF0aWMgY29udGV4dFR5cGVzID0ge1xuICAgICAgICByb3V0ZXI6ICgpID0+IG51bGxcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic2VhcmNoQ3JpdGVyaWFcIj5cbiAgICAgICAgICAgICAgICA8TG9jYXRpb25TZWxlY3RvclxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZExvY2F0aW9uPXt0aGlzLnByb3BzLnNlbGVjdGVkTG9jYXRpb259XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8Q3JpdGVyaWFTZWxlY3RvclxuICAgICAgICAgICAgICAgICAgICBjb21tb25seVNlYXJjaGVkVGVzdHM9e3RoaXMucHJvcHMuY29tbW9ubHlTZWFyY2hlZFRlc3RzfVxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZFRlc3RzPXt0aGlzLnByb3BzLnNlbGVjdGVkVGVzdHN9XG4gICAgICAgICAgICAgICAgICAgIHRvZ2dsZVRlc3Q9e3RoaXMucHJvcHMudG9nZ2xlVGVzdC5iaW5kKHRoaXMpfVxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZERpYWdub3Npc0NyaXRlcmlhPXt0aGlzLnByb3BzLnNlbGVjdGVkRGlhZ25vc2lzQ3JpdGVyaWF9XG4gICAgICAgICAgICAgICAgICAgIHRvZ2dsZURpYWdub3Npc0NyaXRlcmlhPXt0aGlzLnByb3BzLnRvZ2dsZURpYWdub3Npc0NyaXRlcmlhLmJpbmQodGhpcyl9XG4gICAgICAgICAgICAgICAgLz5cblxuICAgICAgICAgICAgICAgIDxDb21tb25seVNlYXJjaGVkXG4gICAgICAgICAgICAgICAgICAgIGhlYWRpbmc9XCJDb21tb25seSBzZWFyY2hlZCB0ZXN0c1wiXG4gICAgICAgICAgICAgICAgICAgIGRhdGE9e3RoaXMucHJvcHMuY29tbW9ubHlTZWFyY2hlZFRlc3RzfVxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZD17dGhpcy5wcm9wcy5zZWxlY3RlZFRlc3RzfVxuICAgICAgICAgICAgICAgICAgICB0b2dnbGVSb3c9e3RoaXMucHJvcHMudG9nZ2xlVGVzdC5iaW5kKHRoaXMpfVxuICAgICAgICAgICAgICAgIC8+XG5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9e3RoaXMuc2VhcmNoUHJvY2VlZC5iaW5kKHRoaXMpfSBjbGFzc05hbWU9XCJwcm9jZWVkQnRuXCI+IFByb2NlZWQgPC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFNlYXJjaENyaXRlcmlhVmlld1xuIiwiaW1wb3J0IFNlYXJjaENyaXRlcmlhVmlldyBmcm9tICcuL1NlYXJjaENyaXRlcmlhVmlldy5qcydcblxuZXhwb3J0IGRlZmF1bHQgU2VhcmNoQ3JpdGVyaWFWaWV3IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IExhYnNMaXN0IGZyb20gJy4uL3NlYXJjaFJlc3VsdHMvbGFic0xpc3QvaW5kZXguanMnXG5pbXBvcnQgVG9wQmFyIGZyb20gJy4uL3NlYXJjaFJlc3VsdHMvdG9wQmFyL2luZGV4LmpzJ1xuaW1wb3J0IENyaXRlcmlhU2VsZWN0b3IgZnJvbSAnLi4vY29tbW9ucy9jcml0ZXJpYVNlbGVjdG9yL2luZGV4LmpzJ1xuXG5jbGFzcyBTZWFyY2hSZXN1bHRzVmlldyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG5cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgICB0aGlzLmdldExhYnMoKVxuICAgIH1cblxuICAgIGdldExhYnMoKSB7XG4gICAgICAgIGxldCB7XG4gICAgICAgICAgICBzZWxlY3RlZFRlc3RzLFxuICAgICAgICAgICAgc2VsZWN0ZWRMb2NhdGlvbixcbiAgICAgICAgICAgIHNlbGVjdGVkRGlhZ25vc2lzQ3JpdGVyaWEsXG4gICAgICAgICAgICBDUklURVJJQV9MT0FERURcbiAgICAgICAgfSA9IHRoaXMucHJvcHNcblxuICAgICAgICBpZiAoQ1JJVEVSSUFfTE9BREVEKSB7XG4gICAgICAgICAgICBsZXQgc2VhcmNoU3RhdGUgPSB7XG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRUZXN0cyxcbiAgICAgICAgICAgICAgICBzZWxlY3RlZExvY2F0aW9uLFxuICAgICAgICAgICAgICAgIHNlbGVjdGVkRGlhZ25vc2lzQ3JpdGVyaWFcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCBmaWx0ZXJTdGF0ZSA9IHRoaXMucHJvcHMuZmlsdGVyQ3JpdGVyaWFcbiAgICAgICAgICAgIHRoaXMuZ2V0TGFiTGlzdChzZWFyY2hTdGF0ZSwgZmlsdGVyU3RhdGUsIGZhbHNlKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBsZXQgc2VhcmNoU3RhdGUgPSB0aGlzLmdldExvY2F0aW9uUGFyYW0oJ3NlYXJjaCcpXG4gICAgICAgICAgICAgICAgbGV0IGZpbHRlclN0YXRlID0gdGhpcy5nZXRMb2NhdGlvblBhcmFtKCdmaWx0ZXInKVxuICAgICAgICAgICAgICAgIGlmIChmaWx0ZXJTdGF0ZSkge1xuICAgICAgICAgICAgICAgICAgICBmaWx0ZXJTdGF0ZSA9IEpTT04ucGFyc2UoZmlsdGVyU3RhdGUpXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZmlsdGVyU3RhdGUgPSB7fVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzZWFyY2hTdGF0ZSA9IEpTT04ucGFyc2Uoc2VhcmNoU3RhdGUpXG4gICAgICAgICAgICAgICAgdGhpcy5nZXRMYWJMaXN0KHNlYXJjaFN0YXRlLCBmaWx0ZXJTdGF0ZSwgdHJ1ZSlcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGUpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRMb2NhdGlvblBhcmFtKHRhZykge1xuICAgICAgICAvLyB0aGlzIEFQSSBhc3N1bWVzIHRoZSBjb250ZXh0IG9mIHJlYWN0LXJvdXRlci00XG4gICAgICAgIGNvbnN0IHBhcmFtU3RyaW5nID0gdGhpcy5wcm9wcy5sb2NhdGlvbi5zZWFyY2hcbiAgICAgICAgY29uc3QgcGFyYW1zID0gbmV3IFVSTFNlYXJjaFBhcmFtcyhwYXJhbVN0cmluZylcbiAgICAgICAgcmV0dXJuIHBhcmFtcy5nZXQodGFnKVxuICAgIH1cblxuICAgIGdldExhYkxpc3Qoc2VhcmNoU3RhdGUsIGZpbHRlclN0YXRlLCBtZXJnZVN0YXRlKSB7XG4gICAgICAgIHRoaXMucHJvcHMuZ2V0TGFicyhzZWFyY2hTdGF0ZSwgZmlsdGVyU3RhdGUsIG1lcmdlU3RhdGUpO1xuICAgIH1cblxuICAgIHVwZGF0ZUxhYnMoZm4pe1xuICAgICAgICByZXR1cm4gKC4uLmFyZ3MpID0+IHtcbiAgICAgICAgICAgIGZuKC4uLmFyZ3MpXG4gICAgICAgICAgICBzZXRUaW1lb3V0KHRoaXMuZ2V0TGFicy5iaW5kKHRoaXMpICwwKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNlYXJjaFJlc3VsdHNcIj5cbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuTE9BRElORyA/IFwiXCIgOlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Q3JpdGVyaWFTZWxlY3RvclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWFkaW5nPXtcIkFkZCBNb3JlIHRlc3RcIn1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRMb2NhdGlvbj17dGhpcy5wcm9wcy5zZWxlY3RlZExvY2F0aW9ufVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21tb25seVNlYXJjaGVkVGVzdHM9e3RoaXMucHJvcHMuY29tbW9ubHlTZWFyY2hlZFRlc3RzfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZFRlc3RzPXt0aGlzLnByb3BzLnNlbGVjdGVkVGVzdHN9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvZ2dsZVRlc3Q9eyB0aGlzLnVwZGF0ZUxhYnMuY2FsbCh0aGlzLHRoaXMucHJvcHMudG9nZ2xlVGVzdC5iaW5kKHRoaXMpKSB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkRGlhZ25vc2lzQ3JpdGVyaWE9e3RoaXMucHJvcHMuc2VsZWN0ZWREaWFnbm9zaXNDcml0ZXJpYX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9nZ2xlRGlhZ25vc2lzQ3JpdGVyaWE9eyB0aGlzLnVwZGF0ZUxhYnMuY2FsbCh0aGlzLHRoaXMucHJvcHMudG9nZ2xlRGlhZ25vc2lzQ3JpdGVyaWEuYmluZCh0aGlzKSkgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPFRvcEJhciAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxMYWJzTGlzdCB7Li4udGhpcy5wcm9wc30gLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgU2VhcmNoUmVzdWx0c1ZpZXdcbiIsImltcG9ydCBTZWFyY2hSZXN1bHRzVmlldyBmcm9tICcuL1NlYXJjaFJlc3VsdHNWaWV3LmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBTZWFyY2hSZXN1bHRzVmlldyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCBMYWJQcm9maWxlQ2FyZCBmcm9tICcuLi8uLi9jb21tb25zL2xhYlByb2ZpbGVDYXJkL2luZGV4LmpzJ1xuXG5jbGFzcyBMYWJzTGlzdCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgfVxuXG4gICAgc3RhdGljIGNvbnRleHRUeXBlcyA9IHtcbiAgICAgICAgcm91dGVyOiAoKSA9PiBudWxsXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIGxldCB7IExBQlMsIGxhYkxpc3QgfSA9IHRoaXMucHJvcHNcbiAgICAgICAgXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImRvY3RvcnNMaXN0XCI+XG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBsYWJMaXN0Lm1hcCgobGFiSWQsIGkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiA8TGFiUHJvZmlsZUNhcmQgZGV0YWlscz17TEFCU1tsYWJJZF19IGtleT17aX0vPlxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBMYWJzTGlzdFxuIiwiaW1wb3J0IExhYnNMaXN0IGZyb20gJy4vTGFic0xpc3QuanMnXG5cbmV4cG9ydCBkZWZhdWx0IExhYnNMaXN0IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cbmltcG9ydCBTb3J0SWNvbiBmcm9tICdtYXRlcmlhbC11aS1pY29ucy9Tb3J0JztcbmltcG9ydCBGaWx0ZXJJY29uIGZyb20gJ21hdGVyaWFsLXVpLWljb25zL0ZpbHRlckxpc3QnO1xuaW1wb3J0IE1lbnUsIHsgTWVudUl0ZW0gfSBmcm9tICdtYXRlcmlhbC11aS9NZW51JztcblxuY2xhc3MgVG9wQmFyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIGFuY2hvckVsOiBudWxsLFxuICAgICAgICAgICAgc2VhcmNoUmVzdWx0cyA6IHRydWVcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZU9wZW4oZXZlbnQpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGFuY2hvckVsOiBldmVudC5jdXJyZW50VGFyZ2V0IH0pXG4gICAgfVxuXG4gICAgaGFuZGxlQ2xvc2UoKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBhbmNob3JFbDogbnVsbCB9KVxuICAgIH1cblxuICAgIHN0YXRpYyBjb250ZXh0VHlwZXMgPSB7XG4gICAgICAgIHJvdXRlcjogKCkgPT4gbnVsbFxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0b3BCYXJcIj5cbiAgICAgICAgICAgICAgICA8U29ydEljb24gY2xhc3NOYW1lPVwiaWNvbnNvcnRmaWx0ZXJcIiBvbkNsaWNrPXt0aGlzLmhhbmRsZU9wZW4uYmluZCh0aGlzKX0gLz5cbiAgICAgICAgICAgICAgICA8TWVudVxuICAgICAgICAgICAgICAgICAgICBpZD1cInNvcnQtbWVudVwiXG4gICAgICAgICAgICAgICAgICAgIGFuY2hvckVsPXt0aGlzLnN0YXRlLmFuY2hvckVsfVxuICAgICAgICAgICAgICAgICAgICBvcGVuPXtCb29sZWFuKHRoaXMuc3RhdGUuYW5jaG9yRWwpfVxuICAgICAgICAgICAgICAgICAgICBvbkNsb3NlPXt0aGlzLmhhbmRsZUNsb3NlLmJpbmQodGhpcyl9XG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICA8TWVudUl0ZW0gb25DbGljaz17dGhpcy5oYW5kbGVDbG9zZS5iaW5kKHRoaXMpfT5SZWxhdmFuY2U8L01lbnVJdGVtPlxuICAgICAgICAgICAgICAgICAgICA8TWVudUl0ZW0gb25DbGljaz17dGhpcy5oYW5kbGVDbG9zZS5iaW5kKHRoaXMpfT5GZWU8L01lbnVJdGVtPlxuICAgICAgICAgICAgICAgICAgICA8TWVudUl0ZW0gb25DbGljaz17dGhpcy5oYW5kbGVDbG9zZS5iaW5kKHRoaXMpfT5EaXN0YW5jZTwvTWVudUl0ZW0+XG4gICAgICAgICAgICAgICAgICAgIDxNZW51SXRlbSBvbkNsaWNrPXt0aGlzLmhhbmRsZUNsb3NlLmJpbmQodGhpcyl9PkFwb2ludG1lbnQ8L01lbnVJdGVtPlxuICAgICAgICAgICAgICAgIDwvTWVudT5cbiAgICAgICAgICAgICAgICA8RmlsdGVySWNvbiBjbGFzc05hbWU9XCJpY29uc29ydGZpbHRlclwiIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgfX0gLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBUb3BCYXJcbiIsImltcG9ydCBUb3BCYXIgZnJvbSAnLi9Ub3BCYXIuanMnXG5cbmV4cG9ydCBkZWZhdWx0IFRvcEJhciIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG5pbXBvcnQgRG9jdG9yUHJvZmlsZUNhcmQgZnJvbSAnLi4vY29tbW9ucy9kb2N0b3JQcm9maWxlQ2FyZC9pbmRleC5qcydcbmltcG9ydCBUaW1lU2xvdFNlbGVjdG9yIGZyb20gJy4uLy4uL2NvbW1vbnMvdGltZVNsb3RTZWxlY3Rvci9pbmRleC5qcydcbmltcG9ydCBTZWxlY3RlZENsaW5pYyBmcm9tICcuLi9jb21tb25zL3NlbGVjdGVkQ2xpbmljL2luZGV4LmpzJ1xuXG5jbGFzcyBBcHBvaW50bWVudFNsb3QgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgc2VsZWN0ZWREb2N0b3I6IG51bGwsXG4gICAgICAgICAgICBzZWxlY3RlZENsaW5pYzogbnVsbCxcbiAgICAgICAgICAgIHRpbWVTbG90czogbnVsbCxcbiAgICAgICAgICAgIHNlbGVjdGVkU2xvdCA6IG51bGxcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByb2NlZWQoKSB7XG4gICAgICAgIGlmKHRoaXMuc3RhdGUuc2VsZWN0ZWRTbG90KXtcbiAgICAgICAgICAgIHRoaXMuY29udGV4dC5yb3V0ZXIuaGlzdG9yeS5wdXNoKGAvZG9jdG9ycHJvZmlsZS8ke3RoaXMuc3RhdGUuc2VsZWN0ZWREb2N0b3J9LyR7dGhpcy5zdGF0ZS5zZWxlY3RlZENsaW5pY30vYm9va2RldGFpbHM/dD0ke3RoaXMuc3RhdGUuc2VsZWN0ZWRTbG90LnN0YXJ0fWApXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZWxlY3RUaW1lU2xvdChzbG90KXtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHNlbGVjdGVkU2xvdDogc2xvdCB9KVxuICAgIH1cblxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgICBsZXQgZG9jdG9ySWQgPSB0aGlzLnByb3BzLm1hdGNoLnBhcmFtcy5pZFxuICAgICAgICBsZXQgY2xpbmljSWQgPSB0aGlzLnByb3BzLm1hdGNoLnBhcmFtcy5jbGluaWNJZFxuICAgICAgICBpZiAoZG9jdG9ySWQgJiYgY2xpbmljSWQpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBzZWxlY3RlZERvY3RvcjogZG9jdG9ySWQsIHNlbGVjdGVkQ2xpbmljOiBjbGluaWNJZCB9KVxuICAgICAgICAgICAgdGhpcy5wcm9wcy5nZXREb2N0b3JCeUlkKGRvY3RvcklkKVxuXG4gICAgICAgICAgICB0aGlzLnByb3BzLmdldFRpbWVTbG90cyhkb2N0b3JJZCwgY2xpbmljSWQsICh0aW1lU2xvdHMpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgdGltZVNsb3RzIH0pXG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhdGljIGNvbnRleHRUeXBlcyA9IHtcbiAgICAgICAgcm91dGVyOiAoKSA9PiBudWxsXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFwcG9pbnRtZW50U2xvdFwiPlxuXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnByb3BzLkRPQ1RPUlNbdGhpcy5zdGF0ZS5zZWxlY3RlZERvY3Rvcl0gP1xuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8RG9jdG9yUHJvZmlsZUNhcmRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGlkZUJvdHRvbT17dHJ1ZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGlkZUJvb2tOb3c9e3RydWV9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRldGFpbHM9e3RoaXMucHJvcHMuRE9DVE9SU1t0aGlzLnN0YXRlLnNlbGVjdGVkRG9jdG9yXX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxTZWxlY3RlZENsaW5pY1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZERvY3Rvcj17dGhpcy5wcm9wcy5ET0NUT1JTW3RoaXMuc3RhdGUuc2VsZWN0ZWREb2N0b3JdfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZENsaW5pYz17dGhpcy5zdGF0ZS5zZWxlY3RlZENsaW5pY31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZS50aW1lU2xvdHMgP1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPFRpbWVTbG90U2VsZWN0b3JcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aW1lU2xvdHM9e3RoaXMuc3RhdGUudGltZVNsb3RzfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdFRpbWVTbG90PSB7dGhpcy5zZWxlY3RUaW1lU2xvdC5iaW5kKHRoaXMpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLz4gOiAnJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cInByb2NlZWRidG5cIiBvbkNsaWNrPXt0aGlzLnByb2NlZWQuYmluZCh0aGlzKX0+UHJvY2VlZDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+IDogXCJcIlxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IEFwcG9pbnRtZW50U2xvdFxuIiwiaW1wb3J0IEFwcG9pbnRtZW50U2xvdCBmcm9tICcuL0FwcG9pbnRtZW50U2xvdC5qcydcblxuZXhwb3J0IGRlZmF1bHQgQXBwb2ludG1lbnRTbG90IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBTdGVwcGVyLCB7IFN0ZXAsIFN0ZXBMYWJlbCB9IGZyb20gJ21hdGVyaWFsLXVpL1N0ZXBwZXInO1xuXG5pbXBvcnQgQ2FsSWNvbiBmcm9tICdtYXRlcmlhbC11aS1pY29ucy9DYWxsJztcblxuXG5jbGFzcyBCb29raW5nVmlldyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJvb2tpbmdcIj5cbiAgICAgICAgICAgICAgICA8U3RlcHBlciBhY3RpdmVTdGVwPXswfSBhbHRlcm5hdGl2ZUxhYmVsPlxuICAgICAgICAgICAgICAgICAgICA8U3RlcCBrZXk9ezB9PlxuICAgICAgICAgICAgICAgICAgICAgICAgPFN0ZXBMYWJlbD57XCJBcHBvaW50bWVudCBSZXF1ZXN0ZWRcIn08L1N0ZXBMYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgPC9TdGVwPlxuICAgICAgICAgICAgICAgICAgICA8U3RlcCBrZXk9ezF9PlxuICAgICAgICAgICAgICAgICAgICAgICAgPFN0ZXBMYWJlbD57XCJBcHBvaW50bWVudCBDb25maXJtZWRcIn08L1N0ZXBMYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgPC9TdGVwPlxuICAgICAgICAgICAgICAgICAgICA8U3RlcCBrZXk9ezJ9PlxuICAgICAgICAgICAgICAgICAgICAgICAgPFN0ZXBMYWJlbD57XCJBcHBvaW50bWVudCBDb21wbGV0ZVwifTwvU3RlcExhYmVsPlxuICAgICAgICAgICAgICAgICAgICA8L1N0ZXA+XG4gICAgICAgICAgICAgICAgPC9TdGVwcGVyPlxuICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInJlcXVlc3RMaW5lXCI+V2UgaGF2ZSByZXF1ZXN0ZWQgRHIuU21pdGggdG8gY29uZmlybSB5b3VyIGFwcG9pbnRtZW50PC9wPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGF0aWVudE5hbWVcIj5cbiAgICAgICAgICAgICAgICAgICAgPHA+Zm9yPC9wPlxuICAgICAgICAgICAgICAgICAgICA8cD5CcmlqZXNoIEt1bWFyPC9wPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJkZXRhaWxzXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJsYmxcIj5XaXRoPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiY250bnRcIj5Eci4gU3RldmUgU21pdGg8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwibGJsXCI+V2hlcmU8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJjbnRudFwiPlNhcnZvZGF5YSBDbGluaWMsICMgMzYxLCBTZWN0b3IgNTAsIEd1cmdhb248L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwibGJsXCI+V2hlbjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImNudG50XCI+V2VkbmVzZGF5LCBKdW5lIDI3LCAyMDE4LCAxMTo0NUFNPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImxibFwiPlJlZmVyZW5jZSM8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJjbnRudFwiPkhVVkhKQjg3SEpCSkg8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJyZXF1ZXN0XCI+UmVxdWVzdCBSZS1TY2hlZHVsZS9DYW5jZWw8L2J1dHRvbj5cblxuICAgICAgICAgICAgICAgIDxDYWxJY29uIGNsYXNzTmFtZT1cImNhbGxJY29uXCIvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IEJvb2tpbmdWaWV3XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgRG9jdG9yUHJvZmlsZUNhcmQgZnJvbSAnLi4vY29tbW9ucy9kb2N0b3JQcm9maWxlQ2FyZC9pbmRleC5qcydcbmltcG9ydCBDbGluaWNTZWxlY3RvciBmcm9tICcuLi9jb21tb25zL2NsaW5pY1NlbGVjdG9yL2luZGV4LmpzJ1xuXG5jbGFzcyBDbGluaWNMaXN0VmlldyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgICBzZWxlY3RlZERvY3RvcjogbnVsbFxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIGxldCBkb2N0b3JJZCA9IHRoaXMucHJvcHMubWF0Y2gucGFyYW1zLmlkXG4gICAgICAgIGlmIChkb2N0b3JJZCkge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHNlbGVjdGVkRG9jdG9yOiBkb2N0b3JJZCB9KVxuICAgICAgICAgICAgdGhpcy5wcm9wcy5nZXREb2N0b3JCeUlkKGRvY3RvcklkKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImRvY3RvclByb2ZpbGVcIj5cblxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5ET0NUT1JTW3RoaXMuc3RhdGUuc2VsZWN0ZWREb2N0b3JdID9cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPERvY3RvclByb2ZpbGVDYXJkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhpZGVCb3R0b209e3RydWV9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhpZGVCb29rTm93PXt0cnVlfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXRhaWxzPXt0aGlzLnByb3BzLkRPQ1RPUlNbdGhpcy5zdGF0ZS5zZWxlY3RlZERvY3Rvcl19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Q2xpbmljU2VsZWN0b3JcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGV0YWlscz17dGhpcy5wcm9wcy5ET0NUT1JTW3RoaXMuc3RhdGUuc2VsZWN0ZWREb2N0b3JdfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7Li4udGhpcy5wcm9wc31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+IDogXCJcIlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBDbGluaWNMaXN0Vmlld1xuIiwiaW1wb3J0IENsaW5pY0xpc3RWaWV3IGZyb20gJy4vQ2xpbmljTGlzdFZpZXcuanMnXG5cbmV4cG9ydCBkZWZhdWx0IENsaW5pY0xpc3RWaWV3IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cbmltcG9ydCBDbG9ja0ljb24gZnJvbSAnbWF0ZXJpYWwtdWktaWNvbnMvQXZUaW1lcic7XG5pbXBvcnQgUmlnaHRBcnJvd0ljb24gZnJvbSAnbWF0ZXJpYWwtdWktaWNvbnMvS2V5Ym9hcmRBcnJvd1JpZ2h0JztcbmltcG9ydCBNb25leUljb24gZnJvbSAnbWF0ZXJpYWwtdWktaWNvbnMvQXR0YWNoTW9uZXknO1xuXG5cbmNsYXNzIENsaW5pY1NlbGVjdG9yIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICB9XG5cbiAgICBzZWxlY3RDbGluaWMoY2xpbmljSWQpIHtcbiAgICAgICAgbGV0IGRvY3RvcklkID0gdGhpcy5wcm9wcy5tYXRjaC5wYXJhbXMuaWRcbiAgICAgICAgdGhpcy5jb250ZXh0LnJvdXRlci5oaXN0b3J5LnB1c2goYC9kb2N0b3Jwcm9maWxlLyR7ZG9jdG9ySWR9LyR7Y2xpbmljSWR9L2Jvb2tgKVxuICAgIH1cblxuICAgIHN0YXRpYyBjb250ZXh0VHlwZXMgPSB7XG4gICAgICAgIHJvdXRlcjogKCkgPT4gbnVsbFxuICAgIH1cblxuICAgIGdldFRpbWUodW5peF90aW1lc3RhbXApIHtcbiAgICAgICAgdmFyIGRhdGUgPSBuZXcgRGF0ZSh1bml4X3RpbWVzdGFtcCAqIDEwMDApO1xuICAgICAgICB2YXIgaG91cnMgPSBkYXRlLmdldEhvdXJzKCk7XG4gICAgICAgIHZhciBtaW51dGVzID0gXCIwXCIgKyBkYXRlLmdldE1pbnV0ZXMoKTtcbiAgICAgICAgcmV0dXJuIGhvdXJzICsgJzonICsgbWludXRlcy5zdWJzdHIoLTIpXG4gICAgfVxuXG4gICAgZ2V0QXZhaWxhYmlsaXR5KGF2YWlsYWJpbGl0eSkge1xuICAgICAgICBpZiAoYXZhaWxhYmlsaXR5KSB7XG4gICAgICAgICAgICBsZXQgeyBuZXh0QXZhaWxhYmxlIH0gPSBhdmFpbGFiaWxpdHlcbiAgICAgICAgICAgIGlmIChuZXh0QXZhaWxhYmxlWzBdKSB7XG4gICAgICAgICAgICAgICAgbGV0IGRhdGUgPSBuZXcgRGF0ZShuZXh0QXZhaWxhYmxlWzBdLmZyb20pLnRvRGF0ZVN0cmluZygpXG4gICAgICAgICAgICAgICAgbGV0IHRpbWVTdGFydCA9IHRoaXMuZ2V0VGltZShuZXh0QXZhaWxhYmxlWzBdLmZyb20pXG4gICAgICAgICAgICAgICAgbGV0IHRpbWVFbmQgPSB0aGlzLmdldFRpbWUobmV4dEF2YWlsYWJsZVswXS50bylcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICBkYXRlLCB0aW1lU3RhcnQsIHRpbWVFbmQsIGZlZTogbmV4dEF2YWlsYWJsZVswXS5mZWVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4geyBkYXRlOiAnJywgdGltZVN0YXJ0OiAnJywgdGltZUVuZDogJycsIGZlZTogeyBhbW91bnQ6ICcnIH0gfVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICBsZXQgeyBhdmFpbGFiaWxpdHkgfSA9IHRoaXMucHJvcHMuZGV0YWlsc1xuXG4gICAgICAgIGF2YWlsYWJpbGl0eSA9IGF2YWlsYWJpbGl0eS5tYXAoKGNsaW5pYykgPT4ge1xuICAgICAgICAgICAgY2xpbmljLnRpbWVBdmFpbGFibGUgPSB0aGlzLmdldEF2YWlsYWJpbGl0eShjbGluaWMpXG4gICAgICAgICAgICByZXR1cm4gY2xpbmljXG4gICAgICAgIH0pXG5cblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjbGluaWNTZWxlY3RvclwiPlxuICAgICAgICAgICAgICAgIDxoNT5Eci4gU3RldmUgaXMgYXZhaWxhYmxlIGF0PC9oNT5cblxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgYXZhaWxhYmlsaXR5Lm1hcCgoY2xpbmljLCBpKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gPGRpdiBrZXk9e2l9IGNsYXNzTmFtZT1cImNsaW5pY1wiIG9uQ2xpY2s9e3RoaXMuc2VsZWN0Q2xpbmljLmJpbmQodGhpcyxjbGluaWMuaWQpfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm5hbWVcIj57Y2xpbmljLm5hbWUgKyBcIiwgXCIgKyBjbGluaWMuYWRkcmVzc308L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImRldGFpbHNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPENsb2NrSWNvbiBjbGFzc05hbWU9XCJjbG9ja0ljb25cIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8TW9uZXlJY29uIGNsYXNzTmFtZT1cIm1vbmV5SWNvblwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsaW5pYy5kYXlzLm1hcCgoZGF5LCBpKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiA8c3BhblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5PXtpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtkYXkuaXNBdmFpbGFibGUgPyBcImlzQXZhaWxhYmxlXCIgOiBcIlwifT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtkYXkuZGF5WzBdfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtjbGluaWMudGltZUF2YWlsYWJsZS50aW1lU3RhcnR9IHRvIHtjbGluaWMudGltZUF2YWlsYWJsZS50aW1lRW5kfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwPntgRmVlOiBScy4ke2NsaW5pYy50aW1lQXZhaWxhYmxlLmZlZS5hbW91bnR9YH08L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJib29rXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHRcIj5Cb29rPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8UmlnaHRBcnJvd0ljb24gY2xhc3NOYW1lPVwiYm9va0ljb25cIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBDbGluaWNTZWxlY3RvclxuIiwiaW1wb3J0IENsaW5pY1NlbGVjdG9yIGZyb20gJy4vQ2xpbmljU2VsZWN0b3IuanMnXG5cbmV4cG9ydCBkZWZhdWx0IENsaW5pY1NlbGVjdG9yIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IENoaXAgZnJvbSAnbWF0ZXJpYWwtdWkvQ2hpcCc7XG5cblxuY2xhc3MgQ29tbW9ubHlTZWFyY2hlZCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG5cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICBsZXQgcGlsbHMgPSB0aGlzLnByb3BzLmRhdGEubWFwKChwaWxsKSA9PiB7XG4gICAgICAgICAgICBsZXQgc2VsZWN0ZWQgPSAhIXRoaXMucHJvcHMuc2VsZWN0ZWRbcGlsbC5pZF1cbiAgICAgICAgICAgIHJldHVybiA8Q2hpcFxuICAgICAgICAgICAgICAgIGxhYmVsPXtwaWxsLm5hbWV9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtzZWxlY3RlZCA/IFwicGlsbCBzZWxlY3RlZFwiIDogXCJwaWxsXCJ9XG4gICAgICAgICAgICAgICAga2V5PXtwaWxsLmlkfVxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMudG9nZ2xlUGlsbChwaWxsLmlkKVxuICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAvPlxuXG4gICAgICAgIH0pXG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29tbW9ubHlTZWFyY2hlZFwiPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImhlYWRpbmdcIj57dGhpcy5wcm9wcy5oZWFkaW5nfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBpbGxzXCI+XG4gICAgICAgICAgICAgICAgICAgIHtwaWxsc31cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBDb21tb25seVNlYXJjaGVkXG4iLCJpbXBvcnQgQ29tbW9ubHlTZWFyY2hlZCBmcm9tICcuL0NvbW1vbmx5U2VhcmNoZWQuanMnXG5cblxuZXhwb3J0IGRlZmF1bHQgQ29tbW9ubHlTZWFyY2hlZCIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCBDaGlwIGZyb20gJ21hdGVyaWFsLXVpL0NoaXAnO1xuXG5jbGFzcyBDcml0ZXJpYVNlbGVjdG9yIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICB9XG5cbiAgICBoYW5kbGVEZWxldGUoaWQsIGhhbmRsZXIpIHtcbiAgICAgICAgaWYoaGFuZGxlciA9PSAndG9nZ2xlQ3JpdGVyaWEnKXtcbiAgICAgICAgICAgIHRoaXMucHJvcHNbaGFuZGxlcl0oe2lkfSlcbiAgICAgICAgfSBlbHNle1xuICAgICAgICAgICAgdGhpcy5wcm9wc1toYW5kbGVyXShpZClcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN0YXRpYyBjb250ZXh0VHlwZXMgPSB7XG4gICAgICAgIHJvdXRlcjogKCkgPT4gbnVsbFxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICBsZXQgcGlsbHMgPSBbXVxuICAgICAgICBsZXQgY29uZGl0aW9ucyA9IFtdXG4gICAgICAgIGxldCBzcGVjaWFsaXRpZXMgPSBbXVxuICAgICAgICBsZXQgY3JpdGVyaWFzID0gW11cblxuICAgICAgICBpZiAodGhpcy5wcm9wcy5jb21tb25seVNlYXJjaGVkQ29uZGl0aW9ucykge1xuICAgICAgICAgICAgY29uZGl0aW9ucyA9IHRoaXMucHJvcHMuY29tbW9ubHlTZWFyY2hlZENvbmRpdGlvbnMuZmlsdGVyKChwaWxsKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMuc2VsZWN0ZWRDb25kaXRpb25zW3BpbGwuaWRdXG4gICAgICAgICAgICB9KS5tYXAoKHBpbGwpID0+IHtcbiAgICAgICAgICAgICAgICBwaWxsLnRzID0gdGhpcy5wcm9wcy5zZWxlY3RlZENvbmRpdGlvbnNbcGlsbC5pZF1cbiAgICAgICAgICAgICAgICBwaWxsLnR5cGUgPSAndG9nZ2xlQ29uZGl0aW9uJ1xuICAgICAgICAgICAgICAgIHJldHVybiBwaWxsXG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmNvbW1vbmx5U2VhcmNoZWRTcGVjaWFsaXRpZXMpIHtcbiAgICAgICAgICAgIHNwZWNpYWxpdGllcyA9IHRoaXMucHJvcHMuY29tbW9ubHlTZWFyY2hlZFNwZWNpYWxpdGllcy5maWx0ZXIoKHBpbGwpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5zZWxlY3RlZFNwZWNpYWxpdGllc1twaWxsLmlkXVxuICAgICAgICAgICAgfSkubWFwKChwaWxsKSA9PiB7XG4gICAgICAgICAgICAgICAgcGlsbC50cyA9IHRoaXMucHJvcHMuc2VsZWN0ZWRTcGVjaWFsaXRpZXNbcGlsbC5pZF1cbiAgICAgICAgICAgICAgICBwaWxsLnR5cGUgPSAndG9nZ2xlU3BlY2lhbGl0eSdcbiAgICAgICAgICAgICAgICByZXR1cm4gcGlsbFxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgICBpZih0aGlzLnByb3BzLnNlbGVjdGVkQ3JpdGVyaWEpe1xuICAgICAgICAgICAgY3JpdGVyaWFzID0gT2JqZWN0LmtleXModGhpcy5wcm9wcy5zZWxlY3RlZENyaXRlcmlhKS5tYXAoKGNyaXRlcmlhKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IHBpbGwgPSB0aGlzLnByb3BzLnNlbGVjdGVkQ3JpdGVyaWFbY3JpdGVyaWFdXG4gICAgICAgICAgICAgICAgcGlsbC50eXBlID0gJ3RvZ2dsZUNyaXRlcmlhJ1xuICAgICAgICAgICAgICAgIHJldHVybiBwaWxsXG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG5cbiAgICAgICAgcGlsbHMgPSBbLi4uY29uZGl0aW9ucywgLi4uc3BlY2lhbGl0aWVzLCAuLi5jcml0ZXJpYXNdXG4gICAgICAgIHBpbGxzID0gcGlsbHMuc29ydCgoYSxiKSA9PiB7XG4gICAgICAgICAgICBsZXQgZGF0ZUEgPSBuZXcgRGF0ZShhLnRzKS5nZXRUaW1lKClcbiAgICAgICAgICAgIGxldCBkYXRlQiA9IG5ldyBEYXRlKGIudHMpLmdldFRpbWUoKVxuICAgICAgICAgICAgcmV0dXJuIGRhdGVBID4gZGF0ZUIgPyAxIDogLTFcbiAgICAgICAgfSkubWFwKChwaWxsKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gPENoaXBcbiAgICAgICAgICAgICAgICBsYWJlbD17cGlsbC5uYW1lfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17XCJwaWxsc2VsZWN0ZWRcIn1cbiAgICAgICAgICAgICAgICBrZXk9e3BpbGwudHlwZSArIHBpbGwuaWR9XG4gICAgICAgICAgICAgICAgb25EZWxldGU9e3RoaXMuaGFuZGxlRGVsZXRlLmJpbmQodGhpcywgcGlsbC5pZCwgcGlsbC50eXBlKX1cbiAgICAgICAgICAgIC8+XG4gICAgICAgIH0pXG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY3JpdGVyaWFTZWxlY3RvclwiPlxuICAgICAgICAgICAgICAgIDxpbnB1dCBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGV4dC5yb3V0ZXIuaGlzdG9yeS5wdXNoKCcvY3JpdGVyaWFzZWFyY2gnKVxuICAgICAgICAgICAgICAgIH19IHBsYWNlaG9sZGVyPXtcIlNlYXJjaCBmb3Igc3ltcHRvbXMsIERvY3RvcnMsIGNvbmRpdGlvbnMgLi5ldGNcIn0gLz5cblxuICAgICAgICAgICAgICAgIHtwaWxsc31cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBDcml0ZXJpYVNlbGVjdG9yXG4iLCJpbXBvcnQgQ3JpdGVyaWFTZWxlY3RvciBmcm9tICcuL0NyaXRlcmlhU2VsZWN0b3IuanMnXG5cbmV4cG9ydCBkZWZhdWx0IENyaXRlcmlhU2VsZWN0b3IiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcblxuaW1wb3J0IEVtb3RpSWNvbiBmcm9tICdtYXRlcmlhbC11aS1pY29ucy9BY2NvdW50Q2lyY2xlJztcbmltcG9ydCBIb21lSWNvbiBmcm9tICdtYXRlcmlhbC11aS1pY29ucy9Ib21lJztcbmltcG9ydCBDbG9ja0ljb24gZnJvbSAnbWF0ZXJpYWwtdWktaWNvbnMvQXZUaW1lcic7XG5pbXBvcnQgTG9jYXRpb25zSWNvbiBmcm9tICdtYXRlcmlhbC11aS1pY29ucy9Mb2NhdGlvbk9uJztcblxuXG5jbGFzcyBEb2N0b3JQcm9maWxlQ2FyZCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgfVxuXG4gICAgY2FyZENsaWNrKGlkLCBlKSB7XG4gICAgICAgIHRoaXMuY29udGV4dC5yb3V0ZXIuaGlzdG9yeS5wdXNoKGAvZG9jdG9ycHJvZmlsZS8ke2lkfWApXG4gICAgfVxuXG4gICAgYm9va05vdyhpZCwgZSkge1xuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpXG4gICAgICAgIHRoaXMuY29udGV4dC5yb3V0ZXIuaGlzdG9yeS5wdXNoKGAvZG9jdG9ycHJvZmlsZS8ke2lkfS9hdmFpbGFiaWxpdHlgKVxuICAgIH1cblxuICAgIHN0YXRpYyBjb250ZXh0VHlwZXMgPSB7XG4gICAgICAgIHJvdXRlcjogKCkgPT4gbnVsbFxuICAgIH1cblxuICAgIGdldFF1YWxpZmljYXRpb25TdHIocXVhbGlmaWNhdGlvblNwZWNpYWxpemF0aW9uKSB7XG4gICAgICAgIHJldHVybiBxdWFsaWZpY2F0aW9uU3BlY2lhbGl6YXRpb24ucmVkdWNlKChzdHIsIGN1cnIsIGkpID0+IHtcbiAgICAgICAgICAgIHN0ciArPSBgJHtjdXJyLnF1YWxpZmljYXRpb259YFxuICAgICAgICAgICAgaWYgKGN1cnIuc3BlY2lhbGl6YXRpb24pIHtcbiAgICAgICAgICAgICAgICBzdHIgKz0gYCAtICR7Y3Vyci5zcGVjaWFsaXphdGlvbn1gXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoaSA8IHF1YWxpZmljYXRpb25TcGVjaWFsaXphdGlvbi5sZW5ndGggLSAxKSBzdHIgKz0gYCwgYDtcbiAgICAgICAgICAgIHJldHVybiBzdHJcbiAgICAgICAgfSwgXCJcIilcbiAgICB9XG5cbiAgICBnZXRUaW1lKHVuaXhfdGltZXN0YW1wKSB7XG4gICAgICAgIHZhciBkYXRlID0gbmV3IERhdGUodW5peF90aW1lc3RhbXAgKiAxMDAwKTtcbiAgICAgICAgdmFyIGhvdXJzID0gZGF0ZS5nZXRIb3VycygpO1xuICAgICAgICB2YXIgbWludXRlcyA9IFwiMFwiICsgZGF0ZS5nZXRNaW51dGVzKCk7XG4gICAgICAgIHJldHVybiBob3VycyArICc6JyArIG1pbnV0ZXMuc3Vic3RyKC0yKVxuICAgIH1cblxuICAgIGdldEF2YWlsYWJpbGl0eShhdmFpbGFiaWxpdHkpIHtcbiAgICAgICAgaWYgKGF2YWlsYWJpbGl0eSkge1xuICAgICAgICAgICAgbGV0IHsgbmV4dEF2YWlsYWJsZSB9ID0gYXZhaWxhYmlsaXR5XG4gICAgICAgICAgICBpZiAobmV4dEF2YWlsYWJsZVswXSkge1xuICAgICAgICAgICAgICAgIGxldCBkYXRlID0gbmV3IERhdGUobmV4dEF2YWlsYWJsZVswXS5mcm9tKS50b0RhdGVTdHJpbmcoKVxuICAgICAgICAgICAgICAgIGxldCB0aW1lU3RhcnQgPSB0aGlzLmdldFRpbWUobmV4dEF2YWlsYWJsZVswXS5mcm9tKVxuICAgICAgICAgICAgICAgIGxldCB0aW1lRW5kID0gdGhpcy5nZXRUaW1lKG5leHRBdmFpbGFibGVbMF0udG8pXG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0ZSwgdGltZVN0YXJ0LCB0aW1lRW5kLCBmZWU6IG5leHRBdmFpbGFibGVbMF0uZmVlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHsgZGF0ZTogJycsIHRpbWVTdGFydDogJycsIHRpbWVFbmQ6ICcnLCBmZWU6IHsgYW1vdW50OiAnJyB9IH1cbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgbGV0IHsgaWQsIG5hbWUsIHByb2ZpbGVfaW1nLCBwcmFjdGljZV9kdXJhdGlvbiwgcXVhbGlmaWNhdGlvblNwZWNpYWxpemF0aW9uLCBjb25zdWx0YXRpb25Db3VudCwgYXZhaWxhYmlsaXR5LCBwYXN0RXhwZXJpZW5jZSB9ID0gdGhpcy5wcm9wcy5kZXRhaWxzXG5cbiAgICAgICAgbGV0IHF1YWxpZmljYXRpb25TdHJpbmcgPSB0aGlzLmdldFF1YWxpZmljYXRpb25TdHIocXVhbGlmaWNhdGlvblNwZWNpYWxpemF0aW9uKVxuICAgICAgICBsZXQgdGltZUF2YWlsYWJsZSA9IHRoaXMuZ2V0QXZhaWxhYmlsaXR5KGF2YWlsYWJpbGl0eVswXSlcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJkb2N0b3JDYXJkXCIgb25DbGljaz17dGhpcy5jYXJkQ2xpY2suYmluZCh0aGlzLCBpZCl9PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZGV0YWlsc0RpdlwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN1Yk9wdGlvbnNJbWFnZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGltZyBzcmM9e3Byb2ZpbGVfaW1nfSBjbGFzc05hbWU9XCJkb2N0b3JJbWFnZVwiIC8+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN1Yk9wdGlvbnNDb250ZW50XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJuYW1lXCI+e25hbWV9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicXVhbGlmaWNhdGlvblwiPntxdWFsaWZpY2F0aW9uU3RyaW5nfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImRlc2lnbmF0aW9uXCI+e3Bhc3RFeHBlcmllbmNlfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImV4cGVyaWVuY2VcIj57cHJhY3RpY2VfZHVyYXRpb259IHllYXJzIG9mIGV4cGVyaWVuY2U8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAhIXRoaXMucHJvcHMuaGlkZUJvb2tOb3cgPyAnJyA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdWJPcHRpb25zSW50ZXJhY3RcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJib29rTm93XCIgb25DbGljaz17dGhpcy5ib29rTm93LmJpbmQodGhpcywgaWQpfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEJvb2sgTm93XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicHJpY2VcIj5GZWU6IFJzLiB7dGltZUF2YWlsYWJsZS5mZWUuYW1vdW50fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgISF0aGlzLnByb3BzLmhpZGVCb3R0b20gPyAnJyA6XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJvdHRvbU9wdGlvbnNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN1Yk9wdGlvbnNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPEhvbWVJY29uIGNsYXNzTmFtZT1cImNsaW5pY0ljb25cIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJjbGluaWNOYW1lXCI+e2F2YWlsYWJpbGl0eVswXS5uYW1lfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN1Yk9wdGlvbnNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPENsb2NrSWNvbiBjbGFzc05hbWU9XCJjbGluaWNJY29uXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGltZUVudHJ5XCI+e3RpbWVBdmFpbGFibGUuZGF0ZX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRpbWVFbnRyeVwiPnt0aW1lQXZhaWxhYmxlLnRpbWVTdGFydH0gdG8ge3RpbWVBdmFpbGFibGUudGltZUVuZH08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdWJPcHRpb25zXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxMb2NhdGlvbnNJY29uIGNsYXNzTmFtZT1cImNsaW5pY0ljb25cIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJjbGluaWNOYW1lXCI+e2F2YWlsYWJpbGl0eVswXS5hZGRyZXNzfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBEb2N0b3JQcm9maWxlQ2FyZFxuIiwiaW1wb3J0IERvY3RvclByb2ZpbGVDYXJkIGZyb20gJy4vRG9jdG9yUHJvZmlsZUNhcmQuanMnXG5cbmV4cG9ydCBkZWZhdWx0IERvY3RvclByb2ZpbGVDYXJkIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuY2xhc3MgU2VsZWN0ZWRDbGluaWMgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgICAgICB0aGlzLnN0YXRlID0ge1xuXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdGF0aWMgY29udGV4dFR5cGVzID0ge1xuICAgICAgICByb3V0ZXI6ICgpID0+IG51bGxcbiAgICB9XG5cdFxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICBsZXQgeyBzZWxlY3RlZERvY3Rvciwgc2VsZWN0ZWRDbGluaWMgfSA9IHRoaXMucHJvcHNcblxuICAgICAgICBsZXQgY2xpbmljRGF0YSA9IHNlbGVjdGVkRG9jdG9yLmF2YWlsYWJpbGl0eS5maWx0ZXIoKGNsaW5pYykgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGNsaW5pYy5pZCA9PSBzZWxlY3RlZENsaW5pY1xuICAgICAgICB9KVswXVxuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNlbGVjdGVkQ2xpbmljXCI+XG4gICAgICAgICAgICAgICAgPGg1PlNlbGVjdGVkIENsaW5pYzwvaDU+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiY2xpbmljTmFtZVwiPnsgY2xpbmljRGF0YS5uYW1lICsgXCIsIFwiICsgY2xpbmljRGF0YS5hZGRyZXNzIH08L3NwYW4+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZmVlXCI+RmVlOiBScy57Y2xpbmljRGF0YS5uZXh0QXZhaWxhYmxlWzBdLmZlZS5hbW91bnR9PC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IFNlbGVjdGVkQ2xpbmljXG4iLCJpbXBvcnQgU2VsZWN0ZWRDbGluaWMgZnJvbSAnLi9TZWxlY3RlZENsaW5pYy5qcydcblxuZXhwb3J0IGRlZmF1bHQgU2VsZWN0ZWRDbGluaWMiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5jb25zdCBkZWJvdW5jZXIgPSAoZm4sIGRlbGF5KSA9PiB7XG4gICAgbGV0IHRpbWVyID0gbnVsbFxuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aW1lcilcbiAgICAgICAgdGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIGZuLmNhbGwodGhpcylcbiAgICAgICAgfSwgZGVsYXkpXG4gICAgfVxufVxuXG5cbmNsYXNzIENyaXRlcmlhU2VhcmNoVmlldyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgICBzZWFyY2hWYWx1ZTogJycsXG4gICAgICAgICAgICBzZWFyY2hSZXN1bHRzOiBbXVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIHRoaXMuZ2V0U2VhcmNoUmVzdWx0cyA9IGRlYm91bmNlcih0aGlzLmdldFNlYXJjaFJlc3VsdHMuYmluZCh0aGlzKSwgMTAwMClcbiAgICAgICAgbGV0IGlucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RvcENyaXRlcmlhU2VhcmNoJylcbiAgICAgICAgaW5wdXQuZm9jdXMoKVxuICAgIH1cblxuICAgIGlucHV0SGFuZGxlcihlKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBzZWFyY2hWYWx1ZTogZS50YXJnZXQudmFsdWUgfSlcbiAgICAgICAgdGhpcy5nZXRTZWFyY2hSZXN1bHRzKClcbiAgICB9XG5cbiAgICBnZXRTZWFyY2hSZXN1bHRzKCkge1xuICAgICAgICB0aGlzLnByb3BzLmdldENyaXRlcmlhUmVzdWx0cyh0aGlzLnN0YXRlLnNlYXJjaFZhbHVlLCAoc2VhcmNoUmVzdWx0cykgPT4ge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHNlYXJjaFJlc3VsdHM6IHNlYXJjaFJlc3VsdHMucmVzdWx0IH0pXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgYWRkQ3JpdGVyaWEoY3JpdGVyaWEsIHR5cGUpIHtcbiAgICAgICAgY3JpdGVyaWEudHlwZSA9IHR5cGVcbiAgICAgICAgdGhpcy5wcm9wcy50b2dnbGVDcml0ZXJpYShjcml0ZXJpYSlcbiAgICAgICAgdGhpcy5jb250ZXh0LnJvdXRlci5oaXN0b3J5LmdvQmFjaygpXG4gICAgfVxuXG4gICAgc3RhdGljIGNvbnRleHRUeXBlcyA9IHtcbiAgICAgICAgcm91dGVyOiAoKSA9PiBudWxsXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxvY2F0aW9uU2VhcmNoXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsb2NhdGlvblNlYXJjaEJveFwiPlxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgY2xhc3NOYW1lPVwidG9wU2VhcmNoXCIgaWQ9XCJ0b3BDcml0ZXJpYVNlYXJjaFwiIG9uQ2hhbmdlPXt0aGlzLmlucHV0SGFuZGxlci5iaW5kKHRoaXMpfSB2YWx1ZT17dGhpcy5zdGF0ZS5zZWFyY2hWYWx1ZX0gcGxhY2Vob2xkZXI9XCJTZWFyY2ggZm9yIHN5bXB0b21zLCBEb2N0b3MsIGNvbmRpdGlvbnMgLi5ldGNcIi8+XG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUuc2VhcmNoUmVzdWx0cy5tYXAoKHR5cGUsaSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT1cInNlYXJjaFJlc3VsdFR5cGVcIiBrZXk9e2l9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cD57dHlwZS5uYW1lfTwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZS5kYXRhLm1hcCgocmVzdWx0RGF0YSxqKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDxzcGFuIGtleT17an0gY2xhc3NOYW1lPVwicGFjLWl0ZW1cIiBvbkNsaWNrPXt0aGlzLmFkZENyaXRlcmlhLmJpbmQodGhpcywgcmVzdWx0RGF0YSwgdHlwZS50eXBlKX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtyZXN1bHREYXRhLm5hbWV9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgQ3JpdGVyaWFTZWFyY2hWaWV3XG4iLCJpbXBvcnQgQ3JpdGVyaWFTZWFyY2hWaWV3IGZyb20gJy4vQ3JpdGVyaWFTZWFyY2hWaWV3LmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBDcml0ZXJpYVNlYXJjaFZpZXciLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgRG9jdG9yUHJvZmlsZUNhcmQgZnJvbSAnLi4vY29tbW9ucy9kb2N0b3JQcm9maWxlQ2FyZC9pbmRleC5qcydcbmltcG9ydCBBYm91dERvY3RvciBmcm9tICcuLi9kb2N0b3JQcm9maWxlL2Fib3V0RG9jdG9yL2luZGV4LmpzJ1xuaW1wb3J0IFByb2Zlc3Npb25hbEdyYXBoIGZyb20gJy4uL2RvY3RvclByb2ZpbGUvcHJvZmVzc2lvbmFsR3JhcGgvaW5kZXguanMnXG5pbXBvcnQgQ2xpbmljU2VsZWN0b3IgZnJvbSAnLi4vY29tbW9ucy9jbGluaWNTZWxlY3Rvci9pbmRleC5qcydcblxuY2xhc3MgRG9jdG9yUHJvZmlsZVZpZXcgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgc2VsZWN0ZWREb2N0b3IgOiBudWxsXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgbGV0IGRvY3RvcklkID0gdGhpcy5wcm9wcy5tYXRjaC5wYXJhbXMuaWRcbiAgICAgICAgaWYgKGRvY3RvcklkKSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtzZWxlY3RlZERvY3RvciA6IGRvY3RvcklkfSlcbiAgICAgICAgICAgIHRoaXMucHJvcHMuZ2V0RG9jdG9yQnlJZChkb2N0b3JJZClcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJkb2N0b3JQcm9maWxlXCI+XG5cbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuRE9DVE9SU1t0aGlzLnN0YXRlLnNlbGVjdGVkRG9jdG9yXSA/XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxEb2N0b3JQcm9maWxlQ2FyZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoaWRlQm90dG9tPXt0cnVlfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXRhaWxzPXt0aGlzLnByb3BzLkRPQ1RPUlNbdGhpcy5zdGF0ZS5zZWxlY3RlZERvY3Rvcl19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8QWJvdXREb2N0b3IgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Q2xpbmljU2VsZWN0b3JcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGV0YWlscz17dGhpcy5wcm9wcy5ET0NUT1JTW3RoaXMuc3RhdGUuc2VsZWN0ZWREb2N0b3JdfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7Li4udGhpcy5wcm9wc31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxQcm9mZXNzaW9uYWxHcmFwaCAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+IDogXCJcIlxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBEb2N0b3JQcm9maWxlVmlld1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cbmNsYXNzIEFib3V0RG9jdG9yIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcblxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYm91dERvY3RvclwiPlxuICAgICAgICAgICAgICAgIDxoNT5BYm91dCBEci4gU3RldmUgUmF5PC9oNT5cbiAgICAgICAgICAgICAgICA8cD5Mb3JlbSBpcHN1bSBkb2xvciBzaXQgYW1ldCwgZG9sb3IgdXQgdmVzdGlidWx1bSBibGFuZGl0LCB0dXJwaXMgZnVzY2UuIExhYm9yZSBwb3RlbnRpIHZpdmFtdXMgb2RpbyBhcmN1IHZlc3RpYnVsdW0uIEhlbmRyZXJpdCBudWxsYSBjb25zZWN0ZXR1ZXIgdHJpc3RpcXVlIGFudGUgbGVvLCB1bGxhbWNvcnBlciBjdXJzdXMgcnV0cnVtIDwvcD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBBYm91dERvY3RvclxuIiwiaW1wb3J0IEFib3V0RG9jdG9yIGZyb20gJy4vQWJvdXREb2N0b3IuanMnXG5cbmV4cG9ydCBkZWZhdWx0IEFib3V0RG9jdG9yIiwiaW1wb3J0IERvY3RvclByb2ZpbGVWaWV3IGZyb20gJy4vRG9jdG9yUHJvZmlsZVZpZXcuanMnXG5cbmV4cG9ydCBkZWZhdWx0IERvY3RvclByb2ZpbGVWaWV3IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cbmltcG9ydCBFeHBhbnNpb25QYW5lbCwge1xuICAgIEV4cGFuc2lvblBhbmVsU3VtbWFyeSxcbiAgICBFeHBhbnNpb25QYW5lbERldGFpbHMsXG59IGZyb20gJ21hdGVyaWFsLXVpL0V4cGFuc2lvblBhbmVsJztcbmltcG9ydCBFeHBhbmRNb3JlSWNvbiBmcm9tICdtYXRlcmlhbC11aS1pY29ucy9FeHBhbmRNb3JlJztcblxuY2xhc3MgUHJvZmVzc2lvbmFsR3JhcGggZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInByb2Zlc3Npb25hbEdyYXBoXCI+XG4gICAgICAgICAgICAgICAgPGg1PlByb2Zlc3Npb25hbCBHcmFwaDwvaDU+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJlcGFuZWxcIj5cbiAgICAgICAgICAgICAgICAgICAgPEV4cGFuc2lvblBhbmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgPEV4cGFuc2lvblBhbmVsU3VtbWFyeSBleHBhbmRJY29uPXs8RXhwYW5kTW9yZUljb24gLz59PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEVkdWNhdGlvblxuICAgICAgICAgICAgICAgICAgICAgICAgPC9FeHBhbnNpb25QYW5lbFN1bW1hcnk+XG4gICAgICAgICAgICAgICAgICAgICAgICA8RXhwYW5zaW9uUGFuZWxEZXRhaWxzPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9FeHBhbnNpb25QYW5lbERldGFpbHM+XG4gICAgICAgICAgICAgICAgICAgIDwvRXhwYW5zaW9uUGFuZWw+XG4gICAgICAgICAgICAgICAgICAgIDxFeHBhbnNpb25QYW5lbD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxFeHBhbnNpb25QYW5lbFN1bW1hcnkgZXhwYW5kSWNvbj17PEV4cGFuZE1vcmVJY29uIC8+fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBNZW1iZXJzaGlwc1xuICAgICAgICAgICAgICAgICAgICAgICAgPC9FeHBhbnNpb25QYW5lbFN1bW1hcnk+XG4gICAgICAgICAgICAgICAgICAgICAgICA8RXhwYW5zaW9uUGFuZWxEZXRhaWxzPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9FeHBhbnNpb25QYW5lbERldGFpbHM+XG4gICAgICAgICAgICAgICAgICAgIDwvRXhwYW5zaW9uUGFuZWw+XG4gICAgICAgICAgICAgICAgICAgIDxFeHBhbnNpb25QYW5lbD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxFeHBhbnNpb25QYW5lbFN1bW1hcnkgZXhwYW5kSWNvbj17PEV4cGFuZE1vcmVJY29uIC8+fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBFeHBlcmllbmNlXG4gICAgICAgICAgICAgICAgICAgICAgICA8L0V4cGFuc2lvblBhbmVsU3VtbWFyeT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxFeHBhbnNpb25QYW5lbERldGFpbHM+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L0V4cGFuc2lvblBhbmVsRGV0YWlscz5cbiAgICAgICAgICAgICAgICAgICAgPC9FeHBhbnNpb25QYW5lbD5cbiAgICAgICAgICAgICAgICAgICAgPEV4cGFuc2lvblBhbmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgPEV4cGFuc2lvblBhbmVsU3VtbWFyeSBleHBhbmRJY29uPXs8RXhwYW5kTW9yZUljb24gLz59PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFNwZWNpYWxpemF0aW9uc1xuICAgICAgICAgICAgICAgICAgICAgICAgPC9FeHBhbnNpb25QYW5lbFN1bW1hcnk+XG4gICAgICAgICAgICAgICAgICAgICAgICA8RXhwYW5zaW9uUGFuZWxEZXRhaWxzPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9FeHBhbnNpb25QYW5lbERldGFpbHM+XG4gICAgICAgICAgICAgICAgICAgIDwvRXhwYW5zaW9uUGFuZWw+XG4gICAgICAgICAgICAgICAgICAgIDxFeHBhbnNpb25QYW5lbD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxFeHBhbnNpb25QYW5lbFN1bW1hcnkgZXhwYW5kSWNvbj17PEV4cGFuZE1vcmVJY29uIC8+fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBBd2FyZHNcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvRXhwYW5zaW9uUGFuZWxTdW1tYXJ5PlxuICAgICAgICAgICAgICAgICAgICAgICAgPEV4cGFuc2lvblBhbmVsRGV0YWlscz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvRXhwYW5zaW9uUGFuZWxEZXRhaWxzPlxuICAgICAgICAgICAgICAgICAgICA8L0V4cGFuc2lvblBhbmVsPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IFByb2Zlc3Npb25hbEdyYXBoXG4iLCJpbXBvcnQgUHJvZmVzc2lvbmFsR3JhcGggZnJvbSAnLi9Qcm9mZXNzaW9uYWxHcmFwaC5qcydcblxuZXhwb3J0IGRlZmF1bHQgUHJvZmVzc2lvbmFsR3JhcGgiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcblxuY2xhc3MgTG9jYXRpb25TZWFyY2ggZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgIH1cblxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuXG4gICAgICAgIGxldCBpbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0b3BMb2NhdGlvblNlYXJjaCcpXG4gICAgICAgIGxldCBvcHRpb25zID0ge1xuICAgICAgICAgICAgdHlwZXM6IFsnZXN0YWJsaXNobWVudCddXG4gICAgICAgIH1cbiAgICAgICAgbGV0IGF1dG9jb21wbGV0ZSA9IG5ldyBnb29nbGUubWFwcy5wbGFjZXMuQXV0b2NvbXBsZXRlKGlucHV0LCBvcHRpb25zKVxuXG4gICAgICAgIGdvb2dsZS5tYXBzLmV2ZW50LmFkZExpc3RlbmVyKGF1dG9jb21wbGV0ZSwgJ3BsYWNlX2NoYW5nZWQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBsZXQgcGxhY2UgPSBhdXRvY29tcGxldGUuZ2V0UGxhY2UoKVxuICAgICAgICAgICAgdGhpcy5wcm9wcy5zZWxlY3RMb2NhdGlvbihwbGFjZSlcbiAgICAgICAgICAgIHRoaXMuY29udGV4dC5yb3V0ZXIuaGlzdG9yeS5nb0JhY2soKVxuICAgICAgICB9LmJpbmQodGhpcykpXG5cbiAgICAgICAgaW5wdXQuZm9jdXMoKVxuICAgIH1cblxuICAgIHN0YXRpYyBjb250ZXh0VHlwZXMgPSB7XG4gICAgICAgIHJvdXRlcjogKCkgPT4gbnVsbFxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsb2NhdGlvblNlYXJjaFwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibG9jYXRpb25TZWFyY2hCb3hcIj5cbiAgICAgICAgICAgICAgICAgICAgPGlucHV0IGNsYXNzTmFtZT1cInRvcFNlYXJjaFwiIGlkPVwidG9wTG9jYXRpb25TZWFyY2hcIiAvPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IExvY2F0aW9uU2VhcmNoXG4iLCJpbXBvcnQgTG9jYXRpb25TZWFyY2ggZnJvbSAnLi9Mb2NhdGlvblNlYXJjaC5qcydcblxuXG5leHBvcnQgZGVmYXVsdCBMb2NhdGlvblNlYXJjaCIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG5pbXBvcnQgRG9jdG9yUHJvZmlsZUNhcmQgZnJvbSAnLi4vY29tbW9ucy9kb2N0b3JQcm9maWxlQ2FyZC9pbmRleC5qcydcbmltcG9ydCBEZXRhaWxzRm9ybSBmcm9tICcuL2RldGFpbHNGb3JtL2luZGV4LmpzJ1xuaW1wb3J0IFNlbGVjdGVkQ2xpbmljIGZyb20gJy4uL2NvbW1vbnMvc2VsZWN0ZWRDbGluaWMvaW5kZXguanMnXG5cbmNsYXNzIFBhdGllbnREZXRhaWxzIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIHNlbGVjdGVkRG9jdG9yOiBudWxsLFxuICAgICAgICAgICAgc2VsZWN0ZWRDbGluaWM6IG51bGwsXG4gICAgICAgICAgICBzZWxlY3RlZFNsb3Q6IG51bGxcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByb2NlZWQoKXtcbiAgICAgICAgdGhpcy5jb250ZXh0LnJvdXRlci5oaXN0b3J5LnB1c2goJy9wYXltZW50JylcbiAgICB9XG5cbiAgICBnZXRMb2NhdGlvblBhcmFtKHRhZykge1xuICAgICAgICAvLyB0aGlzIEFQSSBhc3N1bWVzIHRoZSBjb250ZXh0IG9mIHJlYWN0LXJvdXRlci00XG4gICAgICAgIGNvbnN0IHBhcmFtU3RyaW5nID0gdGhpcy5wcm9wcy5sb2NhdGlvbi5zZWFyY2hcbiAgICAgICAgY29uc3QgcGFyYW1zID0gbmV3IFVSTFNlYXJjaFBhcmFtcyhwYXJhbVN0cmluZylcbiAgICAgICAgcmV0dXJuIHBhcmFtcy5nZXQodGFnKVxuICAgIH1cblxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgbGV0IGRvY3RvcklkID0gdGhpcy5wcm9wcy5tYXRjaC5wYXJhbXMuaWRcbiAgICAgICAgICAgIGxldCBjbGluaWNJZCA9IHRoaXMucHJvcHMubWF0Y2gucGFyYW1zLmNsaW5pY0lkXG4gICAgICAgICAgICBsZXQgc2VsZWN0ZWRTbG90ID0gdGhpcy5nZXRMb2NhdGlvblBhcmFtKCd0JylcbiAgICAgICAgICAgIHNlbGVjdGVkU2xvdCA9IG5ldyBEYXRlKHBhcnNlRmxvYXQoc2VsZWN0ZWRTbG90KSlcbiAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKGRvY3RvcklkICYmIGNsaW5pY0lkICYmIHNlbGVjdGVkU2xvdCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZERvY3RvcjogZG9jdG9ySWQsXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkQ2xpbmljOiBjbGluaWNJZCxcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRTbG90OiBzZWxlY3RlZFNsb3QudG9TdHJpbmcoKVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5nZXREb2N0b3JCeUlkKGRvY3RvcklkKVxuICAgICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIChlKSB7XG5cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN0YXRpYyBjb250ZXh0VHlwZXMgPSB7XG4gICAgICAgIHJvdXRlcjogKCkgPT4gbnVsbFxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwYXRpZW50RGV0YWlsc1wiPlxuXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnByb3BzLkRPQ1RPUlNbdGhpcy5zdGF0ZS5zZWxlY3RlZERvY3Rvcl0gP1xuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8RG9jdG9yUHJvZmlsZUNhcmRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGlkZUJvdHRvbT17dHJ1ZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGlkZUJvb2tOb3c9e3RydWV9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRldGFpbHM9e3RoaXMucHJvcHMuRE9DVE9SU1t0aGlzLnN0YXRlLnNlbGVjdGVkRG9jdG9yXX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxTZWxlY3RlZENsaW5pY1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZERvY3Rvcj17dGhpcy5wcm9wcy5ET0NUT1JTW3RoaXMuc3RhdGUuc2VsZWN0ZWREb2N0b3JdfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZENsaW5pYz17dGhpcy5zdGF0ZS5zZWxlY3RlZENsaW5pY31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic2VsZWN0ZWRBcHBvaW50bWVudFNsb3RcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGg1PlNlbGVjdGVkIEFwcG9pbnRtZW50IFNsb3Q8L2g1PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJhcHBkYXRlXCI+QXBwb2ludG1lbnQgRGF0ZTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZGF0ZVwiPnsgdGhpcy5zdGF0ZS5zZWxlY3RlZFNsb3QgfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8RGV0YWlsc0Zvcm0gLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cInByb2NlZWRidG5cIiBvbkNsaWNrPXt0aGlzLnByb2NlZWQuYmluZCh0aGlzKX0+Q29uZmlybSBCb29raW5nPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj4gOiBcIlwiXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgUGF0aWVudERldGFpbHNcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG5jbGFzcyBEZXRhaWxzRm9ybSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgICBwYXRpZW50TmFtZSA6ICcnLFxuICAgICAgICAgICAgcGF0aWVudEVtYWlsIDogJycsXG4gICAgICAgICAgICBwYXRpZW50R2VuZGVyIDogJ21hbGUnLFxuICAgICAgICAgICAgcGF0aWVudE1vYmlsZSA6ICcnLFxuICAgICAgICAgICAgb3RwIDonJ1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaW5wdXRIYW5kbGVyKHdoaWNoLCBlKXtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IFt3aGljaF0gOiBlLnRhcmdldC52YWx1ZSB9KVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJkZXRhaWxzRm9ybVwiPlxuICAgICAgICAgICAgICAgIDxoNT5QbGVhc2UgcHJvdmlkZSBwYXRpZW50IGRldGFpbHM8L2g1PlxuXG4gICAgICAgICAgICAgICAgPGlucHV0IHZhbHVlPXt0aGlzLnN0YXRlLnBhdGllbnROYW1lfSBvbkNoYW5nZT17dGhpcy5pbnB1dEhhbmRsZXIuYmluZCh0aGlzLCdwYXRpZW50TmFtZScpfSBjbGFzc05hbWU9XCJwdG5hbWVcIiBwbGFjZWhvbGRlcj1cIlBhdGllbnQgTmFtZSpcIiAvPlxuICAgICAgICAgICAgICAgIDxpbnB1dCB2YWx1ZT17dGhpcy5zdGF0ZS5wYXRpZW50RW1haWx9IG9uQ2hhbmdlPXt0aGlzLmlucHV0SGFuZGxlci5iaW5kKHRoaXMsJ3BhdGllbnRFbWFpbCcpfSBjbGFzc05hbWU9XCJwdGVtYWlsXCIgcGxhY2Vob2xkZXI9XCJFbWFpbCpcIiAvPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicHRnZW5kZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4+R2VuZGVyIDo8L3NwYW4+IFxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInJhZGlvXCIgbmFtZT1cImdlbmRlclwiIHZhbHVlPVwibWFsZVwiIGNoZWNrZWQ9e3RoaXMuc3RhdGUucGF0aWVudEdlbmRlciA9PT0gXCJtYWxlXCJ9IG9uQ2hhbmdlPXt0aGlzLmlucHV0SGFuZGxlci5iaW5kKHRoaXMsJ3BhdGllbnRHZW5kZXInKX0vPiBNYWxlXG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwicmFkaW9cIiBuYW1lPVwiZ2VuZGVyXCIgdmFsdWU9XCJmZW1hbGVcIiBjaGVja2VkPXt0aGlzLnN0YXRlLnBhdGllbnRHZW5kZXIgPT09IFwiZmVtYWxlXCJ9IG9uQ2hhbmdlPXt0aGlzLmlucHV0SGFuZGxlci5iaW5kKHRoaXMsJ3BhdGllbnRHZW5kZXInKX0vPiBGZW1hbGVcbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8aW5wdXQgdmFsdWU9e3RoaXMuc3RhdGUucGF0aWVudE1vYmlsZX0gb25DaGFuZ2U9e3RoaXMuaW5wdXRIYW5kbGVyLmJpbmQodGhpcywncGF0aWVudE1vYmlsZScpfSBjbGFzc05hbWU9XCJwdG1vYmlsZVwiIHBsYWNlaG9sZGVyPVwiTW9iaWxlKlwiIC8+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJvdHBidG5cIj4oUmUpU2VuZCBPVFA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8aW5wdXQgdmFsdWU9e3RoaXMuc3RhdGUub3RwfSBvbkNoYW5nZT17dGhpcy5pbnB1dEhhbmRsZXIuYmluZCh0aGlzLCdvdHAnKX0gY2xhc3NOYW1lPVwicHRvdHBcIiBwbGFjZWhvbGRlcj1cIkVudGVyIE9UUCpcIiAvPlxuXG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgRGV0YWlsc0Zvcm1cbiIsImltcG9ydCBEZXRhaWxzRm9ybSBmcm9tICcuL0RldGFpbHNGb3JtLmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBEZXRhaWxzRm9ybSIsImltcG9ydCBQYXRpZW50RGV0YWlscyBmcm9tICcuL1BhdGllbnREZXRhaWxzLmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBQYXRpZW50RGV0YWlscyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCBQYXltZW50SWNvbiBmcm9tICdtYXRlcmlhbC11aS1pY29ucy9QYXltZW50JztcbmltcG9ydCBDYXNoSWNvbiBmcm9tICdtYXRlcmlhbC11aS1pY29ucy9BdHRhY2hNb25leSc7XG5cbmNsYXNzIFBheW1lbnRWaWV3IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICB9XG5cbiAgICBwcm9jZWVkKCl7XG4gICAgICAgIHRoaXMuY29udGV4dC5yb3V0ZXIuaGlzdG9yeS5wdXNoKFwiL2Jvb2tpbmcvOnJlZklkXCIpXG4gICAgfVxuXG4gICAgc3RhdGljIGNvbnRleHRUeXBlcyA9IHtcbiAgICAgICAgcm91dGVyOiAoKSA9PiBudWxsXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBheW1lbnRcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm9mZmVyUm93XCI+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuPkdldCAxMCUgY2FzaGJhY2sgZm9yIGFsbCBvbmxpbmUgcGF5bWVudCwgVCZDPC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGF5bWVudFJvd1wiIG9uQ2xpY2s9e3RoaXMucHJvY2VlZC5iaW5kKHRoaXMpfT5cbiAgICAgICAgICAgICAgICAgICAgPFBheW1lbnRJY29uIGNsYXNzTmFtZT1cInBheW1lbnRJY29uXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4+UGF5dG0gV2FsbGV0PC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGF5bWVudFJvd1wiIG9uQ2xpY2s9e3RoaXMucHJvY2VlZC5iaW5kKHRoaXMpfT5cbiAgICAgICAgICAgICAgICAgICAgPFBheW1lbnRJY29uIGNsYXNzTmFtZT1cInBheW1lbnRJY29uXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4+Q3JlZGl0L0RlYml0L0FUTSBDYXJkPC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGF5bWVudFJvd1wiIG9uQ2xpY2s9e3RoaXMucHJvY2VlZC5iaW5kKHRoaXMpfT5cbiAgICAgICAgICAgICAgICAgICAgPFBheW1lbnRJY29uIGNsYXNzTmFtZT1cInBheW1lbnRJY29uXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4+TmV0IEJhbmtpbmc8L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwYXltZW50Um93XCIgb25DbGljaz17dGhpcy5wcm9jZWVkLmJpbmQodGhpcyl9PlxuICAgICAgICAgICAgICAgICAgICA8Q2FzaEljb24gY2xhc3NOYW1lPVwicGF5bWVudEljb25cIiAvPlxuICAgICAgICAgICAgICAgICAgICA8c3Bhbj5QYXkgaW4gQ2FzaDwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBheW1lbnRSb3dcIiBvbkNsaWNrPXt0aGlzLnByb2NlZWQuYmluZCh0aGlzKX0+XG4gICAgICAgICAgICAgICAgICAgIDxQYXltZW50SWNvbiBjbGFzc05hbWU9XCJwYXltZW50SWNvblwiIC8+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuPk9uRG9jIFBheTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBQYXltZW50Vmlld1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cbmltcG9ydCBDb21tb25seVNlYXJjaGVkIGZyb20gJy4uL2NvbW1vbnMvY29tbW9ubHlTZWFyY2hlZC9pbmRleC5qcydcbmltcG9ydCBMb2NhdGlvblNlbGVjdG9yIGZyb20gJy4uLy4uL2NvbW1vbnMvbG9jYXRpb25TZWxlY3Rvci9pbmRleC5qcydcbmltcG9ydCBDcml0ZXJpYVNlbGVjdG9yIGZyb20gJy4uL2NvbW1vbnMvY3JpdGVyaWFTZWxlY3Rvci9pbmRleC5qcydcblxuY2xhc3MgU2VhcmNoQ3JpdGVyaWFWaWV3IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpe1xuICAgICAgICB0aGlzLnByb3BzLmxvYWRTZWFyY2hDcml0ZXJpYSgpXG4gICAgfVxuXG4gICAgc2VhcmNoUHJvY2VlZCgpe1xuICAgICAgICAvLyBsZXQgc2VhcmNoRGF0YSA9IHtcbiAgICAgICAgLy8gICAgIHNlbGVjdGVkU3BlY2lhbGl0aWVzIDogdGhpcy5wcm9wcy5zZWxlY3RlZFNwZWNpYWxpdGllcyxcbiAgICAgICAgLy8gICAgIHNlbGVjdGVkQ29uZGl0aW9ucyA6IHRoaXMucHJvcHMuc2VsZWN0ZWRDb25kaXRpb25zLFxuICAgICAgICAvLyAgICAgc2VsZWN0ZWRMb2NhdGlvbiA6IHRoaXMucHJvcHMuc2VsZWN0ZWRMb2NhdGlvbixcbiAgICAgICAgLy8gICAgIHNlbGVjdGVkQ3JpdGVyaWEgOiB0aGlzLnByb3BzLnNlbGVjdGVkQ3JpdGVyaWFcbiAgICAgICAgLy8gfVxuICAgICAgICAvLyBzZWFyY2hEYXRhID0gZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNlYXJjaERhdGEpKVxuICAgICAgICB0aGlzLmNvbnRleHQucm91dGVyLmhpc3RvcnkucHVzaChgL3NlYXJjaHJlc3VsdHNgKVxuICAgIH1cblxuICAgIHN0YXRpYyBjb250ZXh0VHlwZXMgPSB7XG4gICAgICAgIHJvdXRlcjogKCkgPT4gbnVsbFxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzZWFyY2hDcml0ZXJpYVwiPlxuICAgICAgICAgICAgICAgIDxMb2NhdGlvblNlbGVjdG9yXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkTG9jYXRpb249e3RoaXMucHJvcHMuc2VsZWN0ZWRMb2NhdGlvbn1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDxDcml0ZXJpYVNlbGVjdG9yIFxuICAgICAgICAgICAgICAgICAgICBjb21tb25seVNlYXJjaGVkQ29uZGl0aW9ucz17dGhpcy5wcm9wcy5jb21tb25seVNlYXJjaGVkQ29uZGl0aW9uc31cbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRDb25kaXRpb25zPXt0aGlzLnByb3BzLnNlbGVjdGVkQ29uZGl0aW9uc31cbiAgICAgICAgICAgICAgICAgICAgY29tbW9ubHlTZWFyY2hlZFNwZWNpYWxpdGllcz17dGhpcy5wcm9wcy5jb21tb25seVNlYXJjaGVkU3BlY2lhbGl0aWVzfVxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZFNwZWNpYWxpdGllcz17dGhpcy5wcm9wcy5zZWxlY3RlZFNwZWNpYWxpdGllc31cbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRDcml0ZXJpYT17dGhpcy5wcm9wcy5zZWxlY3RlZENyaXRlcmlhfVxuICAgICAgICAgICAgICAgICAgICB0b2dnbGVDb25kaXRpb249e3RoaXMucHJvcHMudG9nZ2xlQ29uZGl0aW9uLmJpbmQodGhpcyl9XG4gICAgICAgICAgICAgICAgICAgIHRvZ2dsZVNwZWNpYWxpdHk9e3RoaXMucHJvcHMudG9nZ2xlU3BlY2lhbGl0eS5iaW5kKHRoaXMpfVxuICAgICAgICAgICAgICAgICAgICB0b2dnbGVDcml0ZXJpYT17dGhpcy5wcm9wcy50b2dnbGVDcml0ZXJpYS5iaW5kKHRoaXMpfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPENvbW1vbmx5U2VhcmNoZWRcbiAgICAgICAgICAgICAgICAgICAgaGVhZGluZz1cIkNvbW1vbmx5IHNlYXJjaGVkIGNvbmRpdGlvbnNcIlxuICAgICAgICAgICAgICAgICAgICBkYXRhPXt0aGlzLnByb3BzLmNvbW1vbmx5U2VhcmNoZWRDb25kaXRpb25zfVxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZD17dGhpcy5wcm9wcy5zZWxlY3RlZENvbmRpdGlvbnN9XG4gICAgICAgICAgICAgICAgICAgIHRvZ2dsZVBpbGw9e3RoaXMucHJvcHMudG9nZ2xlQ29uZGl0aW9uLmJpbmQodGhpcyl9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8Q29tbW9ubHlTZWFyY2hlZFxuICAgICAgICAgICAgICAgICAgICBoZWFkaW5nPVwiQ29tbW9ubHkgc2VhcmNoZWQgc3BlY2lhbGl0aWVzXCJcbiAgICAgICAgICAgICAgICAgICAgZGF0YT17dGhpcy5wcm9wcy5jb21tb25seVNlYXJjaGVkU3BlY2lhbGl0aWVzfVxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZD17dGhpcy5wcm9wcy5zZWxlY3RlZFNwZWNpYWxpdGllc31cbiAgICAgICAgICAgICAgICAgICAgdG9nZ2xlUGlsbD17dGhpcy5wcm9wcy50b2dnbGVTcGVjaWFsaXR5LmJpbmQodGhpcyl9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9e3RoaXMuc2VhcmNoUHJvY2VlZC5iaW5kKHRoaXMpfSBjbGFzc05hbWU9XCJwcm9jZWVkQnRuXCI+IFByb2NlZWQgPC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFNlYXJjaENyaXRlcmlhVmlld1xuIiwiaW1wb3J0IFNlYXJjaENyaXRlcmlhVmlldyBmcm9tICcuL1NlYXJjaENyaXRlcmlhVmlldy5qcydcblxuZXhwb3J0IGRlZmF1bHQgU2VhcmNoQ3JpdGVyaWFWaWV3IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IERvY3RvcnNMaXN0IGZyb20gJy4uL3NlYXJjaFJlc3VsdHMvZG9jdG9yc0xpc3QvaW5kZXguanMnXG5pbXBvcnQgVG9wQmFyIGZyb20gJy4uL3NlYXJjaFJlc3VsdHMvdG9wQmFyL2luZGV4LmpzJ1xuXG5cbmNsYXNzIFNlYXJjaFJlc3VsdHNWaWV3IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcblxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIGxldCB7XG4gICAgICAgICAgICBzZWxlY3RlZENvbmRpdGlvbnMsXG4gICAgICAgICAgICBzZWxlY3RlZFNwZWNpYWxpdGllcyxcbiAgICAgICAgICAgIHNlbGVjdGVkTG9jYXRpb24sXG4gICAgICAgICAgICBzZWxlY3RlZENyaXRlcmlhLFxuICAgICAgICAgICAgQ1JJVEVSSUFfTE9BREVEXG4gICAgICAgIH0gPSB0aGlzLnByb3BzXG5cbiAgICAgICAgaWYgKENSSVRFUklBX0xPQURFRCkge1xuICAgICAgICAgICAgbGV0IHNlYXJjaFN0YXRlID0ge1xuICAgICAgICAgICAgICAgIHNlbGVjdGVkQ29uZGl0aW9ucyxcbiAgICAgICAgICAgICAgICBzZWxlY3RlZFNwZWNpYWxpdGllcyxcbiAgICAgICAgICAgICAgICBzZWxlY3RlZExvY2F0aW9uLFxuICAgICAgICAgICAgICAgIHNlbGVjdGVkQ3JpdGVyaWFcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCBmaWx0ZXJTdGF0ZSA9IHRoaXMucHJvcHMuZmlsdGVyQ3JpdGVyaWFcbiAgICAgICAgICAgIHRoaXMuZ2V0RG9jdG9yTGlzdChzZWFyY2hTdGF0ZSwgZmlsdGVyU3RhdGUsIGZhbHNlKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBsZXQgc2VhcmNoU3RhdGUgPSB0aGlzLmdldExvY2F0aW9uUGFyYW0oJ3NlYXJjaCcpXG4gICAgICAgICAgICAgICAgbGV0IGZpbHRlclN0YXRlID0gdGhpcy5nZXRMb2NhdGlvblBhcmFtKCdmaWx0ZXInKVxuICAgICAgICAgICAgICAgIGlmIChmaWx0ZXJTdGF0ZSkge1xuICAgICAgICAgICAgICAgICAgICBmaWx0ZXJTdGF0ZSA9IEpTT04ucGFyc2UoZmlsdGVyU3RhdGUpXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZmlsdGVyU3RhdGUgPSB7fVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzZWFyY2hTdGF0ZSA9IEpTT04ucGFyc2Uoc2VhcmNoU3RhdGUpXG4gICAgICAgICAgICAgICAgdGhpcy5nZXREb2N0b3JMaXN0KHNlYXJjaFN0YXRlLCBmaWx0ZXJTdGF0ZSwgdHJ1ZSlcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGUpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIGdldExvY2F0aW9uUGFyYW0odGFnKSB7XG4gICAgICAgIC8vIHRoaXMgQVBJIGFzc3VtZXMgdGhlIGNvbnRleHQgb2YgcmVhY3Qtcm91dGVyLTRcbiAgICAgICAgY29uc3QgcGFyYW1TdHJpbmcgPSB0aGlzLnByb3BzLmxvY2F0aW9uLnNlYXJjaFxuICAgICAgICBjb25zdCBwYXJhbXMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKHBhcmFtU3RyaW5nKVxuICAgICAgICByZXR1cm4gcGFyYW1zLmdldCh0YWcpXG4gICAgfVxuXG4gICAgZ2V0RG9jdG9yTGlzdChzZWFyY2hTdGF0ZSwgZmlsdGVyU3RhdGUsIG1lcmdlU3RhdGUpIHtcbiAgICAgICAgdGhpcy5wcm9wcy5nZXREb2N0b3JzKHNlYXJjaFN0YXRlLCBmaWx0ZXJTdGF0ZSwgbWVyZ2VTdGF0ZSk7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzZWFyY2hSZXN1bHRzXCI+XG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnByb3BzLkxPQURJTkcgPyBcIlwiIDpcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPFRvcEJhciAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxEb2N0b3JzTGlzdCB7Li4udGhpcy5wcm9wc30gLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgU2VhcmNoUmVzdWx0c1ZpZXdcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG5pbXBvcnQgRW1vdGlJY29uIGZyb20gJ21hdGVyaWFsLXVpLWljb25zL0FjY291bnRDaXJjbGUnO1xuaW1wb3J0IEhvbWVJY29uIGZyb20gJ21hdGVyaWFsLXVpLWljb25zL0hvbWUnO1xuaW1wb3J0IENsb2NrSWNvbiBmcm9tICdtYXRlcmlhbC11aS1pY29ucy9BdlRpbWVyJztcbmltcG9ydCBMb2NhdGlvbnNJY29uIGZyb20gJ21hdGVyaWFsLXVpLWljb25zL0xvY2F0aW9uT24nO1xuXG5pbXBvcnQgRG9jdG9yUHJvZmlsZUNhcmQgZnJvbSAnLi4vLi4vY29tbW9ucy9kb2N0b3JQcm9maWxlQ2FyZC9pbmRleC5qcydcbmltcG9ydCBJbmZpbml0ZVNjcm9sbCBmcm9tICdyZWFjdC1pbmZpbml0ZS1zY3JvbGxlcic7XG5jbGFzcyBEb2N0b3JzTGlzdCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgfVxuXG4gICAgc3RhdGljIGNvbnRleHRUeXBlcyA9IHtcbiAgICAgICAgcm91dGVyOiAoKSA9PiBudWxsXG4gICAgfVxuXG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgbGV0IHsgRE9DVE9SUywgZG9jdG9yTGlzdCB9ID0gdGhpcy5wcm9wc1xuICAgICAgICBcbiAgICAgICAgdmFyIGRvY3RvclZpZXdMaXN0ID0gW107XG5cbiAgICAgICAgZG9jdG9yVmlld0xpc3QgPSBkb2N0b3JMaXN0Lm1hcCgoZG9jSWQsIGkpID0+IHtcbiAgICAgICAgICAgIHJldHVybiA8RG9jdG9yUHJvZmlsZUNhcmQgZGV0YWlscz17RE9DVE9SU1tkb2NJZF19IHNlbGVjdERvY3Rvcj17dGhpcy5wcm9wcy5zZWxlY3REb2N0b3J9IGtleT17aX0gLz5cbiAgICAgICAgfSlcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJkb2N0b3JzTGlzdFwiPlxuICAgICAgICAgICAgICAgIHsvKiA8SW5maW5pdGVTY3JvbGxcbiAgICAgICAgICAgICAgICAgICAgcGFnZVN0YXJ0PXswfVxuICAgICAgICAgICAgICAgICAgICBsb2FkTW9yZT17dGhpcy5wcm9wcy5nZXREb2N0b3JzfVxuICAgICAgICAgICAgICAgICAgICBoYXNNb3JlPXtmYWxzZX1cbiAgICAgICAgICAgICAgICAgICAgbG9hZGVyPXs8ZGl2IGNsYXNzTmFtZT1cImxvYWRlclwiIGtleT17MH0+TG9hZGluZyAuLi48L2Rpdj59XG4gICAgICAgICAgICAgICAgPiAqL31cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAge2RvY3RvclZpZXdMaXN0fVxuXG4gICAgICAgICAgICAgICAgey8qIDwvSW5maW5pdGVTY3JvbGw+ICovfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IERvY3RvcnNMaXN0XG4iLCJpbXBvcnQgRG9jdG9yTGlzdCBmcm9tICcuL0RvY3RvcnNMaXN0LmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBEb2N0b3JMaXN0IiwiaW1wb3J0IFNlYXJjaFJlc3VsdHNWaWV3IGZyb20gJy4vU2VhcmNoUmVzdWx0c1ZpZXcuanMnXG5cbmV4cG9ydCBkZWZhdWx0IFNlYXJjaFJlc3VsdHNWaWV3IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cbmltcG9ydCBTb3J0SWNvbiBmcm9tICdtYXRlcmlhbC11aS1pY29ucy9Tb3J0JztcbmltcG9ydCBGaWx0ZXJJY29uIGZyb20gJ21hdGVyaWFsLXVpLWljb25zL0ZpbHRlckxpc3QnO1xuaW1wb3J0IE1lbnUsIHsgTWVudUl0ZW0gfSBmcm9tICdtYXRlcmlhbC11aS9NZW51JztcblxuY2xhc3MgVG9wQmFyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIGFuY2hvckVsOiBudWxsLFxuICAgICAgICAgICAgc2VhcmNoUmVzdWx0cyA6IHRydWVcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZU9wZW4oZXZlbnQpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGFuY2hvckVsOiBldmVudC5jdXJyZW50VGFyZ2V0IH0pXG4gICAgfVxuXG4gICAgaGFuZGxlQ2xvc2UoKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBhbmNob3JFbDogbnVsbCB9KVxuICAgIH1cblxuICAgIHN0YXRpYyBjb250ZXh0VHlwZXMgPSB7XG4gICAgICAgIHJvdXRlcjogKCkgPT4gbnVsbFxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0b3BCYXJcIj5cbiAgICAgICAgICAgICAgICA8U29ydEljb24gY2xhc3NOYW1lPVwiaWNvbnNvcnRmaWx0ZXJcIiBvbkNsaWNrPXt0aGlzLmhhbmRsZU9wZW4uYmluZCh0aGlzKX0gLz5cbiAgICAgICAgICAgICAgICA8TWVudVxuICAgICAgICAgICAgICAgICAgICBpZD1cInNvcnQtbWVudVwiXG4gICAgICAgICAgICAgICAgICAgIGFuY2hvckVsPXt0aGlzLnN0YXRlLmFuY2hvckVsfVxuICAgICAgICAgICAgICAgICAgICBvcGVuPXtCb29sZWFuKHRoaXMuc3RhdGUuYW5jaG9yRWwpfVxuICAgICAgICAgICAgICAgICAgICBvbkNsb3NlPXt0aGlzLmhhbmRsZUNsb3NlLmJpbmQodGhpcyl9XG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICA8TWVudUl0ZW0gb25DbGljaz17dGhpcy5oYW5kbGVDbG9zZS5iaW5kKHRoaXMpfT5SZWxhdmFuY2U8L01lbnVJdGVtPlxuICAgICAgICAgICAgICAgICAgICA8TWVudUl0ZW0gb25DbGljaz17dGhpcy5oYW5kbGVDbG9zZS5iaW5kKHRoaXMpfT5GZWU8L01lbnVJdGVtPlxuICAgICAgICAgICAgICAgICAgICA8TWVudUl0ZW0gb25DbGljaz17dGhpcy5oYW5kbGVDbG9zZS5iaW5kKHRoaXMpfT5EaXN0YW5jZTwvTWVudUl0ZW0+XG4gICAgICAgICAgICAgICAgICAgIDxNZW51SXRlbSBvbkNsaWNrPXt0aGlzLmhhbmRsZUNsb3NlLmJpbmQodGhpcyl9PkFwb2ludG1lbnQ8L01lbnVJdGVtPlxuICAgICAgICAgICAgICAgIDwvTWVudT5cbiAgICAgICAgICAgICAgICA8RmlsdGVySWNvbiBjbGFzc05hbWU9XCJpY29uc29ydGZpbHRlclwiIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250ZXh0LnJvdXRlci5oaXN0b3J5LnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgcGF0aG5hbWUgOiAnL3NlYXJjaHJlc3VsdHMvZmlsdGVyJ1xuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH19IC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgVG9wQmFyXG4iLCJpbXBvcnQgVG9wQmFyIGZyb20gJy4vVG9wQmFyLmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBUb3BCYXIiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCB7IHdpdGhSb3V0ZXIgfSBmcm9tIFwicmVhY3Qtcm91dGVyLWRvbVwiO1xuXG5pbXBvcnQgUmFkaW8sIHsgUmFkaW9Hcm91cCB9IGZyb20gJ21hdGVyaWFsLXVpL1JhZGlvJztcbmltcG9ydCBDaGVja2JveCBmcm9tICdtYXRlcmlhbC11aS9DaGVja2JveCc7XG5pbXBvcnQgeyBGb3JtTGFiZWwsIEZvcm1Db250cm9sLCBGb3JtQ29udHJvbExhYmVsLCBGb3JtSGVscGVyVGV4dCB9IGZyb20gJ21hdGVyaWFsLXVpL0Zvcm0nO1xuXG5cbmNsYXNzIFNlYXJjaFJlc3VsdHNGaWx0ZXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgZmVlXzA6IGZhbHNlLFxuICAgICAgICAgICAgZmVlXzE6IGZhbHNlLFxuICAgICAgICAgICAgZmVlXzI6IGZhbHNlLFxuICAgICAgICAgICAgZmVlXzM6IGZhbHNlLFxuICAgICAgICAgICAgZ2VuZGVyOiAnYW55JyxcbiAgICAgICAgICAgIGNsaW5pY19wZXJzb25hbDogZmFsc2UsXG4gICAgICAgICAgICBjbGluaWNfaG9zcGl0YWw6IGZhbHNlLFxuICAgICAgICAgICAgY2xpbmljX211bHRpOiBmYWxzZSxcbiAgICAgICAgICAgIGF2YWlsYWJsZV90b2RheTogZmFsc2UsXG4gICAgICAgICAgICBkaXN0YW5jZTogJzMwa20nXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IC4uLnRoaXMucHJvcHMuZmlsdGVyQ3JpdGVyaWEgfSlcbiAgICB9XG5cbiAgICBhcHBseUZpbHRlcigpIHtcbiAgICAgICAgdGhpcy5wcm9wcy5zZXRPUERGaWx0ZXJzKHRoaXMuc3RhdGUpXG4gICAgICAgIHRoaXMucHJvcHMuaGlzdG9yeS5nbygtMSlcbiAgICB9XG5cbiAgICBoYW5kbGVDaGVja2JveChuYW1lLCBlKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBbbmFtZV06IGUudGFyZ2V0LmNoZWNrZWQgfSlcbiAgICB9XG5cbiAgICBoYW5kbGVDaGFuZ2VSYWRpbyhuYW1lLCBlKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBbbmFtZV06IGUudGFyZ2V0LnZhbHVlIH0pXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNlYXJjaFJlc3VsdHNGaWx0ZXJcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN1YkZpbHRlclwiPlxuICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJzdWJIZWFkaW5nXCI+RmVlPC9wPlxuICAgICAgICAgICAgICAgICAgICA8UmFkaW9Hcm91cFxuICAgICAgICAgICAgICAgICAgICAgICAgYXJpYS1sYWJlbD1cImZlZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lPVwiZmVlMVwiXG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxGb3JtQ29udHJvbExhYmVsIGNvbnRyb2w9ezxDaGVja2JveFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrZWQ9e3RoaXMuc3RhdGUuZmVlXzB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuaGFuZGxlQ2hlY2tib3guYmluZCh0aGlzLCAnZmVlXzAnKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8+fSBsYWJlbD1cIkxlc3MgdGhhbiAzMDBcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPEZvcm1Db250cm9sTGFiZWwgY29udHJvbD17PENoZWNrYm94XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2tlZD17dGhpcy5zdGF0ZS5mZWVfMX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5oYW5kbGVDaGVja2JveC5iaW5kKHRoaXMsICdmZWVfMScpfVxuICAgICAgICAgICAgICAgICAgICAgICAgLz59IGxhYmVsPVwiMzAwIHRvIDUwMFwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8Rm9ybUNvbnRyb2xMYWJlbCBjb250cm9sPXs8Q2hlY2tib3hcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGVja2VkPXt0aGlzLnN0YXRlLmZlZV8yfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUNoZWNrYm94LmJpbmQodGhpcywgJ2ZlZV8yJyl9XG4gICAgICAgICAgICAgICAgICAgICAgICAvPn0gbGFiZWw9XCI1MDAgdG8gMTAwMFwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8Rm9ybUNvbnRyb2xMYWJlbCBjb250cm9sPXs8Q2hlY2tib3hcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGVja2VkPXt0aGlzLnN0YXRlLmZlZV8zfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUNoZWNrYm94LmJpbmQodGhpcywgJ2ZlZV8zJyl9XG4gICAgICAgICAgICAgICAgICAgICAgICAvPn0gbGFiZWw9XCIxMDAwK1wiIC8+XG4gICAgICAgICAgICAgICAgICAgIDwvUmFkaW9Hcm91cD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3ViRmlsdGVyXCI+XG4gICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInN1YkhlYWRpbmdcIj5EaXN0YW5jZTwvcD5cbiAgICAgICAgICAgICAgICAgICAgPFJhZGlvR3JvdXBcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyaWEtbGFiZWw9XCJEaXN0YW5jZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lPVwiRGlzdGFuY2UyXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXt0aGlzLnN0YXRlLmRpc3RhbmNlfVxuICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuaGFuZGxlQ2hhbmdlUmFkaW8uYmluZCh0aGlzLCAnZGlzdGFuY2UnKX1cbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgPEZvcm1Db250cm9sTGFiZWwgdmFsdWU9XCIzMGttXCIgY29udHJvbD17PFJhZGlvIGNvbG9yPVwicHJpbWFyeVwiIC8+fSBsYWJlbD1cIlVuZGVyIDMwIEtNXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxGb3JtQ29udHJvbExhYmVsIHZhbHVlPVwiMjBrbVwiIGNvbnRyb2w9ezxSYWRpbyBjb2xvcj1cInByaW1hcnlcIiAvPn0gbGFiZWw9XCJVbmRlciAyMCBLTVwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8Rm9ybUNvbnRyb2xMYWJlbCB2YWx1ZT1cIjEwa21cIiBjb250cm9sPXs8UmFkaW8gY29sb3I9XCJwcmltYXJ5XCIgLz59IGxhYmVsPVwiVW5kZXIgMTAgS01cIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPEZvcm1Db250cm9sTGFiZWwgdmFsdWU9XCI1a21cIiBjb250cm9sPXs8UmFkaW8gY29sb3I9XCJwcmltYXJ5XCIgLz59IGxhYmVsPVwiVW5kZXIgNSBLTVwiIC8+XG5cbiAgICAgICAgICAgICAgICAgICAgPC9SYWRpb0dyb3VwPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdWJGaWx0ZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwic3ViSGVhZGluZ1wiPlR5cGUgT2YgQ2xpbmljPC9wPlxuICAgICAgICAgICAgICAgICAgICA8UmFkaW9Hcm91cFxuICAgICAgICAgICAgICAgICAgICAgICAgYXJpYS1sYWJlbD1cImNsaW5pY1R5cGVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZT1cImNsaW5pY1R5cGVcIlxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICA8Rm9ybUNvbnRyb2xMYWJlbCBjb250cm9sPXs8Q2hlY2tib3hcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGVja2VkPXt0aGlzLnN0YXRlLmNsaW5pY19wZXJzb25hbH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5oYW5kbGVDaGVja2JveC5iaW5kKHRoaXMsICdjbGluaWNfcGVyc29uYWwnKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8+fSBsYWJlbD1cIlBlcnNvbmFsXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxGb3JtQ29udHJvbExhYmVsIGNvbnRyb2w9ezxDaGVja2JveFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrZWQ9e3RoaXMuc3RhdGUuY2xpbmljX2hvc3BpdGFsfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUNoZWNrYm94LmJpbmQodGhpcywgJ2NsaW5pY19ob3NwaXRhbCcpfVxuICAgICAgICAgICAgICAgICAgICAgICAgLz59IGxhYmVsPVwiSG9zcGl0YWxcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPEZvcm1Db250cm9sTGFiZWwgY29udHJvbD17PENoZWNrYm94XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2tlZD17dGhpcy5zdGF0ZS5jbGluaWNfbXVsdGl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuaGFuZGxlQ2hlY2tib3guYmluZCh0aGlzLCAnY2xpbmljX211bHRpJyl9XG4gICAgICAgICAgICAgICAgICAgICAgICAvPn0gbGFiZWw9XCJNdWx0aS1kb2N0b3IgY2xpbmljXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgPC9SYWRpb0dyb3VwPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdWJGaWx0ZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwic3ViSGVhZGluZ1wiPkdlbmRlcjwvcD5cbiAgICAgICAgICAgICAgICAgICAgPFJhZGlvR3JvdXBcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyaWEtbGFiZWw9XCJnZW5kZXJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZT1cImdlbmRlcjJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3RoaXMuc3RhdGUuZ2VuZGVyfVxuICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuaGFuZGxlQ2hhbmdlUmFkaW8uYmluZCh0aGlzLCAnZ2VuZGVyJyl9XG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxGb3JtQ29udHJvbExhYmVsIHZhbHVlPVwiYW55XCIgY29udHJvbD17PFJhZGlvIGNvbG9yPVwicHJpbWFyeVwiIC8+fSBsYWJlbD1cIkFueVwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8Rm9ybUNvbnRyb2xMYWJlbCB2YWx1ZT1cIm1hbGVcIiBjb250cm9sPXs8UmFkaW8gY29sb3I9XCJwcmltYXJ5XCIgLz59IGxhYmVsPVwiTWFsZVwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8Rm9ybUNvbnRyb2xMYWJlbCB2YWx1ZT1cImZlbWFsZVwiIGNvbnRyb2w9ezxSYWRpbyBjb2xvcj1cInByaW1hcnlcIiAvPn0gbGFiZWw9XCJGZW1hbGVcIiAvPlxuXG4gICAgICAgICAgICAgICAgICAgIDwvUmFkaW9Hcm91cD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3ViRmlsdGVyXCI+XG4gICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInN1YkhlYWRpbmdcIj5BdmFpbGFiaWxpdHk8L3A+XG4gICAgICAgICAgICAgICAgICAgIDxSYWRpb0dyb3VwXG4gICAgICAgICAgICAgICAgICAgICAgICBhcmlhLWxhYmVsPVwiYXZhaWxhYmlsaXR5XCJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU9XCJhdmFpbGFiaWxpdHlcIlxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICA8Rm9ybUNvbnRyb2xMYWJlbCBjb250cm9sPXs8Q2hlY2tib3hcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGVja2VkPXt0aGlzLnN0YXRlLmF2YWlsYWJsZV90b2RheX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5oYW5kbGVDaGVja2JveC5iaW5kKHRoaXMsICdhdmFpbGFibGVfdG9kYXknKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8+fSBsYWJlbD1cIkF2aWFsYWJsZSBUb2RheVwiIC8+bGFiZWw9XCJNdWx0aS1kb2N0b3IgY2xpbmljXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgPC9SYWRpb0dyb3VwPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJhcHBseUZpbHRlclwiIG9uQ2xpY2s9e3RoaXMuYXBwbHlGaWx0ZXIuYmluZCh0aGlzKX0+QXBwbHk8L2J1dHRvbj5cblxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IHdpdGhSb3V0ZXIoU2VhcmNoUmVzdWx0c0ZpbHRlcilcbiIsImltcG9ydCBTZWFyY2hSZXN1bHRzRmlsdGVyIGZyb20gJy4vU2VhcmNoUmVzdWx0c0ZpbHRlci5qcydcblxuZXhwb3J0IGRlZmF1bHQgU2VhcmNoUmVzdWx0c0ZpbHRlciIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG5pbXBvcnQgQXBwQmFyIGZyb20gJ21hdGVyaWFsLXVpL0FwcEJhcic7XG5pbXBvcnQgVG9vbGJhciBmcm9tICdtYXRlcmlhbC11aS9Ub29sYmFyJztcbmltcG9ydCBBcnJvd0JhY2sgZnJvbSAnbWF0ZXJpYWwtdWktaWNvbnMvQXJyb3dCYWNrJztcbmltcG9ydCB7IHdpdGhTdHlsZXMgfSBmcm9tICdtYXRlcmlhbC11aS9zdHlsZXMnO1xuXG5cbmltcG9ydCB7IH0gZnJvbSAnLi4vLi4vLi4vYWN0aW9ucy9pbmRleC5qcydcblxuY2xhc3MgVG9wQmFyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcblxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgIH1cblxuICAgIGdvQmFjaygpIHtcbiAgICAgICAgd2luZG93Lmhpc3RvcnkuZ28oLTEpXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8QXBwQmFyIHBvc2l0aW9uPVwic3RhdGljXCIgY29sb3I9XCJkZWZhdWx0XCI+XG4gICAgICAgICAgICAgICAgPFRvb2xiYXI+XG4gICAgICAgICAgICAgICAgICAgIDxBcnJvd0JhY2sgb25DbGljaz17dGhpcy5nb0JhY2suYmluZCh0aGlzKX0gLz5cbiAgICAgICAgICAgICAgICA8L1Rvb2xiYXI+XG4gICAgICAgICAgICA8L0FwcEJhcj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgd2l0aFN0eWxlcygpKFRvcEJhcilcbiIsImltcG9ydCBUb3BCYXIgZnJvbSAnLi9Ub3BCYXIuanMnXG5cblxuZXhwb3J0IGRlZmF1bHQgVG9wQmFyIiwiZXhwb3J0IGNvbnN0IEFQUEVORF9ET0NUT1JTID0gJ0FQUEVORF9ET0NUT1JTJztcbmV4cG9ydCBjb25zdCBET0NUT1JfU0VBUkNIID0gJ0RPQ1RPUl9TRUFSQ0gnO1xuZXhwb3J0IGNvbnN0IFNFTEVDVF9ET0NUT1IgPSAnU0VMRUNUX0RPQ1RPUic7XG5cbmV4cG9ydCBjb25zdCBUT0dHTEVfQ09ORElUSU9OUyA9ICdUT0dHTEVfQ09ORElUSU9OUyc7XG5leHBvcnQgY29uc3QgVE9HR0xFX1NQRUNJQUxJVElFUyA9ICdUT0dHTEVfU1BFQ0lBTElUSUVTJztcbmV4cG9ydCBjb25zdCBUT0dHTEVfVEVTVFMgPSAnVE9HR0xFX1RFU1RTJztcbmV4cG9ydCBjb25zdCBTRUxFQ1RfTE9DQVRJT04gPSAnU0VMRUNUX0xPQ0FUSU9OJztcbmV4cG9ydCBjb25zdCBNRVJHRV9TRUFSQ0hfU1RBVEVfT1BEID0gJ01FUkdFX1NFQVJDSF9TVEFURV9PUEQnO1xuZXhwb3J0IGNvbnN0IFRPR0dMRV9DUklURVJJQSA9ICdUT0dHTEVfQ1JJVEVSSUEnO1xuZXhwb3J0IGNvbnN0IFRPR0dMRV9ESUFHTk9TSVNfQ1JJVEVSSUEgPSAnVE9HR0xFX0RJQUdOT1NJU19DUklURVJJQSc7XG5leHBvcnQgY29uc3QgU0VUX09QRF9GSUxURVJTID0gJ1NFVF9PUERfRklMVEVSUydcbmV4cG9ydCBjb25zdCBTRVRfTEFCU19GSUxURVJTID0gJ1NFVF9MQUJTX0ZJTFRFUlMnXG5leHBvcnQgY29uc3QgTE9BRF9TRUFSQ0hfQ1JJVEVSSUFfT1BEID0gJ0xPQURfU0VBUkNIX0NSSVRFUklBX09QRCdcblxuZXhwb3J0IGNvbnN0IE1FUkdFX1NFQVJDSF9TVEFURV9MQUIgPSAnTUVSR0VfU0VBUkNIX1NUQVRFX0xBQic7XG5leHBvcnQgY29uc3QgTE9BRF9TRUFSQ0hfQ1JJVEVSSUFfTEFCID0gJ0xPQURfU0VBUkNIX0NSSVRFUklBX09QRCdcbmV4cG9ydCBjb25zdCBBUFBFTkRfTEFCUyA9ICdBUFBFTkRfTEFCUyc7XG5leHBvcnQgY29uc3QgTEFCX1NFQVJDSCA9ICdMQUJfU0VBUkNIJztcblxuXG5leHBvcnQgY29uc3QgQVBQRU5EX1VTRVJfUFJPRklMRVMgPSAnQVBQRU5EX1VTRVJfUFJPRklMRVMnO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cbmltcG9ydCB7IH0gZnJvbSAnLi4vLi4vYWN0aW9ucy9pbmRleC5qcydcblxuaW1wb3J0IENoYXRWaWV3IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9jaGF0L2luZGV4LmpzJ1xuXG5cbmNsYXNzIENoYXQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPENoYXRWaWV3IHsuLi50aGlzLnByb3BzfSAvPlxuICAgICAgICApO1xuICAgIH1cbn1cblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHN0YXRlKSA9PiB7XG4gICAgY29uc3QgVVNFUiA9IHN0YXRlLlVTRVJcblxuICAgIHJldHVybiB7XG4gICAgICAgIFVTRVJcbiAgICB9XG59XG5cbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IChkaXNwYXRjaCkgPT4ge1xuICAgIHJldHVybiB7XG5cbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG1hcERpc3BhdGNoVG9Qcm9wcykoQ2hhdCk7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcblxuaW1wb3J0IHsgZ2V0VXNlclByb2ZpbGVXaXRoQXBwb2ludG1lbnRzIH0gZnJvbSAnLi4vLi4vYWN0aW9ucy9pbmRleC5qcydcblxuaW1wb3J0IFVzZXJBcHBvaW50bWVudHNWaWV3IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy91c2VyQXBwb2ludG1lbnRzL2luZGV4LmpzJ1xuXG5cbmNsYXNzIFVzZXJBcHBvaW50bWVudHMgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPFVzZXJBcHBvaW50bWVudHNWaWV3IHsuLi50aGlzLnByb3BzfSAvPlxuICAgICAgICApO1xuICAgIH1cbn1cblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHN0YXRlKSA9PiB7XG4gICAgY29uc3QgVVNFUiA9IHN0YXRlLlVTRVJcblxuICAgIHJldHVybiB7XG4gICAgICAgIFVTRVJcbiAgICB9XG59XG5cbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IChkaXNwYXRjaCkgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICAgIGdldFVzZXJQcm9maWxlV2l0aEFwcG9pbnRtZW50cyA6ICgpID0+IGRpc3BhdGNoKGdldFVzZXJQcm9maWxlV2l0aEFwcG9pbnRtZW50cygpKVxuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbWFwRGlzcGF0Y2hUb1Byb3BzKShVc2VyQXBwb2ludG1lbnRzKTtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG5pbXBvcnQgeyBnZXRVc2VyUHJvZmlsZSB9IGZyb20gJy4uLy4uL2FjdGlvbnMvaW5kZXguanMnXG5cbmltcG9ydCBVc2VyUHJvZmlsZVZpZXcgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9jb21tb25zL3VzZXJQcm9maWxlL2luZGV4LmpzJ1xuXG5cbmNsYXNzIFVzZXJQcm9maWxlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxVc2VyUHJvZmlsZVZpZXcgey4uLnRoaXMucHJvcHN9IC8+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoc3RhdGUpID0+IHtcbiAgICBjb25zdCBVU0VSID0gc3RhdGUuVVNFUlxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgVVNFUlxuICAgIH1cbn1cblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gKGRpc3BhdGNoKSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgZ2V0VXNlclByb2ZpbGUgOiAoKSA9PiBkaXNwYXRjaChnZXRVc2VyUHJvZmlsZSgpKVxuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbWFwRGlzcGF0Y2hUb1Byb3BzKShVc2VyUHJvZmlsZSk7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcblxuaW1wb3J0IHsgZ2V0VXNlclByb2ZpbGVXaXRoVGVzdHMgfSBmcm9tICcuLi8uLi9hY3Rpb25zL2luZGV4LmpzJ1xuXG5pbXBvcnQgVXNlclJlcG9ydHNWaWV3IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy91c2VyUmVwb3J0cy9pbmRleC5qcydcblxuXG5jbGFzcyBVc2VyUmVwb3J0cyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8VXNlclJlcG9ydHNWaWV3IHsuLi50aGlzLnByb3BzfSAvPlxuICAgICAgICApO1xuICAgIH1cbn1cblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHN0YXRlKSA9PiB7XG4gICAgY29uc3QgVVNFUiA9IHN0YXRlLlVTRVJcblxuICAgIHJldHVybiB7XG4gICAgICAgIFVTRVJcbiAgICB9XG59XG5cbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IChkaXNwYXRjaCkgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICAgIGdldFVzZXJQcm9maWxlV2l0aFRlc3RzIDogKCkgPT4gZGlzcGF0Y2goZ2V0VXNlclByb2ZpbGVXaXRoVGVzdHMoKSlcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG1hcERpc3BhdGNoVG9Qcm9wcykoVXNlclJlcG9ydHMpO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cbmltcG9ydCB7IGdldExhYkJvb2tpbmdTdW1tYXJ5IH0gZnJvbSAnLi4vLi4vYWN0aW9ucy9pbmRleC5qcydcblxuaW1wb3J0IEJvb2tpbmdTdW1tYXJ5VmlldyBmcm9tICcuLi8uLi9jb21wb25lbnRzL2RpYWdub3Npcy9ib29raW5nU3VtbWFyeS9pbmRleC5qcydcblxuY2xhc3MgQm9va2luZ1N1bW1hcnkgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPEJvb2tpbmdTdW1tYXJ5VmlldyB7Li4udGhpcy5wcm9wc30gLz5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9IChzdGF0ZSkgPT4ge1xuXG4gICAgcmV0dXJuIHtcblxuICAgIH1cbn1cblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gKGRpc3BhdGNoKSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgZ2V0TGFiQm9va2luZ1N1bW1hcnkgOiAoYm9va2luZ0lkLCBjYWxsYmFjaykgPT4gZGlzcGF0Y2goZ2V0TGFiQm9va2luZ1N1bW1hcnkoYm9va2luZ0lkLCBjYWxsYmFjaykpXG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpKEJvb2tpbmdTdW1tYXJ5KTtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG5pbXBvcnQgeyBnZXREaWFnbm9zaXNDcml0ZXJpYVJlc3VsdHMsIHRvZ2dsZURpYWdub3Npc0NyaXRlcmlhIH0gZnJvbSAnLi4vLi4vYWN0aW9ucy9pbmRleC5qcydcbmltcG9ydCBDcml0ZXJpYVNlYXJjaFZpZXcgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9kaWFnbm9zaXMvY3JpdGVyaWFTZWFyY2gvaW5kZXguanMnXG5cbmNsYXNzIENyaXRlcmlhU2VhcmNoIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxDcml0ZXJpYVNlYXJjaFZpZXdcbiAgICAgICAgICAgICAgICB7IC4uLnRoaXMucHJvcHMgfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9IChzdGF0ZSkgPT4ge1xuXG4gICAgcmV0dXJuIHtcblxuICAgIH1cbn1cblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gKGRpc3BhdGNoKSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgZ2V0RGlhZ25vc2lzQ3JpdGVyaWFSZXN1bHRzIDogKHNlYXJjaFN0cmluZyxjYikgPT4gZGlzcGF0Y2goZ2V0RGlhZ25vc2lzQ3JpdGVyaWFSZXN1bHRzKHNlYXJjaFN0cmluZyxjYikpLFxuICAgICAgICB0b2dnbGVEaWFnbm9zaXNDcml0ZXJpYSA6IChjcml0ZXJpYSkgPT4gZGlzcGF0Y2godG9nZ2xlRGlhZ25vc2lzQ3JpdGVyaWEoY3JpdGVyaWEpKVxuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbWFwRGlzcGF0Y2hUb1Byb3BzKShDcml0ZXJpYVNlYXJjaCk7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcblxuaW1wb3J0IHsgZ2V0TGFiQnlJZCwgZ2V0TGFiVGltZVNsb3RzIH0gZnJvbSAnLi4vLi4vYWN0aW9ucy9pbmRleC5qcydcblxuaW1wb3J0IExhYlNsb3RzVmlldyBmcm9tICcuLi8uLi9jb21wb25lbnRzL2RpYWdub3Npcy9sYWJTbG90cy9pbmRleC5qcydcblxuY2xhc3MgTGFiU2xvdHMgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPExhYlNsb3RzVmlldyB7Li4udGhpcy5wcm9wc30gLz5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9IChzdGF0ZSkgPT4ge1xuXG4gICAgbGV0IExBQlMgPSBzdGF0ZS5MQUJTXG5cbiAgICByZXR1cm4ge1xuICAgICAgICBMQUJTXG4gICAgfVxufVxuXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSAoZGlzcGF0Y2gpID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgICBnZXRMYWJCeUlkIDogKGxhYklkLCB0ZXN0SWRzKSA9PiBkaXNwYXRjaChnZXRMYWJCeUlkKGxhYklkLCB0ZXN0SWRzKSksXG4gICAgICAgIGdldExhYlRpbWVTbG90cyA6IChsYWJJZCwgdGVzdElkcywgY2FsbGJhY2spID0+IGRpc3BhdGNoKGdldExhYlRpbWVTbG90cyhsYWJJZCwgdGVzdElkcywgY2FsbGJhY2spKVxuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbWFwRGlzcGF0Y2hUb1Byb3BzKShMYWJTbG90cyk7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcblxuaW1wb3J0IHsgZ2V0TGFiQnlJZCB9IGZyb20gJy4uLy4uL2FjdGlvbnMvaW5kZXguanMnXG5cbmltcG9ydCBQYXRpZW50RGV0YWlsc1ZpZXcgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9kaWFnbm9zaXMvcGF0aWVudERldGFpbHMvaW5kZXguanMnXG5cbmNsYXNzIFBhdGllbnREZXRhaWxzIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxQYXRpZW50RGV0YWlsc1ZpZXcgey4uLnRoaXMucHJvcHN9IC8+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoc3RhdGUpID0+IHtcblxuICAgIGxldCBMQUJTID0gc3RhdGUuTEFCU1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgTEFCU1xuICAgIH1cbn1cblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gKGRpc3BhdGNoKSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgZ2V0TGFiQnlJZCA6IChsYWJJZCwgdGVzdElkcykgPT4gZGlzcGF0Y2goZ2V0TGFiQnlJZChsYWJJZCwgdGVzdElkcykpXG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpKFBhdGllbnREZXRhaWxzKTtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG5pbXBvcnQgeyB0b2dnbGVUZXN0LCB0b2dnbGVEaWFnbm9zaXNDcml0ZXJpYSwgbG9hZExhYlNlYXJjaENyaXRlcmlhIH0gZnJvbSAnLi4vLi4vYWN0aW9ucy9pbmRleC5qcydcbmltcG9ydCBTZWFyY2hDcml0ZXJpYVZpZXcgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9kaWFnbm9zaXMvc2VhcmNoQ3JpdGVyaWEvaW5kZXguanMnXG5cbmNsYXNzIFNlYXJjaENyaXRlcmlhIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICB9XG5cbiAgICBzdGF0aWMgY29udGV4dFR5cGVzID0ge1xuICAgICAgICByb3V0ZXI6ICgpID0+IG51bGxcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxTZWFyY2hDcml0ZXJpYVZpZXcgey4uLnRoaXMucHJvcHN9IC8+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoc3RhdGUpID0+IHtcblxuICAgIGNvbnN0IHtcbiAgICAgICAgY29tbW9ubHlTZWFyY2hlZFRlc3RzLFxuICAgICAgICBzZWxlY3RlZFRlc3RzLFxuICAgICAgICBzZWxlY3RlZExvY2F0aW9uLFxuICAgICAgICBzZWxlY3RlZERpYWdub3Npc0NyaXRlcmlhXG4gICAgfSA9IHN0YXRlLlNFQVJDSF9DUklURVJJQV9MQUJTXG5cbiAgICByZXR1cm4ge1xuICAgICAgICBjb21tb25seVNlYXJjaGVkVGVzdHMsXG4gICAgICAgIHNlbGVjdGVkVGVzdHMsXG4gICAgICAgIHNlbGVjdGVkTG9jYXRpb24sXG4gICAgICAgIHNlbGVjdGVkRGlhZ25vc2lzQ3JpdGVyaWFcbiAgICB9XG59XG5cbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IChkaXNwYXRjaCkgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICAgIGxvYWRMYWJTZWFyY2hDcml0ZXJpYSA6ICgpID0+IGRpc3BhdGNoKGxvYWRMYWJTZWFyY2hDcml0ZXJpYSgpKSxcbiAgICAgICAgdG9nZ2xlVGVzdDogKGlkKSA9PiBkaXNwYXRjaCh0b2dnbGVUZXN0KGlkKSksXG4gICAgICAgIHRvZ2dsZURpYWdub3Npc0NyaXRlcmlhIDogKGNyaXRlcmlhKSA9PiBkaXNwYXRjaCh0b2dnbGVEaWFnbm9zaXNDcml0ZXJpYShjcml0ZXJpYSkpXG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpKFNlYXJjaENyaXRlcmlhKTtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG5pbXBvcnQgeyBnZXRMYWJzLCB0b2dnbGVUZXN0LCB0b2dnbGVEaWFnbm9zaXNDcml0ZXJpYSB9IGZyb20gJy4uLy4uL2FjdGlvbnMvaW5kZXguanMnXG5cbmltcG9ydCBTZWFyY2hSZXN1bHRzVmlldyBmcm9tICcuLi8uLi9jb21wb25lbnRzL2RpYWdub3Npcy9zZWFyY2hSZXN1bHRzL2luZGV4LmpzJ1xuXG5jbGFzcyBTZWFyY2hSZXN1bHRzIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcblxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8U2VhcmNoUmVzdWx0c1ZpZXcgeyAuLi50aGlzLnByb3BzIH0gLz5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9IChzdGF0ZSkgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgICAgY29tbW9ubHlTZWFyY2hlZFRlc3RzLFxuICAgICAgICBzZWxlY3RlZFRlc3RzLFxuICAgICAgICBzZWxlY3RlZExvY2F0aW9uLFxuICAgICAgICBzZWxlY3RlZERpYWdub3Npc0NyaXRlcmlhLFxuICAgICAgICBmaWx0ZXJDcml0ZXJpYSxcbiAgICAgICAgQ1JJVEVSSUFfTE9BREVEXG4gICAgfSA9IHN0YXRlLlNFQVJDSF9DUklURVJJQV9MQUJTXG4gICAgbGV0IExBQlMgPSBzdGF0ZS5MQUJTXG4gICAgbGV0IHsgbGFiTGlzdCwgTE9BRElORywgRVJST1IgfSA9IHN0YXRlLkxBQl9TRUFSQ0hcblxuICAgIHJldHVybiB7XG4gICAgICAgIExBQlMsIGxhYkxpc3QsIExPQURJTkcsIEVSUk9SLFxuICAgICAgICBjb21tb25seVNlYXJjaGVkVGVzdHMsXG4gICAgICAgIHNlbGVjdGVkVGVzdHMsXG4gICAgICAgIHNlbGVjdGVkTG9jYXRpb24sXG4gICAgICAgIHNlbGVjdGVkRGlhZ25vc2lzQ3JpdGVyaWEsXG4gICAgICAgIGZpbHRlckNyaXRlcmlhLFxuICAgICAgICBDUklURVJJQV9MT0FERURcbiAgICB9XG5cbn1cblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gKGRpc3BhdGNoKSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgZ2V0TGFiczogKHNlYXJjaFN0YXRlLGZpbHRlclN0YXRlLG1lcmdlU3RhdGUpID0+IGRpc3BhdGNoKGdldExhYnMoc2VhcmNoU3RhdGUsZmlsdGVyU3RhdGUsbWVyZ2VTdGF0ZSkpLFxuICAgICAgICB0b2dnbGVUZXN0OiAoaWQpID0+IGRpc3BhdGNoKHRvZ2dsZVRlc3QoaWQpKSxcbiAgICAgICAgdG9nZ2xlRGlhZ25vc2lzQ3JpdGVyaWEgOiAoY3JpdGVyaWEpID0+IGRpc3BhdGNoKHRvZ2dsZURpYWdub3Npc0NyaXRlcmlhKGNyaXRlcmlhKSlcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpKFNlYXJjaFJlc3VsdHMpO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cbmltcG9ydCB7IGdldERvY3RvckJ5SWQsIGdldFRpbWVTbG90cyB9IGZyb20gJy4uLy4uL2FjdGlvbnMvaW5kZXguanMnXG5cbmltcG9ydCBBcHBvaW50bWVudFNsb3RWaWV3IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvb3BkL2FwcG9pbnRtZW50U2xvdC9pbmRleC5qcydcblxuY2xhc3MgQXBwb2ludG1lbnRTbG90IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxBcHBvaW50bWVudFNsb3RWaWV3IHsuLi50aGlzLnByb3BzfSAvPlxuICAgICAgICApO1xuICAgIH1cbn1cblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHN0YXRlKSA9PiB7XG5cbiAgICBsZXQgRE9DVE9SUyA9IHN0YXRlLkRPQ1RPUlNcblxuICAgIHJldHVybiB7XG4gICAgICAgIERPQ1RPUlNcbiAgICB9XG59XG5cbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IChkaXNwYXRjaCkgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICAgIGdldERvY3RvckJ5SWQgOiAoZG9jdG9ySWQpID0+IGRpc3BhdGNoKGdldERvY3RvckJ5SWQoZG9jdG9ySWQpKSxcbiAgICAgICAgZ2V0VGltZVNsb3RzIDogKGRvY3RvcklkLCBjbGluaWNJZCwgY2FsbGJhY2spID0+IGRpc3BhdGNoKGdldFRpbWVTbG90cyhkb2N0b3JJZCwgY2xpbmljSWQsIGNhbGxiYWNrKSlcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG1hcERpc3BhdGNoVG9Qcm9wcykoQXBwb2ludG1lbnRTbG90KTtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG5pbXBvcnQgeyB9IGZyb20gJy4uLy4uL2FjdGlvbnMvaW5kZXguanMnXG5cbmltcG9ydCBCb29raW5nVmlldyBmcm9tICcuLi8uLi9jb21wb25lbnRzL29wZC9ib29raW5nL0Jvb2tpbmdWaWV3LmpzJ1xuXG5jbGFzcyBCb29raW5nIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxCb29raW5nVmlldyB7Li4udGhpcy5wcm9wc30gLz5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9IChzdGF0ZSkgPT4ge1xuXG4gICAgcmV0dXJuIHtcblxuICAgIH1cbn1cblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gKGRpc3BhdGNoKSA9PiB7XG4gICAgcmV0dXJuIHtcblxuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbWFwRGlzcGF0Y2hUb1Byb3BzKShCb29raW5nKTtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG5pbXBvcnQgeyBnZXREb2N0b3JCeUlkIH0gZnJvbSAnLi4vLi4vYWN0aW9ucy9pbmRleC5qcydcblxuaW1wb3J0IENsaW5pY0xpc3RWaWV3IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvb3BkL2NsaW5pY0xpc3QvaW5kZXguanMnXG5cbmNsYXNzIENsaW5pY0xpc3QgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPENsaW5pY0xpc3RWaWV3IHsuLi50aGlzLnByb3BzfSAvPlxuICAgICAgICApO1xuICAgIH1cbn1cblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHN0YXRlKSA9PiB7XG5cbiAgICBsZXQgRE9DVE9SUyA9IHN0YXRlLkRPQ1RPUlNcblxuICAgIHJldHVybiB7XG4gICAgICAgIERPQ1RPUlNcbiAgICB9XG59XG5cbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IChkaXNwYXRjaCkgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICAgIGdldERvY3RvckJ5SWQgOiAoZG9jdG9ySWQpID0+IGRpc3BhdGNoKGdldERvY3RvckJ5SWQoZG9jdG9ySWQpKVxuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbWFwRGlzcGF0Y2hUb1Byb3BzKShDbGluaWNMaXN0KTtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG5pbXBvcnQgeyBnZXRDcml0ZXJpYVJlc3VsdHMsIHRvZ2dsZUNyaXRlcmlhIH0gZnJvbSAnLi4vLi4vYWN0aW9ucy9pbmRleC5qcydcbmltcG9ydCBDcml0ZXJpYVNlYXJjaFZpZXcgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9vcGQvY3JpdGVyaWFTZWFyY2gvaW5kZXguanMnXG5cbmNsYXNzIENyaXRlcmlhU2VhcmNoIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxDcml0ZXJpYVNlYXJjaFZpZXdcbiAgICAgICAgICAgICAgICB7IC4uLnRoaXMucHJvcHMgfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9IChzdGF0ZSkgPT4ge1xuXG4gICAgcmV0dXJuIHtcblxuICAgIH1cbn1cblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gKGRpc3BhdGNoKSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgZ2V0Q3JpdGVyaWFSZXN1bHRzIDogKHNlYXJjaFN0cmluZyxjYikgPT4gZGlzcGF0Y2goZ2V0Q3JpdGVyaWFSZXN1bHRzKHNlYXJjaFN0cmluZyxjYikpLFxuICAgICAgICB0b2dnbGVDcml0ZXJpYSA6IChjcml0ZXJpYSkgPT4gZGlzcGF0Y2godG9nZ2xlQ3JpdGVyaWEoY3JpdGVyaWEpKVxuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbWFwRGlzcGF0Y2hUb1Byb3BzKShDcml0ZXJpYVNlYXJjaCk7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcblxuaW1wb3J0IHsgZ2V0RG9jdG9yQnlJZCB9IGZyb20gJy4uLy4uL2FjdGlvbnMvaW5kZXguanMnXG5cbmltcG9ydCBEb2N0b3JQcm9maWxlVmlldyBmcm9tICcuLi8uLi9jb21wb25lbnRzL29wZC9kb2N0b3JQcm9maWxlL2luZGV4LmpzJ1xuXG5jbGFzcyBEb2N0b3JQcm9maWxlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxEb2N0b3JQcm9maWxlVmlldyB7Li4udGhpcy5wcm9wc30gLz5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9IChzdGF0ZSkgPT4ge1xuXG4gICAgbGV0IERPQ1RPUlMgPSBzdGF0ZS5ET0NUT1JTXG5cbiAgICByZXR1cm4ge1xuICAgICAgICBET0NUT1JTXG4gICAgfVxufVxuXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSAoZGlzcGF0Y2gpID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgICBnZXREb2N0b3JCeUlkIDogKGRvY3RvcklkKSA9PiBkaXNwYXRjaChnZXREb2N0b3JCeUlkKGRvY3RvcklkKSlcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG1hcERpc3BhdGNoVG9Qcm9wcykoRG9jdG9yUHJvZmlsZSk7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcblxuaW1wb3J0IHsgc2VsZWN0TG9jYXRpb24gfSBmcm9tICcuLi8uLi9hY3Rpb25zL2luZGV4LmpzJ1xuaW1wb3J0IExvY2F0aW9uU2VhcmNoVmlldyBmcm9tICcuLi8uLi9jb21wb25lbnRzL29wZC9sb2NhdGlvblNlYXJjaC9pbmRleC5qcydcblxuY2xhc3MgTG9jYXRpb25TZWFyY2ggZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPExvY2F0aW9uU2VhcmNoVmlld1xuICAgICAgICAgICAgICAgIHNlbGVjdGVkTG9jYXRpb249e3RoaXMucHJvcHMuc2VsZWN0ZWRMb2NhdGlvbn1cbiAgICAgICAgICAgICAgICBzZWxlY3RMb2NhdGlvbj17dGhpcy5wcm9wcy5zZWxlY3RMb2NhdGlvbi5iaW5kKHRoaXMpfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9IChzdGF0ZSkgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgICAgc2VsZWN0ZWRMb2NhdGlvblxuICAgIH0gPSBzdGF0ZS5TRUFSQ0hfQ1JJVEVSSUFfT1BEXG5cbiAgICByZXR1cm4ge1xuICAgICAgICBzZWxlY3RlZExvY2F0aW9uXG4gICAgfVxufVxuXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSAoZGlzcGF0Y2gpID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgICBzZWxlY3RMb2NhdGlvbjogKGxvY2F0aW9uKSA9PiBkaXNwYXRjaChzZWxlY3RMb2NhdGlvbihsb2NhdGlvbikpXG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpKExvY2F0aW9uU2VhcmNoKTtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG5pbXBvcnQgeyBnZXREb2N0b3JCeUlkIH0gZnJvbSAnLi4vLi4vYWN0aW9ucy9pbmRleC5qcydcblxuaW1wb3J0IFBhdGllbnREZXRhaWxzVmlldyBmcm9tICcuLi8uLi9jb21wb25lbnRzL29wZC9wYXRpZW50RGV0YWlscy9pbmRleC5qcydcblxuY2xhc3MgUGF0aWVudERldGFpbHMgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPFBhdGllbnREZXRhaWxzVmlldyB7Li4udGhpcy5wcm9wc30gLz5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9IChzdGF0ZSkgPT4ge1xuXG4gICAgbGV0IERPQ1RPUlMgPSBzdGF0ZS5ET0NUT1JTXG5cbiAgICByZXR1cm4ge1xuICAgICAgICBET0NUT1JTXG4gICAgfVxufVxuXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSAoZGlzcGF0Y2gpID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgICBnZXREb2N0b3JCeUlkIDogKGRvY3RvcklkKSA9PiBkaXNwYXRjaChnZXREb2N0b3JCeUlkKGRvY3RvcklkKSlcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG1hcERpc3BhdGNoVG9Qcm9wcykoUGF0aWVudERldGFpbHMpO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cbmltcG9ydCB7IH0gZnJvbSAnLi4vLi4vYWN0aW9ucy9pbmRleC5qcydcblxuaW1wb3J0IFBheW1lbnRWaWV3IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvb3BkL3BheW1lbnQvUGF5bWVudFZpZXcuanMnXG5cbmNsYXNzIFBheW1lbnQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPFBheW1lbnRWaWV3IHsuLi50aGlzLnByb3BzfSAvPlxuICAgICAgICApO1xuICAgIH1cbn1cblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHN0YXRlKSA9PiB7XG5cbiAgICByZXR1cm4ge1xuXG4gICAgfVxufVxuXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSAoZGlzcGF0Y2gpID0+IHtcbiAgICByZXR1cm4ge1xuXG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpKFBheW1lbnQpO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cbmltcG9ydCB7IHRvZ2dsZUNvbmRpdGlvbiwgdG9nZ2xlU3BlY2lhbGl0eSwgdG9nZ2xlQ3JpdGVyaWEsIGxvYWRTZWFyY2hDcml0ZXJpYSB9IGZyb20gJy4uLy4uL2FjdGlvbnMvaW5kZXguanMnXG5pbXBvcnQgU2VhcmNoQ3JpdGVyaWFWaWV3IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvb3BkL3NlYXJjaENyaXRlcmlhL2luZGV4LmpzJ1xuXG5jbGFzcyBTZWFyY2hDcml0ZXJpYSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgfVxuXG4gICAgc3RhdGljIGNvbnRleHRUeXBlcyA9IHtcbiAgICAgICAgcm91dGVyOiAoKSA9PiBudWxsXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8U2VhcmNoQ3JpdGVyaWFWaWV3IHsuLi50aGlzLnByb3BzfSAvPlxuICAgICAgICApO1xuICAgIH1cbn1cblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHN0YXRlKSA9PiB7XG5cbiAgICBjb25zdCB7XG4gICAgICAgIGNvbW1vbmx5U2VhcmNoZWRDb25kaXRpb25zLFxuICAgICAgICBzZWxlY3RlZENvbmRpdGlvbnMsXG4gICAgICAgIGNvbW1vbmx5U2VhcmNoZWRTcGVjaWFsaXRpZXMsXG4gICAgICAgIHNlbGVjdGVkU3BlY2lhbGl0aWVzLFxuICAgICAgICBzZWxlY3RlZExvY2F0aW9uLFxuICAgICAgICBzZWxlY3RlZENyaXRlcmlhXG4gICAgfSA9IHN0YXRlLlNFQVJDSF9DUklURVJJQV9PUERcblxuICAgIHJldHVybiB7XG4gICAgICAgIGNvbW1vbmx5U2VhcmNoZWRDb25kaXRpb25zLFxuICAgICAgICBzZWxlY3RlZENvbmRpdGlvbnMsXG4gICAgICAgIGNvbW1vbmx5U2VhcmNoZWRTcGVjaWFsaXRpZXMsXG4gICAgICAgIHNlbGVjdGVkU3BlY2lhbGl0aWVzLFxuICAgICAgICBzZWxlY3RlZExvY2F0aW9uLFxuICAgICAgICBzZWxlY3RlZENyaXRlcmlhXG4gICAgfVxufVxuXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSAoZGlzcGF0Y2gpID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgICB0b2dnbGVDb25kaXRpb246IChpZCkgPT4gZGlzcGF0Y2godG9nZ2xlQ29uZGl0aW9uKGlkKSksXG4gICAgICAgIHRvZ2dsZVNwZWNpYWxpdHk6IChpZCkgPT4gZGlzcGF0Y2godG9nZ2xlU3BlY2lhbGl0eShpZCkpLFxuICAgICAgICB0b2dnbGVDcml0ZXJpYSA6IChjcml0ZXJpYSkgPT4gZGlzcGF0Y2godG9nZ2xlQ3JpdGVyaWEoY3JpdGVyaWEpKSxcbiAgICAgICAgbG9hZFNlYXJjaENyaXRlcmlhOiAoKSA9PiBkaXNwYXRjaChsb2FkU2VhcmNoQ3JpdGVyaWEoKSlcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG1hcERpc3BhdGNoVG9Qcm9wcykoU2VhcmNoQ3JpdGVyaWEpO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cbmltcG9ydCB7IGdldERvY3RvcnMgfSBmcm9tICcuLi8uLi9hY3Rpb25zL2luZGV4LmpzJ1xuXG5pbXBvcnQgU2VhcmNoUmVzdWx0c1ZpZXcgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9vcGQvc2VhcmNoUmVzdWx0cy9pbmRleC5qcydcblxuY2xhc3MgU2VhcmNoUmVzdWx0cyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG5cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPFNlYXJjaFJlc3VsdHNWaWV3IHsgLi4udGhpcy5wcm9wcyB9IC8+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoc3RhdGUpID0+IHtcblxuICAgIGNvbnN0IHtcbiAgICAgICAgc2VsZWN0ZWRDb25kaXRpb25zLFxuICAgICAgICBzZWxlY3RlZFNwZWNpYWxpdGllcyxcbiAgICAgICAgc2VsZWN0ZWRMb2NhdGlvbixcbiAgICAgICAgc2VsZWN0ZWRDcml0ZXJpYSxcbiAgICAgICAgZmlsdGVyQ3JpdGVyaWEsXG4gICAgICAgIENSSVRFUklBX0xPQURFRFxuICAgIH0gPSBzdGF0ZS5TRUFSQ0hfQ1JJVEVSSUFfT1BEXG5cbiAgICBsZXQgRE9DVE9SUyA9IHN0YXRlLkRPQ1RPUlNcbiAgICBsZXQgeyBkb2N0b3JMaXN0LCBMT0FESU5HLCBFUlJPUiB9ID0gc3RhdGUuRE9DVE9SX1NFQVJDSFxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgRE9DVE9SUywgZG9jdG9yTGlzdCwgTE9BRElORywgRVJST1IsXG4gICAgICAgIHNlbGVjdGVkQ29uZGl0aW9ucyxcbiAgICAgICAgc2VsZWN0ZWRTcGVjaWFsaXRpZXMsXG4gICAgICAgIHNlbGVjdGVkTG9jYXRpb24sXG4gICAgICAgIHNlbGVjdGVkQ3JpdGVyaWEsXG4gICAgICAgIGZpbHRlckNyaXRlcmlhLFxuICAgICAgICBDUklURVJJQV9MT0FERURcbiAgICB9XG59XG5cbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IChkaXNwYXRjaCkgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICAgIGdldERvY3RvcnM6IChzZWFyY2hTdGF0ZSxmaWx0ZXJTdGF0ZSxtZXJnZVN0YXRlKSA9PiBkaXNwYXRjaChnZXREb2N0b3JzKHNlYXJjaFN0YXRlLGZpbHRlclN0YXRlLG1lcmdlU3RhdGUpKVxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG1hcERpc3BhdGNoVG9Qcm9wcykoU2VhcmNoUmVzdWx0cyk7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcblxuaW1wb3J0IHsgc2V0T1BERmlsdGVycyB9IGZyb20gJy4uLy4uL2FjdGlvbnMvaW5kZXguanMnXG5cbmltcG9ydCBTZWFyY2hSZXN1bHRzRmlsdGVyVmlldyBmcm9tICcuLi8uLi9jb21wb25lbnRzL29wZC9zZWFyY2hSZXN1bHRzRmlsdGVyL2luZGV4LmpzJ1xuXG5jbGFzcyBTZWFyY2hSZXN1bHRzRmlsdGVyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxTZWFyY2hSZXN1bHRzRmlsdGVyVmlldyB7Li4udGhpcy5wcm9wc30vPlxuICAgICAgICApO1xuICAgIH1cbn1cblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHN0YXRlKSA9PiB7XG5cbiAgICBjb25zdCB7XG4gICAgICAgIGZpbHRlckNyaXRlcmlhXG4gICAgfSA9IHN0YXRlLlNFQVJDSF9DUklURVJJQV9PUERcblxuICAgIHJldHVybiB7XG4gICAgICAgIGZpbHRlckNyaXRlcmlhXG4gICAgfVxufVxuXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSAoZGlzcGF0Y2gpID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgICBzZXRPUERGaWx0ZXJzIDogKGZpbHRlckRhdGEpID0+IGRpc3BhdGNoKHNldE9QREZpbHRlcnMoZmlsdGVyRGF0YSkpXG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpKFNlYXJjaFJlc3VsdHNGaWx0ZXIpO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cbmltcG9ydCBUb3BCYXJWaWV3IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvb3BkL3RvcEJhci9pbmRleC5qcydcblxuY2xhc3MgVG9wQmFyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcblxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbE1vdW50KCkge1xuXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8VG9wQmFyVmlldy8+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoc3RhdGUpID0+IHtcblxuICAgIHJldHVybiB7XG5cbiAgICB9XG59XG5cbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IChkaXNwYXRjaCkgPT4ge1xuICAgIHJldHVybiB7XG5cbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG1hcERpc3BhdGNoVG9Qcm9wcykoVG9wQmFyKTtcbiIsImltcG9ydCB7IEFQUEVORF9VU0VSX1BST0ZJTEVTIH0gZnJvbSAnLi4vLi4vY29uc3RhbnRzL3R5cGVzJztcblxuY29uc3QgZGVmYXVsdFN0YXRlID0ge1xuICAgIHByb2ZpbGVzOiB7fVxufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoc3RhdGUgPSBkZWZhdWx0U3RhdGUsIGFjdGlvbikge1xuXG4gICAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgICAgICBjYXNlIEFQUEVORF9VU0VSX1BST0ZJTEVTOiB7XG4gICAgICAgICAgICBsZXQgbmV3U3RhdGUgPSB7XG4gICAgICAgICAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgICAgICAgICAgcHJvZmlsZXMgOiB7IC4uLnN0YXRlLnByb2ZpbGVzIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbmV3U3RhdGUucHJvZmlsZXMgPSBhY3Rpb24ucGF5bG9hZC5yZWR1Y2UoKHByb2ZpbGVNYXAsIHByb2ZpbGUpID0+IHtcbiAgICAgICAgICAgICAgICBwcm9maWxlTWFwW3Byb2ZpbGUucHJvZmlsZUlkXSA9IHByb2ZpbGVcbiAgICAgICAgICAgICAgICByZXR1cm4gcHJvZmlsZU1hcFxuICAgICAgICAgICAgfSwgbmV3U3RhdGUucHJvZmlsZXMpXG5cbiAgICAgICAgICAgIHJldHVybiBuZXdTdGF0ZVxuICAgICAgICB9XG5cbiAgICB9XG4gICAgcmV0dXJuIHN0YXRlXG59IiwiaW1wb3J0IHsgQVBQRU5EX0xBQlMgfSBmcm9tICcuLi8uLi9jb25zdGFudHMvdHlwZXMnO1xuXG5jb25zdCBkZWZhdWx0U3RhdGUgPSB7XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHN0YXRlID0gZGVmYXVsdFN0YXRlLCBhY3Rpb24pIHtcblxuICAgIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICAgICAgY2FzZSBBUFBFTkRfTEFCUzoge1xuICAgICAgICAgICAgbGV0IG5ld1N0YXRlID0geyAuLi5zdGF0ZSB9XG5cbiAgICAgICAgICAgIHJldHVybiBhY3Rpb24ucGF5bG9hZC5yZWR1Y2UoKGxhcE1hcCwgbGFiKSA9PiB7XG4gICAgICAgICAgICAgICAgbGFwTWFwW2xhYi5pZF0gPSBsYWJcbiAgICAgICAgICAgICAgICByZXR1cm4gbGFwTWFwXG4gICAgICAgICAgICB9LG5ld1N0YXRlKVxuXG4gICAgICAgIH1cblxuICAgIH1cbiAgICByZXR1cm4gc3RhdGVcbn0iLCJpbXBvcnQgeyBMQUJfU0VBUkNIIH0gZnJvbSAnLi4vLi4vY29uc3RhbnRzL3R5cGVzJztcblxuY29uc3QgZGVmYXVsdFN0YXRlID0ge1xuICAgIGxhYkxpc3Q6IFtdLFxuICAgIExPQURJTkc6IHRydWUsXG4gICAgRVJST1I6IG51bGxcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHN0YXRlID0gZGVmYXVsdFN0YXRlLCBhY3Rpb24pIHtcblxuICAgIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICAgICAgY2FzZSBMQUJfU0VBUkNIOiB7XG4gICAgICAgICAgICBsZXQgbmV3U3RhdGUgPSB7IC4uLnN0YXRlIH1cblxuICAgICAgICAgICAgbmV3U3RhdGUubGFiTGlzdCA9IGFjdGlvbi5wYXlsb2FkLm1hcChsYWIgPT4gbGFiLmlkKVxuICAgICAgICAgICAgbmV3U3RhdGUuTE9BRElORyA9IGZhbHNlXG5cbiAgICAgICAgICAgIHJldHVybiBuZXdTdGF0ZVxuICAgICAgICB9XG5cbiAgICB9XG4gICAgXG4gICAgcmV0dXJuIHN0YXRlXG59IiwiaW1wb3J0IHsgVE9HR0xFX0NPTkRJVElPTlMsIFRPR0dMRV9TUEVDSUFMSVRJRVMsIFNFTEVDVF9MT0NBVElPTiwgTUVSR0VfU0VBUkNIX1NUQVRFX0xBQiwgVE9HR0xFX0NSSVRFUklBLCBUT0dHTEVfVEVTVFMsIFRPR0dMRV9ESUFHTk9TSVNfQ1JJVEVSSUEsIExPQURfU0VBUkNIX0NSSVRFUklBX0xBQiB9IGZyb20gJy4uLy4uL2NvbnN0YW50cy90eXBlcyc7XG5cbmNvbnN0IGRlZmF1bHRTdGF0ZSA9IHtcbiAgICBjb21tb25seVNlYXJjaGVkVGVzdHM6IFt7IGlkOiAxLCBuYW1lOiAnR2VuZXJhbCBQaHlzaWNpYWwnIH0sIHsgaWQ6IDIsIG5hbWU6ICdOZXVyb2xvZ3knIH0sIHsgaWQ6IDMsIG5hbWU6ICdDYXJkaW9sb2dpc3QnIH0sIHsgaWQ6IDQsIG5hbWU6ICdPcnRob3BhZWRpYycgfSwgeyBpZDogNSwgbmFtZTogJ0luZmVydGlsaXR5JyB9XSxcbiAgICBzZWxlY3RlZFRlc3RzOiB7fSxcbiAgICBzZWxlY3RlZERpYWdub3Npc0NyaXRlcmlhIDoge30sXG4gICAgc2VsZWN0ZWRMb2NhdGlvbjogbnVsbCxcbiAgICBmaWx0ZXJDcml0ZXJpYToge30sXG4gICAgQ1JJVEVSSUFfTE9BREVEOiBmYWxzZVxufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoc3RhdGUgPSBkZWZhdWx0U3RhdGUsIGFjdGlvbikge1xuXG4gICAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgICAgICBjYXNlIExPQURfU0VBUkNIX0NSSVRFUklBX0xBQiA6IHtcbiAgICAgICAgICAgIGxldCBuZXdTdGF0ZSA9IHsuLi5zdGF0ZX1cblxuICAgICAgICAgICAgbmV3U3RhdGUuQ1JJVEVSSUFfTE9BREVEID0gdHJ1ZVxuICAgICAgICAgICAgbmV3U3RhdGUuZmlsdGVyQ3JpdGVyaWEgPSB7fVxuICAgICAgICAgICAgXG4gICAgICAgICAgICByZXR1cm4gbmV3U3RhdGVcbiAgICAgICAgfVxuXG4gICAgICAgIGNhc2UgVE9HR0xFX1RFU1RTOiB7XG4gICAgICAgICAgICBsZXQgbmV3U3RhdGUgPSB7XG4gICAgICAgICAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRUZXN0cyA6IHtcbiAgICAgICAgICAgICAgICAgICAgLi4uc3RhdGUuc2VsZWN0ZWRUZXN0c1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKG5ld1N0YXRlLnNlbGVjdGVkVGVzdHNbYWN0aW9uLnBheWxvYWQuaWRdKSB7XG4gICAgICAgICAgICAgICAgZGVsZXRlIG5ld1N0YXRlLnNlbGVjdGVkVGVzdHNbYWN0aW9uLnBheWxvYWQuaWRdXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG5ld1N0YXRlLnNlbGVjdGVkVGVzdHNbYWN0aW9uLnBheWxvYWQuaWRdID0gbmV3IERhdGUoKVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gbmV3U3RhdGVcbiAgICAgICAgfVxuXG4gICAgICAgIGNhc2UgVE9HR0xFX0RJQUdOT1NJU19DUklURVJJQToge1xuICAgICAgICAgICAgbGV0IG5ld1N0YXRlID0ge1xuICAgICAgICAgICAgICAgIC4uLnN0YXRlLFxuICAgICAgICAgICAgICAgIHNlbGVjdGVkRGlhZ25vc2lzQ3JpdGVyaWEgOiB7XG4gICAgICAgICAgICAgICAgICAgIC4uLnN0YXRlLnNlbGVjdGVkRGlhZ25vc2lzQ3JpdGVyaWFcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChuZXdTdGF0ZS5zZWxlY3RlZERpYWdub3Npc0NyaXRlcmlhW2FjdGlvbi5wYXlsb2FkLmlkXSkge1xuICAgICAgICAgICAgICAgIGRlbGV0ZSBuZXdTdGF0ZS5zZWxlY3RlZERpYWdub3Npc0NyaXRlcmlhW2FjdGlvbi5wYXlsb2FkLmlkXVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBhY3Rpb24ucGF5bG9hZC50cyA9IG5ldyBEYXRlKClcbiAgICAgICAgICAgICAgICBuZXdTdGF0ZS5zZWxlY3RlZERpYWdub3Npc0NyaXRlcmlhW2FjdGlvbi5wYXlsb2FkLmlkXSA9IGFjdGlvbi5wYXlsb2FkXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBuZXdTdGF0ZVxuICAgICAgICB9XG5cbiAgICAgICAgY2FzZSBTRUxFQ1RfTE9DQVRJT046IHtcbiAgICAgICAgICAgIGxldCBuZXdTdGF0ZSA9IHsgLi4uc3RhdGUgfVxuXG4gICAgICAgICAgICBuZXdTdGF0ZS5zZWxlY3RlZExvY2F0aW9uID0gYWN0aW9uLnBheWxvYWRcbiAgICAgICAgICAgIHJldHVybiBuZXdTdGF0ZVxuICAgICAgICB9XG5cbiAgICAgICAgY2FzZSBNRVJHRV9TRUFSQ0hfU1RBVEVfTEFCOiB7XG4gICAgICAgICAgICBsZXQgbmV3U3RhdGUgPSB7IC4uLnN0YXRlIH1cblxuICAgICAgICAgICAgbmV3U3RhdGUgPSBPYmplY3QuYXNzaWduKG5ld1N0YXRlLCBhY3Rpb24ucGF5bG9hZClcbiAgICAgICAgICAgIG5ld1N0YXRlLkNSSVRFUklBX0xPQURFRCA9IHRydWVcbiAgICAgICAgICAgIHJldHVybiBuZXdTdGF0ZVxuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBzdGF0ZVxufVxuXG5cblxuXG5cbiIsImltcG9ydCB7Y29tYmluZVJlZHVjZXJzfSBmcm9tICdyZWR1eCc7XG5cbmltcG9ydCBTRUFSQ0hfQ1JJVEVSSUFfT1BEIGZyb20gJy4vb3BkL3NlYXJjaENyaXRlcmlhLmpzJ1xuaW1wb3J0IFNFQVJDSF9DUklURVJJQV9MQUJTIGZyb20gJy4vZGlhZ25vc2lzL3NlYXJjaENyaXRlcmlhLmpzJ1xuaW1wb3J0IERPQ1RPUlMgZnJvbSAnLi9vcGQvZG9jdG9ycy5qcydcbmltcG9ydCBET0NUT1JfU0VBUkNIIGZyb20gJy4vb3BkL2RvY3RvclNlYXJjaC5qcydcbmltcG9ydCBMQUJTIGZyb20gJy4vZGlhZ25vc2lzL2xhYnMuanMnXG5pbXBvcnQgTEFCX1NFQVJDSCBmcm9tICcuL2RpYWdub3Npcy9sYWJzU2VhcmNoLmpzJ1xuaW1wb3J0IFVTRVIgZnJvbSAnLi9jb21tb25zL3VzZXIuanMnXG5cbmNvbnN0IGFsbFJlZHVjZXJzID0gY29tYmluZVJlZHVjZXJzKHtcbiAgICBTRUFSQ0hfQ1JJVEVSSUFfT1BELFxuICAgIFNFQVJDSF9DUklURVJJQV9MQUJTLFxuICAgIERPQ1RPUlMsXG4gICAgRE9DVE9SX1NFQVJDSCxcbiAgICBMQUJTLFxuICAgIExBQl9TRUFSQ0gsXG4gICAgVVNFUlxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IGFsbFJlZHVjZXJzXG4iLCJpbXBvcnQgeyBET0NUT1JfU0VBUkNIIH0gZnJvbSAnLi4vLi4vY29uc3RhbnRzL3R5cGVzJztcblxuY29uc3QgZGVmYXVsdFN0YXRlID0ge1xuICAgIGRvY3Rvckxpc3Q6IFtdLFxuICAgIExPQURJTkc6IHRydWUsXG4gICAgRVJST1I6IG51bGxcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHN0YXRlID0gZGVmYXVsdFN0YXRlLCBhY3Rpb24pIHtcblxuICAgIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICAgICAgY2FzZSBET0NUT1JfU0VBUkNIOiB7XG4gICAgICAgICAgICBsZXQgbmV3U3RhdGUgPSB7IC4uLnN0YXRlIH1cblxuICAgICAgICAgICAgbmV3U3RhdGUuZG9jdG9yTGlzdCA9IGFjdGlvbi5wYXlsb2FkLm1hcChkb2MgPT4gZG9jLmlkKVxuICAgICAgICAgICAgbmV3U3RhdGUuTE9BRElORyA9IGZhbHNlXG5cbiAgICAgICAgICAgIHJldHVybiBuZXdTdGF0ZVxuICAgICAgICB9XG5cbiAgICB9XG4gICAgXG4gICAgcmV0dXJuIHN0YXRlXG59IiwiaW1wb3J0IHsgQVBQRU5EX0RPQ1RPUlMgfSBmcm9tICcuLi8uLi9jb25zdGFudHMvdHlwZXMnO1xuXG5jb25zdCBkZWZhdWx0U3RhdGUgPSB7XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHN0YXRlID0gZGVmYXVsdFN0YXRlLCBhY3Rpb24pIHtcblxuICAgIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICAgICAgY2FzZSBBUFBFTkRfRE9DVE9SUzoge1xuICAgICAgICAgICAgbGV0IG5ld1N0YXRlID0geyAuLi5zdGF0ZSB9XG5cbiAgICAgICAgICAgIHJldHVybiBhY3Rpb24ucGF5bG9hZC5yZWR1Y2UoKGRvY3Rvck1hcCwgZG9jdG9yKSA9PiB7XG4gICAgICAgICAgICAgICAgZG9jdG9yTWFwW2RvY3Rvci5pZF0gPSBkb2N0b3JcbiAgICAgICAgICAgICAgICByZXR1cm4gZG9jdG9yTWFwXG4gICAgICAgICAgICB9LG5ld1N0YXRlKVxuXG4gICAgICAgIH1cblxuICAgIH1cbiAgICByZXR1cm4gc3RhdGVcbn0iLCJpbXBvcnQgeyBUT0dHTEVfQ09ORElUSU9OUywgVE9HR0xFX1NQRUNJQUxJVElFUywgU0VMRUNUX0xPQ0FUSU9OLCBNRVJHRV9TRUFSQ0hfU1RBVEVfT1BELCBUT0dHTEVfQ1JJVEVSSUEsIFRPR0dMRV9URVNUUywgVE9HR0xFX0RJQUdOT1NJU19DUklURVJJQSwgU0VUX09QRF9GSUxURVJTLCBMT0FEX1NFQVJDSF9DUklURVJJQV9PUEQgfSBmcm9tICcuLi8uLi9jb25zdGFudHMvdHlwZXMnO1xuXG5jb25zdCBkZWZhdWx0U3RhdGUgPSB7XG4gICAgY29tbW9ubHlTZWFyY2hlZENvbmRpdGlvbnM6IFt7IGlkOiAxLCBuYW1lOiAnSGVhZGFjaGUnIH0sIHsgaWQ6IDIsIG5hbWU6ICdTdG9tYWNoLWFjaGUnIH0sIHsgaWQ6IDMsIG5hbWU6ICdGbHUnIH0sIHsgaWQ6IDQsIG5hbWU6ICdIYWlyIEZhbGwnIH0sIHsgaWQ6IDUsIG5hbWU6ICdDaGVzdCBQYWluJyB9XSxcbiAgICBzZWxlY3RlZENvbmRpdGlvbnM6IHt9LFxuICAgIGNvbW1vbmx5U2VhcmNoZWRTcGVjaWFsaXRpZXM6IFt7IGlkOiAxLCBuYW1lOiAnR2VuZXJhbCBQaHlzaWNpYWwnIH0sIHsgaWQ6IDIsIG5hbWU6ICdOZXVyb2xvZ3knIH0sIHsgaWQ6IDMsIG5hbWU6ICdDYXJkaW9sb2dpc3QnIH0sIHsgaWQ6IDQsIG5hbWU6ICdPcnRob3BhZWRpYycgfSwgeyBpZDogNSwgbmFtZTogJ0luZmVydGlsaXR5JyB9XSxcbiAgICBzZWxlY3RlZFNwZWNpYWxpdGllczoge30sXG4gICAgc2VsZWN0ZWRDcml0ZXJpYToge30sXG4gICAgc2VsZWN0ZWRMb2NhdGlvbjogbnVsbCxcbiAgICBmaWx0ZXJDcml0ZXJpYToge30sXG4gICAgQ1JJVEVSSUFfTE9BREVEOiBmYWxzZVxufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoc3RhdGUgPSBkZWZhdWx0U3RhdGUsIGFjdGlvbikge1xuXG4gICAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgICAgICBjYXNlIExPQURfU0VBUkNIX0NSSVRFUklBX09QRCA6IHtcbiAgICAgICAgICAgIGxldCBuZXdTdGF0ZSA9IHsuLi5zdGF0ZX1cblxuICAgICAgICAgICAgbmV3U3RhdGUuQ1JJVEVSSUFfTE9BREVEID0gdHJ1ZVxuICAgICAgICAgICAgbmV3U3RhdGUuZmlsdGVyQ3JpdGVyaWEgPSB7fVxuICAgICAgICAgICAgXG4gICAgICAgICAgICByZXR1cm4gbmV3U3RhdGVcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgY2FzZSBUT0dHTEVfQ09ORElUSU9OUzoge1xuICAgICAgICAgICAgbGV0IG5ld1N0YXRlID0ge1xuICAgICAgICAgICAgICAgIC4uLnN0YXRlLFxuICAgICAgICAgICAgICAgIHNlbGVjdGVkQ29uZGl0aW9ucyA6IHtcbiAgICAgICAgICAgICAgICAgICAgLi4uc3RhdGUuc2VsZWN0ZWRDb25kaXRpb25zXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAobmV3U3RhdGUuc2VsZWN0ZWRDb25kaXRpb25zW2FjdGlvbi5wYXlsb2FkLmlkXSkge1xuICAgICAgICAgICAgICAgIGRlbGV0ZSBuZXdTdGF0ZS5zZWxlY3RlZENvbmRpdGlvbnNbYWN0aW9uLnBheWxvYWQuaWRdXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG5ld1N0YXRlLnNlbGVjdGVkQ29uZGl0aW9uc1thY3Rpb24ucGF5bG9hZC5pZF0gPSBuZXcgRGF0ZSgpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbmV3U3RhdGVcbiAgICAgICAgfVxuXG4gICAgICAgIGNhc2UgVE9HR0xFX1NQRUNJQUxJVElFUzoge1xuICAgICAgICAgICAgbGV0IG5ld1N0YXRlID0ge1xuICAgICAgICAgICAgICAgIC4uLnN0YXRlLFxuICAgICAgICAgICAgICAgIHNlbGVjdGVkU3BlY2lhbGl0aWVzIDoge1xuICAgICAgICAgICAgICAgICAgICAuLi5zdGF0ZS5zZWxlY3RlZFNwZWNpYWxpdGllc1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKG5ld1N0YXRlLnNlbGVjdGVkU3BlY2lhbGl0aWVzW2FjdGlvbi5wYXlsb2FkLmlkXSkge1xuICAgICAgICAgICAgICAgIGRlbGV0ZSBuZXdTdGF0ZS5zZWxlY3RlZFNwZWNpYWxpdGllc1thY3Rpb24ucGF5bG9hZC5pZF1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbmV3U3RhdGUuc2VsZWN0ZWRTcGVjaWFsaXRpZXNbYWN0aW9uLnBheWxvYWQuaWRdID0gbmV3IERhdGUoKVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gbmV3U3RhdGVcbiAgICAgICAgfVxuXG4gICAgICAgIGNhc2UgVE9HR0xFX0NSSVRFUklBOiB7XG4gICAgICAgICAgICBsZXQgbmV3U3RhdGUgPSB7XG4gICAgICAgICAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRDcml0ZXJpYSA6IHtcbiAgICAgICAgICAgICAgICAgICAgLi4uc3RhdGUuc2VsZWN0ZWRDcml0ZXJpYVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKG5ld1N0YXRlLnNlbGVjdGVkQ3JpdGVyaWFbYWN0aW9uLnBheWxvYWQuaWRdKSB7XG4gICAgICAgICAgICAgICAgZGVsZXRlIG5ld1N0YXRlLnNlbGVjdGVkQ3JpdGVyaWFbYWN0aW9uLnBheWxvYWQuaWRdXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGFjdGlvbi5wYXlsb2FkLnRzID0gbmV3IERhdGUoKVxuICAgICAgICAgICAgICAgIG5ld1N0YXRlLnNlbGVjdGVkQ3JpdGVyaWFbYWN0aW9uLnBheWxvYWQuaWRdID0gYWN0aW9uLnBheWxvYWRcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIG5ld1N0YXRlXG4gICAgICAgIH1cblxuICAgICAgICBjYXNlIFNFTEVDVF9MT0NBVElPTjoge1xuICAgICAgICAgICAgbGV0IG5ld1N0YXRlID0geyAuLi5zdGF0ZSB9XG5cbiAgICAgICAgICAgIG5ld1N0YXRlLnNlbGVjdGVkTG9jYXRpb24gPSBhY3Rpb24ucGF5bG9hZFxuICAgICAgICAgICAgcmV0dXJuIG5ld1N0YXRlXG4gICAgICAgIH1cblxuICAgICAgICBjYXNlIFNFVF9PUERfRklMVEVSUzoge1xuICAgICAgICAgICAgbGV0IG5ld1N0YXRlID0geyAuLi5zdGF0ZSB9XG5cbiAgICAgICAgICAgIG5ld1N0YXRlLmZpbHRlckNyaXRlcmlhID0gYWN0aW9uLnBheWxvYWRcbiAgICAgICAgICAgIHJldHVybiBuZXdTdGF0ZVxuICAgICAgICB9XG5cbiAgICAgICAgY2FzZSBNRVJHRV9TRUFSQ0hfU1RBVEVfT1BEOiB7XG4gICAgICAgICAgICBsZXQgbmV3U3RhdGUgPSB7IC4uLnN0YXRlIH1cblxuICAgICAgICAgICAgbmV3U3RhdGUgPSBPYmplY3QuYXNzaWduKG5ld1N0YXRlLCBhY3Rpb24ucGF5bG9hZClcbiAgICAgICAgICAgIG5ld1N0YXRlLkNSSVRFUklBX0xPQURFRCA9IHRydWVcbiAgICAgICAgICAgIHJldHVybiBuZXdTdGF0ZVxuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBzdGF0ZVxufVxuXG5cblxuXG5cbiIsImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBCcm93c2VyUm91dGVyLCBTd2l0Y2gsIFJvdXRlIH0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSdcblxuaW1wb3J0IFRvcEJhciBmcm9tICcuL2NvbnRhaW5lcnMvb3BkL1RvcEJhci5qcydcbmltcG9ydCBTZWFyY2hDcml0ZXJpYSBmcm9tICcuL2NvbnRhaW5lcnMvb3BkL1NlYXJjaENyaXRlcmlhLmpzJ1xuaW1wb3J0IExvY2F0aW9uU2VhcmNoIGZyb20gJy4vY29udGFpbmVycy9vcGQvTG9jYXRpb25TZWFyY2guanMnXG5pbXBvcnQgU2VhcmNoUmVzdWx0cyBmcm9tICcuL2NvbnRhaW5lcnMvb3BkL1NlYXJjaFJlc3VsdHMuanMnXG5pbXBvcnQgU2VhcmNoUmVzdWx0c0ZpbHRlciBmcm9tICcuL2NvbnRhaW5lcnMvb3BkL1NlYXJjaFJlc3VsdHNGaWx0ZXIuanMnXG5pbXBvcnQgRG9jdG9yUHJvZmlsZSBmcm9tICcuL2NvbnRhaW5lcnMvb3BkL0RvY3RvclByb2ZpbGUuanMnXG5pbXBvcnQgQ2xpbmljTGlzdCBmcm9tICcuL2NvbnRhaW5lcnMvb3BkL0NsaW5pY0xpc3QuanMnXG5pbXBvcnQgQXBwb2ludG1lbnRTbG90IGZyb20gJy4vY29udGFpbmVycy9vcGQvQXBwb2ludG1lbnRTbG90LmpzJ1xuaW1wb3J0IFBhdGllbnREZXRhaWxzIGZyb20gJy4vY29udGFpbmVycy9vcGQvUGF0aWVudERldGFpbHMuanMnXG5pbXBvcnQgVXNlclByb2ZpbGUgZnJvbSAnLi9jb250YWluZXJzL2NvbW1vbnMvVXNlclByb2ZpbGUuanMnXG5pbXBvcnQgVXNlckFwcG9pbnRtZW50cyBmcm9tICcuL2NvbnRhaW5lcnMvY29tbW9ucy9Vc2VyQXBwb2ludG1lbnRzLmpzJ1xuaW1wb3J0IFVzZXJSZXBvcnRzIGZyb20gJy4vY29udGFpbmVycy9jb21tb25zL1VzZXJSZXBvcnRzLmpzJ1xuaW1wb3J0IFBheW1lbnQgZnJvbSAnLi9jb250YWluZXJzL29wZC9QYXltZW50LmpzJ1xuaW1wb3J0IEJvb2tpbmcgZnJvbSAnLi9jb250YWluZXJzL29wZC9Cb29raW5nLmpzJ1xuaW1wb3J0IENyaXRlcmlhU2VhcmNoIGZyb20gJy4vY29udGFpbmVycy9vcGQvQ3JpdGVyaWFTZWFyY2guanMnXG5pbXBvcnQgRFhfU2VhcmNoQ3JpdGVyaWEgZnJvbSAnLi9jb250YWluZXJzL2RpYWdub3Npcy9TZWFyY2hDcml0ZXJpYS5qcydcbmltcG9ydCBEWF9Dcml0ZXJpYVNlYXJjaCBmcm9tICcuL2NvbnRhaW5lcnMvZGlhZ25vc2lzL0NyaXRlcmlhU2VhcmNoLmpzJ1xuaW1wb3J0IERYX1NlYXJjaFJlc3VsdHMgZnJvbSAnLi9jb250YWluZXJzL2RpYWdub3Npcy9TZWFyY2hSZXN1bHRzLmpzJ1xuaW1wb3J0IExhYlNsb3RzIGZyb20gJy4vY29udGFpbmVycy9kaWFnbm9zaXMvTGFiU2xvdHMuanMnXG5pbXBvcnQgRFhfUGF0aWVudERldGFpbHMgZnJvbSAnLi9jb250YWluZXJzL2RpYWdub3Npcy9QYXRpZW50RGV0YWlscy5qcydcbmltcG9ydCBEWF9Cb29raW5nU3VtbWFyeSBmcm9tICcuL2NvbnRhaW5lcnMvZGlhZ25vc2lzL0Jvb2tpbmdTdW1tYXJ5LmpzJ1xuaW1wb3J0IERvY3RvckNoYXQgZnJvbSAnLi9jb250YWluZXJzL2NvbW1vbnMvQ2hhdC5qcydcblxuXG5jb25zdCByb3V0ZXMgPSBbXG5cbiAgICB7IHBhdGg6ICcvJywgZXhhY3Q6dHJ1ZSwgY29tcG9uZW50OiBTZWFyY2hDcml0ZXJpYSB9LFxuICAgIHsgcGF0aDogJy9sb2NhdGlvbnNlYXJjaCcsIGV4YWN0OnRydWUsIGNvbXBvbmVudDogTG9jYXRpb25TZWFyY2ggfSxcbiAgICB7IHBhdGg6ICcvY3JpdGVyaWFzZWFyY2gnLCBleGFjdDp0cnVlLCBjb21wb25lbnQ6IENyaXRlcmlhU2VhcmNoIH0sXG4gICAgeyBwYXRoOiAnL3NlYXJjaHJlc3VsdHMnLCBleGFjdDp0cnVlLCBjb21wb25lbnQ6IFNlYXJjaFJlc3VsdHMgfSxcbiAgICB7IHBhdGg6ICcvc2VhcmNocmVzdWx0cy9maWx0ZXInLCBleGFjdDp0cnVlLCBjb21wb25lbnQ6IFNlYXJjaFJlc3VsdHNGaWx0ZXIgfSxcbiAgICB7IHBhdGg6ICcvZG9jdG9ycHJvZmlsZS86aWQnLCBleGFjdDp0cnVlLCBjb21wb25lbnQ6IERvY3RvclByb2ZpbGUgfSxcbiAgICB7IHBhdGg6ICcvZG9jdG9ycHJvZmlsZS86aWQvYXZhaWxhYmlsaXR5JywgZXhhY3Q6dHJ1ZSwgY29tcG9uZW50OiBDbGluaWNMaXN0IH0sXG4gICAgeyBwYXRoOiAnL2RvY3RvcnByb2ZpbGUvOmlkLzpjbGluaWNJZC9ib29rJywgZXhhY3Q6dHJ1ZSwgY29tcG9uZW50OiBBcHBvaW50bWVudFNsb3QgfSxcbiAgICB7IHBhdGg6ICcvZG9jdG9ycHJvZmlsZS86aWQvOmNsaW5pY0lkL2Jvb2tkZXRhaWxzJywgZXhhY3Q6dHJ1ZSwgY29tcG9uZW50OiBQYXRpZW50RGV0YWlscyB9LFxuICAgIHsgcGF0aDogJy91c2VyJywgZXhhY3Q6dHJ1ZSwgY29tcG9uZW50OiBVc2VyUHJvZmlsZSB9LFxuICAgIHsgcGF0aDogJy91c2VyLzppZCcsIGV4YWN0OnRydWUsIGNvbXBvbmVudDogVXNlclByb2ZpbGUgfSxcbiAgICB7IHBhdGg6ICcvdXNlci86aWQvYXBwb2ludG1lbnRzJywgZXhhY3Q6dHJ1ZSwgY29tcG9uZW50OiBVc2VyQXBwb2ludG1lbnRzIH0sXG4gICAgeyBwYXRoOiAnL3VzZXIvOmlkL3JlcG9ydHMnLCBleGFjdDp0cnVlLCBjb21wb25lbnQ6IFVzZXJSZXBvcnRzIH0sXG4gICAgeyBwYXRoOiAnL2NoYXQnLCBleGFjdDp0cnVlLCBjb21wb25lbnQ6IERvY3RvckNoYXQgfSxcbiAgICB7IHBhdGg6ICcvcGF5bWVudCcsIGV4YWN0OnRydWUsIGNvbXBvbmVudDogUGF5bWVudCB9LFxuICAgIHsgcGF0aDogJy9ib29raW5nLzpyZWZJZCcsIGV4YWN0OnRydWUsIGNvbXBvbmVudDogQm9va2luZyB9LFxuICAgIHsgcGF0aDogJy9keCcsIGV4YWN0OnRydWUsIGNvbXBvbmVudDogRFhfU2VhcmNoQ3JpdGVyaWEgfSxcbiAgICB7IHBhdGg6ICcvZHgvY3JpdGVyaWFzZWFyY2gnLCBleGFjdDp0cnVlLCBjb21wb25lbnQ6IERYX0NyaXRlcmlhU2VhcmNoIH0sXG4gICAgeyBwYXRoOiAnL2R4L3NlYXJjaHJlc3VsdHMnLCBleGFjdDp0cnVlLCBjb21wb25lbnQ6IERYX1NlYXJjaFJlc3VsdHMgfSxcbiAgICB7IHBhdGg6ICcvbGFiLzppZC9ib29rJywgZXhhY3Q6dHJ1ZSwgY29tcG9uZW50OiBMYWJTbG90cyB9LFxuICAgIHsgcGF0aDogJy9sYWIvOmlkL2Jvb2tkZXRhaWxzJywgZXhhY3Q6dHJ1ZSwgY29tcG9uZW50OiBEWF9QYXRpZW50RGV0YWlscyB9LFxuICAgIHsgcGF0aDogJy9sYWIvYm9va2luZy9zdW1tYXJ5LzppZCcsIGV4YWN0OnRydWUsIGNvbXBvbmVudDogRFhfQm9va2luZ1N1bW1hcnkgfSxcblxuXVxuXG5jbGFzcyBSb3V0ZXJDb25maWcgZXh0ZW5kcyBDb21wb25lbnQge1xuXG4gICAgc3RhdGljIFJPVVRFUyA9IHJvdXRlc1xuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICA8VG9wQmFyIC8+XG4gICAgICAgICAgICAgICAgPFN3aXRjaD5cbiAgICAgICAgICAgICAgICAgICAge3JvdXRlcy5tYXAoKHJvdXRlLGkpID0+IChcbiAgICAgICAgICAgICAgICAgICAgICAgIDxSb3V0ZSB7Li4ucm91dGV9IGtleT17aX0vPlxuICAgICAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgICA8L1N3aXRjaD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApXG4gICAgfVxuXG59XG5cblxuZXhwb3J0IGRlZmF1bHQgUm91dGVyQ29uZmlnXG5cbiIsIlxuY29uc3QgZGF5cyA9IFsnU3VuZGF5JywgJ01vbmRheScsICdUdWVzZGF5JywgJ1dlZG5lc2RheScsICdUaHVyc2RheScsICdGcmlkYXknLCAnU2F0dXJkYXknXTtcblxuZXhwb3J0IGNvbnN0IGdldFRpbWUgPSAodGltZVN0YW1wKSA9PiB7XG4gICAgdmFyIGRhdGUgPSBuZXcgRGF0ZSh0aW1lU3RhbXApO1xuICAgIHZhciBob3VycyA9IGRhdGUuZ2V0SG91cnMoKTtcbiAgICB2YXIgbWludXRlcyA9IFwiMFwiICsgZGF0ZS5nZXRNaW51dGVzKCk7XG4gICAgcmV0dXJuIGhvdXJzICsgJzonICsgbWludXRlcy5zdWJzdHIoLTIpXG59XG5leHBvcnQgY29uc3QgZ2V0RGF5TmFtZSA9ICh0aW1lU3RhbXApID0+IHtcbiAgICByZXR1cm4gZGF5c1tuZXcgRGF0ZSh0aW1lU3RhbXApLmdldERheSgpXVxuXG59IiwiY29uc3QgcGF0aCA9IHJlcXVpcmUoJ3BhdGgnKTtcbmNvbnN0IGh0dHAgPSByZXF1aXJlKCdodHRwJyk7XG5jb25zdCBFeHByZXNzID0gcmVxdWlyZSgnZXhwcmVzcycpO1xuY29uc3QgYXBwID0gbmV3IEV4cHJlc3MoKTtcbmNvbnN0IHNlcnZlciA9IG5ldyBodHRwLlNlcnZlcihhcHApO1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQgUmVhY3RET01TZXJ2ZXIgZnJvbSAncmVhY3QtZG9tL3NlcnZlcidcbmltcG9ydCB7IFN0YXRpY1JvdXRlciB9IGZyb20gJ3JlYWN0LXJvdXRlcidcbmltcG9ydCBSb3V0ZXMgZnJvbSAnLi9kZXYvanMvcm91dGVzLmpzJ1xuaW1wb3J0IHsgTXVpVGhlbWVQcm92aWRlciwgY3JlYXRlTXVpVGhlbWUsIGNyZWF0ZUdlbmVyYXRlQ2xhc3NOYW1lIH0gZnJvbSAnbWF0ZXJpYWwtdWkvc3R5bGVzJztcbmltcG9ydCB7IFNoZWV0c1JlZ2lzdHJ5IH0gZnJvbSAncmVhY3QtanNzL2xpYi9qc3MnO1xuXG5pbXBvcnQgSnNzUHJvdmlkZXIgZnJvbSAncmVhY3QtanNzL2xpYi9Kc3NQcm92aWRlcic7XG5pbXBvcnQgeyBQcm92aWRlciB9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCB7IGNyZWF0ZVN0b3JlLCBhcHBseU1pZGRsZXdhcmUgfSBmcm9tICdyZWR1eCc7XG5pbXBvcnQgdGh1bmsgZnJvbSAncmVkdXgtdGh1bmsnO1xuaW1wb3J0IHsgY3JlYXRlTG9nZ2VyIH0gZnJvbSAncmVkdXgtbG9nZ2VyJ1xuaW1wb3J0IGFsbFJlZHVjZXJzIGZyb20gJy4vZGV2L2pzL3JlZHVjZXJzL2luZGV4LmpzJztcbmltcG9ydCB7IG1hdGNoUGF0aCB9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nXG5cblxuYXBwLnVzZSgnL2Rpc3QnLCBFeHByZXNzLnN0YXRpYyhwYXRoLmpvaW4oX19kaXJuYW1lLCAnZGlzdCcpKSk7XG5cbmFwcC51c2UoJy9hcGknLCBFeHByZXNzLnN0YXRpYyhwYXRoLmpvaW4oX19kaXJuYW1lLCAnZHVtbXlfYXBpJykpKTtcblxuXG5hcHAuZ2V0KCcqJywgZnVuY3Rpb24ocmVxLCByZXMpe1xuXG4gICAgY29uc3QgY29udGV4dCA9IHt9XG5cbiAgICBjb25zdCBzdG9yZSA9IGNyZWF0ZVN0b3JlKFxuICAgICAgICBhbGxSZWR1Y2Vyc1xuICAgICk7XG5cbiAgICBjb25zdCBzaGVldHNSZWdpc3RyeSA9IG5ldyBTaGVldHNSZWdpc3RyeSgpO1xuICAgIGNvbnN0IHRoZW1lID0gY3JlYXRlTXVpVGhlbWUoe1xuICAgICAgICBwYWxldHRlOiB7XG4gICAgICAgICAgICBwcmltYXJ5OiB7XG4gICAgICAgICAgICAgICAgbWFpbjogJyMwMGI3YjAnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2Vjb25kYXJ5OiB7XG4gICAgICAgICAgICAgICAgbWFpbjogJyMwMGI3YjAnXG4gICAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICBzdGF0dXM6IHtcbiAgICAgICAgICAgIGRhbmdlcjogJ29yYW5nZScsXG4gICAgICAgIH0sXG4gICAgfSlcbiAgICBjb25zdCBnZW5lcmF0ZUNsYXNzTmFtZSA9IGNyZWF0ZUdlbmVyYXRlQ2xhc3NOYW1lKCk7XG5cbiAgICBjb25zdCBodG1sID0gUmVhY3RET01TZXJ2ZXIucmVuZGVyVG9TdHJpbmcoXG4gICAgICAgIDxQcm92aWRlciBzdG9yZT17c3RvcmV9PlxuICAgICAgICAgICAgPEpzc1Byb3ZpZGVyIHJlZ2lzdHJ5PXtzaGVldHNSZWdpc3RyeX0gZ2VuZXJhdGVDbGFzc05hbWU9e2dlbmVyYXRlQ2xhc3NOYW1lfT5cbiAgICAgICAgICAgICAgICA8TXVpVGhlbWVQcm92aWRlciB0aGVtZT17dGhlbWV9PlxuICAgICAgICAgICAgICAgICAgICA8U3RhdGljUm91dGVyXG4gICAgICAgICAgICAgICAgICAgICAgICBsb2NhdGlvbj17cmVxLnVybH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQ9e2NvbnRleHR9XG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxSb3V0ZXMgLz5cbiAgICAgICAgICAgICAgICAgICAgPC9TdGF0aWNSb3V0ZXI+XG4gICAgICAgICAgICAgICAgPC9NdWlUaGVtZVByb3ZpZGVyPlxuICAgICAgICAgICAgPC9Kc3NQcm92aWRlcj5cbiAgICAgICAgPC9Qcm92aWRlcj5cbiAgICApXG5cbiAgICBjb25zdCBjc3MgPSBzaGVldHNSZWdpc3RyeS50b1N0cmluZygpXG5cblxuICAgIGlmIChjb250ZXh0LnVybCkge1xuICAgICAgICByZXMud3JpdGVIZWFkKDMwMSwge1xuICAgICAgICAgICAgTG9jYXRpb246IGNvbnRleHQudXJsXG4gICAgICAgIH0pXG4gICAgICAgIHJlcy5lbmQoKVxuICAgIH0gZWxzZSB7XG5cbiAgICAgICAgLy8gaW5zaWRlIGEgcmVxdWVzdFxuICAgICAgICBjb25zdCBwcm9taXNlcyA9IFtdXG4gICAgIFxuICAgICAgICBSb3V0ZXMuUk9VVEVTLnNvbWUocm91dGUgPT4ge1xuICAgICAgICAgICAgLy8gdXNlIGBtYXRjaFBhdGhgIGhlcmVcbiAgICAgICAgICAgIGNvbnN0IG1hdGNoID0gbWF0Y2hQYXRoKHJlcS5wYXRoLCByb3V0ZSlcbiAgICAgICAgICAgIGlmIChtYXRjaCAmJiByb3V0ZS5sb2FkRGF0YSlcbiAgICAgICAgICAgICAgICBwcm9taXNlcy5wdXNoKHJvdXRlLmxvYWREYXRhKCkpXG4gICAgICAgICAgICByZXR1cm4gbWF0Y2hcbiAgICAgICAgfSlcblxuICAgICAgICBQcm9taXNlLmFsbChwcm9taXNlcykudGhlbihkYXRhID0+IHtcbiAgICAgICAgICAgIHJlcy5yZW5kZXIoJy4vaW5kZXgudGVtcGxhdGUuZWpzJywge1xuICAgICAgICAgICAgICAgIGh0bWwsIGNzc1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfSlcblxuICAgIH1cblxufSk7XG5cblxuYXBwLnVzZShmdW5jdGlvbiAocmVxLCByZXMpIHtcbiAgICByZXMuc2VuZEZpbGUoJ2luZGV4Lmh0bWwnLCB7IHJvb3Q6ICcuL2Rpc3QvJyB9KVxufSlcblxuc2VydmVyLmxpc3RlbigzMDAwLCAoZXJyKSA9PiB7XG4gICAgaWYgKGVycikge1xuICAgICAgICByZXR1cm4gY29uc29sZS5lcnJvcihlcnIpO1xuICAgIH1cbiAgICBjb25zb2xlLmluZm8oJ1NlcnZlciBydW5uaW5nIG9uIGh0dHA6Ly9sb2NhbGhvc3Q6MzAwMCcpO1xufSk7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYXhpb3NcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZXhwcmVzc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJodHRwXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm1hdGVyaWFsLXVpLWljb25zL0FjY291bnRDaXJjbGVcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibWF0ZXJpYWwtdWktaWNvbnMvQXJyb3dCYWNrXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm1hdGVyaWFsLXVpLWljb25zL0F0dGFjaE1vbmV5XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm1hdGVyaWFsLXVpLWljb25zL0F2VGltZXJcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibWF0ZXJpYWwtdWktaWNvbnMvQ2FsbFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJtYXRlcmlhbC11aS1pY29ucy9FeHBhbmRNb3JlXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm1hdGVyaWFsLXVpLWljb25zL0ZpbHRlckxpc3RcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibWF0ZXJpYWwtdWktaWNvbnMvSG9tZVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJtYXRlcmlhbC11aS1pY29ucy9LZXlib2FyZEFycm93UmlnaHRcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibWF0ZXJpYWwtdWktaWNvbnMvTG9jYXRpb25PblwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJtYXRlcmlhbC11aS1pY29ucy9Mb2NhdGlvblNlYXJjaGluZ1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJtYXRlcmlhbC11aS1pY29ucy9QYXltZW50XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm1hdGVyaWFsLXVpLWljb25zL1NvcnRcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibWF0ZXJpYWwtdWkvQXBwQmFyXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm1hdGVyaWFsLXVpL0NoZWNrYm94XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm1hdGVyaWFsLXVpL0NoaXBcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibWF0ZXJpYWwtdWkvRXhwYW5zaW9uUGFuZWxcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibWF0ZXJpYWwtdWkvRm9ybVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJtYXRlcmlhbC11aS9NZW51XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm1hdGVyaWFsLXVpL1JhZGlvXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm1hdGVyaWFsLXVpL1N0ZXBwZXJcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibWF0ZXJpYWwtdWkvVG9vbGJhclwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJtYXRlcmlhbC11aS9zdHlsZXNcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicGF0aFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdC1kb20vc2VydmVyXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0LWluZmluaXRlLXNjcm9sbGVyXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0LWpzcy9saWIvSnNzUHJvdmlkZXJcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhY3QtanNzL2xpYi9qc3NcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhY3QtcmVkdXhcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhY3Qtcm91dGVyXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0LXJvdXRlci1kb21cIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVkdXhcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVkdXgtbG9nZ2VyXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlZHV4LXRodW5rXCIpOyJdLCJzb3VyY2VSb290IjoiIn0=