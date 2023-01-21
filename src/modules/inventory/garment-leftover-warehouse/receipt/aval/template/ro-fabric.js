import { inject, bindable, computedFrom } from 'aurelia-framework'
import { GarmentProductionService } from '../service';

@inject(GarmentProductionService)
export class ro {
    @bindable selectedRO;

    get roLoader() {
        return (keyword) => {
            var filter={
                UnitId: this.data.UnitId, "GarmentAvalProductItem.Any(IsReceived==false)":true
            }
            for(var item of this.context.context.items){
                filter[`RONo == "${item.data.RONo}"`]=false;
            }
            var info = {
              keyword: keyword,
              filter: JSON.stringify(filter)
            };
            return this.garmentProductionService.getAvalProduct(info)
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

    constructor(garmentProductionService) {
        this.garmentProductionService = garmentProductionService;
    }

    // @computedFrom("data.Quantity", "data.Conversion")
    // get convertedQuantity() {
    //     return parseFloat((this.data.Quantity * this.data.Conversion).toFixed(2));
    // }

    activate(context) {
        this.context = context;
        this.data = context.data;
        this.error = context.error;
        this.options = context.options;
        if(this.data.RONo){
            this.selectedRO = {
                RONo:this.data.RONo
            };
        }
        this.readOnly = this.options.readOnly;
        this.isCreate = context.context.options.isCreate;
        this.isEdit = context.context.options.isEdit;
        this.itemOptions = {
            error: this.error,
            isCreate: this.isCreate,
            readOnly: this.readOnly,
            isEdit:this.isEdit,
        };
    }

    async selectedROChanged(newValue) {
        this.data.FabricItems.splice(0);
        if (newValue) {
            this.data.RONo=newValue.RONo;
            Promise.resolve(this.garmentProductionService.getAvalProduct({ filter: JSON.stringify({RONo:this.data.RONo,UnitId: this.data.UnitId, "GarmentAvalProductItem.Any(IsReceived==false)":true})}))
            .then(result => {
                for(var avalProduct of result.data){
                    for(var avalProductItem of avalProduct.Items){
                        if(avalProductItem.IsReceived==false){
                            var item={};
                            item.GarmentAvalProductId=avalProduct.Id;
                            item.GarmentAvalProductItemId=avalProductItem.Id;
                            item.Product=avalProductItem.Product;
                            item.ProductRemark=avalProductItem.DesignColor;
                            item.Quantity=avalProductItem.Quantity;
                            item.Uom=avalProductItem.Uom;
                            this.data.FabricItems.push(item);
                        }
                    }
                }
                
            });
        } else {
            this.data.FabricItems.splice(0);
        }
    }
    

    sizeView = (size) => {
        return `${size.Size}`;
    }

    fabricColumns = [
        "Kode Barang" ,
        "Keterangan" ,
        "Jumlah Aval" ,
        "Satuan" ,
    ]
}