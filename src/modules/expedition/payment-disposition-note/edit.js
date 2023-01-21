import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Dialog } from '../../../components/dialog/dialog'

import Service from './service';


@inject(Router, Service, Dialog)
export class Edit {

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

    constructor(router, service, dialog) {
        this.router = router;
        this.service = service;
        this.dialog = dialog;

        this.collection = {
            columns: ['__check', 'No. Disposisi', 'Tanggal Disposisi', 'Tanggal Jatuh Tempo', 'Nomor Proforma/Invoice', 'Supplier', 'Kategori', 'Divisi', 'PPN', 'Total Pembayaran', 'Mata Uang', 'Total yang sudah dibayar', 'Total yang dibayar ke Supplier', 'Selisih Total yang dibayar', ''],
        };
    }

    bind() {
        this.error = {};
    }

    Items = [];
    async activate(params) {
        var id = params.id;
        this.data = await this.service.getById(id);

        this.Items = this.data.Items.map((item) => {
            item.Select = true;
            return item;
        });
        for(var a of this.data.Items){
            a.SupplierName=this.data.Supplier.Name;
            a.Currency=this.data.AccountBank.Currency.Code;
            a.PaymentDifference = a.payToSupplier - (a.AmountPaid + a.SupplierPayment);
        }

        this.IDR=false;
        this.sameCurrency=false;

        if(this.data.AccountBank.Currency.Code=="IDR"){
            this.IDR=true;
            if(this.data.CurrencyCode=="IDR"){
                this.sameCurrency=true;
            }
        }

        if(!this.IDR || this.sameCurrency){
            this.collection = {
                columns: ['__check', 'No. Disposisi', 'Tanggal Disposisi', 'Tanggal Jatuh Tempo', 'Nomor Proforma/Invoice', 'Supplier', 'Kategori', 'Divisi', 'PPN', 'Total Pembayaran', 'Mata Uang', 'Total yang sudah dibayar', 'Total yang dibayar ke Supplier', 'Selisih Total yang dibayar', ''],
            };
        }
        else{
            this.collection = {
                columns: ['__check', 'No. Disposisi', 'Tanggal Disposisi', 'Tanggal Jatuh Tempo', 'Nomor Proforma/Invoice', 'Supplier', 'Kategori', 'Divisi', 'PPN', 'Total Pembayaran', 'Mata Uang', 'Total Pembayaran(IDR)', 'Mata Uang', 'Total yang sudah dibayar', 'Total yang dibayar ke Supplier', 'Selisih Total yang dibayar', ''],
            };
        }
        this.collectionOptions={
            IDR:this.IDR,
            rate:this.data.CurrencyRate,
            SameCurrency:this.sameCurrency
        };

        // let arg = {
        //     page: 1,
        //     size: Number.MAX_SAFE_INTEGER,
        //     filter: this.data.Supplier && this.data.Supplier.code ? JSON.stringify({ "Position": 7, "Currency": this.data.Bank.currency.code, "SupplierCode": this.data.Supplier.code, "IsPaid": false }) : JSON.stringify({ "Position": 7, "Currency": this.data.Bank.currency.code, "IsPaid": false }) //CASHIER DIVISION
        // };

        // let newData = await this.service.searchAllByPosition(arg)
        //     .then((result) => {
        //         let resultData = result.data && result.data.length > 0 ? result.data.filter((datum) => datum.PaymentMethod && datum.PaymentMethod.toLowerCase() != "cash") : [];

        //         return resultData;
        //     });

        // if (newData.length > 0) {
        //     this.UPOResults = this.UPOResults.concat(newData);
        // }
    }

    cancelCallback(event) {
        this.router.navigateToRoute('view', { id: this.data.Id });
    }

    saveCallback(event) {
        this.data.Items = this.Items.filter((item) => item.Select);
        var dataPrep = this.data;
        this.dialog.prompt("Apakah anda yakin akan menyimpan data?", "Simpan Data")
            .then(response => {
                if (response == "ok") {
                    this.service.update(this.data).then(result => {
                        this.cancelCallback();
                    }).catch(e => {
                        this.error = e;
                    })
                }
            });
    }

    get grandTotal() {
        let result = 0;
        let viewResult=0;
        if (this.Items && this.Items.length > 0) {
            for (let detail of this.Items) {
                if (detail.Select){
                    result += detail.SupplierPayment;
                    viewResult += (detail.SupplierPayment * this.data.CurrencyRate);
                }
            }
        }
        this.data.Amount = result;
        if(this.IDR)
            return viewResult
        else
            return result;
    }

    onCheckAll(event) {
        for (var item of this.Items) {
            item.Select = event.detail.target.checked;
        }
    }
}
