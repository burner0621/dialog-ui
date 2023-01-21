import { inject } from 'aurelia-framework';
import { Service } from './service';
import { Router } from 'aurelia-router';
import moment from 'moment';
import numeral from 'numeral';

@inject(Router, Service)
export class List {
    context = ['Hapus'];

    columns = [
        { field: 'DispositionNoteNo', title: 'No. Disposisi' },
        {
            field: 'DispositionNoteDate',
            title: 'Tanggal Disposisi',
            formatter: function (value, data, index) {
                return moment(value).format('DD MMM YYYY');
            },
        },
        {
            field: 'DispositionNoteDueDate',
            title: 'Tanggal Jatuh Tempo',
            formatter: function (value, data, index) {
                return moment(value).format('DD MMM YYYY');
            },
        },
        { field: 'SupplierName', title: 'Supplier' },
        { field: 'CurrencyCode', title: 'Mata Uang' },
        {
            field: "TotalPaid", title: "Total Bayar", formatter: function (value, data, index) {
                return numeral(value).format("0,000.00");
            }, align: "right"
        },
      { field: 'Remark', title: 'Keterangan' },
      { field: 'CreatedBy', title: 'Nama Staff Pembelian' }
    ];

    constructor(router, service) {
        this.service = service;
        this.router = router;
    }

    loader = (info) => {
        let order = {};
        if (info.sort)
            order[info.sort] = info.order;
        let arg = {
            page: parseInt(info.offset / info.limit, 10) + 1,
            size: info.limit,
            keyword: info.search,
            order: order
        };

        return this.service.search(arg)
            .then(result => {
                return {
                    total: result.info.total,
                    data: result.data
                }
            });
    }

    create() {
        this.router.navigateToRoute('create');
    }

    delete() {

    }

    contextClickCallback(event) {
        let arg = event.detail;
        let data = arg.data;
        switch (arg.name) {
            case "Hapus":
                this.service.sendToPurchasing(data)
                    .then(result => {
                        alert("Data berhasil dibuat");
                        this.tableList.refresh();
                    })
                    .catch(e => {
                        alert("Terjadi kesalahan!");
                        this.error = e;
                    });
                break;
        }
    }
}
