import {inject} from 'aurelia-framework';
import {Service} from "./service";
import {Router} from 'aurelia-router';
import moment from 'moment';

@inject(Router, Service)
export class List {

    rowFormatter(data, index) {
        var today = new Date();
        today.setDate(today.getDate()+45);
        var deliveryDates = new Date(Date.parse(data.DeliveryDate));
        if (data.IsBlockingPlan == true && deliveryDates > today){
            return { classes: "success" }
        }else if(deliveryDates< today){
            return { classes: "danger" }
        }
        else
          return {}
      }
    context = ["detail"];

    options = {};

    columns = [
        { field: "BookingOrderNo", title: "Kode Booking" },
        { field: "BookingOrderDate", title: "Tanggal Booking", formatter: function (value, data, index) {
                return moment(value).format("DD MMM YYYY");
            }
         },
         { field: "BuyerName", title: "Buyer" },
         { field: "OrderQuantity", title: "Jumlah Order" },
        {
            field: "DeliveryDate", title: "Tanggal Pengiriman", formatter: function (value, data, index) {
                return moment(value).format("DD MMM YYYY");
            }
        },
        { field: "Remark", title: "Keterangan" },
        { field: "statusBook", title: "Status Booking Order", formatter: function (value, data, index) {
            if(data.IsBlockingPlan == true){
                return "Sudah Dibuat Master Plan";
            }else{
                if(data.ConfirmedQuantity == 0){
                    return "Booking";
                }else if(data.ConfirmedQuantity > 0){
                    return "Confirmed";
                }
            }
        } },
        { field: "statusConfirm", title: "Status Jumlah Confirm", formatter: function (value, data, index) {
            if(data.ConfirmedQuantity === 0){
                return "Belum Confirm";
            } else if (data.ConfirmedQuantity > 0 && (data.OrderQuantity > data.ConfirmedQuantity)){
                var total = data.OrderQuantity - data.ConfirmedQuantity;
                return "-"+total;
            } else if(data.OrderQuantity === data.ConfirmedQuantity){
                return 0;
            } else if(data.ConfirmedQuantity > data.OrderQuantity){
                var total1 = data.ConfirmedQuantity - data.OrderQuantity;
                return "+"+total1;
            }
        } },
        { field: "statusOrder", title: "Status Sisa Order", formatter: function (value, data, index) {
            var today = new Date();
            today.setDate(today.getDate()+45);
            var deliveryDates = new Date(Date.parse(data.DeliveryDate));
            if(data.ConfirmedQuantity < data.OrderQuantity && deliveryDates > today){
                return "On Proses";
            } 
            else if (data.ConfirmedQuantity >= data.OrderQuantity){
                return "-";
            } 
            else if(data.ConfirmedQuantity < data.OrderQuantity && deliveryDates <= today){
                return "Expired";
            }
        } }
    ];

    loader = (info) => {
        var order = {};
        if (info.sort)
            order[info.sort] = info.order;
        var arg = {
            page: parseInt(info.offset / info.limit, 10) + 1,
            size: info.limit,
            keyword: info.search,
            order: order,
        }

        return this.service.search(arg)
            .then(result => {
                var data = {};
                data.total = result.info.total;
                data.data = result.data;

                return {
                    total: result.info.total,
                    data: result.data
                }
            });
    
    }

    constructor(router, service) {
        this.service = service;
        this.router = router;
    }

    attached() {
        this.options.height = $(window).height() - $('nav.navbar').height() - $('h1.page-header').height();
    }

    contextClickCallback(event) {
        var arg = event.detail;
        var data = arg.data;
        switch (arg.name) {
            case "detail":
                this.router.navigateToRoute('view', { id: data.Id });
                break;
        }
    }

    create() {
        this.router.navigateToRoute('create');
    }
}