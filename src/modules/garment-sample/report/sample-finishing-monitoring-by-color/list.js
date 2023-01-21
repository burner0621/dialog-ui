import {inject} from 'aurelia-framework';
import {Service,CoreService} from "./service";
import {Router} from 'aurelia-router';
import moment from 'moment';
const UnitLoader = require('../../../../loader/garment-sample-unit-loader');

@inject(Router, Service,CoreService)
export class List {
    constructor(router, service,coreService) {
        this.service = service;
        this.router = router;
        this.coreService=coreService;
    }
    async bind(context) {
        this.context = context;
        if (!this.unit) {
            var units = await this.coreService.getSampleUnit({ size: 1, keyword: 'SMP1', filter: JSON.stringify({ Code: 'SMP1' }) });
            this.unit = units.data[0];

        }
    }
    
     
    ExportToExcel() {
        var info = {
            unit : this.unit ? this.unit.Id : "",
            dateFrom : this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : "",
            dateTo : this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : ""
      
        }
        this.service.generateExcel(info);
    }

    get unitLoader(){
        return UnitLoader;
    }
    unitView = (unit) => {
        return `${unit.Code} - ${unit.Name}`;
    
    }
    searching() {
        var locale = 'id-ID';
        
        var info = {
            unit : this.unit ? this.unit.Id : "",
            dateFrom : this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : "",
            dateTo : this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : ""
              }
        
        this.service.search(info)
            .then(result => {
                this.data = result;
                console.log(result);
                var temp = [];
                //this.args.total = result.length;
                var count = 0;
                for (var item of this.data) {
                    if (!temp[item.roJob] ) {
                        count = 1;
                        temp[item.roJob] = count;
                    }
                    else {
                        count++;
                        temp[item.roJob] = count;
                        item.roJob = null;
                    }
                }

                for (var item of this.data) {
                    if (item.roJob != null) {
                        item.row_count = temp[item.roJob];
                    }
               
                }
                for(var _data of result){
                   if(_data.roJob !="TOTAL")
                   {
                    _data.qtyOrder=_data.qtyOrder.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                   }else
                   {
                    _data.qtyOrder ="";
                   }
                    _data.stocks=_data.stock.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                    _data.sewingOutsQtyPcs=_data.sewingOutQtyPcs.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                    _data.finishingOutsQtyPcs=_data.finishingOutQtyPcs.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                    _data.remainsQty=_data.remainQty.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                

                 }
                this.fillTable();
            });
        }
    fillTable() {
        let columns = [
            { field: 'roJob', title: 'NO RO JOB', footerFormatter: "" },
            { field: 'article', title: 'ARTICLE', footerFormatter: "" },
            { field: 'qtyOrder', title: 'QTY ORDER', footerFormatter: "" },
            { field: 'style', title: 'STYLE', footerFormatter: "" },
              { field: 'color', title: 'COLOR', footerFormatter: "" },
            { field: 'stocks', title: 'STOCK AWAL', footerFormatter: "" },
            { field: 'sewingOutsQtyPcs', title: 'BARANG MASUK', footerFormatter: "" },
            { field: 'finishingOutsQtyPcs', title: 'BARANG KELUAR', footerFormatter: "" },
            { field: 'remainsQty', title: 'SISA', footerFormatter: "" },
        { field: 'uomUnit', title: 'SATUAN', footerFormatter: "" }
          ]

            var bootstrapTableOptions = {
                undefinedText: '',
                columns: columns,
                data: this.data,
                showFooter: true,
                
             footerStyle: () => { return { css: { "font-weight": "bold" } } }
                
            };
    
            bootstrapTableOptions.height = $(window).height() - $('.navbar').height() - $('.navbar').height() - 25;
            $(this.table).bootstrapTable('destroy').bootstrapTable(bootstrapTableOptions);
    
            for (const rowIndex in this.data) {
                if(this.data[rowIndex].roJob) {
                    var rowSpan=this.data[rowIndex].row_count;
                    console.log(rowSpan);
                    $(this.table).bootstrapTable('mergeCells', { index : rowIndex, field: "roJob", rowspan: rowSpan, colspan: 1, rowFormatter:"red" });
                    $(this.table).bootstrapTable('mergeCells', { index : rowIndex, field: "article", rowspan: rowSpan, colspan: 1 });
                    $(this.table).bootstrapTable('mergeCells', { index : rowIndex, field: "qtyOrder", rowspan: rowSpan, colspan: 1 });
                    $(this.table).bootstrapTable('mergeCells', { index : rowIndex, field: "style", rowspan: rowSpan, colspan: 1 });
                    
                         }
            }
            // var bootstrapTableOptions = {
            //     undefinedText: '',
            //     columns: columns,
            //     data: this.data,
            //     showFooter: true,
                
            //     // footerStyle: () => { return { css: { "font-weight": "bold" } } },
            //     // rowStyle: (row) => {
                    
            //     //     return (row.Size.startsWith("TOTAL"))
            //     //       ? { css : { "font-weight": "bold" } }
            //     //       : {};}
            //   };
          
    
            // bootstrapTableOptions.height = $(window).height() - $('.navbar').height() - $('.navbar').height() - 25;
            // $(this.table).bootstrapTable('destroy').bootstrapTable(bootstrapTableOptions);
    
        }
    
        changePage(e) {
            var page = e.detail;
            this.args.page = page;
            this.searching();
        }
    
    
    reset() {
        this.dateFrom = null;
        this.dateTo = null;
        this.unit = null;
    }

    get sumStock()
    {
        var sum=0;
        if(this.data)
        {
            for(var item of this.data)
            {
                sum += item.stock;
            }
        }
        
        return sum.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
    }
    get sumSewingOutQtyPcs()
    {
        var sum=0;
        if(this.data)
        {
            for(var item of this.data)
            {
                sum += item.sewingOutQtyPcs;
            }
        }
        
        return sum.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
    }
    
    get sumFinishingOutQtyPcs()
    {
        var sum=0;
        if(this.data)
        {
            for(var item of this.data)
            {
                sum += item.finishingOutQtyPcs;
            }
        }
       
        return sum.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
    }
    get sumRemainQty()
    {
        var sum=0;
        if(this.data)
        {
            for(var item of this.data)
            {
                sum += item.remainQty;
            }
        }
       
        return sum.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
    }
}