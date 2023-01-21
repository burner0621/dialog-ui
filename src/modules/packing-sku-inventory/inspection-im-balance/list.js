import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import moment from 'moment';
import numeral from 'numeral';

const GroupLoader = require("../../../loader/inspection-group-loader");
const UnitLoader = require("../../../loader/inspection-unit-loader");

@inject(Router, Service)
export class List {
    context = ["Rincian"];
    tableOptions = {
        search: false,
        showToggle: false,
        showColumns: false,
        pagination: false
    }
    columns = [
        { field: "material", title: "Material" },
        { field: "noOrder", title: "No SP" },
        { field: "sumOfAwal", title: "Sum of AWAL" },
        { field: "sumOfMasuk", title: "Sum of MSK"},
        { field: "sumOfKeluar", title :"Sum of KELUAR"},
        { field: "sumOfAkhir", title :"Sum of AKHIR"}
    ];
    loader = (info)=> {
        this.info = {};
        var searchDate = this.DateReport ? moment(this.DateReport).format("DD MMM YYYY HH:mm") : null;
        
        return this.listDataFlag ? (

            this.service.getReport(searchDate, this.ShiftValue, this.UnitValue)
                .then((result) => {
                    return {
                        data: result
                    }
                })
        ) : { total: 0, data: {} };
    }

    shift=  ["","PAGI", "SIANG"];  
        
    unit = ["","DYEING", "PRINTING"];  

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
        this.ShiftValue = null;
        this.UnitValue = null;

    }
    ExportToExcel() {

        var searchDate = this.DateReport ? moment(this.DateReport).format("DD MMM YYYY HH:mm") : null;
        this.service.getExcel(searchDate, this.ShiftValue, this.UnitValue);
    }
}
