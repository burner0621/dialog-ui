import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import moment from 'moment';
import numeral from 'numeral';

@inject(Router, Service)
export class List {
    context = ["Rincian"];
    
    columns = [
        { field: "date", title: "Tanggal" },
        { field: "group", title: "Group" },
        { field: "activities", title: "Aktivitas" },
        { field: "mutation", title: "Mutasi"},
        { field: "noOrder", title :"No. SPP"},
        { field: "construction", title :"Konstruksi"},
        { field: "motif", title :"Motif"},
        { field: "color", title :"Warna"},
        { field: "grade", title :"Grade"},
        { field: "qtyPacking", title :"Qty Packaging"},
        { field: "packaging", title :"Packaging"},
        { field: "qty", title :"Qty"},
        { field: "satuan", title :"Satuan"},
        { field: "balance", title :"Saldo"},        
    ];
    loader = (info)=> {
        this.info = {};
        var searchDate = this.DateReport ? moment(this.DateReport).format("DD MMM YYYY HH:mm") : null;
        
        return this.listDataFlag ? (

            this.service.getReport(searchDate, this.GroupValue, this.ZonaValue)
                .then((result) => {
                    return {
                        data: result
                    }
                })
        ) : { total: 0, data: {} };
    }

    tableOptions = {
        search: false,
        showToggle: false,
        showColumns: false,
        pagination: false
    }
    
    groups=  ["","PAGI", "SIANG"];  
        
    zona = ["","PROD", "TRANSIT","PACK","GUDANG JADI","SHIP","AVAL","LAB"];  

    constructor(router, service) {
        this.service = service;
        this.router = router;
    }

    contextCallback(event) {
        let arg = event.detail;
        let data = arg.data;
        switch (arg.name) {
            case "Rincian":
                this.router.navigateToRoute('view', { id: data.Id });
                break;
        }
    }
    searching() {
        this.listDataFlag = true;

        this.table.refresh();
    }
    reset(){
        this.DateReport = null;
        this.GroupValue = null;
        this.ZonaValue = null;

    }
    ExportToExcel() {

        var searchDate = this.DateReport ? moment(this.DateReport).format("DD MMM YYYY HH:mm") : null;
        this.service.getExcel(searchDate, this.GroupValue, this.ZonaValue);
    }
}
