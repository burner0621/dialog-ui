import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import Service from './service';
import { Dialog } from '../../../au-components/dialog/dialog'


@inject(Router, Service, Dialog)
export class View {
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
        editText: 'Ubah',
        deleteText: 'Hapus'
    };

    constructor(router, service, dialog) {
        this.router = router;
        this.service = service;
        this.dialog = dialog;

        this.collection = {
            columns: ['No. Disposisi', 'Tanggal Disposisi', 'Tanggal Jatuh Tempo', 'Nomor Proforma/Invoice', 'Supplier', 'Kategori', 'Divisi', 'PPN', 'Total Pembayaran', 'Mata Uang', 'Total yang sudah dibayar', 'Total yang dibayar ke Supplier', 'Selisih Total yang dibayar', ''],
        };
    }

    async activate(params) {
        var id = params.id;
        this.data = await this.service.getById(id);
        for (var a of this.data.Items) {
            a.SupplierName = this.data.Supplier.Name;
            a.Currency = this.data.AccountBank.Currency.Code;
            a.PaymentDifference = a.payToSupplier - (a.AmountPaid + a.SupplierPayment);
        }
        this.IDR = false;
        this.sameCurrency = false;
        this.Amount = this.data.Amount;

        if (this.data.AccountBank.Currency.Code == "IDR") {
            this.IDR = true;
            if (this.data.CurrencyCode == "IDR") {
                this.sameCurrency = true;
            }
            this.Amount = this.data.Amount * this.data.CurrencyRate;

        }

        if (!this.IDR || this.sameCurrency) {
            this.collection = {
                columns: ['No. Disposisi', 'Tanggal Disposisi', 'Tanggal Jatuh Tempo', 'Nomor Proforma/Invoice', 'Supplier', 'Kategori', 'Divisi', 'PPN', 'Total Pembayaran', 'Mata Uang', 'Total yang sudah dibayar', 'Total yang dibayar ke Supplier', 'Selisih Total yang dibayar', ''],
            };
        } else {
            this.collection = {
                columns: ['No. Disposisi', 'Tanggal Disposisi', 'Tanggal Jatuh Tempo', 'Nomor Proforma/Invoice', 'Supplier', 'Kategori', 'Divisi', 'PPN', 'Total Pembayaran', 'Mata Uang', 'Total Pembayaran(IDR)', 'Mata Uang', 'Total yang sudah dibayar', 'Total yang dibayar ke Supplier', 'Selisih Total yang dibayar', ''],
            };
        }

        if (this.data.IsPosted) {
            this.editCallback = undefined;
            this.deleteCallback = undefined;
        }

        this.collectionOptions = {
            IDR: this.IDR,
            rate: this.data.CurrencyRate,
            SameCurrency: this.sameCurrency,
            payToSupplierCurrency: this.data.CurrencyCode
        };
    }

    cancelCallback(event) {
        this.router.navigateToRoute('list');
    }

    editCallback(event) {
        this.router.navigateToRoute('edit', { id: this.data.Id });
    }

    deleteCallback(event) {
        this.dialog.prompt("Apakah anda yakin akan menghapus data?", "Hapus Data")
            .then(response => {
                if (response.ok) {
                    this.service.delete(this.data).then(result => {
                        this.cancelCallback();
                    });
                }
            });
    }
}
