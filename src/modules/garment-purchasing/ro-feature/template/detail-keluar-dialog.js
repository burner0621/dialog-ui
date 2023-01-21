import { inject, useView } from 'aurelia-framework';
import { DialogController } from 'aurelia-dialog';

const moment = require('moment');

@inject(DialogController)
@useView("./detail-keluar-dialog.html")
export class DialogDetailKeluarView {
    constructor(controller) {
        this.controller = controller;
    }

    activate(params) {
        // console.log(params);
        this.data = params.data;
        // console.log(this.data)
        this.RONo = this.data[0].RONo;
        this.NamaBarang = this.data[0].NamaBarang;
        this.KodeBarang = this.data[0].KodeBarang;
        this.PO = this.data[0].PO;
        var Total = 0
        for(var i in this.data){
            // console.log(this.data[i])
            Total += this.data[i].Qty;
        }

        this.totalQuantity = Total;


        // console.log(this.data);
        
        // this.table.refresh();
    }

    length4 = {
        label: {
          align: "left",
          length: 5
        }
    }


    tableOptions = {
        search: false,
        showToggle: false,
        showColumns: false,
        sortable: false,
        pagination: false
    }
}