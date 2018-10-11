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

var css = "/* add css styles here (optional) */\r\n\r\n.styles_test__3OKZ1 {\r\n  display: inline-block;\r\n  margin: 2em auto;\r\n  border: 2px solid #000;\r\n  font-size: 2em;\r\n}\r\n.styles_suggestion__17cBu{\r\n  background-color: #fff;\r\n  color:#fff;\r\n  cursor: pointer;\r\n}\r\n.styles_active__1uozy{\r\n  background-color: #000;\r\n  color:#fff;\r\n}\r\n.styles_suggestionsHolder__25Gwx{\r\n  background-color: red\r\n}\r\n";
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

/*
  @const Key Codes
*/
var DOWN = 40,
    UP = 38,
    ENTER = 13;

var SingleLineMention = function (_Component) {
  inherits(SingleLineMention, _Component);

  function SingleLineMention(props) {
    classCallCheck(this, SingleLineMention);

    var _this = possibleConstructorReturn(this, (SingleLineMention.__proto__ || Object.getPrototypeOf(SingleLineMention)).call(this, props));

    _this.findSuggestionBoxPostion = function (value, left) {
      var index = value.lastIndexOf('@');
      var key = value.substr(index + 1);

      var filteredSuggestion = _this.props.data.filter(function (item) {
        return item.indexOf(key) !== -1;
      });
      _this.setState({
        suggestionList: filteredSuggestion,
        currtIndex: 0,
        left: left
      });
    };

    _this.movingToTop = function () {
      var newIndex = _this.state.currtIndex - 1;
      if (newIndex < 0) {
        newIndex = 0;
      }
      _this.setState({
        currtIndex: newIndex
      });

      if (typeof _this.inputValue.selectionStart == "number") {
        _this.inputValue.selectionStart = _this.inputValue.selectionEnd = _this.inputValue.value.length;
      } else if (typeof _this.inputValue.createTextRange != "undefined") {
        _this.inputValue.focus();
        var range = _this.inputValue.createTextRange();
        range.collapse(false);
        range.select();
      }
    };

    _this.movingDown = function () {
      var newIndex = _this.state.currtIndex + 1;
      if (newIndex == _this.state.suggestionList.length) {
        newIndex = _this.state.suggestionList.length - 1;
      }
      _this.setState({
        currtIndex: newIndex
      });
    };

    _this.OnEnterClick = function () {
      var index = _this.inputValue.value.lastIndexOf(_this.props.trigger || '@');
      var newValue = "";
      _this.setState({
        suggestionList: []
      });
      if (_this.inputValue.value.length > 0 && _this.state.suggestionList.length > 0) {
        newValue = _this.inputValue.value.substr(0, index + 1) + _this.state.suggestionList[_this.state.currtIndex || 0];
      }

      if (!!newValue) {
        _this.inputValue.value = newValue;
      }
    };

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

    //Async call to get Suggestions

  }, {
    key: 'call_parent',
    value: function call_parent(value) {
      if (this.props.onChange && typeof this.props.onChange == "function") {
        this.props.onChange(value);
      }
    }

    //when  onBlur props is not provided

  }, {
    key: 'onBlur',
    value: function onBlur(e) {}

    // When Suggestion Selected

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

    // Finding Suggestion Box Postion Dynamically

  }, {
    key: 'onChange',
    value: function onChange(e) {

      e.preventDefault();
      this.call_parent(e.target.value);
      var width = this.inputValue && this.inputValue.offsetWidth;
      if (e.target.value) {
        var value = e.target.value;
        var left = value.length * this.props.fontSize > width ? width - 60 : value.length * (8 - 1);

        // Finding Postion Dynamically when the length is greater than 1
        if (value.length > 1) {

          this.findSuggestionBoxPostion(value, left);
        }
        // Keeping Suggestion Box at default position
        else {
            this.setState({
              suggestionList: [],
              currtIndex: 0,
              left: left
            });
          }
        this.inputValue.focus();
      }
    }

    //moving to the top of the Suggestions List

    //moving to the Bottom of the Suggestions List

    //Suggestion Selected with Enter

  }, {
    key: 'keyUpHandle',
    value: function keyUpHandle(e) {
      e.preventDefault();

      if (e.keyCode == ENTER || e.target.keyCode == ENTER) {

        this.OnEnterClick();
      } else if (e.keyCode == DOWN) {
        this.movingDown();
      } else if (e.keyCode == UP) {
        this.movingToTop();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var optionList = "";
      var left = this.state.left;

      var parentStyle = this.props.suggestionsHolder ? this.props.suggestionsHolder : 'suggestionsHolder';

      // Rendering Suggestion List

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

      // Input Box
      return React__default.createElement(
        'div',
        { id: 'suggestion-input', style: { display: "inline-block", position: "relative", width: '' + (this.props.InputWidth || 50) } },
        React__default.createElement('input', { 'class': this.props.inputClassName || "", id: 'input', autoFocus: true, onKeyUp: this.keyUpHandle, style: { fontSize: this.props.fontSize || 8, width: this.props.InputWidth || 180 }, ref: function ref(inpt) {
            _this3.inputValue = inpt;
          }, onChange: this.onChange, onBlur: this.onBlur }),
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
