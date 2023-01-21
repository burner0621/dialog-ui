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

let UnitLoader = require('../../../loader/unit-loader');
let MachineLoader = require('../../../loader/weaving-machine-loader');

@inject(Router, Service)
export class List {
  constructor(router, service) {
    this.service = service;
    this.router = router;
  }

  listDataFlag = false;

  blocks = ["", "A", "B", "C", "D", "E", "F"];

  columns = [{
    field: "WeavingUnit",
    title: "Unit Weaving"
  }, {
    field: "MachineNumber",
    title: "No. Mesin"
  }, {
    field: "Area",
    title: "Area"
  }, {
    field: "Block",
    title: "Blok"
  }, {
    field: "KaizenBlock",
    title: "Blok Kaizen"
  }, {
    field: "Location",
    title: "Lokasi"
  }, {
    field: "Maintenance",
    title: "Maintenance"
  }, {
    field: "OperatorName",
    title: "Operator"
  }, ];

  controlOptions = {
    label: {
      length: 4
    },
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
    if (info.sort) order[info.sort] = info.order

    if (this.WeavingUnit) {
      var WeavingUnitIdContainer = this.WeavingUnit.Id;
    }
    if (this.MachineDocument) {
      var MachineDocumentIdContainer = this.MachineDocument.Id;
    }
    if (this.Block) {
      var BlockContainer = this.Block;
    }

    var arg = {
      machineId: MachineDocumentIdContainer,
      block: BlockContainer,
      unitId: WeavingUnitIdContainer,

      page: parseInt(info.offset / info.limit, 10) + 1,
      size: info.limit,
      keyword: info.search,
      order: order
    };

    return this.listDataFlag ? this.service.getReportData(arg).then(result => {
      return {
        data: result.data,
        total: result.info.count
      };
    }) : {
      data: {},
      total: 0
    };
  }

  get units() {
    return UnitLoader;
  }

  get machines() {
    return MachineLoader;
  }

  searchMachinePlannings() {
    this.listDataFlag = true;

    this.machinePlanningReportsTable.refresh();
  }

  reset() {
    this.listDataFlag = false;

    this.WeavingUnit = null;
    this.MachineDocument = undefined;
    this.Block = "";

    this.WeavingUnitIdContainer = null;
    this.MachineDocumentIdContainer = null;
    this.BlockContainer = null;

    this.machinePlanningReportsTable.refresh();
  }

  exportToExcel() {
    if (this.WeavingUnit) {
      var WeavingUnitContainer = this.WeavingUnit;
    }
    if (this.MachineDocument) {
      var MachineDocumentContainer = this.MachineDocument;
    }
    if (this.Block) {
      var BlockContainer = this.Block;
    }

    return this.listDataFlag ? this.service.getReportXls(MachineDocumentContainer, BlockContainer, WeavingUnitContainer).then(result => {
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
