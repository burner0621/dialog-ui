import { inject, Lazy } from "aurelia-framework";
import { Router } from "aurelia-router";
import { Service } from "../service";

@inject(Router, Service)
export class Copy {
    constructor(router, service) {
        this.router = router;
        this.service = service;
        this.data = {};
        this.error = {};
    }

    identityProperties = [
        "id",
        "active",
        "createdUtc",
        "createdBy",
        "createdAgent",
        "lastModifiedUtc",
        "lastModifiedBy",
        "lastModifiedAgent",
        "isDeleted",
    ];

    async activate(params) {
        this.id = params.id;
        this.data = await this.service.getById(this.id);
        this.copiedFrom = { invoiceNo: this.data.invoiceNo };
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

        switch (this.data.status) {
            case "DRAFT":
            case "DRAFT_APPROVED_SHIPPING":
                this.editCallback = this.editAction;
                break;
            default:
                this.editCallback = null;
                break;
        }

        switch (this.data.status) {
            case "REJECTED_MD":
                this.alertInfo = "<strong>Alasan Reject oleh Md:</strong> " + (this.data.statusActivities.slice(-1)[0] || {}).remark;
                break;
            case "REJECTED_SHIPPING_UNIT":
                this.alertInfo = "<strong>Alasan Reject oleh Shipping:</strong> " + (this.data.statusActivities.slice(-1)[0] || {}).remark;
                break;
            default:
                break;
        }
        this.clearDataProperties();
    }

    clearDataProperties() {
        this.identityProperties.concat([
            "invoiceNo"
        ]).forEach(prop => delete this.data[prop]);

        this.data.items.forEach(item => {
            this.identityProperties.concat([
                "id",
            ]).forEach(prop => delete item[prop]);
            item.details.forEach(detail => {
                this.identityProperties.concat([
                    "id",
                ]).forEach(prop => delete detail[prop]);
                detail.sizes.forEach(size => {
                    this.identityProperties.concat([
                        "id",
                    ]).forEach(prop => delete size[prop]);
                });
            });
        });
        this.data.measurements.forEach(item => {
            this.identityProperties.concat([
                "id",
            ]).forEach(prop => delete item[prop]);
        });
    }

    list() {
        this.router.navigateToRoute("list");
    }

    copy() {
        this.data.shippingMarkImagePath=null;
        this.data.sideMarkImagePath=null;
        this.data.remarkImagePath=null;
        this.data.isUsed=false;
        this.service.createCopy(this.data)
            .then(result => {
                alert("Data berhasil dibuat, No Invoice: " + result);
                this.router.navigateToRoute('list');
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
