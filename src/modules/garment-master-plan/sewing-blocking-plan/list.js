import {inject} from 'aurelia-framework';
import {Service} from "./service";
import {Router} from 'aurelia-router';
import moment from 'moment';

@inject(Router, Service)
export class List {
    dataToBePosted = [];
    info = { page: 1, keyword: '' };

    rowFormatter(data, index) {
        if (data.Status === "Booking Dihapus")
            return { classes: "danger" };
        else if(data.Status === "Booking Dibatalkan")
            return { classes: "danger" };
        else if(data.Status === "Booking Ada Perubahan")
            return { classes: "info" };
        else if (data.Status === "Booking Expired")
            return { classes: "danger" };
        else if (data.Status === "Confirm Full")
            return { classes: "success" };
        else if (data.Status === "Confirm Sebagian")
            return { classes: "warning" };
        else
            return {};
    }

    context = ["detail"]

    options = {}

    columns = [
        { field: "BookingOrderNo", title: "Nomor Booking" },
        { field: "BookingOrderDate", title: "Tanggal Booking", formatter: function (value, data, index) {
                return moment(value).format("DD MMM YYYY");
            }
        },
        { field: "BuyerName", title: "Buyer", formatter: function (value, data, index) {
                return data.Buyer.Name;
            }},
        { field: "OrderQuantity", title: "Jumlah Order" },
        {
            field: "DeliveryDate", title: "Tanggal Pengiriman", formatter: function (value, data, index) {
                return moment(value).format("DD MMM YYYY");
            }
        },
        { field: "Remark", title: "Keterangan" },
        { field: "Status", title: "Status" },
    ];

    loader = (info) => {
        var order = {};
        if (info.sort)
            order[info.sort] = info.order;
        var arg = {
            page: parseInt(info.offset / info.limit, 10) + 1,
            size: info.limit,
            keyword: info.search,
           // select:["_id","bookingOrderNo", "garmentBuyerName", "quantity", "bookingDate", "deliveryDate", "remark", "status","details"],
            order: order
        }

        return this.service.search(arg)
            .then(result => {
                var data = {}
                data.total = result.info.total;
                data.data = result.data;
                // return data;
                for(var dt of result.data){
                    var flag=0;
                    var count=0;
                    for(var item of dt.Items){
                        if(item.IsConfirm){
                            flag++;
                        }
                        count++;
                    }
                    if(flag===count && dt.Status=="Booking"){
                        dt.Status="Confirm Full";
                    }
                    else if(flag>0 && dt.Status=="Booking"){
                        dt.Status="Confirm Sebagian";
                    }
                }
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