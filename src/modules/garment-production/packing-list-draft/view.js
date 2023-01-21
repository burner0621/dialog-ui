import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service, CoreService } from './service';

@inject(Router, Service, CoreService)
export class View {

    constructor(router, service, coreService) {
        this.router = router;
        this.service = service;
        this.coreService = coreService;
    }

    formOptions = {
        cancelText: "Back",
        saveText: "Save"
    }

    async activate(params) {
        let id = params.id;
        this.data = await this.service.getById(id);
        this.error = {};

        let idx = 0;
        if (this.data.measurements) {
            for (let i of this.data.measurements) {
                i.MeasurementIndex = idx;
                idx++;
            }
        }

        if (this.data.items) {
            for (const item of this.data.items) {
                item.buyerAgent = this.data.buyerAgent;
                item.section = this.data.section;
            }
        }

        switch (this.data.status) {
            case "DRAFT":
                if (!this.data.items || this.data.items.length < 1) {
                    this.saveCallback = null;
                }
                break;
            case "DRAFT_APPROVED_SHIPPING":
                this.deleteCallback = null;
                break;
            case "DRAFT_CANCELED":
            case "DRAFT_APPROVED_MD":
            case "CANCELED":
            case "APPROVED_MD":
            case "APPROVED_SHIPPING":
            case "REJECTED_SHIPPING_MD":
                this.saveCallback = null;
            default:
                this.editCallback = null;
                this.deleteCallback = null;
                break;
        }

        switch (this.data.status) {
            case "DRAFT":
                this.formOptions.saveText = "Post Booking";
                break;
            case "REVISED_TO_MD":
                    this.formOptions.saveText = "";
                    this.saveCallback = null;
                    break;
            case "DRAFT_POSTED":
            case "DRAFT_REJECTED_MD":
            case "DRAFT_REJECTED_SHIPPING":
                this.formOptions.saveText = "Unpost Booking";
                break;
            case "DRAFT_APPROVED_SHIPPING":
                this.formOptions.saveText = "Post Packing List";
                break;
            case "POSTED":
            case "REJECTED_MD":
            case "REVISED_MD":
            case "REJECTED_SHIPPING_UNIT":
            case "REVISED_SHIPPING":
                this.formOptions.saveText = "Unpost Packing List";
                break;
            default:
                break;
        }

        switch (this.data.status) {
            case "DRAFT_REJECTED_MD":
                this.alertInfo = "<strong>Alasan Reject oleh Md:</strong> " + (this.data.statusActivities.slice(-1)[0] || {}).remark;
                break;
            case "DRAFT_REJECTED_SHIPPING":
                this.alertInfo = "<strong>Alasan Reject oleh Shipping:</strong> " + (this.data.statusActivities.slice(-1)[0] || {}).remark;
                break;
            case "REJECTED_MD":
                this.alertInfo = "<strong>Alasan Reject oleh Md:</strong> " + (this.data.statusActivities.slice(-1)[0] || {}).remark;
                break;
            case "REJECTED_SHIPPING_UNIT":
                this.alertInfo = "<strong>Alasan Reject oleh Shipping:</strong> " + (this.data.statusActivities.slice(-1)[0] || {}).remark;
                break;
            case "REVISED_MD":
                this.alertInfo = "<strong>Alasan Revisi oleh Md:</strong> " + (this.data.statusActivities.slice(-1)[0] || {}).remark;
                break;
                case "REVISED_TO_MD":
                    this.alertInfo = "<strong>Alasan Revisi:</strong> " + (this.data.statusActivities.slice(-1)[0] || {}).remark;
                    break;
            case "REVISED_SHIPPING":
                this.alertInfo = "<strong>Alasan Revisi oleh Shipping:</strong> " + (this.data.statusActivities.slice(-1)[0] || {}).remark;
                break;
            case "CANCELED":
                this.alertInfo = "<strong>Alasan Cancel:</strong> " + (this.data.statusActivities.slice(-1)[0] || {}).remark;
                break;
            default:
                break;
        }
    }

    cancelCallback(event) {
        this.router.navigateToRoute('list');
    }

    editCallback(event) {
        this.router.navigateToRoute('edit', { id: this.data.id });
    }

    deleteCallback(event) {
        if (confirm("Hapus?")) {
            this.service.delete(this.data).then(result => {
                this.cancelCallback();
            });
        }
    }

    saveCallback() {
        if (confirm(this.formOptions.saveText + "?")) {
            switch (this.data.status) {
                case "DRAFT":
                    this.service.postBooking(this.data.id)
                        .then(result => {
                            this.cancelCallback();
                        });
                    break;
                case "DRAFT_POSTED":
                case "DRAFT_REJECTED_MD":
                case "DRAFT_REJECTED_SHIPPING":
                    this.service.unpostBooking(this.data.id)
                        .then(result => {
                            this.cancelCallback();
                        });
                    break;
                case "DRAFT_APPROVED_SHIPPING":
                    this.service.postPackingList(this.data.id)
                        .then(result => {
                            this.cancelCallback();
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
                    break;
                case "POSTED":
                case "REJECTED_MD":
                case "REVISED_MD":
                case "REJECTED_SHIPPING_UNIT":
                case "REVISED_SHIPPING":
                    this.service.unpostPackingList(this.data.id)
                        .then(result => {
                            this.cancelCallback();
                        });
                    break;
                default:
                    break;
            }
        }
    }
}
