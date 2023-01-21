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

const OrderLoader = require("../../../loader/weaving-order-loader");
const UnitLoader = require('../../../loader/unit-loader');
const MachineLoader = require("../../../loader/weaving-machine-loader");
const ConstructionLoader = require("../../../loader/weaving-constructions-loader");
const BeamLoader = require("../../../loader/weaving-sizing-beam-loader");

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
    field: "SizingBeamNumber",
    title: "No. Beam Sizing"
  }, {
    field: "OperatorName",
    title: "Operator"
  }, {
    field: "ReachingOperatorGroup",
    title: "Grup Reaching"
  }, {
    field: "PreparationDate",
    title: "Tanggal Pasang"
  }, {
    field: "LastModifiedTime",
    title: "Waktu Terakhir Diubah"
  }, {
    field: "Shift",
    title: "Shift"
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
    if (this.FabricConstruction) {
      var FabricConstructionContainer = this.FabricConstruction.Id;
    }
    if (this.Beam) {
      var BeamIdContainer = this.Beam.Id;
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
      constructionId: FabricConstructionContainer,
      beamId: BeamIdContainer,
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

  get orders() {
    return OrderLoader;
  }

  get units() {
    return UnitLoader;
  }

  get machines() {
    return MachineLoader;
  }

  get constructions() {
    return ConstructionLoader;
  }

  get beams() {
    return BeamLoader;
  }

  searchDailyOperationReachings() {
    this.listDataFlag = true;

    this.dailyOperationReachingsTable.refresh();
  }

  reset() {
    this.listDataFlag = false;

    this.Machine = undefined;
    this.OrderProduction = undefined;
    this.OperationStatus = null;
    this.WeavingUnit = undefined;
    this.FabricConstruction = undefined;
    this.Beam = undefined;
    this.StartDatePeriod = undefined;
    this.EndDatePeriod = undefined;

    this.MachineContainer = undefined;
    this.OrderProductionContainer = undefined;
    this.FabricConstructionContainer = undefined;
    this.BeamContainer = undefined;
    this.OperationStatusContainer = null;
    this.WeavingUnitContainer = undefined;
    this.StartDatePeriodContainer = undefined;
    this.EndDatePeriodContainer = undefined;

    this.dailyOperationReachingsTable.refresh();
  }

  exportToExcel() {
    var MachineContainer = this.Machine;
    var OrderProductionContainer = this.OrderProduction;
    var FabricConstructionContainer = this.FabricConstruction;
    var BeamContainer = this.Beam;
    var OperationStatusContainer = this.OperationStatus;
    var WeavingUnitContainer = this.WeavingUnit;
    var StartDatePeriodContainer = this.StartDatePeriod ? moment(this.StartDatePeriod).format("DD MMM YYYY HH:mm") : null;
    var EndDatePeriodContainer = this.EndDatePeriod ? moment(this.EndDatePeriod).format("DD MMM YYYY HH:mm") : null;

    //Get All
    return this.listDataFlag ? this.service.getReportXls(MachineContainer, OrderProductionContainer, FabricConstructionContainer, BeamContainer, OperationStatusContainer, WeavingUnitContainer, StartDatePeriodContainer, EndDatePeriodContainer).then(result => {
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
