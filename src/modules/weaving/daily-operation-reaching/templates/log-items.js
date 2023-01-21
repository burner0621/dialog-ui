import {
    inject,
    bindable,
    BindingEngine
  } from "aurelia-framework";
  import {
    Service
  } from "../service";
  import moment from "moment";
  import { Dialog } from '../../../../au-components/dialog/dialog';
  import {
    Router
  } from "aurelia-router";
  
  @inject(BindingEngine, Service,Router,Dialog)
  export class LogItems {
  
    constructor(bindingEngine, service,router, dialog) {
      this.service = service;
      this.bindingEngine = bindingEngine;
      this.dialog = dialog;
      this.router= router;
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
      
    }
    delete() {
      let operationId = this.options.Id;
      let lastBeamProduct = this.options.ReachingHistories[0];
      let lastBeamProductId = "";
      if (lastBeamProduct != null || lastBeamProduct != undefined) {
        lastBeamProductId = lastBeamProduct.Id;
      }
  
      let historyId = this.data.Id;
      let historyStatus = this.data.MachineStatus;
  
      let reachingData = {};
      reachingData.Id = operationId;
      reachingData.HistoryId = historyId;
      reachingData.HistoryStatus = historyStatus;
      reachingData.BeamProductId = lastBeamProductId;

      switch (historyStatus) {
        case "ENTRY":
            this.dialog.prompt("Apakah anda yakin akan menghapus data?", "Hapus Data")
            .then(response => {
                if (response.ok) {
                  this.service.deleteHistoryEntryStatus(reachingData)
                  .then(result => {
                    this.router.navigateToRoute('list');
                  })
                  .catch(e => {
                    this.error = e;
                  });
                }
            });
          break;
        case "REACHING-IN-START":
          this.dialog.prompt("Apakah anda yakin akan menghapus data?", "Hapus Data")
          .then(response => {
              if (response.ok) {
                this.service.deleteHistoryStartOrCompleteStatus(reachingData.Id, reachingData)
                .then(result => {
                  location.reload();
                })
                .catch(e => {
                  this.error = e;
                });
              }
          });
          break;
        case "COMB-START":
          this.dialog.prompt("Apakah anda yakin akan menghapus data?", "Hapus Data")
          .then(response => {
              if (response.ok) {
                this.service.deleteHistoryStartOrCompleteStatus(reachingData.Id, reachingData)
                .then(result => {
                  location.reload();
                })
                .catch(e => {
                  this.error = e;
                });
              }
          });
          break;
        case "COMPLETED":
          this.dialog.prompt("Apakah anda yakin akan menghapus data?", "Hapus Data")
            .then(response => {
                if (response.ok) {
                  this.service.deleteHistoryStartOrCompleteStatus(reachingData.Id, reachingData)
                  .then(result => {
                    location.reload();
                  })
                  .catch(e => {
                    this.error = e;
                  });
                }
            });
          break;
        case "REACHING-IN-FINISH":
            this.dialog.prompt("Apakah anda yakin akan menghapus data?", "Hapus Data")
            .then(response => {
                if (response.ok) {
                  this.service.deleteHistoryContinueOrFinishStatus(reachingData.Id, reachingData)
                  .then(result => {
                    location.reload();
                  })
                  .catch(e => {
                    this.error = e;
                  });
                }
            });
          break;
        case "COMB-FINISH":
            this.dialog.prompt("Apakah anda yakin akan menghapus data?", "Hapus Data")
            .then(response => {
                if (response.ok) {
                  this.service.deleteHistoryContinueOrFinishStatus(reachingData.Id, reachingData)
                  .then(result => {
                    location.reload();
                  })
                  .catch(e => {
                    this.error = e;
                  });
                }
            });
          break;
        case "COMB-CHANGE-OPERATOR":
            this.dialog.prompt("Apakah anda yakin akan menghapus data?", "Hapus Data")
            .then(response => {
                if (response.ok) {
                  this.service.deleteHistoryContinueOrFinishStatus(reachingData.Id, reachingData)
                  .then(result => {
                    location.reload();
                  })
                  .catch(e => {
                    this.error = e;
                  });
                }
            });
          break;
          case "REACHING-IN-CHANGE-OPERATOR":
            this.dialog.prompt("Apakah anda yakin akan menghapus data?", "Hapus Data")
            .then(response => {
                if (response.ok) {
                  this.service.deleteHistoryContinueOrFinishStatus(reachingData.Id, reachingData)
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
  