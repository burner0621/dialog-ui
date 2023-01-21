import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import moment from 'moment';

var UnitLoader = require('../../../loader/unit-loader');
var PRLoader = require('../../../loader/purchase-request-all-loader');
var URNLoader = require('../../../loader/unit-receipt-note-all-loader');
var CategoryLoader = require('../../../loader/category-loader');
var SupplierLoader = require('../../../loader/supplier-loader');
var DOLoader = require('../../../loader/delivery-order-all-loader');

@inject(Router, Service)
export class List {

    constructor(router, service) {
        this.service = service;
        this.router = router;
        this.today = new Date();
        this.selectSupplier = ['code', 'name'];
        
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

    columns = [
        { field: "index", title: "No" , sortable: false},
        { field: "PRDate", title: "Tanggal PR", sortable: false, formatter: function (value, data, index) 
            {
                return moment(value).format("DD MMM YYYY");
            }
        },
        { field: "PRNo", title: "Nomor PR" , sortable: false},
        { field: "ProductName", title: "Nama Barang" , sortable: false},
        { field: "DODate", title: "Tanggal Surat Jalan", sortable: false, formatter: function (value, data, index) 
            {
                return moment(value).format("DD MMM YYYY");
            }
        },
        { field: "DONo", title: "Nomor Surat Jalan", sortable: false },
        { field: "ReceiptDate", title: "Tanggal Bon", sortable: false, formatter: function (value, data, index) {
            return moment(value).format("DD MMM YYYY");
            }
        },
        { field: "UrnNo", title: "Nomor Bon" , sortable: false },
        { field: "ReceiptQuantity", title: "Jumlah Barang", sortable: false,formatter:(value,data)=>{
            return value.toLocaleString('en-EN', { minimumFractionDigits: 0 });
        }  },
        { field: "Uom", title: "Satuan Barang", sortable: false },
        { field: "PricePerDealUnit", title: "Harga Satuan", sortable: false,formatter:(value,data)=>{
            return value.toLocaleString('en-EN', { minimumFractionDigits: 2 });
        }  },

        { field: "TotalPrice", title: "Harga Total", sortable: false,formatter:(value,data)=>{
            return value.toLocaleString('en-EN', { minimumFractionDigits: 2 });
        }  },
        { field: "CurencyCode", title: "Mata Uang", sortable: false },

        { field: "SupplierName", title: "Nama Supplier" , sortable: false},
        { field: "PaymentDueDays", title: "Tempo" , sortable: false},
        { field: "CategoryName", title: "Kategori" , sortable: false},
        { field: "BudgetName", title: "Budget" , sortable: false},
        { field: "UnitName", title: "Unit" , sortable: false},
        { field: "createdBy", title: "Staff", sortable: false },
        
    ];

    

    

   
    search() {
        this.error = {};


        if (Object.getOwnPropertyNames(this.error).length === 0) {
            this.flag = true;
            this.spbTable.refresh();
        }
    }

    reset() {
        
        this.unitReceiptNote = null;
        this.supplier = null;
        this.doNo = null;
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
            UrnNo:this.unitReceiptNote? this.unitReceiptNote.no:"",
            SupplierName: this.supplier? this.supplier.name : "",
            DONo: this.doNo? this.doNo.no: "",
            dateTo: this.dateTo? moment(this.dateTo).format("MM/DD/YYYY"):"",
            dateFrom: this.dateFrom? moment(this.dateFrom).format("MM/DD/YYYY"):""


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
            UrnNo:this.unitReceiptNote? this.unitReceiptNote.no:"",
            SupplierName: this.supplierName? this.supplierName.name : "",
            DONo: this.doNo? this.doNo.no: "",
            dateTo: this.dateTo? moment(this.dateTo).format("MM/DD/YYYY"):"",
            dateFrom: this.dateFrom? moment(this.dateFrom).format("MM/DD/YYYY"):""
        };

            this.service.generateExcel(args)
                .catch(e => {
                    alert(e.replace(e, "Error: ", ""));
                });
        }
    }

    get unitLoader() {
        return UnitLoader;
    }

    get prLoader() {
        return PRLoader;
    }
    
    get categoryLoader() {
        return CategoryLoader;
    }
    
    get supplierLoader() {
        return SupplierLoader;
    }

    get urnLoader() {
        return URNLoader;
    }

    get doLoader(){
        return DOLoader;
    }

    prView = (tr) => {
      return `${tr.no}`;
    }
    urnView = (urn) => {
        return `${urn.no}`;
    }
   

    doView = (dol) =>{
        return `${dol.no}`;
    }

    

    dateFromChanged(e) {
        var _startDate = new Date(e.srcElement.value);
        var _endDate = new Date(this.dateTo);


        if (_startDate > _endDate)
            this.dateTo = e.srcElement.value;

    }
}