import { bindable, inject, computedFrom } from "aurelia-framework";
import { Service, PurchasingService, CoreService,SalesService } from "./service";

const UnitLoader = require('../../../loader/garment-units-loader');
const CuttingInLoader = require('../../../loader/garment-cutting-in-by-ro-loader');

@inject(Service, PurchasingService, CoreService,SalesService)
export class DataForm {
    @bindable readOnly = false;
    @bindable isCreate = false;
    @bindable isView = false;
    @bindable title;
    @bindable data = {};
    // @bindable error = {};
    @bindable selectedCuttingIn;
    @bindable selectedUnitFrom;
    @bindable itemOptions = {};

    constructor(service, purchasingService, coreService,salesService) {
        this.service = service;
        this.purchasingService = purchasingService;
        this.coreService = coreService;
        this.salesService=salesService;
    }

    formOptions = {
        cancelText: "Kembali",
        saveText: "Simpan",
        //deleteText: "Hapus",
        editText: "Ubah"
    };

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
            "Jumlah"
        ]
    }

    @computedFrom("data.UnitFrom")
    get cuttingInFilter() {
        this.selectedCuttingIn = null;
        if (this.data.UnitFrom) {
            return {
                UnitId: this.data.UnitFrom.Id,
                CuttingFrom:"PREPARING", CuttingType:"MAIN FABRIC"
            };
        } else {
            return {
                UnitId: 0,
                CuttingFrom:"PREPARING", CuttingType:"MAIN FABRIC"
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
            checkedAll: this.context.isCreate == true ? false : true 
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

    comodityView = (comodity) => {
        return `${comodity.Code} - ${comodity.Name}`
    }

    ROView=(ro) => {
        return `${ro.RONo} - ${ro.PO_SerialNumber}`;
    }

    get unitLoader() {
        return UnitLoader;
    }

    selectedUnitFromChanged(newValue){
        if(newValue){
            this.data.UnitFrom=newValue;
        }
        else{
            this.context.selectedCuttingInViewModel.editorValue = "";
            this.data.RONo = null;
            this.data.Article = null;
            this.data.Comodity = null;
            this.data.Price=0;
            this.data.Items.splice(0);
            // this.data.PlanPORemainingQuantity=0;
            // this.data.PlanPOQuantity=0;
        }
        this.context.selectedCuttingInViewModel.editorValue = "";
        this.data.RONo = null;
        this.data.Article = null;
        this.data.Comodity = null;
        this.data.Price=0;
        this.data.Items.splice(0);
        // this.data.PlanPORemainingQuantity=0;
        // this.data.PlanPOQuantity=0;
    }

    async selectedCuttingInChanged(newValue, oldValue){
        if(this.context.isCreate){
            if(newValue) {
                if(this.data.Items.length>0){
                    this.data.Items.splice(0);
                }
                this.context.error.Items = [];
                this.data.CuttingOutType = "SUBKON";
                this.data.RONo = newValue.RONo;
                this.data.Article = newValue.Article;
                this.data.PlanPOQuantity=newValue.DealQuantity;
                this.data.EPOId= newValue.GarmentEPOId;
                this.data.EPOItemId= newValue.Id;
                this.data.POSerialNumber= newValue.PO_SerialNumber;

                let noResult = await this.salesService.getCostCalculationByRONo({ size: 1, filter: JSON.stringify({ RO_Number: this.data.RONo }) });
                
                if(noResult.data.length>0){
                    this.data.Comodity = noResult.data[0].Comodity;
                } else {
                    const comodityCodeResult = await this.salesService.getHOrderKodeByNo({ no: this.data.RONo });
                    const comodityCode = comodityCodeResult.data[0];
                    if (comodityCode) {
                        const comodityResult = await this.coreService.getGComodity({ size: 1, filter: JSON.stringify({ Code: comodityCode }) });
                        this.data.Comodity = comodityResult.data[0];
                    }
                }

                let priceResult= await this.service.getComodityPrice({ filter: JSON.stringify({ ComodityId: this.data.Comodity.Id, UnitId: this.data.UnitFrom.Id , IsValid:true})});
                if(priceResult.data.length>0){
                    this.data.Price= priceResult.data[0].Price;
                    //console.log(this.data.Price)
                }
                else{
                    this.data.Price=0;
                }

                this.data.PlanPORemainingQuantity=this.data.PlanPOQuantity;
                Promise.resolve(this.service.getCuttingOut({ filter: JSON.stringify({ EPOItemId: this.data.EPOItemId}) }))
                    .then(result => {
                        if(result.data.length>0){
                            for(var cuttingOutHeader of result.data){
                                for(var cuttingOutItem of cuttingOutHeader.Items){
                                    for(var cuttingOutDetail of cuttingOutItem.Details){
                                        this.data.PlanPORemainingQuantity-=cuttingOutDetail.CuttingOutQuantity;
                                    }
                                }
                            }
                        }
                        
                    });
                

                Promise.resolve(this.service.getCuttingIn({ filter: JSON.stringify({ RONo: this.data.RONo, UnitId: this.data.UnitFrom.Id , CuttingType:"MAIN FABRIC"}) }))
                    .then(result => {
                        for(var cuttingInHeader of result.data){
                            for(var cuttingInItem of cuttingInHeader.Items){
                                for(var cuttingInDetail of cuttingInItem.Details){
                                    if(cuttingInDetail.RemainingQuantity>0){
                                        cuttingInDetail.CuttingInId = cuttingInHeader.Id;
                                        cuttingInDetail.CuttingInDetailId = cuttingInDetail.Id;
                                        cuttingInDetail.ComodityPrice=this.data.Price;
                                        this.data.Items.push(cuttingInDetail);
                                    }
                                }
                            }
                        }
                    });
            }
            else {
                this.context.selectedCuttingInViewModel.editorValue = "";
                this.data.RONo = null;
                // this.data.PlanPORemainingQuantity=0;
                // this.data.PlanPOQuantity=0;
                this.data.Article = null;
                this.data.Comodity = null;
                this.data.Items.splice(0);
                this.data.Price=0;
            }
            this.data.Items.splice(0);
        }
    }

    get cuttingInLoader() {
        return (keyword) => {
            var infoCuttingIn = {
              keyword: keyword,
              filter: JSON.stringify({UnitId: this.data.UnitFrom.Id})
            };
            return this.service.getCuttingInByRO(infoCuttingIn)
                .then((result) => {
                    var infoEPO = {
                        keyword: keyword,
                        filter: JSON.stringify({ ProductName:"PROCESS"})
                      };
                    return this.purchasingService.getGarmentEPOByRONo(infoEPO)
                    .then((epo)=>{
                        var roList=[];
                        for(var a of epo.data){
                            var dup= result.data.find(d=>d.RONo==a.RONo);
                            if(dup){
                                a.POSerialNumber=dup.PO_SerialNumber;
                                a.Items=dup.Items;
                                a.Article=dup.Article;
                                
                                roList.push(a);
                            }
                            
                        }
                        return roList;
                    });
                    
                });
        }
    }
}