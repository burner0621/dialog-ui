import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';


@inject(Router, Service)
export class Edit {
    constructor(router, service) {
        this.router = router;
        this.service = service;
    }

    async activate(params) {
        var id = params.id;
        this.data = await this.service.getById(id);
        if (this.data.bon && this.data.type == "OUT") {
            this.data.warehousesProductionOrders = await this.service.getProductionOrderOutput(this.data.bon.id);
            for (var item of this.data.warehousesProductionOrders) {
                item.productionOrderItems = item.productionOrderItems.filter(s => s.hasNextAreaDocument === false);
            }
            this.data.warehousesProductionOrders = this.data.warehousesProductionOrders.filter(s => s.productionOrderItems.length > 0);
        }
        this.canEdit = true;
    }

    view(data) {
        this.router.navigateToRoute('view', { id: this.data.id });
    }

    save() {
        var sppWarehouseList = [];
        if (this.data.type == "OUT") {
            this.data.displayWarehousesProductionOrders.forEach(element => {
                element.productionOrderItems
                    // .filter((s) => s.IsSave === true)
                    .forEach(item => {
                        sppWarehouseList.push(item);
                    })
            });
            this.data.warehousesProductionOrders = sppWarehouseList;

            let countSelectedPack = 0;
            for(var i = 0; i < this.data.warehousesProductionOrders.length; i++){
                if(this.data.warehousesProductionOrders[i].id == null || this.data.warehousesProductionOrders[i].id == undefined){
                    this.data.warehousesProductionOrders[i].id = 0
                }

                var newProductPackingCode = "";
                var productPackingCodeList = this.data.warehousesProductionOrders[i].productPackingCodeList.filter(c => c.IsSave);

                for (var j = 0; j < productPackingCodeList.length; j++){
                    countSelectedPack++;
                    if(productPackingCodeList.length - 1 === j){
                        newProductPackingCode += productPackingCodeList[j].packingCode;
                    }else{
                        newProductPackingCode += productPackingCodeList[j].packingCode + ",";
                    }
                }
    
                this.data.warehousesProductionOrders[i].productPackingCode = newProductPackingCode;
            }
            
            this.data.warehousesProductionOrders = this.data.warehousesProductionOrders.filter(d => d.productPackingCode !== '');
                
            const haveCommonCode = this.findCommonElements(this.data.warehousesProductionOrders);
            if(haveCommonCode){
                alert("Terdapat duplikasi pada kode packing yang dipilih");
                return;
            }

            if(countSelectedPack === 0){
                alert("Belum ada kode packing yang dipilih");
                return;
            }
        } else {
            this.data.warehousesProductionOrders = this.data.adjWarehousesProductionOrders;
        }
        
        this.service.update(this.data).then(result => {
            this.view();
        }).catch(e => {
            this.error = e;
        })
    }

    findCommonElements(savedDataList) {      
        let packCodeList = [];
        let savedDataListLength = savedDataList.length;
        for(let i = 0; i < savedDataListLength; i++){
          let savedPackingCodeList = savedDataList[i].productPackingCodeList.filter(c => c.IsSave);
    
          if(packCodeList.length === 0){
            packCodeList = savedPackingCodeList.map(d => d.packingCode);
          }else{
            let l = savedPackingCodeList.length;

          console.log(packCodeList.toString());
          console.log(savedPackingCodeList.map(d => d.packingCode).toString());
            for(let j = 0; j < l; j++){
              if(packCodeList.includes(savedPackingCodeList[j].packingCode)){
                return true;
              }else{
                packCodeList.push(savedPackingCodeList[j].packingCode);
              }
            }
          }
        }
        return false;
      }
}