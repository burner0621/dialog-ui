import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service, CoreService } from './service';

@inject(Router, Service, CoreService)
export class Edit {
    isEdit = true;

    constructor(router, service, coreService) {
        this.router = router;
        this.service = service;
        this.coreService = coreService;
    }

    async activate(params) {
        let id = params.id;
        this.data = await this.service.getById(id);
        this.error = {};

        let idx=0;
        if(this.data.measurements){
            this.data.measurementsTemp = [];
            for(let i of this.data.measurements){
                i.MeasurementIndex=idx;
                idx++;
                this.data.measurementsTemp.push(i);
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
        this.router.navigateToRoute('view', { id: this.data.id });
    }

    saveCallback(event) {
        this.service.update(this.data)
            .then(result => {
                this.router.navigateToRoute('view', { id: this.data.id });
            })
            .catch(error => {
                this.error = error;

                let errorNotif = "";
                if (error.InvoiceType || error.Type || error.Date || error.ItemsCount || error.Items) {
                    errorNotif += "Tab DESCRIPTION ada kesalahan pengisian.\n"
                }
                if (error.GrossWeight || error.NettWeight || error.totalCartons || error.SayUnit || error.MeasurementsCount || error.Measurements) {
                    errorNotif += "Tab DETAIL MEASUREMENT ada kesalahan pengisian.\n"
                }
                if (error.ShippingMark || error.SideMark || error.Remark) {
                    errorNotif += "Tab SHIPPING MARK - SIDE MARK - REMARK ada kesalahan pengisian."
                }

                if (errorNotif) {
                    alert(errorNotif);
                }
            })
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
          netNetWeight: d.netNetWeight,
          index: d.index
        };
      }).filter((value, index, self) => self.findIndex(f => value.carton1 == f.carton1 && value.carton2 == f.carton2 && value.index == f.index) === index);
      for (const detail of newDetails) {
        const cartonExist = false;
        const indexItem = this.data.items.indexOf(item);
        if (indexItem > 0) {
          for (let i = 0; i < indexItem; i++) {
            const item = this.data.items[i];
            for (const prevDetail of item.details) {
              if (detail.carton1 == prevDetail.carton1 && detail.carton2 == prevDetail.carton2 && detail.index == prevDetail.index) {
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
