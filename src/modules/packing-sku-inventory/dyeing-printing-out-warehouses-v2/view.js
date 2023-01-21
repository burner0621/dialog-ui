import { inject, Lazy } from "aurelia-framework";
import { Router } from "aurelia-router";
import { Service } from "./service";
import * as _ from 'underscore';

@inject(Router, Service)
export class View {
  constructor(router, service) {
    this.router = router;
    this.service = service;
  }

  canEdit = true;
  async activate(params) {
    var id = params.id;
    this.data = await this.service.getById(id);
    if (this.data.bon && this.data.type == "OUT") {
      this.data.warehousesProductionOrders = await this.service.getProductionOrderOutput(this.data.bon.id);
    }
    
    this.canEdit = this.data.type == "ADJ" || this.data.warehousesProductionOrders.flatMap(s => s.productionOrderItems).some(s => s.hasNextAreaDocument === false);

    // if (this.data.type == "OUT") {
    //   this.data.warehousesProductionOrders = this.data.warehousesProductionOrders.filter(s => s.hasNextAreaDocument === false);
    // }

    // var groupObj = _.groupBy(this.data.warehousesProductionOrders, 'productionOrderNo');
    
    // var mappedGroup = _.map(groupObj);
    

    // var warehouseProductionOrdersGroup = [];
    // mappedGroup.forEach((element, index) => {
    //   var headData = {};
    //   element.forEach((x, i) => {
    
    //     x.productionOrderId = x.productionOrder.id;
    //     x.productionOrderNo = x.productionOrder.no;
    //     x.productionOrderOrderQuantity = x.productionOrder.orderQuantity;
    //     x.productionOrderType = x.productionOrder.type;
    //     if (i == 0) {
    
    //       headData = x;
    //       headData.productionOrderItems = [];
    
    //     }
    
    //     if (headData.productionOrderItems != undefined) {
    //       headData.productionOrderItems.push(x);
    //     }
    //   });
    //   // var headData = element[0]
    
    //   //     headData.PackagingList = element;
    //   warehouseProductionOrdersGroup.push(headData);
    // });
    
    // this.data.warehousesProductionOrders = warehouseProductionOrdersGroup;

    //this.spp = await this.service.getSPPbySC(this.data.salesContractNo);
   
    
  }

  list() {
    this.router.navigateToRoute("list");
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
