'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _gregorianCalendar = require('gregorian-calendar');

var _gregorianCalendar2 = _interopRequireDefault(_gregorianCalendar);

function noop() {}

function getNow() {
  var value = new _gregorianCalendar2['default']();
  value.setTime(Date.now());
  return value;
}

function getNowByCurrentStateValue(value) {
  var ret = undefined;
  if (value) {
    ret = value.clone();
    ret.setTime(Date.now());
  } else {
    ret = getNow();
  }
  return ret;
}

var CalendarMixin = {
  propTypes: {
    value: _react.PropTypes.object,
    defaultValue: _react.PropTypes.object,
    onKeyDown: _react.PropTypes.func
  },

  getDefaultProps: function getDefaultProps() {
    return {
      onKeyDown: noop
    };
  },

  getInitialState: function getInitialState() {
    var props = this.props;
    var value = props.value || props.defaultValue || getNow();
    return {
      value: value,
      selectedValue: props.selectedValue || props.defaultSelectedValue
    };
  },

  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    var value = nextProps.value;
    var selectedValue = nextProps.selectedValue;

    if (value !== undefined) {
      value = value || nextProps.defaultValue || getNowByCurrentStateValue(this.state.value);
      this.setState({
        value: value
      });
    }
    if (selectedValue !== undefined) {
      this.setState({
        selectedValue: selectedValue
      });
    }
  },

  onSelect: function onSelect(value, cause) {
    if (value) {
      this.setValue(value);
    }
    this.setSelectedValue(value, cause);
  },

  renderRoot: function renderRoot(newProps) {
    var _className;

    var props = this.props;
    var prefixCls = props.prefixCls;

    var className = (_className = {}, _defineProperty(_className, prefixCls, 1), _defineProperty(_className, prefixCls + '-hidden', !props.visible), _defineProperty(_className, props.className, !!props.className), _className);

    return _react2['default'].createElement(
      'div',
      { className: (0, _classnames2['default'])(className) + ' ' + newProps.className,
        style: this.props.style,
        tabIndex: '0', onKeyDown: this.onKeyDown },
      newProps.children
    );
  },

  setSelectedValue: function setSelectedValue(selectedValue, cause) {
    if (this.isAllowedDate(selectedValue)) {
      if (!('selectedValue' in this.props)) {
        this.setState({
          selectedValue: selectedValue
        });
      }
      this.props.onSelect(selectedValue, cause || {});
    }
  },

  setValue: function setValue(value) {
    var originalValue = this.state.value;
    if (!('value' in this.props)) {
      this.setState({
        value: value
      });
    }
    if (originalValue && value && originalValue.getTime() !== value.getTime() || !originalValue && value || originalValue && !value) {
      this.props.onChange(value);
    }
  },

  isAllowedDate: function isAllowedDate(value) {
    var disabledDate = this.props.disabledDate;
    return !disabledDate || !disabledDate(value);
  }
};

exports['default'] = CalendarMixin;
module.exports = exports['default'];