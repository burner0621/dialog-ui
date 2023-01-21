import { inject, bindable } from "aurelia-framework";
import { Service } from "./service";
import { Router } from "aurelia-router";
var moment = require("moment");
var UnitLoader = require("../../../loader/unit-loader");

@inject(Router, Service)
export class List {
  @bindable PeriodTypes;
  @bindable AllShift;

  constructor(router, service) {
    this.service = service;
    this.router = router;
    this.periodDay = false;
    this.periodMonth = false;
    this.AllShift = false;
    this.shiftElement = true;
    // this.data = {};
  }

  tableOptions = {
    search: false,
    showToggle: false,
    showColumns: false,
    pagination: false
  };

  controlOptions = {
    control: {
      length: 12
    }
  };

  columns = [
    { title: "No. SPP", field: "ConstructionNumber", valign: "middle" },
    {
      title: "Jenis Benang",
      field: "YarnType",
      valign: "middle"
    },
    {
      title: "CMPX",
      field: "CMPX",
      valign: "middle"
    },
    { title: "Frame", field: "Frame", valign: "middle" },
    { title: "Produksi Meter", field: "ProductionLength", valign: "middle" },
    {
      title: "Komposisi Pakan (%)",
      field: "ProductionLength",
      valign: "middle"
    },
    { title: "100% Produksi", field: "CompleteProduction", valign: "middle" },
    {
      title: "EFF",
      field: "EFF",
      valign: "middle"
    },
    {
      title: "EFF MC",
      field: "EFFMC",
      valign: "middle"
    },
    {
      title: "Fill",
      field: "Fill",
      valign: "middle"
    },
    {
      title: "Wrap",
      field: "Wrap",
      valign: "middle"
    }
  ];

  periodTypes = ["", "Harian", "Bulanan"];

  periodByDay() {
    if (this.periodDay === true) {
      this.periodDay = false;
    } else {
      this.periodDay = true;
      this.periodMonth = false;
    }
  }

  periodByMonth() {
    if (this.periodMonth === true) {
      this.periodMonth = false;
    } else {
      this.periodMonth = true;
      this.periodDay = false;
    }
  }

  AllShiftChanged() {
    if (this.AllShift === false) {
      this.shiftElement = true;
    } else {
      this.shiftElement = false;
    }
  }

  // loader = info => {
  //   var order = {};
  //   if (info.sort) order[info.sort] = info.order;

  //   var arg = {
  //     page: parseInt(info.offset / info.limit, 10) + 1,
  //     size: info.limit,
  //     keyword: info.search,
  //     order: order
  //   };

  //   return this.service.search(arg).then(result => {
  //     return {
  //       total: result.info.total,
  //       data: result.data
  //     };
  //   });
  // };

  // listDataFlag = false;

  // getYear(now) {
  //   var year = moment(now).format("YYYY");
  //   return year;
  // }

  // getMonth(now) {
  //   var month = moment(now).format("MMMM");
  //   return month;
  // }

  // get units() {
  //   return UnitLoader;
  // }

  // printPdf() {
  //   var Month;
  //   var Year;
  //   var UnitName;
  //   var UnitId;

  //   if (this.data) {
  //     Month = this.getMonth(this.data.Period);
  //     Year = this.getYear(this.data.Period);
  //     UnitName = this.data.Unit.Name;
  //     UnitId = this.data.Unit.Id;
  //   } else {
  //     Month = this.getMonth(new Date());
  //     Year = this.getYear(new Date());
  //     UnitName = "";
  //     UnitId = 0;
  //   }

  //   this.service.getPdfByPeriod(Month, Year, UnitName, UnitId);
  // }

  // loader = info => {
  //   this.info = {};
  //   var Month;
  //   var Year;
  //   var UnitName;
  //   var UnitId;

  //   if (this.data) {
  //     Month = this.getMonth(this.data.Period);
  //     Year = this.getYear(this.data.Period);
  //     UnitName = this.data.Unit.Name;
  //     UnitId = this.data.Unit.Id;
  //   } else {
  //     Month = this.getMonth(new Date());
  //     Year = this.getYear(new Date());
  //     UnitName = "";
  //     UnitId = 0;
  //   }

  //   return this.listDataFlag
  //     ? this.service.searchSOP(Month, Year, UnitName, UnitId).then(result => {
  //         return {
  //           data: result.data,
  //           total: result.data.length
  //         };
  //       })
  //     : { total: 0, data: {} };
  // };

  // searchOrderProductions() {
  //   this.listDataFlag = true;

  //   this.orderProductionsTable.refresh();
  // }

  // reset() {
  //   this.listDataFlag = false;
  //   this.Month = null;
  //   this.Year = null;
  //   this.UnitName = null;
  //   this.UnitId = null;
  //   this.orderProductionsTable.refresh();
  // }
}
