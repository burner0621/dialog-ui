import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';
import { activationStrategy } from 'aurelia-router';
import { Dialog } from '../../../../components/dialog/dialog';
import { AlertView } from './custom-dialog-view/alert-view';
var moment = require("moment");

@inject(Router, Service, Dialog)
export class Reprocess {
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
    return activationStrategy.replace;
  }

  cancelCallback(event) {
    this.router.navigateToRoute('list');
  }

  saveCallback(event) {
    this.invalidSteps = [];
    this.range = [];

    // if (this.validateStepsDurationEstimation()) {
    //   if (this.invalidSteps.length > 0) {
    //     this.dialog.show(AlertView, { message: this.generateMessage() })
    //       .then(response => {
    //         if (!response.wasCancelled) {
    //           this.save(event);
    //         }
    //       });
    //   }
    //   else
    //     this.save(event);
    // }
    // else
    //   this.save(event);
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
      message += "<div>" + this.range[areas[i]].Area + ": " + moment(this.range[areas[i]].startDate).format("DD MMM YYYY") + " - " + moment(this.range[areas[i]].endDate).format("DD MMM YYYY") + "</div>";
    }

    return message;
  }

  validateStepsDurationEstimation() {
    if (this.data.durationEstimation) {
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

        this.range[area.name] = {
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
          this.invalidSteps.push({ no: index, process: step.Process });
        }

        index++;
      }

      return true;
    }
    else {
      return false;
    }
  }

  save(event) {
    var stepsError = [];
    var hasError = false;
    var instruction = this.data.Instruction ? this.data.Instruction.Steps : [];

    if (instruction.length != 0) {
      if (this.data.reprocess == this.data.SEBAGIAN) {
        instruction = this.data.reprocessSteps.Reproses;
      }

      for (var step of instruction) {
        var stepErrors = {};

        if (!step.Process || step.Process == "") {
          stepErrors["Process"] = "Process harus diisi";
        }

        if (!step.Deadline || step.Deadline.toString().toUpperCase() == 'INVALID DATE') {
          stepErrors["Deadline"] = "Deadline harus diisi";
        }

        stepsError.push(stepErrors);
      }

      for (var stepError of stepsError) {
        if (Object.getOwnPropertyNames(stepError).length > 0) {
          hasError = true;
          break;
        }
      }

      if (!hasError) {
        // event.event.toElement.disabled = true;

        var createPromise = [];
        this.data.CurrentStepIndex = 0;

        for (var cart of this.data.Carts) {
          this.data.Cart = cart;
          this.data.CurrentQty = cart.qty;

          if (cart.reprocess == this.data.LANJUT_PROSES) {
            this.data.IsReprocess = false;
            cart.IsReprocess = false;

            cart.Instruction = {};
            cart.Instruction.Code = this.data.Instruction.Code;
            cart.Instruction.Name = this.data.Instruction.Name;
            cart.Instruction.Steps = this.data.reprocessSteps.LanjutProses;

            delete cart.Instruction.Id;
            delete cart.Instruction.IsDeleted;
            delete cart.Instruction.Active;
            delete cart.Instruction.CreatedUtc;
            delete cart.Instruction.CreatedBy;
            delete cart.Instruction.CreatedAgent;
            delete cart.Instruction.LastModifiedUtc;
            delete cart.Instruction.LastModifiedBy;
            delete cart.Instruction.LastModifiedAgent;
            for (let step of cart.Instruction.Steps) {
              delete step.Id;
              delete step.IsDeleted;
              delete step.Active;
              delete step.CreatedUtc;
              delete step.CreatedBy;
              delete step.CreatedAgent;
              delete step.LastModifiedUtc;
              delete step.LastModifiedBy;
              delete step.LastModifiedAgent;
    
              for (let stepIndicator of step.StepIndicators) {
                delete stepIndicator.Id;
                delete stepIndicator.IsDeleted;
                delete stepIndicator.Active;
                delete stepIndicator.CreatedUtc;
                delete stepIndicator.CreatedBy;
                delete stepIndicator.CreatedAgent;
                delete stepIndicator.LastModifiedUtc;
                delete stepIndicator.LastModifiedBy;
                delete stepIndicator.LastModifiedAgent;
              }
            }

            this.data.Instruction.Steps = this.data.reprocessSteps.LanjutProses;
          }
          else if (cart.reprocess == this.data.REPROSES) {
            this.data.IsReprocess = true;
            cart.IsReprocess = true;

            cart.Instruction = {};
            cart.Instruction.Code = this.data.Instruction.Code;
            cart.Instruction.Name = this.data.Instruction.Name;
            cart.Instruction.Steps = this.data.reprocessSteps.Reproses;

            delete cart.Instruction.Id;
            delete cart.Instruction.IsDeleted;
            delete cart.Instruction.Active;
            delete cart.Instruction.CreatedUtc;
            delete cart.Instruction.CreatedBy;
            delete cart.Instruction.CreatedAgent;
            delete cart.Instruction.LastModifiedUtc;
            delete cart.Instruction.LastModifiedBy;
            delete cart.Instruction.LastModifiedAgent;
            for (let step of cart.Instruction.Steps) {
              delete step.Id;
              delete step.IsDeleted;
              delete step.Active;
              delete step.CreatedUtc;
              delete step.CreatedBy;
              delete step.CreatedAgent;
              delete step.LastModifiedUtc;
              delete step.LastModifiedBy;
              delete step.LastModifiedAgent;
    
              for (let stepIndicator of step.StepIndicators) {
                delete stepIndicator.Id;
                delete stepIndicator.IsDeleted;
                delete stepIndicator.Active;
                delete stepIndicator.CreatedUtc;
                delete stepIndicator.CreatedBy;
                delete stepIndicator.CreatedAgent;
                delete stepIndicator.LastModifiedUtc;
                delete stepIndicator.LastModifiedBy;
                delete stepIndicator.LastModifiedAgent;
              }
            }

            this.data.Instruction.Steps = this.data.reprocessSteps.Reproses;
          } else {
            this.data.IsReprocess = true;
          }
          // createPromise.push(this.service.createSingle(this.data));
        }

        delete this.data.Instruction.Id;
        delete this.data.Instruction.IsDeleted;
        delete this.data.Instruction.Active;
        delete this.data.Instruction.CreatedUtc;
        delete this.data.Instruction.CreatedBy;
        delete this.data.Instruction.CreatedAgent;
        delete this.data.Instruction.LastModifiedUtc;
        delete this.data.Instruction.LastModifiedBy;
        delete this.data.Instruction.LastModifiedAgent;
        for (let step of this.data.Instruction.Steps) {
          delete step.Id;
          delete step.IsDeleted;
          delete step.Active;
          delete step.CreatedUtc;
          delete step.CreatedBy;
          delete step.CreatedAgent;
          delete step.LastModifiedUtc;
          delete step.LastModifiedBy;
          delete step.LastModifiedAgent;

          for (let stepIndicator of step.StepIndicators) {
            delete stepIndicator.Id;
            delete stepIndicator.IsDeleted;
            delete stepIndicator.Active;
            delete stepIndicator.CreatedUtc;
            delete stepIndicator.CreatedBy;
            delete stepIndicator.CreatedAgent;
            delete stepIndicator.LastModifiedUtc;
            delete stepIndicator.LastModifiedBy;
            delete stepIndicator.LastModifiedAgent;
          }
        }

        // if (createPromise.length <= 0) {
        //   createPromise.push(this.service.create(this.data));
        // }

        // console.log(this.data);
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
      else {
        this.error.Steps = stepsError;
      }
    }
  }
}