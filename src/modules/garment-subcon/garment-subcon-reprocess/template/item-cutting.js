import { inject, bindable, computedFrom } from 'aurelia-framework';
import { NewItem } from '../../../purchasing/realization-vb-with-po/template/new-item';
import { Service} from "../service";

const CuttingLoader = require('../../../../loader/garment-service-subcon-cutting-loader');
const CuttingROLoader = require('../../../../loader/garment-service-subcon-cutting-item-loader');

@inject(Service)
export class ItemCutting {
    @bindable selectedCutting;
    @bindable selectedRO;

    constructor(service) {
        this.service = service;
    }

    async activate(context) {
        this.context = context;
        this.data = context.data;
        this.error = context.error;
        this.type=this.data.Type;
        this.isCreate = context.context.options.isCreate;
        this.isEdit = context.context.options.isEdit;
        this.itemOptions=context.context.options;
        if(this.data){
            this.selectedCutting={
                SubconNo:this.data.ServiceSubconCuttingNo,
                Id: this.data.ServiceSubconCuttingId
            }
            this.selectedRO={
                RONo:this.data.RONo,
            }
        }
        this.isShowing = true;
        if (this.data.Details) {
            if (this.data.Details.length > 0) {
                this.isShowing = true;
            }
        }
        if(this.data.Id){
            var exQty=[];
            let exists = await this.service.searchItem({ size: 1, filter: JSON.stringify({ ServiceSubconCuttingItemId: this.data.ServiceSubconCuttingItemId  }) });
            if(exists){
                for(var old of exists.data){
                    if(old.Id!=this.data.Id){
                        for(var oldDetail of old.Details){
                            if(!exQty[oldDetail.ServiceSubconCuttingSizeId]){
                                exQty[oldDetail.ServiceSubconCuttingSizeId]=oldDetail.ReprocessQuantity;
                            }
                            else{
                                exQty[oldDetail.ServiceSubconCuttingSizeId]+=oldDetail.ReprocessQuantity;
                            }
                        }
                    }
                }
            }
            for(var item of this.data.Details){
                var oldQty=exQty[item.ServiceSubconCuttingSizeId];
                item.RemQty=oldQty?(item.Quantity- oldQty):item.Quantity;
            }
        }
        
    }
    itemsColumns= [
            "Size",
            "Jumlah",
            "Jumlah Reproses",
            "Satuan",
            "Keterangan",
            "Warna",
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

    get cuttingLoader() {
        return CuttingLoader;
    }

    get cuttingROLoader(){
        return CuttingROLoader;
    }

    @computedFrom("data.ServiceSubconCuttingId")
    get cuttingROFilter() {
        if (this.data.ServiceSubconCuttingId) {
          return { "ServiceSubconCuttingId": this.data.ServiceSubconCuttingId }
        }
        else {
          return { "ServiceSubconCuttingId": "" }
        }
    }

    get subconFilter(){
        var filter={};
        for(var item of this.context.context.items){
            filter[`SubconNo == "${item.data.ServiceSubconCuttingNo}"`]=false;
        }
        return filter;
    }


    async selectedCuttingChanged(newValue, oldValue){
        if(this.isCreate || this.isEdit){
            if(newValue) {
                if(this.data.Details.length>0){
                    this.data.Details.splice(0);
                }
                //this.context.error.Items = [];
                this.data.RONo = newValue.RONo;
                this.data.Article = newValue.Article;
                this.data.Comodity = newValue.Comodity;
                this.data.ServiceSubconCuttingId= newValue.Id;
                this.data.ServiceSubconCuttingNo=newValue.SubconNo;
                this.data.Buyer=newValue.Buyer;
            }
            else {
                this.selectedROViewModel.editorValue = "";
                this.data.RONo = null;
                this.selectedRO=null;
                this.data.Article = null;
                this.data.Comodity = null;
                this.data.Buyer = null;
                this.data.ServiceSubconCuttingNo=null;
                this.data.Details.splice(0);
            }
        }
    }

    async selectedROChanged(newValue){
        if(this.data.Details.length>0){
            this.data.Details.splice(0);
        }
        if(newValue){
            this.data.RONo = newValue.RONo;
            this.data.Article = newValue.Article;
            this.data.Comodity = newValue.Comodity;
            this.data.ServiceSubconCuttingItemId=newValue.Id;

            var exQty=[];
            let exists = await this.service.searchItem({ size: 1, filter: JSON.stringify({ ServiceSubconCuttingItemId: this.data.ServiceSubconCuttingItemId  }) });
            if(exists){
                for(var old of exists.data){
                    if(old.Id!=this.data.Id){
                        for(var oldDetail of old.Details){
                            if(!exQty[oldDetail.ServiceSubconCuttingSizeId]){
                                exQty[oldDetail.ServiceSubconCuttingSizeId]=oldDetail.ReprocessQuantity;
                            }
                            else{
                                exQty[oldDetail.ServiceSubconCuttingSizeId]+=oldDetail.ReprocessQuantity;
                            }
                        }
                    }
                }
            }

            for(var detail of newValue.Details){
                for(var size of detail.Sizes){
                    var oldQty=exQty[size.Id];
                    var det={};
                    det.RemQty=oldQty?(size.Quantity- oldQty):size.Quantity;
                    if(det.RemQty>0){
                        det.Size=size.Size;
                        det.ServiceSubconCuttingDetailId=detail.Id;
                        det.ServiceSubconCuttingSizeId=size.Id;
                        det.ReprocessQuantity=det.RemQty;
                        det.Quantity=  size.Quantity;
                        det.Uom=size.Uom;
                        det.Color=size.Color;
                        det.DesignColor=detail.DesignColor;
                        this.data.Details.push(det);
                    }
                    
                }
            }
        }
    }

}