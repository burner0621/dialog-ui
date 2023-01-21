import { inject } from 'aurelia-framework';
import { Service } from './service';
import { Router } from 'aurelia-router';
import moment from 'moment';
import numeral from 'numeral';

@inject(Router, Service)
export class List {
    context = ["Detail"];

    columns = [
        {
            field: 'Date',
            title: 'Tanggal Cek',
            formatter: function (value, data, index) {
                return moment(value).format('DD MMM YYYY');
            }
        },
        { field: 'InternalNoteNo', title: 'No. Nota Intern' },
        {
            field: 'InternalNoteDate',
            title: 'Tanggal Nota Intern',
            formatter: function (value, data, index) {
                return moment(value).format('DD MMM YYYY');
            }
        },
        { field: 'SupplierName', title: 'Supplier' },
        {
            field: 'Status', title: 'Status', formatter: function (value, data, index) {
                return value != 'Kirim ke Pembelian (Not Verified)' ? 'Verified' : 'Not Verified';
            }
        },
        { field: 'Status', title: 'Dikirim ke?' },
        { field: 'Amount', title: 'Total Bayar',
        formatter: function (value, data, index) {
            return numeral(value).format("0,000.00");
          }
        },
        { field: 'CurrencyCode', title: 'Mata Uang' },
        {
            field: 'Status', title: 'Alasan', formatter: function (value, data, index) {
                return value != 'Kirim ke Pembelian (Not Verified)' ? data.Remark : data.SendToPurchasingRemark;
            }
        },
        { field: 'PaymentType', title: 'Tipe Pembayaran' },
        
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
            case "Detail":
                this.router.navigateToRoute('view', { id: data.Id });
                break;
        }
    }
}