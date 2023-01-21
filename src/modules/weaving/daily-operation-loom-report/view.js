import {
  inject,
  Lazy,
  bindable,
  BindingEngine
} from "aurelia-framework";
import {
  Router
} from "aurelia-router";
import {
  Service
} from "./service";
import moment from 'moment';

@inject(Router, Service, BindingEngine)
export class View {

  constructor(router, service, bindingEngine) {
    this.router = router;
    this.service = service;
    this.bindingEngine = bindingEngine;
    this.data = {};
  }

  formOptions = {
    cancelText: 'Kembali',
    saveText: 'Simpan',
  };

  beamProductsColumns = [{
    value: "BeamNumber",
    header: "No. Beam"
  }, {
    value: "MachineNumber",
    header: "No. Mesin"
  }, {
    value: "LatestBeamProductDate",
    header: "Tanggal"
  }, {
    value: "LatestBeamProductTime",
    header: "Waktu"
  }, {
    value: "LoomProcess",
    header: "Proses"
  }, {
    value: "BeamProductStatus",
    header: "Status Beam"
  }];

  historiesColumns = [{
      value: "BeamNumber",
      header: "No. Beam"
    },
    {
      value: "OperatorName",
      header: "Operator"
    },
    {
      value: "LoomOperatorGroup",
      header: "Grup"
    },
    {
      value: "DateMachine",
      header: "Tanggal"
    },
    {
      value: "TimeMachine",
      header: "Waktu"
    }, {
      value: "Shift",
      header: "Shift"
    },
    {
      value: "WarpBrokenThreads",
      header: "Putus Lusi"
    },
    {
      value: "WeftBrokenThreads",
      header: "Putus Pakan"
    },
    {
      value: "LenoBrokenThreads",
      header: "Putus Leno"
    },
    {
      value: "Reprocess",
      header: "Reproses Ke"
    },
    {
      value: "Information",
      header: "Informasi"
    },
    {
      value: "MachineStatus",
      header: "Status Mesin"
    }
  ];

  async activate(params) {
    var Id = params.Id;
    var dataResult;
    this.data = await this.service
      .getById(Id)
      .then(result => {
        dataResult = result;
        return this.service.getUnitById(result.WeavingUnitId);
      })
      .then(unit => {
        dataResult.WeavingDocument = unit;
        dataResult.WeavingUnitName = unit.Name;
        return dataResult;
      });

    if (this.data.Id) {
      this.BeamProducts = this.data.DailyOperationLoomBeamProducts;
      this.Histories = this.data.DailyOperationLoomBeamHistories;
    }
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

  cancelCallback(event) {
    this.router.navigateToRoute('list');
  }
}
