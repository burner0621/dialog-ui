import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';
import { DialogService } from 'aurelia-dialog';
import { Dialog } from "../packing-list-approval/template/dialog";

@inject(Router, Service, DialogService)
export class View {

    constructor(router, service, dialogService) {
        this.router = router;
        this.service = service;
        this.dialogService = dialogService;
    }

    formOptions = {
        cancelText: "Back",
        editText: "Approve",
        deleteText: "Cancel",
        saveText: "Reject",
    }

    async activate(params) {
        var id = params.id;
        this.data = await this.service.getById(id);
        var idx = 0;
        if (this.data.measurements) {
            for (var i of this.data.measurements) {
                i.MeasurementIndex = idx;
                idx++;
            }
        }

        if (this.data.items) {
            for (const item of this.data.items) {
                item.buyerAgent = this.data.buyerAgent;
                item.section = this.data.section;
                this.sumSubTotal(item);
            }
        }
    }

    cancelCallback(event) {
        this.router.navigateToRoute('list');
    }

    editCallback(event) {
        if (confirm("Approve Draft Packing List?")) {
            this.service.approve(this.data).then(result => {
                this.cancelCallback();
            });
        }
    }

    deleteCallback(event) {
        this.dialogService.open({ viewModel: Dialog, model: { title: "Alasan Cancel" } })
            .then(response => {
                if (!response.wasCancelled) {
                    this.service.cancel({ id: this.data.id, reason: response.output })
                        .then(result => {
                            alert('Packing List berhasil di-Cancel');
                            this.cancelCallback();
                        })
                        .catch(error => {
                            if (typeof error === 'string') {
                                alert(`Cancel dibatalkan : ${error}`);
                            } else {
                                alert(`Error : ${error.message}`);
                            }
                        });
                }
            });
    }

    saveCallback(event) {
        this.dialogService.open({ viewModel: Dialog, model: { title: "Alasan Reject" } })
            .then(response => {
                if (!response.wasCancelled) {
                    this.service.reject({ id: this.data.id, reason: response.output })
                        .then(result => {
                            alert('Packing List berhasil di-Reject');
                            this.cancelCallback();
                        })
                        .catch(error => {
                            if (typeof error === 'string') {
                                alert(`Reject dibatalkan : ${error}`);
                            } else {
                                alert(`Error : ${error.message}`);
                            }
                        });
                }
            });
    }

    sumSubTotal(item) {
      item.subGrossWeight = 0;
      item.subNetWeight = 0;
      item.subNetNetWeight = 0;
      const newDetails = item.details.map(d => {
        return {
          carton1: d.carton1,
          carton2: d.carton2,
          cartonQuantity: d.cartonQuantity,
          grossWeight: d.grossWeight,
          netWeight: d.netWeight,
          netNetWeight: d.netNetWeight
        };
      }).filter((value, index, self) => self.findIndex(f => value.carton1 == f.carton1 && value.carton2 == f.carton2) === index);
      for (const detail of newDetails) {
        const cartonExist = false;
        const indexItem = this.data.items.indexOf(item);
        if (indexItem > 0) {
          for (let i = 0; i < indexItem; i++) {
            const item = this.data.items[i];
            for (const prevDetail of item.details) {
              if (detail.carton1 == prevDetail.carton1 && detail.carton2 == prevDetail.carton2) {
                cartonExist = true;
                break;
              }
            }
          }
        }
        if (!cartonExist) {
              item.subGrossWeight += detail.grossWeight * detail.cartonQuantity;
              item.subNetWeight += detail.netWeight * detail.cartonQuantity;
              item.subNetNetWeight += detail.netNetWeight * detail.cartonQuantity;
        }
      }
    }
}
