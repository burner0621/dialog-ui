import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';
import moment from 'moment';


@inject(Router, Service)
export class View {
  hasCancel = true;
  hasMasterPlan = false;

  constructor(router, service) {
    this.router = router;
    this.service = service;
  }

  async activate(params) {
    this.params = params;
    var id = params.id;
    this.data = await this.service.getById(id);
    if(this.data.CanceledQuantity > 0 || this.data.ExpiredBookingQuantity > 0){
        this.beginingOrderQuantity = this.data.OrderQuantity + this.data.ExpiredBookingQuantity + this.data.CanceledQuantity;
      }
      this.selectedSection = { Code:this.data.SectionCode, Name:this.data.SectionName,};
      this.selectedBuyer = { Code:this.data.BuyerCode, Name:this.data.BuyerName,};
      
      var today = new Date();
      today.setDate(today.getDate()+45);
      var deliveryDates = new Date(Date.parse(this.data.DeliveryDate));
      if(this.data.ConfirmedQuantity === 0 && deliveryDates > today && this.data.HadConfirmed === false){
        this.hasEdit = true;
        this.hasDelete = true;
        this.hascancelConfirm = true;
      }
      else if(this.data.HadConfirmed === true && this.data.ConfirmedQuantity < this.data.OrderQuantity && deliveryDates > today){
        this.hasEdit = false;
        this.hasDelete = true;
        this.hascancelConfirm = true;
      }
      if(deliveryDates > today){
        this.hasConfirm = true;
      }
      if(this.data.ConfirmedQuantity < this.data.OrderQuantity && deliveryDates > today && this.data.ConfirmedQuantity != 0){
        this.hascancelConfirm = true;
        this.hasEdit = false;
        this.hasDelete = false;
        this.expireBooking = false;
        this.hasConfirm = true;
      }
      if(this.data.ConfirmedQuantity < this.data.OrderQuantity && deliveryDates <= today){
        this.expireBooking = true;
        this.hasEdit = false;
        this.hasDelete = false; 
        
      }
      if(this.data.ConfirmedQuantity >= this.data.OrderQuantity && this.data.IsBlockingPlan === true){
        this.hasEdit = false;
        this.hasDelete = false;
        //this.hasConfirm = false;
      }
      if(this.data.ConfirmedQuantity >= this.data.OrderQuantity && this.data.IsBlockingPlan === false){
        this.hasCancel = true;
        this.hasDelete = false;
        this.hasEdit = false;
        this.hasConfirm = true;
      }
      if(deliveryDates <= today){
        this.hasConfirm = false;
      }
      if(this.data.IsBlockingPlan == true){
        this.hasMasterPlan = true;
      }
  }

  cancel(event) {
    this.router.navigateToRoute('list');
  }

  masterPlan(event) {
      this.router.navigateToRoute('detail', { id: this.data.Id});
  }
}