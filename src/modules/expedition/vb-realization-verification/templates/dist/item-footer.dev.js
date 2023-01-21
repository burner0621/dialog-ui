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
    key: "getStatusReqReal",
    get: function get() {
      var res = 0;
      return res;
    }
  }, {
    key: "getValueReqReal",
    get: function get() {
      var res = 0;
      var qty = this.context.items.map(function (item) {
        var incomeTax = 0;
        var vat = 0;
        var amount = item.data.Amount;
        if (item.data.UseIncomeTax && item.data.IncomeTaxBy == "Supplier") incomeTax = amount * item.data.IncomeTaxRate;
        if (item.data.UseVat) vat = amount * 0.1; 

        return amount - incomeTax + vat;
      });
      var sum = qty.reduce(function (prev, curr, index) {
        return prev + curr;
      }, 0);
      return this.context.options.vbRequestDocumentAmount - sum;
    }
  }, {
    key: "getIncomeTax",
    get: function get() {
      var qty = this.context.items.map(function (item) {
        var amount = 0;
        if (item.data.UseIncomeTax && item.data.IncomeTaxBy == "Supplier") amount += amount * item.IncomeTaxRate;
        return amount;
      });
      return qty.reduce(function (prev, curr, index) {
        return prev + curr;
      }, 0);
    }
  }, {
    key: "getAmountVB",
    get: function get() {
      // var item = this.context.
      return this.context.options.vbRequestDocumentAmount;
    }
  }, {
    key: "getAmountAll",
    get: function get() {
      var qty = this.context.items.map(function (item) {
        var incomeTax = 0;
        var vat = 0;
        var amount = item.data.Amount;
        if (item.data.UseIncomeTax && item.data.IncomeTaxBy == "Supplier") incomeTax = amount * item.data.IncomeTaxRate;
        if (item.data.UseVat) vat = amount * 0.1; 

        return amount - incomeTax + vat;
      });
      return qty.reduce(function (prev, curr, index) {
        return prev + curr;
      }, 0);
    }
  }, {
    key: "getAmountVAT",
    get: function get() {
      var qty = this.context.items.map(function (item) {
        var amount = 0;
        if (item.data.UseVat) amount += item.data.Amount * 0.1;
        return amount;
      });
      return qty.reduce(function (prev, curr, index) {
        return prev + curr;
      }, 0);
    }
  }, {
    key: "getAmountTotal",
    get: function get() {
      var qty = this.context.items.map(function (item) {
        return item.data.Amount;
      });
      return qty.reduce(function (prev, curr, index) {
        return prev + curr;
      }, 0);
    }
  }]);

  return ItemFooter;
}();

exports.ItemFooter = ItemFooter;