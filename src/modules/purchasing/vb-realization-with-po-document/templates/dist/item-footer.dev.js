"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ItemFooter = void 0;

var _aureliaFramework = require("aurelia-framework");

var _aureliaDependencyInjection = require("aurelia-dependency-injection");

var _aureliaApi = require("aurelia-api");

var _numeral = _interopRequireDefault(require("numeral"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ItemFooter =
/*#__PURE__*/
function () {
  function ItemFooter() {
    _classCallCheck(this, ItemFooter);
  }

  _createClass(ItemFooter, [{
    key: "activate",
    value: function activate(context) {
      this.context = context;
      console.log(this.context);
    }
  }, {
    key: "getTotal",
    value: function getTotal() {
      return 0;
    }
  }]);

  return ItemFooter;
}();

exports.ItemFooter = ItemFooter;