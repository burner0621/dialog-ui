import {
  inject,
  bindable,
  computedFrom
} from "aurelia-framework";
import {
  callbackify
} from "util";
var ConstructionLoader = require("../../../loader/weaving-constructions-loader");
var UnitLoader = require("../../../loader/unit-loader");
var YarnOriginLoader = require("../../../loader/weaving-yarn-origin-loader");
var moment = require("moment");

export class DataForm {
  @bindable title;
  @bindable readOnly;
  @bindable Month;
  @bindable Year;
  @bindable Construction;
  @bindable Unit;
  @bindable WarpOriginOne;
  // @bindable WarpOriginTwo;
  @bindable WeftOriginOne;
  @bindable WeftOriginTwo;

  months = ["", "Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];

  years = [];

  formOptions = {
    cancelText: "Kembali",
    saveText: "Simpan",
    deleteText: "Hapus",
    editText: "Ubah"
  };

  bind(context) {
    this.context = context;
    this.data = this.context.data;
    this.error = this.context.error;
    // console.log(this.data.WeftOriginTwo)
    this.currentYearItem = parseInt(moment().format('YYYY'));
    this.minYearItem = this.currentYearItem - 10;
    this.maxYearItem = this.currentYearItem + 10;

    for (var i = parseInt(this.minYearItem); i <= parseInt(this.maxYearItem); i++) {
      this.years.push(i.toString());
    }

    if (this.data.Month) {
      this.Month = this.data.Month;
    }

    if (this.data.Year)
      this.Year = this.data.Year;

    if (this.data.Construction)
      this.Construction = this.data.Construction;

    if (this.data.WarpOriginOne) {
      this.WarpOriginOne = this.data.WarpOriginOne;
    }

    if (this.data.WeftOriginOne) {
      this.WeftOriginOne = this.data.WeftOriginOne;
    }

    // if (this.data.WarpOriginTwo) {
    //   this.WarpOriginTwo = this.data.WarpOriginTwo;
    // }

    if (this.data.WeftOriginTwo) {
      this.WeftOriginTwo = this.data.WeftOriginTwo;
    }

    if (this.data.Unit) {
      this.Unit = this.data.Unit;
    }

    this.cancelCallback = this.context.cancelCallback;
    this.deleteCallback = this.context.deleteCallback;
    this.editCallback = this.context.editCallback;
    this.saveCallback = this.context.saveCallback;
  }

  get origins() {
    return YarnOriginLoader;
  }

  get constructions() {
    return ConstructionLoader;
  }

  get units() {
    return UnitLoader;
  }

  MonthChanged(newValue) {
    var MonthInNumber = 0;
    switch (newValue) {
      case "Januari":
        MonthInNumber = 1;
        break;
      case "Februari":
        MonthInNumber = 2;
        break;
      case "Maret":
        MonthInNumber = 3;
        break;
      case "April":
        MonthInNumber = 4;
        break;
      case "Mei":
        MonthInNumber = 5;
        break;
      case "Juni":
        MonthInNumber = 6;
        break;
      case "Juli":
        MonthInNumber = 7;
        break;
      case "Agustus":
        MonthInNumber = 8;
        break;
      case "September":
        MonthInNumber = 9;
        break;
      case "Oktober":
        MonthInNumber = 10;
        break;
      case "November":
        MonthInNumber = 11;
        break;
      case "Desember":
        MonthInNumber = 12;
        break;
      default:
        MonthInNumber = 0;
        break;
    }
    this.data.Month = MonthInNumber;
  }

  YearChanged(newValue) {
    this.data.Year = parseInt(newValue);
  }

  ConstructionChanged(newValue) {
    if (newValue.Id) {
      this.data.ConstructionDocumentId = newValue.Id;

      var ConstructionNumberSplitted = newValue.ConstructionNumber.split(" ");
      var WarpCode = ConstructionNumberSplitted[ConstructionNumberSplitted.length - 2]
      var WeftCode = ConstructionNumberSplitted[ConstructionNumberSplitted.length - 1]
      var WarpWeftCode = WarpCode + " X " + WeftCode;
      this.data.YarnType = WarpWeftCode;
    }
  }

  UnitChanged(newValue) {
    if (newValue.Id) {
      this.data.UnitId = newValue.Id;
    }
  }

  WarpOriginOneChanged(newValue) {
    if (newValue.Id) {
      this.data.WarpOriginIdOne = newValue.Id;
    }
  }

  WeftOriginOneChanged(newValue) {
    
    if (newValue.Id) {
      this.data.WeftOriginIdOne = newValue.Id;
    }
  }

  // WarpOriginTwoChanged(newValue) {
  //   if (newValue.Id) {
  //     this.data.WarpOriginIdTwo = newValue.Id;
  //   }
  // }

  WeftOriginTwoChanged(newValue) {
    if (newValue.Id) {
      this.data.WeftOriginIdTwo = newValue.Id;
    }
  }
}
