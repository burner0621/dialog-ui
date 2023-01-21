import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { AzureService } from './service';
import { activationStrategy } from 'aurelia-router';

@inject(Router, AzureService)
export class Create {
    controlOptions = {
        label: {
            length: 4,
        },
        control: {
            length: 4,
        },
    };

    formOptions = {
        cancelText: 'Kembali',
        saveText: 'Simpan',
    };

    constructor(router, service) {
        this.router = router;
        this.service = service;
        this.data = {};

        this.collection = {
            columns: ['No. SPB', 'Tanggal SPB', 'Tanggal Jatuh Tempo', 'Nomor Invoice', 'Supplier', 'Divisi', 'PPH', 'PPN', 'Total Bayar (DPP + PPN)', 'Mata Uang'],
            onAdd: () => {
                this.data.UnitPaymentOrders.push({});
            },
        };
    }

    determineActivationStrategy() {
        return activationStrategy.replace;
    }

    cancelCallback(event) {
        this.router.navigateToRoute('list');
    }

    saveCallback(event) {
        /*
            let data = {
                SubmissionDate: this.data.SubmissionDate,
                UnitPaymentOrders: [],
            };
        */

        let data = {
            UnitPaymentOrders: [],
        };

        for (let unitPaymentOrder of this.data.UnitPaymentOrders) {
            console.log(unitPaymentOrder)
            var objectSave = {
                No: unitPaymentOrder.no,
                UPODate: unitPaymentOrder.date,
                DueDate: unitPaymentOrder.dueDate,
                InvoiceNo: unitPaymentOrder.invoceNo,
                SupplierCode: unitPaymentOrder.supplierCode,
                SupplierName: unitPaymentOrder.supplierName,
                DivisionCode: unitPaymentOrder.divisionCode,
                DivisionName: unitPaymentOrder.divisionName,
                IncomeTax: unitPaymentOrder.incomeTax,
                IncomeTaxBy: unitPaymentOrder.incomeTaxBy,
                Vat: unitPaymentOrder.vat,
                TotalPaid: unitPaymentOrder.totalPaid,
                Currency: unitPaymentOrder.currency,
                Items: unitPaymentOrder.items,
                CategoryCode: unitPaymentOrder.category.code,
                CategoryId: unitPaymentOrder.category._id,
                CategoryName: unitPaymentOrder.category.name,
                InvoiceNo: unitPaymentOrder.invoiceNo,
                PaymentMethod: unitPaymentOrder.paymentMethod,
                URNNo: unitPaymentOrder.no,
                URNId: unitPaymentOrder.UId
            };
            if (unitPaymentOrder.useIncomeTax) {
                objectSave.IncomeTaxId = unitPaymentOrder.incomeTaxId;
                objectSave.IncomeTaxName = unitPaymentOrder.incomeTaxName;
                objectSave.IncomeTaxRate = unitPaymentOrder.incomeTaxRate;
            }
            data.UnitPaymentOrders.push(objectSave);
        }

        this.service.create(data)
            .then(result => {
                alert('Data berhasil dibuat');
                this.router.navigateToRoute('create', {}, { replace: true, trigger: true });
            })
            .catch(e => {
                this.error = e;
            });
    }
}