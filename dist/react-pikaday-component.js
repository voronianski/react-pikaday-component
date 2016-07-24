(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("pikaday"));
	else if(typeof define === 'function' && define.amd)
		define("ReactPikadayComponent", ["react", "pikaday"], factory);
	else if(typeof exports === 'object')
		exports["ReactPikadayComponent"] = factory(require("react"), require("pikaday"));
	else
		root["ReactPikadayComponent"] = factory(root["React"], root["Pikaday"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_2__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Pikaday = void 0;
	if ('undefined' !== typeof window) {
	    Pikaday = __webpack_require__(2);
	}

	var ReactPikadayComponent = function (_React$Component) {
	    _inherits(ReactPikadayComponent, _React$Component);

	    function ReactPikadayComponent() {
	        _classCallCheck(this, ReactPikadayComponent);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(ReactPikadayComponent).apply(this, arguments));
	    }

	    _createClass(ReactPikadayComponent, [{
	        key: 'componentDidMount',


	        // see Pikaday options at https://github.com/dbushell/Pikaday#configuration
	        // except `onSelect` and `field`
	        value: function componentDidMount() {
	            var _getValueLink2 = this._getValueLink(this.props);

	            var value = _getValueLink2.value;


	            this._setupPikaday();
	            this._setDateIfChanged(value);
	        }
	    }, {
	        key: 'componentWillReceiveProps',
	        value: function componentWillReceiveProps(nextProps) {
	            var newDate = this._getValueLink(nextProps).value;
	            var lastDate = this._getValueLink(this.props).value;

	            this._setDateIfChanged(newDate, lastDate);
	            this._setMinDateIfChanged(nextProps.minDate, this.props.minDate);
	            this._setMaxDateIfChanged(nextProps.maxDate, this.props.maxDate);
	        }
	    }, {
	        key: 'componentDidUpdate',
	        value: function componentDidUpdate(prevProps) {
	            // update if container is set
	            if (!prevProps.container && this.props.container) {
	                var newDate = this._getValueLink(this.props).value;
	                var lastDate = this._getValueLink(prevProps).value;

	                this.pikaday.destroy();
	                this._setupPikaday();
	                this._setDateIfChanged(newDate, lastDate);
	            }
	        }
	    }, {
	        key: 'componentWillUnmount',
	        value: function componentWillUnmount() {
	            this.pikaday.destroy();
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var _props = this.props;
	            var id = _props.id;
	            var className = _props.className;
	            var name = _props.name;
	            var disabled = _props.disabled;
	            var placeholder = _props.placeholder;
	            var readOnly = _props.readOnly;
	            var style = _props.style;


	            return _react2.default.createElement('input', {
	                id: id,
	                type: 'text',
	                ref: 'pikaday',
	                name: name,
	                className: className,
	                style: style,
	                placeholder: placeholder,
	                disabled: disabled,
	                readOnly: readOnly
	            });
	        }
	    }, {
	        key: '_getValueLink',
	        value: function _getValueLink(props) {
	            return props.valueLink || {
	                value: props.value,
	                requestChange: props.onChange
	            };
	        }
	    }, {
	        key: '_setupPikaday',
	        value: function _setupPikaday() {
	            var el = this.refs.pikaday;

	            var _getValueLink3 = this._getValueLink(this.props);

	            var requestChange = _getValueLink3.requestChange;
	            var _props2 = this.props;
	            var value = _props2.value;
	            var onChange = _props2.onChange;
	            var valueLink = _props2.valueLink;

	            var pikadayOptions = _objectWithoutProperties(_props2, ['value', 'onChange', 'valueLink']); // eslint-disable-line no-unused-vars


	            var options = _extends({}, pikadayOptions, {
	                field: el,
	                onSelect: requestChange
	            });

	            this.pikaday = new Pikaday(options);
	        }
	    }, {
	        key: '_setDateIfChanged',
	        value: function _setDateIfChanged(newDate, prevDate) {
	            var _this2 = this;

	            this._setDate(newDate, prevDate, function (newTime) {
	                if (isNaN(newTime)) {
	                    // workaround for pikaday not clearing value when date set to false
	                    var el = _this2.refs.pikaday;
	                    el.value = '';
	                }
	                _this2.pikaday.setDate(newDate, true); // not trigger onSelect
	            });
	        }
	    }, {
	        key: '_setMinDateIfChanged',
	        value: function _setMinDateIfChanged(newDate, prevDate) {
	            var _this3 = this;

	            this._setDate(newDate, prevDate, function () {
	                _this3.pikaday.setMinDate(newDate);
	            });
	        }
	    }, {
	        key: '_setMaxDateIfChanged',
	        value: function _setMaxDateIfChanged(newDate, prevDate) {
	            var _this4 = this;

	            this._setDate(newDate, prevDate, function () {
	                _this4.pikaday.setMaxDate(newDate);
	            });
	        }
	    }, {
	        key: '_setDate',
	        value: function _setDate(newDate, prevDate, setter) {
	            var newTime = newDate ? newDate.getTime() : null;
	            var prevTime = prevDate ? prevDate.getTime() : null;

	            if (newTime !== prevTime) {
	                setter(newTime);
	            }
	        }
	    }]);

	    return ReactPikadayComponent;
	}(_react2.default.Component);

	ReactPikadayComponent.propTypes = {
	    id: _react.PropTypes.string,
	    value: _react.PropTypes.instanceOf(Date),
	    onChange: _react.PropTypes.func,
	    disabled: _react.PropTypes.bool,
	    placeholder: _react.PropTypes.string,
	    readOnly: _react.PropTypes.bool,
	    name: _react.PropTypes.string,
	    style: _react.PropTypes.object,
	    valueLink: _react.PropTypes.shape({
	        value: _react.PropTypes.instanceOf(Date),
	        requestChange: _react.PropTypes.func.isRequired
	    }) };
	exports.default = ReactPikadayComponent;
	module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ }
/******/ ])
});
;