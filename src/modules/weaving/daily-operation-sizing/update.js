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
var SizingBeamLoader = require("../../../loader/weaving-sizing-beam-loader");
var OperatorLoader = require("../../../loader/weaving-operator-loader");

@inject(Router, Service, BindingEngine)
export class Update {
  @bindable StartTime;
  @bindable ProduceBeamsTime;
  @bindable ProduceBeamsFinishCounter;
  @bindable ProduceBeamsBruto;
  @bindable StartSizingStartCounter;

  constructor(router, service, bindingEngine) {
    this.router = router;
    this.service = service;
    this.bindingEngine = bindingEngine;
    this.data = {};

    this.isStartDisabled = false;
    this.isProduceBeamDisabled = false;
    this.isDoffDisabled = false;

    this.showHideCalculationField = false;
  }

  formOptions = {
    cancelText: 'Kembali',
    saveText: 'Simpan',
  };

  beamsWarpingColumns = [{
    value: "WarpingBeamNumber",
    header: "No. Beam Warping"
  }, {
    value: "WarpingBeamConeAmount",
    header: "Helai Benang Beam Warping"
  }];

  beamProductsColumns = [{
    value: "SizingBeamNumber",
    header: "No. Beam Sizing"
  }, {
    value: "BeamProductDate",
    header: "Tanggal"
  }, {
    value: "BeamProductTime",
    header: "Waktu"
  }, {
    value: "CounterFinish",
    header: "Counter Akhir"
  }, {
    value: "PISMeter",
    header: "PIS(m)"
  }, {
    value: "WeightNetto",
    header: "Netto"
  }, {
    value: "WeightBruto",
    header: "Bruto"
  }, {
    value: "SPU",
    header: "SPU"
  }, {
    value: "TotalBroken",
    header: "Total Putus"
  }, {
    value: "SizingBeamStatus",
    header: "Status Beam Sizing"
  }];

  historiesColumns = [{
      value: "SizingBeamNumber",
      header: "Nomor Beam Sizing"
    },
    {
      value: "MachineDate",
      header: "Tanggal"
    },
    {
      value: "MachineTime",
      header: "Jam"
    }, {
      value: "ShiftName",
      header: "Shift"
    },
    {
      value: "OperatorName",
      header: "Operator"
    },
    {
      value: "OperatorGroup",
      header: "Grup"
    },
    {
      value: "BrokenPerShift",
      header: "Putus Beam"
    },
    {
      value: "MachineStatus",
      header: "Status Mesin"
    },
    {
      header: "Action"
    }
  ];

  async activate(params) {
    var Id = params.Id;
    
    this.data = await this.service
      .getById(Id);

    if (this.data.Id) {
      this.BeamsWarping = this.data.DailyOperationSizingBeamsWarping;

      var isAllBeamProcessedFlag;
      this.BeamProducts = this.data.DailyOperationSizingBeamProducts;
      if (this.data.BeamProductResult == this.BeamProducts.length) {
        isAllBeamProcessedFlag = true;
      } else {
        isAllBeamProcessedFlag = false;
      }

      this.Histories = this.data.DailyOperationSizingHistories;

      if (this.BeamProducts.length === 0) {
        this.StartSizingStartCounter = 0;
      } else {
        var lastSizingHistory = this.Histories[0];
        if (lastSizingHistory.MachineStatus == "ENTRY") {
          this.StartSizingStartCounter = 0;
        } else {
          var lastSizingBeamProduct = this.BeamProducts[0];
          this.StartSizingStartCounter = lastSizingBeamProduct.CounterFinish;
        }
      }


      var beamSizingProductFinish = [];
      for(var i =0;i<this.data.DailyOperationSizingBeamProducts.length;i++){
        var tempBeams = this.data.DailyOperationSizingBeamProducts[i];
        if(tempBeams.SizingBeamStatus == "ROLLED-UP"){
          beamSizingProductFinish.push(tempBeams);          
          }
      }
      this.BeamSizingFinish = beamSizingProductFinish;
      var isFinished = this.data.OperationStatus;
      var beamSizingMustProduce = this.data.BeamProductResult;
      
      if(this.data.DailyOperationSizingBeamProducts.length < beamSizingMustProduce)
      {
        this.isStartDisabled = false;
      }else{
        this.isStartDisabled = true;
      }

      if(beamSizingProductFinish.length < beamSizingMustProduce && 
        this.data.DailyOperationSizingBeamProducts.length != 0 &&
        this.data.DailyOperationSizingBeamProducts.length != beamSizingProductFinish.length)
        {
          this.isProduceBeamDisabled = false;
        }
        else
        {
          this.isProduceBeamDisabled = true;
        }

      // var beamSizingProduct = this.data.DailyOperationSizingBeamProducts;
      // var isFinished = this.data.OperationStatus;
      // var beamSizingMustProduce = this.data.BeamProductResult;

      // if(beamSizingProduct.length == 0){
      //   this.isStartDisabled = false;
      //   this.isProduceBeamDisabled = true;
      // }else if(beamSizingProduct.length < beamSizingMustProduce)
      // {
      //   this.isStartDisabled = false;
      //   this.isProduceBeamDisabled = false;
      // } 
      // else if(beamSizingProduct.length == beamSizingMustProduce){
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
      // var lastSizingHistory = this.Histories[0];
      // var lastMachineStatusHistory = lastSizingHistory.MachineStatus;
      // switch (lastMachineStatusHistory) {
      //   case "ENTRY":
      //     this.isStartDisabled = false;
      //     this.isProduceBeamDisabled = true;
      //     break;
      //   case "START":
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

      this.dataOptions = this.data;
      this.completeBeam = false;
    }
  }

  causes = ["", "Putus Beam", "Mesin Bermasalah"];

  get operators() {
    return OperatorLoader;
  }

  get beams() {
    return SizingBeamLoader;
  }

  get beamsOnProcess(){
    var beamProcess = []
    for(var i = 0 ; i < this.data.DailyOperationSizingBeamProducts.length ; i++ ){
      var beamSizingProcessing = this.data.DailyOperationSizingBeamProducts[i];
      if(beamSizingProcessing.SizingBeamStatus == "ON-PROCESS"){
        beamProcess.push(beamSizingProcessing);
      }
    }
    return beamProcess
  }

  completeBeamClicked(event) {
    let targetValue = event.target.checked;

    this.FinishDoffMachineSpeed = 0;
    this.FinishDoffVisco = 0;
    this.FinishDoffTexSQ = 0;

    if (targetValue) {
      this.showHideCompleteMenu = true;
    } else {
      this.showHideCompleteMenu = false;
    }
  }

  start() {
    this.StartDate = undefined;
    this.StartTime = null;
    this.StartShift = undefined;
    this.StartOperator = undefined;
    this.SizingBeamId = undefined;
    if (this.showHideStartMenu === true) {
      this.showHideStartMenu = false;
    } else {
      this.showHideStartMenu = true;
      this.showHideProduceBeamsMenu = false;
      this.showHideDoffMenu = false;
    }
  }

  produceBeams() {
    this.ProduceBeamsFinishCounter = null;
    this.ProduceBeamsPISMeter = null;
    this.ProduceBeamsSPU = null;
    this.ProduceBeamsBruto = null;
    this.ProduceBeamsNetto = null;
    this.ProduceBeamsTheoritical = null;
    this.ProduceBeamsDate = undefined;
    this.ProduceBeamsTime = null;
    this.ProduceBeamsShift = undefined;
    this.ProduceBeamsOperator = undefined;
    if (this.showHideProduceBeamsMenu === true) {
      this.showHideProduceBeamsMenu = false;
    } else {
      this.showHideStartMenu = false;
      this.showHideProduceBeamsMenu = true;
      this.showHideDoffMenu = false;
    }
    if(this.data.DailyOperationSizingBeamProducts){
      this.service.getBeamsById(this.data.DailyOperationSizingBeamProducts[0].SizingBeamId)
        .then(result =>{
          this.data.SizingBeamProductLast = result
        }).catch(e=> {
          console.log(e);
        });      
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
    this.error = {};
    var IdContainer = this.data.Id;
    if (this.StartSizingBeamDocuments) {
      var SizingBeamIdContainer = this.StartSizingBeamDocuments.Id;
      var SizingBeamNumberContainer = this.StartSizingBeamDocuments.Number;
    }
    if (this.StartSizingStartCounter) {
      var SizingStartCounterContainer = this.StartSizingStartCounter;
    } else {
      var SizingStartCounterContainer = 0;
    }
    if (this.StartDate) {
      var HistoryDateContainer = moment(this.StartDate).utcOffset("+07:00").format();
    }
    if (this.StartTime) {
      var HistoryTimeContainer = this.StartTime;
    }
    if (this.StartShift) {
      var ShiftContainer = this.StartShift.Id;
    }
    if (this.StartOperator) {
      var OperatorContainer = this.StartOperator.Id;
    }

    var updateData = {};
    updateData.Id = IdContainer;
    updateData.SizingBeamId = SizingBeamIdContainer;
    updateData.SizingBeamNumber = SizingBeamNumberContainer;
    updateData.CounterStart = SizingStartCounterContainer;
    updateData.StartDate = HistoryDateContainer;
    updateData.StartTime = HistoryTimeContainer;
    updateData.StartShift = ShiftContainer;
    updateData.StartOperator = OperatorContainer;
    
    this.service
      .updateStart(updateData.Id, updateData)
      .then(result => {
        location.reload();
      })
      .catch(e => {
        this.error = e;
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

  ProduceBeamsFinishCounterChanged(newValue) {
    if (newValue) {
      let sizingBeamProductsContainer = this.data.DailyOperationSizingBeamProducts.find(doc => true);
      let counterStart = sizingBeamProductsContainer.CounterStart;
      this.service.calculatePISMeter(counterStart, newValue)
        .then(resultPISMeter => {
          this.error.ProduceBeamsPISMeter = "";
          this.ProduceBeamsPISMeter = resultPISMeter;
          if (this.ProduceBeamsPISMeter) {
            this.showHideCalculationField = true;
          }
        })
        .catch(e => {
          this.error.ProduceBeamsPISMeter = " Tidak dapat menghitung PIS(m) ";
          this.data.ProduceBeamsPISMeter = 0;
          this.ProduceBeamsPISMeter = 0;
        });
    }
  }

  ProduceBeamsBrutoChanged(newValue) {
    if (newValue) {
      let dataContainer = this.data;
      let emptyWeight;
      let machineType;
      let yarnStrands;
      let neReal;
      let bruto = newValue;
      
      if(dataContainer.SizingBeamProductLast.EmptyWeight){
        emptyWeight = dataContainer.SizingBeamProductLast.EmptyWeight;
      }
      // if (dataContainer.EmptyWeight) {
      //   emptyWeight = dataContainer.EmptyWeight;
      // }
      if (dataContainer.MachineType) {
        machineType = dataContainer.MachineType;
      }
      if (dataContainer.YarnStrands) {
        yarnStrands = dataContainer.YarnStrands;
      }
      if (dataContainer.NeReal) {
        neReal = dataContainer.NeReal;
      }
      if (machineType == "Kawa Moto") {
        this.service.calculateNetto(emptyWeight, bruto)
          .then(resultNetto => {
            this.error.ProduceBeamsNetto = "";
            this.ProduceBeamsNetto = resultNetto;
            return this.service.calculateTheoriticalKawamoto(this.ProduceBeamsPISMeter, yarnStrands, neReal);
          }).then(resultKawamoto => {
            this.error.ProduceBeamsTheoritical = "";
            this.ProduceBeamsTheoritical = resultKawamoto;
            return this.service.calculateSPU(this.ProduceBeamsNetto, this.ProduceBeamsTheoritical);
          }).then(resultSPU => {
            this.error.ProduceBeamsSPU = "";
            this.ProduceBeamsSPU = resultSPU;
          }).catch(e => {
            this.ProduceBeamsTheoritical = 0;
            this.ProduceBeamsSPU = 0;

            this.error.ProduceBeamsTheoritical = " Tidak dapat menghitung Netto Teoritis ";
            this.error.ProduceBeamsSPU = " Tidak dapat menghitung SPU ";
          });
      } else if (machineType == "Sucker Muller") {
        this.service.calculateNetto(emptyWeight, bruto)
          .then(resultNetto => {
            this.error.ProduceBeamsNetto = "";
            this.ProduceBeamsNetto = resultNetto;
            return this.service.calculateTheoriticalSuckerMuller(this.ProduceBeamsPISMeter, yarnStrands, neReal);
          }).then(resultSuckerMuller => {
            this.error.ProduceBeamsTheoritical = "";
            this.ProduceBeamsTheoritical = resultSuckerMuller;
            return this.service.calculateSPU(this.ProduceBeamsNetto, this.ProduceBeamsTheoritical);
          }).then(resultSPU => {
            this.error.ProduceBeamsSPU = "";
            this.ProduceBeamsSPU = resultSPU;
          }).catch(e => {
            this.ProduceBeamsTheoritical = 0;
            this.ProduceBeamsSPU = 0;

            this.error.ProduceBeamsTheoritical = " Tidak dapat menghitung Netto Teoritis ";
            this.error.ProduceBeamsSPU = " Tidak dapat menghitung SPU ";
          });
      }
    }
  }

  saveProduceBeam() {
    this.error = {};
    var errorIndex = 0;
    var lastBeamProduct = this.BeamProducts[0];

    if (this.BeamProducts.length == this.data.BeamProductResult && lastBeamProduct.SPU === 0 && this.completeBeam == false) {
      this.error.CompleteBeamCheck = "Pilih Selesai Produksi Jika Terakhir Proses Beam";
      errorIndex++;
    }else if(this.BeamProducts.length < this.data.BeamProductResult && lastBeamProduct.SPU === 0 && this.completeBeam == true){
      this.error.CompleteBeamCheck = "Tidak Bisa Selesai Produksi, Jumlah Produk Beam Kurang Dari Target Jumlah Beam";
      errorIndex++;
    }

    if (errorIndex === 0) {
      var CounterFinishContainer;
      var NettoWeightContainer;
      var BrutoWeightContainer;
      var NettoTheoriticalWeightContainer;
      var PISMeterContainer;
      var SPUContainer;
      var OperatorContainer;
      var ShiftContainer;
      var HistoryDateContainer;
      var HistoryTimeContainer;
      var BrokenPerShiftContainer

      var IdContainer = this.data.Id;
      if (this.ProduceBeamsFinishCounter) {
        CounterFinishContainer = this.ProduceBeamsFinishCounter;
      }

      if (this.ProduceBeamsNetto) {
        NettoWeightContainer = this.ProduceBeamsNetto;
      }

      if (this.ProduceBeamsBruto) {
        BrutoWeightContainer = this.ProduceBeamsBruto;
      }

      if (this.ProduceBeamsTheoritical) {
        NettoTheoriticalWeightContainer = this.ProduceBeamsTheoritical;
      }

      if (this.ProduceBeamsPISMeter) {
        PISMeterContainer = this.ProduceBeamsPISMeter;
      }

      if (this.ProduceBeamsSPU) {
        SPUContainer = this.ProduceBeamsSPU;
      }

      if (this.ProduceBeamsOperator) {
        OperatorContainer = this.ProduceBeamsOperator.Id;
      }

      if (this.ProduceBeamsShift) {
        ShiftContainer = this.ProduceBeamsShift.Id;
      }

      if (this.ProduceBeamsDate) {
        HistoryDateContainer = moment(this.ProduceBeamsDate).utcOffset("+07:00").format();
      }

      if (this.ProduceBeamsTime) {
        HistoryTimeContainer = this.ProduceBeamsTime;
      }

      if (this.BrokenPerShift) {
        BrokenPerShiftContainer = this.BrokenPerShift;
      }

      var updateData = {};
      updateData.Id = IdContainer;
      updateData.CounterFinish = CounterFinishContainer;
      updateData.WeightBruto = BrutoWeightContainer;
      updateData.WeightNetto = NettoWeightContainer;
      updateData.WeightTheoritical = NettoTheoriticalWeightContainer;
      updateData.PISMeter = PISMeterContainer;
      updateData.SPU = SPUContainer;
      updateData.ProduceBeamOperator = OperatorContainer;
      updateData.ProduceBeamShift = ShiftContainer;
      updateData.ProduceBeamDate = HistoryDateContainer;
      updateData.ProduceBeamTime = HistoryTimeContainer;
      updateData.BrokenPerShift = BrokenPerShiftContainer;
      updateData.SizingBeamId = this.FinishSizingBeamDocuments.SizingBeamId;
      updateData.SizingBeamNumber = this.FinishSizingBeamDocuments.SizingBeamNumber;

      if (this.completeBeam) {
        var FinishDoffMachineSpeedContainer;
        var FinishDoffViscoContainer;
        var FinishDoffTexSQContainer;
        var IsFinishFlagContainer;

        if (this.FinishDoffMachineSpeed) {
          FinishDoffMachineSpeedContainer = this.FinishDoffMachineSpeed;
        }
        if (this.FinishDoffVisco) {
          FinishDoffViscoContainer = this.FinishDoffVisco;
        }
        if (this.FinishDoffTexSQ) {
          FinishDoffTexSQContainer = this.FinishDoffTexSQ;
        }
        if (this.data.BeamProductResult == this.BeamSizingFinish.length) {
          IsFinishFlagContainer = true
        } else {
          IsFinishFlagContainer = false;
        }

        updateData.MachineSpeed = FinishDoffMachineSpeedContainer;
        updateData.TexSQ = FinishDoffViscoContainer;
        updateData.Visco = FinishDoffTexSQContainer;
        updateData.IsFinishFlag = IsFinishFlagContainer;

        this.service.updateFinishDoff(updateData.Id, updateData)
          .then(result => {
            location.reload();
          })
          .catch(e => {
            this.error = e;
          });
      } else {
        this.service
          .updateProduceBeams(updateData.Id, updateData)
          .then(result => {
            location.reload();
          })
          .catch(e => {
            this.error = e;
          });
      }
    }
  }

  cancelCallback(event) {
    this.router.navigateToRoute('list');
  }
}
