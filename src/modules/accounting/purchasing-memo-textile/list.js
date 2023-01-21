import { inject } from 'aurelia-framework';
import { Service } from './service';
import { Router } from 'aurelia-router';
import moment from 'moment';
import numeral from 'numeral';

@inject(Router, Service)
export class List {
    context = ['Rincian', 'Cetak PDF'];

    dataToBePosted = [];

    columns = [{
        field: "IsPosted",
        title: "Post",
        checkbox: true,
        sortable: false,
        formatter: function (value, data, index) {
            this.checkboxEnabled = !data.IsPosted;
            // console.log(data)
            return ""
        }
    },
    { field: 'MemoDetailDocumentNo', title: 'No Memo' },
    {
        field: 'MemoDetailDate',
        title: 'Tanggal',
        formatter: function (value, data, index) {
            return moment(value).format('DD MMM YYYY');
        },
    },
    { field: 'AccountingBookType', title: 'Jenis Buku' },
    { field: 'CurrencyCode', title: 'Mata Uang' },
    {
        field: 'TotalAmount',
        title: 'Nominal',
        formatter: function (value, data, index) {
            return numeral(value).format("0,000.00");
        },
    },
    { field: 'Remarks', title: 'Keterangan' }
    ];

    constructor(router, service) {
        this.service = service;
        this.router = router;
    }

    rowFormatter(data, index) {
        if (data.IsPosted)
            return { classes: "success" }
        else
            return {}
    }

    loader = (info) => {
        let order = {};

        if (info.sort)
            order[info.sort] = info.order;

        let arg = {
            page: parseInt(info.offset / info.limit, 10) + 1,
            size: info.limit,
            keyword: info.search,
            order: order,
        };

        return this.service.search(arg)
            .then(result => {
                // console.log(result);

                return {
                    total: result.info.total,
                    data: result.data
                }
            });
    }

    contextClickCallback(event) {
        let arg = event.detail;
        let data = arg.data;

        switch (arg.name) {
            case 'Rincian':
                this.router.navigateToRoute('view', { id: data.Id });
                break;
            case "Cetak PDF":
                this.service.getPdfById(data.Id);
                break;
        }
    }

    create() {
        this.router.navigateToRoute('create');
    }

    generateItems(details) {
        let result = details.map(d => {
            return {
                COAId: d.COA.Id,
                Remark: "",
                Debit: d.DebitNominal,
                Credit: d.CreditNominal,
            }
        })

        return result;
    }

    posting() {
        if (this.dataToBePosted.length > 0) {

            let dataParams = [];
            for (let i = 0; i < this.dataToBePosted.length; i++) {
                dataParams.push(this.dataToBePosted[i].Id);
            }

            this.service.posting({ Ids: dataParams })
                .then(result => {
                    alert("Data berhasil diposting");

                    this.tableList.refresh();
                })
                .catch(e => {
                    if (e.statusCode == 500) {
                        alert("Terjadi Kesalahan Pada Sistem!\nHarap Simpan Kembali!");
                    } else {
                        this.error = e;
                    }
                })
        }
    }
}