import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';


@inject(Router, Service)
export class Confirm {
  hasCancel = true;
  hasSave = true;

  constructor(router, service) {
    this.router = router;
    this.service = service;
  }

  bind() {
    this.error = {};
  }

  async activate(params) {
    var id = params.id;
    this.data = await this.service.getById(id);
  }

  cancel(event) {
    this.router.navigateToRoute('view', { id: this.data.Id });
  }

  save(event) {
    if (this.data.Items) {
      if (this.data.Items.length > 0) {
        var warning = [];
        var warning_confirm = [];
        var total_item = 0;
        for (var item of this.data.Items) {
          var today = new Date();
          var a = new Date(item.DeliveryDate);
          var b = today;
          a.setHours(0, 0, 0, 0);
          b.setHours(0, 0, 0, 0);
          var diff = a.getTime() - b.getTime();
          var timeDiff = Math.abs(a.getTime() - b.getTime());
          var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
          total_item = total_item + item.ConfirmQuantity;

          if (diff >= 0) {
            if (diffDays >= 0 && diffDays <= 45) {
                warning.push('Comodity ' + item.ComodityName + ' (Jumlah Confirm = ' + item.ConfirmQuantity + ') kurang ' + diffDays + ' hari dari Tanggal Pengiriman\n');
            }
          }
          else {
            warning = [];
            break;
          }
          if (new Date(item.DeliveryDate) < new Date(this.data.BookingOrderDate)) {
            warning = [];
            break;
          }
          else if (new Date(item.DeliveryDate) > new Date(this.data.DeliveryDate)) {
            warning = [];
            break;
          }

        }
        var total = total_item - (this.data.OrderQuantity * 1.05);
        if (total > 0)
          warning_confirm.push('Total Jumlah Confirm lebih dari Jumlah Order (Max Allowance 5% dari Jumah Order)\n');

        if (warning.length > 0 && warning_confirm.length <= 0) {
          if (confirm('Tanggal Confirm <= 45 hari \n' + warning.toString().replace(/,/g, "") + 'Tetap Confirm ?')) {
            this.service.update(this.data)
              .then(result => {
                alert("Data Confirmed");
                this.cancel();
              }).catch(e => {
                this.error = e;
              });
          }
        }
        else if (warning.length > 0 && warning_confirm.length > 0) {
          if (confirm('Tanggal Confirm <= 45 hari \n' + warning.toString().replace(/,/g, "") + warning_confirm.toString() + 'Tetap Confirm?')) {
            this.service.update(this.data)
              .then(result => {
                alert("Data Confirmed");
                this.cancel();
              }).catch(e => {
                this.error = e;
              });
          }
        }
        else if (warning_confirm.length > 0) {
          if (confirm(warning_confirm.toString() + 'Tetap Confirm?')) {
            this.service.update(this.data)
              .then(result => {
                alert("Data Confirmed");
                this.cancel();
              }).catch(e => {
                this.error = e;
              });
          }
        }
        else {
          this.service.update(this.data).then(result => {
            this.cancel();
          }).catch(e => {
            this.error = e;
          })
        }
      }
      else {
        this.service.update(this.data).then(result => {
          this.cancel();
        }).catch(e => {
          this.error = e;
        })
      }
    }
    else {
      this.service.update(this.data).then(result => {
        this.cancel();
      }).catch(e => {
        this.error = e;
      })
    }

  }

}
