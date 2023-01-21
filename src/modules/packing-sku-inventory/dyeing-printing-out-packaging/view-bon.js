import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';
import * as _ from 'underscore';
// import{Underscore} from 'underscore';

@inject(Router, Service)
export class View {
    constructor(router, service) {
        this.router = router;
        this.service = service;
    }
    canEdit = true;
    async activate(params) {
        var id = params.id;
        this.data = await this.service.getByIdBon(id);
        this.type= true;
        // if (this.data.type == "OUT") {
        //     this.data.packagingProductionOrders = this.data.packagingProductionOrders.filter(s => s.hasNextAreaDocument === false);
        // }

        this.canEdit = this.data.type == "ADJ" || this.data.packagingProductionOrders.some(s => s.hasNextAreaDocument === false);
        var groupObj = _.groupBy(this.data.packagingProductionOrders, 'productionOrderNo');
        
        var mappedGroup = _.map(groupObj);
        

        var packagingProductionOrdersGroup = [];
        mappedGroup.forEach((element, index) => {
            var headData = {};
            element.forEach((x, i) => {
                
                if (i == 0) {
                    
                    headData = x;
                    headData.PackagingList = [];
                    
                }
                
                if (headData.PackagingList != undefined) {
                    headData.PackagingList.push(x);
                }
            });
            // var headData = element[0]
            
            //     headData.PackagingList = element;
            packagingProductionOrdersGroup.push(headData);

            console.log(headData);
            
        });
        
        this.data.packagingProductionOrders = packagingProductionOrdersGroup;
        //console.log(packagingProductionOrdersGroup);

    }

    list() {
        this.router.navigateToRoute('list');
    }

    edit(data) {
        this.router.navigateToRoute('edit', { id: this.data.id });
    }

    delete() {
        this.service.delete(this.data)
            .then(result => {
                this.list();
            });
    }
}