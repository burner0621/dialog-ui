import { inject, bindable, computedFrom } from 'aurelia-framework'
import { Service } from "../service";

const UnitLoader = require('../../../../../../loader/garment-units-loader');
var StockLoader = require('../../../../../../loader/garment-leftover-warehouse-stock-loader');
var ProductLoader = require('../../../../../../loader/garment-leftover-warehouse-stock-distinct-loader');

@inject(Service)
export class items {
    @bindable selectedUnit;
    @bindable selectedStock;
    @bindable selectedProduct;

    get unitLoader() {
        return UnitLoader;
    }

    unitView = (unit) => {
        return `${unit.Code} - ${unit.Name}`;
    }
    selectProduct=["ProductId","ProductCode","ProductName"]

    get stockLoader() {
        return StockLoader;
    }
    
    get productLoader() {
        return ProductLoader;
    }

    productView = (stock) => {
        if(stock.ProductCode)
            return `${stock.ProductCode}-${stock.ProductName}`
    }

    uomView = (stock) => {
        if(stock.Uom)
            return `${stock.Uom.Unit}`
    }

    @computedFrom("data.Unit")
    get filterAcc() {
        return {
            ReferenceType:"AVAL_BAHAN_PENOLONG",
            UnitId: (this.data.Unit || {}).Id || 0,
            "Quantity>0": true
        };
    }
    @computedFrom("data.Unit","data.Product")
    get filterUom() {
        return {
            ReferenceType:"AVAL_BAHAN_PENOLONG",
            UnitId: (this.data.Unit || {}).Id || 0,
            "Quantity>0": true,
            ProductId: (this.data.Product || {}).Id || 0,
        };
    }
    constructor(service) {
        this.service = service;
    }

    async activate(context) {
        this.context = context;
        this.data = context.data;
        this.error = context.error;
        this.options = context.options;
        this.readOnly = this.options.readOnly;
        this.isCreate = context.context.options.isCreate;
        this.isEdit = context.context.options.isEdit;
        if(this.data){
            this.selectedUnit = this.data.Unit;
            if(this.data.Product)
                this.selectedProduct = {ProductCode : this.data.Product.Code || "" ,
                                        ProductName : this.data.Product.Name || ""};
            this.selectedStock={Uom : this.data.Uom || null}
        }
        if(this.data.Id && !this.isFabric){
            var stock= await this.service.getStock({ size: 1, filter: JSON.stringify({ ProductId: this.data.Product.Id, UomId: this.data.Uom.Id, UnitId: this.data.Unit.Id,ReferenceType:"AVAL_BAHAN_PENOLONG" }) });
            if(!this.error)
                this.data.StockQuantity=stock.data[0].Quantity+ this.data.Quantity;
        }
        
    }

    selectedProductChanged(newValue){
        this.data.StockId=0;
        this.data.Uom=null;
        this.data.StockQuantity=0;
        this.selectedStock=null;
        this.data.Quantity=0;
        this.selectedStockViewModel.editorValue="";
        if(newValue){
            this.data.Product={
                Name: newValue.ProductName,
                Code: newValue.ProductCode,
                Id: newValue.ProductId
            }
        }
        else{
            this.data.StockId=0;
            this.data.Uom=null;
            this.data.StockQuantity=0;
            this.selectedStock=null;
            this.data.Quantity=0;
            this.selectedStockViewModel.editorValue="";
        }
    }

    async selectedStockChanged(newValue){
        this.data.StockId=0;
        this.data.Uom=null;
        this.data.StockQuantity=0;
        this.data.Quantity=0;
        if(newValue){
            this.data.StockId=newValue.Id;
            this.data.Uom=newValue.Uom;
            this.data.Quantity=newValue.Quantity;
            const existingItem = (this.context.context.options.existingItems || []).find(i => i.StockId == this.data.StockId) || { Quantity: 0 };
            this.data.StockQuantity = this.data.Quantity+ existingItem.Quantity;
            this.data.Quantity=this.data.StockQuantity;
        }
    }

    selectedUnitChanged(newValue){
        this.data.StockId=0;
        this.data.Uom=null;
        this.data.StockQuantity=0;
        this.selectedStock=null;
        this.data.Quantity=0;
        this.selectedProduct=null;
        this.data.Product=null;
        this.selectedStockViewModel.editorValue="";
        this.selectedProductViewModel.editorValue="";
        if(newValue)
            this.data.Unit=newValue;
        else{
            this.data.StockId=0;
            this.data.Uom=null;
            this.data.StockQuantity=0;
            this.data.Unit=null;
            this.selectedStock=null;
            this.selectedProduct=null;
            this.data.Quantity=0;
            this.data.Product=null;
            this.selectedStockViewModel.editorValue="";
            this.selectedProductViewModel.editorValue="";
        }
    }
}