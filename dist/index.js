'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);

function debounce(func, wait, immediate) {
  var timeout;
  return function () {
    var context = this,
        args = arguments;
    var later = function later() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css = "/* add css styles here (optional) */\n\n.styles_test__3OKZ1 {\n  display: inline-block;\n  margin: 2em auto;\n  border: 2px solid #000;\n  font-size: 2em;\n}\n.styles_suggestion__17cBu{\n  background-color: #fff;\n  color:#fff;\n  cursor: pointer;\n}\n.styles_active__1uozy{\n  background-color: #000;\n  color:#fff;\n}\n.styles_suggestionsHolder__25Gwx{\n  background-color: red\n}\n";
styleInject(css);

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var defineProperty = function (obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

var SingleLineMention = function (_Component) {
  inherits(SingleLineMention, _Component);

  function SingleLineMention(props) {
    classCallCheck(this, SingleLineMention);

    var _this = possibleConstructorReturn(this, (SingleLineMention.__proto__ || Object.getPrototypeOf(SingleLineMention)).call(this, props));

    _this.state = {
      suggestionList: [],
      currtIndex: 0,
      left: 0
    };
    _this.onChange = _this.onChange.bind(_this);
    _this.appendValue = _this.appendValue.bind(_this);
    _this.keyUpHandle = _this.keyUpHandle.bind(_this);
    _this.onBlur = _this.onBlur.bind(_this);
    _this.call_parent = debounce(_this.call_parent.bind(_this), props.waitTime || 500);
    return _this;
  }

  createClass(SingleLineMention, [{
    key: 'componentDidMount',
    value: function componentDidMount(e) {
      var _this2 = this;

      document.addEventListener('click', function (e) {
        var container = document.getElementById("suggestion-input");
        if (e.target !== container) {
          _this2.setState({
            suggestionList: []
          });
        }
      });
    }
  }, {
    key: 'call_parent',
    value: function call_parent(value) {
      if (this.props.onChange && typeof this.props.onChange == "function") {
        this.props.onChange(value);
      }
    }
  }, {
    key: 'onBlur',
    value: function onBlur(e) {}
  }, {
    key: 'appendValue',
    value: function appendValue(value) {
      if (this.inputValue.value) {
        var index = this.inputValue.value.lastIndexOf('@');
        var newValue = this.inputValue.value.substr(0, index + 1) + value;
        if (newValue) {
          this.inputValue.value = newValue;
        }
        this.setState({
          suggestionList: []
        });
      }
      this.inputValue.focus();
    }
  }, {
    key: 'onChange',
    value: function onChange(e) {

      e.preventDefault();
      this.call_parent(e.target.value);
      var width = this.inputValue && this.inputValue.offsetWidth;
      if (e.target.value) {
        var value = e.target.value;
        var left = value.length * this.props.fontSize > width ? width - 60 : value.length * (8 - 1);
        if (value.length > 1) {
          var index = value.lastIndexOf('@');
          var key = value.substr(index + 1);

          var filteredSuggestion = this.props.data.filter(function (item) {
            return item.indexOf(key) !== -1;
          });
          this.setState({
            suggestionList: filteredSuggestion,
            currtIndex: 0,
            left: left
          });
        } else {
          this.setState({
            suggestionList: [],
            currtIndex: 0,
            left: left
          });
        }
        this.inputValue.focus();
      }
    }
  }, {
    key: 'keyUpHandle',
    value: function keyUpHandle(e) {
      e.preventDefault();

      var DOWN = 40,
          UP = 38;
      if (e.keyCode == 13 || e.target.keyCode == 13) {
        var index = this.inputValue.value.lastIndexOf(this.props.trigger || '@');
        var newValue = "";
        this.setState({
          suggestionList: []
        });
        if (this.inputValue.value.length > 0 && this.state.suggestionList.length > 0) {
          newValue = this.inputValue.value.substr(0, index + 1) + this.state.suggestionList[this.state.currtIndex || 0];
        }

        if (!!newValue) {
          this.inputValue.value = newValue;
        }
      } else if (e.keyCode == DOWN) {
        var newIndex = this.state.currtIndex + 1;
        if (newIndex == this.state.suggestionList.length) {
          newIndex = this.state.suggestionList.length - 1;
        }
        this.setState({
          currtIndex: newIndex
        });
      } else if (e.keyCode == UP) {
        var _newIndex = this.state.currtIndex - 1;
        if (_newIndex < 0) {
          _newIndex = 0;
        }
        this.setState({
          currtIndex: _newIndex
        });

        if (typeof this.inputValue.selectionStart == "number") {
          this.inputValue.selectionStart = this.inputValue.selectionEnd = this.inputValue.value.length;
        } else if (typeof this.inputValue.createTextRange != "undefined") {
          this.inputValue.focus();
          var range = this.inputValue.createTextRange();
          range.collapse(false);
          range.select();
        }
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var optionList = "";
      var left = this.state.left;

      var parentStyle = this.props.suggestionsHolder ? this.props.suggestionsHolder : 'suggestionsHolder';
      if (this.state.suggestionList) {
        optionList = this.state.suggestionList.map(function (item, index) {
          return React__default.createElement(
            'p',
            { className: index == _this3.state.currtIndex ? (_this3.props.activeClassname ? _this3.props.activeClassname : 'active') + ' ' + (_this3.props.suggestionClassName ? _this3.props.suggestionClassName : 'suggestion') : '' + _this3.props.suggestionClassName, key: index, onClick: function onClick() {
                console.log(item);_this3.appendValue(item);
              } },
            item
          );
        });
      }

      return React__default.createElement(
        'div',
        { id: 'suggestion-input', style: { display: "inline-block", position: "relative", width: '' + (this.props.InputWidth || 50) } },
        React__default.createElement('input', defineProperty({ 'class': this.props.inputClassName || "", id: 'input', autoFocus: true, onKeyUp: this.keyUpHandle, onBlur: this.onBlur, style: { fontSize: this.props.fontSize || 8, width: this.props.InputWidth || 180 }, ref: function ref(inpt) {
            _this3.inputValue = inpt;
          }, onChange: this.onChange }, 'onBlur', this.onBlur)),
        React__default.createElement(
          'div',
          { id: 'suggestions', className: parentStyle, style: { position: 'absolute', left: left + 'px' } },
          optionList
        )
      );
    }
  }]);
  return SingleLineMention;
}(React.Component);

exports.SingleLineMention = SingleLineMention;
//# sourceMappingURL=index.js.map
