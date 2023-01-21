import { bindable, inject, computedFrom } from "aurelia-framework";
import { Service,SalesService,PurchasingService,CustomReportService } from "./service";

const UnitLoader = require('../../../loader/garment-units-loader');

@inject(Service,SalesService,PurchasingService,CustomReportService)
export class DataForm {
    @bindable readOnly = false;
    @bindable isEdit = false;
    @bindable isCreate = false;
    @bindable title;
    @bindable data = {};
    // @bindable error = {};
    @bindable selectedRO;
    @bindable selectedEG;
    @bindable selectedDO;
    @bindable itemOptions = {};
    @bindable selectedUnit;
    @bindable selectedBCNo;

    constructor(service,salesService,purchasingService,customReportService) {
        this.service = service;
        this.salesService=salesService;
        this.purchasingService=purchasingService;
        this.customReportService=customReportService;
    }
    
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
              filter: JSON.stringify({UnitId: this.data.Unit.Id, ExpenditureType:"EXPORT"})
            };
            return this.service.getExpenditureGoodByRo(info)
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

get EGLoader() {
    // console.log(keyword);
        return (keyword) => {
            var info = {
              keyword: keyword,
              filter: JSON.stringify({UnitId: this.data.Unit.Id, ExpenditureType:"EXPORT"})
            };
            if (keyword.length >= 5)
            {
            return this.service.getExpenditureGoodByNo(info)
                .then((result) => {
                    var roList=[];
                        for(var a of result.data){
                            if(roList.length==0){
                                roList.push(a);
                            }
                            else{
                                var dup= roList.find(d=>d.ExpenditureGoodNo==a.ExpenditureGoodNo);
                                if(!dup){
                                    roList.push(a);
                                }
                            }
                        }
                        return roList;
                    
                });
            }
    
    }
    }

get GDOLoader() {
        
        return (keyword) => {
            var info = {
              keyword: keyword,
              filter: JSON.stringify({UnitId: this.data.Unit.Id})
            };
            return this.purchasingService.getDOUrnBC(info)
                .then((result) => {
                    console.log(result.data);
                    return result.data;
                });
        }
    
    }

    get GBCNoLoader() {
        return (keyword) => {
            var info = {
              keyword: keyword,
            };
            return this.customReportService.getBCNo(info)
                .then((result) => {
                    console.log(result.data);
                    return result.data;
                });
        }
    }

    BCNoView=(bc) => {
        return `${bc.BCNo}`;
    }

    get unitLoader() {
        return UnitLoader;
    }

    get sewingOutLoader() {
        return SewingOutLoader;
    }

    selectedUnitChanged(newValue){
        this.selectedEG=null;       
        this.data.RONo = null;
        this.data.Article = null;
        this.data.Comodity=null;
        this.data.Items = [];
        this.data.Price=0;
        this.data.Buyer=null;
        this.data.ContractNo=null;
        if(newValue){
            this.data.Unit=newValue;
        }
        else{
            this.data.Unit=null;
            this.data.RONo = null;
            this.data.Article = null;
            this.data.Comodity=null;
            this.data.Items = [];
            this.data.Price=0;
            this.data.Buyer=null;
            this.data.ContractNo=null;
        }
    }

//    async selectedDOChanged(newValue, oldValue){
//         this.selectedDO = null;
//         this.data.DONo = null;
//         this.data.BCNo = null;
//         this.data.BCType = null;        
//         this.data.URNNo = null;
        
//         if(newValue) 
//            {
//             this.data.DONo = newValue.DONo;            
//             this.data.BCNo = newValue.BeacukaiNo;            
//             this.data.BCType = newValue.CustomsType;
//             this.data.URNNo = newValue.URNNo;
//            }                
//         else
//            {
//             this.context.selectedDOViewModel.editorValue = "";
//             this.data.DONo = null;
//             this.data.BCNo = null;
//             this.data.BCType = null;        
//             this.data.URNNo = null;
//            }
//     }

    async selectedBCNoChanged(newValue, oldValue)
    {
        this.data.BCNo = null;
        this.data.BCType = null;
        if(newValue) 
           {         
            this.data.BCNo = newValue.BCNo;            
            this.data.BCType = newValue.JenisBC;
           }                
        else
           {
            this.data.BCNo = null;
            this.data.BCType = null;        
           }      
    }

    async selectedEGChanged(newValue, oldValue){
        this.data.ExpenditureNo = null;
        this.data.Invoice = null;
        this.data.RONo = null;        
        this.data.Article = null;
        this.data.Comodity=null;
        this.data.Buyer=null;
        this.data.ContractNo=null;
        this.data.Items.splice(0);
        this.data.Price=0;
        if(newValue) {
            this.context.error.Items = [];
            this.data.ExpenditureNo = newValue.ExpenditureGoodNo;            
            this.data.Invoice = newValue.Invoice;            
            this.data.RONo = newValue.RONo;
            this.data.Article = newValue.Article;
            this.data.Comodity= newValue.Comodity;
            this.data.Buyer=newValue.Buyer;
            this.data.BuyerView= this.data.Buyer.Code + ' - '+ this.data.Buyer.Name;

            let priceResult= await this.service.getComodityPrice({ filter: JSON.stringify({ ComodityId: this.data.Comodity.Id, UnitId: this.data.Unit.Id , IsValid:true})});
            if(priceResult.data.length>0){
                this.data.Price= priceResult.data[0].Price;
            }
            else{
                this.data.Price=0;
            }
            Promise.resolve(this.service.getExpenditureGood({ filter: JSON.stringify({ ExpenditureGoodNo: this.data.ExpenditureNo, UnitId: this.data.Unit.Id, ExpenditureType:"EXPORT"}) }))
                    .then(result => {
                        for(var exGood of result.data){
                            for(var exGoodItem of exGood.Items){
                                let Qty= exGoodItem.Quantity-exGoodItem.ReturQuantity;
                                if(Qty>0){
                                    var item={};
                                    if(this.data.Items.length>0){
                                        var duplicate= this.data.Items.find(a=>a.Size.Id==exGoodItem.Size.Id && a.Uom.Id==exGoodItem.Uom.Id && a.Description==exGoodItem.Description);
                                        
                                        if(duplicate){
                                            var idx= this.data.Items.indexOf(duplicate);
                                            duplicate.Quantity+=Qty;
                                            duplicate.StockQuantity+=Qty;
                                            this.data.Items[idx]=duplicate;
                                        }else{
                                            item.IsSave=true;
                                            item.ExpenditureDate= exGood.ExpenditureDate;
                                            item.FinishedGoodStockId=exGoodItem.FinishedGoodStockId;
                                            item.ExpenditureGoodId=exGood.Id;
                                            item.ExpenditureGoodItemId=exGoodItem.Id;
                                            item.Size=exGoodItem.Size;
                                            item.SizeName=exGoodItem.Size.Size;
                                            item.StockQuantity=Qty;
                                            item.Quantity=Qty;
                                            item.Uom= exGoodItem.Uom;
                                            item.Description=exGoodItem.Description;
                                            item.BasicPrice=exGoodItem.BasicPrice;
                                            this.data.Items.push(item);
                                        }
                                    }
                                    else{
                                        item.IsSave=true;
                                        item.ExpenditureDate= exGood.ExpenditureDate;
                                        item.FinishedGoodStockId=exGoodItem.FinishedGoodStockId;
                                        item.ExpenditureGoodId=exGood.Id;
                                        item.ExpenditureGoodItemId=exGoodItem.Id;
                                        item.Size=exGoodItem.Size;
                                        item.SizeName=exGoodItem.Size.Size;
                                        item.StockQuantity=Qty;
                                        item.Quantity=Qty;
                                        item.Uom= exGoodItem.Uom;
                                        item.Description=exGoodItem.Description;
                                        item.BasicPrice=exGoodItem.BasicPrice;
                                        this.data.Items.push(item);
                                    }
                                }
                            }
                        }
                        this.data.Items.sort((a, b)=>a.Description.localeCompare( b.Description) ||a.SizeName.localeCompare( b.SizeName));
                    });
            }
        
        
        else {
            this.context.selectedEGViewModel.editorValue = "";
            this.data.ExpenditureNo = null;   
            this.data.Invoice = null;                       
            this.data.RONo = null;
            this.data.Article = null;
            this.data.Comodity=null;
            this.data.Items.splice(0);
            this.data.Price=0;
            this.data.Buyer=null;
            this.data.ContractNo=null;
        }
    }
    itemsInfo = { 
        columns: [
            "Size",
            "Jumlah Pengeluaran",
            "Jumlah Retur",
            "Satuan",
            "Keterangan",
        ]
    };

    itemsInfoNotCreate = { 
        columns: [
            "Size",
            "Jumlah Retur",
            "Satuan",
            "Keterangan",
        ]
    };

    ROView=(ro) => {
        return `${ro.RONo}`;
    }

    EGView=(eg) => {
        return `${eg.ExpenditureGoodNo}`;
    }

    GDOView=(gdo) => {
 //       return `${gdo.DONo} - ${gdo.URNNo}`;   
        return `${gdo.DONo}`;          
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