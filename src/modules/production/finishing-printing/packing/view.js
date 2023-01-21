import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';
import numeral from 'numeral';

@inject(Router, Service)
export class View {
  hasCancel = true;
  hasEdit = true;
  hasDelete = true;

  constructor(router, service) {
    this.router = router;
    this.service = service;
  }

  async activate(params) {
    var id = params.id;
    this.data = await this.service.getById(id);

    if (this.data.accepted) {
      this.hasEdit = false;
      this.hasDelete = false;
    }

  }

  cancel(event) {
    this.router.navigateToRoute('list');
  }

  edit(event) {
    this.router.navigateToRoute('edit', { id: this.data.Id });
  }

  delete(event) {

    this.service.delete(this.data)
      .then(result => {
        this.cancel();
      });
  }

  attached() {
    
            var total = {
                Grade: "Total Jumlah",
                Quantity: 0,
                WeightTotalAmount: 0,
                Weight: 0,
                LengthTotalAmount: 0,
                Length: 0,
            };
    
            for (var detail of this.data.PackingDetails) {
    
                total.Quantity += detail.Quantity;
                total.Weight += detail.Weight;
                total.Length += detail.Length;
                total.WeightTotalAmount += detail.Weight * detail.Quantity;
                total.LengthTotalAmount += detail.Length * detail.Quantity;
            }

            total.Quantity = numeral(total.Quantity).format('0,000');
            total.Weight = numeral(total.Weight).format('0,000.0000');
            total.Length = numeral(total.Length).format('0,000.0000');
            total.WeightTotalAmount = numeral(total.WeightTotalAmount).format('0,000.0000');
            total.LengthTotalAmount = numeral(total.LengthTotalAmount).format('0,000.0000');

            this.data.PackingDetails.push(total);
        }
}
