"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ItemFooter = void 0;

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
      this.data = this.context.data;
    }
  }, {
    key: "getValueReqReal",
    get: function get() {
      var res = this.context.options.Difference;
      return res;
    }
  }, {
    key: "getStatusReqReal",
    get: function get() {
      var res = this.context.options.Status_ReqReal;
      return res;
    }
  }, {
    key: "getAmountVB",
    get: function get() {
      var res = this.context.options.Amount_Request;
      return res;
    }
  }, {
    key: "getAmountAll",
    get: function get() {
      var res = this.context.options.AmountIncludeTax;
      return res;
    }
  }, {
    key: "getAmountVAT",
    get: function get() {
      var res = this.context.options.Amount_Vat;
      return res;
    }
  }, {
    key: "getAmountTotal",
    get: function get() {
      var res = this.context.options.AmountIncludeTax - this.context.options.Amount_Vat;
      return res;
    }
  }]);

  return ItemFooter;
}();

exports.ItemFooter = ItemFooter;