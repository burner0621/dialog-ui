import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import moment from 'moment';

@inject(Router, Service)
export class List {
    dataToBeDeleted = [];
    info = { page: 1, keyword: '' };

    rowFormatter(data, index) {
        var today = new Date();
        today.setDate(today.getDate()+45);
        var deliveryDates = new Date(Date.parse(data.DeliveryDate));
        if (deliveryDates <= today && data.ConfirmedQuantity < data.OrderQuantity){
            return { classes: "danger" }
        } else {
            return {}
        }
    }

    options = {
        pagination: false,
    };

    context = ["detail"]

    columns = [
        {
            field: "isPosting", title: "Post", checkbox: true, sortable: false,
            formatter: function (value, data, index) {
                this.checkboxEnabled = !data.IsPosted;
                return ""
            }
        },
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
                data.statusOrder = "On Proses";
                return "On Proses";
            } 
            else if (data.ConfirmedQuantity >= data.OrderQuantity){
                data.statusOrder = "-";
                return "-";
            } 
            else if(data.ConfirmedQuantity < data.OrderQuantity && deliveryDates <= today){
                data.statusOrder = "Expired";
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
                for (var _data of result.data) {
                    var prNo = _data.Items.map(function (item) {
                        return `<li>${item.PRNo}</li>`;
                    });
                    prNo = prNo.filter(function (elem, index, self) {
                        return index == self.indexOf(elem);
                    })
                    _data.purchaseRequestNo = `<ul>${prNo.join()}</ul>`;
                    if (_data.IsOverBudget) {
                        if (_data.IsApproved) {
                            _data.approveStatus = "SUDAH";
                        } else {
                            _data.approveStatus = "BELUM";
                        }
                    } else {
                        _data.approveStatus = "-";
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

    contextClickCallback(event) {
        var arg = event.detail;
        var data = arg.data;
        switch (arg.name) {
            case "detail":
                this.router.navigateToRoute('view', { id: data.Id });
                break;
        }
    }

    delete() {
        if (this.dataToBeDeleted.length === 0) {
            alert("Tidak Ada Data");
            return;
        }
        this.service.deleteRemaining(this.dataToBeDeleted)
            .then(() => {
                alert("Sisa Booking Order Berhasil Dihapus");
                this.table.refresh();
            })
            .catch(error => {
                if(error.statusCode === 500){
                    alert(error.message);
                }
            })
    }
}