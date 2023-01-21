import { inject, bindable, computedFrom } from 'aurelia-framework';
import { Service, MongoService } from './service';
var UnitPaymentOrderLoader = require('../../../loader/unit-payment-order-loader');

@inject(Service, MongoService)
export class DataForm {

    @bindable readOnly; //false
    @bindable data = {};
    @bindable SPB;
    @bindable items = [];

    constructor(service, mongoService) {
        this.service = service;
        this.mongoService = mongoService;
        this.SPBQuery = { "position": 3 };

        this.selectSPB = [
            'division.name', 'division.code',
            'supplier.name', 'supplier.code',
            'currency.code',
            'category.code', 'category.name',
            'paymentMethod',
            'invoiceNo',
            'invoiceDate',
            'pibNo',
            'useVat', //pph
            'useIncomeTax', //ppn
            'no',
            'date',
            'remark',
            'items.unitReceiptNote.no',
            'items.unitReceiptNote.items.product.name',
            'items.unitReceiptNote.items.deliveredQuantity',
            'items.unitReceiptNote.items.deliveredUom.unit',
            'items.unitReceiptNote.items.pricePerDealUnit',
            'items.unitReceiptNote.items.correction.correctionNo',
            'items.unitReceiptNote.items.purchaseOrder.purchaseOrderExternal.no',
            'items.unitReceiptNote.items.purchaseOrder.purchaseRequest.no',
            'items.unitReceiptNote.items.currency.code'
        ];
    }

    bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;

        if (this.data && this.data._id) {
            this.SPB = this.data;
            this.mapItems(this.data);
        }

    }

    context = ["Rincian Purchase Request"];

    columns = [
        { field: "productName", title: "Nama Barang" },
        { field: "deliveredQuantity", title: "Jumlah" },
        { field: "pricePerDealUnit", title: "Harga Satuan" },
        { field: "totalPrice", title: "Harga Total" },
        { field: "currency", title: "Mata Uang" },
        { field: "no", title: "No Bon Terima Unit" },
        { field: "purchaseOrderExternalNo", title: "No PO Eksternal" },
        { field: "purchaseRequestNo", title: "No PR" },
        // { field: "correctionNo", title: "No Koreksi" },
    ]

    formOptions = {
        cancelText: "Kembali",
        saveText: "Simpan",
        editText: "Ubah",
        deleteText: "Hapus",
    };

    tableOptions = {
        search: false,
        showToggle: false,
        showColumns: false,
        pagination: false
    }

    controlOptions = {
        label: {
            length: 4
        },
        control: {
            length: 5
        }
    }

    numericOptions = {
        label: {
            length: 4
        },
        control: {
            length: 2
        }
    }


    SPBChanged(newValue, oldValue) {
        if (this.SPB) {
            console.log(this.SPB)
            var arg = {
                filter: JSON.stringify({ UnitPaymentOrderNo: this.SPB.no, Active : "true", IsDeleted : "false" })
            }

            this.data = Object.assign(this.data, this.SPB)
            this.service.search(arg)
                .then(response => {
                    var dataExpedition = response.data[0];
                    this.data.IncomeTax = dataExpedition.IncomeTax;
                    this.data.Vat = dataExpedition.Vat;
                    this.data.TotalPaid = dataExpedition.TotalPaid;
                });
            this.mapItems(this.data);

            this.data.UnitPaymentOrderNo = this.SPB.no;

        } else {
            this.data = {}
        }
    }

    mapItems(data) {
        console.log(data)
        var dataItems = [];
        for (var dataItem of data.items) {
            for (var unitItem of dataItem.unitReceiptNote.items) {
                var item = {};
                item.no = dataItem.unitReceiptNote.no;
                item.productName = unitItem.product.name;
                item.deliveredQuantity = unitItem.deliveredQuantity;
                item.currency = data.currency.code;
                item.pricePerDealUnit = unitItem.pricePerDealUnit;
                item.totalPrice = parseFloat(item.deliveredQuantity) * parseFloat(item.pricePerDealUnit);
                //item.correctionNo = unitItem.correction.correctionNo;
                item.purchaseOrderExternalNo = unitItem.EPONo;
                item.purchaseRequestNo = unitItem.PRNo;
                item.purchaseRequestId = unitItem.PRId;
                dataItems.push(item);
            }
        }
        this.items = dataItems;
    }

    get unitPaymentOrderLoader() {
        return UnitPaymentOrderLoader;
    }

}