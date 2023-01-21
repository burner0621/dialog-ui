import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';
import moment from 'moment';

@inject(Router, Service)
export class Detail {
    constructor(router, service) {

        this.service = service;
        this.router = router;
        this.today = new Date();
    }

    async activate(params) {
        var id = params.id;
        this.id = id;
        var filterBookingOrderId = { "BookingOrderId" : id}
        var info = {filter : JSON.stringify(filterBookingOrderId)}
        var datas = await this.service.getMasterPlanByBookingOrderId(info);
        this.total=0;
        for(var a of datas){
            this.data = a.Items;
            this.BOId = a.BookingOrderId;
        }
        for(var a of this.data){
            a.confirm=a.IsConfirm ? "Ya" : "Tidak";
            var EndDate=moment(a.EndDate).format("DD MMM YYYY");
            var StartDate=moment(a.StartDate).format("DD MMM YYYY");
            a.week=`W${a.WeekNumber} - ${StartDate} s/d ${EndDate}`;
            this.total+=a.OrderQuantity;
        }
    }

    cancel(event) {
        this.router.navigateToRoute('view', { id: this.id});
    }

    
}