import { inject } from 'aurelia-framework';
import Service from './service';
import { Router } from 'aurelia-router';
import moment from 'moment';
import numeral from 'numeral';

@inject(Router, Service)
export class List {
    context = ['Rincian', 'Cetak PDF'];

    rowFormatter(data, index) {
        if (data.IsPosted)
            return { classes: "success" }
        else
            return {}
    }

    columns = [{
            field: "IsPosted",
            title: "IsPosted Checkbox",
            checkbox: true,
            sortable: false,
            formatter: function(value, data, index) {
                this.checkboxEnabled = !data.IsPosted;
                return ""
            }
        },
        { field: 'DocumentNo', title: 'No. Bukti Pengeluaran Bank' },
        {
            field: 'Date',
            title: 'Tanggal',
            formatter: function(value, data, index) {
                console.log("dateValue", value);
                return moment(value).format('DD MMM YYYY');
            },
        },
        {
            field: 'BankName',
            title: 'Bank',
            formatter: function(value, data, index) {
                return data ? `${data.BankAccountName} - A/C : ${data.BankAccountNumber}` : '';
            }
        },
        {
            field: 'GrandTotal',
            title: 'Total DPP+PPN',
            formatter: function(value, data, index) {
                return numeral(value).format('0,000.00');
            },
            align: 'right'
        },
        { field: 'BankCurrencyCode', title: 'Mata Uang' },
        { field: 'suppliers', title: 'Supplier' },
        { field: 'uRNNo', title: 'Nomor BTU' },
        { field: 'unitPaymentOrders', title: 'Nomor SPB' }
    ];

    constructor(router, service) {
        this.service = service;
        this.router = router;
        this.selectedItems = [];
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

                // let distinctData =
                if (result.data && result.data.length > 0) {
                    result.data = result.data.map((datum) => {
                        let listSupplier = [];
                        let listUnitPaymentOrderNo = [];
                        let listURNNo = [];

                        for (let detail of datum.Details) {
                            for (let item of detail.Items) {
                                if (item.URNNo != null)
                                    listURNNo.push('- ' + item.URNNo);
                            }

                            let existSupplier = listSupplier.find((supplier) => supplier == '- ' + detail.SupplierName);
                            if (!existSupplier)
                                listSupplier.push('- ' + detail.SupplierName);

                            let existUnitPaymentOrderNo = listUnitPaymentOrderNo.find((unitPaymentOrderNo) => unitPaymentOrderNo == '- ' + detail.UnitPaymentOrderNo);
                            if (!existUnitPaymentOrderNo)
                                listUnitPaymentOrderNo.push('- ' + detail.UnitPaymentOrderNo);
                        }

                        datum.suppliers = listSupplier.join('\n');
                        datum.unitPaymentOrders = listUnitPaymentOrderNo.join('\n');
                        datum.uRNNo = listURNNo.join('\n');
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
        var items = this.selectedItems.map(s => s.Id);
        this.service.posting(items)
            .then(result => {
                if (result != "") {
                  alert("Data berhasil disimpan\n" + result + "telah di posting sebelumnya")
                }
                else {
                  alert("Data berhasil disimpan");
                }
                this.error = {};
                this.tableList.refresh();
                this.selectedItems = [];
            })
            .catch(e => {
                if (e.message) {
                    alert("Terjadi Kesalahan Pada Sistem!\nHarap Simpan Kembali!");
                }
                this.error = e;
            });
    }
}
