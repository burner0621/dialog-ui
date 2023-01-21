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

@inject(Router, Service)
export class List {

  constructor(router, service) {
    this.service = service;
    this.router = router;
  }

  context = ["detail"];

  listDataFlag = false;

  columns = [{
    field: "WeavingUnit",
    title: "Unit Weaving"
  }, {
    field: "OrderProductionNumber",
    title: "No. SOP"
  }, {
    field: "ProductionResultDate",
    title: "Tanggal"
  }, {
    field: "Shift",
    title: "Shift"
  }, {
    field: "MachineNumber",
    title: "No. Mesin"
  }, {
    field: "Production",
    title: "Produksi"
  }, {
    field: "SCMPX",
    title: "S/CMPX"
  }, {
    field: "Efficiency",
    title: "Eff"
  }, {
    field: "MachineSpeed",
    title: "RPM"
  }, {
    field: "WeftBrokenThreads",
    title: "F"
  }, {
    field: "WarpBrokenThreads",
    title: "W"
  }, {
    field: "BrokenThreadsTotal",
    title: "T"
  }, {
    field: "LostTime",
    title: "L"
  }, {
    field: "ProductionTime",
    title: "H"
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

    if (this.OrderProduction) {
      var OrderProductionIdContainer = this.OrderProduction.Id;
    }
    if (this.FabricConstruction) {
      var FabricConstructionContainer = this.FabricConstruction.Id;
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
      constructionId: FabricConstructionContainer,
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

          datum.PreparationDateMachine = InstallationDate;
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

  get constructions() {
    return ConstructionLoader;
  }

  get units() {
    return UnitLoader;
  }

  searchDailyOperationLooms() {
    this.listDataFlag = true;

    this.productionResultsTable.refresh();
  }

  reset() {
    this.listDataFlag = false;

    this.OrderProduction = undefined;
    this.FabricConstruction = undefined;
    this.OperationStatus = null;
    this.WeavingUnit = undefined;
    this.StartDatePeriod = undefined;
    this.EndDatePeriod = undefined;

    this.OrderProductionContainer = undefined;
    this.FabricConstructionContainer = undefined;
    this.OperationStatusContainer = null;
    this.WeavingUnitContainer = undefined;
    this.StartDatePeriodContainer = undefined;
    this.EndDatePeriodContainer = undefined;

    this.productionResultsTable.refresh();
  }

  exportToExcel() {
    var OrderProductionContainer = this.OrderProduction;
    var FabricConstructionContainer = this.FabricConstruction;
    var OperationStatusContainer = this.OperationStatus;
    var WeavingUnitContainer = this.WeavingUnit;
    var StartDatePeriodContainer = this.StartDatePeriod ? moment(this.StartDatePeriod).format("DD MMM YYYY HH:mm") : null;
    var EndDatePeriodContainer = this.EndDatePeriod ? moment(this.EndDatePeriod).format("DD MMM YYYY HH:mm") : null;

    //Get All
    return this.listDataFlag ? this.service.getReportXls(OrderProductionContainer, FabricConstructionContainer, OperationStatusContainer, WeavingUnitContainer, StartDatePeriodContainer, EndDatePeriodContainer).then(result => {
      for (var datum of result) {
        if (datum.PreparationDate) {
          var InstallationDate = moment(datum.PreparationDate).format('DD/MM/YYYY');

          datum.PreparationDateMachine = InstallationDate;
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

  contextCallback(event) {
    var arg = event.detail;
    var data = arg.data;
    switch (arg.name) {
      case "detail":
        this.router.navigateToRoute("view", {
          Id: data.Id
        });
        break;
    }
  }
}
