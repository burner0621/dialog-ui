import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';

@inject(Router, Service)
export class View {
    constructor(router, service) {
        this.router = router;
        this.service = service;
    }

    async activate(params) {
        let id = params.id;
        this.data = await this.service.read(id);
        var cutIn= await this.service.GetCuttingById(this.data.CutInId);
        this.selectedCutting={
            CutInNo: this.data.CutInNo
        };
        
        this.data.CuttingType=cutIn.CuttingType;
        this.data.Article= cutIn.Article;
        var cutInDetails=[];
        if(cutIn){
            for(var a of cutIn.Items){
                for(var detail of a.Details){
                    var item={};
                    item.Quantity=detail.PreparingQuantity;
                    item.ActualQuantity=detail.PreparingQuantity;
                    this.data.TotalQuantity+=detail.PreparingQuantity;
                    item.CutInDetailId=detail.Id;
                    item.PreparingQuantity=detail.PreparingQuantity;
                    item.CuttingInQuantity=detail.CuttingInQuantity;
                    item.FC=detail.FC;
                    item.PreparingItemId=detail.PreparingItemId;
                    item.Product=detail.Product;
                    item.DesignColor=detail.DesignColor;
                    cutInDetails.push(item);
                }
            }
        }
        for(var item of this.data.Items){
            var cutInDetail=cutInDetails.find(a=>a.CutInDetailId==item.CutInDetailId);
            if(cutInDetail){
                item.Product=cutInDetail.Product;
                item.CuttingInQuantity=cutInDetail.CuttingInQuantity;
                item.Remaining = item.Quantity-item.ActualQuantity;
                item.DesignColor=cutInDetail.DesignColor;
                
            }
        }
        this.selectedUnit=this.data.Unit;
        
        this.editCallback = null;
        this.deleteCallback = null;
    }

    cancelCallback(event) {
        this.router.navigateToRoute('list');
    }

    editCallback(event) {
        this.router.navigateToRoute('edit', { id: this.data.Id });
    }

    deleteCallback(event) {
        // if (confirm(`Hapus ${this.data.CutInNo}?`))
            this.service.delete(this.data)
                .then(result => {
                    alert(`delete data success`);
                    this.cancelCallback();
                })
                .catch(e => {
                    this.error = e;
                })
    }
}