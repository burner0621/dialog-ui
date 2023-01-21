import { inject, bindable, computedFrom, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';
import { activationStrategy } from 'aurelia-router';
import moment from 'moment';

@inject(Router, Service)
export class Create {
    @bindable data = [];
    dataToBeSaved = [];
    tableOptions = {
        pagination: false,
        search: false,
        showColumns: false,
        showToggle: false
    };
    purchaseRequestTable;
    purchaseRequestColumns = [
        {
            field: "check", title: " ", checkbox: true, sortable: false,
            formatter: function (value, data, index) {
                this.checkboxEnabled = !data.check;
                return ""
            }
        },
        { title: "Nomor RO", field: "RONo" },
        { title: "Nomor PR", field: "PRNo" },
        { title: "Nomor Ref. PO", field: "Items.0.PO_SerialNumber" },
        { title: "Buyer", field: "Buyer.Name" },
        { title: "Unit", field: "Unit.Name" },
        { title: "Artikel", field: "Article" },
        { title: "K e t e r a n g a n", field: "Items.0.ProductRemark" },
        {
            title: "Tgl. Shipment", field: "ShipmentDate", formatter: function (value, data, index) {
                return moment(value).format("DD MMM YYYY");
            }
        },
        { title: "Nama Barang", field: "Items.0.Product.Name" },
        { title: "Jumlah", field: "Items.0.Quantity", formatter: function (value) { return value.toFixed(2) } },
        { title: "Satuan", field: "Items.0.Uom.Unit" }
    ];
    controlOptions = {
        control: {
            length: 12
        }
    };
    label = "Periode Tgl. Shipment"
    constructor(router, service) {
        this.router = router;
        this.service = service;
    }

    cancel(event) {
        if (confirm(`Apakah Anda yakin akan kembali?`))
            this.router.navigateToRoute('list');
    }

    determineActivationStrategy() {
        return activationStrategy.replace; //replace the viewmodel with a new instance
        // or activationStrategy.invokeLifecycle to invoke router lifecycle methods on the existing VM
        // or activationStrategy.noChange to explicitly use the default behavior
    }

    save(event) {
        if (this.dataToBeSaved.length === 0) {
            alert(`Purchase Request belum dipilih`);
        }
        else {
            this.service.create(this.dataToBeSaved)
                .then(result => {
                    alert(`${this.dataToBeSaved.length} data berhasil ditambahkan`);
                    this.router.navigateToRoute('create', {}, { replace: true, trigger: true });
                })
                .catch(e => {
                    this.error = e;
                })
        }
    }

    search() {
        this.service.searchByTags(this.keywords, this.shipmentDateFrom, this.shipmentDateTo)
            .then(result => {
                this.data = result.data;
                this.data
                    .map((data) => {
                        data.check = false;
                    });
                this.purchaseRequestTable.data = this.data;
                this.purchaseRequestTable.refresh();
            })
            .catch(e => {
                this.error = e;
            })
    }
}