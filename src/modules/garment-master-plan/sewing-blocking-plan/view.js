import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';
import moment from 'moment';
import { Dialog } from '../../../components/dialog/dialog';
import { AlertView } from './custom-dialog-view/alert-view';


@inject(Router, Service, Dialog)
export class View {
  hasCancel = true;
  hasEdit = true;
  hasDelete = true;

    constructor(router, service, dialog) {
        this.router = router;
        this.service = service;
        this.isView=true;
        this.dialog = dialog;
    }

    bind() {
        this.error = {};
    }

    async activate(params) {
        var id = params.id;
        this.data = await this.service.getById(id);
        this.data.booking=JSON.parse(this.data.BookingItems);
        if(this.data.Status=== "Booking Dihapus" || this.data.Status=== "Booking Expired"){
            this.hasEdit=false;
        }
        else if(this.data.Status=== "Booking Dibatalkan"){
            this.hasEdit=false;
        }
        if(this.data.Status!== "Booking Dihapus")
        {
            if(this.data && this.data.BookingOrderId){
                this.booking = {};
                var bookingData = await this.service.getBookingById(this.data.BookingOrderId);
                if(moment(this.data.BookingDate).format("DD MMM YYYY") !== moment(bookingData.BookingDate).format("DD MMM YYYY"))
                    this.booking["BookingDate"] = bookingData.BookingDate;
                if(this.data.OrderQuantity !== bookingData.OrderQuantity)
                    this.booking["OrderQuantity"] = bookingData.OrderQuantity;
                if(moment(this.data.DeliveryDate).format("DD MMM YYYY") !== moment(bookingData.DeliveryDate).format("DD MMM YYYY"))
                    this.booking["DeliveryDate"] = bookingData.DeliveryDate;
                if(this.data.Remark !== bookingData.Remark)
                    this.booking["Remark"] = bookingData.Remark;
                var details = [];
                var bookItems=[];
                var index=0;
                for(var detail of this.data.booking){
                    var bookingDetail = bookingData.Items.find(item => item.Id === detail.Id);
                    if(bookingDetail){
                        if(bookingDetail.ComodityId !== detail.ComodityId){
                            detail["bookingMasterPlanComodity"] ={ name: bookingDetail.ComodityName, code: bookingDetail.ComodityCode};
                            detail["bookingMasterPlanComodityId"] = bookingDetail.ComodityId;
                        }
                        if(bookingDetail.ConfirmQuantity !== detail.ConfirmQuantity){
                            detail["bookingQuantity"] = bookingDetail.ConfirmQuantity;
                        }
                        if(bookingDetail.Remark !== detail.Remark)
                            detail["bookingRemark"] = bookingDetail.Remark;
                        if(bookingDetail.DeliveryDate && detail.DeliveryDate && moment(bookingDetail.DeliveryDate).format("DD MMM YYYY") !== moment(detail.DeliveryDate).format("DD MMM YYYY"))
                            detail["bookingDeliveryDate"] = moment(bookingDetail.DeliveryDate).format("DD MMM YYYY");//`${(new Date(bookingDetail.deliveryDate)).getDay()} - ${((new Date(bookingDetail.deliveryDate)).getMonth() + 1)} - ${(new Date(bookingDetail.deliveryDate)).getFullYear()}`;
                    }else{
                        detail["deletedData"] = "Md telah menghapus detail ini"
                    }
                    details.push(detail);
                }
                for(var item of bookingData.Items){
                    var detail = this.data.booking.find(detail => detail.Id === item.Id);
                    if(!detail){
                        var newDetail= {
                            Id:item.Id,
                            ComodityId:item.ComodityId,
                            ComodityName:item.ComodityName,
                            ComodityCode:item.ComodityCode,
                            ConfirmQuantity:item.ConfirmQuantity,
                            Remark:item.Remark,
                            DeliveryDate:item.DeliveryDate,
                            newData:"Md telah menambah detail ini"
                        }
                        details.push(newDetail);
                    }
                }
                this.data.booking = details;

            }
        }
    }

    cancel(event) {
        this.router.navigateToRoute('list');
    }

    edit(event) {
        this.router.navigateToRoute('edit', { id: this.data.Id });
    }   
    
    delete(event) {
        // this.service.delete(this.data)
        //     .then(result => {
        //     this.cancel();
        //     });

        this.dialog.show(AlertView, { message: "<div>Apakah anda yakin akan menghapus data ini?</div>" })
            .then(response => {
                if (!response.wasCancelled) {
                    this.service.delete(this.data)
                        .then(result => {
                            this.cancel();
                        });
                }
            });
    }  
}