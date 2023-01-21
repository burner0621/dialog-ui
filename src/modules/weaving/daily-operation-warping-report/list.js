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
var MaterialTypeLoader = require("../../../loader/weaving-material-type-loader");

@inject(Router, Service)
export class List {
  @bindable StartDatePeriod;
  @bindable EndDatePeriod;

  constructor(router, service) {
    this.service = service;
    this.router = router;
    this.error = {};
  }

  listDataFlag = false;

  operationStatusItems = ["", "PROCESSING", "FINISH"];

  columns = [{
    field: "OrderProductionNumber",
    title: "No. Order Produksi"
  }, {
    field: "ConstructionNumber",
    title: "No. Konstruksi"
  }, {
    field: "WeavingUnit",
    title: "Unit Weaving"
  }, {
    field: "MaterialType",
    title: "Jenis Material"
  }, {
    field: "AmountOfCones",
    title: "Jumlah Cone"
  }, {
    field: "OperatorName",
    title: "Operator"
  }, {
    field: "WarpingOperatorGroup",
    title: "Grup Warping"
  }, {
    field: "PreparationDate",
    title: "Tanggal Pasang"
  }, {
    field: "LastModifiedTime",
    title: "Waktu Terakhir Diubah"
  }, {
    field: "Shift",
    title: "Shift"
  }, ];

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

  loader = info => {
    let order = {};
    if (info.sort) order[info.sort] = info.order;

    if (this.OrderProduction) {
      var OrderProductionIdContainer = this.OrderProduction.Id;
    }
    if (this.MaterialType) {
      var MaterialTypeIdContainer = this.MaterialType.Id;
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
      orderId: OrderProductionIdContainer,
      materialId: MaterialTypeIdContainer,
      operationStatus: OperationStatusContainer,
      unitId: WeavingUnitIdContainer,
      dateFrom: StartDatePeriodContainer,
      dateTo: EndDatePeriodContainer,

      page: parseInt(info.offset / info.limit, 10) + 1,
      size: info.limit,
      keyword: info.search,
      order: order
    };

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

  get orders() {
    return OrderLoader;
  }

  get units() {
    return UnitLoader;
  }

  get materialTypes() {
    return MaterialTypeLoader;
  }

  searchDailyOperationWarpings() {
    this.listDataFlag = true;

    this.dailyOperationWarpingsTable.refresh();
  }

  reset() {
    this.listDataFlag = false;

    this.StartDatePeriod = undefined;
    this.EndDatePeriod = undefined;
    this.OrderProduction = undefined;
    this.WeavingUnit = undefined;
    this.MaterialType = undefined;
    this.OperationStatus = null;

    this.StartDatePeriodContainer = undefined;
    this.EndDatePeriodContainer = undefined;
    this.OrderProductionIdContainer = undefined;
    this.WeavingUnitIdContainer = undefined;
    this.MaterialTypeIdContainer = undefined;
    this.OperationStatusContainer = null;

    this.dailyOperationWarpingsTable.refresh();
  }

  exportToExcel() {
    var OrderProductionContainer = this.OrderProduction;
    var MaterialTypeContainer = this.MaterialType;
    var OperationStatusContainer = this.OperationStatus;
    var WeavingUnitContainer = this.WeavingUnit;
    var StartDatePeriodContainer = this.StartDatePeriod ? moment(this.StartDatePeriod).format("DD MMM YYYY HH:mm") : null;
    var EndDatePeriodContainer = this.EndDatePeriod ? moment(this.EndDatePeriod).format("DD MMM YYYY HH:mm") : null;

    return this.listDataFlag ? this.service.getReportXls(OrderProductionContainer, MaterialTypeContainer, OperationStatusContainer, WeavingUnitContainer, StartDatePeriodContainer, EndDatePeriodContainer).then(result => {
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
