import { inject, bindable, computedFrom } from 'aurelia-framework';
import { NewItem } from '../../../purchasing/realization-vb-with-po/template/new-item';
import { Service} from "../service";

const SewingLoader = require('../../../../loader/garment-service-subcon-sewing-loader');
const SewingROLoader = require('../../../../loader/garment-service-subcon-sewing-item-loader');

@inject(Service)
export class ItemSewing {
    @bindable selectedSewing;
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
            this.selectedSewing={
                ServiceSubconSewingNo:this.data.ServiceSubconSewingNo,
                Id:this.data.ServiceSubconSewingId
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
            "Warna",
            "Design Warna",
            "Unit",
            "Jumlah",
            "Jumlah Reproses",
            "Satuan",
            "Keterangan",
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

    get SewingLoader() {
        return SewingLoader;
    }

    get SewingROLoader(){
        return SewingROLoader;
    }

    @computedFrom("data.ServiceSubconSewingId")
    get SewingROFilter() {
        if (this.data.ServiceSubconSewingId) {
          return { "ServiceSubconSewingId": this.data.ServiceSubconSewingId }
        }
        else {
          return { "ServiceSubconSewingId": "" }
        }
    }
    
    get subconFilter(){
        var filter={};
        for(var item of this.context.context.items){
            filter[`ServiceSubconSewingNo == "${item.data.ServiceSubconSewingNo}"`]=false;
        }
        return filter;
    }

    async selectedSewingChanged(newValue, oldValue){
        if(this.isCreate || this.isEdit){
            if(newValue) {
                if(this.data.Details.length>0){
                    this.data.Details.splice(0);
                }
                //this.context.error.Items = [];
                this.data.RONo = newValue.RONo;
                this.data.Article = newValue.Article;
                this.data.Comodity = newValue.Comodity;
                this.data.ServiceSubconSewingId= newValue.Id;
                this.data.ServiceSubconSewingNo=newValue.ServiceSubconSewingNo;
                this.data.Buyer=newValue.Buyer;
            }
            else {
                this.selectedSewingROViewModel.editorValue = "";
                this.data.RONo = null;
                this.selectedRO=null;
                this.data.Article = null;
                this.data.Comodity = null;
                this.data.Details.splice(0);
                this.data.Buyer = null;
                this.data.ServiceSubconSewingNo=null;
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
            this.data.ServiceSubconSewingItemId=newValue.Id;

            var exQty=[];
            let exists = await this.service.searchItem({ size: 1, filter: JSON.stringify({ ServiceSubconSewingDetailId: this.data.ServiceSubconSewingDetailId  }) });
            if(exists){
                for(var old of exists.data){
                    if(old.Id!=this.data.Id){
                        for(var oldDetail of old.Details){
                            if(!exQty[oldDetail.ServiceSubconSewingDetailId]){
                                exQty[oldDetail.ServiceSubconSewingDetailId]=oldDetail.ReprocessQuantity;
                            }
                            else{
                                exQty[oldDetail.ServiceSubconSewingDetailId]+=oldDetail.ReprocessQuantity;
                            }
                        }
                    }
                }
            }

            for(var detail of newValue.Details){
                var oldQty=exQty[detail.Id];
                var det={};
                det.RemQty=oldQty?(detail.Quantity- oldQty):detail.Quantity;
                if(det.RemQty>0){
                    det.Unit=detail.Unit;
                    det.ServiceSubconSewingDetailId=detail.Id;
                    det.ReprocessQuantity=det.RemQty;
                    det.Quantity=  detail.Quantity;
                    det.Uom=detail.Uom;
                    det.Color=detail.Color;
                    det.DesignColor=detail.DesignColor;
                    det.Remark=detail.Remark;
                    this.data.Details.push(det);
                }
                
            
            }
        }
    }

}