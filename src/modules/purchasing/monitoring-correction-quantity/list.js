import {inject} from 'aurelia-framework';
import {Service} from "./service";
import {Router} from 'aurelia-router';

var moment = require('moment');

@inject(Router, Service)
export class List {
    constructor(router, service) {

        this.service = service;
        this.router = router;
        this.today = new Date();
    }
    dateFrom = null;
    dateTo = null;

    activate() {
    }

    searching() {
            this.service.getReport(this.dateFrom, this.dateTo, this.machine, this.kanban)
                .then(result => {
                    this.data = result;

                    for (var corqty of this.data)
                     {
                        var x= corqty.items.pricePerUnit.toFixed(4).toString().split('.');
                        var x1=x[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                        var HARGA= x1 + '.' + x[1];

                        var y= corqty.items.priceTotal.toFixed(2).toString().split('.');
                        var y1=y[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                        var TOTAL= y1 + '.' + y[1];

                        var a= corqty.items.quantity.toFixed(2).toString().split('.');
                        var a1=a[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                        var Jumlah= a1 + '.' + a[1];

                         corqty.items.pricePerUnit = HARGA;
                         corqty.items.priceTotal = TOTAL;
                         corqty.items.quantity = Jumlah;
                     }
                })
    }
    
    // kanbanChanged(e){
    //     var selectedKanban = e.detail;
    //     if(selectedKanban){
    //         this.kanbanId = selectedKanban._id;
    //         if(selectedKanban.instruction){
    //             var steps = [];
    //             for(var step of selectedKanban.instruction.steps){
    //                 steps.push(step.process);
    //             }
    //             this.filterMachine = {
    //                 "step.process" : { "$in" : steps }
    //             };
    //         }
    //     }
    // }

    reset() {
        this.dateFrom = null;
        this.dateTo = null;
        this.data = [];
        this.error = '';
    }

    ExportToExcel() {
        //    var htmltable= document.getElementById('myTable');
        //    var html = htmltable.outerHTML;
        //    window.open('data:application/vnd.ms-excel,' + encodeURIComponent(html));
        this.service.generateExcel(this.dateFrom, this.dateTo, this.machine, this.kanban);
    }
}