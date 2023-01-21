import { inject, bindable } from 'aurelia-framework';
import { Service } from '../service';
var ExternalTransferOrderLoader = require('../../../../loader/external-transfer-order-by-division-loader');
var moment = require('moment');

@inject(Service)
export class DeliveryOrderItem {
    @bindable ETONo;
    @bindable selectedExternalTransferOrderFilter = {};

    columns = ["details.UnitName", "details.TRNo", "details.TRNo", "details.RequestedQuantity", "details.RemainingQuantity", "details.UomUnit", "details.Grade", "details.Remark"];

    constructor(service) {
        this.service = service;
    }

    activate(context) {
        this.items = context.context.items;
        this.data = context.data;
        
        this.error = context.error;
        this.options = context.context.options;
        this.readOnly = context.options.readOnly;
        // console.log(context.options.readOnly);
        if (this.data.ETONo) {
          this.ETONo=this.data.ETONo;
          
          // var i = 0;
          // for (var Detail of this.data.details) {
          //     Detail.UnitName = this.data.UnitName;
          //     Detail.TRNo = this.data.TRNo ;
          // }
          this.isShowing = true;
          this.isEdit = true;
          
       }

        this.selectedExternalTransferOrderFilter = this.options.filter;
        // this.selectedExternalTransferOrderFilter.currentUsed =  this.items.map(item => item.data.ETONo);
        if(this.isEdit!=false){

          this.selectedExternalTransferOrderFilter.currentUsed =  this.items.map(item => item.data.ETONo);
        }
        
    }

    get externalTransferOrderLoader() {
      return ExternalTransferOrderLoader;
    }
    TransferDeliveryOrderView = (transferDeliveryOrder) => {
      return transferDeliveryOrder.ETONo
    } 
    
    ETONoChanged(newValue,externalTransferOrder) {
            this.externalTransferOrderItems = newValue;
            // console.log(newValue);
            this.data.items = [];
            this.data.items.details =[];
            var i = 0; //pake for disini buat ambil newvalue.ExternalTransferOrderItems
            for (var ExternalTransferOrderItems of this.externalTransferOrderItems.ExternalTransferOrderItems){
             
                this.data.ETONo = this.externalTransferOrderItems.ETONo,
                this.data.ETOId = this.externalTransferOrderItems.Id,
                this.data.ITOId = ExternalTransferOrderItems.ITOId,
                this.data.ITONo = ExternalTransferOrderItems.ITONo
              
              for (var toDetail of ExternalTransferOrderItems.ExternalTransferOrderDetails){
                var detail = {
                  ETODetailId : toDetail.Id,
                  ITODetailId : toDetail.ITODetailId,
                  TRDetailId : toDetail.TRDetailId,
                  ProductId: toDetail.Product._id,
                  ProductCode : toDetail.Product.code,
                  ProductName : toDetail.Product.name,
                  Product : toDetail.Product.code +' - '+ toDetail.Product.name,
                  Grade : toDetail.Grade,
                  ProductRemark : toDetail.ProductRemark,
                  RequestedQuantity : toDetail.DealQuantity,
                  UomId : toDetail.DealUom._id,
                  UomUnit : toDetail.DealUom.unit,
                  DOQuantity : toDetail.RemainingQuantity, 
                  RemainingQuantity : toDetail.RemainingQuantity,
                  TRId : ExternalTransferOrderItems.TRId,
                  TRNo : ExternalTransferOrderItems.TRNo,
                  UnitId : ExternalTransferOrderItems.Unit._id,
                  UnitCode : ExternalTransferOrderItems.Unit.code,
                  UnitName : ExternalTransferOrderItems.Unit.name  
                }
              
              this.data.details.push(detail);
              }
            } 
            this.error = {};
            this.isShowing = true;
        }
        
    toggle() {
        this.isShowing = !this.isShowing;
    }

}