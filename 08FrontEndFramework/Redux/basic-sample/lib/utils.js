"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Logger = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Logger = /*#__PURE__*/function () {
  function Logger(prefix) {
    var logFlag = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

    _classCallCheck(this, Logger);

    this.prefix = prefix;
    this.logFlag = logFlag;
  }

  _createClass(Logger, [{
    key: "log",
    value: function log() {
      if (this.logFlag) {
        var _console;

        for (var _len = arguments.length, message = new Array(_len), _key = 0; _key < _len; _key++) {
          message[_key] = arguments[_key];
        }

        (_console = console).log.apply(_console, ["[".concat(this.prefix, "]")].concat(message));
      }
    }
  }]);

  return Logger;
}();

exports.Logger = Logger;