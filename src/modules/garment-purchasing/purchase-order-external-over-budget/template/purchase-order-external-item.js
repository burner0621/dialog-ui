// import { bindable, computedFrom } from 'aurelia-framework'
// import { factories } from 'powerbi-client';
// var UomLoader = require('../../../../loader/uom-loader');

// export class PurchaseOrderItem {
//   @bindable selectedDealUom;
//   @bindable price;

//   activate(context) {
//     this.context = context;
//     this.data = context.data;
//     this.error = context.error;
//     this.options = context.options;
//     this.isUseIncomeTax = this.context.context.options.isUseIncomeTax || false;
//     this.checkOverBudget = this.context.context.options.checkOverBudget;
//     this.selectedDealUom = this.data.dealUom;
//     this.price = this.data.pricePerDealUnit;

//     if (!this.data.budgetUsed) {
//       this.data.budgetUsed = 0;
//     }
//     if (!this.data.totalBudget) {
//       this.data.totalBudget = 0;
//     }
//     this.checkIsOverBudget();
//   }

//   bind() {
//     if (this.context.context.options.resetOverBudget == true) {
//       this.price = this.data.budgetPrice;
//       this.context.context.options.resetOverBudget = false;
//       if (this.error) {
//         if (this.error.overBudgetRemark) {
//           this.error.overBudgetRemark = "";
//         }
//       }
//     }
//   }


//   checkIsOverBudget() {
//     if (this.context.context.options.checkOverBudget) {
//       var totalDealPrice = (this.data.dealQuantity * this.price) + this.data.budgetUsed;
//       if (totalDealPrice > this.data.totalBudget) {
//         this.data.isOverBudget = true;
//       } else {
//         this.data.isOverBudget = false;
//         this.data.overBudgetRemark = "";
//       }
//     }
//   }

//   updatePrice() {
//     this.data.priceBeforeTax = this.price;
//     if (this.data.useIncomeTax) {
//       this.data.pricePerDealUnit = (100 * this.price) / 110;
//     } else {
//       this.data.pricePerDealUnit = this.price;
//     }
//     this.checkIsOverBudget();
//   }

//   selectedDealUomChanged(newValue) {
//     if (newValue._id) {
//       this.data.dealUom = newValue;
//     }
//   }

//   get quantityConversion() {
//     return this.data.dealQuantity * this.data.conversion;
//   }

//   conversionChanged(e) {
//     this.data.quantityConversion = this.data.dealQuantity * this.data.conversion;
//   }

//   priceChanged(e) {
//     this.updatePrice();
//   }

//   useIncomeTaxChanged(e) {
//     this.updatePrice();
//   }

//   get uomLoader() {
//     return UomLoader;
//   }

//   uomView = (uom) => {
//     return uom.unit
//   }

//   get prNo() {
//     return `${this.data.prNo} - ${this.data.prRefNo} - ${this.data.artikel}`;;
//   }

//   get product() {
//     return this.data.product.name;
//   }

//   controlOptions = {
//     control: {
//       length: 12
//     }
//   };
// }