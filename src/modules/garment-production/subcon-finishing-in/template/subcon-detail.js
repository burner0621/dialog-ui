import { bindable , inject, computedFrom} from "aurelia-framework";
import { PurchasingService } from "../service";
const SizeLoader = require('../../../../loader/size-loader');
@inject(PurchasingService)
export class SubconDetail {
    @bindable selectedProduct;
    @bindable dataQuantity;
    @bindable selectedProductCS;
    @bindable selectedDC;
    dcOptions = [];

    get sizeLoader() {
        return SizeLoader;
    }
    
    constructor(purchasingService) {
        this.purchasingService = purchasingService;
    }

    get filter() {
        if (this.data.RONo) {
            return {
                RONo: this.data.RONo
            };
        } else {
            return {
                RONo:""
            };
        }
    }

    activate(context) {
        this.context = context;
        this.data = context.data;
        this.error = context.error;
        this.subconCuttingList = context.context.options.subconCuttingList;
        this.productList = [""];
        for (const productCode in this.subconCuttingList) {
            this.productList.push(productCode);
        }

        if (this.data) {
            if (this.data.Product && this.data.SubconType == 'SEWING') {
                this.selectedProduct = this.data.Product.Code;
            }
            if (this.data.Product && this.data.SubconType == 'CUTTING SEWING') {
                this.selectedProductCS = {
                    ProductName: this.data.Product.Name,
                    ProductCode: this.data.Product.Code,
                    ProductId: this.data.Product.Id
                };
            }
            this.dataQuantity = this.data.Quantity;
            if(this.data.DesignColor){
                this.dcOptions.push(this.data.DesignColor);
                this.opDC=this.dcOptions;
                this.selectedDC=this.data.DesignColor;
            }
        }
    }

    changeCheckBox() {
        this.context.context.options.checkedAll = this.context.context.items.reduce((acc, curr) => acc && curr.data.IsSave, true);
    }

    selectedProductChanged(newValue) {
        if (newValue) {
            const selectedSubconCutting = this.subconCuttingList[newValue];
            this.data.Product = selectedSubconCutting.Product;
            this.data.DesignColor = selectedSubconCutting.DesignColor;
            this.data.BasicPrice = selectedSubconCutting.BasicPrice;
        } else {
            this.data.Product = null;
            this.data.DesignColor = null;
            this.data.BasicPrice = 0;
        }
    }

    dataQuantityChanged(newValue) {
        this.data.Quantity = newValue;
        this.data.RemainingQuantity = newValue;
    }

    async selectedProductCSChanged(newValue,oldValue) {
        if (newValue && newValue != oldValue) {
            this.data.Product = {
                Name:newValue.ProductName,
                Code: newValue.ProductCode,
                Id:newValue.ProductId
            };
            var info = {
                keyword: newValue.ProductCode,
                filter: JSON.stringify({RONo: this.data.RONo}),
            };
            await this.purchasingService.getProductByRO(info)
                .then(result => { 
                    for(var p of result.data){
                        if(this.data.Product.Code==p.ProductCode){
                            this.dcOptions.push(p.DesignColor);
                        }
                    }
                });
                
                this.opDC=this.dcOptions;
            //this.data.DesignColor=newValue.DesignColor;
        } else {
            this.data.Product = null;
        }
    }

    get productLoader() {
        this.dcOptions=[];
        return (keyword, filter) => {
            var info = {
                keyword: keyword,
                filter: JSON.stringify(filter),
            };
            
            return this.purchasingService.getProductByRO(info)
                .then((result) => {
                    var products=[];
                    for(var p of result.data){
                        var dup=products.find(a=>a.ProductCode==p.ProductCode)
                        if(!dup){
                            products.push(p);
                        }
                    }
                    return products;
                });
        }
    }
    
    selectedDCChanged(newValue,oldValue){
        if(newValue && newValue != oldValue){
            this.data.DesignColor=newValue;
        }
    }
}