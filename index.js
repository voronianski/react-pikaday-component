'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _pick = require('lodash/pick');

var _pick2 = _interopRequireDefault(_pick);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Pikaday = void 0;
if ('undefined' !== typeof window) {
    Pikaday = require('pikaday');
}

var ReactPikadayComponent = function (_React$Component) {
    _inherits(ReactPikadayComponent, _React$Component);

    function ReactPikadayComponent() {
        _classCallCheck(this, ReactPikadayComponent);

        return _possibleConstructorReturn(this, (ReactPikadayComponent.__proto__ || Object.getPrototypeOf(ReactPikadayComponent)).apply(this, arguments));
    }

    _createClass(ReactPikadayComponent, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _getValueLink2 = this._getValueLink(this.props),
                value = _getValueLink2.value;

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
            var _props = this.props,
                type = _props.type,
                container = _props.container;

            var rest = (0, _pick2.default)(this.props, ['id', 'className', 'name', 'tabIndex', 'disabled', 'placeholder', 'readOnly', 'style']);

            if (container === true) {
                return _react2.default.createElement(
                    'div',
                    null,
                    _react2.default.createElement('input', _extends({
                        type: 'hidden',
                        ref: 'pikaday'
                    }, rest)),
                    _react2.default.createElement('div', { ref: 'pikadayContainer' })
                );
            }

            return _react2.default.createElement('input', _extends({
                type: type,
                ref: 'pikaday'
            }, rest));
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

            var _getValueLink3 = this._getValueLink(this.props),
                requestChange = _getValueLink3.requestChange;

            var _props2 = this.props,
                value = _props2.value,
                onChange = _props2.onChange,
                valueLink = _props2.valueLink,
                container = _props2.container,
                pikadayOptions = _objectWithoutProperties(_props2, ['value', 'onChange', 'valueLink', 'container']); // eslint-disable-line no-unused-vars

            var options = _extends({}, pikadayOptions, {
                field: el,
                container: container === true ? this.refs.pikadayContainer : container && container.getDOMNode ? container.getDOMNode() : container,
                onSelect: requestChange
            });

            this.pikaday = new Pikaday(options);

            if (container === true) {
                this.pikaday.show();
            }
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
    type: _react.PropTypes.string,
    value: _react.PropTypes.instanceOf(Date),
    onChange: _react.PropTypes.func,
    disabled: _react.PropTypes.bool,
    placeholder: _react.PropTypes.string,
    readOnly: _react.PropTypes.bool,
    name: _react.PropTypes.string,
    style: _react.PropTypes.object,
    tabIndex: _react.PropTypes.number,
    valueLink: _react.PropTypes.shape({
        value: _react.PropTypes.instanceOf(Date),
        requestChange: _react.PropTypes.func.isRequired
    })

    // see Pikaday options at https://github.com/dbushell/Pikaday#configuration
    // except `onSelect` and `field`
};
ReactPikadayComponent.defaultProps = {
    type: 'text'
};
exports.default = ReactPikadayComponent;
module.exports = exports['default'];
