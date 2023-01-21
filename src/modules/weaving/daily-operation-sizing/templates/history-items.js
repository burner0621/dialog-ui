import {
  inject,
  bindable,
  BindingEngine
} from "aurelia-framework";
import {
  Service
} from "../service";
import {
  Router
} from "aurelia-router";
import { Dialog } from '../../../../au-components/dialog/dialog'
import moment from "moment";
import _ from "underscore";

// var ConstructionLoader = require("../../../../loader/weaving-constructions-loader");

@inject(BindingEngine, Service, Router, Dialog)
export class HistoryItems {
  // @bindable Code;
  // @bindable OrderDocument;

  constructor(bindingEngine, service, router, dialog) {
    this.service = service;
    this.bindingEngine = bindingEngine;
    this.router = router;
    this.dialog = dialog;
  }

  activate(context) {
    this.data = context.data;
    this.error = context.error;

    if (this.data.DateTimeMachine) {
      var DateMachine = moment(this.data.DateTimeMachine).format('DD/MM/YYYY');
      var TimeMachine = moment(this.data.DateTimeMachine).format('LT');

      this.data.MachineDate = DateMachine;
      this.data.MachineTime = TimeMachine;
    }

    this.options = context.context.options;
    this.readOnly = context.options.readOnly;

    var historyGroupByBeamId = _.groupBy(this.options.DailyOperationSizingHistories,"SizingBeamNumber");
    var historyShowDeleteButton = [];
    for(var key in historyGroupByBeamId){
      if(this.options.DailyOperationSizingHistories.length > 1)
      {
        if(key != "Belum ada Beam yang Diproses"){
          historyShowDeleteButton.push(historyGroupByBeamId[key][0]);
        }
      }else{
        historyShowDeleteButton.push(historyGroupByBeamId[key][0]);        
      }
    }
    var historyWithDeleteButton = this.options.DailyOperationSizingHistories.map(x => { return historyShowDeleteButton.findIndex(y =>y.Id == x.Id) > -1 ? Object.assign(x,{ShowDeleteButton : true}) : Object.assign(x,{ShowDeleteButton : false}) });
    this.options.DailyOperationSizingHistories = historyWithDeleteButton;
  }

  delete(param) {
    let operationId = this.options.Id;
    let lastBeamProduct = _.findWhere(this.options.DailyOperationSizingBeamProducts, {SizingBeamNumber:param.SizingBeamNumber});
    let lastBeamProductId = "";
    if (lastBeamProduct != null || lastBeamProduct != undefined) {
      lastBeamProductId = lastBeamProduct.Id;
    }

    let historyId = this.data.Id;
    let historyStatus = this.data.MachineStatus;

    let sizingData = {};
    sizingData.Id = operationId;
    sizingData.HistoryId = historyId;
    sizingData.HistoryStatus = historyStatus;
    sizingData.BeamProductId = lastBeamProductId;
    
    switch (historyStatus) {
      case "ENTRY":
          this.dialog.prompt("Apakah anda yakin akan menghapus data?", "Hapus Data")
          .then(response => {
              if (response.ok) {
                this.service.deleteEntry(sizingData)
                .then(result => {
                  this.router.navigateToRoute('list');
                })
                .catch(e => {
                  this.error = e;
                });
              }
          });
        break;
      case "START":
        this.dialog.prompt("Apakah anda yakin akan menghapus data?", "Hapus Data")
        .then(response => {
            if (response.ok) {
              this.service.deleteStartOrCompleted(sizingData.Id, sizingData)
              .then(result => {
                location.reload();
              })
              .catch(e => {
                this.error = e;
              });
            }
        });
        break;
      // case "STOP":
      //     this.dialog.prompt("Apakah anda yakin akan menghapus data?", "Hapus Data")
      //     .then(response => {
      //         if (response.ok) {
      //           this.service.deleteStopOrContinueOrFinish(sizingData.Id, sizingData)
      //           .then(result => {
      //             location.reload();
      //           })
      //           .catch(e => {
      //             this.error = e;
      //     });
      //         }
      //     });
      //   break;
      // case "CONTINUE":
      //     this.dialog.prompt("Apakah anda yakin akan menghapus data?", "Hapus Data")
      //     .then(response => {
      //         if (response.ok) {
      //           this.service.deleteStopOrContinueOrFinish(sizingData.Id, sizingData)
      //           .then(result => {
      //             location.reload();
      //           })
      //           .catch(e => {
      //             this.error = e;
      //           });
      //         }
      //     });
      //   break;
      case "COMPLETED":
        this.dialog.prompt("Apakah anda yakin akan menghapus data?", "Hapus Data")
          .then(response => {
              if (response.ok) {
                this.service.deleteStartOrCompleted(sizingData.Id, sizingData)
                .then(result => {
                  location.reload();
                })
                .catch(e => {
                  this.error = e;
                });
              }
          });
        break;
      case "FINISH":
          this.dialog.prompt("Apakah anda yakin akan menghapus data?", "Hapus Data")
          .then(response => {
              if (response.ok) {
                this.service.deleteStopOrContinueOrFinish(sizingData.Id, sizingData)
                .then(result => {
                  location.reload();
                })
                .catch(e => {
                  this.error = e;
                });
              }
          });
        break;
    }
  }
}
