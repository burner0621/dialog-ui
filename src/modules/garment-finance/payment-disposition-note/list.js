import { inject } from 'aurelia-framework';
import Service from './service';
import { Router } from 'aurelia-router';
import moment from 'moment';
import numeral from 'numeral';

@inject(Router, Service)
export class List {
    context = ['Rincian', 'Cetak PDF'];

    dataToBePosted = [];
    
    columns = [{
            field: "isPosting",
            title: "Post",
            checkbox: true,
            sortable: false,
            formatter: function(value, data, index) {
                this.checkboxEnabled = !data.IsPosted;
                // console.log(data)
                return ""
            }
        },
        { field: 'PaymentDispositionNo', title: 'No Bukti Pembayaran Disposisi' },
        {
            field: 'PaymentDate',
            title: 'Tanggal Pembayaran',
            formatter: function(value, data, index) {
                return moment(value).format('DD MMM YYYY');
            },
        },
        { field: 'dispositions', title: 'No Disposisi Pembayaran' },
        { field: 'Supplier.Name', title: 'Supplier' },
        {
            field: 'BankName',
            title: 'Bank',
            formatter: function(value, data, index) {
                return data ? `${data.AccountBank.BankName} - ${data.AccountBank.Currency.Code}` : '';
            }
        },
        {
            field: 'CurrencyCode',
            title: 'Mata Uang',
            formatter: function(value, data, index) {
                return value != "" ? value : "-";
            }
        },
        {
            field: 'TotalAmount',
            title: 'Amount',
            formatter: function(value, data, index) {
                return numeral(value).format('0,000.00');
            },
            align: 'right'
        },
        {
            field: 'TotalAmountIDR',
            title: 'Amount IDR',
            formatter: function(value, data, index) {
                return numeral(value).format('0,000.00');
            },
            align: 'right'
        },
        { field: 'paymentDueDates', title: 'Tanggal Jatuh Tempo' },
        { field: 'TransactionType', title: 'Jenis Transaksi' }
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
                console.log(result)
                if (result.data && result.data.length > 0) {
                    result.data = result.data.map((datum) => {
                        let listDispo = [];
                        let listDueDate = [];
                        let totalAmount= 0;
                        let totalAmountIDR= 0;
                        // console.log(datum.CurrencyRate)
                        for (let item of datum.Items) {
                            let existDispo = listDispo.find((disposisi) => disposisi == '- ' + item.DispositionNoteNo);
                            if (!existDispo) {
                                listDispo.push('- ' + item.DispositionNoteNo);
                            }

                            let existDueDate = listDueDate.find((dueDate) => dueDate == '- ' + moment(item.DispositionNoteDueDate).format('DD MMM YYYY'));
                            if (!existDueDate) {
                                listDueDate.push('- ' + moment(item.DispositionNoteDueDate).format('DD MMM YYYY'));
                            }
                            totalAmount +=item.TotalPaidPayment;
                            totalAmountIDR +=item.TotalPaidPayment * datum.CurrencyRate;
                        }

                        datum.dispositions = listDispo.join('\n');
                        datum.paymentDueDates = listDueDate.join('\n');
                        datum.TotalAmount= totalAmount;
                        datum.TotalAmountIDR= totalAmountIDR;                        
                        return datum;
                    })
                }


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

    posting() {
        if (this.dataToBePosted.length > 0) {
            var data = {
                ListIds: this.dataToBePosted.map(d => {
                    return {
                        Id: d.Id
                    }
                })
            }

            this.service.post(data)
                .then(result => {
                    this.tableList.refresh();
                }).catch(e => {
                    this.error = e;
                })
        }
    }
}