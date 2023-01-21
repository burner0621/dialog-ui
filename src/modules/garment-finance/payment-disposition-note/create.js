import { inject, bindable, computedFrom } from 'aurelia-framework';
import { Dialog } from '../../../components/dialog/dialog';
import { Router } from 'aurelia-router';
import { AzureService } from './service';
import { activationStrategy } from 'aurelia-router';

import SupplierLoader from '../../../loader/garment-supplier-loader';
import BankLoader from '../../../loader/account-banks-loader';

import CurrencyLoader from '../../../loader/garment-currencies-bi-by-latest-date-loader';
import Service from './service';

@inject(Router, Service, Dialog)
export class Create {
    controlOptions = {
        label: {
            length: 4,
        },
        control: {
            length: 4,
        },
    };

    transactionTypeOptions = ["", "Operasional", "Investasi"]

    formOptions = {
        cancelText: 'Kembali',
        saveText: 'Simpan',
    };

    constructor(router, service, dialog) {
        this.router = router;
        this.service = service;
        this.dialog = dialog;
        this.data = {};
        this.collection = {
            columns: ['__check', 'No. Disposisi', 'Tanggal Disposisi', 'Tanggal Jatuh Tempo', 'Nomor Proforma/Invoice', 'Supplier', 'Kategori', 'PPN', 'Total Pembayaran','Total Yang dibayar','Selisih Total Yang Dibayar','Total Yang sudah dibayar', 'Mata Uang', ''],
        };
        

        this.collectionOptions = {
            IDR: this.IDR,
            rate: this.data.CurrencyRate,
            SameCurrency: this.sameCurrency
        };

        this.sameCurrencyValue = true;
        this.bankCurrency = null;
        this.currencyCodeValue = null;
    }

    determineActivationStrategy() {
        return activationStrategy.replace;
    }

    cancelCallback(event) {
        this.router.navigateToRoute('list');
    }

    onCheckAll(event) {
        for (var item of this.Items) {
            item.Select = event.detail.target.checked;
        }
    }

    saveCallback(event) {
        console.log(this.data);
        this.data.Items = this.Items.filter((item) => item.Select);
        if (this.data.CurrencyRate == "") {
            this.data.CurrencyRate = 0;
        }
        var dataPrep = this.data;

        this.dialog.prompt("Apakah anda yakin akan menyimpan data?", "Simpan Data")
            .then(response => {
                if (response == "ok") {
                    console.log("Datasaved",dataPrep);
                    
                    this.service.create(dataPrep)
                        .then(result => {
                            alert('Data berhasil dibuat');
                            this.router.navigateToRoute('create', {}, { replace: true, trigger: true });
                        })
                        .catch(e => {
                            this.error = e;
                        });
                }
            });
    }

    get supplierLoader() {
        return SupplierLoader;
    }

    get bankLoader() {
        return BankLoader;
    }

    get currencyLoader() {
        return CurrencyLoader;
    }

    @bindable selectedSupplier;
    async selectedSupplierChanged(newVal, oldVal) {
        console.log("selected supplier",newVal);
        this.data.Supplier = newVal;
        if (newVal) {
            this.data.Supplier.Id = newVal.Id;
            this.data.Supplier.Name = newVal.name;
            this.data.Supplier.Code = newVal.code;
            this.data.Supplier.Import = newVal.import;
            if (this.selectedBank && this.selectedBank.Currency.Code) {
                var currency = this.data.CurrencyCode ? this.data.CurrencyCode : this.selectedBank.Currency.Code;
                let arg = {
                    page: 1,
                    size: 1000,
                    filter: JSON.stringify({ "CurrencyCode": currency, "SupplierId": newVal.Id, "IsPaid": false, "Position": "5" }),
                    CurrencyCode: currency,
                    SupplierId: newVal.Id,
                    Position: 5
                };
                await this.DispositionData(arg);
            }
            // this.collectionOptions = {
            //     IDR: this.IDR,
            //     rate: this.data.CurrencyRate,
            //     SameCurrency: this.sameCurrency
            // };
        }
    }

    @computedFrom("selectedBank && selectedSupplier")
    get isExistBankAndSupplier() {
        if (this.selectedBank && this.selectedSupplier)
            return true;
        else
            return false;
    }

    async DispositionData(arg) {
        // console.log("parameter search",arg)
        this.Items = await this.service.searchDispoEx(arg)
            .then((result) => {
                var expeditionDatas = [];
                console.log("dispoResult",result);
                for (var ex of result.data) {
                    ex.purchasingDispositionExpeditionId = ex.Id;
                    ex.Id =0;
                    // delete ex.Id;
                    // for (var exItem of ex.items) {
                    //     exItem.purchasingDispositionExpeditionItemId = exItem.Id;
                    //     delete exItem.Id;
                    // }
                    // console.log("Total paid",ex.TotalPaid )
                    // console.log("Total PaidBefore",ex.TotalPaidPaymentBefore)
                    // ex.DiffTotalPaidPayment=parseFloat(0);
                    expeditionDatas.push(ex);
                }
                console.log("expeditionDatas", expeditionDatas);
                return expeditionDatas;
            });
    }


    // isExistBankAndSupplier = false;
    Items = [];
    currency = "";
    @bindable selectedBank;
    async selectedBankChanged(newVal) {
        this.data.AccountBank = newVal;
     //   this.IDR = false;
        if (newVal) {
            if (this.selectedSupplier) {
                let arg = {
                    page: 1,
                    size: 1000,
                    filter: JSON.stringify({ "CurrencyCode": this.selectedBank.Currency.Code, "SupplierId": this.selectedSupplier.Id, "IsPaid": false, "Position": "5" }),
                    CurrencyCode: this.selectedCurrency.code,
                    SupplierId: this.selectedSupplier.Id,
                    Position: 5
                };
                await this.DispositionData(arg);
            }
            this.bankCurrency = newVal.Currency.Code;
            if (this.bankCurrency == "IDR" && this.currencyCodeValue != "IDR" && this.currencyCodeValue != null){
                this.sameCurrencyValue = false;
            }
            else{
                this.sameCurrencyValue = true;
            }
            //this.isExistBankAndSupplier = true;
            // this.currency = newVal.Currency.Code;
            // if (this.currency == "IDR") {
            //     this.IDR = true;
            // }
            // if (!this.IDR || this.sameCurrency) {
            //     this.collection = {
            //         columns: ['__check', 'No. Disposisi', 'Tanggal Disposisi', 'Tanggal Jatuh Tempo', 'Nomor Proforma/Invoice', 'Supplier', 'Kategori', 'Divisi', 'PPN', 'Jumlah dibayar ke Supplier', 'Mata Uang', ''],
            //     };

            //     this.data.CurrencyCode = this.currency;
            //     this.data.CurrencyId = newVal.Currency.Id;
            //     this.data.CurrencyRate = newVal.Currency.Rate;
            // } else {
            //     this.collection = {
            //         columns: ['__check', 'No. Disposisi', 'Tanggal Disposisi', 'Tanggal Jatuh Tempo', 'Nomor Proforma/Invoice', 'Supplier', 'Kategori', 'Divisi', 'PPN', 'Jumlah dibayar ke Supplier', 'Mata Uang', 'Jumlah dibayar ke Supplier(IDR)', 'Mata Uang', ''],
            //     };
            // }
            this.collectionOptions = {
                IDR: this.IDR,
                rate: this.data.CurrencyRate,
                SameCurrency: this.sameCurrency
            };
        } else {
            this.currency = "";
            this.Items = [];
            this.data.CurrencyCode = "";
            this.data.CurrencyId = 0;
            this.data.CurrencyRate = 0;
            this.data.Supplier = null;
            this.selectedCurrency = null;
            this.selectedSupplier = null;
        }
    }

    @bindable selectedCurrency;
    async selectedCurrencyChanged(newVal) {
        this.data.CurrencyRate = 0;
        if (newVal) {
            this.data.CurrencyCode = newVal.code;
            this.data.CurrencyId = newVal.Id;
            this.data.CurrencyRate = newVal.rate;
            this.currencyCodeValue = this.data.CurrencyCode;
            // if (newVal.Code == "IDR") {
            //     this.sameCurrency = true;
            //     this.data.CurrencyRate = 1;
            // }
            if (this.selectedSupplier) {
                let arg = {
                    page: 1,
                    size: Number.MAX_SAFE_INTEGER,
                    filter: JSON.stringify({ "CurrencyCode": this.data.CurrencyCode, "SupplierId": this.selectedSupplier.Id, "IsPaid": false, "Position": "5" }),
                    CurrencyCode: this.data.CurrencyCode,
                    SupplierId: this.selectedSupplier.Id,
                    Position: 5
                };
                await this.DispositionData(arg);
            }
            if (this.bankCurrency == "IDR" && this.currencyCodeValue != "IDR" && this.currencyCodeValue != null){
                this.sameCurrencyValue = false;
            }
            else{
                this.sameCurrencyValue = true;
            }
            // if (!this.IDR || this.sameCurrency) {
            //     this.collection = {
            //         columns: ['__check', 'No. Disposisi', 'Tanggal Disposisi', 'Tanggal Jatuh Tempo', 'Nomor Proforma/Invoice', 'Supplier', 'Kategori', 'Divisi', 'PPN', 'Jumlah dibayar ke Supplier', 'Mata Uang', ''],
            //     };
            // } else {
            //     this.collection = {
            //         columns: ['__check', 'No. Disposisi', 'Tanggal Disposisi', 'Tanggal Jatuh Tempo', 'Nomor Proforma/Invoice', 'Supplier', 'Kategori', 'Divisi', 'PPN', 'Jumlah dibayar ke Supplier', 'Mata Uang', 'Jumlah dibayar ke Supplier(IDR)', 'Mata Uang', ''],
            //     };
            // }
            // this.collectionOptions = {
            //     IDR: this.IDR,
            //     rate: this.data.CurrencyRate,
            //     SameCurrency: this.sameCurrency
            // };
        } else {
            this.data.CurrencyCode = null;
            this.data.CurrencyId = 0;
            this.sameCurrency = false;
            this.data.CurrencyRate = 0;
        }
    }

    // async rateChanged(e) {
    //     this.collectionOptions = {
    //         IDR: this.IDR,
    //         rate: parseFloat(e.srcElement.value),
    //         SameCurrency: this.sameCurrency
    //     };
    //     this.data.CurrencyRate = parseFloat(e.srcElement.value);
    //     if (this.selectedBank && this.selectedBank.Currency.Code && this.selectedSupplier) {
    //         var currency = this.data.CurrencyCode ? this.data.CurrencyCode : this.selectedBank.Currency.Code;
    //         let arg = {
    //             page: 1,
    //             size: Number.MAX_SAFE_INTEGER,
    //             filter: JSON.stringify({ "CurrencyCode": currency, "SupplierCode": this.selectedSupplier.code, "IsPaid": false, "Position": "7" }) //CASHIER DIVISION
    //         };
    //         await this.DispositionData(arg);
    //     }
    // }

    get grandTotal() {
        let result = 0;
        let viewResult = 0;
        if (this.Items && this.Items.length > 0) {
            for (let detail of this.Items) {
                if (detail.Select) {
                    result += detail.TotalPaidPayment;
                    viewResult += (detail.TotalPaidPayment * this.data.CurrencyRate);
                }
            }
        }
        //this.data.Amount = result;
        if (this.data.CurrencyCode==="IDR")
            return viewResult
        else
            return result;
    }

    bankView(bank) {
        return bank.AccountName ? `${bank.AccountName} - ${bank.BankName} - ${bank.AccountNumber} - ${bank.Currency.Code}` : '';
    }

    supplierView(supp) {
        return `${supp.code}-${supp.name}`;
    }

    currencyView(currency) {
        return `${currency.code}`;
    }
}
