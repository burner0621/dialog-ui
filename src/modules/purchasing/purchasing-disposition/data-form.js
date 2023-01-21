import { inject, bindable, containerless, computedFrom, BindingEngine } from 'aurelia-framework'
import { Service } from "./service";
var SupplierLoader = require('../../../loader/supplier-loader');
var CurrencyLoader = require('../../../loader/currency-in-garment-currency-loader');
var UnitLoader = require('../../../loader/unit-loader');
var DivisionLoader = require('../../../loader/division-loader');
var CategoryLoader = require('../../../loader/category-loader');
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
    @bindable selectedDivision;
    @bindable incomeTaxValue;


    controlOptions = {
        label: {
            length: 4
        },
        control: {
            length: 5
        }
    }

    IncomeTaxByOptions=["","Supplier","Dan Liris"];

    itemsColumns = [{ header: "Nomor External PO"},
                    { header: "Kena PPN"},
                    { header: "Nominal PPN"},
                    { header: "Kena PPH"},
                    { header: "PPH"},
                    { header: "Nominal PPH"},
                    { header: "Disposisi yang sudah dibuat"},
                    { header: "Disposisi yang sudah dibayar"},
                    { header: ""}];

    constructor(service, bindingEngine) {
        this.service = service;
        this.bindingEngine = bindingEngine;
    }

    bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;
        this.data.IncomeTaxBy=this.data.IncomeTaxBy||"";
        if (this.data.supplier) {
            this.selectedSupplier = this.data.supplier;
        }
        // if(this.readOnly){
        //     this.data.Amount=this.data.Amount.toLocaleString('en-EN', { minimumFractionDigits: 4 });
        // }
    }

    @computedFrom("data.Id")
    get isEdit() {
        return (this.data.Id || '').toString() != '';
    }

    @computedFrom("data.Supplier && data.Currency && data.Category && data.Division && data.IncomeTaxBy")
    get filter() {
        var filter={};
        if(this.data.Supplier && this.data.Currency && this.data.Category && this.data.Division){
            filter = {
                supplierId: this.data.Supplier.Id || this.data.Supplier._id,
                currencyId:this.data.Currency.Id||  this.data.Currency._id,
                categoryId:this.data.Category.Id || this.data.Category._id,
                divisionId:this.data.Division.Id || this.data.Division._id,
                incomeTaxBy:this.data.IncomeTaxBy || ""
            }
        }
        return filter;
    }

    selectedCategoryChanged(newValue) {
        this.data.Category = {};
        if(this.data.Items)
            this.data.Items.splice(0);
        var _selectedCategory = newValue;
        if (_selectedCategory.Id || _selectedCategory._id) {
            this.data.Category = _selectedCategory;
            this.data.categoryId = _selectedCategory.Id || _selectedCategory._id;
            this.data.Category.Name = _selectedCategory.name;
            this.data.Category.Id = _selectedCategory._id;
            this.data.Category.Code = _selectedCategory.code;
        }
        else{
            this.data.Category = {};
            this.data.Items.splice(0);
        }
    }

    selectedDivisionChanged(newValue) {
        this.data.Division = {};
        if(this.data.Items)
            this.data.Items.splice(0);
        var _selectedDivision = newValue;
        if(_selectedDivision){
            if (_selectedDivision.Id|| _selectedDivision._id) {
                this.data.Division = _selectedDivision;
                this.data.divisionId = _selectedDivision.Id || _selectedDivision._id;
                this.data.Division._id=newValue.Id;
                this.data.Division.code=newValue.Code;
                this.data.Division.name=newValue.Name;
            } 
            else{
                this.data.Division = {};
                this.data.Items.splice(0);
            }
        }
    }

    selectedSupplierChanged(newValue) {
        this.data.Supplier = {};
        if(this.data.Items)
            this.data.Items.splice(0);
        var _selectedSupplier = newValue;
        if (_selectedSupplier.Id || _selectedSupplier._id) {
            this.data.Supplier = _selectedSupplier;
            this.data.supplierId = _selectedSupplier.Id || _selectedSupplier._id;
            // this.data.Supplier._id=newValue.Id;
            // this.data.Supplier.code=newValue.Code;
            // this.data.Supplier.name=newValue.Name;
        } 
        else{
            this.data.Supplier = {};
            this.data.Items.splice(0);
        }
    }

    selectedCurrencyChanged(newValue){
        this.data.Currency = {};
        if(this.data.Items)
            this.data.Items.splice(0);
        if(newValue.Id){
            this.data.Currency=newValue;
            this.data.Currency._id=newValue.Id;
            this.data.Currency.code=newValue.Code;
            this.data.Currency.name=newValue.Name;
        } 
        else{
            this.data.Currency = {};
            this.data.Items.splice(0);
        }
    }

    IncomeTaxByChanged(e){
        if(e.srcElement){
            if(e.srcElement.value=="Supplier"){
                this.data.Amount=(this.data.DPP+ this.data.VatValue + this.data.PaymentCorrection) - this.data.IncomeTaxValue;
            }
            else{
                this.data.Amount=this.data.DPP + this.data.VatValue + this.data.PaymentCorrection;
            }
        }
        this.data.Items.splice(0);
    }

    get supplierLoader() {
        return SupplierLoader;
    }
    
    get currencyLoader() {
        return CurrencyLoader;
    }

    get addItems() {
        return (event) => {
            this.data.Items.push({ })
        };
    }

    currencyView = (currency) => {
        return currency.code || currency.Code;
    }

    supplierView = (supplier) => {
        var code= supplier.code || supplier.Code;
        var name= supplier.name || supplier.Name;
        return `${code} - ${name}`
    }

    itemsChanged(e){
        if(this.data.Items){
            this.data.Amount=0;
            this.data.IncomeTaxValue=0;
            this.data.DPP=0;
            this.data.VatValue=0;
            for(var item of this.data.Items){
                if(item.Details){
                    for(var detail of item.Details){
                        var pph=0;
                        var ppn=0;
                        if(item.UseIncomeTax){
                            var rate= item.IncomeTax.Rate ? item.IncomeTax.Rate : item.IncomeTax.rate;
                            pph=parseFloat(detail.PaidPrice)*parseFloat(rate)*0.01;
                        }
                        if(item.UseVat){
                            var rate= item.vatTax.rate ? item.vatTax.rate : item.vatTax.rate;
                            ppn=detail.PaidPrice*(parseFloat(rate)/100);
                        }
                        this.data.IncomeTaxValue+=pph;
                        this.data.VatValue+=ppn;
                        this.data.DPP+=detail.PaidPrice;
                        if(this.data.IncomeTaxBy=="Supplier"){
                            this.data.Amount+=(detail.PaidPrice+ppn+this.data.PaymentCorrection)-pph;
                        }
                        else
                            this.data.Amount+=detail.PaidPrice+ppn+this.data.PaymentCorrection;
                    }
                }
            }
        }
    }

    get removeItems() {
        return (event) => //console.log(event.detail);
        {
            
            if(this.data.Items){
                this.data.Amount=0;
                this.data.IncomeTaxValue=0;
                this.data.DPP=0;
                this.data.VatValue=0;
                for(var item of this.data.Items){
                    if(item.Details){
                        for(var detail of item.Details){
                            var pph=0;
                            var ppn=0;
                            if(item.UseIncomeTax){
                                var rate= item.IncomeTax.Rate ? item.IncomeTax.Rate : item.IncomeTax.rate;
                                pph=parseFloat(detail.PaidPrice)*parseFloat(rate)*0.01;
                            }
                            if(item.UseVat){
                                var rate= item.vatTax.rate ? item.vatTax.rate : item.vatTax.rate;
                                ppn=detail.PaidPrice*(parseFloat(rate)/100);
                            }
                            this.data.IncomeTaxValue+=pph;
                            this.data.VatValue+=ppn;
                            this.data.DPP+=detail.PaidPrice;
                            if(this.data.IncomeTaxBy=="Supplier"){
                                this.data.Amount+=(detail.PaidPrice+ppn+this.data.PaymentCorrection)-pph;
                            }
                            else
                                this.data.Amount+=detail.PaidPrice+ppn+this.data.PaymentCorrection;
                        }
                    }
                }
            }
        }
    }

    divisionView = (division) => {
        return division.name || division.Name;
    }

    categoryView = (category) => {
        var code= category.code || category.Code;
        var name= category.name || category.Name;
        return `${code} - ${name}`;
    }

     get divisionLoader() {
        return DivisionLoader;
    }

    get categoryLoader() {
        return CategoryLoader;
    }

//@computedFrom("!isView")
    
    
    get dppVal(){
        if(!this.readOnly){
            if(this.data.Items){
                this.data.Amount=0;
                this.data.IncomeTaxValue=0;
                this.data.DPP=0;
                this.data.VatValue=0;
                for(var item of this.data.Items){
                    if(item.Details){
                        for(var detail of item.Details){
                            var pph=0;
                            var ppn=0;
                            if(item.UseIncomeTax){
                                var rate= item.IncomeTax.Rate ? item.IncomeTax.Rate : item.IncomeTax.rate;

                                pph=parseFloat(detail.PaidPrice)*parseFloat(rate)*0.01;
                            }
                            if(item.UseVat){
                                var rate= item.vatTax.rate ? item.vatTax.rate : item.vatTax.rate;
                                ppn=detail.PaidPrice*(parseFloat(rate)/100);
                            }
                            this.data.IncomeTaxValue+=pph;
                            this.data.VatValue+=ppn;
                            this.data.DPP+=detail.PaidPrice;
                            if(this.data.IncomeTaxBy=="Supplier"){
                                this.data.Amount+=(detail.PaidPrice+ppn+this.data.PaymentCorrection)-pph;
                            }
                            else
                                this.data.Amount+=detail.PaidPrice+ppn+this.data.PaymentCorrection;
                        }
                    }
                }
                return this.data.DPP;
            }
            else return 0;
        }
        
    }

    get vatVal(){
        if(!this.readOnly){
            if(this.data.Items){
                this.data.Amount=0;
                this.data.IncomeTaxValue=0;
                this.data.DPP=0;
                this.data.VatValue=0;
                for(var item of this.data.Items){
                    if(item.Details){
                        for(var detail of item.Details){
                            var pph=0;
                            var ppn=0;
                            if(item.UseIncomeTax){
                                var rate= item.IncomeTax.Rate ? item.IncomeTax.Rate : item.IncomeTax.rate;

                                pph=parseFloat(detail.PaidPrice)*parseFloat(rate)*0.01;
                            }
                            if(item.UseVat){
                                var rate= item.vatTax.rate ? item.vatTax.rate : item.vatTax.rate;
                                ppn=detail.PaidPrice*(parseFloat(rate)/100);
                            }
                            this.data.IncomeTaxValue+=pph;
                            this.data.VatValue+=ppn;
                            this.data.DPP+=detail.PaidPrice;
                            if(this.data.IncomeTaxBy=="Supplier"){
                                this.data.Amount+=(detail.PaidPrice+ppn+this.data.PaymentCorrection)-pph;
                            }
                            else
                                this.data.Amount+=detail.PaidPrice+ppn+this.data.PaymentCorrection;
                        }
                    }
                }
                return this.data.VatValue;
            }
            else return 0;
        }
    }
    
    get incomeTaxVal(){
        if(!this.readOnly){
            if(this.data.Items){
                this.data.Amount=0;
                this.data.IncomeTaxValue=0;
                this.data.DPP=0;
                this.data.VatValue=0;
                for(var item of this.data.Items){
                    if(item.Details){
                        for(var detail of item.Details){
                            var pph=0;
                            var ppn=0;
                            if(item.UseIncomeTax){
                                var rate= item.IncomeTax.Rate ? item.IncomeTax.Rate : item.IncomeTax.rate;
                                pph=parseFloat(detail.PaidPrice)*parseFloat(rate)*0.01;
                            }
                            if(item.UseVat){
                                var rate= item.vatTax.rate ? item.vatTax.rate : item.vatTax.rate;
                                ppn=detail.PaidPrice*(parseFloat(rate)/100);
                            }
                            this.data.IncomeTaxValue+=pph;
                            this.data.VatValue+=ppn;
                            this.data.DPP+=detail.PaidPrice;
                            if(this.data.IncomeTaxBy=="Supplier"){
                                this.data.Amount+=(detail.PaidPrice+ppn+this.data.PaymentCorrection)-pph;
                            }
                            else
                                this.data.Amount+=detail.PaidPrice+ppn+this.data.PaymentCorrection;
                        }
                    }
                }
                return this.data.IncomeTaxValue;
            }
            else return 0;
            
        }
    }

} 
