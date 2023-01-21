import { bindable, inject, computedFrom } from "aurelia-framework";
import { Service,SalesService,PurchasingService } from "./service";

const UnitLoader = require('../../../loader/garment-units-loader');

@inject(Service,SalesService,PurchasingService)
export class DataForm {
    @bindable readOnly = false;
    @bindable isEdit = false;
    @bindable isCreate = false;
    @bindable title;
    @bindable data = {};
    // @bindable error = {};
    @bindable selectedRO;
    @bindable itemOptions = {};
    @bindable selectedUnit;

    constructor(service,salesService,purchasingService) {
        this.service = service;
        this.salesService=salesService;
        this.purchasingService=purchasingService;
    }
    expenditureTypes=["EXPORT","LAIN-LAIN","SISA"];

    formOptions = {
        cancelText: "Kembali",
        saveText: "Simpan",
        deleteText: "Hapus",
        editText: "Ubah"
    };

    controlOptions = {
        label: {
            length: 2
        },
        control: {
            length: 7
        }
    };


    itemsColumns = [""];


    async bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;
        this.isCreate=this.context.isCreate;
        this.itemOptions = {
            isEdit: this.context.isEdit,
            checkedAll: true,
            isCreate: this.context.isCreate
        }
        if (this.data && this.data.Items) {
            this.data.Items.forEach(
                item => {
                    item.IsSave = true;
                }
            );
        }
    }

    unitView = (unit) => {
        return `${unit.Code} - ${unit.Name}`;
    }

    get roLoader() {
        return (keyword) => {
            var info = {
              keyword: keyword,
              filter: JSON.stringify({UnitId: this.data.Unit.Id, "Quantity>0":true})
            };
            return this.service.getFinishedGood(info)
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

    get unitLoader() {
        return UnitLoader;
    }

    get sewingOutLoader() {
        return SewingOutLoader;
    }

    selectedUnitChanged(newValue){
        this.selectedRO=null;
        this.data.RONo = null;
        this.data.Article = null;
        this.data.Comodity=null;
        this.data.Items = [];
        this.data.Price=0;
        this.data.Buyer=null;
        this.data.ContractNo=null;
        this.data.Description ="";
        if(newValue){
            this.data.Unit=newValue;
        }
        else{
            this.data.Unit=null;
            this.data.RONo = null;
            this.data.Article = null;
            this.data.Comodity=null;
            this.data.Items.splice(0);
            this.data.Price=0;
            this.data.Buyer=null;
            this.data.ContractNo=null;
            this.data.Description ="";
        }
    }

    async selectedROChanged(newValue, oldValue){
        this.data.RONo = null;
        this.data.Article = null;
        this.data.Comodity=null;
        this.data.Buyer=null;
        this.data.ContractNo=null;
        this.data.Items.splice(0);
        this.data.Price=0;
        this.data.Description ="";
        if(newValue) {
            this.context.error.Items = [];
            this.data.RONo = newValue.RONo;
            this.data.Article = newValue.Article;
            this.data.Comodity= newValue.Comodity;
            var items=[];

            let pr = await this.purchasingService.getGarmentPR({ size: 1, filter: JSON.stringify({ RONo: this.data.RONo }) });
                
            if(pr.data.length>0){
                this.data.Buyer = pr.data[0].Buyer;
                this.data.BuyerView= this.data.Buyer.Code + ' - '+ this.data.Buyer.Name;
            }

            let noResult = await this.salesService.getCostCalculationByRONo({ size: 1, filter: JSON.stringify({ RO_Number: this.data.RONo }) });
            if(noResult.data.length>0){
                this.data.Description = noResult.data[0].CommodityDescription;
            }

            let salesContractResult = await this.salesService.getSalesContractByRONo({ size: 1, filter: JSON.stringify({ RONumber: this.data.RONo }) });
            if(salesContractResult.data.length>0){
                this.data.ContractNo = salesContractResult.data[0].SalesContractNo;
            }
            
            let priceResult= await this.service.getComodityPrice({ filter: JSON.stringify({ ComodityId: this.data.Comodity.Id, UnitId: this.data.Unit.Id , IsValid:true})});
            if(priceResult.data.length>0){
                this.data.Price= priceResult.data[0].Price;
            }
            else{
                this.data.Price=0;
            }
            this.data.colors=[];
            let finOutData=await this.service.searchFinishingOut({ filter: JSON.stringify({ RONo: this.data.RONo})});
            
            for(var data of finOutData.data){
                if(data.Colors.length>0){
                    for(var color of data.Colors){
                        if(this.data.colors.length==0){
                            this.data.colors.push(color);
                        }
                        else{
                            var dup= this.data.colors.find(a=>a==color);
                            if(!dup){
                            this.data.colors.push(color);
                            }
                        }
                    }
                }
            }
            Promise.resolve(this.service.getFinishedGood({ filter: JSON.stringify({ RONo: this.data.RONo, UnitId: this.data.Unit.Id}) }))
                    .then(result => {
                        for(var finGood of result.data){
                            var item={};
                            if(finGood.Quantity>0){
                                if(this.data.Items.length>0){
                                    var duplicate= this.data.Items.find(a=>a.Size.Id==finGood.Size.Id && a.Uom.Id==finGood.Uom.Id);
                                    
                                    if(duplicate){
                                        var idx= this.data.Items.indexOf(duplicate);
                                        duplicate.Quantity+=finGood.Quantity;
                                        duplicate.StockQuantity+=finGood.Quantity;
                                        this.data.Items[idx]=duplicate;
                                    }else{
                                        item.IsSave=true;
                                        item.Size=finGood.Size;
                                        item.StockQuantity=finGood.Quantity;
                                        item.Quantity=finGood.Quantity;
                                        item.Uom= finGood.Uom;
                                        item.colors=this.data.colors;
                                        this.data.Items.push(item);
                                    }
                                }
                                else{
                                    item.IsSave=true;
                                    item.Size=finGood.Size;
                                    item.StockQuantity=finGood.Quantity;
                                    item.Quantity=finGood.Quantity;
                                    item.Uom= finGood.Uom;
                                    item.colors=this.data.colors;
                                    this.data.Items.push(item);
                                }
                                
                            }
                        }
                    });
            }
        else {
            this.context.selectedROViewModel.editorValue = "";
            this.data.RONo = null;
            this.data.Article = null;
            this.data.Comodity=null;
            this.data.Items.splice(0);
            this.data.Price=0;
            this.data.Buyer=null;
            this.data.ContractNo=null;
            this.data.Description ="";
        }
    }
    itemsInfo = { 
        columns: [
            "Size",
            "Jumlah Tersedia",
            "Jumlah Keluar",
            "Satuan",
            "Keterangan",
        ]
    };

    itemsInfoNotCreate = { 
        columns: [
            "Size",
            "Jumlah Keluar",
            "Satuan",
            "Keterangan",
        ]
    };

    ROView=(ro) => {
        return `${ro.RONo}`;
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