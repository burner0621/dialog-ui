import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service, SalesService } from './service';

@inject(Router, Service,SalesService)
export class View {
    constructor(router, service,salesService) {
        this.router = router;
        this.service = service;
        this.salesService=salesService;
    }

    async activate(params) {
        let id = params.id;
        this.data = await this.service.read(id);

        if (this.data) {
            this.selectedCuttingIn = {
                RONo: this.data.RONo
            };

            this.selectedUnit=this.data.Unit;
            let ssCuttingItems=[];
            let ssCutting = await this.service.searchComplete({ size: 100, filter: JSON.stringify({ RONo: this.data.RONo }) });
            
            if(ssCutting.data.length>0){
                for(var ssC of ssCutting.data){
                    if(ssC.Id!=this.data.Id){
                        for(var ssCItem of ssC.Items){
                            var item={};
                            item.cuttingInDetailId=ssCItem.CuttingInDetailId;
                            item.qty=ssCItem.Quantity;
                            if(ssCuttingItems[ssCItem.CuttingInDetailId]){
                                ssCuttingItems[ssCItem.CuttingInDetailId].qty+=ssCItem.Quantity;
                            }
                            else{
                                ssCuttingItems[ssCItem.CuttingInDetailId]=item;
                            }
                        }
                    }
                    
                }
            }
            var remainingCuttingInQty=[];
            Promise.resolve(this.service.getCuttingIn({ filter: JSON.stringify({ RONo: this.data.RONo, UnitId: this.data.Unit.Id, CuttingType:"MAIN FABRIC" }) }))
                .then(result => {
                    for(var cuttingInHeader of result.data){
                        for(var cuttingInItem of cuttingInHeader.Items){
                            for(var cuttingInDetail of cuttingInItem.Details){
                                var qtyOut=0;
                                if(ssCuttingItems[cuttingInDetail.Id]){
                                    qtyOut+=ssCuttingItems[cuttingInDetail.Id].qty;
                                }
                                cuttingInDetail.CuttingInQuantity=cuttingInDetail.CuttingInQuantity-qtyOut;
                                remainingCuttingInQty[cuttingInDetail.Id]=cuttingInDetail.CuttingInQuantity;
                                
                            }
                        }
                    }

                    for(var item of this.data.Items){
                        item.CuttingInQuantity=remainingCuttingInQty[item.CuttingInDetailId];
                    }
                });
        }
    }

    bind() {
        this.error = {};
        this.checkedAll = true;
    }

    cancelCallback(event) {
        this.router.navigateToRoute('view', { id: this.data.Id });
    }

    saveCallback(event) {
        if(this.data.Items){
            for(var item of this.data.Items){
                for(var detail of item.Details){
                    if(detail.Quantity>0){
                        detail.IsSave=true;
                        detail.CuttingInQuantity=detail.Quantity;
                    }
                    else{
                        detail.IsSave=false;
                        detail.CuttingInQuantity=detail.Quantity;
                    }
                }
            }
        }
        this.service.update(this.data)
            .then(result => {
                this.cancelCallback();
            })
            .catch(e => {
                this.error = e;
            })
    }
}