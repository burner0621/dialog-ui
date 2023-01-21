import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';
import { activationStrategy } from 'aurelia-router';
import { Dialog } from '../../../../components/dialog/dialog';
import { AlertView } from './custom-dialog-view/alert-view';
var moment = require("moment");

@inject(Router, Service, Dialog)
export class Create {
  constructor(router, service, dialog) {
    this.router = router;
    this.service = service;
    this.dialog = dialog;
  }

  activate(params) {

  }

  bind() {
    this.data = this.data || {};
    this.error = {};
    this.invalidSteps = [];
    this.range = [];
  }

  determineActivationStrategy() {
    return activationStrategy.replace; //replace the viewmodel with a new instance
    // or activationStrategy.invokeLifecycle to invoke router lifecycle methods on the existing VM
    // or activationStrategy.noChange to explicitly use the default behavior
  }

  cancelCallback(event) {
    this.router.navigateToRoute('list');
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
          this.invalidSteps.push({ no: index, process: step.process });
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
    // var createPromise = [];
    // this.data.productionOrderId = this.data.productionOrder ? this.data.productionOrder._id : {};
    // this.data.instructionId = this.data.instruction ? this.data.instruction._id : {};

    // for (var cart of this.data.Carts) {
    //   this.data.cart = cart;
    //   this.data.currentQty = cart.qty;
    //   createPromise.push(this.service.create(this.data));
    // }

    // if (createPromise.length <= 0) {
    //   createPromise.push(this.service.create(this.data));
    // }
    this.data.IsBadOutput = true;

    for (var cart of this.data.Carts) {

      if (cart.CartNumber) {
        var stringNumber = cart.CartNumber.split('/');
        var extractNumber = parseInt(stringNumber[0].replace(/\D/g, ""));
        if (!stringNumber || stringNumber.length <=1 || stringNumber[0].charAt(0) != 'T' || !extractNumber) {
          var cartNumberInput = "T1/" + cart.CartNumber;
          cart.CartNumber = cartNumberInput;
        }
      }


    }
    this.service.create(this.data)
      .then(result => {
        alert("Data berhasil dibuat");
        this.router.navigateToRoute('create', {}, { replace: true, trigger: true });
      })
      .catch(e => {
        if (e.statusCode == 500) {
          alert(e.error);
        } else {
          this.error = e;
        }
      })
  }
}