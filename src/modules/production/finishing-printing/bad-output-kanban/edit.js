import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';
import { Dialog } from '../../../../components/dialog/dialog';
import { AlertView } from './custom-dialog-view/alert-view';
var moment = require("moment");

@inject(Router, Service, Dialog)
export class Edit {

  selectedProductionOrderDetail = {};

  constructor(router, service, dialog) {
    this.router = router;
    this.service = service;
    this.dialog = dialog;
  }

  async activate(params) {
    var id = params.id;
    await this.service.getById(id)
      .then((result) => {
        this.data = result;
        this.service.getDurationEstimation(this.data.ProductionOrder.ProcessType.Code, ["areas"])
          .then((result) => {
            if (result.data.length > 0) {
              this.data.durationEstimation = result.data[0];
            }
          });
      });
    this.data.OldKanban = this.data.OldKanbanId ? await this.service.getById(this.data.OldKanbanId) : null;
    // this.data.Cart.uom = this.data.cart.uom ? this.data.cart.uom.unit : 'MTR';

    var currentIndex = 0, countDoneStep = 0;
    for (var step of this.data.Instruction.Steps) {
      if (step.IsNotDone) {
        if (step.IsNotDone == false) {
          currentIndex++;
        }
        else {
          countDoneStep++;
        }
      }
    }

    if (this.data.IsReprocess) {
      this.data.output = "Kanban Reproses";
    } else if (this.data.OldKanban && this.data.OldKanban.Id && !this.data.IsReprocess) {
      this.data.output = "Kanban Lanjut Proses";
    } else {
      this.data.output = "Kanban Baru";
    }

    this.data.countDoneStep = countDoneStep;
    this.data.currentIndex = currentIndex;
    this.productionOrder = this.data.ProductionOrder;
    this.instruction = this.data.Instruction;
  }

  bind() {
    if (this.data.SelectedProductionOrderDetail.ColorRequest) {
      this.data.SelectedProductionOrderDetail.toString = function () {
        return `${this.ColorRequest}`;
      };
    }

    this.error = {};

    this.invalidSteps = [];
    this.range = [];
  }

  cancelCallback(event) {
    this.router.navigateToRoute('view', { id: this.data.Id });
  }

  saveCallback(event) {
    this.invalidSteps = [];
    this.range = [];

    if (this.validateStepsDurationEstimation()) {
      if (this.invalidSteps.length > 0) {
        this.dialog.show(AlertView, { message: this.generateMessage() })
          .then(response => {
            if (!response.wasCancelled) {
              this.save();
            }
          });
      }
      else
        this.save();
    }
    else
      this.save();
  }

  generateMessage() {
    var message = "<div>Terdapat step yang tidak sesuai dengan estimasi durasi</div>";
    message += "<div>Apakah anda yakin mau menyimpan kanban ini?</div>";

    for (var invalidStep of this.invalidSteps) {
      message += "<div>" + invalidStep.no + ". " + invalidStep.Process + "</div>";
    }

    message += "<br>";

    let removeData = ["length", "PPIC", "PREPARING"];
    let areas = Object.getOwnPropertyNames(this.range);

    for (let j = 0; j < removeData.length; j++) {
      let index = areas.indexOf(removeData[j]);
      if (index >= 0) {
        areas.splice(index, 1);
      }
    }

    for (let i = areas.length - 1; i >= 0; i--) {
      message += "<div>" + this.range[areas[i]].area + ": " + moment(this.range[areas[i]].startDate).format("DD MMM YYYY") + " - " + moment(this.range[areas[i]].endDate).format("DD MMM YYYY") + "</div>";
    }

    return message;
  }

  validateStepsDurationEstimation() {
    if (this.data.durationEstimation && this.data.durationEstimation.Areas) {
      var deliveryDate = this.data.ProductionOrder.DeliveryDate;
      var sumDay = 0;

      for (var i = this.data.durationEstimation.Areas.length - 1; i >= 0; i--) {
        var area = this.data.durationEstimation.Areas[i];
        var d = new Date(deliveryDate);
        d.setHours(0, 0, 0, 0);
        sumDay += area.Duration;

        d.setDate(d.getDate() - sumDay + 1);
        var start = new Date(d);

        d.setDate(d.getDate() + (area.Duration - 1));
        var end = new Date(d);

        this.range[area.Name] = {
          area: area.Name,
          startDate: start,
          endDate: end
        };
      }
      var index = 1;
      for (var step of this.data.Instruction.Steps) {
        var r = {};
        if (step.ProcessArea && step.ProcessArea != "") {
          r = this.range[step.ProcessArea.toUpperCase().replace("AREA ", "")];
        }
        if (r && Object.getOwnPropertyNames(r).length > 0 && step.Deadline && (step.Deadline < r.startDate || step.Deadline > r.endDate)) {
          this.invalidSteps.push({ no: index, Process: step.Process });
        }

        index++;
      }

      return true;
    }
    else {
      return false;
    }
  }

  save() {
    // this.data.productionOrderId = this.data.productionOrder ? this.data.productionOrder._id : {};
    // this.data.instructionId = this.data.instruction ? this.data.instruction._id : {};

    this.service.update(this.data)
      .then(result => {
        this.cancelCallback();
      })
      .catch(e => {
        this.error = e;
      })
  }

  get isEdit() {
    return true;
  }
}
