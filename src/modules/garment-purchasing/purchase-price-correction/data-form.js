import { inject, bindable, computedFrom } from 'aurelia-framework'
import { Service } from "./service";
var moment = require("moment");
var SupplierLoader = require('../../../loader/garment-supplier-loader');

@inject(Service)
export class DataForm {
    @bindable readOnly = false;
    @bindable isView = false;
    @bindable data = {};
    @bindable error = {};
    @bindable title;
    @bindable deliveryOrder;
    @bindable correctionType;
    @bindable isUseVat = false;
    @bindable isUseIncomeTax = false;
    @bindable selectedSupplier;

    constructor(service) {
        this.service = service;

        this.formOptions = {
            cancelText: "Kembali"
        };

        this.typeData = ["Harga Satuan", "Harga Total"];

        this.controlOptions = {
            label: {
                length: 4
            },
            control: {
                length: 5
            }
        };

        this.deliveryOrderItem = {
            columns: [
                "Nomor PO Eksternal",
                "Nomor PR",
                "Nomor Ref PR",
                "Nomor RO",
                "Nama Barang",
                "Jumlah",
                "Satuan",
                "Harga Satuan",
                "Harga Total"
            ],
            onRemove: function () {
                this.bind();
            }
        };

        this.collectionOptions = {
            pricePerUnitReadOnly: true
        };

        this.itemsTemp = [];
    }

    bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;

        if (!this.readOnly) {
            this.deliveryOrderItem.columns.push({ header: "" });
        }
    }

    get supplierLoader() {
        return SupplierLoader;
    }

    supplierView = (supplier) => {
        var code=supplier.code? supplier.code : supplier.Code;
        var name=supplier.name? supplier.name : supplier.Name;
        return `${code} - ${name}`
    }

    selectedSupplierChanged(newValue) {
        var _selectedSupplier = newValue;
        if (_selectedSupplier) {
            this.filterDO={
                "BillNo != null": true,
                SupplierName:_selectedSupplier.name
            };
        }
        else{
            this.filterDO={};
            this.selectedSupplier=null;
            this.data.Items=[];
            this.itemsTemp = [];
            this.data.DONo=null;
            this.data.Supplier=null;
            this.context.supplierViewModel.editorValue = "";
            this.context.doViewModel.editorValue = "";
        }
        this.context.doViewModel.editorValue = "";
        this.deliveryOrder = null;
        this.data.Items = [];
        this.itemsTemp = [];
        this.data.Supplier=null;
    }

    get garmentDeliveryOrderLoader() {
        return (keyword) => {
            var info = {
                keyword: keyword,
                filter: JSON.stringify(this.filterDO),
                select: JSON.stringify({ "doNo": "DONo", "Id" : "1", "supplierName" : "SupplierName","doDate":"DODate" }),
                search: JSON.stringify([ "DONo" ]),
                order: {"DONo": "asc"}
            };
            return this.service.searchDeliveryOrder(info)
                .then((result) => {
                    return result.data.map(data => {
                        data.toString = function() { return `${this.doNo} - ${this.supplierName}`; };
                        
                        return data;
                    });
                });
        }
    }

    doView = (DO) => {
        return `${DO.doNo} - ${moment(DO.doDate).format("DD-MMM-YYYY")}` 
    }


    deliveryOrderChanged(newValue, oldValue) {
        this.collectionOptions.correction = false;

        if (newValue && newValue.Id) {
            this.service.getdeliveryOrderById(newValue.Id)
                .then(deliveryOrder => {
                    if(deliveryOrder.isCorrection) {
                        this.collectionOptions.correction = true;
                        this.collectionOptions.pricePerUnitFirst = true;
                    }

                    this.data.CorrectionDate = new Date(new Date().setHours(0, 0, 0, 0));

                    this.data.DOId = deliveryOrder.Id;
                    this.data.DONo = deliveryOrder.doNo;

                    this.data.Supplier = deliveryOrder.supplier;

                    this.data.Currency = deliveryOrder.docurrency;

                    this.data.UseVat = deliveryOrder.useVat;
                    this.data.Vat = deliveryOrder.vat;
                    
                    this.data.UseIncomeTax = deliveryOrder.useIncomeTax;
                    this.data.IncomeTax = deliveryOrder.incomeTax;

                    this.data.Items = [];
                    this.itemsTemp = [];
                    for(let item of deliveryOrder.items) {
                        for (let detail of item.fulfillments) {
                            let correctionNoteItem = {};

                            correctionNoteItem.DODetailId = detail.Id;
    
                            correctionNoteItem.EPOId = item.purchaseOrderExternal.Id;
                            correctionNoteItem.EPONo = item.purchaseOrderExternal.no;
    
                            correctionNoteItem.PRId = detail.pRId;
                            correctionNoteItem.PRNo = detail.pRNo;
    
                            correctionNoteItem.POId = detail.pOId;
                            correctionNoteItem.POSerialNumber = detail.poSerialNumber;
                            correctionNoteItem.RONo = detail.rONo;
    
                            correctionNoteItem.Product = detail.product;
    
                            correctionNoteItem.Quantity = parseFloat((detail.quantityCorrection - detail.returQuantity).toFixed(2));
    
                            correctionNoteItem.Uom = detail.purchaseOrderUom;
    
                            correctionNoteItem.PricePerDealUnitBefore = detail.pricePerDealUnitCorrection;
                            correctionNoteItem.PricePerDealUnitAfter = detail.pricePerDealUnitCorrection;
                            correctionNoteItem.PriceTotalBefore = parseFloat((detail.priceTotalCorrection).toFixed(2));
                            correctionNoteItem.PriceTotalAfter = parseFloat((detail.priceTotalCorrection).toFixed(2));
    
                            this.data.Items.push(correctionNoteItem);
                        }
                    }
                    this.itemsTemp = JSON.parse(JSON.stringify(this.data.Items)); /* Clone Array */

                    if (this.error) {
                        if(this.error.ItemsCount)
                            this.error.ItemsCount = null;
                        if(this.error.Items)
                            this.error.Items = null;
                    }
                });
        }
        else {
            this.data.DOId = null;
            this.data.Items = [];
            this.itemsTemp = [];
            this.context.doViewModel.editorValue = "";

            if (this.error) {
                if(this.error.ItemsCount)
                    this.error.ItemsCount = null;
                if(this.error.Items)
                    this.error.Items = null;
            }
        }
    }

    correctionTypeChanged(newValue, oldValue) {
        this.data.CorrectionType = newValue;

        if (this.data.CorrectionType === "Harga Satuan") {
            this.collectionOptions.pricePerUnitReadOnly = false;
            this.collectionOptions.pricePerUnitFirst = true;
        }
        else
            this.collectionOptions.pricePerUnitReadOnly = true;

        this.data.Items = JSON.parse(JSON.stringify(this.itemsTemp));

        if (this.error) {
            if(this.error.ItemsCount)
                this.error.ItemsCount = null;
            if(this.error.Items)
                this.error.Items = null;
        }
    }

    @computedFrom("data.DOId")
    get hasItems() {
        return this.data.Items ? this.data.Items.length > 0 : false;
    }
}
