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
import moment from "moment";
import _ from "underscore";
var WarpingBeamLoader = require("../../../loader/weaving-warping-beam-loader");
var OperatorLoader = require("../../../loader/weaving-operator-loader");
var UOMLoader = require("../../../loader/uom-loader");

@inject(Router, Service, BindingEngine)
export class Update {
  @bindable StartTime;
  @bindable ProduceBeamsTime;
  @bindable BeamsToProduct;

  constructor(router, service, bindingEngine) {
    this.router = router;
    this.service = service;
    this.bindingEngine = bindingEngine;

    this.data = {};
    this.error = {};
    this.error.error = {};

    this.isStartDisabled = false;
    this.isProduceBeamDisabled = false;
    this.isDoffDisabled = false;
    
  }

  uoms = [];

  formOptions = {
    cancelText: 'Kembali',
    saveText: 'Simpan',
  };

  pressRollUoms = ["", "PSA", "Kg/Cm2"]

  dailyOperationBeamProductsColumns = [{
      value: "WarpingBeamNumber",
      header: "No. Beam Warping"
    },
    {
      value: "LatestDateBeamProduct",
      header: "Tanggal"
    },
    {
      value: "LatestTimeBeamProduct",
      header: "Jam"
    },
    {
      value: "WarpingBrokenCauses",
      header: "Putus"
    },
    {
      value: "WarpingTotalBeamLength",
      header: "Total Panjang Beam"
    },
    {
      value: "Tention",
      header: "Tention"
    },
    {
      value: "MachineSpeed",
      header: "Kecepatan Mesin"
    },
    {
      value: "PressRoll",
      header: "PressRoll"
    },
    {
      value: "WarpingBeamStatus",
      header: "Status Beam Warping"
    }
  ];

  dailyOperationHistoriesColumns = [{
      value: "WarpingBeamNumber",
      header: "No. Beam Warping"
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
      value: "OperatorName",
      header: "Operator"
    },
    {
      value: "OperatorGroup",
      header: "Group"
    },
    {
      value: "WarpingBeamLengthPerOperator",
      header: "Panjang Beam Per Operator"
    },
    {
      value: "OperationStatus",
      header: "Status Mesin"
    },
    {
      value:"deleteAction",
      header:"Action"
    }
  ];

  warpingBrokenCausesColumns = [{
    value: "WarpingBrokenCause",
    header: "Penyebab Putus Benang"
  }, {
    value: "TotalBroken",
    header: "Total"
  }];

  async activate(params) {
    var Id = params.Id;

    this.data = await this.service
      .getById(Id);
    if (this.data.Id) {
      var isAllBeamProcessedFlag;
      this.BeamProducts = this.data.DailyOperationWarpingBeamProducts;
      if (this.data.BeamProductResult == this.BeamProducts.length) {
        isAllBeamProcessedFlag = true;
      } else {
        isAllBeamProcessedFlag = false;
      }

      //this section for disable or enabled mulai and produksi beam
      var beamWarpingProductFinish = [];
      for(var i =0;i<this.data.DailyOperationWarpingBeamProducts.length;i++){
        var tempBeams = this.data.DailyOperationWarpingBeamProducts[i];
        if(tempBeams.WarpingBeamStatus == "ROLLED-UP"){
          beamWarpingProductFinish.push(tempBeams);          
          }
      }

      var isFinished = this.data.OperationStatus;
      var beamSizingMustProduce = this.data.BeamProductResult;
      
      if(this.data.DailyOperationWarpingBeamProducts.length < beamSizingMustProduce)
      {
        this.isStartDisabled = false;
      }else{
        this.isStartDisabled = true;
      }

      if(beamWarpingProductFinish.length < beamSizingMustProduce && 
        this.data.DailyOperationWarpingBeamProducts.length != 0 &&
        this.data.DailyOperationWarpingBeamProducts.length != beamWarpingProductFinish.length)
        {
          this.isProduceBeamDisabled = false;
        }
        else
        {
          this.isProduceBeamDisabled = true;
        }

      // if(beamWarpingProductFinish.length == 0){
      //   this.isStartDisabled = false;
      //   this.isProduceBeamDisabled = true;
      // }else if(beamWarpingProductFinish.length < beamSizingMustProduce)
      // {
      //   this.isStartDisabled = false;
      //   this.isProduceBeamDisabled = false;
      // } 
      // else if(beamWarpingProductFinish.length == beamSizingMustProduce){
      //   if (isAllBeamProcessedFlag == true && isFinished=="FINISH") {
      //     this.isStartDisabled = true;
      //     this.isProduceBeamDisabled = true;
      //   } else {
      //     this.isStartDisabled = false;
      //     this.isProduceBeamDisabled = true;
      //   }
      // }else{
      //   this.isStartDisabled = true;
      //   this.isProduceBeamDisabled = true;
      // }


      this.Histories = this.data.DailyOperationWarpingHistories;
      // var lastWarpingHistory = this.Histories[0];
      // var lastWarpingHistoryStatus = lastWarpingHistory.MachineStatus;
      // switch (lastWarpingHistoryStatus) {
      //   case "ENTRY":
      //     this.isStartDisabled = false;
      //     this.isProduceBeamDisabled = true;
      //     break;
      //   case "START":
      //     this.isStartDisabled = true;
      //     this.isProduceBeamDisabled = false;
      //     break;
      //   case "ON-PROCESS-BEAM":
      //     this.isStartDisabled = true;
      //     this.isProduceBeamDisabled = false;
      //     break;
      //   case "COMPLETED":
      //     if (isAllBeamProcessedFlag == true) {
      //       this.isStartDisabled = true;
      //       this.isProduceBeamDisabled = true;
      //     } else {
      //       this.isStartDisabled = false;
      //       this.isProduceBeamDisabled = true;
      //     }
      //     break;
      //   default:
      //     this.isStartDisabled = false;
      //     this.isProduceBeamDisabled = false;
      //     break;
      // }
    }
    var uomItems = await this.service.getYardMeterUoms();
    this.uoms = uomItems;
    this.dataOptions = this.data;
    
    
  }

  get operators() {
    return OperatorLoader;
  }

  get beams() {
    return WarpingBeamLoader;
  }

  get beamsOnProcess(){
    var beamProcess = []
    for(var i = 0 ; i < this.data.DailyOperationWarpingBeamProducts.length ; i++ ){
      var beamWarpingProcessing = this.data.DailyOperationWarpingBeamProducts[i];
      if(beamWarpingProcessing.WarpingBeamStatus == "ON-PROCESS"){
        beamProcess.push(beamWarpingProcessing);
      }
    }
    return beamProcess
  }

  completeBeamClicked(event) {
    let targetValue = event.target.checked;

    this.Tention = 0;
    this.MachineSpeed = 0;
    this.PressRoll = 0;
    this.PressRollUom = "";

    if (targetValue) {
      this.showHideCompleteMenu = true;
    } else {
      this.showHideCompleteMenu = false;
    }
  }

  addBrokenCause = (e) => {
    this.WarpingBrokenCauses = this.WarpingBrokenCauses || [];
    this.WarpingBrokenCauses.push({});
  }

  start() {
    this.StartDate = undefined;
    this.StartTime = null;
    this.StartShift = undefined;
    this.StartOperator = undefined;
    this.StartSizingBeamDocuments = undefined;
    if (this.showHideStartMenu === true) {
      this.showHideStartMenu = false;
    } else {
      this.showHideStartMenu = true;
      this.showHideProduceBeamsMenu = false;
    }
  }

  produceBeams() {
    this.ProduceBeamsDate = undefined;
    this.ProduceBeamsTime = null;
    this.ProduceBeamsShift = undefined;
    this.ProduceBeamsOperator = undefined;
    this.WarpingBeamLengthPerOperator = 0;
    this.WarpingBeamLengthUom = "";
    if (this.showHideProduceBeamsMenu === true) {
      this.showHideProduceBeamsMenu = false;
    } else {
      this.showHideStartMenu = false;
      this.showHideProduceBeamsMenu = true;
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

  saveStart() {
    var HistoryDateContainer;
    var HistoryTimeContainer;
    var ShiftContainer;
    var OperatorContainer;
    var WarpingBeamIdContainer;
    var WarpingBeamNumberContainer;
    var WarpingBeamLengthUomIdContainer;
    var WarpingBeamLengthUomUnitContainer;

    this.error = {};

    var IdContainer = this.data.Id;
    if (this.StartDate) {
      HistoryDateContainer = moment(this.StartDate).utcOffset("+07:00").format();
    }
    if (this.StartTime) {
      HistoryTimeContainer = this.StartTime;
    }
    if (this.StartShift) {
      ShiftContainer = this.StartShift.Id;
    }
    if (this.StartOperator) {
      OperatorContainer = this.StartOperator.Id;
    }
    if (this.StartWarpingBeamDocuments) {
      WarpingBeamIdContainer = this.StartWarpingBeamDocuments.Id;
      WarpingBeamNumberContainer = this.StartWarpingBeamDocuments.Number;
    }
    if (this.WarpingBeamLengthUom) {
      WarpingBeamLengthUomIdContainer = this.WarpingBeamLengthUom.Id;
      WarpingBeamLengthUomUnitContainer = this.WarpingBeamLengthUom.Unit;
    }

    var updateStartData = {};
    updateStartData.Id = IdContainer;
    updateStartData.StartDate = HistoryDateContainer;
    updateStartData.StartTime = HistoryTimeContainer;
    updateStartData.StartShift = ShiftContainer;
    updateStartData.StartOperator = OperatorContainer;
    updateStartData.WarpingBeamId = WarpingBeamIdContainer;
    updateStartData.WarpingBeamNumber = WarpingBeamNumberContainer;
    updateStartData.WarpingBeamLengthUomId = WarpingBeamLengthUomIdContainer;
    updateStartData.WarpingBeamLengthUomUnit = WarpingBeamLengthUomUnitContainer;

    this.service
      .updateStartProcess(updateStartData.Id, updateStartData)
      .then(result => {
        location.reload();
      })
      .catch(e => {
        this.error.error = e;
      });
  }

  ProduceBeamsTimeChanged(newValue) {
    this.service.getShiftByTime(newValue)
      .then(result => {
        this.error.ProduceBeamsShift = "";
        this.ProduceBeamsShift = {};
        this.ProduceBeamsShift = result;
      })
      .catch(e => {
        this.ProduceBeamsShift = {};
        this.error.ProduceBeamsShift = " Shift tidak ditemukan ";
      });
  }

  saveProduceBeams() {
    var HistoryDateContainer;
    var HistoryTimeContainer;
    var ShiftIdContainer;
    var OperatorIdContainer;
    var WarpingBeamLengthPerOperatorContainer;

    this.error = {};

    var IdContainer = this.data.Id;
    if (this.ProduceBeamsDate) {
      HistoryDateContainer = moment(this.ProduceBeamsDate).utcOffset("+07:00").format();
    }
    if (this.ProduceBeamsTime) {
      HistoryTimeContainer = this.ProduceBeamsTime;
    }
    if (this.ProduceBeamsShift) {
      ShiftIdContainer = this.ProduceBeamsShift.Id;
    }

    if (this.ProduceBeamsOperator) {
      OperatorIdContainer = this.ProduceBeamsOperator.Id;
    }

    if (this.WarpingBeamLengthPerOperator > 0) {
      WarpingBeamLengthPerOperatorContainer = this.WarpingBeamLengthPerOperator;
    }

    var produceBeamData = {};
    produceBeamData.Id = IdContainer;
    produceBeamData.ProduceBeamsDate = HistoryDateContainer;
    produceBeamData.ProduceBeamsTime = HistoryTimeContainer;
    produceBeamData.ProduceBeamsShift = ShiftIdContainer;
    produceBeamData.ProduceBeamsOperator = OperatorIdContainer;
    produceBeamData.WarpingBeamLengthPerOperator = WarpingBeamLengthPerOperatorContainer;

    produceBeamData.BrokenCauses = [];

    if (this.completeBeam) {
      var TentionContainer;
      var MachineSpeedContainer;
      var PressRollContainer;
      var PressRollUomContainer;
      var IsFinishFlagContainer;

      if (this.Tention) {
        TentionContainer = this.Tention;
      }
      if (this.MachineSpeed) {
        MachineSpeedContainer = this.MachineSpeed;
      }
      if (this.PressRoll) {
        PressRollContainer = this.PressRoll;
      }
      if (this.PressRollUom) {
        PressRollUomContainer = this.PressRollUom;
      }
      if (this.data.BeamProductResult == this.BeamProducts.length) {
        IsFinishFlagContainer = true
      } else {
        IsFinishFlagContainer = false;
      }

      this.WarpingBrokenCauses.forEach(o => {
        var brokenCauseObject = {};
        brokenCauseObject.WarpingBrokenCauseId = o.WarpingBrokenCause.Id;
        brokenCauseObject.TotalBroken = o.TotalBroken;
        produceBeamData.BrokenCauses.push(brokenCauseObject);
      });

      produceBeamData.Tention = TentionContainer;
      produceBeamData.MachineSpeed = MachineSpeedContainer;
      produceBeamData.PressRoll = PressRollContainer;
      produceBeamData.PressRollUom = PressRollUomContainer;
      produceBeamData.IsFinishFlag = IsFinishFlagContainer;
      produceBeamData.ProduceBeamsId = this.BeamsToProduct.Id;

      this.service.updateCompletedProcess(produceBeamData.Id, produceBeamData)
        .then(result => {
          location.reload();
        })
        .catch(e => {
          this.error = e;
        });
    } else {
      this.service.updateProduceBeamsProcess(produceBeamData.Id, produceBeamData)
        .then(result => {
          location.reload();
        })
        .catch(e => {
          this.error = e;
        });
    }
  }

  cancelCallback(event) {
    this.router.navigateToRoute('list');
  }
}
