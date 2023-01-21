import {
  inject,
  bindable,
  computedFrom
} from "aurelia-framework";
import moment from "moment";
import {
  Service
} from "./service";
var UnitLoader = require("../../../loader/unit-loader");
import {
  Router
} from "aurelia-router";

@inject(Service, Router)
export class DataForm {
  @bindable title;
  @bindable readOnly;
  @bindable Month;
  @bindable Year;
  @bindable Unit;

  yearFormat = "YYYY";
  years = [];

  formOptions = {
    cancelText: "Kembali",
    saveText: "Simpan"
  };

  //Options untuk No. Estimasi Produksi
  controlOptions = {
    label: {
      length: 3
    },
    control: {
      length: 6
    }
  };

  months = ["", "Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];

  constructor(service, router) {
    this.service = service;
    this.router = router;

    moment.locale("id");
    this.currentYearItem = parseInt(moment().format('YYYY'));
    this.minYearItem = this.currentYearItem - 10;
    this.maxYearItem = this.currentYearItem + 10;

    for (var i = parseInt(this.minYearItem); i <= parseInt(this.maxYearItem); i++) {
      this.years.push(i.toString());
    }
  }

  orderProductionsItems;

  bind(context) {
    this.context = context;
    this.data = this.context.data;
    this.error = this.context.error;

    // if (this.data.EstimatedNumber) {
    //   this.orderProductionsTableOptions = {};
    // }

    if (this.data.DateEstimated) {
      moment.locale("id");
      this.Month = moment(this.data.DateEstimated).format("MMMM");
      this.Year = moment(this.data.DateEstimated).format("YYYY");
    }

    if(this.data.UnitName){
      this.Unit = this.data.UnitName;
    }
    this.orderProductionsItems;

    this.cancelCallback = this.context.cancelCallback;
    this.deleteCallback = this.context.deleteCallback;
    this.editCallback = this.context.editCallback;
    this.saveCallback = this.context.saveCallback;
  }

  orderProductionsColumns = [{
      header: "Periode",
      value: "Period"
    },
    {
      header: "No. SOP",
      value: "OrderNumber"
    },
    {
      header: "No. Konstruksi",
      value: "ConstructionNumber"
    },
    {
      header: "Total Gram",
      value: "TotalGram"
    },
    {
      header: "Jumlah Order(Meter)",
      value: "TotalOrder"
    },
    {
      header: "Grade A(%)",
      value: "GradeA"
    },
    {
      header: "Grade B(%)",
      value: "GradeB"
    },
    {
      header: "Grade C(%)",
      value: "GradeC"
    },
    {
      header: "Grade D(%)",
      value: "GradeD"
    }
  ];

  get units() {
    return UnitLoader;
  }

  MonthChanged(newValue) {
    var monthInNumber = 0
    switch (this.Month) {
      case "Januari":
        monthInNumber = 1;
        break;
      case "Februari":
        monthInNumber = 2;
        break;
      case "Maret":
        monthInNumber = 3;
        break;
      case "April":
        monthInNumber = 4;
        break;
      case "Mei":
        monthInNumber = 5;
        break;
      case "Juni":
        monthInNumber = 6;
        break;
      case "Juli":
        monthInNumber = 7;
        break;
      case "Agustus":
        monthInNumber = 8;
        break;
      case "September":
        monthInNumber = 9;
        break;
      case "Oktober":
        monthInNumber = 10;
        break;
      case "November":
        monthInNumber = 11;
        break;
      case "Desember":
        monthInNumber = 12;
        break;
      default:
        monthInNumber = 0;
        break;
    }

    this.data.Month = monthInNumber
  }

  YearChanged(newValue) {
    this.data.Year = parseInt(newValue);
  }

  UnitChanged(newValue) {
    if (newValue.Id) {
      this.data.UnitId = newValue.Id;
    }
  }

  async searchOrderProductions() {
    this.data.EstimatedDetails = [];
    var errorIndex = 0;
    var emptyFieldName =
      "Isi Semua Field Untuk Mencari Surat Perintah Produksi";

    if (!this.data.Year) {
      errorIndex++;
    }

    if (!this.data.Month || this.data.Month == 0) {
      errorIndex++;
    }

    if (!this.data.UnitId) {
      errorIndex++;
    }

    if (errorIndex > 0) {
      window.alert(emptyFieldName);
    } else {
      var arg = {
        month: this.data.Month,
        year: this.data.Year,
        unitId: this.data.UnitId,
      };

      await this.service
        .searchOpenOrders(arg).then(result => {
          for (var datum of result.data) {
            if (datum.Period) {
              var Period = moment(datum.Period).format('MMMM YYYY');

              datum.Period = Period;
            }
            this.data.EstimatedDetails.push(datum);
          }
          this.context.orderProductionsItems.bind(this);
        });
    }
  }
}
