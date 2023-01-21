import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import moment from 'moment';
import numeral from 'numeral';

const GroupLoader = require("../../../loader/inspection-group-loader");
const MutasiLoader = require("../../../loader/inspection-mutasi-loader");
const ZonaLoader = require('../../../loader/inspection-zona-loader');
const KeteranganLoader = require('../../../loader/inspection-keterangan-loader');

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
        // { field: "index", title: "No" },
        {
            field: "dateReport", title: "Tanggal", formatter: function (value, data, index) {
                return moment.utc(value).local().format('DD MMM YYYY');
            },
        },
        { field: "groupText", title: "Group" },
        { field: "unitText", title: "Unit" },
        { field: "keluarKe", title: "Keluar Ke"},
        { field: "noSPP", title :"No. SPP"},
        { field: "noKereta", title :"No. Kereta"},
        { field: "material", title :"Material"},
        { field: "keterangan", title :"Ket"},
        { field: "status", title :"Status"},
        { field: "motif", title :"Motif"},
        { field: "warna", title :"Warna"},
        { field: "mtr", title :"Mtr"},
        { field: "yds", title :"Yds"},
    ];
    
    loader = (info)=> {
        this.info = {};
        var searchDate = this.DateReport ? moment(this.DateReport).format("DD MMM YYYY HH:mm") : null;
        
        return this.listDataFlag ? (

            this.service.getReport(searchDate, this.GroupValue, this.MutasiValue, this.ZonaValue,this.KeteranganValue)
                .then((result) => {
                    return {
                        data: result
                    }
                })
        ) : { total: 0, data: {} };
    }

    groups=  ["","PAGI", "SIANG"];        

    mutasi = ["","AWAL","MASUK","KELUAR","ADJ MASUK", "ADJ KELUAR"];

    zona= ["","PROD", "TRANSIT", "PACK", "GUDANG JADI", "SHIP", "AVAL", "LAB"];

    keterangan=["","OK", "NOT OK"];        

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
        this.MutasiValue = null;
        this.ZonaValue = null;
        this.KeteranganValue = null;
    }
    ExportToExcel() {

        var searchDate = this.DateReport ? moment(this.DateReport).format("DD MMM YYYY HH:mm") : null;
        this.service.getExcel(searchDate, this.GroupValue, this.MutasiValue, this.ZonaValue,this.KeteranganValue);
    }
}
