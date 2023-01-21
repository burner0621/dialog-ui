import { inject } from "aurelia-framework";
import moment from "moment";
import numeral from "numeral";
import XLSX from "xlsx";
import { Service } from "./service";
const SupplierLoader = require("../../../loader/garment-supplier-loader");

@inject(Service)
export class List {
  itemYears = [];
  controlOptions = {
    label: {
      length: 4,
    },
    control: {
      length: 4,
    },
  };

  tableOptions = {
    showColumns: false,
    search: false,
    showToggle: false,
    sortable: false,
  };

  constructor(service) {
    this.service = service;
    this.info = {};
    this.error = {};
    this.data = [];
    this.isEmpty = true;
    this.currency = "";
    this.purchase = 0;
    this.payment = 0;
    this.closingBalance = 0;
    this.itemMonths = [
      { text: "January", value: 1 },
      { text: "February", value: 2 },
      { text: "March", value: 3 },
      { text: "April", value: 4 },
      { text: "May", value: 5 },
      { text: "June", value: 6 },
      { text: "July", value: 7 },
      { text: "August", value: 8 },
      { text: "September", value: 9 },
      { text: "October", value: 10 },
      { text: "November", value: 11 },
      { text: "Desember", value: 12 },
    ];
    this.currentYear = moment().format("YYYY");

    for (var i = parseInt(this.currentYear); i >= 2018; i--) {
      this.itemYears.push(i.toString());
    }
  }

  supplierView = (supplier) => {
    return supplier.code + " - " + supplier.name;
  };

  async search() {
    this.payment = 0;
    this.purchase = 0;

    if (this.info.supplier && this.info.supplier.name)
      this.info.name = this.info.supplier.name;

    if (this.info.supplier && this.info.supplier.Id)
      this.info.id = this.info.supplier.Id;

    if (this.info.supplier && this.info.supplier.import)
      this.info.import = this.info.supplier.import;

    let validationError = false;

    if (this.info && (!this.info.supplier || this.info.supplier.name == null)) {
      this.error.supplier = "Supplier harus diisi";
      validationError = true;
    }
    if (this.info && (!this.info.supplier || this.info.supplier.Id == null)) {
      this.error.supplier = "Supplier harus diisi";
      validationError = true;
    }
    if (this.info && (!this.info.supplier || this.info.supplier.import == null)) {
      this.error.supplier = "Supplier harus diisi";
      validationError = true;
    }
    if (!validationError) {
      this.error = {};
      // this.flag = true;
      // this.tableList.refresh();

      let params = {
        supplierName: this.info.name,
        supplierId: this.info.id,
        import: this.info.import,
        month: this.info.month.value,
        year: this.info.year,
      };

      this.data = await this.service.search(params).then((result) => {
        if (result.data.length == 0) this.isEmpty = true;
        else this.isEmpty = false;

        var newDatas = [];
        let subTotalPurchase = 0;
        let subTotalPayment = 0;
        for (var item of result.data) {
          // if (item.InvoiceDate && item.MutationPurchase && item.MutationPayment) {
          //   if (item.Mutation > 0) {
          //     subTotalPurchase += item.Mutation;
          //     this.purchase += item.Mutation;
          //   } else {
          //     subTotalPayment += item.Mutation;
          //     this.payment += item.Mutation;
          //   }

          var newData = {
            IsInitialBalance: item.IsInitialBalance,
            IsTotalBalance: item.IsTotalBalance,
            Date: item.ArrivalDate ? moment(item.ArrivalDate).format("DD-MMM-YYYY") : null,
            Products: item.ProductNames,
            PurchasingCategoryName: item.PurchasingCategoryName,
            BillsNo: item.BillsNo,
            PaymentBills: item.PaymentBills,
            GarmentDeliveryOrderNo: item.GarmentDeliveryOrderNo,
            BankExpenditureNoteNo: item.BankExpenditureNoteNo,
            InternalNoteNo: item.InternalNoteNo,
            InvoiceNo: item.InvoiceNo,
            DPPAmount: item.DPPAmount ? numeral(item.DPPAmount).format("0,000.00") : 0,
            CurrencyDPPAmount: item.CurrencyDPPAmount ? numeral(item.CurrencyDPPAmount).format("0,000.00") : 0,
            VATAmount: item.VATAmount ? numeral(item.VATAmount).format("0,000.00") : 0,
            IncomeTaxAmount: item.IncomeTaxAmount ? numeral(item.IncomeTaxAmount).format("0,000.00") : 0,
            TotalInvoice: item.TotalInvoice ? numeral(item.TotalInvoice).format("0,000.00") : 0,
            MutationPurchase: item.MutationPurchase ? numeral(item.MutationPurchase).format("0,000.00") : 0,
            CurrencyMutationPurchase: item.CurrencyMutationPurchase ? numeral(item.CurrencyMutationPurchase).format("0,000.00") : 0,
            MutationPayment: item.MutationPayment ? numeral(item.MutationPayment).format("0,000.00") : 0,
            CurrencyMutationPayment: item.CurrencyMutationPayment ? numeral(item.CurrencyMutationPayment).format("0,000.00") : 0,
            RemainBalance: item.RemainBalance ? numeral(item.RemainBalance).format("0,000.00") : 0,
            CurrencyRemainBalance: item.CurrencyRemainBalance ? numeral(item.CurrencyRemainBalance).format("0,000.00") : 0,
            InitialBalance: item.InitialBalance ? numeral(item.InitialBalance).format("0,000.00") : 0
          };
          // } else if (!item.InvoiceDate && item.Mutation != null) {
          //   continue;
          //   var newData = {
          //     Date: null,
          //     InvoiceNo: item.InvoiceNo,
          //     DPP: "null",
          //     Purchase: numeral(subTotalPurchase).format("0,000.00"),
          //     Payment: numeral(subTotalPayment).format("0,000.00"),
          //     FinalBalance: numeral(this.purchase + this.payment).format(
          //       "0,000.00"
          //     ),
          //   };

          //   subTotalPurchase = 0;
          //   subTotalPayment = 0;
          // } else {
          //   var newData = {
          //     Previous: null,
          //     FinalBalance:
          //       item.FinalBalance != null
          //         ? numeral(item.FinalBalance).format("0,000.00")
          //         : null,
          //   };

          subTotalPurchase = 0;
          subTotalPayment = 0;
          // }

          if (item.Currency) this.currency = item.Currency;
          newDatas.push(newData);
        }
        this.closingBalance = numeral(result.finalBalance).format("0,000.00");
        this.payment = numeral(this.payment).format("0,000.00");
        this.purchase = numeral(this.purchase).format("0,000.00");
        // this.mutation = numeral(result.finalBalance).format('0,00');

        return newDatas;
      });
      //console.log(this.data);
    }
  }

  excel() {
    if (this.info.supplier && this.info.supplier.name)
      this.info.supplierName = this.info.supplier.name;
    if (this.info.supplier && this.info.supplier.import)
      this.info.supplierImport = this.info.supplier.import;
    if (this.info.supplier && this.info.supplier.Id)
      this.info.supplierId = this.info.supplier.Id;

    let validationError = false;

    if (this.info && (!this.info.supplier || this.info.supplier.name == null)) {
      this.error.supplier = "Supplier harus diisi";
      validationError = true;
    }
    if (this.info && (!this.info.supplier || this.info.supplier.import == null)) {
      this.error.supplier = "Supplier harus diisi";
      validationError = true;
    }
    if (this.info && (!this.info.supplier || this.info.supplier.Id == null)) {
      this.error.supplier = "Supplier harus diisi";
      validationError = true;
    }
    if (!validationError) {
      this.error = {};
      // this.flag = true;
      // this.tableList.refresh();

      let params = {
        supplierName: this.info.supplierName,
        supplierId: this.info.supplierId,
        import: this.info.supplierImport,
        month: this.info.month.value,
        year: this.info.year,
      };

      this.service.getXls(params);
    }
    // this.getExcelData();
  }

  pdf() {
    if (this.info.supplier && this.info.supplier.name)
      this.info.supplierName = this.info.supplier.name;
    if (this.info.supplier && this.info.supplier.import)
      this.info.supplierImport = this.info.supplier.import;
    if (this.info.supplier && this.info.supplier.Id)
      this.info.supplierId = this.info.supplier.Id;

    let validationError = false;

    if (this.info && (!this.info.supplier || this.info.supplier.name == null)) {
      this.error.supplier = "Supplier harus diisi";
      validationError = true;
    }
    if (this.info && (!this.info.supplier || this.info.supplier.import == null)) {
      this.error.supplier = "Supplier harus diisi";
      validationError = true;
    }
    if (this.info && (!this.info.supplier || this.info.supplier.Id == null)) {
      this.error.supplier = "Supplier harus diisi";
      validationError = true;
    }

    if (!validationError) {
      this.error = {};
      // this.flag = true;
      // this.tableList.refresh();

      let params = {
        supplierName: this.info.supplierName,
        supplierId: this.info.supplierId,
        import: this.info.supplierImport,
        month: this.info.month.value,
        year: this.info.year,
      };

      this.service.getPdf(params);
    }
    // this.getExcelData();
  }

  reset() {
    this.error = {};
    this.isEmpty = true;
    // this.flag = false;
    this.info.supplier = undefined;
    this.info.supplierName = "";
    this.currency = "";
    this.closingBalance = 0;
    this.purchase = 0;
    this.payment = 0;
    this.data = [];
    // this.tableList.refresh();
    this.info.year = moment().format("YYYY");
    this.info.month = { text: "January", value: 1 };
  }

  get supplierLoader() {
    return SupplierLoader;
  }
}

export class KeysValueConverter {
  toView(obj) {
    return Reflect.ownKeys(obj);
  }
}
