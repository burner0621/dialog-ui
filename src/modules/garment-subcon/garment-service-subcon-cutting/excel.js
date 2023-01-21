import { inject, bindable, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';
import moment from 'moment';
var ProductionOrderLoader = require('../../../loader/production-order-azure-loader');

@inject(Router, Service)
export class Create {

    constructor(router, service) {
        this.router = router;
        this.service = service;

        this.flag = false;

    }

    controlOptions = {
        label: {
            length: 4,
        },
        control: {
            length: 4,
        },
    };

    tableOptions = {
        search: false,
        showToggle: false,
        showColumns: false
    }

    //context = ["detail"];
    units = ["", "DYEING", "PRINTING"];
   
    columns = [
        { field: "bonNo", title: "No. Bon", sortable: false},
        { field: "productionOrder.no", title: "No. Spp", sortable: false},
        { 
            field: "dateIn", title: "Tanggal Masuk", sortable: false, formatter: function (value, data, index) {
                return moment(value).format("DD/MMM/YYYY")
            }
        },
        { 
            field: "productionOrder.orderQuantity", title: "Qty Order", sortable: false
        },
        { field: "cartNo", title: "No. Kereta", sortable: false},
        { field: "construction", title: "Material", sortable: false},
        { field: "unit", title: "Unit", sortable: false},
        { field: "buyer", title: "Buyer", sortable: false},
        { field: "color", title: "Warna", sortable: false},
        { field: "motif", title: "Motif", sortable: false},
        { field: "uomUnit", title: "Satuan", sortable: false},
        { 
            field: "inputQuantity", title: "Qty Terima", sortable: false
        }
    ];

    get productionOrderLoader() {
        return ProductionOrderLoader;
    }


    dateFromChanged(e) {
        var _startDate = new Date(e.srcElement.value);
        var _endDate = new Date(this.dateTo);


        if (_startDate > _endDate)
            this.dateTo = e.srcElement.value;

    }

    search() {
        this.error = {};

        if (Object.getOwnPropertyNames(this.error).length === 0) {
            this.flag = true;
            this.Table.refresh();
        }
    }
  

    reset(){
        this.productionOrder = null;
        this.unit = undefined;
        this.dateFrom = undefined;
        this.dateTo = undefined;

        this.error = {};
        this.flag = false;
    }


    /*loader = (info) => {
        var arg = {
            page: parseInt(info.offset / info.limit, 10) + 1,
            size: info.limit,
            productionOrderId: this.productionOrder ? this.productionOrder.Id :null,
            unit: this.unit,
            dateFrom: moment(this.dateFrom).format("MM-DD-YYYY"),
            dateTo: moment(this.dateTo).format("MM-DD-YYYY")
        }
        console.log(productionOrder);
        console.log(arg);

        return this.service.search(arg)
            .then((result) => {
                var data = {};
                data.data = result.data;
                data.total = result.total;

                return data;
            });

    } */

    loader = (info) => {
        var order = {};

        if (info.sort)
            order[info.sort] = info.order;
        

        let args = {
            page: parseInt(info.offset / info.limit, 10) + 1,
            size: info.limit,
            // productionOrderId: this.productionOrder ? this.productionOrder.Id: "",
            //  unit: this.unit,
            dateTo: this.dateTo? moment(this.dateTo).format("MM/DD/YYYY"):"",
            dateFrom: this.dateFrom? moment(this.dateFrom).format("MM/DD/YYYY"):"",
            
        };
        console.log(this.productionOrder);
        console.log(args);
        return this.flag ?
            (
                this.service.search1(args)
                    .then(result => {
                        var index=0;
                        for(var data of result.data){
                            index++;
                            data.index=index;
                           
                        }
                        return {
                            total: result.total,
                            data: result.data
                        };
                    })
            ) : { total: 0, data: [] };
            
    }

    list() {
        this.router.navigateToRoute('list');
    }

    /*excel() {
        this.info = {};
        if (this.filter) {
            this.info.productionOrderId = this.filter.productionOrder ? this.info.productionOrder.Id : "";
            this.info.unit = this.filter.unit ? this.filter.unit : "";
            this.info.dateFrom = this.filter.dateFrom ? moment(this.filter.dateFrom).format("YYYY-MM-DD") : "";
            this.info.dateTo = this.filter.dateTo ? moment(this.filter.dateTo).format("YYYY-MM-DD") : "";
        }
        this.service.generateExcel(this.info);
    }*/
    excel() {
        this.error = {};
        if (Object.getOwnPropertyNames(this.error).length === 0) {
            let args = {
            // ProductionOrderId: this.productionOrder? this.productionOrder.Id : "",
            // Unit: this.unit,
            dateTo: this.dateTo? moment(this.dateTo).format("MM/DD/YYYY"):"",
            dateFrom: this.dateFrom? moment(this.dateFrom).format("MM/DD/YYYY"):""
        };

            this.service.generateExcel(args)
                .catch(e => {
                    alert(e.replace(e, "Error: ", ""));
                });
        }
    }


    

}
