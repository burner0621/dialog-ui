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
controlOptions = {
        label: {
            length: 4
        },
        control: {
            length: 4
        }
    };

    tableOptions = {
        search: false,
        showToggle: false,
        showColumns: false
    }
// item.vatTaxCorrectionNo,vatDate,item.supplier,item.correctionType,item.productCode, item.productName, item.quantity, item.uom, item.pricePerDealUnitAfter, item.priceTotalAfter, item.user
    columns = [
        { field: "index", title: "No" , sortable: false},
        { field: "upcNo", title: "No Nota Debet" , sortable: false },
        { field: "correctionDate", title: "Tanggal Nota Debet", sortable: false, formatter: function (value, data, index) {
                return moment(value).format("DD MMM YYYY");
            }
        },
        { field: "upoNo", title: "No SPB", sortable: false },
        { field: "epoNo", title: "No PO Eksternal", sortable: false },
        { field: "prNo", title: "No Purchase Request" , sortable: false},
          { field: "notaRetur", title: "Nota Retur" , sortable: false},
        { field: "vatTaxCorrectionNo", title: "Faktur Pajak PPN" , sortable: false},
        { field: "vatTaxCorrectionDate", title: "Tgl Faktur Pajak PPN" , sortable: false, formatter: function (value, data, index) {
                return value==null || value==undefined? "-" : moment(value).format("DD MMM YYYY");
            }
        },
         { field: "unit", title: "Unit" , sortable: false},
          { field: "category", title: "Category" , sortable: false},
        { field: "supplier", title: "Supplier" , sortable: false},
        { field: "productCode", title: "Kode Barang", sortable: false },
        { field: "productName", title: "Nama Barang", sortable: false },
        { field: "jumlahKoreksi", title: "Koreksi Jmh", sortable: false },
        { field: "satuanKoreksi", title: "Koreksi Satuan", sortable: false },
        { field: "hargaSatuanKoreksi", title: "Koreksi Harga Satuan", sortable: false },
        { field: "hargaTotalKoreksi", title: "Koreksi Harga Total", sortable: false },
         { field: "user", title: "User Input", sortable: false },
         { field: "jenisKoreksi", title: "Jenis Koreksi", sortable: false },
  
    ];

    search() {
        this.error = {};


        if (Object.getOwnPropertyNames(this.error).length === 0) {
            this.flag = true;
            this.table.refresh();
        }
    }

    reset() {
        
        this.dateTo = undefined;
        this.dateFrom = undefined;
        this.error = {};

        this.flag = false;
        //this.prTable.refresh();
    }

    loader = (info) => {
        var order = {};

        if (info.sort)
            order[info.sort] = info.order;

        let args = {
            page: parseInt(info.offset / info.limit, 10) + 1,
            size: info.limit,
            dateTo: this.dateTo? moment(this.dateTo).format("MM/DD/YYYY"):"",
            dateFrom: this.dateFrom? moment(this.dateFrom).format("MM/DD/YYYY"):"",

        };

        return this.flag ?
            (
                this.service.search(args)
                    .then(result => {
                        var index=0;
                        for(var a of result.data){
                            index++;
                            a.index=index;
                            
                        }
                        return {
                            total: result.info.total,
                            data: result.data
                        };
                    })
            ) : { total: 0, data: [] };
    }
    

    

    xls() {
        this.error = {};

        if (Object.getOwnPropertyNames(this.error).length === 0) {
            let args = {
            dateTo: this.dateTo? moment(this.dateTo).format("MM/DD/YYYY"):"",
            dateFrom: this.dateFrom? moment(this.dateFrom).format("MM/DD/YYYY"):"",

        };

            this.service.getXls(args)
                .catch(e => {
                    alert(e.replace(e, "Error: ", ""));
                });
        }
    }
}