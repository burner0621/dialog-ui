import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';

@inject(Router, Service)
export class View {
    isView = true;
    constructor(router, service) {
        this.router = router;
        this.service = service;
    }

    async activate(params) {
        let id = params.id;
        this.data = await this.service.read(id);
        if (this.data) {
            this.selectedDLType=this.data.DLType;
            if(this.data.IsUsed){
                this.deleteCallback=null;
                this.editCallback=null;
            }
            this.selectedContract={
                ContractNo: this.data.ContractNo,
                Id:this.data.SubconContractId,
            };
            this.selectedContractType=this.data.ContractType;
            this.selectedSubconCategory=this.data.SubconCategory;
            
        }
    }

    cancelCallback(event) {
        this.router.navigateToRoute('list');
    }

    deleteCallback(event) {
        if (confirm(`Hapus ${this.data.DLNo}?`))
            this.service.delete(this.data)
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
    
    editCallback(event) {
        this.router.navigateToRoute('edit', { id: this.data.Id });
    }

}