import { bindable, inject, computedFrom } from "aurelia-framework";
import { Service } from "./service";

const UnitLoader = require('../../../loader/garment-units-loader');
const ComodityLoader = require('../../../loader/garment-comodities-loader');
const LoadingLoader = require('../../../loader/garment-loading-loader');

@inject(Service)
export class DataForm {
    @bindable readOnly = false;
    @bindable isCreate = false;
    @bindable isView = false;
    @bindable title;
    @bindable data = {};
    // @bindable error = {};
    @bindable selectedLoading;
    @bindable itemOptions = {};
    @bindable selectedUnit;
    @bindable selectedSewingFrom;
    @bindable selectedSewingOut;
    @bindable selectedUnitFrom;
    @bindable selectedFinishingOut;

    constructor(service) {
        this.service = service;
    }

    formOptions = {
        cancelText: "Kembali",
        saveText: "Simpan",
        deleteText: "Hapus",
        editText: "Ubah"
    };

    sewingFromOptions=["CUTTING", "SEWING", "FINISHING"]

    controlOptions = {
        label: {
            length: 2
        },
        control: {
            length: 5
        }
    };

    itemsInfo = {
        columns: [
            "Kode Barang",
            "Keterangan",
            "Size",
            "Jumlah",
            "Satuan",
            "Warna",
        ]
    }

    @computedFrom("data.Unit")
    get filter(){
        if (this.data.Unit) {
            return {
                UnitId: this.data.Unit.Id,
                "Items.Any(RemainingQuantity>0)":true
            };
        } else {
            return {
                UnitId: 0
            };
        }
    }

    bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;
        this.itemOptions = {
            isCreate: this.context.isCreate,
            isView: this.context.isView,
            checkedAll: this.data.Items.reduce((acc, curr) => acc && cur.IsSave, false)
        }

        if (this.data && this.data.Items) {
            this.data.Items.forEach(
                item => {
                    item.IsSave = true;
                }
            );
        }

        if(this.data){
            this.isCutting= this.data.SewingFrom==="CUTTING";
            this.isSewing= this.data.SewingFrom==="SEWING";
            this.isFinishing= this.data.SewingFrom==="FINISHING";
        }

        if(this.context.isView){
            this.service.getLoadingById(this.data.LoadingId)
            .then((loadingNo) => {
                this.selectedLoading = loadingNo;
            });
        }
    }

    selectedSewingFromChanged(newValue){
        
        this.data.RONo = null;
        this.data.Article = null;
        this.data.Comodity = null;
        this.data.UnitFrom = null;
        this.selectedLoading=null;
        delete this.data.LoadingId;
        this.data.LoadingNo =null;

        var sewingFrom=newValue;
        if(sewingFrom){
            this.data.SewingFrom=sewingFrom;

            this.isCutting= sewingFrom==="CUTTING";
            this.isSewing= sewingFrom==="SEWING";
            this.isFinishing= sewingFrom==="FINISHING";

        }
    }

    LoadingView=(loading)=>{
        var colorList=[];
        var sizeList=[];
        for(var a of loading.Items){
            if(colorList.length==0){
                colorList.push(a.Color);
            }
            else{
                var dup=colorList.find(d=> d==a.Color);
                if(!dup){
                    colorList.push(a.Color);
                }
            }
            if(sizeList.length==0){
                sizeList.push(a.Size.Size);
            }
            else{
                var duplicate=sizeList.find(d=> d==a.Size.Size);
                if(!duplicate){
                    sizeList.push(a.Size.Size);
                }
            }
        }
        return `${loading.LoadingNo} - ${loading.RONo} - ${colorList.join(", ")} - ${sizeList.join(", ")}`
    }

    selectedUnitChanged(newValue){
        this.data.Unit=null;
        this.data.RONo = null;
        this.data.Article = null;
        this.data.Comodity = null;
        if(this.isCutting)
            this.data.UnitFrom = null;
        this.selectedSewingOut=null;
        this.selectedLoading=null;
        delete this.data.LoadingId;
        this.data.LoadingNo =null;
        this.data.Price=0;
        if(newValue){
            this.data.Unit=newValue;
        }
        else{
            this.data.Unit=null;
            this.data.RONo = null;
            this.data.Article = null;
            this.data.Comodity = null;
            if(this.isCutting)
                this.data.UnitFrom = null;
            this.selectedLoading=null;
            this.selectedSewingOut=null;
            delete this.data.LoadingId;
            this.data.LoadingNo =null;
            this.data.Price=0;
        }
    }

    selectedUnitFromChanged(newValue){
        this.data.RONo = null;
        this.data.Article = null;
        this.data.Comodity = null;
        this.selectedSewingOut=null;
        if(newValue){
            this.data.UnitFrom=newValue;
        }
        else{
            this.data.RONo = null;
            this.data.Article = null;
            this.data.Comodity = null;
            this.selectedSewingOut=null;
        }
    }

    async selectedLoadingChanged(newValue){
        if(this.context.isCreate){
            this.data.RONo = null;
            this.data.Article = null;
            this.data.Comodity = null;
            this.data.UnitFrom = null;
            this.data.SewingInDate=null;
            this.data.Price=0;
            if(newValue) {
                if(this.data.Items.length > 0){
                    this.data.Items.splice(0);
                }
                this.data.RONo = newValue.RONo;
                this.data.Article = newValue.Article;
                this.data.Comodity= newValue.Comodity;
                this.data.UnitFrom = newValue.Unit;
                this.data.LoadingId = newValue.Id;
                this.data.LoadingNo = newValue.LoadingNo;
                this.data.SewingInDate=newValue.LoadingDate;

                let priceResult= await this.service.getComodityPrice({ filter: JSON.stringify({ ComodityId: this.data.Comodity.Id, UnitId: this.data.Unit.Id , IsValid:true})});
                if(priceResult.data.length>0){
                    this.data.Price= priceResult.data[0].Price;
                    //console.log(this.data.Price)
                }
                else{
                    this.data.Price=0;
                }

                for(var item of newValue.Items){
                    var a = {};
                    if(item.RemainingQuantity>0){
                        a.Product = item.Product;
                        a.LoadingItemId = item.Id;
                        a.DesignColor = item.DesignColor;
                        a.Size = item.Size;
                        a.SizeName = item.Size.Size;
                        a.Quantity = item.RemainingQuantity;
                        a.Uom = item.Uom;
                        a.Color = item.Color;
                        a.RemainingQuantity = item.RemainingQuantity;
                        a.BasicPrice=item.BasicPrice;
                        a.ComodityPrice=this.data.Price;
                        this.data.Items.push(a);
                    }
                }
                this.data.Items.sort((a, b)=>a.Color.localeCompare( b.Color) || a.SizeName.localeCompare( b.SizeName));
            }
            else {
                this.context.selectedLoadingViewModel.editorValue = "";
                this.data.RONo = null;
                this.data.Article = null;
                this.data.Comodity = null;
                this.data.UnitFrom = null;
                this.data.Price=0;
                this.data.Items.splice(0);
                this.data.SewingInDate=null;
            }        
        }
    }

    unitView = (unit) => {
        return `${unit.Code} - ${unit.Name}`;
    }

    comodityView = (comodity) => {
        return `${comodity.Code} - ${comodity.Name}`
    }

    get unitLoader() {
        return UnitLoader;
    }

    get comodityLoader() {
        return ComodityLoader;
    }

    get loadingLoader() {
        return LoadingLoader;
    }

    get roLoader() {
        return (keyword) => {
            var info = {
              keyword: keyword,
              filter: JSON.stringify({UnitToId: this.data.Unit.Id, 
                SewingTo: "SEWING", UnitId:this.data.UnitFrom.Id,
                "GarmentSewingOutItem.Any(RemainingQuantity>0)":true
             })
            };
            return this.service.searchSewingOut(info)
                .then((result) => {
                    var roList=[];
                        for(var a of result.data){
                            if(roList.length==0){
                                roList.push(a);
                            }
                            else{
                                var dup= roList.find(d=>d.RONo==a.RONo);
                                if(!dup){
                                    roList.push(a);
                                }
                            }
                            
                        }
                        return roList;
                    
                });
        }
    }

    async selectedSewingOutChanged(newValue, oldValue){
        this.data.RONo = null;
        this.data.Article = null;
        this.data.Comodity=null;
        this.data.Items = [];
        this.data.Price=0;
        if(newValue) {
            this.context.error.Items = [];
            this.data.RONo = newValue.RONo;
            this.data.Article = newValue.Article;
            this.data.Comodity= newValue.Comodity;
            var items=[];

            let priceResult= await this.service.getComodityPrice({ filter: JSON.stringify({ ComodityId: this.data.Comodity.Id, UnitId: this.data.Unit.Id , IsValid:true})});
            if(priceResult.data.length>0){
                this.data.Price= priceResult.data[0].Price;
                //console.log(this.data.Price)
            }
            else{
                this.data.Price=0;
            }

            Promise.resolve(this.service.searchSewingOut({ filter: JSON.stringify({ RONo: this.data.RONo, UnitToId: this.data.Unit.Id, SewingTo: "SEWING", UnitId:this.data.UnitFrom.Id, "GarmentSewingOutItem.Any(RemainingQuantity>0)":true}) }))
                    .then(result => {
                        for(var sewingOut of result.data){
                            for(var sewingOutItem of sewingOut.Items){
                                var item={};
                                if(sewingOutItem.RemainingQuantity>0){
                                    if(sewingOut.IsDifferentSize){
                                        for(var sewingOutDetail of sewingOutItem.Details){
                                            item={};
                                            item.SewingDate=sewingOut.SewingOutDate;
                                            item.SewingOutItemId=sewingOutItem.Id;
                                            item.SewingOutDetailId=sewingOutDetail.Id;
                                            item.Quantity=sewingOutDetail.Quantity;
                                            item.Product=sewingOutItem.Product;
                                            item.Uom=sewingOutItem.Uom;
                                            item.Size=sewingOutDetail.Size;
                                            item.SizeName=sewingOutDetail.Size.Size;
                                            item.Color=sewingOutItem.Color;
                                            item.DesignColor=sewingOutItem.DesignColor;
                                            item.RemainingQuantity=sewingOutDetail.Quantity;
                                            item.BasicPrice=sewingOutItem.BasicPrice;
                                            item.ComodityPrice=this.data.Price;
                                            this.data.Items.push(item);
                                        }
                                    }
                                    else{
                                        item.SewingDate=sewingOut.SewingOutDate;
                                        item.SewingOutItemId=sewingOutItem.Id;
                                        item.Quantity=sewingOutItem.Quantity;
                                        item.Product=sewingOutItem.Product;
                                        item.Uom=sewingOutItem.Uom;
                                        item.Size=sewingOutItem.Size;
                                        item.SizeName=sewingOutItem.Size.Size;
                                        item.Color=sewingOutItem.Color;
                                        item.DesignColor=sewingOutItem.DesignColor;
                                        item.RemainingQuantity=sewingOutItem.Quantity;
                                        item.BasicPrice=sewingOutItem.BasicPrice;
                                        item.ComodityPrice=this.data.Price;
                                        this.data.Items.push(item);
                                    }
                                
                                }
                            }
                    }
                    this.data.Items.sort((a, b)=>a.Color.localeCompare( b.Color) || a.SizeName.localeCompare( b.SizeName));
                });
            }
        else {
            this.context.selectedSewingOutViewModel.editorValue = "";
            this.data.RONo = null;
            this.data.Article = null;
            this.data.Comodity=null;
            this.data.Items = [];
            this.data.Price=0;
        }
    }
    ROView=(ro) => {
        return `${ro.RONo}`;
    }

    get roFinishingLoader() {
        return (keyword) => {
            var info = {
              keyword: keyword,
              filter: JSON.stringify({UnitToId: this.data.Unit.Id, FinishingTo: "SEWING", 
              UnitId:this.data.UnitFrom.Id,
             "GarmentFinishingOutItem.Any(RemainingQuantity>0)":true })
            };
            return this.service.searchFinishingOut(info)
                .then((result) => {
                    var roList=[];
                        for(var a of result.data){
                            if(roList.length==0){
                                roList.push(a);
                            }
                            else{
                                var dup= result.data.find(d=>d.RONo==a.RONo);
                                if(!dup){
                                    roList.push(a);
                                }
                            }
                            
                        }
                        return roList;
                    
                });
        }
    }

    async selectedFinishingOutChanged(newValue){
        this.data.RONo = null;
        this.data.Article = null;
        this.data.Comodity=null;
        this.data.Items = [];
        this.data.Price=0;
        if(newValue) {
            this.context.error.Items = [];
            this.data.RONo = newValue.RONo;
            this.data.Article = newValue.Article;
            this.data.Comodity= newValue.Comodity;
            var items=[];

            let priceResult= await this.service.getComodityPrice({ filter: JSON.stringify({ ComodityId: this.data.Comodity.Id, UnitId: this.data.Unit.Id , IsValid:true})});
            if(priceResult.data.length>0){
                this.data.Price= priceResult.data[0].Price;
                //console.log(this.data.Price)
            }
            else{
                this.data.Price=0;
            }

            Promise.resolve(this.service.searchFinishingOut({ filter: JSON.stringify({ RONo: this.data.RONo, UnitToId: this.data.Unit.Id, FinishingTo: "SEWING", UnitId:this.data.UnitFrom.Id,"GarmentFinishingOutItem.Any(RemainingQuantity>0)":true  }) }))
                    .then(result => {
                        for(var finishingOut of result.data){
                            for(var finishingOutItem of finishingOut.Items){
                                var item={};
                                if(finishingOutItem.RemainingQuantity>0){
                                    if(finishingOut.IsDifferentSize){
                                        for(var finishingOutDetail of finishingOutItem.Details){
                                            item={};
                                            item.FinishingDate= finishingOut.FinishingOutDate;
                                            item.FinishingOutItemId=finishingOutItem.Id;
                                            item.FinishingOutDetailId=finishingOutDetail.Id;
                                            item.Quantity=finishingOutDetail.Quantity;
                                            item.Product=finishingOutItem.Product;
                                            item.Uom=finishingOutItem.Uom;
                                            item.Size=finishingOutDetail.Size;
                                            item.SizeName=finishingOutDetail.Size.Size;
                                            item.Color=finishingOutItem.Color;
                                            item.DesignColor=finishingOutItem.DesignColor;
                                            item.RemainingQuantity=finishingOutDetail.Quantity;
                                            item.BasicPrice=finishingOutItem.BasicPrice;
                                            item.ComodityPrice=this.data.Price;
                                            this.data.Items.push(item);
                                        }
                                    }
                                    else{
                                        item.FinishingDate= finishingOut.FinishingOutDate;
                                        item.FinishingOutItemId=finishingOutItem.Id;
                                        item.Quantity=finishingOutItem.Quantity;
                                        item.Product=finishingOutItem.Product;
                                        item.Uom=finishingOutItem.Uom;
                                        item.Size=finishingOutItem.Size;
                                        item.SizeName=finishingOutItem.Size.Size;
                                        item.Color=finishingOutItem.Color;
                                        item.DesignColor=finishingOutItem.DesignColor;
                                        item.RemainingQuantity=finishingOutItem.Quantity;
                                        item.BasicPrice=finishingOutItem.BasicPrice;
                                        item.ComodityPrice=this.data.Price;
                                        this.data.Items.push(item);
                                    }
                                
                                }
                            }
                    }
                    
                    this.data.Items.sort((a, b)=>a.Color.localeCompare( b.Color) || a.SizeName.localeCompare( b.SizeName));
                });
            }
        else {
            this.context.selectedFinishingOutViewModel.editorValue = "";
            this.data.RONo = null;
            this.data.Article = null;
            this.data.Comodity=null;
            this.data.Items = [];
            this.data.Price=0;
        }
    }

    get totalQuantity(){
        var qty=0;
        if(this.data.Items){
            for(var item of this.data.Items){
                if(item.IsSave)
                    qty += item.Quantity;
            }
        }
        return qty;
    }
}
