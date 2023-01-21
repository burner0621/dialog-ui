import { inject, bindable, containerless, computedFrom, BindingEngine } from 'aurelia-framework'
import { Service } from "./service";
var SupplierLoader = require('../../../loader/garment-supplier-loader');
var CurrencyLoader = require('../../../loader/currency-loader');
var VatLoader = require('../../../loader/vat-loader');

@containerless()
@inject(Service, BindingEngine)
export class DataForm {
    @bindable readOnly = false;
    @bindable data = {};
    @bindable error = {};
    @bindable title;
    @bindable selectedSupplier;
    @bindable selectedCurrency;
    @bindable selectedVat;
    @bindable options = { isUseIncomeTax: false };
    keywords = ''
    // @bindable itemss=[];


    items = [];
    total=0
    termPaymentImportOptions = ['T/T PAYMENT', 'CMT', 'FREE FROM BUYER', 'SAMPLE'];
    termPaymentLocalOptions = ['DAN LIRIS', 'CMT', 'FREE FROM BUYER', 'SAMPLE'];
    typePaymentOptions = ['FREE', 'CASH', 'T/T AFTER', 'T/T BEFORE'];
    categoryOptions = ['FABRIC', 'ACCESSORIES']
    qualityStandardTypeOptions = ['JIS', 'AATCC', 'ISO']

    label = "Periode Tgl. Shipment"
    freightCostByOptions = ['Penjual', 'Pembeli'];
    controlOptions = {
        label: {
            length: 4
        },
        control: {
            length: 5
        }
    }


    tableOptions = {
        search: false,
        showToggle: false,
        showColumns: false,
        pagination: false
    }

    columns = [
        { title: "Nomor PR - No. Referensi PR - Article", field: "prNo" },
        { title: "Nomor RO", field: "roNo" },
        { title: "Barang", field: "product.Name" },
        { title: "Jumlah Diminta", field: "defaultQuantity" },
        { title: "Satuan Diminta", field: "defaultUom.Unit" },
        { title: "Jumlah Beli", field: "dealQuantity" },
        { title: "Jumlah Kecil", field: "quantityConversion" },
        { title: "Konversi", field: "quantityConversion" },
        { title: "Harga Budget", field: "budgetPrice" },
        { title: "Harga Satuan", field: "pricePerDealUnit" },
        // { title: "Include Ppn?", field: "roNo" },
        { title: "Keterangan", field: "remark" },
    ]

    columns2 = [
        { title: "Nomor PR - No. Referensi PR - Article", field: "prNo" },
    ]

    // items = {
    //     columns: [
    //         "Nomor PR - Nomor Referensi PR",
    //         "Nomor RO",
    //         "Barang",
    //         "Jumlah Diminta",
    //         "Satuan Diminta",
    //         "Jumlah Beli",
    //         "Satuan Beli",
    //         "Jumlah Kecil",
    //         "Satuan Kecil",
    //         "Konversi",
    //         "Harga Satuan",
    //         "Include Ppn?",
    //         "Keterangan"
    //     ],
    //     onRemove: function () {
    //         this.bind();
    //     }
    // };

    constructor(service, bindingEngine) {
        this.service = service;
        this.bindingEngine = bindingEngine;
    }

    bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;
        this.isItem = false;
        // this.itemss=[{prNo:"test"}]
        if (this.data.Category) {
            if (this.data.Category === "FABRIC") {
                this.isFabric = true;
            }
            else {
                this.isFabric = false;
            }
        }
        else {
            this.isFabric = true;
        }

        if (this.data.Items.length > 0) {
            this.isItem = true;
        }

        this.options.readOnly = this.readOnly;
        // if (this.data.useIncomeTax) {
        //     this.options.isUseIncomeTax = true;
        // }
        // if (this.data.paymentMethod === "CMT") {
        //     this.options.checkOverBudget = false;
        // }
        // else if (this.data.paymentMethod === "FREE FROM BUYER") {
        //     this.options.checkOverBudget = false;
        // }
        // else {
        //     this.options.checkOverBudget = true;
        // }
        // this.options.resetOverBudget = false;

        var item = [];
        var totalQty=0;
        for (var data of this.data.Items) {
            if(data.IsOverBudget){
                item.push({
                    poNo: data.PONo,
                    poId: data.POId,
                    prNo: `${data.PRNo} - ${data.PO_SerialNumber} - ${data.Article}` ,
                    prId: data.PRId,
                    prRefNo: data.PO_SerialNumber,
                    roNo: data.RONo,
                    artikel: data.artikel,
                    productId: data.Product.Id,
                    product: data.Product,
                    defaultQuantity: Number(data.DefaultQuantity).toFixed(2),
                    defaultUom: data.DefaultUom,
                    dealQuantity: Number(data.DealQuantity).toFixed(2),
                    dealUom: data.DealUom,
                    budgetPrice: Number(data.BudgetPrice).toFixed(4),
                    priceBeforeTax: Number(data.BudgetPrice).toFixed(4),
                    pricePerDealUnit: Number(data.PricePerDealUnit).toFixed(4),
                    isOverBudget: data.IsOverBudget,
                    uomConversion: data.SmallUom.Unit,
                    quantityConversion: Number(data.SmallQuantity).toFixed(2),
                    conversion: data.Conversion,
                    remark: data.OverBudgetRemark
                });
                totalQty+=data.DefaultQuantity;
            }
        }
        this.total=totalQty.toFixed(2);
        this.items = item;


    }

    rowFormatter(data, index) {

        if (index === 1) {
            return { classes: "weight" }
        } else {
            return {};
        }
    }


    @computedFrom("data.Supplier")
    get supplierType() {
        if (this.data.supplier) {
            if (this.data.Supplier.Import)
                return "Import"
            else
                return "Lokal"
        }
        else
            return "Lokal"
    }


} 