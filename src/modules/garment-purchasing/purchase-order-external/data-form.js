import { inject, bindable, containerless, computedFrom, BindingEngine } from 'aurelia-framework'
import { Service } from "./service";
var SupplierLoader = require('../../../loader/garment-supplier-loader');
var CurrencyLoader = require('../../../loader/garment-currencies-by-date-loader');
var IncomeTaxLoader = require('../../../loader/income-tax-loader');
var VatTaxLoader = require('../../../loader/vat-tax-loader');
import moment from 'moment';

@containerless()
@inject(Service, BindingEngine)
export class DataForm {
    @bindable readOnly = false;
    @bindable data = {};
    @bindable error = {};
    @bindable title;
    @bindable selectedSupplier;
    @bindable selectedCurrency;
    @bindable selectedIncomeTax;
    @bindable selectedVatTax;
    @bindable options = { isUseIncomeTax: false };
    keywords = ''
    @bindable kurs = {};

    termPaymentImportOptions = ['T/T PAYMENT', 'CMT', 'FREE FROM BUYER', 'SAMPLE'];
    termPaymentLocalOptions = ['DAN LIRIS', 'CMT', 'FREE FROM BUYER', 'SAMPLE'];
    typePaymentOptions = ['T/T AFTER', 'FREE', 'CASH', 'T/T BEFORE'];
    typePaymentStorageOptions = ['EX MASTER FREE', 'EX MASTER BELI', 'EX MASTER GUDANG'];
    categoryOptions = ['FABRIC', 'ACCESSORIES']
    qualityStandardTypeOptions = ['JIS', 'AATCC', 'ISO', 'AS']

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

    constructor(service, bindingEngine) {
        this.service = service;
        this.bindingEngine = bindingEngine;
    }

    async bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;
        this.isItem = false;

        if (!this.data.OrderDate) {
            this.data.OrderDate = new Date().toLocaleDateString();
        }

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

        if (this.data.Items)
            if (this.data.Items.length > 0) {
                this.isItem = true;
            }

        this.options.readOnly = this.readOnly;

        if (this.data.useVat) {
            this.options.isUseVat = true;
        }
        
        if (this.data.isIncomeTax) {
            this.options.isIncomeTax = true;
        }

        if (this.data.PaymentMethod === "CMT" && this.data.PaymentType === "FREE") {
            this.options.checkOverBudget = false;
        }

        else if (this.data.PaymentMethod === "FREE FROM BUYER" && this.data.PaymentType === "FREE") {
            this.options.checkOverBudget = false;
        }

        else if ((this.data.PaymentMethod === "FREE FROM BUYER" || this.data.PaymentMethod === "CMT") && this.data.PaymentType === "EX MASTER FREE") {
            this.options.checkOverBudget = false;
        }

        else {
            this.options.checkOverBudget = true;
        }

        this.options.resetOverBudget = false;

        if (this.data.Currency) {
            this.data.CurrencyRate = this.data.Currency.Rate;
        }
        //var kurs = await this.service.getKurs(this.data.Currency.Code, new Date(this.data.OrderDate).toLocaleDateString());
        //this.kurs=kurs[0];
        if (Object.getOwnPropertyNames(this.kurs).length > 0) {
            this.options.kurs = this.kurs;
        } else {
            this.options.kurs = { Rate: 1 };
        }

    }

    @computedFrom("data.Id")
    get isEdit() {
        return (this.data.Id || '').toString() != '';
    }

    @computedFrom("data.SupplierId")
    get supplierType() {
        if (this.data.Supplier) {
            if (this.data.Supplier.Import)
                return "Import"
            else
                return "Lokal"
        }
        else
            return "Lokal"
    }

    @computedFrom("data.SupplierId")
    get supplierIsImport() {
        if (this.data.Supplier) {
            if (this.data.Supplier.Import)
                return true
            else
                return false
        }
        else
            return false
    }

    @computedFrom("data.SupplierId")
    get supplierIsStorage() {
        if (this.data.Supplier) {
            if (this.data.Supplier.Name.toLowerCase() === "gudang")
                return true
            else
                return false
        }
        else
            return false
    }

    async selectedSupplierChanged(newValue) {
        var _selectedSupplier = newValue;
        if (_selectedSupplier.Id) {
            this.data.Supplier = _selectedSupplier;
            this.data.Supplier.Import = _selectedSupplier.import;
            this.data.Supplier.Code = _selectedSupplier.code;
            this.data.Supplier.Name = _selectedSupplier.name;
            this.data.Supplier.Id = _selectedSupplier.Id;
            this.data.SupplierId = _selectedSupplier.Id ? _selectedSupplier.Id : "";
            this.data.IsUseVat = _selectedSupplier.usevat;
            this.data.Vat = {};
            this.data.IsIncomeTax = _selectedSupplier.usetax;
            // this.data.IncomeTax = _selectedSupplier.IncomeTaxes;
            // this.data.IncomeTax.Name = _selectedSupplier.IncomeTaxes.name;
            // this.data.IncomeTax.Rate = _selectedSupplier.IncomeTaxes.Rate ? _selectedSupplier.IncomeTaxes.Rate : _selectedSupplier.IncomeTaxes.rate ? _selectedSupplier.IncomeTaxes.rate : 0;
            // this.data.IncomeTax.rate=this.data.IncomeTax.Rate;
            
            if(this.data.IsUseVat){

                let info = {
                    keyword:'',
                    order: '{ "Rate" : "desc" }',
                    size: 1,
                };

                var defaultVat = await this.service.getDefaultVat(info);
                console.log(defaultVat);

                if(defaultVat.length > 0){
                    if(defaultVat[0]){
                        if(defaultVat[0].Id){
                            this.data.Vat = defaultVat[0];
                            this.selectedVatTax = defaultVat[0];
                        }
                    }
                }
            } else{
                this.data.Vat = {};
                this.selectedVatTax = {};

            }
        }
    }

    async selectedCurrencyChanged(newValue) {
        this.data.Items = [];
        var _selectedCurrency = newValue;
        if (_selectedCurrency) {
            if (_selectedCurrency.Id) {
                this.data.Currency = _selectedCurrency;
                this.data.Currency.Rate = _selectedCurrency.rate ? _selectedCurrency.rate : _selectedCurrency.Rate;
                var CurrencyRate = parseInt(this.data.Currency.Rate ? this.data.Currency.Rate : 1, 10);
                this.data.Currency.Code = _selectedCurrency.Code ? _selectedCurrency.Code : _selectedCurrency.code;
                this.data.CurrencyRate = CurrencyRate;
                //var today=new Date();
                var kurs = await this.service.getKurs(this.data.Currency.Code, this.data.OrderDate);
                this.kurs = kurs[0];
                if (Object.getOwnPropertyNames(this.kurs).length <= 0) {
                    alert(`Kurs untuk mata uang ${this.data.Currency.Code} belum ditambahkan.`);
                    this.selectedCurrency = null;
                }
                this.options.kurs = this.kurs;

                this.data.BudgetRate = this.kurs.Rate;
            }
            else {
                this.data.Currency = null;
                this.data.CurrencyRate = 0;
            }
        }
        else {
            this.data.Currency = null;
            this.data.CurrencyRate = 0;
        }
    }

    selectedVatTaxChanged(newValue) {
        console.log(newValue);
        
        var _selectedVatTax = newValue;
        if (_selectedVatTax) {
            this.data.Vat = _selectedVatTax;
        } else {
            this.data.Vat = {};
        }
    }

    categoryChanged(e) {
        var selectedCategory = e.srcElement.value;
        if (selectedCategory) {
            this.data.Category = selectedCategory;

            this.data.Shrinkage = '';
            this.data.WetRubbing = '';
            this.data.DryRubbing = '';
            this.data.Washing = '';
            this.data.DarkPrespiration = '';
            this.data.LightMedPrespiration = '';
            this.data.PieceLength = '';
            this.data.QualityStandardType = 'JIS';

            if (this.data.Category === "FABRIC") {
                this.isFabric = true;
            }
            else {
                this.isFabric = false;
            }
            this.data.Items = [];
        }
    }

    paymentMethodChanged(e) {
        var selectedPayment = e.srcElement.value;
        if (selectedPayment) {
            this.data.PaymentMethod = selectedPayment;
        }
        if (this.data.PaymentMethod === "CMT" && this.data.PaymentType === "FREE") {
            this.options.checkOverBudget = false;
            this.resetIsOverBudget();
        }
        else if (this.data.PaymentMethod === "FREE FROM BUYER" && this.data.PaymentType === "FREE") {
            this.options.checkOverBudget = false;
            this.resetIsOverBudget();
        }
        else if ((this.data.PaymentMethod === "FREE FROM BUYER" || this.data.PaymentMethod === "CMT") && this.data.PaymentType === "EX MASTER FREE") {
            this.options.checkOverBudget = false;
            this.resetIsOverBudget();
        }
        else {
            this.options.resetOverBudget = false;
            this.options.checkOverBudget = true;
            this.checkOverBudgetAll();
        }
    }

    resetIsOverBudget() {
        if (this.data.Items) {
            this.data.Items.map(items => {
                items.IsOverBudget = false;
                items.OverBudgetRemark = "";
            })
            this.options.resetOverBudget = true;
            this.context.DetailsCollection.bind();
        }
    }
    
    paymentTypeChanged(e) {
        var selectedPayment = e.srcElement.value;
        if (selectedPayment) {
            this.data.PaymentType = selectedPayment;
            if (this.data.PaymentType == "CASH" || this.data.PaymentType == "T/T BEFORE") {
                this.data.PaymentDueDays = 0;
            }

            if (this.data.PaymentMethod === "CMT" && this.data.PaymentType === "FREE") {
                this.options.checkOverBudget = false;
                this.resetIsOverBudget();
            }
            else if (this.data.PaymentMethod === "FREE FROM BUYER" && this.data.PaymentType === "FREE") {
                this.options.checkOverBudget = false;
                this.resetIsOverBudget();
            }
            else if ((this.data.PaymentMethod === "FREE FROM BUYER" || this.data.PaymentMethod === "CMT") && this.data.PaymentType === "EX MASTER FREE") {
                this.options.checkOverBudget = false;
                this.resetIsOverBudget();
            }
            else {
                this.options.resetOverBudget = false;
                this.options.checkOverBudget = true;
                this.checkOverBudgetAll();
            }
        }
    }

    selectedIncomeTaxChanged(newValue) {
        console.log(newValue);       
        var _selectedIncomeTax = newValue;
        if (!_selectedIncomeTax) {
            this.data.IncomeTaxRate = 0;
            this.data.UseIncomeTax = false;
            this.data.IncomeTax = {};
        } else if (_selectedIncomeTax.Id) {            
            console.log(_selectedIncomeTax);
            this.data.IncomeTaxRate = _selectedIncomeTax.rate ? _selectedIncomeTax.rate : 0;
            this.data.UseIncomeTax = true;
            this.data.IncomeTax = _selectedIncomeTax;
            this.data.IncomeTaxId = _selectedIncomeTax.Id;  
        }
    }

    useVatChanged(e) {
        var selectedUseVat = e.srcElement.checked || false;
        if (!selectedUseVat) {
            this.options.isUseVat = false;
            for (var poItem of this.data.Items) {
                poItem.UseVat = false;
            }
        } else {
           this.options.isUseVat = true;
        }
    }

    get supplierLoader() {
        return SupplierLoader;
    }

    get currencyLoader() {
        return CurrencyLoader;
    }

    get incomeTaxLoader() {
        return IncomeTaxLoader;
    }

    get vatTaxLoader() {
        return VatTaxLoader;
    }

    supplierView = (supplier) => {
        var code = supplier.code ? supplier.code : supplier.Code;
        var name = supplier.name ? supplier.name : supplier.Name;
        return `${code} - ${name}`
    }

    currencyView = (currency) => {
        var code = currency.code ? currency.code : currency.Code;
        return code;
    }

    incomeTaxView = (incomeTax) => {
        var rate = incomeTax.rate ? incomeTax.rate : incomeTax.Rate;
        var name = incomeTax.name ? incomeTax.name : incomeTax.Name;
        return `${name} - ${rate}`
    }

    vatTaxView = (vatTax) => {
        var rate = vatTax.rate ? vatTax.rate : vatTax.Rate;
        return `${rate}`
    }

    async search() {

        var result = await this.service.searchByTags(this.keywords, this.data.Category, this.context.shipmentDateFrom, this.context.shipmentDateTo);
        var items = [];
        var pr = [];
        var index = 0;
        for (var data of result.data) {
            for (var item of data.Items) {
                if (pr.length == 0) {
                    // item.RemainingBudget=pr[item.PRNo];

                    items.push({
                        index: index++,
                        PONo: data.PONo,
                        POId: data.Id,
                        PRNo: data.PRNo,
                        PRId: data.PRId,
                        PO_SerialNumber: item.PO_SerialNumber,
                        RONo: data.RONo,
                        Article: data.Article,
                        Product: item.Product,
                        DefaultQuantity: parseFloat(item.Quantity).toFixed(2),
                        DefaultUom: item.Uom,
                        DealQuantity: Number(item.Quantity),
                        DealUom: item.Uom,
                        BudgetPrice: Number(item.BudgetPrice),
                        PriceBeforeTax: Number(item.BudgetPrice),
                        PricePerDealUnit: Number(item.BudgetPrice),
                        budgetUsed: item.BudgetPrice * item.Quantity,
                        remainingBudget: item.RemainingBudget,
                        IsOverBudget: false,
                        totalBudget: item.BudgetPrice * item.Quantity,
                        RemainingBudget: item.RemainingBudget,
                        Conversion: 1,
                        Remark: item.ProductRemark,
                        Initial: parseFloat(item.RemainingBudget.toFixed(4))
                    });

                    pr[item.PRNo + item.PO_SerialNumber + item.Product.Id] = item.RemainingBudget - item.budgetUsed;
                }
                else {
                    var dup = items.find(a => a.PRNo == item.PRNo && item.Product.Id == a.Product.Id && a.PO_SerialNumber == item.PO_SerialNumber);
                    if (dup) {
                        item.RemainingBudget = pr[item.PRNo + item.PO_SerialNumber + item.Product.Id];
                        pr[item.PRNo + item.PO_SerialNumber + item.Product.Id] = item.RemainingBudget - (item.BudgetPrice * item.Quantity);
                    }
                    else {
                        pr[item.PRNo + item.PO_SerialNumber + item.Product.Id] = item.RemainingBudget - (item.BudgetPrice * item.Quantity);
                        //item.RemainingBudget=pr[item.PRNo];
                    }

                    items.push({
                        PONo: data.PONo,
                        POId: data.Id,
                        PRNo: data.PRNo,
                        PRId: data.PRId,
                        PO_SerialNumber: item.PO_SerialNumber,
                        RONo: data.RONo,
                        Article: data.Article,
                        Product: item.Product,
                        DefaultQuantity: parseFloat(item.Quantity).toFixed(2),
                        DefaultUom: item.Uom,
                        DealQuantity: Number(item.Quantity),
                        DealUom: item.Uom,
                        BudgetPrice: Number(item.BudgetPrice),
                        PriceBeforeTax: Number(item.BudgetPrice),
                        PricePerDealUnit: Number(item.BudgetPrice),
                        budgetUsed: item.BudgetPrice * item.Quantity,
                        remainingBudget: item.RemainingBudget,
                        IsOverBudget: false,
                        totalBudget: item.BudgetPrice * item.Quantity,
                        Conversion: 1,
                        Remark: item.ProductRemark,
                        Initial: parseFloat(item.RemainingBudget.toFixed(4))
                    });
                }

            }

        }
        items = [].concat.apply([], items);
        this.data.Items = items;
        this.isItem = true;
    }

    items = {
        columns: [
            "Nomor PR - No. Referensi PR - Article",
            "Nomor RO",
            "Barang",
            "Jumlah Diminta",
            "Satuan Diminta",
            "Jumlah Beli",
            "Satuan Beli",
            "Jumlah Kecil",
            "Satuan Kecil",
            "Konversi",
            "Harga Satuan",
            "Include Ppn?",
            "Keterangan"],
        onRemove: function () {
            this.bind();
            if (this.items) {

                var pr = [];
                var remaining = [];
                var items = [];
                for (var a of this.items) {
                    if (pr.length == 0) {
                        pr.push(a);
                        //a.budgetUsed=a.PricePerDealUnit*a.DealQuantity*this.kurs.Rate;
                        a.remainingBudget = a.Initial;
                        remaining[a.PRNo + a.Product.Id + a.PO_SerialNumber] = a.Initial - parseFloat(a.budgetUsed.toFixed(4));
                        a.RemainingBudget = parseFloat(remaining[a.PRNo + a.Product.Id + a.PO_SerialNumber].toFixed(4));
                        //a.remainingBudget=remaining[a.PRNo + a.Product.Id]-a.budgetUsed;
                        //remaining[a.PRNo + a.Product.Id]=a.remainingBudget;
                    }
                    else {
                        var dup = pr.find(b => b.PRNo == a.PRNo && b.Product.Id == a.Product.Id && a.PO_SerialNumber == b.PO_SerialNumber);
                        if (dup) {
                            //a.budgetUsed=a.PricePerDealUnit*a.DealQuantity*this.kurs.Rate;
                            a.remainingBudget = remaining[a.PRNo + a.Product.Id + a.PO_SerialNumber];
                            remaining[a.PRNo + a.Product.Id + a.PO_SerialNumber] = a.remainingBudget - parseFloat(a.budgetUsed.toFixed(4));
                            a.RemainingBudget = parseFloat(remaining[a.PRNo + a.Product.Id + a.PO_SerialNumber].toFixed(4));
                        }
                        else {
                            pr.push(a);
                            //a.budgetUsed=a.PricePerDealUnit*a.DealQuantity*this.kurs.Rate;
                            a.remainingBudget = a.Initial;
                            remaining[a.PRNo + a.Product.Id + a.PO_SerialNumber] = a.Initial - parseFloat(a.budgetUsed.toFixed(4));
                            a.RemainingBudget = parseFloat(remaining[a.PRNo + a.Product.Id + a.PO_SerialNumber].toFixed(4));
                        }
                    }
                    if (a.RemainingBudget < 0) {
                        a.IsOverBudget = true;
                    }
                    else {
                        a.IsOverBudget = false;
                    }
                }
            }
        }
    };

    checkOverBudgetAll() {
        if (this.data.Items) {

            var pr = [];
            var remaining = [];
            var items = [];
            for (var a of this.data.Items) {
                if (pr.length == 0) {
                    pr.push(a);
                    //a.budgetUsed=a.PricePerDealUnit*a.DealQuantity*this.kurs.Rate;
                    a.remainingBudget = a.Initial;
                    remaining[a.PRNo + a.Product.Id + a.PO_SerialNumber] = a.Initial - parseFloat(a.budgetUsed.toFixed(4));
                    a.RemainingBudget = parseFloat(remaining[a.PRNo + a.Product.Id + a.PO_SerialNumber].toFixed(4));
                    //a.remainingBudget=remaining[a.PRNo + a.Product.Id]-a.budgetUsed;
                    //remaining[a.PRNo + a.Product.Id]=a.remainingBudget;
                }
                else {
                    var dup = pr.find(b => b.PRNo == a.PRNo && b.Product.Id == a.Product.Id && a.PO_SerialNumber == b.PO_SerialNumber);
                    if (dup) {
                        //a.budgetUsed=a.PricePerDealUnit*a.DealQuantity*this.kurs.Rate;
                        a.remainingBudget = remaining[a.PRNo + a.Product.Id + a.PO_SerialNumber];
                        remaining[a.PRNo + a.Product.Id + a.PO_SerialNumber] = a.remainingBudget - parseFloat(a.budgetUsed.toFixed(4));
                        a.RemainingBudget = parseFloat(remaining[a.PRNo + a.Product.Id + a.PO_SerialNumber].toFixed(4));
                    }
                    else {
                        pr.push(a);
                        //a.budgetUsed=a.PricePerDealUnit*a.DealQuantity*this.kurs.Rate;
                        a.remainingBudget = a.Initial;
                        remaining[a.PRNo + a.Product.Id + a.PO_SerialNumber] = a.Initial - parseFloat(a.budgetUsed.toFixed(4));
                        a.RemainingBudget = parseFloat(remaining[a.PRNo + a.Product.Id + a.PO_SerialNumber].toFixed(4));
                    }
                }

                if (a.UENItemId) {
                    a.RemainingBudget = parseFloat((a.BudgetFromUEN - parseFloat(a.budgetUsed.toFixed(4))).toFixed(4));
                }

                if (a.RemainingBudget < 0) {
                    a.IsOverBudget = true;
                }
                else {
                    a.IsOverBudget = false;
                }
                a.UsedBudget = parseFloat(a.budgetUsed.toFixed(4));
            }
        }
    }

    itemsChanged(e) {
        this.checkOverBudgetAll();
    }

}
