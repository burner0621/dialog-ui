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
var LoomBeamsUsedLoader = require("../../../loader/weaving-loom-beams-used-loader");
var LoomBeamsUsedProcessedLoader = require("../../../loader/weaving-loom-beams-used-processed-loader");
var OperatorLoader = require("../../../loader/weaving-operator-loader");

@inject(Router, Service, BindingEngine)
export class Update {
  @bindable StartLoomBeamDocument;
  @bindable StartTime;
  @bindable ReprocessLoomBeamDocument;
  @bindable ReprocessTime;
  @bindable ProduceGreigeLoomBeamDocument;
  @bindable ProduceGreigeTime;

  constructor(router, service, bindingEngine) {
    this.router = router;
    this.service = service;
    this.bindingEngine = bindingEngine;
    this.data = {};

    this.isStartDisabled = false;
    this.isReprocessDisabled = false;
    this.isProduceGreigeDisabled = false;

    this.isTying = false;
  }

  formOptions = {
    cancelText: 'Kembali',
    saveText: 'Simpan',
  };

  beamsUsedColumns = [{
    value: "BeamOrigin",
    header: "Asal Beam"
  }, {
    value: "BeamNumber",
    header: "No. Beam"
  }, {
    value: "StartCounter",
    header: "CounterAwal"
  }, {
    value: "FinishCounter",
    header: "Counter Akhir"
  }, {
    value: "MachineSpeed",
    header: "Kecepatan Mesin"
  }, {
    value: "SCMPX",
    header: "SCMPX"
  }, {
    value: "Efficiency",
    header: "Efisiensi"
  }, {
    value: "F",
    header: "F"
  }, {
    value: "W",
    header: "W"
  }, {
    value: "L",
    header: "L"
  }, {
    value: "T",
    header: "T"
  }, {
    value: "UomUnit",
    header: "Satuan"
  }, {
    value: "BeamUsedStatus",
    header: "Status Beam"
  }];

  historiesColumns = [{
      value: "BeamNumber",
      header: "No. Beam"
    },
    {
      value: "TyingMachineNumber",
      header: "Mesin Tying"
    },
    {
      value: "TyingOperatorName",
      header: "Operator Tying"
    },
    {
      value: "TyingGrup",
      header: "Grup Tying"
    },
    {
      value: "LoomMachineNumber",
      header: "Mesin Loom"
    }, {
      value: "LoomOperatorName",
      header: "Operator Loom"
    },
    {
      value: "LoomGrup",
      header: "Grup Loom"
    },
    {
      value: "CounterPerOperator",
      header: "Counter Per Operator"
    },
    {
      value: "DateMachine",
      header: "Tanggal"
    },
    {
      value: "TimeMachine",
      header: "Jam"
    },
    {
      value: "ShiftName",
      header: "Shift"
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

  reprocessItems = ["", "Sizing", "Reaching"];

  async activate(params) {
    var Id = params.Id;
    this.data = await this.service
      .getById(Id);

    if (this.data.Id) {
      this.OperationIdFilter = {
        "LoomOperationId": this.data.Id
      };

      this.Histories = this.data.DailyOperationLoomBeamHistories;
      let isOnProcessBeam = (this.Histories.indexOf('ON-PROCESS-BEAM') > -1);

      this.BeamsUsed = this.data.DailyOperationLoomBeamsUsed;
      var isAllBeamProcessed = 0;
      this.BeamsUsed.forEach(beamUsed => {
        if (beamUsed.BeamUsedStatus == "COMPLETED") {
          isAllBeamProcessed++;
        }
      });

      // if (isOnProcessBeam === true) {
      //   if (isAllBeamProcessed === this.data.BeamProcessed) {
      //     this.isStartDisabled = false;
      //     this.isReprocessDisabled = false;
      //     this.isProduceGreigeDisabled = false;
      //     console.log("true, ga ada yg diproses gan");
      //   } else {
      //     this.isStartDisabled = true;
      //     this.isReprocessDisabled = false;
      //     this.isProduceGreigeDisabled = false;
      //     console.log("true, masih ada yg diproses gan");
      //   }
      // } else {
      //   console.log("false gan");
      //   this.isStartDisabled = false;
      //   this.isReprocessDisabled = true;
      //   this.isProduceGreigeDisabled = true;
      // }
    }
  }

  get operators() {
    return OperatorLoader;
  }

  get loomBeamsUsed() {
    return LoomBeamsUsedLoader;
  }

  get loomBeamsUsedProcessed() {
    return LoomBeamsUsedProcessedLoader;
  }

  start() {
    // console.log("StartLoomBeamDocument :", this.StartLoomBeamDocument);
    // console.log("StartTyingOperator :", this.StartTyingOperator);
    // console.log("StartLoomOperator :", this.StartLoomOperator);
    // console.log("StartDate :", this.StartDate);
    // console.log("StartTime :", this.StartTime);
    // console.log("StartShift :", this.StartShift);
    this.StartLoomBeamDocument = null;
    this.StartTyingOperator = undefined;
    this.StartLoomOperator = undefined;
    this.StartDate = undefined;
    this.StartTime = null;
    this.StartShift = undefined;

    if (this.showHideStartMenu === true) {
      this.showHideStartMenu = false;
    } else {
      this.showHideStartMenu = true;
      this.showHideReprocessMenu = false;
      this.showHideProduceGreigeMenu = false;
    }
  }

  StartTimeChanged(newValue) {
    this.service.getShiftByTime(newValue)
      .then(result => {
        this.error.StartShift = "";
        this.StartShift = {};
        this.StartShift = result;
      })
      .catch(e => {
        this.StartShift = {};
        this.error.StartShift = " Shift tidak ditemukan ";
      });
  }

  async StartLoomBeamDocumentChanged(newValue) {
    console.log(newValue);
    if (newValue.Id) {
      this.StartLoomMachine = newValue.LoomMachineNumber;
      if (newValue.BeamOrigin === "TYING") {
        this.isTying = true;
        this.StartTyingMachine = newValue.TyingMachineNumber;
        this.StartTyingOperator = await this.service
          .getOperatorById(newValue.TyingOperatorId);
      }
    }
  }

  saveStart() {
    this.error = {};
    var IdContainer = this.data.Id;
    var StartBeamIdContainer;
    var StartBeamNumberContainer;
    var StartTyingOperatorIdContainer;
    var StartTyingOperatorNameContainer;
    var StartLoomOperatorIdContainer;
    var StartDateContainer;
    var StartTimeContainer;
    var StartShiftIdContainer;

    if (this.StartLoomBeamDocument) {
      StartBeamIdContainer = this.StartLoomBeamDocument.BeamDocumentId;
      StartBeamNumberContainer = this.StartLoomBeamDocument.BeamNumber;
    }
    if (this.StartTyingOperator) {
      StartTyingOperatorIdContainer = this.StartTyingOperator.Id;
      StartTyingOperatorNameContainer = this.StartTyingOperator.Username;
    }
    if (this.StartLoomOperator) {
      StartLoomOperatorIdContainer = this.StartLoomOperator.Id;
    }
    if (this.StartDate) {
      StartDateContainer = moment(this.StartDate).utcOffset("+07:00").format();
    }
    if (this.StartTime) {
      StartTimeContainer = this.StartTime;
    }
    if (this.StartShift) {
      StartShiftIdContainer = this.StartShift.Id;
    }

    var startData = {};
    startData.Id = IdContainer;
    startData.StartBeamUsedId = StartBeamIdContainer;
    startData.StartBeamUsedNumber = StartBeamNumberContainer;
    startData.StartTyingOperatorDocumentId = StartTyingOperatorIdContainer;
    startData.StartTyingOperatorName = StartTyingOperatorNameContainer;
    startData.StartLoomOperatorDocumentId = StartLoomOperatorIdContainer;
    startData.StartDate = StartDateContainer;
    startData.StartTime = StartTimeContainer;
    startData.StartShiftDocumentId = StartShiftIdContainer;

    this.service
      .updateStart(startData.Id, startData)
      .then(result => {
        location.reload();
      })
      .catch(e => {
        this.error = e;
      });
  }

  reprocess() {
    // console.log("ReprocessLoomBeamDocument :", this.ReprocessLoomBeamDocument);
    // console.log("ReprocessTyingOperator :", this.ReprocessTyingOperator);
    // console.log("ReprocessLoomOperator :", this.ReprocessLoomOperator);
    // console.log("ReprocessDate :", this.ReprocessDate);
    // console.log("ReprocessTime :", this.ReprocessTime);
    // console.log("ReprocessShift :", this.ReprocessShift);
    // console.log("Information :", this.Information);
    this.ReprocessLoomBeamDocument = null;
    this.ReprocessTyingOperator = undefined;
    this.ReprocessLoomOperator = undefined;
    this.ReprocessDate = undefined;
    this.ReprocessTime = null;
    this.ReprocessShift = undefined;
    this.Information = undefined;

    if (this.showHideReprocessMenu === true) {
      this.showHideReprocessMenu = false;
    } else {
      this.showHideStartMenu = false;
      this.showHideReprocessMenu = true;
      this.showHideProduceGreigeMenu = false;
    }
  }

  ReprocessTimeChanged(newValue) {
    this.service.getShiftByTime(newValue)
      .then(result => {
        this.error.ReprocessShift = "";
        this.ReprocessShift = {};
        this.ReprocessShift = result;
      })
      .catch(e => {
        this.ReprocessShift = {};
        this.error.ReprocessShift = " Shift tidak ditemukan ";
      });
  }

  async ReprocessLoomBeamDocumentChanged(newValue) {
    console.log(newValue);
    if (newValue.Id) {
      this.ReprocessLoomMachine = newValue.LoomMachineNumber;
      if (newValue.BeamOrigin === "TYING") {
        this.isTying = true;
        this.ReprocessTyingMachine = newValue.TyingMachineNumber;
        this.ReprocessTyingOperator = await this.service
          .getOperatorById(newValue.TyingOperatorId);
      }
    }
  }

  saveReprocess() {
    this.error = {};
    var IdContainer = this.data.Id;
    var ReprocessBeamIdContainer;
    var ReprocessBeamNumberContainer;
    var ReprocessTyingOperatorIdContainer;
    var ReprocessTyingOperatorNameContainer;
    var ReprocessLoomOperatorIdContainer;
    var ReprocessDateContainer;
    var ReprocessTimeContainer;
    var ReprocessShiftIdContainer;
    var InformationContainer;

    if (this.ReprocessLoomBeamDocument) {
      ReprocessBeamIdContainer = this.ReprocessLoomBeamDocument.BeamDocumentId;
      ReprocessBeamNumberContainer = this.ReprocessLoomBeamDocument.BeamNumber;
    }
    if (this.ReprocessTyingOperator) {
      ReprocessTyingOperatorIdContainer = this.ReprocessTyingOperator.Id;
      ReprocessTyingOperatorNameContainer = this.ReprocessTyingOperator.Username;
    }
    if (this.ReprocessLoomOperator) {
      ReprocessLoomOperatorIdContainer = this.ReprocessLoomOperator.Id;
    }
    if (this.ReprocessDate) {
      ReprocessDateContainer = moment(this.ReprocessDate).utcOffset("+07:00").format();
    }
    if (this.ReprocessTime) {
      ReprocessTimeContainer = this.ReprocessTime;
    }
    if (this.ReprocessShift) {
      ReprocessShiftIdContainer = this.ReprocessShift.Id;
    }
    if (this.Information) {
      InformationContainer = this.Information;
    }

    var reprocessData = {};
    reprocessData.Id = IdContainer;
    reprocessData.ReprocessBeamUsedId = ReprocessBeamIdContainer;
    reprocessData.ReprocessBeamUsedNumber = ReprocessBeamNumberContainer;
    reprocessData.ReprocessTyingOperatorDocumentId = ReprocessTyingOperatorIdContainer;
    reprocessData.ReprocessTyingOperatorName = ReprocessTyingOperatorNameContainer;
    reprocessData.ReprocessLoomOperatorDocumentId = ReprocessLoomOperatorIdContainer;
    reprocessData.ReprocessDate = ReprocessDateContainer;
    reprocessData.ReprocessTime = ReprocessTimeContainer;
    reprocessData.ReprocessShiftDocumentId = ReprocessShiftIdContainer;
    reprocessData.InformationContainer = InformationContainer;

    this.service
      .updateReprocess(reprocessData.Id, reprocessData)
      .then(result => {
        location.reload();
      })
      .catch(e => {
        this.error = e;
      });
  }

  produceGreige() {
    // console.log("ProduceGreigeLoomBeamDocument :", this.ProduceGreigeLoomBeamDocument);
    // console.log("ProduceGreigeTyingOperator :", this.ProduceGreigeTyingOperator);
    // console.log("ProduceGreigeLoomOperator :", this.ProduceGreigeLoomOperator);
    // console.log("ProduceGreigeDate :", this.ProduceGreigeDate);
    // console.log("ProduceGreigeTime :", this.ProduceGreigeTime);
    // console.log("ProduceGreigeShift :", this.ProduceGreigeShift);
    // console.log("ProduceGreigeCounter :", this.ProduceGreigeCounter);
    // console.log("ProduceGreigeUomDocument :", this.ProduceGreigeUomDocument);
    // console.log("ProduceGreigeMachineSpeed :", this.ProduceGreigeMachineSpeed);
    // console.log("ProduceGreigeSCMPX :", this.ProduceGreigeSCMPX);
    // console.log("ProduceGreigeEfficiency :", this.ProduceGreigeEfficiency);
    // console.log("ProduceGreigeF :", this.ProduceGreigeF);
    // console.log("ProduceGreigeW :", this.ProduceGreigeW);
    // console.log("ProduceGreigeL :", this.ProduceGreigeL);
    // console.log("ProduceGreigeT :", this.ProduceGreigeT);
    // console.log("ProduceGreigeIsCompletedProduction :", this.ProduceGreigeIsCompletedProduction);
    this.ProduceGreigeLoomBeamDocument = null;
    this.ProduceGreigeTyingOperator = undefined;
    this.ProduceGreigeLoomOperator = undefined;
    this.ProduceGreigeDate = undefined;
    this.ProduceGreigeTime = null;
    this.ProduceGreigeShift = undefined;
    this.ProduceGreigeCounter = 0;
    this.ProduceGreigeUomDocument = undefined;
    this.ProduceGreigeMachineSpeed = 0;
    this.ProduceGreigeSCMPX = 0;
    this.ProduceGreigeEfficiency = 0;
    this.ProduceGreigeF = 0;
    this.ProduceGreigeW = 0;
    this.ProduceGreigeL = 0;
    this.ProduceGreigeT = 0;
    this.ProduceGreigeIsCompletedProduction = undefined;
    if (this.showHideProduceGreigeMenu === true) {
      this.showHideProduceGreigeMenu = false;
    } else {
      this.showHideStartMenu = false;
      this.showHideReprocessMenu = false;
      this.showHideProduceGreigeMenu = true;
    }
  }

  ProduceGreigeTimeChanged(newValue) {
    this.service.getShiftByTime(newValue)
      .then(result => {
        this.error.ProduceGreigeShift = "";
        this.ProduceGreigeShift = {};
        this.ProduceGreigeShift = result;
      })
      .catch(e => {
        this.ProduceGreigeShift = {};
        this.error.ProduceGreigeShift = " Shift tidak ditemukan ";
      });
  }

  saveProduceGreige() {    
    this.error = {};
    var IdContainer = this.data.Id;
    var ProduceGreigeBeamIdContainer;
    var ProduceGreigeBeamNumberContainer;
    var ProduceGreigeTyingOperatorIdContainer;
    var ProduceGreigeTyingOperatorNameContainer;
    var ProduceGreigeLoomOperatorIdContainer;
    var ProduceGreigeDateContainer;
    var ProduceGreigeTimeContainer;
    var ProduceGreigeShiftIdContainer;
    var ProduceGreigeCounterContainer;
    var ProduceGreigeUomDocumentIdContainer;
    var ProduceGreigeUomUnitContainer;
    var ProduceGreigeMachineSpeedContainer;
    var ProduceGreigeSCMPXContainer;
    var ProduceGreigeEfficiencyContainer;
    var ProduceGreigeFContainer;
    var ProduceGreigeWContainer;
    var ProduceGreigeLContainer;
    var ProduceGreigeTContainer;
    var ProduceGreigeIsCompletedProductionContainer;

    if (this.ProduceGreigeLoomBeamDocument) {
      ProduceGreigeBeamIdContainer = this.ProduceGreigeLoomBeamDocument.BeamDocumentId;
      ProduceGreigeBeamNumberContainer = this.ProduceGreigeLoomBeamDocument.BeamNumber;
    }
    if (this.ProduceGreigeTyingOperator) {
      ProduceGreigeTyingOperatorIdContainer = this.ProduceGreigeTyingOperator.Id;
      ProduceGreigeTyingOperatorNameContainer = this.ProduceGreigeTyingOperator.Username;
    }
    if (this.ProduceGreigeLoomOperator) {
      ProduceGreigeLoomOperatorIdContainer = this.ProduceGreigeLoomOperator.Id;
    }
    if (this.ProduceGreigeDate) {
      ProduceGreigeDateContainer = moment(this.ProduceGreigeDate).utcOffset("+07:00").format();
    }
    if (this.ProduceGreigeTime) {
      ProduceGreigeTimeContainer = this.ProduceGreigeTime;
    }
    if (this.ProduceGreigeShift) {
      ProduceGreigeShiftIdContainer = this.ProduceGreigeShift.Id;
    }
    if (this.ProduceGreigeCounter) {
      ProduceGreigeCounterContainer = this.ProduceGreigeCounter;
    }
    if (this.ProduceGreigeUomDocument) {
      ProduceGreigeUomDocumentIdContainer = this.ProduceGreigeUomDocument.Id;
    }
    if (this.ProduceGreigeUomUnit) {
      ProduceGreigeUomUnitContainer = this.ProduceGreigeUomUnit;
    }
    if (this.ProduceGreigeMachineSpeed) {
      ProduceGreigeMachineSpeedContainer = this.ProduceGreigeMachineSpeed;
    }
    if (this.ProduceGreigeSCMPX) {
      ProduceGreigeSCMPXContainer = this.ProduceGreigeSCMPX;
    }
    if (this.ProduceGreigeEfficiency) {
      ProduceGreigeEfficiencyContainer = this.ProduceGreigeEfficiency;
    }
    if (this.ProduceGreigeF) {
      ProduceGreigeFContainer = this.ProduceGreigeF;
    }
    if (this.ProduceGreigeW) {
      ProduceGreigeWContainer = this.ProduceGreigeW;
    }
    if (this.ProduceGreigeL) {
      ProduceGreigeLContainer = this.ProduceGreigeL;
    }
    if (this.ProduceGreigeT) {
      ProduceGreigeTContainer = this.ProduceGreigeT;
    }
    if (this.ProduceGreigeIsCompletedProduction) {
      ProduceGreigeIsCompletedProductionContainer = this.ProduceGreigeIsCompletedProduction;
    }

    var produceGreigeData = {};
    produceGreigeData.Id = IdContainer;
    produceGreigeData.ProduceGreigeBeamUsedId = ProduceGreigeBeamIdContainer;
    produceGreigeData.ProduceGreigeBeamUsedNumber = ProduceGreigeBeamNumberContainer;
    produceGreigeData.ProduceGreigeTyingOperatorDocumentId = ProduceGreigeTyingOperatorIdContainer;
    produceGreigeData.ProduceGreigeTyingOperatorName = ProduceGreigeTyingOperatorNameContainer;
    produceGreigeData.ProduceGreigeLoomOperatorDocumentId = ProduceGreigeLoomOperatorIdContainer;
    produceGreigeData.ProduceGreigeDate = ProduceGreigeDateContainer;
    produceGreigeData.ProduceGreigeTime = ProduceGreigeTimeContainer;
    produceGreigeData.ProduceGreigeShiftDocumentId = ProduceGreigeShiftIdContainer;
    produceGreigeData.ProduceGreigeCounter = ProduceGreigeCounterContainer;
    produceGreigeData.ProduceGreigeUomDocumentId = ProduceGreigeUomDocumentIdContainer;
    produceGreigeData.ProduceGreigeUomUnit = ProduceGreigeUomUnitContainer;
    produceGreigeData.ProduceGreigeMachineSpeed = ProduceGreigeMachineSpeedContainer;
    produceGreigeData.ProduceGreigeSCMPX = ProduceGreigeSCMPXContainer;
    produceGreigeData.ProduceGreigeEfficiency = ProduceGreigeEfficiencyContainer;
    produceGreigeData.ProduceGreigeF = ProduceGreigeFContainer;
    produceGreigeData.ProduceGreigeW = ProduceGreigeWContainer;
    produceGreigeData.ProduceGreigeL = ProduceGreigeLContainer;
    produceGreigeData.ProduceGreigeT = ProduceGreigeTContainer;
    produceGreigeData.ProduceGreigeIsCompletedProduction = ProduceGreigeIsCompletedProductionContainer;

    this.service
      .updateProduceGreige(produceGreigeData.Id, produceGreigeData)
      .then(result => {
        location.reload();
      })
      .catch(e => {
        this.error = e;
      });
  }

  cancelCallback(event) {
    this.router.navigateToRoute('list');
  }
}
