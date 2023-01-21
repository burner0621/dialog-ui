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
var OperatorLoader = require("../../../loader/weaving-operator-loader");

@inject(Router, Service, BindingEngine)
export class Update {
  @bindable ReachingInCombProcess;
  @bindable ReachingInStartTime;
  @bindable ChangeOperatorReachingInTime;
  @bindable CombStartTime;
  @bindable ChangeOperatorCombTime;
  @bindable ReachingInStartYarnStrandsProcessed;
  @bindable ChangeOperatorReachingInYarnStrandsProcessed;
  @bindable CombStartYarnStrandsProcessed;
  @bindable ChangeOperatorCombYarnStrandsProcessed

  constructor(router, service, bindingEngine) {
    this.router = router;
    this.service = service;
    this.bindingEngine = bindingEngine;
    this.data = {};
    this.error = {};

    this.isReachingInStartDisabled = false;
    this.isReachingInChangeOperatorDisabled = false;
    this.isCombStartDisabled = false;
    this.isCombChangeOperatorDisabled = false;

    this.showHideStartReachingInWidth = false;
    this.showHideChangeOperatorReachingInWidth = false;
    this.showHideStartCombWidth = false;
    this.showHideChangeOperatorCombWidth = false;

    this.data.ReachingInYarnStrandsProcessed = 0;
    this.data.CombYarnStrandsProcessed = 0;
  }

  formOptions = {
    cancelText: 'Kembali',
    saveText: 'Simpan',
  };

  logColumns = [{
      value: "MachineDate",
      header: "Tanggal"
    }, {
      value: "MachineTime",
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
      value: "YarnStrandsProcessed",
      header: "Helai Dikerjakan"
    },
    {
      value: "MachineStatus",
      header: "Status"
    },
    {
      value:"ButtonAction",
      header:"Action"
    }
  ];

  process = ["", "Cucuk", "Sisir"];

  async activate(params) {
    var Id = params.Id;
    // var dataResult;
    this.data = await this.service
      .getById(Id);
      // .then(result => {
      //   dataResult = result;
      //   return this.service.getUnitById(result.WeavingUnitDocumentId);
      // })
      // .then(unit => {
      //   dataResult.WeavingDocument = unit;
      //   return dataResult;
      // });
    if (this.data.Id) {
      this.Log = this.data.ReachingHistories;

      var lastReachingHistory = this.Log[0];
      var lastReachingHistoryMachineStatus = lastReachingHistory.MachineStatus;
      switch (lastReachingHistoryMachineStatus) {
        case "ENTRY":
          this.isReachingInStartDisabled = false;
          this.isReachingInChangeOperatorDisabled = true;
          this.isCombStartDisabled = true;
          this.isCombChangeOperatorDisabled = true;
          break;
        case "REACHING-IN-START":
          var isCombStart = false;
          this.Log.forEach(history => {
            if (history.MachineStatus == "COMB-START") {
              isCombStart = true;
            }
          });

          if (isCombStart != true) {
            this.isReachingInStartDisabled = true;
            this.isReachingInChangeOperatorDisabled = false;
            this.isCombStartDisabled = false;
            this.isCombChangeOperatorDisabled = true;
          } else {
            this.isReachingInStartDisabled = true;
            this.isReachingInChangeOperatorDisabled = false;
            this.isCombStartDisabled = true;
            this.isCombChangeOperatorDisabled = true;
          }
          break;
        case "REACHING-IN-CHANGE-OPERATOR":
          var isCombStart = false;
          this.Log.forEach(history => {
            if (history.MachineStatus == "COMB-START") {
              isCombStart = true;
            }
          });

          if (isCombStart != true) {
            this.isReachingInStartDisabled = true;
            this.isReachingInChangeOperatorDisabled = false;
            this.isCombStartDisabled = false;
            this.isCombChangeOperatorDisabled = true;
          } else {
            this.isReachingInStartDisabled = true;
            this.isReachingInChangeOperatorDisabled = false;
            this.isCombStartDisabled = true;
            this.isCombChangeOperatorDisabled = false;
          }
          break;
        case "REACHING-IN-FINISH":
          var isCombStart = 0;
          this.Log.forEach(history => {
            if (history.MachineStatus == "COMB-START") {
              isCombStart++;
            }
          });

          if (isCombStart > 0) {
            this.isReachingInStartDisabled = true;
            this.isReachingInChangeOperatorDisabled = true;
            this.isCombStartDisabled = true;
            this.isCombChangeOperatorDisabled = false;
          } else {
            this.isReachingInStartDisabled = true;
            this.isReachingInChangeOperatorDisabled = true;
            this.isCombStartDisabled = false;
            this.isCombChangeOperatorDisabled = true;
          }
          break;
        case "COMB-START":
          var isReachingInChangeOperator = false;
          this.Log.forEach(history => {
            if (history.MachineStatus == "REACHING-IN-FINISH") {
              isReachingInChangeOperator = true;
            }
          });

          if (isReachingInChangeOperator != true) {
            this.isReachingInStartDisabled = true;
            this.isReachingInChangeOperatorDisabled = false;
            this.isCombStartDisabled = true;
            this.isCombChangeOperatorDisabled = false;
          } else {
            this.isReachingInStartDisabled = true;
            this.isReachingInChangeOperatorDisabled = true;
            this.isCombStartDisabled = true;
            this.isCombChangeOperatorDisabled = false;
          }
          break;
        case "COMB-CHANGE-OPERATOR":
          var reachingInYarnStrands = 0;
          var combYarnStrands = 0;
          this.Log.forEach(history => {
            if (history.MachineStatus == "REACHING-IN-START" || history.MachineStatus == "REACHING-IN-CHANGE-OPERATOR" || history.MachineStatus == "REACHING-IN-FINISH") {
              reachingInYarnStrands += history.YarnStrandsProcessed;
              this.data.ReachingInYarnStrandsProcessed = reachingInYarnStrands;
            } else if (history.MachineStatus == "COMB-START" || history.MachineStatus == "COMB-CHANGE-OPERATOR" || history.MachineStatus == "COMB-FINISH") {
              combYarnStrands += history.YarnStrandsProcessed;
              this.data.CombYarnStrandsProcessed = combYarnStrands;
            }
          });

          if (reachingInYarnStrands < this.data.SizingYarnStrands) {
            this.isReachingInStartDisabled = true;
            this.isReachingInChangeOperatorDisabled = false;
            this.isCombStartDisabled = true;
            this.isCombChangeOperatorDisabled = false;
          } else {
            this.isReachingInStartDisabled = true;
            this.isReachingInChangeOperatorDisabled = true;
            this.isCombStartDisabled = true;
            this.isCombChangeOperatorDisabled = false;
          }
          break;
        case "COMB-FINISH":
          this.isReachingInStartDisabled = true;
          this.isReachingInChangeOperatorDisabled = true;
          this.isCombStartDisabled = true;
          this.isCombChangeOperatorDisabled = true;
          break;
        default:
          this.isReachingInStartDisabled = false;
          this.isReachingInChangeOperatorDisabled = false;
          this.isCombStartDisabled = false;
          this.isCombChangeOperatorDisabled = false;
          break;
      };

      var reachingInYarnStrandsProcessed = 0;
      var combYarnStrandsProcessed = 0;
      this.Log.forEach(history => {
        if (history.MachineStatus == "REACHING-IN-START" || history.MachineStatus == "REACHING-IN-CHANGE-OPERATOR" || history.MachineStatus == "REACHING-IN-FINISH") {
          reachingInYarnStrandsProcessed += history.YarnStrandsProcessed;
          this.data.ReachingInYarnStrandsProcessed = reachingInYarnStrandsProcessed;
        } else if (history.MachineStatus == "COMB-START" || history.MachineStatus == "COMB-CHANGE-OPERATOR" || history.MachineStatus == "COMB-FINISH") {
          combYarnStrandsProcessed += history.YarnStrandsProcessed;
          this.data.CombYarnStrandsProcessed = combYarnStrandsProcessed;
        }
      });
      this.dataOptions = this.data;
    }
  }

  ReachingInCombProcessChanged(newValue) {
    if (newValue == "Cucuk") {
      this.showHideReachingInMenu = true;
      this.showHideCombMenu = false;
      if (this.showHideReachingInMenu === true) {
        if (this.showHideReachingInStartMenu === true) {
          this.showHideReachingInChangeOperatorMenu = false;

          this.ReachingInStartDate = undefined;
          this.ReachingInStartTime = null;
          this.ReachingInStartShift = undefined;
          this.ReachingInStartOperator = undefined;
          this.ReachingInStartTypeInput = undefined;
          this.ReachingInStartTypeOutput = undefined;
          this.ReachingInStartYarnStrandsProcessed = undefined;
        }
        if (this.showHideReachingInChangeOperatorMenu === true) {
          this.showHideReachingInStartMenu = false;

          this.ChangeOperatorReachingInDate = undefined;
          this.ChangeOperatorReachingInTime = null;
          this.ChangeOperatorReachingInShift = undefined;
          this.ChangeOperatorReachingInOperator = undefined;
          this.ChangeOperatorReachingInYarnStrandsProcessed = undefined;
          this.ChangeOperatorReachingInFinishWidth = undefined;
        } else {
          this.showHideReachingInStartMenu = false;
          this.showHideReachingInChangeOperatorMenu = false;
        }
      }
    } else if (newValue == "Sisir") {
      this.showHideReachingInMenu = false;
      this.showHideCombMenu = true;
      if (this.showHideCombMenu === true) {
        if (this.showHideCombStartMenu === true) {
          this.showHideCombChangeOperatorMenu = false;

          this.CombStartDate = undefined;
          this.CombStartTime = null;
          this.CombStartShift = undefined;
          this.CombStartOperator = undefined;
          this.CombStartEdgeStitching = undefined;
          this.CombStartNumber = undefined;
          this.CombStartYarnStrandsProcessed = undefined;
        }
        if (this.showHideCombChangeOperatorMenu === true) {
          this.showHideCombStartMenu = false;

          this.ChangeOperatorCombDate = undefined;
          this.ChangeOperatorCombTime = null;
          this.ChangeOperatorCombShift = undefined;
          this.ChangeOperatorCombOperator = undefined;
          this.ChangeOperatorCombYarnStrandsProcessed = undefined;
          this.ChangeOperatorCombWidth = undefined;
        } else {
          this.showHideCombStartMenu = false;
          this.showHideCombChangeOperatorMenu = false;
        }
      }
    } else {
      this.showHideReachingInMenu = false;
      this.showHideCombMenu = false;
    }
  }

  ReachingInStartYarnStrandsProcessedChanged(newValue) {
    this.error.ReachingInStartYarnStrandsProcessed = "";
    this.showHideStartReachingInWidth = false;

    var reachingInYarnStrandsProcessed = 0;
    var combYarnStrandsProcessed = 0;
    this.Log.forEach(history => {
      if (history.MachineStatus == "REACHING-IN-START" || history.MachineStatus == "REACHING-IN-FINISH" || history.MachineStatus == "REACHING-IN-CHANGE-OPERATOR") {
        reachingInYarnStrandsProcessed += history.YarnStrandsProcessed;
      } else if (history.MachineStatus == "COMB-START" || history.MachineStatus == "COMB-CHANGE-OPERATOR" || history.MachineStatus == "COMB-FINISH") {
        combYarnStrandsProcessed += history.YarnStrandsProcessed;
      }
    });
    var sumOfReachingInYarnStrandsProcessed = reachingInYarnStrandsProcessed + newValue;
    if (sumOfReachingInYarnStrandsProcessed > this.data.SizingYarnStrands) {
      this.error.ReachingInStartYarnStrandsProcessed = " Helai Cucuk yang Dikerjakan Melebihi Jumlah Helai pada Beam Sizing ";
    } else if (sumOfReachingInYarnStrandsProcessed == this.data.SizingYarnStrands) {
      this.showHideStartReachingInWidth = true;
    } else {
      this.error.ReachingInStartYarnStrandsProcessed = "";
      this.showHideStartReachingInWidth = false;
      this.StartReachingInFinishWidth = undefined;
    }
  }

  ChangeOperatorReachingInYarnStrandsProcessedChanged(newValue) {
    this.error.ChangeOperatorReachingInYarnStrandsProcessed = "";
    this.showHideChangeOperatorReachingInWidth = false;

    var reachingInYarnStrandsProcessed = 0;
    var combYarnStrandsProcessed = 0;
    this.Log.forEach(history => {
      if (history.MachineStatus == "REACHING-IN-START" || history.MachineStatus == "REACHING-IN-FINISH" || history.MachineStatus == "REACHING-IN-CHANGE-OPERATOR") {
        reachingInYarnStrandsProcessed += history.YarnStrandsProcessed;
      } else if (history.MachineStatus == "COMB-START" || history.MachineStatus == "COMB-CHANGE-OPERATOR" || history.MachineStatus == "COMB-FINISH") {
        combYarnStrandsProcessed += history.YarnStrandsProcessed;
      }
    });
    var sumOfReachingInYarnStrandsProcessed = reachingInYarnStrandsProcessed + newValue;

    if (sumOfReachingInYarnStrandsProcessed > this.data.SizingYarnStrands) {
      this.error.ChangeOperatorReachingInYarnStrandsProcessed = " Helai Cucuk yang Dikerjakan Melebihi Jumlah Helai pada Beam Sizing ";
    } else if (sumOfReachingInYarnStrandsProcessed == this.data.SizingYarnStrands) {
      this.showHideChangeOperatorReachingInWidth = true;
    } else {
      this.error.ChangeOperatorReachingInYarnStrandsProcessed = "";
      this.showHideChangeOperatorReachingInWidth = false;
      this.ChangeOperatorReachingInFinishWidth = undefined;
    }
  }

  CombStartYarnStrandsProcessedChanged(newValue) {
    this.error.CombStartYarnStrandsProcessed = "";
    this.showHideStartCombWidth = false;

    var reachingInYarnStrandsProcessed = 0;
    var combYarnStrandsProcessed = 0;
    this.Log.forEach(history => {
      if (history.MachineStatus == "REACHING-IN-START" || history.MachineStatus == "REACHING-IN-FINISH" || history.MachineStatus == "REACHING-IN-CHANGE-OPERATOR") {
        reachingInYarnStrandsProcessed += history.YarnStrandsProcessed;
      } else if (history.MachineStatus == "COMB-START" || history.MachineStatus == "COMB-CHANGE-OPERATOR" || history.MachineStatus == "COMB-FINISH") {
        combYarnStrandsProcessed += history.YarnStrandsProcessed;
      }
    });
    var sumOfCombYarnStrandsProcessed = combYarnStrandsProcessed + newValue;

    if (sumOfCombYarnStrandsProcessed > this.data.ReachingInYarnStrandsProcessed && sumOfCombYarnStrandsProcessed > this.data.SizingYarnStrands) {
      this.error.CombStartYarnStrandsProcessed = " Helai yang Disisir Melebihi Jumlah Helai pada Beam Sizing ";
    } else if (sumOfCombYarnStrandsProcessed > this.data.ReachingInYarnStrandsProcessed) {
      this.error.CombStartYarnStrandsProcessed = " Helai yang Disisir Melebihi Jumlah Helai yang telah Dicucuk ";
    } else if (reachingInYarnStrandsProcessed == this.data.SizingYarnStrands && reachingInYarnStrandsProcessed == sumOfCombYarnStrandsProcessed) {
      this.showHideStartCombWidth = true;
    } else {
      this.error.CombStartYarnStrandsProcessed = "";
      this.showHideStartCombWidth = false;
      this.CombStartWidth = undefined;
    }
  }

  ChangeOperatorCombYarnStrandsProcessedChanged(newValue) {
    this.error.ChangeOperatorCombYarnStrandsProcessed = "";
    this.showHideChangeOperatorCombWidth = false;

    var reachingInYarnStrandsProcessed = 0;
    var combYarnStrandsProcessed = 0;
    this.Log.forEach(history => {
      if (history.MachineStatus == "REACHING-IN-START" || history.MachineStatus == "REACHING-IN-FINISH" || history.MachineStatus == "REACHING-IN-CHANGE-OPERATOR") {
        reachingInYarnStrandsProcessed += history.YarnStrandsProcessed;
      } else if (history.MachineStatus == "COMB-START" || history.MachineStatus == "COMB-CHANGE-OPERATOR" || history.MachineStatus == "COMB-FINISH") {
        combYarnStrandsProcessed += history.YarnStrandsProcessed;
      }
    });
    var sumOfCombYarnStrandsProcessed = combYarnStrandsProcessed + newValue;

    if (sumOfCombYarnStrandsProcessed > this.data.ReachingInYarnStrandsProcessed && sumOfCombYarnStrandsProcessed > this.data.SizingYarnStrands) {
      this.error.ChangeOperatorCombYarnStrandsProcessed = " Helai yang Disisir Melebihi Jumlah Helai pada Beam Sizing ";
    } else if (sumOfCombYarnStrandsProcessed > this.data.ReachingInYarnStrandsProcessed) {
      this.error.ChangeOperatorCombYarnStrandsProcessed = " Helai yang Disisir Melebihi Jumlah Helai yang telah Dicucuk ";
    } else if (reachingInYarnStrandsProcessed == this.data.SizingYarnStrands && reachingInYarnStrandsProcessed == sumOfCombYarnStrandsProcessed) {
      this.showHideChangeOperatorCombWidth = true;
    } else {
      this.error.ChangeOperatorCombYarnStrandsProcessed = "";
      this.showHideChangeOperatorCombWidth = false;
      this.ChangeOperatorCombWidth = undefined;
    }
  }

  reachingInStart() {
    this.error = {};
    this.ReachingInStartDate = undefined;
    this.ReachingInStartTime = null;
    this.ReachingInStartShift = undefined;
    this.ReachingInStartOperator = undefined;
    this.ReachingInStartTypeInput = undefined;
    this.ReachingInStartTypeOutput = undefined;
    this.ReachingInStartYarnStrandsProcessed = undefined;
    if (this.showHideReachingInStartMenu === true) {
      this.showHideReachingInStartMenu = false;
    } else {
      this.showHideReachingInStartMenu = true;
      this.showHideReachingInChangeOperatorMenu = false;
    }
  }

  reachingInChangeOperator() {
    this.error = {};
    this.ChangeOperatorReachingInDate = undefined;
    this.ChangeOperatorReachingInTime = null;
    this.ChangeOperatorReachingInShift = undefined;
    this.ChangeOperatorReachingInOperator = undefined;
    this.ChangeOperatorReachingInYarnStrandsProcessed = undefined;
    this.ChangeOperatorReachingInFinishWidth = undefined;
    if (this.showHideReachingInChangeOperatorMenu === true) {
      this.showHideReachingInChangeOperatorMenu = false;
    } else {
      this.showHideReachingInStartMenu = false;
      this.showHideReachingInChangeOperatorMenu = true;
    }
  }

  combStart() {
    this.error = {};
    this.CombStartDate = undefined;
    this.CombStartTime = null;
    this.CombStartShift = undefined;
    this.CombStartOperator = undefined;
    this.CombStartEdgeStitching = undefined;
    this.CombStartNumber = undefined;
    this.CombStartYarnStrandsProcessed = undefined;
    if (this.showHideCombStartMenu === true) {
      this.showHideCombStartMenu = false;
    } else {
      this.showHideCombStartMenu = true;
      this.showHideCombChangeOperatorMenu = false;
    }
  }

  combChangeOperator() {
    this.error = {};
    this.ChangeOperatorCombDate = undefined;
    this.ChangeOperatorCombTime = null;
    this.ChangeOperatorCombShift = undefined;
    this.ChangeOperatorCombOperator = undefined;
    this.ChangeOperatorCombYarnStrandsProcessed = undefined;
    this.ChangeOperatorCombWidth = undefined;
    if (this.showHideCombChangeOperatorMenu === true) {
      this.showHideCombChangeOperatorMenu = false;
    } else {
      this.showHideCombStartMenu = false;
      this.showHideCombChangeOperatorMenu = true;
    }
  }

  get operators() {
    return OperatorLoader;
  }

  ReachingInStartTimeChanged(newValue) {
    this.service.getShiftByTime(newValue)
      .then(result => {
        this.error.ReachingInStartShift = "";
        this.ReachingInStartShift = {};
        this.ReachingInStartShift = result;
      })
      .catch(e => {
        this.ReachingInStartShift = {};
        this.error.ReachingInStartShift = " Shift tidak ditemukan ";
      });
  }

  ChangeOperatorReachingInTimeChanged(newValue) {
    this.service.getShiftByTime(newValue)
      .then(result => {
        this.error.ChangeOperatorReachingInShift = "";
        this.ChangeOperatorReachingInShift = {};
        this.ChangeOperatorReachingInShift = result;
      })
      .catch(e => {
        this.ChangeOperatorReachingInShift = {};
        this.error.ChangeOperatorReachingInShift = " Shift tidak ditemukan ";
      });
  }

  CombStartTimeChanged(newValue) {
    this.service.getShiftByTime(newValue)
      .then(result => {
        this.error.CombStartShift = "";
        this.CombStartShift = {};
        this.CombStartShift = result;
      })
      .catch(e => {
        this.CombStartShift = {};
        this.error.CombStartShift = " Shift tidak ditemukan ";
      });
  }

  ChangeOperatorCombTimeChanged(newValue) {
    this.service.getShiftByTime(newValue)
      .then(result => {
        this.error.ChangeOperatorCombShift = "";
        this.ChangeOperatorCombShift = {};
        this.ChangeOperatorCombShift = result;
      })
      .catch(e => {
        this.ChangeOperatorCombShift = {};
        this.error.ChangeOperatorCombShift = " Shift tidak ditemukan ";
      });
  }

  saveReachingInStart() {
    var reachingInYarnStrandsProcessed = 0;
    var combYarnStrandsProcessed = 0;
    this.Log.forEach(history => {
      if (history.MachineStatus == "REACHING-IN-START" || history.MachineStatus == "REACHING-IN-FINISH" || history.MachineStatus == "REACHING-IN-CHANGE-OPERATOR") {
        reachingInYarnStrandsProcessed += history.YarnStrandsProcessed;
      } else if (history.MachineStatus == "COMB-START" || history.MachineStatus == "COMB-CHANGE-OPERATOR" || history.MachineStatus == "COMB-FINISH") {
        combYarnStrandsProcessed += history.YarnStrandsProcessed;
      }
    });
    var sumOfReachingInYarnStrandsProcessed = reachingInYarnStrandsProcessed + this.ReachingInStartYarnStrandsProcessed

    var IdContainer = this.data.Id;
    if (this.ReachingInStartDate) {
      var DateContainer = moment(this.ReachingInStartDate).utcOffset("+07:00").format();
    }
    if (this.ReachingInStartTime) {
      var TimeContainer = this.ReachingInStartTime;
    }
    if (this.ReachingInStartShift) {
      var ShiftContainer = this.ReachingInStartShift.Id;
    }
    if (this.ReachingInStartOperator) {
      var OperatorContainer = this.ReachingInStartOperator.Id;
    }
    if (this.ReachingInStartYarnStrandsProcessed) {
      var YarnStrandsProcessedContainer = this.ReachingInStartYarnStrandsProcessed;
    }
    if (this.ReachingInStartTypeInput) {
      var ReachingInTypeInputContainer = this.ReachingInStartTypeInput;
    }
    if (this.ReachingInStartTypeOutput) {
      var ReachingInTypeOutputContainer = this.ReachingInStartTypeOutput;
    }

    if (parseInt(sumOfReachingInYarnStrandsProcessed) < this.data.SizingYarnStrands) {
      var reachingInStartData = {};

      reachingInStartData.Id = IdContainer;
      reachingInStartData.ReachingInStartDate = DateContainer;
      reachingInStartData.ReachingInStartTime = TimeContainer;
      reachingInStartData.ShiftDocumentId = ShiftContainer;
      reachingInStartData.OperatorDocumentId = OperatorContainer;
      reachingInStartData.YarnStrandsProcessed = YarnStrandsProcessedContainer;
      reachingInStartData.ReachingInTypeInput = ReachingInTypeInputContainer;
      reachingInStartData.ReachingInTypeOutput = ReachingInTypeOutputContainer;

      this.service
        .updateReachingInStart(reachingInStartData.Id, reachingInStartData)
        .then(result => {
          location.reload();
        })
        .catch(e => {
          this.error = e;
        });
    } else if (parseInt(sumOfReachingInYarnStrandsProcessed) == this.data.SizingYarnStrands) {
      if (this.StartReachingInFinishWidth) {
        var ReachingInWidthContainer = this.StartReachingInFinishWidth;

        var reachingInFinishData = {};
        reachingInFinishData.Id = IdContainer;
        reachingInFinishData.ReachingInFinishDate = DateContainer;
        reachingInFinishData.ReachingInFinishTime = TimeContainer;
        reachingInFinishData.ShiftDocumentId = ShiftContainer;
        reachingInFinishData.OperatorDocumentId = OperatorContainer;
        reachingInFinishData.YarnStrandsProcessed = YarnStrandsProcessedContainer;
        reachingInFinishData.ReachingInWidth = ReachingInWidthContainer;

        this.service
          .updateReachingInFinish(reachingInFinishData.Id, reachingInFinishData)
          .then(result => {
            location.reload();
          })
          .catch(e => {
            this.error = e;
          });
      } else {
        this.error.StartReachingInFinishWidth = "Lebar Cucuk Harus Diisi";
      }
    } else {
      this.error.ReachingInStartYarnStrandsProcessed = " Helai Cucuk yang Dikerjakan Melebihi Jumlah Helai pada Beam Sizing ";
    }
  }

  saveReachingInChangeOperator() {
    var reachingInYarnStrandsProcessed = 0;
    var combYarnStrandsProcessed = 0;
    this.Log.forEach(history => {
      if (history.MachineStatus == "REACHING-IN-START" || history.MachineStatus == "REACHING-IN-FINISH" || history.MachineStatus == "REACHING-IN-CHANGE-OPERATOR") {
        reachingInYarnStrandsProcessed += history.YarnStrandsProcessed;
      } else if (history.MachineStatus == "COMB-START" || history.MachineStatus == "COMB-CHANGE-OPERATOR" || history.MachineStatus == "COMB-FINISH") {
        combYarnStrandsProcessed += history.YarnStrandsProcessed;
      }
    });
    var sumOfReachingInYarnStrandsProcessed = reachingInYarnStrandsProcessed + this.ChangeOperatorReachingInYarnStrandsProcessed;

    var IdContainer = this.data.Id;
    if (this.ChangeOperatorReachingInDate) {
      var DateContainer = moment(this.ChangeOperatorReachingInDate).utcOffset("+07:00").format();
    }
    if (this.ChangeOperatorReachingInTime) {
      var TimeContainer = this.ChangeOperatorReachingInTime;
    }
    if (this.ChangeOperatorReachingInShift) {
      var ShiftContainer = this.ChangeOperatorReachingInShift.Id;
    }
    if (this.ChangeOperatorReachingInOperator) {
      var OperatorContainer = this.ChangeOperatorReachingInOperator.Id;
    }
    if (this.ChangeOperatorReachingInYarnStrandsProcessed) {
      var YarnStrandsProcessedContainer = this.ChangeOperatorReachingInYarnStrandsProcessed;
    }

    if (parseInt(sumOfReachingInYarnStrandsProcessed) < this.data.SizingYarnStrands) {
      var changeOperatorReachingInData = {};
      changeOperatorReachingInData.Id = IdContainer;
      changeOperatorReachingInData.ChangeOperatorReachingInDate = DateContainer;
      changeOperatorReachingInData.ChangeOperatorReachingInTime = TimeContainer;
      changeOperatorReachingInData.ShiftDocumentId = ShiftContainer;
      changeOperatorReachingInData.OperatorDocumentId = OperatorContainer;
      changeOperatorReachingInData.YarnStrandsProcessed = YarnStrandsProcessedContainer;

      this.service
        .updateReachingInChangeOperator(changeOperatorReachingInData.Id, changeOperatorReachingInData)
        .then(result => {
          location.reload();
        })
        .catch(e => {
          this.error = e;
        });
    } else if (parseInt(sumOfReachingInYarnStrandsProcessed) == this.data.SizingYarnStrands) {
      if (this.ChangeOperatorReachingInFinishWidth) {
        var ReachingInWidthContainer = this.ChangeOperatorReachingInFinishWidth;

        var reachingInFinishData = {};
        reachingInFinishData.Id = IdContainer;
        reachingInFinishData.ReachingInFinishDate = DateContainer;
        reachingInFinishData.ReachingInFinishTime = TimeContainer;
        reachingInFinishData.ShiftDocumentId = ShiftContainer;
        reachingInFinishData.OperatorDocumentId = OperatorContainer;
        reachingInFinishData.YarnStrandsProcessed = YarnStrandsProcessedContainer;
        reachingInFinishData.ReachingInWidth = ReachingInWidthContainer;

        this.service
          .updateReachingInFinish(reachingInFinishData.Id, reachingInFinishData)
          .then(result => {
            location.reload();
          })
          .catch(e => {
            this.error = e;
          });
      } else {
        this.error.ChangeOperatorReachingInFinishWidth = "Lebar Cucuk Harus Diisi";
      }
    } else {
      this.error.ChangeOperatorReachingInYarnStrandsProcessed = " Helai Cucuk yang Dikerjakan Melebihi Jumlah Helai pada Beam Sizing ";
    }
  }

  saveCombStart() {
    var reachingInYarnStrandsProcessed = 0;
    var combYarnStrandsProcessed = 0;
    this.Log.forEach(history => {
      if (history.MachineStatus == "REACHING-IN-START" || history.MachineStatus == "REACHING-IN-FINISH" || history.MachineStatus == "REACHING-IN-CHANGE-OPERATOR") {
        reachingInYarnStrandsProcessed += history.YarnStrandsProcessed;
      } else if (history.MachineStatus == "COMB-START" || history.MachineStatus == "COMB-CHANGE-OPERATOR" || history.MachineStatus == "COMB-FINISH") {
        combYarnStrandsProcessed += history.YarnStrandsProcessed;
      }
    });
    var sumOfCombYarnStrandsProcessed = combYarnStrandsProcessed + this.CombStartYarnStrandsProcessed;

    var IdContainer = this.data.Id;
    if (this.CombStartDate) {
      var DateContainer = moment(this.CombStartDate).utcOffset("+07:00").format();
    }
    if (this.CombStartTime) {
      var TimeContainer = this.CombStartTime;
    }
    if (this.CombStartShift) {
      var ShiftContainer = this.CombStartShift.Id;
    }
    if (this.CombStartOperator) {
      var OperatorContainer = this.CombStartOperator.Id;
    }
    if (this.CombStartYarnStrandsProcessed) {
      var YarnStrandsProcessedContainer = this.CombStartYarnStrandsProcessed;
    }
    if (this.CombStartEdgeStitching) {
      var CombEdgeStitchingContainer = this.CombStartEdgeStitching;
    }
    if (this.CombStartNumber) {
      var CombNumberContainer = this.CombStartNumber;
    }

    if (parseInt(sumOfCombYarnStrandsProcessed) <= reachingInYarnStrandsProcessed && parseInt(sumOfCombYarnStrandsProcessed) < this.data.SizingYarnStrands) {
      var combStartData = {};

      combStartData.Id = IdContainer;
      combStartData.CombStartDate = DateContainer;
      combStartData.CombStartTime = TimeContainer;
      combStartData.ShiftDocumentId = ShiftContainer;
      combStartData.OperatorDocumentId = OperatorContainer;
      combStartData.YarnStrandsProcessed = YarnStrandsProcessedContainer;
      combStartData.CombEdgeStitching = CombEdgeStitchingContainer;
      combStartData.CombNumber = CombNumberContainer;

      this.service
        .updateCombStart(combStartData.Id, combStartData)
        .then(result => {
          location.reload();
        })
        .catch(e => {
          this.error = e;
        });
    } else if (parseInt(sumOfCombYarnStrandsProcessed) <= reachingInYarnStrandsProcessed && parseInt(sumOfCombYarnStrandsProcessed) == this.data.SizingYarnStrands) {
      if (this.CombStartWidth) {
        var CombFinishWidthContainer = this.CombStartWidth;

        var combFinishData = {};
        combFinishData.Id = IdContainer;
        combFinishData.CombFinishDate = DateContainer;
        combFinishData.CombFinishTime = TimeContainer;
        combFinishData.ShiftDocumentId = ShiftContainer;
        combFinishData.OperatorDocumentId = OperatorContainer;
        combFinishData.YarnStrandsProcessed = YarnStrandsProcessedContainer;
        combFinishData.CombWidth = CombFinishWidthContainer;

        this.service
          .updateCombFinish(combFinishData.Id, combFinishData)
          .then(result => {
            location.reload();
          })
          .catch(e => {
            this.error = e;
          });
      } else {
        this.error.CombStartWidth = "Lebar Sisir Harus Diisi";
      }
    } else {
      this.error.CombStartYarnStrandsProcessed = " Helai yang Disisir Melebihi Jumlah Helai yang sudah Dicucuk ";
    }
  }

  saveCombChangeOperator() {
    var reachingInYarnStrandsProcessed = 0;
    var combYarnStrandsProcessed = 0;
    this.Log.forEach(history => {
      if (history.MachineStatus == "REACHING-IN-START" || history.MachineStatus == "REACHING-IN-FINISH" || history.MachineStatus == "REACHING-IN-CHANGE-OPERATOR") {
        reachingInYarnStrandsProcessed += history.YarnStrandsProcessed;
      } else if (history.MachineStatus == "COMB-START" || history.MachineStatus == "COMB-CHANGE-OPERATOR" || history.MachineStatus == "COMB-FINISH") {
        combYarnStrandsProcessed += history.YarnStrandsProcessed;
      }
    });
    var sumOfCombYarnStrandsProcessed = combYarnStrandsProcessed + this.ChangeOperatorCombYarnStrandsProcessed;

    var IdContainer = this.data.Id;
    if (this.ChangeOperatorCombDate) {
      var DateContainer = moment(this.ChangeOperatorCombDate).utcOffset("+07:00").format();
    }
    if (this.ChangeOperatorCombTime) {
      var TimeContainer = this.ChangeOperatorCombTime;
    }
    if (this.ChangeOperatorCombShift) {
      var ShiftContainer = this.ChangeOperatorCombShift.Id;
    }
    if (this.ChangeOperatorCombOperator) {
      var OperatorContainer = this.ChangeOperatorCombOperator.Id;
    }
    if (this.ChangeOperatorCombYarnStrandsProcessed) {
      var YarnStrandsProcessedContainer = this.ChangeOperatorCombYarnStrandsProcessed;
    }

    if (parseInt(sumOfCombYarnStrandsProcessed) <= reachingInYarnStrandsProcessed && parseInt(sumOfCombYarnStrandsProcessed) < this.data.SizingYarnStrands) {
      var changeOperatorCombData = {};
      changeOperatorCombData.Id = IdContainer;
      changeOperatorCombData.ChangeOperatorCombDate = DateContainer;
      changeOperatorCombData.ChangeOperatorCombTime = TimeContainer;
      changeOperatorCombData.ShiftDocumentId = ShiftContainer;
      changeOperatorCombData.OperatorDocumentId = OperatorContainer;
      changeOperatorCombData.YarnStrandsProcessed = YarnStrandsProcessedContainer;

      this.service
        .updateCombChangeOperator(changeOperatorCombData.Id, changeOperatorCombData)
        .then(result => {
          location.reload();
        })
        .catch(e => {
          this.error = e;
        });
    } else if (parseInt(sumOfCombYarnStrandsProcessed) <= reachingInYarnStrandsProcessed && parseInt(sumOfCombYarnStrandsProcessed) == this.data.SizingYarnStrands) {
      if (this.ChangeOperatorCombWidth) {
        var CombFinishWidthContainer = this.ChangeOperatorCombWidth;

        var combFinishData = {};
        combFinishData.Id = IdContainer;
        combFinishData.CombFinishDate = DateContainer;
        combFinishData.CombFinishTime = TimeContainer;
        combFinishData.ShiftDocumentId = ShiftContainer;
        combFinishData.OperatorDocumentId = OperatorContainer;
        combFinishData.YarnStrandsProcessed = YarnStrandsProcessedContainer;
        combFinishData.CombWidth = CombFinishWidthContainer;

        this.service
          .updateCombFinish(combFinishData.Id, combFinishData)
          .then(result => {
            location.reload();
          })
          .catch(e => {
            this.error = e;
          });
      } else {
        this.error.ChangeOperatorCombWidth = "Lebar Sisir Harus Diisi";
      }
    } else {
      this.error.CombFinishYarnStrandsProcessed = " Helai yang Disisir Melebihi Jumlah Helai yang sudah Dicucuk ";
    }
  }

  cancelCallback(event) {
    this.router.navigateToRoute('list');
  }
}
