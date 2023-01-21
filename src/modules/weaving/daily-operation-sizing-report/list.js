import {
  inject,
  bindable
} from 'aurelia-framework';
import {
  Service
} from "./service";
import {
  Router
} from 'aurelia-router';
import moment from 'moment';

let OrderLoader = require("../../../loader/weaving-order-loader");
let UnitLoader = require('../../../loader/unit-loader');
var MachineLoader = require("../../../loader/weaving-machine-loader");

@inject(Router, Service)
export class List {
  //   @bindable Period;

  constructor(router, service) {
    this.service = service;
    this.router = router;
  }

  listDataFlag = false;

  operationStatusItems = ["", "PROCESSING", "FINISH"];

  columns = [{
    field: "MachineNumber",
    title: "No. Mesin"
  }, {
    field: "OrderProductionNumber",
    title: "No. Order Produksi"
  }, {
    field: "ConstructionNumber",
    title: "No. Konstruksi"
  }, {
    field: "WeavingUnit",
    title: "Unit Weaving"
  }, {
    field: "RecipeCode",
    title: "Kode Resep"
  }, {
    field: "NeReal",
    title: "Ne Real"
  }, {
    field: "OperatorName",
    title: "Operator"
  }, {
    field: "SizingOperatorGroup",
    title: "Grup Sizing"
  }, {
    field: "PreparationDate",
    title: "Tanggal Pasang"
  }, {
    field: "LastModifiedTime",
    title: "Waktu Terakhir Diubah"
  }, {
    field: "Shift",
    title: "Shift"
  }, {
    field: "YarnStrands",
    title: "Total Helai Beam"
  }, {
    field: "EmptyWeight",
    title: "Total Berat Kosong"
  }];

  controlOptions = {
    label: {
      length: 4
    },
    control: {
      length: 6
    }
  }

  startPeriodOptions = {
    label: {
      length: 4
    },
    control: {
      length: 6
    }
  }

  endPeriodOptions = {
    control: {
      length: 6
    }
  }

  tableOptions = {
    search: false,
    showToggle: false,
    showColumns: false,
    pagination: true,
    sortable: true,
  }

  loader = (info) => {
    let order = {};
    if (info.sort) order[info.sort] = info.order;

    if (this.Machine) {
      var MachineIdContainer = this.Machine.Id;
    }
    if (this.OrderProduction) {
      var OrderProductionIdContainer = this.OrderProduction.Id;
    }
    if (this.OperationStatus) {
      var OperationStatusContainer = this.OperationStatus;
    }
    if (this.WeavingUnit) {
      var WeavingUnitIdContainer = this.WeavingUnit.Id;
    }
    if (this.StartDatePeriod) {
      var StartDatePeriodContainer = this.StartDatePeriod ? moment(this.StartDatePeriod).format("DD MMM YYYY HH:mm") : null;
    }
    if (this.EndDatePeriod) {
      var EndDatePeriodContainer = this.EndDatePeriod ? moment(this.EndDatePeriod).format("DD MMM YYYY HH:mm") : null;
    }

    var arg = {
      machineId: MachineIdContainer,
      orderId: OrderProductionIdContainer,
      operationStatus: OperationStatusContainer,
      unitId: WeavingUnitIdContainer,
      dateFrom: StartDatePeriodContainer,
      dateTo: EndDatePeriodContainer,

      page: parseInt(info.offset / info.limit, 10) + 1,
      size: info.limit,
      keyword: info.search,
      order: order
    };

    //Get All
    return this.listDataFlag ? this.service.getReportData(arg).then(result => {
      for (var datum of result.data) {
        if (datum.PreparationDate) {
          var InstallationDate = moment(datum.PreparationDate).format('DD/MM/YYYY');

          datum.PreparationDate = InstallationDate;
        }
      }
      return {
        data: result.data,
        total: result.info.count
      };
    }) : {
      data: {},
      total: 0
    };
  }

  // EndDatePeriodChanged(newValue) {
  //   this.error.EndDatePeriod = "";
  //   var parsedStartDate = Date.parse(this.StartDatePeriod);
  //   var parsedEndDate = Date.parse(newValue);
  //   if (this.StartDatePeriod) {
  //     if (parsedStartDate > parsedEndDate) {
  //       this.error.EndDatePeriod = "Tanggal Akhir Tidak Boleh Lebih Dahulu dari Tanggal Mulai";
  //     } else {
  //       this.error.EndDatePeriod = "";
  //     }
  //   }
  // }

  // StartDatePeriodChanged(newValue) {
  //   this.error.StartDatePeriod = "";
  //   var parsedStartDate = Date.parse(newValue);
  //   var parsedEndDate = Date.parse(this.EndDatePeriod);
  //   if (this.EndDatePeriod) {
  //     if (parsedStartDate > parsedEndDate) {
  //       this.error.StartDatePeriod = "Tanggal Mulai Tidak Boleh Lebih Lambat dari Tanggal Akhir";
  //     } else {
  //       this.error.StartDatePeriod = "";
  //     }
  //   }
  // }

  get orders() {
    return OrderLoader;
  }

  get units() {
    return UnitLoader;
  }

  get machines() {
    return MachineLoader;
  }

  searchDailyOperationSizings() {
    this.listDataFlag = true;

    this.dailyOperationSizingsTable.refresh();
  }

  reset() {
    this.listDataFlag = false;

    this.StartDatePeriod = undefined;
    this.EndDatePeriod = undefined;
    this.OrderProduction = undefined;
    this.WeavingUnit = undefined;
    this.Machine = undefined;
    this.OperationStatus = null;

    this.StartDatePeriodContainer = undefined;
    this.EndDatePeriodContainer = undefined;
    this.OrderProductionContainer = undefined;
    this.WeavingUnitContainer = undefined;
    this.MachineContainer = undefined;
    this.OperationStatusContainer = null;

    this.dailyOperationSizingsTable.refresh();
  }

  exportToExcel() {
    var OrderProductionContainer = this.OrderProduction;
    var MachineContainer = this.Machine;
    var OperationStatusContainer = this.OperationStatus;
    var WeavingUnitContainer = this.WeavingUnit;
    var StartDatePeriodContainer = this.StartDatePeriod ? moment(this.StartDatePeriod).format("DD MMM YYYY HH:mm") : null;
    var EndDatePeriodContainer = this.EndDatePeriod ? moment(this.EndDatePeriod).format("DD MMM YYYY HH:mm") : null;

    //Get All
    return this.listDataFlag ? this.service.getReportXls(MachineContainer, OrderProductionContainer, OperationStatusContainer, WeavingUnitContainer, StartDatePeriodContainer, EndDatePeriodContainer).then(result => {
      for (var datum of result) {
        if (datum.PreparationDate) {
          var InstallationDate = moment(datum.PreparationDate).format('DD/MM/YYYY');

          datum.PreparationDate = InstallationDate;
        }
      }
      return {
        data: result,
        total: length
      };
    }) : {
      data: {},
      total: 0
    };
  }
}
