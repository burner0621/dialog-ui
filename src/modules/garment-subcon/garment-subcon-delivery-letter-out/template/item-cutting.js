import { inject, bindable, computedFrom } from 'aurelia-framework';
import { Service, CoreService } from "../service";

const SubconCuttingOutLoader = require('../../../../loader/garment-subcon-cutting-out-loader');
const ROLoader = require('../../../../loader/garment-subcon-cutting-out-ro-loader');

@inject(Service, CoreService)
export class Item {
    @bindable selectedCuttingOut;
    @bindable selectedRO;

    constructor(service, coreService) {
        this.service = service;
        this.coreService = coreService;
    }

    async activate(context) {
        this.context = context;
        this.data = context.data;
        this.error = context.error;
        
        this.isCreate = context.context.options.isCreate;
        this.isEdit = context.context.options.isEdit;
        this.itemOptions=context.context.options;
        if(this.data){
            this.selectedCuttingOut={
                CutOutNo: this.data.SubconNo,
                Id:this.data.SubconId
            };
            this.selectedRO={
                RONo:this.data.RONo,
            }
            if(this.data.SubconId){
                var subcon = await this.service.readSubconCuttingOutById(this.data.SubconId);
            
                this.data.Details=subcon.Items;
                
            }
        }
        this.isShowing = false;
        console.log(context)
        
    }

    itemsColumns= [
            "Kode Barang",
            "Keterangan Barang",
            "Jumlah Keluar",
            ""
        ];

    toggle() {
        if (!this.isShowing)
            this.isShowing = true;
        else
            this.isShowing = !this.isShowing;
    }

    comodityView = (comodity) => {
        return `${comodity.Code} - ${comodity.Name}`
    }

    @computedFrom("data.RONo")
    get subconCuttingOutFilter(){
        var filter={
            RONo:this.data.RONo
        };
        for(var item of this.context.context.items){
            filter[`CutOutNo == "${item.data.SubconNo}"`]=false;
        }
        if(this.context.context.options.DLType!="RE PROSES"){
            filter["IsUsed"]=false;
        }
        return filter;
    }

    get subconCuttingOutLoader() {
        return SubconCuttingOutLoader;
    }

    get roLoader() {
        return ROLoader;
    }

    selectedROChanged(newValue){
        if(newValue){
            this.data.RONo=newValue.RONo;
        }
        else{
            this.data.RONo="";
            this.data.SubconId=null;
            this.data.SubconNo="";
            this.selectedCuttingOut=null;
            this.data.Details.splice(0);
        }
    }
    async selectedCuttingOutChanged(newValue){
        if(this.data.Details.length>0){
            this.data.Details.splice(0);
        }
        if(newValue){
            this.data.SubconId=newValue.Id;
            this.data.SubconNo=newValue.CutOutNo;

            var subcon = await this.service.readSubconCuttingOutById(this.data.SubconId);
            
            this.data.POSerialNumber=subcon.POSerialNumber;
            this.data.Details=subcon.Items;
            this.data.Quantity=0;
            for(var detail of this.data.Details){
                this.data.Quantity+=detail.TotalCuttingOut;
            }
        }
    }

}