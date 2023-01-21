import {inject} from 'aurelia-framework';
import {Service} from "./service";
import {Router} from 'aurelia-router';
import moment from 'moment';
const UnitLoader = require('../../../loader/garment-units-loader');
import "bootstrap-table";
import "bootstrap-table/dist/bootstrap-table.css";
import "bootstrap-table/dist/locale/bootstrap-table-id-ID.js";

import "../../../components/bootstrap-table-fixed-columns/bootstrap-table-fixed-columns";
import "../../../components/bootstrap-table-fixed-columns/bootstrap-table-fixed-columns.css";
@inject(Router, Service)
export class List {
    constructor(router, service) {
        this.service = service;
        this.router = router;

    }
    bind(context) {
        this.context = context;
    }
    
     
    async searching() {
        var info = {
            unit : this.unit ? this.unit.Id : "",
            date : this.date ? moment(this.date).format("YYYY-MM-DD") :  moment(new Date()).format("YYYY-MM-DD") ,
            ro : this.ro ?this.ro:""
        }
        this.data=[];
        await this.service.search(info)
            .then(result => {
                console.log(result);
                var _temp = {};
                var row_span_count = 1;
                this.temp = [];
                var temps = {};
                var count = 0;
                for (var prs of result) {
                    temps.ro = prs.Ro;
                    temps.buyerCode = prs.BuyerCode;
                    this.temp.push(temps);
                }
                for(var pr of result){
                    
               
                    if (_temp.code == pr.Ro) {
                      
                        pr.Ro = null;
                        pr.BuyerCode = null;
                        pr.Article = null;
                        pr.Comodity = null;
                        pr.QtyOrder = null;
                      
                        row_span_count = row_span_count + 1;
                        pr.row_count = row_span_count;
                         
                    }  
                     else if (!_temp.code || _temp.code != pr.Ro) {
                        _temp.code = pr.Ro;
                        row_span_count = 1;
                        pr.row_count = row_span_count;
                       
                    }

                    this.data.push(pr);
                  
                    if (this.data[count].row_count > 1) {

                        for (var x = pr.row_count; 0 < x; x--) {
                            var z = count - x;
                            this.data[z + 1].row_count = this.data[count].row_count;
                        }
                  
                    }

                    count++;
                    
                 }
            });
        
        this.fillTable();
    }

    fillTable() {
        var totalCutting= 0;
        var totalLoading =0;
        var totalSewing =0;
        var totalFinishing =0;
        var totalWip=0;
        
            for(var qty of this.data)
            {
                if(qty.Size == "TOTAL")
        {
                totalCutting +=qty.QtyCutting;
                totalLoading += qty.QtyLoading;
                totalSewing += qty.QtySewing;
                totalFinishing += qty.QtyFinishing;
                totalWip += qty.Wip;
            }

        }
        let columns = [
            {field: 'Ro', title: 'RO', footerFormatter: ""},
            {field: 'BuyerCode', title: 'Kode Buyer', footerFormatter: ""},
            {field: 'Article', title: 'No Article', footerFormatter: ""},
            {field: 'Comodity', title: 'Komoditi', footerFormatter: ""},
            {field: 'QtyOrder', title: 'Jumlah Order', footerFormatter: ""},
            {field: 'Size', title: 'Ukuran', footerFormatter: ""},
            {field: 'QtyCutting', title: 'Hasil Potong',footerFormatter: () => {return totalCutting ; } },
            {field: 'QtyLoading', title: 'Hasil Loading',footerFormatter: () => {return totalLoading ; } },
            {field: 'QtySewing', title: 'Hasil Sewing',footerFormatter: () => {return totalSewing ; } },
            {field: 'QtyFinishing', title: 'Hasil Finishing',footerFormatter: () => {return totalFinishing ; } },
            {field: 'Wip', title: 'Barang Dalam Proses',footerFormatter: () => {return totalWip ; } }  
        ];

    
        var bootstrapTableOptions = {
            undefinedText: '',
            columns: columns,
            data: this.data,
            showFooter: true,
            
            footerStyle: () => { return { css: { "font-weight": "bold" } } },
            rowStyle: (row) => {
                
                return (row.Size.startsWith("TOTAL"))
                  ? { css : { "font-weight": "bold" } }
                  : {};}
          };
      

        bootstrapTableOptions.height = $(window).height() - $('.navbar').height() - $('.navbar').height() - 25;
        $(this.table).bootstrapTable('destroy').bootstrapTable(bootstrapTableOptions);

      }

 

    ExportToExcel() {
        var info = {
            unit : this.unit ? this.unit.Id : "",
            date : this.date ? moment(this.date).format("YYYY-MM-DD") :  moment(new Date()).format("YYYY-MM-DD") ,
            ro : this.ro ?this.ro:""
        }
        this.service.generateExcel(info);
    }

    get unitLoader(){
        return UnitLoader;
    }
    unitView = (unit) => {
        return `${unit.Code} - ${unit.Name}`;
    
    }

    
    reset() {
        this.ro = null;
        this.date  = null;
        this.unit = null;
    }
}