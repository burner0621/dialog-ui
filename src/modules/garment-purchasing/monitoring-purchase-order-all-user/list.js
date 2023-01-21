import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
var moment = require('moment');
import numeral from 'numeral';
var UnitLoader = require('../../../loader/garment-units-loader');
var CategoryLoader = require('../../../loader/garment-category-loader');
var SupplierLoader = require('../../../loader/garment-supplier-loader');
var AccountLoader = require('../../../loader/garment-internal-purchase-orders-name-loader');

@inject(Router, Service)
export class List {

    poStates = ["","Dibatalkan","PO Internal belum diorder","Sudah dibuat PO Eksternal","Sudah diorder ke Supplier","Barang sudah datang parsial","Barang sudah datang semua","Barang sudah diterima Unit"];
    poIntStates = ["","SUDAH","BELUM"];
 
    info = { page: 1,size:25};

    constructor(router, service) {
        this.service = service;
        this.router = router;
    }
    attached() {
    }

    activate() {
    }

    search(){
            this.info.page = 1;
            this.info.total=0;
            this.searching();
        
    }
      
    searching() {
        let args = {
            page: this.info.page,
            size: this.info.size,
            unit : this.unit ? this.unit.Id : "",
            epono : this.epoNo ? this.epoNo : "",
            article : this.article ? this.article : "",
            roNo : this.roNo ? this.roNo : "",
            poSerialNumber : this.poSerialNumber ? this.poSerialNumber : "",
            doNo : this.doNo ? this.doNo : "",
            supplier : this.supplier ? this.supplier.Id : "",
            username: this.account ? this.account.CreatedBy : "",
            status: this.poState?this.poState:"",
            ipoStatus:this.poIntState ?this.poIntState :"",
            dateFrom : this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : "",
            dateTo : this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : "",
            dateFromEx : this.dateFromEx ? moment(this.dateFromEx).format("YYYY-MM-DD") : "",
            dateToEx : this.dateToEx ? moment(this.dateToEx).format("YYYY-MM-DD") : ""
        };

    
        this.service.search(args)
            .then(result => {
                console.log(result.data);
                var resultTotal=0;
                //this.info.total=result.info.total; 
                this.data = result.data.Result;
                var index=1;
                for(var item of this.data)
                {
                    this.resultTotal= item.Total;
                    item.index=index;
                    index++;
                    item.totalBudget =  numeral(item.prBudgetPrice * item.poDefaultQty).format("0,000.00");
                }
                this.info.total= this.resultTotal;
                
                this.fillTable();
            })
    }

    fillTable() {
        let columns = [
            [
                { field:'index', rowspan:'2', title:'NO', },

                { colspan:2, title:'PURCHASE REQUEST', },

                { field:'unitName', rowspan:'2', title:'UNIT', },
                { field:'poSerialNumber', rowspan:'2', title:'NO REF PO',},
                { field:'useInternalPO', rowspan:'2', title:'DIBUAT<br/>PO INTERNAL' },
                { field:'ro', rowspan:'2', title:'NO RO'},
                { field:'article', rowspan:'2', title:'ARTIKEL'},

                { title:'BUYER',colspan:2 },

                { field:'shipmentDate', rowspan:2, title:'SHIPMENT'},

                { colspan:9, title:'PO EXTERN'},

                { colspan:3, title:'SUPPLIER' },

                { field:'status', rowspan:2, title:'STATUS' },
                { field:'productCode', rowspan:2, title:'KODE BARANG',},
                { field:'productName', rowspan:2, title:'NAMA BARANG' },
                { field:'consts', rowspan:2, title:'CONST' },
                { field:'yarn', rowspan:2, title:'YARN'  },
                { field:'width', rowspan:2, title:'WIDTH'  },
                { field:'composition', rowspan:2, title:'COMPOSITION' },
                { field:'prProductRemark', rowspan:2, title:'KETERANGAN BARANG(PR)'},
                { field:'poProductRemark', rowspan:2, title:'KETERANGAN BARANG(POEKS)'},
                
                { colspan:2, title:'JUMLAH' },

                { field:'poDealUomUnit', rowspan:2, title:'SATUAN' },

                { colspan:7, title:'HARGA' },

                { field:'ipoDate', rowspan:2, title:'TANGGAL TERIMA PO INTERN' },
                
                { colspan:7, title:'SURAT JALAN' },

                { colspan:2, title:'BEA CUKAI' },

                { colspan:4, title:'BON PENERIMAAN' },

                { colspan:10, title:'I N V O I C E' },

                { colspan:4, title:'NOTA INTERN' },

                { colspan:4, title:'CATATAN KOREKSI' },

                { field:'username', rowspan:'2', title:'STAFF PEMBELIAN'},
            
            ],
            [
                { field: 'prNo',  title: 'NOMOR' },
                { field: 'prDate',  title: 'TANGGAL' },

                { field: 'buyerCode',  title: 'KODE' },
                { field: 'buyerName',  title: 'NAMA' },

                { field: 'poextNo',  title: 'NOMOR' },
                { field: 'poExtDate',  title: 'TANGGAL' },
                { field: 'deliveryDate',  title: 'TARGET DATANG' },
                { field: 'useVat',  title: 'KENA PPN' },
                { field: 'useIncomeTax',  title: 'KENA PPH' },
                { field: 'incomeTaxRate',  title: 'PPH' },
                { field: 'paymentMethod',  title: 'TERM PEMBAYARAN' },
                { field: 'paymentType',  title: 'TIPE PEMBAYARAN' },
                { field: 'paymentDueDays',  title: 'TEMPO' },

                { field: 'supplierCode',  title: 'KODE' },
                { field: 'supplierName',  title: 'NAMA' },
                { field: 'SupplierImport',  title: 'JENIS SUPPLIER' },
                
                { field: 'poDefaultQty',  title: 'BUDGET' },
                { field: 'poDealQty',  title: 'BELI' },
                   
                { field: 'prBudgetPrice',  title: 'BUDGET' },
                { field: 'poPricePerDealUnit',  title: 'BELI' },
                { field: 'totalNominalPO',  title: 'TOTAL BELI' },
                { field: 'totalBudget',  title: 'TOTAL BUDGET' },
                { field: 'poCurrencyCode',  title: 'MT UANG' },
                { field: 'poCurrencyRate',  title: 'KURS' },
                { field: 'totalNominalRp',  title: 'TOTAL RP' },

                { field: 'doNo',  title: 'NOMOR' },
                { field: 'doDate',  title: 'TANGGAL' },
                { field: 'arrivalDate',  title: 'DATANG BARANG' },
                { field: 'doQty',  title: 'QTY DATANG' },
                { field: 'doUomUnit',  title: 'SATUAN' },
                { field: 'Bon',  title: 'NO. BON' },
                { field: 'BonSmall',  title: 'NO. BON KECIL' },

                { field: 'bcNo',  title: 'NOMOR' },
                { field: 'bcDate',  title: 'TANGGAL' },

                { field: 'receiptNo',  title: 'NOMOR' },
                { field: 'receiptDate',  title: 'TANGGAL' },
                { field: 'receiptQty',  title: 'QTY' },
                { field: 'receiptUomUnit',  title: 'SATUAN' },

                { field: 'invoiceNo',  title: 'NOMOR' },
                { field: 'invoiceDate',  title: 'TANGGAL' },
                { field: 'vatNo',  title: 'NO PPN' },
                { field: 'vatDate',  title: 'TANGGAL PPN' },
                { field: 'vatValue',  title: 'NILAI PPN' },
                { field: 'incomeTaxType',  title: 'JENIS PPH' },
                { field: 'incomeTaxtRate',  title: 'RATE PPH' },
                { field: 'incomeTaxNo',  title: 'NO PPH' },
                { field: 'incomeTaxDate',  title: 'TANGGAL PPH' },
                { field: 'incomeTaxtValue',  title: 'NILAI PPH' },
                
                { field: 'internNo',  title: 'NOMOR' },
                { field: 'internDate',  title: 'TANGGAL' },
                { field: 'internTotal',  title: 'NILAI' },
                { field: 'maturityDate',  title: 'JATUH TEMPO' },
            
                { field: 'correctionNoteNo',  title: 'NOMOR' },
                { field: 'correctionDate',  title: 'TANGGAL' },
                { field: 'valueCorrection',  title: 'NILAI' },
                { field: 'correctionRemark',  title: 'KETERANGAN' },
            ]
        ];
    
        var bootstrapTableOptions = {
            undefinedText: '',
            columns: columns,
            data: this.data,
            rowStyle:this.rowFormatter
        };
        bootstrapTableOptions.width=$(window).width() - $('.sidebar').width()- 200;
        bootstrapTableOptions.height = $(window).height() - $('.navbar').height() - $('.navbar').height() - 25;
        $(this.table).bootstrapTable('destroy').bootstrapTable(bootstrapTableOptions);


    }

    reset() {
    this.unit = "",

    this.epoNo = "",
    this.article = "",
    this.roNo = "",
    this.poSerialNumber = "",
    this.doNo = "",
    this.supplier = "",
    this.account = "",
    this.poState="",
    this.poIntState="",
    this.dateFrom= "",
    this.dateTo="",
    this.dateFromEx= "",
    this.dateToEx="",
    this.data = [];
    this.info.page = 1;
    }

    exportToXls() {
        let args = {            
            page: this.info.page,
            size: this.info.size,
            unit : this.unit ? this.unit.Id : "",
            epono : this.epoNo ? this.epoNo : "",
            article : this.article ? this.article : "",
            roNo : this.roNo ? this.roNo : "",
            poSerialNumber : this.poSerialNumber ? this.poSerialNumber : "",
            doNo : this.doNo ? this.doNo : "",
            supplier : this.supplier ? this.supplier.Id : "",
            username: this.account ? this.account.CreatedBy : "",
            status: this.poState,
            ipoStatus:this.poIntState,
            dateFrom : this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : "",
            dateTo : this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : "",
            dateFromEx : this.dateFromEx ? moment(this.dateFromEx).format("YYYY-MM-DD") : "",
            dateToEx : this.dateToEx ? moment(this.dateToEx).format("YYYY-MM-DD") : ""
        };
        
        this.service.generateExcel(args.epono, args.unit, args.roNo, args.article, args.poSerialNumber, args.username, args.doNo, args.ipoStatus, args.supplier, args.status, args.dateFrom, args.dateTo, args.dateFromEx, args.dateToEx);
    }

    dateFromChanged(e) {
        var _startDate = new Date(e.srcElement.value);
        var _endDate = new Date(this.dateTo);
        this.dateMin = moment(_startDate).format("YYYY-MM-DD");

        if (_startDate > _endDate || !this.dateTo) {
            this.dateTo = e.srcElement.value;
        }

    }
    changePage(e) {
        var page = e.detail;
        this.info.page = page;
        this.searching();
    }


    get unitLoader() {
        return UnitLoader;
    }
        unitView = (unit) => {
        return `${unit.Code}-${unit.Name}`
      }

    get categoryLoader() {
        return CategoryLoader;
    }
        categoryView = (category) => {
        return `${category.code}-${category.name}`
      }

    get supplierLoader() {
        return SupplierLoader;
    }
        supplierView = (supplier) => {
        return `${supplier.code}-${supplier.name}`
      }

    get accountLoader() {
      
        return AccountLoader;
    }
    accountView = (account) => {
         
        return `${account.CreatedBy}`;
  }
}