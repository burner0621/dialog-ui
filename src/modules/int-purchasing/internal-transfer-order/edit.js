import {inject, Lazy} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Service} from './service';


@inject(Router, Service)
export class Edit {
    hasCancel = true;
    hasSplit = true;

    constructor(router, service) {
        this.router = router;
        this.service = service;
    }

    bind() {
        this.error = {};
       
    }

    async activate(params) {
       
        var id = params.id;
        
        this.data = await this.service.getById(id);
        this.data.isSplit = true;     
        this.data.transferRequest={};
       
        this.data.transferRequest.TRNo=this.data.TRNo;
        this.data.transferRequest.TRDate=this.data.TRDate;
        this.data.transferRequest.UnitName=this.data.DivisionName +"-"+ this.data.UnitName;
        this.data.transferRequest.Remarks=this.data.Remarks;
        this.data.transferRequest.RequestedArrivalDate=this.data.RequestedArrivalDate;
        this.data.transferRequest.CategoryName=this.data.CategoryCode +"-"+ this.data.CategoryName;
        for(var item of this.data.InternalTransferOrderDetails)   {
           item.product =item.ProductCode+"-"+ item.ProductName;
        }
    }

    cancel(event) {
        this.router.navigateToRoute('view', { id: this.data.Id });
    }

    save(event) {
        this.service.update(this.data).then(result => {
            this.cancel();
        }).catch(e => {
            this.error = e;
        })
    }

    split(event) {
   
        this.service.split(this.copyForSplit(this.data)).then(result => {
            // console.log(result);
            this.cancel();
        }).catch(e => {
            this.error = e;
           
        })
    }

    copyForSplit(transferOrder) {
        var newTransferOrder = Object.assign({}, transferOrder);
        delete newTransferOrder.Id;
        newTransferOrder.sourceTransferOrderId = transferOrder.Id;
        newTransferOrder.sourceTransferOrder = Object.assign({}, transferOrder);
        return newTransferOrder;
    }

}