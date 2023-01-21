import { inject } from 'aurelia-framework';
import PurchasingDocumentExpeditionService from '../shared/purchasing-document-expedition-service';
import { Router } from 'aurelia-router';
import moment from 'moment';
import numeral from 'numeral';

@inject(Router, PurchasingDocumentExpeditionService)
export class List {
    context = ['Rincian'];

    columns = [
        { field: 'UnitPaymentOrderNo', title: 'No. SPB' },
        {
            field: 'UPODate',
            title: 'Tanggal SPB',
            formatter: function(value, data, index) {
                return moment(value).format('DD MMM YYYY');
            },
        },
        {
            field: 'DueDate',
            title: 'Tanggal Jatuh Tempo',
            formatter: function(value, data, index) {
                return moment(value).format('DD MMM YYYY');
            },
        },
        { field: 'InvoiceNo', title: 'Nomor Invoice' },
        { field: 'SupplierName', title: 'Supplier' },
        { field: 'DivisionName', title: 'Divisi' },
        {
            field: 'TotalPaid',
            title: 'Total Bayar',
            formatter: function(value, data, index) {
                return numeral(value).format('0,000.00');
            },
            align: 'right'
        },
        { field: 'Currency', title: 'Mata Uang' },
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
            order: order,
            filter: JSON.stringify({ Position: 2 }), // SEND_TO_VERIFICATION_DIVISION
        };

        return this.service.search(arg)
            .then(result => {
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
        }
    }

    create() {
        this.router.navigateToRoute('create');
    }
}