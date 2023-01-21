import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';

@inject(Router, Service)
export class View {
    constructor(router, service) {
        this.router = router;
        this.service = service;
    }
    isEdit=true;
    async activate(params) {
        let id = params.id;
        this.data = await this.service.read(id);

        if (this.data) {
            this.selectedDLType=this.data.DLType;
            this.selectedContract={
                ContractNo: this.data.ContractNo,
                Id:this.data.SubconContractId,
            };
           
            this.selectedContractType=this.data.ContractType;
            this.selectedSubconCategory=this.data.SubconCategory;
        }
        this.getContractQty();
    }

    async getContractQty() {
        var subconContract = await this.service.readSubconContractById(this.data.SubconContractId);
        if(this.data.SubconCategory=='SUBCON SEWING' || this.data.ContractType=='SUBCON JASA' || this.data.ContractType=='SUBCON BAHAN BAKU'){
            this.service.searchComplete({filter: JSON.stringify({ ContractNo:this.data.ContractNo})})
            .then((contract)=>{
                console.log(contract)
                var usedQty= 0;
                if(contract.data.length>0){
                    for(var subcon of contract.data){
                        if(subcon.Id!=this.data.Id){
                            for(var subconItem of subcon.Items){
                                usedQty+=subconItem.Quantity;
                            }
                        }
                        else{
                            this.data.savedItems=subcon.Items;
                        }
                    }
                }
                this.data.QtyUsed=usedQty;
            });
        }
        this.data.ContractQty = subconContract.Quantity;
    }

    bind() {
        this.error = {};
        this.checkedAll = true;
    }

    cancelCallback(event) {
        this.router.navigateToRoute('view', { id: this.data.Id });
    }

    saveCallback(event) {
        if(this.data.SubconCategory=="SUBCON CUTTING SEWING")
            this.data.UsedQty=this.data.ContractQty-this.data.QtyUsed;
        else{
            this.data.UENId=0;
            //this.data.UsedQty=this.data.ContractQty;
            if(this.data.Items.length>0){
                this.data.UsedQty=this.data.ContractQty-this.data.QtyUsed;
                console.log(this.data.ContractQty,this.data.QtyUsed)
                for(var item of this.data.Items){
                    item.Product={
                        Id:0
                    };
                    item.Uom={
                        Id:0
                    }
                    item.UomOut={
                        Id:0
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
                if (typeof (this.error) == "string") {
                    alert(this.error);
                } else {
                    alert("Missing Some Data");
                }
            })
    }
}