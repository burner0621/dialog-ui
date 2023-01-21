import { inject, bindable, containerless, computedFrom, BindingEngine } from 'aurelia-framework'
import { Service } from "./service";
import { moment } from "moment";
var SupplierLoader = require('../../../loader/garment-supplier-loader');
// var CurrencyLoader = require('../../../loader/garment-currency-loader');
var CurrencyLoader = require('../../../loader/garment-currencies-by-latest-date-loader');
// var CurrencyLoader = require('../../../loader/garment-currencies-bi-by-latest-date-loader');
var CategoryLoader = require('../../../loader/garment-category-loader');

//var IncomeTaxLoader = require('../../../loader/income-tax-loader');

@containerless()
@inject(Service, BindingEngine)
export class DataForm {
    @bindable readOnly = false;
    @bindable data = {};
    @bindable error = {};
    @bindable title;
    @bindable selectedSupplier;
    @bindable selectedCurrency;
    @bindable selectedCategory;
    @bindable incomeTaxValue;
    @bindable incomeTaxValueView;
    @bindable vatValue;
    @bindable vatValueView;


    controlOptions = {
        label: {
            length: 4
        },
        control: {
            length: 5
        }
    }

    itemPaymentType = ["T/T AFTER", "FREE", "T/T BEFORE"];
    itemCategory = ["FABRIC", "ACCESSORIES"];
    itemsColumns = [{ header: "Nomor External PO" },
    { header: "Kena PPN" },
    { header: "Nominal PPN" },
    { header: "Kena PPH" },
    { header: "PPH" },
    { header: "Nominal PPH" },
    { header: "Disposisi yang sudah dibuat" },
    // { header: "Disposisi yang sudah dibayar"},
    { header: "" }];

    constructor(service, bindingEngine) {
        this.service = service;
        this.bindingEngine = bindingEngine;
    }

    bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;
        if (this.data.supplier) {
            this.selectedSupplier = this.data.supplier;
        }
        // console.log("bindForm",this.data)
    }

    @computedFrom("data.Id")
    get isEdit() {
        return (this.data.Id || '').toString() != '';
    }

    @computedFrom("data.Supplier && data.Currency && data.Category")
    get filter() {
        var filter = {};
        if (this.data.Supplier && this.data.Currency && this.data.Category && this.data.Division) {
            filter = {
                supplierId: this.data.Supplier.Id || this.data.Supplier._id,
                currencyId: this.data.Currency.Id || this.data.Currency._id,
                categoryId: this.data.Category.Id || this.data.Category._id,
                currencyCode: this.data.Currency.Code
            }
        }
        return filter;
    }

    selectedCategoryChanged(newValue) {
        this.data.Category = {};
        if (this.data.Items)
            this.data.Items.splice(0);
        var _selectedCategory = newValue;
        if (_selectedCategory.Id || _selectedCategory._id) {
            this.data.Category = _selectedCategory;
            this.data.categoryId = _selectedCategory.Id || _selectedCategory._id;
            this.data.Category.Name = _selectedCategory.name;
            this.data.Category.Id = _selectedCategory._id;
            this.data.Category.Code = _selectedCategory.code;
        }
        else {
            this.data.Category = {};
            this.data.Items.splice(0);
        }
    }

    selectedSupplierChanged(newValue) {
        this.data.Supplier = {};
        if (this.data.Items)
            this.data.Items.splice(0);
        var _selectedSupplier = newValue;
        if (_selectedSupplier.Id || _selectedSupplier._id) {
            this.data.Supplier = _selectedSupplier;
            this.data.SupplierId = _selectedSupplier.Id || _selectedSupplier._id;
            this.data.SupplierName = _selectedSupplier.name;
            this.data.SupplierCode = _selectedSupplier.code;
            this.data.SupplierIsImport = _selectedSupplier.import
            // this.data.Supplier._id=_selectedSupplier.Id;
            // this.data.Supplier.code=_selectedSupplier.Code;
            // this.data.Supplier.name=_selectedSupplier.Name;
        }
        else {
            this.data.Supplier = {};
            this.data.Items.splice(0);
        }
    }

    selectedCurrencyChanged(newValue) {
        console.log("selectedCurrency", newValue);
        this.data.Currency = {};
        if (this.data.Items)
            this.data.Items.splice(0);
        if (newValue.Id) {
            this.data.Currency = newValue;
            this.data.Currency._id = newValue.Id;
            this.data.Currency.code = newValue.code;
            this.data.Currency.name = newValue.code;
            this.data.CurrencyId = newValue.Id;
            this.data.CurrencyCode = newValue.code;
            this.data.CurrencyName = newValue.code;
            this.data.CurrencyRate = newValue.rate;
            this.data.CurrencyDate = newValue.date;
        }
        else {
            this.data.Currency = {};
            this.data.Items.splice(0);
        }
    }

    get supplierLoader() {
        return SupplierLoader;
    }

    get currencyLoader() {
        return CurrencyLoader;
    }

    get addItems() {
        return (event) => {
            this.data.Items.push(
                {
                    SupplierId: this.data.SupplierId,
                    CurrencyId: this.data.CurrencyId,
                    CurrencyCode: this.data.CurrencyCode,
                    Category: this.data.Category,
                    PaymentType: this.data.PaymentType,
                    Id: 0
                })
        };
    }

    currencyView = (currency) => {
        // return currency.code+ " - " + currency.date.substring(0,10);
        return currency.Code? currency.Code:currency.code;

    }

    supplierView = (supplier) => {
        var code = supplier.code || supplier.Code;
        var name = supplier.name || supplier.Name;
        return `${code} - ${name}`
    }

    itemsChanged(e) {
        // console.log("BeforeitemChanged",this.data);
        
        if (this.data.Items) {
            this.data.Amount = 0;
            this.data.IncomeTaxValue = 0;
            this.data.IncomeTaxValueView = 0;            
            this.data.DPP = 0;
            this.data.VatValue = 0;
            this.data.VatValueView = 0;
            for (var item of this.data.Items) {
                // if(item.Details){
                //     for(var detail of item.Details){
                // console.log("itemchange list item ",item);
                var pph = 0;
                var pphView = 0;
                var ppn = 0;
                var ppnView = 0;
                var dpp = item.DPPValue != undefined || item.DPPValue != null ? item.DPPValue : 0;
                if (item.IsIncomeTax) {
                  // var rate= item.IncomeTax ? item.IncomeTax.Rate : 0;
                  // pph=parseFloat(detail.PriceTotal)*parseFloat(rate)*0.01;
                  pphView = item.IncomeTaxValueView;
                }
                if (item.IsPayIncomeTax) {
                    // var rate= item.IncomeTax ? item.IncomeTax.Rate : 0;
                    // pph=parseFloat(detail.PriceTotal)*parseFloat(rate)*0.01;
                    pph = item.IncomeTaxValue;
                }
                if (item.IsPayVAT) {
                    // ppn=detail.PriceTotal*0.1;
                    ppn = item.VatValue;
                }
                if (item.IsUseVat) {
                    // ppn=detail.PriceTotal*0.1;
                    ppnView = item.VatValueView;
                }
                this.data.IncomeTaxValue += pph;
                this.data.IncomeTaxValueView += pphView;
                this.data.VatValue += ppn;
                this.data.DPP += dpp;
                this.data.VatValueView +=ppnView;
                // this.data.Amount+=dpp+ppn+pph+this.data.MiscAmount;
                this.data.Amount += Number(parseFloat((dpp + ppn + this.data.MiscAmount) - pph).toFixed(3));

                //     }
                // }
            }
        }
        // console.log("itemChanged",this.data);
    }

    get removeItems() {
        return (event) => //console.log(event.detail);
        {

            if (this.data.Items) {
                this.data.Amount = 0;
                this.data.IncomeTaxValue = 0;
                this.data.IncomeTaxValueView = 0;
                this.data.DPP = 0;
                this.data.VatValue = 0;
                this.data.VatValueView = 0;
                for (var item of this.data.Items) {
                    // if(item.Details){
                    //     for(var detail of item.Details){
                    var pph = 0;
                    var pphView = 0;
                    var ppn = 0;
                    var ppnView = 0;
                    // var dpp = item.DPPValue? item.DPPValue:0;
                    var dpp = item.DPPValue != undefined || item.DPPValue != null ? item.DPPValue : 0;

                    if (item.IsIncomeTax) {
                      // var rate= item.IncomeTax ? item.IncomeTax.Rate : 0;
                      // pph=parseFloat(detail.PriceTotal)*parseFloat(rate)*0.01;
                      pphView = item.IncomeTaxValueView;
                    }
                    if (item.IsPayIncomeTax) {
                        // var rate= item.IncomeTax ? item.IncomeTax.Rate : 0;
                        // pph=parseFloat(detail.PriceTotal)*parseFloat(rate)*0.01;
                        pph = item.IncomeTaxValue;
                    }
                    if (item.IsPayVAT) {
                        // ppn=detail.PriceTotal*0.1;
                        ppn = item.VatValue;
                    }
                    if (item.IsUseVat) {
                        // ppn=detail.PriceTotal*0.1;
                        ppnView = item.VatValueView;
                    }
                    this.data.IncomeTaxValue += pph;
                    this.data.IncomeTaxValueView += pphView;                    
                    this.data.VatValue += ppn;
                    this.data.VatValueView += ppnView;
                    this.data.DPP += dpp;
                    // this.data.Amount+=dpp+ppn+pph+this.data.MiscAmount;
                    this.data.Amount += Number(parseFloat((dpp + ppn + this.data.MiscAmount) - pph).toFixed(3));


                    //     }
                    // }
                }
            }
        }
    }

    divisionView = (division) => {
        return division.name || division.Name;
    }

    categoryView = (category) => {
        var code = category.code || category.Code;
        var name = category.name || category.Name;
        return `${code} - ${name}`;
    }

    get categoryLoader() {
        return CategoryLoader;
    }

    // @computedFrom("!isView")
    set dppVal(v) { };
    get dppVal() {
        if (!this.readOnly) {
            if (this.data.Items) {
                this.data.Amount = 0;
                this.data.IncomeTaxValue = 0;
                this.data.IncomeTaxValueView = 0;                
                this.data.DPP = 0;
                this.data.VatValue = 0;
                this.data.VatValueView = 0;
                for (var item of this.data.Items) {
                    // if(item.Details){
                    //     for(var detail of item.Details){
                    var pph = 0;
                    var pphView = 0;
                    var ppn = 0;
                    var ppnView = 0;
                    // var dpp = item.DPPValue? item.DPPValue:0;
                    var dpp = item.DPPValue != undefined || item.DPPValue != null ? item.DPPValue : 0;

                    if (item.IsIncomeTax) {
                      // var rate= item.IncomeTax ? item.IncomeTax.Rate : 0;
                      // pph=parseFloat(detail.PriceTotal)*parseFloat(rate)*0.01;
                      pphView = item.IncomeTaxValueView;
                    }
                    if (item.IsPayIncomeTax) {
                        // var rate= item.IncomeTax ? item.IncomeTax.Rate : 0;
                        // pph=parseFloat(detail.PriceTotal)*parseFloat(rate)*0.01;
                        pph = item.IncomeTaxValue;
                    }
                    if (item.IsPayVAT) {
                        // ppn=detail.PriceTotal*0.1;
                        ppn = item.VatValue;
                    }
                    if (item.IsUseVat) {
                        // ppn=detail.PriceTotal*0.1;
                        ppnView = item.VatValueView;
                    }
                    this.data.IncomeTaxValue += pph;
                    this.data.IncomeTaxValueView += pphView;                    
                    this.data.VatValue += ppn;
                    this.data.VatValueView += ppnView;                    
                    this.data.DPP += dpp;
                    // this.data.Amount+=dpp+ppn+pph+this.data.MiscAmount;
                    this.data.Amount += Number(parseFloat((dpp + ppn + this.data.MiscAmount) - pph).toFixed(3));


                    //     }
                    // }
                }
                return this.data.DPP;
            }
            else return 0;
        }

    }
    set vatVal(v) { };
    get vatVal() {
        if (!this.readOnly) {
            if (this.data.Items) {
                this.data.Amount = 0;
                this.data.IncomeTaxValue = 0;
                this.data.IncomeTaxValueView = 0;
                this.data.DPP = 0;
                this.data.VatValue = 0;
                this.data.VatValueView = 0;
                for (var item of this.data.Items) {
                    // if(item.Details){
                    //     for(var detail of item.Details){
                    var pph = 0;
                    var pphView = 0;
                    var ppn = 0;
                    var ppnView = 0;
                    // var dpp = item.DPPValue? item.DPPValue:0;
                    var dpp = item.DPPValue != undefined || item.DPPValue != null ? item.DPPValue : 0;

                    if (item.IsIncomeTax) {
                      // var rate= item.IncomeTax ? item.IncomeTax.Rate : 0;
                      // pph=parseFloat(detail.PriceTotal)*parseFloat(rate)*0.01;
                      pphView = item.IncomeTaxValueView;
                    }
                    if (item.IsPayIncomeTax) {
                        // var rate= item.IncomeTax ? item.IncomeTax.Rate : 0;
                        // pph=parseFloat(detail.PriceTotal)*parseFloat(rate)*0.01;
                        pph = item.IncomeTaxValue;
                    }
                    if (item.IsPayVAT) {
                        // ppn=detail.PriceTotal*0.1;
                        ppn = item.VatValue;
                    }
                    if (item.IsUseVat) {
                        // ppn=detail.PriceTotal*0.1;
                        ppnView = item.VatValueView;
                    }
                    this.data.IncomeTaxValue += pph;
                    this.data.IncomeTaxValueView += pphView;                    
                    this.data.VatValue += ppn;
                    this.data.VatValueView += ppnView;                    
                    this.data.DPP += dpp;
                    // this.data.Amount+=dpp+ppn+pph+this.data.MiscAmount;
                    this.data.Amount += Number(parseFloat((dpp + ppn + this.data.MiscAmount) - pph).toFixed(3));


                    //     }
                    // }
                }
                return this.data.VatValue;
            }
            else return 0;
        }
    }

    set vatValView(v) { };
    get vatValView() {
        if (!this.readOnly) {
            if (this.data.Items) {
                this.data.Amount = 0;
                this.data.IncomeTaxValue = 0;
                this.data.IncomeTaxValueView = 0;                
                this.data.DPP = 0;
                this.data.VatValue = 0;
                this.data.VatValueView = 0;
                for (var item of this.data.Items) {
                    // if(item.Details){
                    //     for(var detail of item.Details){
                    var pph = 0;
                    var pphView =0;
                    var ppn = 0;
                    var ppnView = 0;
                    // var dpp = item.DPPValue? item.DPPValue:0;
                    var dpp = item.DPPValue != undefined || item.DPPValue != null ? item.DPPValue : 0;

                    if (item.IsIncomeTax) {
                      // var rate= item.IncomeTax ? item.IncomeTax.Rate : 0;
                      // pph=parseFloat(detail.PriceTotal)*parseFloat(rate)*0.01;
                      pphView = item.IncomeTaxValueView;
                    }
                    if (item.IsPayIncomeTax) {
                        // var rate= item.IncomeTax ? item.IncomeTax.Rate : 0;
                        // pph=parseFloat(detail.PriceTotal)*parseFloat(rate)*0.01;
                        pph = item.IncomeTaxValue;
                    }
                    if (item.IsPayVAT) {
                        // ppn=detail.PriceTotal*0.1;
                        ppn = item.VatValue;
                    }
                    if (item.IsUseVat) {
                        // ppn=detail.PriceTotal*0.1;
                        ppnView = item.VatValueView;
                    }
                    this.data.IncomeTaxValue += pph;
                    this.data.IncomeTaxValueView += pph;
                    
                    this.data.VatValue += ppn;
                    this.data.VatValueView += ppnView;                    
                    this.data.DPP += dpp;
                    // this.data.Amount+=dpp+ppn+pph+this.data.MiscAmount;
                    this.data.Amount += Number(parseFloat((dpp + ppn + this.data.MiscAmount) - pph).toFixed(3));


                    //     }
                    // }
                }
                return this.data.VatValueView;
            }
            else return 0;
        }
    }
    set incomeTaxVal(v) { };
    get incomeTaxVal() {
        if (!this.readOnly) {
            if (this.data.Items) {
                this.data.Amount = 0;
                this.data.IncomeTaxValue = 0;
                this.data.IncomeTaxValueView = 0;                
                this.data.DPP = 0;
                this.data.VatValue = 0;
                this.data.VatValueView =0;
                for (var item of this.data.Items) {
                    // if(item.Details){
                    //     for(var detail of item.Details){
                    var pph = 0;
                    var pphView = 0;
                    var ppn = 0;
                    var ppnView = 0;
                    // var dpp = item.DPPValue? item.DPPValue:0;
                    var dpp = item.DPPValue != undefined || item.DPPValue != null ? item.DPPValue : 0;

                    if (item.IsIncomeTax) {
                      // var rate= item.IncomeTax ? item.IncomeTax.Rate : 0;
                      // pph=parseFloat(detail.PriceTotal)*parseFloat(rate)*0.01;
                      pphView = item.IncomeTaxValueView;
                    }
                    if (item.IsPayIncomeTax) {
                        // var rate= item.IncomeTax ? item.IncomeTax.Rate : 0;
                        // pph=parseFloat(detail.PriceTotal)*parseFloat(rate)*0.01;
                        pph = item.IncomeTaxValue;
                    }
                    if (item.IsPayVAT) {
                        // ppn=detail.PriceTotal*0.1;
                        ppn = item.VatValue;
                    }
                    if (item.IsUseVat) {
                        // ppn=detail.PriceTotal*0.1;
                        ppnView = item.VatValueView;
                    }
                    this.data.IncomeTaxValue += pph;
                    this.data.IncomeTaxValueView += pphView;                    
                    this.data.VatValue += ppn;
                    this.data.VatValueView += ppnView;                    
                    this.data.DPP += dpp;
                    this.data.Amount += Number(parseFloat((dpp + ppn + this.data.MiscAmount) - pph).toFixed(3));

                    //     }
                    // }
                }
                return this.data.IncomeTaxValue;
            }
            else return 0;

        }
    }

    set incomeTaxValView(v) { };
    get incomeTaxValView() {
        if (!this.readOnly) {
            if (this.data.Items) {
                this.data.Amount = 0;
                this.data.IncomeTaxValue = 0;
                this.data.IncomeTaxValueView = 0;                
                this.data.DPP = 0;
                this.data.VatValue = 0;
                this.data.VatValueView =0;
                for (var item of this.data.Items) {
                    // if(item.Details){
                    //     for(var detail of item.Details){
                    var pph = 0;
                    var pphView = 0;
                    var ppn = 0;
                    var ppnView = 0;
                    // var dpp = item.DPPValue? item.DPPValue:0;
                    var dpp = item.DPPValue != undefined || item.DPPValue != null ? item.DPPValue : 0;

                    if (item.IsIncomeTax) {
                      // var rate= item.IncomeTax ? item.IncomeTax.Rate : 0;
                      // pph=parseFloat(detail.PriceTotal)*parseFloat(rate)*0.01;
                      pphView = item.IncomeTaxValueView;
                    }
                    if (item.IsPayIncomeTax) {
                        // var rate= item.IncomeTax ? item.IncomeTax.Rate : 0;
                        // pph=parseFloat(detail.PriceTotal)*parseFloat(rate)*0.01;
                        pph = item.IncomeTaxValue;
                    }
                    if (item.IsPayVAT) {
                        // ppn=detail.PriceTotal*0.1;
                        ppn = item.VatValue;
                    }
                    if (item.IsUseVat) {
                        // ppn=detail.PriceTotal*0.1;
                        ppnView = item.VatValueView;
                    }
                    this.data.IncomeTaxValue += pph;
                    this.data.IncomeTaxValueView += pphView;                    
                    this.data.VatValue += ppn;
                    this.data.VatValueView += ppnView;                    
                    this.data.DPP += dpp;
                    this.data.Amount += Number(parseFloat((dpp + ppn + this.data.MiscAmount) - pph).toFixed(3));

                    //     }
                    // }
                }
                return this.data.IncomeTaxValueView;
            }
            else return 0;

        }
    }

}
