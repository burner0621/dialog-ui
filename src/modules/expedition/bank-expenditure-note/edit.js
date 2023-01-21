import { inject, Lazy, bindable } from 'aurelia-framework';
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

    sortingControlOptions = {
        label: {
            length: 4,
        },
        control: {
            length: 4,
        }
    };

    sortingOptions = ["", "Tanggal Invoice", "Tanggal Jatuh Tempo"];
    sortingTypeOptions = ["A - Z", "Z - A"];

    formOptions = {
        cancelText: 'Kembali',
        saveText: 'Simpan',
    };

    constructor(router, service, dialog) {
        this.router = router;
        this.service = service;
        this.dialog = dialog;

        this.collection = {
            columns: ['__check', 'No. SPB', 'Tanggal SPB', 'Tanggal Jatuh Tempo', 'Nomor BTU', 'Nomor Invoice', 'Supplier', 'Category', 'Divisi', 'PPN', 'PPh', 'Total Harga ((DPP + PPN) - PPh)', 'Mata Uang', 'Jumlah yang telah dibayar', 'Jumlah dibayar ke Supplier', 'Selisih pembayaran', ''],
        };
    }

    bind() {
        this.error = {};
    }

    bankView = "";
    UPOResults = [];
    async activate(params) {
        var id = params.id;
        this.data = await this.service.getById(id);

        this.bankView = this.data.Bank.AccountName ? `${this.data.Bank.AccountName} - A/C : ${this.data.Bank.AccountNumber}` : '';

        this.UPOResults = this.data.Details.map((detail) => {
            detail.Select = true;
            return detail;
        });

        let arg = {
            page: 1,
            size: Number.MAX_SAFE_INTEGER,
            filter: this.data.Supplier && this.data.Supplier.code ? JSON.stringify({ "Position": 7, "Currency": this.data.Bank.Currency.Code, "SupplierCode": this.data.Supplier.code, "IsPaid": false }) : JSON.stringify({ "Position": 7, "Currency": this.data.Bank.Currency.Code, "IsPaid": false }) //CASHIER DIVISION
        };

        let newData = await this.service.searchAllByPosition(arg)
            .then((result) => {
                let resultData = result.data && result.data.length > 0 ? result.data.filter((datum) => datum.PaymentMethod && datum.PaymentMethod.toLowerCase() != "cash" && datum.IsPosted == true) : [];
                
                return resultData;
            });

        if (newData.length > 0) {
            this.UPOResults = this.UPOResults.concat(newData);
        }

        for (var a of this.data.Details) {
            a.SupplierName = this.data.Supplier.Name;
            a.Currency = this.data.Bank.Currency.Code;
            a.PaymentDifference = a.TotalPaid - (a.AmountPaid + a.SupplierPayment);
        }

        this.IDR = false;
        this.sameCurrency = false;
        if (this.data.Bank.Currency.Code == "IDR") {
            this.IDR = true;
            if (this.data.CurrencyCode == "IDR") {
                this.sameCurrency = true;
            }

        }

        if (!this.IDR || this.sameCurrency) {
            this.collection = {
                columns: ['__check', 'No. SPB', 'Tanggal SPB', 'Tanggal Jatuh Tempo', 'Nomor BTU', 'Nomor Invoice', 'Supplier', 'Category', 'Divisi', 'PPN', 'PPh', 'Total Harga ((DPP + PPN) - PPh)', 'Mata Uang', 'Jumlah yang telah dibayar', 'Jumlah dibayar ke Supplier', 'Selisih pembayaran', ''],
            };
        }
        else {
            this.collection = {
                columns: ['__check', 'No. SPB', 'Tanggal SPB', 'Tanggal Jatuh Tempo', 'Nomor BTU', 'Nomor Invoice', 'Supplier', 'Category', 'Divisi', 'PPN', 'PPh', 'Total Harga ((DPP + PPN) - PPh)', 'Mata Uang', 'Total Harga ((DPP + PPN) - PPh) (IDR)', 'Mata Uang', 'Jumlah yang telah dibayar', 'Jumlah dibayar ke Supplier', 'Selisih pembayaran', ''],
            };
        }
        this.collectionOptions = {
            IDR: this.IDR,
            rate: this.data.CurrencyRate,
            SameCurrency: this.sameCurrency
        };
    }

    cancelCallback(event) {
        this.router.navigateToRoute('view', { id: this.data.Id });
    }

    saveCallback(event) {
        this.data.Details = this.UPOResults.filter((detail) => detail.Select);
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

    @bindable selectedSortOption;
    selectedSortOptionChanged(newValue, oldValue) {
        if (newValue)
            this.sortItems();
    }

    @bindable selectedSortTypeOption
    selectedSortTypeOptionChanged(newValue, oldValue) {
        if (newValue)
            this.sortItems();
    }

    sortItems() {
        if (this.UPOResults && this.UPOResults.length > 0) {
            if (this.selectedSortTypeOption == "A - Z") {
                switch (this.selectedSortOption) {
                    case "Tanggal Invoice":
                        this.UPOResults = this.UPOResults.sort((item1, item2) => {
                            if (item1.UPODate < item2.UPODate) {
                                return -1;
                            }
                            if (item1.UPODate > item2.UPODate) {
                                return 1;
                            }
                            return 0;
                        });
                        break;
                    case "Tanggal Jatuh Tempo":
                        this.UPOResults = this.UPOResults.sort((item1, item2) => {
                            if (item1.DueDate < item2.DueDate) {
                                return -1;
                            }
                            if (item1.DueDate > item2.DueDate) {
                                return 1;
                            }
                            return 0;
                        });
                        break;
                    default:
                        this.UPOResults = this.UPOResults.sort((item1, item2) => {
                            if (item1.UnitPaymentOrderNo < item2.UnitPaymentOrderNo) {
                                return -1;
                            }
                            if (item1.UnitPaymentOrderNo > item2.UnitPaymentOrderNo) {
                                return 1;
                            }
                            return 0;
                        });
                        break;
                }
            } else if (this.selectedSortTypeOption == "Z - A") {
                switch (this.selectedSortOption) {
                    case "Tanggal Invoice":
                        this.UPOResults = this.UPOResults.sort((item1, item2) => {
                            if (item1.UPODate > item2.UPODate) {
                                return -1;
                            }
                            if (item1.UPODate < item2.UPODate) {
                                return 1;
                            }
                            return 0;
                        });
                        break;
                    case "Tanggal Jatuh Tempo":
                        this.UPOResults = this.UPOResults.sort((item1, item2) => {
                            if (item1.DueDate > item2.DueDate) {
                                return -1;
                            }
                            if (item1.DueDate < item2.DueDate) {
                                return 1;
                            }
                            return 0;
                        });
                        break;
                    default:
                        this.UPOResults = this.UPOResults.sort((item1, item2) => {
                            if (item1.UnitPaymentOrderNo > item2.UnitPaymentOrderNo) {
                                return -1;
                            }
                            if (item1.UnitPaymentOrderNo < item2.UnitPaymentOrderNo) {
                                return 1;
                            }
                            return 0;
                        });
                        break;
                }
            }
        }

        // this.Item
        // if (this.ItemsCollection) {
        //     this.ItemsCollection.bind();
        // }

        if (this.ItemsCollectionRate)
            this.ItemsCollectionRate.bind();
    }

    get grandTotal() {
        let result = 0;
        let viewResult = 0;
        if (this.UPOResults && this.UPOResults.length > 0) {
            for (let detail of this.UPOResults) {
                if (detail.Select) {
                    result += detail.SupplierPayment;
                    viewResult += (detail.SupplierPayment * this.data.CurrencyRate);
                }

            }
        }
        // console.log(result);
        this.data.GrandTotal = result;
        if (this.IDR)
            return viewResult
        else
            return result;
    }

    onCheckAll(event) {
        for (var item of this.UPOResults) {
            item.Select = event.detail.target.checked;
        }
    }
}
