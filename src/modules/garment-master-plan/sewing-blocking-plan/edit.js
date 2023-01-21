import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';
import moment from 'moment';


@inject(Router, Service)
export class Edit {
    hasCancel = true;
    hasSave = true;

    constructor(router, service) {
        this.router = router;
        this.service = service;
        this.isEdit=true;
    }

    bind() {
        this.error = {};
    }

    async activate(params) {
        var id = params.id;
        this.data = await this.service.getById(id);
        this.data.booking=JSON.parse(this.data.BookingItems);
        if(this.data && this.data.BookingOrderId){
                this.booking = {};
                this.newBookingItem=[];
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
                this.newBookingItem=[];
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
                    
                    this.newBookingItem.push(bookingDetail);
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
                        this.newBookingItem.push(item);
                    }
                }
                this.data.booking = details;

        }
    }

    cancel(event) {
        this.router.navigateToRoute('view', { id: this.data.Id });
    }

    save(event) {
        var booking=[];
        if(this.newBookingItem){
            for(var item of this.newBookingItem){
                
                var a={
                    Id:item.Id,
                    ComodityId:item.ComodityId,
                    ComodityName:item.ComodityName,
                    ComodityCode:item.ComodityCode,
                    ConfirmQuantity:item.ConfirmQuantity,
                    Remark:item.Remark,
                    DeliveryDate:item.DeliveryDate
                }
                booking.push(a);
            }
        }
        this.data.BookingItems=(JSON.stringify(booking));
        if(!this.data.BookingOrderId){
            this.data.BookingOrderId=0;
        }
        var dataTemp=this.data;
        if(this.booking){
            if(this.booking.BookingDate)
                dataTemp.BookingDate=this.booking.BookingDate;
            if(this.booking.OrderQuantity )
                dataTemp.OrderQuantity=this.booking.OrderQuantity;
            if(this.booking.DeliveryDate )
                dataTemp.DeliveryDate=this.booking.DeliveryDate;
            if(this.booking.Remark )
                dataTemp.Remark=this.booking.Remark;
        }
        for(var dataItem of dataTemp.Items){
            if(dataItem.LastModifiedUtc==null){
                dataItem.LastModifiedUtc=new Date();
            }
        }
        //dataTemp.BookingItems=(JSON.stringify(this.newBookingItem));
        this.service.update(dataTemp).then(result => {
            this.cancel();
        }).catch(e => {
            this.error = e;
        })
    }
}