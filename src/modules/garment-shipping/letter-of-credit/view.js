import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';
import moment from 'moment';
import numeral from 'numeral';

@inject(Router, Service)
export class View {

    constructor(router, service) {
        this.router = router;
        this.service = service;
    }

    async activate(params) {
        var id = params.id;
        this.data = await this.service.getById(id);
        this.selectedPackingList = this.data.invoiceNo;

        const amendLC = await this.service.searchAmendLC({ filter: JSON.stringify({ documentCreditNo: this.data.documentCreditNo }) });
        this.amendLCData = [];
        for (const amend of amendLC.data) {
            this.amendLCData.push({
                amendNumber: amend.amendNumber,
                amount: numeral(amend.amount).format("0,000.00"),
            });
        }
        this.amendLCData.sort((a, b) => a.amendNumber - b.amendNumber);
        this.finalAmount = this.data.totalAmount + amendLC.data.reduce((acc, cur) => acc += cur.amount, 0);

        const packingList = await this.service.searchPackingList({ filter: JSON.stringify({ lcNo: this.data.documentCreditNo, isUsed: true }) });
        if (packingList.data.length > 0) {
            const invoice = await this.service.searchInvoice({ filter: JSON.stringify({ lcNo: this.data.documentCreditNo }) });
            this.invoiceData = [];
            for (const pl of packingList.data) {
                const inv = invoice.data.find(i => i.packingListId == pl.id);
                this.invoiceData.push({
                    invoiceNo: pl.invoiceNo,
                    amountToBePaid: numeral(inv.amountToBePaid).format("0,000.00"),
                    truckingDate: moment(pl.truckingDate).format("DD MMM YYYY")
                });
            }
            this.invoiceData.sort((a, b) => {
                const x = a.invoiceNo.toLowerCase();
                const y = b.invoiceNo.toLowerCase();
                if (x < y) { return -1; }
                if (x > y) { return 1; }
                return 0;
            });
            this.totalInvoice = invoice.data.reduce((acc, cur) => acc += cur.amountToBePaid, 0);
            this.finalAmountInvoice = this.finalAmount - this.totalInvoice;
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
}
